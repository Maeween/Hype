/* hype-lingo-lex-western.js — Hype Linguae · le western et le troupeau
   ==================================================================
   Écrit le 6 août 2026 pour Tamworth (Nouvelle-Galles du Sud, Australie).
   Prévu par hype-linguae-production-suite.txt : « Tamworth — le western :
   le licol éthologique, la selle western, le troupeau, le tri, la corde,
   le rassemblement ». Dernière des vingt-neuf étapes prévues.

   ⚠️ LE WESTERN N'EXISTAIT NULLE PART dans les 378 mots d'origine. Ni la
   selle à corne, ni le troupeau, ni le tri, ni la monte à une main. Tout
   le module était écrit pour l'équitation classique européenne : c'est le
   plus gros angle mort qu'il restait.

   ⚠️ ET L'ANGLAIS D'ICI N'EST PAS CELUI DES AUTRES VILLES. C'est ce qui
   rend le chapitre intéressant : l'Australie a ses propres mots pour des
   choses que Newmarket ou Badminton nomment autrement.
     · le troupeau        → « the mob », et pas « the herd »
     · le rassemblement   → « the muster », un mot qu'un Anglais ne dirait pas
     · le parc à bétail   → « the yards », toujours au pluriel
     · le chapeau         → « an Akubra », du nom de la marque
   Un cavalier qui ne connaît que l'anglais des écuries britanniques ne
   comprendra pas une phrase de Tamworth. C'est le sujet.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif — et il faudrait
   ici un natif AUSTRALIEN, pas britannique. Les plus à confirmer :
   `the mob` (usage courant mais qui peut sonner familier à l'écrit),
   `the muster` (verbe et nom), et `neck reining` pour la monte à une main,
   que le français rend mal. À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.western = {
  ref: "western",
  chapitre: 19,
  titre: { fr:"Le western", en:"Western riding", es:"La monta western",
           it:"L'equitazione western", de:"Westernreiten", ja:"ウエスタン" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE WESTERN ET LE TROUPEAU ============ */

  { ref:"selle-western", lecon:1, coll:"western",
    mots:{ fr:{m:"la selle western"}, en:{m:"the western saddle", p:"sa-deul"},
           es:{m:"la silla vaquera"}, it:{m:"la sella western"},
           de:{m:"der Westernsattel", p:"vèss-teurn-za-teul"},
           ja:{m:"ウエスタン鞍", p:"uesutan kura"} },
    def:{ fr:"Lourde, large, avec une corne devant. Elle n'est pas faite pour sauter mais pour tenir dix heures sans se blesser, et pour amarrer une corde tendue par un bœuf.",
          en:"Heavy, wide, with a horn in front. It is not built for jumping but for ten hours without soreness, and for taking the strain of a rope with a beast on the end.",
          es:"Pesada, ancha, con una perilla delante. No está hecha para saltar sino para aguantar diez horas sin herir, y para amarrar una cuerda tensada por una res.",
          it:"Pesante, larga, con un pomo davanti. Non è fatta per saltare ma per reggere dieci ore senza ferire, e per dare volta a una corda tesa da un bovino.",
          de:"Schwer, breit, mit einem Horn vorn. Nicht zum Springen gebaut, sondern für zehn Stunden ohne Druckstellen — und um ein Seil zu belegen, an dem ein Rind zieht.",
          ja:"重く、幅広で、前にホーンがついた鞍。跳ぶためではなく、十時間乗っても傷めないため、そして牛が引くロープを留めるための鞍です。" } },

  { ref:"corne", lecon:1, coll:"western",
    mots:{ fr:{m:"la corne"}, en:{m:"the horn", p:"horne"},
           es:{m:"la perilla"}, it:{m:"il pomo"},
           de:{m:"das Sattelhorn", p:"za-teul-horne"},
           ja:{m:"ホーン", p:"hōn"} },
    def:{ fr:"Le pommeau vertical. ⚠️ Ce n'est PAS une poignée : on n'y met pas la main pour se rattraper. Elle sert à enrouler la corde. S'y accrocher est le premier réflexe du débutant, et le premier qu'on lui retire.",
          en:"The upright pommel. It is NOT a handle: you do not grab it to stay on. It is there to dally the rope. Holding it is a beginner's first instinct and the first thing taken away.",
          es:"El pomo vertical. ⚠️ NO es un asidero: no se agarra para no caerse. Sirve para dar vueltas a la cuerda. Agarrarse a ella es el primer reflejo del principiante, y el primero que se le quita.",
          it:"Il pomo verticale. ⚠️ NON è una maniglia: non ci si aggrappa per restare in sella. Serve a dare volta alla corda. Aggrapparsi è il primo riflesso del principiante, e il primo che gli si toglie.",
          de:"Der senkrechte Knauf. ⚠️ KEIN Haltegriff: Man greift nicht danach, um sich zu retten. Es dient dem Belegen des Seils. Sich daran festzuhalten ist der erste Reflex des Anfängers — und der erste, den man ihm nimmt.",
          ja:"垂直に立った前橋の角。⚠️ 取っ手ではありません。落ちそうなときにつかむものではないのです。ロープを巻き留めるためのもの。ここに掴まるのは初心者の最初の反射で、最初に直される癖でもあります。" } },

  { ref:"licol-corde", lecon:1, coll:"western",
    mots:{ fr:{m:"le licol éthologique", var:"le licol de corde"},
           en:{m:"the rope halter", p:"rôpe hol-teur"},
           es:{m:"la cabezada de cuerda"}, it:{m:"la capezza di corda"},
           de:{m:"das Knotenhalfter", p:"knô-teune-half-teur"},
           ja:{m:"ロープハルター", p:"rōpu harutā"} },
    def:{ fr:"Un licol sans boucle, fait d'une seule corde nouée. ⚠️ L'anglais dit simplement « rope halter » — le mot « éthologique » n'a pas d'équivalent et sonnerait prétentieux. Il agit par pression sur des points précis, donc il ne se laisse jamais sur un cheval au pré.",
          en:"A halter with no buckles, made of one knotted rope. English just says rope halter. It works by pressure on set points, so it is never left on a horse turned out.",
          es:"Una cabezada sin hebillas, hecha de una sola cuerda anudada. ⚠️ El inglés dice simplemente « rope halter » — la palabra « etológico » no tiene equivalente y sonaría pretenciosa. Actúa por presión sobre puntos precisos: jamás se deja puesta a un caballo en el prado.",
          it:"Una capezza senza fibbie, fatta di una sola corda annodata. ⚠️ L'inglese dice semplicemente « rope halter » — la parola « etologico » non ha equivalente e suonerebbe pretenziosa. Agisce per pressione su punti precisi: non si lascia mai a un cavallo al prato.",
          de:"Ein Halfter ohne Schnallen, aus einem einzigen geknoteten Seil. ⚠️ Das Englische sagt schlicht « rope halter » — das Wort « ethologisch » hat kein Gegenstück und klänge prätentiös. Es wirkt über Druck auf genaue Punkte: Es bleibt nie an einem Pferd auf der Koppel.",
          ja:"バックルのない、一本のロープを結んで作った無口。⚠️ 英語では単に « rope halter » — 「エソロジック」という言葉に対応語はなく、気取って聞こえるでしょう。決まった点への圧で効くため、放牧中の馬に着けたままには決してしません。" } },

  { ref:"corde", lecon:1, coll:"western",
    mots:{ fr:{m:"la corde", var:"le lasso"}, en:{m:"the rope", p:"rôpe", var:"the lariat"},
           es:{m:"la cuerda", var:"el lazo"}, it:{m:"la corda"},
           de:{m:"das Seil", p:"zaïl", var:"das Lasso"},
           ja:{m:"ロープ", p:"rōpu"} },
    def:{ fr:"⚠️ On dit « the rope », presque jamais « the lasso » — le mot est celui des films. Le geste s'appelle « to rope » et non « to lasso ». Le lancer est la partie facile : le difficile est ce qui se passe une seconde après.",
          en:"« The rope », almost never « the lasso » — that word belongs to films. The act is to rope. Throwing is the easy part: the hard part is the second after.",
          es:"⚠️ Se dice « the rope », casi nunca « the lasso » — esa palabra es la de las películas. El gesto se llama « to rope » y no « to lasso ». Lanzar es la parte fácil: lo difícil es lo que pasa un segundo después.",
          it:"⚠️ Si dice « the rope », quasi mai « the lasso » — quella parola è dei film. Il gesto si chiama « to rope » e non « to lasso ». Lanciare è la parte facile: il difficile è ciò che accade un secondo dopo.",
          de:"⚠️ Man sagt « the rope », fast nie « the lasso » — das Wort gehört den Filmen. Die Handlung heißt « to rope », nicht « to lasso ». Werfen ist der leichte Teil: Schwer ist, was eine Sekunde später kommt.",
          ja:"⚠️ 言うのは « the rope »。« the lasso » はほぼ使いません — それは映画の言葉です。動作は « to rope » であって « to lasso » ではない。投げるのは簡単なほう。難しいのは、その一秒後に起こることです。" } },

  { ref:"troupeau", lecon:1, coll:"western",
    mots:{ fr:{m:"le troupeau"}, en:{m:"the mob", p:"mob", var:"the herd"},
           es:{m:"la manada"}, it:{m:"la mandria"},
           de:{m:"die Herde", p:"hèr-de"}, ja:{m:"群れ", p:"mure"} },
    def:{ fr:"⚠️ En Australie on dit « the mob », pas « the herd ». Un Anglais entendrait « une foule » ; ici c'est le mot normal, et il s'emploie aussi pour les chevaux : « a mob of horses ».",
          en:"In Australia it is « the mob », not « the herd ». An English speaker elsewhere hears « a crowd »; here it is the ordinary word, and it works for horses too.",
          es:"⚠️ En Australia se dice « the mob », no « the herd ». Un inglés de otra parte oiría « una multitud »; aquí es la palabra normal, y vale también para los caballos: « a mob of horses ».",
          it:"⚠️ In Australia si dice « the mob », non « the herd ». Un inglese d'altrove sentirebbe « una folla »; qui è la parola normale, e vale anche per i cavalli: « a mob of horses ».",
          de:"⚠️ In Australien heißt es « the mob », nicht « the herd ». Anderswo hört ein Engländer « eine Menschenmenge »; hier ist es das normale Wort — auch für Pferde: « a mob of horses ».",
          ja:"⚠️ オーストラリアでは « the herd » ではなく « the mob » と言います。よその英語話者には「群衆」と聞こえますが、ここではごく普通の言葉。馬にも使います — « a mob of horses »。" } },

  { ref:"rassemblement", lecon:1, coll:"western",
    mots:{ fr:{m:"le rassemblement"}, en:{m:"the muster", p:"meuss-teur"},
           es:{m:"el rodeo", var:"la junta"}, it:{m:"il raduno"},
           de:{m:"das Zusammentreiben", p:"tsou-za-meune-traï-beune"},
           ja:{m:"追い集め", p:"oiatsume"} },
    def:{ fr:"Aller chercher le bétail dispersé sur des milliers d'hectares et le ramener aux parcs. ⚠️ « The muster » est le mot australien, nom et verbe ; l'Amérique dirait « the roundup ». ⚠️ Ne pas confondre avec le rassemblement du dressage, qui n'a rien à voir.",
          en:"Going out for cattle spread over thousands of acres and bringing them to the yards. « Muster » is the Australian word, noun and verb; America says roundup.",
          es:"Ir a buscar el ganado disperso en miles de hectáreas y traerlo a los corrales. ⚠️ « The muster » es la palabra australiana, nombre y verbo; América diría « the roundup ». ⚠️ No confundir con la reunión de la doma, que no tiene nada que ver.",
          it:"Andare a prendere il bestiame sparso su migliaia di ettari e riportarlo ai recinti. ⚠️ « The muster » è la parola australiana, nome e verbo; l'America direbbe « the roundup ». ⚠️ Da non confondere con la riunione del dressage, che non c'entra nulla.",
          de:"Das über Tausende Hektar verstreute Vieh holen und zu den Gattern bringen. ⚠️ « The muster » ist das australische Wort, Substantiv und Verb; Amerika sagt « the roundup ». ⚠️ Nicht mit der Versammlung der Dressur verwechseln — sie hat nichts damit zu tun.",
          ja:"何千ヘクタールにも散らばった牛を集めに行き、囲いへ連れ帰ること。⚠️ « the muster » はオーストラリアの言葉で、名詞にも動詞にもなります。アメリカなら « the roundup »。⚠️ 馬場馬術の「収縮」と混同しないこと — 何の関係もありません。" } },

  { ref:"tri", lecon:1, coll:"western",
    mots:{ fr:{m:"le tri"}, en:{m:"cutting", p:"ka-ting", var:"drafting"},
           es:{m:"el aparte"}, it:{m:"la separazione"},
           de:{m:"das Aussortieren", p:"aouss-zor-ti-reune"},
           ja:{m:"仕分け", p:"shiwake"} },
    def:{ fr:"Séparer une bête du troupeau et l'empêcher d'y retourner. C'est devenu une discipline notée, où le cavalier lâche les rênes : c'est le cheval qui décide, et on le juge sur ce qu'il fait tout seul.",
          en:"Separating one beast from the mob and keeping it out. It has become a judged discipline where the rider drops the reins: the horse decides, and it is marked on what it does alone.",
          es:"Separar una res de la manada e impedirle volver. Se ha vuelto una disciplina puntuada, donde el jinete suelta las riendas: decide el caballo, y se le juzga por lo que hace solo.",
          it:"Separare un capo dalla mandria e impedirgli di tornarci. È diventata una disciplina giudicata, dove il cavaliere lascia le redini: decide il cavallo, e lo si giudica su ciò che fa da solo.",
          de:"Ein Tier aus der Herde lösen und es draußen halten. Daraus wurde eine bewertete Disziplin, in der der Reiter die Zügel hinlegt: Das Pferd entscheidet — beurteilt wird, was es allein tut.",
          ja:"一頭を群れから切り離し、戻らせないこと。今では採点競技になっていて、騎手は手綱を放します。判断するのは馬 — 審査されるのは、馬が独りでやってのけることなのです。" } },

  { ref:"stock-horse", lecon:1, coll:"western",
    mots:{ fr:{m:"le stock horse"}, en:{m:"the Australian Stock Horse"},
           es:{m:"el stock horse australiano"}, it:{m:"lo stock horse australiano"},
           de:{m:"das Australian Stock Horse"},
           ja:{m:"オーストラリアン・ストックホース", p:"ōsutorarian sutokku hōsu"} },
    def:{ fr:"La race du bétail australien : compacte, musclée, increvable sur de longues distances et capable de tourner sur place. ⚠️ Aucune langue ne le traduit — le nom reste anglais partout, comme le quarter horse.",
          en:"Australia's cattle breed: compact, muscular, tireless over distance and able to turn on the spot. No language translates the name.",
          es:"La raza del ganado australiano: compacta, musculosa, incansable en la distancia y capaz de girar en el sitio. ⚠️ Ninguna lengua lo traduce — el nombre queda en inglés en todas partes, como el quarter horse.",
          it:"La razza del bestiame australiano: compatta, muscolosa, instancabile sulla distanza e capace di girare sul posto. ⚠️ Nessuna lingua lo traduce — il nome resta inglese ovunque, come il quarter horse.",
          de:"Australiens Viehrasse: kompakt, bemuskelt, unermüdlich über Distanz und fähig, auf der Stelle zu wenden. ⚠️ Keine Sprache übersetzt den Namen — er bleibt überall englisch, wie beim Quarter Horse.",
          ja:"オーストラリアの牛追いの馬種。小柄で筋肉質、長距離に倦まず、その場で旋回できます。⚠️ どの言語もこの名前を訳しません — クォーターホースと同じく、世界じゅう英語のままです。" } },

  { ref:"une-main", lecon:1, coll:"western",
    mots:{ fr:{m:"monter à une main"}, en:{m:"neck reining", p:"nèk rè-ning"},
           es:{m:"montar a una mano"}, it:{m:"montare a una mano"},
           de:{m:"einhändig reiten", p:"aïne-hèn-dikh"},
           ja:{m:"片手手綱", p:"katate tazuna"} },
    def:{ fr:"Tenir les deux rênes d'une seule main, l'autre restant libre pour la corde. ⚠️ L'anglais nomme le MOYEN et non la main : « neck reining », parce que le cheval tourne en sentant la rêne extérieure sur son encolure, et non par une traction sur la bouche.",
          en:"Both reins in one hand, the other free for the rope. English names the means, not the hand: the horse turns off the outside rein laid on its neck, not off the mouth.",
          es:"Las dos riendas en una sola mano, la otra libre para la cuerda. ⚠️ El inglés nombra el MEDIO y no la mano: « neck reining », porque el caballo gira al sentir la rienda exterior sobre el cuello, no por tracción en la boca.",
          it:"Le due redini in una sola mano, l'altra libera per la corda. ⚠️ L'inglese nomina il MEZZO e non la mano: « neck reining », perché il cavallo gira sentendo la redine esterna sull'incollatura, non per trazione sulla bocca.",
          de:"Beide Zügel in einer Hand, die andere frei fürs Seil. ⚠️ Das Englische benennt das MITTEL, nicht die Hand: « neck reining » — das Pferd wendet auf den am Hals anliegenden äußeren Zügel, nicht auf Zug im Maul.",
          ja:"両方の手綱を片手に持ち、もう片方はロープのために空けておく乗り方。⚠️ 英語が名づけるのは手ではなく手段です — « neck reining »。馬は口を引かれてではなく、首に触れる外方の手綱を感じて曲がるのです。" } },

  { ref:"chaps", lecon:1, coll:"western",
    mots:{ fr:{m:"les chaps", var:"les jambières"}, en:{m:"the chaps", p:"chaps"},
           es:{m:"los zahones"}, it:{m:"i chaps"},
           de:{m:"die Chaps"}, ja:{m:"チャップス", p:"chappusu"} },
    def:{ fr:"Les jambières de cuir portées par-dessus le pantalon, contre les épines et le frottement. ⚠️ Toujours au pluriel dans toutes les langues, comme un pantalon.",
          en:"Leather leggings worn over the trousers, against thorns and rubbing. Always plural, like trousers.",
          es:"Las perneras de cuero llevadas sobre el pantalón, contra las espinas y el roce. ⚠️ Siempre en plural en todas las lenguas, como un pantalón.",
          it:"Le ghette di cuoio portate sopra i pantaloni, contro le spine e lo sfregamento. ⚠️ Sempre al plurale in tutte le lingue, come un pantalone.",
          de:"Die Lederbeinlinge über der Hose, gegen Dornen und Scheuern. ⚠️ In allen Sprachen immer Plural — wie eine Hose.",
          ja:"ズボンの上から着ける革の脚絆。棘と擦れから脚を守ります。⚠️ どの言語でも常に複数形 — ズボンと同じです。" } },

  { ref:"parcs", lecon:1, coll:"western",
    mots:{ fr:{m:"les parcs à bétail"}, en:{m:"the yards", p:"yards"},
           es:{m:"los corrales"}, it:{m:"i recinti"},
           de:{m:"die Viehgatter", p:"fi-ga-teur"},
           ja:{m:"家畜囲い", p:"kachiku kakoi"} },
    def:{ fr:"L'ensemble de clôtures et de couloirs où l'on trie et où l'on soigne. ⚠️ En Australie « the yards » est toujours AU PLURIEL, et attention : dans une écurie britannique « the yard » au singulier désigne la cour de l'écurie elle-même. Deux mots pour deux lieux.",
          en:"The set of fences and races where stock is sorted and treated. Always plural here — and careful: in a British stable « the yard » singular means the stable yard itself.",
          es:"El conjunto de cercas y mangas donde se aparta y se cura. ⚠️ En Australia « the yards » va siempre EN PLURAL, y ojo: en una cuadra británica « the yard » en singular es el patio de la cuadra misma. Dos palabras para dos lugares.",
          it:"L'insieme di recinti e corridoi dove si separa e si cura. ⚠️ In Australia « the yards » è sempre AL PLURALE, e attenzione: in una scuderia britannica « the yard » al singolare è il cortile della scuderia stessa. Due parole per due luoghi.",
          de:"Das System aus Zäunen und Treibgängen, wo sortiert und behandelt wird. ⚠️ In Australien steht « the yards » immer im PLURAL — und Achtung: Im britischen Stall meint « the yard » im Singular den Stallhof selbst. Zwei Wörter, zwei Orte.",
          ja:"仕分けや手当てをするための、柵と通路のひとそろい。⚠️ オーストラリアの « the yards » は必ず複数形。そして注意 — イギリスの厩舎で単数の « the yard » と言えば、厩舎の中庭そのものです。二つの言葉に、二つの場所。" } },

  { ref:"chapeau-large", lecon:1, coll:"western",
    mots:{ fr:{m:"le chapeau à large bord"}, en:{m:"the wide-brimmed hat", p:"braïmde", var:"an Akubra"},
           es:{m:"el sombrero de ala ancha"}, it:{m:"il cappello a falda larga"},
           de:{m:"der breitkrempige Hut", p:"braït-krèm-pi-gue"},
           ja:{m:"つば広帽", p:"tsubahiro bō"} },
    def:{ fr:"⚠️ En Australie on dit souvent « an Akubra », du nom de la marque, comme on dit un frigo. Ce n'est pas une protection de tête : dès qu'on travaille vite ou qu'on saute, le casque reprend sa place.",
          en:"In Australia it is often « an Akubra », after the brand. It is not head protection: the moment the work gets fast, the helmet goes back on.",
          es:"⚠️ En Australia se dice a menudo « an Akubra », por la marca, como se dice un clínex. No es una protección de cabeza: en cuanto el trabajo se acelera o se salta, el casco vuelve a su sitio.",
          it:"⚠️ In Australia si dice spesso « an Akubra », dal nome della marca, come si dice una biro. Non è una protezione per la testa: appena il lavoro accelera o si salta, il casco riprende il suo posto.",
          de:"⚠️ In Australien sagt man oft « an Akubra », nach der Marke — wie man Tempo sagt. Es ist kein Kopfschutz: Sobald die Arbeit schnell wird oder gesprungen wird, kommt der Helm zurück.",
          ja:"⚠️ オーストラリアではよく、ブランド名で « an Akubra » と言います — 商品名が普通名詞になった口です。頭を守る装備ではありません。仕事が速くなるか障害を跳ぶなら、ヘルメットが定位置に戻ります。" } }

  ],

  phrases: [

  { ref:"ph-western-muster", lecon:1,
      fr:"On rassemble le troupeau demain matin ?",
      en:"Are we mustering the mob tomorrow morning ?",
      es:"¿ Juntamos la manada mañana por la mañana ?",
      it:"Raduniamo la mandria domani mattina ?",
      de:"Treiben wir die Herde morgen früh zusammen ?",
      ja:"明日 の 朝 群れ を 追い 集め ます か ?" },

  { ref:"ph-western-unemain", lecon:1,
      fr:"Il se monte à une main ?",
      en:"Does he neck rein ?",
      es:"¿ Se monta a una mano ?",
      it:"Si monta a una mano ?",
      de:"Lässt er sich einhändig reiten ?",
      ja:"片手 手綱 で 乗れ ます か ?" },

  { ref:"ph-western-corne", lecon:1,
      fr:"Ne tiens pas la corne.",
      en:"Do not hold the horn.",
      es:"No agarres la perilla.",
      it:"Non tenere il pomo.",
      de:"Halt dich nicht am Horn fest.",
      ja:"ホーン を 握ら ない で。" },

  { ref:"ph-western-parcs", lecon:1,
      fr:"On les trie aux parcs avant midi.",
      en:"We draft them in the yards before midday.",
      es:"Los apartamos en los corrales antes del mediodía.",
      it:"Li separiamo nei recinti prima di mezzogiorno.",
      de:"Wir sortieren sie vor Mittag in den Gattern.",
      ja:"正午 まで に 囲い で 仕分け し ます。" }

  ]
};
