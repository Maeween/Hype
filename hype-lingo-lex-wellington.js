/* hype-lingo-lex-wellington.js — Hype Lingo · Chapitre « L'obstacle »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-obstacle.js, leçons 1,
   2 et 3 — AUCUN ref, AUCUNE définition, AUCUNE phrase modifiée dans
   l'opération. Seul le nom de la clé de chapitre change : `obstacle`
   devient `wellington`.

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE (« L'obstacle » /
   « Show jumping »...). Il n'a pas été renommé pour Wellington
   spécifiquement — Blandine tranchera si elle veut un titre propre à
   cette ville, plutôt que d'en inventer un ici.

   ⚠️ SÛRETÉ VÉRIFIÉE AVANT LE DÉCOUPAGE : ni `chapVirtuel()` (lingo.html)
   ni `lireLexiques()`/`aUnDialogue()` (lingo-dialogue.html) ne lisent le
   nom de la clé de chapitre pour retrouver un mot (`ref`) ou un dialogue
   (`ville`) — la maîtrise et le routage du dialogue restent donc intacts.

   TROIS LEÇONS CONSERVÉES À L'IDENTIQUE (aucune fusion, aucune
   renumérotation) :
     · leçon 1 — les obstacles (11 concepts)
     · leçon 2 — le parcours (10 concepts)
     · leçon 3 — les fautes (10 concepts)

   Le chapitre `hype-lingo-lex-obstacle.js` garde sa leçon 4 (Aachen),
   déplacée séparément dans `hype-lingo-lex-aachen.js`.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.wellington = {
  ref: "wellington",
  titre: { fr:"L'obstacle", en:"Show jumping", es:"El salto", it:"Il salto ostacoli", de:"Das Springen", ja:"障害飛越" },
  lecons: 3,

  concepts: [

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
    { ref:"il-a-refuse", lecon:3,
      fr:"Il s'est arrêté, je le représente.",
      en:"He stopped — I'll represent him.",
      es:"Se paró, lo represento.",
      it:"Si è fermato, lo ripresento.",
      de:"Er stoppte — ich reite erneut an.",
      ja:"止まっ た ので、 もう一度 向かい ます。" },
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
  ],

  dialogue: {
    ville: "wellington", lecon: 1, temps: 7, langues: ["fr","en","es","it","de","ja"],   /* 22 phrases — 24 avant le retrait du 18/08 */

    phrases: [

      /* ---- temps 1 · la reconnaissance ---- */
      { ref:"d-reconnaitre-ensemble", temps:1, dit:"joueuse", mots:["reconnaissance"],
        fr:"On va reconnaître ensemble ?",
        en:"Shall we walk the course together?",
        es:"¿Reconocemos juntas el recorrido?",
        it:"Facciamo insieme la ricognizione?",
        de:"Gehen wir den Parcours zusammen ab?",
        ja:"一緒 に コース を 下見 し ませ ん か ?" },

      { ref:"d-combien-foulees", temps:1, dit:"joueuse", mots:["foulee","ligne"],
        fr:"Combien de foulées entre les deux ?",
        en:"How many strides between the two?",
        es:"¿Cuántos trancos entre los dos?",
        it:"Quante falcate tra i due?",
        de:"Wie viele Galoppsprünge zwischen den beiden?",
        ja:"二つ の 間 は 何 歩 です か ?" },

      /* 🟥 Phrase de Blandine : le contrat de foulées, nommé par ses
         deux options. « Raccourcir » ne se dit pas sur une ligne. */
      { ref:"d-r-cinq-ou-six", temps:1, dit:"club", mots:["contrat-foulees","foulee"],
        fr:"Cinq foulées en avançant un peu, ou six foulées en attendant.",
        en:"Five if you move up a bit, or six if you wait.",
        es:"Cinco trancos yendo un poco hacia adelante, o seis esperando.",
        it:"Cinque falcate allungando un po', o sei aspettando.",
        de:"Fünf Sprünge, wenn du zulegst, oder sechs, wenn du wartest.",
        ja:"少し 前 に 出れ ば 五 歩、 待て ば 六 歩 です。" },

      { ref:"d-quelle-hauteur", temps:1, dit:"joueuse", mots:["hauteur-obstacle","parcours"],
        fr:"C'est quelle hauteur ce parcours ?",
        en:"What height is this course?",
        es:"¿De qué altura es este recorrido?",
        it:"Di che altezza è questo percorso?",
        de:"Welche Höhe hat dieser Parcours?",
        ja:"この コース は 何 センチ です か ?" },

      /* ---- temps 2 · lire la piste ---- */
      /* 🟥 La seule règle qui ne change nulle part au monde. */
      { ref:"d-r-rouge-droite", temps:2, dit:"club", mots:["fanions"],
        fr:"Rouge à droite, blanc à gauche — toujours.",
        en:"Red on the right, white on the left — always.",
        es:"Rojo a la derecha, blanco a la izquierda — siempre.",
        it:"Rosso a destra, bianco a sinistra — sempre.",
        de:"Rot rechts, weiß links — immer.",
        ja:"赤 は 右、 白 は 左。 これ は どこ でも 同じ です。" },

      { ref:"d-oxer-ou-vertical", temps:2, dit:"joueuse", mots:["numero","oxer","vertical"],
        fr:"Le numéro 7, c'est l'oxer ou le vertical ?",
        en:"Is number seven the oxer or the upright?",
        varEn:"Is number seven the oxer or the vertical?",
        es:"El número siete, ¿es el óxer o la vertical?",
        it:"Il numero sette è l'oxer o il verticale?",
        de:"Ist Nummer sieben der Oxer oder der Steilsprung?",
        ja:"七番 は オクサー です か、 垂直 障害 です か ?" },

      /* 🟥 Phrase de Blandine : ce qu'on demande, c'est la DISTANCE. */
      { ref:"d-une-ou-deux-foulees", temps:2, dit:"joueuse", mots:["combinaison","foulee"],
        fr:"Est-ce que dans la combinaison il y a une foulée ou deux foulées ?",
        en:"Is it one stride or two in the combination?",
        es:"En la combinación, ¿hay un tranco o dos?",
        it:"Nella combinazione c'è una falcata o due?",
        de:"Ist die Kombination auf einen oder zwei Sprünge gestellt?",
        ja:"コンビネーション は 一 歩 です か、 二 歩 です か ?" },

      /* 🟥 Phrase de Blandine : le défaut, le geste, et le pourquoi. */
      { ref:"d-r-combinaisons-courtes", temps:2, dit:"club", mots:["combinaison","abord"],
        fr:"Les deux combinaisons sont un peu courtes, le double et le triple. Attention à bien attendre vos sauts et à recompacter vos chevaux entre deux.",
        en:"Both combinations are a little short, the double and the treble. Make sure you wait for your fences and rebalance in between.",
        es:"Las dos combinaciones son algo cortas, la doble y la triple. Cuidado con esperar los saltos y volver a reunir a los caballos entre medias.",
        it:"Le due combinazioni sono un po' corte, la doppia e la tripla. Attente ad aspettare i salti e a riequilibrare i cavalli in mezzo.",
        de:"Beide Kombinationen sind etwas kurz, die zweifache und die dreifache. Wartet auf eure Sprünge und versammelt die Pferde dazwischen wieder.",
        ja:"ダブル も トリプル も 距離 が やや 短い です。 踏み切り を よく 待っ て、 間 で 馬 を もう一度 まとめ て ください。" },

      /* ---- temps 3 · la détente ---- */
      /* 🟥 Phrase de Blandine : on compte EN CHEVAUX, pas en minutes. */
      { ref:"d-r-huit-chevaux", temps:3, dit:"club", mots:["paddock-detente"],
        fr:"Huit chevaux maximum en même temps au paddock. Vous pourrez rentrer dans deux chevaux.",
        en:"Eight horses maximum in the collecting ring — you can come in in two horses' time.",
        es:"Ocho caballos como máximo en el paddock. Podrá entrar dentro de dos caballos.",
        it:"Otto cavalli al massimo nel campo prova. Potrà entrare tra due cavalli.",
        de:"Höchstens acht Pferde gleichzeitig auf dem Abreiteplatz. Sie können in zwei Pferden hereinkommen.",
        ja:"下見 場 に は 同時 に 八 頭 まで です。 二 頭 後 に 入っ て ください。" },

      { ref:"d-croisillon-commencer", temps:3, dit:"joueuse", mots:["croisillon"],
        fr:"Est-ce que je peux mettre un croisillon pour commencer ?",
        en:"Can I start over a cross-pole?",
        es:"¿Puedo empezar con un cruzado?",
        it:"Posso cominciare con un incrociato?",
        de:"Kann ich mit einem Kreuz anfangen?",
        ja:"まず クロス から 始め て も いい です か ?" },

      { ref:"d-monter-la-barre", temps:3, dit:"joueuse", mots:["barre"],
        fr:"Tu peux me monter la barre, s'il te plaît ?",
        en:"Could you put the pole up for me, please?",
        es:"¿Me puedes subir la barra, por favor?",
        it:"Puoi alzarmi la barriera, per favore?",
        de:"Kannst du mir die Stange höher legen, bitte?",
        ja:"バー を 上げ て もらえ ます か ?" },

      { ref:"d-r-vertical-puis-oxer", temps:3, dit:"club", mots:["vertical","oxer"],
        fr:"Un vertical d'abord, l'oxer après.",
        en:"An upright first, the oxer after.",
        es:"Primero una vertical, después el óxer.",
        it:"Prima un verticale, poi l'oxer.",
        de:"Erst ein Steilsprung, dann der Oxer.",
        ja:"まず 垂直、 その あと オクサー です。" },

      /* ---- temps 4 · j'attends mon tour ---- */
      /* 🟥 Phrase de Blandine : la voix du speaker, et les centièmes. */
      { ref:"d-r-speaker-sans-faute", temps:4, dit:"club", mots:["sans-faute","chrono"],
        fr:"C'est un tour sans faute en vingt-neuf secondes et trente-quatre centièmes, qui prend donc la tête du classement provisoire.",
        en:"That's a clear round in twenty-nine point three four — and that puts her at the top of the leaderboard.",
        es:"Es un recorrido sin falta en veintinueve segundos treinta y cuatro, y pasa a encabezar la clasificación provisional.",
        it:"È un percorso netto in ventinove secondi e trentaquattro centesimi, e passa in testa alla classifica provvisoria.",
        de:"Das ist eine Nullrunde in neunundzwanzig Komma drei vier — damit setzt sie sich an die Spitze.",
        ja:"二十九 秒 三四 の クリア ラウンド。 暫定 首位 に 立ち まし た。" },

      /* 🟥 DEUX PHRASES RETIREES le 18/08/2026 sur decision de Blandine
         (marquees ❌ dans sa relecture) : « Je passe en quelle position ? »
         et « Vous etes la dix-septieme a partir. » — refs `d-quelle-position`
         et `d-r-dix-septieme`.
         ⚠️ LE MOT `numero` N'EST PAS PERDU : il reste employe par
         `d-oxer-ou-vertical` (temps 2) et `d-sest-arrete` (temps 5). Le
         concept lui-meme n'a pas bouge du lexique.
         ⚠️ NE PAS LES REMETTRE. Le dialogue passe de 24 a 22 phrases. */

      /* ---- temps 5 · ce qui s'est passé ---- */
      /* 🟥 Phrase de Blandine : « il s'est arrêté », pas « il a refusé ». */
      { ref:"d-sest-arrete", temps:5, dit:"joueuse", mots:["refus","numero"],
        fr:"Il s'est arrêté sur le 2.",
        en:"He stopped at number two.",
        es:"Se ha parado en el dos.",
        it:"Si è fermato sul due.",
        de:"Er ist an der Zwei stehengeblieben.",
        ja:"二番 で 止まっ て しまい まし た。" },

      { ref:"d-barre-tombee", temps:5, dit:"joueuse", mots:["barre-tombee","barre"],
        fr:"J'ai fait tomber une barre.",
        en:"I had a pole down.",
        es:"He tirado una barra.",
        it:"Ho fatto cadere una barriera.",
        de:"Ich hatte eine Stange.",
        ja:"バー を 一本 落とし まし た。" },

      /* 🟥 Correction de Blandine : ON ANNONCE DES POINTS, pas des
         secondes. Et en anglais ce sont des FAULTS, jamais des points. */
      { ref:"d-r-douze-points", temps:5, dit:"club", mots:["penalites","temps-depasse"],
        fr:"Quatre points de temps dépassé, plus huit points sur la piste : douze points au total.",
        en:"Four time faults plus eight jumping faults — twelve faults in total.",
        es:"Cuatro puntos de tiempo más ocho puntos en pista: doce puntos en total.",
        it:"Quattro penalità di tempo più otto penalità sul percorso: dodici in totale.",
        de:"Vier Zeitfehler plus acht Hindernisfehler — zwölf Fehlerpunkte insgesamt.",
        ja:"タイム 減点 四、 障害 減点 八、 合計 十二 減点 です。" },

      { ref:"d-derobade-ou-refus", temps:5, dit:"joueuse", mots:["derobade","refus","desobeissance"],
        fr:"Est-ce que c'était une dérobade ou un refus ?",
        en:"Was that a run-out or a refusal?",
        es:"¿Ha sido un escape o un rehúse?",
        it:"È stata una scappata o un rifiuto?",
        de:"War das ein Vorbeilaufen oder eine Verweigerung?",
        ja:"逃避 でし た か、 拒止 でし た か ?" },

      /* ---- temps 6 · le barrage ---- */
      { ref:"d-r-qualifiee-barrage", temps:6, dit:"club", mots:["sans-faute","barrage"],
        fr:"Sans-faute, vous êtes qualifiée pour le barrage.",
        en:"Clear round — you're through to the jump-off.",
        es:"Sin falta, está clasificada para el desempate.",
        it:"Percorso netto, è qualificata per il barrage.",
        de:"Nullrunde — Sie sind im Stechen.",
        ja:"クリア ラウンド です。 ジャンプオフ に 進み ます。" },

      /* Formulation de Blandine, telle quelle. */
      { ref:"d-on-coupe-ou", temps:6, dit:"joueuse", mots:["barrage","trace"],
        fr:"On coupe où pour le barrage ?",
        en:"Where do we cut for the jump-off?",
        es:"¿Por dónde recortamos en el desempate?",
        it:"Dove si taglia per il barrage?",
        de:"Wo kürzen wir im Stechen ab?",
        ja:"ジャンプオフ で は どこ で 短く 回り ます か ?" },

      /* 🟥 Phrase de Blandine : « À CHEVAL » est l'information utile —
         on ne desselle pas. Et HUIT premiers, pas trois. */
      { ref:"d-r-remise-a-cheval", temps:6, dit:"club", mots:["tour-honneur"],
        fr:"La remise des prix aura lieu à cheval, tour d'honneur pour les huit premiers.",
        en:"Prize-giving will be mounted — lap of honour for the first eight.",
        es:"La entrega de premios será a caballo, vuelta de honor para los ocho primeros.",
        it:"La premiazione sarà a cavallo, giro d'onore per i primi otto.",
        de:"Die Siegerehrung findet beritten statt — Ehrenrunde für die ersten acht.",
        ja:"表彰式 は 騎乗 の まま 行い ます。 上位 八 名 で ウィニング ラン です。" },

      /* ---- temps 7 · la semaine, et la plage ---- */
      /* 🟥 DEUX PHRASES DE BLANDINE, 16/08. Elles apportent ce qui
         manquait entièrement : un concours n'est pas UN TOUR, c'est UNE
         SEMAINE. À Wellington on reste douze semaines — la gestion du
         cheval sur plusieurs jours EST le sujet.
         ⚠️ « TOURNER » (= disputer une épreuve) n'est pas au lexique.
         Il s'apprend par la phrase, comme « resangler » à Aberystwyth.
         En anglais : « he's competing / he competed », il n'y a pas
         d'équivalent direct du « tourner » français. NE PAS forcer.
         ⚠️ LA PLAGE est vraie : Palm Beach est à vingt minutes, et on y
         marche les chevaux dans l'eau entre deux jours d'épreuve. C'est
         ce qui distingue Wellington de tous les autres concours. */
      { ref:"d-recupere-tourne", temps:7, dit:"joueuse", mots:[],
        fr:"Mon cheval récupère aujourd'hui : il tourne demain, et il a déjà tourné hier.",
        en:"My horse is having an easy day: he's competing tomorrow, and he competed yesterday.",
        es:"Mi caballo descansa hoy: compite mañana y ya compitió ayer.",
        it:"Il mio cavallo recupera oggi: gareggia domani e ha già gareggiato ieri.",
        de:"Mein Pferd hat heute Pause: morgen geht es wieder, und gestern ist es schon gegangen.",
        ja:"今日 は 休養 日 です。 明日 出 ます し、 昨日 も 出 まし た。" },

      { ref:"d-chemin-plage", temps:7, dit:"joueuse", mots:[],
        fr:"Tu sais par quel chemin on accède à la plage ?",
        en:"Do you know the way down to the beach?",
        es:"¿Sabes por dónde se baja a la playa?",
        it:"Sai da che parte si arriva alla spiaggia?",
        de:"Weißt du, wo es zum Strand runtergeht?",
        ja:"ビーチ に は どの 道 から 行け ます か ?" }
    ]
  }
};
