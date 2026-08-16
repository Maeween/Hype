/* hype-lingo-lex-enseignant.js — Hype Linguae · « L'enseignant »
   ==================================================================
   40 CONCEPTS, QUATRE LEÇONS. Ville : SAUMUR. Souvenir : un lampion
   du Cadre Noir (inchangé).

   🟥 POURQUOI CE CHAPITRE EXISTE — 16 août 2026, session 214.
   `hype-lingo-lex-cours.js` annonçait DEUX rôles depuis le 6 août :
   « côté ÉLÈVE — reconnaître au vol » et « côté ENSEIGNANT — produire
   la phrase, exercice vocal (Premium) ». Le second n'avait AUCUNE
   ville. Aberystwyth porte l'élève ; celui-ci porte l'enseignant.

   🟥 POURQUOI IL N'APPARTIENT À AUCUNE DISCIPLINE. Blandine, 16/08 :
   « après le problème c'est qu'on enseigne aussi en saut ». Un chapitre
   d'enseignement logé dans le dressage serait du dressage. On enseigne
   en manège, en carrière, en balade, à un enfant sur un poney.
   ⚠️ NE PAS y introduire de vocabulaire de discipline : ni obstacle, ni
   figure de dressage, ni allure. Les allures sont à Aberystwyth
   (`cours`), les figures à Windsor (`dressage`). Ce chapitre porte ce
   qui sert PARTOUT : la voix, la correction, la sécurité, l'élève.

   🟥 POURQUOI SAUMUR. Le Cadre noir est l'école des enseignants
   français — l'ENE forme les moniteurs, et l'écuyer est un professeur
   avant d'être un artiste. Blandine avait vu juste dès le début
   (« en vrai Saumur aurait été top ») avant de croire la ville prise.
   Elle ne l'était pas : Saumur n'avait pas de fichier, seulement la
   leçon 3 de `dressage`, empruntée — laquelle est partie à VERSAILLES
   le même jour. Saumur était donc VIDE en attendant ce fichier.

   ⚠️ ON ENSEIGNE DANS LA LANGUE ÉTRANGÈRE. Confirmé par elle : « ben
   oui là c'est le chapitre pour l'enseignant ». C'est le chapitre le
   plus exigeant de l'app — produire « talons bas, regardez devant
   vous » en allemand est bien plus dur que tout le reste. D'où le
   niveau 3, la technicité 5, et le rôle vocal Premium.

   🟥 LE TUTOIEMENT, décision de Blandine, 16/08.
   Tutoiement par défaut en fr / es / it / de — on enseigne surtout à
   des enfants et à des adolescents. L'anglais ne fait pas la
   différence. Le pluriel s'impose de lui-même quand on parle au groupe
   entier (« au pas tout le monde »).
   🟥 SAUF EN JAPONAIS — sa question, et elle était juste : le japonais
   n'a pas de tutoiement, la politesse passe par la FORME DU VERBE. Un
   moniteur japonais emploie le style poli 〜てください même avec des
   enfants ; le style direct passerait pour brutal. Le chapitre Tokyo
   le dit déjà : « un mot mal placé n'est pas une faute de vocabulaire,
   c'est une impolitesse ».
   ⚠️ DEUX EXCEPTIONS, où le japonais passe au style DIRECT parce que la
   sécurité prime sur la politesse : `arrete-toi` (止まって) et
   `descends` (降りて). Dans l'urgence, personne ne dit « veuillez ».
   NE PAS « uniformiser » ces deux-là en 〜てください.

   ⚠️ BEAUCOUP D'ENTRÉES SONT DES PHRASES, pas des mots. C'est le propre
   de l'enseignement : on ne nomme pas des objets, on dit des ordres.
   Le champ `dit` porte l'ordre tel qu'il se crie réellement.
   Ce chapitre ressemble à `cours`, pas à `materiel`.

   ⚠️ RELECTURE NATIVE INDISPENSABLE. Un encouragement mal formulé
   sonne condescendant, et une consigne de sécurité mal formulée ne se
   comprend pas assez vite. Les entrées marquées `// ??` sont celles
   dont Claude est le moins sûr.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.enseignant = {
  ref: "enseignant",
  chapitre: 23,
  titre: { fr:"L'enseignant", en:"Teaching", es:"Enseñar", it:"Insegnare", de:"Unterrichten", ja:"指導する" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LA VOIX ET LA CONSIGNE ============ */

  { ref:"donner-consigne", lecon:1, coll:"voix",
    mots:{ fr:{m:"donner une consigne", dit:"Écoutez bien !"},
           en:{m:"to give an instruction", p:"inn-streuk-cheune", dit:"Listen up !"},
           es:{m:"dar una consigna", dit:"¡ Escuchad bien !"},
           it:{m:"dare una consegna", dit:"Ascoltate bene !"},
           de:{m:"eine Anweisung geben", p:"ann-vaï-zoung", dit:"Gut zuhören !"},
           ja:{m:"指示を出す", p:"shiji o dasu", dit:"よく 聞い て ください !"} },
    def:{ fr:"⚠️ Une consigne se donne AVANT le mouvement, jamais pendant. On annonce, on laisse le temps de comprendre, puis on commande. C'est la première chose qu'on apprend en enseignant : le silence entre l'annonce et l'ordre.",
          en:"An instruction comes BEFORE the movement, never during. Announce it, leave time to understand, then command. The silence between the two is what makes it work.",
          es:"Una consigna se da ANTES del movimiento, nunca durante. Se anuncia, se deja tiempo para entender, y luego se ordena.",
          it:"Una consegna si dà PRIMA del movimento, mai durante. Si annuncia, si lascia il tempo di capire, poi si comanda.",
          de:"Eine Anweisung kommt VOR der Bewegung, nie währenddessen. Ankündigen, Zeit zum Verstehen lassen, dann kommandieren.",
          ja:"指示は動作の前に出します。動作中は出しません。予告し、理解する時間を置き、それから号令をかけます。" } },

  { ref:"repeter", lecon:1, coll:"voix",
    mots:{ fr:{m:"répéter", dit:"Je répète !"},
           en:{m:"to repeat", p:"ri-piite", dit:"I'll say it again !"},
           es:{m:"repetir", dit:"¡ Repito !"},
           it:{m:"ripetere", dit:"Ripeto !"},
           de:{m:"wiederholen", p:"vii-deur-hô-leune", dit:"Ich wiederhole !"},
           ja:{m:"繰り返す", p:"kurikaesu", dit:"もう一度 言い ます !"} },
    def:{ fr:"On répète à l'identique, avec les mêmes mots. Reformuler autrement, c'est donner une nouvelle consigne à quelqu'un qui n'a pas compris la première.",
          en:"Repeat word for word. Rephrasing means giving a new instruction to someone who hasn't understood the first.",
          es:"Se repite igual, con las mismas palabras. Reformular es dar una consigna nueva a quien no ha entendido la primera.",
          it:"Si ripete uguale, con le stesse parole. Riformulare significa dare una consegna nuova a chi non ha capito la prima.",
          de:"Wortwörtlich wiederholen. Umformulieren heißt, jemandem eine neue Anweisung zu geben, der die erste nicht verstanden hat.",
          ja:"同じ言葉でそのまま繰り返します。言い換えると、最初の指示を理解できなかった人に新しい指示を出すことになります。" } },

  { ref:"plus-fort", lecon:1, coll:"voix",
    mots:{ fr:{m:"plus fort", dit:"Plus fort, je n'entends pas !"},
           en:{m:"louder", p:"laou-deur", dit:"Louder, I can't hear you !"},
           es:{m:"más alto", dit:"¡ Más alto, no te oigo !"},
           it:{m:"più forte", dit:"Più forte, non ti sento !"},
           de:{m:"lauter", p:"laou-teur", dit:"Lauter, ich höre dich nicht !"},
           ja:{m:"もっと大きな声で", p:"motto ōkina koe de", dit:"もっと 大きな 声 で お願い し ます !"} },
    def:{ fr:"Un manège avale les voix : le sable, le vent, les sabots. Un enseignant parle depuis le centre et doit porter jusqu'à la piste — sans crier, ce qui inquiète les chevaux.",
          en:"An arena swallows voices — sand, wind, hooves. You teach from the middle and must carry to the track, without shouting: shouting worries the horses.",
          es:"Un picadero se traga las voces: la arena, el viento, los cascos. Se enseña desde el centro y hay que llegar a la pista, sin gritar — gritar inquieta a los caballos.",
          it:"Un maneggio ingoia le voci: la sabbia, il vento, gli zoccoli. Si insegna dal centro e bisogna arrivare in pista, senza urlare — urlare inquieta i cavalli.",
          de:"Eine Reithalle schluckt Stimmen: Sand, Wind, Hufe. Man unterrichtet aus der Mitte und muss bis zum Hufschlag tragen, ohne zu schreien — Schreien beunruhigt die Pferde.",
          ja:"馬場は声を吸い込みます。砂、風、蹄の音。中央から蹄跡まで届かせる必要がありますが、怒鳴ってはいけません。馬が不安になります。" } },

  { ref:"a-ma-voix", lecon:1, coll:"voix",
    mots:{ fr:{m:"à ma voix", dit:"À ma voix !"},
           en:{m:"on my call", p:"on maï kol", dit:"On my call !"},
           es:{m:"a mi voz", dit:"¡ A mi voz !"},
           it:{m:"alla mia voce", dit:"Alla mia voce !"},
           de:{m:"auf mein Kommando", p:"aouf maïn ko-mann-dô", dit:"Auf mein Kommando !"},
           ja:{m:"私の合図で", p:"watashi no aizu de", dit:"私 の 合図 で お願い し ます !"} },
    def:{ fr:"Prévient que l'ordre va venir : le groupe se prépare et part ensemble. Sans ça, chacun démarre quand il croit avoir compris, et la reprise se disloque.",
          en:"Warns that the order is coming: the group gets ready and moves together. Without it, everyone starts when they think they've understood, and the ride falls apart.",
          es:"Avisa de que la orden va a llegar: el grupo se prepara y sale junto. Sin eso, cada uno arranca cuando cree haber entendido.",
          it:"Avverte che l'ordine sta per arrivare: il gruppo si prepara e parte insieme. Senza, ognuno parte quando crede di aver capito.",
          de:"Kündigt an, dass das Kommando kommt: die Gruppe macht sich bereit und geht gemeinsam los. Sonst startet jeder, wann er meint verstanden zu haben.",
          ja:"号令が来ることを予告します。全員が準備し、一緒に動き出せます。これがないと、各自が理解したと思った時に動き出してしまいます。" } },

  { ref:"au-commandement", lecon:1, coll:"voix",
    mots:{ fr:{m:"au commandement", dit:"Au commandement : trois, deux, un !"},
           en:{m:"on the command", p:"ke-mannd", dit:"On the command : three, two, one !"},
           es:{m:"a la orden", dit:"¡ A la orden : tres, dos, uno !"},
           it:{m:"al comando", dit:"Al comando : tre, due, uno !"},
           de:{m:"auf Kommando", p:"aouf ko-mann-dô", dit:"Auf Kommando : drei, zwei, eins !"},
           ja:{m:"号令で", p:"gōrei de", dit:"号令 で。 三、 二、 一 !"} },
    def:{ fr:"Le décompte est ce qui synchronise vraiment un groupe. Les chevaux l'apprennent aussi vite que les cavaliers : dans un club, beaucoup partent au « un » sans qu'on leur demande.",
          en:"The countdown is what really synchronises a group. Horses learn it as fast as riders: in a club, many set off on « one » without being asked.",
          es:"La cuenta atrás es lo que sincroniza de verdad a un grupo. Los caballos la aprenden tan rápido como los jinetes.",
          it:"Il conto alla rovescia è ciò che sincronizza davvero un gruppo. I cavalli lo imparano in fretta quanto i cavalieri.",
          de:"Der Countdown synchronisiert eine Gruppe wirklich. Pferde lernen ihn so schnell wie die Reiter.",
          ja:"カウントダウンが実際に集団を揃えます。馬は騎手と同じ速さでこれを覚え、「一」で自分から出る馬も多くいます。" } },

  { ref:"echauffement", lecon:1, coll:"voix",
    mots:{ fr:{m:"l'échauffement", dit:"On s'échauffe dix minutes."},
           en:{m:"the warm-up", p:"ouorm-eup", dit:"Ten minutes to warm up."},
           es:{m:"el calentamiento", dit:"Calentamos diez minutos."},
           it:{m:"il riscaldamento", dit:"Riscaldiamo dieci minuti."},
           de:{m:"das Aufwärmen", p:"aouf-vèr-meune", dit:"Zehn Minuten warm reiten."},
           ja:{m:"ウォーミングアップ", p:"wōmingu appu", dit:"十分 ほど ウォーミング アップ し ます。"} },
    def:{ fr:"⚠️ En anglais on dit aussi **to warm up** pour le cheval seul, mais l'expression consacrée en club est **the warm-up**. Ne pas confondre avec `paddock-detente` (le paddock d'un concours), qui est un LIEU.",
          en:"Careful: « the warm-up » is the phase, while the collecting ring at a show is a place. Same French word « détente », two different things.",
          es:"Ojo: el calentamiento es la fase; el paddock de un concurso es un lugar. En francés la misma palabra sirve para las dos.",
          it:"Attenzione: il riscaldamento è la fase; il campo prova di una gara è un luogo. In francese la stessa parola vale per entrambi.",
          de:"Achtung: das Aufwärmen ist die Phase, der Abreiteplatz eines Turniers ein Ort. Im Französischen dasselbe Wort für beides.",
          ja:"注意：ウォーミングアップは「時間帯」、競技会の下見場は「場所」です。フランス語では同じ語を使います。" } },

  { ref:"la-reprise-groupe", lecon:1, coll:"voix",
    mots:{ fr:{m:"la reprise", dit:"Toute la reprise, au pas !"},
           en:{m:"the ride", p:"raïde", dit:"Whole ride, walk on !"},
           es:{m:"el grupo", dit:"¡ Todo el grupo, al paso !"},
           it:{m:"la ripresa", dit:"Tutta la ripresa, al passo !"},
           de:{m:"die Abteilung", p:"app-taï-loung", dit:"Ganze Abteilung, Schritt !"},
           ja:{m:"クラス全体", p:"kurasu zentai", dit:"全員、 常歩 !"} },
    def:{ fr:"🟥 LE FAUX AMI LE PLUS UTILE DU MODULE, et il traverse trois villes : « la reprise » = LE GROUPE d'élèves (*the ride*) à Aberystwyth et ici, mais = LE TEST de dressage (*the test*) à Windsor. Même mot français, deux mots anglais.",
          en:"« The ride » means the group of pupils. The dressage test is « the test ». French uses one word for both — the single most useful false friend in this app.",
          es:"« La reprise » francesa designa el grupo de alumnos y también la prueba de doma. En español: el grupo, o la prueba.",
          it:"« La reprise » francese indica sia il gruppo di allievi sia la ripresa di dressage. Due cose diverse.",
          de:"Das französische « reprise » meint sowohl die Abteilung als auch die Dressuraufgabe. Zwei verschiedene Dinge.",
          ja:"フランス語の « reprise » は「クラス（生徒の集団）」と「馬場馬術の課目」の両方を指します。英語では ride と test に分かれます。" } },

  { ref:"en-piste", lecon:1, coll:"voix",
    mots:{ fr:{m:"en piste", dit:"En piste !"},
           en:{m:"onto the track", p:"trak", dit:"Onto the track !"},
           es:{m:"a la pista", dit:"¡ A la pista !"},
           it:{m:"in pista", dit:"In pista !"},
           de:{m:"auf den Hufschlag", p:"houf-chlak", dit:"Auf den Hufschlag !"},
           ja:{m:"蹄跡へ", p:"teiseki e", dit:"蹄跡 に 入っ て ください !"} },
    def:{ fr:"⚠️ L'allemand dit **Hufschlag**, littéralement « la trace des sabots » — le chemin usé le long du mur. C'est la même chose que « la piste », mais l'image est plus concrète.",
          en:"The track is the worn path along the wall. German says « Hufschlag », the hoof-print line.",
          es:"La pista es el camino gastado a lo largo del muro.",
          it:"La pista è il sentiero consumato lungo il muro.",
          de:"Der Hufschlag ist die ausgetretene Spur entlang der Bande — das Bild ist konkreter als das französische « piste ».",
          ja:"蹄跡は壁沿いにできた馬の通り道です。ドイツ語の Hufschlag は「蹄の跡」という意味です。" } },

  { ref:"rassembler-groupe", lecon:1, coll:"voix",
    mots:{ fr:{m:"rassembler le groupe", dit:"Tout le monde au centre !"},
           en:{m:"to gather the group", p:"ga-zeur", dit:"Everyone into the middle !"},
           es:{m:"reunir al grupo", dit:"¡ Todos al centro !"},
           it:{m:"radunare il gruppo", dit:"Tutti al centro !"},
           de:{m:"die Gruppe sammeln", p:"za-meulne", dit:"Alle in die Mitte !"},
           ja:{m:"集合させる", p:"shūgō saseru", dit:"全員、 中央 に 集まっ て ください !"} },
    def:{ fr:"⚠️ NE PAS confondre avec `rassembler` le cheval (Versailles), qui est une notion de dressage. Ici c'est le groupe qu'on rassemble, pas le cheval. Deux mots français identiques, deux sens sans rapport.",
          en:"Careful: « rassembler » also means collection in dressage. Here it's the group you gather, not the horse.",
          es:"Ojo: « rassembler » significa también la reunión en doma. Aquí se reúne al grupo, no al caballo.",
          it:"Attenzione: « rassembler » indica anche il raccogliere in dressage. Qui si raduna il gruppo, non il cavallo.",
          de:"Achtung: « rassembler » heißt auch Versammlung in der Dressur. Hier sammelt man die Gruppe, nicht das Pferd.",
          ja:"注意：フランス語の rassembler は馬場馬術の「収縮」も意味します。ここでは馬ではなく生徒を集めることです。" } },

  { ref:"dire-ce-quon-va-faire", lecon:1, coll:"voix",
    mots:{ fr:{m:"annoncer l'exercice", dit:"On va travailler les transitions."},
           en:{m:"to announce the exercise", p:"e-naounss", dit:"We're going to work on transitions."},
           es:{m:"anunciar el ejercicio", dit:"Vamos a trabajar las transiciones."},
           it:{m:"annunciare l'esercizio", dit:"Lavoriamo sulle transizioni."},
           de:{m:"die Übung ankündigen", p:"ann-kunn-di-gueune", dit:"Wir arbeiten an den Übergängen."},
           ja:{m:"課題を伝える", p:"kadai o tsutaeru", dit:"今日 は 移行 を 練習 し ます。"} },
    def:{ fr:"Dire ce qu'on va faire et POURQUOI change tout : un élève qui sait où il va corrige de lui-même. C'est la différence entre commander et enseigner.",
          en:"Saying what you're going to do and WHY changes everything: a pupil who knows where they're heading corrects themselves. That's the difference between commanding and teaching.",
          es:"Decir qué se va a hacer y POR QUÉ lo cambia todo: un alumno que sabe adónde va se corrige solo.",
          it:"Dire che cosa si farà e PERCHÉ cambia tutto: un allievo che sa dove va si corregge da solo.",
          de:"Zu sagen, was kommt und WARUM, ändert alles: ein Schüler, der weiß, wohin es geht, korrigiert sich selbst.",
          ja:"何をするか、そしてなぜするかを伝えると全く違います。目的を知っている生徒は自分で修正します。" } },

  /* ============ LEÇON 2 · CORRIGER SANS CASSER ============ */

  { ref:"la-correction", lecon:2, coll:"corriger",
    mots:{ fr:{m:"la correction", dit:"Une seule chose à la fois."},
           en:{m:"the correction", p:"ke-rek-cheune", dit:"One thing at a time."},
           es:{m:"la corrección", dit:"Una sola cosa a la vez."},
           it:{m:"la correzione", dit:"Una cosa alla volta."},
           de:{m:"die Korrektur", p:"ko-rek-tour", dit:"Eine Sache nach der anderen."},
           ja:{m:"修正", p:"shūsei", dit:"一度 に 一つ ずつ です。"} },
    def:{ fr:"🟥 UNE SEULE CORRECTION À LA FOIS. Un cavalier à qui l'on dit « talons bas, mains basses, regarde devant, assieds-toi » n'en applique aucune. On choisit la plus importante et on attend qu'elle tienne.",
          en:"One correction at a time. A rider told « heels down, hands down, look up, sit up » applies none of them. Choose the most important and wait for it to hold.",
          es:"Una sola corrección a la vez. Un jinete al que se le dice todo a la vez no aplica nada.",
          it:"Una sola correzione alla volta. Un cavaliere a cui si dice tutto insieme non applica niente.",
          de:"Eine Korrektur nach der anderen. Wer alles gleichzeitig hört, setzt nichts davon um.",
          ja:"修正は一度に一つだけ。「かかとを下げて、手を下げて、前を見て、座って」と言われた騎手は、どれも実行できません。" } },

  { ref:"reprendre", lecon:2, coll:"corriger",
    mots:{ fr:{m:"reprendre", dit:"On reprend depuis le début."},
           en:{m:"to go back over", p:"gô bak ô-veur", dit:"Let's take it from the top."},
           es:{m:"retomar", dit:"Retomamos desde el principio."},
           it:{m:"riprendere", dit:"Riprendiamo dall'inizio."},
           de:{m:"noch einmal beginnen", p:"noch aïn-mal", dit:"Wir fangen noch mal von vorne an."},
           ja:{m:"やり直す", p:"yarinaosu", dit:"最初 から やり直し ましょう。"} },
    def:{ fr:"⚠️ En anglais **from the top** est l'expression courante, empruntée au théâtre et à la musique. « From the beginning » se comprend mais sonne scolaire.",
          en:"« From the top » is the natural phrase, borrowed from theatre and music. « From the beginning » is understood but sounds like a textbook.",
          es:"« Desde el principio » es la forma natural en español.",
          it:"« Dall'inizio » è la forma naturale in italiano.",
          de:"« Von vorne » ist die natürliche Wendung im Deutschen.",
          ja:"「最初から」が自然な言い方です。" } },

  { ref:"cest-mieux", lecon:2, coll:"corriger",
    mots:{ fr:{m:"c'est mieux", dit:"Là, c'est mieux !"},
           en:{m:"that's better", p:"bè-teur", dit:"That's better !"},
           es:{m:"así está mejor", dit:"¡ Así está mejor !"},
           it:{m:"così va meglio", dit:"Così va meglio !"},
           de:{m:"das ist besser", p:"bè-sseur", dit:"Das ist besser !"},
           ja:{m:"良くなった", p:"yoku natta", dit:"はい、 良く なり まし た !"} },
    def:{ fr:"🟥 SE DIT AU MOMENT EXACT où c'est mieux, pas après. Un cavalier ne sait pas ce qu'il vient de faire de bien tant qu'on ne le lui dit pas pendant qu'il le fait. C'est la seule façon d'apprendre une sensation.",
          en:"Say it AT THE MOMENT it's better, not afterwards. A rider doesn't know what they just did right until you tell them while they're doing it. It's the only way to teach a feel.",
          es:"Se dice EN EL MOMENTO exacto, no después. Es la única manera de enseñar una sensación.",
          it:"Si dice NEL MOMENTO esatto, non dopo. È l'unico modo di insegnare una sensazione.",
          de:"Genau IN DEM MOMENT sagen, nicht danach. Nur so lernt man ein Gefühl.",
          ja:"良くなった「その瞬間」に言います。あとからでは遅い。感覚を教える唯一の方法です。" } },

  { ref:"presque", lecon:2, coll:"corriger",
    mots:{ fr:{m:"tu y es presque", dit:"Tu y es presque !"},
           en:{m:"almost there", p:"ol-môst zèr", dit:"Almost there !"},
           es:{m:"casi lo tienes", dit:"¡ Casi lo tienes !"},
           it:{m:"ci sei quasi", dit:"Ci sei quasi !"},
           de:{m:"fast geschafft", p:"fasst gué-chafft", dit:"Fast geschafft !"},
           ja:{m:"もう少し", p:"mō sukoshi", dit:"もう少し です !"} },
    def:{ fr:"Dit qu'on est sur la bonne voie sans dire que c'est réussi. C'est ce qui empêche d'abandonner à l'essai suivant.",
          en:"Says you're on the right track without saying you've got it. It's what stops someone giving up on the next attempt.",
          es:"Dice que vas por buen camino sin decir que ya está. Es lo que evita que se abandone al siguiente intento.",
          it:"Dice che sei sulla strada giusta senza dire che è fatta. È ciò che impedisce di arrendersi al tentativo dopo.",
          de:"Sagt, dass man auf dem richtigen Weg ist, ohne zu sagen, dass es geschafft ist.",
          ja:"正しい方向に進んでいることを伝えつつ、まだ完成していないことも示します。次の一回で諦めさせないための言葉です。" } },

  { ref:"recommence", lecon:2, coll:"corriger",
    mots:{ fr:{m:"recommence", dit:"Recommence, tranquillement."},
           en:{m:"try again", p:"traï e-guène", dit:"Try that again, quietly."},
           es:{m:"vuelve a intentarlo", dit:"Vuelve a intentarlo, con calma."},
           it:{m:"riprova", dit:"Riprova, con calma."},
           de:{m:"versuch es noch mal", p:"feur-zoure", dit:"Versuch es noch mal, in Ruhe."},
           ja:{m:"もう一度", p:"mō ichido", dit:"落ち着い て、 もう一度。"} },
    def:{ fr:"⚠️ « Recommence » seul sonne comme un reproche. Ajouter « tranquillement », « doucement », « sans te presser » change complètement ce que l'élève entend.",
          en:"« Try again » on its own sounds like a reproach. Adding « quietly », « in your own time » changes entirely what the pupil hears.",
          es:"« Otra vez » a secas suena a reproche. Añadir « con calma » cambia por completo lo que oye el alumno.",
          it:"« Riprova » da solo suona come un rimprovero. Aggiungere « con calma » cambia tutto.",
          de:"« Noch mal » allein klingt wie ein Vorwurf. « In Ruhe » dazu ändert alles.",
          ja:"「もう一度」だけだと叱責に聞こえます。「落ち着いて」を添えるだけで、生徒に届く意味が変わります。" } },

  { ref:"doucement-ens", lecon:2, coll:"corriger",
    mots:{ fr:{m:"doucement", dit:"Doucement, rien ne presse."},
           en:{m:"gently", p:"djènt-li", dit:"Gently — no rush."},
           es:{m:"despacio", dit:"Despacio, no hay prisa."},
           it:{m:"piano", dit:"Piano, non c'è fretta."},
           de:{m:"ruhig", p:"rou-ich", dit:"Ruhig, keine Eile."},
           ja:{m:"ゆっくり", p:"yukkuri", dit:"ゆっくり で 大丈夫 です。"} },
    def:{ fr:"Le mot le plus employé d'un manège, et le plus utile : il calme le cavalier, qui calme le cheval. Un cheval ne comprend pas les mots, mais il entend le ton.",
          en:"The most-used word in an arena, and the most useful: it calms the rider, who calms the horse. A horse doesn't understand words, but it hears tone.",
          es:"La palabra más usada en un picadero, y la más útil: calma al jinete, que calma al caballo.",
          it:"La parola più usata in un maneggio, e la più utile: calma il cavaliere, che calma il cavallo.",
          de:"Das meistgesagte Wort in der Halle, und das nützlichste: es beruhigt den Reiter, der das Pferd beruhigt.",
          ja:"馬場で最もよく使われ、最も役立つ言葉。騎手が落ち着けば馬も落ち着きます。馬は言葉ではなく声の調子を聞いています。" } },

  { ref:"regarde-moi", lecon:2, coll:"corriger",
    mots:{ fr:{m:"regarde-moi", dit:"Regarde-moi une seconde."},
           en:{m:"look at me", p:"louk att mi", dit:"Look at me a second."},
           es:{m:"mírame", dit:"Mírame un segundo."},
           it:{m:"guardami", dit:"Guardami un secondo."},
           de:{m:"schau mich an", p:"chaou mich ann", dit:"Schau mich kurz an."},
           ja:{m:"こちらを見て", p:"kochira o mite", dit:"少し こちら を 見 て ください。"} },
    def:{ fr:"⚠️ Sert à INTERROMPRE une spirale : un élève crispé n'entend plus rien. Le faire lever les yeux le sort de sa fixation sur l'encolure. Mais jamais pendant un mouvement délicat.",
          en:"Used to BREAK a spiral: a tense pupil stops hearing anything. Making them look up breaks their fixation on the horse's neck. Never during a delicate movement.",
          es:"Sirve para ROMPER una espiral: un alumno tenso ya no oye nada. Hacerle levantar la vista lo saca de su fijación.",
          it:"Serve a INTERROMPERE una spirale: un allievo teso non sente più niente. Fargli alzare gli occhi lo libera dalla fissazione.",
          de:"Dient dazu, eine Spirale zu UNTERBRECHEN: ein verkrampfter Schüler hört nichts mehr. Aufschauen lassen löst den starren Blick auf den Hals.",
          ja:"悪循環を断つための言葉。緊張した生徒は何も聞こえなくなります。顔を上げさせると首元への固執から抜け出せます。ただし難しい動作の最中は避けます。" } },

  { ref:"pas-grave", lecon:2, coll:"corriger",
    mots:{ fr:{m:"ce n'est pas grave", dit:"Ce n'est pas grave, ça arrive."},
           en:{m:"never mind", p:"nè-veur maïnd", dit:"Never mind — it happens."},
           es:{m:"no pasa nada", dit:"No pasa nada, ocurre."},
           it:{m:"non è niente", dit:"Non è niente, capita."},
           de:{m:"macht nichts", p:"macht nichts", dit:"Macht nichts, das passiert."},
           ja:{m:"大丈夫", p:"daijōbu", dit:"大丈夫 です。 よく ある こと です。"} },
    def:{ fr:"🟥 À DIRE TOUT DE SUITE après une erreur, avant même de corriger. Le silence qui suit une faute est ce qui fait le plus peur : l'élève croit qu'on est fâché.",
          en:"Say it IMMEDIATELY after a mistake, before correcting anything. The silence after an error is what frightens most: the pupil thinks you're angry.",
          es:"Decirlo INMEDIATAMENTE tras un error, antes de corregir. El silencio después de una falta es lo que más asusta.",
          it:"Dirlo SUBITO dopo un errore, prima di correggere. Il silenzio dopo uno sbaglio è ciò che spaventa di più.",
          de:"SOFORT nach einem Fehler sagen, noch vor jeder Korrektur. Die Stille nach einem Fehler macht am meisten Angst.",
          ja:"失敗の直後、修正よりも先に言います。ミスのあとの沈黙が一番怖い。生徒は怒られていると思ってしまいます。" } },

  { ref:"encore-une-fois", lecon:2, coll:"corriger",
    mots:{ fr:{m:"encore une fois", dit:"Encore une fois et on arrête."},
           en:{m:"one more time", p:"ouann mor taïm", dit:"One more time and we'll stop."},
           es:{m:"una vez más", dit:"Una vez más y lo dejamos."},
           it:{m:"ancora una volta", dit:"Ancora una volta e smettiamo."},
           de:{m:"noch einmal", p:"noch aïn-mal", dit:"Noch einmal, dann hören wir auf."},
           ja:{m:"あと一回", p:"ato ikkai", dit:"あと 一回 やっ たら 終わり に し ましょう。"} },
    def:{ fr:"⚠️ ANNONCER LA FIN change l'effort : on donne tout sur la dernière. Et il faut tenir parole — un enseignant qui dit « encore une fois » trois fois de suite n'est plus cru.",
          en:"Announcing the end changes the effort: everyone gives everything on the last one. And you must keep your word — say « one more time » three times running and nobody believes you again.",
          es:"Anunciar el final cambia el esfuerzo. Y hay que cumplir la palabra: quien dice « una vez más » tres veces seguidas deja de ser creído.",
          it:"Annunciare la fine cambia lo sforzo. E bisogna mantenere la parola: chi dice « ancora una volta » tre volte di fila non è più creduto.",
          de:"Das Ende anzukündigen verändert die Anstrengung. Und man muss Wort halten — wer dreimal « noch einmal » sagt, dem glaubt keiner mehr.",
          ja:"終わりを予告すると、最後の一回に力が出ます。ただし約束は守ること。「あと一回」を三回続けると、もう信じてもらえません。" } },

  { ref:"cest-bien", lecon:2, coll:"corriger",
    mots:{ fr:{m:"c'est bien", dit:"C'est bien, caresse-le."},
           en:{m:"well done", p:"ouèl deune", dit:"Well done — give him a pat."},
           es:{m:"muy bien", dit:"Muy bien, acarícialo."},
           it:{m:"bravo", dit:"Bravo, accarezzalo."},
           de:{m:"gut gemacht", p:"goute gué-macht", dit:"Gut gemacht — klopf ihn ab."},
           ja:{m:"よくできました", p:"yoku dekimashita", dit:"よく でき まし た。 撫で て あげ て ください。"} },
    def:{ fr:"🟥 SUIVI D'UNE CARESSE, toujours. C'est ce qui apprend à l'élève que la récompense va au cheval, pas à lui. Un enseignant qui ne fait jamais caresser forme des cavaliers qui ne remercient pas.",
          en:"Always followed by a pat. It teaches the pupil that the reward goes to the horse, not to them. A teacher who never has them pat their horse trains riders who don't say thank you.",
          es:"Siempre seguido de una caricia. Enseña que la recompensa es para el caballo, no para el jinete.",
          it:"Sempre seguito da una carezza. Insegna che la ricompensa va al cavallo, non all'allievo.",
          de:"Immer mit einem Klopfen verbunden. Es lehrt, dass die Belohnung dem Pferd gilt, nicht dem Reiter.",
          ja:"必ず馬を撫でることとセットにします。褒美は自分ではなく馬に向かうものだと教わります。" } },

  /* ============ LEÇON 3 · LA SÉCURITÉ ============ */

  { ref:"arrete-toi", lecon:3, coll:"securite",
    mots:{ fr:{m:"arrête-toi", dit:"Arrête-toi !"},
           en:{m:"stop", p:"stop", dit:"Whoa — stop !"},
           es:{m:"para", dit:"¡ Para !"},
           it:{m:"fermati", dit:"Fermati !"},
           de:{m:"halt an", p:"halt ann", dit:"Halt !"},
           ja:{m:"止まって", p:"tomatte", dit:"止まっ て !"} },
    def:{ fr:"🟥 EXCEPTION AU STYLE POLI JAPONAIS : ici 止まって, forme directe, sans ください. Dans l'urgence, la politesse coûte une seconde de trop. ⚠️ NE PAS uniformiser. En anglais, **whoa** s'adresse au cheval, **stop** au cavalier — les deux ensemble sont ce qu'on crie vraiment.",
          en:"« Whoa » speaks to the horse, « stop » to the rider. Both together is what's actually shouted.",
          es:"« ¡ So ! » va al caballo, « ¡ para ! » al jinete.",
          it:"« Ferma ! » al cavallo, « fermati ! » al cavaliere.",
          de:"« Brrr » gilt dem Pferd, « halt » dem Reiter.",
          ja:"緊急時のため、ここでは丁寧形を使わず「止まって」と言います。一秒の遅れが危険になるからです。" } },

  { ref:"descends", lecon:3, coll:"securite",
    mots:{ fr:{m:"descends", dit:"Descends, tout de suite."},
           en:{m:"get off", p:"guètt off", dit:"Get off, right now."},
           es:{m:"baja", dit:"Baja, ahora mismo."},
           it:{m:"scendi", dit:"Scendi, subito."},
           de:{m:"steig ab", p:"chtaïk app", dit:"Steig ab, sofort."},
           ja:{m:"降りて", p:"orite", dit:"すぐ に 降り て !"} },
    def:{ fr:"🟥 SECONDE EXCEPTION JAPONAISE : 降りて, forme directe. ⚠️ En anglais **get off**, pas « dismount » : le second est le mot écrit, celui des règlements. On ne crie pas « dismount » à quelqu'un en difficulté.",
          en:"« Get off », not « dismount ». The second is the written word, from the rulebook. Nobody shouts « dismount » at someone in trouble.",
          es:"« Baja », no « desmonta » — el segundo es el término del reglamento.",
          it:"« Scendi », non « smonta » — il secondo è il termine del regolamento.",
          de:"« Steig ab » — kurz und direkt. Kein Regelbuchwort in der Not.",
          ja:"緊急時のため直接形「降りて」を使います。丁寧形では間に合いません。" } },

  { ref:"ecarte-toi", lecon:3, coll:"securite",
    mots:{ fr:{m:"écarte-toi", dit:"Écarte-toi !"},
           en:{m:"move away", p:"mouve e-ouéï", dit:"Move away !"},
           es:{m:"apártate", dit:"¡ Apártate !"},
           it:{m:"spostati", dit:"Spostati !"},
           de:{m:"geh zur Seite", p:"gué tsour zaï-te", dit:"Geh zur Seite !"},
           ja:{m:"離れて", p:"hanarete", dit:"離れ て ください !"} },
    def:{ fr:"Se crie quand un cheval part, se cabre ou rue. ⚠️ Toujours dire **où** aller : « écarte-toi vers l'intérieur », « écarte-toi du mur ». Un ordre sans direction fait hésiter, et l'hésitation dure une seconde de trop.",
          en:"Shouted when a horse bolts, rears or kicks out. Always say WHERE to go — an order without a direction makes people hesitate, and hesitation lasts a second too long.",
          es:"Se grita cuando un caballo se dispara, se encabrita o cocea. Decir siempre HACIA DÓNDE.",
          it:"Si grida quando un cavallo scappa, si impenna o tira calci. Dire sempre DOVE andare.",
          de:"Wird gerufen, wenn ein Pferd durchgeht, steigt oder ausschlägt. Immer sagen, WOHIN.",
          ja:"馬が暴走したり、立ち上がったり、蹴ったりしたときに使います。必ず「どこへ」離れるかを言い添えます。" } },

  { ref:"pas-derriere", lecon:3, coll:"securite",
    mots:{ fr:{m:"ne passe pas derrière", dit:"Ne passe jamais derrière un cheval !"},
           en:{m:"don't walk behind", p:"bi-haïnd", dit:"Never walk behind a horse !"},
           es:{m:"no pases por detrás", dit:"¡ Nunca pases por detrás de un caballo !"},
           it:{m:"non passare dietro", dit:"Non passare mai dietro a un cavallo !"},
           de:{m:"geh nicht hinter", p:"hinn-teur", dit:"Geh nie hinter ein Pferd !"},
           ja:{m:"後ろを通らない", p:"ushiro o tōranai", dit:"馬 の 後ろ を 通ら ない で ください !"} },
    def:{ fr:"🟥 LA RÈGLE DE SÉCURITÉ LA PLUS UNIVERSELLE, et la première qu'un enseignant dit à un débutant, dans tous les pays. Si on doit passer derrière, on passe TOUT PRÈS, une main sur la croupe — jamais à distance de coup de pied.",
          en:"The most universal safety rule, and the first thing any teacher says to a beginner anywhere in the world. If you must pass behind, pass CLOSE, a hand on the quarters — never at kicking distance.",
          es:"La regla de seguridad más universal. Si hay que pasar por detrás, se pasa MUY CERCA, con la mano en la grupa.",
          it:"La regola di sicurezza più universale. Se si deve passare dietro, si passa VICINISSIMI, con la mano sulla groppa.",
          de:"Die universellste Sicherheitsregel. Muss man hinter durch, dann GANZ DICHT, eine Hand auf der Kruppe.",
          ja:"世界共通の最も基本的な安全規則。どうしても後ろを通るときは、体を密着させ、手を尻に置いて通ります。蹴られる距離が一番危険です。" } },

  { ref:"attends-moi", lecon:3, coll:"securite",
    mots:{ fr:{m:"attends-moi", dit:"Tu m'attends, tu ne pars pas seul."},
           en:{m:"wait for me", p:"ouéït for mi", dit:"Wait for me — don't set off alone."},
           es:{m:"espérame", dit:"Espérame, no salgas solo."},
           it:{m:"aspettami", dit:"Aspettami, non partire da solo."},
           de:{m:"warte auf mich", p:"var-te aouf mich", dit:"Warte auf mich, geh nicht allein los."},
           ja:{m:"待っていて", p:"matte ite", dit:"一人 で 行か ない で、 待っ て い て ください。"} },
    def:{ fr:"⚠️ Le mot **attendre** traverse trois villes de l'app : « six foulées en attendant » et « attendre son saut » à Wellington et Hickstead, « attends-moi » ici. Même verbe, trois contextes.",
          en:"« Wait » runs through three cities of this app: waiting for a stride, waiting for a fence, waiting for the teacher.",
          es:"« Esperar » atraviesa tres ciudades de esta app.",
          it:"« Aspettare » attraversa tre città di quest'app.",
          de:"« Warten » zieht sich durch drei Städte dieser App.",
          ja:"「待つ」はこのアプリの三つの街に登場します。歩数を待つ、踏み切りを待つ、そして指導者を待つ。" } },

  { ref:"au-pas-tout-le-monde", lecon:3, coll:"securite",
    mots:{ fr:{m:"au pas tout le monde", dit:"Au pas tout le monde !"},
           en:{m:"everyone walk", p:"èv-ri-ouann ouok", dit:"Everyone back to walk !"},
           es:{m:"todos al paso", dit:"¡ Todos al paso !"},
           it:{m:"tutti al passo", dit:"Tutti al passo !"},
           de:{m:"alle Schritt", p:"a-le chritt", dit:"Alle in den Schritt !"},
           ja:{m:"全員常歩", p:"zen'in namiashi", dit:"全員、 常歩 に 落とし て ください !"} },
    def:{ fr:"🟥 LE PREMIER RÉFLEXE quand quelque chose ne va pas quelque part dans le manège : on ramène TOUT LE MONDE au pas, pas seulement celui qui a un problème. Un groupe au pas laisse le temps de comprendre.",
          en:"The first reflex when something goes wrong anywhere in the arena: bring EVERYONE back to walk, not just the one in trouble. A group at walk buys you time to understand.",
          es:"El primer reflejo cuando algo va mal: llevar a TODOS al paso, no solo al que tiene el problema.",
          it:"Il primo riflesso quando qualcosa va storto: riportare TUTTI al passo, non solo chi ha il problema.",
          de:"Der erste Reflex, wenn irgendwo etwas schiefgeht: ALLE in den Schritt, nicht nur den Betroffenen.",
          ja:"馬場のどこかで問題が起きたときの最初の反応：問題のある人だけでなく、全員を常歩に戻します。落ち着いて状況を把握する時間ができます。" } },

  { ref:"tenez-criniere", lecon:3, coll:"securite",
    mots:{ fr:{m:"tenez-vous à la crinière", dit:"Tenez-vous à la crinière !"},
           en:{m:"hold the mane", p:"hôld ze méïn", dit:"Hold the mane !"},
           es:{m:"agarraos a las crines", dit:"¡ Agarraos a las crines !"},
           it:{m:"tenetevi alla criniera", dit:"Tenetevi alla criniera !"},
           de:{m:"haltet euch an der Mähne", p:"mè-ne", dit:"Haltet euch an der Mähne !"},
           ja:{m:"たてがみをつかんで", p:"tategami o tsukande", dit:"たてがみ を つかん で ください !"} },
    def:{ fr:"⚠️ NE FAIT PAS MAL AU CHEVAL — la crinière n'a pas de nerfs. C'est ce qu'on dit à un débutant qui se rattrape aux rênes : s'accrocher à la bouche du cheval le fait accélérer, s'accrocher à la crinière ne fait rien du tout. La phrase existe aussi au Morne, pour la baignade.",
          en:"It doesn't hurt the horse — the mane has no nerves. Say it to a beginner who grabs the reins: hanging on the mouth makes a horse go faster, hanging on the mane does nothing at all.",
          es:"No hace daño al caballo: las crines no tienen nervios. Se dice a quien se agarra de las riendas.",
          it:"Non fa male al cavallo: la criniera non ha nervi. Si dice a chi si aggrappa alle redini.",
          de:"Es tut dem Pferd nicht weh — die Mähne hat keine Nerven. Sagt man dem, der sich an den Zügeln festhält.",
          ja:"馬は痛くありません。たてがみには神経がないからです。手綱にしがみつくと馬は速くなりますが、たてがみなら何も起きません。" } },

  { ref:"qui-a-peur", lecon:3, coll:"securite",
    mots:{ fr:{m:"qui a peur ?", dit:"Est-ce que quelqu'un a peur ?"},
           en:{m:"who's nervous ?", p:"neur-veuss", dit:"Is anyone nervous ?"},
           es:{m:"¿ quién tiene miedo ?", dit:"¿ Alguien tiene miedo ?"},
           it:{m:"chi ha paura ?", dit:"Qualcuno ha paura ?"},
           de:{m:"wer hat Angst ?", p:"vèr hatt angst", dit:"Hat jemand Angst ?"},
           ja:{m:"怖い人は？", p:"kowai hito wa", dit:"怖い 人 は い ます か ?"} },
    def:{ fr:"🟥 SE DEMANDE AVANT, pas après. Un cavalier qui a peur ne le dit jamais spontanément devant le groupe — il faut poser la question, et laisser répondre sans regarder personne. ⚠️ En anglais **nervous** passe bien mieux que **afraid**, qui humilie.",
          en:"Ask BEFORE, not after. A frightened rider never volunteers it in front of the group. Ask, then look away while they answer. « Nervous » is far kinder than « afraid ».",
          es:"Se pregunta ANTES, no después. Un jinete con miedo nunca lo dice solo delante del grupo.",
          it:"Si chiede PRIMA, non dopo. Un cavaliere spaventato non lo dice mai da solo davanti al gruppo.",
          de:"VORHER fragen, nicht danach. Wer Angst hat, sagt es vor der Gruppe nie von selbst.",
          ja:"事前に聞きます。怖い生徒が集団の前で自分から言うことはありません。質問したあとは、答える間だけ視線をそらします。" } },

  { ref:"ca-va", lecon:3, coll:"securite",
    mots:{ fr:{m:"est-ce que ça va ?", dit:"Ça va ? Tu peux parler ?"},
           en:{m:"are you all right ?", p:"ol raïte", dit:"Are you all right ? Can you talk ?"},
           es:{m:"¿ estás bien ?", dit:"¿ Estás bien ? ¿ Puedes hablar ?"},
           it:{m:"tutto bene ?", dit:"Tutto bene ? Riesci a parlare ?"},
           de:{m:"alles in Ordnung ?", p:"a-less inn ord-noung", dit:"Alles in Ordnung ? Kannst du sprechen ?"},
           ja:{m:"大丈夫ですか", p:"daijōbu desu ka", dit:"大丈夫 です か ? 話せ ます か ?"} },
    def:{ fr:"⚠️ « Tu peux parler ? » n'est pas une formule : c'est le premier test après une chute. Quelqu'un qui répond d'une phrase entière respire et n'a pas perdu connaissance. Le reste s'évalue ensuite, sans le faire bouger.",
          en:"« Can you talk ? » isn't small talk — it's the first check after a fall. Someone who answers in a full sentence is breathing and conscious. Everything else is assessed after, without moving them.",
          es:"« ¿ Puedes hablar ? » no es una fórmula: es la primera comprobación tras una caída.",
          it:"« Riesci a parlare ? » non è una formula: è il primo controllo dopo una caduta.",
          de:"« Kannst du sprechen ? » ist keine Floskel — es ist die erste Prüfung nach einem Sturz.",
          ja:"「話せますか」は形式的な言葉ではなく、落馬後の最初の確認です。文章で答えられるなら呼吸があり意識もあります。" } },

  { ref:"appelle-moi", lecon:3, coll:"securite",
    mots:{ fr:{m:"appelle-moi", dit:"Tu m'appelles si tu ne te sens pas bien."},
           en:{m:"call me", p:"kol mi", dit:"Call me if you don't feel right."},
           es:{m:"llámame", dit:"Llámame si no te encuentras bien."},
           it:{m:"chiamami", dit:"Chiamami se non ti senti bene."},
           de:{m:"ruf mich", p:"rouf mich", dit:"Ruf mich, wenn du dich nicht wohlfühlst."},
           ja:{m:"呼んでください", p:"yonde kudasai", dit:"具合 が 悪かっ たら 呼ん で ください。"} },
    def:{ fr:"🟥 SE DIT AU DÉBUT DU COURS, pas au moment où ça va mal. Une permission donnée d'avance est ce qui fait qu'on ose l'utiliser. Beaucoup d'élèves se taisent parce que personne ne leur a dit qu'ils avaient le droit de parler.",
          en:"Say it at the START of the lesson, not when things go wrong. Permission given in advance is what makes someone dare to use it. Many pupils stay silent because nobody told them they were allowed to speak.",
          es:"Se dice al PRINCIPIO de la clase, no cuando ya va mal. El permiso dado de antemano es lo que hace que se atrevan a usarlo.",
          it:"Si dice all'INIZIO della lezione, non quando le cose vanno male. Il permesso dato in anticipo è ciò che dà il coraggio di usarlo.",
          de:"Zu BEGINN der Stunde sagen, nicht erst, wenn es schiefgeht. Eine im Voraus gegebene Erlaubnis ist das, was den Mut gibt, sie zu nutzen.",
          ja:"レッスンの最初に言います。問題が起きてからでは遅い。あらかじめ許可を与えておくことで、初めて声を上げられるようになります。" } },

  /* ============ LEÇON 4 · L'ÉLÈVE ============ */

  { ref:"eleve", lecon:4, coll:"eleve",
    mots:{ fr:{m:"l'élève"}, en:{m:"the pupil", p:"piou-peul", var:"the student"},
           es:{m:"el alumno"}, it:{m:"l'allievo"},
           de:{m:"der Schüler", p:"chu-leur"}, ja:{m:"生徒", p:"seito"} },
    def:{ fr:"⚠️ En anglais d'écurie on dit **pupil** pour un enfant et **client** pour un adulte qui paie sa leçon — le second surprend les Français, mais c'est le mot courant dans les clubs britanniques.",
          en:"« Pupil » for a child, « client » for an adult paying for a lesson. The second surprises French speakers but is standard in British yards.",
          es:"« Alumno » vale para ambos en español.",
          it:"« Allievo » vale per entrambi in italiano.",
          de:"« Schüler » gilt für beide im Deutschen.",
          ja:"英語では子どもは pupil、料金を払う大人は client と呼ぶことがあります。" } },

  { ref:"debutant-ens", lecon:4, coll:"eleve",
    mots:{ fr:{m:"le débutant"}, en:{m:"the beginner", p:"bi-guin-eur", var:"the novice"},
           es:{m:"el principiante"}, it:{m:"il principiante"},
           de:{m:"der Anfänger", p:"ann-fèn-gueur"}, ja:{m:"初心者", p:"shoshinsha"} },
    def:{ fr:"⚠️ RAPPEL de La Baule, où le mot s'apprend côté élève. Ici on le dit de l'autre côté : ce n'est plus « je suis débutante » mais « j'ai deux débutants dans le groupe ». Même mot, rôle inversé — c'est le principe de ce chapitre.",
          en:"A recall from La Baule, where the word is learnt as a pupil. Here you say it from the other side: not « I'm a beginner » but « I've two beginners in the group ».",
          es:"Recordatorio de La Baule, aprendido allí desde el lado del alumno.",
          it:"Richiamo di La Baule, imparato lì dal lato dell'allievo.",
          de:"Eine Wiederholung aus La Baule, dort aus Schülersicht gelernt.",
          ja:"ラ・ボールで生徒の立場から学んだ語の再登場です。ここでは逆の立場から使います。" } },

  { ref:"celui-qui-a-peur", lecon:4, coll:"eleve",
    mots:{ fr:{m:"un élève qui a peur"}, en:{m:"a nervous rider", p:"neur-veuss raï-deur"},
           es:{m:"un alumno con miedo"}, it:{m:"un allievo impaurito"},
           de:{m:"ein ängstlicher Schüler", p:"èngst-lich"}, ja:{m:"怖がっている生徒", p:"kowagatte iru seito"} },
    def:{ fr:"🟥 LA PEUR NE SE RAISONNE PAS, elle se contourne : on raccourcit l'exercice, on met le cheval derrière un autre, on redescend d'une allure. Dire « n'aie pas peur » n'a jamais fait effet sur personne.",
          en:"Fear can't be argued with, only worked around: shorten the exercise, put the horse behind another, drop a pace. « Don't be scared » has never worked on anyone.",
          es:"El miedo no se razona, se rodea: acortar el ejercicio, poner el caballo detrás de otro, bajar de aire.",
          it:"La paura non si ragiona, si aggira: accorciare l'esercizio, mettere il cavallo dietro a un altro, scendere di andatura.",
          de:"Angst lässt sich nicht wegargumentieren, nur umgehen: Übung kürzen, das Pferd hinter ein anderes stellen, eine Gangart zurück.",
          ja:"恐怖は理屈で解けません。迂回します。課題を短くし、他の馬の後ろにつけ、歩様を一つ落とす。「怖がらないで」は誰にも効きません。" } },

  { ref:"va-trop-vite", lecon:4, coll:"eleve",
    mots:{ fr:{m:"il va trop vite", dit:"Ne le laisse pas accélérer."},
           en:{m:"he's going too fast", p:"tou fasst", dit:"Don't let him speed up."},
           es:{m:"va demasiado rápido", dit:"No le dejes acelerar."},
           it:{m:"va troppo veloce", dit:"Non lasciarlo accelerare."},
           de:{m:"er wird zu schnell", p:"tsou chnèll", dit:"Lass ihn nicht schneller werden."},
           ja:{m:"速くなりすぎる", p:"hayaku narisugiru", dit:"馬 が 速く なら ない よう に。"} },
    def:{ fr:"⚠️ Un cheval qui accélère avec un débutant le fait presque toujours parce que le cavalier se penche en avant et serre les jambes sans le savoir. On corrige la position, pas la vitesse.",
          en:"A horse speeding up with a beginner nearly always does so because the rider is leaning forward and gripping without knowing. Correct the position, not the speed.",
          es:"Un caballo que acelera con un principiante casi siempre lo hace porque el jinete se inclina y aprieta las piernas sin saberlo.",
          it:"Un cavallo che accelera con un principiante lo fa quasi sempre perché il cavaliere si sporge in avanti e stringe le gambe senza saperlo.",
          de:"Ein Pferd, das mit einem Anfänger schneller wird, tut das fast immer, weil der Reiter sich vorbeugt und unbewusst klemmt.",
          ja:"初心者を乗せた馬が速くなるのは、たいてい騎手が前傾して無意識に脚で締めているからです。速度ではなく姿勢を直します。" } },

  { ref:"est-bloque", lecon:4, coll:"eleve",
    mots:{ fr:{m:"il est bloqué", dit:"Respire, tu es bloquée."},
           en:{m:"he's frozen", p:"frô-zeune", dit:"Breathe — you've locked up."},
           es:{m:"está bloqueado", dit:"Respira, estás bloqueada."},
           it:{m:"è bloccato", dit:"Respira, sei bloccata."},
           de:{m:"er ist verkrampft", p:"feur-krampft", dit:"Atme — du bist verkrampft."},
           ja:{m:"固まっている", p:"katamatte iru", dit:"息 を し て ください。 固まっ て い ます。"} },
    def:{ fr:"🟥 « RESPIRE » EST LA CORRECTION LA PLUS EFFICACE de tout l'enseignement équestre. Un cavalier crispé retient son souffle sans le savoir ; le lui faire remarquer relâche tout le reste d'un coup, et le cheval le sent immédiatement.",
          en:"« Breathe » is the single most effective correction in all riding instruction. A tense rider holds their breath without knowing; pointing it out releases everything else at once, and the horse feels it immediately.",
          es:"« Respira » es la corrección más eficaz de toda la enseñanza ecuestre.",
          it:"« Respira » è la correzione più efficace di tutto l'insegnamento equestre.",
          de:"« Atme » ist die wirksamste Korrektur im ganzen Reitunterricht.",
          ja:"「息をして」は馬術指導で最も効果的な一言です。緊張した騎手は無意識に息を止めています。指摘するだけで全身が緩み、馬もすぐに気づきます。" } },

  { ref:"niveau-du-groupe", lecon:4, coll:"eleve",
    mots:{ fr:{m:"le niveau du groupe"}, en:{m:"the level of the group", p:"lè-veul"},
           es:{m:"el nivel del grupo"}, it:{m:"il livello del gruppo"},
           de:{m:"das Niveau der Gruppe", p:"ni-vô"}, ja:{m:"クラスのレベル", p:"kurasu no reberu"} },
    def:{ fr:"⚠️ Un groupe va au rythme du plus faible, pas du plus fort. Un enseignant qui règle son cours sur le meilleur perd les autres — et le meilleur s'ennuie moins vite qu'un débutant ne se décourage.",
          en:"A group goes at the pace of its weakest, not its strongest. Teach to the best rider and you lose the rest — and the best gets bored more slowly than a beginner gets discouraged.",
          es:"Un grupo va al ritmo del más flojo, no del más fuerte.",
          it:"Un gruppo va al ritmo del più debole, non del più forte.",
          de:"Eine Gruppe geht im Tempo des Schwächsten, nicht des Stärksten.",
          ja:"クラスは最も強い生徒ではなく、最も弱い生徒に合わせて進みます。上手な生徒が退屈するより、初心者が挫折するほうが早いのです。" } },

  { ref:"adapter", lecon:4, coll:"eleve",
    mots:{ fr:{m:"adapter l'exercice", dit:"Toi, tu le fais au pas."},
           en:{m:"to adapt the exercise", p:"e-dapte", dit:"You do it at walk."},
           es:{m:"adaptar el ejercicio", dit:"Tú lo haces al paso."},
           it:{m:"adattare l'esercizio", dit:"Tu lo fai al passo."},
           de:{m:"die Übung anpassen", p:"ann-pa-sseune", dit:"Du machst es im Schritt."},
           ja:{m:"課題を調整する", p:"kadai o chōsei suru", dit:"あなた は 常歩 で やっ て ください。"} },
    def:{ fr:"🟥 ADAPTER, PAS DISPENSER. Donner la même chose à une allure plus lente garde l'élève dans le cours ; le mettre de côté le sort du groupe et il ne revient pas.",
          en:"Adapt, don't excuse. Giving the same thing at a slower pace keeps the pupil in the lesson; setting them aside takes them out of the group, and they don't come back.",
          es:"Adaptar, no dispensar. Lo mismo a un aire más lento mantiene al alumno dentro de la clase.",
          it:"Adattare, non esentare. La stessa cosa a un'andatura più lenta tiene l'allievo dentro la lezione.",
          de:"Anpassen, nicht befreien. Dasselbe in langsamerer Gangart hält den Schüler im Unterricht.",
          ja:"免除ではなく調整。同じ課題を遅い歩様でやらせれば、生徒はレッスンの中に留まります。外すと戻ってきません。" } },

  { ref:"encourager", lecon:4, coll:"eleve",
    mots:{ fr:{m:"encourager", dit:"Tu as bien travaillé aujourd'hui."},
           en:{m:"to encourage", p:"inn-keu-ridj", dit:"You worked well today."},
           es:{m:"animar", dit:"Has trabajado bien hoy."},
           it:{m:"incoraggiare", dit:"Hai lavorato bene oggi."},
           de:{m:"ermutigen", p:"èr-mou-ti-gueune", dit:"Du hast heute gut gearbeitet."},
           ja:{m:"励ます", p:"hagemasu", dit:"今日 は よく 頑張り まし た。"} },
    def:{ fr:"⚠️ Encourager sur le TRAVAIL, pas sur le talent. « Tu as bien travaillé » se refait la semaine suivante ; « tu es doué » ne se refait pas, et le jour où ça rate, l'élève en conclut qu'il ne l'était pas.",
          en:"Praise the WORK, not the talent. « You worked well » can be repeated next week; « you're gifted » can't, and the day it goes wrong the pupil concludes they never were.",
          es:"Animar por el TRABAJO, no por el talento. « Has trabajado bien » se puede repetir la semana siguiente.",
          it:"Incoraggiare sul LAVORO, non sul talento. « Hai lavorato bene » si può ripetere la settimana dopo.",
          de:"Die ARBEIT loben, nicht das Talent. « Du hast gut gearbeitet » lässt sich nächste Woche wiederholen.",
          ja:"才能ではなく「取り組み」を褒めます。「よく頑張った」は来週も言えますが、「才能がある」は言えません。失敗した日に、自分には無かったのだと結論づけてしまいます。" } },

  { ref:"faire-confiance", lecon:4, coll:"eleve",
    mots:{ fr:{m:"faire confiance", dit:"Fais-lui confiance, il connaît son métier."},
           en:{m:"to trust", p:"treusst", dit:"Trust him — he knows his job."},
           es:{m:"confiar", dit:"Confía en él, sabe su trabajo."},
           it:{m:"fidarsi", dit:"Fidati di lui, conosce il suo mestiere."},
           de:{m:"vertrauen", p:"feur-traou-eune", dit:"Vertrau ihm, er kennt seinen Job."},
           ja:{m:"信頼する", p:"shinrai suru", dit:"馬 を 信じ て ください。 よく わかっ て い ます。"} },
    def:{ fr:"Se dit du cheval d'école, qui sait souvent mieux que le cavalier ce qu'il faut faire. ⚠️ Mais jamais pour éviter d'expliquer : « fais-lui confiance » ne remplace pas une consigne, ça la complète.",
          en:"Said of a school horse, who often knows better than the rider. But never as a way of avoiding an explanation: « trust him » completes an instruction, it doesn't replace one.",
          es:"Se dice del caballo de escuela, que a menudo sabe mejor que el jinete. Pero nunca para evitar explicar.",
          it:"Si dice del cavallo da scuola, che spesso sa meglio del cavaliere. Ma mai per evitare di spiegare.",
          de:"Gilt für das Schulpferd, das oft mehr weiß als der Reiter. Aber nie als Ersatz für eine Erklärung.",
          ja:"練習馬について言う言葉。騎手より馬のほうがよく知っていることが多いからです。ただし説明を省く口実にしてはいけません。" } },

  { ref:"laisser-essayer", lecon:4, coll:"eleve",
    mots:{ fr:{m:"laisser essayer", dit:"Essaie, je te regarde."},
           en:{m:"to let them try", p:"lètt zème traï", dit:"Have a go — I'm watching."},
           es:{m:"dejar intentar", dit:"Inténtalo, te miro."},
           it:{m:"lasciar provare", dit:"Prova, ti guardo."},
           de:{m:"probieren lassen", p:"pro-bii-reune", dit:"Probier es — ich schaue zu."},
           ja:{m:"やらせてみる", p:"yarasete miru", dit:"やっ て み て ください。 見 て い ます。"} },
    def:{ fr:"🟥 LA DERNIÈRE LEÇON DE CE CHAPITRE, et la plus difficile : un enseignant qui parle sans arrêt empêche d'apprendre. Il faut savoir se taire et laisser rater — c'est en corrigeant soi-même qu'on retient. « Je te regarde » dit qu'on n'abandonne pas pour autant.",
          en:"The last lesson of this chapter, and the hardest: a teacher who talks non-stop prevents learning. You have to know when to be quiet and let it go wrong — correcting yourself is what makes it stick. « I'm watching » says you haven't abandoned them.",
          es:"La última lección de este capítulo, y la más difícil: un profesor que habla sin parar impide aprender.",
          it:"L'ultima lezione di questo capitolo, e la più difficile: un insegnante che parla senza sosta impedisce di imparare.",
          de:"Die letzte Lektion dieses Kapitels, und die schwerste: wer ununterbrochen redet, verhindert das Lernen.",
          ja:"この章の最後の、そして最も難しい教え。話し続ける指導者は学びを妨げます。黙って、失敗させることも必要です。自分で直したことこそ身につきます。「見ています」は、見捨てていないという意味です。" } }

  ],

  /* ==================================================================
     LE DIALOGUE DE SAUMUR — 16 août 2026, session 214.

     LA SCÈNE : elle donne son premier cours. 20 phrases, 6 temps.
     🟥 RENVERSEMENT COMPLET PAR RAPPORT À ABERYSTWYTH : là-bas 18
     phrases sur 24 étaient ENTENDUES ; ici c'est l'inverse — la
     joueuse PRODUIT presque tout. C'est le seul dialogue de l'app où
     elle commande.
     ⚠️ NE PAS « rééquilibrer » en ajoutant des phrases du club.

     ⚠️ ON ENSEIGNE DANS LA LANGUE ÉTRANGÈRE (décision de Blandine).
     C'est ce qui rend ce dialogue Premium et le place tard dans le
     voyage — Saumur est la 16e étape, largement après Aberystwyth.

     ⚠️ TUTOIEMENT en fr/es/it/de, style POLI en japonais — sauf les
     deux ordres de sécurité. Voir l'en-tête du fichier.
  ================================================================== */
  dialogue: {
    ville: "saumur", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · j'ouvre le cours ---- */
      { ref:"de-bonjour-groupe", temps:1, dit:"joueuse", mots:["la-reprise-groupe"],
        fr:"Bonjour à tous. On va travailler les transitions aujourd'hui.",
        en:"Morning everyone. We're going to work on transitions today.",
        es:"Buenos días a todos. Hoy vamos a trabajar las transiciones.",
        it:"Buongiorno a tutti. Oggi lavoriamo sulle transizioni.",
        de:"Guten Morgen zusammen. Heute arbeiten wir an den Übergängen.",
        ja:"皆さん、 おはよう ござい ます。 今日 は 移行 を 練習 し ます。" },

      { ref:"de-appelez-moi", temps:1, dit:"joueuse", mots:["appelle-moi"],
        fr:"Si vous ne vous sentez pas bien, vous m'appelez tout de suite.",
        en:"If you don't feel right, call me straight away.",
        es:"Si no os encontráis bien, llamadme enseguida.",
        it:"Se non vi sentite bene, chiamatemi subito.",
        de:"Wenn ihr euch nicht wohlfühlt, ruft mich sofort.",
        ja:"具合 が 悪く なっ たら、 すぐ に 呼ん で ください。" },

      { ref:"de-qui-a-peur", temps:1, dit:"joueuse", mots:["qui-a-peur"],
        fr:"Est-ce que quelqu'un a peur, ou n'est pas à l'aise ?",
        en:"Is anyone nervous, or not comfortable?",
        es:"¿Alguien tiene miedo o no se siente cómodo?",
        it:"Qualcuno ha paura o non si sente a suo agio?",
        de:"Hat jemand Angst oder fühlt sich unwohl?",
        ja:"怖い 人 や、 不安 な 人 は い ます か ?" },

      { ref:"de-r-un-peu", temps:1, dit:"club", mots:["celui-qui-a-peur"],
        fr:"Moi un peu. Je suis tombée la semaine dernière.",
        en:"A bit. I came off last week.",
        es:"Yo un poco. Me caí la semana pasada.",
        it:"Io un po'. Sono caduta la settimana scorsa.",
        de:"Ich ein bisschen. Ich bin letzte Woche gestürzt.",
        ja:"少し 怖い です。 先週 落馬 し まし た。" },

      /* ---- temps 2 · j'échauffe ---- */
      { ref:"de-en-piste-pas", temps:2, dit:"joueuse", mots:["en-piste","echauffement"],
        fr:"En piste au pas, on s'échauffe dix minutes.",
        en:"Onto the track at walk — ten minutes to warm up.",
        es:"A la pista al paso, calentamos diez minutos.",
        it:"In pista al passo, riscaldiamo dieci minuti.",
        de:"Auf den Hufschlag im Schritt, zehn Minuten warm reiten.",
        ja:"常歩 で 蹄跡 に 入り、 十分 ほど ウォーミング アップ し ます。" },

      { ref:"de-gardez-distances", temps:2, dit:"joueuse", mots:[],
        fr:"Gardez vos distances : une longueur de cheval entre chacun.",
        en:"Keep your distance — a horse's length between each of you.",
        es:"Guardad las distancias: un cuerpo de caballo entre cada uno.",
        it:"Mantenete le distanze: una lunghezza di cavallo tra ciascuno.",
        de:"Haltet Abstand: eine Pferdelänge zwischen euch.",
        ja:"間隔 を 空け て ください。 馬 一 頭分 です。" },

      { ref:"de-annonce-voix", temps:2, dit:"joueuse", mots:["a-ma-voix","au-commandement"],
        fr:"À ma voix, tout le monde ensemble. Au commandement : trois, deux, un.",
        en:"On my call, all together. On the command: three, two, one.",
        es:"A mi voz, todos juntos. A la orden: tres, dos, uno.",
        it:"Alla mia voce, tutti insieme. Al comando: tre, due, uno.",
        de:"Auf mein Kommando, alle zusammen. Auf Kommando: drei, zwei, eins.",
        ja:"私 の 合図 で、 全員 一緒 に。 号令 で、 三、 二、 一。" },

      /* ---- temps 3 · je corrige ---- */
      { ref:"de-une-seule-chose", temps:3, dit:"joueuse", mots:["la-correction"],
        fr:"Une seule chose à la fois : pour l'instant, juste les talons.",
        en:"One thing at a time — for now, just your heels.",
        es:"Una sola cosa a la vez: por ahora, solo los talones.",
        it:"Una cosa alla volta: per ora, solo i talloni.",
        de:"Eine Sache nach der anderen: erst mal nur die Absätze.",
        ja:"一度 に 一つ ずつ。 今 は かかと だけ です。" },

      { ref:"de-cest-mieux", temps:3, dit:"joueuse", mots:["cest-mieux"],
        fr:"Là, c'est mieux ! Tu sens la différence ?",
        en:"That's better ! Can you feel the difference?",
        es:"¡Así está mejor! ¿Sientes la diferencia?",
        it:"Così va meglio ! Senti la differenza?",
        de:"Das ist besser ! Spürst du den Unterschied?",
        ja:"はい、 良く なり まし た ! 違い が わかり ます か ?" },

      { ref:"de-respire", temps:3, dit:"joueuse", mots:["est-bloque"],
        fr:"Respire. Tu es bloquée, et lui le sent.",
        en:"Breathe. You've locked up, and he can feel it.",
        es:"Respira. Estás bloqueada, y él lo nota.",
        it:"Respira. Sei bloccata, e lui lo sente.",
        de:"Atme. Du bist verkrampft, und er spürt das.",
        ja:"息 を し て ください。 固まっ て い ます。 馬 も それ を 感じ ます。" },

      { ref:"de-pas-grave-recommence", temps:3, dit:"joueuse", mots:["pas-grave","recommence"],
        fr:"Ce n'est pas grave, ça arrive. Recommence, tranquillement.",
        en:"Never mind, it happens. Try that again, quietly.",
        es:"No pasa nada, ocurre. Vuelve a intentarlo, con calma.",
        it:"Non è niente, capita. Riprova, con calma.",
        de:"Macht nichts, das passiert. Versuch es noch mal, in Ruhe.",
        ja:"大丈夫 です。 よく ある こと です。 落ち着い て、 もう一度。" },

      /* ---- temps 4 · j'adapte ---- */
      { ref:"de-toi-au-pas", temps:4, dit:"joueuse", mots:["adapter"],
        fr:"Toi, tu le fais au pas. C'est le même exercice.",
        en:"You do it at walk. It's the same exercise.",
        es:"Tú lo haces al paso. Es el mismo ejercicio.",
        it:"Tu lo fai al passo. È lo stesso esercizio.",
        de:"Du machst es im Schritt. Es ist dieselbe Übung.",
        ja:"あなた は 常歩 で やっ て ください。 課題 は 同じ です。" },

      { ref:"de-ne-laisse-pas-accelerer", temps:4, dit:"joueuse", mots:["va-trop-vite"],
        fr:"Ne le laisse pas accélérer. Redresse-toi, il ralentira tout seul.",
        en:"Don't let him speed up. Sit up, and he'll slow down by himself.",
        es:"No le dejes acelerar. Enderézate y frenará solo.",
        it:"Non lasciarlo accelerare. Raddrizzati e rallenterà da solo.",
        de:"Lass ihn nicht schneller werden. Setz dich auf, dann wird er von selbst langsamer.",
        ja:"馬 を 速く さ せ ない で ください。 上体 を 起こせ ば、 自然 に 落ち着き ます。" },

      { ref:"de-fais-lui-confiance", temps:4, dit:"joueuse", mots:["faire-confiance"],
        fr:"Fais-lui confiance, il connaît son métier mieux que nous.",
        en:"Trust him — he knows his job better than we do.",
        es:"Confía en él, sabe su trabajo mejor que nosotros.",
        it:"Fidati di lui, conosce il suo mestiere meglio di noi.",
        de:"Vertrau ihm, er kennt seinen Job besser als wir.",
        ja:"馬 を 信じ て ください。 私たち より よく わかっ て い ます。" },

      /* ---- temps 5 · un incident ---- */
      { ref:"de-au-pas-tout-le-monde", temps:5, dit:"joueuse", mots:["au-pas-tout-le-monde"],
        fr:"Au pas tout le monde !",
        en:"Everyone back to walk !",
        es:"¡Todos al paso!",
        it:"Tutti al passo !",
        de:"Alle in den Schritt !",
        ja:"全員、 常歩 に 落とし て ください !" },

      /* 🟥 Style DIRECT en japonais : l'urgence prime sur la politesse. */
      { ref:"de-arrete-descends", temps:5, dit:"joueuse", mots:["arrete-toi","descends"],
        fr:"Arrête-toi. Descends, tout de suite.",
        en:"Whoa — stop. Get off, right now.",
        es:"Para. Baja, ahora mismo.",
        it:"Fermati. Scendi, subito.",
        de:"Halt an. Steig ab, sofort.",
        ja:"止まっ て。 すぐ に 降り て。" },

      { ref:"de-ecarte-toi", temps:5, dit:"joueuse", mots:["ecarte-toi"],
        fr:"Écarte-toi vers l'intérieur, ne reste pas derrière lui.",
        en:"Move away towards the middle — don't stay behind him.",
        es:"Apártate hacia el centro, no te quedes detrás de él.",
        it:"Spostati verso l'interno, non restare dietro di lui.",
        de:"Geh zur Mitte hin, bleib nicht hinter ihm.",
        ja:"内側 に 離れ て ください。 馬 の 後ろ に 立た ない で。" },

      { ref:"de-ca-va-parler", temps:5, dit:"joueuse", mots:["ca-va"],
        fr:"Ça va ? Tu peux parler ? Ne bouge pas pour l'instant.",
        en:"Are you all right? Can you talk? Don't move for now.",
        es:"¿Estás bien? ¿Puedes hablar? No te muevas de momento.",
        it:"Tutto bene? Riesci a parlare? Non muoverti per ora.",
        de:"Alles in Ordnung? Kannst du sprechen? Beweg dich erst mal nicht.",
        ja:"大丈夫 です か ? 話せ ます か ? 今 は 動か ない で ください。" },

      /* ---- temps 6 · je termine ---- */
      { ref:"de-essaie-je-regarde", temps:6, dit:"joueuse", mots:["laisser-essayer"],
        fr:"Essaie toute seule, je te regarde.",
        en:"Have a go on your own — I'm watching.",
        es:"Inténtalo sola, te miro.",
        it:"Prova da sola, ti guardo.",
        de:"Probier es allein — ich schaue zu.",
        ja:"一人 で やっ て み て ください。 見 て い ます。" },

      { ref:"de-bien-travaille", temps:6, dit:"joueuse", mots:["encourager","cest-bien"],
        fr:"Vous avez bien travaillé aujourd'hui. Rênes longues, et caressez-les.",
        en:"You all worked well today. Long reins, and give them a pat.",
        es:"Habéis trabajado bien hoy. Riendas largas, y acariciadlos.",
        it:"Avete lavorato bene oggi. Redini lunghe, e accarezzateli.",
        de:"Ihr habt heute gut gearbeitet. Lange Zügel, und klopft sie ab.",
        ja:"今日 は よく 頑張り まし た。 手綱 を 長く し て、 馬 を 撫で て あげ て ください。" }
    ]
  }
};
