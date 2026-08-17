/* hype-lingo-lex-horsemanship.js — Hype Linguae · Santa Ynez · « Le horsemanship »
   ==================================================================
   15 CONCEPTS, UNE LEÇON.

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

   🟥 LE SCHÉMA DU CHAPITRE — 17/08/2026, posé par Blandine :
   **ASK → RESPONSE → RELEASE**
   On fait une demande légère. Dès que le cheval donne la bonne réponse,
   on arrête immédiatement la demande. C'est ce moment d'arrêt — le
   release — qui lui apprend ce qu'on attend de lui.
     · pression sans relâchement = confusion
     · pression + juste moment + relâchement = apprentissage
   ⚠️ NE PAS présenter le horsemanship comme une méthode douce ou une
   philosophie : c'est une MÉCANIQUE, et c'est ce qui la rend enseignable.

   🟥 ET LA PHRASE QUI RÉSUME TOUT, d'elle aussi :
   « Un bon horsemanship ne consiste pas à être plus fort. Il consiste à
   avoir davantage de ressenti. » — *Good horsemanship isn't about being
   stronger. It's about having better feel.* Elle est au temps 5 du
   dialogue. NE PAS la retirer.

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

   ⚠️ LE FORMAT DES `phrases` DE CE FICHIER EST PARTICULIER : les langues
   sont imbriquées dans une clé `p`, et il n'y a pas de `ref` — contrairement
   à tous les autres chapitres, où elles sont à plat. Conservé tel quel,
   c'est peut-être voulu pour les phrases très courtes. La clé `dialogue`
   ci-dessous, elle, suit le format standard de tout le module.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.horsemanship = {
  ref: "horsemanship",
  chapitre: 1,
  titre: { fr:"Le horsemanship", en:"Horsemanship", es:"La doma natural",
           it:"Il horsemanship", de:"Horsemanship", ja:"ホースマンシップ" },
  lecons: 1,

  concepts: [

  /* 🟥 LE MOT-TITRE, ajouté le 17/08 : il manquait à son propre chapitre. */
  { ref:"le-horsemanship", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le horsemanship"}, en:{m:"horsemanship", p:"hor-seu-manne-chip"},
           es:{m:"la doma natural"}, it:{m:"il horsemanship"},
           de:{m:"Horsemanship"}, ja:{m:"ホースマンシップ", p:"hōsumanshippu"} },
    def:{ fr:"🟥 LE MOT NE SE TRADUIT PAS, et c'est le sujet du chapitre. Le français dit « équitation éthologique », l'espagnol « doma natural » — deux traductions qui ajoutent une idée que l'anglais n'a pas : l'éthologie d'un côté, le naturel de l'autre. *Horsemanship* ne dit rien de tel : il dit seulement « l'art d'être avec les chevaux ». ⚠️ Ce n'est ni une méthode ni une marque : c'est une manière de demander.",
          en:"The word doesn't translate, and that's the chapter's subject. French says « équitation éthologique », Spanish « doma natural » — both add an idea English doesn't have. « Horsemanship » says only: the craft of being with horses. It's not a method and not a brand.",
          es:"La palabra no se traduce. El español dice « doma natural », el francés « equitación etológica » — ambos añaden una idea que el inglés no tiene.",
          it:"La parola non si traduce. L'italiano la lascia in inglese, il francese dice « équitation éthologique », lo spagnolo « doma natural ».",
          de:"Das Wort lässt sich nicht übersetzen. Deutsch behält es, Französisch sagt « équitation éthologique », Spanisch « doma natural ».",
          ja:"この語は翻訳できません。それがこの章の主題です。フランス語は「動物行動学的馬術」、スペイン語は「自然な調教」と言い、いずれも英語にはない考えを付け加えています。horsemanship が言うのは「馬とともにある技」だけです。" } },

  { ref:"travail-pied", lecon:1, coll:"pied",
    mots:{ fr:{m:"le travail à pied"}, en:{m:"groundwork", p:"graound-work"},
           es:{m:"el trabajo desde el suelo"}, it:{m:"il lavoro da terra"},
           de:{m:"die Bodenarbeit", p:"bô-den-ar-baït"},
           ja:{m:"地上作業", p:"chijō sagyō"} },
    def:{ fr:"Tout ce qu'on demande au cheval sans être dessus : le mener, le déplacer, l'arrêter. ⚠️ Ce n'est pas une préparation à monter, c'est là que tout s'apprend — la demande, la réponse, le relâchement. On y revient toute sa vie.",
          en:"Everything asked of the horse from the ground: leading, moving, halting him. It isn't preparation for riding — it's where everything is learnt: the ask, the response, the release.",
          es:"Todo lo que se pide al caballo sin montarlo: llevarlo, moverlo, pararlo. No es una preparación para montar: es donde todo se aprende.",
          it:"Tutto ciò che si chiede al cavallo da terra: condurlo, spostarlo, fermarlo. Non è una preparazione a montare: è dove tutto si impara.",
          de:"Alles, was man vom Boden aus verlangt: führen, weichen lassen, anhalten. Keine Vorbereitung aufs Reiten — hier wird alles gelernt.",
          ja:"馬に乗らずに行うすべての作業。引く、動かす、止める。騎乗の準備ではなく、ここですべてを学びます。求め、反応、そして放すこと。" } },

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
    def:{ fr:"La demande : une main, une jambe, un regard, un pas vers le cheval. Elle doit toujours pouvoir cesser. 🟥 PRESSION SANS RELÂCHEMENT = CONFUSION. Un cheval sous pression permanente n'apprend rien : il subit.",
          en:"The ask: a hand, a leg, a look, a step towards the horse. It must always be able to stop. Pressure without release equals confusion: a horse under constant pressure learns nothing, he endures.",
          es:"La petición: una mano, una pierna, una mirada, un paso hacia el caballo. Siempre debe poder cesar. Presión sin cesión es confusión.",
          it:"La richiesta: una mano, una gamba, uno sguardo, un passo verso il cavallo. Deve poter cessare. Pressione senza rilascio è confusione.",
          de:"Die Frage: eine Hand, ein Bein, ein Blick, ein Schritt zum Pferd. Sie muss aufhören können. Druck ohne Nachgeben ist Verwirrung.",
          ja:"要求のこと。手、脚、視線、馬への一歩。必ずやめられるものでなければならない。放すことのない圧は、混乱にしかなりません。" } },

  { ref:"relachement", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le relâchement"}, en:{m:"the release", p:"ri-lisse"},
           es:{m:"la cesión de la presión"}, it:{m:"il rilascio"},
           de:{m:"das Nachgeben", p:"nakh-guè-ben"},
           ja:{m:"リリース", p:"rirīsu"} },
    def:{ fr:"🟥 LE MOT CENTRAL DU CHAPITRE. L'instant où la demande s'arrête. C'est lui qui enseigne, pas la pression : le cheval retient ce qui a fait cesser. ⚠️ D'où le schéma : ASK → RESPONSE → RELEASE. Et le relâchement doit venir à la première esquisse de bonne réponse, pas à la réponse complète — sinon on demande toujours plus.",
          en:"The chapter's central word. The moment the ask stops. This is what teaches, not the pressure: the horse remembers what made it end. Hence: ask, response, release. And the release must come at the first hint of the right answer, not at the finished one.",
          es:"El instante en que cesa la petición. Es eso lo que enseña, no la presión: el caballo recuerda lo que la detuvo. La cesión debe llegar al primer indicio de la respuesta correcta.",
          it:"L'istante in cui la richiesta cessa. È questo che insegna, non la pressione: il cavallo ricorda cosa l'ha fermata. Il rilascio deve arrivare al primo accenno di risposta giusta.",
          de:"Der Moment, in dem die Frage aufhört. Das lehrt, nicht der Druck: das Pferd merkt sich, was ihn beendet hat. Das Nachgeben muss beim ersten Ansatz der richtigen Antwort kommen.",
          ja:"この章の中心となる語。要求が止まる瞬間。教えているのは圧ではなくこれ。馬は「何がやめさせたか」を覚える。正しい反応の最初の兆しで放すこと。完成を待ってはいけません。" } },

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

  /* 🟥 DEUX ENTRÉES AJOUTÉES le 17/08 : les phrases de Blandine
     « demande-lui de déplacer ses épaules » et « fais céder les hanches »
     les employaient sans qu'elles existent. Ce sont les DEUX PREMIÈRES
     CHOSES qu'on apprend à un cheval à pied, et dans cet ordre. */
  { ref:"epaules", lecon:1, coll:"pied",
    mots:{ fr:{m:"les épaules"}, en:{m:"the shoulders", p:"chôl-deurz"},
           es:{m:"las espaldas"}, it:{m:"le spalle"},
           de:{m:"die Schultern", p:"choul-teurn"}, ja:{m:"肩", p:"kata"} },
    def:{ fr:"Déplacer les épaules, c'est demander à l'avant-main de s'écarter en gardant les postérieurs en place. ⚠️ Un cheval qui cède les épaules ne peut plus vous bousculer : c'est la première chose qu'on apprend, avant même de mener. En anglais on dit *to move the shoulders over*.",
          en:"Moving the shoulders means asking the forehand to step away while the hind legs stay. A horse who yields his shoulders can no longer barge into you: it's the first thing taught, before even leading.",
          es:"Desplazar las espaldas es pedir al tercio anterior que se aparte manteniendo los posteriores. Un caballo que cede las espaldas ya no puede empujarte.",
          it:"Spostare le spalle significa chiedere all'avantreno di scostarsi tenendo fermi i posteriori. Un cavallo che cede le spalle non può più spingerti.",
          de:"Die Schultern weichen lassen heißt, die Vorhand zur Seite treten zu lassen, während die Hinterbeine stehen. Ein Pferd, das die Schultern gibt, kann dich nicht mehr wegdrängen.",
          ja:"肩を動かすとは、後肢をその場に残したまま前躯を横に踏み出させることです。肩を譲る馬は人を押しのけません。引き馬より前に学ぶ、最初の課題です。" } },

  { ref:"hanches", lecon:1, coll:"pied",
    mots:{ fr:{m:"les hanches", var:"les postérieurs"},
           en:{m:"the hindquarters", p:"haïnd-kwor-teurz"},
           es:{m:"la cadera", var:"los posteriores"}, it:{m:"le anche"},
           de:{m:"die Hinterhand", p:"hinn-teur-hannt"}, ja:{m:"後肢", p:"kōshi"} },
    def:{ fr:"🟥 FAIRE CÉDER LES HANCHES EST LE FREIN D'URGENCE DU TRAVAIL À PIED : un cheval qui croise ses postérieurs ne peut pas partir en avant. C'est aussi ce qui le calme — un cheval qui cède les hanches baisse la tête et souffle. ⚠️ En anglais **hindquarters** au pluriel, jamais « hinds ». On dit *to yield the hindquarters* ou *to disengage*.",
          en:"Yielding the hindquarters is the emergency brake of groundwork: a horse who crosses his hind legs cannot go forward. It also settles him — a horse who yields behind drops his head and breathes out. Always « hindquarters », plural.",
          es:"Hacer ceder la cadera es el freno de emergencia del trabajo desde el suelo: un caballo que cruza los posteriores no puede salir hacia adelante. También lo calma.",
          it:"Far cedere le anche è il freno d'emergenza del lavoro da terra: un cavallo che incrocia i posteriori non può partire avanti. Lo calma anche.",
          de:"Die Hinterhand weichen zu lassen ist die Notbremse der Bodenarbeit: ein Pferd, das hinten kreuzt, kann nicht vorwärts. Es beruhigt es auch.",
          ja:"後肢を譲らせることは、地上作業の非常ブレーキです。後肢を交差させた馬は前に出られません。同時に落ち着かせる効果もあり、後肢を譲る馬は頭を下げて息を吐きます。" } },

  { ref:"desensibilisation", lecon:1, coll:"pied",
    mots:{ fr:{m:"la désensibilisation"}, en:{m:"desensitising", p:"di-sen-si-taï-zing"},
           es:{m:"la desensibilización"}, it:{m:"la desensibilizzazione"},
           de:{m:"die Desensibilisierung", p:"dé-zen-zi-bi-li-zî-roung"},
           ja:{m:"脱感作", p:"dakkansa" } },
    def:{ fr:"Habituer le cheval à ce qui l'effraie, en restant jusqu'à ce qu'il n'y fasse plus attention. 🟥 LE BUT N'EST PAS QU'IL SUBISSE MAIS QU'IL COMPRENNE : on approche l'objet, et on le RETIRE au moment où il se détend. C'est le relâchement appliqué à la peur. ⚠️ Forcer produit un cheval qui ne bouge plus par résignation, ce qui n'est pas la même chose.",
          en:"Getting the horse used to what frightens him, staying until he stops minding it. The goal isn't for him to tolerate it but to understand: you bring the object closer and TAKE IT AWAY the moment he relaxes. It's the release applied to fear.",
          es:"Acostumbrar al caballo a lo que le asusta. El objetivo no es que lo soporte sino que lo entienda: se acerca el objeto y se retira en el momento en que se relaja.",
          it:"Abituare il cavallo a ciò che lo spaventa. Lo scopo non è che lo subisca ma che capisca: si avvicina l'oggetto e si toglie nel momento in cui si rilassa.",
          de:"Das Pferd an das gewöhnen, was ihm Angst macht. Das Ziel ist nicht Erduldung, sondern Verstehen: man bringt den Gegenstand näher und NIMMT IHN WEG, sobald es sich entspannt.",
          ja:"馬が怖がるものに慣らすこと。目的は我慢させることではなく、理解させることです。物を近づけ、馬が緩んだ瞬間に離します。恐怖に対する「放すこと」の応用です。" } },

  { ref:"debourrage", lecon:1, coll:"pied",
    mots:{ fr:{m:"le débourrage"}, en:{m:"starting a horse", p:"star-ting"},
           es:{m:"el desbrave"}, it:{m:"l'addestramento iniziale"},
           de:{m:"das Anreiten", p:"an-raï-ten"},
           ja:{m:"初期調教", p:"shoki chōkyō"} },
    def:{ fr:"Les premières séances d'un jeune cheval, jusqu'au premier cavalier sur son dos. ⚠️ L'anglais dit **to start a horse**, jamais « to break » — le verbe « briser » a été abandonné avec la méthode qu'il décrivait.",
          en:"A young horse's first sessions, up to the first rider on his back. Say « to start a horse », not « to break » — the old verb went out with the old method.",
          es:"Las primeras sesiones de un caballo joven, hasta el primer jinete encima. El inglés dice « to start », no « to break ».",
          it:"Le prime sedute di un cavallo giovane, fino al primo cavaliere in sella. L'inglese dice « to start », non « to break ».",
          de:"Die ersten Einheiten eines jungen Pferdes, bis zum ersten Reiter im Sattel. Englisch sagt « to start », nicht « to break ».",
          ja:"若馬の最初の調教。初めて人が背に乗るまで。英語では to break（壊す）ではなく to start と言います。古い動詞は、それが表していた方法とともに使われなくなりました。" } },

  { ref:"hackamore", lecon:1, coll:"pied",
    mots:{ fr:{m:"le hackamore"}, en:{m:"the hackamore", p:"ha-ka-more"},
           es:{m:"la jáquima", var:"la bosal"}, it:{m:"lo hackamore"},
           de:{m:"das Hackamore"}, ja:{m:"ハッカモア", p:"hakkamoa"} },
    def:{ fr:"Embouchure sans mors : une muserolle épaisse qui agit sur le nez. Le mot vient de l'espagnol jáquima. ⚠️ NE PAS CONFONDRE deux objets très différents : le hackamore MÉCANIQUE, à longues branches, agit par levier et peut être plus dur qu'un mors ; la BOSAL de la tradition vaquero — celle de Santa Ynez — est un simple anneau de cuir tressé, sans levier, dont on se sert des années avant de mettre un mors.",
          en:"A bitless bridle: a thick noseband acting on the nose. From Spanish jáquima. Don't confuse two very different things: the MECHANICAL hackamore, with long shanks, works by leverage and can be harsher than a bit; the vaquero BOSAL — the Santa Ynez one — is a plain braided rawhide noseband with no leverage at all.",
          es:"Embocadura sin bocado: una muserola gruesa que actúa sobre la nariz. No confundir la jáquima mecánica, de brazos largos, con la bosal de la tradición vaquera, sin palanca.",
          it:"Imboccatura senza morso: una grossa capezzina che agisce sul naso. Non confondere lo hackamore meccanico, a stanghe lunghe, con la bosal della tradizione vaquera, senza leva.",
          de:"Gebisslose Zäumung: ein dicker Nasenriemen, der auf die Nase wirkt. Nicht verwechseln: das mechanische Hackamore mit langen Anzügen wirkt über Hebel; die Vaquero-Bosal hat keinen Hebel.",
          ja:"ハミを使わない頭絡。太い鼻革が鼻に作用する。語源はスペイン語の jáquima。⚠️ 二つの全く違う道具を混同しないこと。長い枝のある「メカニカル・ハッカモア」はてこの原理で働き、ハミより強く作用することもあります。一方、サンタ・イネス由来のバケロ伝統の「ボサル」は枝のない編み革の輪で、てこは働きません。" } },

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
    def:{ fr:"Demander et relâcher à la bonne seconde. Une demande juste au mauvais moment n'apprend rien. 🟥 PRESSION + JUSTE MOMENT + RELÂCHEMENT = APPRENTISSAGE. Le défaut le plus fréquent n'est pas de trop demander, c'est de relâcher trop tard.",
          en:"Asking and releasing at the right second. A fair ask at the wrong moment teaches nothing. Pressure plus timing plus release equals learning. The commonest fault isn't asking too much — it's releasing too late.",
          es:"Pedir y ceder en el segundo justo. Una petición correcta a destiempo no enseña nada. El fallo más frecuente no es pedir demasiado: es ceder demasiado tarde.",
          it:"Chiedere e rilasciare al secondo giusto. Una richiesta giusta al momento sbagliato non insegna nulla. L'errore più frequente non è chiedere troppo: è rilasciare troppo tardi.",
          de:"Im richtigen Augenblick fragen und nachgeben. Eine richtige Frage zur falschen Zeit lehrt nichts. Der häufigste Fehler ist nicht zu viel zu fragen, sondern zu spät nachzugeben.",
          ja:"正しい一瞬に求め、正しい一瞬にやめること。合っている要求でも時機を外せば何も教えない。最もよくある誤りは求めすぎることではなく、放すのが遅いことです。" } },

  { ref:"ressenti", lecon:1, coll:"ressenti",
    mots:{ fr:{m:"le ressenti", var:"le feeling"}, en:{m:"feel", p:"fîl"},
           es:{m:"el tacto"}, it:{m:"la sensibilità"},
           de:{m:"das Gefühl", p:"gue-fül"}, ja:{m:"感覚", p:"kankaku"} },
    def:{ fr:"Sentir ce que le cheval va faire avant qu'il le fasse. Ne s'explique pas : se gagne à force d'heures. 🟥 « Un bon horsemanship ne consiste pas à être plus fort. Il consiste à avoir davantage de ressenti. » ⚠️ En anglais **feel** est un NOM ici, sans article : *good feel*, *to have feel*. Dire « a feel » ou « the feeling » change complètement le sens.",
          en:"Sensing what the horse will do before he does it. It cannot be explained, only earned in hours. « Good horsemanship isn't about being stronger. It's about having better feel. » Note that « feel » is a noun here and takes no article: good feel, to have feel.",
          es:"Sentir lo que el caballo va a hacer antes de que lo haga. No se explica: se gana con horas. Un buen horsemanship no consiste en ser más fuerte, sino en tener más tacto.",
          it:"Sentire ciò che il cavallo farà prima che lo faccia. Non si spiega: si guadagna con le ore. Un buon horsemanship non consiste nell'essere più forti, ma nell'avere più sensibilità.",
          de:"Spüren, was das Pferd tun wird, bevor es es tut. Nicht erklärbar, nur erarbeitbar. Gutes Horsemanship heißt nicht, stärker zu sein, sondern mehr Gefühl zu haben.",
          ja:"馬が動く前に、その動きを感じ取ること。説明できず、時間だけが与えてくれる。「良いホースマンシップとは、より強くなることではなく、より感じ取れるようになることだ。」" } }

  ],

  /* Phrases : règle des 7 mots en français, une idée par phrase.
     ⚠️ FORMAT PARTICULIER À CE FICHIER — langues imbriquées dans `p`, pas
     de `ref`. Conservé tel quel, voir l'en-tête. */
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

  ],

  /* ==================================================================
     LE DIALOGUE DE SANTA YNEZ — 17 août 2026, session 214.

     LA SCÈNE : une matinée dans un ranch de la vallée. Le rond de longe,
     un jeune cheval, une bâche. 21 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT-ET-UNE SONT DE BLANDINE, avec leur
     traduction anglaise. Les trois autres sont les phrases courtes qui
     étaient déjà dans ce fichier — « demande peu, relâche tôt », « le
     relâchement enseigne, pas la pression », « on travaille d'abord à
     pied » — et elles restent AUSSI en phrases d'exercice.

     🟥 LE SCHÉMA QU'ELLE A POSÉ, et qui structure les temps :
     **ASK → RESPONSE → RELEASE**
       · pression sans relâchement = confusion
       · pression + juste moment + relâchement = apprentissage
     ⚠️ NE PAS présenter le chapitre comme une philosophie : c'est une
     MÉCANIQUE, et c'est ce qui la rend enseignable. Le temps 1 donne le
     principe, le temps 2 les gestes, le temps 3 la peur, le temps 4 le
     timing, le temps 5 le ressenti, le temps 6 le jeune cheval.

     🟥 CE QUI REND CE CHAPITRE UNIQUE DANS L'APP : partout ailleurs on
     apprend à FAIRE. Ici on apprend à ARRÊTER DE DEMANDER. Le mot le plus
     important n'est pas un ordre mais un moment — le release. Et sa
     phrase du temps 5 le résume : « un bon horsemanship ne consiste pas
     à être plus fort, il consiste à avoir davantage de ressenti ».
     ⚠️ NE PAS retirer cette phrase.

     ⚠️ TROIS MOTS N'ONT PAS DE TRADUCTION SATISFAISANTE en français, et
     c'est le vrai intérêt de langue du chapitre : **timing**, **feel**,
     **release**. Le français dit « juste moment », « ressenti »,
     « relâchement » — ce n'est pas tout à fait la même chose. Voir leurs
     `def`. NE PAS gommer l'écart en forçant une traduction propre.

     ⚠️ `epaules` et `hanches` ont été AJOUTÉS au lexique le même jour :
     les phrases 5 et 6 de Blandine les employaient sans qu'ils existent.
     Ce sont les deux premières choses qu'on apprend à un cheval à pied,
     et dans cet ordre — les épaules d'abord, les hanches ensuite.

     `dit` : "joueuse" = elle produit · "club" = le horseman qui enseigne.
  ================================================================== */
  dialogue: {
    ville: "santaynez", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · le principe ---- */
      { ref:"dsy-toujours-a-pied", temps:1, dit:"club", mots:["travail-pied","le-horsemanship"],
        fr:"On commence toujours par travailler à pied.",
        en:"We always start with groundwork.",
        es:"Siempre se empieza trabajando desde el suelo.",
        it:"Si comincia sempre lavorando da terra.",
        de:"Wir fangen immer mit Bodenarbeit an.",
        ja:"いつも 地上 作業 から 始め ます。" },

      { ref:"dsy-demande-peu", temps:1, dit:"club", mots:["pression","relachement"],
        fr:"Demande peu et relâche dès qu'il répond.",
        en:"Ask for a little and release as soon as he responds.",
        es:"Pide poco y cede en cuanto responda.",
        it:"Chiedi poco e rilascia appena risponde.",
        de:"Frage wenig und gib nach, sobald er antwortet.",
        ja:"少しだけ 求め、 反応 し たら すぐ に 放し ます。" },

      { ref:"dsy-relachement-enseigne", temps:1, dit:"club", mots:["relachement","pression"],
        fr:"Le relâchement enseigne davantage que la pression.",
        en:"The release teaches more than the pressure.",
        es:"La cesión enseña más que la presión.",
        it:"Il rilascio insegna più della pressione.",
        de:"Das Nachgeben lehrt mehr als der Druck.",
        ja:"圧 より も、 放す こと の ほう が 多く を 教え ます。" },

      { ref:"dsy-plus-legere", temps:1, dit:"club", mots:["pression","ressenti"],
        fr:"Plus ta demande est légère, plus sa réponse peut devenir légère.",
        en:"The lighter your ask, the lighter his response can become.",
        es:"Cuanto más ligera sea tu petición, más ligera podrá ser su respuesta.",
        it:"Più leggera è la tua richiesta, più leggera può diventare la sua risposta.",
        de:"Je leichter du fragst, desto leichter kann seine Antwort werden.",
        ja:"求め が 軽く なる ほど、 馬 の 応え も 軽く なり ます。" },

      /* ---- temps 2 · les gestes à pied ---- */
      { ref:"dsy-pas-tirer", temps:2, dit:"club", mots:["licol-etho","pression"],
        fr:"Ne tire pas sur le licol, attends sa réponse.",
        en:"Don't pull on the halter; wait for his response.",
        es:"No tires de la cabezada: espera su respuesta.",
        it:"Non tirare la capezza: aspetta la sua risposta.",
        de:"Zieh nicht am Halfter, warte auf seine Antwort.",
        ja:"ハルター を 引か ず、 馬 の 応え を 待ち ます。" },

      { ref:"dsy-deplacer-epaules", temps:2, dit:"club", mots:["epaules","ceder"],
        fr:"Demande-lui de déplacer ses épaules.",
        en:"Ask him to move his shoulders away.",
        es:"Pídele que desplace las espaldas.",
        it:"Chiedigli di spostare le spalle.",
        de:"Bitte ihn, die Schultern zur Seite zu treten.",
        ja:"肩 を 横 に 動かす よう 求め ます。" },

      { ref:"dsy-ceder-hanches", temps:2, dit:"club", mots:["hanches","ceder"],
        fr:"Maintenant, fais céder les hanches.",
        en:"Now ask him to yield his hindquarters.",
        es:"Ahora haz ceder la cadera.",
        it:"Adesso fai cedere le anche.",
        de:"Jetzt lass die Hinterhand weichen.",
        ja:"次 に、 後肢 を 譲ら せ ます。" },

      { ref:"dsy-recule-un-pas", temps:2, dit:"club", mots:["relachement","ceder"],
        fr:"Recule d'un pas dès qu'il se détend.",
        en:"Step back as soon as he relaxes.",
        es:"Da un paso atrás en cuanto se relaje.",
        it:"Fai un passo indietro appena si rilassa.",
        de:"Tritt einen Schritt zurück, sobald er sich entspannt.",
        ja:"馬 が 緩ん だら、 一 歩 下がり ます。" },

      /* ---- temps 3 · le rond de longe, et la peur ---- */
      { ref:"dsy-entre-rond", temps:3, dit:"club", mots:["rond-longe"],
        fr:"Entre dans le rond de longe avec lui.",
        en:"Take him into the round pen.",
        es:"Entra en el picadero redondo con él.",
        it:"Entra nel tondino con lui.",
        de:"Geh mit ihm in den Round Pen.",
        ja:"馬 と 一緒 に 丸 馬場 に 入り ます。" },

      { ref:"dsy-bouger-librement", temps:3, dit:"club", mots:["rond-longe","travail-pied"],
        fr:"Laisse-le bouger librement avant de lui demander quelque chose.",
        en:"Let him move freely before asking him for anything.",
        es:"Déjalo moverse libremente antes de pedirle algo.",
        it:"Lascialo muoversi liberamente prima di chiedergli qualcosa.",
        de:"Lass ihn sich frei bewegen, bevor du etwas verlangst.",
        ja:"何 か を 求める 前 に、 自由 に 動か せ ます。" },

      { ref:"dsy-peur-bache", temps:3, dit:"club", mots:["desensibilisation"],
        fr:"Il a peur de la bâche, ne le force pas.",
        en:"He's afraid of the tarp; don't force him.",
        es:"Tiene miedo del plástico: no lo fuerces.",
        it:"Ha paura del telone: non forzarlo.",
        de:"Er hat Angst vor der Plane; zwing ihn nicht.",
        ja:"シート を 怖がっ て い ます。 無理 に は し ませ ん。" },

      { ref:"dsy-retire-bache", temps:3, dit:"club", mots:["desensibilisation","relachement"],
        fr:"Approche la bâche, puis retire-la lorsqu'il se détend.",
        en:"Bring the tarp closer, then take it away when he relaxes.",
        es:"Acerca el plástico y retíralo cuando se relaje.",
        it:"Avvicina il telone, poi togliglielo quando si rilassa.",
        de:"Bring die Plane näher und nimm sie weg, wenn er sich entspannt.",
        ja:"シート を 近づけ、 馬 が 緩ん だ とき に 離し ます。" },

      { ref:"dsy-pas-subisse", temps:3, dit:"club", mots:["desensibilisation"],
        fr:"Le but n'est pas qu'il subisse, mais qu'il comprenne.",
        en:"The goal isn't for him to tolerate it, but to understand.",
        es:"El objetivo no es que lo soporte, sino que lo entienda.",
        it:"Lo scopo non è che lo subisca, ma che capisca.",
        de:"Das Ziel ist nicht, dass er es erduldet, sondern dass er versteht.",
        ja:"目的 は 我慢 さ せる こと で は なく、 理解 さ せる こと です。" },

      /* ---- temps 4 · le juste moment ---- */
      { ref:"dsy-timing-tardif", temps:4, dit:"club", mots:["timing","relachement"],
        fr:"Ton timing est trop tardif, relâche plus vite.",
        en:"Your timing is too late; release sooner.",
        es:"Tu momento llega tarde: cede antes.",
        it:"Il tuo tempismo è tardivo: rilascia prima.",
        de:"Dein Timing ist zu spät, gib früher nach.",
        ja:"タイミング が 遅い です。 もっと 早く 放し ます。" },

      { ref:"dsy-sentir-avant", temps:4, dit:"club", mots:["ressenti","timing"],
        fr:"Essaie de sentir sa réponse avant qu'il ne bouge.",
        en:"Try to feel his response before he moves.",
        es:"Intenta sentir su respuesta antes de que se mueva.",
        it:"Prova a sentire la sua risposta prima che si muova.",
        de:"Versuche seine Antwort zu spüren, bevor er sich bewegt.",
        ja:"馬 が 動く 前 に、 その 応え を 感じ取っ て み ます。" },

      /* ---- temps 5 · le ressenti ---- */
      { ref:"dsy-pas-plus-fort", temps:5, dit:"club", mots:["ressenti","le-horsemanship"],
        fr:"Un bon horsemanship ne consiste pas à être plus fort. Il consiste à avoir davantage de ressenti.",
        en:"Good horsemanship isn't about being stronger. It's about having better feel.",
        es:"Un buen horsemanship no consiste en ser más fuerte, sino en tener más tacto.",
        it:"Un buon horsemanship non consiste nell'essere più forti, ma nell'avere più sensibilità.",
        de:"Gutes Horsemanship heißt nicht, stärker zu sein, sondern mehr Gefühl zu haben.",
        ja:"良い ホースマンシップ と は、 より 強く なる こと で は なく、 より 感じ取れる よう に なる こと です。" },

      { ref:"dsy-je-sens-rien", temps:5, dit:"joueuse", mots:["ressenti"],
        fr:"Je n'arrive pas encore à sentir le moment où il cède.",
        en:"I can't feel the moment he yields yet.",
        es:"Todavía no consigo sentir el momento en que cede.",
        it:"Non riesco ancora a sentire il momento in cui cede.",
        de:"Ich spüre den Moment, in dem er weicht, noch nicht.",
        ja:"馬 が 譲る 瞬間 が、 まだ 感じ取れ ませ ん。" },

      /* ---- temps 6 · le jeune cheval ---- */
      { ref:"dsy-jeune-debourrage", temps:6, dit:"club", mots:["debourrage"],
        fr:"Ce jeune cheval vient juste de commencer son débourrage.",
        en:"This young horse has just started his training.",
        es:"Este caballo joven acaba de empezar su desbrave.",
        it:"Questo cavallo giovane ha appena iniziato l'addestramento.",
        de:"Dieses junge Pferd wird gerade erst angeritten.",
        ja:"この 若馬 は、 初期 調教 を 始め た ばかり です。" },

      { ref:"dsy-accepte-selle", temps:6, dit:"club", mots:["debourrage"],
        fr:"Il accepte déjà la selle, mais personne ne l'a encore monté.",
        en:"He already accepts the saddle, but no one has ridden him yet.",
        es:"Ya acepta la silla, pero todavía nadie lo ha montado.",
        it:"Accetta già la sella, ma nessuno l'ha ancora montato.",
        de:"Den Sattel nimmt er schon an, aber geritten hat ihn noch niemand.",
        ja:"鞍 は もう 受け入れ ます が、 まだ 誰 も 乗っ て い ませ ん。" },

      { ref:"dsy-hackamore-sans-mors", temps:6, dit:"club", mots:["hackamore","sans-mors"],
        fr:"Il travaille actuellement en hackamore, sans mors.",
        en:"He's currently being worked in a hackamore, without a bit.",
        es:"Actualmente trabaja con jáquima, sin bocado.",
        it:"Attualmente lavora con lo hackamore, senza morso.",
        de:"Zurzeit wird er gebisslos im Hackamore gearbeitet.",
        ja:"今 は ハミ を 使わ ず、 ハッカモア で 調教 し て い ます。" }
    ]
  }
};
