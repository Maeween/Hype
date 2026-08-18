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

  /* ================================================================
     CINQ ENTRÉES AJOUTÉES le 17/08/2026, d'après le lexique fourni par
     Blandine. Le fichier avait déjà l'essentiel de l'AUSTRALIEN — mob,
     muster, yards, Stock Horse, neck reining — mais il lui manquait le
     mot-titre, le bétail lui-même, et le geste de la corde.

     🟥 LA NOTION PHARE DU CHAPITRE : **L'ANGLAIS AUSTRALIEN.**
       anglais général → the herd  ·  🇦🇺 Tamworth → **the mob**
       américain      → the roundup ·  🇦🇺 Tamworth → **the muster**
     Ce ne sont pas des variantes régionales pittoresques : ce sont les
     seuls mots employés là-bas. Dire « herd » en Nouvelle-Galles du Sud
     s'entend comme un accent étranger.

     ⚠️ ET CUTTING N'EST PAS DRAFTING :
     · **cutting** = isoler une bête du troupeau et l'empêcher d'y
       revenir. C'est du travail monté, et c'est une discipline.
     · **drafting** = trier les animaux, généralement dans les yards,
       souvent à pied. C'est de l'organisation.
     NE PAS les employer l'un pour l'autre.

     🟥 ET L'AKUBRA CÈDE LA PLACE AU CASQUE pour le travail rapide —
     phrase de Blandine, et c'est ce qui rend le chapitre honnête : le
     chapeau est l'identité, le casque est la sécurité, et les deux
     coexistent dans la même journée.
     ================================================================ */

  { ref:"le-western", lecon:1, coll:"western",
    mots:{ fr:{m:"le western"}, en:{m:"western riding", p:"wès-teurn"},
           es:{m:"la monta western"}, it:{m:"la monta western"},
           de:{m:"das Westernreiten", p:"wès-teurn-raï-teune"}, ja:{m:"ウエスタン馬術", p:"uesutan bajutsu"} },
    def:{ fr:"⚠️ LE MOT VIENT DE L'OUEST AMÉRICAIN, mais la chose vient d'Espagne : la selle, la corne, le travail à une main descendent tous de la *vaquera* andalouse, arrivée par le Mexique. 🟥 En Australie, on ne dit pas vraiment « western » : on dit qu'on travaille le bétail, et on monte en Stock Saddle. Le mot est américain, le geste est universel.",
          en:"The word comes from the American West, but the thing comes from Spain: the saddle, the horn, riding one-handed all descend from the Andalusian vaquera by way of Mexico. In Australia people don't really say « western » — they say they work cattle, and they ride in a stock saddle.",
          es:"La palabra viene del Oeste americano, pero la cosa viene de España: la silla, la cabeza de silla y la monta a una mano descienden de la vaquera andaluza.",
          it:"La parola viene dall'Ovest americano, ma la cosa viene dalla Spagna: la sella, il pomo e la monta a una mano discendono dalla vaquera andalusa.",
          de:"Das Wort kommt aus dem amerikanischen Westen, die Sache aus Spanien: Sattel, Horn und einhändiges Reiten stammen von der andalusischen Vaquera.",
          ja:"語はアメリカ西部から来ていますが、実体はスペイン由来です。鞍も、鞍頭も、片手手綱も、メキシコを経てアンダルシアのバケーラから伝わりました。オーストラリアでは western とはあまり言わず、「牛を扱う」と言い、ストックサドルに乗ります。" } },

  { ref:"betail", lecon:1, coll:"betail",
    mots:{ fr:{m:"le bétail"}, en:{m:"cattle", p:"ka-teul", var:"stock"},
           es:{m:"el ganado"}, it:{m:"il bestiame"},
           de:{m:"das Vieh", p:"fii"}, ja:{m:"牛", p:"ushi"} },
    def:{ fr:"🟥 **CATTLE** EST TOUJOURS PLURIEL EN ANGLAIS — *the cattle are*, jamais « the cattle is » — et il n'a pas de singulier : une bête se dit *a head of cattle*, ou simplement *a cow*, *a steer*, *a bull*. ⚠️ En Australie on dit aussi **stock**, qui a donné *stockman*, *stock horse*, *stock saddle* : tout le vocabulaire du métier vient de ce mot.",
          en:"« Cattle » is always plural and has no singular: one animal is a head of cattle, or just a cow, a steer, a bull. In Australia « stock » is used too, and it gave stockman, stock horse, stock saddle — the whole trade's vocabulary comes from it.",
          es:"« Cattle » es siempre plural en inglés y no tiene singular. En Australia se dice también « stock », que dio stockman y stock horse.",
          it:"« Cattle » è sempre plurale in inglese e non ha singolare. In Australia si usa anche « stock », che ha dato stockman e stock horse.",
          de:"« Cattle » ist im Englischen immer Plural und hat keinen Singular. In Australien sagt man auch « stock » — daher stockman, stock horse, stock saddle.",
          ja:"英語の cattle は常に複数扱いで、単数形がありません。一頭なら a head of cattle、または a cow、a steer、a bull と言います。オーストラリアでは stock とも言い、stockman、stock horse、stock saddle という職業の語彙すべてがここから生まれました。" } },

  { ref:"paturage", lecon:1, coll:"betail",
    mots:{ fr:{m:"la pâture"}, en:{m:"the paddock", p:"pa-dok"},
           es:{m:"el pastizal"}, it:{m:"il pascolo"},
           de:{m:"die Koppel", p:"ko-peul"}, ja:{m:"放牧地", p:"hōbokuchi"} },
    def:{ fr:"🟥 FAUX AMI MAJEUR : en Australie **a paddock** n'est pas le paddock de détente d'un concours, ni un petit pré — c'est une PARCELLE DE PROPRIÉTÉ, qui peut faire des milliers d'hectares. On y met le bétail pendant des mois, et il faut des jours à cheval pour la parcourir. ⚠️ Le paddock de concours, lui, se dit *the collecting ring* — voir Wellington.",
          en:"A major false friend: in Australia « a paddock » isn't a collecting ring or a small field — it's a property division that can run to thousands of hectares. Cattle live there for months, and it takes days on horseback to cross one.",
          es:"Falso amigo: en Australia « paddock » no es un pequeño prado sino una parcela que puede tener miles de hectáreas.",
          it:"Falso amico: in Australia « paddock » non è un piccolo prato ma una parcella che può contare migliaia di ettari.",
          de:"Falscher Freund: in Australien ist « paddock » keine kleine Koppel, sondern eine Parzelle von tausenden Hektar.",
          ja:"重大な偽の友。オーストラリアの paddock は下見馬場でも小さな放牧地でもなく、数千ヘクタールにもなる牧場の区画です。牛は何か月もそこで暮らし、馬で横断するのに何日もかかります。" } },

  { ref:"dally", lecon:1, coll:"corde", v:true,
    mots:{ fr:{m:"fixer la corde à la corne"}, en:{m:"to dally", p:"da-li"},
           es:{m:"dar vuelta a la cabeza de silla"}, it:{m:"dare volta al pomo"},
           de:{m:"das Seil um das Horn legen", p:"zaïl"}, ja:{m:"ロープを鞍頭に巻く", p:"rōpu o kuratō ni maku"} },
    def:{ fr:"🟥 LE VERBE VIENT DE L'ESPAGNOL **« DALE VUELTA »**, « donne-lui un tour » : les vaqueros mexicains le criaient, les cowboys américains l'ont entendu *dally*. C'est enrouler la corde autour de la corne après avoir attrapé une bête. ⚠️ ET C'EST LÀ QUE LA CORNE SERT — pas à se tenir. Un doigt coincé entre la corde et la corne se perd : les vieux cowboys se reconnaissent à leurs mains.",
          en:"The verb comes from Spanish « dale vuelta », give it a turn: Mexican vaqueros shouted it and American cowboys heard « dally ». It's winding the rope round the horn after you've roped an animal. That's what the horn is for — not for holding on. A finger caught between rope and horn is lost.",
          es:"El verbo viene del español « dale vuelta »: los vaqueros mexicanos lo gritaban y los vaqueros americanos oyeron « dally ».",
          it:"Il verbo viene dallo spagnolo « dale vuelta »: i vaqueros messicani lo gridavano e i cowboy americani hanno sentito « dally ».",
          de:"Das Verb kommt vom spanischen « dale vuelta »: mexikanische Vaqueros riefen es, amerikanische Cowboys hörten « dally ».",
          ja:"この動詞はスペイン語の dale vuelta（ひと巻きしろ）に由来します。メキシコのバケロが叫ぶのを、アメリカのカウボーイが dally と聞き取ったのです。牛を捕らえたあと、ロープを鞍頭に巻きつけること。鞍頭はこのためにあり、掴まるためではありません。ロープと鞍頭の間に挟まれた指は失われます。" } },

  { ref:"akubra", lecon:1, coll:"tenue-western",
    mots:{ fr:{m:"l'Akubra"}, en:{m:"the Akubra", p:"a-kou-bra", var:"the wide-brimmed hat"},
           es:{m:"el Akubra"}, it:{m:"l'Akubra"},
           de:{m:"der Akubra"}, ja:{m:"アクブラ帽", p:"akubura bō"} },
    def:{ fr:"🟥 UNE MARQUE DEVENUE UN NOM COMMUN, comme Frigidaire ou Kleenex : la maison Akubra fabrique des feutres de poil de lapin depuis 1874, et en Australie le mot désigne le chapeau lui-même. ⚠️ **CE N'EST PAS UN STETSON** : bord plus large et plat, souvent relevé sur les côtés, calotte moins pincée. Un Australien ne dit jamais « cowboy hat ». 🟥 Et il cède la place au casque pour le travail rapide — le chapeau est l'identité, le casque la sécurité, et les deux coexistent dans la même journée.",
          en:"A brand that became a common noun, like Hoover: Akubra has made rabbit-fur felt hats since 1874, and in Australia the word means the hat itself. It is NOT a Stetson: wider flatter brim, often turned up at the sides, less pinched crown. An Australian never says « cowboy hat ». And it gives way to a helmet for fast work.",
          es:"Una marca convertida en nombre común: Akubra fabrica sombreros de fieltro desde 1874. No es un Stetson: ala más ancha y plana. Y cede el sitio al casco para el trabajo rápido.",
          it:"Un marchio diventato nome comune: Akubra fa cappelli di feltro dal 1874. Non è uno Stetson: tesa più larga e piatta. E lascia il posto al casco per il lavoro veloce.",
          de:"Eine Marke, die zum Gattungsnamen wurde: Akubra macht seit 1874 Filzhüte. Kein Stetson: breitere, flachere Krempe. Und er weicht dem Helm bei schneller Arbeit.",
          ja:"商標が普通名詞になった例。アクブラ社は一八七四年からウサギ毛のフェルト帽を作っており、オーストラリアではこの語が帽子そのものを指します。ステットソンではありません。つばがより広く平らで、両脇が反り、山の折りが浅いのです。オーストラリア人は cowboy hat とは言いません。そして速い作業のときはヘルメットに替えます。" } },

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

  ],

  /* ==================================================================
     LE DIALOGUE DE TAMWORTH — 17 août 2026, session 214.

     LA SCÈNE : une journée de muster dans le bush australien, du
     sellage au tri dans les yards. 18 phrases, 6 temps.

     🟥 LES DIX-HUIT PHRASES SONT DE BLANDINE, avec leur traduction
     anglaise et le lexique du chapitre.
     🟥 SA STRUCTURE : **SELLE → DÉPART DANS LE BUSH → MUSTER → MOB →
     CUTTING → YARDS → TRI.**

     🟥 LA NOTION PHARE, ET CE QUI FAIT L'IDENTITÉ DE LA VILLE :
     **L'ANGLAIS AUSTRALIEN.**
       anglais général → the herd    ·  🇦🇺 → **the mob**
       américain       → the roundup ·  🇦🇺 → **the muster**
       (et *muster* est nom ET verbe en Australie)
     ⚠️ Ce ne sont pas des variantes pittoresques : ce sont les seuls
     mots employés là-bas. NE PAS « corriger » vers l'anglais général.

     ⚠️ CUTTING N'EST PAS DRAFTING :
     · **cutting** = isoler une bête et l'empêcher de revenir au
       troupeau. Travail monté, et c'est une discipline à part entière.
     · **drafting** = trier les animaux dans les yards, souvent à pied.
       C'est de l'organisation.
     Le dialogue les emploie aux temps 4 et 5, dans cet ordre.

     🟥 **NECK REINING** NE SE TRADUIT PAS PAR « MONTER À UNE MAIN » :
     l'anglais nomme LE MÉCANISME — la rêne extérieure qui se pose sur
     l'encolure — là où le français nomme la main. *Does he neck rein?*
     est la question qu'on pose avant de monter un cheval inconnu.

     ⚠️ ET LA PHRASE 17 EST CELLE QUI REND LE CHAPITRE HONNÊTE : l'Akubra
     cède la place au casque pour le travail rapide. Le chapeau est
     l'identité, le casque la sécurité, et les deux coexistent dans la
     même journée. NE PAS la retirer.

     ⚠️ LA CORNE NE SERT PAS À SE TENIR. Elle sert à *dally* — enrouler
     la corde après avoir attrapé une bête. Deux phrases le disent,
     à deux lignes d'écart, exprès.

     `dit` : "joueuse" = elle produit · "club" = un stockman.
  ================================================================== */
  dialogue: {
    ville: "tamworth", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · le muster de demain ---- */
      { ref:"dt-rassemble-demain", temps:1, dit:"joueuse", mots:["rassemblement","troupeau"],
        fr:"On rassemble le troupeau demain matin ?",
        en:"Are we mustering the mob tomorrow morning?",
        es:"¿Reunimos el ganado mañana por la mañana?",
        it:"Radunavamo la mandria domani mattina?",
        de:"Treiben wir die Herde morgen früh zusammen?",
        ja:"明日 の 朝、 群れ を 集め ます か ?" },

      { ref:"dt-betail-disperse", temps:1, dit:"club", mots:["betail","paturage"],
        fr:"Le bétail est encore dispersé dans les pâtures.",
        en:"The cattle are still spread out across the paddocks.",
        es:"El ganado sigue disperso por los pastizales.",
        it:"Il bestiame è ancora sparso nei pascoli.",
        de:"Das Vieh ist noch über die Koppeln verteilt.",
        ja:"牛 は まだ 放牧地 に 散らばっ て い ます。" },

      { ref:"dt-ramener-parcs", temps:1, dit:"club", mots:["troupeau","parcs","rassemblement"],
        fr:"Il faut ramener tout le troupeau jusqu'aux parcs.",
        en:"We need to bring the whole mob back to the yards.",
        es:"Hay que llevar todo el ganado hasta los corrales.",
        it:"Bisogna riportare tutta la mandria ai recinti.",
        de:"Wir müssen die ganze Herde zu den Pferchen bringen.",
        ja:"群れ 全体 を 囲い まで 連れ 戻さ なけれ ば なり ませ ん。" },

      { ref:"dt-muster-plusieurs-heures", temps:1, dit:"club", mots:["rassemblement"],
        fr:"Le rassemblement peut durer plusieurs heures.",
        en:"The muster can take several hours.",
        es:"La reunión puede durar varias horas.",
        it:"Il raduno può durare parecchie ore.",
        de:"Das Zusammentreiben kann mehrere Stunden dauern.",
        ja:"集める の に 何 時間 も かかる こと が あり ます。" },

      /* ---- temps 2 · quel cheval, quelle selle ---- */
      { ref:"dt-quel-cheval", temps:2, dit:"joueuse", mots:["rassemblement","stock-horse"],
        fr:"Tu prends quel cheval pour le muster ?",
        en:"Which horse are you taking for the muster?",
        es:"¿Qué caballo llevas para la reunión?",
        it:"Che cavallo prendi per il raduno?",
        de:"Welches Pferd nimmst du zum Zusammentreiben?",
        ja:"集め に は どの 馬 で 出 ます か ?" },

      { ref:"dt-habitue-betail", temps:2, dit:"club", mots:["stock-horse","betail"],
        fr:"Ce cheval a l'habitude de travailler avec le bétail.",
        en:"This horse is used to working cattle.",
        es:"Este caballo está acostumbrado a trabajar con el ganado.",
        it:"Questo cavallo è abituato a lavorare col bestiame.",
        de:"Dieses Pferd ist es gewohnt, mit Vieh zu arbeiten.",
        ja:"この 馬 は 牛 を 扱う 仕事 に 慣れ て い ます。" },

      { ref:"dt-selle-longues-heures", temps:2, dit:"club", mots:["selle-western"],
        fr:"Cette selle est faite pour passer de longues heures à cheval.",
        en:"This saddle is designed for spending long hours in the saddle.",
        es:"Esta silla está hecha para pasar largas horas a caballo.",
        it:"Questa sella è fatta per passare lunghe ore a cavallo.",
        de:"Dieser Sattel ist für lange Stunden im Sattel gebaut.",
        ja:"この 鞍 は、 長 時間 の 騎乗 の ため に 作ら れ て い ます。" },

      /* ---- temps 3 · monter à une main, et la corne ---- */
      { ref:"dt-neck-rein", temps:3, dit:"joueuse", mots:["une-main"],
        fr:"Il se monte à une main ?",
        en:"Does he neck rein?",
        es:"¿Se monta a una mano?",
        it:"Si monta a una mano?",
        de:"Lässt er sich einhändig reiten?",
        ja:"片手 手綱 で 乗れ ます か ?" },

      { ref:"dt-main-libre-corde", temps:3, dit:"club", mots:["corde","une-main"],
        fr:"Garde une main libre pour la corde.",
        en:"Keep one hand free for the rope.",
        es:"Deja una mano libre para la cuerda.",
        it:"Tieni una mano libera per la corda.",
        de:"Halte eine Hand für das Seil frei.",
        ja:"ロープ の ため に 片手 を 空け て おき ます。" },

      { ref:"dt-pas-tenir-corne", temps:3, dit:"club", mots:["corne"],
        fr:"Ne tiens pas la corne de la selle.",
        en:"Don't hold the saddle horn.",
        es:"No te agarres a la cabeza de la silla.",
        it:"Non tenerti al pomo della sella.",
        de:"Halt dich nicht am Sattelhorn fest.",
        ja:"鞍頭 に つかまっ て は いけ ませ ん。" },

      { ref:"dt-corne-pour-dally", temps:3, dit:"club", mots:["corne","dally","corde"],
        fr:"La corne sert à fixer la corde, pas à se tenir.",
        en:"The horn is for dallying the rope, not for holding on.",
        es:"La cabeza de silla sirve para dar vuelta a la cuerda, no para agarrarse.",
        it:"Il pomo serve per dare volta alla corda, non per tenersi.",
        de:"Das Horn ist zum Umlegen des Seils da, nicht zum Festhalten.",
        ja:"鞍頭 は ロープ を 巻く ため の もの で、 掴まる ため の もの で は あり ませ ん。" },

      /* ---- temps 4 · le cutting ---- */
      { ref:"dt-isoler-vache", temps:4, dit:"club", mots:["tri","troupeau"],
        fr:"On va isoler cette vache du troupeau.",
        en:"We're going to cut this cow out of the mob.",
        es:"Vamos a apartar esta vaca del ganado.",
        it:"Separiamo questa vacca dalla mandria.",
        de:"Wir schneiden diese Kuh aus der Herde heraus.",
        ja:"この 牛 を 群れ から 分け ます。" },

      { ref:"dt-empeche-retour", temps:4, dit:"club", mots:["tri","troupeau"],
        fr:"Empêche-la de retourner dans le troupeau.",
        en:"Keep her from getting back into the mob.",
        es:"Impídele volver al ganado.",
        it:"Impediscile di tornare nella mandria.",
        de:"Lass sie nicht zurück in die Herde.",
        ja:"群れ に 戻ら せ ない よう に し ます。" },

      { ref:"dt-laisse-lire-vache", temps:4, dit:"club", mots:["stock-horse","betail"],
        fr:"Laisse le cheval lire les mouvements de la vache.",
        en:"Let the horse read the cow.",
        es:"Deja que el caballo lea los movimientos de la vaca.",
        it:"Lascia che il cavallo legga i movimenti della vacca.",
        de:"Lass das Pferd die Kuh lesen.",
        ja:"牛 の 動き は、 馬 に 読ま せ ます。" },

      { ref:"dt-tourne-vite", temps:4, dit:"club", mots:["stock-horse","betail"],
        fr:"Ce cheval tourne très vite et reste attentif au bétail.",
        en:"This horse turns very quickly and stays focused on the cattle.",
        es:"Este caballo gira muy rápido y sigue atento al ganado.",
        it:"Questo cavallo gira molto in fretta e resta attento al bestiame.",
        de:"Dieses Pferd wendet sehr schnell und bleibt am Vieh.",
        ja:"この 馬 は 回転 が 速く、 牛 から 目 を 離し ませ ん。" },

      /* ---- temps 5 · les yards et le tri ---- */
      { ref:"dt-trie-avant-midi", temps:5, dit:"club", mots:["tri","parcs"],
        fr:"On les trie dans les parcs avant midi.",
        en:"We draft them in the yards before midday.",
        es:"Los clasificamos en los corrales antes del mediodía.",
        it:"Li smistiamo nei recinti prima di mezzogiorno.",
        de:"Wir sortieren sie vor Mittag in den Pferchen.",
        ja:"昼 まで に 囲い の 中 で 選り分け ます。" },

      /* ---- temps 6 · le chapeau, et le métier ---- */
      /* 🟥 La phrase qui rend le chapitre honnête. */
      { ref:"dt-akubra-casque", temps:6, dit:"club", mots:["akubra","chapeau-large"],
        fr:"Il porte un Akubra, mais il mettra son casque pour le travail rapide.",
        en:"He's wearing an Akubra, but he'll put his helmet on for faster work.",
        es:"Lleva un Akubra, pero se pondrá el casco para el trabajo rápido.",
        it:"Porta un Akubra, ma metterà il casco per il lavoro veloce.",
        de:"Er trägt einen Akubra, setzt aber für die schnelle Arbeit den Helm auf.",
        ja:"アクブラ帽 を かぶっ て い ます が、 速い 作業 の とき は ヘルメット に 替え ます。" },

      { ref:"dt-travail-quotidien", temps:6, dit:"club", mots:["le-western","betail","troupeau"],
        fr:"Ici, savoir déplacer un troupeau fait partie du travail quotidien.",
        en:"Out here, moving cattle is part of the everyday job.",
        es:"Aquí, saber mover el ganado forma parte del trabajo diario.",
        it:"Qui, saper spostare una mandria fa parte del lavoro quotidiano.",
        de:"Hier draußen gehört das Treiben von Vieh zur täglichen Arbeit.",
        ja:"ここ で は、 群れ を 動かせる こと が 日々 の 仕事 の 一部 です。" }
    ]
  }
};
