// ============================================================
//  HYPE — Suppression de compte, avec délai de réflexion de 60 jours
//  Fichier à placer dans :  netlify/functions/supprimer-compte.js
//
//  ⚠️⚠️ RÉÉCRITURE COMPLÈTE DU 10/08/2026 — LIRE AVANT DE TOUCHER ⚠️⚠️
//
//  CE QUI NE MARCHAIT PAS, ET DEPUIS TOUJOURS :
//  la version précédente faisait `require("@supabase/supabase-js")`.
//  Or il n'y a AUCUN `package.json` dans le dépôt Hype : cette
//  bibliothèque n'est installée nulle part. La fonction plantait donc
//  au chargement, avant d'exécuter la moindre ligne :
//      Runtime.ImportModuleError: Cannot find module '@supabase/supabase-js'
//  Découvert le 10/08 en lançant la purge à la main depuis Netlify.
//
//  CONSÉQUENCE RÉELLE : la suppression de compte n'a JAMAIS fonctionné.
//  Blandine : « ah c'est pour ça Liam n'arrivait pas à supprimer son
//  compte ». Son compte n'a été ni désactivé ni daté ; l'application
//  affichait une erreur générique et personne ne savait pourquoi.
//
//  LA RÉPARATION, choisie par Blandine : plus AUCUNE dépendance npm.
//  On parle à Supabase par de simples appels réseau (`fetch`), exactement
//  comme `stripe-webhook.js`, qui marche depuis toujours pour cette
//  raison précise — son en-tête le dit noir sur blanc : « Aucune
//  dépendance npm : signature vérifiée via Web Crypto ».
//
//  ⛔ NE JAMAIS RÉINTRODUIRE UN `require` DE PAQUET EXTERNE ICI.
//  Tant qu'il n'y a pas de `package.json` dans le dépôt, tout `require`
//  autre qu'un module natif de Node fait planter la fonction au
//  démarrage — et l'échec est INVISIBLE pour la cavalière.
//
//  ------------------------------------------------------------
//  Cette fonction fait deux choses selon comment on l'appelle :
//
//  1) action = "demander"  (depuis l'application, par la cavalière)
//     → désactive le compte et fixe la date de suppression à J+60.
//       AUCUNE donnée n'est effacée. Si elle se reconnecte, tout revient.
//
//  2) action = "purger"    (appel MANUEL, protégé par une clé)
//     → supprime définitivement les comptes dont les 60 jours sont écoulés.
//       C'est ici, et seulement ici, que les données partent pour de bon.
//       L'appel AUTOMATIQUE de chaque nuit passe par `purge-planifiee.js`
//       (planifié dans netlify.toml, vérifié « Scheduled » le 10/08).
//
//  ⚠️ VARIABLES D'ENVIRONNEMENT NETLIFY :
//    SUPABASE_URL              = https://xxxx.supabase.co
//    SUPABASE_SERVICE_ROLE_KEY = la clé "service_role" (ou SUPABASE_SERVICE_ROLE)
//    HYPE_CLE_PURGE            = mot de passe inventé, pour l'appel MANUEL
//                                seulement (la purge planifiée n'en a pas besoin)
//  Ne jamais mettre la clé service_role dans index.html.
// ============================================================

const JOURS_DELAI = 60;

// Tables portant une colonne user_id, vidées seulement au moment de la purge.
//
// ⚠️ AUDIT DU 10/08/2026 — SON RÉSULTAT COMMANDE TOUT CE QUI SUIT :
//   Blandine a vérifié en base (requête sur pg_constraint) qu'AUCUNE des
//   27 tables n'a de clé étrangère vers `auth.users`. Il n'y a donc AUCUNE
//   suppression en cascade : cette liste est le SEUL mécanisme de nettoyage
//   de toute l'application. Toute table oubliée ici survit indéfiniment à
//   la suppression du compte.
//   → À CHAQUE NOUVELLE TABLE PORTANT UN `user_id`, L'AJOUTER ICI EST UN
//     GESTE DE LIVRAISON OBLIGATOIRE, PAS UNE OPTION.
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
  // ---- les neuf ajoutées le 10/08/2026, oubliées jusque-là ----
  "hype_parrain_codes",        // le code de parrainage personnel
  "hype_paliers",              // paliers de badges atteints
  "hauts_faits",               // hauts faits débloqués
  "hype_vues",                 // compteurs de vues
  "likes",                     // likes posés sur des résultats
  "ecurie_cavaliers_choisis",  // cavaliers choisis dans l'écurie
  "video_favoris",             // vidéos mises en favori
  "video_playlists",           // listes de lecture
  "video_progression",         // avancement dans les vidéos
];

// `commentaires` reste VOLONTAIREMENT hors de cette liste : les commentaires
// laissés chez d'autres cavalières sont conservés, le pseudo restant affiché
// en grisé. Choix documenté — ne pas l'ajouter sans l'accord explicite de
// Blandine.
//
// ⚠️ RESTE À TRAITER, SIGNALÉ ET NON RÉGLÉ : `hype_filleuls` ne porte pas de
// colonne `user_id` mais `filleul_id` et `parrain_id`. Elle échappe donc à la
// boucle ci-dessous. Une cavalière qui part doit être retirée des DEUX côtés :
// comme filleule ET comme marraine. À écrire une fois la décision prise sur
// le parrainage.

function log() {
  try {
    const args = Array.prototype.slice.call(arguments);
    console.log.apply(console, ["[supprimer-compte " + new Date().toISOString() + "]"].concat(args));
  } catch (e) { }
}

function reponse(code, corps, entetesRep) {
  return { statusCode: code, headers: entetesRep, body: JSON.stringify(corps) };
}

// ---------- Le socle : parler à Supabase sans aucune bibliothèque ----------

function config() {
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !cle) return null;
  return { url: String(url).replace(/\/+$/, ""), cle: cle };
}

function entetes(cfg, extra) {
  return Object.assign({
    apikey: cfg.cle,
    Authorization: "Bearer " + cfg.cle,
    "Content-Type": "application/json",
  }, extra || {});
}

/* Lecture : renvoie un tableau de lignes (vide si rien). */
async function lire(cfg, table, requete) {
  const r = await fetch(cfg.url + "/rest/v1/" + table + "?" + requete, { headers: entetes(cfg) });
  if (!r.ok) throw new Error(table + " (lecture " + r.status + ") : " + (await r.text().catch(() => "")).slice(0, 200));
  return await r.json();
}

/* Suppression de lignes. Renvoie null si tout va bien, sinon le message.
   Une table ABSENTE n'est pas une erreur : la liste doit pouvoir citer une
   table pas encore créée sans faire échouer toute la purge. */
async function supprimerLignes(cfg, table, filtre) {
  const r = await fetch(cfg.url + "/rest/v1/" + table + "?" + filtre, {
    method: "DELETE",
    headers: entetes(cfg, { Prefer: "return=minimal" }),
  });
  if (r.ok) return null;
  const txt = (await r.text().catch(() => "")).slice(0, 300);
  if (/does not exist|schema cache|Could not find the table/i.test(txt)) return null;
  return table + " : " + r.status + " " + txt;
}

async function majLignes(cfg, table, filtre, champs) {
  const r = await fetch(cfg.url + "/rest/v1/" + table + "?" + filtre, {
    method: "PATCH",
    headers: entetes(cfg, { Prefer: "return=minimal" }),
    body: JSON.stringify(champs),
  });
  if (r.ok) return null;
  return table + " : " + r.status + " " + (await r.text().catch(() => "")).slice(0, 300);
}

async function inserer(cfg, table, ligne) {
  const r = await fetch(cfg.url + "/rest/v1/" + table, {
    method: "POST",
    headers: entetes(cfg, { Prefer: "return=minimal" }),
    body: JSON.stringify(ligne),
  });
  return r.ok ? null : table + " : " + r.status;
}

/* Qui est la personne derrière ce jeton de session ? */
async function utilisateurDuJeton(cfg, jeton) {
  const r = await fetch(cfg.url + "/auth/v1/user", {
    headers: { apikey: cfg.cle, Authorization: "Bearer " + jeton },
  });
  if (!r.ok) return null;
  const u = await r.json().catch(() => null);
  return (u && u.id) ? u : null;
}

/* Le compte de connexion lui-même (API d'administration). */
async function supprimerUtilisateur(cfg, uid) {
  const r = await fetch(cfg.url + "/auth/v1/admin/users/" + encodeURIComponent(uid), {
    method: "DELETE",
    headers: entetes(cfg),
  });
  return r.ok ? null : "auth : " + r.status + " " + (await r.text().catch(() => "")).slice(0, 200);
}

/* Les photos envoyées par la cavalière : son dossier porte son identifiant. */
async function supprimerPhotos(cfg, uid) {
  try {
    const rl = await fetch(cfg.url + "/storage/v1/object/list/photos", {
      method: "POST",
      headers: entetes(cfg),
      body: JSON.stringify({ prefix: uid, limit: 1000 }),
    });
    if (!rl.ok) return null;
    const fichiers = await rl.json().catch(() => []);
    if (!fichiers || !fichiers.length) return null;
    const noms = fichiers.map((f) => uid + "/" + f.name);
    const rd = await fetch(cfg.url + "/storage/v1/object/photos", {
      method: "DELETE",
      headers: entetes(cfg),
      body: JSON.stringify({ prefixes: noms }),
    });
    return rd.ok ? null : "storage : " + rd.status;
  } catch (e) { return "storage : " + String(e && e.message ? e.message : e); }
}

// ---------- La purge d'un compte ----------

async function purgerUn(cfg, uid) {
  const echecs = [];
  const filtre = "user_id=eq." + encodeURIComponent(uid);

  for (const table of TABLES) {
    try {
      const e = await supprimerLignes(cfg, table, filtre);
      if (e) echecs.push(e);
    } catch (e) { echecs.push(table + " : " + String(e && e.message ? e.message : e)); }
  }

  // Le profil est vidé mais CONSERVÉ : le pseudo doit rester affiché (grisé)
  // sous les commentaires laissés chez d'autres cavalières.
  try {
    const e = await majLignes(cfg, "profiles", "id=eq." + encodeURIComponent(uid), {
      avatar_url: null, ecurie: null, ecurie2: null, ville: null,
      bio: null, banniere: null, ecurie_photo: null,
      compte_supprime: true, suppression_prevue_le: null,
    });
    if (e) echecs.push(e);
  } catch (e) { echecs.push("profiles : " + String(e && e.message ? e.message : e)); }

  try { const e = await supprimerPhotos(cfg, uid); if (e) echecs.push(e); } catch (e) { }

  // Le compte de connexion, TOUJOURS EN DERNIER : si une étape précédente
  // échoue, on veut pouvoir retrouver le compte et recommencer.
  try {
    const e = await supprimerUtilisateur(cfg, uid);
    if (e) echecs.push(e);
  } catch (e) { echecs.push("auth : " + String(e && e.message ? e.message : e)); }

  return echecs;
}

/* Le cœur de la purge, appelé par les DEUX chemins (planifié et manuel).
   Un seul code : les deux ne peuvent pas diverger sur la liste des tables. */
async function purgerEchus(cfg) {
  const maintenant = new Date().toISOString();
  const lignes = await lire(cfg, "profiles",
    "select=id,suppression_prevue_le" +
    "&compte_supprime=eq.true" +
    "&suppression_prevue_le=not.is.null" +
    "&suppression_prevue_le=lte." + encodeURIComponent(maintenant));

  const details = [];
  for (const l of (lignes || [])) {
    const echecs = await purgerUn(cfg, l.id);
    details.push({ id: l.id, echecs: echecs });
  }
  return { purges: (lignes || []).length, details: details };
}

// ---------- Le point d'entrée HTTP ----------

exports.handler = async (event) => {
  const enTetesRep = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: enTetesRep, body: "" };
  if (event.httpMethod !== "POST") return reponse(405, { erreur: "Méthode non autorisée" }, enTetesRep);

  const cfg = config();
  if (!cfg) {
    log("CONFIGURATION MANQUANTE : SUPABASE_URL ou la cle service_role absente dans Netlify.");
    return reponse(500, { erreur: "Configuration manquante : SUPABASE_URL ou la cle service_role absente dans Netlify." }, enTetesRep);
  }

  let corps = {};
  try { corps = event.body ? JSON.parse(event.body) : {}; } catch (e) { }
  const action = corps.action || "demander";

  // ==========================================================
  //  PURGE — appel MANUEL, protégé par une clé.
  // ==========================================================
  if (action === "purger") {
    const attendue = process.env.HYPE_CLE_PURGE;
    if (!attendue || corps.cle !== attendue) {
      return reponse(401, { erreur: "Clé de purge invalide" }, enTetesRep);
    }
    try {
      const r = await purgerEchus(cfg);
      log("purge manuelle :", r.purges, "compte(s)");
      return reponse(200, { ok: true, purges: r.purges, details: r.details }, enTetesRep);
    } catch (e) {
      log("erreur de purge :", e && e.message);
      return reponse(500, { erreur: String(e && e.message ? e.message : e) }, enTetesRep);
    }
  }

  // ==========================================================
  //  DEMANDE — désactivation + date de suppression à J+60.
  //  Aucune donnée n'est effacée à cette étape.
  // ==========================================================
  const autorisation = event.headers.authorization || event.headers.Authorization || "";
  const jeton = autorisation.replace(/^Bearer\s+/i, "").trim();
  if (!jeton) return reponse(401, { erreur: "Non authentifié" }, enTetesRep);

  let utilisateur = null;
  try { utilisateur = await utilisateurDuJeton(cfg, jeton); } catch (e) { }
  if (!utilisateur) return reponse(401, { erreur: "Session invalide" }, enTetesRep);

  const uid = utilisateur.id;

  // Motif de départ (facultatif), enregistré SANS aucun lien avec l'identité.
  // Un motif non enregistré ne doit jamais bloquer la demande.
  try {
    const motif = (corps.motif || "").toString().slice(0, 40);
    const message = (corps.message || "").toString().slice(0, 2000);
    if (motif || message) {
      await inserer(cfg, "departs_motifs", { motif: motif || null, message: message || null });
    }
  } catch (e) { }

  const maintenant = new Date();
  const prevue = new Date(maintenant.getTime() + JOURS_DELAI * 86400000);

  try {
    const e = await majLignes(cfg, "profiles", "id=eq." + encodeURIComponent(uid), {
      compte_supprime: true,
      suppression_demandee_le: maintenant.toISOString(),
      suppression_prevue_le: prevue.toISOString(),
    });
    if (e) { log("echec de la demande :", e); return reponse(500, { erreur: e }, enTetesRep); }
  } catch (e) {
    log("echec de la demande :", e && e.message);
    return reponse(500, { erreur: String(e && e.message ? e.message : e) }, enTetesRep);
  }

  log("demande enregistree, suppression prevue le", prevue.toISOString());
  return reponse(200, {
    ok: true,
    differee: true,
    jours: JOURS_DELAI,
    prevue_le: prevue.toISOString(),
  }, enTetesRep);
};

// Exposé pour `purge-planifiee.js` — un seul code de purge, deux appelants.
exports.purgerEchus = purgerEchus;
exports.config = config;
exports.TABLES = TABLES;
