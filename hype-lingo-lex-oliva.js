/* hype-lingo-lex-oliva.js — Hype Lingo · Chapitre « Le concours »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-concours.js, leçon 1
   — AUCUN ref, AUCUNE définition, AUCUNE phrase modifiée. Seul le nom
   de la clé de chapitre change : `concours` devient `oliva`. Le
   dialogue `dialogueOliva` est renommé `dialogue` (un seul dialogue
   dans ce fichier désormais).

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE. Blandine tranchera
   si elle veut un titre propre à Oliva Nova.

   UNE SEULE LEÇON, CONSERVÉE À L'IDENTIQUE :
     · leçon 1 — s'engager (19 concepts)

   Les leçons 2 (Badminton), 3 (réserve) et 4 (Rome) sont déplacées
   séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.oliva = {
  ref: "oliva",
  titre: { fr:"Le concours", en:"The show", es:"El concurso", it:"Il concorso", de:"Das Turnier", ja:"競技会", ar:"المسابقة" },
  lecons: 1,

  concepts: [

  { ref:"concours", lecon:1, coll:"engager",
    mots:{ fr:{m:"le concours"}, en:{m:"the show", p:"chô", var:"the competition · the event"},
           es:{m:"el concurso"}, it:{m:"il concorso"},
           de:{m:"das Turnier", p:"tour-nir"}, ja:{m:"競技会", p:"kyōgikai"},
           ar:{m:"المسابقة"} },
    def:{ fr:"⚠️ L'anglais dit **the show**, et pour le complet **the event**. « Concourse » existe en anglais mais désigne le hall d'une gare : à ne pas employer.",
          en:"English says the show, or the event for eventing. « Concourse » exists but means a station hall.",
          es:"⚠️ El inglés dice **the show**, y para el completo **the event**. « Concourse » existe en inglés pero designa el vestíbulo de una estación: no emplear.",
          it:"⚠️ L'inglese dice **the show**, e per il completo **the event**. « Concourse » esiste in inglese ma indica l'atrio di una stazione: da non usare.",
          de:"⚠️ Das Englische sagt **the show**, für die Vielseitigkeit **the event**. « Concourse » gibt es — es meint die Bahnhofshalle: nicht verwenden.",
          ja:"⚠️ 英語では **the show**、総合馬術なら **the event** と言います。« concourse » という英単語はありますが、駅のコンコースのこと。使ってはいけません。",
          ar:"⚠️ في الإنجليزية، تستخدم كلمة **the show** للمسابقة، وتستخدم كلمة **the event** كثيرا للمسابقة أو للحدث بأكمله، ولا سيما في الفروسية الثلاثية. أما كلمة «concourse» فتعني بهو محطة أو مطار، ولا تستخدم لترجمة «concours»." } },

  { ref:"engagement", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'engagement"}, en:{m:"the entry", p:"èn-tri"},
           es:{m:"la inscripción"}, it:{m:"l'iscrizione"},
           de:{m:"die Nennung", p:"nè-noung"}, ja:{m:"出場申込", p:"shutsujō mōshikomi"},
           ar:{m:"التسجيل"} }, // ??
    def:{ fr:"L'inscription à une épreuve, avec sa date de clôture. À l'étranger, c'est là qu'on découvre qu'il faut une licence du pays ou un passeport à jour — à vérifier des semaines avant, pas la veille.",
          en:"Entering a class, with its closing date. Abroad this is where you find out you need a local membership or an up-to-date passport.",
          es:"La inscripción a una prueba, con su fecha de cierre. En el extranjero es ahí donde uno descubre que hace falta una licencia del país o un pasaporte al día — a verificar semanas antes, no la víspera.",
          it:"L'iscrizione a una prova, con la sua data di chiusura. All'estero è lì che si scopre che serve una licenza del paese o un passaporto aggiornato — da verificare settimane prima, non la vigilia.",
          de:"Die Nennung zu einer Prüfung, mit Nennschluss. Im Ausland entdeckt man hier, dass eine Landeslizenz oder ein aktueller Pass nötig ist — Wochen vorher prüfen, nicht am Vorabend.",
          ja:"競技へのエントリー。締切日があります。海外では、その国のライセンスや最新のパスポートが要ると気づくのがここ — 確認は数週間前に。前日ではなく。",
          ar:"التسجيل في شوط قبل الموعد المحدد لإغلاق باب التسجيل. وعند المشاركة في الخارج، يجب التحقق مسبقا من صلاحية رخصة الفروسية، وتسجيل الفارسة والحصان، وجواز سفر الحصان، والمتطلبات التي تفرضها المسابقة والاتحاد المختص. تحققي من ذلك قبل أسابيع، لا في الليلة السابقة." } },

  { ref:"epreuve", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'épreuve"}, en:{m:"the class", p:"klass"},
           es:{m:"la prueba"}, it:{m:"la prova"},
           de:{m:"die Prüfung", p:"pru-foung"}, ja:{m:"競技", p:"kyōgi"},
           ar:{m:"الشوط"} },
    def:{ fr:"⚠️ Un des faux amis les plus coûteux du module : l'anglais dit **the class**. Ni « the proof », ni « the trial », ni « the event » — event désigne le concours entier. « Which class are you in ? » veut dire « tu fais quelle épreuve ? ».",
          en:"English says the class. Not proof, not trial, and not event, which means the whole competition.",
          es:"⚠️ Uno de los falsos amigos más caros del módulo: el inglés dice **the class**. Ni « the proof », ni « the trial », ni « the event » — event designa el concurso entero. « Which class are you in ? » significa « ¿qué prueba haces? ».",
          it:"⚠️ Uno dei falsi amici più costosi del modulo: l'inglese dice **the class**. Né « the proof », né « the trial », né « the event » — event indica il concorso intero. « Which class are you in ? » vuol dire « che prova fai? ».",
          de:"⚠️ Einer der teuersten falschen Freunde des Moduls: Das Englische sagt **the class**. Weder « the proof » noch « the trial » noch « the event » — event ist das ganze Turnier. « Which class are you in ? » heißt « In welcher Prüfung startest du? ».",
          ja:"⚠️ この教材で最も高くつく偽りの友のひとつ。英語は **the class** と言います。« the proof » でも « the trial » でも « the event » でもありません — event は大会全体のこと。« Which class are you in ? » は「どの競技に出るの？」の意味です。",
          ar:"⚠️ من أكثر الألفاظ الإنجليزية تضليلا في هذا الفصل كلمة **class**، فهي تعني هنا «الشوط». ولا تستخدم proof أو trial لهذا المعنى، بينما تدل event غالبا على المسابقة أو الحدث بأكمله. وتعني عبارة «Which class are you in?» «في أي شوط تشاركين؟»." } },

  { ref:"liste-depart", lecon:1, coll:"engager",
    mots:{ fr:{m:"la liste de départ"}, en:{m:"the start list", p:"start liste", var:"the running order"},
           es:{m:"la lista de salida"}, it:{m:"l'ordine di partenza"},
           de:{m:"die Startliste", p:"chtart-liss-te"}, ja:{m:"出場順", p:"shutsujōjun"},
           ar:{m:"قائمة الانطلاق"} }, // ??
    def:{ fr:"L'ordre de passage, affiché la veille ou le matin. Les Britanniques disent aussi **the running order**, et il change souvent : on le revérifie en arrivant, toujours.",
          en:"The order of go, posted the night before or that morning. It changes often, so always check again on arrival.",
          es:"El orden de salida, expuesto la víspera o por la mañana. Los británicos dicen también **the running order**, y cambia a menudo: se vuelve a comprobar al llegar, siempre.",
          it:"L'ordine di partenza, affisso la vigilia o la mattina. I britannici dicono anche **the running order**, e cambia spesso: si ricontrolla arrivando, sempre.",
          de:"Die Startreihenfolge, am Vorabend oder Morgen ausgehängt. Die Briten sagen auch **the running order** — sie ändert sich oft: Bei Ankunft immer neu prüfen.",
          ja:"出走順。前日か当日の朝に掲示されます。イギリスでは **the running order** とも言い、しかもよく変わります。着いたら必ず見直すこと。",
          ar:"قائمة تحدد ترتيب مرور المشاركين، وتنشر عادة في الليلة السابقة أو صباح المسابقة. ويستخدم البريطانيون أيضا مصطلح **the running order**. وقد يتغير الترتيب، لذلك تحققي منه مرة أخرى عند وصولك." } },

  { ref:"dossard", lecon:1, coll:"engager",
    mots:{ fr:{m:"le dossard"}, en:{m:"the number", p:"neum-beur", var:"number cloth · bridle number"},
           es:{m:"el dorsal"}, it:{m:"il numero di gara"},
           de:{m:"die Startnummer", p:"chtart-nou-meur"}, ja:{m:"ゼッケン", p:"zekken"},
           ar:{m:"رقم المشاركة"} },
    def:{ fr:"Sans lui, pas de départ, et il doit rester visible du début à la fin. ⚠️ Curiosité japonaise : **ゼッケン** désigne à la fois le dossard et le tapis de selle (chapitre 4), parce que le numéro se porte justement sur le tapis.",
          en:"No number, no start, and it must stay visible throughout. In Japanese, ゼッケン means both the number and the saddle cloth, since the number is worn on it.",
          es:"Sin él no hay salida, y debe quedar visible de principio a fin. ⚠️ Curiosidad japonesa: **ゼッケン** designa a la vez el dorsal y el sudadero (capítulo 4), porque el número se lleva justamente sobre el sudadero.",
          it:"Senza di lui niente partenza, e deve restare visibile dall'inizio alla fine. ⚠️ Curiosità giapponese: **ゼッケン** indica sia il pettorale sia il sottosella (capitolo 4), perché il numero si porta proprio sul sottosella.",
          de:"Ohne sie kein Start, und sie muss von Anfang bis Ende sichtbar bleiben. ⚠️ Japanische Kuriosität: **ゼッケン** meint Startnummer UND Schabracke (Kapitel 4) — die Nummer sitzt ja auf der Schabracke.",
          ja:"これがなければ出走できず、最初から最後まで見えていなければなりません。⚠️ 日本語の面白いところ：**ゼッケン**は出走番号とゼッケン（鞍下敷き・第4章）の両方を指します。番号はまさにその布の上につけるからです。",
          ar:"رقم يسمح بالتعرف على المشاركة أو على الحصان والفارسة بحسب نظام المسابقة، ويجب أن يبقى ظاهرا وفقا للائحة المعمول بها. ⚠️ وفي اليابانية تستخدم كلمة **ゼッケン** للرقم ولبدة السرج التي تحمل الرقم." } },

  { ref:"secretariat", lecon:1, coll:"engager",
    mots:{ fr:{m:"le secrétariat"}, en:{m:"the show secretary", p:"sè-kre-tri", var:"the show office"},
           es:{m:"la secretaría"}, it:{m:"la segreteria"},
           de:{m:"die Meldestelle", p:"mèl-de-chtè-le"}, ja:{m:"事務局", p:"jimukyoku"},
           ar:{m:"مكتب التسجيل"} },
    def:{ fr:"Le premier arrêt en arrivant : dossard, horaires, protocoles, forfaits. En Grande-Bretagne, **the secretary** désigne la personne autant que le bureau, et c'est elle qui règle tout.",
          en:"Your first stop on arrival: number, times, sheets, withdrawals. In Britain « the secretary » is both the person and the office.",
          es:"La primera parada al llegar: dorsal, horarios, protocolos, retiradas. En Gran Bretaña, **the secretary** designa tanto a la persona como a la oficina, y es ella quien lo arregla todo.",
          it:"La prima sosta arrivando: pettorale, orari, protocolli, ritiri. In Gran Bretagna **the secretary** indica la persona quanto l'ufficio, ed è lei che sistema tutto.",
          de:"Der erste Halt bei Ankunft: Startnummer, Zeiten, Protokolle, Absagen. In Großbritannien meint **the secretary** Person wie Büro — und sie regelt alles.",
          ja:"到着してまず寄る場所。ゼッケン、時間割、採点表、棄権の手続き。イギリスの **the secretary** は事務所と人の両方を指し、すべてを取り仕切ってくれるのはその人です。",
          ar:"أول مكان تتوجهين إليه عند الوصول للاستفسار عن أرقام المشاركة والمواعيد والوثائق والانسحابات. وفي بريطانيا قد تدل كلمة **the secretary** على مسؤول أمانة المسابقة، لا على المكتب نفسه فقط." } },

  { ref:"commissaire", lecon:1, coll:"engager",
    mots:{ fr:{m:"le commissaire"}, en:{m:"the steward", p:"stiou-eurd"},
           es:{m:"el comisario"}, it:{m:"il commissario"},
           de:{m:"der Steward", p:"stiou-eurd", var:"der Ordner"}, ja:{m:"スチュワード", p:"suchuwādo"},
           ar:{m:"المشرف (Steward)"} }, // ??
    def:{ fr:"Il surveille la détente, contrôle les embouchures et fait respecter la sécurité. ⚠️ Le mot anglais **steward** n'a rien à voir avec l'aviation : c'est lui qu'on trouve dans le paddock, et il a autorité pour éliminer.",
          en:"They supervise the warm-up, check tack and enforce safety. « Steward » here has nothing to do with aircraft.",
          es:"Vigila el calentamiento, controla las embocaduras y hace respetar la seguridad. ⚠️ La palabra inglesa **steward** no tiene nada que ver con la aviación: es él quien está en el paddock, y tiene autoridad para eliminar.",
          it:"Sorveglia il campo prova, controlla le imboccature e fa rispettare la sicurezza. ⚠️ La parola inglese **steward** non c'entra con l'aviazione: è lui che trovi nel paddock, e ha autorità per eliminare.",
          de:"Überwacht das Abreiten, prüft die Gebisse, sorgt für Sicherheit. ⚠️ **Steward** hat nichts mit Luftfahrt zu tun: Er steht im Abreiteplatz — und darf ausschließen.",
          ja:"練習馬場を見張り、ハミを検査し、安全を守らせる係。⚠️ 英語の **steward** は飛行機とは無関係。パドックにいるのがこの人で、失権させる権限を持っています。",
          ar:"يراقب ميدان الإحماء، ويتحقق من المعدات، ويساعد على تطبيق قواعد السلامة والرفق بالحصان. ⚠️ وفي الإنجليزية يسمى **steward**. وإذا لاحظ مخالفة، يتدخل ويرفع الأمر إلى المسؤولين أو لجنة التحكيم لاتخاذ القرار المناسب." } },

  { ref:"chef-piste", lecon:1, coll:"engager",
    mots:{ fr:{m:"le chef de piste"}, en:{m:"the course designer", p:"korss di-zaï-neur", var:"course builder"},
           es:{m:"el jefe de pista"}, it:{m:"il disegnatore di percorsi", var:"il direttore di campo"}, /* it precise (rapport 07/08) */
           de:{m:"der Parcourschef", p:"par-kour-chèf"}, ja:{m:"コースデザイナー", p:"kōsu dezainā"},
           ar:{m:"مصمم المسار"} },
    def:{ fr:"Celui qui dessine le parcours, choisit les distances et décide de la difficulté. ⚠️ L'anglais insiste sur le dessin (**designer**), le français sur l'autorité (le chef), l'allemand mélange les deux.",
          en:"The person who plans the course, sets the distances and decides the difficulty. English stresses the design, French the authority.",
          es:"El que dibuja el recorrido, elige las distancias y decide la dificultad. ⚠️ El inglés insiste en el dibujo (**designer**), el francés en la autoridad (el jefe), el alemán mezcla los dos.",
          it:"Colui che disegna il percorso, sceglie le distanze e decide la difficoltà. ⚠️ L'inglese insiste sul disegno (**designer**), il francese sull'autorità (il capo), il tedesco mescola i due.",
          de:"Er entwirft den Parcours, wählt die Distanzen, bestimmt die Schwierigkeit. ⚠️ Das Englische betont das Entwerfen (**designer**), das Französische die Autorität (der Chef) — das Deutsche mischt beides.",
          ja:"コースを描き、距離を選び、難度を決める人。⚠️ 英語は設計を強調し（**designer**）、フランス語は権限を（「長」）、ドイツ語はその両方を混ぜています。",
          ar:"الشخص الذي يصمم مسار القفز، ويحدد الحواجز والمسافات ودرجة الصعوبة ضمن القواعد المعمول بها." } },

  { ref:"cocarde", lecon:1, coll:"engager",
    mots:{ fr:{m:"la cocarde", var:"le flot"}, en:{m:"the rosette", p:"rô-zètt", var:"ribbon (US)"},
           es:{m:"la escarapela"}, it:{m:"la coccarda"},
           de:{m:"die Schleife", p:"chlaï-fe"}, ja:{m:"ロゼット", p:"rozetto"},
           ar:{m:"شارة الفوز"} }, // ??
    def:{ fr:"Le souvenir que tu rapportes de Badminton. ⚠️ Deux pièges : les Américains disent **ribbon**, et surtout **la couleur de la première place change de pays** — rouge en Grande-Bretagne et en Irlande, bleu aux États-Unis. Un cavalier britannique fier de sa rosette rouge a gagné, pas fini deuxième.",
          en:"Two traps: Americans say ribbon, and first place is red in Britain and Ireland but blue in the United States.",
          es:"El recuerdo que traes de Badminton. ⚠️ Dos trampas: los americanos dicen **ribbon**, y sobre todo **el color del primer puesto cambia de país** — rojo en Gran Bretaña e Irlanda, azul en Estados Unidos. Un jinete británico orgulloso de su escarapela roja ganó, no quedó segundo.",
          it:"Il ricordo che riporti da Badminton. ⚠️ Due trappole: gli americani dicono **ribbon**, e soprattutto **il colore del primo posto cambia paese** — rosso in Gran Bretagna e Irlanda, blu negli Stati Uniti. Un cavaliere britannico fiero della sua coccarda rossa ha vinto, non è arrivato secondo.",
          de:"Dein Andenken aus Badminton. ⚠️ Zwei Fallen: Amerikaner sagen **ribbon** — und vor allem **wechselt die Farbe des ersten Platzes das Land**: Rot in Großbritannien und Irland, Blau in den USA. Ein Brite, stolz auf seine rote Schleife, hat gewonnen — nicht Zweiter.",
          ja:"バドミントンから持ち帰る記念品。⚠️ 罠がふたつ。アメリカでは **ribbon** と言うこと、そして何より**一位の色が国によって違う**こと — 英愛では赤、アメリカでは青。赤いロゼットを誇らしげに掲げるイギリスの騎手は優勝者です。二位ではありません。",
          ar:"شارة تذكارية تعودين بها من أوليفا نوفا. ⚠️ ويقول الأمريكيون **ribbon**، بينما تختلف ألوان المراكز بحسب البلد. فالمركز الأول يكون أحمر في بريطانيا وإيرلندا، وأزرق في الولايات المتحدة، لذلك لا يمكن معرفة الترتيب من اللون وحده من دون معرفة النظام المحلي." } },

  /* ================================================================
     S'ENGAGER — huit entrées ajoutées le 17/08/2026 pour OLIVA NOVA,
     d'après le lexique fourni par Blandine. La leçon 1 avait
     `engagement` et `epreuve` mais rien de la mécanique réelle du
     bureau du concours.

     🟥 LE PIÈGE DU CHAPITRE, ET IL EST DOUBLE :
     · **S'ENGAGER N'EST PAS *TO ENGAGE***. On dit **to enter**.
       « Mon cheval est engagé » se dit *my horse is entered* — et
       surtout PAS *my horse is engaged*, qui veut dire qu'il est
       fiancé. C'est la faute la plus drôle et la plus fréquente.
     · **UNE ÉPREUVE SE DIT *A CLASS***, jamais *a test* (qui est le
       protocole de dressage) ni *an event* (qui est le concours entier,
       ou le complet). *What class are you entered in ?*

     🟥 LA SÉQUENCE DU BUREAU DU CONCOURS, posée par Blandine :
     **ENTRY → CONFIRMATION → START LIST → STARTING NUMBER → CLASS**
     C'est l'ordre du dialogue, et c'est l'ordre réel d'un matin de
     concours à l'étranger.
     ================================================================ */

  { ref:"frais-engagement", lecon:1, coll:"engager",
    mots:{ fr:{m:"les frais d'engagement"}, en:{m:"the entry fee", p:"èn-tri fii"},
           es:{m:"los derechos de inscripción"}, it:{m:"la quota d'iscrizione"},
           de:{m:"das Nenngeld", p:"nènn-guèlt"}, ja:{m:"参加料", p:"sankaryō"},
           ar:{m:"رسوم التسجيل"} },
    def:{ fr:"⚠️ Ils se paient à l'engagement, pas à l'arrivée, et ils NE SONT PAS REMBOURSÉS en cas de forfait tardif — c'est la règle partout. L'allemand dit *Nenngeld*, « l'argent de la nomination ».",
          en:"Paid when you enter, not on arrival, and not refunded if you withdraw late — that's the rule everywhere.",
          es:"Se pagan al inscribirse, no al llegar, y no se devuelven en caso de retirada tardía.",
          it:"Si pagano all'iscrizione, non all'arrivo, e non si rimborsano in caso di ritiro tardivo.",
          de:"Wird bei der Nennung fällig, nicht bei der Ankunft, und bei später Abmeldung nicht erstattet.",
          ja:"申し込み時に支払い、到着時ではありません。直前の欠場では返金されないのが世界共通の規則です。",
          ar:"⚠️ تدفع الرسوم عادة عند التسجيل. أما استردادها في حال الانسحاب فيعتمد على موعد الانسحاب وشروط المسابقة والوثائق المطلوبة. وبعد إغلاق باب التسجيل قد لا ترد الرسوم كلها أو قد تخصم منها مصاريف." } },

  { ref:"cloture-engagements", lecon:1, coll:"engager",
    mots:{ fr:{m:"la clôture des engagements"}, en:{m:"the closing date", p:"klô-zinng déïte", var:"the entry deadline"},
           es:{m:"el cierre de inscripciones"}, it:{m:"la chiusura delle iscrizioni"},
           de:{m:"der Nennungsschluss", p:"nèn-noungs-chlouss"}, ja:{m:"申込 締切", p:"mōshikomi shimekiri"},
           ar:{m:"إغلاق باب التسجيل"} },
    def:{ fr:"🟥 LA QUESTION À SAVOIR POSER EN PREMIER : « les engagements sont-ils encore ouverts ? ». Après la clôture on peut parfois entrer en **engagement tardif**, mais plus cher et sans garantie de place. ⚠️ L'allemand *Nennungsschluss* est un mot qu'on voit affiché partout sur les concours germanophones.",
          en:"The first question to know how to ask: « Are entries still open? ». After the deadline you can sometimes get in as a late entry, but it costs more and there's no guarantee of a place.",
          es:"La primera pregunta que hay que saber hacer: « ¿siguen abiertas las inscripciones? ». Después del cierre se puede entrar como inscripción tardía, más cara.",
          it:"La prima domanda da saper fare: « le iscrizioni sono ancora aperte? ». Dopo la chiusura si può entrare come iscrizione tardiva, più cara.",
          de:"Die erste Frage: « Sind die Nennungen noch offen? ». Nach dem Nennungsschluss geht manchmal eine Nachnennung, teurer und ohne Platzgarantie.",
          ja:"最初に覚えるべき質問：「申し込みはまだ受け付けていますか」。締切後は追加申込ができることもありますが、割高で出場の保証はありません。",
          ar:"🟥 السؤال الأول الذي يجب أن تعرفي طرحه هو: «هل ما زال باب التسجيل مفتوحا؟». وبعد الإغلاق قد يقبل **تسجيل متأخر** مقابل رسوم إضافية، إذا سمح النظام وبقيت أماكن شاغرة." } },

  { ref:"engagement-tardif", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'engagement tardif"}, en:{m:"a late entry", p:"léïte èn-tri"},
           es:{m:"la inscripción tardía"}, it:{m:"l'iscrizione tardiva"},
           de:{m:"die Nachnennung", p:"nakh-nèn-noung"}, ja:{m:"追加申込", p:"tsuika mōshikomi"},
           ar:{m:"التسجيل المتأخر"} },
    def:{ fr:"Engagement accepté après la clôture, contre un supplément. ⚠️ Il n'est pas automatique : il dépend des places restantes, et sur un grand concours il n'y en a pas.",
          en:"An entry taken after the deadline, for a supplement. It isn't automatic: it depends on remaining places, and at a big show there are none.",
          es:"Inscripción aceptada tras el cierre, con recargo. No es automática: depende de las plazas que queden.",
          it:"Iscrizione accettata dopo la chiusura, con supplemento. Non è automatica: dipende dai posti rimasti.",
          de:"Nennung nach dem Nennungsschluss, gegen Aufpreis. Nicht automatisch: es hängt von freien Plätzen ab.",
          ja:"締切後に受け付けられる申込で、追加料金がかかります。自動ではなく、残席次第です。大きな大会では空きがありません。",
          ar:"تسجيل يقبل بعد الموعد الأصلي للإغلاق، وغالبا مقابل رسوم إضافية. ⚠️ وهو ليس حقا تلقائيا، بل يعتمد على لائحة المسابقة وموافقة الجهة المنظمة وتوافر الأماكن." } },

  { ref:"liste-engages", lecon:1, coll:"engager",
    mots:{ fr:{m:"la liste des engagés"}, en:{m:"the entry list", p:"èn-tri liste"},
           es:{m:"la lista de inscritos"}, it:{m:"l'elenco degli iscritti"},
           de:{m:"die Nennungsliste", p:"nèn-noungs-liss-te"}, ja:{m:"出場申込 一覧", p:"shutsujō mōshikomi ichiran"},
           ar:{m:"قائمة المسجلين"} },
    def:{ fr:"⚠️ NE PAS CONFONDRE AVEC LA LISTE DE DÉPART : la liste des engagés dit QUI s'est inscrit, la liste de départ dit DANS QUEL ORDRE on passe. La première sort des semaines avant, la seconde la veille au soir ou le matin même.",
          en:"Not to be confused with the start list: the entry list says WHO has entered, the start list says IN WHAT ORDER you go. The first comes out weeks ahead, the second the night before or the same morning.",
          es:"No confundir con la lista de salida: la de inscritos dice QUIÉN se ha inscrito, la de salida DICE EN QUÉ ORDEN se pasa.",
          it:"Da non confondere con la lista di partenza: quella degli iscritti dice CHI si è iscritto, quella di partenza IN CHE ORDINE si passa.",
          de:"Nicht mit der Startliste verwechseln: die Nennungsliste sagt WER genannt hat, die Startliste IN WELCHER REIHENFOLGE geritten wird.",
          ja:"出走順のリストとは別物です。申込一覧は「誰が申し込んだか」、出走リストは「どの順で走るか」を示します。前者は数週間前、後者は前夜か当日朝に出ます。",
          ar:"⚠️ لا تخلطي بين قائمة المسجلين وقائمة الانطلاق. فقائمة المسجلين تبين أسماء المشاركين الذين سجلوا، أما قائمة الانطلاق فتحدد ترتيب مرورهم. وتنشر القائمتان في موعدين مختلفين بحسب تنظيم المسابقة." } },

  { ref:"numero-tetiere", lecon:1, coll:"engager",
    mots:{ fr:{m:"le numéro de têtière"}, en:{m:"the bridle number", p:"braï-deul neum-beur"},
           es:{m:"el número de cabezada"}, it:{m:"il numero da testiera"},
           de:{m:"die Kopfnummer", p:"kopf-nou-meur"}, ja:{m:"頭絡 番号", p:"tōraku bangō"},
           ar:{m:"رقم تعريف الحصان المثبت على اللجام"} },
    def:{ fr:"🟥 EN ANGLAIS C'EST **THE BRIDLE NUMBER**, jamais « the head number ». Deux petits numéros qui se fixent de chaque côté du filet — c'est le cheval qui est identifié, pas le cavalier. ⚠️ Le monter sans est un motif d'élimination sur beaucoup de concours : à récupérer au bureau AVANT de seller.",
          en:"« The bridle number », never « the head number ». Two small numbers clipped either side of the bridle — it identifies the horse, not the rider. Riding without them is grounds for elimination at many shows.",
          es:"En inglés « bridle number ». Dos números pequeños a cada lado de la cabezada: identifican al caballo, no al jinete.",
          it:"In inglese « bridle number ». Due numeretti ai lati della testiera: identificano il cavallo, non il cavaliere.",
          de:"Englisch « bridle number ». Zwei kleine Nummern beidseitig am Zaum — sie kennzeichnen das Pferd, nicht den Reiter.",
          ja:"英語では bridle number と言います。頭絡の両側につける小さな番号で、識別されるのは騎手ではなく馬です。多くの大会では、これなしで走ると失格の理由になります。事務局で受け取ってから鞍を置きます。",
          ar:"🟥 يسمى في الإنجليزية **the bridle number**. وهو رقم تعريف يثبت على اللجام أو في موضع تحدده لائحة المسابقة، حتى يمكن التعرف على الحصان. ⚠️ وقد تطلب بعض المسابقات رقما على كل جانب، بينما تختلف القواعد بحسب الحدث. تحققي من الرقم ومكان تثبيته في مكتب التسجيل قبل تجهيز الحصان." } },

  { ref:"changer-epreuve", lecon:1, coll:"engager", v:true,
    mots:{ fr:{m:"changer d'épreuve"}, en:{m:"to move to another class", p:"mouve tou e-neu-zeur klass"},
           es:{m:"cambiar de prueba"}, it:{m:"cambiare prova"},
           de:{m:"in eine andere Prüfung wechseln", p:"vèk-seulne"}, ja:{m:"競技を変更する", p:"kyōgi o henkō suru"},
           ar:{m:"نقل الحصان إلى شوط آخر"} },
    def:{ fr:"⚠️ L'ANGLAIS DIT **TO MOVE**, pas « to change » : *I'd like to move him to the 1.35*. Possible jusqu'à une heure limite, souvent la veille au soir. Monter d'une hauteur est plus simple que descendre — descendre demande parfois une justification.",
          en:"English says « to move », not « to change »: I'd like to move him to the 1.35. Possible up to a deadline, often the evening before. Moving up is easier than moving down.",
          es:"El inglés dice « to move », no « to change ». Posible hasta una hora límite, a menudo la víspera por la noche.",
          it:"L'inglese dice « to move », non « to change ». Possibile fino a un orario limite, spesso la sera prima.",
          de:"Englisch sagt « to move », nicht « to change ». Möglich bis zu einer Frist, oft am Vorabend.",
          ja:"英語では change ではなく move を使います。多くは前夜までの期限内なら変更できます。高いクラスへ上げるほうが、下げるより簡単です。",
          ar:"⚠️ تستخدم الإنجليزية كثيرا الفعل **to move**، مثل *I'd like to move him to the 1.35*. ويظل تغيير الشوط ممكنا حتى الموعد الذي تحدده الجهة المنظمة، بحسب الأماكن المتاحة واللائحة. وقد تخضع الزيادة أو الخفض في الارتفاع لشروط مختلفة." } },

  { ref:"declarer-forfait", lecon:1, coll:"engager", v:true,
    mots:{ fr:{m:"déclarer forfait"}, en:{m:"to withdraw", p:"ouiz-drô", var:"to scratch (US)"},
           es:{m:"retirarse"}, it:{m:"ritirarsi"},
           de:{m:"abmelden", p:"app-mel-den"}, ja:{m:"出場を取り消す", p:"shutsujō o torikesu"},
           ar:{m:"إعلان الانسحاب"} },
    def:{ fr:"⚠️ TROIS MOTS POUR TROIS MOMENTS EN ANGLAIS : **to withdraw** avant l'épreuve, **to retire** pendant (on sort de la piste), **to be eliminated** quand le jury décide. Ne pas les confondre. Les Américains disent aussi *to scratch*. 🟥 Déclarer forfait n'est pas un aveu : sur un cheval qui n'est pas bien, c'est la seule bonne décision.",
          en:"Three words for three moments: « to withdraw » before the class, « to retire » during it, « to be eliminated » when the judge decides. Americans also say « to scratch ». Withdrawing isn't an admission — on a horse who isn't right, it's the only good call.",
          es:"Tres palabras para tres momentos: retirarse antes, abandonar durante, ser eliminado por el jurado.",
          it:"Tre parole per tre momenti: ritirarsi prima, abbandonare durante, essere eliminati dalla giuria.",
          de:"Drei Wörter für drei Momente: vorher abmelden, währenddessen aufgeben, vom Richter ausgeschlossen werden.",
          ja:"英語では三つの場面で三つの語を使い分けます。競技前は to withdraw、競技中に自らやめるのは to retire、審判の判断によるものは to be eliminated。棄権は敗北ではありません。調子の悪い馬では唯一の正しい判断です。",
          ar:"⚠️ تستخدم الإنجليزية ثلاثة مصطلحات بحسب اللحظة: **to withdraw** للانسحاب قبل الشوط، و**to retire** للتوقف أثناء الجولة والخروج من الميدان، و**to be eliminated** عندما تقرر لجنة التحكيم الإقصاء. ويستخدم الأمريكيون أيضا *to scratch*. 🟥 والانسحاب ليس اعترافا بالفشل، بل قد يكون القرار الصحيح إذا لم يكن الحصان في حالة تسمح له بالمشاركة." } },

  { ref:"engagement-confirme", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'engagement confirmé"}, en:{m:"the entry confirmed", p:"keune-feurmd"},
           es:{m:"la inscripción confirmada"}, it:{m:"l'iscrizione confermata"},
           de:{m:"die bestätigte Nennung", p:"be-chtè-tich-te"}, ja:{m:"申込 確認済み", p:"mōshikomi kakuninzumi"},
           ar:{m:"تأكيد التسجيل"} },
    def:{ fr:"🟥 LA QUESTION QUI SAUVE UN WEEK-END : « mon engagement a-t-il bien été enregistré ? ». Un engagement payé n'est pas toujours un engagement enregistré — un formulaire perdu, un virement non rapproché, et le nom n'est pas sur la liste. ⚠️ On vérifie au bureau la veille, pas le matin de l'épreuve.",
          en:"The question that saves a weekend: « Has my entry been confirmed? ». A paid entry isn't always a recorded entry — a lost form, an unmatched transfer, and your name isn't on the list. Check at the office the day before, not on the morning of the class.",
          es:"La pregunta que salva un fin de semana: « ¿se ha registrado bien mi inscripción? ». Una inscripción pagada no siempre está registrada.",
          it:"La domanda che salva un weekend: « la mia iscrizione è stata registrata? ». Un'iscrizione pagata non è sempre un'iscrizione registrata.",
          de:"Die Frage, die ein Wochenende rettet: « Ist meine Nennung bestätigt? ». Eine bezahlte Nennung ist nicht immer eine eingetragene.",
          ja:"週末を救う質問：「申し込みは登録されていますか」。支払い済みでも登録されていないことがあります。書類の紛失、振込の未照合。前日に事務局で確認します。当日の朝では遅いのです。",
          ar:"🟥 السؤال الذي قد ينقذ عطلة نهاية الأسبوع هو: «هل تم تسجيل مشاركتي وتأكيدها فعلا؟». فقد تسدد الرسوم من دون أن يظهر الاسم في القائمة بسبب خطأ في الاستمارة أو في مطابقة الدفع. ⚠️ لذلك تحققي من تأكيد التسجيل قبل موعد الشوط بوقت كاف." } },

  { ref:"prix", lecon:1, coll:"engager",
    mots:{ fr:{m:"le prix"}, en:{m:"the prize money", p:"praïz meu-ni"},
           es:{m:"el premio"}, it:{m:"il premio"},
           de:{m:"das Preisgeld", p:"praïss-guèlt"}, ja:{m:"賞金", p:"shōkin"},
           ar:{m:"الجائزة المالية"} },
    def:{ fr:"Dans les épreuves de club, il n'y en a souvent pas — juste la cocarde. Dans les grands concours, il se répartit entre les premiers classés selon un barème affiché à l'avance.",
          en:"At club level there is often none, just the rosette. At big shows it is split among the placings by a published scale.",
          es:"En las pruebas de club a menudo no lo hay — solo la escarapela. En los grandes concursos se reparte entre los primeros clasificados según un baremo publicado de antemano.",
          it:"Nelle prove di club spesso non c'è — solo la coccarda. Nei grandi concorsi si ripartisce tra i primi classificati secondo un tariffario affisso in anticipo.",
          de:"In Clubprüfungen gibt es oft keins — nur die Schleife. Bei großen Turnieren wird es nach vorab ausgehängtem Schlüssel unter den Erstplatzierten verteilt.",
          ja:"クラブ競技には賞金がないことも多く、あるのはロゼットだけ。大きな大会では、事前に掲示された配分表に従って上位入賞者に分けられます。",
          ar:"قد لا تقدم الأشواط التعليمية أو المحلية جوائز مالية، بل شارات أو هدايا فقط. وفي المسابقات الكبرى توزع الجوائز المالية بين أصحاب المراكز الأولى بحسب الجدول المنشور في برنامج المسابقة." } },

  { ref:"licence", lecon:1, coll:"engager",
    mots:{ fr:{m:"la licence"}, en:{m:"the membership", p:"mèm-beur-chip", var:"the licence"},
           es:{m:"la licencia"}, it:{m:"la tessera"},
           de:{m:"die Turnierlizenz", p:"tour-nir-li-tsèntss"}, ja:{m:"会員証", p:"kaiinshō"},
           ar:{m:"رخصة الفروسية"} }, // ??
    def:{ fr:"⚠️ Le point qui bloque le plus souvent un cavalier à l'étranger : l'anglais parle de **membership**, l'adhésion à la fédération, pas de « licence ». En Grande-Bretagne, sortir en concours affilié demande d'être membre de British Eventing ou de British Showjumping.",
          en:"The thing that most often blocks a visiting rider: English says membership, not licence. Affiliated shows need you to be a member.",
          es:"⚠️ El punto que más a menudo bloquea a un jinete en el extranjero: el inglés habla de **membership**, la afiliación a la federación, no de « licence ». En Gran Bretaña, salir en concurso afiliado exige ser miembro de British Eventing o British Showjumping.",
          it:"⚠️ Il punto che più spesso blocca un cavaliere all'estero: l'inglese parla di **membership**, l'adesione alla federazione, non di « licence ». In Gran Bretagna, uscire in concorso affiliato richiede di essere membri di British Eventing o British Showjumping.",
          de:"⚠️ Der Punkt, der Reiter im Ausland am häufigsten stoppt: Das Englische spricht von **membership**, der Verbandsmitgliedschaft — nicht von « licence ». In Großbritannien verlangt ein affiliiertes Turnier die Mitgliedschaft bei British Eventing oder British Showjumping.",
          ja:"⚠️ 海外で騎手がいちばん引っかかる点。英語で言うのは **membership** — 連盟への加入のことで、« licence » ではありません。イギリスの公認競技会に出るには、British Eventing か British Showjumping の会員であることが必要です。",
          ar:"⚠️ من أكثر النقاط التي قد تعطل مشاركة الفارسة في الخارج صلاحية تسجيلها الرياضي. وتستخدم الإنجليزية بحسب النظام كلمات مثل **membership** و**registration** أكثر من «licence». وفي المسابقات البريطانية المعتمدة، يجب التحقق من متطلبات عضوية الفارسة وتسجيل الحصان أو من التصاريح المؤقتة المتاحة." } },

  /* ============ LEÇON 2 · LE CONCOURS COMPLET ============ */

  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-epreuve", lecon:1,
      fr:"Tu passes à quelle heure ?",
      en:"What time are you on ?",
      es:"¿ A qué hora pasas ?",
      it:"A che ora passi ?",
      de:"Wann bist du dran ?",
      ja:"何時 に 出番 です か ?",
        ar:"في أي ساعة يحين دورك؟" },
    { ref:"ou-secretariat", lecon:1,
      fr:"Je viens chercher mon dossard.",
      en:"I've come for my number.",
      es:"Vengo a por mi dorsal.",
      it:"Vengo a prendere il numero.",
      de:"Ich hole meine Startnummer.",
      ja:"ゼッケン を 取り に 来 まし た。",
        ar:"جئت لاستلام رقم مشاركتي." },
    { ref:"licence-etrangere", lecon:1,
      fr:"Ma licence suffit pour concourir ?",
      en:"Is my membership enough to compete ?",
      es:"¿ Basta mi licencia para competir ?",
      it:"Basta la mia licenza per gareggiare ?",
      de:"Reicht meine Lizenz zum Starten ?",
      ja:"ライセンス で 出場 でき ます か ?",
        ar:"هل تكفي رخصة الفروسية التي أحملها للمشاركة؟" },
  ],

  dialogue: {
    ville: "oliva", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · m'engager ---- */
      { ref:"do-engager-demain", temps:1, dit:"joueuse", mots:["engagement","epreuve"],
        fr:"Je voudrais m'engager dans l'épreuve de demain.",
        en:"I'd like to enter tomorrow's class.",
        es:"Quisiera inscribirme en la prueba de mañana.",
        it:"Vorrei iscrivermi alla prova di domani.",
        de:"Ich möchte für die morgige Prüfung nennen.",
        ja:"明日 の 競技 に 申し込み たい の です が。",
        ar:"أود تسجيل حصاني في شوط الغد." },

      { ref:"do-encore-ouverts", temps:1, dit:"joueuse", mots:["engagement","cloture-engagements"],
        fr:"Les engagements sont-ils encore ouverts ?",
        en:"Are entries still open?",
        es:"¿Siguen abiertas las inscripciones?",
        it:"Le iscrizioni sono ancora aperte?",
        de:"Sind die Nennungen noch offen?",
        ja:"申し込み は まだ 受け付け て い ます か ?",
        ar:"هل ما زال باب التسجيل مفتوحا؟" },

      { ref:"do-date-cloture", temps:1, dit:"joueuse", mots:["cloture-engagements"],
        fr:"Quelle est la date de clôture des engagements ?",
        en:"When is the closing date for entries?",
        es:"¿Cuál es la fecha de cierre de las inscripciones?",
        it:"Qual è la data di chiusura delle iscrizioni?",
        de:"Wann ist Nennungsschluss?",
        ja:"申込 締切 は いつ です か ?",
        ar:"ما الموعد النهائي للتسجيل؟" },

      { ref:"do-quelle-epreuve", temps:1, dit:"joueuse", mots:["epreuve","engagement"],
        fr:"Dans quelle épreuve mon cheval peut-il s'engager ?",
        en:"Which class can my horse enter?",
        es:"¿En qué prueba puede inscribirse mi caballo?",
        it:"In quale prova può iscriversi il mio cavallo?",
        de:"In welcher Prüfung kann mein Pferd starten?",
        ja:"私 の 馬 は どの 競技 に 出 られ ます か ?",
        ar:"في أي شوط يمكنني تسجيل حصاني؟" },

      /* ---- temps 2 · quelle épreuve, à quel prix ---- */
      { ref:"do-130", temps:2, dit:"joueuse", mots:["epreuve","hauteur-obstacle"],
        fr:"Je voudrais l'engager dans l'épreuve à 1,30 m.",
        en:"I'd like to enter him in the 1.30-metre class.",
        es:"Quisiera inscribirlo en la prueba de 1,30 m.",
        it:"Vorrei iscriverlo nella prova di 1,30 m.",
        de:"Ich möchte ihn in der 1,30-Meter-Prüfung nennen.",
        ja:"一メートル 三十 の 競技 に 申し込み たい です。",
        ar:"أود تسجيله في شوط بارتفاع 1,30 م." },

      { ref:"do-chrono-ou-bareme", temps:2, dit:"joueuse", mots:["epreuve"], motsAilleurs:["chrono","bareme"],
        fr:"Est-ce une épreuve au chronomètre ou au barème A ?",
        en:"Is it a speed class or a Table A class?",
        es:"¿Es una prueba al cronómetro o al baremo A?",
        it:"È una prova a tempo o a barema A?",
        de:"Ist das eine Zeitspringprüfung oder eine nach Fehlern und Zeit?",
        ja:"タイム 競技 です か、 それとも 減点 方式 A です か ?",
        ar:"هل هذا الشوط على الزمن؟ وما طريقة احتساب النقاط؟" },

      { ref:"do-combien-engagement", temps:2, dit:"joueuse", mots:["frais-engagement","epreuve"],
        fr:"Combien coûte l'engagement dans cette épreuve ?",
        en:"How much is the entry fee for this class?",
        es:"¿Cuánto cuesta la inscripción en esta prueba?",
        it:"Quanto costa l'iscrizione a questa prova?",
        de:"Wie hoch ist das Nenngeld für diese Prüfung?",
        ja:"この 競技 の 参加 料 は いくら です か ?",
        ar:"كم تبلغ رسوم التسجيل لهذا الشوط؟" },

      { ref:"do-deux-chevaux", temps:2, dit:"joueuse", mots:["engagement","epreuve"],
        fr:"Puis-je engager deux chevaux dans la même épreuve ?",
        en:"Can I enter two horses in the same class?",
        es:"¿Puedo inscribir dos caballos en la misma prueba?",
        it:"Posso iscrivere due cavalli nella stessa prova?",
        de:"Kann ich zwei Pferde in derselben Prüfung nennen?",
        ja:"同じ 競技 に 二 頭 申し込め ます か ?",
        ar:"هل يمكنني تسجيل حصانين في الشوط نفسه؟" },

      /* ---- temps 3 · vérifier que c'est bien passé ---- */
      { ref:"do-bien-enregistre", temps:3, dit:"joueuse", mots:["engagement-confirme","engagement"],
        fr:"Mon engagement a-t-il bien été enregistré ?",
        en:"Has my entry been confirmed?",
        es:"¿Se ha registrado bien mi inscripción?",
        it:"La mia iscrizione è stata registrata?",
        de:"Ist meine Nennung bestätigt?",
        ja:"私 の 申し込み は 登録 され て い ます か ?",
        ar:"هل تم تسجيل مشاركتي وتأكيدها؟" },

      { ref:"do-liste-engages", temps:3, dit:"joueuse", mots:["liste-engages"],
        fr:"Où puis-je consulter la liste des engagés ?",
        en:"Where can I check the list of entries?",
        es:"¿Dónde puedo consultar la lista de inscritos?",
        it:"Dove posso consultare l'elenco degli iscritti?",
        de:"Wo kann ich die Nennungsliste einsehen?",
        ja:"出場 申込 一覧 は どこ で 見 られ ます か ?",
        ar:"أين يمكنني الاطلاع على قائمة المسجلين؟" },

      { ref:"do-trois-epreuves", temps:3, dit:"joueuse", mots:["engagement","epreuve"],
        fr:"Mon cheval est engagé pour trois épreuves cette semaine.",
        en:"My horse is entered in three classes this week.",
        es:"Mi caballo está inscrito en tres pruebas esta semana.",
        it:"Il mio cavallo è iscritto a tre prove questa settimana.",
        de:"Mein Pferd ist diese Woche für drei Prüfungen genannt.",
        ja:"今週、 私 の 馬 は 三 つ の 競技 に 出 ます。",
        ar:"حصاني مسجل في ثلاثة أشواط هذا الأسبوع." },

      /* ---- temps 4 · la liste de départ ---- */
      { ref:"do-liste-depart-heure", temps:4, dit:"joueuse", mots:["liste-depart"],
        fr:"À quelle heure la liste de départ sera-t-elle publiée ?",
        en:"What time will the starting list be published?",
        es:"¿A qué hora se publicará la lista de salida?",
        it:"A che ora sarà pubblicata la lista di partenza?",
        de:"Wann wird die Startliste veröffentlicht?",
        ja:"出走 リスト は 何 時 に 発表 され ます か ?",
        ar:"متى ستنشر قائمة الانطلاق؟" },

      { ref:"do-numero-depart", temps:4, dit:"joueuse", mots:["liste-depart"], motsAilleurs:["ordre-depart"],
        fr:"Quel est mon numéro de départ ?",
        en:"What is my starting number?",
        es:"¿Cuál es mi número de salida?",
        it:"Qual è il mio numero di partenza?",
        de:"Welche Startnummer habe ich?",
        ja:"私 の 出走 番号 は 何 番 です か ?",
        ar:"ما ترتيبي في الانطلاق؟" },

      { ref:"do-ou-tetiere", temps:4, dit:"joueuse", mots:["numero-tetiere"],
        fr:"Où dois-je récupérer mon numéro de têtière ?",
        en:"Where do I collect my bridle number?",
        es:"¿Dónde recojo el número de cabezada?",
        it:"Dove ritiro il numero da testiera?",
        de:"Wo bekomme ich meine Kopfnummer?",
        ja:"頭絡 番号 は どこ で 受け取り ます か ?",
        ar:"من أين أستلم رقم تعريف حصاني؟" },

      /* ---- temps 5 · changer d'avis ---- */
      { ref:"do-changer-epreuve", temps:5, dit:"joueuse", mots:["changer-epreuve","epreuve"],
        fr:"Puis-je changer mon cheval d'épreuve ?",
        en:"Can I move my horse to a different class?",
        es:"¿Puedo cambiar de prueba a mi caballo?",
        it:"Posso spostare il mio cavallo in un'altra prova?",
        de:"Kann ich mein Pferd in eine andere Prüfung umnennen?",
        ja:"馬 を 別 の 競技 に 移せ ます か ?",
        ar:"هل يمكنني نقل حصاني إلى شوط آخر؟" },

      { ref:"do-130-vers-135", temps:5, dit:"joueuse", mots:["changer-epreuve"], motsAilleurs:["hauteur-obstacle"],
        fr:"Je voudrais passer de la 1,30 m à la 1,35 m.",
        en:"I'd like to move from the 1.30-metre class to the 1.35-metre class.",
        es:"Quisiera pasar de la prueba de 1,30 m a la de 1,35 m.",
        it:"Vorrei passare dalla prova di 1,30 m a quella di 1,35 m.",
        de:"Ich möchte von der 1,30 in die 1,35 wechseln.",
        ja:"一メートル 三十 から 一メートル 三十五 に 変え たい です。",
        ar:"أود نقل حصاني من شوط 1,30 م إلى شوط 1,35 م." },

      { ref:"do-encore-modifier", temps:5, dit:"joueuse", mots:["changer-epreuve","engagement"],
        fr:"Est-il encore possible de modifier mon engagement ?",
        en:"Is it still possible to change my entry?",
        es:"¿Todavía es posible modificar mi inscripción?",
        it:"È ancora possibile modificare la mia iscrizione?",
        de:"Kann ich meine Nennung noch ändern?",
        ja:"申し込み の 変更 は まだ でき ます か ?",
        ar:"هل ما زال بإمكاني تعديل تسجيلي؟" },

      { ref:"do-engagement-tardif", temps:5, dit:"joueuse", mots:["engagement-tardif","cloture-engagements"],
        fr:"Est-ce que vous acceptez encore les engagements tardifs ?",
        en:"Do you still take late entries?",
        es:"¿Aceptan todavía inscripciones tardías?",
        it:"Accettate ancora iscrizioni tardive?",
        de:"Nehmen Sie noch Nachnennungen an?",
        ja:"追加 申込 は まだ 受け付け て い ます か ?",
        ar:"هل ما زلتم تقبلون التسجيل المتأخر؟" },

      /* ---- temps 6 · renoncer ---- */
      { ref:"do-forfait", temps:6, dit:"joueuse", mots:["declarer-forfait","epreuve"],
        fr:"Je dois déclarer forfait pour cette épreuve.",
        en:"I need to withdraw from this class.",
        es:"Tengo que retirarme de esta prueba.",
        it:"Devo ritirarmi da questa prova.",
        de:"Ich muss mich von dieser Prüfung abmelden.",
        ja:"この 競技 は 棄権 し なけれ ば なり ませ ん。",
        ar:"يجب أن أعلن انسحاب حصاني من هذا الشوط." },

      { ref:"do-r-pas-rembourse", temps:6, dit:"club", mots:["declarer-forfait","frais-engagement"],
        fr:"Après la clôture, les frais d'engagement ne sont pas remboursés.",
        en:"After the closing date, entry fees are not refunded.",
        es:"Después del cierre, los derechos de inscripción no se devuelven.",
        it:"Dopo la chiusura, le quote d'iscrizione non si rimborsano.",
        de:"Nach Nennungsschluss wird das Nenngeld nicht erstattet.",
        ja:"締切 後 は、 参加 料 は 返金 され ませ ん。",
        ar:"بعد إغلاق باب التسجيل، تطبق شروط المسابقة المتعلقة برد الرسوم." }
    ]
  }
};
