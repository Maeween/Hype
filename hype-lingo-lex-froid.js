/* hype-lingo-lex-froid.js — Hype Linguae · Spruce Meadows · « Le froid »
   ==================================================================
   16 CONCEPTS, UNE LEÇON.  RÉÉCRIT LE 10/08/2026.

   POURQUOI CETTE RÉÉCRITURE. Blandine, 10/08 : « les mots sont trop
   simples et pas vraiment en rapport avec l'équitation, on peut parler de
   gants, couvre-reins, couverture chauffante etc. », « hiver neige glace…
   on va dire dans l'idée quoi », « dégel hiverner buée recouvrir oui ok
   on peut garder ». Les mots de météo sortent, les mots du MÉTIER par
   temps froid entrent. Et : « si oui n'hésite pas à rajouter un peu de
   texte pour décrire et expliquer, c'est tout ça le charme du voyage ».
   Les définitions sont donc plus longues qu'ailleurs, volontairement.

   GARDÉS (4 nommés par Blandine + 2 qui portent le voyage)
     degel · hiverner · buee · couvrir · chinook · poilhiver
   SORTIS  hiver · neige · gel · glace — trop génériques, aucun rapport
     avec l'équitation. Le sol gelé ne disparaît pas : il devient `solgele`,
     un vrai mot de métier (« dégel ou sol gelé c'est pas mal »).

   ⚠️ AUDIT DES DOUBLONS FAIT SUR LES 23 LEXIQUES, 510 refs (10/08). Ces
   mots-là sont DÉJÀ PRIS et ne sont donc PAS repris ici, malgré la demande :
     · `couverture` → lex-ecurie (générique, froid/pluie/mouches)
     · `abreuvoir`  → lex-ecurie (dit déjà la conduite gelée)
     · `manege`     → lex-ecurie · `seau`, `eau`, `pre`, `paddock`, `box` → lex-ecurie
     · `bonnet`     → lex-materiel (le bonnet anti-mouches)
     · `gants`      → lex-materiel (les gants d'équitation)
     · `tondre`, `mue`, `sueur`, `secher`, `sabot` → lex-pansage
   Ici : `chemise` (la séchante, notion distincte de la couverture),
   `couvrerein`, `abrchauffant` (l'abreuvoir CHAUFFANT, objet distinct),
   `tonte` (le TRACÉ de tonte, distinct du verbe tondre), `bonnetlaine`
   (celui de la cavalière, distinct du bonnet du cheval).
   ⚠️ Redire ici un mot déjà pris ailleurs déteindrait sur sa maîtrise :
   c'est le piège des faux rappels documenté dans le SUIVI.

   ⚠️ FORMAT DES PHRASES : À PLAT (`{lecon:1, fr:"…"}`), comme les 19
   lexiques d'origine. La version précédente les emboîtait dans `p:{…}` —
   c'est ce qui a BLOQUÉ Blandine deux fois sur le dernier exercice de la
   leçon, écran noir, progression perdue. Le moteur accepte désormais les
   deux (v68), mais ce fichier-ci est au bon format.

   ⚠️ CE CHAPITRE NE CITE AUCUNE PERSONNE ET AUCUN ORGANISME PRIVÉ
   (décision de Blandine du 8 août 2026, valable pour tout le module).

   CHAMPS  m · p (EN/DE/JA) · var · coll · def · v (verbe)

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. Le matériel d'hiver est du vocabulaire
   d'usage : `quarter sheet`, `cooler`, `hunter clip`, `snow pad` sont
   sûrs en anglais nord-américain ; les colonnes DE et JA de ces
   objets-là sont les plus fragiles du fichier.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.froid = {
  ref: "froid",
  chapitre: 16,
  titre: { fr:"Le froid", en:"The cold", es:"El frío",
           it:"Il freddo", de:"Die Kälte", ja:"寒さ" },
  lecons: 1,

  concepts: [

  /* ---------- ce que le cheval fait tout seul ---------- */

  { ref:"poilhiver", lecon:1, coll:"froid",
    mots:{ fr:{m:"le poil d'hiver"}, en:{m:"the winter coat", p:"ouin-teur côt"},
           es:{m:"el pelo de invierno"}, it:{m:"il pelo invernale"},
           de:{m:"das Winterfell", p:"vin-teur-fèl"}, ja:{m:"冬毛", p:"fuyuge"} },
    def:{ fr:"Le manteau que le cheval se fabrique tout seul dès que les jours raccourcissent — il répond à la lumière, pas à la température, et arrive donc AVANT le froid. Les poils se dressent et emprisonnent une couche d'air tiède : c'est l'air qui réchauffe, pas le poil. Un cheval couvert de neige qui ne fond pas est un cheval qui n'a pas froid.",
          en:"The coat the horse grows all by himself as the days shorten — it answers to daylight, not to temperature, so it comes BEFORE the cold. The hairs stand up and trap a layer of warm air: the air does the warming, not the hair. A horse with snow on his back that does not melt is a horse who is not cold.",
          es:"El abrigo que el caballo se fabrica solo en cuanto los días se acortan: responde a la luz, no a la temperatura, y por eso llega ANTES del frío. Los pelos se erizan y atrapan una capa de aire tibio: calienta el aire, no el pelo. Un caballo con nieve que no se derrite es un caballo que no tiene frío.",
          it:"Il cappotto che il cavallo si fabbrica da solo appena le giornate si accorciano: risponde alla luce, non alla temperatura, e arriva quindi PRIMA del freddo. I peli si rizzano e trattengono uno strato d'aria tiepida: scalda l'aria, non il pelo. Un cavallo con la neve che non si scioglie è un cavallo che non ha freddo.",
          de:"Der Mantel, den sich das Pferd selbst wachsen lässt, sobald die Tage kürzer werden: er antwortet auf das Licht, nicht auf die Temperatur, und kommt darum VOR der Kälte. Die Haare stellen sich auf und halten eine warme Luftschicht: die Luft wärmt, nicht das Haar. Ein Pferd, auf dem der Schnee liegen bleibt, friert nicht.",
          ja:"日が短くなると馬が自ら作り上げる毛のコート。気温ではなく光に応えるため、寒さより先に生えてくる。毛が立ち、その間に暖かい空気の層を閉じ込める。暖めているのは毛ではなく空気だ。背の雪が解けない馬は、寒がっていない馬である。" } },

  { ref:"buee", lecon:1, coll:"froid",
    mots:{ fr:{m:"la buée"}, en:{m:"the steam", p:"stiim"},
           es:{m:"el vaho"}, it:{m:"il vapore"},
           de:{m:"der Atemdampf", p:"a-teum-dampf"}, ja:{m:"白い息", p:"shiroi iki"} },
    def:{ fr:"Le souffle des chevaux rendu visible par le froid. La plus belle chose d'une écurie en hiver, et la plus banale. Elle dit aussi quelque chose d'utile : de la buée au-dessus d'un box au petit matin, c'est un cheval qui respire fort — on va voir.",
          en:"The horses' breath made visible by the cold. The most beautiful thing in a winter yard, and the most ordinary. It also tells you something useful: steam over a stable door at dawn means a horse breathing hard — you go and look.",
          es:"El aliento de los caballos hecho visible por el frío. Lo más bello de una cuadra en invierno, y lo más corriente. También dice algo útil: vaho sobre un box al amanecer es un caballo que respira fuerte — se va a ver.",
          it:"Il fiato dei cavalli reso visibile dal freddo. La cosa più bella di una scuderia d'inverno, e la più comune. Dice anche qualcosa di utile: vapore sopra un box all'alba è un cavallo che respira forte — si va a vedere.",
          de:"Der Atem der Pferde, sichtbar gemacht von der Kälte. Das Schönste an einem Stall im Winter — und das Alltäglichste. Er sagt auch Nützliches: Dampf über einer Boxentür am frühen Morgen heißt, ein Pferd atmet schwer — man geht nachsehen.",
          ja:"寒さが見えるようにした馬の呼吸。冬の厩舎で最も美しく、最もありふれたもの。役に立つことも教えてくれる。早朝、馬房の上に立つ白い息は、呼吸が速い馬のしるし。見に行くべきだ。" } },

  /* ---------- la tonte, et pourquoi on tond dans un pays glacial ---------- */

  { ref:"tonte", lecon:1, coll:"froid",
    mots:{ fr:{m:"le tracé de tonte", var:"la tonte de chasse"},
           en:{m:"the clip", p:"klip", var:"the hunter clip"},
           es:{m:"el trazado del esquileo"}, it:{m:"il tipo di tosatura"},
           de:{m:"das Schurmuster", p:"chour-mous-teur"},
           ja:{m:"刈り方の型", p:"karikata no kata"} },
    def:{ fr:"On ne tond pas contre le froid, on tond contre la SUEUR : un cheval en plein poil qui travaille met des heures à sécher, et c'est mouillé qu'il prend froid — pas gelé. Le tracé dit ce qu'on enlève et ce qu'on laisse : on dégarnit l'encolure, le poitrail et les flancs, qui suent, et on garde le poil sur le dos, la croupe et les jambes. **On ne tond que si l'on couvre** : ce qu'on retire, il faut le rendre.",
          en:"You do not clip against the cold, you clip against SWEAT: a horse in full coat takes hours to dry, and it is being wet that chills him — not being cold. The clip says what comes off and what stays: the neck, chest and flanks are taken out because they sweat, and the coat is left on the back, quarters and legs. **You only clip if you rug**: what you take away, you must give back.",
          es:"No se esquila contra el frío, se esquila contra el SUDOR: un caballo con todo su pelo tarda horas en secarse, y es mojado como se enfría — no helado. El trazado dice qué se quita y qué se deja: se despoja el cuello, el pecho y los flancos, que sudan, y se conserva el pelo en el dorso, la grupa y las patas. **Solo se esquila si se pone manta**: lo que se quita, hay que devolverlo.",
          it:"Non si tosa contro il freddo, si tosa contro il SUDORE: un cavallo con tutto il pelo ci mette ore ad asciugare, ed è da bagnato che prende freddo — non da gelato. Il tracciato dice cosa si toglie e cosa resta: si libera il collo, il petto e i fianchi, che sudano, e si lascia il pelo su dorso, groppa e gambe. **Si tosa solo se si copre**: quello che si toglie va restituito.",
          de:"Man schert nicht gegen die Kälte, man schert gegen den SCHWEISS: ein Pferd im vollen Fell braucht Stunden zum Trocknen, und nass wird es krank — nicht kalt. Das Muster sagt, was weg muss und was bleibt: Hals, Brust und Flanken werden freigelegt, weil sie schwitzen, auf Rücken, Kruppe und Beinen bleibt das Fell. **Geschoren wird nur, wer eingedeckt wird**: was man wegnimmt, muss man zurückgeben.",
          ja:"寒さのために刈るのではない。汗のために刈る。冬毛のままの馬が運動すれば乾くまでに何時間もかかり、馬が体調を崩すのは「濡れているから」で、「寒いから」ではない。型は、どこを刈りどこを残すかを示す。汗をかく首、胸、脇腹を刈り、背、尻、脚の毛は残す。**刈るのは馬着を着せる場合だけ**。取り去ったものは、返さなければならない。" } },

  /* ---------- ce qu'on met sur le cheval ---------- */

  { ref:"couvrir", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"couvrir"}, en:{m:"to rug up", p:"tou reug eup"},
           es:{m:"poner la manta"}, it:{m:"mettere la coperta"},
           de:{m:"eindecken", p:"aïn-dè-keune"}, ja:{m:"馬着を着せる", p:"bachaku o kiseru"} },
    def:{ fr:"Mettre la couverture — ou choisir de ne pas la mettre : un cheval en poil d'hiver, dehors, s'en passe souvent très bien, et trop couvrir fait transpirer sous la toile, ce qui est exactement ce qu'on voulait éviter. La main sous la couverture, à l'épaule, tranche mieux que le thermomètre.",
          en:"Putting the rug on — or choosing not to: a horse in his winter coat, living out, often does very well without one, and over-rugging makes him sweat under the cloth, which is precisely what you were avoiding. A hand slipped under the rug at the shoulder settles it better than a thermometer.",
          es:"Poner la manta — o decidir no ponerla: un caballo con pelo de invierno, fuera, suele pasar muy bien sin ella, y abrigar de más le hace sudar bajo la tela, justo lo que se quería evitar. La mano bajo la manta, en la espalda, decide mejor que el termómetro.",
          it:"Mettere la coperta — o scegliere di non metterla: un cavallo col pelo invernale, fuori, spesso ne fa benissimo a meno, e coprire troppo lo fa sudare sotto il telo, esattamente ciò che si voleva evitare. La mano sotto la coperta, alla spalla, decide meglio del termometro.",
          de:"Die Decke auflegen — oder bewusst darauf verzichten: ein Pferd im Winterfell, draußen, kommt oft sehr gut ohne aus, und zu warm eingedeckt schwitzt es unter dem Tuch — genau das, was man vermeiden wollte. Die Hand unter der Decke an der Schulter entscheidet besser als das Thermometer.",
          ja:"馬着を着せること。あるいは着せない選択をすること。冬毛の馬は屋外でも馬着なしで元気に過ごすことが多い。着せすぎれば布の下で汗をかき、それこそ避けたかったことになる。肩のあたりで馬着の下に手を入れる。体温計よりも確かな判断だ。" } },

  { ref:"chemise", lecon:1, coll:"froid",
    mots:{ fr:{m:"la chemise séchante", var:"la polaire"},
           en:{m:"the cooler", p:"kou-leur", var:"the fleece rug"},
           es:{m:"la manta secadora"}, it:{m:"la coperta asciugante"},
           de:{m:"die Abschwitzdecke", p:"ap-chvits-dè-ke"},
           ja:{m:"吸汗用馬着", p:"kyūkan-yō bachaku"} },
    def:{ fr:"La toile qu'on jette sur un cheval trempé de sueur pour qu'il sèche sans se refroidir : la laine ou la polaire boit l'humidité et la fait passer à travers. On la met après le travail, on l'enlève quand le cheval est sec, et alors seulement on remet la couverture. Le froid n'a jamais rendu un cheval malade — l'humidité sous une toile, oui.",
          en:"The sheet thrown over a horse soaked in sweat so he dries without chilling: wool or fleece drinks the damp and wicks it through. It goes on after work, comes off once he is dry, and only then does the rug go back on. Cold has never made a horse ill — damp trapped under cloth has.",
          es:"La tela que se echa sobre un caballo empapado de sudor para que se seque sin enfriarse: la lana o el polar absorbe la humedad y la deja pasar. Se pone tras el trabajo, se retira cuando está seco, y solo entonces se vuelve a poner la manta. El frío nunca puso enfermo a un caballo — la humedad bajo una tela, sí.",
          it:"Il telo che si getta su un cavallo bagnato di sudore perché asciughi senza raffreddarsi: la lana o il pile bevono l'umidità e la fanno passare. Si mette dopo il lavoro, si toglie quando è asciutto, e solo allora si rimette la coperta. Il freddo non ha mai fatto ammalare un cavallo — l'umidità sotto un telo sì.",
          de:"Das Tuch, das man einem schweißnassen Pferd überwirft, damit es trocknet, ohne auszukühlen: Wolle oder Fleece nimmt die Feuchte auf und lässt sie durch. Nach der Arbeit drauf, ab, sobald das Pferd trocken ist — und erst dann kommt die Decke wieder. Kälte hat noch kein Pferd krank gemacht — eingeschlossene Nässe schon.",
          ja:"汗でぬれた馬にかけ、冷やさずに乾かすための布。ウールやフリースが湿気を吸い、外へ通す。運動のあとにかけ、乾いたら外し、そのあとで初めて馬着を戻す。馬を病気にするのは寒さではない。布の下にこもった湿気である。" } },

  { ref:"couvrerein", lecon:1, coll:"froid",
    mots:{ fr:{m:"le couvre-reins"}, en:{m:"the quarter sheet", p:"kouor-teur chiit",
           var:"the exercise sheet"},
           es:{m:"el cubre-riñones"}, it:{m:"il copri-reni"},
           de:{m:"die Nierendecke", p:"ni-ren-dè-ke"},
           ja:{m:"腰当て", p:"koshiate"} },
    def:{ fr:"La couverture courte qu'on garde SUR le cheval pendant qu'on le monte, posée derrière la selle. Elle tient les muscles du dos et de la croupe au chaud pendant la détente et les pauses, quand le cheval attend et refroidit sans bouger. C'est le geste le plus quotidien de l'hiver, et celui qu'on oublie le plus.",
          en:"The short rug kept ON the horse while you ride, laid behind the saddle. It holds the muscles of the back and quarters warm through the warm-up and the standing about, when a horse cools down without moving. It is the most everyday winter habit, and the one most often forgotten.",
          es:"La manta corta que se mantiene SOBRE el caballo mientras se monta, colocada tras la silla. Guarda el calor de los músculos del dorso y la grupa durante el calentamiento y las paradas, cuando el caballo se enfría sin moverse. Es el gesto más cotidiano del invierno, y el que más se olvida.",
          it:"La coperta corta che resta SUL cavallo mentre lo si monta, posata dietro la sella. Tiene al caldo i muscoli del dorso e della groppa durante il riscaldamento e le soste, quando il cavallo si raffredda stando fermo. È il gesto più quotidiano dell'inverno, e il più dimenticato.",
          de:"Die kurze Decke, die beim Reiten AUF dem Pferd bleibt, hinter dem Sattel. Sie hält die Muskeln von Rücken und Kruppe warm — beim Lösen und beim Stehen, wenn ein Pferd auskühlt, ohne sich zu bewegen. Der alltäglichste Wintergriff, und der am häufigsten vergessene.",
          ja:"騎乗中も馬にかけたままにする短い馬着。鞍の後ろに置く。準備運動や待機のあいだ、動かずに冷えていく背と尻の筋肉を温かく保つ。冬のもっとも日常的な所作であり、もっとも忘れられやすい所作でもある。" } },

  { ref:"bonnetlaine", lecon:1, coll:"cavalier",
    mots:{ fr:{m:"le bonnet"}, en:{m:"the beanie", p:"bii-ni", var:"the toque"},
           es:{m:"el gorro"}, it:{m:"il berretto"},
           de:{m:"die Mütze", p:"mu-tse"}, ja:{m:"ニット帽", p:"nittobō"} },
    def:{ fr:"Celui de la cavalière, pas celui du cheval. Au Canada on dit *toque*, et nulle part ailleurs — c'est l'un de ces mots qu'on n'apprend qu'en y allant. Sous le casque il n'entre pas : on le garde pour le pansage, les paddocks et les allers-retours dans le froid.",
          en:"The rider's, not the horse's. In Canada it is a *toque*, a word used nowhere else — one of those you only pick up by going there. It will not fit under a helmet: it is for grooming, turnout and the walks back and forth in the cold.",
          es:"El de la jinete, no el del caballo. En Canadá se dice *toque*, y en ningún otro sitio — una de esas palabras que solo se aprenden yendo. Bajo el casco no cabe: se guarda para el cepillado, los paddocks y las idas y venidas en el frío.",
          it:"Quello dell'amazzone, non quello del cavallo. In Canada si dice *toque*, e da nessun'altra parte — una di quelle parole che si imparano solo andandoci. Sotto il casco non entra: serve per la pulizia, i paddock e i viaggi avanti e indietro nel freddo.",
          de:"Die der Reiterin, nicht die des Pferdes. In Kanada heißt sie *toque* — sonst nirgends, eines dieser Wörter, die man nur vor Ort lernt. Unter den Helm passt sie nicht: sie ist fürs Putzen, fürs Auf-die-Weide-Bringen und für die Wege hin und her in der Kälte.",
          ja:"かぶるのは馬ではなく騎手。カナダでは *toque* と言い、ほかのどこでも言わない。現地に行かなければ覚えない類の言葉だ。ヘルメットの下には入らないので、手入れや放牧、寒さのなかの行き帰りに使う。" } },

  /* ---------- le sol ---------- */

  { ref:"solgele", lecon:1, coll:"froid",
    mots:{ fr:{m:"le sol gelé"}, en:{m:"the frozen ground", p:"frô-zeune graound"},
           es:{m:"el suelo helado"}, it:{m:"il terreno gelato"},
           de:{m:"der gefrorene Boden", p:"gue-frô-re-ne bô-den"},
           ja:{m:"凍った地面", p:"kōtta jimen"} },
    def:{ fr:"Le vrai patron de l'hiver : c'est lui qui décide si le sol se travaille ou se regarde. Un sol gelé est dur comme le béton et garde les traces de sabots de la veille, en arêtes : les tendons ne pardonnent pas. On marche, on ne trotte pas, et surtout on ne tourne pas court.",
          en:"The true master of winter: it decides whether the ground can be worked or only looked at. Frozen ground is hard as concrete and keeps yesterday's hoofprints as ridges: tendons do not forgive it. You walk, you do not trot, and above all you do not turn short.",
          es:"El verdadero jefe del invierno: decide si el suelo se trabaja o solo se mira. Un suelo helado está duro como el hormigón y guarda las huellas de ayer en aristas: los tendones no lo perdonan. Se anda al paso, no se trota, y sobre todo no se gira corto.",
          it:"Il vero padrone dell'inverno: decide se il terreno si lavora o si guarda soltanto. Un terreno gelato è duro come il cemento e conserva le impronte di ieri a creste: i tendini non perdonano. Si cammina, non si trotta, e soprattutto non si gira corto.",
          de:"Der wahre Herr des Winters: er entscheidet, ob der Boden bearbeitet oder nur betrachtet wird. Gefrorener Boden ist hart wie Beton und behält die Hufspuren von gestern als Kanten: Sehnen verzeihen das nicht. Man geht Schritt, trabt nicht — und wendet vor allem nicht kurz.",
          ja:"冬の本当の主。地面で運動できるか、眺めるだけかを決める。凍った地面はコンクリートのように硬く、前日の蹄跡を稜のまま残す。腱はそれを許さない。常歩で歩き、速歩はせず、そして何より小さく回らない。" } },

  { ref:"crampon", lecon:1, coll:"froid",
    mots:{ fr:{m:"le crampon à glace"}, en:{m:"the ice stud", p:"aïss steud",
           var:"the caulk"},
           es:{m:"el ramplón para hielo"}, it:{m:"il rampone da ghiaccio"},
           de:{m:"der Eisstollen", p:"aïss-chto-leune"},
           ja:{m:"氷用蹄鉄スタッド", p:"kōri-yō teitetsu sutaddo"} },
    def:{ fr:"Le petit clou vissé dans le fer pour mordre la glace, comme un pneu clouté. Il accroche — c'est bien le problème : un cheval qui accroche en glissant se blesse plus qu'un cheval qui glisse franchement. On les visse pour un besoin précis, on ne les laisse pas à l'année.",
          en:"The small stud screwed into the shoe to bite the ice, like a studded tyre. It grips — and that is exactly the risk: a horse who grips while sliding hurts himself more than one who slides clean. You screw them in for a purpose and take them out again; they do not stay in all year.",
          es:"El clavito atornillado en la herradura para morder el hielo, como un neumático de clavos. Agarra — y ahí está el riesgo: un caballo que agarra mientras resbala se lesiona más que uno que resbala limpio. Se ponen para una necesidad concreta y se quitan; no se dejan todo el año.",
          it:"Il piccolo ramponcino avvitato nel ferro per mordere il ghiaccio, come un pneumatico chiodato. Fa presa — ed è proprio il rischio: un cavallo che fa presa mentre scivola si fa più male di uno che scivola pulito. Si avvitano per un bisogno preciso e si togliono; non restano tutto l'anno.",
          de:"Der kleine Stollen, der ins Eisen geschraubt wird, um ins Eis zu greifen — wie ein Spikereifen. Er greift, und genau das ist die Gefahr: ein Pferd, das beim Rutschen hängen bleibt, verletzt sich schwerer als eines, das glatt wegrutscht. Man schraubt sie für einen bestimmten Zweck ein und wieder heraus; sie bleiben nicht das ganze Jahr.",
          ja:"氷をとらえるために蹄鉄にねじ込む小さな金具。スパイクタイヤと同じ考え方だ。よく噛む——そこが危険でもある。滑りながら引っかかる馬は、きれいに滑る馬よりも大きな怪我をする。必要なときにねじ込み、そのあと外す。一年中つけたままにはしない。" } },

  { ref:"plaqueneige", lecon:1, coll:"froid",
    mots:{ fr:{m:"la plaque anti-neige"}, en:{m:"the snow pad", p:"snô pad",
           var:"the bubble pad"},
           es:{m:"la plantilla antinieve"}, it:{m:"la piastra antineve"},
           de:{m:"der Schneegrip", p:"chné-grip", var:"das Hufpolster"},
           ja:{m:"雪詰まり防止パッド", p:"yukizumari bōshi paddo"} },
    def:{ fr:"Sous le pied, la neige se tasse en une boule de glace qui grossit à chaque pas : le cheval finit par marcher sur des échasses. La plaque, souple et bombée, la chasse à chaque appui. Sans elle, on cure les pieds trois fois par jour, et on graisse la sole pour que rien n'accroche.",
          en:"Under the foot, snow packs into a ball of ice that grows with every stride: the horse ends up walking on stilts. The pad, flexible and domed, pops it out at each step. Without one you pick out the feet three times a day and grease the sole so nothing sticks.",
          es:"Bajo el casco, la nieve se apelmaza en una bola de hielo que crece a cada paso: el caballo acaba caminando sobre zancos. La plantilla, flexible y abombada, la expulsa en cada apoyo. Sin ella se limpian los cascos tres veces al día y se engrasa la palma para que nada se pegue.",
          it:"Sotto il piede la neve si compatta in una palla di ghiaccio che cresce a ogni passo: il cavallo finisce per camminare sui trampoli. La piastra, morbida e bombata, la caccia a ogni appoggio. Senza, si pulisce il piede tre volte al giorno e si ingrassa la suola perché nulla attacchi.",
          de:"Unter dem Huf presst sich Schnee zu einer Eiskugel, die mit jedem Schritt wächst: am Ende läuft das Pferd auf Stelzen. Das gewölbte, weiche Polster drückt sie bei jedem Auftreten heraus. Ohne kratzt man die Hufe dreimal täglich aus und fettet die Sohle, damit nichts haftet.",
          ja:"蹄の下で雪は踏み固められ、一歩ごとに大きくなる氷の玉になる。やがて馬は竹馬に乗って歩いているような状態になる。柔らかく丸みのあるパッドは、着地ごとにその玉を押し出す。パッドがなければ、一日三回蹄を掃除し、蹄底に油を塗って雪がつかないようにする。" } },

  /* ---------- LE VRAI DANGER : l'eau ---------- */

  { ref:"abrchauffant", lecon:1, coll:"froid",
    mots:{ fr:{m:"l'abreuvoir chauffant"}, en:{m:"the heated waterer", p:"hii-tid oua-teu-reur"},
           es:{m:"el bebedero calefactado"}, it:{m:"l'abbeveratoio riscaldato"},
           de:{m:"die Tränke mit Heizung", p:"trèn-ke mit haï-tsoung"},
           ja:{m:"加温式水槽", p:"kaon-shiki suisō"} },
    def:{ fr:"Une résistance dans le bac, et l'eau reste liquide et tiède par −30 °C. Ce n'est pas un luxe : c'est le seul matériel d'hiver qui sauve vraiment des chevaux. Là où il n'y en a pas, on casse la glace deux fois par jour et on porte l'eau chaude à la main.",
          en:"A heating element in the trough, and the water stays liquid and lukewarm at −30 °C. It is not a luxury: it is the one piece of winter kit that genuinely saves horses. Where there is none, you break the ice twice a day and carry warm water by hand.",
          es:"Una resistencia en el pilón, y el agua se mantiene líquida y templada a −30 °C. No es un lujo: es el único material de invierno que de verdad salva caballos. Donde no lo hay, se rompe el hielo dos veces al día y se acarrea agua caliente a mano.",
          it:"Una resistenza nella vasca, e l'acqua resta liquida e tiepida a −30 °C. Non è un lusso: è l'unica attrezzatura invernale che salvi davvero i cavalli. Dove non c'è, si rompe il ghiaccio due volte al giorno e si porta l'acqua calda a mano.",
          de:"Ein Heizstab im Becken, und das Wasser bleibt bei −30 °C flüssig und lauwarm. Kein Luxus: das einzige Winterzubehör, das wirklich Pferde rettet. Wo es keines gibt, bricht man zweimal täglich das Eis und schleppt warmes Wasser.",
          ja:"水槽に発熱体を入れておけば、マイナス30度でも水は凍らず、ぬるいまま保たれる。贅沢品ではない。冬の設備のなかで、本当に馬の命を救う唯一のものだ。これがない場所では、一日二回氷を割り、湯を手で運ぶ。" } },

  { ref:"deshydratation", lecon:1, coll:"froid",
    mots:{ fr:{m:"la déshydratation"}, en:{m:"dehydration", p:"di-haï-dré-cheune"},
           es:{m:"la deshidratación"}, it:{m:"la disidratazione"},
           de:{m:"die Dehydrierung", p:"dé-hu-dri-roung"},
           ja:{m:"脱水", p:"dassui"} },
    def:{ fr:"Le vrai danger de l'hiver, et personne ne s'y attend : un cheval ne boit presque pas quand l'eau est glacée, et le foin sec de l'hiver ne contient pas une goutte d'eau — là où l'herbe d'été en est gorgée. C'est ainsi que naissent les coliques de janvier. On ne surveille pas le froid, on surveille les abreuvoirs.",
          en:"Winter's real danger, and nobody expects it: a horse barely drinks when the water is icy, and winter's dry hay holds not a drop — where summer grass is soaked in it. That is how January colics are born. You do not watch the cold, you watch the water.",
          es:"El verdadero peligro del invierno, y nadie lo espera: un caballo apenas bebe cuando el agua está helada, y el heno seco del invierno no contiene una gota — mientras que la hierba del verano está empapada. Así nacen los cólicos de enero. No se vigila el frío, se vigilan los bebederos.",
          it:"Il vero pericolo dell'inverno, e nessuno se l'aspetta: un cavallo bere quasi nulla quando l'acqua è ghiacciata, e il fieno secco dell'inverno non contiene una goccia — mentre l'erba d'estate ne è imbevuta. Così nascono le coliche di gennaio. Non si sorveglia il freddo, si sorvegliano gli abbeveratoi.",
          de:"Die wahre Gefahr des Winters, und niemand rechnet mit ihr: ein Pferd trinkt kaum, wenn das Wasser eisig ist, und das trockene Winterheu enthält keinen Tropfen — anders als das Sommergras. So entstehen die Koliken im Januar. Man beobachtet nicht die Kälte, man beobachtet die Tränken.",
          ja:"冬の本当の危険であり、誰も予想しない。水が氷のように冷たければ馬はほとんど飲まず、冬の乾いた干し草には水分が一滴も含まれていない。夏の草はたっぷり含んでいるのに。こうして一月の腹痛が生まれる。見張るべきは寒さではなく、水である。" } },

  { ref:"boire", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"faire boire"}, en:{m:"to water a horse", p:"tou oua-teur"},
           es:{m:"dar de beber"}, it:{m:"far bere"},
           de:{m:"tränken", p:"trèn-keune"}, ja:{m:"水を飲ませる", p:"mizu o nomaseru"} },
    def:{ fr:"Le geste de l'hiver : porter l'eau, la tiédir, attendre devant le seau que le cheval ait fini. Un cheval boit deux fois plus d'eau tiède que d'eau glacée — et une poignée de sel dans la ration lui donne soif, ce qui vaut mieux que de le supplier.",
          en:"The winter chore: carrying the water, warming it, standing by the bucket until he has finished. A horse drinks twice as much lukewarm water as icy water — and a handful of salt in his feed makes him thirsty, which works better than pleading with him.",
          es:"El gesto del invierno: acarrear el agua, templarla, esperar junto al cubo a que termine. Un caballo bebe el doble de agua templada que de agua helada — y un puñado de sal en la ración le da sed, lo que funciona mejor que suplicarle.",
          it:"Il gesto dell'inverno: portare l'acqua, intiepidirla, restare accanto al secchio finché ha finito. Un cavallo bere il doppio di acqua tiepida rispetto a quella ghiacciata — e una manciata di sale nella razione gli dà sete, cosa che funziona meglio del pregarlo.",
          de:"Der Wintergriff: das Wasser tragen, es lauwarm machen, am Eimer warten, bis das Pferd fertig ist. Ein Pferd trinkt von lauwarmem Wasser doppelt so viel wie von eisigem — und eine Handvoll Salz im Futter macht Durst, was besser wirkt als jedes Bitten.",
          ja:"冬の仕事。水を運び、ぬるくし、飲み終わるまでバケツのそばで待つ。馬は氷水よりぬるい水を二倍飲む。飼料に塩をひとつかみ入れれば渇きが出る。頼み込むよりずっと効く。" } },

  /* ---------- ce que l'hiver rend possible ---------- */

  { ref:"hiverner", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"hiverner"}, en:{m:"to overwinter", p:"tou o-veur-ouin-teur"},
           es:{m:"invernar"}, it:{m:"svernare"},
           de:{m:"überwintern", p:"u-beur-vin-teurn"}, ja:{m:"冬を越す", p:"fuyu o kosu"} },
    def:{ fr:"Passer l'hiver au pré, en troupeau, au repos, sans couverture et sans travail. Beaucoup de chevaux de sport reviennent transformés de ces mois-là : les tendons se refont, la tête se repose, le dos se remuscle en marchant. C'est un choix de gestion, pas un abandon.",
          en:"Spending the winter out in a herd, at rest, unrugged and unridden. Many sport horses come back transformed by those months: tendons repair, the mind settles, the back rebuilds itself by walking. It is a management choice, not neglect.",
          es:"Pasar el invierno en el prado, en grupo, descansando, sin manta y sin trabajo. Muchos caballos de deporte vuelven transformados de esos meses: los tendones se rehacen, la cabeza descansa, el dorso se musculariza andando. Es una decisión de manejo, no un abandono.",
          it:"Passare l'inverno al prato, in gruppo, a riposo, senza coperta e senza lavoro. Molti cavalli sportivi tornano trasformati da quei mesi: i tendini si rifanno, la testa si riposa, il dorso si rimuscola camminando. È una scelta di gestione, non un abbandono.",
          de:"Den Winter auf der Weide verbringen, in der Herde, in Ruhe, ohne Decke und ohne Arbeit. Viele Sportpferde kehren verwandelt zurück: Sehnen heilen, der Kopf wird ruhig, der Rücken baut sich im Gehen wieder auf. Eine Entscheidung des Managements, kein Vernachlässigen.",
          ja:"放牧地で、群れの中で、馬着も運動もなしに休みながら冬を過ごすこと。多くのスポーツホースがその数ヶ月で見違えるように戻ってくる。腱は修復され、気持ちは落ち着き、背は歩くことで作り直される。放置ではなく、管理の選択である。" } },

  { ref:"degel", lecon:1, coll:"froid",
    mots:{ fr:{m:"le dégel"}, en:{m:"the thaw", p:"thô"},
           es:{m:"el deshielo"}, it:{m:"il disgelo"},
           de:{m:"das Tauwetter", p:"tao-vè-teur"}, ja:{m:"雪解け", p:"yukidoke"} },
    def:{ fr:"La fin de l'hiver, et sa saison la plus boueuse : le sol dégèle par le haut et l'eau ne s'en va pas, parce qu'il reste gelé dessous. Les pieds trempent, la peau des paturons s'irrite, et l'on attend une semaine avant de retravailler. Le dégel casse plus de saisons que le froid.",
          en:"The end of winter, and its muddiest season: the ground thaws from the top and the water cannot drain, because it is still frozen underneath. Feet stand wet, the skin of the heels gets sore, and you wait a week before working again. The thaw ruins more seasons than the frost.",
          es:"El final del invierno, y su época más embarrada: el suelo se deshiela por arriba y el agua no se va, porque sigue helado debajo. Los cascos se empapan, la piel de los menudillos se irrita, y se espera una semana antes de volver a trabajar. El deshielo rompe más temporadas que el frío.",
          it:"La fine dell'inverno, e la sua stagione più fangosa: il terreno si scongela dall'alto e l'acqua non se ne va, perché sotto è ancora gelato. I piedi restano bagnati, la pelle dei pastorali si irrita, e si aspetta una settimana prima di riprendere. Il disgelo rovina più stagioni del gelo.",
          de:"Das Ende des Winters und seine schlammigste Zeit: der Boden taut von oben, und das Wasser kann nicht ab, weil es darunter noch gefroren ist. Die Hufe stehen nass, die Haut der Ballen wird wund, und man wartet eine Woche, bevor man wieder arbeitet. Das Tauwetter kostet mehr Saisons als der Frost.",
          ja:"冬の終わり、そして最も泥深い季節。地面は表面から解けるが、下はまだ凍っているため水が抜けない。蹄は濡れたままになり、球節の皮膚は荒れ、運動再開まで一週間待つ。凍結よりも雪解けのほうが、多くのシーズンを壊す。" } },

  { ref:"chinook", lecon:1, coll:"froid",
    mots:{ fr:{m:"le chinook"}, en:{m:"the chinook", p:"chi-nouk"},
           es:{m:"el chinook"}, it:{m:"il chinook"},
           de:{m:"der Chinook", p:"tchi-nouk"}, ja:{m:"チヌーク", p:"chinūku"} },
    def:{ fr:"Le vent chaud des Rocheuses qui fait fondre la neige en une nuit : il peut faire monter la température de vingt degrés avant le petit déjeuner. Ici, l'hiver s'interrompt en plein janvier — puis il revient. Ce sont ces allers-retours, et non le froid, qui font tousser les chevaux de l'Alberta.",
          en:"The warm wind off the Rockies that melts the snow in one night: it can lift the temperature twenty degrees before breakfast. Here winter pauses in the middle of January — then comes back. It is that going and coming, not the cold itself, that makes Alberta horses cough.",
          es:"El viento cálido de las Rocosas que funde la nieve en una noche: puede subir la temperatura veinte grados antes del desayuno. Aquí el invierno se interrumpe en pleno enero — y luego vuelve. Son esos vaivenes, y no el frío, los que hacen toser a los caballos de Alberta.",
          it:"Il vento caldo delle Montagne Rocciose che scioglie la neve in una notte: può alzare la temperatura di venti gradi prima di colazione. Qui l'inverno si interrompe in pieno gennaio — poi torna. Sono questi andirivieni, non il freddo, a far tossire i cavalli dell'Alberta.",
          de:"Der warme Wind aus den Rockies, der den Schnee in einer Nacht schmilzt: er kann die Temperatur vor dem Frühstück um zwanzig Grad heben. Hier setzt der Winter mitten im Januar aus — und kommt dann zurück. Dieses Hin und Her, nicht die Kälte, lässt die Pferde Albertas husten.",
          ja:"ロッキー山脈から吹き下ろす暖かい風。一晩で雪を解かし、朝食前に気温を二十度上げることもある。ここでは真冬の一月に冬が中断し、そして戻ってくる。アルバータの馬に咳をさせるのは寒さではなく、この行き来である。" } }

  ],

  /* Phrases : règle des 7 mots en français. FORMAT À PLAT — voir l'en-tête.
     Les deux premières sont celles demandées par Blandine le 10/08 :
     « on aurait aimé avoir une phrase genre remets-lui sa couverture ». */
  phrases: [

  { lecon:1, fr:"Remets-lui sa couverture.",
             en:"Put his rug back on.",
             es:"Vuélvele a poner la manta.",
             it:"Rimettigli la coperta.",
             de:"Leg ihm die Decke wieder auf.",
             ja:"馬着をもう一度掛けてあげて。" },

  { lecon:1, fr:"L'abreuvoir est gelé, il faut casser la glace.",
             en:"The trough is frozen, you must break the ice.",
             es:"El bebedero está helado, hay que romper el hielo.",
             it:"L'abbeveratoio è gelato, bisogna rompere il ghiaccio.",
             de:"Die Tränke ist gefroren, das Eis muss gebrochen werden.",
             ja:"水槽が凍っている。氷を割らなければならない。" },

  { lecon:1, fr:"Le sol est gelé, on marche au pas.",
             en:"The ground is frozen, we walk only.",
             es:"El suelo está helado, se va al paso.",
             it:"Il terreno è gelato, si va al passo.",
             de:"Der Boden ist gefroren, wir gehen nur Schritt.",
             ja:"地面が凍っている。常歩だけにする。" },

  { lecon:1, fr:"On ne tond que si l'on couvre.",
             en:"You only clip if you rug.",
             es:"Solo se esquila si se pone manta.",
             it:"Si tosa solo se si copre.",
             de:"Geschoren wird nur, wer eingedeckt wird.",
             ja:"馬着を着せるときだけ刈る。" },

  { lecon:1, fr:"Mets-lui le couvre-reins, il attend.",
             en:"Put the quarter sheet on, he is standing.",
             es:"Ponle el cubre-riñones, está esperando.",
             it:"Mettigli il copri-reni, sta aspettando.",
             de:"Leg ihm die Nierendecke auf, es steht.",
             ja:"腰当てを掛けて。待たせているから。" },

  { lecon:1, fr:"L'eau tiède, il en boit deux fois plus.",
             en:"Lukewarm water, he drinks twice as much.",
             es:"Agua templada, bebe el doble.",
             it:"Acqua tiepida, ne bere il doppio.",
             de:"Lauwarmes Wasser, es trinkt doppelt so viel.",
             ja:"ぬるい水なら、二倍飲む。" }

  ]
};
