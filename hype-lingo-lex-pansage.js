/* hype-lingo-lex-pansage.js — Hype Lingo · Chapitre 2 · « Le pansage »
   ==================================================================
   30 CONCEPTS, QUATRE LEÇONS.

   🟥 19/08/2026 — CHAPITRE ALLÉGÉ SUR DÉCISION DE BLANDINE. Il portait
   42 concepts sur quatre leçons alors que LAMBOURN n'en lisait qu'une :
   trente dormaient. Douze notions ont été RETIRÉES d'ici et versées dans
   `hype-lingo-lex-pansage-reserve.js` (non chargé) :
     · `sabot`, `sole`, `fourchette` — enseignés par FLYINGE (le pied et
       la maréchalerie). NE PAS LES RECRÉER ICI : un concept = un `ref`
       global. ⚠️ Chez Flyinge, `sabot` se dit « le pied » et non « le
       sabot » — même `ref`, libellé français différent, à trancher.
     · `brosse-eau`, `tondeuse`, `toupet`, `tondre`, `poussiere`, `mue`,
       `tache`, `eclat`, `tique` — sans ville, en attente.
   `ETAPE_SRC.lambourn` lit désormais LES QUATRE LEÇONS.

   UN CONCEPT = UN OBJET DU MONDE ÉQUESTRE avec ses 6 langues côte à côte.
   Aucune langue source : le moteur lit la langue de l'interface et propose
   les 5 autres.

   CHAMPS
     m    le mot, article compris quand il porte le genre
     p    prononciation simplifiée — fournie pour EN, DE et JA
     var  variante régionale (GB/US, Espagne/Amérique…)
     def  définition — mode Lexique, verso de carte, indice de jeu
     v    true si c'est un verbe

   PAS DE CHAMP `dit` ICI : contrairement au chapitre « Le cours », le
   pansage n'est pas fait d'ordres criés mais d'objets et de gestes.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'allemand distingue deux brosses là où le français dit « brosse
       dure / brosse douce » : Wurzelbürste et Kardätsche.
     · la fourchette du pied est une fourchette en français, une grenouille
       en anglais (frog), un rayon en allemand (Strahl).
     · casco en espagnol = le sabot ET le casque.
     · « to plait » se prononce « platt », et les Américains disent « braid ».
     · l'anglais tond avec des « clippers », jamais un « mower ».

   ⚠️ RELECTURE NATIVE OBLIGATOIRE AVANT PUBLICATION
   Les entrées marquées // ?? sont celles dont je ne suis pas sûr. Le
   japonais et l'italien technique du matériel de pansage sont les plus
   incertains du lot. Toutes reportées dans hype-lingo-doutes-a-verifier.md
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.pansage = {
  ref: "pansage",
  chapitre: 2,
  titre: { fr:"Le pansage", en:"Grooming", es:"La limpieza", it:"La pulizia", de:"Das Putzen", ja:"手入れ" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LA BOÎTE DE PANSAGE ============ */

  { ref:"pansage", lecon:1, coll:"outils",
    mots:{ fr:{m:"le pansage"}, en:{m:"grooming", p:"grou-ming"},
           es:{m:"la limpieza", var:"el cepillado"}, it:{m:"la pulizia", var:"la strigliatura"},
           de:{m:"das Putzen", p:"pout-seune"}, ja:{m:"手入れ", p:"teire", var:"グルーミング"} },
    def:{ fr:"L'ensemble des soins du poil, des pieds et des crins, avant et après le travail. En anglais, « grooming » désigne à la fois le geste et le métier.",
          en:"All the care of coat, feet and hair, before and after work. In English « grooming » is both the act and the job.",
          es:"El conjunto de cuidados del pelo, los pies y las crines, antes y después del trabajo. En inglés, « grooming » designa a la vez el gesto y el oficio.",
          it:"L'insieme delle cure del pelo, dei piedi e dei crini, prima e dopo il lavoro. In inglese « grooming » indica insieme il gesto e il mestiere.",
          de:"Die Pflege von Fell, Hufen und Langhaar, vor und nach der Arbeit. Im Englischen meint « grooming » Handgriff und Beruf zugleich.",
          ja:"毛と蹄とたてがみ・尾の手入れ全般。運動の前と後に行います。英語の « grooming » は、作業と職業の両方を指します。" } },

  { ref:"boite-pansage", lecon:1, coll:"outils",
    mots:{ fr:{m:"la boîte de pansage"}, en:{m:"the grooming kit", p:"grou-ming kitt", var:"grooming box"},
           es:{m:"la caja de limpieza"}, it:{m:"la cassetta della pulizia", var:"il kit di pulizia"},
           de:{m:"der Putzkasten", p:"pout-ss-kass-teune"}, ja:{m:"手入れ用具入れ", p:"teire yōgu-ire"} }, // ??
    def:{ fr:"Le coffret où l'on range brosses, étrille et cure-pied. Idéalement une par cheval : c'est ce qui évite de transporter une infection d'un box à l'autre.",
          en:"The box holding brushes, curry comb and hoof pick. Ideally one per horse, so nothing is carried from one stable to the next.",
          es:"El cofre donde se guardan cepillos, almohaza y limpiacascos. Idealmente uno por caballo: es lo que evita llevar una infección de un box a otro.",
          it:"La cassetta dove si tengono spazzole, striglia e curasole. Idealmente una per cavallo: è ciò che evita di portare un'infezione da un box all'altro.",
          de:"Der Kasten für Bürsten, Striegel und Hufauskratzer. Idealerweise einer pro Pferd: So trägt man keine Infektion von Box zu Box.",
          ja:"ブラシ、毛すき、蹄ピックをしまう箱。理想は一頭にひと箱 — 馬房から馬房へ感染を運ばないための工夫です。" } },

  { ref:"etrille", lecon:1, coll:"outils",
    mots:{ fr:{m:"l'étrille"}, en:{m:"the curry comb", p:"keu-ri kôme", var:"rubber curry (GB)"},
           es:{m:"la rasqueta"}, it:{m:"la striglia"},
           de:{m:"der Striegel", p:"chtri-gueul"}, ja:{m:"ゴムブラシ", p:"gomu burashi", var:"カリーコーム"} }, // ??
    def:{ fr:"Elle décolle la boue sèche et la poussière, en petits cercles. Jamais sur les membres ni sur la tête : l'os est trop près de la peau.",
          en:"It lifts dried mud and dust in small circles. Never on the legs or the head, where bone lies close under the skin.",
          es:"Despega el barro seco y el polvo, en pequeños círculos. Nunca en las extremidades ni en la cabeza: el hueso está demasiado cerca de la piel.",
          it:"Stacca il fango secco e la polvere, a piccoli cerchi. Mai sugli arti né sulla testa: l'osso è troppo vicino alla pelle.",
          de:"Löst trockenen Schlamm und Staub, in kleinen Kreisen. Nie an Beinen oder Kopf: Der Knochen liegt zu dicht unter der Haut.",
          ja:"乾いた泥や埃を、小さな円を描いて浮かせます。脚と頭には使わないこと。骨が皮膚のすぐ下にあります。" } },

  { ref:"brosse-dure", lecon:1, coll:"outils",
    mots:{ fr:{m:"la brosse dure"}, en:{m:"the dandy brush", p:"dann-di broche"},
           es:{m:"el cepillo duro", var:"la bruza"}, it:{m:"la brusca", var:"la spazzola dura"},
           de:{m:"die Wurzelbürste", p:"vour-tseul-bur-ste"}, ja:{m:"泥落としブラシ", p:"doro-otoshi burashi"} }, // ??
    def:{ fr:"Elle chasse ce que l'étrille a décollé. « Dandy » n'a rien à voir avec l'élégance : c'est simplement le nom anglais de la brosse à poils raides.",
          en:"It sweeps away what the curry comb has lifted. « Dandy » here has nothing to do with elegance: it is just the name of the stiff-bristled brush.",
          es:"Expulsa lo que la almohaza despegó. « Dandy » no tiene nada que ver con la elegancia: es simplemente el nombre inglés del cepillo de cerdas duras.",
          it:"Scaccia ciò che la striglia ha staccato. « Dandy » non c'entra con l'eleganza: è semplicemente il nome inglese della spazzola a setole dure.",
          de:"Fegt weg, was der Striegel gelöst hat. « Dandy » hat nichts mit Eleganz zu tun: Es ist schlicht der englische Name der harten Bürste.",
          ja:"毛すきが浮かせたものを払い落とします。« dandy » は洒落者とは無関係 — 硬い毛のブラシの英語名にすぎません。" } },

  { ref:"brosse-douce", lecon:1, coll:"outils",
    mots:{ fr:{m:"la brosse douce"}, en:{m:"the body brush", p:"bo-di broche"},
           es:{m:"el cepillo blando", var:"el cepillo suave"}, it:{m:"la spazzola morbida"},
           de:{m:"die Kardätsche", p:"kar-dè-tche"}, ja:{m:"毛ブラシ", p:"ke-burashi", var:"胴ブラシ"} }, // ??
    def:{ fr:"Elle lustre le poil et se passe partout, tête comprise. ⚠️ L'allemand a deux mots bien séparés : Wurzelbürste pour la dure, Kardätsche pour celle-ci. Les confondre s'entend tout de suite dans une écurie allemande.",
          en:"It polishes the coat and can be used everywhere, head included. German keeps two distinct words: Wurzelbürste for the stiff brush, Kardätsche for this one.",
          es:"Abrillanta el pelo y pasa por todas partes, cabeza incluida. ⚠️ El alemán tiene dos palabras bien separadas: Wurzelbürste para la dura, Kardätsche para esta. Confundirlas se nota al instante en una cuadra alemana.",
          it:"Lucida il pelo e passa ovunque, testa compresa. ⚠️ Il tedesco ha due parole ben distinte: Wurzelbürste per la dura, Kardätsche per questa. Confonderle si sente subito in una scuderia tedesca.",
          de:"Bringt das Fell zum Glänzen und darf überallhin, auch an den Kopf. ⚠️ Wurzelbürste ist die harte, Kardätsche diese hier — wer sie verwechselt, fällt im Stall sofort auf.",
          ja:"毛に艶を出し、頭も含めて全身に使えます。⚠️ ドイツ語は二語をはっきり分けます。硬い方が Wurzelbürste、こちらが Kardätsche。取り違えれば、ドイツの厩舎ではすぐに気づかれます。" } },

  { ref:"cure-pied", lecon:1, coll:"outils",
    mots:{ fr:{m:"le cure-pied"}, en:{m:"the hoof pick", p:"houf pik"},
           es:{m:"el escarbador", var:"el limpiacascos"}, it:{m:"il curasnetta"}, // ??
           de:{m:"der Hufkratzer", p:"houf-krat-seur"}, ja:{m:"裏掘り", p:"urabori"} },
    def:{ fr:"Le premier outil qu'on sort de la boîte. Les quatre pieds, avant et après chaque séance, du talon vers la pointe.",
          en:"The first tool out of the box. All four feet, before and after every session, working from heel to toe.",
          es:"La primera herramienta que sale de la caja. Los cuatro pies, antes y después de cada sesión, del talón hacia la punta.",
          it:"Il primo attrezzo che esce dalla cassetta. I quattro piedi, prima e dopo ogni seduta, dal tallone verso la punta.",
          de:"Das erste Werkzeug aus dem Kasten. Alle vier Hufe, vor und nach jeder Einheit, vom Ballen zur Spitze.",
          ja:"箱から最初に取り出す道具。四本の蹄を、毎回の運動の前後に、踵からつま先へ。" } },

  { ref:"eponge", lecon:1, coll:"outils",
    mots:{ fr:{m:"l'éponge"}, en:{m:"the sponge", p:"sponndj"},
           es:{m:"la esponja"}, it:{m:"la spugna"},
           de:{m:"der Schwamm", p:"chvam"}, ja:{m:"スポンジ", p:"suponji"} },
    def:{ fr:"Une éponge pour les yeux et les naseaux, une autre pour l'arrière-main. On ne les échange jamais, et on ne les confond pas.",
          en:"One sponge for eyes and nostrils, another for the dock. They are never swapped and never mixed up.",
          es:"Una esponja para los ojos y los ollares, otra para el tercio posterior. No se intercambian jamás, y no se confunden.",
          it:"Una spugna per occhi e narici, un'altra per il posteriore. Non si scambiano mai, e non si confondono.",
          de:"Ein Schwamm für Augen und Nüstern, ein anderer für die Hinterhand. Sie werden nie getauscht — und nie verwechselt.",
          ja:"目と鼻孔にひとつ、後躯にもうひとつ。このスポンジは決して交換せず、決して取り違えません。" } },

  { ref:"peigne", lecon:1, coll:"outils",
    mots:{ fr:{m:"le peigne à crinière"}, en:{m:"the mane comb", p:"mène kôme"},
           es:{m:"el peine", var:"el peine de crin"}, it:{m:"il pettine", var:"il pettine per criniera"},
           de:{m:"der Mähnenkamm", p:"mè-neune-kam"}, ja:{m:"たてがみ用くし", p:"tategami-yō kushi"} }, // ??
    def:{ fr:"Peigne de métal ou de plastique, réservé à la crinière. La queue se démêle aux doigts : le peigne y casse les crins, qui mettent des années à repousser.",
          en:"A metal or plastic comb, for the mane only. Tails are teased out by hand — a comb breaks hairs that take years to grow back.",
          es:"Peine de metal o plástico, reservado a la crin. La cola se desenreda con los dedos: el peine rompe las cerdas, que tardan años en volver a crecer.",
          it:"Pettine di metallo o plastica, riservato alla criniera. La coda si districa con le dita: il pettine spezza i crini, che impiegano anni a ricrescere.",
          de:"Kamm aus Metall oder Plastik, nur für die Mähne. Der Schweif wird mit den Fingern entwirrt: Der Kamm bricht die Haare, die Jahre zum Nachwachsen brauchen.",
          ja:"金属やプラスチックの櫛は、たてがみ専用。尾は指でほぐします。櫛は尾の毛を切ってしまい、生えそろうまで何年もかかるのです。" } },

  { ref:"couteau-chaleur", lecon:1, coll:"outils",
    mots:{ fr:{m:"le couteau de chaleur"}, en:{m:"the sweat scraper", p:"souètt skré-peur"},
           es:{m:"la rasqueta de sudor"}, it:{m:"il raschiatoio"}, // ??
           de:{m:"das Schweißmesser", p:"chvaïss-mè-seur"}, ja:{m:"汗取り", p:"asetori"} }, // ??
    def:{ fr:"La lame souple qui racle la sueur ou l'eau après le travail. Un cheval laissé mouillé prend froid, même en été.",
          en:"The flexible blade that scrapes off sweat or water after work. A horse left wet gets cold, even in summer.",
          es:"La lámina flexible que rasca el sudor o el agua tras el trabajo. Un caballo dejado mojado coge frío, incluso en verano.",
          it:"La lama flessibile che rascia il sudore o l'acqua dopo il lavoro. Un cavallo lasciato bagnato prende freddo, anche d'estate.",
          de:"Die biegsame Klinge, die nach der Arbeit Schweiß oder Wasser abzieht. Ein nass gelassenes Pferd erkältet sich, selbst im Sommer.",
          ja:"運動後の汗や水をこそげ取る、しなやかな板。濡れたまま放っておくと、馬は夏でも体を冷やします。" } },

  { ref:"graisse-pieds", lecon:1, coll:"outils",
    mots:{ fr:{m:"la graisse à pieds", var:"l'onguent"}, en:{m:"hoof oil", p:"houf oïl", var:"hoof grease"},
           es:{m:"la grasa para cascos"}, it:{m:"il grasso per zoccoli"},
           de:{m:"das Huffett", p:"houf-fètt"}, ja:{m:"蹄油", p:"teiyu"} },
    def:{ fr:"S'applique sur un sabot propre et sec, paroi et sole. Pas tous les jours : le pied doit aussi respirer.",
          en:"Applied to a clean, dry hoof, wall and sole. Not every day — the foot needs to breathe too.",
          es:"Se aplica sobre un casco limpio y seco, pared y palma. No todos los días: el pie también debe respirar.",
          it:"Si applica su uno zoccolo pulito e asciutto, parete e suola. Non tutti i giorni: il piede deve anche respirare.",
          de:"Wird auf den sauberen, trockenen Huf aufgetragen, Wand und Sohle. Nicht täglich: Der Huf muss auch atmen.",
          ja:"きれいに乾いた蹄に、壁と蹄底へ塗ります。毎日ではありません。蹄にも呼吸が必要です。" } },

  /* ============ LEÇON 2 · LE CHEVAL SOUS LA BROSSE ============ */

  /* ============ LEÇON 2 · LE CHEVAL SOUS LA BROSSE ============ */

  { ref:"poil", lecon:2, coll:"corps",
    mots:{ fr:{m:"le poil", var:"la robe"}, en:{m:"the coat", p:"kôte"},
           es:{m:"el pelo", var:"la capa"}, it:{m:"il pelo", var:"il mantello"},
           de:{m:"das Fell", p:"fèll"}, ja:{m:"毛", p:"ke", var:"毛色 keshoku = la robe"} },
    def:{ fr:"Le pelage. Son brillant est le premier signe visible de la santé d'un cheval — et il vient d'abord du dedans.",
          en:"The coat. Its shine is the first visible sign of a horse's health, and it comes from the inside first.",
          es:"El pelaje. Su brillo es el primer signo visible de la salud de un caballo — y viene primero de dentro.",
          it:"Il mantello. La sua lucentezza è il primo segno visibile della salute di un cavallo — e viene prima di tutto da dentro.",
          de:"Das Haarkleid. Sein Glanz ist das erste sichtbare Zeichen der Gesundheit — und er kommt zuerst von innen.",
          ja:"被毛のこと。その艶は馬の健康を映す最初のしるし — そして艶は、まず体の内側から生まれます。" } },

  { ref:"criniere", lecon:2, coll:"corps",
    mots:{ fr:{m:"la crinière"}, en:{m:"the mane", p:"mène"},
           es:{m:"la crin", var:"las crines"}, it:{m:"la criniera"},
           de:{m:"die Mähne", p:"mè-ne"}, ja:{m:"たてがみ", p:"tategami"} },
    def:{ fr:"Les crins de l'encolure. Dans la tradition classique, on les couche du côté droit.",
          en:"The hair along the neck, traditionally laid over on the off side.",
          es:"Las cerdas del cuello. En la tradición clásica se peinan hacia el lado derecho.",
          it:"I crini dell'incollatura. Nella tradizione classica si portano sul lato destro.",
          de:"Das Langhaar am Hals. In der klassischen Tradition liegt es auf der rechten Seite.",
          ja:"首すじの長い毛。古典的な伝統では、右側に寝かせます。" } },

  { ref:"queue", lecon:2, coll:"corps",
    mots:{ fr:{m:"la queue"}, en:{m:"the tail", p:"téïl"},
           es:{m:"la cola"}, it:{m:"la coda"},
           de:{m:"der Schweif", p:"chvaïf"}, ja:{m:"尾", p:"o", var:"尻尾 shippo, courant"} },
    def:{ fr:"⚠️ L'allemand a un mot propre au cheval : der Schweif. Schwanz, le mot courant pour la queue d'un animal, ne s'emploie pas en écurie.",
          en:"German keeps a special word for a horse's tail, Schweif, rather than the everyday Schwanz.",
          es:"⚠️ El alemán tiene una palabra propia para el caballo: der Schweif. Schwanz, la palabra corriente para la cola de un animal, no se emplea en la cuadra.",
          it:"⚠️ Il tedesco ha una parola propria per il cavallo: der Schweif. Schwanz, la parola corrente per la coda di un animale, non si usa in scuderia.",
          de:"⚠️ Beim Pferd sagt man der Schweif. Schwanz, das Alltagswort für Tierschwänze, ist im Stall fehl am Platz.",
          ja:"⚠️ ドイツ語には馬専用の言葉があります：der Schweif。動物のしっぽ一般を指す Schwanz は、厩舎では使いません。" } },

  { ref:"membres", lecon:2, coll:"corps",
    mots:{ fr:{m:"les membres"}, en:{m:"the legs", p:"lègz"},
           es:{m:"los miembros", var:"las patas"}, it:{m:"gli arti", var:"le gambe"},
           de:{m:"die Beine", p:"baï-ne"}, ja:{m:"肢", p:"ashi"} },
    def:{ fr:"On les brosse doucement, à la brosse douce et jamais à l'étrille : l'os est juste sous la peau.",
          en:"Brushed gently with the body brush, never with a curry comb: the bone is just under the skin.",
          es:"Se cepillan con suavidad, con el cepillo suave y nunca con la almohaza: el hueso está justo bajo la piel.",
          it:"Si spazzolano con dolcezza, con la spazzola morbida e mai con la striglia: l'osso è appena sotto la pelle.",
          de:"Werden sanft gebürstet, mit der weichen Bürste und nie mit dem Striegel: Der Knochen liegt direkt unter der Haut.",
          ja:"脚はやさしく、柔らかいブラシで。毛すきは使いません。骨が皮膚のすぐ下にあるからです。" } },

  { ref:"dos", lecon:2, coll:"corps",
    mots:{ fr:{m:"le dos"}, en:{m:"the back", p:"bak"},
           es:{m:"el lomo", var:"el dorso"}, it:{m:"la schiena"},
           de:{m:"der Rücken", p:"ru-keune"}, ja:{m:"背", p:"se"} },
    def:{ fr:"La zone à vérifier avant de seller : un grain de sable resté sous le tapis suffit à blesser en une reprise.",
          en:"Always checked before saddling: one grain of sand left under the pad can rub a sore in a single lesson.",
          es:"La zona que hay que revisar antes de ensillar: un grano de arena bajo la mantilla basta para herir en una clase.",
          it:"La zona da controllare prima di sellare: un granello di sabbia sotto il sottosella basta a ferire in una lezione.",
          de:"Die Zone, die man vor dem Satteln prüft: Ein Sandkorn unter der Decke reicht, um in einer Stunde wund zu reiben.",
          ja:"装鞍の前に必ず確かめる場所。ゼッケンの下の砂粒ひとつで、一回のレッスンのうちに傷ができます。" } },

  { ref:"encolure", lecon:2, coll:"corps",
    mots:{ fr:{m:"l'encolure"}, en:{m:"the neck", p:"nèk"},
           es:{m:"el cuello"}, it:{m:"il collo"},
           de:{m:"der Hals", p:"halss"}, ja:{m:"首", p:"kubi"} },
    def:{ fr:"Du garrot à la tête. C'est par là qu'on commence le pansage, jamais par l'arrière-main.",
          en:"From withers to head. Grooming starts here, never at the hindquarters.",
          es:"De la cruz a la cabeza. Por ahí se empieza la limpieza, nunca por el tercio posterior.",
          it:"Dal garrese alla testa. È da lì che si comincia la pulizia, mai dal posteriore.",
          de:"Vom Widerrist zum Kopf. Dort beginnt das Putzen — nie an der Hinterhand.",
          ja:"き甲から頭にかけての部分。手入れはここから始めます。後躯からは決して始めません。" } },

  /* ============ LEÇON 3 · LES GESTES ============ */

  /* ============ LEÇON 3 · LES GESTES ============ */

  { ref:"panser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"panser"}, en:{m:"to groom", p:"grou-me"},
           es:{m:"limpiar", var:"almohazar"}, it:{m:"pulire", var:"strigliare"},
           de:{m:"putzen", p:"pout-seune"}, ja:{m:"手入れをする", p:"teire o suru"} },
    def:{ fr:"Le verbe d'ensemble. ⚠️ En français il veut aussi dire soigner une plaie ; l'anglais sépare les deux (« to dress a wound »).",
          en:"The general verb. In French the same word also means to dress a wound; English keeps the two apart.",
          es:"El verbo de conjunto. ⚠️ En francés también significa curar una herida; el inglés separa los dos (« to dress a wound »).",
          it:"Il verbo d'insieme. ⚠️ In francese vuol dire anche medicare una ferita; l'inglese separa i due (« to dress a wound »).",
          de:"Das Sammelverb. ⚠️ Im Französischen heißt es auch, eine Wunde zu versorgen; das Englische trennt beides (« to dress a wound »).",
          ja:"手入れ全体を指す動詞。⚠️ フランス語では傷の手当ての意味もあり、英語は二つを分けます（« to dress a wound »）。" } },

  { ref:"brosser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"brosser"}, en:{m:"to brush", p:"broche"},
           es:{m:"cepillar"}, it:{m:"spazzolare"},
           de:{m:"bürsten", p:"bur-steune"}, ja:{m:"ブラシをかける", p:"burashi o kakeru"} },
    def:{ fr:"Dans le sens du poil, de l'avant vers l'arrière, en appuyant sur le corps et à peine sur les membres.",
          en:"With the lie of the coat, front to back, firmly on the body and barely at all on the legs.",
          es:"En el sentido del pelo, de delante hacia atrás, apretando en el cuerpo y apenas en las extremidades.",
          it:"Nel senso del pelo, dall'avanti all'indietro, premendo sul corpo e appena sugli arti.",
          de:"In Fellrichtung, von vorn nach hinten, am Körper mit Druck, an den Beinen kaum.",
          ja:"毛並みに沿って、前から後ろへ。体はしっかり、脚はごく軽く。" } },

  { ref:"etriller", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"étriller"}, en:{m:"to curry", p:"keu-ri"},
           es:{m:"rasquetear"}, it:{m:"strigliare"},
           de:{m:"striegeln", p:"chtri-gueuln"}, ja:{m:"ゴムブラシをかける", p:"gomu burashi o kakeru"} }, // ??
    def:{ fr:"Passer l'étrille en petits cercles avant la brosse, pour faire remonter poussière et poils morts.",
          en:"Working the curry comb in small circles before brushing, to bring dust and dead hair to the surface.",
          es:"Pasar la almohaza en pequeños círculos antes del cepillo, para hacer subir polvo y pelo muerto.",
          it:"Passare la striglia a piccoli cerchi prima della spazzola, per far risalire polvere e pelo morto.",
          de:"Vor dem Bürsten den Striegel in kleinen Kreisen führen, damit Staub und lose Haare aufsteigen.",
          ja:"ブラシの前に、小さな円を描いて毛すきをかけ、埃と抜け毛を浮かせます。" } },

  { ref:"curer-pieds", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"curer les pieds"}, en:{m:"to pick out the feet", p:"pik aoute ze fitt"},
           es:{m:"limpiar los cascos"}, it:{m:"pulire gli zoccoli"},
           de:{m:"die Hufe auskratzen", p:"hou-fe aouss-krat-seune"}, ja:{m:"裏掘りをする", p:"urabori o suru"} },
    def:{ fr:"Du talon vers la pointe, jamais l'inverse, pour ne pas blesser la fourchette. C'est le geste qui trouve le caillou, le clou ou l'odeur qui annonce un problème.",
          en:"From heel to toe, never the other way, so as not to damage the frog. This is the moment you find the stone, the nail, or the smell that warns of trouble.",
          es:"Del talón hacia la punta, jamás al revés, para no herir la ranilla. Es el gesto que encuentra la piedra, el clavo o el olor que anuncia un problema.",
          it:"Dal tallone verso la punta, mai il contrario, per non ferire il fettone. È il gesto che trova il sasso, il chiodo o l'odore che annuncia un problema.",
          de:"Vom Ballen zur Spitze, nie umgekehrt, um den Strahl nicht zu verletzen. Dieser Handgriff findet den Stein, den Nagel oder den Geruch, der Ärger ankündigt.",
          ja:"踵からつま先へ。逆は蹄叉を傷つけます。この作業こそが、石を、釘を、そして異変を告げる匂いを見つけるのです。" } },

  { ref:"demeler", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"démêler"}, en:{m:"to detangle", p:"di-tan-gueul", var:"to comb out"},
           es:{m:"desenredar"}, it:{m:"districare"},
           de:{m:"auskämmen", p:"aouss-kè-meune"}, ja:{m:"絡まりをほどく", p:"karamari o hodoku"} }, // ??
    def:{ fr:"On part du bas de la mèche et on remonte, brin par brin. Un crin arraché met deux ans à repousser.",
          en:"Start at the bottom of the lock and work up, strand by strand. A pulled hair takes two years to grow back.",
          es:"Se empieza por la punta del mechón y se sube, cerda a cerda. Una cerda arrancada tarda dos años en volver a crecer.",
          it:"Si parte dal fondo della ciocca e si risale, crine per crine. Un crine strappato impiega due anni a ricrescere.",
          de:"Man beginnt unten an der Strähne und arbeitet sich hoch, Haar für Haar. Ein ausgerissenes Haar braucht zwei Jahre zum Nachwachsen.",
          ja:"房の先から始めて、一本ずつ上へほぐしていきます。抜けた毛が生えそろうには二年かかります。" } },

  { ref:"tresser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"tresser"}, en:{m:"to plait", p:"platt", var:"to braid (US)"},
           es:{m:"trenzar"}, it:{m:"intrecciare"},
           de:{m:"einflechten", p:"aïn-flèch-teune"}, ja:{m:"編む", p:"amu"} },
    def:{ fr:"⚠️ Double piège : « to plait » se prononce « platt » en Grande-Bretagne, et les Américains disent « to braid ». Deux mots pour le même geste de concours.",
          en:"A double trap: « to plait » is pronounced « platt » in Britain, while Americans say « to braid ».",
          es:"⚠️ Doble trampa: « to plait » se pronuncia « platt » en Gran Bretaña, y los americanos dicen « to braid ». Dos palabras para el mismo gesto de concurso.",
          it:"⚠️ Doppia trappola: « to plait » si pronuncia « platt » in Gran Bretagna, e gli americani dicono « to braid ». Due parole per lo stesso gesto da concorso.",
          de:"⚠️ Doppelte Falle: « to plait » spricht sich in Großbritannien « platt », und die Amerikaner sagen « to braid ». Zwei Wörter für denselben Turnierhandgriff.",
          ja:"⚠️ 二重の罠：イギリスの « to plait » は「プラット」と発音し、アメリカでは « to braid » と言います。競技会の同じ作業に、二つの言葉。" } },

  { ref:"secher", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"sécher"}, en:{m:"to dry off", p:"draï off"},
           es:{m:"secar"}, it:{m:"asciugare"},
           de:{m:"abtrocknen", p:"ap-trok-neune", var:"trockenreiten = sécher au pas, monté"}, ja:{m:"乾かす", p:"kawakasu"} },
    def:{ fr:"On racle, on frictionne, on marche. L'allemand a un verbe pour sécher un cheval en le montant au pas : trockenreiten.",
          en:"Scrape, rub, walk. German even has a verb for drying a horse off by walking it under saddle: trockenreiten.",
          es:"Se rasca, se fricciona, se camina. El alemán tiene un verbo para secar a un caballo montándolo al paso: trockenreiten.",
          it:"Si rascia, si friziona, si cammina. Il tedesco ha un verbo per asciugare un cavallo montandolo al passo: trockenreiten.",
          de:"Abziehen, frottieren, führen. Das Deutsche hat sogar ein Verb fürs Trockenreiten im Schritt: trockenreiten.",
          ja:"水をこそげ、こすり、歩かせて乾かします。ドイツ語には、常歩で乗って乾かすことを表す動詞まであります：trockenreiten。" } },

  { ref:"graisser", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"graisser les pieds"}, en:{m:"to oil the hooves", p:"oïl ze houvz"},
           es:{m:"engrasar los cascos"}, it:{m:"ingrassare gli zoccoli"},
           de:{m:"die Hufe einfetten", p:"aïn-fè-teune"}, ja:{m:"蹄油を塗る", p:"teiyu o nuru"} },
    def:{ fr:"Dernier geste du pansage de concours, sur un pied propre et sec, sole comprise.",
          en:"The last step before a show, on a clean dry foot, sole included.",
          es:"Último gesto de la limpieza de concurso, sobre un pie limpio y seco, palma incluida.",
          it:"Ultimo gesto della pulizia da concorso, su un piede pulito e asciutto, suola compresa.",
          de:"Der letzte Handgriff der Turnierpflege, am sauberen, trockenen Huf, Sohle inklusive.",
          ja:"競技会前の手入れの締めくくり。きれいに乾いた蹄に、蹄底まで含めて塗ります。" } },

  { ref:"eponger-yeux", lecon:3, coll:"gestes", v:true,
    mots:{ fr:{m:"éponger les yeux"}, en:{m:"to sponge the eyes", p:"sponndj ze aïz"},
           es:{m:"limpiar los ojos"}, it:{m:"pulire gli occhi"},
           de:{m:"die Augen auswaschen", p:"aou-gueune aouss-va-cheune"}, ja:{m:"目を拭く", p:"me o fuku"} },
    def:{ fr:"À l'eau claire, avec l'éponge réservée à la tête, du coin de l'œil vers l'extérieur. Puis les naseaux.",
          en:"With clean water and the head sponge only, from the inner corner outwards. Then the nostrils.",
          es:"Con agua limpia, con la esponja reservada a la cabeza, del lagrimal hacia fuera. Luego los ollares.",
          it:"Ad acqua pulita, con la spugna riservata alla testa, dall'angolo dell'occhio verso l'esterno. Poi le narici.",
          de:"Mit klarem Wasser und dem Kopf-Schwamm, vom Augenwinkel nach außen. Danach die Nüstern.",
          ja:"きれいな水と、頭専用のスポンジで。目頭から外側へ。それから鼻孔を。" } },

  /* ============ LEÇON 4 · CE QU'ON ENLÈVE, CE QU'ON REPÈRE ============ */

  /* ============ LEÇON 4 · CE QU'ON ENLÈVE, CE QU'ON REPÈRE ============ */

  { ref:"boue", lecon:4, coll:"etat",
    mots:{ fr:{m:"la boue"}, en:{m:"the mud", p:"meud"},
           es:{m:"el barro"}, it:{m:"il fango"},
           de:{m:"der Schlamm", p:"chlam", var:"der Matsch, courant"}, ja:{m:"泥", p:"doro"} },
    def:{ fr:"On la laisse sécher avant de l'enlever : brossée mouillée, elle s'incruste dans le poil.",
          en:"Let it dry before removing it: brushed wet, it works into the coat.",
          es:"Se deja secar antes de quitarla: cepillada mojada, se incrusta en el pelo.",
          it:"Si lascia asciugare prima di toglierlo: spazzolato bagnato, si incrosta nel pelo.",
          de:"Man lässt ihn trocknen, bevor man ihn entfernt: Nass gebürstet, setzt er sich im Fell fest.",
          ja:"泥は乾いてから落とすこと。濡れたままブラシをかけると、毛の中に入り込んでしまいます。" } },

  { ref:"sueur", lecon:4, coll:"etat",
    mots:{ fr:{m:"la sueur"}, en:{m:"the sweat", p:"souètt"},
           es:{m:"el sudor"}, it:{m:"il sudore"},
           de:{m:"der Schweiß", p:"chvaïss"}, ja:{m:"汗", p:"ase"} },
    def:{ fr:"Séchée sur le poil, elle irrite, surtout sous la selle et la sangle. À racler ou rincer après chaque séance.",
          en:"Left to dry on the coat it irritates, especially under saddle and girth. Scrape or rinse it off after every session.",
          es:"Seca sobre el pelo, irrita, sobre todo bajo la silla y la cincha. Se rasca o se aclara tras cada sesión.",
          it:"Seccato sul pelo, irrita, soprattutto sotto la sella e la cinghia. Da rasciare o sciacquare dopo ogni seduta.",
          de:"Auf dem Fell getrocknet reizt er, vor allem unter Sattel und Gurt. Nach jeder Einheit abziehen oder abspülen.",
          ja:"毛の上で乾くと肌を刺激します。特に鞍と腹帯の下は。毎回の運動後にこそげるか、洗い流すこと。" } },

  { ref:"noeud", lecon:4, coll:"etat",
    mots:{ fr:{m:"le nœud"}, en:{m:"the tangle", p:"tan-gueul", var:"knot"},
           es:{m:"el enredo", var:"el nudo"}, it:{m:"il nodo"},
           de:{m:"der Knoten", p:"knô-teune", var:"der Filz = crins feutrés"}, ja:{m:"絡まり", p:"karamari"} },
    def:{ fr:"Dans la crinière ou la queue. L'allemand a un mot pour le stade suivant, quand les crins sont feutrés : der Filz.",
          en:"In the mane or the tail. German has a word for the next stage, when the hair has matted: der Filz.",
          es:"En la crin o la cola. El alemán tiene una palabra para la fase siguiente, cuando las cerdas se afieltran: der Filz.",
          it:"Nella criniera o nella coda. Il tedesco ha una parola per lo stadio successivo, quando i crini si infeltriscono: der Filz.",
          de:"In Mähne oder Schweif. Fürs nächste Stadium, wenn das Haar verfilzt, hat das Deutsche ein eigenes Wort: der Filz.",
          ja:"たてがみや尾にできるもつれ。その先の段階 — 毛がフェルト状に固まった状態 — をドイツ語は一語で言います：der Filz。" } },

  { ref:"propre", lecon:4, coll:"etat",
    mots:{ fr:{m:"propre"}, en:{m:"clean", p:"kline"},
           es:{m:"limpio"}, it:{m:"pulito"},
           de:{m:"sauber", p:"zao-beur"}, ja:{m:"きれい", p:"kirei"} },
    def:{ fr:"Le mot qu'on entend quand le pansage est validé. En japonais, きれい veut dire à la fois propre et beau.",
          en:"The word you hear once the grooming passes. In Japanese, きれい means both clean and beautiful.",
          es:"La palabra que se oye cuando la limpieza está validada. En japonés, きれい significa a la vez limpio y bonito.",
          it:"La parola che si sente quando la pulizia è approvata. In giapponese きれい significa insieme pulito e bello.",
          de:"Das Wort, das fällt, wenn das Putzen abgenommen ist. Im Japanischen heißt きれい sauber und schön zugleich.",
          ja:"手入れに合格したときに聞こえてくる言葉。日本語の「きれい」は、清潔と美しさの両方を意味します。" } },

  { ref:"sale", lecon:4, coll:"etat",
    mots:{ fr:{m:"sale"}, en:{m:"dirty", p:"deur-ti"},
           es:{m:"sucio"}, it:{m:"sporco"},
           de:{m:"schmutzig", p:"chmout-sirh"}, ja:{m:"汚い", p:"kitanai"} },
    def:{ fr:"À entendre sans se vexer : dans une écurie, c'est une consigne, pas un reproche.",
          en:"Not to be taken personally: on a yard it is an instruction, not a criticism.",
          es:"Hay que oírlo sin ofenderse: en una cuadra es una consigna, no un reproche.",
          it:"Da sentire senza offendersi: in scuderia è una consegna, non un rimprovero.",
          de:"Ohne Kränkung zu hören: Im Stall ist es eine Ansage, kein Vorwurf.",
          ja:"むっとせずに聞くこと。厩舎では、これは指示であって非難ではありません。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"ou-boite", lecon:1,
      fr:"Où est la boîte de pansage ?",
      en:"Where's the grooming kit ?",
      es:"¿ Dónde está la caja de limpieza ?",
      it:"Dov'è la cassetta della pulizia ?",
      de:"Wo ist der Putzkasten ?",
      ja:"手入れ用具 は どこ です か ?" },
    { ref:"passe-cure-pied", lecon:1,
      fr:"Tu me passes le cure-pied ?",
      en:"Can you pass me the hoof pick ?",
      es:"¿ Me pasas el escarbador ?",
      it:"Mi passi il curasnetta ?",
      de:"Kannst du mir den Hufkratzer geben ?",
      ja:"裏掘り を 取って もらえ ます か ?" },
    { ref:"pieds-avant-seller", lecon:3,
      fr:"Je cure les pieds avant de seller.",
      en:"I pick his feet out first.",
      es:"Limpio los cascos antes de ensillar.",
      it:"Pulisco i piedi prima di sellare.",
      de:"Ich kratze die Hufe vorm Satteln.",
      ja:"鞍 の 前 に 裏掘り し ます。" },
    { ref:"sensible-membres", lecon:2,
      fr:"Attention, elle est sensible aux membres.",
      en:"Careful, she's touchy about her legs.",
      es:"Cuidado, es sensible en las patas.",
      it:"Attenzione, è sensibile agli arti.",
      de:"Vorsicht, sie ist an den Beinen empfindlich.",
      ja:"脚 を 触ら れる の が 苦手 です 。" },
    { ref:"couvert-boue", lecon:4,
      fr:"Laisse la boue sécher d'abord.",
      en:"Let the mud dry first.",
      es:"Deja secar el barro primero.",
      it:"Lascia asciugare il fango prima.",
      de:"Lass den Schlamm erst trocknen.",
      ja:"泥 は まず 乾かし て。" },
    { ref:"demeler-queue", lecon:3,
      fr:"Tu peux me démêler sa queue ?",
      en:"Could you comb out her tail for me ?",
      es:"¿ Me puedes desenredar la cola ?",
      it:"Mi puoi districare la coda ?",
      de:"Kannst du ihr den Schweif auskämmen ?",
      ja:"尾 の 絡まり を ほどいて もらえ ます か ?" },
    { ref:"sue-racler", lecon:4,
      fr:"Il a sué, je le fais marcher.",
      en:"He's sweated up — I'll walk him.",
      es:"Ha sudado, lo hago caminar.",
      it:"Ha sudato, lo faccio camminare.",
      de:"Er hat geschwitzt, ich führe ihn.",
      ja:"汗 を かい た ので 歩か せ ます。" }
  ],

  /* ==================================================================
     LE DIALOGUE DE LAMBOURN — 15 août 2026, session 214.

     LA SCÈNE : on te confie un cheval à préparer, et on te dit comment
     il va. 20 phrases, 6 temps, 5 entendues.

     🟥 LE CRITÈRE DE BLANDINE (15/08) : une phrase n'existe QUE si on
     la dit vraiment sur place. Un mot du lexique n'a PAS besoin d'une
     phrase — il s'apprend en lisant.
     LAISSÉS AU LEXIQUE SEUL, exprès : la brosse à eau, la tondeuse, le
     toupet, la sole, la fourchette, la poussière, la mue, la tache,
     l'éclat, la tique. NE PAS « compléter » le dialogue avec eux.

     ⚠️ REGISTRE ANGLAIS D'ÉCURIE : `the dandy brush`, `the curry comb`,
     `the hoof pick`, `to pick out the feet`, `the sweat scraper`,
     `to plait` (prononcé « platt » — `to braid` en varEn américain).
     Pièges déjà portés par le fichier : `frog` pour la fourchette,
     `clippers` jamais `mower`, et en espagnol `casco` = le sabot ET le
     casque.

     `dit` : "joueuse" = elle produit · "club" = elle entend et comprend.
  ================================================================== */
  dialogue: {
    ville: "lambourn", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · on me confie le cheval ---- */
      { ref:"d-panser-avant", temps:1, dit:"club", mots:["panser"],
        fr:"Tu peux le panser avant la reprise ?",
        en:"Could you groom him before the lesson?",
        es:"¿Puedes limpiarlo antes de la clase?",
        it:"Puoi pulirlo prima della lezione?",
        de:"Kannst du ihn vor der Stunde putzen?",
        ja:"レッスン の 前 に 手入れ を し て もらえ ます か ?" },

      { ref:"d-ou-boite-pansage", temps:1, dit:"joueuse", mots:["boite-pansage"],
        fr:"Où est la boîte de pansage ?",
        en:"Where's the grooming kit?",
        es:"¿Dónde está la caja de limpieza?",
        it:"Dov'è la cassetta della pulizia?",
        de:"Wo ist der Putzkasten?",
        ja:"手入れ用具入れ は どこ です か ?" },

      { ref:"d-emprunter-etrille", temps:1, dit:"joueuse", mots:["etrille"],
        fr:"Est-ce que je peux emprunter une étrille ?",
        en:"Could I borrow a curry comb?",
        es:"¿Puedo coger prestada una rasqueta?",
        it:"Posso prendere in prestito una striglia?",
        de:"Kann ich mir einen Striegel leihen?",
        ja:"ゴムブラシ を 借り て も いい です か ?" },

      /* ---- temps 2 · il est sale ---- */
      { ref:"d-couvert-boue", temps:2, dit:"joueuse", mots:["boue"],
        fr:"Il est couvert de boue.",
        en:"He's covered in mud.",
        es:"Está cubierto de barro.",
        it:"È coperto di fango.",
        de:"Er ist voller Schlamm.",
        ja:"泥 だらけ です。" },

      { ref:"d-r-etrille-puis-brosse", temps:2, dit:"club", mots:["etrille","brosse-dure"],
        fr:"Commence par l'étrille, ensuite la brosse dure.",
        en:"Start with the curry comb, then the dandy brush.",
        es:"Empieza con la rasqueta, después el cepillo duro.",
        it:"Comincia con la striglia, poi la brusca.",
        de:"Fang mit dem Striegel an, dann die Wurzelbürste.",
        ja:"まず ゴムブラシ、 次 に 泥落とし ブラシ です。" },

      { ref:"d-brosser-avant-pieds", temps:2, dit:"joueuse", mots:["brosser","curer-pieds"],
        fr:"Est-ce que je le brosse avant ou après les pieds ?",
        en:"Do I brush him before or after picking out his feet?",
        es:"¿Lo cepillo antes o después de limpiarle los cascos?",
        it:"Lo spazzolo prima o dopo aver pulito gli zoccoli?",
        de:"Bürste ich ihn vor oder nach dem Hufeauskratzen?",
        ja:"裏掘り の 前 に ブラシ を かけ ます か、 あと です か ?" },

      /* ---- temps 3 · les pieds ---- */
      { ref:"d-curer-pieds", temps:3, dit:"joueuse", mots:["curer-pieds","cure-pied"],
        fr:"Est-ce que je cure les pieds ?",
        en:"Shall I pick out his feet?",
        es:"¿Le limpio los cascos?",
        it:"Gli pulisco gli zoccoli?",
        de:"Soll ich die Hufe auskratzen?",
        ja:"裏掘り を し ます か ?" },

      { ref:"d-r-quatre-pieds", temps:3, dit:"club", mots:["curer-pieds"],
        fr:"Toujours les quatre pieds, avant de seller.",
        en:"Always all four feet, before you tack up.",
        es:"Siempre los cuatro cascos, antes de ensillar.",
        it:"Sempre tutti e quattro gli zoccoli, prima di sellare.",
        de:"Immer alle vier Hufe, bevor du sattelst.",
        ja:"必ず 四本 とも、 鞍 を 置く 前 に。" },

      /* 🟥 19/08 : `mots:["sabot"]` RETIRÉ — `sabot` est parti à FLYINGE
         (« le pied », chapitre du pied et de la maréchalerie). La phrase
         reste, elle est naturelle et elle amène `curer-pieds` juste
         après ; elle n'enseigne simplement plus de mot.
         ⚠️ CHOIX PROVISOIRE DE CLAUDE, NON VALIDÉ PAR BLANDINE. Deux
         autres options étaient posées : garder `sabot` en révision (mais
         Lambourn est l'étape 5 et Flyinge la 36e, le mot serait inconnu),
         ou réécrire la phrase vers un mot conservé. */
      { ref:"d-pierre-sabot", temps:3, dit:"joueuse", mots:[],
        fr:"Il y a une pierre dans le sabot.",
        en:"There's a stone in his hoof.",
        es:"Tiene una piedra en el casco.",
        it:"C'è un sasso nello zoccolo.",
        de:"Da ist ein Stein im Huf.",
        ja:"蹄 に 石 が 挟まっ て い ます。" },

      { ref:"d-graisser-pieds", temps:3, dit:"joueuse", mots:["graisser","graisse-pieds"],
        fr:"Est-ce qu'il faut graisser les pieds ?",
        en:"Do the hooves need oiling?",
        es:"¿Hay que engrasar los cascos?",
        it:"Bisogna ingrassare gli zoccoli?",
        de:"Müssen die Hufe eingefettet werden?",
        ja:"蹄油 を 塗り ます か ?" },

      /* ---- temps 4 · la crinière et la queue ---- */
      { ref:"d-queue-noeuds", temps:4, dit:"joueuse", mots:["queue","noeud"],
        fr:"Sa queue est pleine de nœuds.",
        en:"His tail is full of tangles.",
        es:"Tiene la cola llena de enredos.",
        it:"Ha la coda piena di nodi.",
        de:"Sein Schweif ist völlig verknotet.",
        ja:"尻尾 が 絡まっ て い ます。" },

      { ref:"d-demeler-peigne", temps:4, dit:"joueuse", mots:["demeler","peigne"],
        fr:"Est-ce que je peux démêler avec un peigne ?",
        en:"Can I comb it out with a mane comb?",
        es:"¿Puedo desenredarla con un peine?",
        it:"Posso districarla con un pettine?",
        de:"Kann ich ihn mit einem Mähnenkamm auskämmen?",
        ja:"くし で ほどい て も いい です か ?" },

      { ref:"d-tresser-concours", temps:4, dit:"joueuse", mots:["tresser","criniere"],
        fr:"Est-ce qu'il faut le tresser pour le concours ?",
        en:"Does he need plaiting for the show?",
        varEn:"Does he need braiding for the show?",
        es:"¿Hay que trenzarlo para el concurso?",
        it:"Bisogna intrecciarlo per il concorso?",
        de:"Muss er für das Turnier eingeflochten werden?",
        ja:"競技 の ため に たてがみ を 編み ます か ?" },

      /* ---- temps 5 · ce qu'il ne faut pas faire ---- */
      { ref:"d-sensible-quelque-part", temps:5, dit:"joueuse", mots:[],
        fr:"Est-ce qu'il est sensible quelque part ?",
        en:"Is he ticklish anywhere?",
        es:"¿Es sensible en alguna parte?",
        it:"È sensibile da qualche parte?",
        de:"Ist er irgendwo empfindlich?",
        ja:"どこか 敏感 な ところ が あり ます か ?" },

      { ref:"d-r-attention-membres", temps:5, dit:"club", mots:["membres"],
        fr:"Fais attention aux membres, il n'aime pas.",
        en:"Mind his legs — he doesn't like it.",
        es:"Ten cuidado con las patas, no le gusta.",
        it:"Attenta agli arti, non gli piace.",
        de:"Pass bei den Beinen auf, das mag er nicht.",
        ja:"肢 に は 気 を つけ て。 嫌がり ます。" },

      { ref:"d-eponger-yeux", temps:5, dit:"joueuse", mots:["eponger-yeux","eponge"],
        fr:"Est-ce que je peux lui éponger les yeux ?",
        en:"Can I sponge his eyes?",
        es:"¿Puedo limpiarle los ojos?",
        it:"Posso pulirgli gli occhi?",
        de:"Kann ich ihm die Augen auswaschen?",
        ja:"目 を 拭い て も いい です か ?" },

      /* ---- temps 6 · après le travail ---- */
      { ref:"d-en-sueur", temps:6, dit:"joueuse", mots:["sueur"],
        fr:"Il est en sueur.",
        en:"He's sweating.",
        es:"Está sudando.",
        it:"È sudato.",
        de:"Er schwitzt.",
        ja:"汗 を かい て い ます。" },

      { ref:"d-couteau-chaleur", temps:6, dit:"joueuse", mots:["couteau-chaleur"],
        fr:"Est-ce que je passe le couteau de chaleur ?",
        en:"Shall I use the sweat scraper?",
        es:"¿Le paso la rasqueta de sudor?",
        it:"Passo il raschiatoio?",
        de:"Soll ich das Schweißmesser nehmen?",
        ja:"汗取り を 使い ます か ?" },

      { ref:"d-r-secher-avant-rentrer", temps:6, dit:"club", mots:["secher"],
        fr:"Sèche-le bien avant de le rentrer.",
        en:"Dry him off properly before you bring him in.",
        es:"Sécalo bien antes de meterlo.",
        it:"Asciugalo bene prima di riportarlo in box.",
        de:"Trockne ihn gut ab, bevor du ihn hereinholst.",
        ja:"馬房 に 戻す 前 に、 しっかり 乾かし て ください。" },

      { ref:"d-assez-propre", temps:6, dit:"joueuse", mots:["propre"],
        fr:"Est-ce qu'il est assez propre ?",
        en:"Is he clean enough?",
        es:"¿Está lo bastante limpio?",
        it:"È abbastanza pulito?",
        de:"Ist er sauber genug?",
        ja:"これ で 十分 きれい です か ?" }
    ]
  }
};
