/* hype-lingo-lex-materiel-reserve.js — Hype Lingo · en réserve
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-materiel.js, leçon 2
   — AUCUNE définition modifiée.

   🟥 SANS VILLE. Séville portait cette leçon (« le filet ») jusqu'à son
   passage sur `parade` — depuis, ces 10 concepts n'appartiennent à
   aucune ville. Une phrase générale les accompagne (`quel-mors`).

   AUCUNE VILLE N'EST BRANCHÉE SUR CE FICHIER DANS `ETAPE_SRC` : c'est
   voulu, pas un oubli, en attendant qu'une ville le réclame.
   ================================================================== */

/* 🟡 ARABE DORMANT (24/08) : champ `ar` écrit d'avance, aucun écran ne le lit. */
window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["materiel-reserve"] = {
  ref: "materiel-reserve",
  titre: { fr:"Le filet", en:"The bridle", es:"La brida", it:"La briglia", de:"Das Zaumzeug", ja:"頭絡", ar:"اللجام" },
  lecons: 1,

  concepts: [

  { ref:"filet", lecon:2, coll:"filet",
    mots:{ fr:{m:"le filet"}, en:{m:"the bridle", p:"braï-deul"},
           es:{m:"la cabezada"}, it:{m:"la testiera", var:"il filetto"},
           de:{m:"die Trense", p:"trèn-ze"}, ja:{m:"頭絡", p:"tōraku"},
           ar:{m:"اللجام"} },
    def:{ fr:"L'ensemble de cuir qui tient le mors. ⚠️ En allemand, **die Trense** désigne à la fois le filet complet et le mors de filet : le contexte tranche. La bride, elle, est die Kandare.",
          en:"The leatherwork that holds the bit. In German, Trense means both the whole snaffle bridle and the snaffle bit itself.",
          es:"El conjunto de cuero que sostiene el bocado. ⚠️ En alemán, **die Trense** designa a la vez la cabezada completa y el bocado de filete: el contexto decide. La brida es die Kandare.",
          it:"L'insieme di cuoio che tiene l'imboccatura. ⚠️ In tedesco **die Trense** indica sia la testiera completa sia il morso a filetto: decide il contesto. La briglia è die Kandare.",
          de:"Das Lederzeug, das das Gebiss trägt. ⚠️ **Die Trense** meint sowohl das ganze Zaumzeug als auch das Trensengebiss — der Kontext entscheidet. Die Kandare ist das andere.",
          ja:"ハミを支える革のひとそろい。⚠️ ドイツ語の **die Trense** は頭絡全体とハミの両方を指し、文脈で判断します。大勒は die Kandare です。",
          ar:"مجموعة السيور الجلدية التي تحمل الشكيمة. ⚠️ في الألمانية تدل **die Trense** على اللجام الكامل وعلى شكيمته معا: السياق يحسم. أما اللجام المزدوج فهو die Kandare." } },

  { ref:"tetiere", lecon:2, coll:"filet",
    mots:{ fr:{m:"la têtière"}, en:{m:"the headpiece", p:"hèd-piss"},
           es:{m:"la testera"}, it:{m:"il sopratesta"}, // ??
           de:{m:"das Genickstück", p:"gue-nik-chtuk"}, ja:{m:"項革", p:"unajigawa"},
           ar:{m:"الحزام الرأسي"} }, // ??
    def:{ fr:"La partie qui passe derrière les oreilles et porte tout le filet. L'allemand la nomme par l'anatomie : Genick, la nuque.",
          en:"The strap behind the ears that carries the whole bridle. German names it after the anatomy: Genick, the poll.",
          es:"La parte que pasa detrás de las orejas y sostiene toda la cabezada. El alemán la nombra por la anatomía: Genick, la nuca.",
          it:"La parte che passa dietro le orecchie e porta tutta la testiera. Il tedesco la chiama con l'anatomia: Genick, la nuca.",
          de:"Das Stück hinter den Ohren, das den ganzen Zaum trägt. Das Deutsche benennt es anatomisch: das Genick.",
          ja:"両耳の後ろを通り、頭絡全体を支える部分。ドイツ語は体の部位そのままに Genick（うなじ）と呼びます。",
          ar:"الجزء الذي يمر خلف الأذنين ويحمل اللجام كله. الألمانية تسميه باسم العضو نفسه: Genick، أي مؤخرة الرقبة." } },

  { ref:"frontal", lecon:2, coll:"filet",
    mots:{ fr:{m:"le frontal"}, en:{m:"the browband", p:"braou-band"},
           es:{m:"la frontalera"}, it:{m:"il frontalino"},
           de:{m:"der Stirnriemen", p:"chtirn-ri-meune"}, ja:{m:"額革", p:"hitaigawa"},
           ar:{m:"رباط الجبهة"} }, // ??
    def:{ fr:"La bande qui barre le front, sous laquelle on ramène le toupet. C'est la pièce qu'on personnalise aux couleurs de l'écurie en concours.",
          en:"The band across the forehead, with the forelock brought over it. The piece riders customise in team colours.",
          es:"La banda que cruza la frente, bajo la cual se recoge el tupé. Es la pieza que se personaliza con los colores de la cuadra en concurso.",
          it:"La banda che attraversa la fronte, sotto la quale si porta il ciuffo. È il pezzo che si personalizza con i colori della scuderia in concorso.",
          de:"Das Band über der Stirn, unter das der Schopf gelegt wird. Das Stück, das man im Turnier in den Stallfarben trägt.",
          ja:"額を横切る革帯。前髪はこの上に出します。競技会で厩舎のカラーに飾るのは、この部分です。",
          ar:"الشريط الذي يعبر الجبهة، وتحته تسدل الناصية. إنها القطعة التي تزين بألوان الإسطبل في المسابقات." } },

  { ref:"muserolle", lecon:2, coll:"filet",
    mots:{ fr:{m:"la muserolle"}, en:{m:"the noseband", p:"nôze-band"},
           es:{m:"la muserola"}, it:{m:"la capezzina"}, // ??
           de:{m:"der Nasenriemen", p:"na-zeune-ri-meune"}, ja:{m:"鼻革", p:"hanagawa"},
           ar:{m:"حزام الأنف"} },
    def:{ fr:"Elle entoure le chanfrein. On doit pouvoir glisser deux doigts dessous : c'est contrôlé en concours dans presque tous les pays.",
          en:"It goes round the nose. Two fingers must fit underneath — checked at competitions in nearly every country.",
          es:"Rodea la caña de la nariz. Deben caber dos dedos por debajo: se controla en concurso en casi todos los países.",
          it:"Circonda la canna nasale. Devono passarci due dita sotto: è controllato in concorso in quasi tutti i paesi.",
          de:"Umschließt den Nasenrücken. Zwei Finger müssen darunter passen — das wird auf Turnieren fast überall geprüft.",
          ja:"鼻梁を囲む革。下に指が二本入ること — ほとんどの国の競技会で検査されます。",
          ar:"يحيط بقصبة الأنف. يجب أن يمر إصبعان تحته: وهذا يفحص في المسابقات في معظم البلدان." } },

  { ref:"sous-gorge", lecon:2, coll:"filet",
    mots:{ fr:{m:"la sous-gorge"}, en:{m:"the throatlash", p:"srôte-lache"},
           es:{m:"el ahogadero"}, it:{m:"il sottogola"},
           de:{m:"der Kehlriemen", p:"kél-ri-meune"}, ja:{m:"喉革", p:"nodogawa"},
           ar:{m:"حزام الحلق"} }, // ??
    def:{ fr:"La lanière lâche sous la gorge, qui empêche le filet de passer par-dessus la tête. On laisse la largeur d'une main.",
          en:"The loose strap under the throat that stops the bridle coming over the head. Leave a hand's width.",
          es:"La correa floja bajo la garganta, que impide que la cabezada pase por encima de la cabeza. Se deja el ancho de una mano.",
          it:"La cinghia lenta sotto la gola, che impedisce alla testiera di passare sopra la testa. Si lascia la larghezza di una mano.",
          de:"Der lockere Riemen unter der Kehle, der verhindert, dass der Zaum über den Kopf rutscht. Eine Handbreit Platz lassen.",
          ja:"のどの下のゆるい革。頭絡が頭から抜けるのを防ぎます。手のひら一枚分のゆとりを残すこと。",
          ar:"السير المرتخي تحت الحلق، يمنع اللجام من الانزلاق فوق الرأس. يترك فيه اتساع كف." } },

  { ref:"renes", lecon:2, coll:"filet",
    mots:{ fr:{m:"les rênes"}, en:{m:"the reins", p:"rènz"},
           es:{m:"las riendas"}, it:{m:"le redini"},
           de:{m:"die Zügel", p:"tsu-gueul"}, ja:{m:"手綱", p:"tazuna"},
           ar:{m:"الأعنة"} },
    def:{ fr:"⚠️ Ne pas confondre à l'oral avec **the rains** (la pluie) ni **the reign** (le règne) : les trois se prononcent pareil en anglais. Et souviens-toi qu'on monte « on the left rein », sur la main gauche.",
          en:"Careful: reins, rains and reign are all pronounced alike. And remember you ride « on the left rein » — the French say « hand ».",
          es:"⚠️ No confundir al oído con **the rains** (la lluvia) ni **the reign** (el reinado): las tres se pronuncian igual en inglés. Y recuerda que se monta « on the left rein », a mano izquierda.",
          it:"⚠️ Da non confondere all'ascolto con **the rains** (la pioggia) né **the reign** (il regno): le tre si pronunciano uguali in inglese. E ricorda che si monta « on the left rein », a mano sinistra.",
          de:"⚠️ Nicht mit **the rains** (Regen) oder **the reign** (Herrschaft) verwechseln: Alle drei klingen gleich. Und man reitet « on the left rein » — auf der linken Hand.",
          ja:"⚠️ 耳で聞くと **the rains**（雨）や **the reign**（治世）と同じ音です。三つとも発音が同じ。そして「左手前」は « on the left rein » と言うのを覚えておくこと。",
          ar:"⚠️ لا تخلطي سماعيا بين **the rains** (المطر) و**the reign** (الحكم): الكلمات الثلاث تنطق في الإنجليزية بالطريقة نفسها. وتذكري أن الركوب على اليد اليسرى يقال «on the left rein»." } },

  { ref:"mors", lecon:2, coll:"filet",
    mots:{ fr:{m:"le mors"}, en:{m:"the bit", p:"bitt"},
           es:{m:"el bocado"}, it:{m:"l'imboccatura", var:"il filetto"},
           de:{m:"das Gebiss", p:"gue-biss"}, ja:{m:"ハミ", p:"hami", var:"銜"},
           ar:{m:"الشكيمة"} },
    def:{ fr:"La pièce de métal dans la bouche. Se rince à l'eau claire après chaque séance, jamais au savon. ⚠️ L'allemand das Gebiss veut aussi dire « dentier » : le mot est le même.",
          en:"The metal in the mouth, rinsed in clean water after every ride, never soaped. German Gebiss also means a set of dentures.",
          es:"La pieza de metal en la boca. Se aclara con agua limpia tras cada sesión, jamás con jabón. ⚠️ El alemán das Gebiss también significa « dentadura postiza »: la palabra es la misma.",
          it:"Il pezzo di metallo in bocca. Si sciacqua ad acqua pulita dopo ogni seduta, mai col sapone. ⚠️ Il tedesco das Gebiss vuol dire anche « dentiera »: la parola è la stessa.",
          de:"Das Metallstück im Maul. Nach jeder Einheit mit klarem Wasser spülen, nie mit Seife. ⚠️ Das Gebiss heißt auch das künstliche — es ist dasselbe Wort.",
          ja:"口の中の金属。毎回、水だけで洗い、石けんは使いません。⚠️ ドイツ語の das Gebiss には「入れ歯」の意味もあり、まったく同じ言葉です。",
          ar:"قطعة المعدن في الفم. تشطف بالماء الصافي بعد كل حصة، ولا تغسل بالصابون أبدا. ⚠️ الألمانية das Gebiss تعني أيضا «طقم الأسنان»: الكلمة نفسها." } },

  { ref:"bride", lecon:2, coll:"filet",
    mots:{ fr:{m:"la bride"}, en:{m:"the double bridle", p:"deu-beul braï-deul"},
           es:{m:"la brida"}, it:{m:"la briglia"},
           de:{m:"die Kandare", p:"kan-da-re"}, ja:{m:"大勒", p:"dairoku"},
           ar:{m:"اللجام المزدوج"} }, // ??
    def:{ fr:"Deux mors et quatre rênes, réservée au dressage confirmé. ⚠️ Faux ami franco-espagnol commode : **la brida** en espagnol, c'est bien la bride ; mais **la cabezada**, c'est le filet.",
          en:"Two bits and four reins, for advanced dressage only. Spanish brida is the double bridle, cabezada the snaffle bridle.",
          es:"Dos bocados y cuatro riendas, reservada a la doma avanzada. ⚠️ Falso amigo franco-español cómodo: **la brida** en español es en efecto la brida; pero **la cabezada** es el filete.",
          it:"Due imboccature e quattro redini, riservata al dressage avanzato. ⚠️ Falso amico franco-spagnolo comodo: **la brida** in spagnolo è proprio la briglia; ma **la cabezada** è la testiera del filetto.",
          de:"Zwei Gebisse und vier Zügel, dem fortgeschrittenen Dressurreiten vorbehalten. ⚠️ Praktischer falscher Freund: **la brida** ist wirklich die Kandare — aber **la cabezada** ist die Trense.",
          ja:"二つのハミと四本の手綱。上級の馬場馬術のためのものです。⚠️ 西仏の紛らわしくも便利な対応：スペイン語の **la brida** は確かに大勒 — でも **la cabezada** は水勒のことです。",
          ar:"شكيمتان وأربعة أعنة، للترويض المتقدم فقط. ⚠️ صديق مزيف فرنسي إسباني مفيد: **la brida** بالإسبانية هي فعلا اللجام المزدوج؛ أما **la cabezada** فهي اللجام العادي." } },

  { ref:"collier-chasse", lecon:2, coll:"filet",
    mots:{ fr:{m:"le collier de chasse"}, en:{m:"the breastplate", p:"brèst-pléïte"},
           es:{m:"el petral"}, it:{m:"il pettorale"},
           de:{m:"das Vorderzeug", p:"for-deur-tsoïg"}, ja:{m:"胸繋", p:"munetsunagi"},
           ar:{m:"طوق الصدر"} }, /* de corrige (rapport 07/08) : genre neutre ; ja lu munetsunagi */
    def:{ fr:"Il empêche la selle de reculer, en extérieur et en cross. Le nom français vient de la chasse à courre ; l'anglais décrit simplement la poitrine.",
          en:"It stops the saddle sliding back, out hacking and across country. French names it after hunting, English simply after the chest.",
          es:"Impide que la silla recule, en exterior y en cross. El nombre francés viene de la caza a caballo; el inglés describe simplemente el pecho.",
          it:"Impedisce alla sella di arretrare, in esterna e in cross. Il nome francese viene dalla caccia a cavallo; l'inglese descrive semplicemente il petto.",
          de:"Verhindert das Zurückrutschen des Sattels, im Gelände und im Cross. Der französische Name kommt von der Jagd; das Englische beschreibt schlicht die Brust.",
          ja:"鞍が後ろへずれるのを防ぎます。外乗やクロスで使用。フランス語名は狩猟に由来し、英語は単に胸を描写しているだけです。",
          ar:"يمنع السرج من التراجع، في الخارج وفي اختراق الضاحية. الاسم الفرنسي من صيد الفروسية؛ والإنجليزية تصف الصدر ببساطة." } },

  { ref:"martingale", lecon:2, coll:"filet",
    mots:{ fr:{m:"la martingale"}, en:{m:"the martingale", p:"mar-tin-guéïl", var:"running · standing"},
           es:{m:"la martingala"}, it:{m:"la martingala"},
           de:{m:"das Martingal", p:"mar-tin-gal"}, ja:{m:"マルタンガール", p:"marutangāru"},
           ar:{m:"المارتينغال"} },
    def:{ fr:"Elle limite l'élévation de l'encolure. L'anglais distingue la **running martingale** (à anneaux, la courante) de la **standing martingale** (fixe, plus rare et interdite en dressage).",
          en:"It limits how high the horse can throw its head. English separates the running martingale from the fixed standing martingale.",
          es:"Limita la elevación del cuello. El inglés distingue la **running martingale** (de anillas, corredera) de la **standing martingale** (fija, más rara y prohibida en doma).",
          it:"Limita l'elevazione dell'incollatura. L'inglese distingue la **running martingale** (ad anelli, scorrevole) dalla **standing martingale** (fissa, più rara e vietata in dressage).",
          de:"Begrenzt das Hochwerfen des Halses. Das Englische trennt die **running martingale** (mit Ringen) von der **standing martingale** (fest, seltener, in der Dressur verboten).",
          ja:"首を上げすぎるのを抑える馬具。英語はリング式の **running martingale** と、固定式でより稀な（馬場では禁止の）**standing martingale** を区別します。",
          ar:"تحد من ارتفاع العنق. الإنجليزية تميز **running martingale** (بحلقات، متحركة) من **standing martingale** (ثابتة، أندر، وممنوعة في الترويض)." } },

  /* ============ LEÇON 3 · LE CAVALIER ============ */

  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quel-mors", lecon:2,
      fr:"Il monte avec quel mors ?",
      en:"What bit does he go in ?",
      es:"¿ Con qué bocado se monta ?",
      it:"Con quale imboccatura si monta ?",
      de:"Mit welchem Gebiss wird er geritten ?",
      ja:"どの ハミ を 使い ます か ?",
      ar:"ما الشكيمة التي يركب بها؟" },
  ]
};
