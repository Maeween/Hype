/* hype-lingo-lex-barcelone.js — Linguae · « Voyager avec son cheval »
   ==================================================================
   BARCELONE 🇪🇸 · 30 CONCEPTS, TROIS LEÇONS · dialogue de 21 phrases.
   Créé le 19/08/2026 sur brief écrit de Blandine.

   L1 · PRÉPARER LE DÉPART (9)   L2 · EMBARQUER ET SÉCURISER (10)
   L3 · LE VOYAGE ET L'ARRIVÉE (11)

   ------------------------------------------------------------------
   🟥 QUINZE CONCEPTS SONT DES RAPPELS, PAS DES CRÉATIONS.
   Règle de Blandine : UN CONCEPT = UN `ref` GLOBAL. Chacun est repris
   À L'IDENTIQUE de son fichier d'origine — même `ref`, mêmes six
   langues, même définition. Rien réécrit, rien retraduit.
     · de `ecurie.js`   : licol, longe, attacher, couverture,
                          foin, filet-foin, seau, eau, ration
     · de `connemara.js`: passeport
     · de `urgences-med.js` : trousse-secours
     · de `cours.js`    : pause
     · de `froid.js`    : temperature
     · de `concours-reserve.js` : van, embarquer

   ⚠️ LE BRIEF ANNONÇAIT 21 REFS NEUVES. IL Y EN A 15. Six existaient
   déjà et ont été rattrapées au croisement : `passeport`,
   `trousse-secours`, `van`, `embarquer`, `pause`, `temperature`.
   Leurs traductions du brief N'ONT PAS été retenues — c'est la version
   déjà en place qui fait foi (ex. `licol` reste « the headcollar »,
   var. « the halter (US) », et non « halter »).

   🟥 `van` ET `embarquer` SORTENT DE `concours-reserve.js`. Ce fichier
   les attendait depuis le 18/08 « pour une ville future » — c'est
   celle-ci. ⚠️ LES RETIRER DE `concours-reserve.js` DANS LE MÊME
   GESTE, sinon deux fichiers portent la même `ref`. Il n'y restera
   que `tableau` et `trac`, qui ne relèvent pas du transport.

   🟥 `arrivee` DU BRIEF EST DEVENU `arrivee-transport` (choix de Blandine, 19/08). `arrivee`
   est déjà le nom du chapitre de La Baule (`hype-lingo-lex-arrivee.js`)
   — aucune collision technique, mais un homonyme illisible à la
   relecture. À valider par Blandine.

   ⚠️ LES `coll:` DES RAPPELS SONT CEUX DE LEUR FICHIER D'ORIGINE
   (`materiel`, `gestes`, `marques`, `alerte`, `soins`…). Ils n'ont pas
   été réalignés sur les collections de Barcelone : à trancher si
   l'écran de collection les range mal.
   ------------------------------------------------------------------

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Les définitions et les traductions
   des 15 concepts NEUFS sont écrites par Claude et n'ont été relues par
   aucun natif. Les 21 phrases du dialogue sont celles du brief de
   Blandine, reprises mot pour mot dans les six langues.

   ⚠️ LE CHAMP `dit` DU DIALOGUE (joueuse / club) A ÉTÉ ATTRIBUÉ PAR
   CLAUDE — le brief ne le précisait pas. Trois phrases sont portées
   par la joueuse (1, 5, 12), le reste par le club. À revoir.

   ⚠️ SEGMENTATION JAPONAISE : les phrases du dialogue ne sont PAS
   découpées par espaces, contrairement à `pansage.js` ou `cours.js`.
   C'est le japonais du brief, gardé tel quel. L'écart de segmentation
   entre villes reste la question ouverte du module.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.barcelone = {
  ref: "barcelone",
  titre: { fr:"Voyager avec son cheval", en:"Travelling with your horse",
           es:"Viajar con tu caballo", it:"Viaggiare con il proprio cavallo",
           de:"Mit dem Pferd unterwegs", ja:"馬と旅する", ar:"السفر مع الحصان" },
  lecons: 3,

  concepts: [

  /* ============ LEÇON 1 · PRÉPARER LE DÉPART ============ */

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"licol", lecon:1, coll:"materiel",
    mots:{ fr:{m:"le licol"}, en:{m:"the headcollar", p:"hed-ko-leur", var:"the halter (US)"},
           es:{m:"el cabestro", var:"el ronzal"}, it:{m:"la capezza"},
           de:{m:"das Halfter", p:"half-teur"}, ja:{m:"ハルター", p:"harutā", var:"無口 (mukuchi), terme traditionnel, surtout à l'écrit"},
           ar:{m:"الرسن"} },
    def:{ fr:"Harnais de tête sans mors, pour tenir et mener le cheval à la main. Ne jamais laisser un cheval en liberté avec.",
          en:"Bitless head harness used to hold and lead a horse. Never leave one on a loose horse.",
          es:"Cabezada sin bocado, para sujetar y llevar al caballo de la mano. Nunca dejar a un caballo suelto con él puesto.",
          it:"Capezza senza imboccatura, per tenere e condurre il cavallo a mano. Mai lasciare un cavallo libero con la capezza.",
          de:"Kopfstück ohne Gebiss, zum Halten und Führen an der Hand. Ein Pferd nie damit frei laufen lassen.",
          ja:"ハミのない頭絡。馬を引いて歩くためのもの。これを着けたまま放してはいけません。",
          ar:"عدة توضع على رأس الحصان من دون شكيمة، لإمساكه وقيادته باليد. لا تتركي الحصان طليقا أو من دون مراقبة وهو يرتدي رسنا عاديا، إلا إذا كان الرسن مصمما للانفصال في حالة الطوارئ وسمحت تعليمات الإسطبل بذلك." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"longe", lecon:1, coll:"materiel",
    mots:{ fr:{m:"la longe"}, en:{m:"the lead rope", p:"lid-rop"},
           es:{m:"el ramal"}, it:{m:"la longhina", var:"« longia » = la longe longue de travail en cercle"},
           de:{m:"der Führstrick", p:"fur-chtrik"}, ja:{m:"引き手", p:"hikite", var:"リード (rīdo), emprunté à l'anglais"},
           ar:{m:"حبل القيادة"} },
    def:{ fr:"Corde attachée au licol pour mener le cheval. Ne jamais l'enrouler autour de la main. L'italien distingue nettement : « longhina » pour mener en main, « longia » pour longer en cercle.",
          en:"Rope clipped to the headcollar for leading. Never wrap it around your hand. Italian keeps two words: « longhina » for leading, « longia » for the lunge line.",
          es:"Cuerda atada a la cabezada para llevar al caballo. Nunca enrollarla alrededor de la mano. El italiano distingue claramente: « longhina » para llevar de la mano, « longia » para dar cuerda en círculo.",
          it:"Corda attaccata alla capezza per condurre il cavallo. Mai avvolgerla attorno alla mano. L'italiano distingue nettamente: « longhina » per condurre a mano, « longia » per longiare in circolo.",
          de:"Strick an der Halfter, um das Pferd zu führen. Nie um die Hand wickeln. Das Italienische unterscheidet klar: « longhina » zum Führen, « longia » zum Longieren im Kreis.",
          ja:"無口につないで馬を引くための綱。手に巻きつけないこと。イタリア語は明確に区別します — 引くのは « longhina »、円で調馬索をかけるのは « longia »。",
          ar:"حبل يربط بالرسن لقيادة الحصان. لا يلف حول اليد أبدا. الإيطالية تميز بوضوح: «longhina» للقيادة باليد، و«longia» للعمل مع الحصان على دائرة." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"attacher", lecon:1, coll:"gestes", v:true,
    mots:{ fr:{m:"attacher"}, en:{m:"to tie up", p:"tou-taï-eup"},
           es:{m:"atar"}, it:{m:"legare"},
           de:{m:"anbinden", p:"an-bin-den"}, ja:{m:"繋ぐ", p:"tsunagu"},
           ar:{m:"ربط الحصان"} },
    def:{ fr:"Fixer le cheval par la longe pour le panser ou le seller. Nœud à dégagement rapide, jamais un nœud serré.",
          en:"Secure the horse by the lead rope to groom or tack up. Quick-release knot, never a tight one.",
          es:"Sujetar al caballo por la cuerda para limpiarlo o ensillarlo. Nudo de desate rápido, jamás un nudo apretado.",
          it:"Legare il cavallo con la longhina per pulirlo o sellarlo. Nodo a scioglimento rapido, mai un nodo stretto.",
          de:"Das Pferd am Strick anbinden, zum Putzen oder Satteln. Immer ein Panikknoten, nie ein fester Knoten.",
          ja:"手入れや装鞍のために綱で馬をつなぐこと。結び方は必ず引き解け結びで、固結びは厳禁です。",
          ar:"ربط الحصان بحبل القيادة أثناء تنظيفه أو تجهيزه بالسرج. استخدمي عقدة أمان سريعة التحرير، لا عقدة محكمة يصعب فكها تحت الضغط." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"couverture", lecon:1, coll:"materiel",
    mots:{ fr:{m:"la couverture"}, en:{m:"the rug", p:"reug", var:"the blanket (US)"},
           es:{m:"la manta"}, it:{m:"la coperta"},
           de:{m:"die Decke", p:"dè-ke"}, ja:{m:"馬着", p:"bachaku", var:"馬服 existe mais est rare"},
           ar:{m:"غطاء الحصان"} },
    def:{ fr:"Protège du froid, de la pluie ou des mouches selon le modèle. Se contrôle chaque jour : une sangle qui tourne blesse.",
          en:"Protects from cold, rain or flies depending on the type. Check it daily — a twisted strap causes rubs.",
          es:"Protege del frío, de la lluvia o de las moscas según el modelo. Se controla cada día: una cincha que gira hiere.",
          it:"Protegge dal freddo, dalla pioggia o dalle mosche secondo il modello. Si controlla ogni giorno: una cinghia che gira ferisce.",
          de:"Schützt je nach Modell vor Kälte, Regen oder Fliegen. Täglich kontrollieren: Ein verrutschter Gurt scheuert wund.",
          ja:"型によって寒さ、雨、虫から守ります。毎日の点検を。ずれたベルトは擦り傷をつくります。",
          ar:"يحمي الحصان من البرد أو المطر أو الذباب بحسب نوعه. يفحص يوميا، فالحزام الملتوي أو غير المضبوط قد يجرح الحصان." } },

  { ref:"protections-transport", lecon:1, coll:"depart",
    mots:{ fr:{m:"les protections de transport"}, en:{m:"travel boots", p:"tra-vel bouts", var:"shipping boots (US)"}, es:{m:"los protectores de transporte"}, it:{m:"le protezioni da trasporto"}, de:{m:"die Transportgamaschen", p:"trans-port-ga-ma-cheune"}, ja:{m:"輸送用プロテクター", p:"yusōyō purotekutā"},
           ar:{m:"واقيات النقل"} },
    def:{ fr:"Elles montent plus haut que des guêtres ordinaires : elles couvrent le genou et le jarret, là où un cheval se cogne quand le van freine. ⚠️ L'anglais dit *travel boots* en Angleterre, *shipping boots* aux États-Unis.",
          en:"They come up higher than ordinary boots, covering knee and hock — where a horse knocks itself when the trailer brakes.",
          es:"Suben más que unas simples protecciones: cubren la rodilla y el corvejón, donde el caballo se golpea cuando el remolque frena. ⚠️ El inglés dice *travel boots* en Inglaterra y *shipping boots* en Estados Unidos.",
          it:"Salgono più in alto di normali stinchiere: coprono ginocchio e garretto, dove il cavallo si urta quando il van frena. ⚠️ L'inglese dice *travel boots* in Inghilterra, *shipping boots* negli Stati Uniti.",
          de:"Sie reichen höher als normale Gamaschen und decken Knie und Sprunggelenk ab — genau dort stößt sich ein Pferd, wenn der Hänger bremst.",
          ja:"普通のプロテクターより高く、膝と飛節まで覆います。トレーラーがブレーキをかけたとき、馬がぶつけるのがそこだからです。",
          ar:"واقيات طويلة تغطي معظم القوائم، وقد تمتد من أسفل الركبة أو العرقوب حتى الحافر، فتحميها من الصدمات عندما يفقد الحصان توازنه أثناء النقل. ⚠️ الإنجليزية تقول *travel boots* في إنجلترا و*shipping boots* في الولايات المتحدة." } },

  { ref:"protege-queue", lecon:1, coll:"depart",
    mots:{ fr:{m:"le protège-queue"}, en:{m:"the tail guard", p:"tél gard", var:"tail bandage"}, es:{m:"el protector de cola"}, it:{m:"il paracoda"}, de:{m:"der Schweifschutz", p:"chvaïf-chouts"}, ja:{m:"尾のプロテクター", p:"o no purotekutā"},
           ar:{m:"واقي الذيل"} },
    def:{ fr:"Un cheval qui s'appuie sur la barre de recul peut user les crins de sa queue jusqu'au vif en un seul trajet. Le protège-queue se pose sur la queue, souvent par-dessus un bandage ; on vérifie surtout qu'il ne serre pas.",
          en:"A horse that leans on the breeching bar can rub its tail raw in a single journey. The guard goes over the tail, often on top of a bandage — the one thing that matters is that it must not be tight.",
          es:"Un caballo que se apoya en la barra trasera puede desgastarse la cola hasta la piel en un solo viaje. El protector se coloca sobre la cola, a menudo encima de una venda; lo esencial es que no apriete.",
          it:"Un cavallo che si appoggia alla barra posteriore può consumarsi la coda fino al vivo in un solo viaggio. Il paracoda si mette sulla coda, spesso sopra una fascia; l'essenziale è che non stringa.",
          de:"Ein Pferd, das sich an die Heckstange lehnt, kann sich den Schweif in einer einzigen Fahrt wund scheuern. Der Schutz kommt über den Schweif, oft über eine Bandage — vor allem darf er nicht einschnüren.",
          ja:"後方バーに寄りかかる馬は、一度の輸送で尾を擦り切ってしまうことがあります。プロテクターは尾に、多くは包帯の上から付けます。締めつけないことがいちばん大切です。",
          ar:"قد يؤدي احتكاك الذيل بالحاجز الخلفي إلى تلف شعره أو إصابة جلده. يوضع واقي الذيل حول قاعدة الذيل وفقا لتعليمات المنتج، من دون شد مفرط، وقد يستخدم وحده أو فوق ضماد بحسب نوعه." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-connemara.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"passeport", lecon:1, coll:"marques",
    mots:{ fr:{m:"le passeport"}, en:{m:"the passport", p:"pass-port"},
           es:{m:"el pasaporte"}, it:{m:"il passaporto"},
           de:{m:"der Pferdepass", p:"pfèr-de-pass"}, ja:{m:"馬パスポート", p:"uma pasupōto"},
           ar:{m:"جواز الحصان"} }, // ??
    def:{ fr:"Le document qui suit le cheval partout : signalement dessiné, épis, balzanes, vaccins, numéro de puce. Contrôlé à l'entrée de tout concours et de tout transport.",
          en:"The document that follows the horse everywhere: drawn markings, whorls, socks, vaccinations, chip number. Checked at every show and every border.",
          es:"El documento que sigue al caballo a todas partes: reseña dibujada, remolinos, calzados, vacunas, número de chip. Se controla a la entrada de todo concurso y todo transporte.",
          it:"Il documento che segue il cavallo ovunque: segnalamento disegnato, vortici, balzane, vaccini, numero di chip. Controllato all'ingresso di ogni concorso e di ogni trasporto.",
          de:"Das Dokument, das dem Pferd überallhin folgt: gezeichnete Beschreibung, Wirbel, Abzeichen, Impfungen, Chipnummer. Wird an jedem Turnier- und Transporteingang geprüft.",
          ja:"馬にどこまでもついて回る書類。図で描かれた特徴、つむじ、白斑、ワクチン、チップ番号。競技会でも輸送でも、入り口で必ず確認されます。",
          ar:"وثيقة تعريف ترافق الحصان أثناء نقله، وتتضمن رسم علاماته، ودوامات شعره، والعلامات البيضاء على قوائمه، والتطعيمات، ورقم الشريحة الإلكترونية. وقد تفحص عند الوصول إلى المسابقة أو أثناء عمليات المراقبة والنقل." } },

  { ref:"documents", lecon:1, coll:"depart",
    mots:{ fr:{m:"les papiers", var:"les documents"}, en:{m:"the documents", p:"do-kiou-meunts", var:"the paperwork"}, es:{m:"los documentos", var:"los papeles"}, it:{m:"i documenti"}, de:{m:"die Papiere", p:"pa-pi-re"}, ja:{m:"書類", p:"shorui"},
           ar:{m:"الوثائق"} },
    def:{ fr:"Passeport, vaccins à jour, parfois un certificat sanitaire selon la frontière. ⚠️ Un cheval sans papiers ne franchit pas une frontière européenne, et n'entre pas sur un terrain de concours.",
          en:"Passport, vaccinations up to date, sometimes a health certificate depending on the border. A horse without papers crosses nothing.",
          es:"Pasaporte, vacunas al día, a veces un certificado sanitario según la frontera. ⚠️ Un caballo sin papeles no cruza una frontera europea ni entra en un concurso.",
          it:"Passaporto, vaccinazioni in regola, a volte un certificato sanitario a seconda della frontiera. ⚠️ Un cavallo senza documenti non passa una frontiera europea.",
          de:"Pferdepass, gültige Impfungen, je nach Grenze auch ein Gesundheitszeugnis. ⚠️ Ohne Papiere überquert kein Pferd eine europäische Grenze.",
          ja:"パスポート、有効な予防接種、国境によっては健康証明書。⚠️ 書類のない馬は、欧州の国境も競技場も通れません。",
          ar:"جواز الحصان، وسجل التطعيمات الساري، وقد تلزم شهادة صحية ووثائق نقل أخرى بحسب بلد الانطلاق والوجهة ونوع الرحلة. تحققي من متطلبات السلطات والمنظم قبل السفر." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-urgences-med.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"trousse-secours", lecon:1, coll:"alerte",
    mots:{ fr:{m:"la trousse de secours"}, en:{m:"the first aid kit", p:"feurst éïd kite"},
           es:{m:"el botiquín"}, it:{m:"la cassetta del pronto soccorso"},
           de:{m:"der Verbandskasten", p:"feur-bannts-kass-teune"}, ja:{m:"救急箱", p:"kyūkyūbako"},
           ar:{m:"حقيبة الإسعافات الأولية"} },
    def:{ fr:"⚠️ Toute écurie doit en avoir une, et savoir demander **où elle est** vaut mieux que savoir ce qu'elle contient. En anglais **first aid kit** est figé : jamais « emergency kit », jamais « care kit ». L'espagnol a un mot unique, *el botiquín*, qui ne ressemble à rien d'autre.",
          en:"Every yard must have one, and knowing how to ask WHERE IT IS beats knowing what's in it. « First aid kit » is fixed — never « emergency kit ».",
          es:"Toda cuadra debe tener uno. « El botiquín » es una palabra única que no se parece a ninguna otra.",
          it:"Ogni scuderia deve averne una. Saper chiedere DOV'È vale più che sapere cosa contiene.",
          de:"Jeder Stall muss einen haben. Zu wissen, WO er ist, hilft mehr als zu wissen, was drin ist.",
          ja:"どの厩舎にも備えがあります。中身を知るより「どこにあるか」を尋ねられることが大切です。スペイン語の botiquín は他に似た語のない単語です。",
          ar:"⚠️ ينبغي أن تتوفر حقيبة إسعافات أولية في كل إسطبل، ومعرفة كيفية السؤال عن مكانها لا تقل أهمية عن معرفة محتوياتها. في الإنجليزية، **first aid kit** هي العبارة المعتادة، أما *emergency kit* و*care kit* فلهما معان أوسع أو مختلفة. وللإسبانية كلمة واحدة لا تشبه غيرها: *el botiquín*." } },

  /* ---------- la chute ---------- */

  /* ---------- la chute ---------- */


  /* ============ LEÇON 2 · EMBARQUER ET SÉCURISER ============ */

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-concours-reserve.js` à l'identique.
     ⚠️ CE CONCEPT SORT DE LA RÉSERVE : il y attendait une ville depuis le
     18/08, c'est Barcelone. Le retirer de `concours-reserve.js` dans le
     même geste, sinon deux fichiers portent la même `ref`. */
  { ref:"van", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"le van"}, en:{m:"the trailer", p:"tré-leur", var:"horsebox = le camion (GB)"},
           es:{m:"el remolque", var:"el camión"}, it:{m:"il van", var:"il camion"},
           de:{m:"der Pferdeanhänger", p:"pfèr-de-an-hèn-gueur"}, ja:{m:"馬運車", p:"bāunsha"},
           ar:{m:"المقطورة"} }, // ??
    def:{ fr:"⚠️ Faux ami à double fond : le mot français « van » vient de l'anglais *caravan*, mais l'anglais dit **trailer** pour le van attelé et **horsebox** pour le camion. Un Américain, lui, dit *trailer* pour les deux.",
          en:"French « van » comes from caravan, but English says trailer for the towed one and horsebox for the lorry.",
          es:"⚠️ Falso amigo de doble fondo: la palabra francesa « van » viene del inglés *caravan*, pero el inglés dice **trailer** para el remolque y **horsebox** para el camión. Un americano dice *trailer* para los dos.",
          it:"⚠️ Falso amico a doppio fondo: la parola francese « van » viene dall'inglese *caravan*, ma l'inglese dice **trailer** per il rimorchio e **horsebox** per il camion. Un americano dice *trailer* per entrambi.",
          de:"⚠️ Falscher Freund mit doppeltem Boden: Das französische « van » kommt vom englischen *caravan* — aber Englisch sagt **trailer** für den Anhänger und **horsebox** für den LKW. Ein Amerikaner sagt für beides *trailer*.",
          ja:"⚠️ 二重底の偽りの友：フランス語の « van » は英語の *caravan* 由来なのに、当の英語は牽引式を **trailer**、トラック型を **horsebox** と言います。アメリカ人はどちらも *trailer* です。",
          ar:"⚠️ صديق مزيف مزدوج القاع: الكلمة الفرنسية «van» من الإنجليزية *caravan*. في بريطانيا يقال **trailer** للمقطورة المجرورة و**horsebox** للمركبة الآلية المخصصة لنقل الخيل. وفي الولايات المتحدة يشيع **horse trailer** للمقطورة، وقد يقال *horse van* أو *horse truck* للمركبة الآلية بحسب نوعها." } },

  { ref:"camion-chevaux", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"le camion pour chevaux"}, en:{m:"the horsebox", p:"hors-boks", var:"the horse truck (US)"}, es:{m:"el camión para caballos"}, it:{m:"il camion per cavalli"}, de:{m:"der Pferdetransporter", p:"pfèr-de-trans-por-teur"}, ja:{m:"馬運車", p:"bāunsha", var:"トラック型"},
           ar:{m:"شاحنة الخيل"} },
    def:{ fr:"Motorisé, contrairement au van qu'on attelle. ⚠️ C'est ici que le faux ami se referme : *horsebox* en Angleterre, *horse truck* aux États-Unis — et *van* ne s'emploie dans ce sens ni dans l'un ni dans l'autre, sauf dans le composé *horse van*.",
          en:"Motorised, unlike a trailer you tow. Horsebox in Britain, horse truck in the United States — « van » on its own is not used in this sense, only in the compound « horse van ».",
          es:"Motorizado, a diferencia del remolque que se engancha. ⚠️ *Horsebox* en Inglaterra, *horse truck* en Estados Unidos; *van* no se usa en este sentido, salvo en *horse van*.",
          it:"Motorizzato, a differenza del rimorchio che si traina. ⚠️ *Horsebox* in Inghilterra, *horse truck* negli Stati Uniti; *van* non si usa in questo senso, se non in *horse van*.",
          de:"Motorisiert, anders als der Anhänger, den man zieht. ⚠️ *Horsebox* in England, *horse truck* in den USA — *van* wird in diesem Sinn nicht verwendet, außer in *horse van*.",
          ja:"牽引式のトレーラーと違い、自走式です。⚠️ 英国では *horsebox*、米国では *horse truck*。*van* 単独ではこの意味で使わず、*horse van* という複合語でのみ使われます。",
          ar:"ذات محرك، بخلاف المقطورة التي تجر. ⚠️ في بريطانيا يقال **trailer** للمقطورة المجرورة و**horsebox** للمركبة الآلية المخصصة لنقل الخيل. وفي الولايات المتحدة يشيع **horse trailer** للمقطورة، وقد يقال *horse van* أو *horse truck* للمركبة الآلية بحسب نوعها." } },

  { ref:"pont", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"le pont", var:"la rampe"}, en:{m:"the ramp", p:"ramp"}, es:{m:"la rampa"}, it:{m:"la rampa"}, de:{m:"die Rampe", p:"ram-pe"}, ja:{m:"スロープ", p:"surōpu"},
           ar:{m:"منحدر التحميل"} },
    def:{ fr:"⚠️ Le français dit « le pont » là où toutes les autres langues disent simplement « la rampe ». Un cavalier étranger ne comprendra pas « baisse le pont » traduit mot à mot.",
          en:"French calls it « le pont » — the bridge — where every other language just says ramp.",
          es:"⚠️ El francés dice « le pont » (el puente) donde todas las demás lenguas dicen simplemente rampa.",
          it:"⚠️ Il francese dice « le pont » (il ponte) dove tutte le altre lingue dicono semplicemente rampa.",
          de:"⚠️ Das Französische sagt « le pont », die Brücke, wo alle anderen Sprachen einfach Rampe sagen.",
          ja:"⚠️ フランス語だけが « le pont »（橋）と呼びます。他の言語はどれも単に「ランプ／スロープ」です。",
          ar:"⚠️ في الفرنسية يسمى منحدر التحميل «le pont»، بينما تستعمل لغات أخرى غالبا ما يقابل كلمة «rampe». لذلك لا ينبغي ترجمة التعبير الفرنسي «baisse le pont» بكلمة «الجسر» حرفيا." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-concours-reserve.js` à l'identique.
     ⚠️ SORT DE LA RÉSERVE, comme `van`. À retirer de `concours-reserve.js`. */
  { ref:"embarquer", lecon:2, coll:"embarquement", v:true,
    mots:{ fr:{m:"embarquer"}, en:{m:"to load", p:"lôde", var:"to box up"},
           es:{m:"embarcar", var:"cargar"}, it:{m:"caricare"},
           de:{m:"verladen", p:"fèr-la-deune"}, ja:{m:"積み込む", p:"tsumikomu"},
           ar:{m:"تحميل الحصان"} }, // ??
    def:{ fr:"Faire monter le cheval dans le van. Le premier obstacle de la journée, et parfois le plus difficile : un cheval qui refuse d'embarquer fait manquer l'épreuve avant même d'être sellé.",
          en:"Getting the horse in. The first obstacle of the day, and sometimes the hardest one.",
          es:"Hacer subir al caballo al remolque. El primer obstáculo del día, y a veces el más difícil: un caballo que se niega a embarcar hace perder la prueba antes incluso de ensillar.",
          it:"Far salire il cavallo nel van. Il primo ostacolo della giornata, e a volte il più difficile: un cavallo che rifiuta di salire fa mancare la prova prima ancora di sellare.",
          de:"Das Pferd in den Hänger verladen. Das erste Hindernis des Tages — und manchmal das schwerste: Ein Pferd, das nicht verlädt, lässt die Prüfung platzen, bevor gesattelt ist.",
          ja:"馬をトレーラーに乗せること。その日最初の障害物であり、ときに最難関です。積み込みを拒む馬は、鞍を置く前から競技を台無しにしてしまいます。",
          ar:"إدخال الحصان إلى مركبة النقل. قد يكون ذلك أول تحد في اليوم وأصعبه أحيانا، لأن الحصان الذي يرفض الصعود قد يتسبب في فوات الشوط قبل أن يجهز بالسرج." } },

  { ref:"debarquer", lecon:2, coll:"embarquement", v:true,
    mots:{ fr:{m:"débarquer"}, en:{m:"to unload", p:"eune-lôde", var:"to unbox"}, es:{m:"desembarcar", var:"descargar"}, it:{m:"far scendere"}, de:{m:"ausladen", p:"aouss-la-deune"}, ja:{m:"馬を降ろす", p:"uma o orosu"},
           ar:{m:"إنزال الحصان"} },
    def:{ fr:"Faire descendre le cheval. De préférence par l'avant quand le véhicule le permet ; certains chevaux descendent à reculons sans difficulté, à condition de les laisser aller à leur rythme — jamais dans la précipitation.",
          en:"Getting the horse out. Preferably through the front when the vehicle allows it; some horses back down without any trouble, as long as they are given their own time — never in a rush.",
          es:"Hacer bajar al caballo. Preferentemente por delante cuando el vehículo lo permite; algunos caballos bajan hacia atrás sin dificultad, siempre que se les deje ir a su ritmo — nunca con prisa.",
          it:"Far scendere il cavallo. Preferibilmente dalla parte anteriore quando il veicolo lo consente; alcuni cavalli scendono all'indietro senza difficoltà, purché li si lasci andare al loro ritmo — mai di fretta.",
          de:"Das Pferd herausbringen. Möglichst nach vorn, wenn das Fahrzeug es zulässt; manche Pferde treten problemlos rückwärts heraus, wenn man ihnen ihre Zeit lässt — nie hastig.",
          ja:"馬を降ろすこと。車両が許すなら前から降ろすのが望ましく、馬によっては後ろ向きでも問題なく降りられます。馬のペースを尊重し、決して慌てないこと。",
          ar:"إنزال الحصان من المركبة. تختلف الطريقة بحسب تصميم المركبة وتدريب الحصان: فقد يخرج إلى الأمام أو يتراجع بهدوء. تحققي من أن مكان الإنزال آمن، وسيطري على الحصان، واتبعي ترتيب فتح الحواجز والمنحدر الموصى به للمركبة." } },

  { ref:"stalle-transport", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"la stalle de transport"}, en:{m:"the bay", p:"bé", var:"the stall"}, es:{m:"el compartimento"}, it:{m:"il posto", var:"lo scomparto"}, de:{m:"der Stellplatz", p:"chtèl-plats"}, ja:{m:"輸送スペース", p:"yusō supēsu"},
           ar:{m:"حجرة النقل"} },
    def:{ fr:"La place d'un cheval dans le véhicule. Un van deux places, un camion six : c'est ce nombre qu'on annonce quand on cherche un transport.",
          en:"One horse's space in the vehicle. A two-bay trailer, a six-bay lorry — that number is what you quote when looking for transport.",
          es:"El sitio de un caballo en el vehículo. Un remolque de dos plazas, un camión de seis: es esa cifra la que se anuncia al buscar transporte.",
          it:"Il posto di un cavallo nel veicolo. Un van a due posti, un camion a sei: è questo numero che si annuncia quando si cerca un trasporto.",
          de:"Der Platz eines Pferdes im Fahrzeug. Ein Zweier-Hänger, ein Sechser-LKW — diese Zahl nennt man bei der Transportsuche.",
          ja:"車両の中の一頭分のスペース。2頭積みのトレーラー、6頭積みの馬運車 — 輸送を探すときはこの数を伝えます。",
          ar:"مكان الحصان في المركبة. مقطورة بمكانين، وشاحنة بستة: هذا العدد هو ما يعلن حين يبحث عن نقل." } },

  { ref:"barre-poitrail", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"la barre de poitrail"}, en:{m:"the breast bar", p:"brèst bar"}, es:{m:"la barra delantera"}, it:{m:"la barra anteriore"}, de:{m:"die Bruststange", p:"broust-chtan-gue"}, ja:{m:"胸前バー", p:"munemae bā"},
           ar:{m:"عارضة الصدر"} },
    def:{ fr:"La barre **devant** le cheval, qui l'empêche d'avancer. Elle se règle à la hauteur de sa poitrine : trop basse, il passe une jambe par-dessus.",
          en:"The bar **in front of** the horse, stopping him going forward. Set at chest height — too low and he can get a leg over it.",
          es:"La barra **delante** del caballo, que le impide avanzar. Se ajusta a la altura de su pecho: demasiado baja, pasa una pata por encima.",
          it:"La barra **davanti** al cavallo, che gli impedisce di avanzare. Si regola all'altezza del petto: troppo bassa, ci passa una gamba sopra.",
          de:"Die Stange **vor** dem Pferd, die es am Vorwärtsgehen hindert. Auf Brusthöhe einstellen — zu tief, und es hebt ein Bein darüber.",
          ja:"馬の**前**にあり、前進を止めるバー。胸の高さに合わせます。低すぎると脚を越してしまいます。",
          ar:"العارضة **أمام** الحصان، تمنعه من التقدم. تضبط على ارتفاع صدره: إذا انخفضت كثيرا مرر الحصان قائمة فوقها." } },

  { ref:"barre-recul", lecon:2, coll:"vehicule",
    mots:{ fr:{m:"la barre de recul"}, en:{m:"the breeching bar", p:"bri-tching bar", var:"the back bar"}, es:{m:"la barra trasera"}, it:{m:"la barra posteriore"}, de:{m:"die Heckstange", p:"hèk-chtan-gue"}, ja:{m:"後方バー", p:"kōhō bā"},
           ar:{m:"عارضة المؤخرة"} },
    def:{ fr:"La barre **derrière** le cheval, qui l'empêche de reculer. ⚠️ Le mot anglais *breeching* n'a rien à voir avec *breaking* : il désigne la partie du harnais qui passe derrière la croupe.",
          en:"The bar **behind** the horse, stopping him backing out. « Breeching » names the harness part that sits behind the quarters.",
          es:"La barra **detrás** del caballo, que le impide retroceder. ⚠️ La palabra inglesa *breeching* designa la parte del arnés que pasa por detrás de la grupa.",
          it:"La barra **dietro** il cavallo, che gli impedisce di indietreggiare. ⚠️ La parola inglese *breeching* indica la parte dei finimenti che passa dietro la groppa.",
          de:"Die Stange **hinter** dem Pferd, die es am Rückwärtsgehen hindert. ⚠️ Das englische *breeching* bezeichnet das Geschirrteil hinter der Kruppe.",
          ja:"馬の**後ろ**にあり、後退を止めるバー。⚠️ 英語の *breeching* は、尻の後ろを通る馬具の部分を指す語です。",
          ar:"العارضة **خلف** الحصان، تمنعه من التراجع. ⚠️ أما التعبير الإنجليزي **breeching bar** في سياق النقل فيشير إلى عارضة المؤخرة، في حين تدل كلمة *breeching* وحدها أيضا على جزء من الطقم يمر خلف الكفل." } },

  { ref:"attache-rapide", lecon:2, coll:"embarquement",
    mots:{ fr:{m:"l'attache rapide"}, en:{m:"the quick-release tie", p:"kwik-ri-liss taï", var:"a quick-release knot"}, es:{m:"el atado de seguridad"}, it:{m:"la legatura di sicurezza"}, de:{m:"die Sicherheitsanbindung", p:"zi-cheur-haïts-an-bin-doung"}, ja:{m:"安全結び", p:"anzen musubi"},
           ar:{m:"رباط الأمان سريع التحرير"} },
    def:{ fr:"Un nœud ou un mousqueton qui cède d'un geste. ⚠️ Un cheval attaché ferme dans un van qui bouge risque de se blesser à la nuque s'il se jette en arrière : l'attache doit céder avant lui.",
          en:"A knot or clip that gives way with one pull. ⚠️ A horse tied fast in a moving trailer risks injuring its poll if it throws itself backwards — the tie must give way before the horse does.",
          es:"Un nudo o mosquetón que cede de un gesto. ⚠️ Un caballo atado en firme en un remolque en movimiento corre el riesgo de lesionarse la nuca si se echa hacia atrás: el atado debe ceder antes que él.",
          it:"Un nodo o un moschettone che cede con un gesto. ⚠️ Un cavallo legato saldamente in un van in movimento rischia di ferirsi la nuca se si getta all'indietro: la legatura deve cedere prima di lui.",
          de:"Ein Knoten oder Karabiner, der sich mit einem Griff löst. ⚠️ Ein fest angebundenes Pferd riskiert im fahrenden Hänger eine Genickverletzung, wenn es sich zurückwirft — die Anbindung muss nachgeben, bevor das Pferd Schaden nimmt.",
          ja:"ひと動作で外れる結び方や金具。⚠️ 走行中の馬運車で固く繋がれた馬は、後ろへ引いたときに首の付け根を痛める恐れがあります。馬より先に結びが外れること。",
          ar:"عقدة أو مشبك يمكن تحريره بسرعة عند الطوارئ. ⚠️ يجب أن يكون الرباط مضبوط الطول ومثبتا في نقطة أمان قابلة للانفصال، لأن الربط غير المناسب قد يسبب إصابة أو تشابكا." } },

  { ref:"fermer-pont", lecon:2, coll:"embarquement", v:true,
    mots:{ fr:{m:"fermer le pont"}, en:{m:"to close the ramp", p:"klôze the ramp", var:"to put the ramp up"}, es:{m:"cerrar la rampa"}, it:{m:"chiudere la rampa"}, de:{m:"die Rampe schließen", p:"ram-pe chli-sseune"}, ja:{m:"スロープを閉める", p:"surōpu o shimeru"},
           ar:{m:"إغلاق منحدر التحميل"} },
    def:{ fr:"Le geste qui vient juste après l'embarquement, et jamais avant que la barre de recul soit en place. Deux personnes valent mieux qu'une : une au cheval, une au pont.",
          en:"The move that follows loading, and never before the breeching bar is in place. Two people beat one: one at the horse, one at the ramp.",
          es:"El gesto que viene justo después del embarque, y nunca antes de que la barra trasera esté puesta. Mejor dos personas: una al caballo, otra a la rampa.",
          it:"Il gesto che segue il carico, e mai prima che la barra posteriore sia a posto. Meglio in due: uno al cavallo, uno alla rampa.",
          de:"Der Griff direkt nach dem Verladen — nie bevor die Heckstange sitzt. Zu zweit besser als allein: einer am Pferd, einer an der Rampe.",
          ja:"積み込みの直後に行う動作。後方バーが掛かる前には絶対に閉めません。二人がかりが基本 — 一人は馬に、一人はスロープに。",
          ar:"يؤمن الحصان أولا بوضع عارضة المؤخرة في مكانها، ثم يربط برباط الأمان، وبعد ذلك يغلق منحدر التحميل وفقا لتعليمات المركبة. ومن الأفضل أن يتولى شخص الحصان ويتولى آخر المنحدر." } },


  /* ============ LEÇON 3 · LE VOYAGE ET L'ARRIVÉE ============ */

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
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
          ar:"عشب يحصد ثم يجفف، وهو من أهم الأعلاف الخشنة للحصان. تحتاج الخيول عادة إلى كمية يومية من المادة الجافة في العلف الخشن تقارب 1,5 إلى 2 % من وزن الجسم، مع تعديلها بحسب الحالة والعمل وتوجيهات المختص." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"filet-foin", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le filet à foin"}, en:{m:"the haynet", p:"hé-nett"},
           es:{m:"la red de heno"}, it:{m:"la rete per il fieno"},
           de:{m:"das Heunetz", p:"hoï-nets"}, ja:{m:"干し草ネット", p:"hoshikusa netto"},
           ar:{m:"شبكة الدريس"} },
    def:{ fr:"Filet à mailles serrées qui ralentit la prise de foin. À accrocher assez haut pour qu'un pied ne s'y prenne pas.",
          en:"Small-mesh net that slows hay intake. Tie it high enough that a foot cannot get caught.",
          es:"Red de malla estrecha que ralentiza la toma de heno. Se cuelga bastante alto para que un pie no se enganche.",
          it:"Rete a maglie strette che rallenta l'assunzione del fieno. Da appendere abbastanza in alto perché un piede non vi si impigli.",
          de:"Engmaschiges Netz, das die Heuaufnahme verlangsamt. Hoch genug aufhängen, damit sich kein Huf verfängt.",
          ja:"目の細かい網で、乾草を食べる速さをゆるめます。蹄が引っかからない高さに吊るすこと。",
          ar:"شبكة ضيقة العيون تبطئ تناول الدريس. تثبت بإحكام على ارتفاع يمنع تعلق القوائم بها، مع السماح للحصان بوضع رأسه في وضع مريح." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"seau", lecon:3, coll:"outils",
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
          ar:"وعاء للماء أو للعليقة. غالبا ما يوجد اثنان في الحجرة: واحد للشرب، وواحد للعلف المحبب." } },

  /* ================= LEÇON 3 · L'EAU ET LA NOURRITURE ================= */

  /* ================= LEÇON 3 · L'EAU ET LA NOURRITURE ================= */

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
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
          ar:"أول الاحتياجات: من 30 إلى 50 لترا في اليوم، وأكثر في الحر الشديد أو أثناء العمل." } },

  /* ================= LEÇON 4 · TENIR, ATTACHER, LES GESTES ================= */

  /* ================= LEÇON 4 · TENIR, ATTACHER, LES GESTES ================= */

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-ecurie.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"ration", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la ration"}, en:{m:"the feed", p:"fid", var:"the ration"},
           es:{m:"la ración"}, it:{m:"la razione"},
           de:{m:"die Futterration", p:"fou-teur-ra-tsion"}, ja:{m:"飼料", p:"shiryō"},
           ar:{m:"العليقة"} },
    def:{ fr:"Ce qu'un cheval reçoit à un repas donné. Se pèse, ne s'estime pas à l'œil.",
          en:"What a horse gets at a given meal. It is weighed, not guessed.",
          es:"Lo que un caballo recibe en una comida dada. Se pesa, no se calcula a ojo.",
          it:"Ciò che un cavallo riceve a un dato pasto. Si pesa, non si stima a occhio.",
          de:"Was ein Pferd zu einer Mahlzeit bekommt. Wird gewogen, nicht nach Augenmaß geschätzt.",
          ja:"一回の食事で馬に与える量。目分量ではなく、量りで計ります。",
          ar:"ما يتلقاه الحصان في وجبة واحدة. توزن، ولا تقدر بالعين." } },

  { ref:"voyage", lecon:3, coll:"route",
    mots:{ fr:{m:"le voyage", var:"le trajet"}, en:{m:"the journey", p:"djeur-ni", var:"the trip"}, es:{m:"el viaje"}, it:{m:"il viaggio"}, de:{m:"die Fahrt", p:"fart"}, ja:{m:"移動", p:"idō", var:"輸送"},
           ar:{m:"الرحلة"} },
    def:{ fr:"Un cheval debout dans un véhicule qui roule travaille : il rattrape chaque virage avec ses membres. Plusieurs heures de route fatiguent réellement, même s'il n'a fait que rester debout.",
          en:"A horse standing in a moving vehicle is working: it catches every bend with its legs. Several hours on the road are genuinely tiring, even though it did nothing but stand.",
          es:"Un caballo de pie en un vehículo en marcha trabaja: compensa cada curva con sus miembros. Varias horas de viaje cansan de verdad, aunque no haya hecho más que estar de pie.",
          it:"Un cavallo in piedi in un veicolo in movimento lavora: compensa ogni curva con gli arti. Diverse ore di strada stancano davvero, anche se non ha fatto altro che stare in piedi.",
          de:"Ein Pferd, das im fahrenden Fahrzeug steht, arbeitet: Es fängt jede Kurve mit den Beinen ab. Mehrere Stunden Fahrt ermüden wirklich, auch wenn es nur gestanden hat.",
          ja:"走行中の車内で立っている馬は働いています。カーブのたびに四肢で踏ん張るからです。数時間の移動は、立っていただけでも本当に疲れます。",
          ar:"يبذل الحصان الواقف في مركبة متحركة جهدا للحفاظ على توازنه في المنعطفات وعند التسارع والكبح، ولذلك قد تكون الرحلات الطويلة مرهقة." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-cours.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"pause", lecon:3, coll:"deroule",
    mots:{ fr:{m:"la pause", dit:"On fait une pause !"},
           en:{m:"a break", p:"brék", dit:"Take a breather !"},
           es:{m:"el descanso", dit:"¡ Un descanso !"},
           it:{m:"la pausa", dit:"Una pausa !"},
           de:{m:"die Pause", p:"pao-ze", dit:"Pause !"},
           ja:{m:"休憩", p:"kyūkei", dit:"休憩 !"},
           ar:{m:"الاستراحة"} },
    def:{ fr:"Un temps de marche au pas, rênes longues, au milieu du cours.",
          en:"A spell of walking on a long rein in the middle of the lesson.",
          es:"Un tiempo de marcha al paso, riendas largas, en medio de la clase.",
          it:"Un tempo di marcia al passo, redini lunghe, a metà della lezione.",
          de:"Eine Schrittphase am langen Zügel mitten in der Stunde.",
          ja:"レッスンの途中に挟む、長い手綱での常歩の時間。",
          ar:"توقف مخطط أثناء الرحلة لفحص الحصان والمركبة، ومراقبة التهوية، وتقديم الماء عند الحاجة. لا ينزل الحصان إلا في مكان آمن ومخصص لذلك ووفقا لخطة الرحلة." } },

  { ref:"aire-repos", lecon:3, coll:"route",
    mots:{ fr:{m:"l'aire de repos"}, en:{m:"the rest stop", p:"rèst stop", var:"the services (GB)"}, es:{m:"el área de descanso"}, it:{m:"l'area di sosta"}, de:{m:"der Rastplatz", p:"rast-plats"}, ja:{m:"休憩所", p:"kyūkeijo", var:"サービスエリア"},
           ar:{m:"منطقة الاستراحة"} },
    def:{ fr:"On s'y arrête à l'ombre, moteur coupé, en surveillant l'aération. On débarque rarement — mais par forte chaleur, laisser le véhicule fermé est plus dangereux que de l'ouvrir. ⚠️ En Angleterre on dit *the services*, jamais *the rest stop*.",
          en:"You stop in the shade, engine off, keeping an eye on the airflow. You rarely unload — but in real heat, leaving the vehicle shut is more dangerous than opening it. In Britain: the services.",
          es:"Se para a la sombra, con el motor apagado, vigilando la ventilación. Rara vez se desembarca, pero con mucho calor dejar el vehículo cerrado es más peligroso que abrirlo. ⚠️ En Inglaterra se dice *the services*.",
          it:"Ci si ferma all'ombra, motore spento, controllando la ventilazione. Raramente si fa scendere il cavallo, ma con molto caldo tenere il veicolo chiuso è più pericoloso che aprirlo. ⚠️ In Inghilterra si dice *the services*.",
          de:"Man hält im Schatten, Motor aus, und achtet auf die Belüftung. Ausgeladen wird selten — bei großer Hitze ist ein geschlossenes Fahrzeug aber gefährlicher als ein offenes. ⚠️ In England heißt es *the services*.",
          ja:"日陰にエンジンを切って停め、換気に気を配ります。馬を降ろすことはまれですが、暑さが厳しいときは閉め切ったままのほうが危険です。⚠️ 英国では *the services* と言います。",
          ar:"مكان مخصص للتوقف أثناء الطريق. أوقفي المركبة في موضع آمن ومظلل إن أمكن، وأطفئي المحرك، وحافظي على تهوية مناسبة من دون فتح باب أو منحدر قد يسمح للحصان بالخروج. لا ينزل الحصان على جانب الطريق إلا بتوجيه من الجهات المختصة أو في حالة طوارئ منظمة." } },

  /* ♻️ RAPPEL — repris de `hype-lingo-lex-froid.js` à l'identique, même `ref`, mêmes six
     langues, même définition. Rien réécrit, rien retraduit. */
  { ref:"temperature", lecon:3, coll:"froid",
    mots:{ fr:{m:"la température"}, en:{m:"the temperature", p:"tèm-pri-tcheur"},
           es:{m:"la temperatura"}, it:{m:"la temperatura"},
           de:{m:"die Temperatur", p:"tèm-pé-ra-tour"}, ja:{m:"気温", p:"kion"},
           ar:{m:"درجة الحرارة"} },
    def:{ fr:"⚠️ LE CANADA COMPTE EN CELSIUS comme l'Europe — contrairement aux États-Unis, qui sont en Fahrenheit. À Calgary, moins vingt en janvier n'a rien d'exceptionnel, et les concours d'hiver se courent en intérieur pour cette raison. 🟥 « La température devrait descendre » se dit **temperatures are expected to drop**, jamais « to go down » dans un bulletin.",
          en:"Canada counts in Celsius like Europe, unlike the United States. At Calgary, minus twenty in January is nothing unusual, and that's why the winter shows are run indoors. « Temperatures are expected to drop », not « to go down ».",
          es:"Canadá cuenta en Celsius como Europa, al contrario que Estados Unidos. En Calgary, veinte bajo cero en enero no tiene nada de excepcional.",
          it:"Il Canada conta in Celsius come l'Europa, al contrario degli Stati Uniti. A Calgary, venti sotto zero a gennaio non ha nulla di eccezionale.",
          de:"Kanada rechnet in Celsius wie Europa, anders als die USA. In Calgary sind minus zwanzig im Januar nichts Besonderes.",
          ja:"カナダはヨーロッパと同じ摂氏を使います。アメリカ合衆国は華氏です。カルガリーでは一月の氷点下二十度は珍しくなく、だから冬の競技会は屋内で行われます。",
          ar:"قد ترتفع درجة الحرارة داخل مركبة النقل أكثر من درجة الحرارة في الخارج، ولا سيما عند الوقوف أو ضعف التهوية. راقبيها بمقياس حرارة، وعدلي التهوية، ولا تتركي المركبة مغلقة تحت الشمس." } },

  { ref:"ventilation", lecon:3, coll:"route",
    mots:{ fr:{m:"la ventilation"}, en:{m:"the ventilation", p:"ven-ti-lé-cheune", var:"the airflow"}, es:{m:"la ventilación"}, it:{m:"la ventilazione"}, de:{m:"die Belüftung", p:"be-lüf-toung"}, ja:{m:"換気", p:"kanki"},
           ar:{m:"التهوية"} },
    def:{ fr:"⚠️ Le danger d'un transport n'est presque jamais le froid, c'est l'air qui ne circule pas. Un véhicule à l'arrêt au soleil, portes fermées, monte plus vite qu'une voiture.",
          en:"The danger in transport is almost never cold — it is still air. A vehicle parked in the sun with the doors shut heats faster than a car.",
          es:"⚠️ El peligro de un transporte casi nunca es el frío, sino el aire que no circula. Un vehículo parado al sol, con las puertas cerradas, sube de temperatura más rápido que un coche.",
          it:"⚠️ Il pericolo di un trasporto non è quasi mai il freddo, ma l'aria che non circola. Un veicolo fermo al sole, a porte chiuse, si scalda più in fretta di un'auto.",
          de:"⚠️ Die Gefahr beim Transport ist fast nie die Kälte, sondern die stehende Luft. Ein Fahrzeug in der Sonne mit geschlossenen Türen heizt schneller auf als ein Auto.",
          ja:"⚠️ 輸送の危険はほとんどの場合、寒さではなく空気が動かないことです。日なたに停めた密閉車内は、乗用車より速く温度が上がります。",
          ar:"سوء التهوية وارتفاع الحرارة والرطوبة من أهم مخاطر النقل، وقد يشكل البرد أو التيارات الهوائية الشديدة خطرا أيضا. يجب الحفاظ على تجدد الهواء ومراقبة الحصان ودرجة الحرارة طوال الرحلة." } },

  { ref:"arrivee-transport", lecon:3, coll:"route",
    mots:{ fr:{m:"l'arrivée"}, en:{m:"the arrival", p:"a-raï-veul"}, es:{m:"la llegada"}, it:{m:"l'arrivo"}, de:{m:"die Ankunft", p:"an-kounft"}, ja:{m:"到着", p:"tōchaku"},
           ar:{m:"الوصول"} },
    def:{ fr:"On coupe le moteur, on laisse le cheval reprendre son équilibre avant d'ouvrir — sauf par forte chaleur, où l'aération passe d'abord. Descendre dans la seconde qui suit l'arrêt, c'est le faire trébucher.",
          en:"Engine off, and let the horse find its balance again before opening up — except in real heat, where airflow comes first. Unloading the second you stop is how a horse stumbles down the ramp.",
          es:"Se apaga el motor y se deja que el caballo recupere el equilibrio antes de abrir — salvo con mucho calor, cuando la ventilación es lo primero. Bajarlo justo al parar es hacerle tropezar.",
          it:"Si spegne il motore e si lascia che il cavallo ritrovi l'equilibrio prima di aprire — salvo con molto caldo, quando la ventilazione viene prima. Farlo scendere appena fermi significa farlo inciampare.",
          de:"Motor aus, und dem Pferd Zeit lassen, sein Gleichgewicht wiederzufinden, bevor man öffnet — außer bei großer Hitze, dann geht die Belüftung vor. Sofort nach dem Halt auszuladen heißt, es stolpern zu lassen.",
          ja:"エンジンを切り、開ける前に馬が体勢を立て直す時間を取ります。ただし暑さが厳しいときは換気が先です。停まった直後に降ろすと、馬はスロープでつまずきます。",
          ar:"عند الوصول، أوقفي المركبة في مكان مستو وآمن وثبتيها، ثم افحصي الحصان ومكان الإنزال قبل فتح المنحدر وإنزاله بهدوء وفقا لإجراءات المركبة. لا تؤخري تحسين التهوية إذا كان الجو حارا." } }
  ],

  /* Aucune phrase d'exercice : le brief n'en prévoit pas. Les 21 phrases
     ci-dessous sont le dialogue, pas des exercices de leçon. */
  phrases: [],

  dialogue: {
    ville: "barcelone",
    temps: 6,
    langues: ["fr","en","es","it","de","ja","ar"],
    titres: { 1:"Préparer le départ", 2:"Embarquer", 3:"Sécuriser le cheval",
              4:"Sur la route", 5:"Arrivée à Barcelone", 6:"Après le voyage" },
    phrases: [

      { ref:"d-bcn-ou-licol", temps:1, dit:"joueuse", mots:["licol"],
        fr:"Où est le licol de ce cheval ?",
        en:"Where is this horse's halter?",
        es:"¿Dónde está la cabezada de este caballo?",
        it:"Dov'è la capezza di questo cavallo?",
        de:"Wo ist das Halfter für dieses Pferd?",
        ja:"この馬の無口はどこですか？",
        ar:"أين رسن هذا الحصان؟" },

      { ref:"d-bcn-attache-camion", temps:1, dit:"club", mots:["attacher", "camion-chevaux"],
        fr:"Attache-le pendant que je prépare le camion.",
        en:"Tie him up while I get the horsebox ready.",
        es:"Átalo mientras preparo el camión.",
        it:"Legalo mentre preparo il camion.",
        de:"Binde ihn an, während ich den Pferdetransporter vorbereite.",
        ja:"私が馬運車を準備している間、この馬をつないでください。",
        ar:"أمسكيه بينما أتحقق من جاهزية الشاحنة." },

      { ref:"d-bcn-protections", temps:1, dit:"club", mots:["protections-transport"],
        fr:"Mets-lui ses protections de transport.",
        en:"Put his travel boots on.",
        es:"Ponle los protectores de transporte.",
        it:"Mettigli le protezioni da trasporto.",
        de:"Zieh ihm die Transportgamaschen an.",
        ja:"輸送用プロテクターを着けてください。",
        ar:"ضعي له واقيات النقل." },

      { ref:"d-bcn-passeport-trousse", temps:1, dit:"club", mots:["passeport", "trousse-secours"],
        fr:"N'oublie pas son passeport et la trousse de secours.",
        en:"Don't forget his passport and the first-aid kit.",
        es:"No olvides su pasaporte y el botiquín.",
        it:"Non dimenticare il passaporto e il kit di pronto soccorso.",
        de:"Vergiss seinen Pferdepass und das Erste-Hilfe-Set nicht.",
        ja:"馬のパスポートと救急セットを忘れないでください。",
        ar:"لا تنسي جواز سفره وحقيبة الإسعافات الأولية." },

      { ref:"d-bcn-embarque-facile", temps:2, dit:"joueuse", mots:["embarquer"],
        fr:"Est-ce qu'il embarque facilement ?",
        en:"Does he load easily?",
        es:"¿Sube fácilmente al remolque?",
        it:"Sale facilmente sul trailer?",
        de:"Lässt er sich leicht verladen?",
        ja:"この馬は簡単に馬運車に乗りますか？",
        ar:"هل يصعد إلى مركبة النقل بسهولة؟" },

      { ref:"d-bcn-temps-pont", temps:2, dit:"club", mots:["pont"],
        fr:"Non, laisse-lui un peu de temps devant le pont.",
        en:"No, give him a little time in front of the ramp.",
        es:"No, dale un poco de tiempo delante de la rampa.",
        it:"No, dagli un po' di tempo davanti alla rampa.",
        de:"Nein, gib ihm vor der Rampe etwas Zeit.",
        ja:"いいえ、スロープの前で少し時間をあげてください。",
        ar:"لا، أمهليه قليلا أمام منحدر التحميل." },

      { ref:"d-bcn-longe-devant", temps:2, dit:"club", mots:["longe"],
        fr:"Prends la longe et marche devant lui.",
        en:"Take the lead rope and walk in front of him.",
        es:"Coge el ramal y camina delante de él.",
        it:"Prendi la lunghina e cammina davanti a lui.",
        de:"Nimm den Führstrick und geh vor ihm.",
        ja:"引き綱を持って、馬の前を歩いてください。",
        ar:"خذي حبل القيادة وقوديه بهدوء وفق الطريقة التي تدرب عليها، ولا تلفي الحبل حول يدك." },

      { ref:"d-bcn-monte-fermer", temps:2, dit:"club", mots:["embarquer", "barre-recul"],
        fr:"Parfait, il est monté. Mets la barre de recul en place.",
        en:"Perfect, he's in. Put the breeching bar in place.",
        es:"Perfecto, ya está dentro. Coloca la barra trasera.",
        it:"Perfetto, è dentro. Metti la barra posteriore.",
        de:"Perfekt, er ist drin. Mach die Heckstange fest.",
        ja:"よし、乗りました。後方バーを掛けてください。",
        ar:"ممتاز، لقد صعد. ثبتي عارضة المؤخرة في مكانها." },

      { ref:"d-bcn-attache-rapide", temps:3, dit:"club", mots:["attache-rapide", "attacher"],
        fr:"Puis attache-le avec une attache rapide.",
        en:"Then tie him with a quick-release tie.",
        es:"Luego átalo con un sistema de seguridad.",
        it:"Poi legalo con una legatura di sicurezza.",
        de:"Dann binde ihn mit einer Sicherheitsanbindung an.",
        ja:"それから、安全に外せる結び方でつないでください。",
        ar:"ثم اربطيه بعقدة أمان سريعة التحرير في نقطة الانفصال المخصصة لذلك." },

      { ref:"d-bcn-barre-recul", temps:3, dit:"club", mots:["fermer-pont"],
        fr:"Maintenant ferme le pont, et vérifie tout avant de partir.",
        en:"Now close the ramp, and check everything before we leave.",
        es:"Ahora cierra la rampa y comprueba todo antes de salir.",
        it:"Ora chiudi la rampa e controlla tutto prima di partire.",
        de:"Jetzt schließ die Rampe und kontrolliere alles vor der Abfahrt.",
        ja:"では、スロープを閉めて、出発前にすべて確認してください。",
        ar:"الآن أغلقي منحدر التحميل، وتحققي من جميع وسائل الإغلاق قبل الانطلاق." },

      { ref:"d-bcn-filet-haut", temps:3, dit:"club", mots:["filet-foin", "foin"],
        fr:"Accroche le filet à foin assez haut.",
        en:"Hang the haynet high enough.",
        es:"Cuelga la red de heno suficientemente alta.",
        it:"Appendi la rete da fieno abbastanza in alto.",
        de:"Häng das Heunetz hoch genug auf.",
        ja:"ヘイネットを十分高い位置に掛けてください。",
        ar:"ثبتي شبكة الدريس على ارتفاع آمن يمنع تعلق قوائمه بها." },

      { ref:"d-bcn-duree-trajet", temps:4, dit:"joueuse", mots:["voyage"],
        fr:"Combien de temps dure le trajet jusqu'à Barcelone ?",
        en:"How long is the journey to Barcelona?",
        es:"¿Cuánto dura el viaje hasta Barcelona?",
        it:"Quanto dura il viaggio fino a Barcellona?",
        de:"Wie lange dauert die Fahrt nach Barcelona?",
        ja:"バルセロナまでの移動はどのくらいかかりますか？",
        ar:"كم تستغرق الرحلة إلى برشلونة؟" },

      { ref:"d-bcn-trois-heures", temps:4, dit:"club", mots:["voyage"],
        fr:"Nous avons encore trois heures de route.",
        en:"We still have three hours to go.",
        es:"Todavía nos quedan tres horas de viaje.",
        it:"Abbiamo ancora tre ore di viaggio.",
        de:"Wir haben noch drei Stunden Fahrt vor uns.",
        ja:"あと3時間かかります。",
        ar:"ما زالت أمامنا ثلاث ساعات على الطريق." },

      { ref:"d-bcn-pause-heure", temps:4, dit:"club", mots:["pause"],
        fr:"On fera une pause dans une heure.",
        en:"We'll stop for a break in an hour.",
        es:"Haremos una parada dentro de una hora.",
        it:"Faremo una sosta tra un'ora.",
        de:"In einer Stunde machen wir eine Pause.",
        ja:"1時間後に休憩します。",
        ar:"سنتوقف للاستراحة بعد ساعة." },

      { ref:"d-bcn-verifie-eau", temps:4, dit:"club", mots:["eau"],
        fr:"Vérifie qu'il a de l'eau.",
        en:"Check that he has water.",
        es:"Comprueba que tenga agua.",
        it:"Controlla che abbia dell'acqua.",
        de:"Kontrolliere, ob er Wasser hat.",
        ja:"水があるか確認してください。",
        ar:"تحققي من توفر ماء نظيف، وقدميه له في وقت التوقف وفقا لخطة الرحلة." },

      { ref:"d-bcn-chaud-ventilation", temps:4, dit:"club", mots:["ventilation", "temperature"],
        fr:"Il fait chaud, augmente la ventilation.",
        en:"It's hot, increase the ventilation.",
        es:"Hace calor, aumenta la ventilación.",
        it:"Fa caldo, aumenta la ventilazione.",
        de:"Es ist heiß, erhöhe die Belüftung.",
        ja:"暑いので、換気を強くしてください。",
        ar:"الجو حار، حسني التهوية وراقبي درجة الحرارة." },

      { ref:"d-bcn-arrives-attendre", temps:5, dit:"club", mots:["arrivee-transport", "debarquer"],
        fr:"Nous sommes arrivés, mais ne le débarque pas tout de suite.",
        en:"We've arrived, but don't unload him yet.",
        es:"Hemos llegado, pero no lo desembarques todavía.",
        it:"Siamo arrivati, ma non farlo scendere subito.",
        de:"Wir sind angekommen, aber lade ihn noch nicht aus.",
        ja:"到着しましたが、まだ馬を降ろさないでください。",
        ar:"لقد وصلنا، لكن انتظري حتى تثبت المركبة ونتأكد من أن مكان الإنزال آمن." },

      { ref:"d-bcn-ouvre-pont", temps:5, dit:"club", mots:["pont"],
        fr:"Ouvre le pont doucement.",
        en:"Open the ramp slowly.",
        es:"Abre la rampa despacio.",
        it:"Apri lentamente la rampa.",
        de:"Öffne die Rampe langsam.",
        ja:"スロープをゆっくり開けてください。",
        ar:"افتحي منحدر التحميل برفق، وقفي إلى جانبه لا تحته." },

      { ref:"d-bcn-debarque-seau", temps:5, dit:"club", mots:["debarquer", "seau"],
        fr:"Je vais le débarquer pendant que tu prends son seau.",
        en:"I'll unload him while you get his bucket.",
        es:"Voy a bajarlo mientras coges su cubo.",
        it:"Lo faccio scendere mentre tu prendi il suo secchio.",
        de:"Ich lade ihn aus, während du seinen Eimer holst.",
        ja:"私が馬を降ろすので、その間にバケツを取ってください。",
        ar:"سأنزله بينما تأخذين دلوه." },

      { ref:"d-bcn-marcher-apres", temps:6, dit:"club", mots:["voyage"],
        fr:"Fais-le marcher quelques minutes après le voyage.",
        en:"Walk him for a few minutes after the journey.",
        es:"Hazlo caminar unos minutos después del viaje.",
        it:"Fallo camminare per qualche minuto dopo il viaggio.",
        de:"Führe ihn nach der Fahrt ein paar Minuten im Schritt.",
        ja:"移動の後、数分歩かせてください。",
        ar:"دعيه يمشي بضع دقائق بعد الرحلة." },

      { ref:"d-bcn-eau-avant-ration", temps:6, dit:"club", mots:["eau", "ration"],
        fr:"Donne-lui de l'eau avant sa ration.",
        en:"Give him some water before his feed.",
        es:"Dale agua antes de su ración.",
        it:"Dagli dell'acqua prima della razione.",
        de:"Gib ihm vor seiner Futterration Wasser.",
        ja:"飼料を与える前に水をあげてください。",
        ar:"قدمي له الماء أولا، ثم أعطيه عليقته وفقا لخطة تغذيته." }

    ]
  }
};
