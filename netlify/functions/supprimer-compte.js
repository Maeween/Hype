// ============================================================
//  HYPE — Suppression de compte, avec délai de réflexion de 60 jours
//  Fichier à placer dans :  netlify/functions/supprimer-compte.js
//
//  Cette fonction fait deux choses selon comment on l'appelle :
//
//  1) action = "demander"  (depuis l'application, par le cavalier)
//     → désactive le compte et fixe la date de suppression à J+60.
//       AUCUNE donnée n'est effacée. S'il se reconnecte, tout revient.
//
//  2) action = "purger"    (appel planifié, sans utilisateur)
//     → supprime définitivement les comptes dont les 60 jours sont écoulés.
//       C'est ici, et seulement ici, que les données partent pour de bon.
//
//  ⚠️ À FAIRE UNE SEULE FOIS DANS NETLIFY :
//  Site settings → Environment variables → Add a variable
//    SUPABASE_URL          = https://xxxx.supabase.co  (Supabase → Settings → API)
//    SUPABASE_SERVICE_ROLE = la clé "service_role"      (même page)
//    HYPE_CLE_PURGE        = un mot de passe que tu inventes (ex. 8-10 caractères)
//  Ne jamais mettre la clé service_role dans index.html.
// ============================================================

const { createClient } = require("@supabase/supabase-js");

const JOURS_DELAI = 60;

// Tables contenant une colonne user_id, vidées seulement au moment de la purge.
// Les commentaires laissés chez d'autres cavaliers ne sont PAS listés :
// ils sont conservés volontairement (le pseudo reste, grisé).
const TABLES = [
  "progression",
  "albums_cheval",
  "albums_membres",
  "chevaux",
  "chevaux_liens",
  "conversations_heybaby",
  "echanges_heybaby_epingles",
  "souvenirs",
  "souvenirs_vedette",
  "resultats",
  "memoire_chevaux",
  "suivis_chevaux",
  "presences",
  "mur_evenement",
  "visites_articles",
  "abonnements_premium",
  "cavaliers",
];

function reponse(code, corps, entetes) {
  return { statusCode: code, headers: entetes, body: JSON.stringify(corps) };
}

// Supprime pour de bon un cavalier : ses données, ses fichiers, son compte.
async function purgerUn(admin, uid) {
  const echecs = [];
  for (const table of TABLES) {
    try {
      const { error } = await admin.from(table).delete().eq("user_id", uid);
      if (error && !/does not exist|schema cache/i.test(error.message || "")) {
        echecs.push(table + " : " + error.message);
      }
    } catch (e) { echecs.push(table + " : " + String(e)); }
  }

  // Le profil est vidé mais conservé : le pseudo doit rester affiché
  // (grisé) sous les commentaires laissés chez d'autres cavaliers.
  try {
    await admin.from("profiles").update({
      avatar_url: null, ecurie: null, ecurie2: null, ville: null,
      bio: null, banniere: null, ecurie_photo: null,
      compte_supprime: true, suppression_prevue_le: null,
    }).eq("id", uid);
  } catch (e) { }

  // Les photos envoyées par le cavalier (son dossier porte son identifiant)
  try {
    const { data: fichiers } = await admin.storage.from("photos").list(uid, { limit: 1000 });
    if (fichiers && fichiers.length) {
      await admin.storage.from("photos").remove(fichiers.map((f) => uid + "/" + f.name));
    }
  } catch (e) { }

  // Et enfin le compte de connexion
  try {
    const { error } = await admin.auth.admin.deleteUser(uid);
    if (error) echecs.push("auth : " + error.message);
  } catch (e) { echecs.push("auth : " + String(e)); }

  return echecs;
}

exports.handler = async (event) => {
  const entetes = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: entetes, body: "" };
  if (event.httpMethod !== "POST") return reponse(405, { erreur: "Méthode non autorisée" }, entetes);

  const url = process.env.SUPABASE_URL;
  const cleService = process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !cleService) {
    return reponse(500, { erreur: "Configuration manquante : SUPABASE_URL ou SUPABASE_SERVICE_ROLE absente dans Netlify." }, entetes);
  }

  const admin = createClient(url, cleService, { auth: { persistSession: false } });

  let corps = {};
  try { corps = event.body ? JSON.parse(event.body) : {}; } catch (e) { }
  const action = corps.action || "demander";

  // ==========================================================
  //  PURGE : suppression définitive des comptes échus
  //  Appel planifié, protégé par une clé. Aucun utilisateur connecté.
  // ==========================================================
  if (action === "purger") {
    const attendue = process.env.HYPE_CLE_PURGE;
    if (!attendue || corps.cle !== attendue) {
      return reponse(401, { erreur: "Clé de purge invalide" }, entetes);
    }
    try {
      const { data, error } = await admin
        .from("profiles")
        .select("id, suppression_prevue_le")
        .eq("compte_supprime", true)
        .not("suppression_prevue_le", "is", null)
        .lte("suppression_prevue_le", new Date().toISOString());
      if (error) return reponse(500, { erreur: error.message }, entetes);

      const aPurger = data || [];
      const details = [];
      for (const ligne of aPurger) {
        const echecs = await purgerUn(admin, ligne.id);
        details.push({ id: ligne.id, echecs: echecs });
      }
      return reponse(200, { ok: true, purges: aPurger.length, details }, entetes);
    } catch (e) {
      return reponse(500, { erreur: String(e) }, entetes);
    }
  }

  // ==========================================================
  //  DEMANDE : désactivation + date de suppression à J+60
  //  Aucune donnée n'est effacée à cette étape.
  // ==========================================================
  const autorisation = event.headers.authorization || event.headers.Authorization || "";
  const jeton = autorisation.replace(/^Bearer\s+/i, "").trim();
  if (!jeton) return reponse(401, { erreur: "Non authentifié" }, entetes);

  let utilisateur;
  try {
    const { data, error } = await admin.auth.getUser(jeton);
    if (error || !data || !data.user) return reponse(401, { erreur: "Session invalide" }, entetes);
    utilisateur = data.user;
  } catch (e) {
    return reponse(401, { erreur: "Session invalide" }, entetes);
  }

  const uid = utilisateur.id;

  // Motif de départ (facultatif), enregistré sans aucun lien avec l'identité
  try {
    const motif = (corps.motif || "").toString().slice(0, 40);
    const message = (corps.message || "").toString().slice(0, 2000);
    if (motif || message) {
      await admin.from("departs_motifs").insert({ motif: motif || null, message: message || null });
    }
  } catch (e) { /* un motif non enregistré ne doit jamais bloquer la demande */ }

  const maintenant = new Date();
  const prevue = new Date(maintenant.getTime() + JOURS_DELAI * 86400000);

  try {
    const { error } = await admin.from("profiles").update({
      compte_supprime: true,
      suppression_demandee_le: maintenant.toISOString(),
      suppression_prevue_le: prevue.toISOString(),
    }).eq("id", uid);
    if (error) return reponse(500, { erreur: error.message }, entetes);
  } catch (e) {
    return reponse(500, { erreur: String(e) }, entetes);
  }

  return reponse(200, {
    ok: true,
    differee: true,
    jours: JOURS_DELAI,
    prevue_le: prevue.toISOString(),
  }, entetes);
};
