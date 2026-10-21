/* 21/10/2026 — Fabrique, pour chaque fichier de cours et chaque langue de l'appli, une version qui ne contient QUE
   cette langue (+ le français, secours de l'appli, et l'anglais pour les langues qui s'y rabattent : zh, nl, pt) : dossier cours-l/, par ex.
   cours-l/hype-cours-galop3.ja.js. Une cavalière ne télécharge plus les 10 langues d'un Galop (10 à 13 fois moins lourd
   en français). Lancé à CHAQUE publication Netlify (netlify.toml), à partir des fichiers de cours du dépôt : rien à
   faire à la main, les fichiers de cours restent les seuls à modifier. Jamais bloquant : si ce script échoue, l'appli
   charge le fichier complet, comme avant (voir hypeChargerGalop dans index.html).
   Les images restent écrites HYPE_IMGS["kNNN"] dans les fichiers produits : elles se résolvent dans l'appli exactement
   comme avant. Les langues sont lues dans la liste LANGUES de index.html (une nouvelle langue est donc prise toute seule).
   Pour le refaire à la main : node outils/cours-langues.cjs */
const fs = require("fs"), path = require("path"), vm = require("vm");
const RACINE = path.join(__dirname, "..");
const SORTIE = path.join(RACINE, "cours-l");
const log = (...a) => console.log("[cours-langues]", ...a);
const FICHIERS = ["hype-cours-baby.js", "hype-cours-galop1.js", "hype-cours-galop2.js", "hype-cours-galop3.js", "hype-cours-galop4.js", "hype-cours-galop5.js", "hype-cours-galop6.js", "hype-cours-galop7.js"];
function langues() {
  const s = fs.readFileSync(path.join(RACINE, "index.html"), "utf8");
  const i = s.indexOf("const LANGUES = ["); if (i < 0) throw new Error("liste LANGUES introuvable");
  const bloc = s.slice(i, s.indexOf("];", i));
  const l = [...bloc.matchAll(/code:\s*"([a-z]{2,3})"/g)].map(m => m[1]);
  if (l.length < 2 || l.indexOf("fr") < 0) throw new Error("liste LANGUES illisible");
  return l;
}
try {
  const L = langues();
  /* langues qui, dans l'appli, se rabattent sur l'anglais avant le français (lu dans convertirCoursI18nVersInterne) */
  const SECOURS_EN = (function () {
    const s = fs.readFileSync(path.join(RACINE, "index.html"), "utf8");
    const i = s.indexOf("function convertirCoursI18nVersInterne("); const ligne = s.slice(i, s.indexOf("\n", s.indexOf("const tr", i)));
    const m = ligne.match(/\(((?:langue === "[a-z]+"(?: \|\| )?)+)\) && champ && champ\.en/);
    return m ? [...m[1].matchAll(/"([a-z]+)"/g)].map(x => x[1]) : L.filter(x => x !== "fr");   /* illisible : on garde l'anglais partout, par prudence */
  })();
  const estDico = o => { const ks = Object.keys(o); return ks.length >= 2 && ks.indexOf("fr") >= 0 && ks.every(k => L.indexOf(k) >= 0); };
  const garder = (o, lg) => {
    if (Array.isArray(o)) return o.map(x => garder(x, lg));
    if (o && typeof o === "object") {
      if (estDico(o)) { const r = { fr: o.fr }; if (lg !== "fr" && SECOURS_EN.indexOf(lg) >= 0 && o.en !== undefined) r.en = o.en; if (o[lg] !== undefined) r[lg] = o[lg]; return r; }
      const r = {}; for (const k of Object.keys(o)) r[k] = garder(o[k], lg); return r;
    }
    return o;
  };
  fs.mkdirSync(SORTIE, { recursive: true });
  let n = 0, poids = 0;
  for (const f of FICHIERS) {
    const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
    const img = new Proxy({}, { get: (_, k) => typeof k === "string" ? "@@IMG:" + k + "@@" : undefined });
    ctx.HYPE_IMGS = ctx.window.HYPE_IMGS = img;
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(RACINE, f), "utf8"), ctx, { filename: f, timeout: 20000 });
    const cles = Object.keys(ctx.window).filter(k => k !== "HYPE_IMGS");
    if (!cles.length) throw new Error(f + " : rien de défini");
    for (const lg of L) {
      let js = "/* FABRIQUÉ par outils/cours-langues.cjs depuis " + f + " — langue « " + lg + " » (+ secours). Ne pas modifier : corriger " + f + ". */\n(function () {\nvar HYPE_IMGS = (typeof window !== \"undefined\" && window.HYPE_IMGS) || {};\nvar d = {};\n";
      for (const k of cles) {
        const v = ctx.window[k];
        const txt = JSON.stringify(typeof v === "object" && v !== null ? garder(v, lg) : v);
        if (txt === undefined) continue;
        if (/@@IMG:[^@"]*@@[^"]|[^"]@@IMG:/.test(txt)) throw new Error(f + " : image dans un texte composé (" + k + ")");
        js += "d." + k + " = " + txt.replace(/"@@IMG:([^@"]+)@@"/g, function (_, c) { return "HYPE_IMGS[" + JSON.stringify(c) + "]"; }) + ";\n";
      }
      /* l'appli range chaque langue à part (window.__hypeCoursStock) : deux langues chargées l'une après l'autre ne se mélangent jamais */
      js += "for (var k in d) window[k] = d[k];\n(window.__hypeCoursStock = window.__hypeCoursStock || {})[" + JSON.stringify(f + "|" + lg) + "] = d;\n})();\n";
      fs.writeFileSync(path.join(SORTIE, f.replace(/\.js$/, "." + lg + ".js")), js);
      n++; poids += js.length;
    }
  }
  log("OK", n, "fichiers,", L.length, "langues,", Math.round(poids / 1024), "Ko en tout");
} catch (e) {
  log("NON FAIT (l'appli chargera les fichiers complets, comme avant) :", String(e).slice(0, 200));
}
