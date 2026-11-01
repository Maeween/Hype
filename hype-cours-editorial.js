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
var VERSION = 6;   /* 01/11 : 12 cours du Galop 3 sur le modèle (ordinateur et tablette) + parties manquantes (COMPL, 14 langues) */
/* v5 : 31/10 : les 15 autres cours du Galop 1 */   /* 31/10 : les 15 autres cours du Galop 1 générés sur le même modèle (ordinateur et tablette) + parties manquantes (COMPL, 14 langues) */
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
/* 01/11 (Blandine : « où est le bleu pétrole ») : un chapitre sur deux en bleu pétrole (Galop 2 et suivants) */
".hce-chp.pet{background:#101D22}",
".hce-chp.pet>.bg:after{background:linear-gradient(180deg,rgba(16,29,34,.5) 0%,rgba(16,29,34,.9) 40%,#101D22 100%)}",
".hce-chp.pet .pan{background:rgba(13,26,31,.86)}",
".hce-suiv.pet{background:#101D22;padding-bottom:22px}",
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
".hce-menu ol{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;overflow:visible;scroll-snap-type:none;padding:0 16px}",
".hce-menu li{flex:none}",
".hce-chap{display:flex;align-items:center;gap:12px;height:auto;min-height:62px;border-radius:6px;border-color:rgba(243,238,228,.1);background:#0c1113}",
".hce-chap .ph{inset:0 0 0 54%}[dir=rtl] .hce-chap .ph{inset:0 54% 0 0}",
".hce-chap .n{position:relative;top:auto;inset-inline-start:auto;flex:0 0 46px;text-align:center;font-size:27px}",
".hce-chap .lb{position:relative;inset:auto;flex:1 1 auto;min-width:0;padding:10px 0;font-size:18px;line-height:1.15;text-shadow:none}",
".hce-chap .lb small{display:block;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:400;color:var(--doux);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".hce-chap .hce-rond{position:relative;bottom:auto;inset-inline-end:auto;flex:0 0 28px;margin-inline-end:12px;background:rgba(7,10,8,.45)}",
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

"}",
/* 31/10 (v5) : cours générés (Galop 1) — affiche entière (jamais rognée) + agrandissement plein écran */
".hce-chp .pimg.aff{aspect-ratio:auto;max-height:46vh;background:#0B0F0E;cursor:zoom-in;border:1px solid rgba(201,166,107,.25);padding:0}",
".hce-chp .pimg.aff img{height:auto;max-height:46vh;object-fit:contain;margin:0 auto}",
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
function Chapitre(p) {
  var _i = useState(0), i = _i[0], setI = _i[1];
  var L = p.L, rtl = p.rtl, it = p.items[i], n = p.items.length;
  var olRef = useRef(null);
  useEffect(function () {
    var ol = olRef.current; if (!ol || ol.scrollWidth <= ol.clientWidth + 2) return;
    var b = ol.querySelectorAll("button")[i]; if (!b) return;
    try { ol.scrollTo({ left: b.parentNode.offsetLeft - 16, behavior: "smooth" }); } catch (e) { }
  }, [i]);
  return h("div", { className: "hce-chp" + (p.petrole ? " pet" : "") },
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
  var long = String(p.texte || "").length > 300;
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
    h(Vague, { key: "v0", de: NOIR, vers: cur.pet ? "#101D22" : fond(cur.ton) }),
    h("section", { key: cur.id, id: "hce-" + cur.id, "data-i": actif, className: "hce-sec t-" + cur.ton, "aria-labelledby": "hce-t-" + cur.id },
      cur.ton === "photo" ? cur.rendu(ctx) : h("div", { className: "hce-in" }, cur.rendu(ctx)))
  ];
  if (!dernier) corps.push(h("div", { key: "suiv", className: "hce-suiv" + (cur.pet ? " pet" : "") },
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
          h("h3", null, enc.coach.titre), h(CoachTxt, { texte: enc.coach.texte, L: L })) : null,
        enc.hb ? h("button", { type: "button", className: "hce-card hb", onClick: function () { hey(""); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.hb.img + ")", backgroundPosition: enc.hb.pos || "center" } }),
          h("h3", null, L("heyBaby")), h("p", null, enc.hb.texte), h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null,
        enc.defi ? h("button", { type: "button", className: "hce-card defi", onClick: function () { versFin(false); } },
          h("span", { className: "im", "aria-hidden": true, style: { backgroundImage: "url(" + enc.defi.img + ")", backgroundPosition: enc.defi.pos || "center" } }),
          h("h3", null, enc.defi.titre), enc.defi.texte ? h("p", null, enc.defi.texte) : null, h("span", { className: "hce-rond", "aria-hidden": true }, fleche(rtl, 16))) : null)),
    h(Vague, { de: NOIR, vers: NOIR }),
    /* MENU DES CHAPITRES */
    h("nav", { className: "hce-menu", ref: menuRef, "aria-label": L("mTitre") },
      h("div", { className: "hce-mhead" }, h("p", { className: "k" }, L("mProg")), h("h2", null, L("mTitre")), h("p", { className: "aide" }, L("mAide"))),
      h("ol", { style: { "--n": menuColonnes(cfg.chapitres.length + (cfg.revision ? 1 : 0), cours) } }, cfg.chapitres.map(function (c, i) {
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

/* 01/11 : plus de 6 cartes dans le menu (cours à 7 ou 8 chapitres du Galop 3) -> deux rangées, sinon les numéros
   chevauchent les titres sur ordinateur. Galop 1 inchangé (déjà publié). */
function menuColonnes(n, cours) { return (n > 6 && !/^g1-/.test((cours && cours.id) || "")) ? Math.ceil(n / 2) : n; }
/* ---------------- garde ---------------- */
HypeCoursEditorial.config = {};
HypeCoursEditorial.ok = function (cours) {
  try {
    if (!cours || !HypeCoursEditorial.config[cours.id]) return false;
    if (HypeCoursEditorial.config[cours.id].auto && (window.innerWidth || 1024) < 700) return false;   /* cours générés : téléphone = affichage d'avant (pour l'instant) */
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
  "g1-c8": ["images/galop5-c01-materiel.webp", "images/galop5-c02-embouchures.webp", "images/securite-g1-rangement.webp"],
  "g1-c9": ["images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp", "images/galop5-c08-equilibre.webp"],
  "g1-c10": ["images/securite-g1-longe.webp", "images/securite-g1-rangement.webp"],
  "g1-c11": ["images/galop5-theme-connaissances.webp", "images/galop5-c03-apprendre.webp"],
  "g1-c12": ["images/galop5-c11-saut.webp", "images/galop5-c12-cross.webp"],
  "g1-c13": ["images/galop5-c12-cross.webp", "images/galop5-c11-saut.webp"],
  "g1-c16": ["images/galop5-c07-transport.webp", "images/galop5-c05-soins.webp", "images/galop5-th-cheval2.webp"],
  "g1-c17": ["images/galop5-c01-materiel.webp", "images/galop5-theme-cheval.webp", "images/galop5-c02-embouchures.webp", "images/galop5-c03-apprendre.webp"],
  "g1-c18": ["images/galop5-c06-travail-pied.webp", "images/securite-g1-longe.webp", "images/securite-g1-porte.webp"],
  "g1-c19": ["images/galop5-theme-connaissances.webp", "images/galop5-th-cheval2.webp", "images/galop5-c03-apprendre.webp", "images/securite-g1-chute.webp", "images/galop5-theme-cheval.webp", "images/galop5-c07-transport.webp"],
  /* Galop 3 (01/11) : photos provisoires déjà en ligne ; g3-c7 = cours des robes (déjà refait), g3-c3 et g3-saut = étape suivante */
  "g3-c1": ["images/galop5-c08-equilibre.webp", "images/galop5-theme-pratique-montee.webp", "images/galop5-c09-incurvation.webp"],
  "g3-c2": ["images/galop5-c09-incurvation.webp", "images/galop5-c08-equilibre.webp", "images/galop5-hero-v2.webp"],
  "g3-c4": ["images/galop5-c06-travail-pied.webp", "images/galop5-theme-soins-pied.webp", "images/securite-g1-longe.webp"],
  "g3-c5": ["images/cours-pansage-09_gestes_brossage.webp", "images/cours-pansage-12_pieds_sabot_au_sol.webp", "images/galop5-c05-soins.webp"],
  "g3-c6": ["images/galop5-th-vie.webp", "images/galop5-th-vie2.webp", "images/connexion-cheval-oeil-hd.jpg"],
  "g3-c8": ["images/galop5-c08-equilibre.webp", "images/galop5-theme-pratique-montee.webp", "images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp"],
  "g3-c9": ["images/couv-g2-heberger.jpg", "images/galop5-th-vie.webp"],
  "g3-c10": ["images/galop5-th-vie2.webp", "images/galop5-c12-cross.webp", "images/galop5-video-parcours.webp", "images/galop5-video-dressage.webp", "images/galop5-c11-saut.webp", "images/galop5-reprises-dressage.webp", "images/article-cso-saut.webp", "images/galop5-theme-pratique-montee.webp"],
  "g3-c11": ["images/cours-pansage-12_pieds_sabot_au_sol.webp", "images/galop5-theme-soins-pied.webp", "images/galop5-c05-soins.webp", "images/galop5-c07-transport.webp"],
  "g3-c12": ["images/galop5-c08-equilibre.webp", "images/galop5-theme-pratique-montee.webp", "images/galop5-hero-v2.webp", "images/galop5-c09-incurvation.webp"],
  "g3-c13": ["images/galop5-c10-cession.webp", "images/galop5-c09-incurvation.webp", "images/galop5-c08-equilibre.webp"],
  "g3-c14": ["images/galop5-c09-incurvation.webp", "images/galop5-c10-cession.webp", "images/galop5-reprises-dressage.webp"],
  "g3-c15": ["images/galop5-reprises-dressage.webp", "images/galop5-c09-incurvation.webp", "images/galop5-c10-cession.webp"]
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
  "g1-c18": {
    synth: [
      tt("En main, tu guides sans tirer brusquement.", "In hand, you lead without pulling sharply.", "Del ramal, guías sin tirar bruscamente.", "A mano, guidi senza tirare bruscamente.", "引き馬では、急に引っぱらずに導く。", "An der Hand führst du, ohne ruckartig zu ziehen.", "عند القيادة باليد، توجّه دون شدّ مفاجئ.", "牵马时，引导而不猛拉。", "Aan de hand leid je zonder hard te trekken.", "Na guia, você conduz sem puxar bruscamente.", "Vid hand leder du utan att rycka.", "В поводу ты ведёшь, не дёргая.", "Prowadząc w ręku, nie szarpiesz.", "끌고 갈 때는 갑자기 당기지 않고 이끈다."),
      tt("Ton attention reste tournée vers le cheval.", "Your attention stays on the horse.", "Tu atención sigue puesta en el caballo.", "La tua attenzione resta rivolta al cavallo.", "注意はいつも馬に向けておく。", "Deine Aufmerksamkeit bleibt beim Pferd.", "انتباهك يبقى موجّهًا نحو الحصان.", "注意力始终放在马身上。", "Je aandacht blijft bij het paard.", "Sua atenção fica voltada para o cavalo.", "Din uppmärksamhet är på hästen.", "Твоё внимание обращено на лошадь.", "Twoja uwaga pozostaje skupiona na koniu.", "주의는 늘 말에게 둔다."),
      tt("Une distance adaptée protège tes pieds.", "The right distance protects your feet.", "Una distancia adecuada protege tus pies.", "Una distanza adeguata protegge i tuoi piedi.", "ちょうどよい距離が足を守る。", "Der richtige Abstand schützt deine Füße.", "المسافة المناسبة تحمي قدميك.", "合适的距离保护你的脚。", "De juiste afstand beschermt je voeten.", "Uma distância adequada protege seus pés.", "Rätt avstånd skyddar dina fötter.", "Правильная дистанция бережёт твои ноги.", "Odpowiedni dystans chroni twoje stopy.", "알맞은 거리가 발을 지켜 준다."),
      tt("Les passages délicats demandent calme et anticipation.", "Tricky passages call for calm and anticipation.", "Los pasos delicados piden calma y anticipación.", "I passaggi delicati richiedono calma e anticipo.", "むずかしい場所では落ち着いて先を読む。", "Heikle Stellen verlangen Ruhe und Voraussicht.", "الممرات الصعبة تتطلب هدوءًا واستباقًا.", "难走的地方需要冷静和预判。", "Lastige doorgangen vragen rust en vooruitdenken.", "Passagens delicadas pedem calma e antecipação.", "Knepiga passager kräver lugn och framförhållning.", "Сложные места требуют спокойствия и предвидения.", "Trudne przejścia wymagają spokoju i przewidywania.", "까다로운 곳에서는 침착하게 미리 대비한다."),
      tt("Si tu hésites, demande l'aide de ton enseignant.", "If you're unsure, ask your instructor for help.", "Si dudas, pide ayuda a tu profesor.", "Se esiti, chiedi aiuto al tuo istruttore.", "迷ったら先生に助けを求めよう。", "Wenn du unsicher bist, bitte deinen Reitlehrer um Hilfe.", "إذا تردّدت، اطلب مساعدة مدرّبك.", "如果犹豫，就请教练帮忙。", "Twijfel je, vraag dan je instructeur om hulp.", "Se hesitar, peça ajuda ao seu instrutor.", "Om du tvekar, be din instruktör om hjälp.", "Если сомневаешься, попроси помощи у тренера.", "Jeśli się wahasz, poproś instruktora o pomoc.", "망설여지면 선생님께 도움을 청하자.")
    ]
  },
  /* ---- Galop 3 (01/11, textes ChatGPT validés par Blandine) ---- */
  "g3-c1": {
    synth: [
      tt("Au trot, les membres avancent par paires diagonales.", "At the trot, the legs move in diagonal pairs.", "Al trote, las extremidades avanzan por pares diagonales.", "Al trotto, gli arti avanzano a coppie diagonali.", "速歩では、脚が対角線上の組で動く。", "Im Trab bewegen sich die Beine in diagonalen Paaren.", "في التروت، تتحرك القوائم في أزواج قطرية.", "快步时，马的四肢以对角成对的方式运动。", "In draf bewegen de benen in diagonale paren.", "No trote, os membros movem-se em pares diagonais.", "I trav rör sig benen i diagonala par.", "На рыси ноги лошади движутся диагональными парами.", "W kłusie koń porusza nogami parami po przekątnej.", "속보에서는 다리가 대각선 쌍으로 움직여."),
      tt("Au trot enlevé, tu te lèves et te rassois en rythme.", "In rising trot, you rise and sit in rhythm.", "En trote levantado, te levantas y te sientas al ritmo.", "Nel trotto sollevato, ti alzi e ti siedi a ritmo.", "軽速歩では、リズムに合わせて立ち座りする。", "Beim Leichttraben stehst du im Rhythmus auf und setzt dich wieder.", "في التروت الخفيف، تنهض من السرج وتجلس بإيقاع منتظم.", "轻快步起坐时，你随着节奏站起、坐下。", "Bij het lichtrijden sta je op en ga je zitten op het ritme.", "No trote levantado, levantas-te e sentas-te ao ritmo.", "Vid lättridning reser du dig och sätter dig i takt.", "На облегчённой рыси ты встаёшь и садишься в ритм.", "W kłusie anglezowanym unosisz się i siadasz w rytmie.", "경속보에서는 리듬에 맞춰 일어섰다가 앉아."),
      tt("Sur une courbe, observe l'épaule extérieure pour vérifier ton diagonal.", "On a bend, watch the outside shoulder to check your diagonal.", "En una curva, observa la espalda exterior para comprobar tu diagonal.", "In curva, osserva la spalla esterna per controllare il diagonale.", "曲線では外側の肩を見て、正しい斜対で乗っているか確かめよう。", "In einer Kurve beobachtest du die äußere Schulter, um die richtige Diagonale zu prüfen.", "في المنعطف، راقب الكتف الخارجية لتتأكد من القطر الصحيح.", "转弯时，观察外侧肩部，检查起坐的对角是否正确。", "In een bocht kijk je naar de buitenschouder om je diagonaal te controleren.", "Numa curva, observa a espádua exterior para confirmares a diagonal.", "I en sväng tittar du på ytterbogen för att kontrollera diagonalen.", "На повороте смотри на наружное плечо, чтобы проверить диагональ.", "Na zakręcie obserwuj zewnętrzną łopatkę, by sprawdzić przekątną.", "곡선에서는 바깥쪽 어깨를 보고 올바른 대각선인지 확인해."),
      tt("Pour changer de diagonal, reste assis un temps de plus.", "To change diagonal, stay seated for one extra beat.", "Para cambiar de diagonal, permanece sentado un tiempo más.", "Per cambiare diagonale, resta seduto un tempo in più.", "斜対を変えるには、一拍余分に座ろう。", "Zum Umsitzen bleibst du einen Takt länger sitzen.", "لتغيير القطر، ابق جالسا إيقاعا إضافيا.", "换对角时，多坐一拍。", "Om van diagonaal te wisselen, blijf je één tel extra zitten.", "Para mudar de diagonal, fica sentado mais um tempo.", "För att byta diagonal sitter du kvar ett extra steg.", "Чтобы сменить диагональ, останься сидеть на один такт дольше.", "Aby zmienić nogę w anglezowaniu, usiądź na jeden takt dłużej.", "대각선을 바꾸려면 한 박자 더 앉아 있어.")
    ]
  },
  "g3-c2": {
    synth: [
      tt("Au galop sur une courbe, recherche le pied intérieur.", "When cantering on a bend, aim for the inside lead.", "Al galopar en una curva, busca el pie interior.", "Al galoppo in curva, cerca il galoppo sulla mano interna.", "曲線での駈歩は、内方の手前を目指そう。", "Galoppierst du in einer Kurve, achte auf den Innengalopp.", "عند الغالوب في منعطف، ابحث عن القوائم المتقدمة من جهة الداخل.", "沿弯道跑步时，要选择内侧领先腿。", "In galop op een bocht kies je de binnengalop.", "Ao galopar numa curva, procura a mão interior.", "När du galopperar i en sväng söker du rätt innergalopp.", "На повороте добивайся галопа с внутренней ведущей ноги.", "Galopując po łuku, wybieraj wewnętrzną nogę prowadzącą.", "곡선에서 구보할 때는 안쪽 다리가 선행하도록 해."),
      tt("Un départ précis se prépare avec des aides coordonnées.", "A precise transition into canter starts with coordinated aids.", "Una salida precisa se prepara con ayudas coordinadas.", "Una partenza precisa si prepara con aiuti coordinati.", "正確な駈歩発進には、扶助の連携が必要だ。", "Ein präzises Angaloppieren gelingt mit abgestimmten Hilfen.", "تبدأ الانطلاقة الدقيقة إلى الغالوب بتنسيق المساعدات.", "准确的跑步起步需要协调使用扶助。", "Een nauwkeurig galopvertrek begint met afgestemde hulpen.", "Uma partida precisa prepara-se com ajudas coordenadas.", "En tydlig galoppfattning förbereds med samordnade hjälper.", "Точный подъём в галоп требует согласованных средств управления.", "Dokładne zagalopowanie wymaga skoordynowanych pomocy.", "정확한 구보 출발은 부조를 조화롭게 사용하는 것부터 시작해."),
      tt("Ton équilibre accompagne les premières foulées.", "Your balance follows the first canter strides.", "Tu equilibrio acompaña los primeros trancos.", "Il tuo equilibrio accompagna le prime falcate.", "最初の数歩は、馬の動きに合わせてバランスを取ろう。", "Dein Gleichgewicht begleitet die ersten Galoppsprünge.", "يساعد توازنك على مرافقة خطوات الغالوب الأولى.", "你的平衡要跟随最初几步跑步动作。", "Je evenwicht volgt de eerste galopsprongen.", "O teu equilíbrio acompanha as primeiras passadas.", "Din balans följer de första galoppsprången.", "Твоё равновесие помогает сопровождать первые темпы галопа.", "Twoja równowaga podąża za pierwszymi foule galopu.", "처음 몇 걸음에서는 말의 움직임에 맞춰 균형을 유지해."),
      tt("Si le pied est incorrect, reviens calmement à l'allure inférieure.", "If the lead is wrong, calmly return to a slower gait.", "Si el pie es incorrecto, vuelve con calma al aire anterior.", "Se la mano è sbagliata, torna con calma all'andatura inferiore.", "手前が違ったら、落ち着いて一つ下の歩様に戻ろう。", "Ist die Galoppseite falsch, wechsle ruhig in die niedrigere Gangart.", "إذا كانت جهة الغالوب غير صحيحة، عد بهدوء إلى المشية الأبطأ.", "如果领先腿不对，就平静地回到较慢的步态。", "Is de galop verkeerd aangesprongen, ga dan rustig terug naar een lagere gang.", "Se a mão estiver errada, regressa calmamente à andadura inferior.", "Om hästen fattar fel galopp, återgå lugnt till en långsammare gångart.", "Если ведущая нога неверная, спокойно вернись к более медленному аллюру.", "Jeśli koń zagalopuje na złą nogę, spokojnie wróć do niższego chodu.", "선행 다리가 틀렸다면 침착하게 더 느린 보법으로 돌아가.")
    ]
  },
  "g3-c4": {
    synth: [
      tt("À pied, tu guides ton cheval avec des demandes claires.", "On the ground, you guide your horse with clear requests.", "A pie, guías a tu caballo con indicaciones claras.", "Da terra, guidi il cavallo con richieste chiare.", "地上では、明確な合図で馬を導こう。", "Am Boden führst du dein Pferd mit klaren Signalen.", "على الأرض، توجه حصانك بطلبات واضحة.", "地面训练时，你用清晰的指令引导马。", "Vanaf de grond leid je je paard met duidelijke signalen.", "A pé, guias o cavalo com pedidos claros.", "Från marken leder du hästen med tydliga signaler.", "С земли ты направляешь лошадь понятными командами.", "Z ziemi prowadzisz konia za pomocą jasnych sygnałów.", "지상에서는 명확한 신호로 말을 이끌어."),
      tt("Le cheval peut déplacer ses épaules et ses hanches séparément.", "The horse can move its shoulders and hindquarters separately.", "El caballo puede desplazar las espaldas y las caderas por separado.", "Il cavallo può spostare separatamente spalle e anche.", "馬は肩と腰を別々に動かせる。", "Das Pferd kann Schulter und Hinterhand getrennt bewegen.", "يستطيع الحصان تحريك كتفيه ووركيه بشكل منفصل.", "马可以分别移动肩部和臀部。", "Het paard kan zijn schouders en achterhand afzonderlijk verplaatsen.", "O cavalo consegue deslocar as espáduas e as ancas separadamente.", "Hästen kan flytta bogar och bakdel var för sig.", "Лошадь может отдельно перемещать плечи и заднюю часть тела.", "Koń może osobno przesuwać łopatki i zad.", "말은 어깨와 엉덩이를 각각 따로 움직일 수 있어."),
      tt("Une réponse calme vaut mieux qu'un mouvement précipité.", "A calm response is better than a rushed movement.", "Una respuesta tranquila es mejor que un movimiento precipitado.", "Una risposta calma è meglio di un movimento affrettato.", "急いだ動きより、落ち着いた反応が大切だ。", "Eine ruhige Reaktion ist besser als eine hastige Bewegung.", "الاستجابة الهادئة أفضل من الحركة المتسرعة.", "平静的回应比仓促的动作更好。", "Een rustige reactie is beter dan een overhaaste beweging.", "Uma resposta calma vale mais do que um movimento apressado.", "En lugn reaktion är bättre än en stressad rörelse.", "Спокойный ответ лучше поспешного движения.", "Spokojna reakcja jest lepsza niż pośpieszny ruch.", "서두른 움직임보다 차분한 반응이 더 좋아."),
      tt("Observe sa réaction et relâche ta demande au bon moment.", "Watch its response and release your aid at the right moment.", "Observa su respuesta y cede la ayuda en el momento adecuado.", "Osserva la risposta e cedi l'aiuto al momento giusto.", "馬の反応を見て、適切なタイミングで合図を緩めよう。", "Beobachte die Reaktion und gib deine Hilfe im richtigen Moment nach.", "راقب استجابته وخفف طلبك في اللحظة المناسبة.", "观察马的反应，并在合适时机放松指令。", "Let op zijn reactie en geef je hulp op het juiste moment los.", "Observa a resposta e cede a ajuda no momento certo.", "Se hur hästen svarar och lätta på hjälpen vid rätt tillfälle.", "Наблюдай за реакцией и вовремя смягчай своё воздействие.", "Obserwuj reakcję i ustępuj z pomocą we właściwym momencie.", "말의 반응을 살피고 적절한 순간에 신호를 풀어 줘.")
    ]
  },
  "g3-c5": {
    synth: [
      tt("Le pansage complet nettoie et permet d'observer le cheval.", "Thorough grooming cleans the horse and lets you check it.", "El cepillado completo limpia al caballo y permite observarlo.", "La pulizia completa permette di pulire e osservare il cavallo.", "全身の手入れは、馬をきれいにしながら観察する時間だ。", "Gründliches Putzen reinigt das Pferd und ermöglicht die Kontrolle.", "ينظف التمشيط الكامل الحصان ويساعدك على ملاحظته.", "完整刷洗既能清洁马匹，也能观察它的状态。", "Een volledige poetsbeurt reinigt het paard en laat je het controleren.", "Uma limpeza completa permite limpar e observar o cavalo.", "En noggrann rykt gör hästen ren och låter dig undersöka den.", "Полная чистка очищает лошадь и помогает осмотреть её.", "Dokładne czyszczenie oczyszcza konia i pozwala go obejrzeć.", "꼼꼼한 손질은 말을 깨끗하게 하고 상태를 살피게 해 줘."),
      tt("Les pieds se curent avec méthode et prudence.", "Hooves must be picked out carefully and methodically.", "Los cascos se limpian con método y precaución.", "Gli zoccoli si puliscono con metodo e prudenza.", "蹄の裏は、手順を守って慎重に掃除しよう。", "Die Hufe werden sorgfältig und mit Bedacht ausgekratzt.", "تنظف الحوافر بخطوات منظمة وبحذر.", "清理马蹄要讲究步骤并注意安全。", "Hoeven krab je zorgvuldig en volgens een vaste werkwijze uit.", "Os cascos limpam-se com método e cuidado.", "Hovarna kratsas metodiskt och försiktigt.", "Копыта расчищают аккуратно и последовательно.", "Kopyta czyści się starannie i ostrożnie.", "발굽은 정해진 순서에 따라 조심스럽게 손질해."),
      tt("Les crins se démêlent sans tirer brusquement.", "Mane and tail hair should be untangled without sudden pulling.", "Las crines se desenredan sin tirones bruscos.", "I crini si districano senza strappi bruschi.", "たてがみや尾の毛は、強く引っ張らずにほぐそう。", "Mähne und Schweif entwirrst du ohne ruckartiges Ziehen.", "يفك تشابك شعر العرف والذيل دون شد مفاجئ.", "梳理鬃毛和尾毛时不要猛拉。", "Manen en staart ontwar je zonder hard te trekken.", "A crina e a cauda desembaraçam-se sem puxões bruscos.", "Man och svans reds ut utan hårda ryck.", "Гриву и хвост распутывают без резких рывков.", "Grzywę i ogon rozczesuje się bez gwałtownego szarpania.", "갈기와 꼬리털은 세게 잡아당기지 않고 풀어 줘."),
      tt("Toute douleur ou anomalie doit être signalée.", "Any pain or unusual sign must be reported.", "Cualquier dolor o anomalía debe comunicarse.", "Ogni dolore o anomalia deve essere segnalata.", "痛みや異常に気づいたら、必ず伝えよう。", "Schmerzen oder Auffälligkeiten musst du melden.", "يجب الإبلاغ عن أي ألم أو علامة غير طبيعية.", "发现疼痛或异常情况，要及时报告。", "Pijn of afwijkingen moet je altijd melden.", "Qualquer dor ou anomalia deve ser comunicada.", "Smärta eller avvikelser ska alltid rapporteras.", "О боли или необычных признаках нужно сообщать.", "Każdy ból lub niepokojący objaw trzeba zgłosić.", "통증이나 이상 징후를 발견하면 반드시 알려야 해.")
    ]
  },
  "g3-c6": {
    synth: [
      tt("Le cheval a besoin de contacts avec ses congénères.", "Horses need contact with other horses.", "El caballo necesita relacionarse con otros caballos.", "Il cavallo ha bisogno di contatti con altri cavalli.", "馬には仲間の馬との交流が必要だ。", "Pferde brauchen Kontakt zu anderen Pferden.", "يحتاج الحصان إلى التواصل مع الخيول الأخرى.", "马需要与其他马匹接触和交流。", "Een paard heeft contact met soortgenoten nodig.", "O cavalo precisa de contacto com outros cavalos.", "Hästen behöver kontakt med andra hästar.", "Лошади нужен контакт с другими лошадьми.", "Koń potrzebuje kontaktu z innymi końmi.", "말은 다른 말들과 어울릴 필요가 있어."),
      tt("Dans le troupeau, les relations évoluent.", "Relationships within the herd can change.", "Dentro de la manada, las relaciones evolucionan.", "Nel branco, le relazioni cambiano nel tempo.", "群れの中の関係は、時間とともに変化する。", "In der Herde verändern sich die Beziehungen.", "تتغير العلاقات داخل القطيع مع الوقت.", "马群中的关系会随时间变化。", "Binnen de kudde veranderen de onderlinge relaties.", "No grupo, as relações mudam com o tempo.", "Relationerna i flocken förändras med tiden.", "Отношения внутри табуна меняются.", "Relacje w stadzie zmieniają się z czasem.", "무리 안에서 말들의 관계는 계속 변해."),
      tt("Ses gestes et ses postures transmettent des messages.", "Its movements and posture communicate messages.", "Sus gestos y posturas transmiten mensajes.", "I suoi gesti e le sue posture comunicano messaggi.", "馬の動きや姿勢は、さまざまなことを伝えている。", "Bewegungen und Körperhaltung senden Signale.", "تنقل حركاته ووضعيات جسمه رسائل مختلفة.", "马的动作和姿态会传递信息。", "Zijn bewegingen en houding geven signalen.", "Os seus gestos e posturas transmitem mensagens.", "Hästens rörelser och kroppshållning förmedlar budskap.", "Движения и позы лошади передают сигналы.", "Gesty i postawa konia przekazują informacje.", "말의 동작과 자세에는 여러 신호가 담겨 있어."),
      tt("Observe toute la situation avant d'interpréter une réaction.", "Look at the whole situation before interpreting a reaction.", "Observa toda la situación antes de interpretar una reacción.", "Osserva tutta la situazione prima di interpretare una reazione.", "反応を判断する前に、状況全体を観察しよう。", "Beobachte die gesamte Situation, bevor du eine Reaktion deutest.", "راقب الموقف كاملا قبل تفسير أي استجابة.", "判断马的反应前，先观察整体情况。", "Bekijk de hele situatie voordat je een reactie interpreteert.", "Observa toda a situação antes de interpretares uma reação.", "Se hela situationen innan du tolkar en reaktion.", "Прежде чем толковать реакцию, оцени всю ситуацию.", "Zanim zinterpretujesz reakcję, przyjrzyj się całej sytuacji.", "말의 반응을 판단하기 전에 전체 상황을 살펴봐.")
    ]
  },
  "g3-c8": {
    synth: [
      tt("Le pas est une allure marchée à quatre temps.", "The walk is a four-beat walking gait.", "El paso es un aire marchado de cuatro tiempos.", "Il passo è un'andatura camminata a quattro tempi.", "常歩は四拍子の歩く歩様だ。", "Der Schritt ist eine schreitende Gangart im Viertakt.", "المشي مشية بأربعة إيقاعات.", "常步是一种四拍的行走步态。", "De stap is een viertaktgang zonder zweefmoment.", "O passo é uma andadura marchada a quatro tempos.", "Skritten är en fyrtaktig gångart.", "Шаг — это аллюр в четыре такта.", "Stęp to chód czterotaktowy.", "평보는 네 박자로 걷는 보법이야."),
      tt("Au pas, les appuis se succèdent sans suspension.", "At the walk, the footfalls follow one another without suspension.", "Al paso, los apoyos se suceden sin suspensión.", "Al passo, gli appoggi si susseguono senza sospensione.", "常歩では、空中に浮く瞬間がなく、順番に着地する。", "Im Schritt folgen die Hufauftritte ohne Schwebephase aufeinander.", "في المشي، تتتابع ملامسة الحوافر للأرض دون مرحلة طيران.", "常步时，马蹄依次着地，没有腾空阶段。", "In stap volgen de hoefslagen elkaar op zonder zweefmoment.", "No passo, os apoios sucedem-se sem suspensão.", "I skritt följer hovslagen på varandra utan svävmoment.", "На шагу копыта касаются земли по очереди, без фазы подвисания.", "W stępie kolejne kończyny opierają się o ziemię bez fazy zawieszenia.", "평보에서는 공중에 뜨는 순간 없이 발굽이 차례로 땅에 닿아."),
      tt("Le trot est une allure sautée à deux temps.", "The trot is a two-beat gait with a suspension phase.", "El trote es un aire saltado de dos tiempos.", "Il trotto è un'andatura saltata a due tempi.", "速歩は二拍子で、空中に浮く瞬間がある歩様だ。", "Der Trab ist eine schwungvolle Gangart im Zweitakt.", "التروت مشية ذات إيقاعين وتتخللها مرحلة طيران.", "快步是一种两拍并带有腾空阶段的步态。", "De draf is een tweetaktgang met een zweefmoment.", "O trote é uma andadura saltada a dois tempos.", "Traven är en tvåtaktig gångart med svävmoment.", "Рысь — это аллюр в два такта с фазой подвисания.", "Kłus to chód dwutaktowy z fazą zawieszenia.", "속보는 두 박자로 움직이며 공중에 뜨는 순간이 있는 보법이야."),
      tt("Au trot, les membres travaillent par paires diagonales.", "At the trot, the legs work in diagonal pairs.", "Al trote, las extremidades trabajan por pares diagonales.", "Al trotto, gli arti lavorano a coppie diagonali.", "速歩では、対角線上の脚が一組になって動く。", "Im Trab arbeiten die Beine in diagonalen Paaren.", "في التروت، تعمل القوائم في أزواج قطرية.", "快步时，马的四肢以对角成对的方式运动。", "In draf werken de benen in diagonale paren.", "No trote, os membros trabalham em pares diagonais.", "I trav arbetar benen i diagonala par.", "На рыси ноги работают диагональными парами.", "W kłusie nogi pracują parami po przekątnej.", "속보에서는 다리가 대각선 쌍으로 움직여.")
    ]
  },
  "g3-c9": {
    defi: {
      titre: tt("Détective des litières", "Bedding detective", "Detective de camas", "Detective delle lettiere", "敷料たんてい", "Einstreu-Detektiv", "محقق الفرشة", "垫料侦探", "Strooiseldetective", "Detetive das camas", "Strödetektiv", "Детектив подстилки", "Detektyw ściółki", "깔짚 탐정"),
      accroche: tt("Avec ton enseignant, observe deux litières propres si ton club en utilise plusieurs.", "With your instructor, examine two clean bedding materials if your yard uses more than one.", "Con tu profesor, observa dos tipos de cama limpios si tu club utiliza varios.", "Con il tuo istruttore, osserva due lettiere pulite se il centro ne usa più di una.", "先生と一緒に、クラブで使っている清潔な敷料を2種類観察しよう。", "Sieh dir mit deinem Reitlehrer zwei saubere Einstreuarten an, falls euer Stall mehrere verwendet.", "مع مدربك، افحص نوعين من الفرشة النظيفة إذا كانت الإسطبلات تستخدم أكثر من نوع.", "和教练一起，如果马房使用多种垫料，就观察其中两种干净的垫料。", "Bekijk met je instructeur twee soorten schoon strooisel als de stal meerdere soorten gebruikt.", "Com o teu instrutor, observa duas camas limpas se o centro usar mais de um tipo.", "Titta tillsammans med din ridlärare på två rena strömaterial om stallet använder flera sorter.", "Вместе с тренером рассмотри два вида чистой подстилки, если конюшня использует несколько видов.", "Z instruktorem obejrzyj dwa rodzaje czystej ściółki, jeśli stajnia używa kilku.", "선생님과 함께 마방에서 여러 종류를 쓴다면 깨끗한 깔짚 두 가지를 관찰해 봐."),
      points: [
        tt("Compare leur texture et explique ce qui les différencie.", "Compare their textures and explain how they differ.", "Compara sus texturas y explica sus diferencias.", "Confronta la consistenza e spiega le differenze.", "手触りや特徴を比べて、違いを説明してみよう。", "Vergleiche ihre Beschaffenheit und erkläre die Unterschiede.", "قارن ملمسهما واشرح الفرق بينهما.", "比较它们的质地并说出区别。", "Vergelijk de structuur en leg de verschillen uit.", "Compara as texturas e explica as diferenças.", "Jämför deras struktur och förklara skillnaderna.", "Сравни их текстуру и объясни различия.", "Porównaj ich strukturę i wyjaśnij różnice.", "질감을 비교하고 차이점을 설명해.")
      ]
    },
    synth: [
      tt("La litière contribue au confort du cheval.", "Bedding contributes to the horse's comfort.", "La cama contribuye al bienestar del caballo.", "La lettiera contribuisce al comfort del cavallo.", "敷料は馬が快適に過ごすために役立つ。", "Einstreu trägt zum Wohlbefinden des Pferdes bei.", "تساهم الفرشة في راحة الحصان.", "垫料有助于提高马的舒适度。", "Strooisel draagt bij aan het comfort van het paard.", "A cama contribui para o conforto do cavalo.", "Strö bidrar till hästens komfort.", "Подстилка помогает обеспечить комфорт лошади.", "Ściółka wpływa na komfort konia.", "깔짚은 말이 편안하게 지내도록 도와줘."),
      tt("Elle doit rester propre et suffisamment sèche.", "It must stay clean and sufficiently dry.", "Debe mantenerse limpia y suficientemente seca.", "Deve rimanere pulita e sufficientemente asciutta.", "敷料は清潔で十分に乾いた状態を保とう。", "Sie muss sauber und ausreichend trocken bleiben.", "يجب أن تبقى نظيفة وجافة بما يكفي.", "垫料应保持清洁和足够干燥。", "Het moet schoon en voldoende droog blijven.", "Deve manter-se limpa e suficientemente seca.", "Den ska hållas ren och tillräckligt torr.", "Она должна оставаться чистой и достаточно сухой.", "Powinna być czysta i odpowiednio sucha.", "깔짚은 깨끗하고 충분히 건조하게 유지해야 해."),
      tt("Les matériaux n'absorbent pas tous de la même façon.", "Different bedding materials absorb moisture differently.", "Los materiales no absorben todos la humedad de la misma manera.", "I materiali non assorbono tutti l'umidità allo stesso modo.", "敷料の種類によって、水分の吸収力は違う。", "Nicht jedes Einstreumaterial nimmt Feuchtigkeit gleich gut auf.", "لا تمتص مواد الفرشة المختلفة الرطوبة بالطريقة نفسها.", "不同垫料吸收水分的能力并不相同。", "Niet elk materiaal neemt vocht op dezelfde manier op.", "Nem todos os materiais absorvem a humidade da mesma forma.", "Olika strömaterial suger upp fukt på olika sätt.", "Разные материалы по-разному впитывают влагу.", "Różne materiały inaczej wchłaniają wilgoć.", "깔짚의 종류마다 수분을 흡수하는 방식이 달라."),
      tt("Un entretien régulier préserve un espace sain.", "Regular maintenance keeps the living area healthy.", "Un mantenimiento regular conserva un espacio saludable.", "Una manutenzione regolare mantiene l'ambiente sano.", "こまめな手入れで、清潔な生活環境を保てる。", "Regelmäßige Pflege hält den Lebensbereich hygienisch.", "تحافظ العناية المنتظمة على مكان معيشة صحي.", "定期清理有助于保持健康的生活环境。", "Regelmatig onderhoud houdt de leefomgeving gezond.", "A manutenção regular mantém o espaço saudável.", "Regelbunden skötsel håller miljön hälsosam.", "Регулярный уход помогает поддерживать здоровую среду.", "Regularna pielęgnacja utrzymuje zdrowe warunki.", "정기적으로 관리하면 건강한 생활 공간을 유지할 수 있어.")
    ]
  },
  "g3-c3": {
    coach: tt("Avant de sauter, vérifie avec ton enseignant que l'obstacle et la zone de réception sont dégagés. Un exercice bien préparé te permet de te concentrer sur ton cheval.", "Before jumping, check with your instructor that the obstacle and landing area are clear. A well-prepared exercise helps you focus on your horse.", "Antes de saltar, comprueba con tu profesor que el obstáculo y la zona de recepción estén despejados. Un ejercicio bien preparado te permite concentrarte en tu caballo.", "Prima di saltare, verifica con il tuo istruttore che l'ostacolo e la zona di atterraggio siano liberi. Un esercizio ben preparato ti aiuta a concentrarti sul cavallo.", "跳ぶ前に、障害物と着地場所が安全か先生と確認しよう。準備が整えば、馬に集中できるよ。", "Prüfe vor dem Springen mit deinem Reitlehrer, ob das Hindernis und der Landebereich frei sind. Gute Vorbereitung hilft dir, dich auf dein Pferd zu konzentrieren.", "قبل القفز، تأكد مع مدربك من خلو الحاجز ومنطقة الهبوط من العوائق. يساعدك التحضير الجيد على التركيز مع حصانك.", "跳跃前，和教练确认障碍及落地区域没有危险物。充分准备能让你更专注于马匹。", "Controleer voor het springen met je instructeur of de hindernis en landingszone vrij zijn. Goede voorbereiding helpt je op je paard te letten.", "Antes de saltares, confirma com o teu instrutor que o obstáculo e a zona de receção estão livres. Uma boa preparação ajuda-te a concentrares-te no cavalo.", "Kontrollera med din ridlärare före hoppet att hindret och landningsområdet är fria. God förberedelse hjälper dig att fokusera på hästen.", "Перед прыжком вместе с тренером проверь, что препятствие и место приземления свободны. Хорошая подготовка поможет тебе сосредоточиться на лошади.", "Przed skokiem sprawdź z instruktorem, czy przeszkoda i miejsce lądowania są wolne. Dobre przygotowanie pomaga ci skupić się na koniu.", "점프하기 전에 선생님과 함께 장애물과 착지 구역이 안전한지 확인해. 준비가 잘되면 말에게 더 집중할 수 있어."),
    hb: [
      tt("Pourquoi mon cheval perd-il son rythme après un virage serré ?", "Why does my horse lose its rhythm after a tight turn?", "¿Por qué mi caballo pierde el ritmo después de una curva cerrada?", "Perché il mio cavallo perde il ritmo dopo una curva stretta?", "急なカーブの後、どうして馬のリズムが乱れるの？", "Warum verliert mein Pferd nach einer engen Kurve seinen Rhythmus?", "لماذا يفقد حصاني إيقاعه بعد منعطف ضيق؟", "为什么我的马在急转弯后会失去节奏？", "Waarom verliest mijn paard zijn ritme na een scherpe bocht?", "Porque é que o meu cavalo perde o ritmo depois de uma curva apertada?", "Varför tappar min häst rytmen efter en snäv sväng?", "Почему моя лошадь теряет ритм после крутого поворота?", "Dlaczego mój koń traci rytm po ciasnym zakręcie?", "우리 말은 급커브를 돈 뒤 왜 리듬이 흐트러질까?"),
      tt("Comment savoir si je suis bien dans l'axe de l'obstacle ?", "How can I tell if I'm properly lined up with the obstacle?", "¿Cómo sé si estoy bien alineado con el obstáculo?", "Come faccio a capire se sono ben allineato con l'ostacolo?", "障害物にまっすぐ向かっているか、どう確認すればいい？", "Woran merke ich, ob ich richtig auf das Hindernis ausgerichtet bin?", "كيف أعرف أنني أتجه مباشرة نحو وسط الحاجز؟", "我怎样知道自己是否对准了障碍物？", "Hoe weet ik of ik recht op de hindernis af rijd?", "Como sei se estou bem alinhado com o obstáculo?", "Hur vet jag om jag rider rakt mot hindret?", "Как понять, что я еду точно по линии на препятствие?", "Skąd mam wiedzieć, czy jadę prosto na przeszkodę?", "내가 장애물의 중심을 향해 똑바로 가고 있는지 어떻게 알 수 있을까?"),
      tt("Comment retrouver ma direction après la réception ?", "How can I regain my direction after landing?", "¿Cómo puedo recuperar la dirección después de la recepción?", "Come posso ritrovare la direzione dopo l'atterraggio?", "着地後に進行方向を整えるにはどうすればいい？", "Wie finde ich nach der Landung wieder meine Richtung?", "كيف أستعيد اتجاهي بعد الهبوط؟", "落地后，我怎样重新控制方向？", "Hoe vind ik mijn richting terug na de landing?", "Como recupero a direção depois da receção?", "Hur hittar jag tillbaka till min riktning efter landningen?", "Как мне восстановить направление после приземления?", "Jak odzyskać kierunek po lądowaniu?", "착지한 뒤에는 어떻게 진행 방향을 다시 잡을까?")
    ],
    defi: {
      titre: tt("Détective des litières", "Bedding detective", "Detective de camas", "Detective delle lettiere", "敷料たんてい", "Einstreu-Detektiv", "محقق الفرشة", "垫料侦探", "Strooiseldetective", "Detetive das camas", "Strödetektiv", "Детектив подстилки", "Detektyw ściółki", "깔짚 탐정"),
      accroche: tt("Avec ton enseignant, franchis une barre au sol en préparant une courbe puis une ligne droite.", "With your instructor, ride over a ground pole after a bend followed by a straight line.", "Con tu profesor, pasa una barra en el suelo preparando una curva y luego una línea recta.", "Con il tuo istruttore, supera una barriera a terra dopo una curva e un tratto dritto.", "先生と一緒に、カーブから直線につなげて地上の横木を越えよう。", "Reite mit deinem Reitlehrer nach einer Kurve und einer Geraden über eine Bodenstange.", "مع مدربك، اعبر عصا موضوعة على الأرض بعد منعطف يتبعه خط مستقيم.", "在教练指导下，先转弯再走直线，通过一根地杆。", "Rijd met je instructeur na een bocht en een rechte lijn over een grondbalk.", "Com o teu instrutor, passa uma vara no chão depois de uma curva seguida de uma linha reta.", "Rid över en markbom med din ridlärare efter en sväng och en rak linje.", "С тренером пройди через жердь на земле после поворота и прямого подхода.", "Z instruktorem przejedź przez drąg na ziemi po łuku i prostym najazdzie.", "선생님과 함께 곡선을 돈 뒤 직선으로 접근해 바닥의 막대를 넘어 봐."),
      points: [
        tt("Compare deux passages et décris celui où ton cheval reste le plus régulier.", "Compare two attempts and describe which one feels more regular.", "Compara dos pasadas y explica en cuál tu caballo mantiene mejor el ritmo.", "Confronta due passaggi e descrivi quello in cui il cavallo è più regolare.", "2回の通過を比べて、どちらがより一定のリズムだったか説明してみよう。", "Vergleiche zwei Versuche und beschreibe, wann dein Pferd gleichmäßiger bleibt.", "قارن بين محاولتين واشرح أيهما كان إيقاع حصانك فيه أكثر انتظاما.", "比较两次通过的情况，说说哪次马的节奏更稳定。", "Vergelijk twee pogingen en beschrijf wanneer je paard regelmatiger loopt.", "Compara duas passagens e explica em qual o cavalo mantém melhor o ritmo.", "Jämför två försök och beskriv när hästen håller jämnast rytm.", "Сравни две попытки и опиши, в какой лошадь двигалась ровнее.", "Porównaj dwie próby i opisz, kiedy koń utrzymywał równiejszy rytm.", "두 번의 시도를 비교하고 어느 쪽에서 말의 리듬이 더 일정했는지 설명해.")
      ]
    },
    synth: [
      tt("Le tracé se construit dès le virage.", "Your approach line starts in the turn.", "La trayectoria se prepara desde la curva.", "La traiettoria si prepara già dalla curva.", "進路はカーブから作り始める。", "Die Anreitelinie beginnt schon in der Kurve.", "يبدأ إعداد المسار منذ المنعطف.", "接近路线从转弯时就开始准备。", "De aanrijlijn begint al in de bocht.", "O traçado começa a ser preparado na curva.", "Anridningsvägen börjar redan i svängen.", "Линия подхода начинается ещё на повороте.", "Tor najazdu zaczynasz przygotowywać już na zakręcie.", "접근 경로는 곡선에서부터 준비해야 해."),
      tt("L'obstacle s'aborde droit et bien centré.", "Approach the obstacle straight and centred.", "El obstáculo se aborda recto y por el centro.", "L'ostacolo si affronta dritti e al centro.", "障害物にはまっすぐ、中央から向かおう。", "Reite gerade und mittig auf das Hindernis zu.", "يكون الاقتراب من الحاجز مستقيما ومن منتصفه.", "接近障碍物时要走直线，并对准中心。", "Rijd recht en in het midden naar de hindernis.", "Aborda o obstáculo em linha reta e pelo centro.", "Rid rakt och mitt på hindret.", "Подъезжай к препятствию прямо и по центру.", "Najeżdżaj na przeszkodę prosto i na środek.", "장애물은 정면에서 중심을 향해 접근해."),
      tt("Une allure régulière facilite le bon abord.", "A steady pace helps create a good approach.", "Un aire regular facilita una buena aproximación.", "Un'andatura regolare facilita un buon avvicinamento.", "一定のリズムが良いアプローチにつながる。", "Ein gleichmäßiges Tempo erleichtert einen guten Anritt.", "يساعد الإيقاع المنتظم على الاقتراب الجيد من الحاجز.", "稳定的步态节奏有助于良好的接近。", "Een gelijkmatig tempo helpt bij een goede aanrijdroute.", "Uma andadura regular facilita uma boa aproximação.", "Ett jämnt tempo hjälper dig till en bra anridning.", "Ровный темп помогает правильно подойти к препятствию.", "Równe tempo ułatwia prawidłowy najazd.", "일정한 리듬을 유지하면 장애물에 더 잘 접근할 수 있어."),
      tt("L'équilibre compte autant que la vitesse.", "Balance matters as much as speed.", "El equilibrio importa tanto como la velocidad.", "L'equilibrio conta quanto la velocità.", "スピードと同じくらいバランスが大切だ。", "Gleichgewicht ist genauso wichtig wie Geschwindigkeit.", "التوازن مهم بقدر أهمية السرعة.", "平衡和速度同样重要。", "Evenwicht is net zo belangrijk als snelheid.", "O equilíbrio é tão importante como a velocidade.", "Balansen är lika viktig som farten.", "Равновесие не менее важно, чем скорость.", "Równowaga jest równie ważna jak prędkość.", "속도만큼 균형도 중요해."),
      tt("Les dernières foulées demandent des aides discrètes.", "The final strides call for subtle aids.", "Los últimos trancos requieren ayudas discretas.", "Le ultime falcate richiedono aiuti discreti.", "最後の数歩では、控えめな扶助を心がけよう。", "Auf den letzten Galoppsprüngen sind feine Hilfen gefragt.", "تحتاج الخطوات الأخيرة إلى مساعدات خفيفة ودقيقة.", "最后几步需要轻柔、细致的扶助。", "De laatste galopsprongen vragen om subtiele hulpen.", "As últimas passadas pedem ajudas discretas.", "De sista galoppsprången kräver fina hjälper.", "На последних темпах нужны мягкие и точные средства управления.", "Ostatnie foule wymagają delikatnych pomocy.", "마지막 몇 걸음에서는 부조를 섬세하게 사용해야 해.")
    ],
    fin: tt("La confiance grandit quand tu prépares sans brusquer.", "Confidence grows when you prepare without rushing.", "La confianza crece cuando preparas sin precipitarte.", "La fiducia cresce quando prepari senza fretta.", "慌てずに準備することが、自信につながる。", "Vertrauen wächst, wenn du ohne Hektik vorbereitest.", "تنمو الثقة عندما تستعد دون تسرع.", "从容准备，会让你越来越有信心。", "Vertrouwen groeit wanneer je voorbereidt zonder te haasten.", "A confiança cresce quando te preparas sem pressa.", "Självförtroendet växer när du förbereder dig utan stress.", "Уверенность растёт, когда ты готовишься без спешки.", "Pewność siebie rośnie, gdy przygotowujesz się bez pośpiechu.", "서두르지 않고 준비할 때 자신감이 자라.")
  },
  "g3-saut": {
    coach: tt("Commence avec un obstacle adapté à ton niveau, choisi par ton enseignant. L'objectif est de comprendre le mouvement et de rester serein, pas de sauter toujours plus haut.", "Start with an obstacle suited to your level, chosen by your instructor. The goal is to understand the movement and stay calm, not to jump higher and higher.", "Empieza con un obstáculo adaptado a tu nivel, elegido por tu profesor. El objetivo es comprender el movimiento y mantener la calma, no saltar cada vez más alto.", "Inizia con un ostacolo adatto al tuo livello, scelto dal tuo istruttore. L'obiettivo è capire il movimento e restare sereno, non saltare sempre più in alto.", "先生が選んだ、自分のレベルに合う障害物から始めよう。大切なのは高さではなく、動きを理解して落ち着いて跳ぶことだよ。", "Beginne mit einem Hindernis, das dein Reitlehrer passend für dich auswählt. Wichtig ist, die Bewegung zu verstehen und ruhig zu bleiben, nicht immer höher zu springen.", "ابدأ بحاجز يناسب مستواك ويختاره مدربك. الهدف هو فهم الحركة والحفاظ على هدوئك، وليس القفز أعلى في كل مرة.", "从教练为你选择的、适合你水平的障碍开始。目标是理解跳跃动作并保持冷静，而不是不断跳得更高。", "Begin met een hindernis die je instructeur bij jouw niveau vindt passen. Het doel is de beweging te begrijpen en rustig te blijven, niet steeds hoger te springen.", "Começa com um obstáculo adequado ao teu nível, escolhido pelo teu instrutor. O objetivo é compreender o movimento e manter a calma, não saltar cada vez mais alto.", "Börja med ett hinder som din ridlärare har valt för din nivå. Målet är att förstå rörelsen och vara lugn, inte att hoppa allt högre.", "Начни с препятствия по своему уровню, выбранного тренером. Твоя цель — понять движение и сохранять спокойствие, а не прыгать всё выше.", "Zacznij od przeszkody dopasowanej do twojego poziomu przez instruktora. Celem jest zrozumienie ruchu i zachowanie spokoju, a nie coraz wyższe skoki.", "선생님이 네 수준에 맞게 정해 준 장애물부터 시작해. 중요한 건 더 높이 뛰는 게 아니라 움직임을 이해하고 침착하게 타는 거야."),
    hb: [
      tt("Pourquoi ai-je parfois l'impression de sauter avant mon cheval ?", "Why do I sometimes feel like I'm jumping before my horse?", "¿Por qué a veces siento que salto antes que mi caballo?", "Perché a volte mi sembra di saltare prima del mio cavallo?", "どうして馬より先に跳んでしまう気がするの？", "Warum habe ich manchmal das Gefühl, vor meinem Pferd abzuspringen?", "لماذا أشعر أحيانا أنني أقفز قبل حصاني؟", "为什么我有时感觉自己比马更早跳起来？", "Waarom voelt het soms alsof ik vóór mijn paard spring?", "Porque é que às vezes sinto que salto antes do meu cavalo?", "Varför känns det ibland som om jag hoppar före hästen?", "Почему мне иногда кажется, что я прыгаю раньше лошади?", "Dlaczego czasem czuję, że skaczę wcześniej niż mój koń?", "가끔 내가 말보다 먼저 뛰는 것처럼 느껴지는 이유는 뭘까?"),
      tt("Comment éviter de gêner son encolure pendant le saut ?", "How can I avoid restricting my horse's neck during the jump?", "¿Cómo puedo evitar molestar al cuello de mi caballo durante el salto?", "Come posso evitare di ostacolare il collo del cavallo durante il salto?", "ジャンプ中、馬の首の動きを邪魔しないにはどうすればいい？", "Wie verhindere ich, dass ich den Hals meines Pferdes beim Sprung behindere?", "كيف أتجنب إعاقة حركة رقبة حصاني أثناء القفز؟", "跳跃时，我怎样避免限制马颈的运动？", "Hoe voorkom ik dat ik de hals van mijn paard hinder tijdens de sprong?", "Como evito dificultar o movimento do pescoço do cavalo durante o salto?", "Hur undviker jag att störa hästens halsrörelse under språnget?", "Как мне не мешать движениям шеи лошади во время прыжка?", "Jak nie przeszkadzać koniowi w ruchu szyi podczas skoku?", "점프할 때 말의 목 움직임을 방해하지 않으려면 어떻게 해야 할까?"),
      tt("Comment retrouver une position stable juste après la réception ?", "How can I regain a stable position just after landing?", "¿Cómo puedo recuperar una posición estable justo después de la recepción?", "Come posso ritrovare una posizione stabile subito dopo l'atterraggio?", "着地直後に安定した姿勢を取り戻すには？", "Wie finde ich direkt nach der Landung wieder eine stabile Position?", "كيف أستعيد وضعيتي المتوازنة بعد الهبوط مباشرة؟", "落地后，我怎样尽快恢复稳定的骑乘姿势？", "Hoe vind ik vlak na de landing weer een stabiele houding?", "Como recupero uma posição estável logo após a receção?", "Hur hittar jag en stabil sits direkt efter landningen?", "Как вернуть устойчивую посадку сразу после приземления?", "Jak odzyskać stabilną pozycję zaraz po lądowaniu?", "착지 직후 안정된 자세를 다시 잡으려면 어떻게 해야 할까?")
    ],
    defi: {
      titre: tt("Détective des litières", "Bedding detective", "Detective de camas", "Detective delle lettiere", "敷料たんてい", "Einstreu-Detektiv", "محقق الفرشة", "垫料侦探", "Strooiseldetective", "Detetive das camas", "Strödetektiv", "Детектив подстилки", "Detektyw ściółki", "깔짚 탐정"),
      accroche: tt("Avec ton enseignant, regarde au ralenti une courte vidéo de saut.", "With your instructor, watch a short jumping video in slow motion.", "Con tu profesor, mira a cámara lenta un vídeo corto de un salto.", "Con il tuo istruttore, guarda al rallentatore un breve video di un salto.", "先生と一緒にジャンプの短い動画をスロー再生で見よう。", "Sieh dir mit deinem Reitlehrer ein kurzes Springvideo in Zeitlupe an.", "مع مدربك، شاهد مقطعا قصيرا لقفزة بالحركة البطيئة.", "和教练一起慢速观看一段短的跳跃视频。", "Bekijk met je instructeur een korte springvideo in slow motion.", "Com o teu instrutor, vê um vídeo curto de um salto em câmara lenta.", "Titta med din ridlärare på en kort hoppvideo i slow motion.", "Вместе с тренером посмотри короткое видео прыжка в замедлении.", "Z instruktorem obejrzyj krótki film ze skoku w zwolnionym tempie.", "선생님과 함께 짧은 점프 영상을 느린 화면으로 봐."),
      points: [
        tt("Repère l'appel, le passage au-dessus de l'obstacle et la réception, puis décris ce que fait le cheval.", "Identify take-off, the moment over the obstacle and landing, then describe what the horse does.", "Identifica la batida, el paso sobre el obstáculo y la recepción, y describe lo que hace el caballo.", "Individua lo stacco, il passaggio sopra l'ostacolo e l'atterraggio, poi descrivi cosa fa il cavallo.", "踏み切り、障害物の上を越える瞬間、着地を見つけて、馬の動きを説明してみよう。", "Erkenne Absprung, Flug über dem Hindernis und Landung und beschreibe die Bewegungen des Pferdes.", "حدد لحظة الارتقاء والمرور فوق الحاجز والهبوط، ثم صف ما يفعله الحصان.", "找出起跳、越过障碍和落地的时刻，再描述马的动作。", "Herken de afzet, de sprong over de hindernis en de landing en beschrijf wat het paard doet.", "Identifica a chamada, a passagem sobre o obstáculo e a receção, e descreve os movimentos do cavalo.", "Hitta avsprånget, passagen över hindret och landningen och beskriv hästens rörelser.", "Найди отталкивание, пролёт над препятствием и приземление, затем опиши движения лошади.", "Wskaż odbicie, przelot nad przeszkodą i lądowanie, a potem opisz ruch konia.", "도약, 장애물 위를 지나는 순간, 착지를 찾아 말의 움직임을 설명해.")
      ]
    },
    synth: [
      tt("L'abord prépare le tracé, l'allure et l'équilibre.", "The approach prepares the line, pace and balance.", "La aproximación prepara la trayectoria, el aire y el equilibrio.", "L'avvicinamento prepara la traiettoria, l'andatura e l'equilibrio.", "アプローチでは、進路、歩様、バランスを整える。", "Beim Anreiten bereitest du Linie, Tempo und Gleichgewicht vor.", "يهيئ الاقتراب المسار والمشية والتوازن.", "接近阶段要准备好路线、步态和重心平衡。", "De aanrijroute bereidt de lijn, het tempo en het evenwicht voor.", "A aproximação prepara o traçado, a andadura e o equilíbrio.", "Anridningen förbereder väg, tempo och balans.", "На подходе готовятся траектория, темп и равновесие.", "Najazd przygotowuje tor jazdy, tempo i równowagę.", "접근 단계에서는 경로와 보법, 균형을 준비해."),
      tt("À la battue d'appel, le cheval pousse sur ses postérieurs.", "At take-off, the horse pushes with its hind legs.", "En la batida, el caballo se impulsa con sus posteriores.", "Allo stacco, il cavallo spinge con i posteriori.", "踏み切りでは、馬が後肢で地面を蹴る。", "Beim Absprung stößt sich das Pferd mit den Hinterbeinen ab.", "عند الارتقاء، يدفع الحصان جسمه بقوائمه الخلفية.", "起跳时，马用后肢蹬地发力。", "Bij de afzet duwt het paard zich af met de achterbenen.", "Na chamada, o cavalo impulsiona-se com os posteriores.", "Vid avsprånget skjuter hästen ifrån med bakbenen.", "При отталкивании лошадь толкается задними ногами.", "Przy odbiciu koń odpycha się tylnymi nogami.", "도약할 때 말은 뒷다리로 땅을 밀어 올려."),
      tt("La montée précède le planer au-dessus de l'obstacle.", "The upward phase comes before the flight over the obstacle.", "La fase ascendente precede al vuelo sobre el obstáculo.", "La fase ascendente precede il volo sopra l'ostacolo.", "上昇の動きの後に、障害物の上を越える空中期が続く。", "Auf die Aufwärtsbewegung folgt die Flugphase über dem Hindernis.", "تسبق مرحلة الصعود مرحلة الطيران فوق الحاجز.", "上升阶段之后，马进入越过障碍的腾空阶段。", "De stijgende fase komt vóór de zweeffase boven de hindernis.", "A fase ascendente antecede o voo sobre o obstáculo.", "Uppåtfasen kommer före svävmomentet över hindret.", "Подъём предшествует полёту над препятствием.", "Faza wznoszenia poprzedza przelot nad przeszkodą.", "상승 단계 다음에는 장애물 위를 넘는 공중 단계가 이어져."),
      tt("La descente conduit à la réception sur les antérieurs.", "The downward phase leads to landing on the forelegs.", "La fase descendente lleva a la recepción sobre los anteriores.", "La discesa porta all'atterraggio sugli anteriori.", "下降の後、前肢から着地する。", "Auf die Abwärtsbewegung folgt die Landung auf den Vorderbeinen.", "تؤدي مرحلة النزول إلى الهبوط على القوائم الأمامية.", "下降阶段之后，马以前肢先着地。", "De dalende fase leidt tot de landing op de voorbenen.", "A descida conduz à receção sobre os anteriores.", "Nedåtfasen leder till landning på frambenen.", "После снижения лошадь приземляется на передние ноги.", "Po fazie opadania koń ląduje na przednich nogach.", "하강 단계가 끝나면 앞다리부터 착지해."),
      tt("Le cavalier accompagne chaque phase sans gêner le mouvement.", "The rider follows every phase without restricting the movement.", "El jinete acompaña cada fase sin obstaculizar el movimiento.", "Il cavaliere accompagna ogni fase senza ostacolare il movimento.", "騎手は馬の動きを妨げず、各段階に合わせて動く。", "Du begleitest jede Phase, ohne die Bewegung des Pferdes zu stören.", "يرافق الفارس كل مرحلة دون إعاقة حركة الحصان.", "骑手要顺应每个阶段，不妨碍马的动作。", "De ruiter volgt elke fase zonder de beweging te hinderen.", "O cavaleiro acompanha cada fase sem dificultar o movimento.", "Du följer varje fas utan att störa hästens rörelse.", "Всадник сопровождает каждую фазу, не мешая движению лошади.", "Jeździec podąża za każdą fazą, nie przeszkadzając koniowi w ruchu.", "기승자는 말의 움직임을 방해하지 않으면서 모든 단계를 따라가.")
    ],
    fin: tt("Chaque petit saut compris te rapproche d'un geste plus juste.", "Every small jump you understand brings you closer to riding with greater feel.", "Cada pequeño salto que comprendes te acerca a una equitación más precisa.", "Ogni piccolo salto che comprendi ti avvicina a un gesto più preciso.", "小さなジャンプを理解するたびに、より良い騎乗へ近づける。", "Jeder kleine Sprung, den du verstehst, bringt dich zu feinerem Reiten.", "كل قفزة صغيرة تفهمها تقربك من ركوب أكثر دقة.", "每理解一次小小的跳跃，你就离更准确的骑乘更近一步。", "Elke kleine sprong die je begrijpt, helpt je nauwkeuriger rijden.", "Cada pequeno salto que compreendes aproxima-te de uma equitação mais precisa.", "Varje litet språng du förstår hjälper dig att rida mer följsamt.", "Каждый понятый тобой маленький прыжок делает твою езду точнее.", "Każdy zrozumiany mały skok przybliża cię do dokładniejszej jazdy.", "작은 점프 하나를 이해할 때마다 더 정확하게 탈 수 있게 돼.")
  }
};


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

/* 01/11 : numéro du Galop lu dans l'identifiant du cours (g3-c1 -> « Galop 3 ») ; avant : « Galop 1 » écrit en dur */
function galopDe(cours) { var m = /^g(\d+)-/.exec((cours && cours.id) || ""); return "Galop " + (m ? m[1] : "1"); }
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
  var poser = function (it, seg) {
    var s = sorte(seg.f);
    /* 01/11 (Galop 3 et suivants) : la phrase de fin des cours est un encadré « citation » SANS titre, en fin de cours ->
       page de fin (avant : rattachée par erreur aux questions Hey Baby et perdue). Galop 1 inchangé (déjà publié). */
    if (s === "suite" && !/^g1-/.test(cours.id) && seg.f && seg.f.variante === "citation") s = "citFin";
    if (s === "suite" && derniere) { derniere.suite.push(seg.x); return; }
    var o = { seg: seg.x, fr: seg.f, suite: [] };
    if (s === "citation") s = "citFin";
    if (s === "objectif") { derniere = o; return; }   /* retiré : doublon (rien ne s'y rattache à l'affichage) */
    if (special[s]) {
      special[s].push(o); derniere = o;
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
      segs.forEach(function (s) { poser(null, s); });
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
  /* images des chapitres */
  chapitres.forEach(function (c, i) { c.img = pool[i % pool.length]; c.id = "ch" + (i + 1); });
  /* citations : ouverture + couverture -> notes des premiers chapitres */
  var notes = special.citOuv.map(function (o) { return "« " + String(r(o.seg.texte) || "").replace(/^[«"\s]+|[»"\s]+$/g, "") + " »"; });
  if (couv && couv.couv && r(couv.couv.citation)) notes.push("« " + String(r(couv.couv.citation)).replace(/^[«"\s]+|[»"\s]+$/g, "") + " »" + (r(couv.couv.auteur) ? "  " + r(couv.couv.auteur) : ""));
  chapitres.forEach(function (c, i) { c.note = notes[i] || null; });
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
  return { chapitres: chapitres, coach: coach, defi: defi, hb: hb, synth: synth, citFin: citFin, couv: couv };
}

/* rendu d'une notion dans la carte de droite */
function renduNotion(o, L, lg) {
  var r = function (x) { return pickLg(x, lg); };
  var out = [], k = 0;
  var pu = function (arr) {
    if (!arr || !arr.length) return null;
    return h("ul", { key: "u" + (k++) }, arr.map(function (q, i) { var g = r(q.gras); return h("li", { key: i }, g ? h("strong", null, g + " ") : null, r(q.texte)); }));
  };
  var para = function (x) {
    var g = r(x.gras), t = r(x.texte) || "";
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
function alerteNotion(o) {
  var t = o.fr && o.fr.titre ? nettoyerTitre(o.fr.titre).toLowerCase() : "";
  return /erreur|jamais|ne pas toucher|attention/.test(t);
}

AUTO_IDS.forEach(function (id) {
  HypeCoursEditorial.config[id] = function (cours, lg, o) {
    var L = Lx(lg), r = function (x) { return pickLg(x, lg); };
    var A = construireAuto(cours, lg);
    if (!A.chapitres.length || !(cours.quiz || []).length) return { valide: false, sections: [], chapitres: [] };
    var chapitres = A.chapitres.map(function (c) { return { id: c.id, label: c.titre, img: c.img, pos: "55% 40%" }; });
    var sections = A.chapitres.map(function (c, i) {
      var items = c.notions.map(function (n) { return { titre: titreNotion(n, L, lg), alerte: alerteNotion(n), rendu: function () { return renduNotion(n, L, lg); } }; });
      var pet = (i % 2 === 1) && !/^g1-/.test(cours.id);
      return { id: c.id, ton: "photo", pet: pet, rendu: function (x) {
        return h(Chapitre, { key: c.id, id: c.id, L: x.L, rtl: x.rtl, num: (i < 9 ? "0" : "") + (i + 1), galop: galopDe(cours), titre: c.titre, sous: c.sous || null, bg: c.img, bgPos: "55% 40%", items: items, note: c.note, petrole: pet });
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
      hero: { img: (cv && r(cv.src)) || A.chapitres[0].img, pos: (cv && cv.couv && cv.couv.pos) || "50% 40%", titre: r(cours.titre), galop: galopDe(cours), duree: r(cours.duree), type: r(cours.type) },
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
        L: L, lg: lg, rtl: rtl, kicker: galopDe(cours), titre: cfg.hero.titre, Selecteur: props.Selecteur, coursId: cours.id,
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
