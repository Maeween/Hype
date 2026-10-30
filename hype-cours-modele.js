/* =====================================================================================
   hype-cours-modele.js — MODÈLE DE COURS ÉDITORIAL RÉUTILISABLE (tous les Galops)
   Créé le 30/10/2026 — cours pilote : Galop 1 « Le pansage, premier soin » (g1-c2).
   Référence visuelle : maquette « retenue » de Blandine (pack HYPE_Pansage, 30/10) :
   couverture photo + SOMMAIRE ILLUSTRÉ cliquable dessous, puis sections magazine qui alternent
   noir chaud et bleu pétrole, séparées par de fines vagues. Téléphone d'abord, puis tablette
   et ordinateur (même composant, mise en page adaptée à la largeur).

   CE FICHIER NE CONTIENT AUCUN TEXTE PÉDAGOGIQUE DU COURS : les paragraphes, outils, étapes,
   conseils du coach et questions du quiz sont LUS dans le cours lui-même (hype-cours-galop1.js
   et ses langues). Ici : la mise en page, et les petits textes de structure (titres de sections,
   sommaire, boutons), traduits dans les 14 langues de l'appli.

   COMMENT ÇA MARCHE (pour les prochains cours) :
     HypeCoursModele.config["<id du cours>"] = function (cours, lg, outils) { return { couverture, chapitres, sections } }
   - sections : [{ id, ton: "noir"|"petrole", kicker, titreA, titreB, photo, blocs: [...] }]
   - blocs possibles : para, citation, benefices, coach, aparte, liste, outils, etapes, onglets,
     videos, heybaby, ordre, sabot, revision, defi — chacun peut être retiré cours par cours.
   - chapitres : [{ label, sous, img, sections: [ids] }] -> sommaire illustré + mini-navigation.
   Un cours sans configuration garde exactement son affichage d'avant.

   BRANCHEMENT : EcranCoursCorps (index.html) appelle window.HypeCoursModele si .ok(cours) est vrai.
   RÈGLE DE LIVRAISON : à chaque modification, incrémenter le « ?v= » de la balise
   <script src="hype-cours-modele.js?v=N"> dans index.html.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement;
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var VERSION = 1;

/* ---------------- petits textes de structure (14 langues) ---------------- */
var LGS = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
var T = {
  vComprendre: {"fr":"Comprendre","en":"Understand","es":"Comprender","it":"Capire","ja":"理解する","de":"Verstehen","ar":"الفهم","zh":"理解","nl":"Begrijpen","pt":"Compreender","sv":"Förstå","ru":"Понять","pl":"Zrozumieć","ko":"이해하기"},
  vPieds: {"fr":"Les pieds","en":"The hooves","es":"Los cascos","it":"Gli zoccoli","ja":"蹄","de":"Die Hufe","ar":"الحوافر","zh":"马蹄","nl":"De hoeven","pt":"Os cascos","sv":"Hovarna","ru":"Копыта","pl":"Kopyta","ko":"발굽"},
  vQueue: {"fr":"La queue","en":"The tail","es":"La cola","it":"La coda","ja":"尻尾","de":"Der Schweif","ar":"الذيل","zh":"马尾","nl":"De staart","pt":"A cauda","sv":"Svansen","ru":"Хвост","pl":"Ogon","ko":"꼬리"},
  vQuiz: {"fr":"Quiz","en":"Quiz","es":"Quiz","it":"Quiz","ja":"クイズ","de":"Quiz","ar":"اختبار","zh":"测验","nl":"Quiz","pt":"Quiz","sv":"Quiz","ru":"Викторина","pl":"Quiz","ko":"퀴즈"},
  benef1: {"fr":"Une relation de confiance","en":"A bond of trust","es":"Una relación de confianza","it":"Un rapporto di fiducia","ja":"信頼関係","de":"Eine Vertrauensbeziehung","ar":"علاقة ثقة","zh":"信任关系","nl":"Een vertrouwensband","pt":"Uma relação de confiança","sv":"En förtroendefull relation","ru":"Доверительные отношения","pl":"Relacja oparta na zaufaniu","ko":"신뢰 관계"},
  benef2: {"fr":"Un contrôle de santé","en":"A health check","es":"Un control de salud","it":"Un controllo della salute","ja":"健康チェック","de":"Eine Gesundheitskontrolle","ar":"فحص للصحة","zh":"健康检查","nl":"Een gezondheidscheck","pt":"Uma verificação de saúde","sv":"En hälsokontroll","ru":"Проверка здоровья","pl":"Kontrola zdrowia","ko":"건강 점검"},
  benef3: {"fr":"Une préparation à l'effort","en":"Preparation for work","es":"Una preparación para el esfuerzo","it":"Una preparazione allo sforzo","ja":"運動への準備","de":"Eine Vorbereitung auf die Arbeit","ar":"تحضير للمجهود","zh":"为运动做准备","nl":"Een voorbereiding op de inspanning","pt":"Uma preparação para o esforço","sv":"En förberedelse inför arbetet","ru":"Подготовка к нагрузке","pl":"Przygotowanie do wysiłku","ko":"운동 준비"},
  savais: {"fr":"Le savais-tu ?","en":"Did you know?","es":"¿Lo sabías?","it":"Lo sapevi?","ja":"知ってた？","de":"Wusstest du das?","ar":"هل تعلم؟","zh":"你知道吗？","nl":"Wist je dat?","pt":"Sabias?","sv":"Visste du det?","ru":"А ты знал?","pl":"Czy wiesz, że?","ko":"알고 있었나요?"},
  savaisTxt: {"fr":"La peau d'un cheval est si sensible qu'il peut faire frémir un seul endroit pour chasser une simple mouche.","en":"A horse's skin is so sensitive that it can twitch one single spot to shake off a simple fly.","es":"La piel de un caballo es tan sensible que puede hacer estremecer un solo punto para espantar una simple mosca.","it":"La pelle del cavallo è così sensibile che può far fremere un solo punto per scacciare una semplice mosca.","ja":"馬の皮膚はとても敏感で、ハエ1匹を追い払うために、ごく一部分だけを震わせることができます。","de":"Die Haut eines Pferdes ist so empfindlich, dass es nur eine einzige Stelle zucken lassen kann, um eine Fliege zu verscheuchen.","ar":"جلد الحصان حساس جداً لدرجة أنه يستطيع أن يهز بقعة واحدة فقط ليطرد ذبابة.","zh":"马的皮肤非常敏感，只抖动一小块皮肤就能赶走一只苍蝇。","nl":"De huid van een paard is zo gevoelig dat het één enkele plek kan laten trillen om een vlieg te verjagen.","pt":"A pele de um cavalo é tão sensível que ele consegue fazer tremer um só ponto para afastar uma mosca.","sv":"Hästens hud är så känslig att den kan få en enda plats att dra ihop sig för att jaga bort en fluga.","ru":"Кожа лошади так чувствительна, что она может подёргать всего одним участком, чтобы согнать муху.","pl":"Skóra konia jest tak wrażliwa, że może poruszyć tylko jednym miejscem, by odgonić muchę.","ko":"말의 피부는 매우 예민해서 파리 한 마리를 쫓기 위해 한 부분만 움찔거릴 수 있어요."},
  coach: {"fr":"Le conseil du coach","en":"The coach's tip","es":"El consejo del entrenador","it":"Il consiglio del coach","ja":"コーチのアドバイス","de":"Der Tipp des Trainers","ar":"نصيحة المدرب","zh":"教练的建议","nl":"De tip van de coach","pt":"A dica do treinador","sv":"Tränarens tips","ru":"Совет тренера","pl":"Rada trenera","ko":"코치의 조언"},
  defi: {"fr":"Le défi du cavalier","en":"The rider's challenge","es":"El reto del jinete","it":"La sfida del cavaliere","ja":"ライダーへのチャレンジ","de":"Die Herausforderung für Reiter","ar":"تحدي الفارس","zh":"骑手挑战","nl":"De uitdaging voor de ruiter","pt":"O desafio do cavaleiro","sv":"Ryttarens utmaning","ru":"Вызов для всадника","pl":"Wyzwanie jeźdźca","ko":"라이더 챌린지"},
  defiTxt: {"fr":"Réalise le pansage complet de ton cheval et note ce que tu observes.","en":"Groom your horse from start to finish and write down what you notice.","es":"Haz el acicalado completo de tu caballo y anota lo que observes.","it":"Fai la pulizia completa del tuo cavallo e annota ciò che osservi.","ja":"愛馬の手入れを最初から最後まで行い、気づいたことを書き留めましょう。","de":"Pflege dein Pferd komplett und notiere, was dir auffällt.","ar":"قم بتنظيف حصانك بالكامل ودوّن ما تلاحظه.","zh":"给你的马做一次完整的刷拭，并记下你的观察。","nl":"Verzorg je paard van begin tot eind en schrijf op wat je opvalt.","pt":"Faz o tratamento completo do teu cavalo e anota o que observas.","sv":"Sköt om din häst från början till slut och skriv ner vad du ser.","ru":"Полностью вычисти свою лошадь и запиши, что ты заметил.","pl":"Wykonaj pełną pielęgnację swojego konia i zapisz, co zauważyłeś.","ko":"말을 처음부터 끝까지 손질하고 관찰한 것을 적어 보세요."},
  heyBaby: {"fr":"Demande à Hey Baby","en":"Ask Hey Baby","es":"Pregúntale a Hey Baby","it":"Chiedi a Hey Baby","ja":"Hey Babyに聞く","de":"Frag Hey Baby","ar":"اسأل Hey Baby","zh":"问问 Hey Baby","nl":"Vraag het Hey Baby","pt":"Pergunta à Hey Baby","sv":"Fråga Hey Baby","ru":"Спроси Hey Baby","pl":"Zapytaj Hey Baby","ko":"Hey Baby에게 물어보기"},
  hbQ4: {"fr":"Comment démêler la queue sans casser les crins ?","en":"How do I untangle the tail without breaking the hair?","es":"¿Cómo desenredo la cola sin romper las crines?","it":"Come districo la coda senza spezzare i crini?","ja":"毛を切らずに尻尾をほぐすには？","de":"Wie entwirre ich den Schweif, ohne die Haare abzubrechen?","ar":"كيف أفك عقد الذيل دون كسر الشعر؟","zh":"怎样梳开马尾又不弄断毛？","nl":"Hoe ontklit ik de staart zonder de haren te breken?","pt":"Como desembaraço a cauda sem partir as crinas?","sv":"Hur reder jag ut svansen utan att håren går av?","ru":"Как распутать хвост, не ломая волос?","pl":"Jak rozczesać ogon, nie łamiąc włosia?","ko":"털이 끊어지지 않게 꼬리를 풀려면?"},
  observerTxt: {"fr":"Pendant le pansage, regarde la peau, les membres et les yeux de ton cheval. Si quelque chose te semble inhabituel, préviens ton moniteur.","en":"While grooming, look at your horse's skin, legs and eyes. If something looks unusual, tell your instructor.","es":"Mientras lo acicalas, mira la piel, las patas y los ojos de tu caballo. Si algo te parece raro, avisa a tu monitor.","it":"Mentre lo pulisci, guarda la pelle, le gambe e gli occhi del tuo cavallo. Se ti sembra strano qualcosa, avvisa il tuo istruttore.","ja":"手入れの間、馬の皮膚、脚、目を見てください。いつもと違うところがあれば、指導者に知らせましょう。","de":"Schau beim Putzen auf die Haut, die Beine und die Augen deines Pferdes. Wenn dir etwas ungewöhnlich vorkommt, sag deinem Reitlehrer Bescheid.","ar":"أثناء العناية، انظر إلى جلد حصانك وقوائمه وعينيه. وإذا بدا لك شيء غير معتاد فأخبر مدربك.","zh":"刷拭时，看看马的皮肤、四肢和眼睛。如果发现异常，请告诉你的教练。","nl":"Kijk tijdens het verzorgen naar de huid, de benen en de ogen van je paard. Valt je iets vreemds op, zeg het dan tegen je instructeur.","pt":"Enquanto o tratas, olha para a pele, as patas e os olhos do teu cavalo. Se algo te parecer fora do normal, avisa o teu instrutor.","sv":"Titta på hästens hud, ben och ögon medan du borstar. Om något ser ovanligt ut, säg det till din instruktör.","ru":"Во время чистки смотри на кожу, ноги и глаза лошади. Если что-то кажется необычным, скажи инструктору.","pl":"Podczas czyszczenia patrz na skórę, nogi i oczy konia. Jeśli coś wydaje ci się nietypowe, powiedz instruktorowi.","ko":"손질하는 동안 말의 피부, 다리, 눈을 살펴보세요. 평소와 다른 점이 있으면 지도자에게 알려 주세요."},
  erreurs: {"fr":"Les erreurs à éviter","en":"Mistakes to avoid","es":"Los errores que hay que evitar","it":"Gli errori da evitare","ja":"避けたいミス","de":"Fehler, die du vermeiden solltest","ar":"أخطاء يجب تجنبها","zh":"要避免的错误","nl":"Fouten die je moet vermijden","pt":"Erros a evitar","sv":"Misstag att undvika","ru":"Ошибки, которых нужно избегать","pl":"Błędy, których należy unikać","ko":"피해야 할 실수"},
  err1: {"fr":"Utiliser l'étrille sur la tête ou les membres.","en":"Using the curry comb on the head or legs.","es":"Usar la almohaza en la cabeza o en las patas.","it":"Usare la striglia sulla testa o sulle gambe.","ja":"頭や脚にカリーコームを使うこと。","de":"Den Striegel an Kopf oder Beinen benutzen.","ar":"استخدام المشط المعدني على الرأس أو القوائم.","zh":"在头部或四肢使用刮毛梳。","nl":"De roskam op het hoofd of de benen gebruiken.","pt":"Usar a almofaça na cabeça ou nas patas.","sv":"Använda kardan på huvudet eller benen.","ru":"Использовать скребницу на голове или ногах.","pl":"Używać zgrzebła na głowie lub nogach.","ko":"머리나 다리에 커리콤을 쓰는 것."},
  err2: {"fr":"Creuser la fourchette avec la pointe du cure-pied.","en":"Digging into the frog with the tip of the hoof pick.","es":"Hurgar en la ranilla con la punta del limpiacascos.","it":"Scavare nel fettone con la punta del cavazoccoli.","ja":"ヒーフピックの先で蹄叉を掘ること。","de":"Mit der Spitze des Hufkratzers im Strahl bohren.","ar":"الحفر في الشوكة بطرف أداة تنظيف الحافر.","zh":"用蹄钩的尖端去抠蹄叉。","nl":"Met de punt van de hoefkrabber in de straal graven.","pt":"Escavar a ranilha com a ponta do limpa-cascos.","sv":"Peta i strålen med spetsen på hovkrattan.","ru":"Ковырять стрелку кончиком копытного крючка.","pl":"Wydłubywać strzałkę końcówką czyścika do kopyt.","ko":"발굽 청소 도구 끝으로 제차를 파는 것."},
  err3: {"fr":"Se placer juste derrière le cheval.","en":"Standing right behind the horse.","es":"Ponerse justo detrás del caballo.","it":"Mettersi proprio dietro al cavallo.","ja":"馬のすぐ後ろに立つこと。","de":"Direkt hinter dem Pferd stehen.","ar":"الوقوف خلف الحصان مباشرة.","zh":"直接站在马的正后方。","nl":"Pal achter het paard gaan staan.","pt":"Colocar-se mesmo atrás do cavalo.","sv":"Stå precis bakom hästen.","ru":"Вставать прямо позади лошади.","pl":"Stawać tuż za koniem.","ko":"말 바로 뒤에 서는 것."},
  err4: {"fr":"Tirer sur les crins pour défaire un nœud.","en":"Pulling on the hair to undo a knot.","es":"Tirar de las crines para deshacer un nudo.","it":"Tirare i crini per sciogliere un nodo.","ja":"結び目をほどくために毛を引っ張ること。","de":"An den Haaren ziehen, um einen Knoten zu lösen.","ar":"شدّ الشعر لفك عقدة.","zh":"用力拉扯鬃毛来解开结。","nl":"Aan de haren trekken om een knoop los te maken.","pt":"Puxar as crinas para desfazer um nó.","sv":"Dra i hårstråna för att reda ut en knut.","ru":"Дёргать волосы, чтобы распутать колтун.","pl":"Ciągnąć za włosie, żeby rozplątać kołtun.","ko":"매듭을 풀려고 털을 잡아당기는 것."},
  retenir: {"fr":"À retenir","en":"Key points","es":"Para recordar","it":"Da ricordare","ja":"覚えておこう","de":"Merke dir","ar":"للتذكّر","zh":"要记住","nl":"Om te onthouden","pt":"A reter","sv":"Att komma ihåg","ru":"Запомни","pl":"Zapamiętaj","ko":"기억하기"},
  ret1: {"fr":"L'étrille décolle, le bouchon enlève la poussière, la brosse douce termine.","en":"The curry comb loosens, the body brush removes dust, the soft brush finishes.","es":"La almohaza suelta, el cepillo duro quita el polvo y el cepillo suave remata.","it":"La striglia stacca, la spazzola dura toglie la polvere, quella morbida rifinisce.","ja":"カリーコームで汚れを浮かせ、ボディブラシでほこりを取り、柔らかいブラシで仕上げます。","de":"Der Striegel löst, die Kardätsche entfernt den Staub, die weiche Bürste macht den letzten Schliff.","ar":"المشط يفكّ الأوساخ، والفرشاة القاسية تزيل الغبار، والفرشاة الناعمة تنهي العمل.","zh":"刮毛梳松开污垢，硬毛刷除去灰尘，软毛刷收尾。","nl":"De roskam maakt los, de borstel haalt het stof weg, de zachte borstel maakt af.","pt":"A almofaça solta, a escova dura tira o pó e a escova macia finaliza.","sv":"Kardan lossar, borsten tar bort dammet och den mjuka borsten avslutar.","ru":"Скребница отделяет грязь, жёсткая щётка убирает пыль, мягкая щётка завершает.","pl":"Zgrzebło rozluźnia, szczotka usuwa kurz, miękka szczotka wykańcza.","ko":"커리콤으로 흙을 떼고, 딱딱한 솔로 먼지를 털고, 부드러운 솔로 마무리해요."},
  ret2: {"fr":"On cure toujours du talon vers la pince.","en":"Always pick from heel to toe.","es":"Se limpia siempre del talón hacia la pinza.","it":"Si pulisce sempre dal tallone verso la punta.","ja":"蹄の掃除はいつも踵からつま先へ。","de":"Immer von der Trachte zur Zehe auskratzen.","ar":"ننظف دائماً من الكعب نحو مقدمة الحافر.","zh":"清蹄时总是从蹄踵向蹄尖。","nl":"Altijd van hiel naar teen uitkrabben.","pt":"Limpa-se sempre do talão para a pinça.","sv":"Krata alltid från trakten mot tån.","ru":"Чистят всегда от пятки к носку.","pl":"Zawsze czyść od piętki ku przodowi kopyta.","ko":"발굽은 항상 뒤꿈치에서 앞쪽으로 청소해요."},
  ret3: {"fr":"On reste sur le côté du cheval, jamais juste derrière.","en":"Stay at the horse's side, never right behind.","es":"Te quedas al lado del caballo, nunca justo detrás.","it":"Si resta di fianco al cavallo, mai proprio dietro.","ja":"馬の横に立ち、すぐ後ろには立たないこと。","de":"Bleib seitlich beim Pferd, nie direkt dahinter.","ar":"نبقى إلى جانب الحصان، وليس خلفه مباشرة.","zh":"要站在马的侧面，绝不站在正后方。","nl":"Blijf aan de zijkant van het paard, nooit er pal achter.","pt":"Fica-se ao lado do cavalo, nunca mesmo atrás.","sv":"Stå vid sidan av hästen, aldrig precis bakom.","ru":"Стой сбоку от лошади, никогда прямо позади.","pl":"Stój z boku konia, nigdy tuż za nim.","ko":"항상 말의 옆에 서고, 바로 뒤에는 서지 않아요."},
  ret4: {"fr":"On démêle la queue de la pointe vers la base, mèche par mèche.","en":"Untangle the tail from the tip up to the base, one lock at a time.","es":"Se desenreda la cola desde la punta hacia la base, mechón a mechón.","it":"Si districa la coda dalla punta verso la base, ciocca per ciocca.","ja":"尻尾は毛先から根元に向かって、少しずつほぐします。","de":"Den Schweif von der Spitze zur Wurzel entwirren, Strähne für Strähne.","ar":"نفك عقد الذيل من الأطراف نحو الجذر، خصلة بعد خصلة.","zh":"从尾尖向尾根梳开，一缕一缕地来。","nl":"Ontklit de staart van de punt naar de basis, lok voor lok.","pt":"Desembaraça-se a cauda da ponta para a base, madeixa a madeixa.","sv":"Reda ut svansen från topparna mot roten, en testa i taget.","ru":"Расчёсывай хвост от кончиков к корню, прядь за прядью.","pl":"Rozczesuj ogon od końców ku nasadzie, pasmo po paśmie.","ko":"꼬리는 끝에서 뿌리 쪽으로, 한 가닥씩 풀어요."},
  exoTitre: {"fr":"Remets les étapes dans l'ordre","en":"Put the steps in order","es":"Pon los pasos en orden","it":"Rimetti i passaggi in ordine","ja":"手順を正しい順番に並べよう","de":"Bringe die Schritte in die richtige Reihenfolge","ar":"رتّب الخطوات","zh":"把步骤按顺序排好","nl":"Zet de stappen in de juiste volgorde","pt":"Coloca os passos por ordem","sv":"Lägg stegen i rätt ordning","ru":"Расставь шаги по порядку","pl":"Ułóż kroki w odpowiedniej kolejności","ko":"순서대로 정리해 보세요"},
  exoAide: {"fr":"Touche les étapes dans le bon ordre.","en":"Tap the steps in the right order.","es":"Toca los pasos en el orden correcto.","it":"Tocca i passaggi nell'ordine giusto.","ja":"正しい順番で手順をタップしてください。","de":"Tippe die Schritte in der richtigen Reihenfolge an.","ar":"المس الخطوات بالترتيب الصحيح.","zh":"请按正确的顺序点击步骤。","nl":"Tik de stappen in de juiste volgorde aan.","pt":"Toca nos passos pela ordem certa.","sv":"Tryck på stegen i rätt ordning.","ru":"Нажимай на шаги в правильном порядке.","pl":"Dotykaj kroków w prawidłowej kolejności.","ko":"올바른 순서대로 단계를 눌러 보세요."},
  exoOk: {"fr":"Bravo, c'est le bon ordre !","en":"Well done, that's the right order!","es":"¡Bravo, es el orden correcto!","it":"Bravo, è l'ordine giusto!","ja":"正解です、その順番で合っています！","de":"Bravo, das ist die richtige Reihenfolge!","ar":"أحسنت، هذا هو الترتيب الصحيح!","zh":"太棒了，顺序正确！","nl":"Goed zo, dat is de juiste volgorde!","pt":"Muito bem, é a ordem certa!","sv":"Bra jobbat, det är rätt ordning!","ru":"Отлично, порядок верный!","pl":"Brawo, to właściwa kolejność!","ko":"잘했어요, 올바른 순서예요!"},
  exoKo: {"fr":"Pas tout à fait, essaie encore.","en":"Not quite, try again.","es":"No del todo, inténtalo de nuevo.","it":"Non proprio, riprova.","ja":"おしい、もう一度やってみよう。","de":"Nicht ganz, versuche es noch einmal.","ar":"ليس تماماً، حاول مرة أخرى.","zh":"不太对，再试一次。","nl":"Net niet, probeer het nog eens.","pt":"Não bem, tenta outra vez.","sv":"Inte riktigt, försök igen.","ru":"Не совсем, попробуй ещё раз.","pl":"Jeszcze nie, spróbuj ponownie.","ko":"아쉬워요, 다시 해 보세요."},
  exoRestart: {"fr":"Recommencer","en":"Start again","es":"Empezar de nuevo","it":"Ricomincia","ja":"やり直す","de":"Nochmal","ar":"ابدأ من جديد","zh":"重新开始","nl":"Opnieuw beginnen","pt":"Recomeçar","sv":"Börja om","ru":"Начать заново","pl":"Zacznij od nowa","ko":"다시 하기"},
  atelier: {"fr":"Atelier : les zones du sabot","en":"Workshop: the parts of the hoof","es":"Taller: las zonas del casco","it":"Laboratorio: le zone dello zoccolo","ja":"ワークショップ：蹄の各部分","de":"Werkstatt: die Zonen des Hufs","ar":"ورشة: أجزاء الحافر","zh":"小工坊：蹄的各个部位","nl":"Werkplaats: de zones van de hoef","pt":"Oficina: as zonas do casco","sv":"Verkstad: hovens delar","ru":"Мастерская: зоны копыта","pl":"Warsztat: strefy kopyta","ko":"실습: 발굽의 각 부분"},
  atelierAide: {"fr":"Touche une zone pour la découvrir, ou suis les étapes du curage.","en":"Tap a zone to discover it, or follow the picking steps.","es":"Toca una zona para descubrirla, o sigue los pasos de la limpieza.","it":"Tocca una zona per scoprirla, oppure segui i passaggi della pulizia.","ja":"部位をタップして確認するか、掃除の手順を順に見てみよう。","de":"Tippe auf eine Zone, um sie zu entdecken, oder folge den Schritten des Auskratzens.","ar":"المس منطقة لتكتشفها، أو اتبع خطوات التنظيف.","zh":"点击一个部位来了解它，或按清蹄的步骤依次查看。","nl":"Tik op een zone om die te ontdekken, of volg de stappen van het uitkrabben.","pt":"Toca numa zona para a descobrir, ou segue os passos da limpeza.","sv":"Tryck på en del för att lära dig mer, eller följ stegen för krattning.","ru":"Нажми на зону, чтобы узнать о ней, или пройди шаги чистки.","pl":"Dotknij strefy, by ją poznać, albo śledź kroki czyszczenia.","ko":"부분을 눌러 알아보거나 청소 순서를 따라가 보세요."},
  zPince: {"fr":"Pince","en":"Toe","es":"Pinza","it":"Punta","ja":"蹄尖","de":"Zehe","ar":"مقدمة الحافر","zh":"蹄尖","nl":"Teen","pt":"Pinça","sv":"Tå","ru":"Носок","pl":"Przód kopyta","ko":"발굽 앞부분"},
  zParoi: {"fr":"Paroi","en":"Hoof wall","es":"Muralla","it":"Muraglia","ja":"蹄壁","de":"Hufwand","ar":"جدار الحافر","zh":"蹄壁","nl":"Hoefwand","pt":"Parede do casco","sv":"Hovvägg","ru":"Стенка копыта","pl":"Ściana kopyta","ko":"발굽 벽"},
  zSole: {"fr":"Sole","en":"Sole","es":"Suela","it":"Suola","ja":"蹄底","de":"Sohle","ar":"أخمص الحافر","zh":"蹄底","nl":"Zool","pt":"Sola","sv":"Sula","ru":"Подошва","pl":"Podeszwa","ko":"발굽 바닥"},
  zFourchette: {"fr":"Fourchette","en":"Frog","es":"Ranilla","it":"Fettone","ja":"蹄叉","de":"Strahl","ar":"الشوكة","zh":"蹄叉","nl":"Straal","pt":"Ranilha","sv":"Strålen","ru":"Стрелка","pl":"Strzałka","ko":"제차"},
  zLacunes: {"fr":"Lacunes","en":"Collateral grooves","es":"Lagunas laterales","it":"Lacune laterali","ja":"蹄叉側溝","de":"Strahlfurchen","ar":"الأخاديد الجانبية","zh":"蹄叉侧沟","nl":"Straalgroeven","pt":"Lacunas laterais","sv":"Strålfårorna","ru":"Боковые борозды","pl":"Bruzdy boczne","ko":"제차 옆 홈"},
  zTalons: {"fr":"Talons","en":"Heels","es":"Talones","it":"Talloni","ja":"踵","de":"Trachten","ar":"الكعبان","zh":"蹄踵","nl":"Hielen","pt":"Talões","sv":"Trakterna","ru":"Пятки","pl":"Piętki","ko":"발굽 뒤꿈치"},
  sensCurage: {"fr":"Sens du curage : du talon vers la pince","en":"Direction of picking: from heel to toe","es":"Sentido de la limpieza: del talón hacia la pinza","it":"Verso della pulizia: dal tallone verso la punta","ja":"掃除の向き：踵からつま先へ","de":"Richtung beim Auskratzen: von der Trachte zur Zehe","ar":"اتجاه التنظيف: من الكعب نحو مقدمة الحافر","zh":"清蹄方向：从蹄踵到蹄尖","nl":"Richting van het uitkrabben: van hiel naar teen","pt":"Sentido da limpeza: do talão para a pinça","sv":"Krattningens riktning: från trakten mot tån","ru":"Направление чистки: от пятки к носку","pl":"Kierunek czyszczenia: od piętki ku przodowi kopyta","ko":"청소 방향: 뒤꿈치에서 앞쪽으로"},
  quizBtn: {"fr":"Passer le quiz","en":"Take the quiz","es":"Hacer el quiz","it":"Fai il quiz","ja":"クイズに挑戦","de":"Quiz starten","ar":"ابدأ الاختبار","zh":"开始测验","nl":"Doe de quiz","pt":"Fazer o quiz","sv":"Gör quizet","ru":"Пройти викторину","pl":"Zrób quiz","ko":"퀴즈 풀기"},
  vrai: {"fr":"Vrai","en":"True","es":"Verdadero","it":"Vero","ja":"正しい","de":"Wahr","ar":"صحيح","zh":"对","nl":"Waar","pt":"Verdadeiro","sv":"Sant","ru":"Верно","pl":"Prawda","ko":"맞아요"},
  faux: {"fr":"Faux","en":"False","es":"Falso","it":"Falso","ja":"間違い","de":"Falsch","ar":"خطأ","zh":"错","nl":"Onwaar","pt":"Falso","sv":"Falskt","ru":"Неверно","pl":"Fałsz","ko":"아니에요"},
  terminer: {"fr":"Terminer le cours","en":"Finish the lesson","es":"Terminar el curso","it":"Termina il corso","ja":"レッスンを終える","de":"Kurs abschließen","ar":"إنهاء الدرس","zh":"完成课程","nl":"Les afronden","pt":"Terminar o curso","sv":"Avsluta lektionen","ru":"Завершить урок","pl":"Zakończ lekcję","ko":"수업 마치기"},
  retour: {"fr":"Retour","en":"Back","es":"Volver","it":"Indietro","ja":"戻る","de":"Zurück","ar":"رجوع","zh":"返回","nl":"Terug","pt":"Voltar","sv":"Tillbaka","ru":"Назад","pl":"Wróć","ko":"뒤로"},
  video: {"fr":"Voir une vidéo sur YouTube","en":"Watch a video on YouTube","es":"Ver un vídeo en YouTube","it":"Guarda un video su YouTube","ja":"YouTubeで動画を見る","de":"Video auf YouTube ansehen","ar":"شاهد فيديو على يوتيوب","zh":"在 YouTube 观看视频","nl":"Bekijk een video op YouTube","pt":"Ver um vídeo no YouTube","sv":"Se en video på YouTube","ru":"Смотреть видео на YouTube","pl":"Obejrzyj film na YouTube","ko":"YouTube에서 영상 보기"},
  testeToi: {"fr":"Teste-toi en 6 questions","en":"Test yourself with 6 questions","es":"Ponte a prueba con 6 preguntas","it":"Mettiti alla prova con 6 domande","ja":"6問で力試し","de":"Teste dich mit 6 Fragen","ar":"اختبر نفسك بـ 6 أسئلة","zh":"用 6 个问题测试自己","nl":"Test jezelf met 6 vragen","pt":"Testa-te com 6 perguntas","sv":"Testa dig själv med 6 frågor","ru":"Проверь себя: 6 вопросов","pl":"Sprawdź się w 6 pytaniach","ko":"6문제로 실력을 확인해 봐"},
  bravo: {"fr":"Bravo !","en":"Well done!","es":"¡Bien hecho!","it":"Bravo!","ja":"正解です！","de":"Richtig!","ar":"أحسنت!","zh":"答对了！","nl":"Goed zo!","pt":"Muito bem!","sv":"Bra!","ru":"Верно!","pl":"Brawo!","ko":"정답이에요!"},
  pasTout: {"fr":"Pas tout à fait.","en":"Not quite.","es":"No exactamente.","it":"Non proprio.","ja":"惜しい！","de":"Nicht ganz.","ar":"ليس تماماً.","zh":"不太对。","nl":"Net niet.","pt":"Quase.","sv":"Inte riktigt.","ru":"Не совсем.","pl":"Nie do końca.","ko":"아쉬워요."},
  kIntro: {"fr":"Pourquoi panser ?","en":"Why groom?","es":"¿Por qué acicalar?","it":"Perché la pulizia?","ja":"なぜ手入れをするの？","de":"Warum putzen?","ar":"لماذا ننظف الحصان؟","zh":"为什么要刷拭？","nl":"Waarom verzorgen?","pt":"Por que escovar?","sv":"Varför rykta?","ru":"Зачем чистить лошадь?","pl":"Po co czyścić konia?","ko":"왜 손질할까?"},
  tIntroA: {"fr":"Un moment de","en":"A moment of","es":"Un momento de","it":"Un momento di","ja":"信頼を育む","de":"Ein Moment des","ar":"لحظة","zh":"一段","nl":"Een moment van","pt":"Um momento de","sv":"En stund av","ru":"Момент","pl":"Chwila","ko":"신뢰를 쌓는"},
  tIntroB: {"fr":"confiance.","en":"trust.","es":"confianza.","it":"fiducia.","ja":"ひととき。","de":"Vertrauens.","ar":"ثقة.","zh":"信任的时光。","nl":"vertrouwen.","pt":"confiança.","sv":"förtroende.","ru":"доверия.","pl":"zaufania.","ko":"시간."},
  kObs: {"fr":"Avant de commencer","en":"Before you start","es":"Antes de empezar","it":"Prima di iniziare","ja":"始める前に","de":"Bevor du anfängst","ar":"قبل أن تبدأ","zh":"开始之前","nl":"Voordat je begint","pt":"Antes de começar","sv":"Innan du börjar","ru":"Прежде чем начать","pl":"Zanim zaczniesz","ko":"시작하기 전에"},
  tObsA: {"fr":"Observe, puis","en":"Observe, then","es":"Observa y luego","it":"Osserva, poi","ja":"よく見てから、","de":"Beobachte, dann","ar":"راقب، ثم","zh":"先观察，","nl":"Kijk eerst, dan","pt":"Observe e depois","sv":"Iaktta, och sedan","ru":"Понаблюдай, потом","pl":"Obserwuj, potem","ko":"먼저 관찰하고,"},
  tObsB: {"fr":"approche.","en":"approach.","es":"acércate.","it":"avvicinati.","ja":"近づこう。","de":"nähere dich.","ar":"اقترب.","zh":"再靠近。","nl":"benader.","pt":"aproxime-se.","sv":"närma dig.","ru":"подходи.","pl":"podejdź.","ko":"다가가기."},
  kMat: {"fr":"Les indispensables","en":"The essentials","es":"Lo imprescindible","it":"Gli indispensabili","ja":"必需品","de":"Das Unverzichtbare","ar":"الأساسيات","zh":"必备用品","nl":"De onmisbare spullen","pt":"Os indispensáveis","sv":"Det viktigaste","ru":"Самое необходимое","pl":"Najważniejsze rzeczy","ko":"꼭 필요한 것들"},
  tMatA: {"fr":"Une boîte,","en":"One kit,","es":"Una caja,","it":"Un kit,","ja":"ひとつの箱に、","de":"Ein Kasten,","ar":"صندوق واحد،","zh":"一个箱子，","nl":"Eén box,","pt":"Uma caixa,","sv":"En låda,","ru":"Один набор —","pl":"Jedna skrzynka,","ko":"상자 하나,"},
  tMatB: {"fr":"cinq outils.","en":"five tools.","es":"cinco herramientas.","it":"cinque attrezzi.","ja":"5つの道具。","de":"fünf Werkzeuge.","ar":"خمس أدوات.","zh":"五件工具。","nl":"vijf spullen.","pt":"cinco ferramentas.","sv":"fem redskap.","ru":"пять инструментов.","pl":"pięć narzędzi.","ko":"도구 다섯 개."},
  matLead: {"fr":"Chaque outil a un rôle précis. Touche-le pour voir comment l'utiliser.","en":"Each tool has a precise role. Tap it to see how to use it.","es":"Cada herramienta tiene una función concreta. Tócala para ver cómo usarla.","it":"Ogni attrezzo ha un ruolo preciso. Toccalo per vedere come usarlo.","ja":"どの道具にも決まった役割があります。タップして使い方を見てみよう。","de":"Jedes Werkzeug hat eine genaue Aufgabe. Tippe darauf, um zu sehen, wie man es benutzt.","ar":"لكل أداة دور محدد. المسها لترى كيف تستخدمها.","zh":"每件工具都有明确的用途。点一下，看看怎么使用。","nl":"Elk stuk heeft een duidelijke taak. Tik erop om te zien hoe je het gebruikt.","pt":"Cada ferramenta tem uma função precisa. Toque nela para ver como usar.","sv":"Varje redskap har en bestämd uppgift. Tryck på det för att se hur du använder det.","ru":"У каждого инструмента своя задача. Нажми, чтобы узнать, как им пользоваться.","pl":"Każde narzędzie ma swoją rolę. Dotknij go, aby zobaczyć, jak go używać.","ko":"도구마다 정확한 역할이 있어. 눌러서 사용법을 확인해 봐."},
  kGestes: {"fr":"Le bon geste","en":"The right move","es":"El gesto correcto","it":"Il gesto giusto","ja":"正しい動き","de":"Der richtige Handgriff","ar":"الحركة الصحيحة","zh":"正确的动作","nl":"De juiste beweging","pt":"O gesto certo","sv":"Rätt handgrepp","ru":"Правильное движение","pl":"Właściwy ruch","ko":"올바른 동작"},
  tGestA: {"fr":"Le pansage,","en":"Grooming,","es":"El acicalado,","it":"La pulizia,","ja":"手入れは、","de":"Putzen,","ar":"تنظيف الحصان،","zh":"刷拭，","nl":"Verzorgen,","pt":"A escovação,","sv":"Ryktning,","ru":"Чистка —","pl":"Czyszczenie,","ko":"손질은"},
  tGestB: {"fr":"dans le bon ordre.","en":"in the right order.","es":"en el orden correcto.","it":"nell'ordine giusto.","ja":"正しい順番で。","de":"in der richtigen Reihenfolge.","ar":"بالترتيب الصحيح.","zh":"按正确的顺序。","nl":"in de juiste volgorde.","pt":"na ordem certa.","sv":"i rätt ordning.","ru":"в правильном порядке.","pl":"we właściwej kolejności.","ko":"올바른 순서로."},
  kQueue: {"fr":"Crins & délicatesse","en":"Hair & gentleness","es":"Crines y delicadeza","it":"Crini e delicatezza","ja":"毛とやさしさ","de":"Haare & Feingefühl","ar":"الشعر واللطف","zh":"马毛与轻柔","nl":"Haren & zachtheid","pt":"Crinas e delicadeza","sv":"Tagel & varsamhet","ru":"Волос и деликатность","pl":"Włosie i delikatność","ko":"털과 섬세함"},
  tQueueA: {"fr":"Une queue","en":"A tail","es":"Una cola","it":"Una coda","ja":"もつれのない","de":"Ein Schweif","ar":"ذيل","zh":"没有打结的","nl":"Een staart","pt":"Uma cauda","sv":"En svans","ru":"Хвост","pl":"Ogon","ko":"엉킴 없는"},
  tQueueB: {"fr":"sans nœuds.","en":"without knots.","es":"sin nudos.","it":"senza nodi.","ja":"尻尾。","de":"ohne Knoten.","ar":"بلا عُقد.","zh":"尾巴。","nl":"zonder klitten.","pt":"sem nós.","sv":"utan tovor.","ru":"без колтунов.","pl":"bez kołtunów.","ko":"꼬리."},
  kPieds: {"fr":"Observer les membres","en":"Check the legs","es":"Observar los miembros","it":"Osservare gli arti","ja":"脚をよく見る","de":"Die Beine beobachten","ar":"مراقبة الأطراف","zh":"观察四肢","nl":"De benen bekijken","pt":"Observar os membros","sv":"Titta på benen","ru":"Осмотр ног","pl":"Obserwuj nogi","ko":"다리 살펴보기"},
  tPiedsA: {"fr":"Des pieds","en":"Hooves","es":"Cascos","it":"Piedi","ja":"気をつけて見たい","de":"Hufe,","ar":"حوافر","zh":"需要留意的","nl":"Hoeven","pt":"Cascos","sv":"Hovar","ru":"Копыта","pl":"Kopyta","ko":"잘 살펴야 할"},
  tPiedsB: {"fr":"à surveiller.","en":"to keep an eye on.","es":"que vigilar.","it":"da tenere d'occhio.","ja":"蹄。","de":"die man im Blick behält.","ar":"تحتاج إلى مراقبة.","zh":"马蹄。","nl":"om in de gaten te houden.","pt":"para vigiar.","sv":"att hålla koll på.","ru":"под присмотром.","pl":"pod kontrolą.","ko":"발굽."},
  kQuiz: {"fr":"À toi de jouer","en":"Your turn","es":"Te toca","it":"Tocca a te","ja":"君の番","de":"Du bist dran","ar":"دورك الآن","zh":"轮到你了","nl":"Jij bent aan de beurt","pt":"Sua vez","sv":"Din tur","ru":"Твоя очередь","pl":"Twoja kolej","ko":"네 차례야"},
  tQuizA: {"fr":"À toi de","en":"Time to","es":"Haz","it":"Fai","ja":"ここで","de":"Zeit für","ar":"حان وقت","zh":"来","nl":"Tijd om","pt":"Hora de","sv":"Dags att","ru":"Подведём","pl":"Czas na","ko":"이제"},
  tQuizB: {"fr":"faire le point.","en":"check what you know.","es":"balance.","it":"il punto.","ja":"おさらい。","de":"eine Bilanz.","ar":"المراجعة.","zh":"检验一下吧。","nl":"de balans op te maken.","pt":"fazer um balanço.","sv":"stämma av.","ru":"итоги.","pl":"podsumowanie.","ko":"정리해 볼까?"},
  mProg: {"fr":"Au programme","en":"On the programme","es":"En el programa","it":"In programma","ja":"この講座の内容","de":"Auf dem Programm","ar":"في البرنامج","zh":"课程内容","nl":"Op het programma","pt":"No programa","sv":"På programmet","ru":"В программе","pl":"W programie","ko":"이번 강의 내용"},
  mTitre: {"fr":"Les chapitres du cours","en":"The chapters of this lesson","es":"Los capítulos de la lección","it":"I capitoli della lezione","ja":"この講座の章","de":"Die Kapitel der Lektion","ar":"فصول الدرس","zh":"本课章节","nl":"De hoofdstukken van de les","pt":"Os capítulos da aula","sv":"Lektionens kapitel","ru":"Главы урока","pl":"Rozdziały lekcji","ko":"강의의 장"},
  mAide: {"fr":"Touche un chapitre pour y aller directement.","en":"Tap a chapter to go straight to it.","es":"Toca un capítulo para ir directamente.","it":"Tocca un capitolo per andarci direttamente.","ja":"章をタップすると、そこへ移動します。","de":"Tippe auf ein Kapitel, um direkt dorthin zu gelangen.","ar":"المس فصلاً للانتقال إليه مباشرة.","zh":"点击章节即可直接跳转。","nl":"Tik op een hoofdstuk om er meteen naartoe te gaan.","pt":"Toque em um capítulo para ir direto a ele.","sv":"Tryck på ett kapitel för att gå direkt dit.","ru":"Нажми на главу, чтобы сразу к ней перейти.","pl":"Dotknij rozdziału, aby od razu do niego przejść.","ko":"장을 누르면 바로 이동해."},
  cMat: {"fr":"Le matériel","en":"The equipment","es":"El material","it":"L'attrezzatura","ja":"道具","de":"Das Material","ar":"المعدات","zh":"用具","nl":"Het materiaal","pt":"O material","sv":"Utrustningen","ru":"Снаряжение","pl":"Sprzęt","ko":"장비"},
  cGestes: {"fr":"Les gestes","en":"The movements","es":"Los gestos","it":"I gesti","ja":"動き方","de":"Die Handgriffe","ar":"الحركات","zh":"动作","nl":"De handelingen","pt":"Os gestos","sv":"Handgreppen","ru":"Движения","pl":"Ruchy","ko":"동작"},
  sComprendre: {"fr":"Introduction et approche","en":"Introduction and approach","es":"Introducción y acercamiento","it":"Introduzione e avvicinamento","ja":"導入と近づき方","de":"Einführung und Annäherung","ar":"مقدمة واقتراب","zh":"引言与靠近","nl":"Inleiding en benadering","pt":"Introdução e aproximação","sv":"Inledning och närmande","ru":"Введение и подход","pl":"Wprowadzenie i podejście","ko":"소개와 다가가기"},
  sMat: {"fr":"La boîte de pansage","en":"The grooming kit","es":"La caja de acicalado","it":"Il kit di pulizia","ja":"手入れ道具","de":"Der Putzkasten","ar":"صندوق أدوات التنظيف","zh":"刷拭箱","nl":"De poetsbox","pt":"A caixa de escovação","sv":"Ryktlådan","ru":"Набор для чистки","pl":"Skrzynka do czyszczenia","ko":"손질 상자"},
  sGestes: {"fr":"Dans le bon ordre","en":"In the right order","es":"En el orden correcto","it":"Nell'ordine giusto","ja":"正しい順番で","de":"In der richtigen Reihenfolge","ar":"بالترتيب الصحيح","zh":"按正确顺序","nl":"In de juiste volgorde","pt":"Na ordem certa","sv":"I rätt ordning","ru":"В правильном порядке","pl":"We właściwej kolejności","ko":"올바른 순서로"},
  sQueue: {"fr":"Démêlage","en":"Detangling","es":"Desenredado","it":"Districare","ja":"もつれほどき","de":"Entwirren","ar":"فك التشابك","zh":"梳理","nl":"Ontklitten","pt":"Desembaraçar","sv":"Reda ut tagel","ru":"Расчёсывание","pl":"Rozczesywanie","ko":"빗질"},
  sPieds: {"fr":"Observation et soins","en":"Checking and care","es":"Observación y cuidados","it":"Osservazione e cure","ja":"観察とケア","de":"Beobachtung und Pflege","ar":"المراقبة والعناية","zh":"观察与护理","nl":"Observatie en verzorging","pt":"Observação e cuidados","sv":"Kontroll och skötsel","ru":"Осмотр и уход","pl":"Obserwacja i pielęgnacja","ko":"관찰과 관리"},
  sQuiz: {"fr":"Révision et questions","en":"Review and questions","es":"Repaso y preguntas","it":"Ripasso e domande","ja":"復習と問題","de":"Wiederholung und Fragen","ar":"مراجعة وأسئلة","zh":"复习与问题","nl":"Herhaling en vragen","pt":"Revisão e perguntas","sv":"Repetition och frågor","ru":"Повторение и вопросы","pl":"Powtórka i pytania","ko":"복습과 문제"},
  decouvrir: {"fr":"Découvrir le cours","en":"Start the lesson","es":"Descubrir la lección","it":"Scopri la lezione","ja":"講座を始める","de":"Lektion entdecken","ar":"اكتشف الدرس","zh":"开始学习","nl":"Ontdek de les","pt":"Descobrir a aula","sv":"Upptäck lektionen","ru":"Открыть урок","pl":"Odkryj lekcję","ko":"강의 시작하기"},
  nChap: {"fr":"{n} chapitres","en":"{n} chapters","es":"{n} capítulos","it":"{n} capitoli","ja":"{n}章","de":"{n} Kapitel","ar":"{n} فصول","zh":"{n}章","nl":"{n} hoofdstukken","pt":"{n} capítulos","sv":"{n} kapitel","ru":"Глав: {n}","pl":"Rozdziały: {n}","ko":"{n}개 장"},
  etape: {"fr":"Étape","en":"Step","es":"Paso","it":"Passo","ja":"ステップ","de":"Schritt","ar":"الخطوة","zh":"步骤","nl":"Stap","pt":"Etapa","sv":"Steg","ru":"Шаг","pl":"Krok","ko":"단계"},
  secu: {"fr":"Sécurité","en":"Safety","es":"Seguridad","it":"Sicurezza","ja":"安全","de":"Sicherheit","ar":"السلامة","zh":"安全","nl":"Veiligheid","pt":"Segurança","sv":"Säkerhet","ru":"Безопасность","pl":"Bezpieczeństwo","ko":"안전"},
  qN: {"fr":"Question","en":"Question","es":"Pregunta","it":"Domanda","ja":"問題","de":"Frage","ar":"السؤال","zh":"问题","nl":"Vraag","pt":"Pergunta","sv":"Fråga","ru":"Вопрос","pl":"Pytanie","ko":"문제"},
  qSuiv: {"fr":"Question suivante","en":"Next question","es":"Siguiente pregunta","it":"Domanda successiva","ja":"次の問題","de":"Nächste Frage","ar":"السؤال التالي","zh":"下一题","nl":"Volgende vraag","pt":"Próxima pergunta","sv":"Nästa fråga","ru":"Следующий вопрос","pl":"Następne pytanie","ko":"다음 문제"},
  qScore: {"fr":"Ton score","en":"Your score","es":"Tu puntuación","it":"Il tuo punteggio","ja":"スコア","de":"Dein Ergebnis","ar":"نتيجتك","zh":"你的得分","nl":"Je score","pt":"Sua pontuação","sv":"Ditt resultat","ru":"Твой результат","pl":"Twój wynik","ko":"네 점수"},
  qRevoir: {"fr":"Refaire la révision","en":"Do the review again","es":"Repetir el repaso","it":"Rifai il ripasso","ja":"もう一度復習する","de":"Wiederholung neu starten","ar":"أعد المراجعة","zh":"重新复习","nl":"Herhaling opnieuw","pt":"Refazer a revisão","sv":"Gör om repetitionen","ru":"Пройти повторение заново","pl":"Powtórz jeszcze raz","ko":"복습 다시 하기"},
  prec: {"fr":"Précédent","en":"Previous","es":"Anterior","it":"Precedente","ja":"前へ","de":"Zurück","ar":"السابق","zh":"上一步","nl":"Vorige","pt":"Anterior","sv":"Föregående","ru":"Назад","pl":"Poprzedni","ko":"이전"},
  suiv: {"fr":"Suivant","en":"Next","es":"Siguiente","it":"Successivo","ja":"次へ","de":"Weiter","ar":"التالي","zh":"下一步","nl":"Volgende","pt":"Próximo","sv":"Nästa","ru":"Далее","pl":"Następny","ko":"다음"},
  chapitresG: {"fr":"Chapitres du {g}","en":"{g} lessons","es":"Capítulos del {g}","it":"Capitoli del {g}","ja":"{g}のレッスン","de":"Kapitel {g}","ar":"دروس {g}","zh":"{g} 的课程","nl":"Lessen {g}","pt":"Capítulos do {g}","sv":"Lektioner {g}","ru":"Уроки {g}","pl":"Lekcje {g}","ko":"{g} 수업"},
  retourGalop: {"fr":"Retour au Galop","en":"Back to the Galop","es":"Volver al Galop","it":"Torna al Galop","ja":"Galopに戻る","de":"Zurück zum Galop","ar":"العودة إلى الغالوب","zh":"返回 Galop","nl":"Terug naar de Galop","pt":"Voltar ao Galop","sv":"Tillbaka till Galop","ru":"Назад к Galop","pl":"Wróć do Galopu","ko":"Galop으로 돌아가기"}
};
function Lx(lg) { return function (k) { var o = T[k]; return (o && (o[lg] || o.en || o.fr)) || ""; }; }

/* ---------------- outils de lecture du cours ---------------- */
function pickLg(o, lg) {
  if (o == null) return "";
  if (typeof o === "string") return o;
  if (typeof o !== "object") return String(o);
  return o[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && o.en) || o.fr || "";
}
function nettoyerTitre(s) {   /* retire l'emoji de tête (🧽, 👣, 🐴…) */
  return String(s || "").replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍\u{1F1E6}-\u{1F1FF}\s]+/u, "").trim();
}
/* certaines langues ont reçu des étiquettes traduites par erreur dans les données (nl : sectie/kader, ru : инструктор) : on les reconnaît */
var K_ALIAS = { sectie: "section", kader: "encadre", "инструктор": "encadre" };
function segs(arr, k) { return (Array.isArray(arr) ? arr : []).filter(function (s) { return s && (s.k === k || K_ALIAS[s.k] === k); }); }
function contenuLg(x, lg) { if (Array.isArray(x)) return x; if (x && typeof x === "object") return x[lg] || x.en || x.fr || []; return []; }
function sansDeuxPoints(s) { return String(s || "").replace(/\s*[:：]\s*$/, ""); }
function maj(s) { s = String(s || ""); return s.charAt(0).toLocaleUpperCase() + s.slice(1); }
function sansNum(s) { return String(s || "").replace(/^\s*\d+\s*[.)]\s*/, ""); }
function decouperTitre(s) {   /* « Le pansage, premier soin » -> ["Le pansage,", "premier soin."] */
  s = String(s || "").trim();
  var m = s.match(/^(.+?[,，、:：])\s*(.+)$/);
  if (m) return [m[1], m[2].replace(/[.。]?$/, ".")];
  return [s, ""];
}

/* ---------------- styles ---------------- */
var CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Montserrat:wght@400;500;600&display=swap');",
".hcm{--noir:#070A08;--petrole:#101A1D;--petrole2:#101D22;--ivoire:#F3EEE4;--champ:#C9A66B;--doux:rgba(243,238,228,.72);--pale:rgba(243,238,228,.5);--ligne:rgba(201,166,107,.3);--pad:18px;background:var(--noir);color:var(--ivoire);font-family:'Montserrat','Noto Sans JP','Noto Sans Arabic',sans-serif;font-size:14px;line-height:1.65;-webkit-font-smoothing:antialiased;font-variant-numeric:lining-nums;overflow-x:hidden;overflow-x:clip;padding-bottom:40px}",
".hcm *{box-sizing:border-box}",
".hcm h1,.hcm h2,.hcm h3,.hcm h4,.hcm-chap .n,.hcm-etape .nb,.hcm-ong .tabs button,.hcm-mini b,.hcm-rev .sc{font-variant-numeric:lining-nums}",
".hcm h1,.hcm h2,.hcm h3,.hcm h4{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',Georgia,serif;font-weight:500;margin:0;color:var(--ivoire)}",
".hcm p{margin:0}",
".hcm button{font-family:inherit;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}",
".hcm a:focus-visible,.hcm button:focus-visible{outline:2px solid var(--champ);outline-offset:2px}",
".hcm em{font-style:italic;color:var(--champ)}",
/* tons */
".hcm .t-noir{background:var(--noir)}.hcm .t-petrole{background:var(--petrole)}",
/* barre du haut */
".hcm-bar{position:absolute;top:0;inset-inline:0;z-index:3;display:flex;align-items:center;gap:10px;padding:12px var(--pad)}",
".hcm-back{width:34px;height:34px;flex:0 0 34px;border-radius:50%;border:1px solid var(--ligne);background:rgba(7,10,8,.55);display:inline-flex;align-items:center;justify-content:center;font-size:18px;line-height:1;color:var(--ivoire)}",
".hcm-marque{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:4px;font-weight:600;color:var(--ivoire)}",
".hcm-pill{margin-inline-start:auto;border:1px solid var(--ligne);border-radius:999px;padding:3px 11px;font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:var(--champ);background:rgba(7,10,8,.45);white-space:nowrap}",
".hcm-lang{flex:0 0 auto}",
/* couverture */
".hcm-couv{position:relative;height:clamp(430px,74vh,540px);overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:0 var(--pad) 22px}",
".hcm-couv img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:76% 30%}",
".hcm-couv .vo{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,.15) 45%,rgba(7,10,8,.88) 78%,#070A08 100%)}",
".hcm-couv>*:not(.bg):not(.vo):not(.hcm-bar){position:relative}",
".hcm-kick{display:flex;align-items:center;gap:10px;font-size:10px;letter-spacing:2.2px;text-transform:uppercase;color:var(--champ);font-weight:500}",
".hcm-kick:after{content:'';flex:0 0 28px;height:1px;background:var(--ligne)}",
".hcm-couv h1{font-size:34px;line-height:1.04;margin:10px 0 10px;font-weight:500}",
".hcm-couv h1 em{display:block}",
".hcm-couv .cit{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-style:italic;font-size:16px;line-height:1.4;color:var(--doux);max-width:420px}",
".hcm-couv .cit small{display:block;font-family:'Montserrat',sans-serif;font-style:normal;font-size:10.5px;letter-spacing:.6px;color:var(--champ);margin-top:3px}",
".hcm-meta{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:12px;font-size:11.5px;color:var(--doux)}",
".hcm-meta span{display:inline-flex;align-items:center;gap:6px}",
".hcm-meta svg{color:var(--champ)}",
".hcm-cta{display:inline-flex;align-items:center;justify-content:space-between;gap:16px;margin-top:16px;min-width:200px;border:1px solid var(--champ);border-radius:4px;background:rgba(7,10,8,.4);padding:11px 16px;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--ivoire);align-self:flex-start}",
".hcm-cta svg{color:var(--champ)}",
/* vagues */
".hcm-vague{display:block;width:100%;height:16px;line-height:0}",
".hcm-vague svg{display:block;width:100%;height:100%}",
/* sommaire illustré */
".hcm-menu{padding:20px var(--pad) 24px}",
".hcm-menu h2{font-size:23px;line-height:1.15;margin:8px 0 4px}",
".hcm-menu .aide{font-size:12px;color:var(--pale);margin-bottom:14px}",
".hcm-menu ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:8px}",
".hcm-chap{position:relative;display:flex;align-items:center;gap:12px;width:100%;min-height:62px;padding:0;border:1px solid rgba(243,238,228,.1);border-radius:6px;background:#0c1113;overflow:hidden;text-align:start}",
".hcm-chap .ph{position:absolute;top:0;bottom:0;inset-inline-end:0;width:46%;background-size:cover;background-position:center}",
".hcm-chap .ph:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0c1113 0%,rgba(12,17,19,.55) 45%,rgba(12,17,19,.15) 100%)}",
"[dir=rtl] .hcm-chap .ph:after{background:linear-gradient(270deg,#0c1113 0%,rgba(12,17,19,.55) 45%,rgba(12,17,19,.15) 100%)}",
".hcm-chap .n{position:relative;flex:0 0 46px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:27px;line-height:1;color:var(--champ);font-weight:500}",
".hcm-chap .tx{position:relative;flex:1 1 auto;min-width:0;padding:10px 0}",
".hcm-chap .tx b{display:block;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:18px;line-height:1.15;font-weight:600;color:var(--ivoire)}",
".hcm-chap .tx span{display:block;font-size:11px;color:var(--doux);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".hcm-chap .ar{position:relative;flex:0 0 28px;height:28px;margin-inline-end:12px;border-radius:50%;border:1px solid rgba(243,238,228,.55);background:rgba(7,10,8,.45);display:inline-flex;align-items:center;justify-content:center;color:var(--ivoire)}",
".hcm-chap[aria-current=true]{border-color:var(--champ)}",
".hcm-chap:active{transform:scale(.99)}",
/* mini-navigation collante */
".hcm-minih{position:sticky;top:0;z-index:30;height:0}",
".hcm-mini{position:absolute;top:0;inset-inline:0;display:flex;gap:6px;align-items:center;padding:8px var(--pad);background:rgba(7,10,8,.94);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-bottom:1px solid rgba(201,166,107,.18);overflow-x:auto;scrollbar-width:none;opacity:0;pointer-events:none;transform:translateY(-6px);transition:opacity .2s,transform .2s}",
".hcm-mini::-webkit-scrollbar{display:none}",
".hcm-mini.on{opacity:1;pointer-events:auto;transform:none}",
".hcm-mini button{flex:0 0 auto;display:inline-flex;gap:6px;align-items:center;border:1px solid rgba(243,238,228,.14);border-radius:999px;background:none;padding:5px 11px;font-size:11.5px;color:var(--doux)}",
".hcm-mini button b{font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--champ);font-weight:600}",
".hcm-mini button[aria-current=true]{border-color:var(--champ);color:var(--ivoire);background:rgba(201,166,107,.12)}",
".hcm-mini button:not([aria-current=true]) .lb{display:none}",
/* sections */
".hcm-sec{padding:26px var(--pad) 30px;scroll-margin-top:52px}",
".hcm-sec h2{font-size:29px;line-height:1.08;margin:10px 0 0}",
".hcm-sec h2 em{display:block}",
".hcm-sous{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:16px;font-style:italic;color:var(--doux);margin-top:8px}",
".hcm-head{margin-bottom:16px}",
".hcm-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;align-items:start}",
".hcm-col{display:flex;flex-direction:column;gap:18px;min-width:0}",
".hcm-photo-col{order:-1;min-width:0}",
".hcm-photo{margin:0;border-radius:3px;overflow:hidden;background:#0c1113;position:relative}",
".hcm-photo img{display:block;width:100%;height:100%;object-fit:cover}",
".hcm-photo.r43{aspect-ratio:4/3}.hcm-photo.r169{aspect-ratio:16/9}.hcm-photo.r32{aspect-ratio:3/2}",
".hcm-photo figcaption{font-size:11px;color:var(--pale);padding-top:6px;background:transparent}",
/* textes */
".hcm-p{font-size:14px;line-height:1.7;color:var(--doux)}",
".hcm-p strong{color:var(--ivoire);font-weight:600}",
".hcm-p.lettrine:first-letter{float:inline-start;font-family:'Cormorant Garamond',serif;font-size:52px;line-height:.82;padding-inline-end:8px;padding-top:4px;color:var(--champ)}",
"[dir=rtl] .hcm-p.lettrine:first-letter{float:none;font:inherit;padding:0;color:inherit}",   /* arabe : les lettres sont liées, pas de lettrine */
".hcm-cit{border-inline-start:1px solid var(--champ);padding:2px 0 2px 14px;padding-inline:14px 0}",
".hcm-cit p{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-style:italic;font-size:19px;line-height:1.35;color:var(--ivoire)}",
".hcm-cit small{display:block;margin-top:5px;font-size:10.5px;letter-spacing:.8px;color:var(--champ)}",
".hcm-benef{display:flex;flex-direction:column;gap:9px;margin:0;padding:0;list-style:none}",
".hcm-benef li{display:flex;gap:11px;align-items:center;font-size:13px;color:var(--ivoire)}",
".hcm-benef svg{flex:0 0 18px;color:var(--champ)}",
".hcm-coach{border-inline-start:2px solid var(--champ);padding-inline:14px 0;display:flex;flex-direction:column;gap:6px}",
".hcm-coach .lab{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--champ)}",
".hcm-coach h3{font-size:19px;line-height:1.2}",
".hcm-coach p{font-size:13.5px;line-height:1.65;color:var(--doux)}",
".hcm-aparte{border:1px solid rgba(201,166,107,.22);border-radius:4px;padding:12px 14px;background:rgba(7,10,8,.28)}",
".t-noir .hcm-aparte{background:rgba(16,26,29,.55)}",
".hcm-aparte h4{font-size:16px;color:var(--champ);margin-bottom:4px;font-weight:600}",
".hcm-aparte p{font-size:13px;line-height:1.6;color:var(--doux)}",
".hcm-liste h3{font-size:20px;line-height:1.2;margin-bottom:4px}",
".hcm-liste .s{font-size:12.5px;color:var(--pale);margin-bottom:8px}",
".hcm-liste ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}",
".hcm-liste li{position:relative;padding:9px 0 9px;padding-inline-start:18px;border-top:1px solid rgba(243,238,228,.07);font-size:13.5px;line-height:1.6;color:var(--doux)}",
".hcm-liste li:first-child{border-top:0}",
".hcm-liste li:before{content:'';position:absolute;inset-inline-start:2px;top:17px;width:6px;height:6px;border-radius:50%;border:1px solid var(--champ)}",
".hcm-liste.croix li:before{content:'\\2715';border:0;width:auto;height:auto;top:9px;font-size:10px;color:var(--champ)}",
".hcm-liste li strong{color:var(--ivoire);font-weight:600}",
/* outils */
".hcm-outils{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}",
".hcm-outil{position:relative;display:block;padding:0;border:1px solid rgba(243,238,228,.1);border-radius:3px;overflow:hidden;background:#0c1113;text-align:start;aspect-ratio:1/1}",
".hcm-outil:last-child:nth-child(odd){grid-column:1/-1;aspect-ratio:2.05/1}",
".hcm-outil img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
".hcm-outil:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 40%,rgba(7,10,8,.9) 100%)}",
".hcm-outil .cap{position:absolute;inset-inline:10px;bottom:8px;z-index:1}",
".hcm-outil .cap small{display:block;font-size:9px;letter-spacing:1.6px;color:var(--champ)}",
".hcm-outil .cap b{display:block;font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:17px;line-height:1.1;font-weight:600}",
/* étapes numérotées */
".hcm-etapes{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}",
".hcm-etape{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;padding:12px 0;border-top:1px solid rgba(243,238,228,.08);scroll-margin-top:70px;transition:background .4s}",
".hcm-etape:first-child{border-top:0}",
".hcm-etape .nb{font-family:'Cormorant Garamond',serif;font-size:28px;line-height:1;color:var(--champ)}",
".hcm-etape h3{font-size:19px;line-height:1.2;margin-bottom:3px}",
".hcm-etape p{font-size:13.5px;line-height:1.65;color:var(--doux)}",
".hcm-etape.flash{background:rgba(201,166,107,.08)}",
/* onglets d'étapes (queue) */
".hcm-ong .tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:10px 0 12px}",
".hcm-ong .tabs button{border:1px solid rgba(243,238,228,.16);border-radius:3px;background:none;padding:7px 0;font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--doux)}",
".hcm-ong .tabs button[aria-selected=true]{border-color:var(--champ);color:var(--ivoire);background:rgba(201,166,107,.12)}",
".hcm-ong .k{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--champ)}",
".hcm-ong .corps{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}",
".hcm-ong h3{font-size:20px;line-height:1.2;margin-bottom:4px}",
".hcm-ong p{font-size:13.5px;line-height:1.65;color:var(--doux)}",
".hcm-ong .nav{display:flex;gap:8px;margin-top:10px}",
".hcm-rond{width:34px;height:34px;border-radius:50%;border:1px solid var(--ligne);background:none;color:var(--champ);font-size:15px;display:inline-flex;align-items:center;justify-content:center}",
".hcm-rond:disabled{opacity:.35;cursor:default}",
/* vidéos */
".hcm-vids{display:flex;flex-direction:column;gap:6px}",
".hcm-vid{display:flex;align-items:center;gap:12px;border:1px solid rgba(243,238,228,.12);border-radius:4px;padding:9px 12px;text-decoration:none;color:var(--ivoire);font-size:12.5px}",
".hcm-vid .pl{flex:0 0 30px;height:30px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;color:var(--champ)}",
".hcm-vid .ext{margin-inline-start:auto;font-size:10px;letter-spacing:1px;color:var(--pale)}",
/* Hey Baby */
".hcm-hb{border:1px solid rgba(201,166,107,.22);border-radius:4px;padding:13px 14px;background:rgba(7,10,8,.3)}",
".t-noir .hcm-hb{background:rgba(16,26,29,.55)}",
".hcm-hb .tete{display:flex;align-items:center;gap:9px;margin-bottom:8px}",
".hcm-hb .tete svg{color:var(--champ)}",
".hcm-hb h3{font-size:18px}",
".hcm-hb ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}",
".hcm-hb li button{width:100%;display:flex;align-items:center;gap:10px;justify-content:space-between;text-align:start;background:none;border:0;border-top:1px solid rgba(243,238,228,.07);padding:9px 0;font-size:13px;line-height:1.45;color:var(--ivoire)}",
".hcm-hb li:first-child button{border-top:0}",
".hcm-hb li button svg{flex:0 0 auto;color:var(--champ)}",
/* exercice d'ordre */
".hcm-exo h3{font-size:19px;margin-bottom:2px}",
".hcm-exo .aide{font-size:12px;color:var(--pale);margin-bottom:9px}",
".hcm-exo .l{display:grid;grid-template-columns:minmax(0,1fr);gap:6px}",
".hcm-exo .l button{display:flex;gap:10px;align-items:center;text-align:start;border:1px solid rgba(243,238,228,.14);border-radius:4px;background:none;padding:9px 11px;font-size:13px;color:var(--ivoire)}",
".hcm-exo .l .rg{flex:0 0 22px;height:22px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--champ)}",
".hcm-exo .l button.pris{border-color:var(--champ);background:rgba(201,166,107,.1)}",
".hcm-exo .l button.pris .rg{background:var(--champ);color:var(--noir)}",
".hcm-exo .msg{margin-top:9px;font-size:13px;font-weight:600}.hcm-exo .msg.ok{color:#a9d6b0}.hcm-exo .msg.ko{color:#e2b29c}",
".hcm-lien{margin-top:8px;background:none;border:1px solid var(--ligne);color:var(--champ);border-radius:999px;padding:5px 14px;font-size:11.5px}",
/* sabot */
".hcm-atelier{border:1px solid rgba(201,166,107,.22);border-radius:4px;padding:14px;background:rgba(16,26,29,.55)}",
".hcm-atelier h3{font-size:19px;color:var(--ivoire);margin-bottom:2px}",
".hcm-atelier .aide{font-size:12px;color:var(--pale);margin-bottom:10px}",
".hcm-hoofrow{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;align-items:center}",
".hcm-hoof{direction:ltr;max-width:300px;margin:0 auto;width:100%}",
".hcm-hoof svg{width:100%;height:auto;display:block}",
".hcm-hoof .zone{fill:rgba(201,166,107,0);stroke:none;cursor:pointer;transition:fill .2s}",
".hcm-hoof .zone.on{fill:rgba(201,166,107,.42);stroke:#F3EEE4;stroke-width:2.5}",
".hcm-hoof .zone.ligne{fill:none;stroke:rgba(201,166,107,0);stroke-width:16;stroke-linecap:round}",
".hcm-hoof .zone.ligne.on{stroke:rgba(201,166,107,.75)}",
".hcm-hoof .mk{cursor:pointer}",
".hcm-hoof .mk circle{fill:#070A08;stroke:#C9A66B;stroke-width:1.8}",
".hcm-hoof .mk.on circle{fill:#C9A66B}",
".hcm-hoof .mk text{fill:#F3EEE4;font:600 13px Montserrat,sans-serif;text-anchor:middle}",
".hcm-hoof .mk.on text{fill:#070A08}",
".hcm-zones{display:flex;flex-direction:column;gap:6px}",
".hcm-zones button{display:flex;gap:10px;align-items:center;border:1px solid rgba(243,238,228,.14);border-radius:10px;background:rgba(16,26,29,.6);padding:7px 11px;font-size:13px;text-align:start;color:var(--ivoire)}",
".hcm-zones button .nn{flex:0 0 22px;height:22px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--champ)}",
".hcm-zones button[aria-pressed=true]{border-color:var(--champ);background:rgba(201,166,107,.16)}",
".hcm-zones button[aria-pressed=true] .nn{background:var(--champ);color:var(--noir)}",
".hcm-info{font-size:13.5px;line-height:1.65}.hcm-info.plein{margin-top:12px;border-top:1px solid rgba(201,166,107,.2);padding-top:11px}",
".hcm-info strong{color:var(--champ)}",
".hcm-step{display:flex;align-items:center;gap:10px;margin-top:10px;justify-content:center}",
".hcm-step button{width:34px;height:34px;flex:0 0 34px;padding:0;border-radius:50%;border:1px solid var(--champ);background:none;font-size:16px;line-height:1;color:var(--champ)}",
".hcm-step span{font-size:12.5px;color:var(--doux);min-width:40px;text-align:center}",
".hcm-sens{margin-top:10px;display:flex;gap:9px;align-items:center;justify-content:center;font-size:12px;color:var(--champ)}",
".hcm-hoof{max-width:220px}",
".hcm-zones button{padding:6px 9px;font-size:12px;border-radius:4px;background:none}",
".hcm-zones{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.hcm-zones .hcm-step{grid-column:1/-1}",
"@media (min-width:1100px){.hcm-hoofrow{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.hcm-zones{grid-template-columns:minmax(0,1fr)}}",
/* révision */
".hcm-rev{border:1px solid rgba(201,166,107,.22);border-radius:4px;padding:14px;background:rgba(7,10,8,.3)}",
".hcm-rev .tete{display:flex;justify-content:space-between;align-items:center;font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:var(--champ);margin-bottom:8px}",
".hcm-rev .barre{height:2px;background:rgba(243,238,228,.1);border-radius:2px;margin-bottom:12px;overflow:hidden}",
".hcm-rev .barre i{display:block;height:100%;background:var(--champ);transition:width .3s}",
".hcm-rev .q{font-family:'Cormorant Garamond','Noto Serif JP',serif;font-size:20px;line-height:1.25;margin-bottom:11px;color:var(--ivoire)}",
".hcm-rev .opts{display:flex;flex-direction:column;gap:6px}",
".hcm-rev .opts button{display:flex;gap:10px;align-items:center;text-align:start;border:1px solid rgba(243,238,228,.16);border-radius:4px;background:none;padding:9px 11px;font-size:13px;line-height:1.4;color:var(--ivoire)}",
".hcm-rev .opts .lt{flex:0 0 22px;height:22px;border-radius:50%;border:1px solid var(--champ);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--champ)}",
".hcm-rev .opts button.bon{border-color:#a9d6b0;background:rgba(169,214,176,.08)}.hcm-rev .opts button.bon .lt{background:#a9d6b0;border-color:#a9d6b0;color:#070A08}",
".hcm-rev .opts button.mauvais{border-color:#e2b29c;background:rgba(226,178,156,.08)}.hcm-rev .opts button.mauvais .lt{background:#e2b29c;border-color:#e2b29c;color:#070A08}",
".hcm-rev .opts button:disabled{cursor:default}",
".hcm-rev .res{margin-top:10px;font-size:12.5px;line-height:1.6;color:var(--doux)}.hcm-rev .res.ok strong{color:#a9d6b0}.hcm-rev .res.ko strong{color:#e2b29c}",
".hcm-rev .bas{display:flex;justify-content:flex-end;margin-top:10px}",
".hcm-rev .fin{text-align:center;padding:6px 0}",
".hcm-rev .fin .sc{font-family:'Cormorant Garamond',serif;font-size:44px;line-height:1;color:var(--champ)}",
/* boutons (contour champagne, jamais pleins) */
".hcm-btns{display:flex;flex-direction:column;gap:8px}",
".hcm-btn{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:1px solid var(--champ);border-radius:4px;background:none;padding:12px 16px;font-size:11.5px;letter-spacing:1.4px;text-transform:uppercase;color:var(--ivoire)}",
".hcm-btn svg{color:var(--champ)}",
".hcm-btn.disc{border-color:rgba(243,238,228,.2)}",
/* pied de page */
".hcm-pied{padding:24px var(--pad) 18px;text-align:center}",
".hcm-pied .m{font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:4px;color:var(--pale)}",
/* colonne des cours du Galop (ordinateur seulement) */
".hcm-side{display:none}",
".hcm-main{min-width:0}",
"@media (min-width:1100px){.hcm.avec-side{display:grid;grid-template-columns:232px minmax(0,1fr)}.hcm-side{display:block;position:sticky;top:0;align-self:start;height:100vh;overflow-y:auto;padding:22px 14px 30px;background:#0A0E0C;border-inline-end:1px solid rgba(201,166,107,.14);scrollbar-width:thin}.hcm-side h3{font-size:12px;font-family:'Montserrat',sans-serif;letter-spacing:2px;text-transform:uppercase;color:var(--champ);font-weight:500;margin:0 6px 14px}.hcm-side button{display:flex;gap:10px;align-items:center;width:100%;text-align:start;background:none;border:0;border-radius:4px;padding:8px 6px;font-size:12.5px;line-height:1.35;color:var(--doux)}.hcm-side button:hover{background:rgba(243,238,228,.04)}.hcm-side button[aria-current=true]{background:rgba(201,166,107,.1);color:var(--ivoire)}.hcm-side .n{flex:0 0 24px;height:24px;border-radius:50%;border:1px solid rgba(243,238,228,.22);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--pale)}.hcm-side button[aria-current=true] .n{border-color:var(--champ);color:var(--champ)}.hcm-side .n.fait{border-color:var(--champ);background:rgba(201,166,107,.16);color:var(--champ)}}",
/* ---------- tablette ---------- */
"@media (min-width:700px){.hcm{--pad:34px;font-size:15px}.hcm-couv{height:clamp(460px,62vh,560px)}.hcm-couv h1{font-size:44px}.hcm-sec{padding:40px var(--pad) 44px}.hcm-sec h2{font-size:36px}.hcm-menu ol{grid-template-columns:repeat(2,minmax(0,1fr))}.hcm-outils{grid-template-columns:repeat(3,minmax(0,1fr))}.hcm-outil:last-child:nth-child(odd){grid-column:auto;aspect-ratio:1/1}.hcm-outils .hcm-outil:nth-child(4),.hcm-outils .hcm-outil:nth-child(5){aspect-ratio:3/2}.hcm-outils{grid-template-columns:repeat(6,minmax(0,1fr))}.hcm-outil{grid-column:span 2}.hcm-outils .hcm-outil:nth-child(4),.hcm-outils .hcm-outil:nth-child(5){grid-column:span 3}.hcm-vague{height:22px}.hcm-ong .corps{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}.hcm-exo .l{grid-template-columns:repeat(2,minmax(0,1fr))}.hcm-hoof{max-width:250px}}",
/* ---------- ordinateur ---------- */
".hcm-in{max-width:1180px;margin:0 auto}",
"@media (min-width:1100px){.hcm{--pad:48px}.hcm-couv{height:clamp(500px,70vh,620px);padding-bottom:44px}.hcm-couv .vo{background:linear-gradient(90deg,rgba(7,10,8,.9) 0%,rgba(7,10,8,.6) 36%,rgba(7,10,8,0) 66%),linear-gradient(180deg,rgba(7,10,8,.5) 0%,rgba(7,10,8,0) 25%,rgba(7,10,8,0) 70%,#070A08 100%)}[dir=rtl] .hcm-couv .vo{background:linear-gradient(270deg,rgba(7,10,8,.9) 0%,rgba(7,10,8,.6) 36%,rgba(7,10,8,0) 66%),linear-gradient(180deg,rgba(7,10,8,.5) 0%,rgba(7,10,8,0) 25%,rgba(7,10,8,0) 70%,#070A08 100%)}.hcm-couv img.bg{object-position:70% 35%}.hcm-couv .txt{max-width:520px}.hcm-couv h1{font-size:56px}.hcm-couv .cit{font-size:19px}.hcm-menu ol{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.hcm-chap{min-height:78px}.hcm-sec{padding:60px var(--pad) 64px}.hcm-sec h2{font-size:42px}.hcm-grid.duo{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px}.hcm-photo-col{position:sticky;top:70px}.hcm-outils{grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.hcm-outil,.hcm-outils .hcm-outil:nth-child(4),.hcm-outils .hcm-outil:nth-child(5){grid-column:auto;aspect-ratio:3/4}.hcm-outil .cap b{font-size:20px}.hcm-btns{flex-direction:row;flex-wrap:wrap}.hcm-btn{width:auto;min-width:240px}.hcm-vague{height:28px}.hcm-mini{justify-content:center}.hcm-mini button:not([aria-current=true]) .lb{display:inline}.hcm-hoof{max-width:260px}}"
].join("\n");

/* ---------------- icônes fines ---------------- */
function ico(paths, w) { return h("svg", { width: w || 18, height: w || 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, paths.map(function (d, i) { return h("path", { key: i, d: d }); })); }
var ICO = {
  coeur: function (w) { return ico(["M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"], w); },
  loupe: function (w) { return ico(["M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z", "M20 20l-4-4"], w); },
  eclair: function (w) { return ico(["M13 3L5 14h6l-1 7 8-11h-6l1-7z"], w); },
  horloge: function (w) { return ico(["M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z", "M12 8v4l3 2"], w); },
  livre: function (w) { return ico(["M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5z", "M18 3v16"], w); },
  liste: function (w) { return ico(["M9 6h11", "M9 12h11", "M9 18h11", "M4.5 6h.01", "M4.5 12h.01", "M4.5 18h.01"], w); },
  coupe: function (w) { return ico(["M8 21h8", "M12 17v4", "M7 4h10v5a5 5 0 0 1-10 0V4z", "M17 5h3v2a3 3 0 0 1-3 3", "M7 5H4v2a3 3 0 0 0 3 3"], w); },
  bulle: function (w) { return ico(["M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.3A8 8 0 1 1 21 12z"], w); },
  bas: function (w) { return ico(["M12 5v14", "M6 13l6 6 6-6"], w); },
  droite: function (w) { return ico(["M5 12h14", "M13 6l6 6-6 6"], w); },
  gauche: function (w) { return ico(["M19 12H5", "M11 6l-6 6 6 6"], w); },
  play: function (w) { return h("svg", { width: w || 12, height: w || 12, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true }, h("path", { d: "M8 5v14l11-7z" })); }
};
function fleche(rtl, w) { return rtl ? ICO.gauche(w) : ICO.droite(w); }

/* ---------------- vague fine de séparation (ton sur ton + filet champagne très discret) ---------------- */
var COUL = { noir: "#070A08", petrole: "#101A1D" };
function Vague(p) {
  var de = COUL[p.de] || p.de, vers = COUL[p.vers] || p.vers;
  var d = "M0,0 L1200,0 L1200,9 C1050,20 900,3 750,10 C600,17 450,2 300,9 C200,14 100,6 0,11 Z";
  var ligne = "M0,11 C100,6 200,14 300,9 C450,2 600,17 750,10 C900,3 1050,20 1200,9";
  return h("div", { className: "hcm-vague", "aria-hidden": true, style: { background: vers } },
    h("svg", { viewBox: "0 0 1200 22", preserveAspectRatio: "none" },
      h("path", { d: d, fill: de }),
      h("path", { d: ligne, fill: "none", stroke: "#C9A66B", strokeOpacity: 0.28, strokeWidth: 1, vectorEffect: "non-scaling-stroke" })));
}

/* ---------------- schéma du sabot (repris du cours ordinateur du 30/10, inchangé) ---------------- */
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
      h("radialGradient", { id: "hcmSole", cx: "50%", cy: "42%", r: "62%" }, h("stop", { offset: "0", stopColor: "#4a3d2c" }), h("stop", { offset: "1", stopColor: "#2a2218" })),
      h("clipPath", { id: "hcmClipIn" }, h("path", { d: HOOF_OUT, transform: HOOF_IN }))),
    h("path", { d: HOOF_OUT, fill: "#6e5a3e", stroke: "#C9A66B", strokeOpacity: 0.45, strokeWidth: 2 }),
    h("path", { d: HOOF_OUT, transform: HOOF_IN, fill: "url(#hcmSole)", stroke: "#d9c9a6", strokeOpacity: 0.55, strokeWidth: 3 }),
    h("g", { clipPath: "url(#hcmClipIn)" },
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

/* ---------------- blocs ---------------- */
function Bloc(p) {
  var b = p.b, L = p.L, rtl = p.rtl, ctx = p.ctx;
  switch (b.t) {
    case "para":
      return h("p", { className: "hcm-p" + (b.lettrine ? " lettrine" : "") }, b.gras ? h("strong", null, b.gras + " ") : null, b.texte);
    case "citation":
      return h("blockquote", { className: "hcm-cit", style: { margin: 0 } }, h("p", null, "« " + String(b.texte || "").replace(/^[«"“]\s*|\s*[»"”]$/g, "") + " »"), b.auteur ? h("small", null, b.auteur) : null);
    case "benefices":
      return h("ul", { className: "hcm-benef" }, b.items.map(function (it, i) { return h("li", { key: i }, ICO[it.ico] ? ICO[it.ico](18) : null, it.texte); }));
    case "coach":
      if (!b.texte) return null;
      return h("aside", { className: "hcm-coach" },
        h("div", { className: "lab" }, ICO.coupe(14), L("coach")),
        b.titre && b.titre.toLocaleLowerCase().replace(/\s+/g, " ").trim() !== L("coach").toLocaleLowerCase() ? h("h3", null, b.titre) : null,
        h("p", null, b.texte));
    case "aparte":
      return h("aside", { className: "hcm-aparte" }, b.titre ? h("h4", null, b.titre) : null, h("p", null, b.texte));
    case "liste":
      return h("div", { className: "hcm-liste" + (b.croix ? " croix" : "") },
        b.titre ? h("h3", null, b.titre) : null, b.sous ? h("p", { className: "s" }, b.sous) : null,
        h("ul", null, b.puces.map(function (pu, i) { return h("li", { key: i }, pu.gras ? h("strong", null, pu.gras + " ") : null, pu.texte); })));
    case "outils":
      return h("div", { className: "hcm-outils" }, b.items.map(function (o, i) {
        return h("button", { key: i, type: "button", className: "hcm-outil", onClick: function () { ctx.allerA(o.cible, true); } },
          h("img", { src: o.img, alt: "", loading: "lazy" }),
          h("span", { className: "cap" }, h("small", null, (i < 9 ? "0" : "") + (i + 1)), h("b", null, o.nom)));
      }));
    case "etapes":
      return h("ol", { className: "hcm-etapes" }, b.items.map(function (e, i) {
        return h("li", { key: i, id: e.id ? "hcm-" + e.id : undefined, className: "hcm-etape" + (ctx.flash === e.id ? " flash" : "") },
          h("span", { className: "nb" }, String(i + 1)),
          h("div", null, h("h3", null, e.titre), h("p", null, maj(e.texte))));
      }));
    case "onglets":
      return h(Onglets, { b: b, L: L, rtl: rtl });
    case "videos":
      return h("div", { className: "hcm-vids" }, b.items.map(function (v, i) {
        return h("a", { key: i, href: v.href, target: "_blank", rel: "noopener noreferrer", className: "hcm-vid" },
          h("span", { className: "pl" }, ICO.play(11)), h("span", null, (b.items.length > 1 ? (i + 1) + " · " : "") + v.label), h("span", { className: "ext" }, "YouTube"));
      }));
    case "heybaby":
      return h("div", { className: "hcm-hb" },
        h("div", { className: "tete" }, ICO.bulle(18), h("h3", null, L("heyBaby"))),
        h("ul", null, b.questions.map(function (q, i) {
          return h("li", { key: i }, h("button", { type: "button", onClick: function () { ctx.hey(q); } }, h("span", null, q), fleche(rtl, 15)));
        })));
    case "ordre":
      return h(ExoOrdre, { b: b, L: L });
    case "sabot":
      return h(AtelierSabot, { b: b, L: L, rtl: rtl });
    case "revision":
      return h(Revision, { b: b, L: L, rtl: rtl });
    default:
      return null;
  }
}

function Onglets(p) {
  var b = p.b, L = p.L, rtl = p.rtl;
  var _a = useState(0), i = _a[0], setI = _a[1];
  var e = b.items[i] || {};
  return h("div", { className: "hcm-ong" },
    b.titre ? h("div", { className: "k" }, b.titre) : null,
    h("div", { className: "tabs", role: "tablist" }, b.items.map(function (x, j) {
      return h("button", { key: j, type: "button", role: "tab", "aria-selected": i === j, onClick: function () { setI(j); } }, "0" + (j + 1));
    })),
    h("div", { className: "corps", role: "tabpanel" },
      e.img ? h("figure", { className: "hcm-photo r43" }, h("img", { src: e.img, alt: "", loading: "lazy" })) : null,
      h("div", null,
        h("div", { className: "k", style: { marginBottom: 4 } }, L("etape") + " " + (i + 1) + " / " + b.items.length),
        h("h3", null, e.titre), h("p", null, maj(e.texte)),
        h("div", { className: "nav" },
          h("button", { type: "button", className: "hcm-rond", disabled: i === 0, "aria-label": L("prec"), onClick: function () { setI(Math.max(0, i - 1)); } }, rtl ? ICO.droite(15) : ICO.gauche(15)),
          h("button", { type: "button", className: "hcm-rond", disabled: i === b.items.length - 1, "aria-label": L("suiv"), onClick: function () { setI(Math.min(b.items.length - 1, i + 1)); } }, rtl ? ICO.gauche(15) : ICO.droite(15))))));
}

function ExoOrdre(p) {
  var b = p.b, L = p.L;
  var _a = useState([]), ordre = _a[0], setOrdre = _a[1];
  var fini = ordre.length === b.items.length;
  var bon = fini && ordre.every(function (v, i) { return v === i; });
  return h("div", { className: "hcm-exo" },
    h("h3", null, L("exoTitre")), h("p", { className: "aide" }, L("exoAide")),
    h("div", { className: "l" }, b.perm.map(function (i) {
      var rang = ordre.indexOf(i);
      return h("button", { key: i, type: "button", className: rang >= 0 ? "pris" : "", onClick: function () { if (rang < 0 && !fini) setOrdre(ordre.concat([i])); } },
        h("span", { className: "rg" }, rang >= 0 ? String(rang + 1) : "·"), h("span", null, b.items[i]));
    })),
    fini ? h("div", { className: "msg " + (bon ? "ok" : "ko"), "aria-live": "polite" }, bon ? L("exoOk") : L("exoKo")) : null,
    ordre.length ? h("button", { type: "button", className: "hcm-lien", onClick: function () { setOrdre([]); } }, L("exoRestart")) : null);
}

function AtelierSabot(p) {
  var b = p.b, L = p.L, rtl = p.rtl;
  var _a = useState(null), zone = _a[0], setZone = _a[1];
  var ETAPES = ["sole", "fourchette", "lacunes"];
  var idx = ETAPES.indexOf(zone);
  var pas = function (s) { var i = idx < 0 ? (s > 0 ? 0 : 2) : (idx + s + 3) % 3; setZone(ETAPES[i]); };
  var noms = {}; ZONES.forEach(function (z) { noms[z.id] = L(z.t); });
  var info = zone ? (b.textes[zone] || { gras: "", texte: b.sens }) : null;
  return h("div", { className: "hcm-atelier" },
    h("h3", null, L("atelier")), h("p", { className: "aide" }, L("atelierAide")),
    h("div", { className: "hcm-hoofrow" },
      h("div", { className: "hcm-hoof" }, h(SchemaSabot, { zone: zone, onPick: function (id) { setZone(zone === id ? null : id); }, noms: noms, alt: L("atelier") })),
      h("div", { className: "hcm-zones" },
        ZONES.map(function (z, i) { return h("button", { key: z.id, type: "button", "aria-pressed": zone === z.id, onClick: function () { setZone(zone === z.id ? null : z.id); } }, h("span", { className: "nn" }, String(i + 1)), L(z.t)); }),
        h("div", { className: "hcm-step" },
          h("button", { type: "button", onClick: function () { pas(-1); }, "aria-label": L("prec") }, rtl ? "›" : "‹"),
          h("span", null, idx >= 0 ? (idx + 1) + " / 3" : "1 · 2 · 3"),
          h("button", { type: "button", onClick: function () { pas(1); }, "aria-label": L("suiv") }, rtl ? "‹" : "›")))),
    h("div", { className: "hcm-sens" }, ICO.droite(16), L("sensCurage")),
    h("div", { className: "hcm-info" + (info ? " plein" : ""), "aria-live": "polite" },
      info ? h("p", null, info.gras ? h("strong", null, info.gras + " ") : null, info.texte) : null));
}

/* révision : une question à la fois (les 6 vraies questions du cours, avec leur correction) */
function Revision(p) {
  var b = p.b, L = p.L, rtl = p.rtl;
  var qs = b.questions;
  var _a = useState(0), i = _a[0], setI = _a[1];
  var _b = useState({}), reps = _b[0], setReps = _b[1];
  var fini = i >= qs.length;
  if (fini) {
    var bons = qs.filter(function (q, j) { return reps[j] === q.correct; }).length;
    return h("div", { className: "hcm-rev" },
      h("div", { className: "fin" },
        h("div", { className: "tete", style: { justifyContent: "center" } }, L("qScore")),
        h("div", { className: "sc" }, bons + " / " + qs.length),
        h("button", { type: "button", className: "hcm-lien", style: { marginTop: 12 }, onClick: function () { setReps({}); setI(0); } }, L("qRevoir"))));
  }
  var q = qs[i];
  var vf = q.type === "vrai-faux";
  var choix = vf ? [{ k: true, t: L("vrai") }, { k: false, t: L("faux") }] : (q.options || []).map(function (t, j) { return { k: j, t: t }; });
  var rep = reps[i], repondu = rep !== undefined, juste = repondu && rep === q.correct;
  return h("div", { className: "hcm-rev" },
    h("div", { className: "tete" }, h("span", null, L("qN") + " " + (i + 1) + " / " + qs.length), h("span", null, L("testeToi"))),
    h("div", { className: "barre" }, h("i", { style: { width: ((i + (repondu ? 1 : 0)) / qs.length * 100) + "%" } })),
    h("p", { className: "q" }, q.question),
    h("div", { className: "opts" }, choix.map(function (c, j) {
      var cls = repondu ? (c.k === q.correct ? "bon" : (c.k === rep ? "mauvais" : "")) : "";
      return h("button", { key: j, type: "button", className: cls, disabled: repondu, onClick: function () { var n = Object.assign({}, reps); n[i] = c.k; setReps(n); } },
        h("span", { className: "lt" }, vf ? (c.k ? "✓" : "✕") : String.fromCharCode(65 + j)), h("span", null, c.t));
    })),
    repondu ? h("div", { className: "res " + (juste ? "ok" : "ko"), "aria-live": "polite" }, h("strong", null, juste ? L("bravo") : L("pasTout")), " ", q.explication) : null,
    repondu ? h("div", { className: "bas" }, h("button", { type: "button", className: "hcm-lien", onClick: function () { setI(i + 1); } }, i === qs.length - 1 ? L("qScore") : L("qSuiv"))) : null);
}

/* ---------------- section ---------------- */
function Section(p) {
  var s = p.s, L = p.L, rtl = p.rtl, ctx = p.ctx;
  var blocs = (s.blocs || []).filter(Boolean);
  var titre = h("h2", null, s.titreA, s.titreB ? h("em", null, s.titreB) : null);
  var head = h("header", { className: "hcm-head" },
    s.kicker ? h("div", { className: "hcm-kick" }, s.kicker) : null, titre,
    s.sous ? h("p", { className: "hcm-sous" }, s.sous) : null);
  var photo = s.photo ? h("figure", { className: "hcm-photo " + (s.photo.ratio || "r43") }, h("img", { src: s.photo.src, alt: s.photo.alt || "", loading: "lazy" })) : null;
  var corps = blocs.map(function (b, i) { return h(Bloc, { key: i, b: b, L: L, rtl: rtl, ctx: ctx }); });
  /* téléphone/tablette : titre, photo, puis texte. Ordinateur : texte et photo côte à côte (photo collante) */
  return h("section", { id: "hcm-" + s.id, className: "hcm-sec t-" + s.ton },
    h("div", { className: "hcm-in" },
      head,
      photo
        ? h("div", { className: "hcm-grid duo" + (s.inv ? " inv" : "") },
            h("div", { className: "hcm-col" }, corps),
            h("div", { className: "hcm-photo-col" }, photo))
        : h("div", { className: "hcm-col" }, corps)));
}

/* ---------------- composant principal ---------------- */
function HypeCoursModele(props) {
  var cours = props.cours, lg = props.langue || "fr", rtl = lg === "ar";
  var L = Lx(lg);
  var cfgFn = HypeCoursModele.config[cours.id];
  var cfg = cfgFn(cours, lg, { L: L, pickLg: pickLg, nettoyerTitre: nettoyerTitre, segs: segs, contenuLg: contenuLg, sansDeuxPoints: sansDeuxPoints, sansNum: sansNum, questionsHB: props.questionsHB || [] });
  var chapitres = cfg.chapitres, sections = cfg.sections, couv = cfg.couverture;

  var _a = useState(chapitres[0] ? 0 : -1), actif = _a[0], setActif = _a[1];
  var _b = useState(false), mini = _b[0], setMini = _b[1];
  var _c = useState(null), flash = _c[0], setFlash = _c[1];
  var menuRef = useRef(null);

  useEffect(function () {
    var on = function () { var el = menuRef.current; if (el) setMini(el.getBoundingClientRect().bottom < 0); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return function () { window.removeEventListener("scroll", on); };
  }, []);
  useEffect(function () {
    if (typeof IntersectionObserver === "undefined") return undefined;
    var els = sections.map(function (s) { return document.getElementById("hcm-" + s.id); }).filter(Boolean);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var sid = en.target.id.replace("hcm-", "");
        chapitres.forEach(function (c, i) { if (c.sections.indexOf(sid) >= 0) setActif(i); });
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    els.forEach(function (e) { io.observe(e); });
    return function () { io.disconnect(); };
  }, [lg]);

  var allerA = function (id, eclairer) {
    var el = document.getElementById("hcm-" + id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (eclairer) { setFlash(id); setTimeout(function () { setFlash(null); }, 1600); }
  };
  var hey = function (q) {
    try { window.__hbCoursCtx = { galop: props.galopOuvert, coursId: cours.id, titre: pickLg(cours.titre, lg), score: null, cheval: null, question: q || "" }; } catch (e) { }
    if (props.setEcran) props.setEcran("assistant");
  };
  var ctx = { allerA: allerA, hey: hey, flash: flash };
  var Selecteur = props.Selecteur;
  var tit = decouperTitre(couv.titre);

  /* rythme des fonds : couverture et sommaire en noir, puis alternance donnée par chaque section */
  var tons = ["noir"].concat(sections.map(function (s) { return s.ton; })).concat(["noir"]);

  var enfants = [];
  sections.forEach(function (s, i) {
    if (tons[i] !== s.ton) enfants.push(h(Vague, { key: "v" + i, de: tons[i], vers: s.ton }));
    enfants.push(h(Section, { key: s.id, s: s, L: L, rtl: rtl, ctx: ctx }));
  });
  var dernier = sections.length ? sections[sections.length - 1].ton : "noir";
  if (dernier !== "noir") enfants.push(h(Vague, { key: "vfin", de: dernier, vers: "noir" }));

  /* ordinateur : la colonne « Chapitres du Galop » (tous les cours du Galop, coche si terminé) reprise de la version du 30/10 */
  var liste = props.coursListe || [];
  var colonne = liste.length > 1 ? h("nav", { className: "hcm-side", "aria-label": L("chapitresG").replace("{g}", couv.galop) },
    h("h3", null, L("chapitresG").replace("{g}", couv.galop)),
    liste.map(function (c, i) {
      var fait = (props.coursTermines || []).indexOf(c.id) >= 0;
      return h("button", { key: c.id, type: "button", "aria-current": c.id === cours.id ? "true" : undefined, onClick: function () { if (c.id !== cours.id && props.onOuvrirCours) props.onOuvrirCours(c.id); } },
        h("span", { className: "n" + (fait ? " fait" : "") }, fait ? "✓" : String(i + 1)), h("span", null, pickLg(c.titre, lg)));
    })) : null;

  return h("div", { className: "hcm" + (colonne ? " avec-side" : ""), dir: rtl ? "rtl" : undefined, lang: lg },
    h("style", null, CSS),
    colonne,
    h("div", { className: "hcm-main" },
    /* COUVERTURE */
    h("header", { className: "hcm-couv" },
      h("img", { className: "bg", src: couv.img, alt: "", style: rtl ? { transform: "scaleX(-1)" } : undefined }), h("div", { className: "vo" }),
      h("div", { className: "hcm-bar" },
        h("button", { type: "button", className: "hcm-back", "aria-label": L("retour"), onClick: props.onRetour }, rtl ? "›" : "‹"),
        h("span", { className: "hcm-marque" }, "HYPE"),
        h("span", { className: "hcm-pill" }, couv.galop),
        Selecteur ? h("span", { className: "hcm-lang" }, h(Selecteur, { compact: true })) : null),
      h("div", { className: "hcm-in", style: { width: "100%" } }, h("div", { className: "txt" },
        h("div", { className: "hcm-kick" }, couv.kicker),
        h("h1", null, tit[0], tit[1] ? h("em", null, tit[1]) : null),
        couv.citation ? h("p", { className: "cit" }, "« " + couv.citation.replace(/^[«"“]\s*|\s*[»"”]$/g, "") + " »", couv.auteur ? h("small", null, couv.auteur) : null) : null,
        h("div", { className: "hcm-meta" },
          couv.duree ? h("span", null, ICO.horloge(14), couv.duree) : null,
          h("span", null, ICO.liste(14), L("nChap").replace("{n}", String(chapitres.length))),
          couv.type ? h("span", null, ICO.livre(14), couv.type) : null),
        h("button", { type: "button", className: "hcm-cta", onClick: function () { var el = menuRef.current; if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); } }, L("decouvrir"), ICO.bas(15))))),
    /* SOMMAIRE ILLUSTRÉ */
    h("nav", { className: "hcm-menu t-noir", ref: menuRef, "aria-label": L("mTitre") },
      h("div", { className: "hcm-in" },
        h("div", { className: "hcm-kick" }, L("mProg")),
        h("h2", null, L("mTitre")),
        h("p", { className: "aide" }, L("mAide")),
        h("ol", null, chapitres.map(function (c, i) {
          return h("li", { key: i }, h("button", { type: "button", className: "hcm-chap", onClick: function () { allerA(c.sections[0]); } },
            h("span", { className: "ph", style: { backgroundImage: "url(" + c.img + ")" }, "aria-hidden": true }),
            h("span", { className: "n" }, (i < 9 ? "0" : "") + (i + 1)),
            h("span", { className: "tx" }, h("b", null, c.label), c.sous ? h("span", null, c.sous) : null),
            h("span", { className: "ar", "aria-hidden": true }, fleche(rtl, 14))));
        })))),
    /* MINI-NAVIGATION (apparaît quand le sommaire est passé) */
    h("div", { className: "hcm-minih" },
      h("div", { className: "hcm-mini" + (mini ? " on" : ""), "aria-hidden": mini ? undefined : true },
        chapitres.map(function (c, i) {
          return h("button", { key: i, type: "button", tabIndex: mini ? 0 : -1, "aria-current": actif === i ? "true" : undefined, onClick: function () { allerA(c.sections[0]); } },
            h("b", null, (i < 9 ? "0" : "") + (i + 1)), h("span", { className: "lb" }, c.label));
        }))),
    enfants,
    /* PIED : terminer le cours */
    h("footer", { className: "hcm-pied t-noir" },
      h("div", { className: "hcm-in" },
        h("div", { className: "hcm-btns", style: { justifyContent: "center", marginBottom: 18 } },
          h("button", { type: "button", className: "hcm-btn", onClick: function () { if (props.onQuiz) props.onQuiz(); } }, L("quizBtn"), fleche(rtl, 15)),
          h("button", { type: "button", className: "hcm-btn", onClick: function () { if (props.onTerminer) props.onTerminer(); } }, L("terminer"), ICO.coupe(15)),
          h("button", { type: "button", className: "hcm-btn disc", onClick: props.onRetour }, L("retourGalop"), fleche(rtl, 15))),
        h("div", { className: "m" }, "HYPE")))));
}

/* ---------------- garde ---------------- */
HypeCoursModele.config = {};
HypeCoursModele.ok = function (cours) {
  try {
    if (!cours || !HypeCoursModele.config[cours.id]) return false;
    var fn = HypeCoursModele.config[cours.id];
    var c = fn(cours, "fr", { L: Lx("fr"), pickLg: pickLg, nettoyerTitre: nettoyerTitre, segs: segs, contenuLg: contenuLg, sansDeuxPoints: sansDeuxPoints, sansNum: sansNum, questionsHB: [] });
    return !!(c && c.sections && c.sections.length && c.chapitres && c.chapitres.length && c.valide !== false);
  } catch (e) { return false; }
};
HypeCoursModele.version = VERSION;
HypeCoursModele.T = T;

/* =====================================================================================
   CONFIGURATION DU COURS PILOTE : Galop 1 — « Le pansage, premier soin » (g1-c2)
   Tous les textes viennent du cours ; les photos sont celles du pack validé le 30/10.
   ===================================================================================== */
var IMG = "images/cours-pansage-";
HypeCoursModele.config["g1-c2"] = function (cours, lg, o) {
  var L = o.L, r = function (x) { return o.pickLg(x, lg); };
  var b = cours.blocs || [];
  var couvB = (b[0] && b[0].couv) || {};
  var b1 = b[1] || {}, b2 = b[2] || {}, b3 = b[3] || {};
  var c1 = o.contenuLg(b1.contenu, lg), c1b = o.contenuLg(b1.contenuApres, lg), c2 = o.contenuLg(b2.contenu, lg), c3 = o.contenuLg(b3.contenu, lg);
  var seg = function (s) { return s ? { gras: r(s.gras), texte: r(s.texte), titre: r(s.titre), sous: r(s.sous), puces: (s.puces || []).map(function (p) { return { gras: r(p.gras), texte: r(p.texte) }; }) } : null; };
  var para1 = seg(o.segs(c1, "para")[0]);
  var outilsSec = seg(o.segs(c1b, "section")[0]);
  var coach1 = seg(o.segs(c1b, "encadre")[0]);
  var para2 = seg(o.segs(c2, "para")[0]);
  var sec2 = o.segs(c2, "section");
  var tech = seg(sec2[0]), check = seg(sec2[1]);
  var coach2 = seg(o.segs(c2, "encadre")[0]);
  var para3 = seg(o.segs(c3, "para")[0]);
  var etapesQ = seg(o.segs(c3, "section")[0]);
  var coach3 = seg(o.segs(c3, "encadre")[0]);
  var quiz = (cours.quiz || []).map(function (q) {
    var opts = q.options ? (Array.isArray(q.options) ? q.options : (q.options[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && q.options.en) || q.options.fr || [])) : null;
    return { type: q.type, question: r(q.question), options: opts, correct: q.correct, explication: r(q.explication) };
  });
  var valide = !!(para1 && outilsSec && outilsSec.puces.length === 5 && tech && tech.puces.length >= 3 && check && check.puces.length >= 4 && etapesQ && etapesQ.puces.length === 4 && quiz.length === 6);
  if (!valide) return { valide: false, sections: [], chapitres: [] };

  var outils = outilsSec.puces;
  var IMGS_OUTILS = ["04_materiel_etrille_metallique", "05_materiel_bouchon", "06_materiel_brosse_douce", "07_materiel_cure_pied", "08_materiel_eponge_seau"];
  var HBQ_DE_AR = {   /* l'allemand et l'arabe n'existent pas encore dans les questions Hey Baby de l'appli (repris du cours ordinateur) */
    de: ["In welcher Reihenfolge benutze ich die Bürsten beim Putzen?", "Wie kratze ich die Hufe aus, ohne den Strahl zu verletzen?", "Mein Pferd bewegt sich beim Putzen, was tun?"],
    ar: ["بأي ترتيب أستخدم الفرش أثناء تنظيف الحصان؟", "كيف أنظف الحوافر دون إيذاء الشوكة؟", "حصاني يتحرك أثناء التنظيف، ماذا أفعل؟"]
  };
  var hbq = (HBQ_DE_AR[lg] || (o.questionsHB || []).slice(0, 3)).concat([L("hbQ4")]);
  var video = L("video");

  return {
    couverture: {
      img: IMG + "01_couverture_hero.webp", titre: r(cours.titre), kicker: "Galop 1", galop: "Galop 1",
      citation: r(couvB.citation), auteur: r(couvB.auteur), duree: r(cours.duree), type: r(cours.type)
    },
    chapitres: [
      { label: L("vComprendre"), sous: L("sComprendre"), img: IMG + "02_introduction_contact-mini.webp", sections: ["intro", "observer"] },
      { label: L("cMat"), sous: L("sMat"), img: IMG + "04_materiel_etrille_metallique-mini.webp", sections: ["materiel"] },
      { label: L("cGestes"), sous: L("sGestes"), img: IMG + "09_gestes_brossage-mini.webp", sections: ["gestes"] },
      { label: L("vQueue"), sous: L("sQueue"), img: IMG + "10_queue_demeler_doigts-mini.webp", sections: ["queue"] },
      { label: L("vPieds"), sous: L("sPieds"), img: IMG + "12_pieds_sabot_au_sol-mini.webp", sections: ["pieds"] },
      { label: L("vQuiz"), sous: L("sQuiz"), img: IMG + "13_quiz_carnet_crayon-mini.webp", sections: ["quiz"] }
    ],
    sections: [
      { id: "intro", ton: "petrole", kicker: "01 — " + L("kIntro"), titreA: L("tIntroA"), titreB: L("tIntroB"), sous: o.nettoyerTitre(r(b1.titre)),
        photo: { src: IMG + "02_introduction_contact.webp", ratio: "r43" },
        blocs: [
          { t: "para", gras: para1.gras, texte: para1.texte, lettrine: true },
          { t: "citation", texte: r(couvB.citation), auteur: r(couvB.auteur) },
          { t: "benefices", items: [{ ico: "coeur", texte: L("benef1") }, { ico: "loupe", texte: L("benef2") }, { ico: "eclair", texte: L("benef3") }] }
        ] },
      { id: "observer", ton: "noir", kicker: "01 — " + L("kObs"), titreA: L("tObsA"), titreB: L("tObsB"), inv: true,
        photo: { src: IMG + "03_observer_approcher.webp", ratio: "r43" },
        blocs: [
          { t: "para", texte: L("observerTxt") },
          { t: "coach", titre: coach1 && coach1.titre, texte: coach1 && coach1.texte },
          { t: "aparte", titre: L("savais"), texte: L("savaisTxt") }
        ] },
      { id: "materiel", ton: "petrole", kicker: "02 — " + L("kMat"), titreA: L("tMatA"), titreB: L("tMatB"), sous: o.nettoyerTitre(outilsSec.titre),
        blocs: [
          { t: "para", texte: L("matLead") },
          { t: "outils", items: outils.map(function (p, i) { return { nom: o.sansDeuxPoints(p.gras), img: IMG + IMGS_OUTILS[i] + "-mini.webp", cible: "outil-" + i }; }) },
          { t: "videos", items: [{ href: "https://www.youtube.com/watch?v=4iuXTHiMWGg", label: video }, { href: "https://www.youtube.com/watch?v=gkLOvsndOms", label: video }] }
        ] },
      { id: "gestes", ton: "noir", kicker: "03 — " + L("kGestes"), titreA: L("tGestA"), titreB: L("tGestB"),
        photo: { src: IMG + "09_gestes_brossage.webp", ratio: "r43" },
        blocs: [
          { t: "etapes", items: outils.map(function (p, i) { return { id: "outil-" + i, titre: o.sansDeuxPoints(p.gras), texte: p.texte }; }) },
          { t: "liste", titre: L("erreurs"), croix: true, puces: [{ texte: L("err1") }, { texte: L("err2") }, { texte: L("err3") }, { texte: L("err4") }] },
          { t: "heybaby", questions: hbq }
        ] },
      { id: "queue", ton: "petrole", kicker: "04 — " + L("kQueue"), titreA: L("tQueueA"), titreB: L("tQueueB"), sous: o.nettoyerTitre(r(b3.titre)),
        blocs: [
          { t: "para", texte: para3 ? para3.texte : "" },
          { t: "onglets", titre: etapesQ.titre, items: etapesQ.puces.map(function (p, i) { return { titre: o.sansNum(p.gras), texte: p.texte, img: "images/pansage-queue-" + (i + 1) + ".webp" }; }) },   /* les 4 photos d'étapes fournies par Blandine le 30/10 (mains seules, sur le côté) */
          { t: "aparte", titre: L("secu"), texte: quiz[5] ? quiz[5].explication : "" },
          { t: "coach", titre: coach3 && coach3.titre, texte: coach3 && coach3.texte },
          { t: "ordre", items: etapesQ.puces.map(function (p) { return o.sansNum(p.gras); }), perm: [2, 0, 3, 1] }
        ] },
      { id: "pieds", ton: "noir", kicker: "05 — " + L("kPieds"), titreA: L("tPiedsA"), titreB: L("tPiedsB"), sous: o.nettoyerTitre(r(b2.titre)), inv: true,
        photo: { src: IMG + "12_pieds_sabot_au_sol.webp", ratio: "r43" },
        blocs: [
          { t: "para", texte: para2 ? para2.texte : "" },
          { t: "liste", titre: tech.titre, sous: tech.sous, puces: tech.puces },
          { t: "liste", titre: check.titre, sous: check.sous, puces: check.puces },
          { t: "videos", items: [{ href: "https://www.youtube.com/watch?v=ZLviq3uNK3A", label: video }] },
          { t: "coach", titre: coach2 && coach2.titre, texte: coach2 && coach2.texte },
          { t: "sabot", sens: tech.sous, textes: { sole: tech.puces[0], fourchette: tech.puces[1], lacunes: tech.puces[2], paroi: check.puces[3] } }
        ] },
      { id: "quiz", ton: "petrole", kicker: "06 — " + L("kQuiz"), titreA: L("tQuizA"), titreB: L("tQuizB"),
        photo: { src: IMG + "13_quiz_carnet_crayon.webp", ratio: "r169" },
        blocs: [
          { t: "liste", titre: L("retenir"), puces: [{ texte: L("ret1") }, { texte: L("ret2") }, { texte: L("ret3") }, { texte: L("ret4") }] },
          { t: "revision", questions: quiz },
          { t: "aparte", titre: L("defi"), texte: L("defiTxt") }
        ] }
    ]
  };
};

window.HypeCoursModele = HypeCoursModele;
})();
