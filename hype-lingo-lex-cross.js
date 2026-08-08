/* hype-lingo-lex-cross.js — Hype Linguae · le cross
   ==================================================================
   Écrit le 8 août 2026 pour BURGHLEY (Angleterre), 30ᵉ étape du voyage,
   créée exprès pour lui (décision de Blandine : « fais Burghley »).

   POURQUOI UNE VILLE DE PLUS. Badminton porte le concours complet comme
   ÉVÉNEMENT (les trois tests, le trot de présentation, les formats) ;
   Burghley apprend le TERRAIN — les obstacles fixes et l'équipement du
   cross, listés par Blandine : « le piano, plein d'obstacles qui ne sont
   pas dans le cours », les crampons, la sangle bavette, la toque, le
   numéro du cheval, le chronomètre. Les deux monuments anglais du
   complet se répondent ; le vocabulaire du cross est massivement
   anglophone, sa maison naturelle est une ville anglaise.

   ⚠️ PAS DE RAPPEL ICI. Le talus, le contre-bas et le gué restent à
   BADMINTON ; le gilet et l'airbag à WALSALL ; le sans-faute et le
   chrono d'obstacle à HICKSTEAD. Burghley ne prend que le neuf.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif. Les plus à
   confirmer : `le piano` (le mot français est-il compris tel quel au
   bord d'un cross britannique ? le terme anglais courant est « the
   steps »), `la toque` (« the silk » est le mot des courses, « the hat
   cover » celui du complet — les deux s'entendent), et `le trakehner`,
   dont l'orthographe anglaise flotte (trakehner/trakena). À reporter
   dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.cross = {
  ref: "cross",
  chapitre: 30,
  titre: { fr:"Le cross", en:"Cross-country", es:"El cross", it:"Il cross",
           de:"Das Gelände", ja:"クロスカントリー" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE CROSS ============ */

  /* ---- les obstacles du terrain ---- */

  { ref:"piano", lecon:1, coll:"cross",
    mots:{ fr:{m:"le piano"}, en:{m:"the steps", p:"stèps", var:"the staircase"},
           es:{m:"el piano"}, it:{m:"il piano"},
           de:{m:"die Treppe", p:"trè-pe"}, ja:{m:"ステップ", p:"suteppu"} },
    def:{ fr:"Une suite de marches montantes ou descendantes, sautées d'un tempo. ⚠️ Le joli mot « piano » est surtout continental : au bord d'un cross britannique on entend « the steps ». En montée il demande du moteur, en descente de l'équilibre — jamais de vitesse.",
          en:"A run of steps ridden up or down in one rhythm. The pretty word « piano » is mostly continental: on a British course you hear « the steps ». Uphill it asks for engine, downhill for balance — never for speed.",
          es:"Una serie de escalones que se saltan subiendo o bajando, a un solo tempo. ⚠️ La bonita palabra « piano » es sobre todo continental: al borde de un cross británico se oye « the steps ». Subiendo pide motor, bajando equilibrio — nunca velocidad.",
          it:"Una serie di gradini saltati in salita o in discesa, su un solo tempo. ⚠️ La bella parola « piano » è soprattutto continentale: a bordo di un cross britannico si sente « the steps ». In salita chiede motore, in discesa equilibrio — mai velocità.",
          de:"Eine Folge von Stufen, bergauf oder bergab in einem Rhythmus gesprungen. ⚠️ Das hübsche Wort « piano » ist vor allem kontinental: An einer britischen Strecke hört man « the steps ». Bergauf verlangt es Motor, bergab Balance — nie Tempo.",
          ja:"ひとつのリズムで駆け上がり、駆け下りる階段状の障害。⚠️ 「ピアノ」という洒落た名は主に大陸のもの。イギリスのコース脇で聞こえるのは « the steps » です。上りはエンジンを、下りはバランスを求めます — 速さは決して。" } },

  { ref:"trakehner", lecon:1, coll:"cross",
    mots:{ fr:{m:"le trakehner"}, en:{m:"the trakehner", p:"tra-ké-neur"},
           es:{m:"el trakehner"}, it:{m:"il trakehner"},
           de:{m:"der Trakehner", p:"tra-ké-neur"}, ja:{m:"トラケナー", p:"torakenā"} },
    def:{ fr:"Un tronc posé au-dessus d'un fossé ouvert. Le nom vient des fossés de drainage de Trakehnen, en Prusse-Orientale, où l'on entraînait les chevaux — le même lieu qui a donné son nom à la race. Impressionnant pour l'œil du cavalier, ordinaire pour le cheval.",
          en:"A rail set over an open ditch. The name comes from the drainage ditches of Trakehnen in East Prussia, where horses were schooled — the same place that named the breed. Scary to the rider's eye, ordinary to the horse.",
          es:"Un tronco colocado sobre una zanja abierta. El nombre viene de las zanjas de drenaje de Trakehnen, en Prusia Oriental, donde se entrenaban los caballos — el mismo lugar que dio nombre a la raza. Impresiona al ojo del jinete, no al caballo.",
          it:"Un tronco posato sopra un fosso aperto. Il nome viene dai fossi di drenaggio di Trakehnen, in Prussia Orientale, dove si addestravano i cavalli — lo stesso luogo che ha dato il nome alla razza. Impressiona l'occhio del cavaliere, non il cavallo.",
          de:"Ein Baumstamm über einem offenen Graben. Der Name kommt von den Entwässerungsgräben von Trakehnen in Ostpreußen, wo Pferde geschult wurden — derselbe Ort, der der Rasse den Namen gab. Furchteinflößend fürs Reiterauge, gewöhnlich fürs Pferd.",
          ja:"開いた溝の上に丸太を渡した障害。名前は東プロイセンのトラケーネンの排水溝に由来します。馬を鍛えたその土地は、同名の馬種にも名を貸しました。騎手の目には恐ろしく、馬にはごく普通の障害です。" } },

  { ref:"table", lecon:1, coll:"cross",
    mots:{ fr:{m:"la table"}, en:{m:"the table", p:"té-beul"},
           es:{m:"la mesa"}, it:{m:"la tavola"},
           de:{m:"der Tisch", p:"tich"}, ja:{m:"テーブル", p:"tēburu"} },
    def:{ fr:"Un obstacle plein à plateau horizontal, large comme haut. Toutes les langues ont gardé l'image du meuble. Elle se saute dans le train du galop, sans rien changer : c'est l'obstacle qui punit l'hésitation, pas l'audace.",
          en:"A solid fence with a flat top, as wide as it is tall. Every language kept the furniture image. It is jumped out of the gallop rhythm, changing nothing: the fence that punishes hesitation, not boldness.",
          es:"Un obstáculo macizo de tablero horizontal, tan ancho como alto. Todas las lenguas guardaron la imagen del mueble. Se salta en el tren del galope, sin cambiar nada: castiga la duda, no la audacia.",
          it:"Un ostacolo pieno dal piano orizzontale, largo quanto alto. Tutte le lingue hanno tenuto l'immagine del mobile. Si salta nel treno del galoppo, senza cambiare nulla: punisce l'esitazione, non l'audacia.",
          de:"Ein massives Hindernis mit waagerechter Platte, so breit wie hoch. Alle Sprachen behielten das Möbelbild. Er wird aus dem Galopprhythmus gesprungen, ohne etwas zu ändern: das Hindernis, das Zögern bestraft — nicht Mut.",
          ja:"水平な天板を持つ、高さと同じだけ幅のある中身の詰まった障害。どの言語も家具のイメージを残しました。駈歩の勢いのまま、何も変えずに跳びます。罰せられるのはためらいであって、大胆さではありません。" } },

  { ref:"coin", lecon:1, coll:"cross",
    mots:{ fr:{m:"le coin"}, en:{m:"the corner", p:"kor-neur"},
           es:{m:"el ángulo"}, it:{m:"il corner"},
           de:{m:"die Ecke", p:"è-ke"}, ja:{m:"コーナー", p:"kōnā"} },
    def:{ fr:"Un obstacle en triangle, étroit d'un côté, large de l'autre. On le saute près de la pointe, sur une ligne tenue au centimètre : c'est l'obstacle de précision du cross, et le terrain préféré des dérobades quand la ligne flotte.",
          en:"A triangular fence, narrow at one end, wide at the other. You jump it near the point, on a line held to the centimetre: the precision fence of the course, and the favourite spot for run-outs when the line wavers.",
          es:"Un obstáculo en triángulo, estrecho por un lado, ancho por el otro. Se salta cerca de la punta, en una línea sostenida al centímetro: es el obstáculo de precisión del cross, y el terreno favorito de las escapadas cuando la línea flota.",
          it:"Un ostacolo a triangolo, stretto da un lato, largo dall'altro. Si salta vicino alla punta, su una linea tenuta al centimetro: è l'ostacolo di precisione del cross, e il terreno preferito degli scarti quando la linea ondeggia.",
          de:"Ein dreieckiges Hindernis, schmal an einem Ende, breit am anderen. Gesprungen wird nahe der Spitze, auf einer zentimetergenau gehaltenen Linie: das Präzisionshindernis der Strecke — und der Lieblingsort des Vorbeilaufens, wenn die Linie schwimmt.",
          ja:"片側が狭く、反対側が広い三角形の障害。跳ぶのは頂点の近く、センチ単位で保ったライン上です。コースでいちばん精密さを要する障害であり、ラインが揺らいだときに逃避がいちばん起こる場所でもあります。" } },

  { ref:"fosse", lecon:1, coll:"cross",
    mots:{ fr:{m:"le fossé"}, en:{m:"the ditch", p:"ditch"},
           es:{m:"la zanja"}, it:{m:"il fosso"},
           de:{m:"der Graben", p:"gra-beune"}, ja:{m:"ディッチ", p:"ditchi", var:"堀"} },
    def:{ fr:"Un creux ouvert, seul ou au pied d'un obstacle. La règle d'or, dans toutes les langues : ne jamais regarder dedans — le cheval va où vont tes yeux. On regarde l'horizon, il passe.",
          en:"An open hollow, on its own or at the foot of a fence. The golden rule in every language: never look into it — the horse goes where your eyes go. Look at the horizon, and he is over.",
          es:"Un hueco abierto, solo o al pie de un obstáculo. La regla de oro, en todas las lenguas: no mirar nunca dentro — el caballo va adonde van tus ojos. Mira al horizonte y pasa.",
          it:"Un vuoto aperto, da solo o ai piedi di un ostacolo. La regola d'oro, in tutte le lingue: mai guardarci dentro — il cavallo va dove vanno i tuoi occhi. Guarda l'orizzonte, e passa.",
          de:"Eine offene Mulde, allein oder am Fuß eines Hindernisses. Die goldene Regel in jeder Sprache: nie hineinschauen — das Pferd geht dorthin, wo deine Augen hingehen. Schau zum Horizont, und er ist drüben.",
          ja:"単独で、あるいは障害の足元に口を開けた掘り。黄金律はどの言語でも同じです — 中を覗かないこと。馬はきみの目が行くところへ行くのです。地平線を見ていれば、越えています。" } },

  { ref:"rondin", lecon:1, coll:"cross",
    mots:{ fr:{m:"le rondin"}, en:{m:"the log", p:"log"},
           es:{m:"el tronco"}, it:{m:"il tronco"},
           de:{m:"der Baumstamm", p:"baoum-chtamm"}, ja:{m:"丸太", p:"maruta"} },
    def:{ fr:"Le tronc d'arbre couché, l'obstacle premier du cross — celui par lequel tout cavalier commence. Son profil rond pardonne tout : on peut le toucher, rien ne tombe, rien ne coince. Le plus célèbre du monde reste le rondin d'entrée de Burghley.",
          en:"The felled tree trunk, the first fence of cross-country — the one every rider starts over. Its round profile forgives everything: you can touch it, nothing falls, nothing traps. The most famous in the world is still the log at Burghley.",
          es:"El tronco de árbol tumbado, el primer obstáculo del cross — aquel por el que todo jinete empieza. Su perfil redondo lo perdona todo: se puede tocar, nada cae, nada atrapa. El más célebre del mundo sigue siendo el tronco de Burghley.",
          it:"Il tronco d'albero sdraiato, il primo ostacolo del cross — quello da cui ogni cavaliere comincia. Il suo profilo rotondo perdona tutto: si può toccare, niente cade, niente incastra. Il più celebre al mondo resta il tronco di Burghley.",
          de:"Der liegende Baumstamm, das erste Hindernis des Geländes — das, über das jeder Reiter anfängt. Sein rundes Profil verzeiht alles: Man darf ihn berühren, nichts fällt, nichts klemmt. Der berühmteste der Welt bleibt der Stamm von Burghley.",
          ja:"横たえた木の幹。クロスの原点であり、誰もが最初に跳ぶ障害です。丸い輪郭がすべてを許してくれます。触れても、何も落ちず、何も挟まりません。世界一有名な丸太は、今もバーリーのものです。" } },

  { ref:"haie-cross", lecon:1, coll:"cross",
    mots:{ fr:{m:"la haie de cross"}, en:{m:"the brush fence", p:"breuch", var:"the bullfinch"},
           es:{m:"el seto"}, it:{m:"la siepe"},
           de:{m:"die Hecke", p:"hè-ke", var:"die Bürste"}, ja:{m:"ブラシ障害", p:"burashi shōgai"} },
    def:{ fr:"Un obstacle plein coiffé de brosse végétale, que le cheval peut effleurer en la traversant. ⚠️ Quand la brosse est si haute qu'on saute AU TRAVERS sans voir la réception, l'anglais a un mot magnifique : « the bullfinch » — le bouvreuil.",
          en:"A solid base topped with brush the horse may skim through. When the brush is so tall you jump THROUGH it without seeing the landing, English has a glorious word: the bullfinch.",
          es:"Un obstáculo macizo coronado de maleza que el caballo puede rozar al atravesarla. ⚠️ Cuando la maleza es tan alta que se salta A TRAVÉS sin ver la recepción, el inglés tiene una palabra magnífica: « the bullfinch » — el camachuelo.",
          it:"Un ostacolo pieno coronato di frasca che il cavallo può sfiorare attraversandola. ⚠️ Quando la frasca è così alta che si salta ATTRAVERSO senza vedere la ricezione, l'inglese ha una parola magnifica: « the bullfinch » — il ciuffolotto.",
          de:"Ein fester Sockel mit Buschaufsatz, den das Pferd im Sprung streifen darf. ⚠️ Ist der Busch so hoch, dass man HINDURCH springt, ohne die Landung zu sehen, hat das Englische ein herrliches Wort: « the bullfinch » — der Gimpel.",
          ja:"上に植え込みのブラシを載せた、土台の詰まった障害。馬はブラシをかすめて通り抜けてかまいません。⚠️ ブラシが高すぎて着地が見えないまま「突き抜けて」跳ぶとき、英語には見事な言葉があります — « the bullfinch »、ウソという小鳥の名です。" } },

  /* ---- l'équipement du cross ---- */

  { ref:"crampons", lecon:1, coll:"cross",
    mots:{ fr:{m:"les crampons"}, en:{m:"the studs", p:"steudz"},
           es:{m:"los tacos"}, it:{m:"i ramponi"},
           de:{m:"die Stollen", p:"chto-leune"}, ja:{m:"スタッド", p:"sutaddo"} },
    def:{ fr:"Les tétons vissés dans les fers pour mordre un terrain gras ou glissant. On les choisit selon le sol — pointus sur le dur, larges sur le gras — et on les dévisse sitôt la reprise finie : un cheval cramponné ne rentre pas au box avec.",
          en:"The metal points screwed into the shoes to bite wet or slippery going. Chosen for the ground — sharp on firm, broad on soft — and taken out the moment the round is done: a studded horse never goes back to the stable in them.",
          es:"Los tacos atornillados en las herraduras para morder un suelo pesado o resbaladizo. Se eligen según el terreno — puntiagudos en lo duro, anchos en lo blando — y se desenroscan en cuanto acaba la prueba: un caballo con tacos no vuelve al box con ellos.",
          it:"I ramponi avvitati nei ferri per mordere un terreno pesante o scivoloso. Si scelgono secondo il fondo — appuntiti sul duro, larghi sul molle — e si svitano appena finita la prova: un cavallo coi ramponi non torna in box con essi.",
          de:"Die in die Eisen geschraubten Stollen, die in tiefem oder rutschigem Boden greifen. Gewählt nach dem Geläuf — spitz auf hartem, breit auf weichem — und gleich nach der Runde herausgedreht: Mit Stollen geht kein Pferd zurück in die Box.",
          ja:"重い地面や滑る地面を掴むために、蹄鉄にねじ込む金具。硬い馬場には尖ったもの、柔らかい馬場には幅広のものを選び、走行が終わればすぐに外します。スタッドをつけたまま馬房へ戻る馬はいません。"} },

  { ref:"sangle-bavette", lecon:1, coll:"cross",
    mots:{ fr:{m:"la sangle bavette"}, en:{m:"the stud girth", p:"steud gueurth"},
           es:{m:"la cincha de protección"}, it:{m:"il sottopancia con paramento"},
           de:{m:"der Stollenschutzgurt", p:"chto-leune-choutss-gourt"},
           ja:{m:"スタッドガース", p:"sutaddo gāsu"} },
    def:{ fr:"La sangle élargie d'un plastron qui couvre le ventre. Son nom anglais dit exactement pourquoi elle existe : « the stud girth », la sangle des crampons — sur les obstacles fixes, les antérieurs se replient si près du corps que les crampons toucheraient la peau.",
          en:"The girth widened into a belly plate. Its English name says exactly why it exists: the stud girth — over fixed fences the forelegs fold so tight that the studs would strike the skin.",
          es:"La cincha ensanchada en un peto que cubre el vientre. Su nombre inglés dice exactamente por qué existe: « the stud girth », la cincha de los tacos — en los obstáculos fijos los anteriores se pliegan tan cerca del cuerpo que los tacos tocarían la piel.",
          it:"Il sottopancia allargato in un paramento che copre il ventre. Il suo nome inglese dice esattamente perché esiste: « the stud girth », il sottopancia dei ramponi — sugli ostacoli fissi gli anteriori si piegano così vicino al corpo che i ramponi toccherebbero la pelle.",
          de:"Der zu einer Bauchplatte verbreiterte Gurt. Sein englischer Name sagt genau, wozu es ihn gibt: der Stollenschutzgurt — über festen Hindernissen falten sich die Vorderbeine so eng, dass die Stollen die Haut träfen.",
          ja:"腹を覆う板状に広がった腹帯。英語名が存在理由をそのまま語っています — « the stud girth »、スタッドのための腹帯。固定障害の上では前肢が体すれすれまで畳まれ、スタッドが皮膚に当たってしまうからです。" } },

  { ref:"toque", lecon:1, coll:"cross",
    mots:{ fr:{m:"la toque"}, en:{m:"the hat cover", p:"hatt ka-veur", var:"the silk"},
           es:{m:"la funda del casco"}, it:{m:"la copertura del casco"},
           de:{m:"der Helmbezug", p:"hèlm-be-tsouk"}, ja:{m:"ヘルメットカバー", p:"herumetto kabā"} },
    def:{ fr:"Le couvre-casque en tissu aux couleurs du cavalier. ⚠️ « The silk » est le mot hérité des courses, où la soie porte les couleurs de l'écurie ; en complet on entend plutôt « the hat cover ». C'est elle qui permet de reconnaître un cavalier de loin sur dix minutes de cross.",
          en:"The fabric cover in the rider's colours. « The silk » is the word inherited from racing, where silk carries the stable's colours; in eventing you hear « the hat cover ». It is what lets you know a rider from afar across ten minutes of country.",
          es:"La funda de tela con los colores del jinete. ⚠️ « The silk » es la palabra heredada de las carreras, donde la seda lleva los colores de la cuadra; en completo se oye más « the hat cover ». Es lo que permite reconocer a un jinete de lejos durante diez minutos de cross.",
          it:"La copertura di tessuto ai colori del cavaliere. ⚠️ « The silk » è la parola ereditata dalle corse, dove la seta porta i colori della scuderia; nel completo si sente più « the hat cover ». È ciò che permette di riconoscere un cavaliere da lontano su dieci minuti di cross.",
          de:"Der Stoffbezug in den Farben des Reiters. ⚠️ « The silk » ist das Wort aus dem Rennsport, wo die Seide die Stallfarben trägt; in der Vielseitigkeit hört man eher « the hat cover ». An ihm erkennt man einen Reiter über zehn Geländeminuten hinweg von weitem.",
          ja:"騎手のカラーをまとった布のヘルメットカバー。⚠️ « the silk » は競馬から受け継いだ言葉 — 絹が厩舎の色を運ぶ世界の言葉です。総合馬術では « the hat cover » のほうをよく聞きます。十分間のクロスで遠くから騎手を見分けられるのは、これのおかげです。" } },

  { ref:"numero-cheval", lecon:1, coll:"cross",
    mots:{ fr:{m:"le numéro du cheval"}, en:{m:"the bridle number", p:"braï-deul neum-beur"},
           es:{m:"el número del caballo"}, it:{m:"il numero del cavallo"},
           de:{m:"die Kopfnummer", p:"kopf-nou-meur"}, ja:{m:"馬番", p:"umaban"} },
    def:{ fr:"Le petit numéro fixé sur la têtière ou la muserolle, distinct du dossard du cavalier. ⚠️ L'anglais le nomme par son emplacement : « the bridle number ». En complet le cheval le porte les trois jours, du trot de présentation au saut final.",
          en:"The small number fixed to the headpiece or noseband, distinct from the rider's bib. English names it by where it sits: the bridle number. In eventing the horse wears it all three days, from the trot-up to the final showjumping.",
          es:"El pequeño número fijado en la testera o la muserola, distinto del dorsal del jinete. ⚠️ El inglés lo nombra por su sitio: « the bridle number ». En completo el caballo lo lleva los tres días, del trote de presentación al salto final.",
          it:"Il piccolo numero fissato sulla testiera o sulla capezzina, distinto dal pettorale del cavaliere. ⚠️ L'inglese lo chiama dal suo posto: « the bridle number ». Nel completo il cavallo lo porta i tre giorni, dal trotto di presentazione al salto finale.",
          de:"Die kleine Nummer am Genickstück oder Nasenriemen, verschieden von der Startnummer des Reiters. ⚠️ Das Englische benennt sie nach ihrem Platz: « the bridle number ». In der Vielseitigkeit trägt das Pferd sie alle drei Tage, von der Verfassungsprüfung bis zum Schlussspringen.",
          ja:"頭絡や鼻革に留める小さな番号。騎手のゼッケンとは別物です。⚠️ 英語はその位置で呼びます — « the bridle number »。総合馬術では、初日の歩様検査から最終日の障害まで、三日間ずっと馬が身につけます。" } },

  { ref:"chronometre", lecon:1, coll:"cross",
    mots:{ fr:{m:"le chronomètre"}, en:{m:"the stopwatch", p:"stop-ouotch"},
           es:{m:"el cronómetro"}, it:{m:"il cronometro"},
           de:{m:"die Stoppuhr", p:"chtop-our"}, ja:{m:"ストップウォッチ", p:"sutoppu wotchi"} },
    def:{ fr:"La montre du poignet du cavalier de cross, lancée au signal du départ. On y lit ses temps de passage aux repères minutés du parcours : c'est elle qui dit s'il faut laisser galoper ou reprendre. En cross, on court contre l'optimum, pas contre les autres.",
          en:"The watch on the cross-country rider's wrist, started on the starter's signal. It gives your split times at the minute markers round the course: it is what says whether to let him gallop or take a pull. Across country you ride against the optimum, not against the others.",
          es:"El reloj de muñeca del jinete de cross, lanzado a la señal de salida. En él se leen los tiempos de paso en las marcas minutadas del recorrido: es él quien dice si dejar galopar o retener. En cross se corre contra el óptimo, no contra los demás.",
          it:"L'orologio al polso del cavaliere di cross, avviato al segnale di partenza. Vi si leggono i tempi di passaggio ai riferimenti minutati del percorso: è lui a dire se lasciar galoppare o riprendere. In cross si corre contro l'optimum, non contro gli altri.",
          de:"Die Uhr am Handgelenk des Geländereiters, gestartet auf das Signal. Sie zeigt die Zwischenzeiten an den Minutenmarken der Strecke: Sie sagt, ob man galoppieren lassen oder aufnehmen muss. Im Gelände reitet man gegen die Optimalzeit — nicht gegen die anderen.",
          ja:"スタートの合図で押す、クロスの騎手の腕時計。コースに立つ分刻みの標識で通過タイムを読み、走らせるか抑えるかを教えてくれるのはこれです。クロスで競う相手は他の騎手ではなく、規定タイムなのです。" } }

  ],

  phrases: [

  { ref:"ph-cross-marcher", lecon:1,
      fr:"Tu as marché le cross ?",
      en:"Have you walked the course ?",
      es:"¿ Has caminado el cross ?",
      it:"Hai camminato il cross ?",
      de:"Bist du die Strecke abgegangen ?",
      ja:"コース は 下見 し まし た か ?" },

  { ref:"ph-cross-crampons", lecon:1,
      fr:"Quels crampons pour ce terrain ?",
      en:"Which studs for this going ?",
      es:"¿ Qué tacos para este terreno ?",
      it:"Quali ramponi per questo terreno ?",
      de:"Welche Stollen für diesen Boden ?",
      ja:"この 馬場 に は どの スタッド です か ?" },

  { ref:"ph-cross-option", lecon:1,
      fr:"Au coin, je prends l'option.",
      en:"At the corner, I take the option.",
      es:"En el ángulo, tomo la opción.",
      it:"Al corner, prendo l'opzione.",
      de:"An der Ecke nehme ich die Option.",
      ja:"コーナー で は 迂回路 を 選び ます。" },

  { ref:"ph-cross-regarder", lecon:1,
      fr:"Ne regarde pas dans le fossé.",
      en:"Do not look into the ditch.",
      es:"No mires dentro de la zanja.",
      it:"Non guardare dentro il fosso.",
      de:"Schau nicht in den Graben.",
      ja:"ディッチ の 中 を 見 ない で。" }

  ]
};
