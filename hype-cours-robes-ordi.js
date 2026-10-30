/* =====================================================================================
   hype-cours-robes-ordi.js — VERSION ORDINATEUR du cours Galop 1 « Les robes du cheval » (g1-c7)
   30/10/2026 (v3). Programme FFE du Galop 1 : reconnaître et nommer le NOIR, l'ALEZAN et le BAI — rien d'autre.
   Les marques blanches et les autres robes ont été déplacées vers le Galop 2 (g2-robes) et le Galop 3 (g3-c7),
   et archivées dans g1-c7.horsProgramme (jamais affiché).

   Haut de page : cadre du pansage ordinateur VALIDÉ (colonne Chapitres, grand haut de page photo, 3 encarts
   distincts — coach sur photo assombrie, Hey Baby bleu pétrole, défi noir-vert liseré champagne —, 5 vignettes).
   Suite : magazine photo — 01 Comprendre, 02 Noir/alezan/bai (3 grandes compositions), 03 Comparer (bai / alezan),
   04 En pratique, 05 Quiz (une question à la fois, photo, correction et explication du cours).

   CE FICHIER NE CONTIENT AUCUN TEXTE DU COURS : tout est LU dans g1-c7 (hype-cours-galop1.js). Ici : la mise en
   page et quelques petits libellés de structure, traduits dans les 14 langues.

   BRANCHEMENT : window.HypeRobesOrdi + window.HypeRobesOrdi.ok(cours) ; appelé par EcranCoursCorps (index.html)
   seulement si cours.id === "g1-c7" ET largeur >= 1100 px. Téléphone et tablette étroite : affichage d'avant.
   À chaque modification : incrémenter VERSION et le « ?v= » de la balise <script src="hype-cours-robes-ordi.js?v=N">.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement;
var useState = React.useState, useEffect = React.useEffect;
var VERSION = 33;   /* 31/10 01h15 : menu du cours modèle B (cartes magazine) */
/* v31 :   /* 31/10 00h50 : FinCours accepte des portraits sans photo (teinte), une liste longue et l'absence de défi */
/* v30 :   /* 31/10 00h40 : phrase en double retirée, Hey Baby et défi au style de la fin, portraits plus nets */
/* v29 :   /* 31/10 00h35 : Hey Baby et défi du cavalier de la version d'avant dans la nouvelle fin */
/* v28 :   /* 31/10 00h45 : fin de cours d'après la 3e maquette (composant FinCours) ; autres Galops grisés */
/* v26 :   /* 31/10 00h15 : menu sur 2 lignes sans « Comprendre », noms des autres Galops */
/* v25 :   /* 31/10 00h30 : nouvelle page de fin (remplace l'ancienne « Cours terminé ! ») */
/* v23 :   /* 31/10 00h15 : tour des doublons — « À observer » retiré, défi seulement sur la page de fin */
/* v22 :   /* 31/10 00h10 : Galop 2/3/5 dans le menu des vignettes et les onglets ; « Galop 1 » au-dessus des robes retiré */
/* v21 :   /* 31/10 00h05 : « À retenir » des 3 robes retiré ; onglets actifs sans fond doré plein */
/* v20 :   /* 31/10 00h : En pratique sur fond noir (plus de pétrole sur pétrole) */
/* v19 :   /* 30/10 23h55 : titre sous la photo ; vague + noir à peine éclairci pour la partie 02 */
/* v18 :   /* 30/10 23h55 : encart à part pour « Les erreurs à éviter » */
/* v17 :   /* 30/10 23h50 : section 02 (noir, alezan, bai) sur fond noir */
/* v16 :   /* 30/10 23h45 : section 03 Comparer retirée (doublons : photos bai/alezan, Chez le bai/l'alezan, planche officielle) */
/* ancien : VERSION = 15;   /* 30/10 23h40 : retour à la version de 22h58 (le découpage en écrans est retiré à la demande de Blandine) */
var QUIZ_INTEGRE = false;
var FIN_ANCIENNE = false;   /* 31/10 : true = ancienne page de fin (synthèse longue + citation + bloc quiz + « Terminer le cours ») */   /* 30/10 : false = quiz de l'appli (étoiles) ; true = ancien quiz dans la page */
var PARC_LAB = { fr: "Parcours des robes", en: "Coat colour path", es: "Recorrido de las capas", it: "Percorso dei mantelli", ja: "毛色コース", de: "Fellfarben-Pfad", ar: "مسار ألوان الخيل", zh: "毛色路径", nl: "Vachtkleurenroute", pt: "Percurso das pelagens", sv: "Färgvägen", ru: "Путь по мастям", pl: "Ścieżka maści", ko: "털색 코스" };

/* ordre des langues : fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko */
var LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
function tt() { var o = {}; for (var i = 0; i < LGS.length; i++) o[LGS[i]] = arguments[i]; return o; }
var T = {
  vComprendre: tt("Comprendre", "Understand", "Comprender", "Capire", "理解する", "Verstehen", "الفهم", "理解", "Begrijpen", "Compreender", "Förstå", "Понять", "Zrozumieć", "이해하기"),
  vQuiz: tt("Quiz", "Quiz", "Quiz", "Quiz", "クイズ", "Quiz", "اختبار", "测验", "Quiz", "Quiz", "Quiz", "Викторина", "Quiz", "퀴즈"),
  secQuiz: tt("Quiz et révision", "Quiz and review", "Quiz y repaso", "Quiz e ripasso", "クイズと復習", "Quiz und Wiederholung", "اختبار ومراجعة", "测验与复习", "Quiz en herhaling", "Quiz e revisão", "Quiz och repetition", "Викторина и повторение", "Quiz i powtórka", "퀴즈와 복습"),
  coach: tt("Le conseil du coach", "The coach's tip", "El consejo del entrenador", "Il consiglio del coach", "コーチのアドバイス", "Der Tipp des Trainers", "نصيحة المدرب", "教练的建议", "De tip van de coach", "A dica do treinador", "Tränarens tips", "Совет тренера", "Rada trenera", "코치의 조언"),
  defi: tt("Le défi du cavalier", "The rider's challenge", "El reto del jinete", "La sfida del cavaliere", "ライダーへのチャレンジ", "Die Herausforderung für Reiter", "تحدي الفارس", "骑手挑战", "De uitdaging voor de ruiter", "O desafio do cavaleiro", "Ryttarens utmaning", "Вызов для всадника", "Wyzwanie jeźdźca", "라이더 챌린지"),
  heyBaby: tt("Demande à Hey Baby", "Ask Hey Baby", "Pregúntale a Hey Baby", "Chiedi a Hey Baby", "Hey Babyに聞く", "Frag Hey Baby", "اسأل Hey Baby", "问问 Hey Baby", "Vraag het Hey Baby", "Pergunta à Hey Baby", "Fråga Hey Baby", "Спроси Hey Baby", "Zapytaj Hey Baby", "Hey Baby에게 물어보기"),
  erreurs: tt("Les erreurs à éviter", "Mistakes to avoid", "Los errores que hay que evitar", "Gli errori da evitare", "避けたいミス", "Fehler, die du vermeiden solltest", "أخطاء يجب تجنبها", "要避免的错误", "Fouten die je moet vermijden", "Erros a evitar", "Misstag att undvika", "Ошибки, которых нужно избегать", "Błędy, których należy unikać", "피해야 할 실수"),
  exoRestart: tt("Recommencer", "Start again", "Empezar de nuevo", "Ricomincia", "やり直す", "Nochmal", "ابدأ من جديد", "重新开始", "Opnieuw beginnen", "Recomeçar", "Börja om", "Начать заново", "Zacznij od nowa", "다시 하기"),
  quizBtn: tt("Passer le quiz", "Take the quiz", "Hacer el quiz", "Fai il quiz", "クイズに挑戦", "Quiz starten", "ابدأ الاختبار", "开始测验", "Doe de quiz", "Fazer o quiz", "Gör quizet", "Пройти викторину", "Zrób quiz", "퀴즈 풀기"),
  terminer: tt("Terminer le cours", "Finish the lesson", "Terminar el curso", "Termina il corso", "レッスンを終える", "Kurs abschließen", "إنهاء الدرس", "完成课程", "Les afronden", "Terminar o curso", "Avsluta lektionen", "Завершить урок", "Zakończ lekcję", "수업 마치기"),
  retour: tt("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
  retourCours: tt("Revenir au cours", "Back to the lesson", "Volver al curso", "Torna al corso", "レッスンに戻る", "Zurück zum Kurs", "العودة إلى الدرس", "返回课程", "Terug naar de les", "Voltar ao curso", "Tillbaka till lektionen", "Вернуться к уроку", "Wróć do lekcji", "수업으로 돌아가기"),
  suiteFin: tt("Résumé, Hey Baby et quiz", "Summary, Hey Baby and quiz", "Resumen, Hey Baby y quiz", "Riepilogo, Hey Baby e quiz", "まとめ、Hey Baby、クイズ", "Zusammenfassung, Hey Baby und Quiz", "الملخص وHey Baby والاختبار", "总结、Hey Baby 和测验", "Samenvatting, Hey Baby en quiz", "Resumo, Hey Baby e quiz", "Sammanfattning, Hey Baby och quiz", "Итоги, Hey Baby и викторина", "Podsumowanie, Hey Baby i quiz", "요약, Hey Baby, 퀴즈"),
  chapitres: tt("Chapitres du Galop 1", "Galop 1 lessons", "Capítulos del Galop 1", "Capitoli del Galop 1", "Galop 1のレッスン", "Kapitel Galop 1", "دروس Galop 1", "Galop 1 的课程", "Lessen Galop 1", "Capítulos do Galop 1", "Lektioner Galop 1", "Уроки Galop 1", "Lekcje Galop 1", "Galop 1 수업"),
  bravo: tt("Bravo !", "Well done!", "¡Bien hecho!", "Bravo!", "正解です！", "Richtig!", "أحسنت!", "答对了！", "Goed zo!", "Muito bem!", "Bra!", "Верно!", "Brawo!", "정답이에요!"),
  pasTout: tt("Pas tout à fait.", "Not quite.", "No exactamente.", "Non proprio.", "惜しい！", "Nicht ganz.", "ليس تماماً.", "不太对。", "Net niet.", "Quase.", "Inte riktigt.", "Не совсем.", "Nie do końca.", "아쉬워요."),
  vComparer: tt("Comparer", "Compare", "Comparar", "Confrontare", "比べる", "Vergleichen", "المقارنة", "比较", "Vergelijken", "Comparar", "Jämföra", "Сравнить", "Porównaj", "비교하기"),
  vPratique: tt("En pratique", "In practice", "En la práctica", "In pratica", "実践", "In der Praxis", "في التطبيق", "实践", "In de praktijk", "Na prática", "I praktiken", "На практике", "W praktyce", "실전에서"),
  qSur: tt("Question {n} sur {t}", "Question {n} of {t}", "Pregunta {n} de {t}", "Domanda {n} di {t}", "第{n}問（全{t}問）", "Frage {n} von {t}", "السؤال {n} من {t}", "第 {n} 题，共 {t} 题", "Vraag {n} van {t}", "Pergunta {n} de {t}", "Fråga {n} av {t}", "Вопрос {n} из {t}", "Pytanie {n} z {t}", "{t}문제 중 {n}번"),
  qPrec: tt("Question précédente", "Previous question", "Pregunta anterior", "Domanda precedente", "前の問題", "Vorherige Frage", "السؤال السابق", "上一题", "Vorige vraag", "Pergunta anterior", "Föregående fråga", "Предыдущий вопрос", "Poprzednie pytanie", "이전 문제"),
  qSuiv: tt("Question suivante", "Next question", "Siguiente pregunta", "Domanda successiva", "次の問題", "Nächste Frage", "السؤال التالي", "下一题", "Volgende vraag", "Próxima pergunta", "Nästa fråga", "Следующий вопрос", "Następne pytanie", "다음 문제"),
  gal1: tt("Robes de base", "Base coats", "Capas básicas", "Mantelli di base", "基本の毛色", "Grundfarben", "الألوان الأساسية", "基本毛色", "Basiskleuren", "Pelagens de base", "Grundfärger", "Основные масти", "Maści podstawowe", "기본 모색"),
  gal2: tt("Gris, pie, tacheté", "Grey, pinto, spotted", "Tordo, pío, moteado", "Grigio, pezzato, maculato", "芦毛・ぶち・斑点", "Schimmel, Schecke, getupft", "الرمادي والأبلق والمرقط", "青毛、花斑、斑点", "Schimmel, bont, gevlekt", "Tordilho, pampa, malhado", "Skimmel, skäck, prickig", "Серая, пегая, чубарая", "Siwa, srokata, tarantowata", "회색·얼룩·점박이"),
  gal3: tt("Marques et nuances", "Markings and shades", "Marcas y matices", "Marcature e sfumature", "白斑と色合い", "Abzeichen und Nuancen", "العلامات والدرجات", "白色标记与色调", "Aftekeningen en tinten", "Marcas e nuances", "Tecken och nyanser", "Отметины и оттенки", "Odmiany i odcienie", "흰 반점과 색조"),
  gal5: tt("Pies et adjonctions", "Pintos and additions", "Píos y adiciones", "Pezzati e aggiunte", "ぶちと付加特徴", "Schecken und Zusätze", "الأبلق والإضافات", "花斑与附加特征", "Bonten en toevoegingen", "Pampas e adições", "Skäckar och tillägg", "Пегие и дополнения", "Srokate i dodatki", "얼룩과 추가 특징"),
  finTitre: tt("Tu as terminé ce cours !", "You've finished this lesson!", "¡Has terminado este curso!", "Hai finito questo corso!", "このレッスンを読み終えました！", "Du hast diese Lektion beendet!", "لقد أنهيت هذا الدرس!", "你已读完这节课！", "Je hebt deze les afgerond!", "Terminaste este curso!", "Du har gått igenom lektionen!", "Ты прошёл этот урок!", "Ukończyłeś tę lekcję!", "이 수업을 다 읽었어요!"),
  finSous: tt("Voici l'essentiel à retenir avant de passer au quiz.", "Here's what to remember before the quiz.", "Esto es lo esencial antes del quiz.", "Ecco l'essenziale da ricordare prima del quiz.", "クイズの前に覚えておきたいポイントです。", "Das Wichtigste vor dem Quiz.", "إليك أهم ما يجب تذكّره قبل الاختبار.", "测验前需要记住的要点。", "Dit moet je onthouden voor de quiz.", "O essencial a reter antes do quiz.", "Det viktigaste att komma ihåg före quizet.", "Главное, что нужно запомнить перед тестом.", "Najważniejsze przed quizem.", "퀴즈 전에 기억할 핵심이에요."),
  hbTitre: tt("Hey Baby t'accompagne", "Hey Baby is here to help", "Hey Baby te acompaña", "Hey Baby ti accompagna", "Hey Babyがサポート", "Hey Baby begleitet dich", "Hey Baby يرافقك", "Hey Baby 陪你学习", "Hey Baby helpt je", "A Hey Baby acompanha-te", "Hey Baby hjälper dig", "Hey Baby рядом", "Hey Baby ci pomoże", "Hey Baby가 함께해요"),
  hbSous: tt("Une question ? Hey Baby t'aide à observer les bons indices.", "A question? Hey Baby helps you spot the right clues.", "¿Una pregunta? Hey Baby te ayuda a observar las pistas correctas.", "Una domanda? Hey Baby ti aiuta a osservare gli indizi giusti.", "質問がある？Hey Babyが見るべきポイントを教えてくれます。", "Eine Frage? Hey Baby hilft dir, die richtigen Hinweise zu erkennen.", "لديك سؤال؟ يساعدك Hey Baby على ملاحظة الدلائل الصحيحة.", "有问题？Hey Baby 帮你找到关键线索。", "Een vraag? Hey Baby helpt je de juiste aanwijzingen te zien.", "Uma pergunta? A Hey Baby ajuda-te a observar os indícios certos.", "En fråga? Hey Baby hjälper dig att se rätt ledtrådar.", "Есть вопрос? Hey Baby поможет заметить нужные признаки.", "Masz pytanie? Hey Baby pomoże ci dostrzec właściwe wskazówki.", "궁금한 게 있나요? Hey Baby가 단서를 찾도록 도와줘요."),
  defiTitre: tt("Ton défi terrain", "Your yard challenge", "Tu reto en el terreno", "La tua sfida sul campo", "現場チャレンジ", "Deine Praxis-Challenge", "تحدّيك الميداني", "你的实地挑战", "Jouw praktijkuitdaging", "O teu desafio no terreno", "Din utmaning i stallet", "Твоё задание на практике", "Twoje wyzwanie w stajni", "현장 도전"),
  defiG1: tt("Observe trois chevaux de ton club et identifie leur robe.", "Observe three horses at your club and identify their coat colour.", "Observa tres caballos de tu club e identifica su capa.", "Osserva tre cavalli del tuo circolo e riconosci il loro mantello.", "クラブの馬を3頭観察して、毛色を見分けよう。", "Beobachte drei Pferde in deinem Stall und bestimme ihre Fellfarbe.", "راقب ثلاثة خيول في ناديك وحدّد ألوانها.", "观察俱乐部里的三匹马，说出它们的毛色。", "Bekijk drie paarden op je club en herken hun vachtkleur.", "Observa três cavalos do teu clube e identifica a pelagem.", "Titta på tre hästar i din klubb och bestäm deras färg.", "Понаблюдай за тремя лошадьми в клубе и определи их масть.", "Przyjrzyj się trzem koniom w klubie i rozpoznaj ich maść.", "클럽의 말 세 마리를 관찰하고 모색을 알아맞혀 보세요."),
  chevalN: tt("Cheval {n}", "Horse {n}", "Caballo {n}", "Cavallo {n}", "馬 {n}", "Pferd {n}", "الحصان {n}", "马 {n}", "Paard {n}", "Cavalo {n}", "Häst {n}", "Лошадь {n}", "Koń {n}", "말 {n}"),
  defiBravo: tt("Bravo, tu as relevé le défi !", "Well done, challenge complete!", "¡Bravo, has superado el reto!", "Bravo, hai superato la sfida!", "やったね、チャレンジ達成！", "Bravo, Challenge geschafft!", "أحسنت، لقد أنجزت التحدي!", "太棒了，挑战完成！", "Bravo, uitdaging gehaald!", "Bravo, cumpriste o desafio!", "Bra jobbat, utmaningen klar!", "Браво, задание выполнено!", "Brawo, wyzwanie zaliczone!", "잘했어요, 도전 완료!"),
  quizSous: tt("Vérifie tes connaissances et valide tes acquis.", "Check your knowledge and confirm what you've learned.", "Comprueba tus conocimientos y valida lo aprendido.", "Verifica le tue conoscenze e convalida ciò che hai imparato.", "知識を確認して、学んだことを確かめよう。", "Prüfe dein Wissen und festige das Gelernte.", "تحقّق من معلوماتك وثبّت ما تعلّمته.", "检验你的知识，巩固所学。", "Test je kennis en bevestig wat je hebt geleerd.", "Verifica os teus conhecimentos e valida o que aprendeste.", "Testa dina kunskaper och bekräfta det du lärt dig.", "Проверь знания и закрепи пройденное.", "Sprawdź wiedzę i potwierdź to, czego się nauczyłeś.", "지식을 확인하고 배운 것을 다져 보세요."),
  quizReussi: tt("Quiz réussi", "Quiz passed", "Quiz superado", "Quiz superato", "クイズ合格", "Quiz bestanden", "نجحت في الاختبار", "测验通过", "Quiz gehaald", "Quiz superado", "Quiz klarat", "Тест пройден", "Quiz zaliczony", "퀴즈 통과"),
  dansCours: tt("Dans ce cours", "In this lesson", "En este curso", "In questo corso", "このレッスンでは", "In dieser Lektion", "في هذا الدرس", "本课内容", "In deze les", "Neste curso", "I den här lektionen", "В этом уроке", "W tej lekcji", "이번 수업"),
  autresGal: tt("Les autres Galops", "The other Galops", "Los otros Galops", "Gli altri Galop", "ほかのギャロップ", "Die anderen Galops", "الغالوبات الأخرى", "其他 Galop", "De andere Galops", "Os outros Galops", "De andra Galops", "Другие Galop", "Pozostałe Galopy", "다른 갤럽"),
  coursFini: tt("Cours terminé !", "Lesson complete!", "¡Curso terminado!", "Corso completato!", "レッスン完了！", "Lektion abgeschlossen!", "اكتمل الدرس!", "课程完成！", "Les voltooid!", "Curso concluído!", "Lektionen klar!", "Урок пройден!", "Lekcja ukończona!", "수업 완료!"),
  coursSuivant: tt("Cours suivant", "Next lesson", "Siguiente curso", "Corso successivo", "次のレッスン", "Nächste Lektion", "الدرس التالي", "下一课", "Volgende les", "Próximo curso", "Nästa lektion", "Следующий урок", "Następna lekcja", "다음 수업"),
  retourGalops: tt("Retour aux Galops", "Back to the Galops", "Volver a los Galops", "Torna ai Galop", "ギャロップに戻る", "Zurück zu den Galops", "العودة إلى الغالوب", "返回 Galop", "Terug naar de Galops", "Voltar aos Galops", "Tillbaka till Galops", "Назад к Galop", "Powrót do Galopów", "갤럽으로 돌아가기"),
  score: tt("Ton score : {s} / {t}", "Your score: {s} / {t}", "Tu puntuación: {s} / {t}", "Il tuo punteggio: {s} / {t}", "スコア：{s} / {t}", "Dein Ergebnis: {s} / {t}", "نتيجتك: {s} / {t}", "你的得分：{s} / {t}", "Je score: {s} / {t}", "Sua pontuação: {s} / {t}", "Ditt resultat: {s} / {t}", "Твой результат: {s} / {t}", "Twój wynik: {s} / {t}", "점수: {s} / {t}")
};

/* ---------------- lecture du cours ---------------- */
function pickLg(o, lg) {
  if (o == null) return "";
  if (typeof o === "string") return o;
  if (typeof o !== "object") return String(o);
  return o[lg] || o.en || o.fr || "";
}
function arrLg(x, lg) { return Array.isArray(x) ? x : (x && (x[lg] || x.en || x.fr)) || []; }
function nettoyer(s) { return String(s || "").replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}️‍\s]+/u, "").trim(); }
function sansNum(s) { return String(s || "").replace(/^\s*\d+\s*[.)]\s*/, ""); }
function sansGuillemets(s) { return String(s || "").replace(/^[«"“]\s*|\s*[»"”]$/g, ""); }

/* morceaux d'un bloc dans la langue choisie ; le TYPE de chaque morceau est repris du français (même position),
   parce qu'en néerlandais et en russe les types ont été traduits par erreur dans le cours (kader, sectie, инструктор) */
function morceaux(contenu, lg) {
  var fr = arrLg(contenu, "fr"), loc = arrLg(contenu, lg);
  if (loc.length !== fr.length) loc = fr;
  return loc.map(function (s, i) {
    var p = s || {};
    return { k: (fr[i] || {}).k, titre: pickLg(p.titre, lg), sous: pickLg(p.sous, lg), texte: pickLg(p.texte, lg), gras: pickLg(p.gras, lg),
      puces: (p.puces || []).map(function (x) { return { gras: pickLg(x.gras, lg), texte: pickLg(x.texte, lg) }; }) };
  });
}
function lireCours(cours, lg) {
  var b = (cours && cours.blocs) || [];
  var couv = (b[0] && b[0].couv) || {};
  return {
    titre: pickLg(cours.titre, lg), duree: pickLg(cours.duree, lg), type: pickLg(cours.type, lg),
    citation: pickLg(couv.citation, lg), auteur: pickLg(couv.auteur, lg),
    t1: nettoyer(pickLg(b[1] && b[1].titre, lg)), t3: nettoyer(pickLg(b[3] && b[3].titre, lg)),
    a: morceaux(b[1] && b[1].contenu, lg),
    z: morceaux(b[3] && b[3].contenu, lg),
    tableau: { src: pickLg(b[2] && b[2].src, lg), titre: pickLg(b[2] && b[2].titre, lg), items: arrLg(b[2] && b[2].items, lg).map(function (x) { return pickLg(x, lg); }) },
    quiz: (cours.quiz || []).map(function (q) {
      return { question: pickLg(q.question, lg), options: arrLg(q.options, lg).map(function (x) { return pickLg(x, lg); }), correct: q.correct, explication: pickLg(q.explication, lg) };
    })
  };
}
/* garde : structure du cours recentré sur le Galop 1 (30/10) — sinon : affichage d'avant */
var KA = "encadre,para,para,section,section,para,encadre,section,para,encadre,section,para,encadre,section,para,encadre,section,section,section,encadre";
var KZ = "encadre,section,section,section,section,encadre";
function ok(cours) {
  try {
    if (!cours || cours.id !== "g1-c7" || !cours.blocs || cours.blocs.length !== 4 || !cours.quiz || cours.quiz.length !== 10) return false;
    var d = lireCours(cours, "fr");
    if (d.a.map(function (s) { return s.k; }).join(",") !== KA) return false;
    if (d.z.map(function (s) { return s.k; }).join(",") !== KZ) return false;
    if (d.tableau.items.length !== 3 || d.z[3].puces.length < 1 || d.a[4].puces.length < 3) return false;
    return d.quiz.every(function (q) { return q.question && q.options.length >= 2 && q.correct != null && q.correct < q.options.length; });
  } catch (e) { return false; }
}

/* ---------------- photos ---------------- */
var IMG = {
  trio: "images/robes-g1-trio.webp", noir: "images/robes-g1-noir.webp", alezan: "images/robes-g1-alezan.webp", bai: "images/robes-g1-bai.webp",
  quiz: "images/pansage-quiz.webp", cheval: "images/cheval-defaut-alezan.webp"
};
/* photo montrée APRÈS la réponse à chaque question (avant : le carnet, pour ne pas souffler la réponse) */
var PHOTO_REPONSE = ["cheval", "noir", "noir", "alezan", "bai", "bai", "alezan", "bai", "alezan", "bai"];

/* ---------------- styles ---------------- */
var CSS = [
".rbo{padding-bottom:24px;--noir:#070A08;--petrole:#101A1D;--petrole2:#101D22;--ivoire:#F3EEE4;--champ:#C9A66B;--doux:rgba(243,238,228,.78);--ligne:rgba(201,166,107,.28);background:var(--noir);color:var(--ivoire);font-family:'Montserrat','Noto Sans JP','Noto Sans Arabic',sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}",
".rbo *{box-sizing:border-box}",
".rbo h1,.rbo h2,.rbo h3,.rbo h4{font-family:'Cormorant Garamond','Noto Serif JP',Georgia,serif;font-weight:600;margin:0;color:var(--ivoire)}",
".rbo p{margin:0}",
".rbo button{font-family:inherit;cursor:pointer;color:inherit}",
".rbo a:focus-visible,.rbo button:focus-visible{outline:2px solid var(--champ);outline-offset:2px}",
".rbo-wrap{display:grid;grid-template-columns:minmax(0,1fr);min-height:100vh}",
/* colonne des chapitres (identique au pansage validé) */
".rbo-chap{display:none;background:var(--petrole);border-inline-end:1px solid rgba(201,166,107,.18);padding:22px 12px 28px;position:sticky;top:0;align-self:start;height:100vh;overflow:auto}",
".rbo-chap h3{font-size:19px;letter-spacing:.3px;margin:0 8px 14px;color:var(--champ)}",
".rbo-chap button{display:flex;gap:10px;align-items:center;width:100%;text-align:start;background:none;border:0;border-radius:10px;padding:9px 8px;font-size:12.5px;line-height:1.35;color:var(--doux)}",
".rbo-chap button:hover{background:rgba(243,238,228,.06)}",
".rbo-chap button[aria-current=true]{background:rgba(201,166,107,.16);color:var(--ivoire);font-weight:600}",
".rbo-chap .n{flex:0 0 24px;height:24px;border-radius:50%;border:1px solid var(--ligne);display:inline-flex;align-items:center;justify-content:center;font-size:10.5px;color:var(--champ)}",
".rbo-chap .n.fait{background:var(--champ);color:var(--noir);border-color:var(--champ)}",
"@media (min-width:1280px){.rbo-wrap{grid-template-columns:230px minmax(0,1fr)}.rbo-chap{display:block}}",
".rbo-main{min-width:0}",
".rbo-parc{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0;padding:26px 0 22px}",
".rbo-parc .tt{font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:#C9A66B;margin-inline-end:8px}",
".rbo-parc button{font:inherit;font-size:13px;font-weight:600;color:#F3EEE4;background:rgba(16,29,34,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.5);border:1px solid rgba(201,166,107,.35);border-radius:999px;padding:8px 18px;cursor:pointer}",
".rbo-parc button:hover{border-color:#C9A66B}",
".rbo-parc button[aria-current=true]{color:#C9A66B;border-color:#C9A66B;cursor:default}",
/* haut de page (structure validée, inchangée) */
".rbo-top{display:grid;grid-template-columns:minmax(0,1fr)}",
"@media (min-width:1480px){.rbo-top{grid-template-columns:minmax(0,1fr) 340px}}",
".rbo-hero{--ph:330px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-start;background:var(--noir);padding:calc(var(--ph) + 20px) 40px 28px}",
".rbo-hero .bg{position:absolute;inset:0 0 auto 0;height:var(--ph);background:#070A08 url(images/cheval-defaut-alezan.webp) 78% 30%/cover no-repeat}",
".rbo-hero .vo{position:absolute;inset:0 0 auto 0;height:var(--ph);background:linear-gradient(180deg,rgba(7,10,8,.45) 0%,rgba(7,10,8,0) 26%,rgba(7,10,8,0) 66%,#070A08 100%)}",
"[dir=rtl] .rbo-hero .vo{background:linear-gradient(180deg,rgba(7,10,8,.45) 0%,rgba(7,10,8,0) 26%,rgba(7,10,8,0) 66%,#070A08 100%)}",
"[dir=rtl] .rbo-hero .bg{transform:scaleX(-1)}",
".rbo-hero>*:not(.bg):not(.vo){position:relative}",
".rbo-bar{display:flex;align-items:center;gap:12px;position:absolute!important;top:18px;inset-inline:40px;z-index:2}",
".rbo-back{width:38px;height:38px;border-radius:50%;border:1px solid var(--ligne);background:rgba(7,10,8,.55);display:inline-flex;align-items:center;justify-content:center;font-size:18px}",
".rbo-crumb{font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--champ)}",
".rbo-hero h1{font-size:clamp(36px,3.5vw,54px);line-height:1.04;max-width:none;margin:0 0 8px}",
".rbo-cit{font-family:'Cormorant Garamond','Noto Serif JP',Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;max-width:480px;color:var(--ivoire)}",
".rbo-cit small{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:11.5px;letter-spacing:.6px;color:var(--champ);margin-top:6px}",
".rbo-meta{display:flex;gap:18px;flex-wrap:wrap;margin-top:16px;font-size:12.5px;color:var(--doux)}",
".rbo-meta span{display:inline-flex;align-items:center;gap:7px}",
/* les 3 encarts : 3 traitements distincts */
".rbo-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:20px 40px 14px;background:var(--noir)}",
"@media (min-width:1480px){.rbo-cards{grid-template-columns:minmax(0,1fr);padding:14px 16px 14px 14px;align-content:start}}",
".rbo-card{border-radius:14px;padding:14px 16px;text-align:start;width:100%;display:block;min-width:0}",
".rbo-card h3{font-size:19px;color:var(--ivoire);display:flex;gap:9px;align-items:center;margin-bottom:6px}",
".rbo-card h3 svg{flex:0 0 auto;color:var(--champ)}",
".rbo-card p{font-size:12.5px;line-height:1.55;color:var(--doux)}",
".rbo-defil{margin:8px 0 0;padding-inline-start:18px;display:grid;gap:3px;font-size:13px;line-height:1.45;color:var(--ivoire)}.rbo-defil li::marker{color:var(--champ)}",
".rbo-card.coach{border:1px solid rgba(201,166,107,.3);background:linear-gradient(90deg,rgba(7,10,8,.94) 42%,rgba(7,10,8,.66)),url(images/robes-g1-alezan.webp) center 30%/cover no-repeat}",
"[dir=rtl] .rbo-card.coach{background:linear-gradient(270deg,rgba(7,10,8,.94) 42%,rgba(7,10,8,.66)),url(images/robes-g1-alezan.webp) center 30%/cover no-repeat}",
".rbo-card.hb{border:1px solid rgba(243,238,228,.16);background:#101D22}",
".rbo-card.hb:hover{border-color:rgba(243,238,228,.42);background:#132329}",
".rbo-card.defi{border:1px solid rgba(201,166,107,.78);background:#0B1515}",
".rbo-card.defi:hover{border-color:var(--champ);background:#0f1c1c}",
/* vignettes */
".rbo-vig{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:14px;padding:36px 40px 20px;background:var(--noir);border-bottom:1px solid rgba(201,166,107,.14)}",
".rbo-vig button{position:relative;height:150px;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.16);background:var(--petrole) center/cover no-repeat;text-align:start;padding:0}",
".rbo-vig button:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 30%,rgba(7,10,8,.88) 100%)}",
".rbo-vig .big{text-shadow:0 2px 12px rgba(0,0,0,.75),0 0 2px rgba(0,0,0,.6);position:absolute;top:8px;inset-inline-start:14px;z-index:1;font-family:'Cormorant Garamond',serif;font-size:44px;line-height:1;font-weight:500;color:#E9D9B4}",
".rbo-vig .lab{position:absolute;inset-inline:14px 52px;bottom:12px;z-index:1;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:21px;line-height:1.1;font-weight:600}",
".rbo-vig .arr{position:absolute;bottom:10px;inset-inline-end:12px;z-index:1;width:32px;height:32px;border-radius:50%;border:1px solid #E9D9B4;display:flex;align-items:center;justify-content:center;font-size:15px;color:#E9D9B4}",
".rbo-vig button[aria-current=true]{border-color:var(--champ);box-shadow:0 0 0 1px var(--champ)}",
".rbo-vig button.gal{filter:grayscale(.85) brightness(.72);transition:filter .2s}.rbo-vig button.gal:hover,.rbo-vig button.gal:focus-visible{filter:none}",   /* 31/10 : les autres Galops un peu grisés */
".rbo-mini .sep{flex:0 0 1px;align-self:stretch;margin:6px 4px;background:rgba(201,166,107,.45)}",
".rbo-mini button.gal{border-style:dashed;border-color:rgba(201,166,107,.55)}.rbo-mini button.gal span{color:var(--champ)}",
"@media (max-width:1479px){.rbo-vig{gap:10px}.rbo-vig .lab{font-size:16px;inset-inline:12px 40px}.rbo-vig .arr{width:26px;height:26px;font-size:13px}.rbo-vig .big{font-size:36px}}",
/* barre compacte qui suit le défilement */
".rbo-minih{position:sticky;top:0;z-index:30;height:0}",
".rbo-mini{position:absolute;top:0;inset-inline:0;display:flex;gap:8px;align-items:center;padding:calc(8px + env(safe-area-inset-top)) 40px 8px;background:transparent;opacity:0;pointer-events:none;transform:translateY(-8px);transition:opacity .2s,transform .2s}",
".rbo-mini.on{opacity:1;pointer-events:auto;transform:none}",
".rbo-mini{overflow-x:auto;scrollbar-width:none}.rbo-mini::-webkit-scrollbar{display:none}",
".rbo-mini button{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(243,238,228,.18);border-radius:999px;background:rgba(16,29,34,.42);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.55);padding:7px 16px;font-size:13px;color:var(--ivoire);white-space:nowrap}",
".rbo-mini button b{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--champ);font-weight:600}",
".rbo-mini button[aria-current=true]{border-color:var(--champ);color:var(--champ)}",
/* sections : magazine, grandes photos, beaucoup d'air */
".rbo-sec{padding:76px 56px 80px;scroll-margin-top:64px}",
".rbo-sec.noir{background:var(--noir)}.rbo-sec.noir2{background:#0A1116}.rbo-sec.petrole{background:var(--petrole2)}",
".rbo-vague{display:block;width:100%;height:26px;margin:-1px 0}",
".rbo-sechead{display:flex;gap:22px;align-items:baseline;margin-bottom:42px}",
".rbo-num{font-family:'Cormorant Garamond',serif;font-size:34px;color:var(--champ);flex:0 0 auto}",
".rbo-num:after{content:'';display:block;height:1px;width:28px;background:var(--champ);margin-top:4px}",
".rbo-sec h2{font-size:clamp(32px,2.8vw,46px);line-height:1.1}",
".rbo-grid2{display:grid;grid-template-columns:minmax(0,1fr);gap:48px;align-items:start}",
"@media (min-width:1200px){.rbo-grid2{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:64px}}",
".rbo-txt{display:flex;flex-direction:column;gap:20px;font-size:16px;line-height:1.82;color:var(--doux)}",
".rbo-txt strong{color:var(--ivoire);font-weight:600}",
".rbo-txt h3{font-size:28px;color:var(--ivoire);margin-top:18px;line-height:1.15}",
".rbo-txt .sous{color:var(--champ);font-size:14px;margin-top:-6px}",
".rbo-txt ul{margin:0;padding-inline-start:22px;display:flex;flex-direction:column;gap:10px}",
".rbo-txt li::marker{color:var(--champ)}",
".rbo-call{border-inline-start:2px solid var(--champ);padding:6px 0 6px 24px;margin:22px 0 10px}",
"[dir=rtl] .rbo-call{padding:6px 24px 6px 0}",
".rbo-call h3{font-size:24px;color:var(--champ);margin:0 0 6px!important}",
".rbo-call p{color:var(--ivoire);font-size:16px;line-height:1.75}",
".rbo-photo{border-radius:18px;overflow:hidden;background:var(--petrole);position:relative;margin:0}",
".rbo-photo img{display:block;width:100%;height:100%;object-fit:cover}",
".rbo-photo figcaption{position:absolute;inset-inline:0;bottom:0;padding:40px 26px 20px;background:linear-gradient(180deg,rgba(7,10,8,0),rgba(7,10,8,.82));font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:var(--ivoire)}",
".rbo-photo.grand{aspect-ratio:4/3}",
".rbo-photo.pano{aspect-ratio:3/1;border-radius:18px}",
/* ordre d'observation (puces du cours, numérotées) */
".rbo-ordre{list-style:none;padding:0!important;margin:0;display:flex;flex-direction:column;gap:6px!important}",
".rbo-methode{border:1px solid var(--ligne);border-radius:18px;padding:30px 34px;background:rgba(16,26,29,.55)}",
".rbo-ordre li{display:flex;gap:14px;align-items:center;border-top:1px solid rgba(201,166,107,.3);padding:14px 4px 4px;color:var(--ivoire);font-size:15px;line-height:1.5}",
".rbo-ordre .nn{flex:0 0 auto;font-family:'Cormorant Garamond',serif;font-size:30px;line-height:1;color:var(--champ)}",
/* les trois robes : grandes compositions éditoriales */
".rbo-robe{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:64px;align-items:center}",
".rbo-robe+.rbo-robe{margin-top:88px}",
".rbo-robe.inv .rbo-photo{order:2}",
".rbo-robe .rbo-photo{aspect-ratio:1/1;max-height:640px}",
".rbo-robe .kick{font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:var(--champ)}",
".rbo-robe h3{font-size:clamp(40px,3.6vw,58px)!important;margin:4px 0 6px!important}",
".rbo-ret{display:flex;gap:16px;align-items:baseline;border-top:1px solid rgba(201,166,107,.35);padding-top:18px;margin-top:8px}",
".rbo-ret b{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--champ);font-weight:600;flex:0 0 auto}",
".rbo-ret span{color:var(--ivoire);font-size:15.5px;line-height:1.7}",
"@media (max-width:1279px){.rbo-robe{grid-template-columns:minmax(0,1fr);gap:30px}.rbo-robe.inv .rbo-photo{order:0}.rbo-robe .rbo-photo{aspect-ratio:4/3}}",
/* comparer */
".rbo-duel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;margin-top:44px}",
".rbo-duel .rbo-photo{aspect-ratio:4/3;margin-bottom:26px}",
".rbo-duel h3{font-size:30px!important;margin:0 0 12px!important}",
".rbo-reflexe{margin-top:64px;text-align:center;border-top:1px solid rgba(201,166,107,.3);border-bottom:1px solid rgba(201,166,107,.3);padding:34px 20px}",
".rbo-reflexe .kick{font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:var(--champ);margin-bottom:10px}",
".rbo-reflexe p{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:clamp(26px,2.4vw,36px);font-style:italic;color:var(--ivoire);line-height:1.3}",
".rbo-tableau{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:56px;align-items:center;margin-top:72px}",
".rbo-tableau img{width:100%;border-radius:14px;display:block}",
"@media (max-width:1279px){.rbo-duel,.rbo-tableau{grid-template-columns:minmax(0,1fr)}}",
/* en pratique */
".rbo-colonnes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:64px;margin-top:56px}",
".rbo-defi{border:1px solid rgba(201,166,107,.78);border-radius:18px;background:#0C1317;padding:30px 34px}",
".rbo-defi h3{color:var(--champ)!important;margin-top:0!important}",
".rbo-erreurs{border:1px solid rgba(214,122,104,.5);border-radius:18px;background:#0C1317;box-shadow:0 8px 24px rgba(0,0,0,.3);padding:30px 34px}",
".rbo-erreurs h3{color:#E9A493!important;margin-top:0!important}",
".rbo-erreurs ul{list-style:none;padding-inline-start:0}",
".rbo-erreurs li{position:relative;padding-inline-start:28px}",
".rbo-erreurs li:before{content:'✕';position:absolute;inset-inline-start:0;top:0;color:#E9A493;font-weight:700}",
".rbo-hb{display:flex;flex-wrap:wrap;gap:10px}",
".rbo-hbq{display:grid;gap:7px;margin-top:10px}",
".rbo-hbq button{display:flex;align-items:center;gap:10px;width:100%;text-align:start;border:1px solid rgba(201,166,107,.32);border-radius:12px;background:rgba(7,10,8,.5);box-shadow:0 3px 10px rgba(0,0,0,.35);padding:8px 12px;font-size:13px;line-height:1.35;color:var(--ivoire);cursor:pointer}",
".rbo-hbq button span{flex:1 1 auto;min-width:0}.rbo-hbq button i{font-style:normal;color:var(--champ);font-size:16px}",
".rbo-hbq button:hover{border-color:var(--champ)}",
".rbo-hb button{border:1px solid var(--ligne);border-radius:999px;background:rgba(7,10,8,.4);padding:10px 18px;font-size:13.5px;color:var(--ivoire);text-align:start}",
".rbo-hb button:hover{border-color:var(--champ)}",
".rbo-synth{margin-top:72px;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:56px;align-items:start}",
".rbo-synth ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 32px;counter-reset:s}",
".rbo-synth li{counter-increment:s;display:flex;gap:14px;padding:14px 0;border-top:1px solid rgba(201,166,107,.22);color:var(--ivoire);font-size:15px;line-height:1.6}",
".rbo-synth li:before{content:counter(s,decimal-leading-zero);font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--champ);flex:0 0 28px}",
".rbo .rbo-fin{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-style:italic;font-size:clamp(28px,2.6vw,40px);line-height:1.35;color:var(--ivoire);text-align:center;max-width:900px;margin:88px auto 0}",
".rbo-fin:before,.rbo-fin:after{content:'';display:block;width:40px;height:1px;background:var(--champ);margin:0 auto 26px}",
".rbo-fin:after{margin:26px auto 0}",
"@media (max-width:1279px){.rbo-colonnes,.rbo-synth{grid-template-columns:minmax(0,1fr);gap:40px}}",
/* quiz : une question à la fois, photo à côté */
".rbo-qz{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:48px;align-items:stretch}",
".rbo-prog{display:flex;align-items:center;gap:16px;margin-bottom:26px;font-size:13px;color:var(--doux)}",
".rbo-prog .barre{flex:1;height:3px;background:rgba(243,238,228,.12);border-radius:3px;overflow:hidden}",
".rbo-prog .barre i{display:block;height:100%;background:var(--champ);transition:width .25s}",
".rbo-q h3{font-size:clamp(26px,2.2vw,34px)!important;line-height:1.25!important;margin:0 0 26px!important}",
".rbo-opts{display:flex;flex-direction:column;gap:12px}",
".rbo-opts button{display:flex;gap:14px;align-items:center;text-align:start;border:1px solid rgba(243,238,228,.18);border-radius:12px;background:rgba(16,26,29,.6);padding:15px 18px;font-size:15px;line-height:1.45;color:var(--ivoire)}",
".rbo-opts button:hover:not(:disabled){border-color:var(--champ)}",
".rbo-opts .lt{flex:0 0 28px;height:28px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:12.5px;color:var(--champ)}",
".rbo-opts button.bon{border-color:#9ad6a4;background:rgba(154,214,164,.1)}.rbo-opts button.bon .lt{background:#9ad6a4;border-color:#9ad6a4;color:#070A08}",
".rbo-opts button.mauvais{border-color:#e3a78f;background:rgba(227,167,143,.1)}.rbo-opts button.mauvais .lt{background:#e3a78f;border-color:#e3a78f;color:#070A08}",
".rbo-opts button:disabled{cursor:default}",
".rbo-res{margin-top:22px;border-inline-start:2px solid var(--champ);padding:4px 0 4px 20px;font-size:15px;line-height:1.7;color:var(--doux)}",
"[dir=rtl] .rbo-res{padding:4px 20px 4px 0}",
".rbo-res.ok strong{color:#9ad6a4}.rbo-res.ko strong{color:#e3a78f}",
".rbo-qnav{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}",
".rbo-btn{border-radius:999px;padding:12px 24px;font-size:14px;font-weight:600;border:1px solid var(--champ);background:none;color:var(--champ)}",
".rbo-btn:hover:not(:disabled){background:rgba(201,166,107,.12)}",
".rbo-btn:disabled{opacity:.35;cursor:default}",
".rbo-btn.neutre{border-color:rgba(243,238,228,.3);color:var(--ivoire)}",
".rbo-qz .rbo-photo{min-height:420px}",
".rbo-score{margin-top:30px;font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--champ)}",
".rbo-cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:56px;padding-top:40px;border-top:1px solid rgba(201,166,107,.2)}",
"@media (max-width:1279px){.rbo-qz{grid-template-columns:minmax(0,1fr)}.rbo-qz .rbo-photo{min-height:0;aspect-ratio:16/9}}",
"@media (max-width:1479px){.rbo-sec{padding:64px 44px 70px}}",
"@media (max-width:1279px){.rbo-mini,.rbo-vig,.rbo-hero,.rbo-cards{padding-inline:28px}.rbo-bar{inset-inline:28px}.rbo-sec{padding:56px 32px 62px}}",
".rbo-cards.deux{grid-template-columns:repeat(2,minmax(0,1fr))}",
"@media (min-width:1480px){.rbo-cards.deux{grid-template-columns:minmax(0,1fr)}.rbo-top.seul{grid-template-columns:minmax(0,1fr)}}",
".rbo-f{background:var(--noir);padding:0 40px 56px}",
".rbo-f-bar{display:flex;align-items:center;gap:12px;padding:18px 0 0}",
".rbo-f-head{text-align:center;padding:26px 0 34px;display:flex;flex-direction:column;align-items:center;gap:8px}",
".rbo-f-ok{width:64px;height:64px;border-radius:50%;border:1.5px solid var(--champ);display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--champ);box-shadow:0 0 0 6px rgba(201,166,107,.08),0 10px 30px rgba(0,0,0,.4)}",
".rbo-f-kick{font-size:11.5px;letter-spacing:1.8px;text-transform:uppercase;color:var(--champ);margin:6px 0 0}",
".rbo-f-head h1{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:clamp(34px,3.4vw,50px);font-weight:600;line-height:1.05;margin:0;color:var(--ivoire)}",
".rbo-f-xp{display:inline-block;margin-top:4px;padding:5px 14px;border-radius:999px;border:1px solid rgba(201,166,107,.5);color:var(--champ);font-size:13px;font-weight:600}",
".rbo-f-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;max-width:1080px;margin:0 auto}",
".rbo-f-col{display:grid;gap:16px;align-content:start}",
".rbo-f .rbo-card{padding:20px 22px}.rbo-f .rbo-card h3{font-size:22px;margin-bottom:10px}.rbo-f .rbo-card p{font-size:14px}",
".rbo-f-ess{border:1px solid rgba(201,166,107,.32);background:#0C1317}",
".rbo-f-ess ul{list-style:none;margin:0;padding:0;display:grid;gap:0}",
".rbo-f-ess li{position:relative;padding:8px 0 8px 20px;border-top:1px solid rgba(201,166,107,.14);font-size:14.5px;line-height:1.45;color:var(--ivoire)}",
".rbo-f-ess li:first-child{border-top:0}",
".rbo-f-ess li:before{content:'';position:absolute;inset-inline-start:2px;top:16px;width:6px;height:6px;border-radius:50%;background:var(--champ)}",
"[dir=rtl] .rbo-f-ess li{padding:8px 20px 8px 0}",
".rbo-f .rbo-defil{font-size:14px}",
".rbo-f-quiz{grid-column:1/-1;position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(201,166,107,.55);background:linear-gradient(90deg,rgba(7,10,8,.92) 30%,rgba(7,10,8,.35)),url(images/pansage-quiz.webp) center 40%/cover no-repeat;padding:26px 26px}",
".rbo-f-quiz h3{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:26px;font-weight:600;color:var(--ivoire);margin:0 0 14px}",
".rbo-f-act{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:1080px;margin:28px auto 0}",
".rbo-fc{background:var(--noir);padding:0 0 24px}",
".rbo-fc-hero{position:relative;overflow:hidden;min-height:560px;background:#070A08}",
".rbo-fc-hero .ph{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}",
".rbo-fc-hero .vo{position:absolute;inset:0;background:linear-gradient(90deg,#070A08 0%,rgba(7,10,8,.94) 34%,rgba(10,17,22,.55) 62%,rgba(7,10,8,.15) 100%),linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 72%,#070A08 100%)}",
"[dir=rtl] .rbo-fc-hero .vo{background:linear-gradient(270deg,#070A08 0%,rgba(7,10,8,.94) 34%,rgba(10,17,22,.55) 62%,rgba(7,10,8,.15) 100%),linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 72%,#070A08 100%)}",
"[dir=rtl] .rbo-fc-hero .ph{transform:scaleX(-1)}.rbo-fc-hero .ph.flip{transform:scaleX(-1)}[dir=rtl] .rbo-fc-hero .ph.flip{transform:none}",
".rbo-fc-hero .bar{position:relative;z-index:2;display:flex;align-items:center;padding:18px 40px 0}",
".rbo-fc-hero .in{position:relative;z-index:1;max-width:560px;padding:26px 40px 40px}",
".rbo-fc .kick{font-size:11.5px;letter-spacing:2px;text-transform:uppercase;color:var(--champ);margin:0 0 10px}",
".rbo-fc-hero h2{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:clamp(38px,3.6vw,54px);font-weight:600;line-height:1.02;color:var(--ivoire);margin:0}",
".rbo-fc-hero .trait{display:block;width:48px;height:2px;background:var(--champ);margin:16px 0 14px}",
".rbo-fc .sous{font-size:14px;line-height:1.55;color:var(--doux);margin:0}",
".rbo-fc-hero .ok{margin:10px 0 0;font-size:13px;color:var(--champ)}.rbo-fc-hero .ok span{letter-spacing:2px}",
".rbo-fc-por{list-style:none;margin:22px 0 0;padding:0;position:relative}",
".rbo-fc-por li{display:grid;grid-template-columns:auto 14px minmax(0,1fr);align-items:center;gap:0 14px;padding:6px 0;position:relative}",
".rbo-fc-por li:before{content:'';position:absolute;inset-inline-start:calc(var(--r) + 20px);top:0;bottom:0;width:1px;background:rgba(201,166,107,.45)}",
".rbo-fc-por li:first-child:before{top:50%}.rbo-fc-por li:last-child:before{bottom:50%}",
".rbo-fc-por{--r:84px}.rbo-fc-por.nb{--r:62px}.rbo-fc-por.nb li{padding:4px 0}.rbo-fc-por.nb .tx b{font-size:19px}.rbo-fc-por.nb .tx span{font-size:13px}",
".rbo-fc-por .rond{width:var(--r);height:var(--r);border-radius:50%;border:1.5px solid var(--champ);background-size:220%;background-repeat:no-repeat;box-shadow:0 8px 22px rgba(0,0,0,.5)}",
".rbo-fc-por .pt{width:7px;height:7px;border-radius:50%;background:var(--champ);justify-self:center;position:relative;z-index:1}",
".rbo-fc-por .tx{display:flex;flex-direction:column;gap:2px}",
".rbo-fc-por .tx b{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:22px;font-weight:600;color:var(--ivoire)}",
".rbo-fc-por .tx span{font-size:13.5px;line-height:1.45;color:var(--doux)}",
".rbo-fc-hero .note{margin:14px 0 0;font-size:13px;line-height:1.5;color:var(--champ);font-style:italic}",
".rbo-fc-duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;padding:56px 40px 0;max-width:1180px;margin:0 auto}",
".rbo-fc-hb,.rbo-fc-defi{border-radius:18px;padding:22px 24px;border:1px solid rgba(201,166,107,.22);background:linear-gradient(180deg,#132228,#0F1B20)}",
".rbo-fc-defi{background:linear-gradient(180deg,#0E181C,#0B1417)}",
".rbo-fc h3{display:flex;align-items:center;gap:10px;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:26px;font-weight:600;color:var(--ivoire);margin:0 0 6px}",
".rbo-fc h3 svg{color:var(--champ);flex:0 0 auto}",
".rbo-fc-hbc{display:grid;gap:10px;margin-top:16px}",
".rbo-fc-q{display:flex;align-items:center;gap:14px;width:100%;text-align:start;border:1px solid rgba(201,166,107,.28);border-radius:14px;background:linear-gradient(90deg,rgba(27,49,56,.95),rgba(23,42,48,.92));padding:8px 14px 8px 8px;color:var(--ivoire);font-size:14.5px;line-height:1.35;cursor:pointer}",
"[dir=rtl] .rbo-fc-q{padding:8px 8px 8px 14px}",
".rbo-fc-q:hover,.rbo-fc-q:focus-visible{border-color:rgba(201,166,107,.55)}",
".rbo-fc-q .vi{flex:0 0 auto;width:72px;height:50px;border-radius:9px;background-size:260%;background-repeat:no-repeat}",
".rbo-fc-q .qt{flex:1 1 auto;min-width:0}.rbo-fc-q i{font-style:normal;color:var(--champ);font-size:20px;flex:0 0 auto}",
".rbo-fc-hb .pts{display:none}",
".rbo-fc-duo.ancien{align-items:stretch}.rbo-fc-duo.ancien.seul{grid-template-columns:minmax(0,1fr);max-width:760px}",
".rbo-fc-duo.ancien .rbo-card{padding:22px 24px;border-radius:18px;border:1px solid rgba(201,166,107,.22);background:linear-gradient(180deg,#132228,#0F1B20);box-shadow:0 14px 34px rgba(0,0,0,.35)}",
".rbo-fc-duo.ancien .rbo-card.defi{background:linear-gradient(180deg,#0E181C,#0B1417)}",
".rbo-fc-duo.ancien .rbo-card h3{font-size:26px;margin-bottom:12px}",
".rbo-fc-duo.ancien .rbo-card p{font-size:14px;line-height:1.55;color:var(--doux)}",
".rbo-fc-duo.ancien .rbo-hbq{gap:10px;margin-top:4px}",
".rbo-fc-duo.ancien .rbo-hbq button{border:1px solid rgba(201,166,107,.28);border-radius:14px;background:linear-gradient(90deg,rgba(27,49,56,.95),rgba(23,42,48,.92));box-shadow:none;padding:12px 14px;font-size:14px}",
".rbo-fc-duo.ancien .rbo-hbq button:hover{border-color:rgba(201,166,107,.55)}",
".rbo-fc-duo.ancien .rbo-defil{font-size:14px;gap:6px;margin-top:12px;padding:14px 16px 14px 34px;border:1px solid rgba(201,166,107,.18);border-radius:14px;background:rgba(7,10,8,.35)}",
"[dir=rtl] .rbo-fc-duo.ancien .rbo-defil{padding:14px 34px 14px 16px}",
".rbo-fc-defi .ronds{display:flex;justify-content:space-around;gap:10px;margin-top:20px;padding:16px 8px;border:1px solid rgba(201,166,107,.18);border-radius:14px;background:rgba(7,10,8,.35)}",
".rbo-fc-defi .ronds button{display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:0;cursor:pointer;color:var(--ivoire);padding:2px}",
".rbo-fc-defi .c{width:48px;height:48px;border-radius:50%;border:1px solid var(--champ);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--champ);transition:background .2s}",
".rbo-fc-defi .c.on{background:rgba(201,166,107,.16)}",
".rbo-fc-defi .l{font-size:12.5px;color:var(--doux)}",
".rbo-fc-defi .bravo{margin:14px 0 0;text-align:center;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:20px;color:var(--champ)}",
".rbo-fc-quiz{position:relative;margin:56px max(40px,calc((100% - 1100px) / 2)) 0;border-radius:20px;overflow:hidden;border:1px solid rgba(201,166,107,.4);background-size:cover;background-position:center 22%;min-height:220px;display:flex;align-items:center}",
".rbo-fc-quiz:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.94) 0%,rgba(7,10,8,.78) 42%,rgba(7,10,8,.2) 100%)}",
"[dir=rtl] .rbo-fc-quiz:before{background:linear-gradient(270deg,rgba(7,10,8,.94) 0%,rgba(7,10,8,.78) 42%,rgba(7,10,8,.2) 100%)}",
".rbo-fc-quiz .in{position:relative;padding:30px 34px;max-width:480px}",
".rbo-fc-quiz h3{font-size:34px;margin:0 0 6px}.rbo-fc-quiz p{color:var(--ivoire);opacity:.85;font-size:14.5px;line-height:1.5;margin:0 0 18px}",
".rbo-fc-nav{max-width:1100px;margin:56px auto 0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:0 40px}",
".rbo-fc-nav .lig{display:flex;align-items:center;gap:16px;width:100%}",
".rbo-fc-nav .lig>span{flex:1;height:1px;background:rgba(201,166,107,.3)}",
".rbo-fc-nav .suiv{border:1px solid rgba(201,166,107,.6);border-radius:999px;background:rgba(7,10,8,.4);color:var(--champ);font-size:14px;font-weight:600;padding:11px 22px;cursor:pointer;max-width:72%;text-align:center}",
".rbo-fc-nav .gal{background:none;border:0;color:var(--doux);font-size:13.5px;text-decoration:underline;text-underline-offset:4px;cursor:pointer;padding:6px}",
"@media (max-width:1279px){.rbo-fc-duo{grid-template-columns:minmax(0,1fr)}}",
"@media (prefers-reduced-motion:reduce){.rbo-fc-hbc{scroll-behavior:auto}.rbo-fc-defi .c{transition:none}}",
".rbo-ong{padding:30px 40px 24px;background:var(--noir);border-bottom:1px solid rgba(201,166,107,.14)}",
".rbo-ong .st{display:flex;align-items:center;gap:12px;font-size:10.5px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:var(--champ);margin:0 0 12px}",
".rbo-ong .st:after{content:'';flex:1;height:1px;background:rgba(201,166,107,.25)}",
".rbo-ong .g+.st{margin-top:22px}",
".rbo-ong .g{display:grid;gap:14px;grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}",
".rbo-ong .g.autres{grid-template-columns:repeat(5,minmax(0,1fr))}",
".rbo-ong .c{display:block;background:none;border:0;padding:0;margin:0;text-align:start;cursor:pointer;color:var(--ivoire);font:inherit;min-width:0}",
".rbo-ong .ph{display:block;aspect-ratio:4/3;border-radius:12px;background-size:cover;background-repeat:no-repeat;border:1px solid rgba(201,166,107,.25);transition:border-color .2s,box-shadow .2s,filter .2s}",
".rbo-ong .c:hover .ph,.rbo-ong .c:focus-visible .ph{border-color:rgba(201,166,107,.6)}",
".rbo-ong .c[aria-current=true] .ph{border-color:var(--champ);box-shadow:0 0 0 1px var(--champ)}",
".rbo-ong .n{display:block;font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1;color:var(--champ);margin-top:8px}",
".rbo-ong .t{display:block;font-size:13px;line-height:1.3;margin-top:3px}",
".rbo-ong .o .ph{filter:grayscale(.85) brightness(.75)}.rbo-ong .o:hover .ph,.rbo-ong .o:focus-visible .ph{filter:none}.rbo-ong .o .t{color:var(--doux)}",
"@media (max-width:1279px){.rbo-ong{padding-inline:28px}}",
".rbo-coachfin{background:#0A1116;padding:56px 40px 64px;display:grid;gap:28px;justify-items:center}",
".rbo-coachfin .rbo-card{max-width:860px;padding:26px 30px}.rbo-coachfin .rbo-card h3{font-size:26px}.rbo-coachfin .rbo-card p{font-size:17px}",
".rbo-retcours{background:var(--noir);padding:22px 40px 0}",
".rbo-citband{background:var(--noir);padding:64px 56px 28px;text-align:center}",
".rbo-citband .rbo-cit{max-width:860px;margin:0 auto;font-size:clamp(26px,2.4vw,36px);line-height:1.35}",
".rbo-citband .rbo-cit:before,.rbo-citband .rbo-cit:after{content:'';display:block;width:44px;height:1px;background:var(--champ);margin:0 auto 24px}",
".rbo-citband .rbo-cit:after{margin:24px auto 0}",
".rbo-citband .rbo-cit small{font-size:12.5px;letter-spacing:1.4px;text-transform:uppercase;margin-top:14px}",
"@media (max-width:1279px){.rbo-citband{padding:52px 32px 22px}}",
/* 30/10 (soir) — VERSION TÉLÉPHONE : même page, mise en page empilée (écran <= 760 px). La barre du bas de l'appli reste visible : marge en bas. */
"@media (max-width:760px){",
".rbo .rbo-ong{padding:24px 16px 20px}.rbo .rbo-ong .g,.rbo .rbo-ong .g.autres{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 9px}",
".rbo .rbo-ong .g:not(.autres) .ph{aspect-ratio:4/5}.rbo .rbo-ong .n{font-size:18px;margin-top:7px}.rbo .rbo-ong .t{font-size:12px}",
".rbo .rbo-fc-hero{min-height:0}.rbo .rbo-fc-hero .bar{padding:14px 16px 0}.rbo .rbo-fc-hero .in{padding:12px 16px 26px;max-width:none}",
".rbo .rbo-fc-hero .vo,[dir=rtl] .rbo .rbo-fc-hero .vo{background:linear-gradient(90deg,rgba(7,10,8,.94) 0%,rgba(7,10,8,.72) 50%,rgba(7,10,8,.18) 100%),linear-gradient(180deg,rgba(7,10,8,.4) 0%,rgba(7,10,8,0) 30%,#070A08 100%)}",
".rbo .rbo-fc-hero h2{font-size:36px}.rbo .rbo-fc-hero .sous{max-width:none}",
".rbo .rbo-fc-por{--r:70px;margin-top:18px}.rbo .rbo-fc-por.nb{--r:56px}.rbo .rbo-fc-por li{gap:0 10px;padding:4px 0}.rbo .rbo-fc-por li:before{inset-inline-start:calc(var(--r) + 16px)}",
".rbo .rbo-fc-por .tx b{font-size:20px}.rbo .rbo-fc-por .tx span{font-size:13px}",
".rbo .rbo-fc-duo{padding:36px 16px 0;gap:36px}",
".rbo .rbo-fc-hb,.rbo .rbo-fc-defi,.rbo .rbo-fc-duo.ancien .rbo-card{padding:18px 16px}.rbo .rbo-fc-duo.ancien .rbo-card h3{font-size:23px}",
".rbo .rbo-fc h3{font-size:23px}",
".rbo .rbo-fc-hbc{display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin-top:14px;scroll-behavior:smooth}",
".rbo .rbo-fc-hbc::-webkit-scrollbar{display:none}",
".rbo .rbo-fc-q{flex:0 0 100%;scroll-snap-align:start;font-size:14px}",
".rbo .rbo-fc-hb .pts{display:flex;justify-content:center;gap:8px;margin-top:12px}",
".rbo .rbo-fc-hb .pts button{width:7px;height:7px;padding:0;border-radius:50%;border:0;background:rgba(243,238,228,.28);cursor:pointer}",
".rbo .rbo-fc-hb .pts button[aria-current=true]{background:var(--ivoire)}",
".rbo .rbo-fc-defi .c{width:44px;height:44px}",
".rbo .rbo-fc-quiz{margin:36px 16px 0;min-height:0}.rbo .rbo-fc-quiz .in{padding:22px 18px}.rbo .rbo-fc-quiz h3{font-size:30px}",
".rbo .rbo-fc-quiz:before,[dir=rtl] .rbo .rbo-fc-quiz:before{background:linear-gradient(90deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.7) 60%,rgba(7,10,8,.35) 100%)}",
".rbo .rbo-fc-nav{margin-top:36px;padding:0 16px 84px}.rbo .rbo-fc-nav .suiv{max-width:none;font-size:13.5px;padding:11px 16px}.rbo .rbo-fc-nav .lig{gap:10px}",
".rbo .rbo-finpage>div{padding-top:8px!important}",
".rbo .rbo-f{padding:0 16px 40px}.rbo .rbo-f-grid{grid-template-columns:minmax(0,1fr);gap:12px}.rbo .rbo-f-col{gap:12px}.rbo .rbo-f-head{padding:18px 0 24px}.rbo .rbo-f-head h1{font-size:34px}.rbo .rbo-f .rbo-card{padding:16px 16px}.rbo .rbo-f .rbo-card h3{font-size:20px}.rbo .rbo-f-quiz{padding:20px 18px}.rbo .rbo-f-act{flex-direction:column;align-items:stretch}.rbo .rbo-f-act .rbo-btn{width:100%}",
".rbo{padding-bottom:110px;overflow-x:clip}",
".rbo .rbo-parc{padding:14px 16px 12px;gap:8px}.rbo .rbo-parc .tt{flex:0 0 100%;margin:0 0 2px}.rbo .rbo-parc button{padding:7px 14px;font-size:12.5px}",
".rbo .rbo-hero{--ph:240px;padding:calc(var(--ph) + 14px) 18px 16px}",
".rbo .rbo-hero .vo,[dir=rtl] .rbo .rbo-hero .vo{background:linear-gradient(180deg,rgba(7,10,8,.5) 0%,rgba(7,10,8,0) 30%,rgba(7,10,8,0) 62%,#070A08 100%)}",
".rbo .rbo-bar{top:14px;inset-inline:16px}.rbo .rbo-crumb{display:none}",
".rbo .rbo-hero h1{font-size:34px;max-width:100%;margin:0 0 6px}",
".rbo .rbo-citband{padding:40px 24px 14px}.rbo .rbo-citband .rbo-cit{font-size:22px}.rbo .rbo-meta{gap:12px;font-size:12px;margin-top:12px}",
".rbo .rbo-cards{grid-template-columns:minmax(0,1fr);padding:14px 16px 8px;gap:10px}",
".rbo .rbo-vig{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px;padding:26px 16px 16px}",
".rbo .rbo-vig button{height:104px}",
".rbo .rbo-vig .big{font-size:24px;top:6px;inset-inline-start:9px}",
".rbo .rbo-vig .lab,.rbo .rbo-vig.n6 .lab{font-size:12.5px!important;line-height:1.15;inset-inline:9px 9px;bottom:9px;max-width:none}",
".rbo .rbo-vig .arr{display:none}",
".rbo .rbo-mini{padding:calc(8px + env(safe-area-inset-top)) 14px 10px;overflow-x:auto}",
".rbo .rbo-coachfin{padding:36px 16px 44px}.rbo .rbo-coachfin .rbo-card{padding:18px 18px}.rbo .rbo-coachfin .rbo-card h3{font-size:22px}.rbo .rbo-coachfin .rbo-card p{font-size:15px}.rbo .rbo-retcours{padding:16px 16px 0}",
".rbo .rbo-photo.trio{aspect-ratio:auto}.rbo .rbo-photo.trio img{height:auto;object-fit:contain}",
".rbo .rbo-sec{padding:40px 20px 46px;scroll-margin-top:52px}",
".rbo .rbo-sechead{gap:14px;margin-bottom:24px}.rbo .rbo-num{font-size:28px}.rbo .rbo-sec h2{font-size:28px}",
".rbo .rbo-grid2,.rbo .rbo-duo,.rbo .rbo-trio,.rbo .rbo-duel,.rbo .rbo-tableau,.rbo .rbo-colonnes,.rbo .rbo-synth,.rbo .rbo-synth ol,.rbo .rbo-avant,.rbo .rbo-qz{grid-template-columns:minmax(0,1fr);gap:24px}",
".rbo .rbo-duo,.rbo .rbo-trio,.rbo .rbo-tableau,.rbo .rbo-synth{margin-top:36px}",
".rbo .rbo-adj{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 14px;margin-top:30px}.rbo .rbo-adj strong{font-size:19px}.rbo .rbo-adj>div{font-size:13.5px}",
".rbo .rbo-txt{font-size:15.5px;line-height:1.75;gap:16px}.rbo .rbo-txt h3{font-size:24px;margin-top:10px}",
".rbo .rbo-robe{grid-template-columns:minmax(0,1fr);gap:22px}.rbo .rbo-robe+.rbo-robe{margin-top:44px}",
".rbo .rbo-robe.inv .rbo-photo{order:0}.rbo .rbo-robe .rbo-photo{aspect-ratio:4/3;max-height:none}",
".rbo .rbo-robe h3,.rbo .rbo-trio h3,.rbo .rbo-duo h3,.rbo .rbo-duel h3,.rbo .rbo-sig h3,.rbo .rbo-mqz h3{font-size:28px!important}",
".rbo .rbo-sec div[style*='margin-top: 88px'],.rbo .rbo-sec div[style*='margin-top:88px']{margin-top:44px!important}",
".rbo .rbo-sec div[style*='margin-top: 64px'],.rbo .rbo-sec div[style*='margin-top:64px']{margin-top:36px!important}",
".rbo .rbo-photo.pano{aspect-ratio:2/1}.rbo .rbo-photo.pano.trio{aspect-ratio:auto}.rbo .rbo-photo.pano.trio img{height:auto;object-fit:contain}.rbo .rbo-photo figcaption{font-size:17px;padding:24px 14px 10px}",
/* 30/10 : titres moins gros sur téléphone (« pas besoin de titres aussi gros ») */
".rbo .rbo-sechead{gap:10px;margin-bottom:18px}.rbo .rbo-num{font-size:20px}.rbo .rbo-num:after{width:20px}.rbo .rbo-sec h2{font-size:21px;line-height:1.2}",
".rbo .rbo-txt h3{font-size:18px;margin-top:6px}",
".rbo .rbo-robe h3,.rbo .rbo-trio h3,.rbo .rbo-duo h3,.rbo .rbo-duel h3,.rbo .rbo-sig h3,.rbo .rbo-mqz h3{font-size:21px!important}",
".rbo .rbo-card h3{font-size:17px}.rbo .rbo-coachfin .rbo-card h3{font-size:19px}",
".rbo .rbo-ring{width:30%;inset-inline-end:8px;bottom:-14px}",
".rbo .rbo-fac{margin-top:44px;padding:22px 18px}.rbo .rbo-fac summary{font-size:21px;gap:10px;flex-wrap:wrap}.rbo .rbo-fac[open] summary{margin-bottom:20px}",
".rbo .rbo-methode,.rbo .rbo-defi,.rbo .rbo-erreurs,.rbo .rbo-sig,.rbo .rbo-memo{padding:20px 18px}",
".rbo .rbo-ordre li{font-size:14.5px;padding:12px 2px 4px}.rbo .rbo-ordre .nn{font-size:26px}",
".rbo .rbo-reflexe{margin-top:40px;padding:26px 8px}",
".rbo .rbo-synth{gap:12px}.rbo .rbo-synth ol{gap:0}.rbo .rbo-synth li{padding:9px 0;font-size:14.5px;line-height:1.45}.rbo .rbo-ret{flex-direction:column;gap:4px}",
".rbo .rbo-fin{font-size:24px;margin:52px auto 0}",
".rbo .rbo-q h3{font-size:24px!important;margin-bottom:20px!important}.rbo .rbo-opts button{padding:13px 14px;font-size:14.5px}",
".rbo .rbo-qz .rbo-photo{aspect-ratio:16/9;min-height:0}.rbo .rbo-qnav .rbo-btn{padding:11px 18px}",
".rbo .rbo-cta{margin-top:40px;padding-top:28px}",
".rbo .rbo-mqz{margin-top:36px;padding-top:28px}.rbo .rbo-mq>p{font-size:21px}",
"}"
].join("\n");

/* ---------------- icônes ---------------- */
function ico(path, w) { return h("svg", { width: w || 20, height: w || 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, path.map(function (d, i) { return h("path", { key: i, d: d }); })); }
var ICO = {
  coupe: function (w) { return ico(["M8 21h8", "M12 17v4", "M7 4h10v5a5 5 0 0 1-10 0V4z", "M17 5h3v2a3 3 0 0 1-3 3", "M7 5H4v2a3 3 0 0 0 3 3"], w); },
  bulle: function (w) { return ico(["M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.3A8 8 0 1 1 21 12z", "M9 11h6", "M9 14h4"], w); },
  horloge: function (w) { return ico(["M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z", "M12 8v4l3 2"], w); },
  livre: function (w) { return ico(["M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5z", "M18 3v16"], w); }
};

function HypeRobesOrdi(props) {
  var cours = props.cours, lg = props.langue || "fr";
  var L = function (k) { var o = T[k]; return (o && (o[lg] || o.en || o.fr)) || ""; };
  var d = lireCours(cours, lg), a = d.a, z = d.z, Q = d.quiz;
  var rtl = lg === "ar";

  var _e = useState("s1"), actif = _e[0], setActif = _e[1];
  var _m = useState(false), mini = _m[0], setMini = _m[1];
  var _r = useState({}), reps = _r[0], setReps = _r[1];
  var _q = useState(0), qi = _q[0], setQi = _q[1];
  var _v = useState("cours"), vue = _v[0], setVue = _v[1];   /* 30/10 : « cours » (page longue) ou « fin » (Hey Baby, défi, résumé, quiz) */

  useEffect(function () {
    var on = function () { var el = document.querySelector(".rbo-ong"); setMini(el ? el.getBoundingClientRect().bottom < 0 : false); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return function () { window.removeEventListener("scroll", on); };
  }, [vue]);
  useEffect(function () {
    var els = ["s1", "s2", "s4", "s5"].map(function (i) { return document.getElementById("rbo-" + i); }).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) setActif(en.target.id.replace("rbo-", "")); }); }, { rootMargin: "-25% 0px -62% 0px", threshold: 0 });
    els.forEach(function (e) { io.observe(e); });
    return function () { io.disconnect(); };
  }, [vue]);

  var aller = function (id) { var el = document.getElementById("rbo-" + id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  var haut = function () { var el = document.querySelector(".rbo"); if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" }); };
  var versFin = function () { setVue("fin"); setTimeout(haut, 30); if (props.onValider) props.onValider(); };   /* 31/10 : arriver sur la page de fin = cours terminé (XP), sans l'ancienne page de l'appli */
  var versCours = function (id) { setVue("cours"); setTimeout(function () { if (id) aller(id); else haut(); }, 60); };
  var nav = function (id) { if (id === "s5") versFin(); else aller(id); };
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: d.titre, score: null, cheval: null, question: q || "" }; } catch (e) { }
    props.setEcran("assistant");
  };
  var Selecteur = props.Selecteur;
  var fmt = function (k, o) { return L(k).replace(/\{(\w)\}/g, function (m, c) { return o[c]; }); };

  function M(s, key) {   /* rendu d'un morceau du cours */
    if (!s) return null;
    var puces = s.puces.length ? h("ul", null, s.puces.map(function (p, i) { return h("li", { key: i }, p.gras ? h("strong", null, p.gras + " ") : null, p.texte); })) : null;
    if (s.k === "para") return h("p", { key: key }, s.gras ? h("strong", null, s.gras + " ") : null, s.texte);
    if (s.k === "encadre") return h("aside", { key: key, className: "rbo-call" }, h("h3", null, nettoyer(s.titre)), s.texte ? h("p", null, s.texte) : null, puces);
    return h(React.Fragment, { key: key }, s.titre ? h("h3", null, nettoyer(sansNum(s.titre))) : null, s.sous ? h("p", { className: "sous" }, s.sous) : null, s.texte ? h("p", null, s.texte) : null, puces);
  }
  function Vague(de, vers) {
    return h("svg", { className: "rbo-vague", viewBox: "0 0 1000 26", preserveAspectRatio: "none", "aria-hidden": true, style: { background: de } },
      h("path", { d: "M0 9 Q160 26 360 12 Q560 -2 770 13 Q890 21 1000 9 L1000 26 L0 26Z", fill: vers }),
      h("path", { d: "M0 9 Q160 26 360 12 Q560 -2 770 13 Q890 21 1000 9", fill: "none", stroke: "rgba(201,166,107,.35)", strokeWidth: 1 }));
  }
  function Sec(id, num, titre, ton, enfants) {
    return h("section", { id: "rbo-" + id, className: "rbo-sec " + ton },
      h("div", { className: "rbo-sechead" }, num ? h("div", { className: "rbo-num" }, num) : null, h("h2", null, titre)), enfants);   /* 31/10 : l'introduction n'a plus de numéro */
  }
  function Photo(cle, cls, legende) {
    return h("figure", { className: "rbo-photo " + (cls || "") }, h("img", { src: IMG[cle], alt: legende || "", loading: "lazy" }), legende ? h("figcaption", null, legende) : null);
  }
  function Robe(i, cle, inv) {   /* titre+texte, nuance, « À retenir » du cours */
    var t = a[i], p = a[i + 1], r = a[i + 2], nom = sansNum(t.titre);
    return h("article", { className: "rbo-robe" + (inv ? " inv" : "") },
      Photo(cle, "", null),
      h("div", { className: "rbo-txt" },
        h("h3", null, nom),
        h("p", null, t.texte), h("p", null, p.texte)));   /* 31/10 : « À retenir » retiré (redit le texte) — reste dans les données */
  }

  var nomsTrois = Q[1] && Q[1].options[Q[1].correct] || "";    /* « Noir, alezan et bai » dans la langue choisie (réponse juste de la question 2) */
  var vig = [
    { id: "s1", lab: L("vComprendre"), img: IMG.cheval, pos: "80% 40%" },
    { id: "s2", lab: nomsTrois, img: IMG.noir, pos: "60% 40%" },
    { id: "s4", lab: L("vPratique"), img: IMG.alezan, pos: "70% 40%" },
    { id: "s5", lab: L("vQuiz"), img: IMG.quiz, pos: "center" }
  ];
  var vigM = vig.slice(1);   /* 31/10 (Blandine) : « Comprendre » n'est plus dans le menu (2 lignes de 3) ; la section reste en haut du cours */
  var galLab = function (n) { return L("gal" + n) + " (G" + n + ")"; };
  /* 31/10 : les robes des autres Galops, dans le même menu que les vignettes */
  var autresG = props.onOuvrirRobes ? [
    { id: "g2-robes", n: 2, img: "images/robes-g2-pie.webp", pos: "60% 40%" },
    { id: "g3-c7", n: 3, img: "images/robes-g3-palomino.webp", pos: "60% 40%" },
    { id: "g5-robes", n: 5, img: "images/robes-g5-aubere.webp", pos: "60% 40%" }
  ] : [];
  /* page de fin : cours suivant, XP gagnés (seulement si le cours n'était pas déjà terminé à l'ouverture) */
  var liste = props.coursListe || [], idxC = liste.findIndex(function (c) { return c && c.id === cours.id; });
  var suivant = (idxC >= 0 && liste[idxC + 1] && props.onOuvrirCours) ? liste[idxC + 1] : null;
  var _gx = useState(function () { return (props.coursTermines || []).indexOf(cours.id) < 0; }), gagneXp = _gx[0];
  var hbQ = z[3].puces.map(function (p) { return p.texte; });
  /* 30/10 : « pas besoin d'en mettre autant » — la carte montre la 1re question, la liste en garde 2 des plus intéressantes (3 en tout) ; les autres restent dans les données du cours */
  var hbListe = [hbQ[0], hbQ[1], hbQ[3]].filter(Boolean);   /* 30/10 23h40 : 3 questions en tout, regroupées dans la carte Hey Baby */
  var defiAccroche = String(z[2].sous || "").replace(/\s*[:：]\s*$/, "") + " …";
  var NOIR = "#070A08", NOIR2 = "#0A1116", PET = "#101D22";

  /* quiz */
  var q = Q[qi], rep = reps[qi], repondu = rep !== undefined, juste = repondu && rep === q.correct;
  var nbRep = Object.keys(reps).length, nbJuste = Object.keys(reps).filter(function (k) { return reps[k] === Q[k].correct; }).length;
  var photoQ = repondu ? PHOTO_REPONSE[qi] || "quiz" : "quiz";

  var ANCIENNE_FIN = FIN_ANCIENNE ? h(React.Fragment, null,
          h("div", { className: "rbo-retcours" }, h("button", { type: "button", className: "rbo-btn neutre", onClick: function () { versCours(null); } }, (rtl ? "→ " : "← ") + L("retourCours"))),
          h("section", { id: "rbo-s4f", className: "rbo-sec petrole" }, h("div", null,
            h("div", { className: "rbo-synth", style: { marginTop: 0 } },
              h("div", { className: "rbo-txt" }, h("h3", { style: { marginTop: 0 } }, nettoyer(z[4].titre))),
              h("ol", null, z[4].puces.map(function (p, i) { return h("li", { key: i }, p.texte); }))),
            h("p", { className: "rbo-fin" }, "« " + sansGuillemets(z[5].texte) + " »"))),
          Vague(PET, NOIR),
        /* 05 — QUIZ : les 10 questions du cours, une à la fois, correction et explication du cours */
        /* 30/10 : le quiz est celui de l'appli (écran « quiz » : correction, étoiles du cours sur le menu des Galops). L'ancien quiz intégré est gardé, désactivé (QUIZ_INTEGRE). */
        QUIZ_INTEGRE ? (
        Sec("s5", "03", L("secQuiz"), "noir",
          h("div", null,
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
              Photo(photoQ, "", null)),
            h("div", { className: "rbo-cta" },
              h("button", { type: "button", className: "rbo-btn", onClick: function () { props.setEcran("quiz"); } }, L("quizBtn")),
              h("button", { type: "button", className: "rbo-btn", onClick: function () { if (props.onTerminer) props.onTerminer(); } }, L("terminer")))))) :
        Sec("s5", "03", L("secQuiz"), "noir",
          h("div", null,
            Photo("quiz", "pano", null),
            h("div", { className: "rbo-cta" },
              h("button", { type: "button", className: "rbo-btn", onClick: function () { props.setEcran("quiz"); } }, L("quizBtn")),
              h("button", { type: "button", className: "rbo-btn neutre", onClick: function () { if (props.onTerminer) props.onTerminer(); } }, L("terminer")))))) : null;
  return h("div", { className: "rbo", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, CSS),
    h("div", { className: "rbo-wrap" },
      h("nav", { className: "rbo-chap", "aria-label": L("chapitres") },
        h("h3", null, L("chapitres")),
        (props.coursListe || []).map(function (c, i) {
          var fait = (props.coursTermines || []).indexOf(c.id) >= 0;
          return h("button", { key: c.id, type: "button", "aria-current": c.id === cours.id ? "true" : undefined, onClick: function () { if (c.id !== cours.id && props.onOuvrirCours) props.onOuvrirCours(c.id); } },
            h("span", { className: "n" + (fait ? " fait" : "") }, fait ? "✓" : String(i + 1)), h("span", null, typeof c.titre === "string" ? c.titre : pickLg(c.titre, lg)));
        })),
      h("main", { className: "rbo-main" },
        /* 31/10 : la barre « Parcours des robes » du haut est remplacée par des onglets Galop 2/3/5 dans le menu des vignettes (Blandine) */
        vue !== "cours" ? null : h("div", { className: "rbo-top seul" },
          h("header", { className: "rbo-hero" },
            h("div", { className: "bg", role: "img", "aria-label": d.titre }), h("div", { className: "vo" }),
            h("div", { className: "rbo-bar" },
              h("button", { type: "button", className: "rbo-back", "aria-label": L("retour"), onClick: props.onRetour }, rtl ? "›" : "‹"),
              h("span", { className: "rbo-crumb" }, "Galop 1  ›  " + d.titre),
              h("span", { style: { marginInlineStart: "auto" } }, Selecteur ? h(Selecteur, { compact: true }) : null)),
            h("h1", null, d.titre),
            h("div", { className: "rbo-meta" },
              d.duree ? h("span", null, ICO.horloge(16), d.duree) : null,
              d.type ? h("span", null, ICO.livre(16), d.type) : null,
              h("span", null, ICO.coupe(16), "Galop 1")))),

        vue !== "cours" ? null : h(React.Fragment, null,
        d.citation ? h("div", { className: "rbo-citband" }, h("p", { className: "rbo-cit" }, "«\u00A0" + sansGuillemets(d.citation) + "\u00A0»", d.auteur ? h("small", null, d.auteur) : null)) : null,
        h(Onglets, { L: L, vig: vigM, autres: autresG, actif: actif, nav: nav, onAutre: function (g) { props.onOuvrirRobes(g.n, g.id); } }),   /* 31/10 : modèle B */
        h("div", { className: "rbo-minih" },
          h("div", { className: "rbo-mini" + (mini ? " on" : ""), "aria-hidden": mini ? undefined : true },
            vigM.map(function (v, i) { return h("button", { key: v.id, type: "button", tabIndex: mini ? 0 : -1, "aria-current": actif === v.id ? "true" : undefined, onClick: function () { nav(v.id); } }, h("b", null, "0" + (i + 1)), v.lab); }),
            autresG.map(function (g, k) { return h("button", { key: g.id, type: "button", tabIndex: mini ? 0 : -1, onClick: function () { props.onOuvrirRobes(g.n, g.id); } }, h("b", null, "G" + g.n), L("gal" + g.n)); })))),


        vue !== "cours" ? null : h(React.Fragment, null,
        /* 01 — COMPRENDRE : a[1]…a[6] (a[0] = citation d'ouverture, dans le haut de page) */
        Sec("s1", "", d.t1, "noir",
          h("div", null,
            h("div", { className: "rbo-grid2" },
              h("div", { className: "rbo-txt" }, M(a[1], "a1"), M(a[2], "a2"), M(a[3], "a3")),
              h("div", { className: "rbo-txt rbo-methode" },
                h("h3", { style: { marginTop: 0 } }, nettoyer(sansNum(a[4].titre))), a[4].sous ? h("p", { className: "sous" }, a[4].sous) : null,
                h("ol", { className: "rbo-ordre" }, a[4].puces.map(function (p, i) { return h("li", { key: i }, h("span", { className: "nn" }, "0" + (i + 1)), h("span", null, p.texte)); })))),
            h("div", { style: { marginTop: 64 } }, Photo("trio", "pano trio", null)),
            h("div", { className: "rbo-txt", style: { marginTop: 48, maxWidth: 820 } }, M(a[5], "a5")))),   /* 31/10 : « À observer » (a[6]) retiré — redit le 2e paragraphe */
        Vague(NOIR, NOIR2),
        /* 02 — NOIR, ALEZAN, BAI : a[7]…a[15], trois grandes compositions */
        Sec("s2", "01", nomsTrois, "noir2",   /* 30/10 : fond noir à peine éclairci (Blandine), vague gardée */
          h("div", null, Robe(7, "noir", false), Robe(10, "alezan", true), Robe(13, "bai", false))),
        Vague(NOIR2, NOIR),

        /* 03 — COMPARER retiré le 30/10 (Blandine : « vire tous les doublons ») : tout y redisait la section 02 et les erreurs à éviter ; les textes restent dans les données */
        /* 04 — EN PRATIQUE : z[1]…z[5] (z[0], le conseil du coach, est dans le haut de page) */
        Sec("s4", "02", d.t3 || L("vPratique"), "noir",   /* 30/10 : plus de pétrole sous les encarts (Blandine) */
          h("div", null,
            Photo("cheval", "pano", null),
            h("div", { className: "rbo-erreurs rbo-txt", style: { marginTop: 40, maxWidth: 820 } }, M(z[1], "z1")))),   /* 30/10 : encart à part ; 31/10 : le défi est sur la page de fin */
        Vague(NOIR, NOIR2),
        /* conseil du coach : en bas de la page du cours, juste avant la page de fin */
        h("div", { className: "rbo-coachfin" },
          h("div", { className: "rbo-card coach" }, h("h3", null, ICO.coupe(20), nettoyer(z[0].titre)), h("p", null, z[0].texte)),
          h("button", { type: "button", className: "rbo-btn", onClick: versFin }, L("suiteFin") + (rtl ? " ←" : " →")))),
        /* 31/10 : PAGE DE FIN refaite (Blandine : « même la dernière page c'est nimp ») — une seule page, sans doublons :
           Cours terminé + XP, l'essentiel, Hey Baby (3 questions), le défi, le quiz de l'appli (étoiles), cours suivant / retour aux Galops.
           Elle remplace l'ancienne page « Cours terminé ! » de l'appli. L'ancienne page de fin (synthèse + citation + bloc quiz) est gardée, désactivée (FIN_ANCIENNE). */
        vue !== "fin" ? null : (FIN_ANCIENNE ? ANCIENNE_FIN : h(FinCours, {
          L: L, lg: lg, rtl: rtl, kicker: "Galop 1", titre: d.titre, Selecteur: Selecteur, coursId: cours.id,
          heroImg: "images/robes-g3-epis.webp", heroPos: "62% 45%", heroFlip: true,
          portraits: [[7, IMG.noir], [10, IMG.alezan], [13, IMG.bai]].map(function (x) {
            var r = a[x[0] + 2], t = String(r.texte || ""), k = t.search(/[=＝]/);
            t = (k >= 0 ? t.slice(k + 1) : t).trim(); t = t.charAt(0).toUpperCase() + t.slice(1);
            return { img: x[1], pos: "100% 2%", nom: sansNum(a[x[0]].titre), desc: t };
          }),
          note: "",   /* 31/10 : « Je regarde toujours… » retiré — redit la liste du défi */
          hb: hbListe, hbImgs: [{ img: IMG.bai, pos: "100% 4%" }, { img: IMG.alezan, pos: "100% 4%" }, { img: IMG.noir, pos: "100% 4%" }],
          onHey: hey, defiTexte: L("defiG1"), defiN: 3,
          defiSeg: { titre: nettoyer(z[2].titre), sous: z[2].sous, texte: z[2].texte, puces: z[2].puces },
          quizImg: "images/galops-v2-carte-quiz-hd1.jpg", onQuiz: function () { props.setEcran("quiz"); }, quizScore: props.quizScore,
          suivant: suivant ? { titre: (typeof suivant.titre === "string" ? suivant.titre : pickLg(suivant.titre, lg)), onClick: function () { props.onOuvrirCours(suivant.id); } } : null,
          onGalops: props.onRetour, onRetourCours: function () { versCours(null); }
        })),
        /* (31/10 : la page de fin du matin — ✓ / Cours terminé / cartes — est remplacée par FinCours, d'après la maquette validée) */
        /* fin de page Hype (composant commun de l'appli), comme sur les autres pages */
        (typeof FinPageHype === "function") ? h("div", { className: "rbo-finpage" }, h(FinPageHype, null)) : null
      )));
}
/* 31/10 — MENU DU COURS, modèle B choisi par Blandine : cartes magazine, numéro et titre SOUS la photo ;
   « Dans ce cours » puis « Les autres Galops » (photos grisées). Partagé par les 4 cours de robes. */
function Onglets(c) {
  var L = c.L;
  return h("div", { className: "rbo-ong" },
    h("div", { className: "st" }, L("dansCours")),
    h("div", { className: "g", role: "tablist", style: { "--n": c.vig.length } }, c.vig.map(function (v, i) {
      return h("button", { key: v.id, type: "button", role: "tab", className: "c", "aria-current": c.actif === v.id ? "true" : undefined, onClick: function () { c.nav(v.id); } },
        h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + v.img + ")", backgroundPosition: v.pos || "center" } }),
        h("span", { className: "n" }, "0" + (i + 1)), h("span", { className: "t" }, v.lab));
    })),
    c.autres.length ? h("div", { className: "st" }, L("autresGal")) : null,
    c.autres.length ? h("div", { className: "g autres" }, c.autres.map(function (g) {
      return h("button", { key: g.id, type: "button", className: "c o", onClick: function () { c.onAutre(g); } },
        h("span", { className: "ph", "aria-hidden": true, style: { backgroundImage: "url(" + g.img + ")", backgroundPosition: g.pos || "60% 40%" } }),
        h("span", { className: "n" }, "G" + g.n), h("span", { className: "t" }, L("gal" + g.n)));
    })) : null);
}

/* =====================================================================================
   31/10 — FIN DE COURS (composant réutilisable, d'après la 3e maquette validée par Blandine).
   Blocs : 1) synthèse immersive (photo d'ambiance + portraits reliés par un filet)  2) Hey Baby t'accompagne
   (carrousel au doigt sur téléphone, liste sur ordinateur ; ouvre vraiment Hey Baby)  3) Ton défi terrain (cercles
   à cocher, mémorisés sur l'appareil, ne bloque rien)  4) Quiz et révision (bandeau photo, quiz de l'appli)
   5) navigation (cours suivant, retour aux Galops). Aucun texte de cours en dur : tout arrive par la config
   (lue dans le cours) ou par les libellés traduits (14 langues). Config :
   { L, lg, rtl, kicker, titre, heroImg, heroPos, portraits:[{img,pos,nom,desc}], note, hb:[questions], hbImgs:[img],
     onHey(q), defiTexte, defiN, coursId, quizImg, onQuiz, quizScore, suivant:{titre,onClick}|null, onGalops,
     onRetourCours, Selecteur }
   ===================================================================================== */
function FinCours(c) {
  var L = c.L, rtl = c.rtl;
  var cle = "hype_defi_" + c.coursId;
  var _d = useState(function () {
    var v = []; try { v = JSON.parse(window.localStorage.getItem(cle) || "[]"); } catch (e) { v = []; }
    var n = c.defiN || 3, o = []; for (var i = 0; i < n; i++) o.push(!!v[i]); return o;
  }), coche = _d[0], setCoche = _d[1];
  var basculer = function (i) {
    setCoche(function (av) {
      var n = av.slice(); n[i] = !n[i];
      try { window.localStorage.setItem(cle, JSON.stringify(n)); } catch (e) { }
      return n;
    });
  };
  var tous = coche.length > 0 && coche.every(Boolean);
  var _s = useState(0), slide = _s[0], setSlide = _s[1];
  var surDefil = function (e) {
    var el = e.currentTarget, w = el.clientWidth || 1;
    var i = Math.round(Math.abs(el.scrollLeft) / w); if (i !== slide) setSlide(i);
  };
  var aller = function (i) {
    var el = document.querySelector(".rbo-fc-hbc"); if (!el) return;
    try { el.scrollTo({ left: (rtl ? -1 : 1) * i * el.clientWidth, behavior: "smooth" }); } catch (e) { el.scrollLeft = (rtl ? -1 : 1) * i * el.clientWidth; }
  };
  var fl = rtl ? "‹" : "›", fl2 = rtl ? "←" : "→";
  var etoiles = typeof c.quizScore === "number" ? Math.max(0, Math.min(5, Math.floor(c.quizScore / 20))) : 0;
  var reussi = typeof c.quizScore === "number" && c.quizScore >= 60;
  return h("div", { className: "rbo-fc" },
    /* 1 — synthèse immersive */
    h("section", { className: "rbo-fc-hero", "aria-labelledby": "rbo-fc-t" },
      h("div", { className: "ph" + (c.heroFlip ? " flip" : ""), "aria-hidden": true, style: { backgroundImage: "url(" + c.heroImg + ")", backgroundPosition: c.heroPos || "70% 40%" } }),
      h("div", { className: "vo" }),
      h("div", { className: "bar" },
        h("button", { type: "button", className: "rbo-back", "aria-label": L("retourCours"), onClick: c.onRetourCours }, rtl ? "›" : "‹"),
        h("span", { style: { marginInlineStart: "auto" } }, c.Selecteur ? h(c.Selecteur, { compact: true }) : null)),
      h("div", { className: "in" },
        h("p", { className: "kick" }, c.kicker + "  ·  " + c.titre),
        h("h2", { id: "rbo-fc-t" }, L("finTitre").replace(/ ([!?:;»])/g, "\u00A0$1")),
        h("span", { className: "trait", "aria-hidden": true }),
        h("p", { className: "sous" }, L("finSous")),
        reussi ? h("p", { className: "ok" }, h("span", { "aria-hidden": true }, "★★★★★".slice(0, etoiles) + "☆☆☆☆☆".slice(0, 5 - etoiles)), " " + L("quizReussi") + " · " + c.quizScore + " %") : null,
        h("ul", { className: "rbo-fc-por" + (c.portraits.length > 4 ? " nb" : "") }, c.portraits.map(function (p, i) {
          return h("li", { key: i },
            h("span", { className: "rond" + (p.img ? "" : " teinte"), role: "img", "aria-label": p.nom, style: p.img ? { backgroundImage: "url(" + p.img + ")", backgroundPosition: p.pos || "center", backgroundSize: p.taille || undefined } : { background: p.couleur } }),
            h("span", { className: "pt", "aria-hidden": true }),
            h("span", { className: "tx" }, h("b", null, p.nom), h("span", null, p.desc)));
        })),
        c.note ? h("p", { className: "note" }, c.note) : null)),
    /* 2 + 3 — Hey Baby, défi. 31/10 00h35 (Blandine) : on garde « Demande à Hey Baby » et « Le défi du cavalier » de la version d'avant
       (cartes, 3 questions en bulles, défi en entier). Le carrousel et les cercles du défi restent dans le code (c.duoMaquette = true). */
    !c.duoMaquette ? h("div", { className: "rbo-fc-duo ancien" + (c.defiSeg ? "" : " seul") },
      c.hb.length ? h("section", { className: "rbo-card hb" }, h("h3", null, ICO.bulle(20), L("heyBaby")),
        h("div", { className: "rbo-hbq" }, c.hb.map(function (q, i) { return h("button", { key: i, type: "button", onClick: function () { c.onHey(q); } }, h("span", null, q), h("i", { "aria-hidden": true }, fl)); }))) : null,
      !c.defiSeg ? null : h("section", { className: "rbo-card defi" }, h("h3", null, ICO.coupe(20), c.defiSeg.titre), c.defiSeg.sous ? h("p", null, c.defiSeg.sous) : null, c.defiSeg.texte ? h("p", null, c.defiSeg.texte) : null,
        c.defiSeg.puces && c.defiSeg.puces.length ? h("ul", { className: "rbo-defil" }, c.defiSeg.puces.map(function (pp, i) { return h("li", { key: i }, pp.texte); })) : null)) :
    h("div", { className: "rbo-fc-duo" },
      c.hb.length ? h("section", { className: "rbo-fc-hb", "aria-labelledby": "rbo-fc-hbt" },
        h("h3", { id: "rbo-fc-hbt" }, ICO.bulle(22), L("hbTitre")),
        h("p", { className: "sous" }, L("hbSous")),
        h("div", { className: "rbo-fc-hbc", onScroll: surDefil },
          c.hb.map(function (q, i) {
            return h("button", { key: i, type: "button", className: "rbo-fc-q", onClick: function () { c.onHey(q); } },
              c.hbImgs && c.hbImgs[i] ? h("span", { className: "vi", "aria-hidden": true, style: { backgroundImage: "url(" + c.hbImgs[i].img + ")", backgroundPosition: c.hbImgs[i].pos || "center" } }) : null,
              h("span", { className: "qt" }, q), h("i", { "aria-hidden": true }, fl));
          })),
        c.hb.length > 1 ? h("div", { className: "pts" }, c.hb.map(function (q, i) {
          return h("button", { key: i, type: "button", "aria-label": (i + 1) + " / " + c.hb.length, "aria-current": i === slide ? "true" : undefined, onClick: function () { aller(i); } });
        })) : null) : null,
      h("section", { className: "rbo-fc-defi", "aria-labelledby": "rbo-fc-dt" },
        h("h3", { id: "rbo-fc-dt" }, ICO.coupe(22), L("defiTitre")),
        h("p", { className: "sous" }, c.defiTexte),
        h("div", { className: "ronds" }, coche.map(function (v, i) {
          var lab = L("chevalN").replace("{n}", i + 1);
          return h("button", { key: i, type: "button", "aria-pressed": v ? "true" : "false", "aria-label": lab, onClick: function () { basculer(i); } },
            h("span", { className: "c" + (v ? " on" : ""), "aria-hidden": true }, v ? "✓" : "+"), h("span", { className: "l" }, lab));
        })),
        tous ? h("p", { className: "bravo", "aria-live": "polite" }, L("defiBravo")) : null)),
    /* 4 — quiz */
    h("section", { className: "rbo-fc-quiz", style: { backgroundImage: "url(" + c.quizImg + ")" } },
      h("div", { className: "in" },
        h("h3", null, L("secQuiz")),
        h("p", null, L("quizSous")),
        h("button", { type: "button", className: "rbo-btn", onClick: c.onQuiz }, L("quizBtn") + " " + fl2))),
    /* 5 — navigation */
    h("nav", { className: "rbo-fc-nav" },
      c.suivant ? h("div", { className: "lig" }, h("span", { "aria-hidden": true }),
        h("button", { type: "button", className: "suiv", onClick: c.suivant.onClick }, L("coursSuivant") + " · " + c.suivant.titre + " " + fl2),
        h("span", { "aria-hidden": true })) : null,
      h("button", { type: "button", className: "gal", onClick: c.onGalops }, L("retourGalops"))));
}

HypeRobesOrdi.ok = ok;
/* 30/10 (v5) : éléments partagés avec hype-cours-robes-galops-ordi.js (Galops 3 et 5) — AUCUN changement d'affichage du Galop 1 */
HypeRobesOrdi.shared = { Onglets: Onglets, FinCours: FinCours, CSS: CSS, T: T, tt: tt, ICO: ICO, morceaux: morceaux, pickLg: pickLg, arrLg: arrLg, nettoyer: nettoyer, sansNum: sansNum, sansGuillemets: sansGuillemets, LGS: LGS };
HypeRobesOrdi.version = VERSION;
window.HypeRobesOrdi = HypeRobesOrdi;
})();
