/* HYPE ▸ outils/indexnow.cjs — 04/11/2026 (référencement au-delà de Google ; Blandine : « vas-y »).
   IndexNow : un seul envoi prévient en même temps Bing (et donc DuckDuckGo, Yahoo, Ecosia, Qwant, ChatGPT/Copilot),
   Yandex, Naver, Seznam… qu'il y a des pages à (re)lire. Google n'utilise pas IndexNow : lui lit sitemap.xml.
   Lancé par NETLIFY en dernier au moment de publier (netlify.toml). Il lit les plans du site fabriqués juste avant
   (pages, Galops, lexique, départements) et envoie leurs adresses.
   La clé est le fichier ea43c988173bea098e50f51776f66f50.txt à la racine du site (il prouve que l'envoi vient bien de 2hype.fr).
   GARDE-FOUS : 15 secondes au plus ; en cas d'erreur ou sans réseau, rien ne se passe ; jamais bloquant. */
"use strict";
const fs = require("fs");
const path = require("path");
const RACINE = path.join(__dirname, "..");
const HOTE = "2hype.fr";
const CLE = "ea43c988173bea098e50f51776f66f50";
const PLANS = ["sitemap-pages.xml", "sitemap-galops.xml", "sitemap-lexique.xml", "sitemap-departements.xml"];
function log() { console.log.apply(console, ["[indexnow]"].concat([].slice.call(arguments))); }

function adresses() {
  const vu = new Set();
  for (const f of PLANS) {
    let s = ""; try { s = fs.readFileSync(path.join(RACINE, f), "utf8"); } catch (e) { continue; }
    const re = /<loc>\s*([^<\s]+)\s*<\/loc>/g; let m;
    while ((m = re.exec(s))) { if (m[1].indexOf("https://" + HOTE + "/") === 0) vu.add(m[1]); }
  }
  return Array.from(vu).slice(0, 10000);
}

async function principal() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") { log("pas une mise en ligne de production : rien envoyé"); return; }
  if (!fs.existsSync(path.join(RACINE, CLE + ".txt"))) { log("fichier de clé absent : rien envoyé"); return; }
  const liste = adresses();
  if (!liste.length) { log("aucune adresse"); return; }
  if (typeof fetch !== "function") { log("fetch indisponible : rien envoyé"); return; }
  const ctl = new AbortController(); const t = setTimeout(function () { ctl.abort(); }, 15000);
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOTE, key: CLE, keyLocation: "https://" + HOTE + "/" + CLE + ".txt", urlList: liste }), signal: ctl.signal });
    log(liste.length + " adresses envoyées, réponse " + r.status);
  } catch (e) { log("envoi impossible (sans conséquence) :", String(e && e.message || e).slice(0, 120)); }
  finally { clearTimeout(t); }
}
principal().catch(function () { }).finally(function () { process.exitCode = 0; });
