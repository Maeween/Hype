/* hype-lingo-lex-western.js — Hype Linguae · le western et le troupeau
   ==================================================================
   Écrit le 6 août 2026 pour Tamworth (Nouvelle-Galles du Sud, Australie).
   Prévu par hype-linguae-production-suite.txt : « Tamworth — le western :
   le licol éthologique, la selle western, le troupeau, le tri, la corde,
   le rassemblement ». Dernière des vingt-neuf étapes prévues.

   ⚠️ LE WESTERN N'EXISTAIT NULLE PART dans les 378 mots d'origine. Ni la
   selle à corne, ni le troupeau, ni le tri, ni la monte à une main. Tout
   le module était écrit pour l'équitation classique européenne : c'est le
   plus gros angle mort qu'il restait.

   ⚠️ ET L'ANGLAIS D'ICI N'EST PAS CELUI DES AUTRES VILLES. C'est ce qui
   rend le chapitre intéressant : l'Australie a ses propres mots pour des
   choses que Newmarket ou Badminton nomment autrement.
     · le troupeau        → « the mob », et pas « the herd »
     · le rassemblement   → « the muster », un mot qu'un Anglais ne dirait pas
     · le parc à bétail   → « the yards », toujours au pluriel
     · le chapeau         → « an Akubra », du nom de la marque
   Un cavalier qui ne connaît que l'anglais des écuries britanniques ne
   comprendra pas une phrase de Tamworth. C'est le sujet.

   ⚠️ DOUZE ENTRÉES NEUVES, jamais relues par un natif — et il faudrait
   ici un natif AUSTRALIEN, pas britannique. Les plus à confirmer :
   `the mob` (usage courant mais qui peut sonner familier à l'écrit),
   `the muster` (verbe et nom), et `neck reining` pour la monte à une main,
   que le français rend mal. À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre en ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.western = {
  ref: "western",
  chapitre: 19,
  titre: { fr:"Le western", en:"Western riding", es:"La monta western",
           it:"L'equitazione western", de:"Westernreiten", ja:"ウエスタン" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE WESTERN ET LE TROUPEAU ============ */

  { ref:"selle-western", lecon:1, coll:"western",
    mots:{ fr:{m:"la selle western"}, en:{m:"the western saddle", p:"sa-deul"},
           es:{m:"la silla vaquera"}, it:{m:"la sella western"},
           de:{m:"der Westernsattel", p:"vèss-teurn-za-teul"},
           ja:{m:"ウエスタン鞍", p:"uesutan kura"} },
    def:{ fr:"Lourde, large, avec une corne devant. Elle n'est pas faite pour sauter mais pour tenir dix heures sans se blesser, et pour amarrer une corde tendue par un bœuf.",
          en:"Heavy, wide, with a horn in front. It is not built for jumping but for ten hours without soreness, and for taking the strain of a rope with a beast on the end." } },

  { ref:"corne", lecon:1, coll:"western",
    mots:{ fr:{m:"la corne"}, en:{m:"the horn", p:"horne"},
           es:{m:"la perilla"}, it:{m:"il pomo"},
           de:{m:"das Sattelhorn", p:"za-teul-horne"},
           ja:{m:"ホーン", p:"hōn"} },
    def:{ fr:"Le pommeau vertical. ⚠️ Ce n'est PAS une poignée : on n'y met pas la main pour se rattraper. Elle sert à enrouler la corde. S'y accrocher est le premier réflexe du débutant, et le premier qu'on lui retire.",
          en:"The upright pommel. It is NOT a handle: you do not grab it to stay on. It is there to dally the rope. Holding it is a beginner's first instinct and the first thing taken away." } },

  { ref:"licol-corde", lecon:1, coll:"western",
    mots:{ fr:{m:"le licol éthologique", var:"le licol de corde"},
           en:{m:"the rope halter", p:"rôpe hol-teur"},
           es:{m:"la cabezada de cuerda"}, it:{m:"la capezza di corda"},
           de:{m:"das Knotenhalfter", p:"knô-teune-half-teur"},
           ja:{m:"ロープハルター", p:"rōpu harutā"} },
    def:{ fr:"Un licol sans boucle, fait d'une seule corde nouée. ⚠️ L'anglais dit simplement « rope halter » — le mot « éthologique » n'a pas d'équivalent et sonnerait prétentieux. Il agit par pression sur des points précis, donc il ne se laisse jamais sur un cheval au pré.",
          en:"A halter with no buckles, made of one knotted rope. English just says rope halter. It works by pressure on set points, so it is never left on a horse turned out." } },

  { ref:"corde", lecon:1, coll:"western",
    mots:{ fr:{m:"la corde", var:"le lasso"}, en:{m:"the rope", p:"rôpe", var:"the lariat"},
           es:{m:"la cuerda", var:"el lazo"}, it:{m:"la corda"},
           de:{m:"das Seil", p:"zaïl", var:"das Lasso"},
           ja:{m:"ロープ", p:"rōpu"} },
    def:{ fr:"⚠️ On dit « the rope », presque jamais « the lasso » — le mot est celui des films. Le geste s'appelle « to rope » et non « to lasso ». Le lancer est la partie facile : le difficile est ce qui se passe une seconde après.",
          en:"« The rope », almost never « the lasso » — that word belongs to films. The act is to rope. Throwing is the easy part: the hard part is the second after." } },

  { ref:"troupeau", lecon:1, coll:"western",
    mots:{ fr:{m:"le troupeau"}, en:{m:"the mob", p:"mob", var:"the herd"},
           es:{m:"la manada"}, it:{m:"la mandria"},
           de:{m:"die Herde", p:"hèr-de"}, ja:{m:"群れ", p:"mure"} },
    def:{ fr:"⚠️ En Australie on dit « the mob », pas « the herd ». Un Anglais entendrait « une foule » ; ici c'est le mot normal, et il s'emploie aussi pour les chevaux : « a mob of horses ».",
          en:"In Australia it is « the mob », not « the herd ». An English speaker elsewhere hears « a crowd »; here it is the ordinary word, and it works for horses too." } },

  { ref:"rassemblement", lecon:1, coll:"western",
    mots:{ fr:{m:"le rassemblement"}, en:{m:"the muster", p:"meuss-teur"},
           es:{m:"el rodeo", var:"la junta"}, it:{m:"il raduno"},
           de:{m:"das Zusammentreiben", p:"tsou-za-meune-traï-beune"},
           ja:{m:"追い集め", p:"oiatsume"} },
    def:{ fr:"Aller chercher le bétail dispersé sur des milliers d'hectares et le ramener aux parcs. ⚠️ « The muster » est le mot australien, nom et verbe ; l'Amérique dirait « the roundup ». ⚠️ Ne pas confondre avec le rassemblement du dressage, qui n'a rien à voir.",
          en:"Going out for cattle spread over thousands of acres and bringing them to the yards. « Muster » is the Australian word, noun and verb; America says roundup." } },

  { ref:"tri", lecon:1, coll:"western",
    mots:{ fr:{m:"le tri"}, en:{m:"cutting", p:"ka-ting", var:"drafting"},
           es:{m:"el aparte"}, it:{m:"la separazione"},
           de:{m:"das Aussortieren", p:"aouss-zor-ti-reune"},
           ja:{m:"仕分け", p:"shiwake"} },
    def:{ fr:"Séparer une bête du troupeau et l'empêcher d'y retourner. C'est devenu une discipline notée, où le cavalier lâche les rênes : c'est le cheval qui décide, et on le juge sur ce qu'il fait tout seul.",
          en:"Separating one beast from the mob and keeping it out. It has become a judged discipline where the rider drops the reins: the horse decides, and it is marked on what it does alone." } },

  { ref:"stock-horse", lecon:1, coll:"western",
    mots:{ fr:{m:"le stock horse"}, en:{m:"the Australian Stock Horse"},
           es:{m:"el stock horse australiano"}, it:{m:"lo stock horse australiano"},
           de:{m:"das Australian Stock Horse"},
           ja:{m:"オーストラリアン・ストックホース", p:"ōsutorarian sutokku hōsu"} },
    def:{ fr:"La race du bétail australien : compacte, musclée, increvable sur de longues distances et capable de tourner sur place. ⚠️ Aucune langue ne le traduit — le nom reste anglais partout, comme le quarter horse.",
          en:"Australia's cattle breed: compact, muscular, tireless over distance and able to turn on the spot. No language translates the name." } },

  { ref:"une-main", lecon:1, coll:"western",
    mots:{ fr:{m:"monter à une main"}, en:{m:"neck reining", p:"nèk rè-ning"},
           es:{m:"montar a una mano"}, it:{m:"montare a una mano"},
           de:{m:"einhändig reiten", p:"aïne-hèn-dikh"},
           ja:{m:"片手手綱", p:"katate tazuna"} },
    def:{ fr:"Tenir les deux rênes d'une seule main, l'autre restant libre pour la corde. ⚠️ L'anglais nomme le MOYEN et non la main : « neck reining », parce que le cheval tourne en sentant la rêne extérieure sur son encolure, et non par une traction sur la bouche.",
          en:"Both reins in one hand, the other free for the rope. English names the means, not the hand: the horse turns off the outside rein laid on its neck, not off the mouth." } },

  { ref:"chaps", lecon:1, coll:"western",
    mots:{ fr:{m:"les chaps", var:"les jambières"}, en:{m:"the chaps", p:"chaps"},
           es:{m:"los zahones"}, it:{m:"i chaps"},
           de:{m:"die Chaps"}, ja:{m:"チャップス", p:"chappusu"} },
    def:{ fr:"Les jambières de cuir portées par-dessus le pantalon, contre les épines et le frottement. ⚠️ Toujours au pluriel dans toutes les langues, comme un pantalon.",
          en:"Leather leggings worn over the trousers, against thorns and rubbing. Always plural, like trousers." } },

  { ref:"parcs", lecon:1, coll:"western",
    mots:{ fr:{m:"les parcs à bétail"}, en:{m:"the yards", p:"yards"},
           es:{m:"los corrales"}, it:{m:"i recinti"},
           de:{m:"die Viehgatter", p:"fi-ga-teur"},
           ja:{m:"家畜囲い", p:"kachiku kakoi"} },
    def:{ fr:"L'ensemble de clôtures et de couloirs où l'on trie et où l'on soigne. ⚠️ En Australie « the yards » est toujours AU PLURIEL, et attention : dans une écurie britannique « the yard » au singulier désigne la cour de l'écurie elle-même. Deux mots pour deux lieux.",
          en:"The set of fences and races where stock is sorted and treated. Always plural here — and careful: in a British stable « the yard » singular means the stable yard itself." } },

  { ref:"chapeau-large", lecon:1, coll:"western",
    mots:{ fr:{m:"le chapeau à large bord"}, en:{m:"the wide-brimmed hat", p:"braïmde", var:"an Akubra"},
           es:{m:"el sombrero de ala ancha"}, it:{m:"il cappello a falda larga"},
           de:{m:"der breitkrempige Hut", p:"braït-krèm-pi-gue"},
           ja:{m:"つば広帽", p:"tsubahiro bō"} },
    def:{ fr:"⚠️ En Australie on dit souvent « an Akubra », du nom de la marque, comme on dit un frigo. Ce n'est pas une protection de tête : dès qu'on travaille vite ou qu'on saute, le casque reprend sa place.",
          en:"In Australia it is often « an Akubra », after the brand. It is not head protection: the moment the work gets fast, the helmet goes back on." } }

  ],

  phrases: [

  { ref:"ph-western-muster", lecon:1,
      fr:"On rassemble le troupeau demain matin ?",
      en:"Are we mustering the mob tomorrow morning ?",
      es:"¿ Juntamos la manada mañana por la mañana ?",
      it:"Raduniamo la mandria domani mattina ?",
      de:"Treiben wir die Herde morgen früh zusammen ?",
      ja:"明日 の 朝 群れ を 追い 集め ます か ?" },

  { ref:"ph-western-unemain", lecon:1,
      fr:"Il se monte à une main ?",
      en:"Does he neck rein ?",
      es:"¿ Se monta a una mano ?",
      it:"Si monta a una mano ?",
      de:"Lässt er sich einhändig reiten ?",
      ja:"片手 手綱 で 乗れ ます か ?" },

  { ref:"ph-western-corne", lecon:1,
      fr:"Ne tiens pas la corne, garde ta main libre.",
      en:"Do not hold the horn, keep your hand free.",
      es:"No agarres la perilla, deja la mano libre.",
      it:"Non tenere il pomo, tieni la mano libera.",
      de:"Halt dich nicht am Sattelhorn fest, lass die Hand frei.",
      ja:"ホーン を 握ら ない で。 手 は 空け て おい て ください。" },

  { ref:"ph-western-parcs", lecon:1,
      fr:"On les trie aux parcs avant midi.",
      en:"We draft them in the yards before midday.",
      es:"Los apartamos en los corrales antes del mediodía.",
      it:"Li separiamo nei recinti prima di mezzogiorno.",
      de:"Wir sortieren sie vor Mittag in den Gattern.",
      ja:"正午 まで に 囲い で 仕分け し ます。" }

  ]
};
