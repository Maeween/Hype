/* hype-lingo-lex-walsall.js — Hype Lingo · Chapitre « Le matériel »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-materiel.js, leçon 1
   — AUCUN ref, AUCUNE définition modifiée. Seul le nom de la clé de
   chapitre change : `materiel` devient `walsall`.

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE.

   UNE SEULE LEÇON, CONSERVÉE À L'IDENTIQUE :
     · leçon 1 — la selle (14 concepts)

   Les leçons 2 (orpheline, le filet) et 3+4 (Vejer) sont déplacées
   séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.walsall = {
  ref: "walsall",
  titre: { fr:"Le matériel", en:"The tack", es:"El equipo", it:"L'attrezzatura", de:"Die Ausrüstung", ja:"馬具" },
  lecons: 1,

  concepts: [

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

  /* ================================================================
     LES QUATRE PARTIES DE LA SELLE — ajoutees le 15/08/2026,
     session 214, sur question puis decision de Blandine : « et les
     parties de la selle genre pommeau troussequin quartier
     etriviere ? » → choix A : on complete le lexique.
     Le chapitre portait `selle`, `sangle`, `etriers`, `etrivieres`,
     `pommeau` — et rien d'autre. Une sellerie ou l'on ne sait pas
     nommer ce qu'on achete n'apprend pas grand-chose.
     ⚠️ Le `def` de `pommeau` annoncait DEJA le troussequin dans les
     six langues : les traductions ci-dessous en sont reprises a
     l'identique (cantle · borren trasero · paletta · Hinterzwiesel ·
     後橋). NE PAS les diverger.
     ================================================================ */

  { ref:"troussequin", lecon:1, coll:"selle",
    mots:{ fr:{m:"le troussequin"}, en:{m:"the cantle", p:"kan-teul"},
           es:{m:"el borrén trasero", var:"la trusa"}, it:{m:"la paletta"},
           de:{m:"der Hinterzwiesel", p:"hin-teur-tsvi-zeul"}, ja:{m:"後橋", p:"kōkyō"} },
    def:{ fr:"L'arrière relevé de la selle, dans ton dos. C'est lui qui te tient quand le cheval accélère — et c'est sa hauteur qui change tout entre une selle de dressage et une selle d'obstacle.",
          en:"The raised back of the saddle, behind you. It holds you when the horse takes off — and its height is what separates a dressage saddle from a jumping one.",
          es:"La parte trasera elevada de la silla, a tu espalda. Te sujeta cuando el caballo acelera, y su altura es lo que distingue una silla de doma de una de salto.",
          it:"La parte posteriore rialzata della sella, dietro di te. Ti trattiene quando il cavallo parte — e la sua altezza è ciò che distingue una sella da dressage da una da salto.",
          de:"Der erhöhte hintere Teil des Sattels, in deinem Rücken. Er hält dich, wenn das Pferd anzieht — und seine Höhe unterscheidet Dressur- von Springsattel.",
          ja:"鞍の後ろの盛り上がり。馬が急に出たとき体を支えてくれます。この高さが馬場鞍と障害鞍の一番の違いです。" } },

  { ref:"quartier", lecon:1, coll:"selle",
    mots:{ fr:{m:"le quartier"}, en:{m:"the saddle flap", p:"sa-deul flap"},
           es:{m:"el faldón"}, it:{m:"il quartiere"},
           de:{m:"das Sattelblatt", p:"za-teul-blatt"}, ja:{m:"サドルフラップ", p:"sadoru furappu"} }, // ?? ja
    def:{ fr:"Le grand pan de cuir sous ta jambe. Avancé et court pour l'obstacle, droit et long pour le dressage : c'est lui qui décide où ton genou tombe.",
          en:"The large panel of leather under your leg. Forward-cut and short for jumping, straight and long for dressage: it decides where your knee sits.",
          es:"El gran faldón de cuero bajo tu pierna. Adelantado y corto para el salto, recto y largo para la doma: decide dónde cae tu rodilla.",
          it:"Il grande lembo di cuoio sotto la gamba. Avanzato e corto per il salto, dritto e lungo per il dressage: decide dove cade il ginocchio.",
          de:"Das große Lederblatt unter deinem Bein. Vorgeschnitten und kurz zum Springen, gerade und lang für die Dressur: es bestimmt, wo dein Knie liegt.",
          ja:"脚の下にある大きな革の部分。障害用は前傾で短く、馬場用はまっすぐで長い。膝の位置はここで決まります。" } },

  { ref:"siege", lecon:1, coll:"selle",
    mots:{ fr:{m:"le siège"}, en:{m:"the seat", p:"sitt"},
           es:{m:"el asiento"}, it:{m:"il seggio"}, // ?? it
           de:{m:"der Sitz", p:"zitts"}, ja:{m:"シート", p:"shīto"} }, // ?? ja
    def:{ fr:"L'endroit où tu t'assois, entre le pommeau et le troussequin. Creux, il te place et te tient ; plat, il te laisse bouger. La taille d'une selle se mesure d'ailleurs par son siège, en pouces.",
          en:"Where you sit, between pommel and cantle. Deep, it places and holds you; flat, it lets you move. A saddle's size is measured by its seat, in inches.",
          es:"Donde te sientas, entre la perilla y el borrén trasero. Profundo, te coloca y te sujeta; plano, te deja moverte. La talla de una silla se mide por su asiento, en pulgadas.",
          it:"Dove ti siedi, tra pomello e paletta. Profondo, ti posiziona e ti trattiene; piatto, ti lascia muovere. La misura di una sella si prende dal seggio, in pollici.",
          de:"Wo du sitzt, zwischen Sattelkopf und Hinterzwiesel. Tief setzt er dich fest, flach lässt er dir Bewegung. Die Größe eines Sattels wird am Sitz gemessen, in Zoll.",
          ja:"前橋と後橋の間、実際に座る部分。深いと座りが決まり、浅いと動きやすい。鞍のサイズはこの座席の長さ（インチ）で表します。" } },

  { ref:"arcon", lecon:1, coll:"selle",
    mots:{ fr:{m:"l'arçon"}, en:{m:"the tree", p:"trii"},
           es:{m:"el fuste"}, it:{m:"il fusto", var:"l'incastellatura"}, // ?? it
           de:{m:"der Sattelbaum", p:"za-teul-baoum"}, ja:{m:"ツリー", p:"tsurī"} }, // ?? ja
    def:{ fr:"⚠️ **Le squelette de la selle, celui qu'on ne voit jamais** — et le mot anglais est **the tree**, littéralement « l'arbre ». Un arçon trop étroit blesse le garrot : c'est la première chose qu'un sellier regarde. L'allemand dit la même image : *Sattelbaum*.",
          en:"The frame inside the saddle, never seen from outside. A tree that's too narrow pinches the withers — the first thing a saddler checks. French and German say “tree” too: *arçon*, *Sattelbaum*.",
          es:"El esqueleto de la silla, que nunca se ve. Un fuste demasiado estrecho lastima la cruz: es lo primero que mira un guarnicionero. En inglés se dice *the tree*, el árbol.",
          it:"Lo scheletro della sella, che non si vede mai. Un fusto troppo stretto ferisce il garrese: è la prima cosa che guarda un sellaio. In inglese si dice *the tree*, l'albero.",
          de:"Das Gerüst im Sattel, von außen nie zu sehen. Ein zu enger Sattelbaum drückt den Widerrist — das Erste, was ein Sattler prüft. Englisch heißt es *the tree*.",
          ja:"鞍の内部の骨組み。外からは見えません。狭すぎると鬐甲を痛めます。装鞍師が最初に確認する場所です。英語では the tree（木）と言います。" } },

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
      fr:"Mes étrivières sont trop longues.",
      en:"My stirrups are too long.",
      es:"Mis aciones son demasiado largas.",
      it:"Le staffile sono troppo lunghe.",
      de:"Meine Steigbügel sind zu lang.",
      ja:"鐙革 が 長 すぎ ます。" },
  ],

  dialogue: {
    ville: "walsall", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · j'entre dans la sellerie ---- */
      { ref:"d-reparez-selles", temps:1, dit:"joueuse", mots:["selle"],
        fr:"Est-ce que vous réparez les selles ?",
        en:"Do you repair saddles?",
        es:"¿Reparan sillas de montar?",
        it:"Riparate le selle?",
        de:"Reparieren Sie Sättel?",
        ja:"鞍 の 修理 は し て い ます か ?" },

      { ref:"d-sangle-usee", temps:1, dit:"joueuse", mots:["sangle"],
        fr:"Ma sangle est usée, il m'en faut une neuve.",
        en:"My girth is worn out, I need a new one.",
        es:"Mi cincha está gastada, necesito una nueva.",
        it:"Il mio sottopancia è consumato, me ne serve uno nuovo.",
        de:"Mein Sattelgurt ist durchgescheuert, ich brauche einen neuen.",
        ja:"腹帯 が すり切れ て い ます。 新しい もの が 必要 です。" },

      { ref:"d-r-quelle-taille-sangle", temps:1, dit:"club", mots:["sangle"],
        fr:"Quelle taille de sangle ?",
        en:"What length of girth?",
        es:"¿Qué talla de cincha?",
        it:"Che misura di sottopancia?",
        de:"Welche Gurtlänge?",
        ja:"腹帯 の サイズ は ?" },

      { ref:"d-mesurer-ancienne", temps:1, dit:"joueuse", mots:[],
        fr:"Je ne sais pas, est-ce que je peux mesurer l'ancienne ?",
        en:"I don't know — can I measure the old one?",
        es:"No lo sé, ¿puedo medir la antigua?",
        it:"Non lo so, posso misurare quello vecchio?",
        de:"Ich weiß es nicht — kann ich den alten messen?",
        ja:"わかり ませ ん。 古い もの を 測っ て も いい です か ?" },

      /* ---- temps 2 · la selle ---- */
      { ref:"d-selle-mixte-occasion", temps:2, dit:"joueuse", mots:["selle-mixte"],
        fr:"Je cherche une selle mixte d'occasion.",
        en:"I'm looking for a second-hand general purpose saddle.",
        es:"Busco una silla mixta de segunda mano.",
        it:"Cerco una sella mista usata.",
        de:"Ich suche einen gebrauchten Vielseitigkeitssattel.",
        ja:"中古 の 総合鞍 を 探し て い ます。" },

      { ref:"d-essayer-sur-cheval", temps:2, dit:"joueuse", mots:["selle"],
        fr:"Est-ce que je peux l'essayer sur mon cheval ?",
        en:"Can I try it on my horse?",
        es:"¿Puedo probarla en mi caballo?",
        it:"Posso provarla sul mio cavallo?",
        de:"Kann ich ihn auf meinem Pferd anprobieren?",
        ja:"自分 の 馬 に 乗せ て 試し て も いい です か ?" },

      { ref:"d-r-essai-gratuit", temps:2, dit:"club", mots:["selle"],
        fr:"On peut la faire venir, l'essai est gratuit.",
        en:"We can order it in — trying it costs nothing.",
        es:"Podemos pedirla, la prueba es gratuita.",
        it:"Possiamo farla arrivare, la prova è gratuita.",
        de:"Wir können ihn kommen lassen, das Anprobieren ist kostenlos.",
        ja:"取り寄せ でき ます。 試着 は 無料 です。" },

      /* ---- temps 3 · les parties de la selle (lexique complété le 15/08) ---- */
      { ref:"d-arcon-dos-large", temps:3, dit:"joueuse", mots:["arcon"],
        fr:"Est-ce que l'arçon convient à un cheval au dos large ?",
        en:"Will the tree fit a wide-backed horse?",
        es:"¿El fuste vale para un caballo de dorso ancho?",
        it:"Il fusto va bene per un cavallo di dorso largo?",
        de:"Passt der Sattelbaum auf ein Pferd mit breitem Rücken?",
        ja:"この ツリー は 背中 の 広い 馬 に 合い ます か ?" },

      { ref:"d-r-siege-quartier", temps:3, dit:"club", mots:["siege","quartier"],
        fr:"Le siège est un peu creux, et le quartier assez avancé.",
        en:"The seat is fairly deep, and the flap quite forward-cut.",
        es:"El asiento es algo profundo y el faldón bastante adelantado.",
        it:"Il seggio è piuttosto profondo e il quartiere abbastanza avanzato.",
        de:"Der Sitz ist recht tief und das Sattelblatt ziemlich vorgeschnitten.",
        ja:"シート は やや 深く、 サドルフラップ は かなり 前傾 です。" },

      { ref:"d-troussequin-haut", temps:3, dit:"joueuse", mots:["troussequin"],
        fr:"Est-ce que le troussequin n'est pas trop haut ?",
        en:"Isn't the cantle a bit too high?",
        es:"¿No es un poco alto el borrén trasero?",
        it:"La paletta non è un po' troppo alta?",
        de:"Ist der Hinterzwiesel nicht ein bisschen zu hoch?",
        ja:"後橋 が 少し 高 すぎ ませ ん か ?" },

      { ref:"d-etrivieres-longues", temps:3, dit:"joueuse", mots:["etrivieres"],
        fr:"Mes étrivières sont trop longues.",
        en:"My stirrup leathers are too long.",
        es:"Mis aciones son demasiado largas.",
        it:"I miei staffili sono troppo lunghi.",
        de:"Meine Steigbügelriemen sind zu lang.",
        ja:"鐙革 が 長 すぎ ます。" },

      /* ---- temps 4 · le filet et le mors ---- */
      { ref:"d-muserolle-souple", temps:4, dit:"joueuse", mots:["muserolle"],
        fr:"Il me faudrait une muserolle plus souple.",
        en:"I'd need a softer noseband.",
        es:"Necesitaría una muserola más blanda.",
        it:"Mi servirebbe una capezzina più morbida.",
        de:"Ich bräuchte einen weicheren Nasenriemen.",
        ja:"もっと 柔らかい 鼻革 が ほしい です。" },

      { ref:"d-quel-mors-jeune", temps:4, dit:"joueuse", mots:["mors"],
        fr:"Quel mors est-ce que vous conseillez pour un jeune cheval ?",
        en:"Which bit would you recommend for a young horse?",
        es:"¿Qué bocado recomienda para un caballo joven?",
        it:"Quale imboccatura consiglia per un cavallo giovane?",
        de:"Welches Gebiss empfehlen Sie für ein junges Pferd?",
        ja:"若い 馬 に は どの ハミ が いい です か ?" },

      { ref:"d-r-filet-simple", temps:4, dit:"club", mots:["mors","filet"],
        fr:"Un mors de filet simple, à double brisure.",
        en:"A plain snaffle, French-link.",
        es:"Un filete sencillo, de doble articulación.",
        it:"Un filetto semplice, a doppio snodo.",
        de:"Eine einfache Wassertrense, doppelt gebrochen.",
        ja:"二重 関節 の シンプル な 水勒 ハミ です。" },

      { ref:"d-renes-cuir-tresse", temps:4, dit:"joueuse", mots:["renes","cuir"],
        fr:"Est-ce que vous avez des rênes en cuir tressé ?",
        en:"Have you got plaited leather reins?",
        varEn:"Have you got braided leather reins?",
        es:"¿Tienen riendas de cuero trenzado?",
        it:"Avete redini in cuoio intrecciato?",
        de:"Haben Sie geflochtene Lederzügel?",
        ja:"編ん だ 革 の 手綱 は あり ます か ?" },

      /* ---- temps 5 · la protection ---- */
      { ref:"d-guetres-ou-cloches", temps:5, dit:"joueuse", mots:["guetres","cloches"],
        fr:"Est-ce qu'il me faut des guêtres ou des cloches ?",
        en:"Do I need brushing boots or over-reach boots?",
        varEn:"Do I need boots or bell boots?",
        es:"¿Necesito protecciones o campanas?",
        it:"Mi servono paracolpi o campane?",
        de:"Brauche ich Gamaschen oder Hufglocken?",
        ja:"プロテクター が 必要 です か、 ベルブーツ です か ?" },

      { ref:"d-r-cloches-fers", temps:5, dit:"club", mots:["cloches"],
        fr:"Les cloches, c'est pour qu'il ne s'arrache pas ses fers.",
        en:"Over-reach boots stop him pulling his shoes off.",
        es:"Las campanas evitan que se arranque las herraduras.",
        it:"Le campane evitano che si strappi i ferri.",
        de:"Die Hufglocken verhindern, dass er sich die Eisen abtritt.",
        ja:"ベルブーツ は 蹄鉄 を 自分 で 外し て しまう の を 防ぎ ます。" },

      { ref:"d-bandes-travail", temps:5, dit:"joueuse", mots:["bandes"],
        fr:"Est-ce que vous vendez des bandes de travail ?",
        en:"Do you sell exercise bandages?",
        es:"¿Venden vendas de trabajo?",
        it:"Vendete fasce da lavoro?",
        de:"Verkaufen Sie Arbeitsbandagen?",
        ja:"運動用 の バンテージ は 売っ て い ます か ?" },

      /* ---- temps 6 · payer et repartir ---- */
      { ref:"d-combien-reparation", temps:6, dit:"joueuse", mots:[],
        fr:"Combien coûte la réparation ?",
        en:"How much is the repair?",
        es:"¿Cuánto cuesta la reparación?",
        it:"Quanto costa la riparazione?",
        de:"Was kostet die Reparatur?",
        ja:"修理 は いくら です か ?" },

      { ref:"d-faire-livrer", temps:6, dit:"joueuse", mots:[],
        fr:"Est-ce que je peux le faire livrer ?",
        en:"Can you have it delivered?",
        es:"¿Me lo pueden enviar?",
        it:"Potete farlo consegnare?",
        de:"Können Sie es liefern lassen?",
        ja:"配送 し て もらえ ます か ?" }
    ]
  }
};
