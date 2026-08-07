// AUDIT i18n — tous les niveaux, tous les champs multilingues des en-tetes
// de chapitre et des couvertures. On EVALUE reellement la table en JS plutot
// que de la parser en JSON : c'est la seule facon de traverser sans erreur le
// melange d'encodages et les constantes nues (HYPE_IMGS, COUV_*, INFOG_*).
const fs = require("fs");
const s = fs.readFileSync("index.html", "utf8");

const TABLES = ["COURS_BABY_I18N", "COURS_GALOP1_I18N", "COURS_GALOP2_FR",
  "COURS_GALOP3_FR", "COURS_GALOP4_FR", "COURS_GALOP5_FR",
  "COURS_GALOP6_FR", "COURS_GALOP7_FR"];

function tranche(nom) {
  const m = s.match(new RegExp("(?:var|const|let)\\s+" + nom + "\\s*=\\s*"));
  if (!m) return null;
  let i = s.indexOf("[", m.index + m[0].length);
  if (i < 0) return null;
  let prof = 0, j = i, ch = null;
  for (;;) {
    const c = s[j];
    if (ch) { if (c === "\\") { j += 2; continue; } if (c === ch) ch = null; }
    else if (c === '"' || c === "'" || c === "`") ch = c;
    else if (c === "[" || c === "{") prof++;
    else if (c === "]" || c === "}") { prof--; if (prof === 0) break; }
    j++;
  }
  return { debut: i, fin: j + 1, src: s.slice(i, j + 1) };
}

function evalue(src) {
  const noms = [...new Set(src.match(/(?<![\w"])[A-Z][A-Z0-9_]{2,}(?![\w"])/g) || [])]
    .filter(n => n !== "HYPE_IMGS");
  const pre = noms.map(n => `var ${n}=${JSON.stringify("cst:" + n)};`).join("");
  return new Function("HYPE_IMGS", pre + "return " + src + ";")(
    new Proxy({}, { get: (t, k) => "img:" + String(k) }));
}

const L6 = ["de", "en", "es", "fr", "it", "ja"].join(",");
let total = 0, chapitres = 0;
const manques = [];

for (const nom of TABLES) {
  const t = tranche(nom);
  if (!t) { console.log(nom.padEnd(20) + "introuvable"); continue; }
  let tab;
  try { tab = evalue(t.src); }
  catch (e) { console.log(nom.padEnd(20) + "EVALUATION KO : " + e.message); continue; }
  const lignes = [];
  for (const c of tab) {
    const pb = [];
    const chk = (chemin, o) => {
      if (o && typeof o === "object" && !Array.isArray(o)) {
        const k = Object.keys(o).sort().join(",");
        if (k !== L6) pb.push({ chemin, presentes: k });
      }
    };
    chk("titre", c.titre);
    chk("type", c.type);
    chk("duree", c.duree);
    const cv = (c.blocs || []).find(b => b && b.type === "couv-affiche");
    if (cv && cv.couv) {
      chk("couv.titre1", cv.couv.titre1);
      chk("couv.titre2", cv.couv.titre2);
      chk("couv.citation", cv.couv.citation);
    }
    if (pb.length) {
      lignes.push("   " + c.id.padEnd(16) + pb.map(x => x.chemin + " [" + x.presentes + "]").join(" · "));
      manques.push({ table: nom, id: c.id, pb });
      chapitres++;
      total += pb.length;
    }
  }
  console.log("=".repeat(70));
  console.log(nom + " — " + tab.length + " chapitres, " + lignes.length + " incomplet(s)");
  lignes.forEach(l => console.log(l));
}
console.log("=".repeat(70));
console.log("TOTAL : " + chapitres + " chapitres, " + total + " champs incomplets");
fs.writeFileSync("manques_i18n.json", JSON.stringify(manques, null, 1));
