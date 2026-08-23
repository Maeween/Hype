/* hype-lingo-lex-froid.js — Hype Linguae · Spruce Meadows · « Le froid »
   ==================================================================
   16 CONCEPTS, UNE LEÇON.  RÉÉCRIT LE 10/08/2026.

   POURQUOI CETTE RÉÉCRITURE. Blandine, 10/08 : « les mots sont trop
   simples et pas vraiment en rapport avec l'équitation, on peut parler de
   gants, couvre-reins, couverture chauffante etc. », « hiver neige glace…
   on va dire dans l'idée quoi », « dégel hiverner buée recouvrir oui ok
   on peut garder ». Les mots de météo sortent, les mots du MÉTIER par
   temps froid entrent. Et : « si oui n'hésite pas à rajouter un peu de
   texte pour décrire et expliquer, c'est tout ça le charme du voyage ».
   Les définitions sont donc plus longues qu'ailleurs, volontairement.

   GARDÉS (4 nommés par Blandine + 2 qui portent le voyage)
     degel · hiverner · buee · couvrir · chinook · poilhiver
   SORTIS  hiver · neige · gel · glace — trop génériques, aucun rapport
     avec l'équitation. Le sol gelé ne disparaît pas : il devient `solgele`,
     un vrai mot de métier (« dégel ou sol gelé c'est pas mal »).

   ⚠️ AUDIT DES DOUBLONS FAIT SUR LES 23 LEXIQUES, 510 refs (10/08). Ces
   mots-là sont DÉJÀ PRIS et ne sont donc PAS repris ici, malgré la demande :
     · `couverture` → lex-ecurie (générique, froid/pluie/mouches)
     · `abreuvoir`  → lex-ecurie (dit déjà la conduite gelée)
     · `manege`     → lex-ecurie · `seau`, `eau`, `pre`, `paddock`, `box` → lex-ecurie
     · `bonnet`     → lex-materiel (le bonnet anti-mouches)
     · `gants`      → lex-materiel (les gants d'équitation)
     · `tondre`, `mue`, `sueur`, `secher`, `sabot` → lex-pansage
   Ici : `chemise` (la séchante, notion distincte de la couverture),
   `couvrerein`, `abrchauffant` (l'abreuvoir CHAUFFANT, objet distinct),
   `tonte` (le TRACÉ de tonte, distinct du verbe tondre), `bonnetlaine`
   (celui de la cavalière, distinct du bonnet du cheval).
   ⚠️ Redire ici un mot déjà pris ailleurs déteindrait sur sa maîtrise :
   c'est le piège des faux rappels documenté dans le SUIVI.

   ⚠️ FORMAT DES PHRASES : À PLAT (`{lecon:1, fr:"…"}`), comme les 19
   lexiques d'origine. La version précédente les emboîtait dans `p:{…}` —
   c'est ce qui a BLOQUÉ Blandine deux fois sur le dernier exercice de la
   leçon, écran noir, progression perdue. Le moteur accepte désormais les
   deux (v68), mais ce fichier-ci est au bon format.

   ⚠️ CE CHAPITRE NE CITE AUCUNE PERSONNE ET AUCUN ORGANISME PRIVÉ
   (décision de Blandine du 8 août 2026, valable pour tout le module).

   CHAMPS  m · p (EN/DE/JA) · var · coll · def · v (verbe)

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. Le matériel d'hiver est du vocabulaire
   d'usage : `quarter sheet`, `cooler`, `hunter clip`, `snow pad` sont
   sûrs en anglais nord-américain ; les colonnes DE et JA de ces
   objets-là sont les plus fragiles du fichier.
      🟡 CHAMP `ar` — ARABE DORMANT (22/08/2026).
   Chaque concept, chaque réplique et chaque phrase porte un champ `ar`.
   AUCUN ÉCRAN NE LE LIT : le sélecteur reste à six langues. C'est un
   dépôt, pas une septième langue. Même dispositif qu'à Clonbinane.

   🟥 JAMAIS RELU PAR UN ARABOPHONE. Arabe standard moderne, sans signes
   vocaliques (homogénéité du projet — ne pas en réintroduire au coup
   par coup). Les neuf termes du matériel d'hiver — manège chauffé, poil
   d'hiver, tonte, chemise séchante, couvre-reins, crampon, plaque
   anti-neige, abreuvoir chauffant, hivernage — ont été VALIDÉS en
   relecture : voir plus bas.

   ✅ PREMIÈRE RELECTURE CROISÉE, 22/08. Trois fautes de sens corrigées :
   · A10 — الميزان est une BALANCE, pas un thermomètre : مقياس الحرارة ;
   · A18 — تبن est la PAILLE ; le foin des chevaux est دريس ;
   · B4 — أمطرت ثلجا (« il a plu de la neige ») → تساقط الثلج.
   Plus : الوبر (poil animal générique) remplacé partout par الشعر ;
   المضمار évoquait un hippodrome → ميدان الركوب الداخلي ; المرج → المرعى ;
   المربط pouvait désigner l'écurie entière → حجرة ; et une quinzaine de
   tournures trop calquées sur le français ont été reprises.
   🟥 Le champ `langues` du dialogue ne déclarait PAS "ar" alors que les
   traductions y étaient : corrigé.

   ✅ SECONDE RELECTURE, 22/08. Les corrections portaient surtout sur
   des calques trop littéraux du français (le dégel, l'hivernage, le
   crampon, la plaque). Deux vraies fautes :
   · A6 — غير محمى veut dire « non protégé », pas « pas échauffé » :
     toute la définition a été réécrite pour opposer clairement la
     préparation des muscles à la simple conservation de la chaleur ;
   · A9 et C4 — لا ننمط جز الشعر était incorrect : لا نجز شعر الحصان.
   Plus : متجمدا (complètement gelé, donc imbuvable) → شديد البرودة ;
   le chinook est nommé d'emblée ; المشرب → حوض الشرب, cohérent avec A17.

   ✅ LES NEUF TERMES D'ÉQUIPEMENT SONT VALIDÉS. Verdict de la relecture :
   pour ce matériel d'hiver, rare dans la plupart des pays arabophones,
   les FORMULATIONS DESCRIPTIVES valent mieux qu'un mot unique régional
   ou artificiellement technique. Ne pas chercher à les raccourcir.
   Les marques « ar? terme peu sûr » ont donc été retirées du fichier.

   🟡 Reste la validation par une personne arabophone du milieu équestre.

   ⚠️ LE PIÈGE DU CHAPITRE EST RENDU EN ARABE. « To warm up n'est pas to
   keep warm » : la définition arabe de `echauffement` s'ouvre sur
   الإحماء ليس التدفئة — l'échauffement n'est pas la mise au chaud.
   Ne pas simplifier cette phrase, c'est le cœur du chapitre.

   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.froid = {
  ref: "froid",
  chapitre: 16,
  titre: { fr:"Le froid", en:"The cold", es:"El frío",
           it:"Il freddo", de:"Die Kälte", ja:"寒さ" },
  lecons: 1,

  concepts: [

  /* ---------- ce que le cheval fait tout seul ---------- */

  /* ================================================================
     SIX ENTRÉES AJOUTÉES le 17/08/2026, en fusion avec le lexique fourni
     par Blandine. Le chapitre avait déjà tout le CANADIEN — le chinook,
     l'abreuvoir chauffant, la plaque anti-neige, la chemise séchante —
     mais il lui manquait le DÉCOR et surtout L'ÉCHAUFFEMENT.

     🟥 LE PIÈGE DU CHAPITRE, et c'est le sien : **TO WARM UP ≠ TO KEEP
     WARM.** *To warm up a horse* est l'échauffement musculaire ; *to keep
     him warm* est la couverture. Un cheval peut avoir très chaud sous sa
     couverture et n'être pas échauffé du tout — et c'est précisément le
     danger par temps froid. Voir `echauffement`.

     🟥 SECOND PIÈGE, géographique : **BLANKET (Canada) contre RUG
     (Royaume-Uni).** Le fichier disait déjà `to rug up`, qui est
     britannique ; à Spruce Meadows on dit *blanket*. Même chose pour le
     box : *a stall* en Amérique du Nord, *a stable* en Grande-Bretagne.
     ⚠️ Les deux sont justes. NE PAS en corriger un vers l'autre.
     ================================================================ */

  { ref:"temperature", lecon:1, coll:"froid",
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
          ar:"تستخدم كندا مقياس سيلسيوس مثل أوروبا، وليس مقياس فهرنهايت. في كالغاري، عشرون تحت الصفر في يناير أمر معتاد، ولهذا تقام مسابقات الشتاء في الداخل." } },

  { ref:"moins-dix", lecon:1, coll:"froid",
    mots:{ fr:{m:"moins dix degrés"}, en:{m:"minus ten degrees", p:"maï-neuss tenn"},
           es:{m:"diez grados bajo cero"}, it:{m:"meno dieci gradi"},
           de:{m:"minus zehn Grad", p:"mi-nouss tsène grate"}, ja:{m:"氷点下十度", p:"hyōtenka jūdo"},
           ar:{m:"عشر درجات تحت الصفر"} },
    def:{ fr:"⚠️ LES LANGUES NE DISENT PAS LE NÉGATIF PAREIL. L'anglais et l'allemand disent **minus ten** ; l'espagnol dit *diez grados bajo cero*, « dix degrés sous zéro » ; le japonais dit 氷点下, « sous le point de gel ». Aucune ne calque le français.",
          en:"Languages don't say negative temperatures the same way. English and German say « minus ten »; Spanish says « ten degrees below zero »; Japanese says « below freezing point ».",
          es:"Las lenguas no dicen igual las temperaturas negativas. El español dice « diez grados bajo cero », el inglés « minus ten ».",
          it:"Le lingue non dicono allo stesso modo le temperature negative. L'italiano e l'inglese dicono « meno dieci », lo spagnolo « sotto zero ».",
          de:"Die Sprachen sagen Minusgrade unterschiedlich. Deutsch und Englisch sagen « minus zehn », Spanisch « zehn Grad unter null ».",
          ja:"氷点下の言い方は言語ごとに違います。英語とドイツ語は「マイナス十」、スペイン語は「零下十度」、日本語は「氷点下」と言います。",
          ar:"اللغات لا تعبر عن الحرارة السالبة بالطريقة نفسها: الإنجليزية والألمانية تقولان «ناقص عشرة»، والإسبانية «عشر درجات تحت الصفر»، واليابانية «تحت نقطة التجمد»." } },

  { ref:"neige", lecon:1, coll:"froid",
    mots:{ fr:{m:"la neige"}, en:{m:"the snow", p:"snô"},
           es:{m:"la nieve"}, it:{m:"la neve"},
           de:{m:"der Schnee", p:"chné"}, ja:{m:"雪", p:"yuki"},
           ar:{m:"الثلج"} },
    def:{ fr:"⚠️ LA NEIGE N'EST PAS LE PROBLÈME, LE VERGLAS EN EST UN. Un sol enneigé reste montable ; un sol gelé sous la neige ne l'est pas, et on ne le voit pas. 🟥 C'est pourquoi la question « est-ce que le sol est gelé ? » compte plus que « est-ce qu'il a neigé ? ».",
          en:"Snow isn't the problem, ice is. Ground under snow can still be ridden on; frozen ground under snow cannot, and you can't see it. That's why « is the ground frozen? » matters more than « has it snowed? ».",
          es:"La nieve no es el problema, el hielo sí. Un suelo nevado sigue siendo montable; un suelo helado bajo la nieve, no, y no se ve.",
          it:"La neve non è il problema, il ghiaccio sì. Un terreno innevato si può ancora montare; un terreno gelato sotto la neve no, e non si vede.",
          de:"Nicht der Schnee ist das Problem, sondern das Eis. Auf verschneitem Boden kann man reiten; auf gefrorenem darunter nicht, und man sieht es nicht.",
          ja:"問題は雪ではなく氷です。雪の積もった地面はまだ乗れますが、その下が凍っていれば乗れません。そして外からは見えません。だから「雪が降ったか」より「地面は凍っているか」のほうが重要なのです。",
          ar:"الثلج ليس هو المشكلة، بل الجليد تحته. أرض مغطاة بالثلج يمكن الركوب عليها، أما أرض متجمدة تحت الثلج فلا، ولا تراها العين. لذلك السؤال المهم: هل الأرض متجمدة؟" } },

  { ref:"glissant", lecon:1, coll:"froid",
    mots:{ fr:{m:"glissant"}, en:{m:"slippery", p:"sli-peu-ri"},
           es:{m:"resbaladizo"}, it:{m:"scivoloso"},
           de:{m:"rutschig", p:"rout-chich"}, ja:{m:"滑りやすい", p:"suberiyasui"},
           ar:{m:"زلق"} },
    def:{ fr:"Le mot qu'on crie en désignant un endroit précis, pas une généralité. ⚠️ Un cheval qui glisse une fois se met à trotter court et à se tendre pendant des jours : la peur du sol s'installe vite et se défait lentement. C'est pourquoi on préfère renoncer à une séance plutôt que sortir sur du verglas.",
          en:"The word you call out pointing at one exact spot, not a generality. A horse who slips once will trot short and tense for days: fear of the ground settles fast and leaves slowly.",
          es:"La palabra que se grita señalando un punto exacto. Un caballo que resbala una vez trota corto y tenso durante días.",
          it:"La parola che si grida indicando un punto preciso. Un cavallo che scivola una volta trotta corto e teso per giorni.",
          de:"Das Wort, das man ruft und dabei auf eine genaue Stelle zeigt. Ein Pferd, das einmal rutscht, geht tagelang kurz und angespannt.",
          ja:"一点を指しながら言う言葉で、漠然と使うものではありません。一度滑った馬は何日も歩幅を詰め、緊張したまま動きます。地面への恐怖はすぐに根づき、なかなか消えません。",
          ar:"تقال هذه الكلمة عند الإشارة إلى موضع محدد، لا لوصف المكان عموما. إذا انزلق الحصان مرة واحدة فقد يبقى متوترا لأيام، لأن الخوف من الأرض يتكون بسرعة ويزول ببطء." } },

  { ref:"manege-chauffe", lecon:1, coll:"froid",
    mots:{ fr:{m:"le manège chauffé"}, en:{m:"the heated arena", p:"hii-tid a-rii-na"},
           es:{m:"el picadero climatizado"}, it:{m:"il maneggio riscaldato"},
           de:{m:"die beheizte Reithalle", p:"be-haï-tse raït-ha-le"}, ja:{m:"暖房付き馬場", p:"danbōtsuki baba"},
           ar:{m:"ميدان الركوب الداخلي المدفأ"} },
    def:{ fr:"🟥 C'EST CE QUI REND LES CONCOURS D'HIVER POSSIBLES à Spruce Meadows : la série d'hiver se court en intérieur, avec un manège de détente chauffé. ⚠️ En anglais **an indoor arena** est le manège couvert, **a heated arena** celui qui est chauffé — et la différence compte à moins vingt. On dit aussi simplement *the indoor*.",
          en:"What makes winter shows possible at Spruce Meadows: the winter series runs inside, with a heated warm-up arena. « Indoor arena » is covered, « heated arena » is warmed — and at minus twenty the difference matters. People just say « the indoor ».",
          es:"Lo que hace posibles los concursos de invierno en Spruce Meadows: la serie de invierno se disputa bajo techo, con un picadero de calentamiento climatizado.",
          it:"Ciò che rende possibili i concorsi invernali a Spruce Meadows: la serie invernale si corre al coperto, con un campo prova riscaldato.",
          de:"Was Winterturniere in Spruce Meadows möglich macht: die Winterserie läuft drinnen, mit beheizter Abreitehalle.",
          ja:"スプルース・メドウズで冬の競技会が成り立つ理由。ウィンターシリーズは屋内で行われ、下見馬場には暖房が入っています。英語の indoor arena は「屋根つき」、heated arena は「暖房つき」で、氷点下二十度ではこの差が決定的です。",
          ar:"هو ما يجعل مسابقات الشتاء ممكنة في سبروس ميدوز: تقام في الداخل، مع ميدان إحماء داخلي مدفأ. الميدان الداخلي شيء، والميدان المدفأ شيء آخر، والفرق يظهر عند عشرين تحت الصفر." } },

  { ref:"echauffement", lecon:1, coll:"froid",
    mots:{ fr:{m:"l'échauffement"}, en:{m:"the warm-up", p:"ouorm-eup"},
           es:{m:"el calentamiento"}, it:{m:"il riscaldamento"},
           de:{m:"das Aufwärmen", p:"aouf-vèr-meune"}, ja:{m:"ウォーミングアップ", p:"wōmingu appu"},
           ar:{m:"الإحماء"} },
    def:{ fr:"🟥🟥 LE PIÈGE DU CHAPITRE : **TO WARM UP N'EST PAS TO KEEP WARM.** *To warm up a horse* veut dire l'échauffer, mettre ses muscles en route ; *to keep him warm* veut dire le garder au chaud sous une couverture. Un cheval peut avoir très chaud et n'être pas échauffé du tout — et c'est exactement ce qui blesse par temps froid.\n⚠️ Par grand froid l'échauffement double : on marche longtemps, très longtemps, avant de trotter. Un muscle froid se déchire là où un muscle chaud s'étire.",
          en:"The trap of this chapter: to warm up is not to keep warm. « To warm up a horse » means getting his muscles going; « to keep him warm » means a blanket. A horse can be very warm and not warmed up at all — and that's exactly what injures in cold weather. In real cold the warm-up doubles: walk for a long time before you trot.",
          es:"La trampa del capítulo: calentar al caballo no es mantenerlo caliente. Un caballo puede estar muy abrigado y no estar calentado en absoluto, y eso es lo que lesiona con frío.",
          it:"La trappola del capitolo: riscaldare il cavallo non è tenerlo al caldo. Un cavallo può essere ben coperto e non essere affatto riscaldato, ed è proprio questo che provoca infortuni col freddo.",
          de:"Die Falle dieses Kapitels: aufwärmen ist nicht warmhalten. Ein Pferd kann sehr warm eingepackt und trotzdem gar nicht aufgewärmt sein — und genau das verletzt bei Kälte.",
          ja:"この章の落とし穴。「ウォームアップする」と「暖かく保つ」は別のことです。前者は筋肉を動かし始めること、後者は馬着で保温すること。厚く着せて温かくても、まったく準備運動ができていないことがあり、寒い日の故障はそこから起きます。厳寒では常歩の時間を倍にしてから速歩に入ります。",
          ar:"الإحماء ليس مجرد إبقاء الحصان دافئا. فإحماء الحصان يعني تهيئة عضلاته للعمل، أما إبقاؤه دافئا فيعني حمايته من البرد بغطاء. قد يكون جسم الحصان دافئا جدا من الخارج من دون أن تكون عضلاته مهيأة للعمل، وهذا ما يزيد خطر الإصابة في البرد. لذلك يجب إطالة فترة الإحماء في البرد الشديد، والسير بالحصان مدة طويلة قبل الانتقال إلى الخبب. فالعضلة الباردة قد تتمزق، بينما تتمدد العضلة التي جرى إحماؤها بشكل صحيح." } },

  { ref:"poilhiver", lecon:1, coll:"froid",
    mots:{ fr:{m:"le poil d'hiver"}, en:{m:"the winter coat", p:"ouin-teur côt"},
           es:{m:"el pelo de invierno"}, it:{m:"il pelo invernale"},
           de:{m:"das Winterfell", p:"vin-teur-fèl"}, ja:{m:"冬毛", p:"fuyuge"},
           ar:{m:"الشعر الشتوي"} },
    def:{ fr:"Le manteau que le cheval se fabrique tout seul dès que les jours raccourcissent — il répond à la lumière, pas à la température, et arrive donc AVANT le froid. Les poils se dressent et emprisonnent une couche d'air tiède : c'est l'air qui réchauffe, pas le poil. Un cheval couvert de neige qui ne fond pas est un cheval qui n'a pas froid.",
          en:"The coat the horse grows all by himself as the days shorten — it answers to daylight, not to temperature, so it comes BEFORE the cold. The hairs stand up and trap a layer of warm air: the air does the warming, not the hair. A horse with snow on his back that does not melt is a horse who is not cold.",
          es:"El abrigo que el caballo se fabrica solo en cuanto los días se acortan: responde a la luz, no a la temperatura, y por eso llega ANTES del frío. Los pelos se erizan y atrapan una capa de aire tibio: calienta el aire, no el pelo. Un caballo con nieve que no se derrite es un caballo que no tiene frío.",
          it:"Il cappotto che il cavallo si fabbrica da solo appena le giornate si accorciano: risponde alla luce, non alla temperatura, e arriva quindi PRIMA del freddo. I peli si rizzano e trattengono uno strato d'aria tiepida: scalda l'aria, non il pelo. Un cavallo con la neve che non si scioglie è un cavallo che non ha freddo.",
          de:"Der Mantel, den sich das Pferd selbst wachsen lässt, sobald die Tage kürzer werden: er antwortet auf das Licht, nicht auf die Temperatur, und kommt darum VOR der Kälte. Die Haare stellen sich auf und halten eine warme Luftschicht: die Luft wärmt, nicht das Haar. Ein Pferd, auf dem der Schnee liegen bleibt, friert nicht.",
          ja:"日が短くなると馬が自ら作り上げる毛のコート。気温ではなく光に応えるため、寒さより先に生えてくる。毛が立ち、その間に暖かい空気の層を閉じ込める。暖めているのは毛ではなく空気だ。背の雪が解けない馬は、寒がっていない馬である。",
          ar:"المعطف الذي يصنعه الحصان لنفسه حين تقصر الأيام: يستجيب للضوء لا للحرارة، فيسبق البرد. يقف الشعر ويحبس طبقة من الهواء الدافئ، والهواء هو ما يدفئ لا الشعر. حصان يغطيه ثلج لا يذوب هو حصان لا يشعر بالبرد." } },

  { ref:"buee", lecon:1, coll:"froid",
    mots:{ fr:{m:"la buée"}, en:{m:"the steam", p:"stiim"},
           es:{m:"el vaho"}, it:{m:"il vapore"},
           de:{m:"der Atemdampf", p:"a-teum-dampf"}, ja:{m:"白い息", p:"shiroi iki"},
           ar:{m:"بخار النفس"} },
    def:{ fr:"Le souffle des chevaux rendu visible par le froid. La plus belle chose d'une écurie en hiver, et la plus banale. Elle dit aussi quelque chose d'utile : de la buée au-dessus d'un box au petit matin, c'est un cheval qui respire fort — on va voir.",
          en:"The horses' breath made visible by the cold. The most beautiful thing in a winter yard, and the most ordinary. It also tells you something useful: steam over a stable door at dawn means a horse breathing hard — you go and look.",
          es:"El aliento de los caballos hecho visible por el frío. Lo más bello de una cuadra en invierno, y lo más corriente. También dice algo útil: vaho sobre un box al amanecer es un caballo que respira fuerte — se va a ver.",
          it:"Il fiato dei cavalli reso visibile dal freddo. La cosa più bella di una scuderia d'inverno, e la più comune. Dice anche qualcosa di utile: vapore sopra un box all'alba è un cavallo che respira forte — si va a vedere.",
          de:"Der Atem der Pferde, sichtbar gemacht von der Kälte. Das Schönste an einem Stall im Winter — und das Alltäglichste. Er sagt auch Nützliches: Dampf über einer Boxentür am frühen Morgen heißt, ein Pferd atmet schwer — man geht nachsehen.",
          ja:"寒さが見えるようにした馬の呼吸。冬の厩舎で最も美しく、最もありふれたもの。役に立つことも教えてくれる。早朝、馬房の上に立つ白い息は、呼吸が速い馬のしるし。見に行くべきだ。",
          ar:"نفس الخيول وقد جعله البرد مرئيا. أجمل ما في إسطبل الشتاء وأكثره اعتيادا. وهو يقول شيئا مفيدا أيضا: بخار كثيف فوق إحدى حجرات الخيل في الصباح الباكر يعني حصانا يتنفس بقوة، فنذهب لنرى." } },

  /* ---------- la tonte, et pourquoi on tond dans un pays glacial ---------- */

  { ref:"tonte", lecon:1, coll:"froid",
    mots:{ fr:{m:"le tracé de tonte", var:"la tonte de chasse"},
           en:{m:"the clip", p:"klip", var:"the hunter clip"},
           es:{m:"el trazado del esquileo"}, it:{m:"il tipo di tosatura"},
           de:{m:"das Schurmuster", p:"chour-mous-teur"},
           ja:{m:"刈り方の型", p:"karikata no kata"},
           ar:{m:"نمط جز الشعر"} },
    def:{ fr:"On ne tond pas contre le froid, on tond contre la SUEUR : un cheval en plein poil qui travaille met des heures à sécher, et c'est mouillé qu'il prend froid — pas gelé. Le tracé dit ce qu'on enlève et ce qu'on laisse : on dégarnit l'encolure, le poitrail et les flancs, qui suent, et on garde le poil sur le dos, la croupe et les jambes. **On ne tond que si l'on couvre** : ce qu'on retire, il faut le rendre.",
          en:"You do not clip against the cold, you clip against SWEAT: a horse in full coat takes hours to dry, and it is being wet that chills him — not being cold. The clip says what comes off and what stays: the neck, chest and flanks are taken out because they sweat, and the coat is left on the back, quarters and legs. **You only clip if you rug**: what you take away, you must give back.",
          es:"No se esquila contra el frío, se esquila contra el SUDOR: un caballo con todo su pelo tarda horas en secarse, y es mojado como se enfría — no helado. El trazado dice qué se quita y qué se deja: se despoja el cuello, el pecho y los flancos, que sudan, y se conserva el pelo en el dorso, la grupa y las patas. **Solo se esquila si se pone manta**: lo que se quita, hay que devolverlo.",
          it:"Non si tosa contro il freddo, si tosa contro il SUDORE: un cavallo con tutto il pelo ci mette ore ad asciugare, ed è da bagnato che prende freddo — non da gelato. Il tracciato dice cosa si toglie e cosa resta: si libera il collo, il petto e i fianchi, che sudano, e si lascia il pelo su dorso, groppa e gambe. **Si tosa solo se si copre**: quello che si toglie va restituito.",
          de:"Man schert nicht gegen die Kälte, man schert gegen den SCHWEISS: ein Pferd im vollen Fell braucht Stunden zum Trocknen, und nass wird es krank — nicht kalt. Das Muster sagt, was weg muss und was bleibt: Hals, Brust und Flanken werden freigelegt, weil sie schwitzen, auf Rücken, Kruppe und Beinen bleibt das Fell. **Geschoren wird nur, wer eingedeckt wird**: was man wegnimmt, muss man zurückgeben.",
          ja:"寒さのために刈るのではない。汗のために刈る。冬毛のままの馬が運動すれば乾くまでに何時間もかかり、馬が体調を崩すのは「濡れているから」で、「寒いから」ではない。型は、どこを刈りどこを残すかを示す。汗をかく首、胸、脇腹を刈り、背、尻、脚の毛は残す。**刈るのは馬着を着せる場合だけ**。取り去ったものは、返さなければならない。",
          ar:"لا نجز شعر الحصان لحمايته من البرد، بل لمساعدته على التخلص من العرق. فالحصان ذو الشعر الشتوي الكثيف يحتاج إلى ساعات حتى يجف بعد العمل، والرطوبة هي التي تجعله يبرد. يحدد نمط الجز المناطق التي يزال منها الشعر والمناطق التي يترك عليها: فيزال عن العنق والصدر والجنبين، ويترك على الظهر والكفل والقوائم. ولا يجز شعر الحصان إلا إذا كان سيغطى بعد ذلك، لأن الحماية التي أزيلت يجب تعويضها." } },

  /* ---------- ce qu'on met sur le cheval ---------- */

  { ref:"couvrir", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"couvrir"}, en:{m:"to rug up", p:"tou reug eup"},
           es:{m:"poner la manta"}, it:{m:"mettere la coperta"},
           de:{m:"eindecken", p:"aïn-dè-keune"}, ja:{m:"馬着を着せる", p:"bachaku o kiseru"},
           ar:{m:"تغطية الحصان"} },
    def:{ fr:"Mettre la couverture — ou choisir de ne pas la mettre : un cheval en poil d'hiver, dehors, s'en passe souvent très bien, et trop couvrir fait transpirer sous la toile, ce qui est exactement ce qu'on voulait éviter. La main sous la couverture, à l'épaule, tranche mieux que le thermomètre.",
          en:"Putting the rug on — or choosing not to: a horse in his winter coat, living out, often does very well without one, and over-rugging makes him sweat under the cloth, which is precisely what you were avoiding. A hand slipped under the rug at the shoulder settles it better than a thermometer.",
          es:"Poner la manta — o decidir no ponerla: un caballo con pelo de invierno, fuera, suele pasar muy bien sin ella, y abrigar de más le hace sudar bajo la tela, justo lo que se quería evitar. La mano bajo la manta, en la espalda, decide mejor que el termómetro.",
          it:"Mettere la coperta — o scegliere di non metterla: un cavallo col pelo invernale, fuori, spesso ne fa benissimo a meno, e coprire troppo lo fa sudare sotto il telo, esattamente ciò che si voleva evitare. La mano sotto la coperta, alla spalla, decide meglio del termometro.",
          de:"Die Decke auflegen — oder bewusst darauf verzichten: ein Pferd im Winterfell, draußen, kommt oft sehr gut ohne aus, und zu warm eingedeckt schwitzt es unter dem Tuch — genau das, was man vermeiden wollte. Die Hand unter der Decke an der Schulter entscheidet besser als das Thermometer.",
          ja:"馬着を着せること。あるいは着せない選択をすること。冬毛の馬は屋外でも馬着なしで元気に過ごすことが多い。着せすぎれば布の下で汗をかき、それこそ避けたかったことになる。肩のあたりで馬着の下に手を入れる。体温計よりも確かな判断だ。",
          ar:"وضع الغطاء، أو اختيار عدم وضعه: حصان بالشعر الشتوي في الخارج يستغني عنه غالبا، والإفراط في التغطية يجعله يعرق تحت القماش، وهو ما أردنا تجنبه. وضع اليد تحت الغطاء عند الكتف أدق من الاعتماد على مقياس الحرارة." } },

  { ref:"chemise", lecon:1, coll:"froid",
    mots:{ fr:{m:"la chemise séchante", var:"la polaire"},
           en:{m:"the cooler", p:"kou-leur", var:"the fleece rug"},
           es:{m:"la manta secadora"}, it:{m:"la coperta asciugante"},
           de:{m:"die Abschwitzdecke", p:"ap-chvits-dè-ke"},
           ja:{m:"吸汗用馬着", p:"kyūkan-yō bachaku"},
           ar:{m:"غطاء التجفيف"} },
    def:{ fr:"La toile qu'on jette sur un cheval trempé de sueur pour qu'il sèche sans se refroidir : la laine ou la polaire boit l'humidité et la fait passer à travers. On la met après le travail, on l'enlève quand le cheval est sec, et alors seulement on remet la couverture. Le froid n'a jamais rendu un cheval malade — l'humidité sous une toile, oui.",
          en:"The sheet thrown over a horse soaked in sweat so he dries without chilling: wool or fleece drinks the damp and wicks it through. It goes on after work, comes off once he is dry, and only then does the rug go back on. Cold has never made a horse ill — damp trapped under cloth has.",
          es:"La tela que se echa sobre un caballo empapado de sudor para que se seque sin enfriarse: la lana o el polar absorbe la humedad y la deja pasar. Se pone tras el trabajo, se retira cuando está seco, y solo entonces se vuelve a poner la manta. El frío nunca puso enfermo a un caballo — la humedad bajo una tela, sí.",
          it:"Il telo che si getta su un cavallo bagnato di sudore perché asciughi senza raffreddarsi: la lana o il pile bevono l'umidità e la fanno passare. Si mette dopo il lavoro, si toglie quando è asciutto, e solo allora si rimette la coperta. Il freddo non ha mai fatto ammalare un cavallo — l'umidità sotto un telo sì.",
          de:"Das Tuch, das man einem schweißnassen Pferd überwirft, damit es trocknet, ohne auszukühlen: Wolle oder Fleece nimmt die Feuchte auf und lässt sie durch. Nach der Arbeit drauf, ab, sobald das Pferd trocken ist — und erst dann kommt die Decke wieder. Kälte hat noch kein Pferd krank gemacht — eingeschlossene Nässe schon.",
          ja:"汗でぬれた馬にかけ、冷やさずに乾かすための布。ウールやフリースが湿気を吸い、外へ通す。運動のあとにかけ、乾いたら外し、そのあとで初めて馬着を戻す。馬を病気にするのは寒さではない。布の下にこもった湿気である。",
          ar:"القماش الذي يوضع على حصان مبلل بالعرق ليجف دون أن يبرد: الصوف أو الفليس يمتص الرطوبة ويمررها إلى الخارج. يوضع بعد العمل، ويرفع حين يجف الحصان، وعندها فقط يعاد الغطاء. البرد لم يمرض حصانا قط، أما الرطوبة تحت القماش فنعم." } },

  { ref:"couvrerein", lecon:1, coll:"froid",
    mots:{ fr:{m:"le couvre-reins"}, en:{m:"the quarter sheet", p:"kouor-teur chiit",
           var:"the exercise sheet"},
           es:{m:"el cubre-riñones"}, it:{m:"il copri-reni"},
           de:{m:"die Nierendecke", p:"ni-ren-dè-ke"},
           ja:{m:"腰当て", p:"koshiate"},
           ar:{m:"غطاء الكفل"} },
    def:{ fr:"La couverture courte qu'on garde SUR le cheval pendant qu'on le monte, posée derrière la selle. Elle tient les muscles du dos et de la croupe au chaud pendant la détente et les pauses, quand le cheval attend et refroidit sans bouger. C'est le geste le plus quotidien de l'hiver, et celui qu'on oublie le plus.",
          en:"The short rug kept ON the horse while you ride, laid behind the saddle. It holds the muscles of the back and quarters warm through the warm-up and the standing about, when a horse cools down without moving. It is the most everyday winter habit, and the one most often forgotten.",
          es:"La manta corta que se mantiene SOBRE el caballo mientras se monta, colocada tras la silla. Guarda el calor de los músculos del dorso y la grupa durante el calentamiento y las paradas, cuando el caballo se enfría sin moverse. Es el gesto más cotidiano del invierno, y el que más se olvida.",
          it:"La coperta corta che resta SUL cavallo mentre lo si monta, posata dietro la sella. Tiene al caldo i muscoli del dorso e della groppa durante il riscaldamento e le soste, quando il cavallo si raffredda stando fermo. È il gesto più quotidiano dell'inverno, e il più dimenticato.",
          de:"Die kurze Decke, die beim Reiten AUF dem Pferd bleibt, hinter dem Sattel. Sie hält die Muskeln von Rücken und Kruppe warm — beim Lösen und beim Stehen, wenn ein Pferd auskühlt, ohne sich zu bewegen. Der alltäglichste Wintergriff, und der am häufigsten vergessene.",
          ja:"騎乗中も馬にかけたままにする短い馬着。鞍の後ろに置く。準備運動や待機のあいだ、動かずに冷えていく背と尻の筋肉を温かく保つ。冬のもっとも日常的な所作であり、もっとも忘れられやすい所作でもある。",
          ar:"الغطاء القصير الذي يبقى على الحصان أثناء ركوبه، خلف السرج. يبقي عضلات الظهر والكفل دافئة أثناء الإحماء والاستراحات، حين ينتظر الحصان ويبرد دون حركة. أكثر عادات الشتاء يومية، وأكثرها نسيانا." } },

  { ref:"bonnetlaine", lecon:1, coll:"cavalier",
    mots:{ fr:{m:"le bonnet"}, en:{m:"the beanie", p:"bii-ni", var:"the toque"},
           es:{m:"el gorro"}, it:{m:"il berretto"},
           de:{m:"die Mütze", p:"mu-tse"}, ja:{m:"ニット帽", p:"nittobō"},
           ar:{m:"قبعة صوفية"} },
    def:{ fr:"Celui de la cavalière, pas celui du cheval. Au Canada on dit *toque*, et nulle part ailleurs — c'est l'un de ces mots qu'on n'apprend qu'en y allant. Sous le casque il n'entre pas : on le garde pour le pansage, les paddocks et les allers-retours dans le froid.",
          en:"The rider's, not the horse's. In Canada it is a *toque*, a word used nowhere else — one of those you only pick up by going there. It will not fit under a helmet: it is for grooming, turnout and the walks back and forth in the cold.",
          es:"El de la jinete, no el del caballo. En Canadá se dice *toque*, y en ningún otro sitio — una de esas palabras que solo se aprenden yendo. Bajo el casco no cabe: se guarda para el cepillado, los paddocks y las idas y venidas en el frío.",
          it:"Quello dell'amazzone, non quello del cavallo. In Canada si dice *toque*, e da nessun'altra parte — una di quelle parole che si imparano solo andandoci. Sotto il casco non entra: serve per la pulizia, i paddock e i viaggi avanti e indietro nel freddo.",
          de:"Die der Reiterin, nicht die des Pferdes. In Kanada heißt sie *toque* — sonst nirgends, eines dieser Wörter, die man nur vor Ort lernt. Unter den Helm passt sie nicht: sie ist fürs Putzen, fürs Auf-die-Weide-Bringen und für die Wege hin und her in der Kälte.",
          ja:"かぶるのは馬ではなく騎手。カナダでは *toque* と言い、ほかのどこでも言わない。現地に行かなければ覚えない類の言葉だ。ヘルメットの下には入らないので、手入れや放牧、寒さのなかの行き帰りに使う。",
          ar:"قبعة الفارسة لا الحصان. في كندا تسمى «توك»، ولا تسمى كذلك في مكان آخر. لا تدخل تحت الخوذة، فتستخدم أثناء تنظيف الحصان، وفي الحظائر الخارجية، وأثناء التنقل في البرد." } },

  /* ---------- le sol ---------- */

  { ref:"solgele", lecon:1, coll:"froid",
    mots:{ fr:{m:"le sol gelé"}, en:{m:"the frozen ground", p:"frô-zeune graound"},
           es:{m:"el suelo helado"}, it:{m:"il terreno gelato"},
           de:{m:"der gefrorene Boden", p:"gue-frô-re-ne bô-den"},
           ja:{m:"凍った地面", p:"kōtta jimen"},
           ar:{m:"الأرض المتجمدة"} },
    def:{ fr:"Le vrai patron de l'hiver : c'est lui qui décide si le sol se travaille ou se regarde. Un sol gelé est dur comme le béton et garde les traces de sabots de la veille, en arêtes : les tendons ne pardonnent pas. On marche, on ne trotte pas, et surtout on ne tourne pas court.",
          en:"The true master of winter: it decides whether the ground can be worked or only looked at. Frozen ground is hard as concrete and keeps yesterday's hoofprints as ridges: tendons do not forgive it. You walk, you do not trot, and above all you do not turn short.",
          es:"El verdadero jefe del invierno: decide si el suelo se trabaja o solo se mira. Un suelo helado está duro como el hormigón y guarda las huellas de ayer en aristas: los tendones no lo perdonan. Se anda al paso, no se trota, y sobre todo no se gira corto.",
          it:"Il vero padrone dell'inverno: decide se il terreno si lavora o si guarda soltanto. Un terreno gelato è duro come il cemento e conserva le impronte di ieri a creste: i tendini non perdonano. Si cammina, non si trotta, e soprattutto non si gira corto.",
          de:"Der wahre Herr des Winters: er entscheidet, ob der Boden bearbeitet oder nur betrachtet wird. Gefrorener Boden ist hart wie Beton und behält die Hufspuren von gestern als Kanten: Sehnen verzeihen das nicht. Man geht Schritt, trabt nicht — und wendet vor allem nicht kurz.",
          ja:"冬の本当の主。地面で運動できるか、眺めるだけかを決める。凍った地面はコンクリートのように硬く、前日の蹄跡を稜のまま残す。腱はそれを許さない。常歩で歩き、速歩はせず、そして何より小さく回らない。",
          ar:"هو الحاكم الحقيقي في الشتاء، لأنه يحدد ما إذا كانت الأرض صالحة للعمل أم لا. تكون الأرض المتجمدة صلبة كالإسمنت، وقد تحتفظ بآثار الحوافر على شكل حواف حادة تؤذي الأوتار. لذلك نسير بالحصان على مشية الخطو، ولا ننتقل إلى الخبب، ونتجنب الانعطافات الحادة." } },

  { ref:"crampon", lecon:1, coll:"froid",
    mots:{ fr:{m:"le crampon à glace"}, en:{m:"the ice stud", p:"aïss steud",
           var:"the caulk"},
           es:{m:"el ramplón para hielo"}, it:{m:"il rampone da ghiaccio"},
           de:{m:"der Eisstollen", p:"aïss-chto-leune"},
           ja:{m:"氷用蹄鉄スタッド", p:"kōri-yō teitetsu sutaddo"},
           ar:{m:"مسمار مانع للانزلاق على الجليد"} },
    def:{ fr:"Le petit clou vissé dans le fer pour mordre la glace, comme un pneu clouté. Il accroche — c'est bien le problème : un cheval qui accroche en glissant se blesse plus qu'un cheval qui glisse franchement. On les visse pour un besoin précis, on ne les laisse pas à l'année.",
          en:"The small stud screwed into the shoe to bite the ice, like a studded tyre. It grips — and that is exactly the risk: a horse who grips while sliding hurts himself more than one who slides clean. You screw them in for a purpose and take them out again; they do not stay in all year.",
          es:"El clavito atornillado en la herradura para morder el hielo, como un neumático de clavos. Agarra — y ahí está el riesgo: un caballo que agarra mientras resbala se lesiona más que uno que resbala limpio. Se ponen para una necesidad concreta y se quitan; no se dejan todo el año.",
          it:"Il piccolo ramponcino avvitato nel ferro per mordere il ghiaccio, come un pneumatico chiodato. Fa presa — ed è proprio il rischio: un cavallo che fa presa mentre scivola si fa più male di uno che scivola pulito. Si avvitano per un bisogno preciso e si togliono; non restano tutto l'anno.",
          de:"Der kleine Stollen, der ins Eisen geschraubt wird, um ins Eis zu greifen — wie ein Spikereifen. Er greift, und genau das ist die Gefahr: ein Pferd, das beim Rutschen hängen bleibt, verletzt sich schwerer als eines, das glatt wegrutscht. Man schraubt sie für einen bestimmten Zweck ein und wieder heraus; sie bleiben nicht das ganze Jahr.",
          ja:"氷をとらえるために蹄鉄にねじ込む小さな金具。スパイクタイヤと同じ考え方だ。よく噛む——そこが危険でもある。滑りながら引っかかる馬は、きれいに滑る馬よりも大きな怪我をする。必要なときにねじ込み、そのあと外す。一年中つけたままにはしない。",
          ar:"مسمار صغير يثبت في الحدوة ليساعد على التماسك فوق الجليد، مثل مسمار الإطار الشتوي. لكن شدة التماسك قد تزيد خطر الإصابة إذا انزلقت بقية القوائم. لذلك يركب عند الحاجة فقط، ولا يترك في الحدوة طوال السنة." } },

  { ref:"plaqueneige", lecon:1, coll:"froid",
    mots:{ fr:{m:"la plaque anti-neige"}, en:{m:"the snow pad", p:"snô pad",
           var:"the bubble pad"},
           es:{m:"la plantilla antinieve"}, it:{m:"la piastra antineve"},
           de:{m:"der Schneegrip", p:"chné-grip", var:"das Hufpolster"},
           ja:{m:"雪詰まり防止パッド", p:"yukizumari bōshi paddo"},
           ar:{m:"صفيحة مانعة لتراكم الثلج تحت الحافر"} },
    def:{ fr:"Sous le pied, la neige se tasse en une boule de glace qui grossit à chaque pas : le cheval finit par marcher sur des échasses. La plaque, souple et bombée, la chasse à chaque appui. Sans elle, on cure les pieds trois fois par jour, et on graisse la sole pour que rien n'accroche.",
          en:"Under the foot, snow packs into a ball of ice that grows with every stride: the horse ends up walking on stilts. The pad, flexible and domed, pops it out at each step. Without one you pick out the feet three times a day and grease the sole so nothing sticks.",
          es:"Bajo el casco, la nieve se apelmaza en una bola de hielo que crece a cada paso: el caballo acaba caminando sobre zancos. La plantilla, flexible y abombada, la expulsa en cada apoyo. Sin ella se limpian los cascos tres veces al día y se engrasa la palma para que nada se pegue.",
          it:"Sotto il piede la neve si compatta in una palla di ghiaccio che cresce a ogni passo: il cavallo finisce per camminare sui trampoli. La piastra, morbida e bombata, la caccia a ogni appoggio. Senza, si pulisce il piede tre volte al giorno e si ingrassa la suola perché nulla attacchi.",
          de:"Unter dem Huf presst sich Schnee zu einer Eiskugel, die mit jedem Schritt wächst: am Ende läuft das Pferd auf Stelzen. Das gewölbte, weiche Polster drückt sie bei jedem Auftreten heraus. Ohne kratzt man die Hufe dreimal täglich aus und fettet die Sohle, damit nichts haftet.",
          ja:"蹄の下で雪は踏み固められ、一歩ごとに大きくなる氷の玉になる。やがて馬は竹馬に乗って歩いているような状態になる。柔らかく丸みのあるパッドは、着地ごとにその玉を押し出す。パッドがなければ、一日三回蹄を掃除し、蹄底に油を塗って雪がつかないようにする。",
          ar:"تحت الحافر يتراكم الثلج ككرة جليد تكبر مع كل خطوة، فيمشي الحصان كأنه على ركائز. تطرد الصفيحة المرنة المحدبة الثلج المتراكم مع كل وطأة. ومن دونها يجب تنظيف الحوافر مرارا ودهن باطن الحافر للحد من التصاق الثلج." } },

  /* ---------- LE VRAI DANGER : l'eau ---------- */

  { ref:"abrchauffant", lecon:1, coll:"froid",
    mots:{ fr:{m:"l'abreuvoir chauffant"}, en:{m:"the heated waterer", p:"hii-tid oua-teu-reur"},
           es:{m:"el bebedero calefactado"}, it:{m:"l'abbeveratoio riscaldato"},
           de:{m:"die Tränke mit Heizung", p:"trèn-ke mit haï-tsoung"},
           ja:{m:"加温式水槽", p:"kaon-shiki suisō"},
           ar:{m:"حوض الشرب المدفأ"} },
    def:{ fr:"Une résistance dans le bac, et l'eau reste liquide et tiède par −30 °C. Ce n'est pas un luxe : c'est le seul matériel d'hiver qui sauve vraiment des chevaux. Là où il n'y en a pas, on casse la glace deux fois par jour et on porte l'eau chaude à la main.",
          en:"A heating element in the trough, and the water stays liquid and lukewarm at −30 °C. It is not a luxury: it is the one piece of winter kit that genuinely saves horses. Where there is none, you break the ice twice a day and carry warm water by hand.",
          es:"Una resistencia en el pilón, y el agua se mantiene líquida y templada a −30 °C. No es un lujo: es el único material de invierno que de verdad salva caballos. Donde no lo hay, se rompe el hielo dos veces al día y se acarrea agua caliente a mano.",
          it:"Una resistenza nella vasca, e l'acqua resta liquida e tiepida a −30 °C. Non è un lusso: è l'unica attrezzatura invernale che salvi davvero i cavalli. Dove non c'è, si rompe il ghiaccio due volte al giorno e si porta l'acqua calda a mano.",
          de:"Ein Heizstab im Becken, und das Wasser bleibt bei −30 °C flüssig und lauwarm. Kein Luxus: das einzige Winterzubehör, das wirklich Pferde rettet. Wo es keines gibt, bricht man zweimal täglich das Eis und schleppt warmes Wasser.",
          ja:"水槽に発熱体を入れておけば、マイナス30度でも水は凍らず、ぬるいまま保たれる。贅沢品ではない。冬の設備のなかで、本当に馬の命を救う唯一のものだ。これがない場所では、一日二回氷を割り、湯を手で運ぶ。",
          ar:"مقاومة كهربائية في الحوض، فيبقى الماء سائلا فاترا عند ثلاثين تحت الصفر. ليس ترفا: إنه من أهم تجهيزات الشتاء لحماية الخيول. وعند عدم توفره، يجب كسر الجليد مرتين يوميا ونقل الماء الدافئ باليد." } },

  { ref:"deshydratation", lecon:1, coll:"froid",
    mots:{ fr:{m:"la déshydratation"}, en:{m:"dehydration", p:"di-haï-dré-cheune"},
           es:{m:"la deshidratación"}, it:{m:"la disidratazione"},
           de:{m:"die Dehydrierung", p:"dé-hu-dri-roung"},
           ja:{m:"脱水", p:"dassui"},
           ar:{m:"الجفاف"} },
    def:{ fr:"Le vrai danger de l'hiver, et personne ne s'y attend : un cheval ne boit presque pas quand l'eau est glacée, et le foin sec de l'hiver ne contient pas une goutte d'eau — là où l'herbe d'été en est gorgée. C'est ainsi que naissent les coliques de janvier. On ne surveille pas le froid, on surveille les abreuvoirs.",
          en:"Winter's real danger, and nobody expects it: a horse barely drinks when the water is icy, and winter's dry hay holds not a drop — where summer grass is soaked in it. That is how January colics are born. You do not watch the cold, you watch the water.",
          es:"El verdadero peligro del invierno, y nadie lo espera: un caballo apenas bebe cuando el agua está helada, y el heno seco del invierno no contiene una gota — mientras que la hierba del verano está empapada. Así nacen los cólicos de enero. No se vigila el frío, se vigilan los bebederos.",
          it:"Il vero pericolo dell'inverno, e nessuno se l'aspetta: un cavallo bere quasi nulla quando l'acqua è ghiacciata, e il fieno secco dell'inverno non contiene una goccia — mentre l'erba d'estate ne è imbevuta. Così nascono le coliche di gennaio. Non si sorveglia il freddo, si sorvegliano gli abbeveratoi.",
          de:"Die wahre Gefahr des Winters, und niemand rechnet mit ihr: ein Pferd trinkt kaum, wenn das Wasser eisig ist, und das trockene Winterheu enthält keinen Tropfen — anders als das Sommergras. So entstehen die Koliken im Januar. Man beobachtet nicht die Kälte, man beobachtet die Tränken.",
          ja:"冬の本当の危険であり、誰も予想しない。水が氷のように冷たければ馬はほとんど飲まず、冬の乾いた干し草には水分が一滴も含まれていない。夏の草はたっぷり含んでいるのに。こうして一月の腹痛が生まれる。見張るべきは寒さではなく、水である。",
          ar:"خطر الشتاء الحقيقي، ولا أحد يتوقعه: الحصان لا يكاد يشرب عندما يكون الماء شديد البرودة، والدريس الجاف في الشتاء يحتوي على قدر قليل جدا من الماء، بخلاف عشب الصيف المشبع. وهكذا تزداد حالات المغص في الشتاء. لا نراقب البرد، بل نراقب المشارب." } },

  { ref:"boire", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"faire boire"}, en:{m:"to water a horse", p:"tou oua-teur"},
           es:{m:"dar de beber"}, it:{m:"far bere"},
           de:{m:"tränken", p:"trèn-keune"}, ja:{m:"水を飲ませる", p:"mizu o nomaseru"},
           ar:{m:"سقاية الحصان"} },
    def:{ fr:"Le geste de l'hiver : porter l'eau, la tiédir, attendre devant le seau que le cheval ait fini. Un cheval boit deux fois plus d'eau tiède que d'eau glacée — et une poignée de sel dans la ration lui donne soif, ce qui vaut mieux que de le supplier.",
          en:"The winter chore: carrying the water, warming it, standing by the bucket until he has finished. A horse drinks twice as much lukewarm water as icy water — and a handful of salt in his feed makes him thirsty, which works better than pleading with him.",
          es:"El gesto del invierno: acarrear el agua, templarla, esperar junto al cubo a que termine. Un caballo bebe el doble de agua templada que de agua helada — y un puñado de sal en la ración le da sed, lo que funciona mejor que suplicarle.",
          it:"Il gesto dell'inverno: portare l'acqua, intiepidirla, restare accanto al secchio finché ha finito. Un cavallo bere il doppio di acqua tiepida rispetto a quella ghiacciata — e una manciata di sale nella razione gli dà sete, cosa che funziona meglio del pregarlo.",
          de:"Der Wintergriff: das Wasser tragen, es lauwarm machen, am Eimer warten, bis das Pferd fertig ist. Ein Pferd trinkt von lauwarmem Wasser doppelt so viel wie von eisigem — und eine Handvoll Salz im Futter macht Durst, was besser wirkt als jedes Bitten.",
          ja:"冬の仕事。水を運び、ぬるくし、飲み終わるまでバケツのそばで待つ。馬は氷水よりぬるい水を二倍飲む。飼料に塩をひとつかみ入れれば渇きが出る。頼み込むよりずっと効く。",
          ar:"عادة الشتاء: حمل الماء، وتفتيره، والوقوف أمام الدلو حتى ينتهي الحصان. يشرب الحصان من الماء الفاتر كمية أكبر بكثير مما يشرب من الماء المثلج، وحفنة ملح في العليقة تجعله يعطش، وهذا أفضل من محاولة إقناعه بالشرب." } },

  /* ---------- ce que l'hiver rend possible ---------- */

  { ref:"hiverner", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"hiverner"}, en:{m:"to overwinter", p:"tou o-veur-ouin-teur"},
           es:{m:"invernar"}, it:{m:"svernare"},
           de:{m:"überwintern", p:"u-beur-vin-teurn"}, ja:{m:"冬を越す", p:"fuyu o kosu"},
           ar:{m:"قضاء الشتاء في المرعى"} },
    def:{ fr:"Passer l'hiver au pré, en troupeau, au repos, sans couverture et sans travail. Beaucoup de chevaux de sport reviennent transformés de ces mois-là : les tendons se refont, la tête se repose, le dos se remuscle en marchant. C'est un choix de gestion, pas un abandon.",
          en:"Spending the winter out in a herd, at rest, unrugged and unridden. Many sport horses come back transformed by those months: tendons repair, the mind settles, the back rebuilds itself by walking. It is a management choice, not neglect.",
          es:"Pasar el invierno en el prado, en grupo, descansando, sin manta y sin trabajo. Muchos caballos de deporte vuelven transformados de esos meses: los tendones se rehacen, la cabeza descansa, el dorso se musculariza andando. Es una decisión de manejo, no un abandono.",
          it:"Passare l'inverno al prato, in gruppo, a riposo, senza coperta e senza lavoro. Molti cavalli sportivi tornano trasformati da quei mesi: i tendini si rifanno, la testa si riposa, il dorso si rimuscola camminando. È una scelta di gestione, non un abbandono.",
          de:"Den Winter auf der Weide verbringen, in der Herde, in Ruhe, ohne Decke und ohne Arbeit. Viele Sportpferde kehren verwandelt zurück: Sehnen heilen, der Kopf wird ruhig, der Rücken baut sich im Gehen wieder auf. Eine Entscheidung des Managements, kein Vernachlässigen.",
          ja:"放牧地で、群れの中で、馬着も運動もなしに休みながら冬を過ごすこと。多くのスポーツホースがその数ヶ月で見違えるように戻ってくる。腱は修復され、気持ちは落ち着き、背は歩くことで作り直される。放置ではなく、管理の選択である。",
          ar:"قضاء الشتاء في المرعى، ضمن القطيع، في راحة، بلا غطاء وبلا عمل. كثير من خيول الرياضة تعود متغيرة من تلك الأشهر: تتعافى الأوتار، ويرتاح الحصان ذهنيا، وتستعيد عضلات ظهره قوتها بفضل المشي. إنه خيار في إدارة الخيل، وليس إهمالا." } },

  { ref:"degel", lecon:1, coll:"froid",
    mots:{ fr:{m:"le dégel"}, en:{m:"the thaw", p:"thô"},
           es:{m:"el deshielo"}, it:{m:"il disgelo"},
           de:{m:"das Tauwetter", p:"tao-vè-teur"}, ja:{m:"雪解け", p:"yukidoke"},
           ar:{m:"ذوبان الجليد"} },
    def:{ fr:"La fin de l'hiver, et sa saison la plus boueuse : le sol dégèle par le haut et l'eau ne s'en va pas, parce qu'il reste gelé dessous. Les pieds trempent, la peau des paturons s'irrite, et l'on attend une semaine avant de retravailler. Le dégel casse plus de saisons que le froid.",
          en:"The end of winter, and its muddiest season: the ground thaws from the top and the water cannot drain, because it is still frozen underneath. Feet stand wet, the skin of the heels gets sore, and you wait a week before working again. The thaw ruins more seasons than the frost.",
          es:"El final del invierno, y su época más embarrada: el suelo se deshiela por arriba y el agua no se va, porque sigue helado debajo. Los cascos se empapan, la piel de los menudillos se irrita, y se espera una semana antes de volver a trabajar. El deshielo rompe más temporadas que el frío.",
          it:"La fine dell'inverno, e la sua stagione più fangosa: il terreno si scongela dall'alto e l'acqua non se ne va, perché sotto è ancora gelato. I piedi restano bagnati, la pelle dei pastorali si irrita, e si aspetta una settimana prima di riprendere. Il disgelo rovina più stagioni del gelo.",
          de:"Das Ende des Winters und seine schlammigste Zeit: der Boden taut von oben, und das Wasser kann nicht ab, weil es darunter noch gefroren ist. Die Hufe stehen nass, die Haut der Ballen wird wund, und man wartet eine Woche, bevor man wieder arbeitet. Das Tauwetter kostet mehr Saisons als der Frost.",
          ja:"冬の終わり、そして最も泥深い季節。地面は表面から解けるが、下はまだ凍っているため水が抜けない。蹄は濡れたままになり、球節の皮膚は荒れ、運動再開まで一週間待つ。凍結よりも雪解けのほうが、多くのシーズンを壊す。",
          ar:"نهاية الشتاء، وأكثر مواسمه وحلا: تذوب الطبقة العليا من الأرض، لكن الماء لا يتصرف لأن الطبقات السفلى تبقى متجمدة. تنقع الحوافر، ويتهيج جلد أسفل القوائم، وننتظر أسبوعا قبل العودة إلى العمل. قد يضر ذوبان الجليد بموسم العمل أكثر من البرد نفسه." } },

  { ref:"chinook", lecon:1, coll:"froid",
    mots:{ fr:{m:"le chinook"}, en:{m:"the chinook", p:"chi-nouk"},
           es:{m:"el chinook"}, it:{m:"il chinook"},
           de:{m:"der Chinook", p:"tchi-nouk"}, ja:{m:"チヌーク", p:"chinūku"},
           ar:{m:"رياح الشينوك الدافئة"} },
    def:{ fr:"Le vent chaud des Rocheuses qui fait fondre la neige en une nuit : il peut faire monter la température de vingt degrés avant le petit déjeuner. Ici, l'hiver s'interrompt en plein janvier — puis il revient. Ce sont ces allers-retours, et non le froid, qui font tousser les chevaux de l'Alberta.",
          en:"The warm wind off the Rockies that melts the snow in one night: it can lift the temperature twenty degrees before breakfast. Here winter pauses in the middle of January — then comes back. It is that going and coming, not the cold itself, that makes Alberta horses cough.",
          es:"El viento cálido de las Rocosas que funde la nieve en una noche: puede subir la temperatura veinte grados antes del desayuno. Aquí el invierno se interrumpe en pleno enero — y luego vuelve. Son esos vaivenes, y no el frío, los que hacen toser a los caballos de Alberta.",
          it:"Il vento caldo delle Montagne Rocciose che scioglie la neve in una notte: può alzare la temperatura di venti gradi prima di colazione. Qui l'inverno si interrompe in pieno gennaio — poi torna. Sono questi andirivieni, non il freddo, a far tossire i cavalli dell'Alberta.",
          de:"Der warme Wind aus den Rockies, der den Schnee in einer Nacht schmilzt: er kann die Temperatur vor dem Frühstück um zwanzig Grad heben. Hier setzt der Winter mitten im Januar aus — und kommt dann zurück. Dieses Hin und Her, nicht die Kälte, lässt die Pferde Albertas husten.",
          ja:"ロッキー山脈から吹き下ろす暖かい風。一晩で雪を解かし、朝食前に気温を二十度上げることもある。ここでは真冬の一月に冬が中断し、そして戻ってくる。アルバータの馬に咳をさせるのは寒さではなく、この行き来である。",
          ar:"رياح الشينوك الدافئة القادمة من جبال الروكي، والتي قد تذيب الثلج في ليلة واحدة: قد ترفع الحرارة عشرين درجة قبل الفطور. هنا ينقطع الشتاء في وسط يناير، ثم يعود. هذه التقلبات، لا البرد، هي ما يجعل خيول ألبرتا تسعل." } }

  ],

  /* Phrases : règle des 7 mots en français. FORMAT À PLAT — voir l'en-tête.
     Les deux premières sont celles demandées par Blandine le 10/08 :
     « on aurait aimé avoir une phrase genre remets-lui sa couverture ». */
  phrases: [

  { lecon:1, fr:"Remets-lui sa couverture.",
             en:"Put his rug back on.",
             es:"Vuélvele a poner la manta.",
             it:"Rimettigli la coperta.",
             de:"Leg ihm die Decke wieder auf.",
             ja:"馬着をもう一度掛けてあげて。",
      ar:"أعيدي له غطاءه." },

  { lecon:1, fr:"L'abreuvoir est gelé, il faut casser la glace.",
             en:"The trough is frozen, you must break the ice.",
             es:"El bebedero está helado, hay que romper el hielo.",
             it:"L'abbeveratoio è gelato, bisogna rompere il ghiaccio.",
             de:"Die Tränke ist gefroren, das Eis muss gebrochen werden.",
             ja:"水槽が凍っている。氷を割らなければならない。",
      ar:"حوض الشرب متجمد، ويجب كسر الجليد." },

  { lecon:1, fr:"Le sol est gelé, on marche au pas.",
             en:"The ground is frozen, we walk only.",
             es:"El suelo está helado, se va al paso.",
             it:"Il terreno è gelato, si va al passo.",
             de:"Der Boden ist gefroren, wir gehen nur Schritt.",
             ja:"地面が凍っている。常歩だけにする。",
      ar:"الأرض متجمدة، لذلك نسير على مشية الخطو فقط." },

  { lecon:1, fr:"On ne tond que si l'on couvre.",
             en:"You only clip if you rug.",
             es:"Solo se esquila si se pone manta.",
             it:"Si tosa solo se si copre.",
             de:"Geschoren wird nur, wer eingedeckt wird.",
             ja:"馬着を着せるときだけ刈る。",
      ar:"لا نجز شعر الحصان إلا إذا كنا سنغطيه." },

  { lecon:1, fr:"Mets-lui le couvre-reins, il attend.",
             en:"Put the quarter sheet on, he is standing.",
             es:"Ponle el cubre-riñones, está esperando.",
             it:"Mettigli il copri-reni, sta aspettando.",
             de:"Leg ihm die Nierendecke auf, es steht.",
             ja:"腰当てを掛けて。待たせているから。",
      ar:"ضعي له غطاء الكفل، فهو ينتظر." },

  { lecon:1, fr:"L'eau tiède, il en boit deux fois plus.",
             en:"Lukewarm water, he drinks twice as much.",
             es:"Agua templada, bebe el doble.",
             it:"Acqua tiepida, ne bere il doppio.",
             de:"Lauwarmes Wasser, es trinkt doppelt so viel.",
             ja:"ぬるい水なら、二倍飲む。",
      ar:"يشرب من الماء الفاتر ضعف الكمية التي يشربها من الماء البارد." }

  ],

  /* ==================================================================
     LE DIALOGUE DE SPRUCE MEADOWS — 17 août 2026, session 214.

     LA SCÈNE : un matin d'hiver à Calgary, du van au retour au box.
     22 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT-DEUX SONT DE BLANDINE, avec leur
     traduction anglaise. Les quatre autres viennent des phrases
     d'exercice déjà présentes dans ce fichier.
     🟥 SA CONSIGNE : ancrer le froid dans UNE VRAIE SITUATION ÉQUESTRE —
     préparer, échauffer plus longtemps, gérer les couvertures, le sol
     gelé, la récupération, l'indoor. Pas un chapitre de météo.
     ⚠️ ET SURTOUT : « on ne refait pas un énième chapitre CSO ». Spruce
     Meadows est un très grand concours, mais ce chapitre-ci parle du
     FROID. NE PAS y ramener du vocabulaire d'obstacle.

     🟥🟥 LE PIÈGE DU CHAPITRE : **TO WARM UP ≠ TO KEEP WARM.**
     Échauffer un cheval, ce n'est pas le garder au chaud. Il peut avoir
     très chaud sous sa couverture et n'être pas échauffé du tout — et
     c'est exactement ce qui blesse par temps froid. Voir la `def` de
     `echauffement`. Deux phrases du dialogue les opposent (temps 2).

     🟥 SECOND PIÈGE, géographique : **BLANKET (Canada) / RUG (UK)**, et
     **STALL (Amérique du Nord) / STABLE (Grande-Bretagne)**. Le fichier
     portait déjà `to rug up`, qui est britannique ; les phrases de ce
     dialogue disent *blanket*, qui est ce qu'on entend à Calgary. Les
     deux sont justes. NE PAS en corriger un vers l'autre.

     ⚠️ LA RÈGLE DE SÉCURITÉ DU CHAPITRE est au temps 5 : **on ne rentre
     jamais un cheval mouillé au box**. Il faut le sécher entièrement
     avant de remettre la grosse couverture, sinon l'humidité reste
     dessous et il se refroidit sous son propre manteau. C'est la faute
     qui rend malade, pas le froid lui-même.

     `dit` : "joueuse" = elle produit · "club" = le groom, l'entraîneur.
  ================================================================== */
  dialogue: {
    ville: "spruce", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 22 phrases */

    phrases: [

      /* ---- temps 1 · le froid qu'il fait ---- */
      { ref:"df-vraiment-froid", temps:1, dit:"joueuse", mots:["temperature"],
        fr:"Il fait vraiment froid ce matin.",
        en:"It's really cold this morning.",
        es:"Hace muchísimo frío esta mañana.",
        it:"Fa davvero freddo stamattina.",
        de:"Heute Morgen ist es wirklich kalt.",
        ja:"今朝 は 本当 に 寒い です。",
      ar:"الجو بارد جدا هذا الصباح." },

      { ref:"df-quelle-temperature", temps:1, dit:"joueuse", mots:["temperature"],
        fr:"Quelle température fait-il dehors ?",
        en:"What's the temperature outside?",
        es:"¿Qué temperatura hace fuera?",
        it:"Che temperatura fa fuori?",
        de:"Wie viel Grad sind es draußen?",
        ja:"外 は 何 度 です か ?",
      ar:"كم تبلغ درجة الحرارة في الخارج؟" },

      { ref:"df-r-moins-dix", temps:1, dit:"club", mots:["moins-dix","temperature"],
        fr:"Il fait moins dix degrés.",
        en:"It's minus ten degrees.",
        es:"Hace diez grados bajo cero.",
        it:"Fa meno dieci gradi.",
        de:"Es sind minus zehn Grad.",
        ja:"氷点下 十 度 です。",
      ar:"عشر درجات تحت الصفر." },

      { ref:"df-neige-nuit", temps:1, dit:"club", mots:["neige"],
        fr:"Il a neigé toute la nuit.",
        en:"It snowed all night.",
        es:"Ha nevado toda la noche.",
        it:"È nevicato tutta la notte.",
        de:"Es hat die ganze Nacht geschneit.",
        ja:"一晩 中 雪 が 降り まし た。",
      ar:"تساقط الثلج طوال الليل." },

      /* ---- temps 2 · échauffer, et non réchauffer ---- */
      { ref:"df-couverture-transport", temps:2, dit:"club", mots:["couvrir"],
        fr:"Le cheval porte une couverture épaisse pendant le transport.",
        en:"The horse is wearing a heavy blanket for the journey.",
        es:"El caballo lleva una manta gruesa durante el transporte.",
        it:"Il cavallo indossa una coperta pesante durante il trasporto.",
        de:"Das Pferd trägt für den Transport eine dicke Decke.",
        ja:"輸送 中、 馬 に は 厚手 の 馬着 を 着せ ます。",
      ar:"يرتدي الحصان غطاء سميكا أثناء النقل." },

      { ref:"df-enleve-avant-marcher", temps:2, dit:"club", mots:["couvrir","echauffement"],
        fr:"Enlève sa couverture juste avant de commencer à marcher.",
        en:"Take his blanket off just before you start walking.",
        es:"Quítale la manta justo antes de empezar a andar.",
        it:"Togligli la coperta appena prima di cominciare a camminare.",
        de:"Nimm ihm die Decke ab, kurz bevor du losgehst.",
        ja:"歩き 始める 直前 に 馬着 を 外し ます。",
      ar:"انزعي غطاءه قبل أن تبدئي السير به مباشرة." },

      /* 🟥 LE PIÈGE : échauffer n'est pas réchauffer. */
      { ref:"df-echauffer-progressif", temps:2, dit:"club", mots:["echauffement","temperature"],
        fr:"Par ce froid, il faut l'échauffer progressivement.",
        en:"In this cold weather, you need to warm him up gradually.",
        es:"Con este frío hay que calentarlo progresivamente.",
        it:"Con questo freddo bisogna riscaldarlo gradualmente.",
        de:"Bei dieser Kälte muss man ihn langsam aufwärmen.",
        ja:"この 寒 さ で は、 少しずつ 体 を 温め て いき ます。",
      ar:"في هذا البرد، يجب إحماؤه تدريجيا." },

      { ref:"df-marche-plus-longtemps", temps:2, dit:"club", mots:["echauffement"],
        fr:"Marche-le plus longtemps avant de commencer à trotter.",
        en:"Walk him for longer before you start trotting.",
        es:"Camínalo más tiempo antes de empezar a trotar.",
        it:"Fallo camminare più a lungo prima di trottare.",
        de:"Führ ihn länger im Schritt, bevor du antrabst.",
        ja:"速歩 に 移る 前 に、 いつも より 長く 常歩 で 歩か せ ます。",
      ar:"سيري به على مشية الخطو مدة أطول قبل الانتقال إلى الخبب." },

      { ref:"df-muscles-froids", temps:2, dit:"club", mots:["echauffement"],
        fr:"Ses muscles sont encore froids, ne lui demande pas trop tout de suite.",
        en:"His muscles are still cold, so don't ask too much too soon.",
        es:"Sus músculos aún están fríos: no le pidas demasiado enseguida.",
        it:"I suoi muscoli sono ancora freddi: non chiedergli troppo subito.",
        de:"Seine Muskeln sind noch kalt — verlang nicht gleich zu viel.",
        ja:"筋肉 が まだ 冷え て い ます。 すぐ に 多く を 求め ない で ください。",
      ar:"عضلاته ما زالت باردة، لا تطلبي منه الكثير الآن." },

      /* ---- temps 3 · le sol ---- */
      { ref:"df-sol-gele", temps:3, dit:"joueuse", mots:["solgele","neige"],
        fr:"Est-ce que le sol est gelé dehors ?",
        en:"Is the ground frozen outside?",
        es:"¿Está helado el suelo fuera?",
        it:"Il terreno è gelato fuori?",
        de:"Ist der Boden draußen gefroren?",
        ja:"外 の 地面 は 凍っ て い ます か ?",
      ar:"هل الأرض متجمدة في الخارج؟" },

      { ref:"df-partie-glissante", temps:3, dit:"club", mots:["glissant"],
        fr:"Attention, cette partie est glissante.",
        en:"Be careful, this area is slippery.",
        es:"Cuidado, esta zona resbala.",
        it:"Attenzione, questa zona è scivolosa.",
        de:"Vorsicht, diese Stelle ist rutschig.",
        ja:"気 を つけ て、 この あたり は 滑り ます。",
      ar:"انتبهي، هذا الموضع زلق." },

      { ref:"df-crampons-glisser", temps:3, dit:"club", mots:["crampon","glissant"],
        fr:"Le cheval a des crampons pour éviter de glisser.",
        en:"The horse has studs to help prevent him from slipping.",
        es:"El caballo lleva ramplones para no resbalar.",
        it:"Il cavallo ha i ramponi per non scivolare.",
        de:"Das Pferd hat Stollen, damit es nicht rutscht.",
        ja:"滑ら ない よう に、 馬 に は 滑り止め を つけ て い ます。",
      ar:"حدوات الحصان مزودة بمسامير مانعة للانزلاق على الجليد." },

      { ref:"df-marche-au-pas", temps:3, dit:"club", mots:["solgele"],
        fr:"Le sol est gelé, on marche au pas.",
        en:"The ground is frozen — we walk today.",
        es:"El suelo está helado: hoy vamos al paso.",
        it:"Il terreno è gelato: oggi si va al passo.",
        de:"Der Boden ist gefroren — heute nur Schritt.",
        ja:"地面 が 凍っ て い ます。 今日 は 常歩 だけ に し ます。",
      ar:"الأرض متجمدة، لذلك نسير على مشية الخطو فقط." },

      /* ---- temps 4 · l'intérieur ---- */
      { ref:"df-manege-chauffe", temps:4, dit:"club", mots:["manege-chauffe"],
        fr:"Le manège de détente est chauffé.",
        en:"The warm-up arena is heated.",
        es:"El picadero de calentamiento está climatizado.",
        it:"Il campo prova è riscaldato.",
        de:"Die Abreitehalle ist beheizt.",
        ja:"下見 馬場 に は 暖房 が 入っ て い ます。",
      ar:"ميدان الإحماء الداخلي مدفأ." },

      { ref:"df-couvre-reins-attend", temps:4, dit:"club", mots:["couvrerein"],
        fr:"Mets-lui le couvre-reins, il attend.",
        en:"Put his quarter sheet on, he's waiting.",
        es:"Ponle el cubrerriñones, está esperando.",
        it:"Mettigli il copri-reni, sta aspettando.",
        de:"Leg ihm die Nierendecke auf, er wartet.",
        ja:"待機 中 です。 腰 当て を かけ て ください。",
      ar:"ضعي له غطاء الكفل، فهو ينتظر." },

      /* ---- temps 5 · sécher, et ne pas rentrer mouillé ---- */
      { ref:"df-remets-couverture", temps:5, dit:"club", mots:["couvrir"],
        fr:"Remets-lui sa couverture dès qu'il a fini de marcher.",
        en:"Put his blanket back on as soon as he has finished walking.",
        es:"Vuélvele a poner la manta en cuanto termine de andar.",
        it:"Rimettigli la coperta appena ha finito di camminare.",
        de:"Leg ihm die Decke wieder auf, sobald er fertig geführt ist.",
        ja:"歩き 終え たら すぐ に 馬着 を 戻し ます。",
      ar:"أعيدي إليه غطاءه فور انتهائه من المشي." },

      /* 🟥 LA RÈGLE DE SÉCURITÉ DU CHAPITRE. */
      { ref:"df-pas-rentrer-mouille", temps:5, dit:"club", mots:["chemise","couvrir"],
        fr:"Ne le rentre pas au box tant qu'il est encore mouillé.",
        en:"Don't put him back in the stall while he's still wet.",
        es:"No lo metas en el box mientras siga mojado.",
        it:"Non rimetterlo in box finché è ancora bagnato.",
        de:"Stell ihn nicht in die Box, solange er noch nass ist.",
        ja:"濡れ て いる うち は、 馬房 に 戻さ ない で ください。",
      ar:"لا تعيديه إلى حجرته ما دام مبللا." },

      { ref:"df-secher-completement", temps:5, dit:"club", mots:["chemise","couvrir"],
        fr:"Il faut le sécher complètement avant de remettre sa grosse couverture.",
        en:"He needs to be completely dry before you put his heavy blanket back on.",
        es:"Hay que secarlo del todo antes de ponerle la manta gruesa.",
        it:"Bisogna asciugarlo completamente prima di rimettergli la coperta pesante.",
        de:"Er muss ganz trocken sein, bevor die dicke Decke wieder draufkommt.",
        ja:"厚手 の 馬着 を 戻す 前 に、 完全 に 乾かし ます。",
      ar:"يجب تجفيفه تماما قبل إعادة غطائه السميك." },

      /* ---- temps 6 · boire, et le lendemain ---- */
      { ref:"df-verifie-boit", temps:6, dit:"club", mots:["boire","deshydratation"],
        fr:"Vérifie qu'il boit suffisamment malgré le froid.",
        en:"Make sure he drinks enough despite the cold.",
        es:"Comprueba que bebe lo suficiente a pesar del frío.",
        it:"Controlla che beva abbastanza nonostante il freddo.",
        de:"Achte darauf, dass er trotz der Kälte genug trinkt.",
        ja:"寒く て も 水 を 十分 に 飲ん で いる か 確認 し ます。",
      ar:"تأكدي من أنه يشرب كفايته رغم البرد." },

      { ref:"df-eau-tiede", temps:6, dit:"club", mots:["boire","abrchauffant"],
        fr:"L'eau tiède, il en boit deux fois plus.",
        en:"Give him lukewarm water and he'll drink twice as much.",
        es:"Con agua templada bebe el doble.",
        it:"Con l'acqua tiepida ne beve il doppio.",
        de:"Bei lauwarmem Wasser trinkt er doppelt so viel.",
        ja:"ぬるま湯 なら、 倍 の 量 を 飲み ます。",
      ar:"يشرب من الماء الفاتر ضعف الكمية التي يشربها من الماء البارد." },

      { ref:"df-abreuvoir-gele", temps:6, dit:"club", mots:["abrchauffant","boire"],
        fr:"L'abreuvoir est gelé, il faut casser la glace.",
        en:"The trough is frozen — we need to break the ice.",
        es:"El bebedero está helado: hay que romper el hielo.",
        it:"L'abbeveratoio è gelato: bisogna rompere il ghiaccio.",
        de:"Die Tränke ist gefroren — das Eis muss aufgeschlagen werden.",
        ja:"水 桶 が 凍っ て い ます。 氷 を 割ら なけれ ば なり ませ ん。",
      ar:"حوض الشرب متجمد، ويجب كسر الجليد." },

      { ref:"df-temperatures-descendre", temps:6, dit:"club", mots:["temperature","moins-dix"],
        fr:"Demain, les températures devraient encore descendre.",
        en:"Temperatures are expected to drop again tomorrow.",
        es:"Mañana las temperaturas deberían bajar todavía más.",
        it:"Domani le temperature dovrebbero scendere ancora.",
        de:"Morgen sollen die Temperaturen noch weiter sinken.",
        ja:"明日 は さらに 気温 が 下がる 見込み です。",
      ar:"من المتوقع أن تنخفض درجات الحرارة أكثر غدا." }
    ]
  }
};
