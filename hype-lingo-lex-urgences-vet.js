/* hype-lingo-lex-urgences-vet.js — Hype Linguae · « Les urgences du cheval »
   ==================================================================
   37 CONCEPTS, UNE SEULE LEÇON. Ville : KILDARE.

   🟥 POURQUOI CE FICHIER EXISTE — 16 août 2026, session 214.
   L'ancien `hype-lingo-lex-urgences.js` mélangeait les urgences DU
   CHEVAL et celles DU CAVALIER dans un seul chapitre de 42 mots,
   réparti sur quatre leçons entre Kildare et Édimbourg.
   Décision de Blandine : *« j'aurais séparé urgence vétérinaire et
   urgence médicale »*, puis *« refais un lexique séparé pour chaque,
   2 cours et deux villes suffiront, un cours dans chaque »*, puis
   *« Kildare va garder les urgences vét et Édimbourg celles
   médicales »*.
   ⚠️ L'AUTRE FICHIER EST `hype-lingo-lex-urgences-med.js` (Édimbourg).
   NE PAS refusionner les deux chapitres.

   🟥 UNE SEULE LEÇON, MALGRÉ LES 37 MOTS. Kildare en avait TROIS dans
   l'ancienne configuration, et c'est ce qui a fait perdre des mots à
   Blandine pendant son vol : *« bof non, c'est justement ce qui a fait
   que ça a foiré pendant mon vol »*. Elle n'a vu qu'une douzaine de
   mots là où la ville en portait 32.
   ⚠️ NE PAS redécouper ce chapitre en plusieurs leçons.
   ⚠️ Une PAUSE À MI-PARCOURS est prévue pour compenser la longueur —
   son idée, notée au SUIVI, PAS ENCORE CODÉE.

   🟥 LE CHAPITRE LE PLUS IMPORTANT DE L'APP, et le seul où une phrase
   mal apprise peut coûter cher. Les phrases sont COURTES et DIRECTES :
   on ne fait pas de politesse dans l'urgence. ⚠️ La reconnaissance
   vocale ne devrait rien sanctionner ici : quelqu'un qui répète une
   phrase d'urgence a besoin qu'elle soit juste, pas d'être noté.

   ═══ VINGT-TROIS MOTS SUR TRENTE-SEPT VIENNENT DE BLANDINE ═══
   Dictés le 16/08. Ce sont eux qui font la valeur du chapitre : les
   GESTES DE SOIN (piqûre IM/IV, sédatif, panier, désinfecter, bandage,
   compression, garrot, marcher, immobiliser, points de suture) et
   surtout LES SIGNES QU'ON OBSERVE (respire fort, se regarde les
   flancs, gratte le sol, veut se coucher, pouls rapide, se jette dans
   les murs, ne pose plus le pied, saigne énormément, fièvre, mouche,
   déglutit mal, bave, régurgite), plus deux affections que l'ancien
   fichier ignorait : LE BOUCHON ŒSOPHAGIEN et LE COUP DE SANG.
   ⚠️ L'ancien chapitre nommait les maladies mais ne donnait AUCUN moyen
   de décrire ce qu'on voit. On ne peut pas dire « colique » à un
   vétérinaire étranger si on ne sait pas dire « il gratte le sol ».

   ⚠️ RETIRÉ SUR SA DEMANDE : `clou-de-rue` — *« je sais pas ce que
   c'est, tu peux le retirer »*. NE PAS le remettre.
   ⚠️ GARDÉS EN DOUBLE, sur sa décision (*« il y a une subtilité quand
   même les deux fois, garde-les tous »*) : `plaie` / `coupure`,
   `boiter` / `boiterie`, `sang` / `saignement`. Ce ne sont pas des
   doublons : la plaie est ouverte, la coupure est nette ; boiter se
   voit, la boiterie se nomme au vétérinaire ; le sang se voit, le
   saignement continue.
   ⚠️ `le sang` est AUSSI dans le fichier médical, sur sa demande : un
   cheval qui saigne et un cavalier qui saigne, même mot, deux urgences.
   ⚠️ PARTIS À ÉDIMBOURG : `rester calme`, `le responsable de l'écurie`,
   `reculer`, `tenir le cheval`, `le danger`. `à l'aide` est dans les
   DEUX, il sert au cheval échappé.

   🟥 LE COUP DE SANG ET LA COLIQUE DEMANDENT DES GESTES OPPOSÉS.
   Colique : ON FAIT MARCHER. Coup de sang : ON IMMOBILISE.
   Deux urgences qui se ressemblent — un cheval qui va mal, qui
   transpire — et se tromper aggrave. C'est le point le plus important
   du chapitre. NE JAMAIS écrire qu'on fait marcher un coup de sang.

   ⚠️ RELECTURE NATIVE INDISPENSABLE. C'est le chapitre où une erreur
   de traduction est le plus grave. Les entrées marquées `// ??` sont
   celles dont Claude est le moins sûr — surtout les termes
   vétérinaires en espagnol et en italien.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["urgences-vet"] = {
  ref: "urgences-vet",
  chapitre: 9,
  titre: { fr:"Les urgences du cheval", en:"Equine emergencies", es:"Urgencias del caballo",
           it:"Le urgenze del cavallo", de:"Notfälle beim Pferd", ja:"馬の緊急事態" },
  lecons: 1,

  concepts: [

  /* ---------- appeler ---------- */

  { ref:"veterinaire", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le vétérinaire"}, en:{m:"the vet", p:"vètt"},
           es:{m:"el veterinario"}, it:{m:"il veterinario"},
           de:{m:"der Tierarzt", p:"tir-artst"}, ja:{m:"獣医", p:"jūi"},
           ar:{m:"الطبيب البيطري"} },
    def:{ fr:"⚠️ En anglais on dit **the vet**, jamais « the veterinary » — ce dernier est un adjectif. Et l'allemand dit *Tierarzt*, « médecin des animaux » : aucun rapport avec les autres langues, à apprendre tel quel.",
          en:"Always « the vet », never « the veterinary » — that's an adjective. German says *Tierarzt*, animal doctor.",
          es:"En inglés se dice « the vet ». El alemán dice *Tierarzt*, médico de animales.",
          it:"In inglese si dice « the vet ». Il tedesco dice *Tierarzt*, medico degli animali.",
          de:"Englisch sagt « the vet ». Das deutsche *Tierarzt* hat mit den anderen Sprachen nichts zu tun.",
          ja:"英語では the vet と略します。ドイツ語の Tierarzt は「動物の医師」という意味で、他の言語とは無関係です。",
          ar:"الرقم الذي يجب أن يكون محفوظا قبل الحاجة إليه. في حالة طارئة، لا وقت للبحث عنه." } },

  { ref:"aide", lecon:1, coll:"alerte",
    mots:{ fr:{m:"à l'aide !"}, en:{m:"help !", p:"hèlp"},
           es:{m:"¡ socorro !"}, it:{m:"aiuto !"},
           de:{m:"Hilfe !", p:"hil-fe"}, ja:{m:"助けて !", p:"tasukete"},
           ar:{m:"النجدة!"} },
    def:{ fr:"🟥 LE PREMIER MOT, celui qu'on crie avant d'expliquer. ⚠️ En espagnol on crie **¡socorro!**, pas « ¡ayuda!» : le second veut dire « aide » au sens général, le premier est l'appel au secours. Se dit aussi pour un cheval échappé — on alerte d'abord, on précise ensuite.",
          en:"The first word, shouted before you explain anything. Spanish shouts *¡socorro!*, not *¡ayuda!*.",
          es:"La primera palabra, la que se grita antes de explicar. ⚠️ « ¡ Socorro ! » y no « ¡ ayuda ! » : la segunda es la ayuda en general.",
          it:"La prima parola, quella che si grida prima di spiegare. In spagnolo si grida *¡socorro!*, non *¡ayuda!*.",
          de:"Das erste Wort, das man ruft, bevor man erklärt. Spanisch ruft *¡socorro!*, nicht *¡ayuda!*.",
          ja:"説明する前に叫ぶ、最初のひとこと。スペイン語では ¡ayuda! ではなく ¡socorro! と叫びます。",
          ar:"الكلمة الأولى، تلك التي تصرخ بها قبل أن تشرحي أي شيء. تعلميها في كل لغة تمرين بها." } },

  /* ---------- les affections ---------- */

  { ref:"colique", lecon:1, coll:"maladie",
    mots:{ fr:{m:"la colique"}, en:{m:"colic", p:"ko-lik"},
           es:{m:"el cólico"}, it:{m:"la colica"},
           de:{m:"die Kolik", p:"kô-lik"}, ja:{m:"疝痛", p:"sentsū"},
           ar:{m:"المغص"} },
    def:{ fr:"🟥 LA PREMIÈRE CAUSE DE MORTALITÉ du cheval, et le mot se reconnaît dans les six langues — le japonais excepté. ⚠️ L'anglais en fait un VERBE : *he's colicking*, qui n'a pas d'équivalent français. Un cheval ne peut pas vomir : ce qui bloque doit sortir de l'autre côté, ou il meurt. D'où l'urgence absolue.",
          en:"The leading cause of death in horses. English uses it as a verb: « he's colicking ». A horse cannot vomit — whatever blocks must pass through, or he dies.",
          es:"La primera causa de muerte del caballo. El caballo no puede vomitar: lo que obstruye debe pasar, o muere.",
          it:"La prima causa di morte del cavallo. Il cavallo non può vomitare: ciò che ostruisce deve passare, o muore.",
          de:"Die häufigste Todesursache beim Pferd. Ein Pferd kann nicht erbrechen — was blockiert, muss durch, sonst stirbt es.",
          ja:"馬の死因の第一位。馬は吐くことができないため、詰まったものは通り抜けるしかなく、さもなければ死に至ります。だからこそ絶対の緊急事態です。",
          ar:"السبب الأول للوفاة عند الخيل. ألم في البطن قد يكون بسيطا أو قاتلا، ولا شيء في المظهر الخارجي يفرق بينهما بشكل مؤكد. عند الشك، اتصلي بالطبيب البيطري فورا." } },

  { ref:"fourbure", lecon:1, coll:"maladie",
    mots:{ fr:{m:"la fourbure"}, en:{m:"laminitis", p:"la-mi-naï-tiss", var:"founder (US)"},
           es:{m:"la infosura"}, it:{m:"la laminite"},
           de:{m:"die Rehe", p:"ré-e", var:"Hufrehe"}, ja:{m:"蹄葉炎", p:"teiyōen"},
           ar:{m:"التهاب صفائح الحافر"} },
    def:{ fr:"🟥 AUCUN RAPPORT PHONÉTIQUE ENTRE LES SIX LANGUES : fourbure, laminitis, infosura, laminite, Rehe, 蹄葉炎. À apprendre par cœur, il n'y a rien à deviner. Le pied se décolle de l'intérieur, la douleur est extrême et le cheval se campe en arrière pour se soulager. ⚠️ Les Américains disent aussi *founder*.",
          en:"No two of the six languages sound alike here — nothing to guess, learn it. The hoof separates from the inside; the pain is extreme and the horse rocks back on his heels. Americans also say « founder ».",
          es:"Ninguna de las seis lenguas se parece. El casco se despega por dentro, el dolor es extremo y el caballo se echa atrás para aliviarse.",
          it:"Nessuna delle sei lingue si somiglia. Lo zoccolo si stacca dall'interno, il dolore è estremo e il cavallo si porta indietro per alleviarlo.",
          de:"Keine der sechs Sprachen klingt hier ähnlich. Der Huf löst sich von innen, der Schmerz ist extrem, und das Pferd stellt sich zur Entlastung zurück.",
          ja:"六つの言語がまったく似ていません。推測できないので覚えるしかありません。蹄が内側から剥がれ、激痛のために馬は後ろに体重を移して立ちます。",
          ar:"التهاب مؤلم جدا داخل الحافر. يقف الحصان واضعا ثقله على مؤخرته ليخفف عن قوائمه الأمامية. حالة طارئة: كل ساعة تأخير تترك أثرا." } },

  { ref:"bouchon-oesophagien", lecon:1, coll:"maladie",
    mots:{ fr:{m:"le bouchon œsophagien"}, en:{m:"choke", p:"tchôk", var:"oesophageal obstruction"},
           es:{m:"la obstrucción esofágica"}, it:{m:"l'ostruzione esofagea"}, // ?? it
           de:{m:"die Schlundverstopfung", p:"chlound-feur-chto-pfoung"}, ja:{m:"食道閉塞", p:"shokudō heisoku"},
           ar:{m:"انسداد المريء"} },
    def:{ fr:"⚠️ **En anglais on dit simplement CHOKE**, un mot de tous les jours — pas le terme savant. Le cheval ne s'étouffe pas pour autant : sa trachée reste libre, il respire. C'est l'œsophage qui est bouché, souvent par des granulés avalés trop vite. Il bave, il régurgite par les naseaux, il a du mal à déglutir.",
          en:"Just « choke » in English — an everyday word, not the technical one. The horse isn't suffocating: his windpipe is clear, he breathes. It's the oesophagus that's blocked, often by pellets bolted down too fast.",
          es:"En inglés se dice simplemente « choke ». El caballo no se asfixia: la tráquea sigue libre. Es el esófago el que está obstruido, a menudo por pienso comido demasiado rápido.",
          it:"In inglese si dice semplicemente « choke ». Il cavallo non si soffoca: la trachea resta libera. È l'esofago a essere ostruito, spesso da mangime ingerito troppo in fretta.",
          de:"Englisch sagt einfach « choke ». Das Pferd erstickt nicht: die Luftröhre ist frei. Verstopft ist die Speiseröhre, oft durch zu schnell geschlungenes Kraftfutter.",
          ja:"英語では専門用語ではなく choke という日常語を使います。馬が息を詰まらせているわけではありません。気道は通っていて呼吸はできます。詰まっているのは食道で、原因はたいてい飼料の早食いです。",
          ar:"طعام عالق في المريء. الحصان لا يختنق، لأن قصبته الهوائية تبقى مفتوحة، لكنه لا يستطيع البلع: يسيل لعابه، ويخرج الطعام من أنفه. لا تعطيه ماء ولا طعاما، واتصلي بالطبيب البيطري." } },

  { ref:"coup-de-sang", lecon:1, coll:"maladie",
    mots:{ fr:{m:"le coup de sang"}, en:{m:"tying-up", p:"taï-inng eup", var:"azoturia"},
           es:{m:"la mioglobinuria"}, it:{m:"la mioglobinuria"}, // ?? es it
           de:{m:"der Kreuzverschlag", p:"kroïts-feur-chlak"}, ja:{m:"筋硬直症", p:"kinkōchokushō"},
           ar:{m:"انحلال العضلات الناتج عن الجهد"} },
    def:{ fr:"🟥 À NE JAMAIS CONFONDRE AVEC LA COLIQUE, et c'est le point le plus important de ce chapitre. Les muscles se bloquent : le cheval refuse d'avancer, il est trempé de sueur, l'arrière-main est dure comme du bois. 🟥 **ON L'IMMOBILISE** — le contraire exact de la colique, où l'on fait marcher. Marcher un coup de sang détruit du muscle.",
          en:"Never confuse it with colic — the single most important point here. The muscles lock up: the horse refuses to move, he's soaked in sweat, his hindquarters are board-hard. YOU KEEP HIM STILL — the exact opposite of colic, where you walk him. Walking a tying-up horse destroys muscle.",
          es:"Nunca confundirlo con el cólico. Los músculos se bloquean: el caballo se niega a avanzar, está empapado, los cuartos traseros están duros. SE LE INMOVILIZA, al contrario del cólico.",
          it:"Non confonderlo mai con la colica. I muscoli si bloccano: il cavallo rifiuta di avanzare, è bagnato di sudore, il posteriore è duro. SI IMMOBILIZZA, il contrario della colica.",
          de:"Niemals mit einer Kolik verwechseln. Die Muskeln verkrampfen: das Pferd will nicht mehr gehen, ist schweißnass, die Hinterhand bretthart. MAN STELLT ES STILL — das genaue Gegenteil der Kolik.",
          ja:"疝痛と絶対に混同してはいけません。この章で最も重要な点です。筋肉が硬直し、馬は前に進むのを拒み、汗だくになり、後躯が板のように硬くなります。疝痛とは逆に、動かさず止めておきます。歩かせると筋肉が壊れます。",
          ar:"لا تخلطي بينه وبين المغص. في هذه الحالة تتضرر العضلات بعد الجهد: يرفض الحصان الحركة، ويتصبب عرقا، وتصبح عضلات الظهر والكفل قاسية ومؤلمة. أوقفي التمرين فورا، ولا تجبريه على المشي، واتصلي بالطبيب البيطري." } },

  { ref:"coup-chaleur", lecon:1, coll:"maladie",
    mots:{ fr:{m:"le coup de chaleur"}, en:{m:"heat stroke", p:"hite strôk"},
           es:{m:"el golpe de calor"}, it:{m:"il colpo di calore"},
           de:{m:"der Hitzschlag", p:"hitts-chlak"}, ja:{m:"熱中症", p:"necchūshō"},
           ar:{m:"ضربة الحر"} },
    def:{ fr:"Cinq langues sur six construisent l'image de la même façon : un « coup » ou un « coude » de chaleur. Le cheval souffle, il est abattu, sa peau reste chaude au repos. ⚠️ Arrose abondamment et sans attendre, à l'eau froide : en hyperthermie, refroidir vite prime sur tout le reste.",
          en:"Five of six languages build the same picture. The horse blows, is dull, his skin stays hot at rest. Hose the legs and neck, never the hindquarters straight off: cold shock closes the vessels and traps the heat.",
          es:"Cinco de seis lenguas construyen la misma imagen. Se le moja en los miembros y el cuello, nunca de golpe en la grupa.",
          it:"Cinque lingue su sei costruiscono la stessa immagine. Si bagna agli arti e al collo, mai di colpo sulla groppa.",
          de:"Fünf von sechs Sprachen bauen dasselbe Bild. Man kühlt Beine und Hals, nie schlagartig die Kruppe.",
          ja:"六言語のうち五つが同じ発想です。四肢と首から冷やします。いきなり尻にかけてはいけません。血管が締まり、熱が体内にこもります。",
          ar:"ارتفاع خطير في حرارة الجسم بعد جهد في الطقس الحار. يلهث الحصان، ويبدو منهكا، وتبقى حرارته مرتفعة بعد توقف الجهد. أوقفي العمل، وانقليه إلى الظل، وابدئي تبريده فورا بالماء البارد، واتصلي بالطبيب البيطري." } },

  /* ---------- boiter ---------- */

  { ref:"boiterie", lecon:1, coll:"membre",
    mots:{ fr:{m:"la boiterie"}, en:{m:"lameness", p:"léïm-nèss"},
           es:{m:"la cojera"}, it:{m:"la zoppia"},
           de:{m:"die Lahmheit", p:"lam-haïte"}, ja:{m:"跛行", p:"hakō"},
           ar:{m:"العرج"} },
    def:{ fr:"Le nom du trouble, celui qu'on donne au vétérinaire — par opposition à `boiter`, qui est ce qu'on voit. ⚠️ Blandine (16/08) : les deux se gardent, « il y a une subtilité quand même ». On dit « il boite » à un ami, « une boiterie du postérieur droit » à un vétérinaire.",
          en:"The name of the problem, what you tell the vet — as opposed to « to be lame », which is what you see.",
          es:"El nombre del trastorno, lo que se dice al veterinario, frente a « cojear », que es lo que se ve.",
          it:"Il nome del disturbo, quello che si dice al veterinario, contro « zoppicare », che è ciò che si vede.",
          de:"Der Name der Störung, was man dem Tierarzt sagt — im Gegensatz zu « lahm gehen », was man sieht.",
          ja:"獣医に伝えるときの病名。目で見てわかる「足を引く」に対して、こちらは診断名です。",
          ar:"اسم الاضطراب، وهو ما تقولينه للطبيب البيطري، بخلاف «يعرج» الذي هو ما ترينه." } },

  { ref:"boiter", lecon:1, coll:"membre",
    mots:{ fr:{m:"boiter"}, en:{m:"to be lame", p:"tou bi léïm"},
           es:{m:"cojear"}, it:{m:"zoppicare"},
           de:{m:"lahm gehen", p:"lam gué-eune"}, ja:{m:"足を引く", p:"ashi o hiku"},
           ar:{m:"يعرج"} },
    def:{ fr:"🟥 LE MOT QUE L'APP ANNONCE À L'ARRIVÉE DE KILDARE : « savoir dire il boite dans une autre langue peut changer une journée ». ⚠️ L'anglais n'a PAS de verbe : on ne dit pas « he limps » pour un cheval, on dit **he's lame** — un état, pas une action. « To limp » se dit d'un humain.",
          en:"English has no verb here: you don't say « he limps » of a horse, you say **he's lame** — a state, not an action. « To limp » is for people.",
          es:"El inglés no tiene verbo: se dice « he's lame », un estado, no una acción.",
          it:"L'inglese non ha un verbo: si dice « he's lame », uno stato, non un'azione.",
          de:"Englisch hat hier kein Verb: man sagt « he's lame », ein Zustand, keine Handlung.",
          ja:"英語には動詞がありません。馬には he limps ではなく he's lame と言います。動作ではなく状態です。limp は人間に使います。",
          ar:"الكلمة التي يعلنها هذا الفصل: أن تعرفي قول «إنه يعرج» بلغة أخرى قد يغير مجرى يوم كامل." } },

  { ref:"ne-pose-plus-le-pied", lecon:1, coll:"membre",
    mots:{ fr:{m:"il ne pose plus le pied à terre"}, en:{m:"he won't put his foot down", p:"pout hiz foute daoune"},
           es:{m:"no apoya el pie"}, it:{m:"non appoggia più il piede"},
           de:{m:"er setzt den Fuß nicht mehr auf", p:"zètsst dène fouss"}, ja:{m:"足を地面に着けない", p:"ashi o jimen ni tsukenai"},
           ar:{m:"لم يعد يضع قائمته على الأرض"} },
    def:{ fr:"🟥 LE DEGRÉ LE PLUS GRAVE de la boiterie, et ce qu'il faut savoir dire d'urgence : un cheval qui refuse totalement d'appuyer a une fracture, un abcès ou une fourbure aiguë. ⚠️ On ne le fait plus marcher du tout, on attend le vétérinaire sur place.",
          en:"The worst degree of lameness, and the thing to be able to say urgently: a horse who won't bear any weight has a fracture, an abscess or acute laminitis. Don't walk him at all — wait for the vet where he stands.",
          es:"El grado más grave de la cojera: un caballo que no apoya nada tiene una fractura, un absceso o una infosura aguda. No se le hace andar más.",
          it:"Il grado più grave della zoppia: un cavallo che non appoggia affatto ha una frattura, un ascesso o una laminite acuta. Non lo si fa più camminare.",
          de:"Der schwerste Grad der Lahmheit: ein Pferd, das gar nicht belastet, hat einen Bruch, einen Abszess oder eine akute Rehe. Nicht mehr führen.",
          ja:"跛行の最も重い段階。まったく体重をかけない馬は、骨折、蹄内の膿瘍、あるいは急性の蹄葉炎です。それ以上歩かせず、その場で獣医を待ちます。",
          ar:"أخطر درجات العرج، وما يجب أن تعرفي قوله فورا: قد يكون الحصان الذي يرفض تماما الاستناد على إحدى قوائمه مصابا بكسر أو خراج أو التهاب حاد في صفائح الحافر. لا تحاولي إجباره على المشي، وانتظري الطبيب البيطري في مكان آمن." } },

  { ref:"chaleur-membre", lecon:1, coll:"membre",
    mots:{ fr:{m:"la chaleur dans un membre"}, en:{m:"heat in a leg", p:"hite inn e lègue"},
           es:{m:"el calor en un miembro"}, it:{m:"il calore in un arto"},
           de:{m:"Wärme in einem Bein", p:"vèr-me"}, ja:{m:"脚の熱", p:"ashi no netsu"},
           ar:{m:"سخونة في إحدى القوائم"} },
    def:{ fr:"Ce qu'on cherche à la main, en comparant les quatre membres l'un après l'autre — c'est la comparaison qui renseigne, pas la température seule. Une chaleur localisée signale une inflammation sous la peau, souvent avant tout gonflement visible.",
          en:"What you feel for by hand, comparing all four legs one after another — it's the comparison that tells you, not the temperature itself. Local heat means inflammation, often before any visible swelling.",
          es:"Lo que se busca con la mano, comparando los cuatro miembros: es la comparación la que informa. El calor localizado indica inflamación, a menudo antes de que se vea hinchazón.",
          it:"Ciò che si cerca con la mano, confrontando i quattro arti: è il confronto che informa. Il calore localizzato indica infiammazione, spesso prima di ogni gonfiore visibile.",
          de:"Was man mit der Hand sucht, alle vier Beine im Vergleich — der Vergleich sagt es, nicht die Temperatur allein. Örtliche Wärme heißt Entzündung, oft vor jeder sichtbaren Schwellung.",
          ja:"手で確かめるもの。四肢を順に比べます。分かるのは比較からで、温度そのものではありません。部分的な熱は炎症の signe で、腫れが見える前に現れます。",
          ar:"ما تبحثين عنه باليد، بمقارنة القوائم الأربع واحدة بعد الأخرى. المقارنة هي التي تخبرك، لا الحرارة وحدها. قد تشير سخونة قائمة واحدة مقارنة بالقوائم الأخرى إلى وجود التهاب." } },

  { ref:"gonflement", lecon:1, coll:"membre",
    mots:{ fr:{m:"le gonflement"}, en:{m:"the swelling", p:"souè-linng"},
           es:{m:"la hinchazón"}, it:{m:"il gonfiore"},
           de:{m:"die Schwellung", p:"chvè-loung"}, ja:{m:"腫れ", p:"hare"},
           ar:{m:"الانتفاخ"} },
    def:{ fr:"⚠️ Un gonflement qui disparaît quand le cheval marche est bénin ; un gonflement chaud et douloureux qui reste est une urgence. C'est la différence que le vétérinaire cherche au téléphone — savoir la dire fait gagner du temps.",
          en:"Swelling that goes down as the horse walks is benign; hot, painful swelling that stays is an emergency. That's the difference the vet is after on the phone.",
          es:"Una hinchazón que desaparece al andar es benigna; una hinchazón caliente y dolorosa que permanece es una urgencia.",
          it:"Un gonfiore che scompare camminando è benigno; un gonfiore caldo e dolente che resta è un'urgenza.",
          de:"Eine Schwellung, die beim Gehen verschwindet, ist harmlos; eine warme, schmerzhafte, die bleibt, ist ein Notfall.",
          ja:"歩かせると引く腫れは軽いもの。熱く、痛みがあり、引かない腫れは緊急です。電話で獣医が知りたいのはこの違いです。",
          ar:"الانتفاخ الذي يخف عندما يمشي الحصان يكون غالبا أقل خطورة، أما الانتفاخ الحار والمؤلم الذي لا يزول فقد يكون حالة طارئة. هذا الفرق هو ما يهم الطبيب البيطري." } },

  /* ---------- la plaie ---------- */

  { ref:"plaie", lecon:1, coll:"plaie",
    mots:{ fr:{m:"la plaie"}, en:{m:"the wound", p:"ouound"},
           es:{m:"la herida"}, it:{m:"la ferita"},
           de:{m:"die Wunde", p:"voun-de"}, ja:{m:"傷", p:"kizu"},
           ar:{m:"الجرح"} },
    def:{ fr:"Toute blessure ouverte. ⚠️ L'anglais **wound** se prononce « ouound » — à ne pas confondre avec *wound* prononcé « waound », qui est le passé de *to wind*, enrouler. Deux mots identiques à l'écrit, deux prononciations, deux sens.",
          en:"Any open injury. Careful: « wound » the injury rhymes with « moon »; « wound » the past of « to wind » rhymes with « found ». Same spelling, two words.",
          es:"Cualquier lesión abierta. En inglés « wound » se pronuncia « uund » cuando es herida.",
          it:"Qualsiasi lesione aperta. In inglese « wound » si pronuncia « uund » quando è ferita.",
          de:"Jede offene Verletzung. Englisch « wound » (Wunde) klingt wie « uund ».",
          ja:"開いた傷全般。英語の wound は「ウーンド」と読みます。「ワウンド」と読むと wind（巻く）の過去形になり、別の語です。",
          ar:"كل إصابة مفتوحة." } },

  { ref:"coupure", lecon:1, coll:"plaie",
    mots:{ fr:{m:"la coupure"}, en:{m:"the cut", p:"keutt"},
           es:{m:"el corte"}, it:{m:"il taglio"},
           de:{m:"der Schnitt", p:"chnitt"}, ja:{m:"切り傷", p:"kirikizu"},
           ar:{m:"جرح قطعي"} },
    def:{ fr:"Une plaie nette, aux bords francs — celle qui se recoud le mieux. ⚠️ Blandine (16/08) a voulu garder `plaie` ET `coupure` : « il y a une subtilité quand même ». La distinction compte au téléphone : une coupure nette se suture, une plaie déchirée souvent non.",
          en:"A clean-edged wound — the kind that stitches best. The distinction matters on the phone: a clean cut can be sutured, a torn wound often can't.",
          es:"Una herida limpia, de bordes netos — la que mejor se sutura. La distinción cuenta por teléfono.",
          it:"Una ferita netta, dai bordi puliti — quella che si sutura meglio. La distinzione conta al telefono.",
          de:"Eine glattrandige Wunde — die, die sich am besten nähen lässt. Der Unterschied zählt am Telefon.",
          ja:"縁がきれいに切れた傷。縫合しやすいものです。電話ではこの区別が重要で、裂けた傷は縫えないことが多いのです。",
          ar:"جرح نظيف ذو حواف مستقيمة، وهو الأسهل في الخياطة." } },

  { ref:"saignement", lecon:1, coll:"plaie",
    mots:{ fr:{m:"le saignement"}, en:{m:"the bleeding", p:"blii-dinng"},
           es:{m:"el sangrado"}, it:{m:"il sanguinamento"},
           de:{m:"die Blutung", p:"blou-toung"}, ja:{m:"出血", p:"shukketsu"},
           ar:{m:"النزيف"} },
    def:{ fr:"Le fait que ça continue de couler — par opposition à `le sang`, qu'on voit. ⚠️ Un saignement qui pulse est artériel : c'est l'urgence dans l'urgence. Un cheval a environ cinquante litres de sang ; il peut en perdre quelques litres sans danger vital, mais pas indéfiniment.",
          en:"The fact that it keeps flowing — as opposed to « blood », which you see. A pulsing bleed is arterial: that's the emergency within the emergency. A horse holds about fifty litres.",
          es:"El hecho de que siga saliendo, frente a « sangre », que se ve. Un sangrado que late es arterial: la urgencia dentro de la urgencia.",
          it:"Il fatto che continui a uscire, contro « sangue », che si vede. Un sanguinamento pulsante è arterioso: l'urgenza nell'urgenza.",
          de:"Dass es weiterläuft — im Gegensatz zu « Blut », das man sieht. Eine pulsierende Blutung ist arteriell: der Notfall im Notfall.",
          ja:"流れ続けているという事実。目に見える「血」とは別の語です。脈打つ出血は動脈性で、緊急の中の緊急です。馬の血液量は約五十リットルです。",
          ar:"استمرار خروج الدم، بخلاف «الدم» الذي هو ما ترينه. نزيف نابض يعني شريانا مقطوعا: إنها الحالة الأشد في الحالة الطارئة." } },

  { ref:"sang", lecon:1, coll:"plaie",
    mots:{ fr:{m:"le sang"}, en:{m:"the blood", p:"bleudd"},
           es:{m:"la sangre"}, it:{m:"il sangue"},
           de:{m:"das Blut", p:"bloute"}, ja:{m:"血", p:"chi"},
           ar:{m:"الدم"} },
    def:{ fr:"⚠️ CE MOT EST DANS LES DEUX CHAPITRES D'URGENCE, sur décision de Blandine : un cheval qui saigne et un cavalier qui saigne, ce n'est pas la même urgence, mais c'est le même mot à savoir dire. ⚠️ L'anglais **blood** se prononce « bleudd », pas « blouud ».",
          en:"This word is in both emergency chapters. English « blood » rhymes with « mud », not with « food ».",
          es:"Esta palabra está en los dos capítulos de urgencias. El inglés « blood » se pronuncia « blad ».",
          it:"Questa parola è nei due capitoli d'urgenza. L'inglese « blood » si pronuncia « blad ».",
          de:"Dieses Wort steht in beiden Notfall-Kapiteln. Englisch « blood » klingt wie « blad ».",
          ja:"この語は緊急の二つの章の両方にあります。英語の blood は「ブラッド」で、「ブルード」ではありません。",
          ar:"هذه الكلمة موجودة في فصلي الطوارئ معا: حصان ينزف وفارسة تنزف ليسا الحالة نفسها." } },

  { ref:"saigne-enormement", lecon:1, coll:"plaie",
    mots:{ fr:{m:"la plaie saigne énormément"}, en:{m:"the wound is bleeding heavily", p:"hè-vi-li"},
           es:{m:"la herida sangra muchísimo"}, it:{m:"la ferita sanguina moltissimo"},
           de:{m:"die Wunde blutet stark", p:"blou-tète chtark"}, ja:{m:"傷から大量に出血している", p:"kizu kara tairyō ni shukketsu shite iru"},
           ar:{m:"الجرح ينزف بغزارة"} },
    def:{ fr:"La phrase qui décide de tout au téléphone : le vétérinaire n'organise pas sa route de la même façon selon la réponse. ⚠️ En anglais on dit **bleeding heavily**, pas « bleeding a lot » — c'est la formule des secours.",
          en:"The sentence that decides everything on the phone. Say « bleeding heavily », not « bleeding a lot » — that's the emergency-services wording.",
          es:"La frase que lo decide todo por teléfono: el veterinario no organiza igual su camino según la respuesta.",
          it:"La frase che decide tutto al telefono: il veterinario non organizza il percorso allo stesso modo.",
          de:"Der Satz, der am Telefon alles entscheidet. « Blutet stark » — so sagt es der Rettungsdienst.",
          ja:"電話ではこの一言が全てを決めます。答えによって獣医の動きが変わります。英語では bleeding a lot ではなく bleeding heavily と言います。",
          ar:"الجملة التي تحسم كل شيء على الهاتف: الطبيب البيطري لا ينظم طريقه بالطريقة نفسها حسب الجواب." } },

  /* ---------- les signes qu'on observe (mots de Blandine) ---------- */

  { ref:"respire-fort", lecon:1, coll:"signe",
    mots:{ fr:{m:"il respire fort"}, en:{m:"he's breathing heavily", p:"brii-zinng"},
           es:{m:"respira con dificultad"}, it:{m:"respira affannosamente"},
           de:{m:"er atmet schwer", p:"at-mète chvèr"}, ja:{m:"呼吸が荒い", p:"kokyū ga arai"},
           ar:{m:"يتنفس بسرعة وبقوة"} },
    def:{ fr:"Le premier signe qu'on entend avant de le voir. ⚠️ Au repos, un cheval adulte respire huit à quatorze fois par minute — on peut les compter en regardant les flancs. Au-delà de vingt au repos, il y a quelque chose.",
          en:"The first sign you hear before you see it. At rest a horse breathes twelve to sixteen times a minute — count the flanks. Over twenty at rest, something is wrong.",
          es:"El primer signo que se oye antes de verlo. En reposo, un caballo respira de doce a dieciséis veces por minuto.",
          it:"Il primo segno che si sente prima di vederlo. A riposo un cavallo respira dodici-sedici volte al minuto.",
          de:"Das erste Zeichen, das man hört, bevor man es sieht. In Ruhe atmet ein Pferd zwölf- bis sechzehnmal pro Minute.",
          ja:"見る前に聞こえる最初の兆候。安静時の馬の呼吸数は毎分十二〜十六回で、腹の動きで数えられます。二十回を超えたら何かあります。",
          ar:"أول علامة تسمع قبل أن ترى. في الراحة، يتنفس الحصان البالغ من ثماني إلى أربع عشرة مرة في الدقيقة، ويمكن عد مرات التنفس بمراقبة الخاصرتين." } },

  { ref:"regarde-flancs", lecon:1, coll:"signe",
    mots:{ fr:{m:"il se regarde les flancs"}, en:{m:"he keeps looking at his flanks", p:"flannks"},
           es:{m:"se mira los flancos"}, it:{m:"si guarda i fianchi"},
           de:{m:"er schaut sich nach der Flanke um", p:"flann-ke"}, ja:{m:"自分の腹を見る", p:"jibun no hara o miru"},
           ar:{m:"ينظر إلى خاصرتيه"} },
    def:{ fr:"🟥 LE SIGNE DE LA COLIQUE, celui qu'on reconnaît sans être vétérinaire : le cheval tourne la tête vers son ventre, parfois s'y mordille. Il montre où il a mal. ⚠️ C'est ce qu'il faut savoir dire en premier au téléphone — plus utile que le mot « colique » lui-même.",
          en:"The colic sign anyone can recognise: the horse turns his head to his belly, sometimes nips at it. He's showing you where it hurts. Say this first on the phone — more useful than the word « colic » itself.",
          es:"El signo del cólico que cualquiera reconoce: el caballo gira la cabeza hacia el vientre. Está mostrando dónde le duele.",
          it:"Il segno della colica che chiunque riconosce: il cavallo gira la testa verso il ventre. Sta mostrando dove ha male.",
          de:"Das Kolikzeichen, das jeder erkennt: das Pferd dreht den Kopf zum Bauch. Es zeigt, wo es weh tut.",
          ja:"獣医でなくても分かる疝痛の兆候。馬が頭を腹のほうに向け、ときには噛もうとします。痛む場所を示しているのです。電話ではまずこれを伝えます。",
          ar:"علامة المغص، تلك التي تعرف من دون أن تكوني طبيبة بيطرية: يدير الحصان رأسه نحو بطنه، وقد يعضه قليلا. إنه يشير إلى موضع ألمه." } },

  { ref:"gratte-le-sol", lecon:1, coll:"signe",
    mots:{ fr:{m:"il gratte le sol"}, en:{m:"he's pawing the ground", p:"po-inng"},
           es:{m:"escarba el suelo"}, it:{m:"raspa il terreno"},
           de:{m:"er scharrt", p:"charrt"}, ja:{m:"前足で地面を掻く", p:"maeashi de jimen o kaku"},
           ar:{m:"يحفر الأرض بقائمته"} },
    def:{ fr:"⚠️ L'anglais a un verbe pour ça : **to paw** — gratter du pied. Aucun équivalent français en un mot. Un cheval qui gratte peut être impatient ; un cheval qui gratte ET se regarde les flancs fait une colique.",
          en:"English has a verb for it: « to paw ». A horse that paws may just be impatient; a horse that paws AND looks at his flanks is colicking.",
          es:"El inglés tiene un verbo: « to paw ». Un caballo que escarba puede estar impaciente; si además se mira los flancos, es un cólico.",
          it:"L'inglese ha un verbo: « to paw ». Un cavallo che raspa può essere impaziente; se si guarda anche i fianchi, è colica.",
          de:"Englisch hat ein Verb dafür: « to paw ». Ein scharrendes Pferd kann ungeduldig sein; scharrt es UND schaut zur Flanke, ist es eine Kolik.",
          ja:"英語には to paw という専用の動詞があります。地面を掻くだけなら苛立ちかもしれませんが、腹も見ているなら疝痛です。",
          ar:"قد يحفر الحصان الأرض لأنه نافد الصبر. لكن إذا ترافق ذلك مع النظر إلى الخاصرتين أو الاستلقاء المتكرر، فقد يكون مصابا بالمغص." } },

  { ref:"veut-se-coucher", lecon:1, coll:"signe",
    mots:{ fr:{m:"il est couché ou veut se coucher"}, en:{m:"he's down or wants to lie down", p:"laï daoune"},
           es:{m:"está echado o quiere echarse"}, it:{m:"è coricato o vuole coricarsi"},
           de:{m:"er liegt oder will sich hinlegen", p:"hinn-lé-gueune"}, ja:{m:"横になっている、または横になろうとする", p:"yoko ni natte iru"},
           ar:{m:"مستلق أو يريد أن يستلقي"} },
    def:{ fr:"⚠️ Un cheval sain dort debout ou couché brièvement. Un cheval qui se couche, se relève, se recouche est en colique. 🟥 **HE'S DOWN** est le mot d'urgence en anglais : dire « the horse is down » suffit à faire venir, on n'ajoute rien.",
          en:"A healthy horse sleeps standing or lies down briefly. One that lies down, gets up, lies down again is colicking. « The horse is down » is enough to bring help — you don't need to add anything.",
          es:"Un caballo sano duerme de pie o se echa brevemente. Uno que se echa, se levanta y se vuelve a echar tiene un cólico.",
          it:"Un cavallo sano dorme in piedi o si corica brevemente. Uno che si corica, si alza e si ricorica ha una colica.",
          de:"Ein gesundes Pferd schläft stehend oder liegt kurz. Eines, das sich hinlegt, aufsteht und wieder hinlegt, hat eine Kolik.",
          ja:"健康な馬は立って眠るか、短時間だけ横になります。寝て、起きて、また寝る馬は疝痛です。英語の he's down は、それだけで助けを呼べる緊急語です。",
          ar:"الحصان السليم ينام واقفا أو مستلقيا لفترة قصيرة. أما الحصان الذي يستلقي ثم ينهض ثم يستلقي من جديد فقد يكون مصابا بالمغص." } },

  { ref:"pouls-rapide", lecon:1, coll:"signe",
    mots:{ fr:{m:"le pouls est trop rapide"}, en:{m:"his pulse is too fast", p:"peulss"},
           es:{m:"el pulso es demasiado rápido"}, it:{m:"il polso è troppo veloce"},
           de:{m:"der Puls ist zu schnell", p:"poulss"}, ja:{m:"脈が速すぎる", p:"myaku ga hayasugiru" },
           ar:{m:"نبضه سريع جدا"} },
    def:{ fr:"🟥 LE CHIFFRE QUI DIT LA GRAVITÉ. Au repos, un cheval adulte bat entre trente et quarante fois par minute. Au-delà de soixante au repos, la douleur est sévère ; au-delà de quatre-vingts, c'est critique. ⚠️ On le prend sous la ganache, à l'artère, ou avec l'oreille au coude gauche.",
          en:"The number that tells you how bad it is. At rest a horse's heart beats twenty-eight to forty times a minute. Over sixty at rest means severe pain; over eighty is critical. Take it under the jaw, or with your ear behind the left elbow.",
          es:"La cifra que dice la gravedad. En reposo, entre veintiocho y cuarenta por minuto. Más de sesenta indica dolor severo.",
          it:"Il numero che dice la gravità. A riposo, tra ventotto e quaranta al minuto. Oltre sessanta, dolore severo.",
          de:"Die Zahl, die den Ernst zeigt. In Ruhe schlägt das Herz achtundzwanzig- bis vierzigmal pro Minute. Über sechzig heißt starke Schmerzen.",
          ja:"重症度を示す数字。安静時の心拍は毎分二十八〜四十回。安静時に六十を超えれば強い痛み、八十を超えれば危機的です。下顎の動脈、または左肘の後ろに耳を当てて測ります。",
          ar:"الرقم الذي يدل على الخطورة. في الراحة، ينبض قلب الحصان البالغ بين ثلاثين وأربعين مرة في الدقيقة. فوق الستين في الراحة يكون الألم شديدا." } },

  { ref:"se-jette-dans-les-murs", lecon:1, coll:"signe",
    mots:{ fr:{m:"il se jette dans les murs"}, en:{m:"he's throwing himself against the walls", p:"zrô-inng"},
           es:{m:"se lanza contra las paredes"}, it:{m:"si getta contro i muri"},
           de:{m:"er wirft sich gegen die Wände", p:"virft zich"}, ja:{m:"壁に体をぶつける", p:"kabe ni karada o butsukeru" },
           ar:{m:"يرتطم بالجدران"} },
    def:{ fr:"🟥 LE SIGNE LE PLUS GRAVE, et le plus dangereux pour l'humain. Un cheval qui se jette dans les murs a une douleur qu'il ne contrôle plus : il ne voit plus qui est autour. ⚠️ **ON NE RENTRE PAS DANS LE BOX.** On appelle, et on attend le vétérinaire depuis la porte.",
          en:"The worst sign, and the most dangerous for the human. A horse throwing himself at the walls is in pain he can no longer control: he doesn't see who's around him. DON'T GO INTO THE STABLE. Call, and wait for the vet from the doorway.",
          es:"El signo más grave, y el más peligroso para la persona. NO SE ENTRA EN EL BOX: se llama y se espera al veterinario desde la puerta.",
          it:"Il segno più grave, e il più pericoloso per l'uomo. NON SI ENTRA NEL BOX: si chiama e si aspetta il veterinario dalla porta.",
          de:"Das schwerste Zeichen, und für den Menschen das gefährlichste. NICHT IN DIE BOX GEHEN: anrufen und von der Tür aus warten.",
          ja:"最も重く、人間にとって最も危険な兆候。壁に身を投げる馬は痛みを制御できず、周囲が見えていません。馬房に入ってはいけません。電話をして、扉の外から獣医を待ちます。",
          ar:"أخطر العلامات، وأشدها خطرا على الإنسان. حصان يرتطم بالجدران يعاني ألما لم يعد يتحكم فيه: لم يعد يراك. لا تدخلي إلى الحجرة، واتصلي فورا." } },

  { ref:"fievre", lecon:1, coll:"signe",
    mots:{ fr:{m:"il a de la fièvre"}, en:{m:"he's got a temperature", p:"tèm-pri-tcheur", var:"a fever"},
           es:{m:"tiene fiebre"}, it:{m:"ha la febbre"},
           de:{m:"er hat Fieber", p:"fii-beur"}, ja:{m:"熱がある", p:"netsu ga aru" },
           ar:{m:"لديه حمى"} },
    def:{ fr:"⚠️ EN ANGLAIS ON DIT **a temperature**, pas « a fever » : *has he got a temperature ?* veut dire « a-t-il de la fièvre ? ». Dire « a fever » se comprend mais sonne médical. La normale du cheval adulte au repos est de 37,2 à 38,2 °C — au-delà de 39, c'est de la fièvre.",
          en:"British riders say « a temperature », not « a fever ». Normal for a horse is 37.5 to 38.5 °C; over 39 is a temperature.",
          es:"En inglés se dice « a temperature ». Lo normal en el caballo es 37,5-38,5 °C.",
          it:"In inglese si dice « a temperature ». Il normale del cavallo è 37,5-38,5 °C.",
          de:"Englisch sagt « a temperature ». Normal beim Pferd sind 37,5 bis 38,5 °C.",
          ja:"英語では a fever ではなく a temperature と言います。馬の平熱は三十七度二分〜三十八度二分。三十九度を超えると発熱です。",
          ar:"يقاس بمقياس حرارة شرجي. القيمة الطبيعية عند الحصان البالغ في الراحة بين 37.2 و38.2 درجة مئوية." } },

  { ref:"mouche", lecon:1, coll:"signe",
    mots:{ fr:{m:"il mouche du nez"}, en:{m:"he's got a nasal discharge", p:"né-zeul diss-tchardj", var:"his nose is running"},
           es:{m:"tiene secreción nasal"}, it:{m:"ha secrezione nasale"},
           de:{m:"er hat Nasenausfluss", p:"na-zeune-aouss-flouss"}, ja:{m:"鼻水が出ている", p:"hanamizu ga dete iru" },
           ar:{m:"يسيل من أنفه"} },
    def:{ fr:"⚠️ « Moucher » au sens équestre n'a PAS d'équivalent simple en anglais : on dit *a nasal discharge*, qui est un terme vétérinaire, ou *his nose is running* dans la langue courante. La couleur renseigne : clair peut être bénin, jaune ou vert signale une infection, et des aliments dans le jetage indiquent un bouchon.",
          en:"The French « moucher » has no simple English match: « a nasal discharge » is the vet's word, « his nose is running » the everyday one. Colour matters: clear may be harmless, yellow or green means infection, feed in it means choke.",
          es:"El color informa: claro puede ser benigno, amarillo o verde indica infección, y restos de comida indican obstrucción esofágica.",
          it:"Il colore informa: chiaro può essere benigno, giallo o verde indica infezione, residui di cibo indicano ostruzione esofagea.",
          de:"Die Farbe sagt viel: klar kann harmlos sein, gelb oder grün heißt Infektion, Futter darin heißt Schlundverstopfung.",
          ja:"色が手がかりです。透明なら軽いこともありますが、黄や緑は感染、飼料が混じっていれば食道閉塞です。",
          ar:"سائل يخرج من المنخرين. سائل شفاف قد لا يعني شيئا، أما سائل أصفر أو أخضر أو مختلط بالطعام فهو علامة." } },

  { ref:"mal-a-degluter", lecon:1, coll:"signe",
    mots:{ fr:{m:"il a du mal à déglutir"}, en:{m:"he's struggling to swallow", p:"soua-lô"},
           es:{m:"le cuesta tragar"}, it:{m:"fa fatica a inghiottire"},
           de:{m:"er kann schlecht schlucken", p:"chlou-keune"}, ja:{m:"飲み込みにくそうにしている", p:"nomikominikusō ni shite iru" },
           ar:{m:"يجد صعوبة في البلع"} },
    def:{ fr:"⚠️ L'anglais **to swallow** se prononce « soua-lô », le w est muet. Avec la bave et le jetage d'aliments, c'est le tableau du bouchon œsophagien. Un cheval qui ne peut plus déglutir ne peut plus boire : la déshydratation vient vite.",
          en:"Together with drooling and feed coming down the nose, this is the picture of choke. A horse that can't swallow can't drink: dehydration comes fast.",
          es:"Con la babeo y la comida por la nariz, es el cuadro de la obstrucción esofágica. Un caballo que no traga no bebe.",
          it:"Con la bava e il cibo dal naso, è il quadro dell'ostruzione esofagea. Un cavallo che non inghiotte non beve.",
          de:"Mit Speicheln und Futter aus der Nase ist das das Bild einer Schlundverstopfung. Ein Pferd, das nicht schlucken kann, kann nicht trinken.",
          ja:"よだれと鼻からの飼料と合わせて、食道閉塞の典型的な症状です。飲み込めない馬は水も飲めず、脱水が急速に進みます。",
          ar:"مع اللعاب وخروج الطعام من الأنف، هذه صورة انسداد المريء. حصان لا يستطيع البلع لا يجب أن يعطى ماء." } },

  { ref:"bave", lecon:1, coll:"signe",
    mots:{ fr:{m:"il bave beaucoup"}, en:{m:"he's drooling", p:"drou-linng"},
           es:{m:"babea mucho"}, it:{m:"sbava molto"},
           de:{m:"er speichelt stark", p:"chpaï-chèlt"}, ja:{m:"よだれが多い", p:"yodare ga ōi" },
           ar:{m:"يسيل لعابه بغزارة"} },
    def:{ fr:"Le signe qui distingue le bouchon œsophagien : le cheval ne peut plus avaler sa propre salive, alors elle coule. ⚠️ L'anglais courant dit **drooling** ; *hypersalivation* est le mot du vétérinaire.",
          en:"The sign that marks out choke: the horse can no longer swallow his own saliva, so it runs out. Everyday English is « drooling »; « hypersalivation » is the vet's word.",
          es:"El signo que distingue la obstrucción esofágica: el caballo ya no puede tragar su propia saliva.",
          it:"Il segno che distingue l'ostruzione esofagea: il cavallo non riesce più a inghiottire la propria saliva.",
          de:"Das Zeichen, das die Schlundverstopfung verrät: das Pferd kann seinen eigenen Speichel nicht mehr schlucken.",
          ja:"食道閉塞を見分ける兆候。自分の唾液さえ飲み込めず、口から流れ出します。",
          ar:"العلامة التي تميز انسداد المريء: لم يعد الحصان قادرا على بلع لعابه، فيسيل." } },

  { ref:"regurgite", lecon:1, coll:"signe",
    mots:{ fr:{m:"il régurgite"}, en:{m:"there's feed coming back down his nose", p:"fiide", var:"nasal reflux"},
           es:{m:"regurgita por la nariz"}, it:{m:"rigurgita dal naso"},
           de:{m:"es kommt Futter aus der Nase", p:"fou-teur"}, ja:{m:"鼻から吐き戻す", p:"hana kara hakimodosu" },
           ar:{m:"يخرج الطعام من أنفه"} },
    def:{ fr:"🟥 CHEZ LE CHEVAL, ÇA SORT PAR LES NASEAUX, jamais par la bouche : il ne peut pas vomir. Voir de l'herbe ou des granulés au bout du nez est un signe propre à l'espèce, et il désigne presque toujours le bouchon œsophagien. ⚠️ L'anglais n'a pas de mot simple : on décrit ce qu'on voit.",
          en:"In a horse it comes out of the NOSTRILS, never the mouth — he cannot vomit. Seeing grass or pellets at the nose is a species-specific sign, and it almost always means choke. English has no single word: you describe what you see.",
          es:"En el caballo sale por los ollares, nunca por la boca: no puede vomitar. Ver hierba o pienso en la nariz indica casi siempre obstrucción esofágica.",
          it:"Nel cavallo esce dalle narici, mai dalla bocca: non può vomitare. Vedere erba o mangime al naso indica quasi sempre ostruzione esofagea.",
          de:"Beim Pferd kommt es aus den NÜSTERN, nie aus dem Maul — es kann nicht erbrechen. Gras oder Pellets an der Nase heißt fast immer Schlundverstopfung.",
          ja:"馬では口ではなく鼻から出ます。馬は吐けないからです。鼻先に草やペレットが見えるのは馬特有の兆候で、ほぼ必ず食道閉塞を意味します。",
          ar:"عند الحصان، يخرج الطعام من المنخرين لا من الفم: فهو لا يستطيع التقيؤ. رؤية عشب أو حبيبات عند طرف الأنف علامة على انسداد المريء." } },

  /* ---------- les gestes (mots de Blandine) ---------- */

  { ref:"marcher-cheval", lecon:1, coll:"geste",
    mots:{ fr:{m:"marcher un cheval pour éviter qu'il se roule"}, en:{m:"to walk him so he doesn't roll", p:"rôl"},
           es:{m:"pasear al caballo para que no se revuelque"}, it:{m:"far camminare il cavallo perché non si rotoli"},
           de:{m:"das Pferd führen, damit es sich nicht wälzt", p:"vèltst"}, ja:{m:"転がらないように馬を歩かせる", p:"korogaranai yō ni uma o arukaseru" },
           ar:{m:"تمشية الحصان بهدوء عند الاشتباه بالمغص"} },
    def:{ fr:"🟥 LE GESTE DE LA COLIQUE. ⚠️ Marcher peut soulager certains chevaux, mais ne force jamais et ne l'épuise pas : un cheval calme peut rester couché dans un endroit sûr. S'il se roule violemment, écarte-toi et appelle. ⚠️ **UNIQUEMENT POUR LA COLIQUE.** Un coup de sang, on l'immobilise — voir `immobiliser`. Se tromper aggrave.",
          en:"The colic move, and why: a horse that rolls can twist his gut, turning a treatable colic into surgery. FOR COLIC ONLY. A tying-up horse must be kept still — see « to keep him still ».",
          es:"El gesto del cólico: un caballo que se revuelca puede torcerse el intestino. SOLO PARA EL CÓLICO.",
          it:"Il gesto della colica: un cavallo che si rotola può torcersi l'intestino. SOLO PER LA COLICA.",
          de:"Der Kolik-Handgriff: ein Pferd, das sich wälzt, kann den Darm verdrehen. NUR BEI KOLIK.",
          ja:"疝痛のときの対処。転がると腸がねじれ、手術が必要な状態になりかねません。疝痛のときだけです。筋硬直症では逆に動かさず止めておきます。",
          ar:"قد تساعد التمشية الهادئة بعض الخيول المصابة بالمغص إذا كانت آمنة وتخفف انزعاجها. لكن لا تجبري الحصان على المشي، ولا تمشيه حتى الإرهاق. إذا أراد الاستلقاء بهدوء في مكان آمن، فيمكن تركه. أما إذا كان يتمرغ بعنف، فابتعدي حفاظا على سلامتك واتصلي بالطبيب البيطري فورا." } },

  { ref:"immobiliser", lecon:1, coll:"geste",
    mots:{ fr:{m:"immobiliser le cheval"}, en:{m:"to keep him still", p:"kiipe himm stil"},
           es:{m:"inmovilizar al caballo"}, it:{m:"immobilizzare il cavallo"},
           de:{m:"das Pferd ruhig stellen", p:"rou-ich chtè-leune"}, ja:{m:"馬を動かさない", p:"uma o ugokasanai" },
           ar:{m:"تثبيت الحصان في مكانه"} },
    def:{ fr:"🟥 LE GESTE DU COUP DE SANG, et l'inverse exact de la colique. Chaque pas détruit du muscle : on ne le ramène pas à l'écurie, on le laisse où il est et on fait venir le vétérinaire sur place. ⚠️ L'anglais dit **keep him still**, pas « immobilise him » — ce dernier évoque une contention forcée.",
          en:"The tying-up move, the exact opposite of colic. Every step destroys muscle: don't walk him home, leave him where he is and get the vet to him. Say « keep him still », not « immobilise him ».",
          es:"El gesto del coup de sang, lo contrario del cólico. Cada paso destruye músculo: no se le lleva a la cuadra, se le deja donde está.",
          it:"Il gesto del colpo di sangue, il contrario della colica. Ogni passo distrugge muscolo: non lo si riporta in scuderia.",
          de:"Der Handgriff beim Kreuzverschlag, das Gegenteil der Kolik. Jeder Schritt zerstört Muskel: nicht nach Hause führen.",
          ja:"筋硬直症のときの対処で、疝痛とは正反対です。一歩ごとに筋肉が壊れるため、厩舎に連れ帰らず、その場に留めて獣医を呼びます。",
          ar:"يستخدم هذا الإجراء عند الاشتباه بانحلال العضلات الناتج عن الجهد. أوقفي التمرين فورا، ولا تجبري الحصان على مواصلة المشي. ضعيه في مكان آمن ومريح إذا أمكن ذلك من دون إجباره على الحركة، ووفري له الماء، واتصلي بالطبيب البيطري." } },

  { ref:"panier", lecon:1, coll:"geste",
    mots:{ fr:{m:"mettre un panier"}, en:{m:"to put a muzzle on", p:"meu-zeul"},
           es:{m:"ponerle un bozal"}, it:{m:"mettere la museruola"},
           de:{m:"einen Fresskorb anlegen", p:"frèss-korb"}, ja:{m:"口かごをつける", p:"kuchikago o tsukeru" },
           ar:{m:"وضع كمامة"} },
    def:{ fr:"⚠️ EN ANGLAIS C'EST **A MUZZLE** — le même mot que la muselière d'un chien, ce qui surprend souvent. On le met pour empêcher un cheval en colique de manger, ou un cheval au pré de trop se remplir. L'allemand est plus précis : *Fresskorb*, « panier à manger ».",
          en:"« A muzzle » — the same word as a dog's muzzle, which often surprises. You put one on to stop a colicking horse eating, or a grass-fat horse gorging. German is more precise: Fresskorb, « eating basket ».",
          es:"« Bozal », la misma palabra que para un perro. Se pone para impedir que un caballo con cólico coma.",
          it:"« Museruola », la stessa parola che per un cane. Si mette per impedire a un cavallo con colica di mangiare.",
          de:"Der deutsche Fresskorb ist genauer als das englische « muzzle », das auch den Maulkorb des Hundes meint.",
          ja:"英語では犬の口輪と同じ muzzle という語を使うので驚かれます。疝痛の馬に食べさせないため、または放牧地で食べすぎる馬のために付けます。",
          ar:"توضع لمنع حصان مصاب بالمغص من الأكل قبل وصول الطبيب البيطري." } },

  { ref:"desinfecter", lecon:1, coll:"geste",
    mots:{ fr:{m:"désinfecter une plaie"}, en:{m:"to clean the wound", p:"kliine", var:"to disinfect"},
           es:{m:"desinfectar una herida"}, it:{m:"disinfettare una ferita"},
           de:{m:"eine Wunde desinfizieren", p:"dèss-inn-fi-tsii-reune"}, ja:{m:"傷を消毒する", p:"kizu o shōdoku suru" },
           ar:{m:"تطهير الجرح"} },
    def:{ fr:"⚠️ L'anglais courant dit **to clean the wound** plutôt que « to disinfect » — le second est du vocabulaire d'hôpital. On lave à l'eau claire abondante avant tout produit : ce qui compte d'abord, c'est de retirer la terre.",
          en:"Everyday English says « clean the wound » rather than « disinfect » — the latter is hospital language. Rinse with plenty of clean water before any product: getting the dirt out is what matters first.",
          es:"Se lava con agua abundante antes de cualquier producto: lo primero es quitar la tierra.",
          it:"Si lava con acqua abbondante prima di ogni prodotto: la prima cosa è togliere la terra.",
          de:"Erst mit viel klarem Wasser spülen, vor jedem Mittel: zuerst muss der Schmutz raus.",
          ja:"英語では disinfect よりも clean the wound と言うのが普通です。薬より先に、たっぷりの清水で土を洗い流すことが大切です。",
          ar:"يغسل الجرح بماء نظيف وبكمية وافرة قبل أي شيء آخر." } },

  { ref:"bandage", lecon:1, coll:"geste",
    mots:{ fr:{m:"mettre un bandage"}, en:{m:"to put a bandage on", p:"bann-didj"},
           es:{m:"poner un vendaje"}, it:{m:"mettere una fasciatura"},
           de:{m:"einen Verband anlegen", p:"feur-bannt"}, ja:{m:"包帯を巻く", p:"hōtai o maku" },
           ar:{m:"وضع ضماد"} },
    def:{ fr:"⚠️ NE PAS CONFONDRE avec les bandes de travail (`bandes`, chapitre du matériel) : celles-là protègent, celui-ci soigne. Un bandage trop serré coupe la circulation et fait plus de mal que pas de bandage du tout — c'est l'erreur la plus fréquente.",
          en:"Not to be confused with exercise bandages: those protect, this one treats. A bandage put on too tight cuts the circulation and does more harm than none at all — the commonest mistake.",
          es:"No confundir con las vendas de trabajo: aquéllas protegen, éste cura. Un vendaje demasiado apretado corta la circulación.",
          it:"Non confondere con le fasce da lavoro: quelle proteggono, questa cura. Una fasciatura troppo stretta taglia la circolazione.",
          de:"Nicht mit Arbeitsbandagen verwechseln: die schützen, dieser behandelt. Zu fest angelegt schneidet er die Blutzufuhr ab.",
          ja:"運動用バンテージとは別物です。あちらは保護、こちらは治療。締めすぎると血流を止め、巻かないより有害になります。最もよくある誤りです。",
          ar:"لا يخلط بينه وبين رباطات العمل: تلك تحمي، وهذا يعالج. ضماد مشدود أكثر من اللازم يقطع الدورة الدموية." } },

  { ref:"compression", lecon:1, coll:"geste",
    mots:{ fr:{m:"faire une compression sur une plaie"}, en:{m:"to keep pressure on the wound", p:"prè-cheur"},
           es:{m:"hacer compresión sobre la herida"}, it:{m:"fare compressione sulla ferita"},
           de:{m:"Druck auf die Wunde halten", p:"drouk"}, ja:{m:"傷を圧迫する", p:"kizu o appaku suru" },
           ar:{m:"الضغط على الجرح"} },
    def:{ fr:"🟥 LE MOT IMPORTANT EST **MAINTENIR** : une compression qu'on relâche toutes les dix secondes pour regarder ne sert à rien. On appuie fort, on ne bouge plus, on attend. ⚠️ L'anglais dit **keep pressure on**, qui porte justement ce maintien.",
          en:"The key word is KEEP: pressure you release every ten seconds to have a look does nothing. Press hard, don't move, wait. « Keep pressure on » says exactly that.",
          es:"La palabra clave es MANTENER: una compresión que se suelta cada diez segundos no sirve de nada.",
          it:"La parola chiave è MANTENERE: una compressione che si allenta ogni dieci secondi non serve a niente.",
          de:"Das Schlüsselwort ist HALTEN: Druck, den man alle zehn Sekunden löst, um nachzusehen, hilft nicht.",
          ja:"大切なのは「保つ」こと。十秒ごとに離して確認するような圧迫では意味がありません。強く押さえ、動かさず、待ちます。",
          ar:"المهم هو استمرار الضغط: فالضغط الذي يرفع كل عشر ثوان لفحص الجرح لا يفيد. اضغطي على الضماد بثبات، ولا ترفعيه باستمرار للنظر." } },

  { ref:"garrot-lien", lecon:1, coll:"geste",
    mots:{ fr:{m:"mettre un garrot"}, en:{m:"to put a tourniquet on", p:"tour-ni-kètt"},
           es:{m:"poner un torniquete"}, it:{m:"mettere un laccio emostatico"},
           de:{m:"eine Aderpresse anlegen", p:"a-deur-prè-sse"}, ja:{m:"止血帯を巻く", p:"shiketsutai o maku" },
           ar:{m:"وضع رباط ضاغط"} },
    def:{ fr:"🟥 PIÈGE DE LANGUE : **GARROT** a deux sens sans rapport en français — la partie du corps entre l'encolure et le dos (*the withers*, chapitre du matériel) et le lien qui comprime (*a tourniquet*). Deux mots totalement différents en anglais, un seul en français. ⚠️ Sur un cheval, c'est un geste de dernier recours : mal posé, il fait perdre le membre.",
          en:"A French trap: « garrot » means both the withers and a tourniquet — two unrelated words in English, one in French. On a horse it's a last resort: badly applied, it costs the leg.",
          es:"Trampa del francés: « garrot » significa a la vez la cruz y el torniquete. En el caballo es un último recurso.",
          it:"Trappola del francese: « garrot » indica sia il garrese sia il laccio emostatico. Sul cavallo è l'ultima risorsa.",
          de:"Falle im Französischen: « garrot » heißt sowohl Widerrist als auch Aderpresse. Beim Pferd ist sie das letzte Mittel.",
          ja:"フランス語の罠：garrot は「鬐甲」と「止血帯」の両方を意味します。英語では全く別の語です。馬では最後の手段で、誤ると脚を失います。",
          ar:"الرباط الضاغط إجراء استثنائي لنزيف يهدد الحياة، وقد يسبب أضرارا خطيرة أو فقدان الطرف إذا استخدم بطريقة خاطئة. لا تضعيه إلا بتوجيه مباشر من طبيب بيطري، وسجلي وقت وضعه بدقة." } },

  { ref:"piqure-im-iv", lecon:1, coll:"geste",
    mots:{ fr:{m:"faire une piqûre en IM ou en IV"}, en:{m:"to give an injection, IM or IV", p:"inn-djèk-cheune"},
           es:{m:"poner una inyección, IM o IV"}, it:{m:"fare un'iniezione, IM o EV"},
           de:{m:"eine Spritze geben, i.m. oder i.v.", p:"chpritt-se"}, ja:{m:"筋肉注射または静脈注射をする", p:"kinniku chūsha" },
           ar:{m:"حقنة عضلية أو وريدية"} },
    def:{ fr:"⚠️ LES ABRÉVIATIONS CHANGENT DE LANGUE. Le français et l'anglais disent **IM** et **IV**, l'italien **IM** et **EV** (endovenosa), l'allemand écrit *i.m.* et *i.v.* en minuscules, et le japonais n'abrège pas du tout : 筋肉注射 et 静脈注射, en mots entiers. L'intramusculaire se fait dans l'encolure ou la fesse ; l'intraveineuse dans la jugulaire, et elle demande de l'expérience.",
          en:"The abbreviations differ by language: Italian says EV not IV, Japanese doesn't abbreviate at all. Intramuscular goes into the neck or rump; intravenous into the jugular, and that takes experience.",
          es:"Las abreviaturas cambian según la lengua: el italiano dice EV, el japonés no abrevia. La intramuscular va en el cuello; la intravenosa en la yugular.",
          it:"In italiano si dice EV, non IV. L'intramuscolare va nel collo; l'endovenosa in giugulare, e richiede esperienza.",
          de:"Die Abkürzungen unterscheiden sich: Italienisch sagt EV, Japanisch kürzt nicht ab. Intramuskulär in den Hals, intravenös in die Jugularvene.",
          ja:"略語は言語ごとに異なります。イタリア語は EV、日本語は略さず「筋肉注射」「静脈注射」と言います。筋肉注射は首か尻に、静脈注射は頸静脈に行い、経験が必要です。",
          ar:"الحقنة العضلية تعطى في العضل، والوريدية في الوريد. لا تعطى أي حقنة من دون تعليمات الطبيب البيطري." } },

  { ref:"sedatif", lecon:1, coll:"geste",
    mots:{ fr:{m:"donner un sédatif"}, en:{m:"to give a sedative", p:"sè-de-tive"},
           es:{m:"dar un sedante"}, it:{m:"dare un sedativo"},
           de:{m:"ein Beruhigungsmittel geben", p:"be-rou-i-goungs-mi-teul"}, ja:{m:"鎮静剤を与える", p:"chinseizai o ataeru" },
           ar:{m:"إعطاء مهدئ"} },
    def:{ fr:"🟥 JAMAIS SANS AVIS VÉTÉRINAIRE, et le dialogue de ce chapitre le dit explicitement. Un sédatif masque la douleur : le vétérinaire arrive et ne peut plus évaluer la gravité, ce qui retarde une décision chirurgicale. ⚠️ Il fait aussi chuter la tension, dangereux sur un cheval déjà en état de choc.",
          en:"Never without the vet's say-so, and this chapter's dialogue says so outright. A sedative masks pain: the vet arrives and can no longer judge how bad it is, which delays a surgical decision.",
          es:"Nunca sin opinión veterinaria. Un sedante enmascara el dolor: el veterinario ya no puede evaluar la gravedad.",
          it:"Mai senza parere veterinario. Un sedativo maschera il dolore: il veterinario non può più valutare la gravità.",
          de:"Nie ohne tierärztliche Anweisung. Ein Beruhigungsmittel verdeckt den Schmerz: der Tierarzt kann den Ernst nicht mehr beurteilen.",
          ja:"獣医の指示なしには絶対に使いません。鎮静剤は痛みを隠すため、到着した獣医が重症度を判断できず、手術の決断が遅れます。",
          ar:"لا يعطى أبدا من دون رأي الطبيب البيطري. المهدئ يخفي الألم: يصل الطبيب فلا يستطيع تقدير الحالة الحقيقية." } },

  { ref:"points-de-suture", lecon:1, coll:"geste",
    mots:{ fr:{m:"les points de suture"}, en:{m:"stitches", p:"stit-chizz", var:"sutures"},
           es:{m:"los puntos de sutura"}, it:{m:"i punti di sutura"},
           de:{m:"die Stiche", p:"chti-che", var:"Nähte"}, ja:{m:"縫合", p:"hōgō" },
           ar:{m:"الغرز الجراحية"} },
    def:{ fr:"⚠️ L'anglais courant dit **stitches** ; *sutures* est le mot du chirurgien. Une plaie se recoud plus facilement quand le vétérinaire la voit tôt, mais la décision dépend de l'endroit, de la profondeur et de la saleté. C'est pourquoi l'heure de la blessure est la première question du vétérinaire.",
          en:"Everyday English is « stitches »; « sutures » is the surgeon's word. A wound can only usefully be closed within six to eight hours — after that it's left open. That's why the vet's first question is when it happened.",
          es:"El inglés corriente dice « stitches ». Una herida solo se sutura útilmente en las primeras seis u ocho horas.",
          it:"L'inglese corrente dice « stitches ». Una ferita si sutura utilmente solo entro sei-otto ore.",
          de:"Alltagsenglisch sagt « stitches ». Eine Wunde lässt sich nur innerhalb von sechs bis acht Stunden sinnvoll schließen.",
          ja:"英語では日常語で stitches と言います。傷を縫えるのは六〜八時間以内で、それを過ぎると開けたままにします。だから獣医は最初に「いつ怪我をしたか」を尋ねます。",
          ar:"تكون معالجة الجرح وخياطته أسهل عادة عندما يفحصه الطبيب البيطري مبكرا. لكن قرار الخياطة يعتمد على موضع الجرح وعمقه ودرجة تلوثه، لذلك لا تؤخري الاتصال بالطبيب." } },

  /* ---------- le cheval échappé ---------- */

  { ref:"cheval-echappe", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le cheval échappé"}, en:{m:"a loose horse", p:"louss hors"},
           es:{m:"el caballo escapado"}, it:{m:"il cavallo scappato"},
           de:{m:"das ausgebrochene Pferd", p:"aouss-gue-bro-che-ne"}, ja:{m:"逃げ出した馬", p:"nigedashita uma" },
           ar:{m:"حصان طليق!"} },
    def:{ fr:"🟥 EN ANGLAIS ON CRIE **« LOOSE HORSE ! »** — deux mots, et tout le monde sur un concours ou dans une écurie sait quoi faire : on ferme les accès, on ne court pas, on ne crie plus. ⚠️ Ce n'est pas une urgence médicale mais une alerte de sécurité : le danger est la route.",
          en:"You shout « LOOSE HORSE ! » — two words, and everyone at a show or on a yard knows what to do: shut the gates, don't run, stop shouting. It's not a medical emergency but a safety alert: the road is the danger.",
          es:"Se grita « ¡ caballo suelto ! ». No es una urgencia médica sino una alerta de seguridad: el peligro es la carretera.",
          it:"Si grida « cavallo libero ! ». Non è un'urgenza medica ma un allarme di sicurezza: il pericolo è la strada.",
          de:"Man ruft « freies Pferd ! ». Kein medizinischer Notfall, sondern ein Sicherheitsalarm: die Gefahr ist die Straße.",
          ja:"英語では「LOOSE HORSE !」と二語で叫びます。競技会や厩舎では全員が対応を知っています。門を閉め、走らず、叫ぶのをやめます。医療の緊急ではなく、安全の警報です。危険は道路です。",
          ar:"الحصان الطليق يمثل خطرا على نفسه وعلى الجميع. أغلقي المخارج إن أمكن ذلك بأمان، ولا تركضي خلفه، ونبهي جميع الموجودين." } },

  /* ==================================================================
     QUATRE NOTIONS AJOUTÉES LE 18/08/2026, sur le lexique fourni par
     Blandine pour Kildare. Le chapitre passe de 39 à 43 mots.

     🟥 POURQUOI ELLES. Le fichier possédait déjà « le pouls est trop
     rapide » et « marcher un cheval pour éviter qu'il se roule » — mais
     JAMAIS le pouls seul, ni la respiration, ni « se rouler » seul. On
     apprenait le signe d'alarme sans pouvoir nommer la chose mesurée.

     🟥 LES NORMES SONT ÉCRITES DANS CHAQUE ENTRÉE, sur demande expresse de
     Blandine : « il faut bien que tu expliques dans chaque petit
     commentaire quels sont les normes pour la température, le pouls etc ».
     ⚠️ NE PAS les retirer pour raccourcir une définition.

     🟥 VALEURS HARMONISÉES SUR LES SIENNES, 18/08 :
       Température  37,2 – 38,2 °C
       Pouls        30 – 40 battements/min
       Respiration  8 – 14 respirations/min
     ⚠️ LE FICHIER DISAIT AUTRE CHOSE AVANT CE JOUR : `fievre` annonçait
     37,5–38,5 °C, `pouls-rapide` 28–40. Les deux ont été corrigés sur ses
     valeurs, qui sont les références usuelles chez le cheval adulte au
     repos. C'EST UN CHANGEMENT DE CONTENU MÉDICAL DÉJÀ EN LIGNE, assumé et
     validé par elle. Ne pas revenir aux anciens chiffres.
  ================================================================== */

  { ref:"urgence", lecon:1, coll:"urgence",
    mots:{ fr:{m:"l'urgence"}, en:{m:"the emergency", p:"i-meur-djeun-si"},
           es:{m:"la urgencia"}, it:{m:"l'urgenza"},
           de:{m:"der Notfall", p:"nôt-fal"}, ja:{m:"緊急", p:"kinkyū"},
           ar:{m:"حالة طارئة"} },
    def:{ fr:"Le mot qui fait venir quelqu'un tout de suite. 🟥 LES TROIS CHIFFRES À SAVOIR PAR CŒUR, chez un cheval adulte au repos : 37,2 à 38,2 °C · 30 à 40 battements/min · 8 à 14 respirations/min. Les donner au téléphone vaut mieux que n'importe quelle description : un vétérinaire décide sur ces trois nombres.",
          en:"The word that gets someone to come at once. The three figures to know by heart, for a resting adult horse: 37.2–38.2 °C, 30–40 beats per minute, 8–14 breaths per minute. Giving those on the phone beats any description: a vet decides on those three numbers.",
          es:"La palabra que hace que alguien venga enseguida. 🟥 LAS TRES CIFRAS QUE HAY QUE SABER DE MEMORIA, en un caballo adulto en reposo: 37,2 a 38,2 °C · 30 a 40 latidos/min · 8 a 14 respiraciones/min. Darlas por teléfono vale más que cualquier descripción.",
          it:"La parola che fa venire qualcuno subito. 🟥 LE TRE CIFRE DA SAPERE A MEMORIA, in un cavallo adulto a riposo: 37,2 a 38,2 °C · 30 a 40 battiti/min · 8 a 14 respiri/min. Darle al telefono vale più di qualsiasi descrizione.",
          de:"Das Wort, das jemanden sofort kommen lässt. 🟥 DIE DREI ZAHLEN, DIE MAN AUSWENDIG KENNEN MUSS, beim erwachsenen Pferd in Ruhe: 37,2 bis 38,2 °C · 30 bis 40 Schläge/min · 8 bis 14 Atemzüge/min. Sie am Telefon zu nennen ist mehr wert als jede Beschreibung.",
          ja:"すぐに来てもらうための言葉。🟥 暗記すべき三つの数値 — 成馬の安静時で、体温 37.2〜38.2 °C・心拍 30〜40回/分・呼吸 8〜14回/分。電話でこの三つを伝えることは、どんな説明よりも役に立ちます。獣医はこの三つの数字で判断するのです。",
          ar:"ثلاثة أرقام تحفظ عن ظهر قلب عند الحصان البالغ في الراحة: من 37.2 إلى 38.2 درجة مئوية، ومن 30 إلى 40 نبضة في الدقيقة، ومن 8 إلى 14 نفسا في الدقيقة." } },

  { ref:"pouls", lecon:1, coll:"signe",
    mots:{ fr:{m:"le pouls"}, en:{m:"the pulse", p:"peulss"},
           es:{m:"el pulso"}, it:{m:"il polso"},
           de:{m:"der Puls", p:"poulss"}, ja:{m:"脈拍", p:"myakuhaku"},
           ar:{m:"النبض"} },
    def:{ fr:"🟥 NORME AU REPOS : 30 à 40 battements par minute chez un cheval adulte. Au-delà de 60 au repos, la douleur est sévère ; au-delà de 80, c'est critique. On le prend sous la ganache, à l'artère. ⚠️ Le mot anglais **pulse** ne se prononce pas comme il s'écrit, et c'est le premier chiffre qu'un vétérinaire demande au téléphone.",
          en:"Resting norm: 30 to 40 beats per minute in an adult horse. Above 60 at rest the pain is severe; above 80 it is critical. You take it under the jaw, on the artery. It is the first figure a vet asks for on the phone.",
          es:"🟥 NORMA EN REPOSO: 30 a 40 latidos por minuto en un caballo adulto. Por encima de 60 en reposo el dolor es intenso; por encima de 80 es crítico. Se toma bajo la quijada, en la arteria. ⚠️ Es la primera cifra que pide un veterinario por teléfono.",
          it:"🟥 NORMA A RIPOSO: 30 a 40 battiti al minuto in un cavallo adulto. Oltre 60 a riposo il dolore è severo; oltre 80 è critico. Si prende sotto la ganascia, sull'arteria. ⚠️ È la prima cifra che un veterinario chiede al telefono.",
          de:"🟥 RUHENORM: 30 bis 40 Schläge pro Minute beim erwachsenen Pferd. Über 60 in Ruhe ist der Schmerz stark; über 80 ist es kritisch. Man fühlt ihn unter dem Ganaschenrand, an der Arterie. ⚠️ Es ist die erste Zahl, die ein Tierarzt am Telefon verlangt.",
          ja:"🟥 安静時の基準 — 成馬で毎分30〜40回。安静時に60を超えれば痛みは強く、80を超えれば危機的です。下顎の下、動脈で取ります。⚠️ 獣医が電話で最初に尋ねる数字がこれです。",
          ar:"القيمة الطبيعية في الراحة: من 30 إلى 40 نبضة في الدقيقة عند الحصان البالغ. فوق 60 في الراحة يكون الألم شديدا، وفوق 80 تكون الحالة حرجة." } },

  { ref:"respiration", lecon:1, coll:"signe",
    mots:{ fr:{m:"la respiration"}, en:{m:"breathing", p:"bri-zing", var:"respiratory rate"},
           es:{m:"la respiración"}, it:{m:"la respirazione"},
           de:{m:"die Atmung", p:"at-moung"}, ja:{m:"呼吸", p:"kokyū"},
           ar:{m:"التنفس"} },
    def:{ fr:"🟥 NORME AU REPOS : 8 à 14 respirations par minute chez un cheval adulte. On compte le flanc qui monte et descend pendant quinze secondes, et on multiplie par quatre. ⚠️ L'anglais courant dit **breathing** ; le vétérinaire dira **respiratory rate**. Connaître les deux évite de rester bloquée au téléphone.",
          en:"Resting norm: 8 to 14 breaths per minute in an adult horse. You count the flank rising and falling for fifteen seconds and multiply by four. Everyday English says breathing; a vet will say respiratory rate. Knowing both keeps you going on the phone.",
          es:"🟥 NORMA EN REPOSO: 8 a 14 respiraciones por minuto en un caballo adulto. Se cuenta el flanco que sube y baja durante quince segundos y se multiplica por cuatro. ⚠️ El inglés corriente dice **breathing**; el veterinario dirá **respiratory rate**.",
          it:"🟥 NORMA A RIPOSO: 8 a 14 respiri al minuto in un cavallo adulto. Si conta il fianco che sale e scende per quindici secondi e si moltiplica per quattro. ⚠️ L'inglese corrente dice **breathing**; il veterinario dirà **respiratory rate**.",
          de:"🟥 RUHENORM: 8 bis 14 Atemzüge pro Minute beim erwachsenen Pferd. Man zählt fünfzehn Sekunden die Flanke und nimmt es mal vier. ⚠️ Alltagsenglisch sagt **breathing**, der Tierarzt sagt **respiratory rate**. Beide zu kennen hilft am Telefon.",
          ja:"🟥 安静時の基準 — 成馬で毎分8〜14回。脇腹の上下を十五秒数えて四倍します。⚠️ 日常英語では **breathing**、獣医は **respiratory rate** と言います。両方知っていれば、電話で言葉に詰まりません。",
          ar:"القيمة الطبيعية في الراحة: من 8 إلى 14 نفسا في الدقيقة عند الحصان البالغ. احسبي حركات الخاصرة صعودا ونزولا مدة خمس عشرة ثانية، ثم اضربي العدد في أربعة." } },

  { ref:"se-rouler", lecon:1, coll:"signe", v:true,
    mots:{ fr:{m:"se rouler"}, en:{m:"to roll", p:"rôl"},
           es:{m:"revolcarse"}, it:{m:"rotolarsi"},
           de:{m:"sich wälzen", p:"zich val-tsen"}, ja:{m:"転がる", p:"korogaru"},
           ar:{m:"التمرغ"} },
    def:{ fr:"Se coucher et se retourner sur le dos. ⚠️ Un cheval sain se roule au pré par plaisir — ce n'est pas un signe. C'est en colique qu'il devient dangereux : un roulé violent peut retourner l'intestin, et une colique traitable devient chirurgicale. C'est toute la raison du geste `marcher un cheval`.",
          en:"Lying down and turning over onto the back. A healthy horse rolls in the field for pleasure — that is not a sign. It becomes dangerous during colic: a violent roll can twist the gut, and a treatable colic becomes surgical. That is the whole reason for walking him.",
          es:"Tumbarse y darse la vuelta sobre el dorso. ⚠️ Un caballo sano se revuelca en el prado por gusto: no es un signo. Es en el cólico cuando se vuelve peligroso: un revolcón violento puede torcer el intestino, y un cólico tratable se vuelve quirúrgico.",
          it:"Coricarsi e rotolarsi sul dorso. ⚠️ Un cavallo sano si rotola al pascolo per piacere: non è un segno. È durante la colica che diventa pericoloso: un rotolamento violento può torcere l'intestino, e una colica curabile diventa chirurgica.",
          de:"Sich hinlegen und auf den Rücken drehen. ⚠️ Ein gesundes Pferd wälzt sich auf der Weide zum Vergnügen — kein Anzeichen. Bei einer Kolik wird es gefährlich: heftiges Wälzen kann den Darm verdrehen, und eine behandelbare Kolik wird zum Operationsfall.",
          ja:"横になり、背中を地面に向けて転がること。⚠️ 健康な馬は放牧地で気持ちよく転がります — それは兆候ではありません。危険になるのは腹痛のときです。激しく転がると腸がねじれ、治療できたはずの腹痛が手術になります。",
          ar:"الاستلقاء والانقلاب على الظهر. الحصان السليم يتمرغ في المرعى من باب المتعة، وليس في ذلك علامة. أما في المغص فيصبح خطرا." } }

  ],

  /* ==================================================================
     LES PHRASES D'EXERCICE — quatre, reprises de l'ancien chapitre et
     recentrées sur le cheval.
  ================================================================== */
  phrases: [

    { ref:"ph-vet-appeler", lecon:1, mots:["veterinaire"],
      fr:"Il faut appeler le vétérinaire.",
      en:"We need to call the vet.",
      es:"Hay que llamar al veterinario.",
      it:"Bisogna chiamare il veterinario.",
      de:"Wir müssen den Tierarzt rufen.",
      ja:"獣医 を 呼ば なけれ ば なり ませ ん。",
      ar:"يجب الاتصال بالطبيب البيطري." },

    { ref:"ph-vet-boite", lecon:1, mots:["boiter"],
      fr:"Il boite du postérieur droit.",
      en:"He's lame on the right hind.",
      es:"Cojea del posterior derecho.",
      it:"Zoppica dal posteriore destro.",
      de:"Er geht hinten rechts lahm.",
      ja:"右 の 後肢 が 悪い です。",
      ar:"إنه يعرج من القائمة الخلفية اليمنى." },

    { ref:"ph-vet-colique", lecon:1, mots:["colique","regarde-flancs"],
      fr:"Je crois qu'il fait une colique : il se regarde les flancs.",
      en:"I think he's colicking — he keeps looking at his flanks.",
      es:"Creo que tiene un cólico: se mira los flancos.",
      it:"Credo che abbia una colica: si guarda i fianchi.",
      de:"Ich glaube, er hat eine Kolik: er schaut zur Flanke.",
      ja:"疝痛 だ と 思い ます。 自分 の 腹 を 見 て い ます。",
      ar:"أظن أنه مصاب بمغص: إنه ينظر إلى خاصرتيه." },

    { ref:"ph-vet-loose", lecon:1, mots:["cheval-echappe","aide"],
      fr:"À l'aide ! Un cheval s'est échappé.",
      en:"Help ! Loose horse !",
      es:"¡ Socorro ! ¡ Caballo suelto !",
      it:"Aiuto ! Cavallo libero !",
      de:"Hilfe ! Freies Pferd !",
      ja:"助け て ! 馬 が 逃げ まし た !",
      ar:"النجدة! حصان أفلت." }

  ],

  /* ==================================================================
     LE DIALOGUE DE KILDARE — 16 août 2026, session 214.

     LA SCÈNE : un appel au vétérinaire, en pleine nuit, à l'étranger.
     29 phrases, 7 temps. Le vétérinaire mène l'échange : il pose les
     questions, la joueuse décrit ce qu'elle voit.

     🟥 QUINZE PHRASES SUR VINGT-DEUX SONT DE BLANDINE, dictées le
     16/08. Ce sont elles qui donnent au dialogue son réalisme : un vrai
     appel n'est pas une liste de symptômes, c'est un interrogatoire.
     · « Mon cheval respire fort, il gratte le sol et il se couche » —
       elle a remplacé QUATRE phrases de Claude par une seule. On ne
       détaille pas au téléphone, on lâche tout d'un coup.
     · « Il fait peut-être une colique. Marchez-le, empêchez-le de se
       rouler, mettez-lui un panier pour éviter qu'il mange. Retirez la
       nourriture de son box et remplissez une poubelle d'eau qu'il
       puisse boire. » — la SUITE DE GESTES qu'un vétérinaire dicte
       vraiment. ⚠️ « une poubelle d'eau » = le grand bac qu'on remplit,
       PAS « retirer l'eau ». Claude avait mal compris deux fois.
     · « Prenez son pouls et avertissez-moi s'il est trop rapide » —
       l'ordre de surveillance, qui manquait.
     · « Il faut lui faire une piqûre. Vous savez faire une IM ou une
       IV ? » — la vraie question posée au téléphone.
     · « Il faut désinfecter la plaie et maintenir une compression si ça
       saigne beaucoup » — le MAINTIEN est le mot qui compte.
     · « Il faut peut-être des points de suture » · « Vous savez faire
       un pansement ou un garrot si besoin ? »
     · « Sa boiterie a démarré après un coup ou une chute ? » · « Le
       membre est chaud ou gonflé ? » — l'interrogatoire du vétérinaire.
     · « Il refuse d'avancer et il est trempé. Il fait peut-être un coup
        de sang. Je dois l'immobiliser et appeler le vétérinaire. »
     · « À l'aide ! Un cheval s'est échappé et il est parti vers la
        route. » — le cri d'abord, la précision ensuite.

     🟥 LE POINT LE PLUS IMPORTANT DU CHAPITRE est dans les temps 2 et
     6 : COLIQUE → ON MARCHE. COUP DE SANG → ON IMMOBILISE. Deux
     urgences qui se ressemblent, deux gestes opposés. NE JAMAIS
     inverser, NE JAMAIS écrire qu'on fait marcher un coup de sang.

     ⚠️ AUCUNE POLITESSE. Pas de « excusez-moi », pas de « pourriez-
     vous ». On ne fait pas de politesse dans l'urgence, et une phrase
     trop longue ne se dit pas quand les mains tremblent.

     `dit` : "joueuse" = elle produit · "club" = le vétérinaire.
  ================================================================== */
  dialogue: {
    ville: "kildare", lecon: 1, temps: 7, langues: ["fr","en","es","it","de","ja","ar"],   /* 29 phrases — 22 avant le lot du 18/08 */

    phrases: [

      /* ---- temps 1 · j'appelle ---- */
      { ref:"dk-appeler-veto", temps:1, dit:"joueuse", mots:["veterinaire"],
        fr:"Il faut appeler le vétérinaire tout de suite.",
        en:"We need to call the vet right now.",
        es:"Hay que llamar al veterinario ahora mismo.",
        it:"Bisogna chiamare subito il veterinario.",
        de:"Wir müssen sofort den Tierarzt rufen.",
        ja:"すぐ に 獣医 を 呼ば なけれ ば なり ませ ん。",
      ar:"يجب الاتصال بالطبيب البيطري فورا." },

      { ref:"dk-urgence-venir", temps:1, dit:"joueuse", mots:[],
        fr:"C'est une urgence. Est-ce que vous pouvez venir maintenant ?",
        en:"It's an emergency. Can you come now?",
        es:"Es una urgencia. ¿Puede venir ahora?",
        it:"È un'urgenza. Può venire adesso?",
        de:"Es ist ein Notfall. Können Sie jetzt kommen?",
        ja:"緊急 です。 今 すぐ 来 て いただけ ます か ?",
      ar:"إنها حالة طارئة. هل يمكنكم الحضور الآن؟" },

      { ref:"dk-r-decrivez", temps:1, dit:"club", mots:[],
        fr:"Décrivez-moi ce que vous voyez.",
        en:"Tell me what you can see.",
        es:"Descríbame lo que ve.",
        it:"Mi descriva quello che vede.",
        de:"Beschreiben Sie mir, was Sie sehen.",
        ja:"見え て いる こと を 教え て ください。",
      ar:"صفي لي ما ترينه." },

      /* ---- temps 2 · la colique ---- */
      /* 🟥 Phrase de Blandine : elle remplace QUATRE phrases de Claude.
         Au téléphone on lâche les trois signes d'un coup. */
      { ref:"dk-respire-gratte-couche", temps:2, dit:"joueuse", mots:["respire-fort","gratte-le-sol","veut-se-coucher"],
        fr:"Mon cheval respire fort, il gratte le sol et il se couche.",
        en:"My horse is breathing heavily, he's pawing the ground and lying down.",
        es:"Mi caballo respira con dificultad, escarba el suelo y se echa.",
        it:"Il mio cavallo respira affannosamente, raspa il terreno e si corica.",
        de:"Mein Pferd atmet schwer, scharrt und legt sich hin.",
        ja:"馬 の 呼吸 が 荒く、 前足 で 地面 を 掻い て、 横 に なり ます。",
      ar:"حصاني يتنفس بصعوبة، ويحفر الأرض، ويستلقي." },

      /* 🟥 Phrase de Blandine : la suite de gestes réelle. */
      { ref:"dk-r-colique-gestes", temps:2, dit:"club", mots:["colique","marcher-cheval","panier","se-rouler"],
        /* 🟥 RÉÉCRITE LE 18/08 SUR RÈGLE DE BLANDINE : « si tu as un doute ne
           met pas ». L'ancienne version prescrivait un protocole complet
           (marcher, panier, poubelle d'eau à boire) que Claude ne pouvait pas
           garantir — et faire boire un cheval en colique n'est pas anodin.
           ⚠️ CE QUI RESTE EST CE QUI NE SE DISCUTE PAS : retirer la nourriture,
           empêcher le roulé, faire venir le vétérinaire. Blandine a confirmé le
           18/08 qu'on marche bien pour la colique — c'est dit dans l'entrée
           `marcher-cheval`, avec sa raison, et non ici sous forme d'ordre.
           ⚠️ NE PAS y réintroduire de protocole de soin. */
        fr:"Il fait peut-être une colique. Retirez toute nourriture et empêchez-le de se rouler : j'arrive.",
        en:"He may be colicking. Take all his feed away and stop him rolling — I'm on my way.",
        es:"Puede que tenga un cólico. Retire toda la comida y evite que se revuelque: voy en camino.",
        it:"Potrebbe avere una colica. Tolga tutto il cibo ed eviti che si rotoli: sto arrivando.",
        de:"Er hat vielleicht eine Kolik. Nehmen Sie ihm alles Futter weg und verhindern Sie, dass er sich wälzt — ich bin auf dem Weg.",
        ja:"疝痛 かも しれ ませ ん。 飼料 を すべて 下げ て、 転がら せ ない で ください。 今 向かい ます。",
      ar:"قد يكون مصابا بمغص. أبعدي عنه الطعام، وحافظي على سلامتك ولا تحاولي منعه بالقوة إذا تمرغ بعنف. أنا في الطريق." },

      /* 🟥 Phrase de Blandine : l'ordre de surveillance. */
      { ref:"dk-r-prenez-pouls", temps:2, dit:"club", mots:["pouls-rapide"],
        fr:"Prenez son pouls et avertissez-moi s'il est trop rapide.",
        en:"Take his pulse and let me know if it's too fast.",
        es:"Tómele el pulso y avíseme si es demasiado rápido.",
        it:"Gli prenda il polso e mi avverta se è troppo veloce.",
        de:"Messen Sie den Puls und sagen Sie mir, wenn er zu schnell ist.",
        ja:"脈 を 取っ て、 速 すぎ たら 知らせ て ください。",
      ar:"خذي نبضه وأخبريني إن كان سريعا أكثر من اللازم." },

      /* ==================================================================
         LA SCÈNE DES CONSTANTES — ajoutée le 18/08/2026, lexique de Blandine.
         🟥 POURQUOI ELLE EXISTE. Le fichier possédait `le pouls est trop
         rapide` au lexique, mais AUCUNE phrase ne faisait jamais dire un
         chiffre. On apprenait le signe d'alarme sans jamais comparer une
         valeur à une norme.
         🟥 LE POULS EST À 68, PAS À 36. La première version du brief donnait
         36 — soit une valeur NORMALE dans une scène de colique, ce qui
         apprenait l'inverse de ce qu'on veut. Décision prise avec Blandine le
         18/08. La température, elle, RESTE NORMALE À 38 : une colique ne fait
         pas monter la température, et il est utile de savoir qu'un cheval peut
         être en urgence avec une température parfaite.
         ⚠️ NE PAS « corriger » la température vers une valeur élevée : ce
         serait enseigner « urgence = fièvre », qui est faux.
         ⚠️ Les normes sont écrites dans les entrées `pouls`, `respiration`,
         `fievre` et `urgence`, dans les six langues. Elles ne sont PAS répétées
         dans les phrases : la phrase donne le chiffre, le lexique donne la
         norme, et c'est la comparaison qui fait l'exercice.
      ================================================================== */
      { ref:"dk-pouls-68", temps:2, dit:"joueuse", mots:["pouls","pouls-rapide"],
        fr:"Son pouls est à soixante-huit battements par minute.",
        en:"His pulse is sixty-eight beats per minute.",
        es:"Su pulso está a sesenta y ocho latidos por minuto.",
        it:"Il suo polso è a sessantotto battiti al minuto.",
        de:"Sein Puls liegt bei achtundsechzig Schlägen pro Minute.",
        ja:"脈 は 一 分間 に 六十八 です。",
      ar:"نبضه ثمان وستون نبضة في الدقيقة." },

      { ref:"dk-quelle-temperature", temps:3, dit:"club", mots:["fievre"],
        fr:"Quelle est sa température ?",
        en:"What's his temperature?",
        es:"¿Qué temperatura tiene?",
        it:"Quanto ha di temperatura?",
        de:"Welche Temperatur hat er?",
        ja:"体温 は どれ くらい です か ?",
      ar:"كم درجة حرارته؟" },

      { ref:"dk-temperature-38", temps:3, dit:"joueuse", mots:["fievre"],
        fr:"Sa température est de trente-huit degrés.",
        en:"His temperature is thirty-eight degrees.",
        es:"Su temperatura es de treinta y ocho grados.",
        it:"La sua temperatura è di trentotto gradi.",
        de:"Seine Temperatur ist achtunddreißig Grad.",
        ja:"体温 は 三十八 度 です。",
      ar:"حرارته ثماني وثلاثون درجة." },

      { ref:"dk-respire-20", temps:3, dit:"joueuse", mots:["respiration","respire-fort"],
        fr:"Il respire à vingt respirations par minute au repos.",
        en:"He's breathing at twenty breaths per minute at rest.",
        es:"Respira a veinte respiraciones por minuto en reposo.",
        it:"Respira a venti respiri al minuto a riposo.",
        de:"Er atmet zwanzig Mal pro Minute in Ruhe.",
        ja:"安静 時 に 一 分間 二十 回 呼吸 し て い ます。",
      ar:"يتنفس عشرين نفسا في الدقيقة وهو في الراحة." },

      /* 🟥 Phrase de Blandine, 18/08 : elle vise une erreur réelle et très
         fréquente — soulever le pansement pour vérifier, ce qui rouvre le
         saignement à chaque fois. */
      { ref:"dk-r-maintenir-pression", temps:4, dit:"club", mots:["compression","bandage"],
        fr:"Maintenez la pression. Ne soulevez pas le pansement toutes les trente secondes pour regarder.",
        en:"Keep the pressure on. Don't keep lifting the dressing to check the wound.",
        es:"Mantenga la presión. No levante el vendaje cada treinta segundos para mirar.",
        it:"Mantenga la pressione. Non solleva la medicazione ogni trenta secondi per guardare.",
        de:"Halten Sie den Druck. Heben Sie den Verband nicht alle dreißig Sekunden an, um nachzusehen.",
        ja:"圧迫 を 続け て ください。 三十 秒 ごと に 当て布 を 持ち上げ て 見 ない で ください。",
      ar:"استمري في الضغط. لا ترفعي الضماد كل ثلاثين ثانية لتنظري." },

      /* 🟥 Phrase de Blandine : le médicament, la dose et la voie viennent du
         vétérinaire. La formulation dit bien « le vétérinaire m'a demandé »,
         pour qu'aucune joueuse ne comprenne qu'on improvise une injection. */
      { ref:"dk-im-ou-iv", temps:2, dit:"joueuse", mots:["piqure-im-iv"],
        fr:"Le vétérinaire m'a demandé de lui faire une injection. C'est en IM ou en IV ?",
        en:"The vet has asked me to give him an injection. Is it IM or IV?",
        es:"El veterinario me ha pedido ponerle una inyección. ¿Es IM o IV?",
        it:"Il veterinario mi ha chiesto di fargli un'iniezione. È IM o IV?",
        de:"Der Tierarzt hat mich gebeten, ihm eine Spritze zu geben. Ist das IM oder IV?",
        ja:"獣医 に 注射 を 頼ま れ まし た。 筋肉 内 です か、 静脈 内 です か ?",
      ar:"طلب مني الطبيب البيطري أن أعطيه حقنة. هل هي عضلية أم وريدية؟" },

      /* 🟥 Phrase de Blandine : ne jamais médiquer sans instruction. */
      { ref:"dk-r-aucun-medicament", temps:2, dit:"club", mots:["sedatif"],
        fr:"Ne lui donnez aucun médicament sans instruction du vétérinaire.",
        en:"Don't give him any medication unless the vet tells you to.",
        es:"No le dé ningún medicamento sin indicación del veterinario.",
        it:"Non gli dia alcun farmaco senza indicazione del veterinario.",
        de:"Geben Sie ihm kein Medikament ohne Anweisung des Tierarztes.",
        ja:"獣医 の 指示 が ない かぎり、 薬 は 一切 与え ない で ください。",
      ar:"لا تعطيه أي دواء من دون تعليمات الطبيب البيطري." },

      /* 🟥 Phrase de Blandine : la vraie question du téléphone. */
      { ref:"dk-r-im-ou-iv", temps:2, dit:"club", mots:["piqure-im-iv"],
        fr:"Il faut lui faire une piqûre. Vous savez faire une IM ou une IV ?",
        en:"He needs an injection. Can you give one, IM or IV?",
        es:"Necesita una inyección. ¿Sabe poner una IM o una IV?",
        it:"Ha bisogno di un'iniezione. Sa fare una IM o una EV?",
        de:"Er braucht eine Spritze. Können Sie eine setzen, i.m. oder i.v.?",
        ja:"注射 が 必要 です。 筋肉 注射 か 静脈 注射 は でき ます か ?",
      ar:"يجب إعطاؤه حقنة. هل تعرفين إعطاء حقنة عضلية أو وريدية؟" },

      { ref:"dk-je-sais-im", temps:2, dit:"joueuse", mots:["piqure-im-iv"],
        fr:"Je sais faire une IM, pas une IV.",
        en:"I can do an IM, not an IV.",
        es:"Sé poner una IM, no una IV.",
        it:"So fare una IM, non una EV.",
        de:"Eine i.m. kann ich, eine i.v. nicht.",
        ja:"筋肉 注射 は でき ます が、 静脈 注射 は でき ませ ん。",
      ar:"أعرف إعطاء الحقنة العضلية، لا الوريدية." },

      /* ---- temps 3 · les autres signes ---- */
      { ref:"dk-r-fievre", temps:3, dit:"club", mots:["fievre"],
        fr:"Est-ce qu'il a de la fièvre ?",
        en:"Has he got a temperature?",
        es:"¿Tiene fiebre?",
        it:"Ha la febbre?",
        de:"Hat er Fieber?",
        ja:"熱 は あり ます か ?",
      ar:"هل لديه حمى؟" },

      { ref:"dk-r-autres-symptomes", temps:3, dit:"club", mots:["mouche","mal-a-degluter"],
        fr:"A-t-il d'autres symptômes ? Est-ce qu'il mouche du nez ? Du mal à déglutir ?",
        en:"Any other signs? Is his nose running? Is he struggling to swallow?",
        es:"¿Tiene otros síntomas? ¿Le sale secreción por la nariz? ¿Le cuesta tragar?",
        it:"Ha altri sintomi? Ha secrezione dal naso? Fa fatica a inghiottire?",
        de:"Hat er andere Anzeichen? Läuft die Nase? Kann er schlecht schlucken?",
        ja:"ほか に 症状 は ? 鼻水 は 出 て い ます か ? 飲み込み にくい 様子 は ?",
      ar:"هل لديه أعراض أخرى؟ هل يسيل من أنفه؟ هل يجد صعوبة في البلع؟" },

      /* ---- temps 4 · la blessure ---- */
      { ref:"dk-plaie-saigne", temps:4, dit:"joueuse", mots:["plaie","saigne-enormement"],
        fr:"Il a une plaie au postérieur droit, elle saigne énormément.",
        en:"He's got a wound on his right hind, it's bleeding heavily.",
        es:"Tiene una herida en el posterior derecho, sangra muchísimo.",
        it:"Ha una ferita al posteriore destro, sanguina moltissimo.",
        de:"Er hat eine Wunde hinten rechts, sie blutet stark.",
        ja:"右 の 後肢 に 傷 が あり、 大量 に 出血 し て い ます。",
      ar:"لديه جرح في القائمة الخلفية اليمنى، وهو ينزف بغزارة." },

      /* 🟥 Phrase de Blandine : MAINTENIR est le mot qui compte. */
      { ref:"dk-r-desinfecter-comprimer", temps:4, dit:"club", mots:["desinfecter","compression"],
        fr:"Il faut désinfecter la plaie et maintenir une compression si ça saigne beaucoup.",
        en:"Clean the wound and keep pressure on it if it's bleeding a lot.",
        es:"Hay que desinfectar la herida y mantener la compresión si sangra mucho.",
        it:"Bisogna disinfettare la ferita e mantenere la compressione se sanguina molto.",
        de:"Reinigen Sie die Wunde und halten Sie Druck darauf, wenn sie stark blutet.",
        ja:"傷 を 消毒 し て、 出血 が 多い なら 圧迫 を 保っ て ください。",
      ar:"يجب تطهير الجرح والاستمرار في الضغط إذا كان النزيف غزيرا." },

      /* 🟥 Phrase de Blandine. */
      { ref:"dk-r-pansement-garrot", temps:4, dit:"club", mots:["bandage","garrot-lien"],
        fr:"Savez-vous poser un pansement compressif ? N'utilisez pas de garrot sans instruction directe du vétérinaire.",
        en:"Can you put a bandage on, or a tourniquet if you have to?",
        es:"¿Sabe poner un vendaje, o un torniquete si hace falta?",
        it:"Sa fare una fasciatura, o un laccio emostatico se serve?",
        de:"Können Sie einen Verband anlegen, oder eine Aderpresse, wenn es sein muss?",
        ja:"包帯 を 巻け ます か ? 必要 なら 止血帯 も でき ます か ?",
      ar:"هل تعرفين وضع ضماد ضاغط؟ لا تستخدمي رباطا ضاغطا من دون تعليمات مباشرة من الطبيب البيطري." },

      /* 🟥 Phrase de Blandine. */
      { ref:"dk-r-points-suture", temps:4, dit:"club", mots:["points-de-suture"],
        fr:"Il faudra peut-être des points de suture.",
        en:"He may need stitches.",
        es:"Puede que necesite puntos de sutura.",
        it:"Potrebbero servire dei punti di sutura.",
        de:"Er braucht vielleicht Stiche.",
        ja:"縫合 が 必要 に なる かも しれ ませ ん。",
      ar:"قد يحتاج إلى غرز جراحية." },

      /* ---- temps 5 · la boiterie ---- */
      { ref:"dk-ne-pose-plus", temps:5, dit:"joueuse", mots:["ne-pose-plus-le-pied"],
        fr:"Il ne pose plus le pied à terre.",
        en:"He won't put his foot down at all.",
        es:"No apoya el pie en el suelo.",
        it:"Non appoggia più il piede a terra.",
        de:"Er setzt den Fuß gar nicht mehr auf.",
        ja:"足 を まったく 地面 に 着け ませ ん。",
      ar:"لم يعد يضع قائمته على الأرض." },

      /* 🟥 Phrase de Blandine : l'interrogatoire du vétérinaire. */
      { ref:"dk-r-apres-coup-chute", temps:5, dit:"club", mots:["boiterie"],
        fr:"Sa boiterie a démarré après un coup ou une chute ?",
        en:"Did the lameness come on after a knock or a fall?",
        es:"¿La cojera empezó después de un golpe o una caída?",
        it:"La zoppia è iniziata dopo un colpo o una caduta?",
        de:"Kam die Lahmheit nach einem Schlag oder einem Sturz?",
        ja:"跛行 は 打撲 か 転倒 の あと に 始まり まし た か ?",
      ar:"هل بدأ عرجه بعد ضربة أو سقوط؟" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dk-r-chaud-ou-gonfle", temps:5, dit:"club", mots:["chaleur-membre","gonflement"],
        fr:"Le membre est chaud ou gonflé ?",
        en:"Is the leg hot or swollen?",
        es:"¿El miembro está caliente o hinchado?",
        it:"L'arto è caldo o gonfio?",
        de:"Ist das Bein warm oder geschwollen?",
        ja:"その 脚 は 熱い です か、 腫れ て い ます か ?",
      ar:"هل القائمة حارة أو منتفخة؟" },

      /* ---- temps 6 · le bouchon œsophagien ---- */
      { ref:"dk-degluter-bave", temps:6, dit:"joueuse", mots:["mal-a-degluter","bave","regurgite"],
        fr:"Il a du mal à déglutir et il bave beaucoup. Il régurgite.",
        en:"He's struggling to swallow and drooling a lot. There's feed coming back down his nose.",
        es:"Le cuesta tragar y babea mucho. Regurgita por la nariz.",
        it:"Fa fatica a inghiottire e sbava molto. Rigurgita dal naso.",
        de:"Er kann schlecht schlucken und speichelt stark. Es kommt Futter aus der Nase.",
        ja:"飲み込み にくく、 よだれ が 多い です。 鼻 から 吐き 戻し て い ます。",
      ar:"يجد صعوبة في البلع ويسيل لعابه بغزارة، ويخرج الطعام من أنفه." },

      { ref:"dk-r-bouchon", temps:6, dit:"club", mots:["bouchon-oesophagien"],
        fr:"Il a peut-être un bouchon œsophagien.",
        en:"He might have choke.",
        es:"Puede tener una obstrucción esofágica.",
        it:"Potrebbe avere un'ostruzione esofagea.",
        de:"Er hat vielleicht eine Schlundverstopfung.",
        ja:"食道 閉塞 かも しれ ませ ん。",
      ar:"قد يكون لديه انسداد في المريء." },

      /* ---- temps 7 · le coup de sang, et le cheval échappé ---- */
      /* 🟥 Phrase de Blandine. LE CONTRAIRE DE LA COLIQUE : on immobilise. */
      { ref:"dk-refuse-avancer-trempe", temps:7, dit:"joueuse", mots:["coup-de-sang","immobiliser"],
        fr:"Il refuse d'avancer et il est trempé. Il fait peut-être un coup de sang. Je dois l'immobiliser et appeler le vétérinaire.",
        en:"He won't go forward and he's soaked in sweat. He might be tying up. I need to keep him still and call the vet.",
        es:"Se niega a avanzar y está empapado. Puede ser un coup de sang. Debo inmovilizarlo y llamar al veterinario.",
        it:"Rifiuta di avanzare ed è tutto sudato. Potrebbe essere un colpo di sangue. Devo immobilizzarlo e chiamare il veterinario.",
        de:"Er will nicht mehr vorwärts und ist schweißnass. Vielleicht ein Kreuzverschlag. Ich muss ihn ruhig stellen und den Tierarzt rufen.",
        ja:"前 に 進も う と せ ず、 汗 だく です。 筋硬直症 かも しれ ませ ん。 動かさ ず に 止め て、 獣医 を 呼び ます。",
      ar:"يرفض التقدم وهو متصبب عرقا. قد يكون مصابا بانحلال العضلات الناتج عن الجهد. علي أن أوقفه عن الحركة، وألا أجبره على المشي، وأن أتصل بالطبيب البيطري." },

      { ref:"dk-r-pas-de-sedatif", temps:7, dit:"club", mots:["sedatif"],
        fr:"Ne lui donnez aucun sédatif avant que j'arrive.",
        en:"Don't give him any sedative before I get there.",
        es:"No le dé ningún sedante antes de que llegue.",
        it:"Non gli dia alcun sedativo prima che io arrivi.",
        de:"Geben Sie ihm kein Beruhigungsmittel, bevor ich da bin.",
        ja:"私 が 着く まで、 鎮静剤 は 与え ない で ください。",
      ar:"لا تعطيه أي مهدئ قبل وصولي." },

      /* 🟥 Phrase de Blandine : le cri d'abord, la précision ensuite. */
      { ref:"dk-loose-horse-route", temps:7, dit:"joueuse", mots:["aide","cheval-echappe"],
        fr:"À l'aide ! Un cheval s'est échappé et il est parti vers la route.",
        en:"Help ! Loose horse — he's heading for the road !",
        es:"¡ Socorro ! Un caballo se ha escapado y va hacia la carretera.",
        it:"Aiuto ! Un cavallo è scappato e va verso la strada.",
        de:"Hilfe ! Ein Pferd ist ausgebrochen und läuft zur Straße.",
        ja:"助け て ! 馬 が 逃げ て、 道路 の 方 に 向かっ て い ます !",
      ar:"النجدة! حصان أفلت واتجه نحو الطريق." }
    ]
  }
};
