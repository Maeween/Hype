/* hype-lingo-lex-arrivee.js — Hype Linguae · l'arrivée dans un club
   ==================================================================
   Créé le 6 août 2026 pour LA BAULE, étape 1 du voyage.

   ⚠️ POURQUOI CE FICHIER EXISTE. Blandine, en testant : commencer par
   l'écurie « n'est pas vendeur de rêve », et surtout ce n'est pas ce
   qu'un cavalier vit d'abord. Ce qu'il vit d'abord, c'est arriver
   quelque part sans connaître personne, s'inscrire, et comprendre ce
   qu'on lui dit près d'un cheval.

   ⚠️ LA SÉCURITÉ N'EXISTAIT NULLE PART dans les 378 mots du module.
   Pour une application qui enseigne à des débutants, c'était le trou le
   plus sérieux du lexique : on savait dire « la fourche » et « le
   coefficient », pas « ne passe pas derrière lui ». C'est réparé ici.

   ⚠️ AUCUN de ces mots n'a été relu par un natif. À reporter dans
   hype-linguae-doutes.md — allemand et japonais en priorité.

   ⚠️ Le japonais des PHRASES s'écrit AVEC des espaces entre les groupes.
   Ce n'est pas une coquille : l'exercice consiste à remettre des
   morceaux dans l'ordre, et sans espaces il n'y a rien à déplacer.

   ⚠️ RETAGUÉ une seconde fois le 6 août 2026, sur retour de Blandine
   après test réel : « la sécurité, faut que ça soit un autre chapitre,
   pas mélangée à l'inscription ». Le mélange à 6+6 de la veille est
   défait. Leçon 1 = les 12 mots `inscrire` (au complet, c'est le
   chapitre de La Baule). Leçon 2 = les 11 mots `securite` (au complet,
   EN RÉSERVE) — prête telle quelle pour la ville qui portera la
   sécurité, sans retaguer une troisième fois.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.arrivee = {
  ref: "arrivee",
  chapitre: 11,
  titre: { fr:"L'arrivée dans un club", en:"Arriving at a yard",
           es:"Llegar a un club", it:"Arrivare in un club",
           de:"Ankommen im Reitverein", ja:"クラブに着く" },
  /* 🟥 19/08 : 2 -> 3. Le fichier a TOUJOURS contenu trois leçons ; ce
     compteur en annonçait deux. Sans effet sur le moteur, qui filtre par
     `c.lecon`, mais faux à la lecture. ⚠️ NE PAS CONFONDRE avec le nombre
     de leçons OUVERTES à La Baule : `ETAPE_SRC.labaule` en ouvre DEUX,
     la leçon 3 (l'organisation du cours) reste dans le fichier sans être
     enseignée. */
  lecons: 3,

  concepts: [

  /* ============ LEÇON 1 · S'INSCRIRE ============ */

  { ref:"reserver", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"réserver"}, en:{m:"to book", p:"bouk"},
           es:{m:"reservar"}, it:{m:"prenotare"},
           de:{m:"buchen", p:"bou-rreune"}, ja:{m:"予約する", p:"yoyaku suru"} },
    def:{ fr:"Retenir une place à l'avance. Dans la plupart des clubs c'est indispensable la veille, et parfois plusieurs jours avant en saison.",
          en:"To hold a place in advance. In most yards this is essential the day before, and sometimes several days ahead in season.",
          es:"Apartar una plaza con antelación. En la mayoría de los clubes es imprescindible la víspera, y a veces varios días antes en temporada.",
          it:"Prenotare un posto in anticipo. Nella maggior parte dei club è indispensabile il giorno prima, e a volte diversi giorni prima in stagione.",
          de:"Einen Platz im Voraus sichern. In den meisten Ställen ist das am Vortag unerlässlich, in der Saison manchmal mehrere Tage vorher.",
          ja:"前もって枠を押さえること。たいていのクラブでは前日までの予約が必須で、シーズン中は数日前が当たり前です。" } },

  { ref:"cours-particulier", lecon:3, coll:"inscrire",
    mots:{ fr:{m:"le cours particulier"}, en:{m:"the private lesson", p:"praï-veut"},
           es:{m:"la clase particular"}, it:{m:"la lezione privata"},
           de:{m:"die Einzelstunde", p:"aïne-tsel-chtoune-de"},
           ja:{m:"個人レッスン", p:"kojin ressun"} },
    def:{ fr:"Une reprise seul avec l'enseignant, par opposition au cours collectif. Plus cher, mais le bon choix quand on ne parle pas la langue.",
          en:"A lesson alone with the instructor, as opposed to a group lesson. Dearer, but the right choice when you don't speak the language.",
          es:"Una clase a solas con el profesor, por oposición a la clase colectiva. Más cara, pero la buena elección cuando no se habla el idioma.",
          it:"Una lezione da soli con l'istruttore, in opposizione alla lezione collettiva. Più cara, ma la scelta giusta quando non si parla la lingua.",
          de:"Eine Stunde allein mit dem Reitlehrer, im Gegensatz zur Gruppenstunde. Teurer, aber die richtige Wahl, wenn man die Sprache nicht spricht.",
          ja:"先生とマンツーマンのレッスン。グループレッスンの反対です。割高ですが、言葉が話せないときは正しい選択です。" } },

  { ref:"cours-collectif", lecon:3, coll:"inscrire",
    mots:{ fr:{m:"le cours collectif"}, en:{m:"the group lesson", p:"groupe"},
           es:{m:"la clase colectiva"}, it:{m:"la lezione di gruppo"},
           de:{m:"die Gruppenstunde"}, ja:{m:"グループレッスン", p:"gurūpu ressun"} },
    def:{ fr:"Une reprise à plusieurs. C'est le cours ordinaire d'un club, et celui où l'on entend le plus de vocabulaire réel.",
          en:"A lesson with several riders. It is the ordinary club lesson, and the one where you hear the most real vocabulary.",
          es:"Una clase con varios jinetes. Es la clase ordinaria de un club, y aquella donde más vocabulario real se oye.",
          it:"Una lezione con più cavalieri. È la lezione ordinaria di un club, e quella dove si sente più vocabolario reale.",
          de:"Eine Stunde mit mehreren Reitern. Es ist die gewöhnliche Clubstunde — und die, in der man das meiste echte Vokabular hört.",
          ja:"数人で受けるレッスン。クラブのふつうのレッスンであり、生きた語彙がいちばん聞こえてくる場所でもあります。" } },

  { ref:"niveau", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"le niveau"}, en:{m:"the level", p:"lè-veul"},
           es:{m:"el nivel"}, it:{m:"il livello"},
           de:{m:"das Niveau", p:"ni-vô", var:"die Reitstufe"},
           ja:{m:"レベル", p:"reberu"} },
    def:{ fr:"Ce qu'on sait faire. ⚠️ Les échelles ne se traduisent pas : un Galop 4 français ne veut rien dire ailleurs. Dis ce que tu sais faire — trotter, galoper, sauter — pas ton diplôme.",
          en:"What you can do. Careful: gradings don't translate. Say what you can do — trot, canter, jump — not your certificate.",
          es:"Lo que sabes hacer. ⚠️ Las escalas no se traducen: un Galop 4 francés no significa nada fuera. Di lo que sabes hacer — trotar, galopar, saltar — no tu diploma.",
          it:"Ciò che sai fare. ⚠️ Le scale non si traducono: un Galop 4 francese non vuol dire niente altrove. Di' cosa sai fare — trottare, galoppare, saltare — non il tuo diploma.",
          de:"Was du kannst. ⚠️ Die Abzeichen lassen sich nicht übersetzen: Ein französischer Galop 4 sagt anderswo nichts. Sag, was du kannst — traben, galoppieren, springen — nicht dein Diplom.",
          ja:"自分に何ができるか。⚠️ 等級は翻訳できません。フランスのGalop 4は外国では通じない。資格ではなく、できることを言いましょう — 速歩、駈歩、障害。" } },

  { ref:"debutant", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"débutant"}, en:{m:"beginner", p:"bi-gui-neur"},
           es:{m:"principiante"}, it:{m:"principiante"},
           de:{m:"Anfänger", p:"ann-fène-gueur"}, ja:{m:"初心者", p:"shoshinsha"} },
    def:{ fr:"Le mot le plus utile du chapitre. Le dire coûte un peu d'orgueil et évite beaucoup d'ennuis : personne ne juge un débutant, tout le monde juge un débutant qui s'était annoncé cavalier.",
          en:"The most useful word here. Saying it costs a little pride and saves a lot of trouble: nobody judges a beginner, everybody judges a beginner who claimed to be a rider.",
          es:"La palabra más útil del capítulo. Decirla cuesta un poco de orgullo y evita muchos problemas: nadie juzga a un principiante, todos juzgan a un principiante que se anunció como jinete.",
          it:"La parola più utile del capitolo. Dirla costa un po' d'orgoglio ed evita molti guai: nessuno giudica un principiante, tutti giudicano un principiante che si era annunciato cavaliere.",
          de:"Das nützlichste Wort des Kapitels. Es zu sagen kostet etwas Stolz und erspart viel Ärger: Niemand verurteilt einen Anfänger — alle verurteilen einen Anfänger, der sich als Reiter angekündigt hatte.",
          ja:"この章でいちばん役に立つ言葉。口にするには少し勇気が要りますが、多くの面倒を防ぎます。初心者を悪く言う人はいません — 経験者だと名乗った初心者は別ですが。" } },

  { ref:"tarif", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"le tarif"}, en:{m:"the price", p:"praïss"},
           es:{m:"la tarifa"}, it:{m:"la tariffa"},
           de:{m:"der Preis", p:"praïce"}, ja:{m:"料金", p:"ryōkin"} },
    def:{ fr:"Le prix de la reprise. Demande s'il comprend l'assurance et le matériel : selon les pays, l'un ou l'autre se paie à part.",
          en:"The cost of the lesson. Ask whether insurance and equipment are included: depending on the country, one or the other is charged separately.",
          es:"El precio de la clase. Pregunta si incluye el seguro y el material: según el país, uno u otro se paga aparte.",
          it:"Il prezzo della lezione. Chiedi se comprende l'assicurazione e il materiale: a seconda dei paesi, l'uno o l'altro si paga a parte.",
          de:"Der Preis der Stunde. Frag, ob Versicherung und Ausrüstung enthalten sind: Je nach Land wird das eine oder das andere extra berechnet.",
          ja:"レッスンの料金。保険と装備が含まれるか尋ねましょう。国によって、どちらかが別料金です。" } },

  { ref:"licence-assurance", lecon:3, coll:"inscrire",
    mots:{ fr:{m:"l'assurance"}, en:{m:"the insurance", p:"inn-chou-reunce"},
           es:{m:"el seguro"}, it:{m:"l'assicurazione"},
           de:{m:"die Versicherung", p:"fèr-zi-che-roung"},
           ja:{m:"保険", p:"hoken"} },
    def:{ fr:"Obligatoire pour monter dans presque tous les pays. Ta licence fédérale ne te couvre pas forcément à l'étranger : vérifie avant de partir, pas au moment de monter.",
          en:"Required to ride in almost every country. Your national licence may not cover you abroad: check before you travel, not at the mounting block.",
          es:"Obligatoria para montar en casi todos los países. Tu licencia federal no te cubre necesariamente en el extranjero: compruébalo antes de salir, no al momento de montar.",
          it:"Obbligatoria per montare in quasi tutti i paesi. La tua licenza federale non ti copre necessariamente all'estero: verifica prima di partire, non al momento di montare.",
          de:"In fast allen Ländern Pflicht. Deine nationale Lizenz deckt dich im Ausland nicht unbedingt: vor der Reise prüfen, nicht am Aufsteigblock.",
          ja:"ほとんどの国で騎乗に必須。国内のライセンスが海外で有効とは限りません。確認は出発前に — 乗る直前ではなく。" } },

  { ref:"bombe-fournie", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"la bombe est fournie"}, en:{m:"a hat is provided", p:"pro-vaï-dide"},
           es:{m:"el casco está incluido"}, it:{m:"il cap è fornito"},
           de:{m:"eine Kappe wird gestellt", p:"guè-chtelt"},
           ja:{m:"ヘルメットの貸し出しあり", p:"herumetto no kashidashi ari"} },
    def:{ fr:"Presque toujours vrai, mais à demander : c'est la seule pièce d'équipement sans laquelle on ne monte pas. En Grande-Bretagne on dit « hat », pas « helmet », dans un club.",
          en:"Almost always true, but ask: it is the one piece of kit you cannot ride without. In Britain a yard says « hat », not « helmet ».",
          es:"Casi siempre es así, pero hay que preguntarlo: es la única pieza de equipo sin la cual no se monta. En Gran Bretaña, en un club se dice « hat », no « helmet ».",
          it:"Quasi sempre vero, ma da chiedere: è l'unico pezzo di equipaggiamento senza il quale non si monta. In Gran Bretagna, in un club si dice « hat », non « helmet ».",
          de:"Fast immer der Fall, aber nachfragen: Es ist das eine Ausrüstungsstück, ohne das man nicht reitet. In Großbritannien sagt der Stall « hat », nicht « helmet ».",
          ja:"たいてい貸してもらえますが、必ず確認を。これなしでは乗れない唯一の装備です。イギリスのクラブでは « helmet » ではなく « hat » と言います。" } },

  { ref:"cheval-calme", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"un cheval calme"}, en:{m:"a quiet horse", p:"kwaï-ette"},
           es:{m:"un caballo tranquilo"}, it:{m:"un cavallo tranquillo"},
           de:{m:"ein braves Pferd", p:"bra-vess"}, ja:{m:"おとなしい馬", p:"otonashii uma"} },
    def:{ fr:"La demande qui compte le plus, et qu'on ose rarement faire. Elle ne dit pas que tu as peur, elle dit que tu veux profiter de ta reprise.",
          en:"The request that matters most, and the one people rarely dare make. It doesn't say you are frightened; it says you want to enjoy your ride.",
          es:"La petición que más importa, y la que menos se atreve uno a hacer. No dice que tengas miedo: dice que quieres disfrutar de tu clase.",
          it:"La richiesta che conta di più, e quella che si osa fare più raramente. Non dice che hai paura: dice che vuoi goderti la tua lezione.",
          de:"Die Bitte, die am meisten zählt — und die man sich am seltensten traut. Sie sagt nicht, dass du Angst hast: Sie sagt, dass du deine Stunde genießen willst.",
          ja:"いちばん大事なのに、なかなか口に出せないお願い。怖がっているという意味ではありません。レッスンを楽しみたい、という意味です。" } },

  { ref:"balade", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"la balade"}, en:{m:"the hack", p:"hak", var:"the trail ride"},
           es:{m:"el paseo"}, it:{m:"la passeggiata"},
           de:{m:"der Ausritt", p:"aouss-rit"}, ja:{m:"外乗", p:"gaijō"} },
    def:{ fr:"Une sortie dehors, par opposition à la reprise en carrière — à la plage ou en montagne selon le centre. ⚠️ « Hack » est le mot britannique ; les Américains disent « trail ride ».",
          en:"A ride out, as opposed to a lesson in the arena — on the beach or in the hills, depending on the yard. « Hack » is the British word; Americans say « trail ride ».",
          es:"Una salida al exterior, por oposición a la clase en pista — a la playa o a la montaña según el centro. ⚠️ « Hack » es la palabra británica; los americanos dicen « trail ride ».",
          it:"Un'uscita all'aperto, in opposizione alla lezione in campo — in spiaggia o in montagna secondo il centro. ⚠️ « Hack » è la parola britannica; gli americani dicono « trail ride ».",
          de:"Ein Ausritt ins Gelände, im Gegensatz zur Stunde auf dem Platz — an den Strand oder in die Berge, je nach Stall. ⚠️ « Hack » ist das britische Wort; Amerikaner sagen « trail ride ».",
          ja:"馬場のレッスンに対する、外への騎乗。センターによって浜辺や山へ。⚠️ « hack » はイギリスの言い方で、アメリカでは « trail ride » と言います。" } },

  { ref:"le-groupe", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"réserver pour un groupe"}, en:{m:"to book for a group", p:"groupe"},
           es:{m:"reservar para un grupo"}, it:{m:"prenotare per un gruppo"},
           de:{m:"für eine Gruppe buchen", p:"grou-pe"}, ja:{m:"グループで予約する", p:"gurūpu de yoyaku suru"} },
    def:{ fr:"Utile dès qu'on n'est pas seul : précise combien de cavaliers, et combien sont débutants — le club adapte le nombre de chevaux calmes en conséquence.",
          en:"Useful as soon as you are not alone: say how many riders, and how many are beginners — the yard adjusts how many quiet horses it sends out.",
          es:"Útil en cuanto no vas solo: precisa cuántos jinetes, y cuántos son principiantes — el club adapta el número de caballos tranquilos en consecuencia.",
          it:"Utile appena non si è soli: precisa quanti cavalieri, e quanti sono principianti — il club adatta di conseguenza il numero di cavalli tranquilli.",
          de:"Nützlich, sobald man nicht allein ist: Sag, wie viele Reiter — und wie viele Anfänger. Der Stall passt die Zahl der ruhigen Pferde daran an.",
          ja:"ひとりでないなら必ず伝えること。何人で、そのうち初心者は何人か — クラブはそれに合わせて、おとなしい馬の頭数を用意します。" } },

  { ref:"pas", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"au pas"}, en:{m:"at a walk", p:"wôke"},
           es:{m:"al paso"}, it:{m:"al passo"},
           de:{m:"im Schritt", p:"chritt"}, ja:{m:"常歩で", p:"namiashi de"} },
    def:{ fr:"La plus lente des trois allures, celle où l'on part et où l'on rentre presque toujours. C'est aussi le mot qu'on utilise pour calmer : « au pas » se dit à un cheval qui s'excite.",
          en:"The slowest of the three gaits, and almost always how you set off and come back. It's also said to settle a horse down when he gets excited.",
          es:"El más lento de los tres aires, aquel con el que casi siempre se sale y se vuelve. Es también la palabra para calmar: « al paso » se le dice a un caballo que se acelera.",
          it:"La più lenta delle tre andature, quella con cui quasi sempre si parte e si rientra. È anche la parola per calmare: « al passo » si dice a un cavallo che si scalda.",
          de:"Die langsamste der drei Gangarten — fast immer die, in der man losreitet und heimkommt. Auch das Wort zum Beruhigen: « Schritt » sagt man einem Pferd, das heiß wird.",
          ja:"三つの歩法のうち最も遅いもの。出発も帰り道も、ほとんどいつもこれです。馬を落ち着かせる言葉でもあります — はやる馬には「常歩で」。" } },

  { ref:"trot", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"au trot"}, en:{m:"at a trot", p:"trote"},
           es:{m:"al trote"}, it:{m:"al trotto"},
           de:{m:"im Trab", p:"trape"}, ja:{m:"速歩で", p:"hayaashi de"} },
    def:{ fr:"L'allure à deux temps, celle qui secoue le plus un débutant — et celle qu'on demande le plus souvent en balade pour couvrir du terrain.",
          en:"The two-beat gait, the one that jostles a beginner the most — and the one asked for most often on a hack to cover ground.",
          es:"El aire de dos tiempos, el que más zarandea a un principiante — y el que más se pide en una salida para avanzar terreno.",
          it:"L'andatura a due tempi, quella che scuote di più un principiante — e quella che si chiede più spesso in passeggiata per coprire terreno.",
          de:"Die Gangart im Zweitakt, die einen Anfänger am meisten durchschüttelt — und die auf dem Ausritt am häufigsten verlangt wird, um Strecke zu machen.",
          ja:"二拍子の歩法。初心者がいちばん揺さぶられる歩法であり、外乗で距離を稼ぐためにいちばんよく求められる歩法でもあります。" } },

  /* ⚠️ AUCUN `var` SUR CE MOT — 12 août 2026, session 210.
     Il portait `var:"a gallop"`. Deux dégâts : l'app affichait
     « Aussi : a gallop », donc elle présentait le faux ami comme un
     synonyme acceptable de « canter » ; et comme lingo.html teste
     `if(mc.var) ... else if(c.def)` (ligne 8168), la présence du `var`
     MASQUAIT l'avertissement `def` écrit en six langues — sur le mot
     le plus dangereux du chapitre.
     `gallop` reste nommé dans le `def`, là où il est expliqué comme un
     piège et non proposé comme une variante.
     ⚠️ NE PAS RÉINTRODUIRE de `var` ici. */
  { ref:"galop", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"au galop"}, en:{m:"at a canter", p:"kann-teur"},
           es:{m:"al galope"}, it:{m:"al galoppo"},
           de:{m:"im Galopp", p:"ga-lop"}, ja:{m:"駆歩で", p:"kakeho de"} },
    def:{ fr:"⚠️ Faux ami en anglais : « canter » est le galop tranquille de tous les jours ; « gallop » est le galop de course, à pleine vitesse. Dis « canter » si tu veux juste avancer.",
          en:"A trap in French: « au galop » usually means the ordinary, unhurried canter — not a flat-out gallop. Ask to slow down if it feels too fast.",
          es:"⚠️ Falso amigo en inglés: « canter » es el galope tranquilo de todos los días; « gallop » es el galope de carrera, a toda velocidad. Di « canter » si solo quieres avanzar.",
          it:"⚠️ Falso amico in inglese: « canter » è il galoppo tranquillo di tutti i giorni; « gallop » è il galoppo da corsa, a tutta velocità. Di' « canter » se vuoi solo avanzare.",
          de:"⚠️ Falscher Freund im Englischen: « canter » ist der ruhige Alltagsgalopp; « gallop » ist der Renngalopp in vollem Tempo. Sag « canter », wenn du einfach nur vorwärts willst.",
          ja:"⚠️ 英語の落とし穴：ふだんの落ち着いた駈歩は « canter »、全速力の襲歩は « gallop »。ただ走りたいだけなら « canter » と言うこと。" } },

  { ref:"bottes", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"les bottes"}, en:{m:"the boots", p:"boutss"},
           es:{m:"las botas"}, it:{m:"gli stivali"},
           de:{m:"die Stiefel", p:"chti-feul"}, ja:{m:"ブーツ", p:"būtsu"} },
    def:{ fr:"Avec la bombe, la seule pièce d'équipement qu'on te demandera vraiment : talon net, tige haute, jamais de baskets. Certains centres prêtent des mini-chaps si tu n'en as pas.",
          en:"Along with the hat, the one piece of kit that is really checked: a proper heel, tall enough shaft, never trainers. Some yards lend half-chaps if you don't have boots.",
          es:"Con el casco, la única pieza de equipo que de verdad se comprueba: tacón marcado, caña alta, nunca zapatillas. Algunos centros prestan mini-chaps si no tienes botas.",
          it:"Con il cap, l'unico pezzo di equipaggiamento che viene davvero controllato: tacco netto, gambale alto, mai scarpe da ginnastica. Alcuni centri prestano mini-chaps se non hai stivali.",
          de:"Neben dem Helm das eine Ausrüstungsstück, das wirklich geprüft wird: klarer Absatz, hoher Schaft, nie Turnschuhe. Manche Ställe verleihen Chaps, wenn du keine Stiefel hast.",
          ja:"ヘルメットと並んで、本当にチェックされる唯一の装備。かかとのある靴、高さのある筒、スニーカーは厳禁。ブーツがなければミニチャップスを貸してくれるセンターもあります。" } },

  { ref:"duree-reprise", lecon:3, coll:"inscrire",
    mots:{ fr:{m:"une heure de cours"}, en:{m:"an hour's lesson"},
           es:{m:"una hora de clase"}, it:{m:"un'ora di lezione"},
           de:{m:"eine Reitstunde", p:"raït-chtoune-de"},
           ja:{m:"一時間のレッスン", p:"ichijikan no ressun"} },
    def:{ fr:"⚠️ Attention au faux ami : en allemand, une « Reitstunde » désigne la leçon en général, souvent quarante-cinq minutes — pas soixante.",
          en:"Careful with the German: a « Reitstunde » means the lesson in general, often forty-five minutes rather than sixty.",
          es:"⚠️ Ojo al falso amigo: en alemán, una « Reitstunde » designa la lección en general, a menudo cuarenta y cinco minutos — no sesenta.",
          it:"⚠️ Attenzione al falso amico: in tedesco una « Reitstunde » indica la lezione in generale, spesso quarantacinque minuti — non sessanta.",
          de:"⚠️ Vorsicht: Die « Reitstunde » meint die Unterrichtseinheit — oft fünfundvierzig Minuten, nicht sechzig.",
          ja:"⚠️ 紛らわしい言葉に注意：ドイツ語の « Reitstunde » はレッスン一回のこと。多くは四十五分で、六十分ではありません。" } },

  { ref:"annuler", lecon:3, coll:"inscrire",
    mots:{ fr:{m:"annuler"}, en:{m:"to cancel", p:"kann-seul"},
           es:{m:"cancelar"}, it:{m:"annullare"},
           de:{m:"absagen", p:"ap-za-gueune"}, ja:{m:"キャンセルする", p:"kyanseru suru"} },
    def:{ fr:"À savoir dire, et tôt : une reprise réservée est presque partout due, même si l'on ne vient pas.",
          en:"Worth knowing, and early: a booked lesson is charged almost everywhere, whether you turn up or not.",
          es:"Hay que saber decirlo, y pronto: una clase reservada se paga casi en todas partes, aunque no vayas.",
          it:"Da saper dire, e presto: una lezione prenotata è quasi ovunque dovuta, anche se non ci si presenta.",
          de:"Muss man sagen können — und früh: Eine gebuchte Stunde wird fast überall berechnet, ob man kommt oder nicht.",
          ja:"早めに言えるようにしておくこと。予約したレッスンは、行かなくても、ほぼどこでも料金が発生します。" } },

  /* ============ LEÇON 2 · LA SÉCURITÉ ============ */

  { ref:"passer-devant", lecon:2, coll:"securite",
    mots:{ fr:{m:"passer devant lui"}, en:{m:"to pass in front of him"},
           es:{m:"pasar por delante"}, it:{m:"passare davanti"},
           de:{m:"vor ihm vorbeigehen", p:"for-baï-gué-eune"},
           ja:{m:"前を通る", p:"mae o tōru"} },
    def:{ fr:"La règle la plus simple et la plus utile : on contourne un cheval par l'avant, où il te voit. Derrière, il ne te voit pas, et un cheval qui sursaute frappe.",
          en:"The simplest and most useful rule: go round a horse in front, where he can see you. Behind, he cannot — and a startled horse kicks.",
          es:"La regla más simple y más útil: se rodea a un caballo por delante, donde te ve. Por detrás no te ve, y un caballo sobresaltado cocea.",
          it:"La regola più semplice e più utile: si gira attorno a un cavallo davanti, dove ti vede. Dietro non ti vede, e un cavallo spaventato calcia.",
          de:"Die einfachste und nützlichste Regel: Man geht vorn um ein Pferd herum, wo es dich sieht. Hinten sieht es dich nicht — und ein erschrecktes Pferd schlägt.",
          ja:"いちばん単純で、いちばん役に立つルール。馬を回るときは前から、馬に見える側から。後ろからは見えません — そして驚いた馬は蹴ります。" } },

  { ref:"jamais-derriere", lecon:2, coll:"securite",
    mots:{ fr:{m:"ne passe pas derrière lui"}, en:{m:"don't walk behind him", p:"bi-haïnde"},
           es:{m:"no pases por detrás"}, it:{m:"non passare dietro"},
           de:{m:"geh nicht hinter ihm vorbei", p:"hine-teur"},
           ja:{m:"後ろを通らないで", p:"ushiro o tōranaide"} },
    def:{ fr:"La phrase qu'on entend crier dans tous les clubs du monde. Si tu dois vraiment passer derrière, passe très près en gardant une main sur lui : un cheval frappe avec de l'élan, pas collé.",
          en:"The sentence shouted in every yard in the world. If you truly must pass behind, pass very close with a hand on him: a horse kicks with room, not from touching distance.",
          es:"La frase que se oye gritar en todos los clubes del mundo. Si de verdad debes pasar por detrás, pasa muy cerca con una mano sobre él: un caballo cocea con impulso, no pegado.",
          it:"La frase che si sente gridare in tutti i club del mondo. Se davvero devi passare dietro, passa vicinissimo con una mano su di lui: un cavallo calcia con slancio, non a contatto.",
          de:"Der Satz, den man in jedem Stall der Welt rufen hört. Musst du wirklich hinten vorbei, geh ganz dicht mit einer Hand am Pferd: Es schlägt mit Anlauf, nicht auf Tuchfühlung.",
          ja:"世界じゅうのクラブで叫ばれているフレーズ。どうしても後ろを通るなら、手を馬に添えて、ぴったり近くを。馬の蹴りは助走があってこそ — 密着していれば威力が出ません。" } },

  { ref:"prevenir-toucher", lecon:2, coll:"securite",
    mots:{ fr:{m:"préviens-le avant de le toucher"},
           en:{m:"speak to him before you touch him"},
           es:{m:"háblale antes de tocarlo"}, it:{m:"parlagli prima di toccarlo"},
           de:{m:"sprich ihn an, bevor du ihn berührst"},
           ja:{m:"触る前に声をかけて", p:"sawaru mae ni koe o kakete"} },
    def:{ fr:"La voix d'abord, la main ensuite. Un cheval surpris se défend ; un cheval averti attend.",
          en:"Voice first, hand second. A startled horse defends himself; a warned horse waits.",
          es:"La voz primero, la mano después. Un caballo sorprendido se defiende; un caballo avisado espera.",
          it:"Prima la voce, poi la mano. Un cavallo sorpreso si difende; un cavallo avvertito aspetta.",
          de:"Erst die Stimme, dann die Hand. Ein überraschtes Pferd wehrt sich; ein gewarntes Pferd wartet.",
          ja:"まず声、それから手。驚いた馬は身を守ろうとし、知らされた馬は待ってくれます。" } },

  { ref:"longe-main", lecon:2, coll:"securite",
    mots:{ fr:{m:"n'enroule pas la longe"}, en:{m:"never wrap the rope round your hand"},
           es:{m:"no te enrolles la cuerda en la mano"},
           it:{m:"non avvolgere la corda alla mano"},
           de:{m:"wickle den Strick nicht um die Hand", p:"vi-kle"},
           ja:{m:"引き手を手に巻かないで", p:"hikite o te ni makanaide"} },
    def:{ fr:"Le geste qui casse des doigts. On tient la longe pliée dans la main, jamais enroulée autour : si le cheval part, la corde doit pouvoir filer.",
          en:"The habit that breaks fingers. Hold the rope folded in your hand, never coiled round it: if the horse goes, the rope must be able to run.",
          es:"El gesto que rompe dedos. La cuerda se sujeta plegada en la mano, jamás enrollada alrededor: si el caballo se va, la cuerda debe poder correr.",
          it:"Il gesto che rompe le dita. La longhina si tiene piegata nella mano, mai avvolta attorno: se il cavallo parte, la corda deve poter scorrere.",
          de:"Der Griff, der Finger bricht. Den Strick gefaltet in der Hand halten, nie darum gewickelt: Geht das Pferd durch, muss das Seil laufen können.",
          ja:"指を折るのは、この持ち方。引き綱は手の中で畳んで持ち、決して手に巻きつけないこと。馬が走り出したら、綱は手から流れ出せなければなりません。" } },

  { ref:"distance", lecon:2, coll:"securite",
    mots:{ fr:{m:"garde tes distances"}, en:{m:"keep your distance", p:"diss-teunce"},
           es:{m:"guarda las distancias"}, it:{m:"mantieni le distanze"},
           de:{m:"halte Abstand", p:"ap-chtant"}, ja:{m:"距離をとって", p:"kyori o totte"} },
    def:{ fr:"En reprise, une longueur de cheval entre le tien et celui de devant. C'est la distance qui évite un coup de pied — et le plus fréquent des accidents de club.",
          en:"In a lesson, one horse's length between you and the one ahead. That distance prevents a kick, the commonest accident in any yard.",
          es:"En clase, una longitud de caballo entre el tuyo y el de delante. Es la distancia que evita una coz — y el accidente más frecuente de un club.",
          it:"In lezione, una lunghezza di cavallo tra il tuo e quello davanti. È la distanza che evita un calcio — e il più frequente degli incidenti di club.",
          de:"In der Stunde eine Pferdelänge zwischen deinem und dem vorderen. Diese Distanz verhindert einen Tritt — den häufigsten Unfall im Club.",
          ja:"レッスン中は、前の馬と一頭分の距離を。この距離が蹴られる事故 — クラブで最も多い事故 — を防ぎます。" } },

  { ref:"attention", lecon:2, coll:"securite",
    mots:{ fr:{m:"attention !"}, en:{m:"mind out!", p:"maïnde", var:"heads up!"},
           es:{m:"¡cuidado!"}, it:{m:"attenzione!"},
           de:{m:"Achtung!", p:"arr-toung"}, ja:{m:"危ない！", p:"abunai" } },
    def:{ fr:"⚠️ Le mot qu'il faut reconnaître avant de savoir le dire. En club britannique on crie souvent « mind out » ou « heads up », rarement « attention ».",
          en:"The word to recognise before you can say it. British yards shout « mind out » or « heads up », rarely « attention ».",
          es:"⚠️ La palabra que hay que reconocer antes de saber decirla. En un club británico se grita « mind out » o « heads up », rara vez « attention ».",
          it:"⚠️ La parola da riconoscere prima di saperla dire. In un club britannico si grida « mind out » o « heads up », raramente « attention ».",
          de:"⚠️ Das Wort, das man erkennen muss, bevor man es sagen kann. Im britischen Stall ruft man « mind out » oder « heads up », selten « attention ».",
          ja:"⚠️ 言えるようになる前に、聞き取れるべき言葉。イギリスのクラブで飛ぶのは « mind out » や « heads up » — « attention » はめったに聞きません。" } },

  { ref:"tenir-cheval", lecon:2, coll:"securite",
    mots:{ fr:{m:"tiens-le"}, en:{m:"hold him", p:"hôlde"},
           es:{m:"sujétalo"}, it:{m:"tienilo"},
           de:{m:"halt ihn fest"}, ja:{m:"押さえていて", p:"osaete ite"} },
    def:{ fr:"On te le demandera, et il faut comprendre du premier coup : tenir la longe court, sous la ganache, et rester debout à côté de l'épaule.",
          en:"You will be asked this, and you must understand at once: hold the rope short, under the jaw, and stand by the shoulder.",
          es:"Te lo pedirán, y hay que entenderlo a la primera: sujetar la cuerda corta, bajo la barbada, y quedarse de pie junto a la espalda.",
          it:"Te lo chiederanno, e va capito al volo: tenere la longhina corta, sotto la ganascia, e restare in piedi accanto alla spalla.",
          de:"Man wird dich darum bitten, und du musst es sofort verstehen: den Strick kurz unter dem Kinn halten und neben der Schulter stehen bleiben.",
          ja:"必ず頼まれる役目なので、一度で理解できるように。綱は顎の下で短く持ち、馬の肩の横に立つこと。" } },

  { ref:"lacher", lecon:2, coll:"securite",
    mots:{ fr:{m:"lâche !"}, en:{m:"let go!", p:"lette gô"},
           es:{m:"¡suelta!"}, it:{m:"lascia!"},
           de:{m:"lass los!", p:"lass lôce"}, ja:{m:"離して！", p:"hanashite" } },
    def:{ fr:"L'ordre le plus contre-intuitif du chapitre, et celui qui sauve des mains. Si le cheval s'arrache, on lâche : on ne discute pas avec cinq cents kilos.",
          en:"The least intuitive order here, and the one that saves hands. If the horse tears away, let go: you do not argue with five hundred kilos.",
          es:"La orden más contraintuitiva del capítulo, y la que salva manos. Si el caballo se arranca, se suelta: no se discute con quinientos kilos.",
          it:"L'ordine più controintuitivo del capitolo, e quello che salva le mani. Se il cavallo si strappa, si lascia: non si discute con cinquecento chili.",
          de:"Der widersinnigste Befehl des Kapitels — und der, der Hände rettet. Reißt sich das Pferd los, lässt man los: Mit fünfhundert Kilo diskutiert man nicht.",
          ja:"この章でいちばん直感に反する指示にして、手を守る指示。馬が引きちぎるように逃げたら、放すこと。五百キロと力比べはしません。" } },

  { ref:"casque-attache", lecon:2, coll:"securite",
    mots:{ fr:{m:"attache ta bombe"}, en:{m:"do your hat up", p:"hate"},
           es:{m:"abróchate el casco"}, it:{m:"allaccia il cap"},
           de:{m:"mach die Kappe zu"}, ja:{m:"ヘルメットを留めて", p:"herumetto o tomete"} },
    def:{ fr:"Une bombe non attachée ne protège de rien. On te le fera remarquer dans tous les pays, et souvent avant de te laisser monter.",
          en:"An unfastened hat protects nothing. You will be told, in every country, and usually before you are allowed to mount.",
          es:"Un casco sin abrochar no protege de nada. Te lo harán notar en todos los países, y a menudo antes de dejarte montar.",
          it:"Un cap non allacciato non protegge da niente. Te lo faranno notare in tutti i paesi, e spesso prima di lasciarti montare.",
          de:"Ein offener Helm schützt vor nichts. Das sagt man dir in jedem Land — meist bevor man dich aufsteigen lässt.",
          ja:"あご紐を留めていないヘルメットは何も守ってくれません。どの国でも指摘されます。たいていは、乗せてもらう前に。" } },

  { ref:"chaussures-fermees", lecon:2, coll:"securite",
    mots:{ fr:{m:"des chaussures fermées"}, en:{m:"closed shoes", p:"clôzde"},
           es:{m:"zapatos cerrados"}, it:{m:"scarpe chiuse"},
           de:{m:"geschlossene Schuhe", p:"gué-chlo-sseune"},
           ja:{m:"つま先の閉じた靴", p:"tsumasaki no tojita kutsu" } },
    def:{ fr:"Pas de sandales dans une écurie, jamais. Un sabot de cheval pèse le poids du cheval au-dessus.",
          en:"No sandals in a yard, ever. A hoof carries the weight of the horse above it.",
          es:"Nada de sandalias en una cuadra, jamás. Un casco de caballo lleva encima el peso del caballo.",
          it:"Niente sandali in scuderia, mai. Uno zoccolo porta sopra di sé il peso del cavallo.",
          de:"Keine Sandalen im Stall, niemals. Auf einem Huf lastet das ganze Pferd.",
          ja:"厩舎でサンダルは絶対に禁止。蹄の上には、馬の全体重が乗っています。" } },

  { ref:"chute-bouge-pas", lecon:2, coll:"securite",
    mots:{ fr:{m:"ne bouge pas"}, en:{m:"don't move", p:"mouve"},
           es:{m:"no te muevas"}, it:{m:"non ti muovere"},
           de:{m:"beweg dich nicht", p:"be-vèque"}, ja:{m:"動かないで", p:"ugokanaide"} },
    def:{ fr:"Ce qu'on dit à un cavalier tombé, et ce qu'on doit comprendre si on tombe. On ne relève pas quelqu'un : on lui demande s'il va bien, et on attrape le cheval.",
          en:"What you say to a fallen rider, and what you must understand if you fall. You do not pick someone up: you ask if they are all right, and you catch the horse.",
          es:"Lo que se dice a un jinete caído, y lo que hay que entender si te caes tú. No se levanta a nadie: se le pregunta si está bien, y se atrapa al caballo.",
          it:"Ciò che si dice a un cavaliere caduto, e ciò che va capito se cadi tu. Non si rialza nessuno: gli si chiede se sta bene, e si prende il cavallo.",
          de:"Was man einem gestürzten Reiter sagt — und verstehen muss, wenn man selbst fällt. Man richtet niemanden auf: Man fragt, ob alles gut ist, und fängt das Pferd ein.",
          ja:"落ちた騎手にかける言葉であり、自分が落ちたときに理解すべき言葉。人を引き起こしてはいけません。大丈夫かを尋ね、そして馬を捕まえるのです。" } },

  /* ==================================================================
     TROIS MOTS AJOUTÉS LE 13/08/2026, session 210, à la demande de
     Blandine.

     ⚠️ `cavalier-confirme` EST UN COPIER-COLLER, PAS UNE CRÉATION.
     Le mot vit déjà dans `hype-lingo-lex-balade.js`, leçon 1, avec ses
     six traductions ET son audio. Il arrive ici parce que Blandine avait
     demandé la phrase « Et pour les cavaliers confirmés ? » à La Baule,
     et qu'un dialogue n'emploie que les mots de son chapitre.
     🟥 LA LEÇON, à ne pas reperdre : quand une phrase de Blandine bute
     sur la règle, on traite LE LEXIQUE, pas la phrase. Claude avait
     proposé deux fois de retirer sa phrase — c'était l'inverse du bon
     geste, elle l'a corrigé.
     Le précédent est le sien : `balade` porte déjà la même `ref` dans
     les deux fichiers (session 209, « s'il dort, tant mieux »).
     Conséquence assumée, la même : le mot arrivera DÉJÀ ACQUIS au Morne.
     ⚠️ Les `mots` sont identiques au fichier balade — NE PAS LES FAIRE
     DIVERGER. Seul le `def` change, celui du Morne parlant du lagon,
     ce qui n'a aucun sens ici.

     `cheval-rapide` et `cheval-sympa` sont de VRAIS mots neufs. Avec
     `cheval-calme` qui existait déjà, ils forment une famille de trois :
     calme, sympa, rapide — les trois choses qu'une cavalière a besoin de
     demander sur un cheval qu'elle ne connaît pas.
     ⚠️ AUDIO À ENREGISTRER pour ces deux-là, six langues chacun.
     ⚠️ ES / IT / DE / JA À FAIRE RELIRE par un cavalier de la langue.
     C'est le vocabulaire des manuels, pas une traduction au son, mais
     personne ne l'a entendu dire.
  ================================================================== */

  { ref:"cavalier-confirme", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"le cavalier confirmé"},
           en:{m:"the experienced rider", p:"iks-pi-rieunst"},
           es:{m:"el jinete experimentado"}, it:{m:"il cavaliere esperto"},
           de:{m:"der erfahrene Reiter", p:"èr-fa-re-ne"},
           ja:{m:"経験者", p:"keikensha"} },
    def:{
      fr:"Celui qui monte déjà, par opposition au débutant. ⚠️ Faux ami : « confirmed rider » ne veut rien dire en anglais. Un club range ses cours selon cette ligne, alors autant savoir de quel côté on se met. Le mot revient au Morne, où c'est lui qui ouvre le lagon.",
      en:"Someone who already rides, as opposed to a beginner. A school sorts its lessons along this line, so it helps to know which side you are on. The word comes back at Le Morne, where it opens the lagoon.",
      es:"El que ya monta, frente al principiante. ⚠️ Falso amigo: « confirmed rider » no significa nada en inglés. Un club ordena sus clases según esta línea, así que conviene saber de qué lado te pones. La palabra vuelve en Le Morne, donde es ella la que abre la laguna.",
      it:"Chi già monta, a differenza del principiante. ⚠️ Falso amico: « confirmed rider » in inglese non vuol dire niente. Un club ordina i suoi corsi secondo questa linea, quindi conviene sapere da che parte ti metti. La parola ritorna a Le Morne, dove è lei ad aprire la laguna.",
      de:"Wer schon reitet, im Gegensatz zum Anfänger. ⚠️ Falscher Freund: « confirmed rider » bedeutet im Englischen nichts. Ein Betrieb ordnet seine Stunden nach dieser Linie — es hilft zu wissen, auf welche Seite man sich stellt. Das Wort kommt in Le Morne wieder, dort öffnet es die Lagune.",
      ja:"すでに乗れる人。初心者の反対です。⚠️ 英語で « confirmed rider » とは言いません。クラブはこの線でレッスンを分けるので、自分がどちら側かを言えると役に立ちます。この言葉はル・モルヌでまた出てきて、そこではラグーンを開く鍵になります。" } },

  { ref:"cheval-rapide", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"un cheval rapide"},
           en:{m:"a fast horse", p:"faste", var:"a forward horse"},
           es:{m:"un caballo rápido", var:"un caballo con impulsión"},
           it:{m:"un cavallo veloce", var:"un cavallo con impulso"},
           de:{m:"ein schnelles Pferd", p:"chnè-less", var:"ein Pferd mit Schwung"},
           ja:{m:"速い馬", p:"hayai uma", var:"前進気勢のある馬"} },
    def:{
      fr:"L'inverse du cheval calme, pour qui sait déjà monter. ⚠️ « Fast » se comprend partout, mais dans une écurie on dit plutôt « forward » : un cheval qui va de lui-même, sans qu'on ait à le pousser. Ce n'est pas un cheval qui s'emballe, c'est un cheval qui a de l'impulsion — Schwung en allemand, un des points de l'échelle de progression. Demander « a forward horse » dit qu'on sait monter ; « a fast horse » peut faire craindre qu'on veuille courir.",
      en:"The opposite of a quiet horse, for someone who already rides. In a yard you would say « forward » rather than « fast »: a horse that goes of its own accord, without being pushed. Not a horse that runs away with you — a horse with impulsion.",
      es:"Lo contrario del caballo tranquilo, para quien ya monta. ⚠️ « Fast » se entiende en todas partes, pero en una cuadra se dice más bien « forward »: un caballo que va solo, sin que haya que empujarlo. No es un caballo que se desboca, es un caballo con impulsión.",
      it:"Il contrario del cavallo tranquillo, per chi già monta. ⚠️ « Fast » si capisce dappertutto, ma in scuderia si dice piuttosto « forward »: un cavallo che va da sé, senza doverlo spingere. Non è un cavallo che scappa, è un cavallo con impulso.",
      de:"Das Gegenteil des ruhigen Pferdes, für wen schon reiten kann. ⚠️ « Fast » versteht man überall, im Stall sagt man aber eher « forward »: ein Pferd, das von selbst geht, ohne dass man treiben muss. Kein durchgehendes Pferd — ein Pferd mit Schwung.",
      ja:"おとなしい馬の反対で、すでに乗れる人向けです。⚠️ « fast » はどこでも通じますが、馬房では « forward » と言うことが多い — 押さなくても自分から前に出る馬のことです。暴走する馬ではなく、前進気勢のある馬です。" } },

  { ref:"cheval-sympa", lecon:1, coll:"inscrire",
    mots:{ fr:{m:"un cheval sympa"},
           en:{m:"a nice horse", p:"naïsse", var:"a kind horse"},
           es:{m:"un caballo bueno", var:"un caballo noble"},
           it:{m:"un cavallo buono", var:"un cavallo generoso"},
           de:{m:"ein nettes Pferd", p:"nè-tess", var:"ein braves Pferd"},
           ja:{m:"優しい馬", p:"yasashii uma", var:"素直な馬"} },
    def:{
      fr:"Celui qu'on demande quand on n'est pas très rassurée. ⚠️ « A nice horse » se dit, mais c'est le mot le plus ambigu de l'anglais équestre : il peut vouloir dire « gentil »… ou « beau, de belle origine ». Deux mots plus sûrs : « a kind horse » pour le caractère, et surtout « a genuine horse » — un cheval honnête, qui ne fait jamais de surprise. « He's genuine » est le plus grand compliment qu'on puisse faire à un cheval de club.",
      en:"The horse you ask for when you are not feeling confident. « A nice horse » works, but it is the most ambiguous phrase in horse English — it can mean kind, or well-bred. « A kind horse » is safer, and « a genuine horse » safest of all: one that never surprises you.",
      es:"El que se pide cuando no vas del todo tranquila. ⚠️ « A nice horse » se dice, pero es la expresión más ambigua del inglés ecuestre: puede querer decir « bueno de carácter »… o « de buena sangre ». Más seguro: « a kind horse », y sobre todo « a genuine horse » — un caballo honrado, que nunca te sorprende.",
      it:"Quello che si chiede quando non ci si sente del tutto sicure. ⚠️ « A nice horse » si dice, ma è l'espressione più ambigua dell'inglese equestre: può voler dire « buono di carattere »… o « di bella razza ». Più sicuro: « a kind horse », e soprattutto « a genuine horse » — un cavallo onesto, che non ti sorprende mai.",
      de:"Das Pferd, nach dem man fragt, wenn man sich nicht ganz sicher fühlt. ⚠️ « A nice horse » sagt man, aber es ist der vieldeutigste Ausdruck im Reit-Englischen: er kann « brav » heißen … oder « gut gezogen ». Sicherer: « a kind horse », und am sichersten « a genuine horse » — ein ehrliches Pferd, das nie überrascht.",
      ja:"あまり自信がないときに頼む馬です。⚠️ « a nice horse » とも言いますが、馬の英語でいちばん曖昧な言い方です — 性格がいい、とも、血統がいい、とも取れます。« a kind horse » のほうが確実で、いちばん確実なのは « a genuine horse » — 絶対に驚かせない、正直な馬という意味です。" } }

  ],

  phrases: [

  { ref:"ph-reserver-demain", lecon:1, mots:["reserver"],
      fr:"Je voudrais réserver un cours.",
      en:"I would like to book a lesson.",
      es:"Quisiera reservar una clase.",
      it:"Vorrei prenotare una lezione.",
      de:"Ich möchte eine Reitstunde buchen.",
      ja:"レッスン を 予約 し たい です。" },

  { ref:"ph-je-debute", lecon:1, mots:["cheval-calme", "debutant"],
      fr:"Vous avez un cheval très calme ?",
      en:"Do you have a very quiet horse ?",
      es:"¿ Tiene un caballo muy tranquilo ?",
      it:"Avete un cavallo molto tranquillo ?",
      de:"Haben Sie ein ganz braves Pferd ?",
      ja:"とても おとなしい 馬 は い ます か ?" },

  { ref:"ph-bombe-tarif", lecon:1, mots:["bombe-fournie"],
      fr:"La bombe est fournie ?",
      en:"Is a hat provided ?",
      es:"¿ Incluyen el casco ?",
      it:"Il cap è fornito ?",
      de:"Ist ein Helm dabei ?",
      ja:"ヘルメット は 借り られ ます か ?" },

  { ref:"ph-groupe-debutants", lecon:1, mots:["le-groupe", "debutant"],
      fr:"Nous sommes quatre, deux débutants.",
      en:"There are four of us, two beginners.",
      es:"Somos cuatro, dos principiantes.",
      it:"Siamo in quattro, due principianti.",
      de:"Wir sind vier, zwei Anfänger.",
      ja:"四人 です。 二人 は 初心者 です。" },

  { ref:"ph-derriere", lecon:2, mots:["jamais-derriere", "passer-devant"],
      fr:"Ne passe pas derrière lui, passe devant.",
      en:"Don't walk behind him, go round the front.",
      es:"No pases por detrás, pasa por delante.",
      it:"Non passare dietro, passa davanti.",
      de:"Geh nicht hinter ihm vorbei, geh vorne herum.",
      ja:"後ろ を 通ら ないで、 前 を 通っ て。" },

  { ref:"ph-longe", lecon:2, mots:["longe-main"],
      fr:"La longe, jamais autour de la main.",
      en:"Never wrap it round your hand.",
      es:"Nunca alrededor de la mano.",
      it:"Mai attorno alla mano.",
      de:"Nie um die Hand wickeln.",
      ja:"引き綱 は 手 に 巻か ない で。" },

  { ref:"ph-ca-va", lecon:2, mots:["chute-bouge-pas"],
      fr:"Ne bouge pas, j'attrape le cheval.",
      en:"Don't move — I'll catch the horse.",
      es:"No te muevas, cojo el caballo.",
      it:"Non muoverti, prendo il cavallo.",
      de:"Bleib liegen — ich fange das Pferd.",
      ja:"動か ない で。 馬 は 捕まえ ます。" },

  /* 🟥🟥 19/08/2026 — DIX-NEUF PHRASES AJOUTÉES SUR BRIEF DE BLANDINE.
     Le brief en proposait 26 ; SEPT ont été écartées parce qu'elles font
     doublon avec les sept phrases déjà en place ci-dessus (réserver un
     cours, la bombe fournie, le cheval calme, passer devant / derrière,
     la longe autour de la main, ne pas bouger). Fusion, pas remplacement :
     les sept anciennes sont intactes, avec leurs `ref` d'origine.
     Total : 7 + 19 = 26 phrases, et LES 26 CONCEPTS ENSEIGNÉS À LA BAULE
     sont désormais couverts au moins une fois.
     🟢 19/08, dans la foulée : LES SEPT ANCIENNES ONT REÇU LEURS `mots`.
     Elles avaient `mots:[]` et ne pointaient vers aucun concept — sept
     notions n'étaient donc couvertes que par le texte, jamais déclarées.
     Seuls les `mots` ont été ajoutés : aucun texte, aucune `ref`, aucune
     traduction n'a bougé. Les 26 concepts de La Baule sont maintenant
     tous rattachés à au moins une phrase.
     ⚠️ TRADUCTIONS ES/IT/DE/JA ÉCRITES PAR CLAUDE, JAMAIS RELUES PAR UN
     NATIF. Les FR et EN sont ceux du brief de Blandine, mot pour mot.
     Le japonais suit la segmentation par espaces déjà en usage ici. */

  { ref:"ph-lb-quel-niveau", lecon:1, mots:["niveau"],
      fr:"Quel niveau faut-il avoir ?",
      en:"What level do I need?",
      es:"¿Qué nivel hay que tener?",
      it:"Che livello bisogna avere?",
      de:"Welches Niveau braucht man?",
      ja:"どの レベル が 必要 です か。" },
  { ref:"ph-lb-je-suis-debutant", lecon:1, mots:["debutant"],
      fr:"Je suis débutant.",
      en:"I'm a beginner.",
      es:"Soy principiante.",
      it:"Sono principiante.",
      de:"Ich bin Anfänger.",
      ja:"私 は 初心者 です。" },
  { ref:"ph-lb-tarif-balade", lecon:1, mots:["tarif", "balade"],
      fr:"Quel est le tarif de la balade ?",
      en:"How much is the ride?",
      es:"¿Cuánto cuesta el paseo?",
      it:"Quanto costa la passeggiata?",
      de:"Was kostet der Ausritt?",
      ja:"外乗 の 料金 は いくら です か。" },
  { ref:"ph-lb-balade-groupe", lecon:1, mots:["balade", "le-groupe"],
      fr:"La balade se fait-elle en groupe ?",
      en:"Is the ride in a group?",
      es:"¿El paseo se hace en grupo?",
      it:"La passeggiata si fa in gruppo?",
      de:"Findet der Ausritt in der Gruppe statt?",
      ja:"外乗 は グループ で 行き ます か。" },
  { ref:"ph-lb-commencer-au-pas", lecon:1, mots:["pas"],
      fr:"Nous commencerons au pas.",
      en:"We'll start at a walk.",
      es:"Empezaremos al paso.",
      it:"Cominceremo al passo.",
      de:"Wir fangen im Schritt an.",
      ja:"まず 常歩 から 始め ます。" },
  { ref:"ph-lb-pourra-trotter", lecon:1, mots:["trot"],
      fr:"Est-ce qu'on pourra trotter ?",
      en:"Will we be able to trot?",
      es:"¿Podremos trotar?",
      it:"Potremo trottare?",
      de:"Werden wir traben können?",
      ja:"速歩 も でき ます か。" },
  { ref:"ph-lb-galop-confirmes", lecon:1, mots:["galop", "cavalier-confirme"],
      fr:"Le galop est réservé aux cavaliers confirmés.",
      en:"The canter is for experienced riders only.",
      es:"El galope es solo para jinetes experimentados.",
      it:"Il galoppo è riservato ai cavalieri esperti.",
      de:"Der Galopp ist erfahrenen Reitern vorbehalten.",
      ja:"駈歩 は 経験者 だけ です。" },
  { ref:"ph-lb-porter-bottes", lecon:1, mots:["bottes"],
      fr:"Dois-je porter des bottes ?",
      en:"Do I need to wear riding boots?",
      es:"¿Tengo que llevar botas?",
      it:"Devo mettere degli stivali?",
      de:"Muss ich Reitstiefel tragen?",
      ja:"ブーツ を 履く 必要 が あり ます か。" },
  { ref:"ph-lb-suis-confirme", lecon:1, mots:["cavalier-confirme"],
      fr:"Je suis cavalier confirmé.",
      en:"I'm an experienced rider.",
      es:"Soy jinete experimentado.",
      it:"Sono un cavaliere esperto.",
      de:"Ich bin ein erfahrener Reiter.",
      ja:"私 は 経験者 です。" },
  { ref:"ph-lb-cheval-plus-rapide", lecon:1, mots:["cheval-rapide"],
      fr:"J'aimerais un cheval un peu plus rapide.",
      en:"I'd like a slightly faster horse.",
      es:"Querría un caballo un poco más rápido.",
      it:"Vorrei un cavallo un po' più veloce.",
      de:"Ich hätte gern ein etwas schnelleres Pferd.",
      ja:"もう少し 速い 馬 が いい です。" },
  { ref:"ph-lb-cheval-sympa", lecon:1, mots:["cheval-sympa"],
      fr:"Ce cheval est très sympa.",
      en:"This horse is very friendly.",
      es:"Este caballo es muy simpático.",
      it:"Questo cavallo è molto simpatico.",
      de:"Dieses Pferd ist sehr umgänglich.",
      ja:"この 馬 は とても 人懐こい です。" },
  { ref:"ph-lb-heure-groupe", lecon:1, mots:["le-groupe"],
      fr:"À quelle heure part le groupe ?",
      en:"What time does the group leave?",
      es:"¿A qué hora sale el grupo?",
      it:"A che ora parte il gruppo?",
      de:"Wann bricht die Gruppe auf?",
      ja:"グループ は 何時 に 出発 し ます か。" },
  { ref:"ph-lb-parle-avant-toucher", lecon:2, mots:["prevenir-toucher"],
      fr:"Parle-lui avant de le toucher.",
      en:"Speak to him before you touch him.",
      es:"Háblale antes de tocarlo.",
      it:"Parlagli prima di toccarlo.",
      de:"Sprich mit ihm, bevor du ihn anfasst.",
      ja:"触る 前 に 声 を かけ て。" },
  { ref:"ph-lb-garde-distances", lecon:2, mots:["distance"],
      fr:"Garde tes distances avec les autres chevaux.",
      en:"Keep your distance from the other horses.",
      es:"Guarda las distancias con los demás caballos.",
      it:"Mantieni le distanze dagli altri cavalli.",
      de:"Halte Abstand zu den anderen Pferden.",
      ja:"ほか の 馬 と は 距離 を 取っ て。" },
  { ref:"ph-lb-attention-il-bouge", lecon:2, mots:["attention"],
      fr:"Attention, il bouge !",
      en:"Mind out, he's moving!",
      es:"¡Cuidado, se mueve!",
      it:"Attenzione, si muove!",
      de:"Achtung, er bewegt sich!",
      ja:"気 を つけ て、 動い て いる よ。" },
  { ref:"ph-lb-tiens-le-cheval", lecon:2, mots:["tenir-cheval"],
      fr:"Tiens le cheval pendant que j'ouvre la porte.",
      en:"Hold the horse while I open the gate.",
      es:"Sujeta el caballo mientras abro la puerta.",
      it:"Tieni il cavallo mentre apro il cancello.",
      de:"Halt das Pferd, während ich das Tor öffne.",
      ja:"門 を 開ける 間、 馬 を 持っ て い て。" },
  { ref:"ph-lb-lache-si-tu-tombes", lecon:2, mots:["lacher"],
      fr:"Lâche la longe si tu tombes.",
      en:"Let go of the lead rope if you fall.",
      es:"Suelta el ramal si te caes.",
      it:"Lascia la longhina se cadi.",
      de:"Lass den Strick los, wenn du fällst.",
      ja:"落ち たら 引き綱 は 手放し て。" },
  { ref:"ph-lb-attache-ta-bombe", lecon:2, mots:["casque-attache"],
      fr:"Attache bien ta bombe avant de monter.",
      en:"Do your riding hat up before you get on.",
      es:"Abróchate bien el casco antes de montar.",
      it:"Allaccia bene il cap prima di salire.",
      de:"Mach deine Reitkappe zu, bevor du aufsitzt.",
      ja:"乗る 前 に ヘルメット の あご紐 を 締め て。" },
  { ref:"ph-lb-chaussures-fermees", lecon:2, mots:["chaussures-fermees"],
      fr:"Il faut porter des chaussures fermées.",
      en:"You need to wear closed shoes.",
      es:"Hay que llevar zapatos cerrados.",
      it:"Bisogna portare scarpe chiuse.",
      de:"Man muss geschlossene Schuhe tragen.",
      ja:"つま先 の 覆わ れ た 靴 を 履い て ください。" }
  ],

  /* ==================================================================
     LE DIALOGUE DE LA BAULE — 13 août 2026, session 210.

     🟥 CLÉ NOUVELLE, VOLONTAIREMENT INERTE. Aucun code ne la lit
     aujourd'hui : le mode dialogue n'existe pas encore. La poser ici ne
     change RIEN à l'écran, elle attend son moteur.

     ⚠️ POURQUOI PAS DANS `phrases` : ce tableau alimente un exercice qui
     tourne déjà. Y verser 22 phrases de dialogue aurait modifié cet
     exercice en silence, sans que Blandine l'ait demandé.

     LA RÈGLE DU CHAPITRE, posée session 209 : un dialogue n'emploie que
     les mots de son chapitre, plus les universels. Les 12 mots de la
     leçon 1 sont tous employés ci-dessous — c'est le test qui compte.

     ÉTAT : français et anglais seulement. Décision de Blandine, 12/08 :
     « on avait dit qu'on mettait déjà que l'anglais en ligne pour tester
     ajuster avant de traduire le reste ». Manquent es, it, de, ja + tout
     l'audio.

     ⚠️ 22 PHRASES, et Blandine le sait : « les 22 et on fera du tri
     après s'il faut ». Une version réduite à 14 existe dans
     DIALOGUE-labaule-REDUIT.md, non retenue pour l'instant.

     ⚠️ L'ANGLAIS SUIT LE LEXIQUE, PAS MES PRÉFÉRENCES. Là où ma
     traduction divergeait des mots déjà enregistrés, le lexique gagne :
     « a hat is provided » et non « hats are provided », « at a canter »
     et non « at canter ». Sinon l'app enseignerait un mot et le dialogue
     en emploierait un autre.

     ⚠️ REGISTRE : anglais britannique d'écurie — sept étapes anglaises
     suivent La Baule. `canter` JAMAIS `gallop` (voir le `def` de
     `galop`), `hat` JAMAIS `helmet` dans la phrase, `hack` JAMAIS
     `trail ride`. Les formes américaines vivent en `varEn`, décision de
     Blandine du 12/08 : « il faut préciser les deux ».

     🟥 AUCUN « MOT DU GUIDE » ICI. Son écriture ne relève pas de cette
     conversation — décision de Blandine, PASSATION §6. Le nom est
     tranché (« Le mot du guide ») et sa règle de ton est posée : on
     n'écrit pas de déclarations sur la bienséance, on fait rêver et
     apprendre. Mes essais ont été retirés pour cette raison.

     `dit` : "joueuse" = elle produit la phrase · "club" = elle l'entend
     et doit comprendre. 16 produites, 6 entendues.
  ================================================================== */
  /* ==================================================================
     🟥 REFONTE DU 17/08/2026 — LA BAULE PASSE D'UN CATALOGUE À UNE
     DÉMARCHE.

     Blandine a fourni dix-huit phrases et son jugement : *« ses phrases
     sont mieux que les notées pour La Baule »*. Elle avait raison, et
     pour une raison précise : les siennes suivent le PARCOURS RÉEL d'une
     cavalière de passage — je me renseigne → je dis mon niveau → je
     réserve → je paie → je prépare → je reviens. Les anciennes étaient
     un catalogue de questions sans progression.
     🟥 SA CONSIGNE : *« on peut en piquer quelques-unes »*, puis *« ou
     retirer les moins bonnes »* — donc UNE FUSION, PAS UN REMPLACEMENT.
     Elle a elle-même écarté sa phrase sur le prêt du cheval compris dans
     le tarif (évident dans un club).

     ⚠️ QUATORZE PHRASES RETIRÉES, et pourquoi — NE PAS les remettre :
     · « je monte depuis trois ans », « quel est votre niveau ? »,
       « depuis combien de temps montez-vous ? », « vous êtes
       débutante ? » → quatre façons de dire la même chose. Sa phrase
       « je monte régulièrement dans mon pays » les remplace toutes.
     · « quels sont vos tarifs pour l'année ? », « réserver le mercredi
       après-midi » → un cavalier de passage ne s'inscrit pas à l'année
       et ne raisonne pas en semaine scolaire.
     · « est-ce qu'il faut des bottes et une bombe ? », « prêtez-vous des
       bottes ? » → sa phrase « dois-je apporter mon propre casque et mon
       matériel ? » dit les deux.
     · « cours d'essai », « dans quelles conditions », « proposez-vous
       aussi des balades », « combien est-ce que cela coûte »,
       « avez-vous un cheval calme », « un cheval rapide » → tous
       remplacés par des phrases plus précises.

     🟥 SIX PHRASES GARDÉES CONTRE VENTS ET MARÉES, parce qu'elles
     portent ce que les nouvelles n'ont pas :
     · « je ne suis jamais montée » — avec l'accord féminin qu'elle avait
       corrigé le 15/08 (être + accord, pas « j'ai jamais monté ») ;
     · « vous êtes à l'aise au pas, au trot, au galop ? » et « vous avez
       déjà galopé ? » — les deux portent CANTER ;
     · 🟥 « est-ce qu'on peut galoper doucement, sans aller vite ? » →
       *a steady canter, not a gallop*. C'EST LE FAUX AMI LE PLUS UTILE
       DE L'APP, et le seul endroit où il se vit des deux côtés. NE
       JAMAIS retirer cette phrase.
     · « la bombe est fournie » · « un cheval sympa » · « une balade pour
       cinq personnes ».

     ⚠️ « CALME MAIS AVEC UN PEU DE SANG » est intraduisible mot à mot :
     « du sang » se dit *energy* ou *a bit of go*, JAMAIS *blood*. C'est
     la demande d'une cavalière confirmée : ni un cheval éteint, ni un
     cheval dur.

     ⚠️ TROIS MOTS DU LEXIQUE N'ONT PLUS DE PHRASE : `cours-particulier`,
     `duree-reprise`, `annuler`. Ils restent au lexique et s'apprennent
     en lisant — c'est le régime posé le 15/08 : « un mot du lexique n'a
     pas besoin d'une phrase ».

     🟥 LA DERNIÈRE PHRASE EST À SA PLACE, EN DERNIER : « j'ai beaucoup
     aimé le cours, est-ce que je peux réserver une autre séance ? ». On
     ne quitte pas un club en posant une question, on le quitte en
     revenant. NE PAS la déplacer.
  ================================================================== */
  dialogue: {
    ville: "labaule", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 25 phrases depuis le 13/08 */

    phrases: [

      /* ---- temps 1 · j'entre et j'explique pourquoi je suis là ---- */
      /* 🟥 PHRASE DE BLANDINE, 17/08. Remplace « des informations pour
         l'année prochaine » : un cavalier de passage ne s'inscrit pas à
         l'année, il veut monter cette semaine. Voir l'en-tête. */
      { ref:"d-renseignements", temps:1, dit:"joueuse",
        fr:"Bonjour, je voudrais quelques renseignements sur votre centre équestre.",
        en:"Hello, I'd like some information about your riding centre.",
        es:"Buenos días, quisiera algo de información sobre su centro ecuestre.",
        it:"Buongiorno, vorrei alcune informazioni sul vostro centro equestre.",
        de:"Guten Tag, ich hätte gern einige Informationen über Ihren Reitbetrieb.",
        ja:"こんにちは。 こちら の 乗馬 クラブ に ついて 少し 伺い たい の です が。" },

      /* 🟥 PHRASE DE BLANDINE : LA situation de l'app. Une cavalière en
         voyage n'est ni membre ni débutante — elle est de passage, et
         c'est le premier mot à savoir dire. */
      { ref:"d-cavalier-passage", temps:1, dit:"joueuse", mots:["cavalier-confirme"],
        fr:"Est-ce que vous acceptez les cavaliers de passage ?",
        en:"Do you accept visiting riders?",
        es:"¿Aceptan jinetes de paso?",
        it:"Accettate cavalieri di passaggio?",
        de:"Nehmen Sie auch Gastreiter an?",
        ja:"ビジター の 騎乗 は 受け付け て い ます か ?" },

      /* 🟥 PHRASE DE BLANDINE. Elle remplace « je monte depuis trois
         ans » : dire qu'on monte RÉGULIÈREMENT renseigne mieux qu'une
         durée, et c'est ce qu'un club veut savoir. */
      { ref:"d-monte-regulierement", temps:1, dit:"joueuse", mots:["niveau"],
        fr:"Je monte régulièrement à cheval dans mon pays.",
        en:"I ride regularly in my country.",
        es:"Monto a caballo con regularidad en mi país.",
        it:"Monto regolarmente a cavallo nel mio paese.",
        de:"Ich reite regelmäßig in meinem Land.",
        ja:"自分 の 国 で 定期的 に 乗っ て い ます。" },

      /* ---- temps 2 · je demande ce qui existe ---- */
      { ref:"d-cours-debutants", temps:2, dit:"joueuse", mots:["debutant"],
        fr:"Est-ce qu'il y a des cours pour débutants ?",
        en:"Do you have lessons for beginners?",
        es:"¿Hay clases para principiantes?",
        it:"Ci sono lezioni per principianti?",
        de:"Gibt es Stunden für Anfänger?",
        ja:"初心者 の レッスン は あり ます か ?" },

      /* La phrase de Blandine. `cavalier-confirme` a rejoint le lexique de
         La Baule le 13/08 pour qu'elle soit légitime — voir le commentaire
         du concept. NE PAS RETIRER CETTE PHRASE. */
      /* 🟥 PHRASE DE BLANDINE. Remplace « quel est votre niveau ? » posée
         par le club : c'est la JOUEUSE qui doit savoir demander le niveau
         requis, pas subir la question. */
      /* 🟥 19/08 : `cours-collectif` RETIRÉ du marquage de ces deux phrases.
     Le concept est en leçon 3, que La Baule n'enseigne pas : le mot
     pointait dans le vide. Le TEXTE des phrases est inchangé — elles sont
     naturelles et restent à leur place. */
  { ref:"d-quel-niveau-requis", temps:2, dit:"joueuse", mots:["niveau"],
        fr:"Quel niveau faut-il avoir pour participer à ce cours ?",
        en:"What level do I need to take part in this lesson?",
        es:"¿Qué nivel hace falta para participar en esta clase?",
        it:"Che livello serve per partecipare a questa lezione?",
        de:"Welches Niveau braucht man für diese Stunde?",
        ja:"この レッスン に 参加 する に は どの くらい の レベル が 必要 です か ?" },

      { ref:"d-cours-confirmes", temps:2, dit:"joueuse", mots:["cavalier-confirme"],
        fr:"Et pour les cavaliers confirmés ?",
        en:"And for more experienced riders?",
        es:"¿Y para los jinetes experimentados?",
        it:"E per i cavalieri esperti?",
        de:"Und für erfahrene Reiter?",
        ja:"経験者 向け の レッスン も あり ます か ?" },

      /* ---- temps 3 · je réserve ---- */
      /* 🟥 TROIS PHRASES DE BLANDINE. Elles remplacent « les tarifs pour
         l'année » et « réserver le mercredi après-midi » : un cavalier de
         passage réserve UNE séance, pour DEMAIN. */
      { ref:"d-inscrire-demain", temps:3, dit:"joueuse", mots:["reserver"],
        fr:"Je voudrais m'inscrire pour un cours demain matin.",
        en:"I'd like to book a lesson for tomorrow morning.",
        es:"Quisiera inscribirme en una clase para mañana por la mañana.",
        it:"Vorrei iscrivermi a una lezione per domani mattina.",
        de:"Ich würde gern eine Stunde für morgen Vormittag buchen.",
        ja:"明日 の 午前 の レッスン に 申し込み たい の です が。" },

      { ref:"d-une-seule-seance", temps:3, dit:"joueuse", mots:["reserver"],
        fr:"Est-ce que je peux réserver seulement une séance ?",
        en:"Can I book just one session?",
        es:"¿Puedo reservar solo una sesión?",
        it:"Posso prenotare solo una lezione?",
        de:"Kann ich nur eine einzelne Stunde buchen?",
        ja:"一 回 だけ の 予約 も でき ます か ?" },

      { ref:"d-combien-une-heure", temps:3, dit:"joueuse", mots:["tarif"],
        fr:"Combien coûte une heure de cours ?",
        en:"How much does a one-hour lesson cost?",
        es:"¿Cuánto cuesta una hora de clase?",
        it:"Quanto costa un'ora di lezione?",
        de:"Was kostet eine Reitstunde?",
        ja:"一 時間 の レッスン は いくら です か ?" },

      { ref:"d-jamais-monte", temps:3, dit:"joueuse", mots:["debutant"],
        fr:"Je suis débutante, je ne suis jamais montée.",
        en:"I'm a beginner — I've never ridden before.",
        es:"Soy principiante, nunca he montado.",
        it:"Sono principiante, non sono mai andata a cavallo.",
        de:"Ich bin Anfängerin, ich bin noch nie geritten.",
        ja:"初心者 です。 馬 に 乗っ た こと が あり ませ ん。" },

      { ref:"d-q-allures", temps:4, dit:"club", mots:["pas","trot","galop"],
        fr:"Vous êtes à l'aise au pas, au trot, au galop ?",
        en:"Are you happy at a walk, a trot and a canter?",
        es:"¿Se siente cómoda al paso, al trote y al galope?",
        it:"Si sente a suo agio al passo, al trotto e al galoppo?",
        de:"Fühlen Sie sich im Schritt, im Trab und im Galopp sicher?",
        ja:"常歩、 速歩、 駆歩 は 大丈夫 です か ?" },

      { ref:"d-q-deja-galope", temps:4, dit:"club", mots:["galop"],
        fr:"Vous avez déjà galopé ?",
        en:"Have you cantered before?",
        es:"¿Ha galopado alguna vez?",
        it:"Ha già galoppato?",
        de:"Sind Sie schon einmal galoppiert?",
        ja:"駆歩 を し た こと は あり ます か ?" },

      /* ---- temps 5 · l'équipement obligatoire ---- */
      /* 🟥 TROIS PHRASES DE BLANDINE sur le cheval qu'on reçoit. Elles
         remplacent « avez-vous un cheval calme ? » et « puis-je avoir un
         cheval rapide ? », toutes deux trop plates.
         ⚠️ « CALME MAIS AVEC UN PEU DE SANG » est intraduisible mot à mot :
         « du sang » se dit « energy » ou « a bit of go » en anglais, jamais
         « blood ». C'est ce qu'une cavalière confirmée demande vraiment —
         ni un cheval éteint, ni un cheval dur. */
      { ref:"d-calme-avec-du-sang", temps:5, dit:"joueuse", mots:["cheval-calme","cheval-rapide"],
        fr:"Pouvez-vous me proposer un cheval calme mais avec un peu de sang ?",
        en:"Can you give me a calm horse with a bit of energy?",
        es:"¿Me puede dar un caballo tranquilo pero con algo de sangre?",
        it:"Può darmi un cavallo tranquillo ma con un po' di sangue?",
        de:"Können Sie mir ein ruhiges Pferd mit etwas Temperament geben?",
        ja:"落ち着い て いる けれど、 少し 気持ち の ある 馬 を お願い でき ます か ?" },

      { ref:"d-cheval-plutot-grand", temps:5, dit:"joueuse", mots:[],
        fr:"Je préfère monter un cheval plutôt grand.",
        en:"I'd prefer to ride a fairly tall horse.",
        es:"Prefiero montar un caballo bastante alto.",
        it:"Preferisco montare un cavallo piuttosto alto.",
        de:"Ich würde lieber ein eher großes Pferd reiten.",
        ja:"どちら か と いえ ば 大きめ の 馬 に 乗り たい です。" },

      { ref:"d-quel-cheval-attribue", temps:5, dit:"joueuse", mots:[],
        fr:"Quel cheval allez-vous m'attribuer pour le cours ?",
        en:"Which horse will I be riding for the lesson?",
        es:"¿Qué caballo me van a asignar para la clase?",
        it:"Quale cavallo mi assegnate per la lezione?",
        de:"Welches Pferd bekomme ich für die Stunde?",
        ja:"レッスン で は どの 馬 に 乗る こと に なり ます か ?" },

      { ref:"d-pas-de-bombe", temps:5, dit:"joueuse", mots:["bombe-fournie"],
        fr:"Je n'ai pas encore de bombe — est-ce que vous en prêtez ?",
        en:"I haven't got a hat yet — do you lend them?",
        varEn:"I don't have a helmet yet — do you lend them?",
        es:"Todavía no tengo casco, ¿los prestan?",
        it:"Non ho ancora il cap, li prestate?",
        de:"Ich habe noch keine Kappe — verleihen Sie welche?",
        ja:"まだ ヘルメット を 持っ て い ませ ん。 貸し て もらえ ます か ?" },

      { ref:"d-bombe-fournie", temps:5, dit:"club", mots:["bombe-fournie"],
        fr:"La bombe est fournie.",
        en:"A hat is provided.",
        varEn:"A helmet is provided.",
        es:"El casco está incluido.",
        it:"Il cap è fornito.",
        de:"Eine Kappe wird gestellt.",
        ja:"ヘルメット の 貸し出し が あり ます。" },

      /* ---- temps 6 · je réserve ---- */
      /* 🟥 QUATRE PHRASES DE BLANDINE — CE QUI MANQUAIT ENTIÈREMENT :
         l'heure d'arrivée, seller soi-même, où sont la sellerie et le
         pansage. Un cavalier de passage ne sait rien de tout cela, et
         c'est ce qui l'angoisse le plus en arrivant.
         ⚠️ La dernière est la plus belle du chapitre : on ne quitte pas
         un club en posant une question, on le quitte en revenant. */
      { ref:"d-heure-arrivee", temps:6, dit:"joueuse", mots:[],
        fr:"À quelle heure dois-je arriver pour préparer mon cheval ?",
        en:"What time should I arrive to get my horse ready?",
        es:"¿A qué hora debo llegar para preparar mi caballo?",
        it:"A che ora devo arrivare per preparare il cavallo?",
        de:"Wann soll ich kommen, um mein Pferd fertig zu machen?",
        ja:"馬 の 支度 を する に は 何 時 に 着け ば いい です か ?" },

      { ref:"d-seller-moi-meme", temps:6, dit:"joueuse", mots:[],
        fr:"Est-ce que je dois seller le cheval moi-même ?",
        en:"Do I need to tack up the horse myself?",
        es:"¿Tengo que ensillar el caballo yo misma?",
        it:"Devo sellare il cavallo da sola?",
        de:"Muss ich das Pferd selbst satteln?",
        ja:"馬 に 鞍 を つける の は 自分 で し ます か ?" },

      { ref:"d-ou-sellerie-pansage", temps:6, dit:"joueuse", mots:[],
        fr:"Où puis-je trouver la sellerie et le matériel de pansage ?",
        en:"Where can I find the tack room and the grooming equipment?",
        es:"¿Dónde puedo encontrar la guadarnés y el material de limpieza?",
        it:"Dove posso trovare la selleria e il materiale per la pulizia?",
        de:"Wo finde ich die Sattelkammer und das Putzzeug?",
        ja:"馬具 部屋 と 手入れ 道具 は どこ に あり ます か ?" },

      { ref:"d-balade-plage", temps:6, dit:"joueuse", mots:["balade"],
        fr:"Est-il possible de faire une balade sur la plage ?",
        en:"Is it possible to go for a ride on the beach?",
        es:"¿Es posible hacer un paseo por la playa?",
        it:"È possibile fare una passeggiata sulla spiaggia?",
        de:"Ist ein Ausritt am Strand möglich?",
        ja:"浜辺 で の 外乗 は でき ます か ?" },

      { ref:"d-balade-cinq", temps:6, dit:"joueuse", mots:["reserver","balade","le-groupe"],
        fr:"Je voudrais réserver une balade pour cinq personnes.",
        en:"I'd like to book a hack for a group of five.",
        varEn:"I'd like to book a trail ride for a group of five.",
        es:"Quisiera reservar un paseo para cinco personas.",
        it:"Vorrei prenotare una passeggiata per cinque persone.",
        de:"Ich möchte einen Ausritt für fünf Personen buchen.",
        ja:"五人 で 外乗 を 予約 し たい です。" },

      { ref:"d-canter-doux", temps:6, dit:"joueuse", mots:["galop"],
        fr:"Est-ce qu'on peut galoper doucement, sans aller vite ?",
        en:"Can we do a steady canter, not a gallop?",
        es:"¿Podemos galopar tranquilos, sin correr?",
        it:"Possiamo galoppare tranquilli, senza correre?",
        de:"Können wir ruhig galoppieren, ohne zu rennen?",
        ja:"ゆっくり 駆歩 を し て も いい です か ?" },

      { ref:"d-pas-rassuree", temps:6, dit:"joueuse", mots:["cheval-sympa"],
        fr:"Je ne suis pas très rassurée à cheval. Est-ce que vous auriez un cheval sympa ?",
        en:"I'm not very confident on a horse. Would you have a nice one?",
        varEn:"I'm not very confident on a horse. Would you have a kind one?",
        es:"No voy muy tranquila a caballo. ¿Tendrían un caballo bueno?",
        it:"Non sono molto tranquilla a cavallo. Avreste un cavallo buono?",
        de:"Ich fühle mich auf dem Pferd nicht sehr sicher. Hätten Sie ein nettes Pferd?",
        ja:"馬 の 上 で あまり 自信 が あり ませ ん。 優しい 馬 は い ます か ?" },

      /* 🟥 LA DERNIÈRE PHRASE, et la plus belle du chapitre. */
      { ref:"d-aime-le-cours", temps:6, dit:"joueuse", mots:["reserver"],
        fr:"J'ai beaucoup aimé le cours. Est-ce que je peux réserver une autre séance cette semaine ?",
        en:"I really enjoyed the lesson. Can I book another session this week?",
        es:"Me ha gustado mucho la clase. ¿Puedo reservar otra sesión esta semana?",
        it:"Mi è piaciuta molto la lezione. Posso prenotare un'altra sessione questa settimana?",
        de:"Die Stunde hat mir sehr gefallen. Kann ich diese Woche noch eine buchen?",
        ja:"レッスン が とても 楽しかっ た です。 今週 中 に もう 一 回 予約 でき ます か ?" },

    ]
  }
};
