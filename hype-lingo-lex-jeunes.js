/* hype-lingo-lex-jeunes.js — Hype Linguae · Fontainebleau · « Les jeunes chevaux »
   ==================================================================
   25 CONCEPTS, DEUX LEÇONS. Ville : FONTAINEBLEAU, 34e étape.

   🟥 18/08/2026 : FUSION. Fontainebleau puisait dans DEUX FICHIERS
   séparés (`cheval` leçon 4 + ce fichier), ce qui l'a fait disparaître
   sans erreur visible pendant le découpage un-fichier-par-ville du
   soir même — Blandine : « il y a plein d'autres phrases sur le
   lexique jeunes je crois ». Les deux sources sont maintenant DANS CE
   SEUL FICHIER, sur deux leçons distinctes, pour qu'il n'y ait plus
   qu'un seul endroit à ouvrir pour toute la ville.
   ⚠️ AUCUN `ref` DE CONCEPT NI DE PHRASE N'A CHANGÉ dans l'opération —
   copie ligne à ligne depuis les deux fichiers d'origine.

   🟥 POURQUOI CETTE VILLE EXISTE — 17 août 2026, session 214.
   Blandine : *« on ne peut pas rater la Grande Semaine »*. Rien dans le
   voyage ne parlait du JEUNE CHEVAL EN COMPÉTITION, alors que c'est la
   moitié du métier : un cheval de sport passe ses quatre premières
   années à être formé avant qu'on sache ce qu'il vaut.

   LES DEUX LEÇONS :
   · leçon 1 — le circuit, les cycles, la finale, la valorisation (13
     concepts, propres à ce fichier depuis l'origine).
   · leçon 4 — le hongre, l'étalon, la jument, le poulain, l'âge, le
     caractère, calme, chaud, la race, le sang chaud (12 concepts,
     hérités de `cheval.js` le 17/08 — ils appartenaient à JEREZ, où ils
     ne disaient rien du lieu. Jerez a reçu en échange un fichier neuf :
     `hype-lingo-lex-andalou.js`). Numéro de leçon conservé tel quel,
     sans renumérotation, pour ne rien casser côté `ETAPE_SRC`.

   🟥 LA LOGIQUE DU CHAPITRE, posée par elle :
     **4 ANS → APPRENDRE · 5 ANS → DÉVELOPPER · 6 ANS → CONFIRMER**
     et la finale à Fontainebleau au bout.
   ⚠️ Ce n'est pas une règle de règlement mais une logique pédagogique :
   à quatre ans on construit, à cinq on développe, à six on commence à
   confirmer le potentiel sportif. NE PAS la présenter comme un barème.

   🟥 ET LA SECONDE LOGIQUE, celle qui fait la place de cette ville dans
   le voyage :
     **FORMATION → QUALIFICATION → FINALE → VISIBILITÉ → VENTE OU SPORT**
   Fontainebleau est le maillon entre GOLEGÃ et LEXINGTON (on élève) et
   VÉRONE (on achète) : c'est là que le jeune cheval se révèle. La
   Grande Semaine est un lieu de sport ET un lieu de commerce, où
   éleveurs, cavaliers, propriétaires et acheteurs se retrouvent.

   ⚠️ NE PAS TRADUIRE « CYCLE CLASSIQUE » ET « CYCLE LIBRE » MOT À MOT.
   Ce sont des circuits français, sans équivalent ailleurs. On les
   EXPLIQUE : *the French professional young horse series* et *the
   French amateur young horse series*. Une traduction littérale ferait
   croire à un concept universel qui n'existe pas.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE, surtout sur l'espagnol et l'italien
   des circuits jeunes chevaux : chaque pays a son système et ses mots.
   Les entrées marquées // ?? sont celles dont je suis le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.jeunes = {
  ref: "jeunes",
  chapitre: 26,
  titre: { fr:"Les jeunes chevaux", en:"Young horses", es:"Los caballos jóvenes",
           it:"I cavalli giovani", de:"Die jungen Pferde", ja:"若馬", ar:"الخيول الشابة" },
  lecons: 2,

  concepts: [

  { ref:"jeune-cheval-sport", lecon:1, coll:"circuit",
    mots:{ fr:{m:"le jeune cheval"}, en:{m:"the young horse", p:"yeunng hors"},
           es:{m:"el caballo joven"}, it:{m:"il cavallo giovane"},
           de:{m:"das junge Pferd", p:"youn-gue pfèrt"}, ja:{m:"若馬", p:"wakauma"},
           ar:{m:"الحصان الشاب"} },
    def:{ fr:"🟥 EN SPORT, « JEUNE CHEVAL » A UN SENS PRÉCIS : de quatre à six ans, parfois sept. Avant, c'est un poulain ; après, c'est un cheval. ⚠️ Ce n'est pas un jugement sur sa maturité — un cheval n'est physiquement fini qu'à sept ou huit ans — mais une classe de concours. Les jeunes chevaux ont leurs propres épreuves partout en Europe, et ne courent jamais contre des chevaux faits.",
          en:"In sport « young horse » means something exact: four to six years old, sometimes seven. Before that he's a foal or a youngster; after, he's a horse. It isn't a judgement on maturity — a horse isn't physically finished before seven or eight — it's a competition class.",
          es:"En el deporte « caballo joven » significa algo preciso: de cuatro a seis años. No es un juicio sobre su madurez, sino una clase de competición.",
          it:"Nello sport « cavallo giovane » ha un senso preciso: dai quattro ai sei anni. Non è un giudizio sulla maturità, ma una categoria di gara.",
          de:"Im Sport heißt « junges Pferd » etwas Genaues: vier bis sechs Jahre, manchmal sieben. Kein Urteil über die Reife, sondern eine Prüfungsklasse.",
          ja:"競技で「若馬」と言えば四歳から六歳、時に七歳までを指します。それ以前は当歳・若駒、それ以降は成馬です。成熟度の評価ではなく、競技のクラス分けです。馬の体が完成するのは七〜八歳です。",
          ar:"🟥 في رياضة الفروسية، لمصطلح «الحصان الشاب» معنى محدد: من أربع إلى ست سنوات، وأحيانا حتى سبع سنوات. قبل ذلك يكون مهرا، وبعد هذه المرحلة يعد حصانا بالغا. ⚠️ هذا لا يعني أن الحصان قد اكتمل نضجه جسديا — فجسمه لا يكتمل تماما إلا في سن السابعة أو الثامنة — بل هي فئة عمرية خاصة بالمسابقات. وللخيول الشابة منافساتها الخاصة في أنحاء أوروبا، ولا تنافس فيها الخيول المتمرسة." } },

  { ref:"circuit-jeunes", lecon:1, coll:"circuit",
    mots:{ fr:{m:"le circuit jeunes chevaux"}, en:{m:"the young horse circuit", p:"seur-kite", var:"the young horse series"},
           es:{m:"el circuito de caballos jóvenes"}, it:{m:"il circuito cavalli giovani"},
           de:{m:"die Jungpferdeserie", p:"youn-pfèr-de-zé-rie"}, ja:{m:"若馬サーキット", p:"wakauma sākitto"},
           ar:{m:"دورة مسابقات الخيول الشابة"} },
    def:{ fr:"⚠️ **CIRCUIT** OU **SERIES** EN ANGLAIS : le premier insiste sur le parcours d'épreuves dans l'année, le second sur la suite d'épreuves liées. Les deux se disent. 🟥 Le principe est le même partout en Europe : le jeune cheval tourne toute la saison sur des épreuves de sa génération, accumule des points, et les meilleurs vont en finale. Ce n'est pas un championnat : c'est une formation qui se termine par un examen.",
          en:"« Circuit » or « series »: the first stresses the year's run of classes, the second the linked sequence. The principle is the same across Europe: a young horse competes all season against his own age group, gathers points, and the best go to a final. Not a championship — a training year that ends in an exam.",
          es:"El principio es el mismo en toda Europa: el caballo joven compite toda la temporada contra su generación, acumula puntos, y los mejores van a la final.",
          it:"Il principio è lo stesso in tutta Europa: il cavallo giovane gareggia tutta la stagione contro la sua generazione, accumula punti, e i migliori vanno in finale.",
          de:"Das Prinzip ist in ganz Europa dasselbe: das junge Pferd startet die Saison über in seiner Altersklasse, sammelt Punkte, und die Besten kommen ins Finale.",
          ja:"英語では circuit とも series とも言います。仕組みはヨーロッパ共通で、若馬は一年を通して同世代のクラスに出場し、点数を積み、上位が決勝に進みます。選手権ではなく、試験で締めくくられる育成の一年です。",
          ar:"⚠️ في الإنجليزية يمكن استعمال **circuit** أو **series**: الأولى تركز على مجموعة المسابقات التي يخوضها الحصان خلال الموسم، والثانية على سلسلة المنافسات المرتبطة بعضها ببعض. وكلتاهما صحيحة. 🟥 والمبدأ متشابه في أنحاء أوروبا: يشارك الحصان الشاب طوال الموسم في منافسات مخصصة لفئته العمرية، ويجمع النقاط، ثم تتأهل أفضل الخيول إلى النهائي. ليست بطولة بالمعنى التقليدي، بل سنة من التدريب والتدرج تنتهي باختبار." } },

  { ref:"cycle-classique", lecon:1, coll:"circuit",
    mots:{ fr:{m:"le Cycle Classique"}, en:{m:"the French professional young horse series", p:"prô-fè-cheu-neul"},
           es:{m:"el circuito profesional francés"}, it:{m:"il circuito professionistico francese"},
           de:{m:"die französische Profi-Jungpferdeserie"}, ja:{m:"フランスのプロ向け若馬サーキット", p:"puro muke wakauma sākitto"},
           ar:{m:"دورة الخيول الشابة الفرنسية للمحترفين"} },
    def:{ fr:"🟥 NE SE TRADUIT PAS, ON L'EXPLIQUE. « Cycle Classique » est un circuit français : personne à l'étranger ne comprendrait « the Classic Cycle », qui ne veut rien dire. On dit *the French professional young horse series*. ⚠️ Il est réservé aux cavaliers professionnels et mène aux finales nationales de la Grande Semaine, à Fontainebleau. Son contraire est le Cycle Libre, pour les amateurs.",
          en:"Doesn't translate — you explain it. « Cycle Classique » is a French circuit; nobody abroad would understand « the Classic Cycle ». Say « the French professional young horse series ». It's for professional riders and leads to the national finals at Fontainebleau.",
          es:"No se traduce: se explica. Es un circuito francés reservado a los jinetes profesionales, que lleva a las finales nacionales de Fontainebleau.",
          it:"Non si traduce: si spiega. È un circuito francese riservato ai cavalieri professionisti, che porta alle finali nazionali di Fontainebleau.",
          de:"Lässt sich nicht übersetzen, man erklärt es. Ein französischer Zirkus für Berufsreiter, der zu den nationalen Finals in Fontainebleau führt.",
          ja:"翻訳せず、説明します。Cycle Classique はフランス独自の circuit で、直訳しても外国では通じません。the French professional young horse series と言います。プロ騎手向けで、フォンテーヌブローの全国決勝につながります。",
          ar:"🟥 لا نترجم اسم **Cycle Classique** حرفيا، بل نشرحه. فهو نظام فرنسي خاص، ولن يكون لترجمة حرفية مثل «الدورة الكلاسيكية» معنى واضح خارج فرنسا. وهو مخصص للفرسان المحترفين ويقود إلى النهائيات الوطنية خلال Grande Semaine في Fontainebleau. ويقابله **Cycle Libre** المخصص للفرسان الهواة." } },

  { ref:"cycle-libre", lecon:1, coll:"circuit",
    mots:{ fr:{m:"le Cycle Libre"}, en:{m:"the French amateur young horse series", p:"a-me-teur"},
           es:{m:"el circuito amateur francés"}, it:{m:"il circuito amatoriale francese"},
           de:{m:"die französische Amateur-Jungpferdeserie"}, ja:{m:"フランスのアマチュア向け若馬サーキット", p:"amachua muke"},
           ar:{m:"دورة الخيول الشابة الفرنسية للهواة"} },
    def:{ fr:"⚠️ MÊME RÈGLE : on l'explique, on ne le traduit pas. Le Cycle Libre est ouvert aux cavaliers amateurs — et c'est ce qui fait la particularité française : un jeune cheval peut être valorisé par quelqu'un dont ce n'est pas le métier. 🟥 Les deux cycles ont leurs finales à la Grande Semaine, sur les mêmes terrains.",
          en:"Same rule: explain, don't translate. The Cycle Libre is open to amateur riders — which is what makes the French system particular: a young horse can be brought on by someone who doesn't do it for a living. Both cycles have their finals at the Grande Semaine.",
          es:"Misma regla: se explica. El Cycle Libre está abierto a los jinetes amateurs, lo que hace la particularidad del sistema francés.",
          it:"Stessa regola: si spiega. Il Cycle Libre è aperto ai cavalieri amatori, ed è la particolarità del sistema francese.",
          de:"Dieselbe Regel: erklären, nicht übersetzen. Der Cycle Libre steht Amateuren offen — die Besonderheit des französischen Systems.",
          ja:"同じ規則で、翻訳せず説明します。Cycle Libre はアマチュア騎手に開かれており、これがフランスの制度の特徴です。本業でない人でも若馬を育て上げられます。両方の決勝がグランド・スメーヌで行われます。",
          ar:"⚠️ القاعدة نفسها: نشرح الاسم ولا نترجمه حرفيا. **Cycle Libre** مفتوح للفرسان الهواة — وهذه إحدى خصوصيات النظام الفرنسي، إذ يمكن لشخص لا يمارس ركوب الخيل كمهنة أن يتولى إعداد حصان شاب وإبرازه رياضيا. 🟥 ويصل كلا النظامين، Cycle Classique وCycle Libre، إلى نهائيات Grande Semaine في Fontainebleau." } },

  { ref:"epreuve-formation", lecon:1, coll:"circuit",
    mots:{ fr:{m:"l'épreuve de formation"}, en:{m:"the training class", p:"tré-ninng klass"},
           es:{m:"la prueba de formación"}, it:{m:"la prova di formazione"},
           de:{m:"die Ausbildungsprüfung", p:"aouss-bil-doungs-pru-foung"}, ja:{m:"育成クラス", p:"ikusei kurasu"},
           ar:{m:"مسابقة تدريبية للخيول الشابة"} },
    def:{ fr:"🟥 UNE ÉPREUVE OÙ L'ON NE VIENT PAS GAGNER. Le parcours est construit pour apprendre : distances justes, abords francs, rien de piégeux. On y va pour que le cheval découvre l'ambiance, le public, les allers-retours, et en ressorte confiant. ⚠️ Le pire résultat qu'on puisse y faire n'est pas une faute : c'est un cheval qui en sort inquiet.",
          en:"A class you don't come to win. The course is built to teach: fair distances, honest approaches, nothing tricky. You go so the horse meets the atmosphere, the crowd, the coming and going, and leaves confident. The worst result isn't a fault — it's a horse who leaves worried.",
          es:"Una prueba a la que no se va a ganar. El recorrido está hecho para enseñar. El peor resultado no es una falta: es un caballo que sale inquieto.",
          it:"Una prova in cui non si va per vincere. Il percorso è costruito per insegnare. Il risultato peggiore non è una penalità: è un cavallo che esce preoccupato.",
          de:"Eine Prüfung, bei der man nicht gewinnen will. Der Parcours ist zum Lernen gebaut. Das schlechteste Ergebnis ist kein Fehler, sondern ein Pferd, das beunruhigt herauskommt.",
          ja:"勝ちに行かない競技です。コースは学ばせるために設計され、距離は素直で、罠がありません。雰囲気、観客、出入りに馬を慣れさせ、自信をつけて帰ることが目的です。最悪の結果は減点ではなく、不安を抱えて出てくることです。",
          ar:"🟥 مسابقة لا تدخلينها بهدف الفوز. يصمم المسار من أجل تعليم الحصان: مسافات مناسبة، واقترابات واضحة، ومن دون صعوبات خادعة. الهدف أن يكتشف الحصان أجواء المسابقة والجمهور والحركة من حوله، ثم يغادر الميدان أكثر ثقة. ⚠️ أسوأ نتيجة هنا ليست إسقاط عارضة، بل أن يخرج الحصان من التجربة قلقا أو خائفا." } },

  { ref:"generation", lecon:1, coll:"circuit",
    mots:{ fr:{m:"la génération"}, en:{m:"the age group", p:"éïdj groupe", var:"the generation"},
           es:{m:"la generación"}, it:{m:"la generazione"},
           de:{m:"der Jahrgang", p:"yar-gann"}, ja:{m:"世代", p:"sedai"},
           ar:{m:"الفئة العمرية"} },
    def:{ fr:"⚠️ L'ANGLAIS DIT **AGE GROUP**, plus technique que *generation* qui parle des humains. 🟥 Et l'allemand a le plus beau mot : **der Jahrgang**, « la marche de l'année » — le même qu'on emploie pour un millésime de vin. Tous les chevaux nés la même année forment un Jahrgang, et se suivent toute leur carrière.",
          en:"English says « age group », more technical than « generation », which is for people. German has the finest word: der Jahrgang — the same one used for a vintage of wine. All the horses foaled in one year form a Jahrgang and follow each other for their whole careers.",
          es:"El inglés dice « age group ». El alemán tiene la palabra más bella: Jahrgang, la misma que se usa para una añada de vino.",
          it:"L'inglese dice « age group ». Il tedesco ha la parola più bella: Jahrgang, la stessa che si usa per un'annata di vino.",
          de:"Jahrgang — dasselbe Wort wie beim Wein. Alle Pferde eines Geburtsjahres bilden einen Jahrgang und begleiten einander die ganze Karriere.",
          ja:"英語では generation より専門的な age group を使います。ドイツ語には最も美しい語があります。Jahrgang — ワインの「当たり年」と同じ語です。同じ年に生まれた馬はひとつの Jahrgang をなし、生涯たがいを追い続けます。",
          ar:"⚠️ في الإنجليزية يفضل في هذا السياق استعمال **age group** بدلا من *generation*، لأنها أدق في لغة الرياضة. 🟥 أما الألمانية فتستعمل كلمة **Jahrgang**، وهي الكلمة نفسها التي تستعمل لسنة إنتاج النبيذ. فالخيول المولودة في السنة نفسها تنتمي إلى الفئة العمرية نفسها، وتستمر في مقارنة مستواها ببعضها خلال مسيرتها الرياضية." } },

  { ref:"quatre-ans", lecon:1, coll:"age",
    mots:{ fr:{m:"le cheval de quatre ans"}, en:{m:"the four-year-old", p:"for-yir-ôlde"},
           es:{m:"el caballo de cuatro años"}, it:{m:"il cavallo di quattro anni"},
           de:{m:"der Vierjährige", p:"fir-yè-ri-gue"}, ja:{m:"四歳馬", p:"yonsaiba"},
           ar:{m:"الحصان في سن أربع سنوات"} },
    def:{ fr:"🟥 QUATRE ANS : ON APPREND. Première saison de concours, tout est nouveau — le camion, le paddock, le public, les fanions. On ne demande ni vitesse ni hauteur : on demande que le cheval saute droit, franchement, et reparte content. ⚠️ EN ANGLAIS **FOUR-YEAR-OLD** S'ÉCRIT AVEC DES TRAITS D'UNION et « year » reste au SINGULIER : jamais « four-years-old » quand c'est un nom.",
          en:"Four: he learns. First season, everything is new — the lorry, the collecting ring, the crowd, the flags. You ask for neither speed nor height: you ask him to jump straight, honestly, and leave happy. Note the hyphens, and « year » stays singular in the noun.",
          es:"Cuatro años: se aprende. Primera temporada, todo es nuevo. No se pide ni velocidad ni altura: se pide que salte derecho y se vaya contento.",
          it:"Quattro anni: si impara. Prima stagione, tutto è nuovo. Non si chiede né velocità né altezza: si chiede di saltare dritto e di ripartire contento.",
          de:"Vier: er lernt. Erste Saison, alles ist neu. Man verlangt weder Tempo noch Höhe, sondern dass er gerade und ehrlich springt und zufrieden heimfährt.",
          ja:"四歳は「学ぶ」年。初めての競技シーズンで、輸送も、下見馬場も、観客も、旗もすべてが新しい。速さも高さも求めません。まっすぐ素直に飛び、気持ちよく帰ることだけを求めます。英語では four-year-old とハイフンでつなぎ、year は単数のままです。",
          ar:"🟥 **أربع سنوات: يتعلم.** إنه موسمه الأول في المسابقات، وكل شيء جديد عليه — الشاحنة، وميدان الإحماء، والجمهور، والأعلام. لا نطلب منه السرعة ولا الارتفاع، بل أن يقفز باستقامة وثقة وأن ينهي تجربته مرتاحا. ⚠️ في الإنجليزية تكتب **four-year-old** بشرطات، وتبقى كلمة *year* في المفرد عندما تستعمل العبارة اسما." } },

  { ref:"cinq-six-ans", lecon:1, coll:"age",
    mots:{ fr:{m:"le cheval de cinq ans", var:"le six ans"}, en:{m:"the five-year-old", p:"faïv-yir-ôlde", var:"the six-year-old"},
           es:{m:"el caballo de cinco años"}, it:{m:"il cavallo di cinque anni"},
           de:{m:"der Fünfjährige", p:"funf-yè-ri-gue"}, ja:{m:"五歳馬", p:"gosaiba"},
           ar:{m:"الحصان في سن خمس سنوات", var:"الحصان في سن ست سنوات"} },
    def:{ fr:"🟥 CINQ ANS : ON DÉVELOPPE. SIX ANS : ON CONFIRME. À cinq ans on demande de la technique et de l'équilibre, à six on commence à voir ce que le cheval vaudra vraiment. ⚠️ Les parcours ne sont pas les mêmes d'une génération à l'autre — hauteur, longueur, technicité montent chaque année. C'est tout le principe : on ne saute pas plus haut avant d'avoir sauté mieux.",
          en:"Five: he develops. Six: he confirms. At five you ask for technique and balance; at six you start to see what the horse will really be worth. The courses differ by age group — height, length and technicality rise each year. You don't jump higher until you jump better.",
          es:"Cinco años: se desarrolla. Seis: se confirma. Los recorridos no son los mismos de una generación a otra.",
          it:"Cinque anni: si sviluppa. Sei: si conferma. I percorsi non sono gli stessi da una generazione all'altra.",
          de:"Fünf: er entwickelt sich. Sechs: er bestätigt. Die Parcours unterscheiden sich je Jahrgang — Höhe, Länge und Schwierigkeit steigen jedes Jahr.",
          ja:"五歳は「伸ばす」年、六歳は「確かめる」年。五歳では技術とバランスを求め、六歳でその馬の本当の価値が見え始めます。世代ごとにコースは異なり、高さも長さも難度も毎年上がります。より高く飛ぶ前に、より良く飛ぶのです。",
          ar:"🟥 **خمس سنوات: نطور. ست سنوات: نؤكد.** في سن الخامسة نبدأ بطلب مزيد من التقنية والتوازن، وفي السادسة يبدأ المستوى الحقيقي للحصان وإمكاناته الرياضية في الظهور بوضوح أكبر. ⚠️ ولا تكون المسارات متطابقة بين الفئات العمرية: فالارتفاع والطول والصعوبة التقنية تتطور سنة بعد سنة. المبدأ بسيط: لا نطلب من الحصان أن يقفز أعلى قبل أن يتعلم أن يقفز أفضل." } },

  { ref:"finale-nationale", lecon:1, coll:"finale",
    mots:{ fr:{m:"la finale nationale"}, en:{m:"the national final", p:"na-cheu-neul faï-neul"},
           es:{m:"la final nacional"}, it:{m:"la finale nazionale"},
           de:{m:"das nationale Finale", p:"fi-na-le"}, ja:{m:"全国決勝", p:"zenkoku kesshō"},
           ar:{m:"النهائي الوطني"} },
    def:{ fr:"⚠️ ON N'Y VA PAS, ON S'Y QUALIFIE : il faut des points, des classements, une saison entière. 🟥 À Fontainebleau, les finales de toutes les générations se courent dans la même semaine, sur le Grand Parquet — c'est ce qui fait de la Grande Semaine un rendez-vous unique : on y voit d'un coup ce qu'une année de chevaux français vaut.",
          en:"You don't just turn up — you qualify: points, placings, a whole season. At Fontainebleau the finals of every age group run in the same week, on the Grand Parquet. That's what makes the Grande Semaine unique: you see a whole year of French horses at once.",
          es:"No se va: hay que clasificarse. En Fontainebleau las finales de todas las generaciones se corren en la misma semana.",
          it:"Non ci si va: ci si qualifica. A Fontainebleau le finali di tutte le generazioni si corrono nella stessa settimana.",
          de:"Man fährt nicht einfach hin — man qualifiziert sich. In Fontainebleau laufen die Finals aller Jahrgänge in derselben Woche.",
          ja:"行くのではなく、資格を得るのです。点数、順位、そして一年のシーズンが必要です。フォンテーヌブローでは全世代の決勝が同じ週に行われます。フランスの一年分の馬をまとめて見られる、唯一の機会です。",
          ar:"⚠️ لا يكفي الذهاب إليه، بل يجب **التأهل**: نقاط، ونتائج، وموسم كامل من المنافسات. 🟥 وفي Fontainebleau تقام نهائيات مختلف الفئات العمرية خلال الأسبوع نفسه على Grand Parquet. وهذا ما يجعل Grande Semaine موعدا فريدا: ففي مكان واحد يمكن رؤية حصيلة سنة كاملة من إعداد الخيول الفرنسية الشابة." } },

  { ref:"grande-semaine", lecon:1, coll:"finale",
    mots:{ fr:{m:"la Grande Semaine"}, en:{m:"the Grande Semaine", p:"grannde seu-mène"},
           es:{m:"la Grande Semaine"}, it:{m:"la Grande Semaine"},
           de:{m:"die Grande Semaine"}, ja:{m:"グランド・スメーヌ", p:"gurando sumēnu"},
           ar:{m:"Grande Semaine"} },
    def:{ fr:"🟥 LE NOM RESTE EN FRANÇAIS PARTOUT, comme *paseo* à Séville et *keiko* à Tokyo. C'est l'aboutissement de la saison des jeunes chevaux : dix jours au Grand Parquet, les finales de CSO et de hunter, tous les cycles réunis. ⚠️ Et c'est autant un lieu de COMMERCE que de sport : éleveurs, cavaliers, propriétaires et acheteurs s'y retrouvent, et les vidéos servent à faire connaître les chevaux à vendre.",
          en:"The name stays French everywhere, like « paseo » in Seville. It's the culmination of the young horse season: ten days at the Grand Parquet, the showjumping and hunter finals, every cycle together. And it's as much a marketplace as a sporting event.",
          es:"El nombre queda en francés en todas partes. Es la culminación de la temporada de caballos jóvenes, y es tanto un mercado como una competición.",
          it:"Il nome resta in francese ovunque. È il culmine della stagione dei cavalli giovani, ed è tanto un mercato quanto una gara.",
          de:"Der Name bleibt überall französisch. Der Höhepunkt der Jungpferdesaison — und ebenso Markt wie Sportereignis.",
          ja:"どの言語でもフランス語のまま使われます。セビリアの paseo や東京の稽古と同じです。若馬シーズンの総決算で、グラン・パルケでの十日間、障害とハンターの決勝がすべて集まります。競技の場であると同時に、商いの場でもあります。",
          ar:"🟥 يبقى الاسم بالفرنسية في جميع اللغات، كما تبقى كلمات محلية أخرى مرتبطة بثقافة الفروسية من دون ترجمة. إنها ذروة موسم الخيول الشابة: عشرة أيام في Grand Parquet، ونهائيات قفز الحواجز والـ hunter، واجتماع مختلف الدورات الفرنسية. ⚠️ وهي أيضا مكان **للتجارة** بقدر ما هي حدث رياضي: يجتمع فيها المربون والفرسان والملاك والمشترون، وتستخدم مقاطع الفيديو والنتائج للتعريف بالخيول المعروضة للبيع." } },

  { ref:"experience", lecon:1, coll:"valeur",
    mots:{ fr:{m:"l'expérience"}, en:{m:"experience", p:"èks-pi-ri-eunss"},
           es:{m:"la experiencia"}, it:{m:"l'esperienza"},
           de:{m:"die Erfahrung", p:"èr-fa-roung"}, ja:{m:"経験", p:"keiken"},
           ar:{m:"الخبرة"} },
    def:{ fr:"🟥 CE QU'ON VIENT CHERCHER, PLUS QUE LE CLASSEMENT. ⚠️ En anglais **experience** est INDÉNOMBRABLE dans ce sens : *he lacks experience*, jamais « experiences » — le pluriel existe mais désigne des expériences vécues, des épisodes. Deux mots dans un seul. 🟥 Et l'expérience ne se rattrape pas : un cheval de six ans qui n'a rien vu à quatre restera longtemps impressionnable.",
          en:"What you come for, more than the placing. « Experience » is uncountable here: he lacks experience, never « experiences » — the plural exists but means episodes. And experience can't be caught up: a six-year-old who saw nothing at four stays impressionable for a long time.",
          es:"Lo que se viene a buscar, más que la clasificación. Y la experiencia no se recupera: un caballo de seis años que no vio nada a los cuatro sigue impresionable.",
          it:"Ciò che si viene a cercare, più della classifica. E l'esperienza non si recupera: un cavallo di sei anni che non ha visto niente a quattro resta impressionabile.",
          de:"Wofür man kommt, mehr als für die Platzierung. Und Erfahrung lässt sich nicht nachholen: ein Sechsjähriger, der mit vier nichts gesehen hat, bleibt lange schreckhaft.",
          ja:"順位よりも、これを求めて来ます。英語の experience はこの意味では不可算です。experiences と複数にすると「体験談」の意味になります。そして経験は取り戻せません。四歳で何も見なかった六歳馬は、長く物見が残ります。",
          ar:"🟥 هذا هو ما نأتي للحصول عليه قبل التفكير في الترتيب. ⚠️ في الإنجليزية تكون كلمة **experience** غير معدودة بهذا المعنى: نقول *he lacks experience*، ولا نقول *experiences*. فصيغة الجمع تعني تجارب أو أحداثا عاشها الشخص أو الحصان. 🟥 والخبرة لا يمكن تعويضها بسهولة: فالحصان الذي يبلغ السادسة من دون أن يكون قد تعرف في الرابعة إلى مواقف مختلفة قد يبقى سريع التأثر لفترة طويلة." } },

  { ref:"potentiel", lecon:1, coll:"valeur",
    mots:{ fr:{m:"le potentiel"}, en:{m:"potential", p:"pe-tèn-cheul"},
           es:{m:"el potencial"}, it:{m:"il potenziale"},
           de:{m:"das Potenzial", p:"pô-tèn-tsial"}, ja:{m:"素質", p:"soshitsu"},
           ar:{m:"الإمكانات"} },
    def:{ fr:"⚠️ EN ANGLAIS **POTENTIAL** S'EMPLOIE SANS ARTICLE : *he has a lot of potential*, jamais « a potential ». 🟥 Et c'est le mot le plus dangereux du chapitre : le potentiel n'est pas un résultat, c'est une promesse — beaucoup de chevaux de quatre ans « pleins de potentiel » ne deviennent jamais rien. Ce qui se juge vraiment, c'est ce que le cheval fait déjà : la technique, l'équilibre, la progression.",
          en:"« Potential » takes no article: he has a lot of potential, never « a potential ». And it's the chapter's most dangerous word: potential isn't a result, it's a promise — plenty of four-year-olds « full of potential » never become anything.",
          es:"« Potential » no lleva artículo en inglés. Y es la palabra más peligrosa del capítulo: el potencial no es un resultado, es una promesa.",
          it:"« Potential » non prende articolo in inglese. Ed è la parola più pericolosa del capitolo: il potenziale non è un risultato, è una promessa.",
          de:"« Potential » steht im Englischen ohne Artikel. Und es ist das gefährlichste Wort des Kapitels: Potenzial ist kein Ergebnis, sondern ein Versprechen.",
          ja:"英語の potential は冠詞をつけません。そしてこの章で最も危うい語です。素質は結果ではなく約束にすぎず、「素質がある」と言われた四歳馬の多くは何にもなりません。本当に判断すべきは、その馬がすでにできていること — 技術、バランス、進歩です。",
          ar:"⚠️ في الإنجليزية تستعمل **potential** من دون أداة تنكير: نقول *he has a lot of potential*، وليس *a potential*. 🟥 وهي من أخطر كلمات هذا الفصل: فالإمكانات ليست نتيجة، بل وعد. كثير من الخيول في سن الرابعة توصف بأنها «مليئة بالإمكانات» ثم لا تصل أبدا إلى المستوى المتوقع. ما يجب تقييمه فعلا هو ما يستطيع الحصان القيام به بالفعل: تقنيته، وتوازنه، ومدى تطوره." } },

  { ref:"valorisation", lecon:1, coll:"valeur",
    mots:{ fr:{m:"la valorisation"}, en:{m:"development", p:"di-vè-leup-meunt", var:"showcasing"},
           es:{m:"la valorización"}, it:{m:"la valorizzazione"},
           de:{m:"die Aufwertung", p:"aouf-vèr-toung"}, ja:{m:"価値づくり", p:"kachizukuri"},
           ar:{m:"إعداد الحصان وإبراز قيمته"} },
    def:{ fr:"🟥 UN MOT FRANÇAIS QUE L'ANGLAIS NE RENDA PAS. *Development* dit le travail, *showcasing* dit la présentation — mais « valorisation » dit les deux à la fois, ET l'augmentation de la valeur marchande qui en résulte. C'est un mot du commerce déguisé en mot de sport, et c'est exactement ce qu'est la Grande Semaine. ⚠️ On dit « valoriser un jeune cheval » : le former ET le faire connaître.",
          en:"A French word English doesn't render. « Development » says the work, « showcasing » says the display — but « valorisation » says both at once, and the rise in market value that follows. A trade word dressed as a sporting one, and that is exactly what the Grande Semaine is.",
          es:"Una palabra francesa que el inglés no traduce del todo: dice a la vez el trabajo, la presentación y el aumento del valor comercial.",
          it:"Una parola francese che l'inglese non rende: dice insieme il lavoro, la presentazione e l'aumento del valore commerciale.",
          de:"Ein französisches Wort, das Englisch nicht wiedergibt: es meint zugleich die Arbeit, die Präsentation und den Wertzuwachs.",
          ja:"英語に対応語のないフランス語。development は作業を、showcasing は見せ方を表しますが、valorisation はその両方に加えて「市場価値が上がること」まで含みます。競技の語に見せかけた商いの語であり、グランド・スメーヌはまさにそれです。",
          ar:"🟥 كلمة فرنسية لا يوجد لها مقابل إنجليزي واحد يؤدي معناها بالكامل. فكلمة *development* تصف عملية إعداد الحصان، و*showcasing* تصف إبرازه وعرضه، أما **valorisation** فتجمع المعنيين وتضيف إليهما ارتفاع قيمته التجارية نتيجة لذلك. إنها كلمة من عالم التجارة تبدو كأنها كلمة رياضية — وهذا بالضبط أحد أوجه Grande Semaine. ⚠️ «Valoriser un jeune cheval» يعني تدريبه وتطويره **وجعله معروفا** في الوقت نفسه." } }

,

  /* ============ LEÇON 4 · ÂGE, SEXE, CARACTÈRE (venue de cheval.js le 17/08) ============ */


  { ref:"hongre", lecon:4, coll:"identite",
    mots:{ fr:{m:"le hongre"}, en:{m:"the gelding", p:"guel-ding"},
           es:{m:"el caballo castrado"}, it:{m:"il castrone"},
           de:{m:"der Wallach", p:"va-larh"}, ja:{m:"せん馬", p:"senba"},
           ar:{m:"الحصان المخصي"} },
    def:{ fr:"Le mâle castré, monture la plus courante en club pour son égalité de caractère. Le mot français vient de la Hongrie, où la pratique était courante.",
          en:"The castrated male, the commonest riding-school mount for its even temper.",
          es:"El macho castrado, la montura más común en un club por su igualdad de carácter. La palabra francesa viene de Hungría, donde la práctica era corriente.",
          it:"Il maschio castrato, la cavalcatura più comune in un club per l'uniformità di carattere. La parola francese viene dall'Ungheria, dove la pratica era corrente.",
          de:"Der kastrierte Wallach, wegen seines ausgeglichenen Wesens das häufigste Clubpferd. Das französische Wort kommt aus Ungarn, wo die Praxis üblich war.",
          ja:"去勢された牡馬。気性が安定しているため、クラブで最もよく使われます。フランス語の hongre はハンガリーに由来 — 去勢が盛んな土地だったのです。",
          ar:"الذكر المخصي، وهو من أكثر الخيول استخداما في مدارس الفروسية بسبب استقرار طباعه. والكلمة الفرنسية *hongre* مرتبطة تاريخيا بالمجر، حيث كانت ممارسة الخصي شائعة." } },

  { ref:"etalon", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-li-eune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèn-gst"}, ja:{m:"牡馬", p:"ouma", var:"種牡馬 = étalon reproducteur"},
           ar:{m:"الفحل"} },
    def:{ fr:"Le mâle entier. Jamais confié à un débutant, et souvent séparé du reste de l'écurie. Le japonais distingue le mâle (牡馬) de l'étalon d'élevage (種牡馬).",
          en:"The entire male, never given to a beginner and often stabled apart. Japanese separates « male horse » from « breeding stallion ».",
          es:"El macho entero. Jamás confiado a un principiante, y a menudo separado del resto de la cuadra. El japonés distingue el macho (牡馬) del semental de cría (種牡馬).",
          it:"Il maschio intero. Mai affidato a un principiante, e spesso separato dal resto della scuderia. Il giapponese distingue il maschio (牡馬) dallo stallone da razza (種牡馬).",
          de:"Der Hengst. Nie einem Anfänger anvertraut, oft vom Rest des Stalls getrennt. Das Japanische unterscheidet das männliche Tier (牡馬) vom Zuchthengst (種牡馬).",
          ja:"去勢していない牡馬。初心者に任されることは決してなく、厩舎でも他の馬と離されがちです。日本語は牡馬と、繁殖用の種牡馬とを区別します。",
          ar:"الذكر غير المخصي. لا يعهد به عادة إلى مبتدئ، وغالبا ما يفصل عن بقية خيول الإسطبل. واليابانية تميز بين مجرد «حصان ذكر» وبين «فحل مخصص للتناسل»." } },

  { ref:"jument", lecon:4, coll:"identite",
    mots:{ fr:{m:"la jument"}, en:{m:"the mare", p:"mèr"},
           es:{m:"la yegua"}, it:{m:"la cavalla", var:"la giumenta"},
           de:{m:"die Stute", p:"chtou-te"}, ja:{m:"牝馬", p:"hinba"},
           ar:{m:"الفرس"} },
    def:{ fr:"La femelle. Aucune langue ne se contente de dire « cheval femelle » : chacune a son mot, et c'est l'un des premiers à connaître à l'étranger.",
          en:"The female. No language settles for « female horse »: each has its own word, and it is one of the first to learn abroad.",
          es:"La hembra. Ninguna lengua se contenta con decir « caballo hembra »: cada una tiene su palabra, y es una de las primeras que hay que saber en el extranjero.",
          it:"La femmina. Nessuna lingua si accontenta di dire « cavallo femmina »: ognuna ha la sua parola, ed è una delle prime da sapere all'estero.",
          de:"Das weibliche Pferd. Keine Sprache begnügt sich mit « weibliches Pferd »: Jede hat ihr eigenes Wort — eines der ersten, die man im Ausland braucht.",
          ja:"メスの馬。どの言語も「メスの馬」とは言わず、固有の言葉を持っています。海外で最初に覚えるべき言葉のひとつです。",
          ar:"أنثى الحصان. لا تكتفي أي من هذه اللغات بقول «حصان أنثى»، بل لكل منها كلمة خاصة — ولذلك فهي من أول الكلمات التي يجب معرفتها عند التعامل مع الخيل في الخارج." } },

  { ref:"poulain", lecon:4, coll:"identite",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle", var:"colt = mâle · filly = femelle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"},
           ar:{m:"المهر الصغير"} },
    def:{ fr:"⚠️ L'anglais a trois mots là où le français en a un : **foal** (le poulain de l'année, des deux sexes), **colt** (jeune mâle), **filly** (jeune femelle). Sur les hippodromes britanniques, on n'entend que colt et filly.",
          en:"English has three words where French has one: foal for the youngster of either sex, colt for a young male, filly for a young female.",
          es:"⚠️ El inglés tiene tres palabras donde el francés una: **foal** (el potro del año, de ambos sexos), **colt** (macho joven), **filly** (hembra joven). En los hipódromos británicos solo se oye colt y filly.",
          it:"⚠️ L'inglese ha tre parole dove il francese ne ha una: **foal** (il puledro dell'anno, dei due sessi), **colt** (giovane maschio), **filly** (giovane femmina). Sugli ippodromi britannici si sentono solo colt e filly.",
          de:"⚠️ Das Englische hat drei Wörter, wo das Französische eines hat: **foal** (das Fohlen des Jahrgangs, beide Geschlechter), **colt** (junger Hengst), **filly** (junge Stute). Auf britischen Rennbahnen hört man nur colt und filly.",
          ja:"⚠️ フランス語がひとつで済ませるところを、英語は三語で言い分けます。**foal**（当歳仔、雌雄問わず）、**colt**（若い牡）、**filly**（若い牝）。イギリスの競馬場で聞こえるのは colt と filly ばかりです。",
          ar:"⚠️ لدى الإنجليزية ثلاث كلمات حيث تستعمل الفرنسية كلمة واحدة: **foal** للمهر الصغير من الجنسين، و**colt** للذكر الشاب، و**filly** للأنثى الشابة. وفي ميادين سباقات الخيل البريطانية تسمعين *colt* و*filly* باستمرار." } },

  { ref:"age", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'âge"}, en:{m:"the age", p:"éïdj"},
           es:{m:"la edad"}, it:{m:"l'età"},
           de:{m:"das Alter", p:"al-teur"}, ja:{m:"馬齢", p:"barei", var:"年齢"},
           ar:{m:"العمر"} },
    def:{ fr:"Curiosité mondiale : dans les papiers, tous les chevaux prennent un an le 1er janvier, quelle que soit leur date de naissance réelle. Un poulain né en mai a « un an » en janvier suivant.",
          en:"A worldwide oddity: on paper every horse gains a year on 1 January, whatever its real birthday.",
          es:"Curiosidad mundial: en los papeles, todos los caballos cumplen un año el 1 de enero, sea cual sea su fecha real de nacimiento. Un potro nacido en mayo tiene « un año » el enero siguiente.",
          it:"Curiosità mondiale: sui documenti, tutti i cavalli compiono un anno il 1° gennaio, qualunque sia la data reale di nascita. Un puledro nato a maggio ha « un anno » il gennaio successivo.",
          de:"Weltweite Kuriosität: Auf dem Papier werden alle Pferde am 1. Januar ein Jahr älter, egal wann sie geboren sind. Ein Maifohlen ist im folgenden Januar « einjährig ».",
          ja:"世界共通の不思議：書類の上では、実際の誕生日にかかわらず、すべての馬が1月1日に歳をとります。5月生まれの仔馬は、翌年の1月に「一歳」です。",
          ar:"من غرائب عالم الخيل أن جميع الخيول، في الأوراق الرسمية، تزيد سنة في العمر في الأول من يناير، مهما كان تاريخ ميلادها الفعلي. فالمهر المولود في مايو يعد «في عامه الأول» في يناير التالي." } },

  { ref:"caractere", lecon:4, coll:"identite",
    mots:{ fr:{m:"le caractère"}, en:{m:"the temperament", p:"tèm-pra-meune"},
           es:{m:"el carácter"}, it:{m:"il carattere"},
           de:{m:"das Temperament", p:"tèm-pé-ra-mènt"}, ja:{m:"気性", p:"kishō"},
           ar:{m:"الطبع"} },
    def:{ fr:"Ce qu'on demande avant de monter un cheval inconnu. La question qui marche partout : « comment est-il ? » plutôt que « est-il gentil ? ».",
          en:"What you ask before riding an unknown horse. The question that works everywhere is « what's he like ? », not « is he nice ? ».",
          es:"Lo que se pregunta antes de montar un caballo desconocido. La pregunta que funciona en todas partes: « ¿cómo es? » mejor que « ¿es bueno? ».",
          it:"Ciò che si chiede prima di montare un cavallo sconosciuto. La domanda che funziona ovunque: « com'è? » piuttosto che « è buono? ».",
          de:"Wonach man fragt, bevor man ein fremdes Pferd reitet. Die Frage, die überall funktioniert: « Wie ist er? » statt « Ist er brav? ».",
          ja:"知らない馬に乗る前に尋ねること。どこでも通じる聞き方は「この馬、どんな子ですか？」— 「おとなしいですか？」よりも。",
          ar:"هذا من أول ما يجب السؤال عنه قبل ركوب حصان لا تعرفينه. والسؤال المفيد في كل مكان هو: «كيف طبعه؟» بدلا من الاكتفاء بالسؤال: «هل هو لطيف؟»." } },

  { ref:"calme", lecon:4, coll:"identite",
    mots:{ fr:{m:"calme"}, en:{m:"quiet", p:"kouaï-eutte", var:"steady · a schoolmaster"},
           es:{m:"tranquilo"}, it:{m:"tranquillo"},
           de:{m:"brav", p:"braf"}, ja:{m:"おとなしい", p:"otonashii"},
           ar:{m:"هادئ"} },
    def:{ fr:"Le mot qu'on espère entendre pour un cheval de location. ⚠️ En Grande-Bretagne, « he's a real schoolmaster » est le plus grand compliment possible pour un cheval d'école : il enseigne au cavalier.",
          en:"The word you hope to hear about a hire horse. In Britain, « a real schoolmaster » is the highest praise for a school horse: it teaches the rider.",
          es:"La palabra que uno espera oír para un caballo alquilado. ⚠️ En Gran Bretaña, « he's a real schoolmaster » es el mayor cumplido posible para un caballo de escuela: enseña al jinete.",
          it:"La parola che si spera di sentire per un cavallo a noleggio. ⚠️ In Gran Bretagna « he's a real schoolmaster » è il più grande complimento possibile per un cavallo da scuola: insegna al cavaliere.",
          de:"Das Wort, das man beim Leihpferd hören will. ⚠️ In Großbritannien ist « he's a real schoolmaster » das größte Lob für ein Schulpferd: Es unterrichtet den Reiter.",
          ja:"借りる馬について、いちばん聞きたい言葉。⚠️ イギリスで « he's a real schoolmaster » は学校馬への最高の賛辞です。騎手に教えてくれる馬、という意味です。",
          ar:"الكلمة التي تتمنين سماعها عندما يعطونك حصانا لركوبه في مكان لا تعرفينه. ⚠️ وفي بريطانيا، عبارة **he's a real schoolmaster** من أكبر عبارات المديح لحصان مدرسة: أي أنه حصان خبير يساعد الفارس على التعلم." } },

  { ref:"chaud", lecon:4, coll:"identite",
    mots:{ fr:{m:"chaud"}, en:{m:"hot", p:"hott", var:"sharp · fizzy"},
           es:{m:"nervioso", var:"caliente"}, it:{m:"caldo", var:"nervoso"},
           de:{m:"heiß", p:"haïss", var:"nervös"}, ja:{m:"気性難", p:"kishōnan", var:"神経質 = nerveux"},
           ar:{m:"حساس وسريع الاستجابة"} },
    def:{ fr:"Un cheval chaud n'est pas méchant : il réagit vite et fort. L'anglais a les images les plus parlantes — **sharp** (vif comme une lame), **fizzy** (pétillant).",
          en:"A hot horse is not a mean one: it reacts fast and strongly. English has the liveliest images: sharp, fizzy.",
          es:"Un caballo caliente no es malo: reacciona rápido y fuerte. El inglés tiene las imágenes más elocuentes — **sharp** (vivo como una hoja), **fizzy** (burbujeante).",
          it:"Un cavallo caldo non è cattivo: reagisce veloce e forte. L'inglese ha le immagini più parlanti — **sharp** (vivo come una lama), **fizzy** (frizzante).",
          de:"Ein heißes Pferd ist nicht böse: Es reagiert schnell und heftig. Das Englische hat die sprechendsten Bilder — **sharp** (scharf wie eine Klinge), **fizzy** (sprudelnd).",
          ja:"「熱い」馬は悪い馬ではありません。反応が速く、強いだけです。英語のたとえがいちばん雄弁です — **sharp**（刃のように鋭い）、**fizzy**（炭酸のようにはじける）。",
          ar:"الحصان الذي يوصف بأنه **chaud / hot** ليس حصانا شريرا: بل يستجيب بسرعة وبقوة لما يحدث حوله. وللإنجليزية تعبيران معبران جدا: **sharp**، أي شديد اليقظة وسريع الاستجابة، و**fizzy**، أي مفعم بالطاقة وسريع الإثارة." } },

  { ref:"cheval-ecole", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval d'école"}, en:{m:"the school horse", p:"skoul horss", var:"riding school horse"},
           es:{m:"el caballo de escuela", var:"el caballo de picadero"}, it:{m:"il cavallo da scuola"},
           de:{m:"das Schulpferd", p:"choul-pfèrt"}, ja:{m:"練習馬", p:"renshūba"},
           ar:{m:"حصان المدرسة"} }, // ??
    def:{ fr:"Celui qu'on te confiera à l'étranger. Le demander par son nom exact, dans la langue du pays, change complètement l'accueil.",
          en:"The horse you will be given abroad. Asking for it by its proper local name changes the welcome entirely.",
          es:"El que te confiarán en el extranjero. Pedirlo por su nombre exacto, en la lengua del país, cambia por completo la acogida.",
          it:"Quello che ti affideranno all'estero. Chiederlo con il suo nome esatto, nella lingua del paese, cambia completamente l'accoglienza.",
          de:"Das Pferd, das man dir im Ausland anvertraut. Es mit dem richtigen Wort in der Landessprache zu erbitten, verändert den Empfang völlig.",
          ja:"海外で任されるのは、この馬です。その国の言葉で、正確な名前で頼めるかどうかで、迎えられ方がまるで変わります。",
          ar:"هو النوع الذي سيعهد إليك غالبا عند الركوب في مركز فروسية في الخارج. ومعرفة الاسم الصحيح لهذا النوع من الخيل بلغة البلد تساعد كثيرا في التواصل داخل الإسطبل." } },

  { ref:"race", lecon:4, coll:"identite",
    mots:{ fr:{m:"la race"}, en:{m:"the breed", p:"bride"},
           es:{m:"la raza"}, it:{m:"la razza"},
           de:{m:"die Rasse", p:"ra-se"}, ja:{m:"品種", p:"hinshu", var:"馬種"},
           ar:{m:"السلالة"} }, // ??
    def:{ fr:"⚠️ Faux ami redoutable : en anglais c'est **the breed**, jamais « the race » — race veut dire la course. « What race is he ? » fera comprendre « dans quelle course court-il ? ».",
          en:"A nasty false friend: it is the breed, never the race. « What race is he ? » will be heard as « which race does he run in ? ».",
          es:"⚠️ Falso amigo temible: en inglés es **the breed**, jamás « the race » — race significa la carrera. « What race is he ? » se entenderá como « ¿en qué carrera corre? ».",
          it:"⚠️ Falso amico temibile: in inglese è **the breed**, mai « the race » — race significa la corsa. « What race is he ? » sarà capito come « in che corsa corre? ».",
          de:"⚠️ Gefährlicher falscher Freund: Auf Englisch heißt es **the breed**, nie « the race » — race ist das Rennen. « What race is he ? » versteht man als « In welchem Rennen läuft er? ».",
          ja:"⚠️ 恐るべき偽りの友：英語では **the breed** であって、決して « the race » ではありません — race は競走の意味。« What race is he ? » は「どのレースに出るの？」と受け取られます。",
          ar:"⚠️ من أشهر الكلمات الخادعة بين الفرنسية والإنجليزية: في الإنجليزية نقول **the breed**، ولا نقول *the race* — لأن *race* تعني السباق. فإذا قلت *What race is he?* فقد يفهم السؤال على أنه «في أي سباق يشارك؟»." } },

  { ref:"demi-sang", lecon:4, coll:"identite",
    mots:{ fr:{m:"le sang chaud", var:"le demi-sang"}, en:{m:"the warmblood", p:"ouorm-bleude"},
           es:{m:"el caballo de sangre caliente"}, it:{m:"il cavallo a sangue caldo"},
           de:{m:"das Warmblut", p:"varm-bloute"}, ja:{m:"温血種", p:"onketsushu"},
           ar:{m:"حصان الدم الدافئ"} },
    def:{ fr:"Les chevaux de sport européens, entre le pur-sang et le trait. L'allemand possède la série complète et parfaitement logique : Vollblut (pur-sang), Warmblut (sang chaud), Kaltblut (trait).",
          en:"The European sport horses, between the thoroughbred and the draught horse. German has the whole tidy series: Vollblut, Warmblut, Kaltblut.",
          es:"Los caballos de deporte europeos, entre el purasangre y el de tiro. El alemán posee la serie completa y perfectamente lógica: Vollblut (purasangre), Warmblut (sangre caliente), Kaltblut (tiro).",
          it:"I cavalli sportivi europei, tra il purosangue e il cavallo da tiro. Il tedesco possiede la serie completa e perfettamente logica: Vollblut (purosangue), Warmblut (sangue caldo), Kaltblut (tiro).",
          de:"Die europäischen Sportpferde, zwischen Vollblut und Kaltblut. Das Deutsche hat die vollständige, völlig logische Reihe: Vollblut, Warmblut, Kaltblut.",
          ja:"ヨーロッパのスポーツホース。サラブレッドと輓馬のあいだに位置します。ドイツ語には完璧に論理的な三点セットがあります：Vollblut（純血）、Warmblut（温血）、Kaltblut（冷血）。",
          ar:"خيول الرياضة الأوروبية الواقعة في التصنيف التقليدي بين الخيول الأصيلة وخيول الجر. وللألمانية سلسلة مصطلحات واضحة جدا: **Vollblut** للخيول الأصيلة، و**Warmblut** لخيول الدم الدافئ، و**Kaltblut** لخيول الجر الثقيلة." } },

  { ref:"trait", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval de trait"}, en:{m:"the draught horse", p:"draft horss", var:"draft horse (US)"},
           es:{m:"el caballo de tiro"}, it:{m:"il cavallo da tiro"},
           de:{m:"das Kaltblut", p:"kalt-bloute"}, ja:{m:"重種", p:"jūshu"},
           ar:{m:"حصان الجر"} }, // ??
    def:{ fr:"Les grands chevaux de force. ⚠️ Le mot anglais s'écrit draught en Grande-Bretagne et draft aux États-Unis, mais se prononce « draft » des deux côtés.",
          en:"The big strong horses. The word is spelt draught in Britain and draft in America, but pronounced « draft » on both sides.",
          es:"Los grandes caballos de fuerza. ⚠️ La palabra inglesa se escribe draught en Gran Bretaña y draft en Estados Unidos, pero se pronuncia « draft » en ambos lados.",
          it:"I grandi cavalli da forza. ⚠️ La parola inglese si scrive draught in Gran Bretagna e draft negli Stati Uniti, ma si pronuncia « draft » da entrambe le parti.",
          de:"Die großen Kraftpferde. ⚠️ Das englische Wort schreibt sich draught in Großbritannien und draft in den USA — gesprochen wird beides « draft ».",
          ja:"力仕事のための大きな馬たち。⚠️ 英語の綴りはイギリスで draught、アメリカで draft — 発音はどちらも「ドラフト」です。",
          ar:"الخيول الكبيرة والقوية التي استخدمت تاريخيا في أعمال الجر. ⚠️ تكتب الكلمة الإنجليزية **draught horse** في بريطانيا و**draft horse** في الولايات المتحدة، لكن النطق واحد تقريبا في الحالتين: «draft»." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [

    { ref:"ph-jeunes-quel-age", lecon:1, mots:["jeune-cheval-sport"],
      fr:"Quel âge a ce jeune cheval ?",
      en:"How old is this young horse?",
      es:"¿Qué edad tiene este caballo joven?",
      it:"Quanti anni ha questo cavallo giovane?",
      de:"Wie alt ist dieses junge Pferd?",
      ja:"この 若馬 は 何 歳 です か ?",
        ar:"كم عمر هذا الحصان الشاب؟" },

    { ref:"ph-jeunes-experience", lecon:1, mots:["experience","jeune-cheval-sport"],
      fr:"À cet âge, le but est surtout de lui donner de l'expérience.",
      en:"At this age, the main goal is to give him experience.",
      es:"A esta edad, el objetivo es sobre todo darle experiencia.",
      it:"A quest'età, lo scopo è soprattutto dargli esperienza.",
      de:"In diesem Alter geht es vor allem darum, ihm Erfahrung zu geben.",
      ja:"この 年齢 で は、 何より 経験 を 積ま せる こと が 目的 です。",
        ar:"في هذا العمر، الهدف الأساسي هو إكسابه الخبرة." },

    { ref:"ph-jeunes-potentiel", lecon:1, mots:["potentiel","experience"],
      fr:"Il manque encore d'expérience, mais il a beaucoup de potentiel.",
      en:"He still lacks experience, but he has a lot of potential.",
      es:"Todavía le falta experiencia, pero tiene mucho potencial.",
      it:"Gli manca ancora esperienza, ma ha molto potenziale.",
      de:"Ihm fehlt noch Erfahrung, aber er hat viel Potenzial.",
      ja:"まだ 経験 は 足り ませ ん が、 素質 は 大いに あり ます。",
        ar:"ما زالت تنقصه الخبرة، لكن لديه إمكانات كبيرة." },

    { ref:"ph-jeunes-finale", lecon:1, mots:["finale-nationale","grande-semaine"],
      fr:"Ce cheval s'est qualifié pour la finale nationale.",
      en:"This horse has qualified for the national final.",
      es:"Este caballo se ha clasificado para la final nacional.",
      it:"Questo cavallo si è qualificato per la finale nazionale.",
      de:"Dieses Pferd hat sich für das nationale Finale qualifiziert.",
      ja:"この 馬 は 全国 決勝 に 進出 し まし た。",
        ar:"تأهل هذا الحصان إلى النهائي الوطني." }

,

    { ref:"quel-age", lecon:4,
      fr:"Quel âge a-t-il ?",
      en:"How old is he ?",
      es:"¿ Cuántos años tiene ?",
      it:"Quanti anni ha ?",
      de:"Wie alt ist er ?",
      ja:"何歳 です か ?",
        ar:"كم عمره؟" },
    { ref:"comment-est-il", lecon:4,
      fr:"Il est calme ? Je débute.",
      en:"Is he quiet ? I'm a beginner.",
      es:"¿ Es tranquilo ? Soy principiante.",
      it:"È tranquillo ? Sono principiante.",
      de:"Ist er brav ? Ich bin Anfängerin.",
      ja:"おとなしい です か ? 初心者 です。",
        ar:"هل هو هادئ؟ أنا مبتدئة." },
    { ref:"chaud-debutant", lecon:4,
      fr:"Je préfère un cheval d'école.",
      en:"I'd rather have a school horse.",
      es:"Prefiero un caballo de escuela.",
      it:"Preferisco un cavallo da scuola.",
      de:"Ich möchte lieber ein Schulpferd.",
      ja:"練習馬 の ほう が いい です。",
        ar:"أفضل حصان مدرسة." },
    { ref:"quelle-race", lecon:4,
      fr:"C'est quelle race ?",
      en:"What breed is he ?",
      es:"¿ De qué raza es ?",
      it:"Di che razza è ?",
      de:"Welche Rasse ist er ?",
      ja:"品種 は 何 です か ?",
        ar:"ما سلالته؟" },
  ],

  dialogue: {
    ville: "fontainebleau", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · quel âge, quel cycle ---- */
      { ref:"dfb-quel-age", temps:1, dit:"joueuse", mots:["jeune-cheval-sport"],
        fr:"Quel âge a ce jeune cheval ?",
        en:"How old is this young horse?",
        es:"¿Qué edad tiene este caballo joven?",
        it:"Quanti anni ha questo cavallo giovane?",
        de:"Wie alt ist dieses junge Pferd?",
        ja:"この 若馬 は 何 歳 です か ?",
        ar:"كم عمر هذا الحصان الشاب؟" },

      { ref:"dfb-quatre-ans-premiere", temps:1, dit:"club", mots:["quatre-ans","jeune-cheval-sport"],
        fr:"Il a quatre ans et commence sa première saison de concours.",
        en:"He's four years old and is starting his first competition season.",
        es:"Tiene cuatro años y empieza su primera temporada de concursos.",
        it:"Ha quattro anni e comincia la sua prima stagione di gare.",
        de:"Er ist vier und beginnt seine erste Turniersaison.",
        ja:"四 歳 で、 初めて の 競技 シーズン を 迎え て い ます。",
        ar:"عمره أربع سنوات، ويبدأ أول موسم له في المسابقات." },

      { ref:"dfb-circuit-cette-annee", temps:1, dit:"club", mots:["circuit-jeunes"],
        fr:"Il est engagé sur le circuit jeunes chevaux cette année.",
        en:"He's competing on the young horse circuit this year.",
        es:"Este año compite en el circuito de caballos jóvenes.",
        it:"Quest'anno gareggia nel circuito cavalli giovani.",
        de:"Dieses Jahr geht er in der Jungpferdeserie.",
        ja:"今年 は 若馬 サーキット に 出場 し て い ます。",
        ar:"يشارك هذا العام في دورة مسابقات الخيول الشابة." },

      { ref:"dfb-cycle-classique", temps:1, dit:"club", mots:["cycle-classique","cycle-libre"],
        fr:"Il court en Cycle Classique.",
        en:"He competes in the French professional young horse series.",
        es:"Compite en el circuito profesional francés.",
        it:"Gareggia nel circuito professionistico francese.",
        de:"Er startet in der französischen Profi-Jungpferdeserie.",
        ja:"フランス の プロ 向け 若馬 サーキット に 出 て い ます。",
        ar:"يشارك في Cycle Classique، وهي دورة الخيول الشابة الفرنسية للمحترفين." },

      /* ---- temps 2 · les épreuves de formation ---- */
      { ref:"dfb-parcours-formation", temps:2, dit:"club", mots:["epreuve-formation"],
        fr:"Ce cheval évolue encore sur des parcours de formation.",
        en:"This horse is still competing in training classes.",
        es:"Este caballo todavía compite en pruebas de formación.",
        it:"Questo cavallo gareggia ancora in prove di formazione.",
        de:"Dieses Pferd geht noch in Ausbildungsprüfungen.",
        ja:"この 馬 は まだ 育成 クラス に 出 て い ます。",
        ar:"ما زال هذا الحصان يشارك في المسابقات التدريبية المخصصة للخيول الشابة." },

      { ref:"dfb-but-experience", temps:2, dit:"club", mots:["experience","jeune-cheval-sport"],
        fr:"À cet âge, le but est surtout de lui donner de l'expérience.",
        en:"At this age, the main goal is to give him experience.",
        es:"A esta edad, el objetivo es sobre todo darle experiencia.",
        it:"A quest'età, lo scopo è soprattutto dargli esperienza.",
        de:"In diesem Alter geht es vor allem darum, ihm Erfahrung zu geben.",
        ja:"この 年齢 で は、 何より 経験 を 積ま せる こと が 目的 です。",
        ar:"في هذا العمر، الهدف الأساسي هو إكسابه الخبرة." },

      /* 🟥 LA PHRASE CENTRALE DU CHAPITRE. */
      { ref:"dfb-laisse-apprendre", temps:2, dit:"club", mots:["epreuve-formation","experience"],
        fr:"Ne cherche pas à gagner du temps, laisse-le apprendre.",
        en:"Don't try to save time; let him learn.",
        es:"No busques ganar tiempo: déjale aprender.",
        it:"Non cercare di guadagnare tempo: lascialo imparare.",
        de:"Versuch nicht, Zeit zu sparen — lass ihn lernen.",
        ja:"時間 を 稼ご う と せ ず、 学ば せ て ください。",
        ar:"لا تحاولي اختصار الوقت، دعيه يتعلم." },

      { ref:"dfb-regulier-confiance", temps:2, dit:"club", mots:["epreuve-formation"],
        fr:"Il doit rester régulier et en confiance sur tout le parcours.",
        en:"He needs to stay consistent and confident throughout the course.",
        es:"Debe mantenerse regular y confiado durante todo el recorrido.",
        it:"Deve restare regolare e fiducioso per tutto il percorso.",
        de:"Er muss auf dem ganzen Parcours gleichmäßig und vertrauensvoll bleiben.",
        ja:"コース の 最後 まで、 安定 し て 自信 を 保つ こと が 大切 です。",
        ar:"يجب أن يحافظ على إيقاع منتظم وثقته بنفسه طوال المسار." },

      /* ---- temps 3 · se qualifier ---- */
      { ref:"dfb-qualifie-finale", temps:3, dit:"club", mots:["finale-nationale"],
        fr:"Ce cheval s'est qualifié pour la finale nationale.",
        en:"This horse has qualified for the national final.",
        es:"Este caballo se ha clasificado para la final nacional.",
        it:"Questo cavallo si è qualificato per la finale nazionale.",
        de:"Dieses Pferd hat sich für das nationale Finale qualifiziert.",
        ja:"この 馬 は 全国 決勝 に 進出 し まし た。",
        ar:"تأهل هذا الحصان إلى النهائي الوطني." },

      { ref:"dfb-combien-parcours", temps:3, dit:"joueuse", mots:["finale-nationale","circuit-jeunes"],
        fr:"Combien de parcours doit-il encore faire pour se qualifier ?",
        en:"How many more rounds does he need to qualify?",
        es:"¿Cuántos recorridos le faltan para clasificarse?",
        it:"Quanti percorsi deve ancora fare per qualificarsi?",
        de:"Wie viele Umläufe braucht er noch zur Qualifikation?",
        ja:"あと 何 回 走行 すれ ば 出場 権 が 取れ ます か ?",
        ar:"كم مسارا آخر يجب أن يخوضه حتى يتأهل؟" },

      /* ---- temps 4 · la Grande Semaine ---- */
      { ref:"dfb-aboutissement", temps:4, dit:"club", mots:["grande-semaine","circuit-jeunes"],
        fr:"La Grande Semaine est l'aboutissement de toute la saison.",
        en:"The Grande Semaine is the culmination of the whole season.",
        es:"La Grande Semaine es la culminación de toda la temporada.",
        it:"La Grande Semaine è il culmine di tutta la stagione.",
        de:"Die Grande Semaine ist der Höhepunkt der ganzen Saison.",
        ja:"グランド・スメーヌ は、 シーズン 全体 の 総決算 です。",
        ar:"Grande Semaine هي المحطة الختامية لموسم كامل." },

      { ref:"dfb-meilleurs-generation", temps:4, dit:"club", mots:["generation","grande-semaine"],
        fr:"Les meilleurs chevaux de chaque génération se retrouvent à Fontainebleau.",
        en:"The best horses from each age group meet in Fontainebleau.",
        es:"Los mejores caballos de cada generación se reúnen en Fontainebleau.",
        it:"I migliori cavalli di ogni generazione si ritrovano a Fontainebleau.",
        de:"Die besten Pferde jedes Jahrgangs treffen sich in Fontainebleau.",
        ja:"各 世代 の 最も 優れ た 馬 が、 フォンテーヌブロー に 集まり ます。",
        ar:"تجتمع أفضل الخيول من كل فئة عمرية في Fontainebleau." },

      { ref:"dfb-pas-memes-parcours", temps:4, dit:"club", mots:["quatre-ans","cinq-six-ans","generation"],
        fr:"Les quatre ans ne courent pas les mêmes parcours que les six ans.",
        en:"Four-year-olds don't jump the same courses as six-year-olds.",
        es:"Los de cuatro años no saltan los mismos recorridos que los de seis.",
        it:"I quattro anni non saltano gli stessi percorsi dei sei anni.",
        de:"Vierjährige springen nicht dieselben Parcours wie Sechsjährige.",
        ja:"四 歳 馬 と 六 歳 馬 は、 同じ コース を 走り ませ ん。",
        ar:"خيول الأربع سنوات لا تقفز المسارات نفسها التي تقفزها خيول الست سنوات." },

      /* ---- temps 5 · ce qu'on regarde ---- */
      { ref:"dfb-manque-experience", temps:5, dit:"club", mots:["experience","potentiel"],
        fr:"Ce cheval manque encore d'expérience, mais il a beaucoup de potentiel.",
        en:"This horse still lacks experience, but he has a lot of potential.",
        es:"A este caballo aún le falta experiencia, pero tiene mucho potencial.",
        it:"A questo cavallo manca ancora esperienza, ma ha molto potenziale.",
        de:"Diesem Pferd fehlt noch Erfahrung, aber es hat viel Potenzial.",
        ja:"この 馬 は まだ 経験 が 足り ませ ん が、 素質 は 大いに あり ます。",
        ar:"ما زالت تنقص هذا الحصان الخبرة، لكن لديه إمكانات كبيرة." },

      { ref:"dfb-technique-equilibre", temps:5, dit:"club", mots:["potentiel","valorisation"],
        fr:"Il faut regarder sa technique, son équilibre et sa progression.",
        en:"You need to look at his technique, balance and development.",
        es:"Hay que mirar su técnica, su equilibrio y su progresión.",
        it:"Bisogna guardare la sua tecnica, il suo equilibrio e la sua progressione.",
        de:"Man muss auf Technik, Gleichgewicht und Entwicklung schauen.",
        ja:"技術、 バランス、 そして 進歩 を 見る 必要 が あり ます。",
        ar:"يجب تقييم تقنيته وتوازنه ومدى تطوره." },

      /* ---- temps 6 · la valorisation ---- */
      { ref:"dfb-augmente-valeur", temps:6, dit:"club", mots:["valorisation","finale-nationale"],
        fr:"Un bon résultat ici peut augmenter sa valeur.",
        en:"A good result here can increase his value.",
        es:"Un buen resultado aquí puede aumentar su valor.",
        it:"Un buon risultato qui può aumentare il suo valore.",
        de:"Ein gutes Ergebnis hier kann seinen Wert steigern.",
        ja:"ここ で の 好 成績 は、 その 馬 の 価値 を 高め ます。",
        ar:"يمكن لنتيجة جيدة هنا أن ترفع قيمة الحصان." },

      { ref:"dfb-acheteurs-venus", temps:6, dit:"club", mots:["valorisation","grande-semaine"],
        fr:"Plusieurs acheteurs sont venus voir les jeunes chevaux pendant la finale.",
        en:"Several buyers have come to watch the young horses during the final.",
        es:"Varios compradores han venido a ver a los caballos jóvenes durante la final.",
        it:"Diversi compratori sono venuti a vedere i cavalli giovani durante la finale.",
        de:"Mehrere Käufer sind gekommen, um die jungen Pferde im Finale zu sehen.",
        ja:"決勝 の 間、 何人 も の 買い手 が 若馬 を 見 に 来 て い ます。",
        ar:"جاء عدد من المشترين لمشاهدة الخيول الشابة خلال النهائي." },

      /* 🟥 LA DERNIÈRE PHRASE, et le sens du chapitre entier. */
      { ref:"dfb-futur-haut-niveau", temps:6, dit:"club", mots:["valorisation","potentiel","jeune-cheval-sport"],
        fr:"L'objectif est de former un futur cheval de haut niveau, pas seulement de gagner aujourd'hui.",
        en:"The goal is to develop a future top-level horse, not just to win today.",
        es:"El objetivo es formar un futuro caballo de alto nivel, no solo ganar hoy.",
        it:"L'obiettivo è formare un futuro cavallo di alto livello, non solo vincere oggi.",
        de:"Das Ziel ist, ein künftiges Spitzenpferd auszubilden, nicht nur heute zu gewinnen.",
        ja:"目的 は、 今日 勝つ こと で は なく、 将来 の トップ 馬 を 育てる こと です。",
        ar:"الهدف هو إعداد حصان قادر مستقبلا على المنافسة في أعلى المستويات، وليس مجرد الفوز اليوم." }
    ]
  }
};
