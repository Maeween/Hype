/* hype-lingo-lex-polo.js — Hype Linguae · le polo
   ==================================================================
   Écrit le 6 août 2026 pour Buenos Aires (Argentine).
   Prévu par hype-linguae-production-suite.txt : « Buenos Aires — le polo :
   le maillet, la période, la monte, le handicap, le changement de cheval ».

   ⚠️ LE POLO A SON PROPRE VOCABULAIRE ANGLAIS, et c'est tout l'intérêt du
   chapitre : presque aucun mot ne se traduit littéralement du français.
   « La période » ne se dit pas « the period » mais LE CHUKKA. « La monte »
   ne se dit pas « the mount » mais THE PONY — et « pony » ne veut pas dire
   poney : un cheval de polo mesure 1,55 m. Ce sont trois faux amis dans
   les cinq premiers mots.

   ⚠️ NE PAS CONFONDRE AVEC LES AUTRES CHAPITRES DE CONCOURS. `obstacle`,
   `concours` et le chapitre de Rome parlent de parcours, de fautes et de
   jury. Le polo n'a ni obstacle, ni parcours, ni note : il a une ligne de
   balle, un handicap et un arbitre monté.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif. Les plus à
   confirmer : `le chukka` (orthographe flottante — chukka, chukker,
   chukkar selon les pays), `le handicap` (de −2 à 10 goals, et c'est le
   joueur qui est noté, pas le cheval), et l'espagnol d'Argentine, qui
   emploie `taco` pour le maillet là où l'Espagne dirait `mazo`.
   À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.polo = {
  ref: "polo",
  chapitre: 18,
  titre: { fr:"Le polo", en:"Polo", es:"El polo", it:"Il polo",
           de:"Das Polo", ja:"ポロ" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE POLO ============ */

  { ref:"maillet", lecon:1, coll:"polo",
    mots:{ fr:{m:"le maillet"}, en:{m:"the mallet", p:"ma-lette", var:"the stick"},
           es:{m:"el taco", var:"el mazo"}, it:{m:"la stecca"},
           de:{m:"der Schläger", p:"chlé-gueur"}, ja:{m:"マレット", p:"maretto"} },
    def:{ fr:"Le manche de bambou à tête de bois. ⚠️ On frappe avec le CÔTÉ de la tête, pas avec le bout. Et il se tient toujours de la main droite, même pour un gaucher : c'est une règle, pas une habitude.",
          en:"The bamboo handle with a wooden head. You strike with the SIDE of the head, not the end. It is always held in the right hand, even by left-handers: that is a rule.",
          es:"El mango de bambú con cabeza de madera. ⚠️ Se golpea con el LADO de la cabeza, no con la punta. Y se sujeta siempre con la mano derecha, incluso los zurdos: es una regla, no una costumbre.",
          it:"Il manico di bambù con la testa di legno. ⚠️ Si colpisce con il LATO della testa, non con la punta. E si tiene sempre con la mano destra, anche i mancini: è una regola, non un'abitudine.",
          de:"Der Bambusstiel mit Holzkopf. ⚠️ Geschlagen wird mit der SEITE des Kopfes, nicht mit dem Ende. Und er wird immer rechts geführt, auch von Linkshändern: Das ist eine Regel, keine Gewohnheit.",
          ja:"竹の柄に木の頭がついた道具。⚠️ 打つのは頭の先端ではなく側面です。そして左利きでも必ず右手で持ちます。習慣ではなく、規則なのです。" } },

  { ref:"chukka", lecon:1, coll:"polo",
    mots:{ fr:{m:"la période"}, en:{m:"the chukka", p:"tcheu-ka"},
           es:{m:"el chukker"}, it:{m:"il chukker"},
           de:{m:"das Chukker", p:"tcheu-keur"}, ja:{m:"チャッカ", p:"chakka"} },
    def:{ fr:"⚠️ FAUX AMI. Sept minutes et demie de jeu. Le mot anglais n'a rien à voir avec « period » : on dit « the chukka », et un match en compte quatre, six ou huit selon le niveau.",
          en:"Seven and a half minutes of play. Never « the period »: it is the chukka, and a match has four, six or eight of them.",
          es:"⚠️ FALSO AMIGO. Siete minutos y medio de juego. La palabra inglesa no tiene nada que ver con « period »: se dice « the chukka », y un partido tiene cuatro, seis u ocho según el nivel.",
          it:"⚠️ FALSO AMICO. Sette minuti e mezzo di gioco. La parola inglese non c'entra con « period »: si dice « the chukka », e una partita ne conta quattro, sei o otto secondo il livello.",
          de:"⚠️ FALSCHER FREUND. Siebeneinhalb Minuten Spiel. Das englische Wort hat nichts mit « period » zu tun: Man sagt « the chukka », und ein Match hat vier, sechs oder acht davon, je nach Niveau.",
          ja:"⚠️ 偽りの友。七分半のプレー時間。英語では « period » とは無関係で、« the chukka » と言います。試合はレベルに応じて四、六、八チャッカで構成されます。" } },

  { ref:"monte-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"la monte"}, en:{m:"the pony", p:"pau-ni"},
           es:{m:"el petisero", var:"la montura"}, it:{m:"il cavallo da polo"},
           de:{m:"das Polopony"}, ja:{m:"ポロポニー", p:"poro ponī"} },
    def:{ fr:"⚠️ FAUX AMI, et le plus déroutant : le cheval de polo s'appelle « pony » en anglais, mais il mesure 1,55 m et ce n'est PAS un poney. Le mot est resté de l'époque où le jeu se jouait sur de petits chevaux indiens.",
          en:"The polo horse is called a pony but stands over fifteen hands and is not a pony. The word survives from when the game was played on small Indian horses.",
          es:"⚠️ FALSO AMIGO, y el más desconcertante: el caballo de polo se llama « pony » en inglés, pero mide 1,55 m y NO es un poni. La palabra quedó de la época en que el juego se jugaba con pequeños caballos indios.",
          it:"⚠️ FALSO AMICO, e il più sconcertante: il cavallo da polo si chiama « pony » in inglese, ma misura 1,55 m e NON è un pony. La parola è rimasta dall'epoca in cui il gioco si giocava su piccoli cavalli indiani.",
          de:"⚠️ FALSCHER FREUND, und der verwirrendste: Das Polopferd heißt auf Englisch « pony », misst aber 1,55 m und ist KEIN Pony. Das Wort stammt aus der Zeit, als das Spiel auf kleinen indischen Pferden gespielt wurde.",
          ja:"⚠️ 偽りの友、それも最も紛らわしいもの。ポロの馬は英語で « pony » と呼ばれますが、体高1.55m — ポニーではありません。小さなインドの馬で競技していた時代の名残です。" } },

  { ref:"changement-cheval", lecon:1, coll:"polo",
    mots:{ fr:{m:"le changement de cheval"}, en:{m:"the pony change", p:"pau-ni tchèndj"},
           es:{m:"el cambio de caballo"}, it:{m:"il cambio di cavallo"},
           de:{m:"der Pferdewechsel", p:"pfèr-de-vèk-seul"},
           ja:{m:"乗り替え", p:"norikae"} },
    def:{ fr:"On change de cheval à chaque période, parfois au milieu. Un joueur de haut niveau en aligne six à huit pour un seul match : le sport se joue autant sur l'écurie que sur le terrain.",
          en:"You change horse every chukka, sometimes mid-chukka. A high-goal player brings six to eight for one match: the sport is played on the string as much as on the field.",
          es:"Se cambia de caballo en cada período, a veces a mitad. Un jugador de alto nivel alinea de seis a ocho para un solo partido: el deporte se juega tanto en la cuadra como en el campo.",
          it:"Si cambia cavallo a ogni periodo, a volte a metà. Un giocatore di alto livello ne schiera da sei a otto per una sola partita: lo sport si gioca tanto in scuderia quanto in campo.",
          de:"Das Pferd wird jedes Chukker gewechselt, manchmal mittendrin. Ein Spitzenspieler bringt sechs bis acht für ein einziges Match mit: Der Sport wird im Stall ebenso gespielt wie auf dem Feld.",
          ja:"チャッカごとに、ときには途中でも馬を替えます。トップ選手は一試合に六〜八頭を用意します。この競技は、フィールドと同じくらい厩舎で戦われているのです。" } },

  { ref:"handicap", lecon:1, coll:"polo",
    mots:{ fr:{m:"le handicap"}, en:{m:"the handicap", p:"hann-di-kap", var:"the goals"},
           es:{m:"el handicap"}, it:{m:"l'handicap"},
           de:{m:"das Handicap"}, ja:{m:"ハンディキャップ", p:"handikyappu"} },
    def:{ fr:"La note du JOUEUR, de −2 à 10 « goals ». ⚠️ Elle ne mesure pas le cheval mais l'homme, et elle sert à équilibrer les équipes : on additionne les quatre handicaps pour classer une équipe. Dix goals, il y en a une poignée au monde.",
          en:"The PLAYER's rating, from −2 to 10 goals. It rates the man, not the horse, and the four are added up to rate a team. There is a handful of ten-goalers in the world.",
          es:"La nota del JUGADOR, de −2 a 10 « goals ». ⚠️ No mide al caballo sino al hombre, y sirve para equilibrar los equipos: se suman los cuatro handicaps para clasificar un equipo. De diez goals hay un puñado en el mundo.",
          it:"Il voto del GIOCATORE, da −2 a 10 « goals ». ⚠️ Non misura il cavallo ma l'uomo, e serve a equilibrare le squadre: si sommano i quattro handicap per classificare una squadra. Di dieci goals ce n'è una manciata al mondo.",
          de:"Die Note des SPIELERS, von −2 bis 10 « Goals ». ⚠️ Sie bewertet den Menschen, nicht das Pferd, und dient dem Ausgleich: Die vier Handicaps werden addiert, um ein Team einzustufen. Zehn-Goaler gibt es weltweit eine Handvoll.",
          ja:"選手につく評価。−2から10「ゴール」まで。⚠️ 馬ではなく人間を測るもので、チームの釣り合いを取るためにあります。四人のハンディを合計してチームの格が決まる。10ゴールの選手は、世界に一握りしかいません。" } },

  { ref:"ligne-de-balle", lecon:1, coll:"polo",
    mots:{ fr:{m:"la ligne de balle"}, en:{m:"the line of the ball", p:"laïne"},
           es:{m:"la línea de la bocha"}, it:{m:"la linea della palla"},
           de:{m:"die Balllinie", p:"bal-li-nie"},
           ja:{m:"ボールライン", p:"bōru rain"} },
    def:{ fr:"La trajectoire imaginaire que suit la balle. ⚠️ C'est LA règle du polo : celui qui a la ligne a la priorité, et la lui couper est la faute principale du jeu. Tout le reste s'apprend après.",
          en:"The imaginary path the ball is travelling on. It is THE rule of polo: whoever has the line has right of way, and crossing it is the game's cardinal foul.",
          es:"La trayectoria imaginaria que sigue la bola. ⚠️ Es LA regla del polo: quien tiene la línea tiene la prioridad, y cortársela es la falta principal del juego. Todo lo demás se aprende después.",
          it:"La traiettoria immaginaria che segue la palla. ⚠️ È LA regola del polo: chi ha la linea ha la precedenza, e tagliargliela è il fallo principale del gioco. Tutto il resto si impara dopo.",
          de:"Die gedachte Bahn, auf der der Ball läuft. ⚠️ DIE Regel des Polo: Wer die Linie hat, hat Vorfahrt — sie zu kreuzen ist das Hauptfoul des Spiels. Alles andere lernt man danach.",
          ja:"ボールが進む、目に見えない軌道。⚠️ これこそポロの根本規則です。ラインを持つ者に優先権があり、それを横切ることが最大の反則。ほかのすべては、その後に学べばいいのです。" } },

  { ref:"balle-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"la balle"}, en:{m:"the ball", p:"bôl"},
           es:{m:"la bocha"}, it:{m:"la palla"},
           de:{m:"der Ball", p:"bal"}, ja:{m:"ボール", p:"bōru"} },
    def:{ fr:"Une boule de plastique dur d'un peu plus de huit centimètres. ⚠️ En Argentine on ne dit pas « la pelota » mais « la bocha » — un mot qui n'appartient qu'à ce sport.",
          en:"A hard plastic ball a little over three inches across. In Argentina it is « la bocha », a word that belongs to this sport alone.",
          es:"Una bola de plástico duro de poco más de ocho centímetros. ⚠️ En Argentina no se dice « la pelota » sino « la bocha » — una palabra que solo pertenece a este deporte.",
          it:"Una palla di plastica dura di poco più di otto centimetri. ⚠️ In Argentina non si dice « la pelota » ma « la bocha » — una parola che appartiene solo a questo sport.",
          de:"Eine harte Plastikkugel von gut acht Zentimetern. ⚠️ In Argentinien sagt man nicht « la pelota », sondern « la bocha » — ein Wort, das nur diesem Sport gehört.",
          ja:"直径八センチあまりの硬いプラスチックの球。⚠️ アルゼンチンでは « la pelota » ではなく « la bocha » と言います。この競技だけの言葉です。" } },

  { ref:"but-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le but"}, en:{m:"the goal", p:"gôle"},
           es:{m:"el gol"}, it:{m:"il gol"},
           de:{m:"das Tor", p:"tor"}, ja:{m:"ゴール", p:"gōru"} },
    def:{ fr:"⚠️ Après chaque but, les équipes CHANGENT DE CÔTÉ. C'est propre au polo, et ça déroute tous ceux qui viennent d'un autre sport : le camp qu'on défend n'est jamais le même deux fois de suite.",
          en:"After every goal the teams CHANGE ENDS. It is peculiar to polo, and it confuses everyone arriving from another sport.",
          es:"⚠️ Tras cada gol, los equipos CAMBIAN DE LADO. Es propio del polo, y desconcierta a todos los que vienen de otro deporte: el campo que se defiende nunca es el mismo dos veces seguidas.",
          it:"⚠️ Dopo ogni gol, le squadre CAMBIANO CAMPO. È proprio del polo, e spiazza tutti quelli che vengono da un altro sport: la porta che si difende non è mai la stessa due volte di fila.",
          de:"⚠️ Nach jedem Tor WECHSELN die Teams die SEITE. Das ist Polo-eigen und verwirrt jeden, der von einem anderen Sport kommt: Man verteidigt nie zweimal hintereinander dieselbe Seite.",
          ja:"⚠️ ゴールが決まるたび、両チームは陣地を交替します。ポロ独特のルールで、他競技から来た人は必ず面食らいます。守るゴールが二度続けて同じことはないのです。" } },

  { ref:"arbitre-monte", lecon:1, coll:"polo",
    mots:{ fr:{m:"l'arbitre monté"}, en:{m:"the mounted umpire", p:"eum-païr"},
           es:{m:"el árbitro montado"}, it:{m:"l'arbitro a cavallo"},
           de:{m:"der reitende Schiedsrichter", p:"chidss-rikh-teur"},
           ja:{m:"騎乗審判", p:"kijō shinpan"} },
    def:{ fr:"Deux arbitres jouent au milieu, à cheval, au galop avec les joueurs. ⚠️ « Umpire » et non « referee » : le troisième arbitre, à pied au bord, s'appelle lui « the referee » et ne tranche qu'en cas de désaccord.",
          en:"Two umpires ride in the game, galloping with the players. « Umpire », not « referee »: the third official, on foot at the side, is the referee and only settles disagreements.",
          es:"Dos árbitros juegan en medio, a caballo, al galope con los jugadores. ⚠️ « Umpire » y no « referee »: el tercer árbitro, a pie en el borde, se llama « the referee » y solo decide en caso de desacuerdo.",
          it:"Due arbitri giocano in mezzo, a cavallo, al galoppo con i giocatori. ⚠️ « Umpire » e non « referee »: il terzo arbitro, a piedi a bordo campo, si chiama « the referee » e decide solo in caso di disaccordo.",
          de:"Zwei Schiedsrichter reiten mitten im Spiel, im Galopp mit den Spielern. ⚠️ « Umpire », nicht « referee »: Der dritte Offizielle, zu Fuß am Rand, heißt « the referee » und entscheidet nur bei Uneinigkeit.",
          ja:"二人の審判が馬上で、選手たちと同じ駈歩でゲームの中を走ります。⚠️ « referee » ではなく « umpire »。場外に立つ三人目こそが « the referee » で、二人の意見が割れたときだけ裁定します。" } },

  { ref:"bandes", lecon:1, coll:"polo",
    mots:{ fr:{m:"les bandes"}, en:{m:"the bandages", p:"bann-didjes"},
           es:{m:"las vendas"}, it:{m:"le fasce"},
           de:{m:"die Bandagen", p:"bann-da-gueune"}, ja:{m:"バンテージ", p:"bantēji"} },
    def:{ fr:"Les quatre membres bandés serré, à chaque match. Ce n'est pas décoratif : le maillet passe sous le ventre et frôle les jambes, et une balle lancée à cent kilomètres-heure ne prévient pas.",
          en:"All four legs bandaged tight, every match. Not decoration: the mallet passes under the belly and grazes the legs, and a ball at sixty miles an hour gives no warning.",
          es:"Las cuatro extremidades vendadas apretadas, en cada partido. No es decorativo: el mazo pasa bajo el vientre y roza las patas, y una bola a cien por hora no avisa.",
          it:"I quattro arti fasciati stretti, a ogni partita. Non è decorativo: la stecca passa sotto il ventre e sfiora le gambe, e una palla a cento all'ora non avvisa.",
          de:"Alle vier Beine fest bandagiert, bei jedem Match. Keine Zierde: Der Schläger geht unter dem Bauch durch und streift die Beine, und ein Ball mit hundert Sachen warnt nicht vor.",
          ja:"四本の脚すべてに、試合のたびきつく巻くバンテージ。飾りではありません。マレットは腹の下を通って脚をかすめ、時速百キロのボールは前触れなく飛んでくるのです。" } },

  { ref:"queue-nattee", lecon:1, coll:"polo",
    mots:{ fr:{m:"la queue nattée"}, en:{m:"the tail tied up", p:"tèil taïd"},
           es:{m:"la cola atada"}, it:{m:"la coda legata"},
           de:{m:"der aufgebundene Schweif", p:"chvaïf"},
           ja:{m:"結んだ尾", p:"musunda o"} },
    def:{ fr:"La queue tressée et repliée sur elle-même. La raison est mécanique et non esthétique : une queue libre attrape le maillet, et un maillet pris dans une queue arrache la main du joueur.",
          en:"The tail plaited and folded back on itself. The reason is mechanical, not tidy: a loose tail catches the mallet, and a caught mallet tears the player's hand away.",
          es:"La cola trenzada y replegada sobre sí misma. La razón es mecánica y no estética: una cola suelta atrapa el mazo, y un mazo atrapado en una cola arranca la mano del jugador.",
          it:"La coda intrecciata e ripiegata su se stessa. La ragione è meccanica e non estetica: una coda libera cattura la stecca, e una stecca presa in una coda strappa la mano del giocatore.",
          de:"Der geflochtene, hochgebundene Schweif. Der Grund ist mechanisch, nicht ästhetisch: Ein freier Schweif fängt den Schläger — und ein gefangener Schläger reißt dem Spieler die Hand weg.",
          ja:"編んで折り返した尾。理由は美観ではなく力学です。ほどけた尾はマレットを絡め取り、絡んだマレットは選手の手をもぎ取ります。" } },

  { ref:"criollo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le criollo"}, en:{m:"the Criollo", p:"kri-o-yo"},
           es:{m:"el criollo"}, it:{m:"il criollo"},
           de:{m:"der Criollo"}, ja:{m:"クリオージョ", p:"kuriōjo"} },
    def:{ fr:"La race argentine, compacte et increvable, à l'origine du cheval de polo moderne par croisement avec le pur-sang. C'est elle qui a fait de l'Argentine le pays du polo, et non l'inverse.",
          en:"The Argentine breed, compact and tireless, at the origin of the modern polo pony through crossing with the Thoroughbred. It is what made Argentina the country of polo, not the other way round.",
          es:"La raza argentina, compacta e incansable, en el origen del caballo de polo moderno por cruce con el purasangre. Es ella la que hizo de Argentina el país del polo, y no al revés.",
          it:"La razza argentina, compatta e instancabile, all'origine del cavallo da polo moderno per incrocio con il purosangue. È lei che ha fatto dell'Argentina il paese del polo, e non il contrario.",
          de:"Die argentinische Rasse, kompakt und unverwüstlich, durch Kreuzung mit dem Vollblut der Ursprung des modernen Polopferds. SIE machte Argentinien zum Land des Polo — nicht umgekehrt.",
          ja:"アルゼンチンの馬種。小柄で頑健、サラブレッドとの交配で現代のポロポニーを生み出しました。アルゼンチンをポロの国にしたのはこの馬たちであって、その逆ではありません。" } }

  ],

  phrases: [

  { ref:"ph-polo-periode", lecon:1,
      fr:"On est à quelle période ?",
      en:"Which chukka are we in ?",
      es:"¿ En qué chukker estamos ?",
      it:"A quale chukker siamo ?",
      de:"In welchem Chukker sind wir ?",
      ja:"今 は 何 チャッカ 目 です か ?" },

  { ref:"ph-polo-ligne", lecon:1,
      fr:"Il a la ligne, laisse-le passer.",
      en:"He has the line, let him through.",
      es:"Tiene la línea, déjalo pasar.",
      it:"Ha la linea, lascialo passare.",
      de:"Er hat die Linie, lass ihn durch.",
      ja:"彼 が ライン を 持っ て い ます。 通し て ください。" },

  { ref:"ph-polo-changer", lecon:1,
      fr:"Tu changes de cheval à chaque période ?",
      en:"Do you change ponies every chukka ?",
      es:"¿ Cambias de caballo en cada chukker ?",
      it:"Cambi cavallo a ogni chukker ?",
      de:"Wechselst du in jedem Chukker das Pferd ?",
      ja:"チャッカ ごと に 馬 を 替え ます か ?" },

  { ref:"ph-polo-handicap", lecon:1,
      fr:"Ton handicap, c'est combien ?",
      en:"What is your handicap ?",
      es:"¿ Cuál es tu handicap ?",
      it:"Qual è il tuo handicap ?",
      de:"Wie hoch ist dein Handicap ?",
      ja:"ハンディキャップ は いくつ です か ?" }

  ]
};
