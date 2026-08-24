/* hype-lingo-villes.js — Hype Lingo · Voyage 1 « Anglais »
   ==================================================================
   LES TEXTES DES DIX VILLES — désormais en SIX LANGUES.

   Version 3, 7 août 2026 : Blandine a validé les textes français
   (« traduis tout partout »). Les cinq autres langues sont ajoutées
   DANS `lettre` et dans chaque volet, sans toucher au français.
   Les volets portent maintenant un objet par langue, comme dans
   hype-lingo-villes-monde.js — `tx()` accepte les deux formes.

   Version 2 (rappel) — réécrite après relecture. Trois changements :
     · chaque lettre raconte un MOMENT VÉCU, pas une présentation ;
     · chaque ville porte UNE IMAGE MENTALE, et la lettre la renforce ;
     · chaque ville a UNE ANECDOTE dont on se souvient.

   L'idée directrice : la vidéo montre le lieu, la carte postale en garde
   le souvenir, la lettre raconte ce que Hype a ressenti en arrivant.
   Les trois doivent porter la même émotion.

   Chaque ville porte :
     lieu    la ligne sous le titre, en anglais (c'est une carte postale)
     carte   true si son image carte-<ref>.webp existe
     image   l'image mentale de la ville — repère de travail, non affiché
     lettre  le verso manuscrit de la carte postale, par langue
     volets  trois dépliants « Prolonge ton voyage », par langue

   ⚠️ FUSION : ce fichier remplace l'objet VILLES qui était en dur dans
   lingo.html. Si une autre conversation y a ajouté des textes, les
   récupérer clé par clé — ne pas écraser.

   ⚠️ Les entrées marquées // ?? demandent vérification avant publication.
   ================================================================== */

window.HYPE_LINGO_VILLES = {

/* ============ 1 · NEWMARKET · L'écurie ============ */
newmarket:{
  lieu:"Suffolk · United Kingdom", carte:true,
  image:"les pur-sang traversent la ville",
  lettre:{
    fr:["Ce matin, j'ai découvert Newmarket.",
        "Je me suis arrêté à un passage cavalier, et c'est la voiture devant moi qui a attendu. Une vingtaine de pur-sang sont passés dans la brume, sans un mot, et la ville dormait encore."],
    en:["This morning, I discovered Newmarket.",
        "I stopped at a horse crossing, and it was the car in front of me that waited. Twenty or so thoroughbreds passed through the mist, without a word, and the town was still asleep."],
    es:["Esta mañana descubrí Newmarket.",
        "Me detuve en un paso de caballos, y fue el coche de delante el que esperó. Una veintena de purasangres pasaron entre la bruma, sin una palabra, y la ciudad aún dormía."],
    it:["Stamattina ho scoperto Newmarket.",
        "Mi sono fermato a un passaggio per cavalli, ed è stata l'auto davanti a me ad aspettare. Una ventina di purosangue sono passati nella foschia, senza una parola, e la città dormiva ancora."],
    de:["Heute Morgen habe ich Newmarket entdeckt.",
        "Ich hielt an einem Pferdeübergang, und es war das Auto vor mir, das wartete. An die zwanzig Vollblüter zogen im Nebel vorbei, ohne ein Wort, und die Stadt schlief noch."],
    ja:["今朝、ニューマーケットに出会った。",
        "馬専用の横断路で足を止めると、待っていたのは私の前の車のほうだった。二十頭ほどのサラブレッドが霧の中を、ひと言もなく通り過ぎていき、町はまだ眠っていた。"]},
  volets:[
   {t:{fr:"La race d'ici", en:"The breed of this place", es:"La raza de aquí",
       it:"La razza di qui", de:"Die Rasse von hier", ja:"この土地の品種"},
    c:{
      fr:"Le pur-sang anglais. Trois étalons fondateurs importés au tournant du XVIII siècle, croisés avec des juments locales : toute la race en descend. Sélectionné sur une seule qualité, la vitesse tenue sur la distance.",
      en:"The English thoroughbred. Three foundation stallions imported at the turn of the 18th century, crossed with local mares: the whole breed descends from them. Selected for a single quality — speed held over a distance.",
      es:"El purasangre inglés. Tres sementales fundadores importados a comienzos del siglo XVIII, cruzados con yeguas locales: toda la raza desciende de ellos. Seleccionado por una sola cualidad: la velocidad mantenida en la distancia.",
      it:"Il purosangue inglese. Tre stalloni fondatori importati a cavallo del Settecento, incrociati con giumente locali: tutta la razza discende da loro. Selezionato per una sola qualità: la velocità tenuta sulla distanza.",
      de:"Das Englische Vollblut. Drei Gründerhengste, um die Wende zum 18. Jahrhundert eingeführt und mit einheimischen Stuten gekreuzt: Die ganze Rasse stammt von ihnen ab. Gezüchtet auf eine einzige Eigenschaft — über die Distanz gehaltene Geschwindigkeit.",
      ja:"イギリスのサラブレッド。十八世紀初頭に輸入された三頭の基礎種牡馬が地元の牝馬と交配され、この品種のすべてがそこから生まれました。選抜の基準はただひとつ — 距離を走りきる速さです。"}},
   {t:{fr:"Le rendez-vous", en:"The meeting place", es:"La cita",
       it:"L'appuntamento", de:"Der Treffpunkt", ja:"開催地"},
    c:{
      fr:"Deux hippodromes se partagent l'année, le Rowley Mile et la July Course. Le premier tirerait son nom du cheval favori de Charles II, qui installa sa cour ici au XVII siècle pour suivre les courses — et courait lui-même.",
      en:"Two racecourses share the year, the Rowley Mile and the July Course. The first is said to take its name from the favourite horse of Charles II, who moved his court here in the 17th century to follow the racing — and rode races himself.",
      es:"Dos hipódromos se reparten el año, la Rowley Mile y el July Course. Se dice que el primero toma su nombre del caballo favorito de Carlos II, que instaló aquí su corte en el siglo XVII para seguir las carreras — y corría él mismo.",
      it:"Due ippodromi si dividono l'anno, il Rowley Mile e il July Course. Si dice che il primo prenda il nome dal cavallo preferito di Carlo II, che nel Seicento trasferì qui la sua corte per seguire le corse — e correva lui stesso.",
      de:"Zwei Rennbahnen teilen sich das Jahr, die Rowley Mile und der July Course. Die erste soll ihren Namen vom Lieblingspferd Karls II. haben, der im 17. Jahrhundert seinen Hof hierher verlegte, um die Rennen zu verfolgen — und selbst Rennen ritt.",
      ja:"一年をふたつの競馬場が分け合います。ローリーマイルとジュライコース。前者の名は、十七世紀に競馬を追ってここへ宮廷を移したチャールズ二世の愛馬に由来すると伝えられています — 王自身も馬を駆りました。"}}, // ?? l'origine du nom « Rowley » est traditionnelle, à formuler prudemment
   {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí",
       it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
    c:{
      fr:"Va sur la lande au petit matin. Des chemins de sable traversent la ville et croisent les routes : aux passages cavaliers, les voitures s'arrêtent. Plus de deux mille chevaux y sont à l'entraînement.",
      en:"Go up on the heath at first light. Sand tracks run through the town and cross the roads: at the horse crossings, the cars stop. More than two thousand horses are in training there.",
      es:"Sube al páramo al amanecer. Caminos de arena atraviesan la ciudad y cruzan las carreteras: en los pasos de caballos, los coches se detienen. Más de dos mil caballos se entrenan allí.",
      it:"Sali sulla brughiera alle prime luci. Sentieri di sabbia attraversano la città e incrociano le strade: ai passaggi per cavalli, le auto si fermano. Più di duemila cavalli vi sono in allenamento.",
      de:"Geh im ersten Morgenlicht auf die Heide. Sandwege ziehen durch die Stadt und kreuzen die Straßen: An den Pferdeübergängen halten die Autos an. Mehr als zweitausend Pferde stehen dort im Training.",
      ja:"夜明けの荒野へ行ってみて。砂の馬道が町を横切り、車道と交差します。馬の横断路では車のほうが止まるのです。二千頭を超える馬たちが、そこで調教を受けています。"}}
  ]},

/* ============ 2 · LAMBOURN · Le pansage ============ */
lambourn:{
  lieu:"Berkshire · United Kingdom", carte:true,
  image:"les lots montent sur les Downs",
  lettre:{
    fr:["Il faisait encore nuit quand la cour s'est allumée.",
        "J'ai entendu les seaux, puis les sabots sur le pavé. Le temps que j'arrive en haut des Downs, les lots étaient déjà partis — je n'ai vu que la buée qu'ils avaient laissée derrière eux."],
    en:["It was still dark when the yard lit up.",
        "I heard the buckets, then the hooves on the cobbles. By the time I reached the top of the Downs, the strings had already gone — all I saw was the steam they had left behind them."],
    es:["Aún era de noche cuando se encendió la cuadra.",
        "Oí los cubos, luego los cascos sobre el empedrado. Para cuando llegué a lo alto de los Downs, los lotes ya se habían ido — solo vi el vaho que habían dejado tras ellos."],
    it:["Era ancora buio quando il cortile si è acceso.",
        "Ho sentito i secchi, poi gli zoccoli sul selciato. Quando sono arrivato in cima ai Downs, i lotti erano già partiti — ho visto solo il vapore che si erano lasciati dietro."],
    de:["Es war noch dunkel, als der Hof aufleuchtete.",
        "Ich hörte die Eimer, dann die Hufe auf dem Pflaster. Als ich oben auf den Downs ankam, waren die Lots schon fort — ich sah nur noch den Dampf, den sie hinter sich gelassen hatten."],
    ja:["厩舎に明かりが灯ったとき、まだ夜だった。",
        "バケツの音がして、それから石畳を打つ蹄の音。ダウンズの丘の上にたどり着いたときには、調教の一団はもう行ってしまっていた — 見えたのは、彼らが残していった白い息だけだった。"]},
  volets:[
   {t:{fr:"La vallée", en:"The valley", es:"El valle",
       it:"La valle", de:"Das Tal", ja:"谷"},
    c:{
      fr:"Lambourn est le deuxième centre d'entraînement britannique après Newmarket. Un village entier qui ne vit que du cheval : entraîneurs, lads, maréchaux, vétérinaires, transporteurs. On l'appelle la vallée du cheval de course.",
      en:"Lambourn is Britain's second training centre after Newmarket. A whole village that lives on nothing but the horse: trainers, lads, farriers, vets, transporters. They call it the valley of the racehorse.",
      es:"Lambourn es el segundo centro de entrenamiento británico después de Newmarket. Un pueblo entero que solo vive del caballo: entrenadores, mozos, herradores, veterinarios, transportistas. Lo llaman el valle del caballo de carreras.",
      it:"Lambourn è il secondo centro di allenamento britannico dopo Newmarket. Un intero villaggio che vive solo di cavalli: allenatori, lads, maniscalchi, veterinari, trasportatori. Lo chiamano la valle del cavallo da corsa.",
      de:"Lambourn ist Großbritanniens zweites Trainingszentrum nach Newmarket. Ein ganzes Dorf, das von nichts als dem Pferd lebt: Trainer, Lads, Hufschmiede, Tierärzte, Transporteure. Man nennt es das Tal des Rennpferds.",
      ja:"ラムボーンはニューマーケットに次ぐイギリス第二の調教拠点。村全体が馬だけで生きています。調教師、厩務員、装蹄師、獣医、馬運車の運転手。人はここを「競走馬の谷」と呼びます。"}},
   {t:{fr:"Le terrain", en:"The ground", es:"El terreno",
       it:"Il terreno", de:"Der Boden", ja:"大地"},
    c:{
      fr:"Les Downs, ces collines de craie couvertes d'herbe rase, drainent vite et amortissent bien. C'est le sol qui a fait la réputation de la vallée, pas le hasard : la craie boit l'eau et l'herbe reste portante même après la pluie.",
      en:"The Downs, those chalk hills covered in short grass, drain fast and cushion well. It is the ground that made the valley's name, not chance: the chalk drinks the water and the turf stays sound even after rain.",
      es:"Los Downs, esas colinas de creta cubiertas de hierba rasa, drenan rápido y amortiguan bien. Es el suelo lo que hizo la reputación del valle, no el azar: la creta bebe el agua y la hierba sigue firme incluso después de la lluvia.",
      it:"I Downs, quelle colline di gesso coperte d'erba rasa, drenano in fretta e ammortizzano bene. È il terreno ad aver fatto la reputazione della valle, non il caso: il gesso beve l'acqua e l'erba resta portante anche dopo la pioggia.",
      de:"Die Downs, diese mit kurzem Gras bewachsenen Kreidehügel, entwässern schnell und federn gut. Der Boden hat den Ruf des Tals gemacht, nicht der Zufall: Die Kreide trinkt das Wasser, und das Gras bleibt tragfähig, selbst nach dem Regen.",
      ja:"ダウンズ — 短い草に覆われた白亜の丘は、水はけがよく、脚への衝撃をやわらげます。この谷の名声をつくったのは偶然ではなく大地です。白亜は水を飲み込み、雨のあとでも芝はしっかりと馬を支えます。"}},
   {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí",
       it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
    c:{
      fr:"Monte sur les Downs avant sept heures. On entend les lots arriver bien avant de les voir — d'abord un grondement sourd, puis la respiration des chevaux, et ils passent.",
      en:"Climb the Downs before seven. You hear the strings coming long before you see them — first a low rumble, then the horses' breathing, and they pass.",
      es:"Sube a los Downs antes de las siete. Se oye llegar a los lotes mucho antes de verlos — primero un retumbo sordo, luego la respiración de los caballos, y pasan.",
      it:"Sali sui Downs prima delle sette. Si sentono arrivare i lotti molto prima di vederli — prima un rombo sordo, poi il respiro dei cavalli, e passano.",
      de:"Steig vor sieben auf die Downs. Man hört die Lots kommen, lange bevor man sie sieht — erst ein dumpfes Grollen, dann der Atem der Pferde, und sie ziehen vorbei.",
      ja:"七時前にダウンズへ登ってみて。一団は姿が見えるずっと前から聞こえてきます — まず低い地響き、それから馬たちの息づかい。そして、目の前を駆け抜けていきます。"}}
  ]},

/* ============ 3 · CONNEMARA · Le cheval ============ */
connemara:{
  lieu:"County Galway · Ireland", carte:true,
  image:"les poneys sur la lande, face à l'Atlantique",
  lettre:{
    fr:["J'ai cherché les poneys longtemps avant de les voir.",
        "Ils étaient dehors, gris comme le ciel, immobiles derrière un muret de pierres sèches. Le vent ne s'est pas arrêté une seule fois de la journée, et eux n'ont pas bougé."],
    en:["I looked for the ponies a long time before I saw them.",
        "They were out, grey as the sky, motionless behind a dry-stone wall. The wind did not stop once all day, and they did not move."],
    es:["Busqué a los ponis mucho tiempo antes de verlos.",
        "Estaban fuera, grises como el cielo, inmóviles tras un muro de piedra seca. El viento no paró ni una sola vez en todo el día, y ellos no se movieron."],
    it:["Ho cercato i pony a lungo prima di vederli.",
        "Erano fuori, grigi come il cielo, immobili dietro un muretto a secco. Il vento non si è fermato una sola volta in tutta la giornata, e loro non si sono mossi."],
    de:["Ich suchte die Ponys lange, bevor ich sie sah.",
        "Sie standen draußen, grau wie der Himmel, reglos hinter einer Trockensteinmauer. Der Wind hörte den ganzen Tag nicht ein einziges Mal auf, und sie rührten sich nicht."],
    ja:["ポニーたちを見つけるまで、ずいぶん探した。",
        "彼らは外にいた。空と同じ灰色で、石積みの塀の向こうに、身じろぎもせずに。風は一日じゅう一度もやまなかったのに、彼らは動かなかった。"]},
  volets:[
   {t:{fr:"Une terre entre ciel et océan", en:"A land between sky and ocean", es:"Una tierra entre cielo y océano",
       it:"Una terra tra cielo e oceano", de:"Ein Land zwischen Himmel und Ozean", ja:"空と海のあいだの土地"},
    c:{
      fr:"Le Connemara est une région où les montagnes, les tourbières, les lacs et l'Atlantique se rencontrent. La lumière y change toutes les heures, et le vent ne s'arrête jamais tout à fait.",
      en:"Connemara is a region where mountains, peat bogs, lakes and the Atlantic meet. The light changes every hour, and the wind never quite stops.",
      es:"Connemara es una región donde las montañas, las turberas, los lagos y el Atlántico se encuentran. La luz cambia cada hora, y el viento nunca se detiene del todo.",
      it:"Il Connemara è una regione dove le montagne, le torbiere, i laghi e l'Atlantico si incontrano. La luce vi cambia ogni ora, e il vento non si ferma mai del tutto.",
      de:"Connemara ist eine Region, in der Berge, Torfmoore, Seen und der Atlantik zusammentreffen. Das Licht wechselt dort jede Stunde, und der Wind hört nie ganz auf.",
      ja:"コネマラは、山と泥炭地と湖と大西洋が出会う土地。光は一時間ごとに変わり、風は決して完全にはやみません。"}},
   {t:{fr:"Le poney des grands espaces", en:"The pony of the wide open spaces", es:"El poni de los grandes espacios",
       it:"Il pony dei grandi spazi", de:"Das Pony der weiten Räume", ja:"大地のポニー"},
    c:{
      fr:"Élevé pendant des générations dans un environnement exigeant, le Connemara est réputé pour son courage, son intelligence et sa sûreté de pied. Compact et bas sur pattes, il saute bien au-dessus de sa taille et porte aussi bien un enfant qui débute qu'un cavalier en compétition.",
      en:"Bred for generations in a demanding environment, the Connemara is known for its courage, intelligence and sure-footedness. Compact and close to the ground, it jumps well above its height and carries a beginner child as happily as a competition rider.",
      es:"Criado durante generaciones en un entorno exigente, el Connemara es conocido por su valor, su inteligencia y su seguridad de pie. Compacto y bajo de patas, salta muy por encima de su talla y lleva tan bien a un niño que empieza como a un jinete de competición.",
      it:"Allevato per generazioni in un ambiente esigente, il Connemara è noto per il coraggio, l'intelligenza e la sicurezza di piede. Compatto e basso sugli arti, salta ben oltre la sua taglia e porta bene tanto un bambino che inizia quanto un cavaliere in gara.",
      de:"Über Generationen in einer fordernden Umgebung gezüchtet, ist das Connemara für Mut, Intelligenz und Trittsicherheit bekannt. Kompakt und tief gestellt, springt es weit über seine Größe hinaus und trägt ein Anfängerkind ebenso gern wie einen Turnierreiter.",
      ja:"厳しい環境で何世代も育まれてきたコネマラは、勇気と賢さ、そして足取りの確かさで知られます。小柄でがっしりとして、体高をはるかに超える障害を跳び、初心者の子どもも競技の騎手も、同じように背に乗せてくれます。"}},
   {t:{fr:"Le savais-tu ?", en:"Did you know?", es:"¿Lo sabías?",
       it:"Lo sapevi?", de:"Wusstest du es?", ja:"知ってた？"},
    c:{
      fr:"Une vieille légende veut que certains ancêtres du Connemara soient issus de chevaux espagnols échoués sur ces côtes après le naufrage de l'Armada, en 1588. Les études sur la race ne l'appuient pas, mais l'histoire se raconte encore là-bas — et elle fait partie du paysage autant que les murets de pierre.",
      en:"An old legend has it that some of the Connemara's ancestors came from Spanish horses washed ashore after the wreck of the Armada in 1588. Studies of the breed do not support it, but the story is still told over there — and it belongs to the landscape as much as the stone walls do.",
      es:"Una vieja leyenda cuenta que algunos antepasados del Connemara procedían de caballos españoles llegados a estas costas tras el naufragio de la Armada, en 1588. Los estudios sobre la raza no lo respaldan, pero la historia aún se cuenta allí — y forma parte del paisaje tanto como los muros de piedra.",
      it:"Una vecchia leggenda vuole che alcuni antenati del Connemara discendano da cavalli spagnoli naufragati su queste coste dopo il disastro dell'Armada, nel 1588. Gli studi sulla razza non la sostengono, ma la storia si racconta ancora laggiù — e fa parte del paesaggio quanto i muretti di pietra.",
      de:"Eine alte Legende will, dass einige Vorfahren des Connemara von spanischen Pferden stammen, die nach dem Untergang der Armada 1588 an diese Küsten gespült wurden. Die Studien zur Rasse stützen das nicht, aber die Geschichte wird dort noch erzählt — und sie gehört zur Landschaft wie die Steinmauern.",
      ja:"古い言い伝えでは、コネマラの祖先の一部は、一五八八年の無敵艦隊の遭難でこの海岸に流れ着いたスペインの馬だと言われます。品種の研究はそれを裏づけていませんが、この物語は今も土地で語り継がれています — 石積みの塀と同じく、風景の一部として。"}}
  ]},

/* ============ 4 · WALSALL · Le matériel ============ */
walsall:{
  lieu:"West Midlands · United Kingdom", carte:true,
  image:"l'atelier de sellerie sous la lampe",
  lettre:{
    fr:["Ce soir, j'ai poussé la porte d'un atelier.",
        "Sous la lampe, deux aiguilles avançaient en même temps le long d'une couture. Personne ne m'a parlé. Je suis resté vingt minutes à regarder, et je n'ai pas vu le temps passer."],
    en:["This evening, I pushed open the door of a workshop.",
        "Under the lamp, two needles moved forward together along a seam. Nobody spoke to me. I stood watching for twenty minutes, and never noticed the time pass."],
    es:["Esta tarde empujé la puerta de un taller.",
        "Bajo la lámpara, dos agujas avanzaban a la vez a lo largo de una costura. Nadie me habló. Me quedé veinte minutos mirando, y no vi pasar el tiempo."],
    it:["Stasera ho spinto la porta di un laboratorio.",
        "Sotto la lampada, due aghi avanzavano insieme lungo una cucitura. Nessuno mi ha parlato. Sono rimasto venti minuti a guardare, e non ho visto passare il tempo."],
    de:["Heute Abend habe ich die Tür einer Werkstatt aufgestoßen.",
        "Unter der Lampe wanderten zwei Nadeln gleichzeitig eine Naht entlang. Niemand sprach mich an. Ich sah zwanzig Minuten lang zu und merkte nicht, wie die Zeit verging."],
    ja:["今夜、ひとつの工房の扉を押し開けた。",
        "ランプの下で、二本の針が同時にひとつの縫い目を進んでいた。誰も私に話しかけなかった。二十分間ただ見つめていて、時間が経つのを忘れていた。"]},
  volets:[
   {t:{fr:"La ville du cuir", en:"The town of leather", es:"La ciudad del cuero",
       it:"La città del cuoio", de:"Die Stadt des Leders", ja:"革の町"},
    c:{
      fr:"Walsall est la capitale britannique de la sellerie. La ville a d'abord travaillé le métal du harnais — mors, étriers, éperons — avant que le cuir n'y prenne le dessus. Un musée du cuir raconte cette histoire, et des ateliers y travaillent encore à la main.",
      en:"Walsall is Britain's saddlery capital. The town first worked the metal of the harness — bits, stirrups, spurs — before leather took over. A leather museum tells that story, and workshops there still work by hand.",
      es:"Walsall es la capital británica de la guarnicionería. La ciudad trabajó primero el metal del arnés — bocados, estribos, espuelas — antes de que el cuero tomara el relevo. Un museo del cuero cuenta esa historia, y aún hay talleres que trabajan a mano.",
      it:"Walsall è la capitale britannica della selleria. La città ha lavorato prima il metallo dei finimenti — imboccature, staffe, speroni — prima che il cuoio prendesse il sopravvento. Un museo del cuoio racconta questa storia, e vi sono laboratori che lavorano ancora a mano.",
      de:"Walsall ist Großbritanniens Hauptstadt der Sattlerei. Die Stadt bearbeitete zuerst das Metall des Geschirrs — Gebisse, Steigbügel, Sporen —, bevor das Leder die Oberhand gewann. Ein Ledermuseum erzählt diese Geschichte, und Werkstätten arbeiten dort noch von Hand.",
      ja:"ウォルソールはイギリス馬具づくりの都。町は最初、ハミ、鐙、拍車といった馬具の金属を扱い、やがて革がその座を継ぎました。革の博物館がその歴史を伝え、今も手仕事の工房が息づいています。"}}, // ?? chronologie métal puis cuir : formulation prudente, à confirmer
   {t:{fr:"Le point sellier", en:"The saddle stitch", es:"La costura de guarnicionero",
       it:"Il punto sellaio", de:"Die Sattlernaht", ja:"サドルステッチ"},
    c:{
      fr:"Deux aiguilles, un seul fil, chacune passant à son tour dans le même trou. C'est ce qui rend la couture indéfaillible : si un fil casse, l'autre tient. Une machine ne sait pas le faire — c'est pour ça qu'une selle se coud encore à la main.",
      en:"Two needles, one thread, each passing in turn through the same hole. That is what makes the seam unfailing: if one thread breaks, the other holds. A machine cannot do it — which is why a saddle is still sewn by hand.",
      es:"Dos agujas, un solo hilo, cada una pasando por turno por el mismo agujero. Eso es lo que hace la costura infalible: si un hilo se rompe, el otro aguanta. Una máquina no sabe hacerlo — por eso una silla aún se cose a mano.",
      it:"Due aghi, un solo filo, ognuno che passa a turno nello stesso foro. È questo che rende la cucitura infallibile: se un filo si rompe, l'altro tiene. Una macchina non sa farlo — ed è per questo che una sella si cuce ancora a mano.",
      de:"Zwei Nadeln, ein einziger Faden, jede sticht abwechselnd durch dasselbe Loch. Das macht die Naht unfehlbar: Reißt ein Faden, hält der andere. Eine Maschine kann das nicht — deshalb wird ein Sattel noch von Hand genäht.",
      ja:"二本の針、一本の糸。同じ穴を交互にくぐらせます。これが縫い目を裏切らないものにする秘密 — 一本の糸が切れても、もう一本が持ちこたえる。機械にはできません。だから鞍は、今も手で縫われるのです。"}},
   {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí",
       it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
    c:{
      fr:"Demande à voir une selle en cours de montage. Entre la coupe du cuir et la dernière couture, il y a des dizaines d'heures de travail que personne ne voit — et que personne ne verra jamais, puisque tout est à l'intérieur.",
      en:"Ask to see a saddle being built. Between the cutting of the leather and the last stitch there are dozens of hours of work nobody sees — and nobody ever will, since it is all on the inside.",
      es:"Pide ver una silla en pleno montaje. Entre el corte del cuero y la última costura hay decenas de horas de trabajo que nadie ve — y que nadie verá jamás, porque todo queda por dentro.",
      it:"Chiedi di vedere una sella in corso di montaggio. Tra il taglio del cuoio e l'ultima cucitura ci sono decine di ore di lavoro che nessuno vede — e che nessuno vedrà mai, perché è tutto all'interno.",
      de:"Bitte darum, einen Sattel im Bau zu sehen. Zwischen dem Zuschnitt des Leders und der letzten Naht liegen Dutzende Arbeitsstunden, die niemand sieht — und niemand je sehen wird, denn alles liegt im Inneren.",
      ja:"組み立て途中の鞍を見せてもらって。革の裁断から最後のひと針まで、誰の目にも触れない何十時間もの仕事があります — そしてこの先も誰も見ることはありません。すべては鞍の内側にあるのですから。"}}
  ]},

/* ============ 5 · ABERYSTWYTH · En selle ============ */
aberystwyth:{
  lieu:"Ceredigion · Wales", carte:true,
  image:"le galop dans la mer",
  lettre:{
    fr:["Ce matin, j'ai galopé dans la mer.",
        "La plage était vide. Le cob est entré dans l'eau sans hésiter une seconde, et on a fini au galop dans les vagues. Le sel a séché sur mes bottes, et je souriais tout seul."],
    en:["This morning, I galloped in the sea.",
        "The beach was empty. The cob walked into the water without a second's hesitation, and we finished at a gallop through the waves. The salt dried on my boots, and I was smiling to myself."],
    es:["Esta mañana galopé en el mar.",
        "La playa estaba vacía. El cob entró en el agua sin dudar un segundo, y acabamos al galope entre las olas. La sal se secó en mis botas, y yo sonreía solo."],
    it:["Stamattina ho galoppato nel mare.",
        "La spiaggia era vuota. Il cob è entrato in acqua senza esitare un secondo, e abbiamo finito al galoppo tra le onde. Il sale si è asciugato sui miei stivali, e sorridevo da solo."],
    de:["Heute Morgen bin ich im Meer galoppiert.",
        "Der Strand war leer. Der Cob ging ohne eine Sekunde Zögern ins Wasser, und wir endeten im Galopp durch die Wellen. Das Salz trocknete auf meinen Stiefeln, und ich lächelte ganz für mich."],
    ja:["今朝、海の中を駆けた。",
        "浜辺には誰もいなかった。コブは一瞬もためらわず水に入り、最後は波の中を駆け抜けた。ブーツの上で塩が乾いていき、私はひとりで笑っていた。"]},
  volets:[
   {t:{fr:"Le Welsh pony and cob", en:"The Welsh pony and cob", es:"El poni y cob galés",
       it:"Il Welsh pony and cob", de:"Das Welsh Pony and Cob", ja:"ウェルシュ・ポニー＆コブ"},
    c:{
      fr:"Un seul stud-book, quatre sections. La A, le poney de montagne, le plus petit. La B, plus fine, montée par les enfants en concours. La C, trapue, très utilisée en attelage. La D, le Welsh cob, assez grand pour porter un adulte. Le Ceredigion est son pays.",
      en:"One stud book, four sections. Section A, the mountain pony, the smallest. Section B, finer, ridden by children in competition. Section C, stocky, much used in driving. Section D, the Welsh cob, big enough to carry an adult. Ceredigion is its homeland.",
      es:"Un solo libro genealógico, cuatro secciones. La A, el poni de montaña, el más pequeño. La B, más fina, montada por los niños en concurso. La C, robusta, muy usada en enganche. La D, el cob galés, lo bastante grande para llevar a un adulto. El Ceredigion es su tierra.",
      it:"Un solo libro genealogico, quattro sezioni. La A, il pony di montagna, il più piccolo. La B, più fine, montata dai bambini in gara. La C, tarchiata, molto usata negli attacchi. La D, il Welsh cob, abbastanza grande da portare un adulto. Il Ceredigion è la sua terra.",
      de:"Ein einziges Zuchtbuch, vier Sektionen. Die A, das Bergpony, das kleinste. Die B, feiner, von Kindern im Turnier geritten. Die C, gedrungen, viel im Fahrsport genutzt. Die D, das Welsh Cob, groß genug, um einen Erwachsenen zu tragen. Ceredigion ist seine Heimat.",
      ja:"血統書はひとつ、セクションは四つ。Aは山のポニーで最も小さく、Bはより繊細で子どもたちが競技で乗ります。Cはがっしりとして馬車競技で活躍し、Dのウェルシュ・コブは大人を乗せられる大きさ。ケレディジョンこそ、その故郷です。"}},
   {t:{fr:"Le rendez-vous", en:"The meeting place", es:"La cita",
       it:"L'appuntamento", de:"Der Treffpunkt", ja:"開催地"},
    c:{
      fr:"L'Aberystwyth and Ceredigion County Show, affilié à la Welsh Pony and Cob Society, décerne sa médaille au meilleur sujet de chaque section. C'est là qu'on comprend ce que veulent vraiment dire ces quatre lettres.",
      en:"The Aberystwyth and Ceredigion County Show, affiliated to the Welsh Pony and Cob Society, awards its medal to the best of each section. That is where you understand what those four letters really mean.",
      es:"El Aberystwyth and Ceredigion County Show, afiliado a la Welsh Pony and Cob Society, entrega su medalla al mejor ejemplar de cada sección. Allí se entiende lo que de verdad significan esas cuatro letras.",
      it:"L'Aberystwyth and Ceredigion County Show, affiliato alla Welsh Pony and Cob Society, assegna la sua medaglia al miglior soggetto di ogni sezione. È lì che si capisce cosa vogliono dire davvero quelle quattro lettere.",
      de:"Die Aberystwyth and Ceredigion County Show, der Welsh Pony and Cob Society angeschlossen, verleiht ihre Medaille an das beste Tier jeder Sektion. Dort versteht man, was diese vier Buchstaben wirklich bedeuten.",
      ja:"ウェルシュ・ポニー＆コブ協会公認のアベリストウィス＆ケレディジョン・カウンティショーでは、各セクションの最優秀馬にメダルが贈られます。あの四つの文字が本当は何を意味するのか、そこで初めて分かります。"}},
   {t:{fr:"Le savais-tu ?", en:"Did you know?", es:"¿Lo sabías?",
       it:"Lo sapevi?", de:"Wusstest du es?", ja:"知ってた？"},
    c:{
      fr:"La Trans Wales Trail, une traversée du pays de Galles de plusieurs jours à cheval, se termine par un galop dans la mer d'Irlande, près d'ici. Et un sentier remonte vers les monts Cambriens, là où les fermiers rassemblaient autrefois les poneys des pâtures de montagne pour emmener les visiteurs en randonnée.",
      en:"The Trans Wales Trail, a ride of several days across Wales, ends with a gallop into the Irish Sea, near here. And a trail climbs towards the Cambrian Mountains, where farmers once gathered the ponies off the mountain pastures to take visitors trekking.",
      es:"La Trans Wales Trail, una travesía de varios días a caballo por Gales, termina con un galope en el mar de Irlanda, cerca de aquí. Y un sendero sube hacia los montes Cámbricos, donde los granjeros reunían antaño los ponis de los pastos de montaña para llevar a los visitantes de excursión.",
      it:"La Trans Wales Trail, una traversata del Galles di più giorni a cavallo, si conclude con un galoppo nel mare d'Irlanda, vicino a qui. E un sentiero risale verso i monti Cambrici, dove un tempo i fattori radunavano i pony dei pascoli di montagna per portare i visitatori in escursione.",
      de:"Der Trans Wales Trail, eine mehrtägige Durchquerung von Wales zu Pferd, endet mit einem Galopp in die Irische See, ganz in der Nähe. Und ein Pfad steigt zu den Kambrischen Bergen hinauf, wo die Bauern einst die Ponys von den Bergweiden zusammentrieben, um Besucher auf Wanderritte mitzunehmen.",
      ja:"数日かけてウェールズを馬で横断するトランス・ウェールズ・トレイルは、この近くのアイリッシュ海への駆け込みで幕を閉じます。そしてカンブリア山地へ続く小道では、かつて農夫たちが山の放牧地からポニーを集め、訪れる人々をトレッキングに連れ出していました。"}}
  ]},
/* ============ 6 · WINDSOR · Le dressage ============ */
windsor:{
  lieu:"Berkshire · United Kingdom", carte:true,
  image:"le cheval seul devant le château",
  lettre:{
    fr:["Personne ne parlait.",
        "Le sable venait d'être ratissé, un cheval seul trottait devant les tours du château, et j'ai compris que le silence faisait partie du travail."],
    en:["Nobody was speaking.",
        "The sand had just been raked, a lone horse was trotting before the towers of the castle, and I understood that the silence was part of the work."],
    es:["Nadie hablaba.",
        "La arena acababa de ser rastrillada, un caballo solo trotaba ante las torres del castillo, y comprendí que el silencio formaba parte del trabajo."],
    it:["Nessuno parlava.",
        "La sabbia era appena stata rastrellata, un cavallo solo trottava davanti alle torri del castello, e ho capito che il silenzio faceva parte del lavoro."],
    de:["Niemand sprach.",
        "Der Sand war gerade geharkt worden, ein einzelnes Pferd trabte vor den Türmen des Schlosses, und ich begriff, dass die Stille Teil der Arbeit war."],
    ja:["誰も話さなかった。",
        "砂は均されたばかりで、一頭の馬が城の塔の前をひとり速歩で進んでいた。そして私は理解した — 沈黙もまた、この仕事の一部なのだと。"]},
  volets:[
   {t:{fr:"Le château", en:"The castle", es:"El castillo",
       it:"Il castello", de:"Das Schloss", ja:"城"},
    c:{
      fr:"Windsor est l'un des plus anciens châteaux habités d'Europe, et la tradition équestre y va avec : écuries, attelages, et un grand parc où les chevaux travaillent depuis des siècles.",
      en:"Windsor is one of the oldest inhabited castles in Europe, and the equestrian tradition goes with it: stables, carriages, and a great park where horses have worked for centuries.",
      es:"Windsor es uno de los castillos habitados más antiguos de Europa, y la tradición ecuestre va con él: cuadras, enganches, y un gran parque donde los caballos trabajan desde hace siglos.",
      it:"Windsor è uno dei più antichi castelli abitati d'Europa, e la tradizione equestre va di pari passo: scuderie, attacchi, e un grande parco dove i cavalli lavorano da secoli.",
      de:"Windsor ist eines der ältesten bewohnten Schlösser Europas, und die Reittradition gehört dazu: Ställe, Gespanne und ein großer Park, in dem seit Jahrhunderten Pferde arbeiten.",
      ja:"ウィンザーはヨーロッパで最も古くから人が住み続けている城のひとつ。馬の伝統もそれとともにあります。厩舎、馬車、そして何世紀ものあいだ馬たちが働いてきた広大な公園。"}},
   {t:{fr:"Le rendez-vous", en:"The meeting place", es:"La cita",
       it:"L'appuntamento", de:"Der Treffpunkt", ja:"開催地"},
    c:{
      fr:"Le Royal Windsor Horse Show se tient chaque printemps dans le parc du château. C'est l'un des plus grands concours en plein air du pays, avec du saut, du dressage et de l'attelage sur plusieurs jours.",
      en:"The Royal Windsor Horse Show is held every spring in the castle park. It is one of the country's biggest outdoor shows, with jumping, dressage and driving over several days.",
      es:"El Royal Windsor Horse Show se celebra cada primavera en el parque del castillo. Es uno de los mayores concursos al aire libre del país, con salto, doma y enganche durante varios días.",
      it:"Il Royal Windsor Horse Show si tiene ogni primavera nel parco del castello. È uno dei più grandi concorsi all'aperto del paese, con salto, dressage e attacchi su più giorni.",
      de:"Die Royal Windsor Horse Show findet jedes Frühjahr im Schlosspark statt. Sie ist eines der größten Freiluftturniere des Landes, mit Springen, Dressur und Fahren über mehrere Tage.",
      ja:"ロイヤル・ウィンザー・ホースショーは毎年春、城の公園で開かれます。国内最大級の野外競技会で、障害、馬場馬術、馬車競技が数日間にわたって行われます。"}},
   {t:{fr:"Le savais-tu ?", en:"Did you know?", es:"¿Lo sabías?",
       it:"Lo sapevi?", de:"Wusstest du es?", ja:"知ってた？"},
    c:{
      fr:"A, K, E, H, C, M, B, F : les huit lettres qui balisent une carrière de dressage. Personne ne sait vraiment d'où vient cet ordre. Plusieurs explications circulent — dont une histoire d'écuries impériales allemandes — mais aucune n'est établie, et c'est l'un des rares mystères du monde équestre que personne n'a résolu.",
      en:"A, K, E, H, C, M, B, F: the eight letters that mark out a dressage arena. Nobody really knows where that order comes from. Several explanations circulate — including a story about German imperial stables — but none is established, and it is one of the rare mysteries of the horse world that nobody has solved.",
      es:"A, K, E, H, C, M, B, F: las ocho letras que balizan una pista de doma. Nadie sabe realmente de dónde viene ese orden. Circulan varias explicaciones — incluida una historia de caballerizas imperiales alemanas — pero ninguna está establecida, y es uno de los raros misterios del mundo ecuestre que nadie ha resuelto.",
      it:"A, K, E, H, C, M, B, F: le otto lettere che delimitano un rettangolo di dressage. Nessuno sa davvero da dove venga quest'ordine. Circolano diverse spiegazioni — compresa una storia di scuderie imperiali tedesche — ma nessuna è accertata, ed è uno dei rari misteri del mondo equestre che nessuno ha risolto.",
      de:"A, K, E, H, C, M, B, F: die acht Buchstaben, die ein Dressurviereck markieren. Niemand weiß wirklich, woher diese Reihenfolge kommt. Mehrere Erklärungen sind im Umlauf — darunter eine Geschichte über deutsche kaiserliche Ställe —, aber keine ist belegt, und es ist eines der seltenen Rätsel der Pferdewelt, das niemand gelöst hat.",
      ja:"A、K、E、H、C、M、B、F — 馬場を区切る八つの文字。この並び順の由来を、本当のところ誰も知りません。ドイツ帝国の厩舎にまつわる話などいくつかの説が語られますが、どれも確かめられておらず、馬の世界に残された、誰にも解けていない数少ない謎のひとつです。"}}
  ]},

/* ============ 7 · HICKSTEAD · L'obstacle ============ */
hickstead:{
  lieu:"West Sussex · United Kingdom", carte:true,
  image:"le Derby Bank",
  lettre:{
    fr:["Je suis monté en haut du talus à pied.",
        "D'en bas, il paraissait raisonnable. D'en haut, beaucoup moins. J'ai regardé un cheval le descendre au galop, et tout le monde a retenu son souffle en même temps que moi."],
    en:["I climbed to the top of the bank on foot.",
        "From below, it looked reasonable. From the top, much less so. I watched a horse come down it at a canter, and everyone held their breath at the same time as me."],
    es:["Subí a lo alto del talud a pie.",
        "Desde abajo parecía razonable. Desde arriba, mucho menos. Miré a un caballo bajarlo al galope, y todo el mundo contuvo la respiración al mismo tiempo que yo."],
    it:["Sono salito in cima al terrapieno a piedi.",
        "Da sotto sembrava ragionevole. Da sopra, molto meno. Ho guardato un cavallo scenderlo al galoppo, e tutti hanno trattenuto il fiato nello stesso momento in cui l'ho trattenuto io."],
    de:["Ich bin zu Fuß auf die Kuppe des Walls gestiegen.",
        "Von unten sah er vernünftig aus. Von oben deutlich weniger. Ich sah einem Pferd zu, wie es ihn im Galopp hinunterkam, und alle hielten im selben Moment den Atem an wie ich."],
    ja:["歩いて土手のてっぺんまで登ってみた。",
        "下から見れば、たいしたことはなさそうだった。上から見ると、まるで違った。一頭の馬が駆歩でそこを下るのを見つめ、私と同じ瞬間に、みんなが息をのんだ。"]},
  volets:[
   {t:{fr:"Le Derby Bank", en:"The Derby Bank", es:"El Derby Bank",
       it:"Il Derby Bank", de:"Die Derby Bank", ja:"ダービー・バンク"},
    c:{
      fr:"Une butte de gazon de 3,20 m de pente, avec une barre posée sur le plat du sommet, qu'il faut descendre au galop. C'est la plus haute butte de compétition au monde, et elle décide du Derby depuis 1961.",
      en:"A grass bank with a 3.20 m slope, a rail set on the flat at the top, that has to be ridden down at a canter. It is the highest competition bank in the world, and it has decided the Derby since 1961.",
      es:"Un talud de césped de 3,20 m de pendiente, con una barra colocada en el llano de la cima, que hay que bajar al galope. Es el talud de competición más alto del mundo, y decide el Derby desde 1961.",
      it:"Un terrapieno erboso con 3,20 m di pendenza, una barriera posata sul piano della sommità, da scendere al galoppo. È il terrapieno da competizione più alto del mondo, e decide il Derby dal 1961.",
      de:"Ein Rasenwall mit 3,20 m Gefälle und einer Stange auf der ebenen Kuppe, den man im Galopp hinunterreiten muss. Es ist der höchste Turnierwall der Welt, und er entscheidet das Derby seit 1961.",
      ja:"傾斜3.2メートルの芝の土手。頂上の平らな部分にバーが置かれ、そこを駆歩で下らなければなりません。世界で最も高い競技用バンクで、一九六一年からダービーの勝敗を決め続けています。"}},
   {t:{fr:"Le savais-tu ?", en:"Did you know?", es:"¿Lo sabías?",
       it:"Lo sapevi?", de:"Wusstest du es?", ja:"知ってた？"},
    c:{
      fr:"Le fondateur de Hickstead a pris l'avion pour Hambourg un 31 décembre, en pleine tempête de neige, pour mesurer la butte du Derby allemand devant des officiels perplexes. Celle qu'il a bâtie au retour s'est trouvée un peu plus haute que l'originale — la neige a peut-être faussé ses mesures, ou pas.",
      en:"The founder of Hickstead flew to Hamburg one 31st of December, in a snowstorm, to measure the German Derby bank in front of puzzled officials. The one he built on his return turned out a little higher than the original — the snow may have thrown off his measurements, or not.",
      es:"El fundador de Hickstead voló a Hamburgo un 31 de diciembre, en plena tormenta de nieve, para medir el talud del Derby alemán ante unos oficiales perplejos. El que construyó a su regreso resultó un poco más alto que el original — puede que la nieve falseara sus medidas, o puede que no.",
      it:"Il fondatore di Hickstead prese l'aereo per Amburgo un 31 dicembre, in piena tempesta di neve, per misurare il terrapieno del Derby tedesco davanti a ufficiali perplessi. Quello che costruì al ritorno risultò un po' più alto dell'originale — forse la neve falsò le sue misure, o forse no.",
      de:"Der Gründer von Hickstead flog an einem 31. Dezember mitten im Schneesturm nach Hamburg, um vor ratlosen Offiziellen den Wall des deutschen Derbys zu vermessen. Der, den er nach seiner Rückkehr baute, geriet etwas höher als das Original — vielleicht hat der Schnee seine Messungen verfälscht, vielleicht auch nicht.",
      ja:"ヒックステッドの創設者は、ある十二月三十一日、猛吹雪の中ハンブルクへ飛び、戸惑う関係者たちの前でドイツのダービー・バンクを測りました。帰国後に彼が築いたバンクは、本家より少し高くなっていました — 雪が測定を狂わせたのかもしれないし、そうでないのかもしれません。"}},
   {t:{fr:"L'herbe", en:"The grass", es:"La hierba",
       it:"L'erba", de:"Das Gras", ja:"芝"},
    c:{
      fr:"Hickstead saute sur gazon, pas sur sable. Le terrain porte différemment, les distances se lisent autrement, et un cheval habitué au sable doit réapprendre à s'y placer. Le parcours du Derby n'a presque pas changé depuis la première édition.",
      en:"Hickstead jumps on turf, not on sand. The ground rides differently, the distances read differently, and a horse used to sand has to relearn how to place itself. The Derby course has barely changed since the first edition.",
      es:"En Hickstead se salta sobre césped, no sobre arena. El terreno responde de otra manera, las distancias se leen de otro modo, y un caballo acostumbrado a la arena tiene que reaprender a colocarse. El recorrido del Derby apenas ha cambiado desde la primera edición.",
      it:"A Hickstead si salta su erba, non su sabbia. Il terreno porta in modo diverso, le distanze si leggono diversamente, e un cavallo abituato alla sabbia deve reimparare a piazzarsi. Il percorso del Derby non è quasi cambiato dalla prima edizione.",
      de:"In Hickstead wird auf Rasen gesprungen, nicht auf Sand. Der Boden trägt anders, die Distanzen lesen sich anders, und ein sandgewohntes Pferd muss neu lernen, sich zu platzieren. Der Derby-Kurs hat sich seit der ersten Austragung kaum verändert.",
      ja:"ヒックステッドでは砂ではなく芝の上で跳びます。地面の感触は違い、歩数の読み方も変わり、砂に慣れた馬は踏み切り位置を学び直さなければなりません。ダービーのコースは、第一回からほとんど姿を変えていません。"}}
  ]},

/* ============ 8 · BADMINTON · Le concours ============ */
badminton:{
  lieu:"Gloucestershire · United Kingdom", carte:true,
  image:"le grand obstacle de cross dans le parc",
  lettre:{
    fr:["Il avait plu toute la nuit.",
        "J'ai marché le cross à pied, comme les cavaliers la veille. Les obstacles de bois sont plus hauts qu'à la télévision, la terre collait aux bottes, et la grande maison nous regardait depuis le fond de la brume."],
    en:["It had rained all night.",
        "I walked the cross-country on foot, like the riders the day before. The wooden fences are taller than on television, the earth stuck to my boots, and the great house watched us from deep in the mist."],
    es:["Había llovido toda la noche.",
        "Caminé el cross a pie, como los jinetes la víspera. Los obstáculos de madera son más altos que en la televisión, la tierra se pegaba a las botas, y la gran casa nos miraba desde el fondo de la bruma."],
    it:["Aveva piovuto tutta la notte.",
        "Ho camminato il cross a piedi, come i cavalieri il giorno prima. Gli ostacoli di legno sono più alti che in televisione, la terra si incollava agli stivali, e la grande casa ci guardava dal fondo della foschia."],
    de:["Es hatte die ganze Nacht geregnet.",
        "Ich ging die Geländestrecke zu Fuß ab, wie die Reiter am Vortag. Die Holzhindernisse sind höher als im Fernsehen, die Erde klebte an den Stiefeln, und das große Haus sah uns aus der Tiefe des Nebels zu."],
    ja:["一晩じゅう雨が降っていた。",
        "前日の騎手たちと同じように、クロスカントリーのコースを歩いた。木の障害はテレビで見るより高く、泥がブーツにまとわりつき、霧の奥から大きな館がこちらを見つめていた。"]},
  volets:[
   {t:{fr:"Le concours complet", en:"Eventing", es:"El concurso completo",
       it:"Il completo", de:"Die Vielseitigkeit", ja:"総合馬術"},
    c:{
      fr:"Trois épreuves dans le même week-end, avec le même cheval : le dressage, le cross, et le saut d'obstacles. C'est la discipline qui demande le plus de polyvalence, et Badminton est l'un des rares concours du plus haut niveau mondial.",
      en:"Three tests in the same weekend, with the same horse: dressage, cross-country, and show jumping. It is the discipline that demands the most versatility, and Badminton is one of the very few events at the highest world level.",
      es:"Tres pruebas en el mismo fin de semana, con el mismo caballo: la doma, el cross y el salto de obstáculos. Es la disciplina que exige más polivalencia, y Badminton es uno de los raros concursos del más alto nivel mundial.",
      it:"Tre prove nello stesso fine settimana, con lo stesso cavallo: il dressage, il cross e il salto ostacoli. È la disciplina che richiede più versatilità, e Badminton è uno dei rari concorsi del massimo livello mondiale.",
      de:"Drei Prüfungen am selben Wochenende, mit demselben Pferd: Dressur, Gelände und Springen. Es ist die Disziplin, die die meiste Vielseitigkeit verlangt, und Badminton ist eines der wenigen Turniere auf höchstem Weltniveau.",
      ja:"同じ週末に、同じ一頭の馬で三つの競技を。馬場馬術、クロスカントリー、そして障害飛越。最も幅広い能力が求められる競技であり、バドミントンはその世界最高レベルに数えられる数少ない大会のひとつです。"}},
   {t:{fr:"Le parc", en:"The park", es:"El parque",
       it:"Il parco", de:"Der Park", ja:"公園"},
    c:{
      fr:"Les épreuves se déroulent dans le parc d'une grande demeure géorgienne, siège des ducs de Beaufort. Les obstacles de cross y sont taillés dans le bois massif et portent des noms que les cavaliers connaissent par cœur — ils reviennent d'une année sur l'autre.",
      en:"The competition takes place in the park of a great Georgian house, seat of the Dukes of Beaufort. The cross-country fences are cut from solid timber and carry names riders know by heart — they come back year after year.",
      es:"Las pruebas se desarrollan en el parque de una gran mansión georgiana, sede de los duques de Beaufort. Los obstáculos de cross están tallados en madera maciza y llevan nombres que los jinetes conocen de memoria — vuelven de un año a otro.",
      it:"Le prove si svolgono nel parco di una grande dimora georgiana, sede dei duchi di Beaufort. Gli ostacoli di cross vi sono intagliati nel legno massiccio e portano nomi che i cavalieri conoscono a memoria — tornano di anno in anno.",
      de:"Die Prüfungen finden im Park eines großen georgianischen Anwesens statt, Sitz der Herzöge von Beaufort. Die Geländehindernisse sind aus massivem Holz gezimmert und tragen Namen, die die Reiter auswendig kennen — sie kehren Jahr für Jahr zurück.",
      ja:"競技は、ボーフォート公爵家の居城である壮大なジョージ王朝様式の館の庭園で行われます。クロスカントリーの障害は無垢の木材から削り出され、騎手たちが諳んじる名前を持っています — 年が変わっても、また戻ってくるのです。"}},
   {t:{fr:"Si tu y allais", en:"If you went there", es:"Si fueras allí",
       it:"Se ci andassi", de:"Wenn du hinführest", ja:"もし行くなら"},
    c:{
      fr:"Fais le tour du cross à pied. C'est en marchant qu'on comprend ce que la télévision ne montre pas : les dénivelés, les changements de sol, et la longueur réelle du parcours. On finit essoufflé sans avoir sauté une seule fois.",
      en:"Walk the cross-country course. It is on foot that you understand what television does not show: the gradients, the changes of ground, and the real length of the course. You finish out of breath without having jumped once.",
      es:"Da la vuelta al cross a pie. Es caminando como se entiende lo que la televisión no muestra: los desniveles, los cambios de suelo, y la longitud real del recorrido. Se acaba sin aliento sin haber saltado ni una vez.",
      it:"Fai il giro del cross a piedi. È camminando che si capisce ciò che la televisione non mostra: i dislivelli, i cambi di terreno, e la lunghezza reale del percorso. Si finisce senza fiato senza aver saltato una sola volta.",
      de:"Geh die Geländestrecke zu Fuß ab. Erst im Gehen versteht man, was das Fernsehen nicht zeigt: die Steigungen, die Bodenwechsel und die wirkliche Länge der Strecke. Man kommt außer Atem an, ohne ein einziges Mal gesprungen zu sein.",
      ja:"クロスカントリーのコースを歩いて一周してみて。テレビが映さないものは、歩いてこそ分かります。起伏、変わりゆく地面、そしてコースの本当の長さ。一度も跳んでいないのに、最後には息が切れているはずです。"}}
  ]},

/* ============ 9 · KILDARE · Les urgences ============ */
kildare:{
  lieu:"County Kildare · Ireland", carte:true,
  image:"les grands haras et les pur-sang",
  lettre:{
    fr:["Une lumière allumée à trois heures du matin.",
        "Le vétérinaire est arrivé vite. On a parlé bas, et j'ai appris que dans ces moments-là il faut savoir dire les choses en peu de mots : il boite, il transpire, il ne mange plus."],
    en:["A light on at three in the morning.",
        "The vet arrived quickly. We spoke in low voices, and I learned that in those moments you must know how to say things in few words: he is lame, he is sweating, he has stopped eating."],
    es:["Una luz encendida a las tres de la madrugada.",
        "El veterinario llegó rápido. Hablamos bajo, y aprendí que en esos momentos hay que saber decir las cosas con pocas palabras: cojea, suda, ya no come."],
    it:["Una luce accesa alle tre del mattino.",
        "Il veterinario è arrivato in fretta. Abbiamo parlato piano, e ho imparato che in quei momenti bisogna saper dire le cose in poche parole: zoppica, suda, non mangia più."],
    de:["Ein Licht, das um drei Uhr morgens brennt.",
        "Der Tierarzt kam schnell. Wir sprachen leise, und ich lernte, dass man in solchen Momenten die Dinge in wenigen Worten sagen können muss: er lahmt, er schwitzt, er frisst nicht mehr."],
    ja:["朝の三時に灯っていた、ひとつの明かり。",
        "獣医はすぐに来てくれた。私たちは声をひそめて話し、そして学んだ — こういうときは、短い言葉で伝えられなければいけない。跛行しています、汗をかいています、食べなくなりました。"],
      /* 🟡 arabe dormant (23/08) — aucun écran ne le lit. */
      ar:["ضوء مضاء في الثالثة صباحا.", "وصل الطبيب البيطري سريعا. تحدثنا بصوت خافت، وتعلمت أنه في مثل هذه اللحظات يجب أن تعرف قول الأشياء بكلمات قليلة: إنه يعرج، إنه يتعرق، لم يعد يأكل."]},
  volets:[
   {t:{fr:"Le haras national", en:"The national stud", es:"El haras nacional",
       it:"L'allevamento nazionale", de:"Das Nationalgestüt", ja:"国立牧場", ar:"المزرعة الوطنية للخيول"},
    c:{
      fr:"L'Irish National Stud se trouve à Tully, tout près de la ville, à côté des pistes du Curragh. C'est là que l'Irlande élève et présente ses pur-sang, et le domaine se visite.",
      en:"The Irish National Stud is at Tully, just outside the town, beside the gallops of the Curragh. It is where Ireland breeds and shows its thoroughbreds, and the estate is open to visitors.",
      es:"El Irish National Stud se encuentra en Tully, muy cerca de la ciudad, junto a las pistas del Curragh. Es allí donde Irlanda cría y presenta sus purasangres, y el dominio se puede visitar.",
      it:"L'Irish National Stud si trova a Tully, vicinissimo alla città, accanto alle piste del Curragh. È lì che l'Irlanda alleva e presenta i suoi purosangue, e la tenuta si visita.",
      de:"Das Irish National Stud liegt in Tully, ganz nah bei der Stadt, neben den Bahnen des Curragh. Dort züchtet und zeigt Irland seine Vollblüter, und das Anwesen kann besichtigt werden.",
      ja:"アイリッシュ・ナショナル・スタッドは町のすぐそば、タリーにあり、カラの調教馬場に隣接しています。アイルランドがサラブレッドを育て、披露する場所で、敷地は見学できます。",
      ar:"تقع المزرعة الوطنية الإيرلندية للخيول في تولي، قرب المدينة مباشرة، إلى جانب مضامير الكوراه. هناك تربي إيرلندا خيولها الأصيلة وتعرضها، والموقع مفتوح للزيارة."}},
   {t:{fr:"Le savais-tu ?", en:"Did you know?", es:"¿Lo sabías?",
       it:"Lo sapevi?", de:"Wusstest du es?", ja:"知ってた？", ar:"هل كنت تعرفين؟"},
    c:{
      fr:"Sur le domaine du haras, on trouve un jardin japonais créé au début du XX siècle par des jardiniers venus du Japon. Un jardin japonais au milieu des paddocks irlandais : personne ne s'attend à ça en venant voir des chevaux.",
      en:"On the stud's estate there is a Japanese garden created in the early 20th century by gardeners who came from Japan. A Japanese garden in the middle of Irish paddocks: nobody expects that when they come to see horses.",
      es:"En el dominio del haras hay un jardín japonés creado a principios del siglo XX por jardineros llegados de Japón. Un jardín japonés en medio de los paddocks irlandeses: nadie se espera eso al venir a ver caballos.",
      it:"Nella tenuta dell'allevamento si trova un giardino giapponese creato all'inizio del Novecento da giardinieri venuti dal Giappone. Un giardino giapponese in mezzo ai paddock irlandesi: nessuno se lo aspetta venendo a vedere dei cavalli.",
      de:"Auf dem Gelände des Gestüts gibt es einen japanischen Garten, Anfang des 20. Jahrhunderts von Gärtnern aus Japan angelegt. Ein japanischer Garten mitten zwischen irischen Koppeln: Damit rechnet niemand, der Pferde ansehen kommt.",
      ja:"牧場の敷地内には、二十世紀初頭に日本から来た庭師たちがつくった日本庭園があります。アイルランドのパドックの真ん中に日本庭園 — 馬を見に来て、これを予想する人はいません。",
      ar:"داخل المزرعة توجد حديقة يابانية أنشأها في مطلع القرن العشرين بستانيون قدموا من اليابان. حديقة يابانية وسط مراعي إيرلندا: لا أحد يتوقع ذلك حين يأتي لرؤية الخيول."}}, // ?? date et origine des jardiniers à confirmer
   {t:{fr:"Pourquoi ce chapitre est gratuit", en:"Why this chapter is free", es:"Por qué este capítulo es gratis",
       it:"Perché questo capitolo è gratuito", de:"Warum dieses Kapitel gratis ist", ja:"この章が無料である理由", ar:"لماذا هذا الفصل مجاني"},
    c:{
      fr:"Savoir dire « il a une colique » ou « appelez le vétérinaire » dans le pays où l'on se trouve n'est pas du confort. Ce chapitre est offert dans les six langues, partout, à tout le monde.",
      en:"Knowing how to say “he has colic” or “call the vet” in the country you are in is not a luxury. This chapter is free in all six languages, everywhere, for everyone.",
      es:"Saber decir « tiene un cólico » o « llamen al veterinario » en el país donde uno se encuentra no es un lujo. Este capítulo se ofrece en los seis idiomas, en todas partes, a todo el mundo.",
      it:"Saper dire « ha una colica » o « chiamate il veterinario » nel paese in cui ci si trova non è un comfort. Questo capitolo è offerto nelle sei lingue, ovunque, a tutti.",
      de:"„Er hat eine Kolik“ oder „Rufen Sie den Tierarzt“ in dem Land sagen zu können, in dem man sich befindet, ist kein Luxus. Dieses Kapitel ist in allen sechs Sprachen gratis, überall, für alle.",
      ja:"いま自分がいる国の言葉で「疝痛です」「獣医を呼んでください」と言えること — それは贅沢ではありません。この章は六つの言語すべてで、どこでも、誰にでも無料で開かれています。",
      ar:"أن تعرفي كيف تقولين «إنه مصاب بمغص» أو «اتصلي بالطبيب البيطري» بلغة البلد الذي توجدين فيه ليس من باب الرفاهية. لذلك يقدم هذا الفصل مجانا بجميع اللغات المتاحة، في كل مكان وللجميع."}}
  ]},

/* ============ 10 · ÉDIMBOURG · Les dialogues ============ */
edimbourg:{
  lieu:"Edinburgh · Scotland", carte:true,
  image:"les pavés humides et la ville qui monte",
  lettre:{
    fr:["J'ai demandé mon chemin, et je n'ai rien compris.",
        "Il a répété plus lentement, en souriant, et cette fois oui. Les pavés étaient trempés, le vent froid, la ville montait dans tous les sens — et c'est ici que j'ai vraiment appris à écouter."],
    en:["I asked for directions, and understood nothing.",
        "He repeated it more slowly, smiling, and this time I did. The cobbles were soaked, the wind cold, the city climbed in every direction — and it is here that I truly learned to listen."],
    es:["Pregunté el camino, y no entendí nada.",
        "Lo repitió más despacio, sonriendo, y esta vez sí. Los adoquines estaban empapados, el viento frío, la ciudad subía en todas direcciones — y es aquí donde de verdad aprendí a escuchar."],
    it:["Ho chiesto la strada, e non ho capito niente.",
        "L'ha ripetuto più lentamente, sorridendo, e questa volta sì. I ciottoli erano fradici, il vento freddo, la città saliva in tutte le direzioni — ed è qui che ho davvero imparato ad ascoltare."],
    de:["Ich fragte nach dem Weg und verstand nichts.",
        "Er wiederholte es langsamer, lächelnd, und diesmal ja. Das Pflaster war durchnässt, der Wind kalt, die Stadt stieg in alle Richtungen an — und hier habe ich wirklich gelernt zuzuhören."],
    ja:["道を尋ねて、何ひとつ聞き取れなかった。",
        "相手は微笑みながら、ゆっくりと繰り返してくれた。今度は分かった。石畳はずぶ濡れで、風は冷たく、街はあらゆる方向へ登っていた — 本当の意味で「聞く」ことを学んだのは、この街でだった。"],
      /* 🟡 arabe dormant (23/08) — aucun écran ne le lit. */
      ar:["سألت عن طريقي، ولم أفهم شيئا.", "أعاد الكلام ببطء وهو يبتسم، وهذه المرة فهمت. كانت الحجارة مبللة، والريح باردة، والمدينة تصعد في كل الاتجاهات — وهنا تعلمت حقا كيف أصغي."]},
  volets:[
   {t:{fr:"L'accent", en:"The accent", es:"El acento",
       it:"L'accento", de:"Der Akzent", ja:"訛り", ar:"اللكنة"},
    c:{
      fr:"L'anglais d'Écosse ne s'entend pas comme celui du Sud : les voyelles sont plus courtes, le « r » se prononce franchement, et le vocabulaire a ses propres mots. Comprendre ici, c'est comprendre partout.",
      en:"Scottish English does not sound like the English of the South: the vowels are shorter, the “r” is sounded fully, and the vocabulary has words of its own. If you can understand here, you can understand anywhere.",
      es:"El inglés de Escocia no suena como el del Sur: las vocales son más cortas, la « r » se pronuncia con franqueza, y el vocabulario tiene sus propias palabras. Entender aquí es entender en todas partes.",
      it:"L'inglese di Scozia non suona come quello del Sud: le vocali sono più corte, la « r » si pronuncia con decisione, e il vocabolario ha le sue parole. Capire qui è capire ovunque.",
      de:"Das Englisch Schottlands klingt nicht wie das des Südens: Die Vokale sind kürzer, das „r“ wird deutlich gesprochen, und der Wortschatz hat seine eigenen Wörter. Wer hier versteht, versteht überall.",
      ja:"スコットランドの英語は南部の英語とは響きが違います。母音は短く、「r」ははっきりと発音され、語彙には独自の言葉があります。ここで聞き取れるなら、世界のどこでも聞き取れます。",
      ar:"لا تبدو الإنجليزية في اسكتلندا عند سماعها كالإنجليزية في الجنوب: حروف العلة أقصر، وحرف الراء ينطق بوضوح، وتضم اللهجة مفردات خاصة بها. من يفهم الإنجليزية هنا يستطيع فهمها في كل مكان."}},
   {t:{fr:"Le rendez-vous", en:"The meeting place", es:"La cita",
       it:"L'appuntamento", de:"Der Treffpunkt", ja:"開催地", ar:"الموعد"},
    c:{
      fr:"Le Royal Highland Show se tient chaque été à Ingliston, aux portes de la ville. C'est le grand rendez-vous agricole et équestre écossais, et l'endroit où voir les races du pays — le Highland pony et le Clydesdale, ce cheval de trait aux longs crins bas de jambe.",
      en:"The Royal Highland Show is held every summer at Ingliston, on the edge of the city. It is Scotland's great agricultural and equestrian gathering, and the place to see the country's breeds — the Highland pony and the Clydesdale, that draught horse with long feather on its lower legs.",
      es:"El Royal Highland Show se celebra cada verano en Ingliston, a las puertas de la ciudad. Es la gran cita agrícola y ecuestre escocesa, y el lugar donde ver las razas del país — el poni Highland y el Clydesdale, ese caballo de tiro con largas cernejas en la parte baja de las patas.",
      it:"Il Royal Highland Show si tiene ogni estate a Ingliston, alle porte della città. È il grande appuntamento agricolo ed equestre scozzese, e il posto dove vedere le razze del paese — l'Highland pony e il Clydesdale, quel cavallo da tiro con lunghe criniere sul basso degli arti.",
      de:"Die Royal Highland Show findet jeden Sommer in Ingliston vor den Toren der Stadt statt. Sie ist das große schottische Landwirtschafts- und Pferdetreffen und der Ort, um die Rassen des Landes zu sehen — das Highland Pony und das Clydesdale, jenes Zugpferd mit langem Behang an den unteren Beinen.",
      ja:"ロイヤル・ハイランド・ショーは毎年夏、街のすぐ外のイングリストンで開かれます。スコットランド最大の農業と馬の祭典で、この国の品種に出会える場所 — ハイランドポニーと、脚の下部に長い飾り毛をなびかせる輓馬クライズデールに。",
      ar:"يقام معرض رويال هايلاند كل صيف في إنغليستون، على مشارف المدينة. وهو الملتقى الزراعي والفروسي الكبير في اسكتلندا، والمكان الذي يمكنك فيه رؤية سلالات البلاد، مثل مهر الهايلاند وحصان كلايدزديل، وهو حصان جر يتميز بشعر طويل حول أسفل قوائمه."}},
   {t:{fr:"La fin du voyage", en:"The end of the journey", es:"El final del viaje",
       it:"La fine del viaggio", de:"Das Ende der Reise", ja:"旅の終わり", ar:"نهاية الرحلة"},
    c:{
      fr:"Dix villes, quatre nations, une langue. Tu es parti d'une écurie du Suffolk et tu arrives dans une capitale — et entre les deux, tu as appris à dire ce que tu fais avec un cheval.",
      en:"Ten towns, four nations, one language. You set out from a yard in Suffolk and you arrive in a capital — and in between, you have learned to say what you do with a horse.",
      es:"Diez ciudades, cuatro naciones, una lengua. Partiste de una cuadra del Suffolk y llegas a una capital — y entre las dos, has aprendido a decir lo que haces con un caballo.",
      it:"Dieci città, quattro nazioni, una lingua. Sei partito da una scuderia del Suffolk e arrivi in una capitale — e tra le due, hai imparato a dire quello che fai con un cavallo.",
      de:"Zehn Städte, vier Nationen, eine Sprache. Du bist von einem Stall in Suffolk aufgebrochen und kommst in einer Hauptstadt an — und dazwischen hast du gelernt zu sagen, was du mit einem Pferd tust.",
      ja:"十の街、五つの国、ひとつの言語。サフォークの厩舎から旅立ったきみは、いま首都にたどり着く — そしてその道のりで、馬とともにあるくらしを言葉にすることを学んだ。",
      ar:"عشر مدن، وأربع أمم، ولغة واحدة. انطلقت من إسطبل في سوفولك ووصلت إلى عاصمة — وبينهما تعلمت أن تقول ما تفعله مع حصان."}}
  ]}

};
