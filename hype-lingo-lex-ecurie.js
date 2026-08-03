/* hype-lingo-lex-ecurie.js — Hype Lingo · Chapitre 1 · « L'écurie »
   ==================================================================
   40 CONCEPTS, QUATRE LEÇONS DE DIX.

   UN CONCEPT = UN OBJET DU MONDE ÉQUESTRE avec ses 6 langues côte à côte.
   Aucune langue source : le moteur lit la langue de l'interface et propose
   les 5 autres. Un cavalier japonais apprend le français avec ce fichier,
   sans une ligne de plus.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA, les trois
          langues où un francophone se trompe. ES et IT se lisent comme
          ils s'écrivent : une phonétique n'aiderait personne.
     var  variante régionale (GB/US, Espagne/Amérique…)
     def  définition — sert au mode Lexique, au verso de la carte et
          d'indice dans les jeux
     v    true si c'est un verbe (le moteur les traite à part)

   ⚠️ RELECTURE NATIVE OBLIGATOIRE AVANT PUBLICATION
   Le vocabulaire d'écurie n'est pas du vocabulaire courant. Les entrées
   marquées // ?? sont celles dont je ne suis pas sûr : à faire valider par
   un cavalier natif. Le japonais équestre est le plus incertain du lot —
   plusieurs termes coexistent (emprunt à l'anglais contre terme
   traditionnel) et l'usage réel en écurie m'échappe.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.ecurie = {
  ref: "ecurie",
  chapitre: 1,
  titre: { fr:"L'écurie", en:"The yard", es:"La cuadra", it:"La scuderia", de:"Der Stall", ja:"厩舎" },
  lecons: 4,

  concepts: [

  /* ================= LEÇON 1 · LE LIEU ================= */

  { ref:"box", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le box"}, en:{m:"the stable", p:"sté-beul", var:"loose box (GB) · stall (US)"},
           es:{m:"el box", var:"la cuadra"}, it:{m:"il box"},
           de:{m:"die Box", p:"boks"}, ja:{m:"馬房", p:"babō"} },
    def:{ fr:"Logement individuel fermé où le cheval dort et mange. Se cure une à deux fois par jour.",
          en:"Individual enclosed space where a horse sleeps and eats. Mucked out once or twice a day." } },

  { ref:"sellerie", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la sellerie"}, en:{m:"the tack room", p:"tak-roum"},
           es:{m:"el guadarnés", var:"el cuarto de monturas"}, it:{m:"la selleria"},
           de:{m:"die Sattelkammer", p:"za-teul-ka-meur"}, ja:{m:"馬具庫", p:"bagukō"} },
    def:{ fr:"Local où sont rangés selles, filets et matériel. Chaque cheval y a sa place attribuée.",
          en:"Room where saddles, bridles and kit are kept, each horse having its own spot." } },

  { ref:"cour", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la cour"}, en:{m:"the yard", p:"yard"},
           es:{m:"el patio"}, it:{m:"il cortile"},
           de:{m:"der Hof", p:"hof"}, ja:{m:"中庭", p:"nakaniwa"} },
    def:{ fr:"L'espace ouvert autour des écuries, où l'on panse, attache et fait circuler les chevaux. En Grande-Bretagne, « the yard » désigne aussi tout l'établissement.",
          en:"The open space around the stables, where horses are groomed, tied and led about. In Britain, « the yard » also means the whole establishment." } },

  { ref:"allee", lecon:1, coll:"lieu",
    mots:{ fr:{m:"l'allée"}, en:{m:"the aisle", p:"aïl", var:"the barn aisle (US)"},
           es:{m:"el pasillo"}, it:{m:"il corridoio"},
           de:{m:"der Stallgang", p:"chtal-gang"}, ja:{m:"通路", p:"tsūro"} },
    def:{ fr:"Le couloir central qui dessert les box. On y garde toujours le passage libre.",
          en:"The central corridor serving the boxes. It is always kept clear." } },

  { ref:"manege", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le manège"}, en:{m:"the indoor school", p:"in-dor-skoul", var:"the indoor arena (US)"},
           es:{m:"el picadero cubierto"}, it:{m:"il maneggio coperto"},
           de:{m:"die Reithalle", p:"raït-ha-le"}, ja:{m:"屋内馬場", p:"okunai bajō"} },
    def:{ fr:"Piste de travail couverte. Ne pas confondre avec la carrière, qui est en plein air.",
          en:"Covered working arena. Not to be confused with the outdoor school." } },

  { ref:"carriere", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la carrière"}, en:{m:"the outdoor school", p:"aoute-dor-skoul", var:"the arena · « the ménage » (courant à l'écrit, mais fautif)"},
           es:{m:"la pista"}, it:{m:"il campo"},
           de:{m:"der Reitplatz", p:"raït-plats"}, ja:{m:"屋外馬場", p:"okugai bajō"} },
    def:{ fr:"Piste de travail en plein air, généralement en sable.",
          en:"Open-air working arena, usually sand. Note: British riders often write « ménage » — the French word is « manège », and even that means the indoor one." } },

  { ref:"pre", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le pré"}, en:{m:"the field", p:"fild", var:"the pasture (US)"},
           es:{m:"el prado"}, it:{m:"il prato"},
           de:{m:"die Weide", p:"vaï-de"}, ja:{m:"放牧地", p:"hōbokuchi"} },
    def:{ fr:"Terrain d'herbe où le cheval vit ou passe la journée.",
          en:"Grass ground where the horse lives or spends the day." } },

  { ref:"paddock", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le paddock"}, en:{m:"the paddock", p:"pa-dok", var:"the turnout (US)"},
           es:{m:"el paddock", var:"el corral"}, it:{m:"il paddock"},
           de:{m:"das Paddock", p:"pa-dok"}, ja:{m:"パドック", p:"padokku"} },
    def:{ fr:"Petit enclos, souvent sans herbe, pour sortir un cheval quelques heures. Attention : en concours, « paddock » désigne aussi le rond de détente.",
          en:"Small enclosure, often bare, for turning a horse out for a few hours. Careful: at a show, « the paddock » can also mean the collecting ring." } },

  { ref:"tas-fumier", lecon:1, coll:"lieu",
    mots:{ fr:{m:"le tas de fumier"}, en:{m:"the muck heap", p:"meuk-hip", var:"the manure pile (US)"},
           es:{m:"el estercolero"}, it:{m:"la concimaia"}, /* validé : « letamaio » est agricole, « concimaia » est le mot des centres équestres */
           de:{m:"der Misthaufen", p:"mist-hao-fen"}, ja:{m:"堆肥場", p:"taihijō"} },
    def:{ fr:"Où l'on vide les brouettes. Son stockage est réglementé : ce n'est pas un détail administratif.",
          en:"Where the barrows are emptied. Its storage is regulated — not a mere formality." } },

  { ref:"grange", lecon:1, coll:"lieu",
    mots:{ fr:{m:"la grange"}, en:{m:"the barn", p:"barn", var:"the hay barn"},
           es:{m:"el granero"}, it:{m:"il fienile"},
           de:{m:"die Scheune", p:"choï-ne"}, ja:{m:"納屋", p:"naya"} },
    def:{ fr:"Où l'on stocke foin et paille, à l'abri de l'humidité et loin de toute flamme. Attention : en Amérique, « barn » désigne souvent toute l'écurie.",
          en:"Where hay and straw are stored, away from damp and from any flame. Careful: in America, « barn » often means the whole stable yard." } },

  /* ================= LEÇON 2 · LA LITIÈRE ET LES OUTILS ================= */

  { ref:"paille", lecon:2, coll:"litiere",
    mots:{ fr:{m:"la paille"}, en:{m:"straw", p:"stro"},
           es:{m:"la paja"}, it:{m:"la paglia"},
           de:{m:"das Stroh", p:"chtro"}, ja:{m:"藁", p:"wara"} },
    def:{ fr:"Tige de céréale séchée qui sert de litière. Certains chevaux la mangent : on passe alors aux copeaux.",
          en:"Dried cereal stalks used as bedding. Some horses eat it, and are moved onto shavings instead." } },

  { ref:"copeaux", lecon:2, coll:"litiere",
    mots:{ fr:{m:"les copeaux"}, en:{m:"shavings", p:"ché-vingz"},
           es:{m:"las virutas"}, it:{m:"i trucioli"},
           de:{m:"die Sägespäne", p:"zé-gue-chpè-ne"}, ja:{m:"おがくず", p:"ogakuzu"} },
    def:{ fr:"Litière de bois, plus chère que la paille mais moins poussiéreuse : utile aux chevaux qui toussent.",
          en:"Wood bedding, dearer than straw but less dusty — useful for horses with a cough." } },

  { ref:"litiere", lecon:2, coll:"litiere",
    mots:{ fr:{m:"la litière"}, en:{m:"the bedding", p:"bè-ding"},
           es:{m:"la cama"}, it:{m:"la lettiera"},
           de:{m:"die Einstreu", p:"aïn-chtroï"}, ja:{m:"敷料", p:"shikiryō"} },
    def:{ fr:"Le terme général, quel que soit le matériau : paille, copeaux, lin, chanvre, granulés de bois.",
          en:"The general word, whatever the material: straw, shavings, flax, hemp, wood pellets." } },

  { ref:"crottin", lecon:2, coll:"litiere",
    mots:{ fr:{m:"le crottin"}, en:{m:"the droppings", p:"dro-pingz"},
           es:{m:"las boñigas", var:"el excremento"}, it:{m:"lo sterco"},
           de:{m:"die Pferdeäpfel", p:"pfèr-de-èp-feul"}, ja:{m:"馬糞", p:"bafun"} },
    def:{ fr:"Les excréments eux-mêmes, qu'on retire du box. L'allemand dit joliment « pommes de cheval ».",
          en:"The droppings themselves, picked out of the box. German charmingly calls them « horse apples »." } },

  { ref:"fumier", lecon:2, coll:"litiere",
    mots:{ fr:{m:"le fumier"}, en:{m:"the manure", p:"meu-nyour", var:"the muck (GB)"},
           es:{m:"el estiércol"}, it:{m:"il letame"},
           de:{m:"der Mist", p:"mist"}, ja:{m:"堆肥", p:"taihi"} },
    def:{ fr:"Le mélange de crottin et de litière sale sorti du box. Différent du crottin seul.",
          en:"Droppings mixed with soiled bedding, taken out of the box. Not the same as droppings alone." } },

  { ref:"fourche", lecon:2, coll:"outils",
    mots:{ fr:{m:"la fourche"}, en:{m:"the muck fork", p:"meuk-fork"},
           es:{m:"la horca"}, it:{m:"la forca"},
           de:{m:"die Mistgabel", p:"mist-ga-beul"}, ja:{m:"フォーク", p:"fōku"} },
    def:{ fr:"Outil à dents courbes pour trier le crottin sans emporter toute la litière propre.",
          en:"Curved-tined tool for lifting droppings without throwing away good bedding." } },

  { ref:"brouette", lecon:2, coll:"outils",
    mots:{ fr:{m:"la brouette"}, en:{m:"the wheelbarrow", p:"ouil-ba-ro"},
           es:{m:"la carretilla"}, it:{m:"la carriola"},
           de:{m:"die Schubkarre", p:"choub-ka-re"}, ja:{m:"一輪車", p:"ichirinsha"} },
    def:{ fr:"Sert à sortir le fumier et à rapporter la litière propre.",
          en:"Used to carry muck out and clean bedding in." } },

  { ref:"balai", lecon:2, coll:"outils",
    mots:{ fr:{m:"le balai"}, en:{m:"the broom", p:"broum", var:"the yard brush (GB)"},
           es:{m:"la escoba"}, it:{m:"la scopa"},
           de:{m:"der Besen", p:"bé-zen"}, ja:{m:"ほうき", p:"hōki"} },
    def:{ fr:"On balaie l'allée après chaque passage. Une cour bien tenue se reconnaît à ça.",
          en:"The aisle is swept after every job. A well-kept yard shows in this detail." } },

  { ref:"pelle", lecon:2, coll:"outils",
    mots:{ fr:{m:"la pelle"}, en:{m:"the shovel", p:"cho-veul"},
           es:{m:"la pala"}, it:{m:"la pala"},
           de:{m:"die Schaufel", p:"chao-feul"}, ja:{m:"スコップ", p:"sukoppu"} },
    def:{ fr:"Pour ramasser ce que la fourche laisse : litière fine, sable, granulés renversés.",
          en:"For lifting what the fork leaves behind: fine bedding, sand, spilt feed." } },

  { ref:"tuyau", lecon:2, coll:"outils",
    mots:{ fr:{m:"le tuyau d'arrosage"}, en:{m:"the hosepipe", p:"hoz-païp", var:"the hose (US)"},
           es:{m:"la manguera"}, it:{m:"il tubo dell'acqua", var:"la canna dell'acqua"}, // ?? usage en écurie
           de:{m:"der Wasserschlauch", p:"va-seur-chlaourh"}, ja:{m:"ホース", p:"hōsu"} },
    def:{ fr:"Sert à remplir les seaux et à doucher les jambes après le travail. En concours, savoir où il est fait gagner dix minutes.",
          en:"Used to fill buckets and to hose legs after work. At a show, knowing where it is saves ten minutes." } },

  { ref:"seau", lecon:2, coll:"outils",
    mots:{ fr:{m:"le seau"}, en:{m:"the bucket", p:"beu-kit", var:"the pail (US)"},
           es:{m:"el cubo"}, it:{m:"il secchio"},
           de:{m:"der Eimer", p:"aï-meur"}, ja:{m:"バケツ", p:"baketsu"} },
    def:{ fr:"Récipient pour l'eau ou la ration. On en compte souvent deux par box : un pour boire, un pour les granulés.",
          en:"Container for water or feed. Most boxes have two: one for water, one for hard feed." } },

  /* ================= LEÇON 3 · L'EAU ET LA NOURRITURE ================= */

  { ref:"abreuvoir", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'abreuvoir"}, en:{m:"the water trough", p:"oua-teur-trof", var:"the automatic drinker"},
           es:{m:"el bebedero"}, it:{m:"l'abbeveratoio"},
           de:{m:"die Tränke", p:"trèn-ke"}, ja:{m:"水飲み場", p:"mizunomiba"} },
    def:{ fr:"Point d'eau à volonté. À vérifier matin et soir, surtout l'hiver : une conduite gelée se voit vite.",
          en:"Constant water supply. Check morning and evening, especially in winter when pipes freeze." } },

  { ref:"mangeoire", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la mangeoire"}, en:{m:"the manger", p:"main-djeur", var:"the feed bin"},
           es:{m:"el comedero"}, it:{m:"la greppia"},
           de:{m:"die Futterkrippe", p:"fou-teur-kri-pe"}, ja:{m:"飼い桶", p:"kaioke"} },
    def:{ fr:"Auge fixée dans le box où l'on verse la ration.",
          en:"Fixed trough in the box where the feed is poured." } },

  { ref:"foin", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le foin"}, en:{m:"hay", p:"hé"},
           es:{m:"el heno"}, it:{m:"il fieno"},
           de:{m:"das Heu", p:"hoï"}, ja:{m:"干し草", p:"hoshikusa"} },
    def:{ fr:"Herbe fauchée puis séchée : la base de la ration. Un cheval en consomme chaque jour 1,5 à 2 % de son poids.",
          en:"Grass cut and dried. The foundation of the diet: a horse eats 1.5 to 2 % of its bodyweight daily." } },

  { ref:"filet-foin", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le filet à foin"}, en:{m:"the haynet", p:"hé-nett"},
           es:{m:"la red de heno"}, it:{m:"la rete per il fieno"},
           de:{m:"das Heunetz", p:"hoï-nets"}, ja:{m:"干し草ネット", p:"hoshikusa netto"} },
    def:{ fr:"Filet à mailles serrées qui ralentit la prise de foin. À accrocher assez haut pour qu'un pied ne s'y prenne pas.",
          en:"Small-mesh net that slows hay intake. Tie it high enough that a foot cannot get caught." } },

  { ref:"granules", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"les granulés"}, en:{m:"the nuts", p:"neutts", var:"the pellets · hard feed (GB) · grain (US)"},
           es:{m:"el pienso"}, it:{m:"il mangime", var:"i pellet"},
           de:{m:"das Kraftfutter", p:"kraft-fou-teur", var:"die Pellets"}, ja:{m:"ペレット", p:"peretto"} },
    def:{ fr:"Aliment industriel compressé, donné en complément du fourrage selon le travail du cheval.",
          en:"Compressed manufactured feed, given on top of forage according to the horse's workload." } },

  { ref:"avoine", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'avoine"}, en:{m:"oats", p:"ots"},
           es:{m:"la avena"}, it:{m:"l'avena"},
           de:{m:"der Hafer", p:"ha-feur"}, ja:{m:"オート麦", p:"ōtomugi"} },
    def:{ fr:"Céréale traditionnelle, très énergétique. Beaucoup d'écuries l'ont remplacée par les granulés.",
          en:"The traditional grain, high in energy. Many yards have replaced it with nuts." } },

  { ref:"son", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"le son"}, en:{m:"bran", p:"brann"},
           es:{m:"el salvado"}, it:{m:"la crusca"},
           de:{m:"die Kleie", p:"klaï-e"}, ja:{m:"ふすま", p:"fusuma"} },
    def:{ fr:"Enveloppe du grain de blé. Servait au fameux barbotage, aujourd'hui déconseillé en grande quantité.",
          en:"The husk of the wheat grain. Once used for bran mashes, now discouraged in quantity." } },

  { ref:"ration", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la ration"}, en:{m:"the feed", p:"fid", var:"the ration"},
           es:{m:"la ración"}, it:{m:"la razione"},
           de:{m:"die Futterration", p:"fou-teur-ra-tsion"}, ja:{m:"飼料", p:"shiryō"} },
    def:{ fr:"Ce qu'un cheval reçoit à un repas donné. Se pèse, ne s'estime pas à l'œil.",
          en:"What a horse gets at a given meal. It is weighed, not guessed." } },

  { ref:"pierre-sel", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"la pierre à sel"}, en:{m:"the salt lick", p:"solt-lik", var:"the mineral block"},
           es:{m:"la piedra de sal"}, it:{m:"il blocco di sale"},
           de:{m:"der Salzleckstein", p:"zalts-lèk-chtaïn"}, ja:{m:"鉱塩", p:"kōen"} },
    def:{ fr:"Bloc de sel laissé à disposition dans le box. Le cheval se sert selon son besoin.",
          en:"Block of salt left in the box. The horse takes what it needs." } },

  { ref:"eau", lecon:3, coll:"nourriture",
    mots:{ fr:{m:"l'eau"}, en:{m:"water", p:"oua-teur"},
           es:{m:"el agua"}, it:{m:"l'acqua"},
           de:{m:"das Wasser", p:"va-seur"}, ja:{m:"水", p:"mizu"} },
    def:{ fr:"Le premier des besoins : de 30 à 50 litres par jour, davantage par forte chaleur ou au travail.",
          en:"The first need of all: thirty to fifty litres a day, more in heat or in work." } },

  /* ================= LEÇON 4 · TENIR, ATTACHER, LES GESTES ================= */

  { ref:"licol", lecon:4, coll:"materiel",
    mots:{ fr:{m:"le licol"}, en:{m:"the headcollar", p:"hed-ko-leur", var:"the halter (US)"},
           es:{m:"el cabestro", var:"el ronzal"}, it:{m:"la capezza"},
           de:{m:"das Halfter", p:"half-teur"}, ja:{m:"ハルター", p:"harutā", var:"無口 (mukuchi), terme traditionnel, surtout à l'écrit"} },
    def:{ fr:"Harnais de tête sans mors, pour tenir et mener le cheval à la main. Ne jamais laisser un cheval en liberté avec.",
          en:"Bitless head harness used to hold and lead a horse. Never leave one on a loose horse." } },

  { ref:"longe", lecon:4, coll:"materiel",
    mots:{ fr:{m:"la longe"}, en:{m:"the lead rope", p:"lid-rop"},
           es:{m:"el ramal"}, it:{m:"la longhina", var:"« longia » = la longe longue de travail en cercle"},
           de:{m:"der Führstrick", p:"fur-chtrik"}, ja:{m:"引き手", p:"hikite", var:"リード (rīdo), emprunté à l'anglais"} },
    def:{ fr:"Corde attachée au licol pour mener le cheval. Ne jamais l'enrouler autour de la main. L'italien distingue nettement : « longhina » pour mener en main, « longia » pour longer en cercle.",
          en:"Rope clipped to the headcollar for leading. Never wrap it around your hand. Italian keeps two words: « longhina » for leading, « longia » for the lunge line." } },

  { ref:"anneau", lecon:4, coll:"materiel",
    mots:{ fr:{m:"l'anneau d'attache"}, en:{m:"the tie ring", p:"taï-ring"},
           es:{m:"la argolla"}, it:{m:"l'anello"},
           de:{m:"der Anbindering", p:"an-bin-de-ring"}, ja:{m:"繋ぎ場", p:"tsunagiba", var:"タイリング (tai ringu) pour l'anneau lui-même"} },
    def:{ fr:"Point fixe où l'on attache le cheval, toujours avec une ficelle qui casse en cas de panique. Le japonais nomme l'endroit (繋ぎ場, « le lieu où l'on attache ») plutôt que l'anneau : les langues ne découpent pas le monde de la même façon.",
          en:"The fixed point a horse is tied to — always with a breakable string in case it panics. Japanese names the place rather than the ring itself." } },

  { ref:"couverture", lecon:4, coll:"materiel",
    mots:{ fr:{m:"la couverture"}, en:{m:"the rug", p:"reug", var:"the blanket (US)"},
           es:{m:"la manta"}, it:{m:"la coperta"},
           de:{m:"die Decke", p:"dè-ke"}, ja:{m:"馬着", p:"bachaku", var:"馬服 existe mais est rare"} },
    def:{ fr:"Protège du froid, de la pluie ou des mouches selon le modèle. Se contrôle chaque jour : une sangle qui tourne blesse.",
          en:"Protects from cold, rain or flies depending on the type. Check it daily — a twisted strap causes rubs." } },

  { ref:"curer", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"curer le box"}, en:{m:"to muck out", p:"tou-meuk-aoute"},
           es:{m:"limpiar el box"}, it:{m:"pulire il box"},
           de:{m:"ausmisten", p:"aous-mis-ten"}, ja:{m:"馬房を掃除する", p:"babō o sōji suru"} },
    def:{ fr:"Retirer crottin et litière souillée, puis remettre du propre. Le geste de base, tous les matins.",
          en:"Take out droppings and soiled bedding, then put clean back down. The basic daily job." } },

  { ref:"pailler", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"pailler"}, en:{m:"to bed down", p:"tou-bèd-daoune"},
           es:{m:"poner la cama"}, it:{m:"fare la lettiera"},
           de:{m:"einstreuen", p:"aïn-chtroï-en"}, ja:{m:"敷料を敷く", p:"shikiryō o shiku"} },
    def:{ fr:"Étaler la litière propre, plus épaisse au centre et relevée contre les murs.",
          en:"Spread the clean bedding, deeper in the middle and banked up against the walls." } },

  { ref:"nourrir", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"nourrir"}, en:{m:"to feed", p:"tou-fid"},
           es:{m:"dar de comer"}, it:{m:"dare da mangiare"},
           de:{m:"füttern", p:"fu-teurn"}, ja:{m:"餌をやる", p:"esa o yaru"} },
    def:{ fr:"Distribuer la ration, toujours aux mêmes heures : l'estomac du cheval n'aime pas l'improvisation.",
          en:"Give out the feed, always at the same times — a horse's stomach dislikes improvisation." } },

  { ref:"sortir", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"sortir au pré"}, en:{m:"to turn out", p:"tou-teurn-aoute"},
           es:{m:"sacar al prado"}, it:{m:"mandare al prato"},
           de:{m:"auf die Weide bringen", p:"aouf-di-vaï-de-brin-guen"}, ja:{m:"放牧する", p:"hōboku suru"} },
    def:{ fr:"Mener le cheval au pré ou au paddock. « Turn out » est l'un des verbes les plus employés dans une écurie anglaise.",
          en:"Take the horse out to the field or paddock. « Turn out » is one of the most-used verbs on an English yard." } },

  { ref:"rentrer", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"rentrer"}, en:{m:"to bring in", p:"tou-bring-inn"},
           es:{m:"meter al box"}, it:{m:"riportare in box"},
           de:{m:"hereinholen", p:"hè-raïn-ho-len"}, ja:{m:"馬房に戻す", p:"babō ni modosu"} },
    def:{ fr:"Ramener le cheval du pré au box, le soir ou avant le travail.",
          en:"Bring the horse in from the field, in the evening or before work." } },

  { ref:"doucher", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"doucher"}, en:{m:"to hose down", p:"tou-hoz-daoune"},
           es:{m:"duchar", var:"mangueriar"}, it:{m:"docciare"},
           de:{m:"abspritzen", p:"ap-chprit-sen"}, ja:{m:"馬体を洗う", p:"batai o arau"} }, // ?? formulation courante
    def:{ fr:"Rincer le cheval, ou seulement les membres, après le travail. Sur un cheval chaud, on commence par les jambes, jamais par les reins.",
          en:"Rinse the horse, or just the legs, after work. On a hot horse, start at the legs, never at the loins." } },

  { ref:"attacher", lecon:4, coll:"gestes", v:true,
    mots:{ fr:{m:"attacher"}, en:{m:"to tie up", p:"tou-taï-eup"},
           es:{m:"atar"}, it:{m:"legare"},
           de:{m:"anbinden", p:"an-bin-den"}, ja:{m:"繋ぐ", p:"tsunagu"} },
    def:{ fr:"Fixer le cheval par la longe pour le panser ou le seller. Nœud à dégagement rapide, jamais un nœud serré.",
          en:"Secure the horse by the lead rope to groom or tack up. Quick-release knot, never a tight one." } }
  ],

  /* ---- phrases du chapitre : le moteur les découpe en tuiles ---- */
  phrases: [
    { ref:"remplir-seaux", lecon:2,
      fr:"Tu peux remplir les seaux d'eau ?",
      en:"Can you fill the water buckets ?",
      es:"¿ Puedes llenar los cubos de agua ?",
      it:"Puoi riempire i secchi d'acqua ?",
      de:"Kannst du die Wassereimer füllen ?",
      ja:"水 の バケツ を いっぱい に して くれる ?" },
    { ref:"ou-sellerie", lecon:1,
      fr:"Où est la sellerie ?",
      en:"Where is the tack room ?",
      es:"¿ Dónde está el guadarnés ?",
      it:"Dov'è la selleria ?",
      de:"Wo ist die Sattelkammer ?",
      ja:"馬具庫 は どこ です か ?" },
    { ref:"cure-box", lecon:4,
      fr:"J'ai curé le box et remis de la paille.",
      en:"I have mucked out and put down fresh straw.",
      es:"He limpiado el box y puesto paja nueva.",
      it:"Ho pulito il box e messo paglia nuova.",
      de:"Ich habe ausgemistet und frisches Stroh eingestreut.",
      ja:"馬房 を 掃除 して 新しい 藁 を 敷き ました 。" },
    { ref:"sortir-matin", lecon:4,
      fr:"On sort les chevaux au pré le matin.",
      en:"We turn the horses out in the morning.",
      es:"Sacamos los caballos al prado por la mañana.",
      it:"Mandiamo i cavalli al prato la mattina.",
      de:"Wir bringen die Pferde morgens auf die Weide.",
      ja:"朝 に 馬 を 放牧 し ます 。" },
    { ref:"pas-eau", lecon:3,
      fr:"Il n'a plus d'eau.",
      en:"He has no water left.",
      es:"Ya no tiene agua.",
      it:"Non ha più acqua.",
      de:"Er hat kein Wasser mehr.",
      ja:"水 が なくなり ました 。" },
    { ref:"ou-attacher", lecon:4,
      fr:"Je peux attacher mon cheval ici ?",
      en:"Can I tie my horse up here ?",
      es:"¿ Puedo atar mi caballo aquí ?",
      it:"Posso legare il mio cavallo qui ?",
      de:"Kann ich mein Pferd hier anbinden ?",
      ja:"ここ に 馬 を 繋いで も いい です か ?" }
  ]
};
