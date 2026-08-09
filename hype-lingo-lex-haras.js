/* hype-lingo-lex-haras.js — Hype Linguae · Lexington · « Le haras »
   ==================================================================
   10 CONCEPTS, UNE LEÇON.

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
          ja:"馬の家系。カタログに白黒はっきりと記される。ゴレガンでは血統を生み出し、ここでは血統を読む。" } }

  ],

  /* Phrases : règle des 7 mots en français. */
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

  ]
};
