/* HYPE ▸ outils/alleger-index.cjs — 11/10/2026 (951). Lancé par NETLIFY au moment de publier (netlify.toml,
   [build] command). Il retire les COMMENTAIRES de la copie d'index.html envoyée aux téléphones ; le fichier
   du dépôt GitHub, lui, garde tous ses commentaires (rien n'est jamais réécrit dans le dépôt).

   CE QUI EST RETIRÉ : commentaires JavaScript des scripts en ligne (blocs et lignes), commentaires HTML <!-- -->
   hors des scripts, commentaires CSS des balises <style>. RIEN D'AUTRE : pas de compression du code, pas de
   renommage. Un commentaire sur plusieurs lignes devient un retour à la ligne, un commentaire court une espace,
   pour que le code se lise EXACTEMENT pareil.

   GARDE-FOUS : les commentaires JS sont repérés par un vrai lecteur JavaScript (acorn 8.18.0, copié dans
   outils/, licence MIT) et non par une recherche de texte. Après coup, chaque script est relu et sa suite de
   mots (jetons) comparée à celle d'origine : si UN SEUL script diffère, ou si quoi que ce soit échoue, l'index
   d'origine est publié tel quel (avec ses commentaires) et le journal Netlify le dit. Ce script ne fait
   jamais échouer la publication. Le marqueur <meta ... content="AAAAMMJJ-NNN"> n'est pas un commentaire : il reste. */
"use strict";
const fs = require("fs");
const path = require("path");
const RACINE = path.join(__dirname, "..");
const FICHIER = path.join(RACINE, process.argv[2] || "index.html");

function log() { console.log.apply(console, ["[alleger-index]"].concat([].slice.call(arguments))); }

function jetons(acorn, code) {
  const l = [];
  for (const t of acorn.tokenizer(code, { ecmaVersion: "latest", sourceType: "script", allowHashBang: true })) l.push(t.type.label + "\u0001" + (t.value === undefined ? "" : String(t.value)));
  return l;
}

function sansCommentairesJS(acorn, code) {
  const coms = [];
  acorn.parse(code, { ecmaVersion: "latest", sourceType: "script", allowHashBang: true, allowReturnOutsideFunction: false, onComment: function (bloc, texte, debut, fin) { coms.push([debut, fin, bloc, texte]); } });
  if (!coms.length) return code;
  let out = "", pos = 0;
  for (const c of coms) {
    out += code.slice(pos, c[0]);
    out += c[2] ? (/[\n\r\u2028\u2029]/.test(c[3]) ? "\n" : " ") : "";
    pos = c[1];
  }
  out += code.slice(pos);
  /* contrôle : même suite de jetons qu'à l'origine */
  const a = jetons(acorn, code), b = jetons(acorn, out);
  if (a.length !== b.length) throw new Error("jetons différents (" + a.length + " / " + b.length + ")");
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) throw new Error("jeton " + i + " différent");
  return out;
}

function sansCommentairesCSS(css) {
  let out = "", i = 0, q = null;
  while (i < css.length) {
    const c = css[i];
    if (q) { out += c; if (c === "\\") { out += css[i + 1] || ""; i += 2; continue; } if (c === q) q = null; i++; continue; }
    if (c === '"' || c === "'") { q = c; out += c; i++; continue; }
    if (c === "/" && css[i + 1] === "*") { const f = css.indexOf("*/", i + 2); if (f < 0) return null; out += " "; i = f + 2; continue; }
    out += c; i++;
  }
  return out;
}

function alleger(html, acorn) {
  /* Lecture dans l'ordre du navigateur : on avance dans le HTML et on prend le PREMIER de « <!-- », « <script »,
     « <style ». Un commentaire HTML va jusqu'au premier « --> » (ce qu'il contient, même « <script », n'est que
     du texte) ; un script jusqu'au premier « </script », un style jusqu'au premier « </style ». */
  let out = "", pos = 0, nScripts = 0, nStyles = 0, nComHTML = 0;
  const ouvertures = [];
  const reDebut = /<!--|<script\b|<style\b/gi;
  while (true) {
    reDebut.lastIndex = pos;
    const m = reDebut.exec(html);
    if (!m) { out += html.slice(pos); break; }
    out += html.slice(pos, m.index);
    const t = m[0].toLowerCase();
    if (t === "<!--") {
      const f = html.indexOf("-->", m.index + 4);
      if (f < 0) throw new Error("commentaire HTML non fermé");
      pos = f + 3; nComHTML++; continue;
    }
    const finOuv = html.indexOf(">", m.index);
    if (finOuv < 0) throw new Error("balise non fermée");
    const attrs = html.slice(m.index + t.length, finOuv);
    const balFin = t === "<script" ? /<\/script\s*>/gi : /<\/style\s*>/gi;
    balFin.lastIndex = finOuv + 1;
    const mf = balFin.exec(html);
    if (!mf) throw new Error("fin de " + t + " introuvable");
    const contenu = html.slice(finOuv + 1, mf.index);
    let nouveau = contenu;
    if (t === "<script") {
      const estJS = !/\bsrc\s*=/i.test(attrs) && !/\btype\s*=\s*["']?(?!text\/javascript|application\/javascript|module)/i.test(attrs);
      if (estJS && contenu.trim()) nouveau = sansCommentairesJS(acorn, contenu);
      nScripts++;
    } else {
      nouveau = sansCommentairesCSS(contenu);
      if (nouveau === null) throw new Error("commentaire CSS non fermé");
      nStyles++;
    }
    ouvertures.push(html.slice(m.index, finOuv + 1));
    out += html.slice(m.index, finOuv + 1) + nouveau + mf[0];
    pos = mf.index + mf[0].length;
  }
  return { out: out, nScripts: nScripts, nStyles: nStyles, nComHTML: nComHTML, ouvertures: ouvertures };
}

try {
  const acorn = require(path.join(__dirname, "acorn-8.18.0.js"));
  const html = fs.readFileSync(FICHIER, "utf8");
  const marqueur = (html.match(/content="\d{8}-\d+"/) || [""])[0];
  const r = alleger(html, acorn);
  /* contre-vérification : on relit le RÉSULTAT avec le même lecteur — mêmes nombres de scripts et de styles,
     plus aucun commentaire HTML, et les mêmes balises <script ...> / <style ...> dans le même ordre. */
  const r2 = alleger(r.out, acorn);
  if (r2.nScripts !== r.nScripts || r2.nStyles !== r.nStyles || r2.nComHTML !== 0 || r2.out !== r.out) throw new Error("contre-vérification : le résultat n'est pas stable");
  if (JSON.stringify(r2.ouvertures) !== JSON.stringify(r.ouvertures)) throw new Error("contre-vérification : balises script/style différentes");
  if (!marqueur || r.out.indexOf(marqueur) < 0) throw new Error("marqueur de version introuvable après allègement");
  const avant = Buffer.byteLength(html), apres = Buffer.byteLength(r.out);
  if (process.argv[3] === "--essai") { fs.writeFileSync(process.argv[4], r.out); log("ESSAI écrit dans", process.argv[4]); }
  else fs.writeFileSync(FICHIER, r.out);
  log("OK", marqueur, "—", r.nScripts, "scripts,", r.nStyles, "styles,", r.nComHTML, "commentaires HTML —", Math.round(avant / 1024), "Ko →", Math.round(apres / 1024), "Ko (−" + Math.round((1 - apres / avant) * 100) + " %)");
} catch (e) {
  log("ABANDON, index publié TEL QUEL (avec commentaires) :", e && e.message);
}
process.exit(0);
