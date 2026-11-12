/* HYPE ▸ outils/fa/injecter-fa.cjs — 12/11/2026 (Blandine : ajout du PERSAN, « je te laisse tout faire »).
   Ajoute la 15e langue « fa » (persan) dans le code, sans toucher aux 14 autres. RELANÇABLE à volonté :
   - chaque objet de traduction { fr: "...", ..., ko: "..." } reçoit  fa: "..."  (ou voit son fa mis à jour) ;
   - chaque appel de traduction à 14 textes (T("fr", ..., "ko")) reçoit un 15e texte (ou le voit mis à jour) ;
   - chaque petite fonction de traduction (fr, ..., ko) reçoit le paramètre fa et le transmet ;
   - chaque liste de codes ["fr", ..., "ko"] reçoit "fa".
   Le texte persan vient de outils/fa/traductions.json (clé = texte français + \u0001 + texte anglais).
   Tant qu'un texte n'est pas traduit, on met l'ANGLAIS (comme les autres langues récentes).
   Usage : node outils/fa/injecter-fa.cjs   (depuis la racine du dépôt) ; --extraire écrit outils/fa/a-traduire.json */
"use strict";
const fs = require("fs"), path = require("path");
const R = path.join(__dirname, "..", "..");
const acorn = require(path.join(R, "outils", "acorn-8.18.0.js"));
const DICO_F = path.join(__dirname, "traductions.json");
const DICO = fs.existsSync(DICO_F) ? JSON.parse(fs.readFileSync(DICO_F, "utf8")) : {};
const EXTRAIRE = process.argv.includes("--extraire");
const LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
const aTraduire = new Map();
function lit(n) { if (!n) return null; if (n.type === "Literal" && typeof n.value === "string") return n.value; if (n.type === "TemplateLiteral" && n.expressions.length === 0) return n.quasis[0].value.cooked; return null; }
function cle(p) { return p && p.key && (p.key.name !== undefined ? p.key.name : p.key.value); }
function persan(fr, en) {
  const k = fr + "\u0001" + (en || "");
  if (Object.prototype.hasOwnProperty.call(DICO, k) && DICO[k] !== "") return DICO[k];
  if (!aTraduire.has(k)) aTraduire.set(k, { fr: fr, en: en || "" });
  return (en !== null && en !== undefined && en !== "") ? en : fr;
}
function js(s) { return JSON.stringify(s).split(String.fromCharCode(0x2028)).join("\\u2028").split(String.fromCharCode(0x2029)).join("\\u2029"); }
function traiter(code, edits, base) {
  const ast = acorn.parse(code, { ecmaVersion: "latest", allowReturnOutsideFunction: true, allowHashBang: true });
  (function w(x) {
    if (!x || typeof x.type !== "string") return;
    if (x.type === "ObjectExpression") {
      const ps = {}; x.properties.forEach((p) => { if (p.type === "Property") ps[cle(p)] = p; });
      if (ps.ko && ps.fr) {
        const fr = lit(ps.fr.value), ko = lit(ps.ko.value);
        if (fr !== null && ko !== null) {
          const v = persan(fr, lit(ps.en && ps.en.value));
          if (ps.fa) { const old = lit(ps.fa.value); if (old !== null && old !== v) edits.push([base + ps.fa.value.start, base + ps.fa.value.end, js(v)]); }
          else edits.push([base + ps.ko.end, base + ps.ko.end, ", fa: " + js(v)]);
        } else if (!ps.fa && ps.ko.value.type === "Identifier" && ps.ko.value.name === "ko" && ps.fr.value.type === "Identifier") {
          edits.push([base + ps.ko.end, base + ps.ko.end, ", fa: fa"]);
        }
      }
    }
    if (x.type === "CallExpression" || x.type === "NewExpression") {
      const a = x.arguments, n = a.length;
      for (const dec of [0, 1]) {
        if (n !== 14 + dec && n !== 15 + dec) continue;
        const v = a.slice(dec, dec + 14).map(lit);
        if (v.every((t) => t !== null)) {
          const p = persan(v[0], v[1]);
          if (n === 15 + dec) { const old = lit(a[14 + dec]); if (old !== null && old !== p) edits.push([base + a[14 + dec].start, base + a[14 + dec].end, js(p)]); }
          else edits.push([base + a[13 + dec].end, base + a[13 + dec].end, ", " + js(p)]);
          break;
        }
        const ids = a.slice(dec, dec + 14).map((t) => t.type === "Identifier" ? t.name : null);
        if (n === 14 + dec && ids.join(",") === LGS.join(",")) { edits.push([base + a[13 + dec].end, base + a[13 + dec].end, ", fa"]); break; }
      }
    }
    if (/Function/.test(x.type) && x.params.length >= 14) {
      const noms = x.params.map((p) => p.name);
      const i = noms.lastIndexOf("ko");
      if (i >= 13 && noms.slice(i - 13, i + 1).slice().sort().join(",") === LGS.slice().sort().join(",") && noms.indexOf("fa") < 0) {   /* ordre libre (ex. gv2L : de avant ja) */
        edits.push([base + x.params[i].end, base + x.params[i].end, ", fa"]);
        const corps = code.slice(x.body.start, x.body.end);
        const re = /(lg ?=== ?"ko" ?\? ?\(ko ?\|\| ?en(?: ?\|\| ?fr)?\) ?: ?)/g; let m;
        while ((m = re.exec(corps))) edits.push([base + x.body.start + m.index + m[0].length, base + x.body.start + m.index + m[0].length, 'lg === "fa" ? (fa || en || fr) : ']);
      }
    }
    if (x.type === "ArrayExpression" && x.elements.length === 14 && x.elements.every((e, k) => lit(e) === LGS[k])) {
      edits.push([base + x.elements[13].end, base + x.elements[13].end, ', "fa"']);
    }
    for (const k in x) { const v = x[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === "string") w(v); }
  })(ast);
}
function appliquer(txt, edits) {
  edits.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  const vus = new Set(); let out = txt;
  for (const [d, f, t] of edits) { const k = d + ":" + f + ":" + t; if (vus.has(k)) continue; vus.add(k); out = out.slice(0, d) + t + out.slice(f); }
  return out;
}
const fichiers = ["index.html"].concat(fs.readdirSync(R).filter((f) => /^hype-.*\.js$/.test(f)).sort());
let total = 0;
for (const f of fichiers) {
  const txt = fs.readFileSync(path.join(R, f), "utf8"); const edits = [];
  if (f === "index.html") {
    const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g; let m;
    while ((m = re.exec(txt))) { if (/json|text\/plain|importmap/.test(m[1])) continue; traiter(m[2], edits, m.index + m[0].indexOf(">") + 1); }
  } else traiter(txt, edits, 0);
  if (edits.length && !EXTRAIRE) { fs.writeFileSync(path.join(R, f), appliquer(txt, edits)); total += edits.length; }
}
const reste = Array.from(aTraduire.values());
if (EXTRAIRE) fs.writeFileSync(path.join(__dirname, "a-traduire.json"), JSON.stringify(reste, null, 0));
console.log("[fa] modifications :", total, "— textes encore en anglais :", reste.length, "— déjà traduits :", Object.keys(DICO).length);
