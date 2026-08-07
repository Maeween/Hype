/* hype-lingo-lex-materiel.js — Hype Lingo · Chapitre 4 · « Le matériel »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Aucun contenu variable selon le pays :
   une selle est une selle de Dublin à Kyoto.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`.

   PAS DE DOUBLON avec les chapitres déjà écrits :
     · Écurie (1)  possède déjà licol, longe, couverture, seau, anneau.
     · Pansage (2) possède déjà brosses, cure-pied, graisse à pieds.
     · Cheval (3)  possède déjà le fer et le maréchal-ferrant.
     · Cours (5)   possède « raccourcir ses rênes » et « les rênes
       longues » comme ORDRES ; ici `renes` est l'objet. Pas de conflit.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · le tapis de selle s'appelle NUMNAH en Grande-Bretagne, un mot
       qu'aucun dictionnaire scolaire ne donne. Et en espagnol c'est
       « el sudadero » — le mot qu'il ne faut PAS employer pour le
       couteau de chaleur du chapitre 2.
     · l'allemand `die Trense` désigne à la fois le filet complet et le
       mors de filet ; `die Kandare` est la bride.
     · breeches ≠ jodhpurs : la longueur n'est pas la même.
     · crop, whip, schooling whip : trois cravaches en anglais.
     · le japonais dit キュロット (culotte) et 長靴 (bottes) — un
       emprunt au français et un mot japonais, dans la même tenue.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Ce chapitre est celui où j'ai le
   plus de doutes en italien et en espagnol : le petit matériel de
   protection porte souvent le mot anglais dans les selleries, et je ne
   sais pas lequel a gagné. Entrées // ?? reportées au fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.materiel = {
  ref: "materiel",
  chapitre: 4,
  titre: { fr:"Le matériel", en:"The tack", es:"El equipo", it:"L'attrezzatura", de:"Die Ausrüstung", ja:"馬具" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LA SELLE ============ */

  { ref:"selle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle"}, en:{m:"the saddle", p:"sa-deul"},
           es:{m:"la silla de montar", var:"la montura"}, it:{m:"la sella"},
           de:{m:"der Sattel", p:"za-teul"}, ja:{m:"鞍", p:"kura"} },
    def:{ fr:"⚠️ Le mot anglais général pour tout le harnachement est **tack**, pas « material » : « where's my tack ? » veut dire « où sont mes affaires de cheval ? ».",
          en:"The English word for all the equipment together is tack, never « material ».",
          es:"⚠️ La palabra inglesa general para todo el equipo es **tack**, no « material »: « where's my tack ? » significa « ¿dónde están mis cosas de caballo? ».",
          it:"⚠️ La parola inglese generale per tutti i finimenti è **tack**, non « material »: « where's my tack ? » significa « dove sono le mie cose da cavallo? ».",
          de:"⚠️ Das englische Sammelwort für die ganze Ausrüstung ist **tack**, nicht « material »: « where's my tack ? » heißt « Wo ist mein Pferdezeug? ».",
          ja:"⚠️ 馬具一式を指す英語は **tack** で、« material » ではありません。« where's my tack ? » は「私の馬具はどこ？」の意味です。" } },

  { ref:"tapis", lecon:1, coll:"selle",
    mots:{ fr:{m:"le tapis de selle"}, en:{m:"the numnah", p:"neum-na", var:"saddle pad · saddle cloth"},
           es:{m:"el sudadero"}, it:{m:"il sottosella"},
           de:{m:"die Satteldecke", p:"za-teul-dè-ke"}, ja:{m:"ゼッケン", p:"zekken", var:"鞍下"} }, // ??
    def:{ fr:"⚠️ Deux pièges dans un seul mot. En Grande-Bretagne on dit **numnah**, introuvable dans un dictionnaire scolaire. Et en espagnol c'est **el sudadero** — donc jamais ce mot pour le couteau de chaleur.",
          en:"Two traps in one word: Britain says numnah, and Spanish uses sudadero, which francophones often mistake for the sweat scraper.",
          es:"⚠️ Dos trampas en una palabra. En Gran Bretaña se dice **numnah**, imposible de hallar en un diccionario escolar. Y en español es **el sudadero** — nunca esa palabra para el cuchillo de sudor.",
          it:"⚠️ Due trappole in una parola sola. In Gran Bretagna si dice **numnah**, introvabile in un dizionario scolastico. E in spagnolo è **el sudadero** — mai quella parola per il coltello da sudore.",
          de:"⚠️ Zwei Fallen in einem Wort. In Großbritannien sagt man **numnah** — in keinem Schulwörterbuch zu finden. Und auf Spanisch heißt sie **el sudadero** — dieses Wort also nie für das Schweißmesser.",
          ja:"⚠️ ひとつの言葉に罠がふたつ。イギリスでは **numnah** と言い、学習辞書には載っていません。スペイン語では **el sudadero** — 汗こき用の言葉と混同しないこと。" } },

  { ref:"amortisseur", lecon:1, coll:"selle",
    mots:{ fr:{m:"l'amortisseur"}, en:{m:"the half pad", p:"haf padd", var:"gel pad · sheepskin"},
           es:{m:"el amortiguador", var:"la mantilla de gel"}, it:{m:"il sottosella"}, /* it corrige (rapport 07/08) */
           de:{m:"das Pad", p:"pad", var:"das Lammfell = en peau d'agneau"}, ja:{m:"ゲルパッド", p:"geru paddo"} }, /* de corrige (rapport 07/08) : Pad generique, Lammfell = agneau seulement */
    def:{ fr:"La couche de gel ou de mouton qu'on glisse sous la selle. ⚠️ En allemand, das Pad est le mot générique ; das Lammfell ne se dit que de la vraie peau d'agneau.",
          en:"The gel or sheepskin layer under the saddle. In German, das Pad is the generic word; Lammfell only means real sheepskin.",
          es:"La capa de gel o de borrego que se desliza bajo la silla. ⚠️ En alemán, das Pad es el término genérico; das Lammfell solo se dice de la piel de cordero verdadera.",
          it:"Lo strato di gel o di montone che si infila sotto la sella. ⚠️ In tedesco das Pad è il termine generico; das Lammfell si dice solo della vera pelle d'agnello.",
          de:"Die Gel- oder Fellschicht unter dem Sattel. ⚠️ Das Pad ist das Sammelwort; das Lammfell meint nur echtes Lammfell.",
          ja:"鞍の下に敷くジェルやムートンの層。⚠️ ドイツ語の総称は das Pad。das Lammfell は本物の子羊の毛皮だけを指します。" } },

  { ref:"sangle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la sangle"}, en:{m:"the girth", p:"gueurss"},
           es:{m:"la cincha"}, it:{m:"il sottopancia"},
           de:{m:"der Sattelgurt", p:"za-teul-gourt", var:"der Gurt"}, ja:{m:"腹帯", p:"haraobi"} },
    def:{ fr:"Elle tient la selle. On la resserre toujours après quelques minutes de marche : un cheval se gonfle quand on sangle.",
          en:"It holds the saddle on. Always tightened again after a few minutes of walking: horses puff themselves up while being girthed.",
          es:"Sujeta la silla. Se reaprieta siempre tras unos minutos al paso: un caballo se hincha cuando se le cincha.",
          it:"Tiene ferma la sella. Si ristringe sempre dopo qualche minuto al passo: un cavallo si gonfia quando lo si cinghia.",
          de:"Hält den Sattel. Nach ein paar Minuten Schritt immer nachgurten: Ein Pferd bläht sich beim Gurten auf.",
          ja:"鞍を留めるベルト。数分歩いたら必ず締め直します。腹帯を締めるとき、馬はお腹をふくらませるからです。" } },

  { ref:"etriers", lecon:1, coll:"selle",
    mots:{ fr:{m:"les étriers"}, en:{m:"the stirrups", p:"sti-reups"},
           es:{m:"los estribos"}, it:{m:"le staffe"},
           de:{m:"die Steigbügel", p:"chtaïg-bu-gueul"}, ja:{m:"鐙", p:"abumi"} },
    def:{ fr:"Le pied s'y pose au tiers avant, jamais enfoncé jusqu'au talon. L'allemand se contente souvent de Bügel à l'oral.",
          en:"The foot rests on the ball, never pushed home to the heel. German riders usually shorten it to Bügel.",
          es:"El pie se apoya en el tercio delantero, nunca hundido hasta el talón. El alemán se conforma a menudo con Bügel al hablar.",
          it:"Il piede vi si appoggia sul terzo anteriore, mai affondato fino al tallone. Il tedesco si accontenta spesso di Bügel all'orale.",
          de:"Der Fuß steht im vorderen Drittel, nie bis zum Absatz durchgeschoben. Mündlich genügt oft Bügel.",
          ja:"足を乗せるのはつま先側の三分の一まで。踵まで深く入れてはいけません。ドイツ語の会話では Bügel だけで通じます。" } },

  { ref:"etrivieres", lecon:1, coll:"selle",
    mots:{ fr:{m:"les étrivières"}, en:{m:"the stirrup leathers", p:"sti-reup lè-zeurz"},
           es:{m:"las aciones"}, it:{m:"gli staffili"},
           de:{m:"die Steigbügelriemen", p:"chtaïg-bu-gueul-ri-meune"}, ja:{m:"鐙革", p:"abumigawa"} },
    def:{ fr:"Les lanières qui portent les étriers. Chaque langue a un mot dédié, sans rapport avec les autres : leathers, aciones, staffili.",
          en:"The straps carrying the stirrups. Every language has its own unrelated word for them.",
          es:"Las correas que llevan los estribos. Cada lengua tiene un término propio, sin relación entre sí: leathers, aciones, staffili.",
          it:"Le cinghie che portano le staffe. Ogni lingua ha una parola dedicata, senza rapporto con le altre: leathers, aciones, staffili.",
          de:"Die Riemen, an denen die Bügel hängen. Jede Sprache hat ihr eigenes, verwandtschaftsloses Wort: leathers, aciones, staffili.",
          ja:"鐙を吊る革。どの言語も互いに無関係な専用語を持っています — leathers、aciones、staffili。" } },

  { ref:"pommeau", lecon:1, coll:"selle",
    mots:{ fr:{m:"le pommeau"}, en:{m:"the pommel", p:"po-meul"},
           es:{m:"la perilla"}, it:{m:"il pomello"},
           de:{m:"der Sattelkopf", p:"za-teul-kopf"}, ja:{m:"前橋", p:"zenkyō"} }, /* ja corrige (rapport 07/08) : lecture zenkyō — maebashi est la ville */
    def:{ fr:"L'avant relevé de la selle, qu'on attrape à la montée en cas de besoin. L'arrière s'appelle le troussequin.",
          en:"The raised front of the saddle, grabbed when mounting if needed. The raised back is the cantle.",
          es:"La parte delantera elevada de la silla, que se agarra al montar si hace falta. La trasera se llama la trusa o borrén trasero.",
          it:"La parte anteriore rialzata della sella, che si afferra montando se serve. Il posteriore si chiama paletta.",
          de:"Der erhöhte Vorderteil des Sattels, an dem man sich beim Aufsteigen notfalls festhält. Hinten heißt es Hinterzwiesel.",
          ja:"鞍の前方の盛り上がり。乗るとき必要ならここをつかみます。後ろ側は後橋と呼びます。" } },

  { ref:"selle-dressage", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle de dressage"}, en:{m:"the dressage saddle", p:"drè-sadj sa-deul"},
           es:{m:"la silla de doma"}, it:{m:"la sella da dressage"},
           de:{m:"der Dressursattel", p:"drè-sour-za-teul"}, ja:{m:"馬場鞍", p:"babakura"} }, // ??
    def:{ fr:"Quartiers longs et droits, siège profond, pour une jambe descendue. ⚠️ En espagnol le dressage s'appelle **la doma** — le mot dressage n'y est pas utilisé.",
          en:"Long straight flaps and a deep seat, for a long leg. Spanish calls dressage « la doma », not dressage.",
          es:"Faldones largos y rectos, asiento profundo, para una pierna descendida. ⚠️ En español la disciplina se llama **la doma** — la palabra dressage no se usa.",
          it:"Quartieri lunghi e dritti, seggio profondo, per una gamba discesa. ⚠️ In spagnolo la disciplina si chiama **la doma** — la parola dressage non si usa.",
          de:"Lange, gerade Blätter, tiefer Sitz, für ein tief hängendes Bein. ⚠️ Auf Spanisch heißt die Disziplin **la doma** — das Wort Dressage wird nicht benutzt.",
          ja:"あおり革が長くまっすぐで、シートが深く、脚を長く下ろすための鞍。⚠️ スペイン語ではこの競技を **la doma** と呼び、dressage という語は使いません。" } },

  { ref:"selle-obstacle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle d'obstacle"}, en:{m:"the jumping saddle", p:"djeum-ping sa-deul"},
           es:{m:"la silla de salto"}, it:{m:"la sella da salto"},
           de:{m:"der Springsattel", p:"chpring-za-teul"}, ja:{m:"障害鞍", p:"shōgaikura"} }, // ??
    def:{ fr:"Quartiers avancés et taquets, pour une jambe remontée en équilibre. Le mot allemand se devine : springen, sauter.",
          en:"Forward-cut flaps and knee blocks, for a shorter leg in balance. The German word gives itself away: springen, to jump.",
          es:"Faldones adelantados y rodilleras, para una pierna subida en equilibrio. La palabra alemana se adivina: springen, saltar.",
          it:"Quartieri avanzati e appoggi, per una gamba risalita in equilibrio. La parola tedesca si indovina: springen, saltare.",
          de:"Vorgeschnittene Blätter und Pauschen, für ein hochgenommenes Bein im leichten Sitz. Das deutsche Wort errät man: springen.",
          ja:"あおり革が前に出てニーパッドがつき、鐙を短くしてバランスを取るための鞍。ドイツ語は見当がつきます — springen、跳ぶこと。" } },

  { ref:"selle-mixte", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle mixte"}, en:{m:"the general purpose saddle", p:"djè-ne-reul peur-peuss", var:"GP saddle"},
           es:{m:"la silla mixta"}, it:{m:"la sella mista"},
           de:{m:"der Vielseitigkeitssattel", p:"fil-zaï-tirh-kaïts-za-teul"}, ja:{m:"総合鞍", p:"sōgōkura"} }, // ??
    def:{ fr:"La selle passe-partout des clubs. En Grande-Bretagne on l'appelle simplement **a GP** — deux lettres qu'il faut connaître pour comprendre une annonce.",
          en:"The all-round riding-school saddle. In Britain it is just « a GP », two letters you need in order to read an advert.",
          es:"La silla para todo de los clubes. En Gran Bretaña se llama simplemente **a GP** — dos letras que hay que conocer para entender un anuncio.",
          it:"La sella passe-partout dei club. In Gran Bretagna si chiama semplicemente **a GP** — due lettere da conoscere per capire un annuncio.",
          de:"Der Allroundsattel der Clubs. In Großbritannien heißt er schlicht **a GP** — zwei Buchstaben, ohne die man keine Anzeige versteht.",
          ja:"クラブの万能鞍。イギリスでは単に **a GP** と呼ばれます。売買広告を読むには、この二文字を知らないといけません。" } },

  /* ============ LEÇON 2 · LE FILET ET L'EMBOUCHURE ============ */

  { ref:"filet", lecon:2, coll:"filet",
    mots:{ fr:{m:"le filet"}, en:{m:"the bridle", p:"braï-deul"},
           es:{m:"la cabezada"}, it:{m:"la testiera", var:"il filetto"},
           de:{m:"die Trense", p:"trèn-ze"}, ja:{m:"頭絡", p:"tōraku"} },
    def:{ fr:"L'ensemble de cuir qui tient le mors. ⚠️ En allemand, **die Trense** désigne à la fois le filet complet et le mors de filet : le contexte tranche. La bride, elle, est die Kandare.",
          en:"The leatherwork that holds the bit. In German, Trense means both the whole snaffle bridle and the snaffle bit itself.",
          es:"El conjunto de cuero que sostiene el bocado. ⚠️ En alemán, **die Trense** designa a la vez la cabezada completa y el bocado de filete: el contexto decide. La brida es die Kandare.",
          it:"L'insieme di cuoio che tiene l'imboccatura. ⚠️ In tedesco **die Trense** indica sia la testiera completa sia il morso a filetto: decide il contesto. La briglia è die Kandare.",
          de:"Das Lederzeug, das das Gebiss trägt. ⚠️ **Die Trense** meint sowohl das ganze Zaumzeug als auch das Trensengebiss — der Kontext entscheidet. Die Kandare ist das andere.",
          ja:"ハミを支える革のひとそろい。⚠️ ドイツ語の **die Trense** は頭絡全体とハミの両方を指し、文脈で判断します。大勒は die Kandare です。" } },

  { ref:"tetiere", lecon:2, coll:"filet",
    mots:{ fr:{m:"la têtière"}, en:{m:"the headpiece", p:"hèd-piss"},
           es:{m:"la testera"}, it:{m:"il sopratesta"}, // ??
           de:{m:"das Genickstück", p:"gue-nik-chtuk"}, ja:{m:"項革", p:"unajigawa"} }, // ??
    def:{ fr:"La partie qui passe derrière les oreilles et porte tout le filet. L'allemand la nomme par l'anatomie : Genick, la nuque.",
          en:"The strap behind the ears that carries the whole bridle. German names it after the anatomy: Genick, the poll.",
          es:"La parte que pasa detrás de las orejas y sostiene toda la cabezada. El alemán la nombra por la anatomía: Genick, la nuca.",
          it:"La parte che passa dietro le orecchie e porta tutta la testiera. Il tedesco la chiama con l'anatomia: Genick, la nuca.",
          de:"Das Stück hinter den Ohren, das den ganzen Zaum trägt. Das Deutsche benennt es anatomisch: das Genick.",
          ja:"両耳の後ろを通り、頭絡全体を支える部分。ドイツ語は体の部位そのままに Genick（うなじ）と呼びます。" } },

  { ref:"frontal", lecon:2, coll:"filet",
    mots:{ fr:{m:"le frontal"}, en:{m:"the browband", p:"braou-band"},
           es:{m:"la frontalera"}, it:{m:"il frontalino"},
           de:{m:"der Stirnriemen", p:"chtirn-ri-meune"}, ja:{m:"額革", p:"hitaigawa"} }, // ??
    def:{ fr:"La bande qui barre le front, sous laquelle on ramène le toupet. C'est la pièce qu'on personnalise aux couleurs de l'écurie en concours.",
          en:"The band across the forehead, with the forelock brought over it. The piece riders customise in team colours.",
          es:"La banda que cruza la frente, bajo la cual se recoge el tupé. Es la pieza que se personaliza con los colores de la cuadra en concurso.",
          it:"La banda che attraversa la fronte, sotto la quale si porta il ciuffo. È il pezzo che si personalizza con i colori della scuderia in concorso.",
          de:"Das Band über der Stirn, unter das der Schopf gelegt wird. Das Stück, das man im Turnier in den Stallfarben trägt.",
          ja:"額を横切る革帯。前髪はこの上に出します。競技会で厩舎のカラーに飾るのは、この部分です。" } },

  { ref:"muserolle", lecon:2, coll:"filet",
    mots:{ fr:{m:"la muserolle"}, en:{m:"the noseband", p:"nôze-band"},
           es:{m:"la muserola"}, it:{m:"la capezzina"}, // ??
           de:{m:"der Nasenriemen", p:"na-zeune-ri-meune"}, ja:{m:"鼻革", p:"hanagawa"} },
    def:{ fr:"Elle entoure le chanfrein. On doit pouvoir glisser deux doigts dessous : c'est contrôlé en concours dans presque tous les pays.",
          en:"It goes round the nose. Two fingers must fit underneath — checked at competitions in nearly every country.",
          es:"Rodea la caña de la nariz. Deben caber dos dedos por debajo: se controla en concurso en casi todos los países.",
          it:"Circonda la canna nasale. Devono passarci due dita sotto: è controllato in concorso in quasi tutti i paesi.",
          de:"Umschließt den Nasenrücken. Zwei Finger müssen darunter passen — das wird auf Turnieren fast überall geprüft.",
          ja:"鼻梁を囲む革。下に指が二本入ること — ほとんどの国の競技会で検査されます。" } },

  { ref:"sous-gorge", lecon:2, coll:"filet",
    mots:{ fr:{m:"la sous-gorge"}, en:{m:"the throatlash", p:"srôte-lache"},
           es:{m:"el ahogadero"}, it:{m:"il sottogola"},
           de:{m:"der Kehlriemen", p:"kél-ri-meune"}, ja:{m:"喉革", p:"nodogawa"} }, // ??
    def:{ fr:"La lanière lâche sous la gorge, qui empêche le filet de passer par-dessus la tête. On laisse la largeur d'une main.",
          en:"The loose strap under the throat that stops the bridle coming over the head. Leave a hand's width.",
          es:"La correa floja bajo la garganta, que impide que la cabezada pase por encima de la cabeza. Se deja el ancho de una mano.",
          it:"La cinghia lenta sotto la gola, che impedisce alla testiera di passare sopra la testa. Si lascia la larghezza di una mano.",
          de:"Der lockere Riemen unter der Kehle, der verhindert, dass der Zaum über den Kopf rutscht. Eine Handbreit Platz lassen.",
          ja:"のどの下のゆるい革。頭絡が頭から抜けるのを防ぎます。手のひら一枚分のゆとりを残すこと。" } },

  { ref:"renes", lecon:2, coll:"filet",
    mots:{ fr:{m:"les rênes"}, en:{m:"the reins", p:"rènz"},
           es:{m:"las riendas"}, it:{m:"le redini"},
           de:{m:"die Zügel", p:"tsu-gueul"}, ja:{m:"手綱", p:"tazuna"} },
    def:{ fr:"⚠️ Ne pas confondre à l'oral avec **the rains** (la pluie) ni **the reign** (le règne) : les trois se prononcent pareil en anglais. Et souviens-toi qu'on monte « on the left rein », sur la main gauche.",
          en:"Careful: reins, rains and reign are all pronounced alike. And remember you ride « on the left rein » — the French say « hand ».",
          es:"⚠️ No confundir al oído con **the rains** (la lluvia) ni **the reign** (el reinado): las tres se pronuncian igual en inglés. Y recuerda que se monta « on the left rein », a mano izquierda.",
          it:"⚠️ Da non confondere all'ascolto con **the rains** (la pioggia) né **the reign** (il regno): le tre si pronunciano uguali in inglese. E ricorda che si monta « on the left rein », a mano sinistra.",
          de:"⚠️ Nicht mit **the rains** (Regen) oder **the reign** (Herrschaft) verwechseln: Alle drei klingen gleich. Und man reitet « on the left rein » — auf der linken Hand.",
          ja:"⚠️ 耳で聞くと **the rains**（雨）や **the reign**（治世）と同じ音です。三つとも発音が同じ。そして「左手前」は « on the left rein » と言うのを覚えておくこと。" } },

  { ref:"mors", lecon:2, coll:"filet",
    mots:{ fr:{m:"le mors"}, en:{m:"the bit", p:"bitt"},
           es:{m:"el bocado"}, it:{m:"l'imboccatura", var:"il filetto"},
           de:{m:"das Gebiss", p:"gue-biss"}, ja:{m:"ハミ", p:"hami", var:"銜"} },
    def:{ fr:"La pièce de métal dans la bouche. Se rince à l'eau claire après chaque séance, jamais au savon. ⚠️ L'allemand das Gebiss veut aussi dire « dentier » : le mot est le même.",
          en:"The metal in the mouth, rinsed in clean water after every ride, never soaped. German Gebiss also means a set of dentures.",
          es:"La pieza de metal en la boca. Se aclara con agua limpia tras cada sesión, jamás con jabón. ⚠️ El alemán das Gebiss también significa « dentadura postiza »: la palabra es la misma.",
          it:"Il pezzo di metallo in bocca. Si sciacqua ad acqua pulita dopo ogni seduta, mai col sapone. ⚠️ Il tedesco das Gebiss vuol dire anche « dentiera »: la parola è la stessa.",
          de:"Das Metallstück im Maul. Nach jeder Einheit mit klarem Wasser spülen, nie mit Seife. ⚠️ Das Gebiss heißt auch das künstliche — es ist dasselbe Wort.",
          ja:"口の中の金属。毎回、水だけで洗い、石けんは使いません。⚠️ ドイツ語の das Gebiss には「入れ歯」の意味もあり、まったく同じ言葉です。" } },

  { ref:"bride", lecon:2, coll:"filet",
    mots:{ fr:{m:"la bride"}, en:{m:"the double bridle", p:"deu-beul braï-deul"},
           es:{m:"la brida"}, it:{m:"la briglia"},
           de:{m:"die Kandare", p:"kan-da-re"}, ja:{m:"大勒", p:"dairoku"} }, // ??
    def:{ fr:"Deux mors et quatre rênes, réservée au dressage confirmé. ⚠️ Faux ami franco-espagnol commode : **la brida** en espagnol, c'est bien la bride ; mais **la cabezada**, c'est le filet.",
          en:"Two bits and four reins, for advanced dressage only. Spanish brida is the double bridle, cabezada the snaffle bridle.",
          es:"Dos bocados y cuatro riendas, reservada a la doma avanzada. ⚠️ Falso amigo franco-español cómodo: **la brida** en español es en efecto la brida; pero **la cabezada** es el filete.",
          it:"Due imboccature e quattro redini, riservata al dressage avanzato. ⚠️ Falso amico franco-spagnolo comodo: **la brida** in spagnolo è proprio la briglia; ma **la cabezada** è la testiera del filetto.",
          de:"Zwei Gebisse und vier Zügel, dem fortgeschrittenen Dressurreiten vorbehalten. ⚠️ Praktischer falscher Freund: **la brida** ist wirklich die Kandare — aber **la cabezada** ist die Trense.",
          ja:"二つのハミと四本の手綱。上級の馬場馬術のためのものです。⚠️ 西仏の紛らわしくも便利な対応：スペイン語の **la brida** は確かに大勒 — でも **la cabezada** は水勒のことです。" } },

  { ref:"collier-chasse", lecon:2, coll:"filet",
    mots:{ fr:{m:"le collier de chasse"}, en:{m:"the breastplate", p:"brèst-pléïte"},
           es:{m:"el petral"}, it:{m:"il pettorale"},
           de:{m:"das Vorderzeug", p:"for-deur-tsoïg"}, ja:{m:"胸繋", p:"munetsunagi"} }, /* de corrige (rapport 07/08) : genre neutre ; ja lu munetsunagi */
    def:{ fr:"Il empêche la selle de reculer, en extérieur et en cross. Le nom français vient de la chasse à courre ; l'anglais décrit simplement la poitrine.",
          en:"It stops the saddle sliding back, out hacking and across country. French names it after hunting, English simply after the chest.",
          es:"Impide que la silla recule, en exterior y en cross. El nombre francés viene de la caza a caballo; el inglés describe simplemente el pecho.",
          it:"Impedisce alla sella di arretrare, in esterna e in cross. Il nome francese viene dalla caccia a cavallo; l'inglese descrive semplicemente il petto.",
          de:"Verhindert das Zurückrutschen des Sattels, im Gelände und im Cross. Der französische Name kommt von der Jagd; das Englische beschreibt schlicht die Brust.",
          ja:"鞍が後ろへずれるのを防ぎます。外乗やクロスで使用。フランス語名は狩猟に由来し、英語は単に胸を描写しているだけです。" } },

  { ref:"martingale", lecon:2, coll:"filet",
    mots:{ fr:{m:"la martingale"}, en:{m:"the martingale", p:"mar-tin-guéïl", var:"running · standing"},
           es:{m:"la martingala"}, it:{m:"la martingala"},
           de:{m:"das Martingal", p:"mar-tin-gal"}, ja:{m:"マルタンガール", p:"marutangāru"} },
    def:{ fr:"Elle limite l'élévation de l'encolure. L'anglais distingue la **running martingale** (à anneaux, la courante) de la **standing martingale** (fixe, plus rare et interdite en dressage).",
          en:"It limits how high the horse can throw its head. English separates the running martingale from the fixed standing martingale.",
          es:"Limita la elevación del cuello. El inglés distingue la **running martingale** (de anillas, corredera) de la **standing martingale** (fija, más rara y prohibida en doma).",
          it:"Limita l'elevazione dell'incollatura. L'inglese distingue la **running martingale** (ad anelli, scorrevole) dalla **standing martingale** (fissa, più rara e vietata in dressage).",
          de:"Begrenzt das Hochwerfen des Halses. Das Englische trennt die **running martingale** (mit Ringen) von der **standing martingale** (fest, seltener, in der Dressur verboten).",
          ja:"首を上げすぎるのを抑える馬具。英語はリング式の **running martingale** と、固定式でより稀な（馬場では禁止の）**standing martingale** を区別します。" } },

  /* ============ LEÇON 3 · LE CAVALIER ============ */

  { ref:"bombe", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la bombe", var:"le casque"}, en:{m:"the riding hat", p:"raï-ding hatt", var:"helmet · skull cap"},
           es:{m:"el casco"}, it:{m:"il caschetto"},
           de:{m:"der Reithelm", p:"raït-hèlm"}, ja:{m:"ヘルメット", p:"herumetto", var:"乗馬帽"} },
    def:{ fr:"Obligatoire, sans discussion, et à remplacer après toute chute. ⚠️ En Grande-Bretagne, « hat » suffit et sous-entend toujours la bombe : « get your hat » ne veut pas dire un chapeau.",
          en:"Compulsory, no argument, and replaced after any fall. In Britain « hat » alone always means the riding hat.",
          es:"Obligatorio, sin discusión, y a sustituir tras toda caída. ⚠️ En Gran Bretaña, « hat » basta y sobreentiende siempre el casco: « get your hat » no significa un sombrero.",
          it:"Obbligatorio, senza discussione, e da sostituire dopo ogni caduta. ⚠️ In Gran Bretagna « hat » basta e sottintende sempre il cap: « get your hat » non vuol dire un cappello.",
          de:"Pflicht, ohne Diskussion, und nach jedem Sturz zu ersetzen. ⚠️ In Großbritannien genügt « hat » und meint immer den Reithelm: « get your hat » heißt nicht Hut.",
          ja:"議論の余地なく義務。落馬したら必ず買い替えます。⚠️ イギリスでは « hat » だけで常にヘルメットを意味します。« get your hat » は帽子のことではありません。" } },

  { ref:"gilet", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet de protection"}, en:{m:"the body protector", p:"bo-di pro-tèk-teur"},
           es:{m:"el chaleco protector"}, it:{m:"il corpetto protettivo"},
           de:{m:"die Sicherheitsweste", p:"zi-cheur-haïts-vès-te"}, ja:{m:"プロテクター", p:"purotekutā"} },
    def:{ fr:"Obligatoire en cross et pour les jeunes cavaliers dans beaucoup de clubs. Il se choisit à la taille exacte : trop grand, il ne protège plus.",
          en:"Compulsory for cross-country and for young riders in many clubs. It must fit exactly: too big and it no longer protects.",
          es:"Obligatorio en cross y para los jinetes jóvenes en muchos clubes. Se elige a la talla exacta: demasiado grande, ya no protege.",
          it:"Obbligatorio in cross e per i giovani cavalieri in molti club. Si sceglie della taglia esatta: troppo grande, non protegge più.",
          de:"Pflicht im Gelände und für junge Reiter in vielen Ställen. In der exakten Größe wählen: Zu groß schützt sie nicht mehr.",
          ja:"クロスでは義務、多くのクラブでは若い騎手にも義務。サイズはぴったりを選ぶこと。大きすぎるものは、もう守ってくれません。" } },

  { ref:"airbag", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet airbag"}, en:{m:"the air jacket", p:"èr dja-kette", var:"air vest"},
           es:{m:"el chaleco airbag"}, it:{m:"il gilet airbag"},
           de:{m:"die Airbagweste", p:"èr-bag-vès-te"}, ja:{m:"エアバッグベスト", p:"eabaggu besuto"} }, // ??
    def:{ fr:"Relié à la selle par une cordelette qui déclenche la cartouche à la chute. Se porte par-dessus le gilet de protection, jamais à la place.",
          en:"Linked to the saddle by a lanyard that fires the cartridge in a fall. Worn over a body protector, never instead of one.",
          es:"Unido a la silla por un cordón que dispara el cartucho en la caída. Se lleva encima del chaleco de protección, jamás en su lugar.",
          it:"Collegato alla sella da un cordino che fa scattare la cartuccia alla caduta. Si porta sopra il gilet di protezione, mai al suo posto.",
          de:"Über eine Reißleine mit dem Sattel verbunden, die beim Sturz die Kartusche auslöst. Wird über der Schutzweste getragen, nie statt ihrer.",
          ja:"鞍とコードでつながれ、落馬の瞬間にカートリッジが作動します。着るのはプロテクターベストの上から。代わりにではありません。" } },

  { ref:"culotte", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la culotte d'équitation"}, en:{m:"the breeches", p:"bri-tchiz", var:"jodhpurs = longues"},
           es:{m:"el pantalón de montar"}, it:{m:"i pantaloni da equitazione"},
           de:{m:"die Reithose", p:"raït-hô-ze"}, ja:{m:"キュロット", p:"kyurotto"} },
    def:{ fr:"⚠️ Deux mots anglais, deux longueurs : les **breeches** s'arrêtent au mollet et se portent avec des bottes, les **jodhpurs** descendent à la cheville et se portent avec des boots. Le japonais, lui, a emprunté le français : キュロット.",
          en:"Two English words, two lengths: breeches stop at the calf and go with tall boots, jodhpurs reach the ankle and go with short boots.",
          es:"⚠️ Dos palabras inglesas, dos largos: los **breeches** se detienen en la pantorrilla y se llevan con botas, los **jodhpurs** bajan al tobillo y se llevan con botines. El japonés tomó prestado el francés: キュロット.",
          it:"⚠️ Due parole inglesi, due lunghezze: i **breeches** si fermano al polpaccio e si portano con gli stivali, i **jodhpurs** scendono alla caviglia e si portano con gli stivaletti. Il giapponese ha preso in prestito il francese: キュロット.",
          de:"⚠️ Zwei englische Wörter, zwei Längen: **breeches** enden an der Wade und gehören zu Stiefeln, **jodhpurs** reichen zum Knöchel und gehören zu Stiefeletten. Das Japanische entlieh das Französische: キュロット.",
          ja:"⚠️ 英語には長さ違いの二語があります。ふくらはぎ丈でロングブーツと合わせる **breeches**、足首丈でショートブーツと合わせる **jodhpurs**。日本語はフランス語を借りました — キュロット。" } },

  { ref:"bottes", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les bottes"}, en:{m:"the riding boots", p:"raï-ding boutss", var:"long boots · jodhpur boots"},
           es:{m:"las botas de montar"}, it:{m:"gli stivali da equitazione"},
           de:{m:"die Reitstiefel", p:"raït-chti-feul"}, ja:{m:"長靴", p:"chōka"} }, // ??
    def:{ fr:"Talon marqué et semelle lisse, pour que le pied ne passe pas à travers l'étrier. Le japonais dit littéralement « chaussure longue » (長靴).",
          en:"A defined heel and a smooth sole, so the foot cannot slide through the stirrup. Japanese says literally « long shoe ».",
          es:"Tacón marcado y suela lisa, para que el pie no atraviese el estribo. El japonés dice literalmente « zapato largo » (長靴).",
          it:"Tacco netto e suola liscia, perché il piede non passi attraverso la staffa. Il giapponese dice alla lettera « scarpa lunga » (長靴).",
          de:"Klarer Absatz, glatte Sohle, damit der Fuß nicht durch den Bügel rutscht. Das Japanische sagt wörtlich « langer Schuh » (長靴).",
          ja:"かかとがあり、靴底がなめらかなブーツ。足が鐙を突き抜けないためです。日本語は文字どおり「長い靴」— 長靴と言います。" } },

  { ref:"minichaps", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les mini-chaps"}, en:{m:"the half chaps", p:"haf tchaps", var:"gaiters"},
           es:{m:"las medias polainas"}, it:{m:"i gambali"}, // ??
           de:{m:"die Minichaps", p:"mi-ni-tchaps"}, ja:{m:"ハーフチャップス", p:"hāfu chappusu"} }, // ??
    def:{ fr:"La guêtre de cuir ou de tissu qui remplace la botte haute, portée sur des boots. Le mot anglais chaps vient de l'espagnol des vaqueros, chaparreras.",
          en:"The leather or fabric wrap that replaces a tall boot, worn over short boots. « Chaps » comes from the Spanish of the vaqueros.",
          es:"La polaina de cuero o tela que sustituye a la bota alta, llevada sobre botines. La palabra inglesa chaps viene del español de los vaqueros, chaparreras.",
          it:"La ghetta di cuoio o tessuto che sostituisce lo stivale alto, portata su stivaletti. La parola inglese chaps viene dallo spagnolo dei vaqueros, chaparreras.",
          de:"Die Leder- oder Stoffgamasche, die den hohen Stiefel ersetzt, über Stiefeletten getragen. Das englische chaps kommt aus dem Spanisch der Vaqueros: chaparreras.",
          ja:"ロングブーツの代わりにショートブーツの上へ着ける、革や布のゲートル。英語の chaps はバケーロたちのスペイン語 chaparreras から来ています。" } },

  { ref:"gants", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les gants"}, en:{m:"the gloves", p:"gleuvz"},
           es:{m:"los guantes"}, it:{m:"i guanti"},
           de:{m:"die Handschuhe", p:"hant-chou-e"}, ja:{m:"手袋", p:"tebukuro"} },
    def:{ fr:"Ils protègent des brûlures de rênes, surtout sous la pluie ou en longe. Blancs en dressage de concours, noirs le reste du temps.",
          en:"They save your hands from rein burns, especially in rain or on the lunge. White for dressage competition, black otherwise.",
          es:"Protegen de las quemaduras de riendas, sobre todo bajo la lluvia o dando cuerda. Blancos en doma de concurso, negros el resto del tiempo.",
          it:"Proteggono dalle bruciature di redini, soprattutto sotto la pioggia o alla longia. Bianchi in dressage da concorso, neri il resto del tempo.",
          de:"Schützen vor Zügelbrand, besonders bei Regen oder an der Longe. Weiß in der Turnierdressur, sonst schwarz.",
          ja:"手綱ずれのやけどから手を守ります。雨の日や調馬索では特に。競技会の馬場馬術では白、それ以外は黒です。" } },

  { ref:"cravache", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la cravache"}, en:{m:"the whip", p:"ouipp", var:"crop = courte · schooling whip = longue"},
           es:{m:"la fusta"}, it:{m:"il frustino"},
           de:{m:"die Gerte", p:"guèr-te"}, ja:{m:"鞭", p:"muchi"} },
    def:{ fr:"Une aide, jamais une punition. ⚠️ L'anglais a trois mots selon la longueur : **crop** (courte, obstacle), **whip** (générique), **schooling whip** ou **dressage whip** (longue, sur le plat).",
          en:"An aid, never a punishment. English has three words by length: crop, whip, and schooling or dressage whip.",
          es:"Una ayuda, jamás un castigo. ⚠️ El inglés tiene tres palabras según el largo: **crop** (corta, salto), **whip** (genérico), **schooling whip** o **dressage whip** (larga, en llano).",
          it:"Un aiuto, mai una punizione. ⚠️ L'inglese ha tre parole secondo la lunghezza: **crop** (corta, ostacoli), **whip** (generico), **schooling whip** o **dressage whip** (lunga, in piano).",
          de:"Eine Hilfe, nie eine Strafe. ⚠️ Das Englische hat drei Wörter je nach Länge: **crop** (kurz, Springen), **whip** (allgemein), **schooling whip** oder **dressage whip** (lang, auf dem Platz).",
          ja:"扶助であって、罰では決してありません。⚠️ 英語は長さで三語を使い分けます。短く障害用の **crop**、総称の **whip**、長く平地用の **schooling whip** / **dressage whip**。" } },

  { ref:"eperons", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les éperons"}, en:{m:"the spurs", p:"speurz"},
           es:{m:"las espuelas"}, it:{m:"gli speroni"},
           de:{m:"die Sporen", p:"chpô-reune"}, ja:{m:"拍車", p:"hakusha"} },
    def:{ fr:"Réservés à une jambe stable et indépendante. Beaucoup de clubs les interdisent avant un certain niveau, dans tous les pays.",
          en:"Only for a stable, independent leg. Many clubs forbid them below a certain level, in every country.",
          es:"Reservadas a una pierna estable e independiente. Muchos clubes las prohíben antes de cierto nivel, en todos los países.",
          it:"Riservati a una gamba stabile e indipendente. Molti club li vietano prima di un certo livello, in tutti i paesi.",
          de:"Nur für ein ruhiges, unabhängiges Bein. Viele Ställe verbieten sie vor einem gewissen Niveau — in allen Ländern.",
          ja:"安定した独立の効いた脚だけに許されるもの。どの国でも、多くのクラブが一定レベルまでは禁止しています。" } },

  { ref:"tenue", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la tenue"}, en:{m:"the kit", p:"kitt", var:"gear"},
           es:{m:"el equipo"}, it:{m:"l'attrezzatura"},
           de:{m:"die Ausrüstung", p:"aouss-rus-toung"}, ja:{m:"装備", p:"sōbi"} },
    def:{ fr:"L'ensemble de ce que porte le cavalier. ⚠️ En anglais, **kit** désigne les affaires du cavalier et **tack** celles du cheval : ne pas les échanger.",
          en:"Everything the rider wears. In English, kit is the rider's things and tack the horse's — do not swap them.",
          es:"El conjunto de lo que lleva el jinete. ⚠️ En inglés, **kit** designa las cosas del jinete y **tack** las del caballo: no intercambiarlas.",
          it:"L'insieme di ciò che porta il cavaliere. ⚠️ In inglese **kit** indica le cose del cavaliere e **tack** quelle del cavallo: non scambiarle.",
          de:"Alles, was der Reiter trägt. ⚠️ **Kit** meint die Sachen des Reiters, **tack** die des Pferdes: nicht vertauschen.",
          ja:"騎手が身につけるもの一式。⚠️ 英語では騎手のものが **kit**、馬のものが **tack**。取り違えないこと。" } },

  /* ============ LEÇON 4 · PROTECTIONS ET GESTES ============ */

  { ref:"guetres", lecon:4, coll:"protections",
    mots:{ fr:{m:"les guêtres"}, en:{m:"the brushing boots", p:"breu-ching boutss", var:"boots · tendon boots"},
           es:{m:"las protecciones"}, it:{m:"i paracolpi"}, // ??
           de:{m:"die Gamaschen", p:"ga-ma-cheune"}, ja:{m:"プロテクター", p:"purotekutā"} }, // ??
    def:{ fr:"Elles protègent le membre des atteintes du membre opposé. ⚠️ En anglais, **boots** tout court peut désigner les guêtres du cheval comme les bottes du cavalier : le contexte décide.",
          en:"They protect a leg from being struck by the opposite one. In English, « boots » can mean the horse's or the rider's — context decides.",
          es:"Protegen la extremidad de los alcances de la extremidad opuesta. ⚠️ En inglés, **boots** a secas puede designar las protecciones del caballo o las botas del jinete: el contexto decide.",
          it:"Proteggono l'arto dai colpi dell'arto opposto. ⚠️ In inglese **boots** da solo può indicare le protezioni del cavallo come gli stivali del cavaliere: decide il contesto.",
          de:"Schützen das Bein vor Schlägen des Gegenbeins. ⚠️ **Boots** allein kann Gamaschen des Pferdes oder Stiefel des Reiters meinen — der Kontext entscheidet.",
          ja:"反対側の脚がぶつかる衝撃から脚を守ります。⚠️ 英語の **boots** 一語は、馬のプロテクターも騎手のブーツも指しえます。決めるのは文脈です。" } },

  { ref:"cloches", lecon:4, coll:"protections",
    mots:{ fr:{m:"les cloches"}, en:{m:"the over-reach boots", p:"ô-veur-ritch boutss", var:"bell boots (US)"},
           es:{m:"las campanas"}, it:{m:"le campane"},
           de:{m:"die Hufglocken", p:"houf-glo-keune"}, ja:{m:"ベルブーツ", p:"beru būtsu"} }, // ??
    def:{ fr:"Elles protègent le talon et le fer antérieur d'un postérieur qui rattrape. Trois langues sur six ont gardé l'image de la cloche.",
          en:"They protect the heel and front shoe from a hind foot catching up. Three of the six languages kept the bell image.",
          es:"Protegen el talón y la herradura anterior de un posterior que alcanza. Tres lenguas de seis conservaron la imagen de la campana.",
          it:"Proteggono il tallone e il ferro anteriore da un posteriore che raggiunge. Tre lingue su sei hanno tenuto l'immagine della campana.",
          de:"Schützen Ballen und Vordereisen vor einem greifenden Hinterhuf. Drei von sechs Sprachen behielten das Bild der Glocke.",
          ja:"前肢の踵と蹄鉄を、追突する後肢から守るカバー。六言語のうち三つが「鐘」のイメージを残しています。" } },

  { ref:"bandes", lecon:4, coll:"protections",
    mots:{ fr:{m:"les bandes de travail"}, en:{m:"the exercise bandages", p:"èk-seur-saïz ban-di-djiz"},
           es:{m:"las vendas"}, it:{m:"le fasce"},
           de:{m:"die Bandagen", p:"ban-da-gueune"}, ja:{m:"バンテージ", p:"bantēji"} },
    def:{ fr:"Posées sur une sous-bande, elles soutiennent le tendon. Mal serrées, elles font plus de mal que pas de bandes du tout.",
          en:"Put over a pad, they support the tendon. Badly wrapped, they do more harm than none at all.",
          es:"Puestas sobre una venda de base, sostienen el tendón. Mal apretadas, hacen más daño que ninguna venda.",
          it:"Poste su un sottobenda, sostengono il tendine. Strette male, fanno più male che niente bende.",
          de:"Über einer Unterlage gewickelt stützen sie die Sehne. Falsch gewickelt schaden sie mehr als gar keine Bandagen.",
          ja:"下巻きの上から巻いて、腱を支えます。締め方を誤れば、巻かないよりも害になります。" } },

  { ref:"bonnet", lecon:4, coll:"protections",
    mots:{ fr:{m:"le bonnet anti-mouches"}, en:{m:"the fly veil", p:"flaï véïl", var:"ear bonnet"},
           es:{m:"la orejera"}, it:{m:"la cuffia"},
           de:{m:"die Ohrenhaube", p:"ô-reune-haou-be", var:"die Fliegenhaube"}, ja:{m:"イヤーネット", p:"iyā netto"} },
    def:{ fr:"Contre les mouches, et contre le bruit en concours. En dressage international, il est autorisé et souvent assorti au tapis.",
          en:"Against flies, and against noise at shows. Allowed in international dressage, and often matched to the saddle pad.",
          es:"Contra las moscas, y contra el ruido en concurso. En doma internacional está autorizado y a menudo a juego con el sudadero.",
          it:"Contro le mosche, e contro il rumore in concorso. In dressage internazionale è autorizzato e spesso abbinato al sottosella.",
          de:"Gegen Fliegen — und gegen Lärm auf dem Turnier. In der internationalen Dressur erlaubt und oft passend zur Schabracke.",
          ja:"虫よけであり、競技会では音よけにも。国際馬場馬術でも認められていて、ゼッケンとおそろいにすることも多いです。" } },

  { ref:"cuir", lecon:4, coll:"protections",
    mots:{ fr:{m:"le cuir"}, en:{m:"the leather", p:"lè-zeur"},
           es:{m:"el cuero"}, it:{m:"il cuoio"},
           de:{m:"das Leder", p:"lé-deur"}, ja:{m:"革", p:"kawa"} },
    def:{ fr:"Un cuir qui sèche craque, un cuir trop gras s'étire. On nettoie après chaque séance, on nourrit une fois par mois.",
          en:"Leather that dries cracks, leather that is over-oiled stretches. Clean after every ride, feed it once a month.",
          es:"Un cuero que se seca se agrieta, un cuero demasiado graso se estira. Se limpia tras cada sesión, se nutre una vez al mes.",
          it:"Un cuoio che secca si crepa, un cuoio troppo grasso si stira. Si pulisce dopo ogni seduta, si nutre una volta al mese.",
          de:"Trockenes Leder reißt, überfettetes Leder leiert aus. Nach jeder Einheit reinigen, einmal im Monat einfetten.",
          ja:"乾いた革はひび割れ、油の多すぎる革は伸びてしまいます。手入れは毎回、油入れは月に一度。" } },

  { ref:"savon", lecon:4, coll:"protections",
    mots:{ fr:{m:"le savon glycériné"}, en:{m:"the saddle soap", p:"sa-deul sôpe"},
           es:{m:"el jabón glicerinado"}, it:{m:"il sapone per cuoio"},
           de:{m:"die Sattelseife", p:"za-teul-zaï-fe"}, ja:{m:"サドルソープ", p:"sadoru sōpu"} },
    def:{ fr:"Le savon du cuir, appliqué avec une éponge à peine humide. Jamais sur le mors, jamais dans la bouche du cheval.",
          en:"Soap for leather, applied with a barely damp sponge. Never on the bit, never near the mouth.",
          es:"El jabón del cuero, aplicado con una esponja apenas húmeda. Jamás en el bocado, jamás en la boca del caballo.",
          it:"Il sapone del cuoio, applicato con una spugna appena umida. Mai sull'imboccatura, mai nella bocca del cavallo.",
          de:"Die Sattelseife, mit kaum feuchtem Schwamm aufgetragen. Nie ans Gebiss, nie ins Pferdemaul.",
          ja:"革用の石けん。かすかに湿らせたスポンジで塗ります。ハミには決して — 馬の口に入るものだからです。" } },

  { ref:"seller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"seller"}, en:{m:"to tack up", p:"tak eup", var:"to saddle up"},
           es:{m:"ensillar"}, it:{m:"sellare"},
           de:{m:"satteln", p:"za-teuln"}, ja:{m:"馬装する", p:"basō suru"} },
    def:{ fr:"⚠️ L'anglais courant est **to tack up**, qui couvre selle et filet d'un seul mot. Le japonais fait pareil : 馬装する, « équiper le cheval ».",
          en:"The everyday English is « to tack up », covering saddle and bridle at once. Japanese does the same with 馬装する.",
          es:"⚠️ El inglés corriente es **to tack up**, que cubre silla y cabezada con una sola palabra. El japonés hace igual: 馬装する, « equipar al caballo ».",
          it:"⚠️ L'inglese corrente è **to tack up**, che copre sella e testiera con una sola parola. Il giapponese fa lo stesso: 馬装する, « equipaggiare il cavallo ».",
          de:"⚠️ Das gängige Englisch ist **to tack up** — Sattel und Zaum in einem Wort. Das Japanische macht es genauso: 馬装する.",
          ja:"⚠️ ふだんの英語は **to tack up**。鞍も頭絡も一語でまかないます。日本語も同じ発想です — 馬装する。" } },

  { ref:"brider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"brider"}, en:{m:"to put the bridle on", p:"poutt ze braï-deul onn"},
           es:{m:"embridar"}, it:{m:"mettere la testiera"},
           de:{m:"auftrensen", p:"aouf-trèn-zeune"}, ja:{m:"頭絡をつける", p:"tōraku o tsukeru"} },
    def:{ fr:"Le mors se présente à plat sur la langue, le pouce dans le coin des lèvres. L'allemand a un verbe d'un seul mot, auftrensen ; l'anglais non.",
          en:"The bit is offered flat on the tongue, thumb at the corner of the lips. German has a single verb, auftrensen; English does not.",
          es:"El bocado se presenta plano sobre la lengua, el pulgar en la comisura de los labios. El alemán tiene un verbo de una sola palabra, auftrensen; el inglés no.",
          it:"L'imboccatura si presenta piatta sulla lingua, il pollice nell'angolo delle labbra. Il tedesco ha un verbo di una sola parola, auftrensen; l'inglese no.",
          de:"Das Gebiss kommt flach auf die Zunge, der Daumen in den Maulwinkel. Das Deutsche hat dafür ein einziges Verb: auftrensen. Das Englische nicht.",
          ja:"ハミは舌の上に平らに差し出し、親指は唇の合わせ目へ。ドイツ語には一語の動詞があります — auftrensen。英語にはありません。" } },

  { ref:"sangler", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"resangler"}, en:{m:"to tighten the girth", p:"taï-teune ze gueurss"},
           es:{m:"apretar la cincha"}, it:{m:"stringere il sottopancia"},
           de:{m:"nachgurten", p:"narh-gour-teune"}, ja:{m:"腹帯を締める", p:"haraobi o shimeru"} },
    def:{ fr:"À faire à pied avant de monter, puis à cheval après quelques minutes. L'allemand a encore un verbe exprès pour le deuxième temps : nachgurten.",
          en:"Done on the ground before mounting, then again from the saddle a few minutes later. German has a verb just for that second time.",
          es:"Se hace a pie antes de montar, y de nuevo a caballo tras unos minutos. El alemán tiene otro verbo expreso para el segundo tiempo: nachgurten.",
          it:"Si fa a piedi prima di montare, poi a cavallo dopo qualche minuto. Il tedesco ha ancora un verbo apposta per il secondo tempo: nachgurten.",
          de:"Erst am Boden vor dem Aufsteigen, dann im Sattel nach ein paar Minuten. Fürs zweite Mal hat das Deutsche wieder ein eigenes Verb: nachgurten.",
          ja:"乗る前に地上で締め、数分後に馬上でもう一度。二度目の締め直しに、ドイツ語はまた専用の動詞を持っています — nachgurten。" } },

  { ref:"regler-etrivieres", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"régler ses étrivières"}, en:{m:"to adjust the stirrups", p:"a-djeust ze sti-reups"},
           es:{m:"ajustar los estribos"}, it:{m:"regolare le staffe"},
           de:{m:"die Bügel verschnallen", p:"bu-gueul fèr-chna-leune"}, ja:{m:"鐙の長さを調節する", p:"abumi no nagasa o chōsetsu suru"} },
    def:{ fr:"Repère universel : le bas de l'étrier arrive au niveau de la cheville, bras tendu le long de la sangle. Un trou plus court à l'obstacle.",
          en:"Universal check: with your arm along the girth, the stirrup reaches your ankle. One hole shorter for jumping.",
          es:"Referencia universal: el fondo del estribo llega al tobillo, con el brazo tendido a lo largo de la ación. Un agujero más corto para saltar.",
          it:"Riferimento universale: il fondo della staffa arriva alla caviglia, braccio teso lungo lo staffile. Un buco più corto per l'ostacolo.",
          de:"Universelle Faustregel: Der Bügel reicht bis zum Knöchel, den Arm am Riemen ausgestreckt. Zum Springen ein Loch kürzer.",
          ja:"世界共通の目安：腕を革に沿って伸ばし、鐙の底がくるぶしに届く長さ。障害では穴ひとつ短く。" } },

  { ref:"desseller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"desseller"}, en:{m:"to untack", p:"eune-tak"},
           es:{m:"desensillar"}, it:{m:"dissellare"},
           de:{m:"absatteln", p:"ap-za-teuln"}, ja:{m:"鞍を外す", p:"kura o hazusu"} },
    def:{ fr:"On desangle avant de retirer la selle, et on laisse le dos revenir seul : ne jamais frictionner un dos qui sort de la selle.",
          en:"Loosen the girth before lifting the saddle, and let the back recover on its own — never rub a just-unsaddled back.",
          es:"Se descincha antes de retirar la silla, y se deja que el dorso vuelva solo: jamás friccionar un dorso que sale de la silla.",
          it:"Si scinghia prima di togliere la sella, e si lascia che il dorso torni da solo: mai frizionare un dorso che esce dalla sella.",
          de:"Erst abgurten, dann den Sattel abnehmen — und den Rücken von selbst zurückkommen lassen: Nie einen frisch entsattelten Rücken frottieren.",
          ja:"腹帯をゆるめてから鞍を下ろし、背中は自然に戻るのを待ちます。鞍を下ろした直後の背中を、こすってはいけません。" } },

  { ref:"debrider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"débrider"}, en:{m:"to take the bridle off", p:"téïk ze braï-deul off"},
           es:{m:"desembridar"}, it:{m:"togliere la testiera"},
           de:{m:"abtrensen", p:"ap-trèn-zeune"}, ja:{m:"頭絡を外す", p:"tōraku o hazusu"} },
    def:{ fr:"Le licol se passe autour de l'encolure **avant** de retirer le filet : c'est le geste qui évite qu'un cheval part libre dans la cour.",
          en:"Put the headcollar round the neck before the bridle comes off: the habit that stops a horse walking off loose.",
          es:"La cabezada de cuadra se pasa alrededor del cuello **antes** de retirar el filete: es el gesto que evita que un caballo salga libre por el patio.",
          it:"La capezza si passa attorno all'incollatura **prima** di togliere la testiera: è il gesto che evita che un cavallo parta libero nel cortile.",
          de:"Das Halfter kommt **vor** dem Abtrensen um den Hals: Dieser Handgriff verhindert, dass ein Pferd frei über den Hof zieht.",
          ja:"頭絡を外す**前に**、無口を首に回しておくこと。この一手間が、馬が庭を勝手に歩き回る事態を防ぎます。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"ou-selle", lecon:1,
      fr:"Où est ma selle ?",
      en:"Where's my saddle ?",
      es:"¿ Dónde está mi silla ?",
      it:"Dov'è la mia sella ?",
      de:"Wo ist mein Sattel ?",
      ja:"私 の 鞍 は どこ です か ?" },
    { ref:"sangle-serree", lecon:1,
      fr:"Ma sangle n'est pas assez serrée.",
      en:"My girth isn't tight enough.",
      es:"Mi cincha no está bastante apretada.",
      it:"Il sottopancia non è abbastanza stretto.",
      de:"Mein Sattelgurt ist nicht fest genug.",
      ja:"腹帯 が 緩い です 。" },
    { ref:"etrivieres-trop-longues", lecon:1,
      fr:"Mes étrivières sont trop longues, tu peux m'aider ?",
      en:"My stirrups are too long — can you give me a hand ?",
      es:"Tengo los estribos demasiado largos, ¿ me ayudas ?",
      it:"Ho le staffe troppo lunghe, mi aiuti ?",
      de:"Meine Bügel sind zu lang, kannst du mir helfen ?",
      ja:"鐙 が 長すぎ ます 、 手伝って もらえ ます か ?" },
    { ref:"quel-mors", lecon:2,
      fr:"Il monte avec quel mors ?",
      en:"What bit does he go in ?",
      es:"¿ Con qué bocado se monta ?",
      it:"Con quale imboccatura si monta ?",
      de:"Mit welchem Gebiss wird er geritten ?",
      ja:"どの ハミ を 使い ます か ?" },
    { ref:"besoin-guetres", lecon:4,
      fr:"Il a besoin de guêtres ?",
      en:"Does he need boots ?",
      es:"¿ Necesita protecciones ?",
      it:"Ha bisogno dei paracolpi ?",
      de:"Braucht er Gamaschen ?",
      ja:"プロテクター は 必要 です か ?" },
    { ref:"emprunter-bombe", lecon:3,
      fr:"Je peux emprunter une bombe ?",
      en:"Could I borrow a hat ?",
      es:"¿ Me puedes prestar un casco ?",
      it:"Posso prendere in prestito un caschetto ?",
      de:"Kann ich einen Reithelm leihen ?",
      ja:"ヘルメット を 貸して もらえ ます か ?" },
    { ref:"pas-eperons", lecon:3,
      fr:"Je ne mets pas d'éperons, je préfère la cravache.",
      en:"I won't wear spurs, I'd rather take a whip.",
      es:"No me pongo espuelas, prefiero la fusta.",
      it:"Non metto gli speroni, preferisco il frustino.",
      de:"Ich reite ohne Sporen, ich nehme lieber eine Gerte.",
      ja:"拍車 は つけ ませ ん 、 鞭 の 方 が いい です 。" },
    { ref:"ou-ranger", lecon:4,
      fr:"Je desselle et je range où ?",
      en:"I'll untack — where does everything go ?",
      es:"Desensillo, ¿ dónde lo guardo todo ?",
      it:"Dissello, dove metto tutto ?",
      de:"Ich sattle ab — wohin kommt alles ?",
      ja:"馬装 を 解き ます 、 どこ に 片付け ます か ?" }
  ]
};
