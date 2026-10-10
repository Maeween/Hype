/* ============================================================================
   HYPE ▸ ecuries-generer.cjs — 10/10/2026 (référencement des écuries, build 851)
   À LANCER À LA MAIN (node ecuries-generer.cjs) QUAND LA BASE DES CLUBS CHANGE.
   Il relit les 4 fichiers hype-clubs-db-*.js (+ hype-clubs-loader.js) et écrit :
     - ecuries.json         : l'annuaire lu par netlify/edge-functions/ecurie-route.ts
                              (adresse → nom exact, ville, code postal, département,
                              adresse postale, téléphone, site, coordonnées) ;
     - sitemap-ecuries.xml  : la liste des 3 145 pages écurie donnée à Google
                              (choix A de Blandine du 10/10 : toutes les écuries).
   L'ADRESSE d'une écurie (2hype.fr/ecurie/<adresse>) vient de son nom : minuscules,
   sans accents, tirets. Si plusieurs écuries ont le même nom (ex. 78 « Centre
   Équestre »), chacune reçoit en plus son département (ou sa ville), et en dernier
   recours la fin de son identifiant OpenStreetMap — l'adresse reste ainsi FIXE.
   Les courriels de la base ne sont PAS repris (pas d'adresse mail publiée).
   ========================================================================= */
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const R = __dirname + path.sep;

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["hype-clubs-db-1.js", "hype-clubs-db-2.js", "hype-clubs-db-3.js", "hype-clubs-db-4.js", "hype-clubs-loader.js"]) {
  vm.runInContext(fs.readFileSync(R + f, "utf8"), ctx);
}
const L = ctx.window.HYPE_CLUBS || [];

const slug = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90).replace(/-+$/, "");

const groupes = {};
for (const c of L) { const s = slug(c.nom); if (!s) continue; (groupes[s] = groupes[s] || []).push(c); }

const sortie = {};
const pris = new Set();
function poser(s, c) {
  let cle = s, i = 2;
  while (pris.has(cle)) cle = s + "-" + (i++);
  pris.add(cle);
  const e = { n: String(c.nom).trim() };
  if (c.ville) e.v = String(c.ville).trim();
  if (c.code_postal) e.cp = String(c.code_postal).trim();
  if (c.departement) e.d = String(c.departement).trim();
  if (c.adresse) e.a = String(c.adresse).trim();
  if (c.tel) e.t = String(c.tel).trim();
  if (c.site && /^https?:\/\//i.test(String(c.site))) e.s = String(c.site).trim();
  if (typeof c.lat === "number" && typeof c.lon === "number") { e.la = +c.lat.toFixed(5); e.lo = +c.lon.toFixed(5); }
  sortie[cle] = e;
}
// d'abord les noms uniques (ils gardent l'adresse la plus courte), puis les homonymes
for (const [s, liste] of Object.entries(groupes)) if (liste.length === 1) poser(s, liste[0]);
for (const [s, liste] of Object.entries(groupes)) {
  if (liste.length === 1) continue;
  for (const c of liste) {
    const plus = c.departement ? String(c.departement) : (c.ville ? slug(c.ville) : String(c.id || "").replace(/\D/g, "").slice(-6));
    poser(slug(s + "-" + (plus || "x")), c);
  }
}

const cles = Object.keys(sortie).sort();
const ordonne = {};
for (const k of cles) ordonne[k] = sortie[k];
fs.writeFileSync(R + "ecuries.json", JSON.stringify(ordonne));
fs.writeFileSync(R + "sitemap-ecuries.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  cles.map((k) => `  <url><loc>https://2hype.fr/ecurie/${k}</loc></url>`).join("\n") + "\n</urlset>\n");
console.log("écuries :", L.length, "→ adresses :", cles.length);
