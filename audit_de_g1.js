// L'allemand du Galop 1 : est-il absent partout, ou seulement dans les
// en-tetes ? On distingue trois endroits : l'en-tete du chapitre (titre, type,
// duree), la couverture, et LE CORPS du cours (contenu des blocs texte-riche,
// questions de QCM). Si le corps est traduit et pas l'en-tete, le travail a ete
// fait puis interrompu ; si rien ne l'est, il n'a jamais commence.
const fs = require("fs");
const s = fs.readFileSync("index.html", "utf8");

function tranche(nom) {
  const m = s.match(new RegExp("(?:var|const|let)\\s+" + nom + "\\s*=\\s*"));
  let i = s.indexOf("[", m.index + m[0].length);
  let prof = 0, j = i, ch = null;
  for (;;) {
    const c = s[j];
    if (ch) { if (c === "\\") { j += 2; continue; } if (c === ch) ch = null; }
    else if (c === '"' || c === "'" || c === "`") ch = c;
    else if (c === "[" || c === "{") prof++;
    else if (c === "]" || c === "}") { prof--; if (prof === 0) break; }
    j++;
  }
  return s.slice(i, j + 1);
}
function evalue(src) {
  const noms = [...new Set(src.match(/(?<![\w"])[A-Z][A-Z0-9_]{2,}(?![\w"])/g) || [])]
    .filter(n => n !== "HYPE_IMGS");
  return new Function("HYPE_IMGS", noms.map(n => `var ${n}=${JSON.stringify("c")};`).join("")
    + "return " + src + ";")(new Proxy({}, { get: () => "i" }));
}

for (const nom of ["COURS_GALOP1_I18N", "COURS_GALOP2_FR"]) {
  const tab = evalue(tranche(nom));
  console.log("=".repeat(76));
  console.log(nom);
  console.log("=".repeat(76));
  console.log("chapitre         en-tete   couverture   corps du cours        QCM");
  for (const c of tab) {
    const de = o => (o && typeof o === "object" && !Array.isArray(o)) ? ("de" in o) : null;
    const entete = [de(c.titre), de(c.type), de(c.duree)].filter(x => x !== null);
    const cv = (c.blocs || []).find(b => b && b.type === "couv-affiche");
    const couv = cv && cv.couv ? [de(cv.couv.titre1), de(cv.couv.titre2), de(cv.couv.citation)].filter(x => x !== null) : [];

    // corps : tout bloc ayant un champ `contenu` multilingue
    let corpsOk = 0, corpsTot = 0;
    for (const b of (c.blocs || [])) {
      if (b && b.contenu && typeof b.contenu === "object" && !Array.isArray(b.contenu)) {
        corpsTot++; if ("de" in b.contenu) corpsOk++;
      }
      if (b && b.titre && typeof b.titre === "object") { corpsTot++; if ("de" in b.titre) corpsOk++; }
    }
    // QCM : soit tableau quiz, soit blocs type qcm
    let qOk = 0, qTot = 0;
    const qs = (c.quiz || []).concat((c.blocs || []).filter(b => b && b.type === "qcm"));
    for (const q of qs) {
      if (q && q.question && typeof q.question === "object") { qTot++; if ("de" in q.question) qOk++; }
    }
    const pct = (ok, tot) => tot === 0 ? "  —  " : (ok + "/" + tot).padEnd(6);
    console.log("  " + c.id.padEnd(15)
      + pct(entete.filter(Boolean).length, entete.length)
      + "    " + pct(couv.filter(Boolean).length, couv.length)
      + "       " + pct(corpsOk, corpsTot)
      + "               " + pct(qOk, qTot));
  }
}
