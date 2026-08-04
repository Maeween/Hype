/* hype-lingo-lex-materiel.js — Hype Lingo · Chapitre 4 · « Le matériel »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Aucun contenu variable selon le pays :
   une selle est une selle de Dublin à Kyoto.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`.

   PAS DE DOUBLON avec les chapitres déjà écrits :
     · Écurie (1)  possède déjà licol, longe, couverture, seau, anneau.
     · Pansage (2) possède déjà brosses, cure-pied, graisse à pieds.
     · Cheval (3)  possède déjà le fer et le maréchal-ferrant.
     · Cours (5)   possède « raccourcir ses rênes » et « les rênes
       longues » comme ORDRES ; ici `renes` est l'objet. Pas de conflit.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · le tapis de selle s'appelle NUMNAH en Grande-Bretagne, un mot
       qu'aucun dictionnaire scolaire ne donne. Et en espagnol c'est
       « el sudadero » — le mot qu'il ne faut PAS employer pour le
       couteau de chaleur du chapitre 2.
     · l'allemand `die Trense` désigne à la fois le filet complet et le
       mors de filet ; `die Kandare` est la bride.
     · breeches ≠ jodhpurs : la longueur n'est pas la même.
     · crop, whip, schooling whip : trois cravaches en anglais.
     · le japonais dit キュロット (culotte) et 長靴 (bottes) — un
       emprunt au français et un mot japonais, dans la même tenue.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Ce chapitre est celui où j'ai le
   plus de doutes en italien et en espagnol : le petit matériel de
   protection porte souvent le mot anglais dans les selleries, et je ne
   sais pas lequel a gagné. Entrées // ?? reportées au fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.materiel = {
  ref: "materiel",
  chapitre: 4,
  titre: { fr:"Le matériel", en:"The tack", es:"El equipo", it:"L'attrezzatura", de:"Die Ausrüstung", ja:"馬具" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LA SELLE ============ */

  { ref:"selle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle"}, en:{m:"the saddle", p:"sa-deul"},
           es:{m:"la silla de montar", var:"la montura"}, it:{m:"la sella"},
           de:{m:"der Sattel", p:"za-teul"}, ja:{m:"鞍", p:"kura"} },
    def:{ fr:"⚠️ Le mot anglais général pour tout le harnachement est **tack**, pas « material » : « where's my tack ? » veut dire « où sont mes affaires de cheval ? ».",
          en:"The English word for all the equipment together is tack, never « material »." } },

  { ref:"tapis", lecon:1, coll:"selle",
    mots:{ fr:{m:"le tapis de selle"}, en:{m:"the numnah", p:"neum-na", var:"saddle pad · saddle cloth"},
           es:{m:"el sudadero"}, it:{m:"il sottosella"},
           de:{m:"die Satteldecke", p:"za-teul-dè-ke"}, ja:{m:"ゼッケン", p:"zekken", var:"鞍下"} }, // ??
    def:{ fr:"⚠️ Deux pièges dans un seul mot. En Grande-Bretagne on dit **numnah**, introuvable dans un dictionnaire scolaire. Et en espagnol c'est **el sudadero** — donc jamais ce mot pour le couteau de chaleur.",
          en:"Two traps in one word: Britain says numnah, and Spanish uses sudadero, which francophones often mistake for the sweat scraper." } },

  { ref:"amortisseur", lecon:1, coll:"selle",
    mots:{ fr:{m:"l'amortisseur"}, en:{m:"the half pad", p:"haf padd", var:"gel pad · sheepskin"},
           es:{m:"el amortiguador"}, it:{m:"il cuscinetto"}, // ??
           de:{m:"das Lammfell", p:"lam-fèll", var:"die Sattelunterlage"}, ja:{m:"ゲルパッド", p:"geru paddo"} }, // ??
    def:{ fr:"La couche de gel ou de mouton qu'on glisse sous la selle. En Allemagne, le mot courant est das Lammfell, la peau de mouton, même quand la matière est synthétique.",
          en:"The gel or sheepskin layer under the saddle. In Germany the usual word is Lammfell, sheepskin, even when it is synthetic." } },

  { ref:"sangle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la sangle"}, en:{m:"the girth", p:"gueurss"},
           es:{m:"la cincha"}, it:{m:"il sottopancia"},
           de:{m:"der Sattelgurt", p:"za-teul-gourt", var:"der Gurt"}, ja:{m:"腹帯", p:"haraobi"} },
    def:{ fr:"Elle tient la selle. On la resserre toujours après quelques minutes de marche : un cheval se gonfle quand on sangle.",
          en:"It holds the saddle on. Always tightened again after a few minutes of walking: horses puff themselves up while being girthed." } },

  { ref:"etriers", lecon:1, coll:"selle",
    mots:{ fr:{m:"les étriers"}, en:{m:"the stirrups", p:"sti-reups"},
           es:{m:"los estribos"}, it:{m:"le staffe"},
           de:{m:"die Steigbügel", p:"chtaïg-bu-gueul"}, ja:{m:"鐙", p:"abumi"} },
    def:{ fr:"Le pied s'y pose au tiers avant, jamais enfoncé jusqu'au talon. L'allemand se contente souvent de Bügel à l'oral.",
          en:"The foot rests on the ball, never pushed home to the heel. German riders usually shorten it to Bügel." } },

  { ref:"etrivieres", lecon:1, coll:"selle",
    mots:{ fr:{m:"les étrivières"}, en:{m:"the stirrup leathers", p:"sti-reup lè-zeurz"},
           es:{m:"las aciones"}, it:{m:"gli staffili"},
           de:{m:"die Steigbügelriemen", p:"chtaïg-bu-gueul-ri-meune"}, ja:{m:"鐙革", p:"abumigawa"} },
    def:{ fr:"Les lanières qui portent les étriers. Chaque langue a un mot dédié, sans rapport avec les autres : leathers, aciones, staffili.",
          en:"The straps carrying the stirrups. Every language has its own unrelated word for them." } },

  { ref:"pommeau", lecon:1, coll:"selle",
    mots:{ fr:{m:"le pommeau"}, en:{m:"the pommel", p:"po-meul"},
           es:{m:"la perilla"}, it:{m:"il pomello"},
           de:{m:"der Sattelkopf", p:"za-teul-kopf"}, ja:{m:"前橋", p:"maebashi"} }, // ??
    def:{ fr:"L'avant relevé de la selle, qu'on attrape à la montée en cas de besoin. L'arrière s'appelle le troussequin.",
          en:"The raised front of the saddle, grabbed when mounting if needed. The raised back is the cantle." } },

  { ref:"selle-dressage", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle de dressage"}, en:{m:"the dressage saddle", p:"drè-sadj sa-deul"},
           es:{m:"la silla de doma"}, it:{m:"la sella da dressage"},
           de:{m:"der Dressursattel", p:"drè-sour-za-teul"}, ja:{m:"馬場鞍", p:"babakura"} }, // ??
    def:{ fr:"Quartiers longs et droits, siège profond, pour une jambe descendue. ⚠️ En espagnol le dressage s'appelle **la doma** — le mot dressage n'y est pas utilisé.",
          en:"Long straight flaps and a deep seat, for a long leg. Spanish calls dressage « la doma », not dressage." } },

  { ref:"selle-obstacle", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle d'obstacle"}, en:{m:"the jumping saddle", p:"djeum-ping sa-deul"},
           es:{m:"la silla de salto"}, it:{m:"la sella da salto"},
           de:{m:"der Springsattel", p:"chpring-za-teul"}, ja:{m:"障害鞍", p:"shōgaikura"} }, // ??
    def:{ fr:"Quartiers avancés et taquets, pour une jambe remontée en équilibre. Le mot allemand se devine : springen, sauter.",
          en:"Forward-cut flaps and knee blocks, for a shorter leg in balance. The German word gives itself away: springen, to jump." } },

  { ref:"selle-mixte", lecon:1, coll:"selle",
    mots:{ fr:{m:"la selle mixte"}, en:{m:"the general purpose saddle", p:"djè-ne-reul peur-peuss", var:"GP saddle"},
           es:{m:"la silla mixta"}, it:{m:"la sella mista"},
           de:{m:"der Vielseitigkeitssattel", p:"fil-zaï-tirh-kaïts-za-teul"}, ja:{m:"総合鞍", p:"sōgōkura"} }, // ??
    def:{ fr:"La selle passe-partout des clubs. En Grande-Bretagne on l'appelle simplement **a GP** — deux lettres qu'il faut connaître pour comprendre une annonce.",
          en:"The all-round riding-school saddle. In Britain it is just « a GP », two letters you need in order to read an advert." } },

  /* ============ LEÇON 2 · LE FILET ET L'EMBOUCHURE ============ */

  { ref:"filet", lecon:2, coll:"filet",
    mots:{ fr:{m:"le filet"}, en:{m:"the bridle", p:"braï-deul"},
           es:{m:"la cabezada"}, it:{m:"la testiera", var:"il filetto"},
           de:{m:"die Trense", p:"trèn-ze"}, ja:{m:"頭絡", p:"tōraku"} },
    def:{ fr:"L'ensemble de cuir qui tient le mors. ⚠️ En allemand, **die Trense** désigne à la fois le filet complet et le mors de filet : le contexte tranche. La bride, elle, est die Kandare.",
          en:"The leatherwork that holds the bit. In German, Trense means both the whole snaffle bridle and the snaffle bit itself." } },

  { ref:"tetiere", lecon:2, coll:"filet",
    mots:{ fr:{m:"la têtière"}, en:{m:"the headpiece", p:"hèd-piss"},
           es:{m:"la testera"}, it:{m:"il sopratesta"}, // ??
           de:{m:"das Genickstück", p:"gue-nik-chtuk"}, ja:{m:"項革", p:"unajigawa"} }, // ??
    def:{ fr:"La partie qui passe derrière les oreilles et porte tout le filet. L'allemand la nomme par l'anatomie : Genick, la nuque.",
          en:"The strap behind the ears that carries the whole bridle. German names it after the anatomy: Genick, the poll." } },

  { ref:"frontal", lecon:2, coll:"filet",
    mots:{ fr:{m:"le frontal"}, en:{m:"the browband", p:"braou-band"},
           es:{m:"la frontalera"}, it:{m:"il frontalino"},
           de:{m:"der Stirnriemen", p:"chtirn-ri-meune"}, ja:{m:"額革", p:"hitaigawa"} }, // ??
    def:{ fr:"La bande qui barre le front, sous laquelle on ramène le toupet. C'est la pièce qu'on personnalise aux couleurs de l'écurie en concours.",
          en:"The band across the forehead, with the forelock brought over it. The piece riders customise in team colours." } },

  { ref:"muserolle", lecon:2, coll:"filet",
    mots:{ fr:{m:"la muserolle"}, en:{m:"the noseband", p:"nôze-band"},
           es:{m:"la muserola"}, it:{m:"la capezzina"}, // ??
           de:{m:"der Nasenriemen", p:"na-zeune-ri-meune"}, ja:{m:"鼻革", p:"hanagawa"} },
    def:{ fr:"Elle entoure le chanfrein. On doit pouvoir glisser deux doigts dessous : c'est contrôlé en concours dans presque tous les pays.",
          en:"It goes round the nose. Two fingers must fit underneath — checked at competitions in nearly every country." } },

  { ref:"sous-gorge", lecon:2, coll:"filet",
    mots:{ fr:{m:"la sous-gorge"}, en:{m:"the throatlash", p:"srôte-lache"},
           es:{m:"el ahogadero"}, it:{m:"il sottogola"},
           de:{m:"der Kehlriemen", p:"kél-ri-meune"}, ja:{m:"喉革", p:"nodogawa"} }, // ??
    def:{ fr:"La lanière lâche sous la gorge, qui empêche le filet de passer par-dessus la tête. On laisse la largeur d'une main.",
          en:"The loose strap under the throat that stops the bridle coming over the head. Leave a hand's width." } },

  { ref:"renes", lecon:2, coll:"filet",
    mots:{ fr:{m:"les rênes"}, en:{m:"the reins", p:"rènz"},
           es:{m:"las riendas"}, it:{m:"le redini"},
           de:{m:"die Zügel", p:"tsu-gueul"}, ja:{m:"手綱", p:"tazuna"} },
    def:{ fr:"⚠️ Ne pas confondre à l'oral avec **the rains** (la pluie) ni **the reign** (le règne) : les trois se prononcent pareil en anglais. Et souviens-toi qu'on monte « on the left rein », sur la main gauche.",
          en:"Careful: reins, rains and reign are all pronounced alike. And remember you ride « on the left rein » — the French say « hand »." } },

  { ref:"mors", lecon:2, coll:"filet",
    mots:{ fr:{m:"le mors"}, en:{m:"the bit", p:"bitt"},
           es:{m:"el bocado"}, it:{m:"l'imboccatura", var:"il filetto"},
           de:{m:"das Gebiss", p:"gue-biss"}, ja:{m:"ハミ", p:"hami", var:"銜"} },
    def:{ fr:"La pièce de métal dans la bouche. Se rince à l'eau claire après chaque séance, jamais au savon. ⚠️ L'allemand das Gebiss veut aussi dire « dentier » : le mot est le même.",
          en:"The metal in the mouth, rinsed in clean water after every ride, never soaped. German Gebiss also means a set of dentures." } },

  { ref:"bride", lecon:2, coll:"filet",
    mots:{ fr:{m:"la bride"}, en:{m:"the double bridle", p:"deu-beul braï-deul"},
           es:{m:"la brida"}, it:{m:"la briglia"},
           de:{m:"die Kandare", p:"kan-da-re"}, ja:{m:"大勒", p:"dairoku"} }, // ??
    def:{ fr:"Deux mors et quatre rênes, réservée au dressage confirmé. ⚠️ Faux ami franco-espagnol commode : **la brida** en espagnol, c'est bien la bride ; mais **la cabezada**, c'est le filet.",
          en:"Two bits and four reins, for advanced dressage only. Spanish brida is the double bridle, cabezada the snaffle bridle." } },

  { ref:"collier-chasse", lecon:2, coll:"filet",
    mots:{ fr:{m:"le collier de chasse"}, en:{m:"the breastplate", p:"brèst-pléïte"},
           es:{m:"el petral"}, it:{m:"il pettorale"},
           de:{m:"der Vorderzeug", p:"for-deur-tsoïg"}, ja:{m:"胸繋", p:"munagai"} }, // ??
    def:{ fr:"Il empêche la selle de reculer, en extérieur et en cross. Le nom français vient de la chasse à courre ; l'anglais décrit simplement la poitrine.",
          en:"It stops the saddle sliding back, out hacking and across country. French names it after hunting, English simply after the chest." } },

  { ref:"martingale", lecon:2, coll:"filet",
    mots:{ fr:{m:"la martingale"}, en:{m:"the martingale", p:"mar-tin-guéïl", var:"running · standing"},
           es:{m:"la martingala"}, it:{m:"la martingala"},
           de:{m:"das Martingal", p:"mar-tin-gal"}, ja:{m:"マルタンガール", p:"marutangāru"} },
    def:{ fr:"Elle limite l'élévation de l'encolure. L'anglais distingue la **running martingale** (à anneaux, la courante) de la **standing martingale** (fixe, plus rare et interdite en dressage).",
          en:"It limits how high the horse can throw its head. English separates the running martingale from the fixed standing martingale." } },

  /* ============ LEÇON 3 · LE CAVALIER ============ */

  { ref:"bombe", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la bombe", var:"le casque"}, en:{m:"the riding hat", p:"raï-ding hatt", var:"helmet · skull cap"},
           es:{m:"el casco"}, it:{m:"il caschetto"},
           de:{m:"der Reithelm", p:"raït-hèlm"}, ja:{m:"ヘルメット", p:"herumetto", var:"乗馬帽"} },
    def:{ fr:"Obligatoire, sans discussion, et à remplacer après toute chute. ⚠️ En Grande-Bretagne, « hat » suffit et sous-entend toujours la bombe : « get your hat » ne veut pas dire un chapeau.",
          en:"Compulsory, no argument, and replaced after any fall. In Britain « hat » alone always means the riding hat." } },

  { ref:"gilet", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet de protection"}, en:{m:"the body protector", p:"bo-di pro-tèk-teur"},
           es:{m:"el chaleco protector"}, it:{m:"il corpetto protettivo"},
           de:{m:"die Sicherheitsweste", p:"zi-cheur-haïts-vès-te"}, ja:{m:"プロテクター", p:"purotekutā"} },
    def:{ fr:"Obligatoire en cross et pour les jeunes cavaliers dans beaucoup de clubs. Il se choisit à la taille exacte : trop grand, il ne protège plus.",
          en:"Compulsory for cross-country and for young riders in many clubs. It must fit exactly: too big and it no longer protects." } },

  { ref:"airbag", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet airbag"}, en:{m:"the air jacket", p:"èr dja-kette", var:"air vest"},
           es:{m:"el chaleco airbag"}, it:{m:"il gilet airbag"},
           de:{m:"die Airbagweste", p:"èr-bag-vès-te"}, ja:{m:"エアバッグベスト", p:"eabaggu besuto"} }, // ??
    def:{ fr:"Relié à la selle par une cordelette qui déclenche la cartouche à la chute. Se porte par-dessus le gilet de protection, jamais à la place.",
          en:"Linked to the saddle by a lanyard that fires the cartridge in a fall. Worn over a body protector, never instead of one." } },

  { ref:"culotte", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la culotte d'équitation"}, en:{m:"the breeches", p:"bri-tchiz", var:"jodhpurs = longues"},
           es:{m:"el pantalón de montar"}, it:{m:"i pantaloni da equitazione"},
           de:{m:"die Reithose", p:"raït-hô-ze"}, ja:{m:"キュロット", p:"kyurotto"} },
    def:{ fr:"⚠️ Deux mots anglais, deux longueurs : les **breeches** s'arrêtent au mollet et se portent avec des bottes, les **jodhpurs** descendent à la cheville et se portent avec des boots. Le japonais, lui, a emprunté le français : キュロット.",
          en:"Two English words, two lengths: breeches stop at the calf and go with tall boots, jodhpurs reach the ankle and go with short boots." } },

  { ref:"bottes", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les bottes"}, en:{m:"the riding boots", p:"raï-ding boutss", var:"long boots · jodhpur boots"},
           es:{m:"las botas de montar"}, it:{m:"gli stivali da equitazione"},
           de:{m:"die Reitstiefel", p:"raït-chti-feul"}, ja:{m:"長靴", p:"chōka"} }, // ??
    def:{ fr:"Talon marqué et semelle lisse, pour que le pied ne passe pas à travers l'étrier. Le japonais dit littéralement « chaussure longue » (長靴).",
          en:"A defined heel and a smooth sole, so the foot cannot slide through the stirrup. Japanese says literally « long shoe »." } },

  { ref:"minichaps", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les mini-chaps"}, en:{m:"the half chaps", p:"haf tchaps", var:"gaiters"},
           es:{m:"las medias polainas"}, it:{m:"i gambali"}, // ??
           de:{m:"die Minichaps", p:"mi-ni-tchaps"}, ja:{m:"ハーフチャップス", p:"hāfu chappusu"} }, // ??
    def:{ fr:"La guêtre de cuir ou de tissu qui remplace la botte haute, portée sur des boots. Le mot anglais chaps vient de l'espagnol des vaqueros, chaparreras.",
          en:"The leather or fabric wrap that replaces a tall boot, worn over short boots. « Chaps » comes from the Spanish of the vaqueros." } },

  { ref:"gants", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les gants"}, en:{m:"the gloves", p:"gleuvz"},
           es:{m:"los guantes"}, it:{m:"i guanti"},
           de:{m:"die Handschuhe", p:"hant-chou-e"}, ja:{m:"手袋", p:"tebukuro"} },
    def:{ fr:"Ils protègent des brûlures de rênes, surtout sous la pluie ou en longe. Blancs en dressage de concours, noirs le reste du temps.",
          en:"They save your hands from rein burns, especially in rain or on the lunge. White for dressage competition, black otherwise." } },

  { ref:"cravache", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la cravache"}, en:{m:"the whip", p:"ouipp", var:"crop = courte · schooling whip = longue"},
           es:{m:"la fusta"}, it:{m:"il frustino"},
           de:{m:"die Gerte", p:"guèr-te"}, ja:{m:"鞭", p:"muchi"} },
    def:{ fr:"Une aide, jamais une punition. ⚠️ L'anglais a trois mots selon la longueur : **crop** (courte, obstacle), **whip** (générique), **schooling whip** ou **dressage whip** (longue, sur le plat).",
          en:"An aid, never a punishment. English has three words by length: crop, whip, and schooling or dressage whip." } },

  { ref:"eperons", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les éperons"}, en:{m:"the spurs", p:"speurz"},
           es:{m:"las espuelas"}, it:{m:"gli speroni"},
           de:{m:"die Sporen", p:"chpô-reune"}, ja:{m:"拍車", p:"hakusha"} },
    def:{ fr:"Réservés à une jambe stable et indépendante. Beaucoup de clubs les interdisent avant un certain niveau, dans tous les pays.",
          en:"Only for a stable, independent leg. Many clubs forbid them below a certain level, in every country." } },

  { ref:"tenue", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la tenue"}, en:{m:"the kit", p:"kitt", var:"gear"},
           es:{m:"el equipo"}, it:{m:"l'attrezzatura"},
           de:{m:"die Ausrüstung", p:"aouss-rus-toung"}, ja:{m:"装備", p:"sōbi"} },
    def:{ fr:"L'ensemble de ce que porte le cavalier. ⚠️ En anglais, **kit** désigne les affaires du cavalier et **tack** celles du cheval : ne pas les échanger.",
          en:"Everything the rider wears. In English, kit is the rider's things and tack the horse's — do not swap them." } },

  /* ============ LEÇON 4 · PROTECTIONS ET GESTES ============ */

  { ref:"guetres", lecon:4, coll:"protections",
    mots:{ fr:{m:"les guêtres"}, en:{m:"the brushing boots", p:"breu-ching boutss", var:"boots · tendon boots"},
           es:{m:"las protecciones"}, it:{m:"i paracolpi"}, // ??
           de:{m:"die Gamaschen", p:"ga-ma-cheune"}, ja:{m:"プロテクター", p:"purotekutā"} }, // ??
    def:{ fr:"Elles protègent le membre des atteintes du membre opposé. ⚠️ En anglais, **boots** tout court peut désigner les guêtres du cheval comme les bottes du cavalier : le contexte décide.",
          en:"They protect a leg from being struck by the opposite one. In English, « boots » can mean the horse's or the rider's — context decides." } },

  { ref:"cloches", lecon:4, coll:"protections",
    mots:{ fr:{m:"les cloches"}, en:{m:"the over-reach boots", p:"ô-veur-ritch boutss", var:"bell boots (US)"},
           es:{m:"las campanas"}, it:{m:"le campane"},
           de:{m:"die Hufglocken", p:"houf-glo-keune"}, ja:{m:"ベルブーツ", p:"beru būtsu"} }, // ??
    def:{ fr:"Elles protègent le talon et le fer antérieur d'un postérieur qui rattrape. Trois langues sur six ont gardé l'image de la cloche.",
          en:"They protect the heel and front shoe from a hind foot catching up. Three of the six languages kept the bell image." } },

  { ref:"bandes", lecon:4, coll:"protections",
    mots:{ fr:{m:"les bandes de travail"}, en:{m:"the exercise bandages", p:"èk-seur-saïz ban-di-djiz"},
           es:{m:"las vendas"}, it:{m:"le fasce"},
           de:{m:"die Bandagen", p:"ban-da-gueune"}, ja:{m:"バンテージ", p:"bantēji"} },
    def:{ fr:"Posées sur une sous-bande, elles soutiennent le tendon. Mal serrées, elles font plus de mal que pas de bandes du tout.",
          en:"Put over a pad, they support the tendon. Badly wrapped, they do more harm than none at all." } },

  { ref:"bonnet", lecon:4, coll:"protections",
    mots:{ fr:{m:"le bonnet anti-mouches"}, en:{m:"the fly veil", p:"flaï véïl", var:"ear bonnet"},
           es:{m:"la orejera"}, it:{m:"la cuffia"},
           de:{m:"die Ohrenhaube", p:"ô-reune-haou-be", var:"die Fliegenhaube"}, ja:{m:"イヤーネット", p:"iyā netto"} },
    def:{ fr:"Contre les mouches, et contre le bruit en concours. En dressage international, il est autorisé et souvent assorti au tapis.",
          en:"Against flies, and against noise at shows. Allowed in international dressage, and often matched to the saddle pad." } },

  { ref:"cuir", lecon:4, coll:"protections",
    mots:{ fr:{m:"le cuir"}, en:{m:"the leather", p:"lè-zeur"},
           es:{m:"el cuero"}, it:{m:"il cuoio"},
           de:{m:"das Leder", p:"lé-deur"}, ja:{m:"革", p:"kawa"} },
    def:{ fr:"Un cuir qui sèche craque, un cuir trop gras s'étire. On nettoie après chaque séance, on nourrit une fois par mois.",
          en:"Leather that dries cracks, leather that is over-oiled stretches. Clean after every ride, feed it once a month." } },

  { ref:"savon", lecon:4, coll:"protections",
    mots:{ fr:{m:"le savon glycériné"}, en:{m:"the saddle soap", p:"sa-deul sôpe"},
           es:{m:"el jabón glicerinado"}, it:{m:"il sapone per cuoio"},
           de:{m:"die Sattelseife", p:"za-teul-zaï-fe"}, ja:{m:"サドルソープ", p:"sadoru sōpu"} },
    def:{ fr:"Le savon du cuir, appliqué avec une éponge à peine humide. Jamais sur le mors, jamais dans la bouche du cheval.",
          en:"Soap for leather, applied with a barely damp sponge. Never on the bit, never near the mouth." } },

  { ref:"seller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"seller"}, en:{m:"to tack up", p:"tak eup", var:"to saddle up"},
           es:{m:"ensillar"}, it:{m:"sellare"},
           de:{m:"satteln", p:"za-teuln"}, ja:{m:"馬装する", p:"basō suru"} },
    def:{ fr:"⚠️ L'anglais courant est **to tack up**, qui couvre selle et filet d'un seul mot. Le japonais fait pareil : 馬装する, « équiper le cheval ».",
          en:"The everyday English is « to tack up », covering saddle and bridle at once. Japanese does the same with 馬装する." } },

  { ref:"brider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"brider"}, en:{m:"to put the bridle on", p:"poutt ze braï-deul onn"},
           es:{m:"embridar"}, it:{m:"mettere la testiera"},
           de:{m:"auftrensen", p:"aouf-trèn-zeune"}, ja:{m:"頭絡をつける", p:"tōraku o tsukeru"} },
    def:{ fr:"Le mors se présente à plat sur la langue, le pouce dans le coin des lèvres. L'allemand a un verbe d'un seul mot, auftrensen ; l'anglais non.",
          en:"The bit is offered flat on the tongue, thumb at the corner of the lips. German has a single verb, auftrensen; English does not." } },

  { ref:"sangler", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"resangler"}, en:{m:"to tighten the girth", p:"taï-teune ze gueurss"},
           es:{m:"apretar la cincha"}, it:{m:"stringere il sottopancia"},
           de:{m:"nachgurten", p:"narh-gour-teune"}, ja:{m:"腹帯を締める", p:"haraobi o shimeru"} },
    def:{ fr:"À faire à pied avant de monter, puis à cheval après quelques minutes. L'allemand a encore un verbe exprès pour le deuxième temps : nachgurten.",
          en:"Done on the ground before mounting, then again from the saddle a few minutes later. German has a verb just for that second time." } },

  { ref:"regler-etrivieres", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"régler ses étrivières"}, en:{m:"to adjust the stirrups", p:"a-djeust ze sti-reups"},
           es:{m:"ajustar los estribos"}, it:{m:"regolare le staffe"},
           de:{m:"die Bügel verschnallen", p:"bu-gueul fèr-chna-leune"}, ja:{m:"鐙の長さを調節する", p:"abumi no nagasa o chōsetsu suru"} },
    def:{ fr:"Repère universel : le bas de l'étrier arrive au niveau de la cheville, bras tendu le long de la sangle. Un trou plus court à l'obstacle.",
          en:"Universal check: with your arm along the girth, the stirrup reaches your ankle. One hole shorter for jumping." } },

  { ref:"desseller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"desseller"}, en:{m:"to untack", p:"eune-tak"},
           es:{m:"desensillar"}, it:{m:"dissellare"},
           de:{m:"absatteln", p:"ap-za-teuln"}, ja:{m:"鞍を外す", p:"kura o hazusu"} },
    def:{ fr:"On desangle avant de retirer la selle, et on laisse le dos revenir seul : ne jamais frictionner un dos qui sort de la selle.",
          en:"Loosen the girth before lifting the saddle, and let the back recover on its own — never rub a just-unsaddled back." } },

  { ref:"debrider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"débrider"}, en:{m:"to take the bridle off", p:"téïk ze braï-deul off"},
           es:{m:"desembridar"}, it:{m:"togliere la testiera"},
           de:{m:"abtrensen", p:"ap-trèn-zeune"}, ja:{m:"頭絡を外す", p:"tōraku o hazusu"} },
    def:{ fr:"Le licol se passe autour de l'encolure **avant** de retirer le filet : c'est le geste qui évite qu'un cheval part libre dans la cour.",
          en:"Put the headcollar round the neck before the bridle comes off: the habit that stops a horse walking off loose." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"ou-selle", lecon:1,
      fr:"Où est ma selle ?",
      en:"Where's my saddle ?",
      es:"¿ Dónde está mi silla ?",
      it:"Dov'è la mia sella ?",
      de:"Wo ist mein Sattel ?",
      ja:"私 の 鞍 は どこ です か ?" },
    { ref:"sangle-serree", lecon:1,
      fr:"Ma sangle n'est pas assez serrée.",
      en:"My girth isn't tight enough.",
      es:"Mi cincha no está bastante apretada.",
      it:"Il sottopancia non è abbastanza stretto.",
      de:"Mein Sattelgurt ist nicht fest genug.",
      ja:"腹帯 が 緩い です 。" },
    { ref:"etrivieres-trop-longues", lecon:1,
      fr:"Mes étrivières sont trop longues, tu peux m'aider ?",
      en:"My stirrups are too long — can you give me a hand ?",
      es:"Tengo los estribos demasiado largos, ¿ me ayudas ?",
      it:"Ho le staffe troppo lunghe, mi aiuti ?",
      de:"Meine Bügel sind zu lang, kannst du mir helfen ?",
      ja:"鐙 が 長すぎ ます 、 手伝って もらえ ます か ?" },
    { ref:"quel-mors", lecon:2,
      fr:"Il monte avec quel mors ?",
      en:"What bit does he go in ?",
      es:"¿ Con qué bocado se monta ?",
      it:"Con quale imboccatura si monta ?",
      de:"Mit welchem Gebiss wird er geritten ?",
      ja:"どの ハミ を 使い ます か ?" },
    { ref:"besoin-guetres", lecon:4,
      fr:"Il a besoin de guêtres ?",
      en:"Does he need boots ?",
      es:"¿ Necesita protecciones ?",
      it:"Ha bisogno dei paracolpi ?",
      de:"Braucht er Gamaschen ?",
      ja:"プロテクター は 必要 です か ?" },
    { ref:"emprunter-bombe", lecon:3,
      fr:"Je peux emprunter une bombe ?",
      en:"Could I borrow a hat ?",
      es:"¿ Me puedes prestar un casco ?",
      it:"Posso prendere in prestito un caschetto ?",
      de:"Kann ich einen Reithelm leihen ?",
      ja:"ヘルメット を 貸して もらえ ます か ?" },
    { ref:"pas-eperons", lecon:3,
      fr:"Je ne mets pas d'éperons, je préfère la cravache.",
      en:"I won't wear spurs, I'd rather take a whip.",
      es:"No me pongo espuelas, prefiero la fusta.",
      it:"Non metto gli speroni, preferisco il frustino.",
      de:"Ich reite ohne Sporen, ich nehme lieber eine Gerte.",
      ja:"拍車 は つけ ませ ん 、 鞭 の 方 が いい です 。" },
    { ref:"ou-ranger", lecon:4,
      fr:"Je desselle et je range où ?",
      en:"I'll untack — where does everything go ?",
      es:"Desensillo, ¿ dónde lo guardo todo ?",
      it:"Dissello, dove metto tutto ?",
      de:"Ich sattle ab — wohin kommt alles ?",
      ja:"馬装 を 解き ます 、 どこ に 片付け ます か ?" }
  ]
};
