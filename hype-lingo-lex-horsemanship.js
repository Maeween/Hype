/* hype-lingo-lex-horsemanship.js — Hype Linguae · Santa Ynez · « Le horsemanship »
   ==================================================================
   12 CONCEPTS, UNE LEÇON.

   UN CONCEPT = UN OBJET DU MONDE ÉQUESTRE avec ses 6 langues côte à côte.
   Aucune langue source : le moteur lit la langue de l'interface et propose
   les 5 autres.

   POURQUOI CE CHAPITRE EXISTE
   La vallée de Santa Ynez, en Californie, est le berceau de la tradition
   vaquero — hackamore, bride horse — dont descend tout le horsemanship
   moderne. C'est aussi là que vivait Monty Roberts, mort le 2 août 2026 à
   91 ans dans son ranch de Solvang. La reine Elizabeth II l'avait fait
   venir travailler ses chevaux en 1989 : c'est de là que le monde a connu
   sa méthode. Le fait est dans le récit de la ville, cité une fois, sans
   pathos — les joueuses ont dix à quinze ans.

   L'INTÉRÊT DE LANGUE, et c'est le vrai sujet du chapitre :
   `timing`, `feel` et `release` n'ont pas de traduction française
   satisfaisante. Le français dit « juste moment », « ressenti »,
   « relâchement » — ce n'est pas tout à fait la même chose, et c'est
   précisément l'écart qu'un module de langues montre mieux qu'un cours.
   La colonne française donne en même temps le vocabulaire des savoirs
   éthologiques de la FFE, que les cavalières passent réellement.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA
     var  variante régionale
     def  définition — mode Lexique, verso de la carte, indice dans les jeux
     v    true si c'est un verbe (le moteur les traite à part)

   ⚠️ AUCUN CENTRE ÉQUESTRE PRIVÉ FRANÇAIS N'EST CITÉ, ici ni ailleurs
   dans le module — décision de Blandine du 8 août 2026. Ne pas ajouter
   de mention d'école, de haras privé ou de formation commerciale.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. Les entrées marquées // ?? sont celles
   dont je ne suis pas sûr : le vocabulaire du horsemanship est un
   vocabulaire d'usage, souvent laissé en anglais dans les autres langues,
   et l'usage réel varie d'un pays à l'autre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.horsemanship = {
  ref: "horsemanship",
  chapitre: 1,
  titre: { fr:"Le horsemanship", en:"Horsemanship", es:"La doma natural",
           it:"Il horsemanship", de:"Horsemanship", ja:"ホースマンシップ" },
  lecons: 1,

  concepts: [

  { ref:"travail-pied", lecon:1, coll:"pied",
    mots:{ fr:{m:"le travail à pied"}, en:{m:"groundwork", p:"graound-work"},
           es:{m:"el trabajo desde el suelo"}, it:{m:"il lavoro da terra"},
           de:{m:"die Bodenarbeit", p:"bô-den-ar-baït"},
           ja:{m:"地上作業", p:"chijō sagyō"} },
    def:{ fr:"Tout ce qu'on demande au cheval sans être dessus : le mener, le déplacer, l'arrêter.",
          en:"Everything asked of the horse from the ground: leading, moving, halting him.",
          es:"Todo lo que se pide al caballo sin montarlo: llevarlo, moverlo, pararlo.",
          it:"Tutto ciò che si chiede al cavallo da terra: condurlo, spostarlo, fermarlo.",
          de:"Alles, was man vom Boden aus verlangt: führen, weichen lassen, anhalten.",
          ja:"馬に乗らずに行うすべての作業。引く、動かす、止める。" } },

  { ref:"licol-etho", lecon:1, coll:"pied",
    mots:{ fr:{m:"le licol éthologique", var:"le licol plat"},
           en:{m:"the rope halter", p:"rôp hol-teur"},
           es:{m:"la cabezada de cuerda"}, it:{m:"la capezza in corda"},
           de:{m:"das Knotenhalfter", p:"knô-ten-half-teur"},
           ja:{m:"ロープハルター", p:"rōpu harutā"} },
    def:{ fr:"Licol en corde fine, sans boucle. Le cheval sent la moindre demande, donc on tire moins.",
          en:"A halter of thin knotted rope. The horse feels the least signal, so you pull less.",
          es:"Cabezada de cuerda fina, sin hebillas. El caballo siente la menor señal y se tira menos.",
          it:"Capezza di corda sottile, senza fibbie. Il cavallo sente il minimo segnale, si tira meno.",
          de:"Halfter aus dünnem Seil, ohne Schnallen. Das Pferd spürt jedes Signal, man zieht weniger.",
          ja:"細いロープの結び目式ハルター。わずかな合図も伝わるので、強く引く必要がない。" } },

  { ref:"rond-longe", lecon:1, coll:"pied",
    mots:{ fr:{m:"le rond de longe"}, en:{m:"the round pen", p:"raound penn"},
           es:{m:"el picadero redondo"}, it:{m:"il tondino"},
           de:{m:"der Round Pen", p:"raound penn"},   // ?? l'anglicisme est l'usage courant
           ja:{m:"丸馬場", p:"maru baba"} },
    def:{ fr:"Enclos rond où le cheval travaille en liberté. Sans angle, il ne peut pas se bloquer dans un coin.",
          en:"A circular pen where the horse works loose. With no corners, he cannot get stuck in one.",
          es:"Corral redondo donde el caballo trabaja en libertad. Sin esquinas, no puede quedarse atrapado.",
          it:"Recinto rotondo dove il cavallo lavora libero. Senza angoli, non può bloccarsi.",
          de:"Runder Platz, auf dem das Pferd frei arbeitet. Ohne Ecken kann es sich nicht festsetzen.",
          ja:"馬が放し飼いで作業する円形の囲い。角がないため、隅に詰まることがない。" } },

  { ref:"pression", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"la pression"}, en:{m:"pressure", p:"pré-cheur"},
           es:{m:"la presión"}, it:{m:"la pressione"},
           de:{m:"der Druck", p:"drouk"}, ja:{m:"圧", p:"atsu"} },
    def:{ fr:"La demande : une main, une jambe, un regard, un pas vers le cheval. Elle doit toujours pouvoir cesser.",
          en:"The ask: a hand, a leg, a look, a step towards the horse. It must always be able to stop.",
          es:"La petición: una mano, una pierna, una mirada, un paso hacia el caballo. Siempre debe poder cesar.",
          it:"La richiesta: una mano, una gamba, uno sguardo, un passo verso il cavallo. Deve poter cessare.",
          de:"Die Frage: eine Hand, ein Bein, ein Blick, ein Schritt zum Pferd. Sie muss aufhören können.",
          ja:"要求のこと。手、脚、視線、馬への一歩。必ずやめられるものでなければならない。" } },

  { ref:"relachement", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le relâchement"}, en:{m:"the release", p:"ri-lisse"},
           es:{m:"la cesión de la presión"}, it:{m:"il rilascio"},
           de:{m:"das Nachgeben", p:"nakh-guè-ben"},
           ja:{m:"リリース", p:"rirīsu"} },
    def:{ fr:"L'instant où la demande s'arrête. C'est lui qui enseigne, pas la pression : le cheval retient ce qui a fait cesser.",
          en:"The moment the ask stops. This is what teaches, not the pressure: the horse remembers what made it end.",
          es:"El instante en que cesa la petición. Es eso lo que enseña, no la presión: el caballo recuerda lo que la detuvo.",
          it:"L'istante in cui la richiesta cessa. È questo che insegna, non la pressione: il cavallo ricorda cosa l'ha fermata.",
          de:"Der Moment, in dem die Frage aufhört. Das lehrt, nicht der Druck: das Pferd merkt sich, was ihn beendet hat.",
          ja:"要求が止まる瞬間。教えているのは圧ではなくこれ。馬は「何がやめさせたか」を覚える。" } },

  { ref:"ceder", lecon:1, coll:"ressenti", v:true,
    mots:{ fr:{m:"céder"}, en:{m:"to yield", p:"tou yild"},
           es:{m:"ceder"}, it:{m:"cedere"},
           de:{m:"weichen", p:"vaï-khen"}, ja:{m:"譲る", p:"yuzuru"} },
    def:{ fr:"Se déplacer à la demande sans résister : l'épaule, la hanche, un pas en arrière.",
          en:"To move away from the ask without resisting: the shoulder, the hindquarters, a step back.",
          es:"Desplazarse ante la petición sin resistirse: la espalda, la cadera, un paso atrás.",
          it:"Spostarsi alla richiesta senza resistere: la spalla, l'anca, un passo indietro.",
          de:"Auf die Frage weichen, ohne sich zu widersetzen: Schulter, Hinterhand, ein Schritt zurück.",
          ja:"要求に抵抗せず動くこと。肩、後肢、一歩の後退。" } },

  { ref:"desensibilisation", lecon:1, coll:"pied",
    mots:{ fr:{m:"la désensibilisation"}, en:{m:"desensitising", p:"di-sen-si-taï-zing"},
           es:{m:"la desensibilización"}, it:{m:"la desensibilizzazione"},
           de:{m:"die Desensibilisierung", p:"dé-zen-zi-bi-li-zî-roung"},
           ja:{m:"脱感作", p:"dakkansa" } },
    def:{ fr:"Habituer le cheval à ce qui l'effraie, en restant jusqu'à ce qu'il n'y fasse plus attention.",
          en:"Getting the horse used to what frightens him, staying until he stops minding it.",
          es:"Acostumbrar al caballo a lo que le asusta, quedándose hasta que deje de importarle.",
          it:"Abituare il cavallo a ciò che lo spaventa, restando finché non ci fa più caso.",
          de:"Das Pferd an das gewöhnen, was ihm Angst macht — bleiben, bis es ihm gleichgültig ist.",
          ja:"馬が怖がるものに慣らすこと。気にしなくなるまでその場に留まる。" } },

  { ref:"debourrage", lecon:1, coll:"pied",
    mots:{ fr:{m:"le débourrage"}, en:{m:"starting a horse", p:"star-ting"},
           es:{m:"el desbrave"}, it:{m:"l'addestramento iniziale"},
           de:{m:"das Anreiten", p:"an-raï-ten"},
           ja:{m:"初期調教", p:"shoki chōkyō"} },
    def:{ fr:"Les premières séances d'un jeune cheval, jusqu'au premier cavalier sur son dos.",
          en:"A young horse's first sessions, up to the first rider on his back.",
          es:"Las primeras sesiones de un caballo joven, hasta el primer jinete encima.",
          it:"Le prime sedute di un cavallo giovane, fino al primo cavaliere in sella.",
          de:"Die ersten Einheiten eines jungen Pferdes, bis zum ersten Reiter im Sattel.",
          ja:"若馬の最初の調教。初めて人が背に乗るまで。" } },

  { ref:"hackamore", lecon:1, coll:"pied",
    mots:{ fr:{m:"le hackamore"}, en:{m:"the hackamore", p:"ha-ka-more"},
           es:{m:"la jáquima", var:"la bosal"}, it:{m:"lo hackamore"},
           de:{m:"das Hackamore"}, ja:{m:"ハッカモア", p:"hakkamoa"} },
    def:{ fr:"Embouchure sans mors : une muserolle épaisse qui agit sur le nez. Le mot vient de l'espagnol jáquima.",
          en:"A bitless bridle: a thick noseband acting on the nose. The word comes from Spanish jáquima.",
          es:"Embocadura sin bocado: una muserola gruesa que actúa sobre la nariz. De ahí viene la palabra jáquima.",
          it:"Imboccatura senza morso: una grossa capezzina che agisce sul naso. La parola viene dallo spagnolo jáquima.",
          de:"Gebisslose Zäumung: ein dicker Nasenriemen, der auf die Nase wirkt. Das Wort kommt vom spanischen jáquima.",
          ja:"ハミを使わない頭絡。太い鼻革が鼻に作用する。語源はスペイン語の jáquima。" } },

  { ref:"sans-mors", lecon:1, coll:"pied", v:true,
    mots:{ fr:{m:"monter sans mors"}, en:{m:"to ride bitless", p:"raïd bit-less"},
           es:{m:"montar sin bocado"}, it:{m:"montare senza morso"},
           de:{m:"gebisslos reiten", p:"gue-biss-lôss raï-ten"},
           ja:{m:"ハミなしで乗る", p:"hami nashi de noru"} },
    def:{ fr:"Monter avec une embouchure qui n'entre pas dans la bouche. Autorisé en compétition dans certaines disciplines seulement.",
          en:"Riding with no bit in the mouth. Allowed in competition in some disciplines only.",
          es:"Montar sin bocado en la boca. Permitido en competición solo en algunas disciplinas.",
          it:"Montare senza morso in bocca. Ammesso in gara solo in alcune discipline.",
          de:"Reiten ohne Gebiss im Maul. Im Turnier nur in manchen Disziplinen erlaubt.",
          ja:"口にハミを入れずに乗ること。競技では一部の種目でのみ認められる。" } },

  { ref:"timing", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le juste moment", var:"le timing"}, en:{m:"timing", p:"taï-ming"},
           es:{m:"el momento justo"}, it:{m:"il tempismo"},
           de:{m:"das Timing", p:"taï-ming"}, ja:{m:"タイミング", p:"taimingu"} },
    def:{ fr:"Demander et relâcher à la bonne seconde. Une demande juste au mauvais moment n'apprend rien.",
          en:"Asking and releasing at the right second. A fair ask at the wrong moment teaches nothing.",
          es:"Pedir y ceder en el segundo justo. Una petición correcta a destiempo no enseña nada.",
          it:"Chiedere e rilasciare al secondo giusto. Una richiesta giusta al momento sbagliato non insegna nulla.",
          de:"Im richtigen Augenblick fragen und nachgeben. Eine richtige Frage zur falschen Zeit lehrt nichts.",
          ja:"正しい一瞬に求め、正しい一瞬にやめること。合っている要求でも時機を外せば何も教えない。" } },

  { ref:"ressenti", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le ressenti", var:"le feeling"}, en:{m:"feel", p:"fîl"},
           es:{m:"el tacto"}, it:{m:"la sensibilità"},
           de:{m:"das Gefühl", p:"gue-fül"}, ja:{m:"感覚", p:"kankaku"} },
    def:{ fr:"Sentir ce que le cheval va faire avant qu'il le fasse. Ne s'explique pas : se gagne à force d'heures.",
          en:"Sensing what the horse will do before he does it. It cannot be explained, only earned in hours.",
          es:"Sentir lo que el caballo va a hacer antes de que lo haga. No se explica: se gana con horas.",
          it:"Sentire ciò che il cavallo farà prima che lo faccia. Non si spiega: si guadagna con le ore.",
          de:"Spüren, was das Pferd tun wird, bevor es es tut. Nicht erklärbar, nur erarbeitbar.",
          ja:"馬が動く前に、その動きを感じ取ること。説明できず、時間だけが与えてくれる。" } }

  ],

  /* Phrases : règle des 7 mots en français, une idée par phrase. */
  phrases: [

  { lecon:1, p:{ fr:"Demande peu, relâche tôt.",
                 en:"Ask little, release early.",
                 es:"Pide poco, cede pronto.",
                 it:"Chiedi poco, rilascia presto.",
                 de:"Frage wenig, gib früh nach.",
                 ja:"少なく求め、早く放す。" } },

  { lecon:1, p:{ fr:"Le relâchement enseigne, pas la pression.",
                 en:"The release teaches, not the pressure.",
                 es:"La cesión enseña, no la presión.",
                 it:"Il rilascio insegna, non la pressione.",
                 de:"Das Nachgeben lehrt, nicht der Druck.",
                 ja:"教えるのは圧ではなく、放すこと。" } },

  { lecon:1, p:{ fr:"On travaille d'abord à pied.",
                 en:"We work from the ground first.",
                 es:"Primero se trabaja desde el suelo.",
                 it:"Prima si lavora da terra.",
                 de:"Zuerst wird vom Boden gearbeitet.",
                 ja:"まず地上から始める。" } }

  ]
};
