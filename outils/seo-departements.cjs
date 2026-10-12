/* ============================================================================
   HYPE ▸ outils/seo-departements.cjs — 12/10/2026 (référencement)
   Lancé par Netlify au moment de publier (voir netlify.toml), après seo-galops.cjs.
   Fabrique les pages publiques « Centres équestres de l'Essonne (91) » :
     - /fr/centres-equestres/                 : tous les départements, par région ;
     - /fr/centres-equestres/<nom>-<code>/    : les écuries d'un département, par ville,
                                                chacune avec un lien vers /ecurie/<adresse> ;
     - sitemap-departements.xml.
   Données : ecuries.json (l'annuaire) + outils/departements-ecuries.json
   (département et ville de chaque écurie, retrouvés une fois pour toutes à partir de
   leur position GPS et des listes officielles INSEE). Une écurie ajoutée plus tard à
   ecuries.json sans être dans ce fichier est simplement absente des listes.
   Pages en français seulement : ce sont des recherches françaises (« centre équestre
   Essonne ») ; 7 copies de la même liste seraient vues comme des doublons.
   Ne fait JAMAIS échouer la publication.
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const RACINE = path.join(__dirname, "..");
const DOM = "https://2hype.fr";
function log() { console.log.apply(console, ["[seo-departements]"].concat([].slice.call(arguments))); }
const e = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tri = (a, b) => a.localeCompare(b, "fr", { sensitivity: "base" });

// « de l'Essonne », « du Nord », « des Yvelines », « de la Gironde » (TNCC de l'INSEE)
function deDep(nom, tncc) {
  switch (tncc) {
    case 1: return "d'" + nom;
    case 2: return "du " + nom;
    case 3: return "de la " + nom;
    case 4: return "des " + nom;
    case 5: return "de l'" + nom;
    default: return "de " + nom;
  }
}

const CSS = `:root{--fond:#060a09;--fond2:#0b1513;--ivoire:#ece5d6;--doux:#b9b3a6;--champ:#d9b97a;--trait:rgba(217,185,122,.28)}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--fond);color:var(--ivoire);font:16px/1.7 Montserrat,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
a{color:var(--champ)}a:focus-visible,.btn:focus-visible{outline:2px solid var(--champ);outline-offset:3px}
.barre{display:flex;justify-content:space-between;align-items:center;gap:12px;max-width:980px;margin:0 auto;padding:max(16px,env(safe-area-inset-top)) 20px 0}
.marque{font-family:Cinzel,Georgia,serif;font-weight:600;letter-spacing:.18em;font-size:18px;color:var(--ivoire);text-decoration:none}
main{max-width:980px;margin:0 auto;padding:10px 20px 30px}
.fil{font-size:13px;color:var(--doux);margin:18px 0 6px}.fil a{color:var(--doux)}
h1{font-family:Cinzel,Georgia,serif;font-weight:500;font-size:clamp(24px,6vw,34px);line-height:1.25;margin:6px 0 10px;color:var(--champ)}
h2{font-family:Cinzel,Georgia,serif;font-weight:500;font-size:clamp(19px,4.6vw,23px);margin:34px 0 10px;color:var(--ivoire)}
h3{font-size:15px;font-weight:600;color:var(--champ);margin:22px 0 8px}
p{margin:0 0 12px}.intro{color:var(--doux)}
.liste{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
.liste a{display:block;text-decoration:none;color:var(--ivoire);border:1px solid rgba(217,185,122,.16);border-radius:12px;padding:11px 14px;background:var(--fond2)}
.liste .sous{display:block;color:var(--doux);font-size:13.5px}
.villes{color:var(--doux);font-size:14px}
.btn{display:inline-block;text-decoration:none;font-weight:500;font-size:15px;padding:12px 24px;border-radius:999px;border:1px solid var(--champ);color:var(--ivoire)}
.appel{margin:30px 0 0;padding:20px;border:1px solid var(--trait);border-radius:16px;background:var(--fond2)}
footer{max-width:980px;margin:0 auto;padding:22px 20px max(28px,env(safe-area-inset-bottom));font-size:12.5px;color:#8d887e;border-top:1px solid rgba(217,185,122,.12)}footer a{color:#a9a294}

.liste.deps{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:700px){.liste.deps{grid-template-columns:repeat(3,minmax(0,1fr))}.liste{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.liste{grid-template-columns:repeat(3,minmax(0,1fr))}.liste.deps{grid-template-columns:repeat(4,minmax(0,1fr))}}`;

function page(o) {
  const url = `${DOM}/fr/${o.chemin}`;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(o.titre)}</title>
<meta name="description" content="${e(o.desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#07110f">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hype">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${e(o.titre)}">
<meta property="og:description" content="${e(o.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${DOM}/images/hype-partage-1200x630.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(o.jsonld).replace(/</g, "\\u003c")}</script>
<style>${CSS}</style>
</head>
<body>
<header class="barre"><a class="marque" href="${DOM}/fr/">HYPE</a></header>
<main>
<nav class="fil" aria-label="fil">${o.fil}</nav>
<h1>${e(o.h1)}</h1>
${o.corps}
</main>
<footer><p>Liste établie à partir de données publiques (OpenStreetMap). Une erreur, une écurie manquante ? Écris-nous depuis l'appli.</p><p><a href="${DOM}/fr/">Hype</a> · <a href="${DOM}/fr/centres-equestres/">Tous les départements</a></p></footer>
</body>
</html>
`;
}
function ecrire(rel, html) {
  const f = path.join(RACINE, rel, "index.html");
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

const APPEL = `<div class="appel"><p><strong>Tu montes dans une de ces écuries ?</strong> Sur Hype, retrouve ton écurie et tes copains, suis la santé et les soins de ton cheval, tes résultats de concours, et révise la théorie des Galops avec Hey Baby. Le compte est gratuit.</p><a class="btn" href="${DOM}/">Crée ton compte gratuit</a></div>`;

function principal() {
  const annuaire = JSON.parse(fs.readFileSync(path.join(RACINE, "ecuries.json"), "utf8"));
  const D = JSON.parse(fs.readFileSync(path.join(__dirname, "departements-ecuries.json"), "utf8"));
  const parDep = {};
  for (const [adr, [dep, ville]] of Object.entries(D.ecuries)) {
    const fiche = annuaire[adr];
    if (!fiche || fiche.x || !D.deps[dep]) continue;   // x : écartée (outils/ecuries-exclues.json)
    (parDep[dep] = parDep[dep] || []).push({ adr, nom: fiche.n || adr, ville: String(ville || "").replace(/\s*\(\s*(\d{2,3}|2A|2B)\s*\)\s*$/i, "").trim() });
  }
  const chemin = (dep) => `centres-equestres/${slug(D.deps[dep][0])}-${dep.toLowerCase()}/`;
  const deps = Object.keys(parDep).sort();
  const urls = ["centres-equestres/"];
  const accueil = `<a href="${DOM}/fr/">Accueil</a>`;
  const filIndex = `${accueil} › <a href="${DOM}/fr/centres-equestres/">Centres équestres par département</a>`;

  for (const dep of deps) {
    const [nom, tncc, reg] = D.deps[dep];
    const de = deDep(nom, tncc);
    const liste = parDep[dep];
    const villes = {};
    for (const x of liste) (villes[x.ville || "Autres"] = villes[x.ville || "Autres"] || []).push(x);
    const nomsVilles = Object.keys(villes).sort(tri);
    const n = liste.length;
    const motN = n > 1 ? `${n} centres équestres, poney-clubs et écuries` : "1 centre équestre";
    let corps = `<p class="intro">${motN} ${e(de)} (${e(dep)}), rangés par ville. Touche une écurie pour voir sa page : adresse, téléphone, site, et sur Hype ses chevaux et ses prochains rendez-vous.</p>`;
    if (nomsVilles.length > 6) corps += `<p class="villes">${nomsVilles.length} villes : ${nomsVilles.slice(0, 12).map(e).join(", ")}${nomsVilles.length > 12 ? "…" : ""}</p>`;
    corps += `<ul class="liste">`;
    for (const v of nomsVilles) for (const x of villes[v].sort((a, b) => tri(a.nom, b.nom))) corps += `<li><a href="${DOM}/ecurie/${e(x.adr)}">${e(x.nom)}<span class="sous">${e(v)}</span></a></li>`;
    corps += `</ul>`;
    corps += APPEL;
    const voisins = deps.filter((d) => d !== dep && D.deps[d][2] === reg);
    if (voisins.length) corps += `<h2>Autres départements — ${e(D.regions[reg] || "")}</h2><ul class="liste deps">${voisins.map((d) => `<li><a href="${DOM}/fr/${chemin(d)}">${e(D.deps[d][0])} (${e(d)})<span class="sous">${parDep[d].length} écurie${parDep[d].length > 1 ? "s" : ""}</span></a></li>`).join("")}</ul>`;
    const titre = `Centres équestres ${de} (${dep}) — ${n} écurie${n > 1 ? "s" : ""} | Hype`;
    const desc = `${motN} ${de} (${dep}) : ${nomsVilles.slice(0, 5).join(", ")}${nomsVilles.length > 5 ? "…" : ""}. Adresses, téléphones et pages des écuries sur Hype.`;
    ecrire(`fr/${chemin(dep)}`, page({ chemin: chemin(dep), titre, desc, h1: `Centres équestres ${de} (${dep})`, fil: filIndex, corps,
      jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: `Centres équestres ${de} (${dep})`, inLanguage: "fr", url: `${DOM}/fr/${chemin(dep)}`,
        mainEntity: { "@type": "ItemList", numberOfItems: n, itemListElement: liste.slice(0, 200).map((x, i) => ({ "@type": "ListItem", position: i + 1, url: `${DOM}/ecurie/${x.adr}`, name: x.nom })) } } }));
    urls.push(chemin(dep));
  }

  // Page de tous les départements, par région
  const regs = {};
  for (const dep of deps) (regs[D.deps[dep][2]] = regs[D.deps[dep][2]] || []).push(dep);
  const total = deps.reduce((s, d) => s + parDep[d].length, 0);
  let corps = `<p class="intro">${total.toLocaleString("fr-FR")} centres équestres, poney-clubs et écuries dans ${deps.length} départements. Choisis ton département pour voir les écuries, ville par ville.</p>`;
  for (const reg of Object.keys(regs).sort((a, b) => tri(D.regions[a] || a, D.regions[b] || b))) {
    corps += `<h2>${e(D.regions[reg] || reg)}</h2><ul class="liste deps">`;
    for (const d of regs[reg]) corps += `<li><a href="${DOM}/fr/${chemin(d)}">${e(D.deps[d][0])} (${e(d)})<span class="sous">${parDep[d].length} écurie${parDep[d].length > 1 ? "s" : ""}</span></a></li>`;
    corps += `</ul>`;
  }
  corps += APPEL;
  ecrire("fr/centres-equestres", page({ chemin: "centres-equestres/", titre: "Centres équestres et poney-clubs par département | Hype",
    desc: `Trouve un centre équestre, un poney-club ou une écurie près de chez toi : ${total.toLocaleString("fr-FR")} écuries dans ${deps.length} départements, ville par ville.`,
    h1: "Centres équestres par département", fil: accueil, corps,
    jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Centres équestres par département", inLanguage: "fr", url: `${DOM}/fr/centres-equestres/` } }));

  // Pour les pages écurie (netlify/edge-functions/ecurie-route.ts) : code → [adresse de la page, « de l'Essonne »]
  const pourEcuries = {};
  for (const dep of deps) pourEcuries[dep] = [`${DOM}/fr/${chemin(dep)}`, deDep(D.deps[dep][0], D.deps[dep][1])];
  fs.writeFileSync(path.join(RACINE, "fr", "centres-equestres", "departements.json"), JSON.stringify(pourEcuries));

  let x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) x += `  <url><loc>${DOM}/fr/${u}</loc></url>\n`;
  fs.writeFileSync(path.join(RACINE, "sitemap-departements.xml"), x + "</urlset>\n");
  log(`${deps.length} départements, ${total} écuries, plan du site écrit`);
}

try { principal(); } catch (err) { log("erreur, publication inchangée pour la suite :", String(err && err.stack || err).slice(0, 300)); }
