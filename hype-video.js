/* 04/11/2026 : refonte de l accueil (en-tete photo, Mes videos + recherche, onglets des Galops, cartes photo des themes). Page de lecture inchangee. */
/* 27/09/2026 : arabe ajouté (7e langue) — catalogue, chapitres, collections et textes de l écran ; T() accepte ar. */
/* ============================================================
   HYPE ▸ BIBLIOTHÈQUE VIDÉO  (fichier séparé, chargé par index.html)
   ------------------------------------------------------------
   Contient : le catalogue des vidéos, l'écran Bibliothèque
   (window.EcranVideos) et la page de lecture (window.EcranVideoLecture).

   POURQUOI UN FICHIER SÉPARÉ : index.html frôle le seuil de troncature
   iOS Safari. Tout ce qui peut vivre dehors vit dehors.

   DÉPENDANCES (globales de index.html, résolues à l'exécution) :
   React, useApp, COLORS, supa, utilisateurActuel.

   ÉTAT AU 31/07/2026 : 6 vidéos réelles, toutes sur YouTube, vérifiées.
   3 interventions IFCE sur le contact + 3 vidéos sur les aides.
   Une entrée sans source (yt vide) est automatiquement exclue de la
   bibliothèque : jamais de carte morte. Pour ajouter une vidéo, remplir
   yt dans HYPE_VIDEOS ; pour migrer vers Vimeo plus tard, le champ dérivé
   src devient { type:"vimeo", ref } sans autre changement de code.

   La RÉSERVE D'ANIMATIONS (22 entrées, fichiers locaux servis depuis
   images/) n'est visible que par les comptes de HYPE_MODERATEURS.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- THÈMES ---------------- */
  var THEMES = {
    position: { teinte: 198, sceau: "◉" },
    cheval:   { teinte: 172, sceau: "❋" },
    dressage: { teinte: 212, sceau: "❖" },
    obstacle: { teinte: 26,  sceau: "⌃" },
    pied:     { teinte: 150, sceau: "⟡" },
    soins:    { teinte: 38,  sceau: "✿" },
    securite: { teinte: 8,   sceau: "⛨" },
    sante:    { teinte: 150, sceau: "✚" },
    baby:     { teinte: 190, sceau: "☾" }
  };

  /* ---------------- CATALOGUE ----------------
     SOURCE DE VÉRITÉ UNIQUE des vidéos. Un cours ne stocke jamais une URL :
     il stocke un identifiant de cette table (champ vidIds). Le jour où l'IFCE
     déplace une vidéo, on corrige ici et nulle part ailleurs.

     Table établie le 29/07/2026 (passation « Directeur Technique »).
     Tout ce qui s'affiche est en 6 langues. Les vidéos elles-mêmes sont
     en français : langueVideo sert à le dire honnêtement à un cavalier
     germanophone ou japonais.

     verifie : date de vérification du lien. Vide = jamais ouvert.
  ------------------------------------------------ */

  /* Les trois liens « aides » n'ont pas été vérifiés. Passer ce drapeau à
     false pour les retirer de la bibliothèque tant que Blandine ne les a
     pas ouverts une fois chacun (dix secondes par lien). */
  /* 06/08 : laisse a false, et c'est desormais la position par defaut. Les 14
     entrees du catalogue portent toutes une date de verification, donc ce
     drapeau ne cache rien aujourd'hui : il sert de garde-fou pour la suite.
     Toute video ajoutee sans avoir ete ouverte reste invisible tant que la
     date n'est pas inscrite. Ne le remettre a true que si l'on assume
     d'afficher a des cavaliers des liens que personne n'a ouverts. */
  var INCLURE_NON_VERIFIEES = false;

  /* Libellé du chapitre auquel une vidéo est reliée. */
  var CHAPITRES = {
    /* 04/11 13h30 : cours reliés aux nouvelles webconférences IFCE (titres repris des cours) */
    "g6n-14": {"fr": "Le cross : obstacles et parcours", "en": "Cross-country: fences and courses", "es": "El cross: obstáculos y recorrido", "it": "Il cross: ostacoli e percorsi", "ja": "クロスカントリー：障害とコース", "de": "Das Gelände: Hindernisse und Parcours", "ar": "الكروس: الحواجز والمسار", "zh": "越野赛：障碍与路线", "nl": "Cross: hindernissen en parcours", "pt": "O cross: obstáculos e percurso", "sv": "Terränghoppning: hinder och bana", "ru": "Кросс: препятствия и трасса", "pl": "Cross: przeszkody i trasa", "ko": "크로스컨트리: 장애물과 코스"},
    "g6n-06": {"fr": "Maladies, état corporel et besoins", "en": "Diseases, body condition and needs", "es": "Enfermedades, condición corporal y necesidades", "it": "Malattie, condizione corporea e fabbisogni", "ja": "病気、ボディコンディション、必要量", "de": "Krankheiten, Ernährungszustand und Bedarf", "ar": "الأمراض والحالة الجسدية والاحتياجات", "zh": "疾病、体况和需求", "nl": "Ziektes, lichaamsconditie en behoeften", "pt": "Doenças, condição corporal e necessidades", "sv": "Sjukdomar, hullstatus och behov", "ru": "Болезни, упитанность и потребности", "pl": "Choroby, kondycja i potrzeby", "ko": "질병, 체형 상태, 필요한 영양"},
    "g6n-13": {"fr": "Enchaîner des sauts rapprochés et des combinaisons", "en": "Riding related fences and combinations", "es": "Encadenar saltos cercanos y combinaciones", "it": "Concatenare salti ravvicinati e combinazioni", "ja": "連続障害と組み合わせ障害をつなぐ", "de": "Aufeinanderfolgende Sprünge und Kombinationen reiten", "ar": "تتابع القفزات المتقاربة والتركيبات", "zh": "连续跳跃近距离障碍与组合障碍", "nl": "Korte sprongreeksen en combinaties aaneenschakelen", "pt": "Encadear saltos próximos e combinações", "sv": "Rida täta hinder och kombinationer", "ru": "Серии близких прыжков и комбинации", "pl": "Łączyć skoki w krótkich odstępach i kombinacje", "ko": "연속 비월과 콤비네이션 이어 뛰기"},
    "g6n-11": {"fr": "Cession à la jambe au trot et transitions", "en": "Leg-yield in trot and transitions", "es": "Cesión a la pierna al trote y transiciones", "it": "Cessione alla gamba al trotto e transizioni", "ja": "速歩での脚への譲歩と移行", "de": "Schenkelweichen im Trab und Übergänge", "ar": "التنحي عن الساق في الخبب والانتقالات", "zh": "快步中的让腿与转换", "nl": "Wijken voor het been in draf en overgangen", "pt": "Cedência à perna ao trote e transições", "sv": "Skänkelvikning i trav och övergångar", "ru": "Уступка ноге на рыси и переходы", "pl": "Ustępowanie od łydki w kłusie i przejścia", "ko": "속보에서 레그 일드와 전이"},
    "g5-c1": {"fr": "Le travail sans étriers", "en": "Riding without stirrups", "es": "El trabajo sin estribos", "it": "Il lavoro senza staffe", "ja": "鐙なしでの運動", "de": "Die Arbeit ohne Bügel", "ar": "العمل بدون ركابات", "zh": "不踩马镫的训练", "nl": "Rijden zonder stijgbeugels", "pt": "O trabalho sem estribos", "sv": "Ridning utan stigbyglar", "ru": "Работа без стремян", "pl": "Jazda bez strzemion", "ko": "등자 없이 하는 운동"},
    "g7n-15": {"fr": "Le cross : terrain, vitesse et précision", "en": "Cross-country: terrain, speed and accuracy", "es": "El cross: terreno, velocidad y precisión", "it": "Il cross: terreno, velocità e precisione", "ja": "クロスカントリー：地形、スピード、正確さ", "de": "Gelände: Terrain, Tempo und Präzision", "ar": "الكروس: التضاريس والسرعة والدقة", "zh": "越野：地形、速度与精准", "nl": "Cross: terrein, snelheid en precisie", "pt": "O cross: terreno, velocidade e precisão", "sv": "Terräng: underlag, fart och precision", "ru": "Кросс: рельеф, скорость и точность", "pl": "Cross: teren, tempo i precyzja", "ko": "크로스컨트리: 지형, 속도, 정확성"},
    "g5n-09": {"fr": "Incurvation et travail sur les courbes", "en": "Bend and work on curved lines", "es": "Incurvación y trabajo en curvas", "it": "Incurvamento e lavoro sulle curve", "ja": "湾曲と曲線上の運動", "de": "Biegung und Arbeit auf gebogenen Linien", "ar": "التقوّس والعمل على المنحنيات", "zh": "弯曲与弧线练习", "nl": "Buiging en werk op gebogen lijnen", "pt": "Incurvação e trabalho em curvas", "sv": "Böjning och arbete på böjda spår", "ru": "Изгиб и работа на дугах", "pl": "Zgięcie i praca na łukach", "ko": "휨과 곡선 운동"},
    "g6n-05": {"fr": "Travail à la longe et aux longues rênes", "en": "Lungeing and long reining", "es": "Trabajo a la cuerda y con riendas largas", "it": "Lavoro alla longia e alle redini lunghe", "ja": "調馬索運動と長手綱", "de": "Arbeit an der Longe und an den langen Zügeln", "ar": "العمل بحبل الترويض وبالأعنة الطويلة", "zh": "圆圈牵引与长缰绳工作", "nl": "Werken aan de longe en met lange teugels", "pt": "Trabalho à guia e com rédeas longas", "sv": "Arbete på longerlina och med långtyglar", "ru": "Работа на корде и на длинных вожжах", "pl": "Praca na lonży i na długich wodzach", "ko": "론지 운동과 롱레인 운동"},
    "g6n-04": {"fr": "Le pied, la ferrure et le maréchal-ferrant", "en": "The foot, shoeing and the farrier", "es": "El casco, el herraje y el herrador", "it": "Lo zoccolo, la ferratura e il maniscalco", "ja": "蹄、装蹄、装蹄師", "de": "Der Huf, der Beschlag und der Hufschmied", "ar": "الحافر والحدوة والبيطار", "zh": "马蹄、钉掌和蹄铁匠", "nl": "De hoef, het beslag en de hoefsmid", "pt": "O casco, a ferração e o ferrador", "sv": "Hoven, skoningen och hovslagaren", "ru": "Копыто, ковка и коваль", "pl": "Kopyto, podkuwanie i kowal", "ko": "발굽, 편자, 장제사"},
    "g6n-10": {"fr": "La reproduction du cheval", "en": "Horse breeding", "es": "La reproducción del caballo", "it": "La riproduzione del cavallo", "ja": "馬の繁殖", "de": "Die Fortpflanzung des Pferdes", "ar": "تكاثر الخيل", "zh": "马的繁殖", "nl": "De voortplanting van het paard", "pt": "A reprodução do cavalo", "sv": "Hästens fortplantning", "ru": "Размножение лошади", "pl": "Rozród koni", "ko": "말의 번식"},
    "g6n-08": {"fr": "Les allures : qualités, défauts et reculer", "en": "The gaits: qualities, faults and rein-back", "es": "Los aires: cualidades, defectos y retroceder", "it": "Le andature: qualità, difetti e indietreggiare", "ja": "歩法：質、欠点、後退", "de": "Die Gangarten: Qualitäten, Mängel und Rückwärtsrichten", "ar": "المشيات: الجودة والعيوب والرجوع إلى الخلف", "zh": "步法：优点、缺陷与后退", "nl": "De gangen: kwaliteiten, gebreken en achteruitgaan", "pt": "Os andamentos: qualidades, defeitos e recuar", "sv": "Gångarterna: kvaliteter, brister och att backa", "ru": "Аллюры: качества, недостатки и осаживание", "pl": "Chody: jakość, wady i cofanie", "ko": "걸음: 질, 결함, 후진"},
    "g7n-04": {"fr": "Longues rênes et travail en main", "en": "Long-reining and in-hand work", "es": "Riendas largas y trabajo a la mano", "it": "Redini lunghe e lavoro alla mano", "ja": "長手綱とハンドワーク", "de": "Doppellonge und Handarbeit", "ar": "الأعنّة الطويلة والعمل باليد", "zh": "长缰与牵手调教", "nl": "Lange teugels en werk aan de hand", "pt": "Rédeas longas e trabalho à mão", "sv": "Långtömmar och handarbete", "ru": "Длинные вожжи и работа в руках", "pl": "Długie wodze i praca z ręki", "ko": "긴 고삐와 핸드 워크"},
    "g7n-08": {"fr": "Le rationnement et les aliments", "en": "Rationing and feedstuffs", "es": "El racionamiento y los alimentos", "it": "Il razionamento e gli alimenti", "ja": "飼料設計と飼料", "de": "Rationsgestaltung und Futtermittel", "ar": "تقنين العلف والأغذية", "zh": "日粮配给与饲料", "nl": "Rantsoenering en voeders", "pt": "O racionamento e os alimentos", "sv": "Utfodring och fodermedel", "ru": "Рацион и корма", "pl": "Dawkowanie paszy i pasze", "ko": "사료 배합과 사료"},
    "g5n-03": {"fr": "Comment apprend le cheval ?", "en": "How does a horse learn?", "es": "¿Cómo aprende el caballo?", "it": "Come impara il cavallo?", "ja": "馬はどのように学ぶ？", "de": "Wie lernt das Pferd?", "ar": "كيف يتعلّم الحصان؟", "zh": "马是如何学习的？", "nl": "Hoe leert een paard?", "pt": "Como aprende o cavalo?", "sv": "Hur lär sig hästen?", "ru": "Как учится лошадь?", "pl": "Jak uczy się koń?", "ko": "말은 어떻게 배울까?"},
    "g5n-04": {"fr": "Anatomie, locomotion et digestion", "en": "Anatomy, movement and digestion", "es": "Anatomía, locomoción y digestión", "it": "Anatomia, locomozione e digestione", "ja": "解剖、運動、消化", "de": "Anatomie, Bewegungsapparat und Verdauung", "ar": "التشريح والحركة والهضم", "zh": "解剖、运动与消化", "nl": "Anatomie, voortbeweging en spijsvertering", "pt": "Anatomia, locomoção e digestão", "sv": "Anatomi, rörelse och matsmältning", "ru": "Анатомия, движение и пищеварение", "pl": "Anatomia, ruch i trawienie", "ko": "해부, 운동, 소화"},
    "g5n-06": {"fr": "Travail à pied : longe et longues rênes", "en": "Groundwork: lunging and long-reining", "es": "Trabajo pie a tierra: cuerda y riendas largas", "it": "Lavoro da terra: longia e redini lunghe", "ja": "グランドワーク：調馬索と長手綱", "de": "Bodenarbeit: Longe und Doppellonge", "ar": "العمل من الأرض: الحبل والأعنة الطويلة", "zh": "地面工作：打圈与长缰", "nl": "Grondwerk: longeren en lange teugels", "pt": "Trabalho a pé: guia e rédeas longas", "sv": "Markarbete: longering och långtömmar", "ru": "Работа с земли: корда и длинные вожжи", "pl": "Praca z ziemi: lonża i długie wodze", "ko": "지상 작업: 조마삭과 긴 고삐"},
    "g5n-11": {"fr": "Saut d'obstacles : technique et parcours", "en": "Show jumping: technique and courses", "es": "Salto de obstáculos: técnica y recorrido", "it": "Salto ostacoli: tecnica e percorso", "ja": "障害飛越：技術とコース", "de": "Springreiten: Technik und Parcours", "ar": "قفز الحواجز: التقنية والمسار", "zh": "障碍跳跃：技术与路线", "nl": "Springen: techniek en parcours", "pt": "Salto de obstáculos: técnica e percurso", "sv": "Hoppning: teknik och bana", "ru": "Конкур: техника и маршрут", "pl": "Skoki przez przeszkody: technika i parkur", "ko": "장애물 비월: 기술과 코스"},
    "g5n-12": {"fr": "Cross et équitation en terrain varié", "en": "Cross-country and riding over varied terrain", "es": "Cross y equitación en terreno variado", "it": "Cross ed equitazione su terreno vario", "ja": "クロスカントリーと変化のある地形での騎乗", "de": "Gelände und Reiten in abwechslungsreichem Terrain", "ar": "الكروس والركوب في تضاريس متنوعة", "zh": "越野与多样地形骑乘", "nl": "Cross en rijden in gevarieerd terrein", "pt": "Cross e equitação em terreno variado", "sv": "Terräng och ridning i varierad terräng", "ru": "Кросс и езда по пересечённой местности", "pl": "Cross i jazda w zróżnicowanym terenie", "ko": "크로스컨트리와 다양한 지형 승마"},
    /* 04/11 : chapitres des Galops 3, 5, 6, 7 reliés aux nouvelles vidéos (titres repris des cours). */
    "g6-c2": {"fr":"L'impulsion","en":"Impulsion","es":"La impulsión","it":"L'impulso","ja":"インパルジョン","de":"Der Schwung","ar":"الاندفاع","zh":"冲力","nl":"De impuls","pt":"A impulsão","sv":"Impulsen","ru":"Импульс","pl":"Impuls","ko":"추진력"},
    "g6n-09": {"fr":"L'impulsion","en":"Impulsion","es":"La impulsión","it":"L'impulso","ja":"インパルジョン","de":"Der Schwung","ar":"الاندفاع","zh":"冲力","nl":"De impuls","pt":"A impulsão","sv":"Impulsen","ru":"Импульс","pl":"Impuls","ko":"추진력"},
    "g3-c1": {"fr": "Le trot enlevé sur le bon diagonal", "en": "Rising trot on the correct diagonal", "ja": "正しい手前での軽速歩", "it": "Il trotto sollevato sul diagonale corretto", "de": "Leichttraben auf der richtigen Diagonale", "es": "El trote levantado sobre el diagonal correcto", "ar": "الخبب المرتفع على القطري الصحيح", "zh": "在正确的对角上起坐快步", "nl": "Lichtrijden op de juiste diagonaal", "pt": "O trote levantado no diagonal correto", "sv": "Lättridning på rätt diagonal", "ru": "Облегчённая рысь на правильной диагонали", "pl": "Kłus ćwiczebny na właściwej diagonali", "ko": "올바른 대각으로 하는 경속보"},
    "g3-c9": {"fr": "Les différentes litières", "en": "The different types of bedding", "es": "Los diferentes tipos de cama", "it": "Le diverse lettiere", "ja": "さまざまな敷料", "de": "Die verschiedenen Einstreuarten", "ar": "أنواع الفرشة المختلفة", "zh": "不同的垫料", "nl": "De verschillende strooiselsoorten", "pt": "As diferentes camas de baia", "sv": "De olika typerna av underlag i boxen", "ru": "Разные виды подстилки", "pl": "Rodzaje ściółki", "ko": "여러 가지 깔짚"},
    "g3-c2": {"fr": "Le départ sur le bon pied", "en": "Departing on the correct lead", "es": "La partida al pie correcto", "it": "La partenza sul piede giusto", "ja": "正しい手前での発進", "de": "Der Angalopp auf dem richtigen Bein", "ar": "الانطلاق بالرجل الصحيحة", "zh": "用正确的领先腿起跑", "nl": "Aangaloperen op het juiste been", "pt": "A partida no pé certo", "sv": "Galoppfattning på rätt hand", "ru": "Старт на нужную ногу", "pl": "Zagalopowanie na właściwą nogę", "ko": "올바른 발로 출발하기"},
    "g3-c3": {"fr": "Préparer un bon abord à l'obstacle", "en": "Preparing a good approach to a fence", "es": "Preparar un buen abordaje al obstáculo", "it": "Preparare un buon avvicinamento all'ostacolo", "ja": "障害への良いアプローチを作る", "de": "Ein gutes Anreiten vorbereiten", "ar": "تجهيز اقتراب جيد من الحاجز", "zh": "为障碍做好良好的接近", "nl": "Een goede nadering van de hindernis voorbereiden", "pt": "Preparar uma boa aproximação do obstáculo", "sv": "Förbereda en bra inridning mot hindret", "ru": "Как правильно подготовить подход к препятствию", "pl": "Przygotowanie dobrego najazdu na przeszkodę", "ko": "장애물 접근 잘 준비하기"},
    "g3-saut": {"fr": "Les 6 phases du saut", "en": "The 6 phases of the jump", "es": "Las 6 fases del salto", "it": "Le 6 fasi del salto", "ja": "跳躍の六つの局面", "de": "Die 6 Phasen des Sprungs", "ar": "مراحل القفزة الست", "zh": "跳跃的 6 个阶段", "nl": "De 6 fasen van de sprong", "pt": "As 6 fases do salto", "sv": "Hoppets 6 faser", "ru": "6 фаз прыжка", "pl": "6 faz skoku", "ko": "점프의 6단계"},
    "g3-c5": {"fr": "Le pansage complet et le soin des pieds", "en": "Full grooming and hoof care", "es": "El acicalado completo y el cuidado de los cascos", "it": "La pulizia completa e la cura degli zoccoli", "ja": "完全な手入れと足のケア", "de": "Das vollständige Putzen und die Hufpflege", "ar": "التنظيف الكامل والعناية بالأقدام", "zh": "完整的刷拭与蹄部护理", "nl": "Volledig verzorgen en hoefzorg", "pt": "A escovação completa e o cuidado com os cascos", "sv": "Fullständig ryktning och hovvård", "ru": "Полная чистка и уход за копытами", "pl": "Pełna pielęgnacja i dbanie o kopyta", "ko": "꼼꼼한 손질과 발굽 관리"},
    "g3-c6": {"fr": "Le comportement naturel du cheval", "en": "The horse's natural behavior", "es": "El comportamiento natural del caballo", "it": "Il comportamento naturale del cavallo", "ja": "馬の自然な行動", "de": "Das natürliche Verhalten des Pferdes", "ar": "السلوك الطبيعي للحصان", "zh": "马的天性行为", "nl": "Het natuurlijke gedrag van het paard", "pt": "O comportamento natural do cavalo", "sv": "Hästens naturliga beteende", "ru": "Естественное поведение лошади", "pl": "Naturalne zachowanie konia", "ko": "말의 타고난 행동"},
    "g3-c12": {"fr": "L'assiette et la posture assise", "en": "The seat and sitting posture", "es": "El asiento y la postura sentada", "it": "L'assetto e la postura seduta", "ja": "騎座と座った姿勢", "de": "Der Sitz und die sitzende Haltung", "ar": "المقعد والوضعية الجالسة", "zh": "骑坐与坐姿", "nl": "De zit en de houding in zit", "pt": "O assento e a postura sentada", "sv": "Sitsen och den sittande hållningen", "ru": "Посадка и положение в седле сидя", "pl": "Dosiad i pozycja w siedzeniu", "ko": "좌골과 앉은 자세"},
    "g3-c14": {"fr": "Les aides pour tourner", "de": "Die Hilfen zum Wenden", "en": "The aids for turning", "es": "Las ayudas para girar", "it": "Gli aiuti per girare", "ja": "向きを変えるための扶助", "ar": "مساعدات الانعطاف", "zh": "转弯的扶助", "nl": "De hulpen om te draaien", "pt": "As ajudas para virar", "sv": "Hjälperna för att svänga", "ru": "Помощи для поворота", "pl": "Pomoce przy skręcaniu", "ko": "방향 돌기를 위한 부조"},
    "g3-c15": {"fr": "La demi-volte et la demi-volte renversée", "en": "The half-volt and the reverse half-volt", "es": "La media volta y la media volta invertida", "it": "La mezza volta e la mezza volta invertita", "ja": "ハーフボルトと逆ハーフボルト", "de": "Die halbe Volte und die Gegenhalbe Volte", "ar": "نصف الدويرة ونصف الدويرة المعكوسة", "zh": "半圈转和反半圈转", "nl": "De halve volte en de omgekeerde halve volte", "pt": "A meia-volta e a meia-volta invertida", "sv": "Halv volt och omvänd halv volt", "ru": "Полувольт и обратный полувольт", "pl": "Półwolta i odwrócona półwolta", "ko": "반 볼트와 역반 볼트"},
    "g5n-10": {"fr": "Cession à la jambe et départs au galop", "en": "Leg-yielding and canter departs", "es": "Cesión a la pierna y salidas al galope", "it": "Cessione alla gamba e partenze al galoppo", "ja": "脚への譲歩と駈歩発進", "de": "Schenkelweichen und Angaloppieren", "ar": "الإزاحة بالساق والانطلاق في العدو", "zh": "腿让与跑步起步", "nl": "Wijken voor de kuit en galopaanspringen", "pt": "Cedência à perna e partidas a galope", "sv": "Skänkelvikning och galoppfattningar", "ru": "Уступка шенкелю и подъёмы в галоп", "pl": "Ustępowanie od łydki i zagalopowania", "ko": "레그일딩과 구보 발진"},
    "g6-c1": {"fr": "Incurvation aux trois allures et galop à faux", "en": "Bend at all three gaits and counter-canter", "es": "Incurvación en los tres aires y galope en trocado", "it": "Incurvamento alle tre andature e galoppo rovescio", "ja": "3種の歩法での湾曲と反対駈歩", "de": "Biegung in allen drei Grundgangarten und Außengalopp", "ar": "الانثناء في المشيات الثلاث والعدو المعاكس", "zh": "三种步法中的弯曲与反跑步", "nl": "Buiging in alle drie de gangen en tegengalop", "pt": "Flexão nos três andamentos e galope falso", "sv": "Böjning i alla tre gångarterna och kontragalopp", "ru": "Изгиб на трёх аллюрах и ложный галоп", "pl": "Zgięcie we wszystkich trzech chodach i galop kontra", "ko": "세 가지 걸음에서의 만곡과 반대 구보"},
    "g6n-01": {"fr": "Incurvation aux trois allures et galop à faux", "en": "Bend at all three gaits and counter-canter", "es": "Incurvación en los tres aires y galope en trocado", "it": "Incurvamento alle tre andature e galoppo rovescio", "ja": "3種の歩法での湾曲と反対駈歩", "de": "Biegung in allen drei Grundgangarten und Außengalopp", "ar": "الانثناء في المشيات الثلاث والعدو المعاكس", "zh": "三种步法中的弯曲与反跑步", "nl": "Buiging in alle drie de gangen en tegengalop", "pt": "Flexão nos três andamentos e galope falso", "sv": "Böjning i alla tre gångarterna och kontragalopp", "ru": "Изгиб на трёх аллюрах и ложный галоп", "pl": "Zgięcie we wszystkich trzech chodach i galop kontra", "ko": "세 가지 걸음에서의 만곡과 반대 구보"},
    "g7n-14": {"fr": "Le CSO : enchaîner et diriger", "en": "Show jumping: linking and steering", "es": "Salto de obstáculos: encadenar y dirigir", "it": "Salto ostacoli: concatenare e dirigere", "ja": "障害飛越：連続飛越とライン取り", "de": "Springen: verbinden und lenken", "ar": "قفز الحواجز: الربط والتوجيه", "zh": "场地障碍：连续跳跃与控线", "nl": "Springen: aaneenschakelen en sturen", "pt": "Saltos: encadear e dirigir", "sv": "Hoppning: koppla ihop och styra", "ru": "Конкур: связки и управление", "pl": "Skoki: łączenie i prowadzenie", "ko": "장애물 비월: 연결과 방향 잡기"},
    /* 06/08 : premieres cles du Galop 1. Jusqu'ici CHAPITRES ne connaissait
       que des chapitres de Galop 3 et 4 : rien ne pouvait se rattacher a un
       cours du Galop 1, faute de libelle. Les intitules reprennent exactement
       ceux des cours (regle : jamais d'identifiant technique a l'ecran). */
    "g1-c2":  { fr: "Le pansage, premier soin", en: "Grooming, the first form of care", es: "El acicalado, el primer cuidado", it: "La pulizia, la prima cura", ja: "手入れ：最初のケア", de: "Die Fellpflege, die erste Pflege", ar: "العناية بالشعر، أول رعاية", zh: "刷拭，最初的照料", nl: "Verzorgen, de eerste zorg", pt: "A escovação, o primeiro cuidado", sv: "Ryktning, den första omsorgen", ru: "Чистка — первая забота о лошади", pl: "Czyszczenie konia, pierwsza forma opieki", ko: "손질, 첫 번째 케어" },
    "g1-c5":  { fr: "La position du cavalier", en: "The rider's position", es: "La posición del jinete", it: "La posizione del cavaliere", ja: "騎手の姓勢", de: "Die Sitzposition des Reiters", ar: "وضعية الفارس", zh: "骑手的骑姿", nl: "De houding van de ruiter", pt: "A posição do cavaleiro", sv: "Ryttarens ridställning", ru: "Посадка всадника", pl: "Dosiad jeźdźca", ko: "기수의 자세" },
    "g1-c9":  { fr: "Les aides naturelles et artificielles", en: "Natural and artificial aids", es: "Las ayudas naturales y artificiales", it: "Gli aiuti naturali e artificiali", ja: "自然の扶助と人工の扶助", de: "Natürliche und künstliche Hilfen", ar: "المساعدات الطبيعية والاصطناعية", zh: "自然扶助和人工扶助", nl: "De natuurlijke en kunstmatige hulpen", pt: "As ajudas naturais e artificiais", sv: "Naturliga och konstgjorda hjälper", ru: "Естественные и искусственные помощи", pl: "Pomoce naturalne i sztuczne", ko: "자연 보조와 인공 보조" },
    "g1-c8":  { fr: "Le matériel de base", en: "Basic equipment", es: "El material básico", it: "L'attrezzatura di base", ja: "基本の道具", de: "Die Grundausrüstung", ar: "المعدات الأساسية", zh: "基本装备", nl: "De basisuitrusting", pt: "O equipamento básico", sv: "Grundutrustningen", ru: "Основная амуниция", pl: "Podstawowy sprzęt", ko: "기본 장비" },
    "g1-c10": { fr: "Le nœud d'attache", en: "The quick-release knot", es: "El nudo de atar", it: "Il nodo d'attacco", ja: "つなぎ結び", de: "Der Anbindeknoten", ar: "عقدة الربط", zh: "拴马结", nl: "De bindknoop", pt: "O nó de amarrar", sv: "Snabbknuten", ru: "Узел для привязи", pl: "Węzeł do uwiązywania", ko: "묶는 매듭" },
    "g1-c15": { fr: "La sécurité avant tout", en: "Safety first", es: "La seguridad ante todo", it: "La sicurezza prima di tutto", ja: "安全が第一", de: "Sicherheit zuerst", ar: "السلامة أولا", zh: "安全第一", nl: "Veiligheid boven alles", pt: "A segurança em primeiro lugar", sv: "Säkerheten främst", ru: "Безопасность прежде всего", pl: "Bezpieczeństwo przede wszystkim", ko: "안전이 최우선" },
    "g1-c18": { fr: "Conduire en main en sécurité", en: "Leading in hand safely", es: "Llevar de la mano con seguridad", it: "Condurre a mano in sicurezza", ja: "安全な手級での引き马", de: "Sicher an der Hand führen", ar: "القيادة باليد بأمان", zh: "安全地牵马行走", nl: "Veilig een paard aan de hand leiden", pt: "Conduzir o cavalo com segurança, a pé", sv: "Leda häst i hand på ett säkert sätt", ru: "Как безопасно водить лошадь в поводу", pl: "Bezpieczne prowadzenie konia z ziemi", ko: "안전하게 말 끌기" },
    "g1-c19": { fr: "Monter et descendre en sécurité", en: "Mounting and dismounting safely", es: "Montar y desmontar con seguridad", it: "Salire e scendere in sicurezza", ja: "安全な乗降", de: "Sicher auf- und absteigen", ar: "الركوب والنزول بأمان", zh: "安全地上马和下马", nl: "Veilig opstijgen en afstijgen", pt: "Montar e desmontar com segurança", sv: "Sitta upp och av säkert", ru: "Безопасно садиться в седло и слезать", pl: "Bezpieczne wsiadanie i zsiadanie", ko: "안전하게 올라타고 내려오기" },
    /* 06/08 : premieres cles du Galop 2, pour les deux films « Objectif Galop® 2 ». */
    "g2-c3": { fr: "Diriger sur un trac\u00e9", en: "Riding a line", es: "Trazar un recorrido", it: "Guidare su un tracciato", ja: "\u30e9\u30a4\u30f3\u3092\u63cf\u304f", de: "Auf einer Linie reiten", ar: "التوجيه على مسار", zh: "在路线上骑行", nl: "Sturen op een rijlijn", pt: "Conduzir em um traçado", sv: "Rida en linje", ru: "Езда по траектории", pl: "Prowadzenie konia po wyznaczonej linii", ko: "선을 그리며 말 몰기" },
    "g2-c4": { fr: "La d\u00e9couverte du saut", en: "Discovering the jump", es: "El descubrimiento del salto", it: "La scoperta del salto", ja: "\u8df3\u8e8d\u306e\u767a\u898b", de: "Die Entdeckung des Springens", ar: "اكتشاف القفز", zh: "初识跳跃", nl: "De kennismaking met springen", pt: "A descoberta do salto", sv: "Upptäcka hoppningen", ru: "Знакомство с прыжком", pl: "Odkrywanie skoku", ko: "장애물 처음 만나기" },
    /* 06/08 : cles ajoutees pour les films « Objectif Galop® 4 ». Les trois
       chapitres existaient deja dans les cours, ils n'avaient pas de libelle ici. */
    "g4-transitions": { fr: "Réussir ses transitions", en: "Clean transitions", es: "Lograr sus transiciones", it: "Riuscire le transizioni", ja: "変換を成功させる", de: "Übergänge gelingen lassen", ar: "إتقان الانتقالات", zh: "漂亮地完成步伐转换", nl: "Je overgangen goed rijden", pt: "Fazer boas transições", sv: "Lyckade övergångar", ru: "Как чисто выполнять переходы", pl: "Czyste przejścia", ko: "전이 잘 해내기" },
    "g4-epaules-hanches": { fr: "Déplacer les épaules et les hanches", en: "Moving the shoulders and haunches", es: "Desplazar los hombros y las ancas", it: "Spostare le spalle e le anche", ja: "肩と腰を動かす", de: "Schultern und Hanken versetzen", ar: "تحريك الكتفين والوركين", zh: "移动肩膀和臀部", nl: "Schouders en heupen verplaatsen", pt: "Deslocar os ombros e os quadris", sv: "Flytta bogar och bakdel", ru: "Перемещение плеч и крупа", pl: "Przesuwanie łopatek i zadu", ko: "어깨와 엉덩이 움직이게 하기" },
    "g4-obstacles-equilibre": { fr: "Équilibre à l'obstacle", en: "Balance over fences", es: "Equilibrio ante el obstáculo", it: "Equilibrio all'ostacolo", ja: "障害でのバランス", de: "Gleichgewicht am Sprung", ar: "التوازن فوق الحاجز", zh: "过障碍时的平衡", nl: "Balans bij de sprong", pt: "Equilíbrio no obstáculo", sv: "Balans vid hindret", ru: "Равновесие на препятствиях", pl: "Równowaga przy przeszkodzie", ko: "장애물 앞에서의 균형" },
    "g4-exterieur": { fr: "En extérieur", en: "Out on a hack", es: "En exterior", it: "In esterno", ja: "外乗で", de: "Im Gelände", ar: "في الخارج", zh: "户外骑行", nl: "Buiten rijden", pt: "Passeio no campo", sv: "Ute i terrängen", ru: "Прогулка за пределами манежа", pl: "W terenie", ko: "야외에서" },
    "g4-contact": { fr: "Le contact", en: "Contact", es: "El contacto", it: "Il contatto", ja: "コンタクト", de: "Die Anlehnung", ar: "الاتصال", zh: "接触", nl: "Het contact", pt: "O contato", sv: "Kontakten", ru: "Контакт", pl: "Kontakt", ko: "콘택트" },
    "g4-aides":   { fr: "L'accord des aides", en: "Coordination of the aids", es: "El acuerdo de las ayudas", it: "L'accordo degli aiuti", ja: "扶助の連携", de: "Das Zusammenspiel der Hilfen", ar: "تنسيق المساعدات", zh: "扶助的协调", nl: "De samenwerking van de hulpen", pt: "A harmonia das ajudas", sv: "Samspelet mellan hjälperna", ru: "Согласованность помощей", pl: "Zgranie pomocy", ko: "보조의 조화" },
    "g4-incurvation": { fr: "L'incurvation", en: "Bend and flexion", es: "La incurvación", it: "L'incurvamento", ja: "内方姿勢", de: "Stellung und Biegung", ar: "الانحناء", zh: "弯曲", nl: "De buiging", pt: "A flexão lateral", sv: "Böjningen", ru: "Изгиб", pl: "Zgięcie", ko: "굴곡" },
    "g4-biomeca": { fr: "La biomécanique du cheval", en: "The horse's biomechanics", es: "La biomecánica del caballo", it: "La biomeccanica del cavallo", ja: "馬のバイオメカニクス", de: "Die Biomechanik des Pferdes", ar: "الميكانيكا الحيوية للحصان", zh: "马的生物力学", nl: "De biomechanica van het paard", pt: "A biomecânica do cavalo", sv: "Hästens biomekanik", ru: "Биомеханика лошади", pl: "Biomechanika konia", ko: "말의 생체역학" }
  };

  /* Thèmes de la passation -> univers de la bibliothèque. */
  var THEME_MAP = {
    "comprendre-le-cheval": "cheval",
    "position-du-cavalier": "position",
    "soins-et-materiel": "soins",
    "dressage": "dressage",
    "obstacle": "obstacle",
    "travail-a-pied": "pied",
    "securite": "securite",
    "sante": "sante"
  };

  var HYPE_VIDEOS = [
    {
      id: "v-contact-01", yt: "0mAl3ZptRpg",
      source: "IFCE", intervenant: "Bernard Maurel",
      intervenantRole: { fr: "Juge international de dressage", en: "International dressage judge", es: "Juez internacional de doma", it: "Giudice internazionale di dressage", ja: "国際馬場馬術審判員", de: "Internationaler Dressurrichter", ar: "حكم دولي في الترويض", zh: "国际盛装舞步裁判", nl: "Internationaal dressuurjury", pt: "Juiz internacional de adestramento", sv: "Internationell dressyrdomare", ru: "Международный судья по выездке", pl: "Międzynarodowy sędzia ujeżdżenia", ko: "국제 마장마술 심판" },
      titreSource: "Le contact : élément physique et psychologique essentiel dans la relation cheval-cavalier",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-1-b-maurel/",
      langueVideo: "fr", cours: ["g4-contact"], galop: 4, theme: "comprendre-le-cheval",
      rang: "principal", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre le contact entre le cheval et son cavalier",
        en: "Understanding contact between horse and rider",
        es: "Comprender el contacto entre el caballo y su jinete",
        it: "Capire il contatto tra cavallo e cavaliere",
        ja: "馬と乗り手のコンタクトを理解する",
        de: "Die Anlehnung zwischen Pferd und Reiter verstehen", ar: "فهم الاتصال بين الحصان وفارسه", zh: "理解马与骑手之间的接触", nl: "Het contact tussen paard en ruiter begrijpen", pt: "Entender o contato entre o cavalo e o cavaleiro", sv: "Förstå kontakten mellan häst och ryttare", ru: "Понять контакт между лошадью и всадником", pl: "Zrozumieć kontakt między koniem a jeźdźcem", ko: "말과 기수 사이의 접촉 이해하기"
      },
      resume: {
        fr: "Ce que la main touche par les rênes, ce n'est pas seulement la bouche : c'est tout le fonctionnement du dos, du garrot et de l'encolure.",
        en: "What the hand touches through the reins is not only the mouth: it is the whole working of the back, the withers and the neck.",
        es: "Lo que la mano toca por las riendas no es solo la boca: es todo el funcionamiento del dorso, la cruz y el cuello.",
        it: "Ciò che la mano tocca tramite le redini non è solo la bocca: è tutto il funzionamento del dorso, del garrese e dell'incollatura.",
        ja: "手綱を通して手が触れているのは口だけではありません。背中、き甲、首の働き全体です。",
        de: "Was die Hand über die Zügel berührt, ist nicht nur das Maul: es ist das ganze Zusammenspiel von Rücken, Widerrist und Hals.", ar: "ما تلمسه اليد عبر اللجام ليس الفم فقط: بل هو عمل الظهر والحارك والرقبة كله.", zh: "手通过缰绳感受到的，不只是马的嘴：而是整个背部、鬐甲和颈部的运作。", nl: "Wat de hand via de teugels voelt, is niet alleen de bek: het is de hele werking van de rug, de schoft en de hals.", pt: "O que a mão sente pelas rédeas não é só a boca: é todo o funcionamento do dorso, da cernelha e do pescoço.", sv: "Det handen känner genom tyglarna är inte bara munnen: det är hela ryggens, manke och halsens funktion.", ru: "Через поводья рука чувствует не только рот: это работа всей спины, холки и шеи.", pl: "To, czego dłoń dotyka przez wodze, to nie tylko pysk: to całe działanie grzbietu, kłębu i szyi.", ko: "고삐를 통해 손에 닿는 건 입만이 아니에요. 등, 기갑, 목이 어떻게 움직이는지 전체가 전해져요."
      },
      observer: {
        fr: ["La main qui suit les mouvements de l'encolure", "Le lien entre le contact et le mouvement vers l'avant", "La relation entre les mains, l'assiette et les jambes", "Le confort et la confiance du cheval"],
        en: ["The hand following the movements of the neck", "The link between contact and forward movement", "The relationship between hands, seat and legs", "The horse's comfort and confidence"],
        es: ["La mano que sigue los movimientos del cuello", "El vínculo entre el contacto y el movimiento hacia delante", "La relación entre manos, asiento y piernas", "La comodidad y la confianza del caballo"],
        it: ["La mano che segue i movimenti dell'incollatura", "Il legame tra contatto e movimento in avanti", "La relazione tra mani, assetto e gambe", "Il comfort e la fiducia del cavallo"],
        ja: ["首の動きに従う手", "コンタクトと前進の動きのつながり", "手、騎座、脚の関係", "馬の快適さと信頼"],
        de: ["Die Hand, die den Bewegungen des Halses folgt", "Die Verbindung zwischen Anlehnung und Vorwärtsbewegung", "Das Verhältnis von Händen, Sitz und Beinen", "Der Komfort und das Vertrauen des Pferdes"], ar: ["اليد التي تتبع حركات الرقبة","العلاقة بين الاتصال والحركة إلى الأمام","العلاقة بين اليدين والجلسة والساقين","راحة الحصان وثقته"], zh: ["手跟随颈部的动作", "接触与向前运动之间的联系", "手、骑坐和腿之间的关系", "马的舒适和信任"], nl: ["De hand die de bewegingen van de hals volgt", "Het verband tussen contact en voorwaartse beweging", "De relatie tussen de handen, de zit en de benen", "Het comfort en het vertrouwen van het paard"], pt: ["A mão acompanhando os movimentos do pescoço", "A relação entre o contato e o movimento para a frente", "A relação entre as mãos, o assento e as pernas", "O conforto e a confiança do cavalo"], sv: ["Handen som följer halsens rörelser", "Sambandet mellan kontakt och rörelse framåt", "Samspelet mellan händer, sits och ben", "Hästens komfort och förtroende"], ru: ["Рука, следующая за движениями шеи", "Связь между контактом и движением вперёд", "Взаимосвязь рук, посадки и ног", "Комфорт и доверие лошади"], pl: ["Dłoń podążająca za ruchami szyi", "Związek między kontaktem a ruchem do przodu", "Zależność między rękami, dosiadem i łydkami", "Komfort i zaufanie konia"], ko: ["목의 움직임을 따라가는 손", "접촉과 전진 운동의 관계", "손, 좌골, 다리의 관계", "말의 편안함과 믿음"]
      }
    },
    {
      id: "v-contact-02", yt: "_NDiPIGzdLk",
      source: "IFCE", intervenant: "Géraldine Vandevenne",
      intervenantRole: { fr: "Ergonome équin, spécialiste des mors", en: "Equine ergonomist, bitting specialist", es: "Ergónoma equina, especialista en bocados", it: "Ergonoma equina, specialista dei morsi", ja: "馬のエルゴノミスト、ハミの専門家", de: "Pferde-Ergonomin, Gebiss-Spezialistin", ar: "أخصائي في بيئة عمل الخيول، متخصص في الشكائم", zh: "马匹工效学专家，衔铁专家", nl: "Paardenergonoom, specialist in bitten", pt: "Ergonomista equino, especialista em freios", sv: "Hästergonom, specialist på bett", ru: "Эргономист по лошадям, специалист по удилам", pl: "Ergonom koński, specjalista od wędzideł", ko: "말 인체공학 전문가, 재갈 전문가" },
      titreSource: "Les mors : leurs actions dans la bouche du cheval, leurs effets et leurs conséquences",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-2-g-vandevenne/",
      langueVideo: "fr", cours: ["g4-contact"], galop: 4, theme: "soins-et-materiel",
      rang: "approfondir", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Les mors et leur action dans la bouche",
        en: "Bits and how they act in the mouth",
        es: "Los bocados y su acción en la boca",
        it: "I morsi e la loro azione nella bocca",
        ja: "ハミと、口の中でのその作用",
        de: "Gebisse und ihre Wirkung im Maul", ar: "الشكائم وتأثيرها في الفم", zh: "衔铁以及它在嘴里的作用", nl: "De bitten en hun werking in de bek", pt: "Os freios e sua ação na boca", sv: "Bett och hur de verkar i munnen", ru: "Удила и их действие во рту", pl: "Wędzidła i ich działanie w pysku", ko: "재갈과 입 안에서의 작용"
      },
      resume: {
        fr: "Sur quelles parties du corps le mors agit-il, et à partir de quand devient-il un instrument de douleur ?",
        en: "Which parts of the body does the bit act on, and when does it become an instrument of pain?",
        es: "¿Sobre qué partes del cuerpo actúa el bocado, y cuándo se convierte en un instrumento de dolor?",
        it: "Su quali parti del corpo agisce il morso, e da quando diventa uno strumento di dolore?",
        ja: "ハミは体のどの部分に作用し、どこから痛みの道具になるのか。",
        de: "Auf welche Körperteile wirkt das Gebiss, und ab wann wird es zu einem Instrument des Schmerzes?", ar: "على أي أجزاء من الجسم تؤثر الشكيمة، ومتى تصبح أداة للألم؟", zh: "衔铁作用在身体的哪些部位？又是从什么时候开始变成造成疼痛的工具？", nl: "Op welke delen van het lichaam werkt het bit, en vanaf wanneer wordt het een pijnlijk instrument?", pt: "Em quais partes do corpo o freio atua, e a partir de quando ele se torna um instrumento de dor?", sv: "Vilka delar av kroppen verkar bettet på, och när blir det ett smärtsamt redskap?", ru: "На какие части тела действуют удила и в какой момент они становятся орудием боли?", pl: "Na które części ciała działa wędzidło i od kiedy staje się narzędziem bólu?", ko: "재갈은 몸의 어느 부분에 작용하며, 언제부터 고통을 주는 도구가 될까요?"
      }
    },
    {
      id: "v-contact-03", yt: "_-jWx21-oqk",
      source: "IFCE", intervenant: "Stéphane Montavon",
      intervenantRole: { fr: "Docteur vétérinaire, médecine équine sportive", en: "Veterinarian, equine sports medicine", es: "Doctor veterinario, medicina equina deportiva", it: "Dottore veterinario, medicina equina sportiva", ja: "獣医師、馬のスポーツ医学", de: "Tierarzt, Pferdesportmedizin", ar: "طبيب بيطري، طب الخيول الرياضي", zh: "兽医博士，马匹运动医学", nl: "Dierenarts, sportpaardengeneeskunde", pt: "Médico-veterinário, medicina esportiva equina", sv: "Veterinär, idrottsmedicin för häst", ru: "Ветеринарный врач, спортивная медицина лошадей", pl: "Lekarz weterynarii, medycyna sportowa koni", ko: "수의사 박사, 스포츠 말 의학" },
      titreSource: "Les aspects biomécaniques du contact, la relation avec l'engagement et avec l'équilibre",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-3-s-montavon/",
      langueVideo: "fr", cours: ["g4-contact", "g4-biomeca"], galop: 4, theme: "comprendre-le-cheval",
      rang: "approfondir", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Contact, engagement et équilibre",
        en: "Contact, engagement and balance",
        es: "Contacto, enganche y equilibrio",
        it: "Contatto, impegno ed equilibrio",
        ja: "コンタクト、踏み込み、バランス",
        de: "Anlehnung, Hinterhandaktivität und Gleichgewicht", ar: "الاتصال والانخراط والتوازن", zh: "接触、推进与平衡", nl: "Contact, engagement en balans", pt: "Contato, engajamento e equilíbrio", sv: "Kontakt, engagemang och balans", ru: "Контакт, включение в работу и равновесие", pl: "Kontakt, zaangażowanie i równowaga", ko: "접촉, 후구의 들어옴, 균형"
      },
      resume: {
        fr: "Comment un contact juste laisse passer la poussée des postérieurs vers l'avant-main, et permet au garrot de s'élever.",
        en: "How a correct contact lets the drive from the hindquarters travel to the forehand, allowing the withers to lift.",
        es: "Cómo un contacto justo deja pasar el impulso de los posteriores hacia la mano delantera y permite que la cruz se eleve.",
        it: "Come un contatto giusto lascia passare la spinta dei posteriori verso l'anteriore, permettendo al garrese di elevarsi.",
        ja: "正しいコンタクトが後肢の推進を前躯へ通し、き甲を持ち上げさせる仕組み。",
        de: "Wie eine korrekte Anlehnung den Schub der Hinterhand zur Vorhand durchlässt und den Widerrist anheben lässt.", ar: "كيف يسمح الاتصال الصحيح بانتقال دفع الأطراف الخلفية نحو المقدمة، ويتيح للحارك أن يرتفع.", zh: "恰当的接触如何让后躯的推力传到前躯，并让鬐甲得以抬起。", nl: "Hoe een juist contact de stuwkracht van de achterbenen naar de voorhand laat doorstromen en de schoft laat opkomen.", pt: "Como um contato correto deixa passar a impulsão dos posteriores até o anterior, permitindo que a cernelha se eleve.", sv: "Hur en rätt kontakt låter bakbenens drivkraft gå vidare till framdelen och gör att manken kan lyfta sig.", ru: "Как правильный контакт пропускает толчок задних ног к передней части и позволяет холке подняться.", pl: "Jak prawidłowy kontakt przepuszcza impuls z zadu do przodu i pozwala kłębowi się unieść.", ko: "알맞은 접촉이 어떻게 뒷다리의 밀어 주는 힘을 전구로 흘려 보내고 기갑을 올라오게 하는지 보여 줘요."
      }
    },
    {
      id: "v-incurvation-01", yt: "yloDh58eMQk",
      source: "", intervenant: "",
      titreSource: "L'incurvation - Séance montée",
      langueVideo: "fr", cours: ["g4-incurvation"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre l'incurvation en selle",
        en: "Understanding bend in the saddle",
        es: "Comprender la incurvación a caballo",
        it: "Capire l'incurvamento in sella",
        ja: "騎乗しての内方姿勢を理解する",
        de: "Stellung und Biegung im Sattel verstehen", ar: "فهم الانحناء على السرج", zh: "理解骑乘中的弯曲", nl: "De buiging begrijpen onder het zadel", pt: "Entender a flexão lateral na sela", sv: "Förstå böjning i sadeln", ru: "Понять изгиб в седле", pl: "Zrozumieć zgięcie w siodle", ko: "말 위에서 굴곡 이해하기"
      },
      resume: {
        fr: "Une séance montée pour voir quand, pourquoi et comment demander l'incurvation : la vidéo la plus accessible sur ce sujet.",
        en: "A ridden session showing when, why and how to ask for bend: the most accessible video on this topic.",
        es: "Una sesión montada para ver cuándo, por qué y cómo pedir la incurvación: el vídeo más accesible sobre este tema.",
        it: "Una sessione montata per vedere quando, perché e come chiedere l'incurvamento: il video più accessibile su questo tema.",
        ja: "内方姿勢をいつ、なぜ、どのように求めるかを見る実技セッション。このテーマでもっとも分かりやすい映像。",
        de: "Eine gerittene Einheit, die zeigt, wann, warum und wie man Biegung verlangt: das zugänglichste Video zu diesem Thema.", ar: "حصة ركوب لمعرفة متى ولماذا وكيف نطلب الانحناء: أسهل فيديو في هذا الموضوع.", zh: "一堂骑乘课，看什么时候、为什么、怎样要求弯曲：这是这个主题上最容易理解的视频。", nl: "Een gereden training om te zien wanneer, waarom en hoe je om buiging vraagt: de toegankelijkste video over dit onderwerp.", pt: "Uma sessão montada para ver quando, por que e como pedir a flexão lateral: o vídeo mais acessível sobre o assunto.", sv: "Ett ridpass som visar när, varför och hur man ber om böjning: den mest lättillgängliga videon om det här ämnet.", ru: "Занятие верхом: когда, зачем и как просить изгиб. Самое доступное видео по этой теме.", pl: "Lekcja pod siodłem pokazująca, kiedy, dlaczego i jak prosić o zgięcie: najbardziej przystępny film na ten temat.", ko: "굴곡을 언제, 왜, 어떻게 요청하는지 직접 타면서 보여 주는 수업이에요. 이 주제에서 가장 쉽게 볼 수 있는 영상이에요."
      },
      observer: {
        fr: ["Le moment où le cavalier demande l'incurvation", "La coordination entre la jambe intérieure et la rêne extérieure", "La légèreté de la main intérieure", "La réaction du cheval sur la courbe"],
        en: ["The moment the rider asks for bend", "The coordination between the inside leg and the outside rein", "The lightness of the inside hand", "The horse's reaction on the curve"],
        es: ["El momento en que el jinete pide la incurvación", "La coordinación entre la pierna interior y la rienda exterior", "La ligereza de la mano interior", "La reacción del caballo en la curva"],
        it: ["Il momento in cui il cavaliere chiede l'incurvamento", "La coordinazione tra la gamba interna e la redine esterna", "La leggerezza della mano interna", "La reazione del cavallo sulla curva"],
        ja: ["乗り手が内方姿勢を求める瞬間", "内方の脚と外方の手綱の連係", "内方の手の軽さ", "曲線上での馬の反応"],
        de: ["Der Moment, in dem der Reiter Biegung verlangt", "Das Zusammenspiel von innerem Bein und äußerem Zügel", "Die Leichtigkeit der inneren Hand", "Die Reaktion des Pferdes auf der Kurve"], ar: ["اللحظة التي يطلب فيها الفارس الانحناء","التنسيق بين الساق الداخلية واللجام الخارجي","خفة اليد الداخلية","رد فعل الحصان على المنحنى"], zh: ["骑手要求弯曲的那一刻", "内侧腿与外侧缰绳之间的配合", "内侧手的轻柔", "马在弯道上的反应"], nl: ["Het moment waarop de ruiter om buiging vraagt", "De coördinatie tussen het binnenbeen en de buitenteugel", "De lichtheid van de binnenhand", "De reactie van het paard in de bocht"], pt: ["O momento em que o cavaleiro pede a flexão lateral", "A coordenação entre a perna interna e a rédea externa", "A leveza da mão interna", "A reação do cavalo na curva"], sv: ["Ögonblicket då ryttaren ber om böjning", "Samspelet mellan det inre benet och den yttre tygeln", "Lättheten i den inre handen", "Hästens reaktion i svängen"], ru: ["Момент, когда всадник просит изгиб", "Согласованность внутренней ноги и наружного повода", "Лёгкость внутренней руки", "Реакция лошади на повороте"], pl: ["Moment, w którym jeździec prosi o zgięcie", "Współpraca wewnętrznej łydki i zewnętrznej wodzy", "Lekkość wewnętrznej ręki", "Reakcja konia na łuku"], ko: ["기수가 굴곡을 요청하는 순간", "안쪽 다리와 바깥쪽 고삐의 협응", "안쪽 손의 가벼움", "곡선에서 말의 반응"]
      }
    },
    {
      id: "v-aides-01", yt: "do-xy3MlB08",
      source: "", intervenant: "",
      titreSource: "Galop 4, 5 l'incurvation et l'utilisation des aides",
      langueVideo: "fr", cours: ["g4-aides", "g4-incurvation"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre comment coordonner ses aides",
        en: "Understanding how to coordinate your aids",
        es: "Comprender cómo coordinar las ayudas",
        it: "Capire come coordinare i propri aiuti",
        ja: "扶助をどう連係させるかを理解する",
        de: "Verstehen, wie man seine Hilfen abstimmt", ar: "فهم كيفية تنسيق المساعدات", zh: "理解如何协调你的扶助", nl: "Begrijpen hoe je je hulpen op elkaar afstemt", pt: "Entender como coordenar suas ajudas", sv: "Förstå hur du samordnar dina hjälper", ru: "Понять, как согласовывать свои помощи", pl: "Zrozumieć, jak koordynować pomoce", ko: "부조를 조화롭게 쓰는 법 이해하기"
      },
      resume: {
        fr: "L'accord des aides sur une courbe : le pli, l'incurvation, et la différence entre plier l'encolure et faire tourner tout le cheval.",
        en: "Coordinating the aids on a curve: the flexion, the bend, and the difference between bending the neck and turning the whole horse.",
        es: "El acuerdo de las ayudas en una curva: el pliegue, la incurvación y la diferencia entre plegar el cuello y hacer girar a todo el caballo.",
        it: "L'accordo degli aiuti su una curva: la piega, l'incurvamento e la differenza tra flettere l'incollatura e far girare tutto il cavallo.",
        ja: "曲線上での扶助の一致。屈曲、内方姿勢、そして首を曲げることと馬全体を回すことの違い。",
        de: "Das Zusammenspiel der Hilfen im Bogen: die Stellung, die Biegung, und der Unterschied zwischen Halsbiegung und dem Wenden des ganzen Pferdes.", ar: "تنسيق المساعدات على منحنى: الثني، والانحناء، والفرق بين ثني الرقبة وجعل الحصان كله يدور.", zh: "在弯道上协调扶助：屈曲、弯曲，以及只弯脖子和让整匹马转弯之间的区别。", nl: "De samenwerking van de hulpen in een bocht: de stelling, de buiging en het verschil tussen de hals buigen en het hele paard laten draaien.", pt: "A coordenação das ajudas em uma curva: a flexão, a flexão lateral e a diferença entre dobrar o pescoço e fazer o cavalo inteiro virar.", sv: "Hjälperna i samspel i en sväng: nackböjningen, böjningen och skillnaden mellan att böja halsen och att vrida hela hästen.", ru: "Согласованность помощей на повороте: постановка, изгиб и разница между сгибанием шеи и поворотом всей лошади.", pl: "Zgranie pomocy na łuku: ustawienie, zgięcie i różnica między zginaniem szyi a skręcaniem całego konia.", ko: "곡선에서의 부조 조화: 굽힘, 굴곡, 그리고 목만 굽히는 것과 말 전체를 돌리는 것의 차이예요."
      },
      observer: {
        fr: ["Le rôle de la jambe intérieure", "Le rôle des aides extérieures", "La coordination entre les jambes et les mains", "La différence entre plier l'encolure et faire tourner tout le cheval", "Le maintien de l'impulsion pendant la demande"],
        en: ["The role of the inside leg", "The role of the outside aids", "The coordination between legs and hands", "The difference between bending the neck and turning the whole horse", "Keeping the impulsion during the request"],
        es: ["El papel de la pierna interior", "El papel de las ayudas exteriores", "La coordinación entre piernas y manos", "La diferencia entre plegar el cuello y hacer girar a todo el caballo", "El mantenimiento de la impulsión durante la demanda"],
        it: ["Il ruolo della gamba interna", "Il ruolo degli aiuti esterni", "La coordinazione tra gambe e mani", "La differenza tra flettere l'incollatura e far girare tutto il cavallo", "Il mantenimento dell'impulso durante la richiesta"],
        ja: ["内方の脚の役割", "外方の扶助の役割", "脚と手の連係", "首を曲げることと馬全体を回すことの違い", "要求のあいだ推進を保つこと"],
        de: ["Die Rolle des inneren Beins", "Die Rolle der äußeren Hilfen", "Das Zusammenspiel von Beinen und Händen", "Der Unterschied zwischen Halsbiegung und dem Wenden des ganzen Pferdes", "Den Schwung während der Hilfengebung erhalten"], ar: ["دور الساق الداخلية","دور المساعدات الخارجية","التنسيق بين الساقين واليدين","الفرق بين ثني الرقبة وجعل الحصان كله يدور","الحفاظ على الاندفاع أثناء الطلب"], zh: ["内侧腿的作用", "外侧扶助的作用", "腿和手之间的配合", "只弯脖子和让整匹马转弯之间的区别", "在发出要求时保持冲力"], nl: ["De rol van het binnenbeen", "De rol van de buitenste hulpen", "De coördinatie tussen de benen en de handen", "Het verschil tussen de hals buigen en het hele paard laten draaien", "Het behouden van de impuls tijdens de aanvraag"], pt: ["O papel da perna interna", "O papel das ajudas externas", "A coordenação entre as pernas e as mãos", "A diferença entre dobrar o pescoço e fazer o cavalo inteiro virar", "Manter a impulsão durante o pedido"], sv: ["Det inre benets roll", "De yttre hjälparnas roll", "Samspelet mellan ben och händer", "Skillnaden mellan att böja halsen och att vrida hela hästen", "Att behålla impulsionen under förfrågan"], ru: ["Роль внутренней ноги", "Роль наружных помощей", "Согласованность между ногами и руками", "Разница между сгибанием шеи и поворотом всей лошади", "Сохранение импульса во время просьбы"], pl: ["Rola wewnętrznej łydki", "Rola pomocy zewnętrznych", "Współpraca łydek i rąk", "Różnica między zginaniem szyi a skręcaniem całego konia", "Utrzymanie impulsu podczas prośby"], ko: ["안쪽 다리의 역할", "바깥쪽 부조의 역할", "다리와 손의 협응", "목만 굽히는 것과 말 전체를 돌리는 것의 차이", "요청하는 동안 추진력 유지하기"]
      }
    },
    {
      id: "v-aides-02", yt: "liF7Odcx6F8",
      source: "Horseman Club", intervenant: "",
      titreSource: "Les secrets de l'indépendance des aides",
      langueVideo: "fr", cours: ["g4-aides"], galop: 4, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "L'indépendance des aides",
        en: "Independence of the aids",
        es: "La independencia de las ayudas",
        it: "L'indipendenza degli aiuti",
        ja: "扶助の独立",
        de: "Die Unabhängigkeit der Hilfen", ar: "استقلالية المساعدات", zh: "扶助的独立性", nl: "De onafhankelijkheid van de hulpen", pt: "A independência das ajudas", sv: "Hjälparnas oberoende", ru: "Независимость помощей", pl: "Niezależność pomocy", ko: "부조의 독립성"
      },
      resume: {
        fr: "Agir d'une jambe sans tirer, fermer les doigts sans bloquer le reste du corps, tourner le regard sans se déséquilibrer.",
        en: "Using one leg without pulling, closing the fingers without locking the rest of the body, turning the eyes without losing balance.",
        es: "Actuar con una pierna sin tirar, cerrar los dedos sin bloquear el resto del cuerpo, girar la mirada sin desequilibrarse.",
        it: "Agire con una gamba senza tirare, chiudere le dita senza bloccare il resto del corpo, girare lo sguardo senza squilibrarsi.",
        ja: "引かずに片脚で作用する。体の残りを固めずに指を閉じる。バランスを崩さずに視線を向ける。",
        de: "Mit einem Bein wirken ohne zu ziehen, die Finger schließen ohne den übrigen Körper festzumachen, den Blick wenden ohne das Gleichgewicht zu verlieren.", ar: "استعمال ساق دون الشد، وإغلاق الأصابع دون تجميد بقية الجسم، وتحويل النظر دون فقدان التوازن.", zh: "一条腿发力却不拉扯，握紧手指却不让身体其他部位僵住，转动视线却不失去平衡。", nl: "Met één been werken zonder te trekken, je vingers sluiten zonder de rest van je lichaam te blokkeren, je blik draaien zonder uit balans te raken.", pt: "Agir com uma perna sem puxar, fechar os dedos sem travar o resto do corpo, virar o olhar sem perder o equilíbrio.", sv: "Använda ett ben utan att dra, sluta fingrarna utan att spänna resten av kroppen, vrida blicken utan att tappa balansen.", ru: "Действовать одной ногой, не дёргая; сжимать пальцы, не зажимая остальное тело; поворачивать взгляд, не теряя равновесия.", pl: "Działać jedną łydką bez ciągnięcia, zaciskać palce bez blokowania reszty ciała, obracać wzrok bez utraty równowagi.", ko: "당기지 않고 한쪽 다리로 부조하기, 몸의 나머지를 굳히지 않고 손가락 쥐기, 균형을 잃지 않고 시선 돌리기."
      }
    },
    {
      id: "v-aides-03", yt: "M4t3qcqeDsY",
      source: "", intervenant: "",
      titreSource: "Le dosage des aides pour mieux se faire comprendre de son cheval",
      langueVideo: "fr", cours: ["g4-aides"], galop: 4, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "2026-07-29",
      note: "Aborde aussi la voix, le stick et la cravache — hors sujet du chapitre, à ne pas mettre en vidéo principale.",
      titre: {
        fr: "Le dosage des aides",
        en: "Getting the strength of the aids right",
        es: "La dosificación de las ayudas",
        it: "Il dosaggio degli aiuti",
        ja: "扶助の加減",
        de: "Die Dosierung der Hilfen", ar: "ضبط قوة المساعدات", zh: "掌握扶助的力度", nl: "De dosering van de hulpen", pt: "A dosagem das ajudas", sv: "Rätt dosering av hjälperna", ru: "Дозировка помощей", pl: "Dozowanie pomocy", ko: "부조 세기 조절"
      },
      resume: {
        fr: "Une demande claire, progressive, suivie d'un relâchement : l'illustration directe de « la plus petite aide efficace ».",
        en: "A clear, progressive request followed by a release: a direct illustration of \u201cthe smallest aid that works\u201d.",
        es: "Una demanda clara, progresiva, seguida de un relajamiento: la ilustración directa de «la ayuda más pequeña que funciona».",
        it: "Una richiesta chiara, progressiva, seguita da un rilascio: l'illustrazione diretta del «più piccolo aiuto efficace».",
        ja: "はっきりと、段階的に求め、そして解放する。「効く最小の扶助」をそのまま示す内容。",
        de: "Eine klare, abgestufte Hilfe mit anschließendem Nachgeben: die direkte Veranschaulichung der \u201ekleinsten Hilfe, die wirkt\u201c.", ar: "طلب واضح وتدريجي يتبعه إرخاء: مثال مباشر على «أصغر مساعدة فعالة».", zh: "一个清晰、循序渐进的要求，随后放松：这直接演示了“最小的有效扶助”。", nl: "Een duidelijke, geleidelijke aanvraag, gevolgd door een loslaten: de directe illustratie van \"de kleinst mogelijke effectieve hulp\".", pt: "Um pedido claro e progressivo, seguido de um relaxamento: a ilustração direta de “a menor ajuda eficaz”.", sv: "En tydlig, gradvis förfrågan följd av ett släpp: ett direkt exempel på ”den minsta hjälp som fungerar”.", ru: "Ясная, постепенная просьба с последующим отпусканием: прямая иллюстрация принципа «наименьшая эффективная помощь».", pl: "Jasna, stopniowa prośba, po której następuje odpuszczenie: bezpośrednia ilustracja zasady „najmniejszej skutecznej pomocy”.", ko: "분명하고 점진적인 요청 뒤에 풀어 주기. “가장 작은 효과적인 부조”를 그대로 보여 주는 예시예요."
      }
    },
    /* ============================================================
       06/08/2026 · SERIE « OBJECTIF GALOP® » DE LA FFE
       Sept films par niveau, pour les Galops 1 a 4, tournes au Parc
       Equestre Federal de Lamotte et au Poney-Club d'Orleans, diffuses
       d'abord sur Equidia a l'automne 2015 puis mis en visionnage
       gratuit. C'est le registre qui manquait : les webconferences IFCE
       s'adressent a des professionnels, ce qui explique que les six
       premieres videos du catalogue soient toutes en Galop 4.
       Les cinq liens ci-dessous ont ete ouverts par Blandine le
       06/08/2026 : les cinq repondent, duree 3 min 30 a 3 min 45,
       d'ou dureeTranche "moyen" pour tous.
       Trois des sept films du Galop 1 restent a trouver.
       Des films de Galop 2 existent aussi : a ajouter ensuite.
       RESERVE : ce sont des films sous droits FFE. Hype est un produit
       payant qui recoupe les Guides Federaux ; un accord ecrit avec la
       FFE est a obtenir avant d'en faire un pilier de l'application.
       ============================================================ */
    {
      id: "v-g1-aborder", yt: "0IQaRtCxcFA",
      source: "FFE", titreSource: "Objectif Galop® 1 : Aborder son cheval",
      langueVideo: "fr", cours: ["g1-c15", "g1-c18"], galop: 1, theme: "securite",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Aborder son cheval",
        en: "Approaching your horse",
        es: "Abordar a su caballo",
        it: "Avvicinarsi al proprio cavallo",
        ja: "馬に近づく",
        de: "An das Pferd herantreten", ar: "الاقتراب من الحصان", zh: "接近你的马", nl: "Je paard benaderen", pt: "Aproximar-se do seu cavalo", sv: "Att närma sig sin häst", ru: "Как подойти к лошади", pl: "Podchodzenie do konia", ko: "말에게 다가가기"
      },
      resume: {
        fr: "Se faire voir, se faire entendre, puis toucher : l'ordre des gestes qui font qu'un cheval ne sursaute pas.",
        en: "Be seen, be heard, then touch: the order of gestures that keeps a horse from startling.",
        es: "Hacerse ver, hacerse oír, y luego tocar: el orden de los gestos que evita que un caballo se sobresalte.",
        it: "Farsi vedere, farsi sentire, poi toccare: l'ordine dei gesti che evita che un cavallo si spaventi.",
        ja: "まず見てもらい、声をかけ、それから触れる。馬を驚かせないための順番。",
        de: "Gesehen werden, gehört werden, dann berühren: die Reihenfolge, die ein Pferd nicht erschrecken lässt.", ar: "أن يراك، ثم أن يسمعك، ثم أن تلمسيه: ترتيب الحركات الذي يمنع الحصان من الفزع.", zh: "让它看见你，让它听见你，然后再触摸：这一连串动作的顺序，能让马不被吓到。", nl: "Je laten zien, je laten horen en dan pas aanraken: de volgorde van handelingen waardoor een paard niet schrikt.", pt: "Fazer-se ver, fazer-se ouvir e só então tocar: a ordem dos gestos que evita que o cavalo se assuste.", sv: "Bli sedd, bli hörd, rör sedan vid hästen: ordningen på rörelserna som gör att en häst inte rycker till.", ru: "Дать себя увидеть, дать себя услышать, а потом коснуться: порядок действий, при котором лошадь не вздрагивает.", pl: "Pokaż się, odezwij się, potem dotknij: kolejność gestów, dzięki której koń się nie płoszy.", ko: "모습을 보이고, 소리를 들려주고, 그다음에 만지기. 말이 깜짝 놀라지 않게 하는 동작의 순서예요."
      },
      observer: {
        fr: ["La position du cavalier par rapport à l'œil du cheval", "La voix avant la main", "Le premier point de contact sur l'encolure", "Le changement de côté"],
        en: ["Where the rider stands in relation to the horse's eye", "Voice before hand", "The first point of contact on the neck", "Changing sides"],
        es: ["La posición del jinete respecto al ojo del caballo", "La voz antes que la mano", "El primer punto de contacto en el cuello", "El cambio de lado"],
        it: ["La posizione del cavaliere rispetto all'occhio del cavallo", "La voce prima della mano", "Il primo punto di contatto sull'incollatura", "Il cambio di lato"],
        ja: ["馬の目に対する位置", "手より先に声", "首への最初の接触", "左右の入れ替わり"],
        de: ["Die Position des Reiters zum Auge des Pferdes", "Die Stimme vor der Hand", "Der erste Kontaktpunkt am Hals", "Der Seitenwechsel"], ar: ["موقع الفارس بالنسبة إلى عين الحصان","الصوت قبل اليد","أول نقطة لمس على الرقبة","تغيير الجهة"], zh: ["骑手相对于马的眼睛所站的位置", "先出声，再伸手", "颈部上的第一个接触点", "换边"], nl: ["De positie van de ruiter ten opzichte van het oog van het paard", "De stem vóór de hand", "Het eerste contactpunt op de hals", "De wisseling van kant"], pt: ["A posição do cavaleiro em relação ao olho do cavalo", "A voz antes da mão", "O primeiro ponto de contato no pescoço", "A troca de lado"], sv: ["Var ryttaren står i förhållande till hästens öga", "Rösten före handen", "Den första kontaktpunkten på halsen", "Att byta sida"], ru: ["Где стоит всадник относительно глаза лошади", "Голос раньше руки", "Первая точка касания на шее", "Смена стороны"], pl: ["Miejsce jeźdźca względem oka konia", "Głos przed ręką", "Pierwszy punkt kontaktu na szyi", "Zmiana strony"], ko: ["말의 눈에 대한 기수의 위치", "손보다 먼저 목소리", "목에서 처음 닿는 지점", "반대쪽으로 옮기기"]
      }
    },
    {
      id: "v-g1-licol", yt: "GyQiZIse010",
      source: "FFE", titreSource: "Objectif Galop® 1 : Mettre le licol",
      langueVideo: "fr", cours: ["g1-c10", "g1-c8"], galop: 1, theme: "soins-et-materiel",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Mettre le licol",
        en: "Putting on the halter",
        es: "Poner el cabestro",
        it: "Mettere la testiera",
        ja: "絵口をつける",
        de: "Das Halfter anlegen", ar: "وضع الرسن", zh: "戴上笼头", nl: "De halster aandoen", pt: "Colocar o cabresto", sv: "Att sätta på grimman", ru: "Как надеть недоуздок", pl: "Zakładanie kantara", ko: "홀터 씌우기"
      },
      resume: {
        fr: "Chaque partie du licol a un nom et une place. Le film montre le geste complet, sans précipitation.",
        en: "Every part of the halter has a name and a place. The film shows the whole sequence, unhurried.",
        es: "Cada parte del cabestro tiene un nombre y un lugar. El vídeo muestra el gesto completo, sin prisa.",
        it: "Ogni parte della testiera ha un nome e un posto. Il film mostra il gesto completo, senza fretta.",
        ja: "絵口の各部には名前と位置がある。あわてずに、一連の動作を見せる。",
        de: "Jeder Teil des Halfters hat einen Namen und einen Platz. Der Film zeigt den ganzen Ablauf, ohne Eile.", ar: "لكل جزء من الرسن اسم ومكان. يعرض الفيلم الحركة كاملة، دون تسرع.", zh: "笼头的每个部分都有名称和位置。视频展示了完整的动作，不慌不忙。", nl: "Elk deel van de halster heeft een naam en een plek. De film laat de hele handeling zien, zonder haast.", pt: "Cada parte do cabresto tem um nome e um lugar. O filme mostra o gesto completo, sem pressa.", sv: "Varje del av grimman har ett namn och en plats. Filmen visar hela handlingen, utan brådska.", ru: "У каждой части недоуздка есть название и своё место. На видео показано всё движение целиком, без спешки.", pl: "Każda część kantara ma swoją nazwę i miejsce. Film pokazuje cały gest, bez pośpiechu.", ko: "홀터의 각 부분에는 이름과 자리가 있어요. 영상에서 서두르지 않고 전체 동작을 보여 줘요."
      }
    },
    {
      id: "v-g1-mener", yt: "LhxKlloAFiQ",
      source: "FFE", titreSource: "Objectif Galop® 1 : Mener son cheval",
      langueVideo: "fr", cours: ["g1-c18"], galop: 1, theme: "travail-a-pied",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Mener son cheval en main",
        en: "Leading your horse in hand",
        es: "Llevar a su caballo de la mano",
        it: "Condurre il cavallo a mano",
        ja: "馬を引く",
        de: "Das Pferd an der Hand führen", ar: "قيادة الحصان باليد", zh: "牵着你的马走", nl: "Je paard aan de hand leiden", pt: "Conduzir seu cavalo a pé", sv: "Att leda sin häst i hand", ru: "Как водить лошадь в поводу", pl: "Prowadzenie konia z ziemi", ko: "말 끌기"
      },
      resume: {
        fr: "À la hauteur de l'épaule, jamais devant, jamais derrière. Où se placer, comment tenir la longe, comment tourner.",
        en: "Level with the shoulder, never in front, never behind. Where to stand, how to hold the rope, how to turn.",
        es: "A la altura del hombro, nunca delante, nunca detrás. Dónde colocarse, cómo sujetar la cuerda, cómo girar.",
        it: "All'altezza della spalla, mai davanti, mai dietro. Dove mettersi, come tenere la longhina, come girare.",
        ja: "肩の位置で、前すぎず後ろすぎず。立ち位置、索の持ち方、曲がるときの動き。",
        de: "Auf Höhe der Schulter, nie davor, nie dahinter. Wo man geht, wie man den Strick hält, wie man wendet.", ar: "بمحاذاة الكتف، لا أمامه أبدا ولا خلفه أبدا. أين نقف، وكيف نمسك حبل القيادة، وكيف ندور.", zh: "与肩膀齐平，不在前面，也不在后面。站在哪里，怎么拿牵引绳，怎么转弯。", nl: "Ter hoogte van de schouder, nooit ervoor, nooit erachter. Waar je moet lopen, hoe je de longeerlijn vasthoudt, hoe je draait.", pt: "Na altura do ombro, nunca à frente, nunca atrás. Onde se posicionar, como segurar a guia, como virar.", sv: "I höjd med bogen, aldrig framför, aldrig bakom. Var du ska stå, hur du håller longerlinan, hur du svänger.", ru: "На уровне плеча, никогда не впереди и никогда не позади. Где встать, как держать корду, как поворачивать.", pl: "Na wysokości łopatki, nigdy z przodu, nigdy z tyłu. Gdzie stanąć, jak trzymać lonżę, jak skręcać.", ko: "어깨 높이에서, 앞도 뒤도 안 돼요. 어디에 서는지, 론지를 어떻게 잡는지, 어떻게 돌아가는지 알려 줘요."
      },
      observer: {
        fr: ["La place du cavalier à hauteur d'épaule", "La main qui ne tire pas", "Le regard porté là où l'on va", "Le tour effectué en poussant, pas en tirant"],
        en: ["The handler level with the shoulder", "The hand that does not pull", "Eyes on where you are going", "Turning by pushing, not pulling"],
        es: ["El sitio del jinete a la altura del hombro", "La mano que no tira", "La mirada puesta donde se va", "El giro empujando, no tirando"],
        it: ["Il posto del cavaliere all'altezza della spalla", "La mano che non tira", "Lo sguardo dove si va", "La girata spingendo, non tirando"],
        ja: ["肩の横に並ぶ位置", "引っ張らない手", "進む先を見る目線", "引かずに押して回る"],
        de: ["Der Platz auf Höhe der Schulter", "Die Hand, die nicht zieht", "Der Blick dorthin, wohin man geht", "Die Wendung durch Schieben, nicht Ziehen"], ar: ["موقع القائد بمحاذاة الكتف","اليد التي لا تشد","النظر موجه إلى حيث نذهب","الدوران بالدفع لا بالشد"], zh: ["牵马的人与肩膀齐平", "不拉扯的手", "目光看向要去的地方", "用推而不是用拉来完成转弯"], nl: ["De plek van de ruiter ter hoogte van de schouder", "De hand die niet trekt", "De blik gaat waar je naartoe gaat", "De draai maak je door te duwen, niet door te trekken"], pt: ["A posição do condutor na altura do ombro", "A mão que não puxa", "O olhar vai para onde você está indo", "A virada feita empurrando, não puxando"], sv: ["Ryttaren i höjd med bogen", "Handen som inte drar", "Blicken riktad dit du ska", "Att svänga genom att skjuta på, inte dra"], ru: ["Место человека на уровне плеча лошади", "Рука, которая не тянет", "Взгляд направлен туда, куда идёшь", "Поворот выполняется толчком, а не рывком"], pl: ["Miejsce prowadzącego na wysokości łopatki", "Ręka, która nie ciągnie", "Wzrok skierowany tam, dokąd idziesz", "Skręt wykonany pchnięciem, nie ciągnięciem"], ko: ["어깨 높이에 서는 기수의 위치", "당기지 않는 손", "가려는 곳을 바라보는 시선", "당기지 않고 밀면서 하는 회전"]
      }
    },
    {
      id: "v-g1-montoir", yt: "X16vL91kFqM",
      source: "FFE", titreSource: "Objectif Galop® 1 : Monter et descendre",
      langueVideo: "fr", cours: ["g1-c19"], galop: 1, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Monter et descendre",
        en: "Mounting and dismounting",
        es: "Montar y desmontar",
        it: "Salire e scendere",
        ja: "乗ると降りる",
        de: "Aufsteigen und Absteigen", ar: "الركوب والنزول", zh: "上马和下马", nl: "Opstappen en afstappen", pt: "Montar e desmontar", sv: "Att sitta upp och av", ru: "Как садиться и спешиваться", pl: "Wsiadanie i zsiadanie", ko: "오르고 내리기"
      },
      resume: {
        fr: "Le montoir, les rênes tenues, le pied qui ne pousse pas dans le flanc, et une descente qui ne surprend personne.",
        en: "The mounting block, reins in hand, a foot that does not dig into the flank, and a dismount that surprises no one.",
        es: "El montador, las riendas en la mano, el pie que no empuja el flanco, y una bajada que no sorprende a nadie.",
        it: "Il montatoio, le redini in mano, il piede che non spinge nel fianco, e una discesa che non sorprende nessuno.",
        ja: "踏台、手継の持ち方、脅を押さない足、そして馬を驚かせない下馬。",
        de: "Die Aufstiegshilfe, die Zügel in der Hand, ein Fuß, der nicht in die Flanke drückt, und ein Absteigen, das niemanden überrascht.", ar: "درج الركوب، واللجام في اليد، والقدم التي لا تضغط على الخاصرة، ونزول لا يفاجئ أحدا.", zh: "上马台、握好缰绳、脚不要顶到马的肋部，还有一次不会让任何人吓一跳的下马。", nl: "De opstapblok, de teugels vast, de voet die niet in de flank duwt, en een afstap waar niemand van schrikt.", pt: "O bloco de montaria, as rédeas seguradas, o pé que não cutuca o flanco e uma desmontada que não surpreende ninguém.", sv: "Uppsittningsblocket, tyglarna i handen, foten som inte trycker i flanken och en avsittning som inte överraskar någon.", ru: "Подставка для посадки, поводья в руках, нога, которая не давит в бок, и спешивание, которое никого не удивит.", pl: "Schodki do wsiadania, wodze w ręku, noga, która nie wbija się w bok, i zsiadanie, które nikogo nie zaskakuje.", ko: "마운팅 블록, 잡은 고삐, 옆구리를 밀지 않는 발, 그리고 누구도 놀라게 하지 않는 내리기를 보여 줘요."
      }
    },
    {
      id: "v-g1-pansage", yt: "UpUmD2Ht4fc",
      source: "FFE", titreSource: "Objectif Galop® 3 : Le pansage",
      langueVideo: "fr", cours: ["g1-c2", "g3-c5"] /* 04/11 : film du Galop 3, relié aussi au cours G3 du pansage */, galop: 1, theme: "soins-et-materiel",
      rang: "approfondir", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Le pansage, geste par geste",
        en: "Grooming, step by step",
        es: "El acicalado, gesto a gesto",
        it: "La pulizia, gesto per gesto",
        ja: "手入れを一つずつ",
        de: "Die Fellpflege, Schritt für Schritt", ar: "العناية بالشعر، حركة بحركة", zh: "刷拭，一步一步来", nl: "Het verzorgen, handeling voor handeling", pt: "A escovação, gesto por gesto", sv: "Ryktning, steg för steg", ru: "Чистка шаг за шагом", pl: "Czyszczenie, krok po kroku", ko: "손질, 동작 하나하나"
      },
      resume: {
        fr: "Film tourné pour le Galop 3, donc il va plus loin que le programme du Galop 1 : l'ordre des brosses y est montré en entier.",
        en: "Filmed for Level 3, so it goes beyond the Level 1 syllabus: the full order of the brushes is shown.",
        es: "Vídeo rodado para el Galop 3, por lo que va más allá del programa del Galop 1: se muestra el orden completo de los cepillos.",
        it: "Girato per il Galoppo 3, quindi va oltre il programma del Galoppo 1: l'ordine delle spazzole è mostrato per intero.",
        ja: "ガロー3向けに撮られたため、ガロー1の範囲を超える。ブラシの順番がすべて示される。",
        de: "Für Galopp 3 gedreht, geht also über das Programm von Galopp 1 hinaus: die Reihenfolge der Bürsten wird vollständig gezeigt.", ar: "صور الفيلم للغالوب 3، لذلك يتجاوز برنامج الغالوب 1: يظهر فيه ترتيب الفرش كاملا.", zh: "这段视频是为 Galop 3 拍摄的，所以内容超出了 Galop 1 的大纲：完整展示了刷子的使用顺序。", nl: "Film gemaakt voor Galop 3, dus hij gaat verder dan het programma van Galop 1: de volgorde van de borstels wordt hier helemaal getoond.", pt: "Filmado para o Galop 3, então vai além do programa do Galop 1: a ordem das escovas é mostrada por inteiro.", sv: "Filmad för Galop 3, så den går längre än programmet för Galop 1: hela ordningen på borstarna visas.", ru: "Снято для Galop 3, поэтому выходит за рамки программы Galop 1: здесь полностью показан порядок щёток.", pl: "Nagrane na Galop 3, więc wykracza poza program Galop 1: pokazana jest pełna kolejność szczotek.", ko: "Galop 3용으로 촬영한 영상이라 Galop 1 과정보다 더 나아가요. 솔 사용 순서를 처음부터 끝까지 보여 줘요."
      }
    },
    {
      id: "v-g1-conduire-pas", yt: "D1VGrsEq030",
      source: "FFE", titreSource: "Objectif Galop\u00ae 1 : Conduire au pas",
      langueVideo: "fr", cours: ["g1-c9", "g1-c5"], galop: 1, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Conduire au pas",
        en: "Steering at the walk",
        es: "Conducir al paso",
        it: "Condurre al passo",
        ja: "\u5e38\u6b69\u3067\u306e\u624b\u7dbf\u64cd\u4f5c",
        de: "Im Schritt lenken", ar: "التوجيه في المشي", zh: "慢步时的控制", nl: "In stap rijden", pt: "Conduzir ao passo", sv: "Att styra i skritt", ru: "Управление на шагу", pl: "Prowadzenie w stępie", ko: "평보로 이끌기"
      },
      resume: {
        fr: "Tourner, s'arrêter, repartir : la première conversation entre la main, la jambe et le cheval.",
        en: "Turning, halting, moving off: the first conversation between hand, leg and horse.",
        es: "Girar, parar, volver a andar: la primera conversaci\u00f3n entre la mano, la pierna y el caballo.",
        it: "Girare, fermarsi, ripartire: la prima conversazione tra mano, gamba e cavallo.",
        ja: "\u66f2\u304c\u308b\u3001\u6b62\u307e\u308b\u3001\u518d\u3073\u9032\u3080\u3002\u624b\u3068\u8107\u3068\u99ac\u306e\u3001\u306f\u3058\u3081\u306e\u4f1a\u8a71\u3002",
        de: "Wenden, halten, antreten: das erste Gespr\u00e4ch zwischen Hand, Bein und Pferd.", ar: "الدوران، والتوقف، والانطلاق من جديد: أول حوار بين اليد والساق والحصان.", zh: "转弯、停下、再出发：手、腿和马之间的第一次对话。", nl: "Draaien, stoppen, weer vertrekken: het eerste gesprek tussen de hand, het been en het paard.", pt: "Virar, parar, partir de novo: a primeira conversa entre a mão, a perna e o cavalo.", sv: "Svänga, stanna, starta igen: det första samtalet mellan hand, ben och häst.", ru: "Повернуть, остановиться, снова тронуться: первый разговор между рукой, ногой и лошадью.", pl: "Skręcać, zatrzymywać się, ruszać: pierwsza rozmowa między ręką, łydką i koniem.", ko: "돌고, 멈추고, 다시 출발하기. 손, 다리, 말 사이의 첫 번째 대화예요."
      },
      observer: {
        fr: ["La main basse et le poignet souple", "Le regard porté dans la direction voulue", "La jambe qui demande avant que la main tourne", "L'arrêt obtenu sans tirer"],
        en: ["Low hand, supple wrist", "Eyes carried in the chosen direction", "The leg asking before the hand turns", "A halt obtained without pulling"],
        es: ["La mano baja y la mu\u00f1eca flexible", "La mirada puesta en la direcci\u00f3n elegida", "La pierna que pide antes de que la mano gire", "La parada obtenida sin tirar"],
        it: ["La mano bassa e il polso morbido", "Lo sguardo nella direzione scelta", "La gamba che chiede prima che la mano giri", "L'arresto ottenuto senza tirare"],
        ja: ["\u4f4e\u3044\u624b\u3068\u67d4\u3089\u304b\u3044\u624b\u9996", "\u884c\u304d\u305f\u3044\u65b9\u5411\u3092\u898b\u308b\u76ee\u7dda", "\u624b\u3092\u4f7f\u3046\u524d\u306b\u8107\u3067\u6c42\u3081\u308b", "\u5f15\u304b\u305a\u306b\u5f97\u308b\u505c\u6b62"],
        de: ["Tiefe Hand, weiches Handgelenk", "Der Blick in die gew\u00e4hlte Richtung", "Das Bein fragt, bevor die Hand wendet", "Das Halten ohne Ziehen"], ar: ["اليد منخفضة والمعصم لين","النظر موجه إلى الاتجاه المطلوب","الساق تطلب قبل أن تدير اليد","التوقف دون شد"], zh: ["低位的手和柔软的手腕", "目光看向想去的方向", "手转动之前，腿先发出要求", "不靠拉扯就让马停下"], nl: ["De lage hand en de soepele pols", "De blik gericht op de gewenste richting", "Het been dat vraagt voordat de hand draait", "De stop zonder te trekken"], pt: ["A mão baixa e o punho flexível", "O olhar na direção desejada", "A perna que pede antes de a mão virar", "Uma parada obtida sem puxar"], sv: ["Låg hand och mjuk handled", "Blicken riktad åt det håll du vill", "Benet som ber innan handen svänger", "Ett stopp utan att dra"], ru: ["Низкая рука и мягкое запястье", "Взгляд направлен в нужную сторону", "Нога просит раньше, чем рука поворачивает", "Остановка без рывка поводом"], pl: ["Niska ręka i miękki nadgarstek", "Wzrok skierowany w wybranym kierunku", "Łydka prosi, zanim ręka skręci", "Zatrzymanie bez ciągnięcia"], ko: ["낮은 손과 부드러운 손목", "가려는 방향을 향한 시선", "손이 돌기 전에 요청하는 다리", "당기지 않고 얻는 정지"]
      }
    },
    {
      id: "v-g1-etriers", yt: "hEylsvCNoAM",
      source: "FFE", titreSource: "Objectif Galop\u00ae 1 : Rester en \u00e9quilibre sur ses \u00e9triers",
      langueVideo: "fr", cours: ["g1-c5"], galop: 1, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "En \u00e9quilibre sur ses \u00e9triers",
        en: "Balanced on the stirrups",
        es: "En equilibrio sobre los estribos",
        it: "In equilibrio sulle staffe",
        ja: "\u9419\u306e\u4e0a\u3067\u306e\u30d0\u30e9\u30f3\u30b9",
        de: "Im Gleichgewicht in den B\u00fcgeln", ar: "التوازن على الركابين", zh: "在马镫上保持平衡", nl: "In balans op je stijgbeugels", pt: "Em equilíbrio nos estribos", sv: "I balans på stigbyglarna", ru: "В равновесии на стременах", pl: "W równowadze na strzemionach", ko: "등자 위에서 균형 잡기"
      },
      resume: {
        fr: "Le talon qui descend, le genou qui plie, et tout le poids qui trouve enfin son chemin jusqu'au pied.",
        en: "Heel down, knee bending, and the whole weight finally finding its way to the foot.",
        es: "El tal\u00f3n que baja, la rodilla que se dobla, y todo el peso que encuentra por fin su camino hasta el pie.",
        it: "Il tallone che scende, il ginocchio che si flette, e tutto il peso che trova finalmente la strada fino al piede.",
        ja: "\u8e75\u3092\u4e0b\u3052\u3001\u819d\u3092\u3086\u308b\u3081\u308b\u3002\u4f53\u91cd\u304c\u3084\u3063\u3068\u8db3\u3078\u3068\u9053\u3092\u898b\u3064\u3051\u308b\u3002",
        de: "Die Ferse tief, das Knie gebeugt, und das ganze Gewicht findet endlich seinen Weg bis in den Fu\u00df.", ar: "الكعب ينزل، والركبة تنثني، والوزن كله يجد أخيرا طريقه إلى القدم.", zh: "脚跟下沉，膝盖弯曲，整个身体的重量终于顺着路径落到脚上。", nl: "De hiel die zakt, de knie die buigt, en al het gewicht dat eindelijk zijn weg naar de voet vindt.", pt: "O calcanhar que desce, o joelho que dobra e todo o peso encontrando, enfim, o caminho até o pé.", sv: "Hälen ner, knät som böjer sig och hela vikten som äntligen hittar vägen ner till foten.", ru: "Пятка вниз, колено сгибается, и весь вес наконец находит свой путь к ступне.", pl: "Pięta w dół, kolano się zgina, a cały ciężar w końcu znajduje drogę do stopy.", ko: "뒤꿈치는 내려가고, 무릎은 굽고, 몸무게 전체가 마침내 발까지 제 길을 찾아요."
      },
      observer: {
        fr: ["Le talon plus bas que la pointe du pied", "Le genou qui absorbe le mouvement", "Le buste qui avance sans s'effondrer", "Les mains qui restent indépendantes de l'équilibre"],
        en: ["Heel lower than the toe", "The knee absorbing the movement", "The upper body coming forward without collapsing", "Hands staying independent of the balance"],
        es: ["El tal\u00f3n m\u00e1s bajo que la punta del pie", "La rodilla que absorbe el movimiento", "El busto que avanza sin hundirse", "Las manos que siguen independientes del equilibrio"],
        it: ["Il tallone pi\u00f9 basso della punta del piede", "Il ginocchio che assorbe il movimento", "Il busto che avanza senza cedere", "Le mani che restano indipendenti dall'equilibrio"],
        ja: ["\u3064\u307e\u5148\u3088\u308a\u4f4e\u3044\u8e75", "\u52d5\u304d\u3092\u5438\u6536\u3059\u308b\u819d", "\u5d29\u308c\u305a\u306b\u524d\u306b\u51fa\u308b\u4e0a\u4f53", "\u30d0\u30e9\u30f3\u30b9\u3068\u5207\u308a\u96e2\u3055\u308c\u305f\u624b"],
        de: ["Die Ferse tiefer als die Fu\u00dfspitze", "Das Knie, das die Bewegung aufnimmt", "Der Oberk\u00f6rper kommt vor, ohne einzusinken", "Die H\u00e4nde bleiben unabh\u00e4ngig vom Gleichgewicht"], ar: ["الكعب أخفض من مقدمة القدم","الركبة تمتص الحركة","الجذع يتقدم دون أن ينهار","اليدان تبقيان مستقلتين عن التوازن"], zh: ["脚跟比脚尖低", "吸收动作的膝盖", "身体前倾却不塌下去", "不受平衡影响、保持独立的双手"], nl: ["De hiel lager dan de teen", "De knie die de beweging opvangt", "Het bovenlichaam dat naar voren gaat zonder in te zakken", "De handen die onafhankelijk blijven van de balans"], pt: ["O calcanhar mais baixo que a ponta do pé", "O joelho que absorve o movimento", "O tronco que avança sem desabar", "As mãos que ficam independentes do equilíbrio"], sv: ["Hälen lägre än tåspetsen", "Knät som tar upp rörelsen", "Överkroppen som lutar framåt utan att kollapsa", "Händerna som förblir oberoende av balansen"], ru: ["Пятка ниже носка", "Колено, которое смягчает движение", "Корпус, который идёт вперёд и не заваливается", "Руки, не зависящие от равновесия"], pl: ["Pięta niżej niż palce stopy", "Kolano amortyzujące ruch", "Tułów, który idzie do przodu bez zapadania się", "Ręce niezależne od równowagi"], ko: ["발끝보다 낮은 뒤꿈치", "움직임을 흡수하는 무릎", "무너지지 않고 앞으로 나아가는 상체", "균형과 상관없이 독립적으로 있는 손"]
      }
    },
    /* --- Galop 4, meme serie FFE. Cinq films sur les sept trouves.
       Ils se rattachent a des chapitres qui existent deja et qui portent deja
       leurs blocs complements : ces videos s'affichent donc en fin de cours
       sans qu'il y ait rien d'autre a construire. Verifies le 06/08/2026 par
       recherche sur les titres exacts releves par Blandine ; durees lues sur
       ses captures. Sept films sur les sept de la serie sont desormais au
       catalogue, sauf le 6e, dont le titre n'apparait sur aucune capture. --- */
    {
      id: "v-g4-assiette", yt: "q8CwpjoeBtk",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : S'\u00e9quilibre assis",
      langueVideo: "fr", cours: ["g4-aides"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "S'\u00e9quilibrer assis",
        en: "Balance in the seat",
        es: "Equilibrarse sentado",
        it: "Equilibrarsi in sella",
        ja: "\u5750\u3063\u3066\u30d0\u30e9\u30f3\u30b9\u3092\u53d6\u308b",
        de: "Im Sitz ins Gleichgewicht kommen", ar: "التوازن في الجلسة", zh: "坐姿中的平衡", nl: "In balans zitten", pt: "Equilíbrio sentado", sv: "Balans i sitsen", ru: "Равновесие в седле", pl: "Równowaga w dosiadzie", ko: "앉아서 균형 잡기"
      },
      resume: {
        fr: "L'assiette n'est pas une position, c'est une aide. Le film montre ce que le bassin dit au cheval quand il cesse de résister.",
        en: "The seat is not a position, it is an aid. The film shows what the pelvis tells the horse once it stops resisting.",
        es: "El asiento no es una posici\u00f3n, es una ayuda. El v\u00eddeo muestra lo que la pelvis dice al caballo cuando deja de resistir.",
        it: "L'assetto non \u00e8 una posizione, \u00e8 un aiuto. Il film mostra cosa dice il bacino al cavallo quando smette di resistere.",
        ja: "\u9a0e\u5750\u306f\u59d3\u52e2\u3067\u306f\u306a\u304f\u6276\u52a9\u3067\u3042\u308b\u3002\u9aa8\u76e4\u304c\u62b5\u6297\u3092\u3084\u3081\u305f\u3068\u304d\u3001\u99ac\u306b\u4f55\u3092\u4f1d\u3048\u308b\u306e\u304b\u3002",
        de: "Der Sitz ist keine Haltung, er ist eine Hilfe. Der Film zeigt, was das Becken dem Pferd sagt, sobald es aufh\u00f6rt zu widerstehen.", ar: "الجلسة ليست وضعية، بل هي مساعدة. يعرض الفيلم ما يقوله الحوض للحصان عندما يتوقف عن المقاومة.", zh: "骑坐不是一个姿势，而是一种扶助。视频展示了骨盆不再抗拒之后，它向马传达了什么。", nl: "De zit is geen houding, het is een hulp. De film laat zien wat het bekken tegen het paard zegt als het ophoudt weerstand te bieden.", pt: "O assento não é uma posição, é uma ajuda. O filme mostra o que a bacia diz ao cavalo quando para de resistir.", sv: "Sitsen är ingen position, den är en hjälp. Filmen visar vad bäckenet säger till hästen när det slutar spänna sig.", ru: "Посадка — это не поза, а помощь. На видео показано, что таз говорит лошади, когда перестаёт сопротивляться.", pl: "Dosiad to nie pozycja, to pomoc. Film pokazuje, co miednica mówi koniowi, gdy przestaje się opierać.", ko: "좌골은 자세가 아니라 부조예요. 골반이 저항을 멈출 때 말에게 무엇을 말해 주는지 영상에서 보여 줘요."
      },
      observer: {
        fr: ["Le bassin qui suit le mouvement sans le forcer", "Les épaules qui restent au-dessus des hanches", "La jambe qui pend au lieu de serrer", "Le moment où le cheval se détend sous l'assiette"],
        en: ["The pelvis following the movement without forcing it", "Shoulders staying above the hips", "The leg hanging instead of gripping", "The moment the horse relaxes under the seat"],
        es: ["La pelvis que sigue el movimiento sin forzarlo", "Los hombros que se mantienen sobre las caderas", "La pierna que cuelga en vez de apretar", "El momento en que el caballo se relaja bajo el asiento"],
        it: ["Il bacino che segue il movimento senza forzarlo", "Le spalle che restano sopra le anche", "La gamba che pende invece di stringere", "Il momento in cui il cavallo si distende sotto l'assetto"],
        ja: ["\u52d5\u304d\u3092\u5f37\u3081\u305a\u306b\u5f93\u3046\u9aa8\u76e4", "\u8170\u306e\u771f\u4e0a\u306b\u3068\u3069\u307e\u308b\u80a9", "\u7de0\u3081\u3064\u3051\u305a\u306b\u5782\u308c\u308b\u8107", "\u9a0e\u5750\u306e\u4e0b\u3067\u99ac\u304c\u7de9\u3080\u77ac\u9593"],
        de: ["Das Becken folgt der Bewegung, ohne sie zu erzwingen", "Die Schultern bleiben \u00fcber den H\u00fcften", "Das Bein h\u00e4ngt, statt zu klemmen", "Der Moment, in dem sich das Pferd unter dem Sitz l\u00f6st"], ar: ["الحوض يتبع الحركة دون أن يفرضها","الكتفان تبقيان فوق الوركين","الساق تتدلى بدل أن تضغط","اللحظة التي يسترخي فيها الحصان تحت الجلسة"], zh: ["跟随动作却不强行带动的骨盆", "始终保持在臀部上方的肩膀", "自然垂下而不是夹紧的腿", "马在骑坐之下放松下来的那一刻"], nl: ["Het bekken dat de beweging volgt zonder haar te forceren", "De schouders die boven de heupen blijven", "Het been dat hangt in plaats van klemt", "Het moment waarop het paard ontspant onder de zit"], pt: ["A bacia que acompanha o movimento sem forçá-lo", "Os ombros que ficam acima dos quadris", "A perna que pende em vez de apertar", "O momento em que o cavalo relaxa sob o assento"], sv: ["Bäckenet som följer rörelsen utan att tvinga den", "Axlarna som stannar ovanför höfterna", "Benet som hänger i stället för att klämma", "Ögonblicket då hästen slappnar av under sitsen"], ru: ["Таз, который следует за движением и не навязывает его", "Плечи, которые остаются над бёдрами", "Нога, которая свободно висит, а не сжимает", "Момент, когда лошадь расслабляется под посадкой"], pl: ["Miednica podążająca za ruchem bez forsowania go", "Ramiona nad biodrami", "Łydka, która zwisa zamiast ściskać", "Moment, w którym koń rozluźnia się pod dosiadem"], ko: ["억지로 하지 않고 움직임을 따라가는 골반", "엉덩이 위에 그대로 있는 어깨", "조이지 않고 늘어뜨린 다리", "말이 좌골 아래에서 긴장을 푸는 순간"]
      }
    },
    {
      id: "v-g4-reprise", yt: "WHJscXoC9sM",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : Reprise de dressage type Galop\u00ae 4",
      langueVideo: "fr", cours: ["g4-transitions", "g4-incurvation"], galop: 4, theme: "dressage",
      rang: "approfondir", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Une reprise de dressage",
        en: "A dressage test",
        es: "Una reprise de doma",
        it: "Una ripresa di dressage",
        ja: "\u99ac\u5834\u99ac\u8853\u306e\u6f14\u76ee",
        de: "Eine Dressuraufgabe", ar: "عرض ترويض", zh: "一套盛装舞步套路", nl: "Een dressuurproef", pt: "Uma reprise de adestramento", sv: "Ett dressyrprogram", ru: "Программа выездки", pl: "Program ujeżdżeniowy", ko: "마장마술 프로그램"
      },
      resume: {
        fr: "La reprise attendue au Galop 4, montée en entier. Tout ce que les chapitres expliquent séparément, enchaîné sans coupure.",
        en: "The test expected at Level 4, ridden in full. Everything the chapters explain separately, linked without a break.",
        es: "La reprise esperada en el Galop 4, montada por completo. Todo lo que los cap\u00edtulos explican por separado, encadenado sin cortes.",
        it: "La ripresa richiesta al Galoppo 4, montata per intero. Tutto ci\u00f2 che i capitoli spiegano separatamente, legato senza interruzioni.",
        ja: "\u30ac\u30ed\u30fc4\u3067\u6c42\u3081\u3089\u308c\u308b\u6f14\u76ee\u3092\u901a\u3057\u3067\u3002\u5404\u7ae0\u304c\u5225\u3005\u306b\u8aac\u304f\u3053\u3068\u304c\u3001\u5207\u308c\u76ee\u306a\u304f\u7d9a\u304f\u3002",
        de: "Die bei Galopp 4 erwartete Aufgabe, komplett geritten. Alles, was die Kapitel einzeln erkl\u00e4ren, ohne Unterbrechung verkn\u00fcpft.", ar: "العرض المطلوب في الغالوب 4، مؤدى كاملا. كل ما تشرحه الفصول منفصلا، متسلسلا دون انقطاع.", zh: "Galop 4 要求的舞步套路，完整骑下来。各章节分别讲解的内容，在这里连贯地串在一起，不间断。", nl: "De proef die bij Galop 4 verwacht wordt, helemaal gereden. Alles wat de hoofdstukken afzonderlijk uitleggen, aaneengeschakeld zonder onderbreking.", pt: "A reprise esperada no Galop 4, montada por inteiro. Tudo o que os capítulos explicam separadamente, encadeado sem cortes.", sv: "Programmet som krävs i Galop 4, ridet i sin helhet. Allt som kapitlen förklarar var för sig, sammanlänkat utan avbrott.", ru: "Программа Galop 4, показанная целиком. Всё, что главы объясняют по отдельности, — без единого перерыва.", pl: "Program wymagany na Galop 4, przejechany w całości. Wszystko, co rozdziały tłumaczą osobno, połączone bez przerw.", ko: "Galop 4에서 요구하는 프로그램을 처음부터 끝까지 타요. 챕터에서 따로 설명한 모든 것이 끊김 없이 이어져요."
      }
    },
    {
      id: "v-g4-contact-ffe", yt: "NjQnoMUWVRM",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : Le contact",
      langueVideo: "fr", cours: ["g4-contact"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Le contact, en pratique",
        en: "Contact, in practice",
        es: "El contacto, en la pr\u00e1ctica",
        it: "Il contatto, in pratica",
        ja: "\u5b9f\u8df5\u3068\u3057\u3066\u306e\u30b3\u30f3\u30bf\u30af\u30c8",
        de: "Anlehnung in der Praxis", ar: "الاتصال، عمليا", zh: "接触的实际应用", nl: "Het contact, in de praktijk", pt: "O contato, na prática", sv: "Kontakt i praktiken", ru: "Контакт на практике", pl: "Kontakt w praktyce", ko: "실전에서의 접촉"
      },
      resume: {
        fr: "Après les trois interventions IFCE sur la théorie du contact, voici le même sujet monté, filmé, en trois minutes.",
        en: "After the three IFCE talks on the theory of contact, here is the same subject ridden, filmed, in three minutes.",
        es: "Despu\u00e9s de las tres intervenciones del IFCE sobre la teor\u00eda del contacto, aqu\u00ed est\u00e1 el mismo tema montado, filmado, en tres minutos.",
        it: "Dopo i tre interventi IFCE sulla teoria del contatto, ecco lo stesso tema a cavallo, filmato, in tre minuti.",
        ja: "\u30b3\u30f3\u30bf\u30af\u30c8\u306e\u7406\u8ad6\u3092\u8a9e\u308bIFCE\u306e\u4e09\u3064\u306e\u8b1b\u6f14\u306e\u3042\u3068\u306b\u3001\u540c\u3058\u4e3b\u984c\u3092\u99ac\u4e0a\u3067\u3001\u4e09\u5206\u3067\u3002",
        de: "Nach den drei IFCE-Beitr\u00e4gen zur Theorie der Anlehnung hier dasselbe Thema geritten, gefilmt, in drei Minuten.", ar: "بعد مداخلات IFCE الثلاث حول نظرية الاتصال، إليك الموضوع نفسه على ظهر الحصان، مصورا، في ثلاث دقائق.", zh: "在三场 IFCE 关于接触理论的讲座之后，这里是同一个主题的骑乘实拍，三分钟。", nl: "Na de drie lezingen van het IFCE over de theorie van het contact volgt hier hetzelfde onderwerp gereden en gefilmd, in drie minuten.", pt: "Depois das três palestras do IFCE sobre a teoria do contato, aqui está o mesmo assunto montado, filmado, em três minutos.", sv: "Efter de tre föredragen från IFCE om kontaktens teori kommer här samma ämne ridet och filmat, på tre minuter.", ru: "После трёх выступлений IFCE о теории контакта — та же тема верхом, на видео, за три минуты.", pl: "Po trzech wystąpieniach IFCE o teorii kontaktu — ten sam temat pod siodłem, nagrany w trzy minuty.", ko: "접촉 이론에 대한 IFCE의 세 가지 강연에 이어, 같은 주제를 직접 타고 촬영한 3분 영상이에요."
      }
    },
    {
      id: "v-g4-hanches", yt: "CtjUbHS9q9A",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : D\u00e9placer les hanches du cheval",
      langueVideo: "fr", cours: ["g4-epaules-hanches"], galop: 4, theme: "dressage",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "D\u00e9placer les hanches",
        en: "Moving the haunches",
        es: "Desplazar las ancas",
        it: "Spostare le anche",
        ja: "\u8170\u3092\u52d5\u304b\u3059",
        de: "Die Hanken versetzen", ar: "تحريك الوركين", zh: "移动后躯", nl: "De achterhand verplaatsen", pt: "Deslocar as ancas", sv: "Flytta bakdelen", ru: "Смещение крупа", pl: "Przesuwanie zadu", ko: "엉덩이 움직이기"
      },
      resume: {
        fr: "La jambe reculée demande, la main accompagne, et l'arrière-main se déplace d'un pas. Pas deux.",
        en: "The leg drawn back asks, the hand follows, and the hindquarters move over by one step. Not two.",
        es: "La pierna atrasada pide, la mano acompa\u00f1a, y los cuartos traseros se desplazan un paso. No dos.",
        it: "La gamba arretrata chiede, la mano accompagna, e le anche si spostano di un passo. Non due.",
        ja: "\u5f8c\u308d\u306b\u5f15\u3044\u305f\u8107\u3067\u6c42\u3081\u3001\u624b\u304c\u5bfe\u5fdc\u3057\u3001\u5f8c\u80a2\u304c\u4e00\u6b69\u52d5\u304f\u3002\u4e8c\u6b69\u3067\u306f\u306a\u3044\u3002",
        de: "Das zur\u00fcckgenommene Bein fragt, die Hand begleitet, und die Hinterhand tritt einen Schritt zur Seite. Nicht zwei.", ar: "الساق المرجعة إلى الخلف تطلب، واليد ترافق، والمؤخرة تتحرك خطوة واحدة. لا خطوتين.", zh: "后撤的腿发出要求，手随之配合，后躯移动一步。只是一步，不是两步。", nl: "Het teruggeplaatste been vraagt, de hand gaat mee, en de achterhand verplaatst zich één stap. Niet twee.", pt: "A perna recuada pede, a mão acompanha e a garupa se desloca um passo. Não dois.", sv: "Det tillbakaflyttade benet ber, handen följer med och bakdelen flyttar sig ett steg. Inte två.", ru: "Отодвинутая назад нога просит, рука следует, и круп сдвигается на один шаг. Не на два.", pl: "Cofnięta łydka prosi, ręka podąża, a zad przesuwa się o jeden krok. Nie dwa.", ko: "뒤로 뺀 다리가 요청하고, 손은 따라가고, 후구가 한 걸음 옮겨 가요. 두 걸음이 아니에요."
      }
    },
    {
      id: "v-g4-epaules", yt: "3ewp5jGh2Mc",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : D\u00e9placer les \u00e9paules du cheval",
      langueVideo: "fr", cours: ["g4-epaules-hanches"], galop: 4, theme: "dressage",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "D\u00e9placer les \u00e9paules",
        en: "Moving the shoulders",
        es: "Desplazar los hombros",
        it: "Spostare le spalle",
        ja: "\u80a9\u3092\u52d5\u304b\u3059",
        de: "Die Schultern versetzen", ar: "تحريك الكتفين", zh: "移动肩膀", nl: "De schouders verplaatsen", pt: "Deslocar os ombros", sv: "Flytta skuldrorna", ru: "Смещать плечи", pl: "Przesuwanie łopatek", ko: "어깨 움직이기"
      },
      resume: {
        fr: "Le pendant du précédent, par l'avant-main. Regarder les deux à la suite rend la différence évidente.",
        en: "The counterpart of the previous film, through the forehand. Watching both in a row makes the difference obvious.",
        es: "La contraparte del anterior, por el tercio delantero. Verlos seguidos hace la diferencia evidente.",
        it: "Il corrispondente del precedente, dall'avantreno. Guardarli di seguito rende la differenza evidente.",
        ja: "\u524d\u306e\u4f5c\u54c1\u306e\u5bfe\u3092\u306a\u3059\u3001\u524d\u80a2\u304b\u3089\u306e\u8a71\u3002\u7d9a\u3051\u3066\u898b\u308b\u3068\u9055\u3044\u304c\u306f\u3063\u304d\u308a\u3059\u308b\u3002",
        de: "Das Gegenst\u00fcck zum vorigen Film, \u00fcber die Vorhand. Beide hintereinander gesehen, wird der Unterschied offensichtlich.", ar: "المقابل للفيلم السابق، عبر المقدمة. مشاهدة الفيلمين متتاليين تجعل الفرق واضحا.", zh: "上一个视频的对照，从前躯入手。连续看这两个视频，差别一目了然。", nl: "Het tegenovergestelde van de vorige, via de voorhand. Beide na elkaar bekijken maakt het verschil duidelijk.", pt: "O par do filme anterior, pelo anterior do cavalo. Assistir aos dois em sequência deixa a diferença evidente.", sv: "Motstycket till den förra filmen, via framdelen. Att se båda efter varandra gör skillnaden tydlig.", ru: "Пара к предыдущему видео, но через переднюю часть. Если посмотреть оба подряд, разница становится очевидной.", pl: "Odpowiednik poprzedniego filmu, tym razem przez przód. Obejrzenie obu po kolei wyraźnie pokazuje różnicę.", ko: "앞의 동작과 짝을 이루는 동작으로, 전구로 해요. 두 영상을 이어서 보면 차이가 분명해져요."
      }
    },
    {
      id: "v-g4-premier-parcours", yt: "VSyUiMEVoE4",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : Premier parcours",
      langueVideo: "fr", cours: ["g4-obstacles-equilibre"], galop: 4, theme: "obstacle",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Le premier parcours",
        en: "The first course",
        es: "El primer recorrido",
        it: "Il primo percorso",
        ja: "\u306f\u3058\u3081\u3066\u306e\u30b3\u30fc\u30b9",
        de: "Der erste Parcours", ar: "المسار الأول", zh: "第一次跑场地", nl: "Je eerste parcours", pt: "O primeiro percurso", sv: "Den första banan", ru: "Первая трасса", pl: "Pierwszy parkur", ko: "첫 코스"
      },
      resume: {
        fr: "Reconnaître, compter ses foulées, garder le même galop du premier au dernier obstacle.",
        en: "Walking the course, counting strides, keeping the same canter from the first fence to the last.",
        es: "Reconocer el recorrido, contar las zancadas, mantener el mismo galope del primer al \u00faltimo obst\u00e1culo.",
        it: "Ricognizione, conteggio delle falcate, e lo stesso galoppo dal primo all'ultimo ostacolo.",
        ja: "\u30b3\u30fc\u30b9\u3092\u4e0b\u898b\u3057\u3001\u6b69\u6570\u3092\u6570\u3048\u3001\u6700\u521d\u304b\u3089\u6700\u5f8c\u306e\u969c\u5bb3\u307e\u3067\u540c\u3058\u99c8\u6b69\u3092\u4fdd\u3064\u3002",
        de: "Den Parcours abgehen, Galoppspr\u00fcnge z\u00e4hlen, denselben Galopp vom ersten bis zum letzten Sprung halten.", ar: "استطلاع المسار، وعد الخطوات، والحفاظ على العدو نفسه من أول حاجز إلى آخر حاجز.", zh: "勘察路线、数步数，从第一个障碍到最后一个障碍都保持同样的跑步。", nl: "Verkennen, je galopsprongen tellen, dezelfde galop houden van de eerste tot de laatste hindernis.", pt: "Reconhecer o percurso, contar as passadas, manter o mesmo galope do primeiro ao último obstáculo.", sv: "Gå banan, räkna galoppsprång och behålla samma galopp från första till sista hindret.", ru: "Осмотреть трассу, считать конские шаги, сохранять один и тот же галоп от первого препятствия до последнего.", pl: "Obejść parkur, liczyć wykroki, utrzymać ten sam galop od pierwszej do ostatniej przeszkody.", ko: "코스를 알아보고, 보폭 수를 세고, 첫 장애물부터 마지막까지 같은 구보를 유지해요."
      }
    },
    {
      id: "v-g4-exterieur", yt: "1X3oBNAlypM",
      source: "FFE", titreSource: "Objectif Galop\u00ae 4 : Circuler en ext\u00e9rieur",
      langueVideo: "fr", cours: ["g4-exterieur"], galop: 4, theme: "securite",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Circuler en ext\u00e9rieur",
        en: "Riding out",
        es: "Circular en exterior",
        it: "Uscire in esterno",
        ja: "\u5916\u4e57\u3067\u306e\u884c\u52d5",
        de: "Im Gel\u00e4nde unterwegs", ar: "الركوب في الخارج", zh: "户外骑行", nl: "Buiten rijden", pt: "Passear fora do picadeiro", sv: "Att rida ute i terrängen", ru: "Выезд на прогулку", pl: "Jazda w terenie", ko: "야외에서 이동하기"
      },
      resume: {
        fr: "Le groupe, les distances, la route, et ce qu'on fait quand un cheval derrière n'est plus d'accord.",
        en: "The group, the distances, the road, and what to do when a horse behind stops agreeing.",
        es: "El grupo, las distancias, la carretera, y qu\u00e9 hacer cuando un caballo de atr\u00e1s deja de estar de acuerdo.",
        it: "Il gruppo, le distanze, la strada, e cosa fare quando un cavallo dietro non \u00e8 pi\u00f9 d'accordo.",
        ja: "\u96c6\u56e3\u3001\u8eca\u9593\u8ddd\u96e2\u3001\u8def\u4e0a\u3001\u305d\u3057\u3066\u5f8c\u308d\u306e\u99ac\u304c\u7d0d\u5f97\u3057\u306a\u304f\u306a\u3063\u305f\u3068\u304d\u306e\u5bfe\u5fdc\u3002",
        de: "Die Gruppe, die Abst\u00e4nde, die Stra\u00dfe, und was man tut, wenn ein Pferd hinten nicht mehr einverstanden ist.", ar: "المجموعة، والمسافات، والطريق، وما نفعله عندما لا يعود حصان في الخلف موافقا.", zh: "队伍、间距、马路，以及后面的马不愿意配合时该怎么办。", nl: "De groep, de afstanden, de weg, en wat je doet als een paard achteraan niet meer meewerkt.", pt: "O grupo, as distâncias, a estrada e o que fazer quando um cavalo atrás deixa de concordar.", sv: "Gruppen, avstånden, vägen och vad du gör när en häst bakom inte längre är med på noterna.", ru: "Группа, дистанции, дорога и что делать, когда лошадь сзади перестаёт слушаться.", pl: "Grupa, odległości, droga i co robić, gdy koń z tyłu przestaje się zgadzać.", ko: "무리, 간격, 도로, 그리고 뒤에 있는 말이 더 이상 따라오지 않을 때 어떻게 하는지 알려 줘요."
      }
    },
    /* --- Galop 2, meme serie FFE. Deux films trouves sur les sept annonces.
       Verifies par Blandine le 06/08/2026 : les deux repondent. Durees lues
       sur ses captures : 3 min 52 pour les premiers sauts, 3 min 40 pour le
       parcours type, d'ou dureeTranche "moyen" pour les deux. --- */
    {
      id: "v-g2-premiers-sauts", yt: "MfzFo_IeSa8",
      source: "FFE", titreSource: "Objectif Galop\u00ae 2 : Premiers sauts",
      langueVideo: "fr", cours: ["g2-c4"], galop: 2, theme: "obstacle",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Les premiers sauts",
        en: "First jumps",
        es: "Los primeros saltos",
        it: "I primi salti",
        ja: "\u306f\u3058\u3081\u306e\u8df3\u8e8d",
        de: "Die ersten Spr\u00fcnge", ar: "القفزات الأولى", zh: "第一次跳跃", nl: "De eerste sprongen", pt: "Os primeiros saltos", sv: "De första hoppen", ru: "Первые прыжки", pl: "Pierwsze skoki", ko: "첫 점프"
      },
      resume: {
        fr: "Franchir un premier obstacle sans rien brusquer : l'abord, l'équilibre sur les étriers, et le regard qui passe par-dessus.",
        en: "Taking a first fence without rushing anything: the approach, balance on the stirrups, and eyes looking beyond.",
        es: "Franquear un primer obst\u00e1culo sin brusquedad: la aproximaci\u00f3n, el equilibrio sobre los estribos y la mirada m\u00e1s all\u00e1.",
        it: "Superare il primo ostacolo senza forzare nulla: l'avvicinamento, l'equilibrio sulle staffe e lo sguardo oltre.",
        ja: "\u7121\u7406\u306e\u306a\u3044\u521d\u3081\u3066\u306e\u8df3\u8e8d\u3002\u30a2\u30d7\u30ed\u30fc\u30c1\u3001\u9419\u306e\u4e0a\u3067\u306e\u30d0\u30e9\u30f3\u30b9\u3001\u305d\u3057\u3066\u5148\u3092\u898b\u308b\u76ee\u7dda\u3002",
        de: "Ein erstes Hindernis ohne Hast \u00fcberwinden: das Heranreiten, das Gleichgewicht in den B\u00fcgeln und der Blick dar\u00fcber hinaus.", ar: "اجتياز أول حاجز دون تسرع: الاقتراب، والتوازن على الركابين، والنظر الذي يتجاوز الحاجز.", zh: "不慌不忙地跨过第一个障碍：接近、马镫上的平衡，还有越过障碍向前看的目光。", nl: "Een eerste hindernis nemen zonder iets te forceren: de nadering, de balans op de stijgbeugels en de blik die erover heen gaat.", pt: "Transpor um primeiro obstáculo sem atropelar nada: a aproximação, o equilíbrio nos estribos e o olhar que passa por cima.", sv: "Att ta ett första hinder utan att forcera något: framridningen, balansen på stigbyglarna och blicken som ser bortom hindret.", ru: "Преодолеть первое препятствие, ничего не торопя: подход, равновесие на стременах и взгляд, устремлённый поверх.", pl: "Pokonać pierwszą przeszkodę, niczego nie przyspieszając: dojazd, równowaga na strzemionach i wzrok patrzący ponad przeszkodę.", ko: "서두르지 않고 첫 장애물 넘기. 접근, 등자 위 균형, 그리고 장애물 너머로 향하는 시선을 다뤄요."
      }
    },
    {
      id: "v-g2-parcours", yt: "fYEuHOQ-WE0",
      source: "FFE", titreSource: "Objectif Galop\u00ae 2 : Parcours type Galop\u00ae 2",
      langueVideo: "fr", cours: ["g2-c4", "g2-c3"], galop: 2, theme: "obstacle",
      rang: "approfondir", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Un parcours type",
        en: "A model course",
        es: "Un recorrido tipo",
        it: "Un percorso tipo",
        ja: "\u6a19\u6e96\u7684\u306a\u30b3\u30fc\u30b9",
        de: "Ein Musterparcours", ar: "مسار نموذجي", zh: "一条标准路线", nl: "Een typisch parcours", pt: "Um percurso modelo", sv: "En typbana", ru: "Образцовая трасса", pl: "Przykładowy parkur", ko: "전형적인 코스"
      },
      resume: {
        fr: "A quoi ressemble le parcours attendu au Galop 2, du premier tracé au dernier arrêt.",
        en: "What the Level 2 course actually looks like, from the first line to the final halt.",
        es: "C\u00f3mo es el recorrido esperado en el Galop 2, del primer trazado a la \u00faltima parada.",
        it: "Com'\u00e8 fatto il percorso richiesto al Galoppo 2, dal primo tracciato all'ultimo arresto.",
        ja: "\u30ac\u30ed\u30fc2\u3067\u6c42\u3081\u3089\u308c\u308b\u30b3\u30fc\u30b9\u306e\u5168\u4f53\u50cf\u3002\u6700\u521d\u306e\u30e9\u30a4\u30f3\u304b\u3089\u6700\u5f8c\u306e\u505c\u6b62\u307e\u3067\u3002",
        de: "Wie der beim Galopp 2 erwartete Parcours aussieht, von der ersten Linie bis zum letzten Halten.", ar: "كيف يبدو المسار المطلوب في الغالوب 2، من أول خط إلى آخر توقف.", zh: "Galop 2 要求的路线实际是什么样子，从第一条路线到最后的停止。", nl: "Hoe het parcours eruitziet dat bij Galop 2 verwacht wordt, van de eerste lijn tot de laatste stop.", pt: "Como é o percurso esperado no Galop 2, do primeiro traçado até a última parada.", sv: "Hur banan som krävs i Galop 2 ser ut, från första linjen till sista stoppet.", ru: "Как выглядит трасса, которую ждут на Galop 2, от первого рисунка до последней остановки.", pl: "Jak wygląda parkur wymagany na Galop 2, od pierwszej linii do ostatniego zatrzymania.", ko: "Galop 2에서 요구하는 코스가 첫 경로부터 마지막 정지까지 어떻게 이루어지는지 보여 줘요."
      }
    },
    /* ============================================================
       04/11/2026 · AJOUTS GALOPS 3, 5, 6, 7 (sélection de Blandine, liens trouvés par ChatGPT).
       verifie VIDE + aVerifier : invisibles pour les cavaliers (règle du 06/08 : aucun lien
       affiché sans avoir été ouvert), visibles par les seules modératrices avec la mention
       « À vérifier », pour être testés sur iPhone. Quand Blandine confirme qu'une vidéo se lit
       dans Hype, on inscrit la date dans verifie et elle devient publique.
       Pas de durée ni de points à observer : non vérifiés (règle : rien d'inventé).
       ============================================================ */
    {
      id: "v-g3-bien-etre", yt: "h9CO45RNXFY", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Veiller au bien-être de son cheval",
      langueVideo: "fr", cours: ["g3-c6", "g3-c9"], galop: 3, theme: "comprendre-le-cheval",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Veiller au bien-être de son cheval", "en": "Looking after your horse's welfare", "es": "Velar por el bienestar de tu caballo", "it": "Prendersi cura del benessere del proprio cavallo", "ja": "馬のウェルフェアに気を配る", "de": "Auf das Wohlergehen deines Pferdes achten", "ar": "السهر على راحة حصانك", "zh": "关注马匹的福利", "nl": "Zorgen voor het welzijn van je paard", "pt": "Cuidar do bem-estar do seu cavalo", "sv": "Se till din hästs välbefinnande", "ru": "Забота о благополучии лошади", "pl": "Dbanie o dobrostan konia", "ko": "말의 복지 챙기기"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g3-figures", yt: "5Yn62KEXgdE", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Les figures de manège",
      langueVideo: "fr", cours: ["g3-c15", "g3-c14"], galop: 3, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Les figures de manège", "en": "Arena figures", "es": "Las figuras de picadero", "it": "Le figure di maneggio", "ja": "馬場の図形運動", "de": "Hufschlagfiguren", "ar": "أشكال الحلبة", "zh": "场地图形", "nl": "Rijbaanfiguren", "pt": "As figuras de picadeiro", "sv": "Ridbanefigurer", "ru": "Фигуры манежной езды", "pl": "Figury na ujeżdżalni", "ko": "마장 도형"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g3-equilibre", yt: "FVdJQ01aq8I", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Varier son équilibre",
      langueVideo: "fr", cours: ["g3-c12", "g3-c1"], galop: 3, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Varier son équilibre", "en": "Varying your balance", "es": "Variar tu equilibrio", "it": "Variare il proprio equilibrio", "ja": "バランスを切り替える", "de": "Das Gleichgewicht variieren", "ar": "تنويع توازنك", "zh": "改变你的平衡", "nl": "Je evenwicht variëren", "pt": "Variar seu equilíbrio", "sv": "Variera din balans", "ru": "Менять своё равновесие", "pl": "Zmieniać swoją równowagę", "ko": "균형 바꾸기"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g3-galop", yt: "pheF-U0ZR30", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Partir au galop",
      langueVideo: "fr", cours: ["g3-c2"], galop: 3, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Partir au galop", "en": "Striking off into canter", "es": "Salir al galope", "it": "Partire al galoppo", "ja": "駈歩発進", "de": "Angaloppieren", "ar": "الانطلاق في الغالوب", "zh": "起跑跑步", "nl": "Aangaloperen", "pt": "Partir a galope", "sv": "Fatta galopp", "ru": "Подъём в галоп", "pl": "Zagalopowanie", "ko": "구보 출발"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g3-cavaletti", yt: "qd5aCsg-nYw", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Sauter des lignes de cavaletti",
      langueVideo: "fr", cours: ["g3-c3", "g3-saut"], galop: 3, theme: "obstacle",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Sauter des lignes de cavaletti", "en": "Jumping cavaletti lines", "es": "Saltar líneas de cavaletti", "it": "Saltare linee di cavalletti", "ja": "キャバレッティの列を跳ぶ", "de": "Cavaletti-Reihen springen", "ar": "قفز صفوف الكافاليتي", "zh": "跳横木组合", "nl": "Cavaletti-lijnen springen", "pt": "Saltar linhas de cavaletti", "sv": "Hoppa cavalettiserier", "ru": "Прыжки через линии кавалетти", "pl": "Skoki przez szeregi cavaletti", "ko": "카발레티 라인 넘기"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g3-terrain", yt: "t94pK-H8F3U", aVerifier: true,
      source: "FFE", titreSource: "Objectif Galop® 3 : Adapter son équilibre en terrain varié",
      langueVideo: "fr", cours: ["g3-c12"] /* 04/11 10h36 : Blandine « je te laisse gérer » — l'assiette et l'équilibre */, galop: 3, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Adapter son équilibre en terrain varié", "en": "Adapting your balance on varied terrain", "es": "Adaptar tu equilibrio en terreno variado", "it": "Adattare l'equilibrio su terreno vario", "ja": "変化のある地形でバランスを合わせる", "de": "Das Gleichgewicht im Gelände anpassen", "ar": "تكييف توازنك في أرض متنوعة", "zh": "在多变地形中调整平衡", "nl": "Je evenwicht aanpassen op wisselend terrein", "pt": "Adaptar seu equilíbrio em terreno variado", "sv": "Anpassa balansen i varierad terräng", "ru": "Равновесие на пересечённой местности", "pl": "Dostosowanie równowagi w zróżnicowanym terenie", "ko": "다양한 지형에서 균형 맞추기"},
      resume: {"fr": "Film officiel de la FFE, série « Objectif Galop® 3 ».", "en": "Official FFE film from the “Objectif Galop® 3” series.", "es": "Película oficial de la FFE, serie «Objectif Galop® 3».", "it": "Filmato ufficiale della FFE, serie «Objectif Galop® 3».", "ja": "FFE公式映像「Objectif Galop® 3」シリーズ。", "de": "Offizieller FFE-Film aus der Reihe „Objectif Galop® 3“.", "ar": "فيلم رسمي من الاتحاد الفرنسي للفروسية، سلسلة «Objectif Galop® 3».", "zh": "法国马术协会官方影片，“Objectif Galop® 3”系列。", "nl": "Officiële FFE-film uit de reeks ‘Objectif Galop® 3’.", "pt": "Filme oficial da FFE, série «Objectif Galop® 3».", "sv": "Officiell FFE-film i serien ”Objectif Galop® 3”.", "ru": "Официальный фильм FFE из серии «Objectif Galop® 3».", "pl": "Oficjalny film FFE z serii „Objectif Galop® 3”.", "ko": "FFE 공식 영상, ‘Objectif Galop® 3’ 시리즈."}
    },
    {
      id: "v-g5-cession", yt: "9mzHJxCgtx0", aVerifier: true,
      source: "IFCE", intervenant: "Benoît Pierre", intervenantRole: {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, titreSource: "Les déplacements latéraux, la cession à la jambe au pas", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/les-deplacements-lateraux-la-cession-a-la-jambe-au-pas/",
      langueVideo: "fr", cours: ["g5n-10", "g6n-11"] /* 04/11 14h05 : + préparation de la cession au trot G6 */, galop: 5, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "La cession à la jambe au pas", "en": "Leg-yielding at the walk", "es": "La cesión a la pierna al paso", "it": "La cessione alla gamba al passo", "ja": "常歩での脚への譲歩", "de": "Schenkelweichen im Schritt", "ar": "التنحي للساق في الخطوة", "zh": "慢步中的让腿", "nl": "Wijken voor de kuit in stap", "pt": "A cessão à perna ao passo", "sv": "Skänkelvikning i skritt", "ru": "Уступка шенкелю шагом", "pl": "Ustępowanie od łydki w stępie", "ko": "평보에서 다리 양보"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    {
      id: "v-g6-cercle", yt: "o5PTQOFSpOE", aVerifier: true,
      source: "IFCE", intervenant: "Patrick Galloux", intervenantRole: {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, titreSource: "Les aides du cercle", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/les-aides-du-cercle/",
      langueVideo: "fr", cours: ["g6n-01", "g5n-09"] /* 04/11 14h05 : + incurvation G5 */, galop: 6, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Les aides du cercle", "en": "The aids for a circle", "es": "Las ayudas del círculo", "it": "Gli aiuti del circolo", "ja": "輪乗りの扶助", "de": "Die Hilfen auf dem Zirkel", "ar": "مساعدات الدائرة", "zh": "圈乘的扶助", "nl": "De hulpen voor de volte", "pt": "As ajudas do círculo", "sv": "Hjälperna på volten", "ru": "Средства управления на вольте", "pl": "Pomoce na kole", "ko": "원 그리기의 보조"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    {
      id: "v-g6-allures", yt: "MBJEoKIJPNM", aVerifier: true,
      source: "IFCE", intervenant: "Bernard Maurel", intervenantRole: { fr: "Juge international de dressage", en: "International dressage judge", es: "Juez internacional de doma", it: "Giudice internazionale di dressage", ja: "国際馬場馬術審判員", de: "Internationaler Dressurrichter", ar: "حكم دولي في الترويض", zh: "国际盛装舞步裁判", nl: "Internationaal dressuurjury", pt: "Juiz internacional de adestramento", sv: "Internationell dressyrdomare", ru: "Международный судья по выездке", pl: "Międzynarodowy sędzia ujeżdżenia", ko: "국제 마장마술 심판" }, titreSource: "Suivre le rythme des allures : exercices sur le plat", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/suivre-le-rythme-des-allures-exercices-sur-le-plat/",
      langueVideo: "fr", cours: ["g6n-09"] /* 04/11 10h36 : L'impulsion (rythme, cadence) */, galop: 6, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Suivre le rythme des allures", "en": "Following the rhythm of the gaits", "es": "Seguir el ritmo de los aires", "it": "Seguire il ritmo delle andature", "ja": "歩様のリズムについていく", "de": "Dem Rhythmus der Gangarten folgen", "ar": "مجاراة إيقاع المشيات", "zh": "跟随步法的节奏", "nl": "Het ritme van de gangen volgen", "pt": "Acompanhar o ritmo dos andamentos", "sv": "Följa gångarternas rytm", "ru": "Следовать ритму аллюров", "pl": "Podążać za rytmem chodów", "ko": "보법의 리듬 따라가기"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    {
      id: "v-g7-foulees", yt: "6pi4Kxil06Q", aVerifier: true,
      source: "IFCE", intervenant: "Nicolas Perez", intervenantRole: {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, titreSource: "Adapter l'amplitude des foulées à l'enchaînement des sauts", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/adapter-l-amplitude-des-foulees-a-l-enchainement-des-sauts/",
      langueVideo: "fr", cours: ["g7n-14"], galop: 7, theme: "obstacle",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Adapter l'amplitude des foulées", "en": "Adjusting stride length", "es": "Adaptar la amplitud de los trancos", "it": "Adattare l'ampiezza delle falcate", "ja": "完歩の幅を調整する", "de": "Die Galoppsprünge anpassen", "ar": "تكييف طول الخطوات", "zh": "调整步幅", "nl": "De paslengte aanpassen", "pt": "Adaptar a amplitude das passadas", "sv": "Anpassa språngens längd", "ru": "Регулировать длину темпа", "pl": "Dostosowanie długości fule", "ko": "보폭 조절하기"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    /* 04/11 10h14 (Blandine : « garde-les quand même et ajoute-les déjà à la liste de vidéos des G8 et 9 ») :
       webconférences IFCE avancées, rangées en Galop 8 et 9 (onglet « Galop 7+ ») ; pas de cours relié (les
       Galops 8 et 9 n'ont pas encore de cours dans Hype). Même règle « À vérifier » que les autres. */
    {
      id: "v-g8-appuyer", yt: "VcmDrm0tX_M", aVerifier: true,
      source: "IFCE", intervenant: "Pauline Van Landeghem", intervenantRole: {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, titreSource: "L'appuyer", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/l-appuyer/",
      langueVideo: "fr", cours: [], galop: 8, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "L'appuyer", "en": "Half-pass", "es": "El apoyo", "it": "L'appoggiata", "ja": "ハーフパス", "de": "Die Traversale", "ar": "الأبويه (المشي الجانبي المائل)", "zh": "斜横步", "nl": "De appuyement", "pt": "O apoiar", "sv": "Travers på diagonal (appuyer)", "ru": "Принимание", "pl": "Ciąg", "ko": "하프 패스"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    {
      id: "v-g9-contre-changement", yt: "p4tjNSA797I", aVerifier: true,
      source: "IFCE", intervenant: "Pauline Van Landeghem", intervenantRole: {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, titreSource: "Le contre changement de main au galop", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/le-contre-changement-de-main-au-galop/",
      langueVideo: "fr", cours: [], galop: 9, theme: "dressage",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Le contre-changement de main au galop", "en": "Counter change of hand at canter", "es": "El contracambio de mano al galope", "it": "Il controcambiamento di mano al galoppo", "ja": "駈歩でのカウンターチェンジ", "de": "Der Konterwechsel im Galopp", "ar": "تغيير اليد المعاكس في الغالوب", "zh": "跑步中的反向换手", "nl": "De contrawissel in galop", "pt": "A contramudança de mão a galope", "sv": "Kontraväxling i galopp", "ru": "Контрперемена направления галопом", "pl": "Kontrzmiana kierunku w galopie", "ko": "구보에서 카운터 체인지"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    /* « Les manipulations dans le travail à pied » (Frédérique Defrémont, IFCE, Galop 5, cours g5n-06) : lien
       réparé le 04/11 (« --KfWHkJKuI », deux tirets normaux). */
    {
      id: "v-g5-manipulations", yt: "--KfWHkJKuI" /* 04/11 13h25 : vrai identifiant retrouvé (le tiret long remplaçait deux tirets) */, aVerifier: true,
      source: "IFCE", intervenant: "Frédérique Defrémont", intervenantRole: {"fr": "Formatrice et longeuse de l'équipe de France", "en": "Trainer and lunger for the French team", "es": "Formadora y lonjeadora del equipo de Francia", "it": "Formatrice e longeuse della squadra francese", "ja": "フランス代表チームのトレーナー兼ランジャー", "de": "Ausbilderin und Longenführerin der französischen Mannschaft", "ar": "مدربة ومسؤولة الحبل الطويل في المنتخب الفرنسي", "zh": "法国队教练兼调教索操作员", "nl": "Trainer en longeerder van het Franse team", "pt": "Formadora e guia de guia da equipe da França", "sv": "Utbildare och longerare i franska landslaget", "ru": "Тренер и корда-мастер сборной Франции", "pl": "Trenerka i lonżerka reprezentacji Francji", "ko": "프랑스 대표팀 트레이너 겸 런지 담당"}, titreSource: "Les manipulations dans le travail à pied", doc: "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/les-manipulations-dans-le-travail-a-pied/",
      langueVideo: "fr", cours: ["g5n-06"], galop: 5, theme: "travail-a-pied",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {"fr": "Les manipulations dans le travail à pied", "en": "Handling in groundwork", "es": "Las manipulaciones en el trabajo pie a tierra", "it": "Le manipolazioni nel lavoro da terra", "ja": "地上作業での扱い方", "de": "Der Umgang bei der Bodenarbeit", "ar": "التعامل في العمل على الأرض", "zh": "地面工作中的操作", "nl": "Het hanteren bij grondwerk", "pt": "As manipulações no trabalho a pé", "sv": "Hantering i markarbete", "ru": "Обращение с лошадью в работе с земли", "pl": "Obsługa konia w pracy z ziemi", "ko": "지상 작업에서의 다루기"},
      resume: {"fr": "Webconférence de l'IFCE.", "en": "IFCE webinar.", "es": "Webconferencia del IFCE.", "it": "Webconferenza dell'IFCE.", "ja": "IFCEのウェブ講演。", "de": "Webkonferenz des IFCE.", "ar": "محاضرة عبر الإنترنت من IFCE.", "zh": "IFCE 网络讲座。", "nl": "Webconferentie van het IFCE.", "pt": "Webconferência do IFCE.", "sv": "Webbkonferens från IFCE.", "ru": "Веб-конференция IFCE.", "pl": "Webinarium IFCE.", "ko": "IFCE 웹 강연."}
    },
    /* 04/11 13h25 (Blandine : « réadapte au bon niveau et publie-moi tout ça ») : 11 webconférences IFCE
       retrouvées sur la chaîne YouTube de l'IFCE, chacune rangée au Galop de son cours. Lecture dans Hype
       non testable depuis le banc (YouTube bloqué) : à vérifier sur iPhone. Non retenues : podcast
       « longues rênes académiques » (haute école), « apprendre à regarder » (hors sujet pour g5n-04). */
    {"id": "v-g6-lr-debuter", "yt": "TGx623ZX04M", "aVerifier": true, "source": "IFCE", "intervenant": "Laurence Sautet", "intervenantRole": null, "titreSource": "Travail aux longues rênes : bien commencer", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/travail-aux-longues-renes-bien-commencer/", "langueVideo": "fr", "cours": ["g6n-05"], "galop": 6, "theme": "travail-a-pied", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Bien débuter aux longues rênes", "en": "Getting started with long reins", "es": "Empezar bien con las riendas largas", "it": "Iniziare bene con le redini lunghe", "ja": "長手綱を正しく始める", "de": "Gut starten mit der Doppellonge", "ar": "بداية صحيحة بالأعنة الطويلة", "zh": "长缰工作的良好开端", "nl": "Goed beginnen met lange teugels", "pt": "Começar bem com as rédeas longas", "sv": "Kom igång med långtyglar", "ru": "Как начать работу на длинных вожжах", "pl": "Dobry start z długimi wodzami", "ko": "롱 레인 제대로 시작하기"}, "resume": {"fr": "Le matériel, la tenue des rênes et ta place derrière le cheval, puis les premiers mouvements et les défauts les plus courants.", "en": "The equipment, how to hold the reins and where you stand behind the horse, then the first movements and the most common faults.", "es": "El material, cómo sujetar las riendas y tu lugar detrás del caballo; luego los primeros movimientos y los errores más comunes.", "it": "L'attrezzatura, come tenere le redini e il tuo posto dietro al cavallo, poi i primi movimenti e gli errori più comuni.", "ja": "道具、手綱の持ち方、馬の後ろでの立ち位置、そして最初の動きとよくある失敗。", "de": "Die Ausrüstung, die Zügelhaltung und dein Platz hinter dem Pferd, dann die ersten Bewegungen und die häufigsten Fehler.", "ar": "المعدات، طريقة مسك الأعنة ومكانك خلف الحصان، ثم الحركات الأولى والأخطاء الأكثر شيوعًا.", "zh": "装备、握缰方式和你在马后方的位置，然后是最初的动作和最常见的错误。", "nl": "Het materiaal, het vasthouden van de teugels en je plek achter het paard, daarna de eerste bewegingen en de meest voorkomende fouten.", "pt": "O material, como segurar as rédeas e o seu lugar atrás do cavalo; depois os primeiros movimentos e os erros mais comuns.", "sv": "Utrustningen, hur du håller tyglarna och var du står bakom hästen, sedan de första rörelserna och de vanligaste felen.", "ru": "Снаряжение, как держать вожжи и где стоять за лошадью, затем первые движения и самые частые ошибки.", "pl": "Sprzęt, trzymanie wodzy i twoje miejsce za koniem, potem pierwsze ruchy i najczęstsze błędy.", "ko": "장비, 고삐 잡는 법, 말 뒤에서의 위치, 그리고 첫 동작과 가장 흔한 실수."}},
    {"id": "v-g6-lr-transitions", "yt": "aBNdB1bRA-U", "aVerifier": true, "source": "IFCE", "intervenant": "Laurence Sautet", "intervenantRole": null, "titreSource": "Travail aux longues rênes : transitions simples", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/travail-aux-longues-renes-transitions-simples/", "langueVideo": "fr", "cours": ["g6n-05", "g7n-04"], "galop": 6, "theme": "travail-a-pied", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Les transitions aux longues rênes", "en": "Transitions on long reins", "es": "Las transiciones con riendas largas", "it": "Le transizioni alle redini lunghe", "ja": "長手綱での移行", "de": "Übergänge an der Doppellonge", "ar": "الانتقالات بالأعنة الطويلة", "zh": "长缰中的过渡", "nl": "Overgangen aan lange teugels", "pt": "As transições nas rédeas longas", "sv": "Övergångar på långtyglar", "ru": "Переходы на длинных вожжах", "pl": "Przejścia na długich wodzach", "ko": "롱 레인에서의 전환"}, "resume": {"fr": "La suite de « Bien débuter » : des transitions de plus en plus fines, et ce qu'il faut regarder chez le cheval et chez toi.", "en": "The follow-up to “Getting started”: increasingly precise transitions, and what to watch in the horse and in yourself.", "es": "La continuación de «Empezar bien»: transiciones cada vez más finas y lo que debes observar en el caballo y en ti.", "it": "Il seguito di «Iniziare bene»: transizioni sempre più fini e cosa osservare nel cavallo e in te.", "ja": "「正しく始める」の続き。より細かな移行と、馬と自分で見るべきポイント。", "de": "Die Fortsetzung von „Gut starten“: immer feinere Übergänge und worauf du beim Pferd und bei dir achtest.", "ar": "تتمة «بداية صحيحة»: انتقالات أدق فأدق، وما يجب أن تلاحظه عند الحصان وعندك.", "zh": "“良好开端”的续篇：越来越精细的过渡，以及在马和你自己身上要观察的要点。", "nl": "Het vervolg op ‘Goed beginnen’: steeds fijnere overgangen en waar je op let bij het paard en bij jezelf.", "pt": "A continuação de «Começar bem»: transições cada vez mais finas e o que observar no cavalo e em você.", "sv": "Fortsättningen på ”Kom igång”: allt finare övergångar och vad du ska titta på hos hästen och hos dig själv.", "ru": "Продолжение «Как начать»: всё более тонкие переходы и на что смотреть у лошади и у себя.", "pl": "Ciąg dalszy „Dobrego startu”: coraz subtelniejsze przejścia i na co patrzeć u konia i u siebie.", "ko": "‘제대로 시작하기’의 후속편: 점점 더 섬세한 전환과 말과 나 자신에게서 살펴볼 점."}},
    {"id": "v-g5-abord", "yt": "cK-70sIyoTg", "aVerifier": true, "source": "IFCE", "intervenant": "Guy-Noël Cadet", "intervenantRole": null, "titreSource": "La maîtrise de l'abord en saut d'obstacles", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/la-maitrise-de-labord-en-saut-dobstacles/", "langueVideo": "fr", "cours": ["g5n-11"], "galop": 5, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Maîtriser ton abord à l'obstacle", "en": "Mastering your approach to a fence", "es": "Dominar tu aproximación al obstáculo", "it": "Gestire il tuo avvicinamento all'ostacolo", "ja": "障害へのアプローチを制する", "de": "Den Anritt ans Hindernis beherrschen", "ar": "التحكم في اقترابك من الحاجز", "zh": "掌控你的障碍接近", "nl": "Je aanloop naar de hindernis beheersen", "pt": "Dominar a sua abordagem ao obstáculo", "sv": "Behärska din anridning mot hindret", "ru": "Контроль подхода к препятствию", "pl": "Panowanie nad najazdem na przeszkodę", "ko": "장애물 접근 다루기"}, "resume": {"fr": "Comment aborder les différents types d'obstacles, et comment tes émotions jouent sur les dernières foulées avant le saut.", "en": "How to approach different types of fences, and how your emotions affect the last strides before the jump.", "es": "Cómo abordar los distintos tipos de obstáculos y cómo tus emociones influyen en los últimos trancos antes del salto.", "it": "Come affrontare i diversi tipi di ostacoli e come le tue emozioni influiscono sulle ultime falcate prima del salto.", "ja": "さまざまな障害への入り方と、踏み切り前の最後の完歩に気持ちがどう影響するか。", "de": "Wie du verschiedene Hindernisse anreitest und wie deine Gefühle die letzten Galoppsprünge vor dem Sprung beeinflussen.", "ar": "كيف تقترب من أنواع الحواجز المختلفة، وكيف تؤثر مشاعرك في الخطوات الأخيرة قبل القفز.", "zh": "如何接近不同类型的障碍，以及你的情绪如何影响起跳前的最后几步。", "nl": "Hoe je verschillende soorten hindernissen aanrijdt en hoe je emoties de laatste galopsprongen voor de sprong beïnvloeden.", "pt": "Como abordar os diferentes tipos de obstáculos e como as suas emoções influenciam as últimas passadas antes do salto.", "sv": "Hur du rider an mot olika typer av hinder och hur dina känslor påverkar de sista galoppsprången före hoppet.", "ru": "Как подходить к разным типам препятствий и как твои эмоции влияют на последние темпы перед прыжком.", "pl": "Jak najeżdżać na różne rodzaje przeszkód i jak twoje emocje wpływają na ostatnie fule przed skokiem.", "ko": "다양한 장애물에 접근하는 법과, 점프 직전 마지막 보폭에 감정이 미치는 영향."}},
    {"id": "v-g5-rectitude-obstacle", "yt": "BGsZVYybwNw", "aVerifier": true, "source": "IFCE", "intervenant": "Pauline Mousseau", "intervenantRole": null, "titreSource": "La rectitude à l'obstacle : des exercices", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/enseignement-equestre/la-rectitude-a-lobstacle-des-exercices/", "langueVideo": "fr", "cours": ["g5n-11", "g7n-14"], "galop": 5, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "La rectitude à l'obstacle", "en": "Straightness over fences", "es": "La rectitud en el obstáculo", "it": "La rettitudine sull'ostacolo", "ja": "障害での真っすぐさ", "de": "Geraderichtung am Hindernis", "ar": "الاستقامة عند الحاجز", "zh": "障碍中的直线性", "nl": "Rechtheid bij het springen", "pt": "A retidão no obstáculo", "sv": "Rakhet vid hindret", "ru": "Прямолинейность на препятствии", "pl": "Prostość na przeszkodzie", "ko": "장애물에서의 직진성"}, "resume": {"fr": "Ce qu'est la rectitude, puis trois exercices filmés avec des élèves pour arriver droit sur l'obstacle et repartir droit.", "en": "What straightness means, then three exercises filmed with pupils to arrive straight at the fence and leave straight.", "es": "Qué es la rectitud y luego tres ejercicios grabados con alumnos para llegar recto al obstáculo y salir recto.", "it": "Cos'è la rettitudine, poi tre esercizi filmati con allievi per arrivare dritto sull'ostacolo e ripartire dritto.", "ja": "真っすぐさとは何か、そして生徒と撮影した3つの練習で、障害に真っすぐ入り真っすぐ出る。", "de": "Was Geraderichtung bedeutet, dann drei mit Schülern gefilmte Übungen, um gerade ans Hindernis zu kommen und gerade weiterzureiten.", "ar": "ما هي الاستقامة، ثم ثلاثة تمارين مصوّرة مع تلاميذ للوصول إلى الحاجز باستقامة والخروج منه باستقامة.", "zh": "什么是直线性，然后是与学员拍摄的三个练习：笔直地接近障碍并笔直离开。", "nl": "Wat rechtheid is, daarna drie gefilmde oefeningen met leerlingen om recht op de hindernis af te komen en recht weg te rijden.", "pt": "O que é a retidão e depois três exercícios filmados com alunos para chegar reto ao obstáculo e sair reto.", "sv": "Vad rakhet är, sedan tre filmade övningar med elever för att komma rakt mot hindret och fortsätta rakt.", "ru": "Что такое прямолинейность, затем три упражнения с учениками: прямо подойти к препятствию и прямо уйти.", "pl": "Czym jest prostość, a potem trzy ćwiczenia nagrane z uczniami, by najechać prosto na przeszkodę i prosto odjechać.", "ko": "직진성이란 무엇인지, 그리고 학생들과 촬영한 세 가지 연습으로 장애물에 곧게 들어가고 곧게 나오기."}},
    {"id": "v-g7-gymnastique", "yt": "qFH5l2kWUmc", "aVerifier": true, "source": "IFCE", "intervenant": "Maxime Mercier", "intervenantRole": null, "titreSource": "Une séance de gymnastique pour le cheval d'obstacles", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/une-seance-de-gymnastique-pour-le-cheval-d-obstacles/", "langueVideo": "fr", "cours": ["g7n-14"], "galop": 7, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Une séance de gymnastique à l'obstacle", "en": "A gymnastic jumping session", "es": "Una sesión de gimnasia de salto", "it": "Una seduta di ginnastica sugli ostacoli", "ja": "障害のジムナスティック練習", "de": "Eine Gymnastikeinheit am Sprung", "ar": "حصة تمارين جمباز للقفز", "zh": "一节障碍体操训练课", "nl": "Een gymnastiekles bij het springen", "pt": "Uma sessão de ginástica de saltos", "sv": "Ett gymnastikpass på hinder", "ru": "Гимнастическое занятие на препятствиях", "pl": "Trening gimnastyczny na przeszkodach", "ko": "장애물 체조 훈련"}, "resume": {"fr": "Trois ateliers, d'abord séparés puis combinés : cavaletti directionnels, gymnastique sur un obstacle et combinaisons, avec des chevaux confirmés.", "en": "Three set-ups, first separate then combined: directional cavaletti, gymnastics over one fence and combinations, with experienced horses.", "es": "Tres ejercicios, primero por separado y luego combinados: cavaletti direccionales, gimnasia sobre un obstáculo y combinaciones, con caballos experimentados.", "it": "Tre esercizi, prima separati poi combinati: cavaletti direzionali, ginnastica su un ostacolo e combinazioni, con cavalli esperti.", "ja": "3つの課題をまず別々に、次に組み合わせて：方向付けのキャバレッティ、単独障害でのジムナスティック、コンビネーション。経験のある馬で。", "de": "Drei Aufgaben, erst einzeln, dann kombiniert: Richtungs-Cavaletti, Gymnastik über ein Hindernis und Kombinationen, mit erfahrenen Pferden.", "ar": "ثلاثة تمارين، منفصلة أولًا ثم مجتمعة: كافاليتي للتوجيه، وجمباز على حاجز واحد، ومجموعات حواجز، مع خيول متمرسة.", "zh": "三个练习，先分开再组合：方向性地杆、单个障碍上的体操和组合障碍，使用有经验的马。", "nl": "Drie oefeningen, eerst apart en dan gecombineerd: richtingscavaletti, gymnastiek over één hindernis en combinaties, met ervaren paarden.", "pt": "Três exercícios, primeiro separados e depois combinados: cavaletti direcionais, ginástica sobre um obstáculo e combinações, com cavalos experientes.", "sv": "Tre övningar, först var för sig och sedan kombinerade: riktningscavaletti, gymnastik över ett hinder och kombinationer, med erfarna hästar.", "ru": "Три упражнения, сначала отдельно, затем вместе: направляющие кавалетти, гимнастика на одном препятствии и системы, с опытными лошадьми.", "pl": "Trzy ćwiczenia, najpierw osobno, potem razem: kawaletti kierunkowe, gimnastyka na jednej przeszkodzie i szeregi, z doświadczonymi końmi.", "ko": "세 가지 과제를 먼저 따로, 그다음 함께: 방향 카발레티, 단일 장애물 체조, 콤비네이션. 숙련된 말과 함께."}},
    {"id": "v-g5-cross", "yt": "5g7YPzzW7DM", "aVerifier": true, "source": "IFCE", "intervenant": "Morgan Payement", "intervenantRole": null, "titreSource": "Initier au cross : débuter des chevaux, des cavaliers", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/initier-au-cross-debuter-des-chevaux-des-cavaliers/", "langueVideo": "fr", "cours": ["g5n-12"], "galop": 5, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Débuter en cross", "en": "Getting started in cross-country", "es": "Empezar en cross", "it": "Iniziare il cross", "ja": "クロスカントリーを始める", "de": "Einstieg ins Gelände", "ar": "البدء في الكروس", "zh": "越野入门", "nl": "Beginnen met cross", "pt": "Começar no cross", "sv": "Börja med terräng", "ru": "Первые шаги в кроссе", "pl": "Początki w crossie", "ko": "크로스컨트리 시작하기"}, "resume": {"fr": "La sécurité, la façon d'aborder chaque type d'obstacle de cross et une progression séance après séance.", "en": "Safety, how to tackle each type of cross-country fence and a session-by-session progression.", "es": "La seguridad, cómo abordar cada tipo de obstáculo de cross y una progresión sesión tras sesión.", "it": "La sicurezza, come affrontare ogni tipo di ostacolo da cross e una progressione seduta dopo seduta.", "ja": "安全、クロスの障害の種類ごとの入り方、そして回を重ねる段階的な進め方。", "de": "Sicherheit, wie du jede Art von Geländehindernis angehst, und ein Aufbau von Einheit zu Einheit.", "ar": "السلامة، وطريقة التعامل مع كل نوع من حواجز الكروس، وتدرّج من حصة إلى أخرى.", "zh": "安全、如何应对每种越野障碍，以及一课接一课的循序渐进。", "nl": "Veiligheid, hoe je elk type crosshindernis aanpakt en een opbouw van les tot les.", "pt": "A segurança, como abordar cada tipo de obstáculo de cross e uma progressão sessão após sessão.", "sv": "Säkerhet, hur du tar dig an varje typ av terränghinder och en progression pass för pass.", "ru": "Безопасность, подход к каждому типу кроссового препятствия и постепенное усложнение от занятия к занятию.", "pl": "Bezpieczeństwo, jak pokonywać każdy rodzaj przeszkody crossowej i postęp z treningu na trening.", "ko": "안전, 크로스컨트리 장애물 종류별 접근법, 그리고 수업마다 단계적인 진행."}},
    {"id": "v-g6-pieds", "yt": "QAnSoLGxQKY", "aVerifier": true, "source": "IFCE", "intervenant": "Pierre Auque et Franck Tabac", "intervenantRole": {"fr": "Maréchaux-ferrants", "en": "Farriers", "es": "Herradores", "it": "Maniscalchi", "ja": "装蹄師", "de": "Hufschmiede", "ar": "بياطرة", "zh": "蹄铁匠", "nl": "Hoefsmeden", "pt": "Ferradores", "sv": "Hovslagare", "ru": "Кузнецы", "pl": "Kowale", "ko": "장제사"}, "titreSource": "ASKIP : les idées reçues sur pieds nus / pieds ferrés", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/sante-et-bien-etre-animal/askip-les-idees-recues-sur-pieds-nus-pieds-ferres/", "langueVideo": "fr", "cours": ["g6n-04"], "galop": 6, "theme": "soins-et-materiel", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Pieds nus ou ferrés : les idées reçues", "en": "Barefoot or shod: common myths", "es": "Descalzo o herrado: las ideas falsas", "it": "Scalzo o ferrato: i luoghi comuni", "ja": "裸蹄か装蹄か：よくある思い込み", "de": "Barhuf oder beschlagen: verbreitete Irrtümer", "ar": "حافي أم منعّل: أفكار شائعة خاطئة", "zh": "赤蹄还是钉蹄：常见误解", "nl": "Onbeslagen of beslagen: hardnekkige ideeën", "pt": "Descalço ou ferrado: as ideias feitas", "sv": "Barfota eller skodd: vanliga myter", "ru": "Без подков или с подковами: распространённые мифы", "pl": "Bose czy kute: obiegowe opinie", "ko": "맨발굽 또는 편자: 흔한 오해"}, "resume": {"fr": "Deux maréchaux-ferrants répondent aux questions courantes sur la protection du pied, l'amorti et le travail pieds nus.", "en": "Two farriers answer common questions about hoof protection, shock absorption and working barefoot.", "es": "Dos herradores responden a las preguntas habituales sobre la protección del casco, la amortiguación y el trabajo descalzo.", "it": "Due maniscalchi rispondono alle domande più comuni sulla protezione dello zoccolo, l'ammortizzazione e il lavoro a piedi scalzi.", "ja": "2人の装蹄師が、蹄の保護、衝撃吸収、裸蹄での運動についてのよくある質問に答える。", "de": "Zwei Hufschmiede beantworten häufige Fragen zu Hufschutz, Stoßdämpfung und Arbeit ohne Eisen.", "ar": "بيطاران يجيبان عن الأسئلة الشائعة حول حماية الحافر وامتصاص الصدمات والعمل بلا نعال.", "zh": "两位蹄铁匠回答关于蹄部保护、减震和赤蹄训练的常见问题。", "nl": "Twee hoefsmeden beantwoorden veelgestelde vragen over hoefbescherming, schokdemping en werken zonder ijzers.", "pt": "Dois ferradores respondem às perguntas comuns sobre a proteção do casco, o amortecimento e o trabalho descalço.", "sv": "Två hovslagare svarar på vanliga frågor om hovskydd, stötdämpning och att arbeta barfota.", "ru": "Два кузнеца отвечают на частые вопросы о защите копыта, амортизации и работе без подков.", "pl": "Dwóch kowali odpowiada na częste pytania o ochronę kopyta, amortyzację i pracę bez podków.", "ko": "두 명의 장제사가 발굽 보호, 충격 흡수, 맨발굽 운동에 관한 흔한 질문에 답한다."}},
    {"id": "v-g6-reproduction", "yt": "01rkcBJc7Qw", "aVerifier": true, "source": "IFCE", "intervenant": "Charlotte Degien", "intervenantRole": {"fr": "Vétérinaire", "en": "Veterinarian", "es": "Veterinaria", "it": "Veterinaria", "ja": "獣医師", "de": "Tierärztin", "ar": "طبيبة بيطرية", "zh": "兽医", "nl": "Dierenarts", "pt": "Veterinária", "sv": "Veterinär", "ru": "Ветеринарный врач", "pl": "Lekarz weterynarii", "ko": "수의사"}, "titreSource": "Mise à la reproduction de ma jument : comment faire ?", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/elevage-et-entretien/mise-a-la-reproduction-de-ma-jument-comment-faire/", "langueVideo": "fr", "cours": ["g6n-10"], "galop": 6, "theme": "comprendre-le-cheval", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Mettre sa jument à la reproduction", "en": "Breeding your mare", "es": "Poner a tu yegua a criar", "it": "Mettere la fattrice in riproduzione", "ja": "牝馬を繁殖に出す", "de": "Die Stute decken lassen", "ar": "إعداد فرسك للتناسل", "zh": "让母马配种", "nl": "Je merrie laten dekken", "pt": "Pôr a égua à reprodução", "sv": "Betäcka sitt sto", "ru": "Как подготовить кобылу к случке", "pl": "Krycie klaczy", "ko": "암말 번식시키기"}, "resume": {"fr": "Les étapes, du choix de l'étalon et de la méthode jusqu'au constat de gestation et au poulinage.", "en": "The steps, from choosing the stallion and the method to the pregnancy check and foaling.", "es": "Las etapas, desde la elección del semental y del método hasta la confirmación de la gestación y el parto.", "it": "Le tappe, dalla scelta dello stallone e del metodo fino alla diagnosi di gravidanza e al parto.", "ja": "種牡馬と方法の選び方から、妊娠確認、出産までの流れ。", "de": "Die Schritte von der Wahl des Hengstes und der Methode bis zur Trächtigkeitsuntersuchung und zum Abfohlen.", "ar": "المراحل، من اختيار الفحل والطريقة حتى التأكد من الحمل والولادة.", "zh": "从选择种公马和配种方法，到确认妊娠和产驹的各个步骤。", "nl": "De stappen, van de keuze van de hengst en de methode tot de drachtigheidscontrole en het veulenen.", "pt": "As etapas, da escolha do garanhão e do método até a confirmação da gestação e o parto.", "sv": "Stegen, från val av hingst och metod till dräktighetskontroll och fölning.", "ru": "Этапы — от выбора жеребца и способа до подтверждения жеребости и выжеребки.", "pl": "Etapy — od wyboru ogiera i metody aż po potwierdzenie źrebności i wyźrebienie.", "ko": "씨수말과 방법 선택부터 임신 확인과 출산까지의 단계."}},
    {"id": "v-g7-rationnement", "yt": "BxBvhrAQKew", "aVerifier": true, "source": "IFCE", "intervenant": "Pauline Doligez", "intervenantRole": null, "titreSource": "Comment utiliser l'outil de rationnement de l'IFCE ?", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/elevage-et-entretien/comment-utiliser-loutil-de-rationnement-de-lifce/", "langueVideo": "fr", "cours": ["g7n-08"], "galop": 7, "theme": "soins-et-materiel", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Calculer une ration avec l'outil IFCE", "en": "Working out a ration with the IFCE tool", "es": "Calcular una ración con la herramienta del IFCE", "it": "Calcolare una razione con lo strumento IFCE", "ja": "IFCEのツールで飼料を計算する", "de": "Eine Ration mit dem IFCE-Tool berechnen", "ar": "حساب حصة غذائية بأداة IFCE", "zh": "用 IFCE 工具计算日粮", "nl": "Een rantsoen berekenen met de IFCE-tool", "pt": "Calcular uma ração com a ferramenta do IFCE", "sv": "Räkna ut en foderstat med IFCE:s verktyg", "ru": "Расчёт рациона с помощью инструмента IFCE", "pl": "Obliczanie dawki pokarmowej narzędziem IFCE", "ko": "IFCE 도구로 사료 배합 계산하기"}, "resume": {"fr": "Comment vérifier qu'une ration de fourrage et d'aliments est équilibrée, avec des exemples commentés.", "en": "How to check that a ration of forage and feed is balanced, with worked examples.", "es": "Cómo comprobar que una ración de forraje y pienso está equilibrada, con ejemplos comentados.", "it": "Come verificare che una razione di foraggio e mangime sia equilibrata, con esempi commentati.", "ja": "粗飼料と配合飼料の組み合わせがバランスよいかを確かめる方法を、解説付きの例で。", "de": "Wie du prüfst, ob eine Ration aus Raufutter und Futtermitteln ausgewogen ist, mit kommentierten Beispielen.", "ar": "كيف تتحقق من توازن حصة من العلف الخشن والأعلاف، مع أمثلة مشروحة.", "zh": "如何检查粗饲料和精料组成的日粮是否均衡，并附有讲解的例子。", "nl": "Hoe je controleert of een rantsoen van ruwvoer en krachtvoer in balans is, met besproken voorbeelden.", "pt": "Como verificar se uma ração de forragem e alimentos está equilibrada, com exemplos comentados.", "sv": "Hur du kontrollerar att en foderstat av grovfoder och kraftfoder är balanserad, med kommenterade exempel.", "ru": "Как проверить сбалансированность рациона из грубых кормов и комбикормов, с разобранными примерами.", "pl": "Jak sprawdzić, czy dawka paszy objętościowej i treściwej jest zbilansowana, z omówionymi przykładami.", "ko": "조사료와 사료로 이뤄진 배합이 균형 잡혔는지 확인하는 법을 해설 예시와 함께."}},
    {"id": "v-g5-apprentissage", "yt": "csOZydbifJU", "aVerifier": true, "source": "IFCE", "intervenant": "", "intervenantRole": null, "titreSource": "La science de l'équitation : optimiser les apprentissages (partie 2)", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/sante-et-bien-etre-animal/science-de-l-equitation-une-aide-precieuse-pour-optimiser-les-apprentissages-partie-2/", "langueVideo": "fr", "cours": ["g5n-03"], "galop": 5, "theme": "comprendre-le-cheval", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Comment le cheval apprend", "en": "How the horse learns", "es": "Cómo aprende el caballo", "it": "Come impara il cavallo", "ja": "馬はどのように学ぶか", "de": "Wie das Pferd lernt", "ar": "كيف يتعلم الحصان", "zh": "马是如何学习的", "nl": "Hoe het paard leert", "pt": "Como o cavalo aprende", "sv": "Hur hästen lär sig", "ru": "Как учится лошадь", "pl": "Jak uczy się koń", "ko": "말은 어떻게 배우는가"}, "resume": {"fr": "Chaque contact avec toi est un apprentissage pour le cheval : les signaux, la progression et le contexte qui l'aident à comprendre.", "en": "Every contact with you is a lesson for the horse: the signals, the progression and the context that help it understand.", "es": "Cada contacto contigo es un aprendizaje para el caballo: las señales, la progresión y el contexto que le ayudan a comprender.", "it": "Ogni contatto con te è un apprendimento per il cavallo: i segnali, la progressione e il contesto che lo aiutano a capire.", "ja": "あなたとの接触はすべて馬にとっての学び。理解を助ける合図、段階、状況について。", "de": "Jeder Kontakt mit dir ist für das Pferd ein Lernmoment: die Signale, der Aufbau und der Rahmen, die ihm beim Verstehen helfen.", "ar": "كل تواصل معك هو تعلّم للحصان: الإشارات والتدرّج والسياق التي تساعده على الفهم.", "zh": "你与马的每一次接触都是它的学习：帮助它理解的信号、进度和环境。", "nl": "Elk contact met jou is een leermoment voor het paard: de signalen, de opbouw en de context die het helpen begrijpen.", "pt": "Cada contato com você é um aprendizado para o cavalo: os sinais, a progressão e o contexto que o ajudam a compreender.", "sv": "Varje kontakt med dig är ett lärande för hästen: signalerna, progressionen och sammanhanget som hjälper den att förstå.", "ru": "Каждый контакт с тобой — урок для лошади: сигналы, постепенность и обстановка, которые помогают ей понять.", "pl": "Każdy kontakt z tobą to dla konia nauka: sygnały, stopniowanie i kontekst, które pomagają mu zrozumieć.", "ko": "당신과의 모든 접촉은 말에게 배움이다. 말이 이해하도록 돕는 신호, 단계, 상황."}},
    {"id": "v-g5-regarder-allures", "yt": "1WzNPDxCF9c", "aVerifier": true, "source": "IFCE", "intervenant": "Bernard Maurel", "intervenantRole": {"fr": "Juge international de dressage", "en": "International dressage judge", "es": "Juez internacional de doma", "it": "Giudice internazionale di dressage", "ja": "国際馬場馬術審判員", "de": "Internationaler Dressurrichter", "ar": "حكم دولي في الترويض", "zh": "国际盛装舞步裁判", "nl": "Internationaal dressuurjury", "pt": "Juiz internacional de adestramento", "sv": "Internationell dressyrdomare", "ru": "Международный судья по выездке", "pl": "Międzynarodowy sędzia ujeżdżenia", "ko": "국제 마장마술 심판"}, "titreSource": "Travail du cheval : apprendre à regarder les allures", "doc": "https://www.ifce.fr/ifce/connaissances/webconferences/equitation/travail-du-cheval-apprendre-a-regarder-les-allures/", "langueVideo": "fr", "cours": ["g6n-08"], "galop": 6, "theme": "comprendre-le-cheval", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Apprendre à regarder les allures", "en": "Learning to watch the gaits", "es": "Aprender a observar los aires", "it": "Imparare a guardare le andature", "ja": "歩様の見方を学ぶ", "de": "Die Gangarten beobachten lernen", "ar": "تعلّم ملاحظة المشيات", "zh": "学会观察步法", "nl": "Leren kijken naar de gangen", "pt": "Aprender a observar os andamentos", "sv": "Lär dig titta på gångarterna", "ru": "Учимся смотреть на аллюры", "pl": "Nauka obserwowania chodów", "ko": "보법 관찰하는 법 배우기"}, "resume": {"fr": "Un juge international montre comment observer le pas, le trot et le galop sur des images filmées.", "en": "An international judge shows how to observe the walk, trot and canter using filmed footage.", "es": "Un juez internacional muestra cómo observar el paso, el trote y el galope con imágenes grabadas.", "it": "Un giudice internazionale mostra come osservare passo, trotto e galoppo su immagini filmate.", "ja": "国際審判員が、撮影映像で常歩・速歩・駈歩の見方を示す。", "de": "Ein internationaler Richter zeigt anhand von Filmaufnahmen, wie du Schritt, Trab und Galopp beobachtest.", "ar": "حكم دولي يبيّن كيف تلاحظ الخطوة والخبب والغالوب من خلال لقطات مصوّرة.", "zh": "一位国际裁判通过影片画面讲解如何观察慢步、快步和跑步。", "nl": "Een internationaal jurylid laat aan de hand van beelden zien hoe je stap, draf en galop bekijkt.", "pt": "Um juiz internacional mostra como observar o passo, o trote e o galope com imagens filmadas.", "sv": "En internationell domare visar med filmade bilder hur du iakttar skritt, trav och galopp.", "ru": "Международный судья показывает на видеозаписях, как наблюдать шаг, рысь и галоп.", "pl": "Międzynarodowy sędzia pokazuje na nagraniach, jak obserwować stęp, kłus i galop.", "ko": "국제 심판이 촬영 영상으로 평보, 속보, 구보를 관찰하는 법을 보여준다."}},
    /* 04/11 14h05 (Blandine « oui vas-y ») : cross Arnaud Boiteau (G6/G7), état corporel (Doligez), cadence
       sur sauts enchaînés (Deyna), mise en selle à la longe (Fontaine, complément du travail sans étriers).
       Titres vérifiés sur les pages YouTube ; lecture à tester sur iPhone. */
    {"id": "v-g6-cross-reco", "yt": "NI7GPE_aYQk", "aVerifier": true, "source": "IFCE", "intervenant": "Arnaud Boiteau", "intervenantRole": null, "titreSource": "La reconnaissance du parcours de cross", "doc": "", "langueVideo": "fr", "cours": ["g6n-14"], "galop": 6, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Reconnaître un parcours de cross", "en": "Walking a cross-country course", "es": "Reconocer un recorrido de cross", "it": "Ricognizione di un percorso di cross", "ja": "クロスカントリーコースの下見", "de": "Eine Geländestrecke abgehen", "ar": "معاينة مسار الكروس", "zh": "越野赛道勘察", "nl": "Een crossparcours verkennen", "pt": "Reconhecer um percurso de cross", "sv": "Gå en terrängbana", "ru": "Просмотр кроссовой трассы", "pl": "Rekonesans trasy crossu", "ko": "크로스컨트리 코스 답사"}, "resume": {"fr": "À quoi sert la reconnaissance, comment la mener en pensant à toi et à ton cheval, et comment la caser dans ta journée de concours.", "en": "What walking the course is for, how to do it thinking of yourself and your horse, and how to fit it into your competition day.", "es": "Para qué sirve el reconocimiento, cómo hacerlo pensando en ti y en tu caballo, y cómo encajarlo en tu día de concurso.", "it": "A cosa serve la ricognizione, come farla pensando a te e al tuo cavallo, e come inserirla nella tua giornata di gara.", "ja": "下見の目的、自分と馬のことを考えた進め方、そして競技日の中での組み込み方。", "de": "Wozu das Abgehen dient, wie du es mit Blick auf dich und dein Pferd machst und wie du es in deinen Turniertag einplanst.", "ar": "ما فائدة المعاينة، وكيف تجريها وأنت تفكر في نفسك وفي حصانك، وكيف تدرجها في يوم مسابقتك.", "zh": "勘察赛道的作用、如何兼顾自己和马去进行，以及如何安排进比赛日。", "nl": "Waarvoor het verkennen dient, hoe je het doet met jezelf en je paard in gedachten, en hoe je het inpast in je wedstrijddag.", "pt": "Para que serve o reconhecimento, como fazê-lo pensando em você e no seu cavalo, e como encaixá-lo no seu dia de concurso.", "sv": "Vad banvandringen är till för, hur du gör den med dig själv och din häst i tankarna och hur du får in den i tävlingsdagen.", "ru": "Зачем нужен просмотр трассы, как проводить его с мыслью о себе и лошади и как вписать его в день соревнований.", "pl": "Po co jest rekonesans, jak go przeprowadzić, myśląc o sobie i koniu, i jak zmieścić go w dniu zawodów.", "ko": "코스 답사의 목적, 나와 말을 생각하며 답사하는 법, 그리고 대회 일정에 넣는 법."}},
    {"id": "v-g7-cross-detente", "yt": "5oLGmkQUEHI", "aVerifier": true, "source": "IFCE", "intervenant": "Arnaud Boiteau", "intervenantRole": null, "titreSource": "La détente du cross", "doc": "", "langueVideo": "fr", "cours": ["g7n-15"], "galop": 7, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "La détente avant le cross", "en": "Warming up for cross-country", "es": "El calentamiento antes del cross", "it": "Il riscaldamento prima del cross", "ja": "クロス前の準備運動", "de": "Das Abreiten vor dem Gelände", "ar": "التحمية قبل الكروس", "zh": "越野前的热身", "nl": "Losrijden voor de cross", "pt": "O aquecimento antes do cross", "sv": "Framridning inför terrängen", "ru": "Разминка перед кроссом", "pl": "Rozprężenie przed crossem", "ko": "크로스 전 워밍업"}, "resume": {"fr": "Construire une détente cohérente, adaptée au physique et au mental de ton couple, pour partir sur le cross dans les meilleures conditions.", "en": "Building a coherent warm-up, suited to the physical and mental state of you and your horse, to start the cross in the best conditions.", "es": "Construir un calentamiento coherente, adaptado al físico y a la mente de tu binomio, para salir al cross en las mejores condiciones.", "it": "Costruire un riscaldamento coerente, adatto al fisico e alla mente del tuo binomio, per partire sul cross nelle migliori condizioni.", "ja": "人馬の体と心に合った一貫した準備運動を組み立て、最良の状態でクロスに出る。", "de": "Ein stimmiges Abreiten aufbauen, passend zu Körper und Kopf deines Paares, um bestens vorbereitet ins Gelände zu starten.", "ar": "بناء تحمية متماسكة تناسب الحالة البدنية والذهنية لثنائيك، لتنطلق في الكروس في أفضل الظروف.", "zh": "根据人马组合的身心状态安排合理的热身，以最佳状态出发越野。", "nl": "Een samenhangende opwarming opbouwen, passend bij lichaam en hoofd van je combinatie, om in de beste omstandigheden aan de cross te beginnen.", "pt": "Montar um aquecimento coerente, adaptado ao físico e ao mental do seu conjunto, para sair no cross nas melhores condições.", "sv": "Bygga upp en genomtänkt framridning, anpassad efter ekipagets kropp och huvud, för att starta terrängen i bästa skick.", "ru": "Выстроить продуманную разминку под физическое и психологическое состояние пары, чтобы выйти на кросс в лучшей форме.", "pl": "Zbudować spójne rozprężenie, dopasowane do ciała i głowy twojej pary, by wyjechać na cross w najlepszej formie.", "ko": "인마의 몸과 마음에 맞는 일관된 워밍업을 짜서 최상의 상태로 크로스에 나서기."}},
    {"id": "v-g7-cross-directionnels", "yt": "jNng2nuK2QM", "aVerifier": true, "source": "IFCE", "intervenant": "Arnaud Boiteau", "intervenantRole": null, "titreSource": "Bien franchir les obstacles directionnels en cross", "doc": "", "langueVideo": "fr", "cours": ["g7n-15"], "galop": 7, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Les obstacles directionnels en cross", "en": "Accuracy fences in cross-country", "es": "Los obstáculos direccionales en cross", "it": "Gli ostacoli direzionali nel cross", "ja": "クロスの方向性障害", "de": "Richtungshindernisse im Gelände", "ar": "الحواجز الاتجاهية في الكروس", "zh": "越野中的方向性障碍", "nl": "Richtingshindernissen in de cross", "pt": "Os obstáculos direcionais no cross", "sv": "Precisionshinder i terrängen", "ru": "Направляющие препятствия на кроссе", "pl": "Przeszkody kierunkowe w crossie", "ko": "크로스의 방향성 장애물"}, "resume": {"fr": "Les principes pour franchir proprement les obstacles étroits et en angle, où la précision compte plus que la vitesse.", "en": "The principles for clearing narrow and angled fences cleanly, where accuracy matters more than speed.", "es": "Los principios para pasar limpiamente los obstáculos estrechos y en ángulo, donde la precisión cuenta más que la velocidad.", "it": "I principi per superare in modo pulito gli ostacoli stretti e in angolo, dove la precisione conta più della velocità.", "ja": "速さより正確さが大切な、幅の狭い障害や角度のある障害をきれいに越えるための原則。", "de": "Die Grundsätze, um schmale und schräg anzureitende Hindernisse sauber zu nehmen, bei denen Genauigkeit mehr zählt als Tempo.", "ar": "مبادئ اجتياز الحواجز الضيقة والمائلة بنظافة، حيث تهمّ الدقة أكثر من السرعة.", "zh": "干净跨越窄障碍和斜角障碍的原则，这里精准比速度更重要。", "nl": "De principes om smalle en schuine hindernissen netjes te nemen, waarbij precisie meer telt dan snelheid.", "pt": "Os princípios para passar limpo os obstáculos estreitos e em ângulo, onde a precisão conta mais do que a velocidade.", "sv": "Principerna för att ta smala och vinklade hinder rent, där precision betyder mer än fart.", "ru": "Принципы чистого преодоления узких и угловых препятствий, где точность важнее скорости.", "pl": "Zasady czystego pokonywania wąskich i ukośnych przeszkód, gdzie precyzja liczy się bardziej niż szybkość.", "ko": "속도보다 정확성이 중요한 좁은 장애물과 사선 장애물을 깔끔하게 넘는 원칙."}},
    {"id": "v-g6-etat-corporel", "yt": "MWOmY7caVNM", "aVerifier": true, "source": "IFCE", "intervenant": "Pauline Doligez", "intervenantRole": null, "titreSource": "Estimer note d'état corporel & poids d'un cheval", "doc": "", "langueVideo": "fr", "cours": ["g6n-06"], "galop": 6, "theme": "sante", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Noter l'état corporel et estimer le poids", "en": "Body condition scoring and estimating weight", "es": "Puntuar la condición corporal y estimar el peso", "it": "Valutare lo stato corporeo e stimare il peso", "ja": "ボディコンディションの評価と体重の推定", "de": "Körperzustand bewerten und Gewicht schätzen", "ar": "تقييم الحالة الجسمية وتقدير الوزن", "zh": "体况评分与体重估算", "nl": "De lichaamsconditie scoren en het gewicht schatten", "pt": "Avaliar a condição corporal e estimar o peso", "sv": "Bedöma hullet och uppskatta vikten", "ru": "Оценка упитанности и веса", "pl": "Ocena kondycji i szacowanie wagi", "ko": "체형 점수 매기기와 체중 추정"}, "resume": {"fr": "Comment noter l'état corporel à l'œil et au toucher, estimer le poids avec quelques mesures et adapter la ration.", "en": "How to score body condition by eye and by touch, estimate weight with a few measurements and adjust the ration.", "es": "Cómo puntuar la condición corporal a la vista y al tacto, estimar el peso con unas medidas y adaptar la ración.", "it": "Come valutare lo stato corporeo a vista e al tatto, stimare il peso con qualche misura e adattare la razione.", "ja": "目と手で体型を評価し、いくつかの計測で体重を推定し、飼料を調整する方法。", "de": "Wie du den Körperzustand mit Auge und Hand bewertest, das Gewicht mit ein paar Maßen schätzt und die Ration anpasst.", "ar": "كيف تقيّم الحالة الجسمية بالنظر واللمس، وتقدّر الوزن ببضعة قياسات، وتكيّف الحصة الغذائية.", "zh": "如何通过目测和触摸评估体况，用几项测量估算体重并调整日粮。", "nl": "Hoe je de conditie met oog en hand beoordeelt, het gewicht met een paar metingen schat en het rantsoen aanpast.", "pt": "Como avaliar a condição corporal pela vista e pelo toque, estimar o peso com algumas medidas e adaptar a ração.", "sv": "Hur du bedömer hullet med blick och händer, uppskattar vikten med några mått och anpassar fodret.", "ru": "Как оценить упитанность на глаз и на ощупь, определить вес по нескольким замерам и скорректировать рацион.", "pl": "Jak ocenić kondycję wzrokiem i dotykiem, oszacować wagę kilkoma pomiarami i dostosować dawkę.", "ko": "눈과 손으로 체형을 평가하고, 몇 가지 측정으로 체중을 추정하고, 사료를 조절하는 법."}},
    {"id": "v-g6-cadence-sauts", "yt": "N6NyWXDUKvo", "aVerifier": true, "source": "IFCE", "intervenant": "Éric Deyna", "intervenantRole": {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, "titreSource": "Maintenir une cadence régulière en enchaînant les sauts", "doc": "", "langueVideo": "fr", "cours": ["g6n-13"], "galop": 6, "theme": "obstacle", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Garder la cadence en enchaînant les sauts", "en": "Keeping the rhythm through a line of fences", "es": "Mantener la cadencia encadenando saltos", "it": "Mantenere la cadenza concatenando i salti", "ja": "連続飛越でリズムを保つ", "de": "Den Takt beim Springen in Folge halten", "ar": "الحفاظ على الإيقاع أثناء تتابع القفزات", "zh": "连续跳跃时保持节奏", "nl": "Het ritme bewaren bij opeenvolgende sprongen", "pt": "Manter a cadência encadeando saltos", "sv": "Behålla takten genom en serie hinder", "ru": "Сохранять каденцию при прыжках подряд", "pl": "Utrzymać kadencję przy skokach w serii", "ko": "연속 점프에서 리듬 유지하기"}, "resume": {"fr": "Comment garder un galop régulier d'un saut à l'autre, sans accélérer ni casser l'élan.", "en": "How to keep a steady canter from one fence to the next, without rushing or losing momentum.", "es": "Cómo mantener un galope regular de un salto a otro, sin acelerar ni perder el impulso.", "it": "Come mantenere un galoppo regolare da un salto all'altro, senza accelerare né perdere slancio.", "ja": "飛越から飛越へ、急がず勢いも失わずに一定の駈歩を保つ方法。", "de": "Wie du von Sprung zu Sprung einen gleichmäßigen Galopp hältst, ohne zu eilen oder den Schwung zu verlieren.", "ar": "كيف تحافظ على غالوب منتظم من قفزة إلى أخرى دون تسرّع أو فقدان للاندفاع.", "zh": "如何在一跳到下一跳之间保持稳定的跑步，不冲也不丢失冲劲。", "nl": "Hoe je van sprong tot sprong een regelmatige galop houdt, zonder te jagen of de vaart te verliezen.", "pt": "Como manter um galope regular de um salto ao outro, sem acelerar nem perder o impulso.", "sv": "Hur du håller en jämn galopp från hinder till hinder utan att öka eller tappa farten.", "ru": "Как сохранять ровный галоп от прыжка к прыжку, не разгоняясь и не теряя движения.", "pl": "Jak utrzymać równy galop od skoku do skoku, bez przyspieszania i bez utraty impetu.", "ko": "서두르지도 추진력을 잃지도 않고 점프에서 점프까지 일정한 구보를 유지하는 법."}},
    {"id": "v-g5-mise-en-selle", "yt": "35TphEg_j_g", "aVerifier": true, "source": "IFCE", "intervenant": "François Fontaine", "intervenantRole": {"fr": "Écuyer du Cadre noir", "en": "Écuyer of the Cadre Noir", "es": "Écuyer del Cadre Noir", "it": "Écuyer del Cadre Noir", "ja": "カードル・ノワールのエキュイエ", "de": "Écuyer des Cadre Noir", "ar": "مدرب فروسية في الكادر نوار", "zh": "黑骑士团骑术教官", "nl": "Écuyer van de Cadre Noir", "pt": "Écuyer do Cadre Noir", "sv": "Écuyer vid Cadre Noir", "ru": "Экюйе Кадр Нуар", "pl": "Écuyer Cadre Noir", "ko": "카드르 누아르의 에퀴예"}, "titreSource": "Perfectionner sa mise en selle à la longe", "doc": "", "langueVideo": "fr", "cours": ["g5-c1"], "galop": 5, "theme": "position-du-cavalier", "rang": "approfondir", "dureeTranche": "", "verifie": "", "titre": {"fr": "Ta position travaillée à la longe", "en": "Your position worked on the lunge", "es": "Tu posición trabajada a la cuerda", "it": "La tua posizione lavorata alla corda", "ja": "調馬索で鍛える騎座", "de": "Dein Sitz an der Longe", "ar": "تحسين جلستك على حبل الترويض", "zh": "在调教索上练习骑姿", "nl": "Je zit verbeteren aan de longe", "pt": "A sua posição trabalhada na guia", "sv": "Din sits på longerlinan", "ru": "Посадка на корде", "pl": "Twój dosiad na lonży", "ko": "조마삭 위에서 다듬는 자세"}, "resume": {"fr": "À la longe, l'allure et la direction sont gérées pour toi : tu peux te concentrer sur ta position et ton équilibre, sans te servir des rênes.", "en": "On the lunge, the pace and direction are handled for you: you can focus on your position and balance, without using the reins.", "es": "A la cuerda, el aire y la dirección los gestionan por ti: puedes concentrarte en tu posición y tu equilibrio, sin usar las riendas.", "it": "Alla corda andatura e direzione sono gestite per te: puoi concentrarti sulla tua posizione e sul tuo equilibrio, senza usare le redini.", "ja": "調馬索では歩法と方向を任せられるので、手綱を使わずに自分の姿勢とバランスに集中できる。", "de": "An der Longe werden Tempo und Richtung für dich übernommen: Du kannst dich ohne Zügel auf deinen Sitz und dein Gleichgewicht konzentrieren.", "ar": "على حبل الترويض تُدار المشية والاتجاه عنك، فتركّز على جلستك وتوازنك دون استعمال الأعنة.", "zh": "在调教索上，步法和方向由别人掌控：你可以不用缰绳，专注于自己的姿势和平衡。", "nl": "Aan de longe worden gang en richting voor je geregeld: je kunt je zonder teugels op je zit en evenwicht richten.", "pt": "Na guia, o andamento e a direção são controlados por outra pessoa: você pode se concentrar na sua posição e no seu equilíbrio, sem usar as rédeas.", "sv": "På longerlinan sköts tempo och riktning åt dig: du kan fokusera på sits och balans utan att använda tyglarna.", "ru": "На корде аллюром и направлением управляют за тебя: ты можешь сосредоточиться на посадке и равновесии, не пользуясь поводом.", "pl": "Na lonży chodem i kierunkiem kieruje ktoś inny: możesz skupić się na dosiadzie i równowadze bez używania wodzy.", "ko": "조마삭에서는 보법과 방향을 대신 맡아 주니 고삐 없이 자세와 균형에 집중할 수 있다."}}
  ];

  /* Forme interne utilisée par les écrans. On ne recopie pas les données :
     on les dérive, pour que HYPE_VIDEOS reste la seule source de vérité. */
  function versInterne(v) {
      return {
        id: v.id,
        src: v.yt ? { type: "youtube", ref: v.yt } : null,
        vignetteUrl: v.yt ? ("https://i.ytimg.com/vi/" + v.yt + "/hqdefault.jpg") : null,
        coursId: (v.cours && v.cours[0]) || "",
        coursTous: v.cours || [],
        galop: v.galop || 4,
        theme: THEME_MAP[v.theme] || "dressage",
        rang: v.rang || "approfondir",
        dureeTranche: v.dureeTranche || "",
        premium: false,
        langueVideo: v.langueVideo || "fr",
        source: v.source || "",
        intervenant: v.intervenant || "",
        intervenantRole: v.intervenantRole || null,
        doc: v.doc || "",
        titreSource: v.titreSource || "",
        verifie: v.verifie || "",
        i18nTitre: v.titre, i18nResume: v.resume, i18nObserver: v.observer || null
      };
  }
  /* 04/11 10h22 (Blandine : « laisse les vidéos accessibles partout, je n'ai pas le temps de vérifier ») :
     les vidéos « À vérifier » qui ont un lien sont ouvertes à tous les cavaliers. verifie reste vide (personne ne
     les a encore ouvertes) ; remettre false pour les cacher de nouveau aux cavaliers. */
  var OUVRIR_A_VERIFIER = true;
  var VIDS = HYPE_VIDEOS.filter(function (v) { return INCLURE_NON_VERIFIEES || !!v.verifie || (OUVRIR_A_VERIFIER && v.aVerifier && !!v.yt); }).map(versInterne);
  /* 04/11 : vidéos pas encore vérifiées — visibles par les seules modératrices, marquées « À vérifier » */
  var VIDS_AV = HYPE_VIDEOS.filter(function (v) { return !v.verifie && v.aVerifier && v.yt && !INCLURE_NON_VERIFIEES && !OUVRIR_A_VERIFIER; })
    .map(function (v) { var x = versInterne(v); x.aVerifier = true; return x; });

  /* ---------------- RÉSERVE D'ANIMATIONS (MODÉRATEURS UNIQUEMENT) ----------------
     Les animations produites pour Hype, rangées ici pour qu'on sache où elles
     sont et dans quel état elles sont. Cette section n'apparaît QUE pour les
     comptes de HYPE_MODERATEURS : ce n'est pas du contenu pédagogique.
     Fichiers servis par Netlify depuis images/ — pas de YouTube, pas de tiers.
     Toute animation livrée doit être ajoutée ici. */
  var ANIMS = [
    /* --- Déjà placées nulle part, destination pressentie : accueil --- */
    { id: "anim-cheval", fichier: "images/hype-anim-cheval", dossier: "Accueil", duree: "5,1 s", poids: "202 Ko",
      titre: "Tête de cheval sur ciel étoilé",
      resume: "Réencodée depuis le HEVC d'origine (1,88 Mo). ⚠️ Finit sur le logo HYPE suivi de « TON UNIVERS ÉQUESREE » — faute incrustée dans l'image. Fin à couper vers 3,8 s." },
    { id: "anim-rideaux", fichier: "images/hype-anim-rideaux", dossier: "Bibliothèque vidéo", duree: "5,1 s", poids: "388 Ko",
      titre: "Portes qui s'ouvrent sur la lumière",
      resume: "Réencodée depuis le HEVC d'origine (1,46 Mo). ⚠️ Finit sur « TON UNIVERS ÉQUESTIEE » — faute incrustée. Fin à couper vers 4,3 s." },

    /* --- Palmarès : quatre variantes de couleur, déjà encodées proprement --- */
    { id: "palmares-dore", fichier: "images/palmares-dore", dossier: "Palmarès", duree: "6,3 s", poids: "359 Ko",
      titre: "Palmarès — doré", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },
    { id: "palmares-vert", fichier: "images/palmares-vert", dossier: "Palmarès", duree: "6,8 s", poids: "292 Ko",
      titre: "Palmarès — vert", resume: "H.264, sans audio, 644×480. Déjà en ligne. Lisible partout, y compris Android." },
    { id: "palmares-bordeaux", fichier: "images/palmares-bordeaux", dossier: "Palmarès", duree: "4,5 s", poids: "210 Ko",
      titre: "Palmarès — bordeaux", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },
    { id: "palmares-crystal", fichier: "images/palmares-crystal", dossier: "Palmarès", duree: "5,7 s", poids: "345 Ko",
      titre: "Palmarès — crystal", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },

    /* --- Mascotte --- */
    { id: "mascotte-dodo", fichier: "images/heybaby-dodo", dossier: "Mascotte", duree: "5,1 s", poids: "92 Ko",
      titre: "Mascotte — dodo", resume: "H.264, 560×240 : format bandeau large, pas interchangeable avec la messagerie." },
    { id: "mascotte-messagerie", fichier: "images/heybaby-messagerie", dossier: "Mascotte", duree: "5,1 s", poids: "214 Ko",
      titre: "Mascotte — messagerie", resume: "H.264, 560×416 : format presque carré." },

    /* --- Lot de 12 scènes, réencodées le 31/07, à trier (accueil ou saut) --- */
    { id: "accueil-01", fichier: "images/hype-accueil-01", dossier: "Accueil · à trier", duree: "3,3 s", poids: "" , titre: "Scène 01", resume: "À trier : accueil ou saut." },
    { id: "accueil-02", fichier: "images/hype-accueil-02", dossier: "Accueil · à trier", duree: "3,0 s", poids: "", titre: "Scène 02", resume: "À trier : accueil ou saut." },
    { id: "accueil-03", fichier: "images/hype-accueil-03", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 03", resume: "À trier : accueil ou saut." },
    { id: "accueil-04", fichier: "images/hype-accueil-04", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 04", resume: "À trier : accueil ou saut." },
    { id: "accueil-05", fichier: "images/hype-accueil-05", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 05", resume: "À trier : accueil ou saut." },
    { id: "accueil-06", fichier: "images/hype-accueil-06", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 06", resume: "À trier : accueil ou saut." },
    { id: "accueil-07", fichier: "images/hype-accueil-07", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 07", resume: "À trier : accueil ou saut." },
    { id: "accueil-08", fichier: "images/hype-accueil-08", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 08", resume: "À trier : accueil ou saut." },
    { id: "accueil-09", fichier: "images/hype-accueil-09", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 09", resume: "À trier : accueil ou saut." },
    { id: "accueil-10", fichier: "images/hype-accueil-10", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 10", resume: "À trier : accueil ou saut." },
    { id: "accueil-11", fichier: "images/hype-accueil-11", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 11", resume: "À trier : accueil ou saut." },
    { id: "accueil-12", fichier: "images/hype-accueil-12", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 12", resume: "À trier : accueil ou saut." }
  ].map(function (a2) {
    return {
      id: a2.id, estAnim: true,
      src: a2.fichier ? { type: "fichier", ref: a2.fichier } : null,
      vignetteUrl: a2.fichier ? (a2.fichier + "-poster.jpg") : null,
      coursId: "", coursTous: [], galop: null, theme: "cheval",
      rang: "approfondir", dureeTranche: "", premium: false, langueVideo: "fr",
      source: a2.dossier, intervenant: "", intervenantRole: null, doc: "",
      titreSource: a2.duree + (a2.poids ? (" · " + a2.poids) : ""), verifie: "2026-07-31",
      i18nTitre: { fr: a2.titre }, i18nResume: { fr: a2.resume }, i18nObserver: null
    };
  });

  /* ---------------- COLLECTIONS ÉDITORIALES ---------------- */
  var COLLS = [
    { id: "hvc-contact", sceau: "◉", format: "affiche",
      nom: { fr: "Le contact, du geste à la sensation", en: "Contact, from gesture to feel", es: "El contacto, del gesto a la sensación", it: "Il contatto, dal gesto alla sensazione", ja: "コンタクト — 動作から感覚へ", de: "Die Anlehnung, von der Hand zum Gefühl", ar: "الاتصال، من الحركة إلى الإحساس", zh: "接触，从动作到感觉", nl: "Het contact, van handeling tot gevoel", pt: "O contato, do gesto à sensação", sv: "Kontakt, från handling till känsla", ru: "Контакт: от движения к ощущению", pl: "Kontakt, od gestu do wyczucia", ko: "접촉, 동작에서 감각까지" },
      sous: { fr: "Le chapitre « Le contact » en vidéo", en: "The Contact chapter, in video", es: "El capítulo « El contacto » en vídeo", it: "Il capitolo « Il contatto » in video", ja: "「コンタクト」の章を動画で", de: "Das Kapitel Anlehnung als Video", ar: "فصل «الاتصال» بالفيديو", zh: "“接触”章节的视频版", nl: "Het hoofdstuk \"Het contact\" in video", pt: "O capítulo “O contato” em vídeo", sv: "Kapitlet ”Kontakt” i videoform", ru: "Глава «Контакт» в видео", pl: "Rozdział „Kontakt” w wideo", ko: "챕터 “접촉”을 영상으로" },
      ids: ["v-contact-01", "v-contact-02", "v-contact-03"] },

    { id: "hvc-aides", sceau: "❖", format: "affiche",
      nom: { fr: "Mieux utiliser ses aides", en: "Using your aids better", es: "Usar mejor tus ayudas", it: "Usare meglio i propri aiuti", ja: "扶助をより上手に使う", de: "Die Hilfen besser einsetzen", ar: "استعمال المساعدات بشكل أفضل", zh: "更好地使用你的扶助", nl: "Je hulpen beter gebruiken", pt: "Usar melhor suas ajudas", sv: "Använd dina hjälper bättre", ru: "Лучше использовать свои помощи", pl: "Lepsze używanie pomocy", ko: "부조를 더 잘 쓰기" },
      sous: { fr: "Le chapitre « L'accord des aides » en vidéo", en: "The Coordination of Aids chapter, in video", es: "El capítulo « El acuerdo de las ayudas » en vídeo", it: "Il capitolo « L'accordo degli aiuti » in video", ja: "「扶助の連携」の章を動画で", de: "Das Kapitel Hilfengebung als Video", ar: "فصل «تنسيق المساعدات» بالفيديو", zh: "“扶助的配合”章节的视频版", nl: "Het hoofdstuk \"De samenwerking van de hulpen\" in video", pt: "O capítulo “A coordenação das ajudas” em vídeo", sv: "Kapitlet ”Hjälparnas samspel” i videoform", ru: "Глава «Согласованность помощей» в видео", pl: "Rozdział „Zgranie pomocy” w wideo", ko: "챕터 “부조의 조화”를 영상으로" },
      ids: ["v-aides-01", "v-aides-02", "v-aides-03"] },

    /* Angle « académie équestre » : on met en avant qui parle, pas seulement
       le sujet. C'est ce qui distingue d'une plateforme de streaming. */
    { id: "hvc-voix", sceau: "❋", format: "liste", parIntervenant: true,
      nom: { fr: "Paroles d'experts", en: "Expert voices", es: "Voces expertas", it: "Voci di esperti", ja: "専門家の声", de: "Stimmen der Fachleute", ar: "كلمات الخبراء", zh: "专家之声", nl: "Experts aan het woord", pt: "Palavra de especialistas", sv: "Experternas röster", ru: "Слово экспертам", pl: "Głosy ekspertów", ko: "전문가의 이야기" },
      sous: { fr: "Juges, vétérinaires et ergonomes, sur le contact", en: "Judges, vets and ergonomists on contact", es: "Jueces, veterinarios y ergónomos, sobre el contacto", it: "Giudici, veterinari ed ergonomi, sul contatto", ja: "審判員・獣医師・エルゴノミストが語るコンタクト", de: "Richter, Tierärzte und Ergonomen zur Anlehnung", ar: "حكام وأطباء بيطريون وأخصائيو بيئة العمل، حول الاتصال", zh: "裁判、兽医和工效学专家谈接触", nl: "Juryleden, dierenartsen en ergonomen over het contact", pt: "Juízes, veterinários e ergonomistas falam sobre o contato", sv: "Domare, veterinärer och ergonomer om kontakt", ru: "Судьи, ветеринары и эргономисты о контакте", pl: "Sędziowie, weterynarze i ergonomowie o kontakcie", ko: "접촉에 대한 심판, 수의사, 인체공학 전문가의 이야기" },
      ids: ["v-contact-01", "v-contact-03", "v-contact-02"] }
  ];

  /* ---------------- UNIVERS ---------------- */
  var UNIVERS = [
    { k: "tous",     nom: { fr: "Tous", en: "All", es: "Todos", it: "Tutti", ja: "すべて", de: "Alle", ar: "الكل", zh: "全部", nl: "Alles", pt: "Todos", sv: "Alla", ru: "Все", pl: "Wszystkie", ko: "전체" } },
    { k: "position", nom: { fr: "Position du cavalier", en: "Rider position", es: "Posición del jinete", it: "Posizione del cavaliere", ja: "騎手の姿勢", de: "Sitz des Reiters", ar: "وضعية الفارس", zh: "骑手的骑姿", nl: "Houding van de ruiter", pt: "Posição do cavaleiro", sv: "Ryttarens position", ru: "Посадка всадника", pl: "Pozycja jeźdźca", ko: "기수의 자세" } },
    { k: "cheval",   nom: { fr: "Comprendre le cheval", en: "Understanding the horse", es: "Entender al caballo", it: "Capire il cavallo", ja: "馬を理解する", de: "Das Pferd verstehen", ar: "فهم الحصان", zh: "读懂马", nl: "Het paard begrijpen", pt: "Entender o cavalo", sv: "Att förstå hästen", ru: "Понимать лошадь", pl: "Zrozumieć konia", ko: "말 이해하기" } },
    { k: "dressage", nom: { fr: "Dressage", en: "Dressage", es: "Doma", it: "Dressage", ja: "馬場馬術", de: "Dressur", ar: "الترويض", zh: "盛装舞步", nl: "Dressuur", pt: "Adestramento", sv: "Dressyr", ru: "Выездка", pl: "Ujeżdżenie", ko: "마장마술" } },
    { k: "obstacle", nom: { fr: "Obstacle", en: "Jumping", es: "Salto", it: "Salto ostacoli", ja: "障害飛越", de: "Springen", ar: "قفز الحواجز", zh: "障碍", nl: "Hindernis", pt: "Salto", sv: "Hoppning", ru: "Преодоление препятствий", pl: "Skoki", ko: "장애물" } },
    { k: "pied",     nom: { fr: "Travail à pied", en: "Groundwork", es: "Trabajo a pie", it: "Lavoro da terra", ja: "地上作業", de: "Bodenarbeit", ar: "العمل على الأرض", zh: "地面训练", nl: "Grondwerk", pt: "Trabalho a pé", sv: "Arbete från marken", ru: "Работа с земли", pl: "Praca z ziemi", ko: "지상 훈련" } },
    { k: "soins",    nom: { fr: "Soins et préparation", en: "Care and preparation", es: "Cuidados y preparación", it: "Cura e preparazione", ja: "手入れと準備", de: "Pflege und Vorbereitung", ar: "العناية والتحضير", zh: "护理与准备", nl: "Verzorging en voorbereiding", pt: "Cuidados e preparação", sv: "Skötsel och förberedelse", ru: "Уход и подготовка", pl: "Opieka i przygotowanie", ko: "케어와 준비" } },
    { k: "sante",    nom: {"fr": "Santé", "en": "Health", "es": "Salud", "it": "Salute", "ja": "健康", "de": "Gesundheit", "ar": "الصحة", "zh": "健康", "nl": "Gezondheid", "pt": "Saúde", "sv": "Hälsa", "ru": "Здоровье", "pl": "Zdrowie", "ko": "건강"} },
    { k: "securite", nom: { fr: "Sécurité", en: "Safety", es: "Seguridad", it: "Sicurezza", ja: "安全", de: "Sicherheit", ar: "السلامة", zh: "安全", nl: "Veiligheid", pt: "Segurança", sv: "Säkerhet", ru: "Безопасность", pl: "Bezpieczeństwo", ko: "안전" } },
    { k: "baby",     nom: { fr: "Hey Baby", en: "Hey Baby", es: "Hey Baby", it: "Hey Baby", ja: "Hey Baby", de: "Hey Baby", ar: "Hey Baby", zh: "Hey Baby", nl: "Hey Baby", pt: "Hey Baby", sv: "Hey Baby", ru: "Hey Baby", pl: "Hey Baby", ko: "Hey Baby" } }
  ];

  var SUGGESTS = ["contact", "accord des aides", "position", "céder", "départ au galop", "coudes", "indépendance des aides", "équilibre"];

  /* ---------------- ÉTAT LOCAL (repli hors ligne / non connecté) ---------------- */
  var CLE_LOCALE = "hype_video_v1";
  function lireLocal() {
    try { return JSON.parse(localStorage.getItem(CLE_LOCALE) || "{}") || {}; } catch (e) { return {}; }
  }
  function ecrireLocal(o) {
    try { localStorage.setItem(CLE_LOCALE, JSON.stringify(o)); } catch (e) { }
  }

  /* Lecture Supabase (silencieuse : jamais bloquante) */
  function chargerDistant(cb) {
    if (typeof supa === "undefined" || typeof utilisateurActuel !== "function") { cb(null); return; }
    utilisateurActuel().then(function (u) {
      if (!u) { cb(null); return; }
      Promise.all([
        supa.from("video_progression").select("video_id,position_sec,duree_sec,terminee,vue_le,maj_le").eq("user_id", u.id),
        supa.from("video_favoris").select("video_id").eq("user_id", u.id)
      ]).then(function (r) {
        var etat = { prog: {}, fav: {} };
        var lp = (r[0] && r[0].data) || [];
        var lf = (r[1] && r[1].data) || [];
        lp.forEach(function (x) { etat.prog[x.video_id] = { ouverte: x.maj_le || null, vue: !!x.terminee, quand: x.vue_le || x.maj_le, pos: x.position_sec || 0, duree: x.duree_sec || 0 }; });
        lf.forEach(function (x) { etat.fav[x.video_id] = true; });
        cb(etat);
      }).catch(function () { cb(null); });
    }).catch(function () { cb(null); });
  }

  /* PAS DE POURCENTAGE DE LECTURE.
     Les vidéos sont jouées par un lecteur externe (YouTube) : l'app ne peut
     pas savoir où le cavalier s'est arrêté. On n'affiche donc jamais de barre
     ni de pourcentage — ce serait un chiffre inventé. On enregistre seulement
     deux faits vrais : la vidéo a été OUVERTE, et elle est marquée VUE.
     « Continuer à regarder » = la dernière ouverte qui n'est pas marquée vue.
     Si un jour Blandine tourne ses propres vidéos, on pourra brancher un vrai
     suivi de lecture : la colonne position_sec existe déjà en base. */
  /* 04/11 (Blandine « Ok » à la reprise de lecture) : on enregistre aussi OÙ l'on s'est arrêté (position, en secondes)
     et la durée, lues dans le lecteur YouTube. position / duree non fournies = on garde celles déjà connues.
     distant:false = seulement sur le téléphone (enregistrements fréquents pendant la lecture). */
  function enregistrerEtat(id, ouverte, terminee, duree, position, distant) {
    var l = lireLocal();
    l.prog = l.prog || {};
    var ex = l.prog[id] || {};
    var pos = (typeof position === "number" && isFinite(position)) ? Math.max(0, Math.round(position)) : (ex.pos || 0);
    var dur = (typeof duree === "number" && isFinite(duree) && duree > 0) ? Math.round(duree) : (ex.duree || 0);
    l.prog[id] = {
      ouverte: ouverte ? new Date().toISOString() : (ex.ouverte || null),
      vue: !!terminee,
      quand: new Date().toISOString(),
      pos: pos, duree: dur
    };
    ecrireLocal(l);
    if (distant === false || typeof supa === "undefined") return;
    try {
      supa.rpc("video_enregistrer_progression", {
        p_video_id: id, p_position_sec: pos,
        p_duree_sec: dur || null, p_terminee: !!terminee
      }).then(function () { }, function () { });
    } catch (e) { }
  }
  /* « 3:12 » ou « 1:04:09 » */
  function hvTemps(s) {
    s = Math.max(0, Math.round(s || 0));
    var hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
    return (hh ? hh + ":" + (mm < 10 ? "0" : "") : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
  }
  /* position utile pour reprendre : ni le tout début, ni les dernières secondes */
  function hvReprise(p) {
    if (!p || p.vue || !(p.pos > 5)) return 0;
    if (p.duree && p.pos > p.duree - 10) return 0;
    return p.pos;
  }
  /* Une vidéo lue jusqu'au bout se marque « Vue » toute seule (réglage, false pour garder seulement le bouton). */
  var MARQUER_VUE_FIN = true;
  /* Le lecteur YouTube officiel (chargé une seule fois, seulement quand on lance une vidéo) */
  var hvYtAttente = null;
  function hvChargerYT(cb) {
    try {
      if (window.YT && window.YT.Player) { cb(window.YT); return; }
      if (!hvYtAttente) {
        hvYtAttente = [];
        var avant = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          try { if (typeof avant === "function") avant(); } catch (e0) { }
          var l = hvYtAttente || []; hvYtAttente = null;
          l.forEach(function (f) { try { f(window.YT); } catch (e1) { } });
        };
        var s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api"; s.async = true;
        s.onerror = function () { hvYtAttente = null; };
        document.head.appendChild(s);
      }
      if (hvYtAttente) hvYtAttente.push(cb);
    } catch (e) { }
  }

  /* Animations écartées. Choix assumé : stockage LOCAL (localStorage), pas
     Supabase. C'est un outil de tri interne, réversible, et un bouton dans
     l'app ne peut de toute façon PAS supprimer un fichier du dépôt GitHub —
     seul un push le peut. « Écarter » masque donc la ligne pour que Blandine
     fasse son tri ; la suppression réelle des fichiers se fait au push
     suivant, sur la liste qu'elle aura constituée. */
  function ecartees() {
    var l = lireLocal(); return l.ecart || {};
  }
  function ecarter(id, actif) {
    var l = lireLocal(); l.ecart = l.ecart || {};
    if (actif) { l.ecart[id] = true; } else { delete l.ecart[id]; }
    ecrireLocal(l);
  }

  function enregistrerFavori(id, actif) {
    var l = lireLocal();
    l.fav = l.fav || {};
    if (actif) { l.fav[id] = true; } else { delete l.fav[id]; }
    ecrireLocal(l);
    if (typeof supa === "undefined" || typeof utilisateurActuel !== "function") return;
    utilisateurActuel().then(function (u) {
      if (!u) return;
      if (actif) {
        supa.from("video_favoris").upsert({ user_id: u.id, video_id: id }).then(function () { }, function () { });
      } else {
        supa.from("video_favoris").delete().eq("user_id", u.id).eq("video_id", id).then(function () { }, function () { });
      }
    }).catch(function () { });
  }

  /* Une vidéo n'entre dans la bibliothèque que si elle a une source réelle.
     Les autres restent dans le fichier comme feuille de route de production
     (titres, points à observer, erreurs, mot du coach déjà écrits) mais ne
     s'affichent nulle part : une page pleine de cartes qui ne mènent à rien
     serait une page vide déguisée.
     Passer MONTRER_A_VENIR à true pour les voir en relecture. */
  var MONTRER_A_VENIR = false;
  /* ============================================================
     04/11 (Blandine : « laisser un espace où les cavaliers puissent ajouter des vidéos qui leur plaisent
     dans chaque partie » ; « il la voit tout de suite et ça reste en ligne, et il peut nous la soumettre
     pour la proposer à d'autres cavaliers ») — VIDÉOS AJOUTÉES PAR LES CAVALIERS.
     Table Supabase videos_cavaliers. statut : perso (visible par son auteur seul) · attente (proposée aux
     autres, en attente de la modératrice) · acceptee (visible par tous, rangée « Proposées par les
     cavaliers ») · refusee (reste visible par son auteur). Liens YouTube seulement.
     ============================================================ */
  /* Interrupteur de l'espace « vidéos des cavaliers » : COUPÉ tant que Blandine n'a pas donné son accord
     (il faut aussi créer la table videos_cavaliers, sql/2026-11-04-videos-cavaliers.sql). */
  var VIDEOS_CAVALIERS = true; // 04/11 17h25 : allumé (Blandine « Fais »), table videos_cavaliers créée
  try { if (window.__HV_VC_ON) VIDEOS_CAVALIERS = true; } catch (eVc) { }
  var VC_CACHE = "hype_vc_cache_v1";
  var VC_TXT = {"banTitre": {"fr": "Ajoute tes vidéos préférées", "en": "Add your favourite videos", "es": "Añade tus vídeos favoritos", "it": "Aggiungi i tuoi video preferiti", "ja": "お気に入りの動画を追加しよう", "de": "Füge deine Lieblingsvideos hinzu", "ar": "أضف فيديوهاتك المفضلة", "zh": "添加你喜欢的视频", "nl": "Voeg je favoriete video's toe", "pt": "Adicione seus vídeos favoritos", "sv": "Lägg till dina favoritvideor", "ru": "Добавь свои любимые видео", "pl": "Dodaj swoje ulubione filmy", "ko": "좋아하는 영상을 추가해 보세요"}, "banSous": {"fr": "Une vidéo YouTube t'a aidé ? Garde-la dans tes favoris, en plus de celles déjà en ligne.", "en": "Did a YouTube video help you? Keep it in your favourites, alongside the ones already here.", "es": "¿Te ha ayudado un vídeo de YouTube? Guárdalo en tus favoritos, junto a los que ya están aquí.", "it": "Un video di YouTube ti ha aiutato? Tienilo nei tuoi preferiti, insieme a quelli già presenti.", "ja": "役に立ったYouTube動画は、ここにある動画と一緒にお気に入りに保存しよう。", "de": "Hat dir ein YouTube-Video geholfen? Speichere es in deinen Favoriten, zusätzlich zu den Videos hier.", "ar": "هل ساعدك فيديو على YouTube؟ احتفظ به في مفضلاتك، إلى جانب الفيديوهات الموجودة هنا.", "zh": "有 YouTube 视频帮到你了吗？把它加入收藏，和这里已有的视频放在一起。", "nl": "Heeft een YouTube-video je geholpen? Bewaar hem bij je favorieten, naast de video's die er al staan.", "pt": "Um vídeo do YouTube te ajudou? Guarde-o nos seus favoritos, junto com os que já estão aqui.", "sv": "Har en YouTube-video hjälpt dig? Spara den bland dina favoriter, utöver de som redan finns här.", "ru": "Тебе помогло видео на YouTube? Сохрани его в избранном, вместе с уже собранными здесь.", "pl": "Pomógł ci film z YouTube? Zachowaj go w ulubionych, obok tych, które już tu są.", "ko": "도움이 된 YouTube 영상이 있나요? 이미 있는 영상과 함께 즐겨찾기에 저장하세요."}, "ajouter": {"fr": "Ajouter une vidéo", "en": "Add a video", "es": "Añadir un vídeo", "it": "Aggiungi un video", "ja": "動画を追加", "de": "Video hinzufügen", "ar": "إضافة فيديو", "zh": "添加视频", "nl": "Video toevoegen", "pt": "Adicionar um vídeo", "sv": "Lägg till en video", "ru": "Добавить видео", "pl": "Dodaj film", "ko": "영상 추가"}, "intro": {"fr": "Une vidéo YouTube t'a aidé ? Garde-la ici, et propose-la aux autres si tu veux.", "en": "Did a YouTube video help you? Keep it here, and share it with others if you like.", "es": "¿Te ha ayudado un vídeo de YouTube? Guárdalo aquí y compártelo con los demás si quieres.", "it": "Un video di YouTube ti ha aiutato? Tienilo qui e proponilo agli altri, se vuoi.", "ja": "役に立ったYouTube動画をここに保存して、よければみんなにも紹介しよう。", "de": "Hat dir ein YouTube-Video geholfen? Bewahre es hier auf und schlage es den anderen vor, wenn du magst.", "ar": "هل ساعدك فيديو على YouTube؟ احتفظ به هنا، واقترحه على الآخرين إن أردت.", "zh": "有 YouTube 视频帮到你了吗？把它存在这里，愿意的话也可以推荐给其他人。", "nl": "Heeft een YouTube-video je geholpen? Bewaar hem hier en stel hem voor aan anderen als je wilt.", "pt": "Um vídeo do YouTube te ajudou? Guarde-o aqui e, se quiser, proponha aos outros.", "sv": "Har en YouTube-video hjälpt dig? Spara den här och tipsa andra om du vill.", "ru": "Тебе помогло видео на YouTube? Сохрани его здесь и, если хочешь, предложи другим.", "pl": "Pomógł ci film z YouTube? Zachowaj go tutaj i, jeśli chcesz, poleć innym.", "ko": "도움이 된 YouTube 영상이 있나요? 여기에 저장하고, 원하면 다른 사람에게도 추천해 보세요."}, "lien": {"fr": "Lien YouTube", "en": "YouTube link", "es": "Enlace de YouTube", "it": "Link di YouTube", "ja": "YouTubeのリンク", "de": "YouTube-Link", "ar": "رابط YouTube", "zh": "YouTube 链接", "nl": "YouTube-link", "pt": "Link do YouTube", "sv": "YouTube-länk", "ru": "Ссылка на YouTube", "pl": "Link do YouTube", "ko": "YouTube 링크"}, "titre": {"fr": "Titre", "en": "Title", "es": "Título", "it": "Titolo", "ja": "タイトル", "de": "Titel", "ar": "العنوان", "zh": "标题", "nl": "Titel", "pt": "Título", "sv": "Titel", "ru": "Название", "pl": "Tytuł", "ko": "제목"}, "note": {"fr": "Pourquoi tu l'aimes (facultatif)", "en": "Why you like it (optional)", "es": "Por qué te gusta (opcional)", "it": "Perché ti piace (facoltativo)", "ja": "気に入った理由（任意）", "de": "Warum du es magst (optional)", "ar": "لماذا يعجبك (اختياري)", "zh": "你喜欢它的原因（选填）", "nl": "Waarom je hem goed vindt (optioneel)", "pt": "Por que você gosta (opcional)", "sv": "Varför du gillar den (valfritt)", "ru": "Чем оно тебе нравится (необязательно)", "pl": "Dlaczego ci się podoba (opcjonalnie)", "ko": "좋아하는 이유 (선택)"}, "theme": {"fr": "Thème", "en": "Topic", "es": "Tema", "it": "Tema", "ja": "テーマ", "de": "Thema", "ar": "الموضوع", "zh": "主题", "nl": "Thema", "pt": "Tema", "sv": "Tema", "ru": "Тема", "pl": "Temat", "ko": "주제"}, "galop": {"fr": "Galop", "en": "Level", "es": "Galop", "it": "Galop", "ja": "ガロー", "de": "Galopp", "ar": "الغالوب", "zh": "Galop", "nl": "Galop", "pt": "Galop", "sv": "Galop", "ru": "Galop", "pl": "Galop", "ko": "Galop"}, "tousG": {"fr": "Tous les Galops", "en": "All levels", "es": "Todos los Galops", "it": "Tutti i Galop", "ja": "すべてのガロー", "de": "Alle Galopps", "ar": "كل مستويات الغالوب", "zh": "所有 Galop", "nl": "Alle Galops", "pt": "Todos os Galops", "sv": "Alla Galop", "ru": "Все уровни Galop", "pl": "Wszystkie poziomy Galop", "ko": "모든 Galop"}, "proposer": {"fr": "Proposer aussi aux autres cavaliers", "en": "Also suggest it to other riders", "es": "Proponerlo también a otros jinetes", "it": "Proponilo anche agli altri cavalieri", "ja": "ほかのライダーにも紹介する", "de": "Auch anderen Reitern vorschlagen", "ar": "اقتراحه أيضًا على الفرسان الآخرين", "zh": "也推荐给其他骑手", "nl": "Ook voorstellen aan andere ruiters", "pt": "Propor também aos outros cavaleiros", "sv": "Tipsa även andra ryttare", "ru": "Предложить и другим всадникам", "pl": "Poleć też innym jeźdźcom", "ko": "다른 라이더에게도 추천하기"}, "proposerInfo": {"fr": "Tu la vois tout de suite. Les autres la verront quand la modératrice l'aura acceptée.", "en": "You see it straight away. Others will see it once the moderator has approved it.", "es": "La ves enseguida. Los demás la verán cuando la moderadora la haya aceptado.", "it": "Lo vedi subito. Gli altri lo vedranno quando la moderatrice l'avrà accettato.", "ja": "あなたにはすぐ表示されます。ほかの人には、モデレーターが承認したあとに表示されます。", "de": "Du siehst es sofort. Die anderen sehen es, sobald die Moderatorin es angenommen hat.", "ar": "تراه فورًا. وسيراه الآخرون بعد أن توافق عليه المشرفة.", "zh": "你马上就能看到。管理员通过后，其他人也能看到。", "nl": "Jij ziet hem meteen. De anderen zien hem zodra de moderator hem heeft goedgekeurd.", "pt": "Você vê na hora. Os outros verão quando a moderadora aprovar.", "sv": "Du ser den direkt. Andra ser den när moderatorn har godkänt den.", "ru": "Ты увидишь его сразу. Остальные — после одобрения модератора.", "pl": "Widzisz go od razu. Inni zobaczą go, gdy moderatorka go zaakceptuje.", "ko": "나는 바로 볼 수 있어요. 다른 사람은 운영자가 승인한 뒤에 볼 수 있어요."}, "valider": {"fr": "Ajouter", "en": "Add", "es": "Añadir", "it": "Aggiungi", "ja": "追加", "de": "Hinzufügen", "ar": "إضافة", "zh": "添加", "nl": "Toevoegen", "pt": "Adicionar", "sv": "Lägg till", "ru": "Добавить", "pl": "Dodaj", "ko": "추가"}, "annuler": {"fr": "Annuler", "en": "Cancel", "es": "Cancelar", "it": "Annulla", "ja": "キャンセル", "de": "Abbrechen", "ar": "إلغاء", "zh": "取消", "nl": "Annuleren", "pt": "Cancelar", "sv": "Avbryt", "ru": "Отмена", "pl": "Anuluj", "ko": "취소"}, "errLien": {"fr": "Ce lien n'est pas une vidéo YouTube.", "en": "This link is not a YouTube video.", "es": "Este enlace no es un vídeo de YouTube.", "it": "Questo link non è un video di YouTube.", "ja": "このリンクはYouTube動画ではありません。", "de": "Dieser Link ist kein YouTube-Video.", "ar": "هذا الرابط ليس فيديو على YouTube.", "zh": "这个链接不是 YouTube 视频。", "nl": "Deze link is geen YouTube-video.", "pt": "Este link não é um vídeo do YouTube.", "sv": "Länken är inte en YouTube-video.", "ru": "Эта ссылка — не видео YouTube.", "pl": "Ten link nie jest filmem z YouTube.", "ko": "이 링크는 YouTube 영상이 아니에요."}, "errTitre": {"fr": "Donne-lui un titre.", "en": "Give it a title.", "es": "Ponle un título.", "it": "Dagli un titolo.", "ja": "タイトルを付けてね。", "de": "Gib ihm einen Titel.", "ar": "أعطه عنوانًا.", "zh": "给它起个标题。", "nl": "Geef hem een titel.", "pt": "Dê um título.", "sv": "Ge den en titel.", "ru": "Дай ему название.", "pl": "Nadaj mu tytuł.", "ko": "제목을 붙여 주세요."}, "errDeja": {"fr": "Tu as déjà ajouté cette vidéo.", "en": "You've already added this video.", "es": "Ya has añadido este vídeo.", "it": "Hai già aggiunto questo video.", "ja": "この動画はもう追加済みです。", "de": "Du hast dieses Video schon hinzugefügt.", "ar": "لقد أضفت هذا الفيديو من قبل.", "zh": "你已经添加过这个视频了。", "nl": "Je hebt deze video al toegevoegd.", "pt": "Você já adicionou este vídeo.", "sv": "Du har redan lagt till den här videon.", "ru": "Ты уже добавил это видео.", "pl": "Ten film już dodałeś.", "ko": "이미 추가한 영상이에요."}, "errCo": {"fr": "Connecte-toi pour ajouter une vidéo.", "en": "Sign in to add a video.", "es": "Inicia sesión para añadir un vídeo.", "it": "Accedi per aggiungere un video.", "ja": "動画を追加するにはログインしてね。", "de": "Melde dich an, um ein Video hinzuzufügen.", "ar": "سجّل الدخول لإضافة فيديو.", "zh": "登录后才能添加视频。", "nl": "Log in om een video toe te voegen.", "pt": "Entre na sua conta para adicionar um vídeo.", "sv": "Logga in för att lägga till en video.", "ru": "Войди, чтобы добавить видео.", "pl": "Zaloguj się, aby dodać film.", "ko": "영상을 추가하려면 로그인하세요."}, "errAutre": {"fr": "Ça n'a pas marché. Réessaie dans un instant.", "en": "That didn't work. Try again in a moment.", "es": "No ha funcionado. Inténtalo de nuevo en un momento.", "it": "Non ha funzionato. Riprova tra poco.", "ja": "うまくいきませんでした。少ししてからもう一度試してね。", "de": "Das hat nicht geklappt. Versuch es gleich noch einmal.", "ar": "لم ينجح ذلك. أعد المحاولة بعد قليل.", "zh": "没有成功，请稍后再试。", "nl": "Dat lukte niet. Probeer het zo opnieuw.", "pt": "Não funcionou. Tente de novo daqui a pouco.", "sv": "Det fungerade inte. Försök igen om en stund.", "ru": "Не получилось. Попробуй ещё раз чуть позже.", "pl": "Nie udało się. Spróbuj za chwilę.", "ko": "잘 되지 않았어요. 잠시 후 다시 시도해 주세요."}, "ok": {"fr": "C'est ajouté ! Tu la retrouves aussi dans tes favoris (Mes vidéos).", "en": "Added! You'll also find it in your favourites (My videos).", "es": "¡Añadido! También lo encontrarás en tus favoritos (Mis vídeos).", "it": "Aggiunto! Lo ritrovi anche nei tuoi preferiti (I miei video).", "ja": "追加しました！お気に入り（マイ動画）にも入っています。", "de": "Hinzugefügt! Du findest es auch in deinen Favoriten (Meine Videos).", "ar": "تمت الإضافة! ستجده أيضًا في مفضلاتك (فيديوهاتي).", "zh": "已添加！你也可以在收藏（我的视频）里找到它。", "nl": "Toegevoegd! Je vindt hem ook bij je favorieten (Mijn video's).", "pt": "Adicionado! Você também o encontra nos seus favoritos (Meus vídeos).", "sv": "Tillagd! Du hittar den även bland dina favoriter (Mina videor).", "ru": "Добавлено! Оно есть и в избранном («Мои видео»).", "pl": "Dodano! Znajdziesz go też w ulubionych (Moje filmy).", "ko": "추가했어요! 즐겨찾기(내 영상)에서도 볼 수 있어요."}, "proposees": {"fr": "Proposées par les cavaliers", "en": "Suggested by riders", "es": "Propuestos por los jinetes", "it": "Proposti dai cavalieri", "ja": "ライダーのおすすめ", "de": "Von Reitern vorgeschlagen", "ar": "مقترحة من الفرسان", "zh": "骑手推荐", "nl": "Voorgesteld door ruiters", "pt": "Propostos pelos cavaleiros", "sv": "Tipsade av ryttare", "ru": "Предложено всадниками", "pl": "Polecane przez jeźdźców", "ko": "라이더 추천 영상"}, "tiennes": {"fr": "Tes vidéos ajoutées", "en": "Videos you added", "es": "Tus vídeos añadidos", "it": "I video che hai aggiunto", "ja": "あなたが追加した動画", "de": "Deine hinzugefügten Videos", "ar": "الفيديوهات التي أضفتها", "zh": "你添加的视频", "nl": "Jouw toegevoegde video's", "pt": "Seus vídeos adicionados", "sv": "Videor du har lagt till", "ru": "Добавленные тобой видео", "pl": "Dodane przez ciebie filmy", "ko": "내가 추가한 영상"}, "par": {"fr": "Proposée par ", "en": "Suggested by ", "es": "Propuesto por ", "it": "Proposto da ", "ja": "おすすめ：", "de": "Vorgeschlagen von ", "ar": "اقترحه ", "zh": "推荐人：", "nl": "Voorgesteld door ", "pt": "Proposto por ", "sv": "Tipsad av ", "ru": "Предложил(а) ", "pl": "Poleca: ", "ko": "추천: "}, "parAnon": {"fr": "Proposée par un cavalier", "en": "Suggested by a rider", "es": "Propuesto por un jinete", "it": "Proposto da un cavaliere", "ja": "ライダーのおすすめ", "de": "Von einem Reiter vorgeschlagen", "ar": "مقترح من أحد الفرسان", "zh": "骑手推荐", "nl": "Voorgesteld door een ruiter", "pt": "Proposto por um cavaleiro", "sv": "Tipsad av en ryttare", "ru": "Предложено всадником", "pl": "Polecane przez jeźdźca", "ko": "라이더 추천"}, "sPerso": {"fr": "Visible par toi seul", "en": "Only you can see it", "es": "Solo lo ves tú", "it": "Lo vedi solo tu", "ja": "あなただけに表示", "de": "Nur für dich sichtbar", "ar": "مرئي لك وحدك", "zh": "仅你可见", "nl": "Alleen zichtbaar voor jou", "pt": "Só você vê", "sv": "Bara du ser den", "ru": "Видно только тебе", "pl": "Widoczny tylko dla ciebie", "ko": "나만 볼 수 있음"}, "sAttente": {"fr": "Proposée · en attente", "en": "Suggested · pending", "es": "Propuesto · en espera", "it": "Proposto · in attesa", "ja": "紹介済み・承認待ち", "de": "Vorgeschlagen · ausstehend", "ar": "مقترح · قيد الانتظار", "zh": "已推荐 · 待审核", "nl": "Voorgesteld · in afwachting", "pt": "Proposto · aguardando", "sv": "Tipsad · väntar", "ru": "Предложено · на проверке", "pl": "Polecony · oczekuje", "ko": "추천함 · 검토 중"}, "sAcceptee": {"fr": "Visible par tous", "en": "Visible to everyone", "es": "Visible para todos", "it": "Visibile a tutti", "ja": "全員に表示", "de": "Für alle sichtbar", "ar": "مرئي للجميع", "zh": "所有人可见", "nl": "Zichtbaar voor iedereen", "pt": "Visível para todos", "sv": "Synlig för alla", "ru": "Видно всем", "pl": "Widoczny dla wszystkich", "ko": "모두에게 공개"}, "sRefusee": {"fr": "Gardée pour toi", "en": "Kept for you", "es": "Guardado para ti", "it": "Tenuto per te", "ja": "あなた用に保存", "de": "Für dich behalten", "ar": "محفوظ لك", "zh": "仅为你保留", "nl": "Voor jou bewaard", "pt": "Guardado para você", "sv": "Sparad åt dig", "ru": "Сохранено для тебя", "pl": "Zachowany dla ciebie", "ko": "나만 보기로 보관"}, "btnProposer": {"fr": "Proposer aux autres", "en": "Suggest to others", "es": "Proponer a los demás", "it": "Proponi agli altri", "ja": "みんなに紹介", "de": "Anderen vorschlagen", "ar": "اقتراح على الآخرين", "zh": "推荐给别人", "nl": "Voorstellen aan anderen", "pt": "Propor aos outros", "sv": "Tipsa andra", "ru": "Предложить другим", "pl": "Poleć innym", "ko": "다른 사람에게 추천"}, "btnRetirer": {"fr": "Retirer la proposition", "en": "Withdraw suggestion", "es": "Retirar la propuesta", "it": "Ritira la proposta", "ja": "紹介を取り消す", "de": "Vorschlag zurückziehen", "ar": "سحب الاقتراح", "zh": "撤回推荐", "nl": "Voorstel intrekken", "pt": "Retirar a proposta", "sv": "Dra tillbaka tipset", "ru": "Отозвать предложение", "pl": "Wycofaj polecenie", "ko": "추천 취소"}, "btnSuppr": {"fr": "Supprimer", "en": "Delete", "es": "Eliminar", "it": "Elimina", "ja": "削除", "de": "Löschen", "ar": "حذف", "zh": "删除", "nl": "Verwijderen", "pt": "Excluir", "sv": "Ta bort", "ru": "Удалить", "pl": "Usuń", "ko": "삭제"}, "ongAjout": {"fr": "Ajoutées", "en": "Added", "es": "Añadidos", "it": "Aggiunti", "ja": "追加した動画", "de": "Hinzugefügt", "ar": "المضافة", "zh": "已添加", "nl": "Toegevoegd", "pt": "Adicionados", "sv": "Tillagda", "ru": "Добавленные", "pl": "Dodane", "ko": "추가한 영상"}, "videAjout1": {"fr": "Tu n'as pas encore ajouté de vidéo.", "en": "You haven't added a video yet.", "es": "Aún no has añadido ningún vídeo.", "it": "Non hai ancora aggiunto video.", "ja": "まだ動画を追加していません。", "de": "Du hast noch kein Video hinzugefügt.", "ar": "لم تضف أي فيديو بعد.", "zh": "你还没有添加视频。", "nl": "Je hebt nog geen video toegevoegd.", "pt": "Você ainda não adicionou nenhum vídeo.", "sv": "Du har inte lagt till någon video än.", "ru": "Ты ещё не добавил ни одного видео.", "pl": "Nie dodałeś jeszcze żadnego filmu.", "ko": "아직 추가한 영상이 없어요."}, "videAjout2": {"fr": "Touche « Ajouter une vidéo » pour garder celles qui t'aident.", "en": "Tap “Add a video” to keep the ones that help you.", "es": "Toca «Añadir un vídeo» para guardar los que te ayudan.", "it": "Tocca «Aggiungi un video» per tenere quelli che ti aiutano.", "ja": "「動画を追加」に触れて、役立つ動画を保存しよう。", "de": "Tippe auf „Video hinzufügen“, um die Videos zu behalten, die dir helfen.", "ar": "المس «إضافة فيديو» لتحتفظ بالفيديوهات التي تساعدك.", "zh": "点“添加视频”，保存对你有帮助的视频。", "nl": "Tik op ‘Video toevoegen’ om de video's te bewaren die je helpen.", "pt": "Toque em «Adicionar um vídeo» para guardar os que te ajudam.", "sv": "Tryck på ”Lägg till en video” för att spara de som hjälper dig.", "ru": "Нажми «Добавить видео», чтобы сохранить полезные ролики.", "pl": "Dotknij „Dodaj film”, aby zachować te, które ci pomagają.", "ko": "‘영상 추가’를 눌러 도움이 되는 영상을 저장하세요."}, "confirmSuppr": {"fr": "Supprimer cette vidéo de ta liste ?", "en": "Remove this video from your list?", "es": "¿Quitar este vídeo de tu lista?", "it": "Togliere questo video dalla tua lista?", "ja": "この動画をリストから削除しますか？", "de": "Dieses Video aus deiner Liste entfernen?", "ar": "هل تريد حذف هذا الفيديو من قائمتك؟", "zh": "要把这个视频从列表中删除吗？", "nl": "Deze video uit je lijst verwijderen?", "pt": "Remover este vídeo da sua lista?", "sv": "Ta bort videon från din lista?", "ru": "Удалить это видео из списка?", "pl": "Usunąć ten film z listy?", "ko": "이 영상을 목록에서 삭제할까요?"}, "fermer": {"fr": "Fermer", "en": "Close", "es": "Cerrar", "it": "Chiudi", "ja": "閉じる", "de": "Schließen", "ar": "إغلاق", "zh": "关闭", "nl": "Sluiten", "pt": "Fechar", "sv": "Stäng", "ru": "Закрыть", "pl": "Zamknij", "ko": "닫기"}, "voirTout": {"fr": "Voir tout", "en": "See all", "es": "Ver todo", "it": "Vedi tutto", "ja": "すべて見る", "de": "Alle ansehen", "ar": "عرض الكل", "zh": "查看全部", "nl": "Alles bekijken", "pt": "Ver tudo", "sv": "Visa alla", "ru": "Смотреть все", "pl": "Zobacz wszystko", "ko": "모두 보기"}, "moins": {"fr": "Réduire", "en": "Show less", "es": "Ver menos", "it": "Mostra meno", "ja": "閉じる", "de": "Weniger", "ar": "عرض أقل", "zh": "收起", "nl": "Minder", "pt": "Ver menos", "sv": "Visa färre", "ru": "Свернуть", "pl": "Zwiń", "ko": "접기"}, "videosTheme": {"fr": "Les vidéos du thème", "en": "Videos in this topic", "es": "Los vídeos del tema", "it": "I video del tema", "ja": "このテーマの動画", "de": "Die Videos zum Thema", "ar": "فيديوهات هذا الموضوع", "zh": "本主题的视频", "nl": "De video's van dit thema", "pt": "Os vídeos do tema", "sv": "Videor i temat", "ru": "Видео по теме", "pl": "Filmy z tego tematu", "ko": "이 주제의 영상"}, "toutes": {"fr": "Toutes", "en": "All", "es": "Todas", "it": "Tutte", "ja": "すべて", "de": "Alle", "ar": "الكل", "zh": "全部", "nl": "Alle", "pt": "Todas", "sv": "Alla", "ru": "Все", "pl": "Wszystkie", "ko": "전체"}, "reprendre": {"fr": "Reprendre", "en": "Continue watching", "es": "Seguir viendo", "it": "Riprendi", "ja": "続きを見る", "de": "Weiterschauen", "ar": "متابعة المشاهدة", "zh": "继续观看", "nl": "Verder kijken", "pt": "Continuar assistindo", "sv": "Fortsätt titta", "ru": "Продолжить просмотр", "pl": "Oglądaj dalej", "ko": "이어서 보기"}, "voirPlus": {"fr": "Voir plus", "en": "See more", "es": "Ver más", "it": "Vedi altro", "ja": "もっと見る", "de": "Mehr anzeigen", "ar": "عرض المزيد", "zh": "查看更多", "nl": "Meer bekijken", "pt": "Ver mais", "sv": "Visa fler", "ru": "Показать ещё", "pl": "Pokaż więcej", "ko": "더 보기"}};
  function vcIdYouTube(lien) {
    var s = String(lien || "").trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    var m = s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }
  function vcVersVideo(r) {
    return {
      id: "vc-" + r.id, vcId: r.id, vcStatut: r.statut, vcAuteur: r.user_id, parCavalier: r.auteur_nom || "",
      src: { type: "youtube", ref: r.yt }, vignetteUrl: "https://i.ytimg.com/vi/" + r.yt + "/hqdefault.jpg",
      coursId: "", coursTous: [], galop: r.galop || 0, theme: r.theme || "dressage", rang: "approfondir",
      dureeTranche: "", premium: false, langueVideo: "", source: "", intervenant: "", intervenantRole: null, doc: "",
      i18nTitre: { fr: r.titre }, i18nResume: r.note ? { fr: r.note } : null, i18nObserver: null
    };
  }
  /* mémoire des vidéos des cavaliers déjà vues : la page de lecture les retrouve même après un rechargement */
  function vcMemoriser(liste) {
    try {
      var m = JSON.parse(localStorage.getItem(VC_CACHE) || "{}") || {};
      liste.forEach(function (v) { m[v.id] = v; });
      var ks = Object.keys(m); if (ks.length > 300) ks.slice(0, ks.length - 300).forEach(function (k) { delete m[k]; });
      localStorage.setItem(VC_CACHE, JSON.stringify(m));
    } catch (e) { }
  }
  function vcDe(id) {
    try { var m = JSON.parse(localStorage.getItem(VC_CACHE) || "{}") || {}; return m[id] || null; } catch (e) { return null; }
  }
  function vcCharger(cb) {
    if (typeof supa === "undefined" || typeof utilisateurActuel !== "function") { cb(null, []); return; }
    utilisateurActuel().then(function (u) {
      if (!u) { cb(null, []); return; }
      supa.from("videos_cavaliers").select("id,user_id,yt,titre,note,galop,theme,statut,auteur_nom,created_at").order("created_at", { ascending: false }).limit(500)
        .then(function (r) {
          var l = ((r && r.data) || []).map(vcVersVideo);
          vcMemoriser(l); cb(u, l);
        }).catch(function () { cb(u, []); });
    }).catch(function () { cb(null, []); });
  }
  function vcAjouter(o) {
    return supa.from("videos_cavaliers").insert(o).select("id").then(function (r) { if (r && r.error) throw r.error; return r; });
  }
  function vcStatut(id, statut) {
    var maj = { statut: statut }; if (statut === "acceptee" || statut === "refusee") maj.repondu_le = new Date().toISOString();
    return supa.from("videos_cavaliers").update(maj).eq("id", id).then(function (r) { if (r && r.error) throw r.error; return r; });
  }
  function vcSupprimer(id) {
    return supa.from("videos_cavaliers").delete().eq("id", id).then(function (r) { if (r && r.error) throw r.error; return r; });
  }

  function disponible(v) { return !!(v && v.src) || MONTRER_A_VENIR; }
  function catalogue() { return VIDS.filter(disponible); }

  /* ---------------- OUTILS ---------------- */
  function vidDe(id) {
    for (var i = 0; i < VIDS.length; i++) { if (VIDS[i].id === id) return VIDS[i]; }
    for (var k = 0; k < VIDS_AV.length; k++) { if (VIDS_AV[k].id === id) return VIDS_AV[k]; }
    for (var j = 0; j < ANIMS.length; j++) { if (ANIMS[j].id === id) return ANIMS[j]; }
    if (String(id || "").indexOf("vc-") === 0) return vcDe(id);
    return null;
  }
  function L(obj, langue) { if (!obj) return ""; return obj[langue] || obj.fr || ""; }

  /* Couverture procédurale : tenir lieu d'image tant qu'aucun visuel
     dédié n'existe. Deux arcs lumineux, teinte par thème. */
  /* Miniature : YouTube sert les vignettes gratuitement et à distance.
     Aucune image à pousser sur GitHub, aucune bande passante Netlify
     consommée. Repli sur le dégradé procédural si la source n'en a pas. */
  function vignette(v) { return (v && v.vignetteUrl) || null; }

  /* Libellé de durée. La passation ne donne pas de durée exacte pour les
     webconférences IFCE : on affiche la tranche, ou rien du tout plutôt
     qu'un chiffre inventé. */
  var TRANCHES = {
    court: { fr: "moins de 3 min", en: "under 3 min", es: "menos de 3 min", it: "meno di 3 min", ja: "3分未満", de: "unter 3 Min", ar: "أقل من 3 دقائق", zh: "不到3分钟", nl: "minder dan 3 min", pt: "menos de 3 min", sv: "under 3 min", ru: "меньше 3 мин", pl: "poniżej 3 min", ko: "3분 미만" },
    moyen: { fr: "3 à 8 min", en: "3 to 8 min", es: "3 a 8 min", it: "da 3 a 8 min", ja: "3〜8分", de: "3 bis 8 Min", ar: "من 3 إلى 8 دقائق", zh: "3到8分钟", nl: "3 tot 8 min", pt: "3 a 8 min", sv: "3 till 8 min", ru: "от 3 до 8 мин", pl: "3 do 8 min", ko: "3~8분" },
    plus8: { fr: "format long", en: "long format", es: "formato largo", it: "formato lungo", ja: "長編", de: "Langformat", ar: "صيغة طويلة", zh: "长视频", nl: "lang formaat", pt: "formato longo", sv: "långt format", ru: "длинный формат", pl: "format długi", ko: "긴 영상" }
  };

  function fondCouv(v) {
    var th = THEMES[v.theme] || { teinte: 198 };
    var h1 = th.teinte, h2 = (h1 + 26) % 360;
    return "radial-gradient(120% 100% at 78% 12%, hsla(" + h2 + ",85%,58%,.40) 0%, transparent 58%),"
         + "radial-gradient(90% 80% at 15% 85%, hsla(" + h1 + ",70%,32%,.55) 0%, transparent 62%),"
         + "linear-gradient(155deg,#0C1520 0%,#070A0F 70%)";
  }

  /* ---------------- CSS (injecté une seule fois) ---------------- */
  var CSS_ID = "hype-video-css";
  var CSS = [
    ".hv-wrap{padding-bottom:26px}",
    /* 26/08 : l'animation et le texte ne se superposent plus (demande
       Blandine). Le titre etait ecrit par-dessus la video, qui porte deja
       le mot HYPE en grand : les deux ecritures se chevauchaient et le
       titre devenait illisible. Meme decision que la bannière d'accueil —
       l'animation passe en flux a son format naturel, le texte descend
       dessous, sur le fond sombre. Elle n'est donc plus voilee ni reduite
       a 60% d'opacite : on la voit enfin en entier. */
    ".hv-hero{position:relative;overflow:hidden;padding:calc(env(safe-area-inset-top) + 30px) 0 24px;",
    "background:radial-gradient(120% 90% at 78% 8%,rgba(32,217,245,.20) 0%,transparent 55%),",
    "radial-gradient(90% 70% at 12% 30%,rgba(20,80,140,.28) 0%,transparent 60%),",
    "linear-gradient(180deg,#07111F 0%,#080B10 62%,#12161C 100%)}",
    ".hv-hero-anim{display:block;width:100%;height:auto;pointer-events:none}",
    /* Simple raccord entre le bas de l'animation et le fond de la page :
       le voile ne sert plus a rendre un texte lisible, il ne couvre donc
       plus toute l'image. */
    ".hv-hero-voile{position:relative;display:block;height:56px;margin-top:-56px;pointer-events:none;",
    "background:linear-gradient(180deg,rgba(8,11,16,0) 0%,rgba(8,11,16,.72) 62%,#080B10 100%)}",
    ".hv-hero-in{position:relative;padding:22px 18px 0}",
    ".hv-hero h1{font-family:'Cinzel',Georgia,serif;font-weight:500;font-size:29px;line-height:1.12;margin:10px 0 0;letter-spacing:.05em;color:#F4F6F7}",
    ".hv-hero h1 span{display:block;color:#20D9F5;text-shadow:0 0 26px rgba(32,217,245,.45)}",
    ".hv-kick{font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#20D9F5;font-weight:500}",
    ".hv-sub{margin:11px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#C3CBD5;opacity:.75}",
    ".hv-stats{display:flex;gap:20px;margin-top:20px}",
    ".hv-stats b{font-family:'Cinzel',serif;font-size:17px;font-weight:500;display:block;color:#F4F6F7}",
    ".hv-stats i{font-style:normal;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#8A95A1}",
    ".hv-rech{margin:18px 18px 0;display:flex;align-items:center;gap:10px;border:1px solid #2A323D;border-radius:14px;padding:12px 14px;",
    "background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03))}",
    ".hv-rech input{flex:1;min-width:0;background:none;border:none;outline:none;color:#F4F6F7;font-family:inherit;font-size:16px;font-weight:300}",
    ".hv-rech input::placeholder{color:#5C6573}",
    ".hv-sugs{display:flex;gap:7px;overflow-x:auto;padding:12px 18px 2px}",
    ".hv-sug{flex:0 0 auto;font-size:10.5px;color:#C3CBD5;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:6px 12px;background:rgba(255,255,255,.02)}",
    ".hv-chips{display:flex;gap:8px;overflow-x:auto;padding:14px 18px 4px}",
    ".hv-chip{flex:0 0 auto;font-size:11px;letter-spacing:.05em;color:#C3CBD5;padding:9px 15px;border-radius:999px;",
    "border:1px solid #2A323D;background:rgba(255,255,255,.025);white-space:nowrap;transition:all .25s}",
    ".hv-chip.on{color:#031015;font-weight:600;border-color:transparent;background:linear-gradient(135deg,#7DEBFF,#20D9F5);box-shadow:0 0 24px rgba(32,217,245,.42)}",
    ".hv-filtres{flex:0 0 auto;display:flex;align-items:center;gap:7px;font-size:11px;color:#20D9F5;",
    "border:1px solid rgba(32,217,245,.35);border-radius:999px;padding:9px 14px;background:rgba(32,217,245,.07);white-space:nowrap}",
    ".hv-sec{padding:0 18px;margin-top:32px}",
    ".hv-sec h2{font-family:'Cinzel',serif;font-size:16px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;margin:0;color:#F4F6F7}",
    ".hv-sec p{font-size:11.5px;color:#8A95A1;margin:4px 0 0;line-height:1.5}",
    ".hv-cov{position:relative;overflow:hidden;background:#1B212A}",
    ".hv-cov .hv-arc{position:absolute;inset:0;opacity:.75}",
    ".hv-cov .hv-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(4,6,9,.55) 72%,rgba(4,6,9,.92) 100%)}",
    ".hv-duree{position:absolute;bottom:8px;right:8px;font-size:9.5px;letter-spacing:.1em;font-family:'Cinzel',serif;",
    "background:rgba(4,6,9,.7);border:1px solid rgba(255,255,255,.1);padding:3px 7px;border-radius:6px;color:#F4F6F7}",
    ".hv-gal{position:absolute;top:8px;left:8px;font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:.12em;color:#C3CBD5;",
    "background:rgba(4,6,9,.6);border:1px solid rgba(255,255,255,.12);padding:3px 8px;border-radius:6px}",
    ".hv-tag{position:absolute;top:8px;right:8px;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;padding:3px 8px;border-radius:6px}",
    ".hv-tag-soon{background:rgba(4,6,9,.72);color:#C3CBD5;border:1px solid rgba(255,255,255,.16)}",
    ".hv-tag-vue{background:rgba(4,6,9,.68);color:#8A95A1;border:1px solid rgba(255,255,255,.14)}",
    ".hv-lock{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(4,6,9,.55);font-size:18px}",
    ".hv-prog{position:absolute;left:0;right:0;bottom:0;height:2.5px;background:rgba(255,255,255,.14)}",
    ".hv-prog i{display:block;height:100%;background:linear-gradient(90deg,#20D9F5,#7DEBFF);box-shadow:0 0 10px rgba(32,217,245,.8)}",
    ".hv-sous{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#6E7A87;margin:3px 0 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-family:'Montserrat',sans-serif}",
    ".hv-rail{display:flex;gap:12px;overflow-x:auto;padding:2px 18px 6px}",
    ".hv-carte{flex:0 0 148px;text-align:left;background:none;border:none;padding:0;color:inherit}",
    ".hv-carte .hv-cov{aspect-ratio:2/3;border-radius:14px;border:1px solid #2A323D}",
    ".hv-carte h4{font-size:12px;font-weight:400;line-height:1.35;margin:9px 0 0;color:#F4F6F7;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
    ".hv-carte p{font-size:9.5px;color:#8A95A1;margin:4px 0 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".hv-large{flex:0 0 250px;text-align:left;background:none;border:none;padding:0;color:inherit}",
    ".hv-large .hv-cov{aspect-ratio:16/9;border-radius:14px;border:1px solid #2A323D}",
    ".hv-large h4{font-size:12.5px;font-weight:400;line-height:1.35;margin:9px 0 0;color:#F4F6F7}",
    ".hv-large p{font-size:9.5px;color:#8A95A1;margin:4px 0 0}",
    ".hv-ligne{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05);background:none;border-left:none;border-right:none;border-top:none;color:inherit}",
    ".hv-ligne .hv-num{font-family:'Cinzel',serif;font-size:13px;color:#3E4B57;width:18px;flex:0 0 18px;text-align:center}",
    ".hv-ligne .hv-cov{width:78px;flex:0 0 78px;aspect-ratio:16/10;border-radius:10px;border:1px solid #2A323D}",
    ".hv-ligne h4{font-size:12.5px;font-weight:400;margin:0;line-height:1.35;color:#F4F6F7;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
    ".hv-ligne .hv-meta{font-size:9.5px;color:#8A95A1;margin:5px 0 0;letter-spacing:.05em}",
    ".hv-fav{flex:0 0 auto;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#5C6573;background:none;border:none}",
    ".hv-fav.on{color:#20D9F5}",
    ".hv-une{position:relative;margin:0 18px;border-radius:22px;overflow:hidden;border:1px solid #2A323D;box-shadow:0 24px 60px -22px rgba(0,0,0,.95)}",
    ".hv-une{background:linear-gradient(180deg,#0C1420,#080B10)}",
    ".hv-une .hv-cov{aspect-ratio:16/9}",
    ".hv-une-txt{position:relative;padding:16px 18px 18px}",
    ".hv-une-txt h3{font-family:'Cinzel',serif;font-weight:500;font-size:19px;line-height:1.22;margin:8px 0 0;color:#F4F6F7;",
    "overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}",
    ".hv-une-txt .hv-desc{font-size:11.5px;color:#AAB6C2;line-height:1.55;margin:9px 0 0;",
    "overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}",
    ".hv-minis{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-top:12px}",
    ".hv-mini{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#C3CBD5;border:1px solid rgba(255,255,255,.14);border-radius:6px;padding:3px 8px;background:rgba(255,255,255,.03)}",
    ".hv-act{display:flex;gap:10px;margin-top:16px}",
    ".hv-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 14px;border-radius:12px;",
    "font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;border:none;font-family:inherit}",
    ".hv-btn-p{background:linear-gradient(135deg,#7DEBFF,#20D9F5);color:#031015;box-shadow:0 8px 30px -8px rgba(32,217,245,.7)}",
    ".hv-btn-s{background:rgba(255,255,255,.05);border:1px solid #2A323D;color:#F4F6F7;flex:0 0 auto;width:54px}",
    ".hv-btn-s.on{color:#20D9F5;border-color:rgba(32,217,245,.35);background:rgba(32,217,245,.1)}",
    ".hv-repr{margin:0 18px;display:flex;gap:13px;align-items:stretch;border:1px solid rgba(32,217,245,.22);border-radius:18px;padding:11px;",
    "background:linear-gradient(120deg,rgba(32,217,245,.10),rgba(255,255,255,.03) 55%);width:calc(100% - 36px);text-align:left;color:inherit}",
    ".hv-repr .hv-cov{width:104px;flex:0 0 104px;aspect-ratio:1/1;border-radius:12px}",
    ".hv-repr h4{font-size:13px;font-weight:500;margin:0;line-height:1.3;color:#F4F6F7}",
    ".hv-repr .hv-lie{font-size:10px;color:#8A95A1;margin:5px 0 0}",
    ".hv-barre{height:3px;border-radius:2px;background:rgba(255,255,255,.13);margin-top:10px;overflow:hidden}",
    ".hv-barre i{display:block;height:100%;background:linear-gradient(90deg,#20D9F5,#7DEBFF)}",
    ".hv-coll{margin-top:30px}",
    ".hv-coll-tete{display:flex;align-items:center;gap:11px;padding:0 18px;margin-bottom:12px}",
    ".hv-sceau{width:34px;height:34px;flex:0 0 34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;",
    "border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#20D9F5}",
    ".hv-coll-tete h3{font-family:'Cinzel',serif;font-size:14px;font-weight:500;letter-spacing:.07em;margin:0;line-height:1.25;color:#F4F6F7}",
    ".hv-coll-tete p{font-size:10px;color:#8A95A1;margin:3px 0 0}",
    ".hv-fil{height:1px;margin:0 18px 14px;background:linear-gradient(90deg,rgba(32,217,245,.35),transparent)}",
    ".hv-galops{padding:24px 0 6px;margin-top:30px;background:radial-gradient(80% 100% at 50% 100%,rgba(32,217,245,.09),transparent 70%)}",
    ".hv-gscroll{display:flex;overflow-x:auto;padding:0 18px;align-items:flex-start}",
    ".hv-gnode{flex:0 0 74px;position:relative;display:flex;flex-direction:column;align-items:center;padding-top:6px;background:none;border:none;color:inherit}",
    ".hv-gnode:before{content:'';position:absolute;top:36px;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(32,217,245,.12),rgba(32,217,245,.30),rgba(32,217,245,.12))}",
    ".hv-gnode:first-child:before{left:50%}.hv-gnode:last-child:before{right:50%}",
    ".hv-cristal{position:relative;z-index:2;width:52px;height:60px;display:flex;align-items:center;justify-content:center;",
    "-webkit-clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%);clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%);",
    "background:linear-gradient(160deg,rgba(255,255,255,.13),rgba(255,255,255,.03));transition:all .3s}",
    ".hv-cristal b{font-family:'Cinzel',serif;font-size:19px;font-weight:500;color:#C3CBD5}",
    ".hv-gnode.on .hv-cristal{background:linear-gradient(160deg,#8DEEFF,#20D9F5);transform:translateY(-3px) scale(1.06);box-shadow:0 0 34px rgba(32,217,245,.55)}",
    ".hv-gnode.on .hv-cristal b{color:#031015}",
    ".hv-gnode small{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:#8A95A1;margin-top:7px}",
    ".hv-gnode.on small{color:#20D9F5}",
    ".hv-gnode em{font-style:normal;font-size:8px;color:#4C5A66;margin-top:2px}",
    ".hv-ongl{display:flex;gap:6px;margin:0 18px 14px;background:rgba(255,255,255,.035);border:1px solid #2A323D;border-radius:12px;padding:4px}",
    ".hv-ongl button{flex:1;font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;padding:9px 4px;border-radius:9px;color:#8A95A1;font-weight:500;background:none;border:none;font-family:inherit}",
    ".hv-ongl button.on{background:rgba(32,217,245,.13);color:#20D9F5;box-shadow:inset 0 0 0 1px rgba(32,217,245,.25)}",
    ".hv-vide{padding:24px 18px;text-align:center}",
    ".hv-vide p{font-size:12px;color:#8A95A1;line-height:1.6;margin:0}",
    ".hv-vide .hv-s2{font-size:10.5px;color:#5C6573;margin-top:7px}",
    ".hv-grille{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:0 18px}",
    ".hv-grille .hv-carte{flex:none;width:100%}",
    ".hv-compte{padding:0 18px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#8A95A1;margin-bottom:14px}",
    ".hv-compte b{color:#20D9F5}",
    ".hv-retourmenu{display:flex;align-items:center;gap:8px;margin:0 18px 14px;padding:11px 15px;border-radius:12px;",
    "border:1px solid rgba(32,217,245,.30);background:rgba(32,217,245,.08);color:#20D9F5;font-family:inherit;",
    "font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:600;width:calc(100% - 36px)}",
    ".hv-voile-m{position:fixed;inset:0;background:rgba(3,4,6,.72);z-index:80}",
    ".hv-feuille{position:fixed;left:0;right:0;bottom:0;z-index:90;max-width:520px;margin:0 auto;background:linear-gradient(180deg,#111720,#080B10);",
    "border-top:1px solid rgba(32,217,245,.35);border-radius:22px 22px 0 0;padding:8px 18px calc(24px + env(safe-area-inset-bottom));max-height:82vh;overflow-y:auto}",
    ".hv-poignee{width:38px;height:4px;border-radius:2px;background:rgba(255,255,255,.18);margin:6px auto 16px}",
    ".hv-fg{margin-bottom:18px}",
    ".hv-fg h5{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:#20D9F5;margin:0 0 10px;font-weight:500}",
    ".hv-fo{display:flex;flex-wrap:wrap;gap:7px}",
    ".hv-fo button{font-size:11px;color:#C3CBD5;border:1px solid #2A323D;border-radius:999px;padding:8px 13px;background:rgba(255,255,255,.025);font-family:inherit}",
    ".hv-fo button.on{background:rgba(32,217,245,.14);border-color:rgba(32,217,245,.35);color:#20D9F5;font-weight:500}",
    /* page de lecture */
    ".hv-lect{min-height:100vh;background:#12161C}",
    ".hv-lecteur{position:relative;aspect-ratio:16/9;background:#000;overflow:hidden}",
    ".hv-retour{position:absolute;top:calc(env(safe-area-inset-top) + 12px);left:12px;z-index:5;width:36px;height:36px;border-radius:50%;",
    "background:rgba(4,6,9,.6);border:1px solid #2A323D;display:flex;align-items:center;justify-content:center;font-size:15px;color:#F4F6F7}",
    ".hv-soon{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;text-align:center;padding:0 24px}",
    ".hv-soon b{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#20D9F5;font-weight:500}",
    ".hv-soon span{font-size:11.5px;color:#8A95A1;line-height:1.55}",
    ".hv-corps{padding:20px 18px calc(40px + env(safe-area-inset-bottom))}",
    ".hv-corps h2{font-family:'Cinzel',serif;font-size:21px;font-weight:500;line-height:1.22;margin:10px 0 0;color:#F4F6F7}",
    ".hv-corps .hv-d{font-size:12.5px;line-height:1.65;color:#B4C0CC;margin:15px 0 0;font-weight:300}",
    ".hv-lien{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:18px;padding:13px 15px;border-radius:14px;",
    "border:1px solid #2A323D;background:linear-gradient(120deg,rgba(32,217,245,.09),rgba(255,255,255,.02));width:100%;text-align:left;color:inherit;font-family:inherit}",
    ".hv-lien .hv-k{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#20D9F5;display:block}",
    ".hv-lien .hv-t{font-size:13px;font-weight:500;margin-top:4px;display:block;color:#F4F6F7}",
    ".hv-bloc{margin-top:24px;border:1px solid #2A323D;border-radius:16px;padding:16px 15px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))}",
    ".hv-bloc.obs{border-color:rgba(32,217,245,.24);background:linear-gradient(180deg,rgba(32,217,245,.075),rgba(255,255,255,.012))}",
    ".hv-bloc h5{font-family:'Cinzel',serif;font-size:12.5px;font-weight:500;letter-spacing:.08em;margin:0 0 12px;color:#F4F6F7}",
    ".hv-bloc.obs h5{color:#20D9F5}",
    ".hv-li{list-style:none;margin:0;padding:0}",
    ".hv-li li{font-size:12px;line-height:1.5;color:#C2CDD8;padding:8px 0 8px 26px;position:relative;border-bottom:1px solid rgba(255,255,255,.05)}",
    ".hv-li li:last-child{border-bottom:none}",
    ".hv-li li:before{content:'';position:absolute;left:6px;top:15px;width:6px;height:6px;border-radius:50%;background:#20D9F5;box-shadow:0 0 10px rgba(32,217,245,.8)}",
    ".hv-li.err li:before{background:#FF8B6B;box-shadow:0 0 10px rgba(255,139,107,.7)}",
    ".hv-coach{font-size:12.5px;line-height:1.65;color:#C2CDD8;margin:0;font-style:italic;font-weight:300;font-family:'Cormorant Garamond',Georgia,serif}",
    ".hv-vue{flex:1;padding:13px;border-radius:12px;border:1px solid #2A323D;background:rgba(255,255,255,.04);color:#F4F6F7;",
    "font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:600;font-family:inherit}",
    ".hv-vue.on{border-color:rgba(32,217,245,.35);background:rgba(32,217,245,.13);color:#20D9F5}",
    /* 21/10 (tests Blandine, probleme 5) : grand ecran. Contenu centre (1240 px), animation d en-tete limitee en hauteur,
       rails horizontaux remplaces par des grilles (3 a 6 affiches selon la largeur). Telephone : rails inchanges. */
    "@media (min-width:768px){.hv-wrap>*:not(.hv-hero),.hv-hero-in{max-width:1240px;margin-left:auto;margin-right:auto;box-sizing:border-box}" +
    ".hv-hero-anim{max-height:460px;object-fit:cover}" +
    ".hv-rail{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));overflow:visible;gap:18px}" +
    ".hv-rail.hv-rail-l{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}" +
    ".hv-rail .hv-carte,.hv-rail .hv-large{flex:none;width:auto;min-width:0}" +
    ".hv-grille{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:18px}" +
    ".hv-une,.hv-repr{max-width:880px}}"
  ].join("");

  function injecterCss() {
    if (typeof document === "undefined") return;
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement("style");
    st.id = CSS_ID; st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ============================================================
     04/11/2026 — REFONTE DE L'ACCUEIL (brief Blandine « HYPE — REFONTE DE
     L'ACCUEIL VIDÉOTHÈQUE » + maquette, onglets de Galops à la place de la
     liste verticale). Ordre : en-tête photo · Mes vidéos + recherche ·
     onglets des Galops · cartes photo des thèmes · fin de page (index.html).
     Retirés de l'accueil (règle : pas de doublon, pas de filtres empilés) :
     statistiques, suggestions, puces d'univers, feuille de filtres,
     « Continuer à regarder », « À la une », « Explorer par Galop »,
     collections. Les données (COLLS, etc.) restent dans le fichier.
     ============================================================ */

  /* ---- PHOTOS : configuration centrale (Blandine choisit les photos) ----
     Une photo par thème, la même quel que soit le Galop choisi. Pour
     changer une photo : remplacer img (fichier dans images/), ajuster pos
     (cadrage, comme object-position) et l'alt. Cette même association
     servira d'en-tête à la future page de chaque thème
     (window.HYPE_VIDEO.photosThemes). Photos PROVISOIRES au 04/11 : prises
     parmi les images déjà dans le dépôt, en attendant son choix. */
  var THEMES_ORDRE = ["dressage", "obstacle", "pied", "soins", "sante", "position", "cheval", "securite"]; /* 04/11 16h45 : + Santé (Blandine) */
  var PHOTOS_THEMES = {
    dressage: { img: "images/theme-dressage-bai-trot.webp" /* 04/11 18h08 : sa photo (bai au trot, fond noir) ; avant : galop7-tmp-16-bai-brun-rond.webp, gardée pour le bandeau « Ajoute tes vidéos préférées » */, pos: "55% 45%",
      alt: {"fr": "Cavalière au trot sur un cheval bai brun, fond noir", "en": "Rider trotting on a dark bay horse, black background", "es": "Amazona al trote sobre un caballo castaño oscuro, fondo negro", "it": "Amazzone al trotto su un cavallo baio scuro, sfondo nero", "ja": "黒鹿毛の馬に乗って速歩をするライダー、黒い背景", "de": "Reiterin im Trab auf einem dunkelbraunen Pferd, schwarzer Hintergrund", "ar": "فارسة تخبّ على حصان كميت داكن، خلفية سوداء", "zh": "骑手骑着深骝毛马快步，黑色背景", "nl": "Amazone in draf op een donkerbruin paard, zwarte achtergrond", "pt": "Amazona ao trote num cavalo castanho escuro, fundo preto", "sv": "Ryttare i trav på en mörkbrun häst, svart bakgrund", "ru": "Всадница на рыси на тёмно-гнедой лошади, чёрный фон", "pl": "Amazonka kłusem na ciemnogniadym koniu, czarne tło", "ko": "흑갈색 말을 타고 속보하는 라이더, 검은 배경"} },
    obstacle: { img: "images/theme-obstacle-saut-noir-cadre.webp" /* 04/11 15h45 (Blandine : « utilise-la pour obstacle ») ; 15h55 recadrée serré sur le cheval (« agrandir le cheval, éviter le vide en haut ») — original : images/theme-obstacle-saut-noir.webp ; avant : images/galop5-video-saut.webp */, pos: "50% 42%",
      alt: {"fr": "Cavalière et cheval bai brun en plein saut, sur fond noir", "en": "Rider and dark bay horse mid-jump, on a black background", "es": "Amazona y caballo castaño oscuro en pleno salto, sobre fondo negro", "it": "Amazzone e cavallo baio scuro in pieno salto, su sfondo nero", "ja": "黒い背景で跳躍する騎手と黒鹿毛の馬", "de": "Reiterin und dunkelbraunes Pferd im Sprung vor schwarzem Hintergrund", "ar": "فارسة وحصان كميت داكن في منتصف القفزة على خلفية سوداء", "zh": "黑色背景下腾空跳跃的骑手和深骝毛马", "nl": "Ruiter en donkerbruin paard midden in de sprong, op een zwarte achtergrond", "pt": "Amazona e cavalo castanho escuro em pleno salto, sobre fundo preto", "sv": "Ryttare och mörkbrun häst mitt i språnget mot svart bakgrund", "ru": "Всадница и тёмно-гнедая лошадь в прыжке на чёрном фоне", "pl": "Amazonka i ciemnogniady koń w locie nad przeszkodą, na czarnym tle", "ko": "검은 배경에서 점프하는 기수와 흑갈색 말"} },
    pied: { img: "images/securite-g1-longe.webp", pos: "50% 50%",
      alt: { fr: "Mains tenant une longe près de la tête d'un cheval bai", en: "Hands holding a lead rope near a bay horse's head", es: "Manos sujetando un ramal junto a la cabeza de un caballo castaño", it: "Mani che tengono una longhina vicino alla testa di un cavallo baio", ja: "鹿毛の馬の頭の近くで引き綱を持つ手", de: "Hände halten einen Strick neben dem Kopf eines braunen Pferdes", ar: "يدان تمسكان الرسن قرب رأس حصان كميت", zh: "在枣骝马头旁握着牵绳的双手", nl: "Handen met een halstertouw bij het hoofd van een bruin paard", pt: "Mãos segurando uma guia perto da cabeça de um cavalo castanho", sv: "Händer som håller ett grimskaft nära huvudet på en brun häst", ru: "Руки держат чомбур у головы гнедой лошади", pl: "Dłonie trzymające uwiąz przy głowie gniadego konia", ko: "갈색 말의 머리 옆에서 리드로프를 잡은 손" } },
    soins: { img: "images/pansage-hero.webp", pos: "62% 40%",
      alt: { fr: "Jeune cavalier brossant un cheval bai", en: "Young rider grooming a bay horse", es: "Joven jinete cepillando un caballo castaño", it: "Giovane cavaliere che spazzola un cavallo baio", ja: "鹿毛の馬にブラシをかける若いライダー", de: "Junger Reiter putzt ein braunes Pferd", ar: "فارس شاب ينظف حصانا كميتا بالفرشاة", zh: "年轻骑手为枣骝马刷毛", nl: "Jonge ruiter borstelt een bruin paard", pt: "Jovem cavaleiro escovando um cavalo castanho", sv: "Ung ryttare som borstar en brun häst", ru: "Юный всадник чистит гнедую лошадь", pl: "Młody jeździec czyszczący gniadego konia", ko: "갈색 말을 솔질하는 어린 기수" } },
    position: { img: "images/theme-position-cavalier-noir.webp" /* 04/11 15h46 (Blandine : « et celle-là pour position cavalier ») ; avant : images/galop5-theme-cheval.webp */, pos: "26% 40%",
      alt: {"fr": "Jeune cavalier au trot sur un cheval noir, sur fond noir", "en": "Young rider trotting on a black horse, on a black background", "es": "Joven jinete al trote sobre un caballo negro, sobre fondo negro", "it": "Giovane cavaliere al trotto su un cavallo morello, su sfondo nero", "ja": "黒い背景で青毛の馬に乗って速歩する若い騎手", "de": "Junger Reiter im Trab auf einem Rappen vor schwarzem Hintergrund", "ar": "فارس شاب يخبّ على حصان أسود على خلفية سوداء", "zh": "黑色背景下骑着黑马快步的年轻骑手", "nl": "Jonge ruiter in draf op een zwart paard, op een zwarte achtergrond", "pt": "Jovem cavaleiro ao trote num cavalo preto, sobre fundo preto", "sv": "Ung ryttare i trav på en svart häst mot svart bakgrund", "ru": "Юный всадник на вороной лошади рысью, на чёрном фоне", "pl": "Młody jeździec w kłusie na karym koniu, na czarnym tle", "ko": "검은 배경에서 흑마를 타고 속보하는 젊은 기수"} },
    cheval: { img: "images/securite-g1-inquiet.webp", pos: "45% 40%",
      alt: { fr: "Tête d'un cheval alezan en gros plan, regard attentif", en: "Close-up of a chestnut horse's head, watchful look", es: "Primer plano de la cabeza de un caballo alazán, mirada atenta", it: "Primo piano della testa di un cavallo sauro, sguardo attento", ja: "栗毛の馬の頭部のアップ、注意深いまなざし", de: "Nahaufnahme eines Fuchskopfes, aufmerksamer Blick", ar: "رأس حصان أشقر عن قرب، بنظرة منتبهة", zh: "栗色马头部特写，目光警觉", nl: "Close-up van het hoofd van een vos, alerte blik", pt: "Close da cabeça de um cavalo alazão, olhar atento", sv: "Närbild på en fux huvud, vaksam blick", ru: "Голова рыжей лошади крупным планом, внимательный взгляд", pl: "Zbliżenie głowy kasztanowatego konia, czujne spojrzenie", ko: "주의 깊은 눈빛의 밤색 말 머리 클로즈업" } },
    sante: { img: "images/theme-sante-bai-repos.webp" /* 04/11 16h46 (Blandine : « mets cette photo-là dans l'onglet Santé ») */, pos: "62% 40%",
      alt: {"fr": "Cheval bai, tête baissée et yeux mi-clos, au repos, sur fond noir", "en": "Bay horse resting, head lowered and eyes half closed, on a black background", "es": "Caballo castaño en reposo, cabeza baja y ojos entornados, sobre fondo negro", "it": "Cavallo baio a riposo, testa bassa e occhi socchiusi, su sfondo nero", "ja": "黒い背景で頭を下げ、目を半分閉じて休む鹿毛の馬", "de": "Braunes Pferd in Ruhe, Kopf gesenkt, Augen halb geschlossen, vor schwarzem Hintergrund", "ar": "حصان كميت يستريح، رأسه منخفض وعيناه نصف مغمضتين، على خلفية سوداء", "zh": "黑色背景下低头半闭着眼休息的骝毛马", "nl": "Bruin paard in rust, hoofd omlaag en ogen half dicht, op een zwarte achtergrond", "pt": "Cavalo castanho em repouso, cabeça baixa e olhos semicerrados, sobre fundo preto", "sv": "Brun häst i vila med sänkt huvud och halvslutna ögon, mot svart bakgrund", "ru": "Гнедая лошадь отдыхает, опустив голову и прикрыв глаза, на чёрном фоне", "pl": "Gniady koń odpoczywa z opuszczoną głową i przymkniętymi oczami, na czarnym tle", "ko": "검은 배경에서 고개를 숙이고 눈을 반쯤 감은 채 쉬는 갈색 말"} },
    securite: { img: "images/securite-g1-tenue.webp", pos: "40% 45%",
      alt: { fr: "Cavalière casquée en tenue, à côté de son cheval bai", en: "Rider in a helmet and riding gear next to her bay horse", es: "Amazona con casco y equipación, junto a su caballo castaño", it: "Amazzone con casco e abbigliamento da equitazione, accanto al suo cavallo baio", ja: "ヘルメットと装備を身につけ、鹿毛の馬の横に立つライダー", de: "Reiterin mit Helm und Reitkleidung neben ihrem braunen Pferd", ar: "فارسة بخوذة وزيّ ركوب بجانب حصانها الكميت", zh: "戴头盔、穿骑乘装备的骑手站在她的枣骝马旁", nl: "Ruiter met cap en rijkleding naast haar bruine paard", pt: "Amazona de capacete e roupa de montaria ao lado do seu cavalo castanho", sv: "Ryttare med hjälm och ridkläder bredvid sin bruna häst", ru: "Всадница в шлеме и экипировке рядом со своей гнедой лошадью", pl: "Amazonka w kasku i stroju jeździeckim obok gniadego konia", ko: "헬멧과 승마복을 갖춘 기수와 그녀의 갈색 말" } }
  };
  /* En-tête : cheval bai tressé, sans texte ni bouton cuits dans l'image.
     Trois cadrages (téléphone / tablette / ordinateur). Pour la remplacer :
     changer img et ajuster les trois pos. */
  var PHOTO_HERO = { img: "images/galops-carte-cours-bai.webp", posTel: "66% 22%", posTab: "64% 36%", posOrdi: "60% 34%" };
  /* Pas de vidéo d'introduction réelle au 04/11 : pas de bouton lecture
     dans l'en-tête. Le jour où elle existe, mettre ici son identifiant
     (catalogue) et le bouton apparaît. */
  var VIDEO_INTRO = null;

  /* TRAITEMENT D'AFFICHAGE DES PHOTOS (demande du brief) : réversible et
     réglable ici seulement. Le fichier n'est jamais modifié. actif:false
     rend les photos telles quelles. Ne s'applique pas aux lecteurs YouTube. */
  /* Composition ordinateur : "A" ou "B" (voir CSS). Le banc d'essai peut la forcer par window.__hvDesignOrdi. */
  var DESIGN_ORDI = "E";   /* 04/11 09h26 : version E choisie par Blandine */
  /* Style des onglets de Galops : "1" à "4" (propositions du 04/11, toujours semi-transparents, dégradé, ombre). */
  var STYLE_ONGLETS = "1";   /* 04/11 09h25 : style 1 choisi par Blandine */
  /* Onglets « serrés » (04/11 09h26, Blandine : « tous horizontaux serrés comme c'était prévu au début ») :
     les 8 onglets tiennent sur une seule ligne, sans défilement ; « Galop » en petit au-dessus du numéro,
     « Prochainement » remplacé par un onglet atténué. Proposition, en attente de validation. */
  var ONGLETS_SERRES = false;   /* 04/11 09h30 : refusé par Blandine (« moche ») */
  /* Bloc « Choisis ton Galop » de la maquette (seuls les Galops qui ont des vidéos, sur une ligne). */
  var CHOIX_GALOP_MAQUETTE = true;
  var TRAITEMENT_PHOTO = { actif: true, filtre: "saturate(.92) contrast(1.05) brightness(.95) sepia(.07)", bords: .5 };

  /* Onglets des Galops. « 7+ » regroupe les Galops 7, 8 et 9. */
  var ONGLETS_GALOPS = ["tous", 1, 2, 3, 4, 5, 6, "7+"];
  function galopOk(v, k) {
    if (k === "tous") return true;
    if (k === "7+") return (v.galop || 0) >= 7;
    return v.galop === k;
  }

  var CSS2_ID = "hype-video-css-2";
  var CSS2 = [
    ".hv2{--hv-noir:#070A08;--hv-p1:rgba(16,26,29,.74);--hv-p2:rgba(16,29,34,.82);--hv-og:rgba(16,26,29,.45);--hv-og-on:linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95));--hv-pan:linear-gradient(180deg,rgba(16,29,34,.96),rgba(12,21,25,.98));--hv-iv:#F3EEE4;--hv-iv2:rgba(243,238,228,.64);--hv-iv3:rgba(243,238,228,.40);--hv-ch:#C9A66B;--hv-ch2:rgba(201,166,107,.55);",
    "background:var(--hv-noir);color:var(--hv-iv);font-family:'Montserrat',system-ui,sans-serif;min-height:100vh;padding-bottom:24px;overflow-x:clip}",
    ".hv2 *{box-sizing:border-box}",
    ".hv2 button{font-family:inherit;color:inherit;-webkit-tap-highlight-color:transparent}",
    ".hv2-in{max-width:1240px;margin:0 auto;padding:0 18px}",
    /* traitement photo réversible */
    ".hv2-traite{position:relative;overflow:hidden;background:#0B0F0E}",
    ".hv2-traite img{display:block;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}",
    ".hv2-traite:after{content:'';position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 70px rgba(7,10,8,var(--hv-bords,0))}",
    /* en-tête */
    ".hv2{position:relative}.hv2-langue{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:14px}",
    ".hv2-hero{position:relative;padding-top:calc(env(safe-area-inset-top) + 14px)}",
    ".hv2-marque{text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:21px;letter-spacing:.62em;padding-inline-start:.62em;color:var(--hv-iv);position:relative;z-index:2}",
    ".hv2-photo{position:relative;height:clamp(300px,92vw,430px);margin-top:-6px}",
    ".hv2-photo img{object-position:var(--hv-pos-tel,center)}",
    ".hv2-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);mask-composite:intersect}",
    ".hv2-photo.hv2-traite:after{box-shadow:none}",
    ".hv2-courbe{position:absolute;left:0;right:0;width:100%;height:70px;pointer-events:none;z-index:2}",
    ".hv2-courbe.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}",
    ".hv2-hero-retour{position:relative;z-index:4;margin-top:2px}",
    ".hv2-hero-r .hv2-photo{margin-top:-30px}",
    ".hv2-courbe.c2{position:relative;display:block;height:64px;margin-top:-64px}",
    "[dir=rtl] .hv2-courbe{transform:scaleX(-1)}",
    ".hv2-titre{text-align:end;margin-top:-12px;position:relative;z-index:3}",
    ".hv2-titre h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(44px,12vw,64px);line-height:1;margin:0;color:var(--hv-iv);letter-spacing:.005em}",
    ".hv2-titre p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(17px,4.6vw,21px);margin:8px 0 0;color:var(--hv-iv);opacity:.88}",
    ".hv2-intro{position:absolute;inset-inline-end:12%;top:52%;width:58px;height:58px;border-radius:50%;border:1px solid var(--hv-ch);background:rgba(7,10,8,.35);display:flex;align-items:center;justify-content:center;z-index:3}",
    /* ligne Mes vidéos + recherche */
    ".hv2-ligne{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:22px;padding:4px 0 10px;position:relative}",
    ".hv2-ligne:after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(201,166,107,.15),var(--hv-ch) 55%,rgba(201,166,107,.15))}",
    ".hv2-mes{display:flex;align-items:center;gap:14px;background:none;border:none;padding:10px 6px;min-height:44px;font-size:15px;letter-spacing:.03em;color:var(--hv-iv)}",
    ".hv2-mes svg,.hv2-loupe svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
    ".hv2-mes svg{color:var(--hv-ch)}",
    ".hv2-loupe{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--hv-iv)}",
    ".hv2-rech{display:flex;align-items:center;gap:10px;margin-top:14px;padding:4px 6px 4px 14px;padding-inline-start:14px;padding-inline-end:6px;border-radius:14px;border:1px solid var(--hv-ch2);background:var(--hv-p1);box-shadow:0 10px 28px -16px rgba(0,0,0,.9)}",
    ".hv2-rech svg{width:18px;height:18px;stroke:var(--hv-ch);fill:none;stroke-width:1.6;flex:0 0 18px}",
    ".hv2-rech:focus-within{border-color:var(--hv-ch)}",
    ".hv2-rech input:focus,.hv2-rech input:focus-visible{outline:none}",
    ".hv2-rech input{flex:1;min-width:0;background:none;border:none;outline:none;color:var(--hv-iv);font-family:inherit;font-size:16px;padding:10px 0}",
    ".hv2-rech input::placeholder{color:var(--hv-iv3)}",
    ".hv2-rech input::-webkit-search-cancel-button{display:none}",
    ".hv2-x{width:40px;height:40px;border:none;background:none;color:var(--hv-iv2);font-size:22px;line-height:1}",
    /* onglets des Galops */
    ".hv2-onglets{display:flex;gap:8px;overflow-x:auto;margin:22px -18px 0;padding:2px 18px 8px;scroll-snap-type:x proximity;scrollbar-width:none;-webkit-overflow-scrolling:touch}",
    ".hv2-onglets::-webkit-scrollbar{display:none}",
    ".hv2-og{flex:0 0 auto;scroll-snap-align:start;min-height:46px;padding:9px 17px;border-radius:12px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);",
    "color:var(--hv-iv);font-size:14px;letter-spacing:.02em;white-space:nowrap;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.15;transition:border-color .2s,background .2s}",
    ".hv2-og.on{border-color:var(--hv-ch);background:var(--hv-og-on);box-shadow:0 8px 22px -12px rgba(0,0,0,.95),inset 0 0 0 .5px rgba(201,166,107,.35)}",
    ".hv2-og:disabled{opacity:.42;cursor:default}",
    /* 2 — pilule champagne */
    ".hv2-o2 .hv2-og{border-radius:999px;padding:9px 20px;background:linear-gradient(180deg,rgba(28,40,44,.62),rgba(7,10,8,.55));border-color:rgba(201,166,107,.22);box-shadow:0 8px 18px -12px rgba(0,0,0,.95)}",
    ".hv2-o2 .hv2-og.on{background:linear-gradient(180deg,rgba(201,166,107,.30),rgba(201,166,107,.08));border-color:rgba(201,166,107,.85);color:#F7E9CF;box-shadow:0 10px 22px -12px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.08)}",
    /* 3 — onglet souligné (verre fumé, trait champagne sous l'onglet choisi) */
    ".hv2-o3 .hv2-og{border-radius:10px 10px 4px 4px;border:none;border-bottom:1px solid rgba(243,238,228,.14);background:linear-gradient(180deg,rgba(243,238,228,.07),rgba(243,238,228,.015));box-shadow:0 10px 20px -14px rgba(0,0,0,.95)}",
    ".hv2-o3 .hv2-og.on{background:linear-gradient(180deg,rgba(16,29,34,.85),rgba(16,29,34,.35));border-bottom:2px solid #C9A66B;box-shadow:0 12px 24px -12px rgba(0,0,0,.95)}",
    /* 4 — givré ivoire */
    ".hv2-o4 .hv2-og{border-radius:14px;background:linear-gradient(160deg,rgba(243,238,228,.12),rgba(243,238,228,.025));border-color:rgba(243,238,228,.16);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 10px 22px -14px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.07)}",
    ".hv2-o4 .hv2-og.on{background:linear-gradient(160deg,rgba(243,238,228,.24),rgba(201,166,107,.10));border-color:rgba(243,238,228,.55);box-shadow:0 12px 24px -12px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.14)}",
    ".hv2-og-court{display:none}",
    ".hv2-choix{margin-top:22px}",
    ".hv2-choix-tete{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}",
    ".hv2-tous{min-height:40px;padding:7px 20px;border-radius:999px;border:1px solid rgba(243,238,228,.18);background:var(--hv-og);color:var(--hv-iv);font-size:14px;box-shadow:0 8px 18px -12px rgba(0,0,0,.95)}",
    ".hv2-tous.on{border-color:var(--hv-ch)}",
    ".hv2-choix-rang{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}",
    ".hv2-choix-plus{margin-top:7px;animation:hv2Deroule .25s ease-out}",
    "@keyframes hv2Deroule{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}",
    ".hv2-cg:disabled{opacity:.42}",
    ".hv2-cg-plus span{color:var(--hv-ch)}.hv2-cg-plus.ouvert{border-color:rgba(201,166,107,.45)}",
    ".hv2-cg{width:100%;min-width:0;min-height:62px;padding:9px 3px;display:flex;flex-direction:column;align-items:center;justify-content:center}",
    ".hv2-cg b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:17px;line-height:1.1;color:var(--hv-iv);white-space:nowrap}",
    ".hv2-cg span{font-size:10px;letter-spacing:.03em;color:var(--hv-iv2);margin-top:4px;white-space:nowrap}",
    "@media (min-width:700px){.hv2-choix-rang{gap:12px}.hv2-choix-plus{margin-top:12px}.hv2-cg b{font-size:22px}}",
    ".hv2-serre .hv2-onglets{overflow:visible;margin-left:0;margin-right:0;padding-left:0;padding-right:0;gap:5px}",
    ".hv2-serre .hv2-og{flex:1 1 0;min-width:0;padding:6px 2px;min-height:52px;border-radius:11px}",
    ".hv2-serre .hv2-og-long,.hv2-serre .hv2-og small{display:none}",
    ".hv2-serre .hv2-og-court{display:flex;flex-direction:column;align-items:center;line-height:1}",
    ".hv2-serre .hv2-og-court i{font-style:normal;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--hv-iv2);margin-bottom:4px}",
    ".hv2-serre .hv2-og-court b{font-family:'Montserrat',sans-serif;font-weight:500;font-size:16px;color:var(--hv-iv);font-variant-numeric:lining-nums}",
    ".hv2-serre .hv2-og:first-child{flex-grow:1.35}",
    ".hv2-serre .hv2-og:first-child .hv2-og-court b{font-family:'Montserrat',sans-serif;font-weight:500;font-size:12.5px}",
    ".hv2-serre .hv2-og:disabled{opacity:.32}",
    ".hv2-serre .hv2-og.on .hv2-og-court i{color:var(--hv-ch)}",
    ".hv2-og small{display:block;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--hv-iv2);margin-top:3px}",
    /* thèmes */
    ".hv2-h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(28px,7.4vw,36px);margin:22px 0 14px;color:var(--hv-iv);line-height:1.1}",
    ".hv2-grille{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}",
    ".hv2-theme{display:flex;flex-direction:column;text-align:center;padding:0;border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.09);background:var(--hv-p2);box-shadow:0 14px 30px -18px rgba(0,0,0,.95);min-width:0}",
    ".hv2-theme .hv2-traite{aspect-ratio:4/3;width:100%}",
    ".hv2-theme img{object-position:var(--hv-pos,center)}",
    ".hv2-pan{flex:1;display:flex;flex-direction:column;justify-content:center;padding:11px 8px 13px;background:var(--hv-pan)}",
    ".hv2-pan b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:19px;line-height:1.15;color:var(--hv-iv);overflow-wrap:anywhere}",
    ".hv2-pan span{display:block;font-size:12px;letter-spacing:.04em;color:var(--hv-iv2);margin-top:4px}",
    ".hv2-theme:active{transform:scale(.985)}",
    "@media (max-width:699px){.hv2-theme.seul2{grid-column:1/-1}.hv2-theme.seul2 .hv2-traite{aspect-ratio:21/9}}",
    ".hv2-theme.large{grid-column:1/-1}.hv2-theme.large .hv2-traite{aspect-ratio:21/9}",
    "@media (min-width:700px){.hv2-theme.large .hv2-traite{aspect-ratio:3/1}}",
    /* listes (thème ouvert, recherche, Mes vidéos) : en attendant la refonte
       de la page du thème, on garde les lignes existantes, recolorées */
    ".hv2-retour{display:flex;align-items:center;gap:10px;background:none;border:none;padding:12px 2px;min-height:44px;font-size:14px;color:var(--hv-iv);letter-spacing:.02em}",
    ".hv2-retour i{font-style:normal;color:var(--hv-ch);font-size:22px;line-height:1}",
    "[dir=rtl] .hv2-retour i{transform:scaleX(-1)}",
    ".hv2-sous{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:18px;color:var(--hv-iv2);margin:-6px 0 16px}",
    ".hv2-liste{border-radius:16px;border:1px solid rgba(243,238,228,.08);background:var(--hv-p1);padding:2px 14px;box-shadow:0 14px 30px -20px rgba(0,0,0,.95)}",
    ".hv2 .hv-ligne{padding:12px 0}",
    ".hv2 .hv-ligne h4{color:var(--hv-iv);font-size:14px}",
    ".hv2 .hv-ligne .hv-meta{color:var(--hv-iv2);font-size:11px}",
    ".hv2 .hv-ligne .hv-cov{border-color:rgba(243,238,228,.1);width:96px;flex-basis:96px}",
    ".hv2 .hv-ligne .hv-arc{display:none}",
    ".hv2 .hv-fav{width:44px;height:44px;font-size:18px;color:var(--hv-iv3)}",
    ".hv2 .hv-fav.on{color:var(--hv-ch)}",
    ".hv2-liste>div:last-child{border-bottom:none!important}",
    ".hv2-vide{text-align:center;padding:26px 10px}",
    ".hv2-vide p{margin:0;font-size:14px;color:var(--hv-iv2);line-height:1.6}",
    ".hv2-vide p+p{font-size:12px;color:var(--hv-iv3);margin-top:6px}",
    ".hv2-mini-ong{display:flex;gap:8px;margin:22px 0 14px}",
    ".hv2-mini-ong button{min-height:44px;padding:9px 18px;border-radius:12px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);font-size:14px}",
    ".hv2-mini-ong button.on{border-color:var(--hv-ch);background:var(--hv-og-on)}",
    /* 04/11 09h45 (Blandine : « la première page est très bleu pétrole, on peut la faire tirer plus sur le noir ? ») :
       palettes à comparer. A = pétrole (actuelle) ; B = noir graphite (comme sa maquette de la page vidéo) ;
       C = noir, le pétrole seulement sur ce qui est choisi. Toujours semi-transparent, dégradé, ombré. */
    ".hv2-pB{--hv-p1:rgba(21,22,22,.84);--hv-p2:rgba(23,24,24,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));--hv-og-on:linear-gradient(180deg,rgba(38,39,39,.95),rgba(24,25,25,.95));--hv-pan:linear-gradient(180deg,rgba(26,27,27,.97),rgba(17,18,18,.98))}",
    ".hv2-pC{--hv-p1:rgba(12,16,17,.84);--hv-p2:rgba(13,18,19,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015));--hv-og-on:linear-gradient(180deg,rgba(16,29,34,.95),rgba(10,17,19,.95));--hv-pan:linear-gradient(180deg,rgba(15,20,21,.97),rgba(9,12,12,.98))}",
    ".hv2-k{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--hv-ch);margin:22px 0 10px}",
    ".hv2-modo{display:block;margin:34px auto 0;background:none;border:none;font-size:11px;letter-spacing:.12em;color:var(--hv-iv3);padding:12px}",
    ".hv2-vc-ajout{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;border-radius:14px;border:1px dashed rgba(201,166,107,.5);background:rgba(201,166,107,.05);color:#C9A66B;font-family:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}",
    ".hv2-vc-ajout span{font-size:20px;line-height:1;font-weight:400}",
    ".hv2-vc-form{padding:18px 16px;border-radius:16px;border:1px solid rgba(243,238,228,.1);background:linear-gradient(160deg,rgba(16,26,29,.7),rgba(7,10,8,.7));box-shadow:0 12px 30px rgba(0,0,0,.35)}",
    ".hv2-vc-form select{appearance:auto}",
    ".hv2-vc-ok{flex:1;padding:13px;border-radius:12px;border:1px solid rgba(201,166,107,.6);background:rgba(201,166,107,.14);color:#F3EEE4;font-family:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}",
    ".hv2-vc-ok:disabled{opacity:.45}",
    ".hv2-vc-non{padding:13px 16px;border-radius:12px;border:1px solid rgba(243,238,228,.18);background:none;color:rgba(243,238,228,.7);font-family:inherit;font-size:12px;letter-spacing:.1em;text-transform:uppercase}",
    /* page vidéo (04/11) */
    ".hv2-l-in{padding-top:6px}",
    ".hv2-l-hero .hv2-titre h1{font-size:clamp(30px,8.4vw,44px);line-height:1.08}",
    ".hv2-l-hero .hv2-titre p{font-style:normal;font-family:'Montserrat',sans-serif;font-size:13px;letter-spacing:.03em;color:var(--hv-iv2)}",
    ".hv2-dC .hv2-l-hero .hv2-titre h1,.hv2-dD .hv2-l-hero .hv2-titre h1,.hv2-dE .hv2-l-hero .hv2-titre h1{font-size:52px}",
    ".hv2-l-averifier{margin:8px 0 4px;padding:10px 12px;border-radius:10px;border:1px dashed var(--hv-ch2);font-size:12.5px;color:var(--hv-ch)}",
    ".hv2-l-cours-l{display:block;width:100%;text-align:start;background:none;border:0;padding:6px 0 4px;border-top:1px solid rgba(243,238,228,.07)}",
    ".hv2-l-cours-l:first-of-type{border-top:0;padding-top:0}",
    ".hv2-l-sc.seule{grid-column:1/-1;flex-direction:row;align-items:stretch}",
    ".hv2-l-sc.seule .hv2-l-sc-img{flex:0 0 46%}",
    ".hv2-l-sc.seule .hv2-l-sc-t{display:flex;align-items:center}",
    ".hv2-lecteur{position:relative;aspect-ratio:16/9;margin-top:22px;border-radius:14px;overflow:hidden;background:#000;box-shadow:0 18px 40px -22px rgba(0,0,0,.95)}",
    ".hv2-l2 .hv2-lecteur{margin-left:-18px;margin-right:-18px;border-radius:0}",
    ".hv2-lecteur iframe,.hv2-lecteur video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}",
    ".hv2-lect-poster{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;background:#0B0F0E;display:block}",
    ".hv2-lect-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}",
    ".hv2-play{position:absolute;left:50%;top:50%;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:rgba(7,10,8,.55);border:1px solid rgba(243,238,228,.75);display:flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}",
    ".hv2-play svg{width:24px;height:24px;fill:#F3EEE4;margin-left:3px}",
    ".hv2-play.petit{left:auto;top:auto;right:10px;bottom:10px;margin:0;width:34px;height:34px}.hv2-play.petit svg{width:15px;height:15px;margin-left:2px}",
    "[dir=rtl] .hv2-play.petit{right:auto;left:10px}",
    ".hv2-lect-bientot{position:absolute;inset:auto 0 14px 0;text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--hv-iv)}",
    ".hv2-l-courbe{display:block;width:100%;height:30px;margin:6px 0 4px}",
    "[dir=rtl] .hv2-l-courbe{transform:scaleX(-1)}",
    ".hv2-l-meta{margin:6px 0 0;font-size:13px;letter-spacing:.03em;color:var(--hv-iv2)}",
    ".hv2-l-titre{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(32px,8.6vw,46px);line-height:1.08;margin:6px 0 0;color:var(--hv-iv)}",
    ".hv2-l-resume{margin:10px 0 0;font-size:15px;line-height:1.55;color:var(--hv-iv)}",
    ".hv2-l-langue{margin:8px 0 0;font-size:13px;font-style:italic;color:var(--hv-iv2)}",
    ".hv2-l-yt{float:inline-end;margin:8px 0 0 12px;font-size:13px;color:var(--hv-iv2);text-decoration:underline;text-underline-offset:3px}",
    ".hv2-l-actions{display:grid;grid-template-columns:1.45fr 1fr;gap:12px;margin-top:20px}",
    ".hv2-l-btn{min-height:50px;display:flex;align-items:center;justify-content:center;gap:12px;border-radius:12px;border:1px solid rgba(243,238,228,.16);background:var(--hv-og);font-size:14.5px;color:var(--hv-iv);box-shadow:0 10px 22px -14px rgba(0,0,0,.95)}",
    ".hv2-l-btn span{font-size:18px;color:var(--hv-iv)}",
    ".hv2-l-btn.on{border-color:var(--hv-ch);background:var(--hv-og-on)}.hv2-l-btn.on span{color:var(--hv-ch)}",
    ".hv2-l-carte{display:block;width:100%;text-align:start;margin-top:16px;padding:16px 18px;border-radius:14px;border:1px solid rgba(243,238,228,.09);background:var(--hv-p1);box-shadow:0 14px 30px -20px rgba(0,0,0,.95)}",
    ".hv2-l-k{margin:0 0 6px;font-size:13px;font-style:italic;color:var(--hv-ch)}",
    ".hv2-l-carte b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;line-height:1.15;color:var(--hv-iv)}",
    ".hv2-l-lien{display:inline-block;margin-top:10px;font-size:14px;color:var(--hv-ch);text-decoration:none}",
    ".hv2-l-petit{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:var(--hv-iv2)}",
    ".hv2-l-obs{list-style:none;margin:0;padding:0}",
    ".hv2-l-obs li{position:relative;padding:7px 0;padding-inline-start:18px;font-size:14px;line-height:1.45;color:var(--hv-iv);border-bottom:1px solid rgba(243,238,228,.06)}",
    ".hv2-l-obs li:last-child{border-bottom:0}",
    ".hv2-l-obs li:before{content:'';position:absolute;inset-inline-start:2px;top:15px;width:5px;height:5px;border-radius:50%;background:var(--hv-ch)}",
    ".hv2-l-suiv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}",
    ".hv2-l-sc{display:flex;flex-direction:column;padding:0;text-align:start;border-radius:14px;overflow:hidden;border:1px solid rgba(243,238,228,.09);background:var(--hv-p2);box-shadow:0 14px 30px -18px rgba(0,0,0,.95);min-width:0}",
    ".hv2-l-sc-img{position:relative;display:block;aspect-ratio:16/10;background:#0B0F0E}",
    ".hv2-l-sc-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}",
    ".hv2-l-sc-t{display:block;padding:11px 13px 13px;font-size:14px;line-height:1.35;color:var(--hv-iv);background:var(--hv-pan);flex:1}",
    "@media (min-width:700px){.hv2-l2 .hv2-lecteur{margin-left:-32px;margin-right:-32px}.hv2-l-suiv{grid-template-columns:repeat(3,minmax(0,1fr))}}",
    "@media (min-width:1100px){.hv2-l-in{max-width:960px}.hv2-l2 .hv2-lecteur{margin-left:0;margin-right:0;border-radius:14px}.hv2-l-suiv{grid-template-columns:repeat(4,minmax(0,1fr))}}",
    /* tablette */
    "@media (min-width:700px){.hv2-in{padding:0 32px}.hv2-onglets{margin:26px -32px 0;padding:2px 32px 8px}",
    ".hv2-grille{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.hv2-theme.seul3{grid-column:2}",
    ".hv2-photo{height:clamp(360px,52vw,460px)}.hv2-photo img{object-position:var(--hv-pos-tab,center)}",
    ".hv2-titre{margin-top:-16px}.hv2-marque{font-size:22px}}",
    /* ordinateur (04/11 01h37, Blandine : version ordi « bof ») : deux compositions à comparer,
       DESIGN_ORDI = "A" (photo panoramique pleine largeur, titre sous le trait) ou "B" (photo à
       droite, titre à gauche sur le noir, trait sous l'ensemble). Listes en 2 colonnes. */
    "@media (min-width:1100px){.hv2-photo img{object-position:var(--hv-pos-ordi,center)}",
    ".hv2-onglets{overflow:visible;flex-wrap:nowrap;justify-content:flex-start;margin:28px 0 0;padding:2px 0 8px}",
    ".hv2-grille{grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.hv2-theme.seul3{grid-column:auto}",
    ".hv2-liste{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:36px}.hv2-liste>div{border-bottom:1px solid rgba(243,238,228,.07)!important}",
    /* A */
    ".hv2-dA .hv2-photo{height:480px;width:100%;max-width:1240px;margin:0 auto;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 54%,transparent 90%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 54%,transparent 90%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%)}",
    ".hv2-dA .hv2-courbe.c2{max-width:1240px;margin:-64px auto 0}.hv2-dA .hv2-hero-retour{margin-bottom:6px}",
    ".hv2-dA .hv2-titre h1{font-size:68px}",
    /* C, D, E (04/11 09h17, Blandine : « j'aurais aimé A mais avec photos plus dézoomées et entières ») :
       la photo est montrée ENTIÈRE (rien de coupé), à sa forme naturelle, fondue sur ses bords vers le noir ;
       C = 520 px, titre à droite sous le trait ; D = 440 px, titre centré ; E = 580 px, photo calée à droite. */
    ".hv2-dC .hv2-photo,.hv2-dD .hv2-photo,.hv2-dE .hv2-photo{width:100%;max-width:1240px;margin:0 auto;display:flex;justify-content:center;-webkit-mask-image:none;mask-image:none;background:transparent}",
    ".hv2-dC .hv2-photo{height:520px}.hv2-dD .hv2-photo{height:440px}.hv2-dE .hv2-photo{height:580px;justify-content:flex-end;padding-inline-end:32px}",
    ".hv2-dC .hv2-photo img,.hv2-dD .hv2-photo img,.hv2-dE .hv2-photo img{width:auto;max-width:100%;height:100%;object-fit:contain;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 62%,transparent 94%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 62%,transparent 94%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);mask-composite:intersect}",
    ".hv2-dC .hv2-photo.hv2-traite:after,.hv2-dD .hv2-photo.hv2-traite:after,.hv2-dE .hv2-photo.hv2-traite:after{display:none}",
    ".hv2-dC .hv2-courbe.c2,.hv2-dD .hv2-courbe.c2,.hv2-dE .hv2-courbe.c2{max-width:1240px;margin:-64px auto 0}",
    ".hv2-dC .hv2-titre h1,.hv2-dD .hv2-titre h1,.hv2-dE .hv2-titre h1{font-size:68px}",
    ".hv2-dD .hv2-titre{text-align:center}",
    /* B */
    ".hv2-dB .hv2-hero{display:grid;grid-template-columns:minmax(0,40fr) minmax(0,60fr);grid-template-rows:auto auto 1fr auto;grid-template-areas:'m m' 'r p' 't p' 'c c';max-width:1240px;margin:0 auto;padding-left:32px;padding-right:32px;column-gap:24px}",
    ".hv2-dB .hv2-marque{grid-area:m}.hv2-dB .hv2-hero-retour{grid-area:r;padding:0;margin:26px 0 0;max-width:none}",
    ".hv2-dB .hv2-photo{grid-area:p;width:100%;height:480px;margin:0;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(90deg,transparent 0,#000 30%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(90deg,transparent 0,#000 30%,#000 100%)}",
    "[dir=rtl] .hv2-dB .hv2-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(270deg,transparent 0,#000 30%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(270deg,transparent 0,#000 30%,#000 100%)}",
    ".hv2-dB .hv2-hero>.hv2-in:not(.hv2-hero-retour){grid-area:t;align-self:end;padding:0 0 70px;margin:0;max-width:none;position:relative;z-index:3}",
    ".hv2-dB .hv2-titre{text-align:start;margin:0}.hv2-dB .hv2-titre h1{font-size:68px}.hv2-dB .hv2-titre p{font-size:22px}",
    ".hv2-dB .hv2-courbe.c2{grid-area:c;margin:-64px 0 0;max-width:none}}",
    /* ===== 04/11 15h — DESIGN VALIDÉ (maquette ChatGPT « Dressage ») : noir dominant, verre fumé, champagne en filet ===== */
    ".hv2{--hv-filtre-vig:saturate(.82) contrast(1.1) brightness(.86) sepia(.24) hue-rotate(-4deg);--hv-p1:linear-gradient(135deg,rgba(14,22,24,.62),rgba(7,10,8,.94) 62%);--hv-p2:rgba(10,14,14,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.018));--hv-og-on:linear-gradient(180deg,rgba(201,166,107,.12),rgba(201,166,107,.03));--hv-pan:linear-gradient(180deg,rgba(12,17,18,.96),rgba(7,10,8,.98))}",
    ".hv2-rech{background:rgba(7,10,8,.66)}",
    ".hv2-vide{background:none;border:1px solid rgba(243,238,228,.08);border-radius:14px}",
    ".hv3-pils{display:flex;gap:10px;overflow-x:auto;margin:22px 0 0;padding:2px 0 8px;scroll-snap-type:x proximity;scrollbar-width:none}",
    ".hv3-pils::-webkit-scrollbar{display:none}",
    ".hv3-pil{flex:0 0 auto;scroll-snap-align:start;min-height:44px;padding:0 20px;border-radius:999px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 8px 20px -12px rgba(0,0,0,.95);color:var(--hv-iv);font-family:inherit;font-size:15px;white-space:nowrap}",
    ".hv3-pil.on{border-color:var(--hv-ch);background:var(--hv-og-on);box-shadow:0 8px 22px -12px rgba(0,0,0,.95),inset 0 0 0 .5px rgba(201,166,107,.4)}",
    ".hv3-h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(28px,7.6vw,34px);line-height:1.05;color:var(--hv-iv);margin:36px 0 24px;padding-inline-start:16px;border-inline-start:2px solid var(--hv-ch)}",
    ".hv3-tete{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}",
    ".hv3-tete .hv3-h2{margin-bottom:24px}",
    ".hv3-voir{flex:0 0 auto;background:none;border:none;color:var(--hv-iv);font-family:inherit;font-size:14px;padding:10px 0 18px;white-space:nowrap}",
    ".hv3-voir i{font-style:normal;font-size:18px}",
    ".hv3-cartes{display:grid;grid-template-columns:minmax(0,1fr);gap:10px}",
    ".hv3-carte{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;min-height:0;border-radius:14px;border:1px solid rgba(243,238,228,.09);background:var(--hv-p1);overflow:hidden;box-shadow:0 12px 26px -20px rgba(0,0,0,.95)}",
    ".hv3-vig{position:relative;flex:0 0 35%;max-width:240px;aspect-ratio:16/10.4;min-height:0;padding:0;border:none;background:#0B0F0E;overflow:hidden;cursor:pointer}",
    ".hv3-vig img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig)}",
    ".hv3-vig:after,.hv3-photo-img:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(125% 95% at 50% 42%,rgba(7,10,8,0) 52%,rgba(7,10,8,.62) 100%),linear-gradient(180deg,rgba(214,150,74,.10),rgba(7,10,8,.18))}",
    ".hv3-play,.hv3-duree,.hv3-lock{z-index:2}",
    ".hv3-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:rgba(7,10,8,.42);border:1px solid rgba(243,238,228,.75);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center}",
    ".hv3-play svg{width:18px;height:18px;fill:#F3EEE4;margin-inline-start:2px}",
    ".hv3-play.petit{width:32px;height:32px}.hv3-play.petit svg{width:14px;height:14px}",
    ".hv3-duree{position:absolute;inset-inline-end:6px;bottom:6px;padding:2px 7px;border-radius:6px;background:rgba(7,10,8,.78);color:#F3EEE4;font-size:11px;letter-spacing:.02em}",
    ".hv3-lock{position:absolute;top:6px;inset-inline-start:6px;color:#C9A66B;font-size:14px}",
    ".hv3-info{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:9px 12px;padding-inline-end:38px;background:none;border:none;color:inherit;text-align:start;font-family:inherit;cursor:pointer}",
    ".hv3-info h4{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19.5px;line-height:1.15;color:var(--hv-iv);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".hv3-cours{font-size:12px;color:var(--hv-iv2);line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}",
    ".hv3-meta{display:flex;flex-wrap:nowrap;min-width:0;align-items:center;gap:6px 9px;margin-top:4px;font-size:12px;color:var(--hv-iv2)}",
    ".hv3-pill{font-style:normal;border:1px solid rgba(201,166,107,.75);color:var(--hv-ch);border-radius:999px;padding:2px 10px;font-size:11.5px;line-height:1.4;white-space:nowrap}",
    ".hv3-pill+.hv3-qui{padding-inline-start:9px;border-inline-start:1px solid rgba(243,238,228,.25)}",
    ".hv3-qui{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
    ".hv3-prog{display:flex;align-items:center;gap:10px;margin-top:5px}",
    ".hv3-barre{flex:1;height:3px;border-radius:2px;background:rgba(243,238,228,.12);overflow:hidden}",
    ".hv3-barre span{display:block;height:100%;background:linear-gradient(90deg,#B8955C,#E2C48E)}",
    ".hv3-etat{font-size:12px;color:var(--hv-iv);white-space:nowrap}",
    ".hv3-fav{position:absolute;top:2px;inset-inline-end:2px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:none;border:none;padding:0;cursor:pointer}",
    ".hv3-fav svg{width:22px;height:22px;fill:none;stroke:rgba(243,238,228,.7);stroke-width:1.4;stroke-linejoin:round}",
    ".hv3-fav.on svg{fill:var(--hv-ch);stroke:var(--hv-ch)}",
    ".hv3-actions{flex:0 0 100%;display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px 12px;border-top:1px solid rgba(243,238,228,.06)}",
    ".hv3-actions button{min-height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,166,107,.5);background:none;color:var(--hv-ch);font-family:inherit;font-size:12.5px}",
    ".hv3-actions button.gris{border-color:rgba(243,238,228,.2);color:var(--hv-iv2)}",
    ".hv3-vc{margin-top:10px;padding-top:6px;border-top:1px solid rgba(243,238,228,.07)}",
    ".hv3-rangee{display:grid;grid-auto-flow:column;grid-auto-columns:31.5%;gap:10px;overflow-x:auto;margin:0;padding:0 0 6px;scroll-snap-type:x proximity;scrollbar-width:none}",
    ".hv3-rangee::-webkit-scrollbar{display:none}",
    ".hv3-photo{scroll-snap-align:start;text-align:start;background:none;border:none;padding:0;color:inherit;font-family:inherit;min-width:0;cursor:pointer}",
    ".hv3-photo-img{position:relative;display:block;aspect-ratio:16/10;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.08);background:#0B0F0E}",
    ".hv3-photo-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig)}",
    ".hv3-photo b{display:block;margin-top:8px;font-weight:500;font-size:13px;line-height:1.3;color:var(--hv-iv);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
    ".hv3-photo small{display:block;margin-top:3px;font-size:11px;color:var(--hv-iv2)}",
    ".hv3-ajout-zone{display:flex;justify-content:center;margin:40px 0 8px}",
    ".hv3-plus-zone{display:flex;justify-content:center;margin:14px 0 0}",
    ".hv3-plus{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 22px;border-radius:999px;border:1px solid rgba(243,238,228,.16);background:var(--hv-og);color:var(--hv-iv);font-family:inherit;font-size:14px;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}",
    ".hv3-plus i{font-style:normal;color:var(--hv-ch);font-size:16px}",
    ".hv3-ajout{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 32px;border-radius:999px;border:1px solid var(--hv-ch);background:rgba(7,10,8,.55);color:var(--hv-ch);font-family:inherit;font-size:15.5px;font-weight:500;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 10px 24px -16px rgba(0,0,0,.95)}",
    ".hv3-ajout span{font-size:24px;font-weight:300;line-height:1}",
    ".hv3-ajout-zone:has(.hv3-ban){display:block}",
    ".hv3-ban{position:relative;display:block;width:100%;min-height:400px;padding:0;border:1px solid rgba(201,166,107,.28);border-radius:20px;overflow:hidden;background:#070A08;color:#F3EEE4;font-family:inherit;text-align:start;cursor:pointer;box-shadow:0 18px 40px -24px rgba(0,0,0,.95)}",
    ".hv3-ban-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig,none);transform:scale(1.02);transition:transform .6s ease}",
    ".hv3-ban:active .hv3-ban-img{transform:scale(1.05)}",
    ".hv3-ban-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 0%,rgba(7,10,8,0) 48%,rgba(7,10,8,.62) 68%,rgba(7,10,8,.96) 100%)}",
    ".hv3-ban-txt{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;min-height:400px;box-sizing:border-box;padding:22px 20px 20px}",
    ".hv3-ban-t{font-family:'Cormorant Garamond',Georgia,serif;font-size:27px;font-weight:500;line-height:1.1;color:#F3EEE4}",
    ".hv3-ban-s{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:16.5px;line-height:1.35;color:rgba(243,238,228,.82);max-width:34em}",
    ".hv3-ban-cta{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;margin-top:8px;min-height:44px;padding:0 22px;border-radius:999px;border:1px solid var(--hv-ch);background:rgba(7,10,8,.55);color:var(--hv-ch);font-size:15px;font-weight:500;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}",
    ".hv3-ban-cta i{font-style:normal;font-size:22px;font-weight:300;line-height:1}",
    "@media (min-width:900px){.hv3-ban,.hv3-ban-txt{min-height:340px}.hv3-ban-txt{padding:30px 32px}.hv3-ban-t{font-size:32px}}",
    ".hv3-voile{position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:hv3Fondu .2s ease-out}",
    ".hv3-feuille{position:fixed;left:0;right:0;bottom:0;z-index:2147483601;max-width:640px;margin:0 auto;max-height:88vh;overflow:auto;-webkit-overflow-scrolling:touch;border-radius:22px 22px 0 0;border-top:1px solid rgba(201,166,107,.35);background:linear-gradient(180deg,#0D1315,#070A08 40%);padding:8px 18px calc(env(safe-area-inset-bottom) + 24px);box-shadow:0 -20px 50px rgba(0,0,0,.7);animation:hv3Monte .28s cubic-bezier(.2,.8,.2,1)}",
    ".hv3-poignee{display:block;width:44px;height:4px;border-radius:2px;background:rgba(243,238,228,.25);margin:4px auto 14px}",
    ".hv3-feuille .hv2-vc-form{border:none;background:none;box-shadow:none;padding:0}",
    ".hv3-feuille input:focus,.hv3-feuille textarea:focus,.hv3-feuille select:focus{outline:none;border-color:rgba(201,166,107,.75)!important;box-shadow:0 0 0 3px rgba(201,166,107,.18)}",
    "@keyframes hv3Monte{from{transform:translateY(100%)}to{transform:none}}",
    "@keyframes hv3Fondu{from{opacity:0}to{opacity:1}}",
    ".hv2-mini-ong button{border-radius:999px;background:var(--hv-og);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 8px 20px -12px rgba(0,0,0,.95);color:var(--hv-iv);font-family:inherit}",
    ".hv2-mini-ong button.on{border-color:var(--hv-ch);background:var(--hv-og-on)}",
    ".hv3-reserve>div{padding:12px 14px!important;border:1px solid rgba(243,238,228,.09)!important;border-radius:14px;background:var(--hv-p1)}",
    ".hv2-lect-img,.hv2-l-suiv img{filter:var(--hv-filtre-vig)}",
    "@media (min-width:700px){.hv3-pils{margin-top:26px}.hv3-rangee{grid-auto-columns:31%}.hv3-vig{flex-basis:34%}.hv3-info h4{font-size:23px}}",
    "@media (min-width:980px){.hv3-cartes{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.hv3-rangee{grid-auto-columns:23%}}",
    ".hv3-hm{position:relative}",
    ".hv3-hm-photo{position:relative;height:clamp(300px,74vw,460px);overflow:hidden}",
    ".hv3-hm-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--hv-pos-tel,center);filter:var(--hv-filtre,none)}",
    ".hv3-hm-photo:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 45%,rgba(7,10,8,.78) 78%,#070A08 100%),linear-gradient(90deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 60%)}",
    "[dir=rtl] .hv3-hm-photo:after{background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 45%,rgba(7,10,8,.78) 78%,#070A08 100%),linear-gradient(270deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 60%)}",
    ".hv3-rond{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-start:16px;width:46px;height:46px;border-radius:50%;border:1px solid rgba(243,238,228,.28);background:rgba(7,10,8,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:0}",
    ".hv3-rond svg{width:20px;height:20px;fill:none;stroke:#F3EEE4;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}",
    "[dir=rtl] .hv3-rond svg{transform:scaleX(-1)}",
    ".hv3-hm .hv2-langue{z-index:6}",
    ".hv3-hm-txt{position:absolute;z-index:4;left:0;right:0;bottom:clamp(42px,11vw,64px);max-width:1240px;margin:0 auto;padding:0 24px;text-align:start}",
    ".hv3-hm-k{display:block;font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:var(--hv-ch);font-weight:500;margin-bottom:6px}",
    ".hv3-hm-txt h1{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(46px,13vw,72px);line-height:.98;color:var(--hv-iv)}",
    ".hv3-hm-txt p{margin:8px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(17px,4.6vw,22px);color:var(--hv-iv);opacity:.9}",
    ".hv3-hm-courbe{position:absolute;z-index:3;left:0;bottom:-1px;width:100%;height:clamp(34px,9vw,60px);display:block}",
    "@media (min-width:700px){.hv3-hm-photo{height:clamp(380px,48vw,520px)}.hv3-hm-photo img{object-position:var(--hv-pos-tab,center)}.hv3-hm-txt{padding:0 32px}}",
    "@media (min-width:1100px){.hv3-hm-photo img{object-position:var(--hv-pos-ordi,center)}}",
    /* 04/11 15h55 — corrections visuelles finales (ChatGPT / Blandine) */
    ".hv3-pils{gap:12px;padding:4px 2px 12px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}",
    ".hv3-pil{padding:0 22px;min-height:46px;border-color:rgba(243,238,228,.10);background:linear-gradient(180deg,rgba(16,26,29,.72),rgba(7,10,8,.72));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.04)}",
    ".hv3-pil.on{border-color:var(--hv-ch);background:linear-gradient(180deg,rgba(16,26,29,.85),rgba(7,10,8,.85));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 0 0 .5px rgba(201,166,107,.5)}",
    ".hv3-cartes{gap:16px}",
    ".hv3-carte{background:linear-gradient(135deg,rgba(16,26,29,.42),rgba(7,10,8,.96) 58%)}",
    ".hv3-vig{flex:0 0 44%;max-width:300px;aspect-ratio:16/9}",
    ".hv3-info h4{font-size:18px}",
    ".hv3-info{padding:8px 11px;padding-inline-end:36px}",
    ".hv3-cours{font-size:11.5px}.hv3-meta{font-size:11.5px}.hv3-pill{font-size:11px;padding:1px 9px}",
    ".hv3-page-bas{height:calc(env(safe-area-inset-bottom) + 96px)}",
    ".hv2-cg{min-height:66px;border-radius:14px;border:1px solid rgba(243,238,228,.10);background:linear-gradient(180deg,rgba(16,26,29,.70),rgba(7,10,8,.78));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.04)}",
    ".hv2-cg.on{border-color:var(--hv-ch);background:linear-gradient(180deg,rgba(16,26,29,.9),rgba(7,10,8,.9));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 0 0 .5px rgba(201,166,107,.5)}",
    ".hv2-cg b{font-size:18px}.hv2-cg span{font-size:10.5px;color:rgba(243,238,228,.72)}",
    ".hv2-choix-rang{gap:9px}",
    ".hv2-choix-defile{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 27px) / 4);gap:9px;overflow-x:auto;scroll-snap-type:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:2px 0 10px}",
    ".hv2-choix-defile::-webkit-scrollbar{display:none}",
    ".hv2-choix-defile .hv2-cg{scroll-snap-align:start}",
    "@media (min-width:700px){.hv2-choix-defile{grid-auto-columns:calc((100% - 72px) / 7);gap:12px}}",
    ".hv2-tous{background:linear-gradient(180deg,rgba(16,26,29,.70),rgba(7,10,8,.78))}",
    ".hv2-theme{background:#070A08;border-color:rgba(243,238,228,.08)}",
    ".hv2-theme .hv2-traite{position:relative}",
    ".hv2-theme .hv2-traite:before{content:'';position:absolute;left:0;right:0;bottom:0;height:42%;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(7,10,8,0),#070A08)}",
    ".hv2-pan{background:#070A08;padding:4px 10px 15px;min-height:64px;justify-content:flex-start}",
    ".hv2-pan b{font-size:20px;font-weight:500;letter-spacing:.005em}",
    ".hv2-pan span{font-size:12px;color:rgba(243,238,228,.74);margin-top:5px}",
    "@media (min-width:700px){.hv3-vig{flex-basis:40%}.hv3-info h4{font-size:21px}}",
    "@media (min-width:980px){.hv3-vig{flex-basis:42%}}"
  ].join("");
  /* Palette des pages de la Vidéothèque : "A", "B" ou "C" (voir CSS2). */
  var PALETTE = "A";
  /* Haut de la page vidéo : "1" lecteur encadré (arrondi, marges), "2" lecteur bord à bord. */
  var HAUT_LECTURE = "1";
  function reglage(nom, defaut) { try { if (window[nom] !== undefined) return window[nom]; } catch (e) { } return defaut; }
  function classeHv2() {
    return "hv2 hv2-d" + reglage("__hvDesignOrdi", DESIGN_ORDI) + " hv2-o" + reglage("__hvOnglets", STYLE_ONGLETS)
      + (reglage("__hvSerre", ONGLETS_SERRES) ? " hv2-serre" : "") + " hv2-p" + reglage("__hvPalette", PALETTE)
      + " hv2-l" + reglage("__hvHautLecture", HAUT_LECTURE);
  }
  function injecterCss2() {
    if (typeof document === "undefined") return;
    if (document.getElementById(CSS2_ID)) return;
    var st = document.createElement("style");
    st.id = CSS2_ID; st.textContent = CSS2;
    document.head.appendChild(st);
  }

  /* ============================================================
     ÉCRAN : BIBLIOTHÈQUE VIDÉO — accueil
     ============================================================ */
  window.EcranVideos = function EcranVideos() {
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, tr = app.tr, langue = app.langue, premium = app.premium;
    function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }

    function titreDe(v) { return L(v.i18nTitre, langue); }
    function resumeDe(v) { return L(v.i18nResume, langue); }
    function observerDe(v) { return v.i18nObserver ? (L(v.i18nObserver, langue) || []) : []; }
    function chapitreDe(v) { return L(CHAPITRES[v.coursId], langue) || v.coursId; }

    injecterCss();
    injecterCss2();
    var dispo = catalogue();

    /* Retour depuis la page de lecture : on revient là où l'on était
       (thème ouvert, recherche, Mes vidéos), une seule fois. */
    var retour0 = null;
    try { retour0 = window.__hvRetour || null; window.__hvRetour = null; } catch (eR0) { }
    retour0 = retour0 || {};

    var st = React.useState(lireLocal());
    var etat = st[0], setEtat = st[1];
    var sv = React.useState(retour0.vue || "accueil"); var vue = sv[0], setVue = sv[1];         /* accueil | theme | mes | reserve */
    var sg = React.useState(retour0.galop || "tous"); var galop = sg[0], setGalop = sg[1];
    var sth = React.useState(retour0.theme || null); var theme = sth[0], setTheme = sth[1];
    var sr = React.useState(retour0.rq || ""); var rq = sr[0], setRq = sr[1];
    var so = React.useState(!!retour0.rq); var rechOuverte = so[0], setRechOuverte = so[1];
    var sm = React.useState(retour0.onglet || "fav"); var onglet = sm[0], setOnglet = sm[1];
    var mo = React.useState(false); var estModo = mo[0], setEstModo = mo[1];
    var spl = React.useState(false); var plusOuvert = spl[0], setPlusOuvert = spl[1];
    /* 04/11 : les modératrices voient aussi les vidéos « À vérifier », pour les tester avant publication */
    if (estModo && VIDS_AV.length) dispo = dispo.concat(VIDS_AV);
    var refRech = React.useRef(null);

    React.useEffect(function () {
      var vivant = true;
      try {
        if (typeof utilisateurActuel === "function" && typeof estModerateurHype === "function") {
          utilisateurActuel().then(function (u) { if (vivant) setEstModo(estModerateurHype(u)); }).catch(function () { });
        }
      } catch (e) { }
      return function () { vivant = false; };
    }, []);

    React.useEffect(function () {
      var vivant = true;
      chargerDistant(function (dist) {
        if (!vivant || !dist) return;
        var l = lireLocal();
        var progF = Object.assign({}, l.prog || {});
        Object.keys(dist.prog || {}).forEach(function (k) { var a = progF[k], b = dist.prog[k]; if (!a || String(b.quand || "") >= String(a.quand || "")) progF[k] = b; });
        var fus = { prog: progF, fav: Object.assign({}, l.fav || {}, dist.fav || {}), ecart: l.ecart };
        ecrireLocal(fus);
        setEtat(fus);
      });
      return function () { vivant = false; };
    }, []);

    /* règle Hype : chaque nouvel écran qui défile repart en haut */
    React.useEffect(function () {
      try { window.scrollTo(0, 0); } catch (e) { }
      try { if (document.scrollingElement) document.scrollingElement.scrollTop = 0; } catch (e2) { }
    }, [vue, theme]);

    React.useEffect(function () {
      if (rechOuverte && refRech.current) { try { refRech.current.focus(); } catch (e) { } }
    }, [rechOuverte]);

    function prog(id) { return (etat.prog && etat.prog[id]) || null; }
    function estFav(id) { return !!(etat.fav && etat.fav[id]); }
    function verrou(v) { return !!v.premium && !premium; }
    function basculerFav(id) { enregistrerFavori(id, !estFav(id)); setEtat(lireLocal()); }

    function ouvrir(v) {
      if (verrou(v)) { setEcran("premium"); return; }
      if (v.src) { enregistrerEtat(v.id, true, !!(prog(v.id) && prog(v.id).vue), 0); }
      try { window.__hypeVideoOuverte = v.id; } catch (e) { }
      try { window.__hvRetour = { vue: vue, galop: galop, theme: theme, rq: rq, onglet: onglet }; window.__hvCoursOrigine = null; } catch (e2) { }
      setEcran("video-lecture");
    }

    var TXT_GALOP = T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ", "الغالوب ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop ");
    function nbVideos(n) {
      return n + " " + (n > 1
        ? T("vidéos", "videos", "vídeos", "video", "本", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "wideo", "동영상")
        : T("vidéo", "video", "vídeo", "video", "本", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "wideo", "동영상"));
    }
    function nomOnglet(k) {
      if (k === "tous") return T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체");
      if (k === "7+") return T("Galop 7 et +", "Level 7+", "Galop 7 y +", "Galop 7 e +", "ガロー 7以上", "Galopp 7+", "الغالوب 7 وما فوق", "Galop 7 及以上", "Galop 7 en hoger", "Galop 7 e +", "Galop 7 och uppåt", "Galop 7 и выше", "Galop 7 i wyżej", "Galop 7 이상");
      return TXT_GALOP + k;
    }
    function nomGalopSel() {
      if (galop === "tous") return T("Tous les Galops", "All levels", "Todos los Galops", "Tutti i Galop", "すべてのガロー", "Alle Galopps", "كل مستويات الغالوب", "所有 Galop", "Alle Galops", "Todos os Galops", "Alla Galop", "Все уровни Galop", "Wszystkie poziomy Galop", "모든 Galop");
      return nomOnglet(galop);
    }
    function nomTheme(k) {
      for (var i = 0; i < UNIVERS.length; i++) { if (UNIVERS[i].k === k) return L(UNIVERS[i].nom, langue); }
      return k;
    }
    function classeRacine() { return classeHv2(); }
    function styleTraitement() {
      return TRAITEMENT_PHOTO.actif ? { "--hv-filtre": TRAITEMENT_PHOTO.filtre, "--hv-bords": TRAITEMENT_PHOTO.bords } : {};
    }

    /* ---------- briques ---------- */
    function couv(v) {
      var mini = vignette(v);
      return h("div", { className: "hv-cov" },
        h("div", { key: "f", style: { position: "absolute", inset: 0, background: "linear-gradient(155deg,#101D22,#070A08)" } }),
        mini ? h("img", { key: "m", src: mini, alt: "", loading: "lazy", onError: function (e) { try { e.target.style.display = "none"; } catch (x) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }) : null,
        verrou(v) ? h("div", { key: "l", className: "hv-lock" }, "◈") : null);
    }
    function etatTxt(v) {
      var p = prog(v.id);
      if (p && p.vue) return T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen", "تمت المشاهدة", "已看", "Bekeken", "Vista", "Sedd", "Просмотрено", "Obejrzane", "시청함");
      if (p && p.ouverte) return T("À revoir", "To rewatch", "Por repasar", "Da rivedere", "見なおす", "Nochmal ansehen", "لإعادة المشاهدة", "待重看", "Opnieuw bekijken", "Para rever", "Att se igen", "Пересмотреть", "Do powtórki", "다시 볼 영상");
      return v.intervenant || "";
    }
    /* 04/11 15h (Blandine + maquette ChatGPT validée) : cartes horizontales — grande vignette à gauche avec
       bouton lecture (et la durée, une fois connue par le lecteur), titre en Cormorant, « Cours : … »,
       étiquette Galop au filet champagne, intervenant, barre de progression champagne (« Reprendre à 3:12 »
       ou « ✓ Vue »), étoile discrète en haut à droite. Une seule brique pour toute la Vidéothèque. */
    function carte(v, o) {
      o = o || {};
      var p = prog(v.id) || {};
      var ph = (PHOTOS_THEMES[v.theme] || {}).img || PHOTO_HERO.img;
      var mini = vignette(v) || ph;
      var dur = p.duree ? hvTemps(p.duree) : "";
      var rep = hvReprise(p);
      var pct = p.vue ? 100 : (rep && p.duree ? Math.max(4, Math.min(100, Math.round(rep / p.duree * 100))) : 0);
      var sousTitre = o.sous != null ? o.sous : (v.coursId ? T("Cours : ", "Lesson: ", "Lección: ", "Lezione: ", "レッスン：", "Lektion: ", "الدرس: ", "课程：", "Les: ", "Aula: ", "Lektion: ", "Урок: ", "Lekcja: ", "수업: ") + chapitreDe(v) : nomTheme(v.theme));
      var qui = o.qui != null ? o.qui : (v.aVerifier ? "À vérifier" : (v.intervenant ? v.intervenant + (v.source ? " – " + v.source : "") : (v.source || "")));
      return h("div", { key: v.id, className: "hv3-carte" },
        h("button", { className: "hv3-vig", onClick: function () { ouvrir(v); }, "aria-label": titreDe(v) },
          h("img", { src: mini, alt: "", loading: "lazy", onError: function (e) { try { if (e.target.src.indexOf(ph) < 0) e.target.src = ph; } catch (x) { } } }),
          h("span", { className: "hv3-play", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M9 6.5v11l9-5.5z" }))),
          dur ? h("span", { className: "hv3-duree" }, dur) : null,
          verrou(v) ? h("span", { className: "hv3-lock" }, "◈") : null),
        h("button", { className: "hv3-info", onClick: function () { ouvrir(v); } },
          h("h4", null, titreDe(v)),
          sousTitre ? h("span", { className: "hv3-cours" }, sousTitre) : null,
          h("span", { className: "hv3-meta" },
            v.galop ? h("i", { className: "hv3-pill" }, TXT_GALOP + v.galop) : null,
            qui ? h("span", { className: "hv3-qui" }, qui) : null),
          (pct || o.etat) ? h("span", { className: "hv3-prog" },
            pct ? h("span", { className: "hv3-barre" }, h("span", { style: { width: pct + "%" } })) : h("span", { style: { flex: 1 } }),
            h("span", { className: "hv3-etat" }, o.etat || (p.vue ? "\u2713 " + T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen", "تمت المشاهدة", "已看", "Bekeken", "Vista", "Sedd", "Просмотрено", "Obejrzane", "시청함")
              : T("Reprendre à ", "Resume at ", "Reanudar en ", "Riprendi da ", "続きから ", "Weiter ab ", "المتابعة من ", "从 ", "Hervatten vanaf ", "Retomar em ", "Fortsätt från ", "Продолжить с ", "Wznów od ", "이어보기 ") + hvTemps(rep)))) : null),
        h("button", {
          className: "hv3-fav" + (estFav(v.id) ? " on" : ""), "aria-pressed": estFav(v.id),
          "aria-label": T("Favori", "Favourite", "Favorito", "Preferito", "お気に入り", "Favorit", "مفضل", "最爱", "Favoriet", "Favorito", "Favorit", "Любимая", "Ulubiony", "즐겨찾기"),
          onClick: function () { if (v.vcId) vcMemoriser([v]); basculerFav(v.id); }
        }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M12 3.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.5 6.9 19.3 8 13.6l-4.3-4 5.8-.7z" }))),
        o.pied || null);
    }
    function ligne(v) { return carte(v); }
    function boutonRetour(txt, fn) {
      return h("button", { className: "hv2-retour", onClick: fn }, h("i", { "aria-hidden": "true" }, "‹"), txt);
    }
    /* ---------- 04/11 : vidéos ajoutées par les cavaliers ---------- */
    function VX(k) { return L(VC_TXT[k], langue); }
    var svc = React.useState({ u: null, l: [], pret: false }); var vc = svc[0], setVc = svc[1];
    var sf = React.useState(null); var form = sf[0], setForm = sf[1];      /* null = fermé ; sinon {lien,titre,note,galop,theme,prop,err,envoi,ok} */
    var ssup = React.useState(null); var aSuppr = ssup[0], setASuppr = ssup[1];
    var svt = React.useState(null); var vcTout = svt[0], setVcTout = svt[1];
    var spT = React.useState(false); var plusT = spT[0], setPlusT = spT[1];
    /* 04/11 16h45 (Blandine : « pourquoi pas en défilement automatique qui s'arrête quand on clique dessus ») :
       la rangée des Galops glisse doucement toute seule (aller-retour, petite pause aux bouts) et s'arrête
       pour de bon dès qu'on la touche. Rien si l'iPhone demande de réduire les animations. */
    var refDefile = React.useRef(null);
    React.useEffect(function () {
      var el = refDefile.current; if (!el) return;
      try { if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch (e) { }
      var stop = false, sens = 1, acc = 0, pause = 60, raf = 0, avant = null;
      function arreter() { stop = true; try { cancelAnimationFrame(raf); } catch (e) { } }
      ["pointerdown", "touchstart", "wheel", "keydown", "mousedown"].forEach(function (ev) { el.addEventListener(ev, arreter, { passive: true }); });
      function pas() {
        if (stop) return;
        if (el.scrollWidth - el.clientWidth < 4) { raf = requestAnimationFrame(pas); return; }
        if (pause > 0) { pause--; raf = requestAnimationFrame(pas); return; }
        acc += 0.4;
        if (acc >= 1) {
          var d = Math.floor(acc); acc -= d;
          var x0 = el.scrollLeft; el.scrollLeft = x0 + sens * d;
          if (Math.abs(el.scrollLeft - x0) < 0.5) { sens = -sens; pause = 90; }
        }
        raf = requestAnimationFrame(pas);
      }
      var depart = setTimeout(function () { raf = requestAnimationFrame(pas); }, 900);
      return function () { arreter(); clearTimeout(depart); ["pointerdown", "touchstart", "wheel", "keydown", "mousedown"].forEach(function (ev) { el.removeEventListener(ev, arreter); }); };
    }, [vue]);
    React.useEffect(function () { setPlusT(false); }, [theme, galop]);
    function vcRecharger() { vcCharger(function (u, l) { setVc({ u: u, l: l, pret: true }); }); }
    React.useEffect(function () { if (VIDEOS_CAVALIERS) vcRecharger(); }, []);
    var vcMiennes = vc.u ? vc.l.filter(function (v) { return v.vcAuteur === vc.u.id; }) : [];
    var vcPubliques = vc.l.filter(function (v) { return v.vcStatut === "acceptee"; });
    var vcAttente = vc.l.filter(function (v) { return v.vcStatut === "attente"; });
    function vcStatutTxt(v) {
      return v.vcStatut === "attente" ? VX("sAttente") : v.vcStatut === "acceptee" ? VX("sAcceptee") : v.vcStatut === "refusee" ? VX("sRefusee") : VX("sPerso");
    }
    function ouvrirForm(themeK) {
      var g = (galop === "tous") ? 0 : (galop === "7+" ? 7 : galop);
      setForm({ lien: "", titre: "", note: "", galop: g, theme: themeK || theme || "dressage", prop: false, err: "", envoi: false, ok: "" });
    }
    function majForm(o) { setForm(function (f) { return Object.assign({}, f, o); }); }
    function titreAuto(id) {
      try {
        fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + id))
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) { if (j && j.title) setForm(function (f) { return f && !f.titre ? Object.assign({}, f, { titre: String(j.title).slice(0, 120) }) : f; }); })
          .catch(function () { });
      } catch (e) { }
    }
    function envoyerForm() {
      if (!form || form.envoi) return;
      if (!vc.u) { majForm({ err: VX("errCo") }); return; }
      var id = vcIdYouTube(form.lien);
      if (!id) { majForm({ err: VX("errLien") }); return; }
      if (!String(form.titre || "").trim()) { majForm({ err: VX("errTitre") }); return; }
      if (vcMiennes.some(function (v) { return v.src.ref === id; })) { majForm({ err: VX("errDeja") }); return; }
      majForm({ envoi: true, err: "" });
      var prenom = ""; try { prenom = String((app.profil && (app.profil.prenom || app.profil.pseudo)) || "").slice(0, 40); } catch (e) { }
      vcAjouter({ user_id: vc.u.id, yt: id, titre: String(form.titre).trim().slice(0, 120), note: String(form.note || "").trim().slice(0, 300) || null,
        galop: form.galop || null, theme: form.theme, statut: form.prop ? "attente" : "perso", auteur_nom: prenom || null })
        .then(function (r) { try { var nid = r && r.data && r.data[0] && r.data[0].id; if (nid) { enregistrerFavori("vc-" + nid, true); setEtat(lireLocal()); } } catch (eF) { } setForm({ ok: VX("ok") }); vcRecharger(); })
        .catch(function () { majForm({ envoi: false, err: VX("errAutre") }); });
    }
    function changerStatut(v, s) { vcStatut(v.vcId, s).then(vcRecharger).catch(function () { }); }
    function supprimer(v) {
      if (aSuppr !== v.id) { setASuppr(v.id); return; }
      setASuppr(null); vcSupprimer(v.vcId).then(vcRecharger).catch(function () { });
    }
    var stBtnVc = { fontSize: 11, letterSpacing: ".06em", color: "#C9A66B", background: "none", border: "1px solid rgba(201,166,107,.4)", borderRadius: 8, padding: "7px 10px", fontFamily: "inherit" };
    function ligneVc(v, avecActions) {
      return carte(v, {
        /* 04/11 17h30 : l'auteur (ou l'état pour les siennes) sur sa propre ligne, plus coupé par « … » */
        sous: avecActions ? vcStatutTxt(v) : (v.parCavalier ? VX("par") + v.parCavalier : VX("parAnon")),
        qui: "",
        pied: avecActions ? h("div", { className: "hv3-actions" },
          (v.vcStatut === "perso" || v.vcStatut === "refusee") ? h("button", { onClick: function () { changerStatut(v, "attente"); } }, VX("btnProposer")) : null,
          v.vcStatut === "attente" ? h("button", { onClick: function () { changerStatut(v, "perso"); } }, VX("btnRetirer")) : null,
          h("button", { className: "gris", onClick: function () { supprimer(v); } }, aSuppr === v.id ? VX("confirmSuppr") : VX("btnSuppr"))) : null
      });
    }
    /* rangée horizontale de cartes photo (plus légère que les vidéos officielles) */
    function rangeePhotos(liste) {
      return h("div", { className: "hv3-rangee" }, liste.map(function (v) {
        var ph = (PHOTOS_THEMES[v.theme] || {}).img || PHOTO_HERO.img;
        return h("button", { key: v.id, className: "hv3-photo", "aria-label": titreDe(v) + " · " + (v.parCavalier ? VX("par") + v.parCavalier : VX("parAnon")), title: titreDe(v), onClick: function () { vcMemoriser([v]); ouvrir(v); } },
          h("span", { className: "hv3-photo-img" },
            h("img", { src: vignette(v) || ph, alt: "", loading: "lazy", onError: function (e) { try { if (e.target.src.indexOf(ph) < 0) e.target.src = ph; } catch (x) { } } }),
            h("span", { className: "hv3-play petit", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M9 6.5v11l9-5.5z" })))),
          null);
      }));
    }
    var stChamp = { width: "100%", boxSizing: "border-box", background: "rgba(243,238,228,.04)", border: "1px solid rgba(243,238,228,.16)", borderRadius: 10, color: "#F3EEE4", padding: "11px 12px", fontSize: 16, fontFamily: "inherit", marginTop: 6 };
    var stLab = { display: "block", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--hv-iv2)", marginTop: 14 };
    function blocAjout(themeK) {
      if (!vc.pret) return null;
      /* 04/11 17h40 (Blandine) : bandeau photo sur toute la largeur, au lieu d'un simple bouton */
      /* 04/11 18h08 : toujours la même photo (tête de bai brun), pour ne jamais répéter la photo du thème */
      var phB = { img: "images/galop7-tmp-16-bai-brun-rond.webp", pos: "62% 6%" };
      var bouton = h("button", { className: "hv3-ban", onClick: function () { ouvrirForm(themeK); } },
        h("img", { className: "hv3-ban-img", src: phB.img, alt: "", loading: "lazy", style: { objectPosition: phB.pos } }),
        h("span", { className: "hv3-ban-voile", "aria-hidden": "true" }),
        h("span", { className: "hv3-ban-txt" },
          h("span", { className: "hv3-ban-t" }, VX("banTitre")),
          h("span", { className: "hv3-ban-s" }, VX("banSous")),
          h("span", { className: "hv3-ban-cta" }, h("i", { "aria-hidden": "true" }, "+"), VX("ajouter"))));
      if (!form) return bouton;
      /* la feuille est posée directement sur la page (au-dessus de la barre du bas), dans le style de la Vidéothèque */
      var feuille = h("div", { className: classeRacine(), style: Object.assign({ position: "static" }, styleTraitement()) },
        h("div", { className: "hv3-voile", onClick: function () { setForm(null); } }),
        h("div", { className: "hv3-feuille", role: "dialog", "aria-modal": "true", "aria-label": VX("ajouter") },
          h("span", { className: "hv3-poignee", "aria-hidden": "true" }), contenuForm(themeK)));
      var porte = null;
      try { if (window.ReactDOM && window.ReactDOM.createPortal && document.body) porte = window.ReactDOM.createPortal(feuille, document.body); } catch (eP) { }
      return h("div", null, bouton, porte || feuille);
    }
    function contenuForm(themeK) {
      if (form.ok) return h("div", { className: "hv2-vc-form" },
        h("p", { style: { margin: 0, color: "#F3EEE4", fontSize: 14 } }, form.ok),
        h("button", { className: "hv3-ajout", style: { marginTop: 16 }, onClick: function () { setForm(null); } }, VX("fermer")));
      var galops = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      return h("div", { className: "hv2-vc-form" },
        h("p", { style: { margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#F3EEE4" } }, VX("ajouter")),
        h("p", { className: "hv2-sous", style: { margin: "6px 0 0", fontSize: 13.5 } }, VX("intro")),
        !vc.u ? h("p", { style: { color: "#C9A66B", fontSize: 13, marginTop: 12 } }, VX("errCo")) : null,
        h("label", { style: stLab }, VX("lien"),
          h("input", { type: "url", inputMode: "url", value: form.lien, placeholder: "https://youtu.be/…", style: stChamp, autoComplete: "off",
            onChange: function (e) { var val = e.target.value; majForm({ lien: val, err: "" }); var id = vcIdYouTube(val); if (id && !form.titre) titreAuto(id); } })),
        h("label", { style: stLab }, VX("titre"),
          h("input", { type: "text", value: form.titre, maxLength: 120, style: stChamp, onChange: function (e) { majForm({ titre: e.target.value, err: "" }); } })),
        h("label", { style: stLab }, VX("note"),
          h("textarea", { value: form.note, maxLength: 300, rows: 2, style: Object.assign({}, stChamp, { resize: "vertical" }), onChange: function (e) { majForm({ note: e.target.value }); } })),
        h("div", { style: { display: "flex", gap: 10 } },
          h("label", { style: Object.assign({}, stLab, { flex: 1 }) }, VX("theme"),
            h("select", { value: form.theme, style: stChamp, onChange: function (e) { majForm({ theme: e.target.value }); } },
              THEMES_ORDRE.map(function (k) { return h("option", { key: k, value: k }, nomTheme(k)); }))),
          h("label", { style: Object.assign({}, stLab, { flex: 1 }) }, VX("galop"),
            h("select", { value: String(form.galop || 0), style: stChamp, onChange: function (e) { majForm({ galop: parseInt(e.target.value, 10) || 0 }); } },
              galops.map(function (g) { return h("option", { key: g, value: String(g) }, g ? TXT_GALOP + g : VX("tousG")); })))),
        h("label", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginTop: 16, color: "#F3EEE4", fontSize: 14, lineHeight: 1.4 } },
          h("input", { type: "checkbox", checked: !!form.prop, style: { marginTop: 3, accentColor: "#C9A66B", width: 18, height: 18 }, onChange: function (e) { majForm({ prop: e.target.checked }); } }),
          h("span", null, VX("proposer"), h("span", { style: { display: "block", fontSize: 12, color: "var(--hv-iv2)", marginTop: 3 } }, VX("proposerInfo")))),
        form.err ? h("p", { role: "alert", style: { color: "#E8B4A0", fontSize: 13, margin: "12px 0 0" } }, form.err) : null,
        h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
          h("button", { className: "hv2-vc-ok", disabled: form.envoi || !vc.u, onClick: envoyerForm }, VX("valider")),
          h("button", { className: "hv2-vc-non", onClick: function () { setForm(null); } }, VX("annuler"))));
    }
    var TXT_RETOUR_VT = T("Retour à la Vidéothèque", "Back to the video library", "Volver a la videoteca", "Torna alla videoteca", "動画ライブラリに戻る", "Zurück zur Videothek", "العودة إلى مكتبة الفيديو", "返回视频库", "Terug naar de videotheek", "Voltar à videoteca", "Tillbaka till videobiblioteket", "Назад в видеотеку", "Wróć do wideoteki", "비디오 라이브러리로 돌아가기");
    var TXT_MES = T("Mes vidéos", "My videos", "Mis vídeos", "I miei video", "マイ動画", "Meine Videos", "فيديوهاتي", "我的视频", "Mijn video's", "Meus vídeos", "Mina videor", "Мои видео", "Moje filmy", "내 영상");
    var svgFav = h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M6.5 3.5h11v17l-5.5-4.2-5.5 4.2z" }));
    var svgLoupe = h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("circle", { cx: 10.5, cy: 10.5, r: 6.5 }), h("path", { d: "M15.5 15.5 21 21" }));

    /* ---------- en-tête ---------- */
    function courbe(cls, d) {
      return h("svg", { className: "hv2-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
        h("defs", null, h("linearGradient", { id: "hv2g-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
          h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
          h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
          h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
        /* 04/11 (Blandine : « reprends vraiment le design exact, en dessous du trait y a plus de photo ») :
           sous la courbe du bas, tout est noir — la photo s'arrête sur le trait, quelle que soit la photo. */
        cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
        h("path", { d: d, fill: "none", stroke: "url(#hv2g-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
    }
    /* En-tête commun (04/11, Blandine : « le haut des pages des onglets doit avoir
       la même présentation que celle de la Vidéothèque ») : HYPE, grande photo,
       courbe champagne, titre et sous-titre en vrai texte sous la photo.
       Sert à l'accueil (PHOTO_HERO) et à chaque thème (PHOTOS_THEMES). */
    function heroDe(o) {
      /* 04/11 15h30 (maquette ChatGPT validée, page « Dressage ») : photo plein cadre, bouton retour rond,
         « THÈME » en petites capitales champagne, grand titre à gauche posé sur la photo, sous-titre, courbe dessous */
      if (o.maquette) return h("div", { className: "hv3-hm" },
        (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null,
        h("button", { className: "hv3-rond", onClick: o.onRetour, "aria-label": o.lRetour || "" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M14.5 5.5 8 12l6.5 6.5" }))),
        h("div", { className: "hv3-hm-photo", style: Object.assign({ "--hv-pos-tel": o.posTel || "center", "--hv-pos-tab": o.posTab || o.posTel || "center", "--hv-pos-ordi": o.posOrdi || o.posTab || o.posTel || "center" }, styleTraitement()) },
          h("img", { src: o.img, alt: o.alt || "", fetchpriority: "high" })),
        h("div", { className: "hv3-hm-txt" },
          o.kicker ? h("span", { className: "hv3-hm-k" }, o.kicker) : null,
          h("h1", null, o.titre), o.sous ? h("p", null, o.sous) : null),
        h("svg", { className: "hv3-hm-courbe", viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true" },
          h("defs", null, h("linearGradient", { id: "hv3g", x1: "0", x2: "1", y1: "0", y2: "0" },
            h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: ".55" }), h("stop", { offset: ".6", stopColor: "#D9B97E", stopOpacity: "1" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".8" }))),
          h("path", { d: "M0 22 C 120 30, 230 52, 400 18 L400 60 L0 60 Z", fill: "#070A08" }),
          h("path", { d: "M0 22 C 120 30, 230 52, 400 18", fill: "none", stroke: "url(#hv3g)", strokeWidth: 2, vectorEffect: "non-scaling-stroke" })));
      if (!o.retour && o.onRetour) o.retour = boutonRetour(o.lRetour || "", o.onRetour);
      return h("div", { className: "hv2-hero" + (o.retour ? " hv2-hero-r" : "") },
        /* 04/11 09h43 (Blandine) : plus de petit « HYPE » en haut de page ; drapeau des langues en haut à droite
           (même sélecteur et même place que la page Galops) */
        (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null,
        o.retour ? h("div", { className: "hv2-in hv2-hero-retour" }, o.retour) : null,
        courbe("c1", "M250 4 C 330 8, 385 40, 400 96"),
        h("div", {
          className: "hv2-photo hv2-traite",
          style: Object.assign({ "--hv-pos-tel": o.posTel || "center", "--hv-pos-tab": o.posTab || o.posTel || "center", "--hv-pos-ordi": o.posOrdi || o.posTab || o.posTel || "center" }, styleTraitement())
        },
          h("img", { src: o.img, alt: o.alt || "", "aria-hidden": o.alt ? undefined : "true", fetchpriority: "high" }),
          o.intro ? h("button", { className: "hv2-intro", "aria-label": titreDe(o.intro), onClick: function () { ouvrir(o.intro); } },
            h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, "aria-hidden": "true" }, h("path", { d: "M9 6.5v11l9-5.5z", fill: "none", stroke: "#F3EEE4", strokeWidth: 1.5 }))) : null),
        courbe("c2", "M0 92 C 130 90, 240 62, 400 8"),
        h("div", { className: "hv2-in" },
          h("div", { className: "hv2-titre" }, h("h1", null, o.titre), o.sous ? h("p", null, o.sous) : null)));
    }
    var vIntro = VIDEO_INTRO ? vidDe(VIDEO_INTRO) : null;
    var hero = heroDe({
      img: PHOTO_HERO.img, posTel: PHOTO_HERO.posTel, posTab: PHOTO_HERO.posTab, posOrdi: PHOTO_HERO.posOrdi, intro: vIntro,
      titre: T("Vidéothèque", "Video library", "Videoteca", "Videoteca", "動画ライブラリ", "Videothek", "مكتبة الفيديو", "视频库", "Videotheek", "Videoteca", "Videobibliotek", "Видеотека", "Wideoteka", "비디오 라이브러리"),
      sous: T("Observe le geste. Trouve ta sensation.", "Watch the movement. Find your feel.", "Observa el gesto. Encuentra tu sensación.", "Osserva il gesto. Trova la tua sensazione.", "動きを見て、自分の感覚をつかもう。", "Beobachte die Bewegung. Finde dein Gefühl.", "لاحظي الحركة. جدي إحساسك.", "观察动作，找到你的感觉。", "Kijk naar het gebaar. Vind je gevoel.", "Observe o gesto. Encontre sua sensação.", "Titta på rörelsen. Hitta din känsla.", "Смотри на движение. Найди своё ощущение.", "Obserwuj ruch. Znajdź swoje czucie.", "동작을 관찰하고, 나만의 감각을 찾아요.")
    });

    /* ---------- bibliothèque vide : annonce franche ---------- */
    if (!dispo.length) {
      return h("div", { className: classeRacine(), style: styleTraitement() }, hero,
        h("div", { className: "hv2-in" }, h("div", { className: "hv2-vide" },
          h("p", null, T("Les premières vidéos arrivent.", "The first videos are on their way.", "Los primeros vídeos están en camino.", "I primi video stanno arrivando.", "最初の動画を準備しています。", "Die ersten Videos sind auf dem Weg.", "الفيديوهات الأولى في الطريق.", "首批视频马上就来。", "De eerste video's komen eraan.", "Os primeiros vídeos estão chegando.", "De första videorna är på väg.", "Первые видео скоро появятся.", "Pierwsze filmy już wkrótce.", "첫 영상들이 곧 올라와요.")))));
    }

    /* ---------- recherche (une seule icône, un champ) ---------- */
    function correspondRech(v) {
      if (!rq) return true;
      var champ = (titreDe(v) + " " + chapitreDe(v) + " " + resumeDe(v) + " " + (v.titreSource || "") + " " + (v.intervenant || "") + " " + observerDe(v).join(" ") + " " + nomTheme(v.theme)).toLowerCase();
      return champ.indexOf(rq.toLowerCase().trim()) >= 0;
    }
    var ligneAcces = h("div", { className: "hv2-ligne" },
      h("button", { className: "hv2-mes", onClick: function () { setVue("mes"); } }, svgFav, TXT_MES),
      h("button", {
        className: "hv2-loupe", "aria-expanded": rechOuverte, "aria-controls": "hv2-rech",
        "aria-label": T("Rechercher", "Search", "Buscar", "Cerca", "検索", "Suchen", "بحث", "搜索", "Zoeken", "Pesquisar", "Sök", "Поиск", "Szukaj", "검색"),
        onClick: function () { if (rechOuverte) { setRq(""); } setRechOuverte(!rechOuverte); }
      }, svgLoupe));
    var champRech = rechOuverte ? h("div", { className: "hv2-rech", id: "hv2-rech", role: "search" },
      svgLoupe,
      h("input", {
        ref: refRech, type: "search", value: rq, autoComplete: "off", enterKeyHint: "search",
        "aria-label": T("Rechercher une vidéo, un exercice ou une notion", "Search a video, an exercise or a notion", "Buscar un vídeo, un ejercicio o una noción", "Cerca un video, un esercizio o una nozione", "動画・練習・用語を検索", "Video, Übung oder Begriff suchen", "ابحثي عن فيديو أو تمرين أو مفهوم", "搜索视频、练习或知识点", "Zoek een video, een oefening of een begrip", "Procure um vídeo, um exercício ou uma noção", "Sök efter en video, en övning eller ett begrepp", "Найти видео, упражнение или понятие", "Szukaj wideo, ćwiczenia lub pojęcia", "영상, 운동, 개념 검색"),
        placeholder: T("Rechercher une vidéo, un exercice ou une notion", "Search a video, an exercise or a notion", "Buscar un vídeo, un ejercicio o una noción", "Cerca un video, un esercizio o una nozione", "動画・練習・用語を検索", "Video, Übung oder Begriff suchen", "ابحثي عن فيديو أو تمرين أو مفهوم", "搜索视频、练习或知识点", "Zoek een video, een oefening of een begrip", "Procure um vídeo, um exercício ou uma noção", "Sök efter en video, en övning eller ett begrepp", "Найти видео, упражнение или понятие", "Szukaj wideo, ćwiczenia lub pojęcia", "영상, 운동, 개념 검색"),
        onChange: function (e) { setRq(e.target.value); }
      }),
      h("button", {
        className: "hv2-x",
        "aria-label": T("Fermer la recherche", "Close search", "Cerrar la búsqueda", "Chiudi la ricerca", "検索を閉じる", "Suche schließen", "إغلاق البحث", "关闭搜索", "Zoeken sluiten", "Fechar a pesquisa", "Stäng sökningen", "Закрыть поиск", "Zamknij wyszukiwanie", "검색 닫기"),
        onClick: function () { setRq(""); setRechOuverte(false); }
      }, "×")) : null;

    /* onglets des Galops : disponibilités calculées sur le catalogue réel ; dans une page de thème,
       seulement les vidéos de ce thème (04/11, Blandine : « ajoute les onglets dans les pages à thème ») */
    var TXT_BIENTOT = T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst", "قريبا", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개");
    /* 04/11 09h31 (Blandine, maquette d'origine à l'appui) : « Choisis ton Galop » avec la pastille
       « Tous » à droite, puis les SEULS Galops qui ont des vidéos, côte à côte sur une ligne (Galop 1 ·
       7 vidéos…), sans onglets « Prochainement » ; uniquement sur la première page. Un Galop qui reçoit
       des vidéos apparaît tout seul. */
    function choixGalop() {
      /* 04/11 09h32 (Blandine) : 4 cases sur une ligne — Galop 1, 2, 3, puis « Galop 4 et + » qui
         déroule une 2e ligne (Galop 4, 5, 6, 7 et +) quand on la touche. Galop sans vidéo : atténué,
         « Prochainement », non activable. */
      function caseGalop(k) {
        var n = dispo.filter(function (v) { return galopOk(v, k); }).length;
        var on = galop === k;
        return h("button", { key: String(k), className: "hv2-og hv2-cg" + (on ? " on" : ""), "aria-pressed": on, disabled: !n, "aria-disabled": !n,
          onClick: function () { if (n) setGalop(on ? "tous" : k); } },
          h("b", null, k === "7+" ? T("Galop 7+", "Level 7+", "Galop 7+", "Galop 7+", "ガロー 7+", "Galopp 7+", "الغالوب +7", "Galop 7+", "Galop 7+", "Galop 7+", "Galop 7+", "Galop 7+", "Galop 7+", "Galop 7+") : nomOnglet(k)),
          h("span", null, n ? nbVideos(n) : T("Bientôt", "Soon", "Pronto", "Presto", "近日", "Bald", "قريبا", "即将", "Binnenkort", "Em breve", "Snart", "Скоро", "Wkrótce", "곧")));
      }
      var haut = ONGLETS_GALOPS.filter(function (k) { return k !== "tous" && (k === "7+" || k >= 4); });
      var deroule = plusOuvert || haut.indexOf(galop) >= 0;
      var nHaut = dispo.filter(function (v) { return (v.galop || 0) >= 4; }).length;
      var btnPlus = h("button", {
        key: "plus", className: "hv2-og hv2-cg hv2-cg-plus" + (deroule ? " ouvert" : ""), "aria-expanded": deroule, "aria-controls": "hv2-choix-plus",
        onClick: function () { setPlusOuvert(!deroule); if (deroule && haut.indexOf(galop) >= 0) setGalop("tous"); }
      },
        h("b", null, deroule ? T("Moins", "Less", "Menos", "Meno", "閉じる", "Weniger", "أقل", "收起", "Minder", "Menos", "Mindre", "Свернуть", "Mniej", "접기") : T("Galop 4+", "Level 4+", "Galop 4+", "Galop 4+", "ガロー 4+", "Galopp 4+", "الغالوب +4", "Galop 4+", "Galop 4+", "Galop 4+", "Galop 4+", "Galop 4+", "Galop 4+", "Galop 4+")),
        h("span", null, deroule ? "\u25B4" : (T("Voir plus", "See more", "Ver más", "Vedi altro", "もっと見る", "Mehr", "المزيد", "更多", "Meer", "Ver mais", "Visa mer", "Ещё", "Więcej", "더 보기") + " \u25BE")));
      return h("div", { className: "hv2-choix" },
        h("div", { className: "hv2-choix-tete" },
          h("h2", { className: "hv2-h2", style: { margin: 0 } }, T("Choisis ton Galop", "Choose your level", "Elige tu Galop", "Scegli il tuo Galop", "ガローを選ぼう", "Wähle deinen Galopp", "اختاري مستواك في الغالوب", "选择你的 Galop", "Kies je Galop", "Escolha seu Galop", "Välj din Galop", "Выбери свой уровень Galop", "Wybierz swój poziom Galop", "나의 Galop 선택")),
          h("button", { className: "hv2-tous" + (galop === "tous" ? " on" : ""), "aria-pressed": galop === "tous", onClick: function () { setGalop("tous"); } }, nomOnglet("tous"))),
        /* 04/11 16h45 (Blandine : « faudrait pouvoir faire défiler les onglets des Galops ») : tous les Galops
           sur une seule rangée qui défile au doigt (plus de « Galop 4+ / Voir plus ») */
        h("div", { className: "hv2-choix-defile", role: "toolbar", ref: refDefile }, ONGLETS_GALOPS.filter(function (k) { return k !== "tous"; }).map(caseGalop)));
    }
    function ongletsGalops(themeK) {
      return h("div", {
        className: "hv2-onglets", role: "tablist",
        "aria-label": T("Choisis un Galop", "Choose a level", "Elige un Galop", "Scegli un Galop", "ガローを選ぶ", "Wähle einen Galopp", "اختاري مستوى الغالوب", "选择 Galop", "Kies een Galop", "Escolha um Galop", "Välj en Galop", "Выбери уровень Galop", "Wybierz poziom Galop", "Galop 선택")
      }, ONGLETS_GALOPS.map(function (k) {
        var n = dispo.filter(function (v) { return galopOk(v, k) && (!themeK || v.theme === themeK); }).length;
        var on = galop === k;
        return h("button", {
          key: String(k), role: "tab", "aria-selected": on, disabled: !n, "aria-disabled": !n,
          className: "hv2-og" + (on ? " on" : ""),
          /* l'onglet choisi est toujours visible dans la rangée qui défile (sans faire bouger la page) */
          ref: on ? function (el) {
            if (!el || el.__hvVu) return; el.__hvVu = true;
            try {
              var pr = el.parentNode; if (pr.scrollWidth <= pr.clientWidth) return;
              var re = el.getBoundingClientRect(), rp = pr.getBoundingClientRect();
              pr.scrollLeft += (re.left + re.width / 2) - (rp.left + rp.width / 2);
            } catch (e) { }
          } : undefined,
          title: !n ? nomOnglet(k) + " · " + TXT_BIENTOT : undefined,
          onClick: function () { if (n) setGalop(k); }
        },
          /* forme courte (onglets serrés) : « Galop » en petit au-dessus du numéro */
          h("span", { className: "hv2-og-court", "aria-hidden": "true" },
            k === "tous" ? h("b", null, nomOnglet(k)) : [h("i", { key: "i" }, TXT_GALOP.trim()), h("b", { key: "b" }, String(k))]),
          h("span", { className: "hv2-og-long" }, nomOnglet(k)),
          !n ? h("small", null, T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst", "قريبا", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개")) : null);
      }));
    }

    /* ---------- VUE : thème ouvert (Galop sélectionné ET thème) ---------- */
    if (vue === "theme" && theme) {
      /* 04/11 16h55 (Blandine : « dans les thèmes, propose un onglet Tous avec toutes les vidéos ») : theme === "tous" */
      var dansT = function (v) { return theme === "tous" || v.theme === theme; };
      var vsT = dispo.filter(function (v) { return dansT(v) && galopOk(v, galop); });
      var phT = theme === "tous" ? PHOTO_HERO : (PHOTOS_THEMES[theme] || {});
      return h("div", { className: classeRacine(), style: styleTraitement() },
        heroDe({
          img: phT.img || PHOTO_HERO.img, posTel: phT.posHeroTel || phT.pos, posTab: phT.posHeroTab || phT.pos, posOrdi: phT.posHeroOrdi || phT.pos,
          alt: L(phT.alt, langue), titre: theme === "tous" ? T("Toutes les vidéos", "All videos", "Todos los vídeos", "Tutti i video", "すべての動画", "Alle Videos", "كل الفيديوهات", "全部视频", "Alle video's", "Todos os vídeos", "Alla videor", "Все видео", "Wszystkie filmy", "모든 영상") : nomTheme(theme), sous: nomGalopSel() + " · " + nbVideos(vsT.length),
          /* 04/11 16h45 (Blandine : « suis les mêmes réglages et mise en page du hero et de la courbe sur les autres pages,
             reproduis ce que tu as sur la page principale ») : même en-tête que l'accueil de la Vidéothèque */
          maquette: false, kicker: T("Thème", "Topic", "Tema", "Tema", "テーマ", "Thema", "الموضوع", "主题", "Thema", "Tema", "Tema", "Тема", "Temat", "주제"),
          lRetour: T("Retour aux thèmes", "Back to topics", "Volver a los temas", "Torna ai temi", "テーマに戻る", "Zurück zu den Themen", "العودة إلى المواضيع", "返回主题", "Terug naar de thema's", "Voltar aos temas", "Tillbaka till teman", "Назад к темам", "Wróć do tematów", "주제로 돌아가기"), onRetour: function () { setVue("accueil"); setTheme(null); }
        }),
        h("div", { className: "hv2-in" },
          /* 04/11 15h (maquette validée) : filtres par Galop en pilules semi-transparentes, avec le nombre de vidéos */
          (function () {
            var tousT = dispo.filter(dansT);
            var gs = []; tousT.forEach(function (v) { if (v.galop && gs.indexOf(v.galop) < 0) gs.push(v.galop); }); gs.sort(function (a, b) { return a - b; });
            function pil(k, lib, n) {
              var on = galop === k || (k !== "tous" && galop === "7+" && k >= 7 && false);
              return h("button", { key: String(k), className: "hv3-pil" + (on ? " on" : ""), "aria-pressed": on, onClick: function () { setGalop(k); } }, lib + " (" + n + ")");
            }
            return h("div", { className: "hv3-pils", role: "toolbar" },
              [pil("tous", VX("toutes"), tousT.length)].concat(gs.map(function (g) { return pil(g, TXT_GALOP + g, tousT.filter(function (v) { return v.galop === g; }).length); })));
          })(),
          h("h2", { className: "hv3-h2" }, VX("videosTheme")),
          /* 04/11 15h20 (Blandine : « au-delà d'un certain nombre, un truc qui se déplie avec Voir plus ») : 5 cartes, puis « Voir plus (n) » */
          vsT.length ? h("div", null, h("div", { className: "hv3-cartes" }, (plusT || vsT.length <= 6 ? vsT : vsT.slice(0, 5)).map(ligne)),
            (!plusT && vsT.length > 6) ? h("div", { className: "hv3-plus-zone" }, h("button", { className: "hv3-plus", onClick: function () { setPlusT(true); } }, VX("voirPlus") + " (" + (vsT.length - 5) + ")", h("i", { "aria-hidden": "true" }, "\u02C5"))) : null)
            : h("div", { className: "hv2-vide" }, h("p", null, T("Pas encore de vidéo pour ce Galop.", "No video for this level yet.", "Aún no hay vídeo para este Galop.", "Ancora nessun video per questo Galop.", "このガローの動画はまだありません。", "Noch kein Video für diesen Galopp.", "لا يوجد فيديو لهذا المستوى بعد.", "这个 Galop 还没有视频。", "Nog geen video voor deze Galop.", "Ainda não há vídeo para este Galop.", "Ingen video för denna nivå än.", "Пока нет видео для этого уровня.", "Brak jeszcze filmu dla tego poziomu.", "이 Galop에는 아직 영상이 없어요."))),
          /* vidéos des cavaliers : acceptées (tout le monde), puis les miennes, puis « Ajouter une vidéo » */
          VIDEOS_CAVALIERS ? (function () {
            var pub = vcPubliques.filter(function (v) { return dansT(v) && (!v.galop || galopOk(v, galop)); });
            var mie = vcMiennes.filter(function (v) { return dansT(v) && v.vcStatut !== "acceptee" && (!v.galop || galopOk(v, galop)); });
            function tete(txt, liste) {
              return h("div", { className: "hv3-tete" }, h("h2", { className: "hv3-h2" }, txt),
                liste.length > 3 ? h("button", { className: "hv3-voir", onClick: function () { setVcTout(vcTout === txt ? null : txt); } }, vcTout === txt ? VX("moins") : VX("voirTout"), h("i", { "aria-hidden": "true" }, " \u203A")) : null);
            }
            return h("div", { className: "hv3-vc" },
              pub.length ? h("div", null, tete(VX("proposees"), pub), h("div", { className: "hv3-cartes" }, (vcTout === VX("proposees") ? pub : pub.slice(0, 3)).map(function (v) { return ligneVc(v, false); }))) : null,
              mie.length ? h("div", null, tete(VX("tiennes"), mie), h("div", { className: "hv3-cartes" }, mie.map(function (v) { return ligneVc(v, true); }))) : null,
              h("div", { className: "hv3-ajout-zone" }, blocAjout(theme === "tous" ? null : theme)));
          })() : null,
          h("div", { className: "hv3-page-bas", "aria-hidden": "true" })));
    }

    /* ---------- VUE : Mes vidéos ---------- */
    if (vue === "mes") {
      var derniere = null;
      dispo.forEach(function (v) {
        var p = prog(v.id);
        if (p && p.ouverte && !p.vue && (!derniere || (p.ouverte || "") > (prog(derniere.id).ouverte || ""))) derniere = v;
      });
      var favs = dispo.filter(function (v) { return estFav(v.id); });
      var hist = dispo.filter(function (v) { var p = prog(v.id); return p && (p.ouverte || p.vue); })
        .sort(function (a, b) { var pa = prog(a.id), pb = prog(b.id); return String(pb.quand || pb.ouverte || "") > String(pa.quand || pa.ouverte || "") ? 1 : -1; });
      /* 04/11 : les vidéos des cavaliers comptent aussi dans les favoris et l'historique */
      var vcConnues = vc.l;
      favs = favs.concat(vcConnues.filter(function (v) { return estFav(v.id); }));
      hist = hist.concat(vcConnues.filter(function (v) { var p = prog(v.id); return p && (p.ouverte || p.vue); }))
        .sort(function (a, b) { var pa = prog(a.id), pb = prog(b.id); return String(pb.quand || pb.ouverte || "") > String(pa.quand || pa.ouverte || "") ? 1 : -1; });
      var liste = onglet === "hist" ? hist : favs;
      var vide = onglet === "hist"
        ? [T("Ton historique est vide.", "Your history is empty.", "Tu historial está vacío.", "La tua cronologia è vuota.", "履歴はまだ空です。", "Dein Verlauf ist leer.", "سجلك فارغ.", "你的历史记录是空的。", "Je geschiedenis is leeg.", "Seu histórico está vazio.", "Din historik är tom.", "Твоя история пуста.", "Twoja historia jest pusta.", "기록이 비어 있어요."),
           T("Les vidéos que tu ouvres viendront se ranger ici.", "Videos you open will be filed here.", "Los vídeos que abras se guardarán aquí.", "I video che apri si raccoglieranno qui.", "開いた動画がここに並びます。", "Videos, die du öffnest, werden hier abgelegt.", "ستصنف هنا الفيديوهات التي تفتحينها.", "你打开过的视频会收纳在这里。", "Video's die je opent komen hier te staan.", "Os vídeos que você abrir serão guardados aqui.", "Videor du öppnar hamnar här.", "Открытые тобой видео будут складываться здесь.", "Otwarte filmy trafią tutaj.", "열어 본 영상이 여기에 정리돼요.")]
        : [T("Aucun favori pour l'instant.", "No favourites yet.", "Aún no hay favoritos.", "Nessun preferito per ora.", "お気に入りはまだありません。", "Noch keine Favoriten.", "لا توجد مفضلات حاليا.", "暂时还没有收藏。", "Nog geen favorieten.", "Nenhum favorito por enquanto.", "Inga favoriter ännu.", "Пока нет избранного.", "Na razie brak ulubionych.", "아직 즐겨찾기가 없어요."),
           T("Touche l'étoile sur une vidéo pour la retrouver ici.", "Tap the star on a video to find it here.", "Toca la estrella de un vídeo para encontrarlo aquí.", "Tocca la stella su un video per ritrovarlo qui.", "動画の星に触れると、ここに集まります。", "Tippe auf den Stern, um ein Video hier zu finden.", "المسي النجمة على أي فيديو لتجديه هنا.", "点视频上的星标，就能在这里找到它。", "Tik op de ster bij een video om hem hier terug te vinden.", "Toque na estrela de um vídeo para encontrá-lo aqui.", "Tryck på stjärnan på en video för att hitta den här.", "Коснись звёздочки на видео, чтобы найти его здесь.", "Dotknij gwiazdki przy filmie, aby go tu znaleźć.", "영상의 별을 터치하면 여기서 다시 볼 수 있어요.")];
      return h("div", { className: classeRacine(), style: styleTraitement() },
        (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null,
        h("div", { className: "hv2-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 14px)" } },
          boutonRetour(TXT_RETOUR_VT, function () { setVue("accueil"); }),
          h("h2", { className: "hv2-h2", style: { marginTop: 8 } }, TXT_MES),
          /* seul l'état « ouverte » est connu (lecteur YouTube) : jamais de « reprendre à 3 min 12 » */
          derniere ? h("div", null,
            h("p", { className: "hv2-k" }, T("Dernière vidéo ouverte", "Last video opened", "Último vídeo abierto", "Ultimo video aperto", "最後に開いた動画", "Zuletzt geöffnetes Video", "آخر فيديو فتحته", "最近打开的视频", "Laatst geopende video", "Último vídeo aberto", "Senast öppnade video", "Последнее открытое видео", "Ostatnio otwarty film", "마지막으로 연 영상")),
            h("div", { className: "hv3-cartes" }, ligne(derniere)),
            /* 04/11 15h : « Arrêtée à … » est maintenant sur la carte (« Reprendre à … ») — pas de doublon */
            null) : null,
          h("div", { className: "hv2-mini-ong", role: "tablist" },
            [["fav", T("Favoris", "Favourites", "Favoritos", "Preferiti", "お気に入り", "Favoriten", "المفضلة", "收藏", "Favorieten", "Favoritos", "Favoriter", "Избранное", "Ulubione", "즐겨찾기")],
             ["hist", T("Historique", "History", "Historial", "Cronologia", "履歴", "Verlauf", "السجل", "历史记录", "Geschiedenis", "Histórico", "Historik", "История", "Historia", "기록")],
             VIDEOS_CAVALIERS ? ["ajout", VX("ongAjout")] : null].filter(Boolean).map(function (x) {
              return h("button", { key: x[0], role: "tab", "aria-selected": onglet === x[0], className: onglet === x[0] ? "on" : "", onClick: function () { setOnglet(x[0]); } }, x[1]);
            })),
          onglet === "ajout"
            ? h("div", null,
                vcMiennes.length ? h("div", { className: "hv3-cartes" }, vcMiennes.map(function (v) { return ligneVc(v, true); }))
                  : h("div", { className: "hv2-vide" }, h("p", null, VX("videAjout1")), h("p", null, VX("videAjout2"))),
                h("div", { style: { marginTop: 18 } }, blocAjout(null)))
          : liste.length ? h("div", { className: "hv3-cartes" }, liste.map(function (v) { return v.vcId ? ligneVc(v, false) : ligne(v); }))
            : h("div", { className: "hv2-vide" }, h("p", null, vide[0]), h("p", null, vide[1]))));
    }

    /* ---------- VUE : propositions des cavaliers (modératrice, en français) ---------- */
    if (vue === "propos" && estModo) {
      var chB = { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "#C9A66B", background: "none", border: "1px solid rgba(201,166,107,.45)", borderRadius: 8, padding: "9px 12px", fontFamily: "inherit", fontWeight: 600 };
      return h("div", { className: classeRacine() },
        h("div", { className: "hv2-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 14px)" } },
          boutonRetour("Retour à la Vidéothèque", function () { setVue("accueil"); }),
          h("h2", { className: "hv2-h2", style: { marginTop: 8 } }, "Propositions des cavaliers"),
          h("p", { className: "hv2-sous" }, "Visible par toi seule. Accepter = visible par tous dans « Proposées par les cavaliers », dans son thème. Refuser = la vidéo reste dans la liste de son auteur."),
          vcAttente.length ? h("div", { className: "hv3-cartes", style: { marginTop: 14 } }, vcAttente.map(function (v) {
            return h("div", { key: v.id, style: { paddingBottom: 12, borderBottom: "1px solid rgba(243,238,228,.07)" } },
              ligneVc(v, false),
              v.i18nResume ? h("p", { style: { margin: "6px 0 0", fontSize: 12.5, color: "rgba(243,238,228,.7)", fontStyle: "italic" } }, "« " + L(v.i18nResume, "fr") + " »") : null,
              h("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
                h("button", { style: chB, onClick: function () { changerStatut(v, "acceptee"); } }, "Accepter"),
                h("button", { style: Object.assign({}, chB, { color: "rgba(243,238,228,.6)", borderColor: "rgba(243,238,228,.2)" }), onClick: function () { changerStatut(v, "refusee"); } }, "Refuser")));
          })) : h("div", { className: "hv2-vide" }, h("p", null, "Aucune proposition en attente.")),
          vcPubliques.length ? h("div", { style: { marginTop: 26 } },
            h("h2", { className: "hv2-h2" }, "Déjà acceptées (" + vcPubliques.length + ")"),
            h("div", { className: "hv3-cartes" }, vcPubliques.map(function (v) {
              return h("div", { key: v.id }, ligneVc(v, false),
                h("button", { style: Object.assign({}, chB, { marginTop: 6, color: "rgba(243,238,228,.6)", borderColor: "rgba(243,238,228,.2)" }), onClick: function () { changerStatut(v, "refusee"); } }, "Retirer de la liste publique"));
            }))) : null));
    }

    /* ---------- VUE : réserve d'animations (modératrices seulement, en français) ---------- */
    if (vue === "reserve" && estModo) {
      var ec = 0; ANIMS.forEach(function (x) { if (ecartees()[x.id]) ec++; });
      var chBtn = { fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#C9A66B", background: "none", border: "1px solid rgba(201,166,107,.45)", borderRadius: 8, padding: "9px 12px", fontFamily: "inherit", textDecoration: "none", fontWeight: 600 };
      return h("div", { className: classeRacine() },
        (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null,
        h("div", { className: "hv2-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 14px)" } },
          boutonRetour("Retour à la Vidéothèque", function () { setVue("accueil"); }),
          h("h2", { className: "hv2-h2", style: { marginTop: 8 } }, "Réserve d'animations"),
          h("p", { className: "hv2-sous" }, "Visible par toi seule. " + (ANIMS.length - ec) + " animations sur " + ANIMS.length + (ec ? (" · " + ec + " écartée" + (ec > 1 ? "s" : "")) : "") + "."),
          ec ? h("button", { style: chBtn, onClick: function () { ANIMS.forEach(function (x) { ecarter(x.id, false); }); setEtat(lireLocal()); } }, "Réafficher tout") : null,
          h("div", { className: "hv3-cartes hv3-reserve", style: { marginTop: 14 } }, ANIMS.filter(function (a4) { return !ecartees()[a4.id]; }).map(function (a3) {
            return h("div", { key: a3.id, style: { padding: "12px 0", borderBottom: "1px solid rgba(243,238,228,.07)" } },
              h("button", { style: { display: "flex", gap: 12, alignItems: "center", width: "100%", textAlign: "start", background: "none", border: "none", padding: 0 }, onClick: function () { if (a3.src) { ouvrir(a3); } } },
                h("span", { className: "hv-cov", style: { width: 86, flex: "0 0 86px", aspectRatio: "16/9", borderRadius: 10, border: "1px solid rgba(243,238,228,.1)", backgroundImage: a3.vignetteUrl ? ("url(" + a3.vignetteUrl + ")") : "none", backgroundSize: "cover", backgroundPosition: "center" } }),
                h("span", { style: { flex: 1, minWidth: 0 } },
                  h("span", { style: { display: "block", fontSize: 13, fontWeight: 500, color: "#F3EEE4", lineHeight: 1.35 } }, L(a3.i18nTitre, "fr")),
                  h("span", { style: { display: "block", fontSize: 10, color: "#C9A66B", marginTop: 4, letterSpacing: ".08em", textTransform: "uppercase" } }, a3.source + " · " + a3.titreSource),
                  h("span", { style: { display: "block", fontSize: 11.5, color: "rgba(243,238,228,.64)", marginTop: 6, lineHeight: 1.5 } }, L(a3.i18nResume, "fr")))),
              h("span", { style: { display: "flex", gap: 8, marginTop: 10 } },
                a3.src ? h("a", { href: a3.src.ref + ".mp4", download: "", style: chBtn }, "Télécharger") : null,
                h("button", { style: Object.assign({}, chBtn, { color: "rgba(243,238,228,.6)", borderColor: "rgba(243,238,228,.2)" }), onClick: function () { ecarter(a3.id, true); setEtat(lireLocal()); } }, "Écarter")));
          }))));
    }

    /* ---------- ACCUEIL ---------- */
    var corps;
    if (rechOuverte && rq.trim()) {
      var res = dispo.filter(correspondRech);
      corps = h("div", { style: { marginTop: 18 } },
        h("p", { className: "hv2-sous", style: { margin: "0 0 12px" } }, nbVideos(res.length) + " · « " + rq.trim() + " »"),
        res.length ? h("div", { className: "hv3-cartes" }, res.map(ligne))
          : h("div", { className: "hv2-vide" },
              h("p", null, T("Aucune vidéo ne correspond encore.", "No video matches yet.", "Ningún vídeo coincide todavía.", "Nessun video corrisponde ancora.", "該当する動画はまだありません。", "Noch kein Video passt.", "لا يوجد فيديو مطابق حتى الآن.", "暂时没有符合的视频。", "Er is nog geen video die past.", "Nenhum vídeo corresponde ainda.", "Ingen video matchar ännu.", "Пока нет подходящих видео.", "Żaden film jeszcze nie pasuje.", "조건에 맞는 영상이 아직 없어요.")),
              h("p", null, T("Essaie un autre mot.", "Try another word.", "Prueba otra palabra.", "Prova un'altra parola.", "別の言葉で試してみて。", "Versuche ein anderes Wort.", "جربي كلمة أخرى.", "换个词试试。", "Probeer een ander woord.", "Tente outra palavra.", "Prova ett annat ord.", "Попробуй другое слово.", "Spróbuj innego słowa.", "다른 단어로 검색해 보세요."))));
    } else {
      var onglets = CHOIX_GALOP_MAQUETTE ? choixGalop() : ongletsGalops(null);
      /* thèmes : compteurs pour le Galop choisi, thèmes vides masqués */
      var themesVis = THEMES_ORDRE.map(function (k) {
        return { k: k, n: dispo.filter(function (v) { return v.theme === k && galopOk(v, galop); }).length };
      }).filter(function (x) { return x.n > 0 || (x.k === "sante" && galop === "tous"); });
      themesVis.unshift({ k: "tous", n: dispo.filter(function (v) { return galopOk(v, galop); }).length });
      var nT = themesVis.length;
      var grille = h("div", { className: "hv2-grille" }, themesVis.map(function (x, i) {
        var ph = x.k === "tous" ? { img: PHOTO_HERO.img, pos: PHOTO_HERO.posTel, alt: PHOTO_HERO.alt } : (PHOTOS_THEMES[x.k] || {});
        /* 04/11 18h10 : « Toutes les vidéos » prend toute la largeur en haut ; les thèmes se rangent par deux en dessous
           (sinon le dernier thème se retrouvait seul, en bandeau) */
        var nTh = nT - 1, j = i - 1, dernier = i === nT - 1;
        var cls = "hv2-theme" + (x.k === "tous" ? " large" : "") + (x.k !== "tous" && dernier && nTh % 2 === 1 ? " seul2" : "") + (x.k !== "tous" && dernier && nTh % 3 === 1 ? " seul3" : "");
        return h("button", { key: x.k, className: cls, disabled: !x.n, onClick: function () { if (x.n) { setTheme(x.k); setVue("theme"); } } },
          h("span", { className: "hv2-traite", style: { display: "block", "--hv-pos": ph.pos || "center" } },
            ph.img ? h("img", { src: ph.img, alt: L(ph.alt, langue), loading: "lazy" }) : null),
          h("span", { className: "hv2-pan" }, h("b", null, x.k === "tous" ? T("Toutes les vidéos", "All videos", "Todos los vídeos", "Tutti i video", "すべての動画", "Alle Videos", "كل الفيديوهات", "全部视频", "Alle video's", "Todos os vídeos", "Alla videor", "Все видео", "Wszystkie filmy", "모든 영상") : nomTheme(x.k)), h("span", null, x.n ? nbVideos(x.n) : T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst", "قريبا", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개"))));
      }));
      /* 04/11 15h : « Reprendre » — les vidéos commencées et pas finies (3 au plus), en cartes */
      var enCours = dispo.filter(function (v) { var p = prog(v.id); return p && !p.vue && hvReprise(p); })
        .sort(function (a, b) { var pa = prog(a.id), pb = prog(b.id); return String(pb.quand || pb.ouverte || "") > String(pa.quand || pa.ouverte || "") ? 1 : -1; }).slice(0, 3);
      corps = h("div", null, onglets,
        enCours.length ? h("div", null, h("h2", { className: "hv3-h2" }, VX("reprendre")), h("div", { className: "hv3-cartes" }, enCours.map(ligne))) : null,
        h("h2", { className: "hv2-h2" }, T("Explore les thèmes", "Explore the topics", "Explora los temas", "Esplora i temi", "テーマから探す", "Entdecke die Themen", "استكشفي المواضيع", "探索主题", "Ontdek de thema's", "Explore os temas", "Utforska teman", "Изучай темы", "Odkrywaj tematy", "주제별로 둘러보기")),
        grille);
    }

    return h("div", { className: classeRacine(), style: styleTraitement() },
      hero,
      h("div", { className: "hv2-in" },
        ligneAcces, champRech, corps,
        /* accès discret à la réserve : invisible pour tout autre compte */
        estModo && VIDEOS_CAVALIERS ? h("button", { className: "hv2-modo", style: vcAttente.length ? { color: "#C9A66B" } : undefined, onClick: function () { setVue("propos"); } }, "Propositions des cavaliers" + (vcAttente.length ? " (" + vcAttente.length + ")" : "") + " · modératrice") : null,
        estModo ? h("button", { className: "hv2-modo", style: { marginTop: 0 }, onClick: function () { setVue("reserve"); } }, "Réserve d'animations · modératrice") : null));
  };

  /* ============================================================
     ÉCRAN : PAGE DE LECTURE
     ============================================================ */
  window.EcranVideoLecture = function EcranVideoLecture() {
    /* 04/11/2026 (Blandine, maquette « Déplacer les hanches » + « avec la courbe en haut comme on avait dit ») :
       page vidéo refaite dans le design de la Vidéothèque. Ordre : retour + drapeau · lecteur (vignette +
       bouton lecture, la vidéo se charge au toucher) · courbe champagne · Galop · état · titre · résumé ·
       langue de la vidéo · Marquer comme vue / Favori · À observer · Ton cours · L'intervenant · À regarder
       ensuite. Rien du contenu d'avant n'est perdu. */
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, tr = app.tr, langue = app.langue;
    function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
    function titreDe(v) { return L(v.i18nTitre, langue); }
    function resumeDe(v) { return L(v.i18nResume, langue); }
    function observerDe(v) { return v.i18nObserver ? (L(v.i18nObserver, langue) || []) : []; }
    function chapitreDe(v) { return L(CHAPITRES[v.coursId], langue) || v.coursId; }
    injecterCss(); injecterCss2();

    var id0 = null;
    try { id0 = window.__hypeVideoOuverte || null; } catch (e) { }
    var sc = React.useState(id0); var cur = sc[0], setCur = sc[1];
    var v = vidDe(cur);
    var st = React.useState(lireLocal()); var etat = st[0], setEtat = st[1];
    var sj = React.useState(false); var joue = sj[0], setJoue = sj[1];
    React.useEffect(function () {
      setJoue(false);
      try { window.scrollTo(0, 0); } catch (e) { }
      try { if (document.scrollingElement) document.scrollingElement.scrollTop = 0; } catch (e2) { }
    }, [cur]);

    var drapeau = (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null;
    var depuisVT = false;
    try { depuisVT = !!window.__hvRetour; } catch (eD) { }
    function revenir() { if (app.retourEcran && app.histLen > 0) { app.retourEcran(); } else { setEcran("videos"); } }
    var retour = h("button", { className: "hv2-retour", onClick: revenir },
      h("i", { "aria-hidden": "true" }, "‹"),
      depuisVT || !(app.histLen > 0)
        ? T("Retour aux vidéos", "Back to videos", "Volver a los vídeos", "Torna ai video", "動画一覧に戻る", "Zurück zu den Videos", "العودة إلى الفيديوهات", "返回视频", "Terug naar de video's", "Voltar aos vídeos", "Tillbaka till videorna", "Назад к видео", "Wróć do filmów", "영상으로 돌아가기")
        : T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wstecz", "뒤로"));

    if (!v) {
      return h("div", { className: classeHv2() }, drapeau,
        h("div", { className: "hv2-in hv2-l-in" }, retour,
          h("div", { className: "hv2-vide" }, h("p", null, T("Cette vidéo n'est plus disponible.", "This video is no longer available.", "Este vídeo ya no está disponible.", "Questo video non è più disponibile.", "この動画は見つかりません。", "Dieses Video ist nicht mehr verfügbar.", "هذا الفيديو لم يعد متاحا.", "该视频已不可用。", "Deze video is niet meer beschikbaar.", "Este vídeo não está mais disponível.", "Den här videon finns inte längre.", "Это видео больше недоступно.", "Ten film nie jest już dostępny.", "이 영상은 더 이상 볼 수 없어요.")))));
    }

    var p = (etat.prog && etat.prog[v.id]) || null;
    var fav = !!(etat.fav && etat.fav[v.id]);
    var vue = !!(p && p.vue);
    var reprise = hvReprise(p);
    /* ---- suivi de la position pendant la lecture ---- */
    var refLect = React.useRef({ pos: 0, duree: 0, timer: null, player: null, dernierDistant: 0 });
    function noter(pos, duree, fin) {
      var s = refLect.current; if (typeof pos === "number") s.pos = pos; if (duree) s.duree = duree;
      var maintenant = Date.now();
      var distant = fin || (maintenant - s.dernierDistant > 30000);
      if (distant) s.dernierDistant = maintenant;
      var dejaVue = !!(lireLocal().prog || {})[v.id] && !!lireLocal().prog[v.id].vue;
      if (fin && MARQUER_VUE_FIN) { enregistrerEtat(v.id, false, true, s.duree, 0, true); setEtat(lireLocal()); return; }
      enregistrerEtat(v.id, false, dejaVue, s.duree, s.pos, distant);
    }
    function arreterSuivi(final) {
      var s = refLect.current;
      if (s.timer) { clearInterval(s.timer); s.timer = null; }
      if (final && s.player) { try { var pf = s.player.getCurrentTime ? s.player.getCurrentTime() : s.pos; if (pf > 0) { s.dernierDistant = 0; noter(pf, s.duree, false); } } catch (e) { } }
    }
    function brancherYT(el) {
      if (!el || el.__hvBranche) return; el.__hvBranche = true;
      hvChargerYT(function (YT) {
        try {
          var pl = new YT.Player(el, { events: {
            onStateChange: function (ev) {
              var s = refLect.current;
              try { s.duree = pl.getDuration() || s.duree; } catch (e0) { }
              if (ev.data === 1) {   /* lecture */
                if (!s.timer) s.timer = setInterval(function () { try { noter(pl.getCurrentTime(), pl.getDuration(), false); } catch (e1) { } }, 5000);
              } else if (ev.data === 2) {   /* pause */
                if (s.timer) { clearInterval(s.timer); s.timer = null; }
                try { s.dernierDistant = 0; noter(pl.getCurrentTime(), pl.getDuration(), false); } catch (e2) { }
              } else if (ev.data === 0) {   /* fin */
                if (s.timer) { clearInterval(s.timer); s.timer = null; }
                noter(0, s.duree, true);
              }
            } } });
          refLect.current.player = pl;
        } catch (e) { }
      });
    }
    React.useEffect(function () {
      function cache() { if (document.visibilityState === "hidden") { var s = refLect.current; try { if (s.player && s.player.getCurrentTime) { s.dernierDistant = 0; noter(s.player.getCurrentTime(), s.duree, false); } } catch (e) { } } }
      document.addEventListener("visibilitychange", cache);
      return function () { document.removeEventListener("visibilitychange", cache); arreterSuivi(true); refLect.current.player = null; };
    }, [cur]);
    function basculerVue() { enregistrerEtat(v.id, false, !vue); setEtat(lireLocal()); }
    function basculerFav() { enregistrerFavori(v.id, !fav); setEtat(lireLocal()); }
    function versLeCours(cid) {
      var m = /^g(\d)/.exec(cid || "");
      var niveauChapitre = m ? parseInt(m[1], 10) : v.galop;
      if (app.setGalopOuvert) app.setGalopOuvert(niveauChapitre);
      if (app.setCoursOuvert) app.setCoursOuvert(cid);
      setEcran("cours");
    }
    /* tous les cours reliés, le cours d'où l'on vient en premier */
    var origine = null;
    try { origine = window.__hvCoursOrigine || null; } catch (eO) { }
    var coursLies = (v.coursTous || []).slice();
    if (origine && coursLies.indexOf(origine) > 0) { coursLies.splice(coursLies.indexOf(origine), 1); coursLies.unshift(origine); }
    function ouvrirAutre(x) {
      enregistrerEtat(x.id, true, !!(etat.prog && etat.prog[x.id] && etat.prog[x.id].vue), 0);
      try { window.__hypeVideoOuverte = x.id; } catch (e) { }
      setEtat(lireLocal()); setCur(x.id);
    }
    /* vignette : celle de la vidéo ; si elle ne charge pas, la photo du thème (jamais un cadre vide) */
    function image(x, cls) {
      var ph = (PHOTOS_THEMES[x.theme] || {}).img || PHOTO_HERO.img;
      return h("img", { className: cls, src: vignette(x) || ph, alt: "", loading: "lazy",
        onError: function (e) { try { if (e.target.src.indexOf(ph) < 0) e.target.src = ph; } catch (er) { } } });
    }
    var svgPlay = h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M9 6.5v11l9-5.5z" }));

    var etatTxt = vue ? T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen", "تمت المشاهدة", "已看", "Bekeken", "Vista", "Sedd", "Просмотрено", "Obejrzane", "시청함")
      : reprise ? T("Reprendre à ", "Resume at ", "Reanudar en ", "Riprendi da ", "続きから ", "Weiter ab ", "المتابعة من ", "从 ", "Hervatten vanaf ", "Retomar em ", "Fortsätt från ", "Продолжить с ", "Wznów od ", "이어보기 ") + hvTemps(reprise)
      : T("À regarder", "To watch", "Por ver", "Da guardare", "未視聴", "Noch anzusehen", "للمشاهدة", "待观看", "Nog te bekijken", "Para assistir", "Att se", "Посмотреть", "Do obejrzenia", "볼 영상");

    /* lecteur : la vidéo (YouTube, Vimeo ou fichier) ne se charge qu'au toucher ; avant, la vignette */
    var src = null;
    var origine = ""; try { origine = window.location.origin; } catch (eOr) { }
    if (v.src && v.src.type === "youtube") src = "https://www.youtube-nocookie.com/embed/" + v.src.ref + "?autoplay=1&rel=0&playsinline=1&enablejsapi=1"
      + (origine && origine.indexOf("http") === 0 ? "&origin=" + encodeURIComponent(origine) : "") + (reprise ? "&start=" + reprise : "");
    if (v.src && v.src.type === "vimeo") src = "https://player.vimeo.com/video/" + v.src.ref + "?autoplay=1";
    var lecteur = h("div", { className: "hv2-lecteur" },
      joue && v.src && v.src.type === "fichier"
        ? h("video", { controls: true, autoPlay: true, playsInline: true, preload: "metadata", poster: v.vignetteUrl || undefined,
            onLoadedMetadata: function (e) { try { if (reprise) e.target.currentTime = reprise; } catch (er) { } },
            onTimeUpdate: function (e) { var s = refLect.current, n = Date.now(); if (!s.tv || n - s.tv > 5000) { s.tv = n; noter(e.target.currentTime, e.target.duration, false); } },
            onPause: function (e) { refLect.current.dernierDistant = 0; noter(e.target.currentTime, e.target.duration, false); },
            onEnded: function (e) { noter(0, e.target.duration, true); } },
            h("source", { key: "w", src: v.src.ref + ".webm", type: "video/webm" }),
            h("source", { key: "m", src: v.src.ref + ".mp4", type: "video/mp4" }))
      : joue && src
        ? h("iframe", { key: "yt-" + v.id, ref: brancherYT, title: titreDe(v), src: src, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen", allowFullScreen: true })
      : h("button", { className: "hv2-lect-poster", disabled: !v.src, onClick: function () { if (v.src) setJoue(true); },
          "aria-label": T("Lire la vidéo", "Play the video", "Reproducir el vídeo", "Riproduci il video", "動画を再生", "Video abspielen", "تشغيل الفيديو", "播放视频", "Video afspelen", "Reproduzir o vídeo", "Spela upp videon", "Воспроизвести видео", "Odtwórz film", "영상 재생") + " · " + titreDe(v) },
          image(v, "hv2-lect-img"),
          v.src ? h("span", { className: "hv2-play" }, svgPlay)
            : h("span", { className: "hv2-lect-bientot" }, T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst", "قريبا", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개"))));

    var courbe = h("svg", { className: "hv2-l-courbe", viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hv2gl", x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: ".1" }), h("stop", { offset: ".55", stopColor: "#C9A66B", stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: "0" }))),
      h("path", { d: "M0 36 C 120 34, 240 20, 400 4", fill: "none", stroke: "url(#hv2gl)", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));

    var phT = PHOTOS_THEMES[v.theme] || {};
    var obs = observerDe(v);
    var suiv = VIDS.filter(disponible).filter(function (x) { return x.id !== v.id && (x.coursId === v.coursId || x.theme === v.theme); }).slice(0, 4);
    /* 04/11 09h55 (Blandine) : une carte seule sur sa ligne passe en carte horizontale pleine largeur */

    return h("div", { className: classeHv2(), style: TRAITEMENT_PHOTO.actif ? { "--hv-filtre": TRAITEMENT_PHOTO.filtre } : null }, drapeau,
      /* 04/11 09h57 (Blandine : « la page des vidéos elles-mêmes avec un haut similaire à toutes, par exemple le hero
         de leur thème ») : même en-tête que les pages de thème — photo du thème, courbe, titre de la vidéo dessous. */
      h("div", { className: "hv2-hero hv2-hero-r hv2-l-hero" },
        h("div", { className: "hv2-in hv2-hero-retour" }, retour),
        courbeHv2(h, "c1", "M250 4 C 330 8, 385 40, 400 96"),
        h("div", { className: "hv2-photo hv2-traite", style: Object.assign({ "--hv-pos-tel": phT.posHeroTel || phT.pos || "center", "--hv-pos-tab": phT.posHeroTab || phT.pos || "center", "--hv-pos-ordi": phT.posHeroOrdi || phT.pos || "center" }, TRAITEMENT_PHOTO.actif ? { "--hv-filtre": TRAITEMENT_PHOTO.filtre, "--hv-bords": TRAITEMENT_PHOTO.bords } : {}) },
          h("img", { src: phT.img || PHOTO_HERO.img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
        courbeHv2(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),
        h("div", { className: "hv2-in" }, h("div", { className: "hv2-titre" },
          h("h1", null, titreDe(v)),
          h("p", null, [TXT_GALOP_LECT(T) + v.galop, etatTxt].join(" · "))))),
      h("div", { className: "hv2-in hv2-l-in" },
        v.aVerifier ? h("p", { className: "hv2-l-averifier" }, "À vérifier — visible par toi seule tant que tu n'as pas confirmé que la vidéo se lit bien dans Hype.") : null,
        lecteur,
        resumeDe(v) ? h("p", { className: "hv2-l-resume" }, resumeDe(v)) : null,
        (v.src && v.src.type === "youtube") ? h("a", { className: "hv2-l-yt", href: "https://www.youtube.com/watch?v=" + v.src.ref, target: "_blank", rel: "noopener",
          onClick: function (e) { /* 04/11 (Blandine) : ouvrir dans l'appli YouTube, au point où on en est (écoute en arrière-plan pour les abonnés YouTube Premium) */
            var s = refLect.current, t = 0; try { t = Math.floor((s.player && s.player.getCurrentTime) ? s.player.getCurrentTime() : (s.pos || reprise || 0)); } catch (x) { t = Math.floor(s.pos || 0); }
            try { if (s.player && s.player.pauseVideo) s.player.pauseVideo(); } catch (x) { }
            if (t > 5) { noter(t, s.duree, false); e.currentTarget.href = "https://www.youtube.com/watch?v=" + v.src.ref + "&t=" + t + "s"; } } },
          T("Ouvrir dans YouTube", "Open in YouTube", "Abrir en YouTube", "Apri su YouTube", "YouTubeで開く", "In YouTube öffnen", "افتح في YouTube", "在 YouTube 中打开", "Openen in YouTube", "Abrir no YouTube", "Öppna i YouTube", "Открыть в YouTube", "Otwórz w YouTube", "YouTube에서 열기"), h("span", { "aria-hidden": "true" }, " ↗")) : null,
        v.vcId ? h("p", { className: "hv2-l-langue" }, v.parCavalier ? L(VC_TXT.par, langue) + v.parCavalier : L(VC_TXT.parAnon, langue)) : null,
        v.langueVideo === "fr" ? h("p", { className: "hv2-l-langue" }, T("Vidéo en français", "Video in French", "Vídeo en francés", "Video in francese", "フランス語の動画", "Video auf Französisch", "فيديو باللغة الفرنسية", "法语视频", "Video in het Frans", "Vídeo em francês", "Video på franska", "Видео на французском", "Film po francusku", "프랑스어 영상")) : null,
        h("div", { className: "hv2-l-actions" },
          h("button", { className: "hv2-l-btn" + (vue ? " on" : ""), "aria-pressed": vue, onClick: basculerVue },
            h("span", { "aria-hidden": "true" }, "✓"),
            vue ? T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen", "تمت المشاهدة", "已看", "Bekeken", "Vista", "Sedd", "Просмотрено", "Obejrzane", "시청함")
                : T("Marquer comme vue", "Mark as watched", "Marcar como vista", "Segna come vista", "視聴済みにする", "Als gesehen markieren", "تحديد كفيديو تمت مشاهدته", "标记为已看", "Markeren als bekeken", "Marcar como vista", "Markera som sedd", "Отметить как просмотренное", "Oznacz jako obejrzane", "시청함으로 표시")),
          h("button", { className: "hv2-l-btn hv2-l-fav" + (fav ? " on" : ""), "aria-pressed": fav, onClick: basculerFav },
            h("span", { "aria-hidden": "true" }, fav ? "★" : "☆"),
            T("Favori", "Favourite", "Favorito", "Preferito", "お気に入り", "Favorit", "مفضل", "收藏", "Favoriet", "Favorito", "Favorit", "Избранное", "Ulubiony", "즐겨찾기"))),

        obs.length ? h("div", { className: "hv2-l-carte" },
          h("p", { className: "hv2-l-k" }, T("À observer", "What to watch for", "Qué observar", "Da osservare", "注目ポイント", "Worauf du achtest", "ما يجب ملاحظته", "观察要点", "Om op te letten", "O que observar", "Att lägga märke till", "На что смотреть", "Na co zwrócić uwagę", "관찰 포인트")),
          h("ul", { className: "hv2-l-obs" }, obs.map(function (x, i) { return h("li", { key: i }, x); }))) : null,

        coursLies.length ? h("div", { className: "hv2-l-carte hv2-l-cours" },
          h("p", { className: "hv2-l-k" }, coursLies.length > 1
            ? T("Tes cours", "Your lessons", "Tus lecciones", "Le tue lezioni", "あなたのレッスン", "Deine Lektionen", "دروسك", "你的课程", "Jouw lessen", "Suas aulas", "Dina lektioner", "Твои уроки", "Twoje lekcje", "나의 수업")
            : T("Ton cours", "Your lesson", "Tu lección", "La tua lezione", "あなたのレッスン", "Deine Lektion", "درسك", "你的课程", "Jouw les", "Sua aula", "Din lektion", "Твой урок", "Twoja lekcja", "나의 수업")),
          coursLies.map(function (cid) { return h("button", { key: cid, className: "hv2-l-cours-l", onClick: function () { versLeCours(cid); } },
          h("b", null, L(CHAPITRES[cid], langue) || cid),
          h("span", { className: "hv2-l-lien" }, T("Voir le cours", "See the lesson", "Ver la lección", "Vedi la lezione", "レッスンを見る", "Zur Lektion", "عرض الدرس", "查看课程", "Bekijk de les", "Ver a aula", "Se lektionen", "Открыть урок", "Zobacz lekcję", "수업 보기"), h("i", { "aria-hidden": "true" }, " →"))); })) : null,

        v.intervenant ? h("div", { className: "hv2-l-carte" },
          h("p", { className: "hv2-l-k" }, T("L'intervenant", "The speaker", "El ponente", "Il relatore", "登壇者", "Der Referent", "المتحدث", "讲者", "De spreker", "O palestrante", "Medverkande", "Выступающий", "Prelegent", "강연자")),
          h("b", null, v.intervenant),
          v.intervenantRole ? h("p", { className: "hv2-l-petit" }, L(v.intervenantRole, langue)) : null,
          v.titreSource ? h("p", { className: "hv2-l-petit", style: { fontStyle: "italic" } }, "« " + v.titreSource + " »") : null,
          v.doc ? h("a", { className: "hv2-l-lien", href: v.doc, target: "_blank", rel: "noopener" }, T("Le document de l'intervention", "The talk's handout", "El documento de la intervención", "Il documento dell'intervento", "講演資料", "Das Dokument zum Vortrag", "وثيقة المداخلة", "讲座资料", "Het document van de lezing", "O documento da palestra", "Dokumentet från föredraget", "Материалы выступления", "Materiały z wystąpienia", "강연 자료"), h("i", { "aria-hidden": "true" }, " ↗")) : null) : null,

        suiv.length ? h("div", null,
          h("h2", { className: "hv2-h2", style: { marginTop: 30 } }, T("À regarder ensuite", "Watch next", "Ver a continuación", "Da guardare dopo", "次に見る", "Als Nächstes", "للمشاهدة لاحقا", "接下来观看", "Hierna kijken", "Para assistir em seguida", "Titta härnäst", "Смотреть дальше", "Do obejrzenia dalej", "다음에 볼 영상")),
          h("div", { className: "hv2-l-suiv" }, suiv.map(function (x) {
            var seule = suiv.length % 2 === 1 && x === suiv[suiv.length - 1];
            return h("button", { key: x.id, className: "hv2-l-sc" + (seule ? " seule" : ""), onClick: function () { ouvrirAutre(x); } },
              h("span", { className: "hv2-l-sc-img" }, image(x), h("span", { className: "hv2-play petit" }, svgPlay)),
              h("span", { className: "hv2-l-sc-t" }, titreDe(x)));
          }))) : null));
  };
  function courbeHv2(h, cls, d) {
    return h("svg", { className: "hv2-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hv2gl-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
        h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
        h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#hv2gl-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  function TXT_GALOP_LECT(T) { return T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ", "الغالوب ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop ", "Galop "); }


  /* expose le catalogue pour d'éventuels usages ailleurs (cours, Hey Baby) */
  window.HYPE_VIDEO = { videos: VIDS, collections: COLLS, themes: THEMES, photosThemes: PHOTOS_THEMES /* 04/11 : photo de chaque thème, pour la future page du thème */, parCours: function (coursId) {
      /* un chapitre secondaire peut partager une vidéo : on lit toute la
         liste cours[], pas seulement le premier (v-contact-03 sert aussi
         à g4-biomeca). L'ordre porte l'information : la 1re est la principale. */
      return VIDS.filter(function (v) { return (v.coursTous || []).indexOf(coursId) >= 0; });
    } };
})();
