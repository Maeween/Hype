/* hype-lingo-lex-versailles.js — Hype Lingo · Chapitre « Le dressage »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-dressage.js, leçon 3
   — AUCUN ref, AUCUNE définition modifiée. Seul le nom de la clé de
   chapitre change : `dressage` devient `versailles`. Le dialogue
   `dialogueVersailles` est renommé `dialogue` (un seul dialogue ici).

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE.

   ⚠️ LE DIALOGUE EMPLOIE DES MOTS DE LA LEÇON 2 (orpheline, appuyer,
   cession, tête au mur, épaule en dedans) VIA `motsAilleurs` — c'était
   déjà le cas avant ce découpage, et ça reste sûr : la résolution de
   `motsAilleurs` balaie tous les chapitres chargés, jamais par nom de
   clé. Ne pas essayer de « réparer » en les importants ici.

   UNE SEULE LEÇON, CONSERVÉE À L'IDENTIQUE :
     · leçon 3 — les qualités du dressage (14 concepts)

   Les leçons 1 (Windsor), 2 et 4 (orphelines) sont déplacées
   séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.versailles = {
  ref: "versailles",
  titre: { fr:"Le dressage", en:"Dressage", es:"La doma clásica", it:"Il dressage", de:"Die Dressur", ja:"馬場馬術" },
  lecons: 1,

  concepts: [

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

  ],

  dialogue: {
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
