/* hype-lingo-lex-froid.js — Hype Linguae · Spruce Meadows · « Le froid »
   ==================================================================
   10 CONCEPTS, UNE LEÇON.

   POURQUOI CE CHAPITRE. Spruce Meadows (Alberta) est un lieu de SAUT
   D'OBSTACLES, mais l'obstacle était déjà pris quatre fois. Le froid est
   l'angle qui apporte des mots neufs : le module n'avait pas un seul mot
   d'hiver. Et il parle du froid de l'ÉCURIE, pas d'un concours sous la
   neige — la saison de concours, là-bas, est l'été.

   ⚠️ VÉRIFIÉ AVANT ÉCRITURE : aucun `ref` d'ici n'existe dans les 20
   autres lexiques disponibles ce jour (le piège des faux rappels).
   En particulier : `couverture` appartient à lex-ecurie.js — c'est
   pourquoi le geste d'ici est le verbe `couvrir`, ref distinct ; `tondre`
   et `mue` appartiennent à lex-pansage.js — c'est pourquoi le poil
   d'hiver vit ici sous `poilhiver`, notion distincte de la mue.

   ⚠️ CE CHAPITRE NE CITE AUCUNE PERSONNE ET AUCUN ORGANISME PRIVÉ
   (décision de Blandine du 8 août 2026, valable pour tout le module).

   ÉCRIT LE 9 AOÛT 2026 : le fichier n'avait JAMAIS existé (vérifié dans
   l'historique GitHub — « No commits history »). Sa conception du 6 août
   n'avait vécu que dans les commentaires de lingo.html. Numéro de
   chapitre : 16, l'un des deux trous libres entre l'endurance (14) et
   la tradition (17) — à ajuster si le SUIVI en décide autrement.

   CHAMPS  m · p (EN/DE/JA) · coll · def · v (verbe)

   ⚠️ RELECTURE NATIVE RECOMMANDÉE. Le `chinook` est le mot local qui
   fait tout le sel du chapitre (comme « the mob » à Tamworth) : vérifier
   qu'il parle bien aux cavaliers d'ailleurs, sinon le glisser en def.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.froid = {
  ref: "froid",
  chapitre: 16,
  titre: { fr:"Le froid", en:"The cold", es:"El frío",
           it:"Il freddo", de:"Die Kälte", ja:"寒さ" },
  lecons: 1,

  concepts: [

  { ref:"hiver", lecon:1, coll:"froid",
    mots:{ fr:{m:"l'hiver"}, en:{m:"the winter", p:"ouin-teur"},
           es:{m:"el invierno"}, it:{m:"l'inverno"},
           de:{m:"der Winter", p:"vin-teur"}, ja:{m:"冬", p:"fuyu"} },
    def:{ fr:"La saison où l'écurie vit au ralenti et où les chevaux, eux, se portent souvent le mieux.",
          en:"The season when the yard slows down — and when the horses themselves are often at their best.",
          es:"La estación en que la cuadra va despacio y en la que los caballos, a menudo, están mejor que nunca.",
          it:"La stagione in cui la scuderia rallenta e in cui i cavalli, spesso, stanno meglio che mai.",
          de:"Die Jahreszeit, in der der Stall langsamer lebt — und in der es den Pferden oft am besten geht.",
          ja:"厩舎がゆっくりと動く季節。そして馬たちは、しばしば一年で最も調子がいい。" } },

  { ref:"neige", lecon:1, coll:"froid",
    mots:{ fr:{m:"la neige"}, en:{m:"the snow", p:"snô"},
           es:{m:"la nieve"}, it:{m:"la neve"},
           de:{m:"der Schnee", p:"chné"}, ja:{m:"雪", p:"yuki"} },
    def:{ fr:"Elle porte mieux qu'on ne croit : sèche et froide, elle ne glisse presque pas sous les sabots.",
          en:"It carries better than you would think: dry and cold, it barely slips under the hooves.",
          es:"Sostiene mejor de lo que se cree: seca y fría, apenas resbala bajo los cascos.",
          it:"Regge meglio di quanto si creda: asciutta e fredda, quasi non scivola sotto gli zoccoli.",
          de:"Er trägt besser, als man denkt: trocken und kalt rutscht er unter den Hufen kaum.",
          ja:"思うより滑らない。乾いた冷たい雪は、蹄の下でほとんど崩れない。" } },

  { ref:"gel", lecon:1, coll:"froid",
    mots:{ fr:{m:"le gel"}, en:{m:"the frost", p:"frost"},
           es:{m:"la helada"}, it:{m:"il gelo"},
           de:{m:"der Frost", p:"frost"}, ja:{m:"凍結", p:"tōketsu"} },
    def:{ fr:"Le vrai patron de l'hiver : c'est lui qui décide si le sol se travaille ou se regarde.",
          en:"The true master of winter: it decides whether the ground can be worked or only looked at.",
          es:"El verdadero jefe del invierno: decide si el suelo se trabaja o solo se mira.",
          it:"Il vero padrone dell'inverno: decide se il terreno si lavora o si guarda soltanto.",
          de:"Der wahre Herr des Winters: er entscheidet, ob der Boden bearbeitet oder nur betrachtet wird.",
          ja:"冬の本当の主。地面で運動できるか、眺めるだけかを決めるのは凍結だ。" } },

  { ref:"glace", lecon:1, coll:"froid",
    mots:{ fr:{m:"la glace"}, en:{m:"the ice", p:"aïss"},
           es:{m:"el hielo"}, it:{m:"il ghiaccio"},
           de:{m:"das Eis", p:"aïss"}, ja:{m:"氷", p:"kōri"} },
    def:{ fr:"Le seul ennemi que l'hiver envoie à l'écurie : on la casse chaque matin sur l'eau des chevaux.",
          en:"The one enemy winter sends into the yard: you break it every morning on the horses' water.",
          es:"El único enemigo que el invierno manda a la cuadra: se rompe cada mañana sobre el agua de los caballos.",
          it:"L'unico nemico che l'inverno manda in scuderia: si rompe ogni mattina sull'acqua dei cavalli.",
          de:"Der einzige Feind, den der Winter in den Stall schickt: man bricht es jeden Morgen auf dem Wasser der Pferde.",
          ja:"冬が厩舎に送り込むただ一つの敵。毎朝、馬の飲み水に張った氷を割る。" } },

  { ref:"degel", lecon:1, coll:"froid",
    mots:{ fr:{m:"le dégel"}, en:{m:"the thaw", p:"thô"},
           es:{m:"el deshielo"}, it:{m:"il disgelo"},
           de:{m:"das Tauwetter", p:"tao-vè-teur"}, ja:{m:"雪解け", p:"yukidoke"} },
    def:{ fr:"La fin de l'hiver, et sa saison la plus boueuse : le sol dégèle par le haut et retient l'eau.",
          en:"The end of winter, and its muddiest season: the ground thaws from the top and holds the water.",
          es:"El final del invierno, y su época más embarrada: el suelo se deshiela por arriba y retiene el agua.",
          it:"La fine dell'inverno, e la sua stagione più fangosa: il terreno si scongela dall'alto e trattiene l'acqua.",
          de:"Das Ende des Winters und seine schlammigste Zeit: der Boden taut von oben und hält das Wasser.",
          ja:"冬の終わり、そして最も泥深い季節。地面は表面から解け、水を抱え込む。" } },

  { ref:"poilhiver", lecon:1, coll:"froid",
    mots:{ fr:{m:"le poil d'hiver"}, en:{m:"the winter coat", p:"ouin-teur côt"},
           es:{m:"el pelo de invierno"}, it:{m:"il pelo invernale"},
           de:{m:"das Winterfell", p:"vin-teur-fèl"}, ja:{m:"冬毛", p:"fuyuge"} },
    def:{ fr:"Le manteau que le cheval se fabrique tout seul dès que les jours raccourcissent. Il précède le froid, il ne le suit pas.",
          en:"The coat the horse grows all by himself as the days shorten. It comes before the cold, not after it.",
          es:"El abrigo que el caballo se fabrica solo en cuanto los días se acortan. Precede al frío, no lo sigue.",
          it:"Il cappotto che il cavallo si fabbrica da solo appena le giornate si accorciano. Precede il freddo, non lo segue.",
          de:"Der Mantel, den sich das Pferd selbst wachsen lässt, sobald die Tage kürzer werden. Er kommt vor der Kälte, nicht danach.",
          ja:"日が短くなると馬が自ら作り上げる毛のコート。寒さより先にやってくる。後からではない。" } },

  { ref:"chinook", lecon:1, coll:"froid",
    mots:{ fr:{m:"le chinook"}, en:{m:"the chinook", p:"chi-nouk"},
           es:{m:"el chinook"}, it:{m:"il chinook"},
           de:{m:"der Chinook", p:"tchi-nouk"}, ja:{m:"チヌーク", p:"chinūku"} },
    def:{ fr:"Le vent chaud des Rocheuses qui fait fondre la neige en une nuit. Ici, l'hiver peut s'interrompre en plein janvier.",
          en:"The warm wind off the Rockies that melts the snow in one night. Here, winter can pause in the middle of January.",
          es:"El viento cálido de las Rocosas que funde la nieve en una noche. Aquí el invierno puede detenerse en pleno enero.",
          it:"Il vento caldo delle Montagne Rocciose che scioglie la neve in una notte. Qui l'inverno può fermarsi in pieno gennaio.",
          de:"Der warme Wind aus den Rockies, der den Schnee in einer Nacht schmilzt. Hier kann der Winter mitten im Januar aussetzen.",
          ja:"ロッキー山脈から吹き下ろす暖かい風。一晩で雪を解かす。ここでは真冬の一月に、冬が中断することがある。" } },

  { ref:"buee", lecon:1, coll:"froid",
    mots:{ fr:{m:"la buée"}, en:{m:"the steam", p:"stiim"},
           es:{m:"el vaho"}, it:{m:"il vapore"},
           de:{m:"der Atemdampf", p:"a-teum-dampf"}, ja:{m:"白い息", p:"shiroi iki"} },
    def:{ fr:"Le souffle des chevaux rendu visible par le froid. La plus belle chose d'une écurie en hiver, et la plus banale.",
          en:"The horses' breath made visible by the cold. The most beautiful thing in a winter yard, and the most ordinary.",
          es:"El aliento de los caballos hecho visible por el frío. Lo más bello de una cuadra en invierno, y lo más corriente.",
          it:"Il fiato dei cavalli reso visibile dal freddo. La cosa più bella di una scuderia d'inverno, e la più comune.",
          de:"Der Atem der Pferde, sichtbar gemacht von der Kälte. Das Schönste an einem Stall im Winter — und das Alltäglichste.",
          ja:"寒さが見えるようにした馬の呼吸。冬の厩舎で最も美しく、最もありふれたもの。" } },

  { ref:"couvrir", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"couvrir"}, en:{m:"to rug up", p:"tou reug eup"},
           es:{m:"poner la manta"}, it:{m:"mettere la coperta"},
           de:{m:"eindecken", p:"aïn-dè-keune"}, ja:{m:"馬着を着せる", p:"bachaku o kiseru"} },
    def:{ fr:"Mettre la couverture — ou choisir de ne pas la mettre : un cheval en poil d'hiver, dehors, s'en passe souvent très bien.",
          en:"Putting the rug on — or choosing not to: a horse in his winter coat, living out, often does very well without one.",
          es:"Poner la manta — o decidir no ponerla: un caballo con pelo de invierno, fuera, suele pasar muy bien sin ella.",
          it:"Mettere la coperta — o scegliere di non metterla: un cavallo col pelo invernale, fuori, spesso ne fa benissimo a meno.",
          de:"Die Decke auflegen — oder bewusst darauf verzichten: ein Pferd im Winterfell, draußen, kommt oft sehr gut ohne aus.",
          ja:"馬着を着せること。あるいは着せない選択をすること。冬毛の馬は屋外でも、馬着なしで元気に過ごすことが多い。" } },

  { ref:"hiverner", lecon:1, coll:"froid", v:true,
    mots:{ fr:{m:"hiverner"}, en:{m:"to overwinter", p:"tou o-veur-ouin-teur"},
           es:{m:"invernar"}, it:{m:"svernare"},
           de:{m:"überwintern", p:"u-beur-vin-teurn"}, ja:{m:"冬を越す", p:"fuyu o kosu"} },
    def:{ fr:"Passer l'hiver au pré, en troupeau, au repos. Beaucoup de chevaux de sport reviennent transformés de ces mois-là.",
          en:"Spending the winter in the field, in a herd, at rest. Many sport horses come back transformed by those months.",
          es:"Pasar el invierno en el prado, en grupo, descansando. Muchos caballos de deporte vuelven transformados de esos meses.",
          it:"Passare l'inverno al prato, in gruppo, a riposo. Molti cavalli sportivi tornano trasformati da quei mesi.",
          de:"Den Winter auf der Weide verbringen, in der Herde, in Ruhe. Viele Sportpferde kehren verwandelt aus diesen Monaten zurück.",
          ja:"放牧地で、群れの中で、休みながら冬を過ごすこと。多くのスポーツホースが、その数ヶ月で見違えるように戻ってくる。" } }

  ],

  /* Phrases : règle des 7 mots en français. */
  phrases: [

  { lecon:1, p:{ fr:"Chaque matin, on casse la glace.",
                 en:"Every morning, you break the ice.",
                 es:"Cada mañana se rompe el hielo.",
                 it:"Ogni mattina si rompe il ghiaccio.",
                 de:"Jeden Morgen bricht man das Eis.",
                 ja:"毎朝、氷を割る。" } },

  { lecon:1, p:{ fr:"Le poil d'hiver précède le froid.",
                 en:"The winter coat comes before the cold.",
                 es:"El pelo de invierno precede al frío.",
                 it:"Il pelo invernale precede il freddo.",
                 de:"Das Winterfell kommt vor der Kälte.",
                 ja:"冬毛は寒さより先に来る。" } },

  { lecon:1, p:{ fr:"Cette nuit, le chinook a tout fondu.",
                 en:"Overnight, the chinook melted everything.",
                 es:"Esta noche, el chinook lo fundió todo.",
                 it:"Stanotte il chinook ha sciolto tutto.",
                 de:"Über Nacht hat der Chinook alles geschmolzen.",
                 ja:"昨夜、チヌークがすべてを解かした。" } }

  ]
};
