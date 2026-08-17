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

var HYPE_STORIES_VERSION = "19av";
try { if (typeof window !== "undefined") window.HYPE_STORIES_VERSION = HYPE_STORIES_VERSION; } catch (eV) { }

/* 19ae — Les décors portant du TEXTE FRANÇAIS en dur dans l'image.
   Ils restent au catalogue et ne sont proposés qu'aux cavaliers en français.
   ⚠️ À COMPLÉTER à chaque nouveau décor comportant du texte. */
var HS_DECORS_TEXTE_FR = ["modele-concours-2", "modele-concours-3", "modele-concours-4"];

/* ---------------------------------------------------------------------------
   DURÉE DE VIE D'UNE STORY — 19an (15/08, décisions de Blandine)

   ⚠️ `HS_JOURS` EST UN SOCLE TEMPORAIRE, ET ELLE L'A DIT AINSI. Mot exact :
   « temporaire ». Sept jours tiennent tant que le rail est vide ; le jour où
   il y aura du monde, la question du resserrement reviendra.

   ⚠️ MAIS RETIRER DES JOURS À DES GENS QUI LES AVAIENT SE PAIE TOUJOURS,
   même annoncé, même justifié. Les trois sorties possibles, dans l'ordre où
   je les recommande :
     1. NE PAS DESCENDRE. Maîtriser le stockage par le POIDS des images
        plutôt que par la durée — c'est le vrai levier (l'`index.html` de
        9 Mo coûte déjà plus que toutes les stories réunies).
     2. Descendre pour les NOUVELLES ARRIVANTES seulement. Personne ne perd
        rien, mais deux règles cohabitent et ça se voit entre cavalières.
     3. Descendre pour tout le monde. Le plus simple, le plus mal vécu.

   Baisser le socle = CE CHIFFRE, et rien d'autre. Les stories déjà publiées
   gardent leur `expire_le` : aucune migration, aucun risque rétroactif. */
var HS_JOURS = 7;
var HS_DUREE_MS = HS_JOURS * 24 * 60 * 60 * 1000;
/* Le mois, réservé Premium (décision de Blandine : « le socle gratuit,
   l'ambition payante »). C'est le SECOND et DERNIER verrou de ce module —
   les décors sont déjà Premium, et au-delà la story cesse d'être la vitrine
   qui fait venir les gens pour devenir une caisse. */
var HS_JOURS_LONG = 30;
var HS_DUREE_LONG_MS = HS_JOURS_LONG * 24 * 60 * 60 * 1000;

/* Ce qu'il reste à vivre à une story, écrit pour son AUTEUR seul.
   Choix de Blandine sur maquette (rangées 1 et 3) : « encore 5 jours », qui
   bascule en « dernier jour » doré sur la fin. Jamais de date exacte. */
function hsResteAVivre(expireLe, lg) {
  try {
    if (!expireLe) return null;
    var ms = new Date(expireLe).getTime() - Date.now();
    if (!isFinite(ms) || ms <= 0) return null;
    var jours = Math.ceil(ms / (24 * 60 * 60 * 1000));
    if (jours <= 1) return { texte: hsT("dernierJour", lg), chaud: true };
    return { texte: hsT("encoreJours", lg).replace("{n}", String(jours)), chaud: false };
  } catch (e) { return null; }
}
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
var HS_TAILLE_ROND = 132;
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
/* 19s (14/08, decisions de Blandine) : « il ne faut pas que ca parte l'une
   apres l'autre, jamais » et « ok pour 5 ». Le plafond descend de 10 a 5 :
   c'est le nombre maximum de fenetres d'un decor (modele-26). Au-dela, il n'y
   avait aucun decor a proposer et les photos partaient en stories separees —
   ce qui lui a coute sa nuit. On previent AVANT, on ne decoupe plus APRES. */
var HS_MULTI_MAX = 5;
/* 13/08 15h24 (demande de Blandine) : FOND IMMERSIF DESACTIVE. Sa capture
   montrait le calque floute SEUL, la photo nette absente au lieu de rester
   devant — retire en attendant un vrai diagnostic sur telephone. Pattern
   projet : une constante, rien n'est supprime. La colonne `fond` reste en
   base et le contrat de donnees la porte toujours ; une story marquee
   "immersif" s'affiche simplement sur fond noir tant que c'est eteint. */
/* 19c (14/08) : RALLUME, apres diagnostic. Il n'etait pas casse au hasard :
   le calque floute est en position:absolute avec un filter (donc positionne),
   tandis que la photo nette de PhotoZoomHype est un <img> NON positionne — le
   flou se peignait par-dessus, d'ou la capture du 13/08 « le flou seul, la
   photo absente ». La photo nette a desormais sa propre couche (zIndex 1) et
   le flou est servi depuis une VIGNETTE de 220 px : a ce niveau de flou
   personne ne voit la difference, et le calque rasterise devient minuscule. */
var HS_FOND_IMMERSIF_ACTIF = true;
/* 13/08 (decision de Blandine) : LA STORY COMPOSEE — « la journee se deplie
   avec tous ses bons souvenirs, meme des annees plus tard ». Un groupe de 2 a
   5 photos publiees ENSEMBLE, une disposition (« hd » : la grande en haut, le
   texte suspendu, la table de tirages dessous). INERTE tant que la visionneuse
   ne sait pas l'afficher : la constante s'allumera avec elle. */
var HS_COMPO_ACTIF = true;
/* Le catalogue des MODELES (decors a fenetres) vit dans hype-modeles-db.js,
   pousse a la racine avec les webp. Garde : sans le fichier, zero modele,
   l'app vit tres bien. hsModelesPourN(n) = les modeles a exactement n
   fenetres, pour filtrer le choix au composeur. */
function hsModeles() { try { return (typeof window !== "undefined" && window.HYPE_MODELES) || {}; } catch (e) { return {}; } }
/* 19g (14/08, decision de Blandine : « On montre tout je pense ») — TOUT LE
   CATALOGUE, TOUJOURS. Un decor n'apparaissait que s'il avait exactement
   autant de fenetres que de photos choisies : la moitie de la collection
   semblait avoir disparu. Desormais on montre tout, les compatibles en tete,
   les autres grises avec leur nombre de photos. */
function hsTousModeles(n) {
  try {
    var d = hsModeles();
    return Object.keys(d).filter(function (k) { return d[k] && d[k].fenetres && d[k].fenetres.length; }).sort(function (a, b) {
      var na = d[a].fenetres.length, nb = d[b].fenetres.length;
      if ((na === n) !== (nb === n)) return na === n ? -1 : 1;   /* compatibles d'abord */
      if (na !== nb) return na - nb;
      return a < b ? -1 : 1;
    });
  } catch (e) { return []; }
}
/* ---------------------------------------------------------------------------
   19ai (15/08, mots de Blandine) — LA FENETRE PREND LA FORME DE LA PHOTO.
   « je te mets deux photos horizontales tu me sors deux encarts verticaux ».
   Elle avait raison et ce n'etait pas de la malchance : la disposition H+D
   avait sa geometrie ECRITE EN DUR — le tirage en `3 / 4` (aux DEUX endroits,
   l'apercu du composeur et la story publiee) et la grande a 58 % de hauteur,
   les photos etirees en `cover` dedans. Le H+D n'est pas un `modele-*` : ni
   le classement par forme de la 19ab, ni l'affectation de la 19ag, ni la
   photo entiere sur son flou de la 19af ne l'atteignaient. Deux photos
   couchees donnaient donc mecaniquement deux fenetres debout, a chaque fois.

   `hsCadreForme` mesure la photo AU RENDU (`naturalWidth/naturalHeight`, ce
   que le navigateur connait deja) et donne au cadre le rapport de la photo.
   Aucun etat a faire circuler, aucune plomberie entre le composeur et la
   visionneuse : les deux appellent la meme chose, donc l'apercu montre
   VRAIMENT ce qui sera publie.
   `base` = le rapport avant mesure (evite le sursaut au chargement).
   `borne` = [min, max] facultatif, pour qu'une photo tres allongee ne mange
   pas tout l'ecran.
--------------------------------------------------------------------------- */
function hsCadreForme(props) {
  var h = React.createElement;
  var rS = React.useState(null), r = rS[0], setR = rS[1];
  var base = (typeof props.base === "number" && props.base > 0) ? props.base : 1;
  var val = (typeof r === "number" && isFinite(r) && r > 0) ? r : base;
  try {
    if (props.borne && props.borne.length === 2) {
      if (val < props.borne[0]) val = props.borne[0];
      if (val > props.borne[1]) val = props.borne[1];
    }
  } catch (eB) { }
  var st = Object.assign({}, props.style || {}, { aspectRatio: String(val) });
  return h("div", { style: st },
    props.src
      ? h("img", {
        src: props.src, alt: "", decoding: "async",
        onLoad: function (ev) {
          try {
            var im = ev && ev.target;
            if (!im || !im.naturalWidth || !im.naturalHeight) return;
            var nr = im.naturalWidth / im.naturalHeight;
            if (isFinite(nr) && nr > 0) setR(nr);
          } catch (eL) { }
        },
        onError: function (ev) { try { if (ev && ev.target) ev.target.style.visibility = "hidden"; } catch (eE) { } },
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "inherit" }
      })
      : null);
}
/* 19ai — la meme chose, mais TOUCHABLE : c'est la version que la story
   publiee utilise, puisque chaque photo d'une composition s'ouvre en plein
   ecran d'un toucher. Les cinq gardes de la 19h sont conservees telles
   quelles — sans elles, le toucher d'une photo FERME la story. */
/* ---------------------------------------------------------------------------
   19ak — LA PASTILLE CŒUR de la visionneuse.
   OÙ ELLE VIT, ET POURQUOI LÀ (question de Blandine : « le cœur peut pas être
   mis en dessous de ça, on a pas tout cassé ? » — si, et c'est la bonne
   façon) : les deux zones transparentes qui font avancer et reculer la story
   s'arrêtent à 74 px du bas (`bottom: 74`). Une pastille posée à 14 px du bas
   est donc SOUS elles : elle répond au doigt sans qu'on touche à la
   navigation. C'est exactement où vit déjà la pastille musique, à droite ;
   le cœur prend la gauche.
   ⚠️ NE PAS la remonter au-dessus de 74 px sans réduire les zones : elle
   deviendrait un bouton « story suivante » déguisé.
   Le compteur est optimiste — il bouge au doigt, la base suit ; si l'écriture
   échoue, on relit et l'affichage se remet d'aplomb.
--------------------------------------------------------------------------- */
function CoeurStory(props) {
  var h = React.createElement;
  var M = "'Montserrat',sans-serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal;
  var etS = React.useState({ count: 0, jaiLike: false }), et = etS[0], setEt = etS[1];
  var occupeRef = React.useRef(false);

  function relire() {
    if (!props.storyId) return;
    hsChargerLikesStory(props.storyId).then(function (r) {
      setEt({ count: (r && r.count) || 0, jaiLike: !!(r && r.jaiLike) });
    }).catch(function () { setEt({ count: 0, jaiLike: false }); });
  }
  React.useEffect(function () { setEt({ count: 0, jaiLike: false }); relire(); }, [props.storyId]);

  async function basculer() {
    if (!props.storyId || occupeRef.current) return;
    occupeRef.current = true;
    var avant = et;
    setEt({ count: Math.max(0, avant.count + (avant.jaiLike ? -1 : 1)), jaiLike: !avant.jaiLike });
    var r = await hsBasculerLikeStory(props.storyId, avant.jaiLike);
    occupeRef.current = false;
    if (r && r.error) relire();
  }

  return h("button", {
    onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); basculer(); },
    /* Même règle que la pastille musique (13/08) : on arrête `touchstart`
       pour que le glissé ne s'arme pas ici, mais JAMAIS `touchend` — sinon un
       glissé parti de la photo et fini sur la pastille laisse la boîte
       coincée en pleine transformation. */
    onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
    "aria-label": hsT("jaime", props.langue || "fr"),
    style: {
      position: "absolute", left: 14, bottom: 14, zIndex: 10,
      display: "flex", alignItems: "center", gap: 7, padding: "11px 16px",
      borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12.5, fontWeight: 700,
      border: "1px solid " + (et.jaiLike ? "rgba(240,92,116,0.85)" : "rgba(255,255,255,0.25)"),
      background: et.jaiLike ? "rgba(240,92,116,0.16)" : "rgba(6,7,9,0.72)",
      color: et.jaiLike ? "#F05C74" : "#DCE3E8",
      boxShadow: et.jaiLike ? "0 0 18px rgba(240,92,116,0.3)" : "none",
      transition: "background 160ms ease-out, border-color 160ms ease-out"
    }
  },
    h("span", { style: { fontSize: 15, lineHeight: 1 } }, et.jaiLike ? "\u2665" : "\u2661"),
    et.count > 0 ? h("span", null, String(et.count)) : null);
}

function hsBoutonForme(props) {
  var h = React.createElement;
  var rS = React.useState(null), r = rS[0], setR = rS[1];
  var base = (typeof props.base === "number" && props.base > 0) ? props.base : 1;
  var val = (typeof r === "number" && isFinite(r) && r > 0) ? r : base;
  try {
    if (props.borne && props.borne.length === 2) {
      if (val < props.borne[0]) val = props.borne[0];
      if (val > props.borne[1]) val = props.borne[1];
    }
  } catch (eB) { }
  var st = Object.assign({ padding: 0, border: "none", background: "none", cursor: "pointer" }, props.style || {}, { aspectRatio: String(val) });
  return h("button", {
    onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); if (props.onOuvrir) props.onOuvrir(); },
    onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
    onTouchEnd: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
    onPointerDown: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
    onPointerUp: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
    style: st
  },
    h("img", {
      src: props.src, alt: "", decoding: "async",
      onLoad: function (ev) {
        try {
          var im = ev && ev.target;
          if (!im || !im.naturalWidth || !im.naturalHeight) return;
          var nr = im.naturalWidth / im.naturalHeight;
          if (isFinite(nr) && nr > 0) setR(nr);
        } catch (eL) { }
      },
      style: { width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "inherit" }
    }));
}
function hsFenetresDe(ref) {
  try { var m = hsModeles()[ref]; return (m && m.fenetres) ? m.fenetres.length : 0; } catch (e) { return 0; }
}
function hsModelesPourN(n) {
  try {
    var d = hsModeles();
    return Object.keys(d).filter(function (k) { return d[k] && d[k].fenetres && d[k].fenetres.length === n; }).sort();
  } catch (e) { return []; }
}
/* 19ab (14/08, demande de Blandine : « l'appli ne reconnait toujours pas la
   forme des photos ») — L'ACCORD DES FORMES.
   Jusqu'ici l'appli ignorait TOTALEMENT si une photo etait couchee ou debout :
   la photo n° 1 allait dans la fenetre n° 1 et se faisait couper au format de
   celle-ci, d'ou « je mets deux photos horizontales, il met la deuxieme en
   vertical de force en decoupant tout ».
   `hsPertePhoto` = la part de la photo PERDUE si on la fait remplir une
   fenetre de ce format. Deux formes identiques : 0. Une photo couchee dans
   une fenetre debout : proche de 1.
   ⚠️ Cette mesure NE DEPLACE AUCUNE PHOTO. Decision de Blandine du 14/08 :
   « l'ordre decide, je corrige a la main ». La photo n° 1 reste dans la
   fenetre n° 1 ; ce sont les DECORS qui sont classes, du plus respectueux au
   plus destructeur. Le jour ou le geste a la main sera ecrit, il s'appuiera
   sur la meme mesure. */
/* 19af — LE SEUIL DE LA COUPE. En dessous, la photo remplit sa fenetre
   (on perd peu). Au-dessus — photo couchee dans une fenetre debout, ou
   l'inverse — la photo entre ENTIERE et le vide est comble par son propre
   flou, le fond immersif que Blandine a valide pour les paysages.
   Feu vert du 15/08 : « tu devais le coder pour que l'appli reconnaisse le
   format de la photo et s'adapte ». Plus JAMAIS de coupe de force.
   0,30 = un carre dans du 4:5 est encore rempli (perte 0,2), un 4:3 dans du
   3:4 passe entier (perte 0,44). Ajustable ici, a un seul endroit. */
var HS_SEUIL_COUPE = 0.30;
function hsPertePhoto(rPhoto, rFenetre) {
  try {
    if (!rPhoto || !rFenetre || !isFinite(rPhoto) || !isFinite(rFenetre)) return 0;
    var a = Math.min(rPhoto, rFenetre), b = Math.max(rPhoto, rFenetre);
    if (b <= 0) return 0;
    return 1 - (a / b);
  } catch (e) { return 0; }
}
/* 19ag (15/08) — LA FORME DECIDE DE L'AFFECTATION. Mots de Blandine :
   « adapte ton encart !!! Ta photo est debout, ben mets un encart vertical ».
   ⚠️ RENVERSEMENT EXPLICITE de sa decision du 14/08 (« l'ordre decide, je
   corrige a la main ») — acte, sur ses mots du 15/08.
   Pour un decor donne, on essaie TOUTES les repartitions photos->fenetres
   (5 photos au plus = 120 combinaisons, instantane) et on garde celle qui
   coupe le moins. La photo debout va dans la fenetre debout. En cas
   d'egalite parfaite, l'ordre de Blandine est conserve (l'identite est
   generee en premier et gagne les ex aequo). Elle peut toujours echanger a
   la main dans l'ecran plein format ensuite. */
function hsMeilleureAffectation(ref, formes) {
  try {
    var m = hsModeles()[ref];
    if (!m || !m.fenetres || !m.fenetres.length) return null;
    var n = m.fenetres.length;
    if (!formes || formes.length !== n || n > 6) return null;
    if (!formes.some(function (r) { return typeof r === "number"; })) return null;
    var rf = m.fenetres.map(function (f) {
      return (f && f.bbox && f.bbox[3]) ? (f.bbox[2] / f.bbox[3]) : 1;
    });
    var idx = []; for (var q = 0; q < n; q++) idx.push(q);
    var meilleur = null, coutMin = Infinity;
    (function gen(cur, reste) {
      if (!reste.length) {
        var c = 0;
        for (var i = 0; i < n; i++) {
          var r = formes[cur[i]];
          if (typeof r === "number") c += hsPertePhoto(r, rf[i]);
        }
        if (c < coutMin - 1e-9) { coutMin = c; meilleur = cur.slice(); }
        return;
      }
      for (var j = 0; j < reste.length; j++) {
        gen(cur.concat(reste[j]), reste.slice(0, j).concat(reste.slice(j + 1)));
      }
    })([], idx);
    return meilleur;
  } catch (e) { return null; }
}

/* La perte MOYENNE d'un decor pour une serie de photos donnee, dans l'ordre.
   `formes` = [ratio photo 1, ratio photo 2, ...], null quand la mesure n'est
   pas encore arrivee (on ne penalise pas ce qu'on ne connait pas). */
function hsAccordModele(ref, formes) {
  try {
    var m = hsModeles()[ref];
    if (!m || !m.fenetres || !m.fenetres.length) return 1;
    var tot = 0, n = 0;
    for (var i = 0; i < m.fenetres.length; i++) {
      var r = (formes && typeof formes[i] === "number") ? formes[i] : null;
      if (r === null) continue;
      var f = m.fenetres[i];
      var rf = (f && f.bbox && f.bbox[3]) ? (f.bbox[2] / f.bbox[3]) : 1;
      tot += hsPertePhoto(r, rf); n++;
    }
    return n ? (tot / n) : 0;
  } catch (e) { return 1; }
}
var HS_COMPO_MAX = 5;
function hsUuid() {
  try { if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID(); } catch (e) { }
  return "g" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
/* Pure : replie les lignes d'un meme groupe en UNE story (la couverture porte
   `compo` = toutes les photos dans l'ordre). Les stories seules ne bougent pas. */
function hsRegrouperCompos(stories) {
  try {
    var parGroupe = {}; var resultat = [];
    (stories || []).forEach(function (st) {
      var gid = st && st.groupe;
      if (!gid) { resultat.push(st); return; }
      var e = parGroupe[gid];
      if (!e) { e = { membres: [] }; parGroupe[gid] = e; resultat.push(e); }
      e.membres.push(st);
    });
    return resultat.map(function (e) {
      if (!e || !e.membres) return e;
      var m = e.membres.slice().sort(function (a, b) { return String(a.created_at) < String(b.created_at) ? -1 : 1; });
      var couv = m.filter(function (x) { return x && x.disposition; })[0] || m[0];
      var st2 = Object.assign({}, couv, { compo: m, disposition: couv.disposition || "hd" });
      return st2;
    }).filter(function (x) { return !!x; });
  } catch (e) { return stories || []; }
}
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
   19b (14/08) — LA VIGNETTE FABRIQUÉE AU CANVAS. LE CORRECTIF DU PLANTAGE.
   Diagnostic : le composeur affichait chaque fichier CHOISI en <img src=
   objectURL> — 52x68 à l'écran, mais Safari décodait les 12 Mpx du fichier
   d'origine. Cinq photos d'iPhone = plusieurs centaines de mégaoctets de
   bitmaps, l'aperçu en décodait une sixième en pleine résolution, et en mode
   ajout la visionneuse restait montée dessous. iOS fermait l'onglet : « je me
   fais sortir à chaque fois avant la fin » (Blandine, 14/08).
   Ici : on décode UNE image à la fois, on la réduit au canvas, on relâche
   aussitôt l'original (revokeObjectURL + src vidé) et on ne garde qu'une
   petite image. Le canvas est ramené à 1x1 : sa mémoire part avec lui. */
/* 19ab (14/08) — TROISIEME ARGUMENT `infos` : un objet que la fonction
   REMPLIT avec les dimensions naturelles de la photo (`{ L: , H: , r: }`).
   La photo est deja decodee ici pour fabriquer la vignette : ses
   `naturalWidth/Height` etaient simplement jetes. Les recuperer ne coute
   AUCUN decodage, AUCUNE memoire — point capital apres les fermetures
   d'appli des sessions 141-142.
   C'est ce qui permet enfin de savoir qu'une photo est COUCHEE ou DEBOUT.
   Argument facultatif : les autres appels du fichier ne bougent pas. */
function hsVignetteFichier(fichier, cote, infos) {
  return new Promise(function (resolve) {
    try {
      if (!fichier || typeof window === "undefined" || !window.URL || !window.URL.createObjectURL) { resolve(null); return; }
      var brut = window.URL.createObjectURL(fichier);
      var img = new Image();
      var fini = false;
      function terminer(u) {
        if (fini) return; fini = true;
        try { img.src = ""; } catch (e1) { }
        try { window.URL.revokeObjectURL(brut); } catch (e2) { }
        resolve(u);
      }
      img.decoding = "async";
      img.onload = function () {
        try {
          var L = img.naturalWidth || 1, H = img.naturalHeight || 1;
          try { if (infos) { infos.L = L; infos.H = H; infos.r = L / H; } } catch (eI) { }
          var f = Math.min(1, cote / Math.max(L, H));
          var c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(L * f));
          c.height = Math.max(1, Math.round(H * f));
          var ctx = c.getContext("2d");
          ctx.drawImage(img, 0, 0, c.width, c.height);
          if (c.toBlob) {
            c.toBlob(function (b) {
              var u = null;
              try { u = b ? window.URL.createObjectURL(b) : null; } catch (eB) { u = null; }
              try { c.width = 1; c.height = 1; } catch (eC) { }
              terminer(u);
            }, "image/jpeg", 0.82);
          } else {
            var d = null;
            try { d = c.toDataURL("image/jpeg", 0.82); } catch (eD) { d = null; }
            try { c.width = 1; c.height = 1; } catch (eC2) { }
            terminer(d);
          }
        } catch (e) { terminer(null); }
      };
      img.onerror = function () { terminer(null); };
      img.src = brut;
    } catch (e) { resolve(null); }
  });
}
/* ---------------------------------------------------------------------------
   19c (14/08, choix de Blandine : « recadrer a l'envoi, sans SQL ») — LE
   CADRAGE. Une photo paysage tient dans un ecran debout en bande de 4 cm ; ici
   on la remplit, et l'auteur choisit AU DOIGT la bande verticale qu'il garde.
   CONSEQUENCE ASSUMEE ET DITE A L'ECRAN : ce qui sort du cadre est perdu, le
   fichier envoye est refabrique au canvas (2000 px de haut au plus, qualite
   0,9) — ce n'est plus le fichier d'origine de l'iPhone.
   `cx` = centre horizontal voulu, de 0 (bord gauche) a 1 (bord droit). */
var HS_CADRE_RATIO = 9 / 16;
var HS_CADRE_HMAX = 2000;
/* 19ac (15/08) — CINQUIEME ARGUMENT `zoom`. L'editeur plein ecran permet de
   GROSSIR une photo dans sa fenetre : a la publication, grossir revient a
   prendre une zone SOURCE plus petite avant de la redessiner a la meme
   taille. `zoom` = 1 : comportement d'avant, inchange. */
function hsRecadrerFichier(fichier, cx, ratioVoulu, cy, zoom) {
  return new Promise(function (resolve) {
    try {
      if (!fichier || typeof window === "undefined" || !window.URL) { resolve(fichier); return; }
      var brut = window.URL.createObjectURL(fichier);
      var img = new Image();
      var fini = false;
      function terminer(r) {
        if (fini) return; fini = true;
        try { img.src = ""; } catch (e1) { }
        try { window.URL.revokeObjectURL(brut); } catch (e2) { }
        resolve(r || fichier);   /* le moindre pepin : on envoie l'original */
      }
      img.decoding = "async";
      img.onload = function () {
        try {
          var L = img.naturalWidth || 1, H = img.naturalHeight || 1;
          /* 19r : le ratio peut etre celui d'une FENETRE de decor (rond,
             arche, bande) et non plus seulement le 9/16 de l'ecran. On coupe
             alors dans la largeur OU dans la hauteur, selon l'exces. */
          var R = (typeof ratioVoulu === "number" && ratioVoulu > 0) ? ratioVoulu : HS_CADRE_RATIO;
          var centre = Math.max(0, Math.min(1, (typeof cx === "number" ? cx : 0.5)));
          var centreV = Math.max(0, Math.min(1, (typeof cy === "number" ? cy : 0.5)));
          var sw, sh, sx, sy;
          if (L / H > R) { sh = H; sw = H * R; }
          else if (L / H < R) { sw = L; sh = L / R; }
          else { sw = L; sh = H; }
          /* 19ac : le zoom retrecit la zone prise dans la photo d'origine.
             Borne haute a 4 : au-dela on redessinerait de la bouillie. */
          var z = (typeof zoom === "number" && zoom > 1) ? Math.min(4, zoom) : 1;
          if (z > 1) { sw = sw / z; sh = sh / z; }
          if (sw >= L && sh >= H && z === 1) { terminer(fichier); return; }
          sx = Math.max(0, Math.min(L - sw, centre * L - sw / 2));
          sy = Math.max(0, Math.min(H - sh, centreV * H - sh / 2));
          var hs = Math.min(sh, HS_CADRE_HMAX);
          var c = document.createElement("canvas");
          c.height = Math.round(hs);
          c.width = Math.round(hs * R);
          var ctx = c.getContext("2d");
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
          if (!c.toBlob) { try { c.width = 1; c.height = 1; } catch (eX) { } terminer(fichier); return; }
          c.toBlob(function (b) {
            var sortie = fichier;
            try {
              if (b) {
                var nom = (fichier.name ? String(fichier.name).replace(/\.[^.]+$/, "") : "story") + "-cadre.jpg";
                sortie = (typeof File === "function") ? new File([b], nom, { type: "image/jpeg" }) : b;
              }
            } catch (eF) { sortie = b || fichier; }
            try { c.width = 1; c.height = 1; } catch (eC) { }
            terminer(sortie);
          }, "image/jpeg", 0.9);
        } catch (e) { terminer(fichier); }
      };
      img.onerror = function () { terminer(fichier); };
      img.src = brut;
    } catch (e) { resolve(fichier); }
  });
}

/* 19c : l'image du FOND FLOUTE — minuscule par choix. Un blur(26px) sur un
   calque plein ecran est de la meme famille que les plantages memoire ; une
   vignette de 220 px etiree donne exactement le meme flou pour presque rien. */
/* 19af — LA PHOTO ENTIERE SUR SON PROPRE FLOU, au format de la fenetre.
   Utilisee a la publication quand la forme de la photo est trop eloignee de
   celle de sa fenetre (perte > HS_SEUIL_COUPE) : rien n'est coupe, le vide
   est comble par la photo elle-meme, agrandie et adoucie — le meme principe
   que le fond immersif valide par Blandine.
   Le flou est obtenu par double reduction (dessin en 1/12e puis etirement) :
   pas de filter=blur, que Safari iOS applique de facon inegale au canvas. */
function hsEntierFichier(fichier, ratioVoulu, zoom) {
  return new Promise(function (resolve) {
    try {
      if (!fichier || typeof window === "undefined" || !window.URL) { resolve(fichier); return; }
      var brut = window.URL.createObjectURL(fichier);
      var img = new Image();
      var fini = false;
      function terminer(r) {
        if (fini) return; fini = true;
        try { img.src = ""; } catch (e1) { }
        try { window.URL.revokeObjectURL(brut); } catch (e2) { }
        resolve(r || fichier);
      }
      img.decoding = "async";
      img.onload = function () {
        try {
          var L = img.naturalWidth || 1, H = img.naturalHeight || 1;
          var R = (typeof ratioVoulu === "number" && ratioVoulu > 0) ? ratioVoulu : (L / H);
          var haut = Math.min(HS_CADRE_HMAX, Math.max(H, 900));
          var c = document.createElement("canvas");
          c.height = Math.round(haut);
          c.width = Math.round(haut * R);
          var ctx = c.getContext("2d");
          /* le fond : la photo en couverture, reduite puis etiree = flou doux */
          var p = document.createElement("canvas");
          p.width = Math.max(1, Math.round(c.width / 12));
          p.height = Math.max(1, Math.round(c.height / 12));
          var pctx = p.getContext("2d");
          var rF = c.width / c.height, sw, sh, sx, sy;
          if (L / H > rF) { sh = H; sw = H * rF; sx = (L - sw) / 2; sy = 0; }
          else { sw = L; sh = L / rF; sx = 0; sy = (H - sh) / 2; }
          pctx.drawImage(img, sx, sy, sw, sh, 0, 0, p.width, p.height);
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(p, 0, 0, c.width, c.height);
          ctx.fillStyle = "rgba(6,7,9,0.42)";       /* assombri pour que la photo nette porte */
          ctx.fillRect(0, 0, c.width, c.height);
          /* la photo, ENTIERE, centree — le zoom de l'editeur reste honore */
          var z = (typeof zoom === "number" && zoom > 1) ? Math.min(4, zoom) : 1;
          var dw, dh;
          if (L / H > rF) { dw = c.width * z; dh = dw * H / L; }
          else { dh = c.height * z; dw = dh * L / H; }
          ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
          try { p.width = 1; p.height = 1; } catch (eP) { }
          if (!c.toBlob) { try { c.width = 1; c.height = 1; } catch (eX) { } terminer(fichier); return; }
          c.toBlob(function (b) {
            var sortie = fichier;
            try {
              if (b) {
                var nom = (fichier.name ? String(fichier.name).replace(/\.[^.]+$/, "") : "story") + "-entier.jpg";
                sortie = (typeof File === "function") ? new File([b], nom, { type: "image/jpeg" }) : b;
              }
            } catch (eF) { sortie = b || fichier; }
            try { c.width = 1; c.height = 1; } catch (eC) { }
            terminer(sortie);
          }, "image/jpeg", 0.9);
        } catch (e) { terminer(fichier); }
      };
      img.onerror = function () { terminer(fichier); };
      img.src = brut;
    } catch (e0) { resolve(fichier); }
  });
}

function hsImageFlou(u) {
  try {
    if (typeof vignetteHype !== "function") return u;
    return vignetteHype(u, 220, 330);
  } catch (e) { return u; }
}

/* 19f (14/08) — UNE VIGNETTE CASSEE NE LAISSE PLUS L'ICONE DE SAFARI.
   `replierVignette` reessaie deja l'original ; si celui-la tombe aussi, on
   efface l'image et le rond garde son fond sombre, propre. Vu sur la capture
   du 14/08 : une bulle du bandeau affichait le carre bleu « ? » d'iOS. */
function hsVignetteCassee(ev, brut) {
  try {
    var im = ev && ev.target; if (!im) return;
    var dejaTente = !!im.__repli;
    if (!dejaTente && typeof replierVignette === "function") { replierVignette(ev, brut); return; }
    im.style.display = "none";
  } catch (e) { }
}

/* Le côté demandé pour l'aperçu : la taille de l'écran, jamais plus. */
function hsCoteEcran() {
  try {
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    return Math.min(1600, Math.round(Math.max(window.innerWidth, window.innerHeight) * dpr));
  } catch (e) { return 1200; }
}
function hsLibererUrl(u) {
  try { if (u && String(u).indexOf("blob:") === 0 && window.URL && window.URL.revokeObjectURL) window.URL.revokeObjectURL(u); } catch (e) { }
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
async function hsPublierStory(fichier, legende, lieu, tags, musique, fond, groupe, disposition, dureeMs) {
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
      /* 19an : la durée vient de l'auteur (7 jours, ou 1 mois en Premium).
         Repli sur le socle si rien n'est transmis — toutes les publications
         d'avant restent identiques. */
      expire_le: new Date(Date.now() + ((typeof dureeMs === "number" && dureeMs > 0) ? dureeMs : HS_DUREE_MS)).toISOString()
    };
    var lieuNet = (lieu ? String(lieu).trim().slice(0, HS_LIEU_MAX) : "");
    if (lieuNet) ligne.lieu = lieuNet;
    if (musique && hsUrlMusique(musique)) ligne.musique = musique;
    /* 13/08 (spec de Blandine) : le FOND choisi par l'auteur voyage avec la
       story — "immersif" ou rien. Absent = noir, comme toutes les stories
       d'avant : aucune story existante ne change. */
    if (fond === "immersif") ligne.fond = "immersif";
    /* Story composee : le groupe relie les photos, la disposition ne va que
       sur la couverture (la premiere publiee). */
    if (groupe) ligne.groupe = String(groupe);
    if (groupe && disposition) ligne.disposition = String(disposition);

    var res = await supa.from("hype_stories").insert(ligne).select().single();
    if (res && res.error) {
      /* 19c — LE REPLI NE JETTE PLUS LA COMPOSITION EN SILENCE.
         Jusqu'ici, une insertion refusee faisait tomber D'UN BLOC le lieu, la
         musique, le fond, le groupe ET la disposition, puis republiait : les
         cinq photos de Blandine sont parties en cinq stories separees, et le
         seul message possible parlait du lieu. Ses mots (14/08) : « elle me
         l'a decoupe en autant de stories sans un mot ».
         Desormais : si la ligne portait un GROUPE, on n'insere rien et on
         remonte l'echec nomme. Le repli d'origine ne vaut plus que pour les
         colonnes de confort (lieu, musique, fond). */
      if (ligne.groupe) return { data: null, error: res.error, compoRefusee: true };
      /* 19d : un DECOR sur une photo seule est une disposition sans groupe —
         il ne doit pas davantage etre jete en silence. */
      if (ligne.disposition) return { data: null, error: res.error, decorRefuse: true };
      if (lieuNet || ligne.musique || ligne.fond) {
        delete ligne.lieu;
        delete ligne.musique;
        delete ligne.fond;
        var res2 = await supa.from("hype_stories").insert(ligne).select().single();
        if (res2 && !res2.error) return { data: res2.data, error: null, lieuIgnore: true };
      }
      return { data: null, error: res.error };
    }
    /* 19c : ceinture — la ligne REVENUE doit porter son groupe. Une colonne
       ignoree en silence par la base ne passera plus inapercue. */
    if (ligne.groupe && res && res.data && !res.data.groupe) {
      return { data: res.data, error: "groupe non enregistre", compoRefusee: true };
    }
    if (ligne.disposition && res && res.data && !res.data.disposition) {
      return { data: res.data, error: "disposition non enregistree", decorRefuse: true };
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

/* ---------------------------------------------------------------------------
   19b (14/08, décision de Blandine : « la proposer aussi — le groupe absorbe
   la story en ligne »). C'est la PREMIÈRE ÉCRITURE de l'application sur une
   story déjà publiée : on lui pose le `groupe`, et la disposition va sur la
   COUVERTURE, c'est-à-dire la plus ancienne (elle devient la grande du H+D ou
   la première fenêtre du modèle). Rien n'est supprimé : la story garde sa
   photo, sa légende, son lieu, sa musique — elle cesse seulement d'apparaître
   seule dans le fil, puisqu'elle vit désormais dans la composition.
   Si cette écriture échoue, l'appelant n'insère RIEN : mieux vaut ne rien
   publier qu'une moitié de composition. */
async function hsRattacherAuGroupe(ids, groupe, disposition) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    var liste = (ids || []).filter(function (x) { return !!x; });
    if (!liste.length) return { error: "story introuvable" };
    var r = await supa.from("hype_stories").update({ groupe: String(groupe), disposition: null }).in("id", liste).eq("user_id", user.id);
    if (r && r.error) return { error: r.error };
    var r2 = await supa.from("hype_stories").update({ disposition: String(disposition) }).eq("id", liste[0]).eq("user_id", user.id);
    if (r2 && r2.error) return { error: r2.error };
    return { error: null };
  } catch (e) { return { error: String(e) }; }
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

/* ---------------------------------------------------------------------------
   19ak (15/08, feu vert de Blandine) — LE CŒUR SUR UNE STORY
   Table `hype_stories_likes` (SQL passé par Blandine le 15/08 à 10h38) :
   `story_id` référence `hype_stories(id)` en CASCADE — quand une story
   expire et disparaît, ses cœurs partent avec elle, aucun ménage à écrire.
   La contrainte d'unicité (story_id, user_id) empêche le double comptage si
   le doigt part deux fois.
   DÉCISION DE BLANDINE : « tous c'est mieux » — le compteur est PUBLIC,
   chacun voit combien de cœurs porte une story.
   ⚠️ Le cœur ne porte JAMAIS sur une photo mais sur LA STORY : une
   composition à cinq photos a un seul compteur, pas cinq.
--------------------------------------------------------------------------- */
async function hsChargerLikesStory(storyId) {
  try {
    if (typeof supa === "undefined" || !supa || !storyId) return { count: 0, jaiLike: false };
    var user = await utilisateurActuel();
    var r = await supa.from("hype_stories_likes").select("user_id").eq("story_id", storyId);
    var lignes = (r && r.data) || [];
    return {
      count: lignes.length,
      jaiLike: !!(user && lignes.some(function (l) { return l.user_id === user.id; })),
      error: r && r.error
    };
  } catch (e) { return { count: 0, jaiLike: false, error: String(e) }; }
}
async function hsBasculerLikeStory(storyId, dejaLike) {
  try {
    if (typeof supa === "undefined" || !supa || !storyId) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    if (dejaLike) return await supa.from("hype_stories_likes").delete().eq("story_id", storyId).eq("user_id", user.id);
    return await supa.from("hype_stories_likes").insert({ story_id: storyId, user_id: user.id });
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
      /* 13/08 : les photos d'une story COMPOSEE se replient en une seule
         entree (la couverture porte `compo`). Inerte tant que rien n'est
         publie avec un groupe. */
      g.stories = hsRegrouperCompos(g.stories);
      g.toutesVues = g.stories.every(function (s) { return !!vues[String(s.id)]; });
      /* ⚠️ 19am (15/08) — L'ORDRE DU RAIL, REFAIT SUR LES MOTS DE BLANDINE.
         AVANT : `g.rang = g.moi ? 0 : (memeEcurie ? 1 : (suivi ? 2 : 3))`.
         Blandine passait donc TOUJOURS en tete, meme en ayant publie trois
         jours apres tout le monde, et la date n'arrivait qu'en dernier
         recours. Ses mots : « c'est pas une question de moi ou pas moi, un
         post arrive a un moment donne, il y a un ordre chronologique a
         suivre » et « ce qui me gene c'est que les gens qui ont pris une
         place dans la file la perdent ».
         MAINTENANT, deux regles et rien d'autre :
         1. Ce qui n'a PAS ete vu passe devant ce qui a ete vu — « quand une
            story a ete vue elle peut repasser en dernier sur le rail, le rail
            avance au fur et a mesure qu'elles ont ete vues ».
         2. A egalite, l'ORDRE DE PUBLICATION, du plus ancien au plus recent.
            La file avance par l'arriere : une story ne double jamais une
            autre, personne ne perd sa place.
         Plus aucun privilege : ni pour Blandine, ni pour l'ecurie, ni pour
         les cavaliers suivis. `memeEcurie` et `suivi` restent calcules, ils
         servent ailleurs.
         ⚠️ POUR INVERSER LE SENS (le plus recent en premier), il n'y a QUE
         cette ligne a retourner : mettre `> 0 ? -1 : 1`. Blandine : « on
         avisera par la suite quitte a intervertir l'ordre ». */
      g.premier = (g.stories[0] && g.stories[0].created_at) || "";
    });
    groupes.sort(function (a, b) {
      if (a.toutesVues !== b.toutesVues) return a.toutesVues ? 1 : -1;
      return String(a.premier) < String(b.premier) ? -1 : 1;
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

    /* STORY COMPOSEE (13/08, decision de Blandine) : garder embarque TOUTES
       les photos du groupe, pas seulement la couverture. */
    var urls = (story.compo && story.compo.length > 1)
      ? story.compo.map(function (x) { return x && x.photo_url; }).filter(function (u) { return !!u; })
      : [story.photo_url];
    var photos = (alb.photos || []).slice();
    var neuves = urls.filter(function (u) { return photos.indexOf(u) < 0; });
    if (!neuves.length) return { deja: true, error: null };
    if (!premium && photos.length + neuves.length > 20) return { error: "quota" };
    photos = photos.concat(neuves);

    var champs = { photos: photos };
    /* Première photo d'une à la une neuve : elle en devient la couverture. */
    if (!alb.couverture && photos.length === neuves.length) champs.couverture = neuves[0];

    var rm = await majAlbumCheval(alb.id, champs);
    if (rm && rm.error) return { error: rm.error };
    try {
      var ids = (story.compo && story.compo.length ? story.compo : [story]).map(function (x) { return x && x.id; }).filter(function (i) { return !!i; });
      await supa.from("hype_stories").update({ garde: true }).in("id", ids).eq("user_id", user.id);
    } catch (eG) { }
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
  /* 19ac — l'ecran plein format */
  placerPhotos: { fr: "Place tes photos", en: "Place your photos", es: "Coloca tus fotos", it: "Sistema le tue foto", ja: "写真を配置", de: "Fotos platzieren" },
  gestesDecor: {
    fr: "Glisse pour déplacer, pince pour zoomer. Appui long sur une fenêtre, puis touche une autre : les deux photos s'échangent.",
    en: "Drag to move, pinch to zoom. Press and hold one window, then tap another: the two photos swap.",
    es: "Arrastra para mover, pellizca para ampliar. Mantén pulsada una ventana y toca otra: las dos fotos se intercambian.",
    it: "Trascina per spostare, pizzica per ingrandire. Tieni premuta una finestra, poi toccane un'altra: le due foto si scambiano.",
    ja: "ドラッグで移動、ピンチで拡大。枠を長押ししてから別の枠をタップすると、2枚の写真が入れ替わります。",
    de: "Ziehen zum Verschieben, Pinch zum Zoomen. Ein Fenster lange drücken, dann ein anderes antippen: Die beiden Fotos tauschen den Platz."
  },
  utiliserDecor: { fr: "Utiliser ce décor", en: "Use this frame", es: "Usar este marco", it: "Usa questa cornice", ja: "この背景を使う", de: "Diesen Rahmen verwenden" },
  envoi: { fr: "Envoi\u2026", en: "Uploading\u2026", es: "Enviando\u2026", it: "Invio\u2026", ja: "送信中…", de: "Wird gesendet\u2026" },
  duree: { fr: "Visible 7 jours par tous les cavaliers.", en: "Visible for 7 days to all riders.", es: "Visible 7 d\u00edas para todos los jinetes.", it: "Visibile 7 giorni a tutti i cavalieri.", ja: "7日間、すべての騎手に表示されます。", de: "7 Tage f\u00fcr alle Reiter sichtbar." },
  presentation: { fr: "Pr\u00e9sentation", en: "Layout", es: "Presentaci\u00f3n", it: "Presentazione", ja: "\u30ec\u30a4\u30a2\u30a6\u30c8", de: "Anordnung" },
  defiler: { fr: "D\u00e9filer", en: "One by one", es: "Deslizar", it: "Scorrere", ja: "\u9806\u756a\u306b\u8868\u793a", de: "Nacheinander" },
  composer: { fr: "Composer", en: "Compose", es: "Componer", it: "Comporre", ja: "\u7d44\u307f\u5408\u308f\u305b\u308b", de: "Komponieren" },
  ajouterPhotos: { fr: "Ajouter des photos", en: "Add photos", es: "A\u00f1adir fotos", it: "Aggiungere foto", ja: "\u5199\u771f\u3092\u8ffd\u52a0", de: "Fotos hinzuf\u00fcgen" },
  plafondPhotos: { fr: "%n photos maximum par story. Les suivantes n'ont pas \u00e9t\u00e9 ajout\u00e9es \u2014 publie celles-ci, puis recommence.", en: "%n photos maximum per story. The others were not added \u2014 publish these, then start again.", es: "M\u00e1ximo %n fotos por story. Las dem\u00e1s no se a\u00f1adieron.", it: "Massimo %n foto per story. Le altre non sono state aggiunte.", ja: "1\u3064\u306e\u30b9\u30c8\u30fc\u30ea\u30fc\u306b\u5199\u771f\u306f%n\u679a\u307e\u3067\u3067\u3059\u3002", de: "Maximal %n Fotos pro Story. Die \u00fcbrigen wurden nicht hinzugef\u00fcgt." },
  cadrerFenetre: { fr: "Touche une fen\u00eatre, puis d\u00e9place la photo dedans.", en: "Tap a window, then move the photo inside it.", es: "Toca una ventana y mueve la foto dentro.", it: "Tocca una finestra e sposta la foto all'interno.", ja: "\u7a93\u3092\u30bf\u30c3\u30d7\u3057\u3066\u5199\u771f\u3092\u52d5\u304b\u3057\u307e\u3059\u3002", de: "Tippe ein Fenster an und verschiebe das Foto darin." },
  retirerPhoto: { fr: "Retirer cette photo", en: "Remove this photo", es: "Quitar esta foto", it: "Togliere questa foto", ja: "\u3053\u306e\u5199\u771f\u3092\u524a\u9664", de: "Dieses Foto entfernen" },
  decorDemande: { fr: "Ce d\u00e9cor demande %n photos.", en: "This frame needs %n photos.", es: "Este marco necesita %n fotos.", it: "Questa cornice richiede %n foto.", ja: "\u3053\u306e\u30d5\u30ec\u30fc\u30e0\u306b\u306f\u5199\u771f%n\u679a\u304c\u5fc5\u8981\u3067\u3059\u3002", de: "Dieser Rahmen braucht %n Fotos." },
  decorDemande1: { fr: "Ce d\u00e9cor demande une seule photo.", en: "This frame needs a single photo.", es: "Este marco necesita una sola foto.", it: "Questa cornice richiede una sola foto.", ja: "\u3053\u306e\u30d5\u30ec\u30fc\u30e0\u306b\u306f\u5199\u771f1\u679a\u304c\u5fc5\u8981\u3067\u3059\u3002", de: "Dieser Rahmen braucht ein einzelnes Foto." },
  decor: { fr: "Le d\u00e9cor", en: "The frame", es: "El marco", it: "La cornice", ja: "\u30d5\u30ec\u30fc\u30e0", de: "Der Rahmen" },
  aucunDecor: { fr: "Aucun", en: "None", es: "Ninguno", it: "Nessuna", ja: "\u306a\u3057", de: "Keiner" },
  decorImpossible: { fr: "Le d\u00e9cor n'a pas pu \u00eatre enregistr\u00e9 (la base a refus\u00e9 la colonne \u00ab disposition \u00bb). Rien n'a \u00e9t\u00e9 publi\u00e9.", en: "The frame could not be saved (the database refused the \u201cdisposition\u201d column). Nothing was published.", es: "No se pudo guardar el marco (la base rechaz\u00f3 la columna \u00abdisposition\u00bb). No se public\u00f3 nada.", it: "Impossibile salvare la cornice (il database ha rifiutato la colonna \u00abdisposition\u00bb). Non \u00e8 stato pubblicato nulla.", ja: "\u30d5\u30ec\u30fc\u30e0\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u4f55\u3082\u6295\u7a3f\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002", de: "Der Rahmen konnte nicht gespeichert werden (die Datenbank hat die Spalte \u201edisposition\u201c abgelehnt). Es wurde nichts ver\u00f6ffentlicht." },
  compoImpossible: { fr: "La composition n'a pas pu \u00eatre cr\u00e9\u00e9e (la base a refus\u00e9 la colonne \u00ab groupe \u00bb). Rien n'a \u00e9t\u00e9 publi\u00e9 \u2014 tes photos sont intactes.", en: "The composition could not be created (the database refused the \u201cgroup\u201d column). Nothing was published \u2014 your photos are intact.", es: "No se pudo crear la composici\u00f3n (la base rechaz\u00f3 la columna \u00abgrupo\u00bb). No se public\u00f3 nada.", it: "Impossibile creare la composizione (il database ha rifiutato la colonna \u00abgruppo\u00bb). Non \u00e8 stato pubblicato nulla.", ja: "\u69cb\u6210\u3092\u4f5c\u6210\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\uff08\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u304c\u300c\u30b0\u30eb\u30fc\u30d7\u300d\u5217\u3092\u62d2\u5426\uff09\u3002\u4f55\u3082\u6295\u7a3f\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002", de: "Die Komposition konnte nicht erstellt werden (die Datenbank hat die Spalte \u201eGruppe\u201c abgelehnt). Es wurde nichts ver\u00f6ffentlicht." },
  apercuCompo: { fr: "\u00c0 quoi \u00e7a ressemblera", en: "How it will look", es: "C\u00f3mo se ver\u00e1", it: "Come apparir\u00e0", ja: "\u5b8c\u6210\u30a4\u30e1\u30fc\u30b8", de: "So wird es aussehen" },
  cadrer: { fr: "Le cadrage", en: "Framing", es: "Encuadre", it: "Inquadratura", ja: "\u30c8\u30ea\u30df\u30f3\u30b0", de: "Bildausschnitt" },
  photoEntiere: { fr: "Photo enti\u00e8re", en: "Whole photo", es: "Foto entera", it: "Foto intera", ja: "\u5199\u771f\u5168\u4f53", de: "Ganzes Foto" },
  changerCadrage: { fr: "Changer le cadrage", en: "Change the framing", es: "Cambiar el encuadre", it: "Cambia l'inquadratura", ja: "\u30c8\u30ea\u30df\u30f3\u30b0\u3092\u5909\u66f4", de: "Bildausschnitt \u00e4ndern" },
  cadrageAuto: { fr: "Tes photos partent enti\u00e8res \u2014 rien n'est coup\u00e9.", en: "Your photos are sent whole \u2014 nothing is cropped.", es: "Tus fotos se env\u00edan enteras: no se recorta nada.", it: "Le tue foto partono intere \u2014 nulla viene tagliato.", ja: "\u5199\u771f\u306f\u305d\u306e\u307e\u307e\u9001\u3089\u308c\u307e\u3059\u3002", de: "Deine Fotos werden ganz gesendet \u2014 nichts wird beschnitten." },
  remplirEcran: { fr: "Remplir l'\u00e9cran", en: "Fill the screen", es: "Llenar la pantalla", it: "Riempire lo schermo", ja: "\u753b\u9762\u3044\u3063\u3071\u3044", de: "Bildschirm f\u00fcllen" },
  cadrageCoupe: { fr: "La partie hors cadre sera perdue \u00e0 l'envoi.", en: "Whatever falls outside the frame is lost on upload.", es: "Lo que quede fuera del encuadre se pierde al enviar.", it: "Ci\u00f2 che resta fuori inquadratura andr\u00e0 perso.", ja: "\u67a0\u306e\u5916\u306f\u9001\u4fe1\u6642\u306b\u5931\u308f\u308c\u307e\u3059\u3002", de: "Was au\u00dferhalb des Rahmens liegt, geht beim Hochladen verloren." },
  compoLegende: { fr: "En composition, c'est la l\u00e9gende de ta story en ligne qui s'affiche \u2014 ce texte-ci accompagne la premi\u00e8re nouvelle photo.", en: "In a composition, your live story's caption is the one shown \u2014 this text still travels with the first new photo.", es: "En composici\u00f3n se muestra el texto de tu story en l\u00ednea \u2014 este acompa\u00f1a a la primera foto nueva.", it: "In composizione si vede il testo della tua story online \u2014 questo accompagna la prima nuova foto.", ja: "\u69cb\u6210\u3067\u306f\u516c\u958b\u4e2d\u306e\u30b9\u30c8\u30fc\u30ea\u30fc\u306e\u672c\u6587\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002", de: "In der Komposition wird der Text deiner Online-Story gezeigt \u2014 dieser begleitet das erste neue Foto." },
  compoAbsorbe: { fr: "Ta story en ligne rejoint la composition : elle en devient la grande photo.", en: "Your live story joins the composition — it becomes the large photo.", es: "Tu story en l\u00ednea se une a la composici\u00f3n: pasa a ser la foto grande.", it: "La tua story online entra nella composizione: diventa la foto grande.", ja: "\u516c\u958b\u4e2d\u306e\u30b9\u30c8\u30fc\u30ea\u30fc\u304c\u69cb\u6210\u306b\u52a0\u308f\u308a\u3001\u5927\u304d\u3044\u5199\u771f\u306b\u306a\u308a\u307e\u3059\u3002", de: "Deine Online-Story kommt in die Komposition \u2014 sie wird das gro\u00dfe Foto." },
  modelesPremium: { fr: "Les mod\u00e8les de d\u00e9cor sont r\u00e9serv\u00e9s aux membres Premium.", en: "Decor templates are for Premium members.", es: "Las plantillas de decorado son para miembros Premium.", it: "I modelli decorativi sono riservati ai membri Premium.", ja: "\u30c7\u30b3\u30ec\u30fc\u30b7\u30e7\u30f3\u30e2\u30c7\u30eb\u306f\u30d7\u30ec\u30df\u30a2\u30e0\u4f1a\u54e1\u9650\u5b9a\u3067\u3059\u3002", de: "Deko-Vorlagen sind Premium-Mitgliedern vorbehalten." },
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
  ajoutASaStory: { fr: "Ajouter \u00e0 ma story", en: "Add to my story", es: "A\u00f1adir a mi story", it: "Aggiungere alla mia story", ja: "\u30b9\u30c8\u30fc\u30ea\u30fc\u306b\u8ffd\u52a0", de: "Zu meiner Story hinzuf\u00fcgen" },
  dejaEnLigne: { fr: "En ligne", en: "Live", es: "En l\u00ednea", it: "Online", ja: "\u516c\u958b\u4e2d", de: "Online" },
  legendeReste: { fr: "Ta story en ligne garde sa l\u00e9gende \u2014 celle-ci ira sur la premi\u00e8re nouvelle photo.", en: "Your live story keeps its caption \u2014 this one goes on the first new photo.", es: "Tu story en l\u00ednea conserva su texto \u2014 este ir\u00e1 en la primera foto nueva.", it: "La tua story online conserva il testo \u2014 questo andr\u00e0 sulla prima nuova foto.", ja: "\u516c\u958b\u4e2d\u306e\u30b9\u30c8\u30fc\u30ea\u30fc\u306e\u672c\u6587\u306f\u6b8b\u308a\u307e\u3059\u3002", de: "Deine Online-Story beh\u00e4lt ihren Text \u2014 dieser kommt auf das erste neue Foto." },
  /* 19ae — l'etat grise du bouton, quand la photo regardee est deja la premiere */
  dejaPremiere: { fr: "Déjà en premier", en: "Already first", es: "Ya es la primera", it: "Già per prima", ja: "すでに最初", de: "Bereits zuerst" },
  mettreDevant: { fr: "Mettre celle-ci en premier", en: "Make this one first", es: "Poner esta primero", it: "Metti questa per prima", ja: "\u3053\u308c\u3092\u6700\u521d\u306b", de: "Diese zuerst zeigen" },
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
  /* 19ak : libelle du coeur — sert d'aria-label, jamais affiche en toutes lettres. */
  jaime: { fr: "J'aime", en: "Like", es: "Me gusta", it: "Mi piace", ja: "\u3044\u3044\u306d", de: "Gef\u00e4llt mir" },
  /* 19an — la durée au choix. */
  dureeTitre: { fr: "Combien de temps ?", en: "How long?", es: "\u00bfCu\u00e1nto tiempo?", it: "Per quanto tempo?", ja: "\u3069\u308c\u304f\u3089\u3044\uff1f", de: "Wie lange?" },
  duree7: { fr: "7 jours", en: "7 days", es: "7 d\u00edas", it: "7 giorni", ja: "7\u65e5\u9593", de: "7 Tage" },
  duree7Sous: { fr: "La dur\u00e9e habituelle", en: "The usual", es: "La duraci\u00f3n habitual", it: "La durata abituale", ja: "\u901a\u5e38\u306e\u9577\u3055", de: "Die \u00fcbliche Dauer" },
  duree30: { fr: "1 mois", en: "1 month", es: "1 mes", it: "1 mese", ja: "1\u30f6\u6708", de: "1 Monat" },
  duree30Sous: { fr: "Garde tes annonces plus longtemps", en: "Keep your news up longer", es: "Conserva tus anuncios m\u00e1s tiempo", it: "Conserva i tuoi annunci pi\u00f9 a lungo", ja: "\u304a\u77e5\u3089\u305b\u3092\u9577\u304f\u6b8b\u3059", de: "Behalte deine News l\u00e4nger" },
  duree30Aide: { fr: "Le mois fait partie du Cercle Crystal. Sept jours restent offerts \u00e0 tous.", en: "The month is part of the Crystal Circle. Seven days stay free for everyone.", es: "El mes forma parte del C\u00edrculo Crystal. Siete d\u00edas siguen siendo gratis para todos.", it: "Il mese fa parte del Cerchio Crystal. Sette giorni restano gratuiti per tutti.", ja: "1\u30f6\u6708\u306f\u30af\u30ea\u30b9\u30bf\u30eb\u30b5\u30fc\u30af\u30eb\u306e\u7279\u5178\u3067\u3059\u30027\u65e5\u9593\u306f\u5168\u54e1\u7121\u6599\u3067\u3059\u3002", de: "Der Monat geh\u00f6rt zum Crystal Circle. Sieben Tage bleiben f\u00fcr alle kostenlos." },
  encoreJours: { fr: "encore {n} jours", en: "{n} days left", es: "quedan {n} d\u00edas", it: "ancora {n} giorni", ja: "\u3042\u3068{n}\u65e5", de: "noch {n} Tage" },
  dernierJour: { fr: "dernier jour", en: "last day", es: "\u00faltimo d\u00eda", it: "ultimo giorno", ja: "\u6700\u7d42\u65e5", de: "letzter Tag" },
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
  /* 19am : rang de la story a ouvrir DANS le groupe touche. Sans lui, la
     visionneuse repartait toujours de la premiere. */
  var dsS = React.useState(0), departS = dsS[0], setDepartS = dsS[1];
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
      var brutes = ev && ev.target && ev.target.files ? Array.prototype.slice.call(ev.target.files) : [];
      var fs = brutes.slice(0, HS_MULTI_MAX);
      /* 19s : dire franchement qu'on s'arrete a 5, au lieu de couper en silence. */
      if (brutes.length > HS_MULTI_MAX) { try { bip(hsT("plafondPhotos", lg).replace("%n", String(HS_MULTI_MAX))); } catch (eB) { } }
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
  /* ======================================================================
     19ap (16/08, feu vert de Blandine) -- LA FORME « LIBRE », LE ROND SANS
     CADRE. Sa demande depuis le 15/08 : « photos SANS CADRE — les bords
     doivent se fondre dans le noir, pas etre encadres », puis, maquette en
     main, le choix du fondu large et de la forme ronde.
     /!\ CE N'EST PAS UN DEGRADE POSE SUR LA PHOTO. Un degrade recouvre
     l'image mais laisse son bord net -- c'est l'echec de la maquette du
     15/08. Ici le fondu est un MASQUE : il retire la matiere de l'image,
     il ne reste donc aucun bord a border.
     Le masque est un SVG floute, en gabarit CARRE dans une case CARREE :
     echelles identiques en x et en y, sinon le cercle s'aplatit et le flou
     s'etire (defaut corrige pendant la maquette).
     La regle « aucun filtre sur une photo de cheval » tient : on ne pose
     rien sur l'image, on en retire.
     Les formes "rond" et "carte" restent intactes juste en dessous :
     repasser la propriete `forme` les rallume telles quelles.
     /!\ Preparation Flutter : la forme reste une PROPRIETE de la page
     appelante, jamais une decision de ce composant. Un seul rendu, trois
     habits, zero divergence entre les quatre pages.
     ====================================================================== */
  var libre = !!(props && props.forme === "libre");
  /* 19ap bis (demande de Blandine) : « laisse sur la communaute en rectangle
     mais avec le fondu, ca permettra de voir ce que ca donne ».
     Meme principe exactement -- un masque, pas un degrade -- mais decoupe
     rectangulaire verticale. Gabarit 200x250 dans une case 116x145 : le
     rapport est le meme, donc le fondu reste regulier sur les quatre bords
     (c'est la faute qui avait aplati le rond pendant la maquette).
     Communaute est ainsi la SEULE page a garder le rectangle : c'est un
     essai, pas une divergence. Repasser sa `forme` a "libre" l'aligne sur
     les trois autres. */
  var libreRect = !!(props && props.forme === "libre-carte");
  var MASQUE_LIBRE = 'url("' + 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20200%20200%27%20preserveAspectRatio%3D%27none%27%3E%3Cdefs%3E%3Cfilter%20id%3D%27f%27%20x%3D%27-40%25%27%20y%3D%27-40%25%27%20width%3D%27180%25%27%20height%3D%27180%25%27%3E%3CfeGaussianBlur%20stdDeviation%3D%2717%27%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M100%2C26%20A74%2C74%200%200%201%20100%2C174%20A74%2C74%200%200%201%20100%2C26%20Z%27%20fill%3D%27%23fff%27%20filter%3D%27url%28%23f%29%27%2F%3E%3C%2Fsvg%3E' + '")';
  var MASQUE_RECT = 'url("' + 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20200%20250%27%20preserveAspectRatio%3D%27none%27%3E%3Cdefs%3E%3Cfilter%20id%3D%27g%27%20x%3D%27-40%25%27%20y%3D%27-40%25%27%20width%3D%27180%25%27%20height%3D%27180%25%27%3E%3CfeGaussianBlur%20stdDeviation%3D%2717%27%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M26%2C26%20H174%20V224%20H26%20Z%27%20fill%3D%27%23fff%27%20filter%3D%27url%28%23g%29%27%2F%3E%3C%2Fsvg%3E' + '")';
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
        ? h("img", { src: src, alt: "", loading: "lazy", onError: function (ev) { try { hsVignetteCassee(ev, brut); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : h("span", { style: { fontFamily: C, fontSize: carte ? 26 : 30, fontWeight: 700, color: tnL } }, String(g.pseudo || "?").charAt(0).toUpperCase());
      if (libre || libreRect) {
        var LM = libreRect ? MASQUE_RECT : MASQUE_LIBRE;
        var LW = libreRect ? CL : T, LH = libreRect ? CH_ : T;
        /* Aucun anneau, aucun contour, aucun fond : la photo s'arrete
           d'elle-meme. Le signal « non lue » est descendu SOUS la vignette,
           avec le nom (voir plus bas) -- jamais pose sur la photo.

           19au (feu vert de Blandine, « fais l'effet leger ») -- LE HALO.
           Une lumiere DERRIERE le fondu, pour que la photo ne se dissolve pas
           dans le vide. Trois points de vigilance tenus ici :
           1. Le halo est un CALQUE SEPARE POSE DESSOUS, jamais un filtre ni un
              degrade sur l'image : la regle « aucun voile sur une photo de
              cheval » n'est pas entamee, on n'ajoute rien SUR la photo.
           2. Il vit HORS du conteneur masque -- dedans, le masque l'eteindrait
              en meme temps que la photo, et il ne resterait rien.
           3. Sa couleur vient de tA(), donc de teinteHypeActive() : il SUIT la
              teinte du cavalier (turquoise, dore, rose, vert) sans une seule
              valeur ecrite en dur. Changer de theme change le halo.
           Etendue « legere » : 1,24x le cote, soit 16 px de debordement pour
           un rond de 132. Le retrait haut du rail est releve d'autant, sinon
           overflowY:hidden couperait le halo net en haut (voir plus bas). */
        var HD = Math.round((libreRect ? 150 : LW) * 1.24);
        return h("div", {
          key: cle,
          style: { position: "relative", width: LW, height: LH, flex: "0 0 auto" }
        },
          h("div", {
            "aria-hidden": "true",
            style: {
              position: "absolute", left: "50%", top: "50%",
              width: HD, height: HD, marginLeft: -(HD / 2), marginTop: -(HD / 2),
              borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(circle closest-side, " + tA(0.2) + " 0%, " + tA(0.09) + " 44%, " + tA(0) + " 100%)"
            }
          }),
          h("div", {
            style: {
              position: "relative", width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              WebkitMaskImage: LM, maskImage: LM,
              WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat"
            }
          }, photo));
      }
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

    /* 19aj (demande de Blandine) : « on aimerait voir la story de mettre sur
       les rails plutot qu'un +1, pour l'instant pas besoin de limiter ».
       Le bandeau n'affichait que DEUX stories par cavalier et posait une
       pastille « +N » sur la seconde : les suivantes n'existaient pas a
       l'ecran. Elles sont desormais TOUTES sur le rail, cote a cote, reliees
       par le meme fil de lumiere. Le rail defile deja (`data-hscroll`), la
       cellule s'elargit simplement d'autant.
       ⚠️ Aucune limite POUR L'INSTANT — mot de Blandine. Si un cavalier
       publie beaucoup, c'est ici qu'un plafond se poserait (ce `slice`
       retire), pas ailleurs. Le bloc « +N » ci-dessous est conserve INERTE :
       il redeviendra vivant le jour ou un plafond sera decide. */
    var montrees = g.stories;
    var enPlus = 0;
    var visuels = montrees.map(function (st, k) { return visuelPour(st, "v" + k); });
    if (enPlus > 0) {
      /* La pastille « +N » se pose sur le DERNIER visuel affiché. */
      visuels[visuels.length - 1] = h("div", { key: "vp", style: { position: "relative", flex: "0 0 auto" } },
        visuels[visuels.length - 1],
        h("div", { style: { position: "absolute", right: carte ? 6 : 4, bottom: carte ? 6 : 4, minWidth: 21, height: 21, padding: "0 5px", borderRadius: 999, background: "rgba(6,7,9,0.88)", border: "1px solid " + tA(0.6), color: tnL, fontSize: 10.5, fontWeight: 800, fontFamily: M, display: "flex", alignItems: "center", justifyContent: "center" } }, "+" + enPlus));
    }

    /* ⚠️ 19am — « QUAND ON CLIQUE CA N'OUVRE PAS LA BONNE STORY » (Blandine).
       Le rail n'avait qu'UN bouton par cavalier : quel que soit le medaillon
       touche, la visionneuse demarrait sur `is = 0`, donc sur la PREMIERE
       story du groupe. Le defaut existait avant, mais avec deux medaillons au
       plus il ne se voyait pas ; depuis que la 19aj les affiche tous, toucher
       le quatrieme ouvrait le premier.
       Chaque medaillon porte desormais son propre toucher et transmet SON
       rang (`setDepartS(k)`), lu par la visionneuse. */
    var duo = (visuels.length > 1);
    function medaillonTapable(vis, k) {
      return h("span", {
        key: "md" + k,
        role: "button",
        onClick: function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          hsAmorcerAudio(); setDepartS(k); setOuvert(i);
        },
        style: { display: "inline-flex", flex: "0 0 auto", cursor: "pointer" }
      }, vis);
    }
    var contenu = duo
      ? h("div", { style: { position: "relative", display: "flex", gap: 4, alignItems: "center" } },
        /* Le trait de lumière qui relie les photos. */
        h("div", { style: { position: "absolute", left: "8%", right: "8%", top: "50%", height: 1, background: "linear-gradient(90deg, transparent, " + tA(0.5) + ", transparent)", pointerEvents: "none" } }),
        visuels.map(medaillonTapable))
      : visuels[0];

    /* 19aj : la cellule suit le NOMBRE de medaillons montres, plus seulement
       deux — un cavalier a 4 stories occupe 4 medaillons sur le rail. */
    var nVis = visuels.length;
    var largeurCel = duo
      ? (((carte || libreRect) ? CL : T) * nVis + 4 * (nVis - 1) + 8)
      : ((carte || libreRect) ? CL : LARGEUR);

    return h("button", {
      key: "st" + g.user_id,
      /* Le bouton du groupe reste : il couvre le nom sous les medaillons et
         le cas d'une seule story. Sur un groupe multiple, chaque medaillon
         arrete le toucher avant lui (19am) et impose son propre rang. */
      onClick: function () { hsAmorcerAudio(); setDepartS(0); setOuvert(i); },
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: largeurCel, textAlign: carte ? "left" : "center" }
    },
      contenu,
      h("div", { style: { fontSize: 11, marginTop: 7, fontFamily: M, fontWeight: g.toutesVues ? 500 : 700, color: g.toutesVues ? "#8A929C" : "#E4ECEF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
        ((libre || libreRect) && !g.toutesVues) ? h("span", { style: { display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: tn, boxShadow: "0 0 6px " + tA(0.9), marginRight: 5, verticalAlign: "middle" } }) : null,
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
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 10, overflowX: "auto", overflowY: "hidden", padding: "18px 14px 6px", WebkitOverflowScrolling: "touch" } },
      /* 19n (14/08, mot de Blandine) : « le + pour ajouter une story faut
         qu'il soit toujours en dernier sur le rail pas en premier ». Les
         stories passent devant, le + ferme la marche. */
      groupes.map(function (g, i) { return rond(g, i); }),
      rondAjout()),

    (ouvert >= 0 && groupes[ouvert])
      ? h(VisionneuseStories, {
        groupes: groupes, depart: ouvert, departStory: departS, moiId: moiId, premium: premium, langue: lg,
        /* Le rail se reclasse A LA FERMETURE, jamais pendant : sinon il se
           reorganise sous les doigts au moment ou on regarde (19am). */
        onFermer: function () { setOuvert(-1); setDepartS(0); charger(); }
      })
      : null,

    composer
      ? h(ComposeurStory, {
        /* 19c : LE PREMIUM N'ARRIVAIT PAS. La bande des modeles ne pouvait
           donc JAMAIS s'afficher, quel que soit l'abonnement, et « Composer »
           ne montrait que la phrase « reserves aux membres Premium ».
           Erreur de la 134, signalee a Blandine le 14/08. */
        fichier: fichier, langue: lg, premium: premium,
        onFermer: function () { setComposer(false); setFichier(null); },
        onPublie: function (lieuIgnore, messagePartiel) { setComposer(false); setFichier(null); bip(messagePartiel ? messagePartiel : (lieuIgnore ? hsT("lieuIgnore", lg) : hsT("ajoutee", lg))); charger(); },
        onEchec: function (msg) { setComposer(false); setFichier(null); bip(msg || hsT("echec", lg)); }
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
/* ══════════════════════════════════════════════════════════════════════════
   19ac (15/08, feu vert de Blandine) — L'ECRAN PLEIN FORMAT.
   Sa demande, mot pour mot : « on etait suppose pouvoir voir les fonds de
   story proposes en plein ecran pour zoomer / dezoomer / deplacer les photos
   dans les cadres avant de pouvoir valider ». Ce n'etait pas un defaut : rien
   n'avait jamais ete ecrit, la regle etant « maquette avant tout code ». La
   maquette a ete validee cette nuit, la voici.

   ⚠️ REGLE ABSOLUE DE CE COMPOSANT — AUCUN ETAT REACT PENDANT LE GESTE.
   C'est la lecon des sessions 141-142 et du crash de la session 92 : chaque
   `setState` sous le doigt refabrique l'arbre, et sur iOS l'onglet finit par
   fermer. Ici tout le geste vit dans un `useRef` et s'ecrit DIRECTEMENT dans
   le style des elements. React n'est rappele qu'a la validation.
   ⚠️ Les ecouteurs tactiles sont NATIFS en `{ passive: false }` : React les
   attache en mode passif, ou `preventDefault` est IGNORE (piege deja paye en
   19z). Sans cela, le pincement fait zoomer la PAGE et le glisse vers la
   droite fait sortir de l'application.

   Les gestes :
   · tap sur une fenetre        → elle devient active (liseré turquoise)
   · glisse dans la fenetre     → deplace la photo A L'INTERIEUR
   · pincement                  → grossit / retrecit la photo (1 a 4)
   · appui long puis tap ailleurs → ECHANGE les deux photos
   Le glisse est reserve au deplacement : l'echange passe donc par l'appui
   long, seul geste qui ne se marche pas dessus. Decision de Blandine.
   ══════════════════════════════════════════════════════════════════════════ */
function EditeurDecorHype(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var tn = "#20D9F5";
  var M = "Montserrat, system-ui, -apple-system, sans-serif";
  var C = "Cinzel, Georgia, serif";
  var mod = props.modele || null;
  var fenetres = (mod && mod.fenetres) ? mod.fenetres : [];
  var vign = props.vignettes || [];

  var boiteRef = React.useRef(null);
  /* g.cadres[i] = { cx, cy, z } — la position de la photo dans la fenetre i.
     g.ordre[i]  = quelle PHOTO occupe la fenetre i (permutation).
     Tout vit ici, jamais dans un etat. */
  var g = React.useRef(null);
  if (!g.current) {
    var dep = [], ord = [];
    /* 19ag : l'ecran s'ouvre deja range par la forme — la photo debout dans
       la fenetre debout. props.affectation vient de hsMeilleureAffectation. */
    var aff = (props.affectation && props.affectation.length === fenetres.length) ? props.affectation : null;
    for (var i0 = 0; i0 < fenetres.length; i0++) {
      var d0 = (props.cadres && props.cadres[String(i0)]) || {};
      dep.push({
        cx: (typeof d0.cx === "number") ? d0.cx : 0.5,
        cy: (typeof d0.cy === "number") ? d0.cy : 0.5,
        z: (typeof d0.z === "number" && d0.z >= 1) ? d0.z : 1
      });
      ord.push(aff ? aff[i0] : i0);
    }
    g.current = { cadres: dep, ordre: ord, active: 0, source: -1, pinch: null, glisse: null, minuteur: null, bouge: false };
  }
  /* `active` et `source` sont doubles dans un etat MINIMAL : ils ne changent
     qu'au POSER du doigt, jamais pendant le mouvement. Le liseré doit se
     redessiner, la photo non. */
  var acS = React.useState(0), active = acS[0], setActive = acS[1];
  var srS = React.useState(-1), source = srS[0], setSource = srS[1];
  var vsS = React.useState(0), version = vsS[0], setVersion = vsS[1];

  /* La mise a l'echelle : le decor entier tient dans l'ecran, format garde. */
  var dim = React.useMemo(function () {
    try {
      var TL = (mod && mod.taille && mod.taille[0]) || 941;
      var TH = (mod && mod.taille && mod.taille[1]) || 1672;
      /* ⚠️ 19ad — CORRECTION D'UNE FAUTE DE CLAUDE (19ac). Je ne reservais que
         128 px pour le titre, la ligne d'aide, la barre de boutons ET la zone
         morte du bas de l'iPhone. Insuffisant : la barre passait sous l'ecran.
         Blandine : « on n'atteint pas le bouton du bas qui est avale dans la
         zone morte ». 236 px, mesures a la louche mais LARGES — mieux vaut un
         decor un peu plus petit qu'un bouton inatteignable.
         La barre de boutons est en plus ancree en bas (voir plus loin) : deux
         protections, pas une. */
      var dispoL = (typeof window !== "undefined" ? window.innerWidth : 390) - 16;
      var dispoH = (typeof window !== "undefined" ? window.innerHeight : 780) - 236;
      var e = Math.min(dispoL / TL, dispoH / TH);
      return { L: Math.round(TL * e), H: Math.round(TH * e), e: e, TL: TL, TH: TH };
    } catch (e) { return { L: 320, H: 568, e: 0.34, TL: 941, TH: 1672 }; }
  }, [mod]);

  function elPhoto(i) {
    try {
      var b = boiteRef.current; if (!b) return null;
      return b.querySelector('[data-fen="' + i + '"] img');
    } catch (e) { return null; }
  }
  function tailleFenetre(i) {
    var f = fenetres[i];
    if (!f || !f.bbox) return { w: 1, h: 1 };
    return { w: Math.max(1, f.bbox[2] * dim.e), h: Math.max(1, f.bbox[3] * dim.e) };
  }
  /* Le format "couvre" : la photo remplit la fenetre sans bande vide, a
     l'echelle 1. Le zoom part de la. */
  function baseCouvre(i) {
    var im = elPhoto(i), t = tailleFenetre(i);
    var r = 1;
    try { if (im && im.naturalWidth && im.naturalHeight) r = im.naturalWidth / im.naturalHeight; } catch (e) { }
    var rf = t.w / t.h;
    /* 19af — LA FORME DECIDE, ici comme a la publication. Perte forte :
       la photo tient ENTIERE dans la fenetre (contain) au lieu de la
       couvrir ; le fond immersif viendra derriere a la publication.
       L'ecran montre donc ce qui partira vraiment. Le zoom et le glisse
       marchent pareil : a l'echelle 1 la photo entiere ne deborde pas,
       donc le glisse ne fait rien — c'est le comportement attendu. */
    var perte = 1 - (Math.min(r, rf) / Math.max(r, rf));
    if (perte > HS_SEUIL_COUPE) {
      if (r > rf) return { w: t.w, h: t.w / r };
      return { w: t.h * r, h: t.h };
    }
    if (r > rf) return { w: t.h * r, h: t.h };
    return { w: t.w, h: t.w / r };
  }
  function poser(i) {
    try {
      var im = elPhoto(i); if (!im) return;
      var c = g.current.cadres[i], t = tailleFenetre(i), b = baseCouvre(i);
      var z = Math.max(1, Math.min(4, c.z || 1));
      var lg2 = b.w * z, ht = b.h * z;
      /* cx/cy = le point de la photo amene au centre de la fenetre. */
      var dx = (0.5 - c.cx) * lg2;
      var dy = (0.5 - c.cy) * ht;
      var mx = Math.max(0, (lg2 - t.w) / 2), my = Math.max(0, (ht - t.h) / 2);
      dx = Math.max(-mx, Math.min(mx, dx));
      dy = Math.max(-my, Math.min(my, dy));
      c.cx = 0.5 - dx / lg2; c.cy = 0.5 - dy / ht;
      im.style.width = Math.round(lg2) + "px";
      im.style.height = Math.round(ht) + "px";
      im.style.transform = "translate(-50%,-50%) translate(" + Math.round(dx) + "px," + Math.round(dy) + "px)";
    } catch (e) { }
  }
  function poserTout() { for (var i = 0; i < fenetres.length; i++) poser(i); }

  React.useEffect(function () { poserTout(); }, [version, dim.L]);
  React.useEffect(function () {
    var t = setTimeout(poserTout, 60);     /* apres l'arrivee des images */
    return function () { clearTimeout(t); };
  }, []);

  function ecart(a, b) { var x = a.clientX - b.clientX, y = a.clientY - b.clientY; return Math.sqrt(x * x + y * y); }
  function fenetreDe(cible) {
    try {
      var n = cible;
      while (n && n !== document.body) {
        if (n.getAttribute && n.getAttribute("data-fen") !== null) return parseInt(n.getAttribute("data-fen"), 10);
        n = n.parentNode;
      }
    } catch (e) { }
    return -1;
  }
  function echanger(a, b) {
    try {
      var s = g.current;
      var t = s.ordre[a]; s.ordre[a] = s.ordre[b]; s.ordre[b] = t;
      var c = s.cadres[a]; s.cadres[a] = s.cadres[b]; s.cadres[b] = c;
      s.source = -1; setSource(-1);
      setVersion(function (v) { return v + 1; });
    } catch (e) { }
  }

  /* ⚠️ 19af — CORRECTION D'UNE FAUTE DE CLAUDE, LA MEME QU'EN 19z.
     Les ecouteurs etaient poses sur LA BOITE DU DECOR seulement : un glisse
     commence hors de la boite (titre, fond noir, bords de l'ecran) partait
     dans le geste de retour d'iOS et EJECTAIT Blandine de l'application.
     Sa video de 08h48 le montre : elle ouvre l'ecran, glisse, retour profil.
     Les ecouteurs natifs `{ passive: false }` couvrent desormais TOUT
     l'ecran (racineRef) : l'editeur n'a aucun defilement, on peut donc
     retenir chaque mouvement sans rien casser. Les taps sur les boutons ne
     produisent pas de touchmove et passent normalement.
     ⚠️ La lecon, pour la troisieme fois : le blocage du retour iOS se pose
     sur la SURFACE ENTIERE de l'ecran qu'on protege, jamais sur une zone. */
  var racineRef = React.useRef(null);
  React.useEffect(function () {
    var b = racineRef.current; if (!b || typeof window === "undefined") return;
    var s = g.current;
    function debut(ev) {
      try {
        var i = fenetreDe(ev.target); if (i < 0) return;
        s.bouge = false;
        if (ev.touches.length >= 2) {
          s.glisse = null;
          s.pinch = { i: i, d: ecart(ev.touches[0], ev.touches[1]), z0: s.cadres[i].z || 1 };
          if (s.minuteur) { clearTimeout(s.minuteur); s.minuteur = null; }
          return;
        }
        if (i !== s.active) { s.active = i; setActive(i); }
        s.glisse = { i: i, x: ev.touches[0].clientX, y: ev.touches[0].clientY, cx: s.cadres[i].cx, cy: s.cadres[i].cy };
        /* appui long = je designe cette fenetre pour un echange */
        if (s.minuteur) clearTimeout(s.minuteur);
        s.minuteur = setTimeout(function () {
          if (s.bouge) return;
          s.source = i; setSource(i);
          try { if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(12); } catch (eV) { }
        }, 500);
      } catch (e) { }
    }
    function bouge(ev) {
      try {
        /* 19af : TOUT mouvement est retenu, meme hors des fenetres — c'est ce
           qui neutralise le geste de retour d'iOS sur l'ecran entier. */
        if (ev.cancelable) ev.preventDefault();
        if (s.pinch && ev.touches.length >= 2) {
          s.bouge = true;
          var k = ecart(ev.touches[0], ev.touches[1]) / (s.pinch.d || 1);
          s.cadres[s.pinch.i].z = Math.max(1, Math.min(4, (s.pinch.z0 || 1) * k));
          poser(s.pinch.i);
          return;
        }
        if (s.glisse && ev.touches.length === 1) {
          var dx = ev.touches[0].clientX - s.glisse.x;
          var dy = ev.touches[0].clientY - s.glisse.y;
          if (Math.abs(dx) > 4 || Math.abs(dy) > 4) s.bouge = true;
          var i = s.glisse.i, bse = baseCouvre(i), c = s.cadres[i];
          var z = Math.max(1, Math.min(4, c.z || 1));
          c.cx = s.glisse.cx - dx / (bse.w * z);
          c.cy = s.glisse.cy - dy / (bse.h * z);
          poser(i);
        }
      } catch (e) { }
    }
    function fin(ev) {
      try {
        if (s.minuteur) { clearTimeout(s.minuteur); s.minuteur = null; }
        var etaitPinch = !!s.pinch;
        s.pinch = null;
        var gl = s.glisse; s.glisse = null;
        /* un TAP franc (sans deplacement) sur une AUTRE fenetre alors qu'une
           source est designee : on echange les deux photos. */
        if (!s.bouge && !etaitPinch && gl && s.source >= 0 && s.source !== gl.i) { echanger(s.source, gl.i); return; }
        if (!s.bouge && !etaitPinch && gl && s.source === gl.i) { s.source = -1; setSource(-1); }
      } catch (e) { }
    }
    b.addEventListener("touchstart", debut, { passive: false });
    b.addEventListener("touchmove", bouge, { passive: false });
    b.addEventListener("touchend", fin, { passive: false });
    b.addEventListener("touchcancel", fin, { passive: false });
    return function () {
      try {
        b.removeEventListener("touchstart", debut);
        b.removeEventListener("touchmove", bouge);
        b.removeEventListener("touchend", fin);
        b.removeEventListener("touchcancel", fin);
      } catch (e) { }
    };
  }, [fenetres.length, version]);

  /* ⚠️ Le geste retour d'iOS ferme l'editeur SEUL, pas l'application ni le
     composeur en dessous. Meme rail que la visionneuse et le composeur. */
  React.useEffect(function () {
    if (typeof window === "undefined") return;
    var anc = window.__hsComposeurRetour;
    window.__hsComposeurRetour = function () {
      try { if (props.onFermer) props.onFermer(); return true; } catch (e) { return false; }
    };
    return function () { try { window.__hsComposeurRetour = anc || null; } catch (e) { } };
  }, []);

  function valider() {
    try {
      var s = g.current, cad = {}, perm = [];
      for (var i = 0; i < fenetres.length; i++) {
        cad[String(i)] = { cx: s.cadres[i].cx, cy: s.cadres[i].cy, z: s.cadres[i].z };
        perm.push(s.ordre[i]);
      }
      if (props.onValider) props.onValider(cad, perm);
    } catch (e) { if (props.onValider) props.onValider({}, null); }
  }

  return h("div", {
    ref: racineRef,
    /* ⚠️ 19ah — LA VRAIE CAUSE DE L'EJECTION, trouvee sur la video de 09h04.
       Ce n'etait pas iOS : c'est le NAVIGATEUR PAR SWIPE DE HYPE (index.html
       ~21341, `onNavTouchEnd`). Au relacher, un geste horizontal > 65 px
       declenche `retourEcran()` — l'ecran change, le composeur se demonte,
       Blandine retombe sur son profil. Elle a bouge sa premiere photo
       (geste vertical, rien), touche la seconde en glissant en horizontal :
       « tout a plante ».
       `data-noswipe` est le marqueur que ce navigateur respecte. Le meme
       piege avait deja ete paye en 19m sur la bande de decors (data-hscroll).
       ⚠️ TOUT NOUVEL ECRAN TACTILE DU MODULE DOIT PORTER `data-noswipe`.
       Le preventDefault de la 19af reste : il bloque, LUI, le geste de
       retour d'iOS. Les deux protections sont necessaires, elles ne
       couvrent pas la meme chose. */
    "data-noswipe": "1",
    style: {
      position: "fixed", inset: 0, zIndex: 100000, background: "#060709",
      touchAction: "none",
      display: "flex", flexDirection: "column", alignItems: "center",
      paddingTop: "calc(env(safe-area-inset-top) + 8px)",
      paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)"
    }
  },
    /* la croix, sous l'encoche */
    h("button", {
      "aria-label": hsT("annuler", lg),
      onClick: function () { if (props.onFermer) props.onFermer(); },
      style: {
        position: "absolute", left: 14, top: "calc(env(safe-area-inset-top) + 10px)",
        width: 40, height: 40, borderRadius: 999, zIndex: 3,
        background: "rgba(17,20,23,0.82)", color: "#F4F7FA",
        border: "1px solid rgba(255,255,255,0.18)", fontSize: 19, cursor: "pointer"
      }
    }, "\u2715"),
    h("div", {
      style: { fontFamily: C, fontSize: 14, letterSpacing: 2.4, color: "#F4F7FA", marginBottom: 8, textTransform: "uppercase" }
    }, hsT("placerPhotos", lg)),

    h("div", {
      ref: boiteRef,
      style: {
        position: "relative", width: dim.L, height: dim.H, flex: "0 0 auto",
        background: "#060709", touchAction: "none", overflow: "hidden", borderRadius: 6
      }
    },
      fenetres.map(function (f, ix) {
        var t = tailleFenetre(ix);
        var iPhoto = g.current.ordre[ix];
        var u = vign[iPhoto] || null;
        /* ⚠️ 19ad — CORRECTION D'UNE FAUTE DE CLAUDE (19ac). J'avais ecrit
           `p[0] * 100`, en supposant le contour exprime de 0 a 1. FAUX : les
           points du contour sont en COORDONNEES DU DECOR, comme les bbox. Il
           faut les rapporter a la fenetre. Le clip-path produit etait donc
           absurde et DECOUPAIT TOUT : les fenetres s'ouvraient vides.
           C'est le defaut signale par Blandine — « on ouvre plein ecran mais
           les photos ne se mettent pas dedans ».
           Formule identique a celle de `CompositionStory` (~3431) et de
           l'apercu du composeur (~2586). ⚠️ Ne jamais la reecrire de tete :
           la recopier depuis l'un de ces deux endroits. */
        var pc = "";
        try {
          if (f.contour && f.contour.length && f.bbox && f.bbox[2] && f.bbox[3]) {
            pc = f.contour.map(function (p) {
              return (((p[0] - f.bbox[0]) / f.bbox[2]) * 100).toFixed(2) + "% "
                + (((p[1] - f.bbox[1]) / f.bbox[3]) * 100).toFixed(2) + "%";
            }).join(", ");
          }
        } catch (eC) { pc = ""; }
        return h("div", {
          key: "f" + ix, "data-fen": String(ix),
          style: {
            position: "absolute",
            left: Math.round(f.bbox[0] * dim.e), top: Math.round(f.bbox[1] * dim.e),
            width: Math.round(t.w), height: Math.round(t.h),
            overflow: "hidden", background: u ? "#060709" : "rgba(32,217,245,0.12)",
            clipPath: pc ? ("polygon(" + pc + ")") : "none",
            WebkitClipPath: pc ? ("polygon(" + pc + ")") : "none",
            outline: (ix === source) ? ("3px dashed " + tn) : ((ix === active) ? ("2px solid " + tn) : "none"),
            outlineOffset: -2
          }
        }, u ? h("img", {
          src: u, alt: "", draggable: false,
          onLoad: function () { poser(ix); },
          style: {
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)", maxWidth: "none", display: "block",
            pointerEvents: "none", userSelect: "none"
          }
        }) : null);
      }),
      /* le decor par-dessus — vignette allegee, JAMAIS le plein format */
      (props.reference)
        ? h("img", {
          src: props.reference + "-mini.webp", alt: "", decoding: "async",
          onError: function (ev) { try { if (ev && ev.target) ev.target.style.visibility = "hidden"; } catch (eD) { } },
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }
        })
        : null),

    h("div", {
      style: { fontFamily: M, fontSize: 10.5, color: "#8A929C", marginTop: 8, textAlign: "center", lineHeight: 1.5, padding: "0 18px" }
    }, hsT("gestesDecor", lg)),
    /* 19ad : une cale de la hauteur de la barre ancree, pour que la ligne
       d'aide ne finisse jamais dessous. */
    h("div", { style: { height: 72, flex: "0 0 auto" } }),

    /* 19ad : la barre est ANCREE au bas de l'ecran, au-dessus de la zone
       morte. Elle ne peut plus etre poussee hors de vue par un decor haut. */
    h("div", {
      style: {
        position: "fixed", left: 0, right: 0,
        bottom: "calc(env(safe-area-inset-bottom) + 12px)",
        display: "flex", gap: 10, justifyContent: "center", zIndex: 4
      }
    },
      h("button", {
        onClick: function () { if (props.onFermer) props.onFermer(); },
        style: {
          padding: "12px 22px", borderRadius: 999, background: "rgba(17,20,23,0.9)",
          color: "#C9D3D8", border: "1px solid rgba(255,255,255,0.18)",
          fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer"
        }
      }, hsT("annuler", lg)),
      h("button", {
        onClick: valider,
        style: {
          padding: "12px 26px", borderRadius: 999, border: "none",
          background: "linear-gradient(120deg,#20D9F5,#7FE9FA)", color: "#04252A",
          fontFamily: M, fontSize: 13, fontWeight: 800, cursor: "pointer"
        }
      }, hsT("utiliserDecor", lg))));
}

function ComposeurStory(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState(""), legende = lS[0], setLegende = lS[1];
  var liS = React.useState(props.lieuInitial || ""), lieu = liS[0], setLieu = liS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var aS = React.useState(null), apercu = aS[0], setApercu = aS[1];
  var qS = React.useState(""), requete = qS[0], setRequete = qS[1];
  var rS = React.useState([]), resultats = rS[0], setResultats = rS[1];
  var chS = React.useState([]), mesCh = chS[0], setMesCh = chS[1];
  var tgS = React.useState([]), tags = tgS[0], setTags = tgS[1];
  var cuS = React.useState(0), curseur = cuS[0], setCurseur = cuS[1];
  var mrS = React.useState([]), mentionRes = mrS[0], setMentionRes = mrS[1];
  var muS = React.useState(props.musiqueInitiale || null), musique = muS[0], setMusique = muS[1];
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
  /* Etats 15-17 (13/08, session 132) : l'ORDRE des photos (null = ordre de
     selection), la photo actuellement PREVISUALISEE, et les URLs miniatures. */
  var orS = React.useState(null), ordre = orS[0], setOrdre = orS[1];
  var vuS = React.useState(0), vue = vuS[0], setVue = vuS[1];
  var umS = React.useState([]), urlsMini = umS[0], setUrlsMini = umS[1];
  /* Etat 18 (13/08, session 134) : le choix de PRESENTATION — null = defiler
     (le chapelet), "hd" = story composee, "modele-X" = un modele Premium. */
  /* 19s : plus de chapelet — des 2 photos, la composition est le comportement
     par defaut et non plus une option. */
  var cpS = React.useState("hd"), compoChoix = cpS[0], setCompoChoix = cpS[1];
  /* Etat 19 (14/08, session 136) : LE CADRAGE, photo par photo.
     { "<index>": { actif: true, cx: 0.5 } } — seules les photos plus LARGES
     que hautes en recoivent un ; les autres n'en ont pas besoin. */
  var cdS = React.useState({}), cadrages = cdS[0], setCadrages = cdS[1];
  /* 19aa (14/08, decision de Blandine) — LE CADRAGE SE DEVINE, IL NE SE
     DEMANDE PLUS. Ses mots : « je lui ai donne deux photos horizontales et
     quand il m'a montre ce que ca donnera il m'en a passe une en verticale »,
     puis « ca peut pas etre revele de facon intuitive sinon » et « oui c'est
     ca » sur la detection automatique.
     Desormais l'app REGARDE les photos : une photo plus large que haute part
     ENTIERE (fond immersif derriere), une photo debout remplit l'ecran. Aucune
     case a cocher. Le bloc de reglage reste accessible, mais REPLIE : il ne
     s'ouvre que si Blandine veut forcer autre chose. */
  var ocS = React.useState(false), cadrageOuvert = ocS[0], setCadrageOuvert = ocS[1];
  /* 19d (14/08, feu vert de Blandine) : LE DECOR D'UNE PHOTO SEULE.
     Sa question : « pourquoi il n'apparait qu'a partir de 2 photos alors que
     la moitie ne propose qu'une photo ? ». Les modeles avaient ete greffes
     DANS le bloc Presentation, qui repond a une autre question (plusieurs
     photos : chapelet ou assemblees ?) et exigeait donc 2 photos. Les 13
     modeles a une fenetre dormaient depuis toujours. Le decor devient ici sa
     propre question, posee des UNE photo. */
  var dcS = React.useState(null), decorChoix = dcS[0], setDecorChoix = dcS[1];
  /* 19r (14/08, demande de Blandine) : « qu'on puisse previsualiser nos photos
     dans la story choisie et qu'on puisse les recadrer, parce que si c'est
     pour avoir juste une oreille du cheval sur une des photos puis le pied
     tout seul sur une autre ca sert a rien ». Chaque FENETRE a son propre
     format : le cadrage ne se decide donc qu'APRES le choix du decor.
     { "<rang de fenetre>": { cx, cy } }, 0,5 = centre. */
  var cfS = React.useState({}), cadresFen = cfS[0], setCadresFen = cfS[1];
  var fvS = React.useState(0), fenVue = fvS[0], setFenVue = fvS[1];
  function ratioFenetre(ref, ix) {
    try { var m = hsModeles()[ref]; var f = m && m.fenetres && m.fenetres[ix]; return (f && f.bbox && f.bbox[3]) ? (f.bbox[2] / f.bbox[3]) : 1; } catch (e) { return 1; }
  }
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

  /* 19o (14/08, signalement de Blandine) : « quand on met les photos on peut
     plus en retirer une pour passer de 4 a 3, meme avant de publier ». Il
     fallait tout annuler et recommencer la selection. On garde donc les
     photos ECARTEES (par leur index d'origine) et on les retire de la liste. */
  var ecS = React.useState({}), ecartees = ecS[0], setEcartees = ecS[1];
  /* 19p (14/08, question de Blandine : « je vais ou pour ajouter d'autres
     photos sur ma story ? »). Nulle part : une fois la feuille ouverte, il
     fallait tout annuler et refaire la selection depuis le rond +. On peut
     desormais en ajouter sans quitter le composeur. */
  var apS = React.useState([]), ajoutees = apS[0], setAjoutees = apS[1];
  /* ⚠️ 19an — AJOUTÉ EN DERNIER, VOLONTAIREMENT. Le harnais de tests lit les
     `useState` de ce composant DANS L'ORDRE : insérer un état au milieu
     casserait les vérifications en silence. Tout nouvel état se pose ICI. */
  var duS = React.useState(false), dureeLongue = duS[0], setDureeLongue = duS[1];
  /* 19an : pour conduire à la page Premium quand le mois est touché sans
     abonnement. Le module y accède déjà ailleurs de la même façon. */
  var appCompo = (typeof useApp === "function") ? useApp() : null;
  var entreePlusRef = React.useRef(null);
  fichiers = fichiers.concat(ajoutees);
  function surPhotosEnPlus(ev) {
    try {
      var neuves = (ev && ev.target && ev.target.files) ? Array.prototype.slice.call(ev.target.files) : [];
      if (ev && ev.target) ev.target.value = "";
      if (!neuves.length) return;
      setAjoutees(function (anc) {
        var tout = anc.concat(neuves);
        return tout.slice(0, Math.max(0, HS_MULTI_MAX - (props.fichier ? (props.fichier.length || 1) : 0)));
      });
      setOrdre(null);
    } catch (e) { }
  }
  var fichiersBruts = fichiers;                       /* la selection d'origine */
  fichiers = fichiersBruts.filter(function (f, ix) { return !ecartees[String(ix)]; });
  function ecarterPhoto(f) {
    try {
      if (fichiers.length <= 1) return;               /* jamais la derniere */
      var ixBrut = fichiersBruts.indexOf(f);
      if (ixBrut < 0) return;
      setEcartees(function (anc) { var n = Object.assign({}, anc); n[String(ixBrut)] = true; return n; });
      setOrdre(null); setVue(0); setCadrages({});     /* les rangs changent */
    } catch (e) { }
  }

  /* Le geste retour (bord d'écran iOS) ferme le composeur SEUL — signalement
     de Blandine (13/08, 15h40) : glisser entre les photos déclenchait le
     retour système, qui fermait TOUT et changeait de page. Même rail que la
     visionneuse, consulté avant elle. */
  React.useEffect(function () {
    if (typeof window === "undefined") return;
    window.__hsComposeurRetour = function () {
      try { if (props.onFermer) props.onFermer(); return true; } catch (e) { return false; }
    };
    return function () { try { delete window.__hsComposeurRetour; } catch (e) { window.__hsComposeurRetour = null; } };
  }, []);

  /* L'ordre effectif : `ordre` (indices) reordonne la selection ; null =
     ordre d'origine. C'est CETTE liste que publier() parcourt. */
  var fichiersOrdonnes = fichiers;
  try { if (ordre && ordre.length === fichiers.length) fichiersOrdonnes = ordre.map(function (ix) { return fichiers[ix]; }); } catch (eO) { fichiersOrdonnes = fichiers; }
  var vueSure = (vue >= 0 && vue < fichiersOrdonnes.length) ? vue : 0;

  /* 19b (decision de Blandine du 14/08) : en MODE AJOUT, la presentation est
     proposee aussi — « le groupe absorbe la story en ligne ». Le plafond de 5
     compte donc les photos DEJA EN LIGNE : une story seule + 4 nouvelles, une
     composee de 3 + 2 nouvelles. Au-dela, pas de bloc Presentation : c'est le
     chapelet, comme avant. */
  var nDejaEnLigne = (props.origine && props.origine.n) ? props.origine.n : (props.origine ? 1 : 0);
  var nTotalCompo = nDejaEnLigne + fichiersOrdonnes.length;
  var compoPossible = !!(HS_COMPO_ACTIF && nTotalCompo >= 2 && nTotalCompo <= HS_COMPO_MAX);

  /* L'apercu suit la photo PREVISUALISEE (tap sur une miniature).
     19b : plus jamais le fichier d'origine — une copie A LA TAILLE DE L'ECRAN,
     fabriquee au canvas (hsVignetteFichier). C'etait le sixieme decodage plein
     format du composeur. */
  React.useEffect(function () {
    var vivant = true; var mien = null;
    (async function () {
      try {
        var f = fichiersOrdonnes[vueSure] || fichiers[0];
        if (!f) return;
        var u = await hsVignetteFichier(f, hsCoteEcran());
        if (!vivant) { hsLibererUrl(u); return; }
        mien = u;
        if (u) setApercu(u);
      } catch (e) { }
    })();
    return function () { vivant = false; hsLibererUrl(mien); };
  }, [props.fichier, vueSure, ordre]);

  /* Les miniatures — 19v (14/08). DEUX FAUTES CORRIGEES D'UN COUP.
     (1) L'effet se relancait DEPUIS ZERO a chaque changement de selection :
         ajouter deux photos refabriquait toute la serie, et les anciennes
         images n'etaient jamais relachees. « J'ai ajoute deux photos et paf »
         (Blandine, 21e sortie de l'appli). Desormais on ne fabrique que les
         MANQUANTES et on garde les autres.
     (2) Le repli de la 19s affichait la photo D'ORIGINE quand la fabrication
         echouait — donc un fichier d'iPhone plein format decode dans une
         vignette de 52 px. C'etait exactement la cause du plantage que la 19b
         avait supprimee : je l'avais reintroduite. Le repli est maintenant une
         case neutre, qui garde sa croix de retrait. */
  var minisRef = React.useRef([]);
  /* 19ab — LA FORME DE CHAQUE PHOTO, mesuree ici et nulle part ailleurs.
     `ratiosRef.current[i]` = largeur / hauteur de la photo brute n° i.
     > 1 = couchee, < 1 = debout, = 1 = carree.
     ⚠️ C'est volontairement un REF et non un etat : le harnais de tests
     adresse les etats du composeur PAR POSITION (voir le commentaire des
     etats 13-14). Ajouter un `useState` ici decalerait tout et casserait
     `t_19b.js` / `t_19c.js` en silence. Le rendu est declenche de toute
     facon par `setUrlsMini`, qui suit la meme boucle. */
  var ratiosRef = React.useRef([]);
  React.useEffect(function () {
    var vivant = true;
    (async function () {
      /* on repart de ce qui existe deja, on ne refait que ce qui manque */
      var res = minisRef.current.slice(0, fichiersBruts.length);
      ratiosRef.current = ratiosRef.current.slice(0, fichiersBruts.length);
      for (var i = 0; i < fichiersBruts.length; i++) {
        if (!vivant) break;
        if (res[i]) continue;
        var u = null; var inf = {};
        try { u = await hsVignetteFichier(fichiersBruts[i], 200, inf); } catch (e) { u = null; }
        if (!vivant) { hsLibererUrl(u); break; }
        res[i] = u || null;
        if (inf && inf.r) ratiosRef.current[i] = inf.r;
        minisRef.current = res;
        setUrlsMini(res.slice());
      }
      if (vivant) { minisRef.current = res; setUrlsMini(res.slice()); }
    })();
    return function () { vivant = false; };
  }, [props.fichier, fichiersBruts.length]);

  /* 19ab (14/08, signalement de Blandine : « on peut passer de 5 a 2, elle
     maintient le visuel a 5 ») — ⚠️ DEFAUT REEL, VISIBLE SUR SA CAPTURE :
     « Publier (2) » et QUATRE photos dans la maquette.
     Les deux apercus se construisaient sur `urlsMini`, qui est indexe sur
     `fichiersBruts` — la selection D'ORIGINE. Or retirer une photo ne la
     supprime pas de cette liste : `ecarterPhoto` la marque seulement comme
     ecartee. L'apercu continuait donc d'afficher les photos retirees, et
     mentait sur ce qui allait etre publie.
     Desormais les deux apercus lisent `fichiersOrdonnes` — EXACTEMENT la
     liste que `publier()` parcourt (~ligne 1772). Une seule source de verite.
     ⚠️ Ne jamais rebrancher un apercu sur `urlsMini` directement. */
  function hsVignettesRetenues() {
    try {
      return fichiersOrdonnes.map(function (f) {
        var ix = fichiersBruts.indexOf(f);
        return (ix >= 0) ? (urlsMini[ix] || null) : null;
      }).filter(function (u) { return !!u; });
    } catch (e) { return []; }
  }
  /* ⚠️ 19af — CORRECTION D'UNE FAUTE DE CLAUDE (19ac). L'editeur plein ecran
     recevait la liste FILTREE ci-dessus : une seule vignette pas encore prete
     et toutes les suivantes se DECALAIENT d'un rang — la photo 3 dans la
     fenetre 2, ou une fenetre vide. Sur la video de 08h48, des fenetres
     restaient vides pour cette raison. L'editeur recoit desormais la liste
     ALIGNEE, trous compris : `vign[i]` correspond TOUJOURS a la photo i.
     Les apercus du composeur, eux, gardent la liste filtree (pas de rangs). */
  function hsVignettesAlignees() {
    try {
      return fichiersOrdonnes.map(function (f) {
        var ix = fichiersBruts.indexOf(f);
        return (ix >= 0) ? (urlsMini[ix] || null) : null;
      });
    } catch (e) { return []; }
  }

  /* 19ab — les formes des photos RETENUES, dans l'ordre d'affichage.
     Les photos ecartees sont exclues : c'est bien la liste que l'on va
     comparer aux fenetres d'un decor. */
  function hsFormesRetenues() {
    try {
      return fichiersOrdonnes.map(function (f) {
        var ix = fichiersBruts.indexOf(f);
        var r = (ix >= 0) ? ratiosRef.current[ix] : null;
        return (typeof r === "number" && isFinite(r) && r > 0) ? r : null;
      });
    } catch (e) { return []; }
  }

  /* Les images ne sont relachees qu'a la FERMETURE de la feuille : pendant
     qu'elle est ouverte, chaque vignette gardee est une image de moins a
     refabriquer. */
  React.useEffect(function () {
    return function () {
      try { minisRef.current.forEach(hsLibererUrl); minisRef.current = []; } catch (e) { }
    };
  }, []);

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

  /* 19g : LA BANDE DE DECORS, commune au bloc « Le decor » (1 photo) et a
     « Composer » (2 a 5). Tout le catalogue defile ; un decor dont le nombre
     de fenetres ne colle pas est grise, porte son chiffre, et ne se choisit
     pas — une phrase dit alors ce qu'il demande. */
  var rfS = React.useState(null), refuse = rfS[0], setRefuse = rfS[1];
  /* 19w (14/08) — LA VRAIE CAUSE DES SORTIES D'APPLI. « J'essayais d'utiliser
     un des fonds de story et hop » (Blandine, 22e sortie).
     Chaque decor est un 941x1672 avec transparence : SIX MEGAOCTETS une fois
     decode. La bande en montait VINGT-HUIT a la file — 168 Mo de bitmaps pour
     des vignettes de 84 px. iOS fermait l'onglet. Et c'est moi qui ai agrandi
     cette bande cet apres-midi puis ajoute cinq decors : chaque amelioration
     rendait la sortie plus certaine.
     Ici : seuls quelques decors sont montes a la fois, la fenetre suit le
     defilement. Le catalogue reste entier, la memoire non. */
  var vfS = React.useState(6), voletFin = vfS[0], setVoletFin = vfS[1];
  /* 19ac — DERNIER ETAT DU COMPOSEUR : quel decor est ouvert en plein format
     (null = aucun). ⚠️ Declare EN DERNIER, apres tous les autres : le harnais
     de tests adresse les etats du composeur PAR POSITION, l'inserer plus haut
     decalerait `cadrages`, `cadresFen` et les suivants, et casserait
     `t_19b.js` / `t_19c.js` EN SILENCE. */
  var edS = React.useState(null), editeur = edS[0], setEditeur = edS[1];
  function bandeModeles(nCible, valeur, choisir, avecAucun) {
    /* 19ab (14/08, feu vert de Blandine : « on devrait seulement proposer les
       fonds correspondant au nombre de photos, sinon c'est surcharge »).
       ⚠️ RENVERSEMENT ASSUME DE LA 19g. Ce jour-la, ses mots etaient « on
       montre tout je pense » : tout le catalogue defilait, les incompatibles
       portant seulement une pastille chiffree. Elle a demande l'inverse hier
       soir. `hsModelesPourN` existait depuis le debut et n'etait appelee
       NULLE PART — la decision avait ete prise, jamais ecrite.
       Le plafond etant de 5 photos (HS_MULTI_MAX) et le catalogue couvrant
       1 a 5 fenetres, le cas « aucun decor ne correspond » ne peut pas se
       produire par le nombre. Le repli reste pose par prudence : si le
       catalogue venait a manquer pour un compte donne, on remontre tout
       plutot que de laisser la bande VIDE. */
    var listeTotale = hsModelesPourN(nCible);
    if (!listeTotale.length) listeTotale = hsTousModeles(nCible);
    /* 19ae — LES DECORS A TEXTE FRANCAIS, reserves au francais.
       Option B, validee par Blandine le 14/08 : « on peut virer les modeles
       avec du texte francais » puis, apres discussion, on ne les RETIRE PAS —
       ils n'apparaissent QU'EN FRANCAIS. Rien n'est jete.
       ⚠️ Liste tenue a la main : un decor portant du texte en dur doit etre
       ajoute ICI le jour ou il entre au catalogue, sinon un cavalier japonais
       verra du francais dans sa story. */
    try {
      if (String(lg || "fr").slice(0, 2) !== "fr") {
        listeTotale = listeTotale.filter(function (k) { return HS_DECORS_TEXTE_FR.indexOf(k) < 0; });
      }
    } catch (eTx) { }
    /* Puis le classement par ACCORD DES FORMES : a nombre de fenetres egal,
       le decor qui coupe le moins tes photos passe devant. Deux photos
       couchees font remonter les decors a fenetres couchees.
       ⚠️ Classement seulement, aucun decor n'est retire : le choix reste
       entier, il est juste presente dans le bon ordre. */
    try {
      var formes = hsFormesRetenues();
      var connu = formes.some(function (r) { return typeof r === "number"; });
      if (connu) {
        var score = {};
        listeTotale.forEach(function (k) { score[k] = hsAccordModele(k, formes); });
        listeTotale = listeTotale.slice().sort(function (a, b) {
          if (score[a] !== score[b]) return score[a] - score[b];
          return a < b ? -1 : 1;
        });
      }
    } catch (eF) { }
    var liste = listeTotale.slice(0, voletFin);
    return h("div", null,
      /* 19m (14/08) : « le rail ne defile pas, on ne voit pas les suivantes ».
         Il manquait `data-hscroll` : sans lui, le gestionnaire de swipe de
         l'index (ligne 21151) avale le geste horizontal et la bande reste
         bloquee sur les premieres vignettes. Toutes les autres bandes du
         module l'avaient ; celle-ci, ecrite en 19g, ne l'avait pas. */
      h("div", {
        "data-hscroll": "1",
        /* la fenetre s'agrandit quand on approche du bout, jamais d'un bloc */
        onScroll: function (ev) {
          try {
            var el = ev.target;
            if (el.scrollLeft + el.clientWidth > el.scrollWidth - 220) {
              setVoletFin(function (n) { return Math.min(n + 4, listeTotale.length); });
            }
          } catch (e) { }
        },
        style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity" }
      },
        avecAucun
          ? h("button", {
            key: "aucun",
            onClick: function () { setRefuse(null); choisir(null); },
            style: {
              /* 19l (14/08, demande de Blandine : « les fonds de story sont
                 trop petits on peut franchement les agrandir ») : 52x82 ->
                 84x132. On voit enfin la composition de chaque decor. */
              flex: "0 0 auto", width: 84, height: 132, borderRadius: 12, cursor: "pointer",
              background: "#111417", color: valeur ? "#8A929C" : tn,
              border: "2px solid " + (valeur ? "rgba(255,255,255,0.16)" : tn),
              fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: 0.3, padding: 2
            }
          }, hsT("aucunDecor", lg))
          : null,
        liste.map(function (ref) {
          var nf = hsFenetresDe(ref);
          var compatible = (nf === nCible);
          var actif = (valeur === ref);
          return h("button", {
            key: ref,
            onClick: function () {
              if (!compatible) { setRefuse(nf); return; }
              setRefuse(null); choisir(actif ? null : ref);
            },
            style: {
              flex: "0 0 auto", padding: 0, border: "none", background: "none",
              cursor: "pointer", position: "relative"
              /* 19k (14/08, mot de Blandine) : « ne grise pas les fonds qui
                 n'ont pas le bon nombre car on ne les voit plus du tout ».
                 Plus d'opacite reduite ni de grayscale : tous les decors se
                 voient en entier. Seule la PASTILLE chiffree les distingue —
                 turquoise quand le compte colle, sombre sinon. */
            }
          },
            h("img", {
              /* 19x : la bande charge `modele-XX-mini.webp` — 176 px de large,
                 0,21 Mo decode au lieu de 6,0.
                 19ab (14/08, feu vert de Blandine) : ⚠️ LE REPLI EST SUPPRIME.
                 Il rechargeait `modele-XX.webp` PLEIN FORMAT quand la vignette
                 manquait — 6 Mo decodes, exactement la panne memoire que la 19x
                 pretendait avoir refermee. Or 19 vignettes manquent encore
                 (`modele-5` a `modele-23`) : la protection ne couvrait qu'une
                 poignee de decors. Sans repli, un decor sans vignette montre son
                 fond argente et sa pastille chiffree — il reste CHOISISSABLE,
                 rien ne disparait, et l'appli ne peut plus fermer.
                 ⚠️ NE JAMAIS REMETTRE DE `onError` QUI CHARGE LE PLEIN FORMAT.
                 Le remede est de pousser les vignettes, pas de recharger lourd. */
              /* ⚠️ 19ad — CORRECTION D'UNE FAUTE DE CLAUDE (19ac). En retirant le
                 repli vers le plein format, j'ai laisse le navigateur afficher
                 son ICONE D'IMAGE CASSEE, plus le nom du fichier ecrit en bleu
                 par `alt`. Blandine : « beaucoup de cadres story n'apparaissent
                 plus et laissent un fond bizarre ». Je lui avais annonce un
                 fond argente propre ; je ne l'avais pas ecrit.
                 Desormais : vignette absente = l'image s'efface, la carte garde
                 son degrade argente et sa pastille chiffree. Le decor reste
                 choisissable. `alt` vide : plus aucun nom de fichier a l'ecran.
                 ⚠️ Ce `onError` NE CHARGE RIEN — il masque. Ne jamais y remettre
                 un `im.src = ref + ".webp"` : ce serait 6 Mo et la fermeture. */
              src: ref + "-mini.webp", alt: "", loading: "lazy", decoding: "async",
              onError: function (ev) { try { if (ev && ev.target) ev.target.style.visibility = "hidden"; } catch (eM) { } },
              /* 19j (14/08) : « on voit rien pour les modeles ». Evidemment :
                 un decor est un dessin NOIR dont les fenetres sont des TROUS,
                 pose sur un fond noir — il n'y avait rien a voir. La vignette
                 recoit donc un fond clair : le dessin ressort en noir et les
                 fenetres apparaissent en argent. */
              style: {
                width: 84, height: 132, objectFit: "cover", borderRadius: 12, display: "block",
                background: "linear-gradient(155deg, #F4F7FA 0%, #C9D3D8 55%, #8A929C 100%)",
                border: "2px solid " + (actif ? tn : "rgba(255,255,255,0.16)"),
                boxShadow: actif ? ("0 0 12px " + tA(0.35)) : "none"
              }
            }),
            h("span", {
              style: {
                position: "absolute", right: 5, bottom: 5, minWidth: 19, height: 19, borderRadius: 999,
                background: compatible ? tA(0.9) : "rgba(10,12,14,0.85)",
                color: compatible ? "#04252A" : "#C9D3D8",
                fontFamily: M, fontSize: 11, fontWeight: 800, lineHeight: "19px", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.22)", padding: "0 3px"
              }
            }, String(nf)));
        }),
        /* 19w : dire qu'il en reste, sans les monter. */
        (listeTotale.length > liste.length)
          ? h("button", {
            key: "plus",
            onClick: function () { setVoletFin(function (n) { return Math.min(n + 6, listeTotale.length); }); },
            style: {
              flex: "0 0 auto", width: 84, height: 132, borderRadius: 12, cursor: "pointer",
              background: "#111417", border: "2px dashed rgba(255,255,255,0.22)",
              color: tnL, fontFamily: M, fontSize: 12, fontWeight: 700
            }
          }, "+" + (listeTotale.length - liste.length))
          : null),
      refuse
        ? h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", marginTop: 8, lineHeight: 1.5 } },
          refuse === 1 ? hsT("decorDemande1", lg) : hsT("decorDemande", lg).replace("%n", String(refuse)))
        : null);
  }

  /* Le cadrage de la photo actuellement previsualisee. */
  function cadrageDe(ix) { try { return cadrages[String(ix)] || null; } catch (e) { return null; } }
  function poserCadrage(ix, val) {
    setCadrages(function (anc) {
      var n = Object.assign({}, anc);
      if (val) n[String(ix)] = val; else delete n[String(ix)];
      return n;
    });
  }
  var cadrageVue = cadrageDe(vueSure);
  var photoLarge = !!(dimPhoto && dimPhoto.w > dimPhoto.hh);

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
      /* STORY COMPOSEE (13/08) : si l'auteur a choisi Composer ou un modele,
         toutes les photos partagent un meme groupe ; la disposition part avec
         chacune (la couverture du repli prend la premiere qui en porte). */
      var grpId = (compoChoix && compoPossible)
        ? ((props.origine && props.origine.groupe) ? props.origine.groupe : hsUuid())
        : null;
      /* 19b : L'ABSORPTION. En mode ajout, la story DEJA EN LIGNE rejoint le
         groupe AVANT toute insertion — elle est la plus ancienne, donc la
         couverture, donc la grande. Si cette ecriture echoue, on n'insere
         rien : une demi-composition serait pire que rien, et l'echec est dit. */
      if (grpId && props.origine) {
        var rAbs = await hsRattacherAuGroupe(
          (props.origine.ids && props.origine.ids.length) ? props.origine.ids : [props.origine.id],
          grpId, compoChoix);
        if (rAbs && rAbs.error) { setBusy(false); if (props.onEchec) props.onEchec(); return; }
      }
      for (var iF = 0; iF < fichiersOrdonnes.length; iF++) {
        /* 19c : le cadrage choisi est applique ICI, juste avant l'envoi. La
           photo partante est refabriquee ; l'original de l'iPhone n'est pas
           touche, mais ce qui sort du cadre ne part pas. */
        var fEnvoi = fichiersOrdonnes[iF];
        try {
          /* 19r : dans un DECOR, chaque photo est decoupee au format exact de
             SA fenetre, avec le placement choisi au doigt. Sinon, le cadrage
             plein ecran 9/16 s'applique comme avant. */
          var refDeco = (grpId && compoChoix && String(compoChoix).indexOf("modele-") === 0) ? compoChoix
            : ((!grpId && decorChoix && fichiersOrdonnes.length === 1) ? decorChoix : null);
          if (refDeco) {
            var rangFen = iF + ((props.origine && props.origine.n) ? props.origine.n : 0);
            var rr = ratioFenetre(refDeco, rangFen);
            var cf = cadresFen[String(rangFen)] || { cx: 0.5, cy: 0.5 };
            /* 19ac : le zoom pose dans l'ecran plein format part avec la
               photo. Sans lui, Blandine placait sa photo a l'ecran et
               retrouvait le cadrage d'origine une fois publiee.
               19af (feu vert du 15/08) : LA FORME DECIDE DU REMPLISSAGE.
               Perte faible = la photo couvre sa fenetre, comme avant.
               Perte forte (photo couchee dans une fenetre debout, ou
               l'inverse) = la photo part ENTIERE sur son propre flou —
               plus JAMAIS de coupe de force. */
            if (rr > 0) {
              var rBrut = null;
              try {
                var ixB = fichiersBruts.indexOf(fichiersOrdonnes[iF]);
                rBrut = (ixB >= 0) ? ratiosRef.current[ixB] : null;
              } catch (eRb) { rBrut = null; }
              var coupe = (typeof rBrut === "number" && isFinite(rBrut) && rBrut > 0)
                ? hsPertePhoto(rBrut, rr) : 0;
              fEnvoi = (coupe > HS_SEUIL_COUPE)
                ? await hsEntierFichier(fEnvoi, rr, cf.z)
                : await hsRecadrerFichier(fEnvoi, cf.cx, rr, cf.cy, cf.z);
            }
          } else {
            var cad = cadrageDe(iF);
            if (cad && cad.actif) fEnvoi = await hsRecadrerFichier(fEnvoi, cad.cx);
          }
        } catch (eCd) { fEnvoi = fichiersOrdonnes[iF]; }
        var rI = await hsPublierStory(
          fEnvoi,
          iF === 0 ? legende : null,
          lieu,
          iF === 0 ? tags : [],
          musique,
          fond,
          grpId,
          /* 19b : en mode ajout la disposition vit deja sur la story absorbee
             (la couverture) — les nouvelles n'en portent pas.
             19d : sans groupe, une photo seule porte son DECOR. */
          grpId
            ? ((!props.origine) ? compoChoix : null)
            : ((!props.origine && fichiersOrdonnes.length === 1 && iF === 0) ? decorChoix : null),
          /* 19an : la durée choisie. Le mois n'est retenu que si l'abonnement
             est bien là — un état d'interface ne suffit pas à décider d'un
             droit. */
          (dureeLongue && props.premium) ? HS_DUREE_LONG_MS : HS_DUREE_MS
        );
        dernierR = rI;
        /* 19c : une composition refusee ARRETE TOUT, immediatement et par son
           nom. Plus jamais un chapelet muet a la place d'une composition. */
        if (rI && rI.compoRefusee) {
          setBusy(false);
          if (props.onEchec) props.onEchec(hsT("compoImpossible", lg));
          return;
        }
        if (rI && rI.decorRefuse) {
          setBusy(false);
          if (props.onEchec) props.onEchec(hsT("decorImpossible", lg));
          return;
        }
        if (rI && !rI.error) { okN++; if (rI.lieuIgnore) lieuIgn = true; }
      }
      setBusy(false);
      if (okN === 0) { if (props.onEchec) props.onEchec(); return; }
      if (okN < fichiersOrdonnes.length && props.onPublie) { props.onPublie(lieuIgn, okN + "/" + fichiersOrdonnes.length + " " + hsT("partiel", lg)); return; }
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
      /* ⚠️ 19ai (15/08) — LA CAUSE DE « JE ME FAIS SORTIR ». Trouvee sur la
         video de 09h29 : Blandine touche « Annuler » dans l'ecran plein
         format, et c'est TOUTE la story qui disparait — retour au profil,
         photos perdues, tout a refaire.
         Ce `div` est le FOND du composeur : son `onClick` ferme la feuille.
         Or il n'est pas seulement le fond, il est aussi le PARENT de tout ce
         qui est monte ici — la feuille (qui, elle, arrete le clic ligne 2617)
         mais AUSSI l'ecran plein format (~3125), qui ne l'arretait pas. Le
         moindre toucher dans l'editeur remontait donc jusqu'ici et fermait le
         composeur. Annuler, valider, deplacer une photo, choisir un fond :
         tous fermaient la story.
         `e.target === e.currentTarget` = on ne ferme QUE si le doigt a touche
         le fond lui-meme, jamais un enfant. C'est la protection qui vaut pour
         tout ce qu'on montera ici a l'avenir, sans avoir a y penser.
         ⚠️ NE JAMAIS revenir a un `onClick` nu sur un fond de feuille. */
      onClick: function (e) {
        try { if (e && e.target !== e.currentTarget) return; } catch (eF) { }
        if (!busy && props.onFermer) props.onFermer();
      },
      /* dessus:true = ouvert DEPUIS la visionneuse (9300) : il passe devant. */
      /* ⚠️ 19ai — LE NAVIGATEUR PAR SWIPE DE L'INDEX PASSAIT ENCORE ICI.
         La 19ah avait pose `data-noswipe` sur le SEUL ecran plein format ;
         le composeur, ses feuilles et la visionneuse ne le portaient pas. Un
         glisse horizontal de plus de 65 px n'importe ou dedans — effleurer
         une photo, la deplacer, faire defiler une bande — declenchait
         `retourEcran()` : l'ecran change SOUS la feuille, elle se demonte, la
         story est perdue. Mots de Blandine : « j'effleure du doigt une photo
         tout saute ».
         ⚠️ REGLE : TOUT ecran fixe de ce module porte `data-noswipe`. */
      "data-noswipe": "1",
      style: { position: "fixed", inset: 0, zIndex: (props.dessus ? 9450 : 9200), background: "rgba(4,6,9,0.86)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        /* 19q (14/08, signalement de Blandine) : « le bouton annuler est hors
           cadre tout en bas, meme en scrollant au max on n'arrive pas a
           cliquer dessus, on est oblige de quitter l'appli ». Deux fautes :
           (1) `boxSizing` manquait — le rembourrage s'AJOUTAIT aux 92vh, donc
           le bas de la feuille sortait de l'ecran (les deux autres feuilles du
           module l'avaient, celle-ci non) ; (2) la reserve du bas ne tenait
           pas compte de la barre d'onglets. */
        style: { width: "100%", boxSizing: "border-box", maxWidth: 520, maxHeight: "88vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 104px)" }
      },
        /* 19b (decision de Blandine, 14/08) : PUBLIER VIT DANS L'EN-TETE, en
           haut a droite, et l'en-tete est COLLANT. Ses mots : « on voit pas
           vraiment de bouton clairement pour valider, on sait pas trop ce
           qu'on fait ». La feuille est longue (apercu + bande + presentation
           + legende + lieu + musique) : le bouton ne doit plus attendre au
           fond. Annuler reste en bas, la ou on abandonne. */
        h("div", {
          style: {
            position: "sticky", top: 0, zIndex: 6,
            margin: "-18px -16px 0", padding: "12px 16px 10px",
            background: "linear-gradient(180deg, #111417 78%, rgba(17,20,23,0))"
          }
        },
          h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 12px" } }),
          h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
            /* 19q : LA SORTIE NE DEPEND PLUS DU DEFILEMENT. Une croix vit dans
               l'en-tete collant, a cote de Publier : quoi qu'il arrive en bas
               de la feuille, on peut toujours refermer. */
            h("button", {
              onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
              "aria-label": hsT("annuler", lg),
              style: {
                flex: "0 0 auto", width: 34, height: 34, borderRadius: 999, cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.22)", background: "rgba(10,12,14,0.75)",
                color: "#C9D3D8", fontFamily: M, fontSize: 16, fontWeight: 700, lineHeight: "30px", padding: 0
              }
            }, "\u00d7"),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontFamily: C, fontSize: 13.5, letterSpacing: 1.6, textTransform: "uppercase", color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, hsT(props.origine ? "ajoutASaStory" : "ajouter", lg)),
              h("div", { style: { fontSize: 10.5, fontFamily: M, color: tA(0.9), marginTop: 5, letterSpacing: 0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, hsT("duree", lg))),
            h("button", {
              onClick: publier, disabled: busy,
              style: {
                flex: "0 0 auto", padding: "11px 20px", borderRadius: 999, border: "none",
                background: busy ? "rgba(32,217,245,0.35)" : ("linear-gradient(90deg," + tn + "," + tnL + ")"),
                color: "#04252A", fontSize: 12.5, fontWeight: 800, fontFamily: M,
                cursor: busy ? "default" : "pointer", boxShadow: busy ? "none" : ("0 0 18px " + tA(0.35))
              }
            }, busy
              ? (fichiers.length > 1 ? (hsT("envoiMulti", lg) + "\u2026") : hsT("envoi", lg))
              : (fichiers.length > 1 ? (hsT("publier", lg) + " (" + fichiers.length + ")") : hsT("publier", lg))))),

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
              /* 19c : quand le cadrage est actif, l'apercu montre EXACTEMENT
                 la bande verticale qui sera envoyee — meme ratio, meme
                 centre. Aucun filtre n'est pose sur la photo. */
              style: (cadrageVue && cadrageVue.actif)
                ? { height: "38vh", aspectRatio: "9 / 16", objectFit: "cover", objectPosition: (Math.round(cadrageVue.cx * 100) + "% 50%"), display: "block", position: "relative" }
                : { width: "100%", maxHeight: "38vh", objectFit: "contain", display: "block", position: "relative" }
            })))
          : null,

        /* 19d — LE DECOR, des UNE photo. Question distincte de la
           disposition : celle-ci arrange plusieurs photos, celui-la encadre
           une photo. Reserve aux membres Premium comme les autres modeles. */
        (HS_COMPO_ACTIF && !props.origine && fichiersOrdonnes.length === 1)
          ? h("div", { style: { marginTop: 14 } },
            titreBloc(hsT("decor", lg)),
            props.premium
              ? bandeModeles(1, decorChoix, function (v) { setDecorChoix(v); }, true)
              : h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", letterSpacing: 0.3 } }, hsT("modelesPremium", lg)))
          : null,

        /* 19aa (14/08, decision de Blandine) — LE CADRAGE SE DEVINE.
           Avant : un bloc ouvert demandait « Photo entiere ou Remplir l'ecran »
           pour la SEULE photo previsualisee. Blandine reglait la premiere,
           passait a la seconde, et decouvrait a l'apercu que la seconde n'avait
           rien recu : « je lui ai donne deux photos horizontales et il m'en a
           passe une en verticale ».
           Desormais l'app REGARDE : une photo plus large que haute part ENTIERE
           (le fond immersif habille les cotes), une photo debout remplit
           l'ecran. Aucun geste, aucune case. Le reglage reste atteignable mais
           REPLIE — il ne s'ouvre que pour forcer autre chose. */
        photoLarge
          ? h("div", { style: { marginTop: 14 } },
            cadrageOuvert
              ? h("div", null,
                titreBloc(hsT("cadrer", lg)),
                h("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                  puce(!(cadrageVue && cadrageVue.actif), hsT("photoEntiere", lg), function () { poserCadrage(vueSure, null); }, "cdN"),
                  puce(!!(cadrageVue && cadrageVue.actif), hsT("remplirEcran", lg), function () { poserCadrage(vueSure, { actif: true, cx: (cadrageVue && typeof cadrageVue.cx === "number") ? cadrageVue.cx : 0.5 }); }, "cdO")),
                (cadrageVue && cadrageVue.actif)
                  ? h("div", { style: { marginTop: 10 } },
                    h("input", {
                      type: "range", min: 0, max: 100, step: 1,
                      defaultValue: Math.round(cadrageVue.cx * 100),
                      key: "cdr" + vueSure,
                      "aria-label": hsT("cadrer", lg),
                      /* Meme regle qu'au curseur des decors : rien n'est ecrit
                         pendant le glisse, l'etat n'est pose qu'au relachement. */
                      onChange: function (ev) { try { poserCadrage(vueSure, { actif: true, cx: (Number(ev.target.value) || 0) / 100 }); } catch (eS) { } },
                      style: { width: "100%", accentColor: tn }
                    }),
                    h("div", { style: { fontSize: 16, fontFamily: M, color: "#8A929C", marginTop: 6, lineHeight: 1.5 } }, hsT("cadrageCoupe", lg)))
                  : null)
              : h("div", null,
                h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", lineHeight: 1.5 } }, hsT("cadrageAuto", lg)),
                h("button", {
                  onClick: function () { setCadrageOuvert(true); },
                  style: { marginTop: 8, padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700, border: "1px solid " + tA(0.45), background: "transparent", color: tn }
                }, hsT("changerCadrage", lg))))
          : null,

        /* 19p : la bande s'affiche DES UNE photo, sinon le bouton
           « + Ajouter des photos » serait invisible la ou il sert le plus. */
        (fichiers.length >= 1 || props.origine)
          ? h("div", null,
            h("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 } },
              h("span", { style: { padding: "5px 11px", borderRadius: 999, fontSize: 11, fontFamily: M, fontWeight: 800, border: "1px solid " + tA(0.55), color: tn, background: "rgba(32,217,245,0.08)" } }, fichiers.length + " " + hsT("photosChoisies", lg))),
            /* La bande : la story EN LIGNE d'abord (en mode ajout, non
               touchable, etiquetee), puis chaque nouvelle photo. Un tap
               previsualise ; le bouton dessous met la photo vue en premier. */
            h("div", { "data-hscroll": "1", style: { display: "flex", gap: 7, overflowX: "auto", padding: "10px 0 2px", WebkitOverflowScrolling: "touch" } },
              (props.origine && props.origine.url
                ? [h("div", { key: "orig", style: { flex: "0 0 auto", position: "relative", opacity: 0.6 } },
                  h("img", { src: props.origine.url, alt: "", style: { width: 52, height: 68, objectFit: "cover", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", display: "block" } }),
                  h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 3, textAlign: "center", fontSize: 7.5, fontFamily: M, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#DCE3E8", textShadow: "0 1px 3px #000" } }, hsT("dejaEnLigne", lg)))]
                : []).concat(fichiersOrdonnes.map(function (f, ix) {
                  var actifV = (ix === vueSure);
                  var uMini = null;
                  try { var posBrut = fichiersBruts.indexOf(f); uMini = urlsMini[posBrut] || null; } catch (eU) { }
                  return h("div", { key: "th" + ix, style: { flex: "0 0 auto", position: "relative" } },
                    /* 19o : la croix de retrait. Elle n'apparait qu'a partir
                       de deux photos — on ne retire pas la derniere. */
                    (fichiersOrdonnes.length > 1)
                      ? h("button", {
                        onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); ecarterPhoto(f); },
                        "aria-label": hsT("retirerPhoto", lg),
                        style: {
                          position: "absolute", top: -5, right: -5, zIndex: 2,
                          width: 21, height: 21, borderRadius: 999, cursor: "pointer",
                          border: "1px solid rgba(255,255,255,0.3)", background: "rgba(10,12,14,0.92)",
                          color: "#F4F7FA", fontFamily: M, fontSize: 12, fontWeight: 700, lineHeight: "19px", padding: 0
                        }
                      }, "\u00d7")
                      : null,
                    h("button", {
                    onClick: function () { setVue(ix); },
                    style: { padding: 0, border: "none", background: "none", cursor: "pointer", display: "block" }
                  },
                    uMini
                      ? h("img", { src: uMini, alt: "", style: { width: 52, height: 68, objectFit: "cover", borderRadius: 10, display: "block", border: "2px solid " + (actifV ? tn : "rgba(255,255,255,0.16)"), boxShadow: actifV ? ("0 0 12px " + tA(0.35)) : "none" } })
                      /* 19v : la case d'attente porte son RANG, pour qu'on
                         sache quelle photo on retire meme si sa vignette
                         n'est pas encore prete. */
                      : h("div", {
                        style: {
                          width: 52, height: 68, borderRadius: 10, background: "#111417",
                          border: "2px solid " + (actifV ? tn : "rgba(255,255,255,0.16)"),
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#5C666F", fontFamily: M, fontSize: 15, fontWeight: 700
                        }
                      }, String(ix + 1))));
                }))),
            h("input", {
              ref: entreePlusRef, type: "file", accept: "image/*", multiple: true,
              onChange: surPhotosEnPlus, style: { display: "none" }
            }),
            (fichiers.length < HS_MULTI_MAX)
              ? h("button", {
                onClick: function () { try { if (entreePlusRef.current) entreePlusRef.current.click(); } catch (eC) { } },
                style: { marginTop: 8, marginRight: 8, padding: "9px 14px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700, border: "1px solid " + tA(0.5), background: "transparent", color: tnL }
              }, "+ " + hsT("ajouterPhotos", lg))
              : null,
            /* 19ae — LE BOUTON EST DESORMAIS TOUJOURS LA des qu'il y a
               plusieurs photos. Avant, la condition `vueSure > 0` le rendait
               INVISIBLE tant que Blandine n'avait pas touche une autre photo
               que la premiere : le seul moyen de decouvrir qu'on pouvait
               choisir l'ordre etait d'avoir deja devine qu'il existait.
               Son signalement du 14/08 : « je peux plus decider de laquelle
               va en haut et en bas ».
               Sur la premiere photo il est simplement DESACTIVE — visible,
               grise, explicite : elle est deja en premier. */
            (fichiersOrdonnes.length > 1)
              ? h("button", {
                disabled: (vueSure <= 0),
                onClick: function () {
                  try {
                    if (vueSure <= 0) return;
                    var base = (ordre && ordre.length === fichiers.length) ? ordre.slice() : fichiers.map(function (_, k) { return k; });
                    var pris = base.splice(vueSure, 1)[0];
                    base.unshift(pris);
                    setOrdre(base);
                    setVue(0);
                  } catch (eR) { }
                },
                style: {
                  marginTop: 8, padding: "9px 14px", borderRadius: 999,
                  cursor: (vueSure > 0) ? "pointer" : "default",
                  fontFamily: M, fontSize: 11.5, fontWeight: 700,
                  border: "1px solid " + ((vueSure > 0) ? tA(0.6) : "rgba(255,255,255,0.14)"),
                  background: (vueSure > 0) ? "rgba(32,217,245,0.1)" : "transparent",
                  color: (vueSure > 0) ? tn : "#6C757D",
                  opacity: (vueSure > 0) ? 1 : 0.75
                }
              }, "\u2b50 " + ((vueSure > 0) ? hsT("mettreDevant", lg) : hsT("dejaPremiere", lg)))
              : null)
          : null,

        /* LA PRESENTATION (13/08, feux verts de Blandine, session 134) :
           2 a 5 nouvelles photos peuvent DEFILER (le chapelet) ou etre
           COMPOSEES en une seule story. Composer = disposition H+D pour
           tous ; les MODELES (decors a fenetres) sont reserves aux membres
           Premium — decision de Blandine.
           19b (14/08, decision de Blandine) : le MODE AJOUT y a droit aussi —
           la story deja en ligne rejoint le groupe et devient la grande. */
        compoPossible
          ? h("div", null,
            titreBloc(hsT("presentation", lg)),
            /* 19s : « tu peux retirer Defiler ». La puce servait a publier en
               chapelet — plusieurs stories l'une apres l'autre. Le chapelet
               n'existe plus : une publication, une story. Il ne reste donc
               aucun choix a poser ici, seulement le decor. */
            (compoChoix && props.premium)
              ? h("div", { style: { marginTop: 10 } },
                bandeModeles(nTotalCompo, (compoChoix === "hd" ? null : compoChoix), function (v) {
                  /* 19ac : un tap sur un decor n'applique plus le decor
                     directement — il OUVRE L'ECRAN PLEIN FORMAT, ou Blandine
                     place ses photos avant de valider. « Aucun decor » (v nul)
                     et les decors sans fenetres exploitables restent immediats. */
                  try {
                    if (!v) { setCompoChoix("hd"); return; }
                    var mv = hsModeles()[v];
                    /* 19ad : l'editeur n'accepte que les decors dont le nombre
                       de fenetres EGALE le nombre de photos. Le filtre de la
                       19ab garantit deja ce cas, mais son repli (catalogue
                       insuffisant) peut laisser passer autre chose — et c'est
                       exactement la situation qui faisait planter la
                       validation. Ceinture en plus de la bretelle. */
                    if (mv && mv.fenetres && mv.fenetres.length === nTotalCompo) { setEditeur(v); return; }
                  } catch (eEd) { }
                  setCompoChoix(v || "hd");
                }))
              : null,
            (compoChoix && !props.premium)
              ? h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", marginTop: 8, letterSpacing: 0.3 } }, hsT("modelesPremium", lg))
              : null,
            /* 19r : L'APERCU DANS LE VRAI DECOR. Les photos sont posees dans
               les fenetres EXACTES du modele (bbox a l'echelle + clip-path du
               contour), le decor par-dessus. Un tap choisit une fenetre, le
               curseur deplace la photo A L'INTERIEUR de celle-ci. */
            (compoChoix && String(compoChoix).indexOf("modele-") === 0 && props.premium)
              ? (function () {
                var mod = hsModeles()[compoChoix];
                if (!mod || !mod.fenetres || !mod.fenetres.length) return null;
                var LARG = 168, ech = LARG / (mod.taille[0] || 941);
                var HAUT = Math.round((mod.taille[1] || 1672) * ech);
                var vign = (props.origine && props.origine.url ? [props.origine.url] : []).concat(hsVignettesRetenues());
                var fenSure = (fenVue >= 0 && fenVue < mod.fenetres.length) ? fenVue : 0;
                /* 19ab : `cad` et `rF` ne servaient QU'au curseur retire.
                   `ratioFenetre` reste utilisee a la publication (~1772) pour
                   couper chaque photo au format de sa fenetre. */
                return h("div", { style: { marginTop: 12 } },
                  h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: tA(0.92), marginBottom: 8 } }, hsT("apercuCompo", lg)),
                  h("div", { style: { position: "relative", width: LARG, height: HAUT, borderRadius: 12, overflow: "hidden", background: "#060709", border: "1px solid " + tA(0.3) } },
                    mod.fenetres.map(function (f, ix) {
                      var u = vign[ix] || null;
                      var c2 = cadresFen[String(ix)] || { cx: 0.5, cy: 0.5 };
                      var pc = (f.contour || []).map(function (p) {
                        return (((p[0] - f.bbox[0]) / f.bbox[2]) * 100).toFixed(2) + "% " + (((p[1] - f.bbox[1]) / f.bbox[3]) * 100).toFixed(2) + "%";
                      }).join(", ");
                      return h("button", {
                        key: "fn" + ix,
                        onClick: function () { setFenVue(ix); },
                        style: {
                          position: "absolute", left: Math.round(f.bbox[0] * ech), top: Math.round(f.bbox[1] * ech),
                          width: Math.round(f.bbox[2] * ech), height: Math.round(f.bbox[3] * ech),
                          padding: 0, border: "none", cursor: "pointer",
                          background: u ? "none" : tA(0.12),
                          clipPath: pc ? ("polygon(" + pc + ")") : "none",
                          WebkitClipPath: pc ? ("polygon(" + pc + ")") : "none",
                          outline: (ix === fenSure) ? ("2px solid " + tn) : "none"
                        }
                      }, u ? h("img", {
                        src: u, alt: "",
                        style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: Math.round(c2.cx * 100) + "% " + Math.round(c2.cy * 100) + "%", display: "block" }
                      }) : null);
                    }),
                    /* 19aa (14/08) — ⚠️ LA CAUSE DES FERMETURES D'APPLI SUR LE
                       CURSEUR DE CADRAGE. Blandine : « le bouton pour modifier
                       une photo, il fait tout sauter dès qu'on y touche et ne
                       modifie rien en plus ». Cet apercu chargeait le decor en
                       PLEIN FORMAT — 6 Mo decodes — pour l'afficher dans 168 px.
                       La bande, elle, avait ete corrigee en 19x et prend deja
                       `-mini.webp` (0,21 Mo). L'apercu etait reste en arriere.
                       19ab : ⚠️ LE REPLI EST SUPPRIME ICI AUSSI. Il rechargeait
                       le plein format quand la vignette manquait — la panne
                       revenait a l'identique sur les 19 decors non pourvus.
                       Sans vignette, le decor ne se dessine simplement pas
                       par-dessus les photos ; le placement des fenetres, lui,
                       vient des `bbox` et reste juste. */
                    h("img", {
                      src: compoChoix + "-mini.webp", alt: "", loading: "lazy", decoding: "async",
                      /* 19ad : idem — on masque, on ne recharge pas. */
                      onError: function (ev) { try { if (ev && ev.target) ev.target.style.visibility = "hidden"; } catch (eMp) { } },
                      style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }
                    })),
                  /* 19ab (14/08, decision de Blandine) — LE CURSEUR EST RETIRE.
                     Ses mots : « déjà viré le curseur il sert à rien il est
                     laid, il est contre intuitif il marche pas et en plus il
                     fait tout planter à chaque fois en boucle ».
                     Il portait le SECOND etage de la panne memoire : chaque
                     relachement reecrivait l'etat et React refabriquait tout le
                     bloc, decor compris. Plus de curseur, plus de reconstruction.
                     Chaque photo se pose CENTREE dans sa fenetre (cx = cy = 0,5,
                     le defaut de `cadresFen`) : le cadrage n'est pas regle, il
                     n'est pas non plus faux.
                     ⚠️ NE PAS LE REMETTRE. Le remplacant decide est le geste a
                     la main — glisser la photo dans la fenetre, pincer pour
                     zoomer — ecrit sur `PhotoZoomHype`, qui ne pose AUCUN etat
                     React pendant le geste. `cadresFen` et `setCadresFen`
                     restent en place pour l'accueillir ; la publication les lit
                     deja (ligne ~1772). Le texte `cadrerFenetre` reste au
                     dictionnaire, il decrit ce geste-la. */
                  null);
              })()
              : null,
            /* 19c : L'APERCU DU H+D. « Sur composer il n'y a rien » (Blandine,
               14/08) : la puce se cochait et l'ecran ne bougeait pas. Ici, une
               maquette VIVANTE faite avec ses propres vignettes — la grande en
               haut, le fil de lumiere, la table de tirages dessous. */
            (compoChoix === "hd")
              ? h("div", { style: { marginTop: 12 } },
                h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: tA(0.92), marginBottom: 8 } }, hsT("apercuCompo", lg)),
                (function () {
                  var vign = (props.origine && props.origine.url ? [props.origine.url] : []).concat(hsVignettesRetenues());
                  var grandeU = vign[0] || null, petites = vign.slice(1, 5);
                  return h("div", {
                    style: {
                      width: 128, aspectRatio: "9 / 16", borderRadius: 12, overflow: "hidden",
                      border: "1px solid " + tA(0.3), background: "#060709",
                      display: "flex", flexDirection: "column", gap: 5, padding: 6, boxSizing: "border-box"
                    }
                  },
                    /* 19ai : la grande prend la FORME de la photo. Bornee entre
                       0,62 (une photo tres allongee en hauteur ne mange pas
                       toute la maquette) et 1,9. */
                    h(hsCadreForme, {
                      src: grandeU, base: 1, borne: [0.62, 1.9],
                      style: { flex: "0 0 auto", width: "100%", maxHeight: "60%", borderRadius: 7, overflow: "hidden", background: "#111417", border: "1px solid rgba(255,255,255,0.1)" }
                    }),
                    h("div", { style: { height: 1, background: "linear-gradient(90deg, transparent, " + tA(0.75) + ", transparent)", flex: "0 0 auto" } }),
                    h("div", { style: { flex: "0 0 auto", display: "flex", gap: 4, justifyContent: "center", alignItems: "flex-end" } },
                      petites.map(function (u, ix) {
                        /* 19ai : le tirage aussi. Hauteur commune, largeur
                           donnee par la photo : un tirage couche est LARGE,
                           un tirage debout est HAUT. Plus de `3 / 4` impose. */
                        return h(hsCadreForme, {
                          key: "ap" + ix, src: u, base: 0.75, borne: [0.55, 1.75],
                          style: {
                            flex: "0 0 auto",
                            height: (petites.length >= 4 ? 30 : petites.length === 3 ? 36 : 44),
                            borderRadius: 2, overflow: "hidden",
                            border: "1.5px solid #F4F7FA", background: "#111417",
                            transform: "rotate(" + (ix % 2 === 0 ? -2.2 : 2.4) + "deg)"
                          }
                        });
                      })));
                })())
              : null,
            /* 19b : dire A L'ECRAN ce que « Composer » fait a la story deja
               en ligne — elle rejoint la composition et en devient la grande. */
            (compoChoix && props.origine)
              ? h("div", { style: { fontSize: 10.5, fontFamily: M, color: tA(0.9), marginTop: 8, lineHeight: 1.5 } }, hsT("compoAbsorbe", lg))
              : null)
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

        /* 19b : en composition, c'est la legende de la story ABSORBEE qui
           s'affiche (elle est la couverture) — le texte tape ici part quand
           meme avec la premiere nouvelle photo, il n'est pas perdu.
           DEDUCTION DE CLAUDE — A VALIDER : je ne touche pas a la legende de
           ta story en ligne, je ne fais que le dire a l'ecran. */
        props.origine
          ? h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", lineHeight: 1.5, marginTop: 10 } }, hsT(compoChoix ? "compoLegende" : "legendeReste", lg))
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
          style: { marginTop: 14, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.55 }
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
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none" }
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

        /* --- COMBIEN DE TEMPS (19an, maquette validée par Blandine) ---
           Deux pastilles, 7 jours par défaut. Le mois porte le liseré doré du
           Cercle Crystal ; sans abonnement il reste visible mais inerte —
           montrer ce qu'on gagne vaut mieux que cacher ce qui existe.
           ⚠️ Le droit se vérifie DEUX FOIS : ici pour l'affichage, et à la
           publication (`dureeLongue && props.premium`). Un état d'interface ne
           décide pas d'un droit. */
        titreBloc("\u23F3 " + hsT("dureeTitre", lg)),
        h("div", { style: { display: "flex", gap: 8 } },
          h("button", {
            onClick: function () { setDureeLongue(false); },
            style: {
              flex: 1, borderRadius: 13, padding: "12px 10px", textAlign: "center", cursor: "pointer",
              fontFamily: M, border: "1px solid " + (!dureeLongue ? tA(0.75) : "rgba(255,255,255,0.14)"),
              background: !dureeLongue ? "rgba(32,217,245,0.13)" : "rgba(255,255,255,0.035)",
              boxShadow: !dureeLongue ? ("0 0 20px " + tA(0.14)) : "none"
            }
          },
            h("div", { style: { fontSize: 13.5, fontWeight: 800, color: !dureeLongue ? tnL : "#E4ECEF" } }, hsT("duree7", lg)),
            h("div", { style: { fontSize: 9.5, color: "#8A929C", marginTop: 3, lineHeight: 1.4 } }, hsT("duree7Sous", lg))),
          h("button", {
            onClick: function () {
              /* Sans abonnement, la pastille conduit à la page Premium au lieu
                 de ne rien faire : un verrou muet ne se comprend pas. */
              if (!props.premium) {
                try {
                  if (props.onPremium) { props.onPremium(); return; }
                  if (appCompo && appCompo.setEcran) { if (props.onFermer) props.onFermer(); appCompo.setEcran("premium"); return; }
                } catch (ePr) { }
                return;
              }
              setDureeLongue(true);
            },
            style: {
              flex: 1, borderRadius: 13, padding: "12px 10px", textAlign: "center", cursor: "pointer",
              fontFamily: M, opacity: props.premium ? 1 : 0.62,
              border: "1px solid " + (dureeLongue ? "rgba(232,199,122,0.85)" : "rgba(232,199,122,0.5)"),
              background: dureeLongue ? "rgba(232,199,122,0.14)" : "rgba(232,199,122,0.07)"
            }
          },
            h("div", { style: { fontSize: 9, color: "#E8C77A", fontWeight: 800, letterSpacing: "0.1em", marginBottom: 4 } }, "\u25C6 PREMIUM"),
            h("div", { style: { fontSize: 13.5, fontWeight: 800, color: "#E8C77A" } }, hsT("duree30", lg)),
            h("div", { style: { fontSize: 9.5, color: "#8A929C", marginTop: 3, lineHeight: 1.4 } }, hsT("duree30Sous", lg)))),
        h("div", { style: { fontSize: 10, color: "#8A929C", lineHeight: 1.55, marginTop: 10 } }, hsT("duree30Aide", lg)),

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
          style: { marginTop: 10, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.16)", color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none" }
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

        /* 19b : le Publier du bas a REJOINT l'en-tete collant. Annuler reste
           ici, seul, la ou on abandonne — aucune fonction perdue. */
        h("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)))),

      /* 19ac — L'ECRAN PLEIN FORMAT, par-dessus le composeur.
         Il n'est monte QUE pendant qu'on place ses photos : ferme, il ne
         coute rien. A la validation il ecrit d'un coup le decor choisi, les
         cadrages et, si Blandine a echange deux photos, le nouvel ordre. */
      (editeur && typeof EditeurDecorHype === "function")
        ? h(EditeurDecorHype, {
          reference: editeur,
          modele: hsModeles()[editeur],
          affectation: hsMeilleureAffectation(editeur, hsFormesRetenues()),
          vignettes: hsVignettesAlignees(),
          cadres: cadresFen,
          langue: lg,
          onFermer: function () { setEditeur(null); },
          onValider: function (cad, perm) {
            try {
              setCadresFen(cad || {});
              /* `perm[i]` = quelle photo occupe la fenetre i. On la reporte
                 sur `ordre`, qui indexe `fichiers` — c'est CETTE liste que
                 publier() parcourt. Une permutation d'identite ne touche a
                 rien : on ne reecrit `ordre` que s'il a vraiment change. */
              /* ⚠️ 19ad — CORRECTION D'UNE FAUTE DE CLAUDE (19ac). Blandine :
                 « quand on essaye de cliquer sur le bouton de la story masque
                 tout en bas, ca plante ».
                 `perm` a la longueur du nombre de FENETRES du decor, pas du
                 nombre de PHOTOS. Un decor a 4 fenetres avec 2 photos donnait
                 `socle[2]` et `socle[3]` = undefined, donc un `ordre` contenant
                 des trous ; `fichiersOrdonnes` renvoyait alors des fichiers
                 undefined et la publication mourait dessus.
                 Trois verrous desormais : meme longueur, valeurs entieres dans
                 les bornes, et permutation SANS DOUBLON. Au moindre doute on
                 ne touche pas a l'ordre — une photo mal placee se rattrape,
                 une photo perdue non. */
              var permOk = false;
              try {
                if (perm && perm.length === fichiersOrdonnes.length) {
                  var vus = {}; permOk = true;
                  for (var q = 0; q < perm.length; q++) {
                    var v = perm[q];
                    if (typeof v !== "number" || v < 0 || v >= perm.length || vus[v]) { permOk = false; break; }
                    vus[v] = 1;
                  }
                }
              } catch (eP) { permOk = false; }
              if (permOk) {
                var change = false;
                for (var q4 = 0; q4 < perm.length; q4++) { if (perm[q4] !== q4) { change = true; break; } }
                if (change) {
                  var socle = (ordre && ordre.length === fichiers.length)
                    ? ordre.slice()
                    : fichiers.map(function (x, q2) { return q2; });
                  var neuf = perm.map(function (q3) { return socle[q3]; });
                  var sain = neuf.every(function (v2) { return typeof v2 === "number" && v2 >= 0 && v2 < fichiers.length; });
                  if (sain && neuf.length === fichiers.length) { setOrdre(neuf); setVue(0); }
                }
              }
              setCompoChoix(editeur);
              setFenVue(0);
            } catch (eV) { setCompoChoix(editeur); }
            setEditeur(null);
          }
        })
        : null),
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

  /* 19aq (feu vert de Blandine : « on peut peut-etre ajouter la musique
     quelque part dans le bouton ? »). LE SELECTEUR S'OUVRE DE L'EXTERIEUR.
     Le menu de la page Cavalier doit pouvoir ouvrir le choix de chanson, mais
     le composant NE PEUT PAS demenager dans ce menu : il porte aussi la
     pastille de lecture, celle dont les VISITEURS se servent pour ecouter la
     musique -- et le menu n'existe que pour la proprietaire.
     `ouvrirChoix` est donc un compteur : chaque incrementation ouvre le
     selecteur. Un booleen ne permettrait pas de rouvrir apres fermeture sans
     remise a zero.
     `sansBoutonChoix` retire le bouton pointille de la page quand le menu
     s'en charge -- sinon on refait le doublon des quetes. */
  React.useEffect(function () {
    if (props.ouvrirChoix) setChoixOuvert(true);
  }, [props.ouvrirChoix]);

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
      (props.proprio && !props.sansBoutonChoix)
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
/* ---------------------------------------------------------------------------
   19av (17/08, feu vert de Blandine) — UNE À LA UNE RETROUVE SA VRAIE STORY.

   Ce qui n'allait pas : une à la une ne garde que des URLs de photos, et la
   relecture fabriquait des objets { id, photo_url }. La légende, le lieu, la
   musique, le fond et le décor semblaient perdus — et le cœur, monté sur un
   identifiant inventé, ne comptait jamais rien.

   Ils n'étaient PAS perdus. Vérifié dans le code : RIEN n'efface les stories.
   Les sept jours sont un FILTRE À LA LECTURE (`gt("expire_le", ...)` dans
   hsListerStories), pas une purge. La ligne `hype_stories` reste en base
   indéfiniment ; elle cesse seulement d'être proposée dans le bandeau.

   Donc aucune colonne nouvelle, aucun SQL, aucune copie à geler : il suffit
   de RETROUVER la ligne à partir de son `photo_url`. Le cœur reçoit alors le
   vrai identifiant, et les likes continuent de vivre — ce que Blandine
   voulait : « ça me dérange pas au contraire que les like continuent ».

   Repli : une photo dont la story a réellement été supprimée par son auteur
   retombe sur l'objet fabriqué d'avant. Elle s'affiche nue, elle ne plante pas.
--------------------------------------------------------------------------- */
async function hsStoriesDesPhotos(urls) {
  try {
    if (typeof supa === "undefined" || !supa) return {};
    var liste = (urls || []).filter(function (u) { return !!u; }).slice(0, 200);
    if (!liste.length) return {};
    var r = await supa.from("hype_stories").select("*").in("photo_url", liste);
    var par = {};
    ((r && r.data) || []).forEach(function (s) {
      if (s && s.photo_url && !par[s.photo_url]) par[s.photo_url] = s;
    });
    return par;
  } catch (e) { return {}; }
}

/* Fabrique le groupe que la visionneuse attend. Résout TOUJOURS, même si la
   lecture échoue : dans ce cas on rend exactement ce que rendait la version
   précédente, jamais une à la une qui refuse de s'ouvrir. */
async function hsGroupeALaUne(album, lg) {
  var photos = (album && album.photos) || [];
  var par = {};
  try { par = await hsStoriesDesPhotos(photos); } catch (e) { par = {}; }
  return {
    user_id: "album:" + (album && album.id),
    pseudo: (album && album.nom) || hsT("aLaUne", lg || "fr"),
    avatar_url: (album && album.couverture) || null,
    ecurie: "",
    stories: photos.map(function (u, k) {
      return par[u] || { id: "alb" + (album && album.id) + "-" + k, photo_url: u };
    })
  };
}

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
  /* 19av : le groupe de l'à la une ouverte, chargé depuis hype_stories. */
  var aS = React.useState(null), grpAlb = aS[0], setGrpAlb = aS[1];
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

  /* 19av — À L'OUVERTURE, ON VA CHERCHER LES VRAIES STORIES.
     hsGroupeALaUne résout toujours : en cas d'échec de lecture il rend le
     groupe d'avant, fabriqué depuis les URLs. Une à la une ne reste donc
     jamais bloquée sur un écran vide. */
  React.useEffect(function () {
    if (!ouverte) { setGrpAlb(null); return; }
    var vivant = true;
    hsGroupeALaUne(ouverte, lg).then(function (g) { if (vivant) setGrpAlb(g); });
    return function () { vivant = false; };
  }, [ouverte && ouverte.id]);

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
                ? h("img", { src: couv, alt: "", loading: "lazy", onError: function (ev) { try { hsVignetteCassee(ev, couvBrut); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
                : h("span", { style: { fontFamily: C, fontSize: 20, fontWeight: 700, color: tnL } }, String(a.nom || "?").charAt(0).toUpperCase()))),
          h("div", { style: { fontSize: 10.5, marginTop: 7, fontFamily: M, fontWeight: 600, color: "#C9D3D8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.nom || ""));
      })),

    (ouverte && grpAlb)
      ? h(VisionneuseStories, {
        /* Une à la une se lit avec la MÊME visionneuse que les stories.
           19av : le groupe n'est plus fabriqué à partir des seules URLs, il
           est CHARGÉ — chaque photo retrouve sa story, donc sa légende, son
           lieu, sa musique, son fond, son décor et son vrai identifiant (le
           cœur compte de nouveau). mode "album" ne masque plus que le ⋯ :
           on relit un souvenir, on n'agit pas dessus. */
        groupes: [grpAlb],
        depart: 0, moiId: null, premium: !!(app && app.premium), langue: lg, mode: "album",
        onFermer: function () { setOuverte(null); }
      })
      : null);
}

/* ---------------------------------------------------------------------------
   7 bis. LE MUR IMMERSIF (19as — 17/08/2026)

   Un bloc CARRÉ sur la page Cavalier, entre le Mur des Songes et les tuiles
   club, qui remplace le rail « À la une » SUR CETTE PAGE UNIQUEMENT (mots de
   Blandine : « pour l'instant on va faire uniquement en bleu sur la page
   Cavalier, on verra le reste ensuite »). Communauté, Club et Écurie gardent
   RailALaUne tel quel.

   COMMENT ÇA MARCHE. Le décor est un PNG PERCÉ — quatre trous à alpha 0. Les
   photos passent DERRIÈRE, les liserés restent PAR-DESSUS. Trois couches, dans
   cet ordre :
     1. le décor FLOU ET AGRANDI (114 %), qui bouche les trous vides ;
     2. les encarts (photo + voile + nappe), posés aux coordonnées des trous ;
     3. le décor NET, qui rend ses liserés et masque tout ce qui déborde.
   Le décor net est en pointerEvents:none : les encarts restent tapables.

   L'EXCEPTION AU VOILE. La règle « aucun voile sur une photo de cheval » n'est
   PAS amendée. Ce qui justifie l'exception ici, ce sont les mots de Blandine :
   « histoire de limiter la casse si il y a des story orange ou vert fluo ».
   C'est un garde-fou, pas un goût, et il vaut pour le mur immersif et lui seul.

   CE QUI RESTE OUVERT, non tranché, donc non décidé ici :
   - PLUS DE QUATRE à la une : le surplus n'est pas affiché (aucun défilement,
     aucune rotation). À trancher avec Blandine.
   - Le FONDU ADAPTATIF (le petit emplacement du centre est presque effacé en
     « Large ») est proposé en interrupteur dans le panneau, ÉTEINT par défaut :
     éteint = le comportement connu, rien ne change sans son geste.
--------------------------------------------------------------------------- */

var HS_MUR_IMAGE = "Hype_mur_immersif_encarts_transparents.png";

/* Trous mesurés sur le fichier natif 1254 × 1254 (composantes connexes à
   alpha 0), convertis en pourcentage du côté. Ordre d'attribution : les deux
   grands d'abord, puis le bandeau bas, puis le petit du centre — la première à
   la une (les promues d'abord, cf. hsListerALaUne) prend donc la plus grande
   place. Une seule ligne à réordonner si Blandine veut un autre ordre. */
var HS_MUR_TROUS = [
  { l: 6.54, t: 41.15, w: 25.36, h: 44.34 },   /* grand gauche  (82,516  → 318×556) */
  { l: 69.94, t: 13.88, w: 24.48, h: 38.12 },  /* grand droite  (877,174 → 307×478) */
  { l: 48.17, t: 70.65, w: 26.24, h: 16.19 },  /* bandeau bas   (604,886 → 329×203) */
  { l: 38.28, t: 47.37, w: 17.22, h: 18.82 }   /* petit centre  (480,594 → 216×236) */
];

/* Le fondu des bords. Ce qu'on a appris en réglant : l'écart de luminosité
   avec le décor est indépassable, le levier utile est le FONDU, pas la
   couleur. e = taille de l'ellipse, s = où le noir plein s'arrête. */
var HS_MUR_FONDUS = [
  { nom: "Aucun", e: 0, s: 0 },
  { nom: "Doux", e: 100, s: 70 },
  { nom: "Moyen", e: 86, s: 55 },
  { nom: "Large", e: 72, s: 40 }
];

/* La nappe. Le turquoise franc est à proscrire en nappe — c'est une lumière,
   pas une matière — mais il reste proposé pour que Blandine le constate
   elle-même plutôt que sur parole. */
var HS_MUR_COULEURS = [
  { nom: "Nuit", hex: "#0F2A38" },
  { nom: "Ardoise", hex: "#12506A" },
  { nom: "Pétrole", hex: "#166F8C" },
  { nom: "Lagune", hex: "#1BA8C8" },
  { nom: "Turquoise", hex: "#20D9F5" }
];

/* Réglage de départ = celui retenu en fin de session 135 bis, à reconfirmer :
   fondu large · voile 22 % · désaturation 80 % · nappe 50 % · pétrole. */
var HS_MUR_DEFAUTS = { voile: 22, desat: 80, nappe: 50, couleur: 2, fondu: 3, adapt: false };
var HS_MUR_CLE = "hype_mur_immersif_v1";

function hsMurReglages() {
  var d = { voile: HS_MUR_DEFAUTS.voile, desat: HS_MUR_DEFAUTS.desat, nappe: HS_MUR_DEFAUTS.nappe, couleur: HS_MUR_DEFAUTS.couleur, fondu: HS_MUR_DEFAUTS.fondu, adapt: HS_MUR_DEFAUTS.adapt };
  try {
    var brut = localStorage.getItem(HS_MUR_CLE);
    if (!brut) return d;
    var o = JSON.parse(brut);
    if (!o || typeof o !== "object") return d;
    if (typeof o.voile === "number") d.voile = o.voile;
    if (typeof o.desat === "number") d.desat = o.desat;
    if (typeof o.nappe === "number") d.nappe = o.nappe;
    if (typeof o.couleur === "number") d.couleur = o.couleur;
    if (typeof o.fondu === "number") d.fondu = o.fondu;
    if (typeof o.adapt === "boolean") d.adapt = o.adapt;
    return d;
  } catch (e) { return d; }
}

function hsMurEnregistrer(r) { try { localStorage.setItem(HS_MUR_CLE, JSON.stringify(r)); } catch (e) { } }

/* Le masque du fondu. Le voile et la nappe le portent AUSSI — ils vivent dans
   le même conteneur masqué — sinon un bord net réapparaît là où la photo, elle,
   s'est éteinte. */
function hsMurMasque(f, adoucir) {
  if (!f || !f.e) return "";
  var e = f.e, s = f.s;
  if (adoucir) { e = Math.min(100, e + 16); s = Math.min(92, s + 22); }
  return "radial-gradient(ellipse " + e + "% " + e + "% at 50% 50%, #000 " + s + "%, rgba(0,0,0,0) 100%)";
}

function MurImmersif(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var uS = React.useState([]), unes = uS[0], setUnes = uS[1];
  var oS = React.useState(null), ouverte = oS[0], setOuverte = oS[1];
  /* 19av : le groupe de l'à la une ouverte, chargé depuis hype_stories. */
  var aS = React.useState(null), grpAlb = aS[0], setGrpAlb = aS[1];
  var gS = React.useState(hsMurReglages()), reg = gS[0], setReg = gS[1];
  var pS = React.useState(false), panneau = pS[0], setPanneau = pS[1];
  var fS = React.useState(false), estFeinn = fS[0], setEstFeinn = fS[1];
  var vivantRef = React.useRef(true);
  /* 19at — LE MÊME GARDE-FOU QUE PARTOUT AILLEURS DANS CE FICHIER. En 19as
     j'avais appelé ReactDOM.createPortal en direct : la méthode n'existe pas à
     l'exécution, la page Cavalier plantait à l'ouverture du panneau. Les six
     autres portails du module passent tous par cette ligne — je m'y aligne. */
  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };

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

  /* 19av — À L'OUVERTURE, ON VA CHERCHER LES VRAIES STORIES.
     hsGroupeALaUne résout toujours : en cas d'échec de lecture il rend le
     groupe d'avant, fabriqué depuis les URLs. Une à la une ne reste donc
     jamais bloquée sur un écran vide. */
  React.useEffect(function () {
    if (!ouverte) { setGrpAlb(null); return; }
    var vivant = true;
    hsGroupeALaUne(ouverte, lg).then(function (g) { if (vivant) setGrpAlb(g); });
    return function () { vivant = false; };
  }, [ouverte && ouverte.id]);

  /* Le panneau de réglages est réservé au compte de Blandine — pas aux
     modérateurs : c'est un outil de mise au point, pas une fonctionnalité. */
  React.useEffect(function () {
    var vivant = true;
    try {
      if (typeof utilisateurActuel === "function") {
        utilisateurActuel().then(function (u) {
          if (!vivant) return;
          setEstFeinn(typeof estCompteFeinnHype === "function" ? !!estCompteFeinnHype(u) : false);
        }).catch(function () { });
      }
    } catch (e) { }
    return function () { vivant = false; };
  }, []);

  function poser(champ, valeur) {
    var n = { voile: reg.voile, desat: reg.desat, nappe: reg.nappe, couleur: reg.couleur, fondu: reg.fondu, adapt: reg.adapt };
    n[champ] = valeur;
    setReg(n); hsMurEnregistrer(n);
  }

  /* Rien à montrer : le mur ne s'affiche pas du tout, comme le rail. Une page
     ne porte pas un bloc vide (règle d'espace de la Design Bible) — et un
     décor seul, sans une seule photo, ne raconte rien du cavalier. */
  if (!unes.length) return null;

  var fondu = HS_MUR_FONDUS[reg.fondu] || HS_MUR_FONDUS[3];
  var coul = HS_MUR_COULEURS[reg.couleur] || HS_MUR_COULEURS[2];

  function chips(libelle, champ, valeurs, courant, etiquettes) {
    return h("div", { style: { marginBottom: 13 } },
      h("div", { style: { fontSize: 9, fontFamily: M, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: tA(0.9), marginBottom: 7 } }, libelle),
      h("div", { style: { display: "flex", gap: 6 } },
        valeurs.map(function (v, i) {
          var actif = (courant === v);
          return h("button", {
            key: champ + v,
            onClick: function () { poser(champ, v); },
            style: {
              flex: "1 1 0", minWidth: 0, padding: "9px 2px", borderRadius: 11, cursor: "pointer",
              fontFamily: M, fontSize: 11.5, fontWeight: 700,
              color: actif ? tnL : "#8A969C",
              border: "1px solid " + (actif ? tA(0.75) : "rgba(255,255,255,0.10)"),
              background: actif ? tA(0.14) : "rgba(255,255,255,0.03)"
            }
          }, etiquettes ? etiquettes[i] : String(v));
        })));
  }

  var lignes = unes.slice(0, 4).map(function (a, i) {
    var tr = HS_MUR_TROUS[i];
    if (!tr) return null;
    var couvBrut = a.couverture || (a.photos || [])[0] || null;
    var couv = couvBrut;
    if (couv && typeof vignetteHype === "function") couv = vignetteHype(couv, 520, 700);
    var petit = (tr.w * tr.h) < 380;                 /* seul le petit du centre */
    var mk = hsMurMasque(fondu, !!reg.adapt && petit);

    return h("button", {
      key: "mur" + a.id,
      onClick: function () { hsAmorcerAudio(); setOuverte(a); },
      style: {
        position: "absolute", left: tr.l + "%", top: tr.t + "%", width: tr.w + "%", height: tr.h + "%",
        padding: 0, margin: 0, border: "none", background: "none", cursor: "pointer",
        overflow: "hidden", borderRadius: "5%", WebkitAppearance: "none"
      }
    },
      h("div", {
        style: {
          position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
          isolation: "isolate",
          WebkitMaskImage: mk || "none", maskImage: mk || "none"
        }
      },
        couv
          ? h("img", {
            src: couv, alt: "", loading: "lazy",
            onError: function (ev) { try { hsVignetteCassee(ev, couvBrut); } catch (e) { } },
            style: { width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(" + Math.max(0, 1 - (reg.desat / 100)) + ")" }
          })
          : h("div", { style: { width: "100%", height: "100%", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
            h("span", { style: { fontFamily: C, fontSize: 22, fontWeight: 700, color: tnL } }, String(a.nom || "?").charAt(0).toUpperCase())),
        h("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "#070A0E", opacity: reg.voile / 100, pointerEvents: "none" } }),
        h("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: coul.hex, opacity: reg.nappe / 100, mixBlendMode: "color", pointerEvents: "none" } })),

      /* Le nom vit HORS du conteneur masqué : sinon le fondu l'éteindrait. */
      h("div", {
        style: {
          position: "absolute", left: 0, right: 0, bottom: "6%", textAlign: "center",
          fontFamily: M, fontSize: 11, fontWeight: 700, color: "#F4F7FA",
          textShadow: "0 2px 10px rgba(0,0,0,0.78)", padding: "0 7px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pointerEvents: "none"
        }
      }, a.nom || ""));
  });

  return h("div", { style: { padding: (props && props.padding) || "6px 0 10px" } },
    h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0 16px 9px" } },
      h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: tA(0.9) } }, hsT("aLaUne", lg)),
      estFeinn
        ? h("button", {
          onClick: function () { setPanneau(true); },
          style: { background: "none", border: "none", padding: "0 0 0 10px", cursor: "pointer", fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: tA(0.55) }
        }, "réglages")
        : null),

    /* Le carré. paddingTop 100 % plutôt qu'aspect-ratio : le format tient sur
       tous les Safari, sans dépendre d'une version. */
    h("div", { style: { position: "relative", margin: "0 16px", borderRadius: 20, overflow: "hidden", background: "#060709" } },
      h("div", { style: { width: "100%", paddingTop: "100%" } }),

      /* 1. Le décor flou et agrandi : c'est lui qui BOUCHE les trous restés
            vides (choix de Blandine : « décor plein »). Agrandi de 14 % pour
            qu'un trou du fond ne retombe jamais sur un trou du dessus. */
      h("img", {
        src: HS_MUR_IMAGE, alt: "", "aria-hidden": "true",
        style: { position: "absolute", left: "-7%", top: "-7%", width: "114%", height: "114%", objectFit: "cover", filter: "blur(16px) saturate(0.88)", pointerEvents: "none" }
      }),

      /* 2. Les encarts. */
      lignes,

      /* 3. Le décor net et ses liserés, par-dessus tout, non tapable. */
      h("img", {
        src: HS_MUR_IMAGE, alt: "",
        style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }
      })),

    /* LE PANNEAU DE RÉGLAGES — compte de Blandine uniquement. En position
       fixed, jamais en absolute : un z-index ne vaut que dans son propre plan. */
    (panneau && estFeinn)
      ? portail(
        h("div", {
          onClick: function () { setPanneau(false); },
          style: { position: "fixed", left: 0, top: 0, right: 0, bottom: 0, zIndex: 9200, background: "rgba(4,6,8,0.62)", display: "flex", alignItems: "flex-end" }
        },
          h("div", {
            onClick: function (ev) { ev.stopPropagation(); },
            style: {
              width: "100%", maxHeight: "76vh", overflowY: "auto",
              padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)",
              borderTopLeftRadius: 22, borderTopRightRadius: 22,
              borderTop: "1px solid " + tA(0.28),
              background: "linear-gradient(180deg, rgba(19,24,29,0.99), rgba(8,11,15,0.99))"
            }
          },
            h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 } },
              h("div", { style: { fontFamily: C, fontSize: 17, fontWeight: 700, color: "#F4F7FA" } }, "Le mur immersif"),
              h("button", { onClick: function () { setPanneau(false); }, style: { background: "none", border: "none", cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: 700, color: tA(0.85) } }, "Fermer")),

            chips("Voile · assombrit", "voile", [0, 15, 22, 35, 50, 60], reg.voile),
            chips("Désature · retire la couleur", "desat", [0, 25, 40, 60, 80, 100], reg.desat),
            chips("Nappe · au-delà de 60 elle efface", "nappe", [0, 20, 40, 60, 80, 100], reg.nappe),
            chips("Couleur de la nappe", "couleur", [0, 1, 2, 3, 4], reg.couleur, ["Nuit", "Ardoise", "Pétrole", "Lagune", "Turquoise"]),
            chips("Fondu des bords", "fondu", [0, 1, 2, 3], reg.fondu, ["Aucun", "Doux", "Moyen", "Large"]),

            h("button", {
              onClick: function () { poser("adapt", !reg.adapt); },
              style: {
                width: "100%", padding: "11px 12px", borderRadius: 13, cursor: "pointer", marginTop: 2,
                textAlign: "left", fontFamily: M, fontSize: 11.5, fontWeight: 600,
                color: reg.adapt ? tnL : "#8A969C",
                border: "1px solid " + (reg.adapt ? tA(0.7) : "rgba(255,255,255,0.10)"),
                background: reg.adapt ? tA(0.12) : "rgba(255,255,255,0.03)"
              }
            }, (reg.adapt ? "◉  " : "○  ") + "Fondu adouci sur le petit emplacement"),

            h("div", { style: { fontFamily: M, fontSize: 10.5, lineHeight: 1.5, color: "#79858B", margin: "12px 2px 14px" } },
              "Le réglage est gardé sur cet appareil et ne change rien pour les autres cavaliers. Le panneau n'est visible que par toi."),

            h("button", {
              onClick: function () { var d = { voile: HS_MUR_DEFAUTS.voile, desat: HS_MUR_DEFAUTS.desat, nappe: HS_MUR_DEFAUTS.nappe, couleur: HS_MUR_DEFAUTS.couleur, fondu: HS_MUR_DEFAUTS.fondu, adapt: HS_MUR_DEFAUTS.adapt }; setReg(d); hsMurEnregistrer(d); },
              style: { width: "100%", padding: "11px 12px", borderRadius: 13, cursor: "pointer", fontFamily: M, fontSize: 11.5, fontWeight: 700, color: "#8A969C", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }
            }, "Rétablir le réglage de départ"))),
        document.body)
      : null,

    /* Une à la une se relit avec la MÊME visionneuse que les stories, en mode
       album — exactement comme le rail, et par le même chargeur (19av). */
    (ouverte && grpAlb)
      ? h(VisionneuseStories, {
        groupes: [grpAlb],
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
      /* 19ai : meme garde que le composeur — on ne ferme que sur le fond. */
      onClick: function (e) {
        try { if (e && e.target !== e.currentTarget) return; } catch (eF) { }
        if (!busy && props.onFermer) props.onFermer();
      },
      /* 13/08 01h40 : même ceinture tactile que ModifierStory (voir là-bas). */
      onTouchStart: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchMove: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchEnd: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      /* ⚠️ 19ai — LE NAVIGATEUR PAR SWIPE DE L'INDEX PASSAIT ENCORE ICI.
         La 19ah avait pose `data-noswipe` sur le SEUL ecran plein format ;
         le composeur, ses feuilles et la visionneuse ne le portaient pas. Un
         glisse horizontal de plus de 65 px n'importe ou dedans — effleurer
         une photo, la deplacer, faire defiler une bande — declenchait
         `retourEcran()` : l'ecran change SOUS la feuille, elle se demonte, la
         story est perdue. Mots de Blandine : « j'effleure du doigt une photo
         tout saute ».
         ⚠️ REGLE : TOUT ecran fixe de ce module porte `data-noswipe`. */
      "data-noswipe": "1",
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
                    ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(couv, 112, 112) : couv, alt: "", onError: function (ev) { try { hsVignetteCassee(ev, couv); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } })
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
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none" }
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
      /* 19ai : meme garde que le composeur — on ne ferme que sur le fond. */
      onClick: function (e) {
        try { if (e && e.target !== e.currentTarget) return; } catch (eF) { }
        if (!busy && props.onFermer) props.onFermer();
      },
      /* 13/08 01h40 : couper la REMONTÉE TACTILE. Sans ça, les touches sur
         cette feuille atteignaient le glissé de fermeture de la visionneuse
         (React fait remonter les événements par l'arbre des composants, même
         à travers un portail) : taper dans un champ fermait la story. */
      onTouchStart: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchMove: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      onTouchEnd: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
      /* ⚠️ 19ai — LE NAVIGATEUR PAR SWIPE DE L'INDEX PASSAIT ENCORE ICI.
         La 19ah avait pose `data-noswipe` sur le SEUL ecran plein format ;
         le composeur, ses feuilles et la visionneuse ne le portaient pas. Un
         glisse horizontal de plus de 65 px n'importe ou dedans — effleurer
         une photo, la deplacer, faire defiler une bande — declenchait
         `retourEcran()` : l'ecran change SOUS la feuille, elle se demonte, la
         story est perdue. Mots de Blandine : « j'effleure du doigt une photo
         tout saute ».
         ⚠️ REGLE : TOUT ecran fixe de ce module porte `data-noswipe`. */
      "data-noswipe": "1",
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
          style: { marginTop: 16, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.55 }
        }),
        (legende.length > 800)
          ? h("div", { style: { fontSize: 10, fontFamily: M, fontWeight: 700, color: (legende.length >= HS_LEGENDE_MAX ? "#E8A6A6" : tA(0.9)), textAlign: "right", marginTop: 5 } }, legende.length + "/" + HS_LEGENDE_MAX)
          : null,

        h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "16px 0 8px" } }, "\uD83D\uDCCD " + hsT("lieuTitre", lg)),
        h("input", {
          value: lieu, onChange: function (e) { setLieu(e.target.value); },
          onFocus: remonter,
          maxLength: HS_LIEU_MAX, placeholder: hsT("lieuChamp", lg),
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 16, fontFamily: M, outline: "none" }
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
/* ---------------------------------------------------------------------------
   LA STORY COMPOSEE A L'ECRAN (13/08, session 134, feux verts de Blandine).
   Deux dispositions : "hd" (la grande en haut, le texte suspendu sous un fil
   de lumiere, la table de tirages dessous — maquette validee) et "modele-X"
   (les photos vivent DANS les fenetres du decor, decoupees a leurs contours
   exacts, le decor par-dessus). Chaque photo se touche : PLEIN ECRAN avec le
   zoom au pincement (PhotoZoomHype), le minuteur en pause pendant ce temps.
   Le depliage : les tirages glissent un a un a l'ouverture (400 ms). */
/* 19d : cette story demande-t-elle le rendu a fenetres ? Soit elle assemble
   plusieurs photos, soit elle est seule dans un decor. */
function hsAvecDecor(st) {
  try {
    if (!st) return false;
    if (st.compo && st.compo.length > 1) return true;
    return !!(st.disposition && String(st.disposition).indexOf("modele-") === 0);
  } catch (e) { return false; }
}

function CompositionStory(props) {
  /* 19e (14/08) — LA LIGNE QUI MANQUAIT DEPUIS LA SESSION 134.
     CompositionStory appelait `h(...)` sans jamais declarer `h`, et aucun `h`
     global n'existe (celui de l'index vit DANS une fonction). Resultat :
     ReferenceError au tout premier appel — `var cadres = h("style", ...)` —
     donc l'ecran « Un caillou dans le sabot » a CHAQUE affichage d'une
     composition ou d'un decor. Autrement dit : ce composant n'a JAMAIS
     fonctionne. Trace de Blandine (14/08, 05h46) : CompositionStory@
     hype-stories.js:2457:17, la colonne 17 tombe exactement sur ce `h(`.
     Cause de « la 3e story ne s'affiche pas et bug ». */
  var h = React.createElement;
  /* 19i (14/08) : `M` manquait AUSSI. Meme faute que le `h` de la 19e, et mon
     audit ne surveillait que `h` — il couvre desormais toutes les variables de
     rendu du module. Ne plantait que si la story portait une LEGENDE : la
     composition de Blandine en a herite en absorbant sa story en ligne, d'ou
     le plantage a hype-stories.js:2581:42 (colonne 42 = `fontFamily: M`). */
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var story = props.story || {}; var lg = props.langue || "fr";
  var membres = (story.compo && story.compo.length ? story.compo : [story]);
  var plS = React.useState(null), plein = plS[0], setPlein = plS[1];
  /* 19am (disposition « B ») : la legende vit desormais ICI, avec son propre
     deplie. Teinte et longueur calculees une fois pour tout le bloc. */
  var dpS = React.useState(false), deplie = dpS[0], setDeplie = dpS[1];
  var thC = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { lumineux: "#5FE9F0" };
  var tnL = thC.lumineux || "#5FE9F0";
  /* ⚠️ 19ao (15/08) — AJOUTÉ EN DERNIER, comme tout nouvel état de ce module.
     LA NAVIGATION DANS LA PHOTO OUVERTE. Signalé par Blandine : « quand on a
     ouvert le milieu on peut plus les descendre ou remonter ». Exact — la
     surcouche n'affichait QUE la photo touchée, sans suivante ni précédente :
     il fallait fermer, viser, rouvrir. Vrai dès DEUX photos, pas seulement à
     cinq.
     Ce n'était pas un choix : la 19b a démonté la composition pendant le plein
     écran pour ne garder qu'UNE image vivante (six décodages simultanés
     tuaient l'onglet sur iOS), et la navigation est partie avec elle. Elle
     revient SANS revenir au plantage — on continue de n'afficher qu'une seule
     image, on change seulement laquelle. */
  var pxS = React.useState(0), pleinIx = pxS[0], setPleinIx = pxS[1];
  var refCouche = React.useRef(null);
  var gesteRef = React.useRef({ actif: false, multi: false, x: 0, y: 0, bouge: false });
  var longue = String(story.legende || "").length > (typeof HS_LEGENDE_REPLI === "number" ? HS_LEGENDE_REPLI : 140);
  /* Les mentions @ ACCEPTEES deviennent des liens turquoise, comme dans le
     panneau du bas d'ou le texte vient. Sans ce report, changer de place la
     legende leur aurait fait perdre leur lien (signale a Blandine avant). */
  var morceauxLegende = (function () {
    var t = story.legende || "";
    if (!t) return null;
    var tg = props.tags || [];
    var mo = (typeof hsDecouperLegende === "function") ? hsDecouperLegende(t, tg) : [{ texte: t }];
    return mo.map(function (m, i) {
      if (m.texte !== undefined) return h("span", { key: "lc" + i }, m.texte);
      if (m.tag && m.tag.cible_id && m.tag.type === "cavalier" && props.onCavalier) {
        return h("span", {
          key: "lc" + i,
          onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); props.onCavalier(m.tag); },
          style: { color: (thC.principal || "#20D9F5"), fontWeight: 700, cursor: "pointer" }
        }, m.mention);
      }
      return h("span", { key: "lc" + i }, m.mention);
    });
  })();
  function ouvrirPlein(u, ix) { try { if (props.pause) props.pause(true); } catch (e) { } setPleinIx(typeof ix === "number" ? ix : 0); setPlein(u); }
  function fermerPlein() { try { if (props.pause) props.pause(false); } catch (e) { } setPlein(null); }
  function src(st) { return (typeof hsImageEcran === "function") ? hsImageEcran(st.photo_url) : st.photo_url; }
  function photoTouchable(st, ix, style) {
    return h("button", {
      key: "cp" + ix,
      /* 19h (14/08) : le tap sur une photo de composition FERMAIT la story.
         Arreter `touchstart` ne suffit pas : la visionneuse decide a la FIN du
         geste (touchend) et sur le pointeur. On arrete les trois. */
      onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); ouvrirPlein(src(st), ix); },
      onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
      onTouchEnd: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
      onPointerDown: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
      onPointerUp: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
      style: Object.assign({ padding: 0, border: "none", background: "none", cursor: "pointer", animation: "hsDeplie 400ms ease both", animationDelay: (ix * 120) + "ms" }, style)
    }, h("img", { src: src(st), alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "inherit" } }));
  }
  /* 19ao — LA NAVIGATION ENTRE LES PHOTOS DE LA COMPOSITION.
     Trois garde-fous, chacun paye une panne connue de ce module :
       1. UN `touchend` SANS `touchstart` CHEZ SOI N'EST PAS UN GESTE. Sans le
          drapeau `actif`, un doigt levé au retour d'un autre calque compterait
          comme un glissé.
       2. DEUX DOIGTS ANNULENT TOUT. Un pincement appartient à PhotoZoomHype ;
          le lui voler, c'est le crash mémoire de la 19b par un autre chemin.
       3. PHOTO ZOOMÉE = ON NE NAVIGUE PAS. Le déplacement à un doigt sert
          alors à promener l'image. On lit l'échelle dans le `transform` que
          PhotoZoomHype écrit lui-même — aucune modification de son code, donc
          aucun risque de le déséquilibrer. */
  function estZoomee() {
    try {
      var c = refCouche.current; if (!c) return false;
      var im = c.querySelector("img"); if (!im) return false;
      return String(im.style.transform || "").indexOf("scale(") >= 0;
    } catch (e) { return false; }
  }
  function allerPhoto(pas) {
    try {
      var n = membres.length; if (n < 2) return;
      var suiv = ((pleinIx + pas) % n + n) % n;
      setPleinIx(suiv);
      setPlein(src(membres[suiv]));
    } catch (e) { }
  }
  var surcouche = plein
    ? h("div", {
      ref: refCouche,
      onClick: function (ev) {
        if (ev && ev.stopPropagation) ev.stopPropagation();
        /* le glissé ne doit pas se terminer par une fermeture */
        if (gesteRef.current.bouge) { gesteRef.current.bouge = false; return; }
        fermerPlein();
      },
      onTouchStart: function (ev) {
        if (ev && ev.stopPropagation) ev.stopPropagation();
        var g = gesteRef.current;
        if (!ev.touches || ev.touches.length !== 1) { g.multi = true; g.actif = false; return; }
        g.actif = true; g.multi = false; g.bouge = false;
        g.x = ev.touches[0].clientX; g.y = ev.touches[0].clientY;
      },
      onTouchMove: function (ev) {
        var g = gesteRef.current;
        if (ev && ev.touches && ev.touches.length > 1) { g.multi = true; }
      },
      onTouchEnd: function (ev) {
        if (ev && ev.stopPropagation) ev.stopPropagation();
        var g = gesteRef.current;
        if (!g.actif) return;                      /* résidu, pas un geste */
        g.actif = false;
        if (g.multi) { g.multi = false; g.bouge = true; return; }
        if (estZoomee()) { g.bouge = true; return; }
        var t = ev.changedTouches && ev.changedTouches[0]; if (!t) return;
        var dy = t.clientY - g.y, dx = t.clientX - g.x;
        if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.4) {
          g.bouge = true;
          allerPhoto(dy < 0 ? 1 : -1);
        }
      },
      /* ⚠️ 19ai — LE NAVIGATEUR PAR SWIPE DE L'INDEX PASSAIT ENCORE ICI.
         La 19ah avait pose `data-noswipe` sur le SEUL ecran plein format ;
         le composeur, ses feuilles et la visionneuse ne le portaient pas. Un
         glisse horizontal de plus de 65 px n'importe ou dedans — effleurer
         une photo, la deplacer, faire defiler une bande — declenchait
         `retourEcran()` : l'ecran change SOUS la feuille, elle se demonte, la
         story est perdue. Mots de Blandine : « j'effleure du doigt une photo
         tout saute ».
         ⚠️ REGLE : TOUT ecran fixe de ce module porte `data-noswipe`. */
      "data-noswipe": "1",
      style: { position: "fixed", inset: 0, zIndex: 9420, background: "rgba(4,6,9,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }
    },
      (typeof PhotoZoomHype === "function") ? h(PhotoZoomHype, { src: plein }) : h("img", { src: plein, alt: "", style: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" } }),
      /* le rang, pour savoir où l'on est — seulement s'il y a de quoi naviguer */
      (membres.length > 1)
        ? h("div", { style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 18px)", left: 16, padding: "5px 11px", borderRadius: 999, background: "rgba(6,7,9,0.62)", border: "1px solid rgba(255,255,255,0.14)", color: "#E4ECEF", fontFamily: M, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.4, pointerEvents: "none" } }, (pleinIx + 1) + " / " + membres.length)
        : null,
      h("button", { onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); fermerPlein(); }, "aria-label": "Fermer", style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)", color: "#E4ECEF", fontSize: 15, cursor: "pointer" } }, "\u2715"))
    : null;
  /* 19b (14/08) : PENDANT LE PLEIN ECRAN, LA COMPOSITION EST DEMONTEE.
     Le zoom montait une image plein format PAR-DESSUS les cinq photos de la
     composition, deja decodees : six images vivantes, et iOS fermait l'onglet
     (« quand j'ai voulu la regarder de plus pres tout a saute et je me suis
     fait sortir de l'appli »). Une seule image a la fois, desormais. Rien
     n'est perdu : la composition se remonte a la fermeture, l'animation de
     depliage la fait revenir comme a l'ouverture. */
  var d = (story.disposition && story.disposition.indexOf("modele-") === 0) ? hsModeles()[story.disposition] : null;
  var cadres = h("style", { dangerouslySetInnerHTML: { __html: "@keyframes hsDeplie{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:none}}" } });
  if (plein) return h("div", { style: { position: "relative", width: "100%", height: "100%" } }, cadres, surcouche);
  /* 19s : « les stories sont trop collees a droite ». La composition etait
     dessinee pleine largeur alors que tout le reste de l'ecran respire :
     legende rognee, pastille musique coupee, tirages hors cadre. */
  var MARGE_COMPO = 14;
  if (d && d.fenetres && d.fenetres.length) {
    /* LE MODELE : un plan aux proportions du decor, les photos posees dans
       les bbox des fenetres et DECOUPEES a leur contour exact (clip-path en
       pourcentage : la mise a l'echelle est gratuite). Le decor par-dessus,
       intouchable — les fenetres, elles, s'ouvrent en plein ecran. */
    var W = d.taille[0], H = d.taille[1];
    return h("div", { style: { position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 " + MARGE_COMPO + "px", boxSizing: "border-box" } },
      cadres,
      h("div", { style: { position: "relative", aspectRatio: W + " / " + H, maxWidth: "100%", maxHeight: "100%", width: "auto", height: "100%" } },
        d.fenetres.map(function (f, ix) {
          var st = membres[ix]; if (!st) return null;
          /* clip-path en % DE LA FENETRE : le contour (coordonnees decor)
             est rapporte a la bbox, la mise a l'echelle devient gratuite. */
          var pc = (f.contour || []).map(function (p) {
            return (100 * (p[0] - f.bbox[0]) / f.bbox[2]).toFixed(2) + "% " + (100 * (p[1] - f.bbox[1]) / f.bbox[3]).toFixed(2) + "%";
          }).join(", ");
          return photoTouchable(st, ix, {
            position: "absolute",
            left: (100 * f.bbox[0] / W) + "%", top: (100 * f.bbox[1] / H) + "%",
            width: (100 * f.bbox[2] / W) + "%", height: (100 * f.bbox[3] / H) + "%",
            clipPath: pc ? ("polygon(" + pc + ")") : "none",
            WebkitClipPath: pc ? ("polygon(" + pc + ")") : "none"
          });
        }),
        h("img", { src: story.disposition + ".webp", alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } })),
      surcouche);
  }
  /* H+D : la grande, le texte suspendu sous le fil de lumiere, la table.
     ⚠️ 19ai — LA GEOMETRIE N'EST PLUS ECRITE A L'AVANCE. Elle etait fixe et
     verticale (grande a 58 % de hauteur, tirages en `3 / 4`), donc deux
     photos couchees ressortaient dans deux fenetres debout, rognees. Chaque
     cadre prend desormais le rapport de SA photo (`hsBoutonForme`). Le
     `justifyContent: center` remplace l'etirement : ce qui n'est plus pris en
     hauteur devient du vide, pas du rognage. */
  var grande = membres[0]; var tirages = membres.slice(1);
  /* ⚠️ 19aj — FAUTE DE CLAUDE (19ai), corrigee. En donnant aux tirages une
     largeur qui suit la photo, je n'ai borne NI la rangee NI le bloc : trois
     tirages couches font plus large que l'ecran, la rangee imposait sa
     largeur au bloc entier, et TOUT debordait a droite — grande photo coupee,
     legende tronquee. Mots de Blandine : « tout est colle a droite ».
     `maxWidth: 100%` et `minWidth: 0` confinent le bloc ; la rangee, elle,
     est bornee plus bas. */
  return h("div", { style: { position: "relative", width: "100%", maxWidth: "100%", minWidth: 0, height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px " + MARGE_COMPO + "px calc(env(safe-area-inset-bottom) + 10px)", boxSizing: "border-box", gap: 10 } },
    cadres,
    h(hsBoutonForme, {
      src: src(grande), base: 1, borne: [0.62, 1.9],
      onOuvrir: function () { ouvrirPlein(src(grande)); },
      style: { flex: "0 0 auto", width: "100%", maxHeight: "62%", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", animation: "hsDeplie 400ms ease both" }
    }),
    story.legende
      ? h("div", { style: { textAlign: "center", animation: "hsDeplie 400ms ease both", animationDelay: "120ms" } },
        h("div", { style: { width: 120, height: 1, margin: "0 auto 7px", background: "linear-gradient(90deg, transparent, rgba(32,217,245,0.75), transparent)", boxShadow: "0 0 10px rgba(32,217,245,0.4)" } }),
        /* 19aj (demande de Blandine) : « quand on fait un texte avec des
           espaces des retours a la ligne etc on peut garder la disposition ».
           Sans regle, le navigateur replie tous les blancs et le texte devient
           un pave. `pre-wrap` garde les retours et les espaces ; `break-word`
           evite qu'un mot tres long elargisse le bloc.
           La hauteur passe de 54 a 96 px : avec des retours a la ligne, trois
           lignes etaient atteintes tout de suite. */
        /* ⚠️ 19am — DISPOSITION « B », choisie par Blandine sur maquette :
           « si tu fais le deroule dans la composition tu mets plus le texte en
           bas ». La legende ENTIERE vit ici, le panneau du bas ne garde que
           le lieu. Plus de double ecriture.
           LA COUPE : `-webkit-line-clamp` coupe sur des LIGNES ENTIERES et
           pose les points de suspension. L'ancien `maxHeight: 96` tranchait au
           pixel — on voyait la moitie haute des lettres (« essaye de couper
           proprement ! »). `line-clamp` ne se combine PAS avec `pre-wrap`
           dans toutes les versions de Safari, donc le repli utilise
           `pre-line` (retours a la ligne gardes) et le deplie `pre-wrap`
           (retours ET espaces, comme demande en 19aj).
           LE DEROULE met le minuteur en PAUSE : sans ca la story defile
           pendant la lecture — defaut deja corrige en 114b, ne pas le
           reintroduire. */
        h("div", {
          style: Object.assign(
            { fontFamily: M, fontSize: 12.5, color: "#E8EEF1", lineHeight: 1.45, padding: "0 8px", overflowWrap: "break-word", textAlign: "left" },
            deplie
              ? { whiteSpace: "pre-wrap", maxHeight: "42vh", overflowY: "auto", WebkitOverflowScrolling: "touch" }
              : { whiteSpace: "pre-line", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" })
        }, morceauxLegende),
        longue
          ? h("button", {
            onClick: function (ev) {
              if (ev && ev.stopPropagation) ev.stopPropagation();
              var v = !deplie; setDeplie(v);
              try { if (props.pause) props.pause(v); } catch (eP) { }
            },
            style: { marginTop: 6, background: "none", border: "none", padding: "2px 6px", color: tnL, fontSize: 11, fontWeight: 700, fontFamily: M, cursor: "pointer" }
          }, hsT(deplie ? "voirMoins" : "voirPlus", lg))
          : null)
      : null,
    tirages.length
      /* 19t (14/08, demande de Blandine : « on aimerait pouvoir faire defiler
         les photos en bas de la story, elles sont fixes »). La table de
         tirages debordait a droite sans qu'on puisse l'atteindre. Elle defile
         desormais : `data-hscroll` pour que la navigation de l'index laisse
         passer le geste, `touchAction: pan-x` pour lever le `none` pose sur la
         zone photo en 19h, et le geste arrete ici pour que la visionneuse ne
         le prenne pas pour un changement de story. */
      ? h("div", {
        "data-hscroll": "1",
        onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchMove: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchEnd: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        style: {
          /* 19aj : `width/maxWidth/minWidth` = la rangee ne peut plus dicter
             sa largeur au bloc. Elle defile deja (19t), le contenu trop large
             se rejoint donc du doigt au lieu de deborder de l'ecran.
             `justifyContent: flex-start` des que ca deborderait : centrer un
             contenu plus large que sa boite rend le debut inatteignable. */
          flex: "0 0 auto", display: "flex", gap: 8, alignItems: "flex-end",
          width: "100%", maxWidth: "100%", minWidth: 0,
          /* 19am : a partir de 3 tirages la rangee deborde — le dernier etait
             coupe net par le bord, ce qui ressemblait a un defaut plutot qu'a
             une rangee qu'on fait glisser. Le bord droit s'estompe donc : il
             DIT que ca continue. Pose seulement quand ca peut deborder. */
          WebkitMaskImage: (tirages.length >= 3 ? "linear-gradient(90deg, #000 86%, transparent 100%)" : "none"),
          maskImage: (tirages.length >= 3 ? "linear-gradient(90deg, #000 86%, transparent 100%)" : "none"),
          justifyContent: tirages.length >= 3 ? "flex-start" : "center",
          overflowX: "auto", overflowY: "hidden", touchAction: "pan-x",
          WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
          paddingBottom: 2
        }
      },
        tirages.map(function (st, ix) {
          /* 19ai : hauteur commune, largeur donnee par la photo. Un tirage
             couche est LARGE, un tirage debout est HAUT — plus de format
             impose qui coupe la moitie de l'obstacle. */
          return h(hsBoutonForme, {
            key: "tg" + ix, src: src(st), base: 0.75, borne: [0.55, 1.75],
            onOuvrir: function () { ouvrirPlein(src(st)); },
            style: {
              flex: "0 0 auto",
              height: (tirages.length >= 4 ? 96 : tirages.length === 3 ? 116 : 142),
              borderRadius: 6, overflow: "hidden",
              border: "3px solid #F4F7FA", boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
              transform: "rotate(" + (ix % 2 === 0 ? -2.2 : 2.4) + "deg)",
              animation: "hsDeplie 400ms ease both", animationDelay: ((ix + 1) * 120) + "ms"
            }
          });
        }))
      : null,
    surcouche);
}

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
  var sS = React.useState(props.departStory || 0), is = sS[0], setIs = sS[1];
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
  var ajS = React.useState(null), ajout = ajS[0], setAjout = ajS[1];
  /* 19c : un message PRECIS venu du composeur (ex. composition refusee par la
     base) plutot que le « echec » generique. */
  var nlS = React.useState(null), noteLibre = nlS[0], setNoteLibre = nlS[1];
  var ajoutRef = React.useRef(null);
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
  /* 19b : en veille = un composeur d'ajout est ouvert par-dessus. */
  var enVeille = !!ajout;

  React.useEffect(function () {
    return function () { try { if (lecteurRef.current) { lecteurRef.current.pause(); lecteurRef.current.__hsJoue = false; lecteurRef.current = null; } } catch (e) { } };
  }, []);

  /* Le geste retour (bord d'écran iOS, bouton Android) ferme le plus haut
     d'abord : le menu ⋯, puis la feuille ouverte, puis la visionneuse.
     Enregistré sur le rail retour de l'index (même famille que
     __memoryPoneyRetour) ; retiré au démontage. */
  var retourRef = React.useRef({});
  retourRef.current = { menuOuvert: menuOuvert, enEdition: enEdition, choix: choix };
  /* 19s : le minuteur tourne dans un effet qui ne se relance pas a chaque
     ouverture de panneau — il doit donc lire l'etat par REFERENCE, sinon il
     resterait sur la valeur du montage et continuerait d'avancer. */
  var panneauRef = React.useRef(false);
  panneauRef.current = !!(menuOuvert || choix || enEdition || ajout);

  /* 19u (14/08) — LA STORY SE FERMAIT PENDANT QU'ELLE EN CREAIT UNE.
     Le composeur s'ouvre PAR-DESSUS la story regardee ; celle-ci continuait
     son cycle derriere la feuille et se fermait au bout de sa duree, emportant
     photos, legende et cadrage. Le gel de la 19s couvrait `ajout`, mais le
     selecteur de photos d'iOS s'ouvre AVANT que l'appli le sache : il restait
     un intervalle ou la story tournait encore.
     Ici : la page qui perd le focus (selecteur systeme, appel, notification)
     fige le minuteur, et le rend au retour. */
  var fondRef = React.useRef(false);
  React.useEffect(function () {
    function surVisibilite() {
      try { fondRef.current = (typeof document !== "undefined" && document.hidden === true); } catch (e) { fondRef.current = false; }
    }
    function surSortie() { fondRef.current = true; }
    function surRetour() { fondRef.current = false; }
    try {
      document.addEventListener("visibilitychange", surVisibilite);
      window.addEventListener("blur", surSortie);
      window.addEventListener("focus", surRetour);
      window.addEventListener("pagehide", surSortie);
      window.addEventListener("pageshow", surRetour);
    } catch (e) { }
    return function () {
      try {
        document.removeEventListener("visibilitychange", surVisibilite);
        window.removeEventListener("blur", surSortie);
        window.removeEventListener("focus", surRetour);
        window.removeEventListener("pagehide", surSortie);
        window.removeEventListener("pageshow", surRetour);
      } catch (e2) { }
    };
  }, []);
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
    /* 19av : la musique joue aussi dans une a la une — la story est la vraie. */
    if (!chargee || erreur) return;
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
    /* 19av : les identifications survivent (table indexee par photo_url). */
    if (story.photo_url && typeof hsTagsDeStory === "function") {
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
      /* 19s : LE MINUTEUR SE FIGE DES QU'UN PANNEAU EST OUVERT. Blandine :
         « il faut monter pour atteindre le menu, redescendre pour arriver a
         Supprimer, et un coup sur deux la photo lache entre les deux ».
         C'etait la story qui avançait pendant qu'elle cherchait le bouton. */
      if (pauseRef.current || panneauRef.current || fondRef.current) {
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
      if (enEdition || choix || menuOuvert || ajout) { glisseRef.current.actif = false; return; }
      pauseRef.current = true;
      /* CORRECTIF DU 13/08 : le glissé de fermeture ne s'arme qu'à UN doigt.
         Avant, un pincement de zoom était pris pour un glissé — c'est le
         geste exact qui a fait planter la première story de Blandine. Deux
         doigts appartiennent à PhotoZoomHype, la boîte ne bouge pas. */
      if (e.touches && e.touches.length > 1) { glisseRef.current.actif = false; return; }
      var t = e.touches && e.touches[0];
      /* 19z (14/08, signalement de Blandine) : « je regarde mes stories, je
         swipe vers la gauche, je veux revenir en arriere je swipe vers la
         droite, je suis dehors ». On retient desormais x0 en plus de y0 :
         il sert au glisse horizontal (voir toucheFin) ET au blocage du geste
         de retour d'iOS, qui part TOUJOURS du bord. */
      if (t) glisseRef.current = { y0: t.clientY, x0: t.clientX, actif: true, horiz: false };
    } catch (er) { }
  }
  function toucheBouge(e) {
    try {
      if (enEdition || choix || menuOuvert || ajout) { glisseRef.current.actif = false; return; }
      if (e.touches && e.touches.length > 1) { glisseRef.current.actif = false; if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)"; return; }
      if (!glisseRef.current.actif) return;
      var t = e.touches && e.touches[0];
      if (!t) return;
      var dy = t.clientY - glisseRef.current.y0;
      var dx = t.clientX - (glisseRef.current.x0 || 0);
      /* 19z — LE BLOCAGE DU RETOUR D'iOS, EN JAVASCRIPT.
         Mon correctif 19y avait remplace touchAction "none" par "pan-y" pour
         rendre le defilement vertical. ERREUR DE CLAUDE, signalee a Blandine :
         "pan-y" ne suffit PAS a retenir le geste de retour d'iOS, qui est
         reparti. Le CSS ne sait pas faire la difference entre "glisser vers la
         droite dans la page" et "revenir en arriere" ; le JavaScript, si.
         preventDefault sur un mouvement horizontal ample ANNULE le geste
         systeme. Le defilement vertical reste entier : on ne touche a rien
         tant que le mouvement est vertical. */
      if (!glisseRef.current.horiz && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.4) glisseRef.current.horiz = true;
      if (glisseRef.current.horiz) {
        try { if (e.cancelable) e.preventDefault(); } catch (eP) { }
        if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)";
        return;   /* un glisse horizontal n'est plus un glisse de fermeture */
      }
      if (dy > 0 && boiteRef.current) boiteRef.current.style.transform = "translateY(" + Math.min(dy, 260) + "px)";
    } catch (er) { }
  }
  function toucheFin(e) {
    try {
      if (enEdition || choix || menuOuvert || ajout) { glisseRef.current.actif = false; return; }
      /* ⚠️ 19al — FAUTE DE CLAUDE, TROUVEE PAR BLANDINE : « je peux pas
         appuyer sur le coeur ca ferme la story direct ».
         Les pastilles du bas (musique depuis le 13/08, coeur depuis la 19ak)
         arretent `touchstart` pour qu'un glisse ne parte pas d'elles, mais
         laissent passer `touchend` — c'est voulu, stopper `touchend` laissait
         la boite coincee en pleine transformation.
         Seulement `toucheFin` ne verifiait JAMAIS que le glisse avait ete
         arme : il mesurait la fin du toucher contre le point de depart d'un
         toucher PRECEDENT, reste en memoire. Un appui sur une pastille en bas
         d'ecran, compare a un depart situe plus haut, donnait une descente de
         bien plus de 110 px — soit le geste qui FERME la story.
         Le garde est ici, a la racine, et non sur chaque pastille : toute
         pastille future en est protegee d'office.
         ⚠️ NE JAMAIS retirer ce test sans arreter `touchend` partout, ce qui
         reintroduirait le defaut du 13/08. */
      if (!glisseRef.current.actif) { glisseRef.current.horiz = false; return; }
      pauseRef.current = false;
      var dy = 0, dx = 0;
      var t = e.changedTouches && e.changedTouches[0];
      if (t) { dy = t.clientY - glisseRef.current.y0; dx = t.clientX - (glisseRef.current.x0 || 0); }
      var etaitHoriz = !!glisseRef.current.horiz;
      glisseRef.current.actif = false; glisseRef.current.horiz = false;
      if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)";
      /* 19z (demande de Blandine, 14/08) : le glisse horizontal NAVIGUE.
         Vers la GAUCHE = story suivante. Vers la DROITE = story precedente —
         « oui revenir en arriere », ses mots. Le seuil de 55 px evite qu'un
         tap legerement traine soit pris pour un glisse : les zones de tap
         gauche/droite gardent tout leur role. */
      if (etaitHoriz && Math.abs(dx) > 55) {
        hsAmorcerAudio();
        if (dx < 0) suivante(); else precedente();
        return;
      }
      if (dy > 110) fermer();
    } catch (er) { }
  }

  /* 19z — ⚠️ PIEGE A NE PAS OUBLIER. React attache ses ecouteurs tactiles en
     mode PASSIF : un preventDefault ecrit dans onTouchMove est purement et
     simplement IGNORE par le navigateur (avertissement en console, geste
     systeme non retenu). Le seul moyen d'annuler le retour d'iOS est un
     ecouteur NATIF pose avec { passive: false }.
     Il ne fait qu'une chose : quand toucheBouge a reconnu un glisse
     horizontal, il annule le geste systeme. Toute la logique reste dans les
     gestionnaires React — celui-ci n'est qu'un interrupteur.
     ⚠️ Ne pas "simplifier" en remettant preventDefault dans onTouchMove :
     ca ne marchera pas, et le defaut reviendra sans bruit. */
  React.useEffect(function () {
    var el = boiteRef.current;
    if (!el) return;
    function bloquer(ev) {
      try { if (glisseRef.current && glisseRef.current.horiz && ev.cancelable) ev.preventDefault(); } catch (eB) { }
    }
    el.addEventListener("touchmove", bloquer, { passive: false });
    return function () { try { el.removeEventListener("touchmove", bloquer, { passive: false }); } catch (eR) { } };
  }, []);

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
      /* ⚠️ 19ai — LE NAVIGATEUR PAR SWIPE DE L'INDEX PASSAIT ENCORE ICI.
         La 19ah avait pose `data-noswipe` sur le SEUL ecran plein format ;
         le composeur, ses feuilles et la visionneuse ne le portaient pas. Un
         glisse horizontal de plus de 65 px n'importe ou dedans — effleurer
         une photo, la deplacer, faire defiler une bande — declenchait
         `retourEcran()` : l'ecran change SOUS la feuille, elle se demonte, la
         story est perdue. Mots de Blandine : « j'effleure du doigt une photo
         tout saute ».
         ⚠️ REGLE : TOUT ecran fixe de ce module porte `data-noswipe`. */
      "data-noswipe": "1",
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
            ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(groupe.avatar_url, 96, 96) : groupe.avatar_url, alt: "", onError: function (ev) { try { hsVignetteCassee(ev, groupe.avatar_url); } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } })
            : h("span", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: tnL } }, String(groupe.pseudo || "?").charAt(0).toUpperCase())),
        h("div", { style: { minWidth: 0, flex: 1 } },
          h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, groupe.pseudo || "Cavalier"),
          h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
            hsTempsRelatif(story.created_at, lg) + (groupe.ecurie ? (" \u00b7 " + groupe.ecurie) : ""),
            /* 19an — LE TEMPS QU'IL RESTE, POUR L'AUTEUR SEUL.
               `estMoi` : personne d'autre n'a à savoir quand une story
               s'efface. Choix de Blandine sur maquette (rangées 1 et 3) :
               « encore 5 jours », qui bascule en « dernier jour » DORÉ sur la
               fin — doré et pas rouge, c'est un rappel, pas une alarme, et
               c'est le bon moment pour penser à garder la story en souvenir. */
            (function () {
              if (!estMoi) return null;
              var r = hsResteAVivre(story.expire_le, lg);
              if (!r) return null;
              return h("span", { style: { color: r.chaud ? "#E8C77A" : tnL, fontWeight: 700 } }, " \u00b7 " + r.texte);
            })())),
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
      /* 19c : touchAction "none" sur TOUTE la zone photo. Le geste de retour
         d'iOS partait du NOIR autour d'une photo paysage (la photo, elle,
         etait deja protegee) : « j'ai juste swipe changer d'image et ca me
         ramene a l'accueil » (Blandine, 14/08). Les gestes de la visionneuse
         sont en JavaScript : ils continuent de fonctionner.
         19y (14/08, REGRESSION SIGNALEE PAR BLANDINE) : le "none" de 19c a
         tue le defilement vertical — « on peut plus scroll pour voir le texte
         en dessous ». On repasse en "pan-y" : le geste VERTICAL redevient
         possible, et le retour d'iOS reste bloque puisqu'il est HORIZONTAL.
         C'est le seul reglage qui satisfait les deux besoins a la fois. */
      h("div", { style: { flex: 1, position: "relative", minHeight: 0, background: "#060709", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", touchAction: "pan-y" } },
        /* LE FOND IMMERSIF (13/08, spec de Blandine) : si l'AUTEUR l'a choisi,
           la même photo remplit l'écran derrière, en cover, fortement floutée
           et assombrie — la photo d'origine reste nette et ENTIÈRE devant
           (contain, comme toujours : jamais de recadrage). inset négatif +
           scale : le halo du flou ne laisse pas de bord clair. pointerEvents
           none et AUCUN zIndex : les zones (1) et la pastille (10) restent
           au-dessus. Une story sans fond garde le noir d'aujourd'hui. */
        (HS_FOND_IMMERSIF_ACTIF && story.fond === "immersif" && chargee && !erreur)
          ? h("div", { "aria-hidden": true, style: { position: "absolute", inset: -24, zIndex: 0, backgroundImage: "url(\"" + hsImageFlou(story.photo_url) + "\")", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(26px) brightness(0.5) saturate(1.05)", transform: "scale(1.12)", pointerEvents: "none" } })
          : null,
        h("style", { dangerouslySetInnerHTML: { __html: "@keyframes hsResp{0%,100%{opacity:.28;transform:scale(.9)}50%{opacity:.85;transform:scale(1.06)}}" } }),
        (!chargee && !erreur)
          ? h("div", { style: { position: "absolute", width: 54, height: 54, borderRadius: "50%", border: "1px solid " + tA(0.5), boxShadow: "0 0 26px " + tA(0.3) + ", inset 0 0 20px " + tA(0.14), animation: "hsResp 1600ms ease-in-out infinite" } })
          : null,
        erreur
          ? h("div", { style: { position: "absolute", padding: "0 30px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#8A929C", lineHeight: 1.5 } }, hsT("photoIndispo", lg))
          : null,
        /* 19b (14/08) : LA VISIONNEUSE SE MET EN VEILLE PENDANT LE COMPOSEUR.
           Le composeur d'ajout s'ouvre PAR-DESSUS (dessus:true) : ses photos
           choisies se decodaient pendant que la photo de la story — voire les
           cinq d'une composition — restaient vivantes dessous. On les demonte
           le temps de l'ajout ; elles reviennent a la fermeture. */
        /* 19c : LA COUCHE DE LA PHOTO NETTE. C'est elle qui manquait — sans
           zIndex, un <img> non positionne passe SOUS le calque floute. */
        h("div", { style: { position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 } },
          /* 19d : une story SEULE portant un decor (`disposition: modele-*`)
             passe elle aussi par CompositionStory — sans quoi elle
             s'afficherait nue, sans son cadre. C'est ce qui manquait pour que
             les modeles a une fenetre servent enfin. */
          (chargee && !erreur && !enVeille && hsAvecDecor(story))
            /* 19am : la composition recoit les mentions et l'ouvreur de profil,
               puisque la legende a demenage chez elle (disposition « B »). */
            ? h(CompositionStory, {
              story: story, langue: lg, tags: tagsStory,
              pause: function (v) { try { pauseRef.current = !!v; } catch (eP) { } },
              onCavalier: function (tag) {
                try {
                  if (typeof window !== "undefined") {
                    window.__cavalierPublic = { id: tag.cible_id, pseudo: tag.cible_nom || "", photo: null, ecurie: "", club: "", ville: "" };
                    window.__cavalierOuvert = "__public";
                  }
                } catch (e) { }
                fermer();
                try { if (ctxV && ctxV.setEcran) ctxV.setEcran("cavalier"); } catch (e2) { }
              }
            })
            : ((typeof PhotoZoomHype === "function" && chargee && !erreur && !enVeille)
              ? h(PhotoZoomHype, { src: hsImageEcran(story.photo_url) })
              : null)),
        /* 19ak (feu vert de Blandine) : LE CŒUR, en bas à gauche, sous les
           zones de navigation qui s'arrêtent à 74 px du bas. `key` sur
           l'identifiant : changer de story remonte la pastille, donc son
           compteur repart de la bonne story et jamais de la précédente. */
        (story && story.id)
          ? h(CoeurStory, { key: "cr" + story.id, storyId: story.id, langue: lg })
          : null,
        /* 19aq (feu vert de Blandine : « rajoute-le »). LE PARTAGE, absent du
           module alors que la famille d'adresses etait deja prevue : `#s=<id>`
           pose `window.__storyOuverte` et ouvre Communaute (CIBLE_DIRECTE,
           index.html). On passe par hypePartager, la fonction unique de l'app
           -- rien n'est redecide ici, et le jour ou le format des adresses
           change, un seul endroit bouge.
           La photo est jointe : c'est ce qui fait la difference dans WhatsApp
           et Instagram. hypePartager retombe seul sur le lien nu si l'image
           depasse 8 Mo, puis sur le presse-papier sans partage systeme.
           Pose a 14px du bas A DROITE, en miroir du coeur, sous les zones de
           navigation qui s'arretent a 74px du bas.
           touchstart arrete, touchend JAMAIS -- regle du 13/08 : un glisse
           parti de la photo et fini sur une pastille laisserait la boite
           coincee en pleine transformation. */
        (story && story.id && typeof window !== "undefined" && typeof window.hypePartager === "function")
          ? h("button", {
              onClick: function (ev) {
                if (ev && ev.stopPropagation) ev.stopPropagation();
                try {
                  var titP = (story.pseudo ? (story.pseudo + " \u2014 ") : "") + (story.lieu || "Story");
                  window.hypePartager("s", story.id, titP, { image: story.photo_url || null });
                } catch (eP) { }
              },
              onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
              "aria-label": "Partager",
              style: {
                position: "absolute", right: 14, bottom: 14, zIndex: 10,
                width: 42, height: 42, borderRadius: 999, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.25)", background: "rgba(6,7,9,0.72)",
                color: "#DCE3E8", fontSize: 17, lineHeight: 1, padding: 0
              }
            }, "\u21AA")
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
        enVeille ? null : h("img", {
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
        /* ⚠️ 19am — LES DEUX ZONES DE TOUCHER SONT SUPPRIMEES.
           Deux boutons transparents couvraient la story (32 % a gauche pour
           reculer, 48 % a droite pour avancer). Ils passaient DEVANT les
           photos : toucher une photo d'une composition faisait avancer la
           story au lieu de l'ouvrir — signale trois fois par Blandine.
           Sa decision : « la story pour avancer ou reculer on devrait swipe
           pas toucher » et, sur la question de garder le toucher sur les
           stories a une seule photo, « non qu'il ouvre partout sinon on s'y
           perd ». Une regle, aucune exception :
             — le GLISSE horizontal navigue (deja en place depuis la 19z,
               seuil 55 px, voir toucheFin) ;
             — le TOUCHER ouvre la photo.
           ⚠️ NE JAMAIS remettre de zone tactile plein cadre ici : c'est ce
           qui a rendu les photos, le coeur et la musique inatteignables. */
        null),

      /* 19am : « en bas tout est entasse » (Blandine). Le panneau respire —
         plus d'air autour du lieu, interligne releve dans le texte des stories
         qui en gardent un (celles sans composition). */
      /* /!\ 19aq (16/08, panne signalee par Blandine : « on est coinces sur la
           story on peut plus liker ou partager », « on peut tjs pas remonter
           ou descendre »).
           LE PANNEAU DU BAS N'ETAIT BORNE PAR RIEN. La visionneuse est une
           colonne de trois blocs : en-tete, zone photo (flex:1, minHeight:0),
           panneau. Une longue legende depliee faisait grandir le panneau sans
           limite ; la zone photo etant la seule elastique, c'est ELLE qui
           s'ecrasait. Deux degats :
             - le COEUR disparait : il est pose a 14px du bas A L'INTERIEUR de
               la zone photo. Zone ecrasee, coeur hors de vue -- d'ou « on peut
               plus liker », alors que le bouton n'a jamais ete casse ;
             - le bas est COUPE : lieu et photos sortent de l'ecran, et rien ne
               defile pour aller les chercher.
           La legende avait bien son defilement (42vh), mais tout ce qui vient
           APRES elle en etait exclu.
           Correctif : le panneau ne depasse plus 52% de la hauteur d'ecran et
           defile chez lui. La zone photo garde donc toujours de quoi exister.
           `overscrollBehavior: contain` : son defilement ne se propage pas
           derriere. `touchAction: pan-y` : le vertical lui appartient,
           l'horizontal reste au module (retour iOS bloque, regle 19c/19y). */
        h("div", { style: { flexShrink: 0, maxHeight: "52vh", overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", touchAction: "pan-y", padding: "15px 14px calc(env(safe-area-inset-bottom) + 18px)", background: "linear-gradient(180deg, rgba(17,20,23,0.9), #060709)", borderTop: "1px solid rgba(255,255,255,0.07)" } },
        story.lieu
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, fontWeight: 700, color: tnL, marginBottom: 12, letterSpacing: 0.3 } }, "\uD83D\uDCCD " + story.lieu)
          : null,
        /* ⚠️ 19am — DISPOSITION « B ». La legende n'est plus ecrite ici QUAND
           la story porte une composition : elle vit dans la composition
           elle-meme, avec son propre « voir plus » (choix de Blandine sur
           maquette : « si tu fais le deroule dans la composition tu mets plus
           le texte en bas »). Le panneau ne garde alors que le LIEU.
           Une story SANS composition n'a pas de bloc ou loger son texte : sa
           legende reste ici, sinon elle disparaitrait. */
        (story.legende && !hsAvecDecor(story))
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
                  /* 19aj : `pre-line` gardait les retours a la ligne mais
                     repliait les espaces. `pre-wrap` garde les deux — c'est ce
                     que Blandine a demande : « des espaces des retours a la
                     ligne etc ». */
                  { fontSize: 13.5, lineHeight: 1.75, fontFamily: M, color: "#DCE3E8", whiteSpace: "pre-wrap", wordBreak: "break-word" },
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
        (action || noteLibre)
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: tnL, marginBottom: 10, lineHeight: 1.45 } }, noteLibre || messages[action] || "")
          : null,
        /* 13/08 : la rangee de boutons a REJOINT le menu ⋯ de l'en-tete
           (demande de Blandine). AUCUNE fonction supprimee : Garder en
           souvenir, Modifier, Supprimer (proprietaire) et Signaler
           (visiteur) vivent dans la feuille du menu, memes handlers. */
        null),

    h("input", {
      ref: ajoutRef, type: "file", accept: "image/*", multiple: true,
      onChange: function (ev) {
        try {
          var fs = ev && ev.target && ev.target.files ? Array.prototype.slice.call(ev.target.files, 0, HS_MULTI_MAX) : [];
          if (fs.length) setAjout(fs); else pauseRef.current = false;
          if (ev && ev.target) ev.target.value = "";
        } catch (eA) { pauseRef.current = false; }
      },
      style: { display: "none" }
    }),

    ajout
      ? h(ComposeurStory, {
        fichier: ajout, langue: lg, dessus: true, premium: !!props.premium,
        /* 19b : l'origine porte de quoi ABSORBER la story en ligne dans un
           groupe — son id (ou ceux de sa composition, dans l'ordre) et le
           groupe qu'elle a deja. */
        origine: {
          url: hsImageEcran(story.photo_url),
          id: story.id,
          groupe: story.groupe || null,
          ids: (story.compo && story.compo.length ? story.compo : [story]).map(function (s2) { return s2 && s2.id; }).filter(function (x) { return !!x; }),
          n: (story.compo && story.compo.length) ? story.compo.length : 1
        },
        lieuInitial: story.lieu || "", musiqueInitiale: story.musique || null,
        onFermer: function () { setAjout(null); pauseRef.current = false; setRelance(function (r) { return r + 1; }); },
        onEchec: function (msg) { setAjout(null); pauseRef.current = false; setNoteLibre(msg || null); setAction("echec"); },
        /* Publie : la visionneuse se ferme, le bandeau recharge (son onFermer
           appelle charger()) — la story rouverte contient les nouvelles photos. */
        onPublie: function () { setAjout(null); fermer(); }
      })
      : null,

    /* LA FEUILLE DU MENU ⋯ : toutes les actions de la story, memes
       permissions qu'avant (garder/modifier/supprimer = proprietaire,
       signaler = visiteur). Ceinture tactile comme les autres feuilles. */
    menuOuvert
      ? h("div", {
        /* 19y (14/08, REGRESSION GRAVE SIGNALEE PAR BLANDINE) : « mon fils a
           appuye sur les trois petits points, ca a fige sa page avec le bouton
           signaler mais il ne pouvait plus sortir ». Un cul-de-sac : le
           minuteur etait gele par 19s ET le tap en dehors ne fermait pas.
           Cause : onTouchEnd ne faisait que stopPropagation, et sur iOS le
           click de synthese ne repart pas toujours d'un simple div. On ferme
           donc DES la fin du toucher, mais SEULEMENT si le doigt a fini sur le
           voile lui-meme (ev.target === ev.currentTarget) : un tap sur la
           feuille ne ferme rien et laisse le bouton faire son travail.
           Le onClick reste pour la souris et le clavier. */
        onClick: function (ev) { if (!ev || ev.target === ev.currentTarget) setMenuOuvert(false); },
        onTouchStart: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchMove: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
        onTouchEnd: function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (ev && ev.target === ev.currentTarget) setMenuOuvert(false);
        },
        style: { position: "fixed", inset: 0, zIndex: 9400, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center", cursor: "pointer" }
      },
        h("div", {
          onClick: function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); },
          style: { width: "100%", boxSizing: "border-box", maxWidth: 520, borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "10px 16px calc(env(safe-area-inset-bottom) + 14px)" }
        },
          h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.22)", margin: "4px auto 12px" } }),
          (estMoi ? [
            /* 13/08 (demande de Blandine) : ajouter des photos A SA STORY en
               ligne. Le composeur s'ouvre pre-rempli (lieu + musique de la
               story) ; les nouvelles photos rejoignent la suite de son fil. */
            { ic: "\uff0b", txt: hsT("ajouterPhotos", lg), on: function () { setMenuOuvert(false); pauseRef.current = true; try { if (ajoutRef.current) ajoutRef.current.click(); } catch (eC) { } }, accent: true },
            { ic: "\u2726", txt: (story.garde || action === "rangee") ? hsT("gardee", lg) : hsT("garder", lg), on: function () { setMenuOuvert(false); pauseRef.current = true; setChoix(true); } },
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
          }),
          /* 19y : une sortie VISIBLE, en plus du tap en dehors. Un enfant qui
             ouvre le menu par curiosite doit voir comment en sortir sans
             deviner un geste. Ceinture et bretelles : si un jour le tap en
             dehors casse encore, ce bouton reste. */
          h("button", {
            key: "mnAnn",
            onClick: function () { setMenuOuvert(false); },
            style: { display: "block", width: "100%", marginTop: 4, padding: "14px 10px", borderRadius: 12, border: "none", borderTop: "1px solid rgba(255,255,255,0.10)", background: "transparent", color: "rgba(220,227,232,0.62)", fontSize: 13.5, fontWeight: 600, fontFamily: M, cursor: "pointer" }
          }, hsT("annuler", lg))))
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
    window.MurImmersif = MurImmersif;
    window.PastilleMusiquePage = PastilleMusiquePage;
    window.ChoixALaUne = ChoixALaUne;
    window.ModifierStory = ModifierStory;
    window.VisionneuseStories = VisionneuseStories;
    window.ComposeurStory = ComposeurStory;
  }
} catch (eW2) { }
