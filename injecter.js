// INJECTEUR GENERIQUE — allemand dans un chapitre du Galop 2
// usage : node injecter.js <id-du-chapitre> <fichier-de-traductions.json>
//
// Methode eprouvee en session 97 : delimiter la table, delimiter le chapitre
// DANS la table, evaluer ce seul chapitre en objet JS, le modifier en memoire,
// le re-serialiser, le remettre a sa place exacte. Aucune recherche de chaine
// sur le fichier entier.
const fs = require("fs");
const [, , ID, TRAD] = process.argv;
if (!ID || !TRAD) { console.error("usage : node injecter.js <id> <trad.json>"); process.exit(1); }

const CHEMIN = "index.html";
let s = fs.readFileSync(CHEMIN, "utf8");
const de = JSON.parse(fs.readFileSync(TRAD, "utf8"));

function equilibre(txt, depart) {
  let p = 0, j = depart, ch = null;
  for (;;) {
    const c = txt[j];
    if (ch) { if (c === "\\") { j += 2; continue; } if (c === ch) ch = null; }
    else if (c === '"' || c === "'" || c === "`") ch = c;
    else if (c === "[" || c === "{") p++;
    else if (c === "]" || c === "}") { p--; if (p === 0) return j + 1; }
    j++;
  }
}

const m = s.match(/(?:var|const|let)\s+COURS_GALOP2_FR\s*=\s*/);
const debT = s.indexOf("[", m.index + m[0].length);
const finT = equilibre(s, debT);
const table = s.slice(debT, finT);

const idPos = table.indexOf('"' + ID + '"');
if (idPos < 0) { console.error("ECHEC : " + ID + " absent de la table"); process.exit(1); }
const a = table.lastIndexOf("{", idPos);
const b = equilibre(table, a);
const srcChap = table.slice(a, b);

const noms = [...new Set(srcChap.match(/(?<![\w"])[A-Z][A-Z0-9_]{2,}(?![\w"])/g) || [])]
  .filter(x => x !== "HYPE_IMGS");
const chap = new Function("HYPE_IMGS",
  noms.map(n => `var ${n}=${JSON.stringify("@CST:" + n)};`).join("") + "return " + srcChap + ";")
  (new Proxy({}, { get: (t, k) => "@IMG:" + String(k) }));
if (chap.id !== ID) { console.error("ECHEC : chapitre isole = " + chap.id); process.exit(1); }
console.log(ID + " isole : " + srcChap.length + " caracteres");

// ---- corps
const riches = chap.blocs.filter(x => x.contenu);
riches.forEach((bloc, bi) => {
  if ("de" in bloc.contenu) { console.log("  bloc " + bi + " deja en allemand, ignore"); return; }
  const cible = JSON.parse(JSON.stringify(bloc.contenu.fr));
  cible.forEach((el, ei) => {
    const t = de.corps[bi + "." + ei];
    if (!t) { console.error("ECHEC : traduction manquante en " + bi + "." + ei); process.exit(1); }
    if (t.titre !== undefined) el.titre = t.titre;
    if (t.sous !== undefined) el.sous = t.sous;
    if (t.texte !== undefined) el.texte = t.texte;
    if (t.puces !== undefined) {
      if (!el.puces || el.puces.length !== t.puces.length) {
        console.error("ECHEC : puces differentes en " + bi + "." + ei
          + " (" + (el.puces ? el.puces.length : 0) + " vs " + t.puces.length + ")");
        process.exit(1);
      }
      el.puces = t.puces;
    }
  });
  bloc.contenu.de = cible;
  if (bloc.titre && typeof bloc.titre === "object" && !("de" in bloc.titre)) {
    const t = (de.titres_blocs || {})[String(bi)];
    if (!t) { console.error("ECHEC : titre de bloc manquant pour " + bi); process.exit(1); }
    bloc.titre.de = t;
  }
});

// ---- QCM
const qs = chap.quiz || [];
if (de.quiz) {
  if (qs.length !== de.quiz.length) { console.error("ECHEC : " + qs.length + " QCM vs " + de.quiz.length); process.exit(1); }
  qs.forEach((q, i) => {
    if ("de" in q.question) return;
    const t = de.quiz[i];
    if (q.options.fr.length !== t.o.length) { console.error("ECHEC : options du QCM " + i); process.exit(1); }
    q.question.de = t.q;
    q.options.de = t.o;
    if (q.explication) q.explication.de = t.e;
  });
}

let neuf = JSON.stringify(chap)
  .replace(/"@IMG:(k\d+)"/g, 'HYPE_IMGS["$1"]')
  .replace(/"@CST:([A-Z0-9_]+)"/g, "$1");
if (/@IMG:|@CST:/.test(neuf)) { console.error("ECHEC : marqueur non restitue"); process.exit(1); }

s = s.slice(0, debT) + table.slice(0, a) + neuf + table.slice(b) + s.slice(finT);
fs.writeFileSync(CHEMIN, s);
console.log("OK   reinjecte (" + srcChap.length + " -> " + neuf.length + " caracteres)");
