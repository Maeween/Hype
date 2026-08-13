/* ============================================================================
   HYPE ▸ hype-stories.js — v2 — SESSION 115 (12/08/2026)

   LES STORIES DES CAVALIERS.
   Visibles par tous les cavaliers, connus et inconnus. Durée de vie 7 jours.
   « Garder en souvenir » range la photo dans l'album Hype Memories du
   cavalier. Bandeau sur 4 pages : Cavalier, Communauté, Club, Écurie.

   NOUVEAU EN v2 (demandes de Blandine du 12/08 au soir)
   1. Le rond du bandeau montre **la photo de la story**, plus l'avatar du
      cavalier. C'était une faute de ma part en v1 : l'avatar passait devant.
   2. Ronds à 104 px au lieu de 62 (« le plus gros possible »).
   3. Le « + » dit « Ajouter » — en v1 le libellé « Ma story » était écrit
      deux fois côte à côte.
   4. **Taguer un cavalier ou un cheval**, sur le système d'identifications
      DÉJÀ présent dans Hype (table `identifications`, indexée par
      `photo_url`) : aucune table nouvelle, et la personne taguée accepte
      avant que son nom apparaisse — c'est le comportement existant, on ne le
      réinvente pas.
   5. **Un lieu** sur la story (colonne `lieu`, 60 caractères). Volontairement
      court et libre : on veut « Écurie Feinn » ou « Itteville », pas une
      adresse. Un fil ouvert aux inconnus avec des enfants parmi les
      utilisateurs ne doit pas porter de position précise.

   RÈGLE DE VERSION : à chaque livraison, incrémenter HYPE_STORIES_VERSION ici
   ET le ?v= de la balise dans index.html.

   ⚠️ CE FICHIER A ÉTÉ INTÉGRALEMENT RÉGÉNÉRÉ en v2, après un incident : la
   copie de travail de la v1 avait grossi de 3 361 octets sans que je puisse
   en rendre compte. Contenu maîtrisé ligne par ligne, plutôt que rafistolé.

   DESIGN BIBLE
   - AUCUN filtre, voile ni dégradé sur une photo. La visionneuse pose la photo
     nue sur du noir absolu ; en-tête au-dessus, légende et actions en dessous
     sur surfaces givrées. C'est la raison de cette mise en page.
   - Palette : #060709, #111417, #20D9F5, #F4F7FA, gris froid.
   - La lumière turquoise guide : liseré turquoise = non vue, gris = déjà vue.

   MODÉRATION : décision de Blandine du 12/08, « plus tard ». Sont en place, et
   rien de plus : le filtre `blocages` à la lecture (aucune interface) et un
   bouton « Signaler » (DÉDUCTION DE CLAUDE — À VALIDER, motif : l'App Store
   refuse un flux public sans moyen de signalement).
============================================================================ */

var HYPE_STORIES_VERSION = "15";
try { if (typeof window !== "undefined") window.HYPE_STORIES_VERSION = HYPE_STORIES_VERSION; } catch (eV) { }

/* Durée de vie : 7 jours (décision de Blandine). */
var HS_JOURS = 7;
var HS_DUREE_MS = HS_JOURS * 24 * 60 * 60 * 1000;
/* Défilement automatique d'une story dans la visionneuse. */
var HS_DUREE_VUE_MS = 6000;
/* 12/08 (117) : la légende passe de 140 à 1000 caractères (décision de
   Blandine — sa phrase sur les obstacles neufs était coupée). AUCUN SQL : la
   colonne `legende` est un `text` Postgres, sans limite ; les 140 étaient un
   plafond posé côté application, et rien d'autre. */
var HS_LEGENDE_MAX = 1000;
/* Au-delà de ce nombre de caractères, la légende est repliée sur 3 lignes
   derrière un « voir plus », et la durée d'affichage s'allonge. */
var HS_LEGENDE_REPLI = 180;
/* Durée : 6 s de base, plus 1 s par tranche de 90 caractères, plafonnée à
   20 s. Décision de Blandine : « les deux » — la durée s'allonge ET le texte
   se replie derrière un « voir plus » qui met le minuteur en pause. */
function hsDureeStory(story) {
  try {
    var n = ((story && story.legende) || "").length;
    if (n <= HS_LEGENDE_REPLI) return HS_DUREE_VUE_MS;
    var sup = Math.ceil((n - HS_LEGENDE_REPLI) / 90) * 1000;
    return Math.min(HS_DUREE_VUE_MS + sup, 20000);
  } catch (e) { return HS_DUREE_VUE_MS; }
}
/* Lieu volontairement court : un nom de club ou de ville, pas une adresse. */
var HS_LIEU_MAX = 60;
/* Taille des ronds. 104 px = 3 ronds visibles sur un iPhone. Blandine a
   demandé « le plus gros possible » ; au-delà de 104 on ne voit plus qu'un
   rond et demi et le bandeau cesse d'être un bandeau.
   DÉDUCTION DE CLAUDE sur la valeur exacte — À VALIDER. */
var HS_TAILLE_ROND = 104;
/* Sur MA COMMUNAUTÉ, le bandeau passe en RECTANGLES VERTICAUX (décision de
   Blandine du 12/08). Deux raisons, dans cet ordre :
   1. Un rond rogne énormément — encolure, cheval de profil, cavalier en pied :
      le cercle coupe tout. Un 3:4 montre la photo à peu près telle qu'elle a
      été prise, ce qui va dans le sens de la règle absolue du projet sur les
      photos. Sur Communauté on découvre des inconnus : c'est l'IMAGE qui
      compte. Sur Cavalier / Club / Écurie on sait déjà de qui il s'agit : le
      rond suffit, c'est un repère d'identité.
   2. 116 × 145 est EXACTEMENT le format des cartes chevaux de l'Écurie et de
      l'agenda du club. La page garde un seul rythme visuel au lieu d'en
      inventer un.
   Un seul composant, un réglage de forme : aucune divergence possible. */
var HS_CARTE_L = 116;
var HS_CARTE_H = 145;
/* Nom de l'album de destination des souvenirs (DÉDUCTION DE CLAUDE — À VALIDER). */
var HS_ALBUM_NOM = "Mes stories";

/* ---------------------------------------------------------------------------
   LA BIBLIOTHÈQUE MUSICALE (13/08)
   11 extraits de 30 s choisis et fournis par Blandine, tous issus de Pixabay
   (licence sans attribution, usage commercial permis — identifiants Pixabay
   consignés au SUIVI comme preuve de provenance). Fichiers à la RACINE du
   dépôt, nommés `musique-<ref>.mp3`, 128 kbps, fondu d'entrée/sortie.
   La story stocke la RÉFÉRENCE (colonne `musique`), jamais une URL : si les
   fichiers déménagent un jour, une seule constante à changer.
   RÈGLE iOS : le son ne démarre JAMAIS seul — pastille à toucher. Dit à
   Blandine avant qu'elle choisisse, c'est une contrainte d'Apple. */
var HS_MUSIQUES = [
  { ref: "hype-beat",   nom: "Hype Beat" },
  { ref: "warriors",    nom: "Warriors" },
  { ref: "warriors-3",  nom: "Warriors III" },
  { ref: "trap",        nom: "Trap" },
  { ref: "london",      nom: "London" },
  { ref: "house",       nom: "House" },
  { ref: "warehouse",   nom: "Warehouse" },
  { ref: "rave",        nom: "Rave" },
  { ref: "thunderwave", nom: "Thunderwave" },
  { ref: "in-my-heart", nom: "Still In My Heart" },
  { ref: "my-love",     nom: "My Love" }
];
/* L'AMORCE AUDIO (13/08, demande de Blandine : « elle peut pas se lancer
   seule quand les gens ouvrent la story ? »). iOS interdit le son sans geste
   — mais il accepte qu'un lecteur DÉJÀ AMORCÉ pendant un geste rejoue
   ensuite. On amorce donc UN lecteur partagé, muet, au moment du toucher qui
   ouvre la visionneuse (rond du bandeau, à la une, zones suivant/précédent) :
   la story peut alors lancer sa musique toute seule à l'arrivée de la photo.
   Si iOS refuse malgré l'amorce, play() échoue proprement et la pastille
   reste le repli — rien ne casse. */
/* 13/08 (feu vert de Blandine) : PLUSIEURS PHOTOS d'un coup — elles se
   publient en chapelet et la visionneuse les déroule naturellement (elle
   enchaîne déjà les stories d'un même cavalier). 10 photos max par envoi. */
var HS_MULTI_MAX = 10;
/* 13/08 15h24 (demande de Blandine) : FOND IMMERSIF DESACTIVE. Sa capture
   montrait le calque floute SEUL, la photo nette absente au lieu de rester
   devant — retire en attendant un vrai diagnostic sur telephone. Pattern
   projet : une constante, rien n'est supprime. La colonne `fond` reste en
   base et le contrat de donnees la porte toujours ; une story marquee
   "immersif" s'affiche simplement sur fond noir tant que c'est eteint. */
var HS_FOND_IMMERSIF_ACTIF = false;
var HS_SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
function hsAmorcerAudio() {
  try {
    if (typeof Audio === "undefined" || typeof window === "undefined") return;
    if (!window.__hsLecteur) window.__hsLecteur = new Audio();
    var a = window.__hsLecteur;
    if (a.__hsJoue) return;   /* deja en train de jouer une musique : ne pas l'ecraser */
    a.muted = true;
    a.src = HS_SILENCE;
    var p = a.play();
    if (p && p.catch) p.catch(function () { });
    try { a.pause(); } catch (eP) { }
  } catch (e) { }
}

function hsUrlMusique(ref) {
  if (!ref) return null;
  var ok = HS_MUSIQUES.some(function (m) { return m.ref === ref; });
  return ok ? ("musique-" + ref + ".mp3") : null;
}
function hsNomMusique(ref) {
  var m = HS_MUSIQUES.filter(function (x) { return x.ref === ref; })[0];
  return m ? m.nom : "";
}

/* ---------------------------------------------------------------------------
   0. L'IMAGE ADAPTÉE À L'ÉCRAN — LE CORRECTIF DU CRASH DU 13/08
   Blandine, première story, tentative de zoom : « toute plante encore une
   fois ». Safari affichait « un problème récurrent est survenu » = onglet tué
   par iOS faute de mémoire, pas une erreur JS.
   CAUSE : la visionneuse chargeait la photo EN PLEINE RÉSOLUTION (une photo
   d'iPhone fait 4000×3000, ~45 Mpx décodés) + préchargeait la SUIVANTE en
   pleine résolution + le zoom n'existait pas (deux doigts = glissé de
   fermeture). Même mécanique exacte que le crash du zoom photo de la session
   92. La leçon était payée, l'outil existait (vignetteHype, plan Pro actif),
   je ne l'avais pas utilisé : faute de ma part, consignée au SUIVI.
   RÈGLE POSÉE : dans les stories, AUCUNE image ne se charge en résolution
   d'origine. Tout passe par la transformation serveur, bornée à la taille de
   l'écran, avec le repli existant sur l'original si elle échoue (replierVignette). */
function hsImageEcran(u) {
  try {
    if (typeof vignetteHype !== "function") return u;
    var dpr = 2;
    try { dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); } catch (eD) { }
    var L = 800, H = 1200;
    try {
      L = Math.min(1080, Math.round(window.innerWidth * dpr));
      H = Math.min(1600, Math.round(window.innerHeight * dpr));
    } catch (eW) { }
    var v = vignetteHype(u, L, H);
    /* resize=cover recadrerait la photo — interdit. On repasse en contain :
       toute la photo, dans la boîte demandée. */
    return String(v).replace("resize=cover", "resize=contain");
  } catch (e) { return u; }
}

/* ---------------------------------------------------------------------------
   1. LES VUES — dans le localStorage, PAS en base.
   Une table de vues aurait voulu une ligne par cavalier et par story, donc de
   la RLS et une écriture à chaque ouverture, pour un simple confort
   d'affichage local. On ne stocke que des identifiants — jamais d'image.
--------------------------------------------------------------------------- */
var HS_CLE_VUES = "hype_stories_vues";
function hsVues() {
  try {
    var b = localStorage.getItem(HS_CLE_VUES);
    if (!b) return {};
    var o = JSON.parse(b);
    return (o && typeof o === "object") ? o : {};
  } catch (e) { return {}; }
}
function hsMarquerVue(id) {
  if (!id) return;
  try {
    var o = hsVues();
    o[String(id)] = Date.now();
    /* Ménage : au-delà de 400 identifiants on ne garde que les 300 plus
       récents, sinon la clé gonfle indéfiniment. */
    var cles = Object.keys(o);
    if (cles.length > 400) {
      cles.sort(function (a, b) { return o[b] - o[a]; });
      var g = {};
      for (var i = 0; i < 300; i++) { g[cles[i]] = o[cles[i]]; }
      o = g;
    }
    localStorage.setItem(HS_CLE_VUES, JSON.stringify(o));
  } catch (e) { }
}

/* ---------------------------------------------------------------------------
   2. LECTURE / ÉCRITURE
--------------------------------------------------------------------------- */

/* Publie une story.
   tags = [{ type: "cavalier"|"cheval", id, nom }] — posés APRÈS l'insertion,
   via le système d'identifications existant. Un tag qui échoue ne fait pas
   échouer la publication : la story est déjà en ligne, on ne la perd pas
   pour un nom mal enregistré. */
async function hsPublierStory(fichier, legende, lieu, tags, musique, fond) {
  try {
    if (typeof supa === "undefined" || !supa) return { data: null, error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { data: null, error: "Pas connecté" };

    var r = await envoyerPhoto(fichier);
    if (r.error || !r.url) return { data: null, error: r.error || "Envoi impossible" };

    var ecurie = null;
    try { ecurie = await monEcurieNom(); } catch (eE) { ecurie = null; }
    if (ecurie === "__perso__") ecurie = null;

    var ligne = {
      user_id: user.id,
      photo_url: r.url,
      legende: (legende ? String(legende).slice(0, HS_LEGENDE_MAX) : null),
      ecurie: ecurie,
      expire_le: new Date(Date.now() + HS_DUREE_MS).toISOString()
    };
    var lieuNet = (lieu ? String(lieu).trim().slice(0, HS_LIEU_MAX) : "");
    if (lieuNet) ligne.lieu = lieuNet;
    if (musique && hsUrlMusique(musique)) ligne.musique = musique;
    /* 13/08 (spec de Blandine) : le FOND choisi par l'auteur voyage avec la
       story — "immersif" ou rien. Absent = noir, comme toutes les stories
       d'avant : aucune story existante ne change. */
    if (fond === "immersif") ligne.fond = "immersif";

    var res = await supa.from("hype_stories").insert(ligne).select().single();
    if (res && res.error) {
      /* Repli : si la colonne `lieu` n'existe pas encore en base (SQL de la
         v2 pas repassé), on republie sans le lieu plutôt que d'échouer. Le
         message est explicite pour que l'oubli se voie. */
      if (lieuNet || ligne.musique || ligne.fond) {
        delete ligne.lieu;
        delete ligne.musique;
        delete ligne.fond;
        var res2 = await supa.from("hype_stories").insert(ligne).select().single();
        if (res2 && !res2.error) return { data: res2.data, error: null, lieuIgnore: true };
      }
      return { data: null, error: res.error };
    }

    /* Les tags, un par un, sans bloquer. */
    if (tags && tags.length && typeof identifierSouvenir === "function") {
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        if (!t || !t.id) continue;
        try { await identifierSouvenir(r.url, t.type || "cavalier", t.id, t.nom || null); } catch (eT) { }
      }
    }
    return { data: res.data, error: null };
  } catch (e) { return { data: null, error: String(e) }; }
}

/* Modifie la légende et le lieu d'une story (13/08, décision de Blandine).
   La PHOTO n'est pas modifiable : changer l'image, c'est une autre story.
   La politique RLS de mise à jour existait déjà (elle sert au marquage
   « gardée ») : AUCUN SQL. Même repli que la publication si la colonne
   `lieu` manquait en base. */
async function hsModifierStory(id, legende, lieu, musique, fond) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    var champs = {
      legende: (legende ? String(legende).slice(0, HS_LEGENDE_MAX) : null),
      lieu: (lieu ? String(lieu).trim().slice(0, HS_LIEU_MAX) : null),
      /* 13/08 : la musique se modifie aussi (décision de Blandine). null =
         retirer la musique — un champ explicite, pas une absence. */
      musique: (musique && hsUrlMusique(musique)) ? musique : null,
      fond: (fond === "immersif") ? "immersif" : null
    };
    var r = await supa.from("hype_stories").update(champs).eq("id", id).eq("user_id", user.id);
    if (r && r.error) {
      delete champs.lieu;
      delete champs.musique;
      delete champs.fond;
      var r2 = await supa.from("hype_stories").update(champs).eq("id", id).eq("user_id", user.id);
      if (r2 && !r2.error) return { error: null, lieuIgnore: true };
      return { error: r.error };
    }
    return { error: null };
  } catch (e) { return { error: String(e) }; }
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

/* ---------------------------------------------------------------------------
   LES MENTIONS @ DANS LE TEXTE
   Demande de Blandine du 12/08 : « on fait comment pour identifier qqun dans
   le texte ? ». Elle écrivait « merci Ilona Delph Ambre » à la main.

   AUCUNE TABLE : une mention est un tag comme un autre, enregistré dans
   `identifications` par `photo_url`. Le cycle attente → accepté est donc déjà
   là, sans une ligne de mécanisme à écrire.

   RÈGLE D'AFFICHAGE (décision de Blandine) : le texte s'affiche TEL QU'ELLE
   L'A ÉCRIT — on ne censure pas sa phrase — mais le LIEN vers le profil ne
   s'active qu'une fois la personne d'accord. Avant l'accord, « @Ilona » est
   du texte simple ; après, c'est un mot turquoise sur lequel on touche.

   LIMITES ASSUMÉES, à connaître :
   - si la personne change de pseudo plus tard, le texte garde l'ancien ;
   - une mention ne marche que pour un cavalier inscrit sur Hype ; un prénom
     écrit à la main reste du texte, ce qui est le comportement voulu.
--------------------------------------------------------------------------- */

/* Repère une mention en cours de frappe : « @ » suivi de lettres, collé à la
   fin du texte saisi. Renvoie { debut, terme } ou null.
   Les accents et le tiret sont acceptés (Anne-Sophie, Inès). */
function hsMentionEnCours(texte, position) {
  try {
    var t = String(texte || "");
    var p = (typeof position === "number") ? position : t.length;
    var avant = t.slice(0, p);
    var m = avant.match(/@([A-Za-z0-9\u00C0-\u024F_.\-]*)$/);
    if (!m) return null;
    return { debut: avant.length - m[0].length, terme: m[1] || "" };
  } catch (e) { return null; }
}

/* Remplace la mention en cours par « @pseudo » et rend le texte complet. */
function hsInsererMention(texte, position, pseudo) {
  try {
    var t = String(texte || "");
    var p = (typeof position === "number") ? position : t.length;
    var m = hsMentionEnCours(t, p);
    if (!m) return t;
    var propre = String(pseudo || "").replace(/\s+/g, "");
    return t.slice(0, m.debut) + "@" + propre + " " + t.slice(p);
  } catch (e) { return texte; }
}

/* Découpe une légende en morceaux : { texte } ou { mention, tag }.
   `tags` est la liste des identifications de la story. Une mention n'est
   reliée à un profil que si elle correspond à un tag ACCEPTÉ. */
function hsDecouperLegende(legende, tags) {
  var out = [];
  try {
    var t = String(legende || "");
    if (!t) return out;
    var accepte = {};
    (tags || []).forEach(function (x) {
      if (x && x.statut === "accepte" && x.cible_nom) {
        accepte[String(x.cible_nom).replace(/\s+/g, "").toLowerCase()] = x;
      }
    });
    var re = /@([A-Za-z0-9\u00C0-\u024F_.\-]+)/g;
    var dernier = 0; var m;
    while ((m = re.exec(t)) !== null) {
      if (m.index > dernier) out.push({ texte: t.slice(dernier, m.index) });
      var cle = String(m[1]).toLowerCase();
      out.push({ mention: m[0], tag: accepte[cle] || null });
      dernier = m.index + m[0].length;
    }
    if (dernier < t.length) out.push({ texte: t.slice(dernier) });
  } catch (e) { return [{ texte: String(legende || "") }]; }
  return out;
}

/* Suggère des lieux pendant la frappe, à partir des 131 clubs du Monde Au
   Galop (constante CLUBS de l'index : nom + ville). Demande de Blandine du
   13/08 : « ça serait bien qu'on puisse [retrouver] les écuries déjà
   codées ». Le champ RESTE LIBRE : un lieu hors liste s'écrit à la main.
   Recherche insensible aux accents via noyauEcurie quand il existe. */
function hsSuggererLieux(terme) {
  try {
    var t = String(terme || "").trim();
    if (t.length < 2) return [];
    var src = (typeof CLUBS !== "undefined" && CLUBS && CLUBS.length) ? CLUBS
      : ((typeof window !== "undefined" && window.CLUBS && window.CLUBS.length) ? window.CLUBS : null);
    if (!src) return [];
    var nrm = function (x) {
      try { return (typeof noyauEcurie === "function") ? noyauEcurie(String(x || "")) : String(x || "").toLowerCase(); }
      catch (e) { return String(x || "").toLowerCase(); }
    };
    var q = nrm(t);
    if (!q) return [];
    var out = [];
    for (var i = 0; i < src.length && out.length < 6; i++) {
      var c = src[i];
      if (!c || !c.nom) continue;
      if (nrm(c.nom).indexOf(q) >= 0 || (c.ville && nrm(c.ville).indexOf(q) >= 0)) {
        out.push({ nom: c.nom, ville: c.ville || "" });
      }
    }
    return out;
  } catch (e) { return []; }
}

/* Les tags posés SUR une story. La table `identifications` est indexée par
   `photo_url` : une story a une photo_url, donc rien à créer.
   Les helpers existants (identificationsPour) répondent à la question
   inverse — « où suis-je tagué ? ». Ici on veut « qui est sur cette photo ? ». */
async function hsTagsDeStory(photoUrl) {
  try {
    if (typeof supa === "undefined" || !supa || !photoUrl) return { data: [], error: null };
    var r = await supa.from("identifications").select("*").eq("photo_url", photoUrl);
    return { data: (r && r.data) || [], error: (r && r.error) || null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* Les identifiants avec qui il y a un blocage, dans un sens ou dans l'autre.
   Deux requêtes pour toute la liste, et non un aller-retour par cavalier :
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
   ORDRE : moi, puis mon écurie, puis les cavaliers que je suis, puis tous les
   autres. L'ouverture à tous change le PÉRIMÈTRE, pas l'ordre : « en priorité
   les cavaliers qui les entourent » reste vrai. */
async function hsListerStories() {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], moiId: null, error: "indisponible" };
    var user = null;
    try { user = await utilisateurActuel(); } catch (eU) { user = null; }
    var moiId = user ? user.id : null;

    var r = await supa.from("hype_stories").select("*")
      .gt("expire_le", new Date().toISOString())
      .order("created_at", { ascending: false }).limit(300);
    if (r && r.error) return { data: [], moiId: moiId, error: r.error };
    var lignes = (r && r.data) || [];
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    var bloques = await hsIdsBloques();
    lignes = lignes.filter(function (s) { return s && s.user_id && !bloques[s.user_id]; });
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    var ids = []; var vu = {};
    lignes.forEach(function (s) { if (!vu[s.user_id]) { vu[s.user_id] = true; ids.push(s.user_id); } });
    var parId = {};
    try {
      var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").in("id", ids);
      ((rp && rp.data) || []).forEach(function (p) { parId[p.id] = p; });
    } catch (eP) { }

    var monEcurie = null;
    try { monEcurie = await monEcurieNom(); } catch (eM) { monEcurie = null; }
    var noyauMoi = "";
    try {
      noyauMoi = (monEcurie && monEcurie !== "__perso__" && typeof noyauEcurie === "function") ? noyauEcurie(monEcurie) : "";
    } catch (eN) { noyauMoi = ""; }

    var suivis = {};
    try {
      if (moiId) {
        var rs = await supa.from("follows").select("followed_id").eq("follower_id", moiId);
        ((rs && rs.data) || []).forEach(function (l) { if (l && l.followed_id) suivis[l.followed_id] = true; });
      }
    } catch (eS) { }

    var vues = hsVues();
    var groupes = []; var index = {};
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
        index[s.user_id] = g;
        groupes.push(g);
      }
      g.stories.push(s);
    });

    groupes.forEach(function (g) {
      /* Dans un groupe on lit de la plus ancienne à la plus récente. */
      g.stories.sort(function (a, b) { return String(a.created_at) < String(b.created_at) ? -1 : 1; });
      g.toutesVues = g.stories.every(function (s) { return !!vues[String(s.id)]; });
      g.rang = g.moi ? 0 : (g.memeEcurie ? 1 : (g.suivi ? 2 : 3));
      g.dernier = g.stories[g.stories.length - 1].created_at || "";
    });
    groupes.sort(function (a, b) {
      if (a.rang !== b.rang) return a.rang - b.rang;
      if (a.toutesVues !== b.toutesVues) return a.toutesVues ? 1 : -1;
      return String(a.dernier) < String(b.dernier) ? 1 : -1;
    });

    return { data: groupes, moiId: moiId, error: null };
  } catch (e) { return { data: [], moiId: null, error: String(e) }; }
}

/* ---------------------------------------------------------------------------
   LES STORIES À LA UNE
   Demande de Blandine du 12/08 : « on peut garder en mémoire les story en
   faisant des story à la une comme insta ? ».

   AUCUNE TABLE NOUVELLE. Hype a déjà des albums nommés (`albums_cheval`) avec
   couverture, indicateur `promu` et visibilité. Une à la une, c'est un album
   de cible « cavalier:<id> » affiché en rond. Deux conséquences heureuses :
   - les albums sont PUBLICS par défaut (modèle opt-out du 02/08, filtré à un
     seul endroit dans `listerAlbumsCheval`) : une à la une posée sur ta page
     est bien vue par les autres, et tu peux la passer en privé ;
   - la purge des 7 jours ne supprime pas le fichier du bucket — c'est
     précisément ce qui permet à une story de survivre dans une à la une.

   Les albums « automatiques » (marqués __auto ou __lecture par l'application)
   sont écartés : ce ne sont pas des à la une, ce sont des vues calculées. */
async function hsListerALaUne(userId) {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], error: null };
    var cible = null;
    if (userId) cible = "cavalier:" + userId;
    else {
      var u = await utilisateurActuel();
      if (!u) return { data: [], error: null };
      cible = "cavalier:" + u.id;
    }
    if (typeof listerAlbumsCheval !== "function") return { data: [], error: null };
    var r = await listerAlbumsCheval(cible);
    var liste = ((r && r.data) || []).filter(function (a) {
      return a && !a.__auto && !a.__lecture && (a.photos || []).length > 0;
    });
    /* Les à la une promues d'abord, puis les plus récentes. */
    liste.sort(function (a, b) {
      var pa = a.promu ? 0 : 1, pb = b.promu ? 0 : 1;
      if (pa !== pb) return pa - pb;
      return String(a.created_at) < String(b.created_at) ? 1 : -1;
    });
    return { data: liste, error: null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* Mes à la une, pour le choix de destination au moment de garder une story.
   Contrairement à hsListerALaUne, on garde ici les albums VIDES : un album
   fraîchement créé doit rester proposé. */
async function hsMesALaUnePourRanger() {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], error: null };
    var u = await utilisateurActuel();
    if (!u) return { data: [], error: null };
    if (typeof listerAlbumsCheval !== "function") return { data: [], error: null };
    var r = await listerAlbumsCheval("cavalier:" + u.id);
    var liste = ((r && r.data) || []).filter(function (a) {
      return a && a.user_id === u.id && !a.__auto && !a.__lecture;
    });
    return { data: liste, error: null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* « Garder » : la photo rejoint une À LA UNE choisie par le cavalier.
   destination = { albumId } pour une à la une existante,
                 { nouveau: "Nom" } pour en créer une.
   Sans destination, on retombe sur l'album HS_ALBUM_NOM — c'est le
   comportement de la v1 et v2, conservé pour ne rien casser des stories déjà
   gardées hier soir.
   Le plafond gratuit de 20 photos par album est respecté, comme partout. */
async function hsGarderEnSouvenir(story, premium, destination) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    if (!story || !story.photo_url) return { error: "Photo absente" };
    if (story.user_id !== user.id) return { error: "Ce n'est pas ta story" };

    var cible = "cavalier:" + user.id;
    var alb = null;

    if (destination && destination.albumId) {
      try {
        var rl0 = await listerAlbumsCheval(cible);
        alb = ((rl0 && rl0.data) || []).filter(function (a) {
          return a && String(a.id) === String(destination.albumId) && a.user_id === user.id;
        })[0] || null;
      } catch (eL0) { alb = null; }
      if (!alb) return { error: "\u00c0 la une introuvable" };
    } else {
      var nom = (destination && destination.nouveau) ? String(destination.nouveau).trim().slice(0, 40) : HS_ALBUM_NOM;
      if (!nom) nom = HS_ALBUM_NOM;
      try {
        var rl = await listerAlbumsCheval(cible);
        alb = ((rl && rl.data) || []).filter(function (a) {
          return a && a.user_id === user.id && String(a.nom || "") === nom;
        })[0] || null;
      } catch (eL) { alb = null; }
      if (!alb) {
        var rc = await creerAlbumCheval(cible, nom);
        if (rc && rc.error) return { error: rc.error };
        alb = rc && rc.data;
      }
    }
    if (!alb) return { error: "Album indisponible" };

    var photos = (alb.photos || []).slice();
    if (photos.indexOf(story.photo_url) >= 0) return { deja: true, error: null };
    if (!premium && photos.length >= 20) return { error: "quota" };
    photos.push(story.photo_url);

    var champs = { photos: photos };
    /* Première photo d'une à la une neuve : elle en devient la couverture. */
    if (!alb.couverture && photos.length === 1) champs.couverture = story.photo_url;

    var rm = await majAlbumCheval(alb.id, champs);
    if (rm && rm.error) return { error: rm.error };
    try { await supa.from("hype_stories").update({ garde: true }).eq("id", story.id).eq("user_id", user.id); } catch (eG) { }
    return { error: null, nom: alb.nom || "" };
  } catch (e) { return { error: String(e) }; }
}

try {
  if (typeof window !== "undefined") {
    window.hsPublierStory = hsPublierStory;
    window.hsListerStories = hsListerStories;
    window.hsSupprimerStory = hsSupprimerStory;
    window.hsSignalerStory = hsSignalerStory;
    window.hsGarderEnSouvenir = hsGarderEnSouvenir;
    window.hsTagsDeStory = hsTagsDeStory;
    window.hsModifierStory = hsModifierStory;
    window.hsSuggererLieux = hsSuggererLieux;
    window.hsMentionEnCours = hsMentionEnCours;
    window.hsInsererMention = hsInsererMention;
    window.hsDecouperLegende = hsDecouperLegende;
    window.hsDureeStory = hsDureeStory;
    window.hsListerALaUne = hsListerALaUne;
    window.hsMesALaUnePourRanger = hsMesALaUnePourRanger;
    window.hsMarquerVue = hsMarquerVue;
  }
} catch (eW) { }

/* ---------------------------------------------------------------------------
   3. TEXTES — six langues (FR/EN/ES/IT/JA/DE), règle du projet.
--------------------------------------------------------------------------- */
var HS_TXT = {
  ma: { fr: "Ma story", en: "My story", es: "Mi story", it: "La mia story", ja: "マイストーリー", de: "Meine Story" },
  ajouterCourt: { fr: "Ajouter", en: "Add", es: "A\u00f1adir", it: "Aggiungi", ja: "追加", de: "Hinzuf\u00fcgen" },
  ajouter: { fr: "Ajouter une story", en: "Add a story", es: "A\u00f1adir una story", it: "Aggiungi una story", ja: "ストーリーを追加", de: "Story hinzuf\u00fcgen" },
  legende: { fr: "Une l\u00e9gende (facultatif)\u2026", en: "A caption (optional)\u2026", es: "Un pie de foto (opcional)\u2026", it: "Una didascalia (facoltativa)\u2026", ja: "キャプション（任意）…", de: "Eine Bildunterschrift (optional)\u2026" },
  lieuChamp: { fr: "Le club, la ville\u2026", en: "Club, town\u2026", es: "El club, la ciudad\u2026", it: "Il club, la citt\u00e0\u2026", ja: "クラブ、町…", de: "Verein, Stadt\u2026" },
  lieuTitre: { fr: "Le lieu", en: "Location", es: "El lugar", it: "Il luogo", ja: "場所", de: "Der Ort" },
  taguerTitre: { fr: "Taguer", en: "Tag", es: "Etiquetar", it: "Tagga", ja: "タグ付け", de: "Markieren" },
  chercherCav: { fr: "Chercher un cavalier\u2026", en: "Search a rider\u2026", es: "Buscar un jinete\u2026", it: "Cerca un cavaliere\u2026", ja: "ライダーを検索…", de: "Reiter suchen\u2026" },
  mesChevaux: { fr: "Mes chevaux", en: "My horses", es: "Mis caballos", it: "I miei cavalli", ja: "私の馬", de: "Meine Pferde" },
  aucunResultat: { fr: "Aucun r\u00e9sultat", en: "No result", es: "Sin resultados", it: "Nessun risultato", ja: "結果なし", de: "Kein Ergebnis" },
  tagAvis: { fr: "La personne tagu\u00e9e accepte avant que son nom apparaisse.", en: "The tagged person accepts before their name shows.", es: "La persona etiquetada acepta antes de que aparezca su nombre.", it: "La persona taggata accetta prima che il nome appaia.", ja: "タグ付けされた人が承認するまで名前は表示されません。", de: "Die markierte Person best\u00e4tigt, bevor ihr Name erscheint." },
  enAttente: { fr: "en attente", en: "pending", es: "pendiente", it: "in attesa", ja: "承認待ち", de: "ausstehend" },
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
  lieuIgnore: { fr: "Story en ligne, mais le lieu n'a pas \u00e9t\u00e9 enregistr\u00e9 (SQL v2 \u00e0 repasser).", en: "Story live, but the location was not saved.", es: "Story publicada, pero el lugar no se guard\u00f3.", it: "Story online, ma il luogo non \u00e8 stato salvato.", ja: "ストーリーは公開されましたが、場所は保存されませんでした。", de: "Story online, aber der Ort wurde nicht gespeichert." },
  connecte: { fr: "Connecte-toi pour publier une story.", en: "Sign in to post a story.", es: "Inicia sesi\u00f3n para publicar.", it: "Accedi per pubblicare.", ja: "投稿するにはログインしてください。", de: "Melde dich an, um zu ver\u00f6ffentlichen." },
  aLaUne: { fr: "\u00c0 la une", en: "Highlights", es: "Destacadas", it: "In evidenza", ja: "\u30cf\u30a4\u30e9\u30a4\u30c8", de: "Highlights" },
  rangerOu: { fr: "Ranger dans quelle \u00e0 la une ?", en: "Save to which highlight?", es: "\u00bfEn qu\u00e9 destacada?", it: "In quale in evidenza?", ja: "\u3069\u306e\u30cf\u30a4\u30e9\u30a4\u30c8\u306b\u4fdd\u5b58\u3057\u307e\u3059\u304b\uff1f", de: "In welches Highlight?" },
  nouvelleUne: { fr: "Nouvelle \u00e0 la une", en: "New highlight", es: "Nueva destacada", it: "Nuova in evidenza", ja: "\u65b0\u3057\u3044\u30cf\u30a4\u30e9\u30a4\u30c8", de: "Neues Highlight" },
  nomUne: { fr: "Son nom (Concours, Apy, \u00c9t\u00e9\u2026)", en: "Its name (Shows, Apy, Summer\u2026)", es: "Su nombre (Concursos, Apy, Verano\u2026)", it: "Il suo nome (Concorsi, Apy, Estate\u2026)", ja: "\u540d\u524d\uff08\u5927\u4f1a\u3001\u30a2\u30d4\u30fc\u3001\u590f\u2026\uff09", de: "Sein Name (Turniere, Apy, Sommer\u2026)" },
  creer: { fr: "Cr\u00e9er", en: "Create", es: "Crear", it: "Crea", ja: "\u4f5c\u6210", de: "Erstellen" },
  rangee: { fr: "Rang\u00e9e dans ", en: "Saved to ", es: "Guardada en ", it: "Salvata in ", ja: "\u4fdd\u5b58\u3057\u307e\u3057\u305f\uff1a", de: "Gespeichert in " },
  uneIntrouvable: { fr: "\u00c0 la une introuvable.", en: "Highlight not found.", es: "Destacada no encontrada.", it: "In evidenza non trovata.", ja: "\u30cf\u30a4\u30e9\u30a4\u30c8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002", de: "Highlight nicht gefunden." },
  videUne: { fr: "Aucune \u00e0 la une pour l'instant.", en: "No highlight yet.", es: "Sin destacadas por ahora.", it: "Nessuna in evidenza per ora.", ja: "\u307e\u3060\u30cf\u30a4\u30e9\u30a4\u30c8\u306f\u3042\u308a\u307e\u305b\u3093\u3002", de: "Noch keine Highlights." },
  astuceArobase: { fr: "Tape @ pour identifier un cavalier.", en: "Type @ to tag a rider.", es: "Escribe @ para etiquetar a un jinete.", it: "Digita @ per taggare un cavaliere.", ja: "@\u3092\u5165\u529b\u3057\u3066\u9a0e\u624b\u3092\u30bf\u30b0\u4ed8\u3051", de: "Tippe @, um einen Reiter zu markieren." },
  photosChoisies: { fr: "photos choisies", en: "photos selected", es: "fotos elegidas", it: "foto scelte", ja: "\u679a\u9078\u629e\u4e2d", de: "Fotos ausgew\u00e4hlt" },
  envoiMulti: { fr: "Publication", en: "Publishing", es: "Publicando", it: "Pubblicazione", ja: "\u6295\u7a3f\u4e2d", de: "Ver\u00f6ffentlichung" },
  partiel: { fr: "publi\u00e9es \u2014 certaines n'ont pas pu partir.", en: "published \u2014 some could not be sent.", es: "publicadas \u2014 algunas no pudieron enviarse.", it: "pubblicate \u2014 alcune non sono partite.", ja: "\u6295\u7a3f\u6e08\u307f \u2014 \u4e00\u90e8\u306f\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", de: "ver\u00f6ffentlicht \u2014 einige konnten nicht gesendet werden." },
  fondTitre: { fr: "Le fond", en: "Background", es: "El fondo", it: "Lo sfondo", ja: "\u80cc\u666f", de: "Der Hintergrund" },
  fondNoir: { fr: "Noir", en: "Black", es: "Negro", it: "Nero", ja: "\u30d6\u30e9\u30c3\u30af", de: "Schwarz" },
  fondImmersif: { fr: "Immersif", en: "Immersive", es: "Inmersivo", it: "Immersivo", ja: "\u30a4\u30de\u30fc\u30b7\u30d6", de: "Immersiv" },
  maChanson: { fr: "La chanson de ma page", en: "My page song", es: "La canci\u00f3n de mi p\u00e1gina", it: "La canzone della mia pagina", ja: "\u30de\u30a4\u30da\u30fc\u30b8\u306e\u66f2", de: "Der Song meiner Seite" },
  choisirChanson: { fr: "Choisir la chanson de ma page", en: "Pick my page song", es: "Elegir la canci\u00f3n de mi p\u00e1gina", it: "Scegliere la canzone della mia pagina", ja: "\u30da\u30fc\u30b8\u306e\u66f2\u3092\u9078\u3076", de: "Den Song meiner Seite w\u00e4hlen" },
  chansonEnregistree: { fr: "Chanson enregistr\u00e9e.", en: "Song saved.", es: "Canci\u00f3n guardada.", it: "Canzone salvata.", ja: "\u66f2\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002", de: "Song gespeichert." },
  chansonErreur: { fr: "La chanson n'a pas pu \u00eatre enregistr\u00e9e (la colonne existe-t-elle ?).", en: "The song could not be saved (does the column exist?).", es: "No se pudo guardar la canci\u00f3n.", it: "Impossibile salvare la canzone.", ja: "\u66f2\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", de: "Der Song konnte nicht gespeichert werden." },
  musiqueTitre: { fr: "La musique", en: "Music", es: "La m\u00fasica", it: "La musica", ja: "\u97f3\u697d", de: "Die Musik" },
  sansMusique: { fr: "Sans musique", en: "No music", es: "Sin m\u00fasica", it: "Senza musica", ja: "\u97f3\u697d\u306a\u3057", de: "Ohne Musik" },
  modifier: { fr: "Modifier", en: "Edit", es: "Editar", it: "Modifica", ja: "\u7de8\u96c6", de: "Bearbeiten" },
  modifierTitre: { fr: "Modifier la story", en: "Edit the story", es: "Editar la story", it: "Modifica la story", ja: "\u30b9\u30c8\u30fc\u30ea\u30fc\u3092\u7de8\u96c6", de: "Story bearbeiten" },
  enregistrer: { fr: "Enregistrer", en: "Save", es: "Guardar", it: "Salva", ja: "\u4fdd\u5b58", de: "Speichern" },
  modifiee: { fr: "Story modifi\u00e9e.", en: "Story updated.", es: "Story modificada.", it: "Story modificata.", ja: "\u30b9\u30c8\u30fc\u30ea\u30fc\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f\u3002", de: "Story aktualisiert." },
  voirPlus: { fr: "voir plus", en: "see more", es: "ver m\u00e1s", it: "mostra pi\u00f9", ja: "\u3082\u3063\u3068\u898b\u308b", de: "mehr anzeigen" },
  voirMoins: { fr: "voir moins", en: "see less", es: "ver menos", it: "mostra meno", ja: "\u9589\u3058\u308b", de: "weniger anzeigen" },
  photoIndispo: { fr: "Photo indisponible", en: "Photo unavailable", es: "Foto no disponible", it: "Foto non disponibile", ja: "写真を読み込めません", de: "Foto nicht verfügbar" },
  maintenant: { fr: "\u00e0 l'instant", en: "just now", es: "ahora mismo", it: "adesso", ja: "たった今", de: "gerade eben" },
  ilYa: { fr: "il y a ", en: "", es: "hace ", it: "", ja: "", de: "vor " },
  jour: { fr: " j", en: "d ago", es: " d", it: " g", ja: "日前", de: " T" },
  heure: { fr: " h", en: "h ago", es: " h", it: " h", ja: "時間前", de: " Std." },
  min: { fr: " min", en: "min ago", es: " min", it: " min", ja: "分前", de: " Min." }
};
function hsT(cle, lg) {
  var o = HS_TXT[cle] || {};
  var l = lg || "fr";
  /* Certaines valeurs sont VOLONTAIREMENT vides (le préfixe « il y a » n'existe
     ni en anglais ni en japonais). Un test de véracité les ferait retomber sur
     le français et produirait « il y a 2d ago ». On teste la PRÉSENCE de la
     clé, pas sa valeur. */
  if (Object.prototype.hasOwnProperty.call(o, l)) return o[l];
  if (Object.prototype.hasOwnProperty.call(o, "fr")) return o.fr;
  return "";
}
function hsTempsRelatif(iso, lg) {
  try {
    var d = new Date(iso).getTime();
    if (!d) return "";
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
   4. LE BANDEAU — un composant, quatre appels.
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
  var oS = React.useState(-1), ouvert = oS[0], setOuvert = oS[1];
  var cS = React.useState(false), composer = cS[0], setComposer = cS[1];
  var fS = React.useState(null), fichier = fS[0], setFichier = fS[1];
  var tS = React.useState(null), toast = tS[0], setToast = tS[1];
  var fileRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  function bip(txt) { setToast(txt); try { setTimeout(function () { setToast(null); }, 3200); } catch (e) { } }

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
  function surFichier(ev) {
    try {
      var fs = ev && ev.target && ev.target.files ? Array.prototype.slice.call(ev.target.files, 0, HS_MULTI_MAX) : [];
      if (fs.length) { setFichier(fs); setComposer(true); }
      if (ev && ev.target) ev.target.value = "";
    } catch (e) { }
  }

  var T = (props && props.taille) || HS_TAILLE_ROND;
  var LARGEUR = T + 12;
  /* FORME : "rond" par défaut (Cavalier, Club, Écurie) ou "carte" (Communauté).
     Le choix est passé par la page appelante, pas décidé ici : un seul
     composant, deux présentations, zéro divergence. */
  var carte = !!(props && props.forme === "carte");
  var CL = (props && props.carteL) || HS_CARTE_L;
  var CH_ = (props && props.carteH) || HS_CARTE_H;

  /* Une cellule du bandeau.
     v2 : c'est LA PHOTO DE LA STORY qui s'affiche. L'avatar ne sert que de
     secours quand la story n'a pas d'image lisible.
     En forme RONDE, le liseré est un anneau EXTÉRIEUR (padding du conteneur).
     En forme CARTE, c'est un contour lumineux. Dans les deux cas, jamais un
     voile posé sur la photo. */
  function rond(g, i) {
    /* LE CÔTE À CÔTE (13/08, demande de Blandine) : jusqu'à DEUX stories du
       même cavalier s'affichent accolées — la plus ancienne non lue d'abord —
       reliées par un fin trait de lumière turquoise, avec UN seul nom
       dessous. Au-delà de deux : la pastille « +N » sur le second visuel,
       et la suite se découvre dans la visionneuse. Deux photos maximum,
       sinon un cavalier à cinq stories occuperait tout l'écran. */
    function visuelPour(st, cle) {
      var brut = (st && st.photo_url) || g.avatar_url || null;
      var src = brut;
      if (src && typeof vignetteHype === "function") src = vignetteHype(src, 300, 380);
      var photo = src
        ? h("img", { src: src, alt: "", loading: "lazy", onError: function (ev) { try { if (typeof replierVignette === "function") replierVignette(ev, brut); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : h("span", { style: { fontFamily: C, fontSize: carte ? 26 : 30, fontWeight: 700, color: tnL } }, String(g.pseudo || "?").charAt(0).toUpperCase());
      if (carte) {
        return h("div", {
          key: cle,
          style: {
            position: "relative", width: CL, height: CH_, borderRadius: 16, overflow: "hidden", flex: "0 0 auto",
            background: "#111417", display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid " + (g.toutesVues ? "rgba(255,255,255,0.14)" : tA(0.72)),
            boxShadow: g.toutesVues ? "none" : ("0 0 16px " + tA(0.26) + ", inset 0 0 0 1px " + tA(0.18))
          }
        }, photo);
      }
      return h("div", { key: cle, style: { position: "relative", width: T, height: T, borderRadius: "50%", flex: "0 0 auto", padding: 3, background: g.toutesVues ? "rgba(255,255,255,0.16)" : ("linear-gradient(135deg," + tn + "," + tnL + ")"), boxShadow: g.toutesVues ? "none" : ("0 0 18px " + tA(0.32)) } },
        h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2.5px solid #060709", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } }, photo));
    }

    var montrees = g.stories.slice(0, 2);
    var enPlus = g.stories.length - montrees.length;
    var visuels = montrees.map(function (st, k) { return visuelPour(st, "v" + k); });
    if (enPlus > 0) {
      /* La pastille « +N » se pose sur le DERNIER visuel affiché. */
      visuels[visuels.length - 1] = h("div", { key: "vp", style: { position: "relative", flex: "0 0 auto" } },
        visuels[visuels.length - 1],
        h("div", { style: { position: "absolute", right: carte ? 6 : 4, bottom: carte ? 6 : 4, minWidth: 21, height: 21, padding: "0 5px", borderRadius: 999, background: "rgba(6,7,9,0.88)", border: "1px solid " + tA(0.6), color: tnL, fontSize: 10.5, fontWeight: 800, fontFamily: M, display: "flex", alignItems: "center", justifyContent: "center" } }, "+" + enPlus));
    }

    var duo = (visuels.length > 1);
    var contenu = duo
      ? h("div", { style: { position: "relative", display: "flex", gap: 4, alignItems: "center" } },
        /* Le trait de lumière qui relie les deux photos. */
        h("div", { style: { position: "absolute", left: "8%", right: "8%", top: "50%", height: 1, background: "linear-gradient(90deg, transparent, " + tA(0.5) + ", transparent)", pointerEvents: "none" } }),
        visuels)
      : visuels[0];

    var largeurCel = duo ? ((carte ? CL : T) * 2 + 12) : (carte ? CL : LARGEUR);

    return h("button", {
      key: "st" + g.user_id,
      onClick: function () { hsAmorcerAudio(); setOuvert(i); },
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: largeurCel, textAlign: carte ? "left" : "center" }
    },
      contenu,
      h("div", { style: { fontSize: 11, marginTop: 7, fontFamily: M, fontWeight: g.toutesVues ? 500 : 700, color: g.toutesVues ? "#8A929C" : "#E4ECEF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
        g.moi ? hsT("ma", lg) : (g.pseudo || "Cavalier")));
  }

  /* Le bouton d'ajout. Libellé « Ajouter » : en v1 il disait « Ma story »,
     exactement comme le rond voisin, et le mot était écrit deux fois. */
  function rondAjout() {
    var creux = h("span", { style: { fontSize: carte ? 30 : 34, lineHeight: 1, color: tnL, fontWeight: 300 } }, "+");
    var visuel = carte
      ? h("div", { style: { width: CL, height: CH_, borderRadius: 16, border: "1px dashed " + tA(0.55), background: "rgba(17,20,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 26px rgba(32,217,245,0.06)" } }, creux)
      : h("div", { style: { width: T, height: T, borderRadius: "50%", margin: "0 auto", border: "1px dashed " + tA(0.55), background: "rgba(17,20,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 26px rgba(32,217,245,0.06)" } }, creux);
    return h("button", {
      key: "stplus",
      onClick: choisirFichier,
      "aria-label": hsT("ajouter", lg),
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: carte ? CL : LARGEUR, textAlign: carte ? "left" : "center" }
    },
      visuel,
      h("div", { style: { fontSize: 11, marginTop: 7, fontFamily: M, fontWeight: 700, color: tnL, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, hsT("ajouterCourt", lg)));
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };

  return h("div", { style: { padding: (props && props.padding) || "16px 0 8px" } },
    h("input", { ref: fileRef, type: "file", accept: "image/*", multiple: true, onChange: surFichier, style: { display: "none" } }),
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 10, overflowX: "auto", overflowY: "hidden", padding: "0 14px 6px", WebkitOverflowScrolling: "touch" } },
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
        onPublie: function (lieuIgnore, messagePartiel) { setComposer(false); setFichier(null); bip(messagePartiel ? messagePartiel : (lieuIgnore ? hsT("lieuIgnore", lg) : hsT("ajoutee", lg))); charger(); },
        onEchec: function () { setComposer(false); setFichier(null); bip(hsT("echec", lg)); }
      })
      : null,

    toast
      ? portail(h("div", { style: { position: "fixed", left: 16, right: 16, bottom: "calc(env(safe-area-inset-bottom) + 96px)", zIndex: 9400, padding: "12px 16px", borderRadius: 14, background: "rgba(9,13,17,0.94)", border: "1px solid " + tA(0.4), color: "#EDF2F5", fontSize: 12.5, fontFamily: M, textAlign: "center", lineHeight: 1.45 } }, toast), document.body)
      : null);
}

/* ---------------------------------------------------------------------------
   5. LE COMPOSEUR — aperçu, légende, lieu, tags.
   La photo d'aperçu est posée NUE sur du noir.
--------------------------------------------------------------------------- */
function ComposeurStory(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState(""), legende = lS[0], setLegende = lS[1];
  var liS = React.useState(""), lieu = liS[0], setLieu = liS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var aS = React.useState(null), apercu = aS[0], setApercu = aS[1];
  var qS = React.useState(""), requete = qS[0], setRequete = qS[1];
  var rS = React.useState([]), resultats = rS[0], setResultats = rS[1];
  var chS = React.useState([]), mesCh = chS[0], setMesCh = chS[1];
  var tgS = React.useState([]), tags = tgS[0], setTags = tgS[1];
  var cuS = React.useState(0), curseur = cuS[0], setCurseur = cuS[1];
  var mrS = React.useState([]), mentionRes = mrS[0], setMentionRes = mrS[1];
  var muS = React.useState(null), musique = muS[0], setMusique = muS[1];
  var ecS = React.useState(null), ecoute = ecS[0], setEcoute = ecS[1];
  var audioRef = React.useRef(null);

  /* Pré-écoute d'un morceau dans le composeur. Un seul lecteur, coupé au
     changement de piste, à la publication et au démontage — jamais deux sons
     en même temps. Le play() part d'un toucher : la règle iOS est respectée. */
  function preEcouter(ref) {
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (!ref || ecoute === ref) { setEcoute(null); return; }
      var url = hsUrlMusique(ref);
      if (!url || typeof Audio === "undefined") { setEcoute(null); return; }
      var a = new Audio(url);
      a.loop = false;
      audioRef.current = a;
      a.play().catch(function () { });
      setEcoute(ref);
      a.onended = function () { setEcoute(null); };
    } catch (e) { setEcoute(null); }
  }
  React.useEffect(function () {
    return function () { try { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } } catch (e) { } };
  }, []);
  var slS = React.useState([]), sugLieux = slS[0], setSugLieux = slS[1];
  /* Etats 13 et 14 — TOUJOURS declares apres tous les autres : le harnais
     de tests adresse les etats par position. */
  var fdS = React.useState(null), fond = fdS[0], setFond = fdS[1];
  var dmS = React.useState(null), dimPhoto = dmS[0], setDimPhoto = dmS[1];
  var corpsRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  /* Fait remonter le champ actif au-dessus du clavier iOS.
     Défaut vu sur la capture de Blandine : le clavier recouvrait le champ de
     recherche « Taguer » et masquait « Mes chevaux ». Le délai laisse le
     clavier finir de monter — sans lui, la position est calculée sur
     l'ancienne hauteur de fenêtre et le champ reste caché. */
  function remonter(ev) {
    try {
      var cible = ev && ev.target;
      if (!cible || !cible.scrollIntoView) return;
      setTimeout(function () {
        try { cible.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { }
      }, 320);
    } catch (e) { }
  }

  /* Une ou plusieurs photos : props.fichier peut etre un File OU un tableau
     (selection multiple, 13/08). Tout devient une liste. */
  var fichiers = [];
  try {
    if (props.fichier && typeof props.fichier.length === "number" && !props.fichier.type) fichiers = Array.prototype.slice.call(props.fichier, 0, HS_MULTI_MAX);
    else if (props.fichier) fichiers = [props.fichier];
  } catch (eF) { fichiers = props.fichier ? [props.fichier] : []; }

  React.useEffect(function () {
    var url = null;
    try {
      if (fichiers[0] && window.URL && window.URL.createObjectURL) {
        url = window.URL.createObjectURL(fichiers[0]);
        setApercu(url);
      }
    } catch (e) { }
    return function () { try { if (url && window.URL && window.URL.revokeObjectURL) window.URL.revokeObjectURL(url); } catch (e2) { } };
  }, [props.fichier]);

  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  /* Mes chevaux, pour les taguer d'un seul geste. */
  React.useEffect(function () {
    vivantRef.current = true;
    (async function () {
      try {
        var a = (typeof mesChevaux === "function") ? await mesChevaux() : { data: [] };
        var b = (typeof mesChevauxLies === "function") ? await mesChevauxLies() : { data: [] };
        var liste = ((a && a.data) || []).concat((b && b.data) || []);
        var vus = {}; var net = [];
        liste.forEach(function (c) { if (c && c.id && !vus[c.id]) { vus[c.id] = true; net.push(c); } });
        if (vivantRef.current) setMesCh(net.slice(0, 12));
      } catch (e) { }
    })();
    return function () { vivantRef.current = false; };
  }, []);

  /* Les clubs déjà codés (les 131 du Monde Au Galop), suggérés pendant la
     frappe du lieu. Le champ reste libre. */
  React.useEffect(function () {
    setSugLieux((typeof hsSuggererLieux === "function") ? hsSuggererLieux(lieu) : []);
  }, [lieu]);

  /* La frappe d'une mention @ déclenche sa propre recherche, indépendante du
     champ « Taguer ». Même différé de 320 ms : on ne requête pas à chaque
     lettre. */
  React.useEffect(function () {
    var m = hsMentionEnCours(legende, curseur);
    if (!m || m.terme.length < 1) { setMentionRes([]); return; }
    var minuteur = setTimeout(function () {
      (async function () {
        try {
          if (typeof rechercherCavaliersHype !== "function") { setMentionRes([]); return; }
          var r = await rechercherCavaliersHype(m.terme, 6);
          if (vivantRef.current) setMentionRes((r && r.data) || []);
        } catch (e) { }
      })();
    }, 320);
    return function () { clearTimeout(minuteur); };
  }, [legende, curseur]);

  /* Recherche de cavaliers, en léger différé pour ne pas requêter à chaque
     lettre tapée. */
  React.useEffect(function () {
    var q = String(requete || "").trim();
    if (q.length < 2) { setResultats([]); return; }
    var minuteur = setTimeout(function () {
      (async function () {
        try {
          if (typeof rechercherCavaliersHype !== "function") { setResultats([]); return; }
          var r = await rechercherCavaliersHype(q, 8);
          if (vivantRef.current) setResultats((r && r.data) || []);
        } catch (e) { }
      })();
    }, 320);
    return function () { clearTimeout(minuteur); };
  }, [requete]);

  function estTague(type, id) {
    return tags.some(function (t) { return t.type === type && String(t.id) === String(id); });
  }
  function basculerTag(type, id, nom) {
    if (estTague(type, id)) {
      setTags(tags.filter(function (t) { return !(t.type === type && String(t.id) === String(id)); }));
      return;
    }
    if (tags.length >= 8) return;
    setTags(tags.concat([{ type: type, id: id, nom: nom || "" }]));
  }

  async function publier() {
    if (busy) return;
    setBusy(true);
    try {
      try { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } } catch (eA) { }
      /* LE CHAPELET (13/08) : chaque photo devient une story, dans l'ordre de
         la sélection. La LÉGENDE et les TAGS vont à la PREMIÈRE seulement (un
         texte répété dix fois n'a pas de sens) ; le LIEU, la MUSIQUE et le
         FOND accompagnent TOUTES. Un échec au milieu n'arrête pas les
         suivantes : on publie ce qui peut l'être et on le dit. */
      var okN = 0, lieuIgn = false, dernierR = null;
      for (var iF = 0; iF < fichiers.length; iF++) {
        var rI = await hsPublierStory(
          fichiers[iF],
          iF === 0 ? legende : null,
          lieu,
          iF === 0 ? tags : [],
          musique,
          fond
        );
        dernierR = rI;
        if (rI && !rI.error) { okN++; if (rI.lieuIgnore) lieuIgn = true; }
      }
      setBusy(false);
      if (okN === 0) { if (props.onEchec) props.onEchec(); return; }
      if (okN < fichiers.length && props.onPublie) { props.onPublie(lieuIgn, okN + "/" + fichiers.length + " " + hsT("partiel", lg)); return; }
      if (props.onPublie) props.onPublie(lieuIgn);
    } catch (e) {
      setBusy(false);
      if (props.onEchec) props.onEchec();
    }
  }

  function titreBloc(txt) {
    return h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "18px 0 8px" } }, txt);
  }

  function puce(actif, libelle, onClick, cle) {
    return h("button", {
      key: cle, onClick: onClick,
      style: {
        padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12,
        fontWeight: actif ? 800 : 600,
        border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"),
        background: actif ? "rgba(32,217,245,0.12)" : "transparent",
        color: actif ? tn : "#C9D3D8", flex: "0 0 auto", maxWidth: "100%",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
      }
    }, (actif ? "\u2713 " : "") + libelle);
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
          ? h("div", { style: { marginTop: 16, borderRadius: 16, overflow: "hidden", background: "#060709", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: "38vh" } },
            h("div", { style: { position: "relative", overflow: "hidden" } },
            (HS_FOND_IMMERSIF_ACTIF && fond === "immersif")
              ? h("div", { "aria-hidden": true, style: { position: "absolute", inset: -20, backgroundImage: "url(\"" + apercu + "\")", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(24px) brightness(0.5) saturate(1.05)", transform: "scale(1.12)", pointerEvents: "none" } })
              : null,
            h("img", {
              src: apercu, alt: "",
              onLoad: function (ev) {
                try { var im = ev.target; if (im && im.naturalWidth) setDimPhoto({ w: im.naturalWidth, hh: im.naturalHeight }); } catch (eD) { }
              },
              style: { width: "100%", maxHeight: "38vh", objectFit: "contain", display: "block", position: "relative" }
            })))
          : null,

        (fichiers.length > 1)
          ? h("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 } },
            h("span", { style: { padding: "5px 11px", borderRadius: 999, fontSize: 11, fontFamily: M, fontWeight: 800, border: "1px solid " + tA(0.55), color: tn, background: "rgba(32,217,245,0.08)" } }, fichiers.length + " " + hsT("photosChoisies", lg)),
            h("span", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C" } }, "\u2192"))
          : null,

        /* LE FOND (13/08, spec de Blandine) : une photo paysage ou carrée ne
           remplit pas l'écran vertical — l'auteur choisit ce qu'il y a
           derrière. Noir = l'existant (défaut). Immersif = la même photo en
           fond flouté et assombri. Le sélecteur n'apparaît QUE pour ces
           photos ; une photo verticale n'en a pas besoin. Visible
           immédiatement dans l'aperçu ci-dessus. */
        (HS_FOND_IMMERSIF_ACTIF && apercu && dimPhoto && dimPhoto.w >= dimPhoto.hh)
          ? h("div", { style: { marginTop: 10 } },
            h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), marginBottom: 7 } }, hsT("fondTitre", lg)),
            h("div", { style: { display: "flex", gap: 8 } },
              [{ v: null, t: hsT("fondNoir", lg) }, { v: "immersif", t: hsT("fondImmersif", lg) }].map(function (o) {
                var actif = (fond === o.v);
                return h("button", {
                  key: "fd" + (o.v || "noir"),
                  onClick: function () { setFond(o.v); },
                  style: { padding: "9px 15px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: actif ? 800 : 600, border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"), background: actif ? "rgba(32,217,245,0.12)" : "transparent", color: actif ? tn : "#C9D3D8" }
                }, o.t);
              })))
          : null,

        /* La légende. 1000 caractères, 5 lignes, compteur discret au-delà de
           800 — et détection des mentions @ à la frappe.
           onFocus fait remonter le champ : sur iPhone le clavier recouvrait la
           zone « Taguer » (défaut vu sur la capture de Blandine). Le délai de
           320 ms laisse le clavier finir de monter, sinon le navigateur calcule
           la position sur l'ancienne hauteur de fenêtre. */
        h("textarea", {
          value: legende,
          onChange: function (e) {
            setLegende(e.target.value);
            try { setCurseur(e.target.selectionStart); } catch (eC) { setCurseur(e.target.value.length); }
          },
          onFocus: remonter,
          onKeyUp: function (e) { try { setCurseur(e.target.selectionStart); } catch (eK) { } }, 
          rows: 5, maxLength: HS_LEGENDE_MAX, placeholder: hsT("legende", lg),
          style: { marginTop: 14, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.55 }
        }),
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 6 } },
          h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", lineHeight: 1.4 } }, hsT("astuceArobase", lg)),
          (legende.length > 800)
            ? h("div", { style: { fontSize: 10, fontFamily: M, fontWeight: 700, color: (legende.length >= HS_LEGENDE_MAX ? "#E8A6A6" : tA(0.9)), flex: "0 0 auto" } }, legende.length + "/" + HS_LEGENDE_MAX)
            : null),

        /* Les cavaliers proposés pendant la frappe d'une mention. Toucher un
           nom insère « @pseudo » dans le texte ET pose le tag. */
        mentionRes.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10, padding: "10px 11px", borderRadius: 14, border: "1px solid " + tA(0.34), background: "rgba(32,217,245,0.05)" } },
            mentionRes.map(function (p) {
              return h("button", {
                key: "mn" + p.id,
                onClick: function () {
                  var t = hsInsererMention(legende, curseur, p.pseudo || "");
                  setLegende(t);
                  setCurseur(t.length);
                  setMentionRes([]);
                  if (!estTague("cavalier", p.id)) basculerTag("cavalier", p.id, p.pseudo || "");
                },
                style: { padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: 700, border: "1px solid " + tA(0.6), background: "rgba(32,217,245,0.1)", color: tn, flex: "0 0 auto" }
              }, "@" + (p.pseudo || "Cavalier"));
            }))
          : null,

        /* --- LE LIEU --- */
        titreBloc("\uD83D\uDCCD " + hsT("lieuTitre", lg)),
        h("input", {
          value: lieu, onChange: function (e) { setLieu(e.target.value); },
          maxLength: HS_LIEU_MAX, placeholder: hsT("lieuChamp", lg), onFocus: remonter,
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        sugLieux.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 } },
            sugLieux.map(function (c, i) {
              return h("button", {
                key: "sl" + i,
                onClick: function () { setLieu(c.nom); setSugLieux([]); },
                style: { padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700, border: "1px solid " + tA(0.55), background: "rgba(32,217,245,0.08)", color: tn, flex: "0 0 auto", maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
              }, c.nom + (c.ville ? (" · " + c.ville) : ""));
            }))
          : null,

        /* --- LES TAGS --- */
        /* --- LA MUSIQUE (13/08, fichiers Pixabay fournis par Blandine) ---
           Toucher une puce = choisir ET pré-écouter. Retoucher la même =
           désélectionner. « Sans musique » en tête, sélectionné par défaut. */
        titreBloc("\u266a " + hsT("musiqueTitre", lg)),
        h("div", { "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, WebkitOverflowScrolling: "touch" } },
          [h("button", {
            key: "m0",
            onClick: function () { preEcouter(null); setMusique(null); },
            style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: musique === null ? 800 : 600, border: "1px solid " + (musique === null ? tA(0.7) : "rgba(255,255,255,0.18)"), background: musique === null ? "rgba(32,217,245,0.12)" : "transparent", color: musique === null ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
          }, hsT("sansMusique", lg))].concat(HS_MUSIQUES.map(function (m) {
            var actif = (musique === m.ref);
            var joue = (ecoute === m.ref);
            return h("button", {
              key: "m" + m.ref,
              onClick: function () {
                if (actif) { setMusique(null); preEcouter(null); }
                else { setMusique(m.ref); preEcouter(m.ref); }
              },
              style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: actif ? 800 : 600, border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"), background: actif ? "rgba(32,217,245,0.12)" : "transparent", color: actif ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
            }, (joue ? "\u25b6 " : "\u266a ") + m.nom);
          }))),

        titreBloc(hsT("taguerTitre", lg)),
        h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", lineHeight: 1.45, marginBottom: 10 } }, hsT("tagAvis", lg)),

        mesCh.length
          ? h("div", null,
            h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginBottom: 7 } }, hsT("mesChevaux", lg)),
            h("div", { "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 } },
              mesCh.map(function (c) {
                return puce(estTague("cheval", c.id), c.nom || "Cheval", function () { basculerTag("cheval", c.id, c.nom || ""); }, "ch" + c.id);
              })))
          : null,

        h("input", {
          value: requete, onChange: function (e) { setRequete(e.target.value); },
          placeholder: hsT("chercherCav", lg), onFocus: remonter,
          style: { marginTop: 10, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.16)", color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        (String(requete || "").trim().length >= 2 && !resultats.length)
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: "#8A929C", marginTop: 9 } }, hsT("aucunResultat", lg))
          : null,
        resultats.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 } },
            resultats.map(function (p) {
              return puce(estTague("cavalier", p.id), p.pseudo || "Cavalier", function () { basculerTag("cavalier", p.id, p.pseudo || ""); }, "cv" + p.id);
            }))
          : null,
        tags.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 } },
            tags.map(function (t, i) {
              return puce(true, (t.type === "cheval" ? "\uD83D\uDC0E " : "") + (t.nom || "?"), function () { basculerTag(t.type, t.id, t.nom); }, "tg" + i);
            }))
          : null,

        h("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", { onClick: publier, disabled: busy, style: { flex: 1.4, padding: "13px 0", borderRadius: 999, border: "none", background: busy ? "rgba(32,217,245,0.35)" : ("linear-gradient(90deg," + tn + "," + tnL + ")"), color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: busy ? "default" : "pointer" } }, busy ? (fichiers.length > 1 ? (hsT("envoiMulti", lg) + "\u2026") : hsT("envoi", lg)) : (fichiers.length > 1 ? (hsT("publier", lg) + " (" + fichiers.length + ")") : hsT("publier", lg)))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   6b. LA CHANSON DE MA PAGE (13/08, décision de Blandine : option A)
   Une pastille ♪ sur la page cavalier, visible par tous : le toucher lance le
   morceau en boucle, le retoucher coupe. Le propriétaire choisit son morceau
   (les 11 de la bibliothèque) ; un visiteur ne voit la pastille que si un
   morceau est choisi. JAMAIS de lecture automatique à l'arrivée sur la page
   (« si on le souhaite » + règle iOS) — le toucher de la pastille est le
   geste. Stockage : profiles.musique_page (une colonne, aucun SQL de plus).
   Le lecteur est LE MÊME que celui des stories : ouvrir une story avec sa
   propre musique prend la main, la chanson de la page ne reprend pas toute
   seule après — un toucher la relance.
--------------------------------------------------------------------------- */
function PastilleMusiquePage(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var M = "'Montserrat',sans-serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var mS = React.useState(null), morceau = mS[0], setMorceau = mS[1];
  var jS = React.useState(false), joue = jS[0], setJoue = jS[1];
  var cS = React.useState(false), choixOuvert = cS[0], setChoixOuvert = cS[1];
  var msgS = React.useState(""), msg = msgS[0], setMsg = msgS[1];
  var lecteurRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    vivantRef.current = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !props.userId) return;
        var r = await supa.from("profiles").select("musique_page").eq("id", props.userId).maybeSingle();
        if (vivantRef.current && r && r.data && r.data.musique_page && hsUrlMusique(r.data.musique_page)) setMorceau(r.data.musique_page);
      } catch (e) { }
    })();
    return function () {
      vivantRef.current = false;
      /* On quitte la page : la chanson s'arrête avec elle. */
      try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (e) { }
    };
  }, [props.userId || ""]);

  function basculer() {
    try {
      if (joue) {
        if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; }
        setJoue(false);
        return;
      }
      var url = hsUrlMusique(morceau);
      if (!url || typeof Audio === "undefined") return;
      var a = (typeof window !== "undefined" && window.__hsLecteur) ? window.__hsLecteur : new Audio();
      a.muted = false; a.loop = true; a.src = url; a.__hsJoue = true;
      lecteurRef.current = a;
      var p = a.play();
      if (p && p.catch) p.catch(function () { setJoue(false); a.__hsJoue = false; });
      setJoue(true);
    } catch (e) { }
  }

  async function enregistrer(ref) {
    try {
      setChoixOuvert(false);
      if (typeof supa === "undefined" || !supa) return;
      var user = await utilisateurActuel();
      if (!user) return;
      var r = await supa.from("profiles").update({ musique_page: ref || null }).eq("id", user.id);
      if (r && r.error) { setMsg(hsT("chansonErreur", lg)); setTimeout(function () { if (vivantRef.current) setMsg(""); }, 4000); return; }
      try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (e2) { }
      setJoue(false);
      setMorceau(ref || null);
      setMsg(hsT("chansonEnregistree", lg));
      setTimeout(function () { if (vivantRef.current) setMsg(""); }, 2500);
    } catch (e) { }
  }

  /* Un visiteur sans morceau choisi : rien du tout. */
  if (!morceau && !props.proprio) return null;

  return h("div", { style: { padding: "2px 16px 10px" } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
      morceau
        ? h("button", {
          onClick: basculer,
          style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: 700, border: "1px solid " + (joue ? tA(0.75) : "rgba(255,255,255,0.22)"), background: joue ? "rgba(32,217,245,0.13)" : "rgba(17,20,23,0.85)", color: joue ? tnL : "#DCE3E8", boxShadow: joue ? ("0 0 18px " + tA(0.28)) : "none" }
        }, (joue ? "\u266b " : "\u266a ") + hsNomMusique(morceau))
        : null,
      props.proprio
        ? h("button", {
          onClick: function () { setChoixOuvert(!choixOuvert); },
          style: { padding: "10px 14px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11, fontWeight: 600, border: "1px dashed " + tA(0.5), background: "transparent", color: tA(0.95) }
        }, morceau ? "\u270e" : ("\u266a " + hsT("choisirChanson", lg)))
        : null),
    msg ? h("div", { style: { fontSize: 11, fontFamily: M, color: tnL, marginTop: 7 } }, msg) : null,
    (choixOuvert && props.proprio)
      ? h("div", { "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", padding: "10px 0 4px", WebkitOverflowScrolling: "touch" } },
        [h("button", {
          key: "pm0", onClick: function () { enregistrer(null); },
          style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: morceau === null ? 800 : 600, border: "1px solid " + (morceau === null ? tA(0.7) : "rgba(255,255,255,0.18)"), background: "transparent", color: morceau === null ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
        }, hsT("sansMusique", lg))].concat(HS_MUSIQUES.map(function (m) {
          var actif = (morceau === m.ref);
          return h("button", {
            key: "pm" + m.ref, onClick: function () { enregistrer(m.ref); },
            style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: actif ? 800 : 600, border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"), background: actif ? "rgba(32,217,245,0.12)" : "transparent", color: actif ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
          }, "\u266a " + m.nom);
        })))
      : null);
}

/* ---------------------------------------------------------------------------
   7. LE RAIL DES À LA UNE
   Sur la page Cavalier : les à la une DU CAVALIER AFFICHÉ (soi-même ou la
   personne visitée) — on vient voir cette page, donc ses à la une.
   Sur Club et Écurie : les à la une du cavalier CONNECTÉ.
   DÉDUCTION DE CLAUDE — À VALIDER : Blandine a dit « Cavalier club et écurie »
   sans préciser de qui, sur le club et l'écurie, les à la une devaient être.
   Le sujet de ces deux pages n'est pas une personne, j'ai donc pris le
   cavalier connecté, ce qui est le moins surprenant.
--------------------------------------------------------------------------- */
function RailALaUne(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var uS = React.useState([]), unes = uS[0], setUnes = uS[1];
  var oS = React.useState(null), ouverte = oS[0], setOuverte = oS[1];
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    vivantRef.current = true;
    if (typeof hsListerALaUne === "function") {
      hsListerALaUne(props && props.userId).then(function (r) {
        if (!vivantRef.current) return;
        setUnes((r && r.data) || []);
      });
    }
    return function () { vivantRef.current = false; };
  }, [(props && props.userId) || ""]);

  /* Rien à montrer : le rail ne s'affiche pas du tout. Une page ne porte pas
     une rangée vide (règle d'espace de la Design Bible). */
  if (!unes.length) return null;

  var T = 74;

  return h("div", { style: { padding: (props && props.padding) || "6px 0 10px" } },
    h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: tA(0.9), padding: "0 16px 9px" } }, hsT("aLaUne", lg)),
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 12, overflowX: "auto", overflowY: "hidden", padding: "0 16px 4px", WebkitOverflowScrolling: "touch" } },
      unes.map(function (a) {
        var couvBrut = a.couverture || (a.photos || [])[0] || null;
        var couv = couvBrut;
        if (couv && typeof vignetteHype === "function") couv = vignetteHype(couv, 200, 200);
        return h("button", {
          key: "une" + a.id,
          onClick: function () { hsAmorcerAudio(); setOuverte(a); },
          style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: T + 10, textAlign: "center" }
        },
          h("div", { style: { width: T, height: T, borderRadius: "50%", margin: "0 auto", padding: 2, background: "linear-gradient(135deg, rgba(255,255,255,0.22), " + tA(0.42) + ")" } },
            h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid #060709", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
              couv
                ? h("img", { src: couv, alt: "", loading: "lazy", onError: function (ev) { try { if (typeof replierVignette === "function") replierVignette(ev, couvBrut); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
                : h("span", { style: { fontFamily: C, fontSize: 20, fontWeight: 700, color: tnL } }, String(a.nom || "?").charAt(0).toUpperCase()))),
          h("div", { style: { fontSize: 10.5, marginTop: 7, fontFamily: M, fontWeight: 600, color: "#C9D3D8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.nom || ""));
      })),

    ouverte
      ? h(VisionneuseStories, {
        /* Une à la une se lit avec la MÊME visionneuse que les stories : on
           fabrique un groupe à partir des photos de l'album. mode "album"
           masque les actions (garder / supprimer / signaler) — on relit un
           souvenir, on n'agit pas dessus. */
        groupes: [{
          user_id: "album:" + ouverte.id,
          pseudo: ouverte.nom || hsT("aLaUne", lg),
          avatar_url: ouverte.couverture || null,
          ecurie: "",
          stories: (ouverte.photos || []).map(function (u, k) { return { id: "alb" + ouverte.id + "-" + k, photo_url: u }; })
        }],
        depart: 0, moiId: null, premium: !!(app && app.premium), langue: lg, mode: "album",
        onFermer: function () { setOuverte(null); }
      })
      : null);
}

/* ---------------------------------------------------------------------------
   8. LE CHOIX DE L'À LA UNE AU MOMENT DE GARDER
   Décision de Blandine du 12/08 : « Garder demande dans laquelle ranger ».
--------------------------------------------------------------------------- */
function ChoixALaUne(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState([]), listes = lS[0], setListes = lS[1];
  var nS = React.useState(""), nom = nS[0], setNom = nS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var corpsRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    vivantRef.current = true;
    if (typeof hsMesALaUnePourRanger === "function") {
      hsMesALaUnePourRanger().then(function (r) {
        if (!vivantRef.current) return;
        setListes((r && r.data) || []);
      });
    }
    return function () { vivantRef.current = false; };
  }, []);
  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  function choisir(dest) {
    if (busy) return;
    setBusy(true);
    if (props.onChoix) props.onChoix(dest);
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  return portail(
    h("div", {
      onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
      /* 13/08 01h40 : même ceinture tactile que ModifierStory (voir là-bas). */
      onTouchStart: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchMove: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchEnd: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      style: { position: "fixed", inset: 0, zIndex: 9500, background: "rgba(4,6,9,0.9)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        style: { width: "100%", boxSizing: "border-box", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" }
      },
        h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 16px" } }),
        h("div", { style: { fontFamily: C, fontSize: 13.5, letterSpacing: 1.6, textTransform: "uppercase", color: "#F4F7FA", textAlign: "center", lineHeight: 1.4 } }, hsT("rangerOu", lg)),

        listes.length
          ? h("div", { style: { marginTop: 16 } },
            listes.map(function (a) {
              var couv = a.couverture || (a.photos || [])[0] || null;
              return h("button", {
                key: "ch" + a.id,
                onClick: function () { choisir({ albumId: a.id }); },
                style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 8, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.035)", cursor: "pointer", textAlign: "left" }
              },
                h("div", { style: { width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", background: "#111417", border: "1px solid " + tA(0.4), display: "flex", alignItems: "center", justifyContent: "center" } },
                  couv
                    ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(couv, 112, 112) : couv, alt: "", onError: function (ev) { try { if (typeof replierVignette === "function") replierVignette(ev, couv); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } })
                    : h("span", { style: { fontFamily: C, fontSize: 15, color: tnL, fontWeight: 700 } }, String(a.nom || "?").charAt(0).toUpperCase())),
                h("div", { style: { minWidth: 0, flex: 1 } },
                  h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.nom || ""),
                  h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", marginTop: 2 } }, String((a.photos || []).length))),
                h("span", { style: { color: tnL, fontSize: 17, fontWeight: 700, flex: "0 0 auto" } }, "\u203a"));
            }))
          : h("div", { style: { fontSize: 11.5, fontFamily: M, color: "#8A929C", textAlign: "center", margin: "16px 0 4px" } }, hsT("videUne", lg)),

        h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "18px 0 8px" } }, hsT("nouvelleUne", lg)),
        h("input", {
          value: nom, onChange: function (e) { setNom(e.target.value); },
          maxLength: 40, placeholder: hsT("nomUne", lg),
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", {
            onClick: function () { var n = String(nom || "").trim(); if (n) choisir({ nouveau: n }); },
            disabled: busy || !String(nom || "").trim(),
            style: { flex: 1.2, padding: "13px 0", borderRadius: 999, border: "none", background: String(nom || "").trim() ? ("linear-gradient(90deg," + tn + "," + tnL + ")") : "rgba(32,217,245,0.22)", color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: String(nom || "").trim() ? "pointer" : "default" }
          }, hsT("creer", lg))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   8b. LA MODIFICATION D'UNE STORY (13/08, décision de Blandine)
   Légende et lieu seulement — la photo n'est pas remplaçable : changer
   l'image, c'est une autre story. Point d'honnêteté déjà donné à Blandine :
   une story modifiée reste marquée « vue » chez ceux qui l'ont ouverte,
   comme sur Instagram.
--------------------------------------------------------------------------- */
function ModifierStory(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var st = props.story || {};
  var lS = React.useState(st.legende || ""), legende = lS[0], setLegende = lS[1];
  var liS = React.useState(st.lieu || ""), lieu = liS[0], setLieu = liS[1];
  var muS = React.useState(st.musique || null), musique = muS[0], setMusique = muS[1];
  var ecS = React.useState(null), ecoute = ecS[0], setEcoute = ecS[1];
  var audioRef = React.useRef(null);
  function preEcouter(ref) {
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (!ref || ecoute === ref) { setEcoute(null); return; }
      var url = hsUrlMusique(ref);
      if (!url || typeof Audio === "undefined") { setEcoute(null); return; }
      var a = new Audio(url);
      a.loop = false;
      audioRef.current = a;
      a.play().catch(function () { });
      setEcoute(ref);
      a.onended = function () { setEcoute(null); };
    } catch (e) { setEcoute(null); }
  }
  React.useEffect(function () {
    return function () { try { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } } catch (e) { } };
  }, []);
  var slS = React.useState([]), sugLieux = slS[0], setSugLieux = slS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  /* Etats 6 et 7 — apres tous les autres, le harnais adresse par position. */
  var fdS = React.useState(st.fond || null), fond = fdS[0], setFond = fdS[1];
  var dmS = React.useState(null), dimPhoto = dmS[0], setDimPhoto = dmS[1];
  var corpsRef = React.useRef(null);

  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  /* Les clubs déjà codés, suggérés pendant la frappe du lieu. */
  React.useEffect(function () {
    setSugLieux((typeof hsSuggererLieux === "function") ? hsSuggererLieux(lieu) : []);
  }, [lieu]);

  function remonter(ev) {
    try {
      var cible = ev && ev.target;
      if (!cible || !cible.scrollIntoView) return;
      setTimeout(function () { try { cible.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { } }, 320);
    } catch (e) { }
  }

  React.useEffect(function () {
    /* La feuille ne montre jamais la photo : ses dimensions sont relevées en
       la rechargeant (cache navigateur, coût nul en pratique) pour savoir si
       le sélecteur de fond a une raison d'être. */
    var vivant = true;
    try {
      if (typeof Image === "undefined" || !st.photo_url) return;
      var im = new Image();
      im.onload = function () { if (vivant && im.naturalWidth) setDimPhoto({ w: im.naturalWidth, hh: im.naturalHeight }); };
      im.src = (typeof hsImageEcran === "function") ? hsImageEcran(st.photo_url) : st.photo_url;
    } catch (eD) { }
    return function () { vivant = false; };
  }, []);

  async function enregistrer() {
    if (busy) return;
    setBusy(true);
    try { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } } catch (eA) { }
    var r = await hsModifierStory(st.id, legende, lieu, musique, fond);
    setBusy(false);
    if (r && r.error) { if (props.onEchec) props.onEchec(); return; }
    if (props.onFait) props.onFait({ legende: legende, lieu: lieu, musique: musique, fond: fond, lieuIgnore: !!(r && r.lieuIgnore) });
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  return portail(
    h("div", {
      onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
      /* 13/08 01h40 : couper la REMONTÉE TACTILE. Sans ça, les touches sur
         cette feuille atteignaient le glissé de fermeture de la visionneuse
         (React fait remonter les événements par l'arbre des composants, même
         à travers un portail) : taper dans un champ fermait la story. */
      onTouchStart: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchMove: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchEnd: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      style: { position: "fixed", inset: 0, zIndex: 9500, background: "rgba(4,6,9,0.9)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        /* 13/08 01h58 : boxSizing manquait — width:100% PLUS les marges
           intérieures = 32 px de trop, la feuille débordait à droite et le
           bouton Enregistrer sortait de l'écran (capture de Blandine). */
        style: { width: "100%", boxSizing: "border-box", maxWidth: 520, maxHeight: "86vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" }
      },
        h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 16px" } }),
        h("div", { style: { fontFamily: C, fontSize: 13.5, letterSpacing: 1.6, textTransform: "uppercase", color: "#F4F7FA", textAlign: "center" } }, hsT("modifierTitre", lg)),

        h("textarea", {
          value: legende, onChange: function (e) { setLegende(e.target.value); },
          onFocus: remonter,
          rows: 5, maxLength: HS_LEGENDE_MAX, placeholder: hsT("legende", lg),
          style: { marginTop: 16, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.55 }
        }),
        (legende.length > 800)
          ? h("div", { style: { fontSize: 10, fontFamily: M, fontWeight: 700, color: (legende.length >= HS_LEGENDE_MAX ? "#E8A6A6" : tA(0.9)), textAlign: "right", marginTop: 5 } }, legende.length + "/" + HS_LEGENDE_MAX)
          : null,

        h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "16px 0 8px" } }, "\uD83D\uDCCD " + hsT("lieuTitre", lg)),
        h("input", {
          value: lieu, onChange: function (e) { setLieu(e.target.value); },
          onFocus: remonter,
          maxLength: HS_LIEU_MAX, placeholder: hsT("lieuChamp", lg),
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        sugLieux.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 } },
            sugLieux.map(function (c, i) {
              return h("button", {
                key: "sl" + i,
                onClick: function () { setLieu(c.nom); setSugLieux([]); },
                style: { padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700, border: "1px solid " + tA(0.55), background: "rgba(32,217,245,0.08)", color: tn, flex: "0 0 auto", maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
              }, c.nom + (c.ville ? (" \u00b7 " + c.ville) : ""));
            }))
          : null,

        (HS_FOND_IMMERSIF_ACTIF && dimPhoto && dimPhoto.w >= dimPhoto.hh)
          ? h("div", null,
            h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "16px 0 8px" } }, hsT("fondTitre", lg)),
            h("div", { style: { display: "flex", gap: 8 } },
              [{ v: null, t: hsT("fondNoir", lg) }, { v: "immersif", t: hsT("fondImmersif", lg) }].map(function (o) {
                var actif = (fond === o.v);
                return h("button", {
                  key: "fd" + (o.v || "noir"),
                  onClick: function () { setFond(o.v); },
                  style: { padding: "9px 15px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: actif ? 800 : 600, border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"), background: actif ? "rgba(32,217,245,0.12)" : "transparent", color: actif ? tn : "#C9D3D8" }
                }, o.t);
              })))
          : null,
        h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "16px 0 8px" } }, "\u266a " + hsT("musiqueTitre", lg)),
        h("div", { "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, WebkitOverflowScrolling: "touch" } },
          [h("button", {
            key: "m0",
            onClick: function () { preEcouter(null); setMusique(null); },
            style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: musique === null ? 800 : 600, border: "1px solid " + (musique === null ? tA(0.7) : "rgba(255,255,255,0.18)"), background: musique === null ? "rgba(32,217,245,0.12)" : "transparent", color: musique === null ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
          }, hsT("sansMusique", lg))].concat(HS_MUSIQUES.map(function (m) {
            var actif = (musique === m.ref);
            var joue = (ecoute === m.ref);
            return h("button", {
              key: "m" + m.ref,
              onClick: function () {
                if (actif) { setMusique(null); preEcouter(null); }
                else { setMusique(m.ref); preEcouter(m.ref); }
              },
              style: { padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: actif ? 800 : 600, border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"), background: actif ? "rgba(32,217,245,0.12)" : "transparent", color: actif ? tn : "#C9D3D8", flex: "0 0 auto", whiteSpace: "nowrap" }
            }, (joue ? "\u25b6 " : "\u266a ") + m.nom);
          }))),

        h("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", { onClick: enregistrer, disabled: busy, style: { flex: 1.2, padding: "13px 0", borderRadius: 999, border: "none", background: busy ? "rgba(32,217,245,0.35)" : ("linear-gradient(90deg," + tn + "," + tnL + ")"), color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: busy ? "default" : "pointer" } }, busy ? hsT("envoi", lg) : hsT("enregistrer", lg))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   9. LA VISIONNEUSE
   Photo nue au centre sur noir absolu. En-tête au-dessus, lieu / légende /
   tags / actions en dessous, sur surface givrée : la photo ne reçoit AUCUN
   calque.
   - la progression est écrite directement dans le style du DOM, sans état
     React : un re-rendu à 60 images par seconde tuerait l'onglet sur iPhone.
   - aucun setPointerCapture : c'était une des causes du blocage de
     défilement Android. Événements touch simples.
--------------------------------------------------------------------------- */
function VisionneuseStories(props) {
  var h = React.createElement;
  var ctxV = (typeof useApp === "function") ? useApp() : null;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var groupes = props.groupes || [];
  var gS = React.useState(props.depart || 0), ig = gS[0], setIg = gS[1];
  var sS = React.useState(0), is = sS[0], setIs = sS[1];
  var aS = React.useState(null), action = aS[0], setAction = aS[1];
  var tgS = React.useState([]), tagsStory = tgS[0], setTagsStory = tgS[1];
  /* CORRECTIF DE LA SESSION 114b — À NE PLUS JAMAIS PERDRE.
     Le minuteur de 6 s démarrait au MONTAGE du composant. Sur une connexion
     réelle, une photo Supabase met plusieurs secondes à descendre : la story
     se refermait avant que l'image n'apparaisse. Diagnostic fait sur
     l'enregistrement d'écran de Blandine, lu image par image.
     Désormais le CHARGEMENT DE L'IMAGE est le point de départ de tout : le
     minuteur, la barre de progression et le marquage « vue ». */
  var cgS = React.useState(false), chargee = cgS[0], setChargee = cgS[1];
  var erS = React.useState(false), erreur = erS[0], setErreur = erS[1];
  /* mode "album" : on relit une à la une. Aucune action possible sur la photo
     (ni garder, ni supprimer, ni signaler) — on relit un souvenir. */
  var estAlbum = !!(props && props.mode === "album");
  var chS = React.useState(false), choix = chS[0], setChoix = chS[1];
  var nrS = React.useState(""), nomRange = nrS[0], setNomRange = nrS[1];
  var dpS = React.useState(false), deplie = dpS[0], setDeplie = dpS[1];
  var edS = React.useState(false), enEdition = edS[0], setEnEdition = edS[1];
  var snS = React.useState(false), sonActif = snS[0], setSonActif = snS[1];
  var rlS = React.useState(0), relance = rlS[0], setRelance = rlS[1];
  var lecteurRef = React.useRef(null);
  var loS = React.useState(null), localMod = loS[0], setLocalMod = loS[1];
  var mnS = React.useState(false), menuOuvert = mnS[0], setMenuOuvert = mnS[1];
  var pauseRef = React.useRef(false);
  var barreRef = React.useRef(null);
  var glisseRef = React.useRef({ y0: 0, actif: false });
  var boiteRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  var groupe = groupes[ig] || null;
  var story = groupe ? (groupe.stories[is] || null) : null;
  if (story && localMod && localMod.id === story.id) {
    story = Object.assign({}, story, { legende: localMod.legende, lieu: localMod.lieu, musique: localMod.musique, fond: localMod.fond });
  }
  var estMoi = !!(groupe && props.moiId && groupe.user_id === props.moiId);

  React.useEffect(function () {
    return function () { try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (e) { } };
  }, []);

  /* Le geste retour (bord d'écran iOS, bouton Android) ferme le plus haut
     d'abord : le menu ⋯, puis la feuille ouverte, puis la visionneuse.
     Enregistré sur le rail retour de l'index (même famille que
     __memoryPoneyRetour) ; retiré au démontage. */
  var retourRef = React.useRef({});
  retourRef.current = { menuOuvert: menuOuvert, enEdition: enEdition, choix: choix };
  React.useEffect(function () {
    if (typeof window === "undefined") return;
    window.__hsStoriesRetour = function () {
      try {
        var r = retourRef.current;
        if (r.menuOuvert) { setMenuOuvert(false); return true; }
        if (r.enEdition) { setEnEdition(false); pauseRef.current = false; setRelance(function (x) { return x + 1; }); return true; }
        if (r.choix) { setChoix(false); pauseRef.current = false; setRelance(function (x) { return x + 1; }); return true; }
        fermer();
        return true;
      } catch (e) { return false; }
    };
    return function () { try { delete window.__hsStoriesRetour; } catch (e) { window.__hsStoriesRetour = null; } };
  }, []);

  /* Le son suit la pause du minuteur : feuille ouverte ou doigt posé =
     musique suspendue, reprise au relâcher. Piloté par la boucle rAF. */
  function synchroniserSon() {
    try {
      var a = lecteurRef.current;
      if (!a) return;
      if (pauseRef.current && !a.paused) a.pause();
      else if (!pauseRef.current && a.paused && sonActifRef.current) a.play().catch(function () { });
    } catch (e) { }
  }
  var sonActifRef = React.useRef(false);
  React.useEffect(function () { sonActifRef.current = sonActif; }, [sonActif]);

  /* Coupure choisie : si le cavalier coupe le son, les stories suivantes ne
     redémarrent pas toutes seules — son choix tient jusqu'à ce qu'il rallume
     (comportement Instagram). */
  var coupureRef = React.useRef(false);

  function jouerMusique(ref) {
    var url = ref ? hsUrlMusique(ref) : null;
    if (!url || typeof Audio === "undefined") return false;
    var a = (typeof window !== "undefined" && window.__hsLecteur) ? window.__hsLecteur : new Audio();
    try {
      a.muted = false;
      a.loop = true;   /* l'extrait fait 30 s, une story jusqu'à 20 s : la boucle couvre tout */
      a.src = url;
      a.__hsJoue = true;
      lecteurRef.current = a;
      var p = a.play();
      if (p && p.catch) p.catch(function () { setSonActif(false); a.__hsJoue = false; });
      return true;
    } catch (e) { return false; }
  }
  function couperMusique() {
    try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (e) { }
  }

  function basculerSon() {
    try {
      if (sonActif) { couperMusique(); setSonActif(false); coupureRef.current = true; return; }
      coupureRef.current = false;
      if (jouerMusique(story && story.musique)) setSonActif(true);
    } catch (e) { }
  }

  /* LE DÉMARRAGE AUTOMATIQUE (13/08, demande de Blandine) : la musique part
     seule à l'arrivée de la photo, grâce au lecteur amorcé par le toucher
     d'ouverture. Trois conditions : la story a une musique, la photo est là,
     et le cavalier n'a pas coupé le son lui-même. Si iOS refuse, le catch de
     play() remet la pastille sur ♪ : un toucher la relance. */
  React.useEffect(function () {
    if (!chargee || erreur || estAlbum) return;
    var ref = story && story.musique;
    if (!ref || coupureRef.current) return;
    if (jouerMusique(ref)) setSonActif(true);
  }, [chargee, (story && story.id) || ""]);

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
      setIg(ig - 1);
      setIs(gp ? Math.max(0, gp.stories.length - 1) : 0);
    }
  }

  React.useEffect(function () { vivantRef.current = true; return function () { vivantRef.current = false; }; }, []);

  /* Changement de story : on remet à zéro l'état de chargement. Le marquage
     « vue » N'A PLUS LIEU ICI — il attend l'arrivée de l'image (114b) : une
     story jamais affichée ne doit pas être comptée comme vue. */
  React.useEffect(function () {
    setAction(null);
    setTagsStory([]);
    setChargee(false);
    setErreur(false);
    /* Sans cette remise a zero, la story suivante s'ouvrirait depliee ET le
       minuteur resterait en pause : la visionneuse se figerait. */
    setDeplie(false);
    setEnEdition(false);
    pauseRef.current = false;
    /* Le son ne survit pas au changement de story : chaque photo a le sien
       (ou n'en a pas). Le choix d'écoute reste à refaire — règle iOS : on ne
       relance jamais un son sans geste. */
    try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (eSn) { }
    setSonActif(false);
    if (!story) return;
    if (!estAlbum && story.photo_url && typeof hsTagsDeStory === "function") {
      hsTagsDeStory(story.photo_url).then(function (r) {
        if (!vivantRef.current) return;
        setTagsStory((r && r.data) || []);
      });
    }
  }, [(story && story.id) || ""]);

  /* Barre de progression + passage automatique.
     114b : ne démarre QUE quand l'image est arrivée (ou a échoué). Avant, la
     barre reste à zéro — elle dit la vérité. */
  React.useEffect(function () {
    if (!story) return;
    if (!chargee && !erreur) {
      try { if (barreRef.current) barreRef.current.style.width = "0%"; } catch (e0) { }
      return;
    }
    var duree = (typeof hsDureeStory === "function") ? hsDureeStory(story) : HS_DUREE_VUE_MS;
    var debut = Date.now(); var reste = duree; var raf = 0; var vivant = true;
    function boucle() {
      if (!vivant) return;
      synchroniserSon();
      if (pauseRef.current) {
        debut = Date.now() - (duree - reste);
        raf = requestAnimationFrame(boucle);
        return;
      }
      var ecoule = Date.now() - debut;
      reste = Math.max(0, duree - ecoule);
      var pct = Math.min(100, (ecoule / duree) * 100);
      try { if (barreRef.current) barreRef.current.style.width = pct + "%"; } catch (e) { }
      /* 13/08 03h58 (décision de Blandine) : PLUS AUCUNE AVANCE FORCÉE.
         « Il y a pas mal de texte à lire — on ne met pas de timer et on
         attend que la personne clique pour changer. » La barre se remplit
         encore, elle dit où on en est — mais arrivée au bout, RIEN ne bouge :
         la story attend le tap. C'est aussi ce qui faisait « sauter » la
         story 2 pendant qu'elle visait la pastille son : texte court, 6 s
         écoulées, avance au moment du geste. hsDureeStory ne sert plus qu'au
         rythme de remplissage de la barre. */
      if (pct >= 100) { vivant = false; return; }
      raf = requestAnimationFrame(boucle);
    }
    try { if (barreRef.current) barreRef.current.style.width = "0%"; } catch (e2) { }
    raf = requestAnimationFrame(boucle);
    return function () { vivant = false; if (raf) cancelAnimationFrame(raf); };
    /* 13/08 01h58 : `relance` redémarre le minuteur à zéro quand une feuille
       se ferme. Sans lui, il reprenait sur son RESTE d'avant la feuille :
       Blandine modifiait sa story, enregistrait, et les secondes restantes
       expiraient pendant sa relecture — dernière story, la visionneuse se
       fermait, elle était « sortie ». */
  }, [(story && story.id) || "", ig, is, chargee, erreur, relance]);

  async function garder(destination) {
    if (!story) return;
    var r = await hsGarderEnSouvenir(story, !!props.premium, destination);
    if (r && r.error === "quota") { setAction("quota"); return; }
    if (r && r.error) { setAction("echec"); return; }
    setNomRange((r && r.nom) || "");
    setAction("rangee");
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

  function toucheDebut(e) {
    try {
      /* Purge : si un glissé précédent n'a jamais reçu sa fin (touchend
         avalé, appel entrant…), la boîte repart d'une position saine. */
      if (boiteRef.current && boiteRef.current.style.transform && boiteRef.current.style.transform !== "translateY(0px)") boiteRef.current.style.transform = "translateY(0px)";
      /* 13/08 01h40 : une feuille ouverte (Modifier, Garder) = AUCUN glissé,
         même si une remontée tactile passait la ceinture des feuilles. */
      if (enEdition || choix || menuOuvert) { glisseRef.current.actif = false; return; }
      pauseRef.current = true;
      /* CORRECTIF DU 13/08 : le glissé de fermeture ne s'arme qu'à UN doigt.
         Avant, un pincement de zoom était pris pour un glissé — c'est le
         geste exact qui a fait planter la première story de Blandine. Deux
         doigts appartiennent à PhotoZoomHype, la boîte ne bouge pas. */
      if (e.touches && e.touches.length > 1) { glisseRef.current.actif = false; return; }
      var t = e.touches && e.touches[0];
      if (t) glisseRef.current = { y0: t.clientY, actif: true };
    } catch (er) { }
  }
  function toucheBouge(e) {
    try {
      if (enEdition || choix || menuOuvert) { glisseRef.current.actif = false; return; }
      if (e.touches && e.touches.length > 1) { glisseRef.current.actif = false; if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)"; return; }
      if (!glisseRef.current.actif) return;
      var t = e.touches && e.touches[0];
      if (!t) return;
      var dy = t.clientY - glisseRef.current.y0;
      if (dy > 0 && boiteRef.current) boiteRef.current.style.transform = "translateY(" + Math.min(dy, 260) + "px)";
    } catch (er) { }
  }
  function toucheFin(e) {
    try {
      if (enEdition || choix || menuOuvert) { glisseRef.current.actif = false; return; }
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
    quota: hsT("quota", lg), echec: hsT("echec", lg),
    rangee: hsT("rangee", lg) + (nomRange || ""),
    modifiee: hsT("modifiee", lg)
  };

  /* Les tags visibles : acceptés pour tout le monde ; en attente, seulement
     pour l'auteur de la story, avec la mention. */
  var tagsVisibles = (tagsStory || []).filter(function (t) {
    if (!t) return false;
    if (t.statut === "accepte") return true;
    return estMoi;
  });

  return portail(
    h("div", {
      ref: boiteRef,
      onTouchStart: toucheDebut, onTouchMove: toucheBouge, onTouchEnd: toucheFin, onTouchCancel: toucheFin,
      style: { position: "fixed", inset: 0, zIndex: 9300, background: "#060709", display: "flex", flexDirection: "column", transition: "transform 160ms ease-out" }
    },
      h("div", { style: { display: "flex", gap: 4, padding: "calc(env(safe-area-inset-top) + 12px) 14px 0" } },
        groupe.stories.map(function (s, i) {
          var fait = i < is;
          return h("div", { key: "pb" + i, style: { flex: 1, height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.2)", overflow: "hidden" } },
            i === is
              ? h("div", { ref: barreRef, style: { width: "0%", height: "100%", background: tnL } })
              : h("div", { style: { width: fait ? "100%" : "0%", height: "100%", background: "rgba(255,255,255,0.62)" } }));
        })),

      h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px" } },
        h("div", { style: { width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", border: "1px solid " + tA(0.5), background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
          groupe.avatar_url
            ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(groupe.avatar_url, 96, 96) : groupe.avatar_url, alt: "", onError: function (ev) { try { if (typeof replierVignette === "function") replierVignette(ev, groupe.avatar_url); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } })
            : h("span", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: tnL } }, String(groupe.pseudo || "?").charAt(0).toUpperCase())),
        h("div", { style: { minWidth: 0, flex: 1 } },
          h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, groupe.pseudo || "Cavalier"),
          h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
            hsTempsRelatif(story.created_at, lg) + (groupe.ecurie ? (" \u00b7 " + groupe.ecurie) : ""))),
        /* 13/08 (Blandine) : « rassemble tout dans le menu avec les ⋯ » —
           toutes les ACTIONS de la story vivent derrière ce bouton. La
           musique reste À PART sur la photo (sa parenthèse), la croix reste
           aussi : c'est de la navigation, pas une action. Les albums à la
           une n'ont pas d'actions : pas de ⋯. */
        (!estAlbum)
          ? h("button", {
            onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); setMenuOuvert(true); },
            onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
            "aria-label": "Actions",
            style: { width: 34, height: 34, borderRadius: "50%", flex: "0 0 auto", marginRight: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "#E4ECEF", fontSize: 17, lineHeight: "30px", cursor: "pointer", letterSpacing: 1 }
          }, "\u22ef")
          : null,
        h("button", { onClick: fermer, "aria-label": "Fermer", style: { width: 34, height: 34, borderRadius: "50%", flex: "0 0 auto", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "#E4ECEF", fontSize: 15, cursor: "pointer", fontFamily: M } }, "\u2715")),

      /* La photo, nue — et depuis la v5, JAMAIS en résolution d'origine.
         hsImageEcran() la demande à la taille de l'écran (transformation
         serveur, repli sur l'original si elle échoue). Le zoom au pincement
         est confié à PhotoZoomHype, le composant écrit après le crash de la
         session 92 : aucun état React pendant le geste, plafond de zoom
         calculé sur la densité de l'écran, couche GPU seulement pendant un
         zoom réel. 114b conservé : le chargement déclenche le minuteur. */
      h("div", { style: { flex: 1, position: "relative", minHeight: 0, background: "#060709", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" } },
        /* LE FOND IMMERSIF (13/08, spec de Blandine) : si l'AUTEUR l'a choisi,
           la même photo remplit l'écran derrière, en cover, fortement floutée
           et assombrie — la photo d'origine reste nette et ENTIÈRE devant
           (contain, comme toujours : jamais de recadrage). inset négatif +
           scale : le halo du flou ne laisse pas de bord clair. pointerEvents
           none et AUCUN zIndex : les zones (1) et la pastille (10) restent
           au-dessus. Une story sans fond garde le noir d'aujourd'hui. */
        (HS_FOND_IMMERSIF_ACTIF && story.fond === "immersif" && chargee && !erreur && !estAlbum)
          ? h("div", { "aria-hidden": true, style: { position: "absolute", inset: -24, backgroundImage: "url(\"" + hsImageEcran(story.photo_url) + "\")", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(26px) brightness(0.5) saturate(1.05)", transform: "scale(1.12)", pointerEvents: "none" } })
          : null,
        h("style", { dangerouslySetInnerHTML: { __html: "@keyframes hsResp{0%,100%{opacity:.28;transform:scale(.9)}50%{opacity:.85;transform:scale(1.06)}}" } }),
        (!chargee && !erreur)
          ? h("div", { style: { position: "absolute", width: 54, height: 54, borderRadius: "50%", border: "1px solid " + tA(0.5), boxShadow: "0 0 26px " + tA(0.3) + ", inset 0 0 20px " + tA(0.14), animation: "hsResp 1600ms ease-in-out infinite" } })
          : null,
        erreur
          ? h("div", { style: { position: "absolute", padding: "0 30px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#8A929C", lineHeight: 1.5 } }, hsT("photoIndispo", lg))
          : null,
        (typeof PhotoZoomHype === "function" && chargee && !erreur)
          ? h(PhotoZoomHype, { src: hsImageEcran(story.photo_url) })
          : null,
        /* La pastille son : n'apparaît que si la story porte une musique.
           JAMAIS d'autoplay (règle iOS) : c'est elle qu'on touche pour lancer
           la boucle, la retoucher coupe. Elle respire quand le son joue. */
        (story.musique && hsUrlMusique(story.musique))
          ? h("button", {
            onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); basculerSon(); },
            /* 13/08 13h22 : touchend NE DOIT PLUS etre stoppe ici. Un glissé
               armé sur la photo qui FINIT sur la pastille laissait la boîte
               coincée en pleine transformation (le reset vit dans toucheFin,
               qui ne recevait jamais la fin du toucher). touchstart reste
               stoppé : le glissé ne s'arme pas depuis la pastille. */
            onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
            style: {
              position: "absolute", right: 14, bottom: 14, zIndex: 10,
              display: "flex", alignItems: "center", gap: 8, padding: "11px 17px",
              borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700,
              border: "1px solid " + (sonActif ? tA(0.75) : "rgba(255,255,255,0.25)"),
              background: sonActif ? "rgba(32,217,245,0.14)" : "rgba(6,7,9,0.72)",
              color: sonActif ? tnL : "#DCE3E8",
              boxShadow: sonActif ? ("0 0 18px " + tA(0.3)) : "none",
              animation: sonActif ? "hsResp 2200ms ease-in-out infinite" : "none"
            }
          }, (sonActif ? "\u266b " : "\u266a ") + hsNomMusique(story.musique))
          : null,
        /* L'image de chargement : elle sert à déclencher onLoad/onError (le
           point de départ du minuteur, 114b) puis s'efface derrière
           PhotoZoomHype. Si PhotoZoomHype est absent (module chargé sans
           l'index), elle reste visible : rien ne casse. */
        h("img", {
          src: hsImageEcran(story.photo_url), alt: "", decoding: "async",
          onLoad: function () {
            setChargee(true);
            if (story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
            /* Préchargement de la suivante — RÉDUITE elle aussi. C'était l'un
               des deux étages du crash : la suivante descendait en pleine
               résolution pendant le décodage de la courante. */
            try {
              var svt = null;
              if (groupe && groupe.stories[is + 1]) svt = groupe.stories[is + 1];
              else if (groupes[ig + 1] && groupes[ig + 1].stories[0]) svt = groupes[ig + 1].stories[0];
              if (svt && svt.photo_url && typeof Image !== "undefined") {
                var pre = new Image();
                pre.decoding = "async";
                pre.src = hsImageEcran(svt.photo_url);
              }
            } catch (eP) { }
          },
          onError: function (ev) {
            /* Le repli existant de l'index : on repose l'original UNE fois
               (plan Free, format non géré, coupure), sans boucler. Si
               l'original échoue aussi, onError retombe ici avec __repli déjà
               posé, et on affiche « photo indisponible ». */
            try {
              var el = ev && (ev.currentTarget || ev.target);
              if (el && !el.__repli && typeof replierVignette === "function") { replierVignette(ev, story.photo_url); return; }
            } catch (eR) { }
            setErreur(true);
            if (story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
          },
          style: {
            maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block",
            opacity: (chargee && typeof PhotoZoomHype === "function") ? 0 : (chargee ? 1 : 0),
            position: (chargee && typeof PhotoZoomHype === "function") ? "absolute" : "static",
            pointerEvents: "none",
            transition: "opacity 220ms ease-out"
          }
        }),
        h("button", { onClick: function () { hsAmorcerAudio(); precedente(); }, "aria-label": "Pr\u00e9c\u00e9dente", style: { position: "absolute", left: 0, top: 0, bottom: 74, width: "32%", zIndex: 1, background: "transparent", border: "none", cursor: "pointer" } }, ""),
        /* 13/08 02h33 : les zones s'arretent A 74 px DU BAS de la photo — la
           pastille son leur echappe. Blandine visait « ♪ Hype Beat », la zone
           « suivante » prenait le tap : le son partait ET la story avancait,
           d'ou « ca nous sort de force ». */
        h("button", { onClick: function () { hsAmorcerAudio(); suivante(); }, "aria-label": "Suivante", style: { position: "absolute", right: 0, top: 0, bottom: 74, width: "48%", zIndex: 1, background: "transparent", border: "none", cursor: "pointer" } }, "")),

      h("div", { style: { padding: "12px 14px calc(env(safe-area-inset-bottom) + 14px)", background: "linear-gradient(180deg, rgba(17,20,23,0.9), #060709)", borderTop: "1px solid rgba(255,255,255,0.07)" } },
        story.lieu
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, fontWeight: 700, color: tnL, marginBottom: 8, letterSpacing: 0.3 } }, "\uD83D\uDCCD " + story.lieu)
          : null,
        story.legende
          ? (function () {
            /* Le texte s'affiche TEL QUE l'auteur l'a écrit ; seules les
               mentions ACCEPTÉES deviennent des liens turquoise (décision de
               Blandine). Au-delà de HS_LEGENDE_REPLI caractères, le texte est
               replié sur 3 lignes derrière un « voir plus » qui MET LE
               MINUTEUR EN PAUSE — sinon la story défilerait pendant la
               lecture, ce qui est exactement le défaut corrigé en 114b. */
            var longue = String(story.legende).length > HS_LEGENDE_REPLI;
            var replie = longue && !deplie;
            var morceaux = (typeof hsDecouperLegende === "function") ? hsDecouperLegende(story.legende, tagsStory) : [{ texte: story.legende }];
            return h("div", { style: { marginBottom: 10 } },
              h("div", {
                style: Object.assign(
                  { fontSize: 13.5, lineHeight: 1.55, fontFamily: M, color: "#DCE3E8", whiteSpace: "pre-line", wordBreak: "break-word" },
                  replie ? { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } : {})
              },
                morceaux.map(function (mo, i) {
                  if (mo.texte !== undefined) return h("span", { key: "lg" + i }, mo.texte);
                  if (mo.tag && mo.tag.cible_id && mo.tag.type === "cavalier") {
                    return h("span", {
                      key: "lg" + i,
                      onClick: function (ev) {
                        if (ev && ev.stopPropagation) ev.stopPropagation();
                        /* Meme mecanisme que ouvrirProfilPublic() de la page
                           Communaute : on ne reinvente pas la navigation. */
                        try {
                          if (typeof window !== "undefined") {
                            window.__cavalierPublic = { id: mo.tag.cible_id, pseudo: mo.tag.cible_nom || "", photo: null, ecurie: "", club: "", ville: "" };
                            window.__cavalierOuvert = "__public";
                          }
                        } catch (e) { }
                        fermer();
                        try { if (ctxV && ctxV.setEcran) ctxV.setEcran("cavalier"); } catch (e2) { }
                      },
                      style: { color: tn, fontWeight: 700, cursor: "pointer" }
                    }, mo.mention);
                  }
                  /* En attente ou cavalier inconnu : le texte reste, sans lien. */
                  return h("span", { key: "lg" + i }, mo.mention);
                })),
              longue
                ? h("button", {
                  onClick: function () {
                    var v = !deplie;
                    setDeplie(v);
                    pauseRef.current = v;   /* déplié = minuteur en pause */
                  },
                  style: { marginTop: 6, background: "none", border: "none", padding: 0, color: tnL, fontSize: 11.5, fontWeight: 700, fontFamily: M, cursor: "pointer" }
                }, deplie ? hsT("voirMoins", lg) : hsT("voirPlus", lg))
                : null);
          })()
          : null,
        tagsVisibles.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 11 } },
            tagsVisibles.map(function (t, i) {
              var attente = (t.statut !== "accepte");
              return h("span", {
                key: "tv" + i,
                style: { padding: "5px 11px", borderRadius: 999, fontSize: 11, fontFamily: M, fontWeight: 700, border: "1px solid " + (attente ? "rgba(255,255,255,0.18)" : tA(0.5)), color: attente ? "#8A929C" : tn, background: attente ? "transparent" : "rgba(32,217,245,0.08)" }
              }, (t.type === "cheval" ? "\uD83D\uDC0E " : "") + (t.cible_nom || "?") + (attente ? (" \u00b7 " + hsT("enAttente", lg)) : ""));
            }))
          : null,
        action
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: tnL, marginBottom: 10, lineHeight: 1.45 } }, messages[action] || "")
          : null,
        /* 13/08 : la rangee de boutons a REJOINT le menu ⋯ de l'en-tete
           (demande de Blandine). AUCUNE fonction supprimee : Garder en
           souvenir, Modifier, Supprimer (proprietaire) et Signaler
           (visiteur) vivent dans la feuille du menu, memes handlers. */
        null),

    /* LA FEUILLE DU MENU ⋯ : toutes les actions de la story, memes
       permissions qu'avant (garder/modifier/supprimer = proprietaire,
       signaler = visiteur). Ceinture tactile comme les autres feuilles. */
    menuOuvert
      ? h("div", {
        onClick: function () { setMenuOuvert(false); },
        onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchMove: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchEnd: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        style: { position: "fixed", inset: 0, zIndex: 9400, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
      },
        h("div", {
          onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
          style: { width: "100%", boxSizing: "border-box", maxWidth: 520, borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "10px 16px calc(env(safe-area-inset-bottom) + 14px)" }
        },
          h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.22)", margin: "4px auto 12px" } }),
          (estMoi ? [
            { ic: "\u2726", txt: (story.garde || action === "rangee") ? hsT("gardee", lg) : hsT("garder", lg), on: function () { setMenuOuvert(false); pauseRef.current = true; setChoix(true); }, accent: true },
            { ic: "\u270e", txt: hsT("modifier", lg), on: function () { setMenuOuvert(false); pauseRef.current = true; setEnEdition(true); } },
            { ic: "", txt: hsT("supprimer", lg), on: function () { setMenuOuvert(false); supprimer(); } }
          ] : [
            { ic: "", txt: hsT("signaler", lg), on: function () { setMenuOuvert(false); signaler(); } }
          ]).map(function (it, i) {
            return h("button", {
              key: "mn" + i,
              onClick: it.on,
              style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "14px 10px", borderRadius: 12, border: "none", background: "transparent", color: it.accent ? tn : "#DCE3E8", fontSize: 13.5, fontWeight: it.accent ? 700 : 600, fontFamily: M, cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)" }
            }, (it.ic ? it.ic + "  " : "") + it.txt);
          })))
      : null,

    /* La feuille de modification met le minuteur en pause, comme le choix
       d'a la une : on ne defile pas pendant qu'on ecrit. */
    enEdition
      ? h(ModifierStory, {
        story: story, langue: lg,
        onFermer: function () { setEnEdition(false); pauseRef.current = false; setRelance(function (r) { return r + 1; }); },
        onEchec: function () { setEnEdition(false); pauseRef.current = false; setRelance(function (r) { return r + 1; }); setAction("echec"); },
        onFait: function (mod) {
          setEnEdition(false); pauseRef.current = false;
          setLocalMod({ id: story.id, legende: mod.legende, lieu: mod.lieu, musique: mod.musique, fond: mod.fond });
          setRelance(function (r) { return r + 1; });
          setAction("modifiee");
        }
      })
      : null,

    /* La feuille de choix de l'à la une. Elle met le minuteur en pause : sans
       ça, la story défilerait pendant qu'on choisit sa destination. */
    choix
      ? h(ChoixALaUne, {
        langue: lg,
        onFermer: function () { setChoix(false); pauseRef.current = false; setRelance(function (r) { return r + 1; }); },
        onChoix: function (dest) { setChoix(false); pauseRef.current = false; setRelance(function (r) { return r + 1; }); garder(dest); }
      })
      : null),
    document.body);
}

try {
  if (typeof window !== "undefined") {
    window.BandeauStories = BandeauStories;
    window.RailALaUne = RailALaUne;
    window.PastilleMusiquePage = PastilleMusiquePage;
    window.ChoixALaUne = ChoixALaUne;
    window.ModifierStory = ModifierStory;
    window.VisionneuseStories = VisionneuseStories;
    window.ComposeurStory = ComposeurStory;
  }
} catch (eW2) { }
