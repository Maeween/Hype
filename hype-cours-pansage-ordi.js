/* =====================================================================================
   hype-cours-pansage-ordi.js — VERSION ORDINATEUR du cours « Le pansage, premier soin » (g1-c2)
   Créé le 30/10/2026 d'après la maquette ordinateur validée par Blandine (29/10).

   CE FICHIER NE CONTIENT AUCUN TEXTE DU COURS : tous les textes pédagogiques (paragraphes, outils, pieds,
   queue, conseils du coach, 6 questions du quiz) sont LUS dans le cours g1-c2 lui-même (hype-cours-galop1.js
   et ses versions par langue). Ici il n'y a que la mise en page, le schéma du sabot et les NOUVEAUX
   petits textes d'enrichissement (traduits dans les 14 langues de l'appli).

   BRANCHEMENT : window.HypePansageOrdi (composant) + window.HypePansageOrdi.ok(cours) (garde).
   Appelé par EcranCoursCorps (index.html) seulement quand cours.id === "g1-c2" ET largeur >= 1100 px.
   Le téléphone et la tablette étroite gardent exactement l'affichage page par page d'avant.
   RÈGLE DE LIVRAISON : à chaque modification, incrémenter le « ?v= » de la balise
   <script src="hype-cours-pansage-ordi.js?v=N"> dans index.html.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement;
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var VERSION = 1;

/* ---------------- textes NOUVEAUX (14 langues) : fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko ---------------- */
var LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
function tt() { var o = {}; for (var i = 0; i < LGS.length; i++) o[LGS[i]] = arguments[i]; return o; }
var T = {
  vComprendre: tt("Comprendre", "Understand", "Comprender", "Capire", "理解する", "Verstehen", "الفهم", "理解", "Begrijpen", "Compreender", "Förstå", "Понять", "Zrozumieć", "이해하기"),
  vOutils: tt("Les outils", "The tools", "Las herramientas", "Gli attrezzi", "道具", "Die Werkzeuge", "الأدوات", "工具", "Het gereedschap", "As ferramentas", "Redskapen", "Инструменты", "Narzędzia", "도구"),
  vPieds: tt("Les pieds", "The hooves", "Los cascos", "Gli zoccoli", "蹄", "Die Hufe", "الحوافر", "马蹄", "De hoeven", "Os cascos", "Hovarna", "Копыта", "Kopyta", "발굽"),
  vQueue: tt("La queue", "The tail", "La cola", "La coda", "尻尾", "Der Schweif", "الذيل", "马尾", "De staart", "A cauda", "Svansen", "Хвост", "Ogon", "꼬리"),
  vQuiz: tt("Quiz", "Quiz", "Quiz", "Quiz", "クイズ", "Quiz", "اختبار", "测验", "Quiz", "Quiz", "Quiz", "Викторина", "Quiz", "퀴즈"),
  secQuiz: tt("Quiz et révision", "Quiz and review", "Quiz y repaso", "Quiz e ripasso", "クイズと復習", "Quiz und Wiederholung", "اختبار ومراجعة", "测验与复习", "Quiz en herhaling", "Quiz e revisão", "Quiz och repetition", "Викторина и повторение", "Quiz i powtórka", "퀴즈와 복습"),
  benef1: tt("Une relation de confiance", "A bond of trust", "Una relación de confianza", "Un rapporto di fiducia", "信頼関係", "Eine Vertrauensbeziehung", "علاقة ثقة", "信任关系", "Een vertrouwensband", "Uma relação de confiança", "En förtroendefull relation", "Доверительные отношения", "Relacja oparta na zaufaniu", "신뢰 관계"),
  benef2: tt("Un contrôle de santé", "A health check", "Un control de salud", "Un controllo della salute", "健康チェック", "Eine Gesundheitskontrolle", "فحص للصحة", "健康检查", "Een gezondheidscheck", "Uma verificação de saúde", "En hälsokontroll", "Проверка здоровья", "Kontrola zdrowia", "건강 점검"),
  benef3: tt("Une préparation à l'effort", "Preparation for work", "Una preparación para el esfuerzo", "Una preparazione allo sforzo", "運動への準備", "Eine Vorbereitung auf die Arbeit", "تحضير للمجهود", "为运动做准备", "Een voorbereiding op de inspanning", "Uma preparação para o esforço", "En förberedelse inför arbetet", "Подготовка к нагрузке", "Przygotowanie do wysiłku", "운동 준비"),
  savais: tt("Le savais-tu ?", "Did you know?", "¿Lo sabías?", "Lo sapevi?", "知ってた？", "Wusstest du das?", "هل تعلم؟", "你知道吗？", "Wist je dat?", "Sabias?", "Visste du det?", "А ты знал?", "Czy wiesz, że?", "알고 있었나요?"),
  savaisTxt: tt("La peau d'un cheval est si sensible qu'il peut faire frémir un seul endroit pour chasser une simple mouche.", "A horse's skin is so sensitive that it can twitch one single spot to shake off a simple fly.", "La piel de un caballo es tan sensible que puede hacer estremecer un solo punto para espantar una simple mosca.", "La pelle del cavallo è così sensibile che può far fremere un solo punto per scacciare una semplice mosca.", "馬の皮膚はとても敏感で、ハエ1匹を追い払うために、ごく一部分だけを震わせることができます。", "Die Haut eines Pferdes ist so empfindlich, dass es nur eine einzige Stelle zucken lassen kann, um eine Fliege zu verscheuchen.", "جلد الحصان حساس جداً لدرجة أنه يستطيع أن يهز بقعة واحدة فقط ليطرد ذبابة.", "马的皮肤非常敏感，只抖动一小块皮肤就能赶走一只苍蝇。", "De huid van een paard is zo gevoelig dat het één enkele plek kan laten trillen om een vlieg te verjagen.", "A pele de um cavalo é tão sensível que ele consegue fazer tremer um só ponto para afastar uma mosca.", "Hästens hud är så känslig att den kan få en enda plats att dra ihop sig för att jaga bort en fluga.", "Кожа лошади так чувствительна, что она может подёргать всего одним участком, чтобы согнать муху.", "Skóra konia jest tak wrażliwa, że może poruszyć tylko jednym miejscem, by odgonić muchę.", "말의 피부는 매우 예민해서 파리 한 마리를 쫓기 위해 한 부분만 움찔거릴 수 있어요."),
  coach: tt("Le conseil du coach", "The coach's tip", "El consejo del entrenador", "Il consiglio del coach", "コーチのアドバイス", "Der Tipp des Trainers", "نصيحة المدرب", "教练的建议", "De tip van de coach", "A dica do treinador", "Tränarens tips", "Совет тренера", "Rada trenera", "코치의 조언"),
  defi: tt("Le défi du cavalier", "The rider's challenge", "El reto del jinete", "La sfida del cavaliere", "ライダーへのチャレンジ", "Die Herausforderung für Reiter", "تحدي الفارس", "骑手挑战", "De uitdaging voor de ruiter", "O desafio do cavaleiro", "Ryttarens utmaning", "Вызов для всадника", "Wyzwanie jeźdźca", "라이더 챌린지"),
  defiTxt: tt("Réalise le pansage complet de ton cheval et note ce que tu observes.", "Groom your horse from start to finish and write down what you notice.", "Haz el acicalado completo de tu caballo y anota lo que observes.", "Fai la pulizia completa del tuo cavallo e annota ciò che osservi.", "愛馬の手入れを最初から最後まで行い、気づいたことを書き留めましょう。", "Pflege dein Pferd komplett und notiere, was dir auffällt.", "قم بتنظيف حصانك بالكامل ودوّن ما تلاحظه.", "给你的马做一次完整的刷拭，并记下你的观察。", "Verzorg je paard van begin tot eind en schrijf op wat je opvalt.", "Faz o tratamento completo do teu cavalo e anota o que observas.", "Sköt om din häst från början till slut och skriv ner vad du ser.", "Полностью вычисти свою лошадь и запиши, что ты заметил.", "Wykonaj pełną pielęgnację swojego konia i zapisz, co zauważyłeś.", "말을 처음부터 끝까지 손질하고 관찰한 것을 적어 보세요."),
  heyBaby: tt("Demande à Hey Baby", "Ask Hey Baby", "Pregúntale a Hey Baby", "Chiedi a Hey Baby", "Hey Babyに聞く", "Frag Hey Baby", "اسأل Hey Baby", "问问 Hey Baby", "Vraag het Hey Baby", "Pergunta à Hey Baby", "Fråga Hey Baby", "Спроси Hey Baby", "Zapytaj Hey Baby", "Hey Baby에게 물어보기"),
  hbQ4: tt("Comment démêler la queue sans casser les crins ?", "How do I untangle the tail without breaking the hair?", "¿Cómo desenredo la cola sin romper las crines?", "Come districo la coda senza spezzare i crini?", "毛を切らずに尻尾をほぐすには？", "Wie entwirre ich den Schweif, ohne die Haare abzubrechen?", "كيف أفك عقد الذيل دون كسر الشعر؟", "怎样梳开马尾又不弄断毛？", "Hoe ontklit ik de staart zonder de haren te breken?", "Como desembaraço a cauda sem partir as crinas?", "Hur reder jag ut svansen utan att håren går av?", "Как распутать хвост, не ломая волос?", "Jak rozczesać ogon, nie łamiąc włosia?", "털이 끊어지지 않게 꼬리를 풀려면?"),
  observer: tt("À observer", "What to look at", "A observar", "Da osservare", "観察ポイント", "Darauf achten", "ما يجب ملاحظته", "观察要点", "Waar je op let", "A observar", "Att titta på", "На что смотреть", "Na co zwrócić uwagę", "관찰할 점"),
  observerTxt: tt("Pendant le pansage, regarde la peau, les membres et les yeux de ton cheval. Si quelque chose te semble inhabituel, préviens ton moniteur.", "While grooming, look at your horse's skin, legs and eyes. If something looks unusual, tell your instructor.", "Mientras lo acicalas, mira la piel, las patas y los ojos de tu caballo. Si algo te parece raro, avisa a tu monitor.", "Mentre lo pulisci, guarda la pelle, le gambe e gli occhi del tuo cavallo. Se ti sembra strano qualcosa, avvisa il tuo istruttore.", "手入れの間、馬の皮膚、脚、目を見てください。いつもと違うところがあれば、指導者に知らせましょう。", "Schau beim Putzen auf die Haut, die Beine und die Augen deines Pferdes. Wenn dir etwas ungewöhnlich vorkommt, sag deinem Reitlehrer Bescheid.", "أثناء العناية، انظر إلى جلد حصانك وقوائمه وعينيه. وإذا بدا لك شيء غير معتاد فأخبر مدربك.", "刷拭时，看看马的皮肤、四肢和眼睛。如果发现异常，请告诉你的教练。", "Kijk tijdens het verzorgen naar de huid, de benen en de ogen van je paard. Valt je iets vreemds op, zeg het dan tegen je instructeur.", "Enquanto o tratas, olha para a pele, as patas e os olhos do teu cavalo. Se algo te parecer fora do normal, avisa o teu instrutor.", "Titta på hästens hud, ben och ögon medan du borstar. Om något ser ovanligt ut, säg det till din instruktör.", "Во время чистки смотри на кожу, ноги и глаза лошади. Если что-то кажется необычным, скажи инструктору.", "Podczas czyszczenia patrz na skórę, nogi i oczy konia. Jeśli coś wydaje ci się nietypowe, powiedz instruktorowi.", "손질하는 동안 말의 피부, 다리, 눈을 살펴보세요. 평소와 다른 점이 있으면 지도자에게 알려 주세요."),
  erreurs: tt("Les erreurs à éviter", "Mistakes to avoid", "Los errores que hay que evitar", "Gli errori da evitare", "避けたいミス", "Fehler, die du vermeiden solltest", "أخطاء يجب تجنبها", "要避免的错误", "Fouten die je moet vermijden", "Erros a evitar", "Misstag att undvika", "Ошибки, которых нужно избегать", "Błędy, których należy unikać", "피해야 할 실수"),
  err1: tt("Utiliser l'étrille sur la tête ou les membres.", "Using the curry comb on the head or legs.", "Usar la almohaza en la cabeza o en las patas.", "Usare la striglia sulla testa o sulle gambe.", "頭や脚にカリーコームを使うこと。", "Den Striegel an Kopf oder Beinen benutzen.", "استخدام المشط المعدني على الرأس أو القوائم.", "在头部或四肢使用刮毛梳。", "De roskam op het hoofd of de benen gebruiken.", "Usar a almofaça na cabeça ou nas patas.", "Använda kardan på huvudet eller benen.", "Использовать скребницу на голове или ногах.", "Używać zgrzebła na głowie lub nogach.", "머리나 다리에 커리콤을 쓰는 것."),
  err2: tt("Creuser la fourchette avec la pointe du cure-pied.", "Digging into the frog with the tip of the hoof pick.", "Hurgar en la ranilla con la punta del limpiacascos.", "Scavare nel fettone con la punta del cavazoccoli.", "ヒーフピックの先で蹄叉を掘ること。", "Mit der Spitze des Hufkratzers im Strahl bohren.", "الحفر في الشوكة بطرف أداة تنظيف الحافر.", "用蹄钩的尖端去抠蹄叉。", "Met de punt van de hoefkrabber in de straal graven.", "Escavar a ranilha com a ponta do limpa-cascos.", "Peta i strålen med spetsen på hovkrattan.", "Ковырять стрелку кончиком копытного крючка.", "Wydłubywać strzałkę końcówką czyścika do kopyt.", "발굽 청소 도구 끝으로 제차를 파는 것."),
  err3: tt("Se placer juste derrière le cheval.", "Standing right behind the horse.", "Ponerse justo detrás del caballo.", "Mettersi proprio dietro al cavallo.", "馬のすぐ後ろに立つこと。", "Direkt hinter dem Pferd stehen.", "الوقوف خلف الحصان مباشرة.", "直接站在马的正后方。", "Pal achter het paard gaan staan.", "Colocar-se mesmo atrás do cavalo.", "Stå precis bakom hästen.", "Вставать прямо позади лошади.", "Stawać tuż za koniem.", "말 바로 뒤에 서는 것."),
  err4: tt("Tirer sur les crins pour défaire un nœud.", "Pulling on the hair to undo a knot.", "Tirar de las crines para deshacer un nudo.", "Tirare i crini per sciogliere un nodo.", "結び目をほどくために毛を引っ張ること。", "An den Haaren ziehen, um einen Knoten zu lösen.", "شدّ الشعر لفك عقدة.", "用力拉扯鬃毛来解开结。", "Aan de haren trekken om een knoop los te maken.", "Puxar as crinas para desfazer um nó.", "Dra i hårstråna för att reda ut en knut.", "Дёргать волосы, чтобы распутать колтун.", "Ciągnąć za włosie, żeby rozplątać kołtun.", "매듭을 풀려고 털을 잡아당기는 것."),
  retenir: tt("À retenir", "Key points", "Para recordar", "Da ricordare", "覚えておこう", "Merke dir", "للتذكّر", "要记住", "Om te onthouden", "A reter", "Att komma ihåg", "Запомни", "Zapamiętaj", "기억하기"),
  ret1: tt("L'étrille décolle, le bouchon enlève la poussière, la brosse douce termine.", "The curry comb loosens, the body brush removes dust, the soft brush finishes.", "La almohaza suelta, el cepillo duro quita el polvo y el cepillo suave remata.", "La striglia stacca, la spazzola dura toglie la polvere, quella morbida rifinisce.", "カリーコームで汚れを浮かせ、ボディブラシでほこりを取り、柔らかいブラシで仕上げます。", "Der Striegel löst, die Kardätsche entfernt den Staub, die weiche Bürste macht den letzten Schliff.", "المشط يفكّ الأوساخ، والفرشاة القاسية تزيل الغبار، والفرشاة الناعمة تنهي العمل.", "刮毛梳松开污垢，硬毛刷除去灰尘，软毛刷收尾。", "De roskam maakt los, de borstel haalt het stof weg, de zachte borstel maakt af.", "A almofaça solta, a escova dura tira o pó e a escova macia finaliza.", "Kardan lossar, borsten tar bort dammet och den mjuka borsten avslutar.", "Скребница отделяет грязь, жёсткая щётка убирает пыль, мягкая щётка завершает.", "Zgrzebło rozluźnia, szczotka usuwa kurz, miękka szczotka wykańcza.", "커리콤으로 흙을 떼고, 딱딱한 솔로 먼지를 털고, 부드러운 솔로 마무리해요."),
  ret2: tt("On cure toujours du talon vers la pince.", "Always pick from heel to toe.", "Se limpia siempre del talón hacia la pinza.", "Si pulisce sempre dal tallone verso la punta.", "蹄の掃除はいつも踵からつま先へ。", "Immer von der Trachte zur Zehe auskratzen.", "ننظف دائماً من الكعب نحو مقدمة الحافر.", "清蹄时总是从蹄踵向蹄尖。", "Altijd van hiel naar teen uitkrabben.", "Limpa-se sempre do talão para a pinça.", "Krata alltid från trakten mot tån.", "Чистят всегда от пятки к носку.", "Zawsze czyść od piętki ku przodowi kopyta.", "발굽은 항상 뒤꿈치에서 앞쪽으로 청소해요."),
  ret3: tt("On reste sur le côté du cheval, jamais juste derrière.", "Stay at the horse's side, never right behind.", "Te quedas al lado del caballo, nunca justo detrás.", "Si resta di fianco al cavallo, mai proprio dietro.", "馬の横に立ち、すぐ後ろには立たないこと。", "Bleib seitlich beim Pferd, nie direkt dahinter.", "نبقى إلى جانب الحصان، وليس خلفه مباشرة.", "要站在马的侧面，绝不站在正后方。", "Blijf aan de zijkant van het paard, nooit er pal achter.", "Fica-se ao lado do cavalo, nunca mesmo atrás.", "Stå vid sidan av hästen, aldrig precis bakom.", "Стой сбоку от лошади, никогда прямо позади.", "Stój z boku konia, nigdy tuż za nim.", "항상 말의 옆에 서고, 바로 뒤에는 서지 않아요."),
  ret4: tt("On démêle la queue de la pointe vers la base, mèche par mèche.", "Untangle the tail from the tip up to the base, one lock at a time.", "Se desenreda la cola desde la punta hacia la base, mechón a mechón.", "Si districa la coda dalla punta verso la base, ciocca per ciocca.", "尻尾は毛先から根元に向かって、少しずつほぐします。", "Den Schweif von der Spitze zur Wurzel entwirren, Strähne für Strähne.", "نفك عقد الذيل من الأطراف نحو الجذر، خصلة بعد خصلة.", "从尾尖向尾根梳开，一缕一缕地来。", "Ontklit de staart van de punt naar de basis, lok voor lok.", "Desembaraça-se a cauda da ponta para a base, madeixa a madeixa.", "Reda ut svansen från topparna mot roten, en testa i taget.", "Расчёсывай хвост от кончиков к корню, прядь за прядью.", "Rozczesuj ogon od końców ku nasadzie, pasmo po paśmie.", "꼬리는 끝에서 뿌리 쪽으로, 한 가닥씩 풀어요."),
  exoTitre: tt("Remets les étapes dans l'ordre", "Put the steps in order", "Pon los pasos en orden", "Rimetti i passaggi in ordine", "手順を正しい順番に並べよう", "Bringe die Schritte in die richtige Reihenfolge", "رتّب الخطوات", "把步骤按顺序排好", "Zet de stappen in de juiste volgorde", "Coloca os passos por ordem", "Lägg stegen i rätt ordning", "Расставь шаги по порядку", "Ułóż kroki w odpowiedniej kolejności", "순서대로 정리해 보세요"),
  exoAide: tt("Touche les étapes dans le bon ordre.", "Tap the steps in the right order.", "Toca los pasos en el orden correcto.", "Tocca i passaggi nell'ordine giusto.", "正しい順番で手順をタップしてください。", "Tippe die Schritte in der richtigen Reihenfolge an.", "المس الخطوات بالترتيب الصحيح.", "请按正确的顺序点击步骤。", "Tik de stappen in de juiste volgorde aan.", "Toca nos passos pela ordem certa.", "Tryck på stegen i rätt ordning.", "Нажимай на шаги в правильном порядке.", "Dotykaj kroków w prawidłowej kolejności.", "올바른 순서대로 단계를 눌러 보세요."),
  exoOk: tt("Bravo, c'est le bon ordre !", "Well done, that's the right order!", "¡Bravo, es el orden correcto!", "Bravo, è l'ordine giusto!", "正解です、その順番で合っています！", "Bravo, das ist die richtige Reihenfolge!", "أحسنت، هذا هو الترتيب الصحيح!", "太棒了，顺序正确！", "Goed zo, dat is de juiste volgorde!", "Muito bem, é a ordem certa!", "Bra jobbat, det är rätt ordning!", "Отлично, порядок верный!", "Brawo, to właściwa kolejność!", "잘했어요, 올바른 순서예요!"),
  exoKo: tt("Pas tout à fait, essaie encore.", "Not quite, try again.", "No del todo, inténtalo de nuevo.", "Non proprio, riprova.", "おしい、もう一度やってみよう。", "Nicht ganz, versuche es noch einmal.", "ليس تماماً، حاول مرة أخرى.", "不太对，再试一次。", "Net niet, probeer het nog eens.", "Não bem, tenta outra vez.", "Inte riktigt, försök igen.", "Не совсем, попробуй ещё раз.", "Jeszcze nie, spróbuj ponownie.", "아쉬워요, 다시 해 보세요."),
  exoRestart: tt("Recommencer", "Start again", "Empezar de nuevo", "Ricomincia", "やり直す", "Nochmal", "ابدأ من جديد", "重新开始", "Opnieuw beginnen", "Recomeçar", "Börja om", "Начать заново", "Zacznij od nowa", "다시 하기"),
  atelier: tt("Atelier : les zones du sabot", "Workshop: the parts of the hoof", "Taller: las zonas del casco", "Laboratorio: le zone dello zoccolo", "ワークショップ：蹄の各部分", "Werkstatt: die Zonen des Hufs", "ورشة: أجزاء الحافر", "小工坊：蹄的各个部位", "Werkplaats: de zones van de hoef", "Oficina: as zonas do casco", "Verkstad: hovens delar", "Мастерская: зоны копыта", "Warsztat: strefy kopyta", "실습: 발굽의 각 부분"),
  atelierAide: tt("Touche une zone pour la découvrir, ou suis les étapes du curage.", "Tap a zone to discover it, or follow the picking steps.", "Toca una zona para descubrirla, o sigue los pasos de la limpieza.", "Tocca una zona per scoprirla, oppure segui i passaggi della pulizia.", "部位をタップして確認するか、掃除の手順を順に見てみよう。", "Tippe auf eine Zone, um sie zu entdecken, oder folge den Schritten des Auskratzens.", "المس منطقة لتكتشفها، أو اتبع خطوات التنظيف.", "点击一个部位来了解它，或按清蹄的步骤依次查看。", "Tik op een zone om die te ontdekken, of volg de stappen van het uitkrabben.", "Toca numa zona para a descobrir, ou segue os passos da limpeza.", "Tryck på en del för att lära dig mer, eller följ stegen för krattning.", "Нажми на зону, чтобы узнать о ней, или пройди шаги чистки.", "Dotknij strefy, by ją poznać, albo śledź kroki czyszczenia.", "부분을 눌러 알아보거나 청소 순서를 따라가 보세요."),
  zPince: tt("Pince", "Toe", "Pinza", "Punta", "蹄尖", "Zehe", "مقدمة الحافر", "蹄尖", "Teen", "Pinça", "Tå", "Носок", "Przód kopyta", "발굽 앞부분"),
  zParoi: tt("Paroi", "Hoof wall", "Muralla", "Muraglia", "蹄壁", "Hufwand", "جدار الحافر", "蹄壁", "Hoefwand", "Parede do casco", "Hovvägg", "Стенка копыта", "Ściana kopyta", "발굽 벽"),
  zSole: tt("Sole", "Sole", "Suela", "Suola", "蹄底", "Sohle", "أخمص الحافر", "蹄底", "Zool", "Sola", "Sula", "Подошва", "Podeszwa", "발굽 바닥"),
  zFourchette: tt("Fourchette", "Frog", "Ranilla", "Fettone", "蹄叉", "Strahl", "الشوكة", "蹄叉", "Straal", "Ranilha", "Strålen", "Стрелка", "Strzałka", "제차"),
  zLacunes: tt("Lacunes", "Collateral grooves", "Lagunas laterales", "Lacune laterali", "蹄叉側溝", "Strahlfurchen", "الأخاديد الجانبية", "蹄叉侧沟", "Straalgroeven", "Lacunas laterais", "Strålfårorna", "Боковые борозды", "Bruzdy boczne", "제차 옆 홈"),
  zTalons: tt("Talons", "Heels", "Talones", "Talloni", "踵", "Trachten", "الكعبان", "蹄踵", "Hielen", "Talões", "Trakterna", "Пятки", "Piętki", "발굽 뒤꿈치"),
  sensCurage: tt("Sens du curage : du talon vers la pince", "Direction of picking: from heel to toe", "Sentido de la limpieza: del talón hacia la pinza", "Verso della pulizia: dal tallone verso la punta", "掃除の向き：踵からつま先へ", "Richtung beim Auskratzen: von der Trachte zur Zehe", "اتجاه التنظيف: من الكعب نحو مقدمة الحافر", "清蹄方向：从蹄踵到蹄尖", "Richting van het uitkrabben: van hiel naar teen", "Sentido da limpeza: do talão para a pinça", "Krattningens riktning: från trakten mot tån", "Направление чистки: от пятки к носку", "Kierunek czyszczenia: od piętki ku przodowi kopyta", "청소 방향: 뒤꿈치에서 앞쪽으로"),
  quizBtn: tt("Passer le quiz", "Take the quiz", "Hacer el quiz", "Fai il quiz", "クイズに挑戦", "Quiz starten", "ابدأ الاختبار", "开始测验", "Doe de quiz", "Fazer o quiz", "Gör quizet", "Пройти викторину", "Zrób quiz", "퀴즈 풀기"),
  cartes: tt("Révision en cartes", "Review with flashcards", "Repaso con tarjetas", "Ripasso con le schede", "カードで復習", "Wiederholen mit Karten", "مراجعة بالبطاقات", "卡片复习", "Herhalen met kaarten", "Revisão com cartões", "Repetera med kort", "Повторение по карточкам", "Powtórka z fiszkami", "카드로 복습"),
  voirRep: tt("Voir la réponse", "Show the answer", "Ver la respuesta", "Vedi la risposta", "答えを見る", "Antwort zeigen", "اعرض الإجابة", "查看答案", "Antwoord tonen", "Ver a resposta", "Visa svaret", "Показать ответ", "Pokaż odpowiedź", "정답 보기"),
  vrai: tt("Vrai", "True", "Verdadero", "Vero", "正しい", "Wahr", "صحيح", "对", "Waar", "Verdadeiro", "Sant", "Верно", "Prawda", "맞아요"),
  faux: tt("Faux", "False", "Falso", "Falso", "間違い", "Falsch", "خطأ", "错", "Onwaar", "Falso", "Falskt", "Неверно", "Fałsz", "아니에요"),
  terminer: tt("Terminer le cours", "Finish the lesson", "Terminar el curso", "Termina il corso", "レッスンを終える", "Kurs abschließen", "إنهاء الدرس", "完成课程", "Les afronden", "Terminar o curso", "Avsluta lektionen", "Завершить урок", "Zakończ lekcję", "수업 마치기"),
  retour: tt("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
  chapitres: tt("Chapitres du Galop 1", "Galop 1 lessons", "Capítulos del Galop 1", "Capitoli del Galop 1", "Galop 1のレッスン", "Kapitel Galop 1", "دروس Galop 1", "Galop 1 的课程", "Lessen Galop 1", "Capítulos do Galop 1", "Lektioner Galop 1", "Уроки Galop 1", "Lekcje Galop 1", "Galop 1 수업"),
  video: tt("Voir une vidéo sur YouTube", "Watch a video on YouTube", "Ver un vídeo en YouTube", "Guarda un video su YouTube", "YouTubeで動画を見る", "Video auf YouTube ansehen", "شاهد فيديو على يوتيوب", "在 YouTube 观看视频", "Bekijk een video op YouTube", "Ver um vídeo no YouTube", "Se en video på YouTube", "Смотреть видео на YouTube", "Obejrzyj film na YouTube", "YouTube에서 영상 보기"),
  temp: tt("Photo provisoire", "Temporary photo", "Foto provisional", "Foto provvisoria", "仮の写真", "Vorläufiges Foto", "صورة مؤقتة", "临时照片", "Tijdelijke foto", "Foto provisória", "Tillfälligt foto", "Временное фото", "Zdjęcie tymczasowe", "임시 사진")
};
var NOUVEAUX = ["en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];

/* ---------------- petits outils ---------------- */
function pickLg(o, lg) {
  if (o == null) return "";
  if (typeof o === "string") return o;
  if (typeof o !== "object") return String(o);
  return o[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && o.en) || o.fr || "";
}
function nettoyerTitre(s) {   /* retire l'emoji de tête (🧽, 👣, 🐴…) du titre d'un chapitre */
  return String(s || "").replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍\u{1F1E6}-\u{1F1FF}\s]+/u, "").trim();
}
function segs(arr, k) { return (Array.isArray(arr) ? arr : []).filter(function (s) { return s && s.k === k; }); }

/* extrait le contenu du cours g1-c2 (déjà dans la langue choisie, ou encore sous forme { fr, en… }) */
function lireCours(cours, lg) {
  var r = function (x) { return pickLg(x, lg); };
  var b = (cours && cours.blocs) || [];
  var couv = (b[0] && b[0].couv) || {};
  var b1 = b[1] || {}, b2 = b[2] || {}, b3 = b[3] || {};
  var para1 = segs(b1.contenu, "para")[0];
  var outilsSec = segs(b1.contenuApres, "section")[0];
  var coach1 = segs(b1.contenuApres, "encadre")[0];
  var para2 = segs(b2.contenu, "para")[0];
  var sec2 = segs(b2.contenu, "section");
  var coach2 = segs(b2.contenu, "encadre")[0];
  var para3 = segs(b3.contenu, "para")[0];
  var etapes = segs(b3.contenu, "section")[0];
  var coach3 = segs(b3.contenu, "encadre")[0];
  var seg = function (s) { return s ? { gras: r(s.gras), texte: r(s.texte), titre: r(s.titre), sous: r(s.sous), puces: (s.puces || []).map(function (p) { return { gras: r(p.gras), texte: r(p.texte) }; }) } : null; };
  var quiz = (cours.quiz || []).map(function (q) {
    var opts = q.options ? (Array.isArray(q.options) ? q.options : (q.options[lg] || q.options.fr || [])) : null;
    return { type: q.type, question: r(q.question), image: q.image, options: opts, correct: q.correct, explication: r(q.explication) };
  });
  return {
    titre: r(cours.titre), duree: r(cours.duree), type: r(cours.type),
    couv: { citation: r(couv.citation), auteur: r(couv.auteur) },
    t1: nettoyerTitre(r(b1.titre)), para1: seg(para1), outilsSec: seg(outilsSec), coach1: seg(coach1),
    t2: nettoyerTitre(r(b2.titre)), para2: seg(para2), tech: seg(sec2[0]), check: seg(sec2[1]), coach2: seg(coach2),
    t3: nettoyerTitre(r(b3.titre)), para3: seg(para3), etapes: seg(etapes), coach3: seg(coach3),
    quiz: quiz
  };
}
/* garde : le cours a-t-il bien la structure attendue ? sinon on garde l'affichage d'avant */
function ok(cours) {
  try {
    if (!cours || cours.id !== "g1-c2" || !cours.blocs || cours.blocs.length < 4) return false;
    var d = lireCours(cours, "fr");
    return !!(d.para1 && d.outilsSec && d.outilsSec.puces.length >= 5 && d.tech && d.tech.puces.length >= 3 && d.check && d.check.puces.length >= 4 && d.etapes && d.etapes.puces.length === 4 && d.quiz.length === 6);
  } catch (e) { return false; }
}

/* ---------------- styles ---------------- */
var CSS = [
".pso{--noir:#070A08;--petrole:#101A1D;--petrole2:#101D22;--ivoire:#F3EEE4;--champ:#C9A66B;--doux:rgba(243,238,228,.74);--ligne:rgba(201,166,107,.28);background:var(--noir);color:var(--ivoire);font-family:'Montserrat','Noto Sans JP','Noto Sans Arabic',sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}",
".pso *{box-sizing:border-box}",
".pso h1,.pso h2,.pso h3{font-family:'Cormorant Garamond','Noto Serif JP',Georgia,serif;font-weight:600;margin:0;color:var(--ivoire)}",
".pso p{margin:0}",
".pso button{font-family:inherit;cursor:pointer;color:inherit}",
".pso-wrap{display:grid;grid-template-columns:minmax(0,1fr);min-height:100vh}",
".pso-chap{display:none;background:var(--petrole);border-inline-end:1px solid rgba(201,166,107,.18);padding:22px 12px 28px;position:sticky;top:0;align-self:start;height:100vh;overflow:auto}",
".pso-chap h3{font-size:19px;letter-spacing:.3px;margin:0 8px 14px;color:var(--champ)}",
".pso-chap button{display:flex;gap:10px;align-items:center;width:100%;text-align:start;background:none;border:0;border-radius:10px;padding:9px 8px;font-size:12.5px;line-height:1.35;color:var(--doux)}",
".pso-chap button:hover{background:rgba(243,238,228,.06)}",
".pso-chap button[aria-current=true]{background:rgba(201,166,107,.16);color:var(--ivoire);font-weight:600}",
".pso-chap .n{flex:0 0 24px;height:24px;border-radius:50%;border:1px solid var(--ligne);display:inline-flex;align-items:center;justify-content:center;font-size:10.5px;color:var(--champ)}",
".pso-chap .n.fait{background:var(--champ);color:var(--noir);border-color:var(--champ)}",
"@media (min-width:1280px){.pso-wrap{grid-template-columns:230px minmax(0,1fr)}.pso-chap{display:block}}",
".pso-main{min-width:0}",
".pso-top{display:grid;grid-template-columns:minmax(0,1fr);gap:0}",
"@media (min-width:1480px){.pso-top{grid-template-columns:minmax(0,1fr) 340px}}",
".pso-hero{position:relative;min-height:330px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:22px 40px 30px}",
".pso-hero .bg{position:absolute;top:0;bottom:0;inset-inline-start:0;inset-inline-end:0;background:#070A08 url(images/pansage-hero.webp) 70% 22%/cover no-repeat}",
".pso-hero .vo{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.72) 34%,rgba(7,10,8,.12) 66%,rgba(7,10,8,0) 100%),linear-gradient(180deg,rgba(7,10,8,.45) 0%,rgba(7,10,8,0) 28%,rgba(7,10,8,.55) 100%)}",
"[dir=rtl] .pso-hero .vo{background:linear-gradient(270deg,rgba(7,10,8,.92) 0%,rgba(7,10,8,.72) 34%,rgba(7,10,8,.12) 66%,rgba(7,10,8,0) 100%),linear-gradient(180deg,rgba(7,10,8,.45) 0%,rgba(7,10,8,0) 28%,rgba(7,10,8,.55) 100%)}",
"[dir=rtl] .pso-hero .bg{background-position:30% 22%;transform:scaleX(-1)}",
".pso-hero>*:not(.bg):not(.vo){position:relative}",
".pso-bar{display:flex;align-items:center;gap:12px;position:absolute;top:18px;inset-inline:40px;z-index:2}",
".pso-back{width:38px;height:38px;border-radius:50%;border:1px solid var(--ligne);background:rgba(7,10,8,.55);display:inline-flex;align-items:center;justify-content:center;font-size:18px}",
".pso-crumb{font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--champ)}",
".pso-hero h1{font-size:clamp(36px,3.5vw,54px);line-height:1.04;max-width:430px;margin:10px 0 12px}",
".pso-cit{font-family:'Cormorant Garamond','Noto Serif JP',Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;max-width:470px;color:var(--ivoire)}",
".pso-cit small{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:11.5px;letter-spacing:.6px;color:var(--champ);margin-top:6px}",
".pso-meta{display:flex;gap:18px;flex-wrap:wrap;margin-top:16px;font-size:12.5px;color:var(--doux)}",
".pso-meta span{display:inline-flex;align-items:center;gap:7px}",
".pso-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:14px 40px;background:var(--noir)}",
"@media (min-width:1480px){.pso-cards{grid-template-columns:minmax(0,1fr);padding:14px 16px 14px 14px;align-content:start}}",
".pso-card{border:1px solid var(--ligne);border-radius:14px;background:linear-gradient(135deg,rgba(16,26,29,.96),rgba(16,29,34,.82));padding:14px 16px;text-align:start}",
".pso-card h3{font-size:19px;color:var(--ivoire);display:flex;gap:9px;align-items:center;margin-bottom:6px}",
".pso-card h3 svg{flex:0 0 auto;color:var(--champ)}",
".pso-card p{font-size:12.5px;line-height:1.55;color:var(--doux)}",
".pso-card.clair{background:var(--ivoire);border-color:var(--ivoire)}.pso-card.clair h3,.pso-card.clair p{color:#1b1a16}.pso-card.clair h3 svg{color:#8a6a2f}",
".pso-card.lien{width:100%;display:block}",
".pso-card.photo{background-size:cover;background-position:center}",
".pso-card.lien:hover{border-color:var(--champ)}",
".pso-vig{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;padding:12px 40px;background:rgba(7,10,8,.94);backdrop-filter:blur(8px);border-bottom:1px solid rgba(201,166,107,.14)}",
".pso-vig button{position:relative;height:150px;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.16);background:var(--petrole) center/cover no-repeat;text-align:start;padding:0}",
".pso-vig button:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 30%,rgba(7,10,8,.88) 100%)}",
".pso-vig button .big{position:absolute;top:8px;inset-inline-start:14px;z-index:1;font-family:'Cormorant Garamond',serif;font-size:44px;line-height:1;font-weight:500;color:#E9D9B4}",
".pso-vig button .lab{position:absolute;inset-inline:14px 52px;bottom:12px;z-index:1;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:21px;line-height:1.1;font-weight:600}",
".pso-vig button .arr{position:absolute;bottom:10px;inset-inline-end:12px;z-index:1;width:32px;height:32px;border-radius:50%;border:1px solid #E9D9B4;display:flex;align-items:center;justify-content:center;font-size:15px;color:#E9D9B4}",
".pso-vig button[aria-current=true]{border-color:var(--champ);box-shadow:0 0 0 1px var(--champ)}",
".pso-vig .sch{display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#2a2217,#0c100e)}",
".pso-vig .sch svg{position:absolute;top:10px;inset-inline-end:14px;height:92px;width:auto;opacity:.95}",
".pso-sec{padding:54px 40px 14px;scroll-margin-top:190px}",
".pso-duo{display:grid;grid-template-columns:minmax(0,1fr);border-top:1px solid rgba(201,166,107,.14)}",
"@media (min-width:1400px){.pso-duo{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.pso-duo>.pso-sec{border-top:0!important;padding-inline:40px 28px}.pso-duo>.pso-sec+.pso-sec{border-inline-start:1px solid rgba(201,166,107,.14);padding-inline:28px 40px}.pso-duo .pso-grid2{grid-template-columns:minmax(0,1fr)!important;gap:18px}}",
".pso-sec+.pso-sec{border-top:1px solid rgba(201,166,107,.14)}",
".pso-sechead{display:flex;gap:18px;align-items:baseline;margin-bottom:22px}",
".pso-num{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--champ);position:relative;flex:0 0 auto}",
".pso-num:after{content:'';display:block;height:1px;width:26px;background:var(--champ);margin-top:4px}",
".pso-sec h2{font-size:clamp(28px,2.6vw,38px);line-height:1.12}",
".pso-grid2{display:grid;grid-template-columns:minmax(0,1fr);gap:28px;align-items:start}",
"@media (min-width:1200px){.pso-grid2{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:40px}}",
".pso-txt{display:flex;flex-direction:column;gap:16px;font-size:15px;line-height:1.75}",
".pso-txt strong{color:var(--champ);font-weight:600}",
".pso-box{border:1px solid var(--ligne);border-radius:14px;background:rgba(16,26,29,.78);padding:15px 18px}",
".pso-box h3{font-size:20px;margin-bottom:8px;color:var(--champ)}",
".pso-box p,.pso-box li{font-size:14px;line-height:1.65;color:var(--ivoire)}",
".pso-box ul{margin:0;padding-inline-start:20px;display:flex;flex-direction:column;gap:6px}",
".pso-box.coach{border-inline-start:3px solid var(--champ)}",
".pso-box.coach h3{font-size:21px}",
".pso-box.err{border-color:rgba(201,166,107,.42)}",
".pso-box.err li::marker{color:var(--champ)}",
".pso-photo{border-radius:16px;overflow:hidden;border:1px solid var(--ligne);background:var(--petrole);position:relative}",
".pso-photo img{display:block;width:100%;height:100%;object-fit:cover}",
".pso-photo.grand{aspect-ratio:16/10}",
"@media (min-width:1200px){#pso-s1 .pso-grid2{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}#pso-s1 .pso-photo.grand{margin-inline-end:-40px;border-radius:18px 0 0 18px;border-inline-end:0;aspect-ratio:auto;min-height:340px}}",
"[dir=rtl] #pso-s1 .pso-photo.grand{border-radius:0 18px 18px 0!important}",
".pso-benef{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}",
".pso-benef div{border:1px solid var(--ligne);border-radius:12px;padding:12px 12px;background:rgba(16,29,34,.7);font-size:13px;line-height:1.4;display:flex;gap:9px;align-items:center}",
".pso-benef svg{flex:0 0 22px;color:var(--champ)}",
".pso-outrow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}",
".pso-ocard{border:1px solid var(--ligne);border-radius:14px;background:rgba(16,26,29,.78);overflow:hidden;display:flex;flex-direction:column}",
".pso-ocard .ph{position:relative;aspect-ratio:1/.85;background:var(--petrole)}",
".pso-ocard .ph img{width:100%;height:100%;object-fit:cover;display:block}",
".pso-ocard h4{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:22px;font-weight:600;color:var(--champ);margin:12px 14px 4px}",
".pso-ocard p{font-size:13px;line-height:1.6;color:var(--ivoire);margin:0 14px 14px!important}",
"@media (max-width:1279px){.pso-outrow{grid-template-columns:repeat(3,minmax(0,1fr))}}",
".pso-outils{display:grid;grid-template-columns:minmax(0,1fr);gap:24px}",
"@media (min-width:1200px){.pso-outils{grid-template-columns:minmax(0,1fr) 390px}}",
".pso-tl{display:flex;flex-direction:column;gap:8px}",
".pso-tl button{display:flex;gap:12px;align-items:flex-start;text-align:start;border:1px solid rgba(243,238,228,.12);border-radius:12px;background:rgba(16,26,29,.55);padding:11px 14px;font-size:14px;line-height:1.65;color:var(--ivoire)}",
".pso-tl button:hover{border-color:var(--ligne)}",
".pso-tl button[aria-pressed=true]{border-color:var(--champ);background:rgba(201,166,107,.1)}",
".pso-tl .pt{flex:0 0 46px;height:46px;border-radius:9px;background:var(--petrole) center/cover no-repeat;border:1px solid rgba(243,238,228,.14)}",
".pso-tl strong{color:var(--champ)}",
".pso-tpanel{position:sticky;top:150px;align-self:start}",
".pso-tpanel .pso-photo{aspect-ratio:1/.9}",
".pso-tpanel .cap{margin-top:9px;font-family:'Cormorant Garamond',serif;font-size:22px;text-align:center;color:var(--champ)}",
".pso-tth{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:10px}",
".pso-tth button{aspect-ratio:1;border-radius:8px;border:1px solid rgba(243,238,228,.16);background:var(--petrole) center/cover no-repeat;padding:0}",
".pso-tth button[aria-pressed=true]{border-color:var(--champ);box-shadow:0 0 0 1px var(--champ)}",
".pso-atelier{border:1px solid var(--ligne);border-radius:18px;background:linear-gradient(160deg,rgba(16,26,29,.95),rgba(7,10,8,.95));padding:18px 18px 16px}",
".pso-atelier h3{font-size:24px;color:var(--champ);margin-bottom:4px}",
".pso-atelier .aide{font-size:12.5px;color:var(--doux);margin-bottom:10px}",
".pso-hoofrow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:center}",
"@media (max-width:1399px){.pso-hoofrow{grid-template-columns:minmax(0,1fr)}}",
".pso-hoof{direction:ltr;max-width:300px;margin:0 auto;width:100%}",
".pso-hoof svg{width:100%;height:auto;display:block}",
".pso-hoof .zone{fill:rgba(201,166,107,0);stroke:none;cursor:pointer;transition:fill .2s}",
".pso-hoof .zone.on{fill:rgba(201,166,107,.42);stroke:#F3EEE4;stroke-width:2.5}",
".pso-hoof .zone.ligne{fill:none;stroke:rgba(201,166,107,0);stroke-width:16;stroke-linecap:round}",
".pso-hoof .zone.ligne.on{stroke:rgba(201,166,107,.75)}",
".pso-hoof .mk{cursor:pointer}",
".pso-hoof .mk circle{fill:#070A08;stroke:#C9A66B;stroke-width:1.8}",
".pso-hoof .mk.on circle{fill:#C9A66B}",
".pso-hoof .mk text{fill:#F3EEE4;font:600 13px Montserrat,sans-serif;text-anchor:middle}",
".pso-hoof .mk.on text{fill:#070A08}",
".pso-zones{display:flex;flex-direction:column;gap:6px}",
".pso-zones button{display:flex;gap:10px;align-items:center;border:1px solid rgba(243,238,228,.14);border-radius:10px;background:rgba(16,26,29,.6);padding:7px 11px;font-size:13px;text-align:start;color:var(--ivoire)}",
".pso-zones button .nn{flex:0 0 22px;height:22px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--champ)}",
".pso-zones button[aria-pressed=true]{border-color:var(--champ);background:rgba(201,166,107,.16)}",
".pso-zones button[aria-pressed=true] .nn{background:var(--champ);color:var(--noir)}",
".pso-info{font-size:13.5px;line-height:1.65}.pso-info.plein{margin-top:12px;border-top:1px solid rgba(201,166,107,.2);padding-top:11px}",
".pso-info strong{color:var(--champ)}",
".pso-step{display:flex;align-items:center;gap:10px;margin-top:10px;justify-content:center}",
".pso-step button{width:34px;height:34px;border-radius:50%;border:1px solid var(--champ);background:none;font-size:16px;color:var(--champ)}",
".pso-step span{font-size:12.5px;color:var(--doux);min-width:40px;text-align:center}",
".pso-sens{margin-top:10px;display:flex;gap:9px;align-items:center;justify-content:center;font-size:12px;color:var(--champ)}",
".pso-queue{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-self:start}",
".pso-queue figure{margin:0;position:relative;border-radius:12px;overflow:hidden;border:1px solid var(--ligne);aspect-ratio:4/3;background:var(--petrole)}",
".pso-queue img{width:100%;height:100%;object-fit:cover;display:block}",
".pso-queue figcaption{position:absolute;top:8px;inset-inline-start:8px;width:28px;height:28px;border-radius:50%;background:var(--champ);color:var(--noir);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center}",
".pso-exo{border:1px solid var(--ligne);border-radius:16px;background:rgba(16,26,29,.7);padding:16px 18px}",
".pso-exo h3{font-size:22px;color:var(--champ);margin-bottom:4px}",
".pso-exo .aide{font-size:12.5px;color:var(--doux);margin-bottom:11px}",
".pso-exo .liste{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}",
".pso-exo .liste button{display:flex;gap:10px;align-items:flex-start;text-align:start;border:1px solid rgba(243,238,228,.16);border-radius:10px;background:rgba(7,10,8,.5);padding:10px 12px;font-size:13px;line-height:1.5;color:var(--ivoire)}",
".pso-exo .liste button .rg{flex:0 0 24px;height:24px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:12px;color:var(--champ)}",
".pso-exo .liste button.pris{border-color:var(--champ);background:rgba(201,166,107,.12)}",
".pso-exo .liste button.pris .rg{background:var(--champ);color:var(--noir)}",
".pso-exo .msg{margin-top:10px;font-size:13.5px;font-weight:600}",
".pso-exo .msg.ok{color:#9ad6a4}.pso-exo .msg.ko{color:#e3a78f}",
".pso-exo .rec{margin-top:8px;background:none;border:1px solid var(--champ);color:var(--champ);border-radius:999px;padding:6px 16px;font-size:12.5px}",
".pso-sec5 .cartes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:6px}",
".pso-fc{border:1px solid var(--ligne);border-radius:14px;background:rgba(16,26,29,.8);padding:15px 16px;text-align:start;min-height:150px;display:flex;flex-direction:column;gap:8px;font-size:13.5px;line-height:1.55;color:var(--ivoire)}",
".pso-fc .q{font-weight:600}.pso-fc .voir{margin-top:auto;font-size:12px;color:var(--champ)}",
".pso-fc .rep{color:var(--champ);font-weight:600}.pso-fc .ex{color:var(--doux);font-size:12.5px}",
".pso-fc[aria-pressed=true]{border-color:var(--champ);background:rgba(201,166,107,.09)}",
".pso-cta{display:flex;gap:12px;flex-wrap:wrap;margin:26px 0 44px}",
".pso-btn{border-radius:999px;padding:13px 26px;font-size:14px;font-weight:600;border:1px solid var(--champ);background:none;color:var(--champ)}",
".pso-btn.plein{background:var(--champ);color:var(--noir)}",
".pso-vids{display:flex;gap:12px;flex-wrap:wrap}",
".pso-vid{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--champ);border-radius:999px;padding:8px 16px;font-size:13px;color:var(--champ);text-decoration:none}",
".pso-vid:hover{background:rgba(201,166,107,.14)}",
".pso-hb{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}",
".pso-hb button{border:1px solid var(--ligne);border-radius:999px;background:rgba(16,29,34,.8);padding:8px 14px;font-size:12.5px;color:var(--ivoire);text-align:start}",
".pso-hb button:hover{border-color:var(--champ)}",
".pso-secu{display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr);gap:16px;align-items:center}",
".pso-defi{display:grid;grid-template-columns:minmax(0,1fr);gap:0}",
".pso a:focus-visible,.pso button:focus-visible{outline:2px solid var(--champ);outline-offset:2px}",
".pso-tmp{position:absolute;bottom:6px;inset-inline-end:6px;font-size:9.5px;letter-spacing:.4px;background:rgba(7,10,8,.72);border:1px solid var(--ligne);border-radius:999px;padding:2px 8px;color:var(--champ)}",
"@media (max-width:1279px){.pso-sec{padding-inline:28px}.pso-vig{padding-inline:28px}.pso-hero{padding-inline:28px}.pso-bar{inset-inline:28px}.pso-cards{padding-inline:28px}}"
].join("\n");

/* ---------------- icônes (SVG simples, pas d'emoji) ---------------- */
function ico(path, w) { return h("svg", { width: w || 20, height: w || 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, path.map(function (d, i) { return h("path", { key: i, d: d }); })); }
var ICO = {
  coupe: function (w) { return ico(["M8 21h8", "M12 17v4", "M7 4h10v5a5 5 0 0 1-10 0V4z", "M17 5h3v2a3 3 0 0 1-3 3", "M7 5H4v2a3 3 0 0 0 3 3"], w); },
  bulle: function (w) { return ico(["M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.3A8 8 0 1 1 21 12z", "M9 11h6", "M9 14h4"], w); },
  coeur: function (w) { return ico(["M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"], w); },
  loupe: function (w) { return ico(["M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z", "M20 20l-4-4"], w); },
  eclair: function (w) { return ico(["M13 3L5 14h6l-1 7 8-11h-6l1-7z"], w); },
  horloge: function (w) { return ico(["M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z", "M12 8v4l3 2"], w); },
  livre: function (w) { return ico(["M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5z", "M18 3v16"], w); },
  fleche: function (w) { return ico(["M5 12h14", "M13 6l6 6-6 6"], w); },
  ampoule: function (w) { return ico(["M9 18h6", "M10 21h4", "M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"], w); }
};

/* ---------------- schéma du sabot (vue de dessous), dessiné pour être anatomiquement juste ----------------
   Pince en haut, talons en bas. Paroi = anneau extérieur ; sole = creux entre paroi et fourchette ;
   fourchette = triangle en V (pointe vers la pince) ; lacunes = deux sillons de chaque côté de la fourchette ;
   barres = prolongement de la paroi le long des lacunes. */
var HOOF_OUT = "M200,28 C285,28 352,100 355,200 C357,290 330,372 292,418 C282,432 266,438 250,430 Q200,408 150,430 C134,438 118,432 108,418 C70,372 43,290 45,200 C48,100 115,28 200,28 Z";
var HOOF_IN = "translate(32 36.6) scale(0.84)";
var FROG = "M200,168 C216,215 244,300 250,388 C232,408 168,408 150,388 C156,300 184,215 200,168 Z";
var GROOVE_L = "M178,222 C160,270 144,330 134,392";
var GROOVE_R = "M222,222 C240,270 256,330 266,392";
var ZONES = [
  { id: "pince", t: "zPince", mk: [200, 54] },
  { id: "paroi", t: "zParoi", mk: [342, 232] },
  { id: "sole", t: "zSole", mk: [272, 150] },
  { id: "fourchette", t: "zFourchette", mk: [200, 330] },
  { id: "lacunes", t: "zLacunes", mk: [120, 300] },
  { id: "talons", t: "zTalons", mk: [292, 396] }
];
function SchemaSabot(p) {
  var act = p.zone, pick = p.onPick;
  var on = function (id) { return act === id ? " on" : ""; };
  var clic = function (id) { return { onClick: function () { pick(id); } }; };
  return h("svg", { viewBox: "0 0 400 460", role: "img", "aria-label": p.alt },
    h("defs", null,
      h("radialGradient", { id: "psoSole", cx: "50%", cy: "42%", r: "62%" }, h("stop", { offset: "0", stopColor: "#4a3d2c" }), h("stop", { offset: "1", stopColor: "#2a2218" })),
      h("clipPath", { id: "psoClipIn" }, h("path", { d: HOOF_OUT, transform: HOOF_IN }))),
    h("path", { d: HOOF_OUT, fill: "#6e5a3e", stroke: "#C9A66B", strokeOpacity: 0.45, strokeWidth: 2 }),
    h("path", { d: HOOF_OUT, transform: HOOF_IN, fill: "url(#psoSole)", stroke: "#d9c9a6", strokeOpacity: 0.55, strokeWidth: 3 }),
    h("g", { clipPath: "url(#psoClipIn)" },
      h("path", { d: "M168,238 C146,290 128,352 118,404", stroke: "#6a563c", strokeWidth: 9, fill: "none", strokeLinecap: "round" }),
      h("path", { d: "M232,238 C254,290 272,352 282,404", stroke: "#6a563c", strokeWidth: 9, fill: "none", strokeLinecap: "round" })),
    h("path", { d: GROOVE_L, stroke: "#130e09", strokeWidth: 10, fill: "none", strokeLinecap: "round" }),
    h("path", { d: GROOVE_R, stroke: "#130e09", strokeWidth: 10, fill: "none", strokeLinecap: "round" }),
    h("path", { d: FROG, fill: "#5a4430", stroke: "#2b2016", strokeWidth: 2 }),
    h("path", { d: "M200,262 L200,396", stroke: "#130e09", strokeWidth: 5, fill: "none", strokeLinecap: "round" }),
    h("path", { d: "M187,398 L200,380 L213,398", stroke: "#130e09", strokeWidth: 4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* surbrillances (zones cliquables) */
    h("path", Object.assign({ className: "zone" + on("pince"), d: "M120,70 Q200,2 280,70 L246,100 Q200,72 154,100 Z" }, clic("pince"))),
    h("g", clic("paroi"), h("path", { className: "zone" + on("paroi"), fillRule: "evenodd", d: "M200,28 C285,28 352,100 355,200 C357,290 330,372 292,418 C282,432 266,438 250,430 Q200,408 150,430 C134,438 118,432 108,418 C70,372 43,290 45,200 C48,100 115,28 200,28 Z M200,59.5 C129,59.5 82,120 80,200 C79,271 97,334 126,372 C134,383 143,388 150,383 Q200,366 250,383 C257,388 266,383 274,372 C303,334 321,271 320,200 C318,120 271,59.5 200,59.5 Z" })),
    h("path", Object.assign({ className: "zone" + on("sole"), fillRule: "evenodd", d: "M200,70 C130,70 92,125 90,200 C89,262 104,318 130,352 L170,330 C160,290 170,250 200,168 C230,250 240,290 230,330 L270,352 C296,318 311,262 310,200 C308,125 270,70 200,70 Z" }, clic("sole"))),
    h("path", Object.assign({ className: "zone" + on("fourchette"), d: FROG }, clic("fourchette"))),
    h("path", Object.assign({ className: "zone ligne" + on("lacunes"), d: GROOVE_L }, clic("lacunes"))),
    h("path", Object.assign({ className: "zone ligne" + on("lacunes"), d: GROOVE_R }, clic("lacunes"))),
    h("ellipse", Object.assign({ className: "zone" + on("talons"), cx: 120, cy: 408, rx: 34, ry: 22, transform: "rotate(-22 120 408)" }, clic("talons"))),
    h("ellipse", Object.assign({ className: "zone" + on("talons"), cx: 280, cy: 408, rx: 34, ry: 22, transform: "rotate(22 280 408)" }, clic("talons"))),
    /* flèche du sens du curage : du talon vers la pince */
    h("path", { d: "M26,420 L26,70", stroke: "#C9A66B", strokeWidth: 3, fill: "none", strokeLinecap: "round", strokeDasharray: "2 9" }),
    h("path", { d: "M14,86 L26,64 L38,86", stroke: "#C9A66B", strokeWidth: 3, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
    ZONES.map(function (z, i) {
      return h("g", { key: z.id, className: "mk" + on(z.id), onClick: function () { pick(z.id); }, role: "button", "aria-label": p.noms[z.id] },
        h("circle", { cx: z.mk[0], cy: z.mk[1], r: 13 }), h("text", { x: z.mk[0], y: z.mk[1] + 4.5 }, String(i + 1)));
    }));
}

/* ---------------- composant principal ---------------- */
function HypePansageOrdi(props) {
  var cours = props.cours, lg = props.langue || "fr";
  var L = function (k) { var o = T[k]; return (o && (o[lg] || (NOUVEAUX.indexOf(lg) >= 0 && o.en) || o.fr)) || ""; };
  var d = lireCours(cours, lg);
  var rtl = lg === "ar";

  var _a = useState(0), outil = _a[0], setOutil = _a[1];
  var _b = useState(null), zone = _b[0], setZone = _b[1];
  var _c = useState([]), ordre = _c[0], setOrdre = _c[1];
  var _d = useState({}), cartesOuv = _d[0], setCartesOuv = _d[1];
  var _e = useState("s1"), actif = _e[0], setActif = _e[1];
  var refs = useRef({});

  /* section visible -> vignette allumée */
  useEffect(function () {
    var ids = ["s1", "s2", "s3", "s4", "s5"];
    var els = ids.map(function (i) { return document.getElementById("pso-" + i); }).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) setActif(en.target.id.replace("pso-", "")); });
    }, { rootMargin: "-25% 0px -62% 0px", threshold: 0 });
    els.forEach(function (e) { io.observe(e); });
    return function () { io.disconnect(); };
  }, []);

  var aller = function (id) {
    var el = document.getElementById("pso-" + id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  var hey = function (q) {
    try {
      window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: d.titre, score: null, cheval: null, question: q || "" };
    } catch (e) { }
    props.setEcran("assistant");
  };

  /* outils : l'ordre des 5 puces du cours = étrille, bouchon, brosse douce, cure-pied, éponge */
  var OUTILS = [
    { img: "images/pansage-outil-etrille.webp", net: true }, { img: "images/pansage-outil-bouchon.webp", net: true },
    { img: "images/pansage-outil-brosse-douce.webp", net: true }, { img: "images/pansage-outil-cure-pied.webp", net: true },
    { img: "images/pansage-outil-eponge.webp", net: true }
  ];
  var nomOutil = function (p) { return String(p.gras || "").replace(/\s*[:：]\s*$/, ""); };

  /* texte associé à chaque zone du sabot (lu dans le cours) */
  var zoneTexte = function (id) {
    var tp = d.tech.puces, cp = d.check.puces;
    if (id === "sole") return tp[0];
    if (id === "fourchette") return tp[1];
    if (id === "lacunes") return tp[2];
    if (id === "paroi") return cp[3];
    return { gras: "", texte: d.tech.sous };
  };
  var ETAPES_CURAGE = ["sole", "fourchette", "lacunes"];
  var noms = {}; ZONES.forEach(function (z) { noms[z.id] = L(z.t); });
  var idxEtape = ETAPES_CURAGE.indexOf(zone);
  var pasPlus = function (s) {
    var i = idxEtape < 0 ? (s > 0 ? 0 : 2) : (idxEtape + s + 3) % 3;
    setZone(ETAPES_CURAGE[i]);
  };

  /* exercice de remise en ordre (queue) */
  var PERM = [2, 0, 3, 1];   /* ordre d'affichage mélangé, fixe */
  var etapes = d.etapes.puces;
  var finiOrdre = ordre.length === etapes.length;
  var bonOrdre = finiOrdre && ordre.every(function (v, i) { return v === i; });
  var cliqueEtape = function (i) { if (ordre.indexOf(i) >= 0 || finiOrdre) return; setOrdre(ordre.concat([i])); };
  var sansNum = function (s) { return String(s || "").replace(/^\s*\d+\s*[.)]\s*/, ""); };

  var termineeFn = function () { if (props.onTerminer) props.onTerminer(); };
  var Selecteur = props.Selecteur;

  /* questions Hey Baby du chapitre : celles de l'appli (QUESTIONS_HB) ; l'allemand et l'arabe n'y existent pas encore -> les nôtres */
  var HBQ_DE_AR = {
    de: ["In welcher Reihenfolge benutze ich die Bürsten beim Putzen?", "Wie kratze ich die Hufe aus, ohne den Strahl zu verletzen?", "Mein Pferd bewegt sich beim Putzen, was tun?"],
    ar: ["بأي ترتيب أستخدم الفرش أثناء تنظيف الحصان؟", "كيف أنظف الحوافر دون إيذاء الشوكة؟", "حصاني يتحرك أثناء التنظيف، ماذا أفعل؟"]
  };
  var hbQuestions = (HBQ_DE_AR[lg] || (props.questionsHB || []).slice(0, 3)).concat([L("hbQ4")]);

  function Sec(id, num, titre, enfants) {
    return h("section", { id: "pso-" + id, className: "pso-sec" + (id === "s5" ? " pso-sec5" : "") },
      h("div", { className: "pso-sechead" }, h("div", { className: "pso-num" }, num), h("h2", null, titre)),
      enfants);
  }
  function BoiteCoach(seg) {
    if (!seg) return null;
    return h("div", { className: "pso-box coach" }, h("h3", null, seg.titre), h("p", null, seg.texte));
  }
  var vig = [
    { id: "s1", t: "vComprendre", img: "images/pansage-comprendre.webp" },
    { id: "s2", t: "vOutils", img: "images/pansage-outil-ensemble.webp" },
    { id: "s3", t: "vPieds", img: "images/pansage-pieds.webp" },
    { id: "s4", t: "vQueue", img: "images/pansage-queue-large.webp" },
    { id: "s5", t: "vQuiz", img: "images/pansage-quiz.webp" }
  ];
  var idxCourant = -1;
  (props.coursListe || []).forEach(function (c, i) { if (c && c.id === cours.id) idxCourant = i; });

  return h("div", { className: "pso", dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, CSS),
    h("div", { className: "pso-wrap" },
      /* sommaire des chapitres du Galop 1 (réel) */
      h("nav", { className: "pso-chap", "aria-label": L("chapitres") },
        h("h3", null, L("chapitres")),
        (props.coursListe || []).map(function (c, i) {
          var fait = (props.coursTermines || []).indexOf(c.id) >= 0;
          return h("button", { key: c.id, type: "button", "aria-current": c.id === cours.id ? "true" : undefined, onClick: function () { if (c.id !== cours.id && props.onOuvrirCours) props.onOuvrirCours(c.id); } },
            h("span", { className: "n" + (fait ? " fait" : "") }, fait ? "✓" : String(i + 1)), h("span", null, typeof c.titre === "string" ? c.titre : pickLg(c.titre, lg)));
        })),
      h("main", { className: "pso-main" },
        h("div", { className: "pso-top" },
          h("header", { className: "pso-hero" },
            h("div", { className: "bg", role: "img", "aria-label": d.titre }), h("div", { className: "vo" }),
            h("div", { className: "pso-bar" },
              h("button", { type: "button", className: "pso-back", "aria-label": L("retour"), onClick: props.onRetour }, rtl ? "›" : "‹"),
              h("span", { className: "pso-crumb" }, "Galop 1  ›  " + d.titre),
              h("span", { style: { marginInlineStart: "auto" } }, Selecteur ? h(Selecteur, { compact: true }) : null)),
            h("h1", null, d.titre),
            d.couv.citation ? h("p", { className: "pso-cit" }, "« " + d.couv.citation.replace(/^[«"“]\s*|\s*[»"”]$/g, "") + " »", d.couv.auteur ? h("small", null, d.couv.auteur) : null) : null,
            h("div", { className: "pso-meta" },
              d.duree ? h("span", null, ICO.horloge(16), d.duree) : null,
              d.type ? h("span", null, ICO.livre(16), d.type) : null,
              h("span", null, ICO.coupe(16), "Galop 1"))),
          h("aside", { className: "pso-cards" },
            h("div", { className: "pso-card photo", style: { backgroundImage: "linear-gradient(90deg,rgba(7,10,8,.94) 40%,rgba(7,10,8,.55)),url(images/pansage-outil-ensemble.webp)" } }, h("h3", null, ICO.coupe(20), L("coach")), h("p", null, d.coach1 ? d.coach1.texte : "")),
            h("button", { type: "button", className: "pso-card lien", onClick: function () { hey(""); } }, h("h3", null, ICO.bulle(20), L("heyBaby")), h("p", null, hbQuestions[0] || "")),
            h("button", { type: "button", className: "pso-card lien clair", onClick: function () { aller("s4"); } }, h("h3", null, ICO.coupe(20), L("defi")), h("p", null, L("defiTxt"))))),

        h("div", { className: "pso-vig", role: "tablist" },
          vig.map(function (v, i) {
            return h("button", { key: v.id, type: "button", role: "tab", "aria-current": actif === v.id ? "true" : undefined, onClick: function () { aller(v.id); }, className: v.sch ? "sch" : undefined, style: v.img ? { backgroundImage: "url(" + v.img + ")" } : undefined },
              v.sch ? h("svg", { viewBox: "0 0 400 460", "aria-hidden": true }, h("path", { d: HOOF_OUT, fill: "#6e5a3e", stroke: "#C9A66B", strokeOpacity: .5, strokeWidth: 3 }), h("path", { d: HOOF_OUT, transform: HOOF_IN, fill: "#2f261a" }), h("path", { d: FROG, fill: "#5a4430" })) : null,
              h("b", { className: "big" }, "0" + (i + 1)), h("span", { className: "lab" }, L(v.t)), h("span", { className: "arr", "aria-hidden": true }, rtl ? "←" : "→"));
          })),

        /* 01 — COMPRENDRE */
        Sec("s1", "01", d.t1,
          h("div", { className: "pso-grid2" },
            h("div", { className: "pso-txt" },
              h("p", null, d.para1.gras ? h("strong", null, d.para1.gras + " ") : null, d.para1.texte),
              h("div", { className: "pso-benef" },
                h("div", null, ICO.coeur(22), L("benef1")), h("div", null, ICO.loupe(22), L("benef2")), h("div", null, ICO.eclair(22), L("benef3")))),
            h("div", { className: "pso-photo grand" }, h("img", { src: "images/pansage-comprendre-2.webp", alt: "", loading: "lazy" })))),

        /* 02 — LES OUTILS */
        Sec("s2", "02", nettoyerTitre(d.outilsSec.titre),
          h("div", { className: "pso-txt" },
            h("div", { className: "pso-outrow" },
              d.outilsSec.puces.map(function (p, i) {
                return h("article", { key: i, className: "pso-ocard" },
                  h("div", { className: "ph" }, h("img", { src: OUTILS[i] ? OUTILS[i].img : "", alt: nomOutil(p), loading: "lazy" }), OUTILS[i] && OUTILS[i].net ? null : h("span", { className: "pso-tmp" }, L("temp"))),
                  h("h4", null, nomOutil(p)),
                  h("p", null, p.texte));
              })),
            h("div", { className: "pso-vids" }, h("a", { href: "https://www.youtube.com/watch?v=4iuXTHiMWGg", target: "_blank", rel: "noopener noreferrer", className: "pso-vid" }, ICO.fleche(16), L("video")), h("a", { href: "https://www.youtube.com/watch?v=gkLOvsndOms", target: "_blank", rel: "noopener noreferrer", className: "pso-vid" }, ICO.fleche(16), L("video"))),
            BoiteCoach(d.coach1),
            h("div", { className: "pso-grid2" },
              h("div", { className: "pso-box" }, h("h3", null, L("observer")), h("p", null, L("observerTxt"))),
              h("div", { className: "pso-box err" }, h("h3", null, L("erreurs")), h("ul", null, h("li", null, L("err1")), h("li", null, L("err2")), h("li", null, L("err3")), h("li", null, L("err4"))))),
            h("div", { className: "pso-hb" }, hbQuestions.map(function (q, i) { return h("button", { key: i, type: "button", onClick: function () { hey(q); } }, q); })))),

        h("div", { className: "pso-duo" },
        /* 03 — LES PIEDS */
        Sec("s3", "03", d.t2,
          h("div", { className: "pso-grid2" },
            h("div", { className: "pso-txt" },
              h("p", null, d.para2 ? d.para2.texte : ""),
              h("div", { className: "pso-box" }, h("h3", null, d.tech.titre), d.tech.sous ? h("p", { style: { marginBottom: 8 } }, d.tech.sous) : null,
                h("ul", null, d.tech.puces.map(function (p, i) { return h("li", { key: i }, h("strong", { style: { color: "#C9A66B" } }, p.gras + " "), p.texte); }))),
              h("div", { className: "pso-box" }, h("h3", null, d.check.titre), d.check.sous ? h("p", { style: { marginBottom: 8 } }, d.check.sous) : null,
                h("ul", null, d.check.puces.map(function (p, i) { return h("li", { key: i }, h("strong", { style: { color: "#C9A66B" } }, p.gras + " "), p.texte); }))),
              h("div", { className: "pso-vids" }, h("a", { href: "https://www.youtube.com/watch?v=ZLviq3uNK3A", target: "_blank", rel: "noopener noreferrer", className: "pso-vid" }, ICO.fleche(16), L("video"))),
              BoiteCoach(d.coach2)),
            h("div", { className: "pso-atelier" },
              h("h3", null, L("atelier")), h("p", { className: "aide" }, L("atelierAide")),
              h("div", { className: "pso-hoofrow" },
                h("div", { className: "pso-hoof" }, h(SchemaSabot, { zone: zone, onPick: function (id) { setZone(zone === id ? null : id); }, noms: noms, alt: L("atelier") })),
                h("div", { className: "pso-zones" },
                  ZONES.map(function (z, i) { return h("button", { key: z.id, type: "button", "aria-pressed": zone === z.id, onClick: function () { setZone(zone === z.id ? null : z.id); } }, h("span", { className: "nn" }, String(i + 1)), L(z.t)); }),
                  h("div", { className: "pso-step" },
                    h("button", { type: "button", onClick: function () { pasPlus(-1); }, "aria-label": "‹" }, rtl ? "›" : "‹"),
                    h("span", null, idxEtape >= 0 ? (idxEtape + 1) + " / 3" : "1 · 2 · 3"),
                    h("button", { type: "button", onClick: function () { pasPlus(1); }, "aria-label": "›" }, rtl ? "‹" : "›")))),
              h("div", { className: "pso-sens" }, ICO.fleche(18), L("sensCurage")),
              h("div", { className: "pso-info" + (zone ? " plein" : ""), "aria-live": "polite" },
                zone ? (function () { var z = zoneTexte(zone); return h("p", null, z.gras ? h("strong", null, z.gras + " ") : null, z.texte); })() : null)))),

        /* 04 — LA QUEUE */
        Sec("s4", "04", d.t3,
          h("div", { className: "pso-txt" },
            h("div", { className: "pso-grid2" },
              h("div", { className: "pso-txt" },
                h("p", null, d.para3 ? d.para3.texte : ""),
                h("div", { className: "pso-box" }, h("h3", null, d.etapes.titre),
                  h("ul", { style: { listStyle: "none", paddingInlineStart: 0 } }, etapes.map(function (p, i) { return h("li", { key: i }, h("strong", { style: { color: "#C9A66B" } }, p.gras + " "), p.texte); }))),
                BoiteCoach(d.coach3)),
              h("div", { className: "pso-queue" },
                [1, 2, 3, 4].map(function (n) { return h("figure", { key: n }, h("img", { src: "images/pansage-queue-" + n + ".webp", alt: "", loading: "lazy" }), h("figcaption", null, String(n))); }))),
            h("div", { className: "pso-grid2" },
              h("div", { className: "pso-exo" },
                h("h3", null, L("exoTitre")), h("p", { className: "aide" }, L("exoAide")),
                h("div", { className: "liste" }, PERM.map(function (i) {
                  var rang = ordre.indexOf(i);
                  return h("button", { key: i, type: "button", className: rang >= 0 ? "pris" : "", onClick: function () { cliqueEtape(i); } }, h("span", { className: "rg" }, rang >= 0 ? String(rang + 1) : "·"), h("span", null, sansNum(etapes[i].gras)));
                })),
                finiOrdre ? h("div", { className: "msg " + (bonOrdre ? "ok" : "ko") }, bonOrdre ? L("exoOk") : L("exoKo")) : null,
                ordre.length ? h("button", { type: "button", className: "rec", onClick: function () { setOrdre([]); } }, L("exoRestart")) : null),
              h("div", { className: "pso-box" }, h("p", null, d.quiz[5] ? d.quiz[5].explication : ""))),
            h("div", { className: "pso-grid2" },
              h("div", { className: "pso-box" }, h("h3", null, L("defi")), h("p", null, L("defiTxt"))),
              h("div", { className: "pso-box" }, h("h3", null, L("retenir")), h("ul", null, h("li", null, L("ret1")), h("li", null, L("ret2")), h("li", null, L("ret3")), h("li", null, L("ret4"))))))),

        ),
        /* 05 — QUIZ ET RÉVISION */
        Sec("s5", "05", L("secQuiz"),
          h("div", null,
            h("h3", { style: { fontSize: 22, color: "#C9A66B", marginBottom: 10 } }, L("cartes")),
            h("div", { className: "cartes" }, d.quiz.map(function (q, i) {
              var ouv = !!cartesOuv[i];
              var rep = q.type === "vrai-faux" ? (q.correct ? L("vrai") : L("faux")) : (q.options ? q.options[q.correct] : "");
              return h("button", { key: i, type: "button", className: "pso-fc", "aria-pressed": ouv, onClick: function () { var n = Object.assign({}, cartesOuv); n[i] = !ouv; setCartesOuv(n); } },
                h("span", { className: "q" }, (q.image ? q.image + " " : "") + q.question),
                ouv ? h("span", { className: "rep" }, rep) : null,
                ouv ? h("span", { className: "ex" }, q.explication) : h("span", { className: "voir" }, L("voirRep") + " ›"));
            })),
            h("div", { className: "pso-cta" },
              h("button", { type: "button", className: "pso-btn plein", onClick: function () { props.setEcran("quiz"); } }, L("quizBtn")),
              h("button", { type: "button", className: "pso-btn", onClick: termineeFn }, L("terminer")))))
      )));
}
HypePansageOrdi.ok = ok;
HypePansageOrdi.version = VERSION;
window.HypePansageOrdi = HypePansageOrdi;
})();
