/* hype-lingo-lex-arrivee.js — Hype Linguae · l'arrivée dans un club
   ==================================================================
   Créé le 6 août 2026 pour LA BAULE, étape 1 du voyage.

   ⚠️ POURQUOI CE FICHIER EXISTE. Blandine, en testant : commencer par
   l'écurie « n'est pas vendeur de rêve », et surtout ce n'est pas ce
   qu'un cavalier vit d'abord. Ce qu'il vit d'abord, c'est arriver
   quelque part sans connaître personne, s'inscrire, et comprendre ce
   qu'on lui dit près d'un cheval.

   ⚠️ LA SÉCURITÉ N'EXISTAIT NULLE PART dans les 378 mots du module.
   Pour une application qui enseigne à des débutants, c'était le trou le
   plus sérieux du lexique : on savait dire « la fourche » et « le
   coefficient », pas « ne passe pas derrière lui ». C'est réparé ici.

   ⚠️ AUCUN de ces mots n'a été relu par un natif. À reporter dans
   hype-linguae-doutes.md — allemand et japonais en priorité.

   ⚠️ Le japonais des PHRASES s'écrit AVEC des espaces entre les groupes.
   Ce n'est pas une coquille : l'exercice consiste à remettre des
   morceaux dans l'ordre, et sans espaces il n'y a rien à déplacer.

   ⚠️ RETAGUÉ le 6 août 2026 : une seule leçon par ville, 12 mots — pas
   deux leçons de ~12 comme au départ (Blandine : « deux cours par
   ville on s'y perd »). La leçon 1 mêle les 6 mots d'inscription et
   les 6 de sécurité les plus utiles à l'arrivée ; les 11 restants
   passent en leçon 2, EN RÉSERVE pour une ville future — rien n'est
   perdu, juste pas encore attribué. `coll` ne bouge pas : une leçon
   mixte affiche donc « S'inscrire et sécurité » (nomLecon() combine
   les deux noms automatiquement).
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.arrivee = {
  ref: "arrivee",
  chapitre: 11,
  titre: { fr:"L'arrivée dans un club", en:"Arriving at a yard",
           es:"Llegar a un club", it:"Arrivare in un club",
           de:"Ankommen im Reitverein", ja:"クラブに着く" },
  lecons: 2,

  concepts: [

  /* ============ LEÇON 1 · S'INSCRIRE ============ */

  { ref:"reserver", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"réserver"}, en:{m:"to book", p:"bouk"},
           es:{m:"reservar"}, it:{m:"prenotare"},
           de:{m:"buchen", p:"bou-rreune"}, ja:{m:"予約する", p:"yoyaku suru"} },
    def:{ fr:"Retenir une place à l'avance. Dans la plupart des clubs c'est indispensable la veille, et parfois plusieurs jours avant en saison.",
          en:"To hold a place in advance. In most yards this is essential the day before, and sometimes several days ahead in season." } },

  { ref:"cours-particulier", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"le cours particulier"}, en:{m:"the private lesson", p:"praï-veut"},
           es:{m:"la clase particular"}, it:{m:"la lezione privata"},
           de:{m:"die Einzelstunde", p:"aïne-tsel-chtoune-de"},
           ja:{m:"個人レッスン", p:"kojin ressun"} },
    def:{ fr:"Une reprise seul avec l'enseignant, par opposition au cours collectif. Plus cher, mais le bon choix quand on ne parle pas la langue.",
          en:"A lesson alone with the instructor, as opposed to a group lesson. Dearer, but the right choice when you don't speak the language." } },

  { ref:"cours-collectif", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"le cours collectif"}, en:{m:"the group lesson", p:"groupe"},
           es:{m:"la clase colectiva"}, it:{m:"la lezione di gruppo"},
           de:{m:"die Gruppenstunde"}, ja:{m:"グループレッスン", p:"gurūpu ressun"} },
    def:{ fr:"Une reprise à plusieurs. C'est le cours ordinaire d'un club, et celui où l'on entend le plus de vocabulaire réel.",
          en:"A lesson with several riders. It is the ordinary club lesson, and the one where you hear the most real vocabulary." } },

  { ref:"niveau", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"le niveau"}, en:{m:"the level", p:"lè-veul"},
           es:{m:"el nivel"}, it:{m:"il livello"},
           de:{m:"das Niveau", p:"ni-vô", var:"die Reitstufe"},
           ja:{m:"レベル", p:"reberu"} },
    def:{ fr:"Ce qu'on sait faire. ⚠️ Les échelles ne se traduisent pas : un Galop 4 français ne veut rien dire ailleurs. Dis ce que tu sais faire — trotter, galoper, sauter — pas ton diplôme.",
          en:"What you can do. Careful: gradings don't translate. Say what you can do — trot, canter, jump — not your certificate." } },

  { ref:"debutant", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"débutant"}, en:{m:"beginner", p:"bi-gui-neur"},
           es:{m:"principiante"}, it:{m:"principiante"},
           de:{m:"Anfänger", p:"ann-fène-gueur"}, ja:{m:"初心者", p:"shoshinsha"} },
    def:{ fr:"Le mot le plus utile du chapitre. Le dire coûte un peu d'orgueil et évite beaucoup d'ennuis : personne ne juge un débutant, tout le monde juge un débutant qui s'était annoncé cavalier.",
          en:"The most useful word here. Saying it costs a little pride and saves a lot of trouble: nobody judges a beginner, everybody judges a beginner who claimed to be a rider." } },

  { ref:"tarif", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"le tarif"}, en:{m:"the price", p:"praïss"},
           es:{m:"la tarifa"}, it:{m:"la tariffa"},
           de:{m:"der Preis", p:"praïce"}, ja:{m:"料金", p:"ryōkin"} },
    def:{ fr:"Le prix de la reprise. Demande s'il comprend l'assurance et le matériel : selon les pays, l'un ou l'autre se paie à part.",
          en:"The cost of the lesson. Ask whether insurance and equipment are included: depending on the country, one or the other is charged separately." } },

  { ref:"licence-assurance", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"l'assurance"}, en:{m:"the insurance", p:"inn-chou-reunce"},
           es:{m:"el seguro"}, it:{m:"l'assicurazione"},
           de:{m:"die Versicherung", p:"fèr-zi-che-roung"},
           ja:{m:"保険", p:"hoken"} },
    def:{ fr:"Obligatoire pour monter dans presque tous les pays. Ta licence fédérale ne te couvre pas forcément à l'étranger : vérifie avant de partir, pas au moment de monter.",
          en:"Required to ride in almost every country. Your national licence may not cover you abroad: check before you travel, not at the mounting block." } },

  { ref:"bombe-fournie", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"la bombe est fournie"}, en:{m:"a hat is provided", p:"pro-vaï-dide"},
           es:{m:"el casco está incluido"}, it:{m:"il cap è fornito"},
           de:{m:"eine Kappe wird gestellt", p:"guè-chtelt"},
           ja:{m:"ヘルメットの貸し出しあり", p:"herumetto no kashidashi ari"} },
    def:{ fr:"Presque toujours vrai, mais à demander : c'est la seule pièce d'équipement sans laquelle on ne monte pas. En Grande-Bretagne on dit « hat », pas « helmet », dans un club.",
          en:"Almost always true, but ask: it is the one piece of kit you cannot ride without. In Britain a yard says « hat », not « helmet »." } },

  { ref:"cheval-calme", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"un cheval calme"}, en:{m:"a quiet horse", p:"kwaï-ette"},
           es:{m:"un caballo tranquilo"}, it:{m:"un cavallo tranquillo"},
           de:{m:"ein braves Pferd", p:"bra-vess"}, ja:{m:"おとなしい馬", p:"otonashii uma"} },
    def:{ fr:"La demande qui compte le plus, et qu'on ose rarement faire. Elle ne dit pas que tu as peur, elle dit que tu veux profiter de ta reprise.",
          en:"The request that matters most, and the one people rarely dare make. It doesn't say you are frightened; it says you want to enjoy your ride." } },

  { ref:"balade", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"la balade"}, en:{m:"the hack", p:"hak", var:"the trail ride"},
           es:{m:"el paseo"}, it:{m:"la passeggiata"},
           de:{m:"der Ausritt", p:"aouss-rit"}, ja:{m:"外乗", p:"gaijō"} },
    def:{ fr:"Une sortie dehors, par opposition à la reprise en carrière. ⚠️ « Hack » est le mot britannique ; les Américains disent « trail ride ».",
          en:"A ride out, as opposed to a lesson in the arena. « Hack » is the British word; Americans say « trail ride »." } },

  { ref:"duree-reprise", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"une heure de cours"}, en:{m:"an hour's lesson"},
           es:{m:"una hora de clase"}, it:{m:"un'ora di lezione"},
           de:{m:"eine Reitstunde", p:"raït-chtoune-de"},
           ja:{m:"一時間のレッスン", p:"ichijikan no ressun"} },
    def:{ fr:"⚠️ Attention au faux ami : en allemand, une « Reitstunde » désigne la leçon en général, souvent quarante-cinq minutes — pas soixante.",
          en:"Careful with the German: a « Reitstunde » means the lesson in general, often forty-five minutes rather than sixty." } },

  { ref:"annuler", lecon:2, coll:"inscrire",
    mots:{ fr:{m:"annuler"}, en:{m:"to cancel", p:"kann-seul"},
           es:{m:"cancelar"}, it:{m:"annullare"},
           de:{m:"absagen", p:"ap-za-gueune"}, ja:{m:"キャンセルする", p:"kyanseru suru"} },
    def:{ fr:"À savoir dire, et tôt : une reprise réservée est presque partout due, même si l'on ne vient pas.",
          en:"Worth knowing, and early: a booked lesson is charged almost everywhere, whether you turn up or not." } },

  /* ============ LEÇON 2 · LA SÉCURITÉ ============ */

  { ref:"passer-devant", lecon:1, coll:"securite",
    mots:{ fr:{m:"passer devant lui"}, en:{m:"to pass in front of him"},
           es:{m:"pasar por delante"}, it:{m:"passare davanti"},
           de:{m:"vor ihm vorbeigehen", p:"for-baï-gué-eune"},
           ja:{m:"前を通る", p:"mae o tōru"} },
    def:{ fr:"La règle la plus simple et la plus utile : on contourne un cheval par l'avant, où il te voit. Derrière, il ne te voit pas, et un cheval qui sursaute frappe.",
          en:"The simplest and most useful rule: go round a horse in front, where he can see you. Behind, he cannot — and a startled horse kicks." } },

  { ref:"jamais-derriere", lecon:1, coll:"securite",
    mots:{ fr:{m:"ne passe pas derrière lui"}, en:{m:"don't walk behind him", p:"bi-haïnde"},
           es:{m:"no pases por detrás"}, it:{m:"non passare dietro"},
           de:{m:"geh nicht hinter ihm vorbei", p:"hine-teur"},
           ja:{m:"後ろを通らないで", p:"ushiro o tōranaide"} },
    def:{ fr:"La phrase qu'on entend crier dans tous les clubs du monde. Si tu dois vraiment passer derrière, passe très près en gardant une main sur lui : un cheval frappe avec de l'élan, pas collé.",
          en:"The sentence shouted in every yard in the world. If you truly must pass behind, pass very close with a hand on him: a horse kicks with room, not from touching distance." } },

  { ref:"prevenir-toucher", lecon:1, coll:"securite",
    mots:{ fr:{m:"préviens-le avant de le toucher"},
           en:{m:"speak to him before you touch him"},
           es:{m:"háblale antes de tocarlo"}, it:{m:"parlagli prima di toccarlo"},
           de:{m:"sprich ihn an, bevor du ihn berührst"},
           ja:{m:"触る前に声をかけて", p:"sawaru mae ni koe o kakete"} },
    def:{ fr:"La voix d'abord, la main ensuite. Un cheval surpris se défend ; un cheval averti attend.",
          en:"Voice first, hand second. A startled horse defends himself; a warned horse waits." } },

  { ref:"longe-main", lecon:1, coll:"securite",
    mots:{ fr:{m:"n'enroule pas la longe"}, en:{m:"never wrap the rope round your hand"},
           es:{m:"no te enrolles la cuerda en la mano"},
           it:{m:"non avvolgere la corda alla mano"},
           de:{m:"wickle den Strick nicht um die Hand", p:"vi-kle"},
           ja:{m:"引き手を手に巻かないで", p:"hikite o te ni makanaide"} },
    def:{ fr:"Le geste qui casse des doigts. On tient la longe pliée dans la main, jamais enroulée autour : si le cheval part, la corde doit pouvoir filer.",
          en:"The habit that breaks fingers. Hold the rope folded in your hand, never coiled round it: if the horse goes, the rope must be able to run." } },

  { ref:"distance", lecon:1, coll:"securite",
    mots:{ fr:{m:"garde tes distances"}, en:{m:"keep your distance", p:"diss-teunce"},
           es:{m:"guarda las distancias"}, it:{m:"mantieni le distanze"},
           de:{m:"halte Abstand", p:"ap-chtant"}, ja:{m:"距離をとって", p:"kyori o totte"} },
    def:{ fr:"En reprise, une longueur de cheval entre le tien et celui de devant. C'est la distance qui évite un coup de pied — et le plus fréquent des accidents de club.",
          en:"In a lesson, one horse's length between you and the one ahead. That distance prevents a kick, the commonest accident in any yard." } },

  { ref:"attention", lecon:1, coll:"securite",
    mots:{ fr:{m:"attention !"}, en:{m:"mind out!", p:"maïnde", var:"heads up!"},
           es:{m:"¡cuidado!"}, it:{m:"attenzione!"},
           de:{m:"Achtung!", p:"arr-toung"}, ja:{m:"危ない！", p:"abunai" } },
    def:{ fr:"⚠️ Le mot qu'il faut reconnaître avant de savoir le dire. En club britannique on crie souvent « mind out » ou « heads up », rarement « attention ».",
          en:"The word to recognise before you can say it. British yards shout « mind out » or « heads up », rarely « attention »." } },

  { ref:"tenir-cheval", lecon:2, coll:"securite",
    mots:{ fr:{m:"tiens-le"}, en:{m:"hold him", p:"hôlde"},
           es:{m:"sujétalo"}, it:{m:"tienilo"},
           de:{m:"halt ihn fest"}, ja:{m:"押さえていて", p:"osaete ite"} },
    def:{ fr:"On te le demandera, et il faut comprendre du premier coup : tenir la longe court, sous la ganache, et rester debout à côté de l'épaule.",
          en:"You will be asked this, and you must understand at once: hold the rope short, under the jaw, and stand by the shoulder." } },

  { ref:"lacher", lecon:2, coll:"securite",
    mots:{ fr:{m:"lâche !"}, en:{m:"let go!", p:"lette gô"},
           es:{m:"¡suelta!"}, it:{m:"lascia!"},
           de:{m:"lass los!", p:"lass lôce"}, ja:{m:"離して！", p:"hanashite" } },
    def:{ fr:"L'ordre le plus contre-intuitif du chapitre, et celui qui sauve des mains. Si le cheval s'arrache, on lâche : on ne discute pas avec cinq cents kilos.",
          en:"The least intuitive order here, and the one that saves hands. If the horse tears away, let go: you do not argue with five hundred kilos." } },

  { ref:"casque-attache", lecon:2, coll:"securite",
    mots:{ fr:{m:"attache ta bombe"}, en:{m:"do your hat up", p:"hate"},
           es:{m:"abróchate el casco"}, it:{m:"allaccia il cap"},
           de:{m:"mach die Kappe zu"}, ja:{m:"ヘルメットを留めて", p:"herumetto o tomete"} },
    def:{ fr:"Une bombe non attachée ne protège de rien. On te le fera remarquer dans tous les pays, et souvent avant de te laisser monter.",
          en:"An unfastened hat protects nothing. You will be told, in every country, and usually before you are allowed to mount." } },

  { ref:"chaussures-fermees", lecon:2, coll:"securite",
    mots:{ fr:{m:"des chaussures fermées"}, en:{m:"closed shoes", p:"clôzde"},
           es:{m:"zapatos cerrados"}, it:{m:"scarpe chiuse"},
           de:{m:"geschlossene Schuhe", p:"gué-chlo-sseune"},
           ja:{m:"つま先の閉じた靴", p:"tsumasaki no tojita kutsu" } },
    def:{ fr:"Pas de sandales dans une écurie, jamais. Un sabot de cheval pèse le poids du cheval au-dessus.",
          en:"No sandals in a yard, ever. A hoof carries the weight of the horse above it." } },

  { ref:"chute-bouge-pas", lecon:2, coll:"securite",
    mots:{ fr:{m:"ne bouge pas"}, en:{m:"don't move", p:"mouve"},
           es:{m:"no te muevas"}, it:{m:"non ti muovere"},
           de:{m:"beweg dich nicht", p:"be-vèque"}, ja:{m:"動かないで", p:"ugokanaide"} },
    def:{ fr:"Ce qu'on dit à un cavalier tombé, et ce qu'on doit comprendre si on tombe. On ne relève pas quelqu'un : on lui demande s'il va bien, et on attrape le cheval.",
          en:"What you say to a fallen rider, and what you must understand if you fall. You do not pick someone up: you ask if they are all right, and you catch the horse." } }

  ],

  phrases: [

  { ref:"ph-reserver-demain", lecon:1,
      fr:"Je voudrais réserver un cours pour demain matin.",
      en:"I would like to book a lesson for tomorrow morning.",
      es:"Quisiera reservar una clase para mañana por la mañana.",
      it:"Vorrei prenotare una lezione per domani mattina.",
      de:"Ich möchte eine Reitstunde für morgen früh buchen.",
      ja:"明日 の 朝 の レッスン を 予約 し たい です。" },

  { ref:"ph-je-debute", lecon:1,
      fr:"Je débute, avez-vous un cheval très calme ?",
      en:"I am a beginner — do you have a very quiet horse ?",
      es:"Soy principiante, ¿ tienen un caballo muy tranquilo ?",
      it:"Sono principiante, avete un cavallo molto tranquillo ?",
      de:"Ich bin Anfänger — haben Sie ein sehr braves Pferd ?",
      ja:"初心者 です。 とても おとなしい 馬 は い ます か ?" },

  { ref:"ph-bombe-tarif", lecon:1,
      fr:"La bombe est fournie ? Et quel est le tarif ?",
      en:"Is a hat provided ? And what is the price ?",
      es:"¿ El casco está incluido ? ¿ Y cuál es la tarifa ?",
      it:"Il cap è fornito ? E qual è la tariffa ?",
      de:"Wird eine Kappe gestellt ? Und was kostet es ?",
      ja:"ヘルメット の 貸し出し は あり ます か。 料金 は いくら です か ?" },

  { ref:"ph-derriere", lecon:1,
      fr:"Ne passe pas derrière lui, passe devant.",
      en:"Don't walk behind him, go round the front.",
      es:"No pases por detrás, pasa por delante.",
      it:"Non passare dietro, passa davanti.",
      de:"Geh nicht hinter ihm vorbei, geh vorne herum.",
      ja:"後ろ を 通ら ないで、 前 を 通っ て。" },

  { ref:"ph-longe", lecon:1,
      fr:"N'enroule pas la longe autour de ta main.",
      en:"Never wrap the rope round your hand.",
      es:"No te enrolles la cuerda en la mano.",
      it:"Non avvolgere la corda attorno alla mano.",
      de:"Wickle den Strick nicht um die Hand.",
      ja:"引き手 を 手 に 巻か ないで。" },

  { ref:"ph-ca-va", lecon:2,
      fr:"Ça va ? Ne bouge pas, j'attrape le cheval.",
      en:"Are you all right ? Don't move, I'll catch the horse.",
      es:"¿ Estás bien ? No te muevas, yo cojo el caballo.",
      it:"Tutto bene ? Non ti muovere, prendo il cavallo.",
      de:"Alles gut ? Beweg dich nicht, ich fange das Pferd.",
      ja:"大丈夫 です か。 動か ないで、 馬 を 捕まえ ます。" },]
};
