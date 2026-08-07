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
   Les plus à confirmer : `la marée` en japonais (潮) et les tournures
   allemandes de la baignade (`baden`, `schwimmen` — l'allemand distingue
   nettement les deux, contrairement au français courant).
   À reporter dans hype-linguae-doutes.md.

   ⚠️ CORRIGÉ le 6 août 2026, APRÈS vérification du lieu réel.
   La première version disait qu'on desselle avant d'entrer dans l'eau, et
   portait le mot « à cru ». C'est FAUX pour Le Morne : au Haras du Morne
   l'eau monte jusqu'à la selle et le cheval nage avec son cavalier
   dessus. La photo de Blandine le montre aussi. « À cru » est donc
   remplacé par `cavalier-confirme` — ce qu'il faut vraiment savoir dire
   là-bas, la baignade y étant réservée aux cavaliers expérimentés, avec
   obligation de savoir nager. Ne pas réintroduire « à cru » sur cette
   ville : ce serait une pratique d'ailleurs, pas celle d'ici.

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
          en:"The word you already met at La Baule, where you learned to book one. Here, you are on it. « Hack » is British; Americans say « trail ride ».",
          es:"La palabra ya vista en La Baule, donde aprendías a reservar uno. Aquí, ya estás en él. ⚠️ « Hack » es británico; los americanos dicen « trail ride ».",
          it:"La parola già incontrata a La Baule, dove imparavi a prenotarne una. Qui, ci sei. ⚠️ « Hack » è britannico; gli americani dicono « trail ride ».",
          de:"Das Wort kennst du schon aus La Baule, wo du gelernt hast, einen zu buchen. Hier bist du mittendrin. ⚠️ « Hack » ist britisch; Amerikaner sagen « trail ride ».",
          ja:"ラ・ボールで予約の仕方を学んだ、あの言葉。ここでは、その外乗の真っ最中です。⚠️ « hack » はイギリス英語で、アメリカでは « trail ride » と言います。" } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"baignade", lecon:1, coll:"balade",
    mots:{ fr:{m:"la baignade"}, en:{m:"the swim", p:"souim"},
           es:{m:"el baño"}, it:{m:"il bagno"},
           de:{m:"das Baden", p:"ba-deune"}, ja:{m:"水浴", p:"suiyoku"} },
    def:{ fr:"Entrer dans l'eau avec le cheval, en restant en selle. ⚠️ Ce n'est pas la même chose que le faire nager : on peut se baigner jusqu'au poitrail sans jamais que le cheval nage.",
          en:"Going into the water with the horse, staying in the saddle. Not the same as making it swim: you can wade in chest-deep without the horse ever swimming.",
          es:"Entrar en el agua con el caballo, sin bajarse de la silla. ⚠️ No es lo mismo que hacerlo nadar: se puede entrar hasta el pecho sin que el caballo nade nunca.",
          it:"Entrare in acqua con il cavallo, restando in sella. ⚠️ Non è la stessa cosa che farlo nuotare: si può entrare fino al petto senza che il cavallo nuoti mai.",
          de:"Mit dem Pferd ins Wasser gehen, im Sattel bleibend. ⚠️ Nicht dasselbe wie schwimmen lassen: Man kann bis zur Brust hineinwaten, ohne dass das Pferd je schwimmt.",
          ja:"鞍に座ったまま、馬と水に入ること。⚠️ 泳がせるのとは別物です。馬が一度も泳がないまま、胸の深さまで入ることもできます。" } },

  { ref:"nager", lecon:1, coll:"balade",
    mots:{ fr:{m:"nager"}, en:{m:"to swim", p:"tou souim"},
           es:{m:"nadar"}, it:{m:"nuotare"},
           de:{m:"schwimmen", p:"chvi-meune"}, ja:{m:"泳ぐ", p:"oyogu"} },
    def:{ fr:"Le moment où les pieds du cheval ne touchent plus. L'eau monte jusqu'à la selle et il nage avec toi dessus. Il nage naturellement, mais il faut lui lâcher la tête : la rêne qui retient le noie.",
          en:"The moment the horse's feet leave the bottom. The water rises to the saddle and it swims with you on its back. It swims naturally, but its head must be free: a restraining rein drowns it.",
          es:"El momento en que los pies del caballo dejan de tocar. El agua sube hasta la silla y nada contigo encima. Nada de forma natural, pero hay que soltarle la cabeza: la rienda que retiene lo ahoga.",
          it:"Il momento in cui i piedi del cavallo non toccano più. L'acqua sale fino alla sella e lui nuota con te sopra. Nuota naturalmente, ma bisogna lasciargli la testa: la redine che trattiene lo annega.",
          de:"Der Moment, in dem die Hufe den Grund verlieren. Das Wasser steigt bis zum Sattel, und es schwimmt mit dir darauf. Es schwimmt von Natur aus — aber der Kopf muss frei sein: Ein haltender Zügel ertränkt es.",
          ja:"馬の脚が底を離れる瞬間。水は鞍まで上がり、馬はきみを乗せたまま泳ぎます。泳ぎは生まれつきできますが、頭は自由にしてやること。引き止める手綱は、馬を溺れさせます。" } },

  { ref:"lagon", lecon:1, coll:"balade",
    mots:{ fr:{m:"le lagon"}, en:{m:"the lagoon", p:"la-goune"},
           es:{m:"la laguna"}, it:{m:"la laguna"},
           de:{m:"die Lagune", p:"la-gou-ne"}, ja:{m:"ラグーン", p:"ragūn"} },
    def:{ fr:"L'eau calme retenue par le récif, peu profonde et sans vague. C'est là qu'on entre : jamais dans la passe, où le courant sort vers le large.",
          en:"The calm shallow water held in by the reef, without waves. That is where you go in — never in the pass, where the current runs out to sea.",
          es:"El agua tranquila retenida por el arrecife, poco profunda y sin olas. Ahí es donde se entra: jamás en el paso, donde la corriente sale hacia el mar abierto.",
          it:"L'acqua calma trattenuta dalla barriera, poco profonda e senza onde. È lì che si entra: mai nella passe, dove la corrente esce verso il largo.",
          de:"Das ruhige Wasser hinter dem Riff, flach und ohne Wellen. Dort geht man hinein — nie in die Riffpassage, wo die Strömung aufs offene Meer hinauszieht.",
          ja:"リーフに守られた、浅く波のない静かな水。入るのはここです。外洋へ潮が流れ出すパス（切れ目）には決して入りません。" } },

  { ref:"maree", lecon:1, coll:"balade",
    mots:{ fr:{m:"la marée"}, en:{m:"the tide", p:"taïd"},
           es:{m:"la marea"}, it:{m:"la marea"},
           de:{m:"die Tide", p:"ti-de", var:"die Gezeiten"}, ja:{m:"潮", p:"shio"} },
    def:{ fr:"Ce qui décide de l'heure de départ, pas l'agenda du centre. À marée basse le sable porte ; à marée haute il n'y a plus de plage.",
          en:"What sets the departure time — not the yard's diary. At low tide the sand carries; at high tide there is no beach left.",
          es:"Lo que decide la hora de salida, no la agenda del centro. Con marea baja la arena sostiene; con marea alta ya no hay playa.",
          it:"Ciò che decide l'ora di partenza, non l'agenda del centro. Con la bassa marea la sabbia porta; con l'alta marea non c'è più spiaggia.",
          de:"Sie bestimmt die Abrittszeit — nicht der Kalender des Stalls. Bei Ebbe trägt der Sand; bei Flut gibt es keinen Strand mehr.",
          ja:"出発時刻を決めるのは、クラブの予定表ではなく潮です。干潮なら砂が締まって走れ、満潮なら浜そのものが消えます。" } },

  { ref:"sable-mouille", lecon:1, coll:"balade",
    mots:{ fr:{m:"le sable mouillé"}, en:{m:"the wet sand", p:"ouètt sannd"},
           es:{m:"la arena mojada"}, it:{m:"la sabbia bagnata"},
           de:{m:"der nasse Sand", p:"na-se zannd"}, ja:{m:"濡れた砂", p:"nureta suna"} },
    def:{ fr:"La bande dure laissée par la mer qui se retire. C'est la seule où l'on peut galoper : le sable sec fatigue les tendons en quelques minutes.",
          en:"The firm strip left by the retreating sea. The only one you can canter on: dry sand tires tendons within minutes.",
          es:"La banda dura que deja el mar al retirarse. Es la única donde se puede galopar: la arena seca fatiga los tendones en pocos minutos.",
          it:"La striscia dura lasciata dal mare che si ritira. È l'unica dove si può galoppare: la sabbia asciutta affatica i tendini in pochi minuti.",
          de:"Der feste Streifen, den das zurückweichende Meer hinterlässt. Der einzige, auf dem man galoppieren kann: Trockener Sand ermüdet die Sehnen in Minuten.",
          ja:"引いていく海が残す、固く締まった帯。駈歩ができるのはここだけです。乾いた砂は、数分で腱を疲れさせます。" } },

  { ref:"cavalier-confirme", lecon:1, coll:"balade",
    mots:{ fr:{m:"le cavalier confirmé"}, en:{m:"the experienced rider", p:"iks-pi-rieunst"},
           es:{m:"el jinete experimentado"}, it:{m:"il cavaliere esperto"},
           de:{m:"der erfahrene Reiter", p:"èr-fa-re-ne"}, ja:{m:"経験者", p:"keikensha"} },
    def:{ fr:"Celui qui monte déjà. ⚠️ La baignade dans le lagon lui est réservée : les débutants font la plage, pas l'eau profonde, et savoir nager est exigé en plus. Dire son niveau franchement décide de la sortie qu'on te propose.",
          en:"Someone who already rides. The lagoon swim is reserved for them: beginners get the beach, not the deep water, and you must be able to swim. Stating your level honestly decides which ride you are offered.",
          es:"El que ya monta. ⚠️ El baño en la laguna está reservado para él: los principiantes hacen la playa, no el agua profunda, y además se exige saber nadar. Decir tu nivel con franqueza decide la salida que te proponen.",
          it:"Chi già monta. ⚠️ Il bagno nella laguna è riservato a lui: i principianti fanno la spiaggia, non l'acqua profonda, e in più bisogna saper nuotare. Dire il proprio livello con franchezza decide l'uscita che ti propongono.",
          de:"Wer schon reitet. ⚠️ Das Schwimmen in der Lagune ist ihm vorbehalten: Anfänger reiten am Strand, nicht ins tiefe Wasser — und schwimmen können muss man obendrein. Ehrlich sein Niveau zu nennen entscheidet, welcher Ritt dir angeboten wird.",
          ja:"すでに乗れる人のこと。⚠️ ラグーンでの水浴はこの人たちだけのもの。初心者は浜辺まで、深い水はなし — そのうえ泳げることが条件です。自分のレベルを正直に言うことが、提案される外乗を決めます。" } },

  { ref:"guide", lecon:1, coll:"balade",
    mots:{ fr:{m:"le guide"}, en:{m:"the guide", p:"gaïd"},
           es:{m:"el guía"}, it:{m:"la guida"},
           de:{m:"der Führer", p:"fu-reur", var:"die Begleitung"},
           ja:{m:"ガイド", p:"gaido"} },
    def:{ fr:"Celui qui ouvre la balade et connaît le fond. On ne le dépasse pas : c'est lui qui sait où le sable cède.",
          en:"The one who leads the ride and knows the bottom. You do not pass the guide: he knows where the sand gives way.",
          es:"El que abre el paseo y conoce el fondo. No se le adelanta: es él quien sabe dónde cede la arena.",
          it:"Chi apre la passeggiata e conosce il fondale. Non lo si supera: è lui che sa dove cede la sabbia.",
          de:"Wer den Ritt anführt und den Grund kennt. Man überholt ihn nicht: Er weiß, wo der Sand nachgibt.",
          ja:"先頭を行き、海底を知り尽くしている人。追い越してはいけません。砂がどこで崩れるかを知っているのは、この人だけです。" } },

  { ref:"maillot", lecon:1, coll:"balade",
    mots:{ fr:{m:"le maillot de bain"}, en:{m:"the swimsuit", p:"souim-siout"},
           es:{m:"el bañador"}, it:{m:"il costume da bagno"},
           de:{m:"die Badehose", p:"ba-de-hô-ze"}, ja:{m:"水着", p:"mizugi"} },
    def:{ fr:"À mettre sous la tenue avant de partir : il n'y a pas de vestiaire sur la plage. La bombe reste obligatoire dans l'eau.",
          en:"Put it on under your clothes before you leave: there is no changing room on the beach. The hat stays on in the water.",
          es:"Ponérselo bajo la ropa antes de salir: no hay vestuario en la playa. El casco sigue siendo obligatorio en el agua.",
          it:"Da mettere sotto i vestiti prima di partire: non c'è spogliatoio sulla spiaggia. Il cap resta obbligatorio in acqua.",
          de:"Vor dem Aufbruch unter die Kleidung ziehen: Am Strand gibt es keine Umkleide. Der Helm bleibt auch im Wasser Pflicht.",
          ja:"出発前に服の下へ着ておくこと。浜辺に更衣室はありません。そして水の中でも、ヘルメットは必須のままです。" } },

  { ref:"creme-solaire", lecon:1, coll:"balade",
    mots:{ fr:{m:"la crème solaire"}, en:{m:"the sunscreen", p:"seune-skrine"},
           es:{m:"la crema solar"}, it:{m:"la crema solare"},
           de:{m:"die Sonnencreme", p:"zo-neune-krème"}, ja:{m:"日焼け止め", p:"hiyakedome"} },
    def:{ fr:"Sous les tropiques, le sable et l'eau renvoient le soleil par-dessous : on brûle aussi à l'ombre du casque.",
          en:"In the tropics, sand and water throw the sun back up at you: you burn even in the shade of your hat.",
          es:"En los trópicos, la arena y el agua devuelven el sol desde abajo: uno se quema incluso a la sombra del casco.",
          it:"Ai tropici, la sabbia e l'acqua rimandano il sole da sotto: ci si brucia anche all'ombra del cap.",
          de:"In den Tropen werfen Sand und Wasser die Sonne von unten zurück: Man verbrennt selbst im Schatten des Helms.",
          ja:"熱帯では、砂と水が太陽を下から照り返します。ヘルメットの陰にいても、日焼けするのです。" } },

  { ref:"ombre", lecon:1, coll:"balade",
    mots:{ fr:{m:"l'ombre"}, en:{m:"the shade", p:"chéd"},
           es:{m:"la sombra"}, it:{m:"l'ombra"},
           de:{m:"der Schatten", p:"cha-teune"}, ja:{m:"日陰", p:"hikage"} },
    def:{ fr:"Ce qu'on cherche pour le cheval autant que pour soi. Une balade tropicale se fait tôt le matin ou en fin de journée, jamais à midi.",
          en:"What you look for, for the horse as much as for yourself. A tropical ride goes out early or late, never at midday.",
          es:"Lo que se busca para el caballo tanto como para uno mismo. Un paseo tropical sale temprano o al final del día, jamás a mediodía.",
          it:"Ciò che si cerca per il cavallo quanto per sé. Una passeggiata tropicale parte presto o a fine giornata, mai a mezzogiorno.",
          de:"Was man für das Pferd ebenso sucht wie für sich selbst. Ein Tropenritt startet früh oder spät am Tag — nie mittags.",
          ja:"自分のためだけでなく、馬のために探すもの。熱帯の外乗は朝早くか夕方に出ます。真昼には決して。" } },

  { ref:"eau-douce", lecon:1, coll:"balade",
    mots:{ fr:{m:"l'eau douce"}, en:{m:"the fresh water", p:"frèch"},
           es:{m:"el agua dulce"}, it:{m:"l'acqua dolce"},
           de:{m:"das Süßwasser", p:"zuss-va-ser"}, ja:{m:"真水", p:"mamizu"} },
    def:{ fr:"La douche au retour. Le sel qui sèche sur le poil irrite et raidit : rincer n'est pas une coquetterie, ça fait partie de la sortie.",
          en:"The rinse afterwards. Salt drying on the coat irritates and stiffens it: rinsing is not a nicety, it is part of the ride.",
          es:"La ducha a la vuelta. La sal que se seca sobre el pelo irrita y lo endurece: aclarar no es una coquetería, forma parte de la salida.",
          it:"La doccia al rientro. Il sale che secca sul pelo irrita e irrigidisce: sciacquare non è un vezzo, fa parte dell'uscita.",
          de:"Die Dusche danach. Salz, das im Fell trocknet, reizt und macht es steif: Abspülen ist keine Kosmetik — es gehört zum Ritt dazu.",
          ja:"帰ってからの水浴び。毛の上で乾いた塩は肌を刺激し、毛をごわつかせます。すすぎは身だしなみではなく、外乗の一部なのです。" } }

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

  { ref:"ph-balade-confirme", lecon:1,
      fr:"Il faut être cavalier confirmé pour la baignade ?",
      en:"Do you have to be an experienced rider for the swim ?",
      es:"¿ Hay que ser jinete experimentado para el baño ?",
      it:"Bisogna essere cavaliere esperto per il bagno ?",
      de:"Muss man erfahrener Reiter sein, um ins Wasser zu gehen ?",
      ja:"水浴 に は 経験者 で ない と いけ ませ ん か ?" }

  ]
};
