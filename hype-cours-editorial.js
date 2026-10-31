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
var VERSION = 9;   /* 01/11 00h15 : téléphone — menu des chapitres en liste verticale (pansage), haut de page comme sur ordinateur */
/* précédente : VERSION = 8; */   /* 01/11 : téléphone — citation sous le haut de page, encarts masqués, conseil du coach avant le quiz (reste du pack ChatGPT) */
/* précédente : VERSION = 7; */   /* 01/11 00h10 : photo de haut de page du cours seller et brider (g1-c17) */
/* précédente : VERSION = 6; */   /* 31/10 soir : Galop 2 (14 cours, robes à part) sur le même modèle — ordinateur et tablette */
/* v5 :   /* 31/10 : les 15 autres cours du Galop 1 générés sur le même modèle (ordinateur et tablette) + parties manquantes (COMPL, 14 langues) */
/* v4 : 31/10 15h : menu en liste verticale (comme le pansage) sur téléphone */
/* v3 :    /* 31/10 14h : brief du 31/10 13h52 — atlas photo, fiches, signaux, parcours, fin unique */
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
  essentiel: tt("L'essentiel", "The essentials", "Lo esencial", "L'essenziale", "ポイント", "Das Wichtigste", "الأساسيات", "要点", "De kern", "O essencial", "Det viktigaste", "Главное", "Najważniejsze", "핵심"),
  enImages: tt("En images", "In pictures", "En imágenes", "In immagini", "写真で見る", "In Bildern", "بالصور", "图解", "In beeld", "Em imagens", "I bilder", "В картинках", "W obrazach", "사진으로 보기"),
  astuce: tt("L'astuce", "Tip", "El truco", "Il trucco", "コツ", "Der Tipp", "نصيحة", "小窍门", "De tip", "A dica", "Tipset", "Подсказка", "Wskazówka", "팁"),
  affiche: tt("L'affiche du cours", "The course poster", "El póster del curso", "Il poster del corso", "コースのポスター", "Das Kursposter", "ملصق الدرس", "课程海报", "De cursusposter", "O pôster do curso", "Kursens affisch", "Плакат урока", "Plakat lekcji", "강의 포스터"),
  agrandir: tt("Agrandir l'image", "Enlarge the image", "Ampliar la imagen", "Ingrandisci l'immagine", "画像を拡大", "Bild vergrößern", "تكبير الصورة", "放大图片", "Afbeelding vergroten", "Ampliar a imagem", "Förstora bilden", "Увеличить изображение", "Powiększ obraz", "이미지 확대"),
  fermer: tt("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"),
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
".hce-clamp7{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:7;overflow:hidden}",
".hce.auto .hce-clamp7{-webkit-line-clamp:5}",
".hce-card .hce-more{position:relative;z-index:1;align-self:flex-start;margin-top:4px}",
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
/* 31/10 15h (Blandine : « fais ça similaire au pansage ») : sur téléphone, le menu devient la liste verticale du cours pansage */
".hce-mhead{display:none}.hce-chap .lb small{display:none}",
"@container hce (max-width:699px){",
".hce-mhead{display:block;padding:0 16px 12px}",
".hce .hce-mhead .k{display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--champ);margin:0}",
".hce .hce-mhead .k:after{content:'';width:46px;height:1px;background:rgba(201,166,107,.5)}",
".hce-mhead h2{font-size:23px;line-height:1.15;margin:8px 0 4px}",
".hce .hce-mhead .aide{font-size:12px;color:var(--doux);margin:0}",
/* 01/11 00h15 (Blandine : « les menus avec les chapitres doivent être dans ce design-là partout ») : retour à la LISTE VERTICALE du pansage sur téléphone (le menu horizontal du 31/10 22h05 est retiré) */
".hce-menu ol{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;overflow:visible;scroll-snap-type:none;padding:0 16px}",
".hce-menu li{flex:none}",
".hce-chap{display:flex;align-items:center;gap:12px;height:auto;min-height:62px;border-radius:6px;border-color:rgba(243,238,228,.1);background:#0c1113}",
".hce-chap .ph{inset:0 0 0 54%}[dir=rtl] .hce-chap .ph{inset:0 54% 0 0}",
".hce-chap .n{position:relative;top:auto;inset-inline-start:auto;flex:0 0 46px;text-align:center;font-size:27px}",
".hce-chap .lb{position:relative;inset:auto;flex:1 1 auto;min-width:0;padding:10px 0;font-size:18px;line-height:1.15;text-shadow:none}",
".hce-chap .lb small{display:block;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:400;color:var(--doux);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".hce-chap .hce-rond{position:relative;bottom:auto;inset-inline-end:auto;flex:0 0 28px;margin-inline-end:12px;background:rgba(7,10,8,.45)}",
"}",
/* 31/10 22h : TÉLÉPHONE — lecture verticale dans le chapitre : photo, titre, texte complet, interaction ; un chapitre à la fois.
   (repris du patch préparé par ChatGPT, sans masquer les 3 encarts du haut) */
"@media screen and (max-width:699px){",
".hce-chp-mobile{padding:0 0 28px}",
".hce-chp-mobile>.bg{height:214px;bottom:auto}",
".hce-chp-mobile>.in{display:block;padding:104px 16px 0}",
".hce-chp-mobile h2{font-size:32px}",
".hce-chp-mobile .note{margin:10px 0 0}",
".hce-mobile-read{display:grid;gap:22px;min-width:0;margin-top:22px}",
".hce-mobile-unit{min-width:0;padding:0 0 22px;border-bottom:1px solid rgba(201,166,107,.24)}",
".hce-mobile-unit h3{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-size:25px;line-height:1.1;margin:12px 0 12px;color:var(--ivoire)}",
".hce-mobile-unit.is-alert{padding:15px 14px 18px;border:1px solid rgba(217,150,124,.7);border-radius:12px;background:linear-gradient(180deg,rgba(58,22,19,.45),rgba(9,12,11,.9) 70%)}",
".hce-mobile-unit.is-alert h3{color:#E3A18E;margin-top:0}",
".hce-mobile-unit .pimg{width:100%;aspect-ratio:2.2/1;margin:0 0 6px;border-radius:10px;overflow:hidden}",
".hce-mobile-unit .pimg img{display:block;width:100%;height:100%;object-fit:cover}",
".hce-mobile-unit .pimg.aff{aspect-ratio:auto;max-height:none;margin:0 0 8px}.hce-mobile-unit .pimg.aff img{max-height:70vh;object-fit:contain}",
".hce-mobile-unit .hce-txt,.hce-mobile-unit .s,.hce-mobile-unit .ap,.hce-mobile-unit p.pg{font-size:15px;line-height:1.62;color:var(--doux);overflow-wrap:anywhere}",
".hce-mobile-unit p.pg{color:var(--ivoire);margin:0 0 8px}",
".hce-mobile-unit .s{margin:0 0 10px}",
".hce-mobile-unit .ap{margin:12px 0 0;padding-top:10px;border-top:1px solid rgba(201,166,107,.22)}",
".hce-mobile-unit ul{margin:8px 0;padding-inline-start:20px;display:grid;gap:7px;font-size:15px;line-height:1.55;color:var(--ivoire);overflow-wrap:anywhere}",
".hce-mobile-unit li::marker{color:var(--champ)}",
".hce-mobile-unit ul.x{list-style:none;padding-inline-start:0}",
".hce-mobile-unit ul.x li{position:relative;padding-inline-start:24px}",
".hce-mobile-unit ul.x li:before{content:'✕';position:absolute;inset-inline-start:0;color:#E3A18E;font-weight:700}",
".hce-mobile-unit .ast{border-inline-start:2px solid var(--champ);padding-inline-start:12px;font-size:15px;line-height:1.6;color:var(--ivoire)}",
".hce-mobile-unit .hce-coches{margin-top:10px}.hce-mobile-unit .hce-coches ul{padding:0}",
".hce-mobile-unit .hce-coches button{font-size:13px;line-height:1.45;padding:10px 11px}",
".hce-mobile-unit .hce-chips{display:flex;flex-wrap:wrap;gap:7px}.hce-mobile-unit .hce-chips button{max-width:100%;white-space:normal;overflow-wrap:anywhere}",
".hce-mobile-unit .hce-fig{width:100%;margin-bottom:10px}.hce-mobile-unit .hce-fig img{width:100%;height:100%;object-fit:contain}",
".hce-mobile-unit .hce-hot{width:30px;height:30px;font-size:15px}",
".hce-mobile-unit .hce-ztabs{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 12px}",
".hce-mobile-unit .hce-ztabs button{border:1px solid rgba(201,166,107,.45);border-radius:8px;background:rgba(7,10,8,.55);padding:7px 10px;min-width:0;max-width:100%;font-size:12px;text-align:start;overflow-wrap:anywhere;color:var(--ivoire)}",
".hce-mobile-unit .hce-ztabs button[aria-selected=true]{border-color:var(--champ);color:var(--champ)}",
".hce-mobile-unit .ret{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:21px;line-height:1.35}",
".hce-mobile-unit .ret b{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:11px;color:var(--champ);margin-bottom:5px}",
".hce-mobile-unit .qf{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--champ);margin-bottom:12px}",
".hce-mobile-unit .hce-btn{max-width:100%;white-space:normal;text-align:center}",
"}",
/* 01/11 00h15 (Blandine : « en haut tu peux laisser les onglets comme sur ordinateur ») : encarts du haut visibles, citation dans le chapitre 01, pas de carte coach en fin — désactivé */
".hce-mobile-quote,.hce-mobile-coach{display:none!important}",
"@media screen and (max-width:0px){",
".hce-mobile-quote{display:block;margin:4px 16px 22px;padding:19px 20px;border-inline-start:2px solid var(--champ);background:linear-gradient(105deg,#101D22,#070A08);font-family:'Cormorant Garamond','Noto Naskh Arabic',Georgia,serif;font-style:italic;font-size:21px;line-height:1.4;color:var(--ivoire)}",
".hce-sec[data-i=\"0\"] .hce-chp-mobile .note{display:none}",
".hce-mobile-coach{display:block;margin:14px 16px 22px;padding:20px;border:1px solid rgba(201,166,107,.4);border-radius:14px;background:linear-gradient(120deg,#101D22,#090D0D)}",
".hce-mobile-coach h3{font-family:'Cormorant Garamond',serif;color:var(--champ);font-size:26px;margin:0 0 10px}",
".hce-mobile-coach p{font-size:14px;line-height:1.65;color:var(--ivoire);white-space:pre-line;overflow-wrap:anywhere}",
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
/* v6 (cours générés) : un chapitre sur deux en miroir (carte à gauche, notions à droite) pour varier le rythme */
".hce-chp.inv>.bg{inset-inline-start:0;inset-inline-end:30%}",
".hce-chp.inv>.bg:after{background:linear-gradient(270deg,#070A08 0%,rgba(7,10,8,.88) 22%,rgba(7,10,8,.35) 55%,rgba(7,10,8,.25) 100%),linear-gradient(180deg,#070A08 0%,rgba(7,10,8,0) 20%,rgba(7,10,8,0) 78%,#070A08 100%)}",
".hce-chp.inv>.in{grid-template-columns:minmax(0,1fr) minmax(0,.85fr)}.hce-chp.inv>.in>.g{order:2}.hce-chp.inv>.in>.pan{order:1}",
/* v6 (22h) : cartes à la taille de leur contenu (plus de grande carte presque vide), plus d'air entre les parties */
".hce-chp.auto{padding-top:64px;padding-bottom:72px}",
".hce-chp.auto .pan{min-height:0;align-self:start}",
".hce-chp.auto .pan .hce-txt p,.hce-chp.auto .pan p.pg,.hce-chp.auto .pan ul{font-size:16px;line-height:1.7}",
"[dir=rtl] .hce-chp>.bg{transform:scaleX(-1)}",
".hce-chp>.in{grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:64px;align-items:start;width:100%}",
".hce-chp .g{padding-top:18px}",
".hce-chp h2{font-size:clamp(46px,3.9cqw,58px)}",
".hce-chp .pan{padding:24px 26px 18px;min-height:360px}.hce-chp .pan h3{font-size:27px}.hce-chp .pimg{aspect-ratio:21/9}",

"}",
/* 31/10 (v5) : cours générés (Galop 1) — affiche entière (jamais rognée) + agrandissement plein écran */
/* v6 : « Les erreurs à éviter » des cours générés = encadré sombre au liseré rouge, liste en ✕ (comme les robes) */
".hce-chp.auto .pan.al{background:linear-gradient(180deg,rgba(58,22,19,.5),rgba(9,12,11,.9) 60%);border-color:rgba(217,150,124,.7)}",
".hce-chp.auto .pan.al h3{color:#E3A18E}",
".hce-chp .pimg.aff{aspect-ratio:auto;max-height:64vh;background:#0B0F0E;cursor:zoom-in;border:1px solid rgba(201,166,107,.25);padding:0}",
".hce-chp .pimg.aff img{height:auto;max-height:64vh;object-fit:contain;margin:0 auto}",
".hce-chp .pan .lg{font-size:13px;line-height:1.5;color:var(--doux);font-style:italic;margin:0}",
".hce-zoom{position:fixed;inset:0;z-index:9999;background:rgba(4,6,5,.94);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out}",
".hce-zoom img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.6)}",
".hce-zoom button{position:absolute;top:16px;inset-inline-end:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,166,107,.6);background:rgba(7,10,8,.7);color:#F3EEE4;font-size:22px;cursor:pointer}",
".hce-chp .pan p.pg{margin:0;font-size:15px;line-height:1.65;color:var(--ivoire)}.hce-chp .pan p.pg strong{color:#D9B98A}",
".hce-chp .pan .ast{border-inline-start:2px solid var(--champ);padding-inline-start:14px;font-size:15.5px;line-height:1.6;color:var(--ivoire)}"
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
/* Lecture téléphone commune (d'après le patch ChatGPT) : chaque notion = photo, titre, contenu intact ;
   les atlas consécutifs sont réunis en UNE photo à zones actives, sans texte répété ; interactions d'origine conservées. */
function MobilePieces(rendu) {
  var a = Array.isArray(rendu) ? rendu : [rendu], images = [], corps = [], atlas = null;
  a.forEach(function (x) {
    if (!x) return;
    if (x.type === AtlasMini) atlas = x;
    else if (x.type === "figure" && x.props && x.props.className === "pimg") images.push(x);
    else corps.push(x);
  });
  return { images: images, corps: corps, atlas: atlas };
}
function MobileAtlasCommun(p) {
  var _z = useState(0), z = _z[0], setZ = _z[1];
  var first = p.entrees[0].pieces.atlas.props;
  var pos = first.pos || [], entry = p.entrees[z], items = p.entrees;
  return h("article", { className: "hce-mobile-unit" + (entry.item.alerte ? " is-alert" : "") },
    h("div", { className: "hce-fig", style: { aspectRatio: first.ratio || "1942 / 809" } },
      h("img", { src: first.img, alt: "", loading: "lazy" }),
      items.map(function (t, i) { var xy = pos[i]; return xy ? h("button", {
        key: i, type: "button", className: "hce-hot" + (t.item.alerte ? " al" : ""),
        "aria-label": (i + 1) + " — " + t.item.titre, "aria-pressed": z === i ? "true" : "false",
        style: { left: xy.x + "%", top: xy.y + "%" }, onClick: function () { setZ(i); } }, String(i + 1)) : null; })),
    h("div", { className: "hce-ztabs", role: "tablist" }, items.map(function (t, i) {
      return h("button", { key: i, type: "button", role: "tab", "aria-selected": z === i ? "true" : "false", className: t.item.alerte ? "al" : undefined, onClick: function () { setZ(i); } }, (i + 1) + " · " + t.item.titre);
    })),
    h("h3", null, entry.item.titre),
    h("div", { className: "hce-mobile-body", role: "tabpanel", "aria-live": "polite" }, entry.pieces.corps));
}
function MobileLectureNotions(p) {
  var nodes = [], i = 0, items = p.items;
  while (i < items.length) {
    var d = MobilePieces(items[i].rendu());
    if (d.atlas) {
      var group = [{ item: items[i], pieces: d }], j = i + 1;
      while (j < items.length) {
        var next = MobilePieces(items[j].rendu());
        if (!next.atlas || next.atlas.props.img !== d.atlas.props.img) break;
        group.push({ item: items[j], pieces: next }); j++;
      }
      nodes.push(h(MobileAtlasCommun, { key: "atlas-" + i, entrees: group }));
      i = j; continue;
    }
    nodes.push(h("article", { key: "notion-" + i, className: "hce-mobile-unit" + (items[i].alerte ? " is-alert" : "") },
      d.images.length ? d.images : null,
      h("h3", null, items[i].titre),
      h("div", { className: "hce-mobile-body" }, d.corps)));
    i++;
  }
  return h("div", { className: "hce-mobile-read" }, nodes);
}
function estTelephone() { try { return !!(window.matchMedia && window.matchMedia("(max-width:699px)").matches); } catch (e) { return false; } }
function Chapitre(p) {
  var _i = useState(0), i = _i[0], setI = _i[1];
  var L = p.L, rtl = p.rtl, it = p.items[i], n = p.items.length;
  var olRef = useRef(null);
  var _m = useState(estTelephone), mobile = _m[0], setMobile = _m[1];
  useEffect(function () {
    var check = function () { setMobile(estTelephone()); };
    window.addEventListener("resize", check); check();
    return function () { window.removeEventListener("resize", check); };
  }, []);
  useEffect(function () {
    var ol = olRef.current; if (!ol || ol.scrollWidth <= ol.clientWidth + 2) return;
    var b = ol.querySelectorAll("button")[i]; if (!b) return;
    try { ol.scrollTo({ left: b.parentNode.offsetLeft - 16, behavior: "smooth" }); } catch (e) { }
  }, [i]);
  if (mobile) return h("div", { className: "hce-chp hce-chp-mobile" + (p.cls ? " " + p.cls : "") },
    h("div", { className: "bg", "aria-hidden": true, style: { backgroundImage: "url(" + p.bg + ")", backgroundPosition: p.bgPos || "70% 40%" } }),
    h("div", { className: "in" },
      h("div", { className: "g" },
        h("p", { className: "kick" }, p.num + "  ·  " + p.galop),
        h("h2", { id: "hce-t-" + p.id }, p.titre),
        h("span", { className: "trait", "aria-hidden": true }),
        p.sous ? h("p", { className: "sous" }, p.sous) : null,
        p.note ? h("p", { className: "note" }, p.note) : null),
      h(MobileLectureNotions, { items: p.items })));
  return h("div", { className: "hce-chp" + (p.cls ? " " + p.cls : "") },
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

/* texte du conseil du coach dans l'encart du haut : replié sur 7 lignes s'il est long (cours générés), « Lire la suite » */
function CoachTxt(p) {
  var _o = useState(false), o = _o[0], setO = _o[1];
  var long = String(p.texte || "").length > (p.seuil || 300);
  if (!long) return h("p", null, p.texte);
  return h(React.Fragment, null,
    h("p", { className: o ? undefined : "hce-clamp7" }, p.texte),
    h("button", { type: "button", className: "hce-more", "aria-expanded": o ? "true" : "false", onClick: function () { setO(!o); } }, p.L(o ? "reduire" : "lire")));
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
    try { var r1 = li.getBoundingClientRect(), r2 = ol.getBoundingClientRect(); ol.scrollBy({ left: (r1.left - r2.left) - 16, behavior: "smooth" }); } catch (e) { }
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
  else {
    /* 01/11 (pack ChatGPT) : sur téléphone, le conseil du coach passe ici, juste avant « Quiz et révision » (les encarts du haut sont masqués) */
    if (enc && enc.coach) corps.push(h("aside", { key: "coach-mobile-fin", className: "hce-mobile-coach" }, h("h3", null, enc.coach.titre), h("p", null, enc.coach.texte)));
    autres.forEach(function (s) {
      corps.push(h("section", { key: s.id, id: "hce-" + s.id, className: "hce-sec t-" + s.ton, style: { paddingTop: 8, paddingBottom: 8 } }, h("div", { className: "hce-in" }, s.rendu(ctx))));
    });
  }

  return h("div", { className: "hce" + (cfg.auto ? " auto" : ""), dir: rtl ? "rtl" : undefined, lang: lg },
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
          h("h3", null, enc.coach.titre), h(CoachTxt, { texte: enc.coach.texte, L: L, seuil: cfg.auto ? 200 : 300 })) : null,
        enc.hb ? h("button", { type: "button", className: "hce-card hb", onClick: function () { hey(""); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.hb.img + ")", backgroundPosition: enc.hb.pos || "center" } }),
          h("h3", null, L("heyBaby")), h("p", null, enc.hb.texte), h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null,
        enc.defi ? h("button", { type: "button", className: "hce-card defi", onClick: function () { versFin(false); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.defi.img + ")", backgroundPosition: enc.defi.pos || "center" } }),
          h("h3", null, enc.defi.titre), enc.defi.texte ? h("p", null, enc.defi.texte) : null, h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null)),
    h(Vague, { de: NOIR, vers: NOIR }),
    /* MENU DES CHAPITRES */
    h("nav", { className: "hce-menu", ref: menuRef, "aria-label": L("mTitre") },
      chs[0] && chs[0].citation ? h("div", { className: "hce-mobile-quote" }, chs[0].citation) : null,   /* 01/11 (pack ChatGPT) : citation sous le haut de page, téléphone */
      h("div", { className: "hce-mhead" }, h("p", { className: "k" }, L("mProg")), h("h2", null, L("mTitre")), h("p", { className: "aide" }, L("mAide"))),
      h("ol", { style: { "--n": (function (t) { return t > 7 ? Math.ceil(t / 2) : t; })(cfg.chapitres.length + (cfg.revision ? 1 : 0)) } }, cfg.chapitres.map(function (c, i) {
        return h("li", { key: c.id }, h("button", { type: "button", className: "hce-chap", "aria-current": actif === i ? "true" : undefined, onClick: function () { choisir(i); } },
          h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + c.img + ")", backgroundPosition: c.pos || "center" } }),
          h("span", { className: "n" }, (i < 9 ? "0" : "") + (i + 1)),
          h("span", { className: "lb" }, c.label, c.sous ? h("small", null, c.sous) : null),
          h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 14))));
      }).concat(cfg.revision ? [h("li", { key: "rev" }, h("button", { type: "button", className: "hce-chap rev", onClick: function () { versFin(true); } },
          h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + cfg.revision.img + ")", backgroundPosition: cfg.revision.pos || "center" } }),
          h("span", { className: "n" }, (cfg.chapitres.length < 9 ? "0" : "") + (cfg.chapitres.length + 1)),
          h("span", { className: "lb" }, cfg.revision.label, cfg.revision.sous ? h("small", null, cfg.revision.sous) : null),
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
    { id: "approcher", label: L("cApproche"), sous: L("sApproche"), img: IM.approche, pos: "60% 40%" },
    { id: "autour", label: L("cAutour"), sous: L("sAutour"), img: IM.fond02, pos: "55% 25%" },
    { id: "gestes", label: L("cBonsGestes"), sous: L("sBonsGestes"), img: "images/securite-g1-porte.webp", pos: "50% 50%" },
    { id: "entre", label: L("cEntre"), sous: L("sEntre"), img: IM.groupe, pos: "50% 60%" },
    { id: "probleme", label: L("cProbleme"), sous: L("sProbleme"), img: IM.oeil, pos: "50% 45%" }
  ];
  var num = function (id) { var i = chapitres.findIndex(function (x) { return x.id === id; }); return "0" + (i + 1); };
  var lab = function (id) { return chapitres.find(function (x) { return x.id === id; }).label; };

  var P = function (src, pos) { return h("figure", { className: "pimg" }, h("img", { src: src, alt: "", loading: "lazy", style: pos ? { objectPosition: pos } : undefined })); };
  var liste = function (arr, croix) { return arr && arr.length ? h("ul", { className: croix ? "x" : undefined }, arr.map(function (t, k) { return h("li", { key: k }, t); })) : null; };
  var ap = function (t) { return t ? h("p", { className: "ap" }, t) : null; };
  var S = function (t) { return t ? h("p", { className: "s" }, t) : null; };
  var ZPOS = [{ x: 14, y: 30 }, { x: 40, y: 50 }, { x: 43, y: 84 }, { x: 86, y: 66 }];
  var chap = function (id, bg, bgPos, sous, items, note) {
    return { id: id, ton: "photo", citation: note, rendu: function (x) {
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
    revision: { label: L("secQuiz"), sous: L("sQuiz"), img: IM.quiz, pos: "50% 60%" },
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


/* =====================================================================================
   v5 — 31/10 : LES 15 AUTRES COURS DU GALOP 1, GÉNÉRÉS SUR LE MÊME MODÈLE (ordinateur et tablette ; le téléphone garde
   l'affichage d'avant pour l'instant). Aucun texte réécrit : tout est lu dans le cours (14 langues).
   Règles (la structure est lue sur la version française, les autres langues suivent le même ordre) :
   - un chapitre = un bloc de texte titré ; les fiches photo (photo-liste) qui se suivent = un chapitre « En images » ;
     un bloc sans titre (image + encadré) rejoint le chapitre d'avant.
   - les affiches du cours (blocs image, pleines de texte) : une notion « L'affiche du cours », image ENTIÈRE + agrandissement.
   - à part, chacun à UN seul endroit : citation d'ouverture et citation de la couverture -> notes des chapitres ;
     1er conseil du coach -> encart du haut ; 1er défi -> encart du haut (1re phrase) + page de fin (la suite) ;
     Demande à Hey Baby -> page de fin ; synthèse en 10 secondes -> résumé de la page de fin ; citation de fin -> page de fin.
   - retiré (doublon du cours, comme pour la sécurité) : « Objectif(s) du cours ».
   - paragraphe ou encadré sans titre -> rattaché à la notion juste avant.
   ===================================================================================== */
var AUTO_IM = {
  "g1-c3": ["images/galop5-th-cheval2.webp", "images/couv-g2-heberger.jpg", "images/securite-g1-observer.webp"],
  "g1-c4": ["images/galop5-c08-equilibre.webp", "images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp"],
  "g1-c5": ["images/galop5-c08-equilibre.webp", "images/galop5-c09-incurvation.webp", "images/galop5-theme-connaissances.webp"],
  "g1-c6": ["images/connexion-cheval-oeil-hd.jpg", "images/securite-g1-inquiet.webp", "images/securite-g1-observer.webp"],
  "g1-c20": ["images/galop5-c04-anatomie.webp", "images/galop5-c05-soins.webp", "images/galop5-theme-cheval.webp"],
  "g1-c8": ["images/galop5-c02-embouchures.webp", "images/securite-g1-rangement.webp", "images/galop5-theme-cheval.webp"],
  "g1-c9": ["images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp", "images/galop5-c08-equilibre.webp"],
  "g1-c10": ["images/securite-g1-longe.webp", "images/securite-g1-rangement.webp"],
  "g1-c11": ["images/galop5-theme-connaissances.webp", "images/galop5-c03-apprendre.webp"],
  "g1-c12": ["images/galop5-c11-saut.webp", "images/galop5-c12-cross.webp"],
  "g1-c13": ["images/galop5-c12-cross.webp", "images/galop5-c11-saut.webp"],
  "g1-c16": ["images/galop5-c07-transport.webp", "images/galop5-c05-soins.webp", "images/galop5-th-cheval2.webp"],
  "g1-c17": ["images/cours-pansage-09_gestes_brossage.webp", "images/galop5-theme-cheval.webp", "images/galop5-c02-embouchures.webp", "images/galop5-c03-apprendre.webp"],
  "g1-c18": ["images/galop5-c06-travail-pied.webp", "images/securite-g1-longe.webp", "images/securite-g1-porte.webp"],
  "g2-aides": ["images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp", "images/galop5-c08-equilibre.webp", "images/galop5-theme-connaissances.webp"],
  "g2-depart": ["images/galop5-c08-equilibre.webp", "images/galop5-c09-incurvation.webp", "images/galop5-th-cheval2.webp"],
  "g2-c1": ["images/cours-pansage-09_gestes_brossage.webp", "images/galop5-c02-embouchures.webp", "images/galop5-c05-soins.webp"],
  "g2-c3": ["images/galop5-c09-incurvation.webp", "images/galop5-c10-cession.webp", "images/galop5-c08-equilibre.webp"],
  "g2-c4": ["images/galop5-c11-saut.webp", "images/galop5-c12-cross.webp", "images/galop5-th-cheval2.webp"],
  "g2-c5": ["images/galop5-c06-travail-pied.webp", "images/securite-g1-longe.webp", "images/securite-g1-porte.webp"],
  "g2-c6": ["images/connexion-cheval-oeil-hd.jpg", "images/galop5-c04-anatomie.webp", "images/robes-g1-trio.webp"],
  "g2-anatomie": ["images/galop5-c04-anatomie.webp", "images/galop5-c05-soins.webp", "images/galop5-theme-cheval.webp"],
  "g2-sens": ["images/connexion-cheval-oeil-hd.jpg", "images/securite-g1-inquiet.webp", "images/securite-g1-observer.webp"],
  "g2-vie-sociale": ["images/securite-g1-distance.webp", "images/galop5-th-cheval2.webp", "images/securite-g1-alezan.webp"],
  "g2-pansage": ["images/cours-pansage-09_gestes_brossage.webp", "images/cours-pansage-03_observer_approcher.webp", "images/galop5-c05-soins.webp"],
  "g2-filet-selle": ["images/galop5-c02-embouchures.webp", "images/securite-g1-rangement.webp", "images/galop5-theme-cheval.webp"],
  "g2-familles": ["images/galop5-c11-saut.webp", "images/galop5-c12-cross.webp", "images/galop5-c10-cession.webp"],
  "g2-heberger": ["images/galop5-th-cheval2.webp", "images/securite-g1-alezan.webp", "images/securite-g1-observer.webp"],
  "g1-c19": ["images/galop5-theme-connaissances.webp", "images/galop5-th-cheval2.webp", "images/galop5-c03-apprendre.webp", "images/securite-g1-chute.webp", "images/galop5-theme-cheval.webp", "images/galop5-c07-transport.webp"]
};
var AUTO_IDS = Object.keys(AUTO_IM);

/* =====================================================================================
   v6 — 31/10 18h50 : PARTIES MANQUANTES des cours générés (rédigées par ChatGPT à la demande de Blandine, validées par elle),
   14 langues. Ajoutées UNIQUEMENT là où le cours n'avait rien : conseil du coach, défi, Hey Baby, synthèse, phrase de fin,
   et découpage en chapitres des cours à une seule partie (chap : [titre, nombre de notions existantes regroupées], dans l'ordre).
   Le texte d'origine des cours n'est pas modifié. Ordre des langues : fr en es it ja de ar zh nl pt sv ru pl ko.
   ===================================================================================== */
var COMPL = {
  "g1-c5": {
    hb: [
      tt("Pourquoi est-ce que je perds parfois l'équilibre au trot ?", "Why do I sometimes lose my balance at the trot?", "¿Por qué a veces pierdo el equilibrio al trote?", "Perché a volte perdo l'equilibrio al trotto?", "速歩でときどきバランスをくずすのはなぜ？", "Warum verliere ich im Trab manchmal das Gleichgewicht?", "لماذا أفقد توازني أحيانًا في الخبب؟", "为什么我在快步时有时会失去平衡？", "Waarom verlies ik in draf soms mijn evenwicht?", "Por que às vezes perco o equilíbrio no trote?", "Varför tappar jag ibland balansen i trav?", "Почему я иногда теряю равновесие на рыси?", "Dlaczego czasem tracę równowagę w kłusie?", "왜 속보에서 가끔 균형을 잃을까?"),
      tt("Où dois-je regarder quand je monte à cheval ?", "Where should I look when I ride?", "¿Adónde debo mirar cuando monto?", "Dove devo guardare quando vado a cavallo?", "馬に乗っているとき、どこを見ればいい？", "Wohin soll ich beim Reiten schauen?", "إلى أين يجب أن أنظر عندما أركب؟", "骑马时我应该看哪里？", "Waar moet ik naar kijken als ik rijd?", "Para onde devo olhar quando monto?", "Vart ska jag titta när jag rider?", "Куда мне смотреть, когда я еду верхом?", "Gdzie mam patrzeć, kiedy jeżdżę konno?", "말을 탈 때 어디를 봐야 할까?"),
      tt("Comment savoir si mes étriers sont bien réglés ?", "How do I know if my stirrups are the right length?", "¿Cómo sé si mis estribos están bien ajustados?", "Come faccio a sapere se le mie staffe sono regolate bene?", "あぶみの長さが合っているかどうやってわかる？", "Woran erkenne ich, ob meine Steigbügel richtig eingestellt sind?", "كيف أعرف أن ركابيّ مضبوطان جيدًا؟", "怎么知道我的马镫调得合不合适？", "Hoe weet ik of mijn stijgbeugels goed afgesteld zijn?", "Como saber se meus estribos estão bem ajustados?", "Hur vet jag om mina stigbyglar är rätt inställda?", "Как понять, правильно ли подогнаны мои стремена?", "Skąd mam wiedzieć, czy strzemiona są dobrze ustawione?", "등자 길이가 잘 맞는지 어떻게 알 수 있을까?"),
      tt("Pourquoi mes mains doivent-elles rester souples ?", "Why should my hands stay soft?", "¿Por qué mis manos deben permanecer suaves?", "Perché le mie mani devono restare morbide?", "手をやわらかく保つのはなぜ？", "Warum sollen meine Hände weich bleiben?", "لماذا يجب أن تبقى يداي مرنتين؟", "为什么我的手要保持柔和？", "Waarom moeten mijn handen soepel blijven?", "Por que minhas mãos devem continuar leves?", "Varför ska mina händer vara mjuka?", "Почему мои руки должны оставаться мягкими?", "Dlaczego moje ręce mają pozostać miękkie?", "왜 손을 부드럽게 유지해야 할까?"),
      tt("Comment être plus à l'aise au galop sans me crisper ?", "How can I feel more at ease at the canter without tensing up?", "¿Cómo estar más cómodo al galope sin ponerme rígido?", "Come sentirmi più a mio agio al galoppo senza irrigidirmi?", "かたくならずに駈歩でもっと楽に乗るには？", "Wie fühle ich mich im Galopp wohler, ohne mich zu verkrampfen?", "كيف أكون أكثر راحة في العدو دون أن أتشنج؟", "怎样在跑步时更自在而不紧绷？", "Hoe voel ik me meer op mijn gemak in galop zonder te verkrampen?", "Como ficar mais à vontade no galope sem me contrair?", "Hur känner jag mig tryggare i galopp utan att spänna mig?", "Как чувствовать себя свободнее на галопе и не зажиматься?", "Jak czuć się swobodniej w galopie, nie spinając się?", "몸이 굳지 않고 구보에서 더 편해지려면?")
    ],
    synth: [
      tt("Ton corps accompagne les mouvements du cheval.", "Your body follows the horse's movements.", "Tu cuerpo acompaña los movimientos del caballo.", "Il tuo corpo accompagna i movimenti del cavallo.", "体は馬の動きについていく。", "Dein Körper begleitet die Bewegungen des Pferdes.", "جسمك يرافق حركات الحصان.", "你的身体跟随马的动作。", "Je lichaam volgt de bewegingen van het paard.", "Seu corpo acompanha os movimentos do cavalo.", "Din kropp följer hästens rörelser.", "Твоё тело сопровождает движения лошади.", "Twoje ciało podąża za ruchami konia.", "몸은 말의 움직임을 따라간다."),
      tt("Ton regard t'aide à garder ta direction.", "Your eyes help you keep your direction.", "Tu mirada te ayuda a mantener la dirección.", "Lo sguardo ti aiuta a mantenere la direzione.", "目線が進む方向を保つ助けになる。", "Dein Blick hilft dir, die Richtung zu halten.", "نظرك يساعدك على الحفاظ على اتجاهك.", "视线帮助你保持方向。", "Je blik helpt je de richting te houden.", "Seu olhar ajuda a manter a direção.", "Blicken hjälper dig att hålla riktningen.", "Взгляд помогает держать направление.", "Wzrok pomaga ci utrzymać kierunek.", "시선은 방향을 유지하도록 돕는다."),
      tt("Tes mains restent souples et tranquilles.", "Your hands stay soft and quiet.", "Tus manos permanecen suaves y tranquilas.", "Le tue mani restano morbide e tranquille.", "手はやわらかく、静かに。", "Deine Hände bleiben weich und ruhig.", "يداك تبقيان مرنتين وهادئتين.", "双手保持柔和、安静。", "Je handen blijven soepel en rustig.", "Suas mãos ficam leves e tranquilas.", "Dina händer är mjuka och lugna.", "Руки остаются мягкими и спокойными.", "Ręce pozostają miękkie i spokojne.", "손은 부드럽고 차분하게."),
      tt("Ton équilibre évolue selon l'allure.", "Your balance changes with the gait.", "Tu equilibrio cambia según el aire.", "Il tuo equilibrio cambia secondo l'andatura.", "バランスは歩法によって変わる。", "Dein Gleichgewicht ändert sich je nach Gangart.", "توازنك يتغيّر حسب المشية.", "平衡随步法而变化。", "Je evenwicht verandert met de gang.", "Seu equilíbrio muda conforme o andamento.", "Din balans ändras med gångarten.", "Равновесие меняется в зависимости от аллюра.", "Równowaga zmienia się zależnie od chodu.", "균형은 보법에 따라 달라진다."),
      tt("Une bonne position reste naturelle, jamais figée.", "A good position stays natural, never stiff.", "Una buena posición es natural, nunca rígida.", "Una buona posizione resta naturale, mai rigida.", "よい姿勢は自然で、かたまらない。", "Ein guter Sitz bleibt natürlich, nie steif.", "الوضعية الجيدة طبيعية، وليست متجمدة أبدًا.", "好的姿势自然，从不僵硬。", "Een goede houding blijft natuurlijk, nooit stijf.", "Uma boa posição é natural, nunca rígida.", "En bra sits är naturlig, aldrig stel.", "Хорошая посадка естественна, а не скована.", "Dobry dosiad jest naturalny, nigdy sztywny.", "좋은 자세는 자연스럽고 굳지 않는다.")
    ],
    fin: tt("Être bien à cheval, c'est apprendre à bouger avec lui, sans jamais perdre son équilibre.", "Riding well means learning to move with your horse, without ever losing your balance.", "Estar bien a caballo es aprender a moverse con él, sin perder nunca el equilibrio.", "Stare bene a cavallo significa imparare a muoversi con lui, senza mai perdere l'equilibrio.", "うまく乗るとは、バランスをくずさずに馬といっしょに動けるようになること。", "Gut im Sattel sitzen heißt, sich mit dem Pferd zu bewegen, ohne je das Gleichgewicht zu verlieren.", "أن تكون مرتاحًا على الحصان يعني أن تتعلم التحرك معه دون أن تفقد توازنك أبدًا.", "骑得好，就是学会与马一起移动，始终不失去平衡。", "Goed te paard zitten betekent leren met hem mee te bewegen, zonder ooit je evenwicht te verliezen.", "Estar bem a cavalo é aprender a se mover com ele, sem nunca perder o equilíbrio.", "Att sitta bra på hästen är att lära sig röra sig med den, utan att någonsin tappa balansen.", "Хорошо сидеть на лошади — значит научиться двигаться вместе с ней, не теряя равновесия.", "Dobrze siedzieć na koniu to nauczyć się poruszać razem z nim, nigdy nie tracąc równowagi.", "말을 잘 탄다는 것은 균형을 잃지 않고 말과 함께 움직이는 법을 배우는 것이다.")
  },
  "g1-c6": {
    hb: [
      tt("Comment savoir si un cheval souhaite rester tranquille ?", "How can I tell if a horse wants to be left alone?", "¿Cómo saber si un caballo quiere estar tranquilo?", "Come capire se un cavallo vuole restare tranquillo?", "馬がそっとしておいてほしいとき、どうやってわかる？", "Woran erkenne ich, dass ein Pferd seine Ruhe haben möchte?", "كيف أعرف أن الحصان يريد أن يبقى هادئًا؟", "怎么知道一匹马想安静待着？", "Hoe weet ik of een paard met rust gelaten wil worden?", "Como saber se um cavalo quer ficar tranquilo?", "Hur vet jag om en häst vill vara i fred?", "Как понять, что лошадь хочет побыть в покое?", "Skąd wiem, że koń chce mieć spokój?", "말이 혼자 조용히 있고 싶어 하는지 어떻게 알까?"),
      tt("Pourquoi un cheval bouge-t-il ses oreilles sans arrêt ?", "Why does a horse keep moving its ears?", "¿Por qué un caballo mueve las orejas sin parar?", "Perché un cavallo muove continuamente le orecchie?", "馬が耳をずっと動かしているのはなぜ？", "Warum bewegt ein Pferd ständig seine Ohren?", "لماذا يحرّك الحصان أذنيه باستمرار؟", "马为什么不停地动耳朵？", "Waarom beweegt een paard steeds zijn oren?", "Por que um cavalo mexe as orelhas sem parar?", "Varför rör en häst hela tiden på öronen?", "Почему лошадь постоянно двигает ушами?", "Dlaczego koń bez przerwy rusza uszami?", "말은 왜 귀를 계속 움직일까?"),
      tt("Un cheval peut-il être inquiet sans bouger ?", "Can a horse be worried without moving?", "¿Puede un caballo estar inquieto sin moverse?", "Un cavallo può essere preoccupato senza muoversi?", "馬は動かなくても不安なことがある？", "Kann ein Pferd beunruhigt sein, ohne sich zu bewegen?", "هل يمكن أن يكون الحصان قلقًا دون أن يتحرك؟", "马会不会一动不动却很不安？", "Kan een paard ongerust zijn zonder te bewegen?", "Um cavalo pode estar inquieto sem se mexer?", "Kan en häst vara orolig utan att röra sig?", "Может ли лошадь тревожиться, не двигаясь?", "Czy koń może być niespokojny, choć się nie rusza?", "말이 움직이지 않으면서도 불안할 수 있을까?"),
      tt("Comment lui montrer que je suis calme et rassurant ?", "How can I show it that I'm calm and reassuring?", "¿Cómo mostrarle que estoy tranquilo y le doy confianza?", "Come mostrargli che sono calmo e rassicurante?", "落ち着いていて安心できる相手だと、どう伝えればいい？", "Wie zeige ich ihm, dass ich ruhig und beruhigend bin?", "كيف أُظهر له أنني هادئ ومطمئن؟", "怎样让它知道我很冷静、让它安心？", "Hoe laat ik zien dat ik rustig en geruststellend ben?", "Como mostrar a ele que estou calmo e passo segurança?", "Hur visar jag att jag är lugn och trygg?", "Как показать ей, что я спокоен и надёжен?", "Jak pokazać mu, że jestem spokojny i budzę zaufanie?", "내가 차분하고 믿을 만하다는 걸 어떻게 보여 줄까?"),
      tt("Que faire si je ne comprends pas ce qu'il exprime ?", "What should I do if I don't understand what it's showing?", "¿Qué hago si no entiendo lo que expresa?", "Cosa fare se non capisco cosa esprime?", "馬が何を伝えているかわからないときは？", "Was tue ich, wenn ich nicht verstehe, was es ausdrückt?", "ماذا أفعل إذا لم أفهم ما يعبّر عنه؟", "如果我看不懂它在表达什么，该怎么办？", "Wat doe ik als ik niet begrijp wat het uitdrukt?", "O que fazer se eu não entender o que ele expressa?", "Vad gör jag om jag inte förstår vad den uttrycker?", "Что делать, если я не понимаю, что она выражает?", "Co zrobić, jeśli nie rozumiem, co wyraża?", "말이 무엇을 표현하는지 모르겠으면 어떻게 할까?")
    ],
    synth: [
      tt("Le cheval communique sans utiliser de mots.", "Horses communicate without words.", "El caballo se comunica sin palabras.", "Il cavallo comunica senza parole.", "馬はことばを使わずに伝える。", "Das Pferd kommuniziert ohne Worte.", "الحصان يتواصل دون كلمات.", "马不用语言也能交流。", "Het paard communiceert zonder woorden.", "O cavalo se comunica sem palavras.", "Hästen kommunicerar utan ord.", "Лошадь общается без слов.", "Koń komunikuje się bez słów.", "말은 말없이 소통한다."),
      tt("Chaque attitude peut donner un indice.", "Every posture can give a clue.", "Cada actitud puede dar una pista.", "Ogni atteggiamento può dare un indizio.", "どの姿勢もヒントになる。", "Jede Haltung kann einen Hinweis geben.", "كل وضعية قد تعطي دليلًا.", "每个姿态都可能是线索。", "Elke houding kan een aanwijzing geven.", "Cada atitude pode dar uma pista.", "Varje hållning kan ge en ledtråd.", "Каждая поза может быть подсказкой.", "Każda postawa może być wskazówką.", "모든 자세가 단서가 될 수 있다."),
      tt("Un seul signe ne suffit pas toujours.", "One sign alone isn't always enough.", "Una sola señal no siempre basta.", "Un solo segnale non sempre basta.", "サインひとつだけでは足りないこともある。", "Ein einzelnes Zeichen reicht nicht immer.", "علامة واحدة لا تكفي دائمًا.", "单一信号并不总是足够。", "Eén teken is niet altijd genoeg.", "Um único sinal nem sempre basta.", "Ett enda tecken räcker inte alltid.", "Одного признака не всегда достаточно.", "Jeden sygnał nie zawsze wystarczy.", "신호 하나로는 늘 충분하지 않다."),
      tt("Le contexte aide à comprendre ses réactions.", "Context helps you understand its reactions.", "El contexto ayuda a entender sus reacciones.", "Il contesto aiuta a capire le sue reazioni.", "状況が反応を理解する助けになる。", "Der Zusammenhang hilft, seine Reaktionen zu verstehen.", "السياق يساعد على فهم ردود فعله.", "情境有助于理解它的反应。", "De context helpt zijn reacties te begrijpen.", "O contexto ajuda a entender suas reações.", "Sammanhanget hjälper dig förstå reaktionerna.", "Обстановка помогает понять её реакции.", "Kontekst pomaga zrozumieć jego reakcje.", "상황을 보면 반응을 이해하기 쉽다."),
      tt("Observer attentivement permet de mieux communiquer.", "Watching closely helps you communicate better.", "Observar con atención permite comunicar mejor.", "Osservare con attenzione aiuta a comunicare meglio.", "よく観察すると、もっと通じ合える。", "Aufmerksames Beobachten hilft, besser zu kommunizieren.", "الملاحظة الدقيقة تساعد على تواصل أفضل.", "仔细观察能更好地沟通。", "Goed observeren helpt beter te communiceren.", "Observar com atenção ajuda a se comunicar melhor.", "Att iaktta noga hjälper er att kommunicera bättre.", "Внимательное наблюдение помогает лучше общаться.", "Uważna obserwacja pomaga lepiej się porozumieć.", "주의 깊게 관찰하면 더 잘 소통할 수 있다.")
    ],
    fin: tt("Plus tu apprends à écouter ton cheval avec les yeux, plus votre confiance grandit.", "The more you learn to listen to your horse with your eyes, the more your trust grows.", "Cuanto más aprendes a escuchar a tu caballo con los ojos, más crece vuestra confianza.", "Più impari ad ascoltare il tuo cavallo con gli occhi, più cresce la vostra fiducia.", "目で馬の声を聞けるようになるほど、信頼は深まっていく。", "Je mehr du lernst, dein Pferd mit den Augen zu hören, desto mehr wächst euer Vertrauen.", "كلما تعلّمت أن تُصغي إلى حصانك بعينيك، نمت الثقة بينكما.", "你越学会用眼睛倾听你的马，你们的信任就越深。", "Hoe meer je leert met je ogen naar je paard te luisteren, hoe meer jullie vertrouwen groeit.", "Quanto mais você aprende a ouvir seu cavalo com os olhos, mais a confiança entre vocês cresce.", "Ju mer du lär dig lyssna på din häst med ögonen, desto mer växer ert förtroende.", "Чем лучше ты учишься слушать свою лошадь глазами, тем крепче ваше доверие.", "Im lepiej uczysz się słuchać konia oczami, tym bardziej rośnie wasze zaufanie.", "눈으로 말의 이야기를 듣는 법을 배울수록 둘의 신뢰는 깊어진다.")
  },
  "g1-c20": {
    defi: {
      titre: tt("Explorateur du corps", "Body explorer", "Explorador del cuerpo", "Esploratore del corpo", "からだの探検家", "Körper-Entdecker", "مستكشف الجسم", "身体探索者", "Lichaamsontdekker", "Explorador do corpo", "Kroppsutforskare", "Исследователь тела", "Odkrywca ciała", "몸 탐험가"),
      accroche: tt("Avec ton enseignant, découvre comment le corps d'un cheval fonctionne, simplement en l'observant au repos.", "With your instructor, find out how a horse's body works, just by watching it at rest.", "Con tu profesor, descubre cómo funciona el cuerpo de un caballo, simplemente observándolo en reposo.", "Con il tuo istruttore, scopri come funziona il corpo di un cavallo, semplicemente osservandolo a riposo.", "先生といっしょに、休んでいる馬を見るだけで、そのからだのしくみを見つけよう。", "Entdecke mit deinem Reitlehrer, wie der Körper eines Pferdes funktioniert – einfach, indem du es in Ruhe beobachtest.", "مع مدرّبك، اكتشف كيف يعمل جسم الحصان بمجرد مراقبته وهو مرتاح.", "和你的教练一起，只需观察休息中的马，就能了解它的身体如何运作。", "Ontdek samen met je instructeur hoe het lichaam van een paard werkt, gewoon door het in rust te observeren.", "Com seu instrutor, descubra como funciona o corpo de um cavalo, só observando-o em repouso.", "Upptäck med din instruktör hur hästens kropp fungerar, bara genom att titta på den i vila.", "Вместе с тренером узнай, как устроено тело лошади, просто наблюдая за ней в покое.", "Z instruktorem odkryj, jak działa ciało konia, po prostu obserwując go w spoczynku.", "선생님과 함께 쉬고 있는 말을 관찰하며 말의 몸이 어떻게 작동하는지 알아보자."),
      points: [
        tt("Repère une articulation visible sur un cheval immobile.", "Spot a visible joint on a horse standing still.", "Localiza una articulación visible en un caballo quieto.", "Individua un'articolazione visibile su un cavallo fermo.", "じっとしている馬で、見える関節をひとつ見つけよう。", "Finde ein sichtbares Gelenk an einem stehenden Pferd.", "حدّد مفصلًا ظاهرًا على حصان واقف بلا حركة.", "在静止的马身上找出一个看得见的关节。", "Zoek een zichtbaar gewricht bij een stilstaand paard.", "Encontre uma articulação visível em um cavalo parado.", "Hitta en synlig led på en häst som står still.", "Найди видимый сустав у стоящей лошади.", "Wskaż widoczny staw u stojącego konia.", "가만히 서 있는 말에서 보이는 관절 하나를 찾아보자."),
        tt("Observe les mouvements de ses flancs quand il respire.", "Watch its flanks move as it breathes.", "Observa el movimiento de sus flancos cuando respira.", "Osserva il movimento dei suoi fianchi quando respira.", "呼吸するときの、わき腹の動きを観察しよう。", "Beobachte, wie sich seine Flanken beim Atmen bewegen.", "راقب حركة خاصرتيه عندما يتنفس.", "观察它呼吸时腹侧的起伏。", "Kijk hoe zijn flanken bewegen als hij ademt.", "Observe o movimento dos flancos quando ele respira.", "Titta på hur flankerna rör sig när den andas.", "Понаблюдай, как двигаются её бока при дыхании.", "Obserwuj ruch jego boków, gdy oddycha.", "숨 쉴 때 옆구리가 어떻게 움직이는지 관찰하자."),
        tt("Retrouve sur l'affiche trois parties de son corps.", "Find three parts of its body on the poster.", "Encuentra en el póster tres partes de su cuerpo.", "Ritrova sul poster tre parti del suo corpo.", "ポスターで、からだの部位を3つ見つけよう。", "Finde auf dem Poster drei Körperteile.", "اعثر على الملصق على ثلاثة أجزاء من جسمه.", "在海报上找出它身体的三个部位。", "Zoek op de poster drie lichaamsdelen.", "Encontre no pôster três partes do corpo dele.", "Hitta tre kroppsdelar på affischen.", "Найди на плакате три части её тела.", "Odszukaj na plakacie trzy części jego ciała.", "포스터에서 말의 몸 부위 세 곳을 찾아보자.")
      ]
    },
    hb: [
      tt("Pourquoi les os du cheval sont-ils aussi solides ?", "Why are a horse's bones so strong?", "¿Por qué los huesos del caballo son tan fuertes?", "Perché le ossa del cavallo sono così robuste?", "馬の骨はどうしてそんなにじょうぶなの？", "Warum sind die Knochen des Pferdes so stabil?", "لماذا عظام الحصان قوية إلى هذا الحد؟", "马的骨头为什么这么结实？", "Waarom zijn de botten van een paard zo sterk?", "Por que os ossos do cavalo são tão resistentes?", "Varför är hästens skelett så starkt?", "Почему кости лошади такие крепкие?", "Dlaczego kości konia są tak mocne?", "말의 뼈는 왜 그렇게 튼튼할까?"),
      tt("À quoi sert le mouvement du pied pour la circulation ?", "How does the movement of the hoof help circulation?", "¿Para qué sirve el movimiento del pie en la circulación?", "A cosa serve il movimento del piede per la circolazione?", "ひづめの動きは血のめぐりにどう役立つの？", "Wozu dient die Bewegung des Hufs für den Kreislauf?", "ما فائدة حركة الحافر في الدورة الدموية؟", "蹄的动作对血液循环有什么作用？", "Waarvoor dient de beweging van de hoef voor de bloedsomloop?", "Para que serve o movimento do casco na circulação?", "Hur hjälper hovens rörelse blodcirkulationen?", "Как движение копыта помогает кровообращению?", "Do czego służy ruch kopyta w krążeniu krwi?", "발굽의 움직임은 혈액 순환에 어떤 도움을 줄까?"),
      tt("Pourquoi le cheval respire-t-il plus vite après un effort ?", "Why does a horse breathe faster after exercise?", "¿Por qué el caballo respira más rápido después de un esfuerzo?", "Perché il cavallo respira più velocemente dopo uno sforzo?", "運動のあと、馬の呼吸が速くなるのはなぜ？", "Warum atmet das Pferd nach einer Anstrengung schneller?", "لماذا يتنفس الحصان أسرع بعد المجهود؟", "为什么马运动后呼吸会变快？", "Waarom ademt een paard sneller na inspanning?", "Por que o cavalo respira mais rápido depois de um esforço?", "Varför andas hästen snabbare efter ansträngning?", "Почему лошадь дышит чаще после нагрузки?", "Dlaczego koń oddycha szybciej po wysiłku?", "운동 후에 말은 왜 숨을 더 빨리 쉴까?"),
      tt("Pourquoi doit-il manger de petites quantités régulièrement ?", "Why does it need to eat small amounts often?", "¿Por qué debe comer pequeñas cantidades con regularidad?", "Perché deve mangiare piccole quantità regolarmente?", "どうして少しずつ何度も食べる必要があるの？", "Warum muss es regelmäßig kleine Mengen fressen?", "لماذا يجب أن يأكل كميات صغيرة بانتظام؟", "为什么它需要少量多次地进食？", "Waarom moet hij regelmatig kleine hoeveelheden eten?", "Por que ele precisa comer pequenas quantidades com frequência?", "Varför behöver den äta små mängder ofta?", "Почему ей нужно есть понемногу и регулярно?", "Dlaczego musi jeść małe ilości regularnie?", "왜 조금씩 자주 먹어야 할까?"),
      tt("Pourquoi ses membres avant supportent-ils autant de poids ?", "Why do its front legs carry so much weight?", "¿Por qué sus extremidades delanteras soportan tanto peso?", "Perché i suoi arti anteriori sostengono così tanto peso?", "前肢が体重の多くを支えているのはなぜ？", "Warum tragen seine Vorderbeine so viel Gewicht?", "لماذا تحمل قوائمه الأمامية هذا القدر من الوزن؟", "为什么它的前肢承受这么多重量？", "Waarom dragen zijn voorbenen zoveel gewicht?", "Por que os membros anteriores suportam tanto peso?", "Varför bär frambenen så mycket av vikten?", "Почему передние ноги несут столько веса?", "Dlaczego przednie kończyny dźwigają tyle ciężaru?", "앞다리는 왜 그렇게 많은 무게를 지탱할까?")
    ],
    synth: [
      tt("Le squelette soutient tout le corps.", "The skeleton supports the whole body.", "El esqueleto sostiene todo el cuerpo.", "Lo scheletro sostiene tutto il corpo.", "骨格がからだ全体を支える。", "Das Skelett trägt den ganzen Körper.", "الهيكل العظمي يدعم الجسم كله.", "骨骼支撑整个身体。", "Het skelet draagt het hele lichaam.", "O esqueleto sustenta todo o corpo.", "Skelettet bär hela kroppen.", "Скелет поддерживает всё тело.", "Szkielet podtrzymuje całe ciało.", "골격이 몸 전체를 지탱한다."),
      tt("Les pieds participent à la circulation sanguine.", "The hooves help blood circulation.", "Los pies participan en la circulación sanguínea.", "I piedi partecipano alla circolazione sanguigna.", "ひづめは血のめぐりを助ける。", "Die Hufe unterstützen den Blutkreislauf.", "الحوافر تساهم في الدورة الدموية.", "蹄参与血液循环。", "De hoeven helpen de bloedsomloop.", "Os cascos ajudam a circulação sanguínea.", "Hovarna hjälper blodcirkulationen.", "Копыта участвуют в кровообращении.", "Kopyta wspomagają krążenie krwi.", "발굽은 혈액 순환을 돕는다."),
      tt("La respiration apporte l'oxygène nécessaire.", "Breathing brings the oxygen it needs.", "La respiración aporta el oxígeno necesario.", "La respirazione porta l'ossigeno necessario.", "呼吸が必要な酸素を運ぶ。", "Die Atmung liefert den nötigen Sauerstoff.", "التنفس يمدّ الجسم بالأكسجين اللازم.", "呼吸提供所需的氧气。", "De ademhaling levert de nodige zuurstof.", "A respiração traz o oxigênio necessário.", "Andningen ger syret som behövs.", "Дыхание даёт нужный кислород.", "Oddychanie dostarcza potrzebnego tlenu.", "호흡은 필요한 산소를 공급한다."),
      tt("La digestion transforme les aliments en énergie.", "Digestion turns food into energy.", "La digestión transforma los alimentos en energía.", "La digestione trasforma il cibo in energia.", "消化は食べ物をエネルギーに変える。", "Die Verdauung macht aus Futter Energie.", "الهضم يحوّل الطعام إلى طاقة.", "消化把食物转化为能量。", "De spijsvertering zet voedsel om in energie.", "A digestão transforma os alimentos em energia.", "Matsmältningen gör maten till energi.", "Пищеварение превращает корм в энергию.", "Trawienie zamienia pokarm w energię.", "소화는 먹이를 에너지로 바꾼다."),
      tt("Le poids du cheval est inégalement réparti.", "A horse's weight is unevenly distributed.", "El peso del caballo está repartido de forma desigual.", "Il peso del cavallo è distribuito in modo diseguale.", "馬の体重は均等に分かれていない。", "Das Gewicht des Pferdes ist ungleich verteilt.", "وزن الحصان موزّع بشكل غير متساوٍ.", "马的体重分布并不均匀。", "Het gewicht van het paard is ongelijk verdeeld.", "O peso do cavalo é distribuído de forma desigual.", "Hästens vikt är ojämnt fördelad.", "Вес лошади распределён неравномерно.", "Ciężar konia jest rozłożony nierówno.", "말의 체중은 고르게 나뉘어 있지 않다.")
    ],
    fin: tt("Comprendre ce qui se passe sous sa peau, c'est déjà apprendre à mieux prendre soin de lui.", "Understanding what happens under its skin is already learning to take better care of it.", "Entender lo que pasa bajo su piel ya es aprender a cuidarlo mejor.", "Capire cosa succede sotto la sua pelle è già imparare a prendersene cura meglio.", "皮ふの下で何が起きているかを知ることは、もっと上手に世話をする第一歩。", "Zu verstehen, was unter seiner Haut passiert, heißt schon, besser für es zu sorgen.", "أن تفهم ما يحدث تحت جلده يعني أنك بدأت تتعلم كيف تعتني به أفضل.", "了解它皮肤之下发生的事，就是学会更好照顾它的开始。", "Begrijpen wat er onder zijn huid gebeurt, is al leren beter voor hem te zorgen.", "Entender o que acontece sob a pele dele já é aprender a cuidar melhor dele.", "Att förstå vad som händer under huden är redan att lära sig ta bättre hand om den.", "Понимать, что происходит у неё под кожей, — значит уже учиться лучше о ней заботиться.", "Zrozumieć, co dzieje się pod jego skórą, to już uczyć się lepiej o niego dbać.", "피부 아래에서 일어나는 일을 이해하는 것이 말을 더 잘 돌보는 첫걸음이다."),
    chap: [
      [tt("Découvrir son corps", "Discovering its body", "Descubrir su cuerpo", "Scoprire il suo corpo", "からだを知る", "Seinen Körper entdecken", "اكتشاف جسمه", "认识它的身体", "Zijn lichaam ontdekken", "Descobrir o corpo dele", "Upptäck kroppen", "Знакомство с телом", "Poznaj jego ciało", "말의 몸 알아보기"), 2],
      [tt("Un organisme en action", "A body in action", "Un organismo en acción", "Un organismo in azione", "はたらくからだ", "Ein Körper in Aktion", "جسم في حركة", "运转中的身体", "Een lichaam in actie", "Um organismo em ação", "En kropp i arbete", "Организм в действии", "Organizm w działaniu", "움직이는 몸"), 3],
      [tt("Comprendre sa silhouette", "Understanding its build", "Comprender su silueta", "Capire la sua figura", "体形を知る", "Seinen Körperbau verstehen", "فهم قوامه", "了解它的体型", "Zijn bouw begrijpen", "Entender a silhueta dele", "Förstå kroppsformen", "Понять телосложение", "Zrozum jego sylwetkę", "말의 체형 이해하기"), 2]
    ]
  },
  "g1-c8": {
    defi: {
      titre: tt("Mission sellerie", "Tack room mission", "Misión guadarnés", "Missione selleria", "馬具室ミッション", "Mission Sattelkammer", "مهمة غرفة السروج", "鞍具房任务", "Missie zadelkamer", "Missão selaria", "Uppdrag sadelkammare", "Миссия: амуничник", "Misja siodlarnia", "마구실 미션"),
      accroche: tt("Avec ton enseignant, explore la sellerie et découvre comment prendre soin du matériel.", "With your instructor, explore the tack room and find out how to look after the equipment.", "Con tu profesor, explora el guadarnés y descubre cómo cuidar el material.", "Con il tuo istruttore, esplora la selleria e scopri come prenderti cura dell'attrezzatura.", "先生といっしょに馬具室を探検し、道具の手入れのしかたを知ろう。", "Erkunde mit deinem Reitlehrer die Sattelkammer und entdecke, wie man die Ausrüstung pflegt.", "مع مدرّبك، استكشف غرفة السروج واكتشف كيف تعتني بالمعدات.", "和教练一起探索鞍具房，了解如何保养马具。", "Verken met je instructeur de zadelkamer en ontdek hoe je voor het materiaal zorgt.", "Com seu instrutor, explore a selaria e descubra como cuidar do material.", "Utforska sadelkammaren med din instruktör och upptäck hur man sköter utrustningen.", "Вместе с тренером исследуй амуничник и узнай, как ухаживать за снаряжением.", "Z instruktorem zbadaj siodlarnię i dowiedz się, jak dbać o sprzęt.", "선생님과 함께 마구실을 둘러보며 장비 관리법을 알아보자."),
      points: [
        tt("Trouve un élément en cuir et un élément en tissu.", "Find one leather item and one fabric item.", "Encuentra una pieza de cuero y una de tela.", "Trova un elemento in cuoio e uno in tessuto.", "革の道具と布の道具をひとつずつ見つけよう。", "Finde ein Teil aus Leder und eines aus Stoff.", "اعثر على قطعة من الجلد وقطعة من القماش.", "找出一件皮制和一件布制的马具。", "Zoek een onderdeel van leer en een van stof.", "Encontre uma peça de couro e uma de tecido.", "Hitta en sak i läder och en i tyg.", "Найди одну вещь из кожи и одну из ткани.", "Znajdź element ze skóry i element z tkaniny.", "가죽으로 된 것 하나와 천으로 된 것 하나를 찾아보자."),
        tt("Repère une pièce qui doit être adaptée à la taille du cheval.", "Spot a piece that must fit the horse's size.", "Localiza una pieza que debe adaptarse al tamaño del caballo.", "Individua un pezzo che deve essere adatto alla taglia del cavallo.", "馬の大きさに合わせる必要がある道具を見つけよう。", "Finde ein Teil, das zur Größe des Pferdes passen muss.", "حدّد قطعة يجب أن تناسب حجم الحصان.", "找出一件必须适合马体型的装备。", "Zoek een onderdeel dat bij de maat van het paard moet passen.", "Encontre uma peça que precisa ser adequada ao tamanho do cavalo.", "Hitta en del som måste passa hästens storlek.", "Найди деталь, которая должна подходить лошади по размеру.", "Wskaż element, który musi pasować do rozmiaru konia.", "말의 크기에 맞춰야 하는 장비를 찾아보자."),
        tt("Range correctement un équipement après utilisation.", "Put a piece of equipment away properly after use.", "Guarda correctamente un equipo después de usarlo.", "Riponi correttamente un'attrezzatura dopo l'uso.", "使ったあとの道具を正しく片づけよう。", "Räume ein Ausrüstungsteil nach dem Gebrauch richtig auf.", "رتّب قطعة من المعدات بشكل صحيح بعد استعمالها.", "用完后把一件装备正确收好。", "Ruim een uitrustingsstuk na gebruik goed op.", "Guarde corretamente um equipamento depois de usar.", "Ställ undan en utrustning ordentligt efter användning.", "Правильно убери снаряжение после использования.", "Odłóż prawidłowo sprzęt po użyciu.", "사용한 장비를 제자리에 바르게 정리하자.")
      ]
    },
    hb: [
      tt("Pourquoi existe-t-il plusieurs tailles de selles ?", "Why are there different saddle sizes?", "¿Por qué hay sillas de varios tamaños?", "Perché esistono selle di diverse misure?", "鞍にいろいろなサイズがあるのはなぜ？", "Warum gibt es verschiedene Sattelgrößen?", "لماذا توجد مقاسات مختلفة للسروج؟", "为什么马鞍有不同尺寸？", "Waarom bestaan er verschillende zadelmaten?", "Por que existem vários tamanhos de sela?", "Varför finns det olika sadelstorlekar?", "Почему бывают сёдла разных размеров?", "Dlaczego istnieją siodła w różnych rozmiarach?", "안장은 왜 여러 크기가 있을까?"),
      tt("Comment savoir si une pièce de matériel est abîmée ?", "How can I tell if a piece of equipment is damaged?", "¿Cómo saber si una pieza del material está dañada?", "Come capire se un pezzo dell'attrezzatura è rovinato?", "道具が傷んでいるかどうか、どうやってわかる？", "Woran erkenne ich, dass ein Ausrüstungsteil beschädigt ist?", "كيف أعرف أن قطعة من المعدات تالفة؟", "怎么判断一件装备是否损坏？", "Hoe weet ik of een onderdeel beschadigd is?", "Como saber se uma peça do material está danificada?", "Hur ser jag om en utrustning är skadad?", "Как понять, что снаряжение повреждено?", "Jak poznać, że element sprzętu jest uszkodzony?", "장비가 망가졌는지 어떻게 알 수 있을까?"),
      tt("À quoi servent les étrivières sur une selle ?", "What are the stirrup leathers on a saddle for?", "¿Para qué sirven las aciones de la silla?", "A cosa servono gli staffili sulla sella?", "鞍のあぶみ革は何のためにあるの？", "Wozu dienen die Steigbügelriemen am Sattel?", "ما فائدة سيور الركاب في السرج؟", "马镫皮带在马鞍上有什么用？", "Waarvoor dienen de stijgbeugelriemen aan een zadel?", "Para que servem os loros na sela?", "Vad är stigläderna på sadeln till för?", "Для чего на седле путлища?", "Do czego służą puśliska przy siodle?", "안장의 등자끈은 무엇에 쓰일까?"),
      tt("Pourquoi faut-il entretenir régulièrement les cuirs ?", "Why should leather be cared for regularly?", "¿Por qué hay que cuidar los cueros con regularidad?", "Perché bisogna curare regolarmente i cuoi?", "革の手入れを定期的にするのはなぜ？", "Warum muss man Leder regelmäßig pflegen?", "لماذا يجب العناية بالجلود بانتظام؟", "为什么要定期保养皮具？", "Waarom moet leer regelmatig onderhouden worden?", "Por que é preciso cuidar dos couros regularmente?", "Varför ska lädret skötas regelbundet?", "Почему за кожей нужно регулярно ухаживать?", "Dlaczego trzeba regularnie konserwować skóry?", "가죽은 왜 정기적으로 관리해야 할까?"),
      tt("Qui doit vérifier que le matériel convient au cheval ?", "Who should check that the equipment suits the horse?", "¿Quién debe comprobar que el material conviene al caballo?", "Chi deve verificare che l'attrezzatura sia adatta al cavallo?", "道具が馬に合っているか、だれが確かめるの？", "Wer muss prüfen, ob die Ausrüstung zum Pferd passt?", "من يجب أن يتحقق من أن المعدات تناسب الحصان؟", "谁应该检查装备是否适合这匹马？", "Wie moet controleren of het materiaal bij het paard past?", "Quem deve verificar se o material serve para o cavalo?", "Vem ska kontrollera att utrustningen passar hästen?", "Кто должен проверить, что снаряжение подходит лошади?", "Kto powinien sprawdzić, czy sprzęt pasuje do konia?", "장비가 말에게 맞는지 누가 확인해야 할까?")
    ],
    synth: [
      tt("Chaque équipement a une fonction précise.", "Each piece of equipment has a specific job.", "Cada equipo tiene una función precisa.", "Ogni attrezzatura ha una funzione precisa.", "道具にはそれぞれ役目がある。", "Jedes Ausrüstungsteil hat eine genaue Aufgabe.", "لكل قطعة من المعدات وظيفة محددة.", "每件装备都有明确的作用。", "Elk onderdeel heeft een precieze functie.", "Cada equipamento tem uma função precisa.", "Varje utrustning har en tydlig uppgift.", "У каждого снаряжения своя задача.", "Każdy element sprzętu ma określoną funkcję.", "장비마다 정해진 역할이 있다."),
      tt("Le matériel doit être adapté au cheval.", "Equipment must fit the horse.", "El material debe adaptarse al caballo.", "L'attrezzatura deve essere adatta al cavallo.", "道具は馬に合っていなければならない。", "Die Ausrüstung muss zum Pferd passen.", "يجب أن تناسب المعدات الحصان.", "装备必须适合这匹马。", "Het materiaal moet bij het paard passen.", "O material deve ser adequado ao cavalo.", "Utrustningen måste passa hästen.", "Снаряжение должно подходить лошади.", "Sprzęt musi pasować do konia.", "장비는 말에게 맞아야 한다."),
      tt("Les différentes pièces travaillent ensemble.", "The different parts work together.", "Las distintas piezas trabajan juntas.", "I diversi pezzi lavorano insieme.", "それぞれの部品がいっしょにはたらく。", "Die einzelnen Teile arbeiten zusammen.", "القطع المختلفة تعمل معًا.", "各个部件协同工作。", "De verschillende onderdelen werken samen.", "As diferentes peças trabalham juntas.", "De olika delarna samverkar.", "Разные детали работают вместе.", "Poszczególne części współpracują ze sobą.", "여러 부품이 함께 작동한다."),
      tt("Un équipement abîmé peut devenir dangereux.", "Damaged equipment can become dangerous.", "Un equipo dañado puede ser peligroso.", "Un'attrezzatura rovinata può diventare pericolosa.", "傷んだ道具は危険になることがある。", "Beschädigte Ausrüstung kann gefährlich werden.", "المعدات التالفة قد تصبح خطيرة.", "损坏的装备可能变得危险。", "Beschadigd materiaal kan gevaarlijk worden.", "Um equipamento danificado pode ficar perigoso.", "Skadad utrustning kan bli farlig.", "Повреждённое снаряжение может стать опасным.", "Uszkodzony sprzęt może być niebezpieczny.", "망가진 장비는 위험할 수 있다."),
      tt("Ranger et entretenir fait partie des bons soins.", "Tidying and cleaning are part of good care.", "Ordenar y mantener forma parte de los buenos cuidados.", "Riporre e curare fa parte delle buone cure.", "片づけと手入れも大切な世話のひとつ。", "Aufräumen und Pflegen gehören zur guten Fürsorge.", "الترتيب والعناية جزء من الرعاية الجيدة.", "整理和保养也是良好照料的一部分。", "Opruimen en onderhouden horen bij goede zorg.", "Guardar e conservar faz parte dos bons cuidados.", "Att städa och sköta är en del av god omvårdnad.", "Убирать и ухаживать — часть хорошей заботы.", "Sprzątanie i konserwacja to część dobrej opieki.", "정리와 손질도 좋은 돌봄의 일부다.")
    ],
    fin: tt("Un cavalier soigne aussi ce qu'il utilise : le respect du cheval commence bien avant de monter.", "A rider also looks after what they use: respect for the horse starts long before riding.", "Un jinete también cuida lo que usa: el respeto al caballo empieza mucho antes de montar.", "Un cavaliere si prende cura anche di ciò che usa: il rispetto del cavallo inizia molto prima di montare.", "乗り手は使う道具も大切にする。馬への思いやりは、乗るずっと前から始まっている。", "Ein Reiter pflegt auch, was er benutzt: Respekt vor dem Pferd beginnt lange vor dem Aufsteigen.", "الفارس يعتني أيضًا بما يستعمله: احترام الحصان يبدأ قبل الركوب بوقت طويل.", "骑手也会爱护自己使用的东西：对马的尊重早在上马前就开始了。", "Een ruiter zorgt ook voor wat hij gebruikt: respect voor het paard begint lang voor het opstappen.", "Um cavaleiro também cuida do que usa: o respeito ao cavalo começa muito antes de montar.", "En ryttare tar också hand om det hon använder: respekten för hästen börjar långt innan man sitter upp.", "Всадник бережёт и то, чем пользуется: уважение к лошади начинается задолго до посадки.", "Jeździec dba też o to, czego używa: szacunek dla konia zaczyna się długo przed wsiadaniem.", "기수는 자신이 쓰는 장비도 아낀다. 말에 대한 존중은 말에 오르기 훨씬 전부터 시작된다.")
  },
  "g1-c9": {
    defi: {
      titre: tt("Un message bien compris", "A message well understood", "Un mensaje bien entendido", "Un messaggio ben compreso", "伝わる合図", "Eine gut verstandene Botschaft", "رسالة مفهومة جيدًا", "清楚的讯息", "Een goed begrepen boodschap", "Uma mensagem bem compreendida", "Ett budskap som går fram", "Понятный сигнал", "Dobrze zrozumiany sygnał", "잘 전달된 메시지"),
      accroche: tt("Avec ton enseignant, découvre comment donner une indication claire à ton cheval, sans multiplier les gestes.", "With your instructor, find out how to give your horse a clear signal without piling up movements.", "Con tu profesor, descubre cómo dar una indicación clara a tu caballo, sin multiplicar los gestos.", "Con il tuo istruttore, scopri come dare un'indicazione chiara al tuo cavallo, senza moltiplicare i gesti.", "先生といっしょに、動きをふやさずに馬へはっきり合図を出す方法を見つけよう。", "Entdecke mit deinem Reitlehrer, wie du deinem Pferd eine klare Hilfe gibst, ohne viele Bewegungen zu machen.", "مع مدرّبك، اكتشف كيف تعطي حصانك إشارة واضحة دون الإكثار من الحركات.", "和教练一起，学习如何不用多余动作就给马清晰的指令。", "Ontdek met je instructeur hoe je je paard een duidelijke hulp geeft, zonder veel bewegingen.", "Com seu instrutor, descubra como dar uma indicação clara ao seu cavalo, sem multiplicar os gestos.", "Upptäck med din instruktör hur du ger hästen en tydlig signal utan onödiga rörelser.", "Вместе с тренером узнай, как дать лошади ясную команду без лишних движений.", "Z instruktorem odkryj, jak dać koniowi jasny sygnał, nie mnożąc ruchów.", "선생님과 함께 동작을 늘리지 않고 말에게 분명한 신호를 주는 법을 알아보자."),
      points: [
        tt("Prépare un changement de direction avec ton regard.", "Prepare a change of direction with your eyes.", "Prepara un cambio de dirección con la mirada.", "Prepara un cambio di direzione con lo sguardo.", "目線で方向転換の準備をしよう。", "Bereite einen Richtungswechsel mit deinem Blick vor.", "حضّر لتغيير الاتجاه بنظرك.", "用视线为转向做准备。", "Bereid een richtingsverandering voor met je blik.", "Prepare uma mudança de direção com o olhar.", "Förbered ett riktningsbyte med blicken.", "Подготовь смену направления взглядом.", "Przygotuj zmianę kierunku wzrokiem.", "시선으로 방향 전환을 준비하자."),
        tt("Demande un virage simple avec des aides coordonnées.", "Ask for a simple turn with coordinated aids.", "Pide un giro sencillo con ayudas coordinadas.", "Chiedi una semplice svolta con aiuti coordinati.", "合図をそろえて、かんたんな曲がりをたのもう。", "Bitte mit abgestimmten Hilfen um eine einfache Wendung.", "اطلب انعطافًا بسيطًا بمساعدات متناسقة.", "用协调的辅助要求一个简单的转弯。", "Vraag een eenvoudige bocht met gecoördineerde hulpen.", "Peça uma curva simples com ajudas coordenadas.", "Be om en enkel vändning med samordnade hjälper.", "Попроси простой поворот согласованными средствами управления.", "Poproś o prosty skręt skoordynowanymi pomocami.", "조화로운 부조로 간단한 회전을 요청하자."),
        tt("Relâche ta demande dès que le cheval répond.", "Release your request as soon as the horse responds.", "Suelta tu petición en cuanto el caballo responda.", "Allenta la richiesta appena il cavallo risponde.", "馬がこたえたら、すぐに合図をゆるめよう。", "Gib nach, sobald das Pferd reagiert.", "خفّف طلبك فور استجابة الحصان.", "马一回应就放松你的要求。", "Geef mee zodra het paard reageert.", "Solte o pedido assim que o cavalo responder.", "Släpp din begäran så fort hästen svarar.", "Ослабь команду, как только лошадь ответит.", "Odpuść, gdy tylko koń odpowie.", "말이 반응하면 바로 요청을 풀어 주자.")
      ]
    },
    hb: [
      tt("Pourquoi mon cheval ne comprend-il pas toujours ma demande ?", "Why doesn't my horse always understand what I ask?", "¿Por qué mi caballo no siempre entiende lo que le pido?", "Perché il mio cavallo non capisce sempre la mia richiesta?", "馬がいつも合図をわかってくれないのはなぜ？", "Warum versteht mein Pferd meine Hilfe nicht immer?", "لماذا لا يفهم حصاني طلبي دائمًا؟", "为什么我的马不总能理解我的要求？", "Waarom begrijpt mijn paard mijn vraag niet altijd?", "Por que meu cavalo nem sempre entende meu pedido?", "Varför förstår min häst inte alltid vad jag ber om?", "Почему лошадь не всегда понимает, что я прошу?", "Dlaczego mój koń nie zawsze rozumie moją prośbę?", "왜 말이 내 요청을 항상 이해하지 못할까?"),
      tt("Est-ce que je peux donner plusieurs indications en même temps ?", "Can I give several signals at once?", "¿Puedo dar varias indicaciones a la vez?", "Posso dare più indicazioni contemporaneamente?", "いくつもの合図を同時に出してもいい？", "Darf ich mehrere Hilfen gleichzeitig geben?", "هل يمكنني إعطاء عدة إشارات في الوقت نفسه؟", "我可以同时给出几个指令吗？", "Mag ik meerdere hulpen tegelijk geven?", "Posso dar várias indicações ao mesmo tempo?", "Kan jag ge flera signaler samtidigt?", "Можно ли давать несколько команд одновременно?", "Czy mogę dawać kilka sygnałów naraz?", "여러 신호를 한꺼번에 줘도 될까?"),
      tt("Comment savoir si j'agis trop fort avec mes mains ?", "How do I know if I'm using my hands too strongly?", "¿Cómo saber si actúo demasiado fuerte con las manos?", "Come capire se agisco troppo forte con le mani?", "手の合図が強すぎるかどうか、どうやってわかる？", "Woran merke ich, dass ich mit den Händen zu stark einwirke?", "كيف أعرف أنني أستعمل يديّ بقوة زائدة؟", "怎么知道我手上用力太大？", "Hoe weet ik of ik te hard met mijn handen werk?", "Como saber se estou agindo forte demais com as mãos?", "Hur vet jag om jag använder händerna för hårt?", "Как понять, что я действую руками слишком сильно?", "Skąd wiem, że działam rękami zbyt mocno?", "손을 너무 세게 쓰는지 어떻게 알 수 있을까?"),
      tt("Pourquoi faut-il relâcher une aide après une réponse ?", "Why should I release an aid after a response?", "¿Por qué hay que soltar una ayuda después de una respuesta?", "Perché bisogna allentare un aiuto dopo una risposta?", "馬がこたえたあと、合図をゆるめるのはなぜ？", "Warum muss man nach einer Reaktion nachgeben?", "لماذا يجب تخفيف المساعدة بعد الاستجابة؟", "为什么马回应后要放松辅助？", "Waarom moet je een hulp loslaten na een reactie?", "Por que é preciso soltar uma ajuda depois de uma resposta?", "Varför ska man släppa en hjälp efter ett svar?", "Почему нужно ослабить воздействие после ответа?", "Dlaczego trzeba odpuścić pomoc po odpowiedzi konia?", "말이 반응한 뒤 왜 부조를 풀어야 할까?"),
      tt("Comment rendre mes demandes plus faciles à comprendre ?", "How can I make my requests easier to understand?", "¿Cómo hacer que mis peticiones sean más fáciles de entender?", "Come rendere le mie richieste più facili da capire?", "合図をもっとわかりやすくするには？", "Wie mache ich meine Hilfen leichter verständlich?", "كيف أجعل طلباتي أسهل في الفهم؟", "怎样让我的要求更容易理解？", "Hoe maak ik mijn vragen makkelijker te begrijpen?", "Como tornar meus pedidos mais fáceis de entender?", "Hur gör jag mina signaler lättare att förstå?", "Как сделать мои команды понятнее?", "Jak sprawić, by moje prośby były łatwiejsze do zrozumienia?", "내 요청을 더 이해하기 쉽게 하려면?")
    ],
    synth: [
      tt("Les aides permettent de communiquer avec le cheval.", "Aids let you communicate with the horse.", "Las ayudas permiten comunicarse con el caballo.", "Gli aiuti permettono di comunicare con il cavallo.", "扶助で馬と話ができる。", "Mit den Hilfen verständigst du dich mit dem Pferd.", "المساعدات تتيح التواصل مع الحصان.", "辅助让你和马沟通。", "Met hulpen communiceer je met het paard.", "As ajudas permitem se comunicar com o cavalo.", "Hjälperna låter dig kommunicera med hästen.", "Средства управления — это язык общения с лошадью.", "Pomoce pozwalają porozumieć się z koniem.", "부조로 말과 소통한다."),
      tt("Certaines viennent directement de ton corps.", "Some come straight from your body.", "Algunas vienen directamente de tu cuerpo.", "Alcuni vengono direttamente dal tuo corpo.", "からだから直接出す扶助がある。", "Manche kommen direkt von deinem Körper.", "بعضها يأتي مباشرة من جسمك.", "有些直接来自你的身体。", "Sommige komen rechtstreeks van je lichaam.", "Algumas vêm diretamente do seu corpo.", "Vissa kommer direkt från din kropp.", "Некоторые идут прямо от твоего тела.", "Niektóre pochodzą wprost z twojego ciała.", "어떤 부조는 몸에서 바로 나온다."),
      tt("D'autres utilisent un équipement adapté.", "Others use suitable equipment.", "Otras utilizan un equipo adecuado.", "Altri usano un'attrezzatura adatta.", "道具を使う扶助もある。", "Andere nutzen passende Ausrüstung.", "وأخرى تستعمل معدات مناسبة.", "另一些借助合适的装备。", "Andere gebruiken geschikt materiaal.", "Outras usam um equipamento adequado.", "Andra använder lämplig utrustning.", "Другие используют подходящее снаряжение.", "Inne korzystają z odpowiedniego sprzętu.", "어떤 부조는 알맞은 도구를 쓴다."),
      tt("Les indications doivent être précises et mesurées.", "Signals must be precise and measured.", "Las indicaciones deben ser precisas y medidas.", "Le indicazioni devono essere precise e misurate.", "合図は正確に、やりすぎない。", "Hilfen müssen genau und maßvoll sein.", "يجب أن تكون الإشارات دقيقة ومعتدلة.", "指令要准确而有分寸。", "Hulpen moeten precies en afgemeten zijn.", "As indicações devem ser precisas e moderadas.", "Signalerna ska vara exakta och avvägda.", "Команды должны быть точными и умеренными.", "Sygnały muszą być precyzyjne i wyważone.", "신호는 정확하고 적당해야 한다."),
      tt("Une bonne réponse mérite un relâchement immédiat.", "A good response deserves an immediate release.", "Una buena respuesta merece un relajamiento inmediato.", "Una buona risposta merita un rilascio immediato.", "よい反応には、すぐにゆるめてこたえる。", "Eine gute Reaktion verdient sofortiges Nachgeben.", "الاستجابة الجيدة تستحق تخفيفًا فوريًا.", "好的回应值得立即放松。", "Een goede reactie verdient meteen ontspanning.", "Uma boa resposta merece um alívio imediato.", "Ett bra svar förtjänar att du släpper direkt.", "Хороший ответ заслуживает немедленного ослабления.", "Dobra odpowiedź zasługuje na natychmiastowe odpuszczenie.", "좋은 반응에는 바로 풀어 주자.")
    ],
    fin: tt("Quand tes demandes deviennent plus claires, ton cheval n'a plus besoin de deviner ce que tu souhaites.", "When your requests become clearer, your horse no longer has to guess what you want.", "Cuando tus peticiones se vuelven más claras, tu caballo ya no necesita adivinar lo que quieres.", "Quando le tue richieste diventano più chiare, il tuo cavallo non deve più indovinare cosa desideri.", "合図がはっきりすれば、馬はきみの望みを当てずっぽうで考えなくてよくなる。", "Wenn deine Hilfen klarer werden, muss dein Pferd nicht mehr raten, was du willst.", "عندما تصبح طلباتك أوضح، لا يحتاج حصانك إلى تخمين ما تريده.", "当你的要求更清楚时，你的马就不必再猜你想要什么。", "Als je vragen duidelijker worden, hoeft je paard niet meer te raden wat je wilt.", "Quando seus pedidos ficam mais claros, seu cavalo não precisa mais adivinhar o que você quer.", "När dina signaler blir tydligare behöver hästen inte längre gissa vad du vill.", "Когда твои команды становятся яснее, лошади больше не нужно угадывать, чего ты хочешь.", "Gdy twoje prośby stają się jaśniejsze, koń nie musi już zgadywać, czego chcesz.", "요청이 분명해질수록 말은 네가 원하는 것을 더 이상 짐작하지 않아도 된다.")
  },
  "g1-c10": {
    hb: [
      tt("Pourquoi faut-il choisir un endroit adapté pour attacher un cheval ?", "Why should I choose a suitable place to tie up a horse?", "¿Por qué hay que elegir un lugar adecuado para atar un caballo?", "Perché bisogna scegliere un posto adatto per legare un cavallo?", "馬をつなぐ場所を選ぶのはなぜ？", "Warum muss man einen geeigneten Platz zum Anbinden wählen?", "لماذا يجب اختيار مكان مناسب لربط الحصان؟", "为什么拴马要选择合适的地方？", "Waarom moet je een geschikte plek kiezen om een paard vast te zetten?", "Por que é preciso escolher um lugar adequado para amarrar um cavalo?", "Varför ska man välja en lämplig plats att binda upp en häst?", "Почему важно выбрать подходящее место, чтобы привязать лошадь?", "Dlaczego trzeba wybrać odpowiednie miejsce do uwiązania konia?", "말을 묶을 때 왜 알맞은 장소를 골라야 할까?"),
      tt("Comment reconnaître un nœud qui peut se défaire rapidement ?", "How do I recognise a knot that can be undone quickly?", "¿Cómo reconocer un nudo que se puede deshacer rápido?", "Come riconoscere un nodo che si scioglie rapidamente?", "すぐにほどける結び目はどうやって見分ける？", "Woran erkenne ich einen Knoten, der sich schnell lösen lässt?", "كيف أتعرّف على عقدة يمكن فكّها بسرعة؟", "怎么辨认一个能快速解开的结？", "Hoe herken ik een knoop die snel los kan?", "Como reconhecer um nó que se desfaz rapidamente?", "Hur känner jag igen en knut som snabbt kan lösas upp?", "Как распознать узел, который можно быстро развязать?", "Jak rozpoznać węzeł, który można szybko rozwiązać?", "빨리 풀 수 있는 매듭은 어떻게 알아볼까?"),
      tt("Que faire si un cheval attaché commence à tirer violemment ?", "What should I do if a tied horse starts pulling back hard?", "¿Qué hacer si un caballo atado empieza a tirar con fuerza?", "Cosa fare se un cavallo legato inizia a tirare con forza?", "つないだ馬が強く引っぱりはじめたらどうする？", "Was tun, wenn ein angebundenes Pferd heftig zu ziehen beginnt?", "ماذا أفعل إذا بدأ حصان مربوط يشدّ بعنف؟", "被拴住的马开始猛烈后拉时该怎么办？", "Wat doe ik als een vastgezet paard hard begint te trekken?", "O que fazer se um cavalo amarrado começar a puxar com força?", "Vad gör jag om en uppbunden häst börjar slita hårt?", "Что делать, если привязанная лошадь начинает сильно тянуть?", "Co zrobić, gdy uwiązany koń zaczyna gwałtownie się szarpać?", "묶인 말이 세게 당기기 시작하면 어떻게 할까?"),
      tt("Pourquoi une longe ne doit-elle jamais traîner au sol ?", "Why should a lead rope never drag on the ground?", "¿Por qué un ramal nunca debe arrastrar por el suelo?", "Perché una lunghina non deve mai strisciare a terra?", "引き綱を地面に引きずってはいけないのはなぜ？", "Warum darf ein Führstrick nie am Boden schleifen?", "لماذا يجب ألّا يجرّ حبل القيادة على الأرض أبدًا؟", "为什么牵绳绝不能拖在地上？", "Waarom mag een halstertouw nooit over de grond slepen?", "Por que uma guia nunca deve arrastar no chão?", "Varför får grimskaftet aldrig släpa i marken?", "Почему чумбур никогда не должен волочиться по земле?", "Dlaczego uwiąz nigdy nie powinien wlec się po ziemi?", "왜 리드로프가 땅에 끌리면 안 될까?"),
      tt("Comment puis-je m'entraîner à faire ce nœud sans cheval ?", "How can I practise this knot without a horse?", "¿Cómo puedo practicar este nudo sin caballo?", "Come posso esercitarmi a fare questo nodo senza cavallo?", "馬がいなくても、この結び方を練習するには？", "Wie kann ich diesen Knoten ohne Pferd üben?", "كيف يمكنني التدرّب على هذه العقدة دون حصان؟", "没有马时我怎么练习打这个结？", "Hoe kan ik deze knoop oefenen zonder paard?", "Como posso treinar esse nó sem cavalo?", "Hur kan jag öva på knuten utan häst?", "Как потренироваться завязывать этот узел без лошади?", "Jak mogę ćwiczyć ten węzeł bez konia?", "말 없이 이 매듭을 연습하려면?")
    ],
    synth: [
      tt("Une attache sûre commence par une bonne préparation.", "Safe tying starts with good preparation.", "Un amarre seguro empieza con una buena preparación.", "Un legaccio sicuro inizia con una buona preparazione.", "安全につなぐには、まず準備から。", "Sicheres Anbinden beginnt mit guter Vorbereitung.", "الربط الآمن يبدأ بتحضير جيد.", "安全拴马从做好准备开始。", "Veilig vastzetten begint met goede voorbereiding.", "Amarrar com segurança começa com boa preparação.", "Säker uppbindning börjar med bra förberedelse.", "Безопасная привязь начинается с подготовки.", "Bezpieczne uwiązanie zaczyna się od przygotowania.", "안전한 매기는 준비에서 시작된다."),
      tt("Le point d'attache doit être adapté.", "The tie point must be suitable.", "El punto de amarre debe ser adecuado.", "Il punto di attacco deve essere adatto.", "つなぐ場所は適したものに。", "Der Anbindepunkt muss geeignet sein.", "يجب أن تكون نقطة الربط مناسبة.", "拴马点必须合适。", "Het vastzetpunt moet geschikt zijn.", "O ponto de amarração deve ser adequado.", "Fästpunkten måste vara lämplig.", "Место привязи должно быть подходящим.", "Punkt uwiązania musi być odpowiedni.", "묶는 지점은 알맞아야 한다."),
      tt("Le nœud doit pouvoir se libérer rapidement.", "The knot must release quickly.", "El nudo debe poder soltarse rápido.", "Il nodo deve potersi sciogliere rapidamente.", "結び目はすぐにほどけること。", "Der Knoten muss sich schnell lösen lassen.", "يجب أن تُفكّ العقدة بسرعة.", "结必须能迅速解开。", "De knoop moet snel los kunnen.", "O nó deve se soltar rapidamente.", "Knuten måste gå att lösa snabbt.", "Узел должен быстро развязываться.", "Węzeł musi dać się szybko rozwiązać.", "매듭은 빨리 풀려야 한다."),
      tt("Le cheval attaché reste sous surveillance.", "A tied horse stays supervised.", "El caballo atado sigue vigilado.", "Il cavallo legato resta sorvegliato.", "つないだ馬から目を離さない。", "Ein angebundenes Pferd bleibt beaufsichtigt.", "الحصان المربوط يبقى تحت المراقبة.", "被拴的马要有人看着。", "Een vastgezet paard blijft onder toezicht.", "O cavalo amarrado fica sob vigilância.", "En uppbunden häst ska ha tillsyn.", "Привязанная лошадь остаётся под присмотром.", "Uwiązany koń pozostaje pod nadzorem.", "묶인 말은 계속 지켜본다."),
      tt("En cas de difficulté, appelle ton enseignant.", "If there's a problem, call your instructor.", "En caso de dificultad, llama a tu profesor.", "In caso di difficoltà, chiama il tuo istruttore.", "困ったら先生を呼ぼう。", "Bei Schwierigkeiten ruf deinen Reitlehrer.", "عند أي صعوبة، نادِ مدرّبك.", "遇到困难，叫你的教练。", "Bij problemen roep je je instructeur.", "Em caso de dificuldade, chame seu instrutor.", "Vid problem, kalla på din instruktör.", "При трудностях позови тренера.", "W razie trudności zawołaj instruktora.", "어려우면 선생님을 부르자.")
    ],
    fin: tt("Un bon nœud n'est pas celui qui serre le plus, mais celui qui protège le cheval.", "A good knot isn't the tightest one, but the one that protects the horse.", "Un buen nudo no es el que más aprieta, sino el que protege al caballo.", "Un buon nodo non è quello che stringe di più, ma quello che protegge il cavallo.", "よい結び目とは、いちばんきつい結び目ではなく、馬を守る結び目。", "Ein guter Knoten ist nicht der festeste, sondern der, der das Pferd schützt.", "العقدة الجيدة ليست الأشد إحكامًا، بل التي تحمي الحصان.", "好的结不是系得最紧的，而是能保护马的。", "Een goede knoop is niet de strakste, maar die het paard beschermt.", "Um bom nó não é o que aperta mais, mas o que protege o cavalo.", "En bra knut är inte den hårdaste, utan den som skyddar hästen.", "Хороший узел — не самый тугой, а тот, что защищает лошадь.", "Dobry węzeł to nie ten najciaśniejszy, lecz ten, który chroni konia.", "좋은 매듭은 가장 단단한 매듭이 아니라 말을 지켜 주는 매듭이다."),
    chap: [
      [tt("Avant d'attacher", "Before tying up", "Antes de atar", "Prima di legare", "つなぐ前に", "Vor dem Anbinden", "قبل الربط", "拴马之前", "Voor het vastzetten", "Antes de amarrar", "Innan du binder upp", "Перед привязью", "Zanim uwiążesz", "묶기 전에"), 5],
      [tt("Réaliser le nœud", "Tying the knot", "Hacer el nudo", "Fare il nodo", "結んでみよう", "Den Knoten machen", "صنع العقدة", "打结", "De knoop leggen", "Fazer o nó", "Gör knuten", "Вяжем узел", "Wiązanie węzła", "매듭 묶기"), 6]
    ]
  },
  "g1-c11": {
    hb: [
      tt("Comment retrouver mon numéro de licence FFE ?", "How do I find my FFE licence number?", "¿Cómo encuentro mi número de licencia FFE?", "Come ritrovo il mio numero di licenza FFE?", "FFEライセンス番号はどうやって確認する？", "Wie finde ich meine FFE-Lizenznummer?", "كيف أجد رقم رخصتي في FFE؟", "怎么找到我的 FFE 执照号码？", "Hoe vind ik mijn FFE-licentienummer terug?", "Como encontro meu número de licença FFE?", "Hur hittar jag mitt FFE-licensnummer?", "Как найти мой номер лицензии FFE?", "Jak znaleźć mój numer licencji FFE?", "FFE 라이선스 번호는 어떻게 찾을까?"),
      tt("À quoi me sert ma licence si je ne fais pas de concours ?", "What is my licence for if I don't compete?", "¿Para qué me sirve la licencia si no compito?", "A cosa mi serve la licenza se non faccio gare?", "大会に出なくてもライセンスは何の役に立つの？", "Wozu brauche ich die Lizenz, wenn ich keine Turniere reite?", "ما فائدة رخصتي إذا لم أشارك في المسابقات؟", "如果我不参加比赛，执照有什么用？", "Waarvoor dient mijn licentie als ik geen wedstrijden rijd?", "Para que serve minha licença se não faço competições?", "Vad är licensen till för om jag inte tävlar?", "Зачем мне лицензия, если я не выступаю на соревнованиях?", "Do czego służy licencja, jeśli nie startuję w zawodach?", "대회에 나가지 않아도 라이선스는 어디에 쓰일까?"),
      tt("Comment consulter mes Galops déjà obtenus ?", "How can I see the Galops I've already passed?", "¿Cómo consulto los Galops que ya he obtenido?", "Come consulto i Galop che ho già ottenuto?", "合格したギャロップはどうやって確認する？", "Wie sehe ich meine bereits bestandenen Galops?", "كيف أطّلع على مستويات الغالوب التي حصلت عليها؟", "怎么查看我已经通过的 Galop 等级？", "Hoe bekijk ik de Galops die ik al gehaald heb?", "Como consulto os Galops que já obtive?", "Hur ser jag mina avklarade Galops?", "Как посмотреть уже сданные Galops?", "Jak sprawdzić zdobyte już Galopy?", "이미 딴 갤럽은 어떻게 확인할까?"),
      tt("Qui peut m'aider si une information est incorrecte ?", "Who can help me if some information is wrong?", "¿Quién puede ayudarme si una información es incorrecta?", "Chi può aiutarmi se un'informazione è sbagliata?", "情報がまちがっていたら、だれが助けてくれる？", "Wer hilft mir, wenn eine Angabe falsch ist?", "من يمكنه مساعدتي إذا كانت معلومة غير صحيحة؟", "如果信息有误，谁能帮我？", "Wie kan me helpen als een gegeven niet klopt?", "Quem pode me ajudar se uma informação estiver errada?", "Vem kan hjälpa mig om en uppgift är fel?", "Кто поможет, если какие-то данные неверны?", "Kto mi pomoże, jeśli jakaś informacja jest błędna?", "정보가 틀렸으면 누가 도와줄 수 있을까?"),
      tt("Pourquoi ma licence me suit-elle quand je change de club ?", "Why does my licence follow me when I change clubs?", "¿Por qué mi licencia me sigue cuando cambio de club?", "Perché la mia licenza mi segue quando cambio club?", "クラブを変えてもライセンスがついてくるのはなぜ？", "Warum begleitet mich meine Lizenz, wenn ich den Verein wechsle?", "لماذا ترافقني رخصتي عندما أغيّر النادي؟", "为什么换俱乐部后执照还跟着我？", "Waarom blijft mijn licentie bij me als ik van club verander?", "Por que minha licença me acompanha quando mudo de clube?", "Varför följer licensen med när jag byter klubb?", "Почему лицензия остаётся со мной, когда я меняю клуб?", "Dlaczego licencja zostaje ze mną, gdy zmieniam klub?", "클럽을 옮겨도 라이선스가 따라오는 이유는?")
    ],
    synth: [
      tt("La licence accompagne ton parcours de cavalier.", "Your licence goes with you on your riding journey.", "La licencia acompaña tu trayectoria de jinete.", "La licenza accompagna il tuo percorso di cavaliere.", "ライセンスは乗り手としての歩みに寄りそう。", "Die Lizenz begleitet deinen Weg als Reiter.", "الرخصة ترافق مسيرتك كفارس.", "执照陪伴你的骑手之路。", "De licentie begeleidt je ruiterloopbaan.", "A licença acompanha seu percurso de cavaleiro.", "Licensen följer dig genom din ridresa.", "Лицензия сопровождает твой путь всадника.", "Licencja towarzyszy twojej jeździeckiej drodze.", "라이선스는 기수로서의 여정을 함께한다."),
      tt("Elle te relie à la Fédération française d'équitation.", "It links you to the French Equestrian Federation.", "Te une a la Federación Francesa de Equitación.", "Ti collega alla Federazione francese di equitazione.", "フランス馬術連盟とつながる。", "Sie verbindet dich mit dem Französischen Reitsportverband.", "تربطك بالاتحاد الفرنسي للفروسية.", "它把你和法国马术联合会联系在一起。", "Ze verbindt je met de Franse ruitersportfederatie.", "Ela liga você à Federação Francesa de Equitação.", "Den knyter dig till Franska ridsportförbundet.", "Она связывает тебя с Федерацией конного спорта Франции.", "Łączy cię z Francuską Federacją Jeździecką.", "프랑스 승마 연맹과 너를 이어 준다."),
      tt("Elle donne accès à des services fédéraux.", "It gives access to federation services.", "Da acceso a servicios federativos.", "Dà accesso a servizi federali.", "連盟のサービスが使えるようになる。", "Sie öffnet den Zugang zu Verbandsangeboten.", "تتيح الوصول إلى خدمات الاتحاد.", "它让你使用联合会的服务。", "Ze geeft toegang tot diensten van de federatie.", "Dá acesso a serviços da federação.", "Den ger tillgång till förbundets tjänster.", "Она открывает доступ к услугам федерации.", "Daje dostęp do usług federacji.", "연맹 서비스를 이용할 수 있다."),
      tt("Ton numéro reste le même au fil des années.", "Your number stays the same over the years.", "Tu número sigue siendo el mismo con los años.", "Il tuo numero resta lo stesso negli anni.", "番号は何年たっても変わらない。", "Deine Nummer bleibt über die Jahre gleich.", "رقمك يبقى نفسه على مرّ السنين.", "你的号码多年不变。", "Je nummer blijft door de jaren heen hetzelfde.", "Seu número continua o mesmo ao longo dos anos.", "Ditt nummer är detsamma genom åren.", "Твой номер не меняется с годами.", "Twój numer pozostaje ten sam przez lata.", "번호는 해가 지나도 그대로다."),
      tt("Ton club peut t'aider dans tes démarches.", "Your club can help you with the paperwork.", "Tu club puede ayudarte con los trámites.", "Il tuo club può aiutarti nelle pratiche.", "手続きはクラブが手伝ってくれる。", "Dein Verein kann dir bei Formalitäten helfen.", "ناديك يمكنه مساعدتك في إجراءاتك.", "你的俱乐部可以帮你办理手续。", "Je club kan je helpen met de formaliteiten.", "Seu clube pode ajudar nos trâmites.", "Din klubb kan hjälpa dig med det praktiska.", "Клуб может помочь с оформлением.", "Klub może pomóc ci w formalnościach.", "절차는 클럽이 도와줄 수 있다.")
    ],
    fin: tt("Ton parcours équestre ne se mesure pas seulement en concours : chaque étape compte.", "Your riding journey isn't measured only in competitions: every step counts.", "Tu trayectoria ecuestre no se mide solo en concursos: cada etapa cuenta.", "Il tuo percorso equestre non si misura solo in gare: ogni tappa conta.", "乗馬の歩みは大会だけでは測れない。どの一歩も大切。", "Dein Reiterweg misst sich nicht nur an Turnieren: Jeder Schritt zählt.", "مسيرتك في الفروسية لا تُقاس بالمسابقات فقط: كل مرحلة مهمة.", "你的马术之路不只以比赛衡量：每一步都很重要。", "Je ruiterpad meet je niet alleen in wedstrijden: elke stap telt.", "Seu percurso equestre não se mede só em competições: cada etapa conta.", "Din ridresa mäts inte bara i tävlingar: varje steg räknas.", "Твой путь в конном спорте измеряется не только соревнованиями: важен каждый шаг.", "Twojej jeździeckiej drogi nie mierzy się tylko zawodami: liczy się każdy krok.", "승마의 여정은 대회로만 재지 않는다. 모든 단계가 소중하다."),
    chap: [
      [tt("Découvrir ta licence", "Discovering your licence", "Descubrir tu licencia", "Scoprire la tua licenza", "ライセンスを知ろう", "Deine Lizenz entdecken", "اكتشف رخصتك", "认识你的执照", "Je licentie ontdekken", "Descobrir sua licença", "Upptäck din licens", "Знакомство с лицензией", "Poznaj swoją licencję", "라이선스 알아보기"), 5],
      [tt("Une identité de cavalier", "A rider's identity", "Una identidad de jinete", "Un'identità da cavaliere", "乗り手のしるし", "Eine Reiter-Identität", "هوية فارس", "骑手的身份", "Een ruiteridentiteit", "Uma identidade de cavaleiro", "En ryttaridentitet", "Удостоверение всадника", "Tożsamość jeźdźca", "기수의 신분증"), 2]
    ]
  },
  "g1-c12": {
    hb: [
      tt("Pourquoi les cavaliers ont-ils besoin d'une fédération ?", "Why do riders need a federation?", "¿Por qué los jinetes necesitan una federación?", "Perché i cavalieri hanno bisogno di una federazione?", "乗り手に連盟が必要なのはなぜ？", "Warum brauchen Reiter einen Verband?", "لماذا يحتاج الفرسان إلى اتحاد؟", "骑手为什么需要联合会？", "Waarom hebben ruiters een federatie nodig?", "Por que os cavaleiros precisam de uma federação?", "Varför behöver ryttare ett förbund?", "Зачем всадникам федерация?", "Dlaczego jeźdźcy potrzebują federacji?", "기수들에게 왜 연맹이 필요할까?"),
      tt("Est-ce que la FFE s'occupe aussi des petits clubs ?", "Does the FFE also look after small clubs?", "¿La FFE también se ocupa de los clubes pequeños?", "La FFE si occupa anche dei piccoli club?", "FFEは小さなクラブも支えているの？", "Kümmert sich die FFE auch um kleine Vereine?", "هل يهتم الاتحاد الفرنسي أيضًا بالنوادي الصغيرة؟", "FFE 也照顾小俱乐部吗？", "Zorgt de FFE ook voor kleine clubs?", "A FFE também cuida dos clubes pequenos?", "Tar FFE också hand om små klubbar?", "Занимается ли FFE и небольшими клубами?", "Czy FFE zajmuje się też małymi klubami?", "FFE는 작은 클럽도 돌볼까?"),
      tt("Qui prépare les programmes des Galops ?", "Who writes the Galop programmes?", "¿Quién prepara los programas de los Galops?", "Chi prepara i programmi dei Galop?", "ギャロップの内容はだれが作っているの？", "Wer erstellt die Galop-Programme?", "من يُعدّ برامج مستويات الغالوب؟", "谁制定 Galop 的考试内容？", "Wie stelt de programma's van de Galops op?", "Quem prepara os programas dos Galops?", "Vem tar fram programmen för Galops?", "Кто составляет программы Galops?", "Kto przygotowuje programy Galopów?", "갤럽 프로그램은 누가 만들까?"),
      tt("Comment découvrir les disciplines équestres reconnues par la FFE ?", "How can I discover the equestrian disciplines recognised by the FFE?", "¿Cómo descubrir las disciplinas ecuestres reconocidas por la FFE?", "Come scoprire le discipline equestri riconosciute dalla FFE?", "FFEが認めている馬術競技はどうやって知る？", "Wie entdecke ich die von der FFE anerkannten Disziplinen?", "كيف أكتشف تخصصات الفروسية المعترف بها من الاتحاد الفرنسي؟", "怎样了解 FFE 认可的马术项目？", "Hoe ontdek ik de disciplines die de FFE erkent?", "Como conhecer as modalidades equestres reconhecidas pela FFE?", "Hur upptäcker jag grenarna som FFE erkänner?", "Как узнать, какие дисциплины признаёт FFE?", "Jak poznać dyscypliny jeździeckie uznawane przez FFE?", "FFE가 인정하는 승마 종목은 어떻게 알아볼까?"),
      tt("Où puis-je trouver des informations officielles sur l'équitation ?", "Where can I find official information about riding?", "¿Dónde puedo encontrar información oficial sobre equitación?", "Dove posso trovare informazioni ufficiali sull'equitazione?", "乗馬の公式情報はどこで見つかる？", "Wo finde ich offizielle Informationen zum Reiten?", "أين أجد معلومات رسمية عن الفروسية؟", "在哪里可以找到马术的官方信息？", "Waar vind ik officiële informatie over paardrijden?", "Onde encontro informações oficiais sobre equitação?", "Var hittar jag officiell information om ridning?", "Где найти официальную информацию о верховой езде?", "Gdzie znajdę oficjalne informacje o jeździectwie?", "승마에 관한 공식 정보는 어디서 찾을까?")
    ],
    synth: [
      tt("La FFE rassemble le monde équestre français.", "The FFE brings together French equestrian life.", "La FFE reúne al mundo ecuestre francés.", "La FFE riunisce il mondo equestre francese.", "FFEはフランスの馬の世界をまとめている。", "Die FFE vereint die französische Reitsportwelt.", "الاتحاد الفرنسي يجمع عالم الفروسية في فرنسا.", "FFE 汇聚了法国马术界。", "De FFE brengt de Franse paardenwereld samen.", "A FFE reúne o mundo equestre francês.", "FFE samlar den franska hästvärlden.", "FFE объединяет конный мир Франции.", "FFE skupia francuski świat jeździecki.", "FFE는 프랑스 승마계를 하나로 모은다."),
      tt("Elle donne un cadre commun aux activités.", "It gives activities a shared framework.", "Da un marco común a las actividades.", "Dà un quadro comune alle attività.", "活動に共通のルールをあたえる。", "Er gibt den Aktivitäten einen gemeinsamen Rahmen.", "يمنح الأنشطة إطارًا مشتركًا.", "它为各项活动提供统一框架。", "Ze geeft de activiteiten een gemeenschappelijk kader.", "Ela dá um quadro comum às atividades.", "Den ger verksamheten en gemensam ram.", "Она задаёт общие рамки занятиям.", "Nadaje działaniom wspólne ramy.", "활동에 공통의 틀을 준다."),
      tt("Elle accompagne la progression des cavaliers.", "It supports riders' progress.", "Acompaña el progreso de los jinetes.", "Accompagna i progressi dei cavalieri.", "乗り手の上達を支える。", "Er begleitet den Fortschritt der Reiter.", "يرافق تقدّم الفرسان.", "它陪伴骑手进步。", "Ze begeleidt de vooruitgang van ruiters.", "Ela acompanha a evolução dos cavaleiros.", "Den stöttar ryttarnas utveckling.", "Она сопровождает прогресс всадников.", "Wspiera postępy jeźdźców.", "기수들의 성장을 돕는다."),
      tt("Elle soutient la pratique de l'équitation.", "It supports the practice of riding.", "Apoya la práctica de la equitación.", "Sostiene la pratica dell'equitazione.", "乗馬の普及を応援する。", "Er fördert das Reiten.", "يدعم ممارسة الفروسية.", "它支持马术运动的开展。", "Ze ondersteunt de paardensport.", "Ela apoia a prática da equitação.", "Den stödjer ridsporten.", "Она поддерживает занятия верховой ездой.", "Wspiera uprawianie jeździectwa.", "승마 활동을 지원한다."),
      tt("Ses ressources sont accessibles aux passionnés.", "Its resources are open to enthusiasts.", "Sus recursos están al alcance de los aficionados.", "Le sue risorse sono accessibili agli appassionati.", "その情報は馬好きのだれでも使える。", "Seine Angebote stehen allen Pferdefreunden offen.", "موارده متاحة لكل المولعين.", "它的资源向爱好者开放。", "Haar bronnen zijn toegankelijk voor liefhebbers.", "Seus recursos estão acessíveis aos apaixonados.", "Dess resurser är öppna för alla hästintresserade.", "Её ресурсы доступны всем увлечённым.", "Jej zasoby są dostępne dla pasjonatów.", "그 자료는 애호가 누구나 이용할 수 있다.")
    ],
    fin: tt("Derrière chaque cavalier, il existe tout un monde de passionnés qui font vivre l'équitation.", "Behind every rider, there's a whole world of enthusiasts who keep riding alive.", "Detrás de cada jinete hay todo un mundo de apasionados que dan vida a la equitación.", "Dietro ogni cavaliere c'è tutto un mondo di appassionati che fanno vivere l'equitazione.", "一人ひとりの乗り手の後ろには、乗馬を支える大勢の仲間がいる。", "Hinter jedem Reiter steht eine ganze Welt von Begeisterten, die den Reitsport lebendig halten.", "وراء كل فارس عالم كامل من المولعين الذين يُبقون الفروسية حيّة.", "每位骑手的背后，都有一群让马术生生不息的热爱者。", "Achter elke ruiter staat een hele wereld van liefhebbers die de paardensport laten leven.", "Por trás de cada cavaleiro existe todo um mundo de apaixonados que fazem a equitação viver.", "Bakom varje ryttare finns en hel värld av entusiaster som håller ridsporten levande.", "За каждым всадником стоит целый мир увлечённых людей, благодаря которым живёт конный спорт.", "Za każdym jeźdźcem stoi cały świat pasjonatów, dzięki którym jeździectwo żyje.", "모든 기수 뒤에는 승마를 살아 있게 하는 수많은 애호가가 있다."),
    chap: [
      [tt("Découvrir la FFE", "Discovering the FFE", "Descubrir la FFE", "Scoprire la FFE", "FFEを知ろう", "Die FFE entdecken", "اكتشاف الاتحاد الفرنسي", "认识 FFE", "De FFE ontdekken", "Descobrir a FFE", "Upptäck FFE", "Знакомство с FFE", "Poznaj FFE", "FFE 알아보기"), 3],
      [tt("Une fédération pour tous", "A federation for everyone", "Una federación para todos", "Una federazione per tutti", "みんなの連盟", "Ein Verband für alle", "اتحاد للجميع", "属于所有人的联合会", "Een federatie voor iedereen", "Uma federação para todos", "Ett förbund för alla", "Федерация для всех", "Federacja dla wszystkich", "모두를 위한 연맹"), 3]
    ]
  },
  "g1-c13": {
    coach: tt("Quand tu regardes un grand championnat, ne suis pas seulement les parcours. Observe aussi les bénévoles et les personnes qui travaillent pour que tout se déroule bien.", "When you watch a big championship, don't just follow the rounds. Also watch the volunteers and the people working to make everything run smoothly.", "Cuando veas un gran campeonato, no sigas solo los recorridos. Observa también a los voluntarios y a las personas que trabajan para que todo salga bien.", "Quando guardi un grande campionato, non seguire solo i percorsi. Osserva anche i volontari e le persone che lavorano perché tutto vada bene.", "大きな選手権を見るときは、競技だけを追わないで。すべてがうまく進むように働くボランティアやスタッフにも目を向けよう。", "Wenn du eine große Meisterschaft anschaust, verfolge nicht nur die Ritte. Beobachte auch die Helfer und alle, die dafür sorgen, dass alles gut läuft.", "عندما تشاهد بطولة كبيرة، لا تتابع المسارات فقط. راقب أيضًا المتطوعين والأشخاص الذين يعملون ليسير كل شيء على ما يرام.", "观看大型锦标赛时，不要只看比赛。也看看那些为了让一切顺利进行而工作的志愿者和工作人员。", "Als je naar een groot kampioenschap kijkt, volg dan niet alleen de parcoursen. Kijk ook naar de vrijwilligers en iedereen die zorgt dat alles goed verloopt.", "Quando assistir a um grande campeonato, não acompanhe só os percursos. Observe também os voluntários e as pessoas que trabalham para tudo correr bem.", "När du tittar på ett stort mästerskap, följ inte bara ritterna. Titta också på volontärerna och alla som jobbar för att allt ska fungera.", "Когда смотришь крупный чемпионат, следи не только за выступлениями. Обрати внимание и на волонтёров, и на людей, благодаря которым всё проходит хорошо.", "Kiedy oglądasz duże mistrzostwa, nie śledź tylko przejazdów. Obserwuj też wolontariuszy i osoby, które pracują, by wszystko przebiegło dobrze.", "큰 선수권 대회를 볼 때는 경기만 보지 말자. 모든 것이 잘 진행되도록 일하는 자원봉사자와 사람들도 살펴보자."),
    hb: [
      tt("Peut-on visiter le Parc Équestre Fédéral sans participer à un concours ?", "Can you visit the Parc Équestre Fédéral without competing?", "¿Se puede visitar el Parc Équestre Fédéral sin participar en un concurso?", "Si può visitare il Parc Équestre Fédéral senza partecipare a una gara?", "大会に出なくてもパルク・エケストル・フェデラルを見学できる？", "Kann man den Parc Équestre Fédéral besuchen, ohne an einem Turnier teilzunehmen?", "هل يمكن زيارة المتنزّه الفروسي الاتحادي دون المشاركة في مسابقة؟", "不参加比赛也能参观联邦马术园吗？", "Kun je het Parc Équestre Fédéral bezoeken zonder mee te doen aan een wedstrijd?", "É possível visitar o Parc Équestre Fédéral sem participar de uma competição?", "Kan man besöka Parc Équestre Fédéral utan att tävla?", "Можно ли посетить Федеральный конный парк, не участвуя в соревнованиях?", "Czy można odwiedzić Parc Équestre Fédéral bez udziału w zawodach?", "대회에 나가지 않아도 연맹 승마 공원을 방문할 수 있을까?"),
      tt("Quelles disciplines équestres peut-on y découvrir ?", "Which equestrian disciplines can you discover there?", "¿Qué disciplinas ecuestres se pueden descubrir allí?", "Quali discipline equestri si possono scoprire lì?", "そこではどんな馬術競技が見られる？", "Welche Reitdisziplinen kann man dort entdecken?", "ما تخصصات الفروسية التي يمكن اكتشافها هناك؟", "在那里能看到哪些马术项目？", "Welke disciplines kun je daar ontdekken?", "Que modalidades equestres se pode conhecer lá?", "Vilka grenar kan man upptäcka där?", "Какие конные дисциплины там можно увидеть?", "Jakie dyscypliny jeździeckie można tam poznać?", "그곳에서는 어떤 승마 종목을 볼 수 있을까?"),
      tt("Comment se déroule une journée de championnat ?", "What happens during a championship day?", "¿Cómo transcurre un día de campeonato?", "Come si svolge una giornata di campionato?", "選手権の一日はどんなふう？", "Wie läuft ein Meisterschaftstag ab?", "كيف يجري يوم البطولة؟", "锦标赛的一天是怎样的？", "Hoe verloopt een kampioenschapsdag?", "Como é um dia de campeonato?", "Hur går en mästerskapsdag till?", "Как проходит день чемпионата?", "Jak przebiega dzień mistrzostw?", "선수권 대회 하루는 어떻게 진행될까?"),
      tt("Pourquoi y a-t-il autant de bénévoles lors des compétitions ?", "Why are there so many volunteers at competitions?", "¿Por qué hay tantos voluntarios en las competiciones?", "Perché ci sono così tanti volontari durante le gare?", "大会にボランティアがたくさんいるのはなぜ？", "Warum gibt es bei Turnieren so viele Helfer?", "لماذا يوجد هذا العدد من المتطوعين في المسابقات؟", "比赛中为什么有这么多志愿者？", "Waarom zijn er zoveel vrijwilligers bij wedstrijden?", "Por que há tantos voluntários nas competições?", "Varför finns det så många volontärer på tävlingar?", "Почему на соревнованиях так много волонтёров?", "Dlaczego na zawodach jest tylu wolontariuszy?", "대회에는 왜 자원봉사자가 그렇게 많을까?"),
      tt("Que faut-il prévoir pour venir assister à un grand événement ?", "What should I plan to attend a big event?", "¿Qué hay que prever para asistir a un gran evento?", "Cosa bisogna prevedere per assistere a un grande evento?", "大きなイベントを見に行くとき、何を準備すればいい？", "Was muss ich planen, um ein großes Event zu besuchen?", "ماذا يجب أن أُحضّر لحضور حدث كبير؟", "去观看大型赛事需要准备什么？", "Wat moet ik regelen om een groot evenement bij te wonen?", "O que é preciso planejar para assistir a um grande evento?", "Vad behöver jag planera för att gå på ett stort evenemang?", "Что нужно предусмотреть, чтобы посетить большое мероприятие?", "Co trzeba zaplanować, by obejrzeć duże wydarzenie?", "큰 행사를 보러 가려면 무엇을 준비해야 할까?")
    ],
    synth: [
      tt("Lamotte-Beuvron accueille un grand site équestre.", "Lamotte-Beuvron is home to a major equestrian site.", "Lamotte-Beuvron acoge un gran recinto ecuestre.", "Lamotte-Beuvron ospita un grande sito equestre.", "ラモット＝ブーヴロンには大きな馬術施設がある。", "Lamotte-Beuvron beherbergt eine große Reitsportanlage.", "تستضيف لاموت-بوفرون موقعًا فروسيًا كبيرًا.", "拉莫特-伯夫龙有一座大型马术场地。", "Lamotte-Beuvron heeft een groot ruitersportterrein.", "Lamotte-Beuvron abriga um grande espaço equestre.", "Lamotte-Beuvron har en stor ridsportanläggning.", "В Ламот-Бёврон находится крупный конный комплекс.", "W Lamotte-Beuvron mieści się duży ośrodek jeździecki.", "라모트뵈브롱에는 큰 승마 시설이 있다."),
      tt("Ses installations permettent de nombreuses activités.", "Its facilities allow many activities.", "Sus instalaciones permiten muchas actividades.", "Le sue strutture permettono molte attività.", "施設ではさまざまな活動ができる。", "Seine Anlagen ermöglichen viele Aktivitäten.", "منشآته تتيح أنشطة كثيرة.", "它的设施可以开展多种活动。", "Zijn faciliteiten maken veel activiteiten mogelijk.", "Suas instalações permitem muitas atividades.", "Anläggningen rymmer många aktiviteter.", "Его сооружения позволяют проводить много занятий.", "Jego obiekty pozwalają na wiele aktywności.", "시설에서 다양한 활동을 할 수 있다."),
      tt("Des cavaliers s'y retrouvent pour les championnats.", "Riders gather there for championships.", "Los jinetes se reúnen allí para los campeonatos.", "I cavalieri vi si ritrovano per i campionati.", "選手権のために乗り手が集まる。", "Reiter treffen sich dort zu Meisterschaften.", "يلتقي الفرسان هناك في البطولات.", "骑手们在那里参加锦标赛。", "Ruiters komen er samen voor kampioenschappen.", "Cavaleiros se reúnem lá para os campeonatos.", "Ryttare samlas där för mästerskap.", "Всадники съезжаются туда на чемпионаты.", "Jeźdźcy spotykają się tam na mistrzostwach.", "선수권 대회에 기수들이 모인다."),
      tt("Les grands événements demandent beaucoup d'organisation.", "Big events take a lot of organisation.", "Los grandes eventos exigen mucha organización.", "I grandi eventi richiedono molta organizzazione.", "大きな大会には、たくさんの準備が必要。", "Große Events erfordern viel Organisation.", "الأحداث الكبيرة تتطلب تنظيمًا كبيرًا.", "大型赛事需要大量组织工作。", "Grote evenementen vragen veel organisatie.", "Grandes eventos exigem muita organização.", "Stora evenemang kräver mycket planering.", "Большие мероприятия требуют серьёзной организации.", "Duże wydarzenia wymagają wiele organizacji.", "큰 행사에는 많은 준비가 필요하다."),
      tt("Le Parc réunit des passionnés venus de partout.", "The Parc brings together enthusiasts from everywhere.", "El Parque reúne a aficionados de todas partes.", "Il Parco riunisce appassionati da ogni dove.", "パルクには各地から馬好きが集まる。", "Der Park vereint Begeisterte von überall.", "يجمع المتنزّه مولعين من كل مكان.", "这个园区汇聚了各地的爱好者。", "Het Parc brengt liefhebbers van overal samen.", "O Parque reúne apaixonados de todos os lugares.", "Parken samlar entusiaster från hela landet.", "Парк собирает увлечённых людей отовсюду.", "Park gromadzi pasjonatów z całego kraju.", "공원에는 곳곳에서 온 애호가들이 모인다.")
    ],
    fin: tt("À Lamotte-Beuvron, chaque parcours raconte aussi une histoire de préparation, de rencontres et de passion.", "At Lamotte-Beuvron, every round also tells a story of preparation, encounters and passion.", "En Lamotte-Beuvron, cada recorrido cuenta también una historia de preparación, encuentros y pasión.", "A Lamotte-Beuvron, ogni percorso racconta anche una storia di preparazione, incontri e passione.", "ラモット＝ブーヴロンでは、どの走行にも準備と出会いと情熱の物語がある。", "In Lamotte-Beuvron erzählt jeder Ritt auch eine Geschichte von Vorbereitung, Begegnungen und Leidenschaft.", "في لاموت-بوفرون، يروي كل مسار أيضًا قصة تحضير ولقاءات وشغف.", "在拉莫特-伯夫龙，每一轮比赛也讲述着准备、相遇与热爱的故事。", "In Lamotte-Beuvron vertelt elk parcours ook een verhaal van voorbereiding, ontmoetingen en passie.", "Em Lamotte-Beuvron, cada percurso também conta uma história de preparação, encontros e paixão.", "I Lamotte-Beuvron berättar varje ritt också en historia om förberedelser, möten och passion.", "В Ламот-Бёврон каждый маршрут — это ещё и история подготовки, встреч и увлечённости.", "W Lamotte-Beuvron każdy przejazd opowiada też historię przygotowań, spotkań i pasji.", "라모트뵈브롱에서는 모든 경기가 준비와 만남, 열정의 이야기를 들려준다."),
    chap: [
      [tt("Découvrir le Parc", "Discovering the Parc", "Descubrir el Parque", "Scoprire il Parco", "パルクを知ろう", "Den Park entdecken", "اكتشاف المتنزّه", "认识这座园区", "Het Parc ontdekken", "Descobrir o Parque", "Upptäck parken", "Знакомство с Парком", "Poznaj Park", "공원 알아보기"), 2],
      [tt("Vivre les championnats", "Experiencing the championships", "Vivir los campeonatos", "Vivere i campionati", "選手権を体験しよう", "Meisterschaften erleben", "عيش أجواء البطولات", "感受锦标赛", "De kampioenschappen beleven", "Viver os campeonatos", "Uppleva mästerskapen", "Атмосфера чемпионатов", "Przeżyj mistrzostwa", "선수권 대회 즐기기"), 2]
    ]
  },
  "g1-c16": {
    coach: tt("Un cheval peut ressembler beaucoup à un autre. Demande à ton enseignant de te montrer, sur un exemple de livret, comment vérifier qu'une description correspond au bon cheval.", "One horse can look a lot like another. Ask your instructor to show you, on a sample passport, how to check that a description matches the right horse.", "Un caballo puede parecerse mucho a otro. Pide a tu profesor que te muestre, en un ejemplo de libreta, cómo comprobar que una descripción corresponde al caballo correcto.", "Un cavallo può somigliare molto a un altro. Chiedi al tuo istruttore di mostrarti, su un esempio di libretto, come verificare che una descrizione corrisponda al cavallo giusto.", "よく似た馬はたくさんいる。見本の手帳を使って、記載が正しい馬と合っているか確かめる方法を先生に見せてもらおう。", "Ein Pferd kann einem anderen sehr ähnlich sehen. Bitte deinen Reitlehrer, dir an einem Beispielpass zu zeigen, wie man prüft, ob eine Beschreibung zum richtigen Pferd passt.", "قد يشبه حصانٌ حصانًا آخر كثيرًا. اطلب من مدرّبك أن يُريك، على نموذج دفتر، كيف تتحقق من أن الوصف يطابق الحصان الصحيح.", "一匹马可能和另一匹非常像。请教练用一本示例证件告诉你，如何核对描述是否与正确的马相符。", "Een paard kan erg op een ander lijken. Vraag je instructeur je aan de hand van een voorbeeldpaspoort te laten zien hoe je controleert of een beschrijving bij het juiste paard hoort.", "Um cavalo pode se parecer muito com outro. Peça ao seu instrutor para mostrar, num exemplo de passaporte, como verificar se uma descrição corresponde ao cavalo certo.", "En häst kan likna en annan mycket. Be din instruktör visa dig, i ett exempelpass, hur man kontrollerar att en beskrivning stämmer med rätt häst.", "Одна лошадь может быть очень похожа на другую. Попроси тренера показать на примере паспорта, как проверить, что описание соответствует нужной лошади.", "Jeden koń może być bardzo podobny do innego. Poproś instruktora, by na przykładowym paszporcie pokazał ci, jak sprawdzić, czy opis pasuje do właściwego konia.", "어떤 말은 다른 말과 아주 비슷할 수 있다. 선생님께 견본 여권으로 설명이 맞는 말과 일치하는지 확인하는 법을 보여 달라고 하자."),
    defi: {
      titre: tt("Détective du passeport", "Passport detective", "Detective del pasaporte", "Detective del passaporto", "パスポート探偵", "Pass-Detektiv", "محقّق جواز السفر", "证件侦探", "Paspoortdetective", "Detetive do passaporte", "Passdetektiv", "Детектив паспорта", "Detektyw paszportu", "여권 탐정"),
      accroche: tt("Avec ton enseignant, examine une copie de livret pour découvrir comment on identifie un cheval.", "With your instructor, look at a copy of a passport to find out how a horse is identified.", "Con tu profesor, examina una copia de libreta para descubrir cómo se identifica a un caballo.", "Con il tuo istruttore, esamina una copia del libretto per scoprire come si identifica un cavallo.", "先生といっしょに手帳のコピーを調べて、馬をどうやって見分けるのか知ろう。", "Sieh dir mit deinem Reitlehrer eine Passkopie an und entdecke, wie ein Pferd identifiziert wird.", "مع مدرّبك، افحص نسخة من الدفتر لتكتشف كيف يُعرَّف الحصان.", "和教练一起查看一份证件复印件，了解如何识别一匹马。", "Bekijk met je instructeur een kopie van een paspoort en ontdek hoe een paard geïdentificeerd wordt.", "Com seu instrutor, examine uma cópia do passaporte para descobrir como se identifica um cavalo.", "Titta på en kopia av ett hästpass med din instruktör och upptäck hur en häst identifieras.", "Вместе с тренером изучи копию паспорта и узнай, как опознают лошадь.", "Z instruktorem przejrzyj kopię paszportu i odkryj, jak identyfikuje się konia.", "선생님과 함께 여권 사본을 살펴보며 말을 어떻게 식별하는지 알아보자."),
      points: [
        tt("Retrouve le numéro d'identification sur le document.", "Find the identification number on the document.", "Encuentra el número de identificación en el documento.", "Ritrova il numero di identificazione sul documento.", "書類の中で識別番号を見つけよう。", "Finde die Identifikationsnummer im Dokument.", "اعثر على رقم التعريف في الوثيقة.", "在证件上找到识别号码。", "Zoek het identificatienummer op het document.", "Encontre o número de identificação no documento.", "Hitta identifieringsnumret i dokumentet.", "Найди в документе идентификационный номер.", "Odszukaj w dokumencie numer identyfikacyjny.", "서류에서 식별 번호를 찾아보자."),
        tt("Repère une information permettant de décrire le cheval.", "Spot a piece of information that describes the horse.", "Localiza un dato que permita describir al caballo.", "Individua un'informazione che descrive il cavallo.", "馬の特徴を説明する情報をひとつ見つけよう。", "Finde eine Angabe, die das Pferd beschreibt.", "حدّد معلومة تصف الحصان.", "找出一条描述这匹马的信息。", "Zoek een gegeven dat het paard beschrijft.", "Encontre uma informação que descreva o cavalo.", "Hitta en uppgift som beskriver hästen.", "Найди сведения, описывающие лошадь.", "Wskaż informację opisującą konia.", "말을 설명하는 정보 하나를 찾아보자."),
        tt("Explique à qui demander si une information semble incorrecte.", "Explain who to ask if some information looks wrong.", "Explica a quién preguntar si un dato parece incorrecto.", "Spiega a chi chiedere se un'informazione sembra sbagliata.", "情報がまちがっていそうなとき、だれに聞けばいいか説明しよう。", "Erkläre, wen man fragt, wenn eine Angabe falsch scheint.", "اشرح لمن تتوجه إذا بدت معلومة غير صحيحة.", "说说如果信息看起来有误应该问谁。", "Leg uit aan wie je het vraagt als een gegeven niet lijkt te kloppen.", "Explique a quem perguntar se uma informação parecer errada.", "Förklara vem man frågar om en uppgift verkar fel.", "Объясни, к кому обратиться, если сведения кажутся неверными.", "Wyjaśnij, kogo zapytać, jeśli informacja wydaje się błędna.", "정보가 틀린 것 같으면 누구에게 물어야 하는지 설명하자.")
      ]
    },
    hb: [
      tt("Quelle différence existe-t-il entre le nom du cheval et son numéro ?", "What's the difference between a horse's name and its number?", "¿Qué diferencia hay entre el nombre del caballo y su número?", "Che differenza c'è tra il nome del cavallo e il suo numero?", "馬の名前と番号にはどんなちがいがあるの？", "Was ist der Unterschied zwischen dem Namen eines Pferdes und seiner Nummer?", "ما الفرق بين اسم الحصان ورقمه؟", "马的名字和号码有什么区别？", "Wat is het verschil tussen de naam van een paard en zijn nummer?", "Qual é a diferença entre o nome do cavalo e o número dele?", "Vad är skillnaden mellan hästens namn och dess nummer?", "Чем отличается кличка лошади от её номера?", "Czym różni się imię konia od jego numeru?", "말의 이름과 번호는 어떻게 다를까?"),
      tt("Comment distinguer deux chevaux qui se ressemblent beaucoup ?", "How can you tell apart two horses that look very alike?", "¿Cómo distinguir dos caballos que se parecen mucho?", "Come distinguere due cavalli che si somigliano molto?", "よく似た2頭の馬はどうやって見分ける？", "Wie unterscheidet man zwei Pferde, die sich sehr ähneln?", "كيف أميّز بين حصانين متشابهين جدًا؟", "怎么分辨两匹长得很像的马？", "Hoe onderscheid je twee paarden die erg op elkaar lijken?", "Como distinguir dois cavalos muito parecidos?", "Hur skiljer man två hästar som är mycket lika?", "Как различить двух очень похожих лошадей?", "Jak odróżnić dwa bardzo podobne konie?", "아주 닮은 두 말은 어떻게 구별할까?"),
      tt("Qui peut lire la puce électronique d'un cheval ?", "Who can read a horse's microchip?", "¿Quién puede leer el microchip de un caballo?", "Chi può leggere il microchip di un cavallo?", "馬のマイクロチップはだれが読めるの？", "Wer kann den Mikrochip eines Pferdes auslesen?", "من يمكنه قراءة الشريحة الإلكترونية للحصان؟", "谁能读取马的电子芯片？", "Wie kan de chip van een paard uitlezen?", "Quem pode ler o microchip de um cavalo?", "Vem kan läsa av en hästs chip?", "Кто может считать электронный чип лошади?", "Kto może odczytać chip konia?", "말의 마이크로칩은 누가 읽을 수 있을까?"),
      tt("Que faire si le livret d'un cheval est perdu ?", "What should you do if a horse's passport is lost?", "¿Qué hacer si se pierde la libreta de un caballo?", "Cosa fare se il libretto di un cavallo è perso?", "馬の手帳をなくしたらどうする？", "Was tun, wenn der Pass eines Pferdes verloren ist?", "ماذا أفعل إذا ضاع دفتر الحصان؟", "如果马的证件丢了怎么办？", "Wat doe je als het paspoort van een paard kwijt is?", "O que fazer se o passaporte de um cavalo for perdido?", "Vad gör man om hästens pass har kommit bort?", "Что делать, если паспорт лошади потерян?", "Co zrobić, jeśli paszport konia zaginął?", "말의 여권을 잃어버리면 어떻게 할까?"),
      tt("Pourquoi faut-il vérifier ses documents avant certains déplacements ?", "Why should its documents be checked before some trips?", "¿Por qué hay que comprobar sus documentos antes de algunos desplazamientos?", "Perché bisogna verificare i suoi documenti prima di alcuni spostamenti?", "移動の前に書類を確かめるのはなぜ？", "Warum muss man vor manchen Transporten die Papiere prüfen?", "لماذا يجب التحقق من وثائقه قبل بعض التنقلات؟", "为什么某些出行前要检查它的证件？", "Waarom moet je de papieren controleren voor bepaalde verplaatsingen?", "Por que é preciso verificar os documentos antes de certos deslocamentos?", "Varför ska papperen kontrolleras inför vissa resor?", "Почему перед некоторыми поездками нужно проверить документы?", "Dlaczego przed niektórymi podróżami trzeba sprawdzić dokumenty?", "왜 이동하기 전에 서류를 확인해야 할까?")
    ],
    synth: [
      tt("Chaque cheval possède sa propre identification.", "Every horse has its own identification.", "Cada caballo tiene su propia identificación.", "Ogni cavallo ha la propria identificazione.", "どの馬にも自分だけの識別がある。", "Jedes Pferd hat seine eigene Kennzeichnung.", "لكل حصان تعريفه الخاص.", "每匹马都有自己的身份标识。", "Elk paard heeft zijn eigen identificatie.", "Cada cavalo tem sua própria identificação.", "Varje häst har sin egen identitet.", "У каждой лошади своя идентификация.", "Każdy koń ma własną identyfikację.", "말마다 고유한 식별 정보가 있다."),
      tt("Son livret rassemble des informations importantes.", "Its passport holds important information.", "Su libreta reúne información importante.", "Il suo libretto raccoglie informazioni importanti.", "手帳には大切な情報がまとまっている。", "Sein Pass enthält wichtige Angaben.", "دفتره يجمع معلومات مهمة.", "它的证件汇集了重要信息。", "Zijn paspoort bevat belangrijke gegevens.", "Seu passaporte reúne informações importantes.", "Passet samlar viktig information.", "Паспорт содержит важные сведения.", "Paszport zawiera ważne informacje.", "여권에는 중요한 정보가 담겨 있다."),
      tt("Son signalement aide à le reconnaître.", "Its markings description helps identify it.", "Su reseña ayuda a reconocerlo.", "Il suo segnalamento aiuta a riconoscerlo.", "特徴の記載が見分ける助けになる。", "Das Signalement hilft, es zu erkennen.", "وصف علاماته يساعد على التعرّف عليه.", "特征描述有助于认出它。", "Het signalement helpt het te herkennen.", "A resenha ajuda a reconhecê-lo.", "Signalementet hjälper att känna igen den.", "Описание примет помогает её узнать.", "Opis pomaga go rozpoznać.", "특징 기록은 말을 알아보는 데 도움이 된다."),
      tt("Sa puce permet une vérification électronique.", "Its microchip allows electronic checking.", "Su microchip permite una verificación electrónica.", "Il microchip consente una verifica elettronica.", "チップで電子的に確認できる。", "Der Chip erlaubt eine elektronische Prüfung.", "شريحته تتيح تحققًا إلكترونيًا.", "芯片可以进行电子核对。", "De chip maakt een elektronische controle mogelijk.", "O microchip permite uma verificação eletrônica.", "Chipet gör elektronisk kontroll möjlig.", "Чип позволяет проверить её электронно.", "Chip umożliwia kontrolę elektroniczną.", "칩으로 전자 확인을 할 수 있다."),
      tt("Son identification reste liée à lui toute sa vie.", "Its identification stays with it for life.", "Su identificación lo acompaña toda la vida.", "La sua identificazione resta legata a lui per tutta la vita.", "識別は一生その馬とともにある。", "Die Kennzeichnung bleibt ein Leben lang.", "يبقى تعريفه مرتبطًا به طوال حياته.", "身份标识伴随它一生。", "De identificatie blijft zijn hele leven bij hem.", "A identificação fica ligada a ele a vida toda.", "Identiteten följer hästen hela livet.", "Идентификация остаётся с ней на всю жизнь.", "Identyfikacja pozostaje z nim na całe życie.", "식별 정보는 평생 그 말과 함께한다.")
    ],
    fin: tt("Chaque cheval a son histoire, et son passeport permet de ne jamais la confondre avec une autre.", "Every horse has its own story, and its passport makes sure it's never mixed up with another.", "Cada caballo tiene su historia, y su pasaporte permite no confundirla nunca con otra.", "Ogni cavallo ha la sua storia, e il suo passaporto permette di non confonderla mai con un'altra.", "どの馬にも物語があり、パスポートがあればほかの馬と取りちがえることはない。", "Jedes Pferd hat seine Geschichte, und sein Pass sorgt dafür, dass sie nie mit einer anderen verwechselt wird.", "لكل حصان قصته، وجوازه يضمن ألا تختلط بقصة أخرى أبدًا.", "每匹马都有自己的故事，它的证件让这个故事永远不会与别的混淆。", "Elk paard heeft zijn verhaal, en zijn paspoort zorgt dat het nooit met een ander verward wordt.", "Cada cavalo tem sua história, e seu passaporte garante que ela nunca seja confundida com outra.", "Varje häst har sin historia, och passet ser till att den aldrig förväxlas med en annan.", "У каждой лошади своя история, и паспорт не даёт спутать её с другой.", "Każdy koń ma swoją historię, a paszport sprawia, że nigdy nie pomyli się jej z inną.", "말마다 저마다의 이야기가 있고, 여권 덕분에 다른 말과 헷갈리지 않는다."),
    chap: [
      [tt("Son livret d'identité", "Its identity booklet", "Su libreta de identidad", "Il suo libretto d'identità", "身分の手帳", "Sein Ausweisheft", "دفتر هويته", "它的身份证件", "Zijn identiteitsboekje", "Seu livreto de identidade", "Dess identitetsbok", "Его удостоверение", "Jego dowód tożsamości", "말의 신분 수첩"), 2],
      [tt("Un document qui suit", "A document that travels with it", "Un documento que lo acompaña", "Un documento che lo segue", "いつもいっしょの書類", "Ein Dokument, das mitreist", "وثيقة ترافقه", "随行的证件", "Een document dat meegaat", "Um documento que acompanha", "Ett dokument som följer med", "Документ всегда с ней", "Dokument, który mu towarzyszy", "늘 함께하는 서류"), 3],
      [tt("Reconnaître le bon cheval", "Recognising the right horse", "Reconocer al caballo correcto", "Riconoscere il cavallo giusto", "正しい馬を見分ける", "Das richtige Pferd erkennen", "التعرّف على الحصان الصحيح", "认出正确的马", "Het juiste paard herkennen", "Reconhecer o cavalo certo", "Känna igen rätt häst", "Узнать нужную лошадь", "Rozpoznać właściwego konia", "올바른 말 알아보기"), 4]
    ]
  },
  "g1-c17": {
    coach: tt("Ne te concentre pas uniquement sur ton matériel : regarde aussi les réactions de ton cheval pendant la préparation. S'il se crispe ou semble gêné, arrête ton geste et demande conseil à ton enseignant.", "Don't focus only on your equipment: also watch your horse's reactions while you tack up. If it tenses or seems uncomfortable, stop and ask your instructor for advice.", "No te centres solo en tu material: observa también las reacciones de tu caballo durante la preparación. Si se tensa o parece incómodo, detén tu gesto y pide consejo a tu profesor.", "Non concentrarti solo sull'attrezzatura: guarda anche le reazioni del tuo cavallo durante la preparazione. Se si irrigidisce o sembra a disagio, fermati e chiedi consiglio al tuo istruttore.", "道具ばかりに集中しないで、準備中の馬の反応も見よう。かたくなったり、いやがったりしたら手を止めて、先生に相談しよう。", "Konzentriere dich nicht nur auf die Ausrüstung: Achte beim Fertigmachen auch auf die Reaktionen deines Pferdes. Wenn es sich verspannt oder unwohl wirkt, hör auf und frag deinen Reitlehrer um Rat.", "لا تركّز على معداتك فقط: راقب أيضًا ردود فعل حصانك أثناء التجهيز. إذا تشنّج أو بدا منزعجًا، توقّف واطلب النصيحة من مدرّبك.", "不要只专注于马具：备马时也要观察马的反应。如果它紧绷或显得不舒服，就停下来，向教练请教。", "Let niet alleen op je materiaal: kijk tijdens het opzadelen ook naar de reacties van je paard. Als het zich spant of ongemakkelijk lijkt, stop dan en vraag je instructeur om raad.", "Não se concentre só no material: observe também as reações do seu cavalo durante a preparação. Se ele ficar tenso ou parecer incomodado, pare e peça conselho ao seu instrutor.", "Fokusera inte bara på utrustningen: titta också på hästens reaktioner medan du gör i ordning den. Om den spänner sig eller verkar obekväm, sluta och fråga din instruktör.", "Не сосредотачивайся только на снаряжении: следи и за реакциями лошади во время подготовки. Если она напрягается или ей неудобно, остановись и спроси совета у тренера.", "Nie skupiaj się tylko na sprzęcie: obserwuj też reakcje konia podczas przygotowania. Jeśli się spina lub wydaje się skrępowany, przerwij i poproś instruktora o radę.", "장비에만 집중하지 말고 준비하는 동안 말의 반응도 살펴보자. 말이 긴장하거나 불편해 보이면 동작을 멈추고 선생님께 조언을 구하자."),
    fin: tt("Préparer son cheval avec attention, c'est déjà commencer à construire une belle séance ensemble.", "Getting your horse ready with care is already the start of a good session together.", "Preparar a tu caballo con atención ya es empezar a construir una buena sesión juntos.", "Preparare il cavallo con attenzione è già iniziare a costruire una bella sessione insieme.", "ていねいに準備することが、いっしょにすごすよいレッスンの始まり。", "Sein Pferd aufmerksam vorzubereiten heißt schon, gemeinsam eine schöne Reitstunde aufzubauen.", "تجهيز حصانك بعناية هو بداية حصة جميلة معًا.", "用心为马做准备，就是共同打造一堂好课的开始。", "Je paard met aandacht klaarmaken is al het begin van een fijne les samen.", "Preparar o cavalo com atenção já é começar a construir uma bela sessão juntos.", "Att göra i ordning hästen med omsorg är redan början på ett fint pass tillsammans.", "Внимательно подготовить лошадь — значит уже начать строить хорошее занятие вместе.", "Staranne przygotowanie konia to już początek wspólnej, udanej jazdy.", "정성껏 말을 준비하는 것이 함께하는 좋은 수업의 시작이다.")
  },
  "g1-c19": { fusion: [[5, 4]] },   /* « Pour finir » (le savais-tu, les erreurs) rejoint « Descendre » : 5 chapitres */
  "g1-c18": {
    synth: [
      tt("En main, tu guides sans tirer brusquement.", "In hand, you lead without pulling sharply.", "Del ramal, guías sin tirar bruscamente.", "A mano, guidi senza tirare bruscamente.", "引き馬では、急に引っぱらずに導く。", "An der Hand führst du, ohne ruckartig zu ziehen.", "عند القيادة باليد، توجّه دون شدّ مفاجئ.", "牵马时，引导而不猛拉。", "Aan de hand leid je zonder hard te trekken.", "Na guia, você conduz sem puxar bruscamente.", "Vid hand leder du utan att rycka.", "В поводу ты ведёшь, не дёргая.", "Prowadząc w ręku, nie szarpiesz.", "끌고 갈 때는 갑자기 당기지 않고 이끈다."),
      tt("Ton attention reste tournée vers le cheval.", "Your attention stays on the horse.", "Tu atención sigue puesta en el caballo.", "La tua attenzione resta rivolta al cavallo.", "注意はいつも馬に向けておく。", "Deine Aufmerksamkeit bleibt beim Pferd.", "انتباهك يبقى موجّهًا نحو الحصان.", "注意力始终放在马身上。", "Je aandacht blijft bij het paard.", "Sua atenção fica voltada para o cavalo.", "Din uppmärksamhet är på hästen.", "Твоё внимание обращено на лошадь.", "Twoja uwaga pozostaje skupiona na koniu.", "주의는 늘 말에게 둔다."),
      tt("Une distance adaptée protège tes pieds.", "The right distance protects your feet.", "Una distancia adecuada protege tus pies.", "Una distanza adeguata protegge i tuoi piedi.", "ちょうどよい距離が足を守る。", "Der richtige Abstand schützt deine Füße.", "المسافة المناسبة تحمي قدميك.", "合适的距离保护你的脚。", "De juiste afstand beschermt je voeten.", "Uma distância adequada protege seus pés.", "Rätt avstånd skyddar dina fötter.", "Правильная дистанция бережёт твои ноги.", "Odpowiedni dystans chroni twoje stopy.", "알맞은 거리가 발을 지켜 준다."),
      tt("Les passages délicats demandent calme et anticipation.", "Tricky passages call for calm and anticipation.", "Los pasos delicados piden calma y anticipación.", "I passaggi delicati richiedono calma e anticipo.", "むずかしい場所では落ち着いて先を読む。", "Heikle Stellen verlangen Ruhe und Voraussicht.", "الممرات الصعبة تتطلب هدوءًا واستباقًا.", "难走的地方需要冷静和预判。", "Lastige doorgangen vragen rust en vooruitdenken.", "Passagens delicadas pedem calma e antecipação.", "Knepiga passager kräver lugn och framförhållning.", "Сложные места требуют спокойствия и предвидения.", "Trudne przejścia wymagają spokoju i przewidywania.", "까다로운 곳에서는 침착하게 미리 대비한다."),
      tt("Si tu hésites, demande l'aide de ton enseignant.", "If you're unsure, ask your instructor for help.", "Si dudas, pide ayuda a tu profesor.", "Se esiti, chiedi aiuto al tuo istruttore.", "迷ったら先生に助けを求めよう。", "Wenn du unsicher bist, bitte deinen Reitlehrer um Hilfe.", "إذا تردّدت، اطلب مساعدة مدرّبك.", "如果犹豫，就请教练帮忙。", "Twijfel je, vraag dan je instructeur om hulp.", "Se hesitar, peça ajuda ao seu instrutor.", "Om du tvekar, be din instruktör om hjälp.", "Если сомневаешься, попроси помощи у тренера.", "Jeśli się wahasz, poproś instruktora o pomoc.", "망설여지면 선생님께 도움을 청하자.")
    ]
  }
};


/* v6 — 31/10 soir : PARTIES MANQUANTES DU GALOP 2 (rédigées par ChatGPT, transmises par Blandine), 14 langues.
   Même règle : ajoutées SEULEMENT là où le cours n'a rien. fusion = regroupement de chapitres (5 au plus), à valider. */
Object.assign(COMPL, {
  "g2-aides": {
    fusion: [[1, 0], [3, 2], [5, 4], [7, 6]],
    synth: [
      tt("Le cheval apprend à comprendre des indications régulières.", "Horses learn to understand consistent signals.", "El caballo aprende a entender indicaciones regulares.", "Il cavallo impara a capire indicazioni regolari.", "馬はいつも同じ合図を理解できるようになる。", "Das Pferd lernt, gleichbleibende Hilfen zu verstehen.", "يتعلّم الحصان فهم الإشارات المنتظمة.", "马学会理解一致的指令。", "Het paard leert regelmatige hulpen begrijpen.", "O cavalo aprende a entender indicações regulares.", "Hästen lär sig förstå jämna signaler.", "Лошадь учится понимать постоянные сигналы.", "Koń uczy się rozumieć regularne sygnały.", "말은 일관된 신호를 이해하게 된다."),
      tt("Ton équilibre participe à la communication.", "Your balance is part of the conversation.", "Tu equilibrio forma parte de la comunicación.", "Il tuo equilibrio fa parte della comunicazione.", "きみのバランスも合図のひとつ。", "Dein Gleichgewicht gehört zur Verständigung.", "توازنك جزء من التواصل.", "你的平衡也是沟通的一部分。", "Je evenwicht hoort bij de communicatie.", "Seu equilíbrio faz parte da comunicação.", "Din balans är en del av kommunikationen.", "Твоё равновесие участвует в общении.", "Twoja równowaga jest częścią komunikacji.", "너의 균형도 소통의 일부다."),
      tt("Tes actions doivent pouvoir se distinguer.", "Your actions must be easy to tell apart.", "Tus acciones deben poder distinguirse.", "Le tue azioni devono potersi distinguere.", "合図はひとつひとつ区別できるように。", "Deine Hilfen müssen unterscheidbar sein.", "يجب أن تكون حركاتك قابلة للتمييز.", "你的每个动作都要能被区分。", "Je hulpen moeten van elkaar te onderscheiden zijn.", "Suas ações devem poder ser distinguidas.", "Dina signaler ska gå att skilja åt.", "Твои действия должны быть различимы.", "Twoje działania muszą być rozróżnialne.", "동작은 서로 구별될 수 있어야 한다."),
      tt("Relâcher permet de confirmer une bonne réponse.", "Releasing confirms a good response.", "Ceder confirma una buena respuesta.", "Cedere conferma una buona risposta.", "ゆるめることで、よい反応を伝えられる。", "Nachgeben bestätigt eine gute Reaktion.", "التخفيف يؤكّد الاستجابة الجيدة.", "放松能确认正确的回应。", "Ontspannen bevestigt een goede reactie.", "Aliviar confirma uma boa resposta.", "Att släppa bekräftar ett bra svar.", "Ослабление подтверждает правильный ответ.", "Odpuszczenie potwierdza dobrą odpowiedź.", "풀어 주면 좋은 반응을 확인해 줄 수 있다."),
      tt("La finesse se construit avec la pratique.", "Finesse comes with practice.", "La finura se construye con la práctica.", "La finezza si costruisce con la pratica.", "繊細さは練習で身につく。", "Feinheit entsteht durch Übung.", "الدقة تُبنى بالممارسة.", "细腻来自练习。", "Finesse bouw je op met oefening.", "A finura se constrói com a prática.", "Finess kommer med övning.", "Тонкость приходит с практикой.", "Finezja przychodzi z praktyką.", "섬세함은 연습으로 쌓인다.")
    ],
    fin: tt("Plus tes gestes deviennent lisibles, plus le dialogue avec ton cheval devient léger.", "The clearer your movements become, the lighter the conversation with your horse.", "Cuanto más claros son tus gestos, más ligero se vuelve el diálogo con tu caballo.", "Più i tuoi gesti diventano chiari, più il dialogo con il tuo cavallo diventa leggero.", "動きがわかりやすくなるほど、馬との会話は軽やかになる。", "Je klarer deine Bewegungen werden, desto leichter wird der Dialog mit deinem Pferd.", "كلما أصبحت حركاتك أوضح، صار الحوار مع حصانك أخف.", "你的动作越清晰，与马的对话就越轻盈。", "Hoe duidelijker je bewegingen worden, hoe lichter het gesprek met je paard.", "Quanto mais seus gestos ficam claros, mais leve se torna o diálogo com seu cavalo.", "Ju tydligare dina rörelser blir, desto lättare blir samtalet med hästen.", "Чем понятнее твои движения, тем легче диалог с лошадью.", "Im czytelniejsze są twoje ruchy, tym lżejszy staje się dialog z koniem.", "동작이 분명해질수록 말과의 대화는 가벼워진다.")
  },
  "g2-depart": {
    synth: [
      tt("Le départ commence avant la demande.", "The transition starts before you ask.", "La salida empieza antes de la petición.", "La partenza inizia prima della richiesta.", "発進は合図の前から始まっている。", "Der Angalopp beginnt vor der Hilfe.", "الانطلاق يبدأ قبل الطلب.", "起步在发出要求之前就开始了。", "Het aangaloperen begint vóór de vraag.", "A partida começa antes do pedido.", "Fattningen börjar före signalen.", "Подъём начинается ещё до команды.", "Zagalopowanie zaczyna się przed sygnałem.", "출발은 요청하기 전부터 시작된다."),
      tt("L'allure précédente doit rester organisée.", "The previous gait must stay organised.", "El aire anterior debe seguir organizado.", "L'andatura precedente deve restare ordinata.", "その前の歩法を整えておく。", "Die vorherige Gangart bleibt geordnet.", "يجب أن تبقى المشية السابقة منظّمة.", "之前的步法要保持有序。", "De vorige gang blijft georganiseerd.", "O andamento anterior deve continuar organizado.", "Gångarten innan ska vara ordnad.", "Предыдущий аллюр должен оставаться собранным.", "Poprzedni chód musi pozostać uporządkowany.", "앞선 보법이 잘 정돈되어 있어야 한다."),
      tt("Ton corps accompagne sans précipiter.", "Your body follows without rushing.", "Tu cuerpo acompaña sin precipitarse.", "Il tuo corpo accompagna senza fretta.", "からだは急がずについていく。", "Dein Körper begleitet, ohne zu hetzen.", "جسمك يرافق دون تسرّع.", "身体跟随而不急躁。", "Je lichaam volgt zonder te haasten.", "Seu corpo acompanha sem pressa.", "Kroppen följer med utan att stressa.", "Тело сопровождает, не торопясь.", "Ciało towarzyszy bez pośpiechu.", "몸은 서두르지 않고 따라간다."),
      tt("Les premières foulées demandent de la stabilité.", "The first strides need stability.", "Los primeros trancos piden estabilidad.", "Le prime falcate richiedono stabilità.", "最初の数完歩は安定が大切。", "Die ersten Galoppsprünge brauchen Stabilität.", "الخطوات الأولى تتطلب الثبات.", "最初几步需要稳定。", "De eerste galopsprongen vragen stabiliteit.", "As primeiras passadas pedem estabilidade.", "De första sprången kräver stabilitet.", "Первые темпы требуют устойчивости.", "Pierwsze foule wymagają stabilności.", "첫 몇 보는 안정이 필요하다."),
      tt("Le calme aide à retrouver le bon rythme.", "Calm helps you find the right rhythm again.", "La calma ayuda a recuperar el buen ritmo.", "La calma aiuta a ritrovare il ritmo giusto.", "落ち着きがよいリズムを取りもどす。", "Ruhe hilft, den richtigen Rhythmus wiederzufinden.", "الهدوء يساعد على استعادة الإيقاع الصحيح.", "冷静有助于找回正确的节奏。", "Rust helpt het juiste ritme terug te vinden.", "A calma ajuda a reencontrar o bom ritmo.", "Lugnet hjälper dig hitta rätt rytm igen.", "Спокойствие помогает вернуть нужный ритм.", "Spokój pomaga odzyskać właściwy rytm.", "차분함이 좋은 리듬을 되찾게 한다.")
    ],
    fin: tt("Un beau départ au galop commence par un cheval disponible et un cavalier qui sait attendre.", "A good canter transition starts with an attentive horse and a rider who knows how to wait.", "Una buena salida al galope empieza con un caballo disponible y un jinete que sabe esperar.", "Una bella partenza al galoppo inizia con un cavallo disponibile e un cavaliere che sa aspettare.", "よい駈歩発進は、こたえる準備のできた馬と、待つことを知る乗り手から始まる。", "Ein schöner Galoppstart beginnt mit einem aufmerksamen Pferd und einem Reiter, der warten kann.", "الانطلاق الجميل في العدو يبدأ بحصان مستعد وفارس يعرف كيف ينتظر.", "漂亮的跑步起步始于一匹专注的马和一位懂得等待的骑手。", "Een mooi aangaloperen begint met een aandachtig paard en een ruiter die kan wachten.", "Uma bela partida ao galope começa com um cavalo disponível e um cavaleiro que sabe esperar.", "En fin galoppfattning börjar med en uppmärksam häst och en ryttare som kan vänta.", "Красивый подъём в галоп начинается с внимательной лошади и всадника, который умеет ждать.", "Piękne zagalopowanie zaczyna się od uważnego konia i jeźdźca, który umie czekać.", "멋진 구보 출발은 준비된 말과 기다릴 줄 아는 기수에서 시작된다.")
  },
  "g2-c1": {
    coach: tt("Prépare ton matériel avant d'aller chercher ton cheval : tu seras plus disponible pour lui. Si un réglage ou une réaction t'inquiète, demande à ton enseignant de vérifier avant de continuer.", "Get your equipment ready before you fetch your horse: you'll be more available for it. If a fitting or a reaction worries you, ask your instructor to check before carrying on.", "Prepara tu material antes de ir a buscar a tu caballo: estarás más disponible para él. Si un ajuste o una reacción te preocupa, pide a tu profesor que lo compruebe antes de continuar.", "Prepara l'attrezzatura prima di andare a prendere il cavallo: sarai più disponibile per lui. Se una regolazione o una reazione ti preoccupa, chiedi al tuo istruttore di controllare prima di continuare.", "馬を連れてくる前に道具を準備しておこう。そのほうが馬に集中できる。調整や馬の反応が気になったら、続ける前に先生に確認してもらおう。", "Bereite deine Ausrüstung vor, bevor du dein Pferd holst: So hast du mehr Zeit für es. Wenn dich eine Einstellung oder eine Reaktion beunruhigt, lass deinen Reitlehrer prüfen, bevor du weitermachst.", "جهّز معداتك قبل أن تحضر حصانك: ستكون أكثر تفرّغًا له. إذا أقلقك ضبطٌ ما أو ردّ فعل، اطلب من مدرّبك التحقق قبل أن تكمل.", "去牵马之前先准备好马具：这样你能更专心照顾它。如果某个调整或马的反应让你担心，继续之前请教练检查。", "Leg je materiaal klaar voordat je je paard gaat halen: dan heb je meer aandacht voor hem. Maakt een afstelling of een reactie je ongerust, vraag dan je instructeur om te controleren voordat je verdergaat.", "Prepare seu material antes de buscar seu cavalo: você ficará mais disponível para ele. Se um ajuste ou uma reação te preocupar, peça ao seu instrutor para verificar antes de continuar.", "Gör i ordning utrustningen innan du hämtar hästen: då har du mer tid för den. Om en inställning eller en reaktion oroar dig, be din instruktör kontrollera innan du fortsätter.", "Подготовь снаряжение, прежде чем идти за лошадью: так ты будешь внимательнее к ней. Если какая-то подгонка или реакция тебя тревожит, попроси тренера проверить, прежде чем продолжать.", "Przygotuj sprzęt, zanim pójdziesz po konia: będziesz miał dla niego więcej uwagi. Jeśli jakieś ustawienie albo reakcja cię niepokoi, poproś instruktora o sprawdzenie, zanim przejdziesz dalej.", "말을 데리러 가기 전에 장비를 준비해 두자. 그래야 말에게 더 집중할 수 있다. 조정이나 말의 반응이 걱정되면, 계속하기 전에 선생님께 확인해 달라고 하자."),
    defi: {
      titre: tt("Mission préparation sereine", "Calm preparation mission", "Misión preparación serena", "Missione preparazione serena", "落ち着いて準備ミッション", "Mission: ruhig vorbereiten", "مهمة: تجهيز بهدوء", "从容备马任务", "Missie: rustig voorbereiden", "Missão preparação tranquila", "Uppdrag: lugn förberedelse", "Миссия: спокойная подготовка", "Misja: spokojne przygotowanie", "차분한 준비 미션"),
      accroche: tt("Avec ton enseignant, organise une préparation complète sans chercher à aller vite.", "With your instructor, organise a full preparation without trying to go fast.", "Con tu profesor, organiza una preparación completa sin intentar ir rápido.", "Con il tuo istruttore, organizza una preparazione completa senza cercare di andare veloce.", "先生といっしょに、急がずにすべての準備をしよう。", "Organisiere mit deinem Reitlehrer eine komplette Vorbereitung, ohne dich zu beeilen.", "مع مدرّبك، نظّم تجهيزًا كاملًا دون أن تحاول الإسراع.", "和教练一起，不求快地完成一次完整的备马。", "Organiseer met je instructeur een volledige voorbereiding zonder te haasten.", "Com seu instrutor, organize uma preparação completa sem tentar ir rápido.", "Gör en fullständig förberedelse med din instruktör, utan att försöka gå fort.", "Вместе с тренером проведи полную подготовку, не стараясь спешить.", "Z instruktorem przeprowadź pełne przygotowanie, nie próbując się spieszyć.", "선생님과 함께 서두르지 않고 준비를 처음부터 끝까지 해 보자."),
      points: [
        tt("Dispose les outils dans un ordre pratique et sûr.", "Lay out the tools in a practical, safe order.", "Coloca las herramientas en un orden práctico y seguro.", "Disponi gli attrezzi in un ordine pratico e sicuro.", "道具を使いやすく安全な順に並べよう。", "Lege die Utensilien praktisch und sicher bereit.", "رتّب الأدوات بترتيب عملي وآمن.", "把工具按方便又安全的顺序摆好。", "Leg de spullen in een praktische en veilige volgorde.", "Organize as ferramentas numa ordem prática e segura.", "Lägg fram verktygen i en praktisk och säker ordning.", "Разложи инструменты в удобном и безопасном порядке.", "Ułóż przybory w praktycznej i bezpiecznej kolejności.", "도구를 편하고 안전한 순서로 놓자."),
        tt("Repère un point d'usure ou de saleté sur le matériel.", "Spot a worn or dirty spot on the equipment.", "Localiza un punto desgastado o sucio en el material.", "Individua un punto usurato o sporco sull'attrezzatura.", "道具のすり切れや汚れを見つけよう。", "Finde eine abgenutzte oder schmutzige Stelle an der Ausrüstung.", "حدّد موضع تآكل أو اتساخ في المعدات.", "找出马具上磨损或脏污的地方。", "Zoek een versleten of vuile plek op het materiaal.", "Encontre um ponto gasto ou sujo no material.", "Hitta ett slitet eller smutsigt ställe på utrustningen.", "Найди потёртое или грязное место на снаряжении.", "Znajdź zużyte lub brudne miejsce na sprzęcie.", "장비에서 닳거나 더러운 곳을 찾아보자."),
        tt("Demande la validation de ton enseignant avant de partir.", "Ask your instructor to approve before you set off.", "Pide la validación de tu profesor antes de salir.", "Chiedi la convalida del tuo istruttore prima di partire.", "出発する前に先生に確認してもらおう。", "Lass alles von deinem Reitlehrer abnehmen, bevor du losgehst.", "اطلب موافقة مدرّبك قبل الانطلاق.", "出发前请教练确认。", "Vraag je instructeur om goedkeuring voordat je vertrekt.", "Peça a validação do seu instrutor antes de sair.", "Be din instruktör godkänna innan du går iväg.", "Попроси тренера всё проверить, прежде чем выходить.", "Poproś instruktora o akceptację, zanim wyjdziesz.", "출발하기 전에 선생님께 확인을 받자.")
      ]
    },
    hb: [
      tt("Comment savoir si ma préparation est vraiment terminée ?", "How do I know my preparation is really finished?", "¿Cómo sé si mi preparación está realmente terminada?", "Come capire se la mia preparazione è davvero finita?", "準備が本当に終わったか、どうやってわかる？", "Woran erkenne ich, dass meine Vorbereitung wirklich fertig ist?", "كيف أعرف أن تجهيزي انتهى فعلًا؟", "怎么知道我的准备真的完成了？", "Hoe weet ik of mijn voorbereiding echt klaar is?", "Como saber se minha preparação está realmente terminada?", "Hur vet jag att förberedelsen verkligen är klar?", "Как понять, что подготовка действительно закончена?", "Skąd wiem, że przygotowanie jest naprawdę skończone?", "준비가 정말 끝났는지 어떻게 알 수 있을까?"),
      tt("Pourquoi dois-je regarder la peau sous les zones de frottement ?", "Why should I check the skin under rubbing areas?", "¿Por qué debo mirar la piel bajo las zonas de roce?", "Perché devo guardare la pelle sotto le zone di sfregamento?", "こすれる場所の皮ふを確かめるのはなぜ？", "Warum soll ich die Haut unter den Scheuerstellen ansehen?", "لماذا يجب أن أنظر إلى الجلد تحت مناطق الاحتكاك؟", "为什么要查看摩擦部位下面的皮肤？", "Waarom moet ik de huid onder de schuurplekken bekijken?", "Por que devo olhar a pele sob as áreas de atrito?", "Varför ska jag titta på huden under skavställena?", "Почему нужно осматривать кожу под местами трения?", "Dlaczego mam oglądać skórę w miejscach otarć?", "왜 쓸리는 부위 아래의 피부를 봐야 할까?"),
      tt("Que faire si mon cheval se déplace pendant la préparation ?", "What should I do if my horse moves during preparation?", "¿Qué hago si mi caballo se mueve durante la preparación?", "Cosa fare se il mio cavallo si sposta durante la preparazione?", "準備中に馬が動いてしまったらどうする？", "Was tun, wenn sich mein Pferd beim Vorbereiten bewegt?", "ماذا أفعل إذا تحرّك حصاني أثناء التجهيز؟", "备马时马走动了怎么办？", "Wat doe ik als mijn paard beweegt tijdens het voorbereiden?", "O que fazer se meu cavalo se mexer durante a preparação?", "Vad gör jag om hästen flyttar sig under förberedelsen?", "Что делать, если лошадь двигается во время подготовки?", "Co zrobić, gdy koń się rusza podczas przygotowania?", "준비하는 동안 말이 움직이면 어떻게 할까?"),
      tt("Quels signes indiquent qu'un équipement ne lui convient pas ?", "Which signs show that a piece of equipment doesn't suit it?", "¿Qué señales indican que un equipo no le conviene?", "Quali segnali indicano che un'attrezzatura non gli va bene?", "道具が合っていないサインは？", "Welche Zeichen zeigen, dass eine Ausrüstung nicht passt?", "ما العلامات التي تدل على أن المعدات لا تناسبه؟", "哪些迹象说明装备不适合它？", "Welke tekens laten zien dat materiaal niet past?", "Que sinais mostram que um equipamento não serve para ele?", "Vilka tecken visar att utrustningen inte passar?", "Какие признаки показывают, что снаряжение ей не подходит?", "Jakie oznaki pokazują, że sprzęt mu nie pasuje?", "장비가 맞지 않는다는 신호는 무엇일까?"),
      tt("Que dois-je faire si je ne suis pas sûr d'un réglage ?", "What should I do if I'm not sure about a fitting?", "¿Qué debo hacer si no estoy seguro de un ajuste?", "Cosa devo fare se non sono sicuro di una regolazione?", "調整に自信がないときはどうする？", "Was tue ich, wenn ich bei einer Einstellung unsicher bin?", "ماذا أفعل إذا لم أكن متأكدًا من ضبطٍ ما؟", "如果我对某个调整没把握，该怎么办？", "Wat doe ik als ik twijfel over een afstelling?", "O que devo fazer se não tiver certeza de um ajuste?", "Vad gör jag om jag är osäker på en inställning?", "Что делать, если я не уверен в подгонке?", "Co zrobić, jeśli nie jestem pewien ustawienia?", "조정이 확실하지 않으면 어떻게 해야 할까?")
    ],
    synth: [
      tt("La préparation commence dans le calme.", "Preparation starts calmly.", "La preparación empieza con calma.", "La preparazione inizia nella calma.", "準備は落ち着いて始める。", "Die Vorbereitung beginnt in Ruhe.", "التجهيز يبدأ بهدوء.", "备马从平静开始。", "De voorbereiding begint rustig.", "A preparação começa com calma.", "Förberedelsen börjar i lugn och ro.", "Подготовка начинается спокойно.", "Przygotowanie zaczyna się w spokoju.", "준비는 차분하게 시작한다."),
      tt("Chaque geste a sa place.", "Every action has its place.", "Cada gesto tiene su lugar.", "Ogni gesto ha il suo posto.", "どの動作にも順番がある。", "Jeder Handgriff hat seinen Platz.", "لكل حركة مكانها.", "每个动作都有它的位置。", "Elk gebaar heeft zijn plaats.", "Cada gesto tem seu lugar.", "Varje moment har sin plats.", "У каждого действия своё место.", "Każdy ruch ma swoje miejsce.", "모든 동작에는 제자리가 있다."),
      tt("Le matériel doit rester propre et adapté.", "Equipment must stay clean and suitable.", "El material debe estar limpio y adaptado.", "L'attrezzatura deve restare pulita e adatta.", "道具は清潔で合ったものに。", "Die Ausrüstung bleibt sauber und passend.", "يجب أن تبقى المعدات نظيفة ومناسبة.", "马具要保持干净、合适。", "Het materiaal blijft schoon en passend.", "O material deve ficar limpo e adequado.", "Utrustningen ska vara ren och passande.", "Снаряжение должно быть чистым и подходящим.", "Sprzęt musi być czysty i dopasowany.", "장비는 깨끗하고 알맞아야 한다."),
      tt("Le confort du cheval passe avant la rapidité.", "The horse's comfort comes before speed.", "La comodidad del caballo va antes que la rapidez.", "Il comfort del cavallo viene prima della rapidità.", "速さより馬の快適さが大切。", "Der Komfort des Pferdes geht vor Schnelligkeit.", "راحة الحصان قبل السرعة.", "马的舒适比速度更重要。", "Het comfort van het paard gaat voor snelheid.", "O conforto do cavalo vem antes da rapidez.", "Hästens komfort går före snabbhet.", "Удобство лошади важнее скорости.", "Komfort konia jest ważniejszy niż szybkość.", "속도보다 말의 편안함이 먼저다."),
      tt("Un doute se vérifie avec l'enseignant.", "Any doubt is checked with the instructor.", "Una duda se comprueba con el profesor.", "Un dubbio si verifica con l'istruttore.", "迷ったら先生と確かめる。", "Bei Zweifeln prüft man mit dem Reitlehrer.", "أي شك يُتحقَّق منه مع المدرّب.", "有疑问就和教练一起确认。", "Bij twijfel controleer je met de instructeur.", "Uma dúvida se verifica com o instrutor.", "Vid tvekan kontrollerar du med instruktören.", "Сомнение проверяют вместе с тренером.", "Wątpliwość sprawdza się z instruktorem.", "의심되면 선생님과 함께 확인한다.")
    ],
    fin: tt("Bien préparer ton cheval, c'est prendre le temps de vérifier qu'il est prêt, lui aussi.", "Preparing your horse well means taking the time to check that it's ready too.", "Preparar bien a tu caballo es tomarte el tiempo de comprobar que él también está listo.", "Preparare bene il cavallo significa prendersi il tempo di verificare che anche lui sia pronto.", "上手に準備するとは、馬の準備もできているか時間をかけて確かめること。", "Sein Pferd gut vorzubereiten heißt, sich Zeit zu nehmen, um zu prüfen, ob es auch bereit ist.", "تجهيز حصانك جيدًا يعني أن تأخذ وقتك للتحقق من أنه مستعد هو أيضًا.", "好好备马，就是花时间确认它也准备好了。", "Je paard goed voorbereiden is de tijd nemen om te controleren of hij ook klaar is.", "Preparar bem seu cavalo é tirar um tempo para verificar se ele também está pronto.", "Att förbereda hästen väl är att ta tid att kontrollera att även den är redo.", "Хорошо подготовить лошадь — значит не спеша проверить, что она тоже готова.", "Dobrze przygotować konia to poświęcić czas, by sprawdzić, czy on też jest gotowy.", "말을 잘 준비한다는 것은 말도 준비가 되었는지 시간을 들여 확인하는 것이다."),
    chap: [
      [tt("Préparer avec méthode", "Preparing methodically", "Preparar con método", "Preparare con metodo", "手順どおりに準備", "Mit Methode vorbereiten", "التجهيز بمنهجية", "有条理地准备", "Met methode voorbereiden", "Preparar com método", "Förbered med metod", "Готовим по порядку", "Przygotuj z metodą", "순서대로 준비하기"), 2],
      [tt("Équiper sans précipitation", "Tacking up without rushing", "Equipar sin prisas", "Bardare senza fretta", "あわてずに馬装", "Ohne Hast aufzäumen und satteln", "التجهيز دون تسرّع", "不慌不忙地上马具", "Zonder haast opzadelen", "Encilhar sem pressa", "Sadla utan stress", "Седлаем без спешки", "Siodłaj bez pośpiechu", "서두르지 않고 장비 착용하기"), 3]
    ]
  },
  "g2-c4": {
    synth: [
      tt("Le saut prolonge une approche déjà équilibrée.", "The jump continues an already balanced approach.", "El salto prolonga una aproximación ya equilibrada.", "Il salto prolunga un avvicinamento già equilibrato.", "ジャンプはバランスのとれたアプローチの続き。", "Der Sprung setzt einen ausbalancierten Anritt fort.", "القفز امتداد لاقتراب متوازن.", "跳跃是平衡接近的延续。", "De sprong zet een evenwichtige aanloop voort.", "O salto prolonga uma aproximação já equilibrada.", "Hoppet fortsätter en balanserad framridning.", "Прыжок продолжает уравновешенный подход.", "Skok jest przedłużeniem zrównoważonego najazdu.", "점프는 균형 잡힌 접근의 연장이다."),
      tt("Le regard prépare la direction suivante.", "Your eyes prepare the next direction.", "La mirada prepara la siguiente dirección.", "Lo sguardo prepara la direzione successiva.", "目線が次の方向を準備する。", "Der Blick bereitet die nächste Richtung vor.", "النظر يحضّر الاتجاه التالي.", "视线为下一个方向做准备。", "De blik bereidt de volgende richting voor.", "O olhar prepara a direção seguinte.", "Blicken förbereder nästa riktning.", "Взгляд готовит следующее направление.", "Wzrok przygotowuje kolejny kierunek.", "시선이 다음 방향을 준비한다."),
      tt("Les articulations accompagnent le mouvement.", "Your joints follow the movement.", "Las articulaciones acompañan el movimiento.", "Le articolazioni accompagnano il movimento.", "関節がやわらかく動きについていく。", "Die Gelenke begleiten die Bewegung.", "المفاصل ترافق الحركة.", "关节跟随动作。", "De gewrichten volgen de beweging.", "As articulações acompanham o movimento.", "Lederna följer rörelsen.", "Суставы сопровождают движение.", "Stawy podążają za ruchem.", "관절이 움직임을 따라간다."),
      tt("Les mains respectent la bouche du cheval.", "Your hands respect the horse's mouth.", "Las manos respetan la boca del caballo.", "Le mani rispettano la bocca del cavallo.", "手は馬の口を大切にする。", "Die Hände respektieren das Pferdemaul.", "اليدان تحترمان فم الحصان.", "双手尊重马的嘴。", "De handen respecteren de mond van het paard.", "As mãos respeitam a boca do cavalo.", "Händerna respekterar hästens mun.", "Руки бережны ко рту лошади.", "Ręce szanują pysk konia.", "손은 말의 입을 존중한다."),
      tt("La réception annonce déjà la suite.", "The landing already prepares what comes next.", "La recepción ya anuncia lo siguiente.", "L'atterraggio annuncia già il seguito.", "着地はもう次の準備。", "Die Landung kündigt schon das Weitere an.", "الهبوط يمهّد لما بعده.", "落地已在为接下来做准备。", "De landing kondigt het vervolg al aan.", "A recepção já anuncia o que vem depois.", "Landningen förbereder redan fortsättningen.", "Приземление уже готовит продолжение.", "Lądowanie zapowiada już dalszy ciąg.", "착지는 이미 다음을 준비한다.")
    ],
    fin: tt("Ton premier objectif n'est pas la hauteur : c'est de rester un partenaire équilibré avant, pendant et après le saut.", "Your first goal isn't height: it's to stay a balanced partner before, during and after the jump.", "Tu primer objetivo no es la altura: es seguir siendo un compañero equilibrado antes, durante y después del salto.", "Il tuo primo obiettivo non è l'altezza: è restare un partner equilibrato prima, durante e dopo il salto.", "最初の目標は高さではない。ジャンプの前も最中もあとも、バランスのよいパートナーでいること。", "Dein erstes Ziel ist nicht die Höhe, sondern vor, während und nach dem Sprung ein ausbalancierter Partner zu bleiben.", "هدفك الأول ليس الارتفاع، بل أن تبقى شريكًا متوازنًا قبل القفزة وأثناءها وبعدها.", "你的首要目标不是高度，而是在跳跃前、中、后都做一个平衡的伙伴。", "Je eerste doel is niet de hoogte: het is een evenwichtige partner blijven vóór, tijdens en na de sprong.", "Seu primeiro objetivo não é a altura: é continuar um parceiro equilibrado antes, durante e depois do salto.", "Ditt första mål är inte höjden, utan att vara en balanserad partner före, under och efter hoppet.", "Твоя первая цель — не высота, а оставаться уравновешенным партнёром до, во время и после прыжка.", "Twoim pierwszym celem nie jest wysokość, lecz bycie zrównoważonym partnerem przed skokiem, w trakcie i po nim.", "첫 번째 목표는 높이가 아니라, 점프 전후와 도중에 균형 잡힌 파트너로 남는 것이다.")
  },
  "g2-c5": {
    defi: {
      titre: tt("Guide attentif", "Attentive guide", "Guía atento", "Guida attenta", "ていねいな案内役", "Aufmerksamer Führer", "مرشد منتبه", "细心的引导者", "Aandachtige gids", "Guia atento", "Uppmärksam ledare", "Внимательный проводник", "Uważny przewodnik", "세심한 안내자"),
      accroche: tt("Avec ton enseignant, vérifie la qualité de tes indications au sol, sans chercher la rapidité.", "With your instructor, check the quality of your signals from the ground, without aiming for speed.", "Con tu profesor, comprueba la calidad de tus indicaciones pie a tierra, sin buscar la rapidez.", "Con il tuo istruttore, verifica la qualità delle tue indicazioni da terra, senza cercare la rapidità.", "先生といっしょに、速さを求めずに地上での合図の質を確かめよう。", "Prüfe mit deinem Reitlehrer die Qualität deiner Hilfen vom Boden aus, ohne auf Tempo zu achten.", "مع مدرّبك، تحقّق من جودة إشاراتك من الأرض دون البحث عن السرعة.", "和教练一起，在地面检查你指令的质量，不求快。", "Controleer met je instructeur de kwaliteit van je hulpen vanaf de grond, zonder snelheid na te streven.", "Com seu instrutor, verifique a qualidade das suas indicações no chão, sem buscar rapidez.", "Kontrollera med din instruktör kvaliteten på dina signaler från marken, utan att sträva efter fart.", "Вместе с тренером проверь качество своих сигналов с земли, не гонясь за скоростью.", "Z instruktorem sprawdź jakość swoich sygnałów z ziemi, nie goniąc za szybkością.", "선생님과 함께 속도보다 지상에서 주는 신호의 질을 확인해 보자."),
      points: [
        tt("Prépare le trajet avant de demander le déplacement.", "Plan the route before asking the horse to move.", "Prepara el recorrido antes de pedir el desplazamiento.", "Prepara il percorso prima di chiedere lo spostamento.", "動きをたのむ前に、通る道を決めておこう。", "Plane den Weg, bevor du die Bewegung verlangst.", "حضّر المسار قبل طلب التحرّك.", "要求移动之前先规划好路线。", "Bereid de route voor voordat je de verplaatsing vraagt.", "Prepare o trajeto antes de pedir o deslocamento.", "Planera vägen innan du ber hästen flytta sig.", "Продумай маршрут, прежде чем просить движение.", "Zaplanuj trasę, zanim poprosisz o ruch.", "이동을 요청하기 전에 경로를 준비하자."),
        tt("Obtiens une réponse simple sans hausser le ton.", "Get a simple response without raising your voice.", "Obtén una respuesta sencilla sin alzar la voz.", "Ottieni una risposta semplice senza alzare la voce.", "声を荒げずに、かんたんな反応を引き出そう。", "Erreiche eine einfache Reaktion, ohne lauter zu werden.", "احصل على استجابة بسيطة دون رفع صوتك.", "不提高嗓门，得到一个简单的回应。", "Krijg een eenvoudige reactie zonder je stem te verheffen.", "Obtenha uma resposta simples sem levantar a voz.", "Få ett enkelt svar utan att höja rösten.", "Добейся простого ответа, не повышая голоса.", "Uzyskaj prostą odpowiedź, nie podnosząc głosu.", "목소리를 높이지 않고 간단한 반응을 얻어 보자."),
        tt("Arrête l'exercice dès que le cheval répond calmement.", "Stop the exercise as soon as the horse responds calmly.", "Termina el ejercicio en cuanto el caballo responda con calma.", "Interrompi l'esercizio appena il cavallo risponde con calma.", "馬が落ち着いてこたえたら、すぐに練習を終えよう。", "Beende die Übung, sobald das Pferd ruhig reagiert.", "أوقف التمرين فور استجابة الحصان بهدوء.", "马一平静地回应，就结束练习。", "Stop de oefening zodra het paard rustig reageert.", "Encerre o exercício assim que o cavalo responder com calma.", "Avsluta övningen så fort hästen svarar lugnt.", "Закончи упражнение, как только лошадь спокойно ответит.", "Zakończ ćwiczenie, gdy tylko koń spokojnie odpowie.", "말이 차분하게 반응하면 바로 연습을 끝내자.")
      ]
    },
    hb: [
      tt("Comment reconnaître que mon cheval comprend où je veux aller ?", "How can I tell my horse understands where I want to go?", "¿Cómo reconocer que mi caballo entiende adónde quiero ir?", "Come capire che il mio cavallo ha compreso dove voglio andare?", "行きたい方向を馬がわかっているか、どうやって見分ける？", "Woran erkenne ich, dass mein Pferd versteht, wohin ich will?", "كيف أعرف أن حصاني يفهم إلى أين أريد الذهاب؟", "怎么看出我的马明白我想去哪里？", "Hoe zie ik dat mijn paard begrijpt waar ik heen wil?", "Como reconhecer que meu cavalo entende aonde quero ir?", "Hur märker jag att hästen förstår vart jag vill?", "Как понять, что лошадь понимает, куда я хочу идти?", "Jak poznać, że koń rozumie, dokąd chcę iść?", "말이 내가 가려는 곳을 이해하는지 어떻게 알 수 있을까?"),
      tt("Pourquoi est-ce plus difficile de déplacer une seule partie de son corps ?", "Why is it harder to move just one part of its body?", "¿Por qué es más difícil desplazar una sola parte de su cuerpo?", "Perché è più difficile spostare una sola parte del suo corpo?", "からだの一部分だけを動かすのがむずかしいのはなぜ？", "Warum ist es schwieriger, nur einen Teil seines Körpers zu bewegen?", "لماذا يصعب تحريك جزء واحد فقط من جسمه؟", "为什么只移动它身体的一部分更难？", "Waarom is het moeilijker om maar één deel van zijn lichaam te verplaatsen?", "Por que é mais difícil deslocar só uma parte do corpo dele?", "Varför är det svårare att flytta bara en del av kroppen?", "Почему труднее сдвинуть только одну часть её тела?", "Dlaczego trudniej przesunąć tylko jedną część jego ciała?", "몸의 한 부분만 움직이게 하는 것이 왜 더 어려울까?"),
      tt("Que faire s'il avance au lieu de déplacer ses épaules ?", "What if it walks forward instead of moving its shoulders?", "¿Qué hacer si avanza en lugar de desplazar las espaldas?", "Cosa fare se avanza invece di spostare le spalle?", "肩を動かすかわりに前に進んでしまったら？", "Was tun, wenn es vorwärtsgeht, statt die Schultern zu versetzen?", "ماذا أفعل إذا تقدّم بدل أن يحرّك كتفيه؟", "如果它往前走而不是移动肩部，怎么办？", "Wat doe ik als hij vooruit loopt in plaats van zijn schouders te verplaatsen?", "O que fazer se ele avançar em vez de deslocar as espáduas?", "Vad gör jag om den går framåt i stället för att flytta bogarna?", "Что делать, если она идёт вперёд вместо того, чтобы сдвинуть плечи?", "Co zrobić, gdy idzie do przodu zamiast przesunąć łopatki?", "어깨를 옮기는 대신 앞으로 걸어가면 어떻게 할까?"),
      tt("Où dois-je me placer pour rester en sécurité ?", "Where should I stand to stay safe?", "¿Dónde debo colocarme para estar seguro?", "Dove devo mettermi per restare al sicuro?", "安全でいるには、どこに立てばいい？", "Wo muss ich stehen, um sicher zu bleiben?", "أين يجب أن أقف لأبقى في أمان؟", "我应该站在哪里才安全？", "Waar moet ik staan om veilig te blijven?", "Onde devo me posicionar para ficar em segurança?", "Var ska jag stå för att vara säker?", "Где мне стоять, чтобы быть в безопасности?", "Gdzie mam stanąć, żeby być bezpiecznym?", "안전하려면 어디에 서야 할까?"),
      tt("Comment savoir quand terminer un exercice à pied ?", "How do I know when to end a groundwork exercise?", "¿Cómo saber cuándo terminar un ejercicio pie a tierra?", "Come capire quando terminare un esercizio da terra?", "地上の練習をいつ終えればいいか、どうやってわかる？", "Woran erkenne ich, wann ich eine Bodenarbeitsübung beenden soll?", "كيف أعرف متى أنهي تمرينًا على الأرض؟", "怎么知道何时结束地面练习？", "Hoe weet ik wanneer ik een grondwerkoefening moet stoppen?", "Como saber quando terminar um exercício no chão?", "Hur vet jag när jag ska avsluta en markarbetsövning?", "Как понять, когда закончить упражнение с земли?", "Skąd wiem, kiedy zakończyć ćwiczenie z ziemi?", "지상 연습을 언제 끝내야 할지 어떻게 알까?")
    ],
    chap: [
      [tt("Se déplacer ensemble", "Moving together", "Desplazarse juntos", "Spostarsi insieme", "いっしょに動く", "Gemeinsam unterwegs", "التنقّل معًا", "一起移动", "Samen bewegen", "Deslocar-se juntos", "Röra sig tillsammans", "Двигаться вместе", "Poruszać się razem", "함께 움직이기"), 3],
      [tt("Mobiliser le cheval", "Moving the horse", "Movilizar al caballo", "Mobilitare il cavallo", "馬を動かす", "Das Pferd bewegen", "تحريك الحصان", "调动马", "Het paard bewegen", "Mobilizar o cavalo", "Flytta hästen", "Подвигать лошадь", "Przestawianie konia", "말 움직이기"), 2],
      [tt("Affiner ses demandes", "Refining your requests", "Afinar tus peticiones", "Affinare le richieste", "合図をみがく", "Hilfen verfeinern", "تحسين طلباتك", "让要求更精准", "Je vragen verfijnen", "Afinar seus pedidos", "Förfina signalerna", "Уточнять просьбы", "Doskonalić prośby", "요청 다듬기"), 3]
    ]
  },
  "g2-c6": {
    coach: tt("Pour apprendre à reconnaître un cheval, compare plusieurs indices plutôt qu'un seul détail. Une photographie peut aider, mais observer un vrai cheval calme avec ton enseignant est encore plus instructif.", "To learn to recognise a horse, compare several clues rather than a single detail. A photo can help, but watching a real, calm horse with your instructor teaches you even more.", "Para aprender a reconocer un caballo, compara varios indicios en lugar de un solo detalle. Una fotografía puede ayudar, pero observar un caballo real y tranquilo con tu profesor enseña todavía más.", "Per imparare a riconoscere un cavallo, confronta più indizi invece di un solo dettaglio. Una fotografia può aiutare, ma osservare un vero cavallo calmo con il tuo istruttore è ancora più istruttivo.", "馬を見分けるには、ひとつの細かい点ではなく、いくつかの手がかりを比べよう。写真も役に立つけれど、先生といっしょに落ち着いた本物の馬を観察するほうがもっと学べる。", "Um ein Pferd zu erkennen, vergleiche mehrere Hinweise statt nur eines Details. Ein Foto kann helfen, aber ein echtes, ruhiges Pferd mit deinem Reitlehrer zu beobachten, ist noch lehrreicher.", "لتتعلّم التعرّف على حصان، قارن عدة دلائل بدل تفصيل واحد. قد تساعدك صورة، لكن مراقبة حصان حقيقي هادئ مع مدرّبك أكثر فائدة.", "要学会辨认一匹马，比较多个线索，而不是只看一个细节。照片有帮助，但和教练一起观察一匹安静的真马收获更多。", "Om een paard te leren herkennen, vergelijk je meerdere aanwijzingen in plaats van één detail. Een foto kan helpen, maar een echt, rustig paard bekijken met je instructeur leert je nog meer.", "Para aprender a reconhecer um cavalo, compare vários indícios em vez de um único detalhe. Uma foto pode ajudar, mas observar um cavalo real e calmo com seu instrutor ensina ainda mais.", "För att lära dig känna igen en häst, jämför flera ledtrådar i stället för en enda detalj. Ett foto kan hjälpa, men att titta på en riktig, lugn häst med din instruktör lär dig ännu mer.", "Чтобы научиться узнавать лошадь, сравнивай несколько признаков, а не одну деталь. Фото может помочь, но наблюдать за настоящей спокойной лошадью с тренером ещё полезнее.", "Aby nauczyć się rozpoznawać konia, porównuj kilka wskazówek zamiast jednego szczegółu. Zdjęcie może pomóc, ale obserwowanie prawdziwego, spokojnego konia z instruktorem uczy jeszcze więcej.", "말을 알아보려면 한 가지 세부보다 여러 단서를 비교하자. 사진도 도움이 되지만, 선생님과 함께 차분한 실제 말을 관찰하면 더 많이 배운다."),
    defi: {
      titre: tt("Carnet d'observation", "Observation notebook", "Cuaderno de observación", "Taccuino di osservazione", "観察ノート", "Beobachtungsheft", "دفتر الملاحظة", "观察笔记", "Observatieschrift", "Caderno de observação", "Observationsanteckningar", "Блокнот наблюдений", "Notes obserwacji", "관찰 노트"),
      accroche: tt("Pendant une séance calme au club, entraîne-toi à décrire ce que tu vois sans toucher les chevaux.", "During a calm moment at the club, practise describing what you see without touching the horses.", "Durante una sesión tranquila en el club, practica describir lo que ves sin tocar a los caballos.", "Durante un momento tranquillo al club, esercitati a descrivere ciò che vedi senza toccare i cavalli.", "クラブの落ち着いた時間に、馬にさわらずに見たものを説明する練習をしよう。", "Übe in einem ruhigen Moment im Verein, zu beschreiben, was du siehst, ohne die Pferde anzufassen.", "خلال حصة هادئة في النادي، تدرّب على وصف ما تراه دون لمس الخيول.", "在俱乐部安静的时候，练习描述你看到的东西，不要触碰马。", "Oefen tijdens een rustig moment op de club om te beschrijven wat je ziet, zonder de paarden aan te raken.", "Durante uma sessão tranquila no clube, treine descrever o que vê sem tocar nos cavalos.", "Öva under ett lugnt tillfälle på klubben på att beskriva det du ser utan att röra hästarna.", "Во время спокойного занятия в клубе потренируйся описывать то, что видишь, не трогая лошадей.", "Podczas spokojnych zajęć w klubie ćwicz opisywanie tego, co widzisz, bez dotykania koni.", "클럽에서 조용한 시간에 말을 만지지 않고 본 것을 설명하는 연습을 하자."),
      points: [
        tt("Note deux détails visibles qui différencient deux chevaux.", "Note two visible details that tell two horses apart.", "Anota dos detalles visibles que diferencian a dos caballos.", "Annota due dettagli visibili che distinguono due cavalli.", "2頭の馬を見分ける、目に見えるちがいを2つ書こう。", "Notiere zwei sichtbare Details, die zwei Pferde unterscheiden.", "دوّن تفصيلين ظاهرين يميّزان بين حصانين.", "记下两处能区分两匹马的明显细节。", "Noteer twee zichtbare details die twee paarden van elkaar onderscheiden.", "Anote dois detalhes visíveis que diferenciam dois cavalos.", "Skriv ner två synliga detaljer som skiljer två hästar åt.", "Запиши две видимые детали, которые отличают двух лошадей.", "Zapisz dwa widoczne szczegóły, które odróżniają dwa konie.", "두 말을 구별하는 눈에 보이는 특징 두 가지를 적자."),
        tt("Retrouve un aliment parmi ceux présentés en cours.", "Find one of the feeds presented in the course.", "Encuentra uno de los alimentos presentados en el curso.", "Ritrova uno degli alimenti presentati nel corso.", "授業で出てきた飼料をひとつ見つけよう。", "Finde eines der im Kurs vorgestellten Futtermittel.", "اعثر على أحد الأعلاف التي عُرضت في الدرس.", "找到课程中介绍过的一种饲料。", "Zoek een van de voedingsmiddelen uit de les.", "Encontre um dos alimentos apresentados no curso.", "Hitta ett av fodren som presenterades i kursen.", "Найди один из кормов, о которых говорилось в уроке.", "Odszukaj jedną z pasz przedstawionych w lekcji.", "수업에서 소개된 사료 하나를 찾아보자."),
        tt("Nomme une partie du membre sur une photographie.", "Name a part of the leg on a photo.", "Nombra una parte de la extremidad en una fotografía.", "Indica una parte dell'arto su una fotografia.", "写真で脚の部位をひとつ言ってみよう。", "Benenne einen Teil des Beins auf einem Foto.", "سمِّ جزءًا من القائمة على صورة.", "在照片上说出腿的一个部位。", "Benoem een deel van het been op een foto.", "Nomeie uma parte do membro numa fotografia.", "Namnge en del av benet på ett foto.", "Назови часть ноги на фотографии.", "Nazwij część kończyny na zdjęciu.", "사진에서 다리의 한 부위를 말해 보자.")
      ]
    },
    hb: [
      tt("Pourquoi deux chevaux peuvent-ils avoir des couleurs proches sans avoir la même robe ?", "Why can two horses look a similar colour without having the same coat?", "¿Por qué dos caballos pueden tener colores parecidos sin tener la misma capa?", "Perché due cavalli possono avere colori simili senza avere lo stesso mantello?", "色が似ていても、2頭の毛色がちがうことがあるのはなぜ？", "Warum können zwei Pferde ähnlich aussehen und doch nicht dieselbe Fellfarbe haben?", "لماذا قد يتشابه لون حصانين دون أن يكون لهما اللون نفسه؟", "为什么两匹马颜色相近，毛色却不同？", "Waarom kunnen twee paarden een vergelijkbare kleur hebben zonder dezelfde vachtkleur?", "Por que dois cavalos podem ter cores parecidas sem ter a mesma pelagem?", "Varför kan två hästar ha liknande färg utan att ha samma färg?", "Почему у двух лошадей может быть похожий цвет, но разная масть?", "Dlaczego dwa konie mogą mieć podobny kolor, a inną maść?", "두 말의 색이 비슷해도 털색이 다를 수 있는 이유는?"),
      tt("Comment le cheval repère-t-il un bruit lointain ?", "How does a horse locate a distant sound?", "¿Cómo localiza el caballo un ruido lejano?", "Come individua il cavallo un rumore lontano?", "馬は遠くの音をどうやって見つけるの？", "Wie ortet das Pferd ein fernes Geräusch?", "كيف يحدّد الحصان صوتًا بعيدًا؟", "马如何察觉远处的声音？", "Hoe lokaliseert een paard een geluid in de verte?", "Como o cavalo localiza um barulho distante?", "Hur lokaliserar hästen ett avlägset ljud?", "Как лошадь определяет далёкий звук?", "Jak koń lokalizuje odległy dźwięk?", "말은 먼 곳의 소리를 어떻게 알아챌까?"),
      tt("Quelle différence y a-t-il entre du foin et de la paille ?", "What's the difference between hay and straw?", "¿Qué diferencia hay entre heno y paja?", "Che differenza c'è tra fieno e paglia?", "干し草とわらはどうちがうの？", "Was ist der Unterschied zwischen Heu und Stroh?", "ما الفرق بين التبن والقش؟", "干草和稻草有什么区别？", "Wat is het verschil tussen hooi en stro?", "Qual a diferença entre feno e palha?", "Vad är skillnaden mellan hö och halm?", "Чем сено отличается от соломы?", "Czym różni się siano od słomy?", "건초와 짚은 어떻게 다를까?"),
      tt("Quelle partie de la jambe se situe juste au-dessus du sabot ?", "Which part of the leg is just above the hoof?", "¿Qué parte de la extremidad está justo encima del casco?", "Quale parte dell'arto si trova appena sopra lo zoccolo?", "ひづめのすぐ上にある脚の部位は？", "Welcher Teil des Beins liegt direkt über dem Huf?", "أي جزء من القائمة يقع فوق الحافر مباشرة؟", "腿的哪个部位就在马蹄上方？", "Welk deel van het been zit vlak boven de hoef?", "Que parte do membro fica logo acima do casco?", "Vilken del av benet sitter precis ovanför hoven?", "Какая часть ноги находится сразу над копытом?", "Która część kończyny jest tuż nad kopytem?", "발굽 바로 위에 있는 다리 부위는 어디일까?"),
      tt("Pourquoi certaines marques blanches ne changent-elles pas le nom de la robe ?", "Why don't some white markings change the name of the coat colour?", "¿Por qué algunas marcas blancas no cambian el nombre de la capa?", "Perché alcuni segni bianchi non cambiano il nome del mantello?", "白い模様があっても毛色の名前が変わらないのはなぜ？", "Warum ändern manche weiße Abzeichen den Namen der Fellfarbe nicht?", "لماذا لا تغيّر بعض العلامات البيضاء اسم اللون؟", "为什么有些白色标记不会改变毛色的名称？", "Waarom veranderen sommige witte aftekeningen de naam van de vachtkleur niet?", "Por que algumas marcas brancas não mudam o nome da pelagem?", "Varför ändrar vissa vita tecken inte färgens namn?", "Почему некоторые белые отметины не меняют название масти?", "Dlaczego niektóre białe odmiany nie zmieniają nazwy maści?", "어떤 흰 무늬는 왜 털색 이름을 바꾸지 않을까?")
    ],
    synth: [
      tt("Les sens guident les réactions du cheval.", "The senses guide the horse's reactions.", "Los sentidos guían las reacciones del caballo.", "I sensi guidano le reazioni del cavallo.", "感覚が馬の反応を導く。", "Die Sinne steuern die Reaktionen des Pferdes.", "الحواس توجّه ردود فعل الحصان.", "感官引导马的反应。", "De zintuigen sturen de reacties van het paard.", "Os sentidos guiam as reações do cavalo.", "Sinnena styr hästens reaktioner.", "Чувства управляют реакциями лошади.", "Zmysły kierują reakcjami konia.", "감각이 말의 반응을 이끈다."),
      tt("Les aliments n'ont pas tous le même rôle.", "Not all feeds play the same role.", "No todos los alimentos tienen el mismo papel.", "Non tutti gli alimenti hanno lo stesso ruolo.", "飼料の役割はそれぞれちがう。", "Nicht alle Futtermittel haben dieselbe Rolle.", "ليست لكل الأعلاف الوظيفة نفسها.", "饲料的作用各不相同。", "Niet elk voedsel heeft dezelfde rol.", "Nem todos os alimentos têm o mesmo papel.", "Alla foder har inte samma roll.", "Не все корма играют одинаковую роль.", "Nie wszystkie pasze pełnią tę samą rolę.", "사료마다 역할이 다르다."),
      tt("Les membres portent des noms précis.", "The legs have precise names.", "Las extremidades tienen nombres precisos.", "Gli arti hanno nomi precisi.", "脚の部位には正確な名前がある。", "Die Beine haben genaue Bezeichnungen.", "للقوائم أسماء دقيقة.", "四肢各部位有准确的名称。", "De benen hebben precieze namen.", "Os membros têm nomes precisos.", "Benen har exakta namn.", "У частей ног точные названия.", "Kończyny mają dokładne nazwy.", "다리 부위에는 정확한 이름이 있다."),
      tt("Une robe décrit la couleur du cheval.", "A coat colour describes the horse's colour.", "La capa describe el color del caballo.", "Il mantello descrive il colore del cavallo.", "毛色は馬の色をあらわす。", "Die Fellfarbe beschreibt die Farbe des Pferdes.", "اللون يصف لون الحصان.", "毛色描述马的颜色。", "De vachtkleur beschrijft de kleur van het paard.", "A pelagem descreve a cor do cavalo.", "Färgen beskriver hästens färg.", "Масть описывает цвет лошади.", "Maść opisuje kolor konia.", "털색은 말의 색을 나타낸다."),
      tt("Les marques complètent sa description.", "Markings complete its description.", "Las marcas completan su descripción.", "I segni completano la sua descrizione.", "模様が説明をおぎなう。", "Abzeichen ergänzen seine Beschreibung.", "العلامات تكمّل وصفه.", "标记补充对它的描述。", "Aftekeningen vullen de beschrijving aan.", "As marcas completam sua descrição.", "Tecknen kompletterar beskrivningen.", "Отметины дополняют описание.", "Odmiany uzupełniają opis.", "무늬가 설명을 보완한다.")
    ],
    fin: tt("Observer avec précision, c'est découvrir combien chaque cheval est différent.", "Observing carefully shows you how different every horse is.", "Observar con precisión es descubrir lo diferente que es cada caballo.", "Osservare con precisione significa scoprire quanto ogni cavallo sia diverso.", "ていねいに観察すると、どの馬もちがうことがわかる。", "Genau hinzusehen heißt zu entdecken, wie verschieden jedes Pferd ist.", "أن تلاحظ بدقة يعني أن تكتشف كم يختلف كل حصان.", "细心观察，你会发现每匹马都不一样。", "Nauwkeurig kijken laat zien hoe verschillend elk paard is.", "Observar com precisão é descobrir como cada cavalo é diferente.", "Att iaktta noga är att upptäcka hur olika varje häst är.", "Внимательно наблюдая, понимаешь, насколько каждая лошадь особенная.", "Uważna obserwacja pokazuje, jak bardzo każdy koń jest inny.", "자세히 관찰하면 모든 말이 얼마나 다른지 알게 된다."),
    chap: [
      [tt("Découvrir ses particularités", "Discovering its traits", "Descubrir sus particularidades", "Scoprire le sue particolarità", "馬の特徴を知る", "Seine Besonderheiten entdecken", "اكتشاف خصائصه", "了解它的特点", "Zijn eigenschappen ontdekken", "Descobrir suas particularidades", "Upptäck dess särdrag", "Узнать её особенности", "Poznaj jego cechy", "말의 특징 알아보기"), 2],
      [tt("Se nourrir et se repérer", "Feeding and finding your way", "Alimentarse y orientarse", "Nutrirsi e orientarsi", "食べものと体のしくみ", "Fressen und sich zurechtfinden", "التغذية والتعرّف", "饮食与认识身体", "Voeding en je weg vinden", "Alimentar-se e localizar-se", "Foder och benets delar", "Питание и ориентиры", "Pokarm i orientacja", "먹이와 몸 알아보기"), 2],
      [tt("Reconnaître les robes", "Recognising coat colours", "Reconocer las capas", "Riconoscere i mantelli", "毛色を見分ける", "Fellfarben erkennen", "التعرّف على الألوان", "认识毛色", "Vachtkleuren herkennen", "Reconhecer as pelagens", "Känna igen färgerna", "Различать масти", "Rozpoznawać maści", "털색 알아보기"), 2]
    ]
  },
  "g2-anatomie": {
    defi: {
      titre: tt("Silhouette à compléter", "Fill in the outline", "Silueta por completar", "Sagoma da completare", "シルエットをうめよう", "Silhouette ergänzen", "أكمل الصورة الظلية", "补全轮廓", "Silhouet aanvullen", "Silhueta para completar", "Fyll i silhuetten", "Дополни силуэт", "Uzupełnij sylwetkę", "실루엣 채우기"),
      accroche: tt("Avec ton enseignant, entraîne-toi à observer les formes du cheval sans le déranger.", "With your instructor, practise observing the horse's shape without disturbing it.", "Con tu profesor, practica observar las formas del caballo sin molestarlo.", "Con il tuo istruttore, esercitati a osservare le forme del cavallo senza disturbarlo.", "先生といっしょに、馬のじゃまをせずに体の形を観察する練習をしよう。", "Übe mit deinem Reitlehrer, die Formen des Pferdes zu beobachten, ohne es zu stören.", "مع مدرّبك، تدرّب على ملاحظة شكل الحصان دون إزعاجه.", "和教练一起，练习在不打扰马的情况下观察它的体形。", "Oefen met je instructeur om de vormen van het paard te bekijken zonder het te storen.", "Com seu instrutor, treine observar as formas do cavalo sem incomodá-lo.", "Öva med din instruktör på att iaktta hästens former utan att störa den.", "Вместе с тренером потренируйся наблюдать за формами лошади, не беспокоя её.", "Z instruktorem ćwicz obserwowanie kształtów konia bez przeszkadzania mu.", "선생님과 함께 말을 방해하지 않고 몸의 형태를 관찰하는 연습을 하자."),
      points: [
        tt("Place trois noms sur une silhouette vierge.", "Write three names on a blank outline.", "Coloca tres nombres en una silueta en blanco.", "Inserisci tre nomi su una sagoma vuota.", "白いシルエットに名前を3つ書きこもう。", "Trage drei Namen in eine leere Silhouette ein.", "ضع ثلاثة أسماء على صورة ظلية فارغة.", "在空白轮廓上标出三个名称。", "Zet drie namen op een leeg silhouet.", "Coloque três nomes numa silhueta em branco.", "Skriv tre namn på en tom silhuett.", "Подпиши три названия на пустом силуэте.", "Umieść trzy nazwy na pustej sylwetce.", "빈 실루엣에 이름 세 개를 적자."),
        tt("Retrouve une articulation sur une photo de profil.", "Find a joint on a side-view photo.", "Encuentra una articulación en una foto de perfil.", "Ritrova un'articolazione su una foto di profilo.", "横向きの写真で関節をひとつ見つけよう。", "Finde ein Gelenk auf einem Profilfoto.", "اعثر على مفصل في صورة جانبية.", "在侧面照片上找出一个关节。", "Zoek een gewricht op een profielfoto.", "Encontre uma articulação numa foto de perfil.", "Hitta en led på ett profilfoto.", "Найди сустав на фото в профиль.", "Znajdź staw na zdjęciu z profilu.", "옆모습 사진에서 관절 하나를 찾아보자."),
        tt("Explique à quoi sert un des repères que tu as nommés.", "Explain what one of the parts you named is for.", "Explica para qué sirve una de las partes que has nombrado.", "Spiega a cosa serve una delle parti che hai nominato.", "名前を書いた部位のひとつが何の役に立つか説明しよう。", "Erkläre, wozu einer der benannten Teile dient.", "اشرح فائدة أحد الأجزاء التي سمّيتها.", "说明你标出的某个部位有什么作用。", "Leg uit waarvoor een van de genoemde delen dient.", "Explique para que serve uma das partes que você nomeou.", "Förklara vad en av delarna du namngav är till för.", "Объясни, для чего нужна одна из названных частей.", "Wyjaśnij, do czego służy jedna z nazwanych części.", "이름을 적은 부위 하나가 어떤 역할을 하는지 설명하자.")
      ]
    },
    hb: [
      tt("Quelle différence existe-t-il entre le canon et le pâturon ?", "What's the difference between the cannon and the pastern?", "¿Qué diferencia hay entre la caña y la cuartilla?", "Che differenza c'è tra stinco e pastorale?", "管と繋はどうちがうの？", "Was ist der Unterschied zwischen Röhrbein und Fessel?", "ما الفرق بين عظم القصبة والرسغ؟", "管骨和系部有什么区别？", "Wat is het verschil tussen de pijp en de koot?", "Qual a diferença entre a canela e a quartela?", "Vad är skillnaden mellan skenben och kota?", "Чем пясть отличается от путового сустава и бабки?", "Czym różni się nadpęcie od pęciny?", "관골과 발목뼈(계부)는 어떻게 다를까?"),
      tt("Comment reconnaître le jarret sur un cheval de profil ?", "How can you spot the hock on a horse seen from the side?", "¿Cómo reconocer el corvejón en un caballo de perfil?", "Come riconoscere il garretto su un cavallo di profilo?", "横から見た馬で飛節をどうやって見分ける？", "Woran erkennt man das Sprunggelenk bei einem Pferd im Profil?", "كيف أتعرّف على العرقوب في حصان من الجانب؟", "从侧面怎么认出马的飞节？", "Hoe herken je de sprong bij een paard van opzij?", "Como reconhecer o jarrete num cavalo de perfil?", "Hur känner man igen hasen på en häst i profil?", "Как узнать скакательный сустав у лошади в профиль?", "Jak rozpoznać staw skokowy u konia z profilu?", "옆에서 본 말에서 비절을 어떻게 알아볼까?"),
      tt("Pourquoi les parties du corps portent-elles des noms précis ?", "Why do the body parts have precise names?", "¿Por qué las partes del cuerpo tienen nombres precisos?", "Perché le parti del corpo hanno nomi precisi?", "体の部位に正確な名前があるのはなぜ？", "Warum haben die Körperteile genaue Bezeichnungen?", "لماذا لأجزاء الجسم أسماء دقيقة؟", "为什么身体部位都有准确的名称？", "Waarom hebben de lichaamsdelen precieze namen?", "Por que as partes do corpo têm nomes precisos?", "Varför har kroppsdelarna exakta namn?", "Почему у частей тела точные названия?", "Dlaczego części ciała mają dokładne nazwy?", "왜 몸의 부위마다 정확한 이름이 있을까?"),
      tt("Quelles parties observe-t-on pour décrire la tête d'un cheval ?", "Which parts do we look at to describe a horse's head?", "¿Qué partes se observan para describir la cabeza de un caballo?", "Quali parti si osservano per descrivere la testa di un cavallo?", "馬の頭を説明するには、どの部位を見る？", "Welche Teile betrachtet man, um den Kopf eines Pferdes zu beschreiben?", "ما الأجزاء التي نلاحظها لوصف رأس الحصان؟", "描述马的头部要看哪些部位？", "Naar welke delen kijk je om het hoofd van een paard te beschrijven?", "Que partes observamos para descrever a cabeça de um cavalo?", "Vilka delar tittar man på för att beskriva hästens huvud?", "На какие части смотрят, чтобы описать голову лошади?", "Na które części patrzymy, by opisać głowę konia?", "말의 머리를 설명하려면 어떤 부위를 볼까?"),
      tt("Comment utiliser une silhouette pour mémoriser l'anatomie ?", "How can an outline help me memorise anatomy?", "¿Cómo usar una silueta para memorizar la anatomía?", "Come usare una sagoma per memorizzare l'anatomia?", "シルエットを使って体のしくみを覚えるには？", "Wie hilft mir eine Silhouette, die Anatomie zu lernen?", "كيف أستعمل صورة ظلية لحفظ التشريح؟", "怎样用轮廓图记住马的身体结构？", "Hoe gebruik ik een silhouet om de anatomie te onthouden?", "Como usar uma silhueta para memorizar a anatomia?", "Hur använder jag en silhuett för att lära mig anatomin?", "Как использовать силуэт, чтобы запомнить анатомию?", "Jak użyć sylwetki do zapamiętania anatomii?", "실루엣으로 해부 구조를 외우려면 어떻게 할까?")
    ],
    chap: [
      [tt("Les repères du corps", "Body landmarks", "Las referencias del cuerpo", "I punti di riferimento del corpo", "体の目じるし", "Die Körpermerkmale", "معالم الجسم", "身体的标志", "De herkenningspunten van het lichaam", "Os pontos de referência do corpo", "Kroppens kännetecken", "Ориентиры тела", "Punkty orientacyjne ciała", "몸의 기준점"), 4],
      [tt("Comprendre leur rôle", "Understanding their role", "Entender su función", "Capire il loro ruolo", "役割を知る", "Ihre Aufgabe verstehen", "فهم دورها", "了解它们的作用", "Hun rol begrijpen", "Entender sua função", "Förstå deras roll", "Понять их роль", "Zrozumieć ich rolę", "역할 이해하기"), 3],
      [tt("Observer sans se tromper", "Observing without mistakes", "Observar sin equivocarse", "Osservare senza sbagliare", "まちがえずに観察", "Ohne Fehler beobachten", "الملاحظة دون خطأ", "准确地观察", "Zonder vergissingen kijken", "Observar sem errar", "Iaktta utan att ta fel", "Наблюдать без ошибок", "Obserwować bez błędów", "틀리지 않고 관찰하기"), 2]
    ]
  },
  "g2-sens": {
    defi: {
      titre: tt("Observateur discret", "Discreet observer", "Observador discreto", "Osservatore discreto", "そっと見守る観察者", "Unauffälliger Beobachter", "مراقب متكتّم", "安静的观察者", "Stille waarnemer", "Observador discreto", "Diskret observatör", "Незаметный наблюдатель", "Dyskretny obserwator", "조용한 관찰자"),
      accroche: tt("Depuis un emplacement sûr, observe un cheval calme avec ton enseignant et note ses réactions naturelles.", "From a safe spot, watch a calm horse with your instructor and note its natural reactions.", "Desde un lugar seguro, observa un caballo tranquilo con tu profesor y anota sus reacciones naturales.", "Da un punto sicuro, osserva un cavallo calmo con il tuo istruttore e annota le sue reazioni naturali.", "安全な場所から、先生といっしょに落ち着いた馬を観察し、自然な反応を書きとめよう。", "Beobachte von einem sicheren Platz aus mit deinem Reitlehrer ein ruhiges Pferd und notiere seine natürlichen Reaktionen.", "من مكان آمن، راقب حصانًا هادئًا مع مدرّبك ودوّن ردود فعله الطبيعية.", "在安全的位置，和教练一起观察一匹安静的马，记下它的自然反应。", "Kijk vanaf een veilige plek met je instructeur naar een rustig paard en noteer zijn natuurlijke reacties.", "De um lugar seguro, observe um cavalo calmo com seu instrutor e anote suas reações naturais.", "Titta från en säker plats på en lugn häst med din instruktör och skriv ner dess naturliga reaktioner.", "С безопасного места вместе с тренером понаблюдай за спокойной лошадью и запиши её естественные реакции.", "Z bezpiecznego miejsca obserwuj z instruktorem spokojnego konia i zapisz jego naturalne reakcje.", "안전한 곳에서 선생님과 함께 차분한 말을 관찰하고 자연스러운 반응을 적어 보자."),
      points: [
        tt("Repère un changement d'orientation de ses oreilles.", "Spot a change in the direction of its ears.", "Detecta un cambio de orientación de sus orejas.", "Individua un cambio di orientamento delle sue orecchie.", "耳の向きが変わるところを見つけよう。", "Bemerke, wenn sich die Ohren in eine andere Richtung drehen.", "لاحظ تغيّر اتجاه أذنيه.", "注意它耳朵方向的变化。", "Zie wanneer zijn oren van richting veranderen.", "Perceba uma mudança de direção das orelhas.", "Lägg märke till när öronen ändrar riktning.", "Заметь, как меняется направление ушей.", "Zauważ zmianę ustawienia jego uszu.", "귀 방향이 바뀌는 순간을 찾아보자."),
        tt("Observe ce qui attire son attention sans l'interrompre.", "Watch what catches its attention without interrupting it.", "Observa lo que atrae su atención sin interrumpirlo.", "Osserva cosa attira la sua attenzione senza interromperlo.", "馬のじゃまをせずに、何に注意を向けているか観察しよう。", "Beobachte, was seine Aufmerksamkeit weckt, ohne es zu stören.", "لاحظ ما يجذب انتباهه دون مقاطعته.", "观察是什么吸引了它的注意，不要打断它。", "Kijk wat zijn aandacht trekt zonder hem te onderbreken.", "Observe o que chama a atenção dele sem interrompê-lo.", "Se vad som fångar dess uppmärksamhet utan att avbryta.", "Посмотри, что привлекает её внимание, не мешая ей.", "Obserwuj, co przyciąga jego uwagę, nie przerywając mu.", "말을 방해하지 말고 무엇이 관심을 끄는지 관찰하자."),
        tt("Explique pourquoi tu choisis de garder tes distances.", "Explain why you choose to keep your distance.", "Explica por qué eliges mantener la distancia.", "Spiega perché scegli di mantenere le distanze.", "距離をとる理由を説明しよう。", "Erkläre, warum du Abstand hältst.", "اشرح لماذا تختار الحفاظ على المسافة.", "说说你为什么选择保持距离。", "Leg uit waarom je afstand houdt.", "Explique por que você escolhe manter distância.", "Förklara varför du väljer att hålla avstånd.", "Объясни, почему ты держишься на расстоянии.", "Wyjaśnij, dlaczego zachowujesz dystans.", "왜 거리를 두기로 했는지 설명하자.")
      ]
    },
    hb: [
      tt("Pourquoi le cheval remarque-t-il parfois quelque chose avant moi ?", "Why does a horse sometimes notice something before I do?", "¿Por qué el caballo a veces nota algo antes que yo?", "Perché il cavallo a volte nota qualcosa prima di me?", "馬が自分より先に何かに気づくことがあるのはなぜ？", "Warum bemerkt das Pferd manchmal etwas vor mir?", "لماذا يلاحظ الحصان شيئًا قبلي أحيانًا؟", "为什么马有时比我先注意到某些东西？", "Waarom merkt een paard soms iets op vóór mij?", "Por que o cavalo às vezes percebe algo antes de mim?", "Varför märker hästen ibland något före mig?", "Почему лошадь иногда замечает что-то раньше меня?", "Dlaczego koń czasem zauważa coś przede mną?", "말은 왜 가끔 나보다 먼저 무언가를 알아챌까?"),
      tt("Peut-il reconnaître une personne sans la regarder directement ?", "Can it recognise someone without looking straight at them?", "¿Puede reconocer a una persona sin mirarla directamente?", "Può riconoscere una persona senza guardarla direttamente?", "まっすぐ見なくても人を見分けられる？", "Kann es einen Menschen erkennen, ohne ihn direkt anzusehen?", "هل يمكنه التعرّف على شخص دون أن ينظر إليه مباشرة؟", "它不直视也能认出一个人吗？", "Kan het iemand herkennen zonder hem recht aan te kijken?", "Ele consegue reconhecer uma pessoa sem olhar diretamente para ela?", "Kan den känna igen en person utan att titta rakt på den?", "Может ли она узнать человека, не глядя прямо на него?", "Czy może rozpoznać osobę, nie patrząc na nią wprost?", "똑바로 보지 않아도 사람을 알아볼 수 있을까?"),
      tt("Comment sait-il d'où vient un bruit ?", "How does it know where a sound is coming from?", "¿Cómo sabe de dónde viene un ruido?", "Come sa da dove viene un rumore?", "音がどこから来るか、どうやってわかるの？", "Woher weiß es, woher ein Geräusch kommt?", "كيف يعرف من أين يأتي الصوت؟", "它怎么知道声音从哪里来？", "Hoe weet het waar een geluid vandaan komt?", "Como ele sabe de onde vem um barulho?", "Hur vet den var ett ljud kommer ifrån?", "Как она понимает, откуда идёт звук?", "Skąd wie, skąd dochodzi dźwięk?", "소리가 어디서 나는지 어떻게 알까?"),
      tt("Pourquoi faut-il le prévenir avant de l'approcher ?", "Why should you let it know before approaching?", "¿Por qué hay que avisarle antes de acercarse?", "Perché bisogna avvisarlo prima di avvicinarsi?", "近づく前に知らせるのはなぜ？", "Warum muss man es vorwarnen, bevor man sich nähert?", "لماذا يجب تنبيهه قبل الاقتراب منه؟", "为什么靠近前要先提醒它？", "Waarom moet je het waarschuwen voordat je het nadert?", "Por que é preciso avisá-lo antes de se aproximar?", "Varför ska man förvarna den innan man går fram?", "Почему нужно предупредить её, прежде чем подойти?", "Dlaczego trzeba go uprzedzić, zanim się podejdzie?", "다가가기 전에 왜 미리 알려야 할까?"),
      tt("Comment éviter de confondre curiosité et inquiétude ?", "How can I avoid mixing up curiosity and worry?", "¿Cómo evitar confundir curiosidad e inquietud?", "Come evitare di confondere curiosità e preoccupazione?", "好奇心と不安を見まちがえないためには？", "Wie verwechsle ich Neugier und Unruhe nicht?", "كيف أتجنّب الخلط بين الفضول والقلق؟", "怎样避免把好奇和不安弄混？", "Hoe voorkom ik dat ik nieuwsgierigheid en ongerustheid verwar?", "Como evitar confundir curiosidade e inquietação?", "Hur undviker jag att blanda ihop nyfikenhet och oro?", "Как не перепутать любопытство и тревогу?", "Jak nie pomylić ciekawości z niepokojem?", "호기심과 불안을 헷갈리지 않으려면?")
    ],
    chap: [
      [tt("Voir sans être surpris", "Seeing without being startled", "Ver sin sorprenderse", "Vedere senza essere sorpresi", "おどろかずに見る", "Sehen, ohne zu erschrecken", "الرؤية دون مفاجأة", "看见而不受惊", "Zien zonder te schrikken", "Ver sem ser surpreendido", "Se utan att skrämmas", "Видеть без испуга", "Widzieć bez zaskoczenia", "놀라지 않고 보기"), 5],
      [tt("Écouter et ressentir", "Listening and feeling", "Escuchar y sentir", "Ascoltare e sentire", "聞いて、感じる", "Hören und fühlen", "الإصغاء والإحساس", "倾听与感受", "Luisteren en voelen", "Ouvir e sentir", "Lyssna och känna", "Слышать и чувствовать", "Słuchać i czuć", "듣고 느끼기"), 3]
    ]
  },
  "g2-vie-sociale": {
    defi: {
      titre: tt("Journal du troupeau", "Herd diary", "Diario de la manada", "Diario del branco", "群れの日記", "Herdentagebuch", "يوميات القطيع", "马群日记", "Kuddedagboek", "Diário da manada", "Flockdagbok", "Дневник табуна", "Dziennik stada", "무리 일기"),
      accroche: tt("Depuis l'extérieur d'un pré sécurisé, observe les chevaux avec ton enseignant, sans entrer ni les appeler.", "From outside a secure field, watch the horses with your instructor, without going in or calling them.", "Desde fuera de un prado seguro, observa a los caballos con tu profesor, sin entrar ni llamarlos.", "Dall'esterno di un prato sicuro, osserva i cavalli con il tuo istruttore, senza entrare né chiamarli.", "安全な放牧地の外から、中に入ったり呼んだりせずに、先生といっしょに馬たちを観察しよう。", "Beobachte mit deinem Reitlehrer die Pferde von außerhalb einer sicheren Weide, ohne hineinzugehen oder sie zu rufen.", "من خارج مرعى آمن، راقب الخيول مع مدرّبك دون أن تدخل أو تناديها.", "在安全的草场外，和教练一起观察马群，不要进去，也不要呼唤它们。", "Kijk met je instructeur van buiten een veilige wei naar de paarden, zonder erin te gaan of ze te roepen.", "Do lado de fora de um pasto seguro, observe os cavalos com seu instrutor, sem entrar nem chamá-los.", "Titta på hästarna med din instruktör från utsidan av en säker hage, utan att gå in eller locka på dem.", "Из-за ограды безопасного пастбища понаблюдай с тренером за лошадьми, не заходя внутрь и не подзывая их.", "Spoza bezpiecznego pastwiska obserwuj konie z instruktorem, nie wchodząc i nie przywołując ich.", "안전한 방목장 밖에서 들어가거나 부르지 말고 선생님과 함께 말들을 관찰하자."),
      points: [
        tt("Repère deux chevaux qui restent proches.", "Spot two horses that stay close together.", "Localiza dos caballos que permanecen juntos.", "Individua due cavalli che restano vicini.", "いつもそばにいる2頭を見つけよう。", "Finde zwei Pferde, die nah beieinander bleiben.", "حدّد حصانين يبقيان قريبين من بعضهما.", "找出两匹总待在一起的马。", "Zoek twee paarden die dicht bij elkaar blijven.", "Encontre dois cavalos que ficam próximos.", "Hitta två hästar som håller sig nära varandra.", "Найди двух лошадей, которые держатся рядом.", "Wskaż dwa konie, które trzymają się blisko.", "가까이 붙어 있는 두 말을 찾아보자."),
        tt("Observe un comportement de repos ou de déplacement.", "Watch a resting or moving behaviour.", "Observa un comportamiento de descanso o de desplazamiento.", "Osserva un comportamento di riposo o di spostamento.", "休んでいる様子か、移動している様子を観察しよう。", "Beobachte ein Ruhe- oder Bewegungsverhalten.", "راقب سلوك راحة أو تنقّل.", "观察一种休息或移动的行为。", "Bekijk rust- of verplaatsingsgedrag.", "Observe um comportamento de descanso ou deslocamento.", "Titta på ett vilo- eller förflyttningsbeteende.", "Понаблюдай за отдыхом или передвижением.", "Obserwuj zachowanie podczas odpoczynku lub przemieszczania się.", "쉬거나 이동하는 행동을 관찰하자."),
        tt("Décris ce que tu as vu sans supposer leurs intentions.", "Describe what you saw without guessing their intentions.", "Describe lo que has visto sin suponer sus intenciones.", "Descrivi ciò che hai visto senza supporre le loro intenzioni.", "馬の気持ちを想像せず、見たことだけを説明しよう。", "Beschreibe, was du gesehen hast, ohne ihre Absichten zu unterstellen.", "صف ما رأيته دون افتراض نواياها.", "描述你看到的，不要猜测它们的意图。", "Beschrijf wat je zag zonder hun bedoelingen te raden.", "Descreva o que viu sem supor as intenções deles.", "Beskriv vad du såg utan att gissa deras avsikter.", "Опиши увиденное, не приписывая им намерений.", "Opisz, co widziałeś, nie zgadując ich zamiarów.", "의도를 짐작하지 말고 본 것만 설명하자.")
      ]
    },
    hb: [
      tt("Pourquoi certains chevaux restent-ils côte à côte ?", "Why do some horses stay side by side?", "¿Por qué algunos caballos se quedan uno al lado del otro?", "Perché alcuni cavalli restano fianco a fianco?", "いつも並んでいる馬がいるのはなぜ？", "Warum bleiben manche Pferde Seite an Seite?", "لماذا تبقى بعض الخيول جنبًا إلى جنب؟", "为什么有些马总是并排待着？", "Waarom blijven sommige paarden zij aan zij?", "Por que alguns cavalos ficam lado a lado?", "Varför håller sig vissa hästar sida vid sida?", "Почему некоторые лошади держатся бок о бок?", "Dlaczego niektóre konie trzymają się obok siebie?", "어떤 말들은 왜 나란히 붙어 있을까?"),
      tt("Comment reconnaître un moment calme dans un groupe ?", "How can I recognise a calm moment in a group?", "¿Cómo reconocer un momento tranquilo en un grupo?", "Come riconoscere un momento tranquillo in un gruppo?", "群れが落ち着いているときは、どうやってわかる？", "Woran erkenne ich einen ruhigen Moment in einer Gruppe?", "كيف أتعرّف على لحظة هدوء في المجموعة؟", "怎么看出马群处于平静时刻？", "Hoe herken ik een rustig moment in een groep?", "Como reconhecer um momento calmo num grupo?", "Hur känner jag igen ett lugnt ögonblick i en grupp?", "Как распознать спокойный момент в группе?", "Jak rozpoznać spokojny moment w grupie?", "무리가 차분한 순간은 어떻게 알아볼까?"),
      tt("Un cheval peut-il préférer un compagnon particulier ?", "Can a horse prefer one particular companion?", "¿Puede un caballo preferir a un compañero en particular?", "Un cavallo può preferire un compagno in particolare?", "馬にも特に好きな仲間がいるの？", "Kann ein Pferd einen bestimmten Gefährten bevorzugen?", "هل يمكن أن يفضّل الحصان رفيقًا معيّنًا؟", "马会偏爱某个特定的伙伴吗？", "Kan een paard een bepaalde maat verkiezen?", "Um cavalo pode preferir um companheiro em especial?", "Kan en häst föredra en viss kompis?", "Может ли лошадь предпочитать определённого товарища?", "Czy koń może woleć konkretnego towarzysza?", "말도 특별히 좋아하는 친구가 있을까?"),
      tt("Pourquoi ne faut-il pas distribuer de friandises sans autorisation ?", "Why shouldn't you hand out treats without permission?", "¿Por qué no hay que dar golosinas sin permiso?", "Perché non bisogna dare dolcetti senza permesso?", "許可なくおやつをあげてはいけないのはなぜ？", "Warum darf man keine Leckerlis ohne Erlaubnis verteilen?", "لماذا لا يجب توزيع الحلوى دون إذن؟", "为什么未经允许不能喂零食？", "Waarom mag je geen snoepjes geven zonder toestemming?", "Por que não se deve dar petiscos sem autorização?", "Varför ska man inte ge godis utan lov?", "Почему нельзя давать лакомства без разрешения?", "Dlaczego nie wolno dawać smakołyków bez pozwolenia?", "왜 허락 없이 간식을 주면 안 될까?"),
      tt("Comment savoir si un cheval a suffisamment de fourrage ?", "How can I tell if a horse has enough forage?", "¿Cómo saber si un caballo tiene suficiente forraje?", "Come capire se un cavallo ha abbastanza foraggio?", "馬に十分な粗飼料があるか、どうやってわかる？", "Woran erkenne ich, ob ein Pferd genug Raufutter hat?", "كيف أعرف أن لدى الحصان ما يكفي من العلف الخشن؟", "怎么知道马的粗饲料够不够？", "Hoe weet ik of een paard genoeg ruwvoer heeft?", "Como saber se um cavalo tem forragem suficiente?", "Hur vet jag om en häst har tillräckligt med grovfoder?", "Как понять, что у лошади достаточно грубого корма?", "Skąd wiem, że koń ma dość paszy objętościowej?", "말에게 조사료가 충분한지 어떻게 알 수 있을까?")
    ],
    chap: [
      [tt("Vivre avec les autres", "Living with others", "Vivir con los demás", "Vivere con gli altri", "仲間と暮らす", "Mit anderen leben", "العيش مع الآخرين", "与同伴共同生活", "Samenleven met anderen", "Viver com os outros", "Leva med andra", "Жить с другими", "Życie z innymi", "다른 말들과 함께 살기"), 4],
      [tt("Manger au quotidien", "Eating every day", "Comer cada día", "Mangiare ogni giorno", "毎日の食事", "Fressen im Alltag", "الأكل يوميًا", "日常进食", "Dagelijks eten", "Comer no dia a dia", "Äta varje dag", "Питание каждый день", "Codzienne jedzenie", "매일의 식사"), 3]
    ]
  },
  "g2-pansage": {
    defi: {
      titre: tt("Contrôle confort", "Comfort check", "Control de comodidad", "Controllo comfort", "快適チェック", "Wohlfühl-Check", "فحص الراحة", "舒适检查", "Comfortcontrole", "Verificação de conforto", "Komfortkoll", "Проверка комфорта", "Kontrola komfortu", "편안함 점검"),
      accroche: tt("Avec ton enseignant, prends le temps de regarder le cheval avant et après le pansage.", "With your instructor, take time to look at the horse before and after grooming.", "Con tu profesor, tómate tiempo para mirar al caballo antes y después de la limpieza.", "Con il tuo istruttore, prenditi il tempo di guardare il cavallo prima e dopo il governo.", "先生といっしょに、手入れの前とあとで馬をよく見よう。", "Nimm dir mit deinem Reitlehrer Zeit, das Pferd vor und nach dem Putzen anzusehen.", "مع مدرّبك، خذ وقتك لتنظر إلى الحصان قبل التنظيف وبعده.", "和教练一起，在刷马前后花时间仔细看看马。", "Neem met je instructeur de tijd om het paard voor en na het poetsen te bekijken.", "Com seu instrutor, reserve um tempo para olhar o cavalo antes e depois da limpeza.", "Ta dig tid med din instruktör att titta på hästen före och efter ryktningen.", "Вместе с тренером внимательно осмотри лошадь до и после чистки.", "Z instruktorem poświęć czas, by obejrzeć konia przed czyszczeniem i po nim.", "선생님과 함께 손질 전후에 말을 찬찬히 살펴보자."),
      points: [
        tt("Repère une zone à examiner attentivement sans appuyer.", "Find an area to examine carefully without pressing.", "Localiza una zona para examinar con atención sin presionar.", "Individua una zona da esaminare con attenzione senza premere.", "強く押さずに、よく調べる場所をひとつ見つけよう。", "Finde eine Stelle, die du genau ansiehst, ohne zu drücken.", "حدّد منطقة لتفحّصها بعناية دون الضغط عليها.", "找一个需要仔细检查的部位，不要用力按。", "Zoek een plek die je goed bekijkt zonder te drukken.", "Encontre uma área para examinar com atenção sem apertar.", "Hitta ett område att undersöka noga utan att trycka.", "Найди место, которое нужно внимательно осмотреть, не нажимая.", "Wskaż miejsce do uważnego obejrzenia bez naciskania.", "누르지 말고 꼼꼼히 살펴볼 부위를 찾자."),
        tt("Choisis l'outil adapté à une zone de pansage.", "Choose the right tool for one grooming area.", "Elige la herramienta adecuada para una zona de limpieza.", "Scegli l'attrezzo adatto a una zona del governo.", "手入れする場所に合った道具を選ぼう。", "Wähle das passende Putzzeug für eine Körperstelle.", "اختر الأداة المناسبة لمنطقة التنظيف.", "为一个刷拭部位选择合适的工具。", "Kies het juiste poetsgerei voor een plek.", "Escolha a ferramenta adequada para uma área da limpeza.", "Välj rätt verktyg för ett ryktområde.", "Выбери подходящую щётку для участка чистки.", "Wybierz odpowiednie narzędzie do danego miejsca.", "손질할 부위에 맞는 도구를 고르자."),
        tt("Signale une anomalie éventuelle au lieu d'essayer de la soigner.", "Report anything unusual instead of trying to treat it yourself.", "Avisa de cualquier anomalía en lugar de intentar curarla.", "Segnala un'eventuale anomalia invece di cercare di curarla.", "気になるところは自分で手当てせず、知らせよう。", "Melde Auffälligkeiten, statt sie selbst zu behandeln.", "أبلِغ عن أي أمر غير طبيعي بدل محاولة علاجه.", "发现异常就报告，不要自己处理。", "Meld een afwijking in plaats van die zelf te verzorgen.", "Avise qualquer anomalia em vez de tentar tratá-la.", "Rapportera något avvikande i stället för att försöka behandla det.", "Сообщи о любом отклонении, а не пытайся лечить сам.", "Zgłoś nieprawidłowość zamiast próbować ją leczyć.", "이상한 점은 직접 치료하지 말고 알리자.")
      ]
    },
    hb: [
      tt("Comment savoir si une brosse est trop dure pour une zone ?", "How do I know if a brush is too hard for an area?", "¿Cómo saber si un cepillo es demasiado duro para una zona?", "Come capire se una spazzola è troppo dura per una zona?", "ブラシがその場所にかたすぎるか、どうやってわかる？", "Woran erkenne ich, dass eine Bürste für eine Stelle zu hart ist?", "كيف أعرف أن الفرشاة قاسية جدًا على منطقة ما؟", "怎么知道一把刷子对某个部位太硬？", "Hoe weet ik of een borstel te hard is voor een plek?", "Como saber se uma escova é dura demais para uma área?", "Hur vet jag om en borste är för hård för ett område?", "Как понять, что щётка слишком жёсткая для участка?", "Skąd wiem, że szczotka jest za twarda na dane miejsce?", "브러시가 그 부위에 너무 거친지 어떻게 알까?"),
      tt("Pourquoi faut-il vérifier l'état du pied plutôt que seulement le nettoyer ?", "Why should you check the hoof rather than just clean it?", "¿Por qué hay que revisar el estado del casco y no solo limpiarlo?", "Perché bisogna controllare lo stato del piede e non solo pulirlo?", "ひづめは掃除するだけでなく、状態も確かめるのはなぜ？", "Warum muss man den Huf kontrollieren und nicht nur auskratzen?", "لماذا يجب فحص حالة الحافر لا تنظيفه فقط؟", "为什么要检查马蹄的状态，而不只是清理？", "Waarom moet je de hoef controleren in plaats van alleen schoonmaken?", "Por que verificar o estado do casco em vez de só limpá-lo?", "Varför ska man kontrollera hoven och inte bara rensa den?", "Почему копыто нужно осматривать, а не только чистить?", "Dlaczego trzeba sprawdzić stan kopyta, a nie tylko je wyczyścić?", "발굽을 청소만 하지 말고 상태를 확인해야 하는 이유는?"),
      tt("Que faire si le cheval refuse de donner un pied ?", "What should I do if the horse won't give a foot?", "¿Qué hacer si el caballo no quiere dar un pie?", "Cosa fare se il cavallo non vuole dare un piede?", "馬が脚を上げてくれないときはどうする？", "Was tun, wenn das Pferd einen Huf nicht geben will?", "ماذا أفعل إذا رفض الحصان رفع قائمته؟", "如果马不肯抬脚，怎么办？", "Wat doe ik als het paard een voet niet wil geven?", "O que fazer se o cavalo se recusar a dar o pé?", "Vad gör jag om hästen inte vill lyfta en hov?", "Что делать, если лошадь не даёт ногу?", "Co zrobić, gdy koń nie chce podać nogi?", "말이 발을 들어 주지 않으면 어떻게 할까?"),
      tt("Comment différencier une saleté d'une petite blessure ?", "How can I tell dirt from a small wound?", "¿Cómo diferenciar suciedad de una pequeña herida?", "Come distinguere lo sporco da una piccola ferita?", "汚れと小さなけがはどう見分ける？", "Wie unterscheide ich Schmutz von einer kleinen Verletzung?", "كيف أميّز بين الاتساخ وجرح صغير؟", "怎么区分脏东西和小伤口？", "Hoe onderscheid ik vuil van een kleine wond?", "Como diferenciar sujeira de um pequeno ferimento?", "Hur skiljer jag smuts från ett litet sår?", "Как отличить грязь от небольшой ранки?", "Jak odróżnić brud od małej rany?", "더러움과 작은 상처를 어떻게 구별할까?"),
      tt("Quand dois-je demander à mon enseignant d'intervenir ?", "When should I ask my instructor to step in?", "¿Cuándo debo pedir a mi profesor que intervenga?", "Quando devo chiedere al mio istruttore di intervenire?", "どんなときに先生を呼べばいい？", "Wann soll ich meinen Reitlehrer um Hilfe bitten?", "متى يجب أن أطلب من مدرّبي التدخّل؟", "什么时候应该请教练来处理？", "Wanneer vraag ik mijn instructeur om in te grijpen?", "Quando devo pedir ao meu instrutor para intervir?", "När ska jag be min instruktör att ingripa?", "Когда нужно попросить тренера вмешаться?", "Kiedy mam poprosić instruktora o pomoc?", "언제 선생님께 도움을 청해야 할까?")
    ],
    chap: [
      [tt("Choisir les bons outils", "Choosing the right tools", "Elegir las herramientas adecuadas", "Scegliere gli attrezzi giusti", "道具を選ぶ", "Das richtige Putzzeug wählen", "اختيار الأدوات المناسبة", "选择合适的工具", "Het juiste poetsgerei kiezen", "Escolher as ferramentas certas", "Välj rätt verktyg", "Выбор нужных щёток", "Wybór właściwych narzędzi", "알맞은 도구 고르기"), 3],
      [tt("Observer en pansant", "Observing while grooming", "Observar al limpiar", "Osservare durante il governo", "手入れしながら観察", "Beim Putzen beobachten", "الملاحظة أثناء التنظيف", "边刷边观察", "Kijken tijdens het poetsen", "Observar ao limpar", "Iaktta medan du ryktar", "Наблюдать во время чистки", "Obserwacja podczas czyszczenia", "손질하며 관찰하기"), 3],
      [tt("Privilégier la douceur", "Choosing gentleness", "Priorizar la suavidad", "Privilegiare la dolcezza", "やさしさを大切に", "Sanftheit vor allem", "تفضيل اللطف", "以温柔为先", "Zachtheid voorop", "Priorizar a suavidade", "Mjukhet först", "Мягкость прежде всего", "Delikatność przede wszystkim", "부드러움 우선"), 2]
    ]
  },
  "g2-filet-selle": {
    defi: {
      titre: tt("Contrôle équipement", "Equipment check", "Control del equipo", "Controllo attrezzatura", "道具チェック", "Ausrüstungs-Check", "فحص المعدات", "装备检查", "Materiaalcontrole", "Verificação do equipamento", "Utrustningskoll", "Проверка снаряжения", "Kontrola sprzętu", "장비 점검"),
      accroche: tt("Avec ton enseignant, examine le matériel posé sur un support avant de préparer le cheval.", "With your instructor, examine the equipment on its rack before preparing the horse.", "Con tu profesor, examina el material colocado en un soporte antes de preparar al caballo.", "Con il tuo istruttore, esamina l'attrezzatura posata su un supporto prima di preparare il cavallo.", "馬の準備をする前に、先生といっしょに台に置いた道具を調べよう。", "Untersuche mit deinem Reitlehrer die Ausrüstung auf dem Halter, bevor du das Pferd vorbereitest.", "مع مدرّبك، افحص المعدات الموضوعة على حاملها قبل تجهيز الحصان.", "备马前，和教练一起检查放在架子上的马具。", "Bekijk met je instructeur het materiaal op de houder voordat je het paard klaarmaakt.", "Com seu instrutor, examine o material no suporte antes de preparar o cavalo.", "Undersök utrustningen på hållaren med din instruktör innan du gör i ordning hästen.", "Вместе с тренером осмотри снаряжение на подставке, прежде чем готовить лошадь.", "Z instruktorem obejrzyj sprzęt na wieszaku, zanim przygotujesz konia.", "말을 준비하기 전에 선생님과 함께 거치대에 놓인 장비를 살펴보자."),
      points: [
        tt("Repère une boucle à contrôler avant utilisation.", "Find a buckle to check before use.", "Localiza una hebilla que revisar antes de usar.", "Individua una fibbia da controllare prima dell'uso.", "使う前に確かめるバックルを見つけよう。", "Finde eine Schnalle, die du vor dem Gebrauch prüfst.", "حدّد إبزيمًا يجب فحصه قبل الاستعمال.", "找出一个使用前要检查的扣环。", "Zoek een gesp om voor gebruik te controleren.", "Encontre uma fivela para verificar antes do uso.", "Hitta ett spänne att kontrollera före användning.", "Найди пряжку, которую нужно проверить перед использованием.", "Wskaż sprzączkę do sprawdzenia przed użyciem.", "사용 전에 확인할 버클을 찾자."),
        tt("Identifie une zone qui pourrait provoquer un frottement.", "Identify an area that could rub.", "Identifica una zona que podría provocar roce.", "Individua una zona che potrebbe causare sfregamento.", "こすれの原因になりそうな場所を見つけよう。", "Finde eine Stelle, die scheuern könnte.", "حدّد منطقة قد تسبّب احتكاكًا.", "找出可能造成摩擦的部位。", "Zoek een plek die zou kunnen schuren.", "Identifique uma área que poderia causar atrito.", "Hitta ett ställe som kan skava.", "Найди место, которое может натирать.", "Wskaż miejsce, które mogłoby obcierać.", "쓸림이 생길 수 있는 부위를 찾자."),
        tt("Explique à ton enseignant quel entretien est nécessaire.", "Tell your instructor what care is needed.", "Explica a tu profesor qué mantenimiento hace falta.", "Spiega al tuo istruttore quale manutenzione serve.", "どんな手入れが必要か、先生に説明しよう。", "Erkläre deinem Reitlehrer, welche Pflege nötig ist.", "اشرح لمدرّبك ما العناية اللازمة.", "向教练说明需要怎样保养。", "Leg je instructeur uit welk onderhoud nodig is.", "Explique ao seu instrutor que manutenção é necessária.", "Förklara för din instruktör vilken skötsel som behövs.", "Объясни тренеру, какой уход нужен.", "Wyjaśnij instruktorowi, jaka konserwacja jest potrzebna.", "어떤 손질이 필요한지 선생님께 설명하자.")
      ]
    },
    hb: [
      tt("Comment voir si une couture de selle commence à s'abîmer ?", "How can I see if a saddle seam is starting to wear?", "¿Cómo ver si una costura de la silla empieza a estropearse?", "Come vedere se una cucitura della sella inizia a rovinarsi?", "鞍の縫い目が傷みはじめているか、どうやって見る？", "Wie sehe ich, ob eine Sattelnaht sich auflöst?", "كيف أرى أن خياطة السرج بدأت تتلف؟", "怎么看出马鞍的缝线开始磨损？", "Hoe zie ik of een naad van het zadel begint te slijten?", "Como ver se uma costura da sela começa a se desgastar?", "Hur ser jag om en sadelsöm börjar gå sönder?", "Как заметить, что шов седла начинает расходиться?", "Jak zauważyć, że szew siodła zaczyna się psuć?", "안장의 바느질이 닳기 시작했는지 어떻게 알까?"),
      tt("Pourquoi le cuir peut-il devenir inconfortable s'il est mal entretenu ?", "Why can poorly cared-for leather become uncomfortable?", "¿Por qué el cuero puede volverse incómodo si está mal cuidado?", "Perché il cuoio può diventare scomodo se è curato male?", "手入れが悪い革が不快になるのはなぜ？", "Warum kann schlecht gepflegtes Leder unbequem werden?", "لماذا قد يصبح الجلد مزعجًا إذا لم يُعتنَ به؟", "为什么保养不好的皮革会让马不舒服？", "Waarom kan slecht onderhouden leer oncomfortabel worden?", "Por que o couro mal cuidado pode ficar desconfortável?", "Varför kan dåligt skött läder bli obekvämt?", "Почему плохо ухоженная кожа может натирать?", "Dlaczego źle konserwowana skóra może być niewygodna?", "관리가 안 된 가죽은 왜 불편해질까?"),
      tt("Que faire si le cheval semble gêné par son filet ?", "What if the horse seems bothered by its bridle?", "¿Qué hacer si el caballo parece molesto con su cabezada?", "Cosa fare se il cavallo sembra infastidito dalla testiera?", "馬が頭絡をいやがっているようなら？", "Was tun, wenn das Pferd durch die Trense gestört wirkt?", "ماذا أفعل إذا بدا الحصان منزعجًا من لجامه؟", "如果马好像被水勒弄得不舒服，怎么办？", "Wat doe ik als het paard last lijkt te hebben van zijn hoofdstel?", "O que fazer se o cavalo parecer incomodado com a cabeçada?", "Vad gör jag om hästen verkar störd av träns?", "Что делать, если лошади мешает уздечка?", "Co zrobić, gdy koniowi wydaje się przeszkadzać ogłowie?", "말이 굴레를 불편해하는 것 같으면 어떻게 할까?"),
      tt("Comment savoir si une pièce a été remise à l'envers ?", "How can I tell if a part has been put back the wrong way?", "¿Cómo saber si una pieza se ha vuelto a poner al revés?", "Come capire se un pezzo è stato rimesso al contrario?", "部品が逆向きにつけられているか、どうやってわかる？", "Woran erkenne ich, dass ein Teil verkehrt herum angebracht wurde?", "كيف أعرف أن قطعة رُكّبت بالمقلوب؟", "怎么知道某个部件装反了？", "Hoe weet ik of een onderdeel verkeerd om zit?", "Como saber se uma peça foi recolocada ao contrário?", "Hur vet jag om en del har satts tillbaka åt fel håll?", "Как понять, что деталь поставили задом наперёд?", "Skąd wiem, że część została założona odwrotnie?", "부품이 거꾸로 끼워졌는지 어떻게 알 수 있을까?"),
      tt("Quels réglages dois-je toujours faire vérifier ?", "Which fittings should I always have checked?", "¿Qué ajustes debo hacer revisar siempre?", "Quali regolazioni devo sempre far controllare?", "いつも確認してもらうべき調整は？", "Welche Einstellungen muss ich immer prüfen lassen?", "ما الضبطات التي يجب أن أطلب التحقق منها دائمًا؟", "哪些调整我必须每次请人检查？", "Welke afstellingen moet ik altijd laten controleren?", "Que ajustes devo sempre pedir para verificar?", "Vilka inställningar ska jag alltid låta kontrollera?", "Какие подгонки нужно всегда проверять у тренера?", "Które ustawienia muszę zawsze dać do sprawdzenia?", "어떤 조정은 항상 확인받아야 할까?")
    ],
    chap: [
      [tt("Reconnaître l'équipement", "Recognising the equipment", "Reconocer el equipo", "Riconoscere l'attrezzatura", "道具を知る", "Die Ausrüstung kennen", "التعرّف على المعدات", "认识装备", "Het materiaal herkennen", "Reconhecer o equipamento", "Känna igen utrustningen", "Узнать снаряжение", "Rozpoznać sprzęt", "장비 알아보기"), 4],
      [tt("Préparer et entretenir", "Preparing and caring", "Preparar y mantener", "Preparare e curare", "準備と手入れ", "Vorbereiten und pflegen", "التجهيز والعناية", "准备与保养", "Klaarmaken en onderhouden", "Preparar e conservar", "Förbereda och sköta", "Подготовка и уход", "Przygotowanie i konserwacja", "준비와 손질"), 4]
    ]
  },
  "g2-familles": {
    defi: {
      titre: tt("À chaque discipline", "To each discipline", "A cada disciplina", "A ogni disciplina", "それぞれの競技", "Jeder Disziplin ihr Bild", "لكل تخصص", "每个项目", "Elke discipline", "A cada disciplina", "Varje gren", "Каждой дисциплине", "Każda dyscyplina", "종목마다"),
      accroche: tt("Avec des photos ou des vidéos sélectionnées par ton enseignant, découvre ce qui distingue plusieurs activités équestres.", "Using photos or videos chosen by your instructor, find out what sets different riding activities apart.", "Con fotos o vídeos elegidos por tu profesor, descubre lo que distingue varias actividades ecuestres.", "Con foto o video scelti dal tuo istruttore, scopri cosa distingue diverse attività equestri.", "先生が選んだ写真や動画で、いろいろな馬術競技のちがいを見つけよう。", "Entdecke anhand von Fotos oder Videos, die dein Reitlehrer auswählt, was verschiedene Reitdisziplinen unterscheidet.", "بصور أو فيديوهات يختارها مدرّبك، اكتشف ما يميّز أنشطة الفروسية المختلفة.", "借助教练挑选的照片或视频，了解不同马术项目的区别。", "Ontdek met foto's of video's die je instructeur kiest wat verschillende disciplines onderscheidt.", "Com fotos ou vídeos escolhidos pelo seu instrutor, descubra o que distingue várias atividades equestres.", "Upptäck med foton eller filmer som din instruktör valt vad som skiljer olika ridgrenar åt.", "С помощью фото или видео, которые выберет тренер, узнай, чем отличаются разные виды конного спорта.", "Na zdjęciach lub filmach wybranych przez instruktora odkryj, czym różnią się dyscypliny jeździeckie.", "선생님이 고른 사진이나 영상으로 여러 승마 종목의 차이를 알아보자."),
      points: [
        tt("Associe trois images à trois disciplines.", "Match three pictures to three disciplines.", "Asocia tres imágenes a tres disciplinas.", "Associa tre immagini a tre discipline.", "3枚の画像を3つの競技に結びつけよう。", "Ordne drei Bilder drei Disziplinen zu.", "اربط ثلاث صور بثلاثة تخصصات.", "把三张图片和三个项目配对。", "Koppel drie beelden aan drie disciplines.", "Associe três imagens a três disciplinas.", "Para ihop tre bilder med tre grenar.", "Сопоставь три картинки с тремя дисциплинами.", "Dopasuj trzy obrazy do trzech dyscyplin.", "사진 세 장을 세 종목과 짝지어 보자."),
        tt("Repère un équipement différent d'une discipline à l'autre.", "Spot a piece of equipment that differs from one discipline to another.", "Localiza un equipo que cambia de una disciplina a otra.", "Individua un'attrezzatura che cambia da una disciplina all'altra.", "競技によってちがう道具をひとつ見つけよう。", "Finde ein Ausrüstungsteil, das sich je nach Disziplin unterscheidet.", "حدّد قطعة معدات تختلف من تخصص لآخر.", "找出一件在不同项目中不一样的装备。", "Zoek een uitrustingsstuk dat per discipline verschilt.", "Encontre um equipamento que muda de uma disciplina para outra.", "Hitta en utrustning som skiljer sig mellan grenarna.", "Найди снаряжение, которое отличается в разных дисциплинах.", "Wskaż sprzęt, który różni się między dyscyplinami.", "종목마다 다른 장비 하나를 찾아보자."),
        tt("Choisis celle que tu aimerais découvrir et explique pourquoi.", "Choose the one you'd like to try and explain why.", "Elige la que te gustaría descubrir y explica por qué.", "Scegli quella che vorresti scoprire e spiega perché.", "やってみたい競技を選び、理由を説明しよう。", "Wähle die, die du gern ausprobieren möchtest, und erkläre warum.", "اختر التخصص الذي تودّ اكتشافه واشرح السبب.", "选出你想尝试的项目并说明原因。", "Kies de discipline die je wilt ontdekken en leg uit waarom.", "Escolha a que gostaria de conhecer e explique por quê.", "Välj den du skulle vilja prova och förklara varför.", "Выбери ту, которую хочешь попробовать, и объясни почему.", "Wybierz tę, którą chciałbyś poznać, i wyjaśnij dlaczego.", "해 보고 싶은 종목을 고르고 이유를 설명하자.")
      ]
    },
    hb: [
      tt("Peut-on découvrir plusieurs disciplines dans un même club ?", "Can you try several disciplines at the same club?", "¿Se pueden descubrir varias disciplinas en un mismo club?", "Si possono scoprire più discipline nello stesso club?", "ひとつのクラブでいくつもの競技を体験できる？", "Kann man in einem Verein mehrere Disziplinen kennenlernen?", "هل يمكن اكتشاف عدة تخصصات في النادي نفسه؟", "在同一个俱乐部能体验多个项目吗？", "Kun je in één club meerdere disciplines ontdekken?", "É possível conhecer várias disciplinas no mesmo clube?", "Kan man prova flera grenar på samma klubb?", "Можно ли попробовать несколько дисциплин в одном клубе?", "Czy w jednym klubie można poznać kilka dyscyplin?", "한 클럽에서 여러 종목을 체험할 수 있을까?"),
      tt("Quelle différence existe-t-il entre une épreuve de dressage et une épreuve de saut ?", "What's the difference between a dressage test and a jumping class?", "¿Qué diferencia hay entre una prueba de doma y una de salto?", "Che differenza c'è tra una prova di dressage e una di salto?", "馬場馬術の競技と障害馬術の競技はどうちがうの？", "Was ist der Unterschied zwischen einer Dressur- und einer Springprüfung?", "ما الفرق بين مسابقة الترويض ومسابقة القفز؟", "盛装舞步比赛和场地障碍比赛有什么区别？", "Wat is het verschil tussen een dressuur- en een springproef?", "Qual a diferença entre uma prova de adestramento e uma de salto?", "Vad är skillnaden mellan en dressyrklass och en hoppklass?", "Чем выездка отличается от конкура на соревнованиях?", "Czym różni się konkurs ujeżdżenia od konkursu skoków?", "마장마술 경기와 장애물 경기는 어떻게 다를까?"),
      tt("Comment se déroule une première sortie à cheval en extérieur ?", "What happens on a first ride out?", "¿Cómo es una primera salida a caballo al exterior?", "Come si svolge una prima uscita a cavallo all'esterno?", "はじめての外乗はどんなふう？", "Wie läuft ein erster Ausritt ab?", "كيف تجري أول نزهة على الحصان في الخارج؟", "第一次外出骑乘是怎样的？", "Hoe verloopt een eerste buitenrit?", "Como é um primeiro passeio a cavalo ao ar livre?", "Hur går en första uteritt till?", "Как проходит первая прогулка верхом?", "Jak wygląda pierwszy wyjazd w teren?", "첫 외승은 어떻게 진행될까?"),
      tt("Pourquoi certaines disciplines utilisent-elles un matériel différent ?", "Why do some disciplines use different equipment?", "¿Por qué algunas disciplinas usan un material diferente?", "Perché alcune discipline usano un'attrezzatura diversa?", "競技によって道具がちがうのはなぜ？", "Warum verwenden manche Disziplinen andere Ausrüstung?", "لماذا تستعمل بعض التخصصات معدات مختلفة؟", "为什么有些项目使用不同的装备？", "Waarom gebruiken sommige disciplines ander materiaal?", "Por que algumas disciplinas usam um material diferente?", "Varför använder vissa grenar annan utrustning?", "Почему в некоторых дисциплинах другое снаряжение?", "Dlaczego niektóre dyscypliny używają innego sprzętu?", "왜 어떤 종목은 다른 장비를 쓸까?"),
      tt("Comment choisir une activité adaptée à mon niveau ?", "How do I choose an activity suited to my level?", "¿Cómo elegir una actividad adaptada a mi nivel?", "Come scegliere un'attività adatta al mio livello?", "自分のレベルに合った活動はどう選ぶ？", "Wie wähle ich eine Aktivität, die zu meinem Niveau passt?", "كيف أختار نشاطًا يناسب مستواي؟", "怎样选择适合我水平的活动？", "Hoe kies ik een activiteit die bij mijn niveau past?", "Como escolher uma atividade adequada ao meu nível?", "Hur väljer jag en aktivitet som passar min nivå?", "Как выбрать занятие по своему уровню?", "Jak wybrać zajęcia dopasowane do mojego poziomu?", "내 수준에 맞는 활동은 어떻게 고를까?")
    ],
    chap: [
      [tt("Les disciplines classiques", "The classic disciplines", "Las disciplinas clásicas", "Le discipline classiche", "代表的な競技", "Die klassischen Disziplinen", "التخصصات الكلاسيكية", "经典项目", "De klassieke disciplines", "As disciplinas clássicas", "De klassiska grenarna", "Классические дисциплины", "Dyscypliny klasyczne", "대표 종목"), 3],
      [tt("D'autres façons de monter", "Other ways to ride", "Otras formas de montar", "Altri modi di montare", "ほかの乗り方", "Andere Arten zu reiten", "طرق أخرى للركوب", "其他骑乘方式", "Andere manieren van rijden", "Outras formas de montar", "Andra sätt att rida", "Другие способы ездить верхом", "Inne sposoby jazdy", "다른 방식의 승마"), 5]
    ]
  },
  "g2-heberger": {
    defi: {
      titre: tt("Parcours du club", "Club tour", "Recorrido del club", "Percorso del club", "クラブめぐり", "Rundgang im Verein", "جولة في النادي", "俱乐部巡游", "Rondgang door de club", "Percurso do clube", "Klubbrundan", "Обход клуба", "Spacer po klubie", "클럽 둘러보기"),
      accroche: tt("Accompagné de ton enseignant, découvre comment les espaces du club sont organisés pour les chevaux et les cavaliers.", "With your instructor, find out how the club's spaces are organised for horses and riders.", "Acompañado de tu profesor, descubre cómo se organizan los espacios del club para caballos y jinetes.", "Accompagnato dal tuo istruttore, scopri come sono organizzati gli spazi del club per cavalli e cavalieri.", "先生といっしょに、クラブの場所が馬と乗り手のためにどう整えられているか見てみよう。", "Entdecke mit deinem Reitlehrer, wie die Bereiche des Vereins für Pferde und Reiter organisiert sind.", "برفقة مدرّبك، اكتشف كيف تُنظَّم مساحات النادي للخيول والفرسان.", "在教练陪同下，了解俱乐部的空间如何为马和骑手安排。", "Ontdek samen met je instructeur hoe de ruimtes van de club voor paarden en ruiters zijn ingericht.", "Acompanhado do seu instrutor, descubra como os espaços do clube são organizados para cavalos e cavaleiros.", "Upptäck tillsammans med din instruktör hur klubbens ytor är ordnade för hästar och ryttare.", "Вместе с тренером узнай, как в клубе устроены пространства для лошадей и всадников.", "Razem z instruktorem odkryj, jak urządzone są przestrzenie klubu dla koni i jeźdźców.", "선생님과 함께 클럽 공간이 말과 기수를 위해 어떻게 꾸며져 있는지 알아보자."),
      points: [
        tt("Repère un point d'eau réservé aux chevaux.", "Find a water point for the horses.", "Localiza un punto de agua reservado a los caballos.", "Individua un punto d'acqua riservato ai cavalli.", "馬のための水飲み場を見つけよう。", "Finde eine Wasserstelle für die Pferde.", "حدّد نقطة ماء مخصصة للخيول.", "找到一个马专用的饮水点。", "Zoek een waterpunt voor de paarden.", "Encontre um ponto de água reservado aos cavalos.", "Hitta en vattenplats för hästarna.", "Найди место водопоя для лошадей.", "Znajdź punkt z wodą dla koni.", "말을 위한 물 마시는 곳을 찾자."),
        tt("Montre un passage où il faut ralentir ou s'arrêter.", "Point out a spot where you must slow down or stop.", "Muestra un paso donde hay que reducir la marcha o detenerse.", "Mostra un passaggio dove bisogna rallentare o fermarsi.", "スピードを落とすか止まるべき場所を示そう。", "Zeige eine Stelle, an der man langsamer werden oder anhalten muss.", "أشِر إلى ممرّ يجب فيه الإبطاء أو التوقّف.", "指出一个需要减速或停下的通道。", "Wijs een doorgang aan waar je moet vertragen of stoppen.", "Mostre um ponto onde é preciso desacelerar ou parar.", "Visa ett ställe där man måste sakta ner eller stanna.", "Покажи место, где нужно замедлиться или остановиться.", "Pokaż przejście, gdzie trzeba zwolnić lub się zatrzymać.", "속도를 줄이거나 멈춰야 하는 통로를 보여 주자."),
        tt("Identifie un endroit où les chevaux peuvent se déplacer librement.", "Find a place where horses can move around freely.", "Identifica un lugar donde los caballos pueden moverse libremente.", "Individua un luogo dove i cavalli possono muoversi liberamente.", "馬が自由に動ける場所を見つけよう。", "Finde einen Ort, an dem sich Pferde frei bewegen können.", "حدّد مكانًا يمكن للخيول التحرك فيه بحرية.", "找出一个马可以自由活动的地方。", "Zoek een plek waar paarden vrij kunnen bewegen.", "Identifique um lugar onde os cavalos podem se mover livremente.", "Hitta en plats där hästarna kan röra sig fritt.", "Найди место, где лошади могут свободно двигаться.", "Wskaż miejsce, gdzie konie mogą się swobodnie poruszać.", "말이 자유롭게 움직일 수 있는 곳을 찾자.")
      ]
    },
    hb: [
      tt("Comment savoir si un lieu de vie convient à un cheval ?", "How can I tell if a living space suits a horse?", "¿Cómo saber si un lugar de vida conviene a un caballo?", "Come capire se un luogo di vita è adatto a un cavallo?", "暮らす場所が馬に合っているか、どうやってわかる？", "Woran erkenne ich, ob ein Lebensraum zu einem Pferd passt?", "كيف أعرف أن مكان العيش يناسب الحصان؟", "怎么知道一个居住环境适不适合马？", "Hoe weet ik of een leefplek bij een paard past?", "Como saber se um local de vida é adequado para um cavalo?", "Hur vet jag om en plats passar en häst att bo på?", "Как понять, подходит ли лошади место содержания?", "Skąd wiem, czy miejsce życia odpowiada koniowi?", "생활 공간이 말에게 맞는지 어떻게 알 수 있을까?"),
      tt("Pourquoi l'eau doit-elle toujours être accessible ?", "Why must water always be available?", "¿Por qué el agua debe estar siempre accesible?", "Perché l'acqua deve essere sempre accessibile?", "水がいつも飲めるようにしておくのはなぜ？", "Warum muss immer Wasser erreichbar sein?", "لماذا يجب أن يكون الماء متاحًا دائمًا؟", "为什么水必须随时可以喝到？", "Waarom moet water altijd bereikbaar zijn?", "Por que a água deve estar sempre acessível?", "Varför måste vatten alltid finnas tillgängligt?", "Почему вода всегда должна быть доступна?", "Dlaczego woda musi być zawsze dostępna?", "왜 물은 언제나 마실 수 있어야 할까?"),
      tt("Quelle différence existe-t-il entre un aliment et un fourrage ?", "What's the difference between a feed and forage?", "¿Qué diferencia hay entre un alimento y un forraje?", "Che differenza c'è tra un alimento e un foraggio?", "飼料と粗飼料はどうちがうの？", "Was ist der Unterschied zwischen Kraftfutter und Raufutter?", "ما الفرق بين العلف المركّز والعلف الخشن؟", "精饲料和粗饲料有什么区别？", "Wat is het verschil tussen krachtvoer en ruwvoer?", "Qual a diferença entre um alimento e uma forragem?", "Vad är skillnaden mellan kraftfoder och grovfoder?", "Чем корм отличается от грубого корма?", "Czym różni się pasza treściwa od objętościowej?", "농후사료와 조사료는 어떻게 다를까?"),
      tt("Comment se comporter quand deux cavaliers se croisent ?", "How should riders behave when they pass each other?", "¿Cómo comportarse cuando dos jinetes se cruzan?", "Come comportarsi quando due cavalieri si incrociano?", "2人の乗り手がすれちがうとき、どうすればいい？", "Wie verhält man sich, wenn sich zwei Reiter begegnen?", "كيف أتصرّف عندما يتقاطع فارسان؟", "两位骑手相遇时该怎么做？", "Hoe gedraag je je als twee ruiters elkaar kruisen?", "Como se comportar quando dois cavaleiros se cruzam?", "Hur beter man sig när två ryttare möts?", "Как вести себя, когда два всадника встречаются?", "Jak się zachować, gdy mijają się dwaj jeźdźcy?", "두 기수가 마주치면 어떻게 해야 할까?"),
      tt("Pourquoi faut-il respecter les consignes propres à chaque club ?", "Why should you follow each club's own rules?", "¿Por qué hay que respetar las normas de cada club?", "Perché bisogna rispettare le regole proprie di ogni club?", "クラブごとのルールを守るのはなぜ？", "Warum muss man die Regeln jedes Vereins einhalten?", "لماذا يجب احترام تعليمات كل نادٍ؟", "为什么要遵守每个俱乐部自己的规定？", "Waarom moet je de regels van elke club respecteren?", "Por que é preciso respeitar as regras de cada clube?", "Varför ska man följa varje klubbs egna regler?", "Почему нужно соблюдать правила каждого клуба?", "Dlaczego trzeba przestrzegać zasad każdego klubu?", "왜 클럽마다 정한 규칙을 지켜야 할까?")
    ],
    chap: [
      [tt("Comprendre ses lieux de vie", "Understanding where it lives", "Entender sus lugares de vida", "Capire i suoi luoghi di vita", "暮らす場所を知る", "Seine Lebensräume verstehen", "فهم أماكن عيشه", "了解它的居住环境", "Zijn leefplekken begrijpen", "Entender seus locais de vida", "Förstå var hästen bor", "Понять, где живёт лошадь", "Zrozumieć miejsca jego życia", "생활 공간 이해하기"), 3],
      [tt("Nourrir et partager l'espace", "Feeding and sharing space", "Alimentar y compartir el espacio", "Nutrire e condividere lo spazio", "えさやりと場所の共有", "Füttern und Raum teilen", "الإطعام وتقاسم المكان", "喂养与共享空间", "Voeren en ruimte delen", "Alimentar e partilhar o espaço", "Utfodra och dela utrymmet", "Кормить и делить пространство", "Karmienie i dzielenie przestrzeni", "먹이 주기와 공간 나누기"), 4]
    ]
  }
});

/* v6 — 31/10 22h : PAGES DE FIN HARMONISÉES (validé par Blandine : 5 questions Hey Baby, 5 phrases de synthèse, défi en 3 points,
   1 phrase de fin). hbGarder = questions gardées (index) ; hbPlus / synthPlus = ajout ; synthRemplace = 5 phrases ; defiRemplace = défi court
   (la consigne d'origine reste dans le cours quand elle y figure). repartir (g1-c19) = « Pour finir » réparti dans les chapitres. 14 langues. */
(function () {
var D = function (id, o) { COMPL[id] = Object.assign(COMPL[id] || {}, o); };
D("g1-c3", {
  hbGarder: [0, 1, 3, 4, 7],
  synthRemplace: [
    tt("Le cheval est un animal social, qui a besoin de ses congénères.", "The horse is a social animal that needs other horses.", "El caballo es un animal social que necesita a sus congéneres.", "Il cavallo è un animale sociale che ha bisogno dei suoi simili.", "馬は仲間を必要とする社会的な動物。", "Das Pferd ist ein soziales Tier, das Artgenossen braucht.", "الحصان حيوان اجتماعي يحتاج إلى أقرانه.", "马是需要同伴的群居动物。", "Het paard is een sociaal dier dat soortgenoten nodig heeft.", "O cavalo é um animal social que precisa de seus semelhantes.", "Hästen är ett socialt djur som behöver andra hästar.", "Лошадь — социальное животное, ей нужны сородичи.", "Koń to zwierzę stadne, które potrzebuje towarzystwa.", "말은 동료가 필요한 사회적 동물이다."),
    tt("Il doit pouvoir se déplacer régulièrement.", "It must be able to move around regularly.", "Debe poder moverse con regularidad.", "Deve potersi muovere regolarmente.", "毎日しっかり動けることが必要。", "Es muss sich regelmäßig bewegen können.", "يجب أن يتمكن من الحركة بانتظام.", "它必须能经常活动。", "Het moet regelmatig kunnen bewegen.", "Ele precisa poder se movimentar regularmente.", "Den måste kunna röra sig regelbundet.", "Ей нужно регулярно двигаться.", "Musi mieć możliwość regularnego ruchu.", "규칙적으로 움직일 수 있어야 한다."),
    tt("Il mange surtout des fibres et boit une eau propre.", "It mainly eats fibre and drinks clean water.", "Come sobre todo fibra y bebe agua limpia.", "Mangia soprattutto fibre e beve acqua pulita.", "おもに繊維質を食べ、きれいな水を飲む。", "Es frisst vor allem Raufutter und trinkt sauberes Wasser.", "يأكل الألياف أساسًا ويشرب ماءً نظيفًا.", "它主要吃纤维饲料，喝干净的水。", "Het eet vooral vezels en drinkt schoon water.", "Come sobretudo fibras e bebe água limpa.", "Den äter mest fibrer och dricker rent vatten.", "Она ест в основном грубый корм и пьёт чистую воду.", "Je głównie włókno i pije czystą wodę.", "주로 섬유질을 먹고 깨끗한 물을 마신다."),
    tt("Son box reste propre, sec et sécurisé.", "Its stable stays clean, dry and safe.", "Su box se mantiene limpio, seco y seguro.", "Il suo box resta pulito, asciutto e sicuro.", "馬房は清潔で乾いていて安全に。", "Seine Box bleibt sauber, trocken und sicher.", "يبقى إسطبله نظيفًا وجافًا وآمنًا.", "它的马厩保持干净、干燥、安全。", "Zijn box blijft schoon, droog en veilig.", "Sua baia fica limpa, seca e segura.", "Boxen hålls ren, torr och säker.", "Денник остаётся чистым, сухим и безопасным.", "Boks pozostaje czysty, suchy i bezpieczny.", "마방은 깨끗하고 마르고 안전하게 유지한다."),
    tt("Tout changement inquiétant doit être signalé.", "Any worrying change must be reported.", "Cualquier cambio preocupante debe comunicarse.", "Ogni cambiamento preoccupante va segnalato.", "気になる変化はすぐに知らせる。", "Jede besorgniserregende Veränderung wird gemeldet.", "يجب الإبلاغ عن أي تغيّر مقلق.", "任何令人担心的变化都要报告。", "Elke zorgwekkende verandering wordt gemeld.", "Qualquer mudança preocupante deve ser comunicada.", "Varje oroande förändring ska rapporteras.", "О любом тревожном изменении нужно сообщить.", "Każdą niepokojącą zmianę trzeba zgłosić.", "걱정되는 변화는 반드시 알린다.")
  ],
  defiRemplace: { points: [
    tt("Vérifie l'eau, le fourrage et la litière.", "Check the water, the forage and the bedding.", "Comprueba el agua, el forraje y la cama.", "Controlla l'acqua, il foraggio e la lettiera.", "水、干し草、寝わらを確かめよう。", "Prüfe Wasser, Raufutter und Einstreu.", "تحقّق من الماء والعلف والفرشة.", "检查饮水、草料和垫料。", "Controleer het water, het ruwvoer en het strooisel.", "Verifique a água, a forragem e a cama.", "Kontrollera vattnet, grovfodret och strön.", "Проверь воду, сено и подстилку.", "Sprawdź wodę, paszę objętościową i ściółkę.", "물, 건초, 깔짚을 확인하자."),
    tt("Vérifie la sécurité du box ou du paddock et la présence d'autres chevaux.", "Check the safety of the stable or paddock and whether other horses are nearby.", "Comprueba la seguridad del box o del paddock y la presencia de otros caballos.", "Controlla la sicurezza del box o del paddock e la presenza di altri cavalli.", "馬房やパドックの安全と、ほかの馬がいるかを確かめよう。", "Prüfe die Sicherheit von Box oder Paddock und ob andere Pferde da sind.", "تحقّق من أمان الإسطبل أو الحظيرة ووجود خيول أخرى.", "检查马厩或围场是否安全，以及是否有其他马。", "Controleer de veiligheid van box of paddock en of er andere paarden zijn.", "Verifique a segurança da baia ou do piquete e a presença de outros cavalos.", "Kontrollera att boxen eller hagen är säker och att andra hästar finns nära.", "Проверь безопасность денника или левады и есть ли рядом другие лошади.", "Sprawdź bezpieczeństwo boksu lub padoku i obecność innych koni.", "마방이나 패독이 안전한지, 다른 말이 함께 있는지 확인하자."),
    tt("Observe si le cheval paraît calme et confortable.", "See whether the horse seems calm and comfortable.", "Observa si el caballo parece tranquilo y cómodo.", "Osserva se il cavallo sembra calmo e a suo agio.", "馬が落ち着いて快適そうか観察しよう。", "Beobachte, ob das Pferd ruhig und zufrieden wirkt.", "لاحظ ما إذا كان الحصان هادئًا ومرتاحًا.", "观察马是否显得平静、舒适。", "Kijk of het paard rustig en op zijn gemak lijkt.", "Observe se o cavalo parece calmo e confortável.", "Se om hästen verkar lugn och bekväm.", "Посмотри, спокойна ли лошадь и удобно ли ей.", "Obserwuj, czy koń wydaje się spokojny i zadowolony.", "말이 차분하고 편안해 보이는지 관찰하자.")
  ] }
});
D("g1-c4", {
  hbGarder: [0, 1, 3, 4, 5],
  synthRemplace: [
    tt("Le pas : quatre temps, sans suspension.", "Walk: four beats, no suspension.", "El paso: cuatro tiempos, sin suspensión.", "Il passo: quattro tempi, senza sospensione.", "常歩：4拍子で、浮く瞬間はない。", "Schritt: Viertakt, ohne Schwebephase.", "الخطو: أربع إيقاعات، دون طيران.", "慢步：四拍，没有腾空。", "Stap: vierslag, zonder zweefmoment.", "O passo: quatro tempos, sem suspensão.", "Skritt: fyrtakt, utan svävningsfas.", "Шаг: четыре такта, без безопорной фазы.", "Stęp: cztery takty, bez fazy zawieszenia.", "평보: 4박자, 공중에 뜨는 순간이 없다."),
    tt("Le trot : deux temps, par bipèdes diagonaux.", "Trot: two beats, by diagonal pairs.", "El trote: dos tiempos, por bípedos diagonales.", "Il trotto: due tempi, per bipedi diagonali.", "速歩：2拍子、斜め対角の脚が一緒に動く。", "Trab: Zweitakt, in diagonalen Beinpaaren.", "الخبب: إيقاعان، بأزواج قطرية.", "快步：两拍，对角线两肢一起。", "Draf: tweeslag, per diagonaal benenpaar.", "O trote: dois tempos, por bípedes diagonais.", "Trav: tvåtakt, med diagonala benpar.", "Рысь: два такта, диагональными парами ног.", "Kłus: dwa takty, parami przekątnymi.", "속보: 2박자, 대각선 다리가 함께 움직인다."),
    tt("Le galop : trois temps, puis une suspension.", "Canter: three beats, then a moment of suspension.", "El galope: tres tiempos y luego una suspensión.", "Il galoppo: tre tempi, poi una sospensione.", "駈歩：3拍子のあとに浮く瞬間。", "Galopp: Dreitakt, dann eine Schwebephase.", "العدو: ثلاث إيقاعات ثم طيران.", "跑步：三拍，然后腾空。", "Galop: drieslag, daarna een zweefmoment.", "O galope: três tempos, depois uma suspensão.", "Galopp: tretakt, sedan en svävningsfas.", "Галоп: три такта, затем безопорная фаза.", "Galop: trzy takty, potem zawieszenie.", "구보: 3박자 후 공중에 뜨는 순간."),
    tt("La régularité compte plus que la vitesse.", "Regularity matters more than speed.", "La regularidad cuenta más que la velocidad.", "La regolarità conta più della velocità.", "速さよりリズムの一定さが大切。", "Gleichmäßigkeit zählt mehr als Tempo.", "الانتظام أهم من السرعة.", "规律比速度更重要。", "Regelmaat telt meer dan snelheid.", "A regularidade importa mais que a velocidade.", "Jämnhet är viktigare än fart.", "Ровность важнее скорости.", "Regularność liczy się bardziej niż szybkość.", "속도보다 일정함이 중요하다."),
    tt("Ton corps suit le rythme de chaque allure.", "Your body follows the rhythm of each gait.", "Tu cuerpo sigue el ritmo de cada aire.", "Il tuo corpo segue il ritmo di ogni andatura.", "からだはそれぞれの歩法のリズムについていく。", "Dein Körper folgt dem Rhythmus jeder Gangart.", "جسمك يتبع إيقاع كل مشية.", "你的身体跟随每种步法的节奏。", "Je lichaam volgt het ritme van elke gang.", "Seu corpo segue o ritmo de cada andamento.", "Kroppen följer rytmen i varje gångart.", "Тело следует ритму каждого аллюра.", "Ciało podąża za rytmem każdego chodu.", "몸은 각 보법의 리듬을 따라간다.")
  ],
  defiRemplace: {
    titre: tt("Écoute les allures", "Listen to the gaits", "Escucha los aires", "Ascolta le andature", "歩法を聞きわけよう", "Hör auf die Gangarten", "استمع إلى المشيات", "聆听步法", "Luister naar de gangen", "Escute os andamentos", "Lyssna på gångarterna", "Слушай аллюры", "Posłuchaj chodów", "보법에 귀 기울이기"),
    accroche: tt("Avec ton enseignant, depuis un endroit sécurisé, regarde un cheval passer aux différentes allures.", "With your instructor, from a safe spot, watch a horse go through the different gaits.", "Con tu profesor, desde un lugar seguro, mira a un caballo pasar por los distintos aires.", "Con il tuo istruttore, da un punto sicuro, guarda un cavallo passare alle diverse andature.", "先生といっしょに安全な場所から、馬がいろいろな歩法で通るのを見よう。", "Sieh mit deinem Reitlehrer von einem sicheren Platz aus zu, wie ein Pferd die verschiedenen Gangarten geht.", "مع مدرّبك، ومن مكان آمن، شاهد حصانًا يمرّ بالمشيات المختلفة.", "和教练一起，在安全的地方看一匹马以不同步法经过。", "Kijk met je instructeur vanaf een veilige plek hoe een paard de verschillende gangen loopt.", "Com seu instrutor, de um lugar seguro, observe um cavalo passar pelos diferentes andamentos.", "Titta med din instruktör från en säker plats på en häst i de olika gångarterna.", "Вместе с тренером, с безопасного места, понаблюдай за лошадью на разных аллюрах.", "Z instruktorem, z bezpiecznego miejsca, obserwuj konia w różnych chodach.", "선생님과 함께 안전한 곳에서 말이 여러 보법으로 지나가는 모습을 보자."),
    points: [
      tt("Regarde le cheval passer au pas, au trot puis au galop.", "Watch the horse go by at walk, trot and then canter.", "Mira al caballo pasar al paso, al trote y luego al galope.", "Guarda il cavallo passare al passo, al trotto e poi al galoppo.", "馬が常歩、速歩、駈歩で通るのを見よう。", "Sieh das Pferd im Schritt, im Trab und dann im Galopp vorbeikommen.", "شاهد الحصان يمرّ بالخطو ثم الخبب ثم العدو.", "看马依次以慢步、快步、跑步经过。", "Kijk hoe het paard in stap, draf en daarna galop voorbijkomt.", "Veja o cavalo passar ao passo, ao trote e depois ao galope.", "Titta på hästen i skritt, trav och sedan galopp.", "Посмотри, как лошадь идёт шагом, рысью, затем галопом.", "Patrz, jak koń przechodzi stępem, kłusem, a potem galopem.", "말이 평보, 속보, 구보로 지나가는 모습을 보자."),
      tt("Écoute le bruit des sabots à chaque allure.", "Listen to the sound of the hooves at each gait.", "Escucha el ruido de los cascos en cada aire.", "Ascolta il rumore degli zoccoli a ogni andatura.", "それぞれの歩法でひづめの音を聞こう。", "Hör auf das Hufgeräusch bei jeder Gangart.", "استمع إلى وقع الحوافر في كل مشية.", "听每种步法下马蹄的声音。", "Luister naar het geluid van de hoeven bij elke gang.", "Escute o som dos cascos em cada andamento.", "Lyssna på hovarnas ljud i varje gångart.", "Послушай звук копыт на каждом аллюре.", "Słuchaj odgłosu kopyt w każdym chodzie.", "보법마다 발굽 소리를 들어 보자."),
      tt("Compte les temps et dis à ton enseignant quelle allure tu reconnais.", "Count the beats and tell your instructor which gait you recognise.", "Cuenta los tiempos y di a tu profesor qué aire reconoces.", "Conta i tempi e di' al tuo istruttore quale andatura riconosci.", "拍子を数えて、どの歩法かを先生に伝えよう。", "Zähle die Takte und sag deinem Reitlehrer, welche Gangart du erkennst.", "عُدّ الإيقاعات وقل لمدرّبك أي مشية تعرّفت عليها.", "数一数节拍，告诉教练你认出了哪种步法。", "Tel de slagen en zeg je instructeur welke gang je herkent.", "Conte os tempos e diga ao seu instrutor qual andamento reconhece.", "Räkna takterna och säg till din instruktör vilken gångart du känner igen.", "Посчитай такты и скажи тренеру, какой аллюр ты узнал.", "Policz takty i powiedz instruktorowi, jaki chód rozpoznajesz.", "박자를 세고 어떤 보법인지 선생님께 말하자.")
    ]
  }
});
D("g1-c5", { defiRemplace: {
  accroche: tt("Pendant ton prochain cours, fais vérifier ton alignement au trot.", "During your next lesson, have your alignment checked at the trot.", "En tu próxima clase, haz que revisen tu alineación al trote.", "Alla prossima lezione, fai controllare il tuo allineamento al trotto.", "次のレッスンで、速歩のときの姿勢をチェックしてもらおう。", "Lass in deiner nächsten Stunde deine Ausrichtung im Trab prüfen.", "في حصتك القادمة، اطلب التحقق من استقامة وضعيتك في الخبب.", "下节课上，请人检查你快步时的身体对齐。", "Laat in je volgende les je houding in draf controleren.", "Na próxima aula, peça para verificarem seu alinhamento no trote.", "Låt någon kontrollera din linje i trav under nästa lektion.", "На следующем занятии попроси проверить твою посадку на рыси.", "Na następnej lekcji poproś o sprawdzenie twojej linii w kłusie.", "다음 수업에서 속보할 때 몸의 정렬을 확인받자."),
  points: [
    tt("Demande à quelqu'un de t'observer lors d'un passage au trot.", "Ask someone to watch you as you trot past.", "Pide a alguien que te observe al pasar al trote.", "Chiedi a qualcuno di osservarti durante un passaggio al trotto.", "速歩で通るところを、だれかに見てもらおう。", "Bitte jemanden, dich beim Vorbeitraben zu beobachten.", "اطلب من أحدٍ أن يراقبك أثناء مرورك بالخبب.", "请人在你快步经过时观察你。", "Vraag iemand je te bekijken als je in draf voorbijkomt.", "Peça a alguém para te observar numa passagem ao trote.", "Be någon titta på dig när du travar förbi.", "Попроси кого-нибудь понаблюдать за тобой на рыси.", "Poproś kogoś, by obserwował cię podczas przejazdu kłusem.", "속보로 지나갈 때 누군가에게 봐 달라고 하자."),
    tt("Vérifie l'alignement oreille – épaule – hanche – talon.", "Check the ear – shoulder – hip – heel line.", "Comprueba la alineación oreja – hombro – cadera – talón.", "Verifica l'allineamento orecchio – spalla – anca – tallone.", "耳・肩・腰・かかとが一直線か確かめよう。", "Prüfe die Linie Ohr – Schulter – Hüfte – Ferse.", "تحقّق من استقامة الأذن – الكتف – الورك – الكعب.", "检查耳朵—肩膀—髋部—脚跟是否成一直线。", "Controleer de lijn oor – schouder – heup – hiel.", "Verifique o alinhamento orelha – ombro – quadril – calcanhar.", "Kontrollera linjen öra – axel – höft – häl.", "Проверь линию ухо – плечо – бедро – пятка.", "Sprawdź linię ucho – bark – biodro – pięta.", "귀–어깨–엉덩이–뒤꿈치가 일직선인지 확인하자."),
    tt("Corrige ta position et refais un passage.", "Correct your position and go past again.", "Corrige tu posición y vuelve a pasar.", "Correggi la posizione e ripassa.", "姿勢を直して、もう一度通ろう。", "Korrigiere deine Haltung und reite noch einmal vorbei.", "صحّح وضعيتك وأعد المرور.", "调整姿势，再经过一次。", "Verbeter je houding en kom nog eens voorbij.", "Corrija sua posição e passe de novo.", "Rätta till sitsen och rid förbi igen.", "Поправь посадку и проедь ещё раз.", "Popraw dosiad i przejedź jeszcze raz.", "자세를 고치고 다시 지나가 보자.")
  ] } });
D("g1-c6", { defiRemplace: {
  accroche: tt("Essaie d'identifier une seule chose que ton cheval exprime avec ses oreilles pendant ta séance.", "Try to identify just one thing your horse expresses with its ears during your session.", "Intenta identificar una sola cosa que tu caballo expresa con las orejas durante tu sesión.", "Prova a individuare una sola cosa che il tuo cavallo esprime con le orecchie durante la sessione.", "レッスン中に、馬が耳で伝えていることをひとつだけ見つけてみよう。", "Versuche, während deiner Stunde eine einzige Sache zu erkennen, die dein Pferd mit den Ohren ausdrückt.", "حاول أن تتعرّف على شيء واحد يعبّر عنه حصانك بأذنيه أثناء حصتك.", "试着在课上找出你的马用耳朵表达的一件事。", "Probeer tijdens je les één ding te herkennen dat je paard met zijn oren uitdrukt.", "Tente identificar uma única coisa que seu cavalo expressa com as orelhas durante a aula.", "Försök känna igen en enda sak som hästen uttrycker med öronen under passet.", "Попробуй заметить одну вещь, которую лошадь выражает ушами во время занятия.", "Spróbuj rozpoznać jedną rzecz, którą koń wyraża uszami podczas jazdy.", "수업 중 말이 귀로 표현하는 것 하나를 찾아보자."),
  points: [
    tt("Pendant la séance, observe régulièrement ses oreilles.", "During the session, keep an eye on its ears.", "Durante la sesión, observa sus orejas con regularidad.", "Durante la sessione, osserva spesso le sue orecchie.", "レッスン中、ときどき耳を観察しよう。", "Beobachte während der Stunde immer wieder seine Ohren.", "أثناء الحصة، راقب أذنيه بانتظام.", "上课时经常留意它的耳朵。", "Kijk tijdens de les regelmatig naar zijn oren.", "Durante a aula, observe as orelhas dele com frequência.", "Titta regelbundet på öronen under passet.", "Во время занятия регулярно смотри на её уши.", "Podczas jazdy regularnie obserwuj jego uszy.", "수업 중 귀를 자주 살펴보자."),
    tt("Repère une seule chose qu'elles expriment, en tenant compte de tout son corps.", "Spot one thing they express, taking its whole body into account.", "Detecta una sola cosa que expresan, teniendo en cuenta todo su cuerpo.", "Individua una sola cosa che esprimono, tenendo conto di tutto il corpo.", "体全体も見ながら、耳が伝えていることをひとつ見つけよう。", "Erkenne eine Sache, die sie ausdrücken, und achte dabei auf den ganzen Körper.", "حدّد شيئًا واحدًا تعبّر عنه، مع مراعاة جسمه كله.", "结合它整个身体，找出耳朵表达的一件事。", "Herken één ding dat ze uitdrukken, en let daarbij op zijn hele lichaam.", "Identifique uma coisa que elas expressam, levando em conta o corpo todo.", "Hitta en sak som de uttrycker och titta samtidigt på hela kroppen.", "Заметь одно, что они выражают, учитывая всё тело лошади.", "Wskaż jedną rzecz, którą wyrażają, biorąc pod uwagę całe ciało.", "몸 전체도 함께 보며 귀가 표현하는 것 하나를 찾자."),
    tt("Raconte à ton enseignant ce que tu as remarqué.", "Tell your instructor what you noticed.", "Cuenta a tu profesor lo que has notado.", "Racconta al tuo istruttore cosa hai notato.", "気づいたことを先生に話そう。", "Erzähl deinem Reitlehrer, was dir aufgefallen ist.", "أخبر مدرّبك بما لاحظته.", "把你注意到的告诉教练。", "Vertel je instructeur wat je hebt opgemerkt.", "Conte ao seu instrutor o que percebeu.", "Berätta för din instruktör vad du märkte.", "Расскажи тренеру, что ты заметил.", "Opowiedz instruktorowi, co zauważyłeś.", "알아챈 것을 선생님께 이야기하자.")
  ] } });
D("g1-c10", { defiRemplace: {
  accroche: tt("Au club, demande à ton moniteur de vérifier ton nœud d'attache.", "At the club, ask your instructor to check your tying knot.", "En el club, pide a tu monitor que revise tu nudo de atar.", "Al club, chiedi al tuo istruttore di controllare il tuo nodo.", "クラブで、つなぎ方の結び目を先生に確かめてもらおう。", "Bitte im Verein deinen Reitlehrer, deinen Anbindeknoten zu prüfen.", "في النادي، اطلب من مدرّبك التحقق من عقدة الربط.", "在俱乐部，请教练检查你的拴马结。", "Vraag op de club je instructeur je vastzetknoop te controleren.", "No clube, peça ao seu instrutor para verificar seu nó de amarração.", "Be din instruktör på klubben kontrollera din uppbindningsknut.", "В клубе попроси тренера проверить твой узел привязи.", "W klubie poproś instruktora o sprawdzenie węzła.", "클럽에서 선생님께 묶는 매듭을 확인해 달라고 하자."),
  sous: tt("Savoir transmettre une règle de sécurité, c'est aussi ça, devenir un cavalier responsable.", "Being able to pass on a safety rule is also part of becoming a responsible rider.", "Saber transmitir una norma de seguridad también es convertirse en un jinete responsable.", "Saper trasmettere una regola di sicurezza fa parte del diventare un cavaliere responsabile.", "安全のルールを人に伝えられることも、責任ある乗り手になるということ。", "Eine Sicherheitsregel weitergeben zu können, gehört auch dazu, ein verantwortungsvoller Reiter zu werden.", "أن تعرف كيف تنقل قاعدة أمان، هذا أيضًا جزء من أن تصبح فارسًا مسؤولًا.", "能把安全规则教给别人，也是成为负责任骑手的一部分。", "Een veiligheidsregel kunnen doorgeven hoort er ook bij als je een verantwoordelijke ruiter wordt.", "Saber transmitir uma regra de segurança também faz parte de se tornar um cavaleiro responsável.", "Att kunna lära ut en säkerhetsregel är också en del av att bli en ansvarsfull ryttare.", "Умение передать правило безопасности — тоже часть того, чтобы стать ответственным всадником.", "Umiejętność przekazania zasady bezpieczeństwa to też część stawania się odpowiedzialnym jeźdźcem.", "안전 규칙을 다른 사람에게 전할 수 있는 것도 책임 있는 기수가 되는 일이다."),
  points: [
    tt("Fais ton nœud d'attache sous le regard de ton moniteur.", "Tie your knot while your instructor watches.", "Haz tu nudo bajo la mirada de tu monitor.", "Fai il nodo sotto lo sguardo del tuo istruttore.", "先生が見ている前で結んでみよう。", "Mach deinen Knoten unter den Augen deines Reitlehrers.", "اصنع عقدة الربط تحت نظر مدرّبك.", "在教练注视下打拴马结。", "Leg je knoop terwijl je instructeur kijkt.", "Faça seu nó sob o olhar do seu instrutor.", "Gör knuten medan din instruktör tittar.", "Завяжи узел под присмотром тренера.", "Zawiąż węzeł pod okiem instruktora.", "선생님이 보는 앞에서 매듭을 묶자."),
    tt("Fais-le vérifier avant de t'éloigner du cheval.", "Have it checked before you move away from the horse.", "Haz que lo revisen antes de alejarte del caballo.", "Fallo controllare prima di allontanarti dal cavallo.", "馬からはなれる前に確かめてもらおう。", "Lass ihn prüfen, bevor du dich vom Pferd entfernst.", "اطلب التحقق منها قبل أن تبتعد عن الحصان.", "离开马之前先让人检查。", "Laat hem controleren voordat je bij het paard weggaat.", "Peça para verificarem antes de se afastar do cavalo.", "Låt någon kontrollera den innan du går från hästen.", "Пусть его проверят, прежде чем ты отойдёшь от лошади.", "Daj go sprawdzić, zanim odejdziesz od konia.", "말에게서 떨어지기 전에 확인받자."),
    tt("Explique la méthode à un autre cavalier.", "Explain the method to another rider.", "Explica el método a otro jinete.", "Spiega il metodo a un altro cavaliere.", "結び方をほかの乗り手に説明しよう。", "Erkläre die Methode einem anderen Reiter.", "اشرح الطريقة لفارس آخر.", "把方法讲给另一位骑手听。", "Leg de methode uit aan een andere ruiter.", "Explique o método a outro cavaleiro.", "Förklara metoden för en annan ryttare.", "Объясни способ другому всаднику.", "Wyjaśnij metodę innemu jeźdźcowi.", "다른 기수에게 방법을 설명하자.")
  ] } });
D("g1-c11", { defiRemplace: {
  accroche: tt("Le réflexe digital : apprends à retrouver ta licence en moins de 30 secondes.", "The digital reflex: learn to find your licence in under 30 seconds.", "El reflejo digital: aprende a encontrar tu licencia en menos de 30 segundos.", "Il riflesso digitale: impara a ritrovare la tua licenza in meno di 30 secondi.", "デジタルの習慣：30秒以内にライセンスを出せるようにしよう。", "Der digitale Reflex: Finde deine Lizenz in weniger als 30 Sekunden.", "الردّ الرقمي: تعلّم أن تجد رخصتك في أقل من 30 ثانية.", "数字小习惯：学会在30秒内找到你的执照。", "De digitale reflex: vind je licentie binnen 30 seconden.", "O reflexo digital: aprenda a encontrar sua licença em menos de 30 segundos.", "Den digitala reflexen: hitta din licens på under 30 sekunder.", "Цифровой рефлекс: научись находить свою лицензию меньше чем за 30 секунд.", "Cyfrowy odruch: naucz się znajdować licencję w mniej niż 30 sekund.", "디지털 습관: 30초 안에 라이선스를 찾는 법을 익히자."),
  sous: tt("En cas de contrôle en concours ou de besoin administratif au club, tu seras toujours prêt et efficace !", "If there's a check at a competition or paperwork at the club, you'll always be ready and efficient!", "En caso de control en un concurso o de trámite en el club, ¡siempre estarás listo y serás eficaz!", "In caso di controllo in gara o di necessità amministrativa al club, sarai sempre pronto ed efficiente!", "大会でのチェックやクラブでの手続きのときも、いつでもすぐに対応できる！", "Bei einer Kontrolle auf dem Turnier oder für Formalitäten im Verein bist du immer bereit und schnell!", "عند أي تفتيش في مسابقة أو حاجة إدارية في النادي، ستكون دائمًا جاهزًا وفعّالًا!", "无论是比赛检查还是俱乐部的手续，你都能随时准备好、快速应对！", "Bij een controle op een wedstrijd of voor formaliteiten op de club ben je altijd klaar en efficiënt!", "Em caso de controle numa competição ou de necessidade administrativa no clube, você estará sempre pronto e eficiente!", "Vid en kontroll på tävling eller något administrativt på klubben är du alltid redo och snabb!", "При проверке на соревнованиях или оформлении в клубе ты всегда будешь готов и быстр!", "Podczas kontroli na zawodach lub formalności w klubie zawsze będziesz gotowy i sprawny!", "대회에서 확인하거나 클럽에서 서류가 필요할 때도 언제나 빠르게 준비되어 있을 것이다!"),
  points: [
    tt("Installe l'application de la FFE indiquée par ton club et connecte-toi.", "Install the FFE app your club recommends and log in.", "Instala la aplicación de la FFE que te indique tu club e inicia sesión.", "Installa l'app della FFE indicata dal tuo club e accedi.", "クラブが教えてくれるFFEのアプリを入れて、ログインしよう。", "Installiere die FFE-App, die dein Verein empfiehlt, und melde dich an.", "ثبّت تطبيق الاتحاد الفرنسي الذي يشير إليه ناديك وسجّل الدخول.", "安装俱乐部推荐的 FFE 应用并登录。", "Installeer de FFE-app die je club aanraadt en log in.", "Instale o aplicativo da FFE indicado pelo seu clube e faça login.", "Installera FFE-appen som din klubb rekommenderar och logga in.", "Установи приложение FFE, которое советует клуб, и войди в него.", "Zainstaluj aplikację FFE wskazaną przez klub i zaloguj się.", "클럽이 알려 준 FFE 앱을 설치하고 로그인하자."),
    tt("Retrouve ton numéro de licence.", "Find your licence number.", "Encuentra tu número de licencia.", "Ritrova il tuo numero di licenza.", "ライセンス番号を見つけよう。", "Finde deine Lizenznummer.", "اعثر على رقم رخصتك.", "找到你的执照号码。", "Zoek je licentienummer op.", "Encontre seu número de licença.", "Hitta ditt licensnummer.", "Найди номер своей лицензии.", "Odszukaj swój numer licencji.", "라이선스 번호를 찾자."),
    tt("Retrouve sa date de fin de validité en moins de 30 secondes.", "Find its expiry date in under 30 seconds.", "Encuentra su fecha de fin de validez en menos de 30 segundos.", "Ritrova la data di scadenza in meno di 30 secondi.", "有効期限を30秒以内に見つけよう。", "Finde das Ablaufdatum in weniger als 30 Sekunden.", "اعثر على تاريخ انتهاء صلاحيتها في أقل من 30 ثانية.", "在30秒内找到它的有效期截止日期。", "Vind de vervaldatum binnen 30 seconden.", "Encontre a data de validade em menos de 30 segundos.", "Hitta slutdatumet på under 30 sekunder.", "Найди дату окончания действия меньше чем за 30 секунд.", "Znajdź datę ważności w mniej niż 30 sekund.", "유효 기간 종료일을 30초 안에 찾자.")
  ] } });
D("g1-c12", { defiRemplace: {
  accroche: tt("Le quiz des sites : rends-toi sur le site ffe.com.", "The website quiz: go to the ffe.com website.", "El quiz de las webs: entra en el sitio ffe.com.", "Il quiz dei siti: vai sul sito ffe.com.", "サイトクイズ：ffe.com のサイトを見てみよう。", "Das Website-Quiz: Geh auf die Seite ffe.com.", "مسابقة المواقع: ادخل إلى موقع ffe.com.", "网站小测验：访问 ffe.com 网站。", "De websitequiz: ga naar de site ffe.com.", "O quiz dos sites: acesse o site ffe.com.", "Webbquizet: gå in på ffe.com.", "Квиз по сайтам: зайди на сайт ffe.com.", "Quiz stron: wejdź na stronę ffe.com.", "사이트 퀴즈: ffe.com 사이트에 들어가 보자."),
  sous: tt("Réussir à naviguer rapidement sur leur site est la première preuve que tu t'impliques dans ton sport !", "Finding your way around their site quickly is the first sign that you're involved in your sport!", "¡Saber moverte rápido por su web es la primera prueba de que te implicas en tu deporte!", "Riuscire a navigare velocemente sul loro sito è la prima prova che ti impegni nel tuo sport!", "サイトをすばやく使いこなせることは、スポーツに真剣に取り組んでいる最初のしるし！", "Dich schnell auf ihrer Seite zurechtzufinden, ist der erste Beweis, dass du dich für deinen Sport engagierst!", "أن تتنقّل بسرعة في موقعهم هو أول دليل على اهتمامك برياضتك!", "能快速浏览他们的网站，是你投入这项运动的第一个证明！", "Snel je weg vinden op hun site is het eerste bewijs dat je betrokken bent bij je sport!", "Conseguir navegar rapidamente no site deles é a primeira prova de que você se envolve no seu esporte!", "Att snabbt hitta på deras webbplats är första beviset på att du engagerar dig i din sport!", "Быстро ориентироваться на их сайте — первое доказательство того, что ты увлечён своим спортом!", "Szybkie poruszanie się po ich stronie to pierwszy dowód, że angażujesz się w swój sport!", "그 사이트를 빠르게 둘러볼 수 있다면 네가 이 운동에 진심이라는 첫 증거다!"),
  points: [
    tt("Trouve la section dédiée aux Galops.", "Find the section about the Galops.", "Encuentra la sección dedicada a los Galops.", "Trova la sezione dedicata ai Galop.", "ギャロップのページを見つけよう。", "Finde den Bereich zu den Galops.", "اعثر على القسم المخصّص لمستويات الغالوب.", "找到关于 Galop 的栏目。", "Zoek de rubriek over de Galops.", "Encontre a seção dedicada aos Galops.", "Hitta avsnittet om Galops.", "Найди раздел, посвящённый Galops.", "Znajdź dział poświęcony Galopom.", "갤럽을 다루는 섹션을 찾자."),
    tt("Identifie les 3 grands domaines du programme du Galop 1.", "Identify the 3 main areas of the Galop 1 programme.", "Identifica los 3 grandes ámbitos del programa del Galop 1.", "Individua i 3 grandi ambiti del programma del Galop 1.", "ギャロップ1の内容の3つの大きな分野を見つけよう。", "Finde die 3 großen Bereiche des Galop-1-Programms.", "حدّد المجالات الثلاثة الكبرى لبرنامج الغالوب 1.", "找出 Galop 1 考试内容的三大领域。", "Zoek de 3 grote onderdelen van het programma van Galop 1.", "Identifique os 3 grandes domínios do programa do Galop 1.", "Hitta de 3 stora områdena i programmet för Galop 1.", "Найди 3 основные области программы Galop 1.", "Wskaż 3 główne obszary programu Galopu 1.", "갤럽 1 프로그램의 세 가지 큰 영역을 찾자."),
    tt("Vérifie que ce sont bien la pratique à cheval, les soins et les connaissances.", "Check that they are riding practice, horse care and knowledge.", "Comprueba que son la práctica a caballo, los cuidados y los conocimientos.", "Verifica che siano la pratica a cavallo, le cure e le conoscenze.", "それが乗馬の実技、世話、知識であることを確かめよう。", "Prüfe, ob es das Reiten, die Pflege und das Wissen sind.", "تحقّق من أنها الممارسة على الحصان والعناية والمعارف.", "确认它们是骑乘实践、照料和知识。", "Controleer of het de rijpraktijk, de verzorging en de kennis zijn.", "Confirme que são a prática a cavalo, os cuidados e os conhecimentos.", "Kontrollera att det är ridningen, skötseln och kunskaperna.", "Убедись, что это езда верхом, уход и знания.", "Sprawdź, czy to jazda konna, opieka i wiedza.", "그것이 승마 실기, 돌보기, 지식인지 확인하자.")
  ] } });
D("g1-c13", { defiRemplace: {
  accroche: tt("Le repérage des lieux : avant tes premiers championnats, entraîne-toi à te projeter.", "Scouting the site: before your first championships, practise picturing yourself there.", "Reconocer el lugar: antes de tus primeros campeonatos, entrénate a imaginarte allí.", "Il sopralluogo: prima dei tuoi primi campionati, allenati a immaginarti lì.", "下見：はじめての選手権の前に、その場にいる自分を想像してみよう。", "Ortserkundung: Stell dir vor deinen ersten Meisterschaften vor, wie es dort sein wird.", "استكشاف المكان: قبل بطولاتك الأولى، تدرّب على تخيّل نفسك هناك.", "熟悉场地：在你的第一次锦标赛之前，练习想象自己身处其中。", "Het terrein verkennen: oefen vóór je eerste kampioenschappen om je in te beelden dat je er bent.", "Reconhecimento do local: antes dos seus primeiros campeonatos, treine se imaginar lá.", "Rekognosering: öva på att föreställa dig platsen inför dina första mästerskap.", "Разведка места: перед первыми чемпионатами потренируйся представлять себя там.", "Rozpoznanie terenu: przed pierwszymi mistrzostwami wyobraź sobie, że tam jesteś.", "장소 미리 보기: 첫 선수권 전에 그곳에 있는 자신을 그려 보자."),
  sous: tt("Savoir s'orienter dans ce parc immense est un vrai signe de « cavalier averti » !", "Knowing your way around this huge park is a true sign of a « seasoned rider »!", "¡Saber orientarse en este parque inmenso es una verdadera señal de « jinete experto »!", "Sapersi orientare in questo parco immenso è un vero segno di « cavaliere esperto »!", "この広い場所で迷わず動けるのは、「頼れる乗り手」のしるし！", "Sich in diesem riesigen Park zurechtzufinden, ist ein echtes Zeichen für einen « erfahrenen Reiter »!", "أن تعرف كيف تتنقّل في هذا المتنزّه الضخم علامة حقيقية على « فارس متمرّس »!", "能在这座巨大的园区里认路，是“老练骑手”的真正标志！", "Je weg vinden in dit enorme park is een echt teken van een « ervaren ruiter »!", "Saber se orientar neste parque imenso é um verdadeiro sinal de « cavaleiro experiente »!", "Att hitta rätt i den här enorma parken är ett riktigt tecken på en « erfaren ryttare »!", "Умение ориентироваться в этом огромном парке — настоящий признак « опытного всадника »!", "Umiejętność orientacji w tym ogromnym parku to prawdziwy znak « doświadczonego jeźdźca »!", "이 거대한 공원에서 길을 찾을 줄 아는 것은 진짜 « 노련한 기수 »의 표시다!"),
  points: [
    tt("Ouvre le plan du site sur ffe.com ou dans l'application du Parc.", "Open the site map on ffe.com or in the Parc's app.", "Abre el plano del recinto en ffe.com o en la aplicación del Parque.", "Apri la mappa del sito su ffe.com o nell'app del Parco.", "ffe.com かパルクのアプリで場内の地図を開こう。", "Öffne den Lageplan auf ffe.com oder in der App des Parks.", "افتح خريطة الموقع على ffe.com أو في تطبيق المتنزّه.", "在 ffe.com 或园区应用里打开场地地图。", "Open de plattegrond op ffe.com of in de app van het Parc.", "Abra o mapa do local em ffe.com ou no aplicativo do Parque.", "Öppna kartan på ffe.com eller i parkens app.", "Открой план комплекса на ffe.com или в приложении Парка.", "Otwórz plan terenu na ffe.com lub w aplikacji Parku.", "ffe.com이나 공원 앱에서 시설 지도를 열자."),
    tt("Localise les différents types de carrières.", "Find the different types of arenas.", "Localiza los distintos tipos de pistas.", "Individua i diversi tipi di campi.", "いろいろな種類の馬場を探そう。", "Finde die verschiedenen Arten von Reitplätzen.", "حدّد أنواع الحلبات المختلفة.", "找到不同类型的场地。", "Zoek de verschillende soorten rijbanen.", "Localize os diferentes tipos de pistas.", "Hitta de olika sorternas ridbanor.", "Найди разные типы манежей и плацев.", "Odszukaj różne rodzaje placów.", "여러 종류의 마장을 찾아보자."),
    tt("Imagine ton itinéraire des écuries jusqu'à la piste de compétition.", "Picture your route from the stables to the competition arena.", "Imagina tu recorrido desde las cuadras hasta la pista de competición.", "Immagina il tuo percorso dalle scuderie al campo gara.", "厩舎から競技場までの道のりを想像しよう。", "Stell dir deinen Weg von den Ställen bis zum Turnierplatz vor.", "تخيّل طريقك من الإسطبلات إلى حلبة المنافسة.", "想象从马厩到比赛场地的路线。", "Stel je je route voor van de stallen naar de wedstrijdpiste.", "Imagine seu trajeto das cocheiras até a pista de competição.", "Föreställ dig vägen från stallet till tävlingsbanan.", "Представь свой путь от конюшен до соревновательного поля.", "Wyobraź sobie trasę od stajni do placu konkursowego.", "마구간에서 경기장까지 가는 길을 그려 보자.")
  ] } });
D("g1-c17", {
  hbPlus: [tt("Comment savoir si la sangle est assez serrée ?", "How do I know if the girth is tight enough?", "¿Cómo saber si la cincha está bien apretada?", "Come capire se il sottopancia è abbastanza stretto?", "腹帯が十分しまっているか、どうやってわかる？", "Woran erkenne ich, ob der Sattelgurt fest genug ist?", "كيف أعرف أن الحزام مشدود بما يكفي؟", "怎么知道肚带是否系得够紧？", "Hoe weet ik of de singel strak genoeg zit?", "Como saber se a barrigueira está apertada o suficiente?", "Hur vet jag om sadelgjorden är tillräckligt åtdragen?", "Как понять, что подпруга затянута достаточно?", "Skąd wiem, że popręg jest dość mocno zapięty?", "복대가 충분히 조여졌는지 어떻게 알 수 있을까?")],
  defiRemplace: { points: [
    tt("Avant de commencer, nomme chaque pièce du matériel.", "Before you start, name each piece of equipment.", "Antes de empezar, nombra cada pieza del material.", "Prima di iniziare, nomina ogni pezzo dell'attrezzatura.", "始める前に、道具の名前をひとつずつ言おう。", "Benenne vor dem Start jedes Ausrüstungsteil.", "قبل أن تبدأ، سمِّ كل قطعة من المعدات.", "开始前，说出每件马具的名称。", "Benoem voor je begint elk onderdeel van het materiaal.", "Antes de começar, nomeie cada peça do material.", "Namnge varje del av utrustningen innan du börjar.", "Перед началом назови каждый предмет снаряжения.", "Zanim zaczniesz, nazwij każdy element sprzętu.", "시작하기 전에 장비 이름을 하나씩 말하자."),
    tt("Pendant la préparation, annonce chaque étape à voix haute.", "While you tack up, say each step out loud.", "Durante la preparación, anuncia cada paso en voz alta.", "Durante la preparazione, annuncia ogni passaggio ad alta voce.", "準備しながら、手順をひとつずつ声に出そう。", "Sag beim Vorbereiten jeden Schritt laut an.", "أثناء التجهيز، أعلن كل خطوة بصوت عالٍ.", "准备时，大声说出每一步。", "Zeg tijdens het voorbereiden elke stap hardop.", "Durante a preparação, diga cada etapa em voz alta.", "Säg varje steg högt medan du gör i ordning.", "Во время подготовки называй вслух каждый шаг.", "Podczas przygotowania mów na głos każdy krok.", "준비하면서 단계마다 소리 내어 말하자."),
    tt("Termine en vérifiant tout avec ton enseignant.", "Finish by checking everything with your instructor.", "Termina revisándolo todo con tu profesor.", "Concludi controllando tutto con il tuo istruttore.", "最後に先生といっしょに全部確かめよう。", "Prüfe zum Schluss alles mit deinem Reitlehrer.", "اختم بالتحقق من كل شيء مع مدرّبك.", "最后和教练一起检查一遍。", "Sluit af door alles met je instructeur te controleren.", "Termine verificando tudo com seu instrutor.", "Avsluta med att kontrollera allt med din instruktör.", "В конце проверь всё вместе с тренером.", "Na koniec sprawdź wszystko z instruktorem.", "마지막으로 선생님과 함께 모두 확인하자.")
  ] }
});
D("g1-c18", {
  hbGarder: [0, 1, 2, 3, 4],
  defiRemplace: {
    accroche: tt("Avec ton enseignant, réalise un petit trajet à pied avec ton cheval.", "With your instructor, lead your horse along a short route on foot.", "Con tu profesor, haz un pequeño recorrido a pie con tu caballo.", "Con il tuo istruttore, fai un piccolo percorso a piedi con il tuo cavallo.", "先生といっしょに、馬を引いて短いコースを歩こう。", "Geh mit deinem Reitlehrer eine kurze Strecke mit deinem Pferd zu Fuß.", "مع مدرّبك، قُم بمسار قصير سيرًا مع حصانك.", "和教练一起，牵着马步行走一小段路线。", "Loop met je instructeur een kort traject te voet met je paard.", "Com seu instrutor, faça um pequeno trajeto a pé com seu cavalo.", "Gå en kort sträcka till fots med din häst tillsammans med instruktören.", "Вместе с тренером пройди с лошадью в поводу небольшой маршрут.", "Z instruktorem przejdź z koniem krótką trasę pieszo.", "선생님과 함께 말을 끌고 짧은 코스를 걸어 보자."),
    sous: tt("Essaie de garder ton cheval à côté de toi pendant tout le trajet, sans tirer continuellement sur la longe.", "Try to keep your horse beside you the whole way, without constantly pulling on the lead rope.", "Intenta mantener a tu caballo a tu lado durante todo el recorrido, sin tirar continuamente del ramal.", "Cerca di tenere il cavallo accanto a te per tutto il percorso, senza tirare continuamente la lunghina.", "引き綱をずっと引っぱらずに、コースのあいだ馬をとなりにいさせよう。", "Versuche, dein Pferd die ganze Strecke neben dir zu halten, ohne ständig am Strick zu ziehen.", "حاول أن تُبقي حصانك بجانبك طوال المسار دون شدّ الحبل باستمرار.", "整个过程中尽量让马走在你身边，不要一直拉牵绳。", "Probeer je paard het hele traject naast je te houden, zonder steeds aan het touw te trekken.", "Tente manter seu cavalo ao seu lado durante todo o trajeto, sem puxar a guia o tempo todo.", "Försök hålla hästen bredvid dig hela vägen utan att hela tiden dra i grimskaftet.", "Старайся держать лошадь рядом с собой весь путь, не дёргая постоянно чумбур.", "Staraj się trzymać konia obok siebie przez całą trasę, nie ciągnąc ciągle za uwiąz.", "코스 내내 리드로프를 계속 당기지 말고 말을 옆에 두도록 해 보자."),
    points: [
      tt("Pars au pas et fais une ligne droite.", "Set off at walk and go in a straight line.", "Sal al paso y haz una línea recta.", "Parti al passo e fai una linea retta.", "常歩で歩きだし、まっすぐ進もう。", "Geh im Schritt los und mach eine gerade Linie.", "انطلق بالخطو وامشِ في خط مستقيم.", "以慢步出发，走一条直线。", "Vertrek in stap en loop een rechte lijn.", "Saia ao passo e faça uma linha reta.", "Börja i skritt och gå en rak linje.", "Начни шагом и пройди по прямой.", "Ruszaj stępem i idź po prostej.", "평보로 출발해 직선으로 걷자."),
      tt("Prends un virage et passe entre deux repères.", "Take a turn and pass between two markers.", "Toma una curva y pasa entre dos marcas.", "Fai una curva e passa tra due riferimenti.", "曲がって、2つの目じるしの間を通ろう。", "Nimm eine Kurve und geh zwischen zwei Markierungen durch.", "انعطف ومرّ بين علامتين.", "转个弯，从两个标志之间穿过。", "Neem een bocht en ga tussen twee markeringen door.", "Faça uma curva e passe entre duas marcas.", "Ta en sväng och gå mellan två markeringar.", "Сделай поворот и пройди между двумя ориентирами.", "Skręć i przejdź między dwoma znacznikami.", "방향을 바꿔 두 표시 사이를 지나가자."),
      tt("Termine par un arrêt précis, ton cheval à côté de toi.", "Finish with a precise halt, your horse beside you.", "Termina con una parada precisa, tu caballo a tu lado.", "Concludi con un arresto preciso, il cavallo accanto a te.", "馬をとなりにして、ぴたりと止まって終わろう。", "Beende mit einem genauen Halt, dein Pferd neben dir.", "اختم بتوقّف دقيق وحصانك بجانبك.", "最后精准停下，马在你身边。", "Eindig met een nauwkeurige halt, je paard naast je.", "Termine com uma parada precisa, o cavalo ao seu lado.", "Avsluta med en exakt halt, hästen bredvid dig.", "Закончи точной остановкой, лошадь рядом с тобой.", "Zakończ dokładnym zatrzymaniem, z koniem obok siebie.", "말을 옆에 두고 정확하게 멈추며 끝내자.")
    ]
  }
});
D("g1-c19", {
  fusion: [],
  hbGarder: [0, 1, 4, 6, 7],
  repartir: { de: 5, savais: 1, erreurs: [[0, [0, 1, 2]], [1, [3, 4, 5, 6]], [2, [7, 8, 9]], [3, [10]], [4, [11, 12, 13, 14]]] },
  synthRemplace: [
    tt("J'attends l'autorisation de l'enseignant.", "I wait for the instructor's permission.", "Espero la autorización del profesor.", "Aspetto l'autorizzazione dell'istruttore.", "先生の許可を待つ。", "Ich warte auf die Erlaubnis des Reitlehrers.", "أنتظر إذن المدرّب.", "我等待教练的允许。", "Ik wacht op toestemming van de instructeur.", "Espero a autorização do instrutor.", "Jag väntar på instruktörens tillåtelse.", "Я жду разрешения тренера.", "Czekam na zgodę instruktora.", "선생님의 허락을 기다린다."),
    tt("Casque, selle et sangle sont vérifiés.", "Helmet, saddle and girth are checked.", "Casco, silla y cincha están revisados.", "Casco, sella e sottopancia sono controllati.", "ヘルメット、鞍、腹帯を確かめた。", "Helm, Sattel und Gurt sind geprüft.", "تمّ التحقق من الخوذة والسرج والحزام.", "头盔、马鞍和肚带都已检查。", "Cap, zadel en singel zijn gecontroleerd.", "Capacete, sela e barrigueira estão verificados.", "Hjälm, sadel och sadelgjord är kontrollerade.", "Шлем, седло и подпруга проверены.", "Kask, siodło i popręg są sprawdzone.", "헬멧, 안장, 복대를 확인했다."),
    tt("Je monte doucement, sans tirer ni toucher la croupe.", "I mount gently, without pulling or touching the croup.", "Monto con suavidad, sin tirar ni tocar la grupa.", "Monto con dolcezza, senza tirare né toccare la groppa.", "引っぱらず、尻にふれずに、そっと乗る。", "Ich steige sanft auf, ohne zu ziehen oder die Kruppe zu berühren.", "أركب بلطف دون شدّ ولا لمس الكفل.", "我轻轻上马，不拉扯，也不碰到马臀。", "Ik stijg zacht op, zonder te trekken of de croupe te raken.", "Monto com delicadeza, sem puxar nem tocar a garupa.", "Jag sitter upp mjukt, utan att dra eller nudda korset.", "Я сажусь мягко, не тяну и не задеваю круп.", "Wsiadam delikatnie, nie ciągnąc i nie dotykając zadu.", "당기지 않고 엉덩이를 건드리지 않게 부드럽게 오른다."),
    tt("Je sors les deux pieds des étriers pour descendre.", "I take both feet out of the stirrups to dismount.", "Saco los dos pies de los estribos para bajar.", "Tolgo entrambi i piedi dalle staffe per scendere.", "降りるときは両足をあぶみから抜く。", "Zum Absteigen nehme ich beide Füße aus den Bügeln.", "أُخرج قدميّ من الركابين للنزول.", "下马时两脚都退出马镫。", "Ik haal beide voeten uit de beugels om af te stijgen.", "Tiro os dois pés dos estribos para descer.", "Jag tar ur båda fötterna ur stigbyglarna för att sitta av.", "Чтобы спешиться, я вынимаю обе ноги из стремян.", "Wyjmuję obie stopy ze strzemion, żeby zsiąść.", "내릴 때는 두 발을 모두 등자에서 뺀다."),
    tt("Au sol, je garde le contrôle du cheval.", "On the ground, I keep control of the horse.", "En el suelo, mantengo el control del caballo.", "A terra, mantengo il controllo del cavallo.", "地面におりても馬をしっかり管理する。", "Am Boden behalte ich die Kontrolle über das Pferd.", "على الأرض، أحافظ على السيطرة على الحصان.", "落地后，我仍然控制住马。", "Op de grond houd ik controle over het paard.", "No chão, mantenho o controle do cavalo.", "På marken behåller jag kontrollen över hästen.", "На земле я продолжаю контролировать лошадь.", "Na ziemi nadal panuję nad koniem.", "땅에 내려서도 말을 잘 통제한다.")
  ],
  defiRemplace: {
    accroche: tt("Avec ton enseignant, annonce à voix haute chaque vérification.", "With your instructor, say each check out loud.", "Con tu profesor, anuncia en voz alta cada comprobación.", "Con il tuo istruttore, annuncia ad alta voce ogni controllo.", "先生といっしょに、確認することをひとつずつ声に出そう。", "Sag mit deinem Reitlehrer jede Kontrolle laut an.", "مع مدرّبك، أعلن كل تحقّق بصوت عالٍ.", "和教练一起，大声说出每一项检查。", "Zeg met je instructeur elke controle hardop.", "Com seu instrutor, diga em voz alta cada verificação.", "Säg varje kontroll högt tillsammans med din instruktör.", "Вместе с тренером проговаривай вслух каждую проверку.", "Z instruktorem mów na głos każde sprawdzenie.", "선생님과 함께 확인할 것을 하나씩 소리 내어 말하자."),
    points: [
      tt("Avant de monter, vérifie l'environnement (espace libre, endroit sûr), ton matériel (casque attaché, selle droite, sangle vérifiée, rênes organisées, étrier prêt) et attends l'autorisation de ton enseignant.", "Before mounting, check the surroundings (clear space, safe spot), your equipment (helmet fastened, saddle straight, girth checked, reins organised, stirrup ready) and wait for your instructor's permission.", "Antes de montar, comprueba el entorno (espacio libre, lugar seguro), tu material (casco abrochado, silla recta, cincha revisada, riendas ordenadas, estribo listo) y espera la autorización de tu profesor.", "Prima di montare, controlla l'ambiente (spazio libero, luogo sicuro), l'attrezzatura (casco allacciato, sella dritta, sottopancia controllato, redini in ordine, staffa pronta) e aspetta l'autorizzazione del tuo istruttore.", "乗る前に、まわり（あいた場所、安全な場所）、道具（ヘルメットの留め具、まっすぐな鞍、腹帯、整えた手綱、あぶみ）を確かめ、先生の許可を待とう。", "Prüfe vor dem Aufsteigen die Umgebung (freier Platz, sicherer Ort), deine Ausrüstung (Helm geschlossen, Sattel gerade, Gurt geprüft, Zügel sortiert, Bügel bereit) und warte auf die Erlaubnis deines Reitlehrers.", "قبل الركوب، تحقّق من المحيط (مكان فارغ وآمن) ومن معداتك (الخوذة مربوطة، السرج مستقيم، الحزام مفحوص، اللجام مرتّب، الركاب جاهز) وانتظر إذن مدرّبك.", "上马前，检查周围环境（空间空旷、地点安全）、你的装备（头盔系好、马鞍放正、肚带检查过、缰绳理好、马镫准备好），并等待教练允许。", "Controleer vóór het opstijgen de omgeving (vrije ruimte, veilige plek), je materiaal (cap vast, zadel recht, singel gecontroleerd, teugels geordend, beugel klaar) en wacht op toestemming van je instructeur.", "Antes de montar, verifique o ambiente (espaço livre, local seguro), seu material (capacete preso, sela reta, barrigueira verificada, rédeas organizadas, estribo pronto) e espere a autorização do seu instrutor.", "Kontrollera innan du sitter upp omgivningen (fri yta, säker plats), din utrustning (hjälmen fäst, sadeln rak, gjorden kontrollerad, tyglarna ordnade, stigbygeln redo) och vänta på instruktörens tillåtelse.", "Перед посадкой проверь обстановку (свободное и безопасное место), снаряжение (шлем застёгнут, седло ровно, подпруга проверена, поводья разобраны, стремя готово) и дождись разрешения тренера.", "Przed wsiadaniem sprawdź otoczenie (wolne, bezpieczne miejsce), sprzęt (kask zapięty, siodło prosto, popręg sprawdzony, wodze ułożone, strzemię gotowe) i poczekaj na zgodę instruktora.", "오르기 전에 주변(비어 있고 안전한 곳)과 장비(헬멧 고정, 안장 똑바로, 복대 확인, 고삐 정리, 등자 준비)를 확인하고 선생님의 허락을 기다리자."),
      tt("Explique les précautions pour monter : cheval calme et immobile, rênes tenues sans tirer sur la bouche, monter doucement sans tirer la selle ni toucher la croupe.", "Explain the precautions for mounting: calm, still horse, reins held without pulling on the mouth, mount gently without pulling the saddle or touching the croup.", "Explica las precauciones para montar: caballo tranquilo e inmóvil, riendas sin tirar de la boca, montar con suavidad sin tirar de la silla ni tocar la grupa.", "Spiega le precauzioni per montare: cavallo calmo e fermo, redini tenute senza tirare sulla bocca, montare con dolcezza senza tirare la sella né toccare la groppa.", "乗るときの注意を説明しよう：馬が落ち着いて止まっている、口を引っぱらずに手綱を持つ、鞍を引かず尻にふれずにそっと乗る。", "Erkläre die Vorsichtsmaßnahmen beim Aufsteigen: ruhiges, stehendes Pferd, Zügel halten, ohne am Maul zu ziehen, sanft aufsteigen, ohne am Sattel zu ziehen oder die Kruppe zu berühren.", "اشرح احتياطات الركوب: حصان هادئ وثابت، لجام بلا شدّ على الفم، ركوب بلطف دون شدّ السرج ولا لمس الكفل.", "说明上马的注意事项：马要平静站稳，握缰不拉马嘴，轻轻上马，不拉马鞍也不碰马臀。", "Leg de voorzorgen bij het opstijgen uit: rustig, stilstaand paard, teugels vasthouden zonder aan de mond te trekken, zacht opstijgen zonder aan het zadel te trekken of de croupe te raken.", "Explique os cuidados para montar: cavalo calmo e parado, rédeas sem puxar a boca, montar com delicadeza sem puxar a sela nem tocar a garupa.", "Förklara försiktighetsåtgärderna när du sitter upp: lugn och stillastående häst, tyglar utan att dra i munnen, sitt upp mjukt utan att dra i sadeln eller nudda korset.", "Объясни меры предосторожности при посадке: спокойная неподвижная лошадь, поводья без давления на рот, садиться мягко, не стягивая седло и не задевая круп.", "Wyjaśnij zasady przy wsiadaniu: spokojny, stojący koń, wodze bez ciągnięcia za pysk, wsiadanie delikatne, bez ciągnięcia siodła i dotykania zadu.", "오를 때 주의할 점을 설명하자: 차분하게 서 있는 말, 입을 당기지 않는 고삐, 안장을 당기거나 엉덩이를 건드리지 않고 부드럽게 오르기."),
      tt("Explique les précautions pour descendre : cheval arrêté, espace libre, deux pieds sortis des étriers, jambe passée sans toucher la croupe, glisser doucement et garder les rênes.", "Explain the precautions for dismounting: horse halted, clear space, both feet out of the stirrups, leg over without touching the croup, slide down gently and keep hold of the reins.", "Explica las precauciones para bajar: caballo parado, espacio libre, los dos pies fuera de los estribos, pasar la pierna sin tocar la grupa, deslizarse con suavidad y no soltar las riendas.", "Spiega le precauzioni per scendere: cavallo fermo, spazio libero, entrambi i piedi fuori dalle staffe, gamba passata senza toccare la groppa, scivolare con dolcezza e tenere le redini.", "降りるときの注意を説明しよう：馬が止まっている、まわりがあいている、両足をあぶみから抜く、尻にふれずに脚を回す、そっとすべりおりて手綱を持ったまま。", "Erkläre die Vorsichtsmaßnahmen beim Absteigen: Pferd steht, Platz frei, beide Füße aus den Bügeln, Bein darüber, ohne die Kruppe zu berühren, sanft heruntergleiten und die Zügel behalten.", "اشرح احتياطات النزول: حصان متوقف، مكان فارغ، القدمان خارج الركابين، تمرير الساق دون لمس الكفل، الانزلاق بلطف مع الإمساك باللجام.", "说明下马的注意事项：马已停稳，周围空旷，两脚退出马镫，跨腿不碰马臀，轻轻滑下并握住缰绳。", "Leg de voorzorgen bij het afstijgen uit: paard staat stil, vrije ruimte, beide voeten uit de beugels, been over zonder de croupe te raken, zacht naar beneden glijden en de teugels vasthouden.", "Explique os cuidados para descer: cavalo parado, espaço livre, os dois pés fora dos estribos, passar a perna sem tocar a garupa, deslizar com delicadeza e segurar as rédeas.", "Förklara försiktighetsåtgärderna när du sitter av: hästen står still, fri yta, båda fötterna ur stigbyglarna, benet över utan att nudda korset, glid ner mjukt och håll kvar tyglarna.", "Объясни меры предосторожности при спешивании: лошадь остановлена, место свободно, обе ноги вынуты из стремян, ногу переносить, не задевая круп, мягко соскользнуть и не выпускать поводья.", "Wyjaśnij zasady przy zsiadaniu: koń stoi, wolne miejsce, obie stopy wyjęte ze strzemion, przełożenie nogi bez dotykania zadu, delikatne zsunięcie się i trzymanie wodzy.", "내릴 때 주의할 점을 설명하자: 말이 멈춰 있고, 주변이 비어 있고, 두 발을 등자에서 빼고, 엉덩이를 건드리지 않게 다리를 넘기고, 부드럽게 미끄러져 내려와 고삐를 잡고 있기.")
    ]
  }
});
D("g2-aides", {
  hbGarder: [0, 1, 4, 6, 8],
  defiRemplace: {
    accroche: tt("Lors de ta prochaine séance, cherche à obtenir trois départs au pas avec une action de jambes aussi légère que possible.", "In your next session, aim for three walk transitions with the lightest possible leg action.", "En tu próxima sesión, intenta conseguir tres salidas al paso con una acción de piernas lo más ligera posible.", "Alla prossima sessione, cerca di ottenere tre partenze al passo con un'azione di gambe il più leggera possibile.", "次のレッスンで、できるだけ軽い脚の合図で常歩の発進を3回ねらおう。", "Versuche in deiner nächsten Stunde, dreimal im Schritt anzureiten – mit möglichst leichter Schenkelhilfe.", "في حصتك القادمة، حاول الحصول على ثلاث انطلاقات بالخطو بأخف ضغط ممكن من الساقين.", "下节课上，试着用尽可能轻的腿部动作完成三次慢步起步。", "Probeer in je volgende les drie keer aan te stappen met een zo licht mogelijke beenhulp.", "Na próxima aula, tente obter três partidas ao passo com a ação de pernas mais leve possível.", "Försök vid nästa pass få tre skrittfattningar med så lätt skänkel som möjligt.", "На следующем занятии постарайся трижды тронуть шагом как можно более лёгким действием ног.", "Na następnej jeździe spróbuj trzy razy ruszyć stępem jak najlżejszym działaniem łydek.", "다음 수업에서 가능한 한 가벼운 다리 신호로 평보 출발을 세 번 해 보자."),
    sous: tt("L'objectif n'est pas d'obtenir une réponse plus forte, mais une réponse plus rapide à une aide plus discrète.", "The aim isn't a stronger response, but a quicker response to a more discreet aid.", "El objetivo no es una respuesta más fuerte, sino una respuesta más rápida a una ayuda más discreta.", "L'obiettivo non è una risposta più forte, ma una risposta più rapida a un aiuto più discreto.", "目的はより強い反応ではなく、より控えめな合図へのすばやい反応。", "Ziel ist keine stärkere Reaktion, sondern eine schnellere Reaktion auf eine feinere Hilfe.", "الهدف ليس استجابة أقوى، بل استجابة أسرع لمساعدة أخفّ.", "目标不是更强烈的回应，而是对更轻微辅助的更快回应。", "Het doel is geen sterkere reactie, maar een snellere reactie op een fijnere hulp.", "O objetivo não é uma resposta mais forte, mas uma resposta mais rápida a uma ajuda mais discreta.", "Målet är inte ett starkare svar, utan ett snabbare svar på en diskretare hjälp.", "Цель — не более сильный ответ, а более быстрый ответ на более тонкое воздействие.", "Celem nie jest silniejsza odpowiedź, lecz szybsza odpowiedź na subtelniejszą pomoc.", "목표는 더 강한 반응이 아니라, 더 가벼운 신호에 더 빨리 반응하게 하는 것이다."),
    points: [
      tt("Demande le départ au pas avec une jambe très légère.", "Ask for walk with a very light leg.", "Pide la salida al paso con una pierna muy ligera.", "Chiedi la partenza al passo con una gamba molto leggera.", "とても軽い脚で常歩の発進をたのもう。", "Bitte mit ganz leichtem Schenkel um den Schritt.", "اطلب الانطلاق بالخطو بساق خفيفة جدًا.", "用很轻的腿要求慢步起步。", "Vraag aanstappen met een heel licht been.", "Peça a partida ao passo com a perna bem leve.", "Be om skritt med en mycket lätt skänkel.", "Попроси шаг очень лёгким действием ноги.", "Poproś o stęp bardzo lekką łydką.", "아주 가벼운 다리로 평보 출발을 요청하자."),
      tt("Dès que ton cheval répond, relâche immédiatement tes jambes.", "As soon as your horse responds, release your legs immediately.", "En cuanto tu caballo responda, suelta inmediatamente las piernas.", "Appena il cavallo risponde, rilascia subito le gambe.", "馬がこたえたら、すぐに脚をゆるめよう。", "Sobald dein Pferd reagiert, gib sofort mit den Schenkeln nach.", "فور استجابة حصانك، أرخِ ساقيك مباشرة.", "马一回应，立刻放松双腿。", "Zodra je paard reageert, ontspan je meteen je benen.", "Assim que seu cavalo responder, solte as pernas imediatamente.", "Så fort hästen svarar, släpp skänklarna direkt.", "Как только лошадь ответит, сразу ослабь ноги.", "Gdy tylko koń odpowie, natychmiast rozluźnij łydki.", "말이 반응하면 바로 다리를 풀자."),
      tt("Observe sa réaction et recommence trois fois.", "Watch its reaction and repeat three times.", "Observa su reacción y repite tres veces.", "Osserva la sua reazione e ripeti tre volte.", "反応を観察して、3回くり返そう。", "Beobachte seine Reaktion und wiederhole es dreimal.", "لاحظ ردّ فعله وكرّر ثلاث مرات.", "观察它的反应，重复三次。", "Kijk naar zijn reactie en herhaal het drie keer.", "Observe a reação dele e repita três vezes.", "Se hur den reagerar och gör om det tre gånger.", "Понаблюдай за реакцией и повтори три раза.", "Obserwuj jego reakcję i powtórz trzy razy.", "반응을 관찰하고 세 번 반복하자.")
    ]
  }
});
D("g2-c3", {
  hbGarder: [0, 1, 2, 3, 6],
  synthPlus: [tt("L'énergie se garde jusqu'à la sortie de la figure.", "Keep the energy until you leave the figure.", "La energía se mantiene hasta la salida de la figura.", "L'energia si mantiene fino all'uscita dalla figura.", "図形を出るまで勢いを保つ。", "Die Energie bleibt bis zum Ende der Figur.", "تبقى الطاقة حتى الخروج من الشكل.", "能量要一直保持到走出图形。", "De energie blijft tot je de figuur verlaat.", "A energia se mantém até a saída da figura.", "Energin hålls kvar tills du lämnar figuren.", "Энергию сохраняют до выхода из фигуры.", "Energię utrzymuje się do wyjścia z figury.", "도형을 빠져나갈 때까지 힘을 유지한다.")]
});
D("g2-depart", {
  hbPlus: [tt("Que faire si mon cheval part au trot au lieu du galop ?", "What should I do if my horse trots instead of cantering?", "¿Qué hago si mi caballo sale al trote en lugar de al galope?", "Cosa fare se il mio cavallo parte al trotto invece che al galoppo?", "駈歩ではなく速歩で出てしまったらどうする？", "Was tue ich, wenn mein Pferd trabt statt anzugaloppieren?", "ماذا أفعل إذا انطلق حصاني بالخبب بدل العدو؟", "如果我的马起步成快步而不是跑步，怎么办？", "Wat doe ik als mijn paard gaat draven in plaats van galopperen?", "O que fazer se meu cavalo sair ao trote em vez do galope?", "Vad gör jag om hästen travar i stället för att galoppera?", "Что делать, если лошадь пошла рысью, а не галопом?", "Co zrobić, gdy koń przyspiesza kłusem zamiast zagalopować?", "말이 구보 대신 속보로 출발하면 어떻게 할까?")],
  defiRemplace: {
    accroche: tt("Lors de ta prochaine séance, demande plusieurs départs au galop en te concentrant uniquement sur la qualité de ta préparation.", "In your next session, ask for several canter transitions, focusing only on the quality of your preparation.", "En tu próxima sesión, pide varias salidas al galope concentrándote solo en la calidad de tu preparación.", "Alla prossima sessione, chiedi più partenze al galoppo concentrandoti solo sulla qualità della preparazione.", "次のレッスンで、準備の質だけに集中して、駈歩発進を何回かたのもう。", "Bitte in deiner nächsten Stunde mehrmals um Galopp und achte nur auf die Qualität deiner Vorbereitung.", "في حصتك القادمة، اطلب عدة انطلاقات بالعدو مع التركيز فقط على جودة التحضير.", "下节课上，多次要求跑步起步，只专注于准备的质量。", "Vraag in je volgende les meerdere keren galop en let alleen op de kwaliteit van je voorbereiding.", "Na próxima aula, peça várias partidas ao galope concentrando-se só na qualidade da preparação.", "Be om flera galoppfattningar vid nästa pass och fokusera bara på förberedelsen.", "На следующем занятии попроси несколько подъёмов в галоп, думая только о качестве подготовки.", "Na następnej jeździe poproś kilka razy o galop, skupiając się tylko na jakości przygotowania.", "다음 수업에서 준비의 질에만 집중하며 구보 출발을 여러 번 요청하자."),
    points: [
      tt("Après chaque départ, vérifie que ton cheval est parti calmement.", "After each transition, check that your horse set off calmly.", "Después de cada salida, comprueba que tu caballo ha salido con calma.", "Dopo ogni partenza, verifica che il cavallo sia partito con calma.", "発進のたびに、馬が落ち着いて出たか確かめよう。", "Prüfe nach jedem Angaloppieren, ob dein Pferd ruhig losgegangen ist.", "بعد كل انطلاقة، تحقّق من أن حصانك انطلق بهدوء.", "每次起步后，检查马是否平静地出发。", "Controleer na elke overgang of je paard rustig is vertrokken.", "Depois de cada partida, verifique se seu cavalo saiu com calma.", "Kontrollera efter varje fattning att hästen gick iväg lugnt.", "После каждого подъёма проверь, спокойно ли лошадь пошла.", "Po każdym zagalopowaniu sprawdź, czy koń ruszył spokojnie.", "출발할 때마다 말이 차분하게 출발했는지 확인하자."),
      tt("Vérifie que tu as gardé ton regard loin devant et ton buste redressé.", "Check that you kept your eyes up ahead and your upper body upright.", "Comprueba que has mantenido la mirada lejos y el busto erguido.", "Verifica di aver mantenuto lo sguardo lontano e il busto eretto.", "目線を遠くに、上体をまっすぐ保てたか確かめよう。", "Prüfe, ob dein Blick weit nach vorn ging und dein Oberkörper aufrecht blieb.", "تحقّق من أنك أبقيت نظرك بعيدًا وجذعك مستقيمًا.", "检查你是否保持视线向远方、上身挺直。", "Controleer of je ver vooruit bleef kijken en rechtop bleef zitten.", "Verifique se manteve o olhar longe e o tronco ereto.", "Kontrollera att du tittade långt fram och satt upprätt.", "Проверь, что взгляд был вдаль, а корпус прямой.", "Sprawdź, czy patrzyłeś daleko przed siebie i trzymałeś tułów prosto.", "시선은 멀리, 상체는 곧게 유지했는지 확인하자."),
      tt("Vérifie que tu as relâché tes aides dès qu'il est parti.", "Check that you released your aids as soon as it set off.", "Comprueba que has soltado las ayudas en cuanto ha salido.", "Verifica di aver rilasciato gli aiuti appena è partito.", "馬が出たら、すぐに合図をゆるめたか確かめよう。", "Prüfe, ob du die Hilfen sofort nach dem Anspringen gelöst hast.", "تحقّق من أنك خففت مساعداتك فور انطلاقه.", "检查马一出发你是否就放松了辅助。", "Controleer of je je hulpen losliet zodra hij vertrok.", "Verifique se soltou as ajudas assim que ele partiu.", "Kontrollera att du släppte hjälperna så fort den gick iväg.", "Проверь, что ты ослабил воздействия, как только лошадь пошла.", "Sprawdź, czy rozluźniłeś pomoce, gdy tylko ruszył.", "말이 출발하자마자 신호를 풀었는지 확인하자.")
    ]
  }
});
D("g2-c4", {
  hbPlus: [tt("Que faire si mon cheval ralentit devant l'obstacle ?", "What should I do if my horse slows down before the jump?", "¿Qué hago si mi caballo frena delante del obstáculo?", "Cosa fare se il mio cavallo rallenta davanti all'ostacolo?", "障害の前で馬がスピードを落としたらどうする？", "Was tue ich, wenn mein Pferd vor dem Hindernis langsamer wird?", "ماذا أفعل إذا أبطأ حصاني أمام الحاجز؟", "如果我的马在障碍前减速，怎么办？", "Wat doe ik als mijn paard vertraagt voor de hindernis?", "O que fazer se meu cavalo diminuir antes do obstáculo?", "Vad gör jag om hästen saktar ner före hindret?", "Что делать, если лошадь замедляется перед препятствием?", "Co zrobić, gdy koń zwalnia przed przeszkodą?", "말이 장애물 앞에서 속도를 줄이면 어떻게 할까?")],
  defiRemplace: {
    sous: tt("Tu découvriras souvent que plus ton équitation est discrète, plus ton cheval saute avec facilité.", "You'll often find that the more discreet your riding, the more easily your horse jumps.", "A menudo descubrirás que cuanto más discreta es tu monta, más fácil salta tu caballo.", "Scoprirai spesso che più la tua equitazione è discreta, più il tuo cavallo salta con facilità.", "乗り方が控えめなほど、馬が楽にジャンプできることに気づくはず。", "Du wirst oft merken: Je unauffälliger du reitest, desto leichter springt dein Pferd.", "ستكتشف غالبًا أنه كلما كانت فروسيتك أكثر هدوءًا، قفز حصانك بسهولة أكبر.", "你常会发现，你的骑法越含蓄，马跳得越轻松。", "Je zult vaak merken: hoe onopvallender je rijdt, hoe makkelijker je paard springt.", "Você vai perceber muitas vezes que quanto mais discreta sua equitação, mais facilmente seu cavalo salta.", "Du kommer ofta märka att ju diskretare du rider, desto lättare hoppar hästen.", "Ты часто заметишь: чем незаметнее твоя езда, тем легче прыгает лошадь.", "Często odkryjesz, że im dyskretniejsza twoja jazda, tym łatwiej koń skacze.", "말 위에서의 동작이 조용할수록 말이 더 쉽게 뛴다는 걸 자주 느끼게 될 것이다."),
    points: [
      tt("Quelques foulées avant la barre, adopte progressivement le galop en équilibre.", "A few strides before the pole, gradually take up your jumping position.", "Unos trancos antes de la barra, adopta progresivamente el galope en equilibrio.", "Qualche falcata prima della barriera, assumi progressivamente il galoppo in equilibrio.", "バーの数完歩手前から、少しずつ前傾の駈歩姿勢をとろう。", "Geh einige Galoppsprünge vor der Stange nach und nach in den leichten Sitz.", "قبل العارضة ببضع خطوات، اتخذ تدريجيًا وضعية العدو المتوازن.", "在横杆前几步，逐渐进入轻骑坐姿。", "Neem een paar galopsprongen voor de balk geleidelijk de lichte zit aan.", "Algumas passadas antes da vara, adote aos poucos o galope em equilíbrio.", "Några galoppsprång före bommen, gå gradvis upp i lätt sits.", "За несколько темпов до жерди постепенно прими облегчённую посадку.", "Kilka foule przed drągiem stopniowo przyjmij półsiad.", "바 몇 보 앞에서 서서히 균형 구보 자세를 잡자."),
      tt("Garde tes talons descendus et regarde déjà après l'obstacle.", "Keep your heels down and look beyond the jump already.", "Mantén los talones abajo y mira ya más allá del obstáculo.", "Tieni i talloni bassi e guarda già oltre l'ostacolo.", "かかとを下げ、もう障害の先を見よう。", "Halte die Absätze tief und schau schon hinter das Hindernis.", "أبقِ كعبيك منخفضين وانظر إلى ما بعد الحاجز.", "保持脚跟下沉，提前看向障碍之后。", "Houd je hakken laag en kijk al voorbij de hindernis.", "Mantenha os calcanhares baixos e já olhe além do obstáculo.", "Håll hälarna nere och titta redan förbi hindret.", "Держи пятки опущенными и смотри уже за препятствие.", "Trzymaj pięty w dół i patrz już za przeszkodę.", "뒤꿈치를 내리고 이미 장애물 너머를 보자."),
      tt("Laisse tes coudes accompagner librement l'encolure.", "Let your elbows follow the neck freely.", "Deja que tus codos acompañen libremente el cuello.", "Lascia che i gomiti accompagnino liberamente l'incollatura.", "ひじで首の動きに自由についていこう。", "Lass deine Ellbogen frei dem Hals folgen.", "دع مرفقيك يرافقان العنق بحرية.", "让手肘自由地跟随马颈。", "Laat je ellebogen vrij met de hals meegaan.", "Deixe os cotovelos acompanharem livremente o pescoço.", "Låt armbågarna följa halsen fritt.", "Позволь локтям свободно следовать за шеей.", "Pozwól łokciom swobodnie podążać za szyją.", "팔꿈치가 목의 움직임을 자유롭게 따라가게 하자.")
    ]
  }
});
D("g2-c5", { synthPlus: [tt("Une réponse calme se récompense aussitôt.", "A calm response is rewarded straight away.", "Una respuesta tranquila se premia enseguida.", "Una risposta calma si premia subito.", "落ち着いた反応にはすぐにごほうびを。", "Eine ruhige Reaktion wird sofort belohnt.", "الاستجابة الهادئة تُكافأ فورًا.", "平静的回应要立即奖励。", "Een rustige reactie wordt meteen beloond.", "Uma resposta calma é recompensada na hora.", "Ett lugnt svar belönas direkt.", "Спокойный ответ сразу поощряют.", "Spokojną odpowiedź nagradza się od razu.", "차분한 반응은 바로 칭찬한다.")] });
D("g2-anatomie", { synthPlus: [tt("Connaître l'anatomie aide à repérer ce qui change.", "Knowing anatomy helps you notice changes.", "Conocer la anatomía ayuda a detectar lo que cambia.", "Conoscere l'anatomia aiuta a notare i cambiamenti.", "体のしくみを知れば、変化に気づきやすい。", "Wer die Anatomie kennt, bemerkt Veränderungen.", "معرفة التشريح تساعد على ملاحظة التغيّرات.", "了解解剖结构有助于发现变化。", "Anatomie kennen helpt veranderingen op te merken.", "Conhecer a anatomia ajuda a perceber mudanças.", "Att kunna anatomin hjälper dig se förändringar.", "Знание анатомии помогает замечать изменения.", "Znajomość anatomii pomaga dostrzec zmiany.", "해부 구조를 알면 변화를 알아채기 쉽다.")] });
D("g2-sens", { synthPlus: [tt("Ses réactions viennent souvent de ce qu'il perçoit.", "Its reactions often come from what it perceives.", "Sus reacciones suelen venir de lo que percibe.", "Le sue reazioni nascono spesso da ciò che percepisce.", "馬の反応は、感じとったものから生まれることが多い。", "Seine Reaktionen kommen oft von dem, was es wahrnimmt.", "ردود فعله تأتي غالبًا مما يدركه.", "它的反应往往来自它感知到的东西。", "Zijn reacties komen vaak voort uit wat het waarneemt.", "Suas reações muitas vezes vêm do que ele percebe.", "Reaktionerna kommer ofta av det den uppfattar.", "Её реакции часто связаны с тем, что она ощущает.", "Jego reakcje często wynikają z tego, co odbiera.", "말의 반응은 흔히 감각한 것에서 나온다.")] });
D("g2-heberger", { synthPlus: [tt("Au club, chacun respecte les règles de circulation.", "At the club, everyone follows the traffic rules.", "En el club, todos respetan las normas de circulación.", "Al club, ognuno rispetta le regole di circolazione.", "クラブでは、だれもが通行のルールを守る。", "Im Verein halten sich alle an die Verkehrsregeln.", "في النادي، يحترم الجميع قواعد التنقّل.", "在俱乐部，每个人都遵守通行规则。", "Op de club houdt iedereen zich aan de verkeersregels.", "No clube, todos respeitam as regras de circulação.", "På klubben följer alla trafikreglerna.", "В клубе все соблюдают правила движения.", "W klubie wszyscy przestrzegają zasad ruchu.", "클럽에서는 모두가 통행 규칙을 지킨다.")] });
})();

function sansEmojiFin(s) { return String(s || "").replace(/[\s\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}️‍]+$/u, "").trim(); }
function titreNet(s) { return sansEmojiFin(sansNum(nettoyerTitre(s))); }
/* sorte d'un segment, lue sur le titre français */
function sorte(seg) {
  var t = nettoyerTitre(seg.titre || "").toLowerCase();
  if (seg.k === "citation") return "citation";
  if (/^citation d.ouverture/.test(t)) return "citOuv";
  if (/^citation de fin/.test(t)) return "citFin";
  if (/^(les )?objectifs? du cours/.test(t)) return "objectif";
  if (/synth[èe]se en 10/.test(t)) return "synthese";
  if (/hey baby/.test(t)) return "hb";
  if (/d[ée]fi/.test(t)) return "defi";
  if (/conseil (du|de ton) coach/.test(t)) return "coach";
  if (!t) return "suite";
  return "notion";
}
/* agrandissement plein écran d'une affiche */
function Affiche(p) {
  var _z = useState(false), z = _z[0], setZ = _z[1];
  useEffect(function () {
    if (!z) return;
    var k = function (e) { if (e.key === "Escape") setZ(false); };
    window.addEventListener("keydown", k); return function () { window.removeEventListener("keydown", k); };
  }, [z]);
  return h(React.Fragment, null,
    h("button", { type: "button", className: "pimg aff", "aria-label": p.L("agrandir"), onClick: function () { setZ(true); } },
      h("img", { src: p.src, alt: p.alt || "", loading: "lazy" })),
    p.legende ? h("p", { className: "lg" }, p.legende) : null,
    z ? (window.ReactDOM && ReactDOM.createPortal ? ReactDOM.createPortal : function (x) { return x; })(
      h("div", { className: "hce-zoom", role: "dialog", "aria-modal": "true", "aria-label": p.alt || p.L("affiche"), onClick: function () { setZ(false); } },
        h("img", { src: p.src, alt: p.alt || "" }),
        h("button", { type: "button", "aria-label": p.L("fermer"), onClick: function () { setZ(false); } }, "×")), document.body) : null);
}

function construireAuto(cours, lg) {
  var L = Lx(lg), r = function (x) { return pickLg(x, lg); };
  var blocs = cours.blocs || [];
  var couv = (blocs[0] && blocs[0].type === "couv-affiche") ? blocs[0] : null;
  var pool = AUTO_IM[cours.id] || [IM.fond02];
  /* segments : version française (structure) + langue choisie (texte), même position */
  var lis = function (v) {
    if (!v) return [];
    var F = Array.isArray(v) ? v : (v.fr || []), X = Array.isArray(v) ? v : (v[lg] || v.en || F);
    if (X.length !== F.length) X = F;
    return F.map(function (f, j) { return { f: f, x: X[j] || f }; });
  };
  var legendeUtile = function (b) { return /agrandir/i.test(pickLg(b.legende, "fr") || "") ? "" : (r(b.legende) || ""); };

  var chapitres = [], cur = null, special = { coach: [], defi: [], hb: [], synthese: [], citOuv: [], citFin: [] };
  var nouveauChap = function (titre, img) { cur = { titre: titre, img: img || null, notions: [] }; chapitres.push(cur); return cur; };
  var derniere = null;   /* la dernière chose posée (notion ou spécial), pour y rattacher un texte sans titre */
  var poser = function (j, seg) {
    var s = sorte(seg.f);
    /* (v6, Galop 2) encadré sans titre juste après la synthèse / Hey Baby / le défi = phrase de fin du cours */
    if (s === "suite" && seg.f.k === "encadre" && derniere && derniere.sp && derniere.sp !== "coach") { special.citFin.push({ seg: seg.x, suite: [] }); derniere = null; return; }
    /* (v6) encadré en tête de bloc, court, titré d'un nom propre (« Nuno Oliveira ») = citation : note du chapitre */
    if (s === "notion" && j === 0 && seg.f.k === "encadre" && String(seg.f.texte || "").length < 140 && /^[A-ZÀ-Ý][\p{L}'’-]+ [A-ZÀ-Ý]/u.test(nettoyerTitre(seg.f.titre || "")) && cur && !cur.note) {
      cur.note = "« " + String(r(seg.x.texte) || "").replace(/^[«"\s]+|[»"\s]+$/g, "") + " »  — " + nettoyerTitre(r(seg.x.titre)); derniere = null; return;
    }
    if (s === "suite" && derniere) { derniere.suite.push(seg.x); return; }
    var o = { seg: seg.x, fr: seg.f, suite: [] };
    if (s === "citation") s = "citFin";
    if (s === "objectif") { derniere = o; return; }   /* retiré : doublon (rien ne s'y rattache à l'affichage) */
    if (special[s]) {
      special[s].push(o); o.sp = s; derniere = o;
      /* coach et défi gardent leur place dans le chapitre ; celui qui part dans l'encart du haut en est retiré ensuite */
      if ((s === "coach" || s === "defi") && cur) { o.place = true; cur.notions.push(o); }
      return;
    }
    if (s === "suite") { o.titre = L("essentiel"); o.intro = true; }
    if (!cur) nouveauChap(r(cours.titre));
    cur.notions.push(o); derniere = o;
  };
  var finDePhotos = true;
  blocs.forEach(function (b, bi) {
    if (b.type === "couv-affiche" || b.type === "intro") return;
    if (b.type === "photo-liste") {
      if (finDePhotos || !cur) nouveauChap(L("enImages"));
      finDePhotos = false;
      var o = { photo: { src: r(b.src), titre: r(b.titre), items: Array.isArray(b.items) ? b.items : (b.items && (b.items[lg] || b.items.fr)) || [] }, suite: [] };
      cur.notions.push(o); derniere = o; return;
    }
    if (b.type === "astuce") {
      var ta = (b.textes || []).map(function (x) { return r(x); }).filter(Boolean);
      if (!cur) nouveauChap(r(cours.titre));
      var oa = { astuce: ta, titre: L("astuce"), suite: [] }; cur.notions.push(oa); derniere = oa; return;
    }
    finDePhotos = true;
    if (b.type === "image") {
      if (!cur) nouveauChap(r(cours.titre));
      var oi = { affiche: { src: r(b.src), legende: legendeUtile(b) }, titre: L("affiche"), suite: [] };
      cur.notions.push(oi); derniere = oi; return;
    }
    if (b.type !== "texte-riche") return;
    var segs = lis(b.contenu), apres = lis(b.contenuApres);
    var tb = r(b.titre), sb = sorte({ titre: pickLg(b.titre, "fr") });
    /* bloc entier « conseil du coach » fait de paragraphes sans titre -> un seul conseil */
    if (tb && sb !== "notion" && sb !== "suite" && segs.length && segs.every(function (s) { return !s.f.titre; })) {
      var tx = segs.map(function (s) { return (s.x.gras ? s.x.gras + " " : "") + (s.x.texte || ""); }).join("\n\n");
      poser(null, { f: { k: "encadre", titre: pickLg(b.titre, "fr") }, x: { k: "encadre", titre: tb, texte: tx } });
    } else {
      if (tb) nouveauChap(titreNet(tb), null);
      else if (!cur) nouveauChap(r(cours.titre));
      if (b.src) {   /* image d'un bloc de texte : affiche entière en tête (bloc sans titre) */
        var ob = { affiche: { src: r(b.src), legende: legendeUtile(b) }, titre: L("affiche"), suite: [] };
        cur.notions.push(ob); derniere = ob;
      }
      if (tb) derniere = null;
      segs.forEach(function (s, j) { poser(j, s); });
    }
    apres.forEach(function (s) { poser(null, s); });
  });
  /* un seul chapitre : les sections dont chaque puce a un intitulé en gras deviennent une notion par puce */
  if (chapitres.length === 1) {
    var nn = [];
    chapitres[0].notions.forEach(function (o) {
      var pu = o.seg && o.seg.puces, fp = o.fr && o.fr.puces;
      if (o.fr && o.fr.k === "section" && fp && fp.length >= 3 && fp.every(function (q) { return q.gras; }) && !o.suite.length && !r(o.seg.sous) && !o.seg.texte) {
        pu.forEach(function (q, k) { nn.push({ titre: sansEmojiFin(String(r(q.gras) || "").replace(/\s*[:：]\s*$/, "")), groupe: k === 0 ? titreNet(o.seg.titre) : null, texte1: r(q.texte), suite: [] }); });
      } else nn.push(o);
    });
    chapitres[0].notions = nn;
  }
  chapitres = chapitres.filter(function (c) { return c.notions.length; });
  /* conseil du coach du haut : le premier encadré court ; les autres restent dans le cours */
  var coach = null;
  special.coach.forEach(function (o) {
    var t = [r(o.seg.texte), r(o.seg.sous)].concat(o.suite.map(function (x) { return ((r(x.gras) ? r(x.gras) + " " : "") + (r(x.texte) || "")).trim(); })).filter(Boolean).join("\n\n");
    var court = !(o.seg.puces && o.seg.puces.length) && t.length < 520;
    if (!coach && court) { coach = { titre: titreNet(o.seg.titre), texte: t }; o.enHaut = true; return; }
    if (!o.place) { var ch = chapitres[chapitres.length - 1]; if (ch) ch.notions.push(o); }
  });
  var defiO = special.defi[0] || null;
  if (defiO) defiO.enHaut = true;
  special.defi.slice(1).forEach(function (o) { if (!o.place) { var ch = chapitres[chapitres.length - 1]; if (ch) ch.notions.push(o); } });
  chapitres.forEach(function (c) { c.notions = c.notions.filter(function (n) { return !n.enHaut; }); });
  chapitres = chapitres.filter(function (c) { return c.notions.length; });
  /* v6 (22h) : « Pour finir » réparti dans les chapitres concernés (g1-c19) : le savais-tu dans le chapitre du montoir,
     chaque erreur à éviter dans le chapitre qu'elle concerne (aucune supprimée, aucune répétée) */
  var RP = (COMPL[cours.id] || {}).repartir;
  if (RP && chapitres[RP.de]) {
    chapitres[RP.de].notions.forEach(function (n) {
      var t = n.fr && n.fr.titre ? nettoyerTitre(n.fr.titre).toLowerCase() : "";
      if (/savais/.test(t) && chapitres[RP.savais]) chapitres[RP.savais].notions.push(n);
      else if (/erreur/.test(t) && n.seg) RP.erreurs.forEach(function (e) {
        var ch = chapitres[e[0]], pu = n.seg.puces || [];
        if (ch) ch.notions.push(Object.assign({}, n, { seg: Object.assign({}, n.seg, { puces: e[1].map(function (i) { return pu[i]; }).filter(Boolean) }), suite: [] }));
      });
      else if (chapitres[RP.de - 1]) chapitres[RP.de - 1].notions.push(n);
    });
    chapitres.splice(RP.de, 1);
  }
  /* (v6) regroupements demandés (5 chapitres maximum) : COMPL[id].fusion = [[chapitre à fondre, chapitre d'accueil]] (index à partir de 0) */
  ((COMPL[cours.id] || {}).fusion || []).slice().sort(function (a, b) { return b[0] - a[0]; }).forEach(function (f) {
    if (chapitres[f[0]] && chapitres[f[1]]) { chapitres[f[1]].notions = chapitres[f[1]].notions.concat(chapitres[f[0]].notions); if (!chapitres[f[1]].note) chapitres[f[1]].note = chapitres[f[0]].note; chapitres[f[1]].sous = [chapitres[f[1]].sous, chapitres[f[0]].titre].filter(Boolean).join("  ·  "); chapitres.splice(f[0], 1); }
  });
  /* (v6) un chapitre qui ne contient plus que l'affiche (défi et Hey Baby partis en haut et en fin) rejoint le chapitre d'avant */
  for (var ci = chapitres.length - 1; ci > 0; ci--) {
    if (chapitres[ci].notions.every(function (n) { return n.affiche; })) {
      chapitres[ci - 1].notions = chapitres[ci - 1].notions.concat(chapitres[ci].notions);
      if (!chapitres[ci - 1].note) chapitres[ci - 1].note = chapitres[ci].note;
      chapitres.splice(ci, 1);
    }
  }
  /* images des chapitres */
  chapitres.forEach(function (c, i) { c.img = pool[i % pool.length]; c.id = "ch" + (i + 1); });
  /* citations : ouverture + couverture -> notes des premiers chapitres */
  var notes = special.citOuv.map(function (o) { return "« " + String(r(o.seg.texte) || "").replace(/^[«"\s]+|[»"\s]+$/g, "") + " »"; });
  if (couv && couv.couv && r(couv.couv.citation)) notes.push("« " + String(r(couv.couv.citation)).replace(/^[«"\s]+|[»"\s]+$/g, "") + " »" + (r(couv.couv.auteur) ? "  " + r(couv.couv.auteur) : ""));
  var ni = 0; chapitres.forEach(function (c) { if (!c.note && ni < notes.length) c.note = notes[ni++]; });
  var citFin = special.citFin.map(function (o) { return r(o.seg.texte); }).filter(Boolean).join(" ");
  /* défi : 1re phrase en haut, la suite en page de fin (pas de doublon) */
  var defi = null;
  if (defiO) {
    var dTxt = r(defiO.seg.sous) || r(defiO.seg.texte) || "", ph = phrases(dTxt);
    var dPu = (defiO.seg.puces || []).map(function (q) { return { texte: (r(q.gras) ? r(q.gras) + " " : "") + r(q.texte) }; });
    defiO.suite.forEach(function (x) {
      if (x.texte) dPu.push({ texte: (x.gras ? r(x.gras) + " " : "") + r(x.texte) });
      (x.puces || []).forEach(function (q) { dPu.push({ texte: (r(q.gras) ? r(q.gras) + " " : "") + r(q.texte) }); });
    });
    var reste = ph.slice(1).join(" ");
    var accroche = (reste || dPu.length) ? ph[0] || "" : "";
    defi = { titre: titreNet(defiO.seg.titre), haut: accroche, fin: { titre: titreNet(defiO.seg.titre), sous: accroche ? reste : dTxt, puces: dPu } };
  }
  /* parties manquantes ajoutées (COMPL) : seulement là où le cours n'a rien */
  var C = COMPL[cours.id] || {};
  if (!coach && C.coach) coach = { titre: L("coach"), texte: r(C.coach) };
  if (!defi && C.defi) defi = { titre: r(C.defi.titre), haut: r(C.defi.accroche), fin: { titre: r(C.defi.titre), sous: "", puces: C.defi.points.map(function (x) { return { texte: r(x) }; }) } };
  if (C.chap && chapitres.length === 1) {
    var tot = C.chap.reduce(function (a, x) { return a + x[1]; }, 0), seule = chapitres[0];
    if (tot === seule.notions.length) {
      var pos = 0;
      chapitres = C.chap.map(function (x, i) { var c = { titre: r(x[0]), sous: i === 0 ? seule.titre : null, img: pool[i % pool.length], id: "ch" + (i + 1), note: null, notions: seule.notions.slice(pos, pos + x[1]) }; pos += x[1]; return c; });
      chapitres.forEach(function (c, i) { c.note = notes[i] || null; });
    }
  }
  var hb = []; special.hb.forEach(function (o) { (o.seg.puces || []).forEach(function (q) { var t = r(q.texte); if (t) hb.push(t); }); });
  var synth = []; special.synthese.forEach(function (o) { (o.seg.puces || []).forEach(function (q) { var t = ((r(q.gras) ? r(q.gras) + " " : "") + r(q.texte)).trim(); if (t) synth.push(t); }); });
  if (!hb.length && C.hb) hb = C.hb.map(r);
  if (!synth.length && C.synth) synth = C.synth.map(r);
  if (!citFin && C.fin) citFin = r(C.fin);
  /* v6 (22h) : pages de fin harmonisées — 5 questions, 5 phrases, défi en 3 points (validé par Blandine) */
  if (C.hbGarder) hb = C.hbGarder.map(function (i) { return hb[i]; }).filter(Boolean);
  if (C.hbPlus) hb = hb.concat(C.hbPlus.map(r));
  if (C.synthRemplace) synth = C.synthRemplace.map(r);
  if (C.synthPlus) synth = synth.concat(C.synthPlus.map(r));
  if (C.defiRemplace && defi) {
    var DR = C.defiRemplace, dt = DR.titre ? r(DR.titre) : defi.titre;
    defi = { titre: dt, haut: DR.accroche ? r(DR.accroche) : defi.haut, fin: { titre: dt, sous: DR.sous ? r(DR.sous) : "", puces: DR.points.map(function (x) { return { texte: r(x) }; }) } };
  }
  return { chapitres: chapitres, coach: coach, defi: defi, hb: hb, synth: synth, citFin: citFin, couv: couv };
}

/* rendu d'une notion dans la carte de droite */
function renduNotion(o, L, lg, alerte) {
  var r = function (x) { return pickLg(x, lg); };
  var out = [], k = 0;
  var pu = function (arr) {
    if (!arr || !arr.length) return null;
    return h("ul", { key: "u" + (k++), className: alerte ? "x" : undefined }, arr.map(function (q, i) { var g = r(q.gras); return h("li", { key: i }, g ? h("strong", null, g + " ") : null, r(q.texte)); }));
  };
  var para = function (x) {
    var g = r(x.gras), t = r(x.texte) || "";
    if (!paras(t).length) return g ? [h("p", { key: "p" + (k++), className: "pg" }, h("strong", null, g))] : [];
    return paras(t).map(function (tt, i) { return h("p", { key: "p" + (k++), className: "pg" }, i === 0 && g ? h("strong", null, g + " ") : null, tt); });
  };
  if (o.affiche) out.push(h(Affiche, { key: "af", L: L, src: o.affiche.src, legende: o.affiche.legende, alt: o.affiche.legende }));
  if (o.photo) {
    out.push(h(Affiche, { key: "ph", L: L, src: o.photo.src, alt: o.photo.titre || "" }));   /* fiche photo légendée : image entière, agrandissable */
    out.push(h("ul", { key: "pl" }, o.photo.items.map(function (t, i) { return h("li", { key: i }, t); })));
  }
  if (o.astuce) o.astuce.forEach(function (t, i) { out.push(h("p", { key: "as" + i, className: "ast" }, t)); });
  if (o.texte1 !== undefined) { if (o.groupe) out.push(h("p", { key: "gr", className: "s" }, o.groupe)); out.push(h("p", { key: "t1", className: "pg" }, o.texte1)); }
  if (o.seg) {
    var s = o.seg;
    if (r(s.sous)) out.push(h("p", { key: "so", className: "s" }, r(s.sous)));
    if (s.texte || s.gras) out = out.concat(para(s));
    out.push(pu(s.puces));
  }
  o.suite.forEach(function (x) {
    var c = [];
    if (r(x.titre)) c.push(h("b", { key: "b" }, r(x.titre) + " "));
    if (r(x.sous)) c.push(h("span", { key: "s" }, r(x.sous)));
    if (x.texte || x.gras) out = out.concat(para(x));
    if (c.length) out.push(h("p", { key: "c" + (k++), className: "ap" }, c));
    out.push(pu(x.puces));
  });
  return out.filter(Boolean);
}
function titreNotion(o, L, lg) {
  if (o.titre) return o.titre;
  if (o.photo) return o.photo.titre;
  return titreNet(pickLg(o.seg && o.seg.titre, lg));
}
/* 01/11 : photos de haut de page fournies par Blandine (remplacent la couverture d'origine) — [image, position] */
var HERO_COURS = {
  "g1-c17": ["images/cours-g1-c17-hero.webp", "78% 40%"]   /* « Préparer son poney ou son cheval : seller et brider » — cheval noir sellé et bridé */
};

function alerteNotion(o) {
  var t = o.fr && o.fr.titre ? nettoyerTitre(o.fr.titre).toLowerCase() : "";
  return /erreur|jamais|ne pas toucher|attention/.test(t);
}

AUTO_IDS.forEach(function (id) {
  HypeCoursEditorial.config[id] = function (cours, lg, o) {
    var L = Lx(lg), r = function (x) { return pickLg(x, lg); };
    var A = construireAuto(cours, lg);
    var galopLab = "Galop " + ((/^g(\d+)/.exec(cours.id) || [0, 1])[1]);
    if (!A.chapitres.length || !(cours.quiz || []).length) return { valide: false, sections: [], chapitres: [] };
    var chapitres = A.chapitres.map(function (c) { return { id: c.id, label: c.titre, img: c.img, pos: "55% 40%" }; });
    var sections = A.chapitres.map(function (c, i) {
      var items = c.notions.map(function (n) { return { titre: titreNotion(n, L, lg), alerte: alerteNotion(n), rendu: function () { return renduNotion(n, L, lg, alerteNotion(n)); } }; });
      return { id: c.id, ton: "photo", citation: c.note || null, rendu: function (x) {
        return h(Chapitre, { key: c.id, id: c.id, L: x.L, rtl: x.rtl, num: (i < 9 ? "0" : "") + (i + 1), galop: galopLab, cls: "auto" + (i % 2 ? " inv" : ""), titre: c.titre, sous: c.sous || null, bg: c.img, bgPos: "55% 40%", items: items, note: c.note });
      } };
    });
    sections.push({ id: "suite", ton: "noir", rendu: function (x) {
      return h("div", { className: "hce-quiz", style: { "--img": "url(" + IM.quiz + ")", marginTop: 0 } },
        h("h3", null, L("secQuiz")), h("p", null, L("quizSous")),
        h("div", { className: "hce-btns" }, h("button", { type: "button", className: "hce-btn", onClick: function () { x.versFin(true); } }, L("suiteFin"), fleche(x.rtl, 15))));
    } });
    var cv = A.couv;
    return {
      auto: true,
      hero: { img: (HERO_COURS[cours.id] && HERO_COURS[cours.id][0]) || (cv && r(cv.src)) || A.chapitres[0].img, pos: (HERO_COURS[cours.id] && HERO_COURS[cours.id][1]) || (cv && cv.couv && cv.couv.pos) || "50% 40%", titre: r(cours.titre), galop: galopLab, duree: r(cours.duree), type: r(cours.type) },
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
  HypeCoursEditorial.config[id].auto = true;
});

/* page de fin des cours générés : même page partagée (FinCours) */
function FinAuto(props) {
  var S = window.HypeRobesOrdi.shared;
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var L = Lx(lg);
  var cfg = HypeCoursEditorial.config[cours.id](cours, lg, outils()), A = cfg.auto_;
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: cfg.hero.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    if (props.setEcran) props.setEcran("assistant");
  };
  var liste = props.coursListe || [], idxC = liste.findIndex(function (c) { return c && c.id === cours.id; });
  var suivant = (idxC >= 0 && liste[idxC + 1] && props.onOuvrirCours) ? liste[idxC + 1] : null;
  var ch = cfg.chapitres, por;
  if (A.synth.length) {   /* résumé = la synthèse du cours, en 5 groupes au plus */
    var n = Math.min(5, A.synth.length), taille = Math.ceil(A.synth.length / n); por = [];
    for (var i = 0; i < A.synth.length; i += taille) {
      var g = A.synth.slice(i, i + taille), c = ch[por.length % ch.length];
      por.push({ img: c.img, pos: c.pos, nom: g[0], desc: g.slice(1).join(" ") });
    }
  } else {   /* pas de synthèse dans le cours : le plan du cours (chapitres et notions) */
    por = A.chapitres.slice(0, 5).map(function (c) { return { img: c.img, nom: c.titre, desc: c.notions.map(function (n) { return titreNotion(n, L, lg); }).join("  ·  ") }; });
  }
  return h("div", { className: "rbo", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, S.CSS),
    h("main", { className: "rbo-main" },
      h(S.FinCours, {
        L: L, lg: lg, rtl: rtl, kicker: cfg.hero.galop, titre: cfg.hero.titre, Selecteur: props.Selecteur, coursId: cours.id,
        heroImg: cfg.hero.img, heroPos: cfg.hero.pos,
        portraits: por, note: A.citFin || null,
        hb: A.hb, onHey: hey, defiSeg: A.defi ? A.defi.fin : null,
        quizImg: IM.quiz, onQuiz: function () { if (props.setEcran) props.setEcran("quiz"); }, quizScore: props.quizScore,
        suivant: suivant ? { titre: (typeof suivant.titre === "string" ? suivant.titre : pickLg(suivant.titre, lg)), onClick: function () { props.onOuvrirCours(suivant.id); } } : null,
        onGalops: props.onRetour, onRetourCours: props.onRetourCours
      }),
      (typeof FinPageHype === "function") ? h("div", { className: "rbo-finpage" }, h(FinPageHype, null)) : null));
}
AUTO_IDS.forEach(function (id) { window.HypeFinsCours[id] = { ok: finOk, Fin: FinAuto }; });
HypeCoursEditorial.construireAuto = construireAuto;


window.HypeCoursEditorial = HypeCoursEditorial;
})();
