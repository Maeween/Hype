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
          en:"The bamboo handle with a wooden head. You strike with the SIDE of the head, not the end. It is always held in the right hand, even by left-handers: that is a rule." } },

  { ref:"chukka", lecon:1, coll:"polo",
    mots:{ fr:{m:"la période"}, en:{m:"the chukka", p:"tcheu-ka"},
           es:{m:"el chukker"}, it:{m:"il chukker"},
           de:{m:"das Chukker", p:"tcheu-keur"}, ja:{m:"チャッカ", p:"chakka"} },
    def:{ fr:"⚠️ FAUX AMI. Sept minutes et demie de jeu. Le mot anglais n'a rien à voir avec « period » : on dit « the chukka », et un match en compte quatre, six ou huit selon le niveau.",
          en:"Seven and a half minutes of play. Never « the period »: it is the chukka, and a match has four, six or eight of them." } },

  { ref:"monte-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"la monte"}, en:{m:"the pony", p:"pau-ni"},
           es:{m:"el petisero", var:"la montura"}, it:{m:"il cavallo da polo"},
           de:{m:"das Polopony"}, ja:{m:"ポロポニー", p:"poro ponī"} },
    def:{ fr:"⚠️ FAUX AMI, et le plus déroutant : le cheval de polo s'appelle « pony » en anglais, mais il mesure 1,55 m et ce n'est PAS un poney. Le mot est resté de l'époque où le jeu se jouait sur de petits chevaux indiens.",
          en:"The polo horse is called a pony but stands over fifteen hands and is not a pony. The word survives from when the game was played on small Indian horses." } },

  { ref:"changement-cheval", lecon:1, coll:"polo",
    mots:{ fr:{m:"le changement de cheval"}, en:{m:"the pony change", p:"pau-ni tchèndj"},
           es:{m:"el cambio de caballo"}, it:{m:"il cambio di cavallo"},
           de:{m:"der Pferdewechsel", p:"pfèr-de-vèk-seul"},
           ja:{m:"乗り替え", p:"norikae"} },
    def:{ fr:"On change de cheval à chaque période, parfois au milieu. Un joueur de haut niveau en aligne six à huit pour un seul match : le sport se joue autant sur l'écurie que sur le terrain.",
          en:"You change horse every chukka, sometimes mid-chukka. A high-goal player brings six to eight for one match: the sport is played on the string as much as on the field." } },

  { ref:"handicap", lecon:1, coll:"polo",
    mots:{ fr:{m:"le handicap"}, en:{m:"the handicap", p:"hann-di-kap", var:"the goals"},
           es:{m:"el handicap"}, it:{m:"l'handicap"},
           de:{m:"das Handicap"}, ja:{m:"ハンディキャップ", p:"handikyappu"} },
    def:{ fr:"La note du JOUEUR, de −2 à 10 « goals ». ⚠️ Elle ne mesure pas le cheval mais l'homme, et elle sert à équilibrer les équipes : on additionne les quatre handicaps pour classer une équipe. Dix goals, il y en a une poignée au monde.",
          en:"The PLAYER's rating, from −2 to 10 goals. It rates the man, not the horse, and the four are added up to rate a team. There is a handful of ten-goalers in the world." } },

  { ref:"ligne-de-balle", lecon:1, coll:"polo",
    mots:{ fr:{m:"la ligne de balle"}, en:{m:"the line of the ball", p:"laïne"},
           es:{m:"la línea de la bocha"}, it:{m:"la linea della palla"},
           de:{m:"die Balllinie", p:"bal-li-nie"},
           ja:{m:"ボールライン", p:"bōru rain"} },
    def:{ fr:"La trajectoire imaginaire que suit la balle. ⚠️ C'est LA règle du polo : celui qui a la ligne a la priorité, et la lui couper est la faute principale du jeu. Tout le reste s'apprend après.",
          en:"The imaginary path the ball is travelling on. It is THE rule of polo: whoever has the line has right of way, and crossing it is the game's cardinal foul." } },

  { ref:"balle-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"la balle"}, en:{m:"the ball", p:"bôl"},
           es:{m:"la bocha"}, it:{m:"la palla"},
           de:{m:"der Ball", p:"bal"}, ja:{m:"ボール", p:"bōru"} },
    def:{ fr:"Une boule de plastique dur d'un peu plus de huit centimètres. ⚠️ En Argentine on ne dit pas « la pelota » mais « la bocha » — un mot qui n'appartient qu'à ce sport.",
          en:"A hard plastic ball a little over three inches across. In Argentina it is « la bocha », a word that belongs to this sport alone." } },

  { ref:"but-polo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le but"}, en:{m:"the goal", p:"gôle"},
           es:{m:"el gol"}, it:{m:"il gol"},
           de:{m:"das Tor", p:"tor"}, ja:{m:"ゴール", p:"gōru"} },
    def:{ fr:"⚠️ Après chaque but, les équipes CHANGENT DE CÔTÉ. C'est propre au polo, et ça déroute tous ceux qui viennent d'un autre sport : le camp qu'on défend n'est jamais le même deux fois de suite.",
          en:"After every goal the teams CHANGE ENDS. It is peculiar to polo, and it confuses everyone arriving from another sport." } },

  { ref:"arbitre-monte", lecon:1, coll:"polo",
    mots:{ fr:{m:"l'arbitre monté"}, en:{m:"the mounted umpire", p:"eum-païr"},
           es:{m:"el árbitro montado"}, it:{m:"l'arbitro a cavallo"},
           de:{m:"der reitende Schiedsrichter", p:"chidss-rikh-teur"},
           ja:{m:"騎乗審判", p:"kijō shinpan"} },
    def:{ fr:"Deux arbitres jouent au milieu, à cheval, au galop avec les joueurs. ⚠️ « Umpire » et non « referee » : le troisième arbitre, à pied au bord, s'appelle lui « the referee » et ne tranche qu'en cas de désaccord.",
          en:"Two umpires ride in the game, galloping with the players. « Umpire », not « referee »: the third official, on foot at the side, is the referee and only settles disagreements." } },

  { ref:"bandes", lecon:1, coll:"polo",
    mots:{ fr:{m:"les bandes"}, en:{m:"the bandages", p:"bann-didjes"},
           es:{m:"las vendas"}, it:{m:"le fasce"},
           de:{m:"die Bandagen", p:"bann-da-gueune"}, ja:{m:"バンテージ", p:"bantēji"} },
    def:{ fr:"Les quatre membres bandés serré, à chaque match. Ce n'est pas décoratif : le maillet passe sous le ventre et frôle les jambes, et une balle lancée à cent kilomètres-heure ne prévient pas.",
          en:"All four legs bandaged tight, every match. Not decoration: the mallet passes under the belly and grazes the legs, and a ball at sixty miles an hour gives no warning." } },

  { ref:"queue-nattee", lecon:1, coll:"polo",
    mots:{ fr:{m:"la queue nattée"}, en:{m:"the tail tied up", p:"tèil taïd"},
           es:{m:"la cola atada"}, it:{m:"la coda legata"},
           de:{m:"der aufgebundene Schweif", p:"chvaïf"},
           ja:{m:"結んだ尾", p:"musunda o"} },
    def:{ fr:"La queue tressée et repliée sur elle-même. La raison est mécanique et non esthétique : une queue libre attrape le maillet, et un maillet pris dans une queue arrache la main du joueur.",
          en:"The tail plaited and folded back on itself. The reason is mechanical, not tidy: a loose tail catches the mallet, and a caught mallet tears the player's hand away." } },

  { ref:"criollo", lecon:1, coll:"polo",
    mots:{ fr:{m:"le criollo"}, en:{m:"the Criollo", p:"kri-o-yo"},
           es:{m:"el criollo"}, it:{m:"il criollo"},
           de:{m:"der Criollo"}, ja:{m:"クリオージョ", p:"kuriōjo"} },
    def:{ fr:"La race argentine, compacte et increvable, à l'origine du cheval de polo moderne par croisement avec le pur-sang. C'est elle qui a fait de l'Argentine le pays du polo, et non l'inverse.",
          en:"The Argentine breed, compact and tireless, at the origin of the modern polo pony through crossing with the Thoroughbred. It is what made Argentina the country of polo, not the other way round." } }

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
