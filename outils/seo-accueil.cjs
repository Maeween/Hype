/* HYPE ▸ outils/seo-accueil.cjs — 12/10/2026 (référencement, action 2 : la page d'accueil pour Google).
   Lancé par NETLIFY au moment de publier (netlify.toml, [build] command), APRÈS alleger-index.cjs.
   Rien n'est jamais réécrit dans le dépôt GitHub : seule la copie publiée change.

   CE QU'IL FAIT
   1. Il copie l'index publié tel quel dans app-base.html. C'est cette copie, SANS le texte de l'accueil,
      que les pages /cheval/, /ecurie/ et /evenement/ vont chercher (sinon elles hériteraient du titre et
      du texte de l'accueil). app-base.html est marquée « noindex » (netlify.toml) : Google ne la range pas.
   2. Dans index.html (l'adresse 2hype.fr), il ajoute ce que Google lit :
        - le titre de l'onglet et de Google, à la place de <title>Hype</title> ;
        - la description, l'adresse canonique https://2hype.fr/, l'aperçu de partage (Open Graph) ;
        - une fiche « application » schema.org (gratuite, 10 langues) ;
        - le texte de présentation, glissé dans <div id="root">, comme les fiches chevaux : l'appli le
          remplace en démarrant, rien ne change à l'écran.

   GARDE-FOUS : si un repère manque (<head><meta charset>, <title>Hype</title>, <div id="root">) ou si
   quoi que ce soit échoue, l'index part tel quel et app-base.html reste une copie exacte. Ce script ne
   fait jamais échouer la publication. */
"use strict";
const fs = require("fs");
const path = require("path");
const RACINE = path.join(__dirname, "..");
const INDEX = path.join(RACINE, "index.html");
const BASE = path.join(RACINE, "app-base.html");

function log() { console.log.apply(console, ["[seo-accueil]"].concat([].slice.call(arguments))); }
function echapper(t) {
  return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const DOMAINE = "https://2hype.fr";
const TITRE = "Hype — l'appli des cavaliers : ton cheval, ton écurie et une IA équestre";
const DESCRIPTION = "Photos, souvenirs, vidéos, résultats en concours, santé et soins de ton cheval, " +
  "agenda de ton écurie et Hey Baby, l'IA équestre. En 10 langues.";
const IMAGE = DOMAINE + "/images/hype-partage-1200x630.jpg";   // 12/10 : image de partage de Blandine (1200 × 630)

const H2 = 'style="font-size:17px;color:#d8d2c4;margin:22px 0 6px"';
const TEXTE =
  `<main id="seo-accueil" lang="fr" style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">` +
  `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">Hype, l'application équestre de ton cheval et de ton écurie</h1>` +
  `<p>Hype réunit au même endroit tout ce qui compte pour un cavalier : la vie de ton cheval, tes concours, ta progression et ton écurie. L'appli fonctionne en français, anglais, espagnol, italien, allemand, japonais, arabe, chinois, néerlandais et português do Brasil.</p>` +

  `<h2 ${H2}>Hey Baby, l'IA équestre</h2>` +
  `<p>Pose toutes tes questions d'équitation à Hey Baby. Il se souvient de toi et de ton cheval, et ses conseils suivent vos progrès au fil du temps. Il analyse les photos de ton cheval et de ta position, et te répond dans ta langue.</p>` +

  `<h2 ${H2}>Apprendre l'équitation, en 10 langues</h2>` +
  `<p>Toute la théorie des Galops 1 à 7, illustrée de schémas et d'affiches, avec des quiz pour t'entraîner. Elle est disponible en français, anglais, espagnol, italien, allemand, japonais, arabe, chinois, néerlandais et português do Brasil : apprends l'équitation dans ta langue, ou le vocabulaire équestre dans une autre.</p>` +

  `<h2 ${H2}>Toute la vie de ton cheval</h2><ul style="padding-left:18px;margin:0">` +
  `<li>Photos et albums, partagés avec les autres cavaliers de ton cheval</li>` +
  `<li>Souvenirs : le mur des plus beaux moments, au fil des années</li>` +
  `<li>Vidéos de concours et de séances</li>` +
  `<li>Santé et soins : retrouve en un clin d'œil les dates de vaccination, de vermifuge, de maréchalerie et de dentiste de chaque cheval, ses ordonnances vétérinaires et la liste de ses intervenants (vétérinaire, maréchal, dentiste, ostéopathe…), et reçois des rappels</li>` +
  `<li>Registre d'élevage : la page santé de l'écurie regroupe les soins et les traitements de tous ses chevaux</li>` +
  `<li>Origines et généalogie : père, mère, grands-parents, poulains</li>` +
  `<li>Une fiche partagée entre propriétaire et cavaliers</li></ul>` +

  `<h2 ${H2}>Tes concours</h2><ul style="padding-left:18px;margin:0">` +
  `<li>Importe ton relevé de résultats FFE en un geste : ton palmarès se construit tout seul (avec Hype+)</li>` +
  `<li>Les points de qualification pour les championnats sont comptés pour toi</li>` +
  `<li>Un outil pour lire les listes de départ en concours</li></ul>` +

  `<h2 ${H2}>Ton écurie et ta communauté</h2><ul style="padding-left:18px;margin:0">` +
  `<li>La page de ton écurie : ses chevaux, son agenda, ses événements, son fil commun</li>` +
  `<li>Messagerie et groupes</li>` +
  `<li>Des alertes sur ton téléphone pour ne rien manquer</li></ul>` +

  `<h2 ${H2}>Ta progression</h2>` +
  `<p>Mon carnet : le suivi de tes séances et de tes progrès.</p>` +

  `<h2 ${H2}>Trouve ton écurie</h2>` +
  `<p>Plus de 3 000 écuries et centres équestres en France ont leur page sur Hype. Par exemple : ` +
  `<a href="${DOMAINE}/ecurie/ecurie-feinn">Ecurie Feinn (Itteville)</a>, ` +
  `<a href="${DOMAINE}/ecurie/societe-d-equitation-de-paris-sep">Société d'Équitation de Paris</a>. ` +
  `<a href="${DOMAINE}/fr/centres-equestres/">Tous les centres équestres par département</a>.</p>` +

  `<p style="margin-top:22px"><a href="${DOMAINE}/">Crée ton compte gratuit</a></p>` +
  `</main>`;

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hype",
  url: DOMAINE + "/",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "iOS, Android, Web",
  description: DESCRIPTION,
  inLanguage: ["fr", "en", "es", "it", "de", "ja", "ar", "zh-Hans", "nl", "pt-BR", "sv", "ru"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  image: IMAGE,
};

/* 12/10 (correctif) : le texte de présentation apparaissait à l'écran pendant le chargement de l'appli et à
   chaque mise à jour. Il reste dans le HTML (Google le lit), mais il est caché :
   - dès que le JavaScript démarre (classe « hype-js » posée sur <html> par la toute première balise du <head>) ;
   - toujours dans l'appli installée sur l'écran d'accueil (display-mode: standalone), même sans JavaScript. */
const MASQUE =
  `<script>document.documentElement.classList.add("hype-js")</script>` +
  `<style>html.hype-js #seo-accueil{display:none!important}` +
  `@media (display-mode: standalone){#seo-accueil{display:none!important}}</style>`;

function tete() {
  return (
    MASQUE +
    `<meta name="description" content="${echapper(DESCRIPTION)}">` +
    `<link rel="canonical" href="${DOMAINE}/">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Hype">` +
    `<meta property="og:locale" content="fr_FR">` +
    `<meta property="og:title" content="${echapper(TITRE)}">` +
    `<meta property="og:description" content="${echapper(DESCRIPTION)}">` +
    `<meta property="og:url" content="${DOMAINE}/">` +
    `<meta property="og:image" content="${IMAGE}">` +
    `<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">` +
    `<meta property="og:image:alt" content="Hype — l'appli des cavaliers">` +
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:image" content="${IMAGE}">` +
    `<meta name="twitter:title" content="${echapper(TITRE)}">` +
    `<meta name="twitter:description" content="${echapper(DESCRIPTION)}">` +
    `<script type="application/ld+json">${JSON.stringify(JSONLD).replace(/</g, "\\u003c")}</script>`
  );
}

function principal() {
  let src;
  try { src = fs.readFileSync(INDEX, "utf8"); } catch (e) { log("index.html illisible, rien à faire :", String(e)); return; }

  // 1. La copie pour les pages /cheval/, /ecurie/, /evenement/ (toujours, même si la suite échoue)
  try { fs.writeFileSync(BASE, src); log("app-base.html écrite (" + src.length + " caractères)"); }
  catch (e) { log("app-base.html impossible à écrire :", String(e)); }

  // 2. Les ajouts de l'accueil
  const R_HEAD = '<head><meta charset="utf-8">', R_TITRE = "<title>Hype</title>", R_ROOT = '<div id="root">';
  const iHead = src.indexOf(R_HEAD), iTitre = src.indexOf(R_TITRE), iRoot = src.indexOf(R_ROOT);
  if (iHead < 0 || iTitre < 0 || iRoot < 0 || !(iHead < iTitre && iTitre < iRoot)) {
    log("repère manquant (head " + iHead + ", title " + iTitre + ", root " + iRoot + ") : index publié tel quel");
    return;
  }
  const fin = iHead + R_HEAD.length;
  const sortie =
    src.slice(0, fin) + tete() +
    src.slice(fin, iTitre) + `<title>${echapper(TITRE)}</title>` +
    src.slice(iTitre + R_TITRE.length, iRoot + R_ROOT.length) + TEXTE +
    src.slice(iRoot + R_ROOT.length);
  try { fs.writeFileSync(INDEX, sortie); log("accueil enrichi (+" + (sortie.length - src.length) + " caractères)"); }
  catch (e) {
    log("écriture impossible, index d'origine remis :", String(e));
    try { fs.writeFileSync(INDEX, src); } catch (e2) { /* rien */ }
  }
}

try { principal(); } catch (e) { log("erreur inattendue, publication inchangée :", String(e)); }
process.exitCode = 0;
