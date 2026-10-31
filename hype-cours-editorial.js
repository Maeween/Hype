/* =====================================================================================
   hype-cours-editorial.js — MODÈLE ÉDITORIAL COMMUN DES COURS (Galop 1 à 7) — 31/10/2026
   D'après la maquette de référence validée par Blandine (cours « Les robes du cheval », version ordinateur) :
   grand haut de page photo, 3 encarts (coach, Hey Baby, défi), menu de cartes photo numérotées, section 01 en
   trois colonnes (texte, grande photo, citation), bandeau « à retenir », puis des compositions qui varient.
   Téléphone, tablette et ordinateur dans le même composant (largeur du conteneur, pas de l'écran : la barre
   de navigation HYPE de 210 px reste à gauche sur ordinateur).

   UN SEUL COMPOSANT, piloté par une configuration par cours : HypeCoursEditorial.config["<id>"] = function (cours, lg, o)
   -> { hero, encarts, chapitres, bandeau, sections, fin }. Aucun texte de cours écrit ici : tout est LU dans le cours
   (14 langues). Ici : la mise en page et quelques petits libellés de structure (14 langues).
   Fin de cours : la page de fin partagée déjà validée (FinCours de hype-cours-robes-ordi.js) — pas de 2e système.

   COURS PILOTE : Galop 1 « La sécurité avant tout » (g1-c15). Garde de structure : sinon, affichage d'avant.
   BRANCHEMENT (PAS ENCORE FAIT, en attente de validation) : window.HypeCoursEditorial + .ok(cours), à appeler dans
   EcranCoursCorps (index.html) avant HypeCoursModele. À chaque modification : incrémenter VERSION et le « ?v= ».
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement;
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var VERSION = 3;   /* 31/10 14h : brief du 31/10 13h52 — atlas photo, fiches, signaux, parcours, fin unique */
/* v2 :    /* 31/10 13h45 : doublons retirés (coach, défi, Hey Baby, erreurs, portraits de fin), regroupements */

/* ---------------- libellés de structure (14 langues) ---------------- */
var LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
function tt() { var o = {}; for (var i = 0; i < LGS.length; i++) o[LGS[i]] = arguments[i]; return o; }
var T = {
  visuel: tt("Visuel à fournir", "Image to come", "Imagen por añadir", "Immagine da fornire", "画像準備中", "Bild folgt", "صورة قيد الإعداد", "图片待提供", "Beeld volgt", "Imagem a fornecer", "Bild kommer", "Изображение готовится", "Zdjęcie w przygotowaniu", "이미지 준비 중"),
  lire: tt("Lire la suite", "Read more", "Leer más", "Leggi tutto", "続きを読む", "Weiterlesen", "اقرأ المزيد", "阅读全文", "Lees meer", "Ler mais", "Läs mer", "Читать далее", "Czytaj dalej", "더 읽기"),
  reduire: tt("Réduire", "Show less", "Mostrar menos", "Mostra meno", "閉じる", "Weniger anzeigen", "عرض أقل", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기"),
  voirTout: tt("Voir les {n}", "See all {n}", "Ver los {n}", "Vedi tutti e {n}", "{n}件すべて見る", "Alle {n} ansehen", "عرض الـ{n} كلها", "查看全部 {n} 条", "Alle {n} bekijken", "Ver os {n}", "Visa alla {n}", "Показать все {n}", "Zobacz wszystkie {n}", "{n}개 모두 보기"),
  plusLoin: tt("Pour aller plus loin", "To go further", "Para ir más lejos", "Per approfondire", "もっと知りたい", "Mehr erfahren", "للتعمق أكثر", "深入了解", "Verder verdiepen", "Para saber mais", "Fördjupning", "Подробнее", "Więcej informacji", "더 알아보기"),
  reussis: tt("{n} / {t} validés", "{n} / {t} done", "{n} / {t} hechos", "{n} / {t} fatti", "{n} / {t} 達成", "{n} / {t} geschafft", "{n} / {t} منجزة", "已完成 {n} / {t}", "{n} / {t} gedaan", "{n} / {t} feitos", "{n} / {t} klara", "{n} / {t} выполнено", "{n} / {t} zrobione", "{n} / {t} 완료"),
  zoneAide: tt("Touche une zone pour la découvrir.", "Tap an area to discover it.", "Toca una zona para descubrirla.", "Tocca una zona per scoprirla.", "エリアをタップして確認しよう。", "Tippe auf eine Zone, um sie zu entdecken.", "المس منطقة لاكتشافها.", "点击一个区域了解详情。", "Tik op een zone om meer te ontdekken.", "Toca numa zona para a descobrir.", "Tryck på en zon för att upptäcka den.", "Нажми на зону, чтобы узнать больше.", "Dotknij strefy, aby ją poznać.", "구역을 눌러 알아보세요."),
  chapSuiv: tt("Chapitre suivant", "Next chapter", "Capítulo siguiente", "Capitolo successivo", "次の章", "Nächstes Kapitel", "الفصل التالي", "下一章", "Volgend hoofdstuk", "Capítulo seguinte", "Nästa kapitel", "Следующая глава", "Następny rozdział", "다음 장"),
  queFerais: tt("Que ferais-tu ?", "What would you do?", "¿Qué harías?", "Cosa faresti?", "どうする？", "Was würdest du tun?", "ماذا كنت ستفعل؟", "你会怎么做？", "Wat zou jij doen?", "O que farias?", "Vad skulle du göra?", "Что бы ты сделал?", "Co byś zrobił?", "너라면 어떻게 할까?"),
  voirReflexes: tt("Voir les bons réflexes", "See the right reflexes", "Ver los buenos reflejos", "Vedi i riflessi giusti", "正しい対応を見る", "Die richtigen Reflexe ansehen", "اعرض ردود الفعل الصحيحة", "查看正确反应", "Bekijk de juiste reflexen", "Ver os reflexos certos", "Se rätt reflexer", "Посмотреть правильные действия", "Zobacz właściwe odruchy", "올바른 대처 보기"),
  situationN: tt("Situation {n}", "Situation {n}", "Situación {n}", "Situazione {n}", "状況 {n}", "Situation {n}", "الموقف {n}", "情境 {n}", "Situatie {n}", "Situação {n}", "Situation {n}", "Ситуация {n}", "Sytuacja {n}", "상황 {n}"),
  signesAide: tt("Touche les signes que tu remarques.", "Tap the signs you notice.", "Toca las señales que notes.", "Tocca i segnali che noti.", "気づいたサインをタップしよう。", "Tippe auf die Zeichen, die du bemerkst.", "المس العلامات التي تلاحظها.", "点击你注意到的信号。", "Tik op de signalen die je opmerkt.", "Toca nos sinais que notas.", "Tryck på tecknen du lägger märke till.", "Отметь признаки, которые замечаешь.", "Dotknij sygnałów, które zauważasz.", "알아챈 신호를 눌러 보세요."),
  signesN: tt("Signes repérés : {n}", "Signs spotted: {n}", "Señales detectadas: {n}", "Segnali notati: {n}", "気づいたサイン：{n}", "Bemerkte Zeichen: {n}", "العلامات الملحوظة: {n}", "已注意到的信号：{n}", "Opgemerkte signalen: {n}", "Sinais notados: {n}", "Upptäckta tecken: {n}", "Замечено признаков: {n}", "Zauważone sygnały: {n}", "알아챈 신호: {n}개"),
  defiAide: tt("Coche chaque point avec ton enseignant.", "Tick each point with your instructor.", "Marca cada punto con tu profesor.", "Spunta ogni punto con il tuo istruttore.", "先生と一緒に各項目をチェックしよう。", "Hake jeden Punkt mit deinem Reitlehrer ab.", "ضع علامة على كل نقطة مع مدربك.", "和你的教练一起勾选每一项。", "Vink elk punt af met je instructeur.", "Marca cada ponto com o teu instrutor.", "Bocka av varje punkt med din instruktör.", "Отмечай каждый пункт вместе с тренером.", "Zaznacz każdy punkt z instruktorem.", "선생님과 함께 각 항목을 체크해 보세요.")
};
/* libellé : d'abord ce fichier, puis le modèle téléphone (hype-cours-modele.js), puis les robes (hype-cours-robes-ordi.js) */
function Lx(lg) {
  var f = function (k) {
    var srcs = [T, window.HypeCoursModele && window.HypeCoursModele.T, window.HypeRobesOrdi && window.HypeRobesOrdi.shared && window.HypeRobesOrdi.shared.T];
    for (var i = 0; i < srcs.length; i++) { var o = srcs[i] && srcs[i][k]; if (o) return o[lg] || o.en || o.fr || ""; }
    return "";
  };
  f.lg = lg; return f;
}

/* ---------------- lecture du cours ---------------- */
function pickLg(o, lg) {
  if (o == null) return "";
  if (typeof o === "string") return o;
  return o[lg] || o.en || o.fr || "";
}
function contenuLg(x, lg) { if (Array.isArray(x)) return x; if (x && typeof x === "object") return x[lg] || x.en || x.fr || []; return []; }
function nettoyerTitre(s) { return String(s || "").replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}️‍\s]+/u, "").trim(); }
function sansNum(s) { return String(s || "").replace(/^\s*\d+\s*[.)．、]\s*/, ""); }
function paras(s) { return String(s || "").split(/\n\s*\n/).map(function (t) { return t.trim(); }).filter(Boolean); }
function phrases(s) { return String(s || "").split(/(?<=[.。!！?？])\s*/).map(function (t) { return t.trim(); }).filter(Boolean); }
function deuxLignes(s) {   /* « La sécurité avant tout » -> ["La sécurité", "avant tout"] */
  s = String(s || "");
  var v = s.indexOf(",");
  if (v > 0) return [s.slice(0, v + 1), s.slice(v + 1).trim()];
  var m = s.split(" ");
  if (m.length < 3) return [s, ""];
  var best = 1, ecart = 1e9;
  for (var i = 1; i < m.length; i++) { var a = m.slice(0, i).join(" ").length, b = m.slice(i).join(" ").length, e = Math.abs(a - b); if (e < ecart) { ecart = e; best = i; } }
  return [m.slice(0, best).join(" "), m.slice(best).join(" ")];
}

/* ---------------- styles ---------------- */
var CSS = [
".hce{container-type:inline-size;container-name:hce;--noir:#070A08;--noir2:#0B1113;--petrole:#101D22;--ivoire:#F3EEE4;--champ:#C9A66B;--doux:rgba(243,238,228,.76);--ligne:rgba(201,166,107,.26);--alerte:#D9967C;background:var(--noir);color:var(--ivoire);font-family:'Montserrat','Noto Sans JP','Noto Sans Arabic',sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh;overflow-x:clip;padding-bottom:110px}",
".hce *{box-sizing:border-box}",
".hce h1,.hce h2,.hce h3,.hce h4{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',Georgia,serif;font-weight:600;margin:0;color:var(--ivoire)}",
".hce p{margin:0}",
".hce button{font-family:inherit;cursor:pointer;color:inherit}",
".hce button:focus-visible,.hce summary:focus-visible{outline:2px solid var(--champ);outline-offset:2px}",
".hce-rond{flex:0 0 auto;width:34px;height:34px;border-radius:50%;border:1px solid rgba(243,238,228,.75);display:inline-flex;align-items:center;justify-content:center;color:var(--ivoire)}",
/* ===== HAUT DE PAGE ===== */
".hce-top{position:relative;display:grid;grid-template-columns:minmax(0,1fr)}",
".hce-hero{position:relative;overflow:hidden;min-height:0;padding:0 0 22px}",
".hce-hero .ph{position:relative;height:230px;background:#070A08 center 30%/cover no-repeat;filter:saturate(.82)}",
".hce-hero .ph:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 30%,rgba(7,10,8,0) 55%,#070A08 100%)}",
".hce-bar{position:absolute;top:14px;inset-inline:16px;z-index:3;display:flex;align-items:center;gap:12px}",
".hce-back{width:40px;height:40px;border-radius:50%;border:1px solid rgba(243,238,228,.7);background:rgba(7,10,8,.45);display:inline-flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
".hce-crumb{display:none;align-items:center;gap:10px;font-size:14px;color:var(--ivoire)}.hce-crumb i{font-style:normal;color:var(--doux)}",
".hce-lang{margin-inline-start:auto}",
".hce-hero .txt{position:relative;z-index:2;padding:0 18px;margin-top:-30px}",
".hce .hce-kick{font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:var(--champ);margin:0 0 10px}",
".hce-hero h1{font-size:34px;line-height:1.02;letter-spacing:-.005em}",
".hce-hero h1 span{display:block}.hce-hero h1 span+span{color:#D9B98A}",
".hce-meta{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:12px;font-size:13px;color:var(--ivoire)}",
".hce-meta span{display:inline-flex;align-items:center;gap:8px}.hce-meta svg{color:var(--ivoire);opacity:.9}",
/* les 3 encarts */
".hce-enc{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:16px;padding:4px 16px 18px;scrollbar-width:none}.hce-enc::-webkit-scrollbar{display:none}",
".hce-card{position:relative;flex:0 0 78%;scroll-snap-align:start;min-height:112px;border-radius:14px;overflow:hidden;border:1px solid rgba(201,166,107,.42);background:#0B0F0E;text-align:start;padding:16px 16px 14px;display:flex;flex-direction:column;justify-content:space-between;gap:10px}",
".hce-card .im{position:absolute;inset:0;background:center/cover no-repeat}",
".hce-card .im:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.97) 0%,rgba(7,10,8,.86) 46%,rgba(7,10,8,.25) 100%)}",
"[dir=rtl] .hce-card .im:after{background:linear-gradient(270deg,rgba(7,10,8,.97) 0%,rgba(7,10,8,.86) 46%,rgba(7,10,8,.25) 100%)}",
".hce-card .im.masc{background-size:auto 112%;background-position:right -8px bottom -6px;filter:saturate(.55) brightness(.9)}",
"[dir=rtl] .hce-card .im.masc{background-position:left -8px bottom -6px}",
".hce-card .im.masc:after{background:linear-gradient(90deg,rgba(9,13,15,.98) 0%,rgba(9,13,15,.9) 50%,rgba(9,13,15,.15) 100%)}",
"[dir=rtl] .hce-card .im.masc:after{background:linear-gradient(270deg,rgba(9,13,15,.98) 0%,rgba(9,13,15,.9) 50%,rgba(9,13,15,.15) 100%)}",
".hce-card>*:not(.im){position:relative;z-index:1}",
".hce-card h3{font-size:20px;line-height:1.05;max-width:62%}",
".hce-card.defi h3{color:#D9B98A}",
".hce-card p{font-size:13px;line-height:1.45;color:var(--ivoire);opacity:.9;max-width:64%}",
".hce-card.coach p{max-width:72%}",
".hce-card.defi{justify-content:space-between}",
".hce-card .hce-rond{position:absolute;bottom:12px;inset-inline-end:12px}",
".hce-card:hover{border-color:var(--champ)}",
/* vague */
".hce-vague{display:block;width:100%;height:28px;margin:-1px 0}",
/* menu des chapitres : cartes photo rectangulaires */
".hce-menu{position:relative;padding:8px 0 22px}",
".hce-menu ol{list-style:none;margin:0;padding:0 16px;display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:16px;scrollbar-width:none}.hce-menu ol::-webkit-scrollbar{display:none}",
".hce-menu li{flex:0 0 40%;scroll-snap-align:start}",
".hce-chap{position:relative;display:block;width:100%;height:86px;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.16);background:#0B0F0E;padding:0;text-align:start}",
".hce-chap .ph{position:absolute;inset:0 0 0 38%;background:center/cover no-repeat;opacity:.9}",
"[dir=rtl] .hce-chap .ph{inset:0 38% 0 0}",
".hce-chap .ph:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0B0F0E 0%,rgba(11,15,14,.55) 45%,rgba(11,15,14,.15) 100%)}",
"[dir=rtl] .hce-chap .ph:after{background:linear-gradient(270deg,#0B0F0E 0%,rgba(11,15,14,.55) 45%,rgba(11,15,14,.15) 100%)}",
".hce-chap .n{position:absolute;top:7px;inset-inline-start:11px;font-family:'Cormorant Garamond',serif;font-size:24px;line-height:1;color:var(--champ);font-weight:500}",
".hce-chap .lb{position:absolute;inset-inline:11px 40px;bottom:10px;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:16px;line-height:1.08;font-weight:600;color:var(--ivoire);text-shadow:0 1px 8px rgba(0,0,0,.6)}",
".hce-chap .hce-rond{position:absolute;bottom:10px;inset-inline-end:10px;width:28px;height:28px}",
".hce-chap[aria-current=true]{border-color:var(--champ);box-shadow:0 0 0 1px var(--champ)}",
".hce-chap:hover{border-color:rgba(201,166,107,.7)}",
/* mini-navigation collante */
".hce-minih{position:sticky;top:0;z-index:30;height:0}",
".hce-mini{position:absolute;top:0;inset-inline:0;display:flex;gap:8px;padding:calc(8px + env(safe-area-inset-top)) 14px 8px;overflow-x:auto;scrollbar-width:none;opacity:0;pointer-events:none;transform:translateY(-8px);transition:opacity .2s,transform .2s}",
".hce-mini::-webkit-scrollbar{display:none}.hce-mini.on{opacity:1;pointer-events:auto;transform:none}",
".hce-mini button{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(243,238,228,.18);border-radius:999px;background:rgba(7,10,8,.62);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.5);padding:6px 14px;font-size:13px;white-space:nowrap}",
".hce-mini button b{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--champ);font-weight:600}",
".hce-mini button[aria-current=true]{border-color:var(--champ);color:var(--champ)}",
/* ===== SECTIONS ===== */
".hce-sec{position:relative;padding:44px 20px 52px;scroll-margin-top:52px}",
".hce-sec.t-noir{background:var(--noir)}",
".hce-sec.t-ombre{background:var(--noir2)}",
".hce-in{max-width:1240px;margin:0 auto}",
".hce-head{display:flex;align-items:flex-end;gap:16px;margin-bottom:8px}",
".hce-num{font-family:'Cormorant Garamond',serif;font-size:40px;line-height:.9;color:var(--champ);font-weight:500;padding-bottom:8px;border-bottom:1px solid var(--champ)}",
".hce-head h2{font-size:34px;line-height:1.02;padding-bottom:6px}",
".hce .hce-sous{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:24px;line-height:1.2;color:#D9B98A;font-weight:600;margin:18px 0 14px}",
".hce-txt{font-size:15.5px;line-height:1.7;color:var(--doux);display:flex;flex-direction:column;gap:14px}",
".hce-txt strong{color:var(--ivoire);font-weight:600}",
".hce-photo{margin:0;border-radius:14px;overflow:hidden;background:#0E1413;position:relative}",
".hce-photo img{display:block;width:100%;height:100%;object-fit:cover}",
".hce-photo.r43{aspect-ratio:4/3}.hce-photo.r32{aspect-ratio:3/2}.hce-photo.r31{aspect-ratio:2/1}",
/* visuel à fournir */
".hce-vis{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px dashed rgba(201,166,107,.55);border-radius:14px;background:repeating-linear-gradient(135deg,rgba(201,166,107,.04) 0 12px,rgba(201,166,107,0) 12px 24px),#0C1110;color:var(--champ);font-size:11.5px;letter-spacing:.22em;text-transform:uppercase;text-align:center;padding:16px}",
".hce-vis.r43{aspect-ratio:4/3}.hce-vis.r32{aspect-ratio:3/2}.hce-vis.r169{aspect-ratio:16/9}.hce-vis.r11{aspect-ratio:1/1}",
/* citation (colonne de droite de la section 01) */
".hce-cit{position:relative;padding:8px 4px 0}",
".hce-cit .gl{font-family:'Cormorant Garamond',serif;font-size:72px;line-height:.6;color:var(--champ);display:block;height:34px}",
".hce-cit blockquote{margin:0;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:27px;line-height:1.3;color:var(--ivoire)}",
".hce-cit .tr{display:block;width:48px;height:1.5px;background:var(--champ);margin:20px 0 10px}",
".hce-cit small{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--champ)}",
".hce-s1{display:grid;grid-template-columns:minmax(0,1fr);gap:26px;align-items:start}",
/* bandeau « à retenir » */
".hce-band{margin-top:30px;border:1px solid rgba(201,166,107,.22);border-radius:14px;background:linear-gradient(180deg,rgba(16,29,34,.45),rgba(7,10,8,.6));display:grid;grid-template-columns:minmax(0,1fr)}",
".hce-band>div{display:flex;gap:16px;align-items:flex-start;padding:18px 18px}",
".hce-band>div+div{border-top:1px solid rgba(201,166,107,.18)}",
".hce-band .ic{flex:0 0 auto;color:var(--champ);margin-top:2px}",
".hce-band h3{font-size:21px;color:#D9B98A;margin-bottom:6px}",
".hce-band p,.hce-band li{font-size:14px;line-height:1.55;color:var(--ivoire);opacity:.88}",
".hce-band ul{margin:0;padding-inline-start:16px;display:grid;gap:3px}.hce-band li::marker{color:var(--alerte)}",
".hce-band .al h3{color:var(--alerte)}.hce-band .al .ic{color:var(--alerte)}",
".hce-clamp{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}",
".hce-more{background:none;border:0;padding:6px 0 0;font-size:13px;font-weight:600;color:var(--champ);text-decoration:underline;text-underline-offset:4px}",
/* étapes numérotées (défilent au doigt sur téléphone) */
".hce .hce-kicker2{display:flex;align-items:center;gap:14px;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin:46px 0 16px}",
".hce-kicker2:after{content:'';flex:1;height:1px;background:rgba(201,166,107,.25)}",
".hce-steps{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:20px;scrollbar-width:none;margin:0 -20px;padding:0 20px}.hce-steps::-webkit-scrollbar{display:none}",
".hce-step{flex:0 0 84%;scroll-snap-align:start;border-top:1px solid var(--champ);padding:16px 2px 4px}",
".hce-step .nn{font-family:'Cormorant Garamond',serif;font-size:44px;line-height:1;color:var(--champ)}",
".hce-step h3{font-size:23px;margin:8px 0 8px;line-height:1.15}",
".hce-step p{font-size:15px;line-height:1.65;color:var(--doux)}",
/* dépliables */
".hce-dep{border-top:1px solid rgba(201,166,107,.25);border-bottom:1px solid rgba(201,166,107,.25)}",
".hce-dep+.hce-dep{border-top:0}",
".hce-dep summary{list-style:none;display:flex;align-items:center;gap:14px;padding:16px 2px;cursor:pointer;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:22px;font-weight:600;color:var(--ivoire)}",
".hce-dep summary::-webkit-details-marker{display:none}",
".hce-dep summary .pl{margin-inline-start:auto;width:28px;height:28px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;color:var(--champ);font-family:'Montserrat',sans-serif;font-size:16px;transition:transform .2s}",
".hce-dep[open] summary .pl{transform:rotate(45deg)}",
".hce-dep .ct{padding:0 2px 20px}",
/* duo texte / visuel */
".hce-duo{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;align-items:center}",
".hce-h3{font-size:26px;line-height:1.15;margin-bottom:12px}",
/* zones de vigilance */
".hce-zones{display:grid;grid-template-columns:minmax(0,1fr);gap:22px;margin-top:22px;align-items:start}",
".hce-fig{position:relative}",
".hce-hot{position:absolute;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;border:1.5px solid var(--champ);background:rgba(7,10,8,.78);color:var(--champ);font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 6px rgba(201,166,107,.12)}",
".hce-hot.al{border-color:var(--alerte);color:var(--alerte);box-shadow:0 0 0 6px rgba(217,150,124,.14)}",
".hce-hot[aria-pressed=true]{background:var(--champ);color:var(--noir)}.hce-hot.al[aria-pressed=true]{background:var(--alerte);color:var(--noir)}",
".hce-zl{display:grid;gap:0}",
".hce-zl .aide{font-size:13px;color:var(--doux);margin-bottom:8px}",
".hce-z{display:block;width:100%;text-align:start;background:none;border:0;border-top:1px solid rgba(201,166,107,.22);padding:14px 2px}",
".hce-z:last-child{border-bottom:1px solid rgba(201,166,107,.22)}",
".hce-z .zt{display:flex;align-items:center;gap:14px;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:22px;font-weight:600}",
".hce-z .zn{font-family:'Montserrat',sans-serif;font-weight:600;flex:0 0 30px;height:30px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--champ)}",
".hce-z.al .zn{border-color:var(--alerte);color:var(--alerte)}.hce-z.al .zt b{color:var(--alerte)}",
".hce-z .zx{font-size:15px;line-height:1.65;color:var(--doux);padding:10px 0 4px 44px}",
"[dir=rtl] .hce-z .zx{padding:10px 44px 4px 0}",
".hce-z[aria-expanded=true] .zn{background:var(--champ);color:var(--noir)}.hce-z.al[aria-expanded=true] .zn{background:var(--alerte)}",
/* éditorial : grand texte + exergue */
".hce-ed{display:grid;grid-template-columns:minmax(0,1fr);gap:34px;margin-top:46px}",
".hce-exergue{border-inline-start:2px solid var(--champ);padding-inline-start:22px}",
".hce-exergue h3{font-style:italic;font-size:32px;line-height:1.12;color:var(--ivoire);margin-bottom:14px}",
".hce-coach{margin-top:44px;position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(201,166,107,.35);padding:26px 22px;background:linear-gradient(90deg,rgba(7,10,8,.96) 40%,rgba(7,10,8,.55)),var(--img) center 30%/cover no-repeat}",
"[dir=rtl] .hce-coach{background:linear-gradient(270deg,rgba(7,10,8,.96) 40%,rgba(7,10,8,.55)),var(--img) center 30%/cover no-repeat}",
".hce .hce-coach .k{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin-bottom:10px}",
".hce-coach p{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:24px;line-height:1.35;color:var(--ivoire);max-width:640px}",
".hce-coach-flash{animation:hceFlash 1.6s ease}@keyframes hceFlash{0%,100%{box-shadow:none}30%{box-shadow:0 0 0 3px var(--champ)}}",
/* atelier en onglets */
".hce-tabs{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:24px -20px 0;padding:0 20px 2px}.hce-tabs::-webkit-scrollbar{display:none}",
".hce-tabs button{flex:0 0 auto;border:1px solid rgba(243,238,228,.2);border-radius:999px;background:none;padding:10px 16px;font-size:14px;color:var(--ivoire);white-space:nowrap}",
".hce-tabs button[aria-selected=true]{border-color:var(--champ);color:var(--champ);background:rgba(201,166,107,.08)}",
".hce-panel{display:grid;grid-template-columns:minmax(0,1fr);gap:22px;margin-top:22px;align-items:start}",
".hce-panel ul{margin:0;padding-inline-start:20px;display:grid;gap:8px;font-size:15px;line-height:1.55;color:var(--ivoire)}",
".hce-panel li::marker{color:var(--champ)}",
".hce-panel ul.x{list-style:none;padding-inline-start:0}.hce-panel ul.x li{position:relative;padding-inline-start:26px}",
".hce-panel ul.x li:before{content:'✕';position:absolute;inset-inline-start:0;color:var(--alerte);font-weight:700}",
".hce-panel .ap{margin-top:14px;padding-top:12px;border-top:1px solid rgba(201,166,107,.2);font-size:15px;line-height:1.65;color:var(--doux)}",
".hce-ret{margin:56px auto 0;max-width:860px;text-align:center}",
".hce .hce-ret .k{font-family:'Montserrat',sans-serif;font-style:normal;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ);margin-bottom:14px}",
".hce-ret p{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:28px;line-height:1.3;color:var(--ivoire)}",
".hce-ret:before,.hce-ret:after{content:'';display:block;width:40px;height:1px;background:var(--champ);margin:0 auto 22px}.hce-ret:after{margin:22px auto 0}",
/* entre chevaux */
".hce-pano{margin:22px -20px 0;position:relative;aspect-ratio:16/9;background:center 55%/cover no-repeat}",
".hce-pano:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,var(--noir2) 0%,rgba(11,17,19,0) 22%,rgba(11,17,19,0) 70%,var(--noir2) 100%)}",
".hce-cols{display:grid;grid-template-columns:minmax(0,1fr);gap:34px;margin-top:30px}",
".hce-col h3{font-size:25px;line-height:1.15;margin-bottom:8px}",
".hce-col .s{font-size:15px;line-height:1.6;color:var(--doux);margin-bottom:12px}",
".hce-col ul{margin:0 0 12px;padding-inline-start:20px;display:grid;gap:7px;font-size:15px;line-height:1.5;color:var(--ivoire)}.hce-col li::marker{color:var(--champ)}",
".hce-col .ap{font-size:14.5px;line-height:1.6;color:var(--doux);border-inline-start:2px solid rgba(201,166,107,.5);padding-inline-start:14px}",
".hce-sig{margin-top:44px;border:1px solid rgba(201,166,107,.28);border-radius:16px;padding:24px 20px;background:rgba(16,29,34,.35)}",
".hce .hce-sig .k{font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin:10px 0 6px}",
".hce-sig h3{font-size:27px;margin-bottom:6px}.hce-sig .s{font-size:15px;color:var(--doux);margin-bottom:16px}",
".hce-chips{display:flex;flex-wrap:wrap;gap:8px}",
".hce-chips span,.hce-chips button{border:1px solid rgba(217,150,124,.45);border-radius:999px;padding:8px 14px;font-size:14px;color:var(--ivoire);background:rgba(217,150,124,.06)}",
".hce-sig .ap{margin-top:18px;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:21px;line-height:1.4;color:var(--ivoire)}",
/* situations */
".hce-sits{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;margin-top:24px}",
".hce-sit{border:1px solid rgba(201,166,107,.26);border-radius:16px;padding:20px 18px;background:linear-gradient(180deg,#0E1514,#0A0E0D)}",
".hce-sit .nn{font-size:12px;font-weight:600;letter-spacing:.2em;color:var(--champ)}",
".hce-sit h3{font-size:24px;line-height:1.15;margin:6px 0 10px}",
".hce-sit p{font-size:15px;line-height:1.6;color:var(--doux);margin-bottom:8px}",
".hce-sit ul{margin:0 0 8px;padding-inline-start:20px;display:grid;gap:6px;font-size:15px;line-height:1.5;color:var(--ivoire)}.hce-sit li::marker{color:var(--champ)}",
".hce-sit .ap{border-top:1px solid rgba(201,166,107,.2);padding-top:10px;margin-top:6px;color:var(--ivoire)}",
".hce-or{margin-top:46px}",
".hce-or h3{font-size:30px;text-align:center;margin-bottom:22px}",
".hce-or ol{list-style:none;margin:0 auto;padding:0;max-width:980px;display:grid;grid-template-columns:minmax(0,1fr);gap:0 46px;counter-reset:o}",
".hce-or li{counter-increment:o;display:flex;gap:16px;align-items:baseline;padding:12px 0;border-top:1px solid rgba(201,166,107,.2);font-size:15.5px;line-height:1.5;color:var(--ivoire)}",
".hce-or li:before{content:counter(o,decimal-leading-zero);font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--champ);flex:0 0 28px}",
/* fin : savais-tu, erreurs, défi, citation, quiz */
".hce-fin1{display:grid;grid-template-columns:minmax(0,1fr);gap:34px;margin-top:26px}",
".hce .hce-sav .k{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--champ);margin-bottom:12px}",
".hce-sav p{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:24px;line-height:1.35;color:var(--ivoire)}",
".hce-sav p+p{margin-top:12px}",
".hce-err{border:1px solid rgba(217,150,124,.4);border-radius:16px;padding:20px 18px;background:#0C100F}",
".hce-err h3{font-size:24px;color:var(--alerte);margin-bottom:10px}",
".hce-err ul{list-style:none;margin:0;padding:0;display:grid;gap:0}",
".hce-err li{position:relative;padding:9px 0 9px 26px;border-top:1px solid rgba(217,150,124,.16);font-size:15px;line-height:1.45;color:var(--ivoire)}",
"[dir=rtl] .hce-err li{padding:9px 26px 9px 0}",
".hce-err li:first-child{border-top:0}",
".hce-err li:before{content:'✕';position:absolute;inset-inline-start:0;color:var(--alerte);font-weight:700}",
".hce-defi{margin-top:34px;border:1px solid rgba(201,166,107,.6);border-radius:16px;padding:22px 18px;background:#0C1213}",
".hce-defi .hd{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:6px}",
".hce-defi h3{font-size:27px;color:#D9B98A}",
".hce-defi .cpt{margin-inline-start:auto;font-size:13px;font-weight:600;color:var(--champ)}",
".hce-defi .s{font-size:15px;line-height:1.55;color:var(--doux);margin-bottom:4px}",
".hce-defi .aide{font-size:12.5px;color:var(--doux);opacity:.8;margin-bottom:12px}",
".hce-defi ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:8px}",
".hce-defi li button{display:flex;align-items:center;gap:12px;width:100%;text-align:start;border:1px solid rgba(243,238,228,.16);border-radius:12px;background:rgba(7,10,8,.4);padding:12px 14px;font-size:14.5px;line-height:1.4;color:var(--ivoire)}",
".hce-defi li .c{flex:0 0 24px;height:24px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--noir)}",
".hce-defi li button[aria-pressed=true]{border-color:rgba(201,166,107,.6)}.hce-defi li button[aria-pressed=true] .c{background:var(--champ)}",
".hce-citfin{position:relative;margin:44px -20px 0;min-height:300px;display:flex;align-items:center;justify-content:center;text-align:center;background:center 40%/cover no-repeat;padding:40px 24px}",
".hce-citfin:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,var(--noir2) 0%,rgba(7,10,8,.72) 30%,rgba(7,10,8,.72) 70%,var(--noir) 100%)}",
".hce-citfin blockquote{position:relative;margin:0;max-width:820px;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:28px;line-height:1.3;color:var(--ivoire)}",
".hce-citfin blockquote:before{content:'';display:block;width:40px;height:1px;background:var(--champ);margin:0 auto 20px}",
".hce-quiz{position:relative;margin-top:34px;border-radius:18px;overflow:hidden;border:1px solid rgba(201,166,107,.45);padding:26px 20px;background:linear-gradient(90deg,rgba(7,10,8,.95) 0%,rgba(7,10,8,.8) 50%,rgba(7,10,8,.3) 100%),var(--img) center 75%/cover no-repeat}",
"[dir=rtl] .hce-quiz{background:linear-gradient(270deg,rgba(7,10,8,.95) 0%,rgba(7,10,8,.8) 50%,rgba(7,10,8,.3) 100%),var(--img) center 75%/cover no-repeat}",
".hce-quiz h3{font-size:30px;margin-bottom:6px}.hce-quiz p{font-size:14.5px;line-height:1.5;color:var(--ivoire);opacity:.88;max-width:440px;margin-bottom:18px}",
".hce-btns{display:flex;flex-wrap:wrap;gap:10px}",
".hce-btn{display:inline-flex;align-items:center;gap:10px;border:1px solid var(--champ);border-radius:999px;background:rgba(7,10,8,.35);padding:12px 22px;font-size:14px;font-weight:600;color:var(--champ)}",
".hce-btn:hover{background:rgba(201,166,107,.1)}",
".hce-btn.disc{border-color:rgba(243,238,228,.3);color:var(--ivoire)}",
".hce-suiv{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;padding:22px 20px 8px;background:var(--noir)}",
".hce-pied{display:flex;justify-content:center;padding:18px 20px 10px}",
/* atlas */
".hce-atlas{display:grid;grid-template-columns:minmax(0,1fr);gap:22px;margin-top:22px}",
".hce-fig{position:relative;border-radius:16px;overflow:hidden;background:#0E1413}",
".hce-fig img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}",
".hce-fig:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.15),rgba(7,10,8,0) 30%,rgba(7,10,8,0) 75%,rgba(7,10,8,.35));pointer-events:none}",
".hce-hot{z-index:1}",
".hce-ztabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}",
".hce-ztabs button{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(243,238,228,.2);border-radius:999px;background:none;padding:8px 16px 8px 8px;font-size:14px;color:var(--ivoire)}",
"[dir=rtl] .hce-ztabs button{padding:8px 8px 8px 16px}",
".hce-ztabs .zn{width:26px;height:26px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--champ)}",
".hce-ztabs button.al .zn{border-color:var(--alerte);color:var(--alerte)}",
".hce-ztabs button[aria-selected=true]{border-color:var(--champ);background:rgba(201,166,107,.08)}.hce-ztabs button[aria-selected=true] .zn{background:var(--champ);color:var(--noir)}",
".hce-ztabs button.al[aria-selected=true]{border-color:var(--alerte)}.hce-ztabs button.al[aria-selected=true] .zn{background:var(--alerte);color:var(--noir)}",
".hce-zpanel{border-inline-start:2px solid var(--champ);padding:4px 0 4px 20px;min-height:96px}",
"[dir=rtl] .hce-zpanel{padding:4px 20px 4px 0}",
".hce-zpanel.al{border-color:var(--alerte)}.hce-zpanel.al h3{color:var(--alerte)}",
".hce-zpanel h3{font-size:26px;margin-bottom:8px}.hce-zpanel p{font-size:15.5px;line-height:1.7;color:var(--doux)}",
".hce-ed3{display:grid;grid-template-columns:minmax(0,1fr);gap:34px;margin-top:52px}",
/* fiches des bons gestes */
".hce-fiches{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;margin-top:30px}",
".hce-fiche.sans{border:1px solid rgba(201,166,107,.22);border-radius:18px;padding:22px 20px;background:linear-gradient(180deg,rgba(16,29,34,.5),rgba(7,10,8,.4))}",
".hce-fiche{display:grid;grid-template-columns:minmax(0,1fr);gap:20px;align-items:start}",
".hce-fiche .hce-photo{aspect-ratio:4/3}",
".hce-repere{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:18px;border:1px solid rgba(201,166,107,.35);background:linear-gradient(160deg,rgba(16,29,34,.9),rgba(7,10,8,.9));color:var(--champ)}",
".hce-fiche .nn{display:block;font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--champ);margin-bottom:2px}",
".hce-fiche h3{font-size:30px;line-height:1.1;margin-bottom:10px}",
".hce-fiche .s{font-size:15.5px;line-height:1.6;color:var(--doux);margin-bottom:12px}",
".hce-fiche ul{margin:0;padding-inline-start:20px;display:grid;gap:8px;font-size:15px;line-height:1.5;color:var(--ivoire)}.hce-fiche li::marker{color:var(--champ)}",
".hce-fiche ul.x{list-style:none;padding-inline-start:0}.hce-fiche ul.x li{position:relative;padding-inline-start:26px}",
".hce-fiche ul.x li:before{content:'✕';position:absolute;inset-inline-start:0;color:var(--alerte);font-weight:700}",
".hce-fiche .ap{margin-top:14px;padding-top:12px;border-top:1px solid rgba(201,166,107,.2);font-size:15px;line-height:1.65;color:var(--doux)}",
".hce-fiche .ret{margin-top:18px;font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:23px;line-height:1.35;color:var(--ivoire)}",
".hce-fiche .ret b{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin-bottom:6px}",
".hce-coches .cpt{font-size:13px;font-weight:600;color:var(--champ);margin-bottom:8px}",
".hce-coches ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}",
".hce-coches li button{display:flex;align-items:center;gap:12px;width:100%;text-align:start;border:1px solid rgba(243,238,228,.16);border-radius:12px;background:rgba(7,10,8,.4);padding:11px 14px;font-size:14.5px;line-height:1.4;color:var(--ivoire)}",
".hce-coches .c{flex:0 0 22px;height:22px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:12px;color:var(--noir)}",
".hce-coches button[aria-pressed=true]{border-color:rgba(201,166,107,.6)}.hce-coches button[aria-pressed=true] .c{background:var(--champ)}",
/* signaux */
".hce-sig .g{display:grid;grid-template-columns:minmax(0,1fr);gap:26px}",
".hce-sig .aide{font-size:13px;color:var(--doux);margin-bottom:12px}.hce-sig .aide b{color:var(--champ);font-weight:600}",
".hce-chips button{cursor:pointer}.hce-chips button[aria-pressed=true]{border-color:var(--alerte);background:rgba(217,150,124,.2)}",
".hce-sig .ap{transition:color .2s,border-color .2s;border-inline-start:2px solid transparent;padding-inline-start:16px;opacity:.75}",
".hce-sig .ap.on{border-color:var(--alerte);opacity:1}",
/* parcours */
".hce-parc{margin-top:26px}",
".hce-parc .pas{display:flex;gap:8px;margin-bottom:22px}",
".hce-parc .pas button{width:38px;height:38px;border-radius:50%;border:1px solid var(--champ);background:rgba(7,10,8,.6);color:var(--champ);font-size:14px;font-weight:600}",
".hce-parc .pas button[aria-selected=true]{background:var(--champ);color:var(--noir)}",
".hce-scene{position:relative;border:1px solid rgba(201,166,107,.3);border-radius:18px;padding:26px 22px;background:linear-gradient(90deg,rgba(9,13,14,.98) 0%,rgba(9,13,14,.95) 48%,rgba(9,13,14,.35) 100%),var(--img,none) right 30%/cover no-repeat;min-height:380px}",
"[dir=rtl] .hce-scene{background:linear-gradient(270deg,rgba(9,13,14,.98) 0%,rgba(9,13,14,.95) 48%,rgba(9,13,14,.35) 100%),var(--img,none) left 30%/cover no-repeat}",
".hce .hce-scene .k{font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin-bottom:10px}",
".hce-scene h3{font-size:32px;line-height:1.1;margin-bottom:12px;max-width:620px}",
".hce-scene .s{font-size:15.5px;line-height:1.6;color:var(--doux);margin-bottom:16px;max-width:620px}",
".hce-scene .rep{max-width:620px;display:grid;gap:12px}",
".hce-scene .rep ul{margin:0;padding-inline-start:20px;display:grid;gap:7px;font-size:15px;line-height:1.5;color:var(--ivoire)}.hce-scene li::marker{color:var(--champ)}",
".hce-scene .ap{border-top:1px solid rgba(201,166,107,.2);padding-top:10px;font-size:15px;line-height:1.6;color:var(--ivoire)}",
".hce-scene .nav{display:flex;gap:10px;margin-top:22px}.hce-btn:disabled{opacity:.35;cursor:default}",
/* chapitre immersif */
".hce-sec.t-photo{padding:0;background:var(--noir)}",
".hce-chp{position:relative;overflow:hidden;padding:56px 20px 64px;background:#070A08}",
".hce-chp>.bg{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat;filter:saturate(.85)}",
".hce-chp>.bg:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,.92) 40%,#070A08 100%)}",
".hce-chp>.in{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr);gap:30px;max-width:1240px;margin:0 auto}",
".hce-chp .kick{font-size:11.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ);margin:0 0 12px}",
".hce-chp h2{font-size:44px;line-height:1.02}",
".hce-chp .trait{display:block;width:48px;height:2px;background:var(--champ);margin:18px 0 16px}",
".hce .hce-chp .sous{font-size:15px;line-height:1.65;color:var(--doux);max-width:520px;margin:0}",
".hce-chp .por{list-style:none;margin:24px 0 0;padding:0;position:relative}",
".hce-chp .por li{position:relative}",
".hce-chp .por li:before{content:'';position:absolute;inset-inline-start:60px;top:0;bottom:0;width:1px;background:rgba(201,166,107,.45)}",
".hce-chp .por li:first-child:before{top:50%}.hce-chp .por li:last-child:before{bottom:50%}",
".hce-chp .por button{display:grid;grid-template-columns:40px 40px minmax(0,1fr);align-items:center;width:100%;text-align:start;background:none;border:0;padding:4px 0;color:var(--doux)}",
".hce-chp .por .rond{width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(201,166,107,.7);background:rgba(7,10,8,.7);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:600;color:var(--champ);box-shadow:0 8px 22px rgba(0,0,0,.45)}",
".hce-chp .por .pt{width:7px;height:7px;border-radius:50%;background:var(--champ);justify-self:center;position:relative;z-index:1}",
".hce-chp .por .tx{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:21px;font-weight:600;line-height:1.15;transition:color .2s}",
".hce-chp .por button:hover .tx{color:var(--ivoire)}",
".hce-chp .por button[aria-selected=true] .tx{color:var(--ivoire)}",
".hce-chp .por button[aria-selected=true] .rond{background:var(--champ);color:var(--noir);border-color:var(--champ)}",
".hce-chp .por button.al .rond{border-color:rgba(217,150,124,.8);color:var(--alerte)}.hce-chp .por button.al[aria-selected=true] .rond{background:var(--alerte);color:var(--noir)}",
".hce .hce-chp .note{margin:22px 0 0;font-size:13.5px;line-height:1.5;color:var(--champ);font-style:italic}",
".hce-chp .pan{position:relative;border:1px solid rgba(201,166,107,.42);border-radius:16px;background:rgba(9,12,11,.84);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 18px 50px rgba(0,0,0,.5);padding:22px 20px 18px;display:flex;flex-direction:column;gap:12px}",
".hce-chp .pan.al{border-color:rgba(217,150,124,.55)}",
".hce .hce-chp .pan .k{font-size:11px;font-weight:600;letter-spacing:.24em;color:var(--champ)}",
".hce-chp .pan h3{font-size:30px;line-height:1.08}.hce-chp .pan.al h3{color:var(--alerte)}",
".hce-chp .pimg{margin:2px 0 4px;border-radius:12px;overflow:hidden;aspect-ratio:2/1;background:#0E1413}.hce-chp .pimg img{display:block;width:100%;height:100%;object-fit:cover}",
".hce .hce-chp .pan .s{font-size:15px;line-height:1.6;color:var(--doux)}",
".hce-chp .pan ul{margin:0;padding-inline-start:20px;display:grid;gap:7px;font-size:15px;line-height:1.5;color:var(--ivoire)}.hce-chp .pan li::marker{color:var(--champ)}",
".hce-chp .pan ul.x{list-style:none;padding-inline-start:0}.hce-chp .pan ul.x li{position:relative;padding-inline-start:26px}",
".hce-chp .pan ul.x li:before{content:'✕';position:absolute;inset-inline-start:0;color:var(--alerte);font-weight:700}",
".hce .hce-chp .pan .ap{border-top:1px solid rgba(201,166,107,.2);padding-top:10px;font-size:14.5px;line-height:1.6;color:var(--doux)}",
".hce .hce-chp .pan .ret{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:22px;line-height:1.35;color:var(--ivoire)}",
".hce-chp .pan .ret b{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--champ);margin-bottom:6px}",
".hce .hce-chp .pan .qf{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-style:italic;font-size:24px;color:#D9B98A}",
".hce-chp .pan .rep{display:grid;gap:10px}",
".hce-chp .pan>.hce-btn{align-self:flex-start}",
".hce-chp .pan .nav{display:flex;justify-content:flex-end;gap:10px;margin-top:auto;padding-top:6px}",
".hce-chp .pan .nav .hce-rond{background:rgba(7,10,8,.5);cursor:pointer}.hce-chp .pan .nav .hce-rond:disabled{opacity:.3;cursor:default}",
".hce-chp .hce-coches li button{background:rgba(7,10,8,.5)}",
".hce-hot.off{opacity:.45;box-shadow:none}",
"@media (prefers-reduced-motion:reduce){.hce-mini,.hce-dep summary .pl{transition:none}.hce-coach-flash{animation:none}}",

/* ===== TÉLÉPHONE (conteneur < 700 px) : vraie mise en page mobile des chapitres ===== */
"@container hce (max-width:699px){",
".hce-chp{padding:0 0 44px}",
".hce-chp>.bg{bottom:auto;height:240px}",
".hce-chp>.bg:after{background:linear-gradient(180deg,rgba(7,10,8,.25) 0%,rgba(7,10,8,.2) 40%,rgba(7,10,8,.85) 78%,#070A08 100%)}",
".hce-chp>.in{gap:14px;padding:112px 16px 0}",
".hce-chp .kick{margin-bottom:6px}.hce-chp h2{font-size:32px;text-shadow:0 2px 18px rgba(0,0,0,.6)}",
".hce-chp .trait{margin:10px 0 10px}.hce .hce-chp .sous{font-size:14px}",
".hce-chp .por{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:16px;scrollbar-width:none;margin:18px -16px 0;padding:2px 16px 4px}",
".hce-chp .por::-webkit-scrollbar{display:none}",
".hce-chp .por li{flex:0 0 auto;scroll-snap-align:start}.hce-chp .por li:before{display:none}",
".hce-chp .por button{display:inline-flex;gap:10px;width:auto;border:1px solid rgba(243,238,228,.2);border-radius:999px;background:rgba(7,10,8,.6);padding:5px 16px 5px 5px;white-space:nowrap}",
"[dir=rtl] .hce-chp .por button{padding:5px 5px 5px 16px}",
".hce-chp .por .rond{width:30px;height:30px;font-size:16px;box-shadow:none}.hce-chp .por .pt{display:none}",
".hce-chp .por .tx{font-family:'Montserrat',sans-serif;font-size:13.5px;font-weight:500}",
".hce-chp .por button[aria-selected=true]{border-color:var(--champ)}",
".hce .hce-chp .note{margin:12px 0 0;font-size:13px}",
".hce-chp .pan{padding:16px 14px 12px;border-radius:14px;gap:10px}.hce-chp .pan .hce-txt,.hce-chp .pan ul{font-size:14.5px;line-height:1.6}",
".hce-chp .pan h3{font-size:22px}",
".hce-chp .pimg{aspect-ratio:2/1}",
".hce-chp .pan .nav .hce-rond{width:36px;height:36px}",
"}",
/* ===== TABLETTE (conteneur >= 700 px) ===== */
"@container hce (min-width:700px){",
".hce-hero .ph{height:380px}.hce-hero .txt{padding:0 32px;margin-top:-60px}.hce-hero h1{font-size:52px}",
".hce-bar{inset-inline:28px;top:20px}.hce-crumb{display:inline-flex}",
".hce-enc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:visible;padding:6px 28px 20px}",
".hce-card{flex:none;min-height:150px}.hce-card h3{max-width:none}.hce-card p{max-width:78%}",
".hce-menu ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:visible;padding:0 28px}",
".hce-menu li{flex:none}.hce-chap{height:112px}",
".hce-sec{padding:64px 32px 70px}",
".hce-s1{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.hce-s1 .hce-cit{grid-column:1/-1}",
".hce-band{grid-template-columns:repeat(3,minmax(0,1fr))}.hce-band.deux{grid-template-columns:repeat(2,minmax(0,1fr))}.hce-band>div+div{border-top:0;border-inline-start:1px solid rgba(201,166,107,.18)}",
".hce-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;overflow:visible;margin:0;padding:0}.hce-step{flex:none}",
".hce-duo{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px}",
".hce-zones{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:36px}",
".hce-ed{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:56px}",
".hce-tabs{margin:26px 0 0;padding:0}",
".hce-panel{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px}",
".hce-pano{margin:28px -32px 0;aspect-ratio:3/1}",
".hce-cols{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}",
".hce-sits{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}",
".hce-or ol{grid-template-columns:repeat(2,minmax(0,1fr))}",
".hce-fin1{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}",
".hce-defi ul{grid-template-columns:repeat(2,minmax(0,1fr))}",
".hce-citfin{margin:56px -32px 0;min-height:380px}.hce-citfin blockquote{font-size:36px}",
".hce-quiz{padding:34px 34px}",
".hce-chp{padding:72px 32px 80px}.hce-chp h2{font-size:52px}",

".hce-atlas{grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:36px;align-items:center}",
".hce-ed3{grid-template-columns:repeat(3,minmax(0,1fr));gap:44px}",
".hce-fiches{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}",
".hce-fiche.sans{padding:28px 28px;align-content:start}",
".hce-fiche:not(.sans){grid-column:1/-1;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:center;margin-top:30px}",
".hce-sig .g{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:44px}",
".hce-scene{padding:34px 36px}",

"}",
/* ===== ORDINATEUR (conteneur >= 1080 px) : encarts à droite du haut de page, section 01 en 3 colonnes ===== */
"@container hce (min-width:1040px){",
".hce-top{grid-template-columns:minmax(0,1fr) 340px;min-height:430px}",
".hce-hero{padding:0;display:flex;align-items:flex-end;min-height:430px;grid-column:1/-1;grid-row:1}",
".hce-hero .ph{position:absolute;inset:0;inset-inline-end:340px;height:auto;background-position:70% 30%}",
".hce-hero:before{content:'';position:absolute;inset:0;inset-inline-start:auto;width:340px;background:#070A08}",
".hce-hero .ph:after{background:linear-gradient(270deg,rgba(7,10,8,0) 66%,#070A08 100%),linear-gradient(90deg,#070A08 0%,rgba(7,10,8,.92) 26%,rgba(7,10,8,.35) 52%,rgba(7,10,8,.08) 72%),linear-gradient(180deg,rgba(7,10,8,.35) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 72%,#070A08 100%)}",
"[dir=rtl] .hce-hero .ph:after{background:linear-gradient(90deg,rgba(7,10,8,0) 66%,#070A08 100%),linear-gradient(270deg,#070A08 0%,rgba(7,10,8,.92) 26%,rgba(7,10,8,.35) 52%,rgba(7,10,8,.08) 72%),linear-gradient(180deg,rgba(7,10,8,.35) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 72%,#070A08 100%)}",
"[dir=rtl] .hce-hero .ph{transform:scaleX(-1)}",
".hce-hero .txt{margin:0;padding:0 40px 54px;max-width:640px}",
".hce-hero h1{font-size:clamp(56px,5.2cqw,76px)}",
".hce-bar{inset-inline:40px;top:26px}",
".hce-lang{position:absolute;inset-inline-end:380px}",
".hce-enc{grid-column:2;grid-row:1;position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:repeat(3,minmax(0,1fr));gap:12px;padding:24px 24px 24px 0;align-self:stretch}",
"[dir=rtl] .hce-enc{padding:26px 0 24px 24px}",
".hce-card{min-height:0;background:rgba(9,12,11,.86);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
".hce-card h3{font-size:23px;max-width:66%}.hce-card p{max-width:66%;font-size:12.5px}",
".hce-menu{padding:6px 0 26px}.hce-menu ol{grid-template-columns:repeat(var(--n),minmax(0,1fr));padding:0 40px;gap:14px}.hce-chap{height:118px}.hce-chap .n{font-size:36px}.hce-chap .lb{font-size:20px}",
".hce-mini{padding-inline:40px}",
".hce-sec{padding:72px 48px 84px}",
".hce-s1{grid-template-columns:minmax(0,1fr) minmax(0,1.15fr) minmax(0,.72fr);gap:44px}",
".hce-s1 .hce-cit{grid-column:auto;padding-top:40px}",
".hce-head h2{font-size:48px}.hce-num{font-size:52px}",
".hce-step h3{font-size:26px}",
".hce-sits{grid-template-columns:repeat(4,minmax(0,1fr))}",
".hce-defi ul{grid-template-columns:repeat(3,minmax(0,1fr))}",
".hce-pano{margin:30px -48px 0}",
".hce-citfin{margin:64px -48px 0}",
".hce-chp{padding:44px 48px 52px}",
".hce-chp>.bg{inset-inline-start:30%}",
".hce-chp>.bg:after{background:linear-gradient(90deg,#070A08 0%,rgba(7,10,8,.88) 22%,rgba(7,10,8,.35) 55%,rgba(7,10,8,.25) 100%),linear-gradient(180deg,#070A08 0%,rgba(7,10,8,0) 20%,rgba(7,10,8,0) 78%,#070A08 100%)}",
"[dir=rtl] .hce-chp>.bg{transform:scaleX(-1)}",
".hce-chp>.in{grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:64px;align-items:start;width:100%}",
".hce-chp .g{padding-top:18px}",
".hce-chp h2{font-size:clamp(46px,3.9cqw,58px)}",
".hce-chp .pan{padding:24px 26px 18px;min-height:360px}.hce-chp .pan h3{font-size:27px}.hce-chp .pimg{aspect-ratio:21/9}",

"}"
].join("\n");

/* ---------------- icônes ---------------- */
function ico(paths, w) { return h("svg", { width: w || 18, height: w || 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, paths.map(function (d, i) { return h("path", { key: i, d: d }); })); }
var ICO = {
  horloge: function (w) { return ico(["M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z", "M12 7.5V12l3 2"], w); },
  livre: function (w) { return ico(["M3 5.5c2.5-1 5.5-1 9 1 3.5-2 6.5-2 9-1v13c-2.5-1-5.5-1-9 1-3.5-2-6.5-2-9-1z", "M12 6.5v13"], w); },
  toque: function (w) { return ico(["M2 9l10-5 10 5-10 5z", "M6 11v5c3 2 9 2 12 0v-5", "M22 9v5"], w); },
  oeil: function (w) { return ico(["M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"], w); },
  coeur: function (w) { return ico(["M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"], w); },
  alerte: function (w) { return ico(["M12 3.5l9.5 16.5h-19z", "M12 10v4.5", "M12 17.3v.2"], w); },
  casque: function (w) { return ico(["M4 16a8 8 0 0 1 16 0", "M4 16h17l-2 2.5", "M12 8v4", "M8.5 9.5l1.5 2.5", "M15.5 9.5l-1.5 2.5"], w); },
  porte: function (w) { return ico(["M5 21V4h11v17", "M16 6l3 1v13l-3 1", "M13 12.5v.5", "M3 21h18"], w); },
  boite: function (w) { return ico(["M3 9l9-4 9 4-9 4z", "M3 9v7l9 4 9-4V9", "M12 13v7"], w); },
  corde: function (w) { return ico(["M4 6c3-2 6 2 9 0s5-2 7 0", "M4 6c0 4 3 5 6 5s6 1 6 5-3 5-6 5", "M10 21h4"], w); },
  image: function (w) { return ico(["M4 5h16v14H4z", "M4 16l5-5 4 4 3-3 4 4", "M15.5 9a1.2 1.2 0 1 1 0 .1"], w); }
};
function fleche(rtl, w) { return ico(rtl ? ["M19 12H5", "M11 6l-6 6 6 6"] : ["M5 12h14", "M13 6l6 6-6 6"], w || 16); }

function Vague(p) {
  return h("svg", { className: "hce-vague", viewBox: "0 0 1440 28", preserveAspectRatio: "none", "aria-hidden": true, style: { background: p.de } },
    h("path", { d: "M0 14 C 240 2, 480 26, 720 14 S 1200 2, 1440 14 L1440 28 L0 28 Z", fill: p.vers }),
    h("path", { d: "M0 14 C 240 2, 480 26, 720 14 S 1200 2, 1440 14", fill: "none", stroke: "#C9A66B", strokeOpacity: 0.55, strokeWidth: 1.1 }));
}
function Visuel(p) {
  return h("div", { className: "hce-vis " + (p.ratio || "r43"), role: "img", "aria-label": p.L("visuel") }, ICO.image(26), p.L("visuel"));
}
function Photo(p) {
  if (!p.src) return h(Visuel, { L: p.L, ratio: p.ratio });
  return h("figure", { className: "hce-photo " + (p.ratio || "r43") }, h("img", { src: p.src, alt: "", loading: "lazy", style: p.pos ? { objectPosition: p.pos } : undefined }));
}
/* texte replié sur 3 lignes, avec « Lire la suite » */
function Repli(p) {
  var _o = useState(false), ouvert = _o[0], setOuvert = _o[1];
  var long = String(p.texte || "").length > (p.seuil || 150);
  return h("div", null,
    h("p", { className: long && !ouvert ? "hce-clamp" : undefined }, p.texte),
    long ? h("button", { type: "button", className: "hce-more", "aria-expanded": ouvert ? "true" : "false", onClick: function () { setOuvert(!ouvert); } }, p.L(ouvert ? "reduire" : "lire")) : null);
}
function Dep(p) {
  return h("details", { className: "hce-dep" }, h("summary", null, p.titre, h("span", { className: "pl", "aria-hidden": true }, "+")), h("div", { className: "ct" }, p.enfants));
}
function Txt(p) { return h("div", { className: "hce-txt" }, paras(p.texte).map(function (t, i) { return h("p", { key: i }, t); })); }
function Liste(p) {
  if (!p.puces || !p.puces.length) return null;
  return h("ul", { className: p.x ? "x" : undefined }, p.puces.map(function (x, i) { return h("li", { key: i }, x.gras ? h("strong", null, x.gras + " ") : null, x.texte); }));
}
function Head(p) {
  return h("header", null,
    h("div", { className: "hce-head" }, h("span", { className: "hce-num" }, p.num), h("h2", null, p.titre)),
    p.sous ? h("p", { className: "hce-sous" }, p.sous) : null);
}

/* ---------------- modules de section ---------------- */
/* Atlas : photo de profil + repères numérotés (positions en % de la photo, jamais retournée, même en arabe) + légende accessible */
function Atlas(p) {
  var _z = useState(0), z = _z[0], setZ = _z[1];
  var L = p.L, it = p.items[z];
  return h("div", { className: "hce-atlas" },
    h("div", { className: "hce-fig", style: { aspectRatio: p.ratio } },
      h("img", { src: p.img, alt: p.alt || "", loading: "lazy" }),
      p.items.map(function (x, i) {
        return h("button", { key: i, type: "button", className: "hce-hot" + (x.alerte ? " al" : ""), "aria-pressed": z === i ? "true" : "false", "aria-label": (i + 1) + " — " + x.titre,
          style: { left: x.x + "%", top: x.y + "%" }, onClick: function () { setZ(i); } }, String(i + 1));
      })),
    h("div", { className: "hce-zl" },
      h("p", { className: "aide" }, L("zoneAide")),
      h("div", { className: "hce-ztabs", role: "tablist" }, p.items.map(function (x, i) {
        return h("button", { key: i, type: "button", role: "tab", className: x.alerte ? "al" : undefined, "aria-selected": z === i ? "true" : "false", onClick: function () { setZ(i); } },
          h("span", { className: "zn" }, String(i + 1)), x.titre);
      })),
      h("div", { className: "hce-zpanel" + (it.alerte ? " al" : ""), role: "tabpanel", "aria-live": "polite" },
        h("h3", null, it.titre), h("p", null, it.texte))));
}
/* Liste à cocher (micro-interaction) */
function Coches(p) {
  var _c = useState(function () { return p.items.map(function () { return false; }); }), c = _c[0], setC = _c[1];
  var nb = c.filter(Boolean).length;
  return h("div", { className: "hce-coches" },
    h("p", { className: "cpt", "aria-live": "polite" }, p.L("reussis").replace("{n}", nb).replace("{t}", p.items.length)),
    h("ul", null, p.items.map(function (x, i) {
      return h("li", { key: i }, h("button", { type: "button", "aria-pressed": c[i] ? "true" : "false", onClick: function () { setC(function (a) { var n = a.slice(); n[i] = !n[i]; return n; }); } },
        h("span", { className: "c", "aria-hidden": true }, c[i] ? "✓" : ""), h("span", null, x)));
    })));
}
/* Fiche geste : visuel (photo réelle ou repère sobre) + texte complet */
function Fiche(p) {
  var f = p.f;
  return h("article", { className: "hce-fiche" + (p.inv ? " inv" : "") + (f.img ? "" : " sans") },
    f.img ? h("figure", { className: "hce-photo" }, h("img", { src: f.img, alt: "", loading: "lazy", style: f.pos ? { objectPosition: f.pos } : undefined }))
      : h("div", { className: "hce-repere", "aria-hidden": true }, f.ico ? f.ico(54) : null),
    h("div", { className: "tx" },
      h("span", { className: "nn" }, p.n),
      h("h3", null, f.titre),
      f.sous ? h("p", { className: "s" }, f.sous) : null,
      f.texte ? h(Txt, { texte: f.texte }) : null,
      f.coches ? h(Coches, { items: f.coches, L: p.L }) : null,
      f.puces && f.puces.length ? h("ul", { className: f.x ? "x" : undefined }, f.puces.map(function (x, i) { return h("li", { key: i }, x.texte); })) : null,
      f.apres ? h("p", { className: "ap" }, f.apres) : null,
      f.retenir ? h("p", { className: "ret" }, h("b", null, f.retenir.titre), f.retenir.texte) : null));
}
/* Signaux : on touche les signes remarqués ; à partir de deux, le message du cours s'éclaire */
function Signaux(p) {
  var _s = useState(function () { return p.items.map(function () { return false; }); }), s = _s[0], setS = _s[1];
  var nb = s.filter(Boolean).length;
  return h("div", null,
    h("p", { className: "aide" }, p.L("signesAide"), h("b", null, "  ·  " + p.L("signesN").replace("{n}", nb))),
    h("div", { className: "hce-chips" }, p.items.map(function (x, i) {
      return h("button", { key: i, type: "button", "aria-pressed": s[i] ? "true" : "false", onClick: function () { setS(function (a) { var n = a.slice(); n[i] = !n[i]; return n; }); } }, x);
    })),
    h("p", { className: "ap" + (nb >= 2 ? " on" : ""), "aria-live": "polite" }, p.conclusion));
}
/* Parcours « Que ferais-tu ? » : une situation à la fois, la réponse du cours se dévoile */
function Parcours(p) {
  var _i = useState(0), i = _i[0], setI = _i[1];
  var _v = useState(false), vu = _v[0], setVu = _v[1];
  var L = p.L, it = p.items[i], rtl = p.rtl;
  var aller = function (k) { setI(k); setVu(false); };
  return h("div", { className: "hce-parc" },
    h("div", { className: "hce-scene", style: p.img ? { "--img": "url(" + p.img + ")" } : undefined },
      h("div", { className: "pas", role: "tablist" }, p.items.map(function (x, k) {
        return h("button", { key: k, type: "button", role: "tab", "aria-selected": k === i ? "true" : "false", "aria-label": L("situationN").replace("{n}", k + 1) + " — " + x.titre, onClick: function () { aller(k); } }, String(k + 1));
      })),
      h("p", { className: "k" }, L("situationN").replace("{n}", i + 1) + "  ·  " + L("queFerais")),
      h("h3", null, it.titre),
      it.sous ? h("p", { className: "s" }, it.sous) : null,
      !vu ? h("button", { type: "button", className: "hce-btn", "aria-expanded": "false", onClick: function () { setVu(true); } }, L("voirReflexes"), fleche(rtl, 15))
        : h("div", { className: "rep", "aria-live": "polite" },
          it.texte ? h(Txt, { texte: it.texte }) : null,
          it.puces && it.puces.length ? h("ul", null, it.puces.map(function (x, k) { return h("li", { key: k }, x); })) : null,
          it.apres ? h("p", { className: "ap" }, it.apres) : null),
      h("div", { className: "nav" },
        h("button", { type: "button", className: "hce-btn disc", disabled: i === 0, onClick: function () { aller(i - 1); } }, L("prec")),
        h("button", { type: "button", className: "hce-btn disc", disabled: i === p.items.length - 1, onClick: function () { aller(i + 1); } }, L("suiv")))));
}

/* Chapitre immersif (même vocabulaire que le haut de page et la page de fin) :
   grande photo en fond, à gauche numéro + titre + filet + liste des notions reliées par un filet,
   à droite une carte vitrée qui montre la notion choisie (texte complet + interaction), flèches précédent / suivant. */
function Chapitre(p) {
  var _i = useState(0), i = _i[0], setI = _i[1];
  var L = p.L, rtl = p.rtl, it = p.items[i], n = p.items.length;
  var olRef = useRef(null);
  useEffect(function () {
    var ol = olRef.current; if (!ol || ol.scrollWidth <= ol.clientWidth + 2) return;
    var b = ol.querySelectorAll("button")[i]; if (!b) return;
    try { ol.scrollTo({ left: b.parentNode.offsetLeft - 16, behavior: "smooth" }); } catch (e) { }
  }, [i]);
  return h("div", { className: "hce-chp" },
    h("div", { className: "bg", "aria-hidden": true, style: { backgroundImage: "url(" + p.bg + ")", backgroundPosition: p.bgPos || "70% 40%" } }),
    h("div", { className: "in" },
      h("div", { className: "g" },
        h("p", { className: "kick" }, p.num + "  ·  " + p.galop),
        h("h2", { id: "hce-t-" + p.id }, p.titre),
        h("span", { className: "trait", "aria-hidden": true }),
        p.sous ? h("p", { className: "sous" }, p.sous) : null,
        h("ol", { className: "por", ref: olRef, role: "tablist", "aria-label": p.titre }, p.items.map(function (x, k) {
          return h("li", { key: k }, h("button", { type: "button", role: "tab", "aria-selected": k === i ? "true" : "false", className: x.alerte ? "al" : undefined, onClick: function () { setI(k); } },
            h("span", { className: "rond" }, String(k + 1)), h("span", { className: "pt", "aria-hidden": true }), h("span", { className: "tx" }, x.titre)));
        })),
        p.note ? h("p", { className: "note" }, p.note) : null),
      h("div", { className: "pan" + (it.alerte ? " al" : ""), role: "tabpanel", "aria-live": "polite" },
        h("p", { className: "k" }, (i + 1) + " / " + n),
        h("h3", null, it.titre),
        it.rendu(),
        h("div", { className: "nav" },
          h("button", { type: "button", className: "hce-rond", disabled: i === 0, "aria-label": L("prec"), onClick: function () { setI(i - 1); } }, fleche(!rtl, 16)),
          h("button", { type: "button", className: "hce-rond", disabled: i === n - 1, "aria-label": L("suiv"), onClick: function () { setI(i + 1); } }, fleche(rtl, 16))))));
}
/* petit atlas dans la carte : la photo du cheval de profil, le repère de la zone choisie mis en avant */
function AtlasMini(p) {
  return h("div", { className: "hce-fig", style: { aspectRatio: p.ratio, marginBottom: 16 } },
    h("img", { src: p.img, alt: "", loading: "lazy" }),
    p.pos.map(function (x, k) {
      return h("button", { key: k, type: "button", tabIndex: -1, "aria-hidden": true, className: "hce-hot" + (k === 3 ? " al" : "") + (k === p.z ? "" : " off"), "aria-pressed": k === p.z ? "true" : "false", style: { left: x.x + "%", top: x.y + "%" }, onClick: function () { if (p.choisir) p.choisir(k); } }, String(k + 1));
    }));
}
/* révélation « Voir les bons réflexes » (remise à zéro quand on change de situation grâce à la clé) */
function Reveler(p) {
  var _v = useState(false), vu = _v[0], setVu = _v[1];
  if (!vu) return h("button", { type: "button", className: "hce-btn", style: { marginTop: 6 }, onClick: function () { setVu(true); } }, p.L("voirReflexes"), fleche(p.rtl, 15));
  return h("div", { className: "rep" }, p.enfants);
}

/* ---------------- composant principal ---------------- */
function HypeCoursEditorial(props) {
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var L = Lx(lg);
  var cfg = HypeCoursEditorial.config[cours.id](cours, lg, outils());
  var _a = useState(0), actif = _a[0], setActif = _a[1];
  var _b = useState(false), mini = _b[0], setMini = _b[1];
  var _f = useState(false), coachFlash = _f[0], setCoachFlash = _f[1];
  var _v = useState("cours"), vue = _v[0], setVue = _v[1];
  var menuRef = useRef(null);
  var FIN = (window.HypeFinsCours && window.HypeFinsCours[cours.id] && window.HypeFinsCours[cours.id].ok()) ? window.HypeFinsCours[cours.id] : null;

  useEffect(function () {
    var on = function () { var el = menuRef.current; if (el) setMini(el.getBoundingClientRect().bottom < 0); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return function () { window.removeEventListener("scroll", on); };
  }, [vue]);
  /* le menu défilant (téléphone) montre toujours la carte du chapitre en cours */
  useEffect(function () {
    var ol = menuRef.current && menuRef.current.querySelector("ol"); if (!ol || ol.scrollWidth <= ol.clientWidth + 2) return;
    var li = ol.children[actif]; if (!li) return;
    try { ol.scrollTo({ left: li.offsetLeft - 16, behavior: "smooth" }); } catch (e) { }
  }, [actif]);
  var choisir = function (i) {
    setActif(i);
    setTimeout(function () { var el = menuRef.current; if (el && el.getBoundingClientRect().top < 0 && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30);
  };
  var allerA = function (id) { var el = document.getElementById(id.indexOf("hce-") === 0 ? id : "hce-" + id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: cfg.hero.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    if (props.setEcran) props.setEcran("assistant");
  };
  var haut = function () { try { window.scrollTo(0, 0); } catch (e) { } };
  /* valider = false : on ouvre la page de fin sans compter le cours comme terminé (raccourci « Le défi du cavalier » du haut) */
  var versFin = function (valider) {
    if (!FIN) { if (valider !== false && props.onTerminer) props.onTerminer(); return; }
    setVue("fin"); setTimeout(haut, 30); if (valider !== false && props.onValider) props.onValider();
  };
  if (vue === "fin" && FIN) return h(FIN.Fin, Object.assign({}, props, { onRetourCours: function () { setVue("cours"); setTimeout(haut, 60); } }));

  var Selecteur = props.Selecteur, hero = cfg.hero, enc = cfg.encarts, tit = deuxLignes(hero.titre);
  var NOIR = "#070A08", NOIR2 = "#0B1113";
  var fond = function (ton) { return ton === "ombre" ? NOIR2 : NOIR; };
  var ctx = { L: L, rtl: rtl, hey: hey, versFin: versFin, allerA: allerA, onQuiz: props.onQuiz, onRetour: props.onRetour, coursId: cours.id, coachFlash: coachFlash, FIN: FIN };

  /* 31/10 14h20 (Blandine : « ça doit tenir en deux ou trois pages ») : UN chapitre affiché à la fois.
     Les cartes du menu changent de chapitre ; en bas, « Chapitre suivant », et après le dernier la transition vers la fin. */
  var chs = cfg.sections.filter(function (s) { return cfg.chapitres.some(function (c) { return c.id === s.id; }); });
  var autres = cfg.sections.filter(function (s) { return chs.indexOf(s) < 0; });
  var cur = chs[Math.min(actif, chs.length - 1)] || chs[0];
  var dernier = actif >= chs.length - 1;
  var corps = [
    h(Vague, { key: "v0", de: NOIR, vers: fond(cur.ton) }),
    h("section", { key: cur.id, id: "hce-" + cur.id, "data-i": actif, className: "hce-sec t-" + cur.ton, "aria-labelledby": "hce-t-" + cur.id },
      cur.ton === "photo" ? cur.rendu(ctx) : h("div", { className: "hce-in" }, cur.rendu(ctx)))
  ];
  if (!dernier) corps.push(h("div", { key: "suiv", className: "hce-suiv" },
    h("button", { type: "button", className: "hce-btn", onClick: function () { choisir(actif + 1); } },
      L("chapSuiv") + "  ·  " + cfg.chapitres[actif + 1].label, fleche(rtl, 15)),
    h("button", { type: "button", className: "hce-btn disc", onClick: props.onRetour }, L("retourGalop"))));
  else autres.forEach(function (s) {
    corps.push(h("section", { key: s.id, id: "hce-" + s.id, className: "hce-sec t-" + s.ton, style: { paddingTop: 8, paddingBottom: 8 } }, h("div", { className: "hce-in" }, s.rendu(ctx))));
  });

  return h("div", { className: "hce", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, CSS),
    /* HAUT DE PAGE + 3 ENCARTS */
    h("div", { className: "hce-top" },
      h("header", { className: "hce-hero" },
        h("div", { className: "ph", style: { backgroundImage: "url(" + hero.img + ")", backgroundPosition: hero.pos || undefined } }),
        h("div", { className: "hce-bar" },
          h("button", { type: "button", className: "hce-back", "aria-label": L("retour"), onClick: props.onRetour }, fleche(!rtl, 18)),
          h("nav", { className: "hce-crumb", "aria-label": "Fil d'Ariane" }, h("span", null, hero.galop), h("i", { "aria-hidden": true }, rtl ? "‹" : "›"), h("span", null, hero.titre)),
          Selecteur ? h("span", { className: "hce-lang" }, h(Selecteur, { compact: true })) : null),
        h("div", { className: "txt" },
          h("p", { className: "hce-kick" }, hero.galop),
          h("h1", { id: "hce-titre" }, h("span", null, tit[0]), tit[1] ? h("span", null, tit[1]) : null),
          h("div", { className: "hce-meta" },
            hero.duree ? h("span", null, ICO.horloge(19), hero.duree) : null,
            hero.type ? h("span", null, ICO.livre(19), hero.type.charAt(0).toUpperCase() + hero.type.slice(1)) : null,
            h("span", null, ICO.toque(19), hero.galop)))),
      h("div", { className: "hce-enc" },
        enc.coach ? h("aside", { className: "hce-card coach" },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.coach.img + ")", backgroundPosition: enc.coach.pos || "center" } }),
          h("h3", null, enc.coach.titre), h("p", null, enc.coach.texte)) : null,
        enc.hb ? h("button", { type: "button", className: "hce-card hb", onClick: function () { hey(""); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.hb.img + ")", backgroundPosition: enc.hb.pos || "center" } }),
          h("h3", null, L("heyBaby")), h("p", null, enc.hb.texte), h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null,
        enc.defi ? h("button", { type: "button", className: "hce-card defi", onClick: function () { versFin(false); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.defi.img + ")", backgroundPosition: enc.defi.pos || "center" } }),
          h("h3", null, enc.defi.titre), enc.defi.texte ? h("p", null, enc.defi.texte) : null, h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null)),
    h(Vague, { de: NOIR, vers: NOIR }),
    /* MENU DES CHAPITRES */
    h("nav", { className: "hce-menu", ref: menuRef, "aria-label": L("mTitre") },
      h("ol", { style: { "--n": cfg.chapitres.length + (cfg.revision ? 1 : 0) } }, cfg.chapitres.map(function (c, i) {
        return h("li", { key: c.id }, h("button", { type: "button", className: "hce-chap", "aria-current": actif === i ? "true" : undefined, onClick: function () { choisir(i); } },
          h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + c.img + ")", backgroundPosition: c.pos || "center" } }),
          h("span", { className: "n" }, (i < 9 ? "0" : "") + (i + 1)),
          h("span", { className: "lb" }, c.label),
          h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 14))));
      }).concat(cfg.revision ? [h("li", { key: "rev" }, h("button", { type: "button", className: "hce-chap rev", onClick: function () { versFin(true); } },
          h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + cfg.revision.img + ")", backgroundPosition: cfg.revision.pos || "center" } }),
          h("span", { className: "n" }, (cfg.chapitres.length < 9 ? "0" : "") + (cfg.chapitres.length + 1)),
          h("span", { className: "lb" }, cfg.revision.label),
          h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 14))))] : []))),
    h("div", { className: "hce-minih" },
      h("div", { className: "hce-mini" + (mini ? " on" : ""), "aria-hidden": mini ? undefined : true },
        cfg.chapitres.map(function (c, i) {
          return h("button", { key: c.id, type: "button", tabIndex: mini ? 0 : -1, "aria-current": actif === i ? "true" : undefined, onClick: function () { choisir(i); } },
            h("b", null, (i < 9 ? "0" : "") + (i + 1)), c.label);
        }))),
    corps,
    dernier ? h("div", { className: "hce-pied" }, h("button", { type: "button", className: "hce-btn disc", onClick: props.onRetour }, L("retourGalop"), fleche(rtl, 15))) : null);
}
function outils() { return { pickLg: pickLg, contenuLg: contenuLg, nettoyerTitre: nettoyerTitre, sansNum: sansNum, paras: paras, phrases: phrases }; }

/* ---------------- garde ---------------- */
HypeCoursEditorial.config = {};
HypeCoursEditorial.ok = function (cours) {
  try {
    if (!cours || !HypeCoursEditorial.config[cours.id]) return false;
    var c = HypeCoursEditorial.config[cours.id](cours, "fr", outils());
    return !!(c && c.valide !== false && c.sections && c.sections.length && c.chapitres && c.chapitres.length);
  } catch (e) { return false; }
};
HypeCoursEditorial.version = VERSION;
HypeCoursEditorial.T = T;
HypeCoursEditorial.Lx = Lx;

/* =====================================================================================
   COURS PILOTE : Galop 1 — « La sécurité avant tout » (g1-c15) — v3 d'après le brief du 31/10 (13h52)
   Contenu : 100 % repris du cours (blocs 1 à 7, 14 langues), chaque notion expliquée à UN seul endroit :
   - 01 Approcher : intro, photo, citation Buck Brannaman (sourcée : documentaire « Buck », 2011) ; repères :
     le savais-tu / à ressentir / à éviter ; les 3 temps (avant d'approcher, s'annoncer, l'épaule) en texte complet.
   - 02 Autour du cheval : atlas sur photo de profil (cheval bai sans cavalier), ce que le cheval voit,
     se déplacer, garder une issue.
   - 03 Les bons gestes : 5 fiches (tenue, portes, matériel au sol, longe + à retenir, près des membres).
   - 04 Entre chevaux : distances, nourriture, puis les signaux (à observer + signes à toucher).
   - 05 En cas de problème : parcours « que ferais-tu ? » (4 situations).
   - Page de fin (partagée) : les 10 règles d'or réparties par chapitre, citation de fin du cours, Hey Baby (5 questions),
     défi du cavalier, quiz de l'appli. Pas de quiz dans le corps du cours.
   Retirés (doublons) : objectifs, synthèse en 10 secondes, les 13 erreurs à éviter (chacune est déjà dans son chapitre).
   « [SUITE ATTENDUE] » du point 11 corrigé (phrase coupée dans les 14 langues).
   ===================================================================================== */
var IM = {
  hero: "images/sante-hero-defaut.webp",
  coach: "images/galops-v2-carte-exercices-hd1.jpg",
  hb: "images/FOND_HEYBABY.webp",
  defi: "images/mes-chevaux-fond-couchant.webp",
  approche: "images/cours-pansage-03_observer_approcher.webp",
  atlas: "images/robes-g3-parties-du-corps.webp",
  membres: "images/galop5-c05-soins.webp",
  groupe: "images/FOND_CAVALIERS_ECURIE.webp",
  oeil: "images/connexion-cheval-oeil-hd.jpg",
  quiz: "images/galops-v2-carte-cours-hd1.jpg",
  fin: "images/securite-g1-fin-noir.webp",
  fond02: "images/securite-g1-alezan.webp"
};
/* photos du cours sécurité fournies par Blandine le 31/10 (planche de 12 découpée) */
var IM2 = { observer: "images/securite-g1-observer.webp", annoncer: "images/securite-g1-annoncer.webp", epaule: "images/securite-g1-epaule.webp",
  issue: "images/securite-g1-issue.webp", porte: "images/securite-g1-porte.webp", rangement: "images/securite-g1-rangement.webp",
  longe: "images/securite-g1-longe.webp", tenue: "images/securite-g1-tenue.webp", distance: "images/securite-g1-distance.webp",
  inquiet: "images/securite-g1-inquiet.webp", recule: "images/securite-g1-recule.webp", chute: "images/securite-g1-chute.webp" };
HypeCoursEditorial.config["g1-c15"] = function (cours, lg, o) {
  var L = Lx(lg), r = function (x) { return o.pickLg(x, lg); };
  var b = cours.blocs || [];
  var c = [1, 2, 3, 4, 5, 6, 7].map(function (i) { return o.contenuLg(b[i] && b[i].contenu, lg); });
  var tailles = [5, 5, 8, 8, 6, 6, 6];
  var valide = c.every(function (x, i) { return x.length === tailles[i]; }) && (cours.quiz || []).length === 10;
  if (!valide) return { valide: false, sections: [], chapitres: [] };
  var tit = function (x) { return o.sansNum(o.nettoyerTitre(r(x && x.titre))); };
  var tx = function (x) { return r(x && x.texte); };
  var so = function (x) { return r(x && x.sous); };
  var pu = function (x) { return ((x && x.puces) || []).map(function (p) { return { gras: r(p.gras), texte: r(p.texte) }; }); };
  var pt = function (x) { return pu(x).map(function (p) { return p.texte; }); };

  /* 11. Tenir une longe : la phrase d'origine est coupée (« … [SUITE ATTENDUE] ») dans les 14 langues */
  var lo = c[3][4], loSous = so(lo), loPuces = pu(lo);
  if (/\[[^\]]*\]\s*$/.test(loSous)) {
    var m = loSous.match(/^(.*?[.。])\s*/);
    loSous = (m ? m[1] + " " : "") + L("longeJamais");
    loPuces = [{ texte: L("longeDoigts") }].concat(loPuces);
  }
  var regles = o.phrases(tx(c[5][5]));
  var hbTout = pt(c[6][3]);
  var hbq = [0, 1, 3, 6, 8].map(function (i) { return hbTout[i]; }).filter(Boolean);
  var coach = c[2][7], defi = c[6][2];

  var chapitres = [
    { id: "approcher", label: L("cApproche"), img: IM.approche, pos: "60% 40%" },
    { id: "autour", label: L("cAutour"), img: IM.fond02, pos: "55% 25%" },
    { id: "gestes", label: L("cBonsGestes"), img: "images/securite-g1-porte.webp", pos: "50% 50%" },
    { id: "entre", label: L("cEntre"), img: IM.groupe, pos: "50% 60%" },
    { id: "probleme", label: L("cProbleme"), img: IM.oeil, pos: "50% 45%" }
  ];
  var num = function (id) { var i = chapitres.findIndex(function (x) { return x.id === id; }); return "0" + (i + 1); };
  var lab = function (id) { return chapitres.find(function (x) { return x.id === id; }).label; };

  var P = function (src, pos) { return h("figure", { className: "pimg" }, h("img", { src: src, alt: "", loading: "lazy", style: pos ? { objectPosition: pos } : undefined })); };
  var liste = function (arr, croix) { return arr && arr.length ? h("ul", { className: croix ? "x" : undefined }, arr.map(function (t, k) { return h("li", { key: k }, t); })) : null; };
  var ap = function (t) { return t ? h("p", { className: "ap" }, t) : null; };
  var S = function (t) { return t ? h("p", { className: "s" }, t) : null; };
  var ZPOS = [{ x: 14, y: 30 }, { x: 40, y: 50 }, { x: 43, y: 84 }, { x: 86, y: 66 }];
  var chap = function (id, bg, bgPos, sous, items, note) {
    return { id: id, ton: "photo", rendu: function (x) {
      return h(Chapitre, { key: id, id: id, L: x.L, rtl: x.rtl, num: num(id), galop: "Galop 1", titre: lab(id), sous: sous, bg: bg, bgPos: bgPos, items: items, note: note });
    } };
  };
  var sections = [
    /* 01 — APPROCHER */
    chap("approcher", IM.approche, "62% 40%", o.paras(tx(c[0][0]))[0], [
      { titre: L("sApproche"), rendu: function () { return h(Txt, { texte: o.paras(tx(c[0][0])).slice(1).join("\n\n") }); } },
      { titre: tit(c[0][2]), rendu: function () { return [P(IM2.observer, "40% 50%"), h(Txt, { key: "t", texte: tx(c[0][2]) })]; } },
      { titre: tit(c[1][0]), rendu: function () { return [P(IM2.annoncer, "50% 40%"), h(Txt, { key: "t", texte: tx(c[1][0]) })]; } },
      { titre: tit(c[1][2]), rendu: function () { return [P(IM2.epaule, "50% 35%"), h(Txt, { key: "t", texte: tx(c[1][2]) })]; } },
      { titre: tit(c[1][1]), rendu: function () { return h(Txt, { texte: tx(c[1][1]) }); } },
      { titre: tit(c[6][0]), rendu: function () { return h(Txt, { texte: tx(c[6][0]) }); } },
      { titre: tit(c[1][3]), alerte: true, rendu: function () { return liste(pt(c[1][3]), true); } }
    ], "« " + L("citBB") + " »  —  Buck Brannaman"),
    /* 02 — AUTOUR DU CHEVAL */
    chap("autour", IM.fond02, "55% 25%", tit(c[2][0]), [1, 2, 3, 4].map(function (zi, k) {
      return { titre: tit(c[2][zi]), alerte: zi === 4, rendu: function () { return [h(AtlasMini, { key: "a", img: IM.atlas, ratio: "1942 / 809", pos: ZPOS, z: k }), h(Txt, { key: "t", texte: tx(c[2][zi]) })]; } };
    }).concat([
      { titre: tit(c[1][4]), rendu: function () { return h(Txt, { texte: tx(c[1][4]) }); } },
      { titre: tit(c[2][5]), rendu: function () { return h(Txt, { texte: tx(c[2][5]) }); } },
      { titre: tit(c[2][6]), rendu: function () { return [P(IM2.issue, "50% 50%"), h(Txt, { key: "t", texte: tx(c[2][6]) })]; } }
    ])),
    /* 03 — LES BONS GESTES */
    chap("gestes", IM2.porte, "50% 50%", L("sBonsGestes"), [
      { titre: tit(c[0][4]), rendu: function () { return [P(IM2.tenue, "50% 40%"), h(Txt, { key: "t", texte: tx(c[0][4]) })]; } },
      { titre: tit(c[3][0]), rendu: function () { return [S(so(c[3][0])), h(Coches, { key: "c", items: pt(c[3][0]), L: L }), ap(tx(c[3][1]))]; } },
      { titre: tit(c[3][2]), rendu: function () { return [P(IM2.rangement, "50% 50%"), S(so(c[3][2])), liste(pt(c[3][2])), ap(tx(c[3][3]))]; } },
      { titre: tit(lo), alerte: false, rendu: function () { return [P(IM2.longe, "40% 50%"), S(loSous), liste(loPuces.map(function (q) { return q.texte; }), true), ap(tx(c[3][5])),
          h("p", { key: "r", className: "ret" }, h("b", null, tit(c[3][6])), tx(c[3][6]))]; } },
      { titre: tit(c[3][7]), rendu: function () { return [P(IM.membres, "50% 65%"), h(Txt, { key: "t", texte: tx(c[3][7]) })]; } }
    ]),
    /* 04 — ENTRE CHEVAUX */
    chap("entre", IM.groupe, "60% 60%", L("sEntre"), [
      { titre: tit(c[4][0]), rendu: function () { return [P(IM2.distance, "50% 50%"), S(so(c[4][0])), liste(pt(c[4][0])), ap(tx(c[4][1]))]; } },
      { titre: tit(c[4][2]), rendu: function () { return [S(so(c[4][2])), liste(pt(c[4][2])), ap(tx(c[4][3]))]; } },
      { titre: tit(c[0][3]), rendu: function () { return h(Txt, { texte: tx(c[0][3]) }); } },
      { titre: tit(c[4][4]), alerte: true, rendu: function () { return [P(IM2.inquiet, "50% 40%"), S(so(c[4][4])), h(Signaux, { key: "s", L: L, items: pt(c[4][4]), conclusion: tx(c[4][5]) })]; } }
    ]),
    /* 05 — EN CAS DE PROBLÈME : chaque situation = « Que ferais-tu ? » puis la réponse du cours */
    chap("probleme", IM.oeil, "50% 40%", L("sProbleme"), [
      { s: c[5][0], apres: tx(c[5][1]), img: IM2.recule },
      { s: c[5][2] }, { s: c[5][3] },
      { s: c[5][4], img: IM2.chute }
    ].map(function (q, k) {
      return { titre: tit(q.s), rendu: function () {
        return [q.img ? P(q.img, "50% 45%") : null,
          h("p", { key: "k", className: "qf" }, L("queFerais")),
          h(Reveler, { key: "r" + k, L: L, rtl: lg === "ar", enfants: [S(so(q.s)), tx(q.s) ? h(Txt, { key: "t", texte: tx(q.s) }) : null, liste(pt(q.s)), ap(q.apres)] })];
      } };
    })),
    /* transition unique vers la page de fin (résumé, Hey Baby, défi, quiz) */
    { id: "suite", ton: "noir", rendu: function (x) {
      return h("div", { className: "hce-quiz", style: { "--img": "url(" + IM.quiz + ")", marginTop: 0 } },
        h("h3", null, L("secQuiz")), h("p", null, L("quizSous")),
        h("div", { className: "hce-btns" }, h("button", { type: "button", className: "hce-btn", onClick: function () { x.versFin(true); } }, L("suiteFin"), fleche(x.rtl, 15))));
    } }
  ];

  return {
    hero: { img: IM.hero, pos: "100% 35%", titre: r(cours.titre), galop: "Galop 1", duree: r(cours.duree), type: r(cours.type) },
    encarts: {
      coach: { titre: L("coach"), texte: tx(coach), img: IM.coach, pos: "60% 25%" },
      hb: { texte: L("hbSous"), img: IM.hb, pos: "50% 25%" },
      defi: { titre: tit(defi), texte: o.phrases(so(defi))[0] || "", img: IM.defi, pos: "50% 35%" }
    },
    chapitres: chapitres,
    revision: { label: L("secQuiz"), img: IM.quiz, pos: "50% 60%" },
    sections: sections,
    regles: regles, hbq: hbq, defi: { titre: tit(defi), sous: o.phrases(so(defi)).slice(1).join(" "), puces: pu(defi) }, citFin: tx(c[6][5])
  };
};

/* =====================================================================================
   FIN DU COURS g1-c15 : la page de fin partagée (FinCours, hype-cours-robes-ordi.js), même système que le pansage
   et les robes. Résumé = les 10 règles d'or, rangées sous leur chapitre (seul endroit où elles apparaissent).
   Arriver ici par « Quiz et révision » = cours terminé (+25 XP, une fois, index.html). Par le raccourci du défi : non.
   « Quiz réussi » seulement si le score du quiz est >= 60 % (règle de FinCours).
   ===================================================================================== */
function finOk() { return !!(window.HypeRobesOrdi && window.HypeRobesOrdi.shared && window.HypeRobesOrdi.shared.FinCours); }
function FinSecu(props) {
  var S = window.HypeRobesOrdi.shared;
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var L = Lx(lg);
  var cfg = HypeCoursEditorial.config["g1-c15"](cours, lg, outils());
  var R = cfg.regles || [];
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: cfg.hero.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    if (props.setEcran) props.setEcran("assistant");
  };
  var liste = props.coursListe || [], idxC = liste.findIndex(function (c) { return c && c.id === cours.id; });
  var suivant = (idxC >= 0 && liste[idxC + 1] && props.onOuvrirCours) ? liste[idxC + 1] : null;
  /* les 10 règles d'or réparties sous les 5 chapitres (si le découpage en phrases n'en donne pas 10 : une seule liste) */
  var parts = R.length === 10 ? [[0, 1, 2], [3, 4], [5, 6], [7], [8, 9]] : null;
  var ch = cfg.chapitres;
  var por = parts ? parts.map(function (ix, k) { return { img: ch[k].img, pos: ch[k].pos, nom: ch[k].label, desc: ix.map(function (i) { return R[i]; }).join(" ") }; })
    : [{ img: IM.approche, nom: L("cApproche"), desc: R.join(" ") }];
  return h("div", { className: "rbo", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, S.CSS),
    h("main", { className: "rbo-main" },
      h(S.FinCours, {
        L: L, lg: lg, rtl: rtl, kicker: "Galop 1", titre: cfg.hero.titre, Selecteur: props.Selecteur, coursId: cours.id,
        heroImg: IM.fin, heroPos: "65% 35%",
        portraits: por, note: cfg.citFin,
        hb: cfg.hbq, onHey: hey, defiSeg: cfg.defi,
        quizImg: IM.quiz, onQuiz: function () { if (props.setEcran) props.setEcran("quiz"); }, quizScore: props.quizScore,
        suivant: suivant ? { titre: (typeof suivant.titre === "string" ? suivant.titre : pickLg(suivant.titre, lg)), onClick: function () { props.onOuvrirCours(suivant.id); } } : null,
        onGalops: props.onRetour, onRetourCours: props.onRetourCours
      }),
      (typeof FinPageHype === "function") ? h("div", { className: "rbo-finpage" }, h(FinPageHype, null)) : null));
}
window.HypeFinsCours = window.HypeFinsCours || {};
window.HypeFinsCours["g1-c15"] = { ok: finOk, Fin: FinSecu };

window.HypeCoursEditorial = HypeCoursEditorial;
})();
