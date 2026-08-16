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
    mots:{ fr:{m:"la légèreté"}, en:{m:"lightness", p:"laïte-neuss"},
           es:{m:"la ligereza"}, it:{m:"la leggerezza"},
           de:{m:"die Leichtigkeit", p:"laïrh-tirh-kaïte"}, ja:{m:"軽さ", p:"karusa"} }, // ??
    def:{ fr:"L'idéal de l'école française : obtenir sans peser. Le mot revient dans toutes les langues, mais c'est en français qu'il est devenu une doctrine, celle de Baucher et de l'École de Versailles.",
          en:"The French school's ideal: achieving without weight. Every language has the word, but only French made it a doctrine.",
          es:"El ideal de la escuela francesa: obtener sin pesar. La palabra vuelve en todas las lenguas, pero es en francés donde se volvió una doctrina, la de Baucher y la Escuela de Versalles.",
          it:"L'ideale della scuola francese: ottenere senza pesare. La parola torna in tutte le lingue, ma è in francese che è diventata una dottrina, quella di Baucher e della Scuola di Versailles.",
          de:"Das Ideal der französischen Schule: erreichen, ohne zu lasten. Das Wort gibt es überall — aber nur im Französischen wurde es zur Doktrin, der von Baucher und der Schule von Versailles.",
          ja:"フランス派の理想 — 重さをかけずに得ること。この言葉はどの言語にもありますが、教義にまで高められたのはフランス語においてです。ボーシェとヴェルサイユ学派の教義に。" } },

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
     LE DIALOGUE DE WINDSOR — 15 août 2026, session 214.

     LA SCÈNE : un concours de dressage, de l'arrivée au protocole
     récupéré. 21 phrases, 6 temps, 9 entendues.

     🟥🟥 CE DIALOGUE A ÉTÉ LOURDEMENT CORRIGÉ PAR BLANDINE, et c'est
     le chapitre où Claude s'est le plus trompé — TROIS FAUTES DE FOND
     dans la première version, toutes dans la mécanique du concours.
     Signalé par lui-même en séance : sur ce terrain, il est moins
     fiable que sur l'écurie ou le pansage. RELIRE SÉVÈREMENT.

     CE QU'ELLE A SUPPRIMÉ, ET POURQUOI — NE PAS LES REMETTRE :
     · « Vous montez la reprise numéro trois » → 🟥 « ça veut rien
       dire ». Une reprise a un NOM DE PROTOCOLE (Amateur 1, Club 1),
       pas un numéro. Sa formulation : « Vous êtes engagée sur la
       reprise de l'Amateur 1. » Et l'horaire se dit à part : « Vous
       passez à quatorze heures dix, sur la carrière deux » — les deux
       gardées, elles ne disent pas la même chose.
     · « C'est laquelle exactement, la trois ? » → tombe avec la
       précédente.
     · « Est-ce que je peux reconnaître le rectangle à pied ? » →
       🟥 « on reconnaît pas un rectangle à pied ». La reconnaissance
       à pied, c'est le CROSS et l'OBSTACLE. En dressage on connaît le
       tracé par cœur avant d'arriver.
     · « Est-ce que je peux redemander le tracé ? » → ne veut rien
       dire non plus (faute reconnue par Claude avant qu'elle ne le
       relève). Remplacée par sa phrase : « Est-ce que je peux
       reprendre où j'en étais ? »
     · « Est-ce que ma tenue est réglementaire ? » → vague. Remplacée
       par sa règle, bien plus utile : les guêtres ET LES BANDES sont
       interdites en concours de dressage.

     SES FORMULATIONS, MEILLEURES ET POURQUOI :
     · « Est-ce que quelqu'un a le droit de me dicter la reprise ? »
       au lieu de « ai-je droit à un lecteur ? » : 🟥 LECTEUR EST UN
       MOT D'INITIÉ. Celle qui découvre ne le connaît pas — mais elle
       sait ce qu'elle veut demander. Et la question porte sur le
       DROIT, qui est le vrai doute. `lecteur` reste au lexique, il
       s'apprend en lisant.
     · « saluer LES DEUX rênes dans une main » : la formule exacte.
     · « La rectitude était bonne, mais ça manquait un peu
       d'incurvation À MAIN DROITE » : un juge commente AU PASSÉ, avec
       « un peu ». Et « à main droite » — pas « à droite » — fait
       écho à `main-droite` appris à Aberystwyth.
     · Ordre du temps 5 inversé sur sa demande : on se trompe, ON
       DEMANDE, puis le juge répond. La question ne vient pas après
       la réponse.

     🟥 LE FAUX AMI DU CHAPITRE EST EN JEU : « la reprise » = le TEST
     ici (`reprise-test`, en anglais *the test*) et le GROUPE d'élèves
     à Aberystwyth (`toute-reprise`, *the ride*). Les deux villes se
     suivent dans le voyage — c'est voulu.

     LAISSÉS AU LEXIQUE SEUL : piaffer, passage, pirouette, changement
     de pied, kür, classement. Ce sont les niveaux hauts, on les lit
     sans les jouer à ce stade.

     `dit` : "joueuse" = elle produit · "club" = l'organisation ou le
     juge, elle entend et comprend.
  ================================================================== */
  dialogue: {
    ville: "windsor", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive sur le concours ---- */
      { ref:"d-r-engagee-amateur", temps:1, dit:"club", mots:["reprise-test"],
        fr:"Vous êtes engagée sur la reprise de l'Amateur 1.",
        en:"You're entered for the Amateur 1 test.",
        es:"Está inscrita en la prueba de Amateur 1.",
        it:"È iscritta alla ripresa di Amatori 1.",
        de:"Sie sind für die Aufgabe Amateur 1 genannt.",
        ja:"アマチュア 1 の 課目 に エントリー さ れ て い ます。" },

      { ref:"d-r-passage-carriere", temps:1, dit:"club", mots:[],
        fr:"Vous passez à quatorze heures dix, sur la carrière deux.",
        en:"You're on at ten past two, in arena two.",
        es:"Pasa a las dos y diez, en la pista dos.",
        it:"Passa alle quattordici e dieci, sul campo due.",
        de:"Sie starten um vierzehn Uhr zehn, auf Viereck zwei.",
        ja:"十四時 十分、 第二 馬場 で 出番 です。" },

      /* 🟥 Formulation de Blandine : pas le mot d'initié « lecteur ». */
      { ref:"d-dicter-reprise", temps:1, dit:"joueuse", mots:["reprise-test"], motsAilleurs:["lecteur"],
        fr:"Est-ce que quelqu'un a le droit de me dicter la reprise ?",
        en:"Is someone allowed to read the test for me?",
        es:"¿Alguien tiene derecho a dictarme la prueba?",
        it:"Qualcuno può leggermi la ripresa?",
        de:"Darf mir jemand die Aufgabe ansagen?",
        ja:"課目 を 読み上げ て もらっ て も いい です か ?" },

      /* ---- temps 2 · avant d'entrer ---- */
      /* 🟥 Règle de Blandine, à la place d'une question vague sur la
         tenue. LES BANDES AUSSI — elle les a ajoutées. Le mot revient
         de Walsall (`bandes`). */
      { ref:"d-r-guetres-interdites", temps:2, dit:"club", mots:[],
        fr:"Attention, les guêtres et les bandes sont interdites en concours de dressage.",
        en:"Careful — boots and bandages aren't allowed in a dressage test.",
        es:"Ojo, las protecciones y las vendas están prohibidas en concurso de doma.",
        it:"Attenzione, paracolpi e fasce sono vietati in gara di dressage.",
        de:"Achtung, Gamaschen und Bandagen sind in der Dressurprüfung verboten.",
        ja:"注意 — 馬場 競技 で は プロテクター と バンテージ は 禁止 です。" },

      { ref:"d-r-cloche-45s", temps:2, dit:"club", mots:["cloche-juge","entree"],
        fr:"La cloche du juge : vous avez quarante-cinq secondes pour entrer.",
        en:"That's the bell — you have forty-five seconds to enter.",
        es:"La campana del juez: tiene cuarenta y cinco segundos para entrar.",
        it:"La campana del giudice: ha quarantacinque secondi per entrare.",
        de:"Die Glocke: Sie haben fünfundvierzig Sekunden bis zum Eintritt.",
        ja:"合図 の 鐘 です。 四十五 秒 以内 に 入場 し て ください。" },

      { ref:"d-entree-en-a", temps:2, dit:"joueuse", mots:["entree","lettre"],
        fr:"On entre en A, c'est bien ça ?",
        en:"We come in at A, don't we?",
        es:"Se entra por A, ¿verdad?",
        it:"Si entra in A, giusto?",
        de:"Man reitet bei A ein, richtig?",
        ja:"A から 入場 です よ ね ?" },

      { ref:"d-r-entree-salut-x", temps:2, dit:"club", mots:["entree","salut","lettre"],
        fr:"Entrée en A au trot de travail, salut en X.",
        en:"Enter at A in working trot, halt and salute at X.",
        es:"Entrada en A al trote de trabajo, saludo en X.",
        it:"Entrata in A al trotto di lavoro, saluto in X.",
        de:"Einritt bei A im Arbeitstrab, Halten und Grüßen bei X.",
        ja:"A から 作業速歩 で 入場、 X で 停止 敬礼。" },

      /* Formulation de Blandine : « LES DEUX rênes ». */
      { ref:"d-saluer-deux-renes", temps:2, dit:"joueuse", mots:["salut"],
        fr:"Est-ce qu'il faut saluer les deux rênes dans une main ?",
        en:"Do I have to salute with both reins in one hand?",
        es:"¿Hay que saludar con las dos riendas en una mano?",
        it:"Bisogna salutare con entrambe le redini in una mano?",
        de:"Muss man mit beiden Zügeln in einer Hand grüßen?",
        ja:"手綱 を 片手 に まとめ て 敬礼 し ます か ?" },

      /* ---- temps 3 · ce que la reprise demande ---- */
      { ref:"d-cession-dans-reprise", temps:3, dit:"joueuse", mots:["cession-jambe","reprise-test"],
        fr:"Il y a une cession à la jambe dans cette reprise ?",
        en:"Is there a leg-yield in this test?",
        es:"¿Hay una cesión a la pierna en esta prueba?",
        it:"C'è una cessione alla gamba in questa ripresa?",
        de:"Kommt in dieser Aufgabe ein Schenkelweichen vor?",
        ja:"この 課目 に 脚に譲る 運動 は あり ます か ?" },

      { ref:"d-r-epaule-appuyer", temps:3, dit:"club", mots:["epaule-dedans","appuyer","grand-cote"],
        fr:"Épaule en dedans sur le grand côté, puis appuyer vers B.",
        en:"Shoulder-in down the long side, then half-pass to B.",
        es:"Espalda adentro por el lado largo, luego apoyada hacia B.",
        it:"Spalla in dentro sul lato lungo, poi appoggiata verso B.",
        de:"Schulterherein auf der langen Seite, dann Traversale nach B.",
        ja:"長蹄 で ショルダーイン、 その あと B へ ハーフパス。" },

      { ref:"d-contre-galop-niveau", temps:3, dit:"joueuse", mots:["contre-galop"],
        fr:"Le contre-galop, c'est demandé à quel niveau ?",
        en:"At what level do they ask for counter-canter?",
        es:"¿A qué nivel se pide el galope a la contra?",
        it:"A che livello si chiede il galoppo rovesciato?",
        de:"Ab welcher Klasse wird Konter-Galopp verlangt?",
        ja:"反対駈歩 は どの 級 から 求め られ ます か ?" },

      { ref:"d-reculer-reprise", temps:3, dit:"joueuse", mots:["reculer","reprise-test"],
        fr:"Est-ce qu'on recule sur cette reprise ?",
        en:"Is there a rein-back in this test?",
        es:"¿Hay paso atrás en esta prueba?",
        it:"C'è l'indietreggiare in questa ripresa?",
        de:"Wird in dieser Aufgabe rückwärts gerichtet?",
        ja:"この 課目 に 後退 は あり ます か ?" },

      /* ---- temps 4 · ce que le juge regarde ---- */
      /* Récrit AU PASSÉ sur le modèle de la phrase de Blandine
         ci-dessous : un juge commente ce qui vient d'être fait. */
      { ref:"d-r-decontraction-contact", temps:4, dit:"club", mots:["decontraction","contact"],
        fr:"Le cheval manquait un peu de décontraction, le contact n'était pas stable.",
        en:"The horse lacked a little suppleness, and the contact wasn't steady.",
        es:"Al caballo le faltaba algo de relajación y el contacto no era estable.",
        it:"Al cavallo mancava un po' di decontrazione e il contatto non era stabile.",
        de:"Dem Pferd fehlte etwas Losgelassenheit, die Anlehnung war nicht konstant.",
        ja:"馬 の リラックス が やや 足り ず、 ハミ受け が 安定 し て い ませ ん でし た。" },

      { ref:"d-ameliorer-impulsion", temps:4, dit:"joueuse", mots:["impulsion"],
        fr:"Qu'est-ce que je peux améliorer sur l'impulsion ?",
        en:"What can I improve on the impulsion?",
        es:"¿Qué puedo mejorar en la impulsión?",
        it:"Che cosa posso migliorare sull'impulso?",
        de:"Was kann ich beim Schwung verbessern?",
        ja:"推進 に ついて 何 を 直せ ば いい です か ?" },

      /* 🟥 Phrase de Blandine, mot pour mot. Un juge parle au passé,
         avec « un peu », et dit « À MAIN DROITE » — pas « à droite ». */
      { ref:"d-r-rectitude-incurvation", temps:4, dit:"club", mots:["rectitude","incurvation"],
        fr:"La rectitude était bonne, mais ça manquait un peu d'incurvation à main droite.",
        en:"Straightness was good, but it needed a little more bend on the right rein.",
        es:"La rectitud era buena, pero faltaba algo de incurvación a mano derecha.",
        it:"La rettitudine era buona, ma mancava un po' d'incurvamento a mano destra.",
        de:"Die Geraderichtung war gut, aber auf der rechten Hand fehlte etwas Biegung.",
        ja:"直進性 は 良かっ た です が、 右手前 の 屈曲 が 少し 足り ませ ん でし た。" },

      /* ---- temps 5 · l'erreur (ordre inversé sur sa demande) ---- */
      { ref:"d-trompee-parcours", temps:5, dit:"joueuse", mots:["erreur-parcours"],
        fr:"Je me suis trompée de parcours.",
        en:"I went wrong in the test.",
        es:"Me he equivocado de recorrido.",
        it:"Ho sbagliato percorso.",
        de:"Ich habe einen Bahnfehler gemacht.",
        ja:"コース を 間違え まし た。" },

      /* Formulation de Blandine, à la place d'un « redemander le
         tracé » qui ne voulait rien dire. */
      { ref:"d-reprendre-ou-jen-etais", temps:5, dit:"joueuse", mots:[],
        fr:"Est-ce que je peux reprendre où j'en étais ?",
        en:"Can I pick up where I left off?",
        es:"¿Puedo retomar donde lo dejé?",
        it:"Posso riprendere da dove ero rimasta?",
        de:"Kann ich dort weitermachen, wo ich aufgehört habe?",
        ja:"止まっ た ところ から 続け て も いい です か ?" },

      { ref:"d-r-deux-points-en-c", temps:5, dit:"club", mots:["erreur-parcours","lettre"],
        fr:"Erreur de parcours, deux points en moins : reprenez en C.",
        en:"Error of course, two marks off — start again from C.",
        es:"Error de recorrido, dos puntos menos: retome en C.",
        it:"Errore di percorso, due punti in meno: riprenda da C.",
        de:"Bahnfehler, zwei Punkte Abzug: nehmen Sie bei C wieder auf.",
        ja:"コース違い、 二点 減点 です。 C から 再開 し て ください。" },

      /* ---- temps 6 · après ---- */
      { ref:"d-recuperer-protocole", temps:6, dit:"joueuse", mots:["protocole"],
        fr:"Où est-ce que je récupère mon protocole ?",
        en:"Where do I collect my test sheet?",
        es:"¿Dónde recojo mi hoja de puntuación?",
        it:"Dove ritiro il mio foglio di giudizio?",
        de:"Wo bekomme ich mein Protokoll?",
        ja:"採点表 は どこ で 受け取れ ます か ?" },

      { ref:"d-r-controle-embouchures", temps:6, dit:"club", mots:["controle-embouchures"],
        fr:"Contrôle des embouchures à la sortie, ne descendez pas.",
        en:"Tack check on the way out — stay mounted.",
        es:"Control de embocaduras a la salida, no desmonte.",
        it:"Controllo delle imboccature all'uscita, non smonti.",
        de:"Ausrüstungskontrolle am Ausgang, bitte aufsitzen bleiben.",
        ja:"出口 で 馬具 検査 が あり ます。 下馬 し ない で ください。" },

      { ref:"d-combien-pourcentage", temps:6, dit:"joueuse", mots:["pourcentage"],
        fr:"J'ai fait combien en pourcentage ?",
        en:"What percentage did I get?",
        es:"¿Qué porcentaje he sacado?",
        it:"Che percentuale ho fatto?",
        de:"Wie viel Prozent habe ich bekommen?",
        ja:"得点率 は 何 パーセント でし た か ?" }
    ]
  },
  /* ==================================================================
     LE DIALOGUE DE VERSAILLES — 16 août 2026, session 214.
     ⚠️ CE FICHIER PORTE DEUX DIALOGUES. `dialogue` = WINDSOR (le
     concours). `dialogueVersailles` = VERSAILLES (l'art équestre).
     C'est voulu : le fichier contenait déjà les deux matières, séparées
     par leçon. NE PAS fusionner les deux dialogues.

     LA SCÈNE : une leçon à l'Académie équestre, dans la Grande Écurie
     du Roi. 🟥 SEUL DIALOGUE OÙ L'ON NE DEMANDE RIEN DE PRATIQUE — ni
     horaire, ni réservation, ni matériel. On pose des questions sur des
     NOTIONS et on reçoit des réponses qui font SENTIR. C'est ce que le
     code disait déjà de Saumur : « le chapitre porte sur des notions
     (timing, ressenti), pas sur des objets à nommer. On y parle. »

     🟥 CE QUE BLANDINE A FAIT RETIRER : « combien de temps il faut pour
     arriver là ? », « des années, et on ne finit jamais », « est-ce que
     je peux revenir voir ? » — « on s'en fout ». De la philosophie, pas
     de la langue. Remplacé par LES FIGURES, à sa demande.
     NE PAS remettre les phrases philosophiques.

     🟥 « CHAQUE NOTION DOIT AVOIR UNE PHRASE » — sa règle. Les DIX mots
     de la leçon 3 sont tous employés.

     ⚠️ LES TROIS DÉFINITIONS OFFICIELLES, demandées par elle :
     · RASSEMBLER — elle a REFUSÉ la version courte (« le report du poids
       sur l'arrière-main ») : « garde celle plus complète avec
       l'abaissement des hanches c'est indispensable ». Sans les hanches
       on ne dit pas COMMENT le poids passe derrière. NE PAS raccourcir.
     · SOUMISSION — ce n'est PAS l'obéissance : attention et confiance,
       acceptation sans tension ni résistance. C'est ainsi que le
       protocole la note.
     · PERMÉABILITÉ — laisser passer l'aide À TRAVERS le corps.
       Allemand : Durchlässigkeit, « laisser-passer ». Anglais :
       throughness.

     ⚠️ LES FIGURES SONT EN LEÇON 2, DONC CHEZ WINDSOR — choix B de
     Blandine : Versailles les emploie sans les posséder, pour ne rien
     retirer à Windsor. Le voyage passe par Windsor AVANT Versailles.
     `tete-au-mur` ajoutée le même jour (seule des cinq qui manquait).

     `dit` : "joueuse" = elle produit · "club" = l'écuyère qui enseigne.
  ================================================================== */
  dialogueVersailles: {
    ville: "versailles", lecon: 3, temps: 6, langues: ["fr","en","es","it","de","ja"],

    phrases: [

      { ref:"dv-assister-reprise", temps:1, dit:"joueuse", mots:[],
        fr:"Est-ce qu'on peut assister à la reprise ?",
        en:"Can we watch the lesson?",
        es:"¿Se puede asistir a la clase?",
        it:"Si può assistere alla ripresa?",
        de:"Kann man bei der Stunde zuschauen?",
        ja:"稽古 を 見学 でき ます か ?" },

      { ref:"dv-r-en-silence", temps:1, dit:"club", mots:[],
        fr:"On travaille en silence, vous vous asseyez où vous voulez.",
        en:"We work in silence — sit wherever you like.",
        es:"Trabajamos en silencio, siéntese donde quiera.",
        it:"Si lavora in silenzio, si sieda dove vuole.",
        de:"Wir arbeiten in Stille, setzen Sie sich, wohin Sie möchten.",
        ja:"静か に 稽古 し ます。 どこ に 座っ て も 構い ませ ん。" },

      { ref:"dv-r-ecoutez-cadence", temps:2, dit:"club", mots:["cadence"],
        fr:"Écoutez la cadence : c'est elle qui doit rester la même, pas la vitesse.",
        en:"Listen to the rhythm — that's what has to stay the same, not the speed.",
        es:"Escuche la cadencia: es ella la que debe quedar igual, no la velocidad.",
        it:"Ascolti la cadenza: è lei che deve restare uguale, non la velocità.",
        de:"Hören Sie auf den Takt — er muss gleich bleiben, nicht das Tempo.",
        ja:"リズム を 聴い て ください。 同じ に 保つ の は リズム で あっ て、 速さ で は あり ませ ん。" },

      { ref:"dv-trop-vite", temps:2, dit:"joueuse", mots:["cadence"],
        fr:"Est-ce que je vais trop vite ?",
        en:"Am I going too fast?",
        es:"¿Voy demasiado rápido?",
        it:"Sto andando troppo veloce?",
        de:"Reite ich zu schnell?",
        ja:"速 すぎ ます か ?" },

      { ref:"dv-r-pas-decontracte", temps:2, dit:"club", mots:["decontraction"],
        fr:"Vous allez vite parce qu'il n'est pas décontracté. Ralentissez dans votre tête d'abord.",
        en:"You're fast because he isn't relaxed. Slow down in your own head first.",
        es:"Va rápido porque él no está relajado. Frene primero en su cabeza.",
        it:"Va veloce perché lui non è decontratto. Rallenti prima nella sua testa.",
        de:"Sie sind schnell, weil er nicht losgelassen ist. Werden Sie erst im Kopf langsamer.",
        ja:"馬 が リラックス し て い ない から 速い の です。 まず 自分 の 頭 の 中 で ゆっくり に し て ください。" },

      { ref:"dv-impression-tirer", temps:3, dit:"joueuse", mots:["contact"],
        fr:"J'ai l'impression de tirer.",
        en:"I feel like I'm pulling.",
        es:"Tengo la impresión de tirar.",
        it:"Ho l'impressione di tirare.",
        de:"Ich habe das Gefühl, dass ich ziehe.",
        ja:"引っ張っ て いる 気 が し ます。" },

      { ref:"dv-r-il-vient-chercher", temps:3, dit:"club", mots:["contact"],
        fr:"Le contact, c'est lui qui vient le chercher — vous, vous le tenez, vous ne le prenez pas.",
        en:"He's the one who goes looking for the contact — you hold it, you don't take it.",
        es:"El contacto es él quien lo busca: usted lo sostiene, no lo toma.",
        it:"Il contatto è lui che lo cerca: lei lo tiene, non lo prende.",
        de:"Die Anlehnung sucht er — Sie halten sie, Sie nehmen sie nicht.",
        ja:"ハミ受け は 馬 の ほう から 求め て くる もの です。 あなた は 保つ だけ で、 取り に いく の で は あり ませ ん。" },

      { ref:"dv-r-impulsion-pas-vitesse", temps:4, dit:"club", mots:["impulsion"],
        fr:"L'impulsion, ce n'est pas la vitesse. C'est l'envie d'aller en avant.",
        en:"Impulsion isn't speed. It's the wish to go forward.",
        es:"La impulsión no es la velocidad. Es el deseo de ir hacia adelante.",
        it:"L'impulso non è la velocità. È la voglia di andare avanti.",
        de:"Schwung ist nicht Tempo. Es ist der Wille, vorwärts zu gehen.",
        ja:"推進 は 速さ で は あり ませ ん。 前 に 出 たい と いう 気持ち です。" },

      { ref:"dv-comment-savoir-impulsion", temps:4, dit:"joueuse", mots:["impulsion"],
        fr:"Comment je sais qu'il a de l'impulsion ?",
        en:"How do I know he has impulsion?",
        es:"¿Cómo sé que tiene impulsión?",
        it:"Come faccio a sapere se ha impulso?",
        de:"Woran merke ich, dass er Schwung hat?",
        ja:"推進 が ある か どう か、 どう やって わかり ます か ?" },

      { ref:"dv-r-ferme-la-jambe", temps:4, dit:"club", mots:["impulsion"],
        fr:"Quand vous fermez la jambe et qu'il répond sans que vous ayez à insister.",
        en:"When you close your leg and he answers without you having to insist.",
        es:"Cuando cierra la pierna y responde sin que tenga que insistir.",
        it:"Quando chiude la gamba e lui risponde senza che debba insistere.",
        de:"Wenn Sie den Schenkel schließen und er antwortet, ohne dass Sie nachfassen müssen.",
        ja:"脚 を 使っ た とき、 念 を 押さ なく て も 反応 する とき です。" },

      { ref:"dv-permeabilite", temps:4, dit:"joueuse", mots:["permeabilite"],
        fr:"Et la perméabilité ?",
        en:"And throughness?",
        es:"¿Y la permeabilidad?",
        it:"E la permeabilità?",
        de:"Und die Durchlässigkeit?",
        ja:"透過性 と は 何 です か ?" },

      { ref:"dv-r-aide-traverse", temps:4, dit:"club", mots:["permeabilite"],
        fr:"Que l'aide passe à travers lui sans qu'il la bloque. De la main jusqu'aux postérieurs, et retour.",
        en:"That the aid goes through him without being blocked — from your hand to his hind legs, and back.",
        es:"Que la ayuda lo atraviese sin que la bloquee: de la mano a los posteriores, y de vuelta.",
        it:"Che l'aiuto lo attraversi senza che lui lo blocchi: dalla mano ai posteriori, e ritorno.",
        de:"Dass die Hilfe durch ihn hindurchgeht, ohne blockiert zu werden — von der Hand bis zur Hinterhand und zurück.",
        ja:"扶助 が 馬 の 体 を 通り抜け、 止め られ ない こと。 手 から 後肢 まで、 そして 戻っ て くる まで。" },

      { ref:"dv-legerete-cest-quoi", temps:5, dit:"joueuse", mots:["legerete"],
        fr:"Qu'est-ce que ça veut dire, la légèreté ?",
        en:"What does lightness actually mean?",
        es:"¿Qué quiere decir la ligereza?",
        it:"Che cosa vuol dire la leggerezza?",
        de:"Was bedeutet Leichtigkeit eigentlich?",
        ja:"軽さ と は どう いう こと です か ?" },

      { ref:"dv-r-tout-lacher", temps:5, dit:"club", mots:["legerete"],
        fr:"Que vous pourriez tout lâcher, et qu'il continuerait pareil.",
        en:"That you could let everything go, and he'd carry on just the same.",
        es:"Que podría soltarlo todo y él seguiría igual.",
        it:"Che potrebbe lasciare tutto, e lui continuerebbe uguale.",
        de:"Dass Sie alles loslassen könnten und er genauso weiterginge.",
        ja:"すべて を 手放し て も、 馬 が そのまま 続け られる、 と いう こと です。" },

      { ref:"dv-il-est-droit", temps:5, dit:"joueuse", mots:["rectitude"],
        fr:"Il est droit, là ?",
        en:"Is he straight now?",
        es:"¿Está derecho ahora?",
        it:"È dritto, adesso?",
        de:"Ist er jetzt gerade?",
        ja:"今、 まっすぐ です か ?" },

      { ref:"dv-r-pousse-a-gauche", temps:5, dit:"club", mots:["rectitude","incurvation"],
        fr:"Presque. Il pousse un peu plus à gauche, vous le sentez ?",
        en:"Almost. He's pushing a little more to the left — can you feel it?",
        es:"Casi. Empuja un poco más a la izquierda, ¿lo siente?",
        it:"Quasi. Spinge un po' di più a sinistra, lo sente?",
        de:"Fast. Er schiebt etwas mehr nach links — spüren Sie das?",
        ja:"ほぼ。 左 に 少し 押し て い ます。 感じ ます か ?" },

      { ref:"dv-rassembler-cest-quoi", temps:5, dit:"joueuse", mots:["rassembler"],
        fr:"Le rassembler, c'est quoi exactement ?",
        en:"What exactly is collection?",
        es:"¿Qué es exactamente la reunión?",
        it:"Che cos'è esattamente il raccogliere?",
        de:"Was genau ist Versammlung?",
        ja:"収縮 と は 具体的 に 何 です か ?" },

      { ref:"dv-r-def-rassembler", temps:5, dit:"club", mots:["rassembler","impulsion"],
        fr:"Il engage plus ses postérieurs, il abaisse les hanches, et son avant-main s'allège. Il devient plus court et plus haut — mais jamais plus lent.",
        en:"He engages his hind legs more, lowers his haunches, and his forehand lightens. He becomes shorter and taller — but never slower.",
        es:"Engancha más los posteriores, baja las ancas y su tercio anterior se aligera. Se hace más corto y más alto, pero nunca más lento.",
        it:"Impegna di più i posteriori, abbassa le anche e l'avantreno si alleggerisce. Diventa più corto e più alto — ma mai più lento.",
        de:"Er tritt mehr unter, senkt die Hanken, und die Vorhand wird leichter. Er wird kürzer und höher — aber nie langsamer.",
        ja:"後肢 を より 深く 踏み込み、 腰 を 下げ、 前躯 が 軽く なり ます。 短く 高く なり ます が、 遅く は なり ませ ん。" },

      { ref:"dv-soumission-obeit", temps:5, dit:"joueuse", mots:["soumission"],
        fr:"La soumission, ça veut dire qu'il obéit ?",
        en:"Does submission mean he obeys?",
        es:"¿La sumisión quiere decir que obedece?",
        it:"La sottomissione vuol dire che obbedisce?",
        de:"Heißt Gehorsam, dass er folgt?",
        ja:"従順 と は、 命令 に 従う と いう こと です か ?" },

      { ref:"dv-r-def-soumission", temps:5, dit:"club", mots:["soumission","decontraction"],
        fr:"Non : qu'il accepte. Attention et confiance, sans tension ni résistance. Un cheval qui obéit contraint n'est pas soumis.",
        en:"No — that he accepts. Attention and confidence, without tension or resistance. A horse who obeys under duress isn't submissive.",
        es:"No: que acepta. Atención y confianza, sin tensión ni resistencia. Un caballo que obedece forzado no es sumiso.",
        it:"No: che accetta. Attenzione e fiducia, senza tensione né resistenza. Un cavallo che obbedisce costretto non è sottomesso.",
        de:"Nein — dass er annimmt. Aufmerksamkeit und Vertrauen, ohne Spannung oder Widerstand. Ein Pferd, das gezwungen folgt, ist nicht gehorsam.",
        ja:"いいえ、 受け入れる と いう こと です。 緊張 も 抵抗 も なく、 注意 と 信頼 が ある 状態。 強い られ て 従う 馬 は 従順 で は あり ませ ん。" },

      { ref:"dv-commence-cession", temps:6, dit:"joueuse", mots:[], motsAilleurs:["cession-jambe"],
        fr:"On commence par la cession à la jambe ?",
        en:"Do we start with leg-yield?",
        es:"¿Empezamos por la cesión a la pierna?",
        it:"Cominciamo con la cessione alla gamba?",
        de:"Fangen wir mit Schenkelweichen an?",
        ja:"脚に譲る 運動 から 始め ます か ?" },

      { ref:"dv-r-cession-puis-epaule", temps:6, dit:"club", mots:["rectitude"], motsAilleurs:["cession-jambe","epaule-dedans"],
        fr:"Cession d'abord, puis épaule en dedans quand il sera droit.",
        en:"Leg-yield first, then shoulder-in once he's straight.",
        es:"Primero cesión, después espalda adentro cuando esté derecho.",
        it:"Prima cessione, poi spalla in dentro quando sarà dritto.",
        de:"Erst Schenkelweichen, dann Schulterherein, wenn er gerade ist.",
        ja:"まず 脚に譲る 運動、 まっすぐ に なっ たら ショルダーイン です。" },

      { ref:"dv-appuyer-pareil", temps:6, dit:"joueuse", mots:[], motsAilleurs:["appuyer","cession-jambe"],
        fr:"Est-ce que l'appuyer se demande de la même façon ?",
        en:"Is half-pass asked for in the same way?",
        es:"¿La apoyada se pide de la misma manera?",
        it:"L'appoggiata si chiede allo stesso modo?",
        de:"Verlangt man die Traversale genauso?",
        ja:"ハーフパス も 同じ よう に 求め ます か ?" },

      /* 🟥 CORRIGÉ PAR BLANDINE le 16/08. La première version disait
         « dans la cession il regarde ailleurs » — vague et faux. La
         vraie différence est LE PLI : l'appuyer est incurvé VERS le
         déplacement, la cession CONTRE, du côté de la jambe qui pousse.
         NE PAS revenir à une formulation sur la direction du regard
         seule. */
      { ref:"dv-r-regarde-ou-il-va", temps:6, dit:"club", mots:["incurvation"], motsAilleurs:["appuyer","cession-jambe"],
        fr:"Non : dans l'appuyer il regarde dans la direction où il va. Dans la cession, il conserve son pli du côté de l'incurvation.",
        en:"No — in half-pass he looks in the direction he's travelling. In leg-yield he keeps his flexion to the side he's bending from.",
        es:"No: en la apoyada mira hacia donde va. En la cesión conserva su pliegue del lado de la incurvación.",
        it:"No: nell'appoggiata guarda dove va. Nella cessione conserva la piega dal lato dell'incurvamento.",
        de:"Nein — in der Traversale schaut er in die Bewegungsrichtung. Im Schenkelweichen behält er die Stellung zur Seite der Biegung.",
        ja:"いいえ。 ハーフパス で は 進む 方向 を 見 ます。 脚に譲る 運動 で は、 屈曲 し て いる 側 の 頭頸 の 向き を 保ち ます。" },

      { ref:"dv-tete-au-mur-inverse", temps:6, dit:"joueuse", mots:[], motsAilleurs:["tete-au-mur","epaule-dedans"],
        fr:"La tête au mur, c'est l'inverse de l'épaule en dedans ?",
        en:"Is travers the opposite of shoulder-in?",
        es:"¿La grupa adentro es lo contrario de la espalda adentro?",
        it:"Il travers è il contrario della spalla in dentro?",
        de:"Ist das Traversale das Gegenteil vom Schulterherein?",
        ja:"トラバース は ショルダーイン の 逆 です か ?" },

      { ref:"dv-r-hanches-interieur", temps:6, dit:"club", mots:["incurvation"], motsAilleurs:["tete-au-mur","epaule-dedans"],
        fr:"Oui, les hanches à l'intérieur au lieu des épaules.",
        en:"Yes — the hips come in instead of the shoulders.",
        es:"Sí, la grupa adentro en lugar de las espaldas.",
        it:"Sì, le anche all'interno invece delle spalle.",
        de:"Ja, die Hanken kommen herein statt der Schultern.",
        ja:"はい。 肩 の 代わり に 腰 が 内側 に 入り ます。" }
    ]
  }
};
