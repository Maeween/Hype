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

   ------------------------------------------------------------------
   17/08/2026 — CE QUE CETTE SESSION A AJOUTÉ
   · QUATRE ENTRÉES NEUVES, sur le lexique fourni par Blandine :
     `temperament`, `produit`, `marcher-en-main`, `selection`.
   · LA NOTION « CONFORMATION » dans le `def:` de `modele-allures` :
     un éleveur dit « he has good conformation », jamais « he has a
     beautiful morphology », et devant un jeune cheval il pèse cinq
     choses (conformation · movement · temperament · functionality ·
     bloodline). Emplacement choisi par Claude — Blandine avait deux
     options, le `def:` ou un encart neuf dans le moteur. Le `def:` ne
     coûte aucune ligne de code et ne dépend pas de la page fille.
     ⚠️ DÉDUCTION DE CLAUDE, À VALIDER.
   · LA CLÉ `dialogue` — Golegã, 18 phrases de Blandine, 5 temps.
   · `modele-allures` N'A PAS ÉTÉ SCINDÉ, sur son mot : « Fusionne ».
     Le « modèle / morphologie » et les « allures » de son lexique y
     restent ensemble. NE PAS SCINDER sans la reconsulter — la maîtrise
     est stockée par `ref`, scinder la remet à zéro.
   · `pedigree` N'A PAS ÉTÉ AJOUTÉ, la réserve Lexington du 6 août
     tient. La phrase `ph-golega-papiers` l'emploie quand même.
     ⚠️ DÉDUCTION DE CLAUDE, À VALIDER — Blandine avait dit « ajoute
     pedigree » puis « fais au mieux » quand la réserve lui a été
     rappelée. Ce n'est donc PAS sa décision.
   · TREIZE TERMES DOUTEUX relevés dans `DOUTES-golega-elevage.md`,
     pour vérification par un tiers. Aucune de ces traductions n'a été
     relue par un natif.
   ------------------------------------------------------------------
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
    def:{ fr:"Le concours où l'on juge le cheval lui-même — conformation au poser, allures en liberté ou en main — sans cavalier sur le dos. C'est là que se font les réputations d'élevage, et les prix de vente de l'année suivante. ⚠️ LE MOT À RETENIR EST « CONFORMATION ». Un éleveur dit « he has good conformation » — jamais « he has a beautiful morphology », qui trahit tout de suite le français. Et quand il regarde un jeune cheval, il ne regarde pas sa beauté : il regarde cinq choses, la conformation (la construction), le movement (la qualité des allures), le temperament (le caractère), la functionality (est-ce que ce modèle fonctionnera sous la selle) et la bloodline (ce que la lignée transmet). Un beau cheval n'est pas forcément un cheval d'élevage.",
          en:"The show where the horse itself is judged — conformation standing up, paces loose or in hand — with no rider on board. This is where stud reputations are made, and next year's sale prices. ⚠️ The word is CONFORMATION: a breeder says « he has good conformation », never « he has a beautiful morphology ». And a breeder looking at a young horse weighs five things — conformation, movement, temperament, functionality and bloodline. A beautiful horse is not automatically a breeding horse.",
          es:"El concurso donde se juzga al caballo mismo — conformación parado, aires en libertad o de la mano — sin jinete encima. Ahí se hacen las reputaciones de cría, y los precios de venta del año siguiente. ⚠️ LA PALABRA ES « CONFORMATION ». Un criador dice « he has good conformation » — nunca « he has a beautiful morphology ». Y cuando mira un caballo joven pesa cinco cosas: conformation (la construcción), movement (los aires), temperament (el carácter), functionality (si ese modelo funcionará bajo la silla) y bloodline (lo que transmite la línea). Un caballo bello no es forzosamente un caballo de cría.",
          it:"Il concorso dove si giudica il cavallo stesso — conformazione da fermo, andature in libertà o a mano — senza cavaliere in sella. È lì che si fanno le reputazioni d'allevamento, e i prezzi di vendita dell'anno dopo. ⚠️ LA PAROLA È « CONFORMATION ». Un allevatore dice « he has good conformation » — mai « he has a beautiful morphology ». E guardando un giovane cavallo pesa cinque cose: conformation (la costruzione), movement (le andature), temperament (il carattere), functionality (se quel modello funzionerà sotto la sella) e bloodline (ciò che la linea trasmette). Un bel cavallo non è per forza un cavallo da allevamento.",
          de:"Die Schau, auf der das Pferd selbst beurteilt wird — Exterieur im Stand, Gangarten frei oder an der Hand — ohne Reiter. Hier entstehen Zuchtrufe und die Verkaufspreise des nächsten Jahres. ⚠️ DAS WORT IST « CONFORMATION ». Ein Züchter sagt « he has good conformation » — niemals « he has a beautiful morphology ». Und vor einem jungen Pferd wiegt er fünf Dinge ab: conformation (den Bau), movement (die Gangarten), temperament (den Charakter), functionality (ob dieser Bau unter dem Sattel funktioniert) und bloodline (was die Blutlinie weitergibt). Ein schönes Pferd ist nicht zwangsläufig ein Zuchtpferd.",
          ja:"馬そのものを審査する品評会 — 立ち姿の体型、放してまたは引いての歩様 — 背に騎手は乗せません。生産牧場の評判も、翌年の売値も、ここで決まるのです。⚠️ 覚える語は « conformation »。生産者は « he has good conformation » と言い、« he has a beautiful morphology » とは決して言いません（フランス語がそのまま出てしまった言い方です）。そして若馬を見るとき、彼らが量るのは五つ — conformation（造り）、movement（歩様の質）、temperament（気性）、functionality（その造りが鞍の下で働くか）、bloodline（血統が伝えるもの）。美しい馬が、そのまま繁殖の馬とは限らないのです。" } },

  { ref:"presente-en-main", lecon:1, coll:"elevage",
    mots:{ fr:{m:"présenté en main"}, en:{m:"shown in hand", p:"chône ine hannde"},
           es:{m:"presentado de la mano"}, it:{m:"presentato a mano"},
           de:{m:"an der Hand vorgestellt", p:"ane dèr hannde"}, ja:{m:"引き馬で見せる", p:"hikiuma de miseru"} },
    def:{ fr:"Montrer le cheval au bout d'une longe, au pas puis au trot, en triangle devant le jury. C'est un métier : le même poulain, bien ou mal présenté, ne raconte pas la même histoire.",
          en:"Showing the horse on a lead, walk then trot, on a triangle before the judges. It is a craft: the same foal, well or badly shown, does not tell the same story.",
          es:"Mostrar el caballo al final de una cuerda, al paso y al trote, en triángulo ante el jurado. Es un oficio: el mismo potro, bien o mal presentado, no cuenta la misma historia.",
          it:"Mostrare il cavallo al capo di una longhina, al passo e al trotto, in triangolo davanti alla giuria. È un mestiere: lo stesso puledro, ben o mal presentato, non racconta la stessa storia.",
          de:"Das Pferd am Strick zeigen, Schritt und Trab, im Dreieck vor den Richtern. Es ist ein Handwerk: Dasselbe Fohlen, gut oder schlecht vorgestellt, erzählt nicht dieselbe Geschichte.",
          ja:"綱の先に馬をつけ、常歩と速歩で、審査員の前を三角形に歩いて見せること。これは職人技です。同じ仔馬でも、見せ方の良し悪しで語られる物語が変わってしまうのです。" } },

  /* ---- quatre entrées ajoutées le 17/08/2026, lexique de Blandine pour
     le dialogue de Golegã. Aucune n'a été relue par un natif.
     ⚠️ `modele-allures` NE SE SCINDE PAS : « modèle / morphologie » et
     « allures » y restent ensemble, sur son mot du 17/08 (« Fusionne »).
     ⚠️ `pedigree` N'EST PAS AJOUTÉ ICI : il reste à Lexington
     (hype-lingo-lex-haras.js), comme le prévoit l'en-tête de ce fichier.
     La phrase `ph-golega-papiers` l'emploie quand même — un mot venu
     d'ailleurs dans une phrase est un bonus (régime du 13/08).
     ⚠️ Ces deux choix sont des DÉDUCTIONS DE CLAUDE, à valider. ---- */

  { ref:"temperament", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le tempérament"}, en:{m:"the temperament", p:"tèm-pe-re-meunt"},
           es:{m:"el carácter", var:"el temperamento"}, it:{m:"il carattere", var:"il temperamento"},
           de:{m:"das Temperament", p:"tèm-pé-ra-mènt", var:"der Charakter"},
           ja:{m:"気性", p:"kishō"} },
    def:{ fr:"Le caractère, mais regardé comme une qualité qui se transmet — c'est l'un des trois critères de sélection, à côté du modèle et des allures. ⚠️ Ne pas confondre avec le caractère d'un cheval de club rencontré au Connemara : ici on ne décrit pas un individu, on juge ce qu'une lignée donne.",
          en:"Character, but seen as something inherited — one of the three selection criteria, beside conformation and movement. Not the same as describing one club horse's character: here you judge what a bloodline gives.",
          es:"El carácter, pero visto como una cualidad que se transmite — es uno de los tres criterios de selección, junto al modelo y a los aires. ⚠️ No confundir con el carácter de un caballo de club: aquí no se describe un individuo, se juzga lo que da una línea.",
          it:"Il carattere, ma guardato come una qualità che si trasmette — è uno dei tre criteri di selezione, accanto alla conformazione e alle andature. ⚠️ Da non confondere con il carattere di un cavallo di club: qui non si descrive un individuo, si giudica ciò che dà una linea.",
          de:"Der Charakter, aber als vererbbare Eigenschaft betrachtet — eines der drei Auswahlkriterien, neben Exterieur und Gangarten. ⚠️ Nicht zu verwechseln mit dem Charakter eines Schulpferdes: Hier beschreibt man kein Einzeltier, hier beurteilt man, was eine Blutlinie weitergibt.",
          ja:"気性のこと。ただしここでは「受け継がれる資質」として見ます — 体型と歩様と並ぶ、選抜の三つの基準のひとつ。⚠️ コネマラで出会うクラブの馬の性格とは別物です。ここでは一頭を describe するのではなく、血統が何を与えるかを判断しているのです。" } },

  { ref:"produit", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le produit", var:"la descendance"}, en:{m:"the offspring", p:"of-spring", var:"the progeny"},
           es:{m:"el producto", var:"la descendencia"}, it:{m:"il prodotto", var:"la progenie"},
           de:{m:"die Nachkommen", p:"nakh-ko-meune"},
           ja:{m:"産駒", p:"sanku"} },
    def:{ fr:"Ce qu'une jument ou un étalon a donné. Le mot est froid, et c'est pourtant ainsi qu'on parle en élevage : la valeur d'un reproducteur se lit dans ses produits, pas dans ses propres performances. ⚠️ « Offspring » ne se met pas au pluriel.",
          en:"What a mare or a stallion has produced. The word is cold, but it is the language of breeding: a breeding animal is judged on its offspring, not on its own results. « Offspring » takes no plural s.",
          es:"Lo que una yegua o un semental ha dado. La palabra es fría, pero así se habla en la cría: el valor de un reproductor se lee en sus productos, no en sus propios resultados. ⚠️ « Offspring » no lleva plural.",
          it:"Ciò che una cavalla o uno stallone ha dato. La parola è fredda, ma è così che si parla in allevamento: il valore di un riproduttore si legge nei suoi prodotti, non nei suoi risultati. ⚠️ « Offspring » non prende il plurale.",
          de:"Was eine Stute oder ein Hengst gebracht hat. Das Wort ist kühl, aber so spricht die Zucht: Der Wert eines Zuchttiers steht in seinen Nachkommen, nicht in seinen eigenen Erfolgen. ⚠️ « Offspring » bleibt im Englischen unverändert.",
          ja:"その牝馬や種牡馬が出した仔たち。冷たい言葉ですが、繁殖の世界はこう語ります — 繁殖馬の価値は、自身の戦績ではなく産駒に読まれるのです。⚠️ 英語の « offspring » は複数でも形が変わりません。" } },

  { ref:"marcher-en-main", lecon:1, coll:"elevage",
    mots:{ fr:{m:"marcher en main"}, en:{m:"to lead in hand", p:"tou lide ine hannde"},
           es:{m:"caminar de la mano", var:"llevar del ronzal"},
           it:{m:"camminare a mano"},
           de:{m:"an der Hand gehen", p:"ane dèr hannde gué-eune"},
           ja:{m:"引かれて歩く", p:"hikarete aruku"} },
    def:{ fr:"La toute première éducation d'un poulain : se laisser mener au bout d'une longe, s'arrêter, tourner, sans tirer ni se coucher sur l'homme. ⚠️ Ne pas confondre avec `présenté en main`, qui est la même chose devant un jury.",
          en:"A foal's very first schooling: being led on a rope, halting, turning, without pulling or leaning on the handler. Not the same as being shown in hand, which is this in front of judges.",
          es:"La primerísima educación de un potro: dejarse llevar de una cuerda, pararse, girar, sin tirar ni echarse encima del hombre. ⚠️ No confundir con `presentado de la mano`, que es lo mismo ante un jurado.",
          it:"La primissima educazione di un puledro: farsi condurre alla longhina, fermarsi, girare, senza tirare né appoggiarsi all'uomo. ⚠️ Da non confondere con `presentato a mano`, che è la stessa cosa davanti a una giuria.",
          de:"Die allererste Erziehung eines Fohlens: sich am Strick führen lassen, halten, wenden, ohne zu ziehen oder sich an den Menschen zu legen. ⚠️ Nicht zu verwechseln mit « an der Hand vorgestellt », also demselben vor Richtern.",
          ja:"仔馬にとって最初の教育 — 綱で引かれ、止まり、向きを変える。引っ張らず、人に体を預けもせずに。⚠️ 審査員の前で同じことをする「引き馬で見せる」とは区別します。" } },

  { ref:"selection", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la sélection"}, en:{m:"the selection", p:"si-lèk-cheune", var:"breeding selection"},
           es:{m:"la selección"}, it:{m:"la selezione"},
           de:{m:"die Selektion", p:"zé-lèk-tsione", var:"die Zuchtauswahl"},
           ja:{m:"選抜", p:"senbatsu"} },
    def:{ fr:"Choisir qui reproduit, et qui ne reproduit pas. C'est le travail entier d'un élevage, et le seul qui ne se voit pas : on ne juge un choix de sélection que quinze ans plus tard, quand les produits sont montés.",
          en:"Choosing who breeds and who does not. It is the whole work of a stud, and the only part nobody sees: a selection decision is only judged fifteen years later, once the offspring are ridden.",
          es:"Elegir quién reproduce y quién no. Es el trabajo entero de una yeguada, y el único que no se ve: una decisión de selección sólo se juzga quince años después, cuando los productos ya se montan.",
          it:"Scegliere chi riproduce e chi no. È il lavoro intero di un allevamento, e il solo che non si vede: una scelta di selezione si giudica solo quindici anni dopo, quando i prodotti sono montati.",
          de:"Entscheiden, wer züchtet und wer nicht. Das ist die ganze Arbeit eines Gestüts — und der einzige Teil, den niemand sieht: Eine Auswahlentscheidung beurteilt man erst fünfzehn Jahre später, wenn die Nachkommen geritten werden.",
          ja:"どの馬に仔を残させ、どの馬に残させないかを決めること。生産牧場の仕事のすべてであり、そして誰の目にも見えない部分です — 選抜の判断が正しかったかは、産駒が乗られるようになる十五年後にしか分かりません。" } }

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

  ],

  /* ==================================================================
     🇵🇹 GOLEGÃ — LA MISE EN SITUATION · 18 phrases, 5 temps
     Écrite le 17/08/2026 sur les phrases de Blandine (ses 18, aucune
     inventée, aucune retirée), et sur son fil narratif : « arrivée parmi
     les poulinières → observation des poulains → examen d'un jeune
     cheval → présentation en main → discussion avec l'éleveur sur le
     choix des lignées ».

     🟥 POURQUOI GOLEGÃ N'EST PAS LEXINGTON. Blandine : « moins grand
     haras de pur-sang et ventes, plus élevage lusitanien, sélection
     morphologique, modèle, allures, tempérament, lignées et
     présentation des jeunes chevaux ». Aucune phrase de prix, aucune
     enchère, aucun lot : ici on regarde naître, on ne vend pas.

     ⚠️ CE FICHIER N'EST PAS CHARGÉ PAR `lingo-dialogue.html`. La page
     fille ne déclare que `arrivee` et `balade` dans ses balises. Le
     dialogue tourne quand même par le FILET (`ouvrirSituation()` renvoie
     le chapitre par postMessage quand les balises de la fille
     échouent) — mais il faut ajouter la balise à la première occasion :
     <script src="hype-lingo-lex-elevage.js?l=4"></script>

     ⚠️ LES CINQ TITRES DE SCÈNES VIVENT DANS `TITRES` de
     `lingo-dialogue.html`, pas ici. Tant qu'ils n'y sont pas, l'en-tête
     affiche « Scène 1 » à « Scène 5 ». Ils sont recopiés dans `titres`
     ci-dessous pour n'avoir pas à les réinventer. Le champ est INERTE,
     le moteur ne le lit pas.

     ⚠️ GOLEGÃ EST UNE VILLE PAYANTE, et la PREMIÈRE à recevoir un
     dialogue. `aUnDialogue()` ne consulte pas `villeAutorisee()` et
     `lingo-dialogue.html` n'a aucun verrou : la scène s'ouvrirait par
     son URL. À traiter dans la page fille, pas ici.

     ⚠️ LE JAPONAIS EST ESPACÉ PAR GROUPES — `attendue.split(" ")`
     découpe la phrase en tuiles pour l'exercice « remets en ordre ».
     Sans espaces, il n'y a rien à déplacer.

     `dit` : "club" = l'éleveur parle, on doit comprendre · "joueuse" =
     on produit la phrase. **9 entendues / 9 produites**, rééquilibré le
     17/08 sur le mot de Blandine (« réadapte si tu veux la répartition »).

     🟥 POURQUOI CETTE RÉPARTITION EXACTE, ET NE PAS LA DÉFAIRE SANS
     REFAIRE LE CALCUL. Le moteur ne choisit pas les exercices au hasard :
     dans CHAQUE temps, il donne "parle" à la 1ʳᵉ phrase produite,
     "ordre" à la 2ᵉ, "repondre" à la 3ᵉ, et "ecris" à la 4ᵉ si elle est
     courte. Une scène sans phrase produite ne fait donc QUE de l'écoute,
     et un chapitre dont aucune scène n'a trois phrases produites ne
     déclenche JAMAIS « Que réponds-tu ? ».
     Première version (12/6) : deux des cinq exercices ne sortaient
     jamais, et le temps 4 se traversait sans rien dire. Corrigé en
     passant à "joueuse" `encolure-dos`, `ce-que-voient-les-juges` et
     `aptitude-dressage` — trois phrases qu'une visiteuse avertie dit
     très bien elle-même. Résultat : écoute ×9, parle ×5, ordre ×3,
     repondre ×1, et chaque temps fait parler.
     ⚠️ « Écris-le » NE SORT TOUJOURS PAS : il faudrait QUATRE phrases
     produites dans une même scène, la quatrième courte (≤ 42 signes).
     Les 18 phrases de Blandine n'en donnent pas la matière — il faudrait
     une phrase courte de plus, à lui demander. NON FAIT.
     ================================================================== */

  dialogue: {
    /* ⚠️ 18/08 : TROIS CHAMPS AJOUTÉS par cohérence avec les 33 autres
       dialogues — `lecon`, `temps`, `langues`. Même correction qu'à
       Lexington le même jour.
       🟥 LE MOTEUR N'EN A PAS BESOIN : `lingo-dialogue.html` ne lit que
       `p.temps` sur CHAQUE PHRASE et regroupe les scènes à partir de là.
       Golegã fonctionnait donc déjà. Mais l'absence créait une
       divergence de forme dont une session future aurait pu se fier.
       ⚠️ `temps: 5` ici, contre 6 partout ailleurs : c'est la valeur
       réelle des phrases, vérifiée. NE PAS l'aligner sur 6. */
    ville: "golega", lecon: 1, temps: 5, langues: ["fr","en","es","it","de","ja"],
    titres: { 1:"Parmi les poulinières", 2:"Les poulains de l'année",
              3:"L'examen d'un jeune cheval", 4:"La présentation en main",
              5:"Le choix des lignées" },

    phrases: [

    /* ---------- TEMPS 1 · PARMI LES POULINIÈRES ---------- */

    { ref:"ph-golega-lignee-ancienne", temps:1, dit:"club",
      mots:["jument","lignee","lusitanien"],
      fr:"Cette jument appartient à une ancienne lignée de chevaux lusitaniens.",
      en:"This mare belongs to an old Lusitano bloodline.",
      es:"Esta yegua pertenece a una antigua línea de caballos lusitanos.",
      it:"Questa cavalla appartiene a un'antica linea di cavalli lusitani.",
      de:"Diese Stute stammt aus einer alten Lusitano-Blutlinie.",
      ja:"この 牝馬 は 古い ルシターノ の 血統 に 属し て い ます 。" },

    { ref:"ph-golega-souplesse", temps:1, dit:"club",
      mots:["poulinière","produit"],
      fr:"Cette poulinière transmet beaucoup de souplesse à ses produits.",
      en:"This broodmare passes on a lot of suppleness to her offspring.",
      es:"Esta yegua de vientre transmite mucha flexibilidad a sus productos.",
      it:"Questa fattrice trasmette molta scioltezza ai suoi prodotti.",
      de:"Diese Zuchtstute gibt ihren Nachkommen viel Losgelassenheit mit.",
      ja:"この 繁殖牝馬 は 産駒 に 柔らかさ を よく 伝え ます 。" },

    { ref:"ph-golega-pleine-de-qui", temps:1, dit:"joueuse",
      mots:["etalon","jument-pleine"],
      fr:"De quel étalon est pleine cette jument ?",
      en:"Which stallion is this mare in foal to ?",
      es:"¿ De qué semental está preñada esta yegua ?",
      it:"Di quale stallone è gravida questa cavalla ?",
      de:"Von welchem Hengst ist diese Stute tragend ?",
      ja:"この 牝馬 は どの 種牡馬 の 仔 を 宿し て い ます か ?" },

    { ref:"ph-golega-printemps", temps:1, dit:"club",
      mots:["poulain","poulinage"],
      fr:"Le poulain devrait naître au début du printemps.",
      en:"The foal should be born in early spring.",
      es:"El potro debería nacer a principios de primavera.",
      it:"Il puledro dovrebbe nascere all'inizio della primavera.",
      de:"Das Fohlen dürfte Anfang des Frühjahrs geboren werden.",
      ja:"仔馬 は 春 の 初め に 生まれる はず です 。" },

    /* ---------- TEMPS 2 · LES POULAINS DE L'ANNÉE ---------- */

    { ref:"ph-golega-jusqu-au-sevrage", temps:2, dit:"club",
      mots:["poulain","sevrage"],
      fr:"Le poulain reste avec sa mère jusqu'au sevrage.",
      en:"The foal stays with its dam until weaning.",
      es:"El potro se queda con su madre hasta el destete.",
      it:"Il puledro resta con la madre fino allo svezzamento.",
      de:"Das Fohlen bleibt bei seiner Mutter bis zum Absetzen.",
      ja:"仔馬 は 離乳 まで 母 と 一緒 に い ます 。" },

    { ref:"ph-golega-curieux", temps:2, dit:"joueuse",
      mots:["poulain","temperament"],
      fr:"Ce poulain est très curieux, mais il reste respectueux.",
      en:"This foal is very curious, but he stays respectful.",
      es:"Este potro es muy curioso, pero sigue siendo respetuoso.",
      it:"Questo puledro è molto curioso, ma resta rispettoso.",
      de:"Dieses Fohlen ist sehr neugierig, bleibt aber respektvoll.",
      ja:"この 仔馬 は とても 好奇心 が 強い です が 礼儀 は わきまえ て い ます 。" },

    { ref:"ph-golega-quel-age", temps:2, dit:"joueuse",
      mots:["poulain"],
      fr:"À quel âge commencez-vous à manipuler les jeunes chevaux ?",
      en:"At what age do you start handling the young horses ?",
      es:"¿ A qué edad empiezan a manejar a los caballos jóvenes ?",
      it:"A che età cominciate a manipolare i cavalli giovani ?",
      de:"In welchem Alter beginnen Sie mit den jungen Pferden zu arbeiten ?",
      ja:"若い 馬 の 扱い は 何歳 から 始め ます か ?" },

    { ref:"ph-golega-donner-les-pieds", temps:2, dit:"club",
      mots:["marcher-en-main"],
      fr:"Nous leur apprenons très tôt à donner les pieds et à marcher en main.",
      en:"We teach them early on to pick up their feet and to lead in hand.",
      es:"Les enseñamos muy pronto a dar los pies y a caminar de la mano.",
      it:"Insegniamo loro molto presto a dare i piedi e a camminare a mano.",
      de:"Wir bringen ihnen früh bei, die Hufe zu geben und an der Hand zu gehen.",
      ja:"私たち は 早い うち から 足 を 上げる こと と 引か れ て 歩く こと を 教え ます 。" },

    /* ---------- TEMPS 3 · L'EXAMEN D'UN JEUNE CHEVAL ---------- */

    { ref:"ph-golega-presence", temps:3, dit:"joueuse",
      mots:["temperament"],
      fr:"Ce jeune cheval a beaucoup de présence et une très belle expression.",
      en:"This young horse has a lot of presence and a very expressive look.",
      es:"Este caballo joven tiene mucha presencia y una expresión muy bonita.",
      it:"Questo giovane cavallo ha molta presenza e un'espressione molto bella.",
      de:"Dieses junge Pferd hat viel Präsenz und einen sehr schönen Ausdruck.",
      ja:"この 若い 馬 は とても 存在感 が あり 表情 も 美しい です 。" },

    { ref:"ph-golega-posterieurs", temps:3, dit:"club",
      mots:["modele-allures"],
      fr:"Regardez comme il engage naturellement ses postérieurs au trot.",
      en:"Look how naturally he engages his hindquarters at the trot.",
      es:"Mire cómo engancha naturalmente los posteriores al trote.",
      it:"Guardi come impegna naturalmente i posteriori al trotto.",
      de:"Sehen Sie, wie natürlich er im Trab die Hinterhand einsetzt.",
      ja:"速歩 で 後肢 を 自然 に 踏み込ん で いる の を 見 て ください 。" },

    { ref:"ph-golega-encolure-dos", temps:3, dit:"joueuse",
      mots:["modele-allures"],
      fr:"Son encolure est bien attachée et son dos est court et solide.",
      en:"His neck is well set on and his back is short and strong.",
      es:"Tiene el cuello bien insertado y el dorso corto y fuerte.",
      it:"Ha il collo bene attaccato e il dorso corto e solido.",
      de:"Sein Hals ist gut angesetzt und sein Rücken kurz und kräftig.",
      ja:"首 の 付き 方 が よく 背 は 短く て 丈夫 です 。" },

    { ref:"ph-golega-papiers", temps:3, dit:"joueuse",
      mots:["stud-book"], motsAilleurs:["pedigree"],
      fr:"Pouvez-vous me montrer ses papiers et son pedigree ?",
      en:"Could you show me his papers and his pedigree ?",
      es:"¿ Puede mostrarme sus papeles y su pedigrí ?",
      it:"Può mostrarmi i suoi documenti e il suo pedigree ?",
      de:"Können Sie mir seine Papiere und seine Abstammung zeigen ?",
      ja:"この 馬 の 書類 と 血統 を 見せ て いただけ ます か ?" },

    /* ---------- TEMPS 4 · LA PRÉSENTATION EN MAIN ---------- */

    { ref:"ph-golega-devant-les-juges", temps:4, dit:"club",
      mots:["presente-en-main","modele-allures"],
      fr:"Nous allons présenter ce jeune cheval en main devant les juges.",
      en:"We are going to show this young horse in hand in front of the judges.",
      es:"Vamos a presentar este caballo joven de la mano ante el jurado.",
      it:"Presenteremo questo giovane cavallo a mano davanti alla giuria.",
      de:"Wir werden dieses junge Pferd an der Hand vor den Richtern vorstellen.",
      ja:"この 若い 馬 を 審査員 の 前 で 引き馬 で 見せ ます 。" },

    { ref:"ph-golega-ce-que-voient-les-juges", temps:4, dit:"joueuse",
      mots:["modele-allures","agrement"],
      fr:"Les juges vont observer son modèle, ses allures et son impression générale.",
      en:"The judges will assess his conformation, his movement and his overall impression.",
      es:"El jurado valorará su conformación, sus aires y su impresión general.",
      it:"La giuria valuterà la sua conformazione, le andature e l'impressione d'insieme.",
      de:"Die Richter beurteilen sein Exterieur, seine Gangarten und den Gesamteindruck.",
      ja:"審査員 は 体型 と 歩様 と 全体 の 印象 を 見 ます 。" },

    /* ---------- TEMPS 5 · LE CHOIX DES LIGNÉES ---------- */

    { ref:"ph-golega-quels-criteres", temps:5, dit:"joueuse",
      mots:["etalon","selection"],
      fr:"Quels critères recherchez-vous lorsque vous choisissez un étalon ?",
      en:"What qualities do you look for when choosing a stallion ?",
      es:"¿ Qué cualidades busca cuando elige un semental ?",
      it:"Quali qualità cerca quando sceglie uno stallone ?",
      de:"Worauf achten Sie bei der Wahl eines Hengstes ?",
      ja:"種牡馬 を 選ぶ とき どんな 資質 を 求め ます か ?" },

    { ref:"ph-golega-equilibre", temps:5, dit:"club",
      mots:["modele-allures","temperament","selection"],
      fr:"Nous cherchons à conserver un bon équilibre entre le modèle, les allures et le tempérament.",
      en:"We try to keep a good balance between conformation, movement and temperament.",
      es:"Intentamos mantener un buen equilibrio entre la conformación, los aires y el carácter.",
      it:"Cerchiamo di mantenere un buon equilibrio tra la conformazione, le andature e il carattere.",
      de:"Wir versuchen, ein gutes Gleichgewicht zwischen Exterieur, Gangarten und Temperament zu halten.",
      ja:"私たち は 体型 と 歩様 と 気性 の 良い 均衡 を 保とう と し て い ます 。" },

    { ref:"ph-golega-aptitude-dressage", temps:5, dit:"joueuse",
      mots:["lignee"],
      fr:"Cette lignée est particulièrement connue pour ses aptitudes au dressage.",
      en:"This bloodline is particularly well known for its ability in dressage.",
      es:"Esta línea es especialmente conocida por sus aptitudes para la doma.",
      it:"Questa linea è particolarmente conosciuta per le sue attitudini al dressage.",
      de:"Diese Blutlinie ist besonders für ihre Dressureignung bekannt.",
      ja:"この 血統 は 馬場 馬術 の 素質 で とくに 知ら れ て い ます 。" },

    { ref:"ph-golega-notre-objectif", temps:5, dit:"club",
      mots:["elevage","naisseur","selection"],
      fr:"Notre objectif est de produire un cheval beau, fonctionnel et agréable à monter.",
      en:"Our goal is to breed a horse that is beautiful, functional and enjoyable to ride.",
      es:"Nuestro objetivo es criar un caballo bello, funcional y agradable de montar.",
      it:"Il nostro obiettivo è allevare un cavallo bello, funzionale e piacevole da montare.",
      de:"Unser Ziel ist ein Pferd, das schön, funktional und angenehm zu reiten ist.",
      ja:"私たち の 目標 は 美しく 機能的 で 乗り 心地 の よい 馬 を 生み出す こと です 。" }

    ]
  }
};
