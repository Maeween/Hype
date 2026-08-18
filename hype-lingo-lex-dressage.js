/* hype-lingo-lex-dressage.js — Hype Lingo · Chapitre 6 · « Le dressage »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Ville : Windsor. Souvenir : la lettre A.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`
   (réservé aux chapitres Le cours et Les urgences).

   PAS DE DOUBLON avec le chapitre 5 · Le cours, qui possède déjà la
   piste, la diagonale, le cercle, la volte, la serpentine, le coin, la
   ligne du milieu, les mains gauche/droite, les allures, les
   transitions, allonger/raccourcir et la halte. Ce chapitre-ci ne prend
   que ce qui appartient en propre au dressage : le rectangle et ses
   lettres, les mouvements latéraux, les qualités de l'échelle de
   progression, et la notation.

   ⚠️ FAUX AMI INTERNE AU FRANÇAIS, traité dans le concept `reprise-test` :
   « la reprise » désigne le GROUPE d'élèves en manège (chapitre 5,
   `toute-reprise`) ET le TEST de dressage. L'anglais sépare les deux :
   the ride / the test. C'est l'un des pièges les plus utiles du module.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'échelle de progression allemande (Ausbildungsskala) est la
       référence mondiale, et ses six mots ne se traduisent
       qu'approximativement — les juges anglophones emploient parfois
       l'allemand tel quel (Durchlässigkeit, Losgelassenheit).
     · le moyen mnémotechnique britannique pour les lettres du rectangle.
     · l'espagnol ne dit pas « dressage » mais **la doma clásica**.
     · l'allemand appelle le trot allongé « starker Trab », le trot fort.
     · **die Kür** s'emploie tel quel dans le monde entier.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Le japonais est de loin le plus
   incertain de tout le module sur ce chapitre : le dressage japonais
   emploie massivement des emprunts en katakana, et je ne sais jamais si
   le terme sino-japonais que je propose est celui qu'un cavalier
   emploie. Toutes les entrées // ?? sont au fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.dressage = {
  ref: "dressage",
  chapitre: 6,
  titre: { fr:"Le dressage", en:"Dressage", es:"La doma clásica", it:"Il dressage", de:"Die Dressur", ja:"馬場馬術" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LE RECTANGLE ET LES LETTRES ============ */

  { ref:"dressage", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le dressage"}, en:{m:"dressage", p:"drè-sadj"},
           es:{m:"la doma clásica", var:"la doma"}, it:{m:"il dressage"},
           de:{m:"die Dressur", p:"drè-sour"}, ja:{m:"馬場馬術", p:"bababajutsu"} },
    def:{ fr:"⚠️ Le mot français a voyagé partout — sauf en espagnol, qui dit **la doma clásica**, et au Japon, qui dit littéralement « l'art équestre du rectangle ». Et en anglais il se prononce à la française, sans accent.",
          en:"The French word travelled everywhere except Spanish, which says doma clásica, and Japanese, which says literally « the arena art ».",
          es:"⚠️ La palabra francesa viajó a todas partes — salvo al español, que dice **la doma clásica**, y a Japón, que dice literalmente « el arte ecuestre del rectángulo ». Y en inglés se pronuncia a la francesa, sin acento.",
          it:"⚠️ La parola francese ha viaggiato ovunque — salvo in spagnolo, che dice **la doma clásica**, e in Giappone, che dice alla lettera « l'arte equestre del rettangolo ». E in inglese si pronuncia alla francese, senza accento.",
          de:"⚠️ Das französische Wort reiste überallhin — außer ins Spanische (**la doma clásica**) und nach Japan, das wörtlich « die Reitkunst des Vierecks » sagt. Im Englischen wird es französisch ausgesprochen.",
          ja:"⚠️ このフランス語はほぼ世界中を旅しました — 例外はスペイン語（**la doma clásica**）と日本語（馬場馬術、文字どおり「馬場の馬術」）。英語でもフランス語ふうに発音します。" } },

  { ref:"rectangle", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le rectangle"}, en:{m:"the arena", p:"a-ri-na", var:"the school"},
           es:{m:"la pista de doma"}, it:{m:"il rettangolo"},
           de:{m:"das Dressurviereck", p:"drè-sour-fir-èk"}, ja:{m:"馬場", p:"baba"} },
    def:{ fr:"20 × 60 m en compétition, 20 × 40 m dans les épreuves de club. L'allemand le nomme par sa forme, Viereck, « le quadrilatère ».",
          en:"20 × 60 m in competition, 20 × 40 m at club level. German names it by its shape: Viereck, the quadrilateral.",
          es:"20 × 60 m en competición, 20 × 40 m en las pruebas de club. El alemán lo nombra por su forma, Viereck, « el cuadrilátero ».",
          it:"20 × 60 m in competizione, 20 × 40 m nelle prove di club. Il tedesco lo chiama per la forma, Viereck, « il quadrilatero ».",
          de:"20 × 60 m im Turnier, 20 × 40 m in Clubprüfungen. Das Deutsche benennt es nach der Form: das Viereck.",
          ja:"競技では20×60m、クラブの試合では20×40m。ドイツ語は形そのままに Viereck（四角形）と呼びます。" } },

  { ref:"lettre", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la lettre"}, en:{m:"the letter", p:"lè-teur"},
           es:{m:"la letra"}, it:{m:"la lettera"},
           de:{m:"der Buchstabe", p:"boureh-chta-be"}, ja:{m:"文字", p:"moji"} },
    def:{ fr:"A K E H C M B F autour du rectangle, X au centre — les mêmes lettres dans tous les pays du monde, et personne ne sait vraiment pourquoi celles-là. Les Britanniques les retiennent avec une phrase : « All King Edward's Horses Can Manage Big Fences ».",
          en:"A K E H C M B F round the arena and X in the middle — the same letters worldwide, and nobody quite knows why. The British remember them as « All King Edward's Horses Can Manage Big Fences ».",
          es:"A K E H C M B F alrededor del rectángulo, X en el centro — las mismas letras en todos los países del mundo, y nadie sabe de verdad por qué esas. Los británicos las memorizan con una frase: « All King Edward's Horses Can Manage Big Fences ».",
          it:"A K E H C M B F attorno al rettangolo, X al centro — le stesse lettere in tutti i paesi del mondo, e nessuno sa davvero perché proprio quelle. I britannici le ricordano con una frase: « All King Edward's Horses Can Manage Big Fences ».",
          de:"A K E H C M B F ums Viereck, X in der Mitte — dieselben Buchstaben in aller Welt, und niemand weiß wirklich, warum gerade diese. Die Briten merken sie sich mit dem Satz « All King Edward's Horses Can Manage Big Fences ».",
          ja:"馬場を囲む A K E H C M B F、中央に X — 世界じゅうどこでも同じ文字で、なぜこの並びなのかは誰も本当には知りません。イギリス人は文で覚えます：« All King Edward's Horses Can Manage Big Fences »。" } },

  { ref:"entree", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"l'entrée"}, en:{m:"the entry", p:"èn-tri", var:"enter at A"},
           es:{m:"la entrada"}, it:{m:"l'ingresso"},
           de:{m:"die Einfahrt", p:"aïn-fart"}, ja:{m:"入場", p:"nyūjō"} },
    def:{ fr:"Toujours par A, dans l'axe, après la cloche du juge. C'est la première note du protocole et souvent celle qui donne le ton de toute la reprise.",
          en:"Always at A, on the centre line, after the judge's bell. It is the first mark on the sheet and often sets the tone.",
          es:"Siempre por A, en el eje, tras la campana del juez. Es la primera nota del protocolo y a menudo la que da el tono de toda la reprise.",
          it:"Sempre per A, sull'asse, dopo la campana del giudice. È il primo voto del protocollo e spesso quello che dà il tono a tutta la ripresa.",
          de:"Immer bei A, auf der Mittellinie, nach der Glocke des Richters. Die erste Note des Protokolls — und oft die, die den Ton der ganzen Aufgabe setzt.",
          ja:"入場は必ずAから、中央線に乗って、審判のベルの後に。採点表の最初の点であり、演技全体の印象を決めることも多い一点です。" } },

  { ref:"salut", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le salut"}, en:{m:"the salute", p:"sa-loute"},
           es:{m:"el saludo"}, it:{m:"il saluto"},
           de:{m:"der Gruß", p:"grouss"}, ja:{m:"敬礼", p:"keirei"} },
    def:{ fr:"À l'arrêt, face au juge, en début et en fin de reprise. Un salut oublié coûte des points partout, et un salut trop long fait bouger le cheval.",
          en:"At the halt, facing the judge, at the start and end of the test. A forgotten salute costs marks everywhere.",
          es:"Parado, de frente al juez, al principio y al final de la reprise. Un saludo olvidado cuesta puntos en todas partes, y uno demasiado largo hace mover al caballo.",
          it:"Da fermo, di fronte al giudice, all'inizio e alla fine della ripresa. Un saluto dimenticato costa punti ovunque, e uno troppo lungo fa muovere il cavallo.",
          de:"Im Halten, dem Richter zugewandt, am Anfang und am Ende. Ein vergessener Gruß kostet überall Punkte — ein zu langer bringt das Pferd zum Wandern.",
          ja:"停止して、審判に向かって、演技の最初と最後に。敬礼を忘れればどの国でも減点、長すぎれば馬が動いてしまいます。" } },

  { ref:"juge", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le juge"}, en:{m:"the judge", p:"djeudj"},
           es:{m:"el juez"}, it:{m:"il giudice"},
           de:{m:"der Richter", p:"rirh-teur"}, ja:{m:"審判員", p:"shinpan'in"} }, // ??
    def:{ fr:"Assis en C, parfois entouré d'un jury de trois à sept juges en grand championnat. On le salue, on ne lui parle pas pendant la reprise.",
          en:"Sitting at C, sometimes one of a panel of three to seven at championship level. You salute, you do not talk to them.",
          es:"Sentado en C, a veces rodeado de un jurado de tres a siete jueces en gran campeonato. Se le saluda, no se le habla durante la reprise.",
          it:"Seduto in C, a volte con una giuria da tre a sette giudici nei grandi campionati. Lo si saluta, non gli si parla durante la ripresa.",
          de:"Sitzt bei C, bei großen Championaten mit drei bis sieben Richtern. Man grüßt ihn — man spricht während der Aufgabe nicht mit ihm.",
          ja:"Cの位置に座り、大きな選手権では三〜七人の審判団になることも。敬礼はしますが、演技中に話しかけてはいけません。" } },

  { ref:"lecteur", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le lecteur"}, en:{m:"the commander", p:"ko-man-deur", var:"the reader"},
           es:{m:"el lector"}, it:{m:"il lettore"},
           de:{m:"der Ansager", p:"an-za-gueur", var:"der Kommandant"}, ja:{m:"読み上げ係", p:"yomiage-gakari"} }, /* precise (rapport 07/08) */
    def:{ fr:"La personne qui lit la reprise à voix haute, autorisée dans la plupart des épreuves de club. ⚠️ En anglais on dit **commander**, un mot qui n'a rien à voir avec commander quelque chose.",
          en:"The person reading the test aloud, allowed at most club levels. English calls them the commander, nothing to do with ordering.",
          es:"La persona que lee la reprise en voz alta, autorizada en la mayoría de las pruebas de club. ⚠️ En inglés se dice **commander**, palabra que no tiene nada que ver con mandar algo.",
          it:"La persona che legge la ripresa a voce alta, autorizzata nella maggior parte delle prove di club. ⚠️ In inglese si dice **commander**, una parola che non c'entra col comandare qualcosa.",
          de:"Die Person, die die Aufgabe laut vorliest — in den meisten Clubprüfungen erlaubt. ⚠️ Auf Englisch heißt sie **commander**, was nichts mit Befehlen zu tun hat.",
          ja:"経路を声に出して読み上げる係。ほとんどのクラブ競技で認められています。⚠️ 英語では **commander** — 命令とは何の関係もない言葉です。" } },

  /* ================================================================
     NEUF ENTRÉES AJOUTÉES le 18/08/2026 pour WINDSOR, d'après le lexique
     fourni par Blandine.
     🟥 SA REMARQUE, ET ELLE EST JUSTE : « certains termes deviennent
     beaucoup plus intéressants que lice ou même entrée en A ». `lice` et
     `grand-cote` décrivent le DÉCOR ; le coin, la diagonale, rééquilibrer
     et tomber sur les épaules sont ce qu'on ENTEND VRAIMENT au bord d'un
     rectangle. ⚠️ Les deux anciens sont conservés : ils ne gênent pas et
     s'apprennent en lisant.
     ⚠️ `protocole` est en LEÇON 4 et `epaule-dedans`, `appuyer`,
     `changement-pied`, `trot-allonge` en LEÇON 2 : ils s'emploient en
     `motsAilleurs`, pas de duplication.
     ================================================================ */

  { ref:"ligne-milieu", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la ligne du milieu"}, en:{m:"the centre line", p:"sènn-teur laïne", var:"center line (US)"},
           es:{m:"la línea media"}, it:{m:"la linea mediana"},
           de:{m:"die Mittellinie", p:"mi-teul-li-ni-e"}, ja:{m:"中央線", p:"chūōsen"} },
    def:{ fr:"🟥 LA SEULE LIGNE OÙ LE JUGE VOUS VOIT DE FACE, et c'est ce qui la rend redoutable : de face, la moindre déviation se voit, et un cheval qui n'est pas droit ne peut plus le cacher. ⚠️ Elle ouvre et ferme toutes les reprises — on entre en A et on ressort en A ou en G. Une reprise se joue beaucoup sur ses deux lignes du milieu.",
          en:"The only line where the judge sees you head-on, and that's what makes it fearsome: from the front the slightest drift shows, and a horse who isn't straight can no longer hide it. It opens and closes every test.",
          es:"La única línea donde el juez le ve de frente: la menor desviación se nota y un caballo que no está derecho no puede ocultarlo.",
          it:"L'unica linea dove il giudice ti vede di fronte: la minima deviazione si vede e un cavallo non dritto non può nasconderlo.",
          de:"Die einzige Linie, auf der der Richter Sie von vorn sieht: jede Abweichung zeigt sich, und ein nicht gerades Pferd kann es nicht mehr verbergen.",
          ja:"審判が正面から見る唯一の線。それゆえ手強いのです。正面からは わずかな ずれ も 見え、まっすぐでない馬はもう隠せません。すべての演技はこの線で始まり、この線で終わります。" } },

  { ref:"diagonale", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la diagonale"}, en:{m:"the diagonal", p:"daï-a-ge-neul"},
           es:{m:"la diagonal"}, it:{m:"la diagonale"},
           de:{m:"die Diagonale", p:"di-a-go-na-le"}, ja:{m:"斜線", p:"shasen"} },
    def:{ fr:"La ligne qui traverse le rectangle d'un coin à l'autre. ⚠️ C'est là qu'on montre les allongements — c'est la plus longue ligne droite disponible. 🟥 ET L'ERREUR CLASSIQUE : préparer sa transition DANS le coin au lieu de la préparer AVANT la fin de la diagonale. Le juge voit alors un cheval qui se déséquilibre en tournant.",
          en:"The line crossing the arena corner to corner. That's where extensions are shown — it's the longest straight line available. The classic mistake: preparing the transition in the corner instead of before the end of the diagonal.",
          es:"La línea que cruza el rectángulo de una esquina a otra. Ahí se muestran los alargamientos. El error clásico: preparar la transición en la esquina.",
          it:"La linea che attraversa il rettangolo da un angolo all'altro. È lì che si mostrano gli allunghi. L'errore classico: preparare la transizione nell'angolo.",
          de:"Die Linie quer durchs Viereck. Dort werden die Verstärkungen gezeigt. Der klassische Fehler: den Übergang in der Ecke vorzubereiten statt vor dem Ende der Diagonale.",
          ja:"馬場を角から角へ横切る線。伸長を見せるのはここで、使える最も長い直線です。よくある誤りは、斜線の終わりの前ではなく、角に入ってから移行を準備してしまうことです。" } },

  { ref:"coin", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le coin"}, en:{m:"the corner", p:"kor-neur"},
           es:{m:"la esquina"}, it:{m:"l'angolo"},
           de:{m:"die Ecke", p:"è-ke"}, ja:{m:"隅角", p:"gūkaku"} },
    def:{ fr:"🟥 LE COIN N'EST PAS UN PASSAGE OBLIGÉ, C'EST UN OUTIL. On y va chercher l'incurvation, on y rééquilibre, on y prépare le mouvement suivant. ⚠️ **NE PAS COUPER LE VIRAGE** — *don't cut the corner* — est la remarque la plus fréquente d'un juge : un cheval qui coupe gagne du temps mais perd son équilibre, et ça se voit sur tout ce qui suit.",
          en:"A corner isn't something to get through, it's a tool. You go into it for bend, you rebalance there, you set up the next movement. « Don't cut the corner » is a judge's commonest remark: a horse who cuts saves time but loses balance.",
          es:"La esquina no es un paso obligado sino una herramienta: se busca la incurvación, se reequilibra, se prepara el movimiento siguiente. No cortar el giro.",
          it:"L'angolo non è un passaggio obbligato ma uno strumento: ci si va a cercare l'incurvamento, si riequilibra, si prepara il movimento dopo.",
          de:"Die Ecke ist kein Durchgang, sondern ein Werkzeug: dort holt man Biegung, balanciert neu, bereitet die nächste Lektion vor. Ecken nicht schneiden.",
          ja:"隅角は通過点ではなく道具です。そこで湾曲を求め、立て直し、次の運動を準備します。「隅角を切るな」は審判が最もよく言う言葉です。切れば時間は稼げますが、バランスを失い、その後のすべてに響きます。" } },

  { ref:"piste", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la piste"}, en:{m:"the track", p:"trak"},
           es:{m:"la pista"}, it:{m:"la pista"},
           de:{m:"der Hufschlag", p:"houf-chlak"}, ja:{m:"蹄跡", p:"teiseki"} },
    def:{ fr:"⚠️ L'ALLEMAND EST LE PLUS PARLANT : **der Hufschlag**, « le coup de sabot » — la trace laissée le long de la lice, à un mètre de la barrière. C'est la référence de tout : être sur la piste, quitter la piste, revenir sur la piste. 🟥 Et dans l'épaule en dedans, ce sont LES HANCHES qui y restent pendant que les épaules la quittent.",
          en:"German says it best: der Hufschlag, the hoof-beat — the line worn along the boards, a metre from the edge. Everything refers to it: on the track, off the track, back to the track. In shoulder-in it's the hindquarters that stay on it.",
          es:"El alemán es el más elocuente: Hufschlag, la huella dejada a lo largo de la valla. Todo se refiere a ella: estar en la pista, dejarla, volver.",
          it:"Il tedesco è il più eloquente: Hufschlag, l'orma lasciata lungo la staccionata. Tutto si riferisce a lei.",
          de:"Der Hufschlag: die Spur entlang der Bande, einen Meter vom Rand. Alles bezieht sich darauf. Beim Schulterherein bleibt die Hinterhand darauf.",
          ja:"ドイツ語の Hufschlag（蹄の跡）が最も的確です。柵に沿って一メートル内側に残る跡のこと。すべてがこれを基準にします。蹄跡上にいる、外れる、戻る。肩を内に入れる運動では、蹄跡に残るのは後躯のほうです。" } },

  { ref:"transition-descendante", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la transition descendante"}, en:{m:"the downward transition", p:"daoun-weurd"},
           es:{m:"la transición descendente"}, it:{m:"la transizione discendente"},
           de:{m:"der Übergang abwärts", p:"u-beur-gann"}, ja:{m:"減速の移行", p:"gensoku no ikō"} },
    def:{ fr:"🟥 LA PLUS DIFFICILE DES DEUX, et la plus révélatrice. ⚠️ **ON NE TIRE PAS POUR RALENTIR** : on se grandit, on rééquilibre, et on garde l'activité des postérieurs. Un cheval qu'on tire tombe sur les épaules et raccourtit par-devant au lieu de s'asseoir par-derrière. C'est là qu'un juge voit tout de suite si le cheval est vraiment porté.",
          en:"The harder of the two, and the most revealing. You don't pull to slow down: you sit tall, rebalance, and keep the hind legs active. A horse you pull falls onto the forehand and shortens in front instead of sitting behind.",
          es:"La más difícil de las dos y la más reveladora. No se tira para frenar: uno se yergue, reequilibra y mantiene la actividad de los posteriores.",
          it:"La più difficile delle due e la più rivelatrice. Non si tira per rallentare: ci si allunga, si riequilibra, si tiene attivo il posteriore.",
          de:"Die schwerere der beiden und die aufschlussreichste. Man zieht nicht zum Verlangsamen: man wächst, balanciert neu und hält die Hinterhand aktiv.",
          ja:"二つの移行のうち難しいほうで、最も多くを露わにします。減速のために引いてはいけません。上体を伸ばし、立て直し、後肢の活動を保ちます。引かれた馬は前躯に落ち、後ろで座る代わりに前で縮みます。" } },

  { ref:"reequilibrer", lecon:1, coll:"rectangle", v:true,
    mots:{ fr:{m:"rééquilibrer"}, en:{m:"to rebalance", p:"ri-ba-leunss"},
           es:{m:"reequilibrar"}, it:{m:"riequilibrare"},
           de:{m:"neu ausbalancieren", p:"aouss-ba-lann-sii-reune"}, ja:{m:"立て直す", p:"tatenaosu"} },
    def:{ fr:"⚠️ LE VERBE LE PLUS EMPLOYÉ AU BORD D'UN RECTANGLE. Rééquilibrer, ce n'est pas ralentir : c'est reporter le poids vers l'arrière-main sans perdre l'activité. Une demi-parade, un coin, une reprise de contact — trois façons de faire la même chose. 🟥 On rééquilibre AVANT le mouvement, jamais pendant.",
          en:"The most-used verb at the edge of an arena. Rebalancing isn't slowing down: it's shifting weight back without losing activity. A half-halt, a corner, a renewed contact — three ways of doing the same thing. You rebalance BEFORE the movement, never during.",
          es:"El verbo más usado al borde de un rectángulo. Reequilibrar no es frenar: es llevar el peso atrás sin perder actividad. Se reequilibra antes del movimiento.",
          it:"Il verbo più usato a bordo campo. Riequilibrare non è rallentare: è riportare il peso indietro senza perdere attività.",
          de:"Das meistgebrauchte Verb am Viereckrand. Neu ausbalancieren heißt nicht langsamer werden, sondern Gewicht zurückverlagern, ohne Aktivität zu verlieren.",
          ja:"馬場の脇で最もよく使われる動詞。立て直すとは減速することではなく、活動を失わずに重心を後ろへ移すことです。ハーフホルト、隅角、コンタクトの取り直し — 同じことをする三つの方法。運動の「前」に行い、途中では行いません。" } },

  { ref:"tomber-epaules", lecon:1, coll:"rectangle", v:true,
    mots:{ fr:{m:"tomber sur les épaules"}, en:{m:"to fall onto the forehand", p:"for-hannd"},
           es:{m:"caer sobre las espaldas"}, it:{m:"cadere sulle spalle"},
           de:{m:"auf die Vorhand fallen", p:"for-hannt"}, ja:{m:"前躯に落ちる", p:"zenku ni ochiru"} },
    def:{ fr:"🟥 LE DÉFAUT QUE TOUT LE MONDE VOIT SANS SAVOIR LE NOMMER. Le cheval reporte son poids devant, s'appuie sur la main, et son encolure descend au lieu de se soutenir. ⚠️ Ça arrive surtout dans les transitions descendantes et après les allongements — c'est-à-dire aux moments où le juge regarde le plus. La correction n'est pas de relever la tête mais de rééquilibrer avant.",
          en:"The fault everyone sees without knowing its name. The horse shifts weight forward, leans on the hand, and the neck drops instead of carrying itself. It happens mostly in downward transitions and after extensions — exactly when the judge is watching hardest.",
          es:"El defecto que todos ven sin saber nombrarlo. El caballo lleva el peso adelante, se apoya en la mano y el cuello baja en lugar de sostenerse.",
          it:"Il difetto che tutti vedono senza saperlo nominare. Il cavallo porta il peso avanti, si appoggia alla mano e il collo scende invece di sostenersi.",
          de:"Der Fehler, den jeder sieht, ohne ihn benennen zu können. Das Pferd verlagert Gewicht nach vorn, stützt sich auf die Hand, und der Hals fällt, statt sich zu tragen.",
          ja:"誰もが目にしながら、名前を知らない欠点。馬が重心を前に移し、手にもたれ、首が自ら支える代わりに落ちてしまうこと。減速の移行のあとや、伸長のあとに起きます。つまり審判が最も注視している瞬間です。" } },

  { ref:"garrot", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le garrot"}, en:{m:"the withers", p:"oui-zeurz"},
           es:{m:"la cruz"}, it:{m:"il garrese"},
           de:{m:"der Widerrist", p:"vi-deur-rist"}, ja:{m:"き甲", p:"kikō"} },
    def:{ fr:"⚠️ **WITHERS** EST TOUJOURS AU PLURIEL en anglais, jamais « a wither ». 🟥 Et c'est le point qu'on regarde pour savoir si un cheval se porte : dans une bonne transition, on doit SENTIR MONTER LE GARROT sous soi. S'il s'affaisse, le cheval tombe sur les épaules. ⚠️ Piège français : « garrot » désigne aussi le lien qui comprime une hémorragie — deux mots sans rapport, et l'anglais les sépare (*withers* / *tourniquet*).",
          en:"« Withers » is always plural, never « a wither ». It's the point you watch to know whether a horse is carrying himself: in a good transition you should FEEL THE WITHERS LIFT beneath you. If they drop, the horse falls onto the forehand.",
          es:"En inglés « withers » va siempre en plural. Es el punto que se mira para saber si un caballo se lleva: en una buena transición se siente subir la cruz.",
          it:"In inglese « withers » è sempre plurale. È il punto che si guarda per sapere se un cavallo si porta: in una buona transizione si sente salire il garrese.",
          de:"Englisch « withers » steht immer im Plural. Man achtet darauf, ob sich ein Pferd trägt: in einem guten Übergang spürt man den Widerrist steigen.",
          ja:"英語の withers は常に複数形です。馬が自ら体を支えているかを見る要所で、良い移行では、き甲が持ち上がるのを体で感じます。沈めば前躯に落ちます。フランス語の garrot は「止血帯」も意味しますが、英語では別語です。" } },

  { ref:"amplitude", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"l'amplitude"}, en:{m:"ground cover", p:"graound keu-veur", var:"length of stride"},
           es:{m:"la amplitud"}, it:{m:"l'ampiezza"},
           de:{m:"die Raumgriff", p:"raoum-grif"}, ja:{m:"歩幅の伸び", p:"hohaba no nobi"} },
    def:{ fr:"🟥 CE QU'ON CHERCHE DANS UN ALLONGEMENT, ET CE QUI SE CONFOND TOUJOURS AVEC LA VITESSE. Allonger, c'est couvrir plus de terrain à CHAQUE foulée — pas faire plus de foulées. Le rythme ne change pas. ⚠️ L'anglais **ground cover** dit exactement cela : « couvrir du terrain ». L'allemand *Raumgriff*, « la prise d'espace », est encore plus imagé.",
          en:"What you're after in an extension, and what everyone confuses with speed. Lengthening means covering more ground with EACH stride — not taking more strides. The rhythm doesn't change. « Ground cover » says exactly that.",
          es:"Lo que se busca en un alargamiento, y lo que siempre se confunde con la velocidad. Alargar es cubrir más terreno en cada tranco, no dar más trancos.",
          it:"Ciò che si cerca in un allungo, e ciò che si confonde sempre con la velocità. Allungare è coprire più terreno a ogni falcata, non fare più falcate.",
          de:"Was man in einer Verstärkung sucht, und was immer mit Tempo verwechselt wird. Verlängern heißt, mit JEDEM Tritt mehr Boden zu greifen — nicht mehr Tritte zu machen.",
          ja:"伸長で求めるもので、いつも「速さ」と混同されるもの。伸ばすとは、一歩ごとにより多くの地面を覆うことであり、歩数を増やすことではありません。リズムは変わりません。" } },

  { ref:"bande", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la lice"}, en:{m:"the boards", p:"bordz", var:"the arena fence"},
           es:{m:"la valla"}, it:{m:"la staccionata"},
           de:{m:"die Bande", p:"ban-de"}, ja:{m:"馬場柵", p:"babasaku"} }, // ??
    def:{ fr:"La bordure basse qui délimite le rectangle. Sortir un pied dehors, c'est l'élimination dans la plupart des règlements.",
          en:"The low border marking out the arena. A foot outside it means elimination under most rules.",
          es:"El borde bajo que delimita el rectángulo. Sacar un pie fuera es la eliminación en la mayoría de los reglamentos.",
          it:"Il bordo basso che delimita il rettangolo. Mettere un piede fuori è l'eliminazione nella maggior parte dei regolamenti.",
          de:"Die niedrige Umrandung des Vierecks. Ein Huf außerhalb bedeutet in den meisten Reglements das Ausscheiden.",
          ja:"馬場を区切る低い柵。蹄が一本でも外に出れば、ほとんどの規則で失権です。" } },

  { ref:"grand-cote", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le grand côté"}, en:{m:"the long side", p:"long saïd", var:"short side = le petit côté"},
           es:{m:"el lado largo"}, it:{m:"il lato lungo"},
           de:{m:"die lange Seite", p:"lan-gue zaï-te"}, ja:{m:"長蹄跡", p:"chōteiseki"} },
    def:{ fr:"Les 60 m entre deux coins. Le japonais est le plus logique des six : 長蹄跡, « la longue piste », et 短蹄跡 pour le petit côté.",
          en:"The 60 m between two corners. Japanese is the tidiest of the six: « long track » and « short track ».",
          es:"Los 60 m entre dos esquinas. El japonés es el más lógico de los seis: 長蹄跡, « la pista larga », y 短蹄跡 para el lado corto.",
          it:"I 60 m tra due angoli. Il giapponese è il più logico dei sei: 長蹄跡, « la pista lunga », e 短蹄跡 per il lato corto.",
          de:"Die 60 m zwischen zwei Ecken. Das Japanische ist das logischste der sechs: 長蹄跡, « der lange Hufschlag », und 短蹄跡 für die kurze Seite.",
          ja:"角から角までの60メートル。六言語でいちばん論理的なのは日本語です — 長蹄跡、そして短い側は短蹄跡。" } },

  { ref:"reprise-test", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la reprise"}, en:{m:"the test", p:"tèst", var:"dressage test"},
           es:{m:"la prueba", var:"el ejercicio"}, it:{m:"la ripresa"},
           de:{m:"die Aufgabe", p:"aouf-ga-be"}, ja:{m:"課目", p:"kamoku"} }, // ??
    def:{ fr:"⚠️ Le faux ami le plus retors du français : « la reprise » désigne à la fois le **groupe d'élèves** en manège et le **test** de dressage. L'anglais sépare proprement : *the ride* pour le groupe, *the test* pour l'épreuve. L'allemand aussi : Abteilung / Aufgabe.",
          en:"French « reprise » means both the group of pupils and the dressage test. English keeps them apart: the ride, the test.",
          es:"⚠️ El falso amigo más retorcido del francés: « la reprise » designa a la vez al **grupo de alumnos** en pista y al **test** de doma. El inglés separa limpiamente: *the ride* para el grupo, *the test* para la prueba. El alemán también: Abteilung / Aufgabe.",
          it:"⚠️ Il falso amico più contorto del francese: « la reprise » indica sia il **gruppo di allievi** in maneggio sia il **test** di dressage. L'inglese separa nettamente: *the ride* per il gruppo, *the test* per la prova. Il tedesco pure: Abteilung / Aufgabe.",
          de:"⚠️ Der verzwickteste falsche Freund des Französischen: « la reprise » meint die **Abteilung** in der Halle UND die Dressur-**Aufgabe**. Englisch trennt sauber: *the ride* / *the test*. Deutsch ebenso: Abteilung / Aufgabe.",
          ja:"⚠️ フランス語で最も厄介な多義語。« la reprise » は馬場の**生徒の一団**と、馬場馬術の**経路**の両方を指します。英語はきれいに分けます — *the ride* と *the test*。ドイツ語も同様に Abteilung と Aufgabe。" } },

  /* ============ LEÇON 2 · LES MOUVEMENTS ============ */

  { ref:"cession-jambe", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la cession à la jambe"}, en:{m:"leg-yield", p:"lègue-yild"},
           es:{m:"la cesión a la pierna"}, it:{m:"la cessione alla gamba"},
           de:{m:"das Schenkelweichen", p:"chèn-keul-vaï-cheune"}, ja:{m:"脚に譲る", p:"ashi ni yuzuru", var:"レッグ・イールド"} }, /* precise (rapport 07/08) */
    def:{ fr:"Le cheval se déplace de côté sans incurvation, presque droit. Le premier mouvement latéral appris, et celui qu'on confond le plus souvent avec l'appuyer.",
          en:"The horse moves sideways with no bend, almost straight. The first lateral work learned, and the one most often confused with half-pass.",
          es:"El caballo se desplaza de lado sin incurvación, casi recto. El primer movimiento lateral que se aprende, y el que más se confunde con el appuyer.",
          it:"Il cavallo si sposta di lato senza incurvazione, quasi dritto. Il primo movimento laterale imparato, e quello che più si confonde con l'appoggiata.",
          de:"Das Pferd weicht seitwärts ohne Biegung, fast gerade. Die erste erlernte Seitwärtsbewegung — und die am häufigsten mit der Traversale verwechselte.",
          ja:"馬が屈曲せず、ほぼまっすぐなまま横へ動く運動。最初に習う横運動であり、ハーフパスと最も混同されやすいものです。" } },

  { ref:"epaule-dedans", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'épaule en dedans"}, en:{m:"shoulder-in", p:"chol-deur-inn"},
           es:{m:"la espalda adentro"}, it:{m:"la spalla in dentro"},
           de:{m:"das Schulterherein", p:"choul-teur-hè-raïn"}, ja:{m:"ショルダーイン", p:"shorudā in"} }, /* valide (rapport 07/08) */
    def:{ fr:"Les épaules rentrées vers l'intérieur, les hanches sur la piste, le cheval incurvé autour de la jambe intérieure. Les cinq langues latines et germaniques disent toutes littéralement « épaule dedans » — un cas rare d'accord total.",
          en:"Shoulders brought in, hips on the track, the horse bent round the inside leg. All five European languages say literally « shoulder in ».",
          es:"Las espaldas hacia el interior, las caderas en la pista, el caballo incurvado alrededor de la pierna interior. Las cinco lenguas latinas y germánicas dicen todas literalmente « espalda adentro » — un raro caso de acuerdo total.",
          it:"Le spalle verso l'interno, le anche sulla pista, il cavallo incurvato attorno alla gamba interna. Le cinque lingue latine e germaniche dicono tutte alla lettera « spalla in dentro » — un raro caso di accordo totale.",
          de:"Die Schultern hereingeholt, die Hüften auf dem Hufschlag, das Pferd um das innere Bein gebogen. Alle fünf romanischen und germanischen Sprachen sagen wörtlich « Schulter herein » — ein seltener Fall völliger Einigkeit.",
          ja:"肩を内側へ、腰は蹄跡の上に、馬は内方脚のまわりに屈曲。ラテン系・ゲルマン系の五言語はすべて文字どおり「肩を内へ」— 珍しい満場一致です。" } },

  { ref:"appuyer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'appuyer"}, en:{m:"half-pass", p:"haf-pass"},
           es:{m:"la apoyada"}, it:{m:"l'appoggiata"},
           de:{m:"die Traversale", p:"tra-vèr-za-le"}, ja:{m:"ハーフパス", p:"hāfu pasu"} },
    def:{ fr:"Déplacement latéral avec incurvation dans le sens de la marche. ⚠️ Aucun accord entre les langues : l'anglais dit « demi-passage », l'allemand emploie un mot d'origine française que le français n'utilise pas, et le japonais l'anglais.",
          en:"Sideways with the bend in the direction of travel. No two languages agree here: English says half-pass, German uses a French-looking word the French never use.",
          es:"Desplazamiento lateral con incurvación en el sentido de la marcha. ⚠️ Ningún acuerdo entre lenguas: el inglés dice « half-pass », el alemán usa una palabra de origen francés que el francés no usa, y el japonés el inglés.",
          it:"Spostamento laterale con incurvazione nel senso del movimento. ⚠️ Nessun accordo tra le lingue: l'inglese dice « half-pass », il tedesco usa una parola d'origine francese che il francese non usa, e il giapponese l'inglese.",
          de:"Seitwärtsbewegung mit Biegung in Bewegungsrichtung. ⚠️ Keinerlei Einigkeit: Englisch sagt « half-pass », Deutsch nutzt ein französischstämmiges Wort, das das Französische nicht kennt (Traversale), Japanisch das Englische.",
          ja:"進行方向へ屈曲したまま横へ進む運動。⚠️ 言語間の一致は皆無です。英語は « half-pass »、ドイツ語はフランス語由来なのにフランス語では使われない言葉、日本語は英語からの借用。" } },

  { ref:"changement-pied", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le changement de pied"}, en:{m:"the flying change", p:"flaï-ing tchèndj"},
           es:{m:"el cambio de pie"}, it:{m:"il cambio di piede"},
           de:{m:"der Galoppwechsel", p:"ga-lopp-vèk-seul"}, ja:{m:"踏歩変換", p:"tōhohenkan"} }, // ??
    def:{ fr:"Changer de pied de galop en l'air, sans repasser au trot. ⚠️ L'anglais insiste sur le fait que c'est en suspension : **flying** change. On les compte : au temps, au deux temps, au trois temps.",
          en:"Changing the leading leg in the air, without trotting. English stresses the suspension: a flying change.",
          es:"Cambiar de pie de galope en el aire, sin pasar por el trote. ⚠️ El inglés insiste en que ocurre en suspensión: **flying** change. Se cuentan: al tiempo, a dos tiempos, a tres tiempos.",
          it:"Cambiare piede di galoppo in aria, senza ripassare al trotto. ⚠️ L'inglese insiste sul fatto che avviene in sospensione: **flying** change. Si contano: al tempo, a due tempi, a tre tempi.",
          de:"Der Galoppwechsel in der Luft, ohne Trab dazwischen. ⚠️ Das Englische betont die Schwebephase: **flying** change. Man zählt sie: von Sprung zu Sprung, alle zwei, alle drei Sprünge.",
          ja:"速歩を挟まず、空中で駈歩の手前を替えること。⚠️ 英語は宙に浮いている瞬間を強調します — **flying** change。数え方もあります：一歩ごと、二歩ごと、三歩ごと。" } },

  { ref:"pirouette", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la pirouette"}, en:{m:"the pirouette", p:"pi-rou-ètt"},
           es:{m:"la pirueta"}, it:{m:"la piroetta"},
           de:{m:"die Pirouette", p:"pi-rou-è-te"}, ja:{m:"ピルーエット", p:"pirūetto"} },
    def:{ fr:"Un tour complet au galop autour d'un postérieur qui reste en place. Le mot français a été adopté partout, danse comprise.",
          en:"A full turn in canter round a hind leg that stays in place. The French word was adopted everywhere, dance included.",
          es:"Una vuelta completa al galope alrededor de un posterior que queda en su sitio. La palabra francesa fue adoptada en todas partes, danza incluida.",
          it:"Un giro completo al galoppo attorno a un posteriore che resta al suo posto. La parola francese è stata adottata ovunque, danza compresa.",
          de:"Eine ganze Drehung im Galopp um ein an Ort bleibendes Hinterbein. Das französische Wort wurde überall übernommen — auch im Tanz.",
          ja:"片方の後肢を軸に、駈歩のままその場で一回転する運動。このフランス語は世界じゅうで採用されました — バレエの世界でも。" } },

  { ref:"piaffer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le piaffer"}, en:{m:"piaffe", p:"pi-af"},
           es:{m:"el piaffe"}, it:{m:"il piaffe"},
           de:{m:"die Piaffe", p:"pi-a-fe"}, ja:{m:"ピアッフェ", p:"piaffe"} },
    def:{ fr:"Un trot sur place, cadencé et rassemblé. Curiosité : le mot est français, mais c'est la forme allemande *die Piaffe* qui a été reprise par l'anglais, l'espagnol et l'italien.",
          en:"A cadenced, collected trot on the spot. The word is French, but it is the German form that English, Spanish and Italian borrowed.",
          es:"Un trote en el sitio, cadenciado y reunido. Curiosidad: la palabra es francesa, pero fue la forma alemana *die Piaffe* la que tomaron el inglés, el español y el italiano.",
          it:"Un trotto sul posto, cadenzato e riunito. Curiosità: la parola è francese, ma è la forma tedesca *die Piaffe* che è stata ripresa da inglese, spagnolo e italiano.",
          de:"Ein kadenzierter, versammelter Trab auf der Stelle. Kurios: Das Wort ist französisch, aber Englisch, Spanisch und Italienisch übernahmen die deutsche Form *die Piaffe*.",
          ja:"その場で行う、拍子の整った収縮した速歩。面白いことに、言葉はフランス語なのに、英・西・伊が借りたのはドイツ語形の *die Piaffe* でした。" } },

  { ref:"passage", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le passage"}, en:{m:"passage", p:"pa-sadj"},
           es:{m:"el passage"}, it:{m:"il passage"},
           de:{m:"die Passage", p:"pa-sa-je"}, ja:{m:"パッサージュ", p:"passāju"} },
    def:{ fr:"Un trot très rassemblé, avec un long temps de suspension. ⚠️ Se prononce à la française même en anglais : dire « pa-sidj » à l'anglaise ne sera pas compris.",
          en:"A very collected trot with a long moment of suspension. Pronounced the French way even in English.",
          es:"Un trote muy reunido, con un largo tiempo de suspensión. ⚠️ Se pronuncia a la francesa incluso en inglés: decir « pa-sidj » a la inglesa no será entendido.",
          it:"Un trotto molto riunito, con un lungo tempo di sospensione. ⚠️ Si pronuncia alla francese anche in inglese: dire « pa-sidj » all'inglese non sarà capito.",
          de:"Ein stark versammelter Trab mit langer Schwebephase. ⚠️ Wird auch im Englischen französisch ausgesprochen — « pa-sidj » versteht niemand.",
          ja:"高く長い滞空を伴う、深く収縮した速歩。⚠️ 英語でもフランス語ふうに発音します。英語読みで「パシッジ」と言っても通じません。" } },

  { ref:"reculer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le reculer"}, en:{m:"the rein-back", p:"rèn-bak"},
           es:{m:"el paso atrás"}, it:{m:"l'indietreggiare"},
           de:{m:"das Rückwärtsrichten", p:"ruk-vèrts-rirh-teune"}, ja:{m:"後退", p:"kōtai"} },
    def:{ fr:"Reculer droit, par bipèdes diagonaux, le nombre de pas exact demandé par la reprise. ⚠️ L'anglais le nomme par la rêne, **rein-back**, alors que le mouvement vient d'abord du dos et des jambes.",
          en:"Straight back in diagonal pairs, the exact number of steps the test asks for. English names it after the rein.",
          es:"Recular derecho, por bípedos diagonales, el número exacto de pasos que pide la reprise. ⚠️ El inglés lo nombra por la rienda, **rein-back**, cuando el movimiento nace del dorso y las piernas.",
          it:"Indietreggiare dritto, per bipedi diagonali, il numero esatto di passi chiesto dalla ripresa. ⚠️ L'inglese lo chiama con la redine, **rein-back**, mentre il movimento nasce prima da schiena e gambe.",
          de:"Gerade rückwärtsrichten, auf diagonalen Beinpaaren, exakt die verlangte Trittzahl. ⚠️ Das Englische benennt es nach dem Zügel — **rein-back** —, obwohl die Bewegung aus Rücken und Schenkeln kommt.",
          ja:"対角の肢を対にして、要求された歩数だけまっすぐ後退すること。⚠️ 英語は手綱の名で **rein-back** と呼びますが、この運動はまず背中と脚から生まれるものです。" } },

  { ref:"contre-galop", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le contre-galop"}, en:{m:"counter-canter", p:"kaoune-teur kann-teur"},
           es:{m:"el galope a la contra"}, it:{m:"il galoppo rovesciato"}, // ??
           de:{m:"der Konter-Galopp", p:"kon-teur-ga-lopp", var:"Außengalopp"}, ja:{m:"反対駈歩", p:"hantai kakeho"} }, // ??
    def:{ fr:"Galoper à droite sur la main gauche, volontairement et en équilibre. C'est un test de rectitude et d'obéissance, pas une faute.",
          en:"Cantering right while going left, on purpose and in balance. A test of straightness and obedience, not a mistake.",
          es:"Galopar a la derecha en la mano izquierda, voluntariamente y en equilibrio. Es una prueba de rectitud y obediencia, no una falta.",
          it:"Galoppare a destra sulla mano sinistra, volontariamente e in equilibrio. È una prova di rettitudine e obbedienza, non un errore.",
          de:"Auf der linken Hand bewusst im Rechtsgalopp gehen, in Balance. Ein Test für Geraderichtung und Gehorsam — kein Fehler.",
          ja:"左手前の回りで、あえて右手前の駈歩を、バランスを保って続けること。真直性と従順さの試験であって、誤りではありません。" } },

  { ref:"trot-allonge", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le trot allongé"}, en:{m:"extended trot", p:"èks-tèn-dèd trot"},
           es:{m:"el trote largo"}, it:{m:"il trotto allungato"},
           de:{m:"der starke Trab", p:"chtar-ke trab"}, ja:{m:"伸長速歩", p:"shinchō hayaashi"} }, // ??
    def:{ fr:"L'amplitude maximale, sans précipiter. ⚠️ L'allemand ne dit pas « allongé » mais **starker Trab**, le trot *fort* — et l'échelle allemande complète va de Arbeitstrab (travail) à Mitteltrab (moyen) puis starker Trab.",
          en:"Maximum reach without hurrying. German does not say extended but starker Trab, the strong trot.",
          es:"La amplitud máxima, sin precipitar. ⚠️ El alemán no dice « alargado » sino **starker Trab**, el trote *fuerte* — y la escala alemana completa va de Arbeitstrab (trabajo) a Mitteltrab (medio) y starker Trab.",
          it:"L'ampiezza massima, senza precipitare. ⚠️ Il tedesco non dice « allungato » ma **starker Trab**, il trotto *forte* — e la scala tedesca completa va da Arbeitstrab (di lavoro) a Mitteltrab (medio) a starker Trab.",
          de:"Der größte Rahmen, ohne zu eilen. ⚠️ Das Deutsche sagt nicht « verlängert », sondern **starker Trab** — und die Reihe geht von Arbeitstrab über Mitteltrab zum starken Trab.",
          ja:"急がずに、最大限の伸びを見せる速歩。⚠️ ドイツ語は「伸ばした」ではなく **starker Trab**（強い速歩）と言い、段階も Arbeitstrab（常用）→ Mitteltrab（中間）→ starker Trab と揃っています。" } },

  /* ============ LEÇON 3 · LES QUALITÉS ============ */

  { ref:"cadence", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le rythme"}, en:{m:"the rhythm", p:"ri-zeum"},
           es:{m:"el ritmo"}, it:{m:"il ritmo"},
           de:{m:"der Takt", p:"takt"}, ja:{m:"リズム", p:"rizumu"} },
    def:{ fr:"Le premier barreau de l'échelle de progression allemande, la référence mondiale du dressage : **Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung**. Six mots allemands que les autres langues ne traduisent qu'approximativement — et que les juges anglophones citent parfois tels quels.",
          en:"The first rung of the German training scale, the world reference: Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung — six words the other languages only approximate.",
          es:"El primer peldaño de la escala de progresión alemana, la referencia mundial de la doma: **Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung**. Seis palabras alemanas que las demás lenguas solo traducen aproximadamente — y que los jueces anglófonos citan a veces tal cual.",
          it:"Il primo gradino della scala di progressione tedesca, il riferimento mondiale del dressage: **Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung**. Sei parole tedesche che le altre lingue traducono solo approssimativamente — e che i giudici anglofoni citano a volte tali e quali.",
          de:"Die erste Stufe der Ausbildungsskala, weltweit die Referenz: **Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung**. Sechs deutsche Wörter, die andere Sprachen nur ungefähr übersetzen — englischsprachige Richter zitieren sie oft im Original.",
          ja:"ドイツのトレーニングスケールの第一段。世界じゅうの馬場馬術の基準です — **Takt、Losgelassenheit、Anlehnung、Schwung、Geraderichtung、Versammlung**。他の言語では近似訳しかできない六つのドイツ語で、英語圏の審判もそのまま口にすることがあります。" } },

  { ref:"decontraction", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la décontraction"}, en:{m:"suppleness", p:"seu-peul-neuss", var:"looseness"},
           es:{m:"la relajación"}, it:{m:"la decontrazione"},
           de:{m:"die Losgelassenheit", p:"lôss-gue-la-seune-haïte"}, ja:{m:"リラックス", p:"rirakkusu"} }, // ??
    def:{ fr:"Deuxième barreau de l'échelle. Le mot allemand dit exactement ce dont il s'agit : « l'état d'être lâché ». Aucune langue n'a trouvé mieux, et l'anglais hésite encore entre suppleness et looseness.",
          en:"The second rung. The German word says exactly what it is — « the state of being let go » — and English still hesitates between suppleness and looseness.",
          es:"Segundo peldaño de la escala. La palabra alemana dice exactamente de qué se trata: « el estado de estar soltado ». Ninguna lengua encontró nada mejor, y el inglés aún duda entre suppleness y looseness.",
          it:"Secondo gradino della scala. La parola tedesca dice esattamente di cosa si tratta: « lo stato dell'essere sciolto ». Nessuna lingua ha trovato di meglio, e l'inglese esita ancora tra suppleness e looseness.",
          de:"Die zweite Stufe der Skala. Das deutsche Wort sagt genau, worum es geht: den Zustand des Losgelassenseins. Keine Sprache fand Besseres — das Englische schwankt bis heute zwischen suppleness und looseness.",
          ja:"スケールの第二段。ドイツ語はその中身を正確に言い当てています —「解き放たれた状態」。これ以上の言葉をどの言語も見つけられず、英語は今も suppleness と looseness のあいだで揺れています。" } },

  { ref:"contact", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le contact"}, en:{m:"the contact", p:"kon-takt"},
           es:{m:"el contacto"}, it:{m:"il contatto"},
           de:{m:"die Anlehnung", p:"an-lé-noung"}, ja:{m:"ハミ受け", p:"hami-uke"} },
    def:{ fr:"Troisième barreau. Le japonais est très parlant : ハミ受け, « l'acceptation du mors ». L'allemand aussi : Anlehnung, l'action de s'appuyer contre — jamais une traction du cavalier.",
          en:"The third rung. Japanese says « acceptance of the bit », German says « leaning against » — never a pull from the rider.",
          es:"Tercer peldaño. El japonés es muy elocuente: ハミ受け, « la aceptación del bocado ». El alemán también: Anlehnung, la acción de apoyarse contra — jamás una tracción del jinete.",
          it:"Terzo gradino. Il giapponese è molto parlante: ハミ受け, « l'accettazione del morso ». Il tedesco pure: Anlehnung, l'azione di appoggiarsi contro — mai una trazione del cavaliere.",
          de:"Die dritte Stufe. Das Japanische ist sehr sprechend: ハミ受け, « das Annehmen des Gebisses ». Das Deutsche auch: Anlehnung — ein Sich-Anlehnen, nie ein Ziehen des Reiters.",
          ja:"第三段。日本語がとても雄弁です — ハミ受け、ハミを受け入れること。ドイツ語も同じ発想で Anlehnung、寄りかかる動き。騎手が引っ張ることでは決してありません。" } },

  { ref:"impulsion", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'impulsion"}, en:{m:"impulsion", p:"im-peul-cheune"},
           es:{m:"la impulsión"}, it:{m:"l'impulso"},
           de:{m:"der Schwung", p:"chvoung"}, ja:{m:"推進", p:"suishin"} }, // ??
    def:{ fr:"Quatrième barreau : l'énergie qui vient de derrière et traverse le dos. ⚠️ Ce n'est pas la vitesse. Le mot allemand Schwung, « l'élan », est plus juste que le mot français.",
          en:"The fourth rung: energy from behind, travelling through the back. It is not speed. German's Schwung, « swing », is closer than the French word.",
          es:"Cuarto peldaño: la energía que viene de atrás y atraviesa el dorso. ⚠️ No es la velocidad. La palabra alemana Schwung, « el impulso elástico », es más justa que la francesa.",
          it:"Quarto gradino: l'energia che viene da dietro e attraversa la schiena. ⚠️ Non è la velocità. La parola tedesca Schwung, « lo slancio », è più giusta di quella francese.",
          de:"Die vierte Stufe: die Energie, die von hinten kommt und durch den Rücken schwingt. ⚠️ Sie ist keine Geschwindigkeit. Schwung trifft es besser als das französische Wort.",
          ja:"第四段。後躯から生まれ、背中を通り抜けるエネルギー。⚠️ 速さのことではありません。ドイツ語の Schwung（弾み）のほうが、フランス語より正確です。" } },

  { ref:"rectitude", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la rectitude"}, en:{m:"straightness", p:"stréïte-neuss"},
           es:{m:"la rectitud"}, it:{m:"la rettitudine"},
           de:{m:"die Geraderichtung", p:"gue-ra-de-rirh-toung"}, ja:{m:"直進性", p:"chokushinsei"} }, // ??
    def:{ fr:"Cinquième barreau. Tout cheval est naturellement de travers : le rendre droit est un travail de plusieurs années, pas une correction ponctuelle.",
          en:"The fifth rung. Every horse is naturally crooked; making one straight is years of work, not a quick correction.",
          es:"Quinto peldaño. Todo caballo es naturalmente torcido: enderezarlo es un trabajo de años, no una corrección puntual.",
          it:"Quinto gradino. Ogni cavallo è naturalmente storto: raddrizzarlo è un lavoro di anni, non una correzione puntuale.",
          de:"Die fünfte Stufe. Jedes Pferd ist von Natur aus schief: Es geradezurichten ist die Arbeit von Jahren, keine punktuelle Korrektur.",
          ja:"第五段。馬は生まれつき体が曲がっています。まっすぐにするのは数年がかりの仕事で、その場の修正ではありません。" } },

  { ref:"rassembler", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le rassembler"}, en:{m:"collection", p:"ko-lèk-cheune"},
           es:{m:"la reunión"}, it:{m:"la raccolta"},
           de:{m:"die Versammlung", p:"fèr-zam-loung"}, ja:{m:"収縮", p:"shūshuku"} }, // ??
    def:{ fr:"Sixième et dernier barreau : le cheval abaisse les hanches, raccourcit et s'allège de l'avant. Toutes les langues emploient l'image du rassemblement, sauf le japonais qui dit « contraction ».",
          en:"The sixth and last rung: the horse lowers its hindquarters, shortens and lightens in front.",
          es:"Sexto y último peldaño: el caballo baja las caderas, se acorta y se aligera del tercio anterior. Todas las lenguas usan la imagen de la reunión, salvo el japonés que dice « contracción ».",
          it:"Sesto e ultimo gradino: il cavallo abbassa le anche, si accorcia e si alleggerisce dell'anteriore. Tutte le lingue usano l'immagine della riunione, salvo il giapponese che dice « contrazione ».",
          de:"Die sechste und letzte Stufe: Das Pferd senkt die Hanken, verkürzt sich und wird vorne leicht. Alle Sprachen nutzen das Bild des Sammelns — außer dem Japanischen, das « Kontraktion » sagt.",
          ja:"第六の、最後の段。馬は腰を沈め、体を縮め、前躯が軽くなります。どの言語も「集める」というイメージを使いますが、日本語だけは「収縮」と言います。" } },

  { ref:"incurvation", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'incurvation"}, en:{m:"the bend", p:"bènde"},
           es:{m:"la incurvación"}, it:{m:"l'incurvamento"},
           de:{m:"die Biegung", p:"bi-goung"}, ja:{m:"屈曲", p:"kukkyoku"} }, // ??
    def:{ fr:"La courbure du corps du bout du nez à la queue, de l'encolure au bassin. Un cheval « incurvé de l'encolure seulement » est un défaut, pas une incurvation.",
          en:"The curve of the whole body, nose to tail. A horse bent only in the neck is a fault, not a bend.",
          es:"La curvatura del cuerpo de la punta de la nariz a la cola, del cuello a la pelvis. Un caballo « incurvado solo del cuello » es un defecto, no una incurvación.",
          it:"La curvatura del corpo dalla punta del naso alla coda, dall'incollatura al bacino. Un cavallo « incurvato solo dell'incollatura » è un difetto, non un'incurvazione.",
          de:"Die Biegung des Körpers von der Nasenspitze bis zum Schweif, vom Hals bis zum Becken. Ein « nur im Hals gebogenes » Pferd ist ein Fehler, keine Biegung.",
          ja:"鼻先から尾まで、首から骨盤まで通る体の湾曲。「首だけ曲がった」馬は欠点であって、屈曲ではありません。" } },

  { ref:"legerete", lecon:3, coll:"qualites",
    /* 🟥 18/08 : `self-carriage` FUSIONNÉ ICI, sur décision de Blandine.
       Claude proposait deux entrées distinctes — le cheval qui se porte
       d'un côté, le cavalier qui demande peu de l'autre. Elle a corrigé,
       et elle a raison : *« quand on aborde l'équitation légère, c'est
       également avoir une équitation qui amène son cheval à se tenir
       par lui-même, à se porter par lui-même »*. Ce ne sont pas deux
       notions voisines, c'est la même vue des deux côtés — et c'est
       toute la doctrine de l'école française, de Baucher à L'Hotte.
       ⚠️ NE PAS les redédoubler. */
    mots:{ fr:{m:"la légèreté"}, en:{m:"lightness", p:"laïte-neuss", var:"self-carriage"},
           es:{m:"la ligereza"}, it:{m:"la leggerezza"},
           de:{m:"die Leichtigkeit", p:"laïrh-tirh-kaïte", var:"die Selbsthaltung"},
           ja:{m:"軽さ", p:"karusa", var:"自己保持"} }, // ??
    def:{ fr:"L'idéal de l'école française : obtenir sans peser. Le mot revient dans toutes les langues, mais c'est en français qu'il est devenu une doctrine, celle de Baucher et de l'École de Versailles. 🟥 ET C'EST LA MÊME CHOSE VUE DES DEUX CÔTÉS : le cavalier allège ses aides, le cheval apprend à se porter seul — l'anglais dit **self-carriage**, « se porter soi-même », en un mot que le français n'a pas. On ne rend pas un cheval léger en tirant moins ; on l'amène à se porter, et la légèreté en découle. ⚠️ Le signe : on peut alléger ses aides sans que le cheval perde son équilibre, son rythme ou son attitude.",
          en:"The French school's ideal: achieving without weight. Every language has the word, but only French made it a doctrine.",
          es:"El ideal de la escuela francesa: obtener sin pesar. La palabra vuelve en todas las lenguas, pero es en francés donde se volvió una doctrina, la de Baucher y la Escuela de Versalles.",
          it:"L'ideale della scuola francese: ottenere senza pesare. La parola torna in tutte le lingue, ma è in francese che è diventata una dottrina, quella di Baucher e della Scuola di Versailles.",
          de:"Das Ideal der französischen Schule: erreichen, ohne zu lasten. Das Wort gibt es überall — aber nur im Französischen wurde es zur Doktrin, der von Baucher und der Schule von Versailles.",
          ja:"フランス派の理想 — 重さをかけずに得ること。この言葉はどの言語にもありますが、教義にまで高められたのはフランス語においてです。ボーシェとヴェルサイユ学派の教義に。" } },

  /* ================================================================
     TROIS ENTRÉES AJOUTÉES le 18/08/2026 pour VERSAILLES, d'après le
     lexique fourni par Blandine. Ses phrases 18, 19, 20 les employaient
     sans qu'elles existent.
     ⚠️ `equilibre` est chez WARENDORF et `aides` chez JEREZ : ils
     s'emploient en `motsAilleurs`, pas de duplication.
     🟥 ET `self-carriage` A ÉTÉ FUSIONNÉ DANS `legerete` — voir sa def.
     ================================================================ */

  { ref:"flexion", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la flexion"}, en:{m:"flexion", p:"flèk-cheune"},
           es:{m:"la flexión"}, it:{m:"la flessione"},
           de:{m:"die Biegung", p:"bii-goung", var:"die Stellung"},
           ja:{m:"屈曲", p:"kukkyoku"} },
    def:{ fr:"🟥 À NE PAS CONFONDRE AVEC L'INCURVATION : la flexion concerne la tête et l'encolure, l'incurvation concerne tout le corps. Un cheval peut être fléchi sans être incurvé — et c'est même le défaut le plus fréquent : on tourne la tête et le corps reste droit. ⚠️ L'allemand a deux mots distincts là où le français en a un : **Stellung** pour la flexion de la nuque, **Biegung** pour l'incurvation du corps. Le français dit « pli » pour les deux, ce qui entretient la confusion.",
          en:"Not to be confused with bend: flexion is head and neck, bend is the whole body. A horse can be flexed without being bent — the commonest fault of all. German has two words where French has one: Stellung for flexion, Biegung for bend.",
          es:"No confundir con la incurvación: la flexión afecta a la cabeza y el cuello, la incurvación a todo el cuerpo. Un caballo puede estar flexionado sin estar incurvado.",
          it:"Da non confondere con l'incurvamento: la flessione riguarda testa e collo, l'incurvamento tutto il corpo.",
          de:"Nicht mit der Biegung verwechseln: die Stellung betrifft Kopf und Hals, die Biegung den ganzen Körper. Ein Pferd kann gestellt sein, ohne gebogen zu sein.",
          ja:"「屈曲」と「湾曲」を混同しないこと。屈曲は頭と首、湾曲は体全体に関わります。頭だけ曲げて体はまっすぐ、という誤りが最も多いのです。ドイツ語には Stellung（屈曲）と Biegung（湾曲）の二語があります。" } },

  { ref:"arriere-main", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'arrière-main"}, en:{m:"the hindquarters", p:"haïnd-kwor-teurz"},
           es:{m:"el tercio posterior"}, it:{m:"il posteriore"},
           de:{m:"die Hinterhand", p:"hinn-teur-hannt"}, ja:{m:"後躯", p:"kōku"} },
    def:{ fr:"🟥 C'EST LE MOTEUR. Tout le dressage consiste à déplacer le poids vers l'arrière pour libérer l'avant. ⚠️ NE PAS confondre avec `engagement`, qui décrit ce que l'arrière-main FAIT : l'arrière-main est la partie du corps, l'engagement est son action. ⚠️ L'anglais **hindquarters** est toujours au pluriel, jamais « hindquarter ».",
          en:"This is the engine. All dressage consists of shifting weight backwards to free the front. Don't confuse it with engagement, which describes what the hindquarters DO: the hindquarters are the body part, engagement is its action. Always plural.",
          es:"Es el motor. Toda la doma consiste en desplazar el peso hacia atrás para liberar el delantero. No confundir con el enganche, que describe lo que hace.",
          it:"È il motore. Tutto il dressage consiste nello spostare il peso all'indietro per liberare l'avantreno.",
          de:"Sie ist der Motor. Die ganze Dressur besteht darin, Gewicht nach hinten zu verlagern, um die Vorhand frei zu machen.",
          ja:"ここが原動力です。馬場馬術のすべては、重心を後ろに移して前を軽くすることに尽きます。「後躯」は体の部位、「踏み込み」はその働き。混同しないこと。英語の hindquarters は常に複数形です。" } },

  { ref:"avant-main", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'avant-main"}, en:{m:"the forehand", p:"for-hannd"},
           es:{m:"el tercio anterior"}, it:{m:"l'anteriore"},
           de:{m:"die Vorhand", p:"for-hannt"}, ja:{m:"前躯", p:"zenku"} },
    def:{ fr:"⚠️ UN CHEVAL NAÎT SUR LES ÉPAULES : au repos, l'avant-main porte environ soixante pour cent du poids, et le cavalier ajoute le sien par-dessus. 🟥 Tout le travail consiste à alléger cette avant-main — non pas en levant l'encolure, mais en abaissant les hanches. C'est pourquoi le rassembler se juge derrière, pas devant.",
          en:"A horse is born on the forehand: at rest it carries about sixty per cent of the weight, and the rider adds his own on top. All the work consists of lightening the forehand — not by raising the neck, but by lowering the hindquarters. That's why collection is judged behind, not in front.",
          es:"Un caballo nace sobre las espaldas: en reposo el tercio anterior lleva un sesenta por ciento del peso. Todo el trabajo consiste en aligerarlo bajando las ancas.",
          it:"Un cavallo nasce sulle spalle: a riposo l'anteriore porta circa il sessanta per cento del peso. Tutto il lavoro consiste nell'alleggerirlo abbassando le anche.",
          de:"Ein Pferd wird auf der Vorhand geboren: in Ruhe trägt sie etwa sechzig Prozent des Gewichts. Die ganze Arbeit besteht darin, sie zu erleichtern, indem man die Hinterhand senkt.",
          ja:"馬は前躯に体重を乗せて生まれます。静止時、前躯は体重の約六割を支え、そこに騎手の重さが加わります。すべての調教は、この前躯を軽くすることにあります。首を上げるのではなく、腰を下げることによって。だから収縮は前ではなく後ろで judged されるのです。" } },

  { ref:"soumission", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la soumission"}, en:{m:"submission", p:"seub-mi-cheune"},
           es:{m:"la sumisión"}, it:{m:"la sottomissione"},
           de:{m:"der Gehorsam", p:"gue-hor-zam"}, ja:{m:"従順", p:"jūjun"} },
    def:{ fr:"Une note à part sur le protocole. ⚠️ Le mot est trompeur dans toutes les langues : il ne désigne pas l'obéissance passive mais l'attention et la disponibilité — un cheval éteint est mal noté en soumission.",
          en:"A separate mark on the sheet, and a misleading word in every language: not passive obedience but attention and willingness.",
          es:"Una nota aparte en el protocolo. ⚠️ La palabra engaña en todas las lenguas: no designa la obediencia pasiva sino la atención y la disponibilidad — un caballo apagado puntúa mal en sumisión.",
          it:"Un voto a parte sul protocollo. ⚠️ La parola inganna in tutte le lingue: non indica l'obbedienza passiva ma l'attenzione e la disponibilità — un cavallo spento è mal votato in sottomissione.",
          de:"Eine eigene Note im Protokoll. ⚠️ Das Wort täuscht in jeder Sprache: Gemeint ist nicht passiver Gehorsam, sondern Aufmerksamkeit und Durchlässigkeit — ein erloschenes Pferd bekommt hier schlechte Noten.",
          ja:"採点表の独立した項目。⚠️ この言葉はどの言語でも誤解を招きます。受け身の服従ではなく、注意深さと応じる姿勢のこと — 覇気のない馬は、むしろこの項目で減点されます。" } },

  /* ================================================================
     LA TÊTE AU MUR — ajoutée le 16/08/2026, session 214, pour
     VERSAILLES (33e ville, qui reçoit la leçon 3). Blandine voulait des
     phrases sur les mouvements latéraux : cession, appuyer, épaule en
     dedans ET tête au mur. Les trois premiers existaient déjà en
     leçon 2 ; la tête au mur, NON — seule entrée manquante.
     🟥 LEÇON 2 ET NON 3, exprès : elle va avec l'épaule en dedans dont
     elle est le miroir, et elle reste donc chez WINDSOR. Versailles
     l'emploie dans son dialogue sans la posséder — choix B de Blandine,
     pour ne RIEN retirer à Windsor. Le voyage passe par Windsor AVANT
     Versailles : le mot arrive donc déjà croisé.
     ================================================================ */

  { ref:"tete-au-mur", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la tête au mur"}, en:{m:"travers", p:"tra-vèr", var:"head to the wall"},
           es:{m:"la grupa adentro"}, it:{m:"il travers"},
           de:{m:"das Traversale", p:"tra-vèr-za-le", var:"Kruppeherein"}, ja:{m:"トラバース", p:"torabāsu"} },
    def:{ fr:"L'inverse de l'épaule en dedans : ce sont les HANCHES qui rentrent, les épaules restant sur la piste. Le cheval regarde où il va, incurvé du côté du déplacement. ⚠️ L'anglais garde le mot FRANÇAIS, « travers » — comme pour « appuyer » qui devient « half-pass ». Le français dit aussi « croupe au mur », c'est le même mouvement.",
          en:"The opposite of shoulder-in: the HIPS come in, the shoulders stay on the track, and the horse looks where he's going. English keeps the French word, « travers ».",
          es:"Lo contrario de la espalda adentro: entra la GRUPA, las espaldas se quedan en la pista, y el caballo mira hacia donde va.",
          it:"Il contrario della spalla in dentro: entrano le ANCHE, le spalle restano in pista, e il cavallo guarda dove va.",
          de:"Das Gegenteil vom Schulterherein: die HANKEN kommen herein, die Schultern bleiben auf dem Hufschlag, und das Pferd schaut in die Bewegungsrichtung.",
          ja:"ショルダーインの逆。肩は蹄跡に残したまま、腰を内側に入れます。馬は進行方向を見ます。" } },

  /* ================================================================
     L'ENGAGEMENT DES POSTÉRIEURS — ajouté le 17/08/2026 sur demande de
     Blandine : « il faut rajouter la lettre au dressage et l'engagement
     des postérieurs à Versailles ».
     Sa phrase pour Badminton l'employait sans qu'il existe : « il faut
     davantage d'engagement des postérieurs dans cette reprise ».
     🟥 LEÇON 3, DONC VERSAILLES : c'est une notion d'art équestre, pas
     de concours. Badminton et Windsor l'emploieront en `motsAilleurs`.
     ⚠️ `la lettre` existait déjà (leçon 1, chez Windsor) avec les huit
     lettres et le moyen mnémotechnique britannique — rien à ajouter.
     ================================================================ */

  { ref:"engagement", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'engagement des postérieurs"}, en:{m:"engagement of the hindquarters", p:"inn-guédj-meunt", var:"hind leg engagement"},
           es:{m:"el enganche de los posteriores"}, it:{m:"l'impegno dei posteriori"},
           de:{m:"das Untertreten der Hinterhand", p:"oun-teur-tré-teune"}, ja:{m:"後肢の踏み込み", p:"kōshi no fumikomi"} },
    def:{ fr:"🟥 CE QUI REND TOUT LE RESTE POSSIBLE. Le postérieur se pose plus loin sous la masse, l'articulation se plie davantage, et le cheval se porte de derrière au lieu de se tirer de devant. Sans engagement, pas de rassembler, pas d'allègement, pas de légèreté — c'est la base de l'échelle. ⚠️ On le VOIT à la trace : le postérieur dépasse l'empreinte de l'antérieur. Et l'allemand le dit mieux que le français : *Untertreten*, « marcher sous soi ».",
          en:"What makes everything else possible. The hind leg lands further under the body, the joints flex more, and the horse carries himself from behind instead of pulling from in front. Without engagement there is no collection and no lightness. You can SEE it in the tracks: the hind foot passes the print of the front one. German says it best: Untertreten, « stepping under ».",
          es:"Lo que hace posible todo lo demás. El posterior se posa más adelante bajo la masa, la articulación se flexiona más, y el caballo se lleva desde atrás en lugar de tirar desde delante. Se VE en las huellas: el posterior pasa la pisada del anterior.",
          it:"Ciò che rende possibile tutto il resto. Il posteriore si appoggia più avanti sotto la massa, l'articolazione si flette di più, e il cavallo si porta da dietro invece di tirarsi da davanti. Si VEDE nelle tracce: il posteriore supera l'impronta dell'anteriore.",
          de:"Was alles andere erst möglich macht. Der Hinterfuß tritt weiter unter den Körper, die Gelenke beugen sich mehr, und das Pferd trägt sich von hinten statt sich vorn zu ziehen. Man SIEHT es an der Spur: der Hinterfuß tritt über den Abdruck des Vorderfußes.",
          ja:"ほかのすべてを可能にするもの。後肢が体の下により深く入り、関節がより曲がり、馬は前で引くのではなく後ろで自分を支えます。踏み跡を見ればわかります。後肢が前肢の跡を越えるのです。ドイツ語の Untertreten（体の下に踏み込む）が最もよく言い表しています。" } },

  { ref:"permeabilite", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la perméabilité aux aides"}, en:{m:"throughness", p:"srou-neuss", var:"Durchlässigkeit"},
           es:{m:"la permeabilidad"}, it:{m:"la permeabilità"},
           de:{m:"die Durchlässigkeit", p:"dourh-lè-sirh-kaïte"}, ja:{m:"透過性", p:"tōkasei"} }, // ??
    def:{ fr:"L'aide passe à travers le cheval sans être bloquée. ⚠️ Cas remarquable : l'anglais n'a jamais trouvé de traduction satisfaisante et les juges britanniques emploient souvent l'allemand **Durchlässigkeit** tel quel, dans une phrase anglaise.",
          en:"The aid passes through the horse without being blocked. English never found a good word, and British judges often just say Durchlässigkeit.",
          es:"La ayuda atraviesa al caballo sin bloquearse. ⚠️ Caso notable: el inglés nunca encontró traducción satisfactoria y los jueces británicos emplean a menudo el alemán **Durchlässigkeit** tal cual, dentro de una frase inglesa.",
          it:"L'aiuto attraversa il cavallo senza essere bloccato. ⚠️ Caso notevole: l'inglese non ha mai trovato una traduzione soddisfacente e i giudici britannici usano spesso il tedesco **Durchlässigkeit** tale e quale, in una frase inglese.",
          de:"Die Hilfe geht durch das Pferd hindurch, ohne blockiert zu werden. ⚠️ Bemerkenswert: Das Englische fand nie eine gute Übersetzung — britische Richter benutzen oft **Durchlässigkeit** im Original, mitten im englischen Satz.",
          ja:"扶助が馬の体の中を、堰き止められずに通り抜けること。⚠️ 注目すべきことに、英語はついに満足な訳語を見つけられず、イギリスの審判は英語の文の中にドイツ語の **Durchlässigkeit** をそのまま挟んで使います。" } },

  /* ============ LEÇON 4 · LA REPRISE ET LA NOTE ============ */

  { ref:"protocole", lecon:4, coll:"notation",
    mots:{ fr:{m:"le protocole"}, en:{m:"the test sheet", p:"tèst chite", var:"score sheet"},
           es:{m:"la hoja de puntuación"}, it:{m:"il foglio di giudizio"},
           de:{m:"das Protokoll", p:"pro-to-kol"}, ja:{m:"採点表", p:"saitenhyō"} }, // ??
    def:{ fr:"La feuille où chaque mouvement reçoit sa note et sa remarque. On la récupère après l'épreuve, et c'est le vrai cours particulier de la journée.",
          en:"The sheet where every movement gets its mark and comment. Collected afterwards, it is the real lesson of the day.",
          es:"La hoja donde cada movimiento recibe su nota y su comentario. Se recoge tras la prueba, y es la verdadera clase particular del día.",
          it:"Il foglio dove ogni movimento riceve il suo voto e la sua osservazione. Si ritira dopo la prova, ed è la vera lezione privata della giornata.",
          de:"Der Bogen, auf dem jede Lektion Note und Bemerkung erhält. Man holt ihn nach der Prüfung ab — die wahre Einzelstunde des Tages.",
          ja:"各運動に点と講評が書き込まれる用紙。競技のあとに受け取ります。その日いちばんの個人レッスンは、実はこの紙です。" } },

  { ref:"note", lecon:4, coll:"notation",
    mots:{ fr:{m:"la note"}, en:{m:"the mark", p:"mark", var:"score (US)"},
           es:{m:"la nota"}, it:{m:"il voto"},
           de:{m:"die Note", p:"nô-te"}, ja:{m:"点数", p:"tensū"} },
    def:{ fr:"De 0 à 10 par mouvement : 10 excellent, 6 satisfaisant, 0 mouvement non exécuté. ⚠️ L'anglais britannique dit **mark**, l'américain **score** — et « note » en anglais veut dire une remarque écrite, pas une note.",
          en:"0 to 10 per movement. British English says mark, American score — and « note » in English means a written comment, not a mark.",
          es:"De 0 a 10 por movimiento: 10 excelente, 6 satisfactorio, 0 movimiento no ejecutado. ⚠️ El inglés británico dice **mark**, el americano **score** — y « note » en inglés significa una nota escrita, no una calificación.",
          it:"Da 0 a 10 per movimento: 10 eccellente, 6 sufficiente, 0 movimento non eseguito. ⚠️ L'inglese britannico dice **mark**, l'americano **score** — e « note » in inglese significa un appunto scritto, non un voto.",
          de:"0 bis 10 pro Lektion: 10 ausgezeichnet, 6 befriedigend, 0 nicht ausgeführt. ⚠️ Britisch heißt es **mark**, amerikanisch **score** — und « note » ist auf Englisch eine Notiz, keine Note.",
          ja:"運動ごとに0〜10点。10は最優秀、6は満足、0は不実施。⚠️ イギリス英語は **mark**、アメリカ英語は **score** — そして英語の « note » はメモの意味で、点数ではありません。" } },

  { ref:"coefficient", lecon:4, coll:"notation",
    mots:{ fr:{m:"le coefficient"}, en:{m:"the coefficient", p:"kô-i-fi-cheunt", var:"double marks"},
           es:{m:"el coeficiente"}, it:{m:"il coefficiente"},
           de:{m:"der Koeffizient", p:"ko-è-fi-tsi-ènt"}, ja:{m:"係数", p:"keisū"} }, // ??
    def:{ fr:"Certains mouvements comptent double. Les Britanniques disent souvent simplement **double marks** : savoir lesquels sont doublés change la façon de préparer une reprise.",
          en:"Some movements count twice. The British often just say « double marks ».",
          es:"Algunos movimientos cuentan doble. Los británicos dicen a menudo simplemente **double marks**: saber cuáles se doblan cambia la manera de preparar una reprise.",
          it:"Certi movimenti contano doppio. I britannici dicono spesso semplicemente **double marks**: sapere quali sono raddoppiati cambia il modo di preparare una ripresa.",
          de:"Manche Lektionen zählen doppelt. Die Briten sagen oft schlicht **double marks**: Zu wissen, welche, verändert die Vorbereitung einer Aufgabe.",
          ja:"一部の運動は二倍で数えられます。イギリス人は単に **double marks** と言うことも。どの運動が二倍かを知っているかどうかで、経路の準備の仕方が変わります。" } },

  { ref:"pourcentage", lecon:4, coll:"notation",
    mots:{ fr:{m:"le pourcentage"}, en:{m:"the percentage", p:"peur-sènn-tidj"},
           es:{m:"el porcentaje"}, it:{m:"la percentuale"},
           de:{m:"der Prozentsatz", p:"pro-tsènt-zats"}, ja:{m:"得点率", p:"tokutenritsu"} }, // ??
    def:{ fr:"Le total ramené sur 100. Repères valables partout : autour de 60 % la reprise est correcte, 65 % bonne, 70 % très bonne, au-delà on parle de niveau international.",
          en:"The total as a percentage. Around 60 % is correct, 65 % good, 70 % very good, beyond that international level.",
          es:"El total llevado a 100. Referencias válidas en todas partes: en torno al 60 % la reprise es correcta, 65 % buena, 70 % muy buena, más allá se habla de nivel internacional.",
          it:"Il totale riportato su 100. Riferimenti validi ovunque: attorno al 60 % la ripresa è corretta, 65 % buona, 70 % molto buona, oltre si parla di livello internazionale.",
          de:"Die Summe auf 100 gerechnet. Überall gültige Anhaltspunkte: um 60 % ist die Aufgabe ordentlich, 65 % gut, 70 % sehr gut — darüber spricht man von internationalem Niveau.",
          ja:"合計を100点満点に換算したもの。世界共通の目安：60%前後で妥当、65%で良、70%で優 — それを超えれば国際レベルの話になります。" } },

  { ref:"remarques", lecon:4, coll:"notation",
    mots:{ fr:{m:"les remarques du juge"}, en:{m:"the comments", p:"ko-mèntss"},
           es:{m:"los comentarios"}, it:{m:"i commenti"},
           de:{m:"die Bemerkungen", p:"be-mèr-koun-gueune"}, ja:{m:"コメント", p:"komento"} },
    def:{ fr:"Écrites à la main, souvent en abrégé, et parfois plus utiles que la note elle-même. Quelques abréviations anglaises courantes : *needs more impulsion*, *croaked*, *bal.* pour balance, *tense*.",
          en:"Hand-written, often abbreviated, and often more useful than the mark itself.",
          es:"Escritas a mano, a menudo abreviadas, y a veces más útiles que la propia nota. Algunas abreviaturas inglesas corrientes: *needs more impulsion*, *croaked*, *bal.* por balance, *tense*.",
          it:"Scritte a mano, spesso abbreviate, e a volte più utili del voto stesso. Alcune abbreviazioni inglesi correnti: *needs more impulsion*, *croaked*, *bal.* per balance, *tense*.",
          de:"Handschriftlich, oft abgekürzt — und manchmal nützlicher als die Note selbst. Gängige englische Kürzel: *needs more impulsion*, *croaked*, *bal.* für balance, *tense*.",
          ja:"手書きで、しばしば略語で — ときに点数そのものより役に立ちます。よくある英語の略語：*needs more impulsion*、*croaked*、balance の略の *bal.*、*tense*。" } },

  { ref:"note-ensemble", lecon:4, coll:"notation",
    mots:{ fr:{m:"les notes d'ensemble"}, en:{m:"the collective marks", p:"ko-lèk-tiv marks"},
           es:{m:"las notas de conjunto"}, it:{m:"le note d'insieme"},
           de:{m:"die Gesamtnoten", p:"gue-zamt-nô-teune"}, ja:{m:"総合点", p:"sōgōten"} }, // ??
    def:{ fr:"En bas du protocole : allures, impulsion, soumission, position du cavalier. Elles jugent la reprise entière, pas un mouvement — et elles pèsent lourd.",
          en:"At the foot of the sheet: paces, impulsion, submission, rider's position. They judge the whole test, and they weigh heavily.",
          es:"Al pie del protocolo: aires, impulsión, sumisión, posición del jinete. Juzgan la reprise entera, no un movimiento — y pesan mucho.",
          it:"In fondo al protocollo: andature, impulso, sottomissione, posizione del cavaliere. Giudicano la ripresa intera, non un movimento — e pesano molto.",
          de:"Am Ende des Protokolls: Grundgangarten, Schwung, Durchlässigkeit, Sitz des Reiters. Sie bewerten die ganze Aufgabe, nicht eine Lektion — und sie wiegen schwer.",
          ja:"採点表のいちばん下 — 歩様、勢い、従順さ、騎手の姿勢。ひとつの運動ではなく演技全体を評価する項目で、配点も重いのです。" } },

  { ref:"erreur-parcours", lecon:4, coll:"notation",
    mots:{ fr:{m:"l'erreur de parcours"}, en:{m:"an error of course", p:"è-reur of korss"},
           es:{m:"un error de recorrido"}, it:{m:"un errore di percorso"},
           de:{m:"der Bahnfehler", p:"ban-fé-leur"}, ja:{m:"コース違い", p:"kōsu chigai"} }, // ??
    def:{ fr:"Se tromper de figure ou de lettre. Ce n'est pas éliminatoire tout de suite : la pénalité est forfaitaire, et c'est en général à la troisième erreur qu'on est éliminé — un détail qui évite d'abandonner pour rien.",
          en:"Going the wrong way. Not instant elimination: a fixed penalty, and usually only the third error sends you out.",
          es:"Equivocarse de figura o de letra. No es eliminatorio al instante: la penalización es fija, y en general es a la tercera falta cuando se elimina — un detalle que evita abandonar por nada.",
          it:"Sbagliare figura o lettera. Non è eliminatorio subito: la penalità è forfettaria, e in genere è alla terza errore che si è eliminati — un dettaglio che evita di ritirarsi per niente.",
          de:"Figur oder Buchstabe verwechselt. Nicht sofort eliminierend: Der Abzug ist pauschal, und meist scheidet man erst beim dritten Fehler aus — ein Detail, das vor grundlosem Aufgeben bewahrt.",
          ja:"図形や文字を間違えること。即失権にはなりません。減点は定額で、ふつうは三度目の間違いで失権 — 知っていれば、無用な棄権をせずに済む知識です。" } },

  { ref:"cloche-juge", lecon:4, coll:"notation",
    mots:{ fr:{m:"la cloche du juge"}, en:{m:"the bell", p:"bèl", var:"the horn · the whistle"},
           es:{m:"la campana"}, it:{m:"la campana"},
           de:{m:"die Glocke", p:"glo-ke"}, ja:{m:"合図の鐘", p:"aizu no kane"} }, // ??
    def:{ fr:"Elle sonne pour te faire entrer — et elle sonne aussi pour signaler une erreur de parcours. Deux sens opposés pour un même son : la reconnaître évite la panique.",
          en:"It rings to send you in — and it also rings to flag an error of course. Two opposite meanings, one sound.",
          es:"Suena para hacerte entrar — y suena también para señalar un error de recorrido. Dos sentidos opuestos para un mismo sonido: reconocerla evita el pánico.",
          it:"Suona per farti entrare — e suona anche per segnalare un errore di percorso. Due sensi opposti per lo stesso suono: riconoscerla evita il panico.",
          de:"Sie läutet zum Einreiten — und sie läutet auch bei einem Bahnfehler. Zwei gegensätzliche Bedeutungen für denselben Klang: Wer das weiß, gerät nicht in Panik.",
          ja:"入場の合図に鳴り — 経路違反の合図にも鳴ります。同じ音にまるで逆のふたつの意味。知っていれば慌てずに済みます。" } },

  { ref:"controle-embouchures", lecon:4, coll:"notation",
    mots:{ fr:{m:"le contrôle des embouchures"}, en:{m:"the tack check", p:"tak tchèk", var:"bit check"},
           es:{m:"el control de embocaduras"}, it:{m:"il controllo delle imboccature"},
           de:{m:"die Ausrüstungskontrolle", p:"aouss-rus-toungs-kon-tro-le"}, ja:{m:"馬具検査", p:"bagu kensa"} }, // ??
    def:{ fr:"À la sortie du rectangle, un commissaire vérifie mors, muserolle et éperons. Refuser, c'est l'élimination : on reste à cheval et on laisse faire.",
          en:"On leaving the arena a steward checks bit, noseband and spurs. Refusing means elimination: stay mounted and let them.",
          es:"A la salida del rectángulo, un comisario verifica bocado, muserola y espuelas. Negarse es la eliminación: uno permanece a caballo y deja hacer.",
          it:"All'uscita del rettangolo, un commissario verifica imboccatura, capezzina e speroni. Rifiutare è l'eliminazione: si resta a cavallo e si lascia fare.",
          de:"Am Ausgang des Vierecks prüft ein Steward Gebiss, Nasenriemen und Sporen. Verweigern heißt Ausscheiden: Man bleibt sitzen und lässt es geschehen.",
          ja:"馬場を出たところで、係員がハミ、鼻革、拍車を確認します。拒めば失権。馬上に座ったまま、されるがままにしておくこと。" } },

  { ref:"classement", lecon:4, coll:"notation",
    mots:{ fr:{m:"le classement"}, en:{m:"the placing", p:"plé-sing", var:"the results"},
           es:{m:"la clasificación"}, it:{m:"la classifica"},
           de:{m:"die Platzierung", p:"pla-tsi-roung"}, ja:{m:"順位", p:"jun'i"} },
    def:{ fr:"Affiché après le passage du dernier concurrent. En dressage, on se compare d'abord à son propre pourcentage précédent — le classement dépend de qui s'est inscrit ce jour-là.",
          en:"Posted after the last competitor. In dressage you compare yourself to your own previous percentage first.",
          es:"Publicado tras el paso del último concursante. En doma uno se compara primero con su propio porcentaje anterior — la clasificación depende de quién se inscribió ese día.",
          it:"Affisso dopo il passaggio dell'ultimo concorrente. In dressage ci si confronta prima col proprio percentuale precedente — la classifica dipende da chi si è iscritto quel giorno.",
          de:"Ausgehängt nach dem letzten Starter. In der Dressur vergleicht man sich zuerst mit dem eigenen letzten Prozentsatz — die Platzierung hängt davon ab, wer an dem Tag gemeldet hat.",
          ja:"最後の出場者が終わってから掲示されます。馬場馬術でまず比べる相手は、前回の自分のパーセンテージ。順位のほうは、その日に誰がエントリーしたか次第です。" } },

  /* ================================================================
     LA TENUE DE DRESSAGE — ajoutee le 15/08/2026, session 214, sur
     question puis accord de Blandine (« aussi leur veste et chapeau
     ont un nom specifique non ? » → « oui veste ok et haut de forme »).
     Le chapitre ne portait que `queue-de-pie`.

     🟥 « LE VESTON » A ETE ECARTE. Blandine : « veston ? ca se dit
     ca ? ». C'est le mot du REGLEMENT (la FFE ecrit « veste ou
     veston »), pas celui du paddock — et il evoque le costume de
     ville. Les cavaliers disent LA VESTE. NE PAS « corriger » en
     veston.

     LA REGLE QUE CES TROIS MOTS ENSEIGNENT : queue-de-pie et
     haut-de-forme vont ENSEMBLE, aux niveaux hauts seulement ; en
     dessous, veste et bombe. On ne melange pas. ⚠️ Le haut-de-forme
     recule partout au profit de la bombe, pour des raisons de
     securite — ne pas l'enseigner comme obligatoire.
     ================================================================ */

  { ref:"veste", lecon:4, coll:"tenue",
    mots:{ fr:{m:"la veste"}, en:{m:"the show jacket", p:"cho djè-kite", var:"the competition jacket"},
           es:{m:"la chaqueta"}, it:{m:"la giacca"},
           de:{m:"das Turnierjackett", p:"tour-nir-ja-kète", var:"der Turnierrock"}, ja:{m:"競技用ジャケット", p:"kyōgiyō jaketto"} }, // ?? ja
    def:{ fr:"La veste courte des niveaux club et amateur, portée avec la bombe. C'est la tenue de la très grande majorité des concours : la queue-de-pie ne vient qu'ensuite.",
          en:"The short jacket worn at club and amateur level, with a hat. It's what almost everyone competes in — the tailcoat comes much later.",
          es:"La chaqueta corta de los niveles club y amateur, con casco. Es la ropa de la gran mayoría de los concursos: el frac viene después.",
          it:"La giacca corta dei livelli club e amatoriale, con il cap. È l'abbigliamento della grande maggioranza dei concorsi: il frac viene dopo.",
          de:"Das kurze Jackett für Club- und Amateurniveau, mit Kappe. So startet die große Mehrheit — der Frack kommt erst viel später.",
          ja:"クラブ・アマチュア級で着る短い上着。ヘルメットと合わせます。ほとんどの競技会はこの服装で、燕尾服はもっと上の級からです。" } },

  { ref:"haut-de-forme", lecon:4, coll:"tenue",
    mots:{ fr:{m:"le haut-de-forme"}, en:{m:"the top hat", p:"top hatt"},
           es:{m:"la chistera"}, it:{m:"il cilindro"},
           de:{m:"der Zylinder", p:"tsu-linn-deur"}, ja:{m:"シルクハット", p:"shiruku hatto"} },
    def:{ fr:"Il se porte avec la queue-de-pie, aux niveaux élevés seulement — jamais avec la veste. ⚠️ Il recule partout au profit de la bombe : plusieurs fédérations l'ont interdit, et beaucoup de cavaliers de haut niveau y ont renoncé d'eux-mêmes.",
          en:"Worn with the tailcoat, at the top levels only — never with a show jacket. It's disappearing in favour of a hat: several federations have banned it, and many top riders gave it up themselves.",
          es:"Se lleva con el frac, solo en los niveles altos — nunca con la chaqueta. Está desapareciendo en favor del casco: varias federaciones lo han prohibido.",
          it:"Si porta con il frac, solo ai livelli alti — mai con la giacca. Sta sparendo a favore del cap: diverse federazioni l'hanno vietato.",
          de:"Wird zum Frack getragen, nur in den höheren Klassen — nie zum Turnierjackett. Er verschwindet zugunsten der Kappe: mehrere Verbände haben ihn verboten.",
          ja:"燕尾服と合わせ、上級でのみ着用します。ジャケットとは合わせません。安全のためヘルメットに置き換わりつつあり、禁止した連盟もあります。" } },

  { ref:"queue-de-pie", lecon:4, coll:"notation",
    mots:{ fr:{m:"la queue-de-pie"}, en:{m:"the tailcoat", p:"téïl-kôte", var:"shadbelly (US)"},
           es:{m:"el frac"}, it:{m:"il frac"},
           de:{m:"der Frack", p:"frak"}, ja:{m:"燕尾服", p:"enbifuku"} },
    def:{ fr:"Réservée aux épreuves de haut niveau ; la veste courte partout ailleurs. ⚠️ Les Américains l'appellent **shadbelly**, littéralement « ventre d'alose » — un mot que personne ne devine.",
          en:"For upper levels only; a short jacket everywhere else. Americans call it a shadbelly, « shad belly », which nobody guesses.",
          es:"Reservado a las pruebas de alto nivel; la chaqueta corta en el resto. ⚠️ Los americanos lo llaman **shadbelly**, literalmente « vientre de sábalo » — una palabra que nadie adivina.",
          it:"Riservato alle prove di alto livello; la giacca corta ovunque altro. ⚠️ Gli americani lo chiamano **shadbelly**, alla lettera « ventre di alosa » — una parola che nessuno indovina.",
          de:"Den hohen Prüfungen vorbehalten; sonst das kurze Jackett. ⚠️ Die Amerikaner nennen ihn **shadbelly**, wörtlich « Maifischbauch » — ein Wort, auf das niemand kommt.",
          ja:"上級競技だけの装い。それ以外はショートジャケットです。⚠️ アメリカでは **shadbelly** — 直訳すれば「ニシンの腹」。誰にも見当のつかない言葉です。" } },

  { ref:"kur", lecon:4, coll:"notation",
    mots:{ fr:{m:"la reprise libre en musique"}, en:{m:"the freestyle", p:"fri-staïl", var:"kür"},
           es:{m:"la Kür", var:"el ejercicio libre"}, it:{m:"il freestyle", var:"la Kür"},
           de:{m:"die Kür", p:"kur"}, ja:{m:"自由演技", p:"jiyū engi"} }, // ??
    def:{ fr:"Une reprise composée par le cavalier sur sa musique, avec des figures imposées à placer librement. ⚠️ Le mot allemand **die Kür** s'emploie tel quel dans le monde entier, y compris sur les protocoles internationaux.",
          en:"A test the rider builds to their own music, with required movements placed freely. The German word Kür is used worldwide.",
          es:"Una reprise compuesta por el jinete sobre su música, con figuras impuestas colocadas libremente. ⚠️ La palabra alemana **die Kür** se emplea tal cual en el mundo entero, incluso en los protocolos internacionales.",
          it:"Una ripresa composta dal cavaliere sulla sua musica, con figure imposte da piazzare liberamente. ⚠️ La parola tedesca **die Kür** si usa tale e quale nel mondo intero, anche sui protocolli internazionali.",
          de:"Eine vom Reiter zu eigener Musik gestaltete Aufgabe mit frei platzierten Pflichtlektionen. ⚠️ **Die Kür** wird weltweit im Original verwendet — auch auf internationalen Protokollen.",
          ja:"騎手が自分の音楽に振り付ける自由演技。規定の運動を自由な位置に組み込みます。⚠️ ドイツ語の **die Kür** は国際的な採点表の上でも、世界じゅうでそのまま使われています。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-reprise", lecon:1,
      fr:"Je passe à quelle heure ?",
      en:"What time am I on ?",
      es:"¿ A qué hora paso ?",
      it:"A che ora passo ?",
      de:"Wann bin ich dran ?",
      ja:"何時 に 出番 です か ?" },
    { ref:"lecteur-possible", lecon:1,
      fr:"Le lecteur est autorisé ici ?",
      en:"Is a caller allowed here ?",
      es:"¿ Se permite lector aquí ?",
      it:"Il lettore è permesso qui ?",
      de:"Ist ein Vorleser hier erlaubt ?",
      ja:"コーラー は 使え ます か ?" },
    { ref:"entree-a", lecon:1,
      fr:"J'entre à A, je salue à X.",
      en:"I enter at A, salute at X.",
      es:"Entro en A, saludo en X.",
      it:"Entro in A, saluto in X.",
      de:"Einreiten bei A, Gruß bei X.",
      ja:"A で 入場、 X で 敬礼。" },
    { ref:"mouvement-double", lecon:4,
      fr:"Ce mouvement est en coefficient deux ?",
      en:"Does this movement carry double marks ?",
      es:"¿ Este movimiento lleva coeficiente dos ?",
      it:"Questo movimento ha coefficiente due ?",
      de:"Hat diese Lektion einen Koeffizienten ?",
      ja:"この 課題 は 係数 二 です か ?" },
    { ref:"protocole-recuperer", lecon:4,
      fr:"Où je récupère mon protocole ?",
      en:"Where do I collect my sheet ?",
      es:"¿ Dónde recojo mi protocolo ?",
      it:"Dove ritiro il mio protocollo ?",
      de:"Wo hole ich mein Protokoll ab ?",
      ja:"採点表 は どこ で 受け取り ます か ?" },
    { ref:"soixante-cinq", lecon:4,
      fr:"65 %, son meilleur résultat.",
      en:"65 % — her best yet.",
      es:"65 %, su mejor resultado.",
      it:"65 %, il suo miglior risultato.",
      de:"65 % — ihr bestes Ergebnis.",
      ja:"65 パーセント、 自己 ベスト です。" },
    { ref:"cloche-erreur", lecon:4,
      fr:"Je me suis trompée de figure.",
      en:"I went the wrong way.",
      es:"Me equivoqué de figura.",
      it:"Ho sbagliato figura.",
      de:"Ich bin falsch geritten.",
      ja:"経路 を 間違え まし た。" },
    { ref:"controle-sortie", lecon:4,
      fr:"Reste à cheval pour le contrôle.",
      en:"Stay on for the tack check.",
      es:"Quédate montada para el control.",
      it:"Resta a cavallo per il controllo.",
      de:"Bleib sitzen für die Kontrolle.",
      ja:"検査 まで 馬 に 乗っ た まま で。" }
  ],

  /* ==================================================================
     LE DIALOGUE DE WINDSOR — RETRAVAILLÉ LE 18/08/2026.

     🟥 LES 18 PHRASES SONT DE BLANDINE. Sa consigne : *« moitié concours,
     moitié conseils de monte »* — et c'est ce qui change tout. L'ancien
     dialogue décrivait le décor ; celui-ci enseigne À MONTER une reprise.

     🟥 SA REMARQUE SUR LE LEXIQUE, ET ELLE ÉTAIT JUSTE : *« certains
     termes deviennent beaucoup plus intéressants que lice ou même entrée
     en A »*. Neuf entrées ont été ajoutées le même jour — la ligne du
     milieu, la diagonale, le coin, la piste, la transition descendante,
     rééquilibrer, tomber sur les épaules, le garrot, l'amplitude. Ce
     sont les mots qu'on ENTEND VRAIMENT au bord d'un rectangle.
     ⚠️ `lice` et `grand-cote` sont conservés sans phrase : ils ne gênent
     pas et s'apprennent en lisant.

     🟥 LA PHRASE QU'ELLE VOULAIT ABSOLUMENT (temps 3) : *« après une
     diagonale, va chercher ton coin : ne coupe pas le virage »*. Son
     mot : elle apprend en même temps *diagonal*, *corner* et *cut the
     corner*. NE PAS la retirer.

     ⚠️ TROIS NOTIONS QUE PERSONNE N'EXPLIQUE AILLEURS :
     · **ne pas tirer pour la transition** — on se grandit, on rééquilibre,
       on garde l'activité des postérieurs. Tirer fait tomber sur les
       épaules.
     · **sentir monter le garrot** — c'est à ça qu'on sait qu'un cheval se
       porte. `withers` est toujours au pluriel en anglais.
     · **l'amplitude n'est pas la vitesse** — allonger, c'est couvrir plus
       de terrain à CHAQUE foulée, pas en faire plus. L'anglais *ground
       cover* le dit exactement.

     ⚠️ Les figures du temps 6 (épaule en dedans, appuyer, changement de
     pied) sont en LEÇON 2, qui n'est attribuée à aucune ville : elles
     s'emploient en `motsAilleurs`. Et `protocole` est en leçon 4.

     ⚠️ NE PAS CONFONDRE AVEC VERSAILLES, l'autre ville de ce fichier :
     Windsor monte une reprise EN CONCOURS, Versailles travaille les
     QUALITÉS du dressage. Deux dialogues, deux angles.

     `dit` : "joueuse" = elle produit · "club" = son coach au bord.
  ================================================================== */
  dialogue: {
    ville: "windsor", lecon: 1, temps: 7, langues: ["fr","en","es","it","de","ja"],   /* 18 phrases */

    phrases: [

      /* ---- temps 1 · l'engagement et le lecteur ---- */
      { ref:"dw2-engagee-amateur", temps:1, dit:"joueuse", mots:["reprise-test"],
        fr:"Je suis engagée sur la reprise de l'Amateur 1.",
        en:"I'm entered for the Amateur 1 dressage test.",
        es:"Estoy inscrita en la prueba de Amateur 1.",
        it:"Sono iscritta alla ripresa Amateur 1.",
        de:"Ich bin für die Amateur-1-Dressuraufgabe genannt.",
        ja:"アマチュア 1 の 課目 に 出場 し ます。" },

      { ref:"dw2-droit-lecteur", temps:1, dit:"joueuse", mots:["lecteur","reprise-test"],
        fr:"Est-ce que j'ai le droit d'avoir un lecteur pour cette reprise ?",
        en:"Am I allowed to have a caller for this test?",
        es:"¿Puedo tener un lector para esta prueba?",
        it:"Posso avere un lettore per questa ripresa?",
        de:"Darf ich für diese Aufgabe einen Ansager haben?",
        ja:"この 課目 で は 読み手 を つけ て も よい です か ?" },

      { ref:"dw2-entre-en-a", temps:1, dit:"joueuse", mots:["entree","juge"], motsAilleurs:["lettre"],
        fr:"J'entre en A après la cloche du juge.",
        en:"I enter at A after the judge's bell.",
        es:"Entro en A después de la campana del juez.",
        it:"Entro in A dopo la campana del giudice.",
        de:"Ich reite nach dem Glockenzeichen des Richters bei A ein.",
        ja:"審判 の 合図 の 鐘 の あと、 A から 入場 し ます。" },

      /* ---- temps 2 · la ligne du milieu et l'arrêt ---- */
      { ref:"dw2-ligne-milieu", temps:2, dit:"club", mots:["ligne-milieu","juge"],
        fr:"Soigne ta ligne du milieu : le juge te regarde de face.",
        en:"Ride your centre line accurately: the judge is looking at you head-on.",
        es:"Cuida tu línea media: el juez te mira de frente.",
        it:"Cura la linea mediana: il giudice ti guarda di fronte.",
        de:"Reite die Mittellinie genau: der Richter sieht dich von vorn.",
        ja:"中央 線 を 丁寧 に。 審判 は 正面 から 見 て い ます。" },

      { ref:"dw2-prepare-arret", temps:2, dit:"club", mots:["ligne-milieu"], motsAilleurs:["lettre"],
        fr:"Prépare ton arrêt plusieurs foulées avant X.",
        en:"Prepare your halt several strides before X.",
        es:"Prepara tu parada varios trancos antes de X.",
        it:"Prepara l'arresto diverse falcate prima di X.",
        de:"Bereite die Halt mehrere Tritte vor X vor.",
        ja:"停止 は X の 数 歩 手前 から 準備 し ます。" },

      /* ---- temps 3 · le coin ---- */
      { ref:"dw2-coupe-pas-virage", temps:3, dit:"club", mots:["diagonale","coin"],
        fr:"Après une diagonale, va chercher ton coin : ne coupe pas le virage.",
        en:"After a diagonal, ride deep into the corner: don't cut the turn.",
        es:"Después de una diagonal, ve a buscar la esquina: no cortes el giro.",
        it:"Dopo una diagonale, vai a cercare l'angolo: non tagliare la curva.",
        de:"Nach einer Diagonale reite tief in die Ecke: schneide die Wendung nicht ab.",
        ja:"斜線 の あと は 隅角 まで しっかり 入り ます。 曲がり を 切ら ない こと。" },

      { ref:"dw2-coin-reequilibrer", temps:3, dit:"club", mots:["coin","reequilibrer"],
        fr:"Utilise le coin pour rééquilibrer ton cheval avant le mouvement suivant.",
        en:"Use the corner to rebalance your horse before the next movement.",
        es:"Usa la esquina para reequilibrar al caballo antes del movimiento siguiente.",
        it:"Usa l'angolo per riequilibrare il cavallo prima del movimento successivo.",
        de:"Nutze die Ecke, um dein Pferd vor der nächsten Lektion neu auszubalancieren.",
        ja:"次 の 運動 の 前 に、 隅角 を 使っ て 立て直し ます。" },

      /* ---- temps 4 · les transitions ---- */
      { ref:"dw2-grandis-toi", temps:4, dit:"club", mots:["transition-descendante","reequilibrer"],
        fr:"Avant une transition descendante, grandis-toi et rééquilibre ton cheval.",
        en:"Before a downward transition, sit tall and rebalance your horse.",
        es:"Antes de una transición descendente, yérguete y reequilibra al caballo.",
        it:"Prima di una transizione discendente, allungati e riequilibra il cavallo.",
        de:"Vor einem Übergang abwärts: wachse und balanciere dein Pferd neu aus.",
        ja:"減速 の 移行 の 前 に、 上体 を 伸ばし、 馬 を 立て直し ます。" },

      { ref:"dw2-tire-pas", temps:4, dit:"club", mots:["transition-descendante"], motsAilleurs:["engagement","arriere-main"],
        fr:"Ne tire pas pour faire la transition : garde l'activité des postérieurs.",
        en:"Don't pull for the transition: keep the hind legs active.",
        es:"No tires para hacer la transición: mantén la actividad de los posteriores.",
        it:"Non tirare per la transizione: mantieni l'attività dei posteriori.",
        de:"Zieh nicht für den Übergang: halte die Hinterbeine aktiv.",
        ja:"移行 の ため に 引か ない こと。 後肢 の 活動 を 保ち ます。" },

      { ref:"dw2-manque-garrot", temps:4, dit:"club", mots:["garrot","tomber-epaules","reequilibrer","transition-descendante"],
        fr:"Si ton cheval manque de garrot, redresse-le avant la transition pour éviter qu'il tombe sur les épaules.",
        en:"If your horse lacks lift through the withers, rebalance him before the transition so he doesn't fall onto the forehand.",
        es:"Si a tu caballo le falta cruz, reequilíbralo antes de la transición para que no caiga sobre las espaldas.",
        it:"Se al tuo cavallo manca il garrese, riequilibralo prima della transizione perché non cada sulle spalle.",
        de:"Fehlt deinem Pferd der Widerrist, balanciere es vor dem Übergang neu aus, damit es nicht auf die Vorhand fällt.",
        ja:"き甲 の 持ち上がり が 足り なけれ ば、 移行 の 前 に 立て直し ます。 前躯 に 落ち ない ため です。" },

      /* ---- temps 5 · les allongements ---- */
      { ref:"dw2-trot-allonge", temps:5, dit:"club", mots:["amplitude"], motsAilleurs:["trot-allonge","cadence"],
        fr:"Dans le trot allongé, cherche l'amplitude sans accélérer le rythme.",
        en:"In extended trot, look for more ground cover without quickening the rhythm.",
        es:"En el trote alargado, busca amplitud sin acelerar el ritmo.",
        it:"Nel trotto allungato, cerca l'ampiezza senza accelerare il ritmo.",
        de:"Im starken Trab such den Raumgriff, ohne den Takt zu beschleunigen.",
        ja:"伸長 速歩 で は、 リズム を 速め ず に 歩幅 の 伸び を 求め ます。" },

      { ref:"dw2-avant-fin-diagonale", temps:5, dit:"club", mots:["diagonale","coin"],
        fr:"Prépare ta transition avant la fin de la diagonale, pas dans le coin.",
        en:"Prepare your transition before the end of the diagonal, not in the corner.",
        es:"Prepara la transición antes del final de la diagonal, no en la esquina.",
        it:"Prepara la transizione prima della fine della diagonale, non nell'angolo.",
        de:"Bereite den Übergang vor dem Ende der Diagonale vor, nicht in der Ecke.",
        ja:"移行 は 斜線 の 終わり の 前 に 準備 し ます。 隅角 に 入っ て から で は 遅い です。" },

      /* ---- temps 6 · les figures ---- */
      { ref:"dw2-epaule-dedans", temps:6, dit:"club", mots:["piste"], motsAilleurs:["epaule-dedans","arriere-main"],
        fr:"Dans l'épaule en dedans, garde les hanches sur la piste et contrôle les épaules.",
        en:"In shoulder-in, keep the hindquarters on the track and control the shoulders.",
        es:"En la espalda adentro, mantén las ancas en la pista y controla las espaldas.",
        it:"Nella spalla in dentro, tieni le anche sulla pista e controlla le spalle.",
        de:"Im Schulterherein bleibt die Hinterhand auf dem Hufschlag, die Schultern führst du.",
        ja:"肩 を 内 に 入れる 運動 で は、 腰 を 蹄跡 に 残し、 肩 を 導き ます。" },

      { ref:"dw2-appuyer-incurvation", temps:6, dit:"club", mots:["incurvation"], motsAilleurs:["appuyer","equilibre"],
        fr:"Dans l'appuyer, pense d'abord à l'incurvation et à l'équilibre, pas à aller de côté.",
        en:"In half-pass, think about bend and balance first, not just moving sideways.",
        es:"En el apoyo, piensa primero en la incurvación y el equilibrio, no en ir de lado.",
        it:"Nell'appoggiata, pensa prima all'incurvamento e all'equilibrio, non ad andare di lato.",
        de:"Im Traversale denk zuerst an Biegung und Gleichgewicht, nicht ans Seitwärts.",
        ja:"斜 め 横 歩 で は、 横 に 動く こと より、 まず 湾曲 と バランス を 考え ます。" },

      { ref:"dw2-changement-droit", temps:6, dit:"club", mots:["rectitude"], motsAilleurs:["changement-pied"],
        fr:"Dans le changement de pied, garde le cheval droit avant, pendant et après le changement.",
        en:"In a flying change, keep the horse straight before, during and after the change.",
        es:"En el cambio de pie, mantén al caballo derecho antes, durante y después del cambio.",
        it:"Nel cambio di piede, tieni il cavallo dritto prima, durante e dopo il cambio.",
        de:"Beim fliegenden Wechsel bleibt das Pferd davor, dabei und danach gerade.",
        ja:"フライング チェンジ で は、 その 前 も、 最中 も、 あと も、 馬 を まっすぐ 保ち ます。" },

      /* ---- temps 7 · la fin de la reprise ---- */
      { ref:"dw2-erreur-gache-pas", temps:7, dit:"club", mots:["reprise-test"],
        fr:"Si tu rates une figure, ne laisse pas l'erreur gâcher le reste de ta reprise.",
        en:"If you make a mistake in a movement, don't let it spoil the rest of your test.",
        es:"Si fallas una figura, no dejes que el error estropee el resto de la prueba.",
        it:"Se sbagli una figura, non lasciare che l'errore rovini il resto della ripresa.",
        de:"Wenn dir eine Lektion misslingt, lass den Fehler nicht die ganze Aufgabe verderben.",
        ja:"ひとつ の 運動 を 失敗 し て も、 その 誤り に 演技 の 残り を 台無し に さ せ ない こと。" },

      { ref:"dw2-dernier-salut", temps:7, dit:"club", mots:["salut","reprise-test"],
        fr:"À la fin, soigne ton dernier arrêt et ton salut : la reprise n'est pas terminée avant.",
        en:"At the end, ride your final halt and salute carefully: the test isn't over until then.",
        es:"Al final, cuida la última parada y el saludo: la prueba no acaba antes.",
        it:"Alla fine, cura l'ultimo arresto e il saluto: la ripresa non è finita prima.",
        de:"Am Ende reite Halt und Gruß sorgfältig: die Aufgabe ist vorher nicht zu Ende.",
        ja:"最後 の 停止 と 敬礼 を 丁寧 に。 それ まで 演技 は 終わっ て い ませ ん。" },

      { ref:"dw2-ou-protocole", temps:7, dit:"joueuse", mots:["juge"], motsAilleurs:["protocole"],
        fr:"Où est-ce que je récupère mon protocole pour lire les commentaires du juge ?",
        en:"Where do I collect my test sheet to read the judge's comments?",
        es:"¿Dónde recojo mi hoja para leer los comentarios del juez?",
        it:"Dove ritiro il mio protocollo per leggere i commenti del giudice?",
        de:"Wo bekomme ich meinen Protokollbogen, um die Richterbemerkungen zu lesen?",
        ja:"審判 の 講評 を 読む ため の 採点 表 は どこ で 受け取り ます か ?" },
    ]
  },

  /* ==================================================================
     LE DIALOGUE DE VERSAILLES — RETRAVAILLÉ LE 18/08/2026.

     🟥 LES 36 PHRASES SONT DE BLANDINE, et elles remplacent les 26
     précédentes. **RIEN N'EST PERDU** : ses décisions du 16/08 y sont
     toutes reprises — le rassembler avec l'abaissement des hanches, la
     soumission qui n'est pas l'obéissance, l'appuyer contre la cession.

     🟥 CE QUI CHANGE, ET POURQUOI C'EST MEILLEUR : le dialogue fonctionne
     désormais en **PAIRES QUESTION → RÉPONSE VÉCUE**. 36 phrases, donc
     18 échanges. Chaque notion s'explique par une réponse d'écuyer au
     lieu d'être posée comme une définition. Son mot : *« elles
     fonctionnent par paires question → définition vécue... c'est
     beaucoup plus fort pédagogiquement qu'une liste de définitions
     posées à côté »*.
     ⚠️ NE PAS séparer les paires ni réordonner les temps : la
     progression suit l'échelle allemande, et le temps 13 la referme en
     disant que tout se tient.

     ⚠️ DEUX DISTINCTIONS QUE PERSONNE N'EXPLIQUE AILLEURS :
     · **engagement ≠ impulsion** (temps 5) — l'impulsion est l'énergie
       vers l'avant, l'engagement est la façon dont les postérieurs
       viennent travailler sous le cheval. C'est LA confusion courante.
     · **flexion ≠ incurvation** (temps 6) — la flexion est tête et
       encolure, l'incurvation tout le corps. L'allemand a deux mots,
       *Stellung* et *Biegung* ; le français dit « pli » pour les deux.

     🟥 ET LA LÉGÈRETÉ PORTE SELF-CARRIAGE, fusionnés le même jour sur
     décision de Blandine : *« quand on aborde l'équitation légère, c'est
     également avoir une équitation qui amène son cheval à se tenir par
     lui-même »*. Les temps 9 et 10 approfondissent donc la même notion
     vue des deux côtés — le cheval qui se porte, le cavalier qui allège.
     NE PAS les redédoubler en deux entrées.

     ⚠️ TROIS ENTRÉES ONT ÉTÉ AJOUTÉES le même jour pour ce dialogue :
     `flexion`, `arriere-main`, `avant-main`. Et les mouvements du temps 7
     (appuyer, cession, tête au mur, épaule en dedans) viennent de la
     LEÇON 2, qui n'est attribuée à aucune ville — ils s'emploient donc
     en `motsAilleurs`.

     `dit` : "joueuse" = elle produit · "club" = l'écuyer.
  ================================================================== */
  dialogueVersailles: {
    ville: "versailles", lecon: 3, temps: 13, langues: ["fr","en","es","it","de","ja"],   /* 36 phrases */

    phrases: [

      /* ---- temps 1 · observer ---- */
      { ref:"dv2-assister", temps:1, dit:"joueuse", mots:[], motsAilleurs:["reprise-test"],
        fr:"Est-ce qu'on peut assister à la reprise ?",
        en:"Can we watch the lesson?",
        es:"¿Podemos asistir a la sesión?",
        it:"Possiamo assistere alla ripresa?",
        de:"Dürfen wir bei der Arbeit zuschauen?",
        ja:"稽古 を 見学 し て も よい です か ?" },

      { ref:"dv2-r-qualite", temps:1, dit:"club", mots:["cadence"],
        fr:"Oui. Ici, on travaille surtout sur la qualité du mouvement et des réponses du cheval.",
        en:"Yes. Here, we mainly work on the quality of the horse's movement and responses.",
        es:"Sí. Aquí trabajamos sobre todo la calidad del movimiento y de las respuestas del caballo.",
        it:"Sì. Qui lavoriamo soprattutto sulla qualità del movimento e delle risposte del cavallo.",
        de:"Ja. Hier arbeiten wir vor allem an der Qualität der Bewegung und der Reaktionen des Pferdes.",
        ja:"はい。 ここ で は、 動き と 反応 の 質 を おもに 追い ます。" },

      /* ---- temps 2 · rythme et décontraction ---- */
      { ref:"dv2-rythme-quoi", temps:2, dit:"joueuse", mots:["cadence"],
        fr:"Qu'est-ce que vous écoutez quand vous parlez du rythme ?",
        en:"What are you listening for when you talk about rhythm?",
        es:"¿Qué escuchan cuando hablan del ritmo?",
        it:"Che cosa ascoltate quando parlate di ritmo?",
        de:"Worauf hören Sie, wenn Sie vom Takt sprechen?",
        ja:"リズム と いう とき、 何 を 聴い て い ます か ?" },

      { ref:"dv2-r-regularite", temps:2, dit:"club", mots:["cadence"],
        fr:"La régularité des foulées : le rythme doit rester constant, même si l'on allonge ou raccourcit l'allure.",
        en:"The regularity of the strides: the rhythm should remain constant even when the stride is lengthened or shortened.",
        es:"La regularidad de los trancos: el ritmo debe mantenerse constante aunque se alargue o se acorte el aire.",
        it:"La regolarità delle falcate: il ritmo deve restare costante anche allungando o accorciando.",
        de:"Die Gleichmäßigkeit der Tritte: der Takt bleibt gleich, auch wenn verlängert oder verkürzt wird.",
        ja:"歩幅 の 規則 正し さ です。 伸ばし て も 詰め て も、 リズム は 変わら ない こと。" },

      { ref:"dv2-precipite", temps:2, dit:"joueuse", mots:["cadence"],
        fr:"Il se précipite un peu. C'est un problème de rythme ?",
        en:"He's rushing a little. Is that a rhythm problem?",
        es:"Se precipita un poco. ¿Es un problema de ritmo?",
        it:"Si precipita un po'. È un problema di ritmo?",
        de:"Er eilt ein wenig. Ist das ein Taktproblem?",
        ja:"少し 急い で い ます。 リズム の 問題 でしょう か ?" },

      { ref:"dv2-r-decontraction", temps:2, dit:"club", mots:["decontraction","cadence"],
        fr:"Souvent, oui, mais regardez aussi la décontraction : ses muscles doivent travailler sans résistance ni tension.",
        en:"Often, yes, but also look at suppleness: his muscles should work without resistance or tension.",
        es:"A menudo sí, pero mire también la descontracción: sus músculos deben trabajar sin resistencia ni tensión.",
        it:"Spesso sì, ma guardi anche la decontrazione: i muscoli devono lavorare senza resistenza né tensione.",
        de:"Oft ja, aber achten Sie auch auf die Losgelassenheit: die Muskeln sollen ohne Widerstand arbeiten.",
        ja:"多く は そう です。 ただ、 リラックス も 見 て ください。 筋肉 が 抵抗 も 緊張 も なく 働く こと。" },

      /* ---- temps 3 · contact ---- */
      { ref:"dv2-je-tire", temps:3, dit:"joueuse", mots:["contact"],
        fr:"J'ai l'impression de tirer sur mes rênes.",
        en:"I feel like I'm pulling on the reins.",
        es:"Tengo la impresión de tirar de las riendas.",
        it:"Ho l'impressione di tirare le redini.",
        de:"Ich habe das Gefühl, an den Zügeln zu ziehen.",
        ja:"手綱 を 引い て いる 気 が し ます。" },

      { ref:"dv2-r-contact", temps:3, dit:"club", mots:["contact"],
        fr:"Le contact ne doit pas venir de la main qui tire. Le cheval vient chercher un contact léger, égal et élastique.",
        en:"Contact shouldn't come from a pulling hand. The horse should seek a light, even and elastic contact.",
        es:"El contacto no debe venir de una mano que tira. El caballo busca un contacto ligero, igual y elástico.",
        it:"Il contatto non deve venire da una mano che tira. Il cavallo cerca un contatto leggero, uguale ed elastico.",
        de:"Die Anlehnung kommt nicht aus der ziehenden Hand. Das Pferd sucht eine leichte, gleichmäßige, elastische Anlehnung.",
        ja:"コンタクト は 引く 手 から は 生まれ ませ ん。 馬 の ほう から、 軽く、 均等 で、 弾力 の ある 接触 を 求め て き ます。" },

      /* ---- temps 4 · impulsion ---- */
      { ref:"dv2-impulsion-energie", temps:4, dit:"joueuse", mots:["impulsion"],
        fr:"L'impulsion, c'est simplement avoir plus d'énergie ?",
        en:"Is impulsion simply about having more energy?",
        es:"¿La impulsión es simplemente tener más energía?",
        it:"L'impulso è semplicemente avere più energia?",
        de:"Ist Schwung einfach nur mehr Energie?",
        ja:"推進力 と は、 単に エネルギー が 多い こと です か ?" },

      { ref:"dv2-r-impulsion", temps:4, dit:"club", mots:["impulsion","arriere-main"],
        fr:"C'est l'envie du cheval de se porter en avant de lui-même, avec une énergie qui vient de l'arrière-main — pas d'aller plus vite.",
        en:"It's the horse's willingness to move forward of his own accord, with energy coming from the hindquarters — not to go faster.",
        es:"Es el deseo del caballo de irse hacia delante por sí mismo, con una energía que viene del posterior, no de ir más rápido.",
        it:"È la voglia del cavallo di portarsi avanti da sé, con un'energia che viene dal posteriore, non di andare più veloce.",
        de:"Es ist der Wille des Pferdes, von sich aus vorwärts zu gehen, mit Energie aus der Hinterhand — nicht schneller zu werden.",
        ja:"馬 が 自分 から 前 へ 出 よう と する 気持ち です。 その 力 は 後躯 から 来 ます。 速く 走る こと で は あり ませ ん。" },

      { ref:"dv2-comment-savoir", temps:4, dit:"joueuse", mots:["impulsion"],
        fr:"Comment je sais qu'il se porte vraiment en avant ?",
        en:"How do I know he's genuinely going forward?",
        es:"¿Cómo sé que va realmente hacia delante?",
        it:"Come faccio a sapere che va davvero avanti?",
        de:"Woran erkenne ich, dass er wirklich vorwärts geht?",
        ja:"本当 に 前 へ 出 て いる か、 どう 判断 し ます か ?" },

      { ref:"dv2-r-repond-jambe", temps:4, dit:"club", mots:["impulsion"], motsAilleurs:["permeabilite"],
        fr:"Il répond à votre jambe immédiatement, sans que vous ayez à le pousser à chaque foulée.",
        en:"He responds to your leg immediately, without you having to drive him forward every stride.",
        es:"Responde a su pierna de inmediato, sin que tenga que empujarlo en cada tranco.",
        it:"Risponde subito alla gamba, senza che debba spingerlo a ogni falcata.",
        de:"Er reagiert sofort auf den Schenkel, ohne dass Sie ihn bei jedem Sprung treiben müssen.",
        ja:"脚 に すぐ 応え、 一 歩 ごと に 押す 必要 が ない こと です。" },

      /* ---- temps 5 · engagement et arrière-main ---- */
      { ref:"dv2-engagement-quoi", temps:5, dit:"joueuse", mots:["engagement","arriere-main"],
        fr:"Qu'est-ce que l'engagement des postérieurs ?",
        en:"What is engagement of the hindquarters?",
        es:"¿Qué es el enganche de los posteriores?",
        it:"Che cos'è l'impegno dei posteriori?",
        de:"Was ist das Untertreten der Hinterhand?",
        ja:"後肢 の 踏み込み と は 何 です か ?" },

      { ref:"dv2-r-sous-la-masse", temps:5, dit:"club", mots:["engagement","arriere-main"],
        fr:"Les postérieurs viennent davantage sous la masse et les articulations se fléchissent davantage.",
        en:"The hind legs step further underneath the body and the joints flex more.",
        es:"Los posteriores entran más bajo la masa y las articulaciones se flexionan más.",
        it:"I posteriori entrano di più sotto la massa e le articolazioni si flettono di più.",
        de:"Die Hinterbeine treten weiter unter den Körper und die Gelenke beugen sich mehr.",
        ja:"後肢 が より 体 の 下 に 入り、 関節 が より 深く 曲がり ます。" },

      { ref:"dv2-pas-pareil", temps:5, dit:"joueuse", mots:["engagement","impulsion"],
        fr:"Donc l'engagement et l'impulsion, ce n'est pas la même chose ?",
        en:"So engagement and impulsion aren't the same thing?",
        es:"¿Entonces el enganche y la impulsión no son lo mismo?",
        it:"Quindi impegno e impulso non sono la stessa cosa?",
        de:"Untertreten und Schwung sind also nicht dasselbe?",
        ja:"では、 踏み込み と 推進力 は 別 の もの です か ?" },

      { ref:"dv2-r-difference", temps:5, dit:"club", mots:["engagement","impulsion","arriere-main"],
        fr:"Non. L'impulsion est l'énergie vers l'avant ; l'engagement décrit davantage comment les postérieurs viennent travailler sous le cheval.",
        en:"No. Impulsion is the forward energy; engagement describes more how the hind legs come underneath the horse to work.",
        es:"No. La impulsión es la energía hacia delante; el enganche describe cómo los posteriores vienen a trabajar bajo el caballo.",
        it:"No. L'impulso è l'energia in avanti; l'impegno descrive come i posteriori vengono a lavorare sotto il cavallo.",
        de:"Nein. Schwung ist die Energie nach vorn; das Untertreten beschreibt, wie die Hinterbeine unter das Pferd kommen.",
        ja:"違い ます。 推進力 は 前 へ 向かう 力、 踏み込み は 後肢 が 体 の 下 で どう 働く か を 表し ます。" },

      /* ---- temps 6 · rectitude, flexion, incurvation ---- */
      { ref:"dv2-est-droit", temps:6, dit:"joueuse", mots:["rectitude"],
        fr:"Il est droit maintenant ?",
        en:"Is he straight now?",
        es:"¿Está derecho ahora?",
        it:"È dritto adesso?",
        de:"Ist er jetzt gerade?",
        ja:"今 は まっすぐ です か ?" },

      { ref:"dv2-r-alignes", temps:6, dit:"club", mots:["rectitude","avant-main","arriere-main"],
        fr:"Presque. Pour être droit, son avant-main et son arrière-main doivent rester alignés sur la ligne qu'il suit.",
        en:"Almost. To be straight, his forehand and hindquarters need to stay aligned with the line he is following.",
        es:"Casi. Para estar derecho, su tercio anterior y su posterior deben quedar alineados con la línea que sigue.",
        it:"Quasi. Per essere dritto, anteriore e posteriore devono restare allineati sulla linea che segue.",
        de:"Fast. Gerade heißt: Vorhand und Hinterhand bleiben auf der Linie, der er folgt.",
        ja:"ほぼ です。 まっすぐ と は、 前躯 と 後躯 が 進む 線 の 上 に 揃っ て いる こと です。" },

      { ref:"dv2-flexion-incurvation", temps:6, dit:"joueuse", mots:["flexion","incurvation"],
        fr:"Quelle est la différence entre flexion et incurvation ?",
        en:"What's the difference between flexion and bend?",
        es:"¿Cuál es la diferencia entre flexión e incurvación?",
        it:"Qual è la differenza tra flessione e incurvamento?",
        de:"Was ist der Unterschied zwischen Stellung und Biegung?",
        ja:"屈曲 と 湾曲 の 違い は 何 です か ?" },

      { ref:"dv2-r-flexion", temps:6, dit:"club", mots:["flexion","incurvation"],
        fr:"La flexion concerne surtout l'orientation de la tête et de l'encolure ; l'incurvation concerne l'ensemble du corps.",
        en:"Flexion mainly concerns the position of the head and neck; bend involves the whole body.",
        es:"La flexión afecta sobre todo a la cabeza y el cuello; la incurvación afecta a todo el cuerpo.",
        it:"La flessione riguarda soprattutto testa e collo; l'incurvamento riguarda tutto il corpo.",
        de:"Die Stellung betrifft vor allem Kopf und Hals; die Biegung den ganzen Körper.",
        ja:"屈曲 は おもに 頭 と 首 の 向き、 湾曲 は 体 全体 に 関わり ます。" },

      /* ---- temps 7 · cession, appuyer, tête au mur ---- */
      { ref:"dv2-appuyer-cession", temps:7, dit:"joueuse", mots:[], motsAilleurs:["appuyer","cession-jambe"],
        fr:"Est-ce que l'appuyer se demande comme une cession à la jambe ?",
        en:"Is half-pass asked for in the same way as leg-yield?",
        es:"¿El apoyo se pide igual que la cesión a la pierna?",
        it:"L'appoggiata si chiede come la cessione alla gamba?",
        de:"Fragt man das Traversale wie das Schenkelweichen?",
        ja:"斜 め 横 歩 は、 脚 に 譲る 動き と 同じ よう に 求め ます か ?" },

      { ref:"dv2-r-appuyer", temps:7, dit:"club", mots:["incurvation","flexion"], motsAilleurs:["appuyer","cession-jambe"],
        fr:"Non. Dans l'appuyer, le cheval est incurvé dans la direction du déplacement. Dans la cession, il reste presque droit avec une légère flexion opposée au déplacement.",
        en:"No. In half-pass, the horse is bent in the direction of travel. In leg-yield, he stays almost straight with slight flexion away from the direction of travel.",
        es:"No. En el apoyo, el caballo está incurvado hacia la dirección del desplazamiento. En la cesión, queda casi derecho con una ligera flexión contraria.",
        it:"No. Nell'appoggiata il cavallo è incurvato verso la direzione del movimento. Nella cessione resta quasi dritto con una leggera flessione opposta.",
        de:"Nein. Im Traversale ist das Pferd in Bewegungsrichtung gebogen. Beim Schenkelweichen bleibt es fast gerade, mit leichter Stellung entgegen der Richtung.",
        ja:"違い ます。 斜 め 横 歩 で は、 馬 は 進む 方向 に 湾曲 し ます。 脚 に 譲る 動き で は、 ほぼ まっすぐ の まま、 進む 方向 と 逆 に わずか に 屈曲 し ます。" },

      { ref:"dv2-tete-au-mur", temps:7, dit:"joueuse", mots:[], motsAilleurs:["tete-au-mur","epaule-dedans"],
        fr:"Et la tête au mur ?",
        en:"And travers?",
        es:"¿Y la grupa adentro?",
        it:"E il travers?",
        de:"Und das Travers?",
        ja:"頭 を 壁 に 向ける 動き は ?" },

      { ref:"dv2-r-tete-au-mur", temps:7, dit:"club", mots:[], motsAilleurs:["tete-au-mur","epaule-dedans"],
        fr:"C'est l'inverse de l'épaule en dedans : les hanches viennent à l'intérieur tandis que les épaules restent sur la piste.",
        en:"It's the opposite of shoulder-in: the hindquarters come in while the shoulders stay on the track.",
        es:"Es lo contrario de la espalda adentro: las ancas entran mientras las espaldas quedan en la pista.",
        it:"È il contrario della spalla in dentro: le anche entrano mentre le spalle restano sulla pista.",
        de:"Es ist das Gegenteil vom Schulterherein: die Hinterhand kommt herein, die Schultern bleiben auf dem Hufschlag.",
        ja:"肩 を 内 に 入れる 動き の 逆 です。 腰 が 内 に 入り、 肩 は 蹄跡 に 残り ます。" },

      /* ---- temps 8 · rassembler ---- */
      { ref:"dv2-rassembler-quoi", temps:8, dit:"joueuse", mots:["rassembler"],
        fr:"Le rassembler, c'est quoi exactement ?",
        en:"What exactly is collection?",
        es:"¿Qué es exactamente la reunión?",
        it:"Che cos'è esattamente il raccogliere?",
        de:"Was genau ist Versammlung?",
        ja:"収縮 と は、 正確 に は 何 です か ?" },

      { ref:"dv2-r-rassembler", temps:8, dit:"club", mots:["rassembler","engagement","avant-main","arriere-main"],
        fr:"Le cheval engage davantage ses postérieurs, fléchit ses articulations et abaisse les hanches ; son avant-main s'allège et son équilibre se reporte davantage vers l'arrière.",
        en:"The horse engages his hind legs more, flexes his joints and lowers his hindquarters; his forehand becomes lighter and his balance shifts further back.",
        es:"El caballo engancha más los posteriores, flexiona las articulaciones y baja las ancas; su tercio anterior se aligera y el equilibrio se desplaza hacia atrás.",
        it:"Il cavallo impegna di più i posteriori, flette le articolazioni e abbassa le anche; l'anteriore si alleggerisce e l'equilibrio si sposta indietro.",
        de:"Das Pferd tritt weiter unter, beugt die Gelenke und senkt die Hanken; die Vorhand wird leichter und das Gleichgewicht verlagert sich nach hinten.",
        ja:"馬 は 後肢 を より 深く 踏み込み、 関節 を 曲げ、 腰 を 下げ ます。 前躯 が 軽く なり、 重心 が 後ろ へ 移り ます。" },

      /* ---- temps 9 · équilibre et self-carriage ---- */
      { ref:"dv2-porte-tout-seul", temps:9, dit:"joueuse", mots:["legerete"], motsAilleurs:["equilibre"],
        fr:"Comment savoir s'il se porte vraiment tout seul ?",
        en:"How do I know if he's really in self-carriage?",
        es:"¿Cómo saber si se lleva realmente solo?",
        it:"Come si sa se si porta davvero da solo?",
        de:"Woran merke ich, ob er sich wirklich selbst trägt?",
        ja:"本当 に 自分 で 体 を 支え て いる か、 どう 分かり ます か ?" },

      { ref:"dv2-r-alleger-aides", temps:9, dit:"club", mots:["legerete","cadence"], motsAilleurs:["equilibre","aides"],
        fr:"Vous pouvez alléger vos aides sans qu'il perde son équilibre, son rythme ou son attitude.",
        en:"You can lighten your aids without him losing his balance, rhythm or way of going.",
        es:"Puede aligerar sus ayudas sin que pierda el equilibrio, el ritmo ni la actitud.",
        it:"Può alleggerire gli aiuti senza che perda equilibrio, ritmo o attitudine.",
        de:"Sie können die Hilfen leichter machen, ohne dass er Gleichgewicht, Takt oder Haltung verliert.",
        ja:"扶助 を 軽く し て も、 バランス も リズム も 姿勢 も 崩れ ない こと です。" },

      /* ---- temps 10 · légèreté ---- */
      { ref:"dv2-et-legerete", temps:10, dit:"joueuse", mots:["legerete"],
        fr:"Et la légèreté ?",
        en:"And what about lightness?",
        es:"¿Y la ligereza?",
        it:"E la leggerezza?",
        de:"Und die Leichtigkeit?",
        ja:"軽さ に ついて は ?" },

      { ref:"dv2-r-legerete", temps:10, dit:"club", mots:["legerete"], motsAilleurs:["aides"],
        fr:"C'est obtenir la réponse avec le moins d'effort possible, sans porter le cheval avec la main ou la jambe.",
        en:"It means getting the response with as little effort as possible, without carrying the horse with the hand or leg.",
        es:"Es obtener la respuesta con el menor esfuerzo posible, sin llevar al caballo con la mano o la pierna.",
        it:"È ottenere la risposta col minimo sforzo, senza portare il cavallo con la mano o la gamba.",
        de:"Die Antwort mit möglichst wenig Aufwand bekommen, ohne das Pferd mit Hand oder Schenkel zu tragen.",
        ja:"できる かぎり 少ない 力 で 応え を 得る こと。 手 や 脚 で 馬 を 支え て しまわ ない こと です。" },

      /* ---- temps 11 · soumission ---- */
      { ref:"dv2-soumission-obeit", temps:11, dit:"joueuse", mots:["soumission"],
        fr:"La soumission, ça veut dire qu'il obéit ?",
        en:"Does submission mean he obeys?",
        es:"¿La sumisión significa que obedece?",
        it:"La sottomissione vuol dire che obbedisce?",
        de:"Heißt Durchlässigkeit, dass er gehorcht?",
        ja:"従順 と は、 命令 に 従う と いう 意味 です か ?" },

      { ref:"dv2-r-soumission", temps:11, dit:"club", mots:["soumission","decontraction"],
        fr:"Pas au sens d'une obéissance forcée : c'est son attention, sa volonté de répondre et sa confiance, sans tension ni résistance.",
        en:"Not in the sense of forced obedience: it means his attention, willingness to respond and confidence, without tension or resistance.",
        es:"No en el sentido de una obediencia forzada: es su atención, su voluntad de responder y su confianza, sin tensión ni resistencia.",
        it:"Non nel senso di un'obbedienza forzata: è la sua attenzione, la volontà di rispondere e la fiducia, senza tensione né resistenza.",
        de:"Nicht im Sinne erzwungenen Gehorsams: es sind Aufmerksamkeit, Antwortbereitschaft und Vertrauen, ohne Spannung oder Widerstand.",
        ja:"強い られ た 服従 で は あり ませ ん。 注意 と、 応え よう と する 意思 と、 信頼 です。 緊張 も 抵抗 も なく。" },

      /* ---- temps 12 · perméabilité aux aides ---- */
      { ref:"dv2-permeable", temps:12, dit:"joueuse", mots:["permeabilite"], motsAilleurs:["aides"],
        fr:"Et quand vous dites qu'un cheval est perméable aux aides ?",
        en:"And what do you mean when you say a horse is through?",
        es:"¿Y cuando dicen que un caballo es permeable a las ayudas?",
        it:"E quando dite che un cavallo è permeabile agli aiuti?",
        de:"Und wenn Sie sagen, ein Pferd sei durchlässig?",
        ja:"馬 が 扶助 を 通す、 と 言う とき は ?" },

      { ref:"dv2-r-permeable", temps:12, dit:"club", mots:["permeabilite","arriere-main"], motsAilleurs:["aides"],
        fr:"L'aide traverse tout son corps sans rencontrer de blocage, de votre main jusqu'aux postérieurs et retour.",
        en:"The aid passes through his whole body without meeting resistance, from your hand to his hindquarters and back.",
        es:"La ayuda atraviesa todo su cuerpo sin encontrar bloqueo, desde su mano hasta los posteriores y de vuelta.",
        it:"L'aiuto attraversa tutto il corpo senza incontrare blocchi, dalla mano ai posteriori e ritorno.",
        de:"Die Hilfe geht durch den ganzen Körper, ohne auf Widerstand zu treffen, von der Hand bis zur Hinterhand und zurück.",
        ja:"扶助 が 体 の どこ で も 止まら ず に 通り抜ける こと。 手 から 後肢 へ、 そして 戻っ て くる まで。" },

      /* ---- temps 13 · tout se tient ---- */
      { ref:"dv2-toutes-liees", temps:13, dit:"joueuse", mots:["cadence","contact","rassembler"],
        fr:"Donc toutes ces qualités sont liées les unes aux autres ?",
        en:"So all these qualities are connected?",
        es:"¿Entonces todas estas cualidades están relacionadas?",
        it:"Quindi tutte queste qualità sono legate tra loro?",
        de:"Also hängen all diese Eigenschaften zusammen?",
        ja:"つまり、 これら の 質 は すべて つながっ て いる の です か ?" },

      { ref:"dv2-r-echelle", temps:13, dit:"club", mots:["cadence","decontraction","contact","impulsion","rassembler"],
        fr:"Oui. Sans rythme et décontraction, le contact se dégrade ; sans vrai contact et sans impulsion, on ne peut pas construire correctement le rassembler.",
        en:"Yes. Without rhythm and suppleness, the contact deteriorates; without true contact and impulsion, you can't correctly develop collection.",
        es:"Sí. Sin ritmo ni descontracción, el contacto se degrada; sin contacto verdadero ni impulsión, no se puede construir la reunión.",
        it:"Sì. Senza ritmo e decontrazione il contatto si degrada; senza vero contatto e impulso non si costruisce il raccogliere.",
        de:"Ja. Ohne Takt und Losgelassenheit verfällt die Anlehnung; ohne echte Anlehnung und Schwung lässt sich keine Versammlung aufbauen.",
        ja:"はい。 リズム と リラックス が なけれ ば コンタクト が 崩れ、 本当 の コンタクト と 推進力 が なけれ ば 収縮 は 組み立て られ ませ ん。" },
    ]
  }
};
