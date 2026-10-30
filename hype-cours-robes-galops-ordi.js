/* =====================================================================================
   hype-cours-robes-galops-ordi.js — VERSION ORDINATEUR des cours de robes des Galops 3 et 5
   30/10/2026 (v1) — PROPOSITION, non publiée. Même cadre que le cours pansage validé et que le Galop 1 :
   colonne Chapitres, grand haut de page photo (2 espaces d'air : 56 px entre le haut de page et le menu),
   3 encarts distincts à droite (coach sur photo assombrie, Hey Baby bleu pétrole, défi noir-vert liseré champagne),
   menu de vignettes numérotées, sections magazine, quiz une question à la fois, fin de page Hype.

   Galop 3 (g3-c7)  : 01 Comprendre · 02 Marques et épis · 03 Déclinaisons (noir pangaré + nuances = facultatifs) · 04 En pratique · 05 Quiz
   Galop 5 (g5-robes): 01 Comprendre · 02 Pies · 03 Tachetés · 04 Adjonctions · 05 Mélanges (bonus) · 06 Quiz

   CE FICHIER NE CONTIENT AUCUN TEXTE DE COURS : tout est LU dans le cours (hype-cours-galop3.js / hype-cours-galop5.js),
   dans la langue choisie (14 langues, arabe de droite à gauche). Ici : mise en page + petits libellés de structure.
   Les photos qui n'existent pas encore s'affichent comme un cadre « Photo à venir » ; dès que le fichier est déposé
   dans images/ (noms prévus ci-dessous), la photo apparaît toute seule, sans modifier le code.

   BRANCHEMENT : window.HypeRobesGalopsOrdi + .ok(cours) ; appelé par EcranCoursCorps (index.html) seulement si la
   largeur est >= 1100 px ET que la structure du cours est reconnue. Sinon : affichage d'avant (téléphone, tablette).
   Dépend de hype-cours-robes-ordi.js (v5, éléments partagés : styles, libellés, icônes).
   À chaque modification : incrémenter VERSION et le « ?v= » de la balise <script> dans index.html.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined" || !window.HypeRobesOrdi || !window.HypeRobesOrdi.shared) return;
var h = React.createElement;
var useState = React.useState, useEffect = React.useEffect;
var VERSION = 7;
var S = window.HypeRobesOrdi.shared, tt = S.tt, ICO = S.ICO, morceaux = S.morceaux, pickLg = S.pickLg, arrLg = S.arrLg;
var nettoyer0 = S.nettoyer, sansNum = S.sansNum, sansGuillemets = S.sansGuillemets;
/* retire aussi les numéros en emoji (4️⃣) des titres : le numéro est déjà affiché à côté */
var nettoyer = function (t) { return String(nettoyer0(t)).replace(/[0-9]\uFE0F?\u20E3\s*/g, ""); };

/* ---------------- libellés de structure (14 langues : fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) ---------------- */
var N = {
  facultatif: tt("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Freiwillig", "اختياري", "选学", "Facultatief", "Opcional", "Valfritt", "По желанию", "Dodatkowo", "선택"),
  bonus: tt("Bonus", "Bonus", "Extra", "Bonus", "ボーナス", "Bonus", "إضافي", "加分", "Bonus", "Extra", "Bonus", "Бонус", "Dodatkowo", "보너스"),
  photo: tt("Photo à venir", "Photo coming soon", "Foto próximamente", "Foto in arrivo", "写真は近日公開", "Foto folgt", "الصورة قريبا", "照片即将上线", "Foto volgt", "Foto em breve", "Foto kommer", "Фото скоро", "Zdjęcie wkrótce", "사진 준비 중"),
  vMarques: tt("Marques blanches", "White markings", "Marcas blancas", "Marcature bianche", "白斑", "Weiße Abzeichen", "العلامات البيضاء", "白色标记", "Witte aftekeningen", "Marcas brancas", "Vita tecken", "Белые отметины", "Białe odmiany", "흰 표식"),
  vEpis: tt("Épis", "Whorls", "Remolinos", "Vortici", "旋毛", "Wirbel", "الدوامات", "旋毛", "Wervels", "Redemoinhos", "Hvirvlar", "Завитки", "Włosy odwrócone", "가마"),
  vPieTach: tt("Pie et tachetée", "Pinto and spotted", "Pío y moteado", "Pezzato e maculato", "パイと斑点", "Schecke und getupft", "الأبقع والمرقط", "花毛与斑点毛", "Bont en gespikkeld", "Pampa e pintado", "Skäck och fläckig", "Пегая и пятнистая", "Srokata i cętkowana", "얼룩무늬와 점박이"),
  parcours: tt("Parcours des robes", "Coat colour path", "Recorrido de las capas", "Percorso dei mantelli", "毛色コース", "Fellfarben-Pfad", "مسار ألوان الخيل", "毛色路径", "Vachtkleurenroute", "Percurso das pelagens", "Färgvägen", "Путь по мастям", "Ścieżka maści", "털색 코스"),
  vDecl: tt("Déclinaisons", "Variations", "Variantes", "Declinazioni", "派生色", "Abwandlungen", "التدرجات", "衍生毛色", "Varianten", "Variações", "Varianter", "Производные масти", "Odmiany", "파생 털색"),
  vPies: tt("Pies", "Pies", "Pías", "Pezzati", "ぶち", "Schecken", "الأبلق", "花斑", "Bonten", "Pies", "Skäckar", "Пегие", "Srokate", "얼룩"),
  vTaches: tt("Tachetés", "Spotted", "Moteadas", "Maculati", "斑点", "Gefleckte", "المبقعة", "斑点", "Gevlekte", "Manchadas", "Fläckiga", "Пятнистые", "Cętkowane", "점박이"),
  vAdj: tt("Adjonctions", "Additions", "Adiciones", "Aggiunte", "付加特徴", "Zusätze", "الإضافات", "附加特征", "Toevoegingen", "Adições", "Tillägg", "Дополнения", "Dodatki", "추가 특징"),
  vMel: tt("Mélanges (bonus)", "Mixes (bonus)", "Mezclas (extra)", "Misture (bonus)", "混色（ボーナス）", "Mischungen (Bonus)", "الخلطات (إضافي)", "混合（加分）", "Mengingen (bonus)", "Misturas (extra)", "Blandningar (bonus)", "Смеси (бонус)", "Mieszanki (dodatkowo)", "혼합색 (보너스)"),
  reviser: tt("Pour réviser", "To revise", "Para repasar", "Per ripassare", "復習しよう", "Zum Wiederholen", "للمراجعة", "复习一下", "Om te herhalen", "Para rever", "För repetition", "Для повторения", "Do powtórki", "복습하기"),
  avant: tt("Avant le quiz", "Before the quiz", "Antes del quiz", "Prima del quiz", "クイズの前に", "Vor dem Quiz", "قبل الاختبار", "测验之前", "Voor de quiz", "Antes do quiz", "Före quizet", "Перед викториной", "Przed quizem", "퀴즈 전에"),
  plusLoin: tt("Pour aller plus loin", "Going further", "Para ir más lejos", "Per approfondire", "さらに学ぶ", "Zum Vertiefen", "للتعمق أكثر", "深入了解", "Verder kijken", "Para ir mais longe", "Gå djupare", "Для углубления", "Dla chętnych", "더 알아보기"),
  ouvrir: tt("Afficher", "Show", "Mostrar", "Mostra", "表示する", "Anzeigen", "عرض", "展开", "Tonen", "Mostrar", "Visa", "Показать", "Pokaż", "보기")
};

/* ---------------- lecture du cours ---------------- */
function lire(cours, lg) {
  var b = cours.blocs || [], couv = (b[0] && b[0].couv) || {};
  return {
    titre: pickLg(cours.titre, lg), duree: pickLg(cours.duree, lg), type: pickLg(cours.type, lg),
    citation: pickLg(couv.citation, lg), auteur: pickLg(couv.auteur, lg),
    blocs: b.map(function (x, i) { return i ? { titre: nettoyer(pickLg(x.titre, lg)), seg: morceaux(x.contenu, lg) } : null; }),
    quiz: function (arr) { return (arr || []).map(function (q) { return { question: pickLg(q.question, lg), options: arrLg(q.options, lg).map(function (x) { return pickLg(x, lg); }), correct: q.correct, explication: pickLg(q.explication, lg) }; }); }
  };
}
function kinds(cours, bi) { var c = cours.blocs[bi] && cours.blocs[bi].contenu; var fr = c && (c.fr || (Array.isArray(c) ? c : null)); return fr ? fr.map(function (s) { return s.k; }).join(",") : ""; }
function quizOk(arr, n) { return Array.isArray(arr) && arr.length === n && arr.every(function (q) { var o = arrLg(q.options, "fr"); return q.question && o.length >= 2 && q.correct != null && q.correct < o.length; }); }

/* ---------------- photos : fichiers prévus (déposer dans images/) ---------------- */
var P = {
  /* existantes (servent aussi de photos de remplacement dans le menu) */
  cheval: "images/cheval-defaut-alezan.webp", noir: "images/robes-g1-noir.webp", alezan: "images/robes-g1-alezan.webp", bai: "images/robes-g1-bai.webp", trio: "images/robes-g1-trio.webp", quiz: "images/pansage-quiz.webp",
  g5hero: "images/galop5-hero-v2.webp", g5cheval: "images/galop5-theme-cheval.webp",
  /* Galop 2 — à fournir */
  g2creme: "images/robes-g2-creme.webp", g2pie: "images/robes-g2-pie.webp", g2gris: "images/robes-g2-gris.webp",
  /* Galop 3 — à fournir */
  g3parties: "images/robes-g3-parties-du-corps.webp", g3tete: "images/robes-g3-marques-tete.webp", g3balzane: "images/robes-g3-balzane.webp", g3epis: "images/robes-g3-epis.webp",
  g3isabelle: "images/robes-g3-isabelle.webp", g3souris: "images/robes-g3-souris.webp", g3brule: "images/robes-g3-alezan-brule.webp", g3cafe: "images/robes-g3-cafe-au-lait.webp", g3palomino: "images/robes-g3-palomino.webp", g3pangare: "images/robes-g3-noir-pangare.webp",
  /* Galop 5 — à fournir */
  g5tobiano: "images/robes-g5-pie-tobiano.webp", g5overo: "images/robes-g5-pie-overo.webp", g5tovero: "images/robes-g5-pie-tovero.webp", g5balzan: "images/robes-g5-pie-balzan.webp", g5sabino: "images/robes-g5-pie-sabino.webp",
  g5leopard: "images/robes-g5-tachete-leopard.webp", g5tachete: "images/robes-g5-tachete-autres.webp",
  g5crins: "images/robes-g5-adj-crins-laves.webp", g5raie: "images/robes-g5-adj-raie-de-mulet.webp", g5pommele: "images/robes-g5-adj-pommele.webp", g5scap: "images/robes-g5-adj-bande-scapulaire.webp", g5zebr: "images/robes-g5-adj-zebrures.webp",
  g5rouan: "images/robes-g5-rouan.webp", g5aubere: "images/robes-g5-aubere.webp", g5gris: "images/robes-g5-gris-comparaison.webp"
};

/* ---------------- styles propres à cette page (s'ajoutent à ceux du Galop 1) ---------------- */
var CSS2 = [
  ".rbo-parc{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0;padding:26px 0 22px}",
  ".rbo-parc .tt{font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:#C9A66B;margin-inline-end:8px}",
  ".rbo-parc button{font:inherit;font-size:13px;font-weight:600;color:#F3EEE4;background:#101D22;border:1px solid rgba(201,166,107,.35);border-radius:999px;padding:8px 18px;cursor:pointer}",
  ".rbo-parc button:hover{border-color:#C9A66B}",
  ".rbo-parc button[aria-current=true]{background:#C9A66B;color:#070A08;border-color:#C9A66B;cursor:default}",
  ".rbo-vig{padding-top:56px}",                          /* 56 px d'air entre le haut de page et le menu */
  ".rbo-vig.n6{grid-template-columns:repeat(6,minmax(0,1fr))}",
  ".rbo-vig.n6 .lab{font-size:16px;max-width:calc(100% - 40px);line-height:1.15}",
  ".rbo-ph{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;height:100%;min-height:220px;background:radial-gradient(120% 90% at 30% 20%,#17262b 0%,#0d1618 70%);border:1px dashed rgba(201,166,107,.45);color:rgba(243,238,228,.7);font-size:13px;letter-spacing:.4px;text-align:center;padding:20px}",
  ".rbo-ph svg{color:var(--champ)}",
  ".rbo-ph small{font-size:10.5px;color:rgba(243,238,228,.42);word-break:break-all}",
  ".rbo-ph2{aspect-ratio:4/3;border-radius:18px;overflow:hidden}",
  ".rbo-fig{position:relative;margin:0}",
  ".rbo-ring{position:absolute;inset-inline-end:-18px;bottom:-26px;width:min(34%,190px);aspect-ratio:1/1;border-radius:50%;border:2px solid var(--champ);box-shadow:0 10px 36px rgba(0,0,0,.55);background-color:#0d1618;background-repeat:no-repeat;background-size:360%;z-index:2}",
  "@media (max-width:1279px){.rbo-ring{inset-inline-end:10px;bottom:-18px}}",
  ".rbo-badge{display:inline-flex;align-self:flex-start;align-items:center;border:1px solid var(--champ);border-radius:999px;padding:4px 14px;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--champ);background:rgba(201,166,107,.08)}",
  ".rbo-duo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px;margin-top:56px}",
  ".rbo-duo>div{display:flex;flex-direction:column;gap:20px}",
  ".rbo-trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:48px 40px;margin-top:56px}",
  ".rbo-trio>div{display:flex;flex-direction:column;gap:18px}",
  ".rbo-trio h3,.rbo-duo h3{font-size:28px!important;margin:0!important}",
  ".rbo-trio .rbo-photo,.rbo-duo .rbo-photo{aspect-ratio:4/3}",
  "@media (max-width:1279px){.rbo-duo{grid-template-columns:minmax(0,1fr)}.rbo-trio{grid-template-columns:repeat(2,minmax(0,1fr))}}",
  ".rbo-fac{margin-top:72px;border:1px solid var(--ligne);border-radius:20px;background:rgba(16,26,29,.55);padding:36px 40px}",
  ".rbo-fac+.rbo-fac{margin-top:28px}",
  ".rbo-fac summary{list-style:none;display:flex;gap:16px;align-items:center;cursor:pointer;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:28px;font-weight:600;color:var(--ivoire)}",
  ".rbo-fac summary::-webkit-details-marker{display:none}",
  ".rbo-fac summary .pl{margin-inline-start:auto;font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:var(--champ)}",
  ".rbo-fac[open] summary{margin-bottom:28px}",
  ".rbo-memo{border:1px solid rgba(201,166,107,.6);border-radius:18px;padding:28px 34px;background:#0B1515}",
  ".rbo-memo h3{color:var(--champ)!important;margin:0 0 12px!important;font-size:26px!important}",
  ".rbo-memo p{color:var(--ivoire);font-size:16px;line-height:1.75}",
  ".rbo-adj{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:26px;margin-top:48px}",
  ".rbo-adj>div{display:flex;flex-direction:column;gap:14px;font-size:14.5px;line-height:1.65;color:var(--doux)}",
  ".rbo-adj .rbo-photo{aspect-ratio:1/1}",
  ".rbo-adj strong{color:var(--ivoire);font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:22px;line-height:1.2}",
  "@media (max-width:1479px){.rbo-adj{grid-template-columns:repeat(3,minmax(0,1fr))}}",
  ".rbo-mqz{margin-top:56px;border-top:1px solid rgba(201,166,107,.3);padding-top:36px}",
  ".rbo-mqz h3{font-size:30px!important;margin:0 0 24px!important}",
  ".rbo-mq{margin-bottom:34px}",
  ".rbo-mq>p{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:24px;line-height:1.3;color:var(--ivoire);margin-bottom:14px}",
  ".rbo-etapes{counter-reset:e}",
  ".rbo-sec.noir .rbo-note{margin-top:20px}",
  ".rbo-sig{border:1px solid var(--ligne);border-radius:18px;background:rgba(16,26,29,.55);padding:32px 38px;margin-top:56px}",
  ".rbo-sig h3{font-size:30px!important;margin:0 0 12px!important}",
  ".rbo-avant{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px;margin-bottom:64px}",
  "@media (max-width:1279px){.rbo-avant{grid-template-columns:minmax(0,1fr)}}"
].join("\n");

/* ---------------- photo avec repli « Photo à venir » ---------------- */
function Img(props) {
  var _e = useState(false), err = _e[0], setErr = _e[1];
  var src = props.src;
  if (err || !src) return h("div", { className: "rbo-ph" }, ICO.livre(26), h("span", null, props.ph || ""));
  return h("img", { src: src, alt: props.alt || "", loading: "lazy", onError: function () { setErr(true); } });
}
/* anneau de zoom : la même photo, agrandie sur un détail (n'apparaît que si la photo existe) */
function Anneau(props) {
  var _e = useState(true), ok = _e[0], setOk = _e[1];
  useEffect(function () {
    var im = new Image(); var vivant = true;
    im.onload = function () { if (vivant) setOk(true); }; im.onerror = function () { if (vivant) setOk(false); }; im.src = props.src;
    return function () { vivant = false; };
  }, [props.src]);
  if (!ok) return null;
  return h("span", { className: "rbo-ring", "aria-hidden": true, style: { backgroundImage: "url(" + props.src + ")", backgroundPosition: props.pos || "50% 40%" } });
}

/* ---------------- plans ---------------- */
function okG3(cours) {
  try {
    if (!cours || cours.id !== "g3-c7" || !cours.blocs || cours.blocs.length !== 4 || !quizOk(cours.quiz, 12) || !quizOk(cours.quizBonus, 2)) return false;
    return kinds(cours, 1) === "para,encadre,section,section,para"
      && kinds(cours, 2) === "section,section,section,para,para,encadre,section,section,section,section,section,section,section,section,section"
      && kinds(cours, 3) === "encadre,section,encadre,encadre,section,section,section,encadre";
  } catch (e) { return false; }
}
function okG5(cours) {
  try {
    if (!cours || cours.id !== "g5-robes" || !cours.blocs || cours.blocs.length !== 3 || !quizOk(cours.quiz, 9) || !quizOk(cours.quizBonus, 3)) return false;
    return kinds(cours, 1) === "para,section,encadre,section,section,section,section,section,section,section,encadre,section,encadre,section,para,section,section,section,section"
      && kinds(cours, 2) === "encadre,section,section,encadre";
  } catch (e) { return false; }
}
function okG2(cours) {
  try {
    if (!cours || cours.id !== "g2-robes" || !cours.blocs || cours.blocs.length !== 2 || !quizOk(cours.quiz, 8)) return false;
    return kinds(cours, 1) === "para,para,section,encadre,section,section,section,encadre,section,encadre,section,encadre,section,encadre,section,encadre";
  } catch (e) { return false; }
}
function ok(cours) { return okG2(cours) || okG3(cours) || okG5(cours); }

var PARC = [{ id: "g1-c7", galop: 1, lab: "Galop 1" }, { id: "g2-robes", galop: 2, lab: "Galop 2" }, { id: "g3-c7", galop: 3, lab: "Galop 3" }, { id: "g5-robes", galop: 5, lab: "Galop 5" }];
/* ---------------- composant ---------------- */
function HypeRobesGalopsOrdi(props) {
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var g5 = cours.id === "g5-robes", g2 = cours.id === "g2-robes";
  var L = function (k) { var o = S.T[k]; return (o && (o[lg] || o.en || o.fr)) || ""; };
  var X = function (k) { var o = N[k]; return (o && (o[lg] || o.en || o.fr)) || ""; };
  var d = lire(cours, lg);
  var a = d.blocs[1].seg, mm = (g5 || g2) ? null : d.blocs[2].seg, z = g2 ? null : d.blocs[g5 ? 2 : 3].seg;
  var Q = d.quiz(cours.quiz), QB = d.quiz(cours.quizBonus);
  var NB = 6;
  var ids = []; for (var i = 1; i <= NB; i++) ids.push("s" + i);

  var _e = useState("s1"), actif = _e[0], setActif = _e[1];
  var _m = useState(false), mini = _m[0], setMini = _m[1];
  useEffect(function () {
    var on = function () { var el = document.querySelector(".rbo-vig"); if (el) setMini(el.getBoundingClientRect().bottom < 0); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return function () { window.removeEventListener("scroll", on); };
  }, []);
  useEffect(function () {
    var els = ids.map(function (i) { return document.getElementById("rbo-" + i); }).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) setActif(en.target.id.replace("rbo-", "")); }); }, { rootMargin: "-25% 0px -62% 0px", threshold: 0 });
    els.forEach(function (e) { io.observe(e); });
    return function () { io.disconnect(); };
  }, []);

  var aller = function (id) { var el = document.getElementById("rbo-" + id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: d.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    props.setEcran("assistant");
  };
  var Selecteur = props.Selecteur;
  var NOIR = "#070A08", PET = "#101D22";

  /* --- briques --- */
  function M(s, key) {
    if (!s) return null;
    var puces = s.puces.length ? h("ul", null, s.puces.map(function (p, i) { return h("li", { key: i }, p.gras ? h("strong", null, p.gras + " ") : null, p.texte); })) : null;
    if (s.k === "para") return h("p", { key: key }, s.gras ? h("strong", null, s.gras + " ") : null, s.texte);
    if (s.k === "encadre") return h("aside", { key: key, className: "rbo-call" }, s.titre ? h("h3", null, nettoyer(s.titre)) : null, s.texte ? h("p", null, s.texte) : null, puces);
    return h(React.Fragment, { key: key }, s.titre ? h("h3", null, nettoyer(sansNum(s.titre))) : null, s.sous ? h("p", { className: "sous" }, s.sous) : null, s.texte ? h("p", null, s.texte) : null, puces);
  }
  function Vague(de, vers) {
    return h("svg", { className: "rbo-vague", viewBox: "0 0 1000 26", preserveAspectRatio: "none", "aria-hidden": true, style: { background: de } },
      h("path", { d: "M0 9 Q160 26 360 12 Q560 -2 770 13 Q890 21 1000 9 L1000 26 L0 26Z", fill: vers }),
      h("path", { d: "M0 9 Q160 26 360 12 Q560 -2 770 13 Q890 21 1000 9", fill: "none", stroke: "rgba(201,166,107,.35)", strokeWidth: 1 }));
  }
  function Sec(id, num, titre, ton, enfants, badge) {
    return h("section", { id: "rbo-" + id, className: "rbo-sec " + ton },
      h("div", { className: "rbo-sechead" }, h("div", { className: "rbo-num" }, num), h("h2", null, titre), badge ? h("span", { className: "rbo-badge" }, badge) : null), enfants);
  }
  /* photo (ou cadre « Photo à venir »), avec anneau de zoom facultatif */
  function Photo(cle, cls, zoom) {
    return h("figure", { className: "rbo-fig" },
      h("div", { className: "rbo-photo " + (cls || "") }, h(Img, { src: P[cle], ph: X("photo") })),
      zoom ? h(Anneau, { src: P[cle], pos: zoom }) : null);
  }
  /* grande composition photo + texte (titre, texte, éventuelle suite) */
  function Compo(cle, titre, texte, inv, zoom, plus, kick) {
    return h("article", { className: "rbo-robe" + (inv ? " inv" : "") },
      Photo(cle, "", zoom),
      h("div", { className: "rbo-txt" }, kick ? h("span", { className: "kick" }, kick) : null, h("h3", null, nettoyer(sansNum(titre))), texte ? h("p", null, texte) : null, plus || null));
  }
  function Memo(titre, texte) { return h("div", { className: "rbo-memo" }, h("h3", null, nettoyer(titre)), h("p", null, texte)); }
  function Fac(titre, enfants, ouvert) {
    return h("details", { className: "rbo-fac", open: !!ouvert },
      h("summary", null, h("span", { className: "rbo-badge" }, X("facultatif")), h("span", null, nettoyer(sansNum(titre))), h("span", { className: "pl" }, X("ouvrir"))), enfants);
  }
  function Reviser(liste, titre) {
    return h("div", { className: "rbo-mqz" }, h("h3", null, titre || X("reviser")), liste.map(function (q, i) { return h(MiniQ, { key: i, q: q, L: L }); }));
  }

  var pc = L("chapitres");
  var kicker = g5 ? "Galop 5" : (g2 ? "Galop 2" : "Galop 3");
  var coach, hbQ, defiT, defiTxt, defiCible, vig, corps;

  if (g2) {
    /* ====== GALOP 2 : tout vient du cours g2-robes ====== */
    coach = a[11]; hbQ = props.questionsHB || []; defiT = a[13].titre; defiTxt = a[13].texte; defiCible = "s5";
    vig = [
      { id: "s1", lab: L("vComprendre"), img: P.cheval, pos: "80% 40%" },
      { id: "s2", lab: d.titre, img: P.trio, pos: "50% 40%" },
      { id: "s3", lab: X("vPieTach"), img: P.noir, pos: "60% 35%" },
      { id: "s4", lab: nettoyer(sansNum(a[10].titre)), img: P.alezan, pos: "70% 50%" },
      { id: "s5", lab: L("vPratique"), img: P.bai, pos: "70% 40%" },
      { id: "s6", lab: L("vQuiz"), img: P.quiz, pos: "center" }
    ];
    corps = [
      Sec("s1", "01", d.blocs[1].titre || L("vComprendre"), "noir", h("div", null,
        h("div", { className: "rbo-grid2" },
          h("div", { className: "rbo-txt" }, M(a[0], "a0"), M(a[1], "a1"), M(a[3], "a3")),
          h("div", { className: "rbo-txt rbo-methode" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[2].titre))), a[2].sous ? h("p", null, a[2].sous) : null,
            h("ol", { className: "rbo-ordre" }, a[2].puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, p.texte)); })))),
        h("div", { style: { marginTop: 64 } }, Photo("trio", "pano")))),
      Vague(NOIR, PET),
      Sec("s2", "02", d.titre, "petrole", h("div", null,
        h("div", { className: "rbo-grid2" }, h("div", { className: "rbo-txt rbo-methode" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[4].titre))), h("ul", { className: "rbo-ordre" }, a[4].puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, p.texte)); }))), Photo("alezan", "grand", "55% 40%")),
        h("div", { className: "rbo-robe inv", style: { marginTop: 88 } }, Photo("g2gris", "", "30% 78%"), h("div", { className: "rbo-txt" }, M(a[7], "a7"))),
        h("div", { className: "rbo-robe", style: { marginTop: 88 } }, Photo("g2creme", "", "45% 45%"), h("div", { className: "rbo-txt" }, M(a[8], "a8"), M(a[9], "a9"))))),
      Vague(PET, NOIR),
      Sec("s3", "03", X("vPieTach"), "noir", h("div", null,
        Compo("g2pie", a[5].titre, a[5].texte, false, "50% 40%", null, "Galop 2"),
        h("div", { style: { marginTop: 88 } }, Compo("g5leopard", a[6].titre, a[6].texte, true, "50% 45%", null, "Galop 2")))),
      Vague(NOIR, PET),
      Sec("s4", "04", nettoyer(sansNum(a[10].titre)), "petrole", h("div", { className: "rbo-robe" },
        Photo("alezan", "", "55% 40%"),
        h("div", { className: "rbo-txt" }, M(a[10], "a10")))),
      Vague(PET, NOIR),
      Sec("s5", "05", L("vPratique"), "noir", h("div", null,
        h("div", { className: "rbo-colonnes", style: { marginTop: 0 } },
          h("div", { className: "rbo-txt" }, M(a[11], "a11")),
          h("div", { className: "rbo-txt" }, M(a[12], "a12"))),
        h("div", { className: "rbo-colonnes" },
          h("div", { className: "rbo-defi rbo-txt" }, M(a[13], "a13")),
          h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, L("heyBaby")),
            h("div", { className: "rbo-hb" }, hbQ.map(function (qq, i) { return h("button", { key: i, type: "button", onClick: function () { hey(qq); } }, qq); })))),
        h("div", { className: "rbo-synth" }, h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[14].titre)))),
          h("ol", null, a[14].puces.map(function (p, i) { return h("li", { key: i }, p.texte); }))),
        h("p", { className: "rbo-fin" }, "« " + sansGuillemets(a[15].texte) + " »"))),
      Vague(NOIR, PET),
      Sec("s6", "06", L("secQuiz"), "petrole", h(QuizBloc, { Q: Q, L: L, rtl: rtl, photo: P.quiz, setEcran: props.setEcran, onTerminer: props.onTerminer }))
    ];
  } else if (!g5) {
    /* ====== GALOP 3 ====== */
    coach = z[0]; hbQ = z[5].puces.map(function (p) { return p.texte; }); defiT = z[2].titre; defiTxt = z[2].texte; defiCible = "s5";
    vig = [
      { id: "s1", lab: L("vComprendre"), img: P.cheval, pos: "80% 40%" },
      { id: "s2", lab: X("vMarques"), img: P.noir, pos: "60% 35%" },
      { id: "s3", lab: X("vEpis"), img: P.cheval, pos: "55% 30%" },
      { id: "s4", lab: X("vDecl"), img: P.alezan, pos: "70% 50%" },
      { id: "s5", lab: L("vPratique"), img: P.bai, pos: "70% 40%" },
      { id: "s6", lab: L("vQuiz"), img: P.quiz, pos: "center" }
    ];
    var decl = mm[7], isab = mm[8], sour = mm[9], brul = mm[10], cafe = mm[11], palo = mm[12], pang = mm[13], nuan = mm[14];
    corps = [
      /* 01 COMPRENDRE : a[0..4] */
      Sec("s1", "01", d.blocs[1].titre, "noir", h("div", null,
        h("div", { className: "rbo-grid2" },
          h("div", { className: "rbo-txt" }, M(a[0], "a0"), M(a[1], "a1")),
          h("div", { className: "rbo-txt rbo-methode" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[2].titre))),
            h("ol", { className: "rbo-ordre" }, a[2].puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, p.texte)); })))),
        h("div", { style: { marginTop: 64 } }, Photo("g3parties", "pano")),
        h("div", { className: "rbo-grid2 rbo-txt", style: { marginTop: 48 } }, M(a[3], "a3"), M(a[4], "a4")))),
      Vague(NOIR, PET),
      /* 02 MARQUES ET ÉPIS : m[0..6] */
      Sec("s2", "02", nettoyer(sansNum(mm[0].titre)), "petrole", h("div", null,
        h("div", { className: "rbo-grid2" },
          h("div", { className: "rbo-txt" }, M(mm[0], "m0"), M(mm[1], "m1")),
          Photo("g3tete", "grand", "62% 38%")),
        h("div", { className: "rbo-duo" },
          h("div", { className: "rbo-txt" }, Photo("g3balzane", "", "50% 80%"), M(mm[2], "m2")),
          h("div", { className: "rbo-txt" }, M(mm[3], "m3"), M(mm[4], "m4"), M(mm[5], "m5"))),
      )),
      Vague(PET, NOIR),
      Sec("s3", "03", nettoyer(sansNum(mm[6].titre)), "noir", h("div", null,
        h("div", { className: "rbo-robe" }, Photo("g3epis", "", "45% 30%"), h("div", { className: "rbo-txt" }, h("h3", null, nettoyer(sansNum(mm[6].titre))), mm[6].sous ? h("p", null, mm[6].sous) : null,
          h("ul", null, mm[6].puces.map(function (p, i) { return h("li", { key: i }, p.texte); })))))),
      Vague(PET, NOIR),
      /* 03 DÉCLINAISONS : m[7..14] */
      Sec("s4", "04", nettoyer(sansNum(decl.titre)), "petrole", h("div", null,
        h("div", { className: "rbo-grid2" }, h("div", { className: "rbo-txt" }, decl.sous ? h("p", null, decl.sous) : null),
          h("div", { className: "rbo-txt rbo-methode" }, h("ul", { className: "rbo-ordre" }, decl.puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, h("strong", null, p.gras + " "), p.texte)); })))),
        h("div", { style: { marginTop: 72 } }, Compo("g3isabelle", isab.titre, isab.texte, false, "22% 38%", null, "Galop 3")),
        h("div", { style: { marginTop: 88 } }, Compo("g3souris", sour.titre, sour.texte, true, "22% 38%", null, "Galop 3")),
        h("div", { style: { marginTop: 88 } }, Compo("g3brule", brul.titre, brul.texte, false, "55% 40%", null, "Galop 3")),
        h("div", { style: { marginTop: 88 } }, Compo("g3cafe", cafe.titre, cafe.texte, true, "55% 40%", null, "Galop 3")),
        h("div", { style: { marginTop: 88 } }, Compo("g3palomino", palo.titre, palo.texte, false, "55% 40%", null, "Galop 3")),
        Fac(pang.titre, h("div", { className: "rbo-robe" }, Photo("g3pangare", "", "50% 45%"), h("div", { className: "rbo-txt" }, h("p", null, pang.texte), Reviser(QB, null))), false),
        Fac(nuan.titre, h("div", { className: "rbo-txt", style: { maxWidth: 860 } }, nuan.sous ? h("p", { className: "sous" }, nuan.sous) : null, h("ul", null, nuan.puces.map(function (p, i) { return h("li", { key: i }, p.gras ? h("strong", null, p.gras + " ") : null, p.texte); }))), false))),
      Vague(PET, NOIR),
      /* 04 EN PRATIQUE : z[1..7] */
      Sec("s5", "05", d.blocs[3].titre || L("vPratique"), "noir", h("div", null,
        h("div", { className: "rbo-colonnes", style: { marginTop: 0 } },
          h("div", { className: "rbo-txt" }, M(z[1], "z1")),
          h("div", { className: "rbo-defi rbo-txt" }, M(z[2], "z2"), M(z[3], "z3"))),
        h("div", { className: "rbo-colonnes" },
          h("div", { className: "rbo-txt" }, M(z[4], "z4")),
          h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(z[5].titre))),
            h("div", { className: "rbo-hb" }, hbQ.map(function (qq, i) { return h("button", { key: i, type: "button", onClick: function () { hey(qq); } }, qq); })))),
        h("div", { className: "rbo-synth" }, h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(z[6].titre)))),
          h("ol", null, z[6].puces.map(function (p, i) { return h("li", { key: i }, p.texte); }))),
        h("p", { className: "rbo-fin" }, "« " + sansGuillemets(z[7].texte) + " »"))),
      Vague(NOIR, PET),
      /* 05 QUIZ */
      Sec("s6", "06", L("secQuiz"), "petrole", h(QuizBloc, { Q: Q, L: L, rtl: rtl, photo: P.quiz, setEcran: props.setEcran, onTerminer: props.onTerminer }))
    ];
  } else {
    /* ====== GALOP 5 ====== */
    coach = z[0]; hbQ = z[2].puces.map(function (p) { return p.texte; }); defiT = z[1].titre; defiTxt = String(z[1].sous || "").replace(/\s*[:：]\s*$/, "") + " …"; defiCible = "s6";
    vig = [
      { id: "s1", lab: L("vComprendre"), img: P.g5cheval, pos: "60% 35%" },
      { id: "s2", lab: X("vPies"), img: P.noir, pos: "60% 35%" },
      { id: "s3", lab: X("vTaches"), img: P.cheval, pos: "80% 40%" },
      { id: "s4", lab: X("vAdj"), img: P.bai, pos: "70% 40%" },
      { id: "s5", lab: X("vMel"), img: P.alezan, pos: "70% 45%" },
      { id: "s6", lab: L("vQuiz"), img: P.quiz, pos: "center" }
    ];
    var pies = [[a[5], "g5tobiano"], [a[6], "g5overo"], [a[7], "g5tovero"], [a[8], "g5balzan"], [a[9], "g5sabino"]];
    var adjCles = ["g5crins", "g5raie", "g5pommele", "g5scap", "g5zebr"];
    corps = [
      /* 01 COMPRENDRE : a[0..3] */
      Sec("s1", "01", d.blocs[1].titre, "noir", h("div", null,
        h("div", { className: "rbo-grid2" },
          h("div", { className: "rbo-txt" }, M(a[0], "a0"), M(a[2], "a2")),
          h("div", { className: "rbo-txt rbo-methode" }, h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[1].titre))), a[1].sous ? h("p", { className: "sous" }, a[1].sous) : null,
            h("ol", { className: "rbo-ordre" }, a[1].puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, p.texte)); })))),
        h("div", { className: "rbo-sig" }, h("div", { className: "rbo-txt" }, M(a[3], "a3"))))),
      Vague(NOIR, PET),
      /* 02 PIES : a[4..10] */
      Sec("s2", "02", nettoyer(sansNum(a[4].titre)), "petrole", h("div", null,
        h("div", { className: "rbo-txt", style: { maxWidth: 900 } }, h("p", null, a[4].texte)),
        h("div", { style: { marginTop: 64 } }, Compo(pies[0][1], pies[0][0].titre, pies[0][0].texte, false, "55% 45%", null, "1 / 5")),
        h("div", { style: { marginTop: 88 } }, Compo(pies[1][1], pies[1][0].titre, pies[1][0].texte, true, "55% 45%", null, "2 / 5")),
        h("div", { className: "rbo-trio" }, [2, 3, 4].map(function (i) {
          return h("div", { key: i }, Photo(pies[i][1], "", "55% 45%"), h("span", { className: "kick", style: { fontSize: 12, letterSpacing: 2.4, textTransform: "uppercase", color: "#C9A66B" } }, (i + 1) + " / 5"), h("h3", null, nettoyer(pies[i][0].titre)), h("p", { style: { fontSize: 15.5, lineHeight: 1.75, color: "rgba(243,238,228,.78)" } }, pies[i][0].texte));
        })),
        h("div", { className: "rbo-reflexe" }, h("div", { className: "kick" }, nettoyer(a[10].titre)), h("p", null, a[10].texte)))),
      Vague(PET, NOIR),
      /* 03 TACHETÉS : a[11..12] */
      Sec("s3", "03", nettoyer(sansNum(a[11].titre)), "noir", h("div", null,
        h("div", { className: "rbo-grid2" },
          h("div", { className: "rbo-txt" }, h("p", null, a[11].texte), h("ul", null, a[11].puces.map(function (p, i) { return h("li", { key: i }, p.texte); }))),
          Photo("g5leopard", "grand", "50% 50%")),
        h("div", { style: { marginTop: 64 } }, Photo("g5tachete", "pano", null)),
        h("div", { className: "rbo-txt", style: { marginTop: 48, maxWidth: 900 } }, M(a[12], "a12")))),
      Vague(NOIR, PET),
      /* 04 ADJONCTIONS : a[13..14] */
      Sec("s4", "04", nettoyer(sansNum(a[13].titre)), "petrole", h("div", null,
        h("div", { className: "rbo-txt", style: { maxWidth: 900 } }, h("p", null, a[13].texte)),
        h("div", { className: "rbo-adj" }, a[13].puces.map(function (p, i) {
          return h("div", { key: i }, Photo(adjCles[i], "", "50% 50%"), h("strong", null, nettoyer(p.gras).replace(/\s*:\s*$/, "")), h("span", null, p.texte));
        })),
        h("div", { className: "rbo-reflexe" }, h("p", null, a[14].texte)))),
      Vague(PET, NOIR),
      /* 05 MÉLANGES (bonus) : a[15..18] + révision */
      Sec("s5", "05", nettoyer(sansNum(a[15].titre)), "noir", h("div", null,
        h("div", { className: "rbo-txt", style: { maxWidth: 900 } }, h("p", null, a[15].texte)),
        h("div", { className: "rbo-duo" },
          h("div", null, Photo("g5rouan", "", "50% 50%"), h("h3", null, nettoyer(a[16].titre)), h("p", { style: { fontSize: 16, lineHeight: 1.8, color: "rgba(243,238,228,.78)" } }, a[16].texte)),
          h("div", null, Photo("g5aubere", "", "50% 50%"), h("h3", null, nettoyer(a[17].titre)), h("p", { style: { fontSize: 16, lineHeight: 1.8, color: "rgba(243,238,228,.78)" } }, a[17].texte))),
        h("div", { className: "rbo-tableau" }, h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(a[18].titre)), h("p", null, a[18].texte)), Photo("g5gris", "", "50% 50%")),
        Reviser(QB, null)), X("bonus")),
      Vague(NOIR, PET),
      /* 06 QUIZ : défi + Hey Baby (z), puis les 9 questions */
      Sec("s6", "06", L("secQuiz"), "petrole", h("div", null,
        h("div", { className: "rbo-avant" },
          h("div", { className: "rbo-defi rbo-txt" }, M(z[1], "z1")),
          h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(z[2].titre)), h("div", { className: "rbo-hb" }, hbQ.map(function (qq, i) { return h("button", { key: i, type: "button", onClick: function () { hey(qq); } }, qq); })))),
        h(QuizBloc, { Q: Q, L: L, rtl: rtl, photo: P.quiz, setEcran: props.setEcran, onTerminer: props.onTerminer }),
        h("p", { className: "rbo-fin" }, "« " + sansGuillemets(z[3].texte) + " »")))
    ];
  }

  return h("div", { className: "rbo", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, S.CSS + "\n" + CSS2),
    h("div", { className: "rbo-wrap" },
      h("nav", { className: "rbo-chap", "aria-label": pc },
        h("h3", null, pc),
        (props.coursListe || []).map(function (c, i) {
          var fait = (props.coursTermines || []).indexOf(c.id) >= 0;
          return h("button", { key: c.id, type: "button", "aria-current": c.id === cours.id ? "true" : undefined, onClick: function () { if (c.id !== cours.id && props.onOuvrirCours) props.onOuvrirCours(c.id); } },
            h("span", { className: "n" + (fait ? " fait" : "") }, fait ? "✓" : String(i + 1)), h("span", null, typeof c.titre === "string" ? c.titre : pickLg(c.titre, lg)));
        })),
      h("main", { className: "rbo-main" },
        h("div", { className: "rbo-parc", role: "navigation", "aria-label": X("parcours") },
          h("span", { className: "tt" }, X("parcours")),
          PARC.map(function (pc2) {
            var cur = pc2.id === cours.id;
            return h("button", { key: pc2.id, type: "button", "aria-current": cur ? "true" : undefined, onClick: function () { if (!cur && props.onOuvrirRobes) props.onOuvrirRobes(pc2.galop, pc2.id); } }, pc2.lab);
          })),
        h("div", { className: "rbo-top" },
          h("header", { className: "rbo-hero" },
            h("div", { className: "bg", role: "img", "aria-label": d.titre, style: g5 ? { backgroundImage: "url(" + P.g5hero + ")" } : (g2 ? { backgroundImage: "url(" + (cours.blocs[0].src || P.cheval) + ")" } : undefined) }), h("div", { className: "vo" }),
            h("div", { className: "rbo-bar" },
              h("button", { type: "button", className: "rbo-back", "aria-label": L("retour"), onClick: props.onRetour }, rtl ? "›" : "‹"),
              h("span", { className: "rbo-crumb" }, kicker + "  ›  " + d.titre),
              h("span", { style: { marginInlineStart: "auto" } }, Selecteur ? h(Selecteur, { compact: true }) : null)),
            h("h1", null, d.titre),
            d.citation ? h("p", { className: "rbo-cit" }, "« " + sansGuillemets(d.citation) + " »", d.auteur ? h("small", null, d.auteur) : null) : null,
            h("div", { className: "rbo-meta" },
              d.duree ? h("span", null, ICO.horloge(16), d.duree) : null,
              d.type ? h("span", null, ICO.livre(16), d.type) : null,
              h("span", null, ICO.coupe(16), kicker))),
          h("aside", { className: "rbo-cards" },
            h("div", { className: "rbo-card coach" }, h("h3", null, ICO.coupe(20), nettoyer(coach.titre)), h("p", null, coach.texte)),
            h("button", { type: "button", className: "rbo-card hb", onClick: function () { hey(hbQ[0]); } }, h("h3", null, ICO.bulle(20), L("heyBaby")), h("p", null, hbQ[0] || "")),
            h("button", { type: "button", className: "rbo-card defi", onClick: function () { aller(defiCible); } }, h("h3", null, ICO.coupe(20), nettoyer(defiT)), h("p", null, defiTxt)))),
        h("div", { className: "rbo-vig" + " n6", role: "tablist" },
          vig.map(function (v, i) {
            return h("button", { key: v.id, type: "button", role: "tab", "aria-current": actif === v.id ? "true" : undefined, onClick: function () { aller(v.id); }, style: { backgroundImage: "url(" + v.img + ")", backgroundPosition: v.pos } },
              h("b", { className: "big" }, "0" + (i + 1)), h("span", { className: "lab" }, v.lab), h("span", { className: "arr", "aria-hidden": true }, rtl ? "←" : "→"));
          })),
        h("div", { className: "rbo-minih" },
          h("div", { className: "rbo-mini" + (mini ? " on" : ""), "aria-hidden": mini ? undefined : true },
            vig.map(function (v, i) { return h("button", { key: v.id, type: "button", tabIndex: mini ? 0 : -1, "aria-current": actif === v.id ? "true" : undefined, onClick: function () { aller(v.id); } }, h("b", null, "0" + (i + 1)), v.lab); }))),
        corps,
        (typeof FinPageHype === "function") ? h("div", { className: "rbo-finpage" }, h(FinPageHype, null)) : null)));
}

/* petite révision facultative : une question, réponse immédiate */
function MiniQ(props) {
  var q = props.q, L = props.L;
  var _r = useState(null), rep = _r[0], setRep = _r[1];
  var repondu = rep !== null, juste = repondu && rep === q.correct;
  return h("div", { className: "rbo-mq" },
    h("p", null, q.question),
    h("div", { className: "rbo-opts" }, q.options.map(function (t, j) {
      var cls = repondu ? (j === q.correct ? "bon" : (j === rep ? "mauvais" : "")) : "";
      return h("button", { key: j, type: "button", className: cls, disabled: repondu, onClick: function () { setRep(j); } }, h("span", { className: "lt" }, String.fromCharCode(65 + j)), h("span", null, t));
    })),
    repondu ? h("div", { className: "rbo-res " + (juste ? "ok" : "ko"), "aria-live": "polite" }, h("strong", null, juste ? L("bravo") : L("pasTout")), " ", q.explication) : null);
}

/* quiz principal : une question à la fois */
function QuizBloc(props) {
  var Q = props.Q, L = props.L, rtl = props.rtl;
  var _r = useState({}), reps = _r[0], setReps = _r[1];
  var _q = useState(0), qi = _q[0], setQi = _q[1];
  var fmt = function (k, o) { return L(k).replace(/\{(\w)\}/g, function (m, c) { return o[c]; }); };
  var q = Q[qi], rep = reps[qi], repondu = rep !== undefined, juste = repondu && rep === q.correct;
  var nbRep = Object.keys(reps).length, nbJuste = Object.keys(reps).filter(function (k) { return reps[k] === Q[k].correct; }).length;
  return h("div", null,
    h("div", { className: "rbo-qz" },
      h("div", { className: "rbo-q" },
        h("div", { className: "rbo-prog" }, h("span", null, fmt("qSur", { n: qi + 1, t: Q.length })), h("span", { className: "barre" }, h("i", { style: { width: Math.round(nbRep / Q.length * 100) + "%" } }))),
        h("h3", null, q.question),
        h("div", { className: "rbo-opts" }, q.options.map(function (t, j) {
          var cls = repondu ? (j === q.correct ? "bon" : (j === rep ? "mauvais" : "")) : "";
          return h("button", { key: j, type: "button", className: cls, disabled: repondu, "aria-pressed": repondu && j === rep, onClick: function () { var n = Object.assign({}, reps); n[qi] = j; setReps(n); } },
            h("span", { className: "lt" }, String.fromCharCode(65 + j)), h("span", null, t));
        })),
        repondu ? h("div", { className: "rbo-res " + (juste ? "ok" : "ko"), "aria-live": "polite" }, h("strong", null, juste ? L("bravo") : L("pasTout")), " ", q.explication) : null,
        h("div", { className: "rbo-qnav" },
          h("button", { type: "button", className: "rbo-btn neutre", disabled: qi === 0, onClick: function () { setQi(qi - 1); } }, (rtl ? "→ " : "← ") + L("qPrec")),
          h("button", { type: "button", className: "rbo-btn", disabled: qi === Q.length - 1, onClick: function () { setQi(qi + 1); } }, L("qSuiv") + (rtl ? " ←" : " →")),
          nbRep ? h("button", { type: "button", className: "rbo-btn neutre", onClick: function () { setReps({}); setQi(0); } }, L("exoRestart")) : null),
        nbRep === Q.length ? h("p", { className: "rbo-score", "aria-live": "polite" }, fmt("score", { s: nbJuste, t: Q.length })) : null),
      h("figure", { className: "rbo-fig" }, h("div", { className: "rbo-photo" }, h(Img, { src: props.photo, ph: "" })))),
    h("div", { className: "rbo-cta" },
      h("button", { type: "button", className: "rbo-btn", onClick: function () { props.setEcran("quiz"); } }, L("quizBtn")),
      h("button", { type: "button", className: "rbo-btn", onClick: function () { if (props.onTerminer) props.onTerminer(); } }, L("terminer"))));
}

HypeRobesGalopsOrdi.ok = ok;
HypeRobesGalopsOrdi.version = VERSION;
window.HypeRobesGalopsOrdi = HypeRobesGalopsOrdi;
})();
