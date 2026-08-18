/* hype-lingo-lex-parade.js — Hype Linguae · Séville · « La parade équestre »
   ==================================================================
   18 CONCEPTS, UNE LEÇON. Ville : SÉVILLE.

   🟥 POURQUOI CE FICHIER EXISTE — 17 août 2026, session 214.
   Séville pointait sur `hype-lingo-lex-materiel.js`, leçon 3 — la tenue
   du cavalier : bombe, gilet airbag, culotte, éperons. Vejer a reçu
   cette leçon le même jour, et Séville s'est retrouvée branchée à titre
   provisoire sur la leçon 2 (le filet, le mors, la bride), qui ne dit
   rien de son chapitre.
   🟥 OR SÉVILLE, C'EST LA FERIA DE ABRIL : la parade, le costume, les
   tresses, l'amazone, l'attelage. Une amazone en traje corto ne porte ni
   bombe ni gilet airbag. Le chapitre s'appelle « La présentation » et
   n'avait aucun vocabulaire de présentation.
   ⚠️ `ETAPE_SRC` a été modifié : `seville: [["parade",1]]`. Et la leçon 2
   de `materiel` retourne dormir avec les autres orphelines.

   🟥 LES TROIS NOTIONS DU CHAPITRE, posées par Blandine :

   1. **SIDE-SADDLE** — le même mot dit la monte ET la selle :
      *she rides side-saddle* = elle monte en amazone ;
      *this is a side-saddle* = c'est une selle d'amazone.
      ⚠️ L'anglais décrit LA SELLE, le français décrit LA CAVALIÈRE
      (« amazone » vient des guerrières de la mythologie). Deux façons de
      nommer la même chose.

   2. **TURNED OUT** — intraduisible en un mot, et central ici :
      *the horse is beautifully turned out* = le cheval est superbement
      présenté. Cela englobe TOUT : cheval propre, crinière tressée,
      matériel impeccable, tenue soignée. Le français dit « présenté »,
      qui est plus faible.

   3. **LES ATTELAGES SE COMPTENT EN ANGLAIS D'UNE FAÇON PARTICULIÈRE :**
        single        = un cheval
        pair          = deux côte à côte
        tandem        = deux l'un derrière l'autre
        four-in-hand  = quatre
      ⚠️ **FOUR-IN-HAND** compte les chevaux par LA MAIN DU MENEUR : les
      quatre paires de guides tenues dans une seule main. C'est le plus
      beau mot du chapitre, et il ne se devine pas.

   ⚠️ TROIS MOTS RESTENT EN ESPAGNOL DANS TOUTES LES LANGUES, y compris
   en anglais : **el paseo**, **el traje corto**, **la caseta**. Ce ne
   sont pas des anglicismes paresseux : ces choses n'existent qu'à
   Séville, et on les nomme donc en espagnol partout dans le monde.
   NE PAS les traduire.

   ⚠️ RELECTURE NATIVE RECOMMANDÉE, surtout sur l'italien et l'allemand
   du vocabulaire d'attelage, qui est technique et régional. Les entrées
   marquées // ?? sont celles dont je suis le moins sûr.

   ⚠️ AUCUN CENTRE ÉQUESTRE PRIVÉ N'EST CITÉ — décision du 8 août 2026.
   La Feria est une fête publique, ce qui autorise la mention.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.parade = {
  ref: "parade",
  chapitre: 25,
  titre: { fr:"La parade équestre", en:"The horse parade", es:"El paseo de caballos",
           it:"La parata equestre", de:"Die Reiterparade", ja:"馬の行列" },
  lecons: 1,

  concepts: [

  { ref:"parade", lecon:1, coll:"parade",
    mots:{ fr:{m:"la parade équestre"}, en:{m:"the horse parade", p:"pa-réïde", var:"the equestrian parade"},
           es:{m:"el paseo de caballos"}, it:{m:"la parata equestre"},
           de:{m:"die Reiterparade", p:"raï-teur-pa-ra-de"}, ja:{m:"馬の行列", p:"uma no gyōretsu"} },
    def:{ fr:"⚠️ CE N'EST PAS UN CONCOURS : personne ne gagne. On défile, on se montre, on salue — et la seule chose jugée est le regard des autres. C'est le contraire de tout le reste du voyage, où l'on est classé.",
          en:"It isn't a competition: nobody wins. You ride out, you're seen, you greet people — and the only judgement is other people's eyes. The opposite of everywhere else in the journey.",
          es:"No es un concurso: nadie gana. Se desfila, se muestra, se saluda, y lo único que juzga es la mirada de los demás.",
          it:"Non è una gara: nessuno vince. Si sfila, ci si mostra, si saluta, e l'unico giudizio è lo sguardo degli altri.",
          de:"Kein Wettbewerb: niemand gewinnt. Man reitet aus, wird gesehen, grüßt — beurteilt wird nur vom Blick der anderen.",
          ja:"競技ではありません。誰も勝ちません。列を進み、人に見られ、挨拶を交わす。評価するのは他人の目だけです。旅のほかのすべてと正反対です。" } },

  { ref:"paseo", lecon:1, coll:"parade",
    mots:{ fr:{m:"le paseo"}, en:{m:"the paseo", p:"pa-sé-ô"},
           es:{m:"el paseo"}, it:{m:"il paseo"},
           de:{m:"der Paseo"}, ja:{m:"パセオ", p:"paseo"} },
    def:{ fr:"🟥 LE MOT RESTE EN ESPAGNOL DANS TOUTES LES LANGUES, parce que la chose n'existe qu'ici : la promenade à cheval dans les rues du Real, tous les jours de la Feria, du matin jusqu'au début de l'après-midi. Après, les rues appartiennent aux piétons. ⚠️ *Paseo* veut simplement dire « promenade » en espagnol courant — c'est le contexte qui en fait un événement.",
          en:"The word stays Spanish in every language, because the thing exists only here: riding through the streets of the fairground, every day of the Feria, from morning until early afternoon. After that the streets belong to those on foot.",
          es:"La palabra significa simplemente « paseo », pero en Sevilla designa el recorrido a caballo por las calles del Real, cada día de la Feria hasta primera hora de la tarde.",
          it:"La parola resta spagnola in tutte le lingue, perché la cosa esiste solo qui: la passeggiata a cavallo per le vie del Real, ogni giorno della Feria.",
          de:"Das Wort bleibt in allen Sprachen spanisch, weil es die Sache nur hier gibt: der Ausritt durch die Gassen des Festplatzes, an jedem Tag der Feria.",
          ja:"どの言語でもスペイン語のまま使われます。この行事がここにしかないからです。フェリアの期間中、毎朝から昼過ぎまで、会場の通りを馬で流すこと。午後は歩行者に道を譲ります。" } },

  { ref:"bien-presente", lecon:1, coll:"parade",
    mots:{ fr:{m:"être bien présenté"}, en:{m:"to be well turned out", p:"teurnd aoute"},
           es:{m:"estar bien presentado"}, it:{m:"essere ben presentato"},
           de:{m:"gut herausgebracht sein", p:"hè-raouss-gue-brakt"}, ja:{m:"手入れが行き届いている", p:"teire ga ikitodoite iru"} },
    def:{ fr:"🟥 **TURNED OUT** EST INTRADUISIBLE EN UN MOT, et c'est la notion centrale du chapitre. *The horse is beautifully turned out* englobe TOUT à la fois : le cheval lavé, la crinière tressée, les sabots graissés, le cuir noir, la tenue impeccable. Le français dit « bien présenté », qui est plus faible et ne dit que le résultat. ⚠️ On l'emploie aussi des personnes : *she was beautifully turned out*.",
          en:"« Turned out » can't be said in one French word, and it's the heart of this chapter. It covers everything at once: the horse washed, mane braided, hooves oiled, leather black, clothes immaculate. Also used of people.",
          es:"« Turned out » no se dice en una sola palabra: engloba el caballo lavado, las crines trenzadas, los cascos engrasados, el cuero negro y la ropa impecable.",
          it:"« Turned out » non si dice con una sola parola: comprende il cavallo lavato, la criniera intrecciata, gli zoccoli oliati, il cuoio nero e l'abito impeccabile.",
          de:"« Turned out » lässt sich nicht mit einem Wort sagen: es umfasst das gewaschene Pferd, geflochtene Mähne, gefettete Hufe, schwarzes Leder und tadellose Kleidung.",
          ja:"英語の turned out は一語では訳せません。この章の中心となる概念です。洗った馬、編んだたてがみ、油を塗った蹄、黒く磨いた革、完璧な服装。そのすべてを一語で言い表します。人についても使います。" } },

  { ref:"tresser", lecon:1, coll:"presentation", v:true,
    mots:{ fr:{m:"tresser"}, en:{m:"to braid", p:"bréïde", var:"to plait (UK)"},
           es:{m:"trenzar"}, it:{m:"intrecciare"},
           de:{m:"einflechten", p:"aïn-flèch-teune"}, ja:{m:"編む", p:"amu"} },
    def:{ fr:"⚠️ DEUX MOTS SELON LE PAYS : les Américains disent **to braid**, les Britanniques **to plait** — prononcé « platte », ce qui surprend toujours. Les deux sont justes. 🟥 À Séville les tresses ne ressemblent pas à celles d'un concours de dressage : plus grosses, souvent rubannées de couleur, parfois avec des fleurs — on décore, on ne discipline pas.",
          en:"Two words: Americans say « to braid », the British « to plait », pronounced « platt », which always surprises. At Seville the braids look nothing like dressage plaits: bigger, often ribboned, sometimes flowered — they decorate rather than tidy.",
          es:"Dos palabras en inglés según el país. En Sevilla las trenzas no se parecen a las de doma: más gruesas, con cintas de color y a veces flores.",
          it:"Due parole in inglese secondo il paese. A Siviglia le trecce non somigliano a quelle del dressage: più grosse, con nastri colorati, a volte fiori.",
          de:"Zwei Wörter im Englischen. In Sevilla sehen die Zöpfe anders aus als beim Dressurturnier: dicker, oft mit Bändern, manchmal mit Blumen.",
          ja:"英語では国によって二語あります。アメリカは to braid、イギリスは to plait で「プラット」と読みます。セビリアの編み方は馬場馬術とは違い、太く、色のリボンや花を編み込むこともあります。整えるためではなく飾るためです。" } },

  { ref:"criniere", lecon:1, coll:"presentation",
    mots:{ fr:{m:"la crinière"}, en:{m:"the mane", p:"méïn"},
           es:{m:"las crines"}, it:{m:"la criniera"},
           de:{m:"die Mähne", p:"mè-ne"}, ja:{m:"たてがみ", p:"tategami"} },
    def:{ fr:"⚠️ L'ESPAGNOL DIT **LAS CRINES** AU PLURIEL, là où toutes les autres langues sont au singulier — on compte les crins, pas la crinière. 🟥 Une crinière andalouse ne se coupe jamais : elle est longue, épaisse, et c'est elle qu'on tresse ou qu'on laisse flotter. Couper la crinière d'un PRE serait une faute de goût.",
          en:"Spanish says « las crines », plural, where every other language is singular. An Andalusian mane is never cut: it's long, thick, and it's what you braid or let flow. Cutting a PRE's mane would be bad taste.",
          es:"« Las crines » va en plural en español, al contrario que en las demás lenguas. Una crin andaluza no se corta nunca: es larga y espesa.",
          it:"Lo spagnolo dice « las crines » al plurale. Una criniera andalusa non si taglia mai: è lunga, spessa, ed è quella che si intreccia.",
          de:"Spanisch sagt « las crines » im Plural. Eine andalusische Mähne wird nie geschnitten: sie ist lang, dicht, und wird geflochten oder fließen gelassen.",
          ja:"スペイン語だけ las crines と複数形で言います。アンダルシア馬のたてがみは決して刈りません。長く豊かで、それを編むか、そのまま流します。PRE のたてがみを刈るのは無作法とされます。" } },

  { ref:"traje-corto", lecon:1, coll:"tenue-parade",
    mots:{ fr:{m:"le traje corto"}, en:{m:"the traje corto", p:"tra-ré kor-tô", var:"Andalusian riding dress"},
           es:{m:"el traje corto"}, it:{m:"il traje corto"},
           de:{m:"der Traje corto"}, ja:{m:"トラヘ・コルト", p:"toraje koruto"} },
    def:{ fr:"🟥 LE MOT RESTE EN ESPAGNOL PARTOUT. « Costume court » : veste ajustée, pantalon à sous-pied, chemise blanche, bottines, et le chapeau à large bord — *el sombrero de ala ancha*. ⚠️ CE N'ÉTAIT PAS UN COSTUME DE FÊTE : c'était la tenue de travail des cavaliers andalous, celle du campo, devenue habit de parade quand le travail a changé. La veste est courte pour ne pas gêner à cheval.",
          en:"The word stays Spanish everywhere. « Short suit »: a fitted jacket, strapped trousers, white shirt, ankle boots and the wide-brimmed hat. It wasn't a party costume: it was the Andalusian horseman's working dress, which became parade wear when the work changed. The jacket is short so it doesn't get in the way in the saddle.",
          es:"No era un traje de fiesta: era la ropa de trabajo del jinete andaluz, la del campo, que se volvió atuendo de paseo cuando el trabajo cambió. La chaqueta es corta para no molestar a caballo.",
          it:"Non era un costume di festa: era l'abito da lavoro del cavaliere andaluso, quello del campo, diventato abito da parata quando il lavoro è cambiato.",
          de:"Es war kein Festkostüm, sondern die Arbeitskleidung des andalusischen Reiters, die zur Paradekleidung wurde, als sich die Arbeit änderte. Die Jacke ist kurz, damit sie im Sattel nicht störtsss.",
          ja:"どの言語でもスペイン語のまま使います。「短い装い」の意。体に沿った短い上着、あぶみ紐付きズボン、白いシャツ、ショートブーツ、そしてつばの広い帽子。もともとは祭りの衣装ではなく、アンダルシアの牧場で働く騎手の作業着でした。上着が短いのは、鞍の上で邪魔にならないためです。" } },

  { ref:"amazone", lecon:1, coll:"tenue-parade", v:true,
    mots:{ fr:{m:"monter en amazone"}, en:{m:"to ride side-saddle", p:"saïd-sa-deul"},
           es:{m:"montar a la amazona"}, it:{m:"montare all'amazzone"},
           de:{m:"im Damensattel reiten", p:"da-meune-za-teul"}, ja:{m:"横乗りする", p:"yokonori suru"} },
    def:{ fr:"🟥 LE MÊME MOT ANGLAIS DIT LA MONTE ET LA SELLE : *she rides side-saddle* et *this is a side-saddle*. ⚠️ Et les langues ne nomment pas la même chose : l'anglais et l'allemand décrivent LA SELLE (*side-saddle*, *Damensattel*), le français et l'espagnol décrivent LA CAVALIÈRE — « amazone », des guerrières de la mythologie. Le japonais décrit LA POSITION : 横乗り, « monter de travers ». 🟥 À la Feria on monte souvent à deux : le cavalier en selle, l'amazone derrière lui, en croupe — *a la grupa*.",
          en:"One English word says both the seat and the saddle: she rides side-saddle, this is a side-saddle. And the languages name different things: English and German describe the SADDLE, French and Spanish the RIDER (« amazone », the mythological warriors), Japanese the POSITION. At the Feria you often ride two up, the woman behind the man — « a la grupa ».",
          es:"El inglés dice con una palabra la monta y la silla. En la Feria se monta a menudo de dos: el jinete en la silla y la amazona detrás, a la grupa.",
          it:"L'inglese dice con una parola sia la monta sia la sella. Alla Feria si monta spesso in due: il cavaliere in sella e l'amazzone dietro, in groppa.",
          de:"Ein englisches Wort sagt beides: die Sitzweise und den Sattel. Auf der Feria reitet man oft zu zweit, die Frau hinter dem Mann.",
          ja:"英語の side-saddle は「乗り方」と「鞍」の両方を指します。言語ごとに名づけの視点が違い、英語とドイツ語は鞍を、フランス語とスペイン語は乗る女性を、日本語は姿勢を表します。フェリアでは二人乗りも多く、男性が鞍に、女性がその後ろに乗ります。" } },

  { ref:"selle-amazone", lecon:1, coll:"tenue-parade",
    mots:{ fr:{m:"la selle d'amazone"}, en:{m:"the side-saddle", p:"saïd-sa-deul"},
           es:{m:"la silla de amazona"}, it:{m:"la sella all'amazzone"},
           de:{m:"der Damensattel", p:"da-meune-za-teul"}, ja:{m:"横乗り用の鞍", p:"yokonori-yō no kura"} },
    def:{ fr:"⚠️ ELLE N'A QU'UN ÉTRIER, et deux cornes sur lesquelles la jambe droite se pose. Bien montée, elle tient mieux qu'on ne croit : les amazones sautaient en concours jusqu'aux années trente. 🟥 Ce qui est difficile n'est pas de tenir, c'est de descendre vite.",
          en:"It has one stirrup only, and two horns the right leg rests over. Ridden well it holds better than people think: side-saddle riders jumped in competition until the nineteen-thirties. What's hard isn't staying on — it's getting off fast.",
          es:"Solo tiene un estribo y dos cuernos sobre los que descansa la pierna derecha. Bien montada sujeta más de lo que se cree.",
          it:"Ha una sola staffa e due corni su cui appoggia la gamba destra. Montata bene tiene più di quanto si crede.",
          de:"Er hat nur einen Bügel und zwei Hörner, über die das rechte Bein gelegt wird. Gut geritten hält er besser, als man denkt.",
          ja:"鐙は一つだけで、右脚を掛ける二本の角がついています。正しく乗れば思われているよりずっと安定し、一九三〇年代までは横乗りで障害競技にも出ていました。難しいのは乗り続けることではなく、素早く降りることです。" } },

  { ref:"tenue-amazone", lecon:1, coll:"tenue-parade",
    mots:{ fr:{m:"la tenue d'amazone"}, en:{m:"the riding habit", p:"raï-dinng ha-bite"},
           es:{m:"el traje de amazona"}, it:{m:"l'abito da amazzone"},
           de:{m:"das Reitkleid", p:"raït-klaïte"}, ja:{m:"横乗りの装い", p:"yokonori no soutai"} },
    def:{ fr:"⚠️ EN ANGLAIS **A HABIT**, mot qui ne veut plus dire « habitude » mais « tenue » dans ce seul emploi — un archaïsme conservé par l'équitation. La jupe est longue, coupée en biais pour tomber droit malgré la position, et elle a un poids cousu dans l'ourlet pour ne pas se soulever.",
          en:"« A habit » — a word that here means dress, not custom, an archaism riding has kept. The skirt is long, cut on the bias to hang straight despite the position, with a weight sewn into the hem so it doesn't lift.",
          es:"La falda es larga, cortada al bies para caer recta a pesar de la posición, y lleva un peso cosido en el bajo para que no se levante.",
          it:"La gonna è lunga, tagliata in sbieco per cadere dritta nonostante la posizione, con un peso cucito nell'orlo perché non si alzi.",
          de:"Der Rock ist lang, im Schrägschnitt gearbeitet, damit er trotz der Sitzhaltung gerade fällt, mit einem Gewicht im Saum.",
          ja:"英語の habit はこの用法だけ「習慣」ではなく「装い」を意味します。馬術が残した古い語です。スカートは長く、横向きの姿勢でもまっすぐ落ちるようバイアスで裁ち、裾に重りを縫い込んで浮き上がらないようにします。" } },

  { ref:"selle-espagnole", lecon:1, coll:"tenue-parade",
    mots:{ fr:{m:"la selle espagnole"}, en:{m:"the Spanish saddle", p:"spa-niche sa-deul", var:"the vaquera saddle"},
           es:{m:"la silla vaquera"}, it:{m:"la sella spagnola"},
           de:{m:"der spanische Sattel", p:"chpa-ni-che za-teul"}, ja:{m:"スペイン鞍", p:"supein kura"} },
    def:{ fr:"⚠️ L'ESPAGNOL A SON PROPRE MOT : **la silla vaquera**, la selle du vaquero — celle du travail du bétail, à siège plat, garnie d'une peau de mouton, avec des étriers larges en boîte. On la reconnaît de loin. 🟥 C'est d'elle que descend la selle western américaine, par le Mexique.",
          en:"Spanish has its own word: « la silla vaquera », the cattleman's saddle — flat-seated, sheepskin-covered, with wide boxed stirrups. The American western saddle descends from it, by way of Mexico.",
          es:"« La silla vaquera » es la del trabajo con el ganado: asiento plano, borreguillo y estribos anchos de caja. De ella desciende la silla western.",
          it:"« La silla vaquera » è quella del lavoro col bestiame: seduta piatta, pelle di pecora, staffe larghe a scatola. Da lei discende la sella western.",
          de:"« La silla vaquera » ist der Sattel der Rinderarbeit: flacher Sitz, Schaffell, breite Kastenbügel. Von ihm stammt der Westernsattel ab.",
          ja:"スペイン語には独自の語があります。silla vaquera — 牛追いの鞍で、平らな座、羊毛の敷き、箱型の広い鐙。遠くからでも見分けられます。アメリカのウエスタン鞍は、メキシコを経てこの鞍から生まれました。" } },

  { ref:"harnachement", lecon:1, coll:"tenue-parade",
    mots:{ fr:{m:"le harnachement"}, en:{m:"the tack", p:"tak", var:"the harness"},
           es:{m:"la guarnición"}, it:{m:"la bardatura"},
           de:{m:"das Zaumzeug", p:"tsaoum-tsoïk"}, ja:{m:"馬装", p:"basō"} },
    def:{ fr:"⚠️ **TACK** POUR LE CHEVAL MONTÉ, **HARNESS** POUR L'ATTELÉ : les deux mots ne sont pas interchangeables en anglais. 🟥 À Séville le harnachement est assorti à la tenue du cavalier — même cuir, mêmes couleurs, souvent les mêmes pompons de laine. C'est ce qui distingue une parade d'un simple rassemblement : rien n'est laissé au hasard.",
          en:"« Tack » for a ridden horse, « harness » for a driven one — the two aren't interchangeable. At Seville the tack matches the rider's outfit: same leather, same colours, often the same woollen tassels. Nothing is left to chance.",
          es:"En inglés « tack » para el caballo montado y « harness » para el enganchado. En Sevilla la guarnición va a juego con el traje del jinete.",
          it:"In inglese « tack » per il cavallo montato e « harness » per quello attaccato. A Siviglia la bardatura è abbinata all'abito del cavaliere.",
          de:"Englisch « tack » für das gerittene, « harness » für das angespannte Pferd. In Sevilla passt das Zaumzeug zur Kleidung des Reiters.",
          ja:"英語では騎乗馬には tack、馬車馬には harness を使い、互換ではありません。セビリアでは馬装が騎手の装いと揃えられます。同じ革、同じ色、房飾りまで合わせます。何ひとつ偶然に任せません。" } },

  { ref:"attelage", lecon:1, coll:"attelage",
    mots:{ fr:{m:"l'attelage"}, en:{m:"the driving team", p:"draï-vinng tiime", var:"the turnout"},
           es:{m:"el enganche"}, it:{m:"l'attacco"},
           de:{m:"das Gespann", p:"gue-chpann"}, ja:{m:"馬車の組", p:"basha no kumi"} },
    def:{ fr:"🟥 L'ANGLAIS COMPTE LES CHEVAUX D'UNE FAÇON QUI NE SE DEVINE PAS :\\n**single** un cheval · **pair** deux côte à côte · **tandem** deux l'un derrière l'autre · **four-in-hand** quatre.\\n⚠️ **FOUR-IN-HAND** compte par LA MAIN DU MENEUR : les quatre paires de guides tenues dans une seule main. C'est le plus beau mot du chapitre. Et *a turnout* désigne l'ensemble complet — chevaux, voiture, harnais, tenues — jugé comme un tout.",
          en:"English counts horses in a way you can't guess: single, pair, tandem, four-in-hand. « Four-in-hand » counts by the driver's hand — four pairs of reins held in one. And « a turnout » is the whole thing: horses, carriage, harness, clothes, judged together.",
          es:"El inglés cuenta los caballos de un modo particular: single, pair, tandem, four-in-hand. « Four-in-hand » cuenta por la mano del cochero.",
          it:"L'inglese conta i cavalli in modo particolare: single, pair, tandem, four-in-hand. « Four-in-hand » conta dalla mano del guidatore.",
          de:"Englisch zählt die Pferde eigen: single, pair, tandem, four-in-hand. « Four-in-hand » zählt nach der Hand des Fahrers.",
          ja:"英語の数え方は推測できません。single は一頭、pair は横並びの二頭、tandem は縦列の二頭、four-in-hand は四頭。four-in-hand は「御者の片手」で数えます。四対の手綱を一方の手に握るからです。この章で最も美しい語です。" } },

  { ref:"voiture", lecon:1, coll:"attelage",
    mots:{ fr:{m:"la voiture hippomobile"}, en:{m:"the horse-drawn carriage", p:"hors-drone ka-ridj"},
           es:{m:"el coche de caballos"}, it:{m:"la carrozza"},
           de:{m:"die Pferdekutsche", p:"pfèr-de-kout-che"}, ja:{m:"馬車", p:"basha"} },
    def:{ fr:"⚠️ EN ANGLAIS **HORSE-DRAWN**, littéralement « tirée par des chevaux » — le verbe *to draw* au sens de tirer, un emploi ancien qu'on ne rencontre plus qu'ici et dans *drawbridge*, le pont-levis. 🟥 À la Feria on en compte des centaines : les *enganches* défilent au pas, capotes baissées, et le concours d'attelage attribue des prix à la présentation.",
          en:"« Horse-drawn », literally drawn by horses — « to draw » meaning to pull, an old use you now meet only here and in « drawbridge ». At the Feria there are hundreds: the enganches parade at the walk, hoods down.",
          es:"En la Feria se cuentan por centenares: los enganches desfilan al paso, con las capotas bajadas.",
          it:"Alla Feria se ne contano centinaia: gli enganches sfilano al passo, con le capote abbassate.",
          de:"« Horse-drawn » heißt wörtlich von Pferden gezogen — eine alte Verwendung von « to draw », die man nur noch hier und in « drawbridge » findet.",
          ja:"英語の horse-drawn は「馬に引かれた」の意で、to draw を「引く」の意味で使う古い用法です。今は drawbridge（跳ね橋）くらいにしか残っていません。フェリアでは何百台もの馬車が常歩で流れます。" } },

  { ref:"meneur", lecon:1, coll:"attelage",
    mots:{ fr:{m:"le meneur"}, en:{m:"the driver", p:"draï-veur"},
           es:{m:"el cochero"}, it:{m:"il guidatore"},
           de:{m:"der Fahrer", p:"fa-reur"}, ja:{m:"御者", p:"gyosha"} },
    def:{ fr:"🟥 CE N'EST PAS UN CAVALIER, ET ON NE DIT JAMAIS **RIDER** : un meneur *drives*, il ne *rides* pas. C'est le verbe des voitures, et il s'emploie depuis bien avant l'automobile. ⚠️ L'espagnol dit *el cochero*, du coche — la voiture. Le français « mener » dit qu'on conduit de derrière, sans être dessus.",
          en:"Not a rider, and never called one: a driver drives, he doesn't ride. It's the carriage verb, and it long predates the motor car. Spanish says « el cochero », from « coche », the carriage.",
          es:"No es un jinete: « el cochero » viene de coche. En inglés se dice « driver » y el verbo es « to drive », nunca « to ride ».",
          it:"Non è un cavaliere: in inglese si dice « driver » e il verbo è « to drive », mai « to ride ».",
          de:"Kein Reiter: ein Fahrer fährt, er reitet nicht. Das Verb gehört zur Kutsche und ist viel älter als das Automobil.",
          ja:"騎手ではありません。英語でも rider とは言わず driver と呼び、動詞は drive を使います。馬車の動詞で、自動車よりずっと古い用法です。スペイン語の cochero は coche（馬車）から来ています。" } },

  { ref:"guides", lecon:1, coll:"attelage",
    mots:{ fr:{m:"les guides"}, en:{m:"the driving reins", p:"draï-vinng réïnz", var:"the lines (US)"},
           es:{m:"las riendas de enganche"}, it:{m:"le redini da attacco"},
           de:{m:"die Leinen", p:"laï-neune"}, ja:{m:"手綱（馬車用）", p:"tazuna"} },
    def:{ fr:"🟥 LE FRANÇAIS A UN MOT PROPRE — **les guides**, jamais « les rênes » : un attelage se mène aux guides, un cheval monté se conduit aux rênes. ⚠️ L'anglais dit *driving reins* ou, aux États-Unis, **the lines**. Et l'allemand n'a qu'un mot pour l'attelage : *die Leinen*, les lignes — jamais *Zügel*, qui est réservé à la monte.",
          en:"French has its own word: « les guides », never « les rênes ». English says « driving reins » or, in America, « the lines ». German uses « Leinen » for driving and keeps « Zügel » for riding.",
          es:"El francés tiene su palabra propia. El inglés dice « driving reins » o, en América, « the lines ».",
          it:"Il francese ha una parola propria. L'inglese dice « driving reins » o, in America, « the lines ».",
          de:"Deutsch sagt beim Fahren « Leinen », nie « Zügel » — das bleibt dem Reiten.",
          ja:"フランス語には専用の語 guides があり、騎乗用の rênes とは区別します。英語では driving reins、アメリカでは the lines。ドイツ語は馬車には Leinen を使い、騎乗用の Zügel とは言いません。" } },

  { ref:"meme-rythme", lecon:1, coll:"attelage",
    mots:{ fr:{m:"avancer au même rythme"}, en:{m:"to move together", p:"tou-guè-zeur"},
           es:{m:"ir al mismo ritmo"}, it:{m:"andare allo stesso ritmo"},
           de:{m:"im Gleichschritt gehen", p:"glaïch-chritt"}, ja:{m:"歩調を合わせる", p:"hochō o awaseru"} },
    def:{ fr:"⚠️ LA SEULE CHOSE QUI COMPTE DANS UN ATTELAGE : deux chevaux qui ne vont pas ensemble se gênent, tirent de travers et fatiguent double. On les apparie donc par la taille, la longueur de foulée et le tempérament — jamais par la couleur seule, même si c'est ce qu'on voit. 🟥 En allemand **im Gleichschritt**, « au même pas », qui dit exactement la chose.",
          en:"The only thing that matters in a team: two horses who don't move together get in each other's way, pull crooked and tire twice as fast. So you match them by height, stride and temperament — never by colour alone, though that's what shows.",
          es:"Lo único que cuenta en un enganche: dos caballos que no van juntos se molestan, tiran torcido y se cansan el doble. Se emparejan por altura, tranco y carácter.",
          it:"L'unica cosa che conta in un attacco: due cavalli che non vanno insieme si ostacolano, tirano di traverso e si stancano il doppio.",
          de:"Das Einzige, was beim Gespann zählt: zwei Pferde, die nicht zusammengehen, behindern sich, ziehen schief und ermüden doppelt.",
          ja:"馬車で唯一大切なこと。歩調の合わない二頭は互いを妨げ、斜めに引き、倍疲れます。だから体高、歩幅、気質で組み合わせます。見た目の毛色だけで選ぶことはありません。" } },

  { ref:"caseta", lecon:1, coll:"feria",
    mots:{ fr:{m:"la caseta"}, en:{m:"the caseta", p:"ka-sé-ta"},
           es:{m:"la caseta"}, it:{m:"la caseta"},
           de:{m:"die Caseta"}, ja:{m:"カセタ", p:"kaseta"} },
    def:{ fr:"⚠️ LE MOT RESTE EN ESPAGNOL PARTOUT. Les tentes rayées du Real, où l'on mange, boit et danse la sevillana. Il y en a plus de mille. 🟥 Ce sont elles qui expliquent l'horaire du paseo : on monte le matin, on descend de cheval pour déjeuner à la caseta, et l'après-midi appartient aux piétons. Le cheval n'est pas un moyen d'aller à la fête — il en fait partie.",
          en:"The word stays Spanish everywhere. The striped tents of the fairground, where you eat, drink and dance the sevillana. There are more than a thousand. They explain the paseo's hours: you ride in the morning, get off for lunch at the caseta, and the afternoon belongs to those on foot.",
          es:"Las casetas explican el horario del paseo: se monta por la mañana, se baja a comer y la tarde es de los que van a pie. El caballo no es un medio de llegar a la fiesta: forma parte de ella.",
          it:"Le casetas spiegano l'orario del paseo: si monta al mattino, si scende per pranzo, e il pomeriggio è di chi va a piedi.",
          de:"Die gestreiften Zelte des Festplatzes, wo gegessen, getrunken und Sevillana getanzt wird. Sie erklären die Zeiten des Paseo.",
          ja:"どの言語でもスペイン語のまま使います。会場に並ぶ縞模様のテントで、食事をし、飲み、セビリアーナを踊る場所。千を超える数があります。パセオの時間帯はこれで決まります。午前は馬で流し、昼はカセタで下馬して食事、午後は歩く人のものです。" } },

  { ref:"feria", lecon:1, coll:"feria",
    mots:{ fr:{m:"la Feria"}, en:{m:"the Feria", p:"fé-ria", var:"the Seville Fair"},
           es:{m:"la Feria de Abril"}, it:{m:"la Feria"},
           de:{m:"die Feria"}, ja:{m:"フェリア", p:"feria"} },
    def:{ fr:"🟥 ELLE A COMMENCÉ COMME UNE FOIRE AUX BESTIAUX, en 1847 : on y vendait des chevaux et du bétail, et la fête n'était qu'autour. Le commerce a disparu, la fête est restée — mais les chevaux aussi, et c'est ce qui la distingue de toutes les autres férias d'Espagne. ⚠️ En anglais on dit *the Seville Fair* ou simplement *the Feria*, jamais « the April Fair ».",
          en:"It began as a livestock fair in 1847: horses and cattle were sold, and the party was only around it. The trade has gone, the party stayed — and so did the horses, which is what sets it apart from every other Spanish feria.",
          es:"Empezó como feria de ganado en 1847: se vendían caballos y reses, y la fiesta era solo alrededor. El comercio desapareció, la fiesta quedó, y los caballos también.",
          it:"Cominciò come fiera del bestiame nel 1847: si vendevano cavalli e bovini, e la festa era solo intorno. Il commercio è sparito, la festa è rimasta, e i cavalli anche.",
          de:"Sie begann 1847 als Viehmarkt: Pferde und Rinder wurden verkauft, das Fest war nur drum herum. Der Handel verschwand, das Fest blieb — und die Pferde auch.",
          ja:"一八四七年、家畜市として始まりました。馬と牛が売買され、祭りはその周りにあるだけでした。商いは消え、祭りは残り、そして馬も残りました。それがスペインの他のフェリアと違う点です。" } }

  ],

  phrases: [

    { ref:"ph-parade-heure", lecon:1, mots:["parade","paseo"],
      fr:"À quelle heure commence la parade des chevaux ?",
      en:"What time does the horse parade start?",
      es:"¿A qué hora empieza el paseo de caballos?",
      it:"A che ora comincia la parata dei cavalli?",
      de:"Wann beginnt die Reiterparade?",
      ja:"馬 の 行列 は 何 時 に 始まり ます か ?" },

    { ref:"ph-parade-presente", lecon:1, mots:["bien-presente"],
      fr:"Le cheval est superbement présenté.",
      en:"The horse is beautifully turned out.",
      es:"El caballo está espléndidamente presentado.",
      it:"Il cavallo è splendidamente presentato.",
      de:"Das Pferd ist wunderbar herausgebracht.",
      ja:"馬 の 手入れ が 見事 に 行き届い て い ます。" },

    { ref:"ph-parade-amazone", lecon:1, mots:["amazone","selle-amazone"],
      fr:"Elle monte en amazone.",
      en:"She rides side-saddle.",
      es:"Monta a la amazona.",
      it:"Monta all'amazzone.",
      de:"Sie reitet im Damensattel.",
      ja:"彼女 は 横乗り で 乗っ て い ます。" },

    { ref:"ph-parade-quatre", lecon:1, mots:["attelage","meneur"],
      fr:"Cet attelage est mené à quatre chevaux.",
      en:"This is a four-in-hand.",
      es:"Este enganche va a cuatro caballos.",
      it:"Questo attacco è a quattro cavalli.",
      de:"Das ist ein Vierergespann.",
      ja:"これ は 四 頭 立て の 馬車 です。" }

  ],

  /* ==================================================================
     LE DIALOGUE DE SÉVILLE — 17 août 2026, session 214.

     LA SCÈNE : un jour de Feria, du tressage du matin au retour à la
     caseta. 18 phrases, 6 temps.

     🟥 LES DIX-HUIT PHRASES SONT DE BLANDINE, avec leur traduction
     anglaise, ainsi que le lexique entier du chapitre et les trois
     notions à expliquer.

     🟥 CE QUI REND CE CHAPITRE UNIQUE DANS TOUT LE MODULE : c'est le
     SEUL où l'on ne concourt pas. Personne ne gagne, rien n'est chronométré,
     aucun juge ne note. On se montre. Après vingt-huit villes de sport,
     de soins et de formation, Séville dit qu'un cheval peut aussi servir
     à défiler dans une rue.
     ⚠️ NE PAS y ramener du vocabulaire de concours.

     ⚠️ LES TROIS NOTIONS, dans les `def` :
     · **side-saddle** dit la monte ET la selle ;
     · **turned out** est intraduisible en un mot et englobe tout ;
     · **les attelages** se comptent single / pair / tandem /
       four-in-hand — et *four-in-hand* compte par la main du meneur.

     ⚠️ TROIS MOTS RESTENT EN ESPAGNOL dans les six langues : **paseo**,
     **traje corto**, **caseta**. Ces choses n'existent qu'ici.
     NE PAS les traduire.

     `dit` : "joueuse" = elle produit · "club" = un cavalier sévillan.
  ================================================================== */
  dialogue: {
    ville: "seville", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · le matin, avant de partir ---- */
      { ref:"dsv-heure-parade", temps:1, dit:"joueuse", mots:["parade"],
        fr:"À quelle heure commence la parade des chevaux ?",
        en:"What time does the horse parade start?",
        es:"¿A qué hora empieza el paseo de caballos?",
        it:"A che ora comincia la parata dei cavalli?",
        de:"Wann beginnt die Reiterparade?",
        ja:"馬 の 行列 は 何 時 に 始まり ます か ?" },

      { ref:"dsv-participer-paseo", temps:1, dit:"joueuse", mots:["paseo"],
        fr:"Nous allons participer au paseo à cheval cet après-midi.",
        en:"We're going to take part in the horse parade this afternoon.",
        es:"Vamos a participar en el paseo a caballo esta tarde.",
        it:"Parteciperemo al paseo a cavallo questo pomeriggio.",
        de:"Wir nehmen heute Nachmittag am Paseo zu Pferd teil.",
        ja:"今日 の 午後、 馬 で パセオ に 参加 し ます。" },

      { ref:"dsv-parfaitement-presente", temps:1, dit:"club", mots:["bien-presente","parade"],
        fr:"Le cheval doit être parfaitement présenté pour la parade.",
        en:"The horse needs to be perfectly turned out for the parade.",
        es:"El caballo tiene que estar perfectamente presentado para el paseo.",
        it:"Il cavallo deve essere perfettamente presentato per la parata.",
        de:"Das Pferd muss für die Parade perfekt herausgebracht sein.",
        ja:"行列 に は、 馬 を 完璧 に 仕上げ なけれ ば なり ませ ん。" },

      /* ---- temps 2 · les tresses ---- */
      { ref:"dsv-refaire-tresses", temps:2, dit:"joueuse", mots:["tresser","criniere"],
        fr:"Peux-tu refaire ses tresses avant de partir ?",
        en:"Can you redo his braids before we leave?",
        es:"¿Puedes rehacerle las trenzas antes de salir?",
        it:"Puoi rifargli le trecce prima di partire?",
        de:"Kannst du seine Zöpfe vor dem Aufbruch neu machen?",
        ja:"出かける 前 に、 編み目 を やり直し て もらえ ます か ?" },

      { ref:"dsv-criniere-tressee", temps:2, dit:"club", mots:["criniere","tresser","bien-presente"],
        fr:"Sa crinière doit être propre et soigneusement tressée.",
        en:"His mane needs to be clean and neatly braided.",
        es:"Sus crines deben estar limpias y cuidadosamente trenzadas.",
        it:"La sua criniera deve essere pulita e intrecciata con cura.",
        de:"Die Mähne muss sauber und sorgfältig eingeflochten sein.",
        ja:"たてがみ は 清潔 で、 丁寧 に 編ま れ て い なけれ ば なり ませ ん。" },

      /* ---- temps 3 · le costume ---- */
      { ref:"dsv-traje-corto", temps:3, dit:"club", mots:["traje-corto"],
        fr:"Aujourd'hui, les cavaliers portent le traje corto.",
        en:"Today, the riders are wearing traje corto.",
        es:"Hoy los jinetes visten de traje corto.",
        it:"Oggi i cavalieri indossano il traje corto.",
        de:"Heute tragen die Reiter den Traje corto.",
        ja:"今日 の 騎手 は トラヘ・コルト を 着 て い ます。" },

      { ref:"dsv-tenue-travail", temps:3, dit:"club", mots:["traje-corto"],
        fr:"Cette tenue traditionnelle était autrefois portée pour travailler à cheval.",
        en:"This traditional outfit was once worn for working on horseback.",
        es:"Este traje tradicional se llevaba antaño para trabajar a caballo.",
        it:"Questo abito tradizionale si portava una volta per lavorare a cavallo.",
        de:"Diese traditionelle Tracht wurde einst zur Arbeit zu Pferd getragen.",
        ja:"この 伝統 的 な 装い は、 かつて 馬 上 で 働く ため の 服 でし た。" },

      /* ---- temps 4 · l'amazone ---- */
      { ref:"dsv-monte-amazone", temps:4, dit:"club", mots:["amazone","selle-amazone"],
        fr:"Cette cavalière monte en amazone pour la parade.",
        en:"This rider is riding side-saddle for the parade.",
        es:"Esta jinete monta a la amazona para el paseo.",
        it:"Questa cavaliera monta all'amazzone per la parata.",
        de:"Diese Reiterin reitet für die Parade im Damensattel.",
        ja:"この 女性 は、 行列 の ため に 横乗り で 乗っ て い ます。" },

      { ref:"dsv-jupe-traditionnelle", temps:4, dit:"club", mots:["tenue-amazone","amazone"],
        fr:"Elle porte une longue jupe traditionnelle avec sa tenue d'amazone.",
        en:"She is wearing a long traditional skirt with her side-saddle outfit.",
        es:"Lleva una falda larga tradicional con su traje de amazona.",
        it:"Porta una lunga gonna tradizionale con il suo abito da amazzone.",
        de:"Sie trägt einen langen traditionellen Rock zu ihrem Reitkleid.",
        ja:"横乗り の 装い に、 伝統 的 な 長い スカート を 合わせ て い ます。" },

      { ref:"dsv-selle-espagnole", temps:4, dit:"club", mots:["selle-espagnole"],
        fr:"Cette selle est une selle espagnole traditionnelle.",
        en:"This is a traditional Spanish saddle.",
        es:"Esta silla es una silla vaquera tradicional.",
        it:"Questa sella è una tradizionale sella spagnola.",
        de:"Das ist ein traditioneller spanischer Sattel.",
        ja:"これ は 伝統 的 な スペイン 鞍 です。" },

      { ref:"dsv-harnachement-assorti", temps:4, dit:"club", mots:["harnachement","bien-presente"],
        fr:"Le harnachement est assorti à la tenue du cavalier.",
        en:"The tack matches the rider's outfit.",
        es:"La guarnición va a juego con el traje del jinete.",
        it:"La bardatura è abbinata all'abito del cavaliere.",
        de:"Das Zaumzeug passt zur Kleidung des Reiters.",
        ja:"馬装 は 騎手 の 装い と 揃え られ て い ます。" },

      /* ---- temps 5 · les attelages ---- */
      { ref:"dsv-combien-chevaux", temps:5, dit:"joueuse", mots:["voiture","attelage"],
        fr:"Combien de chevaux tirent cette voiture ?",
        en:"How many horses are pulling this carriage?",
        es:"¿Cuántos caballos tiran de este coche?",
        it:"Quanti cavalli tirano questa carrozza?",
        de:"Wie viele Pferde ziehen diese Kutsche?",
        ja:"この 馬車 は 何 頭 で 引い て い ます か ?" },

      { ref:"dsv-quatre-chevaux", temps:5, dit:"club", mots:["attelage","meneur"],
        fr:"Cet attelage est mené avec quatre chevaux.",
        en:"This carriage is driven with four horses.",
        es:"Este enganche va con cuatro caballos.",
        it:"Questo attacco è condotto con quattro cavalli.",
        de:"Dieses Gespann wird vierspännig gefahren.",
        ja:"この 馬車 は 四 頭 立て で 走り ます。" },

      { ref:"dsv-guides", temps:5, dit:"club", mots:["meneur","guides"],
        fr:"Le meneur contrôle les chevaux avec les guides.",
        en:"The driver controls the horses with the driving reins.",
        es:"El cochero controla los caballos con las riendas de enganche.",
        it:"Il guidatore controlla i cavalli con le redini da attacco.",
        de:"Der Fahrer lenkt die Pferde mit den Leinen.",
        ja:"御者 は 馬車 用 の 手綱 で 馬 を 操り ます。" },

      { ref:"dsv-meme-rythme", temps:5, dit:"club", mots:["meme-rythme","attelage"],
        fr:"Les chevaux doivent avancer ensemble au même rythme.",
        en:"The horses need to move together at the same pace.",
        es:"Los caballos deben avanzar juntos al mismo ritmo.",
        it:"I cavalli devono avanzare insieme allo stesso ritmo.",
        de:"Die Pferde müssen im Gleichschritt zusammengehen.",
        ja:"馬 たち は 同じ 歩調 で 揃っ て 進ま なけれ ば なり ませ ん。" },

      /* ---- temps 6 · la Feria ---- */
      { ref:"dsv-retour-caseta", temps:6, dit:"club", mots:["caseta","paseo"],
        fr:"Après le paseo, nous retournerons à la caseta.",
        en:"After the parade, we'll go back to the caseta.",
        es:"Después del paseo volveremos a la caseta.",
        it:"Dopo il paseo torneremo alla caseta.",
        de:"Nach dem Paseo gehen wir zurück zur Caseta.",
        ja:"パセオ の あと、 カセタ に 戻り ます。" },

      { ref:"dsv-toutes-les-rues", temps:6, dit:"joueuse", mots:["voiture","feria"],
        fr:"Il y a des chevaux et des attelages dans toutes les rues du Real.",
        en:"There are horses and carriages all through the fairground.",
        es:"Hay caballos y enganches por todas las calles del Real.",
        it:"Ci sono cavalli e carrozze per tutte le vie del Real.",
        de:"Überall auf dem Festplatz sind Pferde und Kutschen.",
        ja:"会場 の どの 通り に も、 馬 と 馬車 が い ます。" },

      { ref:"dsv-foire-aux-chevaux", temps:6, dit:"club", mots:["feria"],
        fr:"La Feria de Séville était autrefois une foire aux chevaux et au bétail.",
        en:"The Seville Fair originally began as a livestock fair.",
        es:"La Feria de Sevilla empezó siendo una feria de ganado.",
        it:"La Feria di Siviglia nacque come fiera del bestiame.",
        de:"Die Feria von Sevilla begann als Viehmarkt.",
        ja:"セビリア の フェリア は、 もともと 馬 と 家畜 の 市 でし た。" }
    ]
  }
};
