/* hype-lingo-lex-vejer.js — Hype Lingo · Chapitre « Le matériel »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-materiel.js, leçons 3
   et 4 — AUCUN ref, AUCUNE définition modifiée. Seul le nom de la clé
   de chapitre change : `materiel` devient `vejer`. Le dialogue
   `dialogueVejer` est renommé `dialogue` (un seul dialogue ici).

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE.

   DEUX LEÇONS CONSERVÉES À L'IDENTIQUE (tags inchangés, y compris
   l'ordre physique d'origine où `veste-concours`, lecon 3, apparaît
   après le début de la leçon 4 dans le fichier source) :
     · leçon 3 — le cavalier (11 concepts)
     · leçon 4 — concours et protections (18 concepts)

   La leçon 1 (Walsall) et la leçon 2 (orpheline, le filet) sont
   déplacées séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.vejer = {
  ref: "vejer",
  titre: { fr:"Le matériel", en:"The tack", es:"El equipo", it:"L'attrezzatura", de:"Die Ausrüstung", ja:"馬具" },
  lecons: 2,

  concepts: [

  { ref:"bombe", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la bombe", var:"le casque"}, en:{m:"the riding hat", p:"raï-ding hatt", var:"helmet · skull cap"},
           es:{m:"el casco"}, it:{m:"il caschetto"},
           de:{m:"der Reithelm", p:"raït-hèlm"}, ja:{m:"ヘルメット", p:"herumetto", var:"乗馬帽"} },
    def:{ fr:"Obligatoire, sans discussion, et à remplacer après toute chute. ⚠️ En Grande-Bretagne, « hat » suffit et sous-entend toujours la bombe : « get your hat » ne veut pas dire un chapeau.",
          en:"Compulsory, no argument, and replaced after any fall. In Britain « hat » alone always means the riding hat.",
          es:"Obligatorio, sin discusión, y a sustituir tras toda caída. ⚠️ En Gran Bretaña, « hat » basta y sobreentiende siempre el casco: « get your hat » no significa un sombrero.",
          it:"Obbligatorio, senza discussione, e da sostituire dopo ogni caduta. ⚠️ In Gran Bretagna « hat » basta e sottintende sempre il cap: « get your hat » non vuol dire un cappello.",
          de:"Pflicht, ohne Diskussion, und nach jedem Sturz zu ersetzen. ⚠️ In Großbritannien genügt « hat » und meint immer den Reithelm: « get your hat » heißt nicht Hut.",
          ja:"議論の余地なく義務。落馬したら必ず買い替えます。⚠️ イギリスでは « hat » だけで常にヘルメットを意味します。« get your hat » は帽子のことではありません。" } },

  { ref:"gilet", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet de protection"}, en:{m:"the body protector", p:"bo-di pro-tèk-teur"},
           es:{m:"el chaleco protector"}, it:{m:"il corpetto protettivo"},
           de:{m:"die Sicherheitsweste", p:"zi-cheur-haïts-vès-te"}, ja:{m:"プロテクター", p:"purotekutā"} },
    def:{ fr:"Obligatoire en cross et pour les jeunes cavaliers dans beaucoup de clubs. Il se choisit à la taille exacte : trop grand, il ne protège plus.",
          en:"Compulsory for cross-country and for young riders in many clubs. It must fit exactly: too big and it no longer protects.",
          es:"Obligatorio en cross y para los jinetes jóvenes en muchos clubes. Se elige a la talla exacta: demasiado grande, ya no protege.",
          it:"Obbligatorio in cross e per i giovani cavalieri in molti club. Si sceglie della taglia esatta: troppo grande, non protegge più.",
          de:"Pflicht im Gelände und für junge Reiter in vielen Ställen. In der exakten Größe wählen: Zu groß schützt sie nicht mehr.",
          ja:"クロスでは義務、多くのクラブでは若い騎手にも義務。サイズはぴったりを選ぶこと。大きすぎるものは、もう守ってくれません。" } },

  { ref:"airbag", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"le gilet airbag"}, en:{m:"the air jacket", p:"èr dja-kette", var:"air vest"},
           es:{m:"el chaleco airbag"}, it:{m:"il gilet airbag"},
           de:{m:"die Airbagweste", p:"èr-bag-vès-te"}, ja:{m:"エアバッグベスト", p:"eabaggu besuto"} }, // ??
    def:{ fr:"Relié à la selle par une cordelette qui déclenche la cartouche à la chute. Se porte par-dessus le gilet de protection, jamais à la place.",
          en:"Linked to the saddle by a lanyard that fires the cartridge in a fall. Worn over a body protector, never instead of one.",
          es:"Unido a la silla por un cordón que dispara el cartucho en la caída. Se lleva encima del chaleco de protección, jamás en su lugar.",
          it:"Collegato alla sella da un cordino che fa scattare la cartuccia alla caduta. Si porta sopra il gilet di protezione, mai al suo posto.",
          de:"Über eine Reißleine mit dem Sattel verbunden, die beim Sturz die Kartusche auslöst. Wird über der Schutzweste getragen, nie statt ihrer.",
          ja:"鞍とコードでつながれ、落馬の瞬間にカートリッジが作動します。着るのはプロテクターベストの上から。代わりにではありません。" } },

  { ref:"culotte", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la culotte d'équitation"}, en:{m:"the breeches", p:"bri-tchiz", var:"jodhpurs = longues"},
           es:{m:"el pantalón de montar"}, it:{m:"i pantaloni da equitazione"},
           de:{m:"die Reithose", p:"raït-hô-ze"}, ja:{m:"キュロット", p:"kyurotto"} },
    def:{ fr:"⚠️ Deux mots anglais, deux longueurs : les **breeches** s'arrêtent au mollet et se portent avec des bottes, les **jodhpurs** descendent à la cheville et se portent avec des boots. Le japonais, lui, a emprunté le français : キュロット.",
          en:"Two English words, two lengths: breeches stop at the calf and go with tall boots, jodhpurs reach the ankle and go with short boots.",
          es:"⚠️ Dos palabras inglesas, dos largos: los **breeches** se detienen en la pantorrilla y se llevan con botas, los **jodhpurs** bajan al tobillo y se llevan con botines. El japonés tomó prestado el francés: キュロット.",
          it:"⚠️ Due parole inglesi, due lunghezze: i **breeches** si fermano al polpaccio e si portano con gli stivali, i **jodhpurs** scendono alla caviglia e si portano con gli stivaletti. Il giapponese ha preso in prestito il francese: キュロット.",
          de:"⚠️ Zwei englische Wörter, zwei Längen: **breeches** enden an der Wade und gehören zu Stiefeln, **jodhpurs** reichen zum Knöchel und gehören zu Stiefeletten. Das Japanische entlieh das Französische: キュロット.",
          ja:"⚠️ 英語には長さ違いの二語があります。ふくらはぎ丈でロングブーツと合わせる **breeches**、足首丈でショートブーツと合わせる **jodhpurs**。日本語はフランス語を借りました — キュロット。" } },

  { ref:"bottes", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les bottes"}, en:{m:"the riding boots", p:"raï-ding boutss", var:"long boots · jodhpur boots"},
           es:{m:"las botas de montar"}, it:{m:"gli stivali da equitazione"},
           de:{m:"die Reitstiefel", p:"raït-chti-feul"}, ja:{m:"長靴", p:"chōka"} }, // ??
    def:{ fr:"Talon marqué et semelle lisse, pour que le pied ne passe pas à travers l'étrier. Le japonais dit littéralement « chaussure longue » (長靴).",
          en:"A defined heel and a smooth sole, so the foot cannot slide through the stirrup. Japanese says literally « long shoe ».",
          es:"Tacón marcado y suela lisa, para que el pie no atraviese el estribo. El japonés dice literalmente « zapato largo » (長靴).",
          it:"Tacco netto e suola liscia, perché il piede non passi attraverso la staffa. Il giapponese dice alla lettera « scarpa lunga » (長靴).",
          de:"Klarer Absatz, glatte Sohle, damit der Fuß nicht durch den Bügel rutscht. Das Japanische sagt wörtlich « langer Schuh » (長靴).",
          ja:"かかとがあり、靴底がなめらかなブーツ。足が鐙を突き抜けないためです。日本語は文字どおり「長い靴」— 長靴と言います。" } },

  { ref:"minichaps", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les mini-chaps"}, en:{m:"the half chaps", p:"haf tchaps", var:"gaiters"},
           es:{m:"las medias polainas"}, it:{m:"i gambali"}, // ??
           de:{m:"die Minichaps", p:"mi-ni-tchaps"}, ja:{m:"ハーフチャップス", p:"hāfu chappusu"} }, // ??
    def:{ fr:"La guêtre de cuir ou de tissu qui remplace la botte haute, portée sur des boots. Le mot anglais chaps vient de l'espagnol des vaqueros, chaparreras.",
          en:"The leather or fabric wrap that replaces a tall boot, worn over short boots. « Chaps » comes from the Spanish of the vaqueros.",
          es:"La polaina de cuero o tela que sustituye a la bota alta, llevada sobre botines. La palabra inglesa chaps viene del español de los vaqueros, chaparreras.",
          it:"La ghetta di cuoio o tessuto che sostituisce lo stivale alto, portata su stivaletti. La parola inglese chaps viene dallo spagnolo dei vaqueros, chaparreras.",
          de:"Die Leder- oder Stoffgamasche, die den hohen Stiefel ersetzt, über Stiefeletten getragen. Das englische chaps kommt aus dem Spanisch der Vaqueros: chaparreras.",
          ja:"ロングブーツの代わりにショートブーツの上へ着ける、革や布のゲートル。英語の chaps はバケーロたちのスペイン語 chaparreras から来ています。" } },

  { ref:"gants", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les gants"}, en:{m:"the gloves", p:"gleuvz"},
           es:{m:"los guantes"}, it:{m:"i guanti"},
           de:{m:"die Handschuhe", p:"hant-chou-e"}, ja:{m:"手袋", p:"tebukuro"} },
    def:{ fr:"Ils protègent des brûlures de rênes, surtout sous la pluie ou en longe. Blancs en dressage de concours, noirs le reste du temps.",
          en:"They save your hands from rein burns, especially in rain or on the lunge. White for dressage competition, black otherwise.",
          es:"Protegen de las quemaduras de riendas, sobre todo bajo la lluvia o dando cuerda. Blancos en doma de concurso, negros el resto del tiempo.",
          it:"Proteggono dalle bruciature di redini, soprattutto sotto la pioggia o alla longia. Bianchi in dressage da concorso, neri il resto del tempo.",
          de:"Schützen vor Zügelbrand, besonders bei Regen oder an der Longe. Weiß in der Turnierdressur, sonst schwarz.",
          ja:"手綱ずれのやけどから手を守ります。雨の日や調馬索では特に。競技会の馬場馬術では白、それ以外は黒です。" } },

  { ref:"cravache", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la cravache"}, en:{m:"the whip", p:"ouipp", var:"crop = courte · schooling whip = longue"},
           es:{m:"la fusta"}, it:{m:"il frustino"},
           de:{m:"die Gerte", p:"guèr-te"}, ja:{m:"鞭", p:"muchi"} },
    def:{ fr:"Une aide, jamais une punition. ⚠️ L'anglais a trois mots selon la longueur : **crop** (courte, obstacle), **whip** (générique), **schooling whip** ou **dressage whip** (longue, sur le plat).",
          en:"An aid, never a punishment. English has three words by length: crop, whip, and schooling or dressage whip.",
          es:"Una ayuda, jamás un castigo. ⚠️ El inglés tiene tres palabras según el largo: **crop** (corta, salto), **whip** (genérico), **schooling whip** o **dressage whip** (larga, en llano).",
          it:"Un aiuto, mai una punizione. ⚠️ L'inglese ha tre parole secondo la lunghezza: **crop** (corta, ostacoli), **whip** (generico), **schooling whip** o **dressage whip** (lunga, in piano).",
          de:"Eine Hilfe, nie eine Strafe. ⚠️ Das Englische hat drei Wörter je nach Länge: **crop** (kurz, Springen), **whip** (allgemein), **schooling whip** oder **dressage whip** (lang, auf dem Platz).",
          ja:"扶助であって、罰では決してありません。⚠️ 英語は長さで三語を使い分けます。短く障害用の **crop**、総称の **whip**、長く平地用の **schooling whip** / **dressage whip**。" } },

  { ref:"eperons", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"les éperons"}, en:{m:"the spurs", p:"speurz"},
           es:{m:"las espuelas"}, it:{m:"gli speroni"},
           de:{m:"die Sporen", p:"chpô-reune"}, ja:{m:"拍車", p:"hakusha"} },
    def:{ fr:"Réservés à une jambe stable et indépendante. Beaucoup de clubs les interdisent avant un certain niveau, dans tous les pays.",
          en:"Only for a stable, independent leg. Many clubs forbid them below a certain level, in every country.",
          es:"Reservadas a una pierna estable e independiente. Muchos clubes las prohíben antes de cierto nivel, en todos los países.",
          it:"Riservati a una gamba stabile e indipendente. Molti club li vietano prima di un certo livello, in tutti i paesi.",
          de:"Nur für ein ruhiges, unabhängiges Bein. Viele Ställe verbieten sie vor einem gewissen Niveau — in allen Ländern.",
          ja:"安定した独立の効いた脚だけに許されるもの。どの国でも、多くのクラブが一定レベルまでは禁止しています。" } },

  { ref:"tenue", lecon:3, coll:"cavalier",
    mots:{ fr:{m:"la tenue"}, en:{m:"the kit", p:"kitt", var:"gear"},
           es:{m:"el equipo"}, it:{m:"l'attrezzatura"},
           de:{m:"die Ausrüstung", p:"aouss-rus-toung"}, ja:{m:"装備", p:"sōbi"} },
    def:{ fr:"L'ensemble de ce que porte le cavalier. ⚠️ En anglais, **kit** désigne les affaires du cavalier et **tack** celles du cheval : ne pas les échanger.",
          en:"Everything the rider wears. In English, kit is the rider's things and tack the horse's — do not swap them.",
          es:"El conjunto de lo que lleva el jinete. ⚠️ En inglés, **kit** designa las cosas del jinete y **tack** las del caballo: no intercambiarlas.",
          it:"L'insieme di ciò che porta il cavaliere. ⚠️ In inglese **kit** indica le cose del cavaliere e **tack** quelle del cavallo: non scambiarle.",
          de:"Alles, was der Reiter trägt. ⚠️ **Kit** meint die Sachen des Reiters, **tack** die des Pferdes: nicht vertauschen.",
          ja:"騎手が身につけるもの一式。⚠️ 英語では騎手のものが **kit**、馬のものが **tack**。取り違えないこと。" } },

  /* ============ LEÇON 4 · PROTECTIONS ET GESTES ============ */

  /* ================================================================
     SEPT ENTRÉES AJOUTÉES le 17/08/2026, pour VEJER — d'après le lexique
     fourni par Blandine.

     🟥 VEJER REÇOIT LES LEÇONS 3 ET 4 de ce fichier (22 mots), décision
     du 17/08. Son chapitre s'appelle « Le matériel » et ses phrases
     mélangent volontairement : matériel du cheval, tenue du cavalier,
     matériel de concours, matériel de rechange.
     ⚠️ SÉVILLE PERD DONC LA LEÇON 3. Elle attend un chapitre qui lui
     ressemble vraiment : Séville c'est la Feria de Abril, la parade — le
     costume, les tresses, la selle andalouse, l'attelage. La leçon 3
     contenait la bombe et le gilet airbag, qu'une amazone à la Feria ne
     porte pas. NE PAS lui rendre la leçon 3 par défaut.
     ⚠️ La leçon 2 (le filet, le mors, la bride) reste ORPHELINE.

     🟥 LE PIÈGE DU CHAPITRE, déjà dans ce fichier et rappelé par elle :
     **TACK ≠ KIT.** Le *tack* est ce que porte le cheval, le *kit* ou
     *gear* ce que porte le cavalier. Et « material » ne traduit JAMAIS
     « matériel d'équitation » : le mot collectif est *tack*.
     ================================================================ */

  { ref:"malle-concours", lecon:4, coll:"concours",
    mots:{ fr:{m:"la malle de concours"}, en:{m:"the tack trunk", p:"tak treunk"},
           es:{m:"el baúl de concurso"}, it:{m:"il baule da concorso"},
           de:{m:"die Turnierkiste", p:"tour-nir-kiss-te"}, ja:{m:"馬具トランク", p:"bagu toranku"} },
    def:{ fr:"⚠️ EN ANGLAIS **A TACK TRUNK**, jamais « a competition trunk ». C'est la malle qu'on charge dans le camion et qui contient tout : le matériel, les rechanges, les crampons, la clé, les produits de nettoyage. 🟥 La règle des concours : **tout ce qui n'est pas dans la malle n'existe pas** — on ne trouve rien sur place.",
          en:"« A tack trunk », never « a competition trunk ». The trunk you load into the lorry, holding everything: tack, spares, studs, the wrench, the cleaning kit. The rule of shows: whatever isn't in the trunk doesn't exist.",
          es:"En inglés « a tack trunk ». Es el baúl que se carga en el camión y contiene todo: material, repuestos, ramplones, la llave, los productos de limpieza.",
          it:"In inglese « a tack trunk ». È il baule che si carica nel camion e contiene tutto: materiale, ricambi, ramponi, la chiave, i prodotti.",
          de:"Englisch « a tack trunk ». Die Kiste, die in den Lkw kommt und alles enthält: Ausrüstung, Ersatzteile, Stollen, Schlüssel, Putzmittel.",
          ja:"英語では a tack trunk と言います。馬運車に積み込むトランクで、馬具、予備、滑り止め、レンチ、手入れ用品のすべてが入ります。競技会の掟：トランクに入っていない物は存在しないのと同じです。" } },

  { ref:"de-rechange", lecon:4, coll:"concours",
    mots:{ fr:{m:"de rechange"}, en:{m:"spare", p:"spèr"},
           es:{m:"de repuesto"}, it:{m:"di riserva"},
           de:{m:"Ersatz-", p:"èr-zatts"}, ja:{m:"予備の", p:"yobi no"} },
    def:{ fr:"🟥 LE MOT LE PLUS UTILE DU CHAPITRE, et il se place devant tout : **a spare bridle**, *spare reins*, *a spare girth*, *a spare saddle pad*. ⚠️ En anglais **spare** est un ADJECTIF qui précède, et il ne se met jamais au pluriel dans cette position — on dit *spare reins*, pas « spares reins ». Employé seul comme nom, il devient *the spares* : « les rechanges ». La phrase à retenir : *always keep spares in the tack trunk*.",
          en:"The most useful word in the chapter, and it goes in front of everything: a spare bridle, spare reins, a spare girth. As an adjective it never takes an s in that position. Used alone as a noun it becomes « the spares ».",
          es:"La palabra más útil del capítulo: brida de repuesto, riendas de repuesto, cincha de repuesto. En inglés « spare » va delante.",
          it:"La parola più utile del capitolo: briglia di riserva, redini di riserva, sottopancia di riserva. In inglese « spare » precede il nome.",
          de:"Das nützlichste Wort des Kapitels: Ersatztrense, Ersatzzügel, Ersatzgurt. Im Englischen steht « spare » davor.",
          ja:"この章で最も役に立つ語。すべての名詞の前に置きます。a spare bridle、spare reins、a spare girth。形容詞なので、この位置では複数形になりません。名詞として単独で使うと the spares（予備一式）になります。" } },

  { ref:"cle-crampons", lecon:4, coll:"concours",
    mots:{ fr:{m:"la clé à crampons"}, en:{m:"the stud wrench", p:"steud rènntch", var:"the stud spanner (UK)"},
           es:{m:"la llave de ramplones"}, it:{m:"la chiave per ramponi"},
           de:{m:"der Stollenschlüssel", p:"chto-leune-chlu-sseul"}, ja:{m:"滑り止め用レンチ", p:"suberidome-yō renchi"} },
    def:{ fr:"⚠️ DEUX MOTS POUR LE MÊME OUTIL : les Britanniques disent **a spanner**, les Américains **a wrench**. La même différence que pour toutes les clés — *a spanner* n'existe pas en anglais américain. 🟥 Elle vit dans la malle avec un écouvillon et de l'huile : les trous des fers se bouchent de terre entre deux concours, et un crampon qu'on ne peut pas visser ne sert à rien.",
          en:"Two words for one tool: British riders say a spanner, Americans a wrench. It lives in the trunk with a tap and some oil — stud holes clog with dirt between shows, and a stud you can't screw in is no use.",
          es:"Dos palabras para la misma herramienta según el país. Vive en el baúl con un limpiador de roscas y aceite.",
          it:"Due parole per lo stesso attrezzo secondo il paese. Vive nel baule con uno scovolino e un po' d'olio.",
          de:"Zwei Wörter für dasselbe Werkzeug, je nach Land. Er liegt in der Kiste zusammen mit einem Gewindeschneider und Öl.",
          ja:"同じ工具に二つの語があります。イギリスでは spanner、アメリカでは wrench。トランクの中でネジ穴掃除の道具と油と一緒に置いておきます。蹄鉄のネジ穴は競技会の間に土で詰まり、ねじ込めない滑り止めは役に立ちません。" } },

  { ref:"veste-concours", lecon:3, coll:"tenue",
    mots:{ fr:{m:"la veste de concours"}, en:{m:"the show jacket", p:"chô djè-kite"},
           es:{m:"la chaqueta de concurso"}, it:{m:"la giacca da concorso"},
           de:{m:"das Turnierjackett", p:"tour-nir-ja-kète"}, ja:{m:"競技用ジャケット", p:"kyōgiyō jaketto"} },
    def:{ fr:"⚠️ AVEC LA CULOTTE BLANCHE, c'est la tenue de piste. En anglais **breeches** est toujours au pluriel, comme « trousers » — on ne dit jamais « a breech ». 🟥 Et « le pantalon blanc » d'un concours se dit *white breeches*, jamais *white trousers* : le mot désigne une coupe d'équitation, pas un pantalon.",
          en:"With white breeches, this is the ring outfit. « Breeches » is always plural, like trousers — never « a breech ». And show breeches are « white breeches », never « white trousers »: the word means a riding cut.",
          es:"Con el pantalón blanco, es la ropa de pista. En inglés « breeches » va siempre en plural.",
          it:"Con i pantaloni bianchi, è la tenuta da campo. In inglese « breeches » è sempre plurale.",
          de:"Mit der weißen Reithose ist das die Turnierkleidung. Englisch « breeches » steht immer im Plural.",
          ja:"白いキュロットと合わせて、競技用の服装になります。英語の breeches は trousers と同じく常に複数形で、単数形はありません。" } },

  { ref:"bandes-repos", lecon:4, coll:"protection",
    mots:{ fr:{m:"les bandes de repos"}, en:{m:"stable bandages", p:"sté-beul bann-di-djiz"},
           es:{m:"las vendas de descanso"}, it:{m:"le fasce da riposo"},
           de:{m:"die Stallbandagen", p:"chtall-bann-da-gueune"}, ja:{m:"厩舎用バンテージ", p:"kyūsha-yō banteji"} },
    def:{ fr:"🟥 EN ANGLAIS ON DIT **STABLE BANDAGES**, jamais « rest bandages » : le mot dit OÙ on les met, pas pourquoi. On les pose le soir, après l'effort ou le transport, toujours sur du coton — jamais à même la peau. ⚠️ TROIS SORTES DE BANDES, à ne pas confondre : les *exercise bandages* pour le travail, les *stable bandages* pour la nuit, et les **polo wraps** — nées du polo mais devenues un standard mondial, et qui ne protègent pas grand-chose.",
          en:"« Stable bandages », never « rest bandages »: the word says where they go, not why. Put on in the evening after work or travel, always over cotton, never straight onto the leg. Three kinds not to confuse: exercise bandages, stable bandages, and polo wraps.",
          es:"En inglés « stable bandages ». Se ponen por la tarde, después del trabajo o del transporte, siempre sobre algodón, nunca directamente sobre la piel.",
          it:"In inglese « stable bandages ». Si mettono la sera, dopo il lavoro o il trasporto, sempre sopra il cotone, mai a contatto con la pelle.",
          de:"Englisch « stable bandages ». Man legt sie abends an, nach Arbeit oder Transport, immer über Watte, nie direkt aufs Bein.",
          ja:"英語では stable bandages と言い、rest bandages とは言いません。「どこで使うか」を表す語です。運動や輸送のあと、夕方に巻きます。必ず綿の上から巻き、素肌に直接は巻きません。運動用、厩舎用、ポロ用の三種類を混同しないこと。" } },

  { ref:"coton", lecon:4, coll:"protection",
    mots:{ fr:{m:"le coton"}, en:{m:"the cottons", p:"ko-teunz", var:"quilted wraps"},
           es:{m:"el algodón"}, it:{m:"il cotone"},
           de:{m:"die Watte", p:"va-te"}, ja:{m:"綿パッド", p:"men paddo"} },
    def:{ fr:"⚠️ CE QU'ON MET SOUS LES BANDES, et jamais l'inverse : sans coton, une bande serre en une ligne et coupe la circulation. En anglais on dit **cottons** au pluriel pour les fines, **quilted wraps** pour les matelassées épaisses. 🟥 Une bande sans coton fait plus de mal que pas de bande du tout — c'est l'erreur la plus fréquente de l'écurie.",
          en:"What goes under the bandages, never the other way round: with no cotton a bandage bites in one line and cuts the circulation. « Cottons » for the thin ones, « quilted wraps » for the thick padded ones. A bandage without cotton does more harm than none at all.",
          es:"Lo que se pone debajo de las vendas, nunca al contrario: sin algodón la venda aprieta en una línea y corta la circulación.",
          it:"Ciò che si mette sotto le fasce, mai il contrario: senza cotone la fascia stringe su una linea e taglia la circolazione.",
          de:"Was unter die Bandagen kommt, nie umgekehrt: ohne Watte schnürt die Bandage in einer Linie ein.",
          ja:"バンテージの下に敷くもの。逆はありません。綿がないとバンテージが一本の線で締めつけ、血流を止めます。薄いものは cottons、厚いキルト状のものは quilted wraps と言います。綿なしのバンテージは、巻かないより有害です。" } },

  { ref:"argile", lecon:4, coll:"protection",
    mots:{ fr:{m:"l'argile"}, en:{m:"the clay", p:"kléï", var:"cooling clay"},
           es:{m:"la arcilla"}, it:{m:"l'argilla"},
           de:{m:"der Heilerde-Umschlag", p:"haïl-èr-de"}, ja:{m:"クレイ", p:"kurei"} },
    def:{ fr:"On l'étale épaisse sur les tendons après un gros effort, et les bandes de repos la maintiennent toute la nuit. Elle sèche en refroidissant, et se brosse au matin. ⚠️ Le verbe anglais est **to clay up** — *to clay up his legs* — et le produit **cooling clay**. Il n'y a pas de verbe équivalent en français : on dit « mettre de l'argile ».",
          en:"Spread thick on the tendons after hard work, held all night by stable bandages. It dries as it cools and brushes off in the morning. The verb is « to clay up » — to clay up his legs.",
          es:"Se extiende gruesa sobre los tendones después de un gran esfuerzo, y las vendas de descanso la mantienen toda la noche.",
          it:"Si stende spessa sui tendini dopo un grosso sforzo, e le fasce da riposo la tengono tutta la notte.",
          de:"Dick auf die Sehnen aufgetragen nach großer Anstrengung, von Stallbandagen über Nacht gehalten. Sie trocknet kühlend und wird morgens abgebürstet.",
          ja:"激しい運動のあと、腱に厚く塗ります。厩舎用バンテージで一晩押さえておきます。冷やしながら乾き、朝にブラシで落とします。英語には to clay up という動詞があり、フランス語にはありません。" } },

  { ref:"guetres", lecon:4, coll:"protections",
    mots:{ fr:{m:"les guêtres"}, en:{m:"the brushing boots", p:"breu-ching boutss", var:"boots · tendon boots"},
           es:{m:"las protecciones"}, it:{m:"i paracolpi"}, // ??
           de:{m:"die Gamaschen", p:"ga-ma-cheune"}, ja:{m:"プロテクター", p:"purotekutā"} }, // ??
    def:{ fr:"Elles protègent le membre des atteintes du membre opposé. ⚠️ En anglais, **boots** tout court peut désigner les guêtres du cheval comme les bottes du cavalier : le contexte décide.",
          en:"They protect a leg from being struck by the opposite one. In English, « boots » can mean the horse's or the rider's — context decides.",
          es:"Protegen la extremidad de los alcances de la extremidad opuesta. ⚠️ En inglés, **boots** a secas puede designar las protecciones del caballo o las botas del jinete: el contexto decide.",
          it:"Proteggono l'arto dai colpi dell'arto opposto. ⚠️ In inglese **boots** da solo può indicare le protezioni del cavallo come gli stivali del cavaliere: decide il contesto.",
          de:"Schützen das Bein vor Schlägen des Gegenbeins. ⚠️ **Boots** allein kann Gamaschen des Pferdes oder Stiefel des Reiters meinen — der Kontext entscheidet.",
          ja:"反対側の脚がぶつかる衝撃から脚を守ります。⚠️ 英語の **boots** 一語は、馬のプロテクターも騎手のブーツも指しえます。決めるのは文脈です。" } },

  { ref:"cloches", lecon:4, coll:"protections",
    mots:{ fr:{m:"les cloches"}, en:{m:"the over-reach boots", p:"ô-veur-ritch boutss", var:"bell boots (US)"},
           es:{m:"las campanas"}, it:{m:"le campane"},
           de:{m:"die Hufglocken", p:"houf-glo-keune"}, ja:{m:"ベルブーツ", p:"beru būtsu"} }, // ??
    def:{ fr:"Elles protègent le talon et le fer antérieur d'un postérieur qui rattrape. Trois langues sur six ont gardé l'image de la cloche.",
          en:"They protect the heel and front shoe from a hind foot catching up. Three of the six languages kept the bell image.",
          es:"Protegen el talón y la herradura anterior de un posterior que alcanza. Tres lenguas de seis conservaron la imagen de la campana.",
          it:"Proteggono il tallone e il ferro anteriore da un posteriore che raggiunge. Tre lingue su sei hanno tenuto l'immagine della campana.",
          de:"Schützen Ballen und Vordereisen vor einem greifenden Hinterhuf. Drei von sechs Sprachen behielten das Bild der Glocke.",
          ja:"前肢の踵と蹄鉄を、追突する後肢から守るカバー。六言語のうち三つが「鐘」のイメージを残しています。" } },

  { ref:"bandes", lecon:4, coll:"protections",
    mots:{ fr:{m:"les bandes de travail"}, en:{m:"the exercise bandages", p:"èk-seur-saïz ban-di-djiz"},
           es:{m:"las vendas"}, it:{m:"le fasce"},
           de:{m:"die Bandagen", p:"ban-da-gueune"}, ja:{m:"バンテージ", p:"bantēji"} },
    def:{ fr:"Posées sur une sous-bande, elles soutiennent le tendon. Mal serrées, elles font plus de mal que pas de bandes du tout.",
          en:"Put over a pad, they support the tendon. Badly wrapped, they do more harm than none at all.",
          es:"Puestas sobre una venda de base, sostienen el tendón. Mal apretadas, hacen más daño que ninguna venda.",
          it:"Poste su un sottobenda, sostengono il tendine. Strette male, fanno più male che niente bende.",
          de:"Über einer Unterlage gewickelt stützen sie die Sehne. Falsch gewickelt schaden sie mehr als gar keine Bandagen.",
          ja:"下巻きの上から巻いて、腱を支えます。締め方を誤れば、巻かないよりも害になります。" } },

  { ref:"bonnet", lecon:4, coll:"protections",
    mots:{ fr:{m:"le bonnet anti-mouches"}, en:{m:"the fly veil", p:"flaï véïl", var:"ear bonnet"},
           es:{m:"la orejera"}, it:{m:"la cuffia"},
           de:{m:"die Ohrenhaube", p:"ô-reune-haou-be", var:"die Fliegenhaube"}, ja:{m:"イヤーネット", p:"iyā netto"} },
    def:{ fr:"Contre les mouches, et contre le bruit en concours. En dressage international, il est autorisé et souvent assorti au tapis.",
          en:"Against flies, and against noise at shows. Allowed in international dressage, and often matched to the saddle pad.",
          es:"Contra las moscas, y contra el ruido en concurso. En doma internacional está autorizado y a menudo a juego con el sudadero.",
          it:"Contro le mosche, e contro il rumore in concorso. In dressage internazionale è autorizzato e spesso abbinato al sottosella.",
          de:"Gegen Fliegen — und gegen Lärm auf dem Turnier. In der internationalen Dressur erlaubt und oft passend zur Schabracke.",
          ja:"虫よけであり、競技会では音よけにも。国際馬場馬術でも認められていて、ゼッケンとおそろいにすることも多いです。" } },

  { ref:"cuir", lecon:4, coll:"protections",
    mots:{ fr:{m:"le cuir"}, en:{m:"the leather", p:"lè-zeur"},
           es:{m:"el cuero"}, it:{m:"il cuoio"},
           de:{m:"das Leder", p:"lé-deur"}, ja:{m:"革", p:"kawa"} },
    def:{ fr:"Un cuir qui sèche craque, un cuir trop gras s'étire. On nettoie après chaque séance, on nourrit une fois par mois.",
          en:"Leather that dries cracks, leather that is over-oiled stretches. Clean after every ride, feed it once a month.",
          es:"Un cuero que se seca se agrieta, un cuero demasiado graso se estira. Se limpia tras cada sesión, se nutre una vez al mes.",
          it:"Un cuoio che secca si crepa, un cuoio troppo grasso si stira. Si pulisce dopo ogni seduta, si nutre una volta al mese.",
          de:"Trockenes Leder reißt, überfettetes Leder leiert aus. Nach jeder Einheit reinigen, einmal im Monat einfetten.",
          ja:"乾いた革はひび割れ、油の多すぎる革は伸びてしまいます。手入れは毎回、油入れは月に一度。" } },

  { ref:"savon", lecon:4, coll:"protections",
    mots:{ fr:{m:"le savon glycériné"}, en:{m:"the saddle soap", p:"sa-deul sôpe"},
           es:{m:"el jabón glicerinado"}, it:{m:"il sapone per cuoio"},
           de:{m:"die Sattelseife", p:"za-teul-zaï-fe"}, ja:{m:"サドルソープ", p:"sadoru sōpu"} },
    def:{ fr:"Le savon du cuir, appliqué avec une éponge à peine humide. Jamais sur le mors, jamais dans la bouche du cheval.",
          en:"Soap for leather, applied with a barely damp sponge. Never on the bit, never near the mouth.",
          es:"El jabón del cuero, aplicado con una esponja apenas húmeda. Jamás en el bocado, jamás en la boca del caballo.",
          it:"Il sapone del cuoio, applicato con una spugna appena umida. Mai sull'imboccatura, mai nella bocca del cavallo.",
          de:"Die Sattelseife, mit kaum feuchtem Schwamm aufgetragen. Nie ans Gebiss, nie ins Pferdemaul.",
          ja:"革用の石けん。かすかに湿らせたスポンジで塗ります。ハミには決して — 馬の口に入るものだからです。" } },

  { ref:"seller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"seller"}, en:{m:"to tack up", p:"tak eup", var:"to saddle up"},
           es:{m:"ensillar"}, it:{m:"sellare"},
           de:{m:"satteln", p:"za-teuln"}, ja:{m:"馬装する", p:"basō suru"} },
    def:{ fr:"⚠️ L'anglais courant est **to tack up**, qui couvre selle et filet d'un seul mot. Le japonais fait pareil : 馬装する, « équiper le cheval ».",
          en:"The everyday English is « to tack up », covering saddle and bridle at once. Japanese does the same with 馬装する.",
          es:"⚠️ El inglés corriente es **to tack up**, que cubre silla y cabezada con una sola palabra. El japonés hace igual: 馬装する, « equipar al caballo ».",
          it:"⚠️ L'inglese corrente è **to tack up**, che copre sella e testiera con una sola parola. Il giapponese fa lo stesso: 馬装する, « equipaggiare il cavallo ».",
          de:"⚠️ Das gängige Englisch ist **to tack up** — Sattel und Zaum in einem Wort. Das Japanische macht es genauso: 馬装する.",
          ja:"⚠️ ふだんの英語は **to tack up**。鞍も頭絡も一語でまかないます。日本語も同じ発想です — 馬装する。" } },

  { ref:"brider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"brider"}, en:{m:"to put the bridle on", p:"poutt ze braï-deul onn"},
           es:{m:"embridar"}, it:{m:"mettere la testiera"},
           de:{m:"auftrensen", p:"aouf-trèn-zeune"}, ja:{m:"頭絡をつける", p:"tōraku o tsukeru"} },
    def:{ fr:"Le mors se présente à plat sur la langue, le pouce dans le coin des lèvres. L'allemand a un verbe d'un seul mot, auftrensen ; l'anglais non.",
          en:"The bit is offered flat on the tongue, thumb at the corner of the lips. German has a single verb, auftrensen; English does not.",
          es:"El bocado se presenta plano sobre la lengua, el pulgar en la comisura de los labios. El alemán tiene un verbo de una sola palabra, auftrensen; el inglés no.",
          it:"L'imboccatura si presenta piatta sulla lingua, il pollice nell'angolo delle labbra. Il tedesco ha un verbo di una sola parola, auftrensen; l'inglese no.",
          de:"Das Gebiss kommt flach auf die Zunge, der Daumen in den Maulwinkel. Das Deutsche hat dafür ein einziges Verb: auftrensen. Das Englische nicht.",
          ja:"ハミは舌の上に平らに差し出し、親指は唇の合わせ目へ。ドイツ語には一語の動詞があります — auftrensen。英語にはありません。" } },

  { ref:"sangler", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"resangler"}, en:{m:"to tighten the girth", p:"taï-teune ze gueurss"},
           es:{m:"apretar la cincha"}, it:{m:"stringere il sottopancia"},
           de:{m:"nachgurten", p:"narh-gour-teune"}, ja:{m:"腹帯を締める", p:"haraobi o shimeru"} },
    def:{ fr:"À faire à pied avant de monter, puis à cheval après quelques minutes. L'allemand a encore un verbe exprès pour le deuxième temps : nachgurten.",
          en:"Done on the ground before mounting, then again from the saddle a few minutes later. German has a verb just for that second time.",
          es:"Se hace a pie antes de montar, y de nuevo a caballo tras unos minutos. El alemán tiene otro verbo expreso para el segundo tiempo: nachgurten.",
          it:"Si fa a piedi prima di montare, poi a cavallo dopo qualche minuto. Il tedesco ha ancora un verbo apposta per il secondo tempo: nachgurten.",
          de:"Erst am Boden vor dem Aufsteigen, dann im Sattel nach ein paar Minuten. Fürs zweite Mal hat das Deutsche wieder ein eigenes Verb: nachgurten.",
          ja:"乗る前に地上で締め、数分後に馬上でもう一度。二度目の締め直しに、ドイツ語はまた専用の動詞を持っています — nachgurten。" } },

  { ref:"regler-etrivieres", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"régler ses étrivières"}, en:{m:"to adjust the stirrups", p:"a-djeust ze sti-reups"},
           es:{m:"ajustar los estribos"}, it:{m:"regolare le staffe"},
           de:{m:"die Bügel verschnallen", p:"bu-gueul fèr-chna-leune"}, ja:{m:"鐙の長さを調節する", p:"abumi no nagasa o chōsetsu suru"} },
    def:{ fr:"Repère universel : le bas de l'étrier arrive au niveau de la cheville, bras tendu le long de la sangle. Un trou plus court à l'obstacle.",
          en:"Universal check: with your arm along the girth, the stirrup reaches your ankle. One hole shorter for jumping.",
          es:"Referencia universal: el fondo del estribo llega al tobillo, con el brazo tendido a lo largo de la ación. Un agujero más corto para saltar.",
          it:"Riferimento universale: il fondo della staffa arriva alla caviglia, braccio teso lungo lo staffile. Un buco più corto per l'ostacolo.",
          de:"Universelle Faustregel: Der Bügel reicht bis zum Knöchel, den Arm am Riemen ausgestreckt. Zum Springen ein Loch kürzer.",
          ja:"世界共通の目安：腕を革に沿って伸ばし、鐙の底がくるぶしに届く長さ。障害では穴ひとつ短く。" } },

  { ref:"desseller", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"desseller"}, en:{m:"to untack", p:"eune-tak"},
           es:{m:"desensillar"}, it:{m:"dissellare"},
           de:{m:"absatteln", p:"ap-za-teuln"}, ja:{m:"鞍を外す", p:"kura o hazusu"} },
    def:{ fr:"On desangle avant de retirer la selle, et on laisse le dos revenir seul : ne jamais frictionner un dos qui sort de la selle.",
          en:"Loosen the girth before lifting the saddle, and let the back recover on its own — never rub a just-unsaddled back.",
          es:"Se descincha antes de retirar la silla, y se deja que el dorso vuelva solo: jamás friccionar un dorso que sale de la silla.",
          it:"Si scinghia prima di togliere la sella, e si lascia che il dorso torni da solo: mai frizionare un dorso che esce dalla sella.",
          de:"Erst abgurten, dann den Sattel abnehmen — und den Rücken von selbst zurückkommen lassen: Nie einen frisch entsattelten Rücken frottieren.",
          ja:"腹帯をゆるめてから鞍を下ろし、背中は自然に戻るのを待ちます。鞍を下ろした直後の背中を、こすってはいけません。" } },

  { ref:"debrider", lecon:4, coll:"protections", v:true,
    mots:{ fr:{m:"débrider"}, en:{m:"to take the bridle off", p:"téïk ze braï-deul off"},
           es:{m:"desembridar"}, it:{m:"togliere la testiera"},
           de:{m:"abtrensen", p:"ap-trèn-zeune"}, ja:{m:"頭絡を外す", p:"tōraku o hazusu"} },
    def:{ fr:"Le licol se passe autour de l'encolure **avant** de retirer le filet : c'est le geste qui évite qu'un cheval part libre dans la cour.",
          en:"Put the headcollar round the neck before the bridle comes off: the habit that stops a horse walking off loose.",
          es:"La cabezada de cuadra se pasa alrededor del cuello **antes** de retirar el filete: es el gesto que evita que un caballo salga libre por el patio.",
          it:"La capezza si passa attorno all'incollatura **prima** di togliere la testiera: è il gesto che evita che un cavallo parta libero nel cortile.",
          de:"Das Halfter kommt **vor** dem Abtrensen um den Hals: Dieser Handgriff verhindert, dass ein Pferd frei über den Hof zieht.",
          ja:"頭絡を外す**前に**、無口を首に回しておくこと。この一手間が、馬が庭を勝手に歩き回る事態を防ぎます。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"besoin-guetres", lecon:4,
      fr:"Il a besoin de guêtres ?",
      en:"Does he need boots ?",
      es:"¿ Necesita protecciones ?",
      it:"Ha bisogno dei paracolpi ?",
      de:"Braucht er Gamaschen ?",
      ja:"プロテクター は 必要 です か ?" },
    { ref:"emprunter-bombe", lecon:3,
      fr:"Je peux emprunter une bombe ?",
      en:"Could I borrow a hat ?",
      es:"¿ Me puedes prestar un casco ?",
      it:"Posso prendere in prestito un caschetto ?",
      de:"Kann ich einen Reithelm leihen ?",
      ja:"ヘルメット を 貸して もらえ ます か ?" },
    { ref:"pas-eperons", lecon:3,
      fr:"Je ne mets pas d'éperons.",
      en:"I won't wear spurs.",
      es:"No me pongo espuelas.",
      it:"Non metto gli speroni.",
      de:"Ich trage keine Sporen.",
      ja:"拍車 は つけ ませ ん。" },
    { ref:"ou-ranger", lecon:4,
      fr:"Je range la selle où ?",
      en:"Where does the saddle go ?",
      es:"¿ Dónde guardo la silla ?",
      it:"Dove metto la sella ?",
      de:"Wohin kommt der Sattel ?",
      ja:"鞍 は どこ に 置き ます か ?" }
  ],

  dialogue: {
    ville: "vejer", lecon: 4, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 19 phrases */

    phrases: [

      /* ---- temps 1 · le camion et la malle ---- */
      { ref:"dv-ou-materiel", temps:1, dit:"joueuse", mots:[],
        fr:"Où est mon matériel ?",
        en:"Where's my tack?",
        es:"¿Dónde está mi material?",
        it:"Dov'è il mio materiale?",
        de:"Wo ist meine Ausrüstung?",
        ja:"私 の 馬具 は どこ です か ?" },

      { ref:"dv-malle-camion", temps:1, dit:"club", mots:["malle-concours"],
        fr:"La malle de concours est déjà dans le camion.",
        en:"The tack trunk is already in the lorry.",
        es:"El baúl de concurso ya está en el camión.",
        it:"Il baule da concorso è già nel camion.",
        de:"Die Turnierkiste ist schon im Lkw.",
        ja:"馬具 トランク は もう トラック に 積ん で あり ます。" },

      { ref:"dv-tapis-sellerie", temps:1, dit:"joueuse", mots:[], motsAilleurs:["tapis"],
        fr:"J'ai laissé mon tapis de selle dans la sellerie.",
        en:"I left my saddle pad in the tack room.",
        es:"He dejado mi mantilla en la guadarnés.",
        it:"Ho lasciato il mio sottosella in selleria.",
        de:"Ich habe meine Satteldecke in der Sattelkammer gelassen.",
        ja:"ゼッケン を 馬具 部屋 に 置い て き まし た。" },

      /* ---- temps 2 · seller ---- */
      { ref:"dv-selle-adaptee", temps:2, dit:"joueuse", mots:["seller"], motsAilleurs:["selle","arcon"],
        fr:"Cette selle est-elle bien adaptée à ce cheval ?",
        en:"Does this saddle fit this horse properly?",
        es:"¿Esta silla se adapta bien a este caballo?",
        it:"Questa sella va bene per questo cavallo?",
        de:"Passt dieser Sattel diesem Pferd richtig?",
        ja:"この 鞍 は この 馬 に 合っ て い ます か ?" },

      { ref:"dv-resserrer-sangle", temps:2, dit:"club", mots:["sangler"], motsAilleurs:["sangle"],
        fr:"Il faut resserrer la sangle avant de monter.",
        en:"You need to tighten the girth before mounting.",
        es:"Hay que apretar la cincha antes de montar.",
        it:"Bisogna stringere il sottopancia prima di montare.",
        de:"Der Gurt muss vor dem Aufsteigen nachgezogen werden.",
        ja:"乗る 前 に 腹帯 を 締め 直し ます。" },

      { ref:"dv-etriers-trop-longs", temps:2, dit:"joueuse", mots:["regler-etrivieres"], motsAilleurs:["etriers","etrivieres"],
        fr:"Mes étriers sont trop longs pour sauter.",
        en:"My stirrups are too long for jumping.",
        es:"Mis estribos están demasiado largos para saltar.",
        it:"Le mie staffe sono troppo lunghe per saltare.",
        de:"Meine Bügel sind zum Springen zu lang.",
        ja:"障害 を 飛ぶ に は 鐙 が 長 すぎ ます。" },

      { ref:"dv-remonter-un-trou", temps:2, dit:"joueuse", mots:["regler-etrivieres"], motsAilleurs:["etrivieres"],
        fr:"Peux-tu les remonter d'un trou ?",
        en:"Can you shorten them by one hole?",
        es:"¿Puedes subirlos un agujero?",
        it:"Puoi accorciarli di un buco?",
        de:"Kannst du sie ein Loch kürzer machen?",
        ja:"一 穴 分 短く し て もらえ ます か ?" },

      /* ---- temps 3 · le filet et les réglages ---- */
      { ref:"dv-quel-mors", temps:3, dit:"joueuse", mots:["brider"], motsAilleurs:["mors","filet"],
        fr:"Quel mors utilises-tu avec ce cheval ?",
        en:"What bit do you use on this horse?",
        es:"¿Qué bocado usas con este caballo?",
        it:"Che morso usi con questo cavallo?",
        de:"Welches Gebiss benutzt du bei diesem Pferd?",
        ja:"この 馬 に は どの ハミ を 使い ます か ?" },

      { ref:"dv-muserolle-serree", temps:3, dit:"joueuse", mots:[], motsAilleurs:["muserolle"],
        fr:"La muserolle est un peu trop serrée.",
        en:"The noseband is a little too tight.",
        es:"La muserola está un poco apretada.",
        it:"La capezzina è un po' troppo stretta.",
        de:"Der Nasenriemen ist etwas zu fest.",
        ja:"鼻革 が 少し 締め すぎ です。" },

      { ref:"dv-collier-martingale", temps:3, dit:"club", mots:["brider"], motsAilleurs:["collier-chasse","martingale"],
        fr:"Mets-lui son collier de chasse et sa martingale.",
        en:"Put his breastplate and martingale on.",
        es:"Ponle el pretal y la gamarra.",
        it:"Mettigli la pettorina e la martingala.",
        de:"Leg ihm Vorderzeug und Martingal an.",
        ja:"胸 がい と マルタンガール を つけ て ください。" },

      /* ---- temps 4 · le rechange et les crampons ---- */
      { ref:"dv-filet-renes-rechange", temps:4, dit:"club", mots:["de-rechange","malle-concours"], motsAilleurs:["filet","renes"],
        fr:"Tu as pris un filet et des rênes de rechange ?",
        en:"Did you pack a spare bridle and spare reins?",
        es:"¿Has cogido una brida y unas riendas de repuesto?",
        it:"Hai preso una briglia e delle redini di riserva?",
        de:"Hast du eine Ersatztrense und Ersatzzügel eingepackt?",
        ja:"予備 の 頭絡 と 手綱 は 持ち まし た か ?" },

      { ref:"dv-sangle-rechange", temps:4, dit:"club", mots:["de-rechange"], motsAilleurs:["sangle"],
        fr:"Garde une sangle de rechange près de la piste.",
        en:"Keep a spare girth by the arena.",
        es:"Ten una cincha de repuesto junto a la pista.",
        it:"Tieni un sottopancia di riserva vicino al campo.",
        de:"Halte einen Ersatzgurt am Platz bereit.",
        ja:"予備 の 腹帯 を 馬場 の 近く に 置い て おき ます。" },

      { ref:"dv-crampons-glissant", temps:4, dit:"club", mots:[],
        fr:"Il nous faut des crampons aujourd'hui, le terrain est glissant.",
        en:"We need studs today; the ground is slippery.",
        es:"Hoy necesitamos ramplones: el terreno resbala.",
        it:"Oggi ci servono i ramponi: il terreno è scivoloso.",
        de:"Heute brauchen wir Stollen, der Boden ist rutschig.",
        ja:"今日 は 地面 が 滑る ので、 滑り止め が 必要 です。" },

      { ref:"dv-cle-dans-malle", temps:4, dit:"club", mots:["cle-crampons","malle-concours"],
        fr:"La clé à crampons est dans la malle.",
        en:"The stud wrench is in the tack trunk.",
        es:"La llave de ramplones está en el baúl.",
        it:"La chiave per ramponi è nel baule.",
        de:"Der Stollenschlüssel liegt in der Kiste.",
        ja:"滑り止め 用 の レンチ は トランク の 中 です。" },

      /* ---- temps 5 · la tenue et l'épreuve ---- */
      { ref:"dv-veste-pantalon", temps:5, dit:"joueuse", mots:["veste-concours","culotte","tenue"],
        fr:"Ma veste de concours et mon pantalon blanc sont prêts.",
        en:"My show jacket and white breeches are ready.",
        es:"Mi chaqueta de concurso y mi pantalón blanco están listos.",
        it:"La mia giacca da concorso e i pantaloni bianchi sono pronti.",
        de:"Mein Turnierjackett und die weiße Reithose sind bereit.",
        ja:"競技 用 ジャケット と 白 の キュロット は 用意 でき て い ます。" },

      { ref:"dv-tapis-concours", temps:5, dit:"club", mots:[], motsAilleurs:["tapis"],
        fr:"Mets le tapis de concours pour le parcours.",
        en:"Put the show saddle pad on for the class.",
        es:"Pon la mantilla de concurso para el recorrido.",
        it:"Metti il sottosella da concorso per il percorso.",
        de:"Leg die Turnier-Satteldecke für den Parcours auf.",
        ja:"競技 用 の ゼッケン を つけ て 走行 に 出 ます。" },

      { ref:"dv-numero-tetiere", temps:5, dit:"joueuse", mots:[],
        fr:"Où est mon numéro de têtière ?",
        en:"Where's my bridle number?",
        es:"¿Dónde está mi número de cabezada?",
        it:"Dov'è il mio numero da testiera?",
        de:"Wo ist meine Kopfnummer?",
        ja:"頭絡 に つける ゼッケン 番号 は どこ です か ?" },

      /* ---- temps 6 · le soir, on range ---- */
      { ref:"dv-nettoie-range", temps:6, dit:"club", mots:["cuir","savon","malle-concours","desseller","debrider"],
        fr:"Après l'épreuve, on nettoie le matériel et on range tout dans la malle.",
        en:"After the class, we clean the tack and put everything back in the trunk.",
        es:"Después de la prueba, limpiamos el material y lo guardamos todo en el baúl.",
        it:"Dopo la prova, puliamo il materiale e rimettiamo tutto nel baule.",
        de:"Nach der Prüfung putzen wir die Ausrüstung und packen alles in die Kiste.",
        ja:"競技 の あと、 馬具 を 手入れ し て、 すべて トランク に 戻し ます。" },

      /* 🟥 Phrase de Blandine, demandée pour faire vivre l'argile et le
         coton : c'est le geste du soir après un gros effort. */
      { ref:"dv-argile-bandes", temps:6, dit:"club", mots:["argile","bandes-repos","coton"],
        fr:"Mets-lui de l'argile et des bandes de repos avec du coton pour la nuit.",
        en:"Put clay on his legs and stable bandages over cotton for the night.",
        es:"Ponle arcilla y vendas de descanso sobre algodón para la noche.",
        it:"Mettigli l'argilla e le fasce da riposo sopra il cotone per la notte.",
        de:"Trag ihm Heilerde auf und leg Stallbandagen über Watte für die Nacht.",
        ja:"夜 の 間、 脚 に クレイ を 塗り、 綿 の 上 から 厩舎 用 バンテージ を 巻き ます。" }
    ]
  }
};
