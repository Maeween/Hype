/* hype-lingo-lex-cours.js — Hype Lingo · Chapitre 5 · « Le cours »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS.

   CE CHAPITRE N'EST PAS COMME LES AUTRES.
   Ce ne sont pas des objets qu'on montre du doigt, ce sont des ORDRES.
   Deux usages, donc deux exercices :
     · côté ÉLÈVE   — reconnaître au vol, sans traduire. Exercice d'écoute.
     · côté ENSEIGNANT — produire la phrase. Exercice vocal (Premium).

   Le champ `dit` porte l'ordre tel qu'il est réellement crié dans un
   manège, pas la traduction mot à mot. C'est lui qu'on fait entendre.

   ⚠️ RELECTURE NATIVE INDISPENSABLE, plus encore que pour l'Écurie :
   un ordre mal formulé s'entend immédiatement. Le japonais est le plus
   incertain — les termes d'allures (常歩・速歩・駈歩) sont ceux des
   manuels, mais l'usage oral en club peut différer.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.cours = {
  ref: "cours",
  chapitre: 5,
  titre: { fr:"Le cours", en:"The lesson", es:"La clase", it:"La lezione", de:"Die Reitstunde", ja:"レッスン" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LES ALLURES ET LES TRANSITIONS ============ */

  { ref:"au-pas", lecon:1, coll:"allures",
    mots:{ fr:{m:"au pas", dit:"Au pas !"},
           en:{m:"walk", p:"ouok", dit:"Walk on !"},
           es:{m:"al paso", dit:"¡ Al paso !"},
           it:{m:"al passo", dit:"Al passo !"},
           de:{m:"im Schritt", p:"im chritt", dit:"Schritt !"},
           ja:{m:"常歩", p:"namiashi", dit:"常歩 !"} },
    def:{ fr:"L'allure la plus lente, à quatre temps. « Walk on » veut dire « repartez au pas », pas simplement « pas ».",
          en:"The slowest gait, in four beats. « Walk on » means go forward in walk, not merely « walk ».",
          es:"El aire más lento, de cuatro tiempos. « Walk on » significa « salgan al paso », no simplemente « paso ».",
          it:"L'andatura più lenta, a quattro tempi. « Walk on » significa « ripartite al passo », non semplicemente « passo ».",
          de:"Die langsamste Gangart, im Viertakt. « Walk on » heißt « im Schritt anreiten », nicht einfach « Schritt ».",
          ja:"四拍子の、最も遅い歩法。« walk on » は「常歩で進め」の号令であって、ただの「常歩」ではありません。" } },

  { ref:"halte", lecon:1, coll:"allures",
    mots:{ fr:{m:"la halte", dit:"Halte !"},
           en:{m:"halt", p:"holt", dit:"And halt !"},
           es:{m:"la parada", var:"el alto", dit:"¡ Alto !"},
           it:{m:"l'alt", dit:"Alt !"},
           de:{m:"das Halten", p:"hal-ten", dit:"Halten !"},
           ja:{m:"停止", p:"teishi", dit:"停止 !"} },
    def:{ fr:"L'arrêt complet, immobile et droit. En anglais l'ordre est souvent précédé de « and », qui annonce la transition.",
          en:"A complete, square and still stop. The command is usually preceded by « and », which announces the transition.",
          es:"La parada completa, inmóvil y derecha. En inglés la orden va a menudo precedida de « and », que anuncia la transición.",
          it:"L'arresto completo, immobile e dritto. In inglese l'ordine è spesso preceduto da « and », che annuncia la transizione.",
          de:"Das vollständige, gerade, unbewegte Halten. Im Englischen geht der Order oft ein « and » voraus, das den Übergang ankündigt.",
          ja:"完全な停止。まっすぐ、動かずに。英語では号令の前によく « and » がつき、移行の合図になります。" } },

  { ref:"au-trot", lecon:1, coll:"allures",
    mots:{ fr:{m:"au trot", dit:"Au trot !"},
           en:{m:"trot", p:"trot", dit:"Trot on !"},
           es:{m:"al trote", dit:"¡ Al trote !"},
           it:{m:"al trotto", dit:"Al trotto !"},
           de:{m:"im Trab", p:"trab", dit:"Trab !"},
           ja:{m:"速歩", p:"hayaashi", dit:"速歩 !"} },
    def:{ fr:"Allure à deux temps, par bipèdes diagonaux.",
          en:"A two-beat gait, the legs moving in diagonal pairs.",
          es:"Aire de dos tiempos, por bípedos diagonales.",
          it:"Andatura a due tempi, per bipedi diagonali.",
          de:"Gangart im Zweitakt, auf diagonalen Beinpaaren.",
          ja:"対角の肢が対になって動く、二拍子の歩法。" } },

  { ref:"trot-enleve", lecon:1, coll:"allures",
    mots:{ fr:{m:"le trot enlevé", dit:"Trot enlevé !"},
           en:{m:"rising trot", p:"raï-zing trot", dit:"Rising trot !", var:"posting trot (US)"},
           es:{m:"el trote levantado", dit:"¡ Trote levantado !"},
           it:{m:"il trotto battuto", var:"il trotto sollevato", dit:"Trotto battuto !"},
           de:{m:"der Leichttrab", p:"laïcht-trab", dit:"Leichttraben !"},
           ja:{m:"軽速歩", p:"keihayaashi", dit:"軽速歩 !"} },
    def:{ fr:"Le cavalier se lève un temps sur deux. C'est le mot qui change le plus d'un pays à l'autre : « rising » en Grande-Bretagne, « posting » aux États-Unis, et l'allemand dit littéralement « trot léger ».",
          en:"The rider rises every other beat. This is the word that varies most: « rising » in Britain, « posting » in America, and German says literally « light trot ».",
          es:"El jinete se levanta un tiempo de cada dos. Es la palabra que más cambia de un país a otro: « rising » en Gran Bretaña, « posting » en Estados Unidos, y el alemán dice literalmente « trote ligero ».",
          it:"Il cavaliere si alza un tempo su due. È la parola che cambia di più da un paese all'altro: « rising » in Gran Bretagna, « posting » negli Stati Uniti, e il tedesco dice alla lettera « trotto leggero ».",
          de:"Der Reiter steht jeden zweiten Takt auf. Das Wort wechselt am stärksten von Land zu Land: « rising » in Großbritannien, « posting » in den USA — und das Deutsche sagt wörtlich Leichttraben.",
          ja:"二拍にひと呼吸、騎手が立つ乗り方。国ごとにいちばん名前が変わる言葉です。イギリスで « rising »、アメリカで « posting »、ドイツ語は文字どおり「軽い速歩」。" } },

  { ref:"trot-assis", lecon:1, coll:"allures",
    mots:{ fr:{m:"le trot assis", dit:"Trot assis !"},
           en:{m:"sitting trot", p:"si-ting trot", dit:"Sitting trot !"},
           es:{m:"el trote sentado", dit:"¡ Trote sentado !"},
           it:{m:"il trotto seduto", dit:"Trotto seduto !"},
           de:{m:"der Aussitztrab", p:"aous-zits-trab", dit:"Aussitzen !"},
           ja:{m:"正反動", p:"seihandō", dit:"正反動 !"} },
    def:{ fr:"Le cavalier reste assis et accompagne le mouvement du dos.",
          en:"The rider stays in the saddle and follows the horse's back.",
          es:"El jinete permanece sentado y acompaña el movimiento con la espalda.",
          it:"Il cavaliere resta seduto e accompagna il movimento con la schiena.",
          de:"Der Reiter bleibt sitzen und schwingt mit dem Rücken mit.",
          ja:"騎手は座ったまま、背中で馬の動きに寄り添います。" } },

  { ref:"au-galop", lecon:1, coll:"allures",
    mots:{ fr:{m:"au galop", dit:"Au galop !"},
           en:{m:"canter", p:"kann-teur", dit:"And canter !", var:"gallop = le galop allongé, jamais en reprise"},
           es:{m:"al galope", dit:"¡ Al galope !"},
           it:{m:"al galoppo", dit:"Al galoppo !"},
           de:{m:"im Galopp", p:"ga-lopp", dit:"Galopp !"},
           ja:{m:"駈歩", p:"kakeashi", dit:"駈歩 !"} },
    def:{ fr:"En anglais, le galop utilisé dans le travail courant est le **canter**. **Gallop** désigne un galop nettement plus rapide, notamment en extérieur ou en course. Dans un cours classique, si le moniteur demande de galoper, le mot attendu est généralement *canter*.",
          en:"In English, the normal schooling gait is the **canter**. **Gallop** means a much faster gait, especially outdoors or in racing. In a normal riding lesson, an instructor asking you to canter will generally use *canter*.",
          es:"⚠️ Trampa mayor: en inglés, el aire trabajado en clase es el **canter**. « Gallop » designa el galope de carrera, tendido — un profesor jamás lo pedirá en pista.",
          it:"⚠️ Trappola maggiore: in inglese l'andatura lavorata in lezione è il **canter**. « Gallop » indica il galoppo da corsa, disteso — un istruttore non lo chiederà mai in maneggio.",
          de:"⚠️ Die große Falle: Die in der Stunde gerittene Gangart heißt **canter**. « Gallop » ist der gestreckte Renngalopp — den verlangt kein Reitlehrer in der Halle.",
          ja:"⚠️ 最大の罠：レッスンで乗る駈歩は英語で **canter**。« gallop » は伸びきった競走の襲歩で、先生が馬場で求めることは決してありません。" } },

  { ref:"transition", lecon:1, coll:"allures",
    mots:{ fr:{m:"la transition", dit:"Préparez la transition !"},
           en:{m:"the transition", p:"tran-zi-cheune", dit:"Prepare for a transition !"},
           es:{m:"la transición", dit:"¡ Preparad la transición !"},
           it:{m:"la transizione", dit:"Preparate la transizione !"},
           de:{m:"der Übergang", p:"u-beur-gang", dit:"Übergang vorbereiten !"},
           ja:{m:"移行", p:"ikō", dit:"移行の準備 !"} },
    def:{ fr:"Le passage d'une allure à une autre. Une bonne transition doit être préparée, équilibrée et nette.",
          en:"A change from one gait to another. Good transitions should be prepared, balanced and clear.",
          es:"El paso de un aire a otro. La calidad de una reprise se juzga ahí primero.",
          it:"Il passaggio da un'andatura all'altra. La qualità di una ripresa si giudica prima di tutto lì.",
          de:"Der Wechsel von einer Gangart in die andere. Daran misst sich zuerst die Qualität einer Aufgabe.",
          ja:"歩法から歩法への切り替え。演技の質は、まずここで判断されます。" } },

  { ref:"allongez", lecon:1, coll:"allures",
    mots:{ fr:{m:"allonger", dit:"Allongez !"},
           en:{m:"to lengthen", p:"lèn-gzeune", dit:"Lengthen the stride !"},
           es:{m:"alargar", dit:"¡ Alargad !"},
           it:{m:"allungare", dit:"Allungate !"},
           de:{m:"verlängern", p:"fèr-lèn-gueurn", dit:"Verlängern !"},
           ja:{m:"伸ばす", p:"nobasu", dit:"歩幅を伸ばして !"} },
    def:{ fr:"Agrandir la foulée sans accélérer le rythme.",
          en:"Make the stride longer without going faster.",
          es:"Agrandar la zancada sin acelerar el ritmo.",
          it:"Allargare la falcata senza accelerare il ritmo.",
          de:"Die Tritte verlängern, ohne den Takt zu beschleunigen.",
          ja:"リズムを速めずに、一歩の幅を大きくすること。" } },

  { ref:"raccourcissez", lecon:1, coll:"allures",
    mots:{ fr:{m:"raccourcir", dit:"Raccourcissez !"},
           en:{m:"to shorten", p:"chor-teune", dit:"Shorten the stride !"},
           es:{m:"acortar", dit:"¡ Acortad !"},
           it:{m:"accorciare", dit:"Accorciate !"},
           de:{m:"verkürzen", p:"fèr-kur-tseune", dit:"Verkürzen !"},
           ja:{m:"詰める", p:"tsumeru", dit:"歩幅を詰めて !"} },
    def:{ fr:"Réduire la foulée en gardant l'énergie. Ne pas confondre avec ralentir.",
          en:"Make the stride shorter while keeping the energy. Not the same as slowing down.",
          es:"Reducir la zancada conservando la energía. No confundir con frenar.",
          it:"Ridurre la falcata mantenendo l'energia. Da non confondere con rallentare.",
          de:"Die Tritte verkürzen und die Energie behalten. Nicht mit Langsamerwerden verwechseln.",
          ja:"エネルギーを保ったまま歩幅を詰めること。減速と混同しないように。" } },

  { ref:"en-avant", lecon:1, coll:"allures",
    mots:{ fr:{m:"en avant", dit:"En avant !"},
           en:{m:"forward", p:"for-oueude", dit:"Forward !"},
           es:{m:"adelante", dit:"¡ Adelante !"},
           it:{m:"avanti", dit:"Avanti !"},
           de:{m:"vorwärts", p:"for-vèrts", dit:"Vorwärts !"},
           ja:{m:"前へ", p:"mae e", dit:"前へ !"} },
    def:{ fr:"L'ordre le plus fréquent d'un cours : plus d'énergie, pas plus de vitesse.",
          en:"The most frequent command of any lesson: more energy, not more speed.",
          es:"La orden más frecuente de una clase: más energía, no más velocidad.",
          it:"L'ordine più frequente di una lezione: più energia, non più velocità.",
          de:"Der häufigste Befehl der Stunde: mehr Energie, nicht mehr Tempo.",
          ja:"レッスンでいちばん多い号令。求められているのは勢いであって、速さではありません。" } },

  /* ============ LEÇON 2 · LA POSITION ============ */

  { ref:"talons-bas", lecon:2, coll:"position",
    mots:{ fr:{m:"les talons bas", dit:"Talons bas !"},
           en:{m:"heels down", p:"hilz-daoune", dit:"Heels down !"},
           es:{m:"talones abajo", dit:"¡ Talones abajo !"},
           it:{m:"talloni bassi", dit:"Talloni bassi !"},
           de:{m:"Absätze tief", p:"ap-zèts-e tif", dit:"Absätze tief !"},
           ja:{m:"かかとを下げる", p:"kakato o sageru", dit:"かかと下げて !"} },
    def:{ fr:"La correction la plus répétée au monde, dans toutes les langues.",
          en:"The most repeated correction in the world, in every language.",
          es:"La corrección más repetida del mundo, en todas las lenguas.",
          it:"La correzione più ripetuta al mondo, in tutte le lingue.",
          de:"Die meistwiederholte Korrektur der Welt, in allen Sprachen.",
          ja:"世界じゅうで、あらゆる言語で、最も繰り返される注意。" } },

  { ref:"regardez", lecon:2, coll:"position",
    mots:{ fr:{m:"regarder devant", dit:"Regardez devant vous !"},
           en:{m:"look up", p:"louk-eup", dit:"Look up ! Eyes up !"},
           es:{m:"mirar al frente", dit:"¡ Mirad al frente !"},
           it:{m:"guardare avanti", dit:"Guardate avanti !"},
           de:{m:"nach vorne schauen", p:"narh for-ne chao-en", dit:"Blick geradeaus !"},
           ja:{m:"前を見る", p:"mae o miru", dit:"前を見て !"} },
    def:{ fr:"Regarder où l'on va, jamais la tête du cheval. « Look up » ne veut pas dire lever les yeux au ciel.",
          en:"Look where you are going, never at the horse's head.",
          es:"Mirar adonde se va, jamás la cabeza del caballo. « Look up » no significa mirar al cielo.",
          it:"Guardare dove si va, mai la testa del cavallo. « Look up » non vuol dire guardare il cielo.",
          de:"Dorthin schauen, wo man hinreitet — nie auf den Pferdekopf. « Look up » heißt nicht, in den Himmel zu blicken.",
          ja:"視線は進む先へ。馬の頭を見てはいけません。« look up » は空を見上げろという意味ではありません。" } },

  { ref:"dos-droit", lecon:2, coll:"position",
    mots:{ fr:{m:"le dos droit", dit:"Redressez-vous !"},
           en:{m:"sit up", p:"sit-eup", dit:"Sit up !"},
           es:{m:"la espalda recta", dit:"¡ Enderezaos !"},
           it:{m:"la schiena dritta", dit:"Schiena dritta !"},
           de:{m:"gerade sitzen", p:"gue-ra-de zit-seune", dit:"Gerade sitzen !"},
           ja:{m:"背筋を伸ばす", p:"sesuji o nobasu", dit:"背筋を伸ばして !"} },
    def:{ fr:"Se grandir sans se raidir : le buste vertical, les épaules basses.",
          en:"Grow tall without stiffening: upright body, shoulders down.",
          es:"Crecerse sin ponerse rígido: el busto vertical, los hombros bajos.",
          it:"Farsi grandi senza irrigidirsi: il busto verticale, le spalle basse.",
          de:"Sich aufrichten, ohne steif zu werden: Oberkörper senkrecht, Schultern tief.",
          ja:"こわばらずに、すっと伸びること。上体は垂直に、肩は下げて。" } },

  { ref:"epaules", lecon:2, coll:"position",
    mots:{ fr:{m:"les épaules en arrière", dit:"Les épaules en arrière !"},
           en:{m:"shoulders back", p:"chol-deurz-bak", dit:"Shoulders back !"},
           es:{m:"hombros atrás", dit:"¡ Hombros atrás !"},
           it:{m:"spalle indietro", dit:"Spalle indietro !"},
           de:{m:"Schultern zurück", p:"choul-teurn tsou-ruk", dit:"Schultern zurück !"},
           ja:{m:"肩を引く", p:"kata o hiku", dit:"肩を引いて !"} },
    def:{ fr:"Ouvrir la poitrine sans creuser les reins.",
          en:"Open the chest without hollowing the back.",
          es:"Abrir el pecho sin arquear los riñones.",
          it:"Aprire il petto senza inarcare le reni.",
          de:"Die Brust öffnen, ohne ins Hohlkreuz zu fallen.",
          ja:"腰を反らせずに、胸を開くこと。" } },

  { ref:"raccourcir-renes", lecon:2, coll:"position",
    mots:{ fr:{m:"raccourcir ses rênes", dit:"Raccourcissez vos rênes !"},
           en:{m:"to shorten your reins", p:"chor-teune yor rènz", dit:"Shorten your reins !"},
           es:{m:"acortar las riendas", dit:"¡ Acortad las riendas !"},
           it:{m:"accorciare le redini", dit:"Accorciate le redini !"},
           de:{m:"die Zügel aufnehmen", p:"tsu-gueul aouf-né-meune", dit:"Zügel aufnehmen !"},
           ja:{m:"手綱を詰める", p:"tazuna o tsumeru", dit:"手綱を詰めて !"} },
    def:{ fr:"Reprendre du contact. L'allemand dit « prendre les rênes », pas « les raccourcir ».",
          en:"Take up the contact again. German says « take up the reins » rather than « shorten ».",
          es:"Retomar el contacto. El alemán dice « tomar las riendas », no « acortarlas ».",
          it:"Riprendere il contatto. Il tedesco dice « prendere le redini », non « accorciarle ».",
          de:"Den Kontakt wieder aufnehmen. Das Deutsche sagt « die Zügel aufnehmen », nicht « verkürzen ».",
          ja:"もう一度コンタクトを取ること。ドイツ語では「手綱を短くする」ではなく「手綱を取る」と言います。" } },

  { ref:"renes-longues", lecon:2, coll:"position",
    mots:{ fr:{m:"les rênes longues", dit:"Rendez les rênes !"},
           en:{m:"a long rein", p:"long-rèn", dit:"Long reins !"},
           es:{m:"riendas largas", dit:"¡ Riendas largas !"},
           it:{m:"redini lunghe", dit:"Redini lunghe !"},
           de:{m:"am langen Zügel", p:"am lan-gueun tsu-gueul", dit:"Zügel aus der Hand kauen lassen !"},
           ja:{m:"手綱を伸ばす", p:"tazuna o nobasu", dit:"手綱を長く !"} },
    def:{ fr:"Laisser davantage de longueur de rênes pour permettre au cheval de s'étendre, notamment pendant une récupération ou en fin de séance. En anglais, *free walk on a long rein* désigne aussi un mouvement précis de dressage.",
          en:"Giving more length of rein to let the horse stretch, especially during a recovery or at the end of a session. In English, *free walk on a long rein* is also the name of a specific dressage movement.",
          es:"Dejar que el caballo se estire, en recuperación o al final de la sesión.",
          it:"Lasciare che il cavallo si distenda, in recupero o a fine seduta.",
          de:"Das Pferd sich strecken lassen, zur Erholung oder am Ende der Einheit.",
          ja:"休息や練習の終わりに、馬に体を伸ばさせること。" } },

  { ref:"jambes", lecon:2, coll:"position",
    mots:{ fr:{m:"les jambes", dit:"Plus de jambes !"},
           en:{m:"the leg", p:"lègue", dit:"More leg !"},
           es:{m:"las piernas", dit:"¡ Más pierna !"},
           it:{m:"le gambe", dit:"Più gamba !"},
           de:{m:"der Schenkel", p:"chèn-keul", dit:"Mehr Schenkel !"},
           ja:{m:"脚", p:"ashi", dit:"脚をもっと !"} },
    def:{ fr:"L'aide qui pousse. Attention : en anglais et en allemand, l'ordre est au singulier — « more leg », « mehr Schenkel ».",
          en:"The driving aid. Note it is singular in English and German.",
          es:"La ayuda que empuja. Ojo: en inglés y en alemán la orden va en singular — « more leg », « mehr Schenkel ».",
          it:"L'aiuto che spinge. Attenzione: in inglese e in tedesco l'ordine è al singolare — « more leg », « mehr Schenkel ».",
          de:"Die treibende Hilfe. Achtung: Im Englischen wie im Deutschen steht der Befehl im Singular — « more leg », « mehr Schenkel ».",
          ja:"推進の扶助。注意 — 英語でもドイツ語でも号令は単数形です。« more leg »、« mehr Schenkel »。" } },

  { ref:"assiette", lecon:2, coll:"position",
    mots:{ fr:{m:"l'assiette", dit:"Asseyez-vous dans la selle !"},
           en:{m:"the seat", p:"sitt", dit:"Sit deep !"},
           es:{m:"el asiento", dit:"¡ Sentaos bien !"},
           it:{m:"l'assetto", dit:"Sedete bene !"},
           de:{m:"der Sitz", p:"zits", dit:"Tief sitzen !"},
           ja:{m:"騎坐", p:"kiza", dit:"深く座って !"} },
    def:{ fr:"La façon dont le cavalier est assis, et l'aide qu'il en tire.",
          en:"How the rider sits, and the aid that comes from it.",
          es:"La forma en que el jinete está sentado, y la ayuda que saca de ello.",
          it:"Il modo in cui il cavaliere è seduto, e l'aiuto che ne trae.",
          de:"Wie der Reiter sitzt — und die Hilfe, die er daraus gewinnt.",
          ja:"騎手の座り方そのもの、そしてそこから生まれる扶助。" } },

  { ref:"monter", lecon:2, coll:"position", v:true,
    mots:{ fr:{m:"monter à cheval", dit:"En selle !"},
           en:{m:"to mount", p:"maounnte", dit:"Mount up !"},
           es:{m:"montar", dit:"¡ A caballo !"},
           it:{m:"montare", dit:"In sella !"},
           de:{m:"aufsitzen", p:"aouf-zit-seune", dit:"Aufsitzen !"},
           ja:{m:"騎乗する", p:"kijō suru", dit:"騎乗 !"} },
    def:{ fr:"Se mettre en selle, traditionnellement du côté gauche.",
          en:"Get into the saddle, traditionally from the near side.",
          es:"Ponerse en la silla, siempre por el lado izquierdo por tradición.",
          it:"Mettersi in sella, sempre dal lato sinistro per tradizione.",
          de:"In den Sattel steigen — traditionell immer von links.",
          ja:"鞍にまたがること。伝統として、必ず左側から。" } },

  { ref:"descendre", lecon:2, coll:"position", v:true,
    mots:{ fr:{m:"mettre pied à terre", dit:"Pied à terre !"},
           en:{m:"to dismount", p:"diss-maounnte", dit:"Dismount !"},
           es:{m:"desmontar", dit:"¡ Pie a tierra !"},
           it:{m:"smontare", dit:"Smontate !"},
           de:{m:"absitzen", p:"ap-zit-seune", dit:"Absitzen !"},
           ja:{m:"下馬する", p:"gebasuru", dit:"下馬 !"} },
    def:{ fr:"Descendre de cheval.",
          en:"Get off the horse.",
          es:"Bajar del caballo.",
          it:"Scendere da cavallo.",
          de:"Vom Pferd absitzen.",
          ja:"馬から降りること。" } },

  /* ============ LEÇON 3 · LA PISTE ET LES FIGURES ============ */

  { ref:"main-gauche", lecon:3, coll:"figures",
    mots:{ fr:{m:"sur la main gauche", dit:"Sur la main gauche !"},
           en:{m:"on the left rein", p:"onn ze lèft rèn", dit:"On the left rein !"},
           es:{m:"a mano izquierda", dit:"¡ A mano izquierda !"},
           it:{m:"a mano sinistra", dit:"A mano sinistra !"},
           de:{m:"auf der linken Hand", p:"aouf dèr lin-keune hant", dit:"Auf der linken Hand !"},
           ja:{m:"左手前", p:"hidari temae", dit:"左手前 !"} },
    def:{ fr:"On tourne à gauche, donc le mur est à gauche. ⚠️ L'anglais dit « rein », la rêne — pas « hand ». C'est l'un des ordres les plus mal compris par un francophone.",
          en:"Going left, the wall on your left. Note that English uses « rein » where French says « hand ».",
          es:"Se gira a la izquierda, así que la pared queda a la izquierda. ⚠️ El inglés dice « rein », la rienda — no « hand ». Es una de las órdenes peor entendidas por un francófono.",
          it:"Si gira a sinistra, quindi il muro è a sinistra. ⚠️ L'inglese dice « rein », la redine — non « hand ». È uno degli ordini più fraintesi da un francofono.",
          de:"Man wendet nach links, die Bande ist also links. ⚠️ Das Englische sagt « rein », der Zügel — nicht « hand ». Einer der meistmissverstandenen Befehle.",
          ja:"左へ回るので、壁は左側に。⚠️ 英語は « hand » ではなく « rein »（手綱）と言います。フランス語話者が最も聞き違える号令のひとつです。" } },

  { ref:"main-droite", lecon:3, coll:"figures",
    mots:{ fr:{m:"sur la main droite", dit:"Sur la main droite !"},
           en:{m:"on the right rein", p:"onn ze raït rèn", dit:"On the right rein !"},
           es:{m:"a mano derecha", dit:"¡ A mano derecha !"},
           it:{m:"a mano destra", dit:"A mano destra !"},
           de:{m:"auf der rechten Hand", p:"aouf dèr rèch-teune hant", dit:"Auf der rechten Hand !"},
           ja:{m:"右手前", p:"migi temae", dit:"右手前 !"} },
    def:{ fr:"On tourne à droite, le mur à droite.",
          en:"Going right, the wall on your right.",
          es:"Se gira a la derecha, la pared a la derecha.",
          it:"Si gira a destra, il muro a destra.",
          de:"Man wendet nach rechts, die Bande rechts.",
          ja:"右へ回り、壁は右側に。" } },

  { ref:"changer-main", lecon:3, coll:"figures",
    mots:{ fr:{m:"changer de main", dit:"Changez de main !"},
           en:{m:"to change the rein", p:"tchèndj ze rèn", dit:"Change the rein !"},
           es:{m:"cambiar de mano", dit:"¡ Cambiad de mano !"},
           it:{m:"cambiare mano", dit:"Cambiate mano !"},
           de:{m:"Handwechsel", p:"hant-vèk-seul", dit:"Handwechsel !"},
           ja:{m:"手前を変える", p:"temae o kaeru", dit:"手前変え !"} },
    def:{ fr:"Passer d'un sens à l'autre, en général par la diagonale.",
          en:"Change direction, usually across the diagonal.",
          es:"Pasar de un sentido al otro, en general por la diagonal.",
          it:"Passare da un senso all'altro, in genere per la diagonale.",
          de:"Die Richtung wechseln, meist durch die Diagonale.",
          ja:"進行方向を替えること。ふつうは斜線を通って。" } },

  { ref:"piste", lecon:3, coll:"figures",
    mots:{ fr:{m:"la piste", dit:"Sur la piste !"},
           en:{m:"the track", p:"trak", dit:"Go large !", var:"« go large » = reprenez la piste extérieure"},
           es:{m:"la pista", dit:"¡ A la pista !"},
           it:{m:"la pista", dit:"In pista !"},
           de:{m:"der Hufschlag", p:"houf-chlak", dit:"Ganze Bahn !"},
           ja:{m:"蹄跡", p:"teiseki", dit:"蹄跡上 !"} },
    def:{ fr:"Le tour extérieur du manège. ⚠️ L'ordre anglais est **« go large »**, qui ne se devine pas du tout — il veut dire « reprenez la piste ».",
          en:"The outside track. The command « go large » means: return to the outer track.",
          es:"La vuelta exterior de la pista. ⚠️ La orden inglesa es **« go large »**, que no se adivina en absoluto — significa « retomen la pista ».",
          it:"Il giro esterno del maneggio. ⚠️ L'ordine inglese è **« go large »**, che non si indovina affatto — vuol dire « riprendete la pista ».",
          de:"Der äußere Hufschlag. ⚠️ Der englische Befehl lautet **« go large »** — nicht zu erraten: Er heißt « ganze Bahn ».",
          ja:"馬場の外周。⚠️ 英語の号令は **« go large »** — 見当のつけようがない表現ですが、「蹄跡に戻れ」の意味です。" } },

  { ref:"diagonale", lecon:3, coll:"figures",
    mots:{ fr:{m:"la diagonale", dit:"Par la diagonale !"},
           en:{m:"the diagonal", p:"daï-a-gueu-neul", dit:"Across the diagonal !"},
           es:{m:"la diagonal", dit:"¡ Por la diagonal !"},
           it:{m:"la diagonale", dit:"Per la diagonale !"},
           de:{m:"die Diagonale", p:"di-a-go-na-le", dit:"Durch die ganze Bahn wechseln !"},
           ja:{m:"斜線", p:"shasen", dit:"斜線変換 !"} },
    def:{ fr:"La ligne qui traverse le manège d'un coin à l'autre, servant au changement de main.",
          en:"The line across the school from corner to corner, used to change the rein.",
          es:"La línea que cruza la pista de una esquina a otra, y sirve para el cambio de mano.",
          it:"La linea che attraversa il maneggio da un angolo all'altro, e serve al cambiamento di mano.",
          de:"Die Linie von Ecke zu Ecke quer durch die Bahn, für den Handwechsel.",
          ja:"馬場を角から角へ横切る線。手前を替えるのに使います。" } },

  { ref:"cercle", lecon:3, coll:"figures",
    mots:{ fr:{m:"le cercle", dit:"Un cercle de vingt mètres !"},
           en:{m:"a circle", p:"seur-keul", dit:"Twenty-metre circle !"},
           es:{m:"el círculo", dit:"¡ Círculo de veinte metros !"},
           it:{m:"il circolo", dit:"Circolo di venti metri !"},
           de:{m:"der Zirkel", p:"tsir-keul", dit:"Zirkel !"},
           ja:{m:"輪乗り", p:"wanori", dit:"二十メートルの輪乗り !"} },
    def:{ fr:"La figure de base du travail sur le plat. L'allemand a un mot dédié, « Zirkel », qui désigne précisément le cercle de vingt mètres.",
          en:"The basic schooling figure. German has a dedicated word, « Zirkel », for the twenty-metre circle.",
          es:"La figura de base del trabajo en llano. El alemán tiene una palabra dedicada, « Zirkel », que designa precisamente el círculo de veinte metros.",
          it:"La figura di base del lavoro in piano. Il tedesco ha una parola dedicata, « Zirkel », che indica precisamente il circolo di venti metri.",
          de:"Die Grundfigur der Arbeit auf dem Platz. Das Deutsche hat ein eigenes Wort, den Zirkel — genau der Zwanzig-Meter-Kreis.",
          ja:"平地運動の基本図形。ドイツ語には専用の言葉 « Zirkel » があり、それは正確に直径二十メートルの輪乗りを指します。" } },

  { ref:"volte", lecon:3, coll:"figures",
    mots:{ fr:{m:"la volte", dit:"Une volte !"},
           en:{m:"a small circle", p:"smol seur-keul", dit:"Ten-metre circle !", var:"« volte » existe aussi en anglais technique"},
           es:{m:"la vuelta pequeña", dit:"¡ Vuelta !"},
           it:{m:"la volta", dit:"Volta !"},
           de:{m:"die Volte", p:"vol-te", dit:"Volte !"},
           ja:{m:"小輪乗り", p:"kowanori", dit:"小輪乗り !"} },
    def:{ fr:"Un petit cercle, de six à dix mètres.",
          en:"A small circle, six to ten metres.",
          es:"Un círculo pequeño, de seis a diez metros.",
          it:"Un piccolo circolo, da sei a dieci metri.",
          de:"Ein kleiner Kreis, sechs bis zehn Meter.",
          ja:"直径六〜十メートルの小さな円。" } },

  { ref:"serpentine", lecon:3, coll:"figures",
    mots:{ fr:{m:"la serpentine", dit:"Une serpentine !"},
           en:{m:"a serpentine", p:"seur-peune-taïne", dit:"Serpentine !"},
           es:{m:"la serpentina", dit:"¡ Serpentina !"},
           it:{m:"la serpentina", dit:"Serpentina !"},
           de:{m:"die Schlangenlinie", p:"chlan-gueune-li-ni-e", dit:"Schlangenlinie !"},
           ja:{m:"蛇乗り", p:"hebinori", dit:"蛇乗り !"} },
    def:{ fr:"Une suite de boucles d'un long côté à l'autre.",
          en:"A series of loops from one long side to the other.",
          es:"Una serie de bucles de un lado largo al otro.",
          it:"Una serie di anse da un lato lungo all'altro.",
          de:"Eine Folge von Bögen von einer langen Seite zur anderen.",
          ja:"長蹄跡から長蹄跡へ、弧を連ねて描く図形。" } },

  { ref:"coin", lecon:3, coll:"figures",
    mots:{ fr:{m:"le coin", dit:"Servez-vous de vos coins !"},
           en:{m:"the corner", p:"kor-neur", dit:"Use your corners !"},
           es:{m:"la esquina", dit:"¡ Usad las esquinas !"},
           it:{m:"l'angolo", dit:"Usate gli angoli !"},
           de:{m:"die Ecke", p:"è-ke", dit:"Ecken ausreiten !"},
           ja:{m:"隅角", p:"gūkaku", dit:"隅角をしっかり !"} },
    def:{ fr:"Les quatre angles du manège. Les « faire » vraiment est la marque d'une reprise soignée.",
          en:"The four corners. Riding them properly is the mark of a careful lesson.",
          es:"Los cuatro ángulos de la pista. « Hacerlos » de verdad es la marca de una reprise cuidada.",
          it:"I quattro angoli del maneggio. « Farli » davvero è il segno di una ripresa curata.",
          de:"Die vier Ecken der Bahn. Sie wirklich zu reiten ist das Zeichen einer sorgfältigen Aufgabe.",
          ja:"馬場の四つの角。角を本当に「踏む」ことが、丁寧な演技のしるしです。" } },

  { ref:"ligne-milieu", lecon:3, coll:"figures",
    mots:{ fr:{m:"la ligne du milieu", dit:"Doublez dans la longueur !"},
           en:{m:"the centre line", p:"sènn-teur laïne", dit:"Down the centre line !"},
           es:{m:"la línea media", dit:"¡ Por la línea media !"},
           it:{m:"la linea di mezzo", dit:"Sulla linea di mezzo !"},
           de:{m:"die Mittellinie", p:"mi-teul-li-ni-e", dit:"Auf die Mittellinie !"},
           ja:{m:"中央線", p:"chūōsen", dit:"中央線へ !"} },
    def:{ fr:"La ligne qui coupe le manège en deux dans la longueur, de A à C.",
          en:"The line down the middle of the school, from A to C.",
          es:"La línea que corta la pista en dos a lo largo, de A a C.",
          it:"La linea che taglia il maneggio in due nel senso della lunghezza, da A a C.",
          de:"Die Linie, die die Bahn der Länge nach halbiert, von A nach C.",
          ja:"馬場を縦に二分する線。AからCへ。" } },

  /* ============ LEÇON 4 · LE DÉROULÉ DU COURS ============ */

  { ref:"detente", lecon:4, coll:"deroule",
    mots:{ fr:{m:"la détente", dit:"On se détend au pas !"},
           en:{m:"the warm-up", p:"ouorm-eup", dit:"Warm up in walk !"},
           es:{m:"el calentamiento", dit:"¡ Calentamiento al paso !"},
           it:{m:"il riscaldamento", dit:"Riscaldamento al passo !"},
           de:{m:"das Aufwärmen", p:"aouf-vèr-meune", dit:"Aufwärmen im Schritt !"},
           ja:{m:"準備運動", p:"junbi undō", dit:"常歩で準備運動 !"} },
    def:{ fr:"Le début de séance, rênes longues, pour échauffer le cheval.",
          en:"The start of a session, on a long rein, to warm the horse up.",
          es:"El comienzo de la sesión, riendas largas, para calentar al caballo.",
          it:"L'inizio della seduta, redini lunghe, per riscaldare il cavallo.",
          de:"Der Beginn der Einheit, am langen Zügel, zum Aufwärmen des Pferdes.",
          ja:"練習のはじまり。長い手綱で、馬の体を温めます。" } },

  { ref:"recuperation", lecon:4, coll:"deroule",
    mots:{ fr:{m:"la récupération", dit:"On récupère au pas !"},
           en:{m:"the cool-down", p:"koul-daoune", dit:"Cool off in walk !"},
           es:{m:"la recuperación", dit:"¡ Recuperación al paso !"},
           it:{m:"il defaticamento", dit:"Defaticamento al passo !"},
           de:{m:"das Abwärmen", p:"ap-vèr-meune", dit:"Trockenreiten !"},
           ja:{m:"クールダウン", p:"kūrudaun", dit:"常歩でクールダウン !"} },
    def:{ fr:"La fin de séance, au pas, jusqu'à ce que le cheval soit sec.",
          en:"The end of a session, in walk, until the horse is dry.",
          es:"El final de la sesión, al paso, hasta que el caballo esté seco.",
          it:"La fine della seduta, al passo, finché il cavallo non è asciutto.",
          de:"Das Ende der Einheit, im Schritt, bis das Pferd trocken ist.",
          ja:"練習の終わり。馬の汗が乾くまで、常歩で歩かせます。" } },

  { ref:"toute-reprise", lecon:4, coll:"deroule",
    mots:{ fr:{m:"toute la reprise", dit:"Toute la reprise, au trot !"},
           en:{m:"the whole ride", p:"hol raïde", dit:"Whole ride, trot on !"},
           es:{m:"todo el grupo", dit:"¡ Todo el grupo, al trote !"},
           it:{m:"tutta la ripresa", dit:"Tutta la ripresa, al trotto !"},
           de:{m:"die ganze Abteilung", p:"gan-tse ap-taï-loung", dit:"Ganze Abteilung, Trab !"},
           ja:{m:"全員", p:"zen'in", dit:"全員、速歩 !"} },
    def:{ fr:"Tous les cavaliers ensemble. ⚠️ En anglais, « the ride » désigne le **groupe d'élèves**, pas la promenade — un faux ami redoutable.",
          en:"All riders together. « The ride » means the group of pupils, not an outing.",
          es:"Todos los jinetes juntos. ⚠️ En inglés, « the ride » designa al **grupo de alumnos**, no al paseo — un falso amigo temible.",
          it:"Tutti i cavalieri insieme. ⚠️ In inglese « the ride » indica il **gruppo di allievi**, non la passeggiata — un falso amico temibile.",
          de:"Alle Reiter zusammen. ⚠️ « The ride » meint die **Abteilung**, nicht den Ausritt — ein gefährlicher falscher Freund.",
          ja:"騎手全員そろって。⚠️ 英語の « the ride » は**生徒の一団**を指し、外乗のことではありません。恐るべき偽りの友です。" } },

  { ref:"file-indienne", lecon:4, coll:"deroule",
    mots:{ fr:{m:"en file indienne", dit:"En file indienne !"},
           en:{m:"in single file", p:"sin-gueul faïl", dit:"In single file !"},
           es:{m:"en fila india", dit:"¡ En fila india !"},
           it:{m:"in fila indiana", dit:"In fila indiana !"},
           de:{m:"hintereinander", p:"hin-teur-aï-nan-deur", dit:"Hintereinander !"},
           ja:{m:"縦列", p:"jūretsu", dit:"縦列で !"} },
    def:{ fr:"Les uns derrière les autres, avec la distance d'un cheval.",
          en:"One behind the other, keeping a horse's distance.",
          es:"Unos detrás de otros, con la distancia de un caballo.",
          it:"Uno dietro l'altro, con la distanza di un cavallo.",
          de:"Einer hinter dem anderen, mit einer Pferdelänge Abstand.",
          ja:"一列縦隊で、馬一頭分の間隔を空けて。" } },

  { ref:"distance", lecon:4, coll:"deroule",
    mots:{ fr:{m:"la distance", dit:"Gardez vos distances !"},
           en:{m:"the distance", p:"dis-teunce", dit:"Keep your distance !"},
           es:{m:"la distancia", dit:"¡ Guardad las distancias !"},
           it:{m:"la distanza", dit:"Mantenete le distanze !"},
           de:{m:"der Abstand", p:"ap-chtant", dit:"Abstand halten !"},
           ja:{m:"距離", p:"kyori", dit:"距離を取って !"} },
    def:{ fr:"L'espace entre deux chevaux : une longueur de cheval au minimum.",
          en:"The space between two horses: at least one horse's length.",
          es:"El espacio entre dos caballos: una longitud de caballo como mínimo.",
          it:"Lo spazio tra due cavalli: una lunghezza di cavallo come minimo.",
          de:"Der Abstand zwischen zwei Pferden: mindestens eine Pferdelänge.",
          ja:"前の馬との間隔。最低でも馬一頭分。" } },

  { ref:"preparez", lecon:4, coll:"deroule",
    mots:{ fr:{m:"préparez-vous", dit:"Préparez-vous à…"},
           en:{m:"prepare to", p:"pri-pèr tou", dit:"Prepare to canter !"},
           es:{m:"preparaos", dit:"¡ Preparaos para…!"},
           it:{m:"preparatevi", dit:"Preparatevi a…!"},
           de:{m:"vorbereiten", p:"for-be-raï-teune", dit:"Vorbereiten zum Galopp !"},
           ja:{m:"準備", p:"junbi", dit:"駈歩の準備 !"} },
    def:{ fr:"L'annonce qui précède l'ordre. En reprise, elle donne une ou deux foulées pour se placer.",
          en:"The warning that comes before the command, giving a stride or two to get ready.",
          es:"El anuncio que precede a la orden. En clase, da una o dos zancadas para colocarse.",
          it:"L'annuncio che precede l'ordine. In lezione, dà una o due falcate per piazzarsi.",
          de:"Die Ankündigung vor dem Befehl. Sie gibt ein, zwei Tritte Zeit, sich einzurichten.",
          ja:"号令の前触れ。位置を整えるための一、二歩をくれる言葉です。" } },

  { ref:"reprenez", lecon:4, coll:"deroule",
    mots:{ fr:{m:"reprendre", dit:"Reprenez !"},
           en:{m:"to carry on", p:"ka-ri onn", dit:"Carry on !"},
           es:{m:"continuar", dit:"¡ Continuad !"},
           it:{m:"riprendere", dit:"Riprendete !"},
           de:{m:"weitermachen", p:"vaï-teur-ma-rheune", dit:"Weiter !"},
           ja:{m:"続ける", p:"tsuzukeru", dit:"続けて !"} },
    def:{ fr:"Continuer ce qu'on faisait, après une pause ou une correction.",
          en:"Go on with what you were doing, after a pause or a correction.",
          es:"Continuar lo que se hacía, tras una pausa o una corrección.",
          it:"Continuare ciò che si faceva, dopo una pausa o una correzione.",
          de:"Weitermachen wie zuvor, nach einer Pause oder einer Korrektur.",
          ja:"休止や注意のあと、していたことを再開すること。" } },

  { ref:"doucement", lecon:4, coll:"deroule",
    mots:{ fr:{m:"doucement", dit:"Doucement !"},
           en:{m:"steady", p:"stè-di", dit:"Steady !"},
           es:{m:"despacio", dit:"¡ Despacio !"},
           it:{m:"piano", dit:"Piano !"},
           de:{m:"ruhig", p:"rou-irh", dit:"Ruhig !"},
           ja:{m:"ゆっくり", p:"yukkuri", dit:"ゆっくり !"} },
    def:{ fr:"Calmer sans arrêter. « Steady » est l'un des mots les plus employés d'un manège anglais.",
          en:"Settle without stopping. « Steady » is one of the most-used words in an English school.",
          es:"Calmar sin parar. « Steady » es una de las palabras más usadas en una pista inglesa.",
          it:"Calmare senza fermare. « Steady » è una delle parole più usate in un maneggio inglese.",
          de:"Beruhigen, ohne anzuhalten. « Steady » gehört zu den meistgebrauchten Wörtern einer englischen Halle.",
          ja:"止めずに、落ち着かせること。« steady » はイギリスの馬場で最もよく飛び交う言葉のひとつです。" } },

  { ref:"pause", lecon:4, coll:"deroule",
    mots:{ fr:{m:"la pause", dit:"On fait une pause !"},
           en:{m:"a break", p:"brék", dit:"Take a breather !"},
           es:{m:"el descanso", dit:"¡ Un descanso !"},
           it:{m:"la pausa", dit:"Una pausa !"},
           de:{m:"die Pause", p:"pao-ze", dit:"Pause !"},
           ja:{m:"休憩", p:"kyūkei", dit:"休憩 !"} },
    def:{ fr:"Un temps de marche au pas, rênes longues, au milieu du cours.",
          en:"A spell of walking on a long rein in the middle of the lesson.",
          es:"Un tiempo de marcha al paso, riendas largas, en medio de la clase.",
          it:"Un tempo di marcia al passo, redini lunghe, a metà della lezione.",
          de:"Eine Schrittphase am langen Zügel mitten in der Stunde.",
          ja:"レッスンの途中に挟む、長い手綱での常歩の時間。" } },

  { ref:"au-centre", lecon:4, coll:"deroule",
    mots:{ fr:{m:"au centre", dit:"Rassemblez-vous au centre !"},
           en:{m:"into the middle", p:"in-tou ze mi-deul", dit:"Come into the middle !"},
           es:{m:"al centro", dit:"¡ Al centro !"},
           it:{m:"al centro", dit:"Al centro !"},
           de:{m:"in die Mitte", p:"in di mi-te", dit:"In die Mitte kommen !"},
           ja:{m:"中央へ", p:"chūō e", dit:"中央に集合 !"} },
    def:{ fr:"L'ordre de fin de cours, ou celui qui précède une explication.",
          en:"The end-of-lesson command, or the one before an explanation.",
          es:"La orden de fin de clase, o la que precede una explicación.",
          it:"L'ordine di fine lezione, o quello che precede una spiegazione.",
          de:"Der Befehl am Stundenende — oder vor einer Erklärung.",
          ja:"レッスンの締めの号令。あるいは、説明の前に集まる合図。" } },

  { ref:"bien", lecon:4, coll:"deroule",
    mots:{ fr:{m:"bien", dit:"Bien ! C'est ça !"},
           en:{m:"good", p:"goude", dit:"Good ! That's it !"},
           es:{m:"bien", dit:"¡ Bien ! ¡ Eso es !"},
           it:{m:"bene", dit:"Bene ! Così !"},
           de:{m:"gut", p:"goute", dit:"Gut ! Genau so !"},
           ja:{m:"いいですね", p:"ii desu ne", dit:"いいですね !"} },
    def:{ fr:"L'encouragement. Le connaître évite de croire qu'on s'est trompé.",
          en:"The praise. Knowing it saves you from thinking you got it wrong.",
          es:"El ánimo. Conocerlo evita creer que uno se ha equivocado.",
          it:"L'incoraggiamento. Conoscerlo evita di credere di aver sbagliato.",
          de:"Das Lob. Wer es kennt, glaubt nicht, einen Fehler gemacht zu haben.",
          ja:"励ましの言葉。知っていれば、間違えたのかと勘違いせずに済みます。" } },

  { ref:"attention", lecon:4, coll:"deroule",
    mots:{ fr:{m:"attention", dit:"Attention !"},
           en:{m:"mind out", p:"maïnnd-aoute", dit:"Mind out ! Look out !"},
           es:{m:"cuidado", dit:"¡ Cuidado !"},
           it:{m:"attenzione", dit:"Attenzione !"},
           de:{m:"Achtung", p:"arh-toung", dit:"Achtung !"},
           ja:{m:"危ない", p:"abunai", dit:"危ない !"} },
    def:{ fr:"Le mot qu'il faut comprendre en un dixième de seconde. À apprendre avant tous les autres.",
          en:"The word you must understand in a tenth of a second. Learn it before any other.",
          es:"La palabra que hay que entender en una décima de segundo. Se aprende antes que todas las demás.",
          it:"La parola da capire in un decimo di secondo. Da imparare prima di tutte le altre.",
          de:"Das Wort, das man in einer Zehntelsekunde verstehen muss. Vor allen anderen zu lernen.",
          ja:"〇・一秒で理解しなければならない言葉。ほかのどの言葉よりも先に覚えること。" } }
  ],

  /* ---- phrases complètes : c'est l'objectif final du chapitre ---- */
  phrases: [
    { ref:"renes-trot", lecon:1,
      fr:"Partez au trot enlevé.",
      en:"Go into rising trot.",
      es:"Salgan al trote levantado.",
      it:"Partite al trotto sollevato.",
      de:"Reitet Leichttraben an.",
      ja:"軽速歩 で 進ん で。" },
    { ref:"main-gauche-piste", lecon:3,
      fr:"Sur la main gauche, en piste.",
      en:"On the left rein, go large.",
      es:"A mano izquierda, a la pista.",
      it:"A mano sinistra, in pista.",
      de:"Auf der linken Hand, ganze Bahn.",
      ja:"左 手前 で 蹄跡 を 進ん で。" },
    { ref:"prepare-galop", lecon:4,
      fr:"Départ au galop dans le coin.",
      en:"Canter in the corner.",
      es:"Al galope en la esquina.",
      it:"Al galoppo nell'angolo.",
      de:"Im Eck angaloppieren.",
      ja:"隅 で 駈歩 発進。" },
    { ref:"changez-diagonale", lecon:3,
      fr:"Changez de main par la diagonale.",
      en:"Change the rein across the diagonal.",
      es:"Cambiad de mano por la diagonal.",
      it:"Cambiate mano per la diagonale.",
      de:"Wechselt die Hand durch die ganze Bahn.",
      ja:"斜線 で 手前 を 変えて ください 。" },
    { ref:"talons-regard", lecon:2,
      fr:"Talons bas, regardez devant vous.",
      en:"Heels down, look up.",
      es:"Talones abajo, mirad al frente.",
      it:"Talloni bassi, guardate avanti.",
      de:"Absätze tief, Blick geradeaus.",
      ja:"かかと を 下げて 、 前 を 見て 。" },
    { ref:"pas-renes-longues", lecon:4,
      fr:"Au pas, rênes longues.",
      en:"Walk on a long rein.",
      es:"Al paso, riendas largas.",
      it:"Al passo, redini lunghe.",
      de:"Im Schritt, lange Zügel.",
      ja:"常歩、 手綱 を 伸ばし て。" },
    { ref:"je-nai-pas-compris", lecon:4,
      fr:"Vous pouvez répéter ?",
      en:"Could you say it again ?",
      es:"¿ Puede repetir ?",
      it:"Può ripetere ?",
      de:"Können Sie das wiederholen ?",
      ja:"もう一度 言っ て ください。" }
  ],

  /* ==================================================================
     LE DIALOGUE D'ABERYSTWYTH — 15 août 2026, session 214.

     🟥 ABERYSTWYTH UTILISE CE FICHIER. Le nom d'affichage de la ville
     est « En selle » — IL N'EXISTE AUCUN `lex-en-selle.js`. Blandine a
     cherché : « je trouve nulle part de lex en selle ». La table qui
     commande est `CHAPITRE_DE` dans lingo.html : aberystwyth:"cours",
     windsor:"dressage". ✅ LIRE `CHAPITRE_DE` AVANT de chercher un
     lexique par le nom du chapitre. Claude s'est trompé deux fois de
     suite en déduisant la ville de l'en-tête du fichier.

     LA SCÈNE : une reprise au bord de la mer. 24 phrases, 6 temps.
     🟥 RENVERSEMENT VOULU : 17 phrases sur 24 sont ENTENDUES. Partout
     ailleurs la joueuse produit ; ici elle doit surtout COMPRENDRE ce
     qu'on lui crie, en temps réel, sans pouvoir demander. C'est la
     nature même du chapitre — des ordres, pas des objets.
     ⚠️ NE PAS « rééquilibrer » en ajoutant des questions.

     🟥 SEIZE PHRASES SUR VINGT-QUATRE VIENNENT DE BLANDINE, dictées le
     15/08 pendant la relecture. Elles remplacent des formulations plus
     plates de Claude, et elles sont MEILLEURES pour des raisons
     précises — notées ici pour qu'on ne les « corrige » jamais :
     · « raccourcissez vos étrivières d'un trou » : le verbe du manège.
     · « faites une volte en A, puis vous remarchez large » : la volte
       est SITUÉE À UNE LETTRE, comme un vrai moniteur. Et « marcher
       large » est du vocabulaire de reprise, pas de manuel.
     · « commencez à préparer vos aides pour le départ au galop » :
       nomme LES AIDES, notion centrale que « préparez le galop »
       n'enseignait pas.
     · « est-ce que je peux ralentir ou repasser au pas ? » : ce qu'on
       dit quand on est dépassée MAINTENANT, pas une négociation
       d'allure.
     · « on passe rênes longues, on les laisse récupérer » : le « on »
       collectif — le moniteur parle à la reprise entière.
     · « on tient son dos, on se grandit vers le haut » · « gardez les
       mains basses et fixes » · « on plie et on déplie les coudes pour
       accompagner au galop » : LA POSITION, qui manquait entièrement.
     · « attention à bien resangler » : le geste qu'on oublie. Le mot
       revient du Morne (avant la baignade) — répétition à deux
       endroits différents, c'est ce qui l'installe.
     · les DEUX réglages opposés, gardés ensemble sur sa demande
       (« on peut la rajouter et garder raccourcissez vos étriers on va
       sauter ») : on raccourcit POUR SAUTER, on rallonge POUR LE
       DRESSAGE. Chaque phrase dit son motif. C'est le seul endroit du
       voyage où les deux verbes se répondent. NE PAS en supprimer un.

     ⚠️ MOTS EMPLOYÉS SANS ÊTRE AU LEXIQUE, volontairement : les LETTRES
     du manège (A), LES AIDES, les COUDES, « marcher large »,
     « resangler ». Ils s'apprennent par la phrase, comme « entier » au
     Connemara. ⚠️ « les aides » mériterait une entrée un jour — c'est
     le cœur du métier — ici ou à Windsor. Signalé, non tranché.

     ⚠️ ÉTRIERS / ÉTRIVIÈRES : l'alternance est celle de Blandine et
     elle est RÉALISTE (en manège on règle « ses étriers » par
     raccourci). Signalé, elle n'a pas demandé d'uniformiser.
     NE PAS uniformiser sans son accord.

     ⚠️ Plusieurs de ces ordres existent DÉJÀ comme `phrases`
     d'exercice dans ce fichier (`renes-trot`, `main-gauche-piste`,
     `changez-diagonale`, `talons-regard`, `pas-renes-longues`,
     `je-nai-pas-compris`). Ce n'est pas un doublon : autre exercice,
     autre rôle. C'est de la révision espacée.

     🟥 LE CÔTÉ ENSEIGNANT N'EST PAS ICI. Ce fichier prévoit deux rôles
     (reconnaître / produire l'ordre). Décision de Blandine, 15/08 :
     l'enseignement ira à une 32ᵉ VILLE NEUVE — « on prendra une
     nouvelle ville proposée en une ». Saumur écartée (« déjà bien avec
     son vocabulaire »), Lamotte-Beuvron écartée (« c'est les poneys »).
     ⚠️ Question ouverte AVANT d'écrire cette ville : enseigne-t-on dans
     la langue étrangère ?

     `dit` : "joueuse" = elle produit · "club" = le moniteur, elle
     entend et comprend.
  ================================================================== */
  dialogue: {
    ville: "aberystwyth", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 24 phrases */

    phrases: [

      /* ---- temps 1 · je monte ---- */
      { ref:"d-tenir-cheval", temps:1, dit:"joueuse", mots:["monter"],
        fr:"Est-ce que vous pouvez me tenir le cheval ?",
        en:"Could you hold the horse for me?",
        es:"¿Puede sujetarme el caballo?",
        it:"Può tenermi il cavallo?",
        de:"Können Sie mir das Pferd halten?",
        ja:"馬 を 押さえ て もらえ ます か ?" },

      { ref:"d-r-pied-gauche", temps:1, dit:"club", mots:["monter"],
        fr:"Mettez le pied gauche à l'étrier.",
        en:"Left foot in the stirrup.",
        es:"Pie izquierdo en el estribo.",
        it:"Piede sinistro nella staffa.",
        de:"Linken Fuß in den Steigbügel.",
        ja:"左足 を 鐙 に 入れ て ください。" },

      /* Phrase de Blandine. `resangler` revient du Morne : deux villes,
         deux moments, le même geste — c'est ce qui l'installe. */
      { ref:"d-r-resangler", temps:1, dit:"club", mots:["attention"],
        fr:"Attention à bien resangler.",
        en:"Don't forget to tighten your girth.",
        es:"Ojo, aprieta bien la cincha.",
        it:"Attenzione a stringere bene il sottopancia.",
        de:"Denk daran, richtig nachzugurten.",
        ja:"腹帯 を しっかり 締め 直し て ください。" },

      /* 🟥 LES DEUX RÉGLAGES OPPOSÉS, chacun avec son motif. */
      { ref:"d-r-raccourcir-sauter", temps:1, dit:"club", mots:["raccourcissez"],
        fr:"Raccourcissez vos étriers, on va sauter.",
        en:"Take your stirrups up — we're jumping today.",
        es:"Suban los estribos, hoy vamos a saltar.",
        it:"Accorciate le staffe, oggi si salta.",
        de:"Schnallt die Bügel kürzer, heute wird gesprungen.",
        ja:"今日 は 障害 な ので、 鐙 を 短く し て ください。" },

      { ref:"d-r-rallonger-dressage", temps:1, dit:"club", mots:["allongez"],
        fr:"Aujourd'hui on va faire du dressage, vous pouvez rallonger vos étrivières de deux trous.",
        en:"We're doing dressage today, so you can let your stirrup leathers down two holes.",
        es:"Hoy hacemos doma, pueden bajar las aciones dos agujeros.",
        it:"Oggi facciamo dressage, potete allungare gli staffili di due buchi.",
        de:"Heute machen wir Dressur, ihr könnt die Steigbügelriemen zwei Löcher länger schnallen.",
        ja:"今日 は 馬場 な ので、 鐙革 を 二つ 分 長く し て も いい です。" },

      { ref:"d-bonne-longueur", temps:1, dit:"joueuse", mots:[],
        fr:"Est-ce que mes étriers sont à la bonne longueur ?",
        en:"Are my stirrups the right length?",
        es:"¿Están mis estribos a la altura correcta?",
        it:"Le mie staffe sono della lunghezza giusta?",
        de:"Sind meine Steigbügel richtig lang?",
        ja:"鐙 の 長さ は これ で いい です か ?" },

      /* ---- temps 2 · les premiers ordres, et la position ---- */
      { ref:"d-r-marche-au-pas", temps:2, dit:"club", mots:["au-pas"],
        fr:"On marche au pas.",
        en:"Walk on.",
        es:"Al paso.",
        it:"Al passo.",
        de:"Schritt.",
        ja:"常歩 で 進み ます。" },

      { ref:"d-r-main-gauche", temps:2, dit:"club", mots:["main-gauche","piste"],
        fr:"Prenez la piste à main gauche.",
        en:"On the left rein, go large.",
        es:"A mano izquierda, a la pista.",
        it:"A mano sinistra, in pista.",
        de:"Auf der linken Hand, ganze Bahn.",
        ja:"左手前 で 蹄跡 に 入っ て ください。" },

      { ref:"d-r-file-indienne", temps:2, dit:"club", mots:["file-indienne","distance"],
        fr:"Gardez vos distances, en file indienne.",
        en:"Keep your distance, single file.",
        es:"Guarden las distancias, en fila india.",
        it:"Mantenete le distanze, in fila indiana.",
        de:"Abstand halten, hintereinander.",
        ja:"一列 に なっ て、 距離 を 保っ て ください。" },

      { ref:"d-r-talons-regard", temps:2, dit:"club", mots:["talons-bas","regardez"],
        fr:"Talons bas, regardez devant vous.",
        en:"Heels down, look up.",
        es:"Talones abajo, mirad al frente.",
        it:"Talloni bassi, guardate avanti.",
        de:"Absätze tief, Blick geradeaus.",
        ja:"かかと を 下げ て、 前 を 見 て。" },

      /* Phrase de Blandine : la position, qui manquait entièrement. */
      { ref:"d-r-dos-grandir", temps:2, dit:"club", mots:["dos-droit"],
        fr:"On tient son dos, on se grandit vers le haut.",
        en:"Sit tall and keep your upper body steady.",
        es:"Sujetad la espalda, creced hacia arriba.",
        it:"Tenete la schiena, cresciamo verso l'alto.",
        de:"Rücken halten, groß machen.",
        ja:"背中 を 支え て、 上 に 伸び て ください。" },

      /* Phrase de Blandine. */
      { ref:"d-r-mains-basses", temps:2, dit:"club", mots:[],
        fr:"Gardez les mains basses et fixes.",
        en:"Keep your hands low and still.",
        es:"Mantened las manos bajas y quietas.",
        it:"Tenete le mani basse e ferme.",
        de:"Hände tief und ruhig halten.",
        ja:"手 は 低く、 動かさ ない で。" },

      /* ---- temps 3 · je ne comprends pas ---- */
      /* Formulation de Blandine, en UNE phrase : dans une reprise on
         n'attend pas qu'on nous demande quoi, on retarde le groupe. */
      { ref:"d-pas-compris", temps:3, dit:"joueuse", mots:[],
        fr:"Excusez-moi, je n'ai pas compris. Pourriez-vous répéter plus lentement ?",
        en:"Sorry, I didn't catch that — could you say it again more slowly?",
        es:"Perdone, no he entendido. ¿Podría repetirlo más despacio?",
        it:"Scusi, non ho capito. Potrebbe ripetere più lentamente?",
        de:"Entschuldigung, das habe ich nicht verstanden. Könnten Sie es langsamer wiederholen?",
        ja:"すみません、 わかり ませ ん でし た。 もう少し ゆっくり 言っ て いただけ ます か ?" },

      { ref:"d-r-raccourcir-renes", temps:3, dit:"club", mots:["raccourcir-renes"],
        fr:"Raccourcissez vos rênes.",
        en:"Shorten your reins.",
        es:"Acortad las riendas.",
        it:"Accorciate le redini.",
        de:"Zügel kürzer nehmen.",
        ja:"手綱 を 短く 持っ て ください。" },

      /* ---- temps 4 · le travail ---- */
      { ref:"d-r-trot-enleve", temps:4, dit:"club", mots:["au-trot","trot-enleve"],
        fr:"Au trot ! Trot enlevé.",
        en:"Trot on! Rising trot.",
        varEn:"Trot on! Posting trot.",
        es:"¡ Al trote ! Trote levantado.",
        it:"Al trotto ! Trotto battuto.",
        de:"Antraben! Leichttraben.",
        ja:"速歩 !  軽速歩 で。" },

      { ref:"d-r-changer-diagonale", temps:4, dit:"club", mots:["changer-main","diagonale"],
        fr:"Changez de main par la diagonale.",
        en:"Change the rein across the diagonal.",
        es:"Cambiad de mano por la diagonal.",
        it:"Cambiate mano per la diagonale.",
        de:"Handwechsel durch die ganze Bahn.",
        ja:"斜線 で 手前 を 変え て ください。" },

      /* 🟥 Phrase de Blandine : la volte est SITUÉE À UNE LETTRE, et
         « marcher large » est le vrai mot de reprise. Les lettres du
         manège ne sont pas au lexique — elles s'apprennent ici. */
      { ref:"d-r-volte-en-a", temps:4, dit:"club", mots:["volte","piste"],
        fr:"Faites une volte en A, puis vous remarchez large.",
        en:"Ten-metre circle at A, then go large again.",
        es:"Una vuelta pequeña en A, y luego seguid por la pista.",
        it:"Una volta ad A, poi riprendete la pista.",
        de:"Volte bei A, danach wieder ganze Bahn.",
        ja:"A で 輪乗り を し て、 それ から また 蹄跡 に 戻り ます。" },

      /* 🟥 Phrase de Blandine : nomme LES AIDES. */
      { ref:"d-r-preparer-aides", temps:4, dit:"club", mots:["preparez","au-galop"],
        fr:"Commencez à préparer vos aides pour le départ au galop.",
        en:"Start preparing your aids for the canter transition.",
        es:"Empezad a preparar las ayudas para la partida al galope.",
        it:"Cominciate a preparare gli aiuti per la partenza al galoppo.",
        de:"Bereitet eure Hilfen für das Angaloppieren vor.",
        ja:"駆歩 発進 の 扶助 の 準備 を 始め て ください。" },

      /* Phrase de Blandine : les coudes, qui accompagnent. */
      { ref:"d-r-coudes-galop", temps:4, dit:"club", mots:["au-galop"],
        fr:"On plie et on déplie les coudes pour accompagner au galop.",
        en:"Let your elbows bend and straighten with the canter.",
        es:"Abrid y cerrad los codos para acompañar el galope.",
        it:"Aprite e chiudete i gomiti per accompagnare il galoppo.",
        de:"Ellbogen öffnen und schließen, um dem Galopp zu folgen.",
        ja:"肘 を 開い たり 閉じ たり し て、 駆歩 に ついて いき ます。" },

      /* ---- temps 5 · je dis ce que je peux faire ---- */
      { ref:"d-pas-galoper-aujourdhui", temps:5, dit:"joueuse", mots:["au-galop"],
        fr:"Je préfère ne pas galoper aujourd'hui.",
        en:"I'd rather not canter today.",
        es:"Hoy prefiero no galopar.",
        it:"Oggi preferisco non galoppare.",
        de:"Heute möchte ich lieber nicht galoppieren.",
        ja:"今日 は 駆歩 は やめ て おき たい です。" },

      /* 🟥 Phrase de Blandine : ce qu'on dit quand on est dépassée. */
      { ref:"d-ralentir-repasser-pas", temps:5, dit:"joueuse", mots:["au-pas","doucement"],
        fr:"Est-ce que je peux ralentir ou repasser au pas ?",
        en:"Can I slow down, or come back to walk?",
        es:"¿Puedo ir más despacio o volver al paso?",
        it:"Posso rallentare o tornare al passo?",
        de:"Kann ich langsamer machen oder zurück in den Schritt?",
        ja:"ゆっくり に する か、 常歩 に 戻し て も いい です か ?" },

      { ref:"d-r-doucement-au-pas", temps:5, dit:"club", mots:["doucement","au-pas"],
        fr:"Doucement, revenez au pas.",
        en:"Easy — back to walk.",
        es:"Despacio, volved al paso.",
        it:"Piano, tornate al passo.",
        de:"Ruhig, zurück in den Schritt.",
        ja:"ゆっくり、 常歩 に 戻り ます。" },

      /* ---- temps 6 · la fin de la reprise ---- */
      /* 🟥 Phrase de Blandine : le « on » collectif, le moniteur parle
         à la reprise entière. Et le cheval S'ÉTIRE en anglais. */
      { ref:"d-r-renes-longues-recup", temps:6, dit:"club", mots:["renes-longues","recuperation"],
        fr:"On passe rênes longues, on les laisse récupérer.",
        en:"Long reins now — let them stretch and get their breath back.",
        es:"Riendas largas, dejadlos recuperar.",
        it:"Redini lunghe, lasciateli recuperare.",
        de:"Am langen Zügel, lasst sie sich erholen.",
        ja:"手綱 を 長く し て、 馬 を 休ま せ ます。" },

      /* Formulation de Blandine. Dite par la JOUEUSE : elle est montée
         en demandant qu'on lui tienne le cheval, elle redescend en
         demandant si c'est le moment — la scène se boucle. */
      { ref:"d-pied-a-terre", temps:6, dit:"joueuse", mots:["descendre"],
        fr:"On met pied à terre ?",
        en:"Shall I get off here?",
        es:"¿Echamos pie a tierra?",
        it:"Smontiamo?",
        de:"Sollen wir absitzen?",
        ja:"ここ で 下馬 し ます か ?" }
    ]
  }
};
