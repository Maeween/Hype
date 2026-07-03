/* ============================================================
   HYPE — Pont vers Supabase (comptes + communauté)
   ------------------------------------------------------------
   Ce fichier contient TOUTES les fonctions pour parler à la
   base de données. À donner au dev (le fils).

   POUR L'ACTIVER, 2 CHOSES :

   1) Charger la librairie Supabase dans index.html, dans le <head> :
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
        <script src="hype-supabase.js"></script>
      (le CDN AVANT ce fichier)

   2) Coller la clé PUBLISHABLE ci-dessous (voir CLE_PUBLISHABLE).
      Supabase -> Réglages du projet -> Clés API -> clé "Publishable"
      (celle qui commence par sb_publishable_...  = la "sb_publis…" du récap)

   ⚠️ SÉCURITÉ (important) :
      - La clé PUBLISHABLE (sb_publishable_...) est PUBLIQUE : elle a le droit
        d'être dans le code de l'app. ✅
      - La clé SECRÈTE (sb_secret_...) ne doit JAMAIS être ici ni dans l'app.
        Elle sert uniquement côté serveur (Netlify Functions). ❌

   Toutes les fonctions renvoient { data, error } (ou { error }).
   On teste toujours error avant d'utiliser data.
   ============================================================ */


/* --- 1. Connexion à Supabase ------------------------------- */

const SUPABASE_URL   = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE_PUBLISHABLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK"; // ⚠️ REMPLACE par ta vraie clé Publishable

const { createClient } = window.supabase;              // fourni par le <script> CDN
const supa = createClient(SUPABASE_URL, CLE_PUBLISHABLE);


/* --- 2. Comptes (inscription / connexion) ------------------ */

// Créer un compte. Le pseudo est enregistré et sert au profil.
async function inscription(email, motDePasse, pseudo) {
  return await supa.auth.signUp({
    email,
    password: motDePasse,
    options: { data: { pseudo } }
  });
}

// Se connecter
async function connexion(email, motDePasse) {
  return await supa.auth.signInWithPassword({ email, password: motDePasse });
}

// Se déconnecter
async function deconnexion() {
  return await supa.auth.signOut();
}

// Qui est connecté ? (renvoie l'utilisateur, ou null)
async function utilisateurActuel() {
  const { data } = await supa.auth.getUser();
  return data?.user ?? null;
}

// Être prévenu à chaque connexion / déconnexion.
// callback reçoit l'utilisateur (ou null). Sert à afficher/cacher l'écran de login.
function surChangementConnexion(callback) {
  return supa.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
}


/* --- 3. Profil --------------------------------------------- */

// Lire mon profil (pseudo, avatar, écurie, ville)
async function monProfil() {
  const user = await utilisateurActuel();
  if (!user) return { data: null, error: "Pas connecté" };
  return await supa.from("profiles").select("*").eq("id", user.id).single();
}

// Mettre à jour mon profil (n'envoie que les champs à changer)
async function majProfil({ pseudo, avatar_url, ecurie, ville } = {}) {
  const user = await utilisateurActuel();
  if (!user) return { data: null, error: "Pas connecté" };
  const champs = {};
  if (pseudo     !== undefined) champs.pseudo     = pseudo;
  if (avatar_url !== undefined) champs.avatar_url = avatar_url;
  if (ecurie     !== undefined) champs.ecurie     = ecurie;
  if (ville      !== undefined) champs.ville      = ville;
  return await supa.from("profiles").update(champs).eq("id", user.id).select().single();
}


/* --- 4. Photos (upload dans le bucket "photos") ------------ */

// Envoie un fichier photo, renvoie { url, error }
async function envoyerPhoto(fichier) {
  const user = await utilisateurActuel();
  if (!user) return { url: null, error: "Pas connecté" };
  const extension = (fichier.name.split(".").pop() || "jpg").toLowerCase();
  const chemin = user.id + "/" + Date.now() + "." + extension;
  const { error } = await supa.storage.from("photos").upload(chemin, fichier);
  if (error) return { url: null, error };
  const { data } = supa.storage.from("photos").getPublicUrl(chemin);
  return { url: data.publicUrl, error: null };
}


/* --- 5. Publier un résultat -------------------------------- */

// Publie un résultat de concours.
// fichierPhoto = un File (optionnel) ; media_url = lien YouTube/Insta/TikTok/Facebook (optionnel)
async function publierResultat({ concours, classement, fichierPhoto, media_url } = {}) {
  const user = await utilisateurActuel();
  if (!user) return { data: null, error: "Pas connecté" };

  let photo_url = null;
  if (fichierPhoto) {
    const res = await envoyerPhoto(fichierPhoto);
    if (res.error) return { data: null, error: res.error };
    photo_url = res.url;
  }

  return await supa.from("resultats").insert({
    user_id: user.id,
    concours,
    classement,
    photo_url,
    media_url: media_url || null
  }).select().single();
}


/* --- 6. Suivre (follow) ------------------------------------ */

async function suivre(idAsuivre) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("follows").insert({ follower_id: user.id, followed_id: idAsuivre });
}

async function nePlusSuivre(idAsuivre) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("follows").delete().eq("follower_id", user.id).eq("followed_id", idAsuivre);
}

// Liste des IDs des personnes que je suis
async function listeDesSuivis() {
  const user = await utilisateurActuel();
  if (!user) return { data: [], error: "Pas connecté" };
  const { data, error } = await supa.from("follows").select("followed_id").eq("follower_id", user.id);
  return { data: (data || []).map(f => f.followed_id), error };
}

// Liste des vrais cavaliers (profils inscrits), avec .estSuivi pour chacun.
// Exclut mon propre profil automatiquement si je suis connecté.
async function listerCavaliers({ limite = 30 } = {}) {
  const user = await utilisateurActuel();
  let requete = supa.from("profiles").select("id, pseudo, avatar_url, ecurie, ville").limit(limite);
  if (user) requete = requete.neq("id", user.id);
  const { data: profils, error } = await requete;
  if (error) return { data: [], error };

  let suivisIds = [];
  if (user) {
    const res = await listeDesSuivis();
    suivisIds = res.data || [];
  }

  const liste = (profils || []).map(p => ({
    ...p,
    estSuivi: suivisIds.indexOf(p.id) >= 0
  }));
  return { data: liste, error: null };
}


/* --- 7. Le fil (résultats + auteur + likes) ---------------- */

// Renvoie les résultats prêts à afficher.
// options : { seulementSuivis: true } => "Ceux que je suis" ; sinon "Tous".
// Chaque résultat renvoyé contient en plus : .auteur (pseudo, avatar), .nbLikes, .jeLike
async function fil({ seulementSuivis = false } = {}) {
  const user = await utilisateurActuel();

  // 1) les résultats
  let requete = supa.from("resultats").select("*").order("created_at", { ascending: false }).limit(50);
  if (seulementSuivis) {
    if (!user) return { data: [], error: "Pas connecté" };
    const { data: ids } = await listeDesSuivis();
    if (!ids.length) return { data: [], error: null };
    requete = requete.in("user_id", ids);
  }
  const { data: resultats, error } = await requete;
  if (error) return { data: [], error };
  if (!resultats || !resultats.length) return { data: [], error: null };

  // 2) les profils des auteurs (une seule requête)
  const idsAuteurs = [...new Set(resultats.map(r => r.user_id))];
  const { data: profils } = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsAuteurs);
  const parId = {};
  (profils || []).forEach(p => { parId[p.id] = p; });

  // 3) les likes (nombre + est-ce que MOI j'ai liké)
  const idsResultats = resultats.map(r => r.id);
  const { data: likes } = await supa.from("likes").select("resultat_id, user_id").in("resultat_id", idsResultats);
  const nb = {}, moi = {};
  (likes || []).forEach(l => {
    nb[l.resultat_id] = (nb[l.resultat_id] || 0) + 1;
    if (user && l.user_id === user.id) moi[l.resultat_id] = true;
  });

  // 4) on assemble tout
  const liste = resultats.map(r => ({
    ...r,
    auteur:  parId[r.user_id] || { pseudo: "Cavalier", avatar_url: null },
    nbLikes: nb[r.id] || 0,
    jeLike:  !!moi[r.id]
  }));
  return { data: liste, error: null };
}


/* --- 8. Aimer (like) --------------------------------------- */

async function aimer(idResultat) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("likes").insert({ user_id: user.id, resultat_id: idResultat });
}

async function retirerLike(idResultat) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("likes").delete().eq("user_id", user.id).eq("resultat_id", idResultat);
}


/* --- 9. Presence a un evenement (ex: "lamotte") ------------- */

// Indique ma presence a un evenement
async function indiquerPresence(evenement) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("presences").upsert({ user_id: user.id, evenement });
}

// Retire ma presence
async function retirerPresence(evenement) {
  const user = await utilisateurActuel();
  if (!user) return { error: "Pas connecté" };
  return await supa.from("presences").delete().eq("user_id", user.id).eq("evenement", evenement);
}

// Est-ce que JE suis present a cet evenement ?
async function jeSuisPresent(evenement) {
  const user = await utilisateurActuel();
  if (!user) return { present: false, error: "Pas connecté" };
  const { data, error } = await supa.from("presences").select("user_id").eq("user_id", user.id).eq("evenement", evenement).maybeSingle();
  return { present: !!data, error };
}

// Liste des vrais profils presents a un evenement
async function listerPresents(evenement) {
  const { data: presences, error } = await supa.from("presences").select("user_id").eq("evenement", evenement);
  if (error) return { data: [], error };
  if (!presences || !presences.length) return { data: [], error: null };
  const ids = presences.map(p => p.user_id);
  const { data: profils } = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").in("id", ids);
  return { data: profils || [], error: null };
}
