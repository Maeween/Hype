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
    /* 🟥 CORRIGÉ le 17/08 par Blandine : « LE PIANO SE DESCEND TOUJOURS ».
       L'ancienne définition disait « montantes ou descendantes » — faux.
       Et sa phrase, gardée dans le dialogue : « quand tu arrives sur la
       première marche, tu as l'impression que tu vas sauter dans le
       vide ». C'est la sensation que personne ne dit avant, et c'est ce
       qui prépare vraiment. ⚠️ NE PAS réintroduire l'idée d'un piano
       montant. */
    def:{ fr:"🟥 UNE SUITE DE MARCHES QUI SE DESCEND — toujours, jamais en montée. On les enchaîne d'un seul tempo, en équilibre, sans vitesse. ⚠️ Ce qu'il faut savoir avant d'y arriver : au bord de la première marche, on ne voit pas la suivante, et on a l'impression de sauter dans le vide. Le cheval, lui, voit très bien. ⚠️ Le joli mot « piano » est surtout continental : sur un cross britannique on entend « the steps ».",
          en:"A run of steps ridden DOWNWARDS, always down and never up. You take them in one rhythm, in balance, without speed. At the edge of the first one you cannot see the next, and it feels like jumping into thin air. The horse can see perfectly well. The pretty word « piano » is mostly continental: on a British course you hear « the steps ». Uphill it asks for engine, downhill for balance — never for speed.",
          es:"Una serie de escalones que SE BAJA, siempre bajando y nunca subiendo. Se enlazan a un solo tempo, en equilibrio, sin velocidad. Al borde del primero no se ve el siguiente y parece que se salta al vacío. ⚠️ La bonita palabra « piano » es sobre todo continental: al borde de un cross británico se oye « the steps ». Subiendo pide motor, bajando equilibrio — nunca velocidad.",
          it:"Una serie di gradini che SI SCENDE, sempre in discesa e mai in salita. Si concatenano su un solo tempo, in equilibrio, senza velocità. Sul bordo del primo non si vede il successivo e sembra di saltare nel vuoto. ⚠️ La bella parola « piano » è soprattutto continentale: a bordo di un cross britannico si sente « the steps ». In salita chiede motore, in discesa equilibrio — mai velocità.",
          de:"Eine Folge von Stufen, die man HINUNTERREITET, immer abwärts und nie aufwärts. In einem Rhythmus, im Gleichgewicht, ohne Tempo. An der Kante der ersten sieht man die nächste nicht, und es fühlt sich an, als spränge man ins Leere. ⚠️ Das hübsche Wort « piano » ist vor allem kontinental: An einer britischen Strecke hört man « the steps ». Bergauf verlangt es Motor, bergab Balance — nie Tempo.",
          ja:"🟥 下るための階段状の障害です。常に下りで、上ることはありません。ひとつのリズムで、バランスを保ち、速さを出さずに降ります。⚠️ 一段目の縁に立つと次の段が見えず、宙に飛び込むように感じます。馬にはちゃんと見えています。⚠️ 「ピアノ」という洒落た名は主に大陸のもの。イギリスのコース脇で聞こえるのは « the steps » です。上りはエンジンを、下りはバランスを求めます — 速さは決して。" } },

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

  /* ================================================================
     TROIS OBSTACLES VENUS DU CHAPITRE « LE CONCOURS » — 17/08/2026.
     Le talus, le contre-bas et le gué étaient en leçon 2 de
     `hype-lingo-lex-concours.js`, donc chez BADMINTON. Or ce sont des
     obstacles de CROSS : ils appartiennent à Burghley.
     Décision de Blandine : « déplace-les et on va en rajouter à
     Badminton alors ». Badminton garde ce qui lui est propre — le
     format, le barème, le classement provisoire.
     ⚠️ Le voyage passe par BURGHLEY AVANT BADMINTON depuis le 17/08
     (interversion faite le même jour, voir ETAPES) : les obstacles
     s'apprennent donc bien avant le complet qui les cumule.
     ⚠️ NE PAS les rendre au chapitre du concours.
     ================================================================ */

  { ref:"talus", lecon:2, coll:"complet",
    mots:{ fr:{m:"le talus"}, en:{m:"the bank", p:"bannk"},
           es:{m:"el talud"}, it:{m:"la banchina", var:"il gradino"}, /* it precise (rapport 07/08) */
           de:{m:"der Wall", p:"val"}, ja:{m:"バンク", p:"banku"} },
    def:{ fr:"Une butte à monter ou à descendre, parfois avec une barre au sommet. Le plus célèbre du monde est le Derby Bank de Hickstead — la ville de l'étape précédente.",
          en:"A mound to climb or drop off, sometimes with a rail on top. The most famous is Hickstead's Derby Bank.",
          es:"Una loma que subir o bajar, a veces con una barra en la cima. El más célebre del mundo es el Derby Bank de Hickstead — la ciudad de la etapa anterior.",
          it:"Una collinetta da salire o scendere, a volte con una barriera in cima. Il più celebre al mondo è il Derby Bank di Hickstead — la città della tappa precedente.",
          de:"Ein Wall zum Hinauf- oder Hinabreiten, manchmal mit Stange auf der Kuppe. Der berühmteste der Welt ist die Derby Bank von Hickstead — der Stadt der vorigen Etappe.",
          ja:"登り、あるいは下る土手。頂上にバーが載ることもあります。世界一有名なのはヒックステッドのダービー・バンク — ひとつ前の街のあれです。" } },

  { ref:"contre-bas", lecon:2, coll:"complet",
    mots:{ fr:{m:"le contre-bas"}, en:{m:"the drop", p:"drop", var:"a drop fence"},
           es:{m:"el salto en bajada", var:"el escalón de bajada"}, it:{m:"il salto in discesa"}, /* es precise (rapport 07/08) */
           de:{m:"der Tiefsprung", p:"tif-chproung"}, ja:{m:"ドロップ", p:"doroppu"} },
    def:{ fr:"La réception est plus basse que la battue. Le cavalier laisse filer les rênes et reste en arrière : c'est le seul obstacle où l'on s'interdit d'anticiper.",
          en:"The landing is lower than the take-off. Let the reins slip and stay behind the movement.",
          es:"La recepción es más baja que la batida. El jinete deja correr las riendas y se queda atrás: es el único obstáculo donde uno se prohíbe anticipar.",
          it:"La ricezione è più bassa dello stacco. Il cavaliere lascia scorrere le redini e resta indietro: è l'unico ostacolo dove ci si vieta di anticipare.",
          de:"Die Landung liegt tiefer als der Absprung. Der Reiter lässt die Zügel gleiten und bleibt zurück: das einzige Hindernis, an dem man sich das Vorgreifen verbietet.",
          ja:"着地が踏切より低い障害。騎手は手綱を滑らせ、上体を後ろに残します。先回りを自分に禁じる、唯一の障害です。" } },

  { ref:"gue", lecon:2, coll:"complet",
    mots:{ fr:{m:"le gué"}, en:{m:"the water", p:"ouo-teur", var:"the water complex"},
           es:{m:"el paso de agua"}, it:{m:"il passaggio d'acqua"},
           de:{m:"die Wasserdurchfahrt", p:"va-seur-dourh-fart"}, ja:{m:"水中障害", p:"suichū shōgai"} }, // ??
    def:{ fr:"On y entre dans l'eau, on n'y saute pas au-dessus : c'est ce qui le distingue de la rivière du concours hippique. Toujours au pas ou au petit galop, et c'est le point du parcours où le public se masse.",
          en:"You ride into it rather than over it, unlike the show-jumping water. Always the spot where the crowd gathers.",
          es:"Se entra en el agua, no se salta por encima: eso lo distingue de la ría del salto. Siempre al paso o al galope corto, y es el punto del recorrido donde se agolpa el público.",
          it:"Ci si entra nell'acqua, non ci si salta sopra: è ciò che lo distingue dalla riviera del salto ostacoli. Sempre al passo o al piccolo galoppo, ed è il punto del percorso dove si ammassa il pubblico.",
          de:"Man reitet ins Wasser hinein, nicht darüber: Das unterscheidet ihn vom Wassergraben des Springens. Immer im Schritt oder ruhigen Galopp — und der Punkt, an dem sich das Publikum drängt.",
          ja:"水の中へ入っていく障害。上を跳び越すのではありません — 障害馬術の水濠との違いはそこです。常歩か抑えた駈歩で。そして観客がいちばん集まるのも、この地点です。" } },


  /* ================================================================
     SIX ENTRÉES DE PLUS — 17/08/2026, tirées de la liste de
     vocabulaire-clé de Blandine pour Burghley : « drop / ditch / brush /
     corner / narrow fence / water complex / direct route / long route /
     stride / landing / optimum time / course walk », et de sa remarque :
     « ça sonne très Burghley : drop, long route, direct route, keep your
     line, stay straight, three strides, water, make up time ».
     Le chapitre n'avait que 12 mots — le plus maigre du voyage.
     ⚠️ `drop`, `ditch`, `brush` et `corner` existaient déjà, ainsi que
     `talus` et `gué` arrivés du chapitre du concours le même jour.
     ================================================================ */

  { ref:"voie-directe", lecon:1, coll:"cross",
    mots:{ fr:{m:"la voie directe"}, en:{m:"the direct route", p:"daï-rekte route"},
           es:{m:"la vía directa"}, it:{m:"la via diretta"},
           de:{m:"der direkte Weg", p:"di-rek-te vék"}, ja:{m:"直線ルート", p:"chokusen rūto"} },
    def:{ fr:"🟥 LE CHOIX QUI DÉCIDE D'UN CROSS. La voie directe est plus courte et plus difficile : elle demande de la précision, souvent un obstacle étroit ou un angle. On la prend pour rester dans le temps. ⚠️ Son contraire n'est pas « la voie facile » mais **l'option longue** — plus sûre, mais elle coûte des secondes qu'on ne rattrape pas toujours.",
          en:"The choice that decides a cross-country round. The direct route is shorter and harder: it asks for accuracy, often a narrow fence or an angle. You take it to stay inside the time. Its opposite is the long route — safer, but it costs seconds you can't always make back.",
          es:"La elección que decide un cross. La vía directa es más corta y más difícil: exige precisión. Se toma para quedarse dentro del tiempo.",
          it:"La scelta che decide un cross. La via diretta è più corta e più difficile: chiede precisione. Si prende per restare nel tempo.",
          de:"Die Entscheidung, die einen Geländeritt bestimmt. Der direkte Weg ist kürzer und schwerer: er verlangt Präzision. Man nimmt ihn, um in der Zeit zu bleiben.",
          ja:"クロスカントリーの勝敗を決める選択。直線ルートは短く難しく、正確さを要求します。規定時間内に収めるために選びます。" } },

  { ref:"option-longue", lecon:1, coll:"cross",
    mots:{ fr:{m:"l'option longue"}, en:{m:"the long route", p:"lonng route", var:"the alternative"},
           es:{m:"la opción larga"}, it:{m:"l'opzione lunga"},
           de:{m:"der Umweg", p:"oum-vék"}, ja:{m:"迂回ルート", p:"ukai rūto"} },
    def:{ fr:"Le chemin plus long autorisé par le chef de piste sur les obstacles difficiles. ⚠️ IL N'EST PAS PÉNALISÉ EN LUI-MÊME — il coûte seulement du temps. C'est un vrai choix tactique, pas un aveu : beaucoup de grands cavaliers prennent l'option sur un jeune cheval, ou quand le classement ne l'exige pas. ⚠️ L'allemand dit *Umweg*, « le détour ».",
          en:"The longer way allowed by the course designer at difficult fences. It isn't penalised in itself — it only costs time. It's a tactical choice, not an admission: plenty of top riders take the long route on a young horse.",
          es:"El camino más largo autorizado por el jefe de pista en los obstáculos difíciles. No está penalizado en sí: solo cuesta tiempo.",
          it:"Il percorso più lungo autorizzato dal direttore di percorso sugli ostacoli difficili. Non è penalizzato in sé: costa solo tempo.",
          de:"Der längere Weg, den der Parcourschef an schweren Sprüngen erlaubt. Er wird nicht selbst bestraft — er kostet nur Zeit.",
          ja:"難しい障害でコースデザイナーが用意した遠回りの経路。それ自体は減点になりません。時間がかかるだけです。若い馬では一流選手も選びます。" } },

  { ref:"complexe-eau", lecon:1, coll:"cross",
    mots:{ fr:{m:"le complexe d'eau"}, en:{m:"the water complex", p:"oua-teur kom-plexe"},
           es:{m:"el complejo de agua"}, it:{m:"il complesso d'acqua"},
           de:{m:"die Wasserkombination", p:"va-sseur-kom-bi-na-tsione"}, ja:{m:"水濠コンビネーション", p:"suigō konbinēshon"} },
    def:{ fr:"⚠️ PAS UN OBSTACLE MAIS UN ENSEMBLE : on entre dans l'eau, on saute dedans, on en ressort — souvent trois ou quatre efforts enchaînés. C'est le point du parcours où le public s'installe, et celui où l'on perd le plus de temps. Le plus célèbre du monde est le **Trout Hatchery** de Burghley. ⚠️ L'eau freine beaucoup plus qu'on ne l'imagine : elle mange la foulée.",
          en:"Not one fence but a set: you go in, you jump in the water, you come out — often three or four efforts linked. It's where the crowd gathers and where most time is lost. The most famous in the world is Burghley's Trout Hatchery. Water slows a horse far more than you'd think.",
          es:"No es un obstáculo sino un conjunto: se entra, se salta dentro, se sale. Es donde se pierde más tiempo. El más famoso del mundo es el Trout Hatchery de Burghley.",
          it:"Non un ostacolo ma un insieme: si entra, si salta nell'acqua, si esce. È dove si perde più tempo. Il più famoso al mondo è il Trout Hatchery di Burghley.",
          de:"Kein Sprung, sondern eine Folge: man reitet hinein, springt im Wasser, kommt heraus. Dort verliert man am meisten Zeit. Der berühmteste der Welt ist Burghleys Trout Hatchery.",
          ja:"単一の障害ではなく一連の組み合わせです。水に入り、水中で飛び、出る。三つ四つの動作が続きます。最も時間を失う場所で、世界一有名なのはバーリーの Trout Hatchery です。水は想像よりずっと脚を止めます。" } },

  { ref:"obstacle-etroit", lecon:1, coll:"cross",
    mots:{ fr:{m:"l'obstacle étroit"}, en:{m:"a narrow fence", p:"na-rô fènss", var:"a skinny"},
           es:{m:"el obstáculo estrecho"}, it:{m:"l'ostacolo stretto"},
           de:{m:"der schmale Sprung", p:"chma-le chproung"}, ja:{m:"細い障害", p:"hosoi shōgai"} },
    def:{ fr:"⚠️ CE N'EST PAS LA HAUTEUR QUI COMPTE, C'EST LA LIGNE. Un obstacle étroit peut faire un mètre de large : le cheval peut passer à côté sans le vouloir, et c'est une dérobade. Il demande un galop droit et un œil fixé loin devant. ⚠️ Les Britanniques l'appellent familièrement **a skinny** — un mot qu'on entend beaucoup plus que « narrow fence » sur un cross.",
          en:"It isn't the height that matters, it's the line. A narrow fence can be a metre wide: the horse can slip past without meaning to, and that's a run-out. British riders call it « a skinny », which you hear far more than « narrow fence ».",
          es:"No importa la altura sino la línea. Un obstáculo estrecho puede medir un metro: el caballo puede pasar al lado sin querer, y es un escape.",
          it:"Non conta l'altezza ma la linea. Un ostacolo stretto può essere larga un metro: il cavallo può passare accanto senza volerlo, ed è una scappata.",
          de:"Nicht die Höhe zählt, sondern die Linie. Ein schmaler Sprung kann einen Meter breit sein: das Pferd kann daneben vorbeilaufen, ohne es zu wollen.",
          ja:"高さではなく「ライン」が問題になる障害。幅が一メートルしかないこともあり、馬は意図せず横をすり抜けてしまいます。それは逃避です。" } },

  { ref:"reception", lecon:1, coll:"cross",
    mots:{ fr:{m:"la réception"}, en:{m:"the landing", p:"lann-dinng"},
           es:{m:"la recepción"}, it:{m:"l'atterraggio"},
           de:{m:"die Landung", p:"lann-doung"}, ja:{m:"着地", p:"chakuchi"} },
    def:{ fr:"🟥 EN CROSS, LA RÉCEPTION EST LE DÉBUT DU SAUT SUIVANT. On raccourcit ses rênes dès qu'on touche le sol, on regarde déjà l'obstacle d'après, on prépare son virage. Un cavalier qui admire son saut a perdu deux foulées. ⚠️ En anglais **the landing** s'oppose à *the take-off*, l'appel.",
          en:"In cross-country the landing is the start of the next fence. You shorten your reins as soon as you touch down, you're already looking at the next one, you set up your turn. A rider who admires the jump has lost two strides.",
          es:"En cross la recepción es el comienzo del salto siguiente. Se acortan las riendas al tocar el suelo y ya se mira el próximo obstáculo.",
          it:"Nel cross l'atterraggio è l'inizio del salto successivo. Si accorciano le redini appena si tocca terra e si guarda già l'ostacolo dopo.",
          de:"Im Gelände ist die Landung der Beginn des nächsten Sprungs. Man verkürzt die Zügel, sobald man aufsetzt, und schaut schon zum nächsten Hindernis.",
          ja:"クロスカントリーでは、着地が次の障害の始まりです。地面に触れた瞬間に手綱を詰め、すでに次の障害を見て、回転の準備をします。自分の飛越に見入る騎手は二歩分を失います。" } },

  { ref:"ligne", lecon:1, coll:"cross",
    mots:{ fr:{m:"garder sa ligne"}, en:{m:"to keep your line", p:"kiipe your laïne"},
           es:{m:"mantener la línea"}, it:{m:"mantenere la linea"},
           de:{m:"die Linie halten", p:"li-ni-e hal-teune"}, ja:{m:"ラインを保つ", p:"rain o tamotsu"} },
    def:{ fr:"🟥 LA PHRASE LA PLUS RÉPÉTÉE D'UN CROSS, et l'une des plus utiles à comprendre : **keep your line**. La ligne est le chemin qu'on a décidé à pied, et la tenir compte plus que le saut lui-même — sur un obstacle étroit ou un coin, c'est elle qui fait passer ou dérober. ⚠️ On l'entend avec **stay straight** : ne pas tourner trop tôt, garder le cheval droit entre les deux rênes.",
          en:"The most repeated phrase on a cross-country course, and one of the most useful to understand. The line is the path you decided on foot, and holding it matters more than the jump itself. You'll hear it with « stay straight »: don't turn early, keep him straight between both reins.",
          es:"La frase más repetida en un cross. La línea es el camino que se decidió a pie, y mantenerla importa más que el salto en sí.",
          it:"La frase più ripetuta in un cross. La linea è il percorso deciso a piedi, e mantenerla conta più del salto stesso.",
          de:"Der häufigste Satz auf einer Geländestrecke. Die Linie ist der Weg, den man zu Fuß festgelegt hat, und sie zu halten zählt mehr als der Sprung selbst.",
          ja:"クロスカントリーで最も繰り返される言葉。ラインとは下見で決めた進路のことで、それを守ることは飛越そのものより重要です。細い障害やコーナーでは、ラインが通過と逃避を分けます。" } },

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

  ],

  /* ==================================================================
     LE DIALOGUE DE BURGHLEY — 17 août 2026, session 214.

     LA SCÈNE : la reconnaissance du cross à pied, puis le parcours.
     21 phrases, 6 temps. 🎧 = un autre cavalier, un coach, le chef de
     piste.

     🟥 ONZE PHRASES SUR VINGT-ET-UNE SONT DE BLANDINE, écrites avec
     leur traduction anglaise. Elles apportent ce que Claude ne pouvait
     pas inventer — les CONSIGNES RÉELLES d'une reconnaissance :
     · « ne va pas trop vite dans la descente, tu dois pouvoir
       rééquilibrer avant le contre-bas » ;
     · « il y a une option longue, mais elle va nous faire perdre
       beaucoup de temps » ;
     · « après le saut dans l'eau, tu n'as que trois foulées avant le
       prochain obstacle » ;
     · « raccourcis tes rênes dès la réception et prépare ton virage » ;
     · « il faut arriver avec un galop puissant, mais rester en
       contrôle » ;
     · 🟥 « NE TOURNE PAS TROP TÔT : VISE LE MILIEU DU CORNER ET RESTE
       DROIT » — Claude avait écrit l'inverse (viser le piquet, aborder
       de biais) et l'avait signalé comme incertain. C'était FAUX.
       NE JAMAIS réintroduire l'idée d'aborder un coin de biais.
     · « laisse-le avancer entre les obstacles, on doit rattraper
       quelques secondes » ;
     · « s'il hésite devant l'eau, garde tes jambes et monte franchement
       vers l'avant » ;
     · « on prend la voie directe : elle est plus difficile, mais elle
       nous permet de rester dans le temps » ;
     · 🟥 LE PIANO : « le piano est impressionnant, quand tu arrives sur
       la première marche tu as l'impression que tu vas sauter dans le
       vide ». Et sa correction du lexique : LE PIANO SE DESCEND
       TOUJOURS — l'ancienne définition disait « montantes ou
       descendantes », c'était faux.

     🟥 CE QUE CLAUDE A RETIRÉ DE LUI-MÊME, faute de certitude, sur
     consigne de Blandine (« invente surtout pas des trucs ») : une
     phrase sur la haie de cross qu'on traverserait, une sur la
     profondeur du fossé, une sur l'entrée dans le gué. Elles étaient
     plausibles mais non vérifiées. ⚠️ NE PAS les réinventer : demander.

     ⚠️ LES BARÈMES CHIFFRÉS SONT ABSENTS À DESSEIN. « Combien de refus
     avant l'élimination ? » est une question qu'on POSE ; la réponse
     dépend du niveau, du pays et de l'année, et Claude ne la connaît
     pas avec certitude.

     ⚠️ Le vocabulaire anglais vient d'elle et sonne juste : *stay
     inside the time*, *ride positively forward*, *keep your leg on*,
     *let him travel*, *make up time*, *keep your line*, *stay
     straight*. NE PAS « corriger » vers un anglais plus scolaire.

     `dit` : "joueuse" = elle produit · "club" = un autre cavalier, un
     coach ou le chef de piste.
  ================================================================== */
  dialogue: {
    ville: "burghley", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · la reconnaissance à pied ---- */
      { ref:"db-reconnaitre-combien", temps:1, dit:"joueuse", mots:[],
        fr:"On peut reconnaître le parcours combien de fois ?",
        en:"How many times can we walk the course?",
        es:"¿Cuántas veces se puede reconocer el recorrido?",
        it:"Quante volte si può fare la ricognizione del percorso?",
        de:"Wie oft darf man die Strecke abgehen?",
        ja:"コース の 下見 は 何 回 でき ます か ?" },

      { ref:"db-gue-ou-contre-bas", temps:1, dit:"joueuse", mots:["gue","contre-bas"],
        fr:"Le 14, c'est le gué ou le contre-bas ?",
        en:"Is fourteen the water or the drop?",
        es:"¿El catorce es el agua o el contrabajo?",
        it:"Il quattordici è l'acqua o il salto in discesa?",
        de:"Ist die Vierzehn das Wasser oder der Absprung?",
        ja:"十四番 は 水濠 です か、 ドロップ です か ?" },

      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-pas-vite-descente", temps:1, dit:"club", mots:["contre-bas"],
        fr:"Ne va pas trop vite dans la descente, tu dois pouvoir rééquilibrer avant le contre-bas.",
        en:"Don't go too fast downhill; you need to be able to rebalance before the drop.",
        es:"No vayas demasiado rápido en la bajada: tienes que poder reequilibrar antes del contrabajo.",
        it:"Non andare troppo veloce in discesa: devi poter riequilibrare prima del salto in discesa.",
        de:"Reite bergab nicht zu schnell — du musst vor dem Absprung neu ausbalancieren können.",
        ja:"下り で 速く 行き すぎ ない で。 ドロップ の 前 に 立て直せる 速さ で。" },

      { ref:"db-combien-refus", temps:1, dit:"joueuse", mots:[],
        fr:"Combien de refus avant l'élimination ?",
        en:"How many refusals before elimination?",
        es:"¿Cuántos rehúses antes de la eliminación?",
        it:"Quanti rifiuti prima dell'eliminazione?",
        de:"Wie viele Verweigerungen bis zum Ausschluss?",
        ja:"何 回 拒止 する と 失格 に なり ます か ?" },

      /* ---- temps 2 · le choix des voies ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-option-longue-temps", temps:2, dit:"club", mots:["option-longue"],
        fr:"Il y a une option longue, mais elle va nous faire perdre beaucoup de temps.",
        en:"There's a long route, but it's going to cost us a lot of time.",
        es:"Hay una opción larga, pero nos va a hacer perder mucho tiempo.",
        it:"C'è un'opzione lunga, ma ci farà perdere molto tempo.",
        de:"Es gibt einen Umweg, aber er kostet uns viel Zeit.",
        ja:"迂回 ルート も あり ます が、 かなり 時間 を 失い ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"db-voie-directe-temps", temps:2, dit:"joueuse", mots:["voie-directe"],
        fr:"On prend la voie directe : elle est plus difficile, mais elle nous permet de rester dans le temps.",
        en:"We're taking the direct route: it's more difficult, but it gives us the best chance of staying inside the time.",
        es:"Tomamos la vía directa: es más difícil, pero nos permite quedarnos dentro del tiempo.",
        it:"Prendiamo la via diretta: è più difficile, ma ci permette di restare nel tempo.",
        de:"Wir nehmen den direkten Weg: er ist schwerer, gibt uns aber die beste Chance, in der Zeit zu bleiben.",
        ja:"直線 ルート で 行き ます。 難しい です が、 規定 時間 内 に 収まる 可能性 が 一番 高い です。" },

      /* 🟥 Phrase de Blandine : Claude avait écrit l'inverse. */
      { ref:"db-r-coin-milieu", temps:2, dit:"club", mots:["coin","ligne"],
        fr:"Ne tourne pas trop tôt : vise le milieu du corner et reste droit.",
        en:"Don't turn too early: aim for the middle of the corner and stay straight.",
        es:"No gires demasiado pronto: apunta al centro del corner y quédate derecha.",
        it:"Non girare troppo presto: mira al centro del corner e resta dritta.",
        de:"Wende nicht zu früh: ziele auf die Mitte des Corners und bleib gerade.",
        ja:"早く 回り すぎ ない で。 コーナー の 中央 を 狙い、 まっすぐ 保っ て。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-galop-puissant", temps:2, dit:"club", mots:[],
        fr:"Il faut arriver avec un galop puissant, mais rester en contrôle.",
        en:"You need to come in with a powerful canter, but stay in control.",
        es:"Hay que llegar con un galope potente, pero manteniendo el control.",
        it:"Bisogna arrivare con un galoppo potente, ma restando in controllo.",
        de:"Du musst mit einem kraftvollen Galopp ankommen, aber die Kontrolle behalten.",
        ja:"力強い 駈歩 で 入り ながら、 制御 は 保ち ます。" },

      /* ---- temps 3 · l'eau ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-trois-foulees-eau", temps:3, dit:"club", mots:["complexe-eau","gue"],
        fr:"Après le saut dans l'eau, tu n'as que trois foulées avant le prochain obstacle.",
        en:"After the jump into the water, you've only got three strides before the next fence.",
        es:"Después del salto en el agua, solo tienes tres trancos antes del próximo obstáculo.",
        it:"Dopo il salto nell'acqua, hai solo tre falcate prima dell'ostacolo successivo.",
        de:"Nach dem Sprung ins Wasser hast du nur drei Galoppsprünge bis zum nächsten Hindernis.",
        ja:"水 の 中 に 飛び込ん だ あと、 次 の 障害 まで 三 歩 しか あり ませ ん。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-hesite-eau", temps:3, dit:"club", mots:["complexe-eau"],
        fr:"S'il hésite devant l'eau, garde tes jambes et monte franchement vers l'avant.",
        en:"If he hesitates at the water, keep your leg on and ride positively forward.",
        es:"Si duda ante el agua, mantén las piernas y monta francamente hacia adelante.",
        it:"Se esita davanti all'acqua, tieni le gambe e monta francamente in avanti.",
        de:"Wenn er vor dem Wasser zögert, halte den Schenkel dran und reite entschlossen vorwärts.",
        ja:"水 の 前 で ためらっ たら、 脚 を 保っ て、 はっきり 前 へ 出し ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-renes-reception", temps:3, dit:"club", mots:["reception"],
        fr:"Raccourcis tes rênes dès la réception et prépare ton virage.",
        en:"Shorten your reins as soon as you land and prepare for the turn.",
        es:"Acorta las riendas en cuanto caigas y prepara el giro.",
        it:"Accorcia le redini appena atterri e prepara la curva.",
        de:"Verkürze die Zügel, sobald du landest, und stelle die Wendung ein.",
        ja:"着地 し たら すぐ 手綱 を 詰め、 回転 の 準備 を し ます。" },

      /* ---- temps 4 · les obstacles fixes ---- */
      /* 🟥 Phrase de Blandine, et sa correction du lexique. */
      { ref:"db-r-piano-vide", temps:4, dit:"club", mots:["piano"],
        fr:"Le piano est impressionnant : quand tu arrives sur la première marche, tu as l'impression que tu vas sauter dans le vide.",
        en:"The steps are frightening: as you come to the first one, it feels like you're jumping into thin air.",
        es:"El piano impresiona: cuando llegas al primer escalón, parece que vas a saltar al vacío.",
        it:"Il piano fa impressione: quando arrivi sul primo gradino, sembra di saltare nel vuoto.",
        de:"Die Treppe ist beeindruckend: an der ersten Stufe fühlt es sich an, als spränge man ins Leere.",
        ja:"ピアノ は 迫力 が あり ます。 一段目 に 近づく と、 宙 に 飛び込む よう な 感じ が し ます。" },

      { ref:"db-trakehner-fosse", temps:4, dit:"joueuse", mots:["trakehner","fosse"],
        fr:"Le trakehner, c'est le rondin au-dessus du fossé ?",
        en:"Is the trakehner the log over the ditch?",
        es:"¿El trakehner es el tronco sobre la zanja?",
        it:"Il trakehner è il tronco sopra il fosso?",
        de:"Ist der Trakehner der Baumstamm über dem Graben?",
        ja:"トラケナー と は、 溝 の 上 に 渡し た 丸太 の こと です か ?" },

      { ref:"db-obstacle-etroit-ligne", temps:4, dit:"joueuse", mots:["obstacle-etroit","ligne"],
        fr:"Sur l'obstacle étroit, il faut vraiment garder sa ligne ?",
        en:"On the narrow fence, do I really have to keep my line?",
        es:"En el obstáculo estrecho, ¿hay que mantener la línea?",
        it:"Sull'ostacolo stretto, bisogna davvero mantenere la linea?",
        de:"Muss man beim schmalen Sprung wirklich die Linie halten?",
        ja:"細い 障害 で は、 やはり ライン を 保た なけれ ば なり ませ ん か ?" },

      /* ---- temps 5 · le chrono ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"db-r-laisse-avancer", temps:5, dit:"club", mots:[],
        fr:"Laisse-le avancer entre les obstacles, on doit rattraper quelques secondes.",
        en:"Let him travel between the fences; we need to make up a few seconds.",
        es:"Déjalo avanzar entre los obstáculos: hay que recuperar unos segundos.",
        it:"Lascialo avanzare tra gli ostacoli: dobbiamo recuperare qualche secondo.",
        de:"Lass ihn zwischen den Sprüngen laufen — wir müssen einige Sekunden aufholen.",
        ja:"障害 の 間 は 進ま せ て ください。 数 秒 取り戻す 必要 が あり ます。" },

      { ref:"db-temps-optimum", temps:5, dit:"joueuse", mots:["chronometre"],
        fr:"Le temps optimum, c'est combien ?",
        en:"What's the optimum time?",
        es:"¿Cuál es el tiempo óptimo?",
        it:"Qual è il tempo ottimale?",
        de:"Wie hoch ist die Idealzeit?",
        ja:"基準 タイム は 何 分 です か ?" },

      { ref:"db-tenir-chrono", temps:5, dit:"joueuse", mots:["chronometre"],
        fr:"Tu peux me tenir le chronomètre ?",
        en:"Can you hold the stopwatch for me?",
        es:"¿Me puedes sostener el cronómetro?",
        it:"Mi puoi tenere il cronometro?",
        de:"Kannst du mir die Stoppuhr halten?",
        ja:"ストップ ウォッチ を 持っ て い て もらえ ます か ?" },

      /* ---- temps 6 · l'équipement et l'après ---- */
      { ref:"db-crampons-terrain", temps:6, dit:"joueuse", mots:["crampons"],
        fr:"Il me faut des crampons pour ce terrain ?",
        en:"Do I need studs for this going?",
        es:"¿Necesito ramplones para este terreno?",
        it:"Mi servono i ramponi per questo terreno?",
        de:"Brauche ich Stollen für diesen Boden?",
        ja:"この 馬場 に は 滑り止め が 必要 です か ?" },

      { ref:"db-oublie-bavette", temps:6, dit:"joueuse", mots:["sangle-bavette"],
        fr:"J'ai oublié ma sangle bavette.",
        en:"I've forgotten my stud girth.",
        es:"He olvidado la cincha con peto.",
        it:"Ho dimenticato il sottopancia con paracolpi.",
        de:"Ich habe meinen Sattelgurt mit Schutz vergessen.",
        ja:"腹帯 の プロテクター を 忘れ まし た。" },

      { ref:"db-r-toque-numero", temps:6, dit:"club", mots:["toque","numero-cheval"],
        fr:"Ta toque et ton numéro sont obligatoires au départ.",
        en:"Your hat cover and your bridle number are compulsory at the start.",
        es:"El forro del casco y el número son obligatorios en la salida.",
        it:"Il copricap e il numero sono obbligatori alla partenza.",
        de:"Kappenüberzug und Kopfnummer sind am Start Pflicht.",
        ja:"スタート で は ヘルメット カバー と ゼッケン 番号 が 必須 です。" },

      { ref:"db-arrete-contre-bas", temps:6, dit:"joueuse", mots:["contre-bas"],
        fr:"Il s'est arrêté au contre-bas.",
        en:"He stopped at the drop.",
        es:"Se ha parado en el contrabajo.",
        it:"Si è fermato al salto in discesa.",
        de:"Er ist am Absprung stehengeblieben.",
        ja:"ドロップ で 止まっ て しまい まし た。" }
    ]
  }
};
