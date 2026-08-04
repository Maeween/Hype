/* hype-lingo-lex-pansage.js — Hype Lingo · Chapitre 2 · « Le pansage »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS.

   UN CONCEPT = UN OBJET DU MONDE ÉQUESTRE avec ses 6 langues côte à côte.
   Aucune langue source : le moteur lit la langue de l'interface et propose
   les 5 autres.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA
     var  variante régionale (GB/US, Espagne/Amérique…)
     def  définition — mode Lexique, verso de carte, indice de jeu
     v    true si c'est un verbe

   PAS DE CHAMP `dit` ICI : contrairement au chapitre « Le cours », le
   pansage n'est pas fait d'ordres criés mais d'objets et de gestes.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'allemand distingue deux brosses là où le français dit « brosse
       dure / brosse douce » : Wurzelbürste et Kardätsche.
     · la fourchette du pied est une fourchette en français, une grenouille
       en anglais (frog), un rayon en allemand (Strahl).
     · casco en espagnol = le sabot ET le casque.
     · « to plait » se prononce « platt », et les Américains disent « braid ».
     · l'anglais tond avec des « clippers », jamais un « mower ».

   ⚠️ RELECTURE NATIVE OBLIGATOIRE AVANT PUBLICATION
   Les entrées marquées // ?? sont celles dont je ne suis pas sûr. Le
   japonais et l'italien technique du matériel de pansage sont les plus
   incertains du lot. Toutes reportées dans hype-lingo-doutes-a-verifier.md
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.pansage = {
  ref: "pansage",
  chapitre: 2,
  titre: { fr:"Le pansage", en:"Grooming", es:"La limpieza", it:"La pulizia", de:"Das Putzen", ja:"手入れ" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LA BOÎTE DE PANSAGE ============ */

  { ref:"pansage", lecon:1, coll:"outils",
    mots:{ fr:{m:"le pansage"}, en:{m:"grooming", p:"grou-ming"},
           es:{m:"la limpieza", var:"el cepillado"}, it:{m:"la pulizia", var:"la strigliatura"},
           de:{m:"das Putzen", p:"pout-seune"}, ja:{m:"手入れ", p:"teire", var:"グルーミング"} },
    def:{ fr:"L'ensemble des soins du poil, des pieds et des crins, avant et après le travail. En anglais, « grooming » désigne à la fois le geste et le métier.",
          en:"All the care of coat, feet and hair, before and after work. In English « grooming » is both the act and the job." } },

  { ref:"boite-pansage", lecon:1, coll:"outils",
    mots:{ fr:{m:"la boîte de pansage"}, en:{m:"the grooming kit", p:"grou-ming kitt", var:"grooming box"},
           es:{m:"la caja de limpieza"}, it:{m:"la cassetta della pulizia", var:"il kit di pulizia"},
           de:{m:"der Putzkasten", p:"pout-ss-kass-teune"}, ja:{m:"手入れ用具入れ", p:"teire yōgu-ire"} }, // ??
    def:{ fr:"Le coffret où l'on range brosses, étrille et cure-pied. Idéalement une par cheval : c'est ce qui évite de transporter une infection d'un box à l'autre.",
          en:"The box holding brushes, curry comb and hoof pick. Ideally one per horse, so nothing is carried from one stable to the next." } },

  { ref:"etrille", lecon:1, coll:"outils",
    mots:{ fr:{m:"l'étrille"}, en:{m:"the curry comb", p:"keu-ri kôme", var:"rubber curry (GB)"},
           es:{m:"la rasqueta"}, it:{m:"la striglia"},
           de:{m:"der Striegel", p:"chtri-gueul"}, ja:{m:"ゴムブラシ", p:"gomu burashi", var:"カリーコーム"} }, // ??
    def:{ fr:"Elle décolle la boue sèche et la poussière, en petits cercles. Jamais sur les membres ni sur la tête : l'os est trop près de la peau.",
          en:"It lifts dried mud and dust in small circles. Never on the legs or the head, where bone lies close under the skin." } },

  { ref:"brosse-dure", lecon:1, coll:"outils",
    mots:{ fr:{m:"la brosse dure"}, en:{m:"the dandy brush", p:"dann-di broche"},
           es:{m:"el cepillo duro", var:"la bruza"}, it:{m:"la brusca", var:"la spazzola dura"},
           de:{m:"die Wurzelbürste", p:"vour-tseul-bur-ste"}, ja:{m:"泥落としブラシ", p:"doro-otoshi burashi"} }, // ??
    def:{ fr:"Elle chasse ce que l'étrille a décollé. « Dandy » n'a rien à voir avec l'élégance : c'est simplement le nom anglais de la brosse à poils raides.",
          en:"It sweeps away what the curry comb has lifted. « Dandy » here has nothing to do with elegance: it is just the name of the stiff-bristled brush." } },

  { ref:"brosse-douce", lecon:1, coll:"outils",
    mots:{ fr:{m:"la brosse douce"}, en:{m:"the body brush", p:"bo-di broche"},
           es:{m:"el cepillo blando", var:"el cepillo suave"}, it:{m:"la spazzola morbida"},
           de:{m:"die Kardätsche", p:"kar-dè-tche"}, ja:{m:"毛ブラシ", p:"ke-burashi", var:"胴ブラシ"} }, // ??
    def:{ fr:"Elle lustre le poil et se passe partout, tête comprise. ⚠️ L'allemand a deux mots bien séparés : Wurzelbürste pour la dure, Kardätsche pour celle-ci. Les confondre s'entend tout de suite dans une écurie allemande.",
          en:"It polishes the coat and can be used everywhere, head included. German keeps two distinct words: Wurzelbürste for the stiff brush, Kardätsche for this one." } },

  { ref:"cure-pied", lecon:1, coll:"outils",
    mots:{ fr:{m:"le cure-pied"}, en:{m:"the hoof pick", p:"houf pik"},
           es:{m:"el escarbador", var:"el limpiacascos"}, it:{m:"il curasnetta"}, // ??
           de:{m:"der Hufkratzer", p:"houf-krat-seur"}, ja:{m:"裏掘り", p:"urabori"} },
    def:{ fr:"Le premier outil qu'on sort de la boîte. Les quatre pieds, avant et après chaque séance, du talon vers la pointe.",
          en:"The first tool out of the box. All four feet, before and after every session, working from heel to toe." } },

  { ref:"eponge", lecon:1, coll:"outils",
    mots:{ fr:{m:"l'éponge"}, en:{m:"the sponge", p:"sponndj"},
           es:{m:"la esponja"}, it:{m:"la spugna"},
           de:{m:"der Schwamm", p:"chvam"}, ja:{m:"スポンジ", p:"suponji"} },
    def:{ fr:"Une éponge pour les yeux et les naseaux, une autre pour l'arrière-main. On ne les échange jamais, et on ne les confond pas.",
          en:"One sponge for eyes and nostrils, another for the dock. They are never swapped and never mixed up." } },

  { ref:"peigne", lecon:1, coll:"outils",
    mots:{ fr:{m:"le peigne à crinière"}, en:{m:"the mane comb", p:"mène kôme"},
           es:{m:"el peine", var:"el peine de crin"}, it:{m:"il pettine", var:"il pettine per criniera"},
           de:{m:"der Mähnenkamm", p:"mè-neune-kam"}, ja:{m:"たてがみ用くし", p:"tategami-yō kushi"} }, // ??
    def:{ fr:"Peigne de métal ou de plastique, réservé à la crinière. La queue se démêle aux doigts : le peigne y casse les crins, qui mettent des années à repousser.",
          en:"A metal or plastic comb, for the mane only. Tails are teased out by hand — a comb breaks hairs that take years to grow back." } },

  { ref:"brosse-eau", lecon:1, coll:"outils",
    mots:{ fr:{m:"la brosse à eau"}, en:{m:"the water brush", p:"ouo-teur broche"},
           es:{m:"el cepillo de agua"}, it:{m:"la spazzola per l'acqua"}, // ??
           de:{m:"die Wasserbürste", p:"va-seur-bur-ste"}, ja:{m:"水ブラシ", p:"mizu burashi"} },
    def:{ fr:"Mouillée, elle couche la crinière et lave la paroi du sabot avant le graissage.",
          en:"Used damp, it lays the mane down and washes the hoof wall before oiling." } },

  { ref:"couteau-chaleur", lecon:1, coll:"outils",
    mots:{ fr:{m:"le couteau de chaleur"}, en:{m:"the sweat scraper", p:"souètt skré-peur"},
           es:{m:"la rasqueta de sudor"}, it:{m:"il raschiatoio"}, // ??
           de:{m:"das Schweißmesser", p:"chvaïss-mè-seur"}, ja:{m:"汗取り", p:"asetori"} }, // ??
    def:{ fr:"La lame souple qui racle la sueur ou l'eau après le travail. Un cheval laissé mouillé prend froid, même en été.",
          en:"The flexible blade that scrapes off sweat or water after work. A horse left wet gets cold, even in summer." } },

  { ref:"tondeuse", lecon:1, coll:"outils",
    mots:{ fr:{m:"la tondeuse"}, en:{m:"the clippers", p:"kli-peurz"},
           es:{m:"la esquiladora", var:"la máquina de esquilar"}, it:{m:"la tosatrice"},
           de:{m:"die Schermaschine", p:"chèr-ma-chi-ne"}, ja:{m:"バリカン", p:"barikan"} },
    def:{ fr:"On tond un cheval qui travaille l'hiver pour qu'il sèche vite. Le mot anglais est toujours au pluriel : « the clippers ».",
          en:"A horse in winter work is clipped so it dries quickly. The English word is always plural: the clippers." } },

  { ref:"graisse-pieds", lecon:1, coll:"outils",
    mots:{ fr:{m:"la graisse à pieds", var:"l'onguent"}, en:{m:"hoof oil", p:"houf oïl", var:"hoof grease"},
           es:{m:"la grasa para cascos"}, it:{m:"il grasso per zoccoli"},
           de:{m:"das Huffett", p:"houf-fètt"}, ja:{m:"蹄油", p:"teiyu"} },
    def:{ fr:"S'applique sur un sabot propre et sec, paroi et sole. Pas tous les jours : le pied doit aussi respirer.",
          en:"Applied to a clean, dry hoof, wall and sole. Not every day — the foot needs to breathe too." } },

  /* ============ LEÇON 2 · LE CHEVAL SOUS LA BROSSE ============ */

  { ref:"poil", lecon:2, coll:"corps",
    mots:{ fr:{m:"le poil", var:"la robe"}, en:{m:"the coat", p:"kôte"},
           es:{m:"el pelo", var:"la capa"}, it:{m:"il pelo", var:"il mantello"},
           de:{m:"das Fell", p:"fèll"}, ja:{m:"毛", p:"ke", var:"毛色 keshoku = la robe"} },
    def:{ fr:"Le pelage. Son brillant est le premier signe visible de la santé d'un cheval — et il vient d'abord du dedans.",
          en:"The coat. Its shine is the first visible sign of a horse's health, and it comes from the inside first." } },

  { ref:"criniere", lecon:2, coll:"corps",
    mots:{ fr:{m:"la crinière"}, en:{m:"the mane", p:"mène"},
           es:{m:"la crin", var:"las crines"}, it:{m:"la criniera"},
           de:{m:"die Mähne", p:"mè-ne"}, ja:{m:"たてがみ", p:"tategami"} },
    def:{ fr:"Les crins de l'encolure. Dans la tradition classique, on les couche du côté droit.",
          en:"The hair along the neck, traditionally laid over on the off side." } },

  { ref:"toupet", lecon:2, coll:"corps",
    mots:{ fr:{m:"le toupet"}, en:{m:"the forelock", p:"for-lok"},
           es:{m:"el tupé", var:"el copete"}, it:{m:"il ciuffo"},
           de:{m:"der Schopf", p:"chopf"}, ja:{m:"前髪", p:"maegami"} },
    def:{ fr:"La mèche qui tombe entre les oreilles. On la ramène par-dessus le frontal quand on met le filet.",
          en:"The lock falling between the ears, brought over the browband when bridling." } },

  { ref:"queue", lecon:2, coll:"corps",
    mots:{ fr:{m:"la queue"}, en:{m:"the tail", p:"téïl"},
           es:{m:"la cola"}, it:{m:"la coda"},
           de:{m:"der Schweif", p:"chvaïf"}, ja:{m:"尾", p:"o", var:"尻尾 shippo, courant"} },
    def:{ fr:"⚠️ L'allemand a un mot propre au cheval : der Schweif. Schwanz, le mot courant pour la queue d'un animal, ne s'emploie pas en écurie.",
          en:"German keeps a special word for a horse's tail, Schweif, rather than the everyday Schwanz." } },

  { ref:"sabot", lecon:2, coll:"corps",
    mots:{ fr:{m:"le sabot"}, en:{m:"the hoof", p:"houf", var:"hooves au pluriel"},
           es:{m:"el casco"}, it:{m:"lo zoccolo"},
           de:{m:"der Huf", p:"houf"}, ja:{m:"蹄", p:"hitsume"} },
    def:{ fr:"⚠️ En espagnol, casco veut dire à la fois le sabot et le casque : seul le contexte tranche. « Pas de pied, pas de cheval » se dit dans toutes les langues.",
          en:"In Spanish, casco means both hoof and helmet — only context decides. « No foot, no horse » exists in every language." } },

  { ref:"sole", lecon:2, coll:"corps",
    mots:{ fr:{m:"la sole"}, en:{m:"the sole", p:"sôl"},
           es:{m:"la palma"}, it:{m:"la suola"},
           de:{m:"die Sohle", p:"zô-le"}, ja:{m:"蹄底", p:"teitei"} },
    def:{ fr:"Le dessous du pied, qu'on dégage au cure-pied. L'espagnol l'appelle la palma, la paume.",
          en:"The underside of the foot, cleared with the hoof pick. Spanish calls it the palm." } },

  { ref:"fourchette", lecon:2, coll:"corps",
    mots:{ fr:{m:"la fourchette"}, en:{m:"the frog", p:"frogue"},
           es:{m:"la ranilla"}, it:{m:"il fettone"},
           de:{m:"der Strahl", p:"chtral"}, ja:{m:"蹄叉", p:"teisa"} },
    def:{ fr:"Le coussin en V au centre de la sole, qui amortit et pompe le sang. Chaque langue l'a baptisé autrement : une fourchette en français, une grenouille en anglais, un rayon en allemand.",
          en:"The V-shaped cushion in the middle of the sole, which absorbs shock and pumps blood. Each language named it differently: a fork in French, a frog in English, a ray in German." } },

  { ref:"membres", lecon:2, coll:"corps",
    mots:{ fr:{m:"les membres"}, en:{m:"the legs", p:"lègz"},
           es:{m:"los miembros", var:"las patas"}, it:{m:"gli arti", var:"le gambe"},
           de:{m:"die Beine", p:"baï-ne"}, ja:{m:"肢", p:"ashi"} },
    def:{ fr:"On les brosse doucement, à la brosse douce et jamais à l'étrille : l'os est juste sous la peau.",
          en:"Brushed gently with the body brush, never with a curry comb: the bone is just under the skin." } },

  { ref:"dos", lecon:2, coll:"corps",
    mots:{ fr:{m:"le dos"}, en:{m:"the back", p:"bak"},
           es:{m:"el lomo", var:"el dorso"}, it:{m:"la schiena"},
           de:{m:"der Rücken", p:"ru-keune"}, ja:{m:"背", p:"se"} },
    def:{ fr:"La zone à vérifier avant de seller : un grain de sable resté sous le tapis suffit à blesser en une reprise.",
          en:"Always checked before saddling: one grain of sand left under the pad can rub a sore in a single lesson." } },

  { ref:"encolure", lecon:2, coll:"corps",
    mots:{ fr:{m:"l'encolure"}, en:{m:"the neck", p:"nèk"},
           es:{m:"el cuello"}, it:{m:"il collo"},
           de:{m:"der Hals", p:"halss"}, ja:{m:"首", p:"kubi"} },
    def:{ fr:"Du garrot à la tête. C'est par là qu'on commence le pansage, jamais par l'arrière-main.",
          en:"From withers to head. Grooming starts here, never at the hindquarters." } },

  /* ============ LEÇON 3 · LES GESTES ============ */

  { ref:"panser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"panser"}, en:{m:"to groom", p:"grou-me"},
           es:{m:"limpiar", var:"almohazar"}, it:{m:"pulire", var:"strigliare"},
           de:{m:"putzen", p:"pout-seune"}, ja:{m:"手入れをする", p:"teire o suru"} },
    def:{ fr:"Le verbe d'ensemble. ⚠️ En français il veut aussi dire soigner une plaie ; l'anglais sépare les deux (« to dress a wound »).",
          en:"The general verb. In French the same word also means to dress a wound; English keeps the two apart." } },

  { ref:"brosser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"brosser"}, en:{m:"to brush", p:"broche"},
           es:{m:"cepillar"}, it:{m:"spazzolare"},
           de:{m:"bürsten", p:"bur-steune"}, ja:{m:"ブラシをかける", p:"burashi o kakeru"} },
    def:{ fr:"Dans le sens du poil, de l'avant vers l'arrière, en appuyant sur le corps et à peine sur les membres.",
          en:"With the lie of the coat, front to back, firmly on the body and barely at all on the legs." } },

  { ref:"etriller", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"étriller"}, en:{m:"to curry", p:"keu-ri"},
           es:{m:"rasquetear"}, it:{m:"strigliare"},
           de:{m:"striegeln", p:"chtri-gueuln"}, ja:{m:"ゴムブラシをかける", p:"gomu burashi o kakeru"} }, // ??
    def:{ fr:"Passer l'étrille en petits cercles avant la brosse, pour faire remonter poussière et poils morts.",
          en:"Working the curry comb in small circles before brushing, to bring dust and dead hair to the surface." } },

  { ref:"curer-pieds", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"curer les pieds"}, en:{m:"to pick out the feet", p:"pik aoute ze fitt"},
           es:{m:"limpiar los cascos"}, it:{m:"pulire gli zoccoli"},
           de:{m:"die Hufe auskratzen", p:"hou-fe aouss-krat-seune"}, ja:{m:"裏掘りをする", p:"urabori o suru"} },
    def:{ fr:"Du talon vers la pointe, jamais l'inverse, pour ne pas blesser la fourchette. C'est le geste qui trouve le caillou, le clou ou l'odeur qui annonce un problème.",
          en:"From heel to toe, never the other way, so as not to damage the frog. This is the moment you find the stone, the nail, or the smell that warns of trouble." } },

  { ref:"demeler", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"démêler"}, en:{m:"to detangle", p:"di-tan-gueul", var:"to comb out"},
           es:{m:"desenredar"}, it:{m:"districare"},
           de:{m:"auskämmen", p:"aouss-kè-meune"}, ja:{m:"絡まりをほどく", p:"karamari o hodoku"} }, // ??
    def:{ fr:"On part du bas de la mèche et on remonte, brin par brin. Un crin arraché met deux ans à repousser.",
          en:"Start at the bottom of the lock and work up, strand by strand. A pulled hair takes two years to grow back." } },

  { ref:"tresser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"tresser"}, en:{m:"to plait", p:"platt", var:"to braid (US)"},
           es:{m:"trenzar"}, it:{m:"intrecciare"},
           de:{m:"einflechten", p:"aïn-flèch-teune"}, ja:{m:"編む", p:"amu"} },
    def:{ fr:"⚠️ Double piège : « to plait » se prononce « platt » en Grande-Bretagne, et les Américains disent « to braid ». Deux mots pour le même geste de concours.",
          en:"A double trap: « to plait » is pronounced « platt » in Britain, while Americans say « to braid »." } },

  { ref:"tondre", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"tondre"}, en:{m:"to clip", p:"klipp"},
           es:{m:"esquilar"}, it:{m:"tosare"},
           de:{m:"scheren", p:"ché-reune"}, ja:{m:"毛刈りをする", p:"kegari o suru"} }, // ??
    def:{ fr:"Raser tout ou partie du poil d'hiver pour que le cheval sèche vite. ⚠️ En anglais c'est « to clip » ; « to shear » est réservé aux moutons.",
          en:"Taking off all or part of the winter coat so the horse dries quickly. English says « to clip »; « to shear » belongs to sheep." } },

  { ref:"secher", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"sécher"}, en:{m:"to dry off", p:"draï off"},
           es:{m:"secar"}, it:{m:"asciugare"},
           de:{m:"abtrocknen", p:"ap-trok-neune", var:"trockenreiten = sécher au pas, monté"}, ja:{m:"乾かす", p:"kawakasu"} },
    def:{ fr:"On racle, on frictionne, on marche. L'allemand a un verbe pour sécher un cheval en le montant au pas : trockenreiten.",
          en:"Scrape, rub, walk. German even has a verb for drying a horse off by walking it under saddle: trockenreiten." } },

  { ref:"graisser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"graisser les pieds"}, en:{m:"to oil the hooves", p:"oïl ze houvz"},
           es:{m:"engrasar los cascos"}, it:{m:"ingrassare gli zoccoli"},
           de:{m:"die Hufe einfetten", p:"aïn-fè-teune"}, ja:{m:"蹄油を塗る", p:"teiyu o nuru"} },
    def:{ fr:"Dernier geste du pansage de concours, sur un pied propre et sec, sole comprise.",
          en:"The last step before a show, on a clean dry foot, sole included." } },

  { ref:"eponger-yeux", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"éponger les yeux"}, en:{m:"to sponge the eyes", p:"sponndj ze aïz"},
           es:{m:"limpiar los ojos"}, it:{m:"pulire gli occhi"},
           de:{m:"die Augen auswaschen", p:"aou-gueune aouss-va-cheune"}, ja:{m:"目を拭く", p:"me o fuku"} },
    def:{ fr:"À l'eau claire, avec l'éponge réservée à la tête, du coin de l'œil vers l'extérieur. Puis les naseaux.",
          en:"With clean water and the head sponge only, from the inner corner outwards. Then the nostrils." } },

  /* ============ LEÇON 4 · CE QU'ON ENLÈVE, CE QU'ON REPÈRE ============ */

  { ref:"boue", lecon:4, coll:"etat",
    mots:{ fr:{m:"la boue"}, en:{m:"the mud", p:"meud"},
           es:{m:"el barro"}, it:{m:"il fango"},
           de:{m:"der Schlamm", p:"chlam", var:"der Matsch, courant"}, ja:{m:"泥", p:"doro"} },
    def:{ fr:"On la laisse sécher avant de l'enlever : brossée mouillée, elle s'incruste dans le poil.",
          en:"Let it dry before removing it: brushed wet, it works into the coat." } },

  { ref:"poussiere", lecon:4, coll:"etat",
    mots:{ fr:{m:"la poussière"}, en:{m:"the dust", p:"deust"},
           es:{m:"el polvo"}, it:{m:"la polvere"},
           de:{m:"der Staub", p:"chtaoub"}, ja:{m:"ほこり", p:"hokori"} },
    def:{ fr:"Ce que la brosse dure fait remonter et que la brosse douce emporte. Un cheval poussiéreux n'est pas un cheval sale.",
          en:"What the dandy brush lifts and the body brush carries away. A dusty horse is not a dirty one." } },

  { ref:"sueur", lecon:4, coll:"etat",
    mots:{ fr:{m:"la sueur"}, en:{m:"the sweat", p:"souètt"},
           es:{m:"el sudor"}, it:{m:"il sudore"},
           de:{m:"der Schweiß", p:"chvaïss"}, ja:{m:"汗", p:"ase"} },
    def:{ fr:"Séchée sur le poil, elle irrite, surtout sous la selle et la sangle. À racler ou rincer après chaque séance.",
          en:"Left to dry on the coat it irritates, especially under saddle and girth. Scrape or rinse it off after every session." } },

  { ref:"noeud", lecon:4, coll:"etat",
    mots:{ fr:{m:"le nœud"}, en:{m:"the tangle", p:"tan-gueul", var:"knot"},
           es:{m:"el enredo", var:"el nudo"}, it:{m:"il nodo"},
           de:{m:"der Knoten", p:"knô-teune", var:"der Filz = crins feutrés"}, ja:{m:"絡まり", p:"karamari"} },
    def:{ fr:"Dans la crinière ou la queue. L'allemand a un mot pour le stade suivant, quand les crins sont feutrés : der Filz.",
          en:"In the mane or the tail. German has a word for the next stage, when the hair has matted: der Filz." } },

  { ref:"mue", lecon:4, coll:"etat",
    mots:{ fr:{m:"la mue"}, en:{m:"the moult", p:"môlte", var:"shedding (US)"},
           es:{m:"la muda"}, it:{m:"la muta"},
           de:{m:"der Fellwechsel", p:"fèll-vèk-seul"}, ja:{m:"換毛", p:"kanmō", var:"換毛期 = la période"} },
    def:{ fr:"Deux fois par an, le cheval change de poil. C'est la saison de l'étrille, des poignées de poils partout et des pansages deux fois plus longs.",
          en:"Twice a year the horse changes coat. Curry comb season: handfuls of hair everywhere and grooming that takes twice as long." } },

  { ref:"tache", lecon:4, coll:"etat",
    mots:{ fr:{m:"la tache"}, en:{m:"the stain", p:"stéïne", var:"stable stain"},
           es:{m:"la mancha"}, it:{m:"la macchia"},
           de:{m:"der Fleck", p:"flèk", var:"der Liegefleck"}, ja:{m:"汚れ", p:"yogore"} },
    def:{ fr:"Sur un gris, la marque jaune laissée par la litière pendant la nuit. L'anglais et l'allemand ont un mot exprès : stable stain, Liegefleck.",
          en:"On a grey, the yellow mark left by the bedding overnight. English and German both have a word for it: stable stain, Liegefleck." } },

  { ref:"propre", lecon:4, coll:"etat",
    mots:{ fr:{m:"propre"}, en:{m:"clean", p:"kline"},
           es:{m:"limpio"}, it:{m:"pulito"},
           de:{m:"sauber", p:"zao-beur"}, ja:{m:"きれい", p:"kirei"} },
    def:{ fr:"Le mot qu'on entend quand le pansage est validé. En japonais, きれい veut dire à la fois propre et beau.",
          en:"The word you hear once the grooming passes. In Japanese, きれい means both clean and beautiful." } },

  { ref:"sale", lecon:4, coll:"etat",
    mots:{ fr:{m:"sale"}, en:{m:"dirty", p:"deur-ti"},
           es:{m:"sucio"}, it:{m:"sporco"},
           de:{m:"schmutzig", p:"chmout-sirh"}, ja:{m:"汚い", p:"kitanai"} },
    def:{ fr:"À entendre sans se vexer : dans une écurie, c'est une consigne, pas un reproche.",
          en:"Not to be taken personally: on a yard it is an instruction, not a criticism." } },

  { ref:"eclat", lecon:4, coll:"etat",
    mots:{ fr:{m:"l'éclat du poil"}, en:{m:"the shine", p:"chaïne", var:"bloom"},
           es:{m:"el brillo"}, it:{m:"la lucentezza"},
           de:{m:"der Glanz", p:"glanntss"}, ja:{m:"艶", p:"tsuya"} },
    def:{ fr:"Le but du pansage. Les Britanniques parlent de « bloom » : l'éclat qui vient de l'alimentation et du travail, que la brosse révèle mais ne fabrique pas.",
          en:"The point of grooming. The British speak of « bloom »: a shine that comes from feed and work, which the brush reveals but cannot create." } },

  { ref:"tique", lecon:4, coll:"etat",
    mots:{ fr:{m:"la tique"}, en:{m:"the tick", p:"tik"},
           es:{m:"la garrapata"}, it:{m:"la zecca"},
           de:{m:"die Zecke", p:"tsè-ke"}, ja:{m:"マダニ", p:"madani"} },
    def:{ fr:"À chercher après chaque sortie au pré : sous le ventre, entre les cuisses, à la base de la crinière. Se retire d'un mouvement droit, sans tourner.",
          en:"Look for them after every turnout: under the belly, between the thighs, at the base of the mane. Pull straight out, without twisting." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"ou-boite", lecon:1,
      fr:"Où est la boîte de pansage ?",
      en:"Where's the grooming kit ?",
      es:"¿ Dónde está la caja de limpieza ?",
      it:"Dov'è la cassetta della pulizia ?",
      de:"Wo ist der Putzkasten ?",
      ja:"手入れ用具 は どこ です か ?" },
    { ref:"passe-cure-pied", lecon:1,
      fr:"Tu me passes le cure-pied ?",
      en:"Can you pass me the hoof pick ?",
      es:"¿ Me pasas el escarbador ?",
      it:"Mi passi il curasnetta ?",
      de:"Kannst du mir den Hufkratzer geben ?",
      ja:"裏掘り を 取って もらえ ます か ?" },
    { ref:"pieds-avant-seller", lecon:3,
      fr:"Je lui cure les pieds avant de seller.",
      en:"I'll pick out his feet before I tack up.",
      es:"Le limpio los cascos antes de ensillar.",
      it:"Gli pulisco gli zoccoli prima di sellare.",
      de:"Ich kratze ihm die Hufe aus, bevor ich sattle.",
      ja:"馬装 の 前 に 裏掘り を し ます 。" },
    { ref:"sensible-membres", lecon:2,
      fr:"Attention, elle est sensible aux membres.",
      en:"Careful, she's touchy about her legs.",
      es:"Cuidado, es sensible en las patas.",
      it:"Attenzione, è sensibile agli arti.",
      de:"Vorsicht, sie ist an den Beinen empfindlich.",
      ja:"脚 を 触ら れる の が 苦手 です 。" },
    { ref:"couvert-boue", lecon:4,
      fr:"Il est couvert de boue, il faut la laisser sécher.",
      en:"He's caked in mud — better let it dry first.",
      es:"Está cubierto de barro, hay que dejarlo secar.",
      it:"È coperto di fango, bisogna lasciarlo asciugare.",
      de:"Er ist voller Schlamm, das muss erst trocknen.",
      ja:"泥 だらけ です 、 乾く まで 待ち ましょう 。" },
    { ref:"demeler-queue", lecon:3,
      fr:"Tu peux me démêler sa queue ?",
      en:"Could you comb out her tail for me ?",
      es:"¿ Me puedes desenredar la cola ?",
      it:"Mi puoi districare la coda ?",
      de:"Kannst du ihr den Schweif auskämmen ?",
      ja:"尾 の 絡まり を ほどいて もらえ ます か ?" },
    { ref:"sue-racler", lecon:4,
      fr:"Il a sué, je le racle et je le fais marcher.",
      en:"He's sweated up — I'll scrape him off and walk him.",
      es:"Ha sudado, le paso la rasqueta y lo paseo.",
      it:"Ha sudato, lo raschio e lo faccio camminare.",
      de:"Er hat geschwitzt, ich ziehe ihn ab und führe ihn.",
      ja:"汗 を かいた ので 、 汗 を 取って 引き運動 を し ます 。" }
  ]
};
