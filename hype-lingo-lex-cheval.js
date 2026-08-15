/* hype-lingo-lex-cheval.js — Hype Lingo · Chapitre 3 · « Le cheval »
   ==================================================================
   42 CONCEPTS UNIVERSELS + UN BLOC `races` PROPRE AU VOYAGE.

   ⚠️ C'EST LE SEUL CHAPITRE DONT UNE PARTIE CHANGE SELON LE PAYS.
   La réponse retenue : on ne duplique pas le chapitre par pays.
     · `concepts` — les 42 concepts (robes, marques, morphologie, âge,
       sexe, caractère). Identiques partout, écrits une seule fois.
     · `races`    — la liste des races, indexée par voyage (`voyage`).
       Pour le Portugal on ajoutera une clé "pt" avec le lusitanien,
       pour les États-Unis une clé "us" avec le quarter horse. Le noyau
       ne bouge pas d'une ligne.
   Le moteur concatène `concepts` + `races[voyageCourant]`.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit` ici
   (ce ne sont pas des ordres criés).

   PAS DE DOUBLON avec le chapitre 2 · Le pansage, qui possède déjà
   poil, crinière, toupet, queue, sabot, sole, fourchette, membres,
   dos et encolure. Ce chapitre-ci prend le reste de la morphologie.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'anglais mesure en HANDS, l'Europe en centimètres au garrot.
     · « the breed », jamais « the race » — race = la course en anglais.
     · l'anglais a trois mots pour un poulain : foal, colt, filly.
     · piebald ≠ skewbald : aucune autre langue ne fait cette différence.
     · l'allemand nomme les robes par des noms, pas des adjectifs :
       der Rappe, der Fuchs, der Brauner, der Schimmel.
     · le japonais appelle le noir « poil bleu » (青毛) et la liste
       « étoile filante » (流星).

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Les entrées marquées // ?? sont
   reportées dans hype-lingo-doutes-a-verifier.md. Les robes et les
   marques sont le vocabulaire le plus normé du module (passeports,
   stud-books) : un natif tranchera en cinq minutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.cheval = {
  ref: "cheval",
  chapitre: 3,
  titre: { fr:"Le cheval", en:"The horse", es:"El caballo", it:"Il cavallo", de:"Das Pferd", ja:"馬" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LES ROBES ============ */

  { ref:"robe", lecon:1, coll:"robes",
    mots:{ fr:{m:"la robe"}, en:{m:"the colour", p:"ko-leur", var:"coat colour"},
           es:{m:"la capa", var:"el pelo"}, it:{m:"il mantello"},
           de:{m:"die Fellfarbe", p:"fèll-far-be"}, ja:{m:"毛色", p:"keshoku"} },
    def:{ fr:"La couleur du cheval : le premier mot d'un passeport ou d'une annonce. ⚠️ En anglais on ne demande jamais « what robe » mais « what colour is he ? ».",
          en:"The horse's colour, the first line of any passport or advert. French says « robe », a word English simply does not use here.",
          es:"El color del caballo: la primera palabra de un pasaporte o de un anuncio. ⚠️ En inglés nunca se pregunta « what robe » sino « what colour is he ? ».",
          it:"Il colore del cavallo: la prima parola di un passaporto o di un annuncio. ⚠️ In inglese non si chiede mai « what robe » ma « what colour is he ? ».",
          de:"Die Farbe des Pferdes: das erste Wort in Pass und Anzeige. ⚠️ Auf Englisch fragt man nie « what robe », sondern « what colour is he ? ».",
          ja:"馬の毛色。パスポートにも売買広告にも、最初に書かれる言葉です。⚠️ 英語では « what robe » とは決して聞かず、« what colour is he ? » と尋ねます。" } },

  { ref:"bai", lecon:1, coll:"robes",
    mots:{ fr:{m:"le bai"}, en:{m:"bay", p:"béï"},
           es:{m:"castaño"}, it:{m:"baio"},
           de:{m:"der Brauner", p:"brao-neur"}, ja:{m:"鹿毛", p:"kage"} },
    def:{ fr:"Corps brun-rouge, crins et bas des membres noirs. La robe la plus répandue au monde. ⚠️ L'allemand la nomme par un nom, der Brauner, là où le français emploie un adjectif.",
          en:"Red-brown body with black mane, tail and legs — the commonest colour in the world. German uses a noun for it: der Brauner.",
          es:"Cuerpo castaño rojizo, crines y parte baja de las extremidades negras. La capa más extendida del mundo. ⚠️ El alemán la nombra con un sustantivo, der Brauner, donde el francés usa un adjetivo.",
          it:"Corpo bruno-rossastro, crini e parte bassa degli arti neri. Il mantello più diffuso al mondo. ⚠️ Il tedesco lo chiama con un nome, der Brauner, dove il francese usa un aggettivo.",
          de:"Rotbrauner Körper, schwarzes Langhaar und schwarze Beine. Die häufigste Farbe der Welt. ⚠️ Das Deutsche sagt der Braune — ein Substantiv, wo das Französische ein Adjektiv hat.",
          ja:"体は赤みがかった褐色、たてがみと脚の下部は黒。世界で最も多い毛色です。⚠️ ドイツ語では形容詞ではなく名詞で der Brauner と呼びます。" } },

  { ref:"alezan", lecon:1, coll:"robes",
    mots:{ fr:{m:"l'alezan"}, en:{m:"chestnut", p:"tchèss-neut", var:"sorrel (US)"},
           es:{m:"alazán"}, it:{m:"sauro"},
           de:{m:"der Fuchs", p:"foukss"}, ja:{m:"栗毛", p:"kurige"} },
    def:{ fr:"Robe rousse uniforme, crins de la même teinte ou plus clairs. L'allemand dit « le renard », le japonais « poil de châtaigne ». Apy, la mascotte de Hype Baby, est alezan.",
          en:"A uniform red coat with mane and tail the same shade or lighter. German calls it « the fox », Japanese « chestnut hair ».",
          es:"Capa rojiza uniforme, crines del mismo tono o más claros. El alemán dice « el zorro », el japonés « pelo de castaña ». Apy, la mascota de Hype Baby, es alazán.",
          it:"Mantello rossiccio uniforme, crini della stessa tinta o più chiari. Il tedesco dice « la volpe », il giapponese « pelo di castagna ». Apy, la mascotte di Hype Baby, è sauro.",
          de:"Einheitlich rotes Fell, Langhaar gleichfarbig oder heller. Das Deutsche sagt der Fuchs, das Japanische « Kastanienhaar ». Apy, das Maskottchen von Hype Baby, ist ein Fuchs.",
          ja:"赤茶の毛が全身に均一で、たてがみは同色かやや明るい色。ドイツ語では「狐」、日本語では「栗毛」。Hype Babyのマスコット、アピーも栗毛です。" } },

  { ref:"noir", lecon:1, coll:"robes",
    mots:{ fr:{m:"le noir"}, en:{m:"black", p:"blak"},
           es:{m:"negro"}, it:{m:"morello"},
           de:{m:"der Rappe", p:"ra-pe"}, ja:{m:"青毛", p:"aoge"} },
    def:{ fr:"Noir jusqu'aux extrémités, sans reflet roux. ⚠️ Le japonais l'appelle « poil bleu » (青毛), parce qu'un vrai noir a des reflets bleutés au soleil. L'italien ne dit pas « nero » mais morello.",
          en:"Black to the tips, with no red cast. Japanese calls it « blue hair », Italian uses morello rather than nero.",
          es:"Negro hasta las extremidades, sin reflejo rojizo. ⚠️ El japonés lo llama « pelo azul » (青毛), porque un negro verdadero tiene reflejos azulados al sol. El italiano no dice « nero » sino morello.",
          it:"Nero fino alle estremità, senza riflessi rossicci. ⚠️ Il giapponese lo chiama « pelo blu » (青毛), perché un vero nero ha riflessi bluastri al sole. L'italiano non dice « nero » ma morello.",
          de:"Schwarz bis in die Spitzen, ohne roten Schimmer. ⚠️ Das Japanische nennt es « blaues Haar » (青毛), weil echtes Schwarz in der Sonne bläulich glänzt. Das Italienische sagt nicht « nero », sondern morello.",
          ja:"四肢の先まで黒く、赤みのない毛色。⚠️ 日本語では「青毛」— 本物の黒は日の下で青みを帯びて光るからです。イタリア語も « nero » ではなく morello と言います。" } },

  { ref:"gris", lecon:1, coll:"robes",
    mots:{ fr:{m:"le gris"}, en:{m:"grey", p:"gréï", var:"gray (US)"},
           es:{m:"tordo", var:"gris"}, it:{m:"grigio"},
           de:{m:"der Schimmel", p:"chi-meul"}, ja:{m:"芦毛", p:"ashige"} },
    def:{ fr:"Un gris naît foncé et blanchit avec l'âge. ⚠️ On ne dit jamais « blanc » : le cheval blanc de conte de fées est un gris âgé. L'espagnol emploie tordo, pas gris, dans le langage technique.",
          en:"A grey is born dark and whitens with age. Never call it white: the fairy-tale white horse is an old grey.",
          es:"Un tordo nace oscuro y blanquea con la edad. ⚠️ Nunca se dice « blanco »: el caballo blanco de los cuentos es un tordo mayor. El español técnico emplea tordo, no gris.",
          it:"Un grigio nasce scuro e sbianca con l'età. ⚠️ Non si dice mai « bianco »: il cavallo bianco delle fiabe è un grigio anziano. Lo spagnolo tecnico usa tordo, non gris.",
          de:"Ein Schimmel wird dunkel geboren und hellt mit dem Alter auf. ⚠️ Man sagt nie « weiß »: Das Märchenpferd ist ein alter Schimmel. Das Fachspanisch sagt tordo, nicht gris.",
          ja:"芦毛は暗い色で生まれ、歳とともに白くなります。⚠️ 決して「白」とは言いません。おとぎ話の白馬は、歳を重ねた芦毛なのです。スペイン語の専門用語も gris ではなく tordo です。" } },

  { ref:"pie", lecon:1, coll:"robes",
    mots:{ fr:{m:"le pie"}, en:{m:"piebald", p:"païe-bôld", var:"skewbald · coloured (GB) · pinto (US)"},
           es:{m:"pío", var:"pinto"}, it:{m:"pezzato"},
           de:{m:"die Schecke", p:"chè-ke"}, ja:{m:"雑色", p:"zasshoku", var:"駁毛"} }, /* ja corrige (rapport 07/08) : usage elevage/courses */
    def:{ fr:"Grandes plaques blanches sur une autre robe. ⚠️ L'anglais est la seule langue à couper la robe en deux : **piebald** = noir et blanc, **skewbald** = toute autre couleur et blanc. En Grande-Bretagne, on dit souvent simplement « a coloured ».",
          en:"Large white patches over another colour. English alone splits it: piebald is black and white, skewbald any other colour with white.",
          es:"Grandes manchas blancas sobre otra capa. ⚠️ El inglés es la única lengua que corta la capa en dos: **piebald** = negro y blanco, **skewbald** = cualquier otro color y blanco. En Gran Bretaña se dice a menudo simplemente « a coloured ».",
          it:"Grandi chiazze bianche su un altro mantello. ⚠️ L'inglese è l'unica lingua a tagliare il mantello in due: **piebald** = nero e bianco, **skewbald** = ogni altro colore e bianco. In Gran Bretagna si dice spesso semplicemente « a coloured ».",
          de:"Große weiße Platten auf anderer Grundfarbe. ⚠️ Nur das Englische teilt die Farbe in zwei: **piebald** = schwarz-weiß, **skewbald** = jede andere Farbe mit Weiß. In Großbritannien sagt man oft einfach « a coloured ».",
          ja:"別の毛色の上に大きな白い斑が入るもの。⚠️ 英語だけがこれを二つに分けます。**piebald** は白黒、**skewbald** は白とそれ以外の色。イギリスでは単に « a coloured » と言うことも多いです。" } },

  { ref:"isabelle", lecon:1, coll:"robes",
    mots:{ fr:{m:"l'isabelle"}, en:{m:"dun", p:"deune"},
           es:{m:"bayo"}, it:{m:"falbo"},
           de:{m:"der Falbe", p:"fal-be"}, ja:{m:"河原毛", p:"kawarage"} }, /* valide (rapport 07/08) */
    def:{ fr:"Robe sable à dorée, crins foncés, souvent une raie de mulet sur le dos. Le japonais a un mot pour elle parce que ses poneys indigènes la portent.",
          en:"A sandy to golden coat with dark mane and often a dorsal stripe. Japanese has its own word, as its native ponies carry it.",
          es:"Capa arena a dorada, crines oscuros, a menudo una raya de mulo en el dorso. El japonés tiene una palabra para ella porque sus ponis autóctonos la llevan.",
          it:"Mantello sabbia-dorato, crini scuri, spesso una riga mulina sul dorso. Il giapponese ha una parola per lui perché i suoi pony indigeni lo portano.",
          de:"Sand- bis goldfarbenes Fell, dunkles Langhaar, oft ein Aalstrich auf dem Rücken. Das Japanische hat ein eigenes Wort, weil seine einheimischen Ponys diese Farbe tragen.",
          ja:"砂色から金色の体に、暗い色のたてがみ。背中に鰻線が走ることも多い毛色です。日本の在来馬がこの色を持つため、日本語には固有の言葉があります。" } },

  { ref:"palomino", lecon:1, coll:"robes",
    mots:{ fr:{m:"le palomino"}, en:{m:"palomino", p:"pa-lo-mi-nô"},
           es:{m:"palomino"}, it:{m:"palomino"},
           de:{m:"der Palomino", p:"pa-lo-mi-no"}, ja:{m:"月毛", p:"tsukige"} },
    def:{ fr:"Robe dorée à crinière et queue blanches. Le mot est espagnol et a voyagé tel quel dans presque toutes les langues — sauf en japonais, qui dit « poil de lune ».",
          en:"A golden coat with white mane and tail. The Spanish word travelled unchanged into nearly every language — except Japanese, which says « moon hair ».",
          es:"Capa dorada con crin y cola blancas. La palabra es española y ha viajado tal cual por casi todas las lenguas — salvo el japonés, que dice « pelo de luna ».",
          it:"Mantello dorato con criniera e coda bianche. La parola è spagnola e ha viaggiato tale e quale in quasi tutte le lingue — salvo il giapponese, che dice « pelo di luna ».",
          de:"Goldenes Fell mit weißer Mähne und weißem Schweif. Das Wort ist spanisch und reiste unverändert durch fast alle Sprachen — außer ins Japanische, das « Mondhaar » sagt.",
          ja:"金色の体に、白いたてがみと尾。この言葉はスペイン語で、ほぼすべての言語にそのまま旅をしました — 例外は日本語で、「月毛」と言います。" } },

  { ref:"rouan", lecon:1, coll:"robes",
    mots:{ fr:{m:"le rouan"}, en:{m:"roan", p:"rôn-e"},
           es:{m:"ruano"}, it:{m:"roano"},
           de:{m:"der Rotschimmel", p:"rôte-chi-meul"}, ja:{m:"粕毛", p:"kasuge"} },
    def:{ fr:"Des poils blancs mêlés à la robe de base, dès la naissance et sans jamais s'étendre. C'est ce qui le distingue du gris, qui blanchit toute sa vie.",
          en:"White hairs mixed through the base colour from birth, and never spreading — which is what separates a roan from a grey.",
          es:"Pelos blancos mezclados con la capa de base, desde el nacimiento y sin extenderse jamás. Eso lo distingue del tordo, que blanquea toda su vida.",
          it:"Peli bianchi mescolati al mantello di base, dalla nascita e senza mai estendersi. È ciò che lo distingue dal grigio, che sbianca tutta la vita.",
          de:"Weiße Haare, von Geburt an ins Grundfell gemischt und nie zunehmend. Das unterscheidet ihn vom Schimmel, der sein Leben lang aufhellt.",
          ja:"生まれつき地の毛色に白い毛が混ざり、その割合は生涯変わりません。一生をかけて白くなっていく芦毛との違いは、そこにあります。" } },

  { ref:"blanc", lecon:1, coll:"robes",
    mots:{ fr:{m:"le blanc"}, en:{m:"white", p:"ouaïte", var:"cremello"},
           es:{m:"blanco"}, it:{m:"bianco"},
           de:{m:"der Weißgeborene", p:"vaïss-gue-bo-re-ne", var:"der Schimmel = le gris courant"}, ja:{m:"白毛", p:"shiroge"} }, /* rapport 07/08 : Weißgeborenes = ne blanc (rarissime), Schimmel = usage courant ; ja lu shiroge */
    def:{ fr:"⚠️ Le piège classique. Un cheval « blanc » est presque toujours un gris blanchi. Le blanc véritable naît blanc et reste rarissime — l'allemand a un mot exprès pour lui : der Weißgeborene, « le né-blanc ».",
          en:"The classic trap: a « white » horse is nearly always a whitened grey. True white horses are born white and are very rare.",
          es:"⚠️ La trampa clásica. Un caballo « blanco » es casi siempre un tordo blanqueado. El blanco verdadero nace blanco y es rarísimo — el alemán tiene una palabra expresa: der Weißgeborene, « el nacido blanco ».",
          it:"⚠️ La trappola classica. Un cavallo « bianco » è quasi sempre un grigio sbiancato. Il bianco vero nasce bianco e resta rarissimo — il tedesco ha una parola apposta: der Weißgeborene, « il nato bianco ».",
          de:"⚠️ Die klassische Falle. Ein « weißes » Pferd ist fast immer ein ausgeschimmelter Schimmel. Echtes Weiß wird weiß geboren und bleibt eine Rarität — dafür gibt es das Wort der Weißgeborene.",
          ja:"⚠️ 定番の落とし穴。「白い」馬は、ほとんどの場合白くなった芦毛です。本当の白毛は白く生まれ、きわめて稀 — ドイツ語には専用の言葉があります：der Weißgeborene、「白く生まれた者」。" } },

  /* ============ LEÇON 2 · LES MARQUES ET L'IDENTITÉ ============ */

  { ref:"liste", lecon:2, coll:"marques",
    mots:{ fr:{m:"la liste"}, en:{m:"the blaze", p:"bléïze", var:"stripe = fine"},
           es:{m:"la lista"}, it:{m:"la lista"}, /* es corrige (rapport 07/08) : el cordón retire */
           de:{m:"die Blesse", p:"blè-se"}, ja:{m:"流星", p:"ryūsei"} },
    def:{ fr:"La bande blanche qui descend du front vers le nez. Apy en a une très large, continue jusqu'au museau. Le japonais l'appelle « étoile filante » (流星).",
          en:"The white band running down the face. A narrow one is a stripe, a broad one a blaze. Japanese calls it « shooting star ».",
          es:"La banda blanca que baja de la frente hacia la nariz. Apy tiene una muy ancha, continua hasta el hocico. El japonés la llama « estrella fugaz » (流星).",
          it:"La banda bianca che scende dalla fronte verso il naso. Apy ne ha una larghissima, continua fino al muso. Il giapponese la chiama « stella cadente » (流星).",
          de:"Das weiße Band, das von der Stirn zur Nase läuft. Apy trägt ein sehr breites, durchgehend bis zum Maul. Das Japanische nennt es « Sternschnuppe » (流星).",
          ja:"額から鼻へ下りる白い帯。アピーのは幅広で、鼻先まで途切れずに続いています。日本語では「流星」と呼びます。" } },

  { ref:"etoile", lecon:2, coll:"marques",
    mots:{ fr:{m:"l'étoile"}, en:{m:"the star", p:"star"},
           es:{m:"el lucero"}, it:{m:"la stella"},
           de:{m:"der Stern", p:"chtèrn"}, ja:{m:"星", p:"hoshi"} },
    def:{ fr:"La petite marque blanche du front, isolée. Toutes les langues ont choisi la même image, ce qui en fait le mot le plus facile du chapitre.",
          en:"The isolated white mark on the forehead. Every language reached for the same image, which makes it the easiest word here.",
          es:"La pequeña marca blanca de la frente, aislada. Todas las lenguas eligieron la misma imagen, lo que la convierte en la palabra más fácil del capítulo.",
          it:"La piccola macchia bianca della fronte, isolata. Tutte le lingue hanno scelto la stessa immagine, il che ne fa la parola più facile del capitolo.",
          de:"Das kleine, allein stehende weiße Mal auf der Stirn. Alle Sprachen wählten dasselbe Bild — das macht es zum leichtesten Wort des Kapitels.",
          ja:"額にぽつんとある小さな白い印。どの言語も同じイメージを選んだので、この章でいちばん覚えやすい言葉です。" } },

  { ref:"balzane", lecon:2, coll:"marques",
    mots:{ fr:{m:"la balzane"}, en:{m:"the sock", p:"soque", var:"stocking = haute"},
           es:{m:"el calzado"}, it:{m:"il balzano"},
           de:{m:"das Beinabzeichen", p:"baïn-ap-tsaï-cheune", var:"weiße Fessel"}, ja:{m:"白斑", p:"hakuhan"} }, // ??
    def:{ fr:"Le blanc sur un membre. ⚠️ Chaque langue compte différemment : l'anglais oppose sock (basse) et stocking (haute), l'allemand nomme la hauteur exacte atteinte (Krone, Fessel, Röhre), et le japonais compte les membres (一白 = un membre blanc).",
          en:"White on a leg. English contrasts sock and stocking, German names the exact height reached, and Japanese counts the legs.",
          es:"El blanco en una extremidad. ⚠️ Cada lengua cuenta distinto: el inglés opone sock (baja) y stocking (alta), el alemán nombra la altura exacta alcanzada (Krone, Fessel, Röhre), y el japonés cuenta las extremidades (一白 = una extremidad blanca).",
          it:"Il bianco su un arto. ⚠️ Ogni lingua conta diversamente: l'inglese oppone sock (bassa) e stocking (alta), il tedesco nomina l'altezza esatta raggiunta (Krone, Fessel, Röhre), e il giapponese conta gli arti (一白 = un arto bianco).",
          de:"Das Weiß am Bein. ⚠️ Jede Sprache zählt anders: Englisch trennt sock (niedrig) und stocking (hoch), Deutsch benennt die erreichte Höhe (Krone, Fessel, Röhre), Japanisch zählt die Beine (一白 = ein weißes Bein).",
          ja:"脚に入る白。⚠️ 数え方は言語ごとに違います。英語は低い sock と高い stocking を分け、ドイツ語は届いた高さそのものを名づけ（Krone・Fessel・Röhre）、日本語は白い脚の本数を数えます（一白 = 白い脚が一本）。" } },

  { ref:"epi", lecon:2, coll:"marques",
    mots:{ fr:{m:"l'épi"}, en:{m:"the whorl", p:"ouorl"},
           es:{m:"el remolino"}, it:{m:"il vortice"}, // ??
           de:{m:"der Wirbel", p:"vir-beul"}, ja:{m:"旋毛", p:"tsumuji"} },
    def:{ fr:"Le tourbillon de poils, le plus souvent au milieu du front. Unique à chaque cheval : il figure sur le signalement du passeport, comme une empreinte digitale.",
          en:"The swirl of hair, usually in the middle of the forehead. Unique to each horse, it is drawn on the passport like a fingerprint.",
          es:"El remolino de pelo, casi siempre en medio de la frente. Único en cada caballo: figura en la reseña del pasaporte, como una huella dactilar.",
          it:"Il vortice di peli, quasi sempre in mezzo alla fronte. Unico per ogni cavallo: figura sul segnalamento del passaporto, come un'impronta digitale.",
          de:"Der Haarwirbel, meist mitten auf der Stirn. Bei jedem Pferd einzigartig: Er steht im Pass wie ein Fingerabdruck.",
          ja:"たいてい額の真ん中にある、毛のつむじ。一頭ごとに異なり、指紋のようにパスポートの特徴欄に記されます。" } },

  { ref:"puce", lecon:2, coll:"marques",
    mots:{ fr:{m:"la puce électronique"}, en:{m:"the microchip", p:"maï-krô-tchip"},
           es:{m:"el microchip"}, it:{m:"il microchip"},
           de:{m:"der Transponder", p:"trans-ponn-deur", var:"der Mikrochip"}, ja:{m:"マイクロチップ", p:"maikurochippu"} },
    def:{ fr:"Obligatoire en Europe, posée dans l'encolure gauche. C'est elle qui relie physiquement le cheval à son passeport.",
          en:"Compulsory across Europe, implanted in the left side of the neck. It is what physically links a horse to its passport.",
          es:"Obligatorio en Europa, implantado en el lado izquierdo del cuello. Es lo que une físicamente al caballo con su pasaporte.",
          it:"Obbligatorio in Europa, inserito nell'incollatura sinistra. È ciò che lega fisicamente il cavallo al suo passaporto.",
          de:"In Europa Pflicht, links in den Hals gesetzt. Er verbindet das Pferd physisch mit seinem Pass.",
          ja:"ヨーロッパでは義務。首の左側に埋め込みます。馬とパスポートを物理的に結びつけているのは、このチップです。" } },

  { ref:"passeport", lecon:2, coll:"marques",
    mots:{ fr:{m:"le passeport"}, en:{m:"the passport", p:"pass-port"},
           es:{m:"el pasaporte"}, it:{m:"il passaporto"},
           de:{m:"der Pferdepass", p:"pfèr-de-pass"}, ja:{m:"馬パスポート", p:"uma pasupōto"} }, // ??
    def:{ fr:"Le document qui suit le cheval partout : signalement dessiné, épis, balzanes, vaccins, numéro de puce. Contrôlé à l'entrée de tout concours et de tout transport.",
          en:"The document that follows the horse everywhere: drawn markings, whorls, socks, vaccinations, chip number. Checked at every show and every border.",
          es:"El documento que sigue al caballo a todas partes: reseña dibujada, remolinos, calzados, vacunas, número de chip. Se controla a la entrada de todo concurso y todo transporte.",
          it:"Il documento che segue il cavallo ovunque: segnalamento disegnato, vortici, balzane, vaccini, numero di chip. Controllato all'ingresso di ogni concorso e di ogni trasporto.",
          de:"Das Dokument, das dem Pferd überallhin folgt: gezeichnete Beschreibung, Wirbel, Abzeichen, Impfungen, Chipnummer. Wird an jedem Turnier- und Transporteingang geprüft.",
          ja:"馬にどこまでもついて回る書類。図で描かれた特徴、つむじ、白斑、ワクチン、チップ番号。競技会でも輸送でも、入り口で必ず確認されます。" } },

  { ref:"taille", lecon:2, coll:"marques",
    mots:{ fr:{m:"la taille au garrot"}, en:{m:"the height", p:"haïte", var:"hands · hh"},
           es:{m:"la alzada", var:"la altura"}, it:{m:"l'altezza"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"体高", p:"taikō"} },
    def:{ fr:"⚠️ Le piège de voyage numéro un. La Grande-Bretagne et l'Irlande mesurent en **hands** : une hand vaut 10,16 cm, et « he's 16.2 » veut dire 16 hands et 2 pouces, soit 1,68 m. Le reste de l'Europe mesure en centimètres au garrot.",
          en:"Britain and Ireland measure in hands: one hand is 10.16 cm, and « he's 16.2 » means 16 hands 2 inches, or 1.68 m. The rest of Europe uses centimetres at the withers.",
          es:"⚠️ La trampa de viaje número uno. Gran Bretaña e Irlanda miden en **hands**: una hand vale 10,16 cm, y « he's 16.2 » significa 16 hands y 2 pulgadas, o sea 1,68 m. El resto de Europa mide en centímetros a la cruz.",
          it:"⚠️ La trappola di viaggio numero uno. Gran Bretagna e Irlanda misurano in **hands**: una hand vale 10,16 cm, e « he's 16.2 » significa 16 hands e 2 pollici, cioè 1,68 m. Il resto d'Europa misura in centimetri al garrese.",
          de:"⚠️ Die Reisefalle Nummer eins. Großbritannien und Irland messen in **hands**: eine Hand sind 10,16 cm, und « he's 16.2 » heißt 16 Hands und 2 Zoll, also 1,68 m. Der Rest Europas misst in Zentimetern am Widerrist.",
          ja:"⚠️ 旅の落とし穴の筆頭。イギリスとアイルランドは **hands** で測ります。1ハンドは10.16cm、« he's 16.2 » は16ハンド2インチ、つまり体高168cm。ヨーロッパの他の国はき甲でセンチ測りです。" } },

  { ref:"poney", lecon:2, coll:"marques",
    mots:{ fr:{m:"le poney"}, en:{m:"the pony", p:"pô-ni"},
           es:{m:"el poni", var:"el poney"}, it:{m:"il pony"},
           de:{m:"das Pony", p:"pô-ni"}, ja:{m:"ポニー", p:"ponī"} },
    def:{ fr:"Sous 1,48 m au garrot (1,49 m ferré), c'est un poney ; au-dessus, un cheval. Un Connemara tombe souvent pile sur la limite, ce qui décide de sa catégorie en concours.",
          en:"Under 1.48 m at the withers it is a pony, above it a horse. A Connemara often lands exactly on the line, which decides its competition class.",
          es:"Por debajo de 1,48 m a la cruz (1,49 m herrado) es un poni; por encima, un caballo. Un Connemara cae a menudo justo en el límite, lo que decide su categoría en concurso.",
          it:"Sotto 1,48 m al garrese (1,49 m ferrato) è un pony; sopra, un cavallo. Un Connemara cade spesso proprio sul limite, il che decide la sua categoria in concorso.",
          de:"Unter 1,48 m Widerristhöhe (1,49 m beschlagen) ist es ein Pony, darüber ein Pferd. Ein Connemara liegt oft genau auf der Grenze — das entscheidet seine Turnierkategorie.",
          ja:"き甲で1.48m未満（蹄鉄ありなら1.49m）はポニー、それ以上は馬。コネマラはちょうど境界に乗ることが多く、それが競技のカテゴリーを決めます。" } },

  { ref:"fer", lecon:2, coll:"marques",
    mots:{ fr:{m:"le fer"}, en:{m:"the horseshoe", p:"hors-chou"},
           es:{m:"la herradura"}, it:{m:"il ferro"},
           de:{m:"das Hufeisen", p:"houf-aï-zeune"}, ja:{m:"蹄鉄", p:"teitetsu"} },
    def:{ fr:"Cloué dans la paroi du sabot, qui n'est pas sensible. Un cheval peut aussi vivre pieds nus : on dit alors qu'il est déferré.",
          en:"Nailed into the hoof wall, which has no feeling. A horse may also go barefoot, without shoes at all.",
          es:"Clavado en la pared del casco, que no es sensible. Un caballo también puede vivir descalzo: se dice entonces que está desherrado.",
          it:"Inchiodato nella parete dello zoccolo, che non è sensibile. Un cavallo può anche vivere scalzo: si dice allora che è sferrato.",
          de:"In die unempfindliche Hufwand genagelt. Ein Pferd kann auch barhuf leben — dann ist es unbeschlagen.",
          ja:"感覚のない蹄の壁に釘で打ちつけます。蹄鉄なしで暮らす馬もいて、その場合は裸蹄と言います。" } },

  { ref:"marechal", lecon:2, coll:"marques",
    mots:{ fr:{m:"le maréchal-ferrant"}, en:{m:"the farrier", p:"fa-ri-eur"},
           es:{m:"el herrador"}, it:{m:"il maniscalco"},
           de:{m:"der Hufschmied", p:"houf-chmite"}, ja:{m:"装蹄師", p:"sōteishi"} },
    def:{ fr:"Il passe toutes les six à huit semaines. ⚠️ Ne pas dire « blacksmith » : le blacksmith travaille le fer, le farrier travaille le pied. Le mot anglais n'a aucune parenté avec le français.",
          en:"He comes every six to eight weeks. Do not say blacksmith: a blacksmith works iron, a farrier works feet.",
          es:"Pasa cada seis a ocho semanas. ⚠️ No decir « blacksmith »: el blacksmith trabaja el hierro, el farrier trabaja el pie. La palabra inglesa no tiene parentesco alguno con la francesa.",
          it:"Passa ogni sei-otto settimane. ⚠️ Non dire « blacksmith »: il blacksmith lavora il ferro, il farrier lavora il piede. La parola inglese non ha alcuna parentela con la francese.",
          de:"Kommt alle sechs bis acht Wochen. ⚠️ Nicht « blacksmith » sagen: Der Blacksmith schmiedet Eisen, der Farrier arbeitet am Huf. Das englische Wort ist mit dem französischen nicht verwandt.",
          ja:"六〜八週ごとに来ます。⚠️ « blacksmith » と言わないこと。blacksmith は鉄を打つ人、farrier は蹄を扱う人。英語のこの言葉は、フランス語と何の血縁もありません。" } },

  /* ============ LEÇON 3 · LE CORPS ============ */

  { ref:"tete", lecon:3, coll:"morpho",
    mots:{ fr:{m:"la tête"}, en:{m:"the head", p:"hèd"},
           es:{m:"la cabeza"}, it:{m:"la testa"},
           de:{m:"der Kopf", p:"kopf"}, ja:{m:"頭", p:"atama"} },
    def:{ fr:"On l'approche par l'épaule, jamais de face : le cheval voit mal juste devant son nez.",
          en:"Always approached from the shoulder, never head-on: a horse sees poorly straight in front of its nose.",
          es:"Se la aborda por la espalda, nunca de frente: el caballo ve mal justo delante de su nariz.",
          it:"La si avvicina dalla spalla, mai di fronte: il cavallo vede male proprio davanti al naso.",
          de:"Man nähert sich über die Schulter, nie frontal: Direkt vor der Nase sieht das Pferd schlecht.",
          ja:"近づくときは肩の側から。正面からは決して。馬は鼻先の真ん前がよく見えないのです。" } },

  { ref:"garrot", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le garrot"}, en:{m:"the withers", p:"oui-zeurz"},
           es:{m:"la cruz"}, it:{m:"il garrese"},
           de:{m:"der Widerrist", p:"vi-deur-rist"}, ja:{m:"鬐甲", p:"kikō"} },
    def:{ fr:"Le sommet de l'épaule, point fixe du corps : c'est là qu'on mesure le cheval et là que se pose l'avant de la selle. L'espagnol l'appelle « la croix ».",
          en:"The high point of the shoulder, the body's fixed point: where a horse is measured and where the front of the saddle sits. Spanish calls it « the cross ».",
          es:"La cima de la espalda, punto fijo del cuerpo: ahí se mide al caballo y ahí se apoya el arzón delantero. El español lo llama « la cruz ».",
          it:"La sommità della spalla, punto fisso del corpo: è lì che si misura il cavallo e lì che poggia l'arcione anteriore. Lo spagnolo lo chiama « la croce ».",
          de:"Der höchste Punkt über der Schulter, der Fixpunkt des Körpers: Dort wird gemessen, dort liegt der Vorderzwiesel. Das Spanische nennt ihn « das Kreuz ».",
          ja:"肩の上の頂点で、体の基準点。馬の体高はここで測り、鞍の前部もここに載ります。スペイン語では「十字架」と呼びます。" } },

  { ref:"epaule", lecon:3, coll:"morpho",
    mots:{ fr:{m:"l'épaule"}, en:{m:"the shoulder", p:"chol-deur"},
           es:{m:"la espalda", var:"el hombro"}, it:{m:"la spalla"},
           de:{m:"die Schulter", p:"choul-teur"}, ja:{m:"肩", p:"kata"} },
    def:{ fr:"Son inclinaison décide de l'amplitude des allures. Une épaule droite donne un cheval qui trotte court.",
          en:"Its slope decides the length of the stride. An upright shoulder makes for a short-striding horse.",
          es:"Su inclinación decide la amplitud de los aires. Una espalda recta da un caballo que trota corto.",
          it:"La sua inclinazione decide l'ampiezza delle andature. Una spalla dritta dà un cavallo che trotta corto.",
          de:"Ihre Schräge entscheidet über die Raumgriffigkeit der Gänge. Eine steile Schulter macht ein kurz trabendes Pferd.",
          ja:"肩の傾きが歩様の伸びやかさを決めます。立った肩の馬は、歩幅の詰まった速歩になります。" } },

  { ref:"croupe", lecon:3, coll:"morpho",
    mots:{ fr:{m:"la croupe"}, en:{m:"the quarters", p:"kouor-teurz", var:"the croup · hindquarters"},
           es:{m:"la grupa"}, it:{m:"la groppa"},
           de:{m:"die Kruppe", p:"krou-pe"}, ja:{m:"尻", p:"shiri"} },
    def:{ fr:"Le moteur du cheval. On ne passe jamais derrière sans avoir parlé : c'est l'angle mort et la zone du coup de pied.",
          en:"The horse's engine. Never walk behind it without speaking first: it is the blind spot and the kicking zone.",
          es:"El motor del caballo. Nunca se pasa por detrás sin haber hablado: es el ángulo muerto y la zona de la coz.",
          it:"Il motore del cavallo. Non si passa mai dietro senza aver parlato: è l'angolo cieco e la zona del calcio.",
          de:"Der Motor des Pferdes. Nie hinten vorbeigehen, ohne gesprochen zu haben: toter Winkel und Trittzone.",
          ja:"馬のエンジン。声をかけずに後ろを通ってはいけません。そこは死角であり、蹴りの届く場所です。" } },

  { ref:"jarret", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le jarret"}, en:{m:"the hock", p:"hok"},
           es:{m:"el corvejón"}, it:{m:"il garretto"},
           de:{m:"das Sprunggelenk", p:"chproung-gue-lènk"}, ja:{m:"飛節", p:"hisetsu"} },
    def:{ fr:"La grande articulation coudée du postérieur, celle qui pousse. Chaque langue lui a donné un mot court et propre : hock, Sprunggelenk, corvejón, garretto, 飛節.",
          en:"The big angled joint of the hind leg, the one that pushes. Every language gave it its own short word.",
          es:"La gran articulación acodada del posterior, la que empuja. Cada lengua le dio una palabra corta y propia: hock, Sprunggelenk, corvejón, garretto, 飛節.",
          it:"La grande articolazione a gomito del posteriore, quella che spinge. Ogni lingua gli ha dato una parola corta e propria: hock, Sprunggelenk, corvejón, garretto, 飛節.",
          de:"Das große Winkelgelenk der Hinterhand, das den Schub gibt. Jede Sprache hat dafür ihr eigenes kurzes Wort: hock, Sprunggelenk, corvejón, garretto, 飛節.",
          ja:"後肢の大きく折れ曲がった関節。推進力の源です。どの言語も短い固有の言葉を与えました — hock、Sprunggelenk、corvejón、garretto、飛節。" } },

  { ref:"boulet", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le boulet"}, en:{m:"the fetlock", p:"fètt-lok"},
           es:{m:"el menudillo"}, it:{m:"il nodello"},
           de:{m:"das Fesselgelenk", p:"fè-seul-gue-lènk"}, ja:{m:"球節", p:"kyūsetsu"} },
    def:{ fr:"L'articulation en boule au-dessus du paturon. C'est là qu'on pose les guêtres et qu'on cherche une chaleur suspecte.",
          en:"The ball joint above the pastern. Where boots go on, and where you feel for suspicious heat.",
          es:"La articulación en bola encima de la cuartilla. Ahí se ponen los protectores y ahí se busca un calor sospechoso.",
          it:"L'articolazione a palla sopra il pastorale. È lì che si mettono le protezioni e si cerca un calore sospetto.",
          de:"Das kugelige Gelenk über der Fessel. Dort sitzen die Gamaschen, dort sucht man verdächtige Wärme.",
          ja:"繋の上にある球状の関節。プロテクターを着けるのはここで、怪しい熱を探るのもここです。" } },

  { ref:"paturon", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le paturon"}, en:{m:"the pastern", p:"pass-teurn"},
           es:{m:"la cuartilla"}, it:{m:"il pastorale"},
           de:{m:"die Fessel", p:"fè-seul"}, ja:{m:"繋", p:"tsunagi"} },
    def:{ fr:"Entre le boulet et le sabot. Long et souple, il amortit ; court et droit, il tape. ⚠️ Attention en allemand : Fessel désigne le paturon, et Fesselgelenk le boulet.",
          en:"Between fetlock and hoof. Long and sloping it absorbs shock; short and upright it jars. In German, Fessel is the pastern and Fesselgelenk the joint above it.",
          es:"Entre el menudillo y el casco. Largo y flexible, amortigua; corto y recto, golpea. ⚠️ Ojo en alemán: Fessel designa la cuartilla, y Fesselgelenk el menudillo.",
          it:"Tra il nodello e lo zoccolo. Lungo e flessibile, ammortizza; corto e dritto, batte. ⚠️ Attenzione in tedesco: Fessel indica il pastorale, e Fesselgelenk il nodello.",
          de:"Zwischen Fesselkopf und Huf. Lang und weich federt sie, kurz und steil hämmert es. ⚠️ Fessel ist die Fessel selbst, Fesselgelenk der Fesselkopf.",
          ja:"球節と蹄のあいだの部分。長くしなやかなら衝撃を吸収し、短く立っていれば脚に響きます。⚠️ ドイツ語では Fessel が繋、Fesselgelenk が球節です。" } },

  { ref:"ventre", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le ventre"}, en:{m:"the belly", p:"bè-li"},
           es:{m:"el vientre", var:"la barriga"}, it:{m:"la pancia"},
           de:{m:"der Bauch", p:"baourh"}, ja:{m:"腹", p:"hara"} },
    def:{ fr:"À vérifier au pansage : c'est là que se cachent les tiques et que la sangle blesse.",
          en:"Always checked when grooming: where ticks hide and where the girth rubs.",
          es:"A revisar en la limpieza: ahí se esconden las garrapatas y ahí hiere la cincha.",
          it:"Da controllare durante la pulizia: è lì che si nascondono le zecche e che la cinghia ferisce.",
          de:"Beim Putzen zu prüfen: Dort verstecken sich Zecken, dort scheuert der Gurt.",
          ja:"手入れのたびに確かめる場所。マダニが潜むのも、腹帯が擦るのも、ここです。" } },

  { ref:"naseaux", lecon:3, coll:"morpho",
    mots:{ fr:{m:"les naseaux"}, en:{m:"the nostrils", p:"noss-treulz"},
           es:{m:"los ollares"}, it:{m:"le narici"},
           de:{m:"die Nüstern", p:"nu-steurn"}, ja:{m:"鼻孔", p:"bikō"} },
    def:{ fr:"Le cheval ne respire que par le nez, jamais par la bouche. Des naseaux très dilatés après l'effort sont normaux ; au repos, ils inquiètent.",
          en:"A horse breathes only through its nose, never its mouth. Wide nostrils after work are normal; at rest they are a worry.",
          es:"El caballo solo respira por la nariz, nunca por la boca. Unos ollares muy dilatados tras el esfuerzo son normales; en reposo, preocupan.",
          it:"Il cavallo respira solo dal naso, mai dalla bocca. Narici molto dilatate dopo lo sforzo sono normali; a riposo, preoccupano.",
          de:"Das Pferd atmet nur durch die Nase, nie durch das Maul. Weit geblähte Nüstern nach der Arbeit sind normal — in Ruhe beunruhigen sie.",
          ja:"馬は鼻でしか呼吸できません。口では決して。運動後に大きく開いた鼻孔は正常ですが、安静時に開いていたら心配のしるしです。" } },

  { ref:"oreilles", lecon:3, coll:"morpho",
    mots:{ fr:{m:"les oreilles"}, en:{m:"the ears", p:"ieurz"},
           es:{m:"las orejas"}, it:{m:"le orecchie"},
           de:{m:"die Ohren", p:"ô-reune"}, ja:{m:"耳", p:"mimi"} },
    def:{ fr:"Le premier indicateur d'humeur, et le plus universel : couchées en arrière, on s'écarte, dans toutes les langues et tous les pays.",
          en:"The first and most universal sign of mood: flat back, you step away — in every language and every country.",
          es:"El primer indicador de humor, y el más universal: pegadas hacia atrás, uno se aparta, en todas las lenguas y todos los países.",
          it:"Il primo indicatore d'umore, e il più universale: appiattite all'indietro, ci si scosta, in tutte le lingue e tutti i paesi.",
          de:"Der erste Stimmungsanzeiger, und der universellste: nach hinten angelegt heißt Abstand — in jeder Sprache, in jedem Land.",
          ja:"気分を伝える最初の、そして最も万国共通のサイン。後ろへ伏せられたら距離を取る — どの言語でも、どの国でも同じです。" } },

  /* ============ LEÇON 4 · ÂGE, SEXE, CARACTÈRE ============ */

  { ref:"hongre", lecon:4, coll:"identite",
    mots:{ fr:{m:"le hongre"}, en:{m:"the gelding", p:"guel-ding"},
           es:{m:"el caballo castrado"}, it:{m:"il castrone"},
           de:{m:"der Wallach", p:"va-larh"}, ja:{m:"せん馬", p:"senba"} },
    def:{ fr:"Le mâle castré, monture la plus courante en club pour son égalité de caractère. Le mot français vient de la Hongrie, où la pratique était courante.",
          en:"The castrated male, the commonest riding-school mount for its even temper.",
          es:"El macho castrado, la montura más común en un club por su igualdad de carácter. La palabra francesa viene de Hungría, donde la práctica era corriente.",
          it:"Il maschio castrato, la cavalcatura più comune in un club per l'uniformità di carattere. La parola francese viene dall'Ungheria, dove la pratica era corrente.",
          de:"Der kastrierte Wallach, wegen seines ausgeglichenen Wesens das häufigste Clubpferd. Das französische Wort kommt aus Ungarn, wo die Praxis üblich war.",
          ja:"去勢された牡馬。気性が安定しているため、クラブで最もよく使われます。フランス語の hongre はハンガリーに由来 — 去勢が盛んな土地だったのです。" } },

  { ref:"etalon", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-li-eune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèn-gst"}, ja:{m:"牡馬", p:"ouma", var:"種牡馬 = étalon reproducteur"} },
    def:{ fr:"Le mâle entier. Jamais confié à un débutant, et souvent séparé du reste de l'écurie. Le japonais distingue le mâle (牡馬) de l'étalon d'élevage (種牡馬).",
          en:"The entire male, never given to a beginner and often stabled apart. Japanese separates « male horse » from « breeding stallion ».",
          es:"El macho entero. Jamás confiado a un principiante, y a menudo separado del resto de la cuadra. El japonés distingue el macho (牡馬) del semental de cría (種牡馬).",
          it:"Il maschio intero. Mai affidato a un principiante, e spesso separato dal resto della scuderia. Il giapponese distingue il maschio (牡馬) dallo stallone da razza (種牡馬).",
          de:"Der Hengst. Nie einem Anfänger anvertraut, oft vom Rest des Stalls getrennt. Das Japanische unterscheidet das männliche Tier (牡馬) vom Zuchthengst (種牡馬).",
          ja:"去勢していない牡馬。初心者に任されることは決してなく、厩舎でも他の馬と離されがちです。日本語は牡馬と、繁殖用の種牡馬とを区別します。" } },

  { ref:"jument", lecon:4, coll:"identite",
    mots:{ fr:{m:"la jument"}, en:{m:"the mare", p:"mèr"},
           es:{m:"la yegua"}, it:{m:"la cavalla", var:"la giumenta"},
           de:{m:"die Stute", p:"chtou-te"}, ja:{m:"牝馬", p:"hinba"} },
    def:{ fr:"La femelle. Aucune langue ne se contente de dire « cheval femelle » : chacune a son mot, et c'est l'un des premiers à connaître à l'étranger.",
          en:"The female. No language settles for « female horse »: each has its own word, and it is one of the first to learn abroad.",
          es:"La hembra. Ninguna lengua se contenta con decir « caballo hembra »: cada una tiene su palabra, y es una de las primeras que hay que saber en el extranjero.",
          it:"La femmina. Nessuna lingua si accontenta di dire « cavallo femmina »: ognuna ha la sua parola, ed è una delle prime da sapere all'estero.",
          de:"Das weibliche Pferd. Keine Sprache begnügt sich mit « weibliches Pferd »: Jede hat ihr eigenes Wort — eines der ersten, die man im Ausland braucht.",
          ja:"メスの馬。どの言語も「メスの馬」とは言わず、固有の言葉を持っています。海外で最初に覚えるべき言葉のひとつです。" } },

  { ref:"poulain", lecon:4, coll:"identite",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle", var:"colt = mâle · filly = femelle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"} },
    def:{ fr:"⚠️ L'anglais a trois mots là où le français en a un : **foal** (le poulain de l'année, des deux sexes), **colt** (jeune mâle), **filly** (jeune femelle). Sur les hippodromes britanniques, on n'entend que colt et filly.",
          en:"English has three words where French has one: foal for the youngster of either sex, colt for a young male, filly for a young female.",
          es:"⚠️ El inglés tiene tres palabras donde el francés una: **foal** (el potro del año, de ambos sexos), **colt** (macho joven), **filly** (hembra joven). En los hipódromos británicos solo se oye colt y filly.",
          it:"⚠️ L'inglese ha tre parole dove il francese ne ha una: **foal** (il puledro dell'anno, dei due sessi), **colt** (giovane maschio), **filly** (giovane femmina). Sugli ippodromi britannici si sentono solo colt e filly.",
          de:"⚠️ Das Englische hat drei Wörter, wo das Französische eines hat: **foal** (das Fohlen des Jahrgangs, beide Geschlechter), **colt** (junger Hengst), **filly** (junge Stute). Auf britischen Rennbahnen hört man nur colt und filly.",
          ja:"⚠️ フランス語がひとつで済ませるところを、英語は三語で言い分けます。**foal**（当歳仔、雌雄問わず）、**colt**（若い牡）、**filly**（若い牝）。イギリスの競馬場で聞こえるのは colt と filly ばかりです。" } },

  { ref:"age", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'âge"}, en:{m:"the age", p:"éïdj"},
           es:{m:"la edad"}, it:{m:"l'età"},
           de:{m:"das Alter", p:"al-teur"}, ja:{m:"馬齢", p:"barei", var:"年齢"} },
    def:{ fr:"Curiosité mondiale : dans les papiers, tous les chevaux prennent un an le 1er janvier, quelle que soit leur date de naissance réelle. Un poulain né en mai a « un an » en janvier suivant.",
          en:"A worldwide oddity: on paper every horse gains a year on 1 January, whatever its real birthday.",
          es:"Curiosidad mundial: en los papeles, todos los caballos cumplen un año el 1 de enero, sea cual sea su fecha real de nacimiento. Un potro nacido en mayo tiene « un año » el enero siguiente.",
          it:"Curiosità mondiale: sui documenti, tutti i cavalli compiono un anno il 1° gennaio, qualunque sia la data reale di nascita. Un puledro nato a maggio ha « un anno » il gennaio successivo.",
          de:"Weltweite Kuriosität: Auf dem Papier werden alle Pferde am 1. Januar ein Jahr älter, egal wann sie geboren sind. Ein Maifohlen ist im folgenden Januar « einjährig ».",
          ja:"世界共通の不思議：書類の上では、実際の誕生日にかかわらず、すべての馬が1月1日に歳をとります。5月生まれの仔馬は、翌年の1月に「一歳」です。" } },

  { ref:"caractere", lecon:4, coll:"identite",
    mots:{ fr:{m:"le caractère"}, en:{m:"the temperament", p:"tèm-pra-meune"},
           es:{m:"el carácter"}, it:{m:"il carattere"},
           de:{m:"das Temperament", p:"tèm-pé-ra-mènt"}, ja:{m:"気性", p:"kishō"} },
    def:{ fr:"Ce qu'on demande avant de monter un cheval inconnu. La question qui marche partout : « comment est-il ? » plutôt que « est-il gentil ? ».",
          en:"What you ask before riding an unknown horse. The question that works everywhere is « what's he like ? », not « is he nice ? ».",
          es:"Lo que se pregunta antes de montar un caballo desconocido. La pregunta que funciona en todas partes: « ¿cómo es? » mejor que « ¿es bueno? ».",
          it:"Ciò che si chiede prima di montare un cavallo sconosciuto. La domanda che funziona ovunque: « com'è? » piuttosto che « è buono? ».",
          de:"Wonach man fragt, bevor man ein fremdes Pferd reitet. Die Frage, die überall funktioniert: « Wie ist er? » statt « Ist er brav? ».",
          ja:"知らない馬に乗る前に尋ねること。どこでも通じる聞き方は「この馬、どんな子ですか？」— 「おとなしいですか？」よりも。" } },

  { ref:"calme", lecon:4, coll:"identite",
    mots:{ fr:{m:"calme"}, en:{m:"quiet", p:"kouaï-eutte", var:"steady · a schoolmaster"},
           es:{m:"tranquilo"}, it:{m:"tranquillo"},
           de:{m:"brav", p:"braf"}, ja:{m:"おとなしい", p:"otonashii"} },
    def:{ fr:"Le mot qu'on espère entendre pour un cheval de location. ⚠️ En Grande-Bretagne, « he's a real schoolmaster » est le plus grand compliment possible pour un cheval d'école : il enseigne au cavalier.",
          en:"The word you hope to hear about a hire horse. In Britain, « a real schoolmaster » is the highest praise for a school horse: it teaches the rider.",
          es:"La palabra que uno espera oír para un caballo alquilado. ⚠️ En Gran Bretaña, « he's a real schoolmaster » es el mayor cumplido posible para un caballo de escuela: enseña al jinete.",
          it:"La parola che si spera di sentire per un cavallo a noleggio. ⚠️ In Gran Bretagna « he's a real schoolmaster » è il più grande complimento possibile per un cavallo da scuola: insegna al cavaliere.",
          de:"Das Wort, das man beim Leihpferd hören will. ⚠️ In Großbritannien ist « he's a real schoolmaster » das größte Lob für ein Schulpferd: Es unterrichtet den Reiter.",
          ja:"借りる馬について、いちばん聞きたい言葉。⚠️ イギリスで « he's a real schoolmaster » は学校馬への最高の賛辞です。騎手に教えてくれる馬、という意味です。" } },

  { ref:"chaud", lecon:4, coll:"identite",
    mots:{ fr:{m:"chaud"}, en:{m:"hot", p:"hott", var:"sharp · fizzy"},
           es:{m:"nervioso", var:"caliente"}, it:{m:"caldo", var:"nervoso"},
           de:{m:"heiß", p:"haïss", var:"nervös"}, ja:{m:"気性難", p:"kishōnan", var:"神経質 = nerveux"} },
    def:{ fr:"Un cheval chaud n'est pas méchant : il réagit vite et fort. L'anglais a les images les plus parlantes — **sharp** (vif comme une lame), **fizzy** (pétillant).",
          en:"A hot horse is not a mean one: it reacts fast and strongly. English has the liveliest images: sharp, fizzy.",
          es:"Un caballo caliente no es malo: reacciona rápido y fuerte. El inglés tiene las imágenes más elocuentes — **sharp** (vivo como una hoja), **fizzy** (burbujeante).",
          it:"Un cavallo caldo non è cattivo: reagisce veloce e forte. L'inglese ha le immagini più parlanti — **sharp** (vivo come una lama), **fizzy** (frizzante).",
          de:"Ein heißes Pferd ist nicht böse: Es reagiert schnell und heftig. Das Englische hat die sprechendsten Bilder — **sharp** (scharf wie eine Klinge), **fizzy** (sprudelnd).",
          ja:"「熱い」馬は悪い馬ではありません。反応が速く、強いだけです。英語のたとえがいちばん雄弁です — **sharp**（刃のように鋭い）、**fizzy**（炭酸のようにはじける）。" } },

  { ref:"cheval-ecole", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval d'école"}, en:{m:"the school horse", p:"skoul horss", var:"riding school horse"},
           es:{m:"el caballo de escuela", var:"el caballo de picadero"}, it:{m:"il cavallo da scuola"},
           de:{m:"das Schulpferd", p:"choul-pfèrt"}, ja:{m:"練習馬", p:"renshūba"} }, // ??
    def:{ fr:"Celui qu'on te confiera à l'étranger. Le demander par son nom exact, dans la langue du pays, change complètement l'accueil.",
          en:"The horse you will be given abroad. Asking for it by its proper local name changes the welcome entirely.",
          es:"El que te confiarán en el extranjero. Pedirlo por su nombre exacto, en la lengua del país, cambia por completo la acogida.",
          it:"Quello che ti affideranno all'estero. Chiederlo con il suo nome esatto, nella lingua del paese, cambia completamente l'accoglienza.",
          de:"Das Pferd, das man dir im Ausland anvertraut. Es mit dem richtigen Wort in der Landessprache zu erbitten, verändert den Empfang völlig.",
          ja:"海外で任されるのは、この馬です。その国の言葉で、正確な名前で頼めるかどうかで、迎えられ方がまるで変わります。" } },

  { ref:"race", lecon:4, coll:"identite",
    mots:{ fr:{m:"la race"}, en:{m:"the breed", p:"bride"},
           es:{m:"la raza"}, it:{m:"la razza"},
           de:{m:"die Rasse", p:"ra-se"}, ja:{m:"品種", p:"hinshu", var:"馬種"} }, // ??
    def:{ fr:"⚠️ Faux ami redoutable : en anglais c'est **the breed**, jamais « the race » — race veut dire la course. « What race is he ? » fera comprendre « dans quelle course court-il ? ».",
          en:"A nasty false friend: it is the breed, never the race. « What race is he ? » will be heard as « which race does he run in ? ».",
          es:"⚠️ Falso amigo temible: en inglés es **the breed**, jamás « the race » — race significa la carrera. « What race is he ? » se entenderá como « ¿en qué carrera corre? ».",
          it:"⚠️ Falso amico temibile: in inglese è **the breed**, mai « the race » — race significa la corsa. « What race is he ? » sarà capito come « in che corsa corre? ».",
          de:"⚠️ Gefährlicher falscher Freund: Auf Englisch heißt es **the breed**, nie « the race » — race ist das Rennen. « What race is he ? » versteht man als « In welchem Rennen läuft er? ».",
          ja:"⚠️ 恐るべき偽りの友：英語では **the breed** であって、決して « the race » ではありません — race は競走の意味。« What race is he ? » は「どのレースに出るの？」と受け取られます。" } },

  { ref:"demi-sang", lecon:4, coll:"identite",
    mots:{ fr:{m:"le sang chaud", var:"le demi-sang"}, en:{m:"the warmblood", p:"ouorm-bleude"},
           es:{m:"el caballo de sangre caliente"}, it:{m:"il cavallo a sangue caldo"},
           de:{m:"das Warmblut", p:"varm-bloute"}, ja:{m:"温血種", p:"onketsushu"} },
    def:{ fr:"Les chevaux de sport européens, entre le pur-sang et le trait. L'allemand possède la série complète et parfaitement logique : Vollblut (pur-sang), Warmblut (sang chaud), Kaltblut (trait).",
          en:"The European sport horses, between the thoroughbred and the draught horse. German has the whole tidy series: Vollblut, Warmblut, Kaltblut.",
          es:"Los caballos de deporte europeos, entre el purasangre y el de tiro. El alemán posee la serie completa y perfectamente lógica: Vollblut (purasangre), Warmblut (sangre caliente), Kaltblut (tiro).",
          it:"I cavalli sportivi europei, tra il purosangue e il cavallo da tiro. Il tedesco possiede la serie completa e perfettamente logica: Vollblut (purosangue), Warmblut (sangue caldo), Kaltblut (tiro).",
          de:"Die europäischen Sportpferde, zwischen Vollblut und Kaltblut. Das Deutsche hat die vollständige, völlig logische Reihe: Vollblut, Warmblut, Kaltblut.",
          ja:"ヨーロッパのスポーツホース。サラブレッドと輓馬のあいだに位置します。ドイツ語には完璧に論理的な三点セットがあります：Vollblut（純血）、Warmblut（温血）、Kaltblut（冷血）。" } },

  { ref:"trait", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval de trait"}, en:{m:"the draught horse", p:"draft horss", var:"draft horse (US)"},
           es:{m:"el caballo de tiro"}, it:{m:"il cavallo da tiro"},
           de:{m:"das Kaltblut", p:"kalt-bloute"}, ja:{m:"重種", p:"jūshu"} }, // ??
    def:{ fr:"Les grands chevaux de force. ⚠️ Le mot anglais s'écrit draught en Grande-Bretagne et draft aux États-Unis, mais se prononce « draft » des deux côtés.",
          en:"The big strong horses. The word is spelt draught in Britain and draft in America, but pronounced « draft » on both sides.",
          es:"Los grandes caballos de fuerza. ⚠️ La palabra inglesa se escribe draught en Gran Bretaña y draft en Estados Unidos, pero se pronuncia « draft » en ambos lados.",
          it:"I grandi cavalli da forza. ⚠️ La parola inglese si scrive draught in Gran Bretagna e draft negli Stati Uniti, ma si pronuncia « draft » da entrambe le parti.",
          de:"Die großen Kraftpferde. ⚠️ Das englische Wort schreibt sich draught in Großbritannien und draft in den USA — gesprochen wird beides « draft ».",
          ja:"力仕事のための大きな馬たち。⚠️ 英語の綴りはイギリスで draught、アメリカで draft — 発音はどちらも「ドラフト」です。" } }
  ],

  /* ==================================================================
     BLOC PROPRE AU VOYAGE — à ne pas confondre avec les 42 concepts.
     Le moteur ne charge que la clé du voyage en cours.
     Ajouter une clé par pays : "pt" (lusitanien), "us" (quarter horse)…
     ================================================================== */
  races: {
    "gb-irl": [

      { ref:"pur-sang", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le pur-sang anglais"}, en:{m:"the Thoroughbred", p:"seu-rô-brède"},
               es:{m:"el pura sangre inglés"}, it:{m:"il purosangue inglese"},
               de:{m:"das Englische Vollblut", p:"vol-bloute"}, ja:{m:"サラブレッド", p:"sarabureddo"} },
        def:{ fr:"Né en Angleterre au XVIIIᵉ siècle de trois étalons orientaux. Le cheval de course par excellence — c'est lui qu'on voit s'entraîner à Newmarket et à Lambourn. ⚠️ Toujours avec une majuscule en anglais.",
              en:"Created in England in the 18th century from three eastern stallions. The racehorse above all others, and the one training at Newmarket and Lambourn." } },

      { ref:"connemara", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Connemara"}, en:{m:"the Connemara pony", p:"ko-ne-ma-ra pô-ni"},
               es:{m:"el poni Connemara"}, it:{m:"il pony Connemara"},
               de:{m:"das Connemara-Pony", p:"ko-ne-ma-ra pô-ni"}, ja:{m:"コネマラポニー", p:"konemara ponī"} },
        def:{ fr:"Le poney irlandais du comté de Galway, gris le plus souvent, sûr et sauteur. Souvent pile à la limite des 1,48 m, ce qui en fait autant un poney de club qu'un cheval de concours.",
              en:"Ireland's pony from County Galway, usually grey, sure-footed and a natural jumper — often right on the 1.48 m line." } },

      { ref:"welsh-cob", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Welsh cob"}, en:{m:"the Welsh cob", p:"ouèlch kob", var:"Section D"},
               es:{m:"el cob galés"}, it:{m:"il cob gallese"},
               de:{m:"der Welsh Cob", p:"ouèlch kob"}, ja:{m:"ウェルシュコブ", p:"werushu kobu"} },
        def:{ fr:"Le plus grand des quatre types gallois (section D), trapu, énergique, au trot très relevé. Le poney gallois se décline en sections A, B, C et D, de la plus petite à la plus grande.",
              en:"The largest of the four Welsh types (Section D), stocky and energetic with a high knee action. Welsh ponies run from Section A to D, smallest to largest." } },

      { ref:"irish-draught", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"l'Irish Draught"}, en:{m:"the Irish Draught", p:"aï-riche draft"},
               es:{m:"el caballo de tiro irlandés"}, it:{m:"il cavallo da tiro irlandese"},
               de:{m:"das Irish Draught", p:"aï-riche draft"}, ja:{m:"アイリッシュドラフト", p:"airisshu dorafuto"} },
        def:{ fr:"Le cheval de ferme irlandais, puissant mais pas lourd, à l'origine de tous les bons chevaux de concours du pays. ⚠️ Draught ne veut pas dire « trait » au sens du Percheron : il monte très bien.",
              en:"Ireland's farm horse, powerful without being heavy, and the foundation of the country's competition horses." } },

      { ref:"irish-sport-horse", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"l'Irish Sport Horse"}, en:{m:"the Irish Sport Horse", p:"aï-riche sport horss", var:"ISH"},
               es:{m:"el caballo de deporte irlandés"}, it:{m:"il cavallo sportivo irlandese"},
               de:{m:"das Irish Sport Horse", p:"aï-riche sport horss"}, ja:{m:"アイリッシュスポーツホース", p:"airisshu supōtsu hōsu"} },
        def:{ fr:"Le croisement Irish Draught × pur-sang : le meilleur cheval de concours complet du monde depuis des décennies. C'est le produit phare des haras de Kildare.",
              en:"Irish Draught crossed with Thoroughbred: for decades the world's best eventing horse, and the flagship product of the Kildare studs." } },

      { ref:"cob-irlandais", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le cob irlandais"}, en:{m:"the Irish cob", p:"aï-riche kob", var:"gypsy cob · Traveller horse"},
               es:{m:"el cob irlandés"}, it:{m:"il cob irlandese"},
               de:{m:"der Tinker", p:"tin-keur"}, ja:{m:"アイリッシュコブ", p:"airisshu kobu"} },
        def:{ fr:"Le cheval pie à longs fanons des gens du voyage irlandais. ⚠️ Cas de faux ami à l'envers : les pays germanophones l'appellent **Tinker**, un mot que les Irlandais eux-mêmes considèrent comme insultant. Dire Irish cob.",
              en:"The feathered piebald horse of the Irish Travellers. German-speaking countries call it Tinker, a word the Irish themselves find offensive — say Irish cob." } },

      { ref:"shetland", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Shetland"}, en:{m:"the Shetland pony", p:"chètt-leunde pô-ni"},
               es:{m:"el poni Shetland"}, it:{m:"il pony Shetland"},
               de:{m:"das Shetlandpony", p:"chètt-lant-pô-ni"}, ja:{m:"シェットランドポニー", p:"shettorando ponī"} },
        def:{ fr:"Le plus petit et le plus fort au monde en proportion, né des îles au nord de l'Écosse. Le premier poney de beaucoup d'enfants britanniques, et une force de caractère à la mesure de sa taille.",
              en:"The world's smallest and, pound for pound, strongest pony, from the islands north of Scotland — and a character to match." } },

      { ref:"shire", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Shire"}, en:{m:"the Shire horse", p:"chaï-eur horss"},
               es:{m:"el caballo Shire"}, it:{m:"il cavallo Shire"},
               de:{m:"das Shire Horse", p:"chaï-eur horss"}, ja:{m:"シャイヤー", p:"shaiyā"} },
        def:{ fr:"Le géant anglais, jusqu'à 1,90 m au garrot et une tonne : la plus grande race de chevaux du monde. Autrefois attelé aux brasseries, aujourd'hui sauvé par les passionnés.",
              en:"The English giant, up to 1.90 m and a tonne in weight: the largest horse breed in the world, once the brewers' horse." } }
    ]
  },

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-robe", lecon:1,
      fr:"C'est quoi, sa robe ?",
      en:"What colour is he ?",
      es:"¿ De qué capa es ?",
      it:"Di che mantello è ?",
      de:"Welche Fellfarbe hat er ?",
      ja:"毛色 は 何 です か ?" },
    { ref:"jument-grise", lecon:1,
      fr:"Une jument grise, avec une liste.",
      en:"A grey mare with a blaze.",
      es:"Una yegua torda con careta.",
      it:"Una giumenta grigia con lista.",
      de:"Eine Schimmelstute mit Blesse.",
      ja:"芦毛 の 牝馬、 流星 つき。" },
    { ref:"combien-mesure", lecon:2,
      fr:"Combien mesure-t-il au garrot ?",
      en:"How many hands is he ?",
      es:"¿ Cuánta alzada tiene ?",
      it:"Quanto è alto al garrese ?",
      de:"Welches Stockmaß hat er ?",
      ja:"体高 は どれ くらい です か ?" },
    { ref:"quel-age", lecon:4,
      fr:"Quel âge a-t-il ?",
      en:"How old is he ?",
      es:"¿ Cuántos años tiene ?",
      it:"Quanti anni ha ?",
      de:"Wie alt ist er ?",
      ja:"何歳 です か ?" },
    { ref:"comment-est-il", lecon:4,
      fr:"Il est calme ? Je débute.",
      en:"Is he quiet ? I'm a beginner.",
      es:"¿ Es tranquilo ? Soy principiante.",
      it:"È tranquillo ? Sono principiante.",
      de:"Ist er brav ? Ich bin Anfängerin.",
      ja:"おとなしい です か ? 初心者 です。" },
    { ref:"chaud-debutant", lecon:4,
      fr:"Je préfère un cheval d'école.",
      en:"I'd rather have a school horse.",
      es:"Prefiero un caballo de escuela.",
      it:"Preferisco un cavallo da scuola.",
      de:"Ich möchte lieber ein Schulpferd.",
      ja:"練習馬 の ほう が いい です。" },
    { ref:"quelle-race", lecon:4,
      fr:"C'est quelle race ?",
      en:"What breed is he ?",
      es:"¿ De qué raza es ?",
      it:"Di che razza è ?",
      de:"Welche Rasse ist er ?",
      ja:"品種 は 何 です か ?" },
    { ref:"pied-chaud", lecon:3,
      fr:"Boulet chaud : appelle le maréchal.",
      en:"His fetlock is warm — call the farrier.",
      es:"Menudillo caliente: llama al herrador.",
      it:"Nodello caldo: chiama il maniscalco.",
      de:"Die Fessel ist warm — ruf den Schmied.",
      ja:"球節 が 熱い です。 装蹄師 を 呼ん で。" }
  ],

  /* ==================================================================
     LE DIALOGUE DU CONNEMARA — 15 août 2026, session 214.

     🟥 CLÉ INERTE au moment où elle est posée : le moteur
     (lingo-dialogue.html) la lira, mais rien d'autre. Poser la clé ne
     change RIEN à l'écran du chapitre.

     LA SCÈNE : on te présente le cheval que tu vas monter, et tu
     apprends à le lire. 22 phrases, 7 temps, 8 entendues.

     🟥 LE CRITÈRE DE BLANDINE, 15/08, celui qui a taillé cette liste :
     « c'est juste que dans les phrases à prononcer pour pouvoir se
     débrouiller sur place, en dehors d'un achat de cheval j'ai jamais
     eu à poser une telle question ». Une phrase n'existe QUE si on la
     dit vraiment sur place. Un mot du lexique n'a PAS besoin d'une
     phrase : il s'apprend en lisant.

     PARTIS AILLEURS, sur sa décision :
     · `passeport` et `puce` → VÉRONE (le commerce). On ne demande pas
       le passeport d'un cheval de club — seulement quand on l'achète.
     · `fer` perdu et `marechal` → LAMBOURN (le pansage).
     · boulet chaud → KILDARE (les urgences). C'est une alerte.
     · `poulain` + foal/colt/filly → GOLEGÃ (l'élevage) : « on devrait
       peut-être voir ça plutôt en élevage ». Le chapitre garde les
       mots, la scène du poulain se jouera là où il naît.

     🟥 LA PHRASE 5-6, DÉCISION DE BLANDINE (choix C proposé, validé
     « C ») : la question dit « un entier », la réponse du club explique
     qu'un entier qui fait la saillie s'appelle un étalon. ENTIER n'est
     PAS au lexique (qui porte `etalon`) — et c'est voulu : la nuance
     s'enseigne dans la réponse, sans ajouter une entrée à traduire en
     six langues. ⚠️ En anglais : « entire » pour le non castré,
     « stallion » réservé au reproducteur. NE PAS uniformiser.

     ⚠️ LES HANDS (temps 4) sont le vrai piège du chapitre, déjà signalé
     en tête de fichier. On l'apprend en l'ENTENDANT puis en demandant
     la conversion — « fourteen two », sans le mot « hands », comme le
     disent les Irlandais.

     ⚠️ « race » → « breed » en anglais, JAMAIS « race » (= la course).
     Piège déjà porté par le fichier.

     ⚠️ FRANÇAIS SEUL. Ni anglais ni es/it/de/ja : ils seront proposés à
     Blandine pour relecture, l'anglais d'abord, comme pour Le Morne.
     Règle : mieux vaut une absence qu'une erreur.

     `dit` : "joueuse" = elle produit · "club" = elle entend et comprend.
  ================================================================== */
  dialogue: {
    ville: "connemara", lecon: 4, temps: 7, langues: ["fr","en","es","it","de","ja"],   /* 22 phrases */

    phrases: [

      /* ---- temps 1 · on me présente le cheval ---- */
      { ref:"d-voici-cheval", temps:1, dit:"club", mots:[],
        fr:"Voici ton cheval pour aujourd'hui.",
        en:"This is your horse for today.",
        es:"Este es tu caballo para hoy.",
        it:"Ecco il tuo cavallo per oggi.",
        de:"Das ist dein Pferd für heute.",
        ja:"これ が 今日 の あなた の 馬 です。" },

      { ref:"d-son-nom", temps:1, dit:"joueuse", mots:[],
        fr:"Comment s'appelle-t-il ?",
        en:"What's his name?",
        es:"¿Cómo se llama?",
        it:"Come si chiama?",
        de:"Wie heißt er?",
        ja:"名前 は 何 です か ?" },

      { ref:"d-poney-cheval", temps:1, dit:"joueuse", mots:["poney"],
        fr:"C'est un poney ou un cheval ?",
        en:"Is he a pony or a horse?",
        es:"¿Es un poni o un caballo?",
        it:"È un pony o un cavallo?",
        de:"Ist er ein Pony oder ein Pferd?",
        ja:"ポニー です か、 馬 です か ?" },

      { ref:"d-quel-age", temps:1, dit:"joueuse", mots:["age"],
        fr:"Quel âge a-t-il ?",
        en:"How old is he?",
        es:"¿Cuántos años tiene?",
        it:"Quanti anni ha?",
        de:"Wie alt ist er?",
        ja:"何歳 です か ?" },

      /* 🟥 Choix C de Blandine : la question pose les trois mots, la
         réponse enseigne la nuance entier / étalon. */
      { ref:"d-hongre-jument-entier", temps:1, dit:"joueuse", mots:["hongre","jument"],
        fr:"C'est un hongre, une jument ou un entier ?",
        en:"Is he a gelding, a mare or entire?",
        es:"¿Es un caballo castrado, una yegua o un entero?",
        it:"È un castrone, una cavalla o un intero?",
        de:"Ist es ein Wallach, eine Stute oder ein Hengst?",
        ja:"せん馬 です か、 牝馬 です か、 それとも 去勢 し て い ない 牡馬 です か ?" },

      { ref:"d-r-hongre", temps:1, dit:"club", mots:["hongre","etalon"],
        fr:"C'est un hongre : un mâle castré. Un entier qui fait la saillie, on l'appelle un étalon.",
        en:"He's a gelding — a castrated male. An entire horse used for breeding is called a stallion.",
        es:"Es un caballo castrado. Un entero que cubre se llama semental.",
        it:"È un castrone: un maschio castrato. Un intero che monta si chiama stallone.",
        de:"Es ist ein Wallach, ein kastrierter Hengst. Ein unkastrierter Hengst in der Zucht heißt Deckhengst.",
        ja:"せん馬 です。 去勢 し た 牡馬 の こと。 繁殖 に 使う 牡馬 は 種牡馬 と 呼び ます。" },

      /* ---- temps 2 · sa robe ---- */
      { ref:"d-quelle-robe", temps:2, dit:"joueuse", mots:["robe"],
        fr:"De quelle robe est-il ?",
        en:"What colour is he?",
        es:"¿De qué capa es?",
        it:"Di che mantello è?",
        de:"Welche Fellfarbe hat er?",
        ja:"毛色 は 何 です か ?" },

      { ref:"d-r-gris", temps:2, dit:"club", mots:["gris"],
        fr:"C'est un gris : il est né foncé et il blanchit avec l'âge.",
        en:"He's a grey — born dark, he whitens with age.",
        es:"Es un tordo: nace oscuro y se aclara con la edad.",
        it:"È un grigio: nasce scuro e sbianca con l'età.",
        de:"Er ist ein Schimmel: dunkel geboren, wird er mit den Jahren weiß.",
        ja:"芦毛 です。 生まれ た とき は 暗く て、 年 と ともに 白く なり ます。" },

      { ref:"d-bai-criniere", temps:2, dit:"joueuse", mots:["bai"],
        fr:"Le bai, c'est celui qui a la crinière noire ?",
        en:"A bay is the one with a black mane, isn't it?",
        es:"El castaño es el que tiene las crines negras, ¿verdad?",
        it:"Il baio è quello con la criniera nera, vero?",
        de:"Der Brauner ist der mit der schwarzen Mähne, oder?",
        ja:"鹿毛 は たてがみ が 黒い 馬 です よ ね ?" },

      /* ---- temps 3 · ses marques ---- */
      { ref:"d-liste-etoile", temps:3, dit:"joueuse", mots:["liste","etoile"],
        fr:"Est-ce qu'il a une liste ou une étoile ?",
        en:"Has he got a blaze or a star?",
        es:"¿Tiene lista o lucero?",
        it:"Ha una lista o una stella?",
        de:"Hat er eine Blesse oder einen Stern?",
        ja:"流星 が あり ます か、 星 が あり ます か ?" },

      { ref:"d-r-balzane", temps:3, dit:"club", mots:["balzane"],
        fr:"Il a une balzane au postérieur gauche.",
        en:"He's got a sock on his near hind leg.",
        es:"Tiene un calzado en la pata trasera izquierda.",
        it:"Ha un balzano al posteriore sinistro.",
        de:"Er hat ein weißes Beinabzeichen hinten links.",
        ja:"左 の 後肢 に 白斑 が あり ます。" },

      /* ---- temps 4 · sa taille, et les hands ---- */
      { ref:"d-combien-garrot", temps:4, dit:"joueuse", mots:["taille","garrot"],
        fr:"Il fait combien au garrot ?",
        en:"How tall is he?",
        es:"¿Cuánta alzada tiene?",
        it:"Quanto è alto al garrese?",
        de:"Welches Stockmaß hat er?",
        ja:"体高 は どのくらい です か ?" },

      { ref:"d-r-quatorze-deux", temps:4, dit:"club", mots:["taille"],
        fr:"Il fait quatorze mains deux.",
        en:"He's fourteen two.",
        es:"Mide catorce dos en manos.",
        it:"È quattordici e due in mani.",
        de:"Er hat vierzehn zwei in Hands.",
        ja:"十四 ハンド 二 です。" },

      { ref:"d-en-centimetres", temps:4, dit:"joueuse", mots:["taille"],
        fr:"Ça fait combien en centimètres ?",
        en:"How much is that in centimetres?",
        es:"¿Cuánto es eso en centímetros?",
        it:"Quanto fa in centimetri?",
        de:"Wie viel ist das in Zentimetern?",
        ja:"それ は 何 センチ です か ?" },

      /* ---- temps 5 · son caractère ---- */
      { ref:"d-calme-ou-chaud", temps:5, dit:"joueuse", mots:["calme","chaud","caractere"],
        fr:"Est-ce qu'il est calme ou est-ce qu'il est chaud ?",
        en:"Is he quiet, or is he hot?",
        es:"¿Es tranquilo o es nervioso?",
        it:"È tranquillo o è caldo?",
        de:"Ist er brav oder ist er heiß?",
        ja:"おとなしい です か、 気性 が 強い です か ?" },

      { ref:"d-r-cheval-ecole", temps:5, dit:"club", mots:["cheval-ecole"],
        fr:"C'est un cheval d'école, il est très sage.",
        en:"He's a school horse — a real schoolmaster.",
        es:"Es un caballo de escuela, muy formal.",
        it:"È un cavallo da scuola, molto tranquillo.",
        de:"Es ist ein Schulpferd, sehr brav.",
        ja:"練習馬 です。 とても おとなしい です。" },

      { ref:"d-habitude-debutants", temps:5, dit:"joueuse", mots:[], motsAilleurs:["debutant"],
        fr:"Est-ce qu'il a l'habitude des débutants ?",
        en:"Is he used to beginners?",
        es:"¿Está acostumbrado a los principiantes?",
        it:"È abituato ai principianti?",
        de:"Ist er an Anfänger gewöhnt?",
        ja:"初心者 に 慣れ て い ます か ?" },

      { ref:"d-peur-de-quelque-chose", temps:5, dit:"joueuse", mots:["caractere"],
        fr:"Est-ce qu'il a peur de quelque chose ?",
        en:"Is there anything he's afraid of?",
        es:"¿Hay algo que le dé miedo?",
        it:"C'è qualcosa di cui ha paura?",
        de:"Gibt es etwas, wovor er Angst hat?",
        ja:"何か 怖がる もの は あり ます か ?" },

      /* ---- temps 6 · sa race ---- */
      { ref:"d-quelle-race", temps:6, dit:"joueuse", mots:["race"],
        fr:"Quelle est sa race ?",
        en:"What breed is he?",
        es:"¿De qué raza es?",
        it:"Di che razza è?",
        de:"Welche Rasse ist er?",
        ja:"品種 は 何 です か ?" },

      { ref:"d-r-connemara", temps:6, dit:"club", mots:["race","connemara"],
        fr:"C'est un connemara, la seule race de poney native d'Irlande.",
        en:"He's a Connemara pony, the only native pony breed in Ireland.",
        es:"Es un poni Connemara, la única raza de poni autóctona de Irlanda.",
        it:"È un pony Connemara, l'unica razza di pony autoctona d'Irlanda.",
        de:"Er ist ein Connemara-Pony, die einzige einheimische Ponyrasse Irlands.",
        ja:"コネマラポニー です。 アイルランド 唯一 の 在来 ポニー 品種 です。" },

      { ref:"d-pur-sang", temps:6, dit:"joueuse", mots:["pur-sang"],
        fr:"Est-ce que c'est un pur-sang ?",
        en:"Is he a Thoroughbred?",
        es:"¿Es un pura sangre inglés?",
        it:"È un purosangue inglese?",
        de:"Ist er ein Englisches Vollblut?",
        ja:"サラブレッド です か ?" },

      /* ---- temps 7 · ce que je dois vraiment savoir ---- */
      /* La phrase de Blandine, et la vraie question qu'on pose devant un
         cheval qu'on ne connaît pas. Elle remplace « demi-sang ou cheval
         de trait ? », question de catalogue. */
      { ref:"d-me-mefier", temps:7, dit:"joueuse", mots:["caractere"],
        fr:"Est-ce que je dois me méfier, ou est-ce qu'il est sympa ?",
        en:"Do I need to be careful with him, or is he kind?",
        es:"¿Tengo que tener cuidado con él, o es bueno?",
        it:"Devo stare attenta con lui, o è buono?",
        de:"Muss ich bei ihm aufpassen, oder ist er nett?",
        ja:"気 を つけ た ほう が いい です か、 それとも 優しい 馬 です か ?" }
    ]
  }
};
