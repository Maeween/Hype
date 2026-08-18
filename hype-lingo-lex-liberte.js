/* hype-lingo-lex-liberte.js — Hype Linguae · Taupō · « Free riding »
   ==================================================================
   18 CONCEPTS, UNE LEÇON. Écrit le 18/08/2026 pour TAUPŌ, Nouvelle-Zélande.
   35e ville du voyage, PREMIÈRE ville néo-zélandaise.

   POURQUOI CETTE VILLE
   Alycia Burton et Classic Goldrush ont concouru en concours complet à
   Taupō avant que le Free Riding ne devienne leur univers. Le lieu relie
   donc un passé sportif à ce qui a suivi. C'est la raison du choix de
   Blandine.
   ⚠️ AUCUNE BIOGRAPHIE N'EST INVENTÉE. Le récit de la ville évoque le
   couple SANS LE NOMMER — même précédent que Santa Ynez, où Monty Roberts
   est évoqué comme « un horseman de cette vallée ». 🟥 SI BLANDINE VEUT
   LES NOMMER, c'est une ligne à changer dans RECITS.taupo, rien d'autre.

   🟥 LA RÈGLE POSÉE PAR BLANDINE LE 18/08, ET QUI VAUT POUR TOUTE LINGUAE :
   **UN CONCEPT = UN `ref` GLOBAL. Plusieurs villes le réactivent dans des
   contextes différents.**
   Un mot déjà acquis ailleurs REPREND SON `ref`. Sa définition peut être
   réécrite pour le nouveau contexte, mais il n'est pas recompté comme une
   acquisition neuve. ⚠️ NE JAMAIS créer un `ref` parallèle pour un mot qui
   existe (pas de `cru-taupo` à côté de `monter-a-cru`).

   QUATRE ENTRÉES SONT DES RAPPELS, `ref` repris à l'identique :
     · `monter-a-cru`      ← hype-lingo-lex-balade.js (Le Morne)
     · `travail-pied`      ← hype-lingo-lex-horsemanship.js (Santa Ynez)
     · `desensibilisation` ← hype-lingo-lex-horsemanship.js (Santa Ynez)
     · `relachement`       ← hype-lingo-lex-horsemanship.js (Santa Ynez)
   Leurs `mots` sont RECOPIÉS À L'IDENTIQUE — c'est la règle des rappels
   (voir `balade` entre La Baule et Le Morne). Seule la `def` change.
   ⚠️ NE PAS « corriger » ces mots ici : ils doivent rester alignés sur leur
   fichier d'origine, sinon le joueur voit deux traductions du même `ref`.

   🟥 CE CHAPITRE N'EST PAS SANTA YNEZ 2 — cadrage de Blandine, 18/08 :
     · Santa Ynez = comment on communique, comment se construit la réponse.
       ASK → RESPONSE → RELEASE. C'est là qu'on l'apprend.
     · Taupō = jusqu'où cette communication permet d'aller quand on retire
       progressivement les aides matérielles.
   `pression`, `relâchement`, `groundwork` et la désensibilisation sont donc
   RAPPELÉS quand c'est naturel, mais ne redeviennent pas le cœur pédagogique.
   ⚠️ NE PAS réenseigner la mécanique de la pression ici.

   LA PROGRESSION DU CHAPITRE, dictée par Blandine :
     travail au sol → communication → pression/relâchement → travail en
     liberté → confiance → monte à cru → corde d'encolure → sans filet →
     Free Riding.
   🟥 LE FREE RIDING EST L'ABOUTISSEMENT, JAMAIS LE PREMIER EXERCICE.
   Aucune phrase de ce fichier ne présente le retrait du matériel comme un
   point de départ. Idée directrice, ses mots : **moins de matériel ne
   signifie pas moins de préparation.**

   LES TROIS DISTINCTIONS QUE LE JOUEUR DOIT RESSORTIR :
     · bareback (sans selle) ≠ bridleless (sans filet) — ce ne sont PAS des
       synonymes, et on peut faire l'un sans l'autre.
     · bitless / sans mors (Santa Ynez : un filet sans embouchure) ≠
       bridleless (plus de filet du tout). Troisième terme, souvent confondu.
     · liberty work (à pied, cheval libre) ≠ free riding (monté).

   ⚠️ QUATRE ENTRÉES SONT À VÉRIFIER — voir le bloc marqué 🔴 plus bas :
   `voix`, `confiance`, `equilibre`, `recompenser` sont des mots courants qui
   existent PEUT-ÊTRE déjà dans `cours`, `poney`, `obstacle` ou `arrivee`,
   que Claude n'a pas eus sous les yeux. Si l'un d'eux existe, il faut
   REPRENDRE son `ref` et ses `mots` d'origine, conformément à la règle.

   ⚠️ LE JAPONAIS DES PHRASES EST DÉCOUPÉ PAR GROUPES DE SENS, avec des
   espaces : `attendue.split(" ")` en fait les tuiles à remettre dans
   l'ordre. Règle tranchée le 17/08. Jamais par morphèmes.

   ⚠️ ES / IT / DE / JA À FAIRE RELIRE par un cavalier de la langue — le
   vocabulaire du travail en liberté n'a pas d'équivalent officiel partout,
   les entrées marquées `// ??` sont les plus incertaines.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA
     var  variante régionale
     def  définition — mode Lexique, verso de la carte, indice dans les jeux
     v    true si c'est un verbe (le moteur les traite à part)
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.liberte = {
  ref: "liberte",
  chapitre: 35,
  /* 🟥 « FREE RIDING » DANS LES SIX LANGUES, decision de Blandine du 18/08.
     ⚠️ Ne pas confondre avec l'entree `monte-liberte` du lexique, qui garde
     bien « la monte en liberte » cote francais : c'est le MOT qu'on apprend.
     Ici c'est le NOM DU CHAPITRE, et il ne se traduit pas. */
  titre: { fr:"Free riding", en:"Free riding", es:"Free riding",
           it:"Free riding", de:"Free riding", ja:"フリーライディング" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LA MONTE EN LIBERTÉ ============ */

  /* ---------------- le sol, d'abord ---------------- */

  /* 🔁 RAPPEL de Santa Ynez. `mots` recopiés à l'identique de
     hype-lingo-lex-horsemanship.js. Seule la définition change : là-bas le
     travail à pied est LE lieu de l'apprentissage ; ici il est la CONDITION
     du retrait du matériel. Ne pas réenseigner, réactiver. */
  { ref:"travail-pied", lecon:1, coll:"pied",
    mots:{ fr:{m:"le travail à pied"}, en:{m:"groundwork", p:"graound-work"},
           es:{m:"el trabajo desde el suelo"}, it:{m:"il lavoro da terra"},
           de:{m:"die Bodenarbeit", p:"bô-den-ar-baït"},
           ja:{m:"地上作業", p:"chijō sagyō"} },
    def:{ fr:"Le mot déjà croisé à Santa Ynez. Ici il devient la condition de tout le reste : ce qui ne s'obtient pas à pied ne s'obtiendra pas sans filet. On ne retire rien tant que le cheval ne répond pas déjà depuis le sol.",
          en:"The word you met at Santa Ynez. Here it becomes the condition for everything else: what you cannot get from the ground you will not get without a bridle. You remove nothing until the horse already answers from the ground.",
          es:"La palabra ya vista en Santa Ynez. Aquí es la condición de todo lo demás: lo que no se consigue desde el suelo no se conseguirá sin brida. No se quita nada mientras el caballo no responda ya desde el suelo.",
          it:"La parola già incontrata a Santa Ynez. Qui diventa la condizione di tutto il resto: ciò che non si ottiene da terra non si otterrà senza briglia. Non si toglie nulla finché il cavallo non risponde già da terra.",
          de:"Das Wort kennst du aus Santa Ynez. Hier wird es zur Bedingung für alles Weitere: Was vom Boden aus nicht gelingt, gelingt auch ohne Zaum nicht. Man nimmt nichts weg, solange das Pferd nicht schon vom Boden aus antwortet.",
          ja:"サンタ・イネズで出会った言葉。ここではそれ以外すべての前提になります。地上で得られないものは、頭絡なしでも得られません。馬が地上ですでに応えるまで、何も外しません。" } },

  /* 🔁 RAPPEL de Santa Ynez, `mots` à l'identique. Blandine tenait à la
     graphie UK/US : l'entrée d'origine porte `desensitising`, la variante
     américaine est ajoutée ici en `var` — c'est le seul écart, et il
     n'affecte pas la traduction principale. */
  { ref:"desensibilisation", lecon:1, coll:"pied",
    mots:{ fr:{m:"la désensibilisation"},
           en:{m:"desensitising", p:"di-sen-si-taï-zing", var:"desensitizing (US)"},
           es:{m:"la desensibilización"}, it:{m:"la desensibilizzazione"},
           de:{m:"die Desensibilisierung", p:"dé-zen-zi-bi-li-zî-roung"},
           ja:{m:"脱感作", p:"dakkansa"} },
    def:{ fr:"⚠️ DÉSENSIBILISER NE VEUT PAS DIRE RENDRE INSENSIBLE. On apprend au cheval à rester calme, ou à le redevenir, face à un objet, un bruit, un mouvement. Ici c'est ce qui permet de monter sans filet ailleurs qu'en carrière : un cheval qui sursaute au premier sac plastique n'est pas prêt à se passer de matériel.",
          en:"Desensitising does not mean making the horse insensitive. You teach him to stay calm, or to become calm again, faced with an object, a noise, a movement. Here it is what makes riding bridleless possible outside an arena: a horse who spooks at the first plastic bag is not ready to go without equipment.",
          es:"⚠️ DESENSIBILIZAR NO ES VOLVERLO INSENSIBLE. Se le enseña a mantener la calma, o a recuperarla, ante un objeto, un ruido, un movimiento. Aquí es lo que permite montar sin brida fuera de la pista: un caballo que se asusta con la primera bolsa no está listo para prescindir del material.",
          it:"⚠️ DESENSIBILIZZARE NON VUOL DIRE RENDERE INSENSIBILE. Gli si insegna a restare calmo, o a ritrovare la calma, davanti a un oggetto, un rumore, un movimento. Qui è ciò che permette di montare senza briglia fuori dal campo: un cavallo che si spaventa al primo sacchetto non è pronto a fare a meno del materiale.",
          de:"⚠️ DESENSIBILISIEREN HEISST NICHT, DAS PFERD UNEMPFINDLICH ZU MACHEN. Man bringt ihm bei, ruhig zu bleiben oder wieder ruhig zu werden — vor einem Gegenstand, einem Geräusch, einer Bewegung. Hier ist das die Voraussetzung, um außerhalb der Bahn ohne Zaum zu reiten.",
          ja:"⚠️ 脱感作とは、馬を鈍感にすることではありません。物、音、動きを前にして、落ち着いていられる、あるいは落ち着きを取り戻せるように教えることです。ここではそれが、馬場の外で頭絡なしに乗るための条件になります。" } },

  /* 🔁 RAPPEL de Santa Ynez, `mots` à l'identique.
     🟥 UNE SEULE PHRASE DE RAPPEL DANS LA DÉFINITION, pas le mécanisme
     complet — cadrage de Blandine du 18/08. La mécanique s'apprend à Santa
     Ynez. Ici on dit seulement à quoi elle sert quand le matériel s'allège. */
  { ref:"relachement", lecon:1, coll:"pied",
    mots:{ fr:{m:"le relâchement"}, en:{m:"the release", p:"ri-lisse"},
           es:{m:"la cesión de la presión"}, it:{m:"il rilascio"},
           de:{m:"das Nachgeben", p:"nakh-guè-ben"},
           ja:{m:"リリース", p:"rirīsu"} },
    def:{ fr:"Déjà appris à Santa Ynez : l'instant où la demande s'arrête, et c'est lui qui enseigne. Ici il prend une valeur nouvelle — moins on a de matériel, plus le relâchement est le seul signal clair qui reste. On dit *to release the pressure*, relâcher la pression.",
          en:"Already learnt at Santa Ynez: the moment the ask stops, and that is what teaches. Here it takes on a new value — the less equipment you have, the more the release is the only clear signal left. You say to release the pressure.",
          es:"Ya aprendido en Santa Ynez: el instante en que cesa la petición, y es eso lo que enseña. Aquí cobra un valor nuevo: cuanto menos material, más la cesión es la única señal clara que queda. Se dice to release the pressure.",
          it:"Già imparato a Santa Ynez: l'istante in cui la richiesta cessa, ed è questo che insegna. Qui assume un valore nuovo: meno materiale si ha, più il rilascio è l'unico segnale chiaro che resta. Si dice to release the pressure.",
          de:"Schon in Santa Ynez gelernt: der Moment, in dem die Frage aufhört — und genau das lehrt. Hier bekommt es einen neuen Wert: je weniger Ausrüstung, desto mehr ist das Nachgeben das einzige klare Signal, das bleibt. Man sagt to release the pressure.",
          ja:"サンタ・イネズで学んだ言葉。要求が止まる瞬間であり、教えているのはそれです。ここでは新しい意味を帯びます。道具が少ないほど、リリースだけが唯一はっきり残る合図になるのです。英語では to release the pressure と言います。" } },

  /* ---------------- la communication ---------------- */

  { ref:"langage-corps", lecon:1, coll:"communication",
    mots:{ fr:{m:"le langage du corps"}, en:{m:"body language", p:"bo-di lan-gouidj"},
           es:{m:"el lenguaje corporal"}, it:{m:"il linguaggio del corpo"},
           de:{m:"die Körpersprache", p:"keur-peur-chpra-khe"},
           ja:{m:"ボディランゲージ", p:"bodi rangēji"} },
    def:{ fr:"La posture, l'orientation des épaules, l'énergie qu'on dégage, la place qu'on occupe. Le cheval la lit avant la main. ⚠️ Elle ne se retire pas, elle : quand tout le matériel est parti, c'est elle qui reste — c'est pour ça qu'elle s'apprend en premier.",
          en:"Posture, the way your shoulders point, the energy you give off, the space you take up. The horse reads it before he feels the hand. It is the one aid you cannot remove: when all the equipment is gone, this is what is left.",
          es:"La postura, la orientación de los hombros, la energía que transmites, el espacio que ocupas. El caballo lo lee antes que la mano. ⚠️ Es la única ayuda que no se quita: cuando todo el material desaparece, es lo que queda.",
          it:"La postura, l'orientamento delle spalle, l'energia che emani, lo spazio che occupi. Il cavallo lo legge prima della mano. ⚠️ È l'unico aiuto che non si toglie: quando tutto il materiale è sparito, è ciò che resta.",
          de:"Die Haltung, wohin die Schultern zeigen, die Energie, die man ausstrahlt, der Raum, den man einnimmt. Das Pferd liest sie vor der Hand. ⚠️ Sie ist die einzige Hilfe, die man nicht ablegen kann: Wenn alle Ausrüstung weg ist, bleibt sie.",
          ja:"姿勢、肩の向き、まとう空気、占める空間。馬は手より先にこれを読みます。⚠️ これだけは外せない扶助です。道具がすべてなくなったとき、残るのはこれだけなのです。" } },

  { ref:"poids-corps", lecon:1, coll:"communication",
    mots:{ fr:{m:"le poids du corps"}, en:{m:"body weight", p:"bo-di ouéït"},
           es:{m:"el peso del cuerpo"}, it:{m:"il peso del corpo"},
           de:{m:"das Körpergewicht", p:"keur-peur-gue-vikht"},
           ja:{m:"体重", p:"taijū"} },
    def:{ fr:"Déplacer son poids d'un côté, s'asseoir, se grandir : une demande que le cheval sent directement dans son dos. Sans rênes, elle passe avant tout le reste. ⚠️ Elle marche dans les deux sens — un poids mal placé demande quelque chose qu'on ne voulait pas.",
          en:"Shifting your weight to one side, sitting down, growing tall: an ask the horse feels straight through his back. Without reins it comes before everything else. It works both ways — badly placed weight asks for something you did not mean.",
          es:"Desplazar el peso a un lado, sentarse, crecerse: una petición que el caballo siente directamente en el dorso. Sin riendas, va antes que todo lo demás. ⚠️ Funciona en los dos sentidos: un peso mal colocado pide algo que no querías.",
          it:"Spostare il peso da un lato, sedersi, allungarsi: una richiesta che il cavallo sente direttamente nel dorso. Senza redini viene prima di tutto il resto. ⚠️ Funziona nei due sensi: un peso mal messo chiede qualcosa che non volevi.",
          de:"Das Gewicht zur Seite verlagern, sich setzen, sich groß machen: eine Hilfe, die das Pferd direkt im Rücken spürt. Ohne Zügel kommt sie vor allem anderen. ⚠️ Sie wirkt in beide Richtungen — falsch verlagertes Gewicht fragt etwas, das man nicht wollte.",
          ja:"体重を片側に移す、座る、上体を伸ばす。馬が背中で直接感じる合図です。手綱がなければ、何よりも先にこれが働きます。⚠️ 逆も同じです。置き所を誤った体重は、望んでいないことを求めてしまいます。" } },

  /* 🔴 À VÉRIFIER — `voix` est un mot courant qui existe peut-être déjà dans
     hype-lingo-lex-cours.js (les ordres de reprise) ou hype-lingo-lex-poney.js.
     Si c'est le cas : REPRENDRE le `ref` et les `mots` d'origine, et ne garder
     d'ici que la définition. Règle du 18/08. */
  { ref:"voix", lecon:1, coll:"communication",
    mots:{ fr:{m:"la voix"}, en:{m:"the voice", p:"voïss"},
           es:{m:"la voz"}, it:{m:"la voce"},
           de:{m:"die Stimme", p:"chti-me"},
           ja:{m:"声", p:"koe"} },
    def:{ fr:"Le cheval n'entend pas un mot, il entend un ton et une durée. Un son court et montant relance, un son long et descendant calme. ⚠️ C'est pour ça que le mot lui-même importe peu — mais qu'il doit toujours être le même.",
          en:"The horse does not hear a word, he hears a tone and a length. A short rising sound sends him on, a long falling one settles him. That is why the word itself matters little — but it must always be the same one.",
          es:"El caballo no oye una palabra, oye un tono y una duración. Un sonido corto y ascendente lo lanza, uno largo y descendente lo calma. ⚠️ Por eso la palabra en sí importa poco, pero siempre debe ser la misma.",
          it:"Il cavallo non sente una parola, sente un tono e una durata. Un suono corto e ascendente lo rilancia, uno lungo e discendente lo calma. ⚠️ Per questo la parola in sé conta poco, ma deve essere sempre la stessa.",
          de:"Das Pferd hört kein Wort, es hört einen Ton und eine Länge. Ein kurzer, steigender Laut treibt an, ein langer, fallender beruhigt. ⚠️ Deshalb ist das Wort selbst fast egal — aber es muss immer dasselbe sein.",
          ja:"馬が聞いているのは言葉ではなく、調子と長さです。短く上がる音は前へ出し、長く下がる音は落ち着かせます。⚠️ だから言葉そのものは重要ではありません。ただし、いつも同じ言葉であること。" } },

  { ref:"ordre-vocal", lecon:1, coll:"communication",
    mots:{ fr:{m:"un ordre vocal"}, en:{m:"a voice cue", p:"voïss kiou"},
           es:{m:"una orden de voz"}, it:{m:"un comando vocale"},
           de:{m:"ein Stimmkommando", p:"chtim-ko-man-do"},
           ja:{m:"声の合図", p:"koe no aizu"} },
    def:{ fr:"⚠️ RETIENS LE MOT **CUE**. L'anglais l'emploie partout — *voice cue*, *leg cue*, *the cues he knows* — et le français n'a pas d'équivalent unique : on dit « une aide », « un signal », « une indication » selon les cas. Un ordre vocal est un son précis associé à une réponse précise, appris à pied avant d'être demandé en selle.",
          en:"Remember the word cue. English uses it everywhere — voice cue, leg cue, the cues he knows — and French has no single equivalent. A voice cue is one precise sound tied to one precise answer, taught from the ground before it is asked for in the saddle.",
          es:"⚠️ RETÉN LA PALABRA CUE. El inglés la usa en todas partes — voice cue, leg cue — y no tiene equivalente único en español: se dice ayuda, señal o indicación según el caso. Una orden de voz es un sonido preciso ligado a una respuesta precisa, enseñado desde el suelo.",
          it:"⚠️ RICORDA LA PAROLA CUE. L'inglese la usa ovunque — voice cue, leg cue — e non ha un equivalente unico in italiano: si dice aiuto, segnale, indicazione a seconda dei casi. Un comando vocale è un suono preciso legato a una risposta precisa, insegnato da terra.",
          de:"⚠️ MERK DIR DAS WORT CUE. Das Englische benutzt es überall — voice cue, leg cue — und im Deutschen gibt es kein einzelnes Gegenstück: Hilfe, Signal, Zeichen, je nach Fall. Ein Stimmkommando ist ein genauer Laut für eine genaue Antwort, vom Boden aus gelernt.",
          ja:"⚠️ cue という語を覚えてください。英語では voice cue、leg cue とどこでも使われますが、日本語に一語の対応はなく、扶助・合図・指示と場面で訳し分けます。声の合図とは、ひとつの正確な音とひとつの正確な反応を結びつけたもの。地上で教えてから、鞍上で求めます。" } },

  /* 🔴 À VÉRIFIER — voir la note sur `voix`. */
  { ref:"confiance", lecon:1, coll:"communication",
    mots:{ fr:{m:"la confiance"}, en:{m:"trust", p:"treuste"},
           es:{m:"la confianza"}, it:{m:"la fiducia"},
           de:{m:"das Vertrauen", p:"fèr-trao-en"},
           ja:{m:"信頼", p:"shinrai"} },
    def:{ fr:"Ce qui fait qu'un cheval choisit de rester avec toi alors que plus rien ne l'y oblige. ⚠️ Elle ne se déclare pas, elle se constate : c'est la seule chose qui tienne le jour où on retire la dernière rêne.",
          en:"What makes a horse choose to stay with you when nothing holds him any more. You do not declare it, you observe it: it is the only thing left holding on the day the last rein comes off.",
          es:"Lo que hace que un caballo elija quedarse contigo cuando ya nada lo obliga. ⚠️ No se declara, se constata: es lo único que sostiene el día en que se quita la última rienda.",
          it:"Ciò che fa sì che un cavallo scelga di restare con te quando più nulla lo obbliga. ⚠️ Non si dichiara, si constata: è l'unica cosa che tiene il giorno in cui si toglie l'ultima redine.",
          de:"Das, was ein Pferd bei dir bleiben lässt, wenn nichts es mehr hält. ⚠️ Man behauptet es nicht, man stellt es fest: Es ist das Einzige, was trägt an dem Tag, an dem der letzte Zügel wegfällt.",
          ja:"もう何も引き止めるものがないときに、馬が自分のそばにいることを選ぶ — それが信頼です。⚠️ 宣言するものではなく、確かめるもの。最後の手綱を外す日に残るのは、これだけです。" } },

  { ref:"connexion", lecon:1, coll:"communication",
    mots:{ fr:{m:"la connexion"}, en:{m:"the connection", p:"ko-nèk-cheune"},
           es:{m:"la conexión"}, it:{m:"la connessione"},
           de:{m:"die Verbindung", p:"fèr-bin-doung"},
           ja:{m:"つながり", p:"tsunagari"} },
    def:{ fr:"L'attention que le cheval te garde en continu : une oreille qui revient, un œil qui te cherche, une réponse qui arrive avant que tu insistes. ⚠️ Elle se mesure à ce que tes aides peuvent devenir de plus en plus discrètes sans qu'il décroche.",
          en:"The attention the horse keeps on you throughout: an ear that comes back, an eye looking for you, an answer arriving before you insist. You measure it by how much smaller your aids can get without losing him.",
          es:"La atención que el caballo te mantiene en todo momento: una oreja que vuelve, un ojo que te busca, una respuesta que llega antes de insistir. ⚠️ Se mide en que tus ayudas pueden hacerse cada vez más discretas sin que se desconecte.",
          it:"L'attenzione che il cavallo ti tiene di continuo: un orecchio che torna, un occhio che ti cerca, una risposta che arriva prima che tu insista. ⚠️ Si misura dal fatto che i tuoi aiuti possono farsi sempre più discreti senza perderlo.",
          de:"Die Aufmerksamkeit, die das Pferd dir durchgehend schenkt: ein Ohr, das zurückkommt, ein Auge, das dich sucht, eine Antwort, die kommt, bevor du nachfasst. ⚠️ Man misst sie daran, wie fein die Hilfen werden können, ohne dass er abreißt.",
          ja:"馬が絶えずあなたに向けている注意のこと。戻ってくる耳、あなたを探す目、押す前に返ってくる答え。⚠️ 扶助をどこまで小さくしても離れないか — それが尺度です。" } },

  /* 🔴 À VÉRIFIER — `recompenser` peut exister dans `cours` ou `poney`. */
  { ref:"recompenser", lecon:1, coll:"communication", v:true,
    mots:{ fr:{m:"récompenser"}, en:{m:"to reward", p:"ri-ouord"},
           es:{m:"recompensar"}, it:{m:"ricompensare"},
           de:{m:"belohnen", p:"be-lô-nen"},
           ja:{m:"褒める", p:"homeru"} },
    def:{ fr:"Arrêter de demander, gratter le garrot, laisser un temps de calme, descendre. ⚠️ Ce n'est pas d'abord une friandise : la première récompense d'un cheval, c'est que la demande cesse. Elle doit arriver tout de suite — récompensée trois secondes trop tard, elle récompense autre chose.",
          en:"Stop asking, scratch the withers, allow a quiet moment, get off. It is not primarily a treat: a horse's first reward is the ask stopping. And it must come at once — three seconds late, it rewards something else.",
          es:"Dejar de pedir, rascar la cruz, permitir un momento de calma, desmontar. ⚠️ No es ante todo una golosina: la primera recompensa de un caballo es que la petición cese. Y debe llegar enseguida: tres segundos tarde, recompensa otra cosa.",
          it:"Smettere di chiedere, grattare il garrese, concedere un momento di calma, scendere. ⚠️ Non è anzitutto un premio da mangiare: la prima ricompensa di un cavallo è che la richiesta cessi. E deve arrivare subito: tre secondi tardi, premia altro.",
          de:"Aufhören zu fragen, den Widerrist kraulen, einen ruhigen Moment lassen, absitzen. ⚠️ Es geht nicht in erster Linie um ein Leckerli: Die erste Belohnung eines Pferdes ist, dass die Frage aufhört. Und sie muss sofort kommen — drei Sekunden zu spät belohnt sie etwas anderes.",
          ja:"求めるのをやめる、き甲を掻いてやる、静かな時間を与える、降りる。⚠️ まずおやつのことではありません。馬にとって最初のご褒美は、要求が止まることです。そしてすぐに来なければなりません。三秒遅れれば、別のことを褒めてしまいます。" } },

  { ref:"rappeler-cheval", lecon:1, coll:"liberte", v:true,
    mots:{ fr:{m:"rappeler son cheval"}, en:{m:"to call your horse back", p:"kol yor hors bak"},
           es:{m:"llamar al caballo"}, it:{m:"richiamare il cavallo"},
           de:{m:"das Pferd zurückrufen", p:"tsou-ruk-rou-fen"},
           ja:{m:"馬を呼び戻す", p:"uma o yobimodosu"} },
    def:{ fr:"Le demander sans longe et l'obtenir. ⚠️ On rappelle en s'ouvrant et en reculant, jamais en avançant sur lui : avancer, dans son langage, chasse. C'est l'exercice qui dit si le travail en liberté tient vraiment.",
          en:"Asking for him with no rope, and getting him. You call by opening up and stepping back, never by walking at him: in his language, walking forward drives him away. It is the test of whether liberty work really holds.",
          es:"Pedírselo sin cuerda y conseguirlo. ⚠️ Se le llama abriéndose y retrocediendo, nunca avanzando hacia él: avanzar, en su lenguaje, ahuyenta. Es el ejercicio que dice si el trabajo en libertad se sostiene de verdad.",
          it:"Chiederglielo senza corda e ottenerlo. ⚠️ Si richiama aprendosi e indietreggiando, mai avanzando su di lui: avanzare, nel suo linguaggio, scaccia. È l'esercizio che dice se il lavoro in libertà tiene davvero.",
          de:"Ihn ohne Seil rufen — und ihn bekommen. ⚠️ Man ruft, indem man sich öffnet und zurückweicht, nie indem man auf ihn zugeht: Vorwärtsgehen treibt in seiner Sprache weg. Das ist die Probe, ob die Freiarbeit wirklich trägt.",
          ja:"ロープなしで求め、そして来てもらうこと。⚠️ 体を開いて後ろに下がって呼びます。決して馬に向かって進んではいけません。馬の言葉では、前に出ることは追い払うことだからです。リバティワークが本当に成立しているかを試す課題です。" } },

  /* ---------------- le travail en liberté ---------------- */

  { ref:"travail-liberte", lecon:1, coll:"liberte",
    mots:{ fr:{m:"le travail en liberté"}, en:{m:"liberty work", p:"li-beur-ti work"},
           es:{m:"el trabajo en libertad"}, it:{m:"il lavoro in libertà"},
           de:{m:"die Freiarbeit", p:"fraï-ar-baït"},
           ja:{m:"リバティワーク", p:"ribati wāku"} },
    def:{ fr:"Travailler le cheval sans longe ni licol, généralement depuis le sol. 🟥 CE N'EST PAS UN SYNONYME DE *FREE RIDING* : le travail en liberté se fait à pied, le free riding se fait monté. Confondre les deux est l'erreur la plus fréquente.",
          en:"Working the horse with no rope and no halter, usually from the ground. It is not a synonym of free riding: liberty work is done on foot, free riding is done mounted. Mixing the two up is the commonest mistake.",
          es:"Trabajar al caballo sin cuerda ni cabezada, normalmente desde el suelo. 🟥 NO ES SINÓNIMO DE FREE RIDING: el trabajo en libertad se hace a pie, el free riding montado. Confundirlos es el error más frecuente.",
          it:"Lavorare il cavallo senza corda né capezza, di solito da terra. 🟥 NON È SINONIMO DI FREE RIDING: il lavoro in libertà si fa a piedi, il free riding si fa montati. Confonderli è l'errore più comune.",
          de:"Mit dem Pferd ohne Seil und ohne Halfter arbeiten, meist vom Boden aus. 🟥 KEIN SYNONYM FÜR FREE RIDING: Freiarbeit findet zu Fuß statt, freies Reiten im Sattel. Die beiden zu verwechseln ist der häufigste Fehler.",
          ja:"ロープも無口もつけずに馬を動かすこと。通常は地上から行います。🟥 free riding の同義語ではありません。リバティワークは人が地上に立って行い、フリーライディングは騎乗して行います。この二つの混同が最も多い誤りです。" } },

  { ref:"monte-liberte", lecon:1, coll:"liberte",
    mots:{ fr:{m:"la monte en liberté"}, en:{m:"free riding", p:"fri raï-ding"},
           es:{m:"la monta en libertad"}, it:{m:"la monta in libertà"},
           de:{m:"das freie Reiten", p:"fraï-e raï-ten"},
           ja:{m:"フリーライディング", p:"furī raidingu"} },
    def:{ fr:"Monter en réduisant ou en supprimant les moyens de contrôle habituels, le filet d'abord. 🟥 CE N'EST PAS UN POINT DE DÉPART, C'EST UN ABOUTISSEMENT. Le cheval doit déjà connaître les codes avant qu'on enlève quoi que ce soit. Idée à retenir : **moins de matériel ne veut pas dire moins de préparation.**",
          en:"Riding with the usual means of control reduced or removed, the bridle first. It is not a starting point, it is an end point. The horse must already know the cues before anything is taken away. Remember: less equipment does not mean less preparation.",
          es:"Montar reduciendo o suprimiendo los medios de control habituales, empezando por la brida. 🟥 NO ES UN PUNTO DE PARTIDA, ES UNA CULMINACIÓN. El caballo debe conocer ya los códigos antes de quitar nada. Menos material no significa menos preparación.",
          it:"Montare riducendo o togliendo i mezzi di controllo abituali, a partire dalla briglia. 🟥 NON È UN PUNTO DI PARTENZA, È UN PUNTO D'ARRIVO. Il cavallo deve già conoscere i codici prima di togliere qualcosa. Meno materiale non vuol dire meno preparazione.",
          de:"Reiten mit reduzierten oder ganz weggelassenen üblichen Kontrollmitteln, zuerst dem Zaum. 🟥 KEIN ANFANG, SONDERN EIN ZIEL. Das Pferd muss die Zeichen schon kennen, bevor irgendetwas weggenommen wird. Weniger Ausrüstung heißt nicht weniger Vorbereitung.",
          ja:"通常の制御手段を減らす、あるいは外して乗ること。まず頭絡から。🟥 出発点ではなく到達点です。何かを外す前に、馬がすでに合図を理解していなければなりません。覚えておくこと — 道具が少ないことは、準備が少ないことではありません。" } },

  /* ---------------- le matériel qui s'allège ---------------- */

  /* 🔁 RAPPEL du Morne. `mots` recopiés à l'identique de
     hype-lingo-lex-balade.js. Au Morne, à cru = la baignade, le sel et le
     sable qui abîment le cuir. Ici, à cru = l'équilibre et l'assiette.
     Même mot, deuxième angle : c'est exactement l'intention de Blandine. */
  { ref:"monter-a-cru", lecon:1, coll:"monte",
    mots:{ fr:{m:"monter à cru"},
           en:{m:"to ride bareback", p:"bèr-bak"},
           es:{m:"montar a pelo"},
           it:{m:"montare a pelo"},
           de:{m:"ohne Sattel reiten", p:"o-ne za-tel", var:"blank reiten"},
           ja:{m:"裸馬に乗る", p:"hadakauma ni noru"} },
    def:{ fr:"Le mot déjà croisé au Morne, où il servait à entrer dans l'eau. Ici il change de sens : sans selle, ton équilibre et ton assiette deviennent tes seules aides fiables. 🟥 **BAREBACK N'EST PAS BRIDLELESS.** Bareback = sans selle. Bridleless = sans filet. On peut monter bareback AVEC un filet, bridleless AVEC une selle, ou les deux à la fois. Ce sont deux choses séparées.",
          en:"The word you met at Le Morne, where it was about going into the water. Here it changes meaning: without a saddle, your balance and your seat become your only reliable aids. Bareback is not bridleless. Bareback means no saddle; bridleless means no bridle. You can ride bareback with a bridle, bridleless with a saddle, or both at once.",
          es:"La palabra ya vista en Le Morne, donde servía para entrar en el agua. Aquí cambia de sentido: sin silla, tu equilibrio y tu asiento son tus únicas ayudas fiables. 🟥 BAREBACK NO ES BRIDLELESS. Bareback = sin silla. Bridleless = sin brida. Se puede montar a pelo CON brida, sin brida CON silla, o las dos cosas a la vez.",
          it:"La parola già incontrata a Le Morne, dove serviva per entrare in acqua. Qui cambia senso: senza sella, il tuo equilibrio e il tuo assetto diventano i soli aiuti affidabili. 🟥 BAREBACK NON È BRIDLELESS. Bareback = senza sella. Bridleless = senza briglia. Si può montare a pelo CON la briglia, senza briglia CON la sella, o entrambe insieme.",
          de:"Das Wort kennst du aus Le Morne, wo es ums Ins-Wasser-Gehen ging. Hier ändert es die Bedeutung: ohne Sattel werden Gleichgewicht und Sitz zu deinen einzigen verlässlichen Hilfen. 🟥 BAREBACK IST NICHT BRIDLELESS. Bareback = ohne Sattel. Bridleless = ohne Zaum. Man kann ohne Sattel MIT Zaum reiten, ohne Zaum MIT Sattel, oder beides zugleich.",
          ja:"ル・モーンで出会った言葉。あそこでは海に入るためのものでした。ここでは意味が変わります。鞍がなければ、バランスと騎座だけが頼れる扶助になります。🟥 bareback と bridleless は別物です。bareback は鞍なし、bridleless は頭絡なし。頭絡をつけたまま裸馬で乗ることも、鞍をつけたまま頭絡なしで乗ることも、両方同時もできます。" } },

  { ref:"corde-encolure", lecon:1, coll:"monte",
    mots:{ fr:{m:"la corde d'encolure"}, en:{m:"the neck rope", p:"nèk rôp"},
           es:{m:"la cuerda al cuello"}, it:{m:"la corda al collo"},
           de:{m:"das Halsseil", p:"hals-zaïl"},
           ja:{m:"ネックロープ", p:"nekku rōpu"} },
    def:{ fr:"Une corde souple posée à la base de l'encolure. Elle sert d'aide apprise pour tourner et pour ralentir ou s'arrêter, sans passer par les rênes du filet. 🟥 UNE CORDE D'ENCOLURE NE CONTRÔLE PAS UN CHEVAL. Elle rappelle un code qu'il connaît déjà. La poser sur un cheval qui ne l'a jamais appris ne donne rien du tout.",
          en:"A soft rope resting at the base of the neck. It works as a learnt aid for turning and for slowing or stopping, without going through the bridle reins. A neck rope does not control a horse. It recalls a cue he already knows. Put on a horse who has never learnt it, it does nothing at all.",
          es:"Una cuerda blanda apoyada en la base del cuello. Funciona como ayuda aprendida para girar y para frenar o parar, sin pasar por las riendas. 🟥 UNA CUERDA AL CUELLO NO CONTROLA A UN CABALLO. Recuerda un código que él ya conoce. Puesta a un caballo que nunca lo aprendió, no sirve de nada.",
          it:"Una corda morbida appoggiata alla base del collo. Serve da aiuto appreso per girare e per rallentare o fermarsi, senza passare dalle redini. 🟥 UNA CORDA AL COLLO NON CONTROLLA UN CAVALLO. Richiama un codice che lui già conosce. Messa a un cavallo che non l'ha mai imparato, non dà nulla.",
          de:"Ein weiches Seil am Halsansatz. Es dient als gelernte Hilfe zum Wenden und zum Verlangsamen oder Anhalten, ohne über die Zügel zu gehen. 🟥 EIN HALSSEIL KONTROLLIERT KEIN PFERD. Es ruft ein Zeichen ab, das es schon kennt. Einem Pferd umgelegt, das es nie gelernt hat, bewirkt es gar nichts.",
          ja:"首の付け根に掛ける柔らかいロープ。手綱を使わずに、方向転換や減速・停止のための「学習された合図」として働きます。🟥 ネックロープは馬を制御しません。すでに知っている合図を思い出させるだけです。学んだことのない馬に掛けても、何も起こりません。" } },

  { ref:"sans-filet", lecon:1, coll:"monte",
    mots:{ fr:{m:"monter sans filet"}, en:{m:"to ride bridleless", p:"braï-deul-less"},
           es:{m:"montar sin brida"}, it:{m:"montare senza briglia"},
           de:{m:"ohne Zaum reiten", p:"o-ne tsaoum"},
           ja:{m:"頭絡なしで乗る", p:"tōraku nashi de noru"} },
    def:{ fr:"Plus de filet du tout : ni mors, ni rênes, ni têtière. 🟥 TROIS MOTS À NE PAS CONFONDRE, et c'est le vrai gain de langue de ce chapitre : **bareback** = sans selle · **bitless** (croisé à Santa Ynez, « sans mors ») = un filet, mais sans embouchure dans la bouche · **bridleless** = plus de filet du tout. ⚠️ On ne retire pas le filet pour voir ce qui se passe.",
          en:"No bridle at all: no bit, no reins, no headpiece. Three words not to mix up, and this is the real language gain of the chapter: bareback = no saddle · bitless (met at Santa Ynez) = a bridle, but with nothing in the mouth · bridleless = no bridle at all. You do not take the bridle off just to see what happens.",
          es:"Ya no hay brida: ni bocado, ni riendas, ni testera. 🟥 TRES PALABRAS QUE NO HAY QUE CONFUNDIR: bareback = sin silla · bitless (visto en Santa Ynez, «sin bocado») = una cabezada sin embocadura en la boca · bridleless = sin brida en absoluto. ⚠️ No se quita la brida para ver qué pasa.",
          it:"Niente briglia: né morso, né redini, né testiera. 🟥 TRE PAROLE DA NON CONFONDERE: bareback = senza sella · bitless (incontrato a Santa Ynez, «senza morso») = una briglia, ma senza imboccatura · bridleless = nessuna briglia. ⚠️ Non si toglie la briglia per vedere cosa succede.",
          de:"Gar kein Zaum mehr: keine Trense, keine Zügel, kein Genickstück. 🟥 DREI WÖRTER, DIE MAN NICHT VERWECHSELN DARF: bareback = ohne Sattel · bitless (aus Santa Ynez, « gebisslos ») = ein Zaum, aber ohne Gebiss im Maul · bridleless = überhaupt kein Zaum. ⚠️ Man nimmt den Zaum nicht ab, nur um zu sehen, was passiert.",
          ja:"頭絡そのものがない状態。ハミも手綱も頭部の革もありません。🟥 混同してはいけない三語 — bareback は鞍なし、bitless（サンタ・イネズで学んだ「ハミなし」）は頭絡はあるが口にハミが入っていない状態、bridleless は頭絡そのものがない状態。⚠️ 何が起こるか見るために頭絡を外す、ということはしません。" } },

  /* 🔴 À VÉRIFIER — `equilibre` est employé en `motsAilleurs` dans
     hype-lingo-lex-dressage.js, donc il est DÉFINI dans un fichier que
     Claude n'a pas eu (probablement `cours` ou `obstacle`). Si c'est le cas :
     reprendre le `ref` et les `mots` d'origine. Règle du 18/08. */
  { ref:"equilibre", lecon:1, coll:"monte",
    mots:{ fr:{m:"l'équilibre"}, en:{m:"balance", p:"ba-lens"},
           es:{m:"el equilibrio"}, it:{m:"l'equilibrio"},
           de:{m:"das Gleichgewicht", p:"glaïçh-gue-vikht"},
           ja:{m:"バランス", p:"baransu"} },
    def:{ fr:"Tenir sur le cheval par soi-même, sans se rattraper à sa bouche ni à la selle. ⚠️ C'est ce qui rend tout le reste possible : un cavalier qui a besoin des rênes pour tenir ne peut pas les retirer. On dit aussi *l'assiette* — en anglais, **the seat**.",
          en:"Holding yourself on the horse, without catching hold of his mouth or the saddle. It is what makes everything else possible: a rider who needs the reins to stay on cannot take them away. The word for it is also the seat.",
          es:"Sostenerse sobre el caballo por uno mismo, sin agarrarse a su boca ni a la silla. ⚠️ Es lo que hace posible todo lo demás: un jinete que necesita las riendas para sostenerse no puede quitarlas. También se dice el asiento — en inglés, the seat.",
          it:"Reggersi sul cavallo da soli, senza aggrapparsi alla bocca né alla sella. ⚠️ È ciò che rende possibile tutto il resto: un cavaliere che ha bisogno delle redini per stare in sella non può toglierle. Si dice anche l'assetto — in inglese, the seat.",
          de:"Sich selbst auf dem Pferd halten, ohne sich am Maul oder am Sattel festzuhalten. ⚠️ Das macht alles Weitere möglich: Wer die Zügel zum Halten braucht, kann sie nicht weglassen. Man sagt auch der Sitz — englisch the seat.",
          ja:"馬の口にも鞍にもすがらず、自分の力で馬上に留まること。⚠️ ほかのすべてを可能にするのはこれです。手綱がなければ乗っていられない騎手は、手綱を外せません。「騎座」とも言い、英語では the seat です。" } },

  { ref:"reeduquer", lecon:1, coll:"liberte", v:true,
    mots:{ fr:{m:"rééduquer un cheval"}, en:{m:"to retrain a horse", p:"ri-tréne"},
           es:{m:"reeducar un caballo"}, it:{m:"rieducare un cavallo"},
           de:{m:"ein Pferd umschulen", p:"oum-chou-len"},
           ja:{m:"馬を再調教する", p:"uma o saichōkyō suru"} },
    def:{ fr:"Reprendre un cheval déjà monté pour lui réapprendre autrement. ⚠️ **RETRAIN**, à ne pas confondre avec **to start a horse** (débourrer, croisé à Santa Ynez), qui concerne un cheval jamais monté. Beaucoup de chevaux de free riding sont des chevaux rééduqués, pas des chevaux commencés pour ça.",
          en:"Taking on a horse who has already been ridden and teaching him differently. Retrain is not the same as to start a horse (met at Santa Ynez), which is about a horse never ridden. Many free riding horses are retrained horses, not horses started for it.",
          es:"Retomar un caballo ya montado para reenseñarle de otra manera. ⚠️ RETRAIN no es lo mismo que to start a horse (desbravar, visto en Santa Ynez), que se refiere a un caballo nunca montado. Muchos caballos de free riding son caballos reeducados.",
          it:"Riprendere un cavallo già montato per rieducarlo diversamente. ⚠️ RETRAIN non va confuso con to start a horse (sdomare, incontrato a Santa Ynez), che riguarda un cavallo mai montato. Molti cavalli da free riding sono cavalli rieducati.",
          de:"Ein bereits gerittenes Pferd übernehmen und ihm anders beibringen. ⚠️ RETRAIN ist nicht dasselbe wie to start a horse (anreiten, aus Santa Ynez), was ein nie gerittenes Pferd meint. Viele Free-Riding-Pferde sind umgeschulte Pferde.",
          ja:"すでに乗られたことのある馬を引き取り、別のやり方で学び直させること。⚠️ retrain は to start a horse（サンタ・イネズで学んだ「馴致・初期調教」、一度も乗られたことのない馬が対象）とは別です。フリーライディングの馬の多くは、そのために馴致された馬ではなく、再調教された馬です。" } }

  ],

  /* ==================================================================
     LES PHRASES DU CHAPITRE — employées par les exercices « remettre dans
     l'ordre ». Japonais découpé par groupes de sens, espaces compris.
     ================================================================== */
  phrases: [

  { ref:"ph-lib-sol", lecon:1,
      fr:"Commence par le travail à pied.",
      en:"Start with groundwork.",
      es:"Empieza por el trabajo desde el suelo.",
      it:"Comincia dal lavoro da terra.",
      de:"Fang mit der Bodenarbeit an.",
      ja:"まず 地上作業 から 始め ましょう 。" },

  { ref:"ph-lib-voix", lecon:1,
      fr:"Utilise ta voix et ton langage du corps.",
      en:"Use your voice and your body language.",
      es:"Usa tu voz y tu lenguaje corporal.",
      it:"Usa la voce e il linguaggio del corpo.",
      de:"Benutze deine Stimme und deine Körpersprache.",
      ja:"声 と ボディランゲージ を 使って ください 。" },

  { ref:"ph-lib-recompense", lecon:1,
      fr:"Relâche la pression et récompense-le.",
      en:"Release the pressure and reward him.",
      es:"Cede la presión y recompénsalo.",
      it:"Rilascia la pressione e ricompensalo.",
      de:"Gib den Druck nach und belohne ihn.",
      ja:"圧 を 解いて 、 褒めて あげて ください 。" },

  { ref:"ph-lib-cru", lecon:1,
      fr:"Je voudrais essayer de monter à cru.",
      en:"I'd like to try riding bareback.",
      es:"Me gustaría probar a montar a pelo.",
      it:"Vorrei provare a montare a pelo.",
      de:"Ich würde gern ohne Sattel reiten.",
      ja:"裸馬 に 乗って みたい です 。" },

  { ref:"ph-lib-corde", lecon:1,
      fr:"À quoi sert la corde autour de son encolure ?",
      en:"What is the rope around his neck for?",
      es:"¿Para qué sirve la cuerda alrededor del cuello?",
      it:"A cosa serve la corda intorno al collo?",
      de:"Wofür ist das Seil um seinen Hals?",
      ja:"首 に 巻いて ある ロープ は 何 の ため です か ?" },

  { ref:"ph-lib-tourner", lecon:1,
      fr:"Comment est-ce que je tourne sans filet ?",
      en:"How do I turn without a bridle?",
      es:"¿Cómo giro sin brida?",
      it:"Come giro senza briglia?",
      de:"Wie wende ich ohne Zaum?",
      ja:"頭絡 なし で どう やって 曲がり ます か ?" }

  ],

  /* ==================================================================
     LE DIALOGUE DE TAUPŌ — 26 phrases, 9 temps.
     Les 18 phrases de Blandine, plus ses 6 phrases bonus et les 2 du
     débourrage, remises dans l'ordre de sa progression.
     🟥 AUCUNE PHRASE N'EST RETIRÉE, aucune n'est réécrite sur le fond :
     règle des dialogues, « ne jamais retirer une phrase ajoutée par
     Blandine ».
     ⚠️ `mots` = les concepts de CE chapitre · `motsAilleurs` = ceux qui
     appartiennent à un autre chapitre et qui sont seulement employés ici.
     `debourrage`, `pression`, `licol-etho` viennent de Santa Ynez.
     `dit` : "joueuse" = elle produit · "club" = la cavalière de Taupō.
     ================================================================== */
  dialogue: {
    ville: "taupo", lecon: 1, temps: 9, langues: ["fr","en","es","it","de","ja"],   /* 26 phrases */

    phrases: [

      /* ---- temps 1 · d'abord le sol ---- */
      { ref:"dt2-verifier-sol", temps:1, dit:"joueuse", mots:["sans-filet","travail-pied"],
        fr:"Avant de monter sans filet, je veux vérifier qu'il répond bien depuis le sol.",
        en:"Before riding bridleless, I want to make sure he responds well from the ground.",
        es:"Antes de montar sin brida, quiero comprobar que responde bien desde el suelo.",
        it:"Prima di montare senza briglia, voglio verificare che risponda bene da terra.",
        de:"Bevor ich ohne Zaum reite, will ich sicher sein, dass er vom Boden aus gut antwortet.",
        ja:"頭絡 なし で 乗る 前 に 、 地上 で ちゃんと 応える か 確かめ たい です 。" },

      { ref:"dt2-r-commence-pied", temps:1, dit:"club", mots:["travail-pied","ordre-vocal"],
        fr:"Commence par le travail à pied et assure-toi qu'il comprend déjà tes demandes.",
        en:"Start with groundwork and make sure he already understands your cues.",
        es:"Empieza por el trabajo desde el suelo y asegúrate de que ya entiende tus señales.",
        it:"Comincia dal lavoro da terra e assicurati che capisca già le tue richieste.",
        de:"Fang mit der Bodenarbeit an und vergewissere dich, dass er deine Zeichen schon versteht.",
        ja:"まず 地上作業 から 始めて 、 あなた の 合図 を すでに 理解 して いる か 確かめ ましょう 。" },

      { ref:"dt2-suit-sans-tirer", temps:1, dit:"joueuse", mots:[], motsAilleurs:["licol-etho"],
        fr:"Est-ce qu'il me suit sans que je tire sur la longe ?",
        en:"Does he follow me without me pulling on the lead rope?",
        es:"¿Me sigue sin que yo tire de la cuerda?",
        it:"Mi segue senza che io tiri la corda?",
        de:"Folgt er mir, ohne dass ich am Führstrick ziehe?",
        ja:"引き綱 を 引っ張ら なくて も 、 ついて 来 ます か ?" },

      /* ---- temps 2 · la pression et le relâchement (RAPPEL, une seule fois) ---- */
      { ref:"dt2-r-relache-recompense", temps:2, dit:"club", mots:["relachement","recompenser"], motsAilleurs:["pression"],
        fr:"Dès qu'il répond correctement, relâche la pression et récompense-le.",
        en:"As soon as he responds correctly, release the pressure and reward him.",
        es:"En cuanto responda correctamente, cede la presión y recompénsalo.",
        it:"Appena risponde correttamente, rilascia la pressione e ricompensalo.",
        de:"Sobald er richtig antwortet, gib den Druck nach und belohne ihn.",
        ja:"正しく 応えた 瞬間 に 、 圧 を 解いて 褒めて あげて ください 。" },

      /* ---- temps 3 · le cheval qui a peur ---- */
      { ref:"dt2-peur-objet", temps:3, dit:"joueuse", mots:["desensibilisation"],
        fr:"Il a peur de cet objet. Est-ce que je dois continuer ?",
        en:"He's afraid of this object. Should I keep going?",
        es:"Tiene miedo de este objeto. ¿Debo seguir?",
        it:"Ha paura di questo oggetto. Devo continuare?",
        de:"Er hat Angst vor diesem Gegenstand. Soll ich weitermachen?",
        ja:"この 物 を 怖がって い ます 。 続けた ほう が いい です か ?" },

      { ref:"dt2-r-force-pas", temps:3, dit:"club", mots:["relachement","desensibilisation"],
        fr:"Ne le force pas : laisse-lui le temps de regarder et relâche la pression dès qu'il se détend.",
        en:"Don't force him: give him time to look and release the pressure as soon as he relaxes.",
        es:"No lo fuerces: dale tiempo para mirar y cede la presión en cuanto se relaje.",
        it:"Non forzarlo: dagli il tempo di guardare e rilascia la pressione appena si rilassa.",
        de:"Zwing ihn nicht: Lass ihm Zeit zum Hinschauen und gib den Druck nach, sobald er sich entspannt.",
        ja:"無理強い は しない で 。 見る 時間 を 与え 、 緊張 が ほどけた 瞬間 に 圧 を 解いて ください 。" },

      /* ---- temps 4 · retirer la longe ---- */
      { ref:"dt2-retirer-longe", temps:4, dit:"joueuse", mots:["travail-liberte"],
        fr:"Est-ce que je peux retirer la longe maintenant ?",
        en:"Can I take the lead rope off now?",
        es:"¿Puedo quitar la cuerda ahora?",
        it:"Posso togliere la corda adesso?",
        de:"Kann ich den Führstrick jetzt abnehmen?",
        ja:"もう 引き綱 を 外して も いい です か ?" },

      { ref:"dt2-r-espace-clos", temps:4, dit:"club", mots:["travail-liberte"],
        fr:"Oui, mais commence dans un espace clos et sécurisé.",
        en:"Yes, but start in a safe, enclosed area.",
        es:"Sí, pero empieza en un espacio cerrado y seguro.",
        it:"Sì, ma comincia in uno spazio chiuso e sicuro.",
        de:"Ja, aber fang in einem geschlossenen, sicheren Bereich an.",
        ja:"はい 。 ただし 囲われた 安全な 場所 から 始めて ください 。" },

      { ref:"dt2-revenir-vers-moi", temps:4, dit:"joueuse", mots:["rappeler-cheval"],
        fr:"Comment est-ce que je lui demande de revenir vers moi ?",
        en:"How do I ask him to come back to me?",
        es:"¿Cómo le pido que vuelva hacia mí?",
        it:"Come gli chiedo di tornare da me?",
        de:"Wie bitte ich ihn, zu mir zurückzukommen?",
        ja:"どう やって 自分 の ところ に 戻る よう 頼み ます か ?" },

      { ref:"dt2-r-voix-corps", temps:4, dit:"club", mots:["voix","langage-corps","recompenser"],
        fr:"Utilise ta voix et ton langage du corps, puis récompense-le lorsqu'il revient.",
        en:"Use your voice and body language, then reward him when he comes back.",
        es:"Usa tu voz y tu lenguaje corporal, y recompénsalo cuando vuelva.",
        it:"Usa la voce e il linguaggio del corpo, poi ricompensalo quando torna.",
        de:"Benutze deine Stimme und deine Körpersprache und belohne ihn, wenn er zurückkommt.",
        ja:"声 と ボディランゲージ を 使い 、 戻って きたら 褒めて あげて ください 。" },

      { ref:"dt2-arrete-voix-seule", temps:4, dit:"joueuse", mots:["ordre-vocal","voix"],
        fr:"Est-ce qu'il s'arrête uniquement à la voix ?",
        en:"Does he stop from a voice cue alone?",
        es:"¿Se para solo con la voz?",
        it:"Si ferma solo con la voce?",
        de:"Hält er allein auf ein Stimmkommando an?",
        ja:"声 の 合図 だけ で 止まり ます か ?" },

      { ref:"dt2-r-progressivement-discret", temps:4, dit:"club", mots:["ordre-vocal","connexion"],
        fr:"Essaie d'abord avec les aides qu'il connaît, puis rends-les progressivement plus discrètes.",
        en:"Start with the cues he already knows, then gradually make them more subtle.",
        es:"Empieza con las señales que ya conoce y hazlas cada vez más discretas.",
        it:"Comincia con i comandi che già conosce, poi rendili via via più discreti.",
        de:"Fang mit den Zeichen an, die er schon kennt, und mach sie nach und nach feiner.",
        ja:"まず 馬 が 知って いる 合図 で 試し 、 少しずつ 小さく して いき ましょう 。" },

      /* ---- temps 5 · le jeune cheval (extension, jamais le sujet) ---- */
      { ref:"dt2-jamais-monte", temps:5, dit:"joueuse", mots:[], motsAilleurs:["debourrage"],
        fr:"Il n'a jamais été monté ?",
        en:"Has he never been ridden?",
        es:"¿Nunca lo han montado?",
        it:"Non è mai stato montato?",
        de:"Ist er noch nie geritten worden?",
        ja:"一度 も 乗られた こと が ない の です か ?" },

      { ref:"dt2-r-debourrage-sol", temps:5, dit:"club", mots:["travail-pied"], motsAilleurs:["debourrage"],
        fr:"Non, on commence son débourrage progressivement depuis le sol.",
        en:"No, we're starting him gradually from the ground.",
        es:"No, lo estamos empezando poco a poco desde el suelo.",
        it:"No, lo stiamo iniziando gradualmente da terra.",
        de:"Nein, wir beginnen ihn nach und nach vom Boden aus.",
        ja:"はい 。 地上 から 少しずつ 馴致 を 始めて いる ところ です 。" },

      { ref:"dt2-r-reeduque", temps:5, dit:"club", mots:["reeduquer"],
        fr:"Celui-là, au contraire, a déjà couru en concours : on le rééduque autrement.",
        en:"That one, on the other hand, has already competed: we are retraining him differently.",
        es:"Aquel, en cambio, ya ha competido: lo estamos reeducando de otra manera.",
        it:"Quello invece ha già gareggiato: lo stiamo rieducando in un altro modo.",
        de:"Der da hingegen ist schon Turniere gegangen: Wir schulen ihn anders um.",
        ja:"あの 馬 は 逆 に 、 すでに 競技 に 出て い ました 。 今 は 別 の やり方 で 再調教 して い ます 。" },

      /* ---- temps 6 · monter à cru ---- */
      { ref:"dt2-essayer-cru", temps:6, dit:"joueuse", mots:["monter-a-cru"],
        fr:"Je voudrais essayer de monter à cru.",
        en:"I'd like to try riding bareback.",
        es:"Me gustaría probar a montar a pelo.",
        it:"Vorrei provare a montare a pelo.",
        de:"Ich würde gern ohne Sattel reiten.",
        ja:"裸馬 に 乗って みたい です 。" },

      { ref:"dt2-r-assiette-compte", temps:6, dit:"club", mots:["equilibre","monter-a-cru"],
        fr:"Sans selle, ton équilibre et ton assiette deviennent encore plus importants.",
        en:"Without a saddle, your balance and seat become even more important.",
        es:"Sin silla, tu equilibrio y tu asiento son aún más importantes.",
        it:"Senza sella, il tuo equilibrio e il tuo assetto contano ancora di più.",
        de:"Ohne Sattel werden dein Gleichgewicht und dein Sitz noch wichtiger.",
        ja:"鞍 が なけれ ば 、 バランス と 騎座 が いっそう 大事 に なり ます 。" },

      /* ---- temps 7 · la corde d'encolure ---- */
      { ref:"dt2-corde-a-quoi", temps:7, dit:"joueuse", mots:["corde-encolure"],
        fr:"À quoi sert la corde autour de son encolure ?",
        en:"What is the rope around his neck for?",
        es:"¿Para qué sirve la cuerda alrededor de su cuello?",
        it:"A cosa serve la corda intorno al collo?",
        de:"Wofür ist das Seil um seinen Hals?",
        ja:"首 に 巻いて ある ロープ は 何 の ため です か ?" },

      { ref:"dt2-r-corde-aide", temps:7, dit:"club", mots:["corde-encolure","sans-filet"],
        fr:"La corde d'encolure peut servir d'aide pour tourner et s'arrêter sans utiliser les rênes du filet.",
        en:"The neck rope can be used as an aid for turning and stopping without using bridle reins.",
        es:"La cuerda al cuello puede servir de ayuda para girar y parar sin usar las riendas.",
        it:"La corda al collo può servire da aiuto per girare e fermarsi senza usare le redini.",
        de:"Das Halsseil kann als Hilfe zum Wenden und Anhalten dienen, ohne die Zügel zu benutzen.",
        ja:"ネックロープ は 、 手綱 を 使わ ず に 曲がる ・ 止まる ため の 扶助 と して 使え ます 。" },

      { ref:"dt2-juste-corde", temps:7, dit:"joueuse", mots:["corde-encolure"],
        fr:"Je peux essayer avec seulement la corde d'encolure ?",
        en:"Can I try with just the neck rope?",
        es:"¿Puedo probar solo con la cuerda al cuello?",
        it:"Posso provare solo con la corda al collo?",
        de:"Kann ich es nur mit dem Halsseil versuchen?",
        ja:"ネックロープ だけ で 試して も いい です か ?" },

      /* ---- temps 8 · sans filet ---- */
      { ref:"dt2-tourner-sans-filet", temps:8, dit:"joueuse", mots:["sans-filet"],
        fr:"Comment est-ce que je tourne sans filet ?",
        en:"How do I turn without a bridle?",
        es:"¿Cómo giro sin brida?",
        it:"Come giro senza briglia?",
        de:"Wie wende ich ohne Zaum?",
        ja:"頭絡 なし で どう やって 曲がり ます か ?" },

      { ref:"dt2-r-regard-poids", temps:8, dit:"club", mots:["poids-corps","ordre-vocal"],
        fr:"Prépare la direction avec ton regard, ton poids du corps et les aides qu'il connaît déjà.",
        en:"Prepare the turn with your eyes, body weight and the cues he already knows.",
        es:"Prepara el giro con la mirada, el peso del cuerpo y las señales que ya conoce.",
        it:"Prepara la direzione con lo sguardo, il peso del corpo e i comandi che già conosce.",
        de:"Bereite die Wendung mit dem Blick, dem Körpergewicht und den Zeichen vor, die er schon kennt.",
        ja:"視線 と 体重 、 そして 馬 が すでに 知って いる 合図 で 方向 を 準備 し ます 。" },

      { ref:"dt2-r-pas-pour-voir", temps:8, dit:"club", mots:["sans-filet"],
        fr:"Ne retire pas le filet simplement pour voir ce qui se passe.",
        en:"Don't take the bridle off just to see what happens.",
        es:"No quites la brida solo para ver qué pasa.",
        it:"Non togliere la briglia solo per vedere cosa succede.",
        de:"Nimm den Zaum nicht ab, nur um zu sehen, was passiert.",
        ja:"何 が 起こる か 見る ため だけ に 頭絡 を 外して は いけ ませ ん 。" },

      /* ---- temps 9 · le Free Riding, l'aboutissement ---- */
      { ref:"dt2-vraiment-connecte", temps:9, dit:"joueuse", mots:["connexion","confiance"],
        fr:"Comment savoir s'il est vraiment connecté avec moi ?",
        en:"How do I know if he's really connected with me?",
        es:"¿Cómo sé si está realmente conectado conmigo?",
        it:"Come faccio a sapere se è davvero connesso con me?",
        de:"Woran erkenne ich, ob er wirklich mit mir verbunden ist?",
        ja:"本当に 自分 と つながって いる か 、 どう やって 分かり ます か ?" },

      { ref:"dt2-r-aides-discretes", temps:9, dit:"club", mots:["connexion","ordre-vocal"],
        fr:"Il reste attentif à tes demandes même lorsque tu utilises des aides de plus en plus discrètes.",
        en:"He stays attentive to your cues even when you use increasingly subtle aids.",
        es:"Sigue atento a tus señales incluso cuando usas ayudas cada vez más discretas.",
        it:"Resta attento alle tue richieste anche quando usi aiuti sempre più discreti.",
        de:"Er bleibt auf deine Zeichen aufmerksam, auch wenn deine Hilfen immer feiner werden.",
        ja:"扶助 を どんどん 小さく して も 、 あなた の 求め に 注意 を 向け 続け ます 。" },

      { ref:"dt2-saute-vraiment", temps:9, dit:"joueuse", mots:["monter-a-cru","sans-filet"],
        fr:"Elle saute vraiment sans selle et sans filet ?",
        en:"Does she really jump without a saddle or bridle?",
        es:"¿De verdad salta sin silla y sin brida?",
        it:"Salta davvero senza sella e senza briglia?",
        de:"Springt sie wirklich ohne Sattel und ohne Zaum?",
        ja:"本当に 鞍 も 頭絡 も なし で 飛越 する の です か ?" },

      { ref:"dt2-r-enormement-prepa", temps:9, dit:"club", mots:["monte-liberte","equilibre"],
        fr:"Oui, mais ce niveau de Free Riding demande énormément de préparation, d'équilibre et d'entraînement.",
        en:"Yes, but that level of free riding requires a huge amount of preparation, balance and training.",
        es:"Sí, pero ese nivel de free riding exige muchísima preparación, equilibrio y entrenamiento.",
        it:"Sì, ma quel livello di free riding richiede moltissima preparazione, equilibrio e allenamento.",
        de:"Ja, aber dieses Niveau des freien Reitens verlangt enorm viel Vorbereitung, Gleichgewicht und Training.",
        ja:"はい 。 ただし その レベル の フリーライディング に は 、 途方 も ない 準備 と バランス と 訓練 が 必要 です 。" }

    ]
  }
};
