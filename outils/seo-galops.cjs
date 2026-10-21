/* HYPE ▸ outils/seo-galops.cjs — 12/10/2026 (référencement : la théorie des Galops en pages publiques).
   Lancé par NETLIFY au moment de publier (netlify.toml, [build] command), après seo-accueil.cjs.
   Rien n'est écrit dans le dépôt GitHub : les pages n'existent que dans la copie publiée.

   DÉCISIONS DE BLANDINE
   - 12/10 : les chapitres sont mis en ligne tels qu'ils sont, et suivront ses mises à jour (ce script relit
     les fichiers de cours à CHAQUE publication : un chapitre refait est republié tout seul).
   - 09/10 : Galop 1 est gratuit ; les Galops 2 à 7 sont réservés aux abonnés Hype+. Donc :
       Galop 1  → chaque chapitre a sa page complète (texte, encadrés, quiz avec réponses à déplier) ;
       Galops 2 à 7 → une page par Galop avec la liste des chapitres (titre, durée) et « Réservé à Hype+ ».
   - Les 10 langues de l'appli (fr, en, es, it, de, ja, ar, zh, nl, pt ; chinois : clé zh des cours, sinon anglais ; arabe de droite à gauche).

   CE QUI EST FABRIQUÉ, pour chaque langue <lg> :
     /<lg>/galops/                  le sommaire des 7 Galops
     /<lg>/galop-1/                 le sommaire du Galop 1 (chapitres en liens)
     /<lg>/galop-1/<chapitre>/      un chapitre (adresse tirée du titre français, identique dans les 10 langues)
     /<lg>/galop-2/ … /<lg>/galop-7/
   + /sitemap-galops.xml (déclaré dans sitemap.xml).
   Les images des cours vivent dans l'appli (paquets hype-images) : elles ne sont PAS reprises ici, seules les
   images déjà en fichier (images/…) le sont.

   GARDE-FOUS : un fichier de cours illisible → ce Galop est simplement sauté ; une erreur → les pages déjà
   écrites restent, rien n'est cassé ; ce script ne fait jamais échouer la publication. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const RACINE = path.join(__dirname, "..");
const DOM = "https://2hype.fr";
const LANGS = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt"];
const NOMS = { fr: "Français", en: "English", es: "Español", it: "Italiano", de: "Deutsch", ja: "日本語", ar: "العربية", zh: "简体中文", nl: "Nederlands", pt: "Português" };
const LOCALES = { fr: "fr_FR", en: "en_GB", es: "es_ES", it: "it_IT", de: "de_DE", ja: "ja_JP", ar: "ar_AR", zh: "zh_CN", nl: "nl_NL", pt: "pt_BR" };
/* code interne (dossier /zh/) → code de langue HTML / hreflang / inLanguage : le chinois simplifié s'écrit zh-Hans */
const HL = { fr: "fr", en: "en", es: "es", it: "it", de: "de", ja: "ja", ar: "ar", zh: "zh-Hans", nl: "nl", pt: "pt-BR" };
/* valeur d'une langue dans un objet de cours { fr, en, … } ; le chinois, le néerlandais et le portugais, tant qu'un cours n'a pas leur clé, retombent sur l'anglais */
function lk(o, lg) { if (!o || typeof o !== "object") return undefined; if (o[lg] != null) return o[lg]; return (lg === "zh" || lg === "nl" || lg === "pt") ? o.en : undefined; }
function log() { console.log.apply(console, ["[seo-galops]"].concat([].slice.call(arguments))); }

/* ---------- Textes de l'interface ---------- */
const UI = {
  fr: { theorie: "Théorie des Galops", galop: (n) => "Galop " + n, chap: "chapitres", ouvrir: "Ouvrir Hype", accueil: "Accueil",
    sousTitre: "La théorie de l'équitation, du Galop 1 au Galop 7, en 10 langues : chapitres illustrés et quiz pour t'entraîner.",
    gratuit: "Gratuit", reserve: "Réservé aux abonnés Hype+", reserveTxt: "Les chapitres de ce Galop se lisent dans l'appli Hype avec l'abonnement Hype+, avec leurs schémas, leurs affiches et leurs quiz.",
    lire: "Lire dans l'appli", suivant: "Chapitre suivant", precedent: "Chapitre précédent", sommaire: "Sommaire du Galop", quiz: "Entraîne-toi",
    reponse: "Voir la réponse", vrai: "Vrai", faux: "Faux", appli: "Retrouve ce chapitre dans l'appli Hype, avec ses images, son quiz noté et le suivi de ta progression.",
    legal: "Contenu pédagogique Hype, construit autour du programme des Galops. Hype est une application indépendante, sans lien officiel avec la Fédération française d'équitation (FFE).",
    langue: "Langue", min: "", decouvrir: "Découvrir Hype" },
  en: { theorie: "Riding theory, levels 1 to 7", galop: (n) => "Level " + n, chap: "chapters", ouvrir: "Open Hype", accueil: "Home",
    sousTitre: "Riding theory based on the French Galop levels 1 to 7, in 10 languages: illustrated chapters and quizzes to practise.",
    gratuit: "Free", reserve: "For Hype+ subscribers", reserveTxt: "The chapters of this level are available in the Hype app with a Hype+ subscription, with their diagrams, posters and quizzes.",
    lire: "Read in the app", suivant: "Next chapter", precedent: "Previous chapter", sommaire: "Level contents", quiz: "Practise",
    reponse: "Show the answer", vrai: "True", faux: "False", appli: "Find this chapter in the Hype app, with its images, a scored quiz and your progress tracking.",
    legal: "Hype educational content, built around the French Galop curriculum. Hype is an independent app with no official link to the French Equestrian Federation (FFE).",
    langue: "Language", decouvrir: "Discover Hype" },
  es: { theorie: "Teoría de equitación, niveles 1 a 7", galop: (n) => "Nivel " + n, chap: "capítulos", ouvrir: "Abrir Hype", accueil: "Inicio",
    sousTitre: "La teoría de la equitación basada en los niveles franceses «Galop» del 1 al 7, en 10 idiomas: capítulos ilustrados y cuestionarios para practicar.",
    gratuit: "Gratis", reserve: "Para suscriptores de Hype+", reserveTxt: "Los capítulos de este nivel se leen en la app Hype con la suscripción Hype+, con sus esquemas, carteles y cuestionarios.",
    lire: "Leer en la app", suivant: "Capítulo siguiente", precedent: "Capítulo anterior", sommaire: "Índice del nivel", quiz: "Practica",
    reponse: "Ver la respuesta", vrai: "Verdadero", faux: "Falso", appli: "Encuentra este capítulo en la app Hype, con sus imágenes, un cuestionario puntuado y el seguimiento de tu progreso.",
    legal: "Contenido educativo de Hype, construido en torno al programa francés de los «Galops». Hype es una aplicación independiente, sin vínculo oficial con la Federación Francesa de Equitación (FFE).",
    langue: "Idioma", decouvrir: "Descubre Hype" },
  it: { theorie: "Teoria dell'equitazione, livelli da 1 a 7", galop: (n) => "Livello " + n, chap: "capitoli", ouvrir: "Apri Hype", accueil: "Home",
    sousTitre: "La teoria dell'equitazione basata sui livelli francesi «Galop» da 1 a 7, in 10 lingue: capitoli illustrati e quiz per allenarti.",
    gratuit: "Gratis", reserve: "Per gli abbonati Hype+", reserveTxt: "I capitoli di questo livello si leggono nell'app Hype con l'abbonamento Hype+, con i loro schemi, poster e quiz.",
    lire: "Leggi nell'app", suivant: "Capitolo successivo", precedent: "Capitolo precedente", sommaire: "Indice del livello", quiz: "Allenati",
    reponse: "Mostra la risposta", vrai: "Vero", faux: "Falso", appli: "Ritrova questo capitolo nell'app Hype, con le sue immagini, un quiz con punteggio e il monitoraggio dei tuoi progressi.",
    legal: "Contenuto didattico di Hype, costruito intorno al programma francese dei «Galop». Hype è un'applicazione indipendente, senza legame ufficiale con la Federazione Equestre Francese (FFE).",
    langue: "Lingua", decouvrir: "Scopri Hype" },
  de: { theorie: "Reitlehre, Stufen 1 bis 7", galop: (n) => "Galopp " + n, chap: "Kapitel", ouvrir: "Hype öffnen", accueil: "Startseite",
    sousTitre: "Reitlehre nach den französischen „Galop“-Stufen 1 bis 7, in 10 Sprachen: illustrierte Kapitel und Quiz zum Üben.",
    gratuit: "Kostenlos", reserve: "Für Hype+-Abonnenten", reserveTxt: "Die Kapitel dieser Stufe gibt es in der Hype-App mit einem Hype+-Abo, mit Schemazeichnungen, Plakaten und Quiz.",
    lire: "In der App lesen", suivant: "Nächstes Kapitel", precedent: "Vorheriges Kapitel", sommaire: "Inhalt der Stufe", quiz: "Übe selbst",
    reponse: "Antwort anzeigen", vrai: "Richtig", faux: "Falsch", appli: "Finde dieses Kapitel in der Hype-App, mit Bildern, einem bewerteten Quiz und deinem Lernfortschritt.",
    legal: "Lerninhalte von Hype, aufgebaut auf dem französischen „Galop“-Programm. Hype ist eine unabhängige App ohne offizielle Verbindung zum Französischen Reitverband (FFE).",
    langue: "Sprache", decouvrir: "Entdecke Hype" },
  ja: { theorie: "乗馬理論 レベル1〜7", galop: (n) => "ギャロップ" + n, chap: "章", ouvrir: "Hypeを開く", accueil: "ホーム",
    sousTitre: "フランスの「ギャロ」レベル1〜7に基づく乗馬理論を10か国語で。図解付きの章と練習用クイズ。",
    gratuit: "無料", reserve: "Hype+会員限定", reserveTxt: "このレベルの章は、Hype+の会員になるとHypeアプリで図解・ポスター・クイズ付きで読めます。",
    lire: "アプリで読む", suivant: "次の章", precedent: "前の章", sommaire: "このレベルの目次", quiz: "練習問題",
    reponse: "答えを見る", vrai: "正しい", faux: "誤り", appli: "この章はHypeアプリでも読めます。画像、採点付きクイズ、学習の進み具合の記録付き。",
    legal: "Hypeの教育コンテンツは、フランスの「ギャロ」課程をもとに作成しています。Hypeは独立したアプリであり、フランス馬術連盟（FFE）とは公式な関係はありません。",
    langue: "言語", decouvrir: "Hypeを始めよう" },
  ar: { theorie: "نظرية الفروسية، المستويات من 1 إلى 7", galop: (n) => "غالوب " + n, chap: "فصول", ouvrir: "افتح Hype", accueil: "الرئيسية",
    sousTitre: "نظرية الفروسية المبنية على مستويات «غالوب» الفرنسية من 1 إلى 7، بعشر لغات: فصول مصورة واختبارات للتدريب.",
    gratuit: "مجاني", reserve: "لمشتركي Hype+", reserveTxt: "تُقرأ فصول هذا المستوى في تطبيق Hype مع اشتراك Hype+، مع رسومها التوضيحية وملصقاتها واختباراتها.",
    lire: "اقرأ في التطبيق", suivant: "الفصل التالي", precedent: "الفصل السابق", sommaire: "فهرس المستوى", quiz: "تدرب",
    reponse: "اعرض الإجابة", vrai: "صحيح", faux: "خطأ", appli: "تجد هذا الفصل في تطبيق Hype، مع صوره واختبار بعلامات ومتابعة تقدمك.",
    legal: "محتوى تعليمي من Hype مبني على برنامج «غالوب» الفرنسي. Hype تطبيق مستقل لا تربطه أي صلة رسمية بالاتحاد الفرنسي للفروسية (FFE).",
    langue: "اللغة", decouvrir: "اكتشف Hype" },
  zh: { theorie: "Galop 马术理论 1 至 7 级", galop: (n) => "Galop " + n, chap: "个章节", ouvrir: "打开 Hype", accueil: "首页",
    sousTitre: "基于法国 Galop 等级（Galop 1 至 Galop 7）的马术理论，提供 10 种语言：配图章节和测验，帮你练习。",
    gratuit: "免费", reserve: "仅限 Hype+ 订阅用户", reserveTxt: "这个等级的章节需订阅 Hype+，在 Hype 应用中阅读，附有图解、海报和测验。",
    lire: "在应用中阅读", suivant: "下一章", precedent: "上一章", sommaire: "本级目录", quiz: "来练习一下",
    reponse: "查看答案", vrai: "正确", faux: "错误", appli: "在 Hype 应用中也能找到这一章，还有图片、计分测验和你的学习进度记录。",
    legal: "Hype 的教学内容，围绕法国 Galop 课程体系编写。Hype 是一款独立的应用，与法国马术协会（FFE）没有任何官方关系。",
    langue: "语言", decouvrir: "了解 Hype" },
  nl: { theorie: "Rijtheorie, niveau 1 tot 7", galop: (n) => "Galop " + n, chap: "hoofdstukken", ouvrir: "Open Hype", accueil: "Startpagina",
    sousTitre: "Rijtheorie volgens de Franse Galop-niveaus 1 tot 7, in 10 talen: geïllustreerde hoofdstukken en quizzen om te oefenen.",
    gratuit: "Gratis", reserve: "Voor abonnees van Hype+", reserveTxt: "De hoofdstukken van dit niveau lees je in de Hype-app met een Hype+-abonnement, met schema’s, posters en quizzen.",
    lire: "Lees in de app", suivant: "Volgend hoofdstuk", precedent: "Vorig hoofdstuk", sommaire: "Inhoud van het niveau", quiz: "Oefen zelf",
    reponse: "Toon het antwoord", vrai: "Juist", faux: "Onjuist", appli: "Vind dit hoofdstuk in de Hype-app, met afbeeldingen, een quiz met score en je voortgang.",
    legal: "Lesinhoud van Hype, opgebouwd rond het Franse Galop-programma. Hype is een onafhankelijke app zonder officiële band met de Franse ruitersportfederatie (FFE).",
    langue: "Taal", decouvrir: "Ontdek Hype" },
  pt: { theorie: "Teoria de equitação, níveis 1 a 7", galop: (n) => "Galop " + n, chap: "capítulos", ouvrir: "Abrir o Hype", accueil: "Início",
    sousTitre: "A teoria da equitação baseada nos níveis franceses «Galop» de 1 a 7, em 10 idiomas: capítulos ilustrados e quizzes para você praticar.",
    gratuit: "Grátis", reserve: "Para assinantes do Hype+", reserveTxt: "Os capítulos deste nível ficam no app Hype com a assinatura Hype+, com seus esquemas, pôsteres e quizzes.",
    lire: "Ler no app", suivant: "Próximo capítulo", precedent: "Capítulo anterior", sommaire: "Sumário do nível", quiz: "Pratique",
    reponse: "Ver a resposta", vrai: "Verdadeiro", faux: "Falso", appli: "Encontre este capítulo no app Hype, com suas imagens, um quiz com nota e o acompanhamento do seu progresso.",
    legal: "Conteúdo educativo do Hype, construído em torno do programa francês dos «Galops». O Hype é um aplicativo independente, sem vínculo oficial com a Federação Francesa de Equitação (FFE).",
    langue: "Idioma", decouvrir: "Conheça o Hype" },
};
/* Sous-titres des Galops : ceux de l'appli (GALOPS_I18N), plus l'arabe, absent de l'appli pour ces 7 lignes. */
const SOUS_ZH = { 1: "认识马", 2: "基础自主能力", 3: "马场内自主骑乘", 4: "掌握户外骑乘", 5: "技术精进", 6: "经验丰富的骑手", 7: "迈向联邦 Galop 7" };
const SOUS_AR = { 1: "اكتشاف الحصان", 2: "استقلالية أساسية", 3: "الاستقلال في الحلبة", 4: "إتقان الركوب في الخارج", 5: "إتقان تقني", 6: "فارس متمرس", 7: "نحو غالوب 7 الاتحادي" };

/* ---------- Lecture des cours ---------- */
function chargerCours() {
  const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
  ctx.HYPE_IMGS = new Proxy({}, { get: () => undefined });
  vm.createContext(ctx);
  /* 21/10/2026 : Galops 4 à 7 lus dans leurs fichiers séparés (hype-cours-galops-sup.js n'est plus mis à jour). */
  for (const f of ["hype-cours-galop1.js", "hype-cours-galop2.js", "hype-cours-galop3.js", "hype-cours-galop4.js", "hype-cours-galop5.js", "hype-cours-galop6.js", "hype-cours-galop7.js"]) {
    try { vm.runInContext(fs.readFileSync(path.join(RACINE, f), "utf8"), ctx, { filename: f, timeout: 20000 }); }
    catch (e) { log(f + " illisible, sauté :", String(e).slice(0, 160)); }
  }
  const w = ctx.window;
  const parGalop = { 1: w.COURS_GALOP1_I18N, 2: w.COURS_GALOP2_FR, 3: w.COURS_GALOP3_FR, 4: w.COURS_GALOP4_FR, 5: w.COURS_GALOP5_FR, 6: w.COURS_GALOP6_FR, 7: w.COURS_GALOP7_FR };
  for (const k of Object.keys(parGalop)) if (!Array.isArray(parGalop[k])) delete parGalop[k];
  return parGalop;
}
function infosGalops() {
  try {
    const s = fs.readFileSync(path.join(RACINE, "index.html"), "utf8");
    const m = s.match(/const GALOPS_I18N = (\[.*?\]);\n/);
    const l = JSON.parse(m[1]);
    const o = {};
    for (const g of l) if (typeof g.id === "number") o[g.id] = g;
    return o;
  } catch (e) { log("GALOPS_I18N illisible, sous-titres absents :", String(e).slice(0, 120)); return {}; }
}

/* ---------- Outils ---------- */
function e(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function tr(v, lg) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && !Array.isArray(v)) { const x = lk(v, lg); return x != null ? x : (v.fr != null ? v.fr : ""); }
  return "";
}
function trListe(v, lg) {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") { const l = lk(v, lg); const x = l != null ? l : v.fr; return Array.isArray(x) ? x : []; }
  return [];
}
function aLaLangue(v, lg) { return v && typeof v === "object" && !Array.isArray(v) && lk(v, lg) != null && lk(v, lg) !== ""; }
function slug(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");
}
function imageFichier(src, lg) {
  const v = typeof src === "string" ? src : (src && typeof src === "object" ? (lk(src, lg) || src.fr) : "");
  return typeof v === "string" && /^images\/[\w./-]+\.(jpe?g|png|webp)$/i.test(v) && fs.existsSync(path.join(RACINE, v)) ? "/" + v : "";
}

/* ---------- Rendu d'un bloc de cours ---------- */
function contenuRiche(liste, lg) {
  let h = "";
  for (const x of Array.isArray(liste) ? liste : []) {
    if (!x || typeof x !== "object") continue;
    const gras = x.gras ? `<strong>${e(x.gras)}</strong> ` : "";
    if (x.k === "para") h += `<p>${gras}${e(x.texte)}</p>`;
    else if (x.k === "carte") h += `<div class="encadre">${x.titre ? `<p class="encadre-t">${e((x.emoji ? x.emoji + " " : "") + x.titre)}</p>` : ""}${x.texte ? `<p>${e(x.texte)}</p>` : ""}${typeof x.details === "string" && x.details ? `<p>${e(x.details)}</p>` : ""}</div>`;
    else if (x.k === "section") {
      if (x.titre) h += `<h3>${e(x.titre)}</h3>`;
      if (x.sous) h += `<p>${e(x.sous)}</p>`;
      const p = (x.puces || []).map((y) => (typeof y === "string" ? e(y) : y && (y.texte || y.gras) ? (y.gras ? `<strong>${e(y.gras)}</strong> ` : "") + e(y.texte || "") : "")).filter(Boolean);
      if (p.length) h += `<ul>${p.map((y) => `<li>${y}</li>`).join("")}</ul>`;
      if (x.texte) h += `<p>${e(x.texte)}</p>`;
    } else if (x.k === "encadre") h += `<div class="encadre">${x.titre ? `<p class="encadre-t">${e((x.emoji ? x.emoji + " " : "") + x.titre)}</p>` : ""}<p>${e(x.texte)}</p></div>`;
    else if (x.k === "citation") h += `<blockquote>${e(x.texte)}</blockquote>`;
    else if (x.texte) h += `<p>${e(x.texte)}</p>`;
  }
  return h;
}
function bloc(b, lg) {
  if (!b || typeof b !== "object") return "";
  let h = "";
  const img = imageFichier(b.src, lg);
  switch (b.type) {
    case "couv-affiche": {
      const c = b.couv || {};
      const cit = tr(c.citation, lg);
      const aut = tr(c.auteur, lg).replace(/^[\s—–-]+/, "");   // certains auteurs commencent déjà par un tiret
      if (cit) h += `<blockquote class="cit">${e(cit)}${aut && aut !== "undefined" ? `<span> — ${e(aut)}</span>` : ""}</blockquote>`;
      break;
    }
    case "texte-riche":
      if (tr(b.titre, lg)) h += `<h2>${e(tr(b.titre, lg))}</h2>`;
      if (img) h += `<figure><img src="${img}" alt="${e(tr(b.legende, lg) || tr(b.titre, lg))}" loading="lazy"></figure>`;
      h += contenuRiche(b.contenu && (lk(b.contenu, lg) || b.contenu.fr), lg);
      h += contenuRiche(b.contenuApres && (lk(b.contenuApres, lg) || b.contenuApres.fr), lg);
      break;
    case "intro": h += `<p class="intro">${e(tr(b.texte, lg))}</p>`; break;
    case "liste": case "photo-liste": {
      if (tr(b.titre, lg)) h += `<h2>${e(tr(b.titre, lg))}</h2>`;
      if (img) h += `<figure><img src="${img}" alt="${e(tr(b.titre, lg))}" loading="lazy"></figure>`;
      const it = trListe(b.items, lg).map((y) => (typeof y === "string" ? y : (y && (y.texte || y.t)) || "")).filter(Boolean);
      if (it.length) h += `<ul>${it.map((y) => `<li>${e(y)}</li>`).join("")}</ul>`;
      break;
    }
    case "astuce": {
      const t = (Array.isArray(b.textes) ? b.textes : [b.texte]).map((y) => tr(y, lg)).filter(Boolean);
      if (t.length) h += `<div class="encadre">${t.map((y) => `<p>💡 ${e(y)}</p>`).join("")}</div>`;
      break;
    }
    case "schema":
      if (tr(b.titre, lg)) h += `<h2>${e(tr(b.titre, lg))}</h2>`;
      if (tr(b.texte, lg)) h += `<p>${e(tr(b.texte, lg))}</p>`;
      if (tr(b.legende, lg)) h += `<p>${e(tr(b.legende, lg))}</p>`;
      break;
    case "image":
      if (img) h += `<figure><img src="${img}" alt="${e(tr(b.legende, lg))}" loading="lazy"></figure>`;
      break;
    default: break;   // blocs interactifs ou réservés à l'appli : non repris
  }
  return h;
}
function quiz(q, lg, ui) {
  if (!Array.isArray(q) || !q.length) return "";
  let h = `<h2>${e(ui.quiz)}</h2><ol class="quiz">`;
  for (const x of q) {
    const question = tr(x.question, lg);
    if (!question) continue;
    const opts = trListe(x.options, lg);
    let bonne = "";
    if (x.type === "vrai-faux" && !opts.length) bonne = (x.correct === true || x.correct === 0 || x.correct === "vrai") ? ui.vrai : ui.faux;
    else if (typeof x.correct === "number" && opts[x.correct] != null) bonne = opts[x.correct];
    else if (typeof x.correct === "boolean") bonne = x.correct ? ui.vrai : ui.faux;
    h += `<li><p class="q">${e(question)}</p>`;
    if (opts.length) h += `<ul class="opts">${opts.map((o) => `<li>${e(o)}</li>`).join("")}</ul>`;
    if (bonne || tr(x.explication, lg)) h += `<details><summary>${e(ui.reponse)}</summary>${bonne ? `<p><strong>${e(bonne)}</strong></p>` : ""}${tr(x.explication, lg) ? `<p>${e(tr(x.explication, lg))}</p>` : ""}</details>`;
    h += `</li>`;
  }
  return h + `</ol>`;
}

/* ---------- Page ---------- */
const CSS = `:root{--fond:#060a09;--fond2:#0b1513;--ivoire:#ece5d6;--doux:#b9b3a6;--champ:#d9b97a;--trait:rgba(217,185,122,.28)}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--fond);color:var(--ivoire);font:16px/1.7 Montserrat,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
a{color:var(--champ)}a:focus-visible,.btn:focus-visible,summary:focus-visible{outline:2px solid var(--champ);outline-offset:3px}
.barre{display:flex;justify-content:space-between;align-items:center;gap:12px;max-width:820px;margin:0 auto;padding:max(16px,env(safe-area-inset-top)) 20px 0}
.marque{font-family:Cinzel,Georgia,serif;font-weight:600;letter-spacing:.18em;font-size:18px;color:var(--ivoire);text-decoration:none}
.langue{font-size:13px;color:var(--doux);text-decoration:none;border:1px solid var(--trait);border-radius:999px;padding:5px 12px;white-space:nowrap}
main{max-width:820px;margin:0 auto;padding:10px 20px 30px}
.fil{font-size:13px;color:var(--doux);margin:18px 0 6px}.fil a{color:var(--doux)}
h1{font-family:Cinzel,Georgia,serif;font-weight:500;font-size:clamp(24px,6vw,34px);line-height:1.25;margin:6px 0 10px;color:var(--champ)}
h2{font-family:Cinzel,Georgia,serif;font-weight:500;font-size:clamp(19px,4.6vw,23px);margin:34px 0 10px;color:var(--ivoire)}
h3{font-size:16px;font-weight:600;color:var(--champ);margin:20px 0 6px}
p{margin:0 0 12px}ul,ol{padding-inline-start:22px;margin:0 0 14px}li{margin:4px 0}
.meta{color:var(--doux);font-size:14px}.intro{color:var(--doux)}
.encadre{border:1px solid var(--trait);border-radius:14px;padding:14px 16px;margin:14px 0;background:var(--fond2)}.encadre-t{color:var(--champ);font-weight:600}
blockquote{margin:16px 0;padding:6px 16px;border-inline-start:2px solid var(--champ);color:var(--ivoire);font-style:italic}blockquote span{color:var(--doux);font-style:normal}
.cit{font-family:Georgia,serif;font-size:18px}
figure{margin:16px 0}figure img{max-width:100%;height:auto;border-radius:12px;display:block}
.quiz>li{margin:0 0 18px}.q{font-weight:500;margin:0 0 6px}.opts{color:var(--doux)}
details{margin:6px 0 0;padding:8px 12px;border:1px solid rgba(217,185,122,.16);border-radius:10px}summary{cursor:pointer;color:var(--champ);font-size:14px}
.liste{list-style:none;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:10px}
.liste a,.liste .carte{display:block;text-decoration:none;color:var(--ivoire);border:1px solid rgba(217,185,122,.16);border-radius:14px;padding:14px 16px;background:var(--fond2)}
.liste .sous{display:block;color:var(--doux);font-size:14px}.pastille{font-size:12px;color:var(--champ);border:1px solid var(--trait);border-radius:999px;padding:1px 9px;margin-inline-start:6px;white-space:nowrap}
.nav{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin:30px 0 0}
.btn{display:inline-block;text-decoration:none;font-weight:500;font-size:15px;padding:12px 24px;border-radius:999px;border:1px solid var(--champ);color:var(--ivoire);background:transparent}
.btn.second{border-color:var(--trait);color:var(--doux)}
.appel{margin:30px 0 0;padding:20px;border:1px solid var(--trait);border-radius:16px;background:var(--fond2)}
footer{max-width:820px;margin:0 auto;padding:22px 20px max(28px,env(safe-area-inset-bottom));font-size:12.5px;color:#8d887e;border-top:1px solid rgba(217,185,122,.12)}footer a{color:#a9a294}
@media (min-width:760px){.liste{grid-template-columns:repeat(2,minmax(0,1fr))}}
:lang(ar) h1,:lang(ar) h2,:lang(ar) .btn,:lang(ja) h1,:lang(ja) h2,:lang(zh) h1,:lang(zh) h2,:lang(zh) .btn{letter-spacing:0}:lang(ar) body{font-family:system-ui,-apple-system,"Segoe UI",Tahoma,Arial,sans-serif}`;

function page(o) {
  // o : lg, chemin (ex. "galop-1/"), titre, desc, h1, corps, fil, jsonld
  const lg = o.lg, ui = UI[lg];
  const url = `${DOM}/${lg}/${o.chemin}`;
  const alts = LANGS.filter((x) => !o.langues || o.langues.includes(x));
  return `<!doctype html>
<html lang="${HL[lg]}"${lg === "ar" ? ' dir="rtl"' : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(o.titre)}</title>
<meta name="description" content="${e(o.desc)}">
<link rel="canonical" href="${url}">
${alts.map((x) => `<link rel="alternate" hreflang="${HL[x]}" href="${DOM}/${x}/${o.chemin}">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${DOM}/fr/${o.chemin}">
<meta name="theme-color" content="#07110f">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Hype">
<meta property="og:locale" content="${LOCALES[lg]}">
<meta property="og:title" content="${e(o.titre)}">
<meta property="og:description" content="${e(o.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${DOM}/images/hype-partage-1200x630.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
${o.jsonld ? `<script type="application/ld+json">${JSON.stringify(o.jsonld).replace(/</g, "\\u003c")}</script>` : ""}
<style>${CSS}</style>
</head>
<body>
<header class="barre"><a class="marque" href="${DOM}/${lg}/">HYPE</a><a class="langue" href="#langues">${lg.toUpperCase()} · ${e(ui.langue)}</a></header>
<main>
<nav class="fil" aria-label="fil">${o.fil}</nav>
<h1>${e(o.h1)}</h1>
${o.corps}
</main>
<footer><p>${e(ui.legal)}</p><p id="langues" style="margin-top:8px">${alts.map((x) => (x === lg ? `<strong lang="${HL[x]}">${NOMS[x]}</strong>` : `<a href="${DOM}/${x}/${o.chemin}" hreflang="${HL[x]}" lang="${HL[x]}">${NOMS[x]}</a>`)).join(" · ")}</p></footer>
</body>
</html>
`;
}
function ecrire(rel, html) {
  const f = path.join(RACINE, rel, "index.html");
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

/* ---------- Fabrication ---------- */
function principal() {
  const cours = chargerCours();
  const infos = infosGalops();
  const urls = [];   // { chemin, langues }
  const nomGalop = (n, lg) => UI[lg].galop(n);
  const sousTitre = (n, lg) => (lg === "ar" ? SOUS_AR[n] : lg === "zh" ? (lk(infos[n] && infos[n].sousTitre, "zh") || SOUS_ZH[n]) : tr(infos[n] && infos[n].sousTitre, lg)) || "";
  const galops = [1, 2, 3, 4, 5, 6, 7].filter((n) => cours[n] && cours[n].length);

  // slugs des chapitres du Galop 1 (titre français, rendu unique)
  const g1 = cours[1] || [];
  const vus = {};
  const slugs = g1.map((c) => { let s = slug(tr(c.titre, "fr")) || slug(c.id); if (vus[s]) s += "-" + slug(c.id); vus[s] = 1; return s; });

  for (const lg of LANGS) {
    const ui = UI[lg];
    const accueil = `<a href="${DOM}/${lg}/">${e(ui.accueil)}</a>`;

    // Sommaire des Galops
    let corps = `<p class="intro">${e(ui.sousTitre)}</p><ul class="liste">`;
    for (const n of galops) {
      const nb = cours[n].length;
      corps += `<li><a href="${DOM}/${lg}/galop-${n}/"><strong>${e(nomGalop(n, lg))}</strong><span class="pastille">${e(n === 1 ? ui.gratuit : "Hype+")}</span><span class="sous">${e(sousTitre(n, lg))} · ${nb} ${e(ui.chap)}</span></a></li>`;
    }
    corps += `</ul><p class="nav"><a class="btn" href="${DOM}/">${e(ui.ouvrir)}</a></p>`;
    ecrire(`${lg}/galops`, page({ lg, chemin: "galops/", titre: `${ui.theorie} | Hype`, desc: ui.sousTitre, h1: ui.theorie, fil: accueil, corps,
      jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: ui.theorie, inLanguage: HL[lg], url: `${DOM}/${lg}/galops/`, isPartOf: { "@id": DOM + "/#website" } } }));
    if (lg === LANGS[0]) urls.push({ chemin: "galops/" });

    for (const n of galops) {
      const liste = cours[n];
      const filG = `${accueil} › <a href="${DOM}/${lg}/galops/">${e(ui.theorie)}</a>`;
      const titreG = nomGalop(n, lg) + (sousTitre(n, lg) ? " — " + sousTitre(n, lg) : "");
      if (n === 1) {
        let c = `<ol class="liste">`;
        liste.forEach((ch, i) => { c += `<li><a href="${DOM}/${lg}/galop-1/${slugs[i]}/">${e(tr(ch.titre, lg))}<span class="sous">${e(tr(ch.duree, lg))}</span></a></li>`; });
        c += `</ol><p class="nav"><a class="btn" href="${DOM}/">${e(ui.ouvrir)}</a></p>`;
        ecrire(`${lg}/galop-1`, page({ lg, chemin: "galop-1/", titre: `${titreG} | Hype`, desc: `${nomGalop(1, lg)} : ${liste.map((x) => tr(x.titre, lg)).slice(0, 6).join(", ")}…`, h1: titreG, fil: filG, corps: c,
          jsonld: { "@context": "https://schema.org", "@type": "Course", name: nomGalop(1, lg), description: sousTitre(1, lg), inLanguage: HL[lg], isAccessibleForFree: true, provider: { "@type": "Organization", name: "Hype", url: DOM + "/" } } }));
        if (lg === LANGS[0]) urls.push({ chemin: "galop-1/" });

        liste.forEach((ch, i) => {
          // une langue absente du titre du chapitre → pas de page dans cette langue (jamais de français déguisé)
          if (!aLaLangue(ch.titre, lg)) return;
          const langues = LANGS.filter((x) => aLaLangue(ch.titre, x));
          let cc = `<p class="meta">${e(nomGalop(1, lg))} · ${e(tr(ch.type, lg))} · ${e(tr(ch.duree, lg))}</p>`;
          for (const b of ch.blocs || []) cc += bloc(b, lg);
          cc += quiz(ch.quiz, lg, ui);
          cc += `<div class="appel"><p>${e(ui.appli)}</p><a class="btn" href="${DOM}/">${e(ui.ouvrir)}</a></div><p class="nav">`;
          cc += i > 0 ? `<a class="btn second" href="${DOM}/${lg}/galop-1/${slugs[i - 1]}/">‹ ${e(ui.precedent)}</a>` : "<span></span>";
          cc += i < liste.length - 1 ? `<a class="btn second" href="${DOM}/${lg}/galop-1/${slugs[i + 1]}/">${e(ui.suivant)} ›</a>` : `<a class="btn second" href="${DOM}/${lg}/galop-1/">${e(ui.sommaire)}</a>`;
          cc += `</p>`;
          const premierTexte = ((ch.blocs || []).map((b) => b.type === "texte-riche" && b.contenu && (lk(b.contenu, lg) || []).find((x) => x && x.k === "para")).find(Boolean) || {}).texte || "";
          const desc = (premierTexte || `${tr(ch.titre, lg)} — ${nomGalop(1, lg)}`).slice(0, 155);
          ecrire(`${lg}/galop-1/${slugs[i]}`, page({ lg, chemin: `galop-1/${slugs[i]}/`, langues, titre: `${tr(ch.titre, lg)} — ${nomGalop(1, lg)} | Hype`, desc,
            h1: tr(ch.titre, lg), fil: `${filG} › <a href="${DOM}/${lg}/galop-1/">${e(nomGalop(1, lg))}</a>`, corps: cc,
            jsonld: { "@context": "https://schema.org", "@type": "LearningResource", name: tr(ch.titre, lg), inLanguage: HL[lg], learningResourceType: "lesson",
              isAccessibleForFree: true, educationalLevel: nomGalop(1, lg), timeRequired: undefined, url: `${DOM}/${lg}/galop-1/${slugs[i]}/`,
              isPartOf: { "@type": "Course", name: nomGalop(1, lg), url: `${DOM}/${lg}/galop-1/` }, provider: { "@type": "Organization", name: "Hype", url: DOM + "/" } } }));
          if (lg === LANGS[0]) urls.push({ chemin: `galop-1/${slugs[i]}/`, langues });
        });
      } else {
        let c = `<div class="encadre"><p class="encadre-t">${e(ui.reserve)}</p><p>${e(ui.reserveTxt)}</p></div><ol class="liste">`;
        for (const ch of liste) c += `<li><span class="carte">${e(tr(ch.titre, lg))}<span class="sous">${e(tr(ch.duree, lg))}</span></span></li>`;
        c += `</ol><p class="nav"><a class="btn" href="${DOM}/">${e(ui.lire)}</a></p>`;
        ecrire(`${lg}/galop-${n}`, page({ lg, chemin: `galop-${n}/`, titre: `${titreG} | Hype`, desc: `${nomGalop(n, lg)} : ${liste.map((x) => tr(x.titre, lg)).slice(0, 6).join(", ")}…`, h1: titreG, fil: filG, corps: c,
          jsonld: { "@context": "https://schema.org", "@type": "Course", name: nomGalop(n, lg), description: sousTitre(n, lg), inLanguage: HL[lg], isAccessibleForFree: false, provider: { "@type": "Organization", name: "Hype", url: DOM + "/" } } }));
        if (lg === LANGS[0]) urls.push({ chemin: `galop-${n}/` });
      }
    }
  }

  // Plan du site des Galops (avec les traductions de chaque page)
  let x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const u of urls) {
    const ls = u.langues || LANGS;
    const alt = ls.map((l) => `    <xhtml:link rel="alternate" hreflang="${HL[l]}" href="${DOM}/${l}/${u.chemin}"/>\n`).join("") + `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOM}/fr/${u.chemin}"/>\n`;
    for (const l of ls) x += `  <url>\n    <loc>${DOM}/${l}/${u.chemin}</loc>\n${alt}  </url>\n`;
  }
  x += "</urlset>\n";
  fs.writeFileSync(path.join(RACINE, "sitemap-galops.xml"), x);
  log(`${urls.length} pages par langue, ${galops.length} Galops, plan du site écrit`);
}

try { principal(); } catch (err) { log("erreur, publication inchangée pour la suite :", String(err && err.stack || err).slice(0, 300)); }
process.exitCode = 0;
