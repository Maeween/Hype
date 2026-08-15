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
          ja:"帰ってからの水浴び。毛の上で乾いた塩は肌を刺激し、毛をごわつかせます。すすぎは身だしなみではなく、外乗の一部なのです。" } },

  /* ==================================================================
     MOT AJOUTÉ LE 13/08/2026, session 210, demandé par Blandine.
     ⚠️ AUDIO À ENREGISTRER, six langues.
     ⚠️ ES / IT / DE / JA à faire relire par un cavalier de la langue.
     Le Morne passe de 12 à 13 mots. La cible posée au SUIVI est
     15 à 18 — il en manque encore deux à cinq, et ce sont les mots de
     Blandine, pas à inventer ici.
  ================================================================== */
  { ref:"monter-a-cru", lecon:1, coll:"balade",
    mots:{ fr:{m:"monter à cru"},
           en:{m:"to ride bareback", p:"bèr-bak"},
           es:{m:"montar a pelo"},
           it:{m:"montare a pelo"},
           de:{m:"ohne Sattel reiten", p:"o-ne za-tel", var:"blank reiten"},
           ja:{m:"裸馬に乗る", p:"hadakauma ni noru"} },
    def:{
      fr:"Sans selle, à même le dos du cheval. ⚠️ « Bareback » est un mot unique en anglais, sans équivalent littéral en français — impossible à deviner, et c'est bien pour ça qu'il faut le connaître. Dans l'eau il prend tout son sens : le cuir d'une selle n'aime ni le sel ni le sable, alors la baignade se fait souvent à cru. On sent le cheval nager sous soi, et ça ne s'oublie pas.",
      en:"Without a saddle, straight on the horse's back. In the water it makes particular sense: saddle leather does not take kindly to salt or sand, so the swim is often done bareback. You feel the horse swimming beneath you, and you never forget it.",
      es:"Sin silla, directamente sobre el lomo del caballo. ⚠️ « Bareback » es una sola palabra en inglés, sin equivalente literal — imposible de adivinar, y por eso hay que conocerla. En el agua cobra todo su sentido: el cuero de una silla no soporta la sal ni la arena, así que el baño suele hacerse a pelo. Sientes al caballo nadar debajo de ti, y eso no se olvida.",
      it:"Senza sella, direttamente sulla schiena del cavallo. ⚠️ « Bareback » è una sola parola in inglese, senza equivalente letterale — impossibile da indovinare, ed è per questo che va conosciuta. In acqua acquista tutto il suo senso: il cuoio di una sella non ama né il sale né la sabbia, così il bagno si fa spesso a pelo. Senti il cavallo nuotare sotto di te, e non lo dimentichi più.",
      de:"Ohne Sattel, direkt auf dem Pferderücken. ⚠️ « Bareback » ist im Englischen ein einziges Wort, ohne wörtliche Entsprechung — nicht zu erraten, und genau darum muss man es kennen. Im Wasser bekommt es seinen ganzen Sinn: Sattelleder verträgt weder Salz noch Sand, also wird das Baden oft blank geritten. Man spürt das Pferd unter sich schwimmen, und das vergisst man nicht.",
      ja:"鞍をつけず、馬の背に直接乗ること。⚠️ 英語の « bareback » は一語で、フランス語には直訳がありません — 推測できないからこそ、覚える値があります。水の中でこそ意味を持ちます：鞍の革は塩も砂も嫌うので、水浴は裸馬で行うことが多いのです。自分の下で馬が泳ぐのを感じる — 忘れられない経験です。" } }

  ],

  phrases: [

  { ref:"ph-balade-reserver", lecon:1,
      fr:"Je voudrais réserver une balade.",
      en:"I would like to book a ride.",
      es:"Quisiera reservar un paseo.",
      it:"Vorrei prenotare una passeggiata.",
      de:"Ich möchte einen Ausritt buchen.",
      ja:"外乗 を 予約 し たい です。" },

  { ref:"ph-balade-baigner", lecon:1,
      fr:"On peut se baigner à cheval ?",
      en:"Can we swim with the horses ?",
      es:"¿ Podemos bañarnos con los caballos ?",
      it:"Possiamo fare il bagno coi cavalli ?",
      de:"Können wir mit den Pferden baden ?",
      ja:"馬 と 水 に 入れ ます か ?" },

  { ref:"ph-balade-maree", lecon:1,
      fr:"La balade part à quelle heure ?",
      en:"What time does the ride leave ?",
      es:"¿ A qué hora sale el paseo ?",
      it:"A che ora parte la passeggiata ?",
      de:"Wann startet der Ausritt ?",
      ja:"外乗 は 何時 に 出 ます か ?" },

  { ref:"ph-balade-confirme", lecon:1,
      fr:"La baignade, c'est pour les confirmés ?",
      en:"Is the swim for experienced riders ?",
      es:"¿ El baño es para expertos ?",
      it:"Il bagno è per esperti ?",
      de:"Ist das Baden nur für Erfahrene ?",
      ja:"水浴 は 経験者 だけ です か ?" }

  ],

  /* ==================================================================
     LE DIALOGUE DU MORNE — réécrit le 15 août 2026, session 214.

     🟥 PREMIÈRE VERSION RÉELLEMENT LUE ET VALIDÉE PAR BLANDINE. La
     version du 13/08 (21 phrases) n'avait jamais été relue par elle :
     « Je les avais pas encore lues elles sont nulles ». Sa consigne de
     réécriture : « On s'en fout de la crème solaire etc on doit
     apprendre les termes équestres !! ». 23 phrases, 7 temps.

     RETIRÉES (7) : savoir nager ×2, crème solaire, maillot de bain,
     « la baignade est comprise », « passe-t-on sur le sable » (devenue
     « trotte-t-on »), le doublon du galop doux.
     AJOUTÉES (9) : nager avec les chevaux, licol/filet, resangler,
     étriers, enlever la selle, file indienne + distances, galoper
     rapidement, crinière/rênes, desseller/doucher.

     ⚠️ 9 PHRASES SONT EN FRANÇAIS SEUL : les nouvelles n'ont pas encore
     leur anglais — il sera proposé à Blandine séparément, pour relecture,
     avant es/it/de/ja. Mieux vaut une absence qu'une erreur.

     ⚠️ « resangler » : le mot d'écurie, exigé par Blandine à la place de
     « resserrer la sangle ». ⚠️ « Je ne suis JAMAIS MONTÉE à cru » :
     auxiliaire être + accord, corrigé par Blandine (l'ancien fichier
     portait « j'ai jamais monté »).

     🟥 ON NE RETIRE JAMAIS UNE PHRASE DE BLANDINE (règle de la session
     210, toujours en vigueur). Ses phrases ici : cheval très calme,
     galoper doucement (longue), galoper dans l'eau, l'ombre.

     🟥 L'OPPOSITION canter/gallop du temps 4 est désormais VÉCUE : une
     phrase demande le galop lent, une le galop rapide. En anglais
     l'une donnera « canter », l'autre « gallop » — c'est le seul
     endroit où « gallop » a le droit d'apparaître. NE PAS « CORRIGER ».

     `mots` = refs du chapitre · `motsAilleurs` = refs d'un autre
     chapitre. Les mots neufs sans entrée de lexique (licol, filet,
     sangle, étriers, selle, file indienne, crinière, rênes, desseller,
     doucher) sont un bonus, pas une dette — règle du 13/08.

     `dit` : "joueuse" = elle produit · "club" = elle entend et comprend.
     5 entendues, 18 produites.
  ================================================================== */
  dialogue: {
    ville: "maurice", lecon: 1, temps: 7, langues: ["fr","en","es","it","de","ja"],   /* 23 phrases */

    phrases: [

      /* ---- temps 1 · je réserve la balade ---- */
      { ref:"d-balade-lagon", temps:1, dit:"joueuse", mots:["balade","lagon"],
        fr:"Je voudrais réserver une balade dans le lagon.",
        en:"I'd like to book a hack in the lagoon.",
        varEn:"I'd like to book a trail ride in the lagoon.",
        es:"Quisiera reservar un paseo por la laguna.",
        it:"Vorrei prenotare una passeggiata nella laguna.",
        de:"Ich möchte einen Ausritt in der Lagune buchen.",
        ja:"ラグーン の 外乗 を 予約 し たい です。" },

      { ref:"d-un-guide", temps:1, dit:"joueuse", mots:["guide"],
        fr:"Est-ce qu'il y a un guide ?",
        en:"Is there a guide?",
        es:"¿Hay un guía?",
        it:"C'è una guida?",
        de:"Gibt es einen Führer?",
        ja:"ガイド は い ます か ?" },

      /* Phrase de Blandine, 15/08 : « est-ce qu'il est possible de nager
         avec les chevaux ? » — remplace « la baignade est comprise »,
         qui parlait d'organisation ; celle-ci parle de ce qu'on va vivre.
         EN à venir. */
      { ref:"d-nager-chevaux", temps:1, dit:"joueuse", mots:["nager","baignade"],
        fr:"Est-ce qu'il est possible de nager avec les chevaux ?",
        en:"Is it possible to swim with the horses?",
        es:"¿Es posible nadar con los caballos?",
        it:"È possibile nuotare con i cavalli?",
        de:"Kann man mit den Pferden schwimmen?",
        ja:"馬 と 一緒 に 泳ぐ こと は でき ます か ?" },

      { ref:"d-q-baignade-confirmes", temps:1, dit:"club", mots:["baignade","cavalier-confirme"],
        fr:"La baignade est réservée aux cavaliers confirmés.",
        en:"The swim is for experienced riders only.",
        es:"El baño es solo para jinetes experimentados.",
        it:"Il bagno è riservato ai cavalieri esperti.",
        de:"Das Baden ist erfahrenen Reitern vorbehalten.",
        ja:"水浴 は 経験者 だけ です。" },

      /* Phrase de Blandine (session 210). Remontée du temps 2 au temps 1 :
         c'est une demande de réservation. `cheval-calme` appartient au
         chapitre d'arrivée — et alors. */
      { ref:"d-cheval-tres-calme", temps:1, dit:"joueuse", mots:[], motsAilleurs:["cheval-calme"],
        fr:"Est-ce que vous avez un cheval très calme ?",
        en:"Have you got a very quiet horse?",
        es:"¿Tienen un caballo muy tranquilo?",
        it:"Avete un cavallo molto tranquillo?",
        de:"Haben Sie ein ganz braves Pferd?",
        ja:"とても おとなしい 馬 は い ます か ?" },

      /* ---- temps 2 · l'équipement du bord de mer ---- */
      { ref:"d-licol-filet", temps:2, dit:"joueuse", mots:[],
        fr:"Est-ce qu'on monte en licol ou avec un filet ?",
        en:"Do we ride in a headcollar or a bridle?",
        varEn:"Do we ride in a halter or a bridle?",
        es:"¿Montamos con cabezada o con brida?",
        it:"Montiamo con la capezza o con la briglia?",
        de:"Reiten wir mit Halfter oder mit Trense?",
        ja:"無口 で 乗り ます か、 頭絡 で 乗り ます か ?" },

      /* « resangler » : le mot d'écurie, demandé par Blandine. Et c'est
         un vrai geste du bord de mer : une sangle mouillée se détend. */
      { ref:"d-resangler", temps:2, dit:"joueuse", mots:[],
        fr:"Est-ce qu'il faut resangler avant d'entrer dans l'eau ?",
        en:"Do we need to tighten the girth before going into the water?",
        es:"¿Hay que apretar la cincha antes de entrar en el agua?",
        it:"Bisogna stringere il sottopancia prima di entrare in acqua?",
        de:"Muss man vor dem Wasser nachgurten?",
        ja:"水 に 入る 前 に 腹帯 を 締め 直し ます か ?" },

      { ref:"d-q-etriers", temps:2, dit:"club", mots:["baignade"],
        fr:"Raccourcissez vos étriers pour la baignade.",
        en:"Shorten your stirrups for the swim.",
        es:"Acorten los estribos para el baño.",
        it:"Accorciate le staffe per il bagno.",
        de:"Schnallen Sie die Steigbügel fürs Baden kürzer.",
        ja:"水浴 の 前 に 鐙 を 短く し て ください。" },

      { ref:"d-enlever-selle", temps:2, dit:"joueuse", mots:["baignade"],
        fr:"Est-ce qu'on enlève la selle pour la baignade ?",
        en:"Do we take the saddle off for the swim?",
        es:"¿Quitamos la silla para el baño?",
        it:"Togliamo la sella per il bagno?",
        de:"Nehmen wir den Sattel fürs Baden ab?",
        ja:"水浴 の とき は 鞍 を 外し ます か ?" },

      /* ---- temps 3 · la marée et le sable ---- */
      { ref:"d-quelle-maree", temps:3, dit:"joueuse", mots:["maree"],
        fr:"On part à quelle marée ?",
        en:"What tide do we leave at?",
        es:"¿Con qué marea salimos?",
        it:"Con quale marea partiamo?",
        de:"Bei welcher Tide reiten wir los?",
        ja:"どの 潮 で 出発 し ます か ?" },

      /* « trotte » remplace « passe » : une allure de plus dans le
         dialogue. EN à venir. */
      { ref:"d-trotter-sable", temps:3, dit:"joueuse", mots:["sable-mouille"],
        fr:"Est-ce qu'on trotte sur le sable mouillé ?",
        en:"Do we trot on the wet sand?",
        es:"¿Trotamos por la arena mojada?",
        it:"Trottiamo sulla sabbia bagnata?",
        de:"Traben wir auf dem nassen Sand?",
        ja:"濡れた 砂 の 上 を 速歩 で 行き ます か ?" },

      { ref:"d-q-maree-basse", temps:3, dit:"club", mots:["maree","sable-mouille"],
        fr:"À marée basse, on passe sur le sable mouillé.",
        en:"At low tide we ride on the wet sand.",
        es:"Con marea baja pasamos por la arena mojada.",
        it:"Con la bassa marea passiamo sulla sabbia bagnata.",
        de:"Bei Niedrigwasser reiten wir über den nassen Sand.",
        ja:"引き潮 の とき は 濡れた 砂 の 上 を 通り ます。" },

      { ref:"d-q-file-indienne", temps:3, dit:"club", mots:[],
        fr:"Restez en file indienne et gardez vos distances.",
        en:"Stay in single file and keep your distance.",
        es:"Quédense en fila india y guarden las distancias.",
        it:"Restate in fila indiana e mantenete le distanze.",
        de:"Bleiben Sie hintereinander und halten Sie Abstand.",
        ja:"一列 に なっ て、 前 の 馬 と 距離 を 取っ て ください。" },

      /* ---- temps 4 · l'allure, et le faux ami vécu des deux côtés ---- */
      /* 🟥 Phrase de Blandine : elle DIT POURQUOI, et c'est ce qui fait
         comprendre canter/gallop au lieu de le faire retenir.
         ⚠️ « gallop » y est MIS EN OPPOSITION à « canter », jamais donné
         comme synonyme — voir le `def` de `galop` dans arrivee.js.
         NE PAS « CORRIGER » en le retirant. */
      { ref:"d-canter-pourquoi", temps:4, dit:"joueuse", mots:[], motsAilleurs:["galop"],
        fr:"Est-ce qu'on peut galoper doucement, pas à pleine vitesse ? Je ne veux pas aller trop vite.",
        en:"Is it possible to canter, not to gallop? I don't want to go too fast.",
        es:"¿Podemos galopar despacio, no a toda velocidad? No quiero ir demasiado rápido.",
        it:"Possiamo galoppare piano, non a tutta velocità? Non voglio andare troppo veloce.",
        de:"Können wir langsam galoppieren, nicht in vollem Tempo? Ich will nicht zu schnell reiten.",
        ja:"ゆっくり 駆歩 で 行け ます か ? あまり 速く 走り たく ない です。" },

      /* Demandée par Blandine le 15/08, à la place du doublon du galop
         doux : la joueuse demande aussi le galop RAPIDE. En anglais ce
         sera « gallop » — l'autre moitié du faux ami. EN à venir. */
      { ref:"d-galop-rapide", temps:4, dit:"joueuse", mots:[], motsAilleurs:["galop"],
        fr:"Est-ce qu'il est possible de galoper rapidement ?",
        en:"Is it possible to gallop?",
        es:"¿Es posible galopar rápido?",
        it:"È possibile galoppare veloce?",
        de:"Kann man auch schnell galoppieren?",
        ja:"速く 駆歩 を する こと は でき ます か ?" },

      /* Phrase de Blandine : « c'est important le galop dans l'eau ».
         C'est l'image de la ville, et l'eau explique le mot mieux qu'une
         définition — elle freine, donc on n'y va pas à fond. */
      { ref:"d-galoper-eau", temps:4, dit:"joueuse", mots:[], motsAilleurs:["galop"],
        fr:"J'aimerais galoper dans l'eau.",
        en:"I'd like to canter in the water.",
        es:"Me gustaría galopar en el agua.",
        it:"Mi piacerebbe galoppare nell'acqua.",
        de:"Ich möchte gern im Wasser galoppieren.",
        ja:"水 の 中 で 駆歩 を し て み たい です。" },

      { ref:"d-pas-galoper", temps:4, dit:"joueuse", mots:[], motsAilleurs:["galop"],
        fr:"Je ne veux pas galoper.",
        en:"I don't want to canter.",
        es:"No quiero galopar.",
        it:"Non voglio galoppare.",
        de:"Ich möchte nicht galoppieren.",
        ja:"駆歩 は し たく ない です。" },

      /* ---- temps 5 · à cru et dans l'eau ---- */
      { ref:"d-monter-cru", temps:5, dit:"joueuse", mots:["monter-a-cru","baignade"],
        fr:"Est-ce qu'on peut monter à cru pour la baignade ?",
        en:"Can we ride bareback for the swim?",
        es:"¿Podemos montar a pelo para el baño?",
        it:"Possiamo montare a pelo per il bagno?",
        de:"Können wir fürs Baden ohne Sattel reiten?",
        ja:"水浴 の とき、 裸馬 に 乗っ て も いい です か ?" },

      /* Accord corrigé par Blandine le 15/08 : « Je ne suis jamais
         montée » — auxiliaire être, féminin. L'anglais ne bouge pas. */
      { ref:"d-cru-jamais", temps:5, dit:"joueuse", mots:["monter-a-cru"],
        fr:"Je ne suis jamais montée à cru.",
        en:"I've never ridden bareback.",
        es:"Nunca he montado a pelo.",
        it:"Non ho mai montato a pelo.",
        de:"Ich bin noch nie ohne Sattel geritten.",
        ja:"裸馬 に 乗っ た こと は あり ませ ん。" },

      /* LA consigne réelle d'une baignade à cheval. EN à venir. */
      { ref:"d-q-criniere", temps:5, dit:"club", mots:[],
        fr:"Tenez-vous à la crinière, lâchez les rênes.",
        en:"Hold on to the mane and let the reins go loose.",
        es:"Agárrense a las crines y suelten las riendas.",
        it:"Tenetevi alla criniera e lasciate le redini.",
        de:"Halten Sie sich an der Mähne fest und lassen Sie die Zügel locker.",
        ja:"たてがみ に つかまっ て、 手綱 は ゆるめ て ください。" },

      /* ---- temps 6 · le soleil ---- */
      /* Phrase de Blandine : « demander qu'on se mette un peu à l'ombre
         parce que le cavalier a chaud ». Un cavalier qui a un coup de
         chaud le dit rarement à temps — savoir le demander dans une
         langue étrangère est exactement l'usage de cette app. */
      { ref:"d-ombre-chaud", temps:6, dit:"joueuse", mots:["ombre"],
        fr:"Est-ce qu'on peut s'arrêter à l'ombre ? J'ai trop chaud.",
        en:"Can we stop in the shade? I'm too hot.",
        es:"¿Podemos parar a la sombra? Tengo mucho calor.",
        it:"Possiamo fermarci all'ombra? Ho troppo caldo.",
        de:"Können wir im Schatten anhalten? Mir ist zu heiß.",
        ja:"日陰 で 止まっ て も いい です か ? 暑 すぎ ます。" },

      /* ---- temps 7 · après la balade ---- */
      { ref:"d-eau-douce", temps:7, dit:"joueuse", mots:["eau-douce"],
        fr:"Est-ce qu'il y a de l'eau douce pour rincer le cheval ?",
        en:"Is there fresh water to rinse the horse?",
        es:"¿Hay agua dulce para enjuagar al caballo?",
        it:"C'è acqua dolce per sciacquare il cavallo?",
        de:"Gibt es Süßwasser, um das Pferd abzuspülen?",
        ja:"馬 を 洗う 真水 は あり ます か ?" },

      { ref:"d-desseller-doucher", temps:7, dit:"joueuse", mots:[],
        fr:"Est-ce que je peux le desseller et le doucher ?",
        en:"Can I untack him and hose him down?",
        es:"¿Puedo desensillarlo y ducharlo?",
        it:"Posso togliergli la sella e fargli la doccia?",
        de:"Kann ich ihn absatteln und abduschen?",
        ja:"鞍 を 外し て、 シャワー で 洗っ て も いい です か ?" }
    ]
  }
};
