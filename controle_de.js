// CONTROLE DE NON-PERTE : on ré-évalue le chapitre dans les deux fichiers et
// on compare l'intégralité des valeurs francaises, anglaises et japonaises.
// La ré-sérialisation a raccourci le texte (JSON.stringify compacte les
// espaces) : il faut donc prouver qu'aucune donnee n'a disparu.
const fs = require("fs");

function chapitre(fichier, id) {
  const s = fs.readFileSync(fichier, "utf8");
  const m = s.match(/(?:var|const|let)\s+COURS_GALOP2_FR\s*=\s*/);
  let i = s.indexOf("[", m.index + m[0].length), p = 0, j = i, ch = null, fin = -1;
  for (;;) {
    const c = s[j];
    if (ch) { if (c === "\\") { j += 2; continue; } if (c === ch) ch = null; }
    else if (c === '"' || c === "'" || c === "`") ch = c;
    else if (c === "[" || c === "{") p++;
    else if (c === "]" || c === "}") { p--; if (p === 0) { fin = j + 1; break; } }
    j++;
  }
  const src = s.slice(i, fin);
  const noms = [...new Set(src.match(/(?<![\w"])[A-Z][A-Z0-9_]{2,}(?![\w"])/g) || [])]
    .filter(x => x !== "HYPE_IMGS");
  const tab = new Function("HYPE_IMGS",
    noms.map(n => `var ${n}=${JSON.stringify("@" + n)};`).join("") + "return " + src + ";")
    (new Proxy({}, { get: (t, k) => "@img:" + String(k) }));
  return { tab, chap: tab.find(x => x.id === id) };
}

// aplatit un objet en couples chemin -> valeur, en ignorant une langue donnee
function aplatir(o, ignorer, prefixe = "", sortie = {}) {
  if (o === null || typeof o !== "object") { sortie[prefixe] = o; return sortie; }
  for (const k of Object.keys(o)) {
    if (ignorer.includes(k)) continue;
    aplatir(o[k], ignorer, prefixe ? prefixe + "." + k : k, sortie);
  }
  return sortie;
}

const A = chapitre("index.avant-de.html", "g2-depart");
const B = chapitre("index.html", "g2-depart");

console.log("chapitres dans la table : " + A.tab.length + " -> " + B.tab.length);
if (A.tab.length !== B.tab.length) { console.log("!! LE NOMBRE DE CHAPITRES A CHANGE"); process.exit(1); }
const idsA = A.tab.map(c => c.id).join(","), idsB = B.tab.map(c => c.id).join(",");
console.log("ordre des identifiants identique : " + (idsA === idsB));

// on ignore la cle "de" (ajoutee) mais aussi es/it sur l'en-tete (ajoutees)
const pa = aplatir(A.chap, ["de"]);
const pb = aplatir(B.chap, ["de"]);
const clesA = Object.keys(pa), clesB = Object.keys(pb);
const perdues = clesA.filter(k => !(k in pb));
const ajoutees = clesB.filter(k => !(k in pa));
let differentes = 0;
for (const k of clesA) if (k in pb && pa[k] !== pb[k]) { differentes++; if (differentes < 6) console.log("  DIFFERE " + k); }

console.log("\nchamps hors allemand : " + clesA.length + " avant, " + clesB.length + " apres");
console.log("champs PERDUS   : " + perdues.length + (perdues.length ? " -> " + perdues.slice(0, 8).join(", ") : ""));
console.log("champs ajoutes  : " + ajoutees.length + (ajoutees.length ? " -> " + ajoutees.slice(0, 8).join(", ") : ""));
console.log("valeurs modifiees hors allemand : " + differentes);

// comptage de l'allemand ajoute
function compteDe(o, n = { total: 0 }) {
  if (o && typeof o === "object") {
    if (!Array.isArray(o) && "fr" in o && "de" in o) n.total++;
    for (const v of Object.values(o)) compteDe(v, n);
  }
  return n.total;
}
console.log("\ndictionnaires ayant maintenant fr + de : " + compteDe(B.chap));
const bloc = B.chap.blocs.filter(b => b.contenu);
for (let i = 0; i < bloc.length; i++) {
  const fr = bloc[i].contenu.fr, dd = bloc[i].contenu.de;
  console.log("  bloc " + i + " : fr " + fr.length + " elements, de " + (dd ? dd.length : "ABSENT")
    + ", sequence identique : " + (dd ? fr.map(e => e.k).join() === dd.map(e => e.k).join() : false));
}
const q = B.chap.quiz;
console.log("  QCM : " + q.length + ", allemand sur " + q.filter(x => x.question.de).length
  + ", options allemandes completes : " + q.every(x => x.options.de && x.options.de.length === x.options.fr.length));
console.log("\nextrait allemand :");
console.log("  titre   : " + B.chap.titre.de);
console.log("  couv    : " + B.chap.blocs[0].couv.titre1.de + " " + B.chap.blocs[0].couv.titre2.de);
console.log("  section : " + bloc[0].contenu.de[2].titre);
console.log("  QCM 0   : " + q[0].question.de);
