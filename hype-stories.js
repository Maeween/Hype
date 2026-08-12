/* ============================================================================
   HYPE ▸ hype-stories.js — v1 — SESSION 114 (12/08/2026)

   LES STORIES DES CAVALIERS.
   Demande de Blandine : « les stories qui puissent être visibles par tous les
   cavaliers qu'on connaît et également ceux qu'on ne connaît pas ». Durée de
   vie 7 jours. « Garder en souvenir » range la photo dans l'album Hype
   Memories du cavalier. Bandeau sur les 4 pages : Cavalier, Communauté,
   Club, Écurie.

   POURQUOI UN FICHIER COMPAGNON ET PAS L'INDEX
   Doctrine Flutter du projet : une fonctionnalité NEUVE se pose dans une
   architecture plus propre que l'existant. L'index fait déjà 8,7 Mo ; ce
   module est autonome (ses helpers de données, ses composants, ses textes)
   et se laisse emporter tel quel le jour d'une migration.

   RÈGLE DE VERSION : à chaque livraison de ce fichier, incrémenter
   HYPE_STORIES_VERSION ici ET le ?v= de la balise dans index.html.

   DESIGN BIBLE RESPECTÉE
   - AUCUN filtre, voile ni dégradé posé sur une photo. La visionneuse pose la
     photo nue sur du noir absolu ; la légende et les actions vivent SOUS la
     photo, sur des surfaces d'interface givrées. C'est la règle absolue du
     projet et elle est la raison de cette mise en page (et non un choix
     esthétique de commodité).
   - Palette exclusive : #060709, #111417, #20D9F5, #F4F7FA, gris froid.
   - La lumière turquoise sert à guider : liseré turquoise = story non vue,
     gris froid = déjà vue.

   PAS DE MODÉRATION VISIBLE — décision de Blandine du 12/08 : « y a pas assez
   de cavaliers pour qu'on se pose des questions sur la modération, la
   modération arrivera plus tard ». Sont donc en place, et rien de plus :
   - le filtre `blocages` à la lecture (aucune interface, exactement ce que
     fait déjà la messagerie) ;
   - un bouton « Signaler » dans la visionneuse (table hype_stories_signalements).
     DÉDUCTION DE CLAUDE — À VALIDER : ajouté parce qu'un fil ouvert aux
     inconnus sans aucun moyen de signalement est refusé par l'App Store
     (guideline 1.2, contenu généré par les utilisateurs). Retrait = une ligne.
============================================================================ */

var HYPE_STORIES_VERSION = "2";
try { if (typeof window !== "undefined") window.HYPE_STORIES_VERSION = HYPE_STORIES_VERSION; } catch (eV) { }

/* Durée de vie : 7 jours (décision Blandine du 12/08). */
var HS_JOURS = 7;
var HS_DUREE_MS = HS_JOURS * 24 * 60 * 60 * 1000;
/* Défilement automatique d'une story dans la visionneuse. */
var HS_DUREE_VUE_MS = 6000;
/* Longueur de la légende. */
var HS_LEGENDE_MAX = 140;
/* Nom de l'album de destination des souvenirs (DÉDUCTION DE CLAUDE — À VALIDER). */
var HS_ALBUM_NOM = "Mes stories";

/* ---------------------------------------------------------------------------
   1. LES VUES — dans le localStorage, PAS en base.
   Une table de vues aurait voulu une ligne par cavalier et par story, donc de
   la RLS et de l'écriture à chaque ouverture. Le liseré « déjà vu » est un
   confort d'affichage local : il n'a aucune raison de voyager d'un appareil à
   l'autre. On ne stocke que des identifiants (quelques octets) — jamais
   d'image, conformément à la règle du projet.
--------------------------------------------------------------------------- */
var HS_CLE_VUES = "hype_stories_vues";
function hsVues() {
  try { var b = localStorage.getItem(HS_CLE_VUES); if (!b) return {}; var o = JSON.parse(b); return (o && typeof o === "object") ? o : {}; }
  catch (e) { return {}; }
}
function hsMarquerVue(id) {
  if (!id) return;
  try {
    var o = hsVues(); o[String(id)] = Date.now();
    /* Ménage : on ne garde que les 400 derniers identifiants, sinon la clé
       gonfle indéfiniment sur un appareil utilisé longtemps. */
    var cles = Object.keys(o);
    if (cles.length > 400) {
      cles.sort(function (a, b) { return o[b] - o[a]; });
      var g = {}; for (var i = 0; i < 300; i++) { g[cles[i]] = o[cles[i]]; }
      o = g;
    }
    localStorage.setItem(HS_CLE_VUES, JSON.stringify(o));
  } catch (e) { }
}

/* ---------------------------------------------------------------------------
   2. LECTURE / ÉCRITURE
--------------------------------------------------------------------------- */

/* Publie une story. Renvoie { data, error }. */
async function hsPublierStory(fichier, legende) {
  try {
    if (typeof supa === "undefined" || !supa) return { data: null, error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { data: null, error: "Pas connecté" };
    var r = await envoyerPhoto(fichier);
    if (r.error || !r.url) return { data: null, error: r.error || "Envoi impossible" };
    var ecurie = null;
    try { ecurie = await monEcurieNom(); } catch (eE) { ecurie = null; }
    if (ecurie === "__perso__") ecurie = null;
    var expire = new Date(Date.now() + HS_DUREE_MS).toISOString();
    return await supa.from("hype_stories").insert({
      user_id: user.id,
      photo_url: r.url,
      legende: (legende ? String(legende).slice(0, HS_LEGENDE_MAX) : null),
      ecurie: ecurie,
      expire_le: expire
    }).select().single();
  } catch (e) { return { data: null, error: String(e) }; }
}

async function hsSupprimerStory(id) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    return await supa.from("hype_stories").delete().eq("id", id).eq("user_id", user.id);
  } catch (e) { return { error: String(e) }; }
}

async function hsSignalerStory(id, motif) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    return await supa.from("hype_stories_signalements").insert({
      story_id: id, signale_par: user.id, motif: String(motif || "").slice(0, 500)
    });
  } catch (e) { return { error: String(e) }; }
}

/* Les identifiants avec qui il y a un blocage, dans un sens ou dans l'autre.
   Deux requêtes pour toute la liste, au lieu d'un aller-retour par cavalier :
   le bandeau peut afficher trente auteurs. */
async function hsIdsBloques() {
  var ens = {};
  try {
    if (typeof supa === "undefined" || !supa) return ens;
    var user = await utilisateurActuel();
    if (!user) return ens;
    var a = await supa.from("blocages").select("utilisateur_bloque").eq("bloque_par", user.id);
    ((a && a.data) || []).forEach(function (l) { if (l && l.utilisateur_bloque) ens[l.utilisateur_bloque] = true; });
    var b = await supa.from("blocages").select("bloque_par").eq("utilisateur_bloque", user.id);
    ((b && b.data) || []).forEach(function (l) { if (l && l.bloque_par) ens[l.bloque_par] = true; });
  } catch (e) { }
  return ens;
}

/* Lit les stories vivantes et les regroupe par auteur.
   Renvoie { data: [ { user_id, pseudo, avatar_url, ecurie, stories:[...],
   moi, proche, toutesVues } ], moiId, error }.
   PRIORITÉ D'AFFICHAGE (demande initiale de Blandine, « en priorité ... des
   cavaliers qui les entourent ») : moi d'abord, puis mon écurie, puis les
   cavaliers que je suis, puis tous les autres. L'ouverture à tous ne change
   que le PÉRIMÈTRE ; l'ordre reste celui du cercle proche. */
async function hsListerStories() {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], moiId: null, error: "indisponible" };
    var user = null; try { user = await utilisateurActuel(); } catch (eU) { user = null; }
    var moiId = user ? user.id : null;

    var maintenant = new Date().toISOString();
    var r = await supa.from("hype_stories").select("*").gt("expire_le", maintenant).order("created_at", { ascending: false }).limit(300);
    if (r && r.error) return { data: [], moiId: moiId, error: r.error };
    var lignes = (r && r.data) || [];
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    var bloques = await hsIdsBloques();
    lignes = lignes.filter(function (s) { return s && s.user_id && !bloques[s.user_id]; });
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    /* Auteurs */
    var ids = []; var vu = {};
    lignes.forEach(function (s) { if (!vu[s.user_id]) { vu[s.user_id] = true; ids.push(s.user_id); } });
    var parId = {};
    try {
      var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").in("id", ids);
      ((rp && rp.data) || []).forEach(function (p) { parId[p.id] = p; });
    } catch (eP) { }

    /* Mon cercle : mon écurie (par noyau, tolérant) + les cavaliers que je suis */
    var monEcurie = null;
    try { monEcurie = await monEcurieNom(); } catch (eM) { monEcurie = null; }
    var noyauMoi = "";
    try { noyauMoi = (monEcurie && monEcurie !== "__perso__" && typeof noyauEcurie === "function") ? noyauEcurie(monEcurie) : ""; } catch (eN) { noyauMoi = ""; }
    var suivis = {};
    try {
      if (moiId) {
        var rs = await supa.from("follows").select("followed_id").eq("follower_id", moiId);
        ((rs && rs.data) || []).forEach(function (l) { if (l && l.followed_id) suivis[l.followed_id] = true; });
      }
    } catch (eS) { }

    var vues = hsVues();
    var groupes = [];
    var index = {};
    lignes.forEach(function (s) {
      var g = index[s.user_id];
      if (!g) {
        var prof = parId[s.user_id] || {};
        var ecA = prof.ecurie || s.ecurie || "";
        var noyauA = "";
        try { noyauA = (ecA && typeof noyauEcurie === "function") ? noyauEcurie(ecA) : ""; } catch (eNA) { noyauA = ""; }
        g = {
          user_id: s.user_id,
          pseudo: prof.pseudo || "Cavalier",
          avatar_url: prof.avatar_url || null,
          ecurie: ecA,
          moi: !!(moiId && s.user_id === moiId),
          memeEcurie: !!(noyauMoi && noyauA && noyauMoi === noyauA),
          suivi: !!suivis[s.user_id],
          stories: []
        };
        index[s.user_id] = g; groupes.push(g);
      }
      g.stories.push(s);
    });

    groupes.forEach(function (g) {
      /* Dans un groupe, on lit de la plus ancienne à la plus récente. */
      g.stories.sort(function (a, b) { return String(a.created_at) < String(b.created_at) ? -1 : 1; });
      g.toutesVues = g.stories.every(function (s) { return !!vues[String(s.id)]; });
      g.rang = g.moi ? 0 : (g.memeEcurie ? 1 : (g.suivi ? 2 : 3));
      g.dernier = g.stories[g.stories.length - 1].created_at || "";
    });
    groupes.sort(function (a, b) {
      if (a.rang !== b.rang) return a.rang - b.rang;
      /* À rang égal : les non vues d'abord, puis les plus récentes. */
      if (a.toutesVues !== b.toutesVues) return a.toutesVues ? 1 : -1;
      return String(a.dernier) < String(b.dernier) ? 1 : -1;
    });

    return { data: groupes, moiId: moiId, error: null };
  } catch (e) { return { data: [], moiId: null, error: String(e) }; }
}

/* « Garder en souvenir » : la photo rejoint l'album Hype Memories du cavalier
   (cible « cavalier:<id> », exactement la cible que lit AlbumsCheval sur la
   page Mémoires). On réutilise l'album HS_ALBUM_NOM s'il existe, sinon on le
   crée. Le plafond gratuit de 20 photos par album est respecté, comme partout
   ailleurs dans l'application. */
async function hsGarderEnSouvenir(story, premium) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    if (!story || !story.photo_url) return { error: "Photo absente" };
    if (story.user_id !== user.id) return { error: "Ce n'est pas ta story" };
    var cible = "cavalier:" + user.id;
    var alb = null;
    try {
      var rl = await listerAlbumsCheval(cible);
      alb = ((rl && rl.data) || []).filter(function (a) { return a && a.user_id === user.id && String(a.nom || "") === HS_ALBUM_NOM; })[0] || null;
    } catch (eL) { alb = null; }
    if (!alb) {
      var rc = await creerAlbumCheval(cible, HS_ALBUM_NOM);
      if (rc && rc.error) return { error: rc.error };
      alb = rc && rc.data;
    }
    if (!alb) return { error: "Album indisponible" };
    var photos = (alb.photos || []).slice();
    if (photos.indexOf(story.photo_url) >= 0) return { deja: true, error: null };
    if (!premium && photos.length >= 20) return { error: "quota" };
    photos.push(story.photo_url);
    var rm = await majAlbumCheval(alb.id, { photos: photos });
    if (rm && rm.error) return { error: rm.error };
    /* On marque la story pour que le bouton devienne « Gardée ». */
    try { await supa.from("hype_stories").update({ garde: true }).eq("id", story.id).eq("user_id", user.id); } catch (eG) { }
    return { error: null };
  } catch (e) { return { error: String(e) }; }
}

try {
  if (typeof window !== "undefined") {
    window.hsPublierStory = hsPublierStory;
    window.hsListerStories = hsListerStories;
    window.hsSupprimerStory = hsSupprimerStory;
    window.hsSignalerStory = hsSignalerStory;
    window.hsGarderEnSouvenir = hsGarderEnSouvenir;
    window.hsMarquerVue = hsMarquerVue;
  }
} catch (eW) { }

/* ---------------------------------------------------------------------------
   3. TEXTES — six langues (FR/EN/ES/IT/JA/DE), règle du projet.
--------------------------------------------------------------------------- */
var HS_TXT = {
  ma: { fr: "Ma story", en: "My story", es: "Mi story", it: "La mia story", ja: "マイストーリー", de: "Meine Story" },
  ajouter: { fr: "Ajouter une story", en: "Add a story", es: "A\u00f1adir una story", it: "Aggiungi una story", ja: "ストーリーを追加", de: "Story hinzuf\u00fcgen" },
  legende: { fr: "Une l\u00e9gende (facultatif)\u2026", en: "A caption (optional)\u2026", es: "Un pie de foto (opcional)\u2026", it: "Una didascalia (facoltativa)\u2026", ja: "キャプション（任意）…", de: "Eine Bildunterschrift (optional)\u2026" },
  publier: { fr: "Publier", en: "Publish", es: "Publicar", it: "Pubblica", ja: "投稿する", de: "Ver\u00f6ffentlichen" },
  annuler: { fr: "Annuler", en: "Cancel", es: "Cancelar", it: "Annulla", ja: "キャンセル", de: "Abbrechen" },
  envoi: { fr: "Envoi\u2026", en: "Uploading\u2026", es: "Enviando\u2026", it: "Invio\u2026", ja: "送信中…", de: "Wird gesendet\u2026" },
  duree: { fr: "Visible 7 jours par tous les cavaliers.", en: "Visible for 7 days to all riders.", es: "Visible 7 d\u00edas para todos los jinetes.", it: "Visibile 7 giorni a tutti i cavalieri.", ja: "7日間、すべての騎手に表示されます。", de: "7 Tage f\u00fcr alle Reiter sichtbar." },
  garder: { fr: "Garder en souvenir", en: "Keep as a memory", es: "Guardar como recuerdo", it: "Conserva come ricordo", ja: "思い出として保存", de: "Als Erinnerung behalten" },
  gardee: { fr: "Gard\u00e9e \u2713", en: "Kept \u2713", es: "Guardada \u2713", it: "Conservata \u2713", ja: "保存しました \u2713", de: "Behalten \u2713" },
  supprimer: { fr: "Supprimer", en: "Delete", es: "Eliminar", it: "Elimina", ja: "削除", de: "L\u00f6schen" },
  signaler: { fr: "Signaler", en: "Report", es: "Denunciar", it: "Segnala", ja: "報告する", de: "Melden" },
  signale: { fr: "Signal\u00e9e \u2713", en: "Reported \u2713", es: "Denunciada \u2713", it: "Segnalata \u2713", ja: "報告しました \u2713", de: "Gemeldet \u2713" },
  quota: { fr: "Limite de 20 photos par album en gratuit \u2014 passe Premium pour aller plus loin.", en: "20 photos per album on the free plan \u2014 go Premium for more.", es: "L\u00edmite de 20 fotos por \u00e1lbum en gratuito.", it: "Limite di 20 foto per album nel piano gratuito.", ja: "無料プランではアルバムごとに20枚までです。", de: "20 Fotos pro Album im Gratis-Plan." },
  echec: { fr: "Enregistrement impossible \u2014 v\u00e9rifie ta connexion.", en: "Could not save \u2014 check your connection.", es: "No se pudo guardar.", it: "Salvataggio non riuscito.", ja: "保存できませんでした。", de: "Speichern nicht m\u00f6glich." },
  ajoutee: { fr: "Ta story est en ligne.", en: "Your story is live.", es: "Tu story est\u00e1 publicada.", it: "La tua story \u00e8 online.", ja: "ストーリーを公開しました。", de: "Deine Story ist online." },
  connecte: { fr: "Connecte-toi pour publier une story.", en: "Sign in to post a story.", es: "Inicia sesi\u00f3n para publicar.", it: "Accedi per pubblicare.", ja: "投稿するにはログインしてください。", de: "Melde dich an, um zu ver\u00f6ffentlichen." },
  imgKo: { fr: "Photo indisponible", en: "Photo unavailable", es: "Foto no disponible", it: "Foto non disponibile", ja: "写真を読み込めません", de: "Foto nicht verf\u00fcgbar" },
  maintenant: { fr: "\u00e0 l'instant", en: "just now", es: "ahora mismo", it: "adesso", ja: "たった今", de: "gerade eben" },
  ilYa: { fr: "il y a ", en: "", es: "hace ", it: "", ja: "", de: "vor " },
  jour: { fr: " j", en: "d ago", es: " d", it: " g", ja: "日前", de: " T" },
  heure: { fr: " h", en: "h ago", es: " h", it: " h", ja: "時間前", de: " Std." },
  min: { fr: " min", en: "min ago", es: " min", it: " min", ja: "分前", de: " Min." }
};
function hsT(cle, lg) {
  var o = HS_TXT[cle] || {}; var l = lg || "fr";
  /* Attention : certaines valeurs sont VOLONTAIREMENT vides (le préfixe
     « il y a » n'existe pas en anglais ni en japonais). Un test de véracité
     les ferait retomber sur le français et produirait « il y a 2d ago ».
     On teste donc la PRÉSENCE de la clé, pas sa valeur. */
  if (Object.prototype.hasOwnProperty.call(o, l)) return o[l];
  if (Object.prototype.hasOwnProperty.call(o, "fr")) return o.fr;
  return "";
}
/* Temps relatif, court, dans la langue du cavalier. */
function hsTempsRelatif(iso, lg) {
  try {
    var d = new Date(iso).getTime(); if (!d) return "";
    var ecart = Date.now() - d;
    if (ecart < 60000) return hsT("maintenant", lg);
    var min = Math.floor(ecart / 60000);
    if (min < 60) return hsT("ilYa", lg) + min + hsT("min", lg);
    var hh = Math.floor(min / 60);
    if (hh < 24) return hsT("ilYa", lg) + hh + hsT("heure", lg);
    var jj = Math.floor(hh / 24);
    return hsT("ilYa", lg) + jj + hsT("jour", lg);
  } catch (e) { return ""; }
}

/* ---------------------------------------------------------------------------
   4. LE BANDEAU
   Un seul composant, quatre appels (page Cavalier, Communauté, Club, Écurie).
   Pas quatre copies qui divergeront dans six mois.
--------------------------------------------------------------------------- */
function BandeauStories(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var premium = !!(app && app.premium);
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var gS = React.useState([]), groupes = gS[0], setGroupes = gS[1];
  var mS = React.useState(null), moiId = mS[0], setMoiId = mS[1];
  var oS = React.useState(-1), ouvert = oS[0], setOuvert = oS[1];      /* index du groupe ouvert */
  var cS = React.useState(false), composer = cS[0], setComposer = cS[1];
  var tS = React.useState(null), toast = tS[0], setToast = tS[1];
  var fileRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  function bip(txt) { setToast(txt); try { setTimeout(function () { setToast(null); }, 2800); } catch (e) { } }

  function charger() {
    if (typeof hsListerStories !== "function") return;
    hsListerStories().then(function (r) {
      if (!vivantRef.current) return;
      setGroupes((r && r.data) || []);
      setMoiId((r && r.moiId) || null);
    });
  }
  React.useEffect(function () {
    vivantRef.current = true;
    charger();
    return function () { vivantRef.current = false; };
  }, []);

  function choisirFichier() {
    if (!moiId) { bip(hsT("connecte", lg)); return; }
    try { fileRef.current && fileRef.current.click(); } catch (e) { }
  }
  var fS = React.useState(null), fichier = fS[0], setFichier = fS[1];
  function surFichier(ev) {
    try {
      var f = ev && ev.target && ev.target.files && ev.target.files[0];
      if (f) { setFichier(f); setComposer(true); }
      if (ev && ev.target) ev.target.value = "";
    } catch (e) { }
  }

  /* Un rond du bandeau. La photo n'est JAMAIS assombrie : le liseré est un
     anneau EXTÉRIEUR (padding du conteneur), pas un voile posé dessus. */
  function rond(g, i) {
    var taille = 62;
    var anneau = g.toutesVues ? "rgba(255,255,255,0.16)" : ("linear-gradient(135deg," + tn + "," + tnL + ")");
    var derniere = g.stories[g.stories.length - 1];
    /* 12/08 (114b) — signalé par Blandine : le rond affichait la photo de
       PROFIL et non la story. Un bandeau de stories montre ce qu'il y a
       DEDANS ; l'avatar ne sert que de repli si la photo manque. */
    var apercu = ((derniere && derniere.photo_url) || g.avatar_url || null);
    return h("button", {
      key: "st" + g.user_id,
      onClick: function () { setOuvert(i); },
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: 70, textAlign: "center" }
    },
      h("div", { style: { width: taille, height: taille, borderRadius: "50%", margin: "0 auto", padding: 2.4, background: anneau, boxShadow: g.toutesVues ? "none" : ("0 0 14px " + tA(0.34)) } },
        h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid #060709", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
          apercu
            ? h("img", { src: apercu, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : h("span", { style: { fontFamily: C, fontSize: 20, fontWeight: 700, color: tnL } }, String(g.pseudo || "?").charAt(0).toUpperCase()))),
      h("div", { style: { fontSize: 9.5, marginTop: 6, fontFamily: M, fontWeight: g.toutesVues ? 500 : 700, color: g.toutesVues ? "#8A929C" : "#E4ECEF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
        g.moi ? hsT("ma", lg) : (g.pseudo || "Cavalier")),
      (g.stories.length > 1)
        ? h("div", { style: { fontSize: 8.5, marginTop: 1, fontFamily: M, color: tA(0.85) } }, String(g.stories.length))
        : null);
  }

  /* Le bouton d'ajout. Il reste visible même sans aucune story : c'est le
     seul point d'entrée de la fonctionnalité. */
  function rondAjout() {
    return h("button", {
      key: "stplus",
      onClick: choisirFichier,
      "aria-label": hsT("ajouter", lg),
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: 70, textAlign: "center" }
    },
      h("div", { style: { width: 62, height: 62, borderRadius: "50%", margin: "0 auto", border: "1px dashed " + tA(0.55), background: "rgba(17,20,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("span", { style: { fontSize: 24, lineHeight: 1, color: tnL, fontWeight: 300 } }, "+")),
      h("div", { style: { fontSize: 9.5, marginTop: 6, fontFamily: M, fontWeight: 700, color: tnL, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, hsT("ma", lg)));
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };

  return h("div", { style: { padding: (props && props.padding) || "16px 0 6px" } },
    h("input", { ref: fileRef, type: "file", accept: "image/*", onChange: surFichier, style: { display: "none" } }),
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 8, overflowX: "auto", overflowY: "hidden", padding: "0 14px 4px", WebkitOverflowScrolling: "touch" } },
      rondAjout(),
      groupes.map(function (g, i) { return rond(g, i); })),

    (ouvert >= 0 && groupes[ouvert])
      ? h(VisionneuseStories, {
        groupes: groupes, depart: ouvert, moiId: moiId, premium: premium, langue: lg,
        onFermer: function () { setOuvert(-1); charger(); }
      })
      : null,

    composer
      ? h(ComposeurStory, {
        fichier: fichier, langue: lg,
        onFermer: function () { setComposer(false); setFichier(null); },
        onPublie: function () { setComposer(false); setFichier(null); bip(hsT("ajoutee", lg)); charger(); },
        onEchec: function () { setComposer(false); setFichier(null); bip(hsT("echec", lg)); }
      })
      : null,

    toast
      ? portail(h("div", { style: { position: "fixed", left: 16, right: 16, bottom: "calc(env(safe-area-inset-bottom) + 96px)", zIndex: 9400, padding: "12px 16px", borderRadius: 14, background: "rgba(9,13,17,0.94)", border: "1px solid " + tA(0.4), color: "#EDF2F5", fontSize: 12.5, fontFamily: M, textAlign: "center", lineHeight: 1.45 } }, toast), document.body)
      : null);
}

/* ---------------------------------------------------------------------------
   5. LE COMPOSEUR — feuille basse : aperçu de la photo + légende + publier.
   La photo d'aperçu est posée NUE sur du noir : aucun voile, aucun dégradé.
--------------------------------------------------------------------------- */
function ComposeurStory(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState(""), legende = lS[0], setLegende = lS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var aS = React.useState(null), apercu = aS[0], setApercu = aS[1];
  var corpsRef = React.useRef(null);

  React.useEffect(function () {
    var url = null;
    try { if (props.fichier && window.URL && window.URL.createObjectURL) { url = window.URL.createObjectURL(props.fichier); setApercu(url); } } catch (e) { }
    return function () { try { if (url && window.URL && window.URL.revokeObjectURL) window.URL.revokeObjectURL(url); } catch (e2) { } };
  }, [props.fichier]);

  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  async function publier() {
    if (busy) return;
    setBusy(true);
    try {
      var r = await hsPublierStory(props.fichier, legende);
      if (r && r.error) { setBusy(false); if (props.onEchec) props.onEchec(); return; }
      setBusy(false);
      if (props.onPublie) props.onPublie();
    } catch (e) { setBusy(false); if (props.onEchec) props.onEchec(); }
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  return portail(
    h("div", {
      onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
      style: { position: "fixed", inset: 0, zIndex: 9200, background: "rgba(4,6,9,0.86)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        style: { width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" }
      },
        h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 16px" } }),
        h("div", { style: { fontFamily: C, fontSize: 14, letterSpacing: 1.8, textTransform: "uppercase", color: "#F4F7FA", textAlign: "center" } }, hsT("ajouter", lg)),
        h("div", { style: { fontSize: 10.5, fontFamily: M, color: tA(0.9), textAlign: "center", marginTop: 6, letterSpacing: 0.3 } }, hsT("duree", lg)),
        apercu
          ? h("div", { style: { marginTop: 16, borderRadius: 16, overflow: "hidden", background: "#060709", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: "44vh" } },
            h("img", { src: apercu, alt: "", style: { width: "100%", maxHeight: "44vh", objectFit: "contain", display: "block" } }))
          : null,
        h("textarea", {
          value: legende, onChange: function (e) { setLegende(e.target.value); },
          rows: 2, maxLength: HS_LEGENDE_MAX, placeholder: hsT("legende", lg),
          style: { marginTop: 14, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.5 }
        }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", { onClick: publier, disabled: busy, style: { flex: 1.4, padding: "13px 0", borderRadius: 999, border: "none", background: busy ? "rgba(32,217,245,0.35)" : ("linear-gradient(90deg," + tn + "," + tnL + ")"), color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: busy ? "default" : "pointer" } }, busy ? hsT("envoi", lg) : hsT("publier", lg))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   6. LA VISIONNEUSE
   Photo nue au centre, sur noir absolu. En-tête au-dessus, légende et actions
   en dessous, sur surfaces givrées : la photo ne reçoit AUCUN calque.
   - progression écrite directement dans le style du DOM (pas d'état React) :
     un re-rendu à 60 images par seconde tuerait l'onglet sur iPhone. Leçon
     déjà payée sur ce projet.
   - aucun setPointerCapture : c'était la cause du blocage de défilement
     Android diagnostiqué en juillet. On reste sur les événements touch.
--------------------------------------------------------------------------- */
function VisionneuseStories(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var groupes = props.groupes || [];
  var gS = React.useState(props.depart || 0), ig = gS[0], setIg = gS[1];
  var sS = React.useState(0), is = sS[0], setIs = sS[1];
  var aS = React.useState(null), action = aS[0], setAction = aS[1];   /* "gardee" | "signale" | "quota" | "echec" */
  var pauseRef = React.useRef(false);
  var barreRef = React.useRef(null);
  var glisseRef = React.useRef({ y0: 0, actif: false });
  var boiteRef = React.useRef(null);

  var groupe = groupes[ig] || null;
  var story = groupe ? (groupe.stories[is] || null) : null;
  var estMoi = !!(groupe && props.moiId && groupe.user_id === props.moiId);

  /* 12/08 (114b) — CORRECTIF DU DÉFAUT SIGNALÉ PAR BLANDINE.
     Le minuteur de 6 s démarrait au MONTAGE. Sur une connexion réelle, la
     photo met plusieurs secondes à descendre de Supabase : la story se
     refermait avant que l'image n'apparaisse, et le rond passait en « déjà
     vue » alors que rien n'avait été vu. Il fallait s'y reprendre à quatre
     fois pour voir sa propre story.
     Désormais le chargement de l'image est le point de départ de tout :
     le minuteur, la barre de progression ET le marquage « vue ». */
  var chS = React.useState(false), chargee = chS[0], setChargee = chS[1];
  var erS = React.useState(false), erreurImg = erS[0], setErreurImg = erS[1];

  function fermer() { if (props.onFermer) props.onFermer(); }

  function suivante() {
    if (!groupe) { fermer(); return; }
    if (is + 1 < groupe.stories.length) { setIs(is + 1); return; }
    if (ig + 1 < groupes.length) { setIg(ig + 1); setIs(0); return; }
    fermer();
  }
  function precedente() {
    if (is - 1 >= 0) { setIs(is - 1); return; }
    if (ig - 1 >= 0) {
      var gp = groupes[ig - 1];
      setIg(ig - 1); setIs(gp ? Math.max(0, gp.stories.length - 1) : 0); return;
    }
  }

  /* Changement de story : on repart d'une image non chargée. Le marquage
     « vue » n'est PLUS fait ici (voir surImageChargee). */
  React.useEffect(function () {
    setChargee(false); setErreurImg(false); setAction(null);
  }, [(story && story.id) || ""]);

  /* L'image est arrivée : on marque la story vue, et le minuteur peut partir.
     En cas d'échec de chargement on fait la même chose, sinon la visionneuse
     resterait bloquée indéfiniment sur un fichier introuvable. */
  function surImageChargee() {
    if (story && story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
    setChargee(true);
    /* Préchargement de la suivante : elle sera déjà là au tap. */
    try {
      var apres = null;
      if (groupe && groupe.stories[is + 1]) apres = groupe.stories[is + 1];
      else if (groupes[ig + 1] && groupes[ig + 1].stories[0]) apres = groupes[ig + 1].stories[0];
      if (apres && apres.photo_url) { var im = new Image(); im.src = apres.photo_url; }
    } catch (e) { }
  }
  function surImageEchec() {
    if (story && story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
    setErreurImg(true); setChargee(true);
  }

  /* Barre de progression + passage automatique — seulement quand l'image
     est là. Avant, la barre reste à zéro : elle dit la vérité. */
  React.useEffect(function () {
    if (!story || !chargee) return;
    var debut = Date.now(); var reste = HS_DUREE_VUE_MS; var raf = 0; var vivant = true;
    function boucle() {
      if (!vivant) return;
      if (pauseRef.current) { debut = Date.now() - (HS_DUREE_VUE_MS - reste); raf = requestAnimationFrame(boucle); return; }
      var ecoule = Date.now() - debut;
      reste = Math.max(0, HS_DUREE_VUE_MS - ecoule);
      var pct = Math.min(100, (ecoule / HS_DUREE_VUE_MS) * 100);
      try { if (barreRef.current) barreRef.current.style.width = pct + "%"; } catch (e) { }
      if (pct >= 100) { vivant = false; suivante(); return; }
      raf = requestAnimationFrame(boucle);
    }
    try { if (barreRef.current) barreRef.current.style.width = "0%"; } catch (e2) { }
    raf = requestAnimationFrame(boucle);
    return function () { vivant = false; if (raf) cancelAnimationFrame(raf); };
  }, [(story && story.id) || "", ig, is, chargee]);

  async function garder() {
    if (!story) return;
    var r = await hsGarderEnSouvenir(story, !!props.premium);
    if (r && r.error === "quota") { setAction("quota"); return; }
    if (r && r.error) { setAction("echec"); return; }
    setAction("gardee");
  }
  async function signaler() {
    if (!story) return;
    var r = await hsSignalerStory(story.id, "story");
    if (r && r.error) { setAction("echec"); return; }
    setAction("signale");
  }
  async function supprimer() {
    if (!story) return;
    var r = await hsSupprimerStory(story.id);
    if (r && r.error) { setAction("echec"); return; }
    fermer();
  }

  /* Glissé vers le bas pour fermer. Pas de capture de pointeur. */
  function toucheDebut(e) {
    try { pauseRef.current = true; var t = e.touches && e.touches[0]; if (t) glisseRef.current = { y0: t.clientY, actif: true }; } catch (er) { }
  }
  function toucheBouge(e) {
    try {
      if (!glisseRef.current.actif) return;
      var t = e.touches && e.touches[0]; if (!t) return;
      var dy = t.clientY - glisseRef.current.y0;
      if (dy > 0 && boiteRef.current) boiteRef.current.style.transform = "translateY(" + Math.min(dy, 260) + "px)";
    } catch (er) { }
  }
  function toucheFin(e) {
    try {
      pauseRef.current = false;
      var dy = 0;
      var t = e.changedTouches && e.changedTouches[0];
      if (t) dy = t.clientY - glisseRef.current.y0;
      glisseRef.current.actif = false;
      if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)";
      if (dy > 110) fermer();
    } catch (er) { }
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  if (!groupe || !story) return null;

  var messages = {
    gardee: hsT("gardee", lg), signale: hsT("signale", lg),
    quota: hsT("quota", lg), echec: hsT("echec", lg)
  };

  return portail(
    h("div", {
      ref: boiteRef,
      onTouchStart: toucheDebut, onTouchMove: toucheBouge, onTouchEnd: toucheFin,
      style: { position: "fixed", inset: 0, zIndex: 9300, background: "#060709", display: "flex", flexDirection: "column", transition: "transform 160ms ease-out" }
    },
      /* --- barres de progression --- */
      h("div", { style: { display: "flex", gap: 4, padding: "calc(env(safe-area-inset-top) + 12px) 14px 0" } },
        groupe.stories.map(function (s, i) {
          var fait = i < is;
          return h("div", { key: "pb" + i, style: { flex: 1, height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.2)", overflow: "hidden" } },
            i === is
              ? h("div", { ref: barreRef, style: { width: "0%", height: "100%", background: tnL } })
              : h("div", { style: { width: fait ? "100%" : "0%", height: "100%", background: "rgba(255,255,255,0.62)" } }));
        })),

      /* --- en-tête : auteur + fermer (au-dessus de la photo, jamais dessus) --- */
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px" } },
        h("div", { style: { width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", border: "1px solid " + tA(0.5), background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
          groupe.avatar_url
            ? h("img", { src: groupe.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
            : h("span", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: tnL } }, String(groupe.pseudo || "?").charAt(0).toUpperCase())),
        h("div", { style: { minWidth: 0, flex: 1 } },
          h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, groupe.pseudo || "Cavalier"),
          h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginTop: 2 } },
            hsTempsRelatif(story.created_at, lg) + (groupe.ecurie ? (" \u00b7 " + groupe.ecurie) : ""))),
        h("button", { onClick: fermer, "aria-label": "Fermer", style: { width: 34, height: 34, borderRadius: "50%", flex: "0 0 auto", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "#E4ECEF", fontSize: 15, cursor: "pointer", fontFamily: M } }, "\u2715")),

      /* --- la photo, nue --- */
      h("div", { style: { flex: 1, position: "relative", minHeight: 0, background: "#060709", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("img", {
          src: story.photo_url, alt: "",
          onLoad: surImageChargee, onError: surImageEchec,
          style: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", opacity: chargee ? 1 : 0, transition: "opacity 220ms ease-out" }
        }),
        /* Attente : une respiration turquoise, pas un sablier. Design Bible —
           rien de parfaitement statique, la lumière guide. Elle disparaît dès
           que la photo est là. AUCUN calque ne reste sur l'image. */
        (!chargee)
          ? h("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 46, height: 46, borderRadius: "50%", border: "1px solid " + tA(0.45), boxShadow: "0 0 26px " + tA(0.22) + ", inset 0 0 18px " + tA(0.12), animation: "hsRespire 1600ms ease-in-out infinite" } })
          : null,
        erreurImg
          ? h("div", { style: { position: "absolute", left: 0, right: 0, top: "56%", textAlign: "center", fontSize: 11.5, fontFamily: M, color: "#8A929C" } }, hsT("imgKo", lg))
          : null,
        h("style", { dangerouslySetInnerHTML: { __html: "@keyframes hsRespire{0%,100%{opacity:.35;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.13)}}" } }),
        /* Zones de navigation : transparentes, aucun assombrissement. */
        h("button", { onClick: precedente, "aria-label": "Pr\u00e9c\u00e9dente", style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "32%", background: "transparent", border: "none", cursor: "pointer" } }, ""),
        h("button", { onClick: suivante, "aria-label": "Suivante", style: { position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", background: "transparent", border: "none", cursor: "pointer" } }, "")),

      /* --- légende + actions, sur surface givrée --- */
      h("div", { style: { padding: "12px 14px calc(env(safe-area-inset-bottom) + 14px)", background: "linear-gradient(180deg, rgba(17,20,23,0.9), #060709)", borderTop: "1px solid rgba(255,255,255,0.07)" } },
        story.legende
          ? h("div", { style: { fontSize: 13.5, lineHeight: 1.55, fontFamily: M, color: "#DCE3E8", marginBottom: 12, whiteSpace: "pre-line" } }, story.legende)
          : null,
        action
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: tnL, marginBottom: 10, lineHeight: 1.45 } }, messages[action] || "")
          : null,
        h("div", { style: { display: "flex", gap: 9, flexWrap: "wrap" } },
          estMoi
            ? h("button", { onClick: garder, style: { flex: "1 1 auto", padding: "11px 14px", borderRadius: 999, border: "1px solid " + tA(0.55), background: "rgba(32,217,245,0.08)", color: tn, fontSize: 12, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, "\u2726 " + ((story.garde || action === "gardee") ? hsT("gardee", lg) : hsT("garder", lg)))
            : h("button", { onClick: signaler, style: { flex: "1 1 auto", padding: "11px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#9AA5AD", fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer" } }, hsT("signaler", lg)),
          estMoi
            ? h("button", { onClick: supprimer, style: { flex: "0 0 auto", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#9AA5AD", fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer" } }, hsT("supprimer", lg))
            : null))),
    document.body);
}

try {
  if (typeof window !== "undefined") {
    window.BandeauStories = BandeauStories;
    window.VisionneuseStories = VisionneuseStories;
    window.ComposeurStory = ComposeurStory;
  }
} catch (eW2) { }
