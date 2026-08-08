/* hype-lingo-lex-elevage.js — Hype Linguae · l'élevage
   ==================================================================
   Écrit le 6 août 2026 pour Golegã (Portugal), sur délégation de
   Blandine : « Golegã c'est toi qui vois tu veux y mettre quoi ».

   POURQUOI L'ÉLEVAGE. C'est le plus gros trou du module : sur les 378
   mots d'origine, aucun ne parle de la naissance d'un cheval. On sait
   décrire sa robe, ses marques, son corps, mais pas d'où il vient. Le
   plan de production le prévoyait déjà pour cette ville
   (hype-linguae-production-suite.txt : « l'élevage : la poulinière, le
   poulain, le sevrage, la saillie, le stud-book, la lignée ») — ce
   fichier applique ce plan.

   ⚠️ NE PAS Y METTRE LA VENTE. `le marchand`, `l'essai`, `la visite
   d'achat`, `le prix`, `le contrat`, `la garantie` sont réservés à
   VÉRONE, et `le yearling`, `les ventes`, `le pedigree`, `la jument
   suitée` à LEXINGTON. Golegã fait naître, elle ne vend pas.

   ⚠️ TROIS ENTRÉES SONT DES RAPPELS : `poulain`, `etalon`, `jument`
   portent le même `ref` que dans hype-lingo-lex-cheval.js (et `poulain`
   aussi dans lex-poney.js). C'est voulu et documenté depuis le 5 août :
   la maîtrise est stockée par `ref`, donc un mot déjà croisé à Jerez ou
   à Lamotte arrive ici déjà acquis. Ne PAS les renommer.

   ⚠️ NEUF ENTRÉES SONT NEUVES et n'ont jamais été relues par un natif.
   Les plus à confirmer : `la saillie` (l'anglais distingue « covering »
   du service et « stud fee » du prix), `le stud-book` (mot anglais passé
   tel quel en français et en italien, mais l'allemand dit `Zuchtbuch`),
   et `le naisseur`, qui n'a pas d'équivalent exact en anglais — on dit
   simplement « the breeder ». À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` découpe la phrase en tuiles à remettre
   dans l'ordre, et sans espaces il n'y a rien à déplacer.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.elevage = {
  ref: "elevage",
  chapitre: 12,
  titre: { fr:"L'élevage", en:"Breeding", es:"La cría", it:"L'allevamento",
           de:"Die Zucht", ja:"繁殖" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · L'ÉLEVAGE ============ */

  /* ---- rappels ---- */

  { ref:"poulain", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"} },
    def:{ fr:"Le petit, jusqu'au sevrage puis jusqu'à un an. Déjà croisé à Jerez et à Lamotte : ici, tu le vois naître.",
          en:"The young one, until weaning and then its first year. Already met at Jerez and Lamotte: here you see it born.",
          es:"La cría, hasta el destete y luego hasta el año. Ya visto en Jerez y en Lamotte: aquí lo ves nacer.",
          it:"Il piccolo, fino allo svezzamento e poi fino a un anno. Già incontrato a Jerez e a Lamotte: qui lo vedi nascere.",
          de:"Das Junge, bis zum Absetzen und dann bis zum ersten Jahr. Schon in Jerez und Lamotte getroffen: Hier siehst du es zur Welt kommen.",
          ja:"離乳まで、そして一歳までの仔。ヘレスとラモットで出会った言葉です。ここでは、その誕生に立ち会います。" } },

  { ref:"etalon", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-lieune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèngst"}, ja:{m:"種牡馬", p:"shubokuba"} },
    def:{ fr:"Le mâle reproducteur. ⚠️ Tous les mâles non castrés sont des entiers ; seuls ceux qu'on fait reproduire sont des étalons.",
          en:"The breeding male. Careful: every uncastrated male is a colt or an entire; only those used for breeding are stallions.",
          es:"El macho reproductor. ⚠️ Todos los machos sin castrar son enteros; solo los que se hacen reproducir son sementales.",
          it:"Il maschio riproduttore. ⚠️ Tutti i maschi non castrati sono interi; solo quelli fatti riprodurre sono stalloni.",
          de:"Das Zuchtmännchen. ⚠️ Jeder unkastrierte ist ein Hengst — aber nur die, mit denen gezüchtet wird, sind Deckhengste.",
          ja:"繁殖に使う牡馬。⚠️ 去勢していない牡はみな「entier（完全な牡）」ですが、種牡馬と呼べるのは繁殖に供される馬だけです。" } },

  { ref:"jument", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la jument"}, en:{m:"the mare", p:"mèr"},
           es:{m:"la yegua"}, it:{m:"la cavalla", var:"la giumenta"},
           de:{m:"die Stute", p:"chtou-te"}, ja:{m:"牝馬", p:"hinba"} },
    def:{ fr:"La femelle. Elle porte onze mois environ, et on la fait souvent saillir peu après avoir mis bas.",
          en:"The female. She carries for about eleven months, and is often covered again soon after foaling.",
          es:"La hembra. Lleva unos once meses, y a menudo se la vuelve a cubrir poco después de parir.",
          it:"La femmina. Porta circa undici mesi, e spesso la si fa coprire di nuovo poco dopo il parto.",
          de:"Das weibliche Pferd. Sie trägt etwa elf Monate — und wird oft kurz nach dem Abfohlen wieder gedeckt.",
          ja:"メスの馬。妊娠期間はおよそ十一か月。出産のすぐあとに、また交配に出されることも多いのです。" } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"elevage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'élevage"}, en:{m:"the stud", p:"steud", var:"the breeding operation"},
           es:{m:"la cría", var:"la yeguada"}, it:{m:"l'allevamento"},
           de:{m:"die Zucht", p:"tsoukht", var:"das Gestüt"},
           ja:{m:"繁殖", p:"hanshoku"} },
    def:{ fr:"Faire naître des chevaux, et le lieu où on le fait. ⚠️ « The stud » désigne l'endroit ; l'activité se dit « breeding ». Ne pas confondre avec le haras d'État, qui est « the state stud ».",
          en:"Breeding horses, and the place where it is done. « The stud » is the place; the activity is « breeding ».",
          es:"Hacer nacer caballos, y el lugar donde se hace. ⚠️ « The stud » designa el sitio; la actividad se dice « breeding ». No confundir con el haras estatal, que es « the state stud ».",
          it:"Far nascere cavalli, e il luogo dove lo si fa. ⚠️ « The stud » indica il posto; l'attività si dice « breeding ». Da non confondere con il haras di Stato, « the state stud ».",
          de:"Pferde zur Welt bringen — und der Ort, an dem es geschieht. ⚠️ « The stud » ist der Ort; die Tätigkeit heißt « breeding ». Nicht mit dem Staatsgestüt verwechseln: « the state stud ».",
          ja:"馬を生ませること、そしてそれを行う場所。⚠️ « the stud » は場所を指し、営みのほうは « breeding » と言います。国立の牧場は « the state stud » — 混同しないこと。" } },

  { ref:"naisseur", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le naisseur", var:"l'éleveur"}, en:{m:"the breeder", p:"bri-deur"},
           es:{m:"el criador"}, it:{m:"l'allevatore"},
           de:{m:"der Züchter", p:"tsuchh-teur"}, ja:{m:"生産者", p:"seisansha"} },
    def:{ fr:"Celui qui décide des croisements et élève les poulains. ⚠️ Le français distingue le naisseur, qui fait naître, de l'éleveur, qui élève ensuite ; l'anglais n'a qu'un mot pour les deux.",
          en:"The one who chooses the matings and raises the foals. French separates the naisseur, who breeds, from the éleveur, who raises; English has one word for both.",
          es:"El que decide los cruces y cría los potros. ⚠️ El francés distingue el naisseur, que hace nacer, del éleveur, que cría después; el inglés tiene una sola palabra para los dos.",
          it:"Chi decide gli incroci e alleva i puledri. ⚠️ Il francese distingue il naisseur, che fa nascere, dall'éleveur, che alleva poi; l'inglese ha una sola parola per i due.",
          de:"Wer die Anpaarungen wählt und die Fohlen aufzieht. ⚠️ Das Französische trennt den naisseur, der züchtet, vom éleveur, der aufzieht; das Englische hat für beide ein Wort.",
          ja:"交配を決め、仔馬を育てる人。⚠️ フランス語は「生ませる人（naisseur）」と「育てる人（éleveur）」を区別しますが、英語はどちらも一語で済ませます。" } },

  { ref:"poulinière", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la poulinière"}, en:{m:"the broodmare", p:"broud-mèr"},
           es:{m:"la yegua de vientre"}, it:{m:"la fattrice"},
           de:{m:"die Zuchtstute", p:"tsoukht-chtou-te"},
           ja:{m:"繁殖牝馬", p:"hanshoku hinba"} },
    def:{ fr:"La jument gardée pour la reproduction. Beaucoup n'ont jamais été montées, et leur valeur se lit dans les performances de leurs produits.",
          en:"The mare kept for breeding. Many have never been ridden, and their worth is read in what their offspring achieve.",
          es:"La yegua guardada para la reproducción. Muchas jamás fueron montadas, y su valor se lee en los resultados de sus productos.",
          it:"La cavalla tenuta per la riproduzione. Molte non sono mai state montate, e il loro valore si legge nei risultati dei loro prodotti.",
          de:"Die für die Zucht gehaltene Stute. Viele wurden nie geritten — ihr Wert liest sich an den Leistungen ihrer Nachkommen ab.",
          ja:"繁殖のために置かれる牝馬。一度も乗られたことのない馬も多く、その価値は仔たちの成績に映し出されます。" } },

  { ref:"saillie", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la saillie"}, en:{m:"the covering", p:"ka-ve-ring"},
           es:{m:"la cubrición"}, it:{m:"la monta"},
           de:{m:"der Deckakt", p:"dèk-akt"}, ja:{m:"交配", p:"kōhai"} },
    def:{ fr:"L'accouplement, en main ou en liberté, ou par insémination. ⚠️ Le prix demandé pour un étalon ne se dit pas « covering » mais « stud fee ».",
          en:"The mating, in hand or at liberty, or by insemination. The fee asked for a stallion is a « stud fee », not a « covering ».",
          es:"El apareamiento, en mano o en libertad, o por inseminación. ⚠️ El precio pedido por un semental no se dice « covering » sino « stud fee ».",
          it:"L'accoppiamento, a mano o in libertà, o per inseminazione. ⚠️ Il prezzo chiesto per uno stallone non si dice « covering » ma « stud fee ».",
          de:"Die Paarung, an der Hand oder frei, oder per Besamung. ⚠️ Der Preis für einen Hengst heißt nicht « covering », sondern « stud fee ».",
          ja:"交配のこと。引き手をつけて、放して、あるいは人工授精で。⚠️ 種牡馬の料金は « covering » ではなく « stud fee » と言います。" } },

  { ref:"poulinage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le poulinage", var:"mettre bas"}, en:{m:"foaling", p:"fô-ling"},
           es:{m:"el parto"}, it:{m:"il parto"},
           de:{m:"die Geburt", p:"gue-bourt", var:"das Abfohlen"},
           ja:{m:"分娩", p:"bunben"} },
    def:{ fr:"La mise au monde. Elle dure souvent moins de trente minutes et arrive presque toujours la nuit — c'est pour ça qu'on veille.",
          en:"The birth. It often takes under thirty minutes and almost always happens at night — which is why someone sits up.",
          es:"El parto. Suele durar menos de treinta minutos y llega casi siempre de noche — por eso se vela.",
          it:"Il parto. Dura spesso meno di trenta minuti e arriva quasi sempre di notte — per questo si veglia.",
          de:"Die Geburt. Sie dauert oft unter dreißig Minuten und kommt fast immer nachts — darum wacht jemand.",
          ja:"出産のこと。三十分とかからないことが多く、ほとんどいつも夜にやって来ます — だから人は夜通し見守るのです。" } },

  { ref:"sevrage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le sevrage"}, en:{m:"the weaning", p:"oui-ning"},
           es:{m:"el destete"}, it:{m:"lo svezzamento"},
           de:{m:"das Absetzen", p:"ap-zè-tseune"}, ja:{m:"離乳", p:"rinyū"} },
    def:{ fr:"La séparation du poulain et de sa mère, vers cinq ou six mois. On sépare progressivement, et rarement seul : un poulain sevré avec un compagnon crie moins.",
          en:"Separating foal from mother, at around five or six months. It is done gradually, and rarely alone: a foal weaned with a companion calls less.",
          es:"La separación del potro y su madre, hacia los cinco o seis meses. Se hace progresivamente, y rara vez solo: un potro destetado con un compañero llama menos.",
          it:"La separazione del puledro dalla madre, verso i cinque o sei mesi. Si fa progressivamente, e raramente da solo: un puledro svezzato con un compagno chiama meno.",
          de:"Die Trennung von Fohlen und Mutter, mit fünf bis sechs Monaten. Schrittweise, und selten allein: Ein mit einem Gefährten abgesetztes Fohlen ruft weniger.",
          ja:"五、六か月ごろに行う、仔馬と母馬の別れ。少しずつ、そしてめったに一頭きりでは行いません。仲間と一緒に離乳した仔馬は、鳴く声が少ないのです。" } },

  { ref:"lignee", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la lignée"}, en:{m:"the bloodline", p:"bleud-laïne"},
           es:{m:"la línea de sangre"}, it:{m:"la linea di sangue"},
           de:{m:"die Blutlinie", p:"bloutt-li-nie"}, ja:{m:"血統", p:"kettō"} },
    def:{ fr:"La suite des ancêtres dont on attend un caractère ou un modèle. C'est la question qu'on pose en premier dans un élevage : « de quelle lignée vient-il ? »",
          en:"The line of ancestors from which a temperament or a type is expected. It is the first question asked at a stud: « what is he bred from ? »",
          es:"La serie de antepasados de los que se espera un carácter o un modelo. Es la primera pregunta en una cría: « ¿de qué línea viene? »",
          it:"La serie di antenati da cui si attende un carattere o un modello. È la prima domanda in un allevamento: « da quale linea viene? »",
          de:"Die Ahnenreihe, von der man Charakter oder Typ erwartet. Die erste Frage im Gestüt: « Aus welcher Linie stammt er? »",
          ja:"気性や体型のよりどころとなる、祖先の連なり。生産牧場で最初に交わされる問いです —「どの血統から来ていますか？」" } },

  { ref:"stud-book", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le stud-book"}, en:{m:"the stud book"},
           es:{m:"el libro genealógico"}, it:{m:"il libro genealogico"},
           de:{m:"das Zuchtbuch", p:"tsoukht-boukh"},
           ja:{m:"血統登録簿", p:"kettō tōrokubo"} },
    def:{ fr:"Le registre officiel d'une race : qui y est inscrit en est, qui n'y est pas n'en est pas. ⚠️ Le français et l'italien gardent le mot anglais ; l'allemand et l'espagnol le traduisent.",
          en:"The official register of a breed: in it you belong, out of it you do not. French and Italian keep the English word; German and Spanish translate it.",
          es:"El registro oficial de una raza: quien está inscrito pertenece, quien no, no. ⚠️ El francés y el italiano guardan la palabra inglesa; el alemán y el español la traducen.",
          it:"Il registro ufficiale di una razza: chi vi è iscritto ne fa parte, chi no, no. ⚠️ Il francese e l'italiano tengono la parola inglese; il tedesco e lo spagnolo la traducono.",
          de:"Das offizielle Register einer Rasse: Wer drinsteht, gehört dazu — wer nicht, nicht. ⚠️ Französisch und Italienisch behalten das englische Wort; Deutsch und Spanisch übersetzen es.",
          ja:"その馬種の公式登録簿。載っていれば一員、載っていなければ違う — それだけのこと。⚠️ 仏語と伊語は英語をそのまま使い、独語と西語は翻訳しました。" } },

  { ref:"lusitanien", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le lusitanien"}, en:{m:"the Lusitano", p:"lou-zi-ta-no"},
           es:{m:"el lusitano"}, it:{m:"il lusitano"},
           de:{m:"der Lusitano"}, ja:{m:"ルシタノ", p:"rushitano"} },
    def:{ fr:"La race du Portugal : encolure ronde et haute, crins longs, très maniable. Cousine du pura raza española, dont elle a été séparée officiellement en 1967.",
          en:"Portugal's breed: a round, high-set neck, long mane, remarkably handy. Cousin to the pura raza española, from which it was officially separated in 1967.",
          es:"La raza de Portugal: cuello redondo y alto, crines largas, muy manejable. Prima del pura raza española, de la que fue separada oficialmente en 1967.",
          it:"La razza del Portogallo: incollatura rotonda e alta, crini lunghi, molto maneggevole. Cugina del pura raza española, da cui fu separata ufficialmente nel 1967.",
          de:"Portugals Rasse: runder, hoch angesetzter Hals, langes Langhaar, äußerst wendig. Cousine des Pura Raza Española, von dem sie 1967 offiziell getrennt wurde.",
          ja:"ポルトガルの馬種。丸く高い首、長いたてがみ、抜群の従順さ。スペインのプーラ・ラサ・エスパニョーラの従兄弟で、正式に分かれたのは1967年です。" } },

  /* ---- ajouts du 8 août 2026, liste de Blandine : « hongre castration
     agrément pouliche insémination fraîche/réfrigérée/congelée jument
     pleine modèle et allures présenté en main ». Le haras, le pedigree
     et les ventes aux enchères restent à LEXINGTON ; le tarif et la
     race sont déjà ailleurs (règle territoriale de l'en-tête). ---- */

  { ref:"hongre", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le hongre"}, en:{m:"the gelding", p:"guèl-ding"},
           es:{m:"el caballo capado", var:"el castrado"}, it:{m:"il castrone"},
           de:{m:"der Wallach", p:"va-lakh"}, ja:{m:"騸馬", p:"senba"} },
    def:{ fr:"Le mâle castré — déjà croisé à Jerez, mais ici on comprend d'où il vient : c'est la sortie de l'élevage. Un hongre ne reproduira jamais, et c'est justement ce qui fait de lui la monture la plus paisible.",
          en:"The castrated male — met at Jerez, but here you see where he comes from: it is the way out of breeding. A gelding will never reproduce, and that is exactly what makes him the calmest ride.",
          es:"El macho castrado — visto en Jerez, pero aquí se entiende de dónde viene: es la salida de la cría. Un capado jamás reproducirá, y eso es justo lo que hace de él la montura más tranquila.",
          it:"Il maschio castrato — visto a Jerez, ma qui si capisce da dove viene: è l'uscita dall'allevamento. Un castrone non riprodurrà mai, ed è proprio ciò che ne fa la cavalcatura più tranquilla.",
          de:"Das kastrierte männliche Pferd — in Jerez getroffen, aber hier versteht man, woher es kommt: Es ist der Ausgang aus der Zucht. Ein Wallach wird nie decken — genau das macht ihn zum ruhigsten Reitpferd.",
          ja:"去勢された牡馬 — ヘレスで出会いましたが、その出どころが分かるのはここです。繁殖から退く道なのです。騸馬は決して仔を残しません。そしてまさにそのことが、彼を最も穏やかな乗り馬にしています。" } },

  { ref:"castration", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la castration", var:"hongrer"}, en:{m:"the gelding", p:"guèl-ding", var:"to geld"},
           es:{m:"la castración"}, it:{m:"la castrazione"},
           de:{m:"die Kastration", var:"legen"}, ja:{m:"去勢", p:"kyosei"} },
    def:{ fr:"L'opération qui fait d'un entier un hongre, le plus souvent entre un et trois ans. ⚠️ L'anglais emploie le même mot pour l'opération et pour le cheval : « the gelding » — le contexte tranche. Le verbe français est joli : hongrer.",
          en:"The operation that turns an entire into a gelding, usually between one and three. English uses one word for the operation and the horse — « the gelding » — and context decides. The French verb is lovely: hongrer.",
          es:"La operación que convierte un entero en capado, casi siempre entre uno y tres años. ⚠️ El inglés usa la misma palabra para la operación y el caballo: « the gelding » — decide el contexto.",
          it:"L'operazione che fa di un intero un castrone, di solito tra uno e tre anni. ⚠️ L'inglese usa la stessa parola per l'operazione e il cavallo: « the gelding » — decide il contesto.",
          de:"Der Eingriff, der aus einem Hengst einen Wallach macht, meist zwischen ein und drei Jahren. ⚠️ Das Englische nutzt EIN Wort für Eingriff und Pferd: « the gelding » — der Kontext entscheidet. Der Stallausdruck ist « legen ».",
          ja:"完全な牡を騸馬に変える手術。ふつう一歳から三歳のあいだに行います。⚠️ 英語は手術も馬も同じ « the gelding » — 決め手は文脈です。フランス語の動詞は美しい響きです：hongrer。" } },

  { ref:"pouliche", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la pouliche"}, en:{m:"the filly", p:"fi-li"},
           es:{m:"la potra", var:"la potranca"}, it:{m:"la puledra"},
           de:{m:"das Stutfohlen", p:"chtoutt-fô-leune", var:"die Jungstute"},
           ja:{m:"牝の子馬", p:"mesu no kouma"} },
    def:{ fr:"La jeune femelle, jusqu'à ses premières années. ⚠️ Déjà vu à Connemara : l'anglais dit filly pour elle et colt pour le jeune mâle — sur un champ de courses, on n'entend que ces deux mots-là.",
          en:"The young female, through her first years. As seen at Connemara: English says filly for her and colt for the young male — on a racecourse you hear nothing else.",
          es:"La hembra joven, en sus primeros años. ⚠️ Como en Connemara: el inglés dice filly para ella y colt para el macho joven — en un hipódromo no se oye otra cosa.",
          it:"La giovane femmina, nei suoi primi anni. ⚠️ Come a Connemara: l'inglese dice filly per lei e colt per il giovane maschio — su un ippodromo non si sente altro.",
          de:"Das junge weibliche Pferd, in seinen ersten Jahren. ⚠️ Wie am Connemara gesehen: Englisch sagt filly für sie und colt für den jungen Hengst — auf der Rennbahn hört man nur diese beiden.",
          ja:"若い牝馬のこと。⚠️ コネマラで見たとおり、英語は牝の仔を filly、牡の仔を colt と呼び分けます — 競馬場で聞こえてくるのは、この二語ばかりです。" } },

  { ref:"agrement", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'agrément"}, en:{m:"the licensing", p:"laï-seune-sing", var:"the grading"},
           es:{m:"la aprobación"}, it:{m:"l'approvazione"},
           de:{m:"die Körung", p:"kœu-roung"}, ja:{m:"種牡馬認定", p:"shuboba nintei"} },
    def:{ fr:"L'examen qui autorise un étalon à reproduire dans un stud-book : modèle, allures, radios, parfois performances. ⚠️ L'allemand a LE mot que tout le monde emprunte : die Körung — et un étalon agréé est « gekört ».",
          en:"The examination that licenses a stallion to breed within a stud book: conformation, paces, X-rays, sometimes performance. German owns THE word everyone borrows: die Körung — a licensed stallion is « gekört ».",
          es:"El examen que autoriza a un semental a reproducir en un libro genealógico: modelo, aires, radiografías, a veces resultados. ⚠️ El alemán tiene LA palabra que todos toman prestada: die Körung.",
          it:"L'esame che autorizza uno stallone a riprodurre in un libro genealogico: modello, andature, radiografie, a volte risultati. ⚠️ Il tedesco ha LA parola che tutti prendono in prestito: die Körung.",
          de:"Die Prüfung, die einen Hengst zur Zucht im Zuchtbuch zulässt: Exterieur, Grundgangarten, Röntgenbilder, manchmal Leistung. Das deutsche Wort leiht sich die ganze Welt: die Körung — ein zugelassener Hengst ist gekört.",
          ja:"種牡馬として血統書に登録し、繁殖を許可するための審査。体型、歩様、レントゲン、ときに競技成績まで見ます。⚠️ 世界じゅうが借りるのはドイツ語のこの言葉 — die Körung。合格した種牡馬は « gekört » と呼ばれます。" } },

  { ref:"insemination", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'insémination"}, en:{m:"the AI", p:"é-aï", var:"artificial insemination"},
           es:{m:"la inseminación"}, it:{m:"l'inseminazione"},
           de:{m:"die Besamung", p:"be-za-moung"}, ja:{m:"人工授精", p:"jinkō jusei"} },
    def:{ fr:"La saillie sans l'étalon présent. Trois formes, du plus simple au plus technique : la semence fraîche (le jour même), réfrigérée (voyage 24-48 h), congelée (voyage le monde et les années). ⚠️ À l'oral anglais, tout tient en deux lettres : « AI ». Interdite chez le seul pur-sang de course.",
          en:"Covering without the stallion present. Three forms, from simple to technical: fresh semen (same day), chilled (travels 24-48 h), frozen (travels the world and the years). Spoken English needs two letters: « AI ». Banned only for the racing Thoroughbred.",
          es:"La cubrición sin el semental presente. Tres formas: semen fresco (el mismo día), refrigerado (viaja 24-48 h), congelado (viaja el mundo y los años). ⚠️ En inglés hablado bastan dos letras: « AI ». Prohibida solo en el purasangre de carreras.",
          it:"La monta senza lo stallone presente. Tre forme: seme fresco (in giornata), refrigerato (viaggia 24-48 h), congelato (viaggia il mondo e gli anni). ⚠️ Nell'inglese parlato bastano due lettere: « AI ». Vietata solo nel purosangue da corsa.",
          de:"Die Bedeckung ohne anwesenden Hengst. Drei Formen: Frischsamen (am selben Tag), gekühlt (reist 24-48 h), gefroren (reist um die Welt und durch die Jahre). ⚠️ Im gesprochenen Englisch genügen zwei Buchstaben: « AI ». Verboten nur beim Rennvollblut.",
          ja:"種牡馬がその場にいない交配。三つの形があります — 新鮮精液（当日）、冷蔵（24〜48時間の旅に耐える）、冷凍（世界も年月も越える）。⚠️ 英語の会話では二文字で足ります：« AI »。禁じられているのは競走用サラブレッドだけです。" } },

  { ref:"jument-pleine", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la jument pleine"}, en:{m:"the mare in foal", p:"ine fôle"},
           es:{m:"la yegua preñada"}, it:{m:"la cavalla gravida"},
           de:{m:"die tragende Stute", p:"tra-gueune-de"}, ja:{m:"受胎した牝馬", p:"jutai shita hinba"} },
    def:{ fr:"La jument qui attend un poulain. ⚠️ Les images changent d'une langue à l'autre : le français la dit « pleine », l'anglais « in foal » — le poulain déjà dans le mot —, l'allemand « portante ». La question à savoir poser : « is she in foal ? »",
          en:"A mare expecting a foal. The images differ: French says « full », English « in foal » — the foal already in the phrase —, German « carrying ». The question to know: « is she in foal ? »",
          es:"La yegua que espera un potro. ⚠️ Las imágenes cambian: el francés la dice « llena », el inglés « in foal » — el potro ya está en la frase —, el alemán « portante ». La pregunta que hay que saber: « is she in foal ? »",
          it:"La cavalla che aspetta un puledro. ⚠️ Le immagini cambiano: il francese la dice « piena », l'inglese « in foal » — il puledro è già nella frase —, il tedesco « portante ». La domanda da sapere: « is she in foal ? »",
          de:"Die Stute, die ein Fohlen erwartet. ⚠️ Die Bilder wechseln: Französisch sagt « voll », Englisch « in foal » — das Fohlen steckt schon im Wort —, Deutsch « tragend ». Die Frage, die man können muss: « is she in foal ? »",
          ja:"仔馬を宿した牝馬。⚠️ 言語ごとにイメージが変わります。フランス語は「満ちた」、英語は « in foal » — 言葉の中にもう仔馬がいます —、ドイツ語は「運んでいる」。覚えるべき問いはこれです：« is she in foal ? »" } },

  { ref:"modele-allures", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le concours modèle et allures"}, en:{m:"the in-hand show", p:"ine-hannde chô", var:"the conformation class"},
           es:{m:"el concurso morfológico"}, it:{m:"il concorso morfologico"},
           de:{m:"die Fohlenschau", p:"fô-leune-chaô", var:"die Zuchtschau"},
           ja:{m:"品評会", p:"hinpyōkai"} },
    def:{ fr:"Le concours où l'on juge le cheval lui-même — conformation au poser, allures en liberté ou en main — sans cavalier sur le dos. C'est là que se font les réputations d'élevage, et les prix de vente de l'année suivante.",
          en:"The show where the horse itself is judged — conformation standing up, paces loose or in hand — with no rider on board. This is where stud reputations are made, and next year's sale prices.",
          es:"El concurso donde se juzga al caballo mismo — conformación parado, aires en libertad o de la mano — sin jinete encima. Ahí se hacen las reputaciones de cría, y los precios de venta del año siguiente.",
          it:"Il concorso dove si giudica il cavallo stesso — conformazione da fermo, andature in libertà o a mano — senza cavaliere in sella. È lì che si fanno le reputazioni d'allevamento, e i prezzi di vendita dell'anno dopo.",
          de:"Die Schau, auf der das Pferd selbst beurteilt wird — Exterieur im Stand, Gangarten frei oder an der Hand — ohne Reiter. Hier entstehen Zuchtrufe und die Verkaufspreise des nächsten Jahres.",
          ja:"馬そのものを審査する品評会 — 立ち姿の体型、放してまたは引いての歩様 — 背に騎手は乗せません。生産牧場の評判も、翌年の売値も、ここで決まるのです。" } },

  { ref:"presente-en-main", lecon:1, coll:"elevage",
    mots:{ fr:{m:"présenté en main"}, en:{m:"shown in hand", p:"chône ine hannde"},
           es:{m:"presentado de la mano"}, it:{m:"presentato a mano"},
           de:{m:"an der Hand vorgestellt", p:"ane dèr hannde"}, ja:{m:"引き馬で見せる", p:"hikiuma de miseru"} },
    def:{ fr:"Montrer le cheval au bout d'une longe, au pas puis au trot, en triangle devant le jury. C'est un métier : le même poulain, bien ou mal présenté, ne raconte pas la même histoire.",
          en:"Showing the horse on a lead, walk then trot, on a triangle before the judges. It is a craft: the same foal, well or badly shown, does not tell the same story.",
          es:"Mostrar el caballo al final de una cuerda, al paso y al trote, en triángulo ante el jurado. Es un oficio: el mismo potro, bien o mal presentado, no cuenta la misma historia.",
          it:"Mostrare il cavallo al capo di una longhina, al passo e al trotto, in triangolo davanti alla giuria. È un mestiere: lo stesso puledro, ben o mal presentato, non racconta la stessa storia.",
          de:"Das Pferd am Strick zeigen, Schritt und Trab, im Dreieck vor den Richtern. Es ist ein Handwerk: Dasselbe Fohlen, gut oder schlecht vorgestellt, erzählt nicht dieselbe Geschichte.",
          ja:"綱の先に馬をつけ、常歩と速歩で、審査員の前を三角形に歩いて見せること。これは職人技です。同じ仔馬でも、見せ方の良し悪しで語られる物語が変わってしまうのです。" } }

  ],

  phrases: [

  { ref:"ph-elevage-lignee", lecon:1,
      fr:"De quelle lignée vient-il ?",
      en:"What is he bred from ?",
      es:"¿ De qué línea viene ?",
      it:"Da quale linea viene ?",
      de:"Aus welcher Blutlinie stammt er ?",
      ja:"どの 血統 から 来て い ます か ?" },

  { ref:"ph-elevage-pouline", lecon:1,
      fr:"Elle a pouliné cette année ?",
      en:"Has she foaled this year ?",
      es:"¿ Ha parido este año ?",
      it:"Ha figliato quest'anno ?",
      de:"Hat sie dieses Jahr abgefohlt ?",
      ja:"今年 は 出産 し まし た か ?" },

  { ref:"ph-elevage-sevre", lecon:1,
      fr:"Le poulain est déjà sevré ?",
      en:"Is the foal weaned yet ?",
      es:"¿ El potro ya está destetado ?",
      it:"Il puledro è già svezzato ?",
      de:"Ist das Fohlen schon abgesetzt ?",
      ja:"子馬 は もう 離乳 し まし た か ?" },

  { ref:"ph-elevage-inscrit", lecon:1,
      fr:"Il est inscrit au stud-book ?",
      en:"Is he in the stud book ?",
      es:"¿ Está inscrito en el libro genealógico ?",
      it:"È iscritto al libro genealogico ?",
      de:"Ist er im Zuchtbuch eingetragen ?",
      ja:"血統 登録簿 に 登録 さ れ て い ます か ?" }

  ]
};
