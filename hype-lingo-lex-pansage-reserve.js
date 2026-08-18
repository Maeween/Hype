/* hype-lingo-lex-pansage-reserve.js — Hype Lingo · RÉSERVE DU PANSAGE
   ==================================================================
   🟥 CRÉÉ LE 19/08/2026. Six concepts retirés de `hype-lingo-lex-pansage.js`
   quand LAMBOURN a été ramenée à 33 notions, sur décision de Blandine.

   🟢 `brosse-eau`, `toupet` et `tondre` sont REPARTIS AU CHAPITRE le même
   jour — Blandine les a jugés trop utiles pour dormir ici.
   ⚠️ `tondeuse` RESTE, alors que `tondre` est parti : décision explicite.
   Le verbe est enseigné sans son outil, seul cas du chapitre.

   ⚠️ CE FICHIER N'EST CHARGÉ PAR PERSONNE. Aucune balise dans `lingo.html`,
   aucune entrée dans `SOCLE_JS`. Il attend une ville, exactement comme
   `concours-reserve.js`, `dressage-reserve.js` et `materiel-reserve.js`.

   🟥 `sabot`, `sole` et `fourchette` NE SONT PAS ICI. Ils ont été retirés
   du pansage parce que FLYINGE les enseigne déjà, avec les mêmes `ref`.
   Les recopier ici créerait le doublon que la règle interdit :
   UN CONCEPT = UN `ref` GLOBAL.

   Les six langues et les définitions sont reprises À L'IDENTIQUE de
   l'original — rien n'a été réécrit, rien n'a été traduit à nouveau.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["pansage-reserve"] = {
  ref: "pansage-reserve",
  chapitre: 2,
  titre: { fr:"Le pansage — réserve", en:"Grooming — reserve", es:"La limpieza — reserva",
           it:"La pulizia — riserva", de:"Das Putzen — Reserve", ja:"手入れ — 予備" },
  lecons: 1,
  concepts: [
  { ref:"tondeuse", lecon:1, coll:"outils",
    mots:{ fr:{m:"la tondeuse"}, en:{m:"the clippers", p:"kli-peurz"},
           es:{m:"la esquiladora", var:"la máquina de esquilar"}, it:{m:"la tosatrice"},
           de:{m:"die Schermaschine", p:"chèr-ma-chi-ne"}, ja:{m:"バリカン", p:"barikan"} },
    def:{ fr:"On tond un cheval qui travaille l'hiver pour qu'il sèche vite. Le mot anglais est toujours au pluriel : « the clippers ».",
          en:"A horse in winter work is clipped so it dries quickly. The English word is always plural: the clippers.",
          es:"Se esquila al caballo que trabaja en invierno para que se seque rápido. La palabra inglesa va siempre en plural: « the clippers ».",
          it:"Si tosa il cavallo che lavora d'inverno perché asciughi in fretta. La parola inglese è sempre al plurale: « the clippers ».",
          de:"Ein Pferd, das im Winter arbeitet, wird geschoren, damit es schnell trocknet. Das englische Wort steht immer im Plural: « the clippers ».",
          ja:"冬も運動する馬は、早く乾くように毛を刈ります。英語は必ず複数形で « the clippers » と言います。" } },

  { ref:"poussiere", lecon:1, coll:"etat",
    mots:{ fr:{m:"la poussière"}, en:{m:"the dust", p:"deust"},
           es:{m:"el polvo"}, it:{m:"la polvere"},
           de:{m:"der Staub", p:"chtaoub"}, ja:{m:"ほこり", p:"hokori"} },
    def:{ fr:"Ce que la brosse dure fait remonter et que la brosse douce emporte. Un cheval poussiéreux n'est pas un cheval sale.",
          en:"What the dandy brush lifts and the body brush carries away. A dusty horse is not a dirty one.",
          es:"Lo que el cepillo duro hace subir y el suave se lleva. Un caballo polvoriento no es un caballo sucio.",
          it:"Ciò che la spazzola dura fa risalire e la morbida porta via. Un cavallo polveroso non è un cavallo sporco.",
          de:"Was die harte Bürste hochholt und die weiche mitnimmt. Ein staubiges Pferd ist kein schmutziges Pferd.",
          ja:"硬いブラシが浮かせ、柔らかいブラシが持ち去るもの。埃をかぶった馬は、汚れた馬ではありません。" } },

  { ref:"mue", lecon:1, coll:"etat",
    mots:{ fr:{m:"la mue"}, en:{m:"the moult", p:"môlte", var:"shedding (US)"},
           es:{m:"la muda"}, it:{m:"la muta"},
           de:{m:"der Fellwechsel", p:"fèll-vèk-seul"}, ja:{m:"換毛", p:"kanmō", var:"換毛期 = la période"} },
    def:{ fr:"Deux fois par an, le cheval change de poil. C'est la saison de l'étrille, des poignées de poils partout et des pansages deux fois plus longs.",
          en:"Twice a year the horse changes coat. Curry comb season: handfuls of hair everywhere and grooming that takes twice as long.",
          es:"Dos veces al año, el caballo cambia de pelo. Es la temporada de la almohaza, de los puñados de pelo por todas partes y de las limpiezas el doble de largas.",
          it:"Due volte l'anno, il cavallo cambia il pelo. È la stagione della striglia, delle manciate di pelo ovunque e delle pulizie lunghe il doppio.",
          de:"Zweimal im Jahr wechselt das Pferd sein Fell. Es ist die Saison des Striegels, der Haarbüschel überall und der doppelt langen Putzzeiten.",
          ja:"馬は年に二度、毛が生え替わります。毛すきの季節、そこらじゅうに毛の束が舞う季節、手入れの時間が倍になる季節です。" } },

  { ref:"tache", lecon:1, coll:"etat",
    mots:{ fr:{m:"la tache"}, en:{m:"the stain", p:"stéïne", var:"stable stain"},
           es:{m:"la mancha"}, it:{m:"la macchia"},
           de:{m:"der Fleck", p:"flèk", var:"der Liegefleck"}, ja:{m:"汚れ", p:"yogore"} },
    def:{ fr:"Sur un gris, la marque jaune laissée par la litière pendant la nuit. L'anglais et l'allemand ont un mot exprès : stable stain, Liegefleck.",
          en:"On a grey, the yellow mark left by the bedding overnight. English and German both have a word for it: stable stain, Liegefleck.",
          es:"En un tordo, la marca amarilla dejada por la cama durante la noche. El inglés y el alemán tienen palabra propia: stable stain, Liegefleck.",
          it:"Su un grigio, la macchia gialla lasciata dalla lettiera durante la notte. L'inglese e il tedesco hanno la parola apposta: stable stain, Liegefleck.",
          de:"Beim Schimmel der gelbe Fleck, den die Einstreu über Nacht hinterlässt. Englisch und Deutsch haben eigene Wörter: stable stain, Liegefleck.",
          ja:"芦毛の馬に、夜のあいだ寝床がつける黄色い染み。英語とドイツ語には専用の言葉があります：stable stain、Liegefleck。" } },

  { ref:"eclat", lecon:1, coll:"etat",
    mots:{ fr:{m:"l'éclat du poil"}, en:{m:"the shine", p:"chaïne", var:"bloom"},
           es:{m:"el brillo"}, it:{m:"la lucentezza"},
           de:{m:"der Glanz", p:"glanntss"}, ja:{m:"艶", p:"tsuya"} },
    def:{ fr:"Le but du pansage. Les Britanniques parlent de « bloom » : l'éclat qui vient de l'alimentation et du travail, que la brosse révèle mais ne fabrique pas.",
          en:"The point of grooming. The British speak of « bloom »: a shine that comes from feed and work, which the brush reveals but cannot create.",
          es:"La meta de la limpieza. Los británicos hablan de « bloom »: el brillo que viene de la alimentación y del trabajo, que el cepillo revela pero no fabrica.",
          it:"Lo scopo della pulizia. I britannici parlano di « bloom »: la lucentezza che viene dall'alimentazione e dal lavoro, che la spazzola rivela ma non fabbrica.",
          de:"Das Ziel des Putzens. Die Briten sprechen vom « bloom »: der Glanz aus Fütterung und Arbeit, den die Bürste sichtbar macht, aber nicht erzeugt.",
          ja:"手入れの目指すもの。イギリス人は « bloom » と言います。食事と運動から生まれる輝き — ブラシはそれを引き出すだけで、作り出しはしません。" } },

  { ref:"tique", lecon:1, coll:"etat",
    mots:{ fr:{m:"la tique"}, en:{m:"the tick", p:"tik"},
           es:{m:"la garrapata"}, it:{m:"la zecca"},
           de:{m:"die Zecke", p:"tsè-ke"}, ja:{m:"マダニ", p:"madani"} },
    def:{ fr:"À chercher après chaque sortie au pré : sous le ventre, entre les cuisses, à la base de la crinière. Se retire d'un mouvement droit, sans tourner.",
          en:"Look for them after every turnout: under the belly, between the thighs, at the base of the mane. Pull straight out, without twisting.",
          es:"Se busca tras cada salida al prado: bajo el vientre, entre los muslos, en la base de la crin. Se retira con un movimiento recto, sin girar.",
          it:"Da cercare dopo ogni uscita al prato: sotto il ventre, tra le cosce, alla base della criniera. Si toglie con un movimento dritto, senza girare.",
          de:"Nach jedem Weidegang absuchen: unter dem Bauch, zwischen den Schenkeln, am Mähnenansatz. Gerade herausziehen, ohne zu drehen.",
          ja:"放牧のあとは毎回探すこと。腹の下、内股、たてがみの付け根。抜くときはまっすぐに、ひねらずに。" } }
  ]
};
