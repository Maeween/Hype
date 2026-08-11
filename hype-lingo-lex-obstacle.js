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

/* ⚠️ CORRECTION DU 11/08/2026, relevée par BLANDINE en jouant la leçon :
   la définition du vertical disait « un abord plus près qu'un oxer » —
   C'EST L'INVERSE. On s'éloigne du vertical (le sommet de l'arc doit
   tomber au-dessus de la barre) ; c'est à l'oxer qu'on vient plus près du
   premier plan, pour que le sommet tombe au milieu de la largeur.
   Corrigé dans les six langues. Balise dans lingo.html passée à ?l+1. */
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
          en:"The numbered sequence of fences, jumped in order. German kept the French word, pronunciation included.",
          es:"La serie de obstáculos numerados que hay que saltar en orden. Curiosidad: el alemán conservó la palabra francesa, pronunciación incluida, cuando suele forjar sus propios compuestos.",
          it:"La serie di ostacoli numerati da saltare in ordine. Curiosità: il tedesco ha tenuto la parola francese, pronuncia compresa, lui che di solito forgia i suoi composti.",
          de:"Die Folge nummerierter Hindernisse, in der Reihenfolge zu springen. Kurios: Das Deutsche behielt das französische Wort samt Aussprache — es, das sonst eigene Komposita baut.",
          ja:"番号順に跳ぶ、障害の連なり。面白いことに、ふだんは自前の複合語を作るドイツ語が、この言葉だけは発音ごとフランス語のまま残しました。" } },

  { ref:"obstacle", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"l'obstacle"}, en:{m:"the fence", p:"fènce", var:"the jump"},
           es:{m:"el obstáculo"}, it:{m:"l'ostacolo"},
           de:{m:"das Hindernis", p:"hin-deur-niss"}, ja:{m:"障害", p:"shōgai"} },
    def:{ fr:"⚠️ Piège d'usage : un cavalier britannique dit **fence**, jamais « obstacle », même pour une barre posée sur deux chandeliers dans un manège. « Obstacle » existe en anglais mais appartient à la langue écrite.",
          en:"A British rider says fence, never obstacle, even for a single pole on two wings. Obstacle exists but belongs to written English.",
          es:"⚠️ Trampa de uso: un jinete británico dice **fence**, jamás « obstacle », incluso para una barra sobre dos soportes en una pista. « Obstacle » existe en inglés pero pertenece a la lengua escrita.",
          it:"⚠️ Trappola d'uso: un cavaliere britannico dice **fence**, mai « obstacle », anche per una barriera su due candelieri in maneggio. « Obstacle » esiste in inglese ma appartiene alla lingua scritta.",
          de:"⚠️ Gebrauchsfalle: Ein britischer Reiter sagt **fence**, nie « obstacle » — selbst für eine Stange auf zwei Ständern in der Halle. « Obstacle » existiert, gehört aber der Schriftsprache.",
          ja:"⚠️ 使い方の罠：イギリスの騎手は **fence** と言い、馬場のバー一本でも « obstacle » とは言いません。« obstacle » は英語に存在しますが、書き言葉の世界のものです。" } },

  { ref:"barre", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la barre"}, en:{m:"the pole", p:"pôle"},
           es:{m:"la barra"}, it:{m:"la barriera"}, // ??
           de:{m:"die Stange", p:"chtan-gue"}, ja:{m:"横木", p:"yokogi", var:"バー"} }, // ??
    def:{ fr:"L'élément de base. Une barre au sol, c'est déjà du travail à l'obstacle : on apprend la foulée avant la hauteur.",
          en:"The basic element. A pole on the ground is already jumping work: you learn the stride before the height.",
          es:"El elemento de base. Una barra en el suelo ya es trabajo de salto: se aprende la zancada antes que la altura.",
          it:"L'elemento di base. Una barriera a terra è già lavoro sugli ostacoli: si impara la falcata prima dell'altezza.",
          de:"Das Grundelement. Eine Stange am Boden ist schon Springarbeit: Man lernt den Galoppsprung vor der Höhe.",
          ja:"基本の要素。地面に置いたバー一本も、もう障害の練習です。高さの前に、まず歩幅を学ぶのです。" } },

  { ref:"chandelier", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le chandelier"}, en:{m:"the wing", p:"ouing", var:"the upright · the standard"},
           es:{m:"el soporte", var:"el candelabro"}, it:{m:"il montante"}, // ??
           de:{m:"der Ständer", p:"chtèn-deur"}, ja:{m:"支柱", p:"shichū"} }, // ??
    def:{ fr:"Le montant latéral qui porte les barres. ⚠️ L'anglais l'appelle **the wing**, l'aile — parce que les montants évasés guident le cheval vers le centre de l'obstacle.",
          en:"The side support holding the poles. English calls it the wing, because the flared uprights guide the horse to the middle.",
          es:"El soporte lateral que lleva las barras. ⚠️ El inglés lo llama **the wing**, el ala — porque los soportes abiertos guían al caballo hacia el centro del obstáculo.",
          it:"Il montante laterale che porta le barriere. ⚠️ L'inglese lo chiama **the wing**, l'ala — perché i montanti svasati guidano il cavallo verso il centro dell'ostacolo.",
          de:"Der seitliche Ständer, der die Stangen trägt. ⚠️ Das Englische nennt ihn **the wing**, den Flügel — weil die ausgestellten Ständer das Pferd zur Mitte leiten.",
          ja:"バーを支える横の柱。⚠️ 英語では **the wing**（翼）— 外へ開いた柱が、馬を障害の中央へ導くからです。" } },

  { ref:"vertical", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le vertical"}, en:{m:"the upright", p:"eup-raïte", var:"a vertical"},
           es:{m:"el vertical"}, it:{m:"il verticale"},
           de:{m:"der Steilsprung", p:"chtaïl-chproung"}, ja:{m:"垂直障害", p:"suichoku shōgai"} }, // ??
    def:{ fr:"Un obstacle sans largeur, toutes les barres dans le même plan. La battue se prend un peu plus loin qu'à l'oxer, pour que le sommet du saut tombe au-dessus de la barre : c'est la hauteur qu'il faut franchir, pas la distance.",
          en:"A fence with no spread, all poles in one plane. The take-off comes slightly further away than at an oxer, so the arc peaks above the rail: it is height you must clear, not distance.",
          es:"Un obstáculo sin anchura, todas las barras en el mismo plano. La batida se toma algo más lejos que en un oxer, para que la cima del salto caiga sobre la barra: es la altura lo que hay que franquear, no la distancia.",
          it:"Un ostacolo senza larghezza, tutte le barriere sullo stesso piano. Lo stacco si prende un po' più lontano che sull'oxer, perché il culmine del salto cada sopra la barriera: è l'altezza da superare, non la distanza.",
          de:"Ein Hindernis ohne Weite, alle Stangen in einer Ebene. Der Absprung liegt etwas weiter weg als beim Oxer, damit der Scheitel des Sprungs über der Stange liegt: Zu überwinden ist die Höhe, nicht die Weite.",
          ja:"幅のない障害。バーはすべて同一面に。踏み切りはオクサーよりやや遠くに取り、跳躍の頂点がバーの真上に来るようにします。越えるべきは距離ではなく高さなのです。" } },

  { ref:"oxer", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"l'oxer"}, en:{m:"the oxer", p:"ok-seur", var:"a spread · a parallel"},
           es:{m:"el oxer"}, it:{m:"l'oxer"},
           de:{m:"der Oxer", p:"ok-seur"}, ja:{m:"オクサー", p:"okusā"} },
    def:{ fr:"Deux plans de barres, donc de la largeur. Le mot vient de l'anglais **ox-fence**, la clôture à bœufs des chasses à courre — mais les Britanniques disent aujourd'hui plutôt *a spread* ou *a parallel*.",
          en:"Two planes of poles, so a spread. The word comes from ox-fence, though British riders now often say spread or parallel.",
          es:"Dos planos de barras, o sea anchura. La palabra viene del inglés **ox-fence**, la cerca de bueyes de las cacerías — pero los británicos hoy dicen más bien *a spread* o *a parallel*.",
          it:"Due piani di barriere, quindi larghezza. La parola viene dall'inglese **ox-fence**, la recinzione da buoi delle cacce — ma i britannici oggi dicono piuttosto *a spread* o *a parallel*.",
          de:"Zwei Stangenebenen, also Weite. Das Wort kommt vom englischen **ox-fence**, dem Ochsenzaun der Jagden — heute sagen die Briten eher *a spread* oder *a parallel*.",
          ja:"バーの面がふたつ、つまり幅のある障害。語源は英語の **ox-fence**、狩猟場の牛よけ柵 — もっとも今のイギリス人は *a spread* や *a parallel* と言うほうが多いのですが。" } },

  { ref:"mur", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le mur"}, en:{m:"the wall", p:"ouôl"},
           es:{m:"el muro"}, it:{m:"il muro"},
           de:{m:"die Mauer", p:"maou-eur"}, ja:{m:"壁", p:"kabe"} },
    def:{ fr:"Obstacle plein, en blocs légers qui tombent au contact. C'est le mur de Hickstead qui a rendu l'épreuve de puissance célèbre dans le monde entier.",
          en:"A solid fence of light blocks that fall on contact. The Hickstead wall is what made the puissance famous.",
          es:"Obstáculo lleno, de bloques ligeros que caen al contacto. Es el muro de Hickstead el que hizo célebre la prueba de potencia en el mundo entero.",
          it:"Ostacolo pieno, a blocchi leggeri che cadono al contatto. È il muro di Hickstead ad aver reso celebre la prova di potenza nel mondo intero.",
          de:"Ein volles Hindernis aus leichten Blöcken, die bei Berührung fallen. Die Mauer von Hickstead machte die Mächtigkeitsprüfung weltberühmt.",
          ja:"接触すると崩れる軽いブロックでできた、面の詰まった障害。パワー競技を世界に知らしめたのは、ヒックステッドの壁でした。" } },

  { ref:"riviere", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la rivière"}, en:{m:"the water jump", p:"ouo-teur djeump"},
           es:{m:"la ría"}, it:{m:"la riviera"}, // ??
           de:{m:"der Wassergraben", p:"va-seur-gra-beune"}, ja:{m:"水濠", p:"suigō"} },
    def:{ fr:"De la largeur, pas de hauteur, et une latte à la réception qui juge le franchissement. L'italien dit *la riviera*, l'espagnol *la ría* — deux mots d'eau, là où l'anglais et l'allemand décrivent un saut d'eau.",
          en:"Width without height, with a lath on landing to judge it. Italian and Spanish name the water, English and German the jump.",
          es:"Anchura, nada de altura, y una lata en la recepción que juzga el franqueo. El italiano dice *la riviera*, el español *la ría* — dos palabras de agua, donde el inglés y el alemán describen un salto de agua.",
          it:"Larghezza, niente altezza, e una stecca alla ricezione che giudica il passaggio. L'italiano dice *la riviera*, lo spagnolo *la ría* — due parole d'acqua, là dove inglese e tedesco descrivono un salto d'acqua.",
          de:"Weite ohne Höhe, mit einer Leiste an der Landung, die den Sprung beurteilt. Italienisch *la riviera*, Spanisch *la ría* — zwei Wasserwörter, wo Englisch und Deutsch einen Wassersprung beschreiben.",
          ja:"高さはなく幅だけ。着地側の判定用ラスが飛越の成否を決めます。イタリア語は *la riviera*、スペイン語は *la ría* — 水そのものの言葉。英語とドイツ語は「水の跳躍」と描写します。" } },

  { ref:"palanque", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la palanque"}, en:{m:"the planks", p:"plannks"},
           es:{m:"las tablas"}, it:{m:"le tavole"}, // ??
           de:{m:"die Planke", p:"plan-ke"}, ja:{m:"板障害", p:"ita shōgai"} }, // ??
    def:{ fr:"De larges planches à la place des barres. Plus impressionnante à l'œil qu'un vertical de barres, et donc plus souvent touchée : elle se saute avec plus de respect.",
          en:"Broad planks instead of poles. It looks bigger than a pole vertical, so it gets hit more often.",
          es:"Anchas tablas en lugar de barras. Más impresionante a la vista que un vertical de barras, y por eso más tocada: se salta con más respeto.",
          it:"Larghe tavole al posto delle barriere. Più impressionante all'occhio di un vertical di barriere, e perciò più toccata: si salta con più rispetto.",
          de:"Breite Planken statt Stangen. Fürs Auge eindrucksvoller als ein Steilsprung aus Stangen — und darum öfter berührt: Man springt sie mit mehr Respekt.",
          ja:"バーの代わりに幅広の板を渡した障害。バーの垂直障害より見た目の圧があり、だからこそ触りやすい。敬意をもって跳ぶ障害です。" } },

  { ref:"croisillon", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"le croisillon"}, en:{m:"the cross-pole", p:"kross-pôle", var:"cross-rail (US)"},
           es:{m:"el cruzado"}, it:{m:"la croce"},
           de:{m:"das Kreuz", p:"kroïts"}, ja:{m:"クロス", p:"kurosu"} },
    def:{ fr:"Deux barres croisées, plus basses au milieu : le premier obstacle de tous les débutants du monde, parce qu'il centre le cheval tout seul.",
          en:"Two crossed poles, lowest in the middle: every beginner's first fence anywhere, because it centres the horse by itself.",
          es:"Dos barras cruzadas, más bajas en el centro: el primer obstáculo de todos los principiantes del mundo, porque centra al caballo él solo.",
          it:"Due barriere incrociate, più basse al centro: il primo ostacolo di tutti i principianti del mondo, perché centra il cavallo da solo.",
          de:"Zwei gekreuzte Stangen, in der Mitte am niedrigsten: das erste Hindernis aller Anfänger der Welt — es zentriert das Pferd von selbst.",
          ja:"中央が低くなるよう交差させた二本のバー。世界じゅうの初心者が最初に跳ぶ障害です。ひとりでに馬を真ん中へ導いてくれるからです。" } },

  { ref:"combinaison", lecon:1, coll:"obstacles",
    mots:{ fr:{m:"la combinaison"}, en:{m:"the combination", p:"kom-bi-né-cheune", var:"a double · a treble"},
           es:{m:"la combinación"}, it:{m:"la combinazione"},
           de:{m:"die Kombination", p:"kom-bi-na-tsi-ône"}, ja:{m:"連続障害", p:"renzoku shōgai"} }, // ??
    def:{ fr:"Deux ou trois obstacles séparés d'une ou deux foulées, comptés comme un seul numéro. ⚠️ En Grande-Bretagne, on dit **a double** et **a treble** — pas « a triple », qui désigne autre chose.",
          en:"Two or three fences one or two strides apart, counted as one number. Britain says a double and a treble, never a triple.",
          es:"Dos o tres obstáculos separados por una o dos zancadas, contados como un solo número. ⚠️ En Gran Bretaña se dice **a double** y **a treble** — no « a triple », que designa otra cosa.",
          it:"Due o tre ostacoli separati da una o due falcate, contati come un solo numero. ⚠️ In Gran Bretagna si dice **a double** e **a treble** — non « a triple », che indica altro.",
          de:"Zwei oder drei Hindernisse mit ein bis zwei Galoppsprüngen dazwischen, als eine Nummer gezählt. ⚠️ In Großbritannien heißt es **a double** und **a treble** — nicht « a triple », das etwas anderes meint.",
          ja:"一、二歩の間隔で並び、ひとつの番号として数えられる二、三個の障害。⚠️ イギリスでは **a double**、**a treble** と言います。« a triple » は別のものを指すので注意。" } },

  /* ============ LEÇON 2 · LE PARCOURS ============ */

  { ref:"numero", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le numéro"}, en:{m:"the number", p:"neum-beur"},
           es:{m:"el número"}, it:{m:"il numero"},
           de:{m:"die Nummer", p:"nou-meur"}, ja:{m:"番号", p:"bangō"} },
    def:{ fr:"Chaque obstacle porte le sien, et on les saute dans l'ordre. En sauter un dans le désordre, c'est l'élimination immédiate dans tous les règlements.",
          en:"Every fence carries one, jumped in order. Taking them out of order means immediate elimination everywhere.",
          es:"Cada obstáculo lleva el suyo, y se saltan en orden. Saltar uno fuera de orden es la eliminación inmediata en todos los reglamentos.",
          it:"Ogni ostacolo porta il suo, e si saltano in ordine. Saltarne uno fuori ordine è l'eliminazione immediata in tutti i regolamenti.",
          de:"Jedes Hindernis trägt seine Nummer, gesprungen wird der Reihe nach. Eines außer der Reihe zu springen heißt in jedem Reglement sofortiges Ausscheiden.",
          ja:"障害にはそれぞれ番号があり、順番どおりに跳びます。順番を間違えれば、どの規則でも即失権です。" } },

  { ref:"fanions", lecon:2, coll:"parcours",
    mots:{ fr:{m:"les fanions"}, en:{m:"the flags", p:"flagz", var:"red on the right"},
           es:{m:"los banderines"}, it:{m:"le bandierine"},
           de:{m:"die Fähnchen", p:"fèn-cheune"}, ja:{m:"旗", p:"hata"} },
    def:{ fr:"**Rouge à droite, blanc à gauche.** C'est probablement la seule règle du monde équestre qui soit identique dans absolument tous les pays et toutes les disciplines. Le fanion rouge est le souvenir que tu rapportes de Hickstead.",
          en:"Red on the right, white on the left. Probably the only rule in the horse world that is identical in every country and discipline.",
          es:"**Rojo a la derecha, blanco a la izquierda.** Probablemente la única regla del mundo ecuestre idéntica en absolutamente todos los países y disciplinas. El banderín rojo es el recuerdo que traes de Hickstead.",
          it:"**Rosso a destra, bianco a sinistra.** Probabilmente l'unica regola del mondo equestre identica in assolutamente tutti i paesi e discipline. La bandierina rossa è il ricordo che riporti da Hickstead.",
          de:"**Rot rechts, weiß links.** Wahrscheinlich die einzige Regel der Pferdewelt, die in wirklich allen Ländern und Disziplinen gleich ist. Das rote Fähnchen ist dein Andenken aus Hickstead.",
          ja:"**赤は右、白は左。** おそらく馬の世界で唯一、すべての国とすべての競技で完全に同じルールです。赤い旗は、きみがヒックステッドから持ち帰る記念品でもあります。" } },

  { ref:"reconnaissance", lecon:2, coll:"parcours", v:true,
    mots:{ fr:{m:"reconnaître le parcours"}, en:{m:"to walk the course", p:"ouôk ze korss"},
           es:{m:"reconocer el recorrido"}, it:{m:"fare la ricognizione"},
           de:{m:"den Parcours besichtigen", p:"be-zirh-ti-gueune"}, ja:{m:"コース下見", p:"kōsu shitami"} }, // ??
    def:{ fr:"⚠️ L'anglais dit littéralement **« marcher le parcours »**, et c'est plus exact que le mot français : on le marche pour compter les foulées entre les obstacles, à pas réguliers de 80 cm.",
          en:"English says literally « walk the course », which is the more accurate phrase: you pace it out to count strides, in 80 cm steps.",
          es:"⚠️ El inglés dice literalmente **« caminar el recorrido »**, y es más exacto que la palabra francesa: se camina para contar las zancadas entre obstáculos, a pasos regulares de 80 cm.",
          it:"⚠️ L'inglese dice alla lettera **« camminare il percorso »**, ed è più esatto della parola francese: lo si cammina per contare le falcate tra gli ostacoli, a passi regolari di 80 cm.",
          de:"⚠️ Das Englische sagt wörtlich **« den Parcours abgehen »** — genauer als das französische Wort: Man geht ihn ab, um die Galoppsprünge zu zählen, in gleichmäßigen 80-cm-Schritten.",
          ja:"⚠️ 英語は文字どおり**「コースを歩く」**と言い、フランス語より正確です。障害間の歩数を数えるために、80cmの規則正しい歩幅で歩くのですから。" } },

  { ref:"contrat-foulees", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le contrat de foulées"}, en:{m:"the striding", p:"straï-ding", var:"a four-stride distance"},
           es:{m:"el número de trancos"}, it:{m:"il numero di falcate"},
           de:{m:"die Distanz", p:"dis-tanntss", var:"Galoppsprünge zählen"}, ja:{m:"歩数", p:"hosū"} }, // ??
    def:{ fr:"Le nombre de foulées prévu entre deux obstacles d'une même ligne. Une foulée de galop vaut environ 3,50 m ; la reconnaissance sert à vérifier si le chef de piste a mis quatre foulées ou quatre foulées « longues ».",
          en:"The number of strides planned between two fences on a line. A canter stride is about 3.50 m.",
          es:"El número de zancadas previsto entre dos obstáculos de una misma línea. Una zancada de galope vale unos 3,50 m; el reconocimiento sirve para verificar si el jefe de pista puso cuatro zancadas o cuatro zancadas « largas ».",
          it:"Il numero di falcate previsto tra due ostacoli della stessa linea. Una falcata di galoppo vale circa 3,50 m; la ricognizione serve a verificare se il direttore di campo ha messo quattro falcate o quattro falcate « lunghe ».",
          de:"Die vorgesehene Zahl der Galoppsprünge zwischen zwei Hindernissen einer Linie. Ein Galoppsprung misst etwa 3,50 m; beim Abgehen prüft man, ob der Parcoursbauer vier Sprünge gestellt hat — oder vier « lange ».",
          ja:"同じライン上のふたつの障害のあいだに想定された歩数。駈歩一歩は約3.5メートル。下見の目的は、コースデザイナーが置いたのが四歩なのか、「長め」の四歩なのかを確かめることです。" } },

  { ref:"ligne", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la ligne"}, en:{m:"the related distance", p:"ri-lé-tid dis-teunce", var:"a line"},
           es:{m:"la línea"}, it:{m:"la linea"},
           de:{m:"die Linie", p:"li-ni-e"}, ja:{m:"ライン", p:"rain"} },
    def:{ fr:"Deux obstacles assez proches pour que le nombre de foulées soit imposé. Au-delà, on parle de deux obstacles indépendants, et le cavalier choisit son tracé.",
          en:"Two fences close enough that the stride count is dictated. Beyond that they are independent and you choose your track.",
          es:"Dos obstáculos lo bastante cercanos para que el número de zancadas venga impuesto. Más allá, se habla de obstáculos independientes, y el jinete elige su trazado.",
          it:"Due ostacoli abbastanza vicini perché il numero di falcate sia imposto. Oltre, si parla di ostacoli indipendenti, e il cavaliere sceglie il suo tracciato.",
          de:"Zwei Hindernisse, nah genug, dass die Sprungzahl vorgegeben ist. Darüber hinaus spricht man von unabhängigen Hindernissen — der Reiter wählt seine Linie.",
          ja:"歩数が事実上決まってしまうほど近いふたつの障害。それより離れれば独立した障害と呼ばれ、走る線は騎手が選びます。" } },

  { ref:"abord", lecon:2, coll:"parcours",
    mots:{ fr:{m:"l'abord"}, en:{m:"the approach", p:"a-prôtch"},
           es:{m:"la aproximación"}, it:{m:"l'avvicinamento"},
           de:{m:"der Anritt", p:"an-ritt"}, ja:{m:"アプローチ", p:"apurōchi"} }, // ??
    def:{ fr:"Les dernières foulées avant l'obstacle : rythme, équilibre, rectitude. C'est là que le saut se gagne ou se perd, jamais au-dessus de la barre.",
          en:"The last strides before the fence: rhythm, balance, straightness. The jump is won or lost here, never over the pole.",
          es:"Las últimas zancadas antes del obstáculo: ritmo, equilibrio, rectitud. Ahí se gana o se pierde el salto, jamás encima de la barra.",
          it:"Le ultime falcate prima dell'ostacolo: ritmo, equilibrio, rettitudine. È lì che il salto si vince o si perde, mai sopra la barriera.",
          de:"Die letzten Galoppsprünge vor dem Hindernis: Rhythmus, Gleichgewicht, Geraderichtung. Dort wird der Sprung gewonnen oder verloren — nie über der Stange.",
          ja:"障害前の最後の数歩。リズム、バランス、真直。跳躍の勝負はここで決まります。バーの上で決まることは決してありません。" } },

  { ref:"battue", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la battue"}, en:{m:"the take-off", p:"téïk-off"},
           es:{m:"la batida"}, it:{m:"la battuta"}, // ??
           de:{m:"der Absprung", p:"ap-chproung"}, ja:{m:"踏切", p:"fumikiri"} },
    def:{ fr:"Le point d'où le cheval décolle. Trop près, il se fait « bloquer » ; trop loin, il s'aplatit. Toutes les langues nomment ici l'action du pied qui frappe le sol.",
          en:"The point where the horse leaves the ground. Too close and he is stuffed under it; too far and he flattens.",
          es:"El punto desde donde el caballo despega. Demasiado cerca, se « bloquea »; demasiado lejos, se aplana. Todas las lenguas nombran aquí la acción del pie que golpea el suelo.",
          it:"Il punto da cui il cavallo stacca. Troppo vicino, si « blocca »; troppo lontano, si appiattisce. Tutte le lingue nominano qui l'azione del piede che batte il suolo.",
          de:"Der Punkt, an dem das Pferd abspringt. Zu nah wird es « verhalten », zu weit wird es flach. Alle Sprachen benennen hier den Huf, der den Boden schlägt.",
          ja:"馬が踏み切る地点。近すぎれば詰まり、遠すぎれば跳びが平たくなります。どの言語もここでは、地面を打つ蹄の動きを言葉にしています。" } },

  { ref:"reception", lecon:2, coll:"parcours",
    mots:{ fr:{m:"la réception"}, en:{m:"the landing", p:"lan-ding"},
           es:{m:"la recepción"}, it:{m:"l'atterraggio"}, // ??
           de:{m:"die Landung", p:"lan-doung"}, ja:{m:"着地", p:"chakuchi"} },
    def:{ fr:"Le retour au sol, un antérieur après l'autre. C'est le moment le plus dur pour les membres du cheval, et celui où le cavalier doit déjà regarder l'obstacle suivant.",
          en:"Coming back down, one foreleg after the other. Hardest moment for the horse's legs, and the moment you should already be looking at the next fence.",
          es:"La vuelta al suelo, un anterior tras otro. Es el momento más duro para las extremidades del caballo, y aquel en que el jinete ya debe mirar el obstáculo siguiente.",
          it:"Il ritorno a terra, un anteriore dopo l'altro. È il momento più duro per gli arti del cavallo, e quello in cui il cavaliere deve già guardare l'ostacolo successivo.",
          de:"Die Landung, ein Vorderbein nach dem anderen. Der härteste Moment für die Gliedmaßen — und der, in dem der Reiter schon zum nächsten Hindernis schauen muss.",
          ja:"前肢が一本ずつ地面へ戻る瞬間。馬の脚に最も負担のかかる局面であり、騎手がもう次の障害を見ていなければならない局面でもあります。" } },

  { ref:"trace", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le tracé"}, en:{m:"the line", p:"laïne", var:"your track"},
           es:{m:"el trazado"}, it:{m:"il tracciato"},
           de:{m:"die Linienführung", p:"li-ni-eune-fu-roung"}, ja:{m:"走行ライン", p:"sōkō rain"} }, // ??
    def:{ fr:"Le chemin choisi entre les obstacles. En barrage, c'est lui qui fait gagner : le sans-faute le plus rapide n'est presque jamais celui qui a galopé le plus vite, mais celui qui a tourné le plus court.",
          en:"The path chosen between fences. In a jump-off it is what wins: the fastest clear is rarely the fastest gallop, but the tightest turns.",
          es:"El camino elegido entre los obstáculos. En el desempate, es él quien hace ganar: el cero más rápido casi nunca es el que más galopó, sino el que giró más corto.",
          it:"Il tracciato scelto tra gli ostacoli. In barrage, è lui che fa vincere: il netto più veloce non è quasi mai quello che ha galoppato più forte, ma quello che ha girato più stretto.",
          de:"Der gewählte Weg zwischen den Hindernissen. Im Stechen entscheidet er: Die schnellste Nullrunde ist fast nie die mit dem höchsten Tempo, sondern die mit den engsten Wendungen.",
          ja:"障害と障害のあいだで選ぶ走行線。ジャンプオフで勝敗を分けるのはこれです。最速のクリアラウンドは、いちばん速く走った者ではなく、いちばん短く回った者のもの — ほとんどの場合。" } },

  { ref:"paddock-detente", lecon:2, coll:"parcours",
    mots:{ fr:{m:"le paddock de détente"}, en:{m:"the collecting ring", p:"ko-lèk-ting ring", var:"the warm-up"},
           es:{m:"la pista de calentamiento", var:"el paddock"}, it:{m:"il campo prova"},
           de:{m:"der Abreiteplatz", p:"ap-raï-te-plats"}, ja:{m:"練習馬場", p:"renshū baba"} }, // ??
    def:{ fr:"L'aire où l'on se détend avant de passer, avec ses propres règles de circulation. ⚠️ Troisième sens du mot « paddock » rencontré dans le module : l'enclos (chapitre 1), le rond de présentation japonais, et ici l'aire de détente. L'anglais évite le piège en disant *collecting ring*.",
          en:"The warm-up area, with its own traffic rules. This is the third meaning of « paddock » in the module; English avoids it with collecting ring.",
          es:"El área donde uno calienta antes de salir, con sus propias reglas de circulación. ⚠️ Tercer sentido de « paddock » en el módulo: el cercado (capítulo 1), el círculo de presentación japonés, y aquí el área de calentamiento. El inglés esquiva la trampa diciendo *collecting ring*.",
          it:"L'area dove ci si scalda prima di entrare, con le sue regole di circolazione. ⚠️ Terzo senso di « paddock » nel modulo: il recinto (capitolo 1), il tondino di presentazione giapponese, e qui il campo prova. L'inglese evita la trappola dicendo *collecting ring*.",
          de:"Der Platz zum Abreiten vor dem Start, mit eigenen Bahnregeln. ⚠️ Die dritte Bedeutung von « Paddock » im Modul: das Gehege (Kapitel 1), der japanische Führring — und hier der Abreiteplatz. Das Englische umgeht die Falle mit *collecting ring*.",
          ja:"出番前に体を温める場所。独自の走行ルールがあります。⚠️ この教材で三つ目の「パドック」です。囲い（第1章）、日本の競馬のパドック、そしてここでは練習馬場。英語は *collecting ring* と言って罠を避けています。" } },

  /* ============ LEÇON 3 · LES FAUTES ============ */

  { ref:"barre-tombee", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la barre tombée"}, en:{m:"a knockdown", p:"nok-daoune", var:"a fence down · four faults"},
           es:{m:"un derribo"}, it:{m:"un abbattimento"},
           de:{m:"der Abwurf", p:"ap-vourf"}, ja:{m:"落下", p:"rakka"} },
    def:{ fr:"Quatre points, dans le monde entier. En Grande-Bretagne on ne dit presque jamais « a knockdown » à chaud mais **« four faults »**, ou simplement « he had one down ».",
          en:"Four faults, worldwide. In Britain nobody says knockdown in the moment — they say « four faults » or « he had one down ».",
          es:"Cuatro puntos, en el mundo entero. En Gran Bretaña casi nunca se dice « a knockdown » en caliente sino **« four faults »**, o simplemente « he had one down ».",
          it:"Quattro punti, nel mondo intero. In Gran Bretagna non si dice quasi mai « a knockdown » a caldo ma **« four faults »**, o semplicemente « he had one down ».",
          de:"Vier Punkte, weltweit. In Großbritannien sagt man im Moment fast nie « a knockdown », sondern **« four faults »** oder schlicht « he had one down ».",
          ja:"世界じゅうどこでも四点。イギリスでその場で聞くのは « a knockdown » ではなく、ほぼ必ず **« four faults »** か、単に « he had one down » です。" } },

  { ref:"refus", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le refus"}, en:{m:"a refusal", p:"ri-fiou-zeul", var:"a stop"},
           es:{m:"un rehúse"}, it:{m:"un rifiuto"},
           de:{m:"die Verweigerung", p:"fèr-vaï-gue-roung"}, ja:{m:"拒止", p:"kyoshi"} }, // ??
    def:{ fr:"Le cheval s'arrête devant l'obstacle. À l'oral, un cavalier britannique dira plutôt **« he stopped »** que « he refused » — le mot du règlement n'est pas celui du paddock.",
          en:"The horse stops in front of the fence. Out loud a British rider says « he stopped », not « he refused ».",
          es:"El caballo se para ante el obstáculo. Oralmente, un jinete británico dirá antes **« he stopped »** que « he refused » — la palabra del reglamento no es la del paddock.",
          it:"Il cavallo si ferma davanti all'ostacolo. All'orale, un cavaliere britannico dirà piuttosto **« he stopped »** che « he refused » — la parola del regolamento non è quella del paddock.",
          de:"Das Pferd hält vor dem Hindernis an. Mündlich sagt ein Brite eher **« he stopped »** als « he refused » — das Reglementwort ist nicht das Stallwort.",
          ja:"馬が障害の前で止まること。話し言葉でイギリスの騎手が言うのは « he refused » より **« he stopped »** — 規則書の言葉と、現場の言葉は別物です。" } },

  { ref:"derobade", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la dérobade"}, en:{m:"a run-out", p:"reune-aoute"},
           es:{m:"una escapada"}, it:{m:"una scappata", var:"uno scarto"}, /* it precise (rapport 07/08) ; ⚠️ es : ligne du rapport inutilisable, toujours a valider */
           de:{m:"das Vorbeilaufen", p:"for-baï-laou-feune"}, ja:{m:"逃避", p:"tōhi", var:"斜走 = en club"} }, /* ja precise (rapport 07/08) */
    def:{ fr:"Le cheval passe à côté de l'obstacle au lieu de le sauter. L'allemand est le plus descriptif des six : *Vorbeilaufen*, « courir à côté ».",
          en:"The horse goes past the fence instead of over it. German is the most literal of the six: « running past ».",
          es:"El caballo pasa al lado del obstáculo en vez de saltarlo. El alemán es el más descriptivo de los seis: *Vorbeilaufen*, « correr al lado ».",
          it:"Il cavallo passa accanto all'ostacolo invece di saltarlo. Il tedesco è il più descrittivo dei sei: *Vorbeilaufen*, « correre accanto ».",
          de:"Das Pferd läuft am Hindernis vorbei, statt zu springen. Das Deutsche ist das anschaulichste der sechs: das Vorbeilaufen.",
          ja:"馬が障害を跳ばずに横をすり抜けること。六言語でいちばん描写的なのはドイツ語です — *Vorbeilaufen*、「横を走り抜けること」。" } },

  { ref:"desobeissance", lecon:3, coll:"fautes",
    mots:{ fr:{m:"la désobéissance"}, en:{m:"a disobedience", p:"diss-o-bi-dieunce"},
           es:{m:"una desobediencia"}, it:{m:"una disobbedienza"},
           de:{m:"der Ungehorsam", p:"oune-gue-hor-zam"}, ja:{m:"不従順", p:"fujūjun"} }, // ??
    def:{ fr:"Le terme du règlement qui englobe refus, dérobade et volte non autorisée. Utile à connaître parce que c'est lui qui est écrit sur la feuille, pas les mots qu'on emploie en parlant.",
          en:"The rulebook term covering refusal, run-out and unauthorised circle. Worth knowing because it is what appears on the sheet.",
          es:"El término del reglamento que engloba rehúse, escapada y vuelta no autorizada. Útil de conocer porque es el que está escrito en la hoja, no las palabras que se usan al hablar.",
          it:"Il termine del regolamento che ingloba rifiuto, scarto e volta non autorizzata. Utile da conoscere perché è quello scritto sul foglio, non le parole che si usano parlando.",
          de:"Der Reglementbegriff für Verweigern, Ausbrechen und unerlaubte Volte. Gut zu kennen, weil ER auf dem Bogen steht — nicht die Wörter, die man beim Reden benutzt.",
          ja:"拒止、逃避、無許可の巻き乗りをまとめて指す規則上の用語。用紙に書かれるのはこの言葉なので、知っておく価値があります。話すときに使う言葉とは別なのです。" } },

  { ref:"penalites", lecon:3, coll:"fautes",
    mots:{ fr:{m:"les points de pénalité"}, en:{m:"the faults", p:"fôlts", var:"penalties"},
           es:{m:"los puntos de penalización"}, it:{m:"le penalità"},
           de:{m:"die Strafpunkte", p:"chtraf-pounk-te"}, ja:{m:"減点", p:"genten"} },
    def:{ fr:"⚠️ Le piège de compréhension le plus fréquent en concours à l'étranger : l'anglais ne compte pas en points mais en **faults**. « Four faults » = une barre. Dire « I got four points » ne veut rien dire pour un Britannique.",
          en:"English counts in faults, not points. « Four faults » means one fence down; « I got four points » means nothing.",
          es:"⚠️ La trampa de comprensión más frecuente en concurso en el extranjero: el inglés no cuenta en puntos sino en **faults**. « Four faults » = una barra. Decir « I got four points » no significa nada para un británico.",
          it:"⚠️ La trappola di comprensione più frequente in concorso all'estero: l'inglese non conta in punti ma in **faults**. « Four faults » = una barriera. Dire « I got four points » non vuol dire niente per un britannico.",
          de:"⚠️ Die häufigste Verständnisfalle im Auslandsturnier: Das Englische zählt nicht in Punkten, sondern in **faults**. « Four faults » = eine Stange. « I got four points » sagt einem Briten nichts.",
          ja:"⚠️ 海外の競技会でいちばん多いすれ違い：英語は点ではなく **faults** で数えます。« four faults » はバー一本。« I got four points » と言っても、イギリス人には通じません。" } },

  { ref:"temps-accorde", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le temps accordé"}, en:{m:"the time allowed", p:"taïm a-laoude"},
           es:{m:"el tiempo concedido"}, it:{m:"il tempo concesso"},
           de:{m:"die erlaubte Zeit", p:"èr-laoup-te tsaïte"}, ja:{m:"規定時間", p:"kitei jikan"} }, // ??
    def:{ fr:"Calculé sur la longueur du parcours et affiché avant l'épreuve. Il ne s'agit pas d'aller vite mais de ne pas traîner : le dépasser coûte cher pour rien.",
          en:"Worked out from the course length and posted before the class. Not a race — just do not dawdle.",
          es:"Calculado sobre la longitud del recorrido y anunciado antes de la prueba. No se trata de ir rápido sino de no remolonear: superarlo cuesta caro para nada.",
          it:"Calcolato sulla lunghezza del percorso e affisso prima della prova. Non si tratta di andare veloci ma di non attardarsi: superarlo costa caro per niente.",
          de:"Aus der Parcourslänge errechnet und vor der Prüfung ausgehängt. Es geht nicht um Eile, sondern ums Nicht-Trödeln: Ihn zu überschreiten kostet teuer — für nichts.",
          ja:"コースの長さから計算され、競技前に掲示される時間。速く走るためではなく、だらだらしないための基準です。超えれば、何の得もなく高くつきます。" } },

  { ref:"temps-depasse", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le dépassement de temps"}, en:{m:"time faults", p:"taïm fôlts"},
           es:{m:"los puntos por tiempo"}, it:{m:"le penalità di tempo"},
           de:{m:"die Zeitstrafpunkte", p:"tsaïte-chtraf-pounk-te"}, ja:{m:"時間減点", p:"jikan genten"} }, // ??
    def:{ fr:"Des fractions de point par seconde au-delà du temps accordé. C'est la faute la plus rageante : un parcours parfait perdu pour deux secondes de trop.",
          en:"Fractions of a fault per second over the time allowed — the most infuriating way to lose a perfect round.",
          es:"Fracciones de punto por segundo más allá del tiempo concedido. Es la falta más rabiosa: un recorrido perfecto perdido por dos segundos de más.",
          it:"Frazioni di punto per secondo oltre il tempo concesso. È l'errore più rabbioso: un percorso perfetto perso per due secondi di troppo.",
          de:"Bruchteile von Punkten pro Sekunde über der erlaubten Zeit. Der ärgerlichste Fehler: eine perfekte Runde, verloren für zwei Sekunden zu viel.",
          ja:"規定時間を超えた秒数ごとに加算される減点。いちばん悔しいミスです — 完璧な走行が、たった二秒の超過で消えてしまうのですから。" } },

  { ref:"elimination", lecon:3, coll:"fautes",
    mots:{ fr:{m:"l'élimination"}, en:{m:"elimination", p:"i-li-mi-né-cheune", var:"you're out"},
           es:{m:"la eliminación"}, it:{m:"l'eliminazione"},
           de:{m:"das Ausscheiden", p:"aouss-chaï-deune"}, ja:{m:"失権", p:"shikken"} },
    def:{ fr:"Deux désobéissances, un obstacle dans le mauvais ordre, une chute, un franchissement hors des fanions. La cloche sonne, on s'arrête et on salue.",
          en:"Two disobediences, a fence out of order, a fall, or jumping outside the flags. The bell rings, you stop and salute.",
          es:"Dos desobediencias, un obstáculo en mal orden, una caída, un franqueo fuera de banderines. Suena la campana, uno se detiene y saluda.",
          it:"Due disobbedienze, un ostacolo nell'ordine sbagliato, una caduta, un passaggio fuori dalle bandierine. Suona la campana, ci si ferma e si saluta.",
          de:"Zwei Ungehorsamkeiten, ein Hindernis in falscher Reihenfolge, ein Sturz, ein Sprung außerhalb der Fähnchen. Die Glocke läutet, man hält an und grüßt.",
          ja:"二度の反抗、順番違い、落馬、旗の外の飛越。ベルが鳴ったら止まり、敬礼して退場します。" } },

  { ref:"abandon", lecon:3, coll:"fautes",
    mots:{ fr:{m:"l'abandon"}, en:{m:"to retire", p:"ri-taï-eur", var:"RET on the sheet"},
           es:{m:"la retirada"}, it:{m:"il ritiro"},
           de:{m:"das Aufgeben", p:"aouf-gué-beune"}, ja:{m:"棄権", p:"kiken"} },
    def:{ fr:"Renoncer volontairement en cours de parcours. Ce n'est pas un échec : c'est parfois la meilleure décision de la journée pour un cheval qui a perdu confiance.",
          en:"Choosing to stop mid-round. Not a failure — sometimes the best decision of the day for a horse who has lost confidence.",
          es:"Renunciar voluntariamente en pleno recorrido. No es un fracaso: a veces es la mejor decisión del día para un caballo que perdió la confianza.",
          it:"Rinunciare volontariamente durante il percorso. Non è un fallimento: a volte è la migliore decisione della giornata per un cavallo che ha perso fiducia.",
          de:"Freiwillig mitten im Parcours aufgeben. Kein Scheitern: Manchmal ist es die beste Entscheidung des Tages für ein Pferd, das sein Vertrauen verloren hat.",
          ja:"走行の途中で自ら退くこと。失敗ではありません。自信を失った馬にとって、その日いちばん正しい決断であることもあるのです。" } },

  { ref:"sans-faute", lecon:3, coll:"fautes",
    mots:{ fr:{m:"le sans-faute"}, en:{m:"a clear round", p:"kli-eur raounde", var:"a clear"},
           es:{m:"un cero faltas"}, it:{m:"un percorso netto"},
           de:{m:"die Nullrunde", p:"noul-roune-de"}, ja:{m:"減点なし", p:"gentennashi", var:"クリアラウンド"} }, // ??
    def:{ fr:"Zéro point. ⚠️ La phrase exacte à reconnaître en Grande-Bretagne est **« a clear round »** — et dans les concours de club britanniques, il existe même une épreuve appelée *clear round* où chaque sans-faute reçoit une rosette, sans classement.",
          en:"No faults. In Britain « a clear round » is also the name of a class where every clear gets a rosette and nobody is placed.",
          es:"Cero puntos. ⚠️ La frase exacta que hay que reconocer en Gran Bretaña es **« a clear round »** — y en los concursos de club británicos existe incluso una prueba llamada *clear round* donde cada cero recibe una escarapela, sin clasificación.",
          it:"Zero punti. ⚠️ La frase esatta da riconoscere in Gran Bretagna è **« a clear round »** — e nei concorsi di club britannici esiste perfino una prova chiamata *clear round* dove ogni netto riceve una coccarda, senza classifica.",
          de:"Null Punkte. ⚠️ Der Satz, den man in Großbritannien erkennen muss: **« a clear round »** — in britischen Clubturnieren gibt es sogar eine Prüfung namens *clear round*, in der jede Nullrunde eine Schleife bekommt, ohne Platzierung.",
          ja:"減点ゼロのこと。⚠️ イギリスで聞き取るべき正確な言い回しは **« a clear round »**。イギリスのクラブ競技会にはその名も *clear round* という種目まであり、クリアした全員が順位なしでロゼットをもらえます。" } },

  /* ============ LEÇON 4 · LE SAUT ET L'ÉPREUVE ============ */

  { ref:"saut", lecon:4, coll:"saut",
    mots:{ fr:{m:"le saut"}, en:{m:"the jump", p:"djeump"},
           es:{m:"el salto"}, it:{m:"il salto"},
           de:{m:"der Sprung", p:"chproung"}, ja:{m:"飛越", p:"hietsu"} },
    def:{ fr:"Cinq phases enchaînées : abord, battue, planer, réception, départ. Le cavalier n'agit vraiment que sur la première — le reste, il accompagne.",
          en:"Five linked phases: approach, take-off, flight, landing, getaway. The rider only really acts on the first.",
          es:"Cinco fases encadenadas: llegada, batida, plano, recepción, salida. El jinete solo actúa de verdad en la primera — el resto, acompaña.",
          it:"Cinque fasi concatenate: arrivo, stacco, planata, ricezione, ripartenza. Il cavaliere agisce davvero solo sulla prima — il resto, accompagna.",
          de:"Fünf verkettete Phasen: Anreiten, Absprung, Flug, Landung, Weiterreiten. Wirklich einwirken kann der Reiter nur auf die erste — den Rest begleitet er.",
          ja:"連なる五つの局面 — 進入、踏切、滞空、着地、再発進。騎手が本当に働きかけられるのは最初のひとつだけ。あとは、寄り添うだけです。" } },

  { ref:"sauter", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"sauter"}, en:{m:"to jump", p:"djeumpe", var:"to pop over = sauter tranquillement"},
           es:{m:"saltar"}, it:{m:"saltare"},
           de:{m:"springen", p:"chprin-gueune"}, ja:{m:"飛越する", p:"hietsu suru"} },
    def:{ fr:"⚠️ Expression britannique très utile : **« pop over »** veut dire sauter sans en faire une affaire — « just pop him over a cross-pole » est une invitation détendue, pas un exercice.",
          en:"A useful British phrase: « pop over » means jump without making a fuss — « just pop him over a cross-pole ».",
          es:"⚠️ Expresión británica muy útil: **« pop over »** significa saltar sin darle importancia — « just pop him over a cross-pole » es una invitación relajada, no un ejercicio.",
          it:"⚠️ Espressione britannica molto utile: **« pop over »** vuol dire saltare senza farne un dramma — « just pop him over a cross-pole » è un invito rilassato, non un esercizio.",
          de:"⚠️ Sehr nützliche britische Wendung: **« pop over »** heißt springen, ohne ein Ding daraus zu machen — « just pop him over a cross-pole » ist eine entspannte Einladung, keine Übung.",
          ja:"⚠️ とても便利なイギリス表現：**« pop over »** は、気負わずひょいと跳ぶこと。« just pop him over a cross-pole » は肩の力の抜けた誘いであって、課題ではありません。" } },

  { ref:"foulee", lecon:4, coll:"saut",
    mots:{ fr:{m:"la foulée"}, en:{m:"the stride", p:"straïde"},
           es:{m:"el tranco"}, it:{m:"la falcata"},
           de:{m:"der Galoppsprung", p:"ga-lopp-chproung"}, ja:{m:"ストライド", p:"sutoraido"} }, // ??
    def:{ fr:"Un cycle complet de galop, environ 3,50 m chez un cheval de taille moyenne. L'allemand est très logique : *Galoppsprung*, « le bond de galop » — chaque foulée de galop est déjà un petit saut.",
          en:"One full canter cycle, about 3.50 m. German calls it a canter leap — every stride is already a small jump.",
          es:"Un ciclo completo de galope, unos 3,50 m en un caballo mediano. El alemán es muy lógico: *Galoppsprung*, « el brinco de galope » — cada zancada de galope ya es un pequeño salto.",
          it:"Un ciclo completo di galoppo, circa 3,50 m in un cavallo di taglia media. Il tedesco è molto logico: *Galoppsprung*, « il balzo di galoppo » — ogni falcata di galoppo è già un piccolo salto.",
          de:"Ein voller Galoppzyklus, etwa 3,50 m beim mittelgroßen Pferd. Das Deutsche ist ganz logisch: der Galoppsprung — jeder Galopptritt ist schon ein kleiner Sprung.",
          ja:"駈歩のひと巡り。中型の馬でおよそ3.5メートルです。ドイツ語はじつに論理的で *Galoppsprung*、「駈歩の跳躍」— 駈歩の一歩一歩が、すでに小さなジャンプなのです。" } },

  { ref:"voir-foulee", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"voir sa foulée"}, en:{m:"to see a stride", p:"si eu straïde", var:"a good eye"},
           es:{m:"ver la distancia"}, it:{m:"vedere la distanza"},
           de:{m:"den Absprung sehen", p:"ap-chproung zé-eune"}, ja:{m:"踏切を見る", p:"fumikiri o miru"} }, // ??
    def:{ fr:"Percevoir d'assez loin où le cheval va décoller. ⚠️ L'anglais en a fait une qualité de la personne : **« she has a good eye »**, un compliment qu'on entend beaucoup au bord d'une piste britannique.",
          en:"Sensing from a distance where the horse will take off. English made it a personal quality: « she has a good eye ».",
          es:"Percibir desde bastante lejos dónde va a despegar el caballo. ⚠️ El inglés hizo de ello una cualidad de la persona: **« she has a good eye »**, un cumplido que se oye mucho al borde de una pista británica.",
          it:"Percepire da abbastanza lontano dove il cavallo staccherà. ⚠️ L'inglese ne ha fatto una qualità della persona: **« she has a good eye »**, un complimento che si sente molto a bordo campo britannico.",
          de:"Früh erkennen, wo das Pferd abspringen wird. ⚠️ Das Englische machte daraus eine Eigenschaft der Person: **« she has a good eye »** — ein Lob, das man am britischen Parcoursrand oft hört.",
          ja:"馬がどこで踏み切るかを、手前から感じ取る力。⚠️ 英語はこれを人の資質にしました — **« she has a good eye »**。イギリスの馬場の柵ぎわでよく聞こえてくる、賛辞の言葉です。" } },

  { ref:"toucher", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"toucher la barre"}, en:{m:"to rub", p:"reub", var:"to touch · to rattle"},
           es:{m:"tocar la barra"}, it:{m:"toccare la barriera"},
           de:{m:"touchieren", p:"tou-chi-reune"}, ja:{m:"触れる", p:"fureru"} },
    def:{ fr:"Frôler sans faire tomber : aucune pénalité, dans aucun règlement moderne. ⚠️ L'allemand emploie ici un verbe d'origine française, *touchieren*, que le français n'utilise pas sous cette forme.",
          en:"Brushing without dislodging: no penalty under any modern rules. German borrows a French-looking verb, touchieren.",
          es:"Rozar sin derribar: ninguna penalización, en ningún reglamento moderno. ⚠️ El alemán emplea aquí un verbo de origen francés, *touchieren*, que el francés no usa en esa forma.",
          it:"Sfiorare senza far cadere: nessuna penalità, in nessun regolamento moderno. ⚠️ Il tedesco usa qui un verbo d'origine francese, *touchieren*, che il francese non usa in quella forma.",
          de:"Berühren, ohne abzuwerfen: kein Abzug, in keinem modernen Reglement. ⚠️ Das Deutsche benutzt hier ein französischstämmiges Verb — *touchieren* —, das das Französische so nicht kennt.",
          ja:"落とさずにかすること。現代のどの規則でも減点はありません。⚠️ ドイツ語はここでフランス語由来の動詞 *touchieren* を使いますが、フランス語自身はその形を使わないのです。" } },

  { ref:"cavaletti", lecon:4, coll:"saut",
    mots:{ fr:{m:"le cavaletti"}, en:{m:"cavaletti", p:"ka-va-lè-ti"},
           es:{m:"los cavaletti"}, it:{m:"i cavalletti"},
           de:{m:"die Cavaletti", p:"ka-va-lè-ti"}, ja:{m:"カバレッティ", p:"kabaretti"} },
    def:{ fr:"Les petites barres sur croisillons de bois, pour le travail du rythme et de la cadence. Cas unique dans tout le module : c'est **l'italien** qui a gagné dans les six langues — héritage de l'école de Pinerolo et du système Caprilli.",
          en:"Small poles on wooden crosses, for rhythm work. Unique in the module: the Italian word won in all six languages.",
          es:"Las barritas sobre cruces de madera, para el trabajo del ritmo y la cadencia. Caso único en todo el módulo: es **el italiano** el que ganó en las seis lenguas — herencia de la escuela de Pinerolo y del sistema Caprilli.",
          it:"Le barrette su crocette di legno, per il lavoro del ritmo e della cadenza. Caso unico in tutto il modulo: è **l'italiano** ad aver vinto nelle sei lingue — eredità della scuola di Pinerolo e del sistema Caprilli.",
          de:"Die kleinen Stangen auf Holzkreuzen, für Rhythmus- und Taktarbeit. Einmalig im ganzen Modul: **Das Italienische** hat in allen sechs Sprachen gewonnen — Erbe der Schule von Pinerolo und des Caprilli-Systems.",
          ja:"木の十字台に載せた低いバー。リズムと拍子の練習に使います。この教材全体で唯一のケース — 六言語すべてで勝ったのは**イタリア語**でした。ピネローロ校とカプリッリ式の遺産です。" } },

  { ref:"hauteur-obstacle", lecon:4, coll:"saut",
    mots:{ fr:{m:"la hauteur"}, en:{m:"the height", p:"haïte"},
           es:{m:"la altura"}, it:{m:"l'altezza"},
           de:{m:"die Höhe", p:"hö-e"}, ja:{m:"高さ", p:"takasa"} },
    def:{ fr:"Les épreuves se nomment par elle : un « 1 m 10 », un « 90 ». ⚠️ Attention, *la altura* et *l'altezza* servent aussi à la taille du cheval au garrot (chapitre 3) — seul le contexte tranche.",
          en:"Classes are named by it: a « 1.10 », a « 90 ». Note that Spanish and Italian use the same word for a horse's height at the withers.",
          es:"Las pruebas se nombran por ella: un « 1,10 », un « 90 ». ⚠️ Ojo, *la altura* y *l'altezza* sirven también para la alzada del caballo (capítulo 3) — solo el contexto decide.",
          it:"Le prove si chiamano con lei: un « 1,10 », un « 90 ». ⚠️ Attenzione, *la altura* e *l'altezza* servono anche per la taglia del cavallo al garrese (capitolo 3) — solo il contesto decide.",
          de:"Die Prüfungen heißen nach ihr: ein « 1,10er », ein « 90er ». ⚠️ Achtung: *la altura* und *l'altezza* meinen auch das Stockmaß (Kapitel 3) — nur der Kontext entscheidet.",
          ja:"競技はこの数字で呼ばれます — 「110」、「90」。⚠️ 注意：スペイン語の *la altura* もイタリア語の *l'altezza* も、馬の体高（第3章）を指すことがあります。決めるのは文脈だけです。" } },

  { ref:"barrage", lecon:4, coll:"saut",
    mots:{ fr:{m:"le barrage"}, en:{m:"the jump-off", p:"djeump-off", var:"against the clock"},
           es:{m:"el desempate"}, it:{m:"il barrage"},
           de:{m:"das Stechen", p:"chtè-cheune"}, ja:{m:"ジャンプオフ", p:"janpu ofu"} }, // ??
    def:{ fr:"Le second parcours, raccourci et chronométré, entre les sans-faute. ⚠️ Chaque langue a fait un choix différent : l'italien garde le mot français, l'anglais décrit l'action (*jump-off*), l'espagnol le résultat (*desempate*, « le départage »), et l'allemand emploie une image d'escrime, *das Stechen*.",
          en:"The shortened, timed second round between the clears. Every language chose differently: Italian keeps the French word, German uses a fencing image.",
          es:"El segundo recorrido, acortado y cronometrado, entre los ceros. ⚠️ Cada lengua eligió distinto: el italiano guarda la palabra francesa, el inglés describe la acción (*jump-off*), el español el resultado (*desempate*), y el alemán usa una imagen de esgrima, *das Stechen*.",
          it:"Il secondo percorso, accorciato e cronometrato, tra i netti. ⚠️ Ogni lingua ha scelto diversamente: l'italiano tiene la parola francese, l'inglese descrive l'azione (*jump-off*), lo spagnolo il risultato (*desempate*, « lo spareggio »), e il tedesco usa un'immagine di scherma, *das Stechen*.",
          de:"Der zweite, verkürzte Parcours auf Zeit unter den Nullrunden. ⚠️ Jede Sprache wählte anders: Italienisch behielt das französische Wort, Englisch beschreibt die Handlung (*jump-off*), Spanisch das Ergebnis (*desempate*) — und Deutsch nahm ein Fechtbild: das Stechen.",
          ja:"クリアラウンド同士で争う、短縮されたタイム勝負の第二走行。⚠️ 言語ごとに選択が分かれました。イタリア語はフランス語をそのまま、英語は行為を（*jump-off*）、スペイン語は結果を（*desempate*、「決着」）、そしてドイツ語はフェンシングの比喩を — *das Stechen*、「突き合い」。" } },

  { ref:"chrono", lecon:4, coll:"saut",
    mots:{ fr:{m:"le chrono"}, en:{m:"the clock", p:"klok", var:"the time"},
           es:{m:"el crono"}, it:{m:"il cronometro"},
           de:{m:"die Zeit", p:"tsaïte"}, ja:{m:"タイム", p:"taimu"} },
    def:{ fr:"⚠️ L'anglais ne dit pas « the chrono » mais **the clock**, et surtout l'expression **« against the clock »** — contre la montre. C'est elle qu'on entend annoncer au micro avant un barrage.",
          en:"English says the clock, and above all « against the clock » — the phrase announced before a jump-off.",
          es:"⚠️ El inglés no dice « the chrono » sino **the clock**, y sobre todo la expresión **« against the clock »** — contra el reloj. Es la que se oye anunciar por megafonía antes de un desempate.",
          it:"⚠️ L'inglese non dice « the chrono » ma **the clock**, e soprattutto l'espressione **« against the clock »** — contro il tempo. È quella che si sente annunciare al microfono prima di un barrage.",
          de:"⚠️ Das Englische sagt nicht « the chrono », sondern **the clock** — und vor allem **« against the clock »**. Genau das hört man vor einem Stechen aus dem Lautsprecher.",
          ja:"⚠️ 英語では « the chrono » ではなく **the clock**。とりわけ **« against the clock »**（時計との勝負）という言い回しを、ジャンプオフの前に場内放送で耳にします。" } },

  { ref:"puissance", lecon:4, coll:"saut",
    mots:{ fr:{m:"l'épreuve de puissance"}, en:{m:"the puissance", p:"pu-i-sanss"},
           es:{m:"la potencia", var:"la Puissance"}, it:{m:"la potenza"}, // ??
           de:{m:"das Mächtigkeitsspringen", p:"mèrh-tirh-kaïts-chprin-gueune"}, ja:{m:"パワー競技", p:"pawā kyōgi"} }, // ??
    def:{ fr:"L'épreuve de hauteur pure, où le mur monte à chaque tour. ⚠️ Cas savoureux : **l'anglais emploie le mot français** *puissance*, prononcé à l'anglaise, et c'est le mur de Hickstead qui l'a rendu célèbre. L'allemand, fidèle à lui-même, a préféré forger *Mächtigkeitsspringen*.",
          en:"The pure height class, the wall rising each round. English uses the French word puissance — and it was the Hickstead wall that made it famous.",
          es:"La prueba de altura pura, donde el muro sube en cada ronda. ⚠️ Caso sabroso: **el inglés emplea la palabra francesa** *puissance*, pronunciada a la inglesa, y fue el muro de Hickstead quien la hizo célebre. El alemán, fiel a sí mismo, prefirió forjar *Mächtigkeitsspringen*.",
          it:"La prova di altezza pura, dove il muro sale a ogni giro. ⚠️ Caso gustoso: **l'inglese usa la parola francese** *puissance*, pronunciata all'inglese, e fu il muro di Hickstead a renderla celebre. Il tedesco, fedele a se stesso, ha preferito forgiare *Mächtigkeitsspringen*.",
          de:"Die reine Höhenprüfung, bei der die Mauer Runde für Runde steigt. ⚠️ Köstlich: **Das Englische benutzt das französische Wort** *puissance*, englisch ausgesprochen — berühmt gemacht von der Mauer von Hickstead. Das Deutsche blieb sich treu und baute *Mächtigkeitsspringen*.",
          ja:"純粋な高さの競技。壁は一巡ごとに高くなります。⚠️ 味わい深いことに、**英語はフランス語の** *puissance* **をそのまま使い**、英語ふうに発音します。有名にしたのはヒックステッドの壁。ドイツ語は自分に忠実に、*Mächtigkeitsspringen* という複合語を鍛え上げました。" } },

  { ref:"tour-honneur", lecon:4, coll:"saut",
    mots:{ fr:{m:"le tour d'honneur"}, en:{m:"the lap of honour", p:"lap of o-neur", var:"victory gallop"},
           es:{m:"la vuelta de honor"}, it:{m:"il giro d'onore"},
           de:{m:"die Ehrenrunde", p:"é-reune-roune-de"}, ja:{m:"表彰ラウンド", p:"hyōshō raundo"} }, // ??
    def:{ fr:"Le galop des vainqueurs, rosette au frontal, derrière le premier. Les Britanniques l'appellent aussi **victory gallop**, et il se fait au galop, pas au pas — un cheval fatigué peut être excusé.",
          en:"The winners' gallop behind the leader, rosettes on the browbands. The British also call it the victory gallop.",
          es:"El galope de los vencedores, escarapela en la frontalera, detrás del primero. Los británicos lo llaman también **victory gallop**, y se hace al galope, no al paso — un caballo cansado puede ser excusado.",
          it:"Il galoppo dei vincitori, coccarda al frontale, dietro il primo. I britannici lo chiamano anche **victory gallop**, e si fa al galoppo, non al passo — un cavallo stanco può essere dispensato.",
          de:"Der Galopp der Sieger, Schleife am Stirnband, hinter dem Ersten. Die Briten nennen ihn auch **victory gallop** — geritten wird er im Galopp, nicht im Schritt; ein müdes Pferd darf entschuldigt werden.",
          ja:"勝者たちの周回。額革にロゼットをつけ、優勝者の後ろに続きます。イギリスでは **victory gallop** とも呼ばれ、常歩ではなく駈歩で回ります — 疲れた馬は免除してもらえます。" } }
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
      fr:"Tu comptes combien de foulées ?",
      en:"How many strides do you count ?",
      es:"¿ Cuántos trancos cuentas ?",
      it:"Quante falcate conti ?",
      de:"Wie viele Galoppsprünge zählst du ?",
      ja:"歩数 は いくつ 数え ます か ?" },
    { ref:"quatre-points", lecon:3,
      fr:"Quatre points sur le mur.",
      en:"Four faults at the wall.",
      es:"Cuatro puntos en el muro.",
      it:"Quattro punti sul muro.",
      de:"Vier Fehler an der Mauer.",
      ja:"壁 で 四 減点 でし た。" },
    { ref:"sans-faute-barrage", lecon:4,
      fr:"Sans-faute ! Elle est au barrage.",
      en:"Clear round ! She's through to the jump-off.",
      es:"¡ Cero faltas ! Está en el desempate.",
      it:"Percorso netto ! È al barrage.",
      de:"Nullrunde ! Sie ist im Stechen.",
      ja:"減点 なし です ! ジャンプオフ に 進み ます 。" },
    { ref:"il-a-refuse", lecon:3,
      fr:"Il s'est arrêté, je le représente.",
      en:"He stopped — I'll represent him.",
      es:"Se paró, lo represento.",
      it:"Si è fermato, lo ripresento.",
      de:"Er stoppte — ich reite erneut an.",
      ja:"止まっ た ので、 もう一度 向かい ます。" },
    { ref:"quelle-hauteur", lecon:4,
      fr:"L'épreuve est à quelle hauteur ?",
      en:"What height is the class ?",
      es:"¿ A qué altura es la prueba ?",
      it:"A che altezza è la prova ?",
      de:"Auf welcher Höhe ist die Prüfung ?",
      ja:"競技 の 高さ は どれ くらい です か ?" },
    { ref:"detente-croisillon", lecon:2,
      fr:"Je me détends sur le croisillon.",
      en:"I'll pop over the cross-pole.",
      es:"Me suelto en el cruzado.",
      it:"Mi scaldo sulla crociata.",
      de:"Zum Lösen übers Kreuz.",
      ja:"クロス で 体 を ほぐし ます。" },
    { ref:"rouge-droite", lecon:2,
      fr:"Rouge à droite, blanc à gauche.",
      en:"Red right, white left.",
      es:"Rojo derecha, blanco izquierda.",
      it:"Rosso a destra, bianco a sinistra.",
      de:"Rot rechts, weiß links.",
      ja:"赤 は 右、 白 は 左。" }
  ]
};
