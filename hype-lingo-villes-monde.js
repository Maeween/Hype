/* hype-lingo-villes-monde.js — Hype Linguae · les huit villes du monde
   ==================================================================
   Saumur · Lamotte-Beuvron · Jerez · Séville · Vejer · Oliva Nova ·
   Warendorf · Aix-la-Chapelle.

   ⚠️ CE FICHIER COMPLÈTE hype-lingo-villes.js, il ne le remplace pas.
   Il se charge APRÈS lui et ajoute ses clés une par une, sans jamais
   écraser une ville existante. Les dix villes britanniques et
   irlandaises restent où elles sont, dans leur fichier.

   Contrairement aux dix premières, ces huit villes sont TRADUITES dans
   les six langues dès leur création — lettre et volets. Les volets
   portent donc un objet par langue au lieu d'une chaîne : `tx()` accepte
   les deux, une chaîne est renvoyée telle quelle.

   Généré le 5 août 2026 depuis hype-linguae-villes-nouvelles.md, pour ne
   pas retaper les textes et ne rien perdre en recopiant.

   ⚠️ Faits encore à vérifier avant publication : datation du Cadre Noir,
   intitulé exact du spectacle de Jerez, rôle de la Deutsche Reitschule,
   période de la Feria de Séville.
   ================================================================== */

window.HYPE_LINGO_VILLES = window.HYPE_LINGO_VILLES || {};

(function(){
  var MONDE = {

  /* ============ SAUMUR · le Cadre Noir ============ */
  saumur:{
    lieu:"Maine-et-Loire · France", carte:true, niveau:3,
    image:"l'écuyer en noir dans le grand manège",
    lettre:{
      fr:["Je n'ai entendu que le sable.", "Sept chevaux sont entrés au pas dans le grand manège, sept cavaliers en noir, et pendant vingt minutes personne n'a élevé la voix — ni les écuyers, ni nous."],
      en:["All I could hear was the sand.", "Seven horses walked into the great riding hall, seven riders dressed in black, and for twenty minutes nobody raised their voice — not the écuyers, not us."],
      es:["Solo se oía la arena.", "Siete caballos entraron al paso en el gran picadero, siete jinetes de negro, y durante veinte minutos nadie levantó la voz — ni los écuyers, ni nosotros."],
      it:["Si sentiva solo la sabbia.", "Sette cavalli sono entrati al passo nel grande maneggio, sette cavalieri vestiti di nero, e per venti minuti nessuno ha alzato la voce — né gli écuyers, né noi."],
      de:["Ich hörte nur den Sand.", "Sieben Pferde kamen im Schritt in die große Reithalle, sieben Reiter in Schwarz, und zwanzig Minuten lang hob niemand die Stimme — weder die Écuyers noch wir."],
      ja:["聞こえたのは砂の音だけだった。", "七頭の馬が常歩で大きな馬場に入ってきた。黒い制服の七人の騎手。二十分のあいだ、誰も声を上げなかった — 教官たちも、私たちも。"]},
    volets:[
     {t:{fr:"Le Cadre Noir", en:"The Cadre Noir", es:"El Cadre Noir", it:"Il Cadre Noir", de:"Das Cadre Noir", ja:"カドル・ノワール（黒の騎兵団）"},
      c:{
          fr:"Une école, pas une équipe. Les écuyers y enseignent l'équitation française depuis le XIX siècle, en uniforme noir, et transmettent une façon de travailler le cheval fondée sur la légèreté plutôt que sur la force.",
          en:"A school, not a team. Its écuyers have taught French classical riding since the 19th century, in black uniform, passing on a way of working horses built on lightness rather than strength.",
          es:"Una escuela, no un equipo. Sus écuyers enseñan la equitación clásica francesa desde el siglo XIX, de uniforme negro, y transmiten una manera de trabajar al caballo basada en la ligereza y no en la fuerza.",
          it:"Una scuola, non una squadra. I suoi écuyers insegnano l'equitazione classica francese dall'Ottocento, in uniforme nera, e tramandano un modo di lavorare il cavallo fondato sulla leggerezza e non sulla forza.",
          de:"Eine Schule, keine Mannschaft. Seine Écuyers unterrichten seit dem 19. Jahrhundert die französische klassische Reitkunst, in schwarzer Uniform, und geben eine Arbeitsweise weiter, die auf Leichtigkeit beruht statt auf Kraft.",
          ja:"チームではなく、学校です。十九世紀から黒い制服の教官たちがフランス古典馬術を教え、力ではなく軽さに基づいた馬の扱い方を伝えてきました。"}},
     {t:{fr:"Les sauteurs", en:"The airs above the ground", es:"Los saltos de escuela", it:"I salti di scuola", de:"Die Schulsprünge", ja:"空中運動"},
      c:{
          fr:"Certains chevaux de l'école travaillent les sauts d'école : croupade, courbette, cabriole. Des mouvements hérités de l'équitation ancienne, exécutés à la main ou montés, et que presque personne d'autre au monde ne pratique encore.",
          en:"Some of the school's horses perform the classical leaps: croupade, courbette, cabriole. Movements inherited from old riding traditions, shown in hand or ridden, that almost nobody else in the world still practises.",
          es:"Algunos caballos de la escuela trabajan los aires sobre la tierra: croupade, courbette, cabriole. Movimientos heredados de la equitación antigua, presentados a la mano o montados, que casi nadie más practica hoy.",
          it:"Alcuni cavalli della scuola lavorano le arie sopra il terreno: croupade, courbette, cabriole. Movimenti ereditati dall'equitazione antica, presentati a mano o montati, che quasi nessun altro pratica ancora.",
          de:"Einige Pferde der Schule zeigen die Schulen über der Erde: Croupade, Courbette, Kapriole. Bewegungen aus der alten Reitkunst, an der Hand oder geritten vorgeführt, die fast niemand sonst auf der Welt noch pflegt.",
          ja:"この学校の一部の馬は古典的な跳躍を行います。クルパード、クールベット、カプリオール。古い馬術から受け継がれた動きで、手綱で導く形か騎乗して見せられ、世界でこれを続けている場所はほとんどありません。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Va voir une reprise de manège plutôt qu'un gala. Sans musique et sans public nombreux, on entend les aides : un souffle, un déplacement de poids, et le cheval change d'allure sans qu'on ait rien vu.",
          en:"Watch a working session rather than a gala. With no music and few spectators, you can hear the aids: a breath, a shift of weight, and the horse changes pace without you seeing a thing.",
          es:"Ve a ver un trabajo de picadero antes que una gala. Sin música ni mucho público se oyen las ayudas: un aliento, un cambio de peso, y el caballo cambia de aire sin que hayas visto nada.",
          it:"Guarda una ripresa di lavoro, non un galà. Senza musica e senza folla si sentono gli aiuti: un respiro, uno spostamento di peso, e il cavallo cambia andatura senza che tu abbia visto nulla.",
          de:"Sieh dir eine Arbeitsreprise an, keine Gala. Ohne Musik und ohne großes Publikum hört man die Hilfen: ein Atemzug, eine Gewichtsverlagerung, und das Pferd wechselt die Gangart, ohne dass man etwas gesehen hätte.",
          ja:"ガラ公演よりも、ふだんの調教を見てください。音楽も大観衆もない場所では扶助が聞こえます。ひと息、重心の移動、それだけで馬の歩様が変わる — こちらには何も見えないまま。"}}
    ]},

  /* ============ LAMOTTE-BEUVRON · le poney ============ */
  lamotte:{
    lieu:"Loir-et-Cher · France", carte:true, niveau:2,
    image:"les carrières à perte de vue et les poneys partout",
    lettre:{
      fr:["Je n'ai jamais vu autant de poneys au même endroit.", "Une chute sur la carrière d'à côté, et en quelques secondes trois adultes étaient là — sans courir, sans crier. La cavalière s'est relevée toute seule, et la reprise a continué."],
      en:["I had never seen so many ponies in one place.", "A fall in the next arena, and within seconds three adults were there — without running, without shouting. The rider got up on her own, and the lesson carried on."],
      es:["Nunca había visto tantos ponis en un mismo sitio.", "Una caída en la pista de al lado, y en unos segundos había tres adultos allí — sin correr, sin gritar. La amazona se levantó sola y la clase siguió."],
      it:["Non avevo mai visto tanti pony nello stesso posto.", "Una caduta nel campo accanto, e in pochi secondi c'erano tre adulti — senza correre, senza gridare. L'amazzone si è rialzata da sola e la lezione è continuata."],
      de:["So viele Ponys an einem Ort hatte ich noch nie gesehen.", "Ein Sturz auf dem Platz nebenan, und binnen Sekunden standen drei Erwachsene dort — ohne zu rennen, ohne zu rufen. Die Reiterin stand allein auf, und die Stunde ging weiter."],
      ja:["あれほど多くのポニーが一か所にいるのを見たことがなかった。", "隣の馬場で落馬があり、数秒のうちに大人が三人そばにいた。走りもせず、叫びもせずに。乗り手は自分で立ち上がり、レッスンはそのまま続いた。"]},
    volets:[
     {t:{fr:"Le plus grand parc équestre", en:"The largest equestrian park", es:"El mayor parque ecuestre", it:"Il più grande parco equestre", de:"Der größte Reitsportpark", ja:"最大の馬術パーク"},
      c:{
          fr:"Des dizaines de carrières, des milliers de chevaux et de poneys, et une semaine par an où toute l'équitation française se retrouve au même endroit pour ses championnats.",
          en:"Dozens of arenas, thousands of horses and ponies, and one week a year when the whole of French riding gathers in the same place for its championships.",
          es:"Decenas de pistas, miles de caballos y ponis, y una semana al año en que toda la equitación francesa se reúne en el mismo lugar para sus campeonatos.",
          it:"Decine di campi, migliaia di cavalli e pony, e una settimana all'anno in cui tutta l'equitazione francese si ritrova nello stesso luogo per i suoi campionati.",
          de:"Dutzende Plätze, Tausende Pferde und Ponys, und eine Woche im Jahr, in der sich der gesamte französische Reitsport am selben Ort zu seinen Meisterschaften trifft.",
          ja:"数十面の馬場、何千頭もの馬とポニー。そして年に一週間、フランス馬術のすべてが選手権のためにこの同じ場所に集まります。"}},
     {t:{fr:"Réagir à une chute", en:"Reacting to a fall", es:"Reaccionar ante una caída", it:"Reagire a una caduta", de:"Auf einen Sturz reagieren", ja:"落馬に対応する"},
      c:{
          fr:"On ne relève pas un cavalier tombé. On demande s'il va bien, on lui dit de ne pas bouger, on attrape le cheval, on appelle. Quatre gestes dans le bon ordre — et ce sont ceux qu'il faut savoir dire dans la langue du pays où l'on monte.",
          en:"You don't pick up a fallen rider. You ask if they're all right, you tell them not to move, you catch the horse, you call for help. Four actions in the right order — and they're the ones you need to be able to say in the language of the country you're riding in.",
          es:"A un jinete caído no se le levanta. Se le pregunta si está bien, se le dice que no se mueva, se coge al caballo, se pide ayuda. Cuatro gestos en el orden correcto — y son los que hay que saber decir en el idioma del país donde montas.",
          it:"Un cavaliere caduto non si tira su. Gli si chiede se sta bene, gli si dice di non muoversi, si prende il cavallo, si chiama aiuto. Quattro gesti nell'ordine giusto — e sono quelli da saper dire nella lingua del paese in cui monti.",
          de:"Einen gestürzten Reiter richtet man nicht auf. Man fragt, ob alles in Ordnung ist, sagt ihm, sich nicht zu bewegen, fängt das Pferd ein, ruft Hilfe. Vier Handgriffe in der richtigen Reihenfolge — und genau die muss man in der Sprache des Landes sagen können, in dem man reitet.",
          ja:"落ちた人を起こしてはいけません。大丈夫かと尋ね、動かないように伝え、馬を捕まえ、人を呼ぶ。正しい順番で四つの行動を。そしてこれは、自分が乗っている国の言葉で言えなければならないことです。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Regarde une reprise de club plutôt qu'une épreuve. Les mots de l'enseignant y reviennent en boucle — sur la piste, changez de main, une volte — et c'est exactement le vocabulaire qui te servira partout ailleurs.",
          en:"Watch a club lesson rather than a class. The instructor's words come round and round — on the track, change the rein, a volte — and that is exactly the vocabulary that will serve you everywhere else.",
          es:"Mira una clase de club antes que una prueba. Las palabras del profesor vuelven una y otra vez — a la pista, cambien de mano, una volta — y ese es justamente el vocabulario que te servirá en todas partes.",
          it:"Guarda una lezione di club, non una gara. Le parole dell'istruttore tornano in continuazione — in pista, cambiate di mano, una volta — ed è esattamente il vocabolario che ti servirà ovunque.",
          de:"Sieh dir eine Vereinsstunde an, keine Prüfung. Die Worte des Ausbilders kehren immer wieder — auf den Hufschlag, Handwechsel, eine Volte — und genau dieses Vokabular wird dir überall sonst dienen.",
          ja:"競技よりも、クラブのレッスンを見てください。指導者の言葉が何度も繰り返されます —「蹄跡へ」「手前を換えて」「一つ輪乗り」。それこそが、どこへ行っても役に立つ語彙です。"}}
    ]},

  /* ============ JEREZ DE LA FRONTERA · décrire un cheval ============ */
  jerez:{
    lieu:"Andalucía · Spain", carte:true, niveau:1,
    image:"l'étalon gris seul sous les arcades",
    lettre:{
      fr:["On m'a demandé de le décrire, et je n'ai pas su.", "Il était gris, très gris, avec une crinière qui touchait presque le sol — et le palefrenier attendait, patiemment, que je trouve les mots. Ce jour-là j'ai compris à quoi sert le vocabulaire."],
      en:["Someone asked me to describe him, and I couldn't.", "He was grey, very grey, with a mane that nearly touched the ground — and the groom waited patiently for me to find the words. That was the day I understood what vocabulary is for."],
      es:["Me pidieron que lo describiera y no supe hacerlo.", "Era tordo, muy tordo, con una crin que casi tocaba el suelo — y el mozo esperó con paciencia a que yo encontrara las palabras. Ese día entendí para qué sirve el vocabulario."],
      it:["Mi hanno chiesto di descriverlo e non ci sono riuscito.", "Era grigio, grigissimo, con una criniera che sfiorava terra — e lo stalliere ha aspettato con pazienza che trovassi le parole. Quel giorno ho capito a cosa serve il vocabolario."],
      de:["Man bat mich, ihn zu beschreiben, und ich konnte es nicht.", "Er war ein Schimmel, ein sehr heller, mit einer Mähne, die fast den Boden berührte — und der Pfleger wartete geduldig, bis ich die Worte fand. An diesem Tag verstand ich, wozu Vokabeln gut sind."],
      ja:["「この馬を説明して」と言われて、言葉が出なかった。", "芦毛の、とても白い馬だった。たてがみは地面に届きそうなほど長い。厩務員は急かさず、私が言葉を見つけるのを待っていた。あの日、語彙が何のためにあるのかがわかった。"]},
    volets:[
     {t:{fr:"La race d'ici", en:"The breed here", es:"La raza de aquí", it:"La razza di qui", de:"Die Rasse von hier", ja:"この土地の品種"},
      c:{
          fr:"Le pura raza española, qu'on appelle aussi PRE. Un cheval compact au port de tête haut, à la crinière et à la queue très fournies, connu pour sa docilité et sa facilité au rassembler. La robe grise y est la plus répandue.",
          en:"The Pura Raza Española, also called the PRE. A compact horse with a high head carriage and an abundant mane and tail, known for its willing temperament and its ease in collection. Grey is by far its most common colour.",
          es:"El pura raza española, también llamado PRE. Un caballo compacto, de cuello alzado, con crin y cola muy pobladas, conocido por su docilidad y su facilidad para reunirse. La capa torda es la más extendida.",
          it:"Il pura raza española, chiamato anche PRE. Un cavallo compatto, dal collo portato alto, con criniera e coda foltissime, noto per la docilità e la facilità nel riunirsi. Il grigio è di gran lunga il mantello più diffuso.",
          de:"Der Pura Raza Española, auch PRE genannt. Ein kompaktes Pferd mit hoher Halshaltung, sehr üppiger Mähne und Schweif, bekannt für seine Gutmütigkeit und seine Leichtigkeit in der Versammlung. Schimmel ist die häufigste Farbe.",
          ja:"プーラ・ラサ・エスパニョーラ、PRE とも呼ばれます。頸を高く保つ、まとまった体型の馬で、たてがみと尾がとても豊か。温厚で、収縮が容易なことで知られています。毛色は芦毛が最も多く見られます。"}},
     {t:{fr:"L'école", en:"The school", es:"La escuela", it:"La scuola", de:"Die Schule", ja:"学校"},
      c:{
          fr:"La Real Escuela Andaluza del Arte Ecuestre entraîne et présente ses chevaux à Jerez. Son spectacle porte un titre qui dit tout : « comment dansent les chevaux andalous ».",
          en:"The Real Escuela Andaluza del Arte Ecuestre trains and shows its horses in Jerez. Its performance carries a title that says everything: \"how the Andalusian horses dance\".",
          es:"La Real Escuela Andaluza del Arte Ecuestre entrena y presenta sus caballos en Jerez. Su espectáculo lleva un título que lo dice todo: «cómo bailan los caballos andaluces».",
          it:"La Real Escuela Andaluza del Arte Ecuestre addestra e presenta i suoi cavalli a Jerez. Il suo spettacolo porta un titolo che dice tutto: «come ballano i cavalli andalusi».",
          de:"Die Real Escuela Andaluza del Arte Ecuestre bildet ihre Pferde in Jerez aus und stellt sie vor. Ihre Vorführung trägt einen Titel, der alles sagt: „Wie die andalusischen Pferde tanzen\".",
          ja:"王立アンダルシア馬術学校がヘレスで馬を調教し、披露しています。その公演の題名がすべてを語っています —「アンダルシアの馬はいかに踊るか」。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Viens un jour d'entraînement plutôt qu'un jour de spectacle. On y voit les mêmes chevaux, sans costume ni musique, et on y comprend combien de répétitions se cachent derrière trois minutes de gala.",
          en:"Come on a training day rather than a show day. You see the same horses without costume or music, and you understand how much repetition hides behind three minutes of gala.",
          es:"Ve un día de entrenamiento antes que un día de espectáculo. Se ven los mismos caballos sin traje ni música, y se entiende cuántos ensayos hay detrás de tres minutos de gala.",
          it:"Vieni in un giorno di lavoro, non di spettacolo. Vedi gli stessi cavalli senza costumi né musica, e capisci quante prove si nascondono dietro tre minuti di galà.",
          de:"Komm an einem Trainingstag statt an einem Showtag. Man sieht dieselben Pferde ohne Kostüm und Musik und begreift, wie viele Wiederholungen hinter drei Minuten Gala stecken.",
          ja:"公演の日より、稽古の日に行ってください。衣装も音楽もない同じ馬たちを見れば、三分の舞台の裏にどれだけの反復があるのかがわかります。"}}
    ]},

  /* ============ SÉVILLE · la présentation ============ */
  seville:{
    lieu:"Andalucía · Spain", carte:true, niveau:2,
    image:"l'attelage et le costume court dans la poussière de la feria",
    lettre:{
      fr:["Je n'avais jamais vu un cheval aussi propre.", "Pas simplement lavé : lustré, tressé, préparé depuis l'aube pour une heure de défilé. Et à la fin de la journée, sous la poussière, il l'était encore."],
      en:["I had never seen a horse so clean.", "Not simply washed: polished, plaited, prepared since dawn for one hour of parade. And at the end of the day, under the dust, he still was."],
      es:["Nunca había visto un caballo tan limpio.", "No solo lavado: lustrado, trenzado, preparado desde el alba para una hora de paseo. Y al final del día, bajo el polvo, seguía estándolo."],
      it:["Non avevo mai visto un cavallo così pulito.", "Non solo lavato: lucidato, intrecciato, preparato dall'alba per un'ora di sfilata. E a fine giornata, sotto la polvere, lo era ancora."],
      de:["Ich hatte noch nie ein so sauberes Pferd gesehen.", "Nicht bloß gewaschen: poliert, eingeflochten, seit dem Morgengrauen für eine Stunde Umzug vorbereitet. Und am Abend, unter dem Staub, war es das immer noch."],
      ja:["あれほど手入れの行き届いた馬を見たことがなかった。", "ただ洗っただけではない。艶を出し、たてがみを編み、一時間の行進のために夜明けから支度をしていた。そして一日の終わり、砂ぼこりの下でも、まだそのままだった。"]},
    volets:[
     {t:{fr:"La feria", en:"The feria", es:"La feria", it:"La feria", de:"Die Feria", ja:"フェリア"},
      c:{
          fr:"Chaque printemps, la ville se remplit d'attelages et de cavaliers en costume traditionnel. Ce n'est pas une compétition : personne n'est classé, personne n'est chronométré. On se montre, et on regarde.",
          en:"Each spring the city fills with carriages and riders in traditional dress. It is not a competition: nobody is placed, nobody is timed. You show yourself, and you watch.",
          es:"Cada primavera la ciudad se llena de enganches y de jinetes con traje tradicional. No es una competición: nadie se clasifica, nadie se cronometra. Uno se muestra y uno mira.",
          it:"Ogni primavera la città si riempie di attacchi e di cavalieri in costume tradizionale. Non è una gara: nessuno viene classificato, nessuno cronometrato. Ci si mostra e si guarda.",
          de:"Jedes Frühjahr füllt sich die Stadt mit Gespannen und Reitern in traditioneller Tracht. Es ist kein Wettkampf: niemand wird platziert, niemand gestoppt. Man zeigt sich, und man schaut.",
          ja:"春になると、街は馬車と伝統衣装の騎手であふれます。競技ではありません。順位もなく、タイムも計られません。見せて、そして見る。それだけです。"}},
     {t:{fr:"La doma vaquera", en:"Doma vaquera", es:"La doma vaquera", it:"La doma vaquera", de:"Doma vaquera", ja:"ドマ・バケーラ"},
      c:{
          fr:"L'équitation de travail andalouse, née de la conduite du bétail. Une main tient les rênes, l'autre reste libre, et le cheval tourne court sur les hanches. Elle a sa propre discipline de concours aujourd'hui.",
          en:"Andalusian working riding, born from handling cattle. One hand holds the reins, the other stays free, and the horse turns short on its hindquarters. Today it has its own competitive discipline.",
          es:"La equitación de trabajo andaluza, nacida del manejo del ganado. Una mano lleva las riendas, la otra queda libre, y el caballo gira corto sobre los cuartos traseros. Hoy tiene su propia disciplina de concurso.",
          it:"L'equitazione di lavoro andalusa, nata dalla conduzione del bestiame. Una mano tiene le redini, l'altra resta libera, e il cavallo gira corto sui posteriori. Oggi ha una propria disciplina agonistica.",
          de:"Die andalusische Arbeitsreitweise, aus der Rinderarbeit entstanden. Eine Hand führt die Zügel, die andere bleibt frei, und das Pferd wendet eng über die Hinterhand. Heute ist sie eine eigene Turnierdisziplin.",
          ja:"牛の扱いから生まれたアンダルシアの実用馬術。片手で手綱を持ち、もう一方の手は自由なまま、馬は後躯を軸に小さく回ります。今では独立した競技種目になっています。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Regarde les mains des cavaliers plutôt que les costumes. C'est là que se voit la différence entre un cheval habillé et un cheval travaillé.",
          en:"Watch the riders' hands rather than the costumes. That is where you see the difference between a horse that is dressed up and a horse that is schooled.",
          es:"Mira las manos de los jinetes antes que los trajes. Ahí se ve la diferencia entre un caballo vestido y un caballo trabajado.",
          it:"Guarda le mani dei cavalieri più che i costumi. È lì che si vede la differenza tra un cavallo vestito e un cavallo lavorato.",
          de:"Achte auf die Hände der Reiter, nicht auf die Trachten. Dort sieht man den Unterschied zwischen einem geschmückten und einem gearbeiteten Pferd.",
          ja:"衣装ではなく、騎手の手を見てください。着飾った馬と、鍛えられた馬の違いはそこに出ます。"}}
    ]},

  /* ============ VEJER DE LA FRONTERA · l'intendance ============ */
  vejer:{
    lieu:"Andalucía · Spain", carte:true, niveau:1,
    image:"les box de tournée alignés, les brouettes au petit jour",
    lettre:{
      fr:["Six heures du matin, et la journée avait déjà commencé pour tout le monde sauf moi.", "Les brouettes passaient, les seaux se remplissaient, quelqu'un comptait les rations à voix haute. Personne ne montait encore, et pourtant tout le monde travaillait."],
      en:["Six in the morning, and the day had already started for everyone but me.", "Barrows went past, buckets filled up, someone counted out the feeds aloud. Nobody was riding yet, and yet everybody was working."],
      es:["Las seis de la mañana, y el día ya había empezado para todos menos para mí.", "Pasaban las carretillas, se llenaban los cubos, alguien contaba las raciones en voz alta. Nadie montaba todavía y, sin embargo, todo el mundo trabajaba."],
      it:["Le sei del mattino, e la giornata era già cominciata per tutti tranne che per me.", "Passavano le carriole, si riempivano i secchi, qualcuno contava le razioni ad alta voce. Nessuno montava ancora, eppure lavoravano tutti."],
      de:["Sechs Uhr morgens, und der Tag hatte für alle schon begonnen, nur für mich nicht.", "Schubkarren fuhren vorbei, Eimer füllten sich, jemand zählte die Rationen laut ab. Niemand ritt schon, und trotzdem arbeiteten alle."],
      ja:["朝六時。私以外の全員にとって、一日はもう始まっていた。", "一輪車が行き交い、バケツが満たされ、誰かが飼料の量を声に出して数えている。まだ誰も乗っていないのに、全員が働いていた。"]},
    volets:[
     {t:{fr:"Deux mois sur place", en:"Two months on site", es:"Dos meses en el sitio", it:"Due mesi sul posto", de:"Zwei Monate vor Ort", ja:"二か月の滞在"},
      c:{
          fr:"Une tournée d'hiver ne dure pas un week-end. Les écuries s'installent pour des semaines : boxes de tournée, foin livré par camion, rations préparées pour des dizaines de chevaux, une organisation qui tient de la petite ferme.",
          en:"A winter tour doesn't last a weekend. Stables settle in for weeks: temporary stalls, hay delivered by lorry, feeds made up for dozens of horses, an organisation closer to a small farm.",
          es:"Una gira de invierno no dura un fin de semana. Las cuadras se instalan durante semanas: boxes de gira, heno traído en camión, raciones preparadas para decenas de caballos, una organización de pequeña granja.",
          it:"Un circuito invernale non dura un fine settimana. Le scuderie si installano per settimane: box da trasferta, fieno consegnato col camion, razioni preparate per decine di cavalli, un'organizzazione da piccola azienda agricola.",
          de:"Eine Wintertour dauert kein Wochenende. Ställe richten sich für Wochen ein: Turnierboxen, Heu per Lastwagen, Rationen für Dutzende Pferde, eine Organisation wie auf einem kleinen Hof.",
          ja:"冬のツアーは週末で終わりません。厩舎ごと何週間も居つきます。仮設の馬房、トラックで届く乾草、何十頭分もの飼料の支度 — 小さな農場のような運営です。"}},
     {t:{fr:"Nourrir juste", en:"Feeding right", es:"Alimentar bien", it:"Nutrire giusto", de:"Richtig füttern", ja:"正しく与える"},
      c:{
          fr:"Chaque cheval a sa ration, écrite sur sa porte. Le foin d'abord, les granulés en complément, l'eau toujours disponible. En tournée, un cheval qui mange mal se voit sur le parcours deux jours plus tard.",
          en:"Every horse has its feed, written on its door. Forage first, hard feed as a supplement, water always available. On tour, a horse that eats badly shows it on the course two days later.",
          es:"Cada caballo tiene su ración, escrita en su puerta. Primero el forraje, el pienso como complemento, agua siempre disponible. En gira, un caballo que come mal se nota en el recorrido dos días después.",
          it:"Ogni cavallo ha la sua razione, scritta sulla porta. Prima il foraggio, i mangimi come complemento, l'acqua sempre disponibile. In trasferta, un cavallo che mangia male si vede in percorso due giorni dopo.",
          de:"Jedes Pferd hat seine Ration, an der Boxentür notiert. Raufutter zuerst, Kraftfutter als Ergänzung, Wasser immer verfügbar. Auf Tour sieht man ein schlecht gefüttertes Pferd zwei Tage später im Parcours.",
          ja:"馬ごとに決まった量があり、馬房の扉に書かれています。まず粗飼料、補いとして濃厚飼料、水はいつでも飲めるように。遠征では、食べ方の乱れは二日後の走行に出ます。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Propose ton aide un matin. On te confiera une brouette avant de te confier un cheval, et c'est comme ça qu'on apprend le vocabulaire qui sert vraiment.",
          en:"Offer to help one morning. You'll be handed a barrow before you're handed a horse, and that is how you learn the vocabulary that actually serves.",
          es:"Ofrécete a ayudar una mañana. Te darán una carretilla antes que un caballo, y así es como se aprende el vocabulario que de verdad sirve.",
          it:"Offriti di dare una mano una mattina. Ti affideranno una carriola prima di un cavallo, ed è così che si impara il vocabolario che serve davvero.",
          de:"Biete eines Morgens deine Hilfe an. Man gibt dir eine Schubkarre, bevor man dir ein Pferd gibt — und genau so lernt man die Wörter, die wirklich gebraucht werden.",
          ja:"朝、手伝いを申し出てみてください。馬より先に一輪車を渡されます。本当に役立つ言葉は、そうやって覚えるものです。"}}
    ]},

  /* ============ OLIVA NOVA · s'engager et fauter ============ */
  oliva:{
    lieu:"Comunidad Valenciana · Spain", carte:true, niveau:2,
    image:"les pistes de sable au bord de la mer, en hiver",
    lettre:{
      fr:["J'ai passé ma première matinée au secrétariat, pas sur un cheval.", "Il fallait un dossard, une licence, une liste de départ — et tout se disait dans une langue que je ne parlais pas. J'ai appris plus de mots ce matin-là qu'en une semaine."],
      en:["I spent my first morning at the show office, not on a horse.", "I needed a number, a licence, a start list — and it was all said in a language I didn't speak. I learned more words that morning than in a week."],
      es:["Pasé mi primera mañana en la secretaría, no encima de un caballo.", "Hacía falta un dorsal, una licencia, una lista de salida — y todo se decía en un idioma que yo no hablaba. Aprendí más palabras esa mañana que en una semana."],
      it:["Ho passato la mia prima mattina in segreteria, non a cavallo.", "Servivano un numero, una licenza, una lista di partenza — e tutto si diceva in una lingua che non parlavo. Ho imparato più parole quella mattina che in una settimana."],
      de:["Meinen ersten Vormittag verbrachte ich im Meldebüro, nicht auf einem Pferd.", "Es brauchte eine Nummer, eine Lizenz, eine Startliste — und alles wurde in einer Sprache gesagt, die ich nicht sprach. An diesem Vormittag lernte ich mehr Wörter als in einer ganzen Woche."],
      ja:["最初の午前中は馬の上ではなく、事務所で過ごした。", "ゼッケン、ライセンス、出場順のリスト。そのすべてが、私の話せない言葉でやり取りされていた。あの午前中に覚えた単語は、一週間分より多かった。"]},
    volets:[
     {t:{fr:"La tournée d'hiver", en:"The winter tour", es:"La gira de invierno", it:"Il circuito invernale", de:"Die Wintertour", ja:"冬のツアー"},
      c:{
          fr:"Pendant que le nord de l'Europe gèle, des écuries entières descendent ici pour plusieurs semaines de concours au soleil. Les chevaux voyagent, les familles suivent, et une petite ville de toile s'installe autour des pistes.",
          en:"While northern Europe freezes, whole stables come down here for weeks of competition in the sun. The horses travel, the families follow, and a small canvas town grows up around the arenas.",
          es:"Mientras el norte de Europa se hiela, cuadras enteras bajan aquí para semanas de concurso al sol. Los caballos viajan, las familias siguen, y una pequeña ciudad de lona crece alrededor de las pistas.",
          it:"Mentre il nord Europa gela, scuderie intere scendono qui per settimane di concorso al sole. I cavalli viaggiano, le famiglie seguono, e attorno ai campi cresce una piccola città di tela.",
          de:"Während Nordeuropa friert, ziehen ganze Ställe für Wochen hierher, zu Turnieren in der Sonne. Die Pferde reisen, die Familien folgen, und rund um die Plätze wächst eine kleine Zeltstadt.",
          ja:"北ヨーロッパが凍りつくあいだ、厩舎ごとこの地に下りてきて、陽射しの下で何週間も競技を続けます。馬が移動し、家族がついてきて、馬場のまわりに小さな布の町ができあがります。"}},
     {t:{fr:"S'engager", en:"Entering", es:"Inscribirse", it:"Iscriversi", de:"Nennen", ja:"エントリーする"},
      c:{
          fr:"Avant de sauter, il faut s'inscrire : choisir son épreuve, présenter sa licence, retirer son dossard, vérifier l'ordre de passage. Ce vocabulaire-là ne s'apprend pas à cheval, il s'apprend au guichet.",
          en:"Before you jump, you enter: choose your class, show your licence, collect your number, check the order of go. That vocabulary isn't learned on a horse; it's learned at the desk.",
          es:"Antes de saltar hay que inscribirse: elegir la prueba, presentar la licencia, recoger el dorsal, comprobar el orden de salida. Ese vocabulario no se aprende a caballo, se aprende en la ventanilla.",
          it:"Prima di saltare bisogna iscriversi: scegliere la categoria, presentare la licenza, ritirare il numero, controllare l'ordine di partenza. Quel vocabolario non si impara a cavallo, si impara allo sportello.",
          de:"Bevor man springt, meldet man: die Prüfung wählen, die Lizenz vorzeigen, die Nummer abholen, die Startfolge prüfen. Diese Wörter lernt man nicht im Sattel, sondern am Schalter.",
          ja:"飛ぶ前に、まず申し込みます。種目を選び、ライセンスを見せ、ゼッケンを受け取り、出場順を確かめる。この語彙は馬上ではなく、受付の窓口で覚えるものです。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Reste une demi-journée près de la piste d'échauffement. C'est là qu'on entend les vraies conversations : le refus qu'on commente, la faute qu'on explique, la ligne qu'on refait autrement.",
          en:"Spend half a day beside the warm-up arena. That's where the real conversations happen: the refusal being discussed, the fault being explained, the line being ridden differently next time.",
          es:"Quédate media jornada junto a la pista de calentamiento. Ahí se oyen las conversaciones de verdad: el rehúse que se comenta, la falta que se explica, la línea que se rehace de otra manera.",
          it:"Resta mezza giornata vicino al campo prova. È lì che si sentono i discorsi veri: il rifiuto commentato, l'errore spiegato, la linea rifatta in un altro modo.",
          de:"Bleib einen halben Tag am Abreiteplatz. Dort hört man die echten Gespräche: die Verweigerung, die besprochen wird, der Fehler, der erklärt wird, die Linie, die man nächstes Mal anders reitet.",
          ja:"半日、練習馬場のそばにいてください。本当の会話が聞こえるのはそこです。拒止をめぐるやり取り、失敗の説明、次はどう回るかという相談。"}}
    ]},

  /* ============ WARENDORF · les gestes de la formation ============ */
  warendorf:{
    lieu:"Nordrhein-Westfalen · Germany", carte:true, niveau:2,
    image:"la cour du haras au petit matin",
    lettre:{
      fr:["On m'a repris trois fois sur la même sangle.", "Pas sèchement — on m'a montré, j'ai refait, on m'a remontré. À la troisième, j'ai compris que ce n'était pas la sangle qui comptait, mais le fait de la faire pareil chaque jour."],
      en:["They corrected me three times on the same girth.", "Not sharply — they showed me, I did it again, they showed me again. By the third time I understood that the girth wasn't the point; doing it the same way every day was."],
      es:["Me corrigieron tres veces con la misma cincha.", "Sin brusquedad: me lo mostraron, lo repetí, me lo volvieron a mostrar. A la tercera entendí que lo importante no era la cincha, sino hacerlo igual todos los días."],
      it:["Mi hanno ripreso tre volte sulla stessa cinghia.", "Senza asprezza: me l'hanno mostrato, ho rifatto, me l'hanno mostrato ancora. Alla terza ho capito che non contava la cinghia, ma farlo allo stesso modo ogni giorno."],
      de:["Dreimal haben sie mich beim selben Gurt korrigiert.", "Nicht barsch — sie zeigten es mir, ich machte es noch einmal, sie zeigten es wieder. Beim dritten Mal verstand ich: nicht der Gurt zählte, sondern dass man es jeden Tag gleich macht."],
      ja:["同じ腹帯のことで三度直された。", "厳しくではなく、やって見せてくれて、私がやり直し、また見せてくれた。三度目に気づいた。大事なのは腹帯ではなく、毎日それを同じようにやることなのだと。"]},
    volets:[
     {t:{fr:"La ville de la formation", en:"The town of training", es:"La ciudad de la formación", it:"La città della formazione", de:"Die Stadt der Ausbildung", ja:"育成の町"},
      c:{
          fr:"Warendorf abrite le haras d'État de Westphalie et le centre de la fédération allemande. C'est ici que se forment enseignants, cavaliers professionnels et juges — un même endroit pour toute une filière.",
          en:"Warendorf is home to the Westphalian state stud and to the centre of the German equestrian federation. Instructors, professional riders and judges are all trained here — one place for a whole profession.",
          es:"Warendorf acoge la yeguada estatal de Westfalia y el centro de la federación alemana. Aquí se forman profesores, jinetes profesionales y jueces: un mismo lugar para todo un oficio.",
          it:"Warendorf ospita il deposito stalloni statale della Vestfalia e il centro della federazione tedesca. Qui si formano istruttori, cavalieri professionisti e giudici: un solo luogo per un intero mestiere.",
          de:"In Warendorf liegen das Landgestüt Westfalen und das Zentrum der Deutschen Reiterlichen Vereinigung. Hier werden Ausbilder, Berufsreiter und Richter ausgebildet — ein Ort für einen ganzen Berufsstand.",
          ja:"ヴァーレンドルフにはヴェストファーレン州立種馬所と、ドイツ馬術連盟の拠点があります。指導者も、プロの騎手も、審判員も、ここで育ちます。ひとつの職業のすべてが同じ場所にあります。"}},
     {t:{fr:"L'échelle de progression", en:"The training scale", es:"La escala de la formación", it:"La scala di addestramento", de:"Die Skala der Ausbildung", ja:"訓練のスケール"},
      c:{
          fr:"La formation allemande s'appuie sur six degrés qu'on apprend dans l'ordre : régularité, décontraction, contact, impulsion, rectitude, rassembler. Ce n'est pas une théorie d'école : les juges notent en s'y référant.",
          en:"German training rests on six steps learned in order: rhythm, suppleness, contact, impulsion, straightness, collection. It isn't classroom theory: judges score by referring to it.",
          es:"La enseñanza alemana se apoya en seis grados que se aprenden en orden: ritmo, decontracción, contacto, impulsión, rectitud y reunión. No es teoría de aula: los jueces puntúan tomándola como referencia.",
          it:"L'insegnamento tedesco poggia su sei gradi appresi in ordine: ritmo, decontrazione, contatto, impulso, rettitudine, riunione. Non è teoria da aula: i giudici valutano facendovi riferimento.",
          de:"Die deutsche Ausbildung ruht auf sechs Punkten, die man der Reihe nach lernt: Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung. Das ist keine Schultheorie: Richter bewerten danach.",
          ja:"ドイツの馬術教育は、順に学ぶ六つの段階に支えられています。リズム、リラックス、コンタクト、推進、まっすぐさ、収縮。机上の理論ではなく、審判員はこれを基準に採点します。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Regarde le début d'une séance, pas la fin. C'est dans les vingt premières minutes qu'on voit la méthode : rien de spectaculaire, la même chose refaite jusqu'à ce qu'elle soit juste.",
          en:"Watch the start of a session, not the end. The method shows in the first twenty minutes: nothing spectacular, the same thing repeated until it is right.",
          es:"Mira el principio de una sesión, no el final. El método se ve en los primeros veinte minutos: nada espectacular, lo mismo repetido hasta que sale bien.",
          it:"Guarda l'inizio di una seduta, non la fine. Il metodo si vede nei primi venti minuti: niente di spettacolare, la stessa cosa rifatta finché non è giusta.",
          de:"Sieh dir den Anfang einer Einheit an, nicht das Ende. In den ersten zwanzig Minuten zeigt sich die Methode: nichts Spektakuläres, dasselbe so lange wiederholt, bis es stimmt.",
          ja:"練習の終わりではなく、始まりを見てください。方法が見えるのは最初の二十分です。派手なことは何もなく、正しくなるまで同じことを繰り返すだけ。"}}
    ]},

  /* ============ AIX-LA-CHAPELLE · le grand concours ============ */
  aachen:{
    lieu:"Nordrhein-Westfalen · Germany", carte:true, niveau:2,
    image:"le stade plein, un cheval seul à l'entrée de piste",
    lettre:{
      fr:["Le stade était plein, et pourtant on n'entendait rien.", "Le cheval est entré, la cloche a sonné, et pendant une minute vingt il n'y a plus eu que le bruit des sabots. La foule n'a recommencé à respirer qu'après la dernière barre."],
      en:["A stadium full of people, and total silence.", "The horse came in, the bell rang, and for eighty seconds there was nothing but the sound of hooves. The crowd only started breathing again after the last fence."],
      es:["Un estadio lleno, y un silencio total.", "El caballo entró, sonó la campana, y durante ochenta segundos no hubo más que el ruido de los cascos. El público no volvió a respirar hasta el último obstáculo."],
      it:["Uno stadio pieno, e un silenzio totale.", "Il cavallo è entrato, la campana ha suonato, e per ottanta secondi non si è sentito altro che gli zoccoli. Il pubblico ha ricominciato a respirare solo dopo l'ultimo ostacolo."],
      de:["Ein volles Stadion, und völlige Stille.", "Das Pferd kam herein, die Glocke ertönte, und achtzig Sekunden lang gab es nichts als Hufschlag. Das Publikum atmete erst nach dem letzten Sprung wieder."],
      ja:["満員のスタジアムが、完全に静まりかえっていた。", "馬が入場し、開始の鐘が鳴り、八十秒のあいだ聞こえるのは蹄の音だけだった。観客が息をし直したのは、最後の障害を跳んだあとだった。"]},
    volets:[
     {t:{fr:"Le CHIO", en:"The CHIO", es:"El CHIO", it:"Il CHIO", de:"Das CHIO", ja:"CHIO（国際馬術大会）"},
      c:{
          fr:"Un concours international qui réunit plusieurs disciplines la même semaine : saut, dressage, attelage, complet. C'est l'un des rendez-vous les plus suivis du calendrier, et beaucoup de cavaliers le placent au-dessus des championnats.",
          en:"An international show bringing several disciplines together in the same week: jumping, dressage, driving, eventing. It is one of the most closely followed fixtures of the year, and many riders rate it above a championship.",
          es:"Un concurso internacional que reúne varias disciplinas en la misma semana: salto, doma, enganches, completo. Es una de las citas más seguidas del año, y muchos jinetes la ponen por encima de un campeonato.",
          it:"Un concorso internazionale che riunisce più discipline nella stessa settimana: salto, dressage, attacchi, completo. È uno degli appuntamenti più seguiti dell'anno, e molti cavalieri lo mettono sopra un campionato.",
          de:"Ein internationales Turnier, das mehrere Disziplinen in derselben Woche zusammenbringt: Springen, Dressur, Fahren, Vielseitigkeit. Es ist einer der meistbeachteten Termine des Jahres, und viele Reiter stellen es über eine Meisterschaft.",
          ja:"同じ一週間に複数種目が集まる国際大会です。障害、馬場、馬車、総合。一年でもっとも注目される大会のひとつで、選手権より上に置く騎手も少なくありません。"}},
     {t:{fr:"Le barrage", en:"The jump-off", es:"El desempate", it:"Il barrage", de:"Das Stechen", ja:"ジャンプオフ"},
      c:{
          fr:"Quand plusieurs cavaliers finissent sans faute, on recommence : parcours raccourci, chronomètre lancé, et cette fois la vitesse départage. C'est le moment où l'on voit qui accepte de risquer une barre pour gagner une seconde.",
          en:"When several riders finish clear, you start again: shortened course, clock running, and this time speed decides. It's the moment you see who will risk a fence to gain a second.",
          es:"Cuando varios jinetes terminan sin falta, se vuelve a empezar: recorrido acortado, cronómetro en marcha, y esta vez decide la velocidad. Es el momento en que se ve quién acepta arriesgar un derribo por ganar un segundo.",
          it:"Quando più cavalieri finiscono netti, si ricomincia: percorso accorciato, cronometro avviato, e stavolta decide la velocità. È il momento in cui si vede chi accetta di rischiare un abbattimento per guadagnare un secondo.",
          de:"Wenn mehrere Reiter fehlerfrei bleiben, geht es von vorn los: verkürzter Parcours, laufende Uhr, und diesmal entscheidet die Zeit. Der Moment, in dem man sieht, wer eine Stange riskiert, um eine Sekunde zu gewinnen.",
          ja:"何人もが無失点で終えたとき、もう一度走ります。短縮されたコース、動き出す時計、そして今度は速さで決まります。一秒のために一本を落とす危険を取る人が、誰なのかが見える瞬間です。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Assieds-toi près de la sortie de piste. On y voit les cavaliers redevenir eux-mêmes en trois secondes : ceux qui tapent l'encolure, ceux qui ne disent rien, et ceux qui vérifient un antérieur avant même de mettre pied à terre.",
          en:"Sit near the arena exit. You watch riders become themselves again in three seconds: the ones who pat the neck, the ones who say nothing, and the ones who check a foreleg before they've even dismounted.",
          es:"Siéntate cerca de la salida de pista. Ahí se ve a los jinetes volver a ser ellos mismos en tres segundos: los que palmean el cuello, los que no dicen nada, y los que revisan una mano antes incluso de echar pie a tierra.",
          it:"Siediti vicino all'uscita di campo. Lì i cavalieri ridiventano se stessi in tre secondi: chi dà una pacca sul collo, chi non dice niente, e chi controlla un anteriore prima ancora di scendere.",
          de:"Setz dich an den Ausgang des Parcours. Dort werden Reiter in drei Sekunden wieder sie selbst: die einen klopfen den Hals, die anderen sagen nichts, und wieder andere prüfen ein Vorderbein, bevor sie überhaupt abgestiegen sind.",
          ja:"出口のそばに座ってください。騎手が三秒で素の自分に戻るのが見えます。首を叩く人、何も言わない人、降りる前に前肢を確かめる人。"}}
    ]}

  };

  /* ⚠️ La Baule, ajoutée le 6 août 2026. Sa lettre et ses volets avaient
     été écrits (labaule.md) mais jamais injectés ici — son écran
     d'arrivée affichait donc une lettre VIDE depuis qu'elle est devenue
     l'étape 1 du voyage. Trouvé en construisant la page de collection :
     la carte se retournait sur du blanc. */
  MONDE.labaule = {
    lieu:"Loire-Atlantique · France", carte:true, niveau:1,
    image:"les carrières face à l'océan",
    lettre:{
      fr:["C'est la première fois que je demandais un cheval dans une langue qui n'est pas la mienne.",
          "Je me suis trompé sur presque tout, on m'a compris quand même, et on m'a donné un alezan très calme. On est partis vers la plage au pas, et je n'ai plus rien dit pendant vingt minutes."],
      en:["It was the first time I had ever asked for a horse in a language that isn't mine.",
          "I got almost everything wrong, they understood me anyway, and they gave me a very quiet chestnut. We walked down towards the beach, and I said nothing at all for twenty minutes."],
      es:["Era la primera vez que pedía un caballo en un idioma que no es el mío.",
          "Me equivoqué en casi todo, me entendieron igual y me dieron un alazán muy tranquilo. Bajamos al paso hacia la playa y no dije nada durante veinte minutos."],
      it:["Era la prima volta che chiedevo un cavallo in una lingua che non è la mia.",
          "Ho sbagliato quasi tutto, mi hanno capito comunque e mi hanno dato un sauro molto tranquillo. Siamo scesi al passo verso la spiaggia, e per venti minuti non ho detto niente."],
      de:["Es war das erste Mal, dass ich in einer fremden Sprache nach einem Pferd fragte.",
          "Ich machte fast alles falsch, man verstand mich trotzdem, und man gab mir einen sehr braven Fuchs. Wir gingen im Schritt zum Strand hinunter, und zwanzig Minuten lang sagte ich kein Wort."],
      ja:["自分の言葉ではない言語で馬を頼んだのは、あれが初めてだった。",
          "ほとんど言い間違えたけれど、それでも通じて、とてもおとなしい栗毛を出してくれた。常歩で浜へ下りていくあいだ、私は二十分間ひとことも話さなかった。"]},
    volets:[
      {t:{fr:"Le Jumping", en:"The Jumping", es:"El Jumping", it:"Il Jumping",
          de:"Das Jumping", ja:"ジャンピング"},
       c:{fr:"Chaque printemps, les carrières s'installent face à l'océan et les meilleurs cavaliers du monde y sautent à cent mètres de la plage. C'est l'un des plus anciens concours internationaux d'Europe, et le sable de la piste vient de la mer.",
          en:"Every spring the arenas go up facing the ocean, and the best riders in the world jump a hundred metres from the beach. It is one of Europe's oldest international shows, and the sand in the ring comes from the sea.",
          es:"Cada primavera las pistas se montan frente al océano y los mejores jinetes del mundo saltan a cien metros de la playa. Es uno de los concursos internacionales más antiguos de Europa, y la arena de la pista viene del mar.",
          it:"Ogni primavera i campi si allestiscono di fronte all'oceano e i migliori cavalieri del mondo saltano a cento metri dalla spiaggia. È uno dei più antichi concorsi internazionali d'Europa, e la sabbia del campo viene dal mare.",
          de:"Jedes Frühjahr entstehen die Plätze mit Blick auf den Ozean, und die besten Reiter der Welt springen hundert Meter vom Strand entfernt. Es ist eines der ältesten internationalen Turniere Europas — und der Sand im Parcours kommt aus dem Meer.",
          ja:"春になると、大西洋に面して馬場が設けられ、世界最高の騎手たちが浜から百メートルの場所で障害を跳びます。ヨーロッパでもっとも古い国際大会のひとつで、走行路の砂は海から来たものです。"}},
      {t:{fr:"La plage", en:"The beach", es:"La playa", it:"La spiaggia",
          de:"Der Strand", ja:"浜辺"},
       c:{fr:"Neuf kilomètres de sable, et le droit d'y monter hors saison, tôt le matin. L'eau salée est réputée bonne pour les tendons — on y descend les chevaux au pas dans les vagues, sans les faire nager.",
          en:"Nine kilometres of sand, and the right to ride there out of season, early in the morning. Salt water is held to be good for tendons: horses are walked into the waves, not made to swim.",
          es:"Nueve kilómetros de arena, y el derecho a montar allí fuera de temporada, temprano por la mañana. El agua salada se considera buena para los tendones: se entra a los caballos al paso en las olas, sin hacerlos nadar.",
          it:"Nove chilometri di sabbia, e il diritto di montarvi fuori stagione, presto al mattino. L'acqua salata è ritenuta buona per i tendini: si fanno entrare i cavalli al passo tra le onde, senza farli nuotare.",
          de:"Neun Kilometer Sand — und außerhalb der Saison darf man dort frühmorgens reiten. Salzwasser gilt als gut für die Sehnen: man führt die Pferde im Schritt in die Wellen, ohne sie schwimmen zu lassen.",
          ja:"九キロの砂浜。シーズン外の早朝には、そこで乗ることが許されています。塩水は腱に良いとされ、馬は常歩で波に入れられます — 泳がせるのではなく。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Réserve la veille et dis ton niveau franchement : personne ne juge un débutant, tout le monde juge un débutant qui s'est présenté comme cavalier. Demande si la bombe est fournie, elle l'est presque toujours.",
          en:"Book the day before and be honest about your level: nobody judges a beginner, everybody judges a beginner who claimed to be a rider. Ask whether a hat is provided — it almost always is.",
          es:"Reserva el día antes y di tu nivel con franqueza: nadie juzga a un principiante, todos juzgan a un principiante que se presentó como jinete. Pregunta si el casco está incluido, casi siempre lo está.",
          it:"Prenota il giorno prima e di' il tuo livello con franchezza: nessuno giudica un principiante, tutti giudicano un principiante che si è presentato come cavaliere. Chiedi se il cap è fornito: quasi sempre lo è.",
          de:"Buche am Vortag und sag dein Können ehrlich: niemand verurteilt einen Anfänger, alle verurteilen einen Anfänger, der sich als Reiter ausgegeben hat. Frag, ob eine Kappe gestellt wird — fast immer ja.",
          ja:"前日に予約し、自分の技量を正直に伝えること。初心者を悪く言う人はいませんが、経験者だと言った初心者は別です。ヘルメットの貸し出しがあるか尋ねてください。ほとんどの場合あります。"}}
    ]
  };

  /* ==================================================================
     LE MORNE (île Maurice) — ajoutée le 6 août 2026.
     Blandine : « L'île Maurice devait être ajoutée avec La Baule pour les
     balades dans la mer, se baigner », puis « dans l'idée réserver une
     ballade ». C'est donc la jumelle de La Baule et l'étape 2 du voyage :
     La Baule apprend à s'inscrire, Le Morne apprend à réserver une sortie
     et à entrer dans l'eau (chapitre `balade`).
     Le nom de l'étape est LE MORNE, pas « Maurice » : c'est le lieu réel
     où l'on monte sur l'île, au pied de la montagne du même nom, et le
     reste du voyage nomme des villes, pas des pays.
     ⚠️ CORRIGÉ le 6 août 2026, après vérification du lieu réel et de la
     photo de Blandine : la première version faisait desseller avant
     d'entrer dans l'eau. Au Haras du Morne, l'eau monte JUSQU'À LA SELLE
     et le cheval nage avec son cavalier dessus. La baignade y est
     réservée aux cavaliers expérimentés, savoir nager est exigé.
     ================================================================== */
  MONDE.maurice = {
    lieu:"Rivière Noire · Maurice", carte:true, niveau:1,
    image:"le lagon au pied de la montagne",
    lettre:{
      fr:["L'eau est montée jusqu'à la selle, et j'ai compris que la balade commençait seulement là.",
          "Le cheval est entré dans le lagon comme s'il rentrait chez lui. À un moment ses pieds ont quitté le fond, j'ai lâché la rêne comme on me l'avait dit, et il a nagé. Je n'ai jamais rien monté d'aussi calme."],
      en:["The water came up to the saddle, and I realised the ride was only starting there.",
          "The horse walked into the lagoon as if he were going home. At some point his feet left the bottom, I let the rein go as I had been told, and he swam. I have never ridden anything so calm."],
      es:["El agua subió hasta la silla, y entendí que el paseo empezaba justo allí.",
          "El caballo entró en la laguna como si volviera a su casa. En un momento sus pies dejaron el fondo, solté la rienda como me habían dicho, y nadó. Nunca he montado nada tan tranquilo."],
      it:["L'acqua è salita fino alla sella, e ho capito che la passeggiata cominciava solo lì.",
          "Il cavallo è entrato nella laguna come se tornasse a casa. A un certo punto i suoi piedi hanno lasciato il fondo, ho mollato la redine come mi avevano detto, e ha nuotato. Non ho mai montato niente di così tranquillo."],
      de:["Das Wasser stieg bis zum Sattel, und da begriff ich, dass der Ausritt erst dort anfing.",
          "Das Pferd ging in die Lagune, als käme es nach Hause. Irgendwann verließen seine Hufe den Grund, ich gab den Zügel nach, wie man es mir gesagt hatte, und es schwamm. Ich habe noch nie etwas so Ruhiges geritten."],
      ja:["水が鞍まで上がってきたとき、外乗はここから始まるのだと分かった。",
          "馬は自分の家に帰るようにラグーンへ入っていった。あるところで蹄が底を離れ、言われたとおり手綱をゆるめると、馬は泳いだ。あれほど静かな馬に乗ったことはない。"]},
    volets:[
      {t:{fr:"Le lagon", en:"The lagoon", es:"La laguna", it:"La laguna",
          de:"Die Lagune", ja:"ラグーン"},
       c:{fr:"Le récif casse la houle à un kilomètre du bord : entre les deux, l'eau est plate, tiède et claire jusqu'au fond. C'est ce qui rend la baignade à cheval possible ici alors qu'elle est dangereuse presque partout ailleurs — pas de vague pour déséquilibrer, pas de trou pour surprendre. On n'entre jamais dans la passe, l'ouverture par laquelle le lagon se vide vers le large.",
          en:"The reef breaks the swell a kilometre out: between the two, the water is flat, warm and clear to the bottom. That is what makes riding into the sea possible here when it is dangerous almost everywhere else — no wave to unbalance you, no hole to surprise you. You never enter the pass, the gap where the lagoon empties out to sea.",
          es:"El arrecife rompe el oleaje a un kilómetro de la orilla: entre los dos, el agua está plana, tibia y clara hasta el fondo. Eso hace posible aquí el baño a caballo, peligroso en casi todas partes: ninguna ola que desequilibre, ningún hoyo que sorprenda. Nunca se entra en el paso, la abertura por donde la laguna se vacía hacia el mar.",
          it:"La barriera rompe l'onda lunga a un chilometro da riva: in mezzo, l'acqua è piatta, tiepida e trasparente fino al fondo. È questo che rende possibile qui il bagno a cavallo, pericoloso quasi in ogni altro posto: nessuna onda che squilibri, nessuna buca che sorprenda. Non si entra mai nel passo, l'apertura da cui la laguna si svuota verso il largo.",
          de:"Das Riff bricht die Dünung einen Kilometer draußen: dazwischen ist das Wasser flach, warm und bis zum Grund klar. Das macht das Baden zu Pferd hier möglich, wo es fast überall sonst gefährlich ist — keine Welle, die aus dem Gleichgewicht bringt, kein Loch, das überrascht. In den Pass, die Öffnung, durch die sich die Lagune zum offenen Meer entleert, reitet man nie.",
          ja:"サンゴ礁が沖合一キロでうねりを砕くため、その内側の水は平らで、ぬるく、底まで澄んでいます。ほかの多くの場所では危険な「馬と入る海」が、ここでは成り立つ理由です。体勢を崩す波もなく、不意の深みもありません。ラグーンの水が外洋へ抜ける水路には、決して入りません。"}},
      {t:{fr:"Se baigner", en:"Going in", es:"Bañarse", it:"Fare il bagno",
          de:"Ins Wasser", ja:"水に入る"},
       c:{fr:"On dessine la sortie autour de la marée, pas autour de l'horaire : à marée basse la bande de sable mouillé porte le galop, à marée haute il n'y a plus de plage. On reste en selle : l'eau monte jusqu'à la selle et le cheval nage avec toi dessus, la bombe sur la tête. Quand les pieds quittent le fond, il nage tout seul ; la seule chose à faire est de lui laisser la tête libre. ⚠️ La baignade est réservée aux cavaliers déjà confirmés, et il faut savoir nager.",
          en:"The ride is planned around the tide, not the timetable: at low tide the strip of wet sand carries a canter, at high tide there is no beach left. You stay in the saddle: the water rises to it and the horse swims with you on its back, hat on. When the hooves leave the bottom it swims by itself; the only thing to do is leave its head free. The swim is for experienced riders only, and you must be able to swim.",
          es:"La salida se organiza según la marea, no según el horario: con marea baja la franja de arena mojada aguanta el galope, con marea alta no queda playa. Se queda uno en la silla: el agua sube hasta ella y el caballo nada contigo encima, con el casco puesto. Cuando los cascos dejan el fondo, nada solo; lo único que hay que hacer es dejarle la cabeza libre. El baño es solo para jinetes experimentados, y hay que saber nadar.",
          it:"L'uscita si organizza sulla marea, non sull'orario: con la marea bassa la striscia di sabbia bagnata regge il galoppo, con la marea alta non c'è più spiaggia. Si resta in sella: l'acqua sale fino alla sella e il cavallo nuota con te sopra, con il cap in testa. Quando gli zoccoli lasciano il fondo, nuota da sé; l'unica cosa da fare è lasciargli la testa libera. Il bagno è riservato ai cavalieri esperti, e bisogna saper nuotare.",
          de:"Der Ausritt richtet sich nach der Tide, nicht nach dem Stundenplan: bei Ebbe trägt der Streifen nassen Sandes den Galopp, bei Flut bleibt kein Strand übrig. Man bleibt im Sattel: das Wasser steigt bis zum Sattel, und das Pferd schwimmt mit dir darauf, die Kappe bleibt auf. Verlassen die Hufe den Grund, schwimmt es von selbst; das Einzige, was zu tun ist: den Kopf frei lassen. Das Baden ist erfahrenen Reitern vorbehalten, und schwimmen können muss man.",
          ja:"出発は時刻表ではなく潮で決めます。引き潮なら濡れた砂の帯が駈歩を支え、満ち潮では浜そのものがなくなります。鞍には乗ったままです。水は鞍の高さまで上がり、馬はあなたを乗せて泳ぎます。ヘルメットは着けたまま。蹄が底を離れれば馬は自分で泳ぎます。こちらがすべきことは、頭を自由にしてやることだけです。水浴は経験のある騎乗者に限られ、泳げることが条件です。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Réserve la veille, dis ton niveau franchement — la baignade demande un cavalier confirmé — mets ton maillot sous ta tenue, emporte une serviette et de quoi te changer, et demande l'heure de la marée avant l'heure du rendez-vous. Pars tôt le matin : à midi le sable brûle et l'ombre n'existe pas. Au retour, on rince le cheval à l'eau douce ; le sel qui sèche sur le poil irrite et raidit.",
          en:"Book the day before, be honest about your level — the swim needs an experienced rider — put your swimsuit on under your clothes, take a towel and something to change into, and ask for the tide time before the meeting time. Go early: at midday the sand burns and there is no shade. Afterwards the horse is rinsed with fresh water; salt drying on the coat irritates and stiffens it.",
          es:"Reserva el día antes, di tu nivel con franqueza —el baño exige jinete experimentado—, ponte el bañador debajo de la ropa, lleva una toalla y ropa para cambiarte, y pregunta la hora de la marea antes que la hora de la cita. Sal temprano: al mediodía la arena quema y no hay sombra. Al volver se aclara el caballo con agua dulce; la sal que se seca en la capa irrita y endurece.",
          it:"Prenota il giorno prima, di' il tuo livello con franchezza — il bagno richiede un cavaliere esperto —, mettiti il costume sotto i vestiti, porta un telo e qualcosa per cambiarti, e chiedi l'ora della marea prima dell'ora dell'appuntamento. Parti presto: a mezzogiorno la sabbia scotta e l'ombra non esiste. Al rientro si sciacqua il cavallo con acqua dolce; il sale che asciuga sul mantello irrita e indurisce.",
          de:"Buche am Vortag, sag dein Können ehrlich — für das Baden braucht es einen erfahrenen Reiter —, zieh die Badehose unter die Reitsachen, nimm ein Handtuch und Wechselkleidung mit, und frage nach der Tide, bevor du nach der Uhrzeit fragst. Reite früh: mittags brennt der Sand, und Schatten gibt es nicht. Danach wird das Pferd mit Süßwasser abgespült; trocknendes Salz im Fell reizt und macht es stumpf.",
          ja:"前日に予約し、自分の技量は正直に伝えること（水浴には経験が求められます）。水着は服の下に着ておき、タオルと着替えを持っていくこと。集合時刻より先に、潮の時刻を尋ねてください。朝の早い時間に出ること。正午の砂は焼けるように熱く、日陰はありません。帰ったら真水で馬を洗い流します。毛に乾いた塩は、皮膚を荒らし、毛を硬くします。"}}
    ]
  };

  /* ==================================================================
     ROME — ajoutée le 6 août 2026. « Rome c'est cool faut garder »,
     « fais Rome déjà ça c'est sûr ».
     Piazza di Siena, l'ovale de la Villa Borghese. Elle prend `concours`
     leçon 4 (les gens), qui était libre : le concurrent, le propriétaire,
     l'entraîneur, le jury, la réclamation, le règlement, la note
     minimale, le championnat, le trophée, l'esprit sportif.
     ⚠️ Rome ne figure PAS dans hype-linguae-production.txt ni dans la
     liste des huit destinations suivantes — c'est un ajout postérieur à
     ces documents. Sa leçon ne prend rien à personne (vérifié par calcul
     sur ETAPE_SRC), mais ses images restent à produire : ni
     `carte-rome.webp`, ni `fond-rome.webp`, ni `arrivee-rome.mp4`.
     Les replis les couvrent en attendant.
     ================================================================== */
  MONDE.rome = {
    lieu:"Villa Borghese · Roma", carte:true, niveau:2,
    image:"l'ovale de Piazza di Siena entre les pins",
    lettre:{
      fr:["On entend les klaxons de la ville par-dessus le mur du parc, et personne ne les écoute.",
          "Le cavalier suivant est entré au galop entre deux pins, et il n'y avait plus qu'un obstacle, une ombre et le bruit des sabots sur l'herbe."],
      en:["You can hear the city's horns over the wall of the park, and nobody is listening to them.",
          "The next rider came in at a canter between two pines, and there was nothing left but a fence, a shadow, and the sound of hooves on grass."],
      es:["Se oyen las bocinas de la ciudad por encima del muro del parque, y nadie las escucha.",
          "El jinete siguiente entró al galope entre dos pinos, y ya no quedaba más que un obstáculo, una sombra y el ruido de los cascos sobre la hierba."],
      it:["Si sentono i clacson della città oltre il muro del parco, e nessuno li ascolta.",
          "Il cavaliere successivo è entrato al galoppo tra due pini, e non restava che un ostacolo, un'ombra e il suono degli zoccoli sull'erba."],
      de:["Über die Mauer des Parks hört man die Hupen der Stadt, und niemand hört ihnen zu.",
          "Der nächste Reiter kam im Galopp zwischen zwei Pinien herein, und es blieb nur noch ein Hindernis, ein Schatten und das Geräusch der Hufe auf dem Rasen."],
      ja:["公園の壁の向こうから街のクラクションが聞こえてくるが、誰も聞いていない。",
          "次の騎手が二本の松のあいだから駈歩で入ってきた。あとに残るのは障害ひとつ、影ひとつ、そして芝を打つ蹄の音だけだった。"]},
    volets:[
      {t:{fr:"Piazza di Siena", en:"Piazza di Siena", es:"Piazza di Siena", it:"Piazza di Siena",
          de:"Piazza di Siena", ja:"ピアッツァ・ディ・シエナ"},
       c:{fr:"Un ovale de gazon dessiné dans les jardins de la Villa Borghese, en pleine ville, entouré de pins et de gradins de pierre. Le concours international s'y tient depuis 1926 : ce n'est pas un stade construit pour le sport, c'est un jardin dans lequel on a fini par sauter.",
          en:"An oval of grass laid out in the gardens of the Villa Borghese, in the middle of the city, ringed by pines and stone terraces. The international show has been held there since 1926: this is not a stadium built for sport, it is a garden people ended up jumping in.",
          es:"Un óvalo de hierba trazado en los jardines de Villa Borghese, en plena ciudad, rodeado de pinos y de graderías de piedra. El concurso internacional se celebra allí desde 1926: no es un estadio construido para el deporte, es un jardín en el que se acabó saltando.",
          it:"Un ovale d'erba disegnato nei giardini di Villa Borghese, in piena città, circondato da pini e da gradinate di pietra. Il concorso internazionale si tiene lì dal 1926: non è uno stadio costruito per lo sport, è un giardino in cui si è finito per saltare.",
          de:"Ein Grasoval, angelegt in den Gärten der Villa Borghese, mitten in der Stadt, umgeben von Pinien und steinernen Rängen. Das internationale Turnier findet dort seit 1926 statt: das ist kein für den Sport gebautes Stadion, sondern ein Garten, in dem man irgendwann zu springen begann.",
          ja:"ボルゲーゼ公園の庭園のなかに描かれた芝の楕円。街の真ん中にあり、松と石の観覧席が囲みます。国際大会は一九二六年から続いています。競技のために建てられた競技場ではなく、やがて障害を跳ぶことになった庭園です。"}},
      {t:{fr:"La Coupe des Nations", en:"The Nations Cup", es:"La Copa de las Naciones",
          it:"La Coppa delle Nazioni", de:"Der Nationenpreis", ja:"ネーションズカップ"},
       c:{fr:"Des équipes nationales, pas des individus : chacune envoie quatre cavaliers, chacun passe deux fois, et on additionne les fautes en laissant tomber le plus mauvais score. C'est l'épreuve où l'on découvre le vocabulaire des gens — le chef d'équipe, le jury, la réclamation, le règlement — parce que tout s'y décide entre adultes qui se connaissent.",
          en:"National teams, not individuals: each sends four riders, each rider goes twice, and the faults are added up with the worst score dropped. It is the class where you meet the vocabulary of people — the chef d'équipe, the ground jury, an objection, the rules — because everything there is settled between adults who know each other.",
          es:"Equipos nacionales, no individuos: cada uno manda cuatro jinetes, cada jinete pasa dos veces, y se suman las faltas descartando el peor resultado. Es la prueba donde aparece el vocabulario de la gente — el jefe de equipo, el jurado, la reclamación, el reglamento — porque allí todo se decide entre adultos que se conocen.",
          it:"Squadre nazionali, non individui: ognuna manda quattro cavalieri, ciascuno passa due volte, e si sommano le penalità scartando il peggior punteggio. È la prova in cui si incontra il vocabolario delle persone — il capo equipe, la giuria, il reclamo, il regolamento — perché lì tutto si decide fra adulti che si conoscono.",
          de:"Nationalmannschaften, keine Einzelreiter: jede schickt vier Reiter, jeder geht zweimal, und die Fehler werden addiert, das schlechteste Ergebnis fällt heraus. Es ist die Prüfung, in der man das Vokabular der Menschen kennenlernt — der Equipechef, die Richter, der Einspruch, das Reglement — weil dort alles zwischen Erwachsenen geregelt wird, die sich kennen.",
          ja:"個人ではなく国の代表チームで戦います。各国が四人を送り、それぞれが二回走行し、最も悪い成績を除いて減点を合計します。人にまつわる言葉——監督、審判団、異議、規定——に出会う競技です。すべてが、互いを知る大人たちのあいだで決まっていくからです。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Viens le matin plutôt que l'après-midi : les tribunes sont vides, les cavaliers reconnaissent le parcours à pied et comptent leurs foulées à voix haute, et tu entends ce qu'ils se disent. Entre par le parc et non par la rue — on arrive alors sur la piste sans savoir qu'elle est là.",
          en:"Come in the morning rather than the afternoon: the stands are empty, riders walk the course on foot counting their strides out loud, and you can hear what they say to each other. Come in through the park and not from the street — you then arrive on the arena without knowing it was there.",
          es:"Ven por la mañana antes que por la tarde: las gradas están vacías, los jinetes reconocen el recorrido a pie contando sus zancadas en voz alta, y oyes lo que se dicen. Entra por el parque y no por la calle: así llegas a la pista sin saber que estaba allí.",
          it:"Vieni la mattina invece del pomeriggio: le tribune sono vuote, i cavalieri ricognizionano il percorso a piedi contando le falcate a voce alta, e senti quello che si dicono. Entra dal parco e non dalla strada: si arriva sul campo senza sapere che era lì.",
          de:"Komm morgens statt nachmittags: die Tribünen sind leer, die Reiter gehen den Parcours ab und zählen ihre Galoppsprünge laut, und du hörst, was sie sich sagen. Komm durch den Park und nicht von der Straße — dann stehst du plötzlich am Platz, ohne gewusst zu haben, dass er dort ist.",
          ja:"午後よりも午前に行くこと。観覧席は空で、騎手たちは徒歩でコースを下見し、歩数を声に出して数えています。彼らが交わす言葉が聞こえます。通りからではなく公園を抜けて入ること。そうすれば、そこにあると知らないまま馬場に出ます。"}}
    ]
  };
  // ?? « depuis 1926 » : premiere edition du concours international de Piazza di Siena.
  //    Formulation prudente conservee, a confirmer avant publication.
  // ?? Le format de la Coupe des Nations (quatre cavaliers, deux tours, le plus
  //    mauvais score ecarte) est celui de la formule classique. Verifier qu'il
  //    correspond bien a l'edition romaine actuelle.

  /* ==================================================================
     GOLEGÃ — ajoutée le 6 août 2026, étape 15. Le chapitre de l'ÉLEVAGE
     (`hype-lingo-lex-elevage.js`), choisi sur délégation de Blandine.
     ⚠️ `arrivee-golega.mp4` existe. Manquent `carte-golega.webp` et
     `fond-golega.webp` — les replis les couvrent.
     ⚠️ Le nom porte un tilde ici, mais le panneau de la vidéo l'écrit
     GOLEGA sans tilde : c'était une consigne de production, un tilde mal
     rendu abîmait l'image. Ne pas s'en étonner.
     ================================================================== */
  MONDE.golega = {
    lieu:"Ribatejo · Portugal", carte:true, niveau:2,
    image:"la cour d'élevage dans la brume du matin",
    lettre:{
      fr:["On m'a montré la mère avant de me montrer le cheval.",
          "Puis la grand-mère, sur une photo punaisée au mur du bureau. J'ai compris que je ne regardais pas un cheval mais une suite, et que le poulain dans la cour en était la dernière ligne."],
      en:["They showed me the mother before they showed me the horse.",
          "Then the grandmother, in a photograph pinned to the office wall. I understood that I was not looking at a horse but at a sequence, and that the foal in the yard was its latest line."],
      es:["Me mostraron a la madre antes de mostrarme el caballo.",
          "Luego a la abuela, en una foto clavada en la pared de la oficina. Entendí que no estaba mirando un caballo sino una sucesión, y que el potro del patio era su última línea."],
      it:["Mi hanno mostrato la madre prima di mostrarmi il cavallo.",
          "Poi la nonna, in una fotografia appuntata al muro dell'ufficio. Ho capito che non guardavo un cavallo ma una successione, e che il puledro nel cortile ne era l'ultima riga."],
      de:["Man zeigte mir die Mutter, bevor man mir das Pferd zeigte.",
          "Dann die Großmutter, auf einem Foto an der Bürowand. Ich begriff, dass ich kein Pferd ansah, sondern eine Folge — und dass das Fohlen im Hof deren letzte Zeile war."],
      ja:["馬を見せられる前に、その母を見せられた。",
          "次に祖母を、事務所の壁に留められた写真で。自分が見ていたのは一頭の馬ではなく連なりで、中庭にいる子馬はその最新の一行なのだと分かった。"]},
    volets:[
      {t:{fr:"Le lusitanien", en:"The Lusitano", es:"El lusitano", it:"Il lusitano",
          de:"Der Lusitano", ja:"ルシタノ"},
       c:{fr:"La race du Portugal : encolure ronde et haute, crins longs, un cheval remarquablement maniable, façonné par des siècles de travail devant le taureau. Il partage ses origines avec le pura raza española, dont il n'a été officiellement séparé qu'en 1967 — deux stud-books là où il n'y en avait qu'un.",
          en:"Portugal's breed: a round, high-set neck, long mane, a remarkably handy horse shaped by centuries of work in front of the bull. It shares its origins with the pura raza española, from which it was only officially separated in 1967 — two stud books where there had been one.",
          es:"La raza de Portugal: cuello redondo y alto, crines largas, un caballo notablemente manejable, formado por siglos de trabajo ante el toro. Comparte su origen con el pura raza española, del que solo fue separado oficialmente en 1967: dos libros genealógicos donde había uno.",
          it:"La razza del Portogallo: incollatura tonda e alta, criniera lunga, un cavallo straordinariamente maneggevole, formato da secoli di lavoro davanti al toro. Condivide le origini con il pura raza española, da cui è stato separato ufficialmente solo nel 1967: due libri genealogici dove ce n'era uno.",
          de:"Portugals Rasse: ein runder, hoch angesetzter Hals, lange Mähne, ein bemerkenswert wendiges Pferd, geformt von Jahrhunderten Arbeit vor dem Stier. Es teilt seine Herkunft mit dem Pura Raza Española, von dem es erst 1967 offiziell getrennt wurde — zwei Zuchtbücher, wo es eines gab.",
          ja:"ポルトガルの品種。丸く高く付いた頸、長いたてがみ。牛を相手にする何世紀もの仕事が形づくった、きわめて器用な馬です。プラ・ラサ・エスパニョーラと起源を同じくし、公式に分けられたのは一九六七年のこと。ひとつだった血統登録簿が、二つになりました。"}},
      {t:{fr:"D'où vient un cheval", en:"Where a horse comes from", es:"De dónde viene un caballo",
          it:"Da dove viene un cavallo", de:"Woher ein Pferd kommt", ja:"馬はどこから来るか"},
       c:{fr:"Une jument porte onze mois, met bas presque toujours la nuit, et son poulain est sevré vers cinq ou six mois. Entre-temps quelqu'un a choisi l'étalon, inscrit la naissance au stud-book et parié sur une lignée qui ne se vérifiera que dans quatre ans. C'est le seul métier du cheval où l'on travaille pour une génération qu'on ne montera pas.",
          en:"A mare carries for eleven months, almost always foals at night, and her foal is weaned at around five or six months. In between, someone chose the stallion, entered the birth in the stud book and bet on a bloodline that will not prove itself for four years. It is the one horse trade where you work for a generation you will not ride.",
          es:"Una yegua lleva once meses, pare casi siempre de noche, y su potro se desteta hacia los cinco o seis meses. Entretanto alguien eligió el semental, inscribió el nacimiento en el libro genealógico y apostó por una línea que no se comprobará hasta dentro de cuatro años. Es el único oficio del caballo en el que se trabaja para una generación que no se montará.",
          it:"Una cavalla porta undici mesi, figlia quasi sempre di notte, e il suo puledro viene svezzato verso i cinque o sei mesi. Nel frattempo qualcuno ha scelto lo stallone, iscritto la nascita nel libro genealogico e scommesso su una linea che si verificherà solo fra quattro anni. È il solo mestiere del cavallo in cui si lavora per una generazione che non si monterà.",
          de:"Eine Stute trägt elf Monate, fohlt fast immer nachts, und ihr Fohlen wird mit etwa fünf oder sechs Monaten abgesetzt. Dazwischen hat jemand den Hengst gewählt, die Geburt ins Zuchtbuch eingetragen und auf eine Blutlinie gesetzt, die sich erst in vier Jahren zeigt. Es ist der einzige Pferdeberuf, in dem man für eine Generation arbeitet, die man nicht reiten wird.",
          ja:"牝馬は十一か月を経て、ほとんどの場合は夜に子を産み、子馬は五、六か月で離乳します。そのあいだに誰かが種牡馬を選び、出生を血統登録簿に記し、四年後にしか答えの出ない血統に賭けています。自分が乗ることのない世代のために働く、馬の仕事のなかで唯一のものです。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Viens en novembre, pendant la foire, mais arrive tôt le matin plutôt qu'à l'heure des défilés : c'est dans les cours, avant l'ouverture, qu'on parle vraiment de lignées. Et pose la question qu'on pose ici avant toutes les autres — non pas ce que le cheval sait faire, mais de qui il est né.",
          en:"Come in November for the fair, but arrive early in the morning rather than at parade time: it is in the yards, before the gates open, that bloodlines are really discussed. And ask the question that comes first here — not what the horse can do, but who he is out of.",
          es:"Ven en noviembre, durante la feria, pero llega temprano por la mañana y no a la hora de los desfiles: es en los patios, antes de abrir, donde de verdad se habla de líneas. Y haz la pregunta que aquí se hace antes que ninguna: no qué sabe hacer el caballo, sino de quién ha nacido.",
          it:"Vieni in novembre, durante la fiera, ma arriva presto al mattino invece che all'ora delle sfilate: è nei cortili, prima dell'apertura, che si parla davvero di linee. E fai la domanda che qui viene prima di tutte: non che cosa sa fare il cavallo, ma da chi è nato.",
          de:"Komm im November zum Markt, aber morgens früh und nicht zur Zeit der Umzüge: in den Höfen, vor dem Öffnen, wird wirklich über Blutlinien geredet. Und stell die Frage, die hier vor allen anderen kommt — nicht, was das Pferd kann, sondern von wem es abstammt.",
          ja:"十一月の市の時期に、しかし行進の時刻ではなく朝の早い時間に着くこと。開場前の中庭でこそ、血統の話が本当に交わされます。そしてここで何より先に問われる問いを、あなたも問うてください。その馬が何をできるかではなく、誰から生まれたのかを。"}}
    ]
  };
  // ?? La separation officielle du lusitanien et du pura raza espanola en 1967 :
  //    date couramment citee, a confirmer avant publication.
  // ?? La foire de Golega (Feira Nacional do Cavalo) se tient en novembre.
  //    Formulation prudente : « depuis des siecles », sans date de fondation.

  /* ajout clé par clé : on ne remplace jamais une ville déjà présente */
  var k;
  for(k in MONDE){
    if(Object.prototype.hasOwnProperty.call(MONDE,k) &&
       !Object.prototype.hasOwnProperty.call(window.HYPE_LINGO_VILLES,k)){
      window.HYPE_LINGO_VILLES[k] = MONDE[k];
    }
  }
})();
