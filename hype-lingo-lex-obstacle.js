/* hype-lingo-lex-obstacle.js — Hype Lingo · Chapitre 7 · « L'obstacle »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Ville : Hickstead. Souvenir : un fanion rouge.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`
   (réservé aux chapitres Le cours et Les urgences).

   PAS DE DOUBLON avec les chapitres déjà écrits :
     · Matériel (4) possède les guêtres, les cloches, la cravache, la
       bombe et le gilet — rien de la protection n'est repris ici.
     · Cours (5) possède les allures, les figures, le coin, la diagonale.
     · Dressage (6) possède le rectangle, les lettres, le juge, la note,
       le protocole, le coefficient, l'erreur de parcours, le classement.
     · Urgences (9) possède la chute. Ce chapitre ne la reprend pas :
       une chute à l'obstacle, c'est le même mot et le même réflexe.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · **rouge à droite, blanc à gauche** : la seule règle du monde
       équestre qui ne change pas d'un pays à l'autre.
     · en anglais on ne compte pas en points mais en **faults**, et le
       sans-faute est **a clear round** — la phrase qu'on applaudit.
     · la Grande-Bretagne dit **a double** et **a treble**, jamais triple.
     · les mots voyagent dans tous les sens : l'anglais a pris
       **puissance** au français, l'italien **barrage**, l'allemand
       **touchieren**, et le monde entier a pris **cavaletti** à l'italien.
     · l'allemand, lui, forge ses propres composés : das Stechen pour le
       barrage, das Mächtigkeitsspringen pour la puissance.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Les doutes portent surtout sur
   l'espagnol et l'italien du saut d'obstacles (les termes de faute et
   de battue), et sur le japonais comme toujours. Entrées // ?? au
   fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.obstacle = {
  ref: "obstacle",
  chapitre: 7,
  titre: { fr:"L'obstacle", en:"Show jumping", es:"El salto", it:"Il salto ostacoli", de:"Das Springen", ja:"障害飛越" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LES OBSTACLES ============ */

  { ref:"parcours", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le parcours"}, en:{m:"the course", p:"korss"},
           es:{m:"el recorrido"}, it:{m:"il percorso"},
           de:{m:"der Parcours", p:"par-kour"}, ja:{m:"コース", p:"kōsu"} },
    def:{ fr:"La suite d'obstacles numérotés à sauter dans l'ordre. Curiosité : l'allemand a gardé le mot français, prononciation comprise, alors qu'il forge d'habitude ses propres composés.",
          en:"The numbered sequence of fences, jumped in order. German kept the French word, pronunciation included." } },

  { ref:"obstacle", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"l'obstacle"}, en:{m:"the fence", p:"fènce", var:"the jump"},
           es:{m:"el obstáculo"}, it:{m:"l'ostacolo"},
           de:{m:"das Hindernis", p:"hin-deur-niss"}, ja:{m:"障害", p:"shōgai"} },
    def:{ fr:"⚠️ Piège d'usage : un cavalier britannique dit **fence**, jamais « obstacle », même pour une barre posée sur deux chandeliers dans un manège. « Obstacle » existe en anglais mais appartient à la langue écrite.",
          en:"A British rider says fence, never obstacle, even for a single pole on two wings. Obstacle exists but belongs to written English." } },

  { ref:"barre", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la barre"}, en:{m:"the pole", p:"pôle"},
           es:{m:"la barra"}, it:{m:"la barriera"}, // ??
           de:{m:"die Stange", p:"chtan-gue"}, ja:{m:"横木", p:"yokogi", var:"バー"} }, // ??
    def:{ fr:"L'élément de base. Une barre au sol, c'est déjà du travail à l'obstacle : on apprend la foulée avant la hauteur.",
          en:"The basic element. A pole on the ground is already jumping work: you learn the stride before the height." } },

  { ref:"chandelier", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le chandelier"}, en:{m:"the wing", p:"ouing", var:"the upright · the standard"},
           es:{m:"el soporte", var:"el candelabro"}, it:{m:"il montante"}, // ??
           de:{m:"der Ständer", p:"chtèn-deur"}, ja:{m:"支柱", p:"shichū"} }, // ??
    def:{ fr:"Le montant latéral qui porte les barres. ⚠️ L'anglais l'appelle **the wing**, l'aile — parce que les montants évasés guident le cheval vers le centre de l'obstacle.",
          en:"The side support holding the poles. English calls it the wing, because the flared uprights guide the horse to the middle." } },

  { ref:"vertical", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le vertical"}, en:{m:"the upright", p:"eup-raïte", var:"a vertical"},
           es:{m:"el vertical"}, it:{m:"il verticale"},
           de:{m:"der Steilsprung", p:"chtaïl-chproung"}, ja:{m:"垂直障害", p:"suichoku shōgai"} }, // ??
    def:{ fr:"Un obstacle sans largeur, toutes les barres dans le même plan. Il demande un abord plus rond et plus près qu'un oxer : c'est la hauteur qu'il faut franchir, pas la distance.",
          en:"A fence with no spread, all poles in one plane. It needs a rounder, closer approach than a spread." } },

  { ref:"oxer", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"l'oxer"}, en:{m:"the oxer", p:"ok-seur", var:"a spread · a parallel"},
           es:{m:"el oxer"}, it:{m:"l'oxer"},
           de:{m:"der Oxer", p:"ok-seur"}, ja:{m:"オクサー", p:"okusā"} },
    def:{ fr:"Deux plans de barres, donc de la largeur. Le mot vient de l'anglais **ox-fence**, la clôture à bœufs des chasses à courre — mais les Britanniques disent aujourd'hui plutôt *a spread* ou *a parallel*.",
          en:"Two planes of poles, so a spread. The word comes from ox-fence, though British riders now often say spread or parallel." } },

  { ref:"mur", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le mur"}, en:{m:"the wall", p:"ouôl"},
           es:{m:"el muro"}, it:{m:"il muro"},
           de:{m:"die Mauer", p:"maou-eur"}, ja:{m:"壁", p:"kabe"} },
    def:{ fr:"Obstacle plein, en blocs légers qui tombent au contact. C'est le mur de Hickstead qui a rendu l'épreuve de puissance célèbre dans le monde entier.",
          en:"A solid fence of light blocks that fall on contact. The Hickstead wall is what made the puissance famous." } },

  { ref:"riviere", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la rivière"}, en:{m:"the water jump", p:"ouo-teur djeump"},
           es:{m:"la ría"}, it:{m:"la riviera"}, // ??
           de:{m:"der Wassergraben", p:"va-seur-gra-beune"}, ja:{m:"水濠", p:"suigō"} },
    def:{ fr:"De la largeur, pas de hauteur, et une latte à la réception qui juge le franchissement. L'italien dit *la riviera*, l'espagnol *la ría* — deux mots d'eau, là où l'anglais et l'allemand décrivent un saut d'eau.",
          en:"Width without height, with a lath on landing to judge it. Italian and Spanish name the water, English and German the jump." } },

  { ref:"palanque", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la palanque"}, en:{m:"the planks", p:"plannks"},
           es:{m:"las tablas"}, it:{m:"le tavole"}, // ??
           de:{m:"die Planke", p:"plan-ke"}, ja:{m:"板障害", p:"ita shōgai"} }, // ??
    def:{ fr:"De larges planches à la place des barres. Plus impressionnante à l'œil qu'un vertical de barres, et donc plus souvent touchée : elle se saute avec plus de respect.",
          en:"Broad planks instead of poles. It looks bigger than a pole vertical, so it gets hit more often." } },

  { ref:"croisillon", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le croisillon"}, en:{m:"the cross-pole", p:"kross-pôle", var:"cross-rail (US)"},
           es:{m:"el cruzado"}, it:{m:"la croce"},
           de:{m:"das Kreuz", p:"kroïts"}, ja:{m:"クロス", p:"kurosu"} },
    def:{ fr:"Deux barres croisées, plus basses au milieu : le premier obstacle de tous les débutants du monde, parce qu'il centre le cheval tout seul.",
          en:"Two crossed poles, lowest in the middle: every beginner's first fence anywhere, because it centres the horse by itself." } },

  { ref:"combinaison", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la combinaison"}, en:{m:"the combination", p:"kom-bi-né-cheune", var:"a double · a treble"},
           es:{m:"la combinación"}, it:{m:"la combinazione"},
           de:{m:"die Kombination", p:"kom-bi-na-tsi-ône"}, ja:{m:"連続障害", p:"renzoku shōgai"} }, // ??
    def:{ fr:"Deux ou trois obstacles séparés d'une ou deux foulées, comptés comme un seul numéro. ⚠️ En Grande-Bretagne, on dit **a double** et **a treble** — pas « a triple », qui désigne autre chose.",
          en:"Two or three fences one or two strides apart, counted as one number. Britain says a double and a treble, never a triple." } },

  /* ============ LEÇON 2 · LE PARCOURS ============ */

  { ref:"numero", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le numéro"}, en:{m:"the number", p:"neum-beur"},
           es:{m:"el número"}, it:{m:"il numero"},
           de:{m:"die Nummer", p:"nou-meur"}, ja:{m:"番号", p:"bangō"} },
    def:{ fr:"Chaque obstacle porte le sien, et on les saute dans l'ordre. En sauter un dans le désordre, c'est l'élimination immédiate dans tous les règlements.",
          en:"Every fence carries one, jumped in order. Taking them out of order means immediate elimination everywhere." } },

  { ref:"fanions", lecon:2, coll:"parcours",
    mots:{ fr:{m:"les fanions"}, en:{m:"the flags", p:"flagz", var:"red on the right"},
           es:{m:"los banderines"}, it:{m:"le bandierine"},
           de:{m:"die Fähnchen", p:"fèn-cheune"}, ja:{m:"旗", p:"hata"} },
    def:{ fr:"**Rouge à droite, blanc à gauche.** C'est probablement la seule règle du monde équestre qui soit identique dans absolument tous les pays et toutes les disciplines. Le fanion rouge est le souvenir que tu rapportes de Hickstead.",
          en:"Red on the right, white on the left. Probably the only rule in the horse world that is identical in every country and discipline." } },

  { ref:"reconnaissance", lecon:2, coll:"parcours", v:true,
    mots:{ fr:{m:"reconnaître le parcours"}, en:{m:"to walk the course", p:"ouôk ze korss"},
           es:{m:"reconocer el recorrido"}, it:{m:"fare la ricognizione"},
           de:{m:"den Parcours besichtigen", p:"be-zirh-ti-gueune"}, ja:{m:"コース下見", p:"kōsu shitami"} }, // ??
    def:{ fr:"⚠️ L'anglais dit littéralement **« marcher le parcours »**, et c'est plus exact que le mot français : on le marche pour compter les foulées entre les obstacles, à pas réguliers de 80 cm.",
          en:"English says literally « walk the course », which is the more accurate phrase: you pace it out to count strides, in 80 cm steps." } },

  { ref:"contrat-foulees", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le contrat de foulées"}, en:{m:"the striding", p:"straï-ding", var:"a four-stride distance"},
           es:{m:"el número de trancos"}, it:{m:"il numero di falcate"},
           de:{m:"die Distanz", p:"dis-tanntss", var:"Galoppsprünge zählen"}, ja:{m:"歩数", p:"hosū"} }, // ??
    def:{ fr:"Le nombre de foulées prévu entre deux obstacles d'une même ligne. Une foulée de galop vaut environ 3,50 m ; la reconnaissance sert à vérifier si le chef de piste a mis quatre foulées ou quatre foulées « longues ».",
          en:"The number of strides planned between two fences on a line. A canter stride is about 3.50 m." } },

  { ref:"ligne", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la ligne"}, en:{m:"the related distance", p:"ri-lé-tid dis-teunce", var:"a line"},
           es:{m:"la línea"}, it:{m:"la linea"},
           de:{m:"die Linie", p:"li-ni-e"}, ja:{m:"ライン", p:"rain"} },
    def:{ fr:"Deux obstacles assez proches pour que le nombre de foulées soit imposé. Au-delà, on parle de deux obstacles indépendants, et le cavalier choisit son tracé.",
          en:"Two fences close enough that the stride count is dictated. Beyond that they are independent and you choose your track." } },

  { ref:"abord", lecon:2, coll:"parcours",
    mots:{ fr:{m:"l'abord"}, en:{m:"the approach", p:"a-prôtch"},
           es:{m:"la aproximación"}, it:{m:"l'avvicinamento"},
           de:{m:"der Anritt", p:"an-ritt"}, ja:{m:"アプローチ", p:"apurōchi"} }, // ??
    def:{ fr:"Les dernières foulées avant l'obstacle : rythme, équilibre, rectitude. C'est là que le saut se gagne ou se perd, jamais au-dessus de la barre.",
          en:"The last strides before the fence: rhythm, balance, straightness. The jump is won or lost here, never over the pole." } },

  { ref:"battue", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la battue"}, en:{m:"the take-off", p:"téïk-off"},
           es:{m:"la batida"}, it:{m:"la battuta"}, // ??
           de:{m:"der Absprung", p:"ap-chproung"}, ja:{m:"踏切", p:"fumikiri"} },
    def:{ fr:"Le point d'où le cheval décolle. Trop près, il se fait « bloquer » ; trop loin, il s'aplatit. Toutes les langues nomment ici l'action du pied qui frappe le sol.",
          en:"The point where the horse leaves the ground. Too close and he is stuffed under it; too far and he flattens." } },

  { ref:"reception", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la réception"}, en:{m:"the landing", p:"lan-ding"},
           es:{m:"la recepción"}, it:{m:"l'atterraggio"}, // ??
           de:{m:"die Landung", p:"lan-doung"}, ja:{m:"着地", p:"chakuchi"} },
    def:{ fr:"Le retour au sol, un antérieur après l'autre. C'est le moment le plus dur pour les membres du cheval, et celui où le cavalier doit déjà regarder l'obstacle suivant.",
          en:"Coming back down, one foreleg after the other. Hardest moment for the horse's legs, and the moment you should already be looking at the next fence." } },

  { ref:"trace", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le tracé"}, en:{m:"the line", p:"laïne", var:"your track"},
           es:{m:"el trazado"}, it:{m:"il tracciato"},
           de:{m:"die Linienführung", p:"li-ni-eune-fu-roung"}, ja:{m:"走行ライン", p:"sōkō rain"} }, // ??
    def:{ fr:"Le chemin choisi entre les obstacles. En barrage, c'est lui qui fait gagner : le sans-faute le plus rapide n'est presque jamais celui qui a galopé le plus vite, mais celui qui a tourné le plus court.",
          en:"The path chosen between fences. In a jump-off it is what wins: the fastest clear is rarely the fastest gallop, but the tightest turns." } },

  { ref:"paddock-detente", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le paddock de détente"}, en:{m:"the collecting ring", p:"ko-lèk-ting ring", var:"the warm-up"},
           es:{m:"la pista de calentamiento", var:"el paddock"}, it:{m:"il campo prova"},
           de:{m:"der Abreiteplatz", p:"ap-raï-te-plats"}, ja:{m:"練習馬場", p:"renshū baba"} }, // ??
    def:{ fr:"L'aire où l'on se détend avant de passer, avec ses propres règles de circulation. ⚠️ Troisième sens du mot « paddock » rencontré dans le module : l'enclos (chapitre 1), le rond de présentation japonais, et ici l'aire de détente. L'anglais évite le piège en disant *collecting ring*.",
          en:"The warm-up area, with its own traffic rules. This is the third meaning of « paddock » in the module; English avoids it with collecting ring." } },

  /* ============ LEÇON 3 · LES FAUTES ============ */

  { ref:"barre-tombee", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la barre tombée"}, en:{m:"a knockdown", p:"nok-daoune", var:"a fence down · four faults"},
           es:{m:"un derribo"}, it:{m:"un abbattimento"},
           de:{m:"der Abwurf", p:"ap-vourf"}, ja:{m:"落下", p:"rakka"} },
    def:{ fr:"Quatre points, dans le monde entier. En Grande-Bretagne on ne dit presque jamais « a knockdown » à chaud mais **« four faults »**, ou simplement « he had one down ».",
          en:"Four faults, worldwide. In Britain nobody says knockdown in the moment — they say « four faults » or « he had one down »." } },

  { ref:"refus", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le refus"}, en:{m:"a refusal", p:"ri-fiou-zeul", var:"a stop"},
           es:{m:"un rehúse"}, it:{m:"un rifiuto"},
           de:{m:"die Verweigerung", p:"fèr-vaï-gue-roung"}, ja:{m:"拒止", p:"kyoshi"} }, // ??
    def:{ fr:"Le cheval s'arrête devant l'obstacle. À l'oral, un cavalier britannique dira plutôt **« he stopped »** que « he refused » — le mot du règlement n'est pas celui du paddock.",
          en:"The horse stops in front of the fence. Out loud a British rider says « he stopped », not « he refused »." } },

  { ref:"derobade", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la dérobade"}, en:{m:"a run-out", p:"reune-aoute"},
           es:{m:"una escapada"}, it:{m:"una scappata"}, // ??
           de:{m:"das Vorbeilaufen", p:"for-baï-laou-feune"}, ja:{m:"逃避", p:"tōhi"} }, // ??
    def:{ fr:"Le cheval passe à côté de l'obstacle au lieu de le sauter. L'allemand est le plus descriptif des six : *Vorbeilaufen*, « courir à côté ».",
          en:"The horse goes past the fence instead of over it. German is the most literal of the six: « running past »." } },

  { ref:"desobeissance", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la désobéissance"}, en:{m:"a disobedience", p:"diss-o-bi-dieunce"},
           es:{m:"una desobediencia"}, it:{m:"una disobbedienza"},
           de:{m:"der Ungehorsam", p:"oune-gue-hor-zam"}, ja:{m:"不従順", p:"fujūjun"} }, // ??
    def:{ fr:"Le terme du règlement qui englobe refus, dérobade et volte non autorisée. Utile à connaître parce que c'est lui qui est écrit sur la feuille, pas les mots qu'on emploie en parlant.",
          en:"The rulebook term covering refusal, run-out and unauthorised circle. Worth knowing because it is what appears on the sheet." } },

  { ref:"penalites", lecon:3, coll:"fautes",
    mots:{ fr:{m:"les points de pénalité"}, en:{m:"the faults", p:"fôlts", var:"penalties"},
           es:{m:"los puntos de penalización"}, it:{m:"le penalità"},
           de:{m:"die Strafpunkte", p:"chtraf-pounk-te"}, ja:{m:"減点", p:"genten"} },
    def:{ fr:"⚠️ Le piège de compréhension le plus fréquent en concours à l'étranger : l'anglais ne compte pas en points mais en **faults**. « Four faults » = une barre. Dire « I got four points » ne veut rien dire pour un Britannique.",
          en:"English counts in faults, not points. « Four faults » means one fence down; « I got four points » means nothing." } },

  { ref:"temps-accorde", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le temps accordé"}, en:{m:"the time allowed", p:"taïm a-laoude"},
           es:{m:"el tiempo concedido"}, it:{m:"il tempo concesso"},
           de:{m:"die erlaubte Zeit", p:"èr-laoup-te tsaïte"}, ja:{m:"規定時間", p:"kitei jikan"} }, // ??
    def:{ fr:"Calculé sur la longueur du parcours et affiché avant l'épreuve. Il ne s'agit pas d'aller vite mais de ne pas traîner : le dépasser coûte cher pour rien.",
          en:"Worked out from the course length and posted before the class. Not a race — just do not dawdle." } },

  { ref:"temps-depasse", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le dépassement de temps"}, en:{m:"time faults", p:"taïm fôlts"},
           es:{m:"los puntos por tiempo"}, it:{m:"le penalità di tempo"},
           de:{m:"die Zeitstrafpunkte", p:"tsaïte-chtraf-pounk-te"}, ja:{m:"時間減点", p:"jikan genten"} }, // ??
    def:{ fr:"Des fractions de point par seconde au-delà du temps accordé. C'est la faute la plus rageante : un parcours parfait perdu pour deux secondes de trop.",
          en:"Fractions of a fault per second over the time allowed — the most infuriating way to lose a perfect round." } },

  { ref:"elimination", lecon:3, coll:"fautes",
    mots:{ fr:{m:"l'élimination"}, en:{m:"elimination", p:"i-li-mi-né-cheune", var:"you're out"},
           es:{m:"la eliminación"}, it:{m:"l'eliminazione"},
           de:{m:"das Ausscheiden", p:"aouss-chaï-deune"}, ja:{m:"失権", p:"shikken"} },
    def:{ fr:"Deux désobéissances, un obstacle dans le mauvais ordre, une chute, un franchissement hors des fanions. La cloche sonne, on s'arrête et on salue.",
          en:"Two disobediences, a fence out of order, a fall, or jumping outside the flags. The bell rings, you stop and salute." } },

  { ref:"abandon", lecon:3, coll:"fautes",
    mots:{ fr:{m:"l'abandon"}, en:{m:"to retire", p:"ri-taï-eur", var:"RET on the sheet"},
           es:{m:"la retirada"}, it:{m:"il ritiro"},
           de:{m:"das Aufgeben", p:"aouf-gué-beune"}, ja:{m:"棄権", p:"kiken"} },
    def:{ fr:"Renoncer volontairement en cours de parcours. Ce n'est pas un échec : c'est parfois la meilleure décision de la journée pour un cheval qui a perdu confiance.",
          en:"Choosing to stop mid-round. Not a failure — sometimes the best decision of the day for a horse who has lost confidence." } },

  { ref:"sans-faute", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le sans-faute"}, en:{m:"a clear round", p:"kli-eur raounde", var:"a clear"},
           es:{m:"un cero faltas"}, it:{m:"un percorso netto"},
           de:{m:"die Nullrunde", p:"noul-roune-de"}, ja:{m:"減点なし", p:"gentennashi", var:"クリアラウンド"} }, // ??
    def:{ fr:"Zéro point. ⚠️ La phrase exacte à reconnaître en Grande-Bretagne est **« a clear round »** — et dans les concours de club britanniques, il existe même une épreuve appelée *clear round* où chaque sans-faute reçoit une rosette, sans classement.",
          en:"No faults. In Britain « a clear round » is also the name of a class where every clear gets a rosette and nobody is placed." } },

  /* ============ LEÇON 4 · LE SAUT ET L'ÉPREUVE ============ */

  { ref:"saut", lecon:4, coll:"saut",
    mots:{ fr:{m:"le saut"}, en:{m:"the jump", p:"djeump"},
           es:{m:"el salto"}, it:{m:"il salto"},
           de:{m:"der Sprung", p:"chproung"}, ja:{m:"飛越", p:"hietsu"} },
    def:{ fr:"Cinq phases enchaînées : abord, battue, planer, réception, départ. Le cavalier n'agit vraiment que sur la première — le reste, il accompagne.",
          en:"Five linked phases: approach, take-off, flight, landing, getaway. The rider only really acts on the first." } },

  { ref:"sauter", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"sauter"}, en:{m:"to jump", p:"djeumpe", var:"to pop over = sauter tranquillement"},
           es:{m:"saltar"}, it:{m:"saltare"},
           de:{m:"springen", p:"chprin-gueune"}, ja:{m:"飛越する", p:"hietsu suru"} },
    def:{ fr:"⚠️ Expression britannique très utile : **« pop over »** veut dire sauter sans en faire une affaire — « just pop him over a cross-pole » est une invitation détendue, pas un exercice.",
          en:"A useful British phrase: « pop over » means jump without making a fuss — « just pop him over a cross-pole »." } },

  { ref:"foulee", lecon:4, coll:"saut",
    mots:{ fr:{m:"la foulée"}, en:{m:"the stride", p:"straïde"},
           es:{m:"el tranco"}, it:{m:"la falcata"},
           de:{m:"der Galoppsprung", p:"ga-lopp-chproung"}, ja:{m:"ストライド", p:"sutoraido"} }, // ??
    def:{ fr:"Un cycle complet de galop, environ 3,50 m chez un cheval de taille moyenne. L'allemand est très logique : *Galoppsprung*, « le bond de galop » — chaque foulée de galop est déjà un petit saut.",
          en:"One full canter cycle, about 3.50 m. German calls it a canter leap — every stride is already a small jump." } },

  { ref:"voir-foulee", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"voir sa foulée"}, en:{m:"to see a stride", p:"si eu straïde", var:"a good eye"},
           es:{m:"ver la distancia"}, it:{m:"vedere la distanza"},
           de:{m:"den Absprung sehen", p:"ap-chproung zé-eune"}, ja:{m:"踏切を見る", p:"fumikiri o miru"} }, // ??
    def:{ fr:"Percevoir d'assez loin où le cheval va décoller. ⚠️ L'anglais en a fait une qualité de la personne : **« she has a good eye »**, un compliment qu'on entend beaucoup au bord d'une piste britannique.",
          en:"Sensing from a distance where the horse will take off. English made it a personal quality: « she has a good eye »." } },

  { ref:"toucher", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"toucher la barre"}, en:{m:"to rub", p:"reub", var:"to touch · to rattle"},
           es:{m:"tocar la barra"}, it:{m:"toccare la barriera"},
           de:{m:"touchieren", p:"tou-chi-reune"}, ja:{m:"触れる", p:"fureru"} },
    def:{ fr:"Frôler sans faire tomber : aucune pénalité, dans aucun règlement moderne. ⚠️ L'allemand emploie ici un verbe d'origine française, *touchieren*, que le français n'utilise pas sous cette forme.",
          en:"Brushing without dislodging: no penalty under any modern rules. German borrows a French-looking verb, touchieren." } },

  { ref:"cavaletti", lecon:4, coll:"saut",
    mots:{ fr:{m:"le cavaletti"}, en:{m:"cavaletti", p:"ka-va-lè-ti"},
           es:{m:"los cavaletti"}, it:{m:"i cavalletti"},
           de:{m:"die Cavaletti", p:"ka-va-lè-ti"}, ja:{m:"カバレッティ", p:"kabaretti"} },
    def:{ fr:"Les petites barres sur croisillons de bois, pour le travail du rythme et de la cadence. Cas unique dans tout le module : c'est **l'italien** qui a gagné dans les six langues — héritage de l'école de Pinerolo et du système Caprilli.",
          en:"Small poles on wooden crosses, for rhythm work. Unique in the module: the Italian word won in all six languages." } },

  { ref:"hauteur-obstacle", lecon:4, coll:"saut",
    mots:{ fr:{m:"la hauteur"}, en:{m:"the height", p:"haïte"},
           es:{m:"la altura"}, it:{m:"l'altezza"},
           de:{m:"die Höhe", p:"hö-e"}, ja:{m:"高さ", p:"takasa"} },
    def:{ fr:"Les épreuves se nomment par elle : un « 1 m 10 », un « 90 ». ⚠️ Attention, *la altura* et *l'altezza* servent aussi à la taille du cheval au garrot (chapitre 3) — seul le contexte tranche.",
          en:"Classes are named by it: a « 1.10 », a « 90 ». Note that Spanish and Italian use the same word for a horse's height at the withers." } },

  { ref:"barrage", lecon:4, coll:"saut",
    mots:{ fr:{m:"le barrage"}, en:{m:"the jump-off", p:"djeump-off", var:"against the clock"},
           es:{m:"el desempate"}, it:{m:"il barrage"},
           de:{m:"das Stechen", p:"chtè-cheune"}, ja:{m:"ジャンプオフ", p:"janpu ofu"} }, // ??
    def:{ fr:"Le second parcours, raccourci et chronométré, entre les sans-faute. ⚠️ Chaque langue a fait un choix différent : l'italien garde le mot français, l'anglais décrit l'action (*jump-off*), l'espagnol le résultat (*desempate*, « le départage »), et l'allemand emploie une image d'escrime, *das Stechen*.",
          en:"The shortened, timed second round between the clears. Every language chose differently: Italian keeps the French word, German uses a fencing image." } },

  { ref:"chrono", lecon:4, coll:"saut",
    mots:{ fr:{m:"le chrono"}, en:{m:"the clock", p:"klok", var:"the time"},
           es:{m:"el crono"}, it:{m:"il cronometro"},
           de:{m:"die Zeit", p:"tsaïte"}, ja:{m:"タイム", p:"taimu"} },
    def:{ fr:"⚠️ L'anglais ne dit pas « the chrono » mais **the clock**, et surtout l'expression **« against the clock »** — contre la montre. C'est elle qu'on entend annoncer au micro avant un barrage.",
          en:"English says the clock, and above all « against the clock » — the phrase announced before a jump-off." } },

  { ref:"puissance", lecon:4, coll:"saut",
    mots:{ fr:{m:"l'épreuve de puissance"}, en:{m:"the puissance", p:"pu-i-sanss"},
           es:{m:"la potencia", var:"la Puissance"}, it:{m:"la potenza"}, // ??
           de:{m:"das Mächtigkeitsspringen", p:"mèrh-tirh-kaïts-chprin-gueune"}, ja:{m:"パワー競技", p:"pawā kyōgi"} }, // ??
    def:{ fr:"L'épreuve de hauteur pure, où le mur monte à chaque tour. ⚠️ Cas savoureux : **l'anglais emploie le mot français** *puissance*, prononcé à l'anglaise, et c'est le mur de Hickstead qui l'a rendu célèbre. L'allemand, fidèle à lui-même, a préféré forger *Mächtigkeitsspringen*.",
          en:"The pure height class, the wall rising each round. English uses the French word puissance — and it was the Hickstead wall that made it famous." } },

  { ref:"tour-honneur", lecon:4, coll:"saut",
    mots:{ fr:{m:"le tour d'honneur"}, en:{m:"the lap of honour", p:"lap of o-neur", var:"victory gallop"},
           es:{m:"la vuelta de honor"}, it:{m:"il giro d'onore"},
           de:{m:"die Ehrenrunde", p:"é-reune-roune-de"}, ja:{m:"表彰ラウンド", p:"hyōshō raundo"} }, // ??
    def:{ fr:"Le galop des vainqueurs, rosette au frontal, derrière le premier. Les Britanniques l'appellent aussi **victory gallop**, et il se fait au galop, pas au pas — un cheval fatigué peut être excusé.",
          en:"The winners' gallop behind the leader, rosettes on the browbands. The British also call it the victory gallop." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"reconnaitre-ensemble", lecon:2,
      fr:"On va reconnaître le parcours ensemble ?",
      en:"Shall we walk the course together ?",
      es:"¿ Reconocemos el recorrido juntas ?",
      it:"Facciamo la ricognizione insieme ?",
      de:"Gehen wir den Parcours zusammen ab ?",
      ja:"一緒 に コース 下見 を し ませ ん か ?" },
    { ref:"combien-foulees", lecon:2,
      fr:"Tu comptes combien de foulées dans la ligne ?",
      en:"How many strides do you make it in the line ?",
      es:"¿ Cuántos trancos cuentas en la línea ?",
      it:"Quante falcate conti nella linea ?",
      de:"Wie viele Galoppsprünge zählst du in der Linie ?",
      ja:"ライン は 何 歩 で 取り ます か ?" },
    { ref:"quatre-points", lecon:3,
      fr:"Elle a fait quatre points sur le mur.",
      en:"She had four faults at the wall.",
      es:"Ha hecho cuatro puntos en el muro.",
      it:"Ha fatto quattro penalità al muro.",
      de:"Sie hatte vier Strafpunkte an der Mauer.",
      ja:"壁 で 落下 して 減点 四 でした 。" },
    { ref:"sans-faute-barrage", lecon:4,
      fr:"Sans-faute ! Elle est au barrage.",
      en:"Clear round ! She's through to the jump-off.",
      es:"¡ Cero faltas ! Está en el desempate.",
      it:"Percorso netto ! È al barrage.",
      de:"Nullrunde ! Sie ist im Stechen.",
      ja:"減点 なし です ! ジャンプオフ に 進み ます 。" },
    { ref:"il-a-refuse", lecon:3,
      fr:"Il s'est arrêté au numéro cinq, je le représente.",
      en:"He stopped at number five — I'll represent him.",
      es:"Se ha parado en el cinco, lo vuelvo a presentar.",
      it:"Si è fermato al numero cinque, lo ripresento.",
      de:"Er hat an Nummer fünf verweigert, ich stelle ihn neu vor.",
      ja:"五 番 で 拒止 し ました 。 もう一度 向け ます 。" },
    { ref:"quelle-hauteur", lecon:4,
      fr:"L'épreuve est à quelle hauteur ?",
      en:"What height is the class ?",
      es:"¿ A qué altura es la prueba ?",
      it:"A che altezza è la prova ?",
      de:"Auf welcher Höhe ist die Prüfung ?",
      ja:"競技 の 高さ は どれ くらい です か ?" },
    { ref:"detente-croisillon", lecon:2,
      fr:"Je me détends sur le croisillon avant de passer.",
      en:"I'll pop over the cross-pole before I go in.",
      es:"Caliento sobre el cruzado antes de entrar.",
      it:"Mi scaldo sulla croce prima di entrare.",
      de:"Ich springe das Kreuz zum Aufwärmen, bevor ich reingehe.",
      ja:"入場 の 前 に クロス で 準備 し ます 。" },
    { ref:"rouge-droite", lecon:2,
      fr:"Rouge à droite, blanc à gauche — partout, toujours.",
      en:"Red on the right, white on the left — everywhere, always.",
      es:"Rojo a la derecha, blanco a la izquierda, siempre.",
      it:"Rosso a destra, bianco a sinistra, sempre.",
      de:"Rot rechts, weiß links — überall und immer.",
      ja:"赤 は 右 、 白 は 左 。 どこ でも 同じ です 。" }
  ]
};
