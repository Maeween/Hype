/* hype-lingo-lex-andalou.js — Hype Linguae · Jerez · « L'art équestre »
   ==================================================================
   11 CONCEPTS, UNE LEÇON. Ville : JEREZ.

   🟥 POURQUOI CE FICHIER EXISTE — 17 août 2026, session 214.
   Jerez utilisait la LEÇON 4 de `cheval` — le hongre, l'étalon, la
   jument, le poulain, l'âge, le caractère, la race, le sang chaud. Ce
   vocabulaire du SEXE, DE L'ÂGE ET DU TYPE ne disait rien de Jerez, et
   il disait tout du jeune cheval. Constat de Blandine : *« si on prend
   des mots de Jerez pour mettre dans Fontainebleau, ça libérerait Jerez
   pour autre chose »*. La leçon 4 est donc partie à FONTAINEBLEAU, et
   Jerez a reçu ce chapitre-ci.

   🟥 JEREZ, C'EST LA REAL ESCUELA ANDALUZA DEL ARTE ECUESTRE, et son
   spectacle *Cómo bailan los caballos andaluces* — « comment dansent
   les chevaux andalous » : un ballet équestre, avec musique espagnole,
   costumes du XVIIIe siècle et chorégraphies tirées du dressage
   classique, de la doma vaquera et du travail en main.

   ⚠️ NE PAS CONFONDRE JEREZ ET SÉVILLE, les deux villes espagnoles :
   · **SÉVILLE** (`parade`) = la Feria, la parade, le costume, l'amazone,
     les attelages. On se montre, personne ne juge.
   · **JEREZ** (ici) = la formation ARTISTIQUE du cheval, la haute
     école, les figures, la précision, le spectacle. On travaille des
     années pour quelques minutes.
   NE PAS mélanger leurs vocabulaires.

   🟥 LE PIÈGE DU CHAPITRE : **HIGH SCHOOL**.
   *High-school movements* ne veut pas dire « mouvements de lycée » : en
   équitation, **high school** est le calque du français HAUTE ÉCOLE.
   L'anglais garde d'ailleurs souvent le français tel quel — *haute
   école* — comme il garde *passage*, *piaffe* et *pirouette*.
   ⚠️ Aux États-Unis, où *high school* ne veut dire QUE lycée, on préfère
   *the airs above the ground* pour les airs relevés.

   ⚠️ CINQ MOTS DE CE CHAPITRE VIVENT AILLEURS et s'emploient en
   `motsAilleurs` : `piaffer`, `passage`, `pirouette`,
   `changement-pied` sont chez WINDSOR (dressage leçon 2) ;
   `travail-pied` est chez SANTA YNEZ. C'est voulu : le dressage
   classique et le horsemanship se rejoignent sur le travail à pied, et
   le montrer vaut mieux que de dupliquer les entrées.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. L'espagnol de ce chapitre est celui
   d'une institution précise ; l'allemand et le japonais du vocabulaire
   de haute école sont techniques. Les entrées marquées // ?? sont
   celles dont je suis le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.andalou = {
  ref: "andalou",
  chapitre: 27,
  titre: { fr:"L'art équestre", en:"Equestrian art", es:"El arte ecuestre",
           it:"L'arte equestre", de:"Die Reitkunst", ja:"馬術の芸術" },
  lecons: 1,

  concepts: [

  { ref:"art-equestre", lecon:1, coll:"art",
    mots:{ fr:{m:"l'art équestre"}, en:{m:"equestrian art", p:"i-kwès-tri-eune arte"},
           es:{m:"el arte ecuestre"}, it:{m:"l'arte equestre"},
           de:{m:"die Reitkunst", p:"raït-kounnst"}, ja:{m:"馬術の芸術", p:"bajutsu no geijutsu"} },
    def:{ fr:"🟥 CE QUI SÉPARE L'ART DU SPORT : le sport se mesure, l'art se regarde. Ici personne ne compte les points — on juge si c'était beau, et « beau » veut dire que le cheval avait l'air d'avoir choisi. ⚠️ L'allemand dit **Reitkunst**, « l'art de monter », qui met le cavalier au centre ; le français dit « art équestre », qui met le cheval.",
          en:"What separates art from sport: sport is measured, art is watched. Nobody counts faults here — you judge whether it was beautiful, and beautiful means the horse looked as though he had chosen. German says Reitkunst, the art of riding, putting the rider at the centre; French says equestrian art, putting the horse there.",
          es:"Lo que separa el arte del deporte: el deporte se mide, el arte se mira. Aquí nadie cuenta los puntos: se juzga si fue bello, y bello quiere decir que el caballo parecía haber elegido.",
          it:"Ciò che separa l'arte dallo sport: lo sport si misura, l'arte si guarda. Qui nessuno conta i punti: si giudica se era bello, e bello vuol dire che il cavallo sembrava aver scelto.",
          de:"Was Kunst vom Sport trennt: Sport wird gemessen, Kunst wird angeschaut. Hier zählt niemand Fehler — man beurteilt, ob es schön war, und schön heißt, dass das Pferd aussah, als hätte es gewählt.",
          ja:"芸術と競技を分けるもの。競技は測られ、芸術は見られます。ここでは誰も減点を数えません。美しかったかどうかが問われ、「美しい」とは、馬が自ら選んだように見えるということです。" } },

  { ref:"haute-ecole", lecon:1, coll:"art",
    mots:{ fr:{m:"la haute école"}, en:{m:"high school", p:"haï skoul", var:"haute école"},
           es:{m:"la alta escuela"}, it:{m:"l'alta scuola"},
           de:{m:"die Hohe Schule", p:"hô-e chou-le"}, ja:{m:"高等馬術", p:"kōtō bajutsu"} },
    def:{ fr:"🟥🟥 LE PIÈGE DU CHAPITRE. **HIGH-SCHOOL MOVEMENTS** ne veut pas dire « mouvements de lycée » : en équitation, *high school* est le calque exact du français HAUTE ÉCOLE. ⚠️ L'anglais garde d'ailleurs souvent le français tel quel — *haute école* — comme il garde *passage*, *piaffe* et *pirouette*. Aux États-Unis, où *high school* ne signifie QUE lycée, on préfère **the airs above the ground** pour les airs relevés. 🟥 La haute école commence là où le dressage de concours s'arrête : le piaffer, le passage, les airs relevés — courbette, croupade, cabriole.",
          en:"The trap of this chapter. « High-school movements » has nothing to do with schools: in riding, « high school » is a straight calque of the French haute école — which English also keeps as it is, like passage, piaffe and pirouette. In America, where « high school » only means school, people say « the airs above the ground ».",
          es:"« Alta escuela » empieza donde el dressage de concurso se detiene: el piafé, el pasaje, los aires elevados — corveta, grupada, cabriola.",
          it:"L'« alta scuola » comincia dove il dressage da concorso si ferma: il piaffe, il passage, le arie alte — corvetta, groppata, capriola.",
          de:"Die Hohe Schule beginnt dort, wo die Turnierdressur aufhört: Piaffe, Passage, die Schulen über der Erde — Kurbette, Kruppade, Kapriole.",
          ja:"この章の落とし穴。英語の high-school movements は「高校の動き」ではありません。馬術の high school はフランス語 haute école の直訳です。英語では haute école のまま使うことも多く、passage、piaffe、pirouette も同様です。アメリカでは high school が学校しか意味しないため、the airs above the ground と言います。" } },

  { ref:"dressage-classique", lecon:1, coll:"art",
    mots:{ fr:{m:"le dressage classique"}, en:{m:"classical dressage", p:"kla-si-keul"},
           es:{m:"la doma clásica"}, it:{m:"il dressage classico"},
           de:{m:"die klassische Dressur", p:"kla-si-che drè-sour"}, ja:{m:"古典馬術", p:"koten bajutsu"} },
    def:{ fr:"⚠️ **CLASSIQUE** NE VEUT PAS DIRE ANCIEN : il désigne une lignée d'enseignement ininterrompue depuis la Renaissance, de Pluvinel à La Guérinière, transmise par quatre écoles — Vienne, Saumur, Jerez, Lisbonne. 🟥 L'espagnol dit **la doma clásica** pour le dressage tout court, y compris de concours : c'est le mot ordinaire, pas un mot d'art. Un faux ami discret.",
          en:"« Classical » doesn't mean old: it names an unbroken line of teaching since the Renaissance, from Pluvinel to La Guérinière, carried by four schools — Vienna, Saumur, Jerez, Lisbon. Spanish says « doma clásica » for dressage in general, competition included: an everyday word, not an artistic one.",
          es:"« Clásico » no significa antiguo: designa una línea de enseñanza ininterrumpida desde el Renacimiento, transmitida por cuatro escuelas: Viena, Saumur, Jerez y Lisboa.",
          it:"« Classico » non vuol dire antico: indica una linea d'insegnamento ininterrotta dal Rinascimento, portata da quattro scuole: Vienna, Saumur, Jerez e Lisbona.",
          de:"« Klassisch » heißt nicht alt: es meint eine ununterbrochene Lehrlinie seit der Renaissance, getragen von vier Schulen — Wien, Saumur, Jerez, Lissabon.",
          ja:"「古典」は「古い」という意味ではありません。ルネサンス以来、プリュヴィネルからラ・ゲリニエールへと途切れず受け継がれてきた教えの系譜を指します。ウィーン、ソミュール、へレス、リスボンの四つの学校が伝えています。" } },

  { ref:"ecole-royale", lecon:1, coll:"art",
    mots:{ fr:{m:"l'école royale"}, en:{m:"the Royal School", p:"roï-eul skoul"},
           es:{m:"la Real Escuela"}, it:{m:"la Scuola Reale"},
           de:{m:"die Königliche Schule", p:"ko-nik-li-che"}, ja:{m:"王立学校", p:"ōritsu gakkō"} },
    def:{ fr:"🟥 LA REAL ESCUELA ANDALUZA DEL ARTE ECUESTRE, à Jerez de la Frontera. On y forme des chevaux et des cavaliers jusqu'au Grand Prix, on y travaille la haute école, le travail en main, la doma vaquera et l'attelage. ⚠️ C'est l'une des QUATRE grandes écoles classiques d'Europe, avec Vienne, Saumur et Lisbonne — quatre traditions vivantes, quatre façons de faire la même chose.",
          en:"The Real Escuela Andaluza del Arte Ecuestre, at Jerez de la Frontera. Horses and riders are trained here up to Grand Prix, in high school, work in hand, doma vaquera and driving. One of Europe's four great classical schools, with Vienna, Saumur and Lisbon.",
          es:"La Real Escuela Andaluza del Arte Ecuestre, en Jerez de la Frontera. Una de las cuatro grandes escuelas clásicas de Europa, con Viena, Saumur y Lisboa.",
          it:"La Real Escuela Andaluza del Arte Ecuestre, a Jerez de la Frontera. Una delle quattro grandi scuole classiche d'Europa, con Vienna, Saumur e Lisbona.",
          de:"Die Real Escuela Andaluza del Arte Ecuestre in Jerez de la Frontera. Eine der vier großen klassischen Schulen Europas, mit Wien, Saumur und Lissabon.",
          ja:"へレス・デ・ラ・フロンテーラにある王立アンダルシア馬術学校。グランプリ水準まで人馬を育て、高等馬術、手綱による地上作業、ドマ・バケーラ、馬車を扱います。ウィーン、ソミュール、リスボンと並ぶヨーロッパ四大古典学校のひとつです。" } },

  { ref:"aides", lecon:1, coll:"art",
    mots:{ fr:{m:"les aides"}, en:{m:"the aids", p:"éïdz"},
           es:{m:"las ayudas"}, it:{m:"gli aiuti"},
           de:{m:"die Hilfen", p:"hil-feune"}, ja:{m:"扶助", p:"fujo"} },
    def:{ fr:"🟥 LE MOT DIT TOUT DE L'ÉQUITATION CLASSIQUE : on n'ORDONNE pas, on AIDE. Les aides sont les mains, les jambes, l'assiette et la voix. ⚠️ Toutes les langues gardent cette idée d'aide — *aids*, *ayudas*, *aiuti*, *Hilfen*, 扶助. C'est l'un des rares mots où six langues sont d'accord sur la métaphore. 🟥 Le but de toute la haute école est qu'elles deviennent invisibles : un spectateur qui voit le cavalier agir voit un défaut.",
          en:"The word says everything about classical riding: you don't command, you help. The aids are hands, legs, seat and voice. Every language keeps the idea of helping — one of the rare words where six agree on the metaphor. The whole point of high school is that they become invisible: a spectator who sees the rider act is seeing a fault.",
          es:"La palabra lo dice todo: no se ordena, se ayuda. El objetivo de la alta escuela es que las ayudas se vuelvan invisibles.",
          it:"La parola dice tutto: non si comanda, si aiuta. Lo scopo dell'alta scuola è che gli aiuti diventino invisibili.",
          de:"Das Wort sagt alles: man befiehlt nicht, man hilft. Ziel der Hohen Schule ist, dass die Hilfen unsichtbar werden.",
          ja:"この語が古典馬術のすべてを語ります。命じるのではなく、助けるのです。扶助とは手、脚、座り、そして声のこと。六つの言語すべてがこの「助ける」という比喩を保っている、珍しい語です。高等馬術の目的は、扶助が見えなくなること。観客に騎手の動作が見えたなら、それは欠点です。" } },

  { ref:"harmonie", lecon:1, coll:"art",
    mots:{ fr:{m:"l'harmonie"}, en:{m:"harmony", p:"har-me-ni"},
           es:{m:"la armonía"}, it:{m:"l'armonia"},
           de:{m:"die Harmonie", p:"har-mô-nii"}, ja:{m:"調和", p:"chōwa"} },
    def:{ fr:"🟥 CE QU'ON CHERCHE, ET CE QUI NE SE MESURE PAS. Un mouvement difficile exécuté dans la contrainte vaut moins qu'un mouvement simple donné librement. ⚠️ C'est le seul critère de tout le module qui ne se compte pas : pas de points, pas de chrono, pas de barème. On le reconnaît quand on le voit — et c'est précisément ce que le chapitre enseigne à regarder.",
          en:"What you're after, and what can't be measured. A difficult movement done under constraint is worth less than a simple one freely given. It's the only criterion in the whole module that isn't counted: no points, no clock, no scoring. You know it when you see it.",
          es:"Lo que se busca, y lo que no se mide. Un movimiento difícil ejecutado bajo coacción vale menos que uno simple dado libremente.",
          it:"Ciò che si cerca, e ciò che non si misura. Un movimento difficile eseguito nella costrizione vale meno di uno semplice dato liberamente.",
          de:"Was man sucht, und was sich nicht messen lässt. Eine schwere Lektion unter Zwang ist weniger wert als eine einfache, frei gegebene.",
          ja:"求めるものであり、測れないもの。強いられて行う難しい動きは、自ら差し出された簡単な動きに及びません。このアプリ全体で唯一、点数も時計も採点表もない基準です。見れば分かる、それを見る目を養うのがこの章です。" } },

  { ref:"choregraphie", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"la chorégraphie"}, en:{m:"the choreography", p:"ko-ri-o-gra-fi"},
           es:{m:"la coreografía"}, it:{m:"la coreografia"},
           de:{m:"die Choreografie", p:"ko-ré-o-gra-fii"}, ja:{m:"振付", p:"furitsuke"} },
    def:{ fr:"⚠️ LE MOT VIENT DE LA DANSE, et c'est voulu : le spectacle de Jerez s'appelle *Cómo bailan los caballos andaluces* — « comment dansent les chevaux andalous ». 🟥 Une chorégraphie équestre mêle le dressage classique, la doma vaquera et le travail en main, sur de la musique espagnole, en costumes du XVIIIe siècle. Ce n'est ni une reprise de concours ni un numéro de cirque : c'est un ballet où les danseurs pèsent cinq cents kilos.",
          en:"The word comes from dance, and deliberately: the Jerez show is called « Cómo bailan los caballos andaluces » — how the Andalusian horses dance. An equestrian choreography mixes classical dressage, doma vaquera and work in hand, to Spanish music, in eighteenth-century costume.",
          es:"La palabra viene de la danza, y a propósito: el espectáculo se llama « Cómo bailan los caballos andaluces ». No es ni una reprise de concurso ni un número de circo.",
          it:"La parola viene dalla danza, e volutamente: lo spettacolo si chiama « Cómo bailan los caballos andaluces ». Non è né una ripresa da concorso né un numero da circo.",
          de:"Das Wort kommt vom Tanz, und das mit Absicht: die Show heißt « Cómo bailan los caballos andaluces » — wie die andalusischen Pferde tanzen.",
          ja:"この語は舞踊から来ており、それは意図的です。へレスの公演の名は「Cómo bailan los caballos andaluces（アンダルシアの馬はいかに踊るか）」。古典馬術、ドマ・バケーラ、手綱作業をスペイン音楽と十八世紀の衣装で織り上げます。競技の演技でもサーカスの出し物でもない、五百キロの踊り手によるバレエです。" } },

  { ref:"spectacle", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"le spectacle équestre"}, en:{m:"the equestrian show", p:"chô", var:"the performance"},
           es:{m:"el espectáculo ecuestre"}, it:{m:"lo spettacolo equestre"},
           de:{m:"die Pferdeshow", p:"pfèr-de-chô", var:"die Vorführung"},
           ja:{m:"馬術ショー", p:"bajutsu shō"} },
    def:{ fr:"⚠️ **SHOW** OU **PERFORMANCE** ? Le premier dit l'événement, le second la représentation elle-même — *the show is at noon*, mais *the performance lasted an hour*. 🟥 Et ce qui distingue le spectacle du concours : il n'y a rien à gagner. Des années de travail pour quelques minutes, et le seul jugement est celui d'une salle qui se tait ou qui applaudit.",
          en:"« Show » or « performance »? The first names the event, the second the thing performed — the show is at noon, but the performance lasted an hour. And what sets a show apart from a competition: there's nothing to win. Years of work for a few minutes.",
          es:"Lo que distingue el espectáculo del concurso: no hay nada que ganar. Años de trabajo para unos minutos.",
          it:"Ciò che distingue lo spettacolo dalla gara: non c'è niente da vincere. Anni di lavoro per pochi minuti.",
          de:"Was die Vorführung vom Wettkampf trennt: es gibt nichts zu gewinnen. Jahre Arbeit für wenige Minuten.",
          ja:"英語の show は催しそのもの、performance は上演を指します。競技と違うのは、勝ち取るものが何もないこと。数分のために何年も働き、判定を下すのは、静まるか拍手するかの客席だけです。" } },

  { ref:"tenue-traditionnelle", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"la tenue traditionnelle"}, en:{m:"traditional riding dress", p:"tra-di-cheu-neul"},
           es:{m:"el traje tradicional"}, it:{m:"l'abito tradizionale"},
           de:{m:"die traditionelle Reitkleidung", p:"tra-di-tsio-nè-le"}, ja:{m:"伝統衣装", p:"dentō ishō"} },
    def:{ fr:"⚠️ À JEREZ ELLE EST DU XVIIIe SIÈCLE, pas du folklore : habit à basques, chapeau à plumes, bottes à revers — la tenue des écuyers de cour. 🟥 À SÉVILLE, à quatre-vingt-dix kilomètres, la tenue traditionnelle est tout autre : le traje corto, court, né du travail au champ. Deux villes espagnoles, deux costumes, deux mondes. NE PAS les confondre.",
          en:"At Jerez it's eighteenth-century, not folklore: a skirted coat, plumed hat, turned-down boots — the dress of court riding masters. At Seville, ninety kilometres away, traditional dress is something else entirely: the traje corto, short, born of work in the fields.",
          es:"En Jerez es del siglo XVIII, no folclore: casaca, sombrero con plumas, botas de vuelta. En Sevilla, el traje tradicional es otro: el traje corto, nacido del trabajo en el campo.",
          it:"A Jerez è del Settecento, non folclore. A Siviglia, l'abito tradizionale è tutt'altro: il traje corto, nato dal lavoro nei campi.",
          de:"In Jerez ist sie aus dem 18. Jahrhundert, keine Folklore. In Sevilla ist die Tracht etwas ganz anderes: der kurze Traje corto, aus der Feldarbeit entstanden.",
          ja:"へレスの装いは十八世紀のもので、民俗衣装ではありません。裾のある上着、羽根飾りの帽子、折り返しブーツ — 宮廷馬術師の服装です。九十キロ離れたセビリアの伝統衣装はまったく別物で、野良仕事から生まれた短い traje corto です。" } },

  { ref:"numero", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"le numéro", var:"la reprise"}, en:{m:"the routine", p:"rou-tine", var:"the performance"},
           es:{m:"el número"}, it:{m:"il numero"},
           de:{m:"die Nummer", p:"nou-meur"}, ja:{m:"演目", p:"enmoku"} },
    def:{ fr:"⚠️ **ROUTINE** EST UN FAUX AMI : en anglais ce n'est pas de la routine ennuyeuse mais un enchaînement réglé, comme en patinage ou en gymnastique. 🟥 Et « reprise » en français a déjà trois sens dans cette app — le protocole à Windsor, l'épreuve à Badminton, le groupe d'élèves à Aberystwyth. Ici c'est un quatrième : le numéro d'un spectacle. Quatre sens, un mot.",
          en:"« Routine » is a false friend: it isn't dull repetition but a set sequence, as in skating or gymnastics. And the French « reprise » already has three senses in this app — the test at Windsor, the phase at Badminton, the class of pupils at Aberystwyth. Here it takes a fourth.",
          es:"« Routine » es un falso amigo en inglés: no es rutina aburrida sino una secuencia establecida, como en patinaje.",
          it:"« Routine » è un falso amico in inglese: non è routine noiosa ma una sequenza stabilita, come nel pattinaggio.",
          de:"« Routine » ist im Englischen ein falscher Freund: keine langweilige Gewohnheit, sondern eine festgelegte Abfolge wie im Eiskunstlauf.",
          ja:"英語の routine は偽の友です。退屈な日課ではなく、フィギュアスケートや体操と同じ「決められた演技構成」を指します。フランス語の reprise はこのアプリですでに三つの意味を持ち、ここで四つ目になります。" } },

  { ref:"doma-vaquera", lecon:1, coll:"art",
    mots:{ fr:{m:"la doma vaquera"}, en:{m:"doma vaquera", p:"dô-ma va-ké-ra"},
           es:{m:"la doma vaquera"}, it:{m:"la doma vaquera"},
           de:{m:"die Doma vaquera"}, ja:{m:"ドマ・バケーラ", p:"doma bakēra"} },
    def:{ fr:"🟥 LE MOT RESTE EN ESPAGNOL PARTOUT. C'est le dressage né du travail du bétail : une main sur les rênes, l'autre libre pour la garrocha, la longue perche. Arrêts brusques, demi-tours sur les hanches, tout ce qu'exige un cheval qui trie des taureaux. ⚠️ NE PAS le traduire par « western » : le western américain en descend, par le Mexique, mais ce n'est pas la même chose — la doma vaquera se monte en selle espagnole, dans une main, en tenue de campo.",
          en:"The words stay Spanish everywhere. It's the dressage born of cattle work: one hand on the reins, the other free for the garrocha, the long pole. Sudden halts, turns on the haunches — everything a horse sorting bulls must do. Don't translate it as « western »: American western descends from it, by way of Mexico, but it isn't the same thing.",
          es:"La doma nacida del trabajo con el ganado: una mano en las riendas, la otra libre para la garrocha. No es lo mismo que el western, aunque este descienda de ella.",
          it:"Il dressage nato dal lavoro col bestiame: una mano sulle redini, l'altra libera per la garrocha. Non è il western, benché questo ne discenda.",
          de:"Die Dressur, die aus der Rinderarbeit entstand: eine Hand am Zügel, die andere frei für die Garrocha. Nicht mit Western zu übersetzen, auch wenn dieser davon abstammt.",
          ja:"どの言語でもスペイン語のまま使います。牛追いの仕事から生まれた調教で、片手で手綱を持ち、もう一方はガロチャという長い棒のために空けておきます。急停止、後肢を軸にした旋回など、牛を仕分ける馬に必要な動きです。アメリカのウエスタンはメキシコを経てこれに由来しますが、同じものではありません。" } }

  ],

  phrases: [

    { ref:"ph-and-haute-ecole", lecon:1, mots:["haute-ecole"],
      fr:"Ce cheval est dressé aux mouvements de haute école.",
      en:"This horse is trained in high-school movements.",
      es:"Este caballo está enseñado en los aires de alta escuela.",
      it:"Questo cavallo è addestrato ai movimenti di alta scuola.",
      de:"Dieses Pferd ist in den Lektionen der Hohen Schule ausgebildet.",
      ja:"この 馬 は 高等 馬術 の 運動 を 仕込ま れ て い ます。" },

    { ref:"ph-and-aides", lecon:1, mots:["aides","harmonie"],
      fr:"Les aides doivent devenir invisibles.",
      en:"The aids should become invisible.",
      es:"Las ayudas deben volverse invisibles.",
      it:"Gli aiuti devono diventare invisibili.",
      de:"Die Hilfen sollen unsichtbar werden.",
      ja:"扶助 は 見え なく なる べき です。" },

    { ref:"ph-and-harmonie", lecon:1, mots:["harmonie","art-equestre"],
      fr:"Le but n'est pas la difficulté, mais l'harmonie.",
      en:"The goal isn't difficulty, but harmony.",
      es:"El objetivo no es la dificultad, sino la armonía.",
      it:"Lo scopo non è la difficoltà, ma l'armonia.",
      de:"Das Ziel ist nicht die Schwierigkeit, sondern die Harmonie.",
      ja:"目的 は 難し さ で は なく、 調和 です。" },

    { ref:"ph-and-dansent", lecon:1, mots:["choregraphie","spectacle"],
      fr:"On dirait que les chevaux dansent.",
      en:"It looks as though the horses are dancing.",
      es:"Parece que los caballos bailan.",
      it:"Sembra che i cavalli danzino.",
      de:"Es sieht aus, als würden die Pferde tanzen.",
      ja:"馬 が 踊っ て いる よう に 見え ます。" }

  ],

  /* ==================================================================
     LE DIALOGUE DE JEREZ — 17 août 2026, session 214.

     LA SCÈNE : une matinée à la Real Escuela, de l'entraînement au
     spectacle. 18 phrases, 6 temps.

     🟥 LES DIX-HUIT PHRASES SONT DE BLANDINE, avec leur traduction
     anglaise et le lexique du chapitre.

     🟥 SA STRUCTURE, qui organise les temps :
     **ÉCURIES → ENTRAÎNEMENT → TRAVAIL EN MAIN → PIAFFER / PASSAGE →
     COSTUME → SPECTACLE FINAL**

     ⚠️ NE PAS CONFONDRE JEREZ ET SÉVILLE, à quatre-vingt-dix kilomètres
     l'une de l'autre :
     · SÉVILLE (`parade`) = la Feria, la parade, l'amazone, l'attelage.
       On se montre, personne ne juge, le costume vient du travail au
       champ (traje corto).
     · JEREZ (ici) = la formation ARTISTIQUE, la haute école, la
       précision, le spectacle. Des années pour quelques minutes, et le
       costume est du XVIIIe siècle, celui des écuyers de cour.
     NE PAS mélanger leurs vocabulaires.

     🟥 LE PIÈGE : **HIGH SCHOOL** ne veut pas dire lycée en équitation.
     C'est le calque du français HAUTE ÉCOLE, et l'anglais garde souvent
     le français tel quel. Voir la `def` de `haute-ecole`.

     ⚠️ CINQ MOTS VIENNENT D'AILLEURS et sont en `motsAilleurs` :
     `piaffer`, `passage`, `pirouette`, `changement-pied` de WINDSOR
     (dressage leçon 2), `travail-pied` de SANTA YNEZ. C'est voulu : le
     dressage classique et le horsemanship se rejoignent sur le travail
     à pied, et le montrer vaut mieux que dupliquer.

     ⚠️ ET LA PHRASE 16 EST LA VRAIE QUESTION DU CHAPITRE : « combien
     d'années faut-il pour former un cheval à ce niveau ? » Aucune autre
     ville ne pose la question du TEMPS LONG. Partout ailleurs on
     prépare une épreuve ; ici on prépare une vie.

     `dit` : "joueuse" = elle produit · "club" = un écuyer, un guide.
  ================================================================== */
  dialogue: {
    ville: "jerez", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive à l'école ---- */
      { ref:"dj-heure-entrainement", temps:1, dit:"joueuse", mots:["ecole-royale"],
        fr:"À quelle heure commence l'entraînement des chevaux ?",
        en:"What time does the horses' training start?",
        es:"¿A qué hora empieza el entrenamiento de los caballos?",
        it:"A che ora comincia l'allenamento dei cavalli?",
        de:"Wann beginnt das Training der Pferde?",
        ja:"馬 たち の 稽古 は 何 時 に 始まり ます か ?" },

      { ref:"dj-tribunes", temps:1, dit:"joueuse", mots:["ecole-royale","spectacle"],
        fr:"Puis-je regarder la séance depuis les tribunes ?",
        en:"May I watch the training session from the stands?",
        es:"¿Puedo ver la sesión desde las gradas?",
        it:"Posso guardare la seduta dalle tribune?",
        de:"Darf ich die Einheit von der Tribüne aus ansehen?",
        ja:"観覧 席 から 稽古 を 見 て も よい です か ?" },

      { ref:"dj-encore-formation", temps:1, dit:"club", mots:["haute-ecole","dressage-classique"],
        fr:"Ce cheval est encore en formation.",
        en:"This horse is still in training.",
        es:"Este caballo todavía está en formación.",
        it:"Questo cavallo è ancora in formazione.",
        de:"Dieses Pferd ist noch in Ausbildung.",
        ja:"この 馬 は まだ 育成 中 です。" },

      /* ---- temps 2 · les mouvements ---- */
      { ref:"dj-apprend-haute-ecole", temps:2, dit:"club", mots:["haute-ecole"],
        fr:"Il apprend progressivement les mouvements de haute école.",
        en:"He is gradually learning the high-school movements.",
        es:"Está aprendiendo poco a poco los aires de alta escuela.",
        it:"Sta imparando poco a poco i movimenti di alta scuola.",
        de:"Er lernt nach und nach die Lektionen der Hohen Schule.",
        ja:"少しずつ 高等 馬術 の 運動 を 覚え て い ます。" },

      { ref:"dj-demande-passage", temps:2, dit:"club", mots:["aides"], motsAilleurs:["passage"],
        fr:"Le cavalier demande le passage.",
        en:"The rider is asking for passage.",
        es:"El jinete pide el pasaje.",
        it:"Il cavaliere chiede il passage.",
        de:"Der Reiter fragt nach Passage.",
        ja:"騎手 が パッサージュ を 求め て い ます。" },

      { ref:"dj-piaffer", temps:2, dit:"club", mots:["haute-ecole"], motsAilleurs:["piaffer"],
        fr:"Le cheval effectue maintenant un piaffer.",
        en:"The horse is performing piaffe now.",
        es:"El caballo ejecuta ahora un piafé.",
        it:"Il cavallo esegue adesso un piaffe.",
        de:"Das Pferd zeigt jetzt eine Piaffe.",
        ja:"今、 馬 が ピアッフェ を 行っ て い ます。" },

      { ref:"dj-pirouette-equilibre", temps:2, dit:"club", mots:["haute-ecole"], motsAilleurs:["pirouette"],
        fr:"Cette pirouette demande beaucoup d'équilibre.",
        en:"This pirouette requires a lot of balance.",
        es:"Esta pirueta exige mucho equilibrio.",
        it:"Questa piroetta richiede molto equilibrio.",
        de:"Diese Pirouette verlangt viel Gleichgewicht.",
        ja:"この ピルーエット に は、 高い バランス が 必要 です。" },

      { ref:"dj-changements-reguliers", temps:2, dit:"club", mots:["dressage-classique"], motsAilleurs:["changement-pied"],
        fr:"Regarde comme les changements de pied sont réguliers.",
        en:"Look how regular the flying changes are.",
        es:"Mira qué regulares son los cambios de pie.",
        it:"Guarda come sono regolari i cambi di piede.",
        de:"Schau, wie gleichmäßig die fliegenden Wechsel sind.",
        ja:"フライング チェンジ が どれ ほど 規則 正しい か、 見 て ください。" },

      /* ---- temps 3 · le travail en main et les aides ---- */
      { ref:"dj-travail-a-pied", temps:3, dit:"club", mots:["dressage-classique"], motsAilleurs:["travail-pied"],
        fr:"Certains exercices sont également travaillés à pied.",
        en:"Some exercises are also worked from the ground.",
        es:"Algunos ejercicios también se trabajan desde el suelo.",
        it:"Alcuni esercizi si lavorano anche da terra.",
        de:"Manche Lektionen werden auch vom Boden aus gearbeitet.",
        ja:"一部 の 運動 は、 地上 から も 稽古 し ます。" },

      { ref:"dj-aides-invisibles", temps:3, dit:"club", mots:["aides","harmonie"],
        fr:"Le cheval doit répondre à des aides presque invisibles.",
        en:"The horse should respond to almost invisible aids.",
        es:"El caballo debe responder a ayudas casi invisibles.",
        it:"Il cavallo deve rispondere ad aiuti quasi invisibili.",
        de:"Das Pferd soll auf fast unsichtbare Hilfen reagieren.",
        ja:"馬 は、 ほとんど 見え ない 扶助 に 応え なけれ ば なり ませ ん。" },

      /* ---- temps 4 · le costume ---- */
      { ref:"dj-tenue-spectacle", temps:4, dit:"club", mots:["tenue-traditionnelle","spectacle"],
        fr:"Le cavalier porte une tenue traditionnelle pour le spectacle.",
        en:"The rider is wearing traditional dress for the show.",
        es:"El jinete lleva traje tradicional para el espectáculo.",
        it:"Il cavaliere indossa l'abito tradizionale per lo spettacolo.",
        de:"Der Reiter trägt für die Vorführung traditionelle Kleidung.",
        ja:"騎手 は 公演 の ため に 伝統 衣装 を まとっ て い ます。" },

      { ref:"dj-prepares-representation", temps:4, dit:"club", mots:["spectacle","numero"],
        fr:"Les chevaux sont préparés spécialement pour la représentation.",
        en:"The horses are specially prepared for the performance.",
        es:"Los caballos se preparan especialmente para la representación.",
        it:"I cavalli sono preparati appositamente per la rappresentazione.",
        de:"Die Pferde werden eigens für die Vorführung vorbereitet.",
        ja:"馬 たち は 公演 の ため に 特別 に 仕上げ られ ます。" },

      /* ---- temps 5 · le spectacle ---- */
      { ref:"dj-entrent-musique", temps:5, dit:"club", mots:["spectacle","choregraphie"],
        fr:"Les chevaux entrent en piste au rythme de la musique.",
        en:"The horses enter the arena to the rhythm of the music.",
        es:"Los caballos entran en pista al ritmo de la música.",
        it:"I cavalli entrano in pista al ritmo della musica.",
        de:"Die Pferde ziehen im Takt der Musik in die Bahn ein.",
        ja:"馬 たち は 音楽 の リズム に 合わせ て 入場 し ます。" },

      { ref:"dj-synchronisee", temps:5, dit:"club", mots:["numero","choregraphie"],
        fr:"Toute la reprise doit rester parfaitement synchronisée.",
        en:"The whole performance needs to remain perfectly synchronised.",
        es:"Todo el número debe mantenerse perfectamente sincronizado.",
        it:"Tutto il numero deve restare perfettamente sincronizzato.",
        de:"Die ganze Vorführung muss völlig synchron bleiben.",
        ja:"演目 全体 が、 完全 に 揃っ て い なけれ ば なり ませ ん。" },

      { ref:"dj-melange-traditions", temps:5, dit:"club", mots:["choregraphie","dressage-classique","doma-vaquera"],
        fr:"Cette chorégraphie mélange dressage classique et tradition espagnole.",
        en:"This choreography combines classical dressage with Spanish tradition.",
        es:"Esta coreografía mezcla doma clásica y tradición española.",
        it:"Questa coreografia unisce dressage classico e tradizione spagnola.",
        de:"Diese Choreografie verbindet klassische Dressur mit spanischer Tradition.",
        ja:"この 振付 は、 古典 馬術 と スペイン の 伝統 を 織り合わせ て い ます。" },

      /* ---- temps 6 · le temps long, et l'harmonie ---- */
      /* 🟥 LA VRAIE QUESTION DU CHAPITRE : aucune autre ville ne pose
         celle du temps long. */
      { ref:"dj-combien-annees", temps:6, dit:"joueuse", mots:["haute-ecole","ecole-royale"],
        fr:"Combien d'années faut-il pour former un cheval à ce niveau ?",
        en:"How many years does it take to train a horse to this level?",
        es:"¿Cuántos años hacen falta para formar a un caballo a este nivel?",
        it:"Quanti anni servono per formare un cavallo a questo livello?",
        de:"Wie viele Jahre braucht es, ein Pferd auf dieses Niveau auszubilden?",
        ja:"この 水準 まで 馬 を 育てる に は、 何 年 かかり ます か ?" },

      { ref:"dj-harmonie-difficulte", temps:6, dit:"club", mots:["harmonie","art-equestre"],
        fr:"Le but n'est pas seulement la difficulté, mais aussi l'harmonie.",
        en:"The goal is not only difficulty, but also harmony.",
        es:"El objetivo no es solo la dificultad, sino también la armonía.",
        it:"Lo scopo non è solo la difficoltà, ma anche l'armonia.",
        de:"Das Ziel ist nicht nur die Schwierigkeit, sondern auch die Harmonie.",
        ja:"目的 は 難し さ だけ で は なく、 調和 に も あり ます。" },

      { ref:"dj-chevaux-dansent", temps:6, dit:"joueuse", mots:["spectacle","choregraphie","harmonie"],
        fr:"Le spectacle donne l'impression que les chevaux dansent.",
        en:"The show makes it look as though the horses are dancing.",
        es:"El espectáculo da la impresión de que los caballos bailan.",
        it:"Lo spettacolo dà l'impressione che i cavalli danzino.",
        de:"Die Vorführung lässt es aussehen, als würden die Pferde tanzen.",
        ja:"この 公演 を 見 て いる と、 馬 が 踊っ て いる よう に 感じ ます。" }
    ]
  }
};
