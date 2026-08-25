/* hype-lingo-lex-pansage-reserve.js — Hype Lingo · RÉSERVE (sans ville)
   ==================================================================
   ISSU DU RECENTRAGE DU 24/08/2026 : Lambourn garde 33 notions, ces
   SIX-là sortent du chapitre et attendent une ville.
   🟥 CE FICHIER N'EST CHARGÉ PAR PERSONNE : aucune balise <script>,
   aucune entrée ETAPE_SRC. Le déclarer le jour où une ville l'adopte.
   🟡 ARABE DORMANT (24/08) : champ `ar` écrit d'avance, aucun écran ne le lit.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["pansage-reserve"] = {
  ref: "pansage-reserve",
  titre: { fr:"Le pansage — réserve", en:"Grooming — reserve", es:"La limpieza — reserva",
           it:"Il governo — riserva", de:"Die Pferdepflege — Reserve", ja:"手入れ — 予備", ar:"تنظيف الحصان — احتياط" },
  lecons: 0,

  concepts: [

  { ref:"tondeuse", lecon:0, coll:"outils",
    mots:{ fr:{m:"la tondeuse"}, en:{m:"the clippers", p:"kli-peurz"},
           es:{m:"la esquiladora"}, it:{m:"la tosatrice"},
           de:{m:"die Schermaschine", p:"chér-ma-chi-ne"}, ja:{m:"バリカン", p:"barikan"},
           ar:{m:"آلة جز الشعر"} },
    def:{ fr:"Elle tond le poil d'hiver du cheval qui travaille, pour qu'il sèche vite. ⚠️ Le mot anglais est toujours au pluriel : **the clippers**.",
          en:"It clips the working horse's winter coat so he dries fast. Always plural in English.",
          es:"Esquila el pelo de invierno del caballo que trabaja, para que se seque rápido. ⚠️ La palabra inglesa va siempre en plural: **the clippers**.",
          it:"Tosa il pelo invernale del cavallo che lavora, perché asciughi in fretta. ⚠️ La parola inglese è sempre al plurale: **the clippers**.",
          de:"Sie schert das Winterfell des arbeitenden Pferdes, damit es schnell trocknet. ⚠️ Das englische Wort steht immer im Plural: **the clippers**.",
          ja:"働く馬の冬毛を刈り、早く乾くようにします。⚠️ 英語は必ず複数形 — **the clippers**。",
          ar:"تجز شعر الشتاء لدى الحصان الذي يعمل، لكي يجف بسرعة. ⚠️ الكلمة الإنجليزية تأتي دائما بصيغة الجمع: **the clippers**." } },

  { ref:"poussiere", lecon:0, coll:"etat",
    mots:{ fr:{m:"la poussière"}, en:{m:"the dust", p:"deuste"},
           es:{m:"el polvo"}, it:{m:"la polvere"},
           de:{m:"der Staub", p:"chtaoup"}, ja:{m:"ほこり", p:"hokori"},
           ar:{m:"الغبار"} },
    def:{ fr:"Ce que le bouchon fait remonter et que la brosse douce emporte. Un cheval poussiéreux n'est pas un cheval sale.",
          en:"What the dandy brush lifts and the soft brush carries away. A dusty horse is not a dirty horse.",
          es:"Lo que el cepillo duro levanta y el suave se lleva. Un caballo polvoriento no es un caballo sucio.",
          it:"Ciò che la brusca solleva e la spazzola morbida porta via. Un cavallo polveroso non è un cavallo sporco.",
          de:"Was die Kardätsche hochholt und die weiche Bürste mitnimmt. Ein staubiges Pferd ist kein schmutziges Pferd.",
          ja:"荒ブラシが浮かせ、柔らかいブラシが運び去るもの。ほこりっぽい馬は、汚れた馬ではありません。",
          ar:"ما ترفعه الفرشاة الخشنة وتزيله الفرشاة الناعمة. الحصان المغبر ليس حصانا متسخا." } },

  { ref:"mue", lecon:0, coll:"etat",
    mots:{ fr:{m:"la mue"}, en:{m:"the moult", p:"môlte", var:"shedding (US)"},
           es:{m:"la muda"}, it:{m:"la muta"},
           de:{m:"der Fellwechsel", p:"fèl-vèk-seul"}, ja:{m:"換毛", p:"kanmō"},
           ar:{m:"تبديل الشعر"} },
    def:{ fr:"Deux fois par an, le cheval change de poil. C'est la saison de l'étrille, des poignées de poils partout, et des pansages qui durent le double.",
          en:"Twice a year the horse changes coat. The season of the curry comb, handfuls of hair everywhere, and grooming that takes twice as long.",
          es:"Dos veces al año, el caballo cambia de pelo. Es la temporada de la almohaza, de puñados de pelo por todas partes, y de limpiezas que duran el doble.",
          it:"Due volte all'anno, il cavallo cambia il pelo. È la stagione della striglia, delle manciate di pelo ovunque, e dei governi che durano il doppio.",
          de:"Zweimal im Jahr wechselt das Pferd sein Fell. Die Saison des Striegels, der Haarbüschel überall — und der Pflege, die doppelt so lange dauert.",
          ja:"年に二度、馬は毛を替えます。金ぐしの季節。そこらじゅうの毛の束。倍の時間がかかる手入れ。",
          ar:"مرتين في السنة، يبدل الحصان شعره. إنه موسم المحسة، وحفنات الشعر في كل مكان، وجلسات تنظيف تستغرق ضعف الوقت." } },

  { ref:"tache", lecon:0, coll:"etat",
    mots:{ fr:{m:"la tache"}, en:{m:"the stain", p:"stéïne", var:"stable stain"},
           es:{m:"la mancha"}, it:{m:"la macchia"},
           de:{m:"der Fleck", p:"flèk", var:"der Liegefleck"}, ja:{m:"よごれ", p:"yogore"},
           ar:{m:"البقعة"} },
    def:{ fr:"Sur un cheval gris, la marque jaune que la litière laisse pendant la nuit. L'anglais et l'allemand ont un mot exprès : **stable stain**, **Liegefleck**.",
          en:"On a grey horse, the yellow mark the bedding leaves overnight. English and German have a word for it.",
          es:"En un caballo tordo, la marca amarilla que la cama deja por la noche. El inglés y el alemán tienen palabra propia: **stable stain**, **Liegefleck**.",
          it:"Su un cavallo grigio, il segno giallo che la lettiera lascia durante la notte. L'inglese e il tedesco hanno una parola apposta: **stable stain**, **Liegefleck**.",
          de:"Beim Schimmel der gelbe Abdruck, den die Einstreu über Nacht hinterlässt: der **Liegefleck**.",
          ja:"芦毛の馬につく、寝わらが一晩で残す黄色い跡。英語とドイツ語には専用の言葉があります — **stable stain**、**Liegefleck**。",
          ar:"على الحصان الأشهب، هي البقعة الصفراء التي يتركها فراش الإسطبل أثناء الليل. وللإنجليزية والألمانية مصطلح خاص بها: **stable stain** و**Liegefleck**." } },

  { ref:"eclat", lecon:0, coll:"etat",
    mots:{ fr:{m:"l'éclat du poil"}, en:{m:"the shine", p:"chaïne", var:"the bloom"},
           es:{m:"el brillo"}, it:{m:"il lucido"},
           de:{m:"der Glanz", p:"glannts"}, ja:{m:"毛づや", p:"kezuya"},
           ar:{m:"لمعان الشعر"} },
    def:{ fr:"Le but du pansage. Les Britanniques parlent de **bloom** : la brillance qui vient de l'alimentation et du travail, et que la brosse révèle plus qu'elle ne la fabrique.",
          en:"The point of grooming. The British speak of bloom: the shine that comes from feed and work, which the brush reveals more than it makes.",
          es:"El objetivo de la limpieza. Los británicos hablan de **bloom**: el brillo que viene de la alimentación y del trabajo, y que el cepillo revela más de lo que fabrica.",
          it:"Lo scopo del governo. I britannici parlano di **bloom**: la lucentezza che viene dall'alimentazione e dal lavoro, e che la spazzola rivela più di quanto la crei.",
          de:"Das Ziel der Pflege. Die Briten sprechen vom **bloom**: der Glanz, der von Futter und Arbeit kommt — die Bürste bringt ihn ans Licht, sie macht ihn nicht.",
          ja:"手入れの目的。イギリス人は **bloom** と言います。餌と運動から生まれるつやで、ブラシは作るのではなく、引き出すもの。",
          ar:"هدف التنظيف. يتحدث البريطانيون عن **bloom**: اللمعان الذي يأتي من التغذية والعمل، والذي تكشفه الفرشاة أكثر مما تصنعه." } },

  { ref:"tique", lecon:0, coll:"etat",
    mots:{ fr:{m:"la tique"}, en:{m:"the tick", p:"tik"},
           es:{m:"la garrapata"}, it:{m:"la zecca"},
           de:{m:"die Zecke", p:"tsè-ke"}, ja:{m:"マダニ", p:"madani"},
           ar:{m:"القرادة"} },
    def:{ fr:"On la cherche après chaque sortie au pré : sous le ventre, entre les cuisses, à la base de la crinière. Elle se retire d'un geste droit, sans tourner.",
          en:"You look for it after every turnout: under the belly, between the thighs, at the base of the mane. Pull it straight out, without twisting.",
          es:"Se busca después de cada salida al prado: bajo el vientre, entre los muslos, en la base de la crin. Se retira con un gesto recto, sin girar.",
          it:"Si cerca dopo ogni uscita al prato: sotto il ventre, tra le cosce, alla base della criniera. Si toglie con un gesto dritto, senza girare.",
          de:"Nach jedem Weidegang wird gesucht: unter dem Bauch, zwischen den Schenkeln, am Mähnenansatz. Gerade herausziehen, ohne zu drehen.",
          ja:"放牧のあとは毎回探します。腹の下、内股、たてがみの付け根。回さずに、まっすぐ抜きます。",
          ar:"تبحثين عنها بعد كل خروج إلى المرعى: تحت البطن، وبين الفخذين، وعند منبت العرف. وتنزع بحركة مستقيمة، من دون لف." } }
  ]
};
