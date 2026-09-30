/* hype-lingo-lex-andalou.js — Hype Linguae · Jerez · « L'art équestre »
   ==================================================================
   11 CONCEPTS, UNE LEÇON. Ville : JEREZ.

   🟥 POURQUOI CE FICHIER EXISTE — 17 août 2026, session 214.
   Jerez utilisait la LEÇON 4 de `cheval` — le hongre, l'étalon, la
   jument, le poulain, l'âge, le caractère, la race, le sang chaud. Ce
   vocabulaire du SEXE, DE L'ÂGE ET DU TYPE ne disait rien de Jerez, et
   il disait tout du jeune cheval. Constat de Blandine : *« si on prend
   des mots de Jerez pour mettre dans Fontainebleau, ça libérerait Jerez
   pour autre chose »*. La leçon 4 est donc partie à FONTAINEBLEAU, et
   Jerez a reçu ce chapitre-ci.

   🟥 JEREZ, C'EST LA REAL ESCUELA ANDALUZA DEL ARTE ECUESTRE, et son
   spectacle *Cómo bailan los caballos andaluces* — « comment dansent
   les chevaux andalous » : un ballet équestre, avec musique espagnole,
   costumes du XVIIIe siècle et chorégraphies tirées du dressage
   classique, de la doma vaquera et du travail en main.

   ⚠️ NE PAS CONFONDRE JEREZ ET SÉVILLE, les deux villes espagnoles :
   · **SÉVILLE** (`parade`) = la Feria, la parade, le costume, l'amazone,
     les attelages. On se montre, personne ne juge.
   · **JEREZ** (ici) = la formation ARTISTIQUE du cheval, la haute
     école, les figures, la précision, le spectacle. On travaille des
     années pour quelques minutes.
   NE PAS mélanger leurs vocabulaires.

   🟥 LE PIÈGE DU CHAPITRE : **HIGH SCHOOL**.
   *High-school movements* ne veut pas dire « mouvements de lycée » : en
   équitation, **high school** est le calque du français HAUTE ÉCOLE.
   L'anglais garde d'ailleurs souvent le français tel quel — *haute
   école* — comme il garde *passage*, *piaffe* et *pirouette*.
   ⚠️ Aux États-Unis, où *high school* ne veut dire QUE lycée, on préfère
   *the airs above the ground* pour les airs relevés.

   ⚠️ CINQ MOTS DE CE CHAPITRE VIVENT AILLEURS et s'emploient en
   `motsAilleurs` : `piaffer`, `passage`, `pirouette`,
   `changement-pied` sont chez WINDSOR (dressage leçon 2) ;
   `travail-pied` est chez SANTA YNEZ. C'est voulu : le dressage
   classique et le horsemanship se rejoignent sur le travail à pied, et
   le montrer vaut mieux que de dupliquer les entrées.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. L'espagnol de ce chapitre est celui
   d'une institution précise ; l'allemand et le japonais du vocabulaire
   de haute école sont techniques. Les entrées marquées // ?? sont
   celles dont je suis le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.andalou = {
  ref: "andalou",
  chapitre: 27,
  titre: { fr:"L'art équestre", en:"Equestrian art", es:"El arte ecuestre",
           it:"L'arte equestre", de:"Die Reitkunst", ja:"馬術の芸術",
           ar:"فن الفروسية" },
  lecons: 2,

  concepts: [

  { ref:"art-equestre", lecon:1, coll:"art",
    mots:{ fr:{m:"l'art équestre"}, en:{m:"equestrian art", p:"i-kwès-tri-eune arte"},
           es:{m:"el arte ecuestre"}, it:{m:"l'arte equestre"},
           de:{m:"die Reitkunst", p:"raït-kounnst"}, ja:{m:"馬術の芸術", p:"bajutsu no geijutsu"},
           ar:{m:"فن الفروسية"} },
    def:{ fr:"🟥 CE QUI SÉPARE L'ART DU SPORT : le sport se mesure, l'art se regarde. Ici personne ne compte les points — on juge si c'était beau, et « beau » veut dire que le cheval avait l'air d'avoir choisi. ⚠️ L'allemand dit **Reitkunst**, « l'art de monter », qui met le cavalier au centre ; le français dit « art équestre », qui met le cheval.",
          en:"What separates art from sport: sport is measured, art is watched. Nobody counts faults here — you judge whether it was beautiful, and beautiful means the horse looked as though he had chosen. German says Reitkunst, the art of riding, putting the rider at the centre; French says equestrian art, putting the horse there.",
          es:"Lo que separa el arte del deporte: el deporte se mide, el arte se mira. Aquí nadie cuenta los puntos: se juzga si fue bello, y bello quiere decir que el caballo parecía haber elegido.",
          it:"Ciò che separa l'arte dallo sport: lo sport si misura, l'arte si guarda. Qui nessuno conta i punti: si giudica se era bello, e bello vuol dire che il cavallo sembrava aver scelto.",
          de:"Was Kunst vom Sport trennt: Sport wird gemessen, Kunst wird angeschaut. Hier zählt niemand Fehler — man beurteilt, ob es schön war, und schön heißt, dass das Pferd aussah, als hätte es gewählt.",
          ja:"芸術と競技を分けるもの。競技は測られ、芸術は見られます。ここでは誰も減点を数えません。美しかったかどうかが問われ、「美しい」とは、馬が自ら選んだように見えるということです。",
          ar:"🟥 ما يفصل الفن عن الرياضة: الرياضة تقاس، والفن يشاهد. هنا لا أحد يعد النقاط — بل يحكم على الجمال، و«الجميل» يعني أن الحصان بدا كأنه اختار بنفسه. ⚠️ الألمانية تقول **Reitkunst**، أي «فن الركوب»، فتضع الفارس في المركز؛ أما الفرنسية فتقول «الفن الفروسي»، فتضع الحصان في المركز." } },

  { ref:"haute-ecole", lecon:1, coll:"art",
    mots:{ fr:{m:"la haute école"}, en:{m:"high school", p:"haï skoul", var:"haute école"},
           es:{m:"la alta escuela"}, it:{m:"l'alta scuola"},
           de:{m:"die Hohe Schule", p:"hô-e chou-le"}, ja:{m:"高等馬術", p:"kōtō bajutsu"},
           ar:{m:"الفروسية العليا", var:"المدرسة العليا"} },
    def:{ fr:"🟥🟥 LE PIÈGE DU CHAPITRE. **HIGH-SCHOOL MOVEMENTS** ne veut pas dire « mouvements de lycée » : en équitation, *high school* est le calque exact du français HAUTE ÉCOLE. ⚠️ L'anglais garde d'ailleurs souvent le français tel quel — *haute école* — comme il garde *passage*, *piaffe* et *pirouette*. Aux États-Unis, où *high school* ne signifie QUE lycée, on préfère **the airs above the ground** pour les airs relevés. 🟥 La haute école commence là où le dressage de concours s'arrête : le piaffer, le passage, les airs relevés — courbette, croupade, cabriole.",
          en:"The trap of this chapter. « High-school movements » has nothing to do with schools: in riding, « high school » is a straight calque of the French haute école — which English also keeps as it is, like passage, piaffe and pirouette. In America, where « high school » only means school, people say « the airs above the ground ».",
          es:"« Alta escuela » empieza donde el dressage de concurso se detiene: el piafé, el pasaje, los aires elevados — corveta, grupada, cabriola.",
          it:"L'« alta scuola » comincia dove il dressage da concorso si ferma: il piaffe, il passage, le arie alte — corvetta, groppata, capriola.",
          de:"Die Hohe Schule beginnt dort, wo die Turnierdressur aufhört: Piaffe, Passage, die Schulen über der Erde — Kurbette, Kruppade, Kapriole.",
          ja:"この章の落とし穴。英語の high-school movements は「高校の動き」ではありません。馬術の high school はフランス語 haute école の直訳です。英語では haute école のまま使うことも多く、passage、piaffe、pirouette も同様です。アメリカでは high school が学校しか意味しないため、the airs above the ground と言います。",
          ar:"🟥🟥 فخ هذا الفصل. عبارة **HIGH-SCHOOL MOVEMENTS** لا تعني «حركات المدرسة الثانوية»: في الفروسية، *high school* ترجمة حرفية للتعبير الفرنسي HAUTE ÉCOLE. ⚠️ وكثيرا ما تحتفظ الإنجليزية بالكلمة الفرنسية كما هي — *haute école* — كما تحتفظ بـ *passage* و*piaffe* و*pirouette*. وفي الولايات المتحدة، حيث لا تعني *high school* إلا المدرسة الثانوية، يفضل قول **the airs above the ground** للحركات المرتفعة عن الأرض. 🟥 تبدأ الفروسية العليا حيث يتوقف ترويض المسابقات: البياف، والباساج، والحركات المرتفعة — الكوربيت، والكروباد، والكابريول." } },

  { ref:"dressage-classique", lecon:1, coll:"art",
    mots:{ fr:{m:"le dressage classique"}, en:{m:"classical dressage", p:"kla-si-keul"},
           es:{m:"la doma clásica"}, it:{m:"il dressage classico"},
           de:{m:"die klassische Dressur", p:"kla-si-che drè-sour"}, ja:{m:"古典馬術", p:"koten bajutsu"},
           ar:{m:"الترويض الكلاسيكي"} },
    def:{ fr:"⚠️ **CLASSIQUE** NE VEUT PAS DIRE ANCIEN : il désigne une lignée d'enseignement ininterrompue depuis la Renaissance, de Pluvinel à La Guérinière, transmise par quatre écoles — Vienne, Saumur, Jerez, Lisbonne. 🟥 L'espagnol dit **la doma clásica** pour le dressage tout court, y compris de concours : c'est le mot ordinaire, pas un mot d'art. Un faux ami discret.",
          en:"« Classical » doesn't mean old: it names an unbroken line of teaching since the Renaissance, from Pluvinel to La Guérinière, carried by four schools — Vienna, Saumur, Jerez, Lisbon. Spanish says « doma clásica » for dressage in general, competition included: an everyday word, not an artistic one.",
          es:"« Clásico » no significa antiguo: designa una línea de enseñanza ininterrumpida desde el Renacimiento, transmitida por cuatro escuelas: Viena, Saumur, Jerez y Lisboa.",
          it:"« Classico » non vuol dire antico: indica una linea d'insegnamento ininterrotta dal Rinascimento, portata da quattro scuole: Vienna, Saumur, Jerez e Lisbona.",
          de:"« Klassisch » heißt nicht alt: es meint eine ununterbrochene Lehrlinie seit der Renaissance, getragen von vier Schulen — Wien, Saumur, Jerez, Lissabon.",
          ja:"「古典」は「古い」という意味ではありません。ルネサンス以来、プリュヴィネルからラ・ゲリニエールへと途切れず受け継がれてきた教えの系譜を指します。ウィーン、ソミュール、へレス、リスボンの四つの学校が伝えています。",
          ar:"⚠️ **الكلاسيكي** لا يعني القديم: بل يدل على سلسلة تعليم متصلة منذ عصر النهضة، من بلوفينيل إلى لا غيرينيير، تحملها أربع مدارس — فيينا، وسومور، وخيريث، ولشبونة. 🟥 الإسبانية تقول **la doma clásica** للترويض عموما، بما فيه ترويض المسابقات: إنها الكلمة العادية، لا كلمة فنية. صديق مخادع خفي." } },

  { ref:"ecole-royale", lecon:1, coll:"art",
    mots:{ fr:{m:"l'école royale"}, en:{m:"the Royal School", p:"roï-eul skoul"},
           es:{m:"la Real Escuela"}, it:{m:"la Scuola Reale"},
           de:{m:"die Königliche Schule", p:"ko-nik-li-che"}, ja:{m:"王立学校", p:"ōritsu gakkō"},
           ar:{m:"المدرسة الملكية"} },
    def:{ fr:"🟥 LA REAL ESCUELA ANDALUZA DEL ARTE ECUESTRE, à Jerez de la Frontera. On y forme des chevaux et des cavaliers jusqu'au Grand Prix, on y travaille la haute école, le travail en main, la doma vaquera et l'attelage. ⚠️ C'est l'une des QUATRE grandes écoles classiques d'Europe, avec Vienne, Saumur et Lisbonne — quatre traditions vivantes, quatre façons de faire la même chose.",
          en:"The Real Escuela Andaluza del Arte Ecuestre, at Jerez de la Frontera. Horses and riders are trained here up to Grand Prix, in high school, work in hand, doma vaquera and driving. One of Europe's four great classical schools, with Vienna, Saumur and Lisbon.",
          es:"La Real Escuela Andaluza del Arte Ecuestre, en Jerez de la Frontera. Una de las cuatro grandes escuelas clásicas de Europa, con Viena, Saumur y Lisboa.",
          it:"La Real Escuela Andaluza del Arte Ecuestre, a Jerez de la Frontera. Una delle quattro grandi scuole classiche d'Europa, con Vienna, Saumur e Lisbona.",
          de:"Die Real Escuela Andaluza del Arte Ecuestre in Jerez de la Frontera. Eine der vier großen klassischen Schulen Europas, mit Wien, Saumur und Lissabon.",
          ja:"へレス・デ・ラ・フロンテーラにある王立アンダルシア馬術学校。グランプリ水準まで人馬を育て、高等馬術、手綱による地上作業、ドマ・バケーラ、馬車を扱います。ウィーン、ソミュール、リスボンと並ぶヨーロッパ四大古典学校のひとつです。",
          ar:"🟥 المدرسة الملكية الأندلسية لفن الفروسية، في خيريث دي لا فرونتيرا. فيها تعد الخيول والفرسان حتى مستوى الجائزة الكبرى، ويتدرب فيها على الفروسية العليا، والعمل من الأرض، والدوما باكيرا، وقيادة العربات. ⚠️ وهي واحدة من المدارس الكلاسيكية الكبرى الأربع في أوروبا، مع فيينا وسومور ولشبونة — أربعة تقاليد حية، وأربع طرق لفعل الشيء نفسه." } },

  { ref:"aides", lecon:1, coll:"art",
    mots:{ fr:{m:"les aides"}, en:{m:"the aids", p:"éïdz"},
           es:{m:"las ayudas"}, it:{m:"gli aiuti"},
           de:{m:"die Hilfen", p:"hil-feune"}, ja:{m:"扶助", p:"fujo"},
           ar:{m:"المساعدات"} },
    def:{ fr:"🟥 LE MOT DIT TOUT DE L'ÉQUITATION CLASSIQUE : on n'ORDONNE pas, on AIDE. Les aides sont les mains, les jambes, l'assiette et la voix. ⚠️ Toutes les langues gardent cette idée d'aide — *aids*, *ayudas*, *aiuti*, *Hilfen*, 扶助. C'est l'un des rares mots où six langues sont d'accord sur la métaphore. 🟥 Le but de toute la haute école est qu'elles deviennent invisibles : un spectateur qui voit le cavalier agir voit un défaut.",
          en:"The word says everything about classical riding: you don't command, you help. The aids are hands, legs, seat and voice. Every language keeps the idea of helping — one of the rare words where six agree on the metaphor. The whole point of high school is that they become invisible: a spectator who sees the rider act is seeing a fault.",
          es:"La palabra lo dice todo: no se ordena, se ayuda. El objetivo de la alta escuela es que las ayudas se vuelvan invisibles.",
          it:"La parola dice tutto: non si comanda, si aiuta. Lo scopo dell'alta scuola è che gli aiuti diventino invisibili.",
          de:"Das Wort sagt alles: man befiehlt nicht, man hilft. Ziel der Hohen Schule ist, dass die Hilfen unsichtbar werden.",
          ja:"この語が古典馬術のすべてを語ります。命じるのではなく、助けるのです。扶助とは手、脚、座り、そして声のこと。六つの言語すべてがこの「助ける」という比喩を保っている、珍しい語です。高等馬術の目的は、扶助が見えなくなること。観客に騎手の動作が見えたなら、それは欠点です。",
          ar:"🟥 الكلمة تقول كل شيء عن الفروسية الكلاسيكية: لا نأمر، بل نساعد. المساعدات هي اليدان، والساقان، والجلسة، والصوت. ⚠️ كل اللغات تحتفظ بفكرة المساعدة — *aids*، *ayudas*، *aiuti*، *Hilfen*، 扶助. إنها من الكلمات النادرة التي تتفق فيها كل اللغات على الاستعارة نفسها. 🟥 وغاية الفروسية العليا كلها أن تصبح المساعدات غير مرئية: المتفرج الذي يرى الفارس يتحرك يرى عيبا." } },

  { ref:"harmonie", lecon:1, coll:"art",
    mots:{ fr:{m:"l'harmonie"}, en:{m:"harmony", p:"har-me-ni"},
           es:{m:"la armonía"}, it:{m:"l'armonia"},
           de:{m:"die Harmonie", p:"har-mô-nii"}, ja:{m:"調和", p:"chōwa"},
           ar:{m:"الانسجام"} },
    def:{ fr:"🟥 CE QU'ON CHERCHE, ET CE QUI NE SE MESURE PAS. Un mouvement difficile exécuté dans la contrainte vaut moins qu'un mouvement simple donné librement. ⚠️ C'est le seul critère de tout le module qui ne se compte pas : pas de points, pas de chrono, pas de barème. On le reconnaît quand on le voit — et c'est précisément ce que le chapitre enseigne à regarder.",
          en:"What you're after, and what can't be measured. A difficult movement done under constraint is worth less than a simple one freely given. It's the only criterion in the whole module that isn't counted: no points, no clock, no scoring. You know it when you see it.",
          es:"Lo que se busca, y lo que no se mide. Un movimiento difícil ejecutado bajo coacción vale menos que uno simple dado libremente.",
          it:"Ciò che si cerca, e ciò che non si misura. Un movimento difficile eseguito nella costrizione vale meno di uno semplice dato liberamente.",
          de:"Was man sucht, und was sich nicht messen lässt. Eine schwere Lektion unter Zwang ist weniger wert als eine einfache, frei gegebene.",
          ja:"求めるものであり、測れないもの。強いられて行う難しい動きは、自ら差し出された簡単な動きに及びません。このアプリ全体で唯一、点数も時計も採点表もない基準です。見れば分かる、それを見る目を養うのがこの章です。",
          ar:"🟥 ما نبحث عنه، وما لا يقاس. حركة صعبة تنفذ تحت الإكراه أقل قيمة من حركة بسيطة تعطى بحرية. ⚠️ إنه المعيار الوحيد في هذه الوحدة كلها الذي لا يحسب: لا نقاط، ولا توقيت، ولا جدول تنقيط. نعرفه حين نراه — وهذا بالضبط ما يعلمك هذا الفصل أن تنظري إليه." } },

  { ref:"choregraphie", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"la chorégraphie"}, en:{m:"the choreography", p:"ko-ri-o-gra-fi"},
           es:{m:"la coreografía"}, it:{m:"la coreografia"},
           de:{m:"die Choreografie", p:"ko-ré-o-gra-fii"}, ja:{m:"振付", p:"furitsuke"},
           ar:{m:"تصميم الحركات", var:"الكوريغرافيا"} },
    def:{ fr:"⚠️ LE MOT VIENT DE LA DANSE, et c'est voulu : le spectacle de Jerez s'appelle *Cómo bailan los caballos andaluces* — « comment dansent les chevaux andalous ». 🟥 Une chorégraphie équestre mêle le dressage classique, la doma vaquera et le travail en main, sur de la musique espagnole, en costumes du XVIIIe siècle. Ce n'est ni une reprise de concours ni un numéro de cirque : c'est un ballet où les danseurs pèsent cinq cents kilos.",
          en:"The word comes from dance, and deliberately: the Jerez show is called « Cómo bailan los caballos andaluces » — how the Andalusian horses dance. An equestrian choreography mixes classical dressage, doma vaquera and work in hand, to Spanish music, in eighteenth-century costume.",
          es:"La palabra viene de la danza, y a propósito: el espectáculo se llama « Cómo bailan los caballos andaluces ». No es ni una reprise de concurso ni un número de circo.",
          it:"La parola viene dalla danza, e volutamente: lo spettacolo si chiama « Cómo bailan los caballos andaluces ». Non è né una ripresa da concorso né un numero da circo.",
          de:"Das Wort kommt vom Tanz, und das mit Absicht: die Show heißt « Cómo bailan los caballos andaluces » — wie die andalusischen Pferde tanzen.",
          ja:"この語は舞踊から来ており、それは意図的です。へレスの公演の名は「Cómo bailan los caballos andaluces（アンダルシアの馬はいかに踊るか）」。古典馬術、ドマ・バケーラ、手綱作業をスペイン音楽と十八世紀の衣装で織り上げます。競技の演技でもサーカスの出し物でもない、五百キロの踊り手によるバレエです。",
          ar:"⚠️ الكلمة آتية من عالم الرقص، وهذا مقصود: عرض خيريث اسمه *Cómo bailan los caballos andaluces* — «كيف ترقص الخيول الأندلسية». 🟥 يمزج تصميم الحركات الفروسي بين الترويض الكلاسيكي، والدوما باكيرا، والعمل من الأرض، على موسيقى إسبانية، وبأزياء من القرن الثامن عشر. ليس اختبار مسابقة ولا فقرة سيرك: إنه باليه يزن فيه الراقصون خمسمئة كيلوغرام." } },

  { ref:"spectacle", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"le spectacle équestre"}, en:{m:"the equestrian show", p:"chô", var:"the performance"},
           es:{m:"el espectáculo ecuestre"}, it:{m:"lo spettacolo equestre"},
           de:{m:"die Pferdeshow", p:"pfèr-de-chô", var:"die Vorführung"},
           ja:{m:"馬術ショー", p:"bajutsu shō"},
           ar:{m:"العرض الفروسي", var:"الأداء"} },
    def:{ fr:"⚠️ **SHOW** OU **PERFORMANCE** ? Le premier dit l'événement, le second la représentation elle-même — *the show is at noon*, mais *the performance lasted an hour*. 🟥 Et ce qui distingue le spectacle du concours : il n'y a rien à gagner. Des années de travail pour quelques minutes, et le seul jugement est celui d'une salle qui se tait ou qui applaudit.",
          en:"« Show » or « performance »? The first names the event, the second the thing performed — the show is at noon, but the performance lasted an hour. And what sets a show apart from a competition: there's nothing to win. Years of work for a few minutes.",
          es:"Lo que distingue el espectáculo del concurso: no hay nada que ganar. Años de trabajo para unos minutos.",
          it:"Ciò che distingue lo spettacolo dalla gara: non c'è niente da vincere. Anni di lavoro per pochi minuti.",
          de:"Was die Vorführung vom Wettkampf trennt: es gibt nichts zu gewinnen. Jahre Arbeit für wenige Minuten.",
          ja:"英語の show は催しそのもの、performance は上演を指します。競技と違うのは、勝ち取るものが何もないこと。数分のために何年も働き、判定を下すのは、静まるか拍手するかの客席だけです。",
          ar:"⚠️ **SHOW** أم **PERFORMANCE**؟ الأولى تدل على الحدث، والثانية على الأداء نفسه — *the show is at noon*، لكن *the performance lasted an hour*. 🟥 وما يميز العرض عن المسابقة: لا شيء فيه يربح. سنوات من العمل من أجل بضع دقائق، والحكم الوحيد هو حكم قاعة تصمت أو تصفق." } },

  { ref:"tenue-traditionnelle", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"la tenue traditionnelle"}, en:{m:"traditional riding dress", p:"tra-di-cheu-neul"},
           es:{m:"el traje tradicional"}, it:{m:"l'abito tradizionale"},
           de:{m:"die traditionelle Reitkleidung", p:"tra-di-tsio-nè-le"}, ja:{m:"伝統衣装", p:"dentō ishō"},
           ar:{m:"الزي التقليدي"} },
    def:{ fr:"⚠️ À JEREZ ELLE EST DU XVIIIe SIÈCLE, pas du folklore : habit à basques, chapeau à plumes, bottes à revers — la tenue des écuyers de cour. 🟥 À SÉVILLE, à quatre-vingt-dix kilomètres, la tenue traditionnelle est tout autre : le traje corto, court, né du travail au champ. Deux villes espagnoles, deux costumes, deux mondes. NE PAS les confondre.",
          en:"At Jerez it's eighteenth-century, not folklore: a skirted coat, plumed hat, turned-down boots — the dress of court riding masters. At Seville, ninety kilometres away, traditional dress is something else entirely: the traje corto, short, born of work in the fields.",
          es:"En Jerez es del siglo XVIII, no folclore: casaca, sombrero con plumas, botas de vuelta. En Sevilla, el traje tradicional es otro: el traje corto, nacido del trabajo en el campo.",
          it:"A Jerez è del Settecento, non folclore. A Siviglia, l'abito tradizionale è tutt'altro: il traje corto, nato dal lavoro nei campi.",
          de:"In Jerez ist sie aus dem 18. Jahrhundert, keine Folklore. In Sevilla ist die Tracht etwas ganz anderes: der kurze Traje corto, aus der Feldarbeit entstanden.",
          ja:"へレスの装いは十八世紀のもので、民俗衣装ではありません。裾のある上着、羽根飾りの帽子、折り返しブーツ — 宮廷馬術師の服装です。九十キロ離れたセビリアの伝統衣装はまったく別物で、野良仕事から生まれた短い traje corto です。",
          ar:"⚠️ في خيريث يعود هذا الزي إلى القرن الثامن عشر، وليس زيا فولكلوريا: سترة طويلة الأذيال، وقبعة بالريش، وأحذية بحواف مطوية — لباس فرسان البلاط. 🟥 أما في إشبيلية، على بعد تسعين كيلومترا، فالزي التقليدي مختلف تماما: الـ traje corto، القصير، المولود من العمل في الحقول. مدينتان إسبانيتان، زيان، عالمان. لا تخلطي بينهما." } },

  { ref:"numero", lecon:1, coll:"spectacle",
    mots:{ fr:{m:"le numéro", var:"la reprise"}, en:{m:"the routine", p:"rou-tine", var:"the performance"},
           es:{m:"el número"}, it:{m:"il numero"},
           de:{m:"die Nummer", p:"nou-meur"}, ja:{m:"演目", p:"enmoku"},
           ar:{m:"الفقرة", var:"الاستعراض"} },
    def:{ fr:"⚠️ **ROUTINE** EST UN FAUX AMI : en anglais ce n'est pas de la routine ennuyeuse mais un enchaînement réglé, comme en patinage ou en gymnastique. 🟥 Et « reprise » en français a déjà trois sens dans cette app — le protocole à Windsor, l'épreuve à Badminton, le groupe d'élèves à Aberystwyth. Ici c'est un quatrième : le numéro d'un spectacle. Quatre sens, un mot.",
          en:"« Routine » is a false friend: it isn't dull repetition but a set sequence, as in skating or gymnastics. And the French « reprise » already has three senses in this app — the test at Windsor, the phase at Badminton, the class of pupils at Aberystwyth. Here it takes a fourth.",
          es:"« Routine » es un falso amigo en inglés: no es rutina aburrida sino una secuencia establecida, como en patinaje.",
          it:"« Routine » è un falso amico in inglese: non è routine noiosa ma una sequenza stabilita, come nel pattinaggio.",
          de:"« Routine » ist im Englischen ein falscher Freund: keine langweilige Gewohnheit, sondern eine festgelegte Abfolge wie im Eiskunstlauf.",
          ja:"英語の routine は偽の友です。退屈な日課ではなく、フィギュアスケートや体操と同じ「決められた演技構成」を指します。フランス語の reprise はこのアプリですでに三つの意味を持ち、ここで四つ目になります。",
          ar:"⚠️ **ROUTINE** صديق مخادع: في الإنجليزية لا تعني الروتين الممل، بل سلسلة حركات مضبوطة، كما في التزلج الفني أو الجمباز. 🟥 وكلمة «reprise» في الفرنسية لها ثلاثة معان في هذا التطبيق — الاختبار في وندسور، والمرحلة في بادمنتون، ومجموعة التلاميذ في أبيريستويث. وهنا معنى رابع: فقرة في عرض. أربعة معان، وكلمة واحدة." } },

  { ref:"doma-vaquera", lecon:1, coll:"art",
    mots:{ fr:{m:"la doma vaquera"}, en:{m:"doma vaquera", p:"dô-ma va-ké-ra"},
           es:{m:"la doma vaquera"}, it:{m:"la doma vaquera"},
           de:{m:"die Doma vaquera"}, ja:{m:"ドマ・バケーラ", p:"doma bakēra"},
           ar:{m:"الدوما باكيرا"} },
    def:{ fr:"🟥 LE MOT RESTE EN ESPAGNOL PARTOUT. C'est le dressage né du travail du bétail : une main sur les rênes, l'autre libre pour la garrocha, la longue perche. Arrêts brusques, demi-tours sur les hanches, tout ce qu'exige un cheval qui trie des taureaux. ⚠️ NE PAS le traduire par « western » : le western américain en descend, par le Mexique, mais ce n'est pas la même chose — la doma vaquera se monte en selle espagnole, dans une main, en tenue de campo.",
          en:"The words stay Spanish everywhere. It's the dressage born of cattle work: one hand on the reins, the other free for the garrocha, the long pole. Sudden halts, turns on the haunches — everything a horse sorting bulls must do. Don't translate it as « western »: American western descends from it, by way of Mexico, but it isn't the same thing.",
          es:"La doma nacida del trabajo con el ganado: una mano en las riendas, la otra libre para la garrocha. No es lo mismo que el western, aunque este descienda de ella.",
          it:"Il dressage nato dal lavoro col bestiame: una mano sulle redini, l'altra libera per la garrocha. Non è il western, benché questo ne discenda.",
          de:"Die Dressur, die aus der Rinderarbeit entstand: eine Hand am Zügel, die andere frei für die Garrocha. Nicht mit Western zu übersetzen, auch wenn dieser davon abstammt.",
          ja:"どの言語でもスペイン語のまま使います。牛追いの仕事から生まれた調教で、片手で手綱を持ち、もう一方はガロチャという長い棒のために空けておきます。急停止、後肢を軸にした旋回など、牛を仕分ける馬に必要な動きです。アメリカのウエスタンはメキシコを経てこれに由来しますが、同じものではありません。",
          ar:"🟥 الاسم يبقى بالإسبانية في كل مكان. إنه الترويض المولود من العمل مع الماشية: يد على الأعنة، والأخرى حرة لحمل الغاروتشا، العصا الطويلة. توقفات مفاجئة، ودورانات على الأرداف، وكل ما يطلب من حصان يفرز الثيران. ⚠️ لا تترجميه بـ «الويسترن»: الويسترن الأمريكي منحدر منه عبر المكسيك، لكنهما ليسا الشيء نفسه — فالدوما باكيرا تركب بسرج إسباني، وبيد واحدة، وبلباس الريف." } },

  /* ============ LEÇON 2 · LES MOUVEMENTS DE HAUTE ÉCOLE ============
     🟥 30/09/2026 — SUR DÉCISION DE BLANDINE (« ok pour Jerez ») : les onze
     mouvements de dressage qui dormaient depuis le 6 août dans
     `hype-lingo-lex-dressage-reserve.js` (leçon 2, jamais attribuée à une
     ville) rejoignent l'École royale — c'est sa haute école. Repris tels
     quels, à UNE exception : `reculer` devient `reculer-dressage`, parce
     que `reculer` existe déjà dans le chapitre des urgences d'Édimbourg
     (reculer, s'écarter) — un concept, un ref. Pas de phrase propre à cette
     leçon (celles de la réserve sont toutes en leçon 4) : le tirage lui
     donne les quatre du chapitre. Le dialogue de Jerez ne cite pas encore
     ces mots — à écrire par Blandine. Jerez passe de 11 à 22 mots.
     ⚠️ Le fichier de réserve reste en place, inchangé et non chargé ;
     Versailles ne cite aucun de ces refs (vérifié le 30/09). */

  { ref:"cession-jambe", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la cession à la jambe"}, en:{m:"leg-yield", p:"lègue-yild"},
           es:{m:"la cesión a la pierna"}, it:{m:"la cessione alla gamba"},
           de:{m:"das Schenkelweichen", p:"chèn-keul-vaï-cheune"}, ja:{m:"脚に譲る", p:"ashi ni yuzuru", var:"レッグ・イールド"},
           ar:{m:"الانقياد للساق"} }, /* precise (rapport 07/08) */
    def:{ fr:"Le cheval se déplace de côté sans incurvation, presque droit. Le premier mouvement latéral appris, et celui qu'on confond le plus souvent avec l'appuyer.",
          en:"The horse moves sideways with no bend, almost straight. The first lateral work learned, and the one most often confused with half-pass.",
          es:"El caballo se desplaza de lado sin incurvación, casi recto. El primer movimiento lateral que se aprende, y el que más se confunde con el appuyer.",
          it:"Il cavallo si sposta di lato senza incurvazione, quasi dritto. Il primo movimento laterale imparato, e quello che più si confonde con l'appoggiata.",
          de:"Das Pferd weicht seitwärts ohne Biegung, fast gerade. Die erste erlernte Seitwärtsbewegung — und die am häufigsten mit der Traversale verwechselte.",
          ja:"馬が屈曲せず、ほぼまっすぐなまま横へ動く運動。最初に習う横運動であり、ハーフパスと最も混同されやすいものです。",
          ar:"يتحرك الحصان جانبيا من دون انحناء، مستقيما تقريبا. أول حركة جانبية تتعلم، وأكثر ما يخلط بينها وبين الأبوييه." } },

  { ref:"epaule-dedans", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'épaule en dedans"}, en:{m:"shoulder-in", p:"chol-deur-inn"},
           es:{m:"la espalda adentro"}, it:{m:"la spalla in dentro"},
           de:{m:"das Schulterherein", p:"choul-teur-hè-raïn"}, ja:{m:"ショルダーイン", p:"shorudā in"},
           ar:{m:"الكتف إلى الداخل"} }, /* valide (rapport 07/08) */
    def:{ fr:"Les épaules rentrées vers l'intérieur, les hanches sur la piste, le cheval incurvé autour de la jambe intérieure. Les cinq langues latines et germaniques disent toutes littéralement « épaule dedans » — un cas rare d'accord total.",
          en:"Shoulders brought in, hips on the track, the horse bent round the inside leg. All five European languages say literally « shoulder in ».",
          es:"Las espaldas hacia el interior, las caderas en la pista, el caballo incurvado alrededor de la pierna interior. Las cinco lenguas latinas y germánicas dicen todas literalmente « espalda adentro » — un raro caso de acuerdo total.",
          it:"Le spalle verso l'interno, le anche sulla pista, il cavallo incurvato attorno alla gamba interna. Le cinque lingue latine e germaniche dicono tutte alla lettera « spalla in dentro » — un raro caso di accordo totale.",
          de:"Die Schultern hereingeholt, die Hüften auf dem Hufschlag, das Pferd um das innere Bein gebogen. Alle fünf romanischen und germanischen Sprachen sagen wörtlich « Schulter herein » — ein seltener Fall völliger Einigkeit.",
          ja:"肩を内側へ、腰は蹄跡の上に、馬は内方脚のまわりに屈曲。ラテン系・ゲルマン系の五言語はすべて文字どおり「肩を内へ」— 珍しい満場一致です。",
          ar:"الكتفان إلى الداخل، والوركان على المسار، والحصان منحن حول الساق الداخلية. اللغات اللاتينية والجرمانية الخمس تقول كلها حرفيا «الكتف إلى الداخل»." } },

  { ref:"appuyer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'appuyer"}, en:{m:"half-pass", p:"haf-pass"},
           es:{m:"la apoyada"}, it:{m:"l'appoggiata"},
           de:{m:"die Traversale", p:"tra-vèr-za-le"}, ja:{m:"ハーフパス", p:"hāfu pasu"},
           ar:{m:"الأبوييه"} },
    def:{ fr:"Déplacement latéral avec incurvation dans le sens de la marche. ⚠️ Aucun accord entre les langues : l'anglais dit « demi-passage », l'allemand emploie un mot d'origine française que le français n'utilise pas, et le japonais l'anglais.",
          en:"Sideways with the bend in the direction of travel. No two languages agree here: English says half-pass, German uses a French-looking word the French never use.",
          es:"Desplazamiento lateral con incurvación en el sentido de la marcha. ⚠️ Ningún acuerdo entre lenguas: el inglés dice « half-pass », el alemán usa una palabra de origen francés que el francés no usa, y el japonés el inglés.",
          it:"Spostamento laterale con incurvazione nel senso del movimento. ⚠️ Nessun accordo tra le lingue: l'inglese dice « half-pass », il tedesco usa una parola d'origine francese che il francese non usa, e il giapponese l'inglese.",
          de:"Seitwärtsbewegung mit Biegung in Bewegungsrichtung. ⚠️ Keinerlei Einigkeit: Englisch sagt « half-pass », Deutsch nutzt ein französischstämmiges Wort, das das Französische nicht kennt (Traversale), Japanisch das Englische.",
          ja:"進行方向へ屈曲したまま横へ進む運動。⚠️ 言語間の一致は皆無です。英語は « half-pass »、ドイツ語はフランス語由来なのにフランス語では使われない言葉、日本語は英語からの借用。",
          ar:"حركة جانبية مع انحناء في اتجاه السير — الاسم الدولي محفوظ كما هو. ⚠️ لا اتفاق بين اللغات: الإنجليزية تقول half-pass، والألمانية تستعمل كلمة من أصل فرنسي لا تستعملها الفرنسية نفسها." } },

  { ref:"changement-pied", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le changement de pied"}, en:{m:"the flying change", p:"flaï-ing tchèndj"},
           es:{m:"el cambio de pie"}, it:{m:"il cambio di piede"},
           de:{m:"der Galoppwechsel", p:"ga-lopp-vèk-seul"}, ja:{m:"踏歩変換", p:"tōhohenkan"},
           ar:{m:"التغيير الطائر"} }, // ??
    def:{ fr:"Changer de pied de galop en l'air, sans repasser au trot. ⚠️ L'anglais insiste sur le fait que c'est en suspension : **flying** change. On les compte : au temps, au deux temps, au trois temps.",
          en:"Changing the leading leg in the air, without trotting. English stresses the suspension: a flying change.",
          es:"Cambiar de pie de galope en el aire, sin pasar por el trote. ⚠️ El inglés insiste en que ocurre en suspensión: **flying** change. Se cuentan: al tiempo, a dos tiempos, a tres tiempos.",
          it:"Cambiare piede di galoppo in aria, senza ripassare al trotto. ⚠️ L'inglese insiste sul fatto che avviene in sospensione: **flying** change. Si contano: al tempo, a due tempi, a tre tempi.",
          de:"Der Galoppwechsel in der Luft, ohne Trab dazwischen. ⚠️ Das Englische betont die Schwebephase: **flying** change. Man zählt sie: von Sprung zu Sprung, alle zwei, alle drei Sprünge.",
          ja:"速歩を挟まず、空中で駈歩の手前を替えること。⚠️ 英語は宙に浮いている瞬間を強調します — **flying** change。数え方もあります：一歩ごと、二歩ごと、三歩ごと。",
          ar:"تغيير قيادة العدو في الهواء، من دون العودة إلى الخبب. ⚠️ الإنجليزية تشدد على أنه في لحظة التعلق: **flying** change. وتعد التغييرات: في كل خطوة، وكل خطوتين، وكل ثلاث." } },

  { ref:"pirouette", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la pirouette"}, en:{m:"the pirouette", p:"pi-rou-ètt"},
           es:{m:"la pirueta"}, it:{m:"la piroetta"},
           de:{m:"die Pirouette", p:"pi-rou-è-te"}, ja:{m:"ピルーエット", p:"pirūetto"},
           ar:{m:"البيرويت"} },
    def:{ fr:"Un tour complet au galop autour d'un postérieur qui reste en place. Le mot français a été adopté partout, danse comprise.",
          en:"A full turn in canter round a hind leg that stays in place. The French word was adopted everywhere, dance included.",
          es:"Una vuelta completa al galope alrededor de un posterior que queda en su sitio. La palabra francesa fue adoptada en todas partes, danza incluida.",
          it:"Un giro completo al galoppo attorno a un posteriore che resta al suo posto. La parola francese è stata adottata ovunque, danza compresa.",
          de:"Eine ganze Drehung im Galopp um ein an Ort bleibendes Hinterbein. Das französische Wort wurde überall übernommen — auch im Tanz.",
          ja:"片方の後肢を軸に、駈歩のままその場で一回転する運動。このフランス語は世界じゅうで採用されました — バレエの世界でも。",
          ar:"دورة كاملة في العدو حول قائمة خلفية تبقى في مكانها. الكلمة الفرنسية اعتمدت في كل مكان، بما في ذلك الرقص." } },

  { ref:"piaffer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le piaffer"}, en:{m:"piaffe", p:"pi-af"},
           es:{m:"el piaffe"}, it:{m:"il piaffe"},
           de:{m:"die Piaffe", p:"pi-a-fe"}, ja:{m:"ピアッフェ", p:"piaffe"},
           ar:{m:"البياف"} },
    def:{ fr:"Un trot sur place, cadencé et rassemblé. Curiosité : le mot est français, mais c'est la forme allemande *die Piaffe* qui a été reprise par l'anglais, l'espagnol et l'italien.",
          en:"A cadenced, collected trot on the spot. The word is French, but it is the German form that English, Spanish and Italian borrowed.",
          es:"Un trote en el sitio, cadenciado y reunido. Curiosidad: la palabra es francesa, pero fue la forma alemana *die Piaffe* la que tomaron el inglés, el español y el italiano.",
          it:"Un trotto sul posto, cadenzato e riunito. Curiosità: la parola è francese, ma è la forma tedesca *die Piaffe* che è stata ripresa da inglese, spagnolo e italiano.",
          de:"Ein kadenzierter, versammelter Trab auf der Stelle. Kurios: Das Wort ist französisch, aber Englisch, Spanisch und Italienisch übernahmen die deutsche Form *die Piaffe*.",
          ja:"その場で行う、拍子の整った収縮した速歩。面白いことに、言葉はフランス語なのに、英・西・伊が借りたのはドイツ語形の *die Piaffe* でした。",
          ar:"خبب في المكان، موقع ومجموع. طرافة: الكلمة فرنسية، لكن الصيغة الألمانية *die Piaffe* هي التي أخذتها الإنجليزية والإسبانية والإيطالية." } },

  { ref:"passage", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le passage"}, en:{m:"passage", p:"pa-sadj"},
           es:{m:"el passage"}, it:{m:"il passage"},
           de:{m:"die Passage", p:"pa-sa-je"}, ja:{m:"パッサージュ", p:"passāju"},
           ar:{m:"الباساج"} },
    def:{ fr:"Un trot très rassemblé, avec un long temps de suspension. ⚠️ Se prononce à la française même en anglais : dire « pa-sidj » à l'anglaise ne sera pas compris.",
          en:"A very collected trot with a long moment of suspension. Pronounced the French way even in English.",
          es:"Un trote muy reunido, con un largo tiempo de suspensión. ⚠️ Se pronuncia a la francesa incluso en inglés: decir « pa-sidj » a la inglesa no será entendido.",
          it:"Un trotto molto riunito, con un lungo tempo di sospensione. ⚠️ Si pronuncia alla francese anche in inglese: dire « pa-sidj » all'inglese non sarà capito.",
          de:"Ein stark versammelter Trab mit langer Schwebephase. ⚠️ Wird auch im Englischen französisch ausgesprochen — « pa-sidj » versteht niemand.",
          ja:"高く長い滞空を伴う、深く収縮した速歩。⚠️ 英語でもフランス語ふうに発音します。英語読みで「パシッジ」と言っても通じません。",
          ar:"خبب مجموع جدا، مع زمن تعلق طويل. ⚠️ ينطق بالطريقة الفرنسية حتى في الإنجليزية: نطقه على الطريقة الإنجليزية «pa-sidj» لن يفهم." } },

  { ref:"reculer-dressage", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le reculer"}, en:{m:"the rein-back", p:"rèn-bak"},
           es:{m:"el paso atrás"}, it:{m:"l'indietreggiare"},
           de:{m:"das Rückwärtsrichten", p:"ruk-vèrts-rirh-teune"}, ja:{m:"後退", p:"kōtai"},
           ar:{m:"الرجوع إلى الخلف"} },
    def:{ fr:"Reculer droit, par bipèdes diagonaux, le nombre de pas exact demandé par la reprise. ⚠️ L'anglais le nomme par la rêne, **rein-back**, alors que le mouvement vient d'abord du dos et des jambes.",
          en:"Straight back in diagonal pairs, the exact number of steps the test asks for. English names it after the rein.",
          es:"Recular derecho, por bípedos diagonales, el número exacto de pasos que pide la reprise. ⚠️ El inglés lo nombra por la rienda, **rein-back**, cuando el movimiento nace del dorso y las piernas.",
          it:"Indietreggiare dritto, per bipedi diagonali, il numero esatto di passi chiesto dalla ripresa. ⚠️ L'inglese lo chiama con la redine, **rein-back**, mentre il movimento nasce prima da schiena e gambe.",
          de:"Gerade rückwärtsrichten, auf diagonalen Beinpaaren, exakt die verlangte Trittzahl. ⚠️ Das Englische benennt es nach dem Zügel — **rein-back** —, obwohl die Bewegung aus Rücken und Schenkeln kommt.",
          ja:"対角の肢を対にして、要求された歩数だけまっすぐ後退すること。⚠️ 英語は手綱の名で **rein-back** と呼びますが、この運動はまず背中と脚から生まれるものです。",
          ar:"الرجوع مستقيما، بالقوائم القطرية، بعدد الخطوات المطلوب في الاختبار بالضبط. ⚠️ الإنجليزية تسميه بالعنان، **rein-back**، مع أن الحركة تأتي أولا من الظهر والساقين." } },

  { ref:"contre-galop", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le contre-galop"}, en:{m:"counter-canter", p:"kaoune-teur kann-teur"},
           es:{m:"el galope a la contra"}, it:{m:"il galoppo rovesciato"}, // ??
           de:{m:"der Konter-Galopp", p:"kon-teur-ga-lopp", var:"Außengalopp"}, ja:{m:"反対駈歩", p:"hantai kakeho"},
           ar:{m:"العدو المعاكس"} }, // ??
    def:{ fr:"Galoper à droite sur la main gauche, volontairement et en équilibre. C'est un test de rectitude et d'obéissance, pas une faute.",
          en:"Cantering right while going left, on purpose and in balance. A test of straightness and obedience, not a mistake.",
          es:"Galopar a la derecha en la mano izquierda, voluntariamente y en equilibrio. Es una prueba de rectitud y obediencia, no una falta.",
          it:"Galoppare a destra sulla mano sinistra, volontariamente e in equilibrio. È una prova di rettitudine e obbedienza, non un errore.",
          de:"Auf der linken Hand bewusst im Rechtsgalopp gehen, in Balance. Ein Test für Geraderichtung und Gehorsam — kein Fehler.",
          ja:"左手前の回りで、あえて右手前の駈歩を、バランスを保って続けること。真直性と従順さの試験であって、誤りではありません。",
          ar:"العدو على اليد اليمنى فوق المسار الأيسر، عمدا وبتوازن. إنه اختبار للاستقامة والطاعة، لا خطأ." } },

  { ref:"trot-allonge", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le trot allongé"}, en:{m:"extended trot", p:"èks-tèn-dèd trot"},
           es:{m:"el trote largo"}, it:{m:"il trotto allungato"},
           de:{m:"der starke Trab", p:"chtar-ke trab"}, ja:{m:"伸長速歩", p:"shinchō hayaashi"},
           ar:{m:"الخبب الممدود"} }, // ??
    def:{ fr:"L'amplitude maximale, sans précipiter. ⚠️ L'allemand ne dit pas « allongé » mais **starker Trab**, le trot *fort* — et l'échelle allemande complète va de Arbeitstrab (travail) à Mitteltrab (moyen) puis starker Trab.",
          en:"Maximum reach without hurrying. German does not say extended but starker Trab, the strong trot.",
          es:"La amplitud máxima, sin precipitar. ⚠️ El alemán no dice « alargado » sino **starker Trab**, el trote *fuerte* — y la escala alemana completa va de Arbeitstrab (trabajo) a Mitteltrab (medio) y starker Trab.",
          it:"L'ampiezza massima, senza precipitare. ⚠️ Il tedesco non dice « allungato » ma **starker Trab**, il trotto *forte* — e la scala tedesca completa va da Arbeitstrab (di lavoro) a Mitteltrab (medio) a starker Trab.",
          de:"Der größte Rahmen, ohne zu eilen. ⚠️ Das Deutsche sagt nicht « verlängert », sondern **starker Trab** — und die Reihe geht von Arbeitstrab über Mitteltrab zum starken Trab.",
          ja:"急がずに、最大限の伸びを見せる速歩。⚠️ ドイツ語は「伸ばした」ではなく **starker Trab**（強い速歩）と言い、段階も Arbeitstrab（常用）→ Mitteltrab（中間）→ starker Trab と揃っています。",
          ar:"أقصى اتساع للخطوة، من دون تسرع. ⚠️ الألمانية لا تقول «ممدود» بل **starker Trab**، الخبب *القوي* — وسلمها الكامل يمتد من Arbeitstrab (خبب العمل) إلى Mitteltrab (المتوسط) فما فوق." } },

  { ref:"tete-au-mur", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la tête au mur"}, en:{m:"travers", p:"tra-vèr", var:"head to the wall"},
           es:{m:"la grupa adentro"}, it:{m:"il travers"},
           de:{m:"das Traversale", p:"tra-vèr-za-le", var:"Kruppeherein"}, ja:{m:"トラバース", p:"torabāsu"},
           ar:{m:"الرأس إلى الجدار"} },
    def:{ fr:"L'inverse de l'épaule en dedans : ce sont les HANCHES qui rentrent, les épaules restant sur la piste. Le cheval regarde où il va, incurvé du côté du déplacement. ⚠️ L'anglais garde le mot FRANÇAIS, « travers » — comme pour « appuyer » qui devient « half-pass ». Le français dit aussi « croupe au mur », c'est le même mouvement.",
          en:"The opposite of shoulder-in: the HIPS come in, the shoulders stay on the track, and the horse looks where he's going. English keeps the French word, « travers ».",
          es:"Lo contrario de la espalda adentro: entra la GRUPA, las espaldas se quedan en la pista, y el caballo mira hacia donde va.",
          it:"Il contrario della spalla in dentro: entrano le ANCHE, le spalle restano in pista, e il cavallo guarda dove va.",
          de:"Das Gegenteil vom Schulterherein: die HANKEN kommen herein, die Schultern bleiben auf dem Hufschlag, und das Pferd schaut in die Bewegungsrichtung.",
          ja:"ショルダーインの逆。肩は蹄跡に残したまま、腰を内側に入れます。馬は進行方向を見ます。",
          ar:"عكس الكتف إلى الداخل: الوركان هما اللذان يدخلان، والكتفان يبقيان على المسار. الحصان ينظر حيث يذهب، منحنيا في اتجاه الحركة. ⚠️ الإنجليزية تحتفظ بالكلمة الفرنسية «travers»." } },

  ],

  phrases: [

    { ref:"ph-and-haute-ecole", lecon:1, mots:["haute-ecole"],
      fr:"Ce cheval est dressé aux mouvements de haute école.",
      en:"This horse is trained in high-school movements.",
      es:"Este caballo está enseñado en los aires de alta escuela.",
      it:"Questo cavallo è addestrato ai movimenti di alta scuola.",
      de:"Dieses Pferd ist in den Lektionen der Hohen Schule ausgebildet.",
      ja:"この 馬 は 高等 馬術 の 運動 を 仕込ま れ て い ます。",
      ar:"هذا الحصان مدرب على حركات الفروسية العليا." },

    { ref:"ph-and-aides", lecon:1, mots:["aides","harmonie"],
      fr:"Les aides doivent devenir invisibles.",
      en:"The aids should become invisible.",
      es:"Las ayudas deben volverse invisibles.",
      it:"Gli aiuti devono diventare invisibili.",
      de:"Die Hilfen sollen unsichtbar werden.",
      ja:"扶助 は 見え なく なる べき です。",
      ar:"يجب أن تصبح المساعدات غير مرئية." },

    { ref:"ph-and-harmonie", lecon:1, mots:["harmonie","art-equestre"],
      fr:"Le but n'est pas la difficulté, mais l'harmonie.",
      en:"The goal isn't difficulty, but harmony.",
      es:"El objetivo no es la dificultad, sino la armonía.",
      it:"Lo scopo non è la difficoltà, ma l'armonia.",
      de:"Das Ziel ist nicht die Schwierigkeit, sondern die Harmonie.",
      ja:"目的 は 難し さ で は なく、 調和 です。",
      ar:"الغاية ليست الصعوبة، بل الانسجام." },

    { ref:"ph-and-dansent", lecon:1, mots:["choregraphie","spectacle"],
      fr:"On dirait que les chevaux dansent.",
      en:"It looks as though the horses are dancing.",
      es:"Parece que los caballos bailan.",
      it:"Sembra che i cavalli danzino.",
      de:"Es sieht aus, als würden die Pferde tanzen.",
      ja:"馬 が 踊っ て いる よう に 見え ます。",
      ar:"يبدو كأن الخيول ترقص." }

  ],

  /* ==================================================================
     LE DIALOGUE DE JEREZ — 17 août 2026, session 214.

     LA SCÈNE : une matinée à la Real Escuela, de l'entraînement au
     spectacle. 18 phrases, 6 temps.

     🟥 LES DIX-HUIT PHRASES SONT DE BLANDINE, avec leur traduction
     anglaise et le lexique du chapitre.

     🟥 SA STRUCTURE, qui organise les temps :
     **ÉCURIES → ENTRAÎNEMENT → TRAVAIL EN MAIN → PIAFFER / PASSAGE →
     COSTUME → SPECTACLE FINAL**

     ⚠️ NE PAS CONFONDRE JEREZ ET SÉVILLE, à quatre-vingt-dix kilomètres
     l'une de l'autre :
     · SÉVILLE (`parade`) = la Feria, la parade, l'amazone, l'attelage.
       On se montre, personne ne juge, le costume vient du travail au
       champ (traje corto).
     · JEREZ (ici) = la formation ARTISTIQUE, la haute école, la
       précision, le spectacle. Des années pour quelques minutes, et le
       costume est du XVIIIe siècle, celui des écuyers de cour.
     NE PAS mélanger leurs vocabulaires.

     🟥 LE PIÈGE : **HIGH SCHOOL** ne veut pas dire lycée en équitation.
     C'est le calque du français HAUTE ÉCOLE, et l'anglais garde souvent
     le français tel quel. Voir la `def` de `haute-ecole`.

     ⚠️ CINQ MOTS VIENNENT D'AILLEURS et sont en `motsAilleurs` :
     `piaffer`, `passage`, `pirouette`, `changement-pied` de WINDSOR
     (dressage leçon 2), `travail-pied` de SANTA YNEZ. C'est voulu : le
     dressage classique et le horsemanship se rejoignent sur le travail
     à pied, et le montrer vaut mieux que dupliquer.

     ⚠️ ET LA PHRASE 16 EST LA VRAIE QUESTION DU CHAPITRE : « combien
     d'années faut-il pour former un cheval à ce niveau ? » Aucune autre
     ville ne pose la question du TEMPS LONG. Partout ailleurs on
     prépare une épreuve ; ici on prépare une vie.

     `dit` : "joueuse" = elle produit · "club" = un écuyer, un guide.
  ================================================================== */
  dialogue: {
    ville: "jerez", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive à l'école ---- */
      { ref:"dj-heure-entrainement", temps:1, dit:"joueuse", mots:["ecole-royale"],
        fr:"À quelle heure commence l'entraînement des chevaux ?",
        en:"What time does the horses' training start?",
        es:"¿A qué hora empieza el entrenamiento de los caballos?",
        it:"A che ora comincia l'allenamento dei cavalli?",
        de:"Wann beginnt das Training der Pferde?",
        ja:"馬 たち の 稽古 は 何 時 に 始まり ます か ?",
        ar:"في أي ساعة يبدأ تدريب الخيول؟" },

      { ref:"dj-tribunes", temps:1, dit:"joueuse", mots:["ecole-royale","spectacle"],
        fr:"Puis-je regarder la séance depuis les tribunes ?",
        en:"May I watch the training session from the stands?",
        es:"¿Puedo ver la sesión desde las gradas?",
        it:"Posso guardare la seduta dalle tribune?",
        de:"Darf ich die Einheit von der Tribüne aus ansehen?",
        ja:"観覧 席 から 稽古 を 見 て も よい です か ?",
        ar:"هل يمكنني مشاهدة الحصة من المدرجات؟" },

      { ref:"dj-encore-formation", temps:1, dit:"club", mots:["haute-ecole","dressage-classique"],
        fr:"Ce cheval est encore en formation.",
        en:"This horse is still in training.",
        es:"Este caballo todavía está en formación.",
        it:"Questo cavallo è ancora in formazione.",
        de:"Dieses Pferd ist noch in Ausbildung.",
        ja:"この 馬 は まだ 育成 中 です。",
        ar:"هذا الحصان ما زال في طور الإعداد." },

      /* ---- temps 2 · les mouvements ---- */
      { ref:"dj-apprend-haute-ecole", temps:2, dit:"club", mots:["haute-ecole"],
        fr:"Il apprend progressivement les mouvements de haute école.",
        en:"He is gradually learning the high-school movements.",
        es:"Está aprendiendo poco a poco los aires de alta escuela.",
        it:"Sta imparando poco a poco i movimenti di alta scuola.",
        de:"Er lernt nach und nach die Lektionen der Hohen Schule.",
        ja:"少しずつ 高等 馬術 の 運動 を 覚え て い ます。",
        ar:"إنه يتعلم حركات الفروسية العليا شيئا فشيئا." },

      { ref:"dj-demande-passage", temps:2, dit:"club", mots:["aides"], motsAilleurs:["passage"],
        fr:"Le cavalier demande le passage.",
        en:"The rider is asking for passage.",
        es:"El jinete pide el pasaje.",
        it:"Il cavaliere chiede il passage.",
        de:"Der Reiter fragt nach Passage.",
        ja:"騎手 が パッサージュ を 求め て い ます。",
        ar:"الفارس يطلب الباساج." },

      { ref:"dj-piaffer", temps:2, dit:"club", mots:["haute-ecole"], motsAilleurs:["piaffer"],
        fr:"Le cheval effectue maintenant un piaffer.",
        en:"The horse is performing piaffe now.",
        es:"El caballo ejecuta ahora un piafé.",
        it:"Il cavallo esegue adesso un piaffe.",
        de:"Das Pferd zeigt jetzt eine Piaffe.",
        ja:"今、 馬 が ピアッフェ を 行っ て い ます。",
        ar:"الحصان يؤدي الآن البياف." },

      { ref:"dj-pirouette-equilibre", temps:2, dit:"club", mots:["haute-ecole"], motsAilleurs:["pirouette"],
        fr:"Cette pirouette demande beaucoup d'équilibre.",
        en:"This pirouette requires a lot of balance.",
        es:"Esta pirueta exige mucho equilibrio.",
        it:"Questa piroetta richiede molto equilibrio.",
        de:"Diese Pirouette verlangt viel Gleichgewicht.",
        ja:"この ピルーエット に は、 高い バランス が 必要 です。",
        ar:"هذه البيرويت تتطلب توازنا كبيرا." },

      { ref:"dj-changements-reguliers", temps:2, dit:"club", mots:["dressage-classique"], motsAilleurs:["changement-pied"],
        fr:"Regarde comme les changements de pied sont réguliers.",
        en:"Look how regular the flying changes are.",
        es:"Mira qué regulares son los cambios de pie.",
        it:"Guarda come sono regolari i cambi di piede.",
        de:"Schau, wie gleichmäßig die fliegenden Wechsel sind.",
        ja:"フライング チェンジ が どれ ほど 規則 正しい か、 見 て ください。",
        ar:"انظري كم هي منتظمة تبديلات القدم." },

      /* ---- temps 3 · le travail en main et les aides ---- */
      { ref:"dj-travail-a-pied", temps:3, dit:"club", mots:["dressage-classique"], motsAilleurs:["travail-pied"],
        fr:"Certains exercices sont également travaillés à pied.",
        en:"Some exercises are also worked from the ground.",
        es:"Algunos ejercicios también se trabajan desde el suelo.",
        it:"Alcuni esercizi si lavorano anche da terra.",
        de:"Manche Lektionen werden auch vom Boden aus gearbeitet.",
        ja:"一部 の 運動 は、 地上 から も 稽古 し ます。",
        ar:"بعض التمارين تمارس أيضا من الأرض." },

      { ref:"dj-aides-invisibles", temps:3, dit:"club", mots:["aides","harmonie"],
        fr:"Le cheval doit répondre à des aides presque invisibles.",
        en:"The horse should respond to almost invisible aids.",
        es:"El caballo debe responder a ayudas casi invisibles.",
        it:"Il cavallo deve rispondere ad aiuti quasi invisibili.",
        de:"Das Pferd soll auf fast unsichtbare Hilfen reagieren.",
        ja:"馬 は、 ほとんど 見え ない 扶助 に 応え なけれ ば なり ませ ん。",
        ar:"يجب أن يستجيب الحصان لمساعدات تكاد لا ترى." },

      /* ---- temps 4 · le costume ---- */
      { ref:"dj-tenue-spectacle", temps:4, dit:"club", mots:["tenue-traditionnelle","spectacle"],
        fr:"Le cavalier porte une tenue traditionnelle pour le spectacle.",
        en:"The rider is wearing traditional dress for the show.",
        es:"El jinete lleva traje tradicional para el espectáculo.",
        it:"Il cavaliere indossa l'abito tradizionale per lo spettacolo.",
        de:"Der Reiter trägt für die Vorführung traditionelle Kleidung.",
        ja:"騎手 は 公演 の ため に 伝統 衣装 を まとっ て い ます。",
        ar:"الفارس يرتدي زيا تقليديا من أجل العرض." },

      { ref:"dj-prepares-representation", temps:4, dit:"club", mots:["spectacle","numero"],
        fr:"Les chevaux sont préparés spécialement pour la représentation.",
        en:"The horses are specially prepared for the performance.",
        es:"Los caballos se preparan especialmente para la representación.",
        it:"I cavalli sono preparati appositamente per la rappresentazione.",
        de:"Die Pferde werden eigens für die Vorführung vorbereitet.",
        ja:"馬 たち は 公演 の ため に 特別 に 仕上げ られ ます。",
        ar:"تجهز الخيول خصيصا من أجل العرض." },

      /* ---- temps 5 · le spectacle ---- */
      { ref:"dj-entrent-musique", temps:5, dit:"club", mots:["spectacle","choregraphie"],
        fr:"Les chevaux entrent en piste au rythme de la musique.",
        en:"The horses enter the arena to the rhythm of the music.",
        es:"Los caballos entran en pista al ritmo de la música.",
        it:"I cavalli entrano in pista al ritmo della musica.",
        de:"Die Pferde ziehen im Takt der Musik in die Bahn ein.",
        ja:"馬 たち は 音楽 の リズム に 合わせ て 入場 し ます。",
        ar:"تدخل الخيول الحلبة على إيقاع الموسيقى." },

      { ref:"dj-synchronisee", temps:5, dit:"club", mots:["numero","choregraphie"],
        fr:"Toute la reprise doit rester parfaitement synchronisée.",
        en:"The whole performance needs to remain perfectly synchronised.",
        es:"Todo el número debe mantenerse perfectamente sincronizado.",
        it:"Tutto il numero deve restare perfettamente sincronizzato.",
        de:"Die ganze Vorführung muss völlig synchron bleiben.",
        ja:"演目 全体 が、 完全 に 揃っ て い なけれ ば なり ませ ん。",
        ar:"يجب أن تبقى الفقرة كلها متزامنة تماما." },

      { ref:"dj-melange-traditions", temps:5, dit:"club", mots:["choregraphie","dressage-classique","doma-vaquera"],
        fr:"Cette chorégraphie mélange dressage classique et tradition espagnole.",
        en:"This choreography combines classical dressage with Spanish tradition.",
        es:"Esta coreografía mezcla doma clásica y tradición española.",
        it:"Questa coreografia unisce dressage classico e tradizione spagnola.",
        de:"Diese Choreografie verbindet klassische Dressur mit spanischer Tradition.",
        ja:"この 振付 は、 古典 馬術 と スペイン の 伝統 を 織り合わせ て い ます。",
        ar:"هذا التصميم يمزج بين الترويض الكلاسيكي والتقاليد الإسبانية." },

      /* ---- temps 6 · le temps long, et l'harmonie ---- */
      /* 🟥 LA VRAIE QUESTION DU CHAPITRE : aucune autre ville ne pose
         celle du temps long. */
      { ref:"dj-combien-annees", temps:6, dit:"joueuse", mots:["haute-ecole","ecole-royale"],
        fr:"Combien d'années faut-il pour former un cheval à ce niveau ?",
        en:"How many years does it take to train a horse to this level?",
        es:"¿Cuántos años hacen falta para formar a un caballo a este nivel?",
        it:"Quanti anni servono per formare un cavallo a questo livello?",
        de:"Wie viele Jahre braucht es, ein Pferd auf dieses Niveau auszubilden?",
        ja:"この 水準 まで 馬 を 育てる に は、 何 年 かかり ます か ?",
        ar:"كم سنة يلزم لإعداد حصان حتى هذا المستوى؟" },

      { ref:"dj-harmonie-difficulte", temps:6, dit:"club", mots:["harmonie","art-equestre"],
        fr:"Le but n'est pas seulement la difficulté, mais aussi l'harmonie.",
        en:"The goal is not only difficulty, but also harmony.",
        es:"El objetivo no es solo la dificultad, sino también la armonía.",
        it:"Lo scopo non è solo la difficoltà, ma anche l'armonia.",
        de:"Das Ziel ist nicht nur die Schwierigkeit, sondern auch die Harmonie.",
        ja:"目的 は 難し さ だけ で は なく、 調和 に も あり ます。",
        ar:"الغاية ليست الصعوبة فقط، بل الانسجام أيضا." },

      { ref:"dj-chevaux-dansent", temps:6, dit:"joueuse", mots:["spectacle","choregraphie","harmonie"],
        fr:"Le spectacle donne l'impression que les chevaux dansent.",
        en:"The show makes it look as though the horses are dancing.",
        es:"El espectáculo da la impresión de que los caballos bailan.",
        it:"Lo spettacolo dà l'impressione che i cavalli danzino.",
        de:"Die Vorführung lässt es aussehen, als würden die Pferde tanzen.",
        ja:"この 公演 を 見 て いる と、 馬 が 踊っ て いる よう に 感じ ます。",
        ar:"العرض يعطي انطباعا بأن الخيول ترقص." }
    ]
  }
};
