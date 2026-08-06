/* hype-lingo-lex-balade.js — Hype Linguae · la balade
   ==================================================================
   Écrit le 6 août 2026 pour l'île Maurice, sur décision de Blandine :
   « L'île Maurice devait être ajoutée avec La Baule pour les balades
   dans la mer, se baigner » — puis « dans l'idée réserver une ballade ».
   Maurice est donc la jumelle de La Baule : La Baule apprend à
   S'INSCRIRE, Maurice apprend à RÉSERVER UNE SORTIE et à entrer dans
   l'eau. Le chapitre s'appelle `balade`, pas `mer` : ce qu'on apprend,
   c'est de demander une sortie, pas de nommer un paysage.

   ⚠️ UNE ENTRÉE EST UN RAPPEL. `balade` porte le même `ref` que dans
   hype-lingo-lex-arrivee.js, et ses `mots` sont recopiés à l'identique
   — c'est voulu, comme les six rappels de hype-lingo-lex-poney.js : la
   maîtrise est stockée par `ref`, donc le mot croisé à La Baule arrive
   ici déjà acquis. Un rappel n'est pas un doublon, c'est de la révision
   espacée gratuite. Ne PAS le renommer pour « éviter le conflit ».
   Seule la définition change : à La Baule on réserve une balade, ici on
   y va.

   ⚠️ ONZE ENTRÉES SONT NEUVES et n'ont jamais été relues par un natif.
   Les plus à confirmer : `à cru` (bareback / a pelo / a pelo — l'italien
   dit aussi « a pelo », à vérifier), `la marée` en japonais (潮), et
   surtout les tournures allemandes de la baignade (`baden`, `schwimmen`
   — l'allemand distingue nettement les deux, contrairement au français
   courant). À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes. Ce n'est pas une coquille : `attendue.split(" ")` découpe la
   phrase en tuiles à remettre dans l'ordre, et sans espaces il n'y a
   rien à déplacer. Même règle que hype-lingo-phrases-monde.js.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.balade = {
  ref: "balade",
  chapitre: 11,
  titre: { fr:"La balade", en:"The ride out", es:"El paseo", it:"La passeggiata",
           de:"Der Ausritt", ja:"外乗" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LA BALADE ============ */

  /* ---- rappel de La Baule ---- */

  { ref:"balade", lecon:1, coll:"balade",
    mots:{ fr:{m:"la balade"}, en:{m:"the hack", p:"hak", var:"the trail ride"},
           es:{m:"el paseo"}, it:{m:"la passeggiata"},
           de:{m:"der Ausritt", p:"aouss-rit"}, ja:{m:"外乗", p:"gaijō"} },
    def:{ fr:"Le mot déjà croisé à La Baule, où tu apprenais à en réserver une. Ici, tu y es. ⚠️ « Hack » est britannique ; les Américains disent « trail ride ».",
          en:"The word you already met at La Baule, where you learned to book one. Here, you are on it. « Hack » is British; Americans say « trail ride »." } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"baignade", lecon:1, coll:"balade",
    mots:{ fr:{m:"la baignade"}, en:{m:"the swim", p:"souim"},
           es:{m:"el baño"}, it:{m:"il bagno"},
           de:{m:"das Baden", p:"ba-deune"}, ja:{m:"水浴", p:"suiyoku"} },
    def:{ fr:"Entrer dans l'eau avec le cheval. ⚠️ Ce n'est pas la même chose que le faire nager : on peut se baigner jusqu'au poitrail sans jamais que le cheval nage.",
          en:"Going into the water with the horse. Not the same as making it swim: you can wade in chest-deep without the horse ever swimming." } },

  { ref:"nager", lecon:1, coll:"balade",
    mots:{ fr:{m:"nager"}, en:{m:"to swim", p:"tou souim"},
           es:{m:"nadar"}, it:{m:"nuotare"},
           de:{m:"schwimmen", p:"chvi-meune"}, ja:{m:"泳ぐ", p:"oyogu"} },
    def:{ fr:"Le moment où les pieds du cheval ne touchent plus. Il nage naturellement, mais il faut lui lâcher la tête : la rêne qui retient le noie.",
          en:"The moment the horse's feet leave the bottom. It swims naturally, but its head must be free: a restraining rein drowns it." } },

  { ref:"lagon", lecon:1, coll:"balade",
    mots:{ fr:{m:"le lagon"}, en:{m:"the lagoon", p:"la-goune"},
           es:{m:"la laguna"}, it:{m:"la laguna"},
           de:{m:"die Lagune", p:"la-gou-ne"}, ja:{m:"ラグーン", p:"ragūn"} },
    def:{ fr:"L'eau calme retenue par le récif, peu profonde et sans vague. C'est là qu'on entre : jamais dans la passe, où le courant sort vers le large.",
          en:"The calm shallow water held in by the reef, without waves. That is where you go in — never in the pass, where the current runs out to sea." } },

  { ref:"maree", lecon:1, coll:"balade",
    mots:{ fr:{m:"la marée"}, en:{m:"the tide", p:"taïd"},
           es:{m:"la marea"}, it:{m:"la marea"},
           de:{m:"die Tide", p:"ti-de", var:"die Gezeiten"}, ja:{m:"潮", p:"shio"} },
    def:{ fr:"Ce qui décide de l'heure de départ, pas l'agenda du centre. À marée basse le sable porte ; à marée haute il n'y a plus de plage.",
          en:"What sets the departure time — not the yard's diary. At low tide the sand carries; at high tide there is no beach left." } },

  { ref:"sable-mouille", lecon:1, coll:"balade",
    mots:{ fr:{m:"le sable mouillé"}, en:{m:"the wet sand", p:"ouètt sannd"},
           es:{m:"la arena mojada"}, it:{m:"la sabbia bagnata"},
           de:{m:"der nasse Sand", p:"na-se zannd"}, ja:{m:"濡れた砂", p:"nureta suna"} },
    def:{ fr:"La bande dure laissée par la mer qui se retire. C'est la seule où l'on peut galoper : le sable sec fatigue les tendons en quelques minutes.",
          en:"The firm strip left by the retreating sea. The only one you can canter on: dry sand tires tendons within minutes." } },

  { ref:"a-cru", lecon:1, coll:"balade",
    mots:{ fr:{m:"à cru"}, en:{m:"bareback", p:"bèr-bak"},
           es:{m:"a pelo"}, it:{m:"a pelo"},
           de:{m:"ohne Sattel", p:"ô-ne za-tel"}, ja:{m:"裸馬", p:"hadakauma"} },
    def:{ fr:"Sans selle. On desselle avant d'entrer dans l'eau : une selle mouillée se ruine, et le cuir gonflé blesse au retour.",
          en:"Without a saddle. You untack before going in: a soaked saddle is ruined, and swollen leather rubs the horse raw afterwards." } },

  { ref:"guide", lecon:1, coll:"balade",
    mots:{ fr:{m:"le guide"}, en:{m:"the guide", p:"gaïd"},
           es:{m:"el guía"}, it:{m:"la guida"},
           de:{m:"der Führer", p:"fu-reur", var:"die Begleitung"},
           ja:{m:"ガイド", p:"gaido"} },
    def:{ fr:"Celui qui ouvre la balade et connaît le fond. On ne le dépasse pas : c'est lui qui sait où le sable cède.",
          en:"The one who leads the ride and knows the bottom. You do not pass the guide: he knows where the sand gives way." } },

  { ref:"maillot", lecon:1, coll:"balade",
    mots:{ fr:{m:"le maillot de bain"}, en:{m:"the swimsuit", p:"souim-siout"},
           es:{m:"el bañador"}, it:{m:"il costume da bagno"},
           de:{m:"die Badehose", p:"ba-de-hô-ze"}, ja:{m:"水着", p:"mizugi"} },
    def:{ fr:"À mettre sous la tenue avant de partir : il n'y a pas de vestiaire sur la plage. La bombe reste obligatoire dans l'eau.",
          en:"Put it on under your clothes before you leave: there is no changing room on the beach. The hat stays on in the water." } },

  { ref:"creme-solaire", lecon:1, coll:"balade",
    mots:{ fr:{m:"la crème solaire"}, en:{m:"the sunscreen", p:"seune-skrine"},
           es:{m:"la crema solar"}, it:{m:"la crema solare"},
           de:{m:"die Sonnencreme", p:"zo-neune-krème"}, ja:{m:"日焼け止め", p:"hiyakedome"} },
    def:{ fr:"Sous les tropiques, le sable et l'eau renvoient le soleil par-dessous : on brûle aussi à l'ombre du casque.",
          en:"In the tropics, sand and water throw the sun back up at you: you burn even in the shade of your hat." } },

  { ref:"ombre", lecon:1, coll:"balade",
    mots:{ fr:{m:"l'ombre"}, en:{m:"the shade", p:"chéd"},
           es:{m:"la sombra"}, it:{m:"l'ombra"},
           de:{m:"der Schatten", p:"cha-teune"}, ja:{m:"日陰", p:"hikage"} },
    def:{ fr:"Ce qu'on cherche pour le cheval autant que pour soi. Une balade tropicale se fait tôt le matin ou en fin de journée, jamais à midi.",
          en:"What you look for, for the horse as much as for yourself. A tropical ride goes out early or late, never at midday." } },

  { ref:"eau-douce", lecon:1, coll:"balade",
    mots:{ fr:{m:"l'eau douce"}, en:{m:"the fresh water", p:"frèch"},
           es:{m:"el agua dulce"}, it:{m:"l'acqua dolce"},
           de:{m:"das Süßwasser", p:"zuss-va-ser"}, ja:{m:"真水", p:"mamizu"} },
    def:{ fr:"La douche au retour. Le sel qui sèche sur le poil irrite et raidit : rincer n'est pas une coquetterie, ça fait partie de la sortie.",
          en:"The rinse afterwards. Salt drying on the coat irritates and stiffens it: rinsing is not a nicety, it is part of the ride." } }

  ],

  phrases: [

  { ref:"ph-balade-reserver", lecon:1,
      fr:"Je voudrais réserver une balade sur la plage.",
      en:"I would like to book a ride on the beach.",
      es:"Quisiera reservar un paseo por la playa.",
      it:"Vorrei prenotare una passeggiata sulla spiaggia.",
      de:"Ich möchte einen Ausritt am Strand buchen.",
      ja:"浜辺 の 外乗 を 予約 し たい です。" },

  { ref:"ph-balade-baigner", lecon:1,
      fr:"Est-ce qu'on peut se baigner avec les chevaux ?",
      en:"Can we go in the water with the horses ?",
      es:"¿ Se puede bañar con los caballos ?",
      it:"Si può fare il bagno con i cavalli ?",
      de:"Kann man mit den Pferden ins Wasser ?",
      ja:"馬 と 一緒 に 水 に 入れ ます か ?" },

  { ref:"ph-balade-maree", lecon:1,
      fr:"La balade part à quelle heure, avec la marée ?",
      en:"What time does the ride leave, with the tide ?",
      es:"¿ A qué hora sale el paseo, con la marea ?",
      it:"A che ora parte la passeggiata, con la marea ?",
      de:"Wann startet der Ausritt, je nach Tide ?",
      ja:"潮 に あわせ て 外乗 は 何時 に 出 ます か ?" },

  { ref:"ph-balade-cru", lecon:1,
      fr:"On entre dans l'eau à cru ?",
      en:"Do we go into the water bareback ?",
      es:"¿ Entramos al agua a pelo ?",
      it:"Entriamo in acqua a pelo ?",
      de:"Gehen wir ohne Sattel ins Wasser ?",
      ja:"裸馬 で 水 に 入り ます か ?" }

  ]
};
