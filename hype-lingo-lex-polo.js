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

  /* ================================================================
     CINQ ENTRÉES AJOUTÉES le 17/08/2026, d'après le lexique fourni par
     Blandine. Le chapitre avait les objets et les règles, mais il lui
     manquait L'ÉQUIPE — or le polo est le seul sport d'équipe de tout le
     module, et c'est ce qui le rend unique.

     🟥 LES QUATRE POSTES, ET CE QU'ILS FONT — sa remarque, et elle est
     juste : chaque numéro a un rôle, ce n'est pas un simple rang.
       N°1 → plutôt offensif        N°2 → attaque et soutien
       N°3 → l'organisateur, le pivot du jeu, souvent le meilleur
       N°4 → plutôt défensif, il ferme derrière
     ⚠️ On dit « je joue numéro trois », jamais « je suis le troisième ».

     🟥 ET LE SYSTÈME DU HANDICAP, à ne pas confondre avec autre chose :
       joueur 1 + joueur 2 + joueur 3 + joueur 4 = handicap d'équipe
     Quand l'écart entre deux équipes est trop grand, le règlement
     attribue des buts d'avance pour équilibrer le match.
     ================================================================ */

  { ref:"equipe-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"l'équipe"}, en:{m:"the team", p:"tiime"},
           es:{m:"el equipo"}, it:{m:"la squadra"},
           de:{m:"die Mannschaft", p:"mann-chaft"}, ja:{m:"チーム", p:"chīmu"} },
    def:{ fr:"🟥 QUATRE JOUEURS, ET C'EST LE SEUL SPORT D'ÉQUIPE DE TOUT LE MODULE. Chacun a un poste numéroté, chacun a plusieurs chevaux, et le handicap de l'équipe est la somme des quatre. ⚠️ Ne pas confondre avec la Coupe des Nations de Rome : là on additionne des scores individuels, ici on joue ensemble, en même temps, sur le même terrain.",
          en:"Four players, and the only team sport in the whole module. Each has a numbered position, each has several horses, and the team handicap is the sum of the four. Not the same as a Nations Cup: there you add up individual scores, here you play together, at the same time, on the same field.",
          es:"Cuatro jugadores, y el único deporte de equipo del módulo. Cada uno tiene un puesto numerado y varios caballos, y el hándicap del equipo es la suma de los cuatro.",
          it:"Quattro giocatori, e l'unico sport di squadra del modulo. Ognuno ha un ruolo numerato e più cavalli, e l'handicap della squadra è la somma dei quattro.",
          de:"Vier Spieler, und die einzige Mannschaftssportart des Moduls. Jeder hat eine nummerierte Position und mehrere Pferde; das Team-Handicap ist die Summe der vier.",
          ja:"四人。このアプリで唯一の団体競技です。各自が番号のついたポジションを持ち、複数の馬を用意します。チームのハンディキャップは四人の合計です。" } },

  { ref:"joueur-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le joueur de polo"}, en:{m:"the polo player", p:"pô-lô plé-yeur"},
           es:{m:"el jugador de polo"}, it:{m:"il giocatore di polo"},
           de:{m:"der Polospieler", p:"pô-lô-chpî-leur"}, ja:{m:"ポロ選手", p:"poro senshu"} },
    def:{ fr:"⚠️ EN ARGENTINE ON DIT AUSSI **el polista**, un mot qui n'existe qu'en espagnol et qui dit tout : quelqu'un dont c'est le métier. Le pays compte les meilleurs joueurs du monde, et les seuls handicap 10 en activité y sont presque tous nés.",
          en:"In Argentina they also say « el polista », a word that exists only in Spanish and says everything: someone whose trade this is. The country has the best players in the world.",
          es:"En Argentina se dice también « el polista », palabra que solo existe en español y lo dice todo: alguien cuyo oficio es este.",
          it:"In Argentina si dice anche « el polista », parola che esiste solo in spagnolo e dice tutto: qualcuno il cui mestiere è questo.",
          de:"In Argentinien sagt man auch « el polista » — ein Wort, das es nur im Spanischen gibt und alles sagt: jemand, dessen Beruf das ist.",
          ja:"アルゼンチンでは el polista とも言います。スペイン語にしかない語で、それを職業とする人を指します。世界最高の選手たちがこの国にいます。" } },

  { ref:"poste-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le poste", var:"la position"}, en:{m:"the position", p:"pe-zi-cheune"},
           es:{m:"la posición"}, it:{m:"il ruolo"},
           de:{m:"die Position", p:"pô-zi-tsione"}, ja:{m:"ポジション", p:"pojishon"} },
    def:{ fr:"🟥 CHAQUE NUMÉRO A UN RÔLE, ce n'est pas un rang. **Le 1** joue devant et cherche le but. **Le 2** attaque et soutient. **Le 3** est le pivot : il organise le jeu, et c'est souvent le meilleur handicap de l'équipe. **Le 4** ferme derrière. ⚠️ On dit « je joue numéro trois », jamais « je suis le troisième ».",
          en:"Each number is a role, not a rank. Number one plays forward and looks for goal. Number two attacks and supports. Number three is the pivot who organises the game, usually the highest handicap. Number four closes at the back. Say « I play number three », never « I'm the third ».",
          es:"Cada número es un papel, no un rango. El uno juega adelante, el dos ataca y apoya, el tres organiza el juego, el cuatro cierra atrás.",
          it:"Ogni numero è un ruolo, non un rango. L'uno gioca avanti, il due attacca e sostiene, il tre organizza il gioco, il quattro chiude dietro.",
          de:"Jede Nummer ist eine Rolle, kein Rang. Die Eins spielt vorne, die Zwei greift an und unterstützt, die Drei organisiert das Spiel, die Vier sichert hinten.",
          ja:"番号は順位ではなく役割です。1 番は前線で得点を狙い、2 番は攻撃と支援、3 番は試合を組み立てる要でたいてい最も強い選手、4 番は後方を締めます。「三番を務める」と言い、「三番目だ」とは言いません。" } },

  { ref:"marquer-joueur", lecon:1, coll:"polo", v:true,
    mots:{ fr:{m:"marquer un joueur"}, en:{m:"to mark a player", p:"mark e plé-yeur"},
           es:{m:"marcar a un jugador"}, it:{m:"marcare un giocatore"},
           de:{m:"einen Spieler decken", p:"dè-keune"}, ja:{m:"相手をマークする", p:"aite o māku suru"} },
    def:{ fr:"⚠️ PIÈGE DU FRANÇAIS : « marquer » veut dire deux choses opposées — marquer un BUT, et marquer un JOUEUR pour l'empêcher d'en marquer. L'anglais sépare : *to score* pour le but, *to mark* pour le joueur. L'allemand aussi : *treffen* et *decken*. 🟥 Au polo on marque son homologue : le 1 marque le 4 adverse, le 2 marque le 3.",
          en:"A French trap: « marquer » means both to score a goal and to mark a player. English separates them: to score, to mark. In polo you mark your opposite number: the one marks the other side's four, the two marks the three.",
          es:"Trampa del francés: « marquer » significa marcar un gol y marcar a un jugador. En polo se marca al opuesto: el uno al cuatro contrario, el dos al tres.",
          it:"Trappola del francese: « marquer » vuol dire segnare e marcare. Nel polo si marca il proprio omologo: l'uno marca il quattro avversario.",
          de:"Falle im Französischen: « marquer » heißt sowohl ein Tor erzielen als auch einen Spieler decken. Im Polo deckt man seinen Gegenüber.",
          ja:"フランス語の罠。marquer は「得点する」と「相手をマークする」の両方を意味します。英語では score と mark に分かれます。ポロでは対応する番号の相手をマークします。1 番は相手の 4 番を、2 番は 3 番を見ます。" } },

  { ref:"cloche-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"la cloche"}, en:{m:"the bell", p:"bèl"},
           es:{m:"la campana"}, it:{m:"la campana"},
           de:{m:"die Glocke", p:"glo-ke"}, ja:{m:"ベル", p:"beru"} },
    def:{ fr:"🟥 ELLE SONNE DEUX FOIS, et c'est ce qui surprend. La première annonce la fin du temps réglementaire du chukka — sept minutes en Argentine — mais **le jeu continue** jusqu'à trente secondes de plus, ou jusqu'à ce que la balle sorte ou qu'une faute soit sifflée. La seconde cloche arrête vraiment. ⚠️ D'où les buts marqués « juste avant la cloche », qui sont parfaitement valables.",
          en:"It rings twice, and that's what surprises. The first bell ends the chukka's regulation time — seven minutes in Argentina — but play continues for up to thirty seconds more, or until the ball goes out or a foul is called. The second bell really stops it.",
          es:"Suena dos veces. La primera acaba el tiempo reglamentario del chukka — siete minutos en Argentina — pero el juego sigue hasta treinta segundos más.",
          it:"Suona due volte. La prima chiude il tempo regolamentare del chukka — sette minuti in Argentina — ma il gioco continua fino a trenta secondi in più.",
          de:"Sie läutet zweimal. Die erste beendet die reguläre Zeit des Chukkas — sieben Minuten in Argentinien — aber gespielt wird bis zu dreißig Sekunden weiter.",
          ja:"鐘は二度鳴ります。これが意外なところです。一度目はチャッカの規定時間（アルゼンチンでは七分）の終わりを告げますが、最大三十秒は試合が続きます。二度目で本当に終了です。だから「ベルの直前の得点」は有効なのです。" } },

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
      fr:"Tu changes de cheval chaque période ?",
      en:"Do you change ponies every chukka ?",
      es:"¿ Cambias de caballo cada chukker ?",
      it:"Cambi cavallo a ogni chukker ?",
      de:"Wechselst du jedes Chukker das Pferd ?",
      ja:"チャッカ ごと に 馬 を 替え ます か ?" },

  { ref:"ph-polo-handicap", lecon:1,
      fr:"Ton handicap, c'est combien ?",
      en:"What is your handicap ?",
      es:"¿ Cuál es tu handicap ?",
      it:"Qual è il tuo handicap ?",
      de:"Wie hoch ist dein Handicap ?",
      ja:"ハンディキャップ は いくつ です か ?" }

  ],

  /* ==================================================================
     LE DIALOGUE DE BUENOS AIRES — 17 août 2026, session 214.

     LA SCÈNE : un match, du premier chukka à la dernière cloche.
     20 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT SONT DE BLANDINE, avec leur traduction
     anglaise, et son lexique complet du polo.

     🟥 CE QUI REND CE CHAPITRE UNIQUE : c'est LE SEUL SPORT D'ÉQUIPE de
     tout le module — quatre joueurs sur le terrain en même temps, contre
     quatre autres. Rome est une épreuve par équipe, mais on y passe l'un
     après l'autre. Ici on joue ensemble.
     ⚠️ Et c'est le seul chapitre où LE CHEVAL SE CHANGE EN COURS DE
     PARTIE : un par chukka, parfois plus. Le cheval n'est pas seulement
     la monture, c'est une ressource qu'on gère.

     🟥🟥 LE PIÈGE DU CHAPITRE, souligné par elle :
     **« HE IS A TEN-GOAL PLAYER » NE VEUT PAS DIRE QU'IL MARQUE DIX
     BUTS.** *Goal* désigne ici sa valeur de HANDICAP, de -2 à 10. Le
     handicap n'a rien d'un handicap au sens ordinaire : c'est une note
     de niveau, et la somme des quatre donne celui de l'équipe.
       joueur 1 + joueur 2 + joueur 3 + joueur 4 = handicap d'équipe
     ⚠️ Il n'y a jamais eu plus d'une douzaine de joueurs à 10 dans le
     monde en même temps, et presque tous sont argentins.

     ⚠️ SECOND PIÈGE, en français celui-là : **MARQUER** veut dire deux
     choses opposées — marquer un BUT, et marquer un JOUEUR pour
     l'empêcher d'en marquer. L'anglais sépare : *to score* et *to mark*.
     Deux phrases du dialogue les mettent à trois lignes d'écart, exprès.

     ⚠️ ET LA LIGNE DE LA BALLE est la règle de sécurité du polo, pas une
     règle de jeu : la couper, c'est risquer une collision à quarante à
     l'heure. « Ne coupe pas la ligne, c'est dangereux » est la phrase la
     plus importante du chapitre.

     `dit` : "joueuse" = elle produit · "club" = un coéquipier, le
     capitaine.
  ================================================================== */
  dialogue: {
    ville: "buenos", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · l'équipe ---- */
      { ref:"dp-combien-joueurs", temps:1, dit:"joueuse", mots:["equipe-polo","joueur-polo"],
        fr:"Combien de joueurs y a-t-il dans chaque équipe ?",
        en:"How many players are there on each team?",
        es:"¿Cuántos jugadores hay en cada equipo?",
        it:"Quanti giocatori ci sono in ogni squadra?",
        de:"Wie viele Spieler hat jede Mannschaft?",
        ja:"各 チーム に は 何 人 の 選手 が い ます か ?" },

      { ref:"dp-r-quatre-joueurs", temps:1, dit:"club", mots:["equipe-polo","joueur-polo"],
        fr:"Chaque équipe est composée de quatre joueurs.",
        en:"Each team is made up of four players.",
        es:"Cada equipo está formado por cuatro jugadores.",
        it:"Ogni squadra è composta da quattro giocatori.",
        de:"Jede Mannschaft besteht aus vier Spielern.",
        ja:"各 チーム は 四 人 の 選手 で 構成 さ れ ます。" },

      { ref:"dp-quel-poste", temps:1, dit:"joueuse", mots:["poste-polo","equipe-polo"],
        fr:"Quel poste joues-tu dans l'équipe ?",
        en:"What position do you play on the team?",
        es:"¿Qué puesto juegas en el equipo?",
        it:"Che ruolo giochi in squadra?",
        de:"Welche Position spielst du in der Mannschaft?",
        ja:"チーム で は どの ポジション を 務め ます か ?" },

      { ref:"dp-r-numero-trois", temps:1, dit:"club", mots:["poste-polo"],
        fr:"Je joue numéro trois aujourd'hui.",
        en:"I'm playing number three today.",
        es:"Hoy juego de número tres.",
        it:"Oggi gioco numero tre.",
        de:"Heute spiele ich die Drei.",
        ja:"今日 は 三 番 を 務め ます。" },

      /* ---- temps 2 · le handicap ---- */
      { ref:"dp-ton-handicap", temps:2, dit:"joueuse", mots:["handicap"],
        fr:"Quel est ton handicap au polo ?",
        en:"What is your polo handicap?",
        es:"¿Cuál es tu hándicap de polo?",
        it:"Qual è il tuo handicap nel polo?",
        de:"Wie hoch ist dein Polo-Handicap?",
        ja:"ポロ の ハンディキャップ は いくつ です か ?" },

      { ref:"dp-r-handicap-total", temps:2, dit:"club", mots:["handicap","equipe-polo"],
        fr:"Le handicap total de notre équipe est plus élevé.",
        en:"Our team has a higher total handicap.",
        es:"El hándicap total de nuestro equipo es más alto.",
        it:"L'handicap totale della nostra squadra è più alto.",
        de:"Unser Team hat ein höheres Gesamthandicap.",
        ja:"私たち の チーム の 合計 ハンディキャップ の ほう が 高い です。" },

      /* ---- temps 3 · les chukkas et les chevaux ---- */
      { ref:"dp-troisieme-chukka", temps:3, dit:"club", mots:["chukka"],
        fr:"Nous commençons le troisième chukka.",
        en:"We're starting the third chukka.",
        es:"Empezamos el tercer chukker.",
        it:"Iniziamo il terzo chukka.",
        de:"Wir beginnen den dritten Chukka.",
        ja:"第 三 チャッカ を 始め ます。" },

      { ref:"dp-deux-chukkas", temps:3, dit:"club", mots:["chukka"],
        fr:"Il reste deux chukkas à jouer.",
        en:"There are two chukkas left to play.",
        es:"Quedan dos chukkers por jugar.",
        it:"Restano due chukka da giocare.",
        de:"Es sind noch zwei Chukkas zu spielen.",
        ja:"あと 二 チャッカ 残っ て い ます。" },

      { ref:"dp-changer-cheval", temps:3, dit:"joueuse", mots:["changement-cheval","chukka","monte-polo"],
        fr:"Je vais changer de cheval pour le prochain chukka.",
        en:"I'm going to change horses for the next chukka.",
        es:"Voy a cambiar de caballo para el próximo chukker.",
        it:"Cambio cavallo per il prossimo chukka.",
        de:"Für den nächsten Chukka wechsle ich das Pferd.",
        ja:"次 の チャッカ で は 馬 を 替え ます。" },

      { ref:"dp-garde-pour-fin", temps:3, dit:"joueuse", mots:["monte-polo","changement-cheval"],
        fr:"Ce cheval est plus rapide, je le garde pour la fin du match.",
        en:"This horse is faster, so I'm saving him for the end of the match.",
        es:"Este caballo es más rápido: lo guardo para el final del partido.",
        it:"Questo cavallo è più veloce: lo tengo per la fine della partita.",
        de:"Dieses Pferd ist schneller — ich spare es für das Spielende auf.",
        ja:"この 馬 は 速い ので、 試合 の 終盤 に 取っ て おき ます。" },

      /* ---- temps 4 · la ligne de la balle ---- */
      { ref:"dp-reste-sur-ligne", temps:4, dit:"club", mots:["ligne-de-balle","balle-polo"],
        fr:"Reste sur la ligne de la balle.",
        en:"Stay on the line of the ball.",
        es:"Quédate en la línea de la bocha.",
        it:"Resta sulla linea della palla.",
        de:"Bleib auf der Linie des Balls.",
        ja:"ボール の ライン 上 に 留まっ て ください。" },

      /* 🟥 La phrase la plus importante du chapitre. */
      { ref:"dp-pas-couper-ligne", temps:4, dit:"club", mots:["ligne-de-balle"],
        fr:"Ne coupe pas la ligne, c'est dangereux.",
        en:"Don't cross the line; it's dangerous.",
        es:"No cruces la línea: es peligroso.",
        it:"Non tagliare la linea: è pericoloso.",
        de:"Kreuze die Linie nicht, das ist gefährlich.",
        ja:"ライン を 横切ら ない で。 危険 です。" },

      { ref:"dp-marquage-joueur", temps:4, dit:"club", mots:["marquer-joueur","joueur-polo"],
        fr:"Prends le marquage de ce joueur.",
        en:"Mark that player.",
        es:"Marca a ese jugador.",
        it:"Marca quel giocatore.",
        de:"Deck diesen Spieler.",
        ja:"あの 選手 を マーク し て ください。" },

      { ref:"dp-envoie-avant", temps:4, dit:"club", mots:["balle-polo","maillet"],
        fr:"Envoie la balle vers l'avant.",
        en:"Hit the ball forward.",
        es:"Manda la bocha hacia adelante.",
        it:"Manda la palla in avanti.",
        de:"Spiel den Ball nach vorn.",
        ja:"ボール を 前 に 送っ て ください。" },

      /* ---- temps 5 · le score ---- */
      { ref:"dp-but-avant-cloche", temps:5, dit:"club", mots:["but-polo","cloche-polo"],
        fr:"Il a marqué un but juste avant la cloche.",
        en:"He scored a goal just before the bell.",
        es:"Marcó un gol justo antes de la campana.",
        it:"Ha segnato un gol appena prima della campana.",
        de:"Er hat kurz vor der Glocke ein Tor erzielt.",
        ja:"ベル の 直前 に 得点 し まし た。" },

      { ref:"dp-menons-un-but", temps:5, dit:"club", mots:["but-polo","equipe-polo"],
        fr:"Nous menons d'un but.",
        en:"We're leading by one goal.",
        es:"Vamos ganando por un gol.",
        it:"Siamo in vantaggio di un gol.",
        de:"Wir führen mit einem Tor.",
        ja:"一 点 リード し て い ます。" },

      { ref:"dp-garde-possession", temps:5, dit:"club", mots:["balle-polo","cloche-polo"],
        fr:"Il reste très peu de temps, garde la possession.",
        en:"There's very little time left; keep possession.",
        es:"Queda muy poco tiempo: mantén la posesión.",
        it:"Resta pochissimo tempo: mantieni il possesso.",
        de:"Es bleibt sehr wenig Zeit — halte den Ball.",
        ja:"時間 が ほとんど あり ませ ん。 ボール を 保持 し て ください。" },

      { ref:"dp-marquer-ce-chukka", temps:5, dit:"club", mots:["but-polo","chukka"],
        fr:"Nous devons marquer dans ce chukka pour revenir au score.",
        en:"We need to score in this chukka to get back into the game.",
        es:"Tenemos que marcar en este chukker para volver al partido.",
        it:"Dobbiamo segnare in questo chukka per rientrare in partita.",
        de:"Wir müssen in diesem Chukka treffen, um zurückzukommen.",
        ja:"この チャッカ で 得点 し て、 試合 に 戻ら なけれ ば なり ませ ん。" },

      /* ---- temps 6 · après le match ---- */
      { ref:"dp-dix-goals", temps:6, dit:"joueuse", mots:["handicap","joueur-polo"],
        fr:"Il est handicap dix ; cela ne veut pas dire qu'il marque dix buts.",
        en:"He's a ten-goal player — that doesn't mean he scores ten goals.",
        es:"Es un jugador de hándicap diez: no significa que marque diez goles.",
        it:"È un giocatore handicap dieci: non vuol dire che segna dieci gol.",
        de:"Er ist ein Zehn-Goal-Spieler — das heißt nicht, dass er zehn Tore schießt.",
        ja:"彼 は ハンディキャップ 十 の 選手 です。 十 点 取る と いう 意味 で は あり ませ ん。" },

      { ref:"dp-combien-chevaux", temps:6, dit:"joueuse", mots:["monte-polo","changement-cheval","chukka"],
        fr:"Combien de chevaux faut-il pour jouer un match entier ?",
        en:"How many horses do you need to play a whole match?",
        es:"¿Cuántos caballos hacen falta para jugar un partido entero?",
        it:"Quanti cavalli servono per giocare una partita intera?",
        de:"Wie viele Pferde braucht man für ein ganzes Spiel?",
        ja:"一 試合 を 通し て 戦う に は、 何 頭 の 馬 が 必要 です か ?" }
    ]
  }
};
