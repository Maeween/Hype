/* hype-lingo-villes-monde.js — Hype Linguae · les dix-neuf villes du monde
   ==================================================================
   Saumur · Lamotte-Beuvron · Jerez · Séville · Vejer · Oliva Nova ·
   Warendorf · Aix-la-Chapelle · La Baule · Le Morne · Dubaï — et les
   CINQ dernières, ajoutées le 7 août 2026 en queue de fichier (sections
   `MONDE.<ref> = {…};`, comme Dubaï) : Tokyo · Tamworth · Buenos Aires ·
   Lexington · Spruce Meadows. Avec les dix de hype-lingo-villes.js, les
   29 étapes du voyage ont désormais toutes leur entrée.

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
          "Le cheval est entré dans le lagon comme s'il rentrait chez lui. À un moment ses pieds ont quitté le fond, j'ai lâché la rêne comme on me l'avait dit, et il a nagé. Je n'ai jamais rien vécu d'aussi grisant."],
      en:["The water came up to the saddle, and I realised the ride was only starting there.",
          "The horse walked into the lagoon as if he were going home. At some point his feet left the bottom, I let the rein go as I had been told, and he swam. I have never felt anything so exhilarating."],
      es:["El agua subió hasta la silla, y entendí que el paseo empezaba justo allí.",
          "El caballo entró en la laguna como si volviera a su casa. En un momento sus pies dejaron el fondo, solté la rienda como me habían dicho, y nadó. Nunca he vivido nada tan emocionante."],
      it:["L'acqua è salita fino alla sella, e ho capito che la passeggiata cominciava solo lì.",
          "Il cavallo è entrato nella laguna come se tornasse a casa. A un certo punto i suoi piedi hanno lasciato il fondo, ho mollato la redine come mi avevano detto, e ha nuotato. Non ho mai vissuto niente di così esaltante."],
      de:["Das Wasser stieg bis zum Sattel, und da begriff ich, dass der Ausritt erst dort anfing.",
          "Das Pferd ging in die Lagune, als käme es nach Hause. Irgendwann verließen seine Hufe den Grund, ich gab den Zügel nach, wie man es mir gesagt hatte, und es schwamm. Ich habe noch nie etwas so Berauschendes erlebt."],
      ja:["水が鞍まで上がってきたとき、外乗はここから始まるのだと分かった。",
          "馬は自分の家に帰るようにラグーンへ入っていった。あるところで蹄が底を離れ、言われたとおり手綱をゆるめると、馬は泳いだ。あんなに胸が高鳴ったことはない。"]},
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
       c:{fr:"On dessine la sortie autour de la marée, pas autour de l'horaire : à marée basse la bande de sable mouillé porte le galop, à marée haute il n'y a plus de plage. On reste en selle : l'eau monte jusqu'à la selle et le cheval nage avec toi dessus. Quand les pieds quittent le fond, il nage tout seul ; la seule chose à faire est de lui laisser la tête libre. La baignade est réservée aux cavaliers déjà confirmés, et il faut savoir nager.",
          en:"The ride is planned around the tide, not the timetable: at low tide the strip of wet sand carries a canter, at high tide there is no beach left. You stay in the saddle: the water rises to it and the horse swims with you on its back. When the hooves leave the bottom it swims by itself; the only thing to do is leave its head free. The swim is for experienced riders only, and you must be able to swim.",
          es:"La salida se organiza según la marea, no según el horario: con marea baja la franja de arena mojada aguanta el galope, con marea alta no queda playa. Se queda uno en la silla: el agua sube hasta ella y el caballo nada contigo encima. Cuando los cascos dejan el fondo, nada solo; lo único que hay que hacer es dejarle la cabeza libre. El baño es solo para jinetes experimentados, y hay que saber nadar.",
          it:"L'uscita si organizza sulla marea, non sull'orario: con la marea bassa la striscia di sabbia bagnata regge il galoppo, con la marea alta non c'è più spiaggia. Si resta in sella: l'acqua sale fino alla sella e il cavallo nuota con te sopra. Quando gli zoccoli lasciano il fondo, nuota da sé; l'unica cosa da fare è lasciargli la testa libera. Il bagno è riservato ai cavalieri esperti, e bisogna saper nuotare.",
          de:"Der Ausritt richtet sich nach der Tide, nicht nach dem Stundenplan: bei Ebbe trägt der Streifen nassen Sandes den Galopp, bei Flut bleibt kein Strand übrig. Man bleibt im Sattel: das Wasser steigt bis zum Sattel, und das Pferd schwimmt mit dir darauf. Verlassen die Hufe den Grund, schwimmt es von selbst; das Einzige, was zu tun ist: den Kopf frei lassen. Das Baden ist erfahrenen Reitern vorbehalten, und schwimmen können muss man.",
          ja:"出発は時刻表ではなく潮で決めます。引き潮なら濡れた砂の帯が駈歩を支え、満ち潮では浜そのものがなくなります。鞍には乗ったままです。水は鞍の高さまで上がり、馬はあなたを乗せて泳ぎます。蹄が底を離れれば馬は自分で泳ぎます。こちらがすべきことは、頭を自由にしてやることだけです。水浴は経験のある騎乗者に限られ、泳げることが条件です。"}},
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

  /* ==================================================================
     VÉRONE — ajoutée le 6 août 2026, étape 21. Le chapitre du COMMERCE.
     ⚠️ Aucune de ses images n'existe : ni carte, ni fond, ni clip. Les
     replis les couvrent.
     ⚠️ Ville de NIVEAU 3 : c'est le chapitre où l'on parle. Les volets
     sont écrits pour donner de quoi dire, pas seulement de quoi nommer.
     ================================================================== */
  MONDE.verone = {
    lieu:"Veneto · Italia", carte:true, niveau:3,
    image:"les allées de boxes de la foire, un matin de novembre",
    lettre:{
      fr:["J'ai dit mon budget en entrant, et tout est devenu simple.",
          "On m'a montré quatre chevaux au lieu de quarante. Le troisième était trop jeune pour moi et le marchand l'a dit lui-même, avant que je le demande. C'est là que j'ai compris à qui j'avais affaire."],
      en:["I said my budget as I walked in, and everything became simple.",
          "They showed me four horses instead of forty. The third was too young for me and the dealer said so himself, before I asked. That is when I understood who I was dealing with."],
      es:["Dije mi presupuesto al entrar, y todo se volvió sencillo.",
          "Me mostraron cuatro caballos en lugar de cuarenta. El tercero era demasiado joven para mí y el tratante lo dijo él mismo, antes de que yo preguntara. Ahí entendí con quién estaba tratando."],
      it:["Ho detto il mio budget entrando, e tutto è diventato semplice.",
          "Mi hanno mostrato quattro cavalli invece di quaranta. Il terzo era troppo giovane per me e il commerciante l'ha detto lui stesso, prima che lo chiedessi. È lì che ho capito con chi avevo a che fare."],
      de:["Ich habe mein Budget genannt, als ich hereinkam, und alles wurde einfach.",
          "Man zeigte mir vier Pferde statt vierzig. Das dritte war mir zu jung, und der Händler sagte es selbst, bevor ich fragte. Da begriff ich, mit wem ich es zu tun hatte."],
      ja:["入るときに予算を告げた。それで、すべてが簡単になった。",
          "四十頭ではなく四頭を見せてくれた。三頭目は私には若すぎたが、それを馬商のほうが、私が尋ねる前に言った。相手がどういう人か、そのとき分かった。"]},
    volets:[
      {t:{fr:"Fieracavalli", en:"Fieracavalli", es:"Fieracavalli", it:"Fieracavalli",
          de:"Fieracavalli", ja:"フィエラカヴァッリ"},
       c:{fr:"La grande foire du cheval italienne, à Vérone, chaque automne depuis 1898. Toutes les races au même endroit, des lusitaniens aux chevaux de trait, et derrière chaque box quelqu'un qui attend qu'on lui pose une question. Ce n'est pas la feria andalouse : ici on ne défile pas, on conclut.",
          en:"Italy's great horse fair, in Verona, every autumn since 1898. Every breed in one place, from Lusitanos to draught horses, and behind each stall someone waiting to be asked a question. This is not the Andalusian feria: nobody parades here, deals are done.",
          es:"La gran feria del caballo italiana, en Verona, cada otoño desde 1898. Todas las razas en el mismo sitio, de lusitanos a caballos de tiro, y detrás de cada box alguien esperando una pregunta. No es la feria andaluza: aquí no se desfila, se cierra.",
          it:"La grande fiera del cavallo italiana, a Verona, ogni autunno dal 1898. Tutte le razze nello stesso posto, dai lusitani ai cavalli da tiro, e dietro ogni box qualcuno che aspetta una domanda. Non è la feria andalusa: qui non si sfila, si conclude.",
          de:"Italiens große Pferdemesse, in Verona, jeden Herbst seit 1898. Alle Rassen an einem Ort, von Lusitanos bis zu Kaltblütern, und hinter jeder Box jemand, der auf eine Frage wartet. Das ist nicht die andalusische Feria: hier wird nicht defiliert, hier wird abgeschlossen.",
          ja:"イタリア最大の馬の見本市。ヴェローナで、一八九八年から毎秋開かれています。ルシタノから輓馬まで、あらゆる品種がひとつの場所に集まり、どの馬房の奥にも、問われるのを待っている人がいます。アンダルシアのフェリアとは違います。ここでは行進はせず、取引が成立します。"}},
      {t:{fr:"Ce qui protège vraiment", en:"What actually protects you", es:"Lo que de verdad protege",
          it:"Quello che protegge davvero", de:"Was wirklich schützt", ja:"本当に守ってくれるもの"},
       c:{fr:"Pas la parole du vendeur : la visite d'achat, faite par TON vétérinaire et payée par toi. Les radiographies ne disent pas que le cheval va bien, elles disent ce qui pourrait arriver. Demande le passeport avant tout le reste — sans lui il n'y a ni vente légale, ni déplacement possible. Et ce qu'on te dit spontanément vaut plus que ce qu'on te répond.",
          en:"Not the seller's word: the vetting, done by YOUR vet and paid for by you. X-rays do not say the horse is sound, they say what might happen. Ask for the passport before anything else — without it there is no legal sale and no legal movement. And what you are told unprompted is worth more than what you are answered.",
          es:"No la palabra del vendedor: la revisión veterinaria, hecha por TU veterinario y pagada por ti. Las radiografías no dicen que el caballo esté bien, dicen lo que podría pasar. Pide el pasaporte antes que nada: sin él no hay venta legal ni traslado posible. Y lo que te dicen sin preguntar vale más que lo que te contestan.",
          it:"Non la parola del venditore: la visita d'acquisto, fatta dal TUO veterinario e pagata da te. Le radiografie non dicono che il cavallo sta bene, dicono cosa potrebbe succedere. Chiedi il passaporto prima di ogni altra cosa: senza di esso non c'è vendita legale né spostamento possibile. E quello che ti dicono senza chiederlo vale più di quello che ti rispondono.",
          de:"Nicht das Wort des Verkäufers: die Ankaufsuntersuchung, gemacht von DEINEM Tierarzt und von dir bezahlt. Röntgenbilder sagen nicht, dass das Pferd gesund ist, sie sagen, was passieren könnte. Frage vor allem anderen nach dem Equidenpass — ohne ihn gibt es keinen legalen Verkauf und keinen legalen Transport. Und was man dir unaufgefordert sagt, ist mehr wert als das, was man dir antwortet.",
          ja:"売り手の言葉ではありません。あなたの獣医が行い、あなたが支払う購買前検査です。レントゲンは「健全だ」とは言いません。何が起こり得るかを語るだけです。何より先にパスポートを求めること。それなしには合法な売買も、移動もできません。そして、尋なくても告げられたことは、尋ねて答えられたことより重い。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Annonce ton budget dès la première phrase : on te montrera les chevaux qui existent pour toi au lieu de te faire traverser la foire. Demande à sortir le cheval du box toi-même, à le panser, puis à le monter seul — pas seulement à le regarder travailler. Et repars sans rien acheter le premier jour : un cheval qu'on te garde vingt-quatre heures est un cheval qu'on t'aurait vendu quand même.",
          en:"State your budget in your first sentence: you will be shown the horses that exist for you instead of walking the whole fair. Ask to bring the horse out of the stall yourself, to groom it, then to ride it alone — not just to watch it work. And leave without buying on the first day: a horse held for you for twenty-four hours is a horse that would have been sold to you anyway.",
          es:"Di tu presupuesto en la primera frase: te mostrarán los caballos que existen para ti en lugar de hacerte cruzar la feria. Pide sacar el caballo del box tú misma, cepillarlo y luego montarlo sola, no solo verlo trabajar. Y vete sin comprar el primer día: un caballo que te guardan veinticuatro horas es un caballo que te habrían vendido igual.",
          it:"Di' il tuo budget nella prima frase: ti mostreranno i cavalli che esistono per te invece di farti attraversare la fiera. Chiedi di tirare fuori il cavallo dal box tu stessa, di pulirlo, poi di montarlo da sola, non solo di guardarlo lavorare. E vai via senza comprare il primo giorno: un cavallo che ti tengono ventiquattr'ore è un cavallo che ti avrebbero venduto comunque.",
          de:"Nenne dein Budget im ersten Satz: man zeigt dir die Pferde, die für dich existieren, statt dich durch die ganze Messe zu schicken. Bitte darum, das Pferd selbst aus der Box zu holen, es zu putzen und es dann allein zu reiten — nicht nur zuzusehen. Und geh am ersten Tag ohne Kauf: ein Pferd, das man dir vierundzwanzig Stunden reserviert, hätte man dir ohnehin verkauft.",
          ja:"最初のひと言で予算を告げること。見本市を歩き回らされる代わりに、自分のために存在する馬を見せてもらえます。馬房から自分で出し、手入れをし、そして一人で乗せてもらうこと。働くところを見るだけで終わらせないこと。そして初日は買わずに帰ること。二十四時間取り置きしてくれる馬は、どうせ売ってもらえた馬です。"}}
    ]
  };
  // ?? Fieracavalli « depuis 1898 » : date couramment citee pour la premiere
  //    edition. A confirmer avant publication.

  /* ==================================================================
     DUBAÏ — ajoutée le 6 août 2026, étape 24. Le chapitre de L'ENDURANCE.
     Première étape hors d'Europe et de Maurice.
     ⚠️ Son clip existe (`arrivee-dubai.mp4`), mais son panneau est coupé :
     le clip s'arrête à 2,9 s, au sommet du saut (voir FIN_VIDEO).
     ⚠️ Manquent `carte-dubai.webp` et `fond-dubai.webp`.
     ================================================================== */
  MONDE.dubai = {
    lieu:"Al Marmoum · الإمارات", carte:true, niveau:2,
    image:"la piste de sable au bord du désert, avant le lever du jour",
    lettre:{
      fr:["Personne ne parle de gagner. On parle de terminer.",
          "À chaque boucle, le vétérinaire écoute le cœur et fait trotter le cheval en main sur vingt mètres. C'est lui qui dit si tu repars. J'ai vu un cavalier arrêter à cent trente kilomètres, de lui-même, et tout le monde lui a serré la main."],
      en:["Nobody talks about winning. They talk about finishing.",
          "At every loop the vet listens to the heart and has the horse trotted up in hand for twenty metres. He is the one who says whether you go on. I saw a rider stop at a hundred and thirty kilometres, of his own accord, and everyone shook his hand."],
      es:["Nadie habla de ganar. Se habla de terminar.",
          "En cada vuelta el veterinario escucha el corazón y hace trotar al caballo de la mano veinte metros. Es él quien dice si sigues. Vi a un jinete parar a ciento treinta kilómetros, por decisión propia, y todo el mundo le dio la mano."],
      it:["Nessuno parla di vincere. Si parla di finire.",
          "A ogni giro il veterinario ascolta il cuore e fa trottare il cavallo a mano per venti metri. È lui che dice se riparti. Ho visto un cavaliere fermarsi a centotrenta chilometri, da sé, e tutti gli hanno stretto la mano."],
      de:["Niemand spricht davon zu gewinnen. Man spricht davon anzukommen.",
          "Bei jeder Schleife hört der Tierarzt das Herz ab und lässt das Pferd zwanzig Meter an der Hand traben. Er sagt, ob du weiterreitest. Ich habe einen Reiter bei hundertdreißig Kilometern von sich aus aufhören sehen, und alle haben ihm die Hand gegeben."],
      ja:["誰も勝つ話をしない。完走する話をする。",
          "一周ごとに獣医が心音を聴き、二十メートル引き馬で常歩と速歩を見る。続けられるかを決めるのは彼だ。百三十キロで自ら止めた騎手を見た。誰もがその手を握っていた。"]},
    volets:[
      {t:{fr:"Cent soixante kilomètres", en:"A hundred and sixty kilometres",
          es:"Ciento sesenta kilómetros", it:"Centosessanta chilometri",
          de:"Hundertsechzig Kilometer", ja:"百六十キロ"},
       c:{fr:"La plus longue épreuve se court en un seul jour, découpée en boucles qui ramènent toujours au même point. Entre chaque boucle, un contrôle vétérinaire obligatoire. Le classement ne récompense pas la vitesse pure : il tient compte du temps de récupération, donc arriver premier ne sert à rien si le cœur met vingt minutes à redescendre.",
          en:"The longest ride is run in a single day, cut into loops that always return to the same point. Between each loop, a compulsory vet gate. The placings do not reward raw speed: recovery time counts, so arriving first is worth nothing if the heart takes twenty minutes to come down.",
          es:"La prueba más larga se corre en un solo día, dividida en vueltas que siempre regresan al mismo punto. Entre cada vuelta, un control veterinario obligatorio. La clasificación no premia la velocidad pura: cuenta el tiempo de recuperación, así que llegar primero no sirve si el corazón tarda veinte minutos en bajar.",
          it:"La prova più lunga si corre in un solo giorno, divisa in giri che riportano sempre allo stesso punto. Fra ogni giro, un controllo veterinario obbligatorio. La classifica non premia la velocità pura: conta il tempo di recupero, quindi arrivare primi non serve se il cuore ci mette venti minuti a scendere.",
          de:"Der längste Ritt wird an einem Tag geritten, in Schleifen aufgeteilt, die immer zum selben Punkt zurückführen. Zwischen jeder Schleife eine verpflichtende Vetgate. Die Platzierung belohnt nicht die reine Geschwindigkeit: die Erholungszeit zählt, also nützt das erste Ankommen nichts, wenn das Herz zwanzig Minuten braucht.",
          ja:"最長の競技は一日で走り切ります。コースはループに分かれ、いつも同じ地点へ戻ってきます。ループごとに獣医検査が義務づけられています。順位は速さだけでは決まりません。回復にかかった時間が数えられるため、心拍が下がるのに二十分かかるなら、一番に着いても意味がありません。"}},
      {t:{fr:"Le vétérinaire décide", en:"The vet decides", es:"El veterinario decide",
          it:"Decide il veterinario", de:"Der Tierarzt entscheidet", ja:"決めるのは獣医"},
       c:{fr:"À chaque contrôle : le rythme cardiaque, l'hydratation, le dos, et le cheval trotté en main sur quelques mètres. S'il n'est pas régulier, la course s'arrête là, sans discussion. C'est la seule discipline où l'élimination pour boiterie est la sortie la plus fréquente, et où l'abandon volontaire est considéré comme une bonne décision plutôt qu'un échec.",
          en:"At every gate: heart rate, hydration, back, and the horse trotted up in hand for a few metres. If it is not level, the ride ends there, without discussion. It is the only discipline where elimination for lameness is the commonest exit, and where retiring voluntarily counts as a good decision rather than a failure.",
          es:"En cada control: la frecuencia cardíaca, la hidratación, el dorso, y el caballo trotado de la mano unos metros. Si no está regular, la carrera acaba allí, sin discusión. Es la única disciplina donde la eliminación por cojera es la salida más frecuente, y donde retirarse voluntariamente se considera una buena decisión y no un fracaso.",
          it:"A ogni controllo: la frequenza cardiaca, l'idratazione, il dorso, e il cavallo trottato a mano per qualche metro. Se non è regolare, la gara finisce lì, senza discussione. È la sola disciplina in cui l'eliminazione per zoppia è l'uscita più frequente, e in cui ritirarsi di propria volontà è considerata una buona decisione e non un fallimento.",
          de:"Bei jeder Gate: Herzfrequenz, Hydrierung, Rücken, und das Pferd wird einige Meter an der Hand vorgetrabt. Geht es nicht klar, endet der Ritt dort, ohne Diskussion. Es ist die einzige Disziplin, in der der Ausschluss wegen Lahmheit der häufigste Abgang ist — und in der freiwilliges Aufgeben als gute Entscheidung gilt, nicht als Scheitern.",
          ja:"検査のたびに、心拍数、脱水の程度、背中を見られ、馬は引かれて数メートル速歩をします。歩様が揃っていなければ、競技はそこで終わり、議論はありません。歩様不良による失格が最も多い退場理由である唯一の種目であり、自らの棄権が失敗ではなく良い判断とみなされる唯一の種目です。"}},
      {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi",
          de:"Wenn du hinführest", ja:"もし行くなら"},
       c:{fr:"Ne viens pas monter, viens à l'assistance : c'est de là qu'on comprend la discipline. Tu attends au contrôle avec l'eau et les seaux, tu verses dès l'arrivée sans attendre, sur l'encolure et les membres, et tu regardes le chiffre descendre. Les départs se font de nuit pour éviter la chaleur — la journée commence vers trois heures du matin.",
          en:"Do not come to ride, come to crew: that is where you understand the sport. You wait at the gate with water and buckets, you pour the moment the horse arrives, over neck and legs, and you watch the number come down. Starts are at night to avoid the heat — the day begins around three in the morning.",
          es:"No vengas a montar, ven a la asistencia: es desde ahí que se entiende la disciplina. Esperas en el control con el agua y los cubos, echas en cuanto llega, sobre el cuello y las extremidades, y miras bajar la cifra. Las salidas son de noche para evitar el calor: el día empieza hacia las tres de la mañana.",
          it:"Non venire a cavalcare, vieni all'assistenza: è da lì che si capisce la disciplina. Aspetti al controllo con l'acqua e i secchi, versi appena arriva, sull'incollatura e sugli arti, e guardi scendere il numero. Le partenze sono di notte per evitare il caldo: la giornata comincia verso le tre del mattino.",
          de:"Komm nicht zum Reiten, komm zur Betreuung: von dort versteht man den Sport. Du wartest an der Gate mit Wasser und Eimern, du kühlst sofort bei der Ankunft, über Hals und Beine, und siehst die Zahl sinken. Gestartet wird nachts, um der Hitze auszuweichen — der Tag beginnt gegen drei Uhr morgens.",
          ja:"乗るためではなく、サポートとして行くこと。そこからしか、この競技は分かりません。水とバケツを持って検査地点で待ち、馬が着いた瞬間から首と脚に水をかけ、数字が下がるのを見ます。暑さを避けるため出発は夜。一日は午前三時ごろに始まります。"}}
    ]
  };
  // ?? « cent soixante kilometres » pour la plus longue epreuve en un jour :
  //    formulation prudente, a confirmer avant publication.
  // ?? Le seuil de 64 battements par minute est celui couramment applique,
  //    mais il varie selon le reglement de l'epreuve. Verifier.

/* ============ TOKYO · la tradition ============ */
  /* Ajoutée le 7 août 2026 avec les quatre suivantes : les CINQ dernières
     étapes du voyage n'avaient jamais reçu leur entrée — c'est ce qui
     laissait la page de Spruce Meadows sans carte (voir session 135 du
     SUIVI). Même structure et mêmes six langues que les quatorze autres. */
  MONDE.tokyo = {
    lieu:"Tōkyō · Japan", carte:false, niveau:3,
    image:"la cible qui éclate au galop, sous les arbres du sanctuaire",
    lettre:{
      fr:["J'ai entendu le résultat avant de le voir.","Le cheval est passé au galop dans l'allée du sanctuaire, l'archer a lâché sa flèche, et la planche de bois a claqué. Personne n'a applaudi pendant le passage — on s'est incliné, et moi aussi."],
      en:["I heard the result before I saw it.","The horse galloped down the shrine track, the archer released his arrow, and the wooden board cracked. Nobody clapped during the run — everyone bowed, and so did I."],
      es:["Oí el resultado antes de verlo.","El caballo pasó al galope por la avenida del santuario, el arquero soltó su flecha y la tabla de madera estalló. Nadie aplaudió durante el paso — todos se inclinaron, y yo también."],
      it:["Ho sentito il risultato prima di vederlo.","Il cavallo è passato al galoppo nel viale del santuario, l'arciere ha lasciato la freccia, e la tavola di legno ha schioccato. Nessuno ha applaudito durante il passaggio — tutti si sono inchinati, e anch'io."],
      de:["Ich hörte das Ergebnis, bevor ich es sah.","Das Pferd galoppierte die Bahn des Schreins entlang, der Schütze ließ den Pfeil los, und das Holzbrett zerbarst. Niemand klatschte während des Ritts — alle verbeugten sich, und ich auch."],
      ja:["結果は、見るより先に聞こえた。","馬が神社の馬場を駆け抜け、射手が矢を放ち、木の的が乾いた音を立てて割れた。走る間、誰も拍手をしなかった。みんなが礼をして、私もそうした。"]},
    volets:[
     {t:{fr:"Le yabusame", en:"Yabusame", es:"El yabusame", it:"Lo yabusame", de:"Yabusame", ja:"流鏑馬"},
      c:{
          fr:"Le tir à l'arc à cheval, au galop, sur des cibles alignées le long d'une piste droite. C'est un rite avant d'être un sport : il se court dans l'enceinte de sanctuaires, et la tenue du cavalier compte autant que la précision de ses flèches.",
          en:"Mounted archery at the gallop, at targets set along a straight track. It is a rite before it is a sport: it is run within shrine grounds, and the rider's bearing counts as much as the accuracy of his arrows.",
          es:"El tiro con arco a caballo, al galope, sobre blancos alineados a lo largo de una pista recta. Es un rito antes que un deporte: se corre en el recinto de santuarios, y la compostura del jinete cuenta tanto como la precisión de sus flechas.",
          it:"Il tiro con l'arco a cavallo, al galoppo, su bersagli allineati lungo una pista dritta. È un rito prima di essere uno sport: si corre nel recinto dei santuari, e il portamento del cavaliere conta quanto la precisione delle sue frecce.",
          de:"Bogenschießen zu Pferd, im Galopp, auf Ziele entlang einer geraden Bahn. Es ist ein Ritus, bevor es ein Sport ist: Es wird auf dem Gelände von Schreinen geritten, und die Haltung des Reiters zählt so viel wie die Genauigkeit seiner Pfeile.",
          ja:"疾走する馬上から、直線馬場に並ぶ的を射る弓術。スポーツである前に神事であり、神社の境内で行われ、的中の正確さと同じくらい騎手の所作が重んじられます。"}},
     {t:{fr:"Huit siècles de transmission", en:"Eight centuries handed down", es:"Ocho siglos de transmisión", it:"Otto secoli di trasmissione", de:"Acht Jahrhunderte Überlieferung", ja:"八百年の継承"},
      c:{
          fr:"Le yabusame se transmet depuis l'époque des samouraïs, d'écoles en écoles, de maître à élève. On n'y entre pas par un concours mais par un apprentissage : des années à observer, à répéter le geste à pied, avant de le faire au galop.",
          en:"Yabusame has been handed down since the age of the samurai, school by school, master to pupil. You do not enter it through a competition but through an apprenticeship: years of watching and repeating the movement on foot before doing it at the gallop.",
          es:"El yabusame se transmite desde la época de los samuráis, de escuela en escuela, de maestro a alumno. No se entra por un concurso sino por un aprendizaje: años observando y repitiendo el gesto a pie antes de hacerlo al galope.",
          it:"Lo yabusame si tramanda dall'epoca dei samurai, di scuola in scuola, da maestro ad allievo. Non vi si entra con una gara ma con un apprendistato: anni a osservare e ripetere il gesto a piedi prima di farlo al galoppo.",
          de:"Yabusame wird seit der Zeit der Samurai weitergegeben, von Schule zu Schule, vom Meister zum Schüler. Man kommt nicht über einen Wettkampf hinein, sondern über eine Lehre: Jahre des Zusehens und des Übens zu Fuß, bevor man es im Galopp tut.",
          ja:"流鏑馬は侍の時代から、流派から流派へ、師から弟子へと受け継がれてきました。入口は競技会ではなく稽古です。何年も見て、徒歩で所作を繰り返し、それから初めて馬上で行います。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Vise l'automne : plusieurs grands sanctuaires de Tokyo et des environs donnent alors leurs cérémonies de yabusame. Arrive tôt, place-toi près d'une cible, et écoute — le claquement du bois s'entend avant que les applaudissements n'osent partir.",
          en:"Aim for autumn: several great shrines in and around Tokyo hold their yabusame ceremonies then. Arrive early, stand near a target, and listen — the crack of the wood is heard before the applause dares to start.",
          es:"Apunta al otoño: varios grandes santuarios de Tokio y sus alrededores celebran entonces sus ceremonias de yabusame. Llega temprano, colócate cerca de un blanco y escucha — el chasquido de la madera se oye antes de que el aplauso se atreva a empezar.",
          it:"Punta all'autunno: diversi grandi santuari di Tokyo e dintorni tengono allora le loro cerimonie di yabusame. Arriva presto, mettiti vicino a un bersaglio e ascolta — lo schiocco del legno si sente prima che l'applauso osi partire.",
          de:"Ziele auf den Herbst: Mehrere große Schreine in und um Tokio halten dann ihre Yabusame-Zeremonien ab. Komm früh, stell dich nahe an ein Ziel und horche — das Krachen des Holzes ist zu hören, bevor der Applaus sich traut.",
          ja:"ねらい目は秋。東京とその近郊のいくつかの大きな神社で流鏑馬神事が行われます。早めに着いて、的の近くに立って、耳を澄ませて。拍手が起こるより先に、木の割れる音が聞こえます。"}}
    ]
  };

  /* ============ TAMWORTH · le western ============ */
  MONDE.tamworth = {
    lieu:"New South Wales · Australia", carte:true, niveau:2,
    image:"la poussière ocre au-dessus des parcs à bétail",
    lettre:{
      fr:["La poussière est montée avant les bêtes.","On les a entendues ensuite, puis les cavaliers sont apparus au milieu, tranquilles, une main sur les rênes et l'autre libre. Personne ne criait. Le troupeau tournait comme s'il l'avait décidé lui-même."],
      en:["The dust rose before the cattle did.","Then we heard them, and the riders appeared in the middle of it all, unhurried, one hand on the reins and the other free. Nobody was shouting. The mob turned as if it had decided to itself."],
      es:["El polvo subió antes que las reses.","Después las oímos, y los jinetes aparecieron en medio, tranquilos, una mano en las riendas y la otra libre. Nadie gritaba. La manada giraba como si lo hubiera decidido ella misma."],
      it:["La polvere si è alzata prima delle bestie.","Poi le abbiamo sentite, e i cavalieri sono apparsi in mezzo, tranquilli, una mano sulle redini e l'altra libera. Nessuno gridava. La mandria girava come se l'avesse deciso da sola."],
      de:["Der Staub stieg auf, bevor die Rinder kamen.","Dann hörten wir sie, und die Reiter erschienen mittendrin, ruhig, eine Hand am Zügel und die andere frei. Niemand schrie. Die Herde drehte, als hätte sie es selbst beschlossen."],
      ja:["牛より先に、土ぼこりが上がった。","それから牛たちの音が聞こえ、その真ん中に騎手たちが現れた。落ち着いて、片手に手綱、もう片方の手は自由なまま。誰も叫ばない。群れはまるで自分で決めたかのように向きを変えた。"]},
    volets:[
     {t:{fr:"L'Australian Stock Horse", en:"The Australian Stock Horse", es:"El Australian Stock Horse", it:"L'Australian Stock Horse", de:"Das Australian Stock Horse", ja:"オーストラリアン・ストックホース"},
      c:{
          fr:"L'Australian Stock Horse, la race de chevaux qui mène les troupeaux australiens : compacte, endurante, capable de tourner sur place et de travailler du matin au soir. On la surnomme là-bas « la race qui a bâti le pays » — elle a porté les pionniers, les troupeaux et même des régiments entiers.",
          en:"The Australian Stock Horse, the breed that works Australia's herds: compact, tireless, able to turn on the spot and work from dawn to dusk. Over there it is called « the breed that built the nation » — it carried the pioneers, the herds, and even whole regiments.",
          es:"El Australian Stock Horse, la raza de caballos que maneja los rebaños australianos: compacta, resistente, capaz de girar en el sitio y trabajar de la mañana a la noche. Allí la llaman « la raza que construyó la nación »: llevó a los pioneros, a los rebaños y hasta a regimientos enteros.",
          it:"L'Australian Stock Horse, la razza di cavalli che conduce le mandrie australiane: compatta, instancabile, capace di girare sul posto e lavorare dall'alba al tramonto. Laggiù la chiamano « la razza che ha costruito la nazione »: ha portato i pionieri, le mandrie e persino interi reggimenti.",
          de:"Das Australian Stock Horse, die Pferderasse, die Australiens Herden führt: kompakt, unermüdlich, fähig, auf der Stelle zu wenden und von früh bis spät zu arbeiten. Man nennt sie dort « die Rasse, die die Nation aufgebaut hat » — es trug die Pioniere, die Herden und sogar ganze Regimenter.",
          ja:"オーストラリアン・ストックホース。オーストラリアの群れを追う馬の品種です。がっしりとして疲れを知らず、その場で旋回し、朝から晩まで働けます。現地では「国を築いた馬」と呼ばれ、開拓者を、家畜の群れを、そして連隊さえも運びました。"}},
     {t:{fr:"Les stations", en:"The stations", es:"Las estancias", it:"Le stazioni", de:"Die Stations", ja:"ステーション（大牧場）"},
      c:{
          fr:"Ici, une ferme d'élevage s'appelle une station, et certaines couvrent des dizaines de milliers d'hectares. Le rassemblement — the muster — peut durer des jours, à cheval, en famille, parfois avec un hélicoptère en renfort au-dessus des troupeaux.",
          en:"Here a cattle farm is called a station, and some cover tens of thousands of hectares. The muster can last for days, on horseback, as a family, sometimes with a helicopter helping out above the mobs.",
          es:"Aquí una explotación ganadera se llama station, y algunas cubren decenas de miles de hectáreas. El rodeo — the muster — puede durar días, a caballo, en familia, a veces con un helicóptero de refuerzo sobre las manadas.",
          it:"Qui un allevamento si chiama station, e alcune coprono decine di migliaia di ettari. Il raduno — the muster — può durare giorni, a cavallo, in famiglia, a volte con un elicottero in rinforzo sopra le mandrie.",
          de:"Hier heißt ein Viehbetrieb Station, und manche umfassen Zehntausende Hektar. Das Zusammentreiben — the muster — kann Tage dauern, zu Pferd, mit der ganzen Familie, manchmal mit einem Helikopter als Verstärkung über den Herden.",
          ja:"ここでは牧場をステーションと呼び、数万ヘクタールに及ぶものもあります。牛の追い集め「マスター」は数日がかり。馬に乗り、家族総出で、ときには群れの上空をヘリコプターが手伝います。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Tamworth est une ville de chevaux et de country : son grand centre équestre couvert accueille toute l'année des concours de tri de bétail, de rodéo et de monte western. Va voir une épreuve de camp draft — le tri australien — on n'en voit nulle part ailleurs.",
          en:"Tamworth is a town of horses and country music: its big indoor equestrian centre hosts cattle-work, rodeo and western riding events all year round. Watch a camp draft — Australia's own cattle-cutting sport — you will see it nowhere else.",
          es:"Tamworth es una ciudad de caballos y de country: su gran centro ecuestre cubierto acoge todo el año pruebas de trabajo de ganado, rodeo y monta western. Ve a ver un camp draft — el aparte australiano —: no se ve en ningún otro lugar.",
          it:"Tamworth è una città di cavalli e di country: il suo grande centro equestre coperto ospita tutto l'anno prove di lavoro con il bestiame, rodeo e monta western. Va' a vedere un camp draft — la separazione all'australiana —: non si vede da nessun'altra parte.",
          de:"Tamworth ist eine Stadt der Pferde und der Countrymusik: Ihr großes überdachtes Reitsportzentrum beherbergt das ganze Jahr über Rinderarbeits-, Rodeo- und Westernprüfungen. Sieh dir ein Camp Draft an — Australiens eigenes Rindertrennen — das gibt es nirgendwo sonst.",
          ja:"タムワースは馬とカントリーミュージックの町。大きな屋内馬術センターでは一年中、牛追いやロデオ、ウエスタンの競技が開かれます。キャンプドラフト — オーストラリア独自の牛の仕分け競技 — をぜひ。ここでしか見られません。"}}
    ]
  };

  /* ============ BUENOS AIRES · le polo ============ */
  MONDE.buenos = {
    lieu:"Buenos Aires · Argentina", carte:true, niveau:2,
    image:"la ligne de balle sous les tribunes de Palermo",
    lettre:{
      fr:["Huit chevaux ont tourné en même temps.","La balle est partie vers l'autre bout du terrain, et tout le monde est reparti derrière, au galop, comme un seul mouvement. À la fin de la période, les cavaliers ont changé de cheval sans même descendre du rythme."],
      en:["Eight horses turned at the same instant.","The ball flew to the far end of the field and everyone swept after it at a gallop, like a single movement. At the end of the chukka the players changed ponies without even dropping out of the rhythm."],
      es:["Ocho caballos giraron al mismo tiempo.","La bocha salió hacia el otro extremo de la cancha y todos partieron detrás, al galope, como un solo movimiento. Al final del chukker, los jugadores cambiaron de caballo sin bajar siquiera el ritmo."],
      it:["Otto cavalli hanno girato nello stesso istante.","La palla è volata verso l'altro capo del campo e tutti sono ripartiti dietro, al galoppo, come un solo movimento. Alla fine del chukker i giocatori hanno cambiato cavallo senza nemmeno uscire dal ritmo."],
      de:["Acht Pferde wendeten im selben Augenblick.","Der Ball flog ans andere Ende des Feldes, und alle jagten ihm im Galopp nach, wie eine einzige Bewegung. Am Ende des Chukkers wechselten die Spieler die Pferde, ohne auch nur aus dem Rhythmus zu fallen."],
      ja:["八頭の馬が同時に向きを変えた。","ボールがフィールドの反対側へ飛び、全員がその後を追って駆け出した。まるでひとつの動きのように。チャッカが終わると、選手たちはリズムを崩すことなく馬を乗り替えた。"]},
    volets:[
     {t:{fr:"Palermo, la cathédrale", en:"Palermo, the cathedral", es:"Palermo, la catedral", it:"Palermo, la cattedrale", de:"Palermo, die Kathedrale", ja:"パレルモ — ポロの大聖堂"},
      c:{
          fr:"Le terrain de Palermo, en pleine ville, est surnommé « la cathédrale du polo ». C'est là que se joue chaque année l'Abierto de Palermo, le tournoi le plus relevé du monde — les meilleurs handicaps de la planète s'y retrouvent presque tous.",
          en:"The Palermo ground, right inside the city, is nicknamed « the cathedral of polo ». It hosts the Palermo Open every year, the strongest tournament in the world — nearly all of the planet's top handicaps meet there.",
          es:"La cancha de Palermo, en plena ciudad, es apodada « la catedral del polo ». Allí se juega cada año el Abierto de Palermo, el torneo más fuerte del mundo: casi todos los mejores handicaps del planeta se encuentran allí.",
          it:"Il campo di Palermo, in piena città, è soprannominato « la cattedrale del polo ». Vi si gioca ogni anno l'Abierto di Palermo, il torneo più forte del mondo: quasi tutti i migliori handicap del pianeta si ritrovano lì.",
          de:"Das Feld von Palermo, mitten in der Stadt, trägt den Beinamen « die Kathedrale des Polo ». Dort wird jedes Jahr das Abierto de Palermo gespielt, das stärkste Turnier der Welt — fast alle Spitzenhandicaps des Planeten treffen sich dort.",
          ja:"街の真ん中にあるパレルモ競技場は「ポロの大聖堂」と呼ばれます。毎年ここで世界最高峰の大会、パレルモ・オープンが開かれ、世界のトップハンディキャップ選手のほとんどが集まります。"}},
     {t:{fr:"Le petisero", en:"The petisero", es:"El petisero", it:"Il petisero", de:"Der Petisero", ja:"ペティセロ"},
      c:{
          fr:"Derrière chaque joueur, il y a un petisero : celui qui prépare, entraîne et amène les six à huit chevaux d'un match. Les joueurs le disent eux-mêmes — la moitié du polo se joue à l'écurie, avant que la balle ne soit lancée.",
          en:"Behind every player there is a petisero: the one who prepares, fits and brings the six to eight horses of a match. The players say it themselves — half of polo is played in the yard, before the ball is ever thrown in.",
          es:"Detrás de cada jugador hay un petisero: el que prepara, entrena y trae los seis a ocho caballos de un partido. Los propios jugadores lo dicen: la mitad del polo se juega en la caballeriza, antes de que se lance la bocha.",
          it:"Dietro ogni giocatore c'è un petisero: colui che prepara, allena e porta i sei-otto cavalli di una partita. Lo dicono i giocatori stessi: metà del polo si gioca in scuderia, prima che la palla venga lanciata.",
          de:"Hinter jedem Spieler steht ein Petisero: der die sechs bis acht Pferde eines Spiels vorbereitet, trainiert und bringt. Die Spieler sagen es selbst — die Hälfte des Polo wird im Stall gespielt, bevor der Ball überhaupt eingeworfen ist.",
          ja:"どの選手の背後にもペティセロがいます。一試合に使う六〜八頭を仕上げ、調教し、連れてくる存在。選手たち自身が言います — ポロの半分は、ボールが投げ入れられる前に、厩舎で決まっている、と。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Vise la fin de l'année : la grande saison de Palermo se joue au printemps austral, en novembre et décembre. Prends une place basse, près de la ligne — c'est là qu'on entend les maillets, les sabots, et les joueurs qui s'appellent en espagnol.",
          en:"Aim for the end of the year: the great Palermo season is played in the southern spring, in November and December. Take a low seat, near the boards — that is where you hear the mallets, the hooves, and the players calling to each other in Spanish.",
          es:"Apunta al final del año: la gran temporada de Palermo se juega en la primavera austral, en noviembre y diciembre. Toma una ubicación baja, cerca de la línea: allí se oyen los tacos, los cascos y los jugadores llamándose en español.",
          it:"Punta alla fine dell'anno: la grande stagione di Palermo si gioca nella primavera australe, a novembre e dicembre. Prendi un posto in basso, vicino alla linea: è lì che senti le stecche, gli zoccoli e i giocatori che si chiamano in spagnolo.",
          de:"Ziele auf das Jahresende: Die große Saison von Palermo wird im Südfrühling gespielt, im November und Dezember. Nimm einen Platz weit unten, nahe der Bande — dort hörst du die Schläger, die Hufe und die Spieler, die einander auf Spanisch zurufen.",
          ja:"ねらい目は年末。パレルモの本シーズンは南半球の春、十一月と十二月です。ラインに近い低い席を取って。マレットの音、蹄の音、スペイン語で呼び合う選手たちの声が聞こえてきます。"}}
    ]
  };

  /* ============ LEXINGTON · le haras ============ */
  MONDE.lexington = {
    lieu:"Kentucky · United States", carte:false, niveau:2,
    image:"les barrières noires à perte de vue sur l'herbe bleue",
    lettre:{
      fr:["Des barrières noires jusqu'à l'horizon.","Derrière chacune, des poulinières et leurs poulains de l'année. Le chauffeur m'a dit le nom des haras comme on récite une famille — et à chaque nom, il ralentissait un peu."],
      en:["Black fences all the way to the horizon.","Behind every one of them, broodmares with this year's foals. The driver named the farms the way you recite a family — and at every name, he slowed down a little."],
      es:["Vallas negras hasta el horizonte.","Detrás de cada una, yeguas de vientre con sus potros del año. El conductor me dijo el nombre de los haras como quien recita una familia — y con cada nombre, frenaba un poco."],
      it:["Steccati neri fino all'orizzonte.","Dietro ognuno, fattrici con i puledri dell'anno. L'autista mi diceva i nomi degli allevamenti come si recita una famiglia — e a ogni nome rallentava un po'."],
      de:["Schwarze Zäune bis zum Horizont.","Hinter jedem einzelnen Zuchtstuten mit den Fohlen dieses Jahres. Der Fahrer nannte mir die Namen der Gestüte, wie man eine Familie aufsagt — und bei jedem Namen wurde er ein wenig langsamer."],
      ja:["黒い柵が地平線まで続いていた。","その一つひとつの向こうに、繁殖牝馬と今年生まれの子馬たち。運転手は牧場の名前を、家族の名を唱えるように教えてくれた。名前を言うたび、少しだけ速度を落としながら。"]},
    volets:[
     {t:{fr:"L'herbe bleue", en:"The bluegrass", es:"La hierba azul", it:"L'erba blu", de:"Das Bluegrass", ja:"ブルーグラス"},
      c:{
          fr:"La région s'appelle le Bluegrass, du nom de son herbe aux reflets bleutés au printemps. Son sol calcaire enrichit l'herbe en minéraux, et la tradition veut que ce soit lui qui fasse l'os des poulains d'ici — c'est en tout cas ce qu'on te dira dans chaque haras.",
          en:"The region is called the Bluegrass, after its grass with a bluish sheen in spring. Its limestone soil enriches the grass with minerals, and tradition has it that this is what builds the bone of the foals raised here — that, at least, is what every farm will tell you.",
          es:"La región se llama Bluegrass, por su hierba de reflejos azulados en primavera. Su suelo calcáreo enriquece la hierba en minerales, y la tradición dice que es eso lo que hace el hueso de los potros de aquí — al menos, eso te dirán en cada haras.",
          it:"La regione si chiama Bluegrass, dal nome della sua erba dai riflessi bluastri in primavera. Il suo suolo calcareo arricchisce l'erba di minerali, e la tradizione vuole che sia questo a fare l'osso dei puledri di qui — o almeno, è quello che ti diranno in ogni allevamento.",
          de:"Die Region heißt Bluegrass, nach ihrem Gras mit bläulichem Schimmer im Frühjahr. Ihr Kalksteinboden reichert das Gras mit Mineralien an, und die Überlieferung sagt, genau das mache die Knochen der hier aufgezogenen Fohlen — das jedenfalls wird man dir auf jedem Gestüt erzählen.",
          ja:"この地方はブルーグラスと呼ばれます。春に青みを帯びて見える牧草にちなんだ名前です。石灰岩の大地が草をミネラルで豊かにし、それがこの土地の子馬の骨をつくる — と伝えられています。少なくとも、どの牧場でもそう聞かされるでしょう。"}},
     {t:{fr:"Les ventes de yearlings", en:"The yearling sales", es:"Las ventas de yearlings", it:"Le vendite di yearling", de:"Die Jährlingsauktionen", ja:"一歳馬のセール"},
      c:{
          fr:"Chaque année, les grandes ventes aux enchères de Lexington voient passer des milliers de yearlings sous le marteau. Un poulain d'un an, jamais monté, peut y atteindre des sommes à sept chiffres — sur la foi d'un pedigree et d'une manière de marcher.",
          en:"Every year, Lexington's great auctions see thousands of yearlings pass under the hammer. A one-year-old, never ridden, can fetch seven figures there — on the strength of a pedigree and a way of walking.",
          es:"Cada año, las grandes subastas de Lexington ven pasar miles de yearlings bajo el martillo. Un potro de un año, jamás montado, puede alcanzar allí cifras de siete dígitos — sobre la fe de un pedigrí y de una manera de caminar.",
          it:"Ogni anno le grandi aste di Lexington vedono passare migliaia di yearling sotto il martello. Un puledro di un anno, mai montato, può raggiungervi cifre a sette zeri — sulla fede di un pedigree e di un modo di camminare.",
          de:"Jedes Jahr gehen bei den großen Auktionen von Lexington Tausende Jährlinge unter den Hammer. Ein einjähriges, nie gerittenes Fohlen kann dort siebenstellige Summen erzielen — auf das Wort eines Pedigrees und einer Art zu gehen hin.",
          ja:"毎年、レキシントンの大セールでは何千頭もの一歳馬が競りにかけられます。一度も騎乗されたことのない一歳馬に、七桁の値がつくことも。血統書と、歩き方。それだけを頼りに。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Le Kentucky Horse Park, aux portes de la ville, est un parc entier dédié au cheval : musées, races présentées au travail, champions à la retraite qu'on vient saluer. C'est aussi là que se court le grand concours complet américain, chaque printemps.",
          en:"The Kentucky Horse Park, on the edge of town, is a whole park devoted to the horse: museums, breeds shown at work, retired champions people come to greet. It is also where America's great three-day event is run every spring.",
          es:"El Kentucky Horse Park, a las puertas de la ciudad, es un parque entero dedicado al caballo: museos, razas presentadas al trabajo, campeones retirados a los que la gente viene a saludar. Allí se corre también, cada primavera, el gran concurso completo americano.",
          it:"Il Kentucky Horse Park, alle porte della città, è un parco intero dedicato al cavallo: musei, razze presentate al lavoro, campioni in pensione che la gente viene a salutare. È lì che si corre anche, ogni primavera, il grande completo americano.",
          de:"Der Kentucky Horse Park am Stadtrand ist ein ganzer Park, der dem Pferd gewidmet ist: Museen, Rassen bei der Arbeit, Champions im Ruhestand, die man begrüßen kommt. Dort wird auch jedes Frühjahr Amerikas große Vielseitigkeitsprüfung geritten.",
          ja:"街のすぐ外にあるケンタッキー・ホースパークは、馬に捧げられた一つの公園です。博物館があり、さまざまな品種が実演され、引退した名馬に会いに人々が訪れます。毎年春には、アメリカ最大の総合馬術大会もここで開かれます。"}}
    ]
  };

  /* ============ SPRUCE MEADOWS · le froid ============ */
  MONDE.spruce = {
    lieu:"Alberta · Canada", carte:true, niveau:1,
    image:"la buée au-dessus des box, les Rocheuses au fond",
    lettre:{
      fr:["Moins vingt ce matin, et tout le monde était dehors.","La buée montait des box en colonnes droites, les Rocheuses fermaient l'horizon, et la première question qu'on m'a posée n'était pas « tu montes ? » mais « il a bu, le tien ? »."],
      en:["Minus twenty this morning, and everyone was outside.","Steam rose from the stables in straight columns, the Rockies closed off the horizon, and the first question anyone asked me was not « are you riding? » but « has yours drunk? »."],
      es:["Veinte bajo cero esta mañana, y todo el mundo estaba fuera.","El vaho subía de los boxes en columnas rectas, las Rocosas cerraban el horizonte, y la primera pregunta que me hicieron no fue « ¿montas? » sino « ¿el tuyo ha bebido? »."],
      it:["Meno venti stamattina, e tutti erano fuori.","Il vapore saliva dai box in colonne dritte, le Montagne Rocciose chiudevano l'orizzonte, e la prima domanda che mi hanno fatto non è stata « monti? » ma « il tuo ha bevuto? »."],
      de:["Minus zwanzig heute Morgen, und alle waren draußen.","Der Dampf stieg in geraden Säulen aus den Boxen, die Rockys schlossen den Horizont, und die erste Frage, die man mir stellte, war nicht « reitest du? », sondern « hat deiner getrunken? »."],
      ja:["今朝は氷点下二十度。それでも、みんな外にいた。","馬房から湯気がまっすぐな柱になって立ちのぼり、地平線はロッキー山脈が閉じていた。最初に聞かれたのは「乗るの？」ではなく「きみの馬、水は飲んだ？」だった。"]},
    volets:[
     {t:{fr:"Spruce Meadows", en:"Spruce Meadows", es:"Spruce Meadows", it:"Spruce Meadows", de:"Spruce Meadows", ja:"スプルース・メドウズ"},
      c:{
          fr:"Aux portes de Calgary, l'un des grands rendez-vous du saut d'obstacles mondial. Créé par une famille dans les années 1970, le site accueille chaque été des tournois où viennent les meilleurs cavaliers du monde — et son grand prix compte parmi les plus dotés du sport.",
          en:"On the edge of Calgary, one of the world's great show jumping venues. Built by one family in the 1970s, it hosts tournaments every summer that draw the best riders in the world — and its grand prix ranks among the richest in the sport.",
          es:"A las puertas de Calgary, una de las grandes citas del salto de obstáculos mundial. Creado por una familia en los años setenta, el recinto acoge cada verano torneos a los que acuden los mejores jinetes del mundo — y su gran premio figura entre los mejor dotados del deporte.",
          it:"Alle porte di Calgary, uno dei grandi appuntamenti del salto ostacoli mondiale. Creato da una famiglia negli anni Settanta, il sito ospita ogni estate tornei che richiamano i migliori cavalieri del mondo — e il suo gran premio è tra i più ricchi dello sport.",
          de:"Vor den Toren Calgarys liegt einer der großen Treffpunkte des Weltspringsports. In den 1970er-Jahren von einer Familie aufgebaut, empfängt die Anlage jeden Sommer Turniere mit den besten Reitern der Welt — und ihr Großer Preis gehört zu den höchstdotierten des Sports.",
          ja:"カルガリー郊外にある、世界の障害馬術の大舞台のひとつ。一九七〇年代にひとつの家族が築き、毎年夏には世界のトップ騎手が集まる大会が開かれます。そのグランプリは、この競技で最も賞金の高い大会のひとつに数えられます。"}},
     {t:{fr:"Le chinook", en:"The chinook", es:"El chinook", it:"Il chinook", de:"Der Chinook", ja:"チヌーク"},
      c:{
          fr:"L'Alberta connaît un vent qui n'existe presque nulle part ailleurs : le chinook, un vent chaud qui descend des Rocheuses et peut faire remonter la température de vingt degrés en quelques heures. Les chevaux le sentent avant les thermomètres — et avant nous.",
          en:"Alberta has a wind that exists almost nowhere else: the chinook, a warm wind that rolls down from the Rockies and can lift the temperature by twenty degrees in a few hours. The horses feel it before the thermometers do — and before we do.",
          es:"Alberta conoce un viento que casi no existe en ningún otro lugar: el chinook, un viento cálido que baja de las Rocosas y puede subir la temperatura veinte grados en unas horas. Los caballos lo sienten antes que los termómetros — y antes que nosotros.",
          it:"L'Alberta conosce un vento che quasi non esiste altrove: il chinook, un vento caldo che scende dalle Montagne Rocciose e può far risalire la temperatura di venti gradi in poche ore. I cavalli lo sentono prima dei termometri — e prima di noi.",
          de:"Alberta kennt einen Wind, den es fast nirgendwo sonst gibt: den Chinook, einen warmen Wind, der von den Rockys herabfällt und die Temperatur in wenigen Stunden um zwanzig Grad steigen lassen kann. Die Pferde spüren ihn vor den Thermometern — und vor uns.",
          ja:"アルバータには、ほかではめったに出会えない風があります。チヌーク — ロッキー山脈から吹き下ろす暖かい風で、数時間で気温を二十度も上げることがあります。馬たちは温度計より先に、そして私たちより先に、それを感じ取ります。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Viens en été pour le grand tournoi, sous le soleil et devant les tribunes pleines. Mais si tu veux comprendre ce chapitre, reviens un matin d'hiver : l'écurie à moins vingt, l'eau qu'on casse, la buée — c'est là que le pays se raconte vraiment.",
          en:"Come in summer for the great tournament, in the sun, in front of full stands. But if you want to understand this chapter, come back on a winter morning: the yard at minus twenty, the water you break, the steam — that is where this country really tells its story.",
          es:"Ven en verano para el gran torneo, bajo el sol y ante las gradas llenas. Pero si quieres entender este capítulo, vuelve una mañana de invierno: la cuadra a veinte bajo cero, el agua que se rompe, el vaho — ahí es donde este país se cuenta de verdad.",
          it:"Vieni d'estate per il grande torneo, sotto il sole e davanti alle tribune piene. Ma se vuoi capire questo capitolo, torna una mattina d'inverno: la scuderia a meno venti, l'acqua da rompere, il vapore — è lì che questo paese si racconta davvero.",
          de:"Komm im Sommer zum großen Turnier, in der Sonne, vor vollen Tribünen. Aber wenn du dieses Kapitel verstehen willst, komm an einem Wintermorgen wieder: der Stall bei minus zwanzig, das Wasser, das man aufbricht, der Dampf — dort erzählt sich dieses Land wirklich.",
          ja:"夏に来れば、太陽の下、満員のスタンドの前で大きな大会が見られます。でもこの章を理解したいなら、冬の朝にもう一度来てください。氷点下二十度の厩舎、割って開ける水、立ちのぼる湯気 — この国の本当の物語は、そこにあります。"}}
    ]
  };

  /* ==================================================================
     🟥🟥 19/08/2026 — LES HUIT DERNIÈRES VILLES : LA TABLE EST COMPLÈTE.
     Wellington · Burghley · Versailles · Fontainebleau · Barcelone ·
     Taupō · Santa Ynez · Flyinge. Avec elles, LES 37 ÉTAPES DU VOYAGE
     ONT TOUTES leur lettre et leurs trois volets — plus une seule ville
     au verso de repli, plus un seul écran sans volets.
     Découverte du jour : le code masque EN SILENCE (display:none) les
     volets d'une ville absente de cette table — huit villes vivaient
     ainsi depuis leur création sans que rien ne le signale.
     FR validés par Blandine le 19/08 (« envoie-le franchement »).
     ⚠️ TRADUCTIONS EN/ES/IT/DE/JA ÉCRITES PAR CLAUDE, JAMAIS RELUES PAR
     UN NATIF. Chaque volet 2 est ancré dans les concepts réellement
     enseignés par le chapitre de la ville — vérifié fichier par fichier.
     ================================================================== */

  MONDE.wellington = {
    lieu:"Floride · États-Unis", carte:true, niveau:1,
    image:"des palmiers qui dépassent des tribunes",
    lettre:{
      fr:["Trois heures de l'après-midi, et le speaker n'a pas arrêté une seconde.","Ici les pistes se touchent : pendant qu'un cavalier salue, le suivant entre sur la piste d'à côté, et les palmiers dépassent des tribunes comme si la Floride regardait aussi."],
      en:["Three in the afternoon, and the announcer hasn't stopped for a second.","The rings sit side by side here: while one rider salutes, the next enters the ring next door, and the palm trees rise above the stands as if Florida were watching too."],
      es:["Las tres de la tarde, y el locutor no ha parado ni un segundo.","Aquí las pistas se tocan: mientras un jinete saluda, el siguiente entra en la pista de al lado, y las palmeras asoman por encima de las gradas como si Florida también mirara."],
      it:["Le tre del pomeriggio, e lo speaker non si è fermato un secondo.","Qui i campi si toccano: mentre un cavaliere saluta, il successivo entra nel campo accanto, e le palme spuntano sopra le tribune come se anche la Florida guardasse."],
      de:["Drei Uhr nachmittags, und der Sprecher hat keine Sekunde aufgehört.","Die Plätze liegen hier Seite an Seite: Während ein Reiter grüßt, reitet der nächste nebenan ein, und die Palmen ragen über die Tribünen, als schaute Florida mit zu."],
      ja:["午後三時。場内アナウンスは一秒も止まらない。","ここではアリーナが隣り合っている。ひとりの騎手が敬礼する間に、次の騎手が隣の馬場に入っていく。椰子の木がスタンドの上に伸びて、フロリダ全体が見守っているようだった。"]},
    volets:[
     {t:{fr:"La tournée d'hiver", en:"The winter circuit", es:"La gira de invierno", it:"Il circuito invernale", de:"Die Wintertour", ja:"ウィンター・サーキット"},
      c:{
          fr:"Chaque hiver, une partie du saut d'obstacles mondial déménage en Floride. Pendant trois mois, cavaliers et chevaux vivent sur place, de concours en concours — on ne vient pas y passer un week-end, on vient y passer une saison.",
          en:"Every winter, part of the show jumping world moves to Florida. For three months, riders and horses live on site, from show to show — you don't come for a weekend, you come for a season.",
          es:"Cada invierno, una parte del salto de obstáculos mundial se muda a Florida. Durante tres meses, jinetes y caballos viven allí, de concurso en concurso — no se viene a pasar un fin de semana, se viene a pasar una temporada.",
          it:"Ogni inverno, una parte del salto ostacoli mondiale trasloca in Florida. Per tre mesi, cavalieri e cavalli vivono sul posto, di concorso in concorso — non si viene per un weekend, si viene per una stagione.",
          de:"Jeden Winter zieht ein Teil des Weltspringsports nach Florida. Drei Monate lang leben Reiter und Pferde vor Ort, von Turnier zu Turnier — man kommt nicht für ein Wochenende, man kommt für eine Saison.",
          ja:"毎年冬になると、世界の障害馬術の一部がフロリダへ移ってきます。三か月のあいだ、騎手も馬も現地で暮らし、大会から大会へと渡り歩く — 週末を過ごしに来るのではなく、ひとつの季節をまるごと過ごしに来るのです。"}},
     {t:{fr:"L'oxer", en:"The oxer", es:"El óxer", it:"L'oxer", de:"Der Oxer", ja:"オクサー"},
      c:{
          fr:"Deux plans de barres, à franchir d'un seul saut. Il demande au cheval de monter ET de s'étendre — c'est lui qui apprend à un couple ce qu'est vraiment couvrir un obstacle, et le chapitre lui consacre plusieurs mots.",
          en:"Two sets of rails, cleared in a single jump. It asks the horse to go up AND stretch out — it's the fence that teaches a pair what covering an obstacle really means, and this chapter gives it several words.",
          es:"Dos planos de barras, que se franquean de un solo salto. Pide al caballo subir Y extenderse — es el que enseña a una pareja lo que significa cubrir un obstáculo, y el capítulo le dedica varias palabras.",
          it:"Due piani di barriere, da superare con un solo salto. Chiede al cavallo di salire E di distendersi — è lui che insegna a un binomio cosa significa davvero coprire un ostacolo, e il capitolo gli dedica più parole.",
          de:"Zwei Stangenebenen, in einem einzigen Sprung zu überwinden. Er verlangt vom Pferd, zu steigen UND sich zu strecken — er lehrt ein Paar, was es wirklich heißt, ein Hindernis abzudecken, und das Kapitel widmet ihm mehrere Wörter.",
          ja:"二列の横木を、ひとつの跳躍で越える障害。馬に「上がること」と「伸びること」を同時に求めます。障害を大きく跳び切るとはどういうことかを人馬に教えてくれるのがオクサーで、この章ではいくつもの言葉を割いています。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Va voir la détente plutôt que la piste d'honneur : c'est là qu'on voit les cavaliers travailler pour de vrai, régler un galop, refaire trois fois le même vertical. Le concours n'est que la dernière minute d'une journée.",
          en:"Watch the warm-up ring rather than the main arena: that's where you see riders really working, adjusting a canter, jumping the same vertical three times. The class itself is only the last minute of the day.",
          es:"Ve a ver la pista de calentamiento en lugar de la de honor: ahí es donde se ve a los jinetes trabajar de verdad, ajustar un galope, repetir tres veces el mismo vertical. El concurso no es más que el último minuto de una jornada.",
          it:"Vai a vedere il campo prova invece del campo gara: è lì che si vedono i cavalieri lavorare davvero, regolare un galoppo, rifare tre volte lo stesso verticale. La gara è solo l'ultimo minuto di una giornata.",
          de:"Schau lieber aufs Abreiteplatz als auf den Hauptplatz: Dort sieht man die Reiter wirklich arbeiten, einen Galopp einstellen, denselben Steilsprung dreimal wiederholen. Die Prüfung selbst ist nur die letzte Minute eines Tages.",
          ja:"メインアリーナよりも練習馬場を見に行ってください。騎手が本当に働いているのはそこです。駈歩を整え、同じ垂直障害を三度跳び直す。本番の競技は、一日の最後の一分にすぎません。"}}
    ]
  };

  MONDE.burghley = {
    lieu:"Angleterre · Royaume-Uni", carte:true, niveau:1,
    image:"les obstacles fixes sous la rosée, le manoir au fond",
    lettre:{
      fr:["Trois heures du matin, et les bénévoles baladaient déjà leurs lampes le long du parcours.","On m'a laissée marcher le cross de nuit : les obstacles dormaient sous la rosée, énormes, et j'ai compris pourquoi on les reconnaît à pied avant de les affronter à cheval."],
      en:["Three in the morning, and the volunteers were already walking their torches along the course.","They let me walk the cross-country at night: the fences slept under the dew, enormous, and I understood why you walk them on foot before facing them on a horse."],
      es:["Las tres de la madrugada, y los voluntarios ya paseaban sus linternas a lo largo del recorrido.","Me dejaron caminar el cross de noche: los obstáculos dormían bajo el rocío, enormes, y entendí por qué se reconocen a pie antes de afrontarlos a caballo."],
      it:["Le tre del mattino, e i volontari passeggiavano già con le torce lungo il percorso.","Mi hanno lasciato camminare il cross di notte: gli ostacoli dormivano sotto la rugiada, enormi, e ho capito perché si ricognisce a piedi prima di affrontarli a cavallo."],
      de:["Drei Uhr morgens, und die Helfer gingen schon mit ihren Lampen die Strecke ab.","Man ließ mich das Gelände bei Nacht abgehen: Die Hindernisse schliefen unterm Tau, riesig, und ich verstand, warum man sie zu Fuß besichtigt, bevor man sie zu Pferd angeht."],
      ja:["午前三時。ボランティアたちはもうランプを手にコースを歩いていた。","夜のクロスカントリーを歩かせてもらった。障害物は露の下で眠っていて、途方もなく大きかった。馬で挑む前に徒歩で下見をする理由が、そのときわかった。"]},
    volets:[
     {t:{fr:"Burghley", en:"Burghley", es:"Burghley", it:"Burghley", de:"Burghley", ja:"バーリー"},
      c:{
          fr:"Autour d'une demeure élisabéthaine, l'un des rares concours complets du plus haut niveau mondial. Ses obstacles fixes portent des noms que les cavaliers apprennent avant même d'y courir, et son cross passe pour l'un des plus exigeants qui soient.",
          en:"Around an Elizabethan house, one of the very few top-level events in the world. Its fixed fences bear names riders learn before they ever compete there, and its cross-country is held to be one of the most demanding anywhere.",
          es:"Alrededor de una mansión isabelina, uno de los pocos concursos completos del más alto nivel mundial. Sus obstáculos fijos llevan nombres que los jinetes aprenden antes incluso de correr allí, y su cross pasa por ser uno de los más exigentes que existen.",
          it:"Intorno a una dimora elisabettiana, uno dei rari completi del massimo livello mondiale. I suoi ostacoli fissi portano nomi che i cavalieri imparano prima ancora di correrci, e il suo cross è considerato uno dei più esigenti in assoluto.",
          de:"Rund um ein elisabethanisches Herrenhaus findet eine der ganz wenigen Vielseitigkeitsprüfungen der höchsten Weltklasse statt. Ihre festen Hindernisse tragen Namen, die Reiter lernen, bevor sie dort je starten, und ihr Gelände gilt als eines der anspruchsvollsten überhaupt.",
          ja:"エリザベス朝の館を囲んで開かれる、世界最高峰の総合馬術競技のひとつ。固定障害にはそれぞれ名前があり、騎手たちは出場する前からその名を覚えます。ここのクロスカントリーは世界でもっとも過酷なコースのひとつに数えられています。"}},
     {t:{fr:"La voie directe et l'option longue", en:"The direct route and the long option", es:"La vía directa y la opción larga", it:"La via diretta e l'opzione lunga", de:"Der direkte Weg und die lange Alternative", ja:"直進ルートとロングオプション"},
      c:{
          fr:"Devant un obstacle difficile, le parcours offre souvent deux chemins : le direct, rapide et risqué, et l'option longue, plus sûre mais coûteuse en secondes. Tout le cross tient dans ce choix, répété obstacle après obstacle.",
          en:"At a difficult fence, the course often offers two ways: the direct route, fast and risky, and the long option, safer but costly in seconds. The whole of cross-country lives in that choice, repeated fence after fence.",
          es:"Ante un obstáculo difícil, el recorrido ofrece a menudo dos caminos: el directo, rápido y arriesgado, y la opción larga, más segura pero costosa en segundos. Todo el cross cabe en esa elección, repetida obstáculo tras obstáculo.",
          it:"Davanti a un ostacolo difficile, il percorso offre spesso due strade: la diretta, veloce e rischiosa, e l'opzione lunga, più sicura ma costosa in secondi. Tutto il cross sta in questa scelta, ripetuta ostacolo dopo ostacolo.",
          de:"Vor einem schweren Hindernis bietet die Strecke oft zwei Wege: den direkten, schnell und riskant, und die lange Alternative, sicherer, aber teuer an Sekunden. Das ganze Gelände steckt in dieser Wahl, Hindernis für Hindernis wiederholt.",
          ja:"難しい障害の前では、コースはしばしば二つの道を用意しています。速いが危険な直進ルートと、安全だが秒数を失うロングオプション。クロスカントリーのすべては、障害ごとに繰り返されるこの選択に詰まっています。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Poste-toi au complexe d'eau. C'est là que tout se voit : la préparation, le courage, les chevaux qui hésitent ou qui foncent — et le public y retient son souffle à chaque passage.",
          en:"Stand at the water complex. That's where everything shows: the preparation, the courage, the horses that hesitate or attack — and the crowd holds its breath at every pass.",
          es:"Colócate en el complejo de agua. Ahí se ve todo: la preparación, el valor, los caballos que dudan o que atacan — y el público contiene la respiración a cada paso.",
          it:"Piazzati al complesso d'acqua. È lì che si vede tutto: la preparazione, il coraggio, i cavalli che esitano o che attaccano — e il pubblico trattiene il fiato a ogni passaggio.",
          de:"Stell dich an den Wasserkomplex. Dort zeigt sich alles: die Vorbereitung, der Mut, die Pferde, die zögern oder angreifen — und das Publikum hält bei jedem Durchritt den Atem an.",
          ja:"ウォーターコンプレックスのそばに立ってみてください。すべてがそこに現れます。準備、勇気、ためらう馬、突き進む馬 — そして観客は一頭通るたびに息をのみます。"}}
    ]
  };

  MONDE.versailles = {
    lieu:"Île-de-France · France", carte:true, niveau:1,
    image:"un cheval immobile dans le manège de la Grande Écurie",
    lettre:{
      fr:["Six heures et demie, et les jardins n'appartenaient encore à personne.","Dans le manège de la Grande Écurie, un cheval passait du piaffer à l'arrêt sans que je voie la moindre demande — c'est exactement ça qu'on est venus apprendre à nommer."],
      en:["Half past six, and the gardens didn't belong to anyone yet.","In the riding hall of the Great Stables, a horse went from piaffe to halt without my seeing the slightest aid — and that is exactly what we came here to learn to name."],
      es:["Las seis y media, y los jardines aún no pertenecían a nadie.","En el picadero de la Gran Caballeriza, un caballo pasaba del piafé a la parada sin que yo viera la menor petición — exactamente eso es lo que vinimos a aprender a nombrar."],
      it:["Le sei e mezza, e i giardini non appartenevano ancora a nessuno.","Nel maneggio della Grande Scuderia, un cavallo passava dal piaffo all'alt senza che vedessi la minima richiesta — è esattamente questo che siamo venuti a imparare a nominare."],
      de:["Halb sieben, und die Gärten gehörten noch niemandem.","In der Reithalle des Großen Marstalls ging ein Pferd von der Piaffe zum Halten über, ohne dass ich die geringste Hilfe sah — genau das sind wir hergekommen, benennen zu lernen."],
      ja:["六時半。庭園はまだ誰のものでもなかった。","大厩舎の馬場では、一頭の馬がピアッフェから停止へと移った。合図はまるで見えなかった。私たちがここへ名前を学びに来たのは、まさにそれだ。"]},
    volets:[
     {t:{fr:"La Grande Écurie", en:"The Great Stables", es:"La Gran Caballeriza", it:"La Grande Scuderia", de:"Der Große Marstall", ja:"大厩舎"},
      c:{
          fr:"Face au château, les écuries du Roi abritent depuis des siècles une équitation de tradition. Aujourd'hui encore, on y travaille les chevaux dans l'esprit de l'école française : la légèreté d'abord.",
          en:"Facing the palace, the King's stables have housed a riding tradition for centuries. To this day, horses are worked there in the spirit of the French school: lightness first.",
          es:"Frente al palacio, las caballerizas del Rey albergan desde hace siglos una equitación de tradición. Aún hoy se trabaja allí a los caballos en el espíritu de la escuela francesa: la ligereza ante todo.",
          it:"Di fronte alla reggia, le scuderie del Re ospitano da secoli un'equitazione di tradizione. Ancora oggi vi si lavorano i cavalli nello spirito della scuola francese: la leggerezza prima di tutto.",
          de:"Gegenüber dem Schloss beherbergen die Stallungen des Königs seit Jahrhunderten eine Reittradition. Bis heute werden die Pferde dort im Geist der französischen Schule gearbeitet: Leichtigkeit zuerst.",
          ja:"宮殿の正面に建つ王の厩舎は、何世紀にもわたって伝統馬術を受け継いできました。今日でも馬たちはフランス学派の精神 — 何よりもまず軽さ — のもとで調教されています。"}},
     {t:{fr:"L'échelle de progression", en:"The training scale", es:"La escala de progresión", it:"La scala di progressione", de:"Die Ausbildungsskala", ja:"調教スケール"},
      c:{
          fr:"Rythme, décontraction, contact, impulsion, rectitude, rassembler : six mots, dans cet ordre, qui décrivent la formation de tout cheval de dressage. Le chapitre les enseigne un à un — chacun s'appuie sur le précédent.",
          en:"Rhythm, relaxation, contact, impulsion, straightness, collection: six words, in that order, describing the education of every dressage horse. The chapter teaches them one by one — each builds on the last.",
          es:"Ritmo, relajación, contacto, impulsión, rectitud, reunión: seis palabras, en ese orden, que describen la formación de todo caballo de doma. El capítulo las enseña una a una — cada una se apoya en la anterior.",
          it:"Ritmo, decontrazione, contatto, impulso, rettitudine, riunione: sei parole, in quest'ordine, che descrivono la formazione di ogni cavallo da dressage. Il capitolo le insegna una a una — ciascuna si appoggia alla precedente.",
          de:"Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung: sechs Wörter, in dieser Reihenfolge, die die Ausbildung jedes Dressurpferdes beschreiben. Das Kapitel lehrt sie eines nach dem anderen — jedes baut auf dem vorigen auf.",
          ja:"リズム、リラックス、コンタクト、推進力、真っ直ぐさ、収縮。この順に並ぶ六つの言葉が、すべてのドレッサージュ馬の育成を語ります。この章ではそれを一つずつ学びます — それぞれが前の段階の上に築かれるのです。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Réserve un matin d'hiver, quand les jardins sont vides. Le dressage se regarde dans le silence : c'est le seul sport où le but est que l'on ne voie rien — ni les aides, ni l'effort, seulement le cheval.",
          en:"Book a winter morning, when the gardens are empty. Dressage is watched in silence: it is the only sport whose goal is that you see nothing — not the aids, not the effort, only the horse.",
          es:"Reserva una mañana de invierno, cuando los jardines están vacíos. La doma se mira en silencio: es el único deporte cuyo objetivo es que no se vea nada — ni las ayudas, ni el esfuerzo, solo el caballo.",
          it:"Prenota una mattina d'inverno, quando i giardini sono vuoti. Il dressage si guarda in silenzio: è l'unico sport il cui scopo è che non si veda nulla — né gli aiuti, né lo sforzo, solo il cavallo.",
          de:"Wähl einen Wintermorgen, wenn die Gärten leer sind. Dressur schaut man in Stille: Es ist der einzige Sport, dessen Ziel es ist, dass man nichts sieht — nicht die Hilfen, nicht die Anstrengung, nur das Pferd.",
          ja:"庭園が空っぽになる冬の朝を選んでください。ドレッサージュは沈黙の中で見るものです。何も見えないことが目的である唯一のスポーツ — 扶助も、努力も見えず、ただ馬だけが見える。"}}
    ]
  };

  MONDE.fontainebleau = {
    lieu:"Île-de-France · France", carte:true, niveau:1,
    image:"des chevaux de quatre ans qui regardent tout",
    lettre:{
      fr:["Huit heures, et au paddock il n'y avait presque que des chevaux de quatre ans.","Ils regardaient tout — les fanions, les tribunes vides, une flaque — et leurs cavaliers les laissaient regarder : ici on ne cache pas le monde aux jeunes chevaux, on le leur présente."],
      en:["Eight o'clock, and the warm-up held almost nothing but four-year-olds.","They looked at everything — the flags, the empty stands, a puddle — and their riders let them look: here the world isn't hidden from young horses, it is introduced to them."],
      es:["Las ocho, y en la pista de calentamiento casi solo había caballos de cuatro años.","Lo miraban todo — los banderines, las gradas vacías, un charco — y sus jinetes los dejaban mirar: aquí no se esconde el mundo a los caballos jóvenes, se les presenta."],
      it:["Le otto, e nel paddock c'erano quasi soltanto cavalli di quattro anni.","Guardavano tutto — le bandierine, le tribune vuote, una pozzanghera — e i loro cavalieri li lasciavano guardare: qui il mondo non si nasconde ai giovani cavalli, glielo si presenta."],
      de:["Acht Uhr, und auf dem Abreiteplatz standen fast nur Vierjährige.","Sie schauten alles an — die Fähnchen, die leeren Tribünen, eine Pfütze — und ihre Reiter ließen sie schauen: Hier versteckt man die Welt nicht vor den jungen Pferden, man stellt sie ihnen vor."],
      ja:["八時。パドックにいたのは、ほとんどが四歳馬だった。","彼らはすべてを見ていた — 旗も、空っぽの観客席も、水たまりも。騎手たちは見せるままにしていた。ここでは若馬から世界を隠さない。世界を紹介してあげるのだ。"]},
    volets:[
     {t:{fr:"Le Grand Parquet", en:"The Grand Parquet", es:"El Grand Parquet", it:"Il Grand Parquet", de:"Das Grand Parquet", ja:"グラン・パルケ"},
      c:{
          fr:"Au bord de la forêt de Fontainebleau, un des grands terrains de concours français. Chaque été, la Grande Semaine y rassemble les meilleurs jeunes chevaux du pays : c'est ici qu'une génération entière se montre pour la première fois.",
          en:"On the edge of the Fontainebleau forest, one of France's great show grounds. Every summer, the Grande Semaine gathers the country's best young horses here: this is where an entire generation shows itself for the first time.",
          es:"Al borde del bosque de Fontainebleau, uno de los grandes terrenos de concurso franceses. Cada verano, la Grande Semaine reúne allí a los mejores caballos jóvenes del país: aquí es donde toda una generación se muestra por primera vez.",
          it:"Al margine della foresta di Fontainebleau, uno dei grandi campi gara francesi. Ogni estate, la Grande Semaine vi raduna i migliori giovani cavalli del paese: è qui che un'intera generazione si mostra per la prima volta.",
          de:"Am Rand des Waldes von Fontainebleau liegt einer der großen französischen Turnierplätze. Jeden Sommer versammelt die Grande Semaine dort die besten jungen Pferde des Landes: Hier zeigt sich eine ganze Generation zum ersten Mal.",
          ja:"フォンテーヌブローの森のほとりにある、フランス屈指の競技場。毎年夏の「グランド・スメーヌ」には国中の最良の若馬が集まります。ひとつの世代がはじめて姿を見せる場所が、ここなのです。"}},
     {t:{fr:"Le Cycle Classique", en:"The Classic Cycle", es:"El Ciclo Clásico", it:"Il Ciclo Classico", de:"Der Cycle Classique", ja:"クラシック・サイクル"},
      c:{
          fr:"Un circuit d'épreuves pensé pour former les chevaux de quatre, cinq et six ans, année après année. On n'y cherche pas la victoire, on y construit l'expérience : les parcours sont adaptés à l'âge, et le chrono compte moins que la manière.",
          en:"A circuit of classes designed to educate four-, five- and six-year-olds, year after year. You don't chase victory there, you build experience: the courses fit the age, and the clock matters less than the manner.",
          es:"Un circuito de pruebas pensado para formar a los caballos de cuatro, cinco y seis años, año tras año. No se busca la victoria, se construye la experiencia: los recorridos se adaptan a la edad, y el crono importa menos que la manera.",
          it:"Un circuito di prove pensato per formare i cavalli di quattro, cinque e sei anni, anno dopo anno. Non ci si cerca la vittoria, ci si costruisce l'esperienza: i percorsi sono adattati all'età, e il cronometro conta meno della maniera.",
          de:"Ein Prüfungszirkel, der Vier-, Fünf- und Sechsjährige Jahr für Jahr ausbildet. Man jagt dort nicht dem Sieg nach, man baut Erfahrung auf: Die Parcours passen zum Alter, und die Uhr zählt weniger als die Manier.",
          ja:"四歳、五歳、六歳の馬を年ごとに育てるために設計された競技サイクル。ここで求めるのは勝利ではなく経験です。コースは年齢に合わせて作られ、タイムよりも跳び方が大切にされます。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Regarde les épreuves des quatre ans, pas la finale. Tout y est encore imparfait, et c'est ça qui est passionnant : tu verras des chevaux découvrir, hésiter, comprendre — le futur du sport, avant qu'il soit lisse.",
          en:"Watch the four-year-old classes, not the final. Everything there is still imperfect, and that's what makes it fascinating: you'll see horses discover, hesitate, understand — the future of the sport, before it gets polished.",
          es:"Mira las pruebas de los cuatro años, no la final. Todo es aún imperfecto, y eso es lo apasionante: verás caballos descubrir, dudar, comprender — el futuro del deporte, antes de que sea pulido.",
          it:"Guarda le prove dei quattro anni, non la finale. Tutto è ancora imperfetto, ed è questo l'appassionante: vedrai cavalli scoprire, esitare, capire — il futuro dello sport, prima che diventi levigato.",
          de:"Schau dir die Prüfungen der Vierjährigen an, nicht das Finale. Dort ist noch alles unvollkommen, und genau das ist spannend: Du siehst Pferde entdecken, zögern, verstehen — die Zukunft des Sports, bevor sie glatt wird.",
          ja:"決勝ではなく、四歳馬の競技を見てください。そこではすべてがまだ不完全で、だからこそ心を打つのです。発見し、ためらい、理解していく馬たち — 磨き上げられる前の、この競技の未来がそこにあります。"}}
    ]
  };

  MONDE.barcelone = {
    lieu:"Catalogne · Espagne", carte:true, niveau:1,
    image:"un camion qui décharge au-dessus de la ville",
    lettre:{
      fr:["Dix heures, et le camion venait de couper son moteur au-dessus de la ville.","On n'a pas débarqué tout de suite : on a laissé le cheval respirer, pont fermé, le temps qu'il comprenne que ça ne bougeait plus — et c'est là que j'ai su que voyager, ça s'apprend."],
      en:["Ten o'clock, and the lorry had just cut its engine above the city.","We didn't unload right away: we let the horse breathe, ramp closed, until he understood that nothing was moving anymore — and that's when I knew that travelling is something you learn."],
      es:["Las diez, y el camión acababa de apagar el motor sobre la ciudad.","No desembarcamos enseguida: dejamos respirar al caballo, con la rampa cerrada, hasta que entendió que ya no se movía nada — y ahí supe que viajar se aprende."],
      it:["Le dieci, e il camion aveva appena spento il motore sopra la città.","Non abbiamo fatto scendere subito: abbiamo lasciato respirare il cavallo, rampa chiusa, finché ha capito che non si muoveva più niente — ed è lì che ho capito che viaggiare si impara."],
      de:["Zehn Uhr, und der Transporter hatte gerade über der Stadt den Motor abgestellt.","Wir haben nicht sofort ausgeladen: Wir ließen das Pferd atmen, Rampe zu, bis es begriff, dass sich nichts mehr bewegte — und da wusste ich, dass Reisen etwas ist, das man lernt."],
      ja:["十時。馬運車は街を見下ろす場所でエンジンを切ったばかりだった。","すぐには降ろさなかった。スロープを閉じたまま、馬に息をつかせ、もう何も動かないと理解するのを待った — 旅は学ぶものなのだと、そのときわかった。"]},
    volets:[
     {t:{fr:"Le Real Club de Polo", en:"The Real Club de Polo", es:"El Real Club de Polo", it:"Il Real Club de Polo", de:"Der Real Club de Polo", ja:"レアル・クルブ・デ・ポロ"},
      c:{
          fr:"Dans la ville même, un club centenaire qui accueille chaque automne une des grandes échéances du saut d'obstacles par équipes. Des chevaux venus de toute l'Europe y arrivent par la route — le voyage fait partie du sport.",
          en:"Inside the city itself, a century-old club that hosts one of team show jumping's great fixtures every autumn. Horses from all over Europe arrive by road — the journey is part of the sport.",
          es:"En la propia ciudad, un club centenario que acoge cada otoño una de las grandes citas del salto de obstáculos por equipos. Caballos de toda Europa llegan por carretera — el viaje forma parte del deporte.",
          it:"Nella città stessa, un club centenario che ospita ogni autunno uno dei grandi appuntamenti del salto ostacoli a squadre. Cavalli da tutta Europa vi arrivano su strada — il viaggio fa parte dello sport.",
          de:"Mitten in der Stadt liegt ein hundertjähriger Club, der jeden Herbst eines der großen Nationenpreis-Ereignisse des Springsports empfängt. Pferde aus ganz Europa kommen über die Straße — die Reise gehört zum Sport.",
          ja:"街の中にある百年の歴史を持つクラブで、毎年秋には障害馬術の団体戦の大一番が開かれます。欧州じゅうから馬たちが陸路でやって来ます — 旅そのものが、この競技の一部なのです。"}},
     {t:{fr:"L'attache rapide", en:"The quick-release tie", es:"El atado de seguridad", it:"La legatura di sicurezza", de:"Die Sicherheitsanbindung", ja:"安全結び"},
      c:{
          fr:"Un nœud ou un mousqueton qui cède d'un geste. Dans un van qui roule, un cheval attaché ferme se blesse à la nuque : tout le chapitre tient dans cette idée — sécuriser sans jamais bloquer.",
          en:"A knot or clip that gives way with one pull. In a moving trailer, a horse tied fast injures its poll: the whole chapter lives in that idea — secure without ever locking.",
          es:"Un nudo o mosquetón que cede de un gesto. En un remolque en marcha, un caballo atado en firme se lesiona la nuca: todo el capítulo cabe en esa idea — asegurar sin bloquear jamás.",
          it:"Un nodo o un moschettone che cede con un gesto. In un van in movimento, un cavallo legato saldo si ferisce alla nuca: tutto il capitolo sta in questa idea — mettere in sicurezza senza mai bloccare.",
          de:"Ein Knoten oder Karabiner, der mit einem Griff nachgibt. Im fahrenden Hänger verletzt sich ein fest angebundenes Pferd am Genick: Das ganze Kapitel steckt in diesem Gedanken — sichern, ohne je zu blockieren.",
          ja:"ひと動作で外れる結び目や金具。走行中の馬運車では、固く繋がれた馬は首の付け根を痛めます。この章のすべてはこの一点にあります — 決して固定せずに、安全を確保すること。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Arrive tôt et regarde les camions se garer : le déchargement des chevaux est un spectacle en soi. Tu reconnaîtras tout — le pont, les protections, la barre de recul — parce que ce chapitre te l'aura appris avant.",
          en:"Come early and watch the lorries park: unloading the horses is a show in itself. You'll recognise everything — the ramp, the boots, the breeching bar — because this chapter will have taught you first.",
          es:"Llega temprano y mira aparcar los camiones: la descarga de los caballos es un espectáculo en sí. Lo reconocerás todo — la rampa, las protecciones, la barra trasera — porque este capítulo te lo habrá enseñado antes.",
          it:"Arriva presto e guarda i camion parcheggiare: lo scarico dei cavalli è uno spettacolo in sé. Riconoscerai tutto — la rampa, le protezioni, la barra posteriore — perché questo capitolo te lo avrà insegnato prima.",
          de:"Komm früh und schau den Transportern beim Einparken zu: das Ausladen der Pferde ist ein Schauspiel für sich. Du wirst alles wiedererkennen — die Rampe, die Gamaschen, die Heckstange — weil dieses Kapitel es dir vorher beigebracht hat.",
          ja:"早めに着いて、馬運車が停まるところを見てください。馬たちを降ろす作業は、それ自体がひとつの見せ場です。スロープ、プロテクター、後方バー — 全部わかるはずです。この章が先に教えてくれているのだから。"}}
    ]
  };

  MONDE.taupo = {
    lieu:"Nouvelle-Zélande", carte:true, niveau:1,
    image:"une cavalière au galop, les bras écartés, le lac au fond",
    lettre:{
      fr:["Quatre heures de l'après-midi, et personne ne tenait rien.","Une cavalière est passée au galop le long du lac, sans filet, les bras écartés — et son cheval a tourné quand elle a tourné les épaules. J'ai cherché la longe des yeux. Il n'y en avait pas."],
      en:["Four in the afternoon, and nobody was holding anything.","A rider cantered past along the lake, no bridle, arms spread wide — and her horse turned when her shoulders turned. I looked for the lead rope. There wasn't one."],
      es:["Las cuatro de la tarde, y nadie sujetaba nada.","Una amazona pasó al galope junto al lago, sin nada, con los brazos abiertos — y su caballo giró cuando giraron sus hombros. Busqué el ramal con la mirada. No había."],
      it:["Le quattro del pomeriggio, e nessuno teneva niente.","Una cavallerizza è passata al galoppo lungo il lago, senza niente, a braccia aperte — e il suo cavallo ha girato quando lei ha girato le spalle. Ho cercato la lunghina con gli occhi. Non c'era."],
      de:["Vier Uhr nachmittags, und niemand hielt irgendetwas fest.","Eine Reiterin galoppierte am See entlang vorbei, ohne Zaum, mit ausgebreiteten Armen — und ihr Pferd wendete, als ihre Schultern wendeten. Ich suchte mit den Augen den Strick. Es gab keinen."],
      ja:["午後四時。誰も、何も持っていなかった。","ひとりの騎手が湖沿いを駈歩で駆け抜けた。頭絡もなく、両腕を広げて — 彼女が肩を回すと、馬も曲がった。私は目で引き綱を探した。なかった。"]},
    volets:[
     {t:{fr:"Le lac Taupō", en:"Lake Taupō", es:"El lago Taupō", it:"Il lago Taupō", de:"Der Taupō-See", ja:"タウポ湖"},
      c:{
          fr:"Un lac immense au creux d'un ancien volcan, des pâtures qui courent jusqu'aux montagnes : la Nouvelle-Zélande élève ses chevaux dehors, en troupeau, et cette liberté-là se retrouve jusque dans la façon de les monter.",
          en:"A huge lake in the hollow of an old volcano, pastures running all the way to the mountains: New Zealand raises its horses outdoors, in herds, and that freedom carries all the way into how they are ridden.",
          es:"Un lago inmenso en el hueco de un antiguo volcán, pastos que corren hasta las montañas: Nueva Zelanda cría a sus caballos fuera, en manada, y esa libertad se encuentra hasta en la manera de montarlos.",
          it:"Un lago immenso nel cavo di un antico vulcano, pascoli che corrono fino alle montagne: la Nuova Zelanda alleva i suoi cavalli fuori, in branco, e quella libertà si ritrova fin nel modo di montarli.",
          de:"Ein riesiger See in der Mulde eines alten Vulkans, Weiden, die bis zu den Bergen laufen: Neuseeland zieht seine Pferde draußen auf, in der Herde, und diese Freiheit findet sich bis in die Art, sie zu reiten.",
          ja:"古い火山のくぼみに広がる巨大な湖と、山まで続く牧草地。ニュージーランドでは馬を外で、群れのまま育てます。その自由は、馬の乗り方にまで息づいています。"}},
     {t:{fr:"La connexion", en:"The connection", es:"La conexión", it:"La connessione", de:"Die Verbindung", ja:"コネクション"},
      c:{
          fr:"Le mot central du chapitre : ce lien qui fait qu'un cheval choisit de rester avec toi sans y être obligé. Elle ne se décrète pas — elle se construit par le langage du corps, le relâchement, la récompense au juste moment.",
          en:"The chapter's central word: the bond that makes a horse choose to stay with you without being made to. It can't be decreed — it is built through body language, release, and reward at the right moment.",
          es:"La palabra central del capítulo: ese vínculo que hace que un caballo elija quedarse contigo sin estar obligado. No se decreta — se construye con el lenguaje corporal, la relajación y la recompensa en el momento justo.",
          it:"La parola centrale del capitolo: quel legame che fa sì che un cavallo scelga di restare con te senza esservi costretto. Non si decreta — si costruisce con il linguaggio del corpo, il rilascio e la ricompensa al momento giusto.",
          de:"Das zentrale Wort des Kapitels: das Band, das ein Pferd dazu bringt, freiwillig bei dir zu bleiben. Sie lässt sich nicht verordnen — sie entsteht durch Körpersprache, Nachgeben und die Belohnung im richtigen Moment.",
          ja:"この章の中心となる言葉。強制されることなく、馬が自分の意志であなたのそばにいることを選ぶ — その絆のことです。命令では生まれません。ボディランゲージ、力を抜くこと、そしてちょうどよい瞬間のご褒美によって築かれていくのです。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Ne cherche pas un spectacle : le Free Riding ne se visite pas, il se pratique. Trouve une écurie qui travaille à pied et commence par là — le galop sans filet est la dernière page du livre, jamais la première.",
          en:"Don't look for a show: Free Riding isn't visited, it's practised. Find a yard that does groundwork and start there — the bridleless gallop is the last page of the book, never the first.",
          es:"No busques un espectáculo: el Free Riding no se visita, se practica. Encuentra una cuadra que trabaje pie a tierra y empieza por ahí — el galope sin nada es la última página del libro, nunca la primera.",
          it:"Non cercare uno spettacolo: il Free Riding non si visita, si pratica. Trova una scuderia che lavori da terra e comincia da lì — il galoppo senza niente è l'ultima pagina del libro, mai la prima.",
          de:"Such kein Spektakel: Free Riding besichtigt man nicht, man übt es. Find einen Stall, der Bodenarbeit macht, und fang dort an — der Galopp ohne Zaum ist die letzte Seite des Buches, nie die erste.",
          ja:"ショーを探さないでください。フリーライディングは見物するものではなく、実践するものです。地上作業をしている厩舎を見つけて、そこから始めてください — 何も着けない駈歩は本の最後のページであって、最初のページでは決してありません。"}}
    ]
  };

  MONDE.santaynez = {
    lieu:"Californie · États-Unis", carte:true, niveau:1,
    image:"la poussière dorée d'un rond de longe au soir",
    lettre:{
      fr:["Six heures moins le quart, la poussière du rond de longe devenait dorée.","L'homme au chapeau n'a presque pas bougé : une hanche, un regard, un pas de côté — et le poulain a cédé, comme si la conversation durait depuis toujours."],
      en:["Quarter to six, and the round pen dust was turning golden.","The man in the hat barely moved: a hip, a glance, one step aside — and the colt yielded, as if the conversation had been going on forever."],
      es:["Las seis menos cuarto, y el polvo del círculo se volvía dorado.","El hombre del sombrero apenas se movió: una cadera, una mirada, un paso al lado — y el potro cedió, como si la conversación durara desde siempre."],
      it:["Le sei meno un quarto, e la polvere del tondino diventava dorata.","L'uomo col cappello non si è quasi mosso: un'anca, uno sguardo, un passo di lato — e il puledro ha ceduto, come se la conversazione durasse da sempre."],
      de:["Viertel vor sechs, und der Staub des Roundpens wurde golden.","Der Mann mit dem Hut bewegte sich kaum: eine Hüfte, ein Blick, ein Schritt zur Seite — und das Fohlen gab nach, als liefe das Gespräch schon immer."],
      ja:["六時十五分前。ラウンドペンの砂埃が金色に染まっていく。","帽子の男はほとんど動かなかった。腰をひとつ、視線をひとつ、横に一歩 — それだけで若馬は譲った。まるでその会話が、ずっと昔から続いていたかのように。"]},
    volets:[
     {t:{fr:"La vallée de Santa Ynez", en:"The Santa Ynez Valley", es:"El valle de Santa Ynez", it:"La valle di Santa Ynez", de:"Das Santa-Ynez-Tal", ja:"サンタイネズ・バレー"},
      c:{
          fr:"Des collines de chênes et des ranchs entre montagnes et Pacifique. La Californie des chevaux de travail, où le horsemanship s'est transmis de génération en génération, du bétail au rond de longe.",
          en:"Oak-covered hills and ranches between the mountains and the Pacific. The California of working horses, where horsemanship has been handed down generation to generation, from cattle work to the round pen.",
          es:"Colinas de robles y ranchos entre las montañas y el Pacífico. La California de los caballos de trabajo, donde el horsemanship se ha transmitido de generación en generación, del ganado al círculo de trabajo.",
          it:"Colline di querce e ranch tra le montagne e il Pacifico. La California dei cavalli da lavoro, dove l'horsemanship si è tramandato di generazione in generazione, dal bestiame al tondino.",
          de:"Eichenhügel und Ranches zwischen den Bergen und dem Pazifik. Das Kalifornien der Arbeitspferde, wo Horsemanship von Generation zu Generation weitergegeben wurde, von der Rinderarbeit bis zum Roundpen.",
          ja:"樫の丘と牧場が、山と太平洋のあいだに広がっています。ここは働く馬たちのカリフォルニア。ホースマンシップが牛追いからラウンドペンまで、世代から世代へと受け継がれてきた土地です。"}},
     {t:{fr:"Pression et relâchement", en:"Pressure and release", es:"Presión y cesión", it:"Pressione e rilascio", de:"Druck und Nachgeben", ja:"圧と解放"},
      c:{
          fr:"Le principe fondateur : on demande par une pression légère, et on relâche À L'INSTANT où le cheval cède. C'est le relâchement qui enseigne, pas la pression — et le juste moment, ce timing-là, est tout l'art du chapitre.",
          en:"The founding principle: you ask with light pressure, and you release THE INSTANT the horse yields. It's the release that teaches, not the pressure — and the right moment, that timing, is the whole art of this chapter.",
          es:"El principio fundador: se pide con una presión ligera, y se cede EN EL INSTANTE en que el caballo cede. Es la cesión la que enseña, no la presión — y el momento justo, ese timing, es todo el arte del capítulo.",
          it:"Il principio fondatore: si chiede con una pressione leggera, e si rilascia NELL'ISTANTE in cui il cavallo cede. È il rilascio che insegna, non la pressione — e il momento giusto, quel timing, è tutta l'arte del capitolo.",
          de:"Das Gründungsprinzip: Man fragt mit leichtem Druck, und man gibt IN DEM MOMENT nach, in dem das Pferd nachgibt. Das Nachgeben lehrt, nicht der Druck — und der richtige Moment, dieses Timing, ist die ganze Kunst dieses Kapitels.",
          ja:"根本の原則です。軽い圧で求め、馬が譲ったまさにその瞬間に解放する。教えるのは圧ではなく解放です — そしてその「ちょうどよい瞬間」、あのタイミングこそが、この章の芸術のすべてです。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Assiste à un débourrage plutôt qu'à un show. Tu verras le vrai horsemanship : lent, silencieux, presque ennuyeux de l'extérieur — jusqu'au moment où le poulain accepte la selle comme si c'était son idée.",
          en:"Watch a colt being started rather than a show. You'll see real horsemanship: slow, quiet, almost boring from the outside — until the moment the colt accepts the saddle as if it were his own idea.",
          es:"Asiste a una doma de potro en lugar de a un espectáculo. Verás el verdadero horsemanship: lento, silencioso, casi aburrido desde fuera — hasta el momento en que el potro acepta la silla como si fuera idea suya.",
          it:"Assisti a un addestramento di puledro invece che a uno show. Vedrai il vero horsemanship: lento, silenzioso, quasi noioso dall'esterno — fino al momento in cui il puledro accetta la sella come se fosse un'idea sua.",
          de:"Schau dir ein Anreiten an statt einer Show. Du wirst echtes Horsemanship sehen: langsam, still, von außen fast langweilig — bis zu dem Moment, in dem das Fohlen den Sattel annimmt, als wäre es seine eigene Idee.",
          ja:"ショーではなく、若馬の馴致を見に行ってください。本物のホースマンシップが見られます。ゆっくりで、静かで、外から見ればほとんど退屈 — 若馬が、まるで自分の思いつきのように鞍を受け入れる、その瞬間までは。"}}
    ]
  };

  MONDE.flyinge = {
    lieu:"Scanie · Suède", carte:true, niveau:1,
    image:"la forge allumée, le manoir jaune au drapeau suédois",
    lettre:{
      fr:["Sept heures du soir, et la forge sonnait encore.","Le maréchal a levé le pied, lu la sole comme une carte, et râpé trois fois — pas quatre. « Le fer se règle sur le pied », m'a-t-il dit, « jamais le contraire. »"],
      en:["Seven in the evening, and the forge was still ringing.","The farrier lifted the foot, read the sole like a map, and rasped three times — not four. ’The shoe is fitted to the foot,’ he told me, ’never the other way round.’"],
      es:["Las siete de la tarde, y la fragua aún sonaba.","El herrador levantó el pie, leyó la palma como un mapa, y limó tres veces — no cuatro. « El hierro se ajusta al pie », me dijo, « nunca al revés. »"],
      it:["Le sette di sera, e la forgia suonava ancora.","Il maniscalco ha sollevato il piede, letto la suola come una mappa, e raspato tre volte — non quattro. « Il ferro si regola sul piede », mi ha detto, « mai il contrario. »"],
      de:["Sieben Uhr abends, und die Schmiede klang noch.","Der Hufschmied hob den Huf, las die Sohle wie eine Karte und raspelte dreimal — nicht viermal. „Das Eisen richtet sich nach dem Huf’, sagte er mir, „niemals umgekehrt.’"],
      ja:["夜の七時。鍛冶場ではまだ槌の音が響いていた。","装蹄師は蹄を持ち上げ、蹄底を地図のように読み、やすりを三度かけた — 四度ではなく。「蹄鉄を蹄に合わせるんだ」と彼は言った。「その逆は、決してない。」"]},
    volets:[
     {t:{fr:"Le haras de Flyinge", en:"The Flyinge stud", es:"La yeguada de Flyinge", it:"Il haras di Flyinge", de:"Das Gestüt Flyinge", ja:"フリンゲ牧場"},
      c:{
          fr:"L'un des plus anciens haras du monde, au sud de la Suède, où l'on élève et forme des chevaux depuis le XVIIe siècle. La maréchalerie y est une école à part entière : on y apprend le pied avant le fer.",
          en:"One of the oldest studs in the world, in southern Sweden, breeding and training horses since the seventeenth century. Farriery is a school in its own right there: you learn the foot before the shoe.",
          es:"Una de las yeguadas más antiguas del mundo, en el sur de Suecia, donde se crían y forman caballos desde el siglo XVII. La herrería es allí una escuela por derecho propio: se aprende el pie antes que el hierro.",
          it:"Uno dei più antichi haras del mondo, nel sud della Svezia, dove si allevano e si formano cavalli dal Seicento. La mascalcia vi è una scuola a pieno titolo: si impara il piede prima del ferro.",
          de:"Eines der ältesten Gestüte der Welt, in Südschweden, wo seit dem 17. Jahrhundert Pferde gezüchtet und ausgebildet werden. Der Hufbeschlag ist dort eine eigene Schule: Man lernt erst den Huf, dann das Eisen.",
          ja:"スウェーデン南部にある、世界でもっとも古い牧場のひとつ。十七世紀から馬の生産と育成が続いています。ここでは装蹄はひとつの独立した学校です — 蹄鉄より先に、まず蹄を学ぶのです。"}},
     {t:{fr:"Pas de pied, pas de cheval", en:"No foot, no horse", es:"Sin pie no hay caballo", it:"Niente piede, niente cavallo", de:"Ohne Huf kein Pferd", ja:"蹄なくして馬なし"},
      c:{
          fr:"Le vieux dicton dit tout : la paroi, la sole, la fourchette portent l'animal entier. Le chapitre apprend à nommer chaque partie du pied et chaque geste du maréchal — parage, ferrage, jusqu'au pinçon.",
          en:"The old saying says it all: wall, sole and frog carry the whole animal. The chapter teaches you to name every part of the foot and every one of the farrier's gestures — trimming, shoeing, right down to the clip.",
          es:"El viejo dicho lo dice todo: la pared, la palma y la ranilla llevan al animal entero. El capítulo enseña a nombrar cada parte del pie y cada gesto del herrador — el recorte, el herraje, hasta el pestillo.",
          it:"Il vecchio detto dice tutto: la muraglia, la suola e il fettone portano l'animale intero. Il capitolo insegna a nominare ogni parte del piede e ogni gesto del maniscalco — il pareggio, la ferratura, fino alla barbetta.",
          de:"Das alte Sprichwort sagt alles: Wand, Sohle und Strahl tragen das ganze Tier. Das Kapitel lehrt, jeden Teil des Hufs und jeden Handgriff des Schmieds zu benennen — Ausschneiden, Beschlagen, bis hin zur Kappe.",
          ja:"古いことわざがすべてを語っています。蹄壁、蹄底、蹄叉が、馬の全体重を支えているのです。この章では蹄の各部の名前と、装蹄師のひとつひとつの手仕事 — 削蹄、装蹄、そしてクリップまで — を学びます。"}},
     {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí", it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
      c:{
          fr:"Demande à voir la forge plutôt que les manèges. Regarder un maréchal ajuster un fer à chaud, c'est voir cinq siècles de savoir tenir dans un geste — et tu sauras enfin ce que veut dire « parer » un pied.",
          en:"Ask to see the forge rather than the arenas. Watching a farrier hot-fit a shoe is watching five centuries of knowledge held in one gesture — and you'll finally know what it means to trim a foot.",
          es:"Pide ver la fragua en lugar de los picaderos. Ver a un herrador ajustar un hierro en caliente es ver cinco siglos de saber caber en un gesto — y por fin sabrás qué significa recortar un pie.",
          it:"Chiedi di vedere la forgia invece dei maneggi. Guardare un maniscalco aggiustare un ferro a caldo è vedere cinque secoli di sapere stare in un gesto — e saprai finalmente cosa vuol dire pareggiare un piede.",
          de:"Bitte darum, die Schmiede zu sehen statt der Reithallen. Einem Schmied beim heißen Aufpassen eines Eisens zuzusehen heißt, fünf Jahrhunderte Wissen in einer Geste zu sehen — und du weißt endlich, was es heißt, einen Huf auszuschneiden.",
          ja:"馬場ではなく、鍛冶場を見せてもらってください。装蹄師が熱した蹄鉄を合わせる姿は、五世紀分の知恵がひとつの手つきに宿る瞬間です — そして「削蹄する」とはどういうことか、ようやくわかるはずです。"}}
    ]
  };

  /* ajout clé par clé : on ne remplace jamais une ville déjà présente */
  var k;
  for(k in MONDE){
    if(Object.prototype.hasOwnProperty.call(MONDE,k) &&
       !Object.prototype.hasOwnProperty.call(window.HYPE_LINGO_VILLES,k)){
      window.HYPE_LINGO_VILLES[k] = MONDE[k];
    }
  }
})();
