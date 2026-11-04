/* HYPE ▸ outils/seo-lexique.cjs — 04/11/2026 (référencement : le grand lexique de l'équitation en page publique).
   Demande de Blandine (04/11 19h08) : « donne-lui une adresse et répertorie-le avec toutes ses expressions et définitions sur Google ».
   Lancé par NETLIFY au moment de publier (netlify.toml, [build] command), après seo-galops.cjs.
   Rien n'est écrit dans le dépôt GitHub : les pages n'existent que dans la copie publiée.

   CE QUI EST FABRIQUÉ, pour chaque langue <lg> (14 langues) :
     /<lg>/lexique/        tous les mots du grand lexique de l'appli avec leur définition, rangés par lettre,
                           et le Galop où on les apprend ; balises Google « DefinedTermSet » (liste de définitions).
   + /sitemap-lexique.xml (déclaré dans sitemap.xml).
   Comme les cours : netlify/edge-functions/cours-route.ts sert à cette adresse la VRAIE appli, ouverte sur le lexique
   (cible « lexique »), avec ce texte pour les moteurs de recherche.

   LES MOTS SONT LUS DANS LES FICHIERS DE COURS À CHAQUE PUBLICATION (le même calcul que la page Lexique de l'appli :
   glexEntrees de hype-cours-editorial.js) : un mot ajouté à un cours est publié tout seul. Comme dans l'appli, les mots
   des cours encore en relecture (pas dans HYPE_COURS_PRETS, Galop 1 toujours ouvert) ne sont pas publiés.

   GARDE-FOUS : un fichier illisible → sauté ; une erreur → aucune page lexique, rien d'autre ne change ;
   ce script ne fait jamais échouer la publication. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const RACINE = path.join(__dirname, "..");
function log() { console.log.apply(console, ["[seo-lexique]"].concat([].slice.call(arguments))); }

const UIL = {
  fr: { t: "Lexique de l'équitation", intro: "Tous les mots des cours de Hype, du Galop 1 au Galop 7, avec leur définition simple. Retrouve-les dans l'appli, avec le cours où chaque mot est expliqué.", mots: (n) => n + " mots", ouvrir: "Ouvrir le lexique dans Hype", galop: "Galop", desc: (n, ex) => "Lexique de l'équitation : " + n + " mots et expressions expliqués simplement (" + ex + "…), du Galop 1 au Galop 7." },
  en: { t: "Horse riding glossary", intro: "Every word from the Hype lessons, from Galop 1 to Galop 7, with a simple definition. Find them in the app, with the lesson where each word is explained.", mots: (n) => n + " words", ouvrir: "Open the glossary in Hype", galop: "Galop", desc: (n, ex) => "Horse riding glossary: " + n + " words and expressions explained simply (" + ex + "…), from Galop 1 to Galop 7." },
  es: { t: "Glosario de equitación", intro: "Todas las palabras de los cursos de Hype, del Galop 1 al Galop 7, con su definición sencilla. Encuéntralas en la app, con el curso donde se explica cada palabra.", mots: (n) => n + " palabras", ouvrir: "Abrir el glosario en Hype", galop: "Galop", desc: (n, ex) => "Glosario de equitación: " + n + " palabras y expresiones explicadas de forma sencilla (" + ex + "…), del Galop 1 al Galop 7." },
  it: { t: "Glossario di equitazione", intro: "Tutte le parole delle lezioni di Hype, dal Galop 1 al Galop 7, con una definizione semplice. Ritrovale nell'app, con la lezione in cui ogni parola è spiegata.", mots: (n) => n + " parole", ouvrir: "Apri il glossario in Hype", galop: "Galop", desc: (n, ex) => "Glossario di equitazione: " + n + " parole ed espressioni spiegate in modo semplice (" + ex + "…), dal Galop 1 al Galop 7." },
  de: { t: "Reitlexikon", intro: "Alle Begriffe aus den Hype-Kursen, von Galop 1 bis Galop 7, einfach erklärt. Du findest sie in der App, zusammen mit dem Kurs, in dem jedes Wort erklärt wird.", mots: (n) => n + " Begriffe", ouvrir: "Lexikon in Hype öffnen", galop: "Galop", desc: (n, ex) => "Reitlexikon: " + n + " Begriffe und Ausdrücke einfach erklärt (" + ex + " …), von Galop 1 bis Galop 7." },
  ja: { t: "乗馬用語集", intro: "Hypeの講座に出てくる言葉を、ギャロップ1から7まで、やさしい説明つきでまとめました。アプリでは、それぞれの言葉を説明している講座も見られます。", mots: (n) => n + "語", ouvrir: "Hypeで用語集を開く", galop: "ギャロップ", desc: (n, ex) => "乗馬用語集：" + n + "の言葉と表現をやさしく説明（" + ex + "…）。ギャロップ1から7まで。" },
  ar: { t: "معجم الفروسية", intro: "كل كلمات دروس Hype، من الغالوب 1 إلى الغالوب 7، مع تعريف بسيط لكل منها. تجدها في التطبيق مع الدرس الذي يشرح كل كلمة.", mots: (n) => n + " كلمة", ouvrir: "افتح المعجم في Hype", galop: "الغالوب", desc: (n, ex) => "معجم الفروسية: " + n + " كلمة وعبارة مشروحة ببساطة (" + ex + "…)، من الغالوب 1 إلى الغالوب 7." },
  zh: { t: "马术词汇表", intro: "Hype 课程中的所有词汇，从 Galop 1 到 Galop 7，每个词都有简单的解释。在应用中还能找到讲解每个词的课程。", mots: (n) => n + " 个词", ouvrir: "在 Hype 中打开词汇表", galop: "Galop", desc: (n, ex) => "马术词汇表：" + n + " 个词语和表达的简单解释（" + ex + "…），从 Galop 1 到 Galop 7。" },
  nl: { t: "Woordenlijst paardrijden", intro: "Alle woorden uit de lessen van Hype, van Galop 1 tot Galop 7, met een eenvoudige uitleg. Je vindt ze in de app, samen met de les waarin elk woord wordt uitgelegd.", mots: (n) => n + " woorden", ouvrir: "Open de woordenlijst in Hype", galop: "Galop", desc: (n, ex) => "Woordenlijst paardrijden: " + n + " woorden en uitdrukkingen eenvoudig uitgelegd (" + ex + "…), van Galop 1 tot Galop 7." },
  pt: { t: "Glossário de equitação", intro: "Todas as palavras das aulas da Hype, do Galop 1 ao Galop 7, com uma definição simples. Encontre-as no app, com a aula em que cada palavra é explicada.", mots: (n) => n + " palavras", ouvrir: "Abrir o glossário na Hype", galop: "Galop", desc: (n, ex) => "Glossário de equitação: " + n + " palavras e expressões explicadas de forma simples (" + ex + "…), do Galop 1 ao Galop 7." },
  sv: { t: "Ridordlista", intro: "Alla ord från Hypes lektioner, från Galop 1 till Galop 7, med en enkel förklaring. Du hittar dem i appen, tillsammans med lektionen där varje ord förklaras.", mots: (n) => n + " ord", ouvrir: "Öppna ordlistan i Hype", galop: "Galop", desc: (n, ex) => "Ridordlista: " + n + " ord och uttryck enkelt förklarade (" + ex + "…), från Galop 1 till Galop 7." },
  ru: { t: "Словарь верховой езды", intro: "Все слова из уроков Hype, от Galop 1 до Galop 7, с простыми определениями. В приложении ты найдёшь их вместе с уроком, где объясняется каждое слово.", mots: (n) => n + " слов", ouvrir: "Открыть словарь в Hype", galop: "Galop", desc: (n, ex) => "Словарь верховой езды: " + n + " слов и выражений с простыми объяснениями (" + ex + "…), от Galop 1 до Galop 7." },
  pl: { t: "Słownik jeździecki", intro: "Wszystkie słowa z lekcji Hype, od Galop 1 do Galop 7, z prostą definicją. Znajdziesz je w aplikacji razem z lekcją, w której każde słowo jest wyjaśnione.", mots: (n) => n + " słów", ouvrir: "Otwórz słownik w Hype", galop: "Galop", desc: (n, ex) => "Słownik jeździecki: " + n + " słów i wyrażeń prosto wyjaśnionych (" + ex + "…), od Galop 1 do Galop 7." },
  ko: { t: "승마 용어 사전", intro: "Galop 1부터 Galop 7까지 Hype 수업에 나오는 모든 단어를 쉬운 설명과 함께 모았어요. 앱에서는 각 단어를 설명하는 수업도 함께 볼 수 있어요.", mots: (n) => n + "개 단어", ouvrir: "Hype에서 용어 사전 열기", galop: "Galop", desc: (n, ex) => "승마 용어 사전: " + n + "개의 단어와 표현을 쉽게 설명해요 (" + ex + "…), Galop 1부터 Galop 7까지." },
};

/* les fichiers de cours, dans l'ordre où l'appli les connaît */
const FICHIERS = ["hype-cours-complements.js", "hype-cours-galop1.js", "hype-cours-galop2.js", "hype-cours-galop3.js", "hype-cours-galop4.js",
  "hype-cours-galop5.js", "hype-cours-galop6.js", "hype-cours-galop7.js", "hype-cours-g4-textes.js", "hype-cours-editorial.js", "hype-cours-editorial-g4.js"];

function monde() {
  const rien = function () { };
  const React = { createElement: function () { return null; }, useState: function (v) { return [v, rien]; }, useEffect: rien, useRef: function () { return {}; },
    useMemo: function (f) { return f(); }, useCallback: function (f) { return f; }, Fragment: "f" };
  const el = function () { return { style: {}, setAttribute: rien, appendChild: rien, addEventListener: rien }; };
  const ctx = { React: React, console: { log: rien, warn: rien, error: rien }, setTimeout: function () { return 0; }, clearTimeout: rien, Intl: Intl,
    navigator: { userAgent: "" }, location: { hash: "", search: "", href: "" },
    localStorage: { getItem: function () { return null; }, setItem: rien, removeItem: rien },
    document: { createElement: el, head: { appendChild: rien }, body: {}, getElementById: function () { return null; }, querySelector: function () { return null; }, addEventListener: rien, documentElement: { style: {} } },
    addEventListener: rien, removeEventListener: rien, dispatchEvent: rien, matchMedia: function () { return { matches: false, addListener: rien, addEventListener: rien }; } };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  return ctx;
}

/* les cours ouverts à tous (même règle que coursEstPret de l'appli : Galop 1, ou présent dans HYPE_COURS_PRETS d'index.html) */
function coursPrets() {
  try {
    const s = fs.readFileSync(path.join(RACINE, "index.html"), "utf8");
    const m = s.match(/const HYPE_COURS_PRETS = (\{[^\n]*?\});/);
    if (!m) return null;
    return vm.runInNewContext("(" + m[1] + ")");
  } catch (e) { return null; }
}

function principal() {
  const G = require("./seo-galops.cjs");
  const ctx = monde();
  for (const f of FICHIERS) {
    try {
      let src = fs.readFileSync(path.join(RACINE, f), "utf8");
      if (f === "hype-cours-editorial.js") {
        const ancre = "window.HypeCoursEditorial = HypeCoursEditorial;";
        if (src.indexOf(ancre) < 0) { log("repère absent dans hype-cours-editorial.js : pas de lexique publié"); return; }
        src = src.replace(ancre, "HypeCoursEditorial.__glex = glexEntrees; " + ancre);
      }
      vm.runInContext(src, ctx, { filename: f, timeout: 20000 });
    } catch (e) { log("fichier sauté :", f, String(e && e.message || e).slice(0, 120)); }
  }
  const E = ctx.HypeCoursEditorial;
  if (!E || typeof E.__glex !== "function") { log("lexique introuvable : rien de publié"); return; }
  const PRETS = coursPrets();
  const pret = function (id, g) { return g === 1 || !PRETS || !!PRETS[id]; };
  const pages = [];
  for (const lg of G.LANGS) {
    let liste = [];
    try { liste = E.__glex(lg, pret) || []; } catch (e) { log(lg, "erreur :", String(e).slice(0, 120)); continue; }
    liste = liste.filter(function (x) { return x && x.mot && x.def; });
    if (liste.length < 20) { log(lg, "trop peu de mots (" + liste.length + "), page sautée"); continue; }
    const u = UIL[lg];
    /* rangés par lettre (première lettre de la clé, sans article) */
    const groupes = [], parL = {};
    liste.forEach(function (x) {
      let l = String(x.cle || x.mot).trim().charAt(0).toLocaleUpperCase(lg);
      try { l = l.normalize("NFD").replace(/[\u0300-\u036f\u0653-\u0655]/g, ""); } catch (e) { }
      if (!/\p{L}/u.test(l)) l = "#";
      if (lg === "ar") l = l.replace(/[\u0622\u0623\u0625\u0671]/, "\u0627");
      if (lg === "ja" || lg === "zh" || lg === "ko") l = "";   /* pas de rangement par lettre pour ces écritures */
      if (!parL[l]) { parL[l] = []; groupes.push({ l: l, mots: parL[l] }); }
      parL[l].push(x);
    });
    let c = `<p class="intro">${G.e(u.intro)}</p><p class="meta">${G.e(u.mots(liste.length))}</p>`;
    if (groupes.length > 3 && groupes[0].l) c += `<p class="meta">${groupes.map(function (g, i) { return `<a href="#l${i}">${G.e(g.l)}</a>`; }).join(" · ")}</p>`;
    groupes.forEach(function (g, i) {
      c += (g.l ? `<h2 id="l${i}">${G.e(g.l)}</h2>` : "") + `<dl class="lex">`;
      g.mots.forEach(function (x) {
        const gs = Array.from(new Set((x.cours || []).map(function (k) { return k.g; }).filter(Boolean))).sort(function (a, b) { return a - b; });
        c += `<dt>${G.e(x.mot)}${gs.length ? ` <span class="pastille">${G.e(u.galop)} ${gs.join(", ")}</span>` : ""}</dt><dd>${G.e(x.def)}</dd>`;
      });
      c += `</dl>`;
    });
    c += `<p class="nav"><a class="btn" href="${G.DOM}/#c=lexique">${G.e(u.ouvrir)}</a></p>`;
    c = `<style>.lex{margin:0 0 10px}.lex dt{font-weight:600;color:var(--ivoire);margin:14px 0 2px}.lex dd{margin:0;color:var(--doux)}</style>` + c;
    const ex = liste.slice(0, 40).filter(function (_, i) { return i % 9 === 0; }).map(function (x) { return x.mot; }).slice(0, 4).join(", ");
    const jsonld = { "@context": "https://schema.org", "@type": "DefinedTermSet", name: u.t, description: u.intro, inLanguage: G.HL[lg], url: `${G.DOM}/${lg}/lexique/`,
      hasDefinedTerm: liste.map(function (x) { return { "@type": "DefinedTerm", name: x.mot, description: x.def }; }) };
    G.ecrire(`${lg}/lexique`, G.page({ lg: lg, cible: "lexique", chemin: "lexique/", titre: `${u.t} | Hype`, desc: G.descSeo(u.desc(liste.length, ex), ""), h1: u.t,
      fil: `<a href="${G.DOM}/${lg}/">Hype</a> › <a href="${G.DOM}/${lg}/galops/">${G.e(G.UI[lg].theorie)}</a>`, corps: c, jsonld: jsonld }));
    pages.push(lg);
  }
  if (!pages.length) { log("aucune page écrite"); return; }
  let x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  const alt = pages.map(function (l) { return `    <xhtml:link rel="alternate" hreflang="${G.HL[l]}" href="${G.DOM}/${l}/lexique/"/>\n`; }).join("") + `    <xhtml:link rel="alternate" hreflang="x-default" href="${G.DOM}/fr/lexique/"/>\n`;
  for (const l of pages) x += `  <url>\n    <loc>${G.DOM}/${l}/lexique/</loc>\n${alt}  </url>\n`;
  x += "</urlset>\n";
  fs.writeFileSync(path.join(RACINE, "sitemap-lexique.xml"), x);
  log(pages.length + " langues écrites");
}

try { principal(); } catch (err) { log("erreur, publication inchangée :", String(err && err.stack || err).slice(0, 300)); }
process.exitCode = 0;
