/* hype-lingo-lex-haras.js — Hype Linguae · Lexington · « Le haras »
   ==================================================================
   24 CONCEPTS, UNE LEÇON.

   POURQUOI CE CHAPITRE. Lexington, Kentucky : les ventes de yearlings.
   On lève la main dans une salle et le prix monte. C'est le seul endroit
   du module où un cheval change de mains SANS conversation.

   ⚠️ NE PAS CONFONDRE avec lex-elevage.js (Golegã), qui fait NAÎTRE,
   ni avec lex-vente.js (Vérone), où l'on achète un cheval pour soi en
   discutant. Vérifié avant écriture : aucun `ref` d'ici n'existe dans
   les 20 autres lexiques disponibles ce jour (le piège des faux rappels
   documenté dans le SUIVI). `lignee` reste à Golegã ; ici c'est le
   `pedigree`, la page écrite du catalogue — deux notions, deux refs.

   ⚠️ CE CHAPITRE NE CITE AUCUNE PERSONNE ET AUCUN ORGANISME PRIVÉ
   (décision de Blandine du 8 août 2026, valable pour tout le module).

   ÉCRIT LE 9 AOÛT 2026 : le fichier n'avait JAMAIS existé (vérifié dans
   l'historique GitHub — « No commits history »). Sa conception du 6 août
   n'avait vécu que dans les commentaires de lingo.html. Numéro de
   chapitre : 15, l'un des deux trous libres entre l'endurance (14) et
   la tradition (17) — à ajuster si le SUIVI en décide autrement.

   CHAMPS  m · p (EN/DE/JA) · coll · def · v (verbe)

   ⚠️ RELECTURE NATIVE RECOMMANDÉE pour le vocabulaire des salles de
   ventes hors français/anglais : les entrées marquées // ?? sont celles
   dont l'usage réel, en Allemagne ou au Japon, m'échappe en partie.

   ------------------------------------------------------------------
   ✔ LOT BLANDINE DU 17 AOÛT 2026. Elle a fourni quinze mots, dix-huit
   phrases, et la notion sire/dam qui fait l'identité de Lexington.
   Sa décision, ses mots : « Une seule leçon » · « Les deux sont
   importants dans la 17 » (le modèle ET les aplombs).

   ⚠️ FICHIER RETAPÉ, PAS RELU DEPUIS LE DÉPÔT. La pièce jointe n'est
   jamais arrivée sur le disque (dossier uploads vide à trois reprises) :
   les dix concepts et les trois phrases d'origine ont été recopiés
   depuis le texte du message. Ils devraient être identiques au caractère
   près, mais je ne peux pas le garantir par un diff. À comparer avant
   de pousser, ou renvoie-moi le fichier et je repars du vrai.

   ✔ HUIT RAPPELS DE GOLEGÃ BRANCHÉS le 17 août 2026, une fois
   `lex-elevage.js` enfin sous les yeux : naisseur, etalon, poulinière,
   poulain, pouliche, saillie, jument-pleine, sevrage. Même `ref` = mêmes
   mots, copiés au caractère près depuis le fichier de Golegã — seules
   les définitions sont propres à Lexington. ⚠️ Le `ref` « poulinière »
   porte un accent dans lex-elevage.js : conservé tel quel ici, c'est lui
   qui fait le lien. Si Golegã change un mot un jour, le même mot doit
   changer ici (règle des rappels, cf. `abandon` dans lex-endurance.js).

   ✔ `sire` ET `dam` : AUCUN DOUBLON. Vérifié dans lex-elevage.js —
   Golegã n'a ni « le père » ni « la mère » en entrées. Le risque signalé
   plus tôt est levé.

   ⚠️ UNE SEULE ENTRÉE VRAIMENT NEUVE côté élevage : `colt` (le jeune
   mâle), absente de Golegã et indispensable aux ventes — les catalogues
   séparent colts et fillies. Ses traductions es/it/de/ja sont des
   reconstructions à faire relire (voir DOUTES-lexington-haras.md).

   ✔ LE MOTEUR LIT LES DEUX FORMES DE PHRASES. Vérifié dans lingo.html
   (exPhrase, v68) : `p:{fr:…}` et l'écriture à plat marchent toutes
   les deux depuis le correctif de Spruce Meadows. La forme locale
   `p:{…}` est donc gardée — rien à harmoniser. lingo.html et
   lingo-dialogue.html N'ONT PAS ÉTÉ TOUCHÉS (mot de Blandine : « Ne
   code pas dessus » — codage en cours ailleurs). Le champ `intro`
   de lex-endurance.js reste en attente de branchement pour la même
   raison.

   ⚠️ LA RÈGLE DES 7 MOTS EST ROMPUE par les dix-huit phrases neuves.
   Ce sont des répliques de visite, pas des sentences : elles sont
   longues par nature. Les trois phrases d'origine restent courtes.

   ⚠️ JAPONAIS DES PHRASES NEUVES ÉCRIT AVEC DES ESPACES entre les
   groupes, comme dans lex-endurance.js : `attendue.split(" ")` en fait
   les tuiles à remettre en ordre. Les trois phrases d'origine n'en ont
   pas — à harmoniser si le moteur en a besoin. Les virgules 、 sont
   collées au groupe qui précède, sinon elles deviennent une tuile seule.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.haras = {
  ref: "haras",
  chapitre: 15,
  titre: { fr:"Le haras", en:"The stud farm", es:"La yeguada",
           it:"L'allevamento", de:"Das Gestüt", ja:"牧場" },
  lecons: 1,

  concepts: [

  { ref:"haras", lecon:1, coll:"haras",
    mots:{ fr:{m:"le haras"}, en:{m:"the stud farm", p:"steud farm"},
           es:{m:"la yeguada"}, it:{m:"l'allevamento"},
           de:{m:"das Gestüt", p:"gué-chtutt"}, ja:{m:"牧場", p:"bokujō"} },
    def:{ fr:"Les collines de paddocks où grandissent les chevaux à vendre. Ici, on n'élève pas pour garder.",
          en:"The rolling paddocks where the horses for sale grow up. Here, no one breeds to keep.",
          es:"Las colinas de paddocks donde crecen los caballos en venta. Aquí no se cría para quedarse.",
          it:"Le colline di paddock dove crescono i cavalli in vendita. Qui non si alleva per tenere.",
          de:"Die Koppelhügel, auf denen die Verkaufspferde aufwachsen. Hier züchtet niemand, um zu behalten.",
          ja:"売られる馬たちが育つ丘の放牧場。ここでは、手元に残すために馬を育てない。" } },

  { ref:"yearling", lecon:1, coll:"haras",
    mots:{ fr:{m:"le yearling"}, en:{m:"the yearling", p:"yeur-ling"},
           es:{m:"el yearling"}, it:{m:"lo yearling"},
           de:{m:"der Jährling", p:"yèr-ling"}, ja:{m:"1歳馬", p:"issaiba"} },
    def:{ fr:"Le cheval d'un an, jamais monté, vendu sur sa famille et son allure. Le mot est anglais dans toutes les langues — ou presque.",
          en:"The one-year-old, never ridden, sold on his family and his walk. The word stays English in almost every language.",
          es:"El caballo de un año, jamás montado, vendido por su familia y su porte. La palabra queda en inglés casi en todas las lenguas.",
          it:"Il cavallo di un anno, mai montato, venduto per la famiglia e il portamento. La parola resta inglese quasi ovunque.",
          de:"Das einjährige, nie gerittene Pferd, verkauft nach Familie und Gang. Fast überall bleibt das Wort englisch — außer hier.",
          ja:"一度も騎乗されていない1歳の馬。血筋と歩様で売られる。" } },

  { ref:"encheres", lecon:1, coll:"haras",
    mots:{ fr:{m:"la vente aux enchères"}, en:{m:"the auction", p:"ôk-cheune"},
           es:{m:"la subasta"}, it:{m:"l'asta"},
           de:{m:"die Auktion", p:"aouk-tsione"}, ja:{m:"せり", p:"seri"} },
    def:{ fr:"La vente où le prix n'est pas écrit : il monte tant que deux mains se lèvent encore.",
          en:"The sale where the price is not written: it climbs as long as two hands keep rising.",
          es:"La venta donde el precio no está escrito: sube mientras dos manos sigan levantándose.",
          it:"La vendita dove il prezzo non è scritto: sale finché due mani continuano ad alzarsi.",
          de:"Der Verkauf, bei dem der Preis nirgends steht: er steigt, solange sich noch zwei Hände heben.",
          ja:"値段が書かれていない売買。二人の手が挙がり続ける限り、価格は上がる。" } },

  { ref:"catalogue", lecon:1, coll:"haras",
    mots:{ fr:{m:"le catalogue"}, en:{m:"the catalogue", p:"ka-ta-log"},
           es:{m:"el catálogo"}, it:{m:"il catalogo"},
           de:{m:"der Katalog", p:"ka-ta-lôg"}, ja:{m:"カタログ", p:"katarogu"} },
    def:{ fr:"Le livre de la vente : une page par cheval, sa famille sur trois générations. On le lit le soir, avant.",
          en:"The book of the sale: one page per horse, his family across three generations. You read it the night before.",
          es:"El libro de la venta: una página por caballo, su familia en tres generaciones. Se lee la víspera.",
          it:"Il libro della vendita: una pagina per cavallo, la famiglia su tre generazioni. Si legge la sera prima.",
          de:"Das Buch der Auktion: eine Seite pro Pferd, die Familie über drei Generationen. Man liest es am Abend davor.",
          ja:"せりの本。一頭につき一ページ、三代にわたる血統が載る。前の晩に読み込むもの。" } },

  { ref:"lot", lecon:1, coll:"haras",
    mots:{ fr:{m:"le lot"}, en:{m:"the hip number", p:"hip neum-beur"},
           es:{m:"el lote"}, it:{m:"il lotto"},
           de:{m:"die Losnummer", p:"lôss-nou-meur"}, ja:{m:"上場番号", p:"jōjō bangō"} },
    def:{ fr:"Le numéro du cheval dans la vente — collé sur sa hanche, d'où le mot américain. On n'achète pas un nom, on achète un numéro.",
          en:"The horse's number in the sale — stuck on his hip, hence the American word. You do not buy a name, you buy a number.",
          es:"El número del caballo en la venta, pegado en su cadera — de ahí la palabra americana. No se compra un nombre, se compra un número.",
          it:"Il numero del cavallo nella vendita, incollato sull'anca — da lì la parola americana. Non si compra un nome, si compra un numero.",
          de:"Die Nummer des Pferdes in der Auktion — auf die Hüfte geklebt, daher das amerikanische Wort. Man kauft keinen Namen, man kauft eine Nummer.",
          ja:"せりでの馬の番号。腰に貼られることから英語では「ヒップナンバー」と呼ぶ。買うのは名前ではなく番号。" } },

  { ref:"ring", lecon:1, coll:"haras",
    mots:{ fr:{m:"le ring de vente"}, en:{m:"the sales ring", p:"sélz ring"},
           es:{m:"el ring de ventas"}, it:{m:"il ring"},
           de:{m:"der Auktionsring", p:"aouk-tsions-ring"}, ja:{m:"せり場", p:"seriba"} },
    def:{ fr:"Le petit cercle de sable sous les projecteurs où le yearling tourne au pas pendant qu'on décide de sa vie.",
          en:"The small circle of sand under the lights where the yearling walks in circles while his life is decided.",
          es:"El pequeño círculo de arena bajo los focos donde el yearling camina mientras se decide su vida.",
          it:"Il piccolo cerchio di sabbia sotto i riflettori dove lo yearling gira al passo mentre si decide la sua vita.",
          de:"Der kleine Sandkreis im Scheinwerferlicht, in dem der Jährling im Schritt geht, während über sein Leben entschieden wird.",
          ja:"照明の下の小さな砂の輪。1歳馬が常歩で回る間に、その一生が決められていく。" } },

  { ref:"priseur", lecon:1, coll:"haras",
    mots:{ fr:{m:"le commissaire-priseur"}, en:{m:"the auctioneer", p:"ôk-cheu-nir"},
           es:{m:"el subastador"}, it:{m:"il banditore"},
           de:{m:"der Auktionator", p:"aouk-tsio-na-tor"}, ja:{m:"せり人", p:"serinin"} },
    def:{ fr:"La voix qui chante les prix, si vite qu'on ne distingue plus les mots. Son chant s'arrête : c'est vendu.",
          en:"The voice that chants the prices, so fast the words blur together. When the chant stops, the horse is sold.",
          es:"La voz que canta los precios, tan rápido que las palabras se confunden. Cuando el canto se detiene, está vendido.",
          it:"La voce che canta i prezzi, così veloce che le parole si confondono. Quando il canto si ferma, è venduto.",
          de:"Die Stimme, die die Preise singt, so schnell, dass die Wörter verschwimmen. Verstummt der Gesang, ist das Pferd verkauft.",
          ja:"値段を歌うように読み上げる声。速すぎて言葉が聞き取れないほど。その歌が止まったとき、馬は売れている。" } },

  { ref:"marteau", lecon:1, coll:"haras",
    mots:{ fr:{m:"le marteau"}, en:{m:"the hammer", p:"ha-meur"},
           es:{m:"el martillo"}, it:{m:"il martello"},
           de:{m:"der Hammer", p:"ha-meur"}, ja:{m:"ハンマー", p:"hanmā"} },
    def:{ fr:"Le coup qui clôt l'enchère. « Sous le marteau » : se dit d'un cheval en train d'être vendu.",
          en:"The blow that ends the bidding. \"Under the hammer\": said of a horse being sold.",
          es:"El golpe que cierra la puja. «Bajo el martillo»: se dice de un caballo que se está vendiendo.",
          it:"Il colpo che chiude l'asta. «Sotto il martello»: si dice di un cavallo in vendita.",
          de:"Der Schlag, der das Bieten beendet. „Unter den Hammer kommen“: sagt man von einem Pferd, das verkauft wird.",
          ja:"入札を締めくくる一打。「ハンマーの下に」とは、まさに売られている馬のことを言う。" } },

  { ref:"encherir", lecon:1, coll:"haras", v:true,
    mots:{ fr:{m:"enchérir"}, en:{m:"to bid", p:"tou bid"},
           es:{m:"pujar"}, it:{m:"rilanciare"},
           de:{m:"bieten", p:"bi-teune"}, ja:{m:"入札する", p:"nyūsatsu suru"} },
    def:{ fr:"Lever la main pour dire un prix plus haut. Un clignement suffit — les habitués n'en font pas plus.",
          en:"Raising a hand to name a higher price. A blink is enough — the regulars do no more than that.",
          es:"Levantar la mano para decir un precio más alto. Basta un parpadeo: los habituales no hacen más.",
          it:"Alzare la mano per dire un prezzo più alto. Basta un battito di ciglia: gli habitué non fanno di più.",
          de:"Die Hand heben, um einen höheren Preis zu nennen. Ein Blinzeln genügt — die Stammgäste tun nicht mehr.",
          ja:"より高い値を示すために手を挙げること。常連はまばたき一つで済ませる。" } },

  { ref:"pedigree", lecon:1, coll:"haras",
    mots:{ fr:{m:"le pedigree"}, en:{m:"the pedigree", p:"pé-di-gri"},
           es:{m:"el pedigrí"}, it:{m:"il pedigree"},
           de:{m:"die Abstammung", p:"ap-chta-moung"}, ja:{m:"血統", p:"kettō"} },
    def:{ fr:"La famille du cheval, écrite noir sur blanc dans le catalogue. À Golegã on la fait naître ; ici on la lit.",
          en:"The horse's family, set down in black and white in the catalogue. In Golegã they breed it; here they read it.",
          es:"La familia del caballo, escrita negro sobre blanco en el catálogo. En Golegã la hacen nacer; aquí se lee.",
          it:"La famiglia del cavallo, scritta nero su bianco nel catalogo. A Golegã la fanno nascere; qui si legge.",
          de:"Die Familie des Pferdes, schwarz auf weiß im Katalog. In Golegã wird sie gezüchtet; hier wird sie gelesen.",
          ja:"馬の家系。カタログに白黒はっきりと記される。ゴレガンでは血統を生み出し、ここでは血統を読む。" } },

  /* ============ LES CINQ ENTRÉES DU 17 AOÛT 2026 ============
     Le cœur de la langue de Lexington : on ne lit pas un pedigree avec
     les mots de la famille ordinaire. Les quatre premières forment un
     bloc — elles n'ont de sens qu'ensemble. */

  { ref:"sire", lecon:1, coll:"haras",
    /* ⚠️ RISQUE DE DOUBLON MOYEN : « le père » peut déjà exister dans
       lex-elevage.js (Golegã). Le `ref` est distinct, donc rien ne
       casse — mais à fusionner si le mot y est. */
    mots:{ fr:{m:"le père"}, en:{m:"the sire", p:"saï-eur"},
           es:{m:"el padre"}, it:{m:"il padre"},
           de:{m:"der Vater", p:"fa-teur"}, ja:{m:"父", p:"chichi", var:"種牡馬"} },
    def:{ fr:"⚠️ En anglais équestre on ne dit JAMAIS « the father » pour un pedigree : c'est « the sire ». Le mot ordinaire ferait tout de suite étranger dans une salle de vente.",
          en:"In pedigree English you never say « the father »: it is « the sire ». The ordinary word marks you out as an outsider in a sales ring straight away.",
          es:"⚠️ En inglés equino nunca se dice « the father » para un pedigrí: se dice « the sire ». La palabra corriente delata al forastero en una sala de ventas.",
          it:"⚠️ Nell'inglese ippico non si dice MAI « the father » per un pedigree: si dice « the sire ». La parola comune tradisce subito lo straniero in una sala d'asta.",
          de:"⚠️ Im Pferde-Englisch sagt man für eine Abstammung NIE « the father », sondern « the sire ». Das Alltagswort verrät den Fremden im Auktionssaal sofort.",
          ja:"⚠️ 馬の英語では、血統について « the father » とは決して言いません。« the sire » です。普通の語を使うと、せり会場ではすぐに外部の人と分かってしまいます。" } },

  { ref:"dam", lecon:1, coll:"haras",
    /* ⚠️ même risque de doublon que `sire` — voir ci-dessus. */
    mots:{ fr:{m:"la mère"}, en:{m:"the dam", p:"dam"},
           es:{m:"la madre"}, it:{m:"la madre"},
           de:{m:"die Mutter", p:"mou-teur"}, ja:{m:"母", p:"haha", var:"繁殖牝馬"} },
    def:{ fr:"⚠️ Le pendant de « sire » : jamais « the mother », toujours « the dam ». Et dans un catalogue, la mère compte souvent plus que le père — c'est elle qui donne la famille.",
          en:"The counterpart of « sire »: never « the mother », always « the dam ». And in a catalogue the dam often matters more than the sire — she is the family.",
          es:"⚠️ El equivalente de « sire »: nunca « the mother », siempre « the dam ». Y en un catálogo la madre suele contar más que el padre — es ella la que da la familia.",
          it:"⚠️ Il corrispettivo di « sire »: mai « the mother », sempre « the dam ». E in un catalogo la madre conta spesso più del padre — è lei che dà la famiglia.",
          de:"⚠️ Das Gegenstück zu « sire »: nie « the mother », immer « the dam ». Und im Katalog zählt die Mutter oft mehr als der Vater — sie ist die Familie.",
          ja:"⚠️ « sire » と対になる語。« the mother » ではなく、必ず « the dam »。しかもカタログでは、父より母のほうが重く見られることが多い。家系をもたらすのは母だからです。" } },

  { ref:"dam-sire", lecon:1, coll:"haras",
    mots:{ fr:{m:"le père de la mère"}, en:{m:"the dam sire", p:"dam saï-eur"},
           es:{m:"el padre de la madre"}, it:{m:"il padre della madre"},
           de:{m:"der Muttervater", p:"mou-teur-fa-teur"},
           ja:{m:"母の父", p:"haha no chichi", var:"ブルードメアサイアー"} },
    def:{ fr:"Le grand-père maternel, et il a son nom à lui parce qu'on en parle tous les jours. C'est la troisième ligne qu'on regarde dans le catalogue, après le père et la mère.",
          en:"The maternal grandsire — he has his own word because people talk about him every day. It is the third line you look at in the catalogue, after sire and dam.",
          es:"El abuelo materno, y tiene palabra propia porque se habla de él a diario. Es la tercera línea que se mira en el catálogo, tras el padre y la madre.",
          it:"Il nonno materno, e ha una parola sua perché se ne parla ogni giorno. È la terza riga che si guarda nel catalogo, dopo padre e madre.",
          de:"Der Großvater auf der Mutterseite — er hat sein eigenes Wort, weil täglich von ihm die Rede ist. Es ist die dritte Zeile im Katalog, nach Vater und Mutter.",
          ja:"母方の祖父。毎日のように話題にのぼるため、専用の語があります。カタログでは父と母に続いて、三番目に目を落とす行です。" } },

  { ref:"by-out-of", lecon:1, coll:"haras",
    /* ⚠️ FORMULE, pas un nom : c'est la syntaxe du catalogue. L'espagnol,
       l'italien et le japonais sont des reconstructions — l'usage exact
       des feuilles de vente locales m'échappe. // ?? */
    mots:{ fr:{m:"par… issu de…"}, en:{m:"by… out of…", p:"baï… aoutte ov…"},
           es:{m:"por… y de…"}, it:{m:"da… e da…"},
           de:{m:"von… aus…", p:"fonn… aouss…"},
           ja:{m:"…産駒、母…", p:"…sanku, haha…"} },
    def:{ fr:"La phrase toute faite du catalogue : « by » pour le père, « out of » pour la mère. Un exemple, et tu la liras partout : « This colt is by Into Mischief out of a Tapit mare » — ce poulain est par Into Mischief et issu d'une jument par Tapit.",
          en:"The catalogue's set phrase: « by » for the sire, « out of » for the dam. One example and you will read it everywhere: « This colt is by Into Mischief out of a Tapit mare ».",
          es:"La fórmula fija del catálogo: « by » para el padre, « out of » para la madre. Un ejemplo y se lee en todas partes: « This colt is by Into Mischief out of a Tapit mare » — este potro es por Into Mischief y de una yegua por Tapit.",
          it:"La formula fissa del catalogo: « by » per il padre, « out of » per la madre. Un esempio e la si legge dappertutto: « This colt is by Into Mischief out of a Tapit mare » — questo puledro è da Into Mischief e da una fattrice da Tapit.",
          de:"Die feste Wendung des Katalogs: « by » für den Vater, « out of » für die Mutter. Ein Beispiel, und man liest sie überall: « This colt is by Into Mischief out of a Tapit mare » — von Into Mischief aus einer Tapit-Stute.",
          ja:"カタログの決まった言い方。父は « by »、母は « out of » で示します。一度覚えれば、どこでも読めます。« This colt is by Into Mischief out of a Tapit mare » — 父イントゥミスチーフ、母はタピット産駒の牝馬、という意味です。" } },

  { ref:"prix-saillie", lecon:1, coll:"haras",
    /* ⚠️ `saillie` seul appartient probablement à Golegã ; ici c'est le
       PRIX, qui est un mot du commerce et non de l'élevage. // ?? */
    mots:{ fr:{m:"le prix de saillie"}, en:{m:"the stud fee", p:"steud fi"},
           es:{m:"la tarifa de cubrición"}, it:{m:"il costo della monta"},
           de:{m:"das Deckgeld", p:"dèk-guelt"}, ja:{m:"種付料", p:"tanetsukeryō"} },
    def:{ fr:"Ce que coûte une saillie de cet étalon, pour une saison. C'est le chiffre qui dit sa vraie valeur — bien mieux que ses résultats, parce qu'il se paye d'avance.",
          en:"What one covering by this stallion costs, for a season. It is the figure that states his real standing — better than his results, because it is paid up front.",
          es:"Lo que cuesta una cubrición de este semental, por temporada. Es la cifra que dice su valor real — mejor que sus resultados, porque se paga por adelantado.",
          it:"Quanto costa una monta di questo stallone, per una stagione. È la cifra che dice il suo valore reale — meglio dei risultati, perché si paga in anticipo.",
          de:"Was eine Bedeckung durch diesen Hengst kostet, pro Saison. Die Zahl sagt seinen wahren Rang — besser als seine Ergebnisse, weil sie im Voraus bezahlt wird.",
          ja:"この種牡馬に一度つけるための、そのシーズンの値段。前払いされる数字だからこそ、成績よりも正直にその評価を語ります。" } },

  /* ============ LES HUIT RAPPELS DE GOLEGÃ ============
     Même `ref` que lex-elevage.js = mêmes mots, au caractère près.
     Seules les définitions regardent Lexington. Ne JAMAIS modifier un
     mot ici sans le modifier aussi à Golegã. */

  { ref:"naisseur", lecon:1, coll:"haras",
    mots:{ fr:{m:"le naisseur", var:"l'éleveur"}, en:{m:"the breeder", p:"bri-deur"},
           es:{m:"el criador"}, it:{m:"l'allevatore"},
           de:{m:"der Züchter", p:"tsuchh-teur"}, ja:{m:"生産者", p:"seisansha"} },
    def:{ fr:"À Golegã, celui qui fait naître. Ici, son nom reste attaché au cheval dans le catalogue toute sa vie : quand le poulain gagne, c'est aussi la vente du naisseur qui monte.",
          en:"In Golegã, the one who breeds. Here his name stays with the horse in the catalogue for life: when the foal wins, the breeder's next sale climbs too.",
          es:"En Golegã, quien hace nacer. Aquí su nombre queda unido al caballo en el catálogo de por vida: cuando el potro gana, la próxima venta del criador también sube.",
          it:"A Golegã, chi fa nascere. Qui il suo nome resta legato al cavallo nel catalogo per tutta la vita: quando il puledro vince, sale anche la prossima vendita dell'allevatore.",
          de:"In Golegã der, der züchtet. Hier bleibt sein Name im Katalog ein Leben lang beim Pferd: Gewinnt das Fohlen, steigt auch der nächste Verkauf des Züchters.",
          ja:"ゴレガンでは馬を生ませる人。ここでは、その名がカタログの中で馬に一生ついて回ります。仔馬が勝てば、生産者の次のせりも値が上がるのです。" } },

  { ref:"etalon", lecon:1, coll:"haras",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-lieune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèngst"}, ja:{m:"種牡馬", p:"shubokuba"} },
    def:{ fr:"Ici, l'étalon ne voyage plus : c'est un monument qu'on visite. Sa valeur se lit dans son prix de saillie, et son nom ouvre la page de chaque catalogue — juste après « by ».",
          en:"Here the stallion no longer travels: he is a monument you visit. His worth reads in his stud fee, and his name opens every catalogue page — right after « by ».",
          es:"Aquí el semental ya no viaja: es un monumento que se visita. Su valor se lee en su tarifa de cubrición, y su nombre abre cada página del catálogo — justo después de « by ».",
          it:"Qui lo stallone non viaggia più: è un monumento che si visita. Il suo valore si legge nel costo della monta, e il suo nome apre ogni pagina del catalogo — subito dopo « by ».",
          de:"Hier reist der Hengst nicht mehr: Er ist ein Denkmal, das man besucht. Sein Wert steht im Deckgeld, und sein Name eröffnet jede Katalogseite — gleich nach « by ».",
          ja:"ここでは種牡馬はもう旅をしません。訪ねられる記念碑です。その価値は種付料に表れ、その名はカタログの各ページの冒頭、« by » のすぐ後に載ります。" } },

  { ref:"poulinière", lecon:1, coll:"haras",
    /* ⚠️ `ref` avec accent, comme dans lex-elevage.js — c'est lui qui
       fait le lien du rappel, ne pas le « corriger ». */
    mots:{ fr:{m:"la poulinière"}, en:{m:"the broodmare", p:"broud-mèr"},
           es:{m:"la yegua de vientre"}, it:{m:"la fattrice"},
           de:{m:"die Zuchtstute", p:"tsoukht-chtou-te"}, ja:{m:"繁殖牝馬", p:"hanshoku hinba"} },
    def:{ fr:"La vraie richesse d'un haras de vente. On dit ici qu'on achète le poulain, mais qu'on paye la mère : sa page du catalogue vaut plus que le cheval qui tourne dans le ring.",
          en:"The real wealth of a sales farm. They say here you buy the foal but pay for the dam: her catalogue page is worth more than the horse walking the ring.",
          es:"La verdadera riqueza de una yeguada de venta. Aquí se dice que se compra el potro pero se paga a la madre: su página del catálogo vale más que el caballo que gira en el ring.",
          it:"La vera ricchezza di un allevamento da vendita. Qui si dice che si compra il puledro ma si paga la madre: la sua pagina di catalogo vale più del cavallo che gira nel ring.",
          de:"Der wahre Reichtum eines Verkaufsgestüts. Man sagt hier: Man kauft das Fohlen, aber man bezahlt die Mutter — ihre Katalogseite ist mehr wert als das Pferd im Ring.",
          ja:"せりで生きる牧場の本当の財産。ここでは「買うのは仔馬、払うのは母馬」と言われます。カタログの母馬のページは、リングを回る馬より価値があるのです。" } },

  { ref:"poulain", lecon:1, coll:"haras",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"} },
    def:{ fr:"Au pré avec sa mère, il ne sait pas encore qu'il a une page dans un livre. Entre sa naissance et le ring, il ne s'écoule qu'un an et demi.",
          en:"Out in the paddock with his dam, he does not yet know he has a page in a book. Between his birth and the ring, only a year and a half goes by.",
          es:"En el prado con su madre, aún no sabe que tiene una página en un libro. Entre su nacimiento y el ring solo pasa un año y medio.",
          it:"Al prato con la madre, non sa ancora di avere una pagina in un libro. Tra la nascita e il ring passa solo un anno e mezzo.",
          de:"Auf der Weide bei seiner Mutter weiß es noch nicht, dass es eine Seite in einem Buch hat. Zwischen Geburt und Ring vergehen nur eineinhalb Jahre.",
          ja:"母馬と放牧地にいる仔馬は、自分に本の一ページがあることをまだ知りません。誕生からリングまで、たった一年半です。" } },

  { ref:"pouliche", lecon:1, coll:"haras",
    mots:{ fr:{m:"la pouliche"}, en:{m:"the filly", p:"fi-li"},
           es:{m:"la potra", var:"la potranca"}, it:{m:"la puledra"},
           de:{m:"das Stutfohlen", p:"chtoutt-fô-leune", var:"die Jungstute"},
           ja:{m:"牝の子馬", p:"mesu no kouma"} },
    def:{ fr:"La jeune femelle. Dans les catalogues, colts et fillies sont séparés — et une pouliche bien née se vend parfois plus cher qu'un mâle, parce qu'elle porte la famille suivante.",
          en:"The young female. Catalogues separate colts and fillies — and a well-bred filly sometimes sells for more than a colt, because she carries the next family.",
          es:"La hembra joven. Los catálogos separan machos y potras — y una potra bien nacida a veces se vende más cara que un macho, porque lleva la familia siguiente.",
          it:"La giovane femmina. I cataloghi separano maschi e puledre — e una puledra ben nata a volte si vende più cara di un maschio, perché porta la famiglia successiva.",
          de:"Das junge Stutfohlen. Kataloge trennen Hengst- und Stutfohlen — und ein gut gezogenes Stutfohlen kostet manchmal mehr als ein Hengstfohlen, weil es die nächste Familie trägt.",
          ja:"若い牝馬。カタログでは牡と牝が分けられています。血筋の良い牝馬は、次の家系を担うがゆえに、牡より高く売れることさえあります。" } },

  { ref:"saillie", lecon:1, coll:"haras",
    mots:{ fr:{m:"la saillie"}, en:{m:"the covering", p:"ka-ve-ring"},
           es:{m:"la cubrición"}, it:{m:"la monta"},
           de:{m:"der Deckakt", p:"dèk-akt"}, ja:{m:"交配", p:"kōhai"} },
    def:{ fr:"À Golegã, un geste d'élevage. Ici, une ligne de contrat : elle se réserve un an à l'avance, se paye d'avance, et le catalogue en gardera la date.",
          en:"In Golegã, a breeding act. Here, a contract line: booked a year ahead, paid up front, its date kept in the catalogue.",
          es:"En Golegã, un gesto de cría. Aquí, una línea de contrato: se reserva con un año de antelación, se paga por adelantado, y el catálogo guardará su fecha.",
          it:"A Golegã, un gesto d'allevamento. Qui, una riga di contratto: si prenota con un anno d'anticipo, si paga in anticipo, e il catalogo ne conserverà la data.",
          de:"In Golegã ein Zuchtakt. Hier eine Vertragszeile: ein Jahr im Voraus gebucht, im Voraus bezahlt, das Datum bleibt im Katalog.",
          ja:"ゴレガンでは生産の営み。ここでは契約の一行です。一年前に予約し、前払いし、その日付はカタログに残ります。" } },

  { ref:"jument-pleine", lecon:1, coll:"haras",
    mots:{ fr:{m:"la jument pleine"}, en:{m:"the mare in foal", p:"ine fôle"},
           es:{m:"la yegua preñada"}, it:{m:"la cavalla gravida"},
           de:{m:"die tragende Stute", p:"tra-gueune-de"}, ja:{m:"受胎した牝馬", p:"jutai shita hinba"} },
    def:{ fr:"Ici, elle se vend avec deux pedigrees : le sien et celui du poulain qu'elle porte. Les catalogues écrivent « in foal to » suivi du nom de l'étalon — c'est la moitié du prix.",
          en:"Here she sells with two pedigrees: her own and that of the foal she carries. Catalogues write « in foal to » followed by the stallion's name — that is half the price.",
          es:"Aquí se vende con dos pedigríes: el suyo y el del potro que lleva. Los catálogos escriben « in foal to » seguido del nombre del semental — es la mitad del precio.",
          it:"Qui si vende con due pedigree: il suo e quello del puledro che porta. I cataloghi scrivono « in foal to » seguito dal nome dello stallone — è metà del prezzo.",
          de:"Hier wird sie mit zwei Abstammungen verkauft: ihrer eigenen und der des Fohlens, das sie trägt. Kataloge schreiben « in foal to » und den Hengstnamen — das ist die halbe Summe.",
          ja:"ここでは二つの血統とともに売られます。彼女自身のものと、お腹の仔のもの。カタログには « in foal to » に続けて種牡馬の名が書かれ、それが値段の半分を決めます。" } },

  { ref:"sevrage", lecon:1, coll:"haras",
    mots:{ fr:{m:"le sevrage"}, en:{m:"the weaning", p:"oui-ning"},
           es:{m:"el destete"}, it:{m:"lo svezzamento"},
           de:{m:"das Absetzen", p:"ap-zè-tseune"}, ja:{m:"離乳", p:"rinyū"} },
    def:{ fr:"La séparation d'avec la mère, vers cinq ou six mois. Ici elle marque un changement d'état civil : le poulain devient un weanling — déjà une catégorie de vente.",
          en:"The parting from the dam, around five or six months. Here it changes his legal status: the foal becomes a weanling — already a sales category.",
          es:"La separación de la madre, hacia los cinco o seis meses. Aquí marca un cambio de estado: el potro se convierte en weanling — ya una categoría de venta.",
          it:"La separazione dalla madre, verso i cinque o sei mesi. Qui segna un cambio di stato: il puledro diventa un weanling — già una categoria di vendita.",
          de:"Die Trennung von der Mutter, mit fünf oder sechs Monaten. Hier ändert sie den Status: Das Fohlen wird ein Weanling — schon eine Verkaufskategorie.",
          ja:"生後五、六ヶ月ごろの母子の別れ。ここではそれが身分の変わり目です。仔馬は「ウィンリング」となり、それはすでにせりの一区分なのです。" } },

  /* ============ LA SEULE ENTRÉE D'ÉLEVAGE VRAIMENT NEUVE ============ */

  { ref:"colt", lecon:1, coll:"haras",
    /* ⚠️ absent de Golegã, vérifié. Les es/it/de/ja sont des
       reconstructions : l'espagnol dit déjà « potro » pour le poulain en
       général (cf. rappel ci-dessus), le catalogue distingue par
       « macho ». À faire relire — voir DOUTES-lexington-haras.md. */
    mots:{ fr:{m:"le jeune mâle"}, en:{m:"the colt", p:"kôlte"},
           es:{m:"el macho", var:"el potro macho"}, it:{m:"il puledro maschio"},
           de:{m:"das Hengstfohlen", p:"hèngst-fô-leune", var:"der Junghengst"},
           ja:{m:"牡馬", p:"boba"} },
    def:{ fr:"Le pendant de la filly : le jeune mâle entier, jusqu'à quatre ans. C'est LE mot des catalogues — « colt » et « filly » sont les deux colonnes de toute vente.",
          en:"The counterpart of the filly: the young entire male, up to four years old. It is THE catalogue word — « colt » and « filly » are the two columns of every sale.",
          es:"El equivalente de la filly: el macho joven entero, hasta los cuatro años. Es LA palabra de los catálogos — « colt » y « filly » son las dos columnas de toda venta.",
          it:"Il corrispettivo della filly: il giovane maschio intero, fino ai quattro anni. È LA parola dei cataloghi — « colt » e « filly » sono le due colonne di ogni vendita.",
          de:"Das Gegenstück zur Filly: das junge, nicht kastrierte männliche Pferd, bis vier Jahre. DAS Katalogwort — « colt » und « filly » sind die zwei Spalten jeder Auktion.",
          ja:"フィリーと対をなす語。四歳までの若い牡馬を指します。カタログの基本語であり、« colt » と « filly » はあらゆるせりの二本柱です。" } }

  ],

  /* Phrases : règle des 7 mots en français pour les trois premières.
     Les dix-huit suivantes sont les répliques de visite de Blandine
     (17 août 2026) : longues par nature, la règle des 7 mots ne s'y
     applique pas. Français et anglais = ses mots. */
  phrases: [

  { lecon:1, p:{ fr:"Le chant s'arrête : c'est vendu.",
                 en:"The chant stops: sold.",
                 es:"El canto se detiene: vendido.",
                 it:"Il canto si ferma: venduto.",
                 de:"Der Gesang verstummt: verkauft.",
                 ja:"歌が止まる。売れたのだ。" } },

  { lecon:1, p:{ fr:"On achète un numéro, pas un nom.",
                 en:"You buy a number, not a name.",
                 es:"Se compra un número, no un nombre.",
                 it:"Si compra un numero, non un nome.",
                 de:"Man kauft eine Nummer, keinen Namen.",
                 ja:"買うのは番号であって、名前ではない。" } },

  { lecon:1, p:{ fr:"Ici, personne n'élève pour garder.",
                 en:"Here, no one breeds to keep.",
                 es:"Aquí nadie cría para quedarse.",
                 it:"Qui nessuno alleva per tenere.",
                 de:"Hier züchtet niemand, um zu behalten.",
                 ja:"ここでは誰も、残すために育てない。" } }

  ],

  /* ================================================================
     LA MISE EN SITUATION DE LEXINGTON — la visite du haras.
     Préparée le 17 août 2026 sur le schéma du dialogue de Golegã
     (ville · titres · phrases{ref, temps, dit, mots, 6 langues}).
     Les dix-huit phrases sont celles de Blandine (fr/en, ses mots) ;
     elles VIVAIENT dans `phrases:[]` et ont été BASCULÉES ici pour
     suivre le modèle de Golegã, où les phrases de dialogue ne sont
     pas dans les exercices de leçon. Pour revenir en arrière : tout
     recopier dans phrases[] et retirer temps/dit/mots.

     ⚠️ SIX TEMPS, PAS CINQ. L'arc est celui de Blandine, ses mots :
     « arrivée au haras → visite des étalons → poulinières et poulains
     → pedigree → choix d'un croisement → yearlings et ventes aux
     enchères ». Golegã n'a que cinq temps et je n'ai pas pu vérifier
     si la page fille accepte six : la version de lingo-dialogue.html
     fournie est périmée (elle ne lit pas P.get("c"), le test du
     PATCH-lingo-dialogue-golega.md). Si six ne passe pas, fusionner
     les temps 5 et 6 (« Le choix et la vente »).

     ⚠️ Le champ `titres` est INERTE (cf. patch Golegã) : le moteur lit
     la table TITRES de la page fille. Il n'est ici que pour ne pas
     réinventer les intitulés au moment du geste.

     ⚠️ JAPONAIS : coupé par groupes, comme lex-endurance.js. Le
     dialogue de Golegã coupe plus fin (morphème par morphème,
     ponctuation détachée : « い ます 。 »). Les deux segmentations
     coexistent donc dans le module — à trancher puis unifier, c'est
     l'exercice de remise en ordre qui en dépend.

     `dit` : "joueuse" = la visiteuse, "club" = l'éleveur qui reçoit,
     comme à Golegã. `mots` : refs des concepts portés par la phrase
     (tous existent dans ce chapitre, rappels compris).
     ================================================================ */
  dialogue: {
    /* ⚠️ 18/08 : TROIS CHAMPS AJOUTÉS par cohérence avec les 33 autres
       dialogues du module — `lecon`, `temps`, `langues`. Ils étaient
       absents de ce bloc.
       🟥 LE MOTEUR N'EN A PAS BESOIN : `lingo-dialogue.html` ne lit que
       `p.temps` sur CHAQUE PHRASE, et regroupe les scènes à partir de
       là. Lexington fonctionnait donc déjà. Mais leur absence créait
       une divergence de forme, et une session future aurait pu s'y
       fier à tort. Vérifié avant d'écrire : rien d'autre à changer. */
    ville: "lexington", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],
    titres: { 1:"L'arrivée au haras", 2:"La visite des étalons",
              3:"Poulinières et poulains", 4:"La lecture du pedigree",
              5:"Le choix d'un croisement", 6:"Yearlings et enchères" },
    phrases: [

  { ref:"ph-lexington-visiter", temps:1, dit:"joueuse",
    mots:["haras"],
    fr:"Bonjour, est-il possible de visiter le haras aujourd'hui ?",
    en:"Hello, is it possible to visit the stud farm today?",
    es:"Buenos días, ¿es posible visitar la yeguada hoy?",
    it:"Buongiorno, è possibile visitare l'allevamento oggi?",
    de:"Guten Tag, ist es möglich, das Gestüt heute zu besichtigen?",
    ja:"こんにちは。 今日 牧場 を 見学 できます か ?" },

  { ref:"ph-lexington-combien-par-an", temps:1, dit:"joueuse",
    mots:["haras","naisseur"],
    fr:"Combien de chevaux sont élevés ici chaque année ?",
    en:"How many horses are bred here each year?",
    es:"¿Cuántos caballos se crían aquí cada año?",
    it:"Quanti cavalli vengono allevati qui ogni anno?",
    de:"Wie viele Pferde werden hier jedes Jahr gezüchtet?",
    ja:"ここ では 毎年 何頭 の 馬 を 生産 しています か ?" },

  { ref:"ph-lexington-etalon-dispo", temps:2, dit:"joueuse",
    mots:["etalon","saillie"],
    fr:"Cet étalon est-il disponible pour la reproduction cette saison ?",
    en:"Is this stallion available for breeding this season?",
    es:"¿Está disponible este semental para la reproducción esta temporada?",
    it:"Questo stallone è disponibile per la riproduzione questa stagione?",
    de:"Steht dieser Hengst in dieser Saison zur Zucht zur Verfügung?",
    ja:"この 種牡馬 は 今シーズン 種付け が 可能 です か ?" },

  { ref:"ph-lexington-resultats", temps:2, dit:"joueuse",
    mots:["etalon"],
    fr:"Quels sont ses principaux résultats en compétition ?",
    en:"What are his main competition results?",
    es:"¿Cuáles son sus principales resultados en competición?",
    it:"Quali sono i suoi principali risultati in gara?",
    de:"Was sind seine wichtigsten Turnierergebnisse?",
    ja:"主な 競技 成績 は 何 です か ?" },

  { ref:"ph-lexington-prix-saillie", temps:2, dit:"joueuse",
    mots:["prix-saillie","etalon"],
    fr:"Quel est le prix de la saillie de cet étalon ?",
    en:"What is the stud fee for this stallion?",
    es:"¿Cuál es la tarifa de cubrición de este semental?",
    it:"Qual è il costo della monta di questo stallone?",
    de:"Wie hoch ist das Deckgeld für diesen Hengst?",
    ja:"この 種牡馬 の 種付料 は いくら です か ?" },

  { ref:"ph-lexington-pleine-de-qui", temps:3, dit:"joueuse",
    mots:["jument-pleine","etalon"],
    fr:"Cette jument est pleine de quel étalon ?",
    en:"Which stallion is this mare in foal to?",
    es:"¿De qué semental está preñada esta yegua?",
    it:"Di quale stallone è gravida questa fattrice?",
    de:"Von welchem Hengst ist diese Stute tragend?",
    ja:"この 繁殖牝馬 は どの 種牡馬 の 仔 を 受胎 しています か ?" },

  { ref:"ph-lexington-poulain-prevu", temps:3, dit:"joueuse",
    mots:["poulain","jument-pleine"],
    fr:"Quand le poulain est-il prévu ?",
    en:"When is the foal due?",
    es:"¿Para cuándo se espera el potro?",
    it:"Quando è previsto il puledro?",
    de:"Wann ist das Fohlen fällig?",
    ja:"出産 の 予定 は いつ です か ?" },

  { ref:"ph-lexington-jument-produit", temps:3, dit:"club",
    mots:["poulinière"],
    fr:"Cette jument a déjà produit plusieurs très bons chevaux.",
    en:"This mare has already produced several very good horses.",
    es:"Esta yegua ya ha producido varios caballos muy buenos.",
    it:"Questa fattrice ha già prodotto diversi cavalli molto buoni.",
    de:"Diese Stute hat schon mehrere sehr gute Pferde gebracht.",
    ja:"この 牝馬 は すでに 良い 馬 を 何頭 も 出しています。" },

  { ref:"ph-lexington-poulains-au-pre", temps:3, dit:"joueuse",
    mots:["poulain","dam"],
    fr:"Les poulains restent-ils au pré avec leurs mères toute la journée ?",
    en:"Do the foals stay out in the pasture with their dams all day?",
    es:"¿Los potros se quedan en el prado con sus madres todo el día?",
    it:"I puledri restano al prato con le madri tutto il giorno?",
    de:"Bleiben die Fohlen den ganzen Tag mit ihren Müttern auf der Weide?",
    ja:"仔馬 は 一日中 母馬 と 放牧 されています か ?" },

  { ref:"ph-lexington-sevrage-age", temps:3, dit:"joueuse",
    mots:["sevrage","poulain"],
    fr:"À quel âge sevrez-vous les poulains ?",
    en:"At what age do you wean the foals?",
    es:"¿A qué edad destetan a los potros?",
    it:"A che età svezzate i puledri?",
    de:"In welchem Alter setzen Sie die Fohlen ab?",
    ja:"仔馬 は 何ヶ月 で 離乳 させます か ?" },

  { ref:"ph-lexington-voir-pedigree", temps:4, dit:"joueuse",
    mots:["pedigree","poulain"],
    fr:"Puis-je voir le pedigree de ce poulain ?",
    en:"Can I see this foal's pedigree?",
    es:"¿Puedo ver el pedigrí de este potro?",
    it:"Posso vedere il pedigree di questo puledro?",
    de:"Darf ich die Abstammung dieses Fohlens sehen?",
    ja:"この 仔馬 の 血統 を 見せて もらえます か ?" },

  { ref:"ph-lexington-ressemble-pere", temps:4, dit:"club",
    mots:["sire","poulain"],
    fr:"Le poulain ressemble beaucoup à son père.",
    en:"The foal looks a lot like his sire.",
    es:"El potro se parece mucho a su padre.",
    it:"Il puledro assomiglia molto al padre.",
    de:"Das Fohlen sieht seinem Vater sehr ähnlich.",
    ja:"この 仔馬 は 父 に よく 似ています。" },

  { ref:"ph-lexington-temperament-mere", temps:4, dit:"club",
    mots:["dam"],
    fr:"Il a hérité du tempérament calme de sa mère.",
    en:"He inherited his dam's calm temperament.",
    es:"Ha heredado el temperamento tranquilo de su madre.",
    it:"Ha ereditato il temperamento calmo della madre.",
    de:"Er hat das ruhige Temperament seiner Mutter geerbt.",
    ja:"母 の 落ち着いた 気性 を 受け継いでいます。" },

  { ref:"ph-lexington-sport-ou-course", temps:5, dit:"joueuse",
    mots:["naisseur"],
    fr:"Cherchez-vous plutôt à produire des chevaux de sport ou des chevaux de course ?",
    en:"Are you mainly breeding sport horses or racehorses?",
    es:"¿Buscan producir sobre todo caballos de deporte o caballos de carreras?",
    it:"Cercate di produrre soprattutto cavalli da sport o cavalli da corsa?",
    de:"Züchten Sie vor allem Sportpferde oder Rennpferde?",
    ja:"主に 乗用馬 を 目指しています か、 それとも 競走馬 です か ?" },

  { ref:"ph-lexington-criteres-croisement", temps:5, dit:"joueuse",
    mots:["etalon","poulinière"],
    fr:"Quels critères utilisez-vous pour choisir un étalon pour une jument ?",
    en:"What criteria do you use when choosing a stallion for a mare?",
    es:"¿Qué criterios utilizan para elegir un semental para una yegua?",
    it:"Quali criteri usate per scegliere uno stallone per una fattrice?",
    de:"Nach welchen Kriterien wählen Sie einen Hengst für eine Stute aus?",
    ja:"牝馬 に 合う 種牡馬 は どんな 基準 で 選びます か ?" },

  { ref:"ph-lexington-recherche-modele", temps:5, dit:"joueuse",
    mots:["yearling"],
    fr:"Nous recherchons un cheval avec de bons aplombs, un bon modèle, du sang et un excellent tempérament.",
    en:"We're looking for a horse with correct limbs, good conformation, plenty of blood and an excellent temperament.",
    es:"Buscamos un caballo con buenos aplomos, buena conformación, sangre y un temperamento excelente.",
    it:"Cerchiamo un cavallo con buoni appiombi, buona conformazione, sangue e un temperamento eccellente.",
    de:"Wir suchen ein Pferd mit korrekter Gliedmaßenstellung, gutem Körperbau, Blut und ausgezeichnetem Temperament.",
    ja:"良い 肢勢 と 良い 体型、 血量、 優れた 気性 の 馬 を 探しています。" },

  { ref:"ph-lexington-yearling-vendu", temps:6, dit:"joueuse",
    mots:["yearling","encheres"],
    fr:"Ce yearling sera-t-il vendu aux enchères cette année ?",
    en:"Will this yearling be sold at auction this year?",
    es:"¿Se venderá este yearling en subasta este año?",
    it:"Questo yearling sarà venduto all'asta quest'anno?",
    de:"Wird dieser Jährling dieses Jahr auf der Auktion verkauft?",
    ja:"この 1歳馬 は 今年 の せり に 上場 されます か ?" },

  { ref:"ph-lexington-reste-jusqu-debourrage", temps:6, dit:"club",
    mots:["poulain","haras"],
    fr:"Ce poulain restera au haras jusqu'au début de son entraînement.",
    en:"This foal will stay at the stud farm until he starts his training.",
    es:"Este potro se quedará en la yeguada hasta que empiece su entrenamiento.",
    it:"Questo puledro resterà nell'allevamento fino all'inizio del suo addestramento.",
    de:"Dieses Fohlen bleibt im Gestüt, bis sein Training beginnt.",
    ja:"この 仔馬 は 調教 が 始まる まで 牧場 に 残ります。" },
  ]
  }
};
