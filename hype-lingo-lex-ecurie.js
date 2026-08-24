/* hype-lingo-lex-ecurie.js — Hype Lingo · Chapitre 1 · « L'écurie »
   ==================================================================
   40 CONCEPTS, QUATRE LEÇONS DE DIX.

   UN CONCEPT = UN OBJET DU MONDE ÉQUESTRE avec ses 6 langues côte à côte.
   Aucune langue source : le moteur lit la langue de l'interface et propose
   les 5 autres. Un cavalier japonais apprend le français avec ce fichier,
   sans une ligne de plus.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA, les trois
          langues où un francophone se trompe. ES et IT se lisent comme
          ils s'écrivent : une phonétique n'aiderait personne.
     var  variante régionale (GB/US, Espagne/Amérique…)
     def  définition — sert au mode Lexique, au verso de la carte et
          d'indice dans les jeux
     v    true si c'est un verbe (le moteur les traite à part)

   ⚠️ RELECTURE NATIVE OBLIGATOIRE AVANT PUBLICATION
   Le vocabulaire d'écurie n'est pas du vocabulaire courant. Les entrées
   marquées // ?? sont celles dont je ne suis pas sûr : à faire valider par
   un cavalier natif. Le japonais équestre est le plus incertain du lot —
   plusieurs termes coexistent (emprunt à l'anglais contre terme
   traditionnel) et l'usage réel en écurie m'échappe.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

/* 🟥🟥 19/08/2026 — CHAPITRE RAMENÉ À 37 CONCEPTS, DÉCISION DE BLANDINE.
   Newmarket ne lisait que sa leçon 1 : 10 concepts vus sur 42, trente-deux
   dormants. Elle lit désormais SES QUATRE LEÇONS — 10 / 11 / 8 / 8.

   CINQ CONCEPTS SONT PARTIS À BARCELONE (étape 23, « Voyager avec son
   cheval ») : `longe`, `attacher`, `couverture` (ex-L4), `filet-foin` et
   `ration` (ex-L3). Ils vivent maintenant dans
   `hype-lingo-lex-barcelone.js` avec leurs `ref` d'origine.
   ⚠️ NE PAS LES RECRÉER ICI.

   🟢 QUATRE CONCEPTS RESTENT VOLONTAIREMENT ICI ET SONT REPRIS À
   BARCELONE EN RAPPEL : `eau`, `seau`, `foin`, `licol`. Newmarket est
   l'étape 4, Barcelone la 23 — sans eux, le joueur aurait fait tout le
   chapitre de l'écurie sans jamais apprendre « l'eau » ni « le seau ».
   ⚠️ LEUR PRÉSENCE DANS DEUX FICHIERS N'EST PAS UN DOUBLON : `MAITRISE`
   est indexée par `ref`, ils arrivent déjà acquis à Barcelone. Même
   mécanisme que `balade` (La Baule → Maurice) ou `monter-a-cru`
   (Maurice → Taupō). NE PAS TENTER DE DÉDUPLIQUER.

   Quatre phrases du dialogue et une phrase d'exercice ont été réécrites —
   elles citaient les concepts partis. Les 17 autres phrases du dialogue
   sont intactes.
   ================================================================== */

window.HYPE_LINGO_LEX.ecurie = {
  ref: "ecurie",
  chapitre: 1,
  titre: { fr:"L'écurie", en:"The yard", es:"La cuadra", it:"La scuderia", de:"Der Stall", ja:"厩舎" },
  lecons: 4,

  concepts: [

  /* ================= LEÇON 1 · LE LIEU ================= */

  { ref:"box", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le box"}, en:{m:"the stable", p:"sté-beul", var:"loose box (GB) · stall (US)"},
           es:{m:"el box", var:"la cuadra"}, it:{m:"il box"},
           de:{m:"die Box", p:"boks"}, ja:{m:"馬房", p:"babō"},
           ar:{m:"البوكس (حجرة الحصان)"} },
    def:{ fr:"Logement individuel fermé où le cheval dort et mange. Se cure une à deux fois par jour.",
          en:"Individual enclosed space where a horse sleeps and eats. Mucked out once or twice a day.",
          es:"Alojamiento individual cerrado donde el caballo duerme y come. Se limpia una o dos veces al día.",
          it:"Alloggio individuale chiuso dove il cavallo dorme e mangia. Si pulisce una o due volte al giorno.",
          de:"Geschlossene Einzelunterkunft, in der das Pferd schläft und frisst. Wird ein- bis zweimal täglich ausgemistet.",
          ja:"馬が眠り、食べる個別の閉じた住まい。掃除は一日に一、二回。",
          ar:"مسكن فردي مغلق ينام فيه الحصان ويأكل. ينظف مرة أو مرتين في اليوم." } },

  { ref:"sellerie", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la sellerie"}, en:{m:"the tack room", p:"tak-roum"},
           es:{m:"el guadarnés", var:"el cuarto de monturas"}, it:{m:"la selleria"},
           de:{m:"die Sattelkammer", p:"za-teul-ka-meur"}, ja:{m:"馬具庫", p:"bagukō"},
           ar:{m:"غرفة السروج واللوازم"} },
    def:{ fr:"Local où sont rangés selles, filets et matériel. Chaque cheval y a sa place attribuée.",
          en:"Room where saddles, bridles and kit are kept, each horse having its own spot.",
          es:"Local donde se guardan sillas, cabezadas y material. Cada caballo tiene allí su sitio asignado.",
          it:"Locale dove si tengono selle, testiere e materiale. Ogni cavallo vi ha il suo posto assegnato.",
          de:"Raum für Sättel, Trensen und Ausrüstung. Jedes Pferd hat dort seinen festen Platz.",
          ja:"鞍や頭絡、道具をしまう部屋。馬ごとに置き場所が決まっています。",
          ar:"غرفة ترتب فيها السروج واللجم والمعدات. ولكل حصان مكانه المخصص فيها." } },

  { ref:"cour", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la cour"}, en:{m:"the yard", p:"yard"},
           es:{m:"el patio"}, it:{m:"il cortile"},
           de:{m:"der Hof", p:"hof"}, ja:{m:"中庭", p:"nakaniwa"},
           ar:{m:"ساحة الإسطبل"} },
    def:{ fr:"L'espace ouvert autour des écuries, où l'on panse, attache et fait circuler les chevaux. En Grande-Bretagne, « the yard » désigne aussi tout l'établissement.",
          en:"The open space around the stables, where horses are groomed, tied and led about. In Britain, « the yard » also means the whole establishment.",
          es:"El espacio abierto alrededor de las cuadras, donde se limpia, se ata y se hace circular a los caballos. En Gran Bretaña, « the yard » designa también todo el establecimiento.",
          it:"Lo spazio aperto attorno alle scuderie, dove si puliscono, si legano e si fanno circolare i cavalli. In Gran Bretagna « the yard » indica anche tutto lo stabilimento.",
          de:"Der offene Platz um die Ställe, wo geputzt, angebunden und geführt wird. In Großbritannien meint « the yard » auch den ganzen Betrieb.",
          ja:"厩舎のまわりの開けた場所。手入れをし、馬をつなぎ、行き来させるところ。イギリスでは « the yard » が施設全体を指すこともあります。",
          ar:"المكان الذي تنظفين فيه الخيول وتربطينها وتقودينها. وفي بريطانيا تدل الكلمة أيضا على المركز كله." } },

  { ref:"allee", lecon:1, coll:"lieu",
    mots:{ fr:{m:"l'allée"}, en:{m:"the aisle", p:"aïl", var:"the barn aisle (US)"},
           es:{m:"el pasillo"}, it:{m:"il corridoio"},
           de:{m:"der Stallgang", p:"chtal-gang"}, ja:{m:"通路", p:"tsūro"},
           ar:{m:"الممر الرئيسي بين البوكسات"} },
    def:{ fr:"Le couloir central qui dessert les box. On y garde toujours le passage libre.",
          en:"The central corridor serving the boxes. It is always kept clear.",
          es:"El pasillo central que da acceso a los boxes. El paso se mantiene siempre libre.",
          it:"Il corridoio centrale che serve i box. Il passaggio vi si tiene sempre libero.",
          de:"Der Mittelgang, der die Boxen erschließt. Der Durchgang bleibt immer frei.",
          ja:"各馬房へ通じる中央の通路。通り道は常に空けておきます。",
          ar:"الممر الأوسط الذي يخدم الحجرات. ويترك دائما خاليا للمرور." } },

  { ref:"manege", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le manège"}, en:{m:"the indoor school", p:"in-dor-skoul", var:"the indoor arena (US)"},
           es:{m:"el picadero cubierto"}, it:{m:"il maneggio coperto"},
           de:{m:"die Reithalle", p:"raït-ha-le"}, ja:{m:"屋内馬場", p:"okunai bajō"},
           ar:{m:"الميدان المغطى"} },
    def:{ fr:"Piste de travail couverte. Ne pas confondre avec la carrière, qui est en plein air.",
          en:"Covered working arena. Not to be confused with the outdoor school.",
          es:"Pista de trabajo cubierta. No confundir con la pista exterior, al aire libre.",
          it:"Pista di lavoro coperta. Da non confondere con il campo, all'aperto.",
          de:"Überdachte Arbeitsbahn. Nicht mit dem Außenplatz zu verwechseln.",
          ja:"屋根のある調教用の馬場。屋外の馬場と混同しないこと。",
          ar:"ميدان عمل مغطى. لا تخلطي بينه وبين الميدان المكشوف الذي هو في الهواء الطلق." } },

  { ref:"carriere", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la carrière"}, en:{m:"the outdoor school", p:"aoute-dor-skoul", var:"the arena · « the ménage » (courant à l'écrit, mais fautif)"},
           es:{m:"la pista"}, it:{m:"il campo"},
           de:{m:"der Reitplatz", p:"raït-plats"}, ja:{m:"屋外馬場", p:"okugai bajō"},
           ar:{m:"الميدان المكشوف"} },
    def:{ fr:"Piste de travail en plein air, généralement en sable.",
          en:"Open-air working arena, usually sand. Note: British riders often write « ménage » — the French word is « manège », and even that means the indoor one.",
          es:"Pista de trabajo al aire libre, generalmente de arena.",
          it:"Campo di lavoro all'aperto, generalmente in sabbia.",
          de:"Arbeitsplatz im Freien, meist mit Sandboden.",
          ja:"屋外の調教用馬場。ふつうは砂敷きです。",
          ar:"ميدان عمل في الهواء الطلق، ويكون سطحه رمليا في الغالب." } },

  { ref:"pre", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le pré"}, en:{m:"the field", p:"fild", var:"the pasture (US)"},
           es:{m:"el prado"}, it:{m:"il prato"},
           de:{m:"die Weide", p:"vaï-de"}, ja:{m:"放牧地", p:"hōbokuchi"},
           ar:{m:"المرعى"} },
    def:{ fr:"Terrain d'herbe où le cheval vit ou passe la journée.",
          en:"Grass ground where the horse lives or spends the day.",
          es:"Terreno de hierba donde el caballo vive o pasa el día.",
          it:"Terreno d'erba dove il cavallo vive o passa la giornata.",
          de:"Graskoppel, auf der das Pferd lebt oder den Tag verbringt.",
          ja:"馬が暮らし、あるいは日中を過ごす草地。",
          ar:"أرض عشبية يعيش فيها الحصان أو يقضي فيها نهاره." } },

  { ref:"paddock", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le paddock"}, en:{m:"the paddock", p:"pa-dok", var:"the turnout (US)"},
           es:{m:"el paddock", var:"el corral"}, it:{m:"il paddock"},
           de:{m:"das Paddock", p:"pa-dok"}, ja:{m:"パドック", p:"padokku"},
           ar:{m:"البادوك (حوش خارجي مسيج)"} },
    def:{ fr:"Petit enclos, souvent sans herbe, pour sortir un cheval quelques heures. Attention : en concours, « paddock » désigne aussi le rond de détente.",
          en:"Small enclosure, often bare, for turning a horse out for a few hours. Careful: at a show, « the paddock » can also mean the collecting ring.",
          es:"Pequeño cercado, a menudo sin hierba, para sacar al caballo unas horas. Ojo: en concurso, « paddock » designa también la pista de calentamiento.",
          it:"Piccolo recinto, spesso senza erba, per far uscire un cavallo qualche ora. Attenzione: in concorso « paddock » indica anche il campo prova.",
          de:"Kleines Gehege, oft ohne Gras, um ein Pferd für ein paar Stunden hinauszustellen. Achtung: Auf dem Turnier meint « Paddock » auch den Abreiteplatz.",
          ja:"数時間馬を出しておく小さな囲い。草がないことも多い。注意：競技会では「パドック」が練習馬場を指すこともあります。",
          ar:"حظيرة صغيرة، غالبا بلا عشب، لإخراج الحصان بضع ساعات. وفي المسابقات تدل الكلمة أيضا على ميدان الإحماء." } },

  { ref:"tas-fumier", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le tas de fumier"}, en:{m:"the muck heap", p:"meuk-hip", var:"the manure pile (US)"},
           es:{m:"el estercolero"}, it:{m:"la concimaia"}, /* validé : « letamaio » est agricole, « concimaia » est le mot des centres équestres */
           de:{m:"der Misthaufen", p:"mist-hao-fen"}, ja:{m:"堆肥場", p:"taihijō"},
           ar:{m:"كومة الروث والفرشة المستعملة"} },
    def:{ fr:"Où l'on vide les brouettes. Son stockage est réglementé : ce n'est pas un détail administratif.",
          en:"Where the barrows are emptied. Its storage is regulated — not a mere formality.",
          es:"Donde se vacían las carretillas. Su almacenamiento está regulado: no es un detalle administrativo.",
          it:"Dove si svuotano le carriole. Il suo stoccaggio è regolamentato: non è un dettaglio amministrativo.",
          de:"Wohin die Schubkarren entleert werden. Seine Lagerung ist geregelt — kein Verwaltungsdetail.",
          ja:"一輪車の中身を空ける場所。その保管には決まりがあります — 事務的な些事ではありません。",
          ar:"حيث تفرغ عربات اليد. وتخزينه خاضع للتنظيم: وليس ذلك تفصيلا إداريا." } },

  { ref:"grange", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la grange"}, en:{m:"the barn", p:"barn", var:"the hay barn"},
           es:{m:"el granero"}, it:{m:"il fienile"},
           de:{m:"die Scheune", p:"choï-ne"}, ja:{m:"納屋", p:"naya"},
           ar:{m:"مخزن الدريس والقش"} },
    def:{ fr:"Où l'on stocke foin et paille, à l'abri de l'humidité et loin de toute flamme. Attention : en Amérique, « barn » désigne souvent toute l'écurie.",
          en:"Where hay and straw are stored, away from damp and from any flame. Careful: in America, « barn » often means the whole stable yard.",
          es:"Donde se almacenan heno y paja, al abrigo de la humedad y lejos de toda llama. Ojo: en América, « barn » designa a menudo toda la cuadra.",
          it:"Dove si stoccano fieno e paglia, al riparo dall'umidità e lontano da ogni fiamma. Attenzione: in America « barn » indica spesso tutta la scuderia.",
          de:"Wo Heu und Stroh lagern, trocken und fern jeder Flamme. Achtung: In Amerika meint « barn » oft den ganzen Stall.",
          ja:"乾草と藁をしまう場所。湿気を避け、火気から遠ざけて。注意：アメリカでは « barn » が厩舎全体を指すことも多いです。",
          ar:"حيث يخزن الدريس والقش، بعيدا عن الرطوبة وعن أي لهب. وفي أمريكا تدل الكلمة غالبا على الإسطبل كله." } },

  /* ================= LEÇON 2 · LA LITIÈRE ET LES OUTILS ================= */

  { ref:"paille", lecon:2, coll:"litiere",
    mots:{ fr:{m:"la paille"}, en:{m:"straw", p:"stro"},
           es:{m:"la paja"}, it:{m:"la paglia"},
           de:{m:"das Stroh", p:"chtro"}, ja:{m:"藁", p:"wara"},
           ar:{m:"القش"} },
    def:{ fr:"Tige de céréale séchée qui sert de litière. Certains chevaux la mangent : on passe alors aux copeaux.",
          en:"Dried cereal stalks used as bedding. Some horses eat it, and are moved onto shavings instead.",
          es:"Tallo de cereal seco que sirve de cama. Algunos caballos se la comen: entonces se pasa a las virutas.",
          it:"Stelo di cereale essiccato che serve da lettiera. Certi cavalli la mangiano: allora si passa ai trucioli.",
          de:"Getrockneter Getreidehalm als Einstreu. Manche Pferde fressen es — dann wechselt man auf Späne.",
          ja:"乾かした穀物の茎で、寝床に使います。食べてしまう馬もいて、その場合はウッドチップに替えます。",
          ar:"ساق حبوب مجففة تستعمل فرشة. وبعض الخيول تأكلها، فينتقل عندئذ إلى نشارة الخشب." } },

  { ref:"copeaux", lecon:2, coll:"litiere",
    mots:{ fr:{m:"les copeaux"}, en:{m:"shavings", p:"ché-vingz"},
           es:{m:"las virutas"}, it:{m:"i trucioli"},
           de:{m:"die Sägespäne", p:"zé-gue-chpè-ne"}, ja:{m:"おがくず", p:"ogakuzu"},
           ar:{m:"نشارة الخشب"} },
    def:{ fr:"Litière de bois, plus chère que la paille mais moins poussiéreuse : utile aux chevaux qui toussent.",
          en:"Wood bedding, dearer than straw but less dusty — useful for horses with a cough.",
          es:"Cama de madera, más cara que la paja pero menos polvorienta: útil para los caballos que tosen.",
          it:"Lettiera di legno, più cara della paglia ma meno polverosa: utile ai cavalli che tossiscono.",
          de:"Holzeinstreu, teurer als Stroh, aber staubärmer: gut für hustende Pferde.",
          ja:"木の寝床材。藁より高価ですが埃が少なく、咳をする馬に向いています。",
          ar:"فرشة من الخشب، أغلى من القش لكنها أقل غبارا: مفيدة للخيول التي تسعل." } },

  { ref:"litiere", lecon:2, coll:"litiere",
    mots:{ fr:{m:"la litière"}, en:{m:"the bedding", p:"bè-ding"},
           es:{m:"la cama"}, it:{m:"la lettiera"},
           de:{m:"die Einstreu", p:"aïn-chtroï"}, ja:{m:"敷料", p:"shikiryō"},
           ar:{m:"الفرشة"} },
    def:{ fr:"Le terme général, quel que soit le matériau : paille, copeaux, lin, chanvre, granulés de bois.",
          en:"The general word, whatever the material: straw, shavings, flax, hemp, wood pellets.",
          es:"El término general, sea cual sea el material: paja, virutas, lino, cáñamo, pellets de madera.",
          it:"Il termine generale, qualunque sia il materiale: paglia, trucioli, lino, canapa, pellet di legno.",
          de:"Der Oberbegriff, gleich welchen Materials: Stroh, Späne, Leinen, Hanf, Holzpellets.",
          ja:"素材を問わない総称。藁、チップ、亜麻、麻、木質ペレット。",
          ar:"المصطلح العام، مهما كانت المادة: قش، أو نشارة، أو كتان، أو قنب، أو حبيبات خشب." } },

  { ref:"crottin", lecon:2, coll:"litiere",
    mots:{ fr:{m:"le crottin"}, en:{m:"the droppings", p:"dro-pingz"},
           es:{m:"las boñigas", var:"el excremento"}, it:{m:"lo sterco"},
           de:{m:"die Pferdeäpfel", p:"pfèr-de-èp-feul"}, ja:{m:"馬糞", p:"bafun"},
           ar:{m:"روث الخيل"} },
    def:{ fr:"Les excréments eux-mêmes, qu'on retire du box. L'allemand dit joliment « pommes de cheval ».",
          en:"The droppings themselves, picked out of the box. German charmingly calls them « horse apples ».",
          es:"Los excrementos mismos, que se retiran del box. El alemán lo dice con gracia: « manzanas de caballo ».",
          it:"Gli escrementi stessi, che si tolgono dal box. Il tedesco li chiama con grazia « mele di cavallo ».",
          de:"Die Äpfel selbst, die aus der Box entfernt werden — das Deutsche sagt es hübsch: Pferdeäpfel.",
          ja:"馬房から取り除く糞そのもの。ドイツ語は洒落て「馬のりんご」と呼びます。",
          ar:"الفضلات نفسها، تخرج من الحجرة. والألمانية تسميها بلطف «تفاح الحصان»." } },

  { ref:"fumier", lecon:2, coll:"litiere",
    mots:{ fr:{m:"le fumier"}, en:{m:"the manure", p:"meu-nyour", var:"the muck (GB)"},
           es:{m:"el estiércol"}, it:{m:"il letame"},
           de:{m:"der Mist", p:"mist"}, ja:{m:"堆肥", p:"taihi"},
           ar:{m:"مخلفات الإسطبل"} },
    def:{ fr:"Le mélange de crottin et de litière sale sorti du box. Différent du crottin seul.",
          en:"Droppings mixed with soiled bedding, taken out of the box. Not the same as droppings alone.",
          es:"La mezcla de excrementos y cama sucia sacada del box. Distinto del excremento solo.",
          it:"La miscela di escrementi e lettiera sporca uscita dal box. Diverso dal solo sterco.",
          de:"Das Gemisch aus Äpfeln und schmutziger Einstreu aus der Box. Nicht dasselbe wie die Äpfel allein.",
          ja:"糞と汚れた寝床材の混ざったもの。糞そのものとは区別します。",
          ar:"خليط من روث الخيل والفرشة المستعملة يخرج من البوكسات. ويختلف عن الروث وحده." } },

  { ref:"fourche", lecon:2, coll:"outils",
    mots:{ fr:{m:"la fourche"}, en:{m:"the muck fork", p:"meuk-fork"},
           es:{m:"la horca"}, it:{m:"la forca"},
           de:{m:"die Mistgabel", p:"mist-ga-beul"}, ja:{m:"フォーク", p:"fōku"},
           ar:{m:"شوكة الروث (المذراة)"} },
    def:{ fr:"Outil à dents courbes pour trier le crottin sans emporter toute la litière propre.",
          en:"Curved-tined tool for lifting droppings without throwing away good bedding.",
          es:"Herramienta de dientes curvos para separar el excremento sin llevarse toda la cama limpia.",
          it:"Attrezzo a denti curvi per separare lo sterco senza portar via tutta la lettiera pulita.",
          de:"Gerät mit gebogenen Zinken, um Äpfel auszulesen, ohne die saubere Einstreu mitzunehmen.",
          ja:"曲がった歯の道具。きれいな寝床材を持っていかずに、糞だけをより分けます。",
          ar:"أداة ذات أسنان منحنية لفرز الروث من دون أخذ الفرشة النظيفة كلها." } },

  { ref:"brouette", lecon:2, coll:"outils",
    mots:{ fr:{m:"la brouette"}, en:{m:"the wheelbarrow", p:"ouil-ba-ro"},
           es:{m:"la carretilla"}, it:{m:"la carriola"},
           de:{m:"die Schubkarre", p:"choub-ka-re"}, ja:{m:"一輪車", p:"ichirinsha"},
           ar:{m:"عربة اليد"} },
    def:{ fr:"Sert à sortir le fumier et à rapporter la litière propre.",
          en:"Used to carry muck out and clean bedding in.",
          es:"Sirve para sacar el estiércol y traer la cama limpia.",
          it:"Serve a portar fuori il letame e a riportare la lettiera pulita.",
          de:"Dient dazu, Mist hinauszubringen und frische Einstreu zu holen.",
          ja:"堆肥を運び出し、新しい寝床材を運び込むための道具。",
          ar:"تستعمل لإخراج السماد ولجلب الفرشة النظيفة." } },

  { ref:"balai", lecon:2, coll:"outils",
    mots:{ fr:{m:"le balai"}, en:{m:"the broom", p:"broum", var:"the yard brush (GB)"},
           es:{m:"la escoba"}, it:{m:"la scopa"},
           de:{m:"der Besen", p:"bé-zen"}, ja:{m:"ほうき", p:"hōki"},
           ar:{m:"المكنسة"} },
    def:{ fr:"On balaie l'allée après chaque passage. Une cour bien tenue se reconnaît à ça.",
          en:"The aisle is swept after every job. A well-kept yard shows in this detail.",
          es:"Se barre el pasillo después de cada paso. Una cuadra bien llevada se reconoce en eso.",
          it:"Si spazza il corridoio dopo ogni passaggio. Una scuderia ben tenuta si riconosce da questo.",
          de:"Der Gang wird nach jedem Durchgang gefegt. Daran erkennt man einen gepflegten Stall.",
          ja:"通ったあとは必ず通路を掃く。手入れの行き届いた厩舎かどうかは、そこで分かります。",
          ar:"يكنس الممر بعد كل مرور. ويظهر انتظام الإسطبل من نظافة ممراته وساحته." } },

  { ref:"pelle", lecon:2, coll:"outils",
    mots:{ fr:{m:"la pelle"}, en:{m:"the shovel", p:"cho-veul"},
           es:{m:"la pala"}, it:{m:"la pala"},
           de:{m:"die Schaufel", p:"chao-feul"}, ja:{m:"スコップ", p:"sukoppu"},
           ar:{m:"المجرفة (الجاروف)"} },
    def:{ fr:"Pour ramasser ce que la fourche laisse : litière fine, sable, granulés renversés.",
          en:"For lifting what the fork leaves behind: fine bedding, sand, spilt feed.",
          es:"Para recoger lo que la horca deja: cama fina, arena, pellets derramados.",
          it:"Per raccogliere ciò che la forca lascia: lettiera fine, sabbia, pellet rovesciati.",
          de:"Für das, was die Gabel übrig lässt: feine Einstreu, Sand, verschüttete Pellets.",
          ja:"フォークが残すものを集めるために。細かい寝床材、砂、こぼれたペレット。",
          ar:"لجمع ما تتركه المذراة: الفرشة الدقيقة، والرمل، والحبيبات المنسكبة." } },

  { ref:"tuyau", lecon:2, coll:"outils",
    mots:{ fr:{m:"le tuyau d'arrosage"}, en:{m:"the hosepipe", p:"hoz-païp", var:"the hose (US)"},
           es:{m:"la manguera"}, it:{m:"il tubo dell'acqua", var:"la canna dell'acqua"}, // ?? usage en écurie
           de:{m:"der Wasserschlauch", p:"va-seur-chlaourh"}, ja:{m:"ホース", p:"hōsu"},
           ar:{m:"خرطوم الماء"} },
    def:{ fr:"Sert à remplir les seaux et à doucher les jambes après le travail. En concours, savoir où il est fait gagner dix minutes.",
          en:"Used to fill buckets and to hose legs after work. At a show, knowing where it is saves ten minutes.",
          es:"Sirve para llenar los cubos y duchar las extremidades tras el trabajo. En concurso, saber dónde está hace ganar diez minutos.",
          it:"Serve a riempire i secchi e a docciare gli arti dopo il lavoro. In concorso, sapere dov'è fa guadagnare dieci minuti.",
          de:"Zum Eimerfüllen und zum Abspritzen der Beine nach der Arbeit. Auf dem Turnier spart es zehn Minuten, zu wissen, wo er hängt.",
          ja:"バケツに水を汲み、運動後の脚を洗うためのホース。競技会では、その場所を知っているだけで十分は得をします。",
          ar:"يستخدم لملء الأحواض وغسل الأرض وتبريد قوائم الحصان أو جسمه بالماء. وفي المسابقة، معرفة مكانه يوفر عشر دقائق." } },

  { ref:"seau", lecon:2, coll:"outils",
    mots:{ fr:{m:"le seau"}, en:{m:"the bucket", p:"beu-kit", var:"the pail (US)"},
           es:{m:"el cubo"}, it:{m:"il secchio"},
           de:{m:"der Eimer", p:"aï-meur"}, ja:{m:"バケツ", p:"baketsu"},
           ar:{m:"الدلو"} },
    def:{ fr:"Récipient pour l'eau ou la ration. On en compte souvent deux par box : un pour boire, un pour les granulés.",
          en:"Container for water or feed. Most boxes have two: one for water, one for hard feed.",
          es:"Recipiente para el agua o la ración. Suele haber dos por box: uno para beber, otro para el pienso.",
          it:"Recipiente per l'acqua o la razione. Spesso due per box: uno per bere, uno per i pellet.",
          de:"Behälter für Wasser oder Futter. Meist zwei pro Box: einer zum Trinken, einer fürs Kraftfutter.",
          ja:"水や飼料のための容器。馬房に二つ置くのが普通です。飲み水用と、飼料用と。",
          ar:"وعاء للماء أو للحصة. وغالبا ما يوضع اثنان في كل حجرة: واحد للشرب وآخر للعلف." } },

  /* ================= LEÇON 3 · L'EAU ET LA NOURRITURE ================= */

  { ref:"abreuvoir", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'abreuvoir"}, en:{m:"the water trough", p:"oua-teur-trof", var:"the automatic drinker"},
           es:{m:"el bebedero"}, it:{m:"l'abbeveratoio"},
           de:{m:"die Tränke", p:"trèn-ke"}, ja:{m:"水飲み場", p:"mizunomiba"},
           ar:{m:"حوض الشرب"} },
    def:{ fr:"Point d'eau à volonté. À vérifier matin et soir, surtout l'hiver : une conduite gelée se voit vite.",
          en:"Constant water supply. Check morning and evening, especially in winter when pipes freeze.",
          es:"Punto de agua a voluntad. Se comprueba mañana y noche, sobre todo en invierno: una tubería helada se nota pronto.",
          it:"Punto d'acqua a volontà. Da controllare mattina e sera, soprattutto d'inverno: una conduttura gelata si vede presto.",
          de:"Wasserstelle zur freien Aufnahme. Morgens und abends prüfen, vor allem im Winter: Eine gefrorene Leitung zeigt sich schnell.",
          ja:"いつでも飲める水場。朝晩の確認を、特に冬は欠かさずに。配管が凍ればすぐに分かります。",
          ar:"مورد ماء متاح دائما. يفحص صباحا ومساء، وخصوصا في الشتاء: فقد ينقطع الماء سريعا إذا تجمد الأنبوب." } },

  { ref:"mangeoire", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la mangeoire"}, en:{m:"the manger", p:"main-djeur", var:"the feed bin"},
           es:{m:"el comedero"}, it:{m:"la greppia"},
           de:{m:"die Futterkrippe", p:"fou-teur-kri-pe"}, ja:{m:"飼い桶", p:"kaioke"},
           ar:{m:"المعلف"} },
    def:{ fr:"Auge fixée dans le box où l'on verse la ration.",
          en:"Fixed trough in the box where the feed is poured.",
          es:"Comedero fijado en el box donde se vierte la ración.",
          it:"Mangiatoia fissata nel box dove si versa la razione.",
          de:"In der Box befestigter Trog, in den die Ration kommt.",
          ja:"馬房に据え付けられた飼い葉桶。ここに飼料を注ぎます。",
          ar:"وعاء ثابت داخل البوكس يوضع فيه العلف." } },

  { ref:"foin", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le foin"}, en:{m:"hay", p:"hé"},
           es:{m:"el heno"}, it:{m:"il fieno"},
           de:{m:"das Heu", p:"hoï"}, ja:{m:"干し草", p:"hoshikusa"},
           ar:{m:"الدريس"} },
    def:{ fr:"Herbe fauchée puis séchée : la base de la ration. Un cheval en consomme chaque jour 1,5 à 2 % de son poids.",
          en:"Grass cut and dried. The foundation of the diet: a horse eats 1.5 to 2 % of its bodyweight daily.",
          es:"Hierba segada y secada: la base de la ración. Un caballo consume cada día del 1,5 al 2 % de su peso.",
          it:"Erba falciata e poi essiccata: la base della razione. Un cavallo ne consuma ogni giorno l'1,5-2 % del suo peso.",
          de:"Gemähtes, getrocknetes Gras: die Basis der Ration. Ein Pferd frisst täglich 1,5 bis 2 % seines Gewichts.",
          ja:"刈って乾かした草。飼料の基本です。馬は毎日、体重の1.5〜2%を食べます。",
          ar:"عشب حصد ثم جفف: وهو أساس الحصة. ويستهلك الحصان منه يوميا ما بين واحد ونصف واثنين في المئة من وزنه." } },


  { ref:"granules", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"les granulés"}, en:{m:"the nuts", p:"neutts", var:"the pellets · hard feed (GB) · grain (US)"},
           es:{m:"el pienso"}, it:{m:"il mangime", var:"i pellet"},
           de:{m:"das Kraftfutter", p:"kraft-fou-teur", var:"die Pellets"}, ja:{m:"ペレット", p:"peretto"},
           ar:{m:"العلف المحبب"} },
    def:{ fr:"Aliment industriel compressé, donné en complément du fourrage selon le travail du cheval.",
          en:"Compressed manufactured feed, given on top of forage according to the horse's workload.",
          es:"Alimento industrial comprimido, dado como complemento del forraje según el trabajo del caballo.",
          it:"Alimento industriale compresso, dato in complemento al foraggio secondo il lavoro del cavallo.",
          de:"Gepresstes Industriefutter, je nach Arbeit des Pferdes zusätzlich zum Raufutter gegeben.",
          ja:"圧縮された配合飼料。馬の運動量に応じて、粗飼料に加えて与えます。",
          ar:"علف صناعي محبب، يعطى مكملا للعلف الخشن بحسب عمل الحصان." } },

  { ref:"avoine", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'avoine"}, en:{m:"oats", p:"ots"},
           es:{m:"la avena"}, it:{m:"l'avena"},
           de:{m:"der Hafer", p:"ha-feur"}, ja:{m:"オート麦", p:"ōtomugi"},
           ar:{m:"الشوفان"} },
    def:{ fr:"Céréale traditionnelle, très énergétique. Beaucoup d'écuries l'ont remplacée par les granulés.",
          en:"The traditional grain, high in energy. Many yards have replaced it with nuts.",
          es:"Cereal tradicional, muy energético. Muchas cuadras lo han sustituido por los pellets.",
          it:"Cereale tradizionale, molto energetico. Molte scuderie l'hanno sostituito con i pellet.",
          de:"Das traditionelle, sehr energiereiche Getreide. Viele Ställe haben es durch Pellets ersetzt.",
          ja:"伝統的な穀物で、エネルギーが非常に高い。今では多くの厩舎がペレットに切り替えています。",
          ar:"حبوب تقليدية عالية الطاقة. وقد استبدلتها إسطبلات كثيرة بالعلف المكعب." } },

  { ref:"son", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le son"}, en:{m:"bran", p:"brann"},
           es:{m:"el salvado"}, it:{m:"la crusca"},
           de:{m:"die Kleie", p:"klaï-e"}, ja:{m:"ふすま", p:"fusuma"},
           ar:{m:"النخالة"} },
    def:{ fr:"Enveloppe du grain de blé. Servait au fameux barbotage, aujourd'hui déconseillé en grande quantité.",
          en:"The husk of the wheat grain. Once used for bran mashes, now discouraged in quantity.",
          es:"Envoltura del grano de trigo. Servía para el famoso salvado húmedo, hoy desaconsejado en gran cantidad.",
          it:"Involucro del chicco di grano. Serviva per il famoso pastone, oggi sconsigliato in grande quantità.",
          de:"Die Hülle des Weizenkorns. Diente dem berühmten Mash — in großen Mengen heute nicht mehr empfohlen.",
          ja:"小麦の粒の外皮。かつては例のふすま粥に使われましたが、今では大量に与えることは勧められません。",
          ar:"غلاف حبة القمح. كان يستعمل في هريسة النخالة الشهيرة، ولا ينصح به اليوم بكميات كبيرة." } },


  { ref:"pierre-sel", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la pierre à sel"}, en:{m:"the salt lick", p:"solt-lik", var:"the mineral block"},
           es:{m:"la piedra de sal"}, it:{m:"il blocco di sale"},
           de:{m:"der Salzleckstein", p:"zalts-lèk-chtaïn"}, ja:{m:"鉱塩", p:"kōen"},
           ar:{m:"حجر الملح"} },
    def:{ fr:"Bloc de sel laissé à disposition dans le box. Le cheval se sert selon son besoin.",
          en:"Block of salt left in the box. The horse takes what it needs.",
          es:"Bloque de sal dejado a disposición en el box. El caballo se sirve según su necesidad.",
          it:"Blocco di sale lasciato a disposizione nel box. Il cavallo si serve secondo il bisogno.",
          de:"Salzleckstein, der in der Box bereitliegt. Das Pferd bedient sich nach Bedarf.",
          ja:"馬房に置いておく塩の塊。馬は必要に応じて自分でなめます。",
          ar:"كتلة ملح تترك في متناول الحصان في الحجرة. وهو يأخذ منها بحسب حاجته." } },

  { ref:"eau", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'eau"}, en:{m:"water", p:"oua-teur"},
           es:{m:"el agua"}, it:{m:"l'acqua"},
           de:{m:"das Wasser", p:"va-seur"}, ja:{m:"水", p:"mizu"},
           ar:{m:"الماء"} },
    def:{ fr:"Le premier des besoins : de 30 à 50 litres par jour, davantage par forte chaleur ou au travail.",
          en:"The first need of all: thirty to fifty litres a day, more in heat or in work.",
          es:"La primera de las necesidades: de 30 a 50 litros al día, más con mucho calor o en el trabajo.",
          it:"Il primo dei bisogni: da 30 a 50 litri al giorno, di più col gran caldo o al lavoro.",
          de:"Das erste aller Bedürfnisse: 30 bis 50 Liter am Tag, bei Hitze oder Arbeit mehr.",
          ja:"何よりもまず水。一日に30〜50リットル、猛暑や運動時にはさらに多く。",
          ar:"أول الحاجات: من ثلاثين إلى خمسين لترا في اليوم، وأكثر في الحر الشديد أو أثناء العمل." } },

  /* ================= LEÇON 4 · TENIR, ATTACHER, LES GESTES ================= */

  { ref:"licol", lecon:4, coll:"materiel",
    mots:{ fr:{m:"le licol"}, en:{m:"the headcollar", p:"hed-ko-leur", var:"the halter (US)"},
           es:{m:"el cabestro", var:"el ronzal"}, it:{m:"la capezza"},
           de:{m:"das Halfter", p:"half-teur"}, ja:{m:"ハルター", p:"harutā", var:"無口 (mukuchi), terme traditionnel, surtout à l'écrit"},
           ar:{m:"الرسن من دون شكيمة"} },
    def:{ fr:"Harnais de tête sans mors, pour tenir et mener le cheval à la main. Ne jamais laisser un cheval en liberté avec.",
          en:"Bitless head harness used to hold and lead a horse. Never leave one on a loose horse.",
          es:"Cabezada sin bocado, para sujetar y llevar al caballo de la mano. Nunca dejar a un caballo suelto con él puesto.",
          it:"Capezza senza imboccatura, per tenere e condurre il cavallo a mano. Mai lasciare un cavallo libero con la capezza.",
          de:"Kopfstück ohne Gebiss, zum Halten und Führen an der Hand. Ein Pferd nie damit frei laufen lassen.",
          ja:"ハミのない頭絡。馬を引いて歩くためのもの。これを着けたまま放してはいけません。",
          ar:"عدة توضع على رأس الحصان لقيادته أو ربطه، ولا تحتوي على شكيمة. ولا يترك به الحصان حرا أبدا." } },


  { ref:"anneau", lecon:4, coll:"materiel",
    mots:{ fr:{m:"l'anneau d'attache"}, en:{m:"the tie ring", p:"taï-ring"},
           es:{m:"la argolla"}, it:{m:"l'anello"},
           de:{m:"der Anbindering", p:"an-bin-de-ring"}, ja:{m:"繋ぎ場", p:"tsunagiba", var:"タイリング (tai ringu) pour l'anneau lui-même"},
           ar:{m:"حلقة الربط"} },
    def:{ fr:"Point fixe où l'on attache le cheval, toujours avec une ficelle qui casse en cas de panique. Le japonais nomme l'endroit (繋ぎ場, « le lieu où l'on attache ») plutôt que l'anneau : les langues ne découpent pas le monde de la même façon.",
          en:"The fixed point a horse is tied to — always with a breakable string in case it panics. Japanese names the place rather than the ring itself.",
          es:"Punto fijo donde se ata el caballo, siempre con un cordel que rompa en caso de pánico. El japonés nombra el lugar (繋ぎ場, « el sitio donde se ata ») más que la anilla: las lenguas no recortan el mundo igual.",
          it:"Punto fisso dove si lega il cavallo, sempre con uno spago che si rompe in caso di panico. Il giapponese nomina il luogo (繋ぎ場, « il posto dove si lega ») più che l'anello: le lingue non ritagliano il mondo allo stesso modo.",
          de:"Fester Punkt zum Anbinden, immer mit einer Schnur, die bei Panik reißt. Das Japanische benennt den Ort (繋ぎ場, « der Anbindeplatz ») statt des Rings: Sprachen zerschneiden die Welt nicht gleich.",
          ja:"馬をつなぐ固定点。パニックのときに切れるよう、必ず細紐を介して。日本語は輪ではなく場所を名づけます — 繋ぎ場。言語による世界の切り取り方は同じではありません。",
          ar:"نقطة ثابتة يربط بها الحصان، دائما بخيط ينقطع عند الذعر. واليابانية تسمي المكان نفسه: «موضع الربط»." } },


  { ref:"curer", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"curer le box"}, en:{m:"to muck out", p:"tou-meuk-aoute"},
           es:{m:"limpiar el box"}, it:{m:"pulire il box"},
           de:{m:"ausmisten", p:"aous-mis-ten"}, ja:{m:"馬房を掃除する", p:"babō o sōji suru"},
           ar:{m:"تنظيف الحجرة"} },
    def:{ fr:"Retirer crottin et litière souillée, puis remettre du propre. Le geste de base, tous les matins.",
          en:"Take out droppings and soiled bedding, then put clean back down. The basic daily job.",
          es:"Retirar excremento y cama sucia, y reponer limpia. El gesto de base, todas las mañanas.",
          it:"Togliere sterco e lettiera sporca, poi rimettere del pulito. Il gesto di base, ogni mattina.",
          de:"Äpfel und schmutzige Einstreu entfernen, frische nachlegen. Der Grundhandgriff, jeden Morgen.",
          ja:"糞と汚れた寝床材を取り除き、きれいなものを足す。毎朝の基本の仕事です。",
          ar:"إزالة الروث والفرشة المتسخة، ثم وضع فرشة نظيفة. وهي الحركة الأساسية، كل صباح." } },

  { ref:"pailler", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"pailler"}, en:{m:"to bed down", p:"tou-bèd-daoune"},
           es:{m:"poner la cama"}, it:{m:"fare la lettiera"},
           de:{m:"einstreuen", p:"aïn-chtroï-en"}, ja:{m:"敷料を敷く", p:"shikiryō o shiku"},
           ar:{m:"فرش القش"} },
    def:{ fr:"Étaler la litière propre, plus épaisse au centre et relevée contre les murs.",
          en:"Spread the clean bedding, deeper in the middle and banked up against the walls.",
          es:"Extender la cama limpia, más gruesa en el centro y levantada contra las paredes.",
          it:"Stendere la lettiera pulita, più spessa al centro e rialzata contro i muri.",
          de:"Frische Einstreu verteilen, in der Mitte dicker, an den Wänden hochgezogen.",
          ja:"きれいな寝床材を敷き広げます。中央は厚めに、壁ぎわは高めに。",
          ar:"توزع الفرشة النظيفة بطبقة أكثر سماكة في وسط البوكس، ويمكن رفعها قليلا عند الجدران بحسب طريقة تجهيز الفرشة." } },

  { ref:"nourrir", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"nourrir"}, en:{m:"to feed", p:"tou-fid"},
           es:{m:"dar de comer"}, it:{m:"dare da mangiare"},
           de:{m:"füttern", p:"fu-teurn"}, ja:{m:"餌をやる", p:"esa o yaru"},
           ar:{m:"إطعام الحصان"} },
    def:{ fr:"Distribuer la ration, toujours aux mêmes heures : l'estomac du cheval n'aime pas l'improvisation.",
          en:"Give out the feed, always at the same times — a horse's stomach dislikes improvisation.",
          es:"Distribuir la ración, siempre a las mismas horas: el estómago del caballo no soporta la improvisación.",
          it:"Distribuire la razione, sempre agli stessi orari: lo stomaco del cavallo non ama l'improvvisazione.",
          de:"Die Ration verteilen, immer zur selben Zeit: Der Pferdemagen mag keine Improvisation.",
          ja:"飼料を配ること。時刻は毎日同じに。馬の胃は行き当たりばったりを嫌います。",
          ar:"توزيع الحصة، دائما في المواعيد نفسها: فمعدة الحصان لا تحب الارتجال." } },

  { ref:"sortir", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"sortir au pré"}, en:{m:"to turn out", p:"tou-teurn-aoute"},
           es:{m:"sacar al prado"}, it:{m:"mandare al prato"},
           de:{m:"auf die Weide bringen", p:"aouf-di-vaï-de-brin-guen"}, ja:{m:"放牧する", p:"hōboku suru"},
           ar:{m:"إخراج الحصان إلى المرعى"} },
    def:{ fr:"Mener le cheval au pré ou au paddock. « Turn out » est l'un des verbes les plus employés dans une écurie anglaise.",
          en:"Take the horse out to the field or paddock. « Turn out » is one of the most-used verbs on an English yard.",
          es:"Llevar al caballo al prado o al paddock. « Turn out » es uno de los verbos más usados en una cuadra inglesa.",
          it:"Portare il cavallo al prato o al paddock. « Turn out » è uno dei verbi più usati in una scuderia inglese.",
          de:"Das Pferd auf die Koppel oder ins Paddock bringen. « Turn out » ist eines der meistgebrauchten Verben im englischen Stall.",
          ja:"馬を放牧地やパドックへ出すこと。« turn out » はイギリスの厩舎で最もよく使われる動詞のひとつです。",
          ar:"قيادة الحصان إلى المرعى أو إلى البادوك. وهذا من أكثر الأفعال استعمالا في الإسطبل." } },

  { ref:"rentrer", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"rentrer"}, en:{m:"to bring in", p:"tou-bring-inn"},
           es:{m:"meter al box"}, it:{m:"riportare in box"},
           de:{m:"hereinholen", p:"hè-raïn-ho-len"}, ja:{m:"馬房に戻す", p:"babō ni modosu"},
           ar:{m:"إدخال الحصان"} },
    def:{ fr:"Ramener le cheval du pré au box, le soir ou avant le travail.",
          en:"Bring the horse in from the field, in the evening or before work.",
          es:"Traer al caballo del prado al box, por la noche o antes del trabajo.",
          it:"Riportare il cavallo dal prato al box, la sera o prima del lavoro.",
          de:"Das Pferd von der Koppel in die Box holen, abends oder vor der Arbeit.",
          ja:"夕方や運動の前に、馬を放牧地から馬房へ戻すこと。",
          ar:"إعادة الحصان من المرعى إلى حجرته، مساء أو قبل العمل." } },

  { ref:"doucher", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"doucher"}, en:{m:"to hose down", p:"tou-hoz-daoune"},
           es:{m:"duchar", var:"mangueriar"}, it:{m:"docciare"},
           de:{m:"abspritzen", p:"ap-chprit-sen"}, ja:{m:"馬に水をかける", p:"uma ni mizu o kakeru", var:"脚を冷やす (ashi o hiyasu) pour les seuls membres · 馬体を洗う (batai o arau) = laver au shampooing"},
           ar:{m:"شطف الحصان"} },
    def:{ fr:"Rincer le cheval après le travail. S'il a très chaud, retire vite son équipement et applique de l'eau froide en quantité sur tout le corps, puis continue à le refroidir en surveillant sa respiration. Le japonais distingue trois gestes que le français confond : asperger d'eau, refroidir les membres, et laver au shampooing.",
          en:"Rinse the horse after work. If he is very hot, strip the tack quickly and apply plenty of cold water over the whole body, then keep cooling him and watch his breathing. Japanese keeps three verbs apart where French has one: sluicing with water, cooling the legs, and washing with shampoo.",
          es:"Aclarar al caballo tras el trabajo. Si está muy caliente, quítale el equipo deprisa y aplícale agua fría en abundancia por todo el cuerpo; sigue refrescándolo y vigila su respiración. El japonés distingue tres gestos que el francés confunde: mojar, refrescar las extremidades, y lavar con champú.",
          it:"Sciacquare il cavallo dopo il lavoro. Se è molto caldo, togli in fretta la bardatura e applica acqua fredda in abbondanza su tutto il corpo, poi continua a rinfrescarlo sorvegliando il respiro. Il giapponese distingue tre gesti che il francese confonde: bagnare, rinfrescare gli arti, e lavare con lo shampoo.",
          de:"Das Pferd nach der Arbeit abspritzen. Ist es sehr heiß, nimm schnell die Ausrüstung ab und gib reichlich kaltes Wasser über den ganzen Körper, kühle weiter und achte auf die Atmung. Das Japanische unterscheidet drei Handgriffe, die das Französische vermengt: nass machen, Beine kühlen, shampoonieren.",
          ja:"運動後に馬を水で流すこと。ひどく熱いときは、馬具をすばやく外し、体全体に冷水をたっぷりかけて冷やし続け、呼吸を見ていてください。日本語は、水をかける・脚を冷やす・シャンプーで洗う、の三つを言い分けます。",
          ar:"تبريد الحصان بالماء بعد العمل. إذا كان شديد الحرارة، فانزعي عنه معداته سريعا وصبي الماء البارد بكمية وفيرة على جسمه كله. واصلي تبريده وراقبي تنفسه." } },

  ],

  /* ---- phrases du chapitre : le moteur les découpe en tuiles ---- */
  phrases: [
    { ref:"remplir-seaux", lecon:2,
      fr:"Tu peux remplir les seaux d'eau ?",
      en:"Can you fill the water buckets ?",
      es:"¿ Puedes llenar los cubos de agua ?",
      it:"Puoi riempire i secchi d'acqua ?",
      de:"Kannst du die Wassereimer füllen ?",
      ja:"水 の バケツ を いっぱい に して くれる ?",
      ar:"هل يمكنك ملء دلاء الماء؟" },
    { ref:"ou-sellerie", lecon:1,
      fr:"Où est la sellerie ?",
      en:"Where is the tack room ?",
      es:"¿ Dónde está el guadarnés ?",
      it:"Dov'è la selleria ?",
      de:"Wo ist die Sattelkammer ?",
      ja:"馬具庫 は どこ です か ?",
      ar:"أين غرفة السروج واللوازم؟" },
    { ref:"cure-box", lecon:4,
      fr:"J'ai curé le box et remis de la paille.",
      en:"I have mucked out and put down fresh straw.",
      es:"He limpiado el box y puesto paja nueva.",
      it:"Ho pulito il box e messo paglia nuova.",
      de:"Ich habe ausgemistet und frisches Stroh eingestreut.",
      ja:"馬房 を 掃除 して 新しい 藁 を 敷き ました 。",
      ar:"نظفي البوكس وأضيفي قشا جديدا." },
    { ref:"sortir-matin", lecon:4,
      fr:"On sort les chevaux au pré le matin.",
      en:"We turn the horses out in the morning.",
      es:"Sacamos los caballos al prado por la mañana.",
      it:"Mandiamo i cavalli al prato la mattina.",
      de:"Wir bringen die Pferde morgens auf die Weide.",
      ja:"朝 に 馬 を 放牧 し ます 。",
      ar:"نخرج الخيول إلى المرعى صباحا." },
    { ref:"pas-eau", lecon:3,
      fr:"Il n'a plus d'eau.",
      en:"He has no water left.",
      es:"Ya no tiene agua.",
      it:"Non ha più acqua.",
      de:"Er hat kein Wasser mehr.",
      ja:"水 が なくなり ました 。",
      ar:"نفد ماؤه." },
    /* 🟥 19/08 : TEXTE REMPLACÉ, `ref` CONSERVÉE. L'ancienne phrase
       employait `attacher`, parti à Barcelone. Garder l'identifiant évite
       toute dépendance cachée ; seul le texte change.
       ⚠️ ES/IT/DE/JA écrits par Claude, non relus par un natif. */
    { ref:"ou-attacher", lecon:4, mots:["anneau","box"],
      fr:"L'anneau est à côté de la porte du box.",
      en:"The tie ring is next to the stable door.",
      es:"La argolla está junto a la puerta del box.",
      it:"L'anello è accanto alla porta del box.",
      de:"Der Anbindering ist neben der Boxentür.",
      ja:"係留 リング は 馬房 の 扉 の 横 に あり ます。",
      ar:"اربطيه بحلقة الربط الموجودة بجوار باب البوكس." }
  ],

  /* ==================================================================
     LE DIALOGUE DE NEWMARKET — 15 août 2026, session 214.

     LA SCÈNE : on t'accueille dans l'écurie, tu cherches ton chemin et
     on te confie des tâches. 21 phrases, 6 temps, 5 entendues.

     🟥 LE CRITÈRE DE BLANDINE (15/08) : une phrase n'existe QUE si on
     la dit vraiment sur place — « en dehors d'un achat de cheval j'ai
     jamais eu à poser une telle question ». Un mot du lexique n'a PAS
     besoin d'une phrase : il s'apprend en lisant.
     LAISSÉS AU LEXIQUE SEUL, exprès : l'allée, la grange, l'abreuvoir,
     la mangeoire, l'avoine, le son, la pierre à sel, l'anneau, le
     balai, la pelle, le tuyau, le seau, le crottin. On les lit, on ne
     les demande pas. NE PAS « compléter » le dialogue avec eux.

     ⚠️ « Où est la sellerie ? » existe déjà dans `phrases`
     (`ou-sellerie`). Ce n'est pas un doublon accidentel : là c'est un
     exercice de phrase, ici c'est la question d'ouverture de la scène.
     Signalé à Blandine, gardé sur son « ok vas-y ».

     ⚠️ REGISTRE ANGLAIS D'ÉCURIE, comme les autres villes :
     `to muck out`, `the muck heap`, `the haynet`, `to turn out`,
     `to bring in`, `to hose down`, `the rug`, `the headcollar`.
     Formes américaines en `varEn` seulement. `the indoor school` /
     `the outdoor school` — jamais « the ménage », faute courante déjà
     signalée dans le `def` de `carriere`.

     `dit` : "joueuse" = elle produit · "club" = elle entend et comprend.
  ================================================================== */
  dialogue: {
    ville: "newmarket", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 21 phrases */
    /* 🟥 19/08 : table `titres` ajoutée — même schéma que Golegã et
       Barcelone. ⚠️ CHAMP INERTE côté `lingo.html` : c'est la page fille
       `lingo-dialogue.html` qui l'emploie, et elle n'a pas été fournie.
       Traductions écrites par Claude, non relues par un natif. */
    titres: { 1:"Arriver à l'écurie", 2:"Faire les boxes", 3:"Nettoyer",
              4:"Eau et nourriture", 5:"La routine des chevaux", 6:"Fin de journée" },
    phrases: [

      /* ---- temps 1 · j'arrive et je cherche mon chemin ---- */
      { ref:"d-ou-sellerie", temps:1, dit:"joueuse", mots:["sellerie"],
        fr:"Où est la sellerie ?",
        en:"Where's the tack room?",
        es:"¿Dónde está el guadarnés?",
        it:"Dov'è la selleria?",
        de:"Wo ist die Sattelkammer?",
        ja:"馬具庫 は どこ です か ?",
      ar:"أين غرفة السروج واللوازم؟" },

      { ref:"d-quel-box", temps:1, dit:"joueuse", mots:["box"],
        fr:"Dans quel box est mon cheval ?",
        en:"Which stable is my horse in?",
        es:"¿En qué box está mi caballo?",
        it:"In quale box è il mio cavallo?",
        de:"In welcher Box steht mein Pferd?",
        ja:"私 の 馬 は どの 馬房 です か ?",
      ar:"في أي بوكس يوجد حصاني؟" },

      { ref:"d-r-au-pre", temps:1, dit:"club", mots:["pre","rentrer"],
        fr:"Il est au pré, je vais le rentrer.",
        en:"He's out in the field — I'll bring him in.",
        es:"Está en el prado, voy a meterlo.",
        it:"È al prato, lo riporto in box.",
        de:"Er ist auf der Weide, ich hole ihn herein.",
        ja:"放牧地 に い ます。 馬房 に 戻し ます ね。",
      ar:"إنه في المرعى، سأدخله." },

      { ref:"d-manege-carriere", temps:1, dit:"joueuse", mots:["manege","carriere"],
        fr:"Est-ce qu'on travaille au manège ou en carrière ?",
        en:"Are we working in the indoor school or the outdoor school?",
        es:"¿Trabajamos en el picadero cubierto o en la pista?",
        it:"Lavoriamo nel maneggio coperto o nel campo?",
        de:"Arbeiten wir in der Reithalle oder auf dem Reitplatz?",
        ja:"屋内馬場 と 屋外馬場、 どちら で 乗り ます か ?",
      ar:"هل نعمل في الميدان المغطى أم في المكشوف؟" },

      /* ---- temps 2 · on me confie le box ---- */
      { ref:"d-r-curer-box", temps:2, dit:"club", mots:["curer","box"],
        fr:"Tu peux curer le box, s'il te plaît ?",
        en:"Could you muck out the stable, please?",
        es:"¿Puedes limpiar el box, por favor?",
        it:"Puoi pulire il box, per favore?",
        de:"Kannst du bitte die Box ausmisten?",
        ja:"馬房 を 掃除 し て もらえ ます か ?",
      ar:"هل يمكنك تنظيف البوكس من فضلك؟" },

      { ref:"d-ou-fourche", temps:2, dit:"joueuse", mots:["fourche","brouette"],
        fr:"Où sont la fourche et la brouette ?",
        en:"Where are the muck fork and the wheelbarrow?",
        es:"¿Dónde están la horca y la carretilla?",
        it:"Dove sono la forca e la carriola?",
        de:"Wo sind die Mistgabel und die Schubkarre?",
        ja:"フォーク と 一輪車 は どこ です か ?",
      ar:"أين المذراة وعربة اليد؟" },

      { ref:"d-vider-brouette", temps:2, dit:"joueuse", mots:["brouette"],
        fr:"Où est-ce que je vide la brouette ?",
        en:"Where do I empty the wheelbarrow?",
        es:"¿Dónde vacío la carretilla?",
        it:"Dove svuoto la carriola?",
        de:"Wo leere ich die Schubkarre aus?",
        ja:"一輪車 は どこ に 空け ます か ?",
      ar:"أين أفرغ عربة اليد؟" },

      { ref:"d-r-tas-fumier", temps:2, dit:"club", mots:["tas-fumier","cour"],
        fr:"Le tas de fumier est au fond de la cour.",
        en:"The muck heap is at the far end of the yard.",
        es:"El estercolero está al fondo del patio.",
        it:"La concimaia è in fondo al cortile.",
        de:"Der Misthaufen ist hinten im Hof.",
        ja:"堆肥場 は 中庭 の 奥 に あり ます。",
      ar:"كومة الروث والفرشة المستعملة في آخر الساحة." },

      /* ---- temps 3 · la litière ---- */
      { ref:"d-paille-copeaux", temps:3, dit:"joueuse", mots:["paille","copeaux"],
        fr:"Est-ce qu'il est sur paille ou sur copeaux ?",
        en:"Is he on straw or on shavings?",
        es:"¿Está sobre paja o sobre virutas?",
        it:"Sta sulla paglia o sui trucioli?",
        de:"Steht er auf Stroh oder auf Sägespänen?",
        ja:"藁 です か、 おがくず です か ?",
      ar:"هل فرشته من القش أم من نشارة الخشب؟" },

      { ref:"d-remettre-litiere", temps:3, dit:"joueuse", mots:["litiere"],
        fr:"Est-ce que je remets de la litière ?",
        en:"Shall I put down more bedding?",
        es:"¿Le pongo más cama?",
        it:"Aggiungo della lettiera?",
        de:"Soll ich neue Einstreu nachlegen?",
        ja:"敷料 を 足し ます か ?",
      ar:"هل أضيف مزيدا من الفرشة؟" },

      /* ---- temps 4 · la nourriture ---- */
      { ref:"d-deja-mange", temps:4, dit:"joueuse", mots:["nourrir"],
        fr:"Est-ce qu'il a déjà mangé ?",
        en:"Has he been fed?",
        es:"¿Ya ha comido?",
        it:"Ha già mangiato?",
        de:"Hat er schon gefressen?",
        ja:"もう 食べ まし た か ?",
      ar:"هل أكل بالفعل؟" },

      /* 🟥 19/08 : RÉÉCRITE. Elle citait `ration`, parti à Barcelone.
         ⚠️ ES/IT/DE/JA écrits par Claude, non relus par un natif. */
      { ref:"d-quelle-ration", temps:4, dit:"joueuse", mots:["granules","avoine"],
        fr:"Ce cheval mange des granulés et un peu d'avoine ?",
        en:"Does this horse have pellets and a little oats?",
        es:"¿Este caballo come pienso y un poco de avena?",
        it:"Questo cavallo mangia mangime e un po' d'avena?",
        de:"Bekommt dieses Pferd Pellets und ein wenig Hafer?",
        ja:"この 馬 は ペレット と 少し の 燕麦 を 食べ ます か ?",
      ar:"هل يأكل هذا الحصان علفا محببا وقليلا من الشوفان؟" },

      { ref:"d-plus-eau", temps:4, dit:"joueuse", mots:["eau"],
        fr:"Il n'a plus d'eau.",
        en:"He's out of water.",
        es:"Se ha quedado sin agua.",
        it:"Non ha più acqua.",
        de:"Er hat kein Wasser mehr.",
        ja:"水 が なくなっ て い ます。",
      ar:"نفد ماؤه." },

      /* 🟥 19/08 : RÉÉCRITE. Elle citait `filet-foin`, parti à Barcelone.
         `foin` reste enseigné ici — c'est un des quatre mots gardés à
         Newmarket puis rappelés à Barcelone.
         ⚠️ ES/IT/DE/JA écrits par Claude, non relus par un natif. */
      { ref:"d-remplir-filet", temps:4, dit:"joueuse", mots:["foin","mangeoire"],
        fr:"Est-ce que je mets du foin dans la mangeoire ?",
        en:"Shall I put some hay in the manger?",
        es:"¿Pongo heno en el comedero?",
        it:"Metto del fieno nella mangiatoia?",
        de:"Soll ich Heu in die Krippe geben?",
        ja:"飼い葉桶 に 干し草 を 入れ ます か ?",
      ar:"هل أضع الدريس في المعلف؟" },

      { ref:"d-r-mesure-granules", temps:4, dit:"club", mots:["granules","foin"],
        fr:"Une mesure de granulés le matin, du foin le soir.",
        en:"One scoop of nuts in the morning, hay at night.",
        es:"Una medida de pienso por la mañana, heno por la noche.",
        it:"Una misura di mangime la mattina, fieno la sera.",
        de:"Morgens eine Kelle Kraftfutter, abends Heu.",
        ja:"朝 は ペレット を 一杯、 夜 は 干し草 です。",
      ar:"مكيال من العلف المحبب صباحا، ودريس مساء." },

      /* ---- temps 5 · le matériel et l'attache ---- */
      { ref:"d-ou-licol", temps:5, dit:"joueuse", mots:["licol"],
        fr:"Où est son licol ?",
        en:"Where's his headcollar?",
        varEn:"Where's his halter?",
        es:"¿Dónde está su cabestro?",
        it:"Dov'è la sua capezza?",
        de:"Wo ist sein Halfter?",
        ja:"ハルター は どこ です か ?",
      ar:"أين رسنه؟" },

      /* 🟥 19/08 : RÉÉCRITE. Elle citait `attacher`, parti à Barcelone.
         ⚠️ ES/IT/DE/JA écrits par Claude, non relus par un natif. */
      { ref:"d-ou-attacher", temps:5, dit:"joueuse", mots:["pailler","paille"],
        fr:"Il faut remettre de la paille dans ce box ?",
        en:"Does this stable need bedding down with straw?",
        es:"¿Hay que volver a poner paja en este box?",
        it:"Bisogna rimettere della paglia in questo box?",
        de:"Muss diese Box neu mit Stroh eingestreut werden?",
        ja:"この 馬房 に 藁 を 入れ 直し ます か ?",
      ar:"هل أضيف قشا جديدا إلى هذا البوكس؟" },

      /* 🟥 19/08 : RÉÉCRITE. Elle citait `couverture`, parti à Barcelone.
         ⚠️ ES/IT/DE/JA écrits par Claude, non relus par un natif. */
      { ref:"d-couverture", temps:5, dit:"joueuse", mots:["pierre-sel"],
        fr:"Est-ce qu'il faut vérifier sa pierre à sel ?",
        en:"Should I check his salt lick?",
        es:"¿Hay que comprobar su piedra de sal?",
        it:"Bisogna controllare la sua pietra di sale?",
        de:"Soll ich seinen Salzleckstein kontrollieren?",
        ja:"塩 の 塊 を 確認 し た ほう が いい です か ?",
      ar:"أين حجر الملح الخاص به؟" },

      /* ---- temps 6 · sortir, rentrer, doucher ---- */
      { ref:"d-sortir-paddock", temps:6, dit:"joueuse", mots:["sortir","paddock"],
        fr:"Est-ce que je le sors au paddock ?",
        en:"Shall I turn him out in the paddock?",
        es:"¿Lo saco al paddock?",
        it:"Lo mando al paddock?",
        de:"Soll ich ihn aufs Paddock bringen?",
        ja:"パドック に 放牧 し ます か ?",
      ar:"هل أخرجه إلى البادوك؟" },

      { ref:"d-r-rentre-avant-nuit", temps:6, dit:"club", mots:["rentrer"],
        fr:"Rentre-le avant la nuit.",
        en:"Bring him in before dark.",
        es:"Métalo antes de que anochezca.",
        it:"Riportalo in box prima che faccia buio.",
        de:"Hol ihn herein, bevor es dunkel wird.",
        ja:"暗く なる 前 に 馬房 に 戻し て ください。",
      ar:"أدخليه قبل حلول الليل." },

      { ref:"d-doucher-apres", temps:6, dit:"joueuse", mots:["doucher"],
        fr:"Est-ce que je peux le doucher après ?",
        en:"Can I hose him down afterwards?",
        es:"¿Puedo ducharlo después?",
        it:"Posso docciarlo dopo?",
        de:"Kann ich ihn danach abspritzen?",
        ja:"その あと 水 を かけ て も いい です か ?",
      ar:"هل يمكنني شطفه بعد ذلك؟" }
    ]
  }
};
