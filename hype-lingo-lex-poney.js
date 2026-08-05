/* hype-lingo-lex-poney.js — Hype Linguae · le poney
   ==================================================================
   Créé le 5 août 2026 pour Lamotte-Beuvron, sur remarque de Blandine :
   le lieu, c'est d'abord des milliers de poneys et de jeunes cavaliers,
   pas le tracé de manège qu'on y avait mis d'abord.

   ⚠️ SIX ENTRÉES SONT DES RAPPELS. Elles portent le même `ref` que
   dans hype-lingo-lex-cheval.js — c'est voulu, et c'est sans danger :
   la maîtrise est stockée par `ref`, donc un mot déjà croisé au
   Connemara ou à Jerez arrive ici déjà acquis. Un rappel n'est pas un
   doublon, c'est de la révision espacée gratuite (décision du 5 août).
   Ne PAS les renommer pour « éviter le conflit » : le conflit est la
   fonctionnalité.

   ⚠️ QUATRE ENTRÉES SONT NEUVES et n'ont jamais été relues par un
   natif : la toise, le poney-club, la catégorie de taille, le shetland.
   `das Stockmaß` et `測尺` sont les deux plus à confirmer.
   À reporter dans hype-linguae-doutes.md.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.poney = {
  ref: "poney",
  chapitre: 10,
  titre: { fr:"Le poney", en:"The pony", es:"El poni", it:"Il pony",
           de:"Das Pony", ja:"ポニー" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE PONEY ============ */

  /* ---- rappels ---- */

  { ref:"poney", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney"}, en:{m:"the pony", p:"pau-ni"},
           es:{m:"el poni"}, it:{m:"il pony"},
           de:{m:"das Pony", p:"po-ni"}, ja:{m:"ポニー", p:"ponī"} },
    def:{ fr:"Un équidé dont la taille au garrot ne dépasse pas une limite fixée par les règlements. Ce n'est pas un jeune cheval : un poney adulte reste un poney.",
          en:"A horse whose height at the withers stays under a limit set by the rules. Not a young horse: an adult pony is still a pony." } },

  { ref:"taille-garrot", lecon:1, coll:"poney",
    mots:{ fr:{m:"la taille au garrot"}, en:{m:"the height at the withers", p:"haït"},
           es:{m:"la alzada"}, it:{m:"l'altezza al garrese"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"体高", p:"taikō"} },
    def:{ fr:"La hauteur mesurée du sol au sommet du garrot. C'est elle qui décide de la catégorie, jamais l'âge ni la corpulence.",
          en:"The height from the ground to the top of the withers. It decides the category, never the age or the build." } },

  { ref:"poulain", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma" } },
    def:{ fr:"Le petit, jusqu'au sevrage puis jusqu'à un an. Un poulain de race poney sera un poney ; un poulain de cheval sera un cheval.",
          en:"The young one, until weaning and then its first year. A pony foal becomes a pony; a horse foal becomes a horse." } },

  { ref:"cheval-ecole", lecon:1, coll:"poney",
    mots:{ fr:{m:"le cheval d'école"}, en:{m:"the school horse", p:"skoul"},
           es:{m:"el caballo de escuela"}, it:{m:"il cavallo da scuola"},
           de:{m:"das Schulpferd", p:"choul-pfert"}, ja:{m:"練習馬", p:"renshūba"} },
    def:{ fr:"Le cheval ou le poney du club, monté par beaucoup de cavaliers différents. Souvent le plus patient de l'écurie, et le plus mal reconnu.",
          en:"The club horse or pony, ridden by many different riders. Often the most patient in the yard, and the least credited." } },

  { ref:"caractere", lecon:1, coll:"poney",
    mots:{ fr:{m:"le caractère"}, en:{m:"the temperament", p:"tèm-pra-meunt"},
           es:{m:"el carácter"}, it:{m:"il carattere"},
           de:{m:"das Temperament"}, ja:{m:"気性", p:"kishō"} },
    def:{ fr:"Ce qui ne se lit pas sur la fiche : ce qu'un poney accepte, ce qui l'inquiète, ce qu'il pardonne.",
          en:"What the paperwork does not say: what a pony accepts, what worries it, what it forgives." } },

  { ref:"calme", lecon:1, coll:"poney",
    mots:{ fr:{m:"calme"}, en:{m:"quiet", p:"kwaï-ette"},
           es:{m:"tranquilo"}, it:{m:"tranquillo"},
           de:{m:"brav", p:"braf"}, ja:{m:"おとなしい", p:"otonashii"} },
    def:{ fr:"Le mot qu'on cherche quand on demande un poney pour un débutant. En anglais on dit « quiet » plutôt que « calm », qui sonne médical.",
          en:"The word you want when asking for a beginner's pony. English riders say « quiet » rather than « calm », which sounds clinical." } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"toise", lecon:1, coll:"poney",
    mots:{ fr:{m:"la toise"}, en:{m:"the measuring stick", p:"mè-jeu-ring"},
           es:{m:"el hipómetro", var:"la vara de medir"}, it:{m:"l'ippometro"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"測尺", p:"sokushaku"} },
    def:{ fr:"L'instrument qui mesure la taille au garrot, avec son bras horizontal et son niveau. En concours, la toise fait autorité sur le papier.",
          en:"The instrument that measures height at the withers, with its horizontal arm and level. At a show, the stick outranks the paperwork." } },

  { ref:"poney-club", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney-club"}, en:{m:"the pony club"},
           es:{m:"el club de ponis"}, it:{m:"il pony club"},
           de:{m:"der Ponyhof", p:"po-ni-hof", var:"der Ponyclub"},
           ja:{m:"ポニークラブ", p:"ponī kurabu"} },
    def:{ fr:"L'écurie qui enseigne aux enfants. ⚠️ En Grande-Bretagne, « The Pony Club » désigne aussi une organisation nationale précise, pas seulement un lieu.",
          en:"The yard that teaches children. Careful: in Britain « The Pony Club » is also a specific national organisation, not just a place." } },

  { ref:"categorie-taille", lecon:1, coll:"poney",
    mots:{ fr:{m:"la catégorie de taille"}, en:{m:"the height category"},
           es:{m:"la categoría por altura"}, it:{m:"la categoria di altezza"},
           de:{m:"die Größenklasse", p:"grœu-sseune-klass"},
           ja:{m:"体高区分", p:"taikō kubun"} },
    def:{ fr:"Le groupe dans lequel un poney concourt, selon sa taille au garrot. ⚠️ Les lettres A à E sont une convention française : ailleurs on annonce la taille en centimètres ou en mains, sans lettre. Dis la taille, pas la lettre.",
          en:"The group a pony competes in, according to its height. The French letters A to E mean nothing abroad: give the height in centimetres or hands instead." } },

  { ref:"shetland", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney shetland"}, en:{m:"the Shetland pony", p:"chèt-leunde"},
           es:{m:"el poni Shetland"}, it:{m:"il pony Shetland"},
           de:{m:"das Shetlandpony"}, ja:{m:"シェットランドポニー", p:"shettorando ponī"} },
    def:{ fr:"La plus petite des races du programme, née des îles Shetland, au nord de l'Écosse. Rustique, très fort pour sa taille, et le premier poney de beaucoup de cavaliers.",
          en:"The smallest breed in the syllabus, from the Shetland Isles north of Scotland. Hardy, remarkably strong for its size, and many riders' first pony." } }

  ],

  phrases: [

  { ref:"ph-poney-taille", lecon:1,
    mots:{ fr:{m:"Quelle est sa taille au garrot ?"},
           en:{m:"How tall is he?", p:"haou tôl"},
           es:{m:"¿Cuánto mide de alzada?"},
           it:{m:"Quanto misura al garrese?"},
           de:{m:"Wie groß ist er?", p:"vi grôss"},
           ja:{m:"体高はどれくらいですか。", p:"taikō wa dore kurai desu ka"} } },

  { ref:"ph-poney-debutant", lecon:1,
    mots:{ fr:{m:"C'est un poney pour débuter ?"},
           en:{m:"Is he a beginner's pony?", p:"bi-gui-neuze"},
           es:{m:"¿Es un poni para principiantes?"},
           it:{m:"È un pony per principianti?"},
           de:{m:"Ist es ein Pony für Anfänger?"},
           ja:{m:"初心者向けのポニーですか。", p:"shoshinsha-muke no ponī desu ka"} } },

  { ref:"ph-poney-calme", lecon:1,
    mots:{ fr:{m:"Il est très calme."},
           en:{m:"He is very quiet."},
           es:{m:"Es muy tranquilo."},
           it:{m:"È molto tranquillo."},
           de:{m:"Es ist sehr brav."},
           ja:{m:"とてもおとなしいです。", p:"totemo otonashii desu"} } }

  ]
};
