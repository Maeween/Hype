/* hype-lingo-lex-flyinge.js — Hype Lingo · Flyinge, Suède · « Le pied et la maréchalerie »
   ==================================================================
   NOUVELLE VILLE, créée le 18/08/2026 sur brief détaillé de Blandine.
   23 CONCEPTS PROPRES, UNE LEÇON.

   🟥 DEUX CONCEPTS NE SONT PAS ICI, VOLONTAIREMENT :
   `marechal` (le maréchal-ferrant) et `fer` (le fer) existent déjà dans
   `hype-lingo-lex-connemara.js` (ex-`cheval.js`, leçon 2). Réutilisés
   tels quels via `motsAilleurs` dans le dialogue — pas recréés, pour
   ne pas dupliquer une ref qui existe avec certitude ailleurs.

   ⚠️ TROIS AUTRES CONCEPTS (`sabot`, `sole`, `fourchette`) SONT PEUT-ÊTRE
   AUSSI AILLEURS — dans `hype-lingo-lex-pansage.js`, jamais ouvert
   pendant cette session. Créés ici quand même, sur accord explicite de
   Blandine : « pas grave si mis en double quelque part, tant que ce
   n'est pas en triple ». À vérifier et fusionner plus tard si le
   doublon est confirmé.

   🟥 LES ~20 TERMES TECHNIQUES COMPLÉMENTAIRES DU BRIEF (ferrure,
   déferrer, fer antérieur/postérieur, rocker toe, sole fine/sensible/
   friable, maladie de la ligne blanche, abcès, close nail/nail prick,
   etc.) NE SONT PAS DES CONCEPTS SÉPARÉS. Sur décision explicite de
   Blandine, ils sont glissés en encart (⚠️) dans la définition du
   concept principal auquel ils se rattachent — pas 20 fiches de plus.
   Seuls `pieds-nus` et `hipposandale` gardent leur propre entrée,
   parce que le dialogue les emploie directement.

   NEUTRALITÉ VOULUE PAR BLANDINE : ce chapitre ne prend jamais parti
   entre ferrure classique et pied nu. Les deux sont présentés comme
   des choix, pas comme une hiérarchie.

   ⚠️ CE CHAPITRE N'ENSEIGNE PAS LE MÉTIER DE MARÉCHAL-FERRANT. Les
   pathologies (fourchette pourrie, maladie de la ligne blanche, abcès)
   sont nommées pour qu'on sache en parler au professionnel — jamais un
   protocole de soin.

   ⚠️ RELECTURE NATIVE INDISPENSABLE, plus que pour la plupart des
   chapitres : le vocabulaire technique de maréchalerie (garniture,
   rolling, rocker toe, pinçons, mortaises taraudées) varie beaucoup
   d'un pays à l'autre et n'a pas toujours d'équivalent figé. Entrées
   marquées // ?? : les moins sûres.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.flyinge = {
  ref: "flyinge",
  titre: { fr:"Le pied et la maréchalerie", en:"The foot and farriery", es:"El casco y la herrería",
           it:"Lo zoccolo e la maniscalcheria", de:"Der Huf und der Hufbeschlag", ja:"蹄と装蹄", ar:"الحافر وحدادة الخيل" },
  lecons: 1,

  concepts: [

  /* ============ ANATOMIE DU PIED ============ */

  /* 🟥 19/08 : LIBELLÉ FRANÇAIS CANONIQUE FIXÉ PAR BLANDINE — `le sabot`,
     avec `le pied` en variante. La `ref` était partagée avec Lambourn, qui
     disait « le sabot » ; deux libellés pour un même `ref` faisaient
     arriver le mot déjà acquis sous un intitulé jamais vu. La ref est
     désormais portée par FLYINGE SEULE, mais le libellé reste celui-ci.
     L'idée du pied comme ensemble fonctionnel reste dans la définition. */
  { ref:"sabot", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"le sabot", var:"le pied"}, en:{m:"the hoof", p:"houf"},
           es:{m:"el casco"}, it:{m:"lo zoccolo"},
           de:{m:"der Huf", p:"houf"}, ja:{m:"蹄", p:"hizume"},
           ar:{m:"الحافر"} },
    def:{ fr:"L'enveloppe cornée, insensible en surface. Le maréchal, lui, dit « le pied » : il parle de l'ensemble, corne et tissus vivants ensemble. ⚠️ Un abcès de pied — une infection sous la corne — est la cause la plus fréquente d'une boiterie soudaine et sévère ; il se soigne en perçant un point de sortie, jamais en attendant.",
          en:"The horny casing of the foot, insensitive on the surface. A hoof abscess — infection trapped under the horn — is the most common cause of sudden, severe lameness.",
          es:"⚠️ La envoltura córnea del pie, insensible en superficie. Un absceso de casco — una infección bajo la córnea — es la causa más frecuente de una cojera repentina y severa.",
          it:"⚠️ L'involucro corneo del piede, insensibile in superficie. Un ascesso del piede — un'infezione sotto la corneo — è la causa più frequente di una zoppia improvvisa e grave.",
          de:"⚠️ Die Hornkapsel des Fußes, an der Oberfläche unempfindlich. Ein Hufabszess — eine Infektion unter dem Horn — ist die häufigste Ursache einer plötzlichen, schweren Lahmheit.",
          ja:"蹄を覆う角質の外殻。表面には感覚がありません。⚠️ 蹄膿瘍（角質の下の感染）は、突然の重度の跛行の最も多い原因です。",
          ar:"الغلاف القرني للحافر، وسطحه غير حساس للألم. أما حداد الخيل فيستعمل كلمة «القدم» ليقصد الحافر كله، أي القرن والأنسجة الحية معا. ⚠️ خراج الحافر — وهو عدوى تحت القرن — من أكثر أسباب العرج المفاجئ والشديد شيوعا؛ ويعالج بفتح منفذ لتصريفه، ولا ينبغي تركه من دون علاج." } },

  { ref:"paroi", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"la paroi"}, en:{m:"the hoof wall", p:"houf ouol"},
           es:{m:"la muralla"}, it:{m:"la muraglia"}, // ??
           de:{m:"die Hornwand", p:"horn-vant"}, ja:{m:"蹄壁", p:"teiheki"},
           ar:{m:"جدار الحافر"} },
    def:{ fr:"La partie verticale et visible du sabot, celle qui touche le sol et qui reçoit les clous. Elle pousse en permanence, du haut vers le bas.",
          en:"The visible, vertical part of the hoof that meets the ground and takes the nails. It grows constantly from top to bottom.",
          es:"La parte vertical y visible del casco, la que toca el suelo y recibe los clavos. Crece de forma permanente de arriba abajo.",
          it:"La parte verticale e visibile dello zoccolo, quella che tocca il suolo e riceve i chiodi. Cresce in permanenza dall'alto verso il basso.",
          de:"Der sichtbare, senkrechte Teil des Hufs, der den Boden berührt und die Nägel aufnimmt. Er wächst ständig von oben nach unten.",
          ja:"蹄の垂直な、目に見える部分で、地面に接し釘を受ける場所。上から下へ絶えず伸び続けます。",
          ar:"الجزء العمودي الظاهر من الحافر، الذي يلمس الأرض ويستقبل المسامير. ينمو باستمرار، من الأعلى إلى الأسفل." } },

  { ref:"sole", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"la sole"}, en:{m:"the sole", p:"sôl"},
           es:{m:"la suela"}, it:{m:"la suola"},
           de:{m:"die Hornsohle", p:"horn-zô-le"}, ja:{m:"蹄底", p:"teitei"},
           ar:{m:"باطن الحافر"} },
    def:{ fr:"La face inférieure du sabot, légèrement concave, qui protège les tissus sensibles. ⚠️ Trois mots à distinguer : une sole **fine** (peu d'épaisseur, sensible aux cailloux), une sole **sensible** (qui réagit à la pince du maréchal, signe d'alerte) et une sole **friable** (qui s'effrite, souvent un problème de qualité de corne).",
          en:"The slightly concave underside of the hoof, protecting sensitive tissue. Three words to tell apart: a **thin** sole, a **sensitive** sole (reacts to hoof testers, a warning sign) and a **crumbly** sole (poor horn quality).",
          es:"⚠️ La cara inferior del casco, ligeramente cóncava, que protege los tejidos sensibles. Tres palabras a distinguir: una suela **fina**, una suela **sensible** (reacciona a las pinzas del herrador) y una suela **friable** (se desmorona).",
          it:"⚠️ La faccia inferiore dello zoccolo, leggermente concava, che protegge i tessuti sensibili. Tre parole da distinguere: una suola **sottile**, una suola **sensibile** (reagisce al pinzone del maniscalco) e una suola **friabile** (si sgretola).",
          de:"⚠️ Die leicht gewölbte Unterseite des Hufs, die empfindliches Gewebe schützt. Drei Begriffe zu unterscheiden: eine **dünne** Sohle, eine **empfindliche** Sohle (reagiert auf die Hufuntersuchzange) und eine **bröckelige** Sohle (schlechte Hornqualität).",
          ja:"⚠️ 蹄のわずかに凹んだ底面で、敏感な組織を守っています。区別すべき三つの言葉：**薄い**蹄底、**敏感な**蹄底（装蹄鉗子に反応する、警戒サイン）、**もろい**蹄底（崩れやすい、角質の質の問題）。",
          ar:"السطح السفلي للحافر، وهو مقعر قليلا ويحمي الأنسجة الحساسة. ⚠️ يجب التمييز بين ثلاثة أوصاف: باطن **رقيق** (قليل السماكة وحساس للحصى)، وباطن **حساس** (يستجيب للضغط بكماشة فحص الحافر، وهي علامة تستدعي الانتباه)، وباطن **هش** (يتفتت وغالبا ما يشير إلى ضعف في جودة القرن)." } },

  { ref:"fourchette", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"la fourchette"}, en:{m:"the frog", p:"frog"},
           es:{m:"la ranilla"}, it:{m:"la forchetta"},
           de:{m:"der Strahl", p:"chtraal"}, ja:{m:"蹄叉", p:"teisa"},
           ar:{m:"نسر الحافر"} },
    def:{ fr:"La structure élastique en V au centre de la sole, qui amortit et draine. ⚠️ « La fourchette pourrit » (la **fourchette pourrie**, thrush en anglais) désigne une infection humide et malodorante, très fréquente en box mal curé — à signaler, jamais à laisser traîner.",
          en:"The elastic, V-shaped structure at the centre of the sole, which cushions and drains. **Thrush** — a smelly, wet infection — is common in poorly mucked-out stables and should never be left untreated.",
          es:"⚠️ La estructura elástica en V en el centro de la suela, que amortigua y drena. La **ranilla podrida** (thrush) es una infección húmeda y maloliente, muy frecuente en un box mal limpiado.",
          it:"⚠️ La struttura elastica a V al centro della suola, che ammortizza e drena. La **forchetta marcia** (thrush) è un'infezione umida e maleodorante, molto frequente in un box mal pulito.",
          de:"⚠️ Die elastische, V-förmige Struktur in der Mitte der Sohle, die dämpft und entwässert. **Strahlfäule** ist eine feuchte, übelriechende Infektion, häufig bei schlecht ausgemisteten Boxen.",
          ja:"蹄底の中央にあるV字形の弾力性のある構造で、衝撃を吸収し排水します。⚠️ 「蹄叉腐乱」（thrush）は湿った悪臭のする感染症で、清掃の悪い馬房でよく見られます — 放置してはいけません。",
          ar:"البنية المرنة على شكل V في وسط باطن الحافر، وتساعد على امتصاص الصدمات وتصريف الرطوبة. ⚠️ «تعفن نسر الحافر» (thrush بالإنجليزية) عدوى رطبة كريهة الرائحة، شائعة جدا في الحظائر سيئة التنظيف — يجب الإبلاغ عنها وعدم تركها من دون علاج." } },

  { ref:"ligne-blanche", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"la ligne blanche"}, en:{m:"the white line", p:"ouaïte laïn"},
           es:{m:"la línea blanca"}, it:{m:"la linea bianca"},
           de:{m:"die weiße Linie", p:"vaï-se li-nie"}, ja:{m:"白線", p:"hakusen"},
           ar:{m:"الخط الأبيض"} },
    def:{ fr:"La jonction, visible sous le pied, entre la paroi et la sole — le repère du maréchal pour placer les clous sans piquer. ⚠️ La **maladie de la ligne blanche** est une infection fongique qui décolle la paroi de l'intérieur ; elle se voit d'abord comme un petit trou noirâtre à cette jonction.",
          en:"The join, visible on the sole, between the wall and the sole — the farrier's landmark for placing nails without pricking. **White line disease** is a fungal infection that separates the wall from inside, first seen as a small dark hole at the junction.",
          es:"⚠️ La unión, visible bajo el pie, entre la muralla y la suela — la referencia del herrador para colocar los clavos sin pinchar. La **enfermedad de la línea blanca** es una infección fúngica que despega la muralla desde dentro.",
          it:"⚠️ La giunzione, visibile sotto il piede, tra la muraglia e la suola — il riferimento del maniscalco per posizionare i chiodi senza pungere. La **malattia della linea bianca** è un'infezione fungina che stacca la muraglia dall'interno.",
          de:"⚠️ Der unter dem Fuß sichtbare Übergang zwischen Wand und Sohle — der Orientierungspunkt des Hufschmieds, um Nägel ohne Vernageln zu setzen. Die **Weiße-Linie-Krankheit** ist eine Pilzinfektion, die die Wand von innen löst.",
          ja:"⚠️ 蹄底に見える、蹄壁と蹄底の接合部 — 装蹄師が釘を刺さずに打つための目印。「白線病」は真菌感染で、内側から蹄壁を剥離させます。最初は接合部の小さな黒い穴として現れます。",
          ar:"منطقة الاتصال الظاهرة أسفل الحافر بين الجدار والباطن — وهي دليل حداد الخيل عند وضع المسامير لتجنب إصابة الأنسجة الحساسة. ⚠️ **مرض الخط الأبيض** عدوى تصيب هذه المنطقة وتؤدي إلى انفصال جدار الحافر من الداخل؛ وقد تظهر أولا على شكل تجويف صغير داكن عند هذا الاتصال." } },

  { ref:"pince", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"la pince"}, en:{m:"the toe", p:"tô"},
           es:{m:"la pinza"}, it:{m:"la punta"},
           de:{m:"die Zehe", p:"tsé-e"}, ja:{m:"爪先", p:"tsumasaki"},
           ar:{m:"مقدمة الحافر"} }, // ??
    def:{ fr:"La partie avant du sabot, dans l'axe du pied. C'est là que se règle l'appui au décollé du pas — un point que le rolling (voir plus bas) vient justement corriger.",
          en:"The front part of the hoof, in line with the leg. This is where breakover happens — the point rolled toes are designed to ease.",
          es:"La parte delantera del casco, en el eje de la pata. Ahí se ajusta el apoyo en el momento de despegar el paso.",
          it:"La parte anteriore dello zoccolo, in asse con la gamba. È lì che si regola l'appoggio nel momento del distacco del passo.",
          de:"Der vordere Teil des Hufs, in der Achse des Beins. Dort erfolgt das Abrollen des Schritts.",
          ja:"脚の軸に沿った蹄の前部分。歩行時に地面から離れる瞬間の支点となる場所です。",
          ar:"الجزء الأمامي من الحافر، في محور القدم. ومن هذه المنطقة يبدأ انفصال الحافر عن الأرض أثناء الخطوة — وهو ما يساعد تدوير المقدمة (انظري أدناه) على تسهيله." } },

  { ref:"talons", lecon:1, coll:"anatomie",
    mots:{ fr:{m:"les talons"}, en:{m:"the heels", p:"hilz"},
           es:{m:"los talones"}, it:{m:"i talloni"},
           de:{m:"die Trachten", p:"trakh-teune"}, ja:{m:"踵", p:"kakato"},
           ar:{m:"عقبا الحافر"} }, // ??
    def:{ fr:"L'arrière du sabot, de part et d'autre de la fourchette. Bas et écrasés, ils manquent de soutien ; hauts et resserrés, ils manquent de souplesse.",
          en:"The back of the hoof, either side of the frog. Low and crushed heels lack support; high and contracted heels lack flexibility.",
          es:"La parte trasera del casco, a ambos lados de la ranilla. Bajos y aplastados, les falta soporte; altos y cerrados, les falta flexibilidad.",
          it:"La parte posteriore dello zoccolo, ai due lati della forchetta. Bassi e schiacciati, mancano di sostegno; alti e stretti, mancano di flessibilità.",
          de:"Der hintere Teil des Hufs, beidseits des Strahls. Niedrige, gequetschte Trachten fehlt es an Stütze; hohe, enge Trachten fehlt es an Flexibilität.",
          ja:"蹄叉の両側にある、蹄の後方部分。低く潰れていると支えが不足し、高く狭まっていると柔軟性が不足します。",
          ar:"مؤخرة الحافر، على جانبي النسر. إذا كانا منخفضين ومنبسطين نقص الدعم؛ وإذا كانا مرتفعين ومتقاربين نقصت المرونة." } },

  /* ============ PARAGE ET FERRURE ============ */

  { ref:"parage", lecon:1, coll:"parage-ferrure",
    mots:{ fr:{m:"le parage"}, en:{m:"trimming", p:"trim-ming", var:"hoof trimming"},
           es:{m:"el recorte"}, it:{m:"il pareggio"},
           de:{m:"die Hufbearbeitung", p:"houf-be-ar-baï-toung"}, ja:{m:"削蹄", p:"sakutei"},
           ar:{m:"تقليم الحافر"} },
    def:{ fr:"L'action de rééquilibrer le pied en retirant l'excédent de corne, toujours faite avant de ferrer — ou seule, chez un cheval pieds nus. Un pied bien paré est la base de tout le reste.",
          en:"Rebalancing the foot by removing excess horn, always done before shoeing — or on its own, for a barefoot horse. A well-trimmed foot is the foundation for everything else.",
          es:"La acción de reequilibrar el pie retirando el exceso de córnea, siempre hecha antes de herrar — o sola, en un caballo descalzo. Un pie bien recortado es la base de todo lo demás.",
          it:"L'azione di riequilibrare il piede rimuovendo l'eccesso di corneo, sempre fatta prima di ferrare — o da sola, su un cavallo scalzo. Un piede ben pareggiato è la base di tutto il resto.",
          de:"Das Ausgleichen des Hufs durch Entfernen von überschüssigem Horn, immer vor dem Beschlagen — oder allein, bei einem barhuf gehenden Pferd. Ein gut bearbeiteter Huf ist die Grundlage für alles andere.",
          ja:"余分な角質を取り除いて蹄のバランスを整える作業。装蹄の前には必ず行い、裸蹄の馬ではこれだけを行います。よく削られた蹄が、すべての土台になります。",
          ar:"إعادة توازن الحافر بإزالة القرن الزائد، وتجرى دائما قبل تركيب الحدوة — أو تكون الإجراء الوحيد عند الحصان غير المنتعل. والحافر المقلم جيدا هو أساس كل ما يأتي بعد ذلك." } },

  { ref:"parer-pied", lecon:1, coll:"parage-ferrure",
    mots:{ fr:{m:"parer"}, en:{m:"to trim", p:"trim"},
           es:{m:"recortar"}, it:{m:"pareggiare"},
           de:{m:"die Hufe bearbeiten", p:"houf-be-ar-baï-teune"}, ja:{m:"削蹄する", p:"sakutei suru"},
           ar:{m:"التقليم"} },
    def:{ fr:"Le verbe de l'action décrite par le parage.",
          en:"The verb for what trimming does.",
          es:"El verbo de la acción descrita por el recorte.",
          it:"Il verbo dell'azione descritta dal pareggio.",
          de:"Das Verb zur Hufbearbeitung.",
          ja:"削蹄という作業を表す動詞。",
          ar:"إزالة القرن الزائد وإعادة توازن الحافر؛ وهو الفعل الذي نسمي نتيجته «تقليم الحافر»." } },

  { ref:"ferrer", lecon:1, coll:"parage-ferrure",
    mots:{ fr:{m:"ferrer"}, en:{m:"to shoe", p:"chô"},
           es:{m:"herrar"}, it:{m:"ferrare"},
           de:{m:"beschlagen", p:"be-chla-gueune"}, ja:{m:"装蹄する", p:"sōtei suru"},
           ar:{m:"تركيب الحدوة"} },
    def:{ fr:"Poser un fer. ⚠️ Le mot général est **ferrure** (shoeing). **Referrer**, c'est remettre un fer déjà posé (to refit) ; **déferrer**, c'est le retirer sans en remettre un autre (to remove/pull a shoe). Un fer se pose à l'**antérieur** (front shoe) comme au **postérieur** (hind shoe) — leur forme diffère, et un maréchal expérimenté peut exceptionnellement adapter un fer de postérieur à un antérieur pour corriger un aplomb particulier.",
          en:"To fit a shoe. **Shoeing** is the general word. To **refit** a shoe means putting one back on that was already there; to **pull** a shoe means removing it without replacing it. Shoes come in **front** and **hind** patterns — a farrier may occasionally fit a hind pattern to a front foot to correct a particular conformation.",
          es:"⚠️ Poner una herradura. La palabra general es **herraje** (shoeing). **Reherrar** es volver a poner una herradura ya colocada; **desherrar** es retirarla sin poner otra. Hay herraduras de **anterior** y de **posterior**.",
          it:"⚠️ Applicare un ferro. La parola generale è **ferratura** (shoeing). **Riferrare** significa rimettere un ferro già applicato; **sferrare** significa toglierlo senza rimetterne un altro. Ci sono ferri **anteriori** e **posteriori**.",
          de:"⚠️ Ein Eisen anbringen. Das allgemeine Wort ist **Beschlag**. **Neu beschlagen** heißt ein Eisen erneut anbringen; **ausschuhen** heißt es entfernen, ohne ein neues aufzuziehen. Es gibt **Vorder-** und **Hintereisen**.",
          ja:"蹄鉄を打つこと。総称は「装蹄」。既に着けていた蹄鉄を打ち直すことを「つけ直し」、外して次を着けないことを「脱蹄」と言います。前肢用と後肢用の蹄鉄は形が異なります。",
          ar:"تركيب حدوة على الحافر. ⚠️ المصطلح العام هو **تركيب الحدوات** (shoeing). **إعادة تركيب الحدوة** تعني إعادة وضع حدوة سبق تركيبها (to refit)، أما **نزع الحدوة** فيعني إزالتها من دون تركيب أخرى (to remove/pull a shoe). وتختلف حدوة القائمة **الأمامية** (front shoe) عن حدوة القائمة **الخلفية** (hind shoe) في شكلها؛ وقد يعدل حداد خبير، في حالات خاصة، حدوة خلفية لتناسب قائمة أمامية بهدف تصحيح وضع معين." } },

  /* ============ CLOUS, PINÇONS ET GARNITURE ============ */

  { ref:"clou-fer", lecon:1, coll:"clous",
    mots:{ fr:{m:"le clou"}, en:{m:"the nail", p:"nél", var:"horseshoe nail"},
           es:{m:"el clavo"}, it:{m:"il chiodo"},
           de:{m:"der Hufnagel", p:"houf-na-gueul"}, ja:{m:"蹄鉄釘", p:"teitetsukugi"},
           ar:{m:"المسمار"} },
    def:{ fr:"Ce qui fixe le fer à la paroi, jamais à la sole. ⚠️ Deux mots à ne pas confondre : un clou **trop près** (close nail) suit un trajet dangereusement proche des tissus sensibles sans les toucher — ça peut suffire à faire boiter ; un clou **qui pique** (nail prick) va plus loin et touche réellement le vif. Ce sont deux degrés de la même faute, pas la même chose.",
          en:"What fixes the shoe to the wall, never to the sole. Two words not to confuse: a **close** nail runs dangerously near sensitive tissue without touching it; a **prick** actually touches it. Two degrees of the same mistake, not the same thing.",
          es:"⚠️ Lo que fija la herradura a la muralla, nunca a la suela. Dos palabras a no confundir: un clavo **cerca** pasa peligrosamente cerca del tejido sensible sin tocarlo; un clavo que **pincha** lo toca realmente.",
          it:"⚠️ Ciò che fissa il ferro alla muraglia, mai alla suola. Due parole da non confondere: un chiodo **vicino** passa pericolosamente vicino al tessuto sensibile senza toccarlo; un chiodo che **punge** lo tocca realmente.",
          de:"⚠️ Was das Eisen an der Wand befestigt, nie an der Sohle. Zwei Begriffe: ein **naher** Nagel verläuft gefährlich nah am empfindlichen Gewebe, ohne es zu berühren; ein **vernagelter** Huf bedeutet, dass der Nagel es tatsächlich trifft.",
          ja:"蹄鉄を蹄壁に固定するもので、蹄底には決して打ちません。⚠️ 混同しないための二つの言葉：「近すぎる釘」は敏感な組織のすぐ近くを通るが触れていない状態、「刺さった釘」は実際に触れてしまった状態です。",
          ar:"يثبت المسمار الحدوة في جدار الحافر، ولا يدخل في الباطن أبدا. ⚠️ يجب التمييز بين حالتين: المسمار **القريب جدا** (close nail) يمر على مسافة خطرة من الأنسجة الحساسة من دون أن يصيبها — وقد يكون ذلك كافيا لإحداث العرج؛ أما المسمار **الواخز** (nail prick) فيصيب الأنسجة الحية فعلا. هما درجتان مختلفتان من الخطأ نفسه، وليستا الحالة نفسها." } },

  { ref:"pincon", lecon:1, coll:"clous",
    mots:{ fr:{m:"le pinçon"}, en:{m:"the clip", p:"klip"},
           es:{m:"la pestaña", p:"pess-ta-gna"}, it:{m:"la brida"}, // ??
           de:{m:"die Kappe", p:"ka-pe", var:"Nagelkappe"}, ja:{m:"クリップ", p:"kurippu"},
           ar:{m:"لسان الحدوة"} }, // ??
    def:{ fr:"Le petit relief remonté du fer contre la paroi, qui l'empêche de glisser. Il peut être placé en pince (devant) ou sur les côtés.",
          en:"The small tab drawn up from the shoe against the wall, stopping it from sliding. It can sit at the toe or on the sides.",
          es:"El pequeño relieve levantado de la herradura contra la muralla, que impide que resbale. Puede ir en la pinza o en los lados.",
          it:"Il piccolo rilievo sollevato dal ferro contro la muraglia, che ne impedisce lo scivolamento. Può essere posto in punta o sui lati.",
          de:"Die kleine, aus dem Eisen hochgezogene Kappe gegen die Wand, die ein Verrutschen verhindert. Sie kann vorn oder seitlich sitzen.",
          ja:"蹄鉄から蹄壁に沿って立ち上げられた小さな出っ張りで、ずれを防ぎます。爪先側にも側面にも配置できます。",
          ar:"لسان معدني صغير يرتفع من الحدوة بمحاذاة جدار الحافر ويساعد على منع الحدوة من التحرك. ويمكن أن يكون في المقدمة أو على الجانبين." } },

  { ref:"pincon-pince", lecon:1, coll:"clous",
    mots:{ fr:{m:"le pinçon en pince"}, en:{m:"toe clip", p:"tô klip"},
           es:{m:"la pestaña de pinza"}, it:{m:"la brida di punta"}, // ??
           de:{m:"die Zehenkappe", p:"tsé-eune-ka-pe"}, ja:{m:"トゥークリップ", p:"tsū kurippu"},
           ar:{m:"اللسان الأمامي"} },
    def:{ fr:"Le pinçon placé en pince, au centre de l'avant du fer — l'option la plus classique.",
          en:"A clip placed at the centre of the toe — the most classic option.",
          es:"La pestaña colocada en la pinza, en el centro de la parte delantera de la herradura — la opción más clásica.",
          it:"La brida posta in punta, al centro della parte anteriore del ferro — l'opzione più classica.",
          de:"Die Kappe mittig an der Zehe des Eisens — die klassischste Option.",
          ja:"蹄鉄の前部中央、爪先に配置されたクリップ — 最も古典的な選択肢。",
          ar:"اللسان الموضوع في المقدمة، في وسط مقدم الحدوة — وهو الخيار الأكثر شيوعا." } },

  { ref:"pincons-lateraux", lecon:1, coll:"clous",
    mots:{ fr:{m:"les pinçons latéraux"}, en:{m:"side clips", p:"saïde klips", var:"quarter clips"},
           es:{m:"las pestañas laterales"}, it:{m:"le bride laterali"}, // ??
           de:{m:"die Seitenkappen", p:"zaï-teune-ka-peune"}, ja:{m:"サイドクリップ", p:"saido kurippu"},
           ar:{m:"اللسانان الجانبيان"} },
    def:{ fr:"Deux pinçons placés sur les côtés du fer plutôt qu'en pince. ⚠️ Un fer qui porte ces deux pinçons se dit « à deux pinçons » — l'option souvent choisie pour ne pas gêner la pince, par exemple avant un rolling.",
          en:"Two clips placed on the sides of the shoe instead of the toe. A shoe with this pair is called a « shoe with side clips » — often chosen to leave the toe free, for instance before a rolled toe.",
          es:"Dos pestañas colocadas en los lados de la herradura en lugar de en la pinza. Una herradura con este par se dice « de dos pestañas » — a menudo elegida para no molestar la pinza.",
          it:"Due bride poste sui lati del ferro invece che in punta. Un ferro con questa coppia si dice « a due bride » — spesso scelto per non disturbare la punta.",
          de:"Zwei Kappen seitlich am Eisen statt an der Zehe. Ein Eisen mit diesem Paar heißt « Eisen mit Seitenkappen » — oft gewählt, um die Zehe frei zu lassen.",
          ja:"爪先ではなく蹄鉄の両側に配置された二つのクリップ。この組み合わせを持つ蹄鉄は「サイドクリップ付き」と呼ばれ、爪先を空けておきたいとき（ロールドトゥの前など）によく選ばれます。",
          ar:"لسانان يوضعان على جانبي الحدوة بدلا من المقدمة. ⚠️ الحدوة التي تحملهما تسمى «ذات لسانين» — وهو الخيار الذي يفضل غالبا لعدم إعاقة المقدمة، قبل تدوير المقدمة مثلا." } },

  { ref:"garniture", lecon:1, coll:"clous",
    mots:{ fr:{m:"la garniture"}, en:{m:"fullness", p:"foul-ness", var:"support"},
           es:{m:"el asiento"}, it:{m:"il supporto"}, // ??
           de:{m:"die Auflagefläche"}, ja:{m:"支持面"},
           ar:{m:"بروز الحدوة"} }, // ??
    def:{ fr:"⚠️ Pas de traduction unique et rigide — c'est la largeur de fer laissée qui dépasse la paroi, pour offrir plus de soutien. Une garniture large aide un pied fragile ; trop large, elle accroche et augmente le risque d'arrachement.",
          en:"⚠️ No single fixed translation — it is the width of shoe left beyond the wall, for extra support. Generous fullness helps a weak foot; too much and the shoe catches and risks being pulled off.",
          es:"⚠️ Sin traducción única y fija — es la anchura de herradura dejada más allá de la muralla, para dar más soporte. Un asiento amplio ayuda a un pie frágil.",
          it:"⚠️ Nessuna traduzione unica e fissa — è la larghezza del ferro lasciata oltre la muraglia, per dare più supporto. Un supporto ampio aiuta un piede fragile.",
          de:"⚠️ Keine einzige feste Übersetzung — es ist die über die Wand hinausragende Eisenbreite, für zusätzliche Stütze. Viel Auflagefläche hilft einem schwachen Huf.",
          ja:"⚠️ 決まった一つの訳語はありません — 蹄壁より外側に残された蹄鉄の幅で、より多くの支えを与えます。幅が広いと弱い蹄を助けますが、広すぎると引っかかりやすくなります。",
          ar:"⚠️ لا يوجد لها مقابل عربي واحد ثابت — والمقصود هو مقدار بروز الحدوة خارج جدار الحافر لتوفير دعم إضافي. وقد يفيد البروز الأكبر الحافر الذي يحتاج إلى مزيد من الدعم؛ لكن إذا كان مفرطا فقد يعلق بالأرض ويزيد خطر اقتلاع الحدوة." } },

  { ref:"rolling", lecon:1, coll:"clous",
    mots:{ fr:{m:"le rolling"}, en:{m:"rolled toe", p:"rôld tô"},
           es:{m:"la pinza redondeada"}, it:{m:"la punta arrotondata"},
           de:{m:"die abgerundete Zehe"}, ja:{m:"ロールドトゥ", p:"rōrudo tō"},
           ar:{m:"تدوير المقدمة"} }, // ??
    def:{ fr:"Une pince de fer arrondie plutôt que plate, qui facilite le décollé du pas. ⚠️ À ne pas confondre avec le **rocker toe** : le rolling arrondit le bord, le rocker toe relève toute la pince selon un angle — deux réglages voisins mais distincts, à préciser au maréchal si le cas s'y prête.",
          en:"A rounded rather than flat toe on the shoe, which eases breakover. Not to be confused with a **rocker toe**: rolling rounds the edge, a rocker toe lifts the whole toe at an angle — related but distinct adjustments.",
          es:"Una pinza de herradura redondeada en lugar de plana, que facilita el despegue del paso. ⚠️ No confundir con el **rocker toe**: distinto del redondeado simple.",
          it:"Una punta di ferro arrotondata invece che piatta, che facilita il distacco del passo. ⚠️ Da non confondere con il **rocker toe**: diverso dal semplice arrotondamento.",
          de:"Eine abgerundete statt flache Zehe am Eisen, die das Abrollen erleichtert. ⚠️ Nicht mit dem **Rocker Toe** zu verwechseln — verwandt, aber verschieden.",
          ja:"蹄鉄の爪先を平らではなく丸く仕上げたもので、踏み出しを助けます。⚠️「ロッカートゥ」と混同しないこと — 似ていますが別の調整です。",
          ar:"تدوير الحافة الأمامية للحدوة بدل تركها مسطحة، لتسهيل انفصال الحافر عن الأرض. ⚠️ لا تخلطي بينه وبين **rocker toe**: ففي rolling تدور الحافة الأمامية، أما rocker toe فترفع فيه المقدمة كلها بزاوية. هما تعديلان متقاربان لكن مختلفان، ويجب تحديد المطلوب لحداد الخيل بحسب الحالة." } },

  /* ============ CRAMPONS ============ */

  { ref:"mortaise-crampon", lecon:1, coll:"crampons",
    mots:{ fr:{m:"la mortaise à crampon"}, en:{m:"stud hole", p:"steude hôl"},
           es:{m:"el orificio para tacos"}, it:{m:"il foro per i ramponi"}, // ??
           de:{m:"das Stollenloch", p:"chto-leune-lokh"}, ja:{m:"スタッドホール", p:"sutaddo hōru"},
           ar:{m:"ثقب التثبيت في الحدوة"} }, // ??
    def:{ fr:"Le trou percé dans le fer pour visser un crampon. Une mortaise vide se bouche avec un tampon, pour ne pas s'encrasser.",
          en:"The hole drilled in the shoe to screw in a stud. An empty stud hole is plugged to keep it clean.",
          es:"El orificio perforado en la herradura para atornillar un taco. Un orificio vacío se tapa para que no se ensucie.",
          it:"Il foro praticato nel ferro per avvitare un rampone. Un foro vuoto si tappa per non incrostarsi.",
          de:"Das ins Eisen gebohrte Loch zum Einschrauben eines Stollens. Ein leeres Stollenloch wird verschlossen, damit es nicht verschmutzt.",
          ja:"スタッドをねじ込むために蹄鉄に開けられた穴。空の穴は汚れないよう栓をします。",
          ar:"ثقب ملولب في الحدوة يثبت فيه مسمار منع الانزلاق. وعندما لا يستخدم، يغلق بسدادة لمنع تراكم الأوساخ داخله." } },

  { ref:"tarauder-mortaise", lecon:1, coll:"crampons",
    mots:{ fr:{m:"tarauder"}, en:{m:"to tap", p:"tap", var:"a stud hole"},
           es:{m:"roscar"}, it:{m:"filettare"},
           de:{m:"gewinden", p:"gue-vin-deune"}, ja:{m:"ねじ切りする", p:"neji-giri suru"},
           ar:{m:"التسنين"} }, // ??
    def:{ fr:"Creuser le filetage à l'intérieur de la mortaise pour que le crampon s'y visse. Sans ce filetage, aucun crampon ne tient.",
          en:"Cutting the internal thread inside the stud hole so a stud can screw in. Without it, no stud will hold.",
          es:"Cortar la rosca interior del orificio para que el taco se pueda atornillar. Sin esa rosca, ningún taco se sostiene.",
          it:"Ricavare la filettatura interna del foro perché il rampone possa avvitarsi. Senza questa filettatura, nessun rampone tiene.",
          de:"Das Innengewinde im Stollenloch schneiden, damit der Stollen eingeschraubt werden kann. Ohne dieses Gewinde hält kein Stollen.",
          ja:"クランポンをねじ込めるように、穴の内側にねじ山を切ること。これがなければクランポンは固定できません。",
          ar:"إنشاء سن لولبي داخل الثقب حتى يمكن تثبيت مسمار منع الانزلاق فيه. ومن دون هذا السن لا يمكن ربط المسمار بإحكام." } },

  { ref:"crampon", lecon:1, coll:"crampons",
    mots:{ fr:{m:"le crampon"}, en:{m:"the stud", p:"steude"},
           es:{m:"el taco"}, it:{m:"il rampone"},
           de:{m:"der Stollen", p:"chto-leune"}, ja:{m:"スタッド", p:"sutaddo"},
           ar:{m:"مسمار منع الانزلاق"} },
    def:{ fr:"Une pièce vissée dans le fer pour améliorer l'accroche sur un terrain gras ou glissant. On le retire après usage, on ne le laisse jamais en permanence.",
          en:"A screw-in piece added to the shoe for extra grip on wet or slippery ground. Removed after use, never left in permanently.",
          es:"Una pieza atornillada en la herradura para mejorar el agarre en un terreno graso o resbaladizo. Se retira después del uso.",
          it:"Un pezzo avvitato nel ferro per migliorare la presa su un terreno grasso o scivoloso. Si toglie dopo l'uso.",
          de:"Ein ins Eisen geschraubtes Teil für besseren Halt auf nassem oder rutschigem Boden. Wird nach Gebrauch entfernt, nie dauerhaft gelassen.",
          ja:"ぬかるんだ、または滑りやすい地面でのグリップを高めるため蹄鉄にねじ込む部品。使用後は外し、常時つけたままにはしません。",
          ar:"قطعة معدنية تثبت باللولب في الحدوة لتحسين الثبات على أرض لينة أو زلقة. وتنزع بعد الاستخدام ولا تترك مركبة بصورة دائمة." } },

  /* ============ PROBLÈMES COURANTS ============ */

  { ref:"fer-perdu", lecon:1, coll:"problemes",
    mots:{ fr:{m:"un fer perdu"}, en:{m:"a lost shoe", p:"lost chô", var:"to lose a shoe"},
           es:{m:"perder una herradura"}, it:{m:"perdere un ferro"},
           de:{m:"das Eisen verlieren"}, ja:{m:"蹄鉄が外れる", p:"teitetsu ga hazureru"},
           ar:{m:"حدوة مفقودة"} },
    def:{ fr:"Le fer s'est détaché entièrement, souvent en extérieur sur terrain accrocheur. Le pied nu qui reste doit être protégé et le maréchal prévenu sans attendre le prochain rendez-vous.",
          en:"The shoe has come off entirely, often outdoors on grabby ground. The bare foot must be protected and the farrier told without waiting for the next appointment.",
          es:"La herradura se ha soltado por completo, a menudo en exterior sobre terreno que se agarra. El pie descalzo debe protegerse y avisar al herrador sin esperar la próxima cita.",
          it:"Il ferro si è staccato completamente, spesso all'aperto su terreno che si aggrappa. Il piede scalzo va protetto e il maniscalco avvisato senza aspettare il prossimo appuntamento.",
          de:"Das Eisen hat sich vollständig gelöst, oft im Gelände auf zähem Boden. Der bloße Huf muss geschützt und der Hufschmied ohne Verzug informiert werden.",
          ja:"蹄鉄が完全に外れてしまった状態で、粘りのある地面での外乗中によく起こります。裸になった蹄は保護し、次の予約を待たずに装蹄師に連絡する必要があります。",
          ar:"حدوة انفصلت بالكامل عن الحافر، ويحدث ذلك كثيرا في الخارج على أرض تمسك بالحافر. يجب حماية الحافر الذي أصبح عاريا وإبلاغ حداد الخيل من دون انتظار الموعد التالي." } },

  { ref:"fer-bouge", lecon:1, coll:"problemes",
    mots:{ fr:{m:"un fer qui bouge"}, en:{m:"a loose shoe", p:"lousse chô"},
           es:{m:"una herradura suelta"}, it:{m:"un ferro allentato"},
           de:{m:"ein lockeres Eisen"}, ja:{m:"蹄鉄が緩い", p:"teitetsu ga yurui"},
           ar:{m:"حدوة متخلخلة"} },
    def:{ fr:"Le fer tient encore mais commence à se desceller — souvent un clou qui a cédé. Signe d'alerte à ne pas ignorer : il finit toujours en fer perdu, au pire moment.",
          en:"The shoe still holds but is starting to work loose — often one nail giving way. A warning sign not to ignore: it always ends as a lost shoe, at the worst moment.",
          es:"La herradura todavía se sostiene pero empieza a soltarse — a menudo un clavo que ha cedido. Señal de alerta a no ignorar: siempre termina en herradura perdida, en el peor momento.",
          it:"Il ferro tiene ancora ma comincia a scollarsi — spesso un chiodo che ha ceduto. Segnale d'allarme da non ignorare: finisce sempre in ferro perso, nel momento peggiore.",
          de:"Das Eisen hält noch, beginnt sich aber zu lösen — oft ein nachgebender Nagel. Ein Warnzeichen, das man nicht ignorieren sollte: es endet immer als verlorenes Eisen, im ungünstigsten Moment.",
          ja:"蹄鉄はまだ着いているが緩み始めている状態 — 多くは釘が一本外れかけています。無視してはいけない警告サインで、放っておくと必ず最悪のタイミングで完全に外れます。",
          ar:"ما زالت الحدوة في مكانها لكنها بدأت تتحرك — وغالبا بسبب مسمار ارتخى أو لم يعد يثبتها جيدا. إنها علامة تحذير لا ينبغي تجاهلها، لأنها قد تنتهي بفقدان الحدوة في أسوأ وقت." } },

  /* ============ PIEDS NUS ET ALTERNATIVES ============ */

  { ref:"pieds-nus", lecon:1, coll:"alternatives",
    mots:{ fr:{m:"pieds nus"}, en:{m:"barefoot", p:"bèr-foute"},
           es:{m:"descalzo"}, it:{m:"scalzo"},
           de:{m:"barhuf", p:"bar-houf"}, ja:{m:"裸蹄", p:"ratei"},
           ar:{m:"الحوافر العارية"} },
    def:{ fr:"Un cheval sans fers, parfaitement possible à condition d'un parage régulier — parer un pied nu demande d'ailleurs plus de précision, pas moins, puisqu'il n'y a pas de fer pour compenser un défaut. ⚠️ Ce chapitre ne présente pas le pied nu comme meilleur ni moins bon que la ferrure : c'est un choix, adapté au cheval, au terrain et au travail demandé. Un pied nu sur terrain dur ou abrasif s'use plus vite qu'il ne pousse — d'où l'intérêt des protections ci-dessous.",
          en:"A horse without shoes — entirely possible with regular trimming, which in fact demands more precision, not less, since there is no shoe to compensate a fault. ⚠️ This chapter does not present barefoot as better or worse than shoeing: it is a choice, suited to the horse, the ground and the work asked of it.",
          es:"⚠️ Un caballo sin herraduras, perfectamente posible con un recorte regular — que exige más precisión, no menos. Este capítulo no presenta el descalzo como mejor ni peor que el herraje: es una elección.",
          it:"⚠️ Un cavallo senza ferri, perfettamente possibile con un pareggio regolare — che richiede anzi più precisione, non meno. Questo capitolo non presenta lo scalzo come migliore o peggiore della ferratura: è una scelta.",
          de:"⚠️ Ein Pferd ohne Eisen — durchaus möglich bei regelmäßiger Hufbearbeitung, die sogar mehr statt weniger Präzision verlangt. Dieses Kapitel stellt Barhuf nicht als besser oder schlechter als Beschlag dar: Es ist eine Wahl.",
          ja:"⚠️ 蹄鉄を着けていない馬。定期的な削蹄があれば十分可能で、むしろ蹄鉄で欠点を補えない分、より高い精度が求められます。この章は裸蹄を装蹄より良い・悪いとは位置づけていません — それは選択です。",
          ar:"حصان من دون حدوات، وهو خيار ممكن تماما بشرط التقليم المنتظم — بل إن تقليم الحافر غير المنتعل يتطلب دقة كبيرة، إذ لا توجد حدوة تعوض أي خلل في التوازن. ⚠️ لا يقدم هذا الفصل الحافر غير المنتعل على أنه أفضل أو أسوأ من الحافر المنتعل: إنه خيار يتحدد بحسب الحصان والأرض وطبيعة العمل. وعلى أرض صلبة أو كاشطة قد يتآكل الحافر أسرع من نموه — ومن هنا تأتي فائدة وسائل الحماية المذكورة أدناه." } },

  { ref:"hipposandale", lecon:1, coll:"alternatives",
    mots:{ fr:{m:"l'hipposandale"}, en:{m:"the hoof boot", p:"houf boute"},
           es:{m:"la bota de casco"}, it:{m:"lo stivaletto"}, // ??
           de:{m:"der Hufschuh", p:"houf-chou"}, ja:{m:"蹄用ブーツ", p:"teiyō būtsu"},
           ar:{m:"حذاء الحافر"} }, // ??
    def:{ fr:"Une protection amovible enfilée sur un pied nu, pour une sortie ponctuelle sur terrain dur — sans les inconvénients d'un fer permanent. ⚠️ Deux autres options existent, à choisir avec le maréchal selon le cas : la **protection collée** (glue-on), fixée par adhésif plutôt que par des clous, et la **ferrure composite** (composite shoe), plus légère et plus souple qu'un fer en acier classique.",
          en:"A removable protection slipped over a bare foot for occasional work on hard ground — without the drawbacks of a permanent shoe. Two other options exist: **glue-on** protection, fixed with adhesive rather than nails, and **composite shoes**, lighter and more flexible than classic steel.",
          es:"Una protección desmontable que se coloca sobre un pie descalzo para una salida puntual en terreno duro. ⚠️ Otras dos opciones existen: la **protección pegada** (glue-on) y la **herradura compuesta** (composite).",
          it:"Una protezione amovibile infilata su un piede scalzo per un'uscita occasionale su terreno duro. ⚠️ Altre due opzioni esistono: la **protezione incollata** (glue-on) e la **ferratura composita** (composite).",
          de:"Ein abnehmbarer Schutz, der über einen bloßen Huf gezogen wird, für gelegentliche Arbeit auf hartem Boden. ⚠️ Zwei weitere Optionen: der **geklebte Schutz** (glue-on) und das **Komposit-Eisen** (composite).",
          ja:"裸蹄に一時的にかぶせる取り外し可能な保護具で、硬い地面での単発の外乗などに使います。⚠️ 他に二つの選択肢があります：釘ではなく接着剤で固定する「接着プロテクション」と、従来の鉄より軽く柔軟な「コンポジット蹄鉄」。",
          ar:"حذاء واق قابل للنزع يلبس على الحافر غير المنتعل، مثلا عند الخروج على أرض صلبة — من دون الحاجة إلى حدوة دائمة. ⚠️ وهناك خياران آخران يمكن اختيارهما مع حداد الخيل بحسب الحالة: **الحماية الملصقة** (glue-on)، التي تثبت بمادة لاصقة بدل المسامير، و**الحدوة المركبة** (composite shoe)، وهي أخف وأكثر مرونة من الحدوة الفولاذية التقليدية." } }

  ],

  /* ---- phrases complètes ---- */
  phrases: [],

  dialogue: {
    ville: "flyinge", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 24 phrases */

    phrases: [

      /* ---- temps 1 · le problème ---- */
      { ref:"d-fly-perdu-hier", temps:1, dit:"joueuse", mots:["fer-perdu"],
        fr:"Il a perdu son antérieur droit hier.",
        en:"He lost his right front shoe yesterday.",
        es:"Ayer perdió la herradura del anterior derecho.",
        it:"Ieri ha perso il ferro anteriore destro.",
        de:"Er hat gestern sein rechtes Vordereisen verloren.",
        ja:"昨日、右前の蹄鉄が外れて しまい ました。",
        ar:"فقد حدوته الأمامية اليمنى أمس." },

      { ref:"d-fly-gauche-bouge", temps:1, dit:"joueuse", mots:["fer-bouge"],
        fr:"Le fer gauche bouge aussi un peu.",
        en:"His left front shoe is a little loose as well.",
        es:"La herradura izquierda también está un poco suelta.",
        it:"Anche il ferro sinistro è un po' allentato.",
        de:"Das linke Eisen ist auch etwas locker.",
        ja:"左 の 蹄鉄 も 少し 緩ん で い ます。",
        ar:"الحدوة اليسرى متخلخلة قليلا أيضا." },

      { ref:"d-fly-tenir-cheval", temps:1, dit:"joueuse", mots:[], motsAilleurs:["marechal"],
        fr:"Tu veux que je te tienne le cheval ?",
        en:"Do you want me to hold the horse for you?",
        es:"¿Quieres que te sujete el caballo?",
        it:"Vuoi che ti tenga il cavallo?",
        de:"Soll ich dir das Pferd halten?",
        ja:"馬 を 押さえ ましょう か ?",
        ar:"أتريد أن أمسك لك الحصان؟" },

      { ref:"d-fly-donne-derriere", temps:1, dit:"club", mots:[],
        fr:"Il donne bien les antérieurs, mais il bouge davantage derrière.",
        en:"He's good with his front feet, but he moves around more behind.",
        es:"Da bien las manos, pero se mueve más de atrás.",
        it:"Dà bene gli anteriori, ma si muove di più dietro.",
        de:"Vorne gibt er die Füße gut, hinten bewegt er sich mehr.",
        ja:"前肢 は 素直 に 上げ ます が 、 後肢 は もっと 動き ます。",
        ar:"يرفع قائمتيه الأماميتين بسهولة، لكنه يتحرك أكثر عند رفع القائمتين الخلفيتين." },

      /* ---- temps 2 · le parage ---- */
      { ref:"d-fly-parer-avant", temps:2, dit:"joueuse", mots:["parage","ferrer"], motsAilleurs:["marechal"],
        fr:"Tu vas le parer avant de le referrer ?",
        en:"Are you going to trim him before you shoe him again?",
        es:"¿Lo vas a recortar antes de volver a herrarlo?",
        it:"Lo pareggi prima di riferrarlo?",
        de:"Bearbeitest du die Hufe, bevor du ihn neu beschlägst?",
        ja:"つけ直す 前 に 削蹄 し ます か ?",
        ar:"هل ستقلم الحافر قبل إعادة تركيب الحدوة؟" },

      { ref:"d-fly-sole-fine", temps:2, dit:"club", mots:["sole"],
        fr:"La sole est assez fine sur ce pied.",
        en:"The sole is quite thin on this foot.",
        es:"La suela está bastante fina en este pie.",
        it:"La suola è piuttosto sottile su questo piede.",
        de:"Die Sohle ist an diesem Huf recht dünn.",
        ja:"この 蹄 は 蹄底 が かなり 薄い です ね。",
        ar:"باطن الحافر رقيق نوعا ما في هذه القدم." },

      { ref:"d-fly-ligne-abimee", temps:2, dit:"club", mots:["ligne-blanche"],
        fr:"La ligne blanche est abîmée à cet endroit.",
        en:"The white line is damaged here.",
        es:"La línea blanca está dañada en este punto.",
        it:"La linea bianca è danneggiata in questo punto.",
        de:"Die weiße Linie ist hier beschädigt.",
        ja:"ここ の 白線 が 傷ん で い ます。",
        ar:"الخط الأبيض متضرر في هذا الموضع." },

      { ref:"d-fly-fourchette-pourrit", temps:2, dit:"club", mots:["fourchette"],
        fr:"La fourchette commence à pourrir.",
        en:"He's starting to get thrush in the frog.",
        es:"La ranilla está empezando a pudrirse.",
        it:"La forchetta comincia a marcire.",
        de:"Der Strahl fängt an zu faulen.",
        ja:"蹄叉 が 少し 腐り 始め て い ます。",
        ar:"بدأ النسر يتعفن." },

      /* ---- temps 3 · sensibilité et clous ---- */
      { ref:"d-fly-clou-trop-pres", temps:3, dit:"joueuse", mots:["clou-fer"],
        fr:"Ce clou est-il un peu trop près ?",
        en:"Is that nail a bit close?",
        es:"¿Ese clavo está un poco cerca?",
        it:"Questo chiodo è un po' vicino?",
        de:"Ist dieser Nagel etwas zu nah?",
        ja:"この 釘 、 ちょっと 近く あり ませ ん か ?",
        ar:"هل هذا المسمار قريب جدا بعض الشيء؟" },

      { ref:"d-fly-sensible-ferrure", temps:3, dit:"joueuse", mots:[], motsAilleurs:["fer"],
        fr:"Il est sensible depuis la dernière ferrure.",
        en:"He's been a bit sore since the last shoeing.",
        es:"Está sensible desde el último herraje.",
        it:"È sensibile dall'ultima ferratura.",
        de:"Er ist seit dem letzten Beschlag etwas empfindlich.",
        ja:"前回 の 装蹄 から 、 少し 敏感 な 様子 です。",
        ar:"أصبح حساسا منذ آخر تركيب للحدوات." },

      /* ---- temps 4 · les choix de ferrure ---- */
      { ref:"d-fly-pincon-ou-lateraux", temps:4, dit:"club", mots:["pincon-pince","pincons-lateraux"],
        fr:"Tu préfères un pinçon en pince ou deux pinçons latéraux ?",
        en:"Would you prefer a toe clip or two side clips?",
        es:"¿Prefieres una pestaña de pinza o dos pestañas laterales?",
        it:"Preferisci una brida di punta o due bride laterali?",
        de:"Möchtest du lieber eine Zehenkappe oder zwei Seitenkappen?",
        ja:"トゥークリップ と サイドクリップ 、 どちら が いい です か ?",
        ar:"أتفضل لسانا أماميا واحدا أم لسانين جانبيين؟" },

      { ref:"d-fly-soutien-talons", temps:4, dit:"joueuse", mots:["talons"],
        fr:"Je voudrais un peu plus de soutien en talons.",
        en:"I'd like a little more support at the heels.",
        es:"Me gustaría un poco más de soporte en los talones.",
        it:"Vorrei un po' più di sostegno ai talloni.",
        de:"Ich hätte gern etwas mehr Stütze an den Trachten.",
        ja:"踵 の 支え を もう 少し ほしい です。",
        ar:"أود مزيدا من الدعم عند العقبين." },

      { ref:"d-fly-plus-garniture", temps:4, dit:"joueuse", mots:["garniture"],
        fr:"Tu peux laisser un peu plus de garniture à l'extérieur ?",
        en:"Can you leave a little more fullness on the outside?",
        es:"¿Puedes dejar un poco más de asiento en el exterior?",
        it:"Puoi lasciare un po' più di supporto all'esterno?",
        de:"Kannst du außen etwas mehr Auflagefläche lassen?",
        ja:"外側 に もう 少し 支持 面 を 残せ ます か ?",
        ar:"هل يمكنك ترك بروز أكبر قليلا من الجهة الخارجية؟" },

      { ref:"d-fly-rolling-pince", temps:4, dit:"joueuse", mots:["rolling","pince"],
        fr:"Tu peux lui faire un rolling en pince ?",
        en:"Can you roll the toe a little more?",
        es:"¿Le puedes hacer un redondeado en la pinza?",
        it:"Puoi arrotondargli un po' la punta?",
        de:"Kannst du ihm die Zehe etwas abrunden?",
        ja:"爪先 を ロールド トゥ に し て もらえ ます か ?",
        ar:"هل يمكنك تدوير مقدمة الحدوة له؟" },

      { ref:"d-fly-postat-devant", temps:4, dit:"joueuse", mots:[], motsAilleurs:["fer"],
        fr:"Tu mettrais un fer de postérieur devant sur celui-là ?",
        en:"Would you fit a hind shoe to the front on this one?",
        es:"¿Le pondrías una herradura de posterior en el anterior a este?",
        it:"Gli metteresti un ferro posteriore davanti su questo?",
        de:"Würdest du bei diesem ein Hintereisen vorn aufziehen?",
        ja:"この 子 に は 、 前肢 に 後肢 用 の 蹄鉄 を 使い ます か ?",
        ar:"هل ستستخدم حدوة خلفية على قائمة أمامية لهذا الحصان؟" },

      /* ---- temps 5 · les crampons ---- */
      { ref:"d-fly-mortaises-faites", temps:5, dit:"joueuse", mots:["mortaise-crampon"],
        fr:"Les mortaises sont déjà faites ?",
        en:"Are the stud holes already made?",
        es:"¿Los orificios ya están hechos?",
        it:"I fori sono già fatti?",
        de:"Sind die Stollenlöcher schon gemacht?",
        ja:"スタッド ホール は もう 開い て い ます か ?",
        ar:"هل ثقوب مسامير منع الانزلاق جاهزة؟" },

      { ref:"d-fly-mortaises-taraudees", temps:5, dit:"joueuse", mots:["tarauder-mortaise"],
        fr:"Elles sont taraudées ?",
        en:"Have the stud holes been tapped?",
        es:"¿Están roscados?",
        it:"Sono filettati?",
        de:"Sind sie schon eingewindet?",
        ja:"ねじ切り は し て あり ます か ?",
        ar:"هل هي مسننة؟" },

      { ref:"d-fly-besoin-crampons", temps:5, dit:"joueuse", mots:["crampon"],
        fr:"Il aura besoin de crampons demain.",
        en:"He'll need studs tomorrow.",
        es:"Mañana necesitará tacos.",
        it:"Domani avrà bisogno dei ramponi.",
        de:"Er braucht morgen Stollen.",
        ja:"明日 、 スタッド が 必要 に なり ます。",
        ar:"سيحتاج إلى مسامير منع الانزلاق غدا." },

      { ref:"d-fly-nettoyer-mortaises", temps:5, dit:"joueuse", mots:["mortaise-crampon","crampon"],
        fr:"Tu veux que je nettoie les mortaises avant de mettre les crampons ?",
        en:"Do you want me to clean the stud holes before putting the studs in?",
        es:"¿Quieres que limpie los orificios antes de poner los tacos?",
        it:"Vuoi che pulisca i fori prima di mettere i ramponi?",
        de:"Soll ich die Stollenlöcher reinigen, bevor die Stollen reinkommen?",
        ja:"スタッド を 入れる 前 に 、 穴 を 掃除 し ましょう か ?",
        ar:"أتريد أن أنظف ثقوب التثبيت قبل تركيب مسامير منع الانزلاق؟" },

      /* ---- temps 6 · pieds nus et prochain rendez-vous ---- */
      { ref:"d-fly-nus-derriere", temps:6, dit:"joueuse", mots:["pieds-nus"],
        fr:"Est-ce qu'il peut rester pieds nus derrière ?",
        en:"Can he stay barefoot behind?",
        es:"¿Puede quedarse descalzo de atrás?",
        it:"Può restare scalzo dietro?",
        de:"Kann er hinten barhuf bleiben?",
        ja:"後肢 は 裸蹄 の まま で いい です か ?",
        ar:"هل يمكنه البقاء من دون حدوات في القائمتين الخلفيتين؟" },

      { ref:"d-fly-use-terrain-dur", temps:6, dit:"joueuse", mots:["sabot"],
        fr:"Il use beaucoup ses pieds quand il travaille sur terrain dur.",
        en:"He wears his feet down quite quickly on hard ground.",
        es:"Desgasta mucho los pies cuando trabaja en terreno duro.",
        it:"Consuma molto i piedi quando lavora su terreno duro.",
        de:"Auf hartem Boden nutzen sich seine Hufe schnell ab.",
        ja:"硬い 地面 で 動く と 、 蹄 が すぐ に 減っ て しまい ます。",
        ar:"تتآكل حوافره كثيرا حين يعمل على أرض صلبة." },

      { ref:"d-fly-hipposandale-suffire", temps:6, dit:"joueuse", mots:["hipposandale"],
        fr:"Est-ce qu'une hipposandale pourrait suffire pour les sorties ?",
        en:"Would a hoof boot be enough for hacking?",
        es:"¿Bastaría con una bota de casco para las salidas?",
        it:"Basterebbe uno stivaletto per le uscite?",
        de:"Würde ein Hufschuh für Ausritte reichen?",
        ja:"外乗 に は 蹄 用 ブーツ で 十分 でしょう か ?",
        ar:"هل يمكن أن يكون حذاء الحافر كافيا عند الخروج؟" },

      { ref:"d-fly-classique-composite", temps:6, dit:"joueuse", mots:[], motsAilleurs:["fer"],
        fr:"Tu utiliserais plutôt un fer classique ou une protection composite ?",
        en:"Would you use a traditional shoe or a composite one?",
        es:"¿Usarías más bien una herradura clásica o una protección compuesta?",
        it:"Useresti piuttosto un ferro classico o una protezione composita?",
        de:"Würdest du eher ein klassisches oder ein Komposit-Eisen nehmen?",
        ja:"従来 の 蹄鉄 と コンポジット 、 どちら を 使い ます か ?",
        ar:"هل تفضل استخدام حدوة تقليدية أم حدوة مركبة؟" },

      { ref:"d-fly-revoir-semaines", temps:6, dit:"joueuse", mots:[],
        fr:"Tu veux le revoir dans combien de semaines ?",
        en:"When would you like to see him again?",
        es:"¿En cuántas semanas quieres volver a verlo?",
        it:"Tra quante settimane vuoi rivederlo?",
        de:"In wie vielen Wochen möchtest du ihn wiedersehen?",
        ja:"次 は 何 週間 後 に 見 て もらい ます か ?",
        ar:"بعد كم أسبوع تريد فحصه من جديد؟" }
    ]
  }
};
