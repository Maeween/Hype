/* =====================================================================================
   hype-cours-atlas.js — ATLAS INTERACTIF DU CHEVAL (composant unique, Galops 1 à 7)
   01/11/2026 — briefs de Blandine « Atlas interactif évolutif » (20h07) et « Atlas V2 » (20h17).
   Règles V2 : le cheval reste entièrement visible (photo intacte, petits points champagne, aucun médaillon permanent) ;
   le détail sélectionné (zoom de la photo + nom + explication) s'ouvre dans un panneau séparé : à droite sur ordinateur,
   sous la photo sur téléphone. Un seul détail à la fois, un seul groupe de repères à la fois.
   Progression : onglets par Galop (le niveau du cours s'ouvre en premier, les Galops précédents restent disponibles),
   puis, dans un Galop, onglets de vue (le corps, la tête, le pied…). Les coordonnées sont dans le code, en pixels de l'image.
   Images : images/atlas-cheval-corps.webp (photo 01 de Blandine, intacte) ; images/atlas-cheval-tete.webp (même photo,
   recadrée sur la tête : aucun filet, aucun cercle). Textes : 14 langues, arabe de droite à gauche.
   Usage : h(HypeAtlas.Module, { lg, niveau }) — niveau = Galop du cours.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined" || typeof React === "undefined") return;
var h = React.createElement, useState = React.useState, useRef = React.useRef;
var LGS = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
function tt() { var o = {}; for (var i = 0; i < LGS.length; i++) o[LGS[i]] = arguments[i]; return o; }
function pk(o, lg) { return o ? (typeof o === "string" ? o : (o[lg] || o.en || o.fr)) : ""; }

var UI = {
  titre: tt("Explore le cheval", "Explore the horse", "Explora el caballo", "Esplora il cavallo", "Entdecke das Pferd", "馬を探検しよう", "استكشفي الحصان", "探索马", "Ontdek het paard", "Explora o cavalo", "Utforska hästen", "Изучи лошадь", "Poznaj konia", "말을 탐험해요"),
  aide: tt("Touche un point ou un nom pour le découvrir.", "Tap a point or a name to discover it.", "Toca un punto o un nombre para descubrirlo.", "Tocca un punto o un nome per scoprirlo.", "Tippe auf einen Punkt oder einen Namen, um ihn zu entdecken.", "点か名前をタップして調べよう。", "المسي نقطة أو اسمًا لاكتشافه.", "点按一个点或名称来了解它。", "Tik op een punt of een naam om het te ontdekken.", "Toca num ponto ou num nome para o descobrir.", "Tryck på en punkt eller ett namn för att upptäcka den.", "Нажми на точку или название, чтобы узнать больше.", "Dotknij punktu lub nazwy, aby ją poznać.", "점이나 이름을 눌러 알아봐요."),
  prec: tt("Précédent", "Previous", "Anterior", "Precedente", "Zurück", "前へ", "السابق", "上一个", "Vorige", "Anterior", "Föregående", "Назад", "Poprzedni", "이전"),
  suiv: tt("Suivant", "Next", "Siguiente", "Successivo", "Weiter", "次へ", "التالي", "下一个", "Volgende", "Seguinte", "Nästa", "Далее", "Następny", "다음"),
  galop: tt("Galop {n}", "Level {n}", "Galope {n}", "Galoppo {n}", "Galopp {n}", "ギャロップ{n}", "الغالوب {n}", "Galop {n} 级", "Galop {n}", "Galope {n}", "Galopp {n}", "Галоп {n}", "Galop {n}", "갤럽 {n}"),
  niveaux: tt("Niveaux", "Levels", "Niveles", "Livelli", "Stufen", "レベル", "المستويات", "级别", "Niveaus", "Níveis", "Nivåer", "Уровни", "Poziomy", "단계"),
  vues: tt("Vues", "Views", "Vistas", "Viste", "Ansichten", "表示", "المشاهد", "视图", "Weergaven", "Vistas", "Vyer", "Виды", "Widoki", "보기"),
  parties: tt("Les parties", "The parts", "Las partes", "Le parti", "Die Teile", "部位", "الأجزاء", "部位", "De delen", "As partes", "Delarna", "Части", "Części", "부위"),
  nouveau: tt("Nouveau", "New", "Nuevo", "Novità", "Neu", "新しい", "جديد", "新", "Nieuw", "Novo", "Nytt", "Новое", "Nowe", "새로움"),
  zoom: tt("Vue agrandie : {nom}", "Close-up: {nom}", "Vista ampliada: {nom}", "Vista ingrandita: {nom}", "Nahansicht: {nom}", "拡大：{nom}", "صورة مكبّرة: {nom}", "放大图：{nom}", "Uitvergroting: {nom}", "Vista ampliada: {nom}", "Närbild: {nom}", "Крупный план: {nom}", "Zbliżenie: {nom}", "확대: {nom}"),
  vCorps: tt("Le corps", "The body", "El cuerpo", "Il corpo", "Der Körper", "体", "الجسم", "身体", "Het lichaam", "O corpo", "Kroppen", "Тело", "Ciało", "몸"),
  vTete: tt("La tête", "The head", "La cabeza", "La testa", "Der Kopf", "頭", "الرأس", "头部", "Het hoofd", "A cabeça", "Huvudet", "Голова", "Głowa", "머리"),
  altCorps: tt("Photo d'un cheval bai foncé de profil, entier, sur fond noir", "Photo of a dark bay horse in profile, whole body, on a black background", "Foto de un caballo castaño oscuro de perfil, entero, sobre fondo negro", "Foto di un cavallo baio scuro di profilo, intero, su sfondo nero", "Foto eines dunkelbraunen Pferdes im Profil, ganzer Körper, vor schwarzem Hintergrund", "黒い背景に立つ黒鹿毛の馬の横からの全身写真", "صورة حصان كميت داكن من الجانب، كامل الجسم، على خلفية سوداء", "黑色背景下一匹深枣色马的侧面全身照", "Foto van een donkerbruin paard in profiel, helemaal, op een zwarte achtergrond", "Foto de um cavalo castanho-escuro de perfil, inteiro, em fundo preto", "Foto av en mörkbrun häst i profil, hela kroppen, mot svart bakgrund", "Фото тёмно-гнедой лошади в профиль, целиком, на чёрном фоне", "Zdjęcie ciemnogniadego konia z profilu, w całości, na czarnym tle", "검은 배경 위 짙은 갈색 말의 옆모습 전신 사진"),
  altTete: tt("Photo de la tête d'un cheval bai foncé, sur fond noir", "Photo of a dark bay horse's head on a black background", "Foto de la cabeza de un caballo castaño oscuro sobre fondo negro", "Foto della testa di un cavallo baio scuro su sfondo nero", "Foto des Kopfes eines dunkelbraunen Pferdes vor schwarzem Hintergrund", "黒い背景の黒鹿毛の馬の頭の写真", "صورة رأس حصان كميت داكن على خلفية سوداء", "黑色背景下一匹深枣色马的头部照片", "Foto van het hoofd van een donkerbruin paard op een zwarte achtergrond", "Foto da cabeça de um cavalo castanho-escuro em fundo preto", "Foto av huvudet på en mörkbrun häst mot svart bakgrund", "Фото головы тёмно-гнедой лошади на чёрном фоне", "Zdjęcie głowy ciemnogniadego konia na czarnym tle", "검은 배경 위 짙은 갈색 말의 머리 사진")
};

var IMG_CORPS = { src: "images/atlas-cheval-corps.webp", w: 1536, h: 1024, alt: UI.altCorps };
var IMG_TETE = { src: "images/atlas-cheval-tete.webp", w: 920, h: 960, alt: UI.altTete };

/* point = [id, x, y, nom, explication] */
var NIVEAUX = [
  { n: 1, vues: [
    { id: "corps", titre: UI.vCorps, img: IMG_CORPS, pts: [
      ["tete", 1250, 330,
        tt("La tête", "The head", "La cabeza", "La testa", "Der Kopf", "頭", "الرأس", "头", "Het hoofd", "A cabeça", "Huvudet", "Голова", "Głowa", "머리"),
        tt("Elle porte les yeux, les oreilles et les naseaux. Regarde-la : elle te dit comment va ton cheval.", "It carries the eyes, ears and nostrils. Look at it: it tells you how your horse is feeling.", "Lleva los ojos, las orejas y los ollares. Mírala: te dice cómo está tu caballo.", "Porta gli occhi, le orecchie e le narici. Guardala: ti dice come sta il tuo cavallo.", "Daran sitzen Augen, Ohren und Nüstern. Schau ihn an: Er zeigt dir, wie es deinem Pferd geht.", "目、耳、鼻孔があります。頭を見れば、馬の気分がわかります。", "فيه العينان والأذنان والمنخران. انظري إليه: يخبرك كيف حال حصانك.", "头上有眼睛、耳朵和鼻孔。看看它的头，就知道它的心情。", "Daar zitten de ogen, oren en neusgaten. Kijk ernaar: het vertelt je hoe je paard zich voelt.", "Tem os olhos, as orelhas e as narinas. Olha para ela: diz-te como está o teu cavalo.", "Där sitter ögonen, öronen och näsborrarna. Titta på det: det visar hur din häst mår.", "На ней глаза, уши и ноздри. Посмотри на неё — она расскажет, как себя чувствует лошадь.", "Są na niej oczy, uszy i chrapy. Popatrz na nią: powie ci, jak czuje się twój koń.", "눈, 귀, 콧구멍이 있어요. 머리를 보면 말의 기분을 알 수 있어요.")],
      ["encolure", 1080, 250,
        tt("L'encolure", "The neck", "El cuello", "L'incollatura", "Der Hals", "首", "العنق", "颈部", "De hals", "O pescoço", "Halsen", "Шея", "Szyja", "목"),
        tt("Le long cou du cheval, entre la tête et le corps. Il s'en sert comme d'un balancier pour garder l'équilibre.", "The horse's long neck, between the head and the body. He uses it like a balancing pole.", "El largo cuello del caballo, entre la cabeza y el cuerpo. Lo usa como un balancín para mantener el equilibrio.", "Il lungo collo del cavallo, tra la testa e il corpo. Lo usa come un bilanciere per stare in equilibrio.", "Der lange Hals zwischen Kopf und Körper. Das Pferd nutzt ihn wie eine Balancierstange.", "頭と胴のあいだの長い首。バランスをとるのに使います。", "عنق الحصان الطويل بين الرأس والجسم. يستعمله ليحافظ على توازنه.", "马长长的脖子，在头和身体之间。它用脖子来保持平衡。", "De lange hals tussen hoofd en lichaam. Het paard gebruikt hem om in evenwicht te blijven.", "O longo pescoço do cavalo, entre a cabeça e o corpo. Usa-o para manter o equilíbrio.", "Den långa halsen mellan huvudet och kroppen. Hästen använder den för att hålla balansen.", "Длинная шея между головой и туловищем. Лошадь держит ею равновесие.", "Długa szyja między głową a tułowiem. Koń używa jej, by utrzymać równowagę.", "머리와 몸 사이의 긴 목이에요. 균형을 잡는 데 써요.")],
      ["criniere", 990, 115,
        tt("La crinière", "The mane", "La crin", "La criniera", "Die Mähne", "たてがみ", "العُرف", "鬃毛", "De manen", "A crina", "Manen", "Грива", "Grzywa", "갈기"),
        tt("Les longs crins sur le dessus de l'encolure. On la démêle aux doigts ou à la brosse.", "The long hairs along the top of the neck. Untangle it with your fingers or a brush.", "Las largas crines encima del cuello. Se desenreda con los dedos o un cepillo.", "I lunghi crini sopra l'incollatura. Si districa con le dita o con la spazzola.", "Die langen Haare oben am Hals. Man entwirrt sie mit den Fingern oder einer Bürste.", "首の上にある長い毛。指かブラシでほぐします。", "الشعر الطويل على أعلى العنق. يُفكّ تشابكه بالأصابع أو بالفرشاة.", "脖子上方的长毛，用手指或刷子梳理。", "De lange haren boven op de hals. Ontwar ze met je vingers of een borstel.", "Os longos pelos em cima do pescoço. Desembaraça-se com os dedos ou a escova.", "Det långa taglet ovanpå halsen. Reda ut det med fingrarna eller en borste.", "Длинные волосы на верху шеи. Их разбирают пальцами или щёткой.", "Długie włosie na górze szyi. Rozczesuje się je palcami lub szczotką.", "목 위쪽의 긴 털이에요. 손가락이나 브러시로 풀어요.")],
      ["garrot", 760, 175,
        tt("Le garrot", "The withers", "La cruz", "Il garrese", "Der Widerrist", "き甲", "الحارك", "鬐甲", "De schoft", "A cernelha", "Manken", "Холка", "Kłąb", "기갑"),
        tt("La petite bosse en haut des épaules, là où finit la crinière. On mesure la taille du cheval au garrot.", "The small bump at the top of the shoulders, where the mane ends. A horse's height is measured at the withers.", "El pequeño bulto en lo alto de los hombros, donde acaba la crin. La alzada del caballo se mide en la cruz.", "La piccola gobba in cima alle spalle, dove finisce la criniera. L'altezza del cavallo si misura al garrese.", "Der kleine Buckel oben an den Schultern, wo die Mähne endet. Dort misst man die Größe des Pferdes.", "たてがみが終わる、肩の上の小さなふくらみ。馬の体高はここで測ります。", "النتوء الصغير أعلى الكتفين حيث ينتهي العُرف. يُقاس طول الحصان عند الحارك.", "肩膀顶端的小凸起，鬃毛在这里结束。马的身高就量到鬐甲。", "Het bultje boven op de schouders, waar de manen ophouden. De hoogte van een paard meet je aan de schoft.", "A pequena saliência no alto dos ombros, onde acaba a crina. A altura do cavalo mede-se à cernelha.", "Den lilla knölen högst upp på skuldrorna, där manen slutar. Hästens mankhöjd mäts här.", "Небольшой бугор над лопатками, где кончается грива. Рост лошади измеряют в холке.", "Niewielkie wzniesienie nad łopatkami, gdzie kończy się grzywa. Wzrost konia mierzy się w kłębie.", "갈기가 끝나는 어깨 위의 작은 언덕이에요. 말의 키는 기갑에서 재요.")],
      ["dos", 520, 200,
        tt("Le dos", "The back", "El dorso", "Il dorso", "Der Rücken", "背", "الظهر", "背部", "De rug", "O dorso", "Ryggen", "Спина", "Grzbiet", "등"),
        tt("Derrière le garrot, c'est là que se pose la selle. Il porte le cavalier.", "Behind the withers, it is where the saddle sits. It carries the rider.", "Detrás de la cruz, es donde va la silla. Lleva al jinete.", "Dietro il garrese, è dove si appoggia la sella. Porta il cavaliere.", "Hinter dem Widerrist liegt dort der Sattel. Er trägt den Reiter.", "き甲のうしろ。鞍をのせる場所で、乗り手を支えます。", "خلف الحارك، وعليه يُوضع السرج ويحمل الفارس.", "在鬐甲后面，马鞍就放在这里，背着骑手。", "Achter de schoft ligt hier het zadel. Hij draagt de ruiter.", "Atrás da cernelha, é onde assenta a sela. Carrega o cavaleiro.", "Bakom manken ligger sadeln här. Den bär ryttaren.", "За холкой — здесь лежит седло. Спина несёт всадника.", "Za kłębem leży tu siodło. Grzbiet nosi jeźdźca.", "기갑 뒤, 안장이 놓이는 곳으로 기수를 태워요.")],
      ["croupe", 320, 215,
        tt("La croupe", "The croup", "La grupa", "La groppa", "Die Kruppe", "尻", "الكَفَل", "臀部", "Het kruis", "A garupa", "Korset", "Круп", "Zad", "엉덩이"),
        tt("Le haut de l'arrière du cheval, juste avant la queue. C'est la partie la plus arrondie.", "The top of the horse's hindquarters, just before the tail. It is the roundest part.", "La parte alta de los cuartos traseros, justo antes de la cola. Es la parte más redondeada.", "La parte alta del posteriore, subito prima della coda. È la parte più arrotondata.", "Der obere Teil der Hinterhand, direkt vor dem Schweif. Sie ist ganz rund.", "しっぽのすぐ前、うしろの上の部分。いちばん丸いところです。", "أعلى مؤخّرة الحصان، قبل الذيل مباشرة. إنه الجزء الأكثر استدارة.", "马后躯的上部，就在尾巴前面，是最圆的部分。", "Het bovenste deel van de achterhand, net voor de staart. Het is het rondste deel.", "A parte de cima da traseira do cavalo, logo antes da cauda. É a parte mais redonda.", "Översta delen av bakdelen, precis före svansen. Det är den rundaste delen.", "Верх задней части лошади, прямо перед хвостом. Самая круглая часть.", "Górna część tyłu konia, tuż przed ogonem. To najbardziej zaokrąglone miejsce.", "꼬리 바로 앞, 뒷부분의 위쪽이에요. 가장 둥근 부분이에요.")],
      ["queue", 205, 560,
        tt("La queue", "The tail", "La cola", "La coda", "Der Schweif", "尾", "الذيل", "尾巴", "De staart", "A cauda", "Svansen", "Хвост", "Ogon", "꼬리"),
        tt("Elle chasse les mouches et montre l'humeur du cheval. Ne passe jamais tout près, juste derrière lui.", "It swats flies and shows the horse's mood. Never walk close behind him.", "Espanta las moscas y muestra el humor del caballo. Nunca pases pegado justo detrás de él.", "Scaccia le mosche e mostra l'umore del cavallo. Non passare mai vicino, proprio dietro di lui.", "Er vertreibt Fliegen und zeigt die Stimmung. Geh nie dicht hinter dem Pferd vorbei.", "ハエを追いはらい、馬の気分も表します。馬のすぐうしろを通ってはいけません。", "يطرد الذباب ويُظهر مزاج الحصان. لا تمرّي أبدًا خلفه مباشرة وبقربه.", "它能赶苍蝇，也会表现马的心情。千万不要贴着马的正后方走过。", "Hij verjaagt vliegen en toont de stemming. Loop nooit vlak achter het paard langs.", "Afasta as moscas e mostra o humor do cavalo. Nunca passes muito perto, mesmo atrás dele.", "Den jagar flugor och visar humöret. Gå aldrig tätt bakom hästen.", "Отгоняет мух и показывает настроение. Никогда не проходи вплотную позади лошади.", "Odgania muchy i pokazuje nastrój. Nigdy nie przechodź tuż za koniem.", "파리를 쫓고 말의 기분을 보여 줘요. 말 바로 뒤로 가까이 지나가면 안 돼요.")],
      ["ventre", 640, 470,
        tt("Le ventre", "The belly", "El vientre", "Il ventre", "Der Bauch", "腹", "البطن", "腹部", "De buik", "A barriga", "Magen", "Живот", "Brzuch", "배"),
        tt("Le dessous du corps, entre les membres. La sangle de la selle passe juste derrière les antérieurs.", "The underside of the body, between the legs. The girth passes just behind the front legs.", "La parte de abajo del cuerpo, entre las extremidades. La cincha pasa justo detrás de las manos.", "La parte sotto del corpo, tra gli arti. Il sottopancia passa subito dietro gli anteriori.", "Die Unterseite des Körpers zwischen den Beinen. Der Sattelgurt liegt direkt hinter den Vorderbeinen.", "脚と脚のあいだの、体の下側。鞍の腹帯は前肢のすぐうしろを通ります。", "أسفل الجسم بين القوائم. يمرّ حزام السرج خلف القائمتين الأماميتين مباشرة.", "身体下方，在四肢之间。马鞍的肚带就在前腿后面。", "De onderkant van het lichaam, tussen de benen. De singel loopt net achter de voorbenen.", "A parte de baixo do corpo, entre os membros. A cilha passa logo atrás dos anteriores.", "Kroppens undersida mellan benen. Sadelgjorden går precis bakom frambenen.", "Нижняя часть тела между ногами. Подпруга проходит сразу за передними ногами.", "Spód tułowia między nogami. Popręg przechodzi tuż za przednimi nogami.", "다리 사이, 몸의 아랫부분이에요. 안장의 복대는 앞다리 바로 뒤를 지나요.")],
      ["anterieurs", 880, 720,
        tt("Les membres antérieurs", "The front legs", "Las extremidades anteriores", "Gli arti anteriori", "Die Vorderbeine", "前肢", "القائمتان الأماميتان", "前肢", "De voorbenen", "Os membros anteriores", "Frambenen", "Передние ноги", "Kończyny przednie", "앞다리"),
        tt("Les deux membres de devant. Ils portent la plus grande partie du poids du cheval.", "The two legs at the front. They carry most of the horse's weight.", "Las dos extremidades de delante. Soportan la mayor parte del peso del caballo.", "I due arti davanti. Portano la maggior parte del peso del cavallo.", "Die beiden vorderen Beine. Sie tragen den größten Teil des Gewichts.", "前の2本の脚。馬の体重のほとんどを支えています。", "القائمتان من الأمام. تحملان معظم وزن الحصان.", "前面的两条腿，承担马的大部分体重。", "De twee voorste benen. Ze dragen het grootste deel van het gewicht.", "Os dois membros da frente. Carregam a maior parte do peso do cavalo.", "De två främre benen. De bär största delen av hästens vikt.", "Две передние ноги. Они несут большую часть веса лошади.", "Dwie przednie nogi. Dźwigają większą część ciężaru konia.", "앞쪽의 두 다리예요. 말 몸무게의 대부분을 받쳐요.")],
      ["posterieurs", 380, 740,
        tt("Les membres postérieurs", "The hind legs", "Las extremidades posteriores", "Gli arti posteriori", "Die Hinterbeine", "後肢", "القائمتان الخلفيتان", "后肢", "De achterbenen", "Os membros posteriores", "Bakbenen", "Задние ноги", "Kończyny tylne", "뒷다리"),
        tt("Les deux membres de derrière. Ils poussent le cheval vers l'avant : c'est son moteur.", "The two legs at the back. They push the horse forward: they are his engine.", "Las dos extremidades de atrás. Empujan al caballo hacia delante: son su motor.", "I due arti dietro. Spingono il cavallo in avanti: sono il suo motore.", "Die beiden hinteren Beine. Sie schieben das Pferd nach vorn: Sie sind sein Motor.", "うしろの2本の脚。馬を前へ押し出す、エンジンです。", "القائمتان من الخلف. تدفعان الحصان إلى الأمام: إنهما محرّكه.", "后面的两条腿，把马向前推：它们是马的发动机。", "De twee achterste benen. Ze duwen het paard vooruit: ze zijn de motor.", "Os dois membros de trás. Empurram o cavalo para a frente: são o seu motor.", "De två bakre benen. De skjuter hästen framåt: de är dess motor.", "Две задние ноги. Они толкают лошадь вперёд — это её мотор.", "Dwie tylne nogi. Pchają konia do przodu: to jego silnik.", "뒤쪽의 두 다리예요. 말을 앞으로 밀어 주는 엔진이에요.")]
    ] },
    { id: "tete", titre: UI.vTete, img: IMG_TETE, pts: [
      ["oreilles", 750, 160,
        tt("Les oreilles", "The ears", "Las orejas", "Le orecchie", "Die Ohren", "耳", "الأذنان", "耳朵", "De oren", "As orelhas", "Öronen", "Уши", "Uszy", "귀"),
        tt("Elles bougent dans tous les sens pour écouter. En avant : il est attentif. Couchées en arrière : attention, il n'est pas content.", "They move in every direction to listen. Forward: he is paying attention. Pinned back: careful, he is not happy.", "Se mueven en todas direcciones para escuchar. Hacia delante: está atento. Pegadas hacia atrás: cuidado, no está contento.", "Si muovono in tutte le direzioni per ascoltare. In avanti: è attento. Schiacciate indietro: attenzione, non è contento.", "Sie drehen sich in alle Richtungen, um zu lauschen. Nach vorn: aufmerksam. Angelegt: Vorsicht, es ist unzufrieden.", "いろいろな方向に動いて音を聞きます。前向きなら注意している。後ろに伏せていたら、機嫌が悪いので気をつけて。", "تتحرّكان في كل الاتجاهات للإصغاء. إلى الأمام: هو منتبه. مطويّتان إلى الخلف: انتبهي، هو غير راضٍ.", "耳朵会转向各个方向去听。朝前：它很专注。向后贴平：小心，它不高兴。", "Ze draaien alle kanten op om te luisteren. Naar voren: het let op. Plat naar achteren: pas op, het is niet blij.", "Mexem-se em todas as direções para ouvir. Para a frente: está atento. Deitadas para trás: cuidado, não está contente.", "De rör sig åt alla håll för att lyssna. Framåt: hästen är uppmärksam. Bakåtstrukna: akta dig, den är inte nöjd.", "Они поворачиваются во все стороны, чтобы слушать. Вперёд — лошадь внимательна. Прижаты назад — осторожно, она недовольна.", "Ruszają się na wszystkie strony, żeby słuchać. Do przodu: koń uważa. Położone do tyłu: uwaga, jest niezadowolony.", "소리를 듣느라 이리저리 움직여요. 앞으로 향하면 집중, 뒤로 눕히면 기분이 나쁘니 조심해요.")],
      ["toupet", 700, 320,
        tt("Le toupet", "The forelock", "El copete", "Il ciuffo", "Der Schopf", "前髪", "الناصية", "额发", "De kuif", "O topete", "Pannluggen", "Чёлка", "Grzywka", "앞머리 갈기"),
        tt("La mèche de crins entre les oreilles, sur le front. Elle protège les yeux des mouches.", "The lock of hair between the ears, on the forehead. It protects the eyes from flies.", "El mechón de crines entre las orejas, sobre la frente. Protege los ojos de las moscas.", "La ciocca di crini tra le orecchie, sulla fronte. Protegge gli occhi dalle mosche.", "Die Haarsträhne zwischen den Ohren auf der Stirn. Sie schützt die Augen vor Fliegen.", "両耳のあいだ、額にかかる毛の房。目をハエから守ります。", "خصلة الشعر بين الأذنين على الجبهة. تحمي العينين من الذباب.", "两耳之间、额头上的一绺毛，保护眼睛不被苍蝇打扰。", "De pluk haar tussen de oren, op het voorhoofd. Hij beschermt de ogen tegen vliegen.", "A madeixa de crinas entre as orelhas, na testa. Protege os olhos das moscas.", "Tofsen mellan öronen, på pannan. Den skyddar ögonen mot flugor.", "Прядь волос между ушами, на лбу. Защищает глаза от мух.", "Kosmyk włosia między uszami, na czole. Chroni oczy przed muchami.", "두 귀 사이, 이마 위의 털 뭉치예요. 파리로부터 눈을 지켜요.")],
      ["yeux", 605, 432,
        tt("Les yeux", "The eyes", "Los ojos", "Gli occhi", "Die Augen", "目", "العينان", "眼睛", "De ogen", "Os olhos", "Ögonen", "Глаза", "Oczy", "눈"),
        tt("Sur les côtés de la tête : il voit presque tout autour de lui, sauf juste devant son nez et juste derrière lui.", "On the sides of the head: he sees almost all around, except just in front of his nose and right behind him.", "A los lados de la cabeza: ve casi a su alrededor, salvo justo delante del hocico y justo detrás.", "Ai lati della testa: vede quasi tutto intorno, tranne proprio davanti al muso e proprio dietro.", "Seitlich am Kopf: Das Pferd sieht fast rundherum, außer direkt vor der Nase und direkt hinter sich.", "頭の両側にあって、ほぼまわりじゅうが見えます。鼻のすぐ前と真後ろだけは見えません。", "على جانبي الرأس: يرى تقريبًا كل ما حوله، إلا أمام أنفه مباشرة وخلفه مباشرة.", "长在头的两侧：几乎能看到四周，只有鼻子正前方和正后方看不到。", "Aan de zijkanten van het hoofd: het ziet bijna rondom, behalve vlak voor zijn neus en recht achter zich.", "Dos lados da cabeça: vê quase tudo à volta, menos mesmo à frente do focinho e mesmo atrás.", "På huvudets sidor: hästen ser nästan runt om, utom precis framför mulen och rakt bakom.", "По бокам головы: лошадь видит почти всё вокруг, кроме зоны прямо перед носом и прямо позади.", "Po bokach głowy: koń widzi prawie wszystko wokół, oprócz miejsca tuż przed nosem i tuż za sobą.", "머리 양옆에 있어 거의 주변을 다 보지만, 코 바로 앞과 바로 뒤는 못 봐요.")],
      ["naseaux", 712, 830,
        tt("Les naseaux", "The nostrils", "Los ollares", "Le narici", "Die Nüstern", "鼻孔", "المنخران", "鼻孔", "De neusgaten", "As narinas", "Näsborrarna", "Ноздри", "Chrapy", "콧구멍"),
        tt("Les narines du cheval. Il respire seulement par le nez. Après l'effort, ses naseaux s'ouvrent grand.", "The horse's nostrils. He breathes only through his nose. After exercise, they open wide.", "Las narices del caballo. Solo respira por la nariz. Tras el esfuerzo, se abren mucho.", "Le narici del cavallo. Respira solo dal naso. Dopo lo sforzo si aprono molto.", "Die Nasenlöcher des Pferdes. Es atmet nur durch die Nase. Nach Anstrengung öffnen sie sich weit.", "馬の鼻の穴。鼻でしか息をしません。運動のあとは大きく開きます。", "فتحتا أنف الحصان. يتنفّس من أنفه فقط، وبعد المجهود تتّسعان كثيرًا.", "马的鼻孔。马只用鼻子呼吸，运动后鼻孔会张得很大。", "De neusgaten van het paard. Het ademt alleen door de neus. Na inspanning gaan ze wijd open.", "As narinas do cavalo. Só respira pelo nariz. Depois do esforço, abrem muito.", "Hästens näsborrar. Den andas bara genom näsan. Efter ansträngning vidgas de.", "Ноздри лошади. Она дышит только носом. После нагрузки они широко раскрываются.", "Nozdrza konia. Oddycha tylko nosem. Po wysiłku szeroko się otwierają.", "말의 콧구멍이에요. 코로만 숨을 쉬고, 운동 뒤에는 크게 벌어져요.")],
      ["levres", 640, 880,
        tt("Les lèvres et le bout du nez", "The lips and muzzle", "Los labios y el belfo", "Le labbra e il muso", "Die Lippen und das Maul", "唇と鼻先", "الشفتان وطرف الأنف", "嘴唇和口鼻", "De lippen en de neus", "Os lábios e o focinho", "Läpparna och mulen", "Губы и морда", "Wargi i pysk", "입술과 코끝"),
        tt("Très douces et très sensibles, avec de longs poils. Il s'en sert pour trier sa nourriture et tout explorer.", "Very soft and sensitive, with long whiskers. He uses them to sort his food and explore everything.", "Muy suaves y sensibles, con pelos largos. Los usa para escoger la comida y explorarlo todo.", "Molto morbide e sensibili, con peli lunghi. Le usa per scegliere il cibo ed esplorare tutto.", "Sehr weich und empfindlich, mit langen Tasthaaren. Damit sortiert das Pferd sein Futter und erkundet alles.", "とてもやわらかく敏感で、長いひげがあります。食べ物を選んだり、なんでも調べたりするのに使います。", "ناعمة جدًا وحسّاسة، وفيها شعيرات طويلة. يستعملها لفرز طعامه واستكشاف كل شيء.", "非常柔软敏感，长着长长的触毛。马用它挑选食物、探索一切。", "Heel zacht en gevoelig, met lange haren. Het paard sorteert er zijn voer mee en verkent alles.", "Muito macios e sensíveis, com pelos compridos. Usa-os para escolher a comida e explorar tudo.", "Mycket mjuka och känsliga, med långa känselhår. Hästen sorterar maten och utforskar allt med dem.", "Очень мягкие и чувствительные, с длинными волосками. Ими лошадь перебирает корм и всё исследует.", "Bardzo miękkie i wrażliwe, z długimi włosami. Koń wybiera nimi jedzenie i wszystko bada.", "아주 부드럽고 예민하며 긴 털이 있어요. 먹이를 고르고 모든 것을 탐색하는 데 써요.")]
    ] }
  ] }
];
/* MAQUETTE (français seulement, pour montrer la navigation G1 / G2 / G3) — activée par HypeAtlas.maquette(true) dans la page de test ; jamais dans l'appli */
var MAQUETTE = [
  { n: 2, vues: [
    { id: "membres", titre: tt("Les membres", "The legs", "Las extremidades", "Gli arti", "Die Beine", "肢", "القوائم", "四肢", "De benen", "Os membros", "Benen", "Ноги", "Kończyny", "다리"), img: IMG_CORPS, pts: [
      ["epaule", 880, 380,
        tt("L'épaule", "The shoulder", "La espalda", "La spalla", "Die Schulter", "肩", "الكتف", "肩部", "De schouder", "A espádua", "Bogen", "Лопатка", "Łopatka", "어깨"),
        tt("Elle relie l'antérieur au corps, sans aucun os entre les deux : seulement des muscles.", "It joins the front leg to the body with no bone in between: only muscles.", "Une la extremidad anterior al cuerpo sin ningún hueso entre ellos: solo músculos.", "Collega l'arto anteriore al corpo senza nessun osso in mezzo: solo muscoli.", "Sie verbindet das Vorderbein mit dem Körper, ohne Knochen dazwischen: nur mit Muskeln.", "前肢と体をつないでいます。あいだに骨はなく、筋肉だけでつながっています。", "تربط القائمة الأمامية بالجسم من دون أي عظم بينهما: بالعضلات فقط.", "它把前腿和身体连在一起，中间没有骨头，只有肌肉。", "Ze verbindt het voorbeen met het lichaam, zonder bot ertussen: alleen spieren.", "Liga o membro anterior ao corpo sem nenhum osso entre eles: só músculos.", "Den fäster frambenet vid kroppen utan något ben emellan: bara muskler.", "Соединяет переднюю ногу с телом без костей между ними — только мышцами.", "Łączy przednią nogę z tułowiem bez żadnej kości pomiędzy: tylko mięśniami.", "앞다리를 몸에 이어 줘요. 사이에 뼈는 없고 근육만 있어요.")],
      ["bras", 935, 470,
        tt("Le bras", "The arm", "El brazo", "Il braccio", "Der Oberarm", "上腕", "العضد", "上臂", "De opperarm", "O braço", "Överarmen", "Плечо", "Ramię", "위팔"),
        tt("Entre l'épaule et le coude, à l'avant du corps.", "Between the shoulder and the elbow, at the front of the body.", "Entre la espalda y el codo, en la parte delantera del cuerpo.", "Tra la spalla e il gomito, sul davanti del corpo.", "Zwischen Schulter und Ellbogen, vorn am Körper.", "肩とひじのあいだ、体の前のほうにあります。", "بين الكتف والمرفق، في مقدّمة الجسم.", "在肩部和肘部之间，位于身体前面。", "Tussen de schouder en de elleboog, aan de voorkant van het lichaam.", "Entre a espádua e o cotovelo, na frente do corpo.", "Mellan bogen och armbågen, längst fram på kroppen.", "Между лопаткой и локтем, в передней части тела.", "Między łopatką a łokciem, z przodu tułowia.", "어깨와 팔꿈치 사이, 몸 앞쪽에 있어요.")],
      ["avbras", 890, 580,
        tt("L'avant-bras", "The forearm", "El antebrazo", "L'avambraccio", "Der Unterarm", "前腕", "الساعد", "前臂", "De onderarm", "O antebraço", "Underarmen", "Предплечье", "Przedramię", "아래팔"),
        tt("Le haut du membre antérieur, au-dessus du genou.", "The upper part of the front leg, above the knee.", "La parte alta de la extremidad anterior, encima de la rodilla.", "La parte alta dell'arto anteriore, sopra il ginocchio.", "Der obere Teil des Vorderbeins, über dem Vorderfußwurzelgelenk.", "前肢の上のほう、ひざの上にあります。", "الجزء العلوي من القائمة الأمامية، فوق الركبة.", "前腿的上半部分，在膝盖上面。", "Het bovenste deel van het voorbeen, boven de knie.", "A parte de cima do membro anterior, acima do joelho.", "Övre delen av frambenet, ovanför framknät.", "Верхняя часть передней ноги, над запястьем.", "Górna część przedniej nogi, nad nadgarstkiem.", "앞다리의 위쪽, 무릎 위에 있어요.")],
      ["genou", 895, 700,
        tt("Le genou", "The knee", "La rodilla", "Il ginocchio", "Das Vorderfußwurzelgelenk", "ひざ（前ひざ）", "الركبة", "膝盖（腕关节）", "De knie", "O joelho", "Framknät", "Запястье", "Nadgarstek", "무릎"),
        tt("Le genou du cheval correspond à notre poignet.", "A horse's knee is like our wrist.", "La rodilla del caballo equivale a nuestra muñeca.", "Il ginocchio del cavallo corrisponde al nostro polso.", "Man nennt es oft „Knie“, aber es entspricht unserem Handgelenk.", "馬のひざは、わたしたちの手首にあたります。", "ركبة الحصان تقابل معصمنا.", "马的膝盖其实相当于我们的手腕。", "De knie van het paard komt overeen met onze pols.", "O joelho do cavalo corresponde ao nosso pulso.", "Hästens framknä motsvarar vår handled.", "Его часто называют «коленом», но оно соответствует нашему запястью.", "Często nazywa się go „kolanem”, ale odpowiada naszemu nadgarstkowi.", "말의 무릎은 우리의 손목에 해당해요.")],
      ["canon", 884, 790,
        tt("Le canon", "The cannon", "La caña", "Lo stinco", "Das Röhrbein", "管", "القصبة", "管部", "Het pijpbeen", "A canela", "Skenan", "Пясть", "Nadpęcie", "정강이"),
        tt("L'os long sous le genou ou le jarret. Aucun muscle : seulement os et tendons.", "The long bone below the knee or the hock. No muscle: only bone and tendons.", "El hueso largo bajo la rodilla o el corvejón. Sin músculos: solo hueso y tendones.", "L'osso lungo sotto il ginocchio o il garretto. Nessun muscolo: solo osso e tendini.", "Der lange Knochen unter dem Vorderfußwurzelgelenk oder dem Sprunggelenk. Keine Muskeln: nur Knochen und Sehnen.", "ひざや飛節の下の長い骨。筋肉はなく、骨と腱だけです。", "العظم الطويل تحت الركبة أو العرقوب. لا عضلات فيه: عظم وأوتار فقط.", "膝盖或飞节下面的长骨。没有肌肉，只有骨头和肌腱。", "Het lange bot onder de knie of de sprong. Geen spieren: alleen bot en pezen.", "O osso comprido abaixo do joelho ou do curvilhão. Sem músculos: só osso e tendões.", "Det långa benet under framknät eller hasen. Inga muskler: bara ben och senor.", "Длинная кость ниже запястья или скакательного сустава. Мышц нет — только кость и сухожилия.", "Długa kość poniżej nadgarstka lub stawu skokowego. Bez mięśni: tylko kość i ścięgna.", "무릎이나 비절 아래의 긴 뼈예요. 근육은 없고 뼈와 힘줄만 있어요.")],
      ["boulet", 898, 875,
        tt("Le boulet", "The fetlock", "El menudillo", "Il nodello", "Das Fesselgelenk", "球節", "مفصل الحافر العلوي (الرمانة)", "球节", "Het kogelgewricht", "O boleto", "Kotleden", "Путовый сустав", "Staw pęcinowy", "구절"),
        tt("L'articulation ronde au-dessus du paturon : elle amortit chaque foulée.", "The round joint above the pastern: it cushions every stride.", "La articulación redonda encima de la cuartilla: amortigua cada tranco.", "L'articolazione rotonda sopra il pastorale: ammortizza ogni falcata.", "Das runde Gelenk über der Fessel: Es federt jeden Schritt ab.", "つなぎの上の丸い関節。一歩ごとの衝撃をやわらげます。", "المفصل المستدير فوق الرسغ: يخفّف صدمة كل خطوة.", "系部上方的圆形关节，能缓冲每一步的冲击。", "Het ronde gewricht boven de koot: het vangt elke pas op.", "A articulação redonda acima da quartela: amortece cada passada.", "Den runda leden ovanför kotan: den dämpar varje steg.", "Круглый сустав над путом: смягчает каждый шаг.", "Okrągły staw nad pęciną: amortyzuje każdy krok.", "발목 위의 둥근 관절로, 걸음마다 충격을 줄여 줘요.")],
      ["paturon", 912, 910,
        tt("Le paturon", "The pastern", "La cuartilla", "Il pastorale", "Die Fessel", "つなぎ", "الرسغ", "系部", "De koot", "A quartela", "Kotan", "Путо", "Pęcina", "발목"),
        tt("Entre le boulet et le sabot.", "Between the fetlock and the hoof.", "Entre el menudillo y el casco.", "Tra il nodello e lo zoccolo.", "Zwischen dem Fesselgelenk und dem Huf.", "球節とひづめのあいだにあります。", "بين الرمانة والحافر.", "在球节和蹄子之间。", "Tussen het kogelgewricht en de hoef.", "Entre o boleto e o casco.", "Mellan kotleden och hoven.", "Между путовым суставом и копытом.", "Między stawem pęcinowym a kopytem.", "구절과 발굽 사이에 있어요.")],
      ["sabot", 932, 942,
        tt("Le sabot", "The hoof", "El casco", "Lo zoccolo", "Der Huf", "ひづめ", "الحافر", "蹄", "De hoef", "O casco", "Hoven", "Копыто", "Kopyto", "발굽"),
        tt("Le pied du cheval, en corne. On le cure à chaque pansage.", "The horse's foot, made of horn. You pick it out every time you groom.", "El pie del caballo, de cuerno. Se limpia en cada aseo.", "Il piede del cavallo, fatto di corno. Si pulisce a ogni governo.", "Der Fuß des Pferdes, aus Horn. Du kratzt ihn bei jedem Putzen aus.", "角質でできた馬の足。手入れのたびにお掃除します。", "قدم الحصان، من القرن. تنظّفينه في كل مرة تعتنين به.", "马的脚，由角质构成。每次刷马都要清理它。", "De voet van het paard, van hoorn. Je krabt hem uit bij elke poetsbeurt.", "O pé do cavalo, feito de corno. Limpa-se a cada limpeza.", "Hästens fot, gjord av horn. Du kratsar den varje gång du ryktar.", "Нога лошади из рога. Её расчищают при каждой чистке.", "Stopa konia z rogu. Czyścisz je przy każdym czyszczeniu konia.", "뿔질로 된 말의 발이에요. 손질할 때마다 파 줘요.")],
      ["hanche", 465, 255,
        tt("La hanche", "The hip", "La cadera", "L'anca", "Die Hüfte", "腰角", "الورك", "髋部", "De heup", "A anca", "Höften", "Маклок", "Biodro", "엉덩이뼈"),
        tt("La pointe osseuse en haut de l'arrière-main.", "The bony point at the top of the hindquarters.", "La punta de hueso en lo alto de los cuartos traseros.", "La punta ossea in alto sul posteriore.", "Der knochige Vorsprung oben an der Hinterhand.", "後ろの体の上にある、骨のでっぱり。", "النتوء العظمي في أعلى مؤخّرة الحصان.", "后躯上方突出的骨头。", "Het benige puntje boven aan de achterhand.", "A ponta de osso no alto da traseira.", "Den beniga spetsen högst upp på bakdelen.", "Костный выступ в верхней части задней части тела.", "Kostny wystający punkt na górze zadu.", "뒷몸 위쪽에 툭 튀어나온 뼈예요.")],
      ["cuisse", 320, 420,
        tt("La cuisse", "The thigh", "El muslo", "La coscia", "Der Oberschenkel", "大腿", "الفخذ", "大腿", "De dij", "A coxa", "Låret", "Бедро", "Udo", "넓적다리"),
        tt("Le haut du postérieur, très musclé.", "The top of the hind leg, very muscular.", "La parte alta de la extremidad posterior, muy musculosa.", "La parte alta dell'arto posteriore, molto muscolosa.", "Der obere Teil des Hinterbeins, sehr muskulös.", "後肢の上のほうで、筋肉がたっぷりです。", "الجزء العلوي من القائمة الخلفية، كثير العضلات.", "后腿的上部，肌肉很发达。", "Het bovenste deel van het achterbeen, heel gespierd.", "A parte de cima do membro posterior, muito musculada.", "Övre delen av bakbenet, mycket muskulös.", "Верхняя часть задней ноги, очень мускулистая.", "Górna część tylnej nogi, bardzo umięśniona.", "뒷다리의 위쪽으로, 근육이 아주 많아요.")],
      ["jarret", 372, 680,
        tt("Le jarret", "The hock", "El corvejón", "Il garretto", "Das Sprunggelenk", "飛節", "العرقوب", "飞节", "De sprong", "O curvilhão", "Hasen", "Скакательный сустав", "Staw skokowy", "비절"),
        tt("La grande articulation du postérieur, comme notre cheville.", "The big joint of the hind leg, like our ankle.", "La gran articulación de la extremidad posterior, como nuestro tobillo.", "La grande articolazione dell'arto posteriore, come la nostra caviglia.", "Das große Gelenk des Hinterbeins, wie unser Knöchel.", "後肢の大きな関節で、わたしたちのかかとにあたります。", "المفصل الكبير في القائمة الخلفية، مثل كاحلنا.", "后腿上的大关节，相当于我们的脚踝。", "Het grote gewricht van het achterbeen, zoals onze enkel.", "A grande articulação do membro posterior, como o nosso tornozelo.", "Bakbenets stora led, som vår fotled.", "Большой сустав задней ноги, как наша лодыжка.", "Duży staw tylnej nogi, jak nasza kostka.", "뒷다리의 큰 관절로, 우리의 발목과 같아요.")]
    ] },
    { id: "tete2", titre: UI.vTete, img: IMG_TETE, pts: [
      ["front", 670, 390,
        tt("Le front", "The forehead", "La frente", "La fronte", "Die Stirn", "額", "الجبهة", "额头", "Het voorhoofd", "A testa", "Pannan", "Лоб", "Czoło", "이마"),
        tt("Au-dessus des yeux, sous le toupet.", "Above the eyes, under the forelock.", "Encima de los ojos, bajo el copete.", "Sopra gli occhi, sotto il ciuffo.", "Über den Augen, unter dem Schopf.", "目の上、前髪の下にあります。", "فوق العينين، تحت الناصية.", "在眼睛上方、额发下面。", "Boven de ogen, onder de kuif.", "Acima dos olhos, por baixo do topete.", "Ovanför ögonen, under pannluggen.", "Над глазами, под чёлкой.", "Nad oczami, pod grzywką.", "눈 위, 앞머리 갈기 아래에 있어요.")],
      ["chanfrein", 715, 580,
        tt("Le chanfrein", "The face (nasal bone)", "La cara (hueso nasal)", "Il frontale (osso nasale)", "Das Nasenbein", "鼻梁", "قصبة الأنف", "鼻梁", "De neusrug", "O chanfro", "Nosryggen", "Переносье", "Grzbiet nosa", "콧등"),
        tt("Le devant de la tête, entre le front et les naseaux.", "The front of the head, between the forehead and the nostrils.", "La parte delantera de la cabeza, entre la frente y los ollares.", "Il davanti della testa, tra la fronte e le narici.", "Die Vorderseite des Kopfes, zwischen Stirn und Nüstern.", "頭の前の部分で、額と鼻の穴のあいだです。", "مقدّمة الرأس، بين الجبهة والمنخرين.", "头的正面，在额头和鼻孔之间。", "De voorkant van het hoofd, tussen het voorhoofd en de neusgaten.", "A frente da cabeça, entre a testa e as narinas.", "Huvudets framsida, mellan pannan och näsborrarna.", "Передняя часть головы, между лбом и ноздрями.", "Przód głowy, między czołem a chrapami.", "머리 앞쪽, 이마와 콧구멍 사이예요.")],
      ["ganache", 470, 520,
        tt("La ganache", "The jowl", "La quijada", "La ganascia", "Die Ganasche", "下顎", "الفكّ السفلي", "下颌", "De ganache", "A ganacha", "Ganaschen", "Ганаш", "Ganasz", "아래턱"),
        tt("Le bord arrondi de la mâchoire inférieure.", "The rounded edge of the lower jaw.", "El borde redondeado de la mandíbula inferior.", "Il bordo arrotondato della mascella inferiore.", "Der abgerundete Rand des Unterkiefers.", "下あごの丸いふち。", "الحافة المستديرة للفكّ السفلي.", "下颌骨圆圆的边缘。", "De ronde rand van de onderkaak.", "A borda arredondada do maxilar inferior.", "Underkäkens rundade kant.", "Закруглённый край нижней челюсти.", "Zaokrąglona krawędź żuchwy.", "아래턱의 둥근 가장자리예요.")],
      ["gorge", 410, 650,
        tt("La gorge", "The throat", "La garganta", "La gola", "Die Kehle", "のど", "الحلق", "喉部", "De keel", "A garganta", "Strupen", "Горло", "Gardło", "목구멍"),
        tt("Sous la tête, là où elle rejoint l'encolure.", "Under the head, where it joins the neck.", "Bajo la cabeza, donde se une al cuello.", "Sotto la testa, dove si unisce all'incollatura.", "Unter dem Kopf, wo er in den Hals übergeht.", "頭の下、首につながるところ。", "تحت الرأس، حيث يلتقي بالعنق.", "在头的下面，与脖子相连的地方。", "Onder het hoofd, waar het overgaat in de hals.", "Por baixo da cabeça, onde se junta ao pescoço.", "Under huvudet, där det möter halsen.", "Под головой, там, где она переходит в шею.", "Pod głową, tam gdzie łączy się z szyją.", "머리 아래, 목과 이어지는 곳이에요.")]
    ] }
  ] },
  { n: 3, vues: [
    { id: "corps3", titre: "Le corps en détail", img: IMG_CORPS, pts: [
      ["reins", 430, 205, "Les reins", "Entre le dos et la croupe, sans côtes en dessous."],
      ["poitrail", 962, 440, "Le poitrail", "L'avant du corps, entre les deux antérieurs."],
      ["grasset", 410, 445, "Le grasset", "L'articulation à l'avant de la cuisse, comme notre genou."]
    ] },
    { id: "tete3", titre: "La tête en détail", img: IMG_TETE, pts: [
      ["auge", 520, 690, "L'auge", "Le creux sous la tête, entre les deux ganaches."]
    ] },
    { id: "pied", titre: "Le pied", sous: [
      { id: "face", titre: "De face", img: { src: "images/atlas-pied-face.webp", w: 766, h: 482, alt: "Sabot vu de face" }, pts: [
        ["couronne", 375, 190, "La couronne", "Le bourrelet juste au-dessus du sabot, là où les poils rejoignent la corne. C'est de là que pousse la paroi."],
        ["paroi", 375, 300, "La paroi", "La corne dure que l'on voit quand le pied est posé. Elle pousse d'environ 1 cm par mois, comme nos ongles."],
        ["pince", 375, 400, "La pince", "L'avant du sabot, au milieu. C'est la partie qui touche le sol en dernier quand le pied décolle."],
        ["mamelle", 225, 330, "Les mamelles", "De chaque côté de la pince, entre la pince et les quartiers."]
      ] },
      { id: "profil", titre: "De profil", img: { src: "images/atlas-pied-profil.webp", w: 766, h: 482, alt: "Sabot vu de profil" }, pts: [
        ["couronne", 430, 240, "La couronne", "La limite entre les poils et la corne, sur tout le tour du pied."],
        ["paroi", 420, 320, "La paroi", "La corne extérieure du sabot. De profil, on voit bien son inclinaison."],
        ["pince", 612, 392, "La pince", "L'avant du sabot."],
        ["quartier", 400, 385, "Le quartier", "Le côté du sabot, entre la pince et le talon."],
        ["talon", 225, 378, "Le talon", "L'arrière du sabot, en bas. Il est plus bas que la pince."]
      ] },
      { id: "dessous", titre: "Dessous", img: { src: "images/atlas-pied-dessous.webp", w: 766, h: 512, alt: "Sabot vu de dessous, la pince en bas" }, pts: [
        ["fourchette", 380, 240, "La fourchette", "La corne souple en forme de V. Elle amortit les chocs et aide le sang à remonter. On la cure avec soin."],
        ["lacune", 305, 190, "Les lacunes latérales", "Les deux sillons de chaque côté de la fourchette. On les nettoie au cure-pied, du talon vers la pince."],
        ["sole", 275, 330, "La sole", "Le dessous du pied, légèrement creux. Elle protège l'intérieur du pied."],
        ["ligneb", 380, 452, "La ligne blanche", "La fine ligne entre la sole et la paroi. Le maréchal-ferrant s'en sert de repère pour planter les clous."],
        ["paroi", 178, 300, "La paroi", "Vue de dessous, c'est le bord de corne tout autour du pied."],
        ["talons", 262, 70, "Les talons", "L'arrière du pied, de chaque côté de la fourchette."]
      ] },
      { id: "arriere", titre: "De derrière", img: { src: "images/atlas-pied-arriere.webp", w: 766, h: 512, alt: "Deux sabots vus de derrière" }, pts: [
        ["glomes", 180, 300, "Les glomes", "Les deux renflements souples au-dessus des talons. Ils amortissent les chocs."],
        ["lacunem", 236, 330, "La lacune médiane", "Le petit creux entre les deux glomes."],
        ["talon", 140, 405, "Le talon", "La corne à l'arrière du sabot, sous les glomes."]
      ] }
    ] }
  ] }
];
var avecMaquette = false;

var CSS =
  ".hat2{--n:#070A08;--p:#101A1D;--iv:#F3EEE4;--ch:#C9A66B;container-type:inline-size;color:var(--iv);font-family:'Montserrat',system-ui,sans-serif}" +
  ".hat2 h3{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-weight:500;font-size:clamp(28px,5cqw,42px);line-height:1.1;margin:0 0 6px}" +
  ".hat2 .aide{margin:0 0 16px;font-size:13px;color:rgba(243,238,228,.68)}" +
  ".hat2 .ong{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:0 0 10px;padding:2px 0;list-style:none}.hat2 .ong::-webkit-scrollbar{display:none}" +
  ".hat2 .ong button{white-space:nowrap;border:1px solid rgba(243,238,228,.22);background:transparent;color:var(--iv);border-radius:999px;padding:8px 15px;font:inherit;font-size:13px;cursor:pointer;display:inline-flex;gap:8px;align-items:center}" +
  ".hat2 .ong button[aria-selected=true]{border-color:var(--ch);color:var(--ch);background:rgba(201,166,107,.08)}" +
  ".hat2 .ong.sous button{font-size:12px;padding:6px 12px;border-color:rgba(243,238,228,.14)}" +
  ".hat2 .ong.gal button{font-family:'Cormorant Garamond',serif;font-size:17px;padding:6px 16px}" +
  ".hat2 .ong .nv{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--ch);border:1px solid rgba(201,166,107,.5);border-radius:999px;padding:2px 6px}" +
  ".hat2 .zone{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;margin-top:8px}" +
  ".hat2 .ph{position:relative;border-radius:14px;overflow:hidden;background:var(--n)}" +
  ".hat2 .ph img{display:block;width:100%;height:auto}" +
  ".hat2 .pt{position:absolute;width:34px;height:34px;margin:-17px 0 0 -17px;border:0;padding:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:50%}" +
  ".hat2 .pt i{display:block;box-sizing:border-box;width:13px;height:13px;border-radius:50%;background:transparent;border:1.5px solid rgba(226,196,140,.95);box-shadow:0 0 0 1px rgba(7,10,8,.55),inset 0 0 0 1px rgba(7,10,8,.35);transition:width .3s,height .3s,box-shadow .3s}" +
  ".hat2 .pt:hover i{transform:scale(1.2)}" +
  ".hat2 .pt.on i{width:24px;height:24px;background:transparent;border:1.5px solid #E2C48C;transform:none;box-shadow:0 0 0 1px rgba(7,10,8,.55),0 0 14px rgba(201,166,107,.55)}" +
  ".hat2 .pt:focus-visible{outline:2px solid var(--ch);outline-offset:2px}" +
  ".hat2 .att{aspect-ratio:3/2;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;color:rgba(243,238,228,.65);border:1px dashed rgba(201,166,107,.4);border-radius:14px}" +
  ".hat2 .det{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;align-items:start;min-height:150px;padding:14px 0 0;border-top:1px solid rgba(201,166,107,.3)}" +
  ".hat2 .zm{width:110px;height:110px;border-radius:50%;border:1px solid var(--ch);background-color:var(--n);background-repeat:no-repeat;box-shadow:0 8px 24px rgba(0,0,0,.5)}" +
  ".hat2 .det .n{font-size:11px;letter-spacing:.24em;color:var(--ch);font-weight:600}" +
  ".hat2 .det h4{font-family:'Cormorant Garamond','Noto Serif JP','Noto Naskh Arabic',serif;font-weight:500;font-size:26px;line-height:1.15;margin:4px 0 8px}" +
  ".hat2 .det p{margin:0;font-size:15px;line-height:1.65;color:rgba(243,238,228,.9);animation:hat2In .3s ease}" +
  "@keyframes hat2In{from{opacity:0}to{opacity:1}}" +
  ".hat2 .nav{display:flex;gap:10px;margin-top:14px;grid-column:1/-1}" +
  ".hat2 .nav button{border:1px solid rgba(201,166,107,.55);background:transparent;color:var(--iv);border-radius:999px;padding:8px 15px;font:inherit;font-size:13px;cursor:pointer}" +
  ".hat2 .noms{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;list-style:none;margin:0;padding:2px 0}.hat2 .noms::-webkit-scrollbar{display:none}" +
  ".hat2 .noms button{white-space:nowrap;border:1px solid rgba(243,238,228,.16);background:rgba(16,26,29,.5);color:var(--iv);border-radius:999px;padding:7px 13px;font:inherit;font-size:12.5px;cursor:pointer}" +
  ".hat2 .noms button[aria-pressed=true]{border-color:var(--ch);color:var(--ch)}" +
  ".hat2 .ph{order:1}.hat2 .noms{order:2}.hat2 .det{order:3}" +
  "@container (min-width:760px){" +
  ".hat2 .zone{grid-template-columns:minmax(0,2.2fr) minmax(250px,1fr);align-items:start;gap:28px}" +
  ".hat2 .det{order:2;grid-template-columns:minmax(0,1fr);border-top:0;border-inline-start:1px solid rgba(201,166,107,.35);padding:0 0 0 22px;min-height:0}" +
  "[dir=rtl] .hat2 .det{padding:0 22px 0 0}" +
  ".hat2 .zm{width:100%;height:auto;aspect-ratio:1/1;max-width:240px}" +
  ".hat2 .noms{order:3;grid-column:1/-1;flex-wrap:wrap;overflow:visible}" +
  ".hat2 .pt{width:28px;height:28px;margin:-14px 0 0 -14px}" +
  "}";

function zoomStyle(img, x, y) {
  var R = Math.round(Math.min(img.w, img.h) * 0.22);   /* zone agrandie autour du point */
  var bx = Math.min(Math.max(x - R / 2, 0), img.w - R), by = Math.min(Math.max(y - R / 2, 0), img.h - R);
  return { backgroundImage: "url(" + img.src + ")", backgroundSize: (img.w / R * 100) + "% " + (img.h / R * 100) + "%",
    backgroundPosition: (bx / (img.w - R) * 100) + "% " + (by / (img.h - R) * 100) + "%" };
}

function Module(props) {
  var lg = props.lg || "fr", rtl = lg === "ar";
  var data = NIVEAUX.concat(avecMaquette ? MAQUETTE : []).filter(function (g) { return g.n <= (props.niveau || 1); });
  var _g = useState(data.length - 1), gi = _g[0], setGi = _g[1];          /* le Galop du cours s'ouvre en premier */
  var _m = useState({}), mem = _m[0], setMem = _m[1];                     /* sélection gardée par Galop + vue */
  var _v = useState({}), vueM = _v[0], setVueM = _v[1];
  var nomsRef = useRef(null);
  var _s = useState({}), sousM = _s[0], setSousM = _s[1];
  var G = data[gi], vi = vueM[gi] || 0, V0 = G.vues[vi], ks = gi + "-" + vi, si = sousM[ks] || 0;
  var V = V0.sous ? V0.sous[si] : V0, cle = ks + "-" + si, act = mem[cle] || 0;
  var pts = V.pts || [], cur = pts[act];
  var nom = function (q) { return pk(q[3], lg); }, txt = function (q) { return pk(q[4], lg); };
  var pc = function (v, t) { return (v / t * 100) + "%"; };
  var aller = function (i) {
    if (!pts.length) return;
    var n = (i + pts.length) % pts.length; var o = {}; o[cle] = n; setMem(Object.assign({}, mem, o));
    try { var ul = nomsRef.current, li = ul && ul.children[n]; if (li && ul.scrollWidth > ul.clientWidth + 2) li.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); } catch (e) { }
  };
  var clavier = function (e) {
    if (e.target && e.target.closest && e.target.closest(".ong")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); aller(act + (rtl ? -1 : 1)); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); aller(act + (rtl ? 1 : -1)); }
  };
  return h("div", { className: "hat2", dir: rtl ? "rtl" : undefined, onKeyDown: clavier },
    h("style", null, CSS),
    h("h3", null, pk(UI.titre, lg)),
    h("p", { className: "aide" }, pk(UI.aide, lg)),
    data.length > 1 ? h("ul", { className: "ong gal", role: "tablist", "aria-label": pk(UI.niveaux, lg) }, data.map(function (g, i) {
      return h("li", { key: g.n }, h("button", { type: "button", role: "tab", "aria-selected": i === gi ? "true" : "false", onClick: function () { setGi(i); } },
        pk(UI.galop, lg).replace("{n}", g.n), i === data.length - 1 ? h("span", { className: "nv" }, pk(UI.nouveau, lg)) : null));
    })) : null,
    h("ul", { className: "ong", role: "tablist", "aria-label": pk(UI.vues, lg) }, G.vues.map(function (v, i) {
      return h("li", { key: v.id }, h("button", { type: "button", role: "tab", "aria-selected": i === vi ? "true" : "false", onClick: function () { var o = {}; o[gi] = i; setVueM(Object.assign({}, vueM, o)); } }, pk(v.titre, lg)));
    })),
    V0.sous ? h("ul", { className: "ong sous", role: "tablist", "aria-label": pk(V0.titre, lg) }, V0.sous.map(function (v, i) {
      return h("li", { key: v.id }, h("button", { type: "button", role: "tab", "aria-selected": i === si ? "true" : "false", onClick: function () { var o = {}; o[ks] = i; setSousM(Object.assign({}, sousM, o)); } }, pk(v.titre, lg)));
    })) : null,
    V.img ? h("div", { className: "zone", key: cle },
      h("div", { className: "ph", dir: "ltr", style: V.img.h > V.img.w * 0.9 ? { maxWidth: Math.round(V.img.w / V.img.h * 620) + "px", justifySelf: "center", width: "100%" } : undefined },
        h("img", { src: V.img.src, alt: pk(V.img.alt, lg), width: V.img.w, height: V.img.h, loading: "lazy" }),
        pts.map(function (q, i) {
          return h("button", { key: q[0], type: "button", className: "pt" + (i === act ? " on" : ""), "aria-label": nom(q), "aria-pressed": i === act ? "true" : "false",
            style: { left: pc(q[1], V.img.w), top: pc(q[2], V.img.h) }, onClick: function () { aller(i); } }, h("i", null));
        })),
      cur ? h("div", { className: "det", "aria-live": "polite" },
        h("div", { className: "zm", role: "img", "aria-label": pk(UI.zoom, lg).replace("{nom}", nom(cur)), style: zoomStyle(V.img, cur[1], cur[2]) }),
        h("div", null,
          h("span", { className: "n" }, (act + 1) + " / " + pts.length),
          h("h4", null, nom(cur)),
          h("p", { key: cle + act + lg }, txt(cur))),
        h("div", { className: "nav" },
          h("button", { type: "button", onClick: function () { aller(act - 1); } }, (rtl ? "→ " : "← ") + pk(UI.prec, lg)),
          h("button", { type: "button", onClick: function () { aller(act + 1); } }, pk(UI.suiv, lg) + (rtl ? " ←" : " →")))) : null,
      h("ul", { className: "noms", ref: nomsRef, "aria-label": pk(UI.parties, lg) }, pts.map(function (q, i) {
        return h("li", { key: q[0] }, h("button", { type: "button", "aria-pressed": i === act ? "true" : "false", onClick: function () { aller(i); } }, nom(q)));
      }))) : h("div", { className: "att" }, V.attente || ""));
}

window.HypeAtlas = { Module: Module, titre: function (lg) { return pk(UI.titre, lg); }, img: IMG_CORPS.src, version: 1,
  maquette: function (oui) { avecMaquette = !!oui; } };
})();
