/* hype-lingo-lex-dressage-reserve.js — Hype Lingo · en réserve
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-dressage.js, leçons 2
   et 4 — AUCUNE définition modifiée.

   🟥 SANS VILLE, LES DEUX. La leçon 2 (« les mouvements » — cession de
   jambe, épaule en dedans, appuyer, changements de pied, pirouette,
   piaffer, passage, reculer, contre-galop, trot allongé, tête au mur —
   11 concepts) et la leçon 4 (« notation et tenue » — protocole, note,
   coefficient, classement, veste, haut-de-forme, queue-de-pie, kur —
   14 concepts) n'ont jamais été attribuées à une ville.

   ⚠️ LA LEÇON 2 EST DÉJÀ UTILISÉE VIA `motsAilleurs` PAR LE DIALOGUE DE
   VERSAILLES (`hype-lingo-lex-versailles.js`) — ce fichier-ci reste la
   source de ces `ref`, même sans ville propre. Ne pas les dupliquer.

   AUCUNE VILLE N'EST BRANCHÉE SUR CE FICHIER DANS `ETAPE_SRC` : voulu,
   pas un oubli, en attendant que deux villes le réclament.
   ================================================================== */

/* 🟡 ARABE DORMANT (24/08) : champ `ar` écrit d'avance, aucun écran ne le lit. */
window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["dressage-reserve"] = {
  ref: "dressage-reserve",
  titre: { fr:"Le dressage", en:"Dressage", es:"La doma clásica", it:"Il dressage", de:"Die Dressur", ja:"馬場馬術", ar:"الترويض" },
  lecons: 2,

  concepts: [

  { ref:"cession-jambe", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la cession à la jambe"}, en:{m:"leg-yield", p:"lègue-yild"},
           es:{m:"la cesión a la pierna"}, it:{m:"la cessione alla gamba"},
           de:{m:"das Schenkelweichen", p:"chèn-keul-vaï-cheune"}, ja:{m:"脚に譲る", p:"ashi ni yuzuru", var:"レッグ・イールド"},
           ar:{m:"الانقياد للساق"} }, /* precise (rapport 07/08) */
    def:{ fr:"Le cheval se déplace de côté sans incurvation, presque droit. Le premier mouvement latéral appris, et celui qu'on confond le plus souvent avec l'appuyer.",
          en:"The horse moves sideways with no bend, almost straight. The first lateral work learned, and the one most often confused with half-pass.",
          es:"El caballo se desplaza de lado sin incurvación, casi recto. El primer movimiento lateral que se aprende, y el que más se confunde con el appuyer.",
          it:"Il cavallo si sposta di lato senza incurvazione, quasi dritto. Il primo movimento laterale imparato, e quello che più si confonde con l'appoggiata.",
          de:"Das Pferd weicht seitwärts ohne Biegung, fast gerade. Die erste erlernte Seitwärtsbewegung — und die am häufigsten mit der Traversale verwechselte.",
          ja:"馬が屈曲せず、ほぼまっすぐなまま横へ動く運動。最初に習う横運動であり、ハーフパスと最も混同されやすいものです。",
          ar:"يتحرك الحصان جانبيا من دون انحناء، مستقيما تقريبا. أول حركة جانبية تتعلم، وأكثر ما يخلط بينها وبين الأبوييه." } },

  { ref:"epaule-dedans", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'épaule en dedans"}, en:{m:"shoulder-in", p:"chol-deur-inn"},
           es:{m:"la espalda adentro"}, it:{m:"la spalla in dentro"},
           de:{m:"das Schulterherein", p:"choul-teur-hè-raïn"}, ja:{m:"ショルダーイン", p:"shorudā in"},
           ar:{m:"الكتف إلى الداخل"} }, /* valide (rapport 07/08) */
    def:{ fr:"Les épaules rentrées vers l'intérieur, les hanches sur la piste, le cheval incurvé autour de la jambe intérieure. Les cinq langues latines et germaniques disent toutes littéralement « épaule dedans » — un cas rare d'accord total.",
          en:"Shoulders brought in, hips on the track, the horse bent round the inside leg. All five European languages say literally « shoulder in ».",
          es:"Las espaldas hacia el interior, las caderas en la pista, el caballo incurvado alrededor de la pierna interior. Las cinco lenguas latinas y germánicas dicen todas literalmente « espalda adentro » — un raro caso de acuerdo total.",
          it:"Le spalle verso l'interno, le anche sulla pista, il cavallo incurvato attorno alla gamba interna. Le cinque lingue latine e germaniche dicono tutte alla lettera « spalla in dentro » — un raro caso di accordo totale.",
          de:"Die Schultern hereingeholt, die Hüften auf dem Hufschlag, das Pferd um das innere Bein gebogen. Alle fünf romanischen und germanischen Sprachen sagen wörtlich « Schulter herein » — ein seltener Fall völliger Einigkeit.",
          ja:"肩を内側へ、腰は蹄跡の上に、馬は内方脚のまわりに屈曲。ラテン系・ゲルマン系の五言語はすべて文字どおり「肩を内へ」— 珍しい満場一致です。",
          ar:"الكتفان إلى الداخل، والوركان على المسار، والحصان منحن حول الساق الداخلية. اللغات اللاتينية والجرمانية الخمس تقول كلها حرفيا «الكتف إلى الداخل»." } },

  { ref:"appuyer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'appuyer"}, en:{m:"half-pass", p:"haf-pass"},
           es:{m:"la apoyada"}, it:{m:"l'appoggiata"},
           de:{m:"die Traversale", p:"tra-vèr-za-le"}, ja:{m:"ハーフパス", p:"hāfu pasu"},
           ar:{m:"الأبوييه"} },
    def:{ fr:"Déplacement latéral avec incurvation dans le sens de la marche. ⚠️ Aucun accord entre les langues : l'anglais dit « demi-passage », l'allemand emploie un mot d'origine française que le français n'utilise pas, et le japonais l'anglais.",
          en:"Sideways with the bend in the direction of travel. No two languages agree here: English says half-pass, German uses a French-looking word the French never use.",
          es:"Desplazamiento lateral con incurvación en el sentido de la marcha. ⚠️ Ningún acuerdo entre lenguas: el inglés dice « half-pass », el alemán usa una palabra de origen francés que el francés no usa, y el japonés el inglés.",
          it:"Spostamento laterale con incurvazione nel senso del movimento. ⚠️ Nessun accordo tra le lingue: l'inglese dice « half-pass », il tedesco usa una parola d'origine francese che il francese non usa, e il giapponese l'inglese.",
          de:"Seitwärtsbewegung mit Biegung in Bewegungsrichtung. ⚠️ Keinerlei Einigkeit: Englisch sagt « half-pass », Deutsch nutzt ein französischstämmiges Wort, das das Französische nicht kennt (Traversale), Japanisch das Englische.",
          ja:"進行方向へ屈曲したまま横へ進む運動。⚠️ 言語間の一致は皆無です。英語は « half-pass »、ドイツ語はフランス語由来なのにフランス語では使われない言葉、日本語は英語からの借用。",
          ar:"حركة جانبية مع انحناء في اتجاه السير — الاسم الدولي محفوظ كما هو. ⚠️ لا اتفاق بين اللغات: الإنجليزية تقول half-pass، والألمانية تستعمل كلمة من أصل فرنسي لا تستعملها الفرنسية نفسها." } },

  { ref:"changement-pied", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le changement de pied"}, en:{m:"the flying change", p:"flaï-ing tchèndj"},
           es:{m:"el cambio de pie"}, it:{m:"il cambio di piede"},
           de:{m:"der Galoppwechsel", p:"ga-lopp-vèk-seul"}, ja:{m:"踏歩変換", p:"tōhohenkan"},
           ar:{m:"التغيير الطائر"} }, // ??
    def:{ fr:"Changer de pied de galop en l'air, sans repasser au trot. ⚠️ L'anglais insiste sur le fait que c'est en suspension : **flying** change. On les compte : au temps, au deux temps, au trois temps.",
          en:"Changing the leading leg in the air, without trotting. English stresses the suspension: a flying change.",
          es:"Cambiar de pie de galope en el aire, sin pasar por el trote. ⚠️ El inglés insiste en que ocurre en suspensión: **flying** change. Se cuentan: al tiempo, a dos tiempos, a tres tiempos.",
          it:"Cambiare piede di galoppo in aria, senza ripassare al trotto. ⚠️ L'inglese insiste sul fatto che avviene in sospensione: **flying** change. Si contano: al tempo, a due tempi, a tre tempi.",
          de:"Der Galoppwechsel in der Luft, ohne Trab dazwischen. ⚠️ Das Englische betont die Schwebephase: **flying** change. Man zählt sie: von Sprung zu Sprung, alle zwei, alle drei Sprünge.",
          ja:"速歩を挟まず、空中で駈歩の手前を替えること。⚠️ 英語は宙に浮いている瞬間を強調します — **flying** change。数え方もあります：一歩ごと、二歩ごと、三歩ごと。",
          ar:"تغيير قيادة العدو في الهواء، من دون العودة إلى الخبب. ⚠️ الإنجليزية تشدد على أنه في لحظة التعلق: **flying** change. وتعد التغييرات: في كل خطوة، وكل خطوتين، وكل ثلاث." } },

  { ref:"pirouette", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la pirouette"}, en:{m:"the pirouette", p:"pi-rou-ètt"},
           es:{m:"la pirueta"}, it:{m:"la piroetta"},
           de:{m:"die Pirouette", p:"pi-rou-è-te"}, ja:{m:"ピルーエット", p:"pirūetto"},
           ar:{m:"البيرويت"} },
    def:{ fr:"Un tour complet au galop autour d'un postérieur qui reste en place. Le mot français a été adopté partout, danse comprise.",
          en:"A full turn in canter round a hind leg that stays in place. The French word was adopted everywhere, dance included.",
          es:"Una vuelta completa al galope alrededor de un posterior que queda en su sitio. La palabra francesa fue adoptada en todas partes, danza incluida.",
          it:"Un giro completo al galoppo attorno a un posteriore che resta al suo posto. La parola francese è stata adottata ovunque, danza compresa.",
          de:"Eine ganze Drehung im Galopp um ein an Ort bleibendes Hinterbein. Das französische Wort wurde überall übernommen — auch im Tanz.",
          ja:"片方の後肢を軸に、駈歩のままその場で一回転する運動。このフランス語は世界じゅうで採用されました — バレエの世界でも。",
          ar:"دورة كاملة في العدو حول قائمة خلفية تبقى في مكانها. الكلمة الفرنسية اعتمدت في كل مكان، بما في ذلك الرقص." } },

  { ref:"piaffer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le piaffer"}, en:{m:"piaffe", p:"pi-af"},
           es:{m:"el piaffe"}, it:{m:"il piaffe"},
           de:{m:"die Piaffe", p:"pi-a-fe"}, ja:{m:"ピアッフェ", p:"piaffe"},
           ar:{m:"البياف"} },
    def:{ fr:"Un trot sur place, cadencé et rassemblé. Curiosité : le mot est français, mais c'est la forme allemande *die Piaffe* qui a été reprise par l'anglais, l'espagnol et l'italien.",
          en:"A cadenced, collected trot on the spot. The word is French, but it is the German form that English, Spanish and Italian borrowed.",
          es:"Un trote en el sitio, cadenciado y reunido. Curiosidad: la palabra es francesa, pero fue la forma alemana *die Piaffe* la que tomaron el inglés, el español y el italiano.",
          it:"Un trotto sul posto, cadenzato e riunito. Curiosità: la parola è francese, ma è la forma tedesca *die Piaffe* che è stata ripresa da inglese, spagnolo e italiano.",
          de:"Ein kadenzierter, versammelter Trab auf der Stelle. Kurios: Das Wort ist französisch, aber Englisch, Spanisch und Italienisch übernahmen die deutsche Form *die Piaffe*.",
          ja:"その場で行う、拍子の整った収縮した速歩。面白いことに、言葉はフランス語なのに、英・西・伊が借りたのはドイツ語形の *die Piaffe* でした。",
          ar:"خبب في المكان، موقع ومجموع. طرافة: الكلمة فرنسية، لكن الصيغة الألمانية *die Piaffe* هي التي أخذتها الإنجليزية والإسبانية والإيطالية." } },

  { ref:"passage", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le passage"}, en:{m:"passage", p:"pa-sadj"},
           es:{m:"el passage"}, it:{m:"il passage"},
           de:{m:"die Passage", p:"pa-sa-je"}, ja:{m:"パッサージュ", p:"passāju"},
           ar:{m:"الباساج"} },
    def:{ fr:"Un trot très rassemblé, avec un long temps de suspension. ⚠️ Se prononce à la française même en anglais : dire « pa-sidj » à l'anglaise ne sera pas compris.",
          en:"A very collected trot with a long moment of suspension. Pronounced the French way even in English.",
          es:"Un trote muy reunido, con un largo tiempo de suspensión. ⚠️ Se pronuncia a la francesa incluso en inglés: decir « pa-sidj » a la inglesa no será entendido.",
          it:"Un trotto molto riunito, con un lungo tempo di sospensione. ⚠️ Si pronuncia alla francese anche in inglese: dire « pa-sidj » all'inglese non sarà capito.",
          de:"Ein stark versammelter Trab mit langer Schwebephase. ⚠️ Wird auch im Englischen französisch ausgesprochen — « pa-sidj » versteht niemand.",
          ja:"高く長い滞空を伴う、深く収縮した速歩。⚠️ 英語でもフランス語ふうに発音します。英語読みで「パシッジ」と言っても通じません。",
          ar:"خبب مجموع جدا، مع زمن تعلق طويل. ⚠️ ينطق بالطريقة الفرنسية حتى في الإنجليزية: نطقه على الطريقة الإنجليزية «pa-sidj» لن يفهم." } },

  { ref:"reculer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le reculer"}, en:{m:"the rein-back", p:"rèn-bak"},
           es:{m:"el paso atrás"}, it:{m:"l'indietreggiare"},
           de:{m:"das Rückwärtsrichten", p:"ruk-vèrts-rirh-teune"}, ja:{m:"後退", p:"kōtai"},
           ar:{m:"الرجوع إلى الخلف"} },
    def:{ fr:"Reculer droit, par bipèdes diagonaux, le nombre de pas exact demandé par la reprise. ⚠️ L'anglais le nomme par la rêne, **rein-back**, alors que le mouvement vient d'abord du dos et des jambes.",
          en:"Straight back in diagonal pairs, the exact number of steps the test asks for. English names it after the rein.",
          es:"Recular derecho, por bípedos diagonales, el número exacto de pasos que pide la reprise. ⚠️ El inglés lo nombra por la rienda, **rein-back**, cuando el movimiento nace del dorso y las piernas.",
          it:"Indietreggiare dritto, per bipedi diagonali, il numero esatto di passi chiesto dalla ripresa. ⚠️ L'inglese lo chiama con la redine, **rein-back**, mentre il movimento nasce prima da schiena e gambe.",
          de:"Gerade rückwärtsrichten, auf diagonalen Beinpaaren, exakt die verlangte Trittzahl. ⚠️ Das Englische benennt es nach dem Zügel — **rein-back** —, obwohl die Bewegung aus Rücken und Schenkeln kommt.",
          ja:"対角の肢を対にして、要求された歩数だけまっすぐ後退すること。⚠️ 英語は手綱の名で **rein-back** と呼びますが、この運動はまず背中と脚から生まれるものです。",
          ar:"الرجوع مستقيما، بالقوائم القطرية، بعدد الخطوات المطلوب في الاختبار بالضبط. ⚠️ الإنجليزية تسميه بالعنان، **rein-back**، مع أن الحركة تأتي أولا من الظهر والساقين." } },

  { ref:"contre-galop", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le contre-galop"}, en:{m:"counter-canter", p:"kaoune-teur kann-teur"},
           es:{m:"el galope a la contra"}, it:{m:"il galoppo rovesciato"}, // ??
           de:{m:"der Konter-Galopp", p:"kon-teur-ga-lopp", var:"Außengalopp"}, ja:{m:"反対駈歩", p:"hantai kakeho"},
           ar:{m:"العدو المعاكس"} }, // ??
    def:{ fr:"Galoper à droite sur la main gauche, volontairement et en équilibre. C'est un test de rectitude et d'obéissance, pas une faute.",
          en:"Cantering right while going left, on purpose and in balance. A test of straightness and obedience, not a mistake.",
          es:"Galopar a la derecha en la mano izquierda, voluntariamente y en equilibrio. Es una prueba de rectitud y obediencia, no una falta.",
          it:"Galoppare a destra sulla mano sinistra, volontariamente e in equilibrio. È una prova di rettitudine e obbedienza, non un errore.",
          de:"Auf der linken Hand bewusst im Rechtsgalopp gehen, in Balance. Ein Test für Geraderichtung und Gehorsam — kein Fehler.",
          ja:"左手前の回りで、あえて右手前の駈歩を、バランスを保って続けること。真直性と従順さの試験であって、誤りではありません。",
          ar:"العدو على اليد اليمنى فوق المسار الأيسر، عمدا وبتوازن. إنه اختبار للاستقامة والطاعة، لا خطأ." } },

  { ref:"trot-allonge", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le trot allongé"}, en:{m:"extended trot", p:"èks-tèn-dèd trot"},
           es:{m:"el trote largo"}, it:{m:"il trotto allungato"},
           de:{m:"der starke Trab", p:"chtar-ke trab"}, ja:{m:"伸長速歩", p:"shinchō hayaashi"},
           ar:{m:"الخبب الممدود"} }, // ??
    def:{ fr:"L'amplitude maximale, sans précipiter. ⚠️ L'allemand ne dit pas « allongé » mais **starker Trab**, le trot *fort* — et l'échelle allemande complète va de Arbeitstrab (travail) à Mitteltrab (moyen) puis starker Trab.",
          en:"Maximum reach without hurrying. German does not say extended but starker Trab, the strong trot.",
          es:"La amplitud máxima, sin precipitar. ⚠️ El alemán no dice « alargado » sino **starker Trab**, el trote *fuerte* — y la escala alemana completa va de Arbeitstrab (trabajo) a Mitteltrab (medio) y starker Trab.",
          it:"L'ampiezza massima, senza precipitare. ⚠️ Il tedesco non dice « allungato » ma **starker Trab**, il trotto *forte* — e la scala tedesca completa va da Arbeitstrab (di lavoro) a Mitteltrab (medio) a starker Trab.",
          de:"Der größte Rahmen, ohne zu eilen. ⚠️ Das Deutsche sagt nicht « verlängert », sondern **starker Trab** — und die Reihe geht von Arbeitstrab über Mitteltrab zum starken Trab.",
          ja:"急がずに、最大限の伸びを見せる速歩。⚠️ ドイツ語は「伸ばした」ではなく **starker Trab**（強い速歩）と言い、段階も Arbeitstrab（常用）→ Mitteltrab（中間）→ starker Trab と揃っています。",
          ar:"أقصى اتساع للخطوة، من دون تسرع. ⚠️ الألمانية لا تقول «ممدود» بل **starker Trab**، الخبب *القوي* — وسلمها الكامل يمتد من Arbeitstrab (خبب العمل) إلى Mitteltrab (المتوسط) فما فوق." } },
  { ref:"tete-au-mur", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la tête au mur"}, en:{m:"travers", p:"tra-vèr", var:"head to the wall"},
           es:{m:"la grupa adentro"}, it:{m:"il travers"},
           de:{m:"das Traversale", p:"tra-vèr-za-le", var:"Kruppeherein"}, ja:{m:"トラバース", p:"torabāsu"},
           ar:{m:"الرأس إلى الجدار"} },
    def:{ fr:"L'inverse de l'épaule en dedans : ce sont les HANCHES qui rentrent, les épaules restant sur la piste. Le cheval regarde où il va, incurvé du côté du déplacement. ⚠️ L'anglais garde le mot FRANÇAIS, « travers » — comme pour « appuyer » qui devient « half-pass ». Le français dit aussi « croupe au mur », c'est le même mouvement.",
          en:"The opposite of shoulder-in: the HIPS come in, the shoulders stay on the track, and the horse looks where he's going. English keeps the French word, « travers ».",
          es:"Lo contrario de la espalda adentro: entra la GRUPA, las espaldas se quedan en la pista, y el caballo mira hacia donde va.",
          it:"Il contrario della spalla in dentro: entrano le ANCHE, le spalle restano in pista, e il cavallo guarda dove va.",
          de:"Das Gegenteil vom Schulterherein: die HANKEN kommen herein, die Schultern bleiben auf dem Hufschlag, und das Pferd schaut in die Bewegungsrichtung.",
          ja:"ショルダーインの逆。肩は蹄跡に残したまま、腰を内側に入れます。馬は進行方向を見ます。",
          ar:"عكس الكتف إلى الداخل: الوركان هما اللذان يدخلان، والكتفان يبقيان على المسار. الحصان ينظر حيث يذهب، منحنيا في اتجاه الحركة. ⚠️ الإنجليزية تحتفظ بالكلمة الفرنسية «travers»." } },

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


  /* ============ LEÇON 4 · NOTATION ET TENUE ============ */

  { ref:"protocole", lecon:4, coll:"notation",
    mots:{ fr:{m:"le protocole"}, en:{m:"the test sheet", p:"tèst chite", var:"score sheet"},
           es:{m:"la hoja de puntuación"}, it:{m:"il foglio di giudizio"},
           de:{m:"das Protokoll", p:"pro-to-kol"}, ja:{m:"採点表", p:"saitenhyō"},
           ar:{m:"ورقة التحكيم"} }, // ??
    def:{ fr:"La feuille où chaque mouvement reçoit sa note et sa remarque. On la récupère après l'épreuve, et c'est le vrai cours particulier de la journée.",
          en:"The sheet where every movement gets its mark and comment. Collected afterwards, it is the real lesson of the day.",
          es:"La hoja donde cada movimiento recibe su nota y su comentario. Se recoge tras la prueba, y es la verdadera clase particular del día.",
          it:"Il foglio dove ogni movimento riceve il suo voto e la sua osservazione. Si ritira dopo la prova, ed è la vera lezione privata della giornata.",
          de:"Der Bogen, auf dem jede Lektion Note und Bemerkung erhält. Man holt ihn nach der Prüfung ab — die wahre Einzelstunde des Tages.",
          ja:"各運動に点と講評が書き込まれる用紙。競技のあとに受け取ります。その日いちばんの個人レッスンは、実はこの紙です。",
          ar:"الورقة التي تتلقى فيها كل حركة درجتها وملاحظتها. تستلم بعد الاختبار، وهي الدرس الخاص الحقيقي لذلك اليوم." } },

  { ref:"note", lecon:4, coll:"notation",
    mots:{ fr:{m:"la note"}, en:{m:"the mark", p:"mark", var:"score (US)"},
           es:{m:"la nota"}, it:{m:"il voto"},
           de:{m:"die Note", p:"nô-te"}, ja:{m:"点数", p:"tensū"},
           ar:{m:"الدرجة"} },
    def:{ fr:"De 0 à 10 par mouvement : 10 excellent, 6 satisfaisant, 0 mouvement non exécuté. ⚠️ L'anglais britannique dit **mark**, l'américain **score** — et « note » en anglais veut dire une remarque écrite, pas une note.",
          en:"0 to 10 per movement. British English says mark, American score — and « note » in English means a written comment, not a mark.",
          es:"De 0 a 10 por movimiento: 10 excelente, 6 satisfactorio, 0 movimiento no ejecutado. ⚠️ El inglés británico dice **mark**, el americano **score** — y « note » en inglés significa una nota escrita, no una calificación.",
          it:"Da 0 a 10 per movimento: 10 eccellente, 6 sufficiente, 0 movimento non eseguito. ⚠️ L'inglese britannico dice **mark**, l'americano **score** — e « note » in inglese significa un appunto scritto, non un voto.",
          de:"0 bis 10 pro Lektion: 10 ausgezeichnet, 6 befriedigend, 0 nicht ausgeführt. ⚠️ Britisch heißt es **mark**, amerikanisch **score** — und « note » ist auf Englisch eine Notiz, keine Note.",
          ja:"運動ごとに0〜10点。10は最優秀、6は満足、0は不実施。⚠️ イギリス英語は **mark**、アメリカ英語は **score** — そして英語の « note » はメモの意味で、点数ではありません。",
          ar:"من 0 إلى 10 لكل حركة: 10 ممتاز، و6 مرض، و0 حركة لم تنفذ. ⚠️ الإنجليزية البريطانية تقول **mark**، والأمريكية **score** — أما «note» بالإنجليزية فتعني ملاحظة مكتوبة، لا درجة." } },

  { ref:"coefficient", lecon:4, coll:"notation",
    mots:{ fr:{m:"le coefficient"}, en:{m:"the coefficient", p:"kô-i-fi-cheunt", var:"double marks"},
           es:{m:"el coeficiente"}, it:{m:"il coefficiente"},
           de:{m:"der Koeffizient", p:"ko-è-fi-tsi-ènt"}, ja:{m:"係数", p:"keisū"},
           ar:{m:"المعامل"} }, // ??
    def:{ fr:"Certains mouvements comptent double. Les Britanniques disent souvent simplement **double marks** : savoir lesquels sont doublés change la façon de préparer une reprise.",
          en:"Some movements count twice. The British often just say « double marks ».",
          es:"Algunos movimientos cuentan doble. Los británicos dicen a menudo simplemente **double marks**: saber cuáles se doblan cambia la manera de preparar una reprise.",
          it:"Certi movimenti contano doppio. I britannici dicono spesso semplicemente **double marks**: sapere quali sono raddoppiati cambia il modo di preparare una ripresa.",
          de:"Manche Lektionen zählen doppelt. Die Briten sagen oft schlicht **double marks**: Zu wissen, welche, verändert die Vorbereitung einer Aufgabe.",
          ja:"一部の運動は二倍で数えられます。イギリス人は単に **double marks** と言うことも。どの運動が二倍かを知っているかどうかで、経路の準備の仕方が変わります。",
          ar:"بعض الحركات تحسب مضاعفة. البريطانيون يقولون غالبا ببساطة **double marks**: معرفة الحركات المضاعفة تغير طريقة تحضير الاختبار." } },

  { ref:"pourcentage", lecon:4, coll:"notation",
    mots:{ fr:{m:"le pourcentage"}, en:{m:"the percentage", p:"peur-sènn-tidj"},
           es:{m:"el porcentaje"}, it:{m:"la percentuale"},
           de:{m:"der Prozentsatz", p:"pro-tsènt-zats"}, ja:{m:"得点率", p:"tokutenritsu"},
           ar:{m:"النسبة المئوية"} }, // ??
    def:{ fr:"Le total ramené sur 100. Repères valables partout : autour de 60 % la reprise est correcte, 65 % bonne, 70 % très bonne, au-delà on parle de niveau international.",
          en:"The total as a percentage. Around 60 % is correct, 65 % good, 70 % very good, beyond that international level.",
          es:"El total llevado a 100. Referencias válidas en todas partes: en torno al 60 % la reprise es correcta, 65 % buena, 70 % muy buena, más allá se habla de nivel internacional.",
          it:"Il totale riportato su 100. Riferimenti validi ovunque: attorno al 60 % la ripresa è corretta, 65 % buona, 70 % molto buona, oltre si parla di livello internazionale.",
          de:"Die Summe auf 100 gerechnet. Überall gültige Anhaltspunkte: um 60 % ist die Aufgabe ordentlich, 65 % gut, 70 % sehr gut — darüber spricht man von internationalem Niveau.",
          ja:"合計を100点満点に換算したもの。世界共通の目安：60%前後で妥当、65%で良、70%で優 — それを超えれば国際レベルの話になります。",
          ar:"المجموع منسوبا إلى 100. معايير صالحة في كل مكان: نحو 60 % اختبار صحيح، و65 % جيد، و70 % جيد جدا، وما فوق ذلك يعد مستوى دوليا." } },

  { ref:"remarques", lecon:4, coll:"notation",
    mots:{ fr:{m:"les remarques du juge"}, en:{m:"the comments", p:"ko-mèntss"},
           es:{m:"los comentarios"}, it:{m:"i commenti"},
           de:{m:"die Bemerkungen", p:"be-mèr-koun-gueune"}, ja:{m:"コメント", p:"komento"},
           ar:{m:"ملاحظات الحكم"} },
    def:{ fr:"Écrites à la main, souvent en abrégé, et parfois plus utiles que la note elle-même. Quelques abréviations anglaises courantes : *needs more impulsion*, *croaked*, *bal.* pour balance, *tense*.",
          en:"Hand-written, often abbreviated, and often more useful than the mark itself.",
          es:"Escritas a mano, a menudo abreviadas, y a veces más útiles que la propia nota. Algunas abreviaturas inglesas corrientes: *needs more impulsion*, *croaked*, *bal.* por balance, *tense*.",
          it:"Scritte a mano, spesso abbreviate, e a volte più utili del voto stesso. Alcune abbreviazioni inglesi correnti: *needs more impulsion*, *croaked*, *bal.* per balance, *tense*.",
          de:"Handschriftlich, oft abgekürzt — und manchmal nützlicher als die Note selbst. Gängige englische Kürzel: *needs more impulsion*, *croaked*, *bal.* für balance, *tense*.",
          ja:"手書きで、しばしば略語で — ときに点数そのものより役に立ちます。よくある英語の略語：*needs more impulsion*、*croaked*、balance の略の *bal.*、*tense*。",
          ar:"مكتوبة باليد، ومختصرة غالبا، وقد تكون أنفع من الدرجة نفسها. من الاختصارات الإنجليزية الشائعة: *needs more impulsion*، و*bal.* للتوازن، و*tense*." } },

  { ref:"note-ensemble", lecon:4, coll:"notation",
    mots:{ fr:{m:"les notes d'ensemble"}, en:{m:"the collective marks", p:"ko-lèk-tiv marks"},
           es:{m:"las notas de conjunto"}, it:{m:"le note d'insieme"},
           de:{m:"die Gesamtnoten", p:"gue-zamt-nô-teune"}, ja:{m:"総合点", p:"sōgōten"},
           ar:{m:"الدرجات العامة"} }, // ??
    def:{ fr:"En bas du protocole : allures, impulsion, soumission, position du cavalier. Elles jugent la reprise entière, pas un mouvement — et elles pèsent lourd.",
          en:"At the foot of the sheet: paces, impulsion, submission, rider's position. They judge the whole test, and they weigh heavily.",
          es:"Al pie del protocolo: aires, impulsión, sumisión, posición del jinete. Juzgan la reprise entera, no un movimiento — y pesan mucho.",
          it:"In fondo al protocollo: andature, impulso, sottomissione, posizione del cavaliere. Giudicano la ripresa intera, non un movimento — e pesano molto.",
          de:"Am Ende des Protokolls: Grundgangarten, Schwung, Durchlässigkeit, Sitz des Reiters. Sie bewerten die ganze Aufgabe, nicht eine Lektion — und sie wiegen schwer.",
          ja:"採点表のいちばん下 — 歩様、勢い、従順さ、騎手の姿勢。ひとつの運動ではなく演技全体を評価する項目で、配点も重いのです。",
          ar:"في أسفل ورقة التحكيم: المشيات، والاندفاع، والخضوع، ووضع الفارس. تحكم على الاختبار كله لا على حركة واحدة — ووزنها كبير." } },

  { ref:"erreur-parcours", lecon:4, coll:"notation",
    mots:{ fr:{m:"l'erreur de parcours"}, en:{m:"an error of course", p:"è-reur of korss"},
           es:{m:"un error de recorrido"}, it:{m:"un errore di percorso"},
           de:{m:"der Bahnfehler", p:"ban-fé-leur"}, ja:{m:"コース違い", p:"kōsu chigai"},
           ar:{m:"خطأ المسار"} }, // ??
    def:{ fr:"Se tromper de figure ou de lettre. Ce n'est pas éliminatoire tout de suite : la pénalité est forfaitaire, et c'est en général à la troisième erreur qu'on est éliminé — un détail qui évite d'abandonner pour rien.",
          en:"Going the wrong way. Not instant elimination: a fixed penalty, and usually only the third error sends you out.",
          es:"Equivocarse de figura o de letra. No es eliminatorio al instante: la penalización es fija, y en general es a la tercera falta cuando se elimina — un detalle que evita abandonar por nada.",
          it:"Sbagliare figura o lettera. Non è eliminatorio subito: la penalità è forfettaria, e in genere è alla terza errore che si è eliminati — un dettaglio che evita di ritirarsi per niente.",
          de:"Figur oder Buchstabe verwechselt. Nicht sofort eliminierend: Der Abzug ist pauschal, und meist scheidet man erst beim dritten Fehler aus — ein Detail, das vor grundlosem Aufgeben bewahrt.",
          ja:"図形や文字を間違えること。即失権にはなりません。減点は定額で、ふつうは三度目の間違いで失権 — 知っていれば、無用な棄権をせずに済む知識です。",
          ar:"الخطأ في الشكل أو في الحرف. ليس إقصائيا فورا: الجزاء مقطوع، وعادة ما يقصى الفارس عند الخطأ الثالث — تفصيل يجنب الاستسلام قبل الأوان." } },

  { ref:"cloche-juge", lecon:4, coll:"notation",
    mots:{ fr:{m:"la cloche du juge"}, en:{m:"the bell", p:"bèl", var:"the horn · the whistle"},
           es:{m:"la campana"}, it:{m:"la campana"},
           de:{m:"die Glocke", p:"glo-ke"}, ja:{m:"合図の鐘", p:"aizu no kane"},
           ar:{m:"جرس الحكم"} }, // ??
    def:{ fr:"Elle sonne pour te faire entrer — et elle sonne aussi pour signaler une erreur de parcours. Deux sens opposés pour un même son : la reconnaître évite la panique.",
          en:"It rings to send you in — and it also rings to flag an error of course. Two opposite meanings, one sound.",
          es:"Suena para hacerte entrar — y suena también para señalar un error de recorrido. Dos sentidos opuestos para un mismo sonido: reconocerla evita el pánico.",
          it:"Suona per farti entrare — e suona anche per segnalare un errore di percorso. Due sensi opposti per lo stesso suono: riconoscerla evita il panico.",
          de:"Sie läutet zum Einreiten — und sie läutet auch bei einem Bahnfehler. Zwei gegensätzliche Bedeutungen für denselben Klang: Wer das weiß, gerät nicht in Panik.",
          ja:"入場の合図に鳴り — 経路違反の合図にも鳴ります。同じ音にまるで逆のふたつの意味。知っていれば慌てずに済みます。",
          ar:"يرن ليأذن لك بالدخول — ويرن أيضا للإشارة إلى خطأ في المسار. معنيان متعاكسان لصوت واحد: تمييزه يجنب الذعر." } },

  { ref:"controle-embouchures", lecon:4, coll:"notation",
    mots:{ fr:{m:"le contrôle des embouchures"}, en:{m:"the tack check", p:"tak tchèk", var:"bit check"},
           es:{m:"el control de embocaduras"}, it:{m:"il controllo delle imboccature"},
           de:{m:"die Ausrüstungskontrolle", p:"aouss-rus-toungs-kon-tro-le"}, ja:{m:"馬具検査", p:"bagu kensa"},
           ar:{m:"فحص الشكائم"} }, // ??
    def:{ fr:"À la sortie du rectangle, un commissaire vérifie mors, muserolle et éperons. Refuser, c'est l'élimination : on reste à cheval et on laisse faire.",
          en:"On leaving the arena a steward checks bit, noseband and spurs. Refusing means elimination: stay mounted and let them.",
          es:"A la salida del rectángulo, un comisario verifica bocado, muserola y espuelas. Negarse es la eliminación: uno permanece a caballo y deja hacer.",
          it:"All'uscita del rettangolo, un commissario verifica imboccatura, capezzina e speroni. Rifiutare è l'eliminazione: si resta a cavallo e si lascia fare.",
          de:"Am Ausgang des Vierecks prüft ein Steward Gebiss, Nasenriemen und Sporen. Verweigern heißt Ausscheiden: Man bleibt sitzen und lässt es geschehen.",
          ja:"馬場を出たところで、係員がハミ、鼻革、拍車を確認します。拒めば失権。馬上に座ったまま、されるがままにしておくこと。",
          ar:"عند الخروج من الميدان، يتحقق المشرف من الشكيمة وحزام الأنف والمهاميز. رفض الفحص إقصاء: تبقين على السرج وتتركينه يعمل." } },

  { ref:"classement", lecon:4, coll:"notation",
    mots:{ fr:{m:"le classement"}, en:{m:"the placing", p:"plé-sing", var:"the results"},
           es:{m:"la clasificación"}, it:{m:"la classifica"},
           de:{m:"die Platzierung", p:"pla-tsi-roung"}, ja:{m:"順位", p:"jun'i"},
           ar:{m:"الترتيب"} },
    def:{ fr:"Affiché après le passage du dernier concurrent. En dressage, on se compare d'abord à son propre pourcentage précédent — le classement dépend de qui s'est inscrit ce jour-là.",
          en:"Posted after the last competitor. In dressage you compare yourself to your own previous percentage first.",
          es:"Publicado tras el paso del último concursante. En doma uno se compara primero con su propio porcentaje anterior — la clasificación depende de quién se inscribió ese día.",
          it:"Affisso dopo il passaggio dell'ultimo concorrente. In dressage ci si confronta prima col proprio percentuale precedente — la classifica dipende da chi si è iscritto quel giorno.",
          de:"Ausgehängt nach dem letzten Starter. In der Dressur vergleicht man sich zuerst mit dem eigenen letzten Prozentsatz — die Platzierung hängt davon ab, wer an dem Tag gemeldet hat.",
          ja:"最後の出場者が終わってから掲示されます。馬場馬術でまず比べる相手は、前回の自分のパーセンテージ。順位のほうは、その日に誰がエントリーしたか次第です。",
          ar:"يعرض بعد مرور آخر متسابق. في الترويض تقارنين نفسك أولا بنسبتك المئوية السابقة — فالترتيب يتوقف على من سجل في ذلك اليوم." } },

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
           de:{m:"das Turnierjackett", p:"tour-nir-ja-kète", var:"der Turnierrock"}, ja:{m:"競技用ジャケット", p:"kyōgiyō jaketto"},
           ar:{m:"سترة المسابقة"} }, // ?? ja
    def:{ fr:"La veste courte des niveaux club et amateur, portée avec la bombe. C'est la tenue de la très grande majorité des concours : la queue-de-pie ne vient qu'ensuite.",
          en:"The short jacket worn at club and amateur level, with a hat. It's what almost everyone competes in — the tailcoat comes much later.",
          es:"La chaqueta corta de los niveles club y amateur, con casco. Es la ropa de la gran mayoría de los concursos: el frac viene después.",
          it:"La giacca corta dei livelli club e amatoriale, con il cap. È l'abbigliamento della grande maggioranza dei concorsi: il frac viene dopo.",
          de:"Das kurze Jackett für Club- und Amateurniveau, mit Kappe. So startet die große Mehrheit — der Frack kommt erst viel später.",
          ja:"クラブ・アマチュア級で着る短い上着。ヘルメットと合わせます。ほとんどの競技会はこの服装で、燕尾服はもっと上の級からです。",
          ar:"السترة القصيرة لمستويات النوادي والهواة، تلبس مع الخوذة. إنها زي الغالبية العظمى من المسابقات: معطف الذيل لا يأتي إلا بعد ذلك." } },

  { ref:"haut-de-forme", lecon:4, coll:"tenue",
    mots:{ fr:{m:"le haut-de-forme"}, en:{m:"the top hat", p:"top hatt"},
           es:{m:"la chistera"}, it:{m:"il cilindro"},
           de:{m:"der Zylinder", p:"tsu-linn-deur"}, ja:{m:"シルクハット", p:"shiruku hatto"},
           ar:{m:"القبعة العالية"} },
    def:{ fr:"Il se porte avec la queue-de-pie, aux niveaux élevés seulement — jamais avec la veste. ⚠️ Il recule partout au profit de la bombe : plusieurs fédérations l'ont interdit, et beaucoup de cavaliers de haut niveau y ont renoncé d'eux-mêmes.",
          en:"Worn with the tailcoat, at the top levels only — never with a show jacket. It's disappearing in favour of a hat: several federations have banned it, and many top riders gave it up themselves.",
          es:"Se lleva con el frac, solo en los niveles altos — nunca con la chaqueta. Está desapareciendo en favor del casco: varias federaciones lo han prohibido.",
          it:"Si porta con il frac, solo ai livelli alti — mai con la giacca. Sta sparendo a favore del cap: diverse federazioni l'hanno vietato.",
          de:"Wird zum Frack getragen, nur in den höheren Klassen — nie zum Turnierjackett. Er verschwindet zugunsten der Kappe: mehrere Verbände haben ihn verboten.",
          ja:"燕尾服と合わせ、上級でのみ着用します。ジャケットとは合わせません。安全のためヘルメットに置き換わりつつあり、禁止した連盟もあります。",
          ar:"تلبس مع معطف الذيل، في المستويات العالية فقط — ولا تلبس مع السترة أبدا. ⚠️ إنها تتراجع في كل مكان لمصلحة الخوذة: عدة اتحادات منعتها، وكثير من فرسان القمة تخلوا عنها." } },

  { ref:"queue-de-pie", lecon:4, coll:"notation",
    mots:{ fr:{m:"la queue-de-pie"}, en:{m:"the tailcoat", p:"téïl-kôte", var:"shadbelly (US)"},
           es:{m:"el frac"}, it:{m:"il frac"},
           de:{m:"der Frack", p:"frak"}, ja:{m:"燕尾服", p:"enbifuku"},
           ar:{m:"معطف الذيل"} },
    def:{ fr:"Réservée aux épreuves de haut niveau ; la veste courte partout ailleurs. ⚠️ Les Américains l'appellent **shadbelly**, littéralement « ventre d'alose » — un mot que personne ne devine.",
          en:"For upper levels only; a short jacket everywhere else. Americans call it a shadbelly, « shad belly », which nobody guesses.",
          es:"Reservado a las pruebas de alto nivel; la chaqueta corta en el resto. ⚠️ Los americanos lo llaman **shadbelly**, literalmente « vientre de sábalo » — una palabra que nadie adivina.",
          it:"Riservato alle prove di alto livello; la giacca corta ovunque altro. ⚠️ Gli americani lo chiamano **shadbelly**, alla lettera « ventre di alosa » — una parola che nessuno indovina.",
          de:"Den hohen Prüfungen vorbehalten; sonst das kurze Jackett. ⚠️ Die Amerikaner nennen ihn **shadbelly**, wörtlich « Maifischbauch » — ein Wort, auf das niemand kommt.",
          ja:"上級競技だけの装い。それ以外はショートジャケットです。⚠️ アメリカでは **shadbelly** — 直訳すれば「ニシンの腹」。誰にも見当のつかない言葉です。",
          ar:"مخصص لاختبارات المستوى العالي؛ والسترة القصيرة في كل ما عداها. ⚠️ الأمريكيون يسمونه **shadbelly**، حرفيا «بطن سمكة الشابل» — كلمة لا يخمنها أحد." } },

  { ref:"kur", lecon:4, coll:"notation",
    mots:{ fr:{m:"la reprise libre en musique"}, en:{m:"the freestyle", p:"fri-staïl", var:"kür"},
           es:{m:"la Kür", var:"el ejercicio libre"}, it:{m:"il freestyle", var:"la Kür"},
           de:{m:"die Kür", p:"kur"}, ja:{m:"自由演技", p:"jiyū engi"},
           ar:{m:"الاختبار الحر على الموسيقى"} }, // ??
    def:{ fr:"Une reprise composée par le cavalier sur sa musique, avec des figures imposées à placer librement. ⚠️ Le mot allemand **die Kür** s'emploie tel quel dans le monde entier, y compris sur les protocoles internationaux.",
          en:"A test the rider builds to their own music, with required movements placed freely. The German word Kür is used worldwide.",
          es:"Una reprise compuesta por el jinete sobre su música, con figuras impuestas colocadas libremente. ⚠️ La palabra alemana **die Kür** se emplea tal cual en el mundo entero, incluso en los protocolos internacionales.",
          it:"Una ripresa composta dal cavaliere sulla sua musica, con figure imposte da piazzare liberamente. ⚠️ La parola tedesca **die Kür** si usa tale e quale nel mondo intero, anche sui protocolli internazionali.",
          de:"Eine vom Reiter zu eigener Musik gestaltete Aufgabe mit frei platzierten Pflichtlektionen. ⚠️ **Die Kür** wird weltweit im Original verwendet — auch auf internationalen Protokollen.",
          ja:"騎手が自分の音楽に振り付ける自由演技。規定の運動を自由な位置に組み込みます。⚠️ ドイツ語の **die Kür** は国際的な採点表の上でも、世界じゅうでそのまま使われています。",
          ar:"اختبار يؤلفه الفارس على موسيقاه، مع أشكال مفروضة يضعها بحرية. ⚠️ الكلمة الألمانية **die Kür** تستعمل كما هي في العالم كله، حتى على أوراق التحكيم." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"mouvement-double", lecon:4,
      fr:"Ce mouvement est en coefficient deux ?",
      en:"Does this movement carry double marks ?",
      es:"¿ Este movimiento lleva coeficiente dos ?",
      it:"Questo movimento ha coefficiente due ?",
      de:"Hat diese Lektion einen Koeffizienten ?",
      ja:"この 課題 は 係数 二 です か ?",
      ar:"هل هذه الحركة بمعامل اثنين؟" },
    { ref:"protocole-recuperer", lecon:4,
      fr:"Où je récupère mon protocole ?",
      en:"Where do I collect my sheet ?",
      es:"¿ Dónde recojo mi protocolo ?",
      it:"Dove ritiro il mio protocollo ?",
      de:"Wo hole ich mein Protokoll ab ?",
      ja:"採点表 は どこ で 受け取り ます か ?",
      ar:"من أين أستلم ورقة التحكيم؟" },
    { ref:"soixante-cinq", lecon:4,
      fr:"65 %, son meilleur résultat.",
      en:"65 % — her best yet.",
      es:"65 %, su mejor resultado.",
      it:"65 %, il suo miglior risultato.",
      de:"65 % — ihr bestes Ergebnis.",
      ja:"65 パーセント、 自己 ベスト です。",
      ar:"65 %، أفضل نتيجة له." },
    { ref:"cloche-erreur", lecon:4,
      fr:"Je me suis trompée de figure.",
      en:"I went the wrong way.",
      es:"Me equivoqué de figura.",
      it:"Ho sbagliato figura.",
      de:"Ich bin falsch geritten.",
      ja:"経路 を 間違え まし た。",
      ar:"لقد أخطأت في الشكل." },
    { ref:"controle-sortie", lecon:4,
      fr:"Reste à cheval pour le contrôle.",
      en:"Stay on for the tack check.",
      es:"Quédate montada para el control.",
      it:"Resta a cavallo per il controllo.",
      de:"Bleib sitzen für die Kontrolle.",
      ja:"検査 まで 馬 に 乗っ た まま で。",
      ar:"ابقي على السرج من أجل الفحص." }
  ]
};
