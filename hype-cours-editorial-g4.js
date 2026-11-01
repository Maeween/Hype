/* =====================================================================================
   hype-cours-editorial-g4.js — LES 15 COURS DU GALOP 4 SUR LE MODÈLE ÉDITORIAL (ordinateur et tablette) — 31/10/2026
   Demande de Blandine (31/10, 22h27) : « Galop 4, fais le même travail pour la refonte des cours, avec le même design
   sur ordinateur que ce qu'on a fait pour les Galops 1 et 2 ».
   Même composant que le Galop 1 (hype-cours-editorial.js) : haut de page photo + encarts, menu de cartes photo,
   UN chapitre à la fois (liste des notions à gauche, carte à droite), page de fin partagée (FinCours des robes).
   Téléphone : même lecture verticale que les Galops 1 et 2 (menu horizontal, chapitre en lecture verticale), fournie par le composant commun.

   AUCUN TEXTE RÉÉCRIT : tout est lu dans le cours (hype-cours-galop4.js) et dans ses compléments (COMPL_*_I18N de index.html),
   14 langues. Chaque information à UN seul endroit :
   - chapitres = les blocs titrés du cours ; une notion = une carte (titre, texte, « en détail ») ou une section ;
     un encadré « Les sensations » et un paragraphe sans titre rejoignent la notion juste avant ;
   - scènes interactives existantes (biomécanique, équilibre du cavalier, phases du saut) : une notion dans le chapitre d'avant ;
   - « Cartes premium » (fiches mémo) -> chapitre « Fiches mémo » ; glossaire -> chapitre « Glossaire » ;
     le savais-tu, la science explique, les vidéos reliées au cours (et les liens réels) -> chapitre « Pour aller plus loin » ;
   - conseil du coach (s'il existe) -> encart du haut ; défi -> encart du haut (1re phrase) + page de fin (la suite et les points) ;
     questions Hey Baby -> page de fin ; « À retenir en 20 secondes » -> résumé de la page de fin ;
     citation de la couverture -> note du chapitre 1.
   - NON REPRIS (doublons ou cases vides) : les phrases « … ? → … » de la synthèse (redisent la synthèse), les cartes
     « Prochainement » (vidéo officielle, Les yeux du cavalier, ressources sans lien), les phrases d'aide des boutons.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var E = window.HypeCoursEditorial;
if (!E || !E._ || !E.config) return;
var VERSION = 3;   /* 01/11 : les 2 cours de saut du Galop 3 (g3-c3, g3-saut) passent par ce constructeur, qui sait afficher leurs blocs spéciaux */
/* v2 : palette (photos dorées, couvertures et scènes au doré, chapitres pairs en bleu pétrole + vague dorée) */   /* 01/11 : palette (photos dorées, couvertures et scènes au doré, chapitres pairs en bleu pétrole + vague dorée) */
var h = React.createElement;
var X = E._, Lx = X.Lx, tt = X.tt, pickLg = X.pickLg, paras = X.paras, phrases = X.phrases, titreNet = X.titreNet, IM = X.IM;

var T4 = {
  galop: tt("Galop 4", "Galop 4", "Galope 4", "Galoppo 4", "ギャロップ4", "Galopp 4", "الغالوب 4", "Galop 4 级", "Galop 4", "Galope 4", "Galopp 4", "Галоп 4", "Galop 4", "갤럽 4"),
  fiches: tt("Fiches mémo", "Memo cards", "Fichas de repaso", "Schede promemoria", "メモカード", "Merkkarten", "بطاقات للتذكّر", "记忆卡片", "Geheugenkaarten", "Fichas de memória", "Minneskort", "Карточки-памятки", "Fiszki", "메모 카드"),
  videos: tt("Les vidéos", "Videos", "Los vídeos", "I video", "動画", "Die Videos", "الفيديوهات", "视频", "De video's", "Os vídeos", "Videorna", "Видео", "Filmy", "동영상"),
  ouvrirVid: tt("Ouvrir la vidéo", "Open the video", "Abrir el vídeo", "Apri il video", "動画を開く", "Video öffnen", "افتح الفيديو", "打开视频", "Video openen", "Abrir o vídeo", "Öppna videon", "Открыть видео", "Otwórz film", "영상 열기"),
  essayer: tt("À toi d'essayer", "Try it yourself", "Pruébalo tú", "Prova tu", "やってみよう", "Probier es aus", "جرّب بنفسك", "自己试试", "Probeer het zelf", "Experimenta", "Testa själv", "Попробуй сам", "Spróbuj sam", "직접 해 보기"),
  scene: tt("Scène interactive", "Interactive scene", "Escena interactiva", "Scena interattiva", "インタラクティブ場面", "Interaktive Szene", "مشهد تفاعلي", "互动场景", "Interactieve scène", "Cena interativa", "Interaktiv scen", "Интерактивная сцена", "Scena interaktywna", "인터랙티브 장면")
};
function L4(lg) { return function (k) { var o = T4[k]; return o ? (o[lg] || o.en || o.fr) : Lx(lg)(k); }; }

/* compléments du cours (index.html) : lus au moment de l'affichage */
function dico(id) {
  var m = {};
  try { m["g4-biomeca"] = COMPL_I18N; } catch (e) { }
  try { m["g4-contact"] = COMPL_CONTACT_I18N; } catch (e) { }
  try { m["g4-aides"] = COMPL_AIDES_I18N; } catch (e) { }
  try { m["g4-transitions"] = COMPL_TRANSITIONS_I18N; } catch (e) { }
  try { m["g4-incurvation"] = COMPL_INCURVATION_I18N; } catch (e) { }
  try { m["g4-vitesse"] = COMPL_VITESSE_I18N; } catch (e) { }
  try { m["g4-epaules-hanches"] = COMPL_EPAULES_HANCHES_I18N; } catch (e) { }
  try { m["g4-protections"] = COMPL_PROTECTIONS_I18N; } catch (e) { }
  try { m["g4-obstacles-equilibre"] = COMPL_OBSTACLES_EQUILIBRE_I18N; } catch (e) { }
  try { m["g4-soins-travail"] = COMPL_SOINS_TRAVAIL_I18N; } catch (e) { }
  try { m["g4-identite"] = COMPL_IDENTITE_I18N; } catch (e) { }
  try { m["g4-nourrir"] = COMPL_NOURRIR_I18N; } catch (e) { }
  try { m["g4-exterieur"] = COMPL_EXTERIEUR_I18N; } catch (e) { }
  try { m["g4-c5"] = COMPL_SANTE_I18N; } catch (e) { }
  /* 01/11 : Galop 3 — les 2 cours de saut (compléments existants : défi, Hey Baby, synthèse, glossaire, savais-tu, science, ressources) */
  try { m["g3-c3"] = COMPL_ABORD_I18N; } catch (e) { }
  try { m["g3-saut"] = COMPL_SAUT_I18N; } catch (e) { }
  return m[id] || null;
}
function composant(nom) {
  try {
    if (nom === "interactif-biomeca" && typeof BiomecaInteractif === "function") return BiomecaInteractif;
    if (nom === "interactif-cavalier" && typeof CavalierEquilibre === "function") return CavalierEquilibre;
    if (nom === "lien-phases-saut" && typeof BlocLienPhasesSaut === "function") return BlocLienPhasesSaut;
  } catch (e) { }
  return null;
}

/* photos de fond des chapitres (provisoires, photos réelles déjà dans le dépôt) */
var P = function (n) { return "images/" + n; };
var IMG = {   /* 31/10 23h57 (Blandine : rester dans la palette) : photos chaudes et dorées déjà dans le dépôt, provisoires */
  "g4-contact": ["galops-v2-carte-examens-hd2.jpg", "galop5-th-cheval2.webp", "galops-v2-carte-exercices-hd1.jpg"],
  "g4-aides": ["galop5-th-vie2.webp", "galop5-hero-v2.webp", "galops-v2-carte-cours-hd2.jpg"],
  "g4-transitions": ["galop5-hero-v2.webp", "galop5-th-cheval2.webp", "galops-v2-carte-examens-hd2.jpg"],
  "g4-incurvation": ["galop5-th-cheval2.webp", "galops-v2-carte-cours-hd2.jpg", "galop5-th-vie2.webp"],
  "g4-vitesse": ["galop5-hero-v2.webp", "galop5-th-vie2.webp", "galops-v2-carte-examens-hd2.jpg"],
  "g4-epaules-hanches": ["galops-v2-carte-cours-hd2.jpg", "galop5-th-cheval2.webp", "galop5-hero-v2.webp"],
  "g4-protections": ["securite-g1-tenue.webp", "securite-g1-rangement.webp", "robes-portrait-aubere.webp"],
  "g4-obstacles-equilibre": ["galop5-hero-v2.webp", "securite-g1-tenue.webp", "galop5-th-cheval2.webp"],
  "g4-soins-travail": ["cours-pansage-09_gestes_brossage.webp", "securite-g1-epaule.webp", "securite-g1-rangement.webp"],
  "g4-identite": ["robes-portrait-aubere.webp", "robes-portrait-creme.webp", "robes-portrait-gris-pommele.webp"],
  "g4-nourrir": ["securite-g1-observer.webp", "securite-g1-annoncer.webp", "securite-g1-issue.webp"],
  "g4-exterieur": ["FOND_CAVALIERS_ECURIE.webp", "securite-g1-distance.webp", "mes-chevaux-fond-couchant.webp"],
  "g4-biomeca": ["galop5-th-cheval2.webp", "galop5-hero-v2.webp", "robes-portrait-alezan-brule.webp"],
  "g4-galop-qualite": ["galop5-th-cheval2.webp", "galop5-hero-v2.webp", "galop5-th-vie2.webp"],
  "g4-c5": ["securite-g1-epaule.webp", "securite-g1-observer.webp", "securite-g1-inquiet.webp"],
  /* 01/11 : Galop 3, cours de saut (photos provisoires, mêmes que la version d'avant) */
  "g3-c3": ["galop5-c11-saut.webp", "galop5-c12-cross.webp", "galop5-c08-equilibre.webp"],
  "g3-saut": ["galop5-c11-saut.webp", "galop5-c12-cross.webp", "article-cso-saut.webp"]
};
/* chapitres communs : une photo fixe chacun */
var IMG_FIX = { fiches: "galops-v2-carte-exercices-hd1.jpg", glossaire: "galops-v2-carte-examens-hd1.jpg", plus: "securite-g1-porte.webp" };
var IDS = Object.keys(IMG);

/* la couverture du Galop 4 (bleu spectral) passe en noir et blanc chaud, pour suivre la charte (pas de cyan vif) */
(function () {
  try {
    if (document.getElementById("hce-g4-css")) return;
    var st = document.createElement("style"); st.id = "hce-g4-css";
    st.textContent = '.hce-hero .ph[style*="#g4"],.rbo-fc-hero .ph[style*="#g4"]{filter:hue-rotate(205deg) saturate(.55) sepia(.25) brightness(.95)}'
      + ".hce .g4i{filter:hue-rotate(205deg) saturate(.45) sepia(.3)}"
      + ".hce .hce-chp.g4p{background:#101D22}"
      + ".hce .hce-chp.g4p>.bg:after{background:linear-gradient(180deg,rgba(16,29,34,.55) 0%,rgba(16,29,34,.92) 40%,#101D22 100%)}"
      + "@container hce (min-width:1040px){.hce .hce-chp.g4p>.bg:after{background:linear-gradient(270deg,#101D22 0%,rgba(16,29,34,.88) 22%,rgba(16,29,34,.35) 55%,rgba(16,29,34,.25) 100%),linear-gradient(180deg,#101D22 0%,rgba(16,29,34,0) 20%,rgba(16,29,34,0) 78%,#101D22 100%)}}"
      + ".hce .hce-chp.g4p .pan{background:rgba(9,17,20,.86)}"
      + ".hce .hce-chp.g4p::after{content:'';position:absolute;left:0;right:0;height:28px;z-index:2;pointer-events:none;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 28' preserveAspectRatio='none'%3E%3Cpath d='M0 14 C 240 2, 480 26, 720 14 S 1200 2, 1440 14' fill='none' stroke='%23C9A66B' stroke-opacity='.55' stroke-width='1.1'/%3E%3C/svg%3E\") center/100% 100% no-repeat}"
      + ".hce .hce-chp.g4p::after{bottom:0}"
      + ".hce .g4v{display:grid;gap:12px}.hce .g4v button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;text-align:start;"
      + "padding:12px 14px;border:1px solid rgba(201,166,107,.42);border-radius:12px;background:rgba(201,166,107,.06);color:var(--ivoire);font:inherit;font-size:15px;line-height:1.4;cursor:pointer}"
      + ".hce .g4v button small{display:block;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--champ);margin-bottom:3px}"
      + ".hce .g4v button:hover{background:rgba(201,166,107,.14)}"
      + ".hce .g4lien{color:var(--champ);text-decoration:underline;text-underline-offset:3px}"
      + ".hce .g4i{margin-top:4px}";
    document.head.appendChild(st);
  } catch (e) { }
})();

/* segments d'un bloc : structure lue en français, texte dans la langue choisie (même position) */
function lis(v, lg) {
  if (!v) return [];
  var F = Array.isArray(v) ? v : (v.fr || []), Xs = Array.isArray(v) ? v : (v[lg] || v.en || F);
  if (Xs.length !== F.length) Xs = F;
  return F.map(function (f, j) { return { f: f, x: Xs[j] || f }; });
}
function sorte4(f) {
  var t = String(pickLg(f && f.titre, "fr") || "").toLowerCase();
  if (f && f.k === "para" && !t) return "suite";
  if (/sensation/.test(t)) return "suite";
  if (/conseil (du|de ton) coach/.test(t)) return "coach";
  if (/d[ée]fi/.test(t)) return "defi";
  if (/hey baby/.test(t)) return "hb";
  return "notion";
}
function sansFin(s) { return String(s || "").replace(/\s*[;；]\s*$/, "").replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}️‍\s]+/u, "").trim(); }

/* le cours tel qu'il est écrit (textes en { fr, en, … }) : l'appli le passe déjà traduit, or la structure se lit en français */
function brut(cours) {
  try { var t = (/^g3-/.test(cours.id) ? window.COURS_GALOP3_FR : window.COURS_GALOP4_FR) || []; for (var i = 0; i < t.length; i++) if (t[i] && t[i].id === cours.id) return t[i]; } catch (e) { }
  return cours;
}
function construire(coursT, lg) {
  var L = Lx(lg), r = function (x) { return pickLg(x, lg); }, cours = brut(coursT);
  var D = dico(cours.id), C = D ? (D[lg] || D.en || D.fr) : null;
  var pool = (IMG[cours.id] || []).map(P);
  var couv = null, chapitres = [], cur = null, derniere = null, sp = { coach: [], defi: [], hb: [] };
  var nouveau = function (titre) { cur = { titre: titre, notions: [] }; chapitres.push(cur); derniere = null; return cur; };
  (cours.blocs || []).forEach(function (b) {
    if (b.type === "couv-affiche") { couv = b; return; }
    if (b.type === "texte-riche") {
      nouveau(titreNet(r(b.titre)) || r(cours.titre));
      lis(b.contenu, lg).forEach(function (s) {
        var so = sorte4(s.f);
        if (so === "suite" && derniere) { derniere.suite.push(s.x); return; }
        var o = { seg: s.x, fr: s.f, suite: [] };
        if (sp[so]) { sp[so].push(o); derniere = o; return; }
        if (so === "suite") o.titre = L("essentiel");
        cur.notions.push(o); derniere = o;
      });
      return;
    }
    var Comp = composant(b.type);
    if (Comp) {
      if (!cur) nouveau(r(cours.titre));
      var o = { comp: Comp, titre: b.type === "interactif-cavalier" ? null : (b.type === "lien-phases-saut" ? L4(lg)("scene") : L4(lg)("essayer")), cle: b.type, suite: [] };
      if (b.type === "interactif-cavalier") { try { o.titre = String((CAVALIER_I18N[lg] || CAVALIER_I18N.fr).titre || ""); } catch (e) { } o.titre = sansFin(o.titre) || L4(lg)("essayer"); }
      cur.notions.push(o); derniere = o; return;
    }
    if (b.type === "cartes-premium") {
      var d0 = b.donnees || {}, d = (d0.fr && !d0.items) ? (d0[lg] || d0.en || d0.fr) : d0, it = Array.isArray(d.items) ? d.items : (d.items && (d.items[lg] || d.items.fr)) || [];
      if (!it.length) return;
      var ch = { titre: L4(lg)("fiches"), sous: (d0.fr && /fiches m[ée]mo/i.test(d0.fr.sousTitre || "")) ? null : (d.sousTitre || null), notions: it.map(function (x) { return { titre: x[0], texte1: x[1], suite: [] }; }) };
      ch.fix = "fiches"; chapitres.push(ch); cur = null; derniere = null;
    }
  });
  chapitres = chapitres.filter(function (c) { return c.notions.length; });
  /* coach : le premier encadré « conseil du coach » -> encart du haut */
  var coach = null;
  sp.coach.forEach(function (o, i) {
    var t = [r(o.seg.texte), r(o.seg.sous)].concat((Array.isArray(o.seg.details) ? o.seg.details : []).map(r)).concat(o.suite.map(function (x) { return r(x.texte); })).filter(Boolean).join("\n\n");
    if (!coach) coach = { titre: titreNet(r(o.seg.titre)), texte: t };
    else { var c = chapitres[chapitres.length - 1]; if (c) c.notions.push(o); }
  });
  /* défi : celui du cours, sinon celui des compléments */
  var defi = null;
  if (sp.defi.length) {
    var dO = sp.defi[0], dT = r(dO.seg.texte) || r(dO.seg.sous) || "", ph = phrases(dT);
    defi = { titre: titreNet(r(dO.seg.titre)), haut: ph.length > 1 ? ph[0] : "", fin: { titre: titreNet(r(dO.seg.titre)), sous: ph.length > 1 ? ph.slice(1).join(" ") : dT, puces: (dO.seg.puces || []).map(function (q) { return { texte: r(q.texte) }; }) } };
  } else if (C && C.defiTitre) {
    var ph2 = phrases(C.defiIntro || "");
    defi = { titre: titreNet(C.defiTitre), haut: ph2[0] || "", fin: { titre: titreNet(C.defiTitre), sous: ph2.slice(1).join(" "), texte: C.defiFin || "", puces: (C.defiItems || []).map(function (t) { return { texte: t }; }) } };
  }
  /* Hey Baby : questions des compléments, sinon les demandes listées dans le cours */
  var hb = (C && C.hbQuestions) ? C.hbQuestions.slice(0, 5) : [];
  if (!hb.length) sp.hb.forEach(function (o) { (o.seg.puces || []).forEach(function (q) { var t = sansFin(r(q.texte)); if (t) hb.push(t); }); });
  var synth = (C && C.synItems) ? C.synItems.slice() : [];
  /* glossaire */
  if (C && C.gloItems && C.gloItems.length) chapitres.push({ fix: "glossaire", titre: titreNet(C.gloTitre), notions: C.gloItems.map(function (g) { return { titre: g[0], texte1: g[1], suite: [] }; }) });
  /* pour aller plus loin : le savais-tu, la science, les vidéos reliées, les ressources qui ont un vrai lien */
  var plus = [];
  if (C && C.stTexte) plus.push({ titre: titreNet(C.stTitre), texte1: C.stTexte, suite: [] });
  if (C && C.sciTexte) plus.push({ titre: titreNet(C.sciTitre), texte1: C.sciTexte, details: C.sciDetail || [], suite: [] });
  var vids = [];
  try { if (window.HYPE_VIDEO && window.HYPE_VIDEO.parCours) vids = window.HYPE_VIDEO.parCours(cours.id) || []; } catch (e) { vids = []; }
  if (vids.length) plus.push({ titre: L4(lg)("videos"), videos: vids, suite: [] });
  var liens = (C && C.loinCartes || []).filter(function (x) { return x[2]; });
  if (liens.length) plus.push({ titre: titreNet(C.loinTitre), texte1: C.loinIntro || "", liens: liens, suite: [] });
  if (plus.length) chapitres.push({ fix: "plus", titre: titreNet(C && C.loinTitre) || L("plusLoin"), notions: plus });
  var k = 0;
  chapitres.forEach(function (c, i) { c.img = c.fix ? P(IMG_FIX[c.fix]) : (pool.length ? pool[(k++) % pool.length] : IM.fond02); c.id = "ch" + (i + 1); });
  /* citation de la couverture -> note du chapitre 1 */
  if (couv && couv.couv && r(couv.couv.citation) && chapitres[0]) {
    chapitres[0].note = "« " + String(r(couv.couv.citation)).replace(/^[«"“\s]+|[»"”\s]+$/g, "") + " »" + (r(couv.couv.auteur) ? "  " + r(couv.couv.auteur) : "");
  }
  return { chapitres: chapitres, coach: coach, defi: defi, hb: hb, synth: synth, couv: couv };
}

function txtVid(o, lg) { return (o && (o[lg] || o.en || o.fr)) || ""; }
function rendu(o, lg, x) {
  var r = function (v) { return pickLg(v, lg); }, out = [], k = 0;
  var pu = function (arr) { if (!arr || !arr.length) return null; return h("ul", { key: "u" + (k++) }, arr.map(function (q, i) { var g = r(q.gras); return h("li", { key: i }, g ? h("strong", null, g + " ") : null, r(q.texte)); })); };
  var para = function (t, g) { return paras(t).map(function (tx, i) { return h("p", { key: "p" + (k++), className: "pg" }, i === 0 && g ? h("strong", null, g + " ") : null, tx); }); };
  if (o.comp) { out.push(h("div", { key: "c", className: "g4i" }, h(o.comp, { onSuivant: function () { } }))); return out; }
  if (o.texte1 !== undefined && o.texte1 !== "") out = out.concat(para(o.texte1));
  (o.details || []).forEach(function (d) { out = out.concat(para(d)); });
  if (o.videos) out.push(h("div", { key: "v", className: "g4v" }, o.videos.map(function (v, i) {
    return h("button", { key: v.id || i, type: "button", onClick: function () { try { window.__hypeVideoOuverte = v.id; } catch (e) { } if (x && x.setEcran) x.setEcran("video-lecture"); } },
      h("span", null, v.source ? h("small", null, v.source) : null, txtVid(v.i18nTitre || v.titre, lg)), X.fleche(x && x.rtl, 15));
  })));
  if (o.liens) out.push(h("ul", { key: "l" }, o.liens.map(function (c, i) { return h("li", { key: i }, h("a", { className: "g4lien", href: c[2], target: "_blank", rel: "noopener" }, c[0]), " · " + c[1]); })));
  if (o.seg) {
    var s = o.seg;
    if (r(s.sous)) out.push(h("p", { key: "so", className: o.fr && o.fr.k === "section" ? "pg" : "s" }, r(s.sous)));
    if (r(s.texte)) out = out.concat(para(r(s.texte), r(s.gras)));
    (Array.isArray(s.details) ? s.details : []).forEach(function (d) { out = out.concat(para(r(d))); });
    out.push(pu(s.puces));
  }
  o.suite.forEach(function (y) {
    if (r(y.titre)) out.push(h("p", { key: "c" + (k++), className: "ap" }, h("b", null, titreNet(r(y.titre)) + "  "), r(y.texte) || r(y.sous) || ""));
    else if (r(y.texte)) out = out.concat(para(r(y.texte), r(y.gras)));
    out.push(pu(y.puces));
  });
  return out.filter(Boolean);
}
function titreN(o, lg) { if (o.titre) return o.titre; return titreNet(pickLg(o.seg && o.seg.titre, lg)); }
function alerte(o) { var t = o.fr && o.fr.titre ? String(pickLg(o.fr.titre, "fr")).toLowerCase() : ""; return /erreur|jamais|attention/.test(t); }

IDS.forEach(function (id) {
  E.config[id] = function (cours, lg) {
    var L = Lx(lg), r = function (x) { return pickLg(x, lg); }, G = /^g3-/.test(id) ? String(L4(lg)("galop")).replace(/4/, "3") : L4(lg)("galop");
    var A = construire(cours, lg);
    if (!A.chapitres.length || !(cours.quiz || []).length) return { valide: false, sections: [], chapitres: [] };
    var chapitres = A.chapitres.map(function (c) { return { id: c.id, label: c.titre, img: c.img, pos: "55% 40%" }; });
    var sections = A.chapitres.map(function (c, i) {
      return { id: c.id, ton: "photo", citation: c.note || null, rendu: function (x) {
        var items = c.notions.map(function (n) { return { titre: titreN(n, lg), alerte: alerte(n), rendu: function () { return rendu(n, lg, x); } }; });
        return h(X.Chapitre, { key: c.id, id: c.id, L: x.L, rtl: x.rtl, num: (i < 9 ? "0" : "") + (i + 1), galop: G, cls: "auto" + (i % 2 ? " inv g4p" : ""), titre: c.titre, sous: c.sous || null, bg: c.img, bgPos: "55% 40%", items: items, note: c.note || null });
      } };
    });
    sections.push({ id: "suite", ton: "noir", rendu: function (x) {
      return h("div", { className: "hce-quiz", style: { "--img": "url(" + IM.quiz + ")", marginTop: 0 } },
        h("h3", null, L("secQuiz")), h("p", null, L("quizSous")),
        h("div", { className: "hce-btns" }, h("button", { type: "button", className: "hce-btn", onClick: function () { x.versFin(true); } }, L("suiteFin"), X.fleche(x.rtl, 15))));
    } });
    var B = brut(cours);
    var cv = A.couv, heroImg = (cv && r(cv.src)) ? r(cv.src) + "#g4" : A.chapitres[0].img;
    return {
      auto: true,
      hero: { img: heroImg, pos: "50% 30%", titre: r(B.titre), galop: G, duree: r(B.duree), type: r(B.type) },
      encarts: {
        coach: A.coach ? { titre: A.coach.titre || L("coach"), texte: A.coach.texte, img: IM.coach, pos: "60% 25%" } : null,
        hb: { texte: L("hbSous"), img: IM.hb, pos: "50% 25%" },
        defi: A.defi ? { titre: A.defi.titre, texte: A.defi.haut, img: IM.defi, pos: "50% 35%" } : null
      },
      chapitres: chapitres,
      revision: { label: L("secQuiz"), sous: L("sQuiz"), img: IM.quiz, pos: "50% 60%" },
      sections: sections,
      auto_: A
    };
  };
  E.config[id].auto = true;
});

/* page de fin : la même page partagée (FinCours) */
function FinG4(props) {
  var S = window.HypeRobesOrdi.shared;
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var L = Lx(lg);
  var cfg = E.config[cours.id](cours, lg), A = cfg.auto_;
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: cfg.hero.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    if (props.setEcran) props.setEcran("assistant");
  };
  var liste = props.coursListe || [], idxC = liste.findIndex(function (c) { return c && c.id === cours.id; });
  var suivant = (idxC >= 0 && liste[idxC + 1] && props.onOuvrirCours) ? liste[idxC + 1] : null;
  var ch = cfg.chapitres, por = [];
  if (A.synth.length) {
    var n = Math.min(5, A.synth.length), taille = Math.ceil(A.synth.length / n);
    for (var i = 0; i < A.synth.length; i += taille) {
      var g = A.synth.slice(i, i + taille), c = ch[por.length % ch.length];
      por.push({ img: c.img, pos: c.pos, nom: g[0], desc: g.slice(1).join(" ") });
    }
  } else {
    por = A.chapitres.slice(0, 5).map(function (c) { return { img: c.img, nom: c.titre, desc: c.notions.map(function (nn) { return titreN(nn, lg); }).join("  ·  ") }; });
  }
  return h("div", { className: "rbo", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, S.CSS),
    h("main", { className: "rbo-main" },
      h(S.FinCours, {
        L: L, lg: lg, rtl: rtl, kicker: cfg.hero.galop, titre: cfg.hero.titre, Selecteur: props.Selecteur, coursId: cours.id,
        heroImg: cfg.hero.img, heroPos: cfg.hero.pos,
        portraits: por, note: null,
        hb: A.hb, onHey: hey, defiSeg: A.defi ? A.defi.fin : null,
        quizImg: IM.quiz, onQuiz: function () { if (props.setEcran) props.setEcran("quiz"); }, quizScore: props.quizScore,
        suivant: suivant ? { titre: (typeof suivant.titre === "string" ? suivant.titre : pickLg(suivant.titre, lg)), onClick: function () { props.onOuvrirCours(suivant.id); } } : null,
        onGalops: props.onRetour, onRetourCours: props.onRetourCours
      }),
      (typeof FinPageHype === "function") ? h("div", { className: "rbo-finpage" }, h(FinPageHype, null)) : null));
}
window.HypeFinsCours = window.HypeFinsCours || {};
IDS.forEach(function (id) { window.HypeFinsCours[id] = { ok: X.finOk, Fin: FinG4 }; });
E.g4 = { version: VERSION, construire: construire };
})();
