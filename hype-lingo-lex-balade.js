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

  /* 🟥 REFORMULÉE le 16/08 sur demande de Blandine : « se baigner avec
     son cheval plutôt que se baigner ». « La baignade » tout court peut
     se comprendre comme la piscine de l'hôtel ; l'entrée dit maintenant
     ce qu'on apprend vraiment, et c'est ce qui distingue Le Morne de
     n'importe quelle plage.
     ⚠️ LES PHRASES GARDENT « la baignade » — c'est le français naturel
     dans une phrase parlée. Seule l'ENTRÉE du lexique est explicite.
     On apprend « se baigner avec son cheval », on l'entend dit « la
     baignade » dans la scène. NE PAS uniformiser. */
  { ref:"baignade", lecon:1, coll:"balade",
    mots:{ fr:{m:"se baigner avec son cheval", var:"la baignade"}, en:{m:"to swim with your horse", p:"souim ouiz your hors"},
           es:{m:"bañarse con el caballo"}, it:{m:"fare il bagno con il cavallo"},
           de:{m:"mit dem Pferd baden", p:"mitt dème pfèrt ba-deune"}, ja:{m:"馬と一緒に水に入る", p:"uma to issho ni mizu ni hairu"} },
    def:{ fr:"Entrer dans l'eau avec le cheval, en restant en selle. ⚠️ Ce n'est pas la même chose que le faire nager : on peut se baigner jusqu'au poitrail sans jamais que le cheval nage.",
          en:"Going into the water with the horse, staying in the saddle. Not the same as making it swim: you can wade in chest-deep without the horse ever swimming.",
          es:"Entrar en el agua con el caballo, sin bajarse de la silla. ⚠️ No es lo mismo que hacerlo nadar: se puede entrar hasta el pecho sin que el caballo nade nunca.",
          it:"Entrare in acqua con il cavallo, restando in sella. ⚠️ Non è la stessa cosa che farlo nuotare: si può entrare fino al petto senza che il cavallo nuoti mai.",
          de:"Mit dem Pferd ins Wasser gehen, im Sattel bleibend. ⚠️ Nicht dasselbe wie schwimmen lassen: Man kann bis zur Brust hineinwaten, ohne dass das Pferd je schwimmt.",
          ja:"鞍に座ったまま、馬と水に入ること。⚠️ 泳がせるのとは別物です。馬が一度も泳がないまま、胸の深さまで入ることもできます。" } },

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

  /* ================================================================
     QUATRE ENTRÉES AJOUTÉES le 18/08/2026, d'après le lexique fourni par
     Blandine pour LE MORNE.
     🟥 SEPT TERMES SUPPLÉMENTAIRES qu'elle voulait voir apparaître SANS
     en faire des entrées de lexique — ils vivent dans les phrases et
     dans ces commentaires :
       ralentir → to slow down · accélérer → to speed up
       dépasser → to overtake · côte à côte → side by side
       prendre et relâcher → take and release
       récupérer au pas → recover at a walk
       reprendre son souffle → catch your breath
     ⚠️ NE PAS les promouvoir en concepts : c'est la règle du 16/08 —
     un mot du lexique doit être un terme équestre, le reste s'apprend
     par la phrase.
     ================================================================ */

  { ref:"maree-basse", lecon:1, coll:"plage",
    mots:{ fr:{m:"la marée basse"}, en:{m:"low tide", p:"lô taïde"},
           es:{m:"la marea baja"}, it:{m:"la bassa marea"},
           de:{m:"die Ebbe", p:"è-be"}, ja:{m:"干潮", p:"kanchō"} },
    def:{ fr:"🟥 C'EST LA MARÉE QUI DÉCIDE DE L'HEURE DE LA BALADE, pas l'inverse. À marée basse, la bande de sable ferme est large et sûre ; à marée haute, il ne reste que du sable sec et profond, où un cheval s'enfonce et se fatigue. ⚠️ L'allemand a deux mots courts et sans rapport avec les autres langues : **Ebbe** pour la marée basse, **Flut** pour la haute.",
          en:"The tide decides when you ride, not the other way round. At low tide the belt of firm sand is wide and safe; at high tide only dry deep sand is left, where a horse sinks and tires. German has two short unrelated words: Ebbe and Flut.",
          es:"La marea decide la hora del paseo. Con marea baja la franja de arena firme es ancha y segura; con marea alta solo queda arena seca y profunda.",
          it:"È la marea a decidere l'ora della passeggiata. Con la bassa marea la fascia di sabbia soda è larga e sicura; con l'alta resta solo sabbia asciutta e profonda.",
          de:"Die Gezeiten bestimmen die Zeit des Ausritts. Bei Ebbe ist der feste Sandstreifen breit und sicher; bei Flut bleibt nur tiefer Trockensand.",
          ja:"外乗の時間を決めるのは潮です。干潮では固い砂の帯が広く安全ですが、満潮では乾いた深い砂しか残らず、馬は沈んで疲れます。ドイツ語では干潮を Ebbe、満潮を Flut と、短く無関係な二語で言います。" } },

  { ref:"sable-ferme", lecon:1, coll:"plage",
    mots:{ fr:{m:"le sable ferme"}, en:{m:"firm sand", p:"feurme sannde"},
           es:{m:"la arena firme"}, it:{m:"la sabbia soda"},
           de:{m:"der feste Sand", p:"fès-te zannt"}, ja:{m:"締まった砂", p:"shimatta suna"} },
    def:{ fr:"⚠️ À DISTINGUER DU SABLE MOUILLÉ : tout sable ferme est mouillé, mais tout sable mouillé n'est pas ferme. La bande qui porte est celle que la mer vient de quitter — assez humide pour être tassée, pas encore assez sèche pour s'effondrer. 🟥 C'est là qu'on galope, et nulle part ailleurs : le sable sec fatigue les tendons, le sable trop détrempé aspire le pied.",
          en:"Not the same as wet sand: all firm sand is wet, but not all wet sand is firm. The band that carries you is the one the sea has just left — damp enough to be packed, not yet dry enough to give way. That's where you canter, and nowhere else.",
          es:"No es lo mismo que arena mojada: toda arena firme está mojada, pero no toda arena mojada es firme. La franja que sostiene es la que el mar acaba de dejar.",
          it:"Non è la stessa cosa della sabbia bagnata: tutta la sabbia soda è bagnata, ma non tutta la bagnata è soda. La fascia che porta è quella che il mare ha appena lasciato.",
          de:"Nicht dasselbe wie nasser Sand: fester Sand ist immer nass, aber nicht jeder nasse Sand trägt. Der tragende Streifen ist der, den das Meer gerade verlassen hat.",
          ja:"濡れた砂とは区別します。締まった砂は必ず濡れていますが、濡れた砂がすべて締まっているわけではありません。支えてくれるのは、海が引いたばかりの帯。駈歩をするのはそこだけです。乾いた砂は腱を疲れさせ、水を含みすぎた砂は蹄を吸い込みます。" } },

  { ref:"file-indienne", lecon:1, coll:"groupe",
    mots:{ fr:{m:"la file indienne"}, en:{m:"single file", p:"sinng-gueul faïl"},
           es:{m:"en fila india"}, it:{m:"in fila indiana"},
           de:{m:"im Gänsemarsch", p:"guèn-ze-marche"}, ja:{m:"一列縦隊", p:"ichiretsu jūtai"} },
    def:{ fr:"⚠️ L'ANGLAIS DIT **SINGLE FILE**, jamais « Indian file » — l'expression existe mais sonne datée. 🟥 Et l'allemand est le plus imagé : **im Gänsemarsch**, « à la marche des oies ». C'est la formation de base en extérieur : chacun voit devant lui, personne ne se fait dépasser, et les chevaux ne se cherchent pas.",
          en:"English says « single file », never « Indian file » — the phrase exists but sounds dated. German is the most vivid: im Gänsemarsch, « goose march ». It's the basic formation on a hack.",
          es:"El inglés dice « single file ». El alemán es el más gráfico: « Gänsemarsch », la marcha de las ocas.",
          it:"L'inglese dice « single file ». Il tedesco è il più immaginifico: « Gänsemarsch », la marcia delle oche.",
          de:"Im Gänsemarsch — die Grundformation im Gelände: jeder sieht nach vorn, niemand wird überholt, und die Pferde suchen einander nicht.",
          ja:"英語では single file と言い、Indian file は古めかしく響きます。ドイツ語の Gänsemarsch（ガチョウの行進）が最も情景的です。外乗の基本隊形で、各自が前を見て、追い越されず、馬同士が意識し合いません。" } },

  { ref:"garder-distances", lecon:1, coll:"groupe", v:true,
    mots:{ fr:{m:"garder ses distances"}, en:{m:"to keep your distance", p:"diss-teunss"},
           es:{m:"guardar las distancias"}, it:{m:"tenere le distanze"},
           de:{m:"Abstand halten", p:"app-chtannt"}, ja:{m:"間隔を保つ", p:"kankaku o tamotsu"} },
    def:{ fr:"🟥 LA RÈGLE QUI ÉVITE TOUT LE RESTE. Un cheval trop près de celui qui le précède finit par vouloir le dépasser — et un cheval qu'on dépasse croit qu'on lui propose la course. ⚠️ La distance de sécurité est d'un cheval entier, environ trois mètres : de quoi ne pas recevoir un coup de pied si celui de devant s'arrête net.",
          en:"The rule that prevents everything else. A horse too close behind ends up wanting to pass — and a horse being passed thinks he's been asked to race. Keep one horse's length, about three metres: enough not to be kicked if the one in front stops dead.",
          es:"La regla que evita todo lo demás. Un caballo demasiado cerca acaba queriendo adelantar, y el adelantado cree que se le propone una carrera.",
          it:"La regola che evita tutto il resto. Un cavallo troppo vicino finisce per voler sorpassare, e quello sorpassato crede che gli si proponga una corsa.",
          de:"Die Regel, die alles andere verhindert. Ein Pferd zu dicht dahinter will irgendwann vorbei — und das überholte Pferd denkt, es solle rennen.",
          ja:"ほかのすべてを防ぐ規則。前の馬に近づきすぎた馬は、やがて追い越したくなります。そして追い越された馬は「競走に誘われた」と受け取ります。安全な間隔は馬一頭分、約三メートル。前の馬が急に止まっても蹴られない距離です。" } },

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
      ja:"鞍をつけず、馬の背に直接乗ること。⚠️ 英語の « bareback » は一語で、フランス語には直訳がありません — 推測できないからこそ、覚える値があります。水の中でこそ意味を持ちます：鞍の革は塩も砂も嫌うので、水浴は裸馬で行うことが多いのです。自分の下で馬が泳ぐのを感じる — 忘れられない経験です。" } },

  /* ================================================================
     LES GESTES DU CAVALIER EN BALADE — cinq entrées ajoutées le
     16/08/2026, session 214, dictées par Blandine.

     🟥 POURQUOI ELLES, ET PAS LE MATÉRIEL. Le chapitre avait été
     nettoyé le même jour de ses mots non équestres (maillot, crème
     solaire, nager, ombre — retirés sur son ordre : « le maillot de
     bain la crème solaire ça vire », « nager c'est pas un terme
     équestre à apprendre !! », « l'ombre ça peut être dans une phrase
     mais pas dans le lexique non plus »). Ces mots restent EMPLOYÉS
     dans les phrases du dialogue — ils s'y apprennent par l'usage.
     ⚠️ NE PAS les remettre au lexique.

     🟥 ET PAS DE MATÉRIEL ICI : licol, filet, sangle, étriers, selle,
     rênes s'apprennent à WALSALL (« Le matériel », 46 concepts). Le
     dialogue du Morne les emploie sans les posséder. Constat de
     Blandine : « normalement on a une ville pour le matériel non ».
     Même règle pour `galop` (La Baule, avec l'avertissement
     canter/gallop) : « galop et canter on les a déjà vus en lexique ».
     ⚠️ NE PAS étoffer ce chapitre avec du vocabulaire d'une autre ville.

     CE QUI LUI APPARTIENT VRAIMENT : Le Morne n'est pas une ville de
     matériel, c'est une ville de POSITION — comment se tenir quand ça
     bouge sous soi, dans l'eau et sur le sable.

     ⚠️ `trot-enleve` EXISTE AUSSI à ABERYSTWYTH (`cours`), où le
     moniteur le CRIE. Doublon assumé par Blandine (« garde-en en
     double oui ») : ici c'est une position qu'on CHOISIT en balade,
     là-bas un ordre qu'on REÇOIT. Et Le Morne est l'étape 2,
     Aberystwyth la 7e — c'est ici qu'on l'apprend d'abord.
     ================================================================ */

  { ref:"faire-entrer-eau", lecon:1, coll:"balade",
    mots:{ fr:{m:"faire entrer son cheval dans l'eau"}, en:{m:"to get your horse into the water", p:"guètt into ze oua-teur"},
           es:{m:"meter el caballo en el agua"}, it:{m:"far entrare il cavallo in acqua"},
           de:{m:"das Pferd ins Wasser bringen", p:"inss va-sseur"}, ja:{m:"馬を水に入れる", p:"uma o mizu ni ireru"} },
    def:{ fr:"🟥 LE GESTE CENTRAL DE CETTE VILLE, et le plus difficile : beaucoup de chevaux refusent l'eau. On n'y va pas de face en poussant — on suit un autre cheval, on laisse le temps, on avance au pas et on cède dès qu'il avance. Un cheval forcé apprend à refuser.",
          en:"The key move here, and the hardest: many horses refuse water. You don't drive them straight in — you follow another horse, take your time, walk forward and give as soon as he steps in. A horse that's forced learns to refuse.",
          es:"El gesto clave de esta ciudad, y el más difícil: muchos caballos rechazan el agua. No se entra de frente empujando: se sigue a otro caballo, se da tiempo, se avanza al paso y se cede en cuanto entra.",
          it:"Il gesto centrale di questa città, e il più difficile: molti cavalli rifiutano l'acqua. Non ci si entra di forza — si segue un altro cavallo, si dà tempo, si avanza al passo e si cede appena entra.",
          de:"Der zentrale Moment hier, und der schwerste: viele Pferde verweigern das Wasser. Man treibt sie nicht frontal hinein — man folgt einem anderen Pferd, lässt Zeit, geht im Schritt vor und gibt nach, sobald es hineintritt.",
          ja:"この街の中心となる、そして最も難しい動作。水を嫌う馬は少なくありません。正面から押し込むのではなく、他の馬について行き、時間をかけ、常歩で進み、一歩入った瞬間に譲ります。無理に入れられた馬は、拒むことを覚えます。" } },

  { ref:"trot-enleve", lecon:1, coll:"balade",
    mots:{ fr:{m:"le trot enlevé"}, en:{m:"rising trot", p:"raï-zingue trot", var:"posting trot (US)"},
           es:{m:"el trote levantado"}, it:{m:"il trotto battuto"},
           de:{m:"das Leichttraben", p:"laïcht-tra-beune"}, ja:{m:"軽速歩", p:"keihayaashi"} },
    def:{ fr:"Se lever et s'asseoir en alternance, au rythme du trot. C'est ce qui permet de trotter longtemps sans fatiguer le dos du cheval — indispensable en balade. ⚠️ Les Britanniques disent **rising trot**, les Américains **posting trot** : deux mots pour le même geste.",
          en:"Rising and sitting in rhythm with the trot. It lets you trot for a long time without tiring the horse's back — essential on a hack. British riders say « rising », Americans « posting ».",
          es:"Levantarse y sentarse al ritmo del trote. Permite trotar mucho tiempo sin cansar la espalda del caballo — indispensable en paseo.",
          it:"Alzarsi e sedersi al ritmo del trotto. Permette di trottare a lungo senza affaticare il dorso del cavallo — indispensabile in passeggiata.",
          de:"Im Rhythmus des Trabes aufstehen und sitzen. So kann man lange traben, ohne den Pferderücken zu ermüden — auf dem Ausritt unverzichtbar.",
          ja:"速歩のリズムに合わせて立ったり座ったりします。馬の背を疲れさせずに長く速歩できるので、外乗には欠かせません。" } },

  { ref:"galop-equilibre", lecon:1, coll:"balade",
    mots:{ fr:{m:"galoper en équilibre"}, en:{m:"to gallop in a light seat", p:"laïte sitt", var:"two-point"},
           es:{m:"galopar en equilibrio"}, it:{m:"galoppare in equilibrio"},
           de:{m:"im leichten Sitz galoppieren", p:"laïch-teune zitts"}, ja:{m:"軽く腰を浮かせて駆歩する", p:"karuku koshi o ukasete kakeho suru"} },
    def:{ fr:"Les fesses hors de la selle, le poids dans les étriers, le buste un peu en avant. C'est ainsi qu'on galope longtemps sur le sable sans peser sur le dos du cheval. ⚠️ L'anglais dit **light seat** ou **two-point** — deux points d'appui, les deux jambes, au lieu de trois.",
          en:"Seat out of the saddle, weight in the stirrups, body slightly forward. That's how you gallop for a long time on sand without weighing on the horse's back. Also called « two-point »: two points of contact instead of three.",
          es:"El trasero fuera de la silla, el peso en los estribos, el busto algo adelantado. Así se galopa mucho tiempo en la arena sin cargar el dorso.",
          it:"Il sedere fuori dalla sella, il peso nelle staffe, il busto un po' avanti. Così si galoppa a lungo sulla sabbia senza pesare sul dorso.",
          de:"Das Gesäß aus dem Sattel, das Gewicht in den Bügeln, der Oberkörper leicht vor. So galoppiert man lange über Sand, ohne den Rücken zu belasten.",
          ja:"腰を鞍から浮かせ、体重を鐙に預け、上体を少し前に。こうすれば砂の上を長く駆歩しても、馬の背に負担がかかりません。" } },

  { ref:"galop-assis", lecon:1, coll:"balade",
    mots:{ fr:{m:"galoper assis"}, en:{m:"to sit to the canter", p:"sitt tou ze kann-teur"},
           es:{m:"galopar sentado"}, it:{m:"galoppare seduto"},
           de:{m:"im Sitz galoppieren", p:"imm zitts"}, ja:{m:"座って駆歩する", p:"suwatte kakeho suru"} },
    def:{ fr:"L'assiette dans la selle, le bassin qui accompagne. On l'emploie quand il faut contrôler — dans l'eau, sur un terrain qui change, ou quand le cheval s'excite. ⚠️ L'inverse du galop en équilibre : l'un pour aller loin, l'autre pour tenir.",
          en:"Seat in the saddle, hips following the movement. Used when you need control — in water, on changing ground, or when the horse gets keen. The opposite of the light seat: one to go far, one to hold.",
          es:"El asiento en la silla, la pelvis acompañando. Se usa cuando hay que controlar: en el agua, en terreno cambiante, o cuando el caballo se excita.",
          it:"L'assetto nella sella, il bacino che accompagna. Si usa quando serve controllo: in acqua, su terreno che cambia, o quando il cavallo si accende.",
          de:"Der Sitz im Sattel, das Becken geht mit. Man braucht ihn zur Kontrolle — im Wasser, auf wechselndem Boden, oder wenn das Pferd heiß wird.",
          ja:"鞍に座り、骨盤で動きについていきます。制御が必要なとき — 水の中、変わりやすい地面、馬が興奮したとき — に使います。" } },

  { ref:"attraper-criniere", lecon:1, coll:"balade",
    mots:{ fr:{m:"attraper la crinière"}, en:{m:"to grab the mane", p:"grab ze méïn"},
           es:{m:"agarrarse a las crines"}, it:{m:"afferrare la criniera"},
           de:{m:"die Mähne greifen", p:"mè-ne graï-feune"}, ja:{m:"たてがみをつかむ", p:"tategami o tsukamu"} },
    def:{ fr:"🟥 POUR SE STABILISER SANS TIRER SUR LA BOUCHE. La crinière n'a pas de nerfs : s'y accrocher ne fait rien au cheval, alors que se rattraper aux rênes le fait accélérer ou lui abîme la bouche. C'est le geste à apprendre AVANT d'en avoir besoin — dans l'eau, à cru, ou sur un écart.",
          en:"To steady yourself without pulling on the mouth. The mane has no nerves: holding it does nothing to the horse, while grabbing the reins makes him speed up or hurts his mouth. Learn it BEFORE you need it — in water, bareback, or on a spook.",
          es:"Para estabilizarse sin tirar de la boca. Las crines no tienen nervios: agarrarse a ellas no le hace nada, mientras que sujetarse de las riendas lo acelera o le daña la boca.",
          it:"Per stabilizzarsi senza tirare sulla bocca. La criniera non ha nervi: afferrarla non fa niente al cavallo, mentre aggrapparsi alle redini lo accelera o gli rovina la bocca.",
          de:"Um sich zu stabilisieren, ohne am Maul zu ziehen. Die Mähne hat keine Nerven: sich daran festzuhalten tut dem Pferd nichts, während Festhalten an den Zügeln es antreibt oder das Maul verletzt.",
          ja:"口を引っ張らずに体勢を保つための動作。たてがみには神経がないので、つかんでも馬は痛くありません。手綱にしがみつくと、馬は速くなるか口を痛めます。必要になる前に覚えておく動作です。" } }

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
     LE DIALOGUE DU MORNE — RETRAVAILLÉ LE 18/08/2026.

     🟥 LES 22 PHRASES SONT DE BLANDINE, plus deux qu'elle ne voulait pas
     perdre et le piège canter/gallop, soit 25 au total.
     Son mot : *« on ne fait pas seulement je réserve une balade. On
     apprend comment partir en extérieur, comprendre le guide, gérer le
     terrain, entrer dans l'eau, adapter sa position, monter à cru, gérer
     son cheval dans le groupe et préserver sa récupération. »*

     🟥 LE PIÈGE LE PLUS UTILE DE TOUTE L'APP est au temps 8 :
     **CANTER ≠ GALLOP.** « Est-ce qu'on peut galoper ? Je ne veux pas
     aller trop vite » → *Can we canter? I don't want to gallop.*
     Le français dit « galoper » pour les deux allures ; l'anglais les
     sépare, et sur une plage la différence n'est pas théorique.
     ⚠️ NE JAMAIS retirer cette phrase.

     ⚠️ SEPT TERMES VIVENT DANS LES PHRASES SANS ÊTRE AU LEXIQUE, et
     c'est voulu (règle du 16/08 : un mot du lexique doit être un terme
     équestre, le reste s'apprend par la phrase) :
       to slow down · to speed up · to overtake · side by side
       take and release · recover at a walk · catch your breath

     🟥 CE QUE LES QUATRE PHRASES DU TEMPS 6 ET 7 APPORTENT, et que rien
     n'expliquait ailleurs :
     · **on ne dépasse pas, on ne galope pas côte à côte** — un cheval
       dépassé croit qu'on lui propose la course. C'est la cause de la
       moitié des accidents de balade.
     · **on fractionne les galops** — surtout sous les tropiques. L'effort
       et la récupération alternent ; un galop prolongé ne prouve rien.

     ⚠️ DEUX PHRASES SONT CONSERVÉES SANS ÊTRE AU LEXIQUE : « s'arrêter à
     l'ombre » et « nager avec les chevaux ». Les mots `ombre` et `nager`
     ont été RETIRÉS du lexique le 16/08 sur décision de Blandine — ce
     ne sont pas des termes équestres — mais les phrases restent et les
     enseignent par l'usage. NE PAS remettre les mots au lexique.

     `dit` : "joueuse" = elle produit · "club" = le guide.
  ================================================================== */
  dialogue: {
    ville: "maurice", lecon: 1, temps: 8, langues: ["fr","en","es","it","de","ja"],   /* 25 phrases */

    phrases: [

      /* ---- temps 1 · réserver la balade ---- */
      { ref:"dm2-reserver-lagon", temps:1, dit:"joueuse", mots:["balade","lagon"],
        fr:"Je voudrais réserver une balade dans le lagon.",
        en:"I'd like to book a ride in the lagoon.",
        es:"Quisiera reservar un paseo por el lagón.",
        it:"Vorrei prenotare una passeggiata nella laguna.",
        de:"Ich möchte einen Ausritt in der Lagune buchen.",
        ja:"ラグーン で の 外乗 を 予約 し たい の です が。" },

      { ref:"dm2-y-a-guide", temps:1, dit:"joueuse", mots:["guide"],
        fr:"Est-ce qu'il y a un guide ?",
        en:"Is there a guide?",
        es:"¿Hay un guía?",
        it:"C'è una guida?",
        de:"Gibt es einen Führer?",
        ja:"ガイド は い ます か ?" },

      { ref:"dm2-nager-chevaux", temps:1, dit:"joueuse", mots:["baignade"],
        fr:"Est-ce qu'il est possible de nager avec les chevaux ?",
        en:"Is it possible to swim with the horses?",
        es:"¿Es posible nadar con los caballos?",
        it:"È possibile nuotare con i cavalli?",
        de:"Kann man mit den Pferden schwimmen?",
        ja:"馬 と 一緒 に 泳ぐ こと は でき ます か ?" },

      { ref:"dm2-baignade-confirmes", temps:1, dit:"joueuse", mots:["baignade","cavalier-confirme"],
        fr:"La baignade est-elle réservée aux cavaliers confirmés ?",
        en:"Is the swim for experienced riders only?",
        es:"¿El baño es solo para jinetes experimentados?",
        it:"Il bagno è riservato ai cavalieri esperti?",
        de:"Ist das Baden nur für erfahrene Reiter?",
        ja:"水浴 は 経験 の ある 騎手 だけ です か ?" },

      { ref:"dm2-cheval-calme", temps:1, dit:"joueuse", mots:[],
        fr:"Est-ce que vous avez un cheval très calme ?",
        en:"Have you got a very quiet horse?",
        es:"¿Tienen un caballo muy tranquilo?",
        it:"Avete un cavallo molto tranquillo?",
        de:"Haben Sie ein sehr ruhiges Pferd?",
        ja:"とても おとなしい 馬 は い ます か ?" },

      /* ---- temps 2 · avant d'entrer dans l'eau ---- */
      { ref:"dm2-licol-ou-filet", temps:2, dit:"joueuse", mots:[],
        fr:"Est-ce qu'on monte en licol ou avec un filet ?",
        en:"Do we ride in a headcollar or a bridle?",
        es:"¿Montamos con cabezada o con brida?",
        it:"Si monta con la capezza o con la briglia?",
        de:"Reiten wir mit Halfter oder Trense?",
        ja:"無口 で 乗り ます か、 頭絡 で 乗り ます か ?" },

      { ref:"dm2-resangler", temps:2, dit:"joueuse", mots:["faire-entrer-eau"],
        fr:"Est-ce qu'il faut resangler avant d'entrer dans l'eau ?",
        en:"Do we need to tighten the girth before going into the water?",
        es:"¿Hay que apretar la cincha antes de entrar en el agua?",
        it:"Bisogna stringere il sottopancia prima di entrare in acqua?",
        de:"Muss man vor dem Wasser den Gurt nachziehen?",
        ja:"水 に 入る 前 に 腹帯 を 締め 直し ます か ?" },

      { ref:"dm2-a-cru-baignade", temps:2, dit:"joueuse", mots:["monter-a-cru","baignade"],
        fr:"Est-ce qu'on peut monter à cru pour la baignade ?",
        en:"Can we ride bareback for the swim?",
        es:"¿Se puede montar a pelo para el baño?",
        it:"Si può montare a pelo per il bagno?",
        de:"Kann man zum Baden ohne Sattel reiten?",
        ja:"水浴 で は 裸馬 で 乗れ ます か ?" },

      { ref:"dm2-jamais-a-cru", temps:2, dit:"joueuse", mots:["monter-a-cru"],
        fr:"Je ne suis jamais montée à cru.",
        en:"I've never ridden bareback.",
        es:"Nunca he montado a pelo.",
        it:"Non ho mai montato a pelo.",
        de:"Ich bin noch nie ohne Sattel geritten.",
        ja:"裸馬 に 乗っ た こと は あり ませ ん。" },

      /* ---- temps 3 · entrer dans l'eau ---- */
      { ref:"dm2-hesite-eau", temps:3, dit:"joueuse", mots:["faire-entrer-eau"],
        fr:"Mon cheval hésite à entrer dans l'eau. Qu'est-ce que je dois faire ?",
        en:"My horse is hesitating to go into the water. What should I do?",
        es:"Mi caballo duda en entrar en el agua. ¿Qué debo hacer?",
        it:"Il mio cavallo esita a entrare in acqua. Che cosa devo fare?",
        de:"Mein Pferd zögert, ins Wasser zu gehen. Was soll ich tun?",
        ja:"馬 が 水 に 入る の を ためらっ て い ます。 どう すれ ば よい です か ?" },

      { ref:"dm2-r-suivez-calme", temps:3, dit:"club", mots:["faire-entrer-eau","guide"],
        fr:"Suivez un cheval calme, avancez au pas et laissez-lui le temps.",
        en:"Follow a quiet horse, walk forward and give him time.",
        es:"Siga a un caballo tranquilo, avance al paso y déle tiempo.",
        it:"Segua un cavallo tranquillo, avanzi al passo e gli dia tempo.",
        de:"Folgen Sie einem ruhigen Pferd, gehen Sie im Schritt vor und lassen Sie ihm Zeit.",
        ja:"落ち着い た 馬 に つい て、 常歩 で 進み、 時間 を かけ て あげ ます。" },

      /* ---- temps 4 · comprendre la plage ---- */
      { ref:"dm2-quelle-maree", temps:4, dit:"joueuse", mots:["maree","maree-basse"],
        fr:"On part à quelle marée ?",
        en:"What tide do we leave at?",
        es:"¿Con qué marea salimos?",
        it:"Con che marea si parte?",
        de:"Bei welcher Tide reiten wir los?",
        ja:"どの 潮 の とき に 出発 し ます か ?" },

      { ref:"dm2-r-sable-ferme", temps:4, dit:"club", mots:["maree-basse","sable-ferme","sable-mouille"],
        fr:"À marée basse, restez plutôt sur le sable ferme et mouillé.",
        en:"At low tide, stay on the firm wet sand.",
        es:"Con marea baja, quédense en la arena firme y mojada.",
        it:"Con la bassa marea, restate sulla sabbia soda e bagnata.",
        de:"Bei Ebbe bleiben Sie auf dem festen nassen Sand.",
        ja:"干潮 の とき は、 締まっ た 濡れ 砂 の 上 を 進み ます。" },

      { ref:"dm2-r-file-distances", temps:4, dit:"club", mots:["file-indienne","garder-distances"],
        fr:"Restez en file indienne et gardez vos distances.",
        en:"Stay in single file and keep your distance.",
        es:"Quédense en fila india y guarden las distancias.",
        it:"Restate in fila indiana e tenete le distanze.",
        de:"Bleiben Sie im Gänsemarsch und halten Sie Abstand.",
        ja:"一列 縦隊 で、 間隔 を 保っ て ください。" },

      /* ---- temps 5 · adapter sa position ---- */
      { ref:"dm2-r-trot-enleve", temps:5, dit:"club", mots:["trot-enleve"],
        fr:"Au trot, restez enlevé pour ne pas peser inutilement sur le dos du cheval.",
        en:"Use rising trot so you don't put unnecessary weight on the horse's back.",
        es:"Al trote, vayan levantados para no pesar innecesariamente sobre el dorso.",
        it:"Al trotto, restate battuti per non pesare inutilmente sul dorso del cavallo.",
        de:"Reiten Sie leicht, um den Rücken des Pferdes nicht unnötig zu belasten.",
        ja:"速歩 で は 軽 速歩 に し て、 馬 の 背 に 無用 な 負担 を かけ ない よう に し ます。" },

      { ref:"dm2-r-galop-equilibre", temps:5, dit:"club", mots:["galop-equilibre"],
        fr:"Pour un long galop sur la plage, restez en équilibre au-dessus de vos étriers.",
        en:"For a long canter along the beach, stay in a light seat over your stirrups.",
        es:"Para un galope largo por la playa, manténganse en equilibrio sobre los estribos.",
        it:"Per un lungo galoppo sulla spiaggia, restate in equilibrio sopra le staffe.",
        de:"Für einen langen Galopp am Strand bleiben Sie im leichten Sitz über den Bügeln.",
        ja:"浜辺 で 長く 駈歩 する とき は、 鐙 の 上 で 腰 を 浮かせ た まま に し ます。" },

      { ref:"dm2-galoper-dans-eau", temps:5, dit:"joueuse", mots:["galop-assis","baignade"],
        fr:"J'aimerais galoper dans l'eau.",
        en:"I'd like to canter in the water.",
        es:"Me gustaría galopar en el agua.",
        it:"Mi piacerebbe galoppare nell'acqua.",
        de:"Ich würde gern im Wasser galoppieren.",
        ja:"水 の 中 で 駈歩 し て み たい です。" },

      { ref:"dm2-r-attrape-criniere", temps:5, dit:"club", mots:["attraper-criniere"],
        fr:"Si vous perdez l'équilibre, attrapez la crinière plutôt que de vous raccrocher aux rênes.",
        en:"If you lose your balance, grab the mane rather than grabbing the reins.",
        es:"Si pierden el equilibrio, agárrense a las crines en vez de a las riendas.",
        it:"Se perdete l'equilibrio, afferrate la criniera invece delle redini.",
        de:"Wenn Sie das Gleichgewicht verlieren, greifen Sie in die Mähne statt in die Zügel.",
        ja:"バランス を 崩し たら、 手綱 に すがら ず に たてがみ を つかみ ます。" },

      /* ---- temps 6 · le groupe et l'allure ---- */
      { ref:"dm2-r-pas-depasser", temps:6, dit:"club", mots:["garder-distances","file-indienne"],
        fr:"Évitez de dépasser les autres chevaux ou de galoper côte à côte : certains peuvent croire qu'on leur propose de faire la course.",
        en:"Avoid overtaking the other horses or cantering side by side: some horses may think you're asking them to race.",
        es:"Eviten adelantar a los otros caballos o galopar uno al lado del otro: algunos pueden creer que se les propone una carrera.",
        it:"Evitate di sorpassare gli altri cavalli o di galoppare affiancati: alcuni possono credere che gli si proponga una corsa.",
        de:"Überholen Sie die anderen Pferde nicht und galoppieren Sie nicht nebeneinander: manche Pferde denken sonst, sie sollen rennen.",
        ja:"ほか の 馬 を 追い越し たり、 横 に 並ん で 駈歩 し たり し ない で ください。 競走 に 誘わ れ た と 思う 馬 が い ます。" },

      { ref:"dm2-r-accelere", temps:6, dit:"club", mots:["galop-assis"],
        fr:"Si votre cheval commence à accélérer, redressez-vous et demandez-lui de ralentir avant qu'il ne prenne trop de vitesse.",
        en:"If your horse starts to speed up, sit tall and ask him to slow down before he gets too fast.",
        es:"Si su caballo empieza a acelerar, yérgase y pídale que reduzca antes de que coja demasiada velocidad.",
        it:"Se il cavallo comincia ad accelerare, allungatevi e chiedetegli di rallentare prima che prenda troppa velocità.",
        de:"Wenn Ihr Pferd schneller wird, wachsen Sie und bitten Sie es zu verlangsamen, bevor es zu schnell ist.",
        ja:"馬 が 速く なり 始め たら、 上体 を 起こし、 速く なり すぎる 前 に 落とす よう 求め ます。" },

      /* ---- temps 7 · le bien-être du cheval ---- */
      { ref:"dm2-r-fractionner", temps:7, dit:"club", mots:["galop-equilibre","balade"],
        fr:"Fractionnez les longs galops et laissez régulièrement les chevaux récupérer au pas.",
        en:"Break up long canters and regularly let the horses recover at a walk.",
        es:"Fraccionen los galopes largos y dejen que los caballos recuperen al paso.",
        it:"Frazionate i lunghi galoppi e lasciate che i cavalli recuperino al passo.",
        de:"Teilen Sie lange Galoppstrecken auf und lassen Sie die Pferde im Schritt verschnaufen.",
        ja:"長い 駈歩 は 区切っ て、 常歩 で 回復 さ せる 時間 を 定期的 に 取り ます。" },

      { ref:"dm2-r-repasser-au-pas", temps:7, dit:"club", mots:["balade"],
        fr:"On va repasser au pas quelques minutes pour laisser souffler les chevaux.",
        en:"We're going to walk for a few minutes to let the horses catch their breath.",
        es:"Vamos a ir al paso unos minutos para que los caballos recuperen el aliento.",
        it:"Andiamo al passo qualche minuto per far riprendere fiato ai cavalli.",
        de:"Wir gehen ein paar Minuten Schritt, damit die Pferde verschnaufen.",
        ja:"馬 に 息 を 入れ させる ため、 数 分 常歩 に 戻り ます。" },

      /* ---- temps 8 · la fin de la balade ---- */
      { ref:"dm2-ombre-chaud", temps:8, dit:"joueuse", mots:[],
        fr:"Est-ce qu'on peut s'arrêter à l'ombre ? J'ai trop chaud.",
        en:"Can we stop in the shade? I'm too hot.",
        es:"¿Podemos parar a la sombra? Tengo demasiado calor.",
        it:"Possiamo fermarci all'ombra? Ho troppo caldo.",
        de:"Können wir im Schatten anhalten? Mir ist zu heiß.",
        ja:"日陰 で 止まっ て も いい です か ? 暑 すぎ ます。" },

      { ref:"dm2-eau-douce-rincer", temps:8, dit:"joueuse", mots:["eau-douce"],
        fr:"Est-ce qu'il y a de l'eau douce pour rincer le cheval ?",
        en:"Is there fresh water to rinse the horse?",
        es:"¿Hay agua dulce para enjuagar al caballo?",
        it:"C'è acqua dolce per sciacquare il cavallo?",
        de:"Gibt es Süßwasser, um das Pferd abzuspülen?",
        ja:"馬 を 洗い 流す ため の 真水 は あり ます か ?" },

      { ref:"dm2-canter-pas-gallop", temps:8, dit:"joueuse", mots:["galop-assis","galop-equilibre"],
        fr:"Est-ce qu'on peut galoper ? Je ne veux pas aller trop vite.",
        en:"Can we canter? I don't want to gallop.",
        es:"¿Podemos galopar? No quiero ir demasiado rápido.",
        it:"Possiamo galoppare? Non voglio andare troppo veloce.",
        de:"Können wir galoppieren? Ich möchte nicht zu schnell werden.",
        ja:"駈歩 し て も いい です か ? 速く は 走り たく あり ませ ん。" },
    ]
  }
};
