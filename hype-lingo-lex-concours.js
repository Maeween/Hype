/* hype-lingo-lex-concours.js — Hype Lingo · Chapitre 8 · « Le concours »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Ville : Badminton. Souvenir : une cocarde.

   POURQUOI LE CONCOURS COMPLET EST ICI
   Badminton est l'épreuve de concours complet la plus célèbre du monde.
   C'est donc ce chapitre qui porte le vocabulaire du complet et du cross
   (leçon 2), en plus de celui de la journée de concours en général.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`
   (réservé aux chapitres Le cours et Les urgences).

   PAS DE DOUBLON avec les chapitres déjà écrits :
     · Dressage (6) possède le juge, la note, le protocole, le
       coefficient, le pourcentage, l'erreur de parcours, le classement.
     · Obstacle (7) possède le parcours, les obstacles, les fautes de
       saut, le barrage, le chrono, le paddock de détente, la
       reconnaissance, le tour d'honneur.
     · Ce chapitre-ci prend ce qui reste : s'engager, arriver, les gens
       du concours, le complet, et les mots de la journée.

   ⚠️ DEUX MOTS ESPAGNOLS SE CHEVAUCHENT AVEC D'AUTRES CHAPITRES :
   `la prueba` sert ici pour l'épreuve et au chapitre 6 pour la reprise
   de dressage ; `la clasificación` sert au chapitre 6 pour le classement
   et en espagnol courant pour la qualification. Ce sont de vrais faits
   de langue, pas des erreurs — mais le moteur devra tolérer qu'un même
   mot espagnol réponde à deux concepts. Signalé au fichier de doutes.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · **the show**, **the class**, **eventing** : trois mots anglais que
       personne ne devine depuis le français.
     · la couleur de la première place change de pays : rouge en
       Grande-Bretagne, bleu aux États-Unis.
     · « bonne chance » est le piège le plus drôle du module : l'allemand
       souhaite qu'on se casse le cou et la jambe, l'italien envoie dans
       la gueule du loup.
     · **groom** en anglais désigne la PERSONNE, alors que *to groom*
       est le geste du chapitre 2.
     · au Japon, ゼッケン désigne le tapis de selle ET le dossard, parce
       que le numéro se porte sur le tapis.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Entrées // ?? au fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.concours = {
  ref: "concours",
  chapitre: 8,
  titre: { fr:"Le concours", en:"The show", es:"El concurso", it:"Il concorso", de:"Das Turnier", ja:"競技会" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · S'ENGAGER ET ARRIVER ============ */

  { ref:"concours", lecon:1, coll:"engager",
    mots:{ fr:{m:"le concours"}, en:{m:"the show", p:"chô", var:"the competition · the event"},
           es:{m:"el concurso"}, it:{m:"il concorso"},
           de:{m:"das Turnier", p:"tour-nir"}, ja:{m:"競技会", p:"kyōgikai"} },
    def:{ fr:"⚠️ L'anglais dit **the show**, et pour le complet **the event**. « Concourse » existe en anglais mais désigne le hall d'une gare : à ne pas employer.",
          en:"English says the show, or the event for eventing. « Concourse » exists but means a station hall.",
          es:"⚠️ El inglés dice **the show**, y para el completo **the event**. « Concourse » existe en inglés pero designa el vestíbulo de una estación: no emplear.",
          it:"⚠️ L'inglese dice **the show**, e per il completo **the event**. « Concourse » esiste in inglese ma indica l'atrio di una stazione: da non usare.",
          de:"⚠️ Das Englische sagt **the show**, für die Vielseitigkeit **the event**. « Concourse » gibt es — es meint die Bahnhofshalle: nicht verwenden.",
          ja:"⚠️ 英語では **the show**、総合馬術なら **the event** と言います。« concourse » という英単語はありますが、駅のコンコースのこと。使ってはいけません。" } },

  { ref:"engagement", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'engagement"}, en:{m:"the entry", p:"èn-tri"},
           es:{m:"la inscripción"}, it:{m:"l'iscrizione"},
           de:{m:"die Nennung", p:"nè-noung"}, ja:{m:"出場申込", p:"shutsujō mōshikomi"} }, // ??
    def:{ fr:"L'inscription à une épreuve, avec sa date de clôture. À l'étranger, c'est là qu'on découvre qu'il faut une licence du pays ou un passeport à jour — à vérifier des semaines avant, pas la veille.",
          en:"Entering a class, with its closing date. Abroad this is where you find out you need a local membership or an up-to-date passport.",
          es:"La inscripción a una prueba, con su fecha de cierre. En el extranjero es ahí donde uno descubre que hace falta una licencia del país o un pasaporte al día — a verificar semanas antes, no la víspera.",
          it:"L'iscrizione a una prova, con la sua data di chiusura. All'estero è lì che si scopre che serve una licenza del paese o un passaporto aggiornato — da verificare settimane prima, non la vigilia.",
          de:"Die Nennung zu einer Prüfung, mit Nennschluss. Im Ausland entdeckt man hier, dass eine Landeslizenz oder ein aktueller Pass nötig ist — Wochen vorher prüfen, nicht am Vorabend.",
          ja:"競技へのエントリー。締切日があります。海外では、その国のライセンスや最新のパスポートが要ると気づくのがここ — 確認は数週間前に。前日ではなく。" } },

  { ref:"epreuve", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'épreuve"}, en:{m:"the class", p:"klass"},
           es:{m:"la prueba"}, it:{m:"la prova"},
           de:{m:"die Prüfung", p:"pru-foung"}, ja:{m:"競技", p:"kyōgi"} },
    def:{ fr:"⚠️ Un des faux amis les plus coûteux du module : l'anglais dit **the class**. Ni « the proof », ni « the trial », ni « the event » — event désigne le concours entier. « Which class are you in ? » veut dire « tu fais quelle épreuve ? ».",
          en:"English says the class. Not proof, not trial, and not event, which means the whole competition.",
          es:"⚠️ Uno de los falsos amigos más caros del módulo: el inglés dice **the class**. Ni « the proof », ni « the trial », ni « the event » — event designa el concurso entero. « Which class are you in ? » significa « ¿qué prueba haces? ».",
          it:"⚠️ Uno dei falsi amici più costosi del modulo: l'inglese dice **the class**. Né « the proof », né « the trial », né « the event » — event indica il concorso intero. « Which class are you in ? » vuol dire « che prova fai? ».",
          de:"⚠️ Einer der teuersten falschen Freunde des Moduls: Das Englische sagt **the class**. Weder « the proof » noch « the trial » noch « the event » — event ist das ganze Turnier. « Which class are you in ? » heißt « In welcher Prüfung startest du? ».",
          ja:"⚠️ この教材で最も高くつく偽りの友のひとつ。英語は **the class** と言います。« the proof » でも « the trial » でも « the event » でもありません — event は大会全体のこと。« Which class are you in ? » は「どの競技に出るの？」の意味です。" } },

  { ref:"liste-depart", lecon:1, coll:"engager",
    mots:{ fr:{m:"la liste de départ"}, en:{m:"the start list", p:"start liste", var:"the running order"},
           es:{m:"la lista de salida"}, it:{m:"l'ordine di partenza"},
           de:{m:"die Startliste", p:"chtart-liss-te"}, ja:{m:"出場順", p:"shutsujōjun"} }, // ??
    def:{ fr:"L'ordre de passage, affiché la veille ou le matin. Les Britanniques disent aussi **the running order**, et il change souvent : on le revérifie en arrivant, toujours.",
          en:"The order of go, posted the night before or that morning. It changes often, so always check again on arrival.",
          es:"El orden de salida, expuesto la víspera o por la mañana. Los británicos dicen también **the running order**, y cambia a menudo: se vuelve a comprobar al llegar, siempre.",
          it:"L'ordine di partenza, affisso la vigilia o la mattina. I britannici dicono anche **the running order**, e cambia spesso: si ricontrolla arrivando, sempre.",
          de:"Die Startreihenfolge, am Vorabend oder Morgen ausgehängt. Die Briten sagen auch **the running order** — sie ändert sich oft: Bei Ankunft immer neu prüfen.",
          ja:"出走順。前日か当日の朝に掲示されます。イギリスでは **the running order** とも言い、しかもよく変わります。着いたら必ず見直すこと。" } },

  { ref:"dossard", lecon:1, coll:"engager",
    mots:{ fr:{m:"le dossard"}, en:{m:"the number", p:"neum-beur", var:"number cloth · bridle number"},
           es:{m:"el dorsal"}, it:{m:"il numero di gara"},
           de:{m:"die Startnummer", p:"chtart-nou-meur"}, ja:{m:"ゼッケン", p:"zekken"} },
    def:{ fr:"Sans lui, pas de départ, et il doit rester visible du début à la fin. ⚠️ Curiosité japonaise : **ゼッケン** désigne à la fois le dossard et le tapis de selle (chapitre 4), parce que le numéro se porte justement sur le tapis.",
          en:"No number, no start, and it must stay visible throughout. In Japanese, ゼッケン means both the number and the saddle cloth, since the number is worn on it.",
          es:"Sin él no hay salida, y debe quedar visible de principio a fin. ⚠️ Curiosidad japonesa: **ゼッケン** designa a la vez el dorsal y el sudadero (capítulo 4), porque el número se lleva justamente sobre el sudadero.",
          it:"Senza di lui niente partenza, e deve restare visibile dall'inizio alla fine. ⚠️ Curiosità giapponese: **ゼッケン** indica sia il pettorale sia il sottosella (capitolo 4), perché il numero si porta proprio sul sottosella.",
          de:"Ohne sie kein Start, und sie muss von Anfang bis Ende sichtbar bleiben. ⚠️ Japanische Kuriosität: **ゼッケン** meint Startnummer UND Schabracke (Kapitel 4) — die Nummer sitzt ja auf der Schabracke.",
          ja:"これがなければ出走できず、最初から最後まで見えていなければなりません。⚠️ 日本語の面白いところ：**ゼッケン**は出走番号とゼッケン（鞍下敷き・第4章）の両方を指します。番号はまさにその布の上につけるからです。" } },

  { ref:"secretariat", lecon:1, coll:"engager",
    mots:{ fr:{m:"le secrétariat"}, en:{m:"the show secretary", p:"sè-kre-tri", var:"the show office"},
           es:{m:"la secretaría"}, it:{m:"la segreteria"},
           de:{m:"die Meldestelle", p:"mèl-de-chtè-le"}, ja:{m:"事務局", p:"jimukyoku"} },
    def:{ fr:"Le premier arrêt en arrivant : dossard, horaires, protocoles, forfaits. En Grande-Bretagne, **the secretary** désigne la personne autant que le bureau, et c'est elle qui règle tout.",
          en:"Your first stop on arrival: number, times, sheets, withdrawals. In Britain « the secretary » is both the person and the office.",
          es:"La primera parada al llegar: dorsal, horarios, protocolos, retiradas. En Gran Bretaña, **the secretary** designa tanto a la persona como a la oficina, y es ella quien lo arregla todo.",
          it:"La prima sosta arrivando: pettorale, orari, protocolli, ritiri. In Gran Bretagna **the secretary** indica la persona quanto l'ufficio, ed è lei che sistema tutto.",
          de:"Der erste Halt bei Ankunft: Startnummer, Zeiten, Protokolle, Absagen. In Großbritannien meint **the secretary** Person wie Büro — und sie regelt alles.",
          ja:"到着してまず寄る場所。ゼッケン、時間割、採点表、棄権の手続き。イギリスの **the secretary** は事務所と人の両方を指し、すべてを取り仕切ってくれるのはその人です。" } },

  { ref:"commissaire", lecon:1, coll:"engager",
    mots:{ fr:{m:"le commissaire"}, en:{m:"the steward", p:"stiou-eurd"},
           es:{m:"el comisario"}, it:{m:"il commissario"},
           de:{m:"der Steward", p:"stiou-eurd", var:"der Ordner"}, ja:{m:"スチュワード", p:"suchuwādo"} }, // ??
    def:{ fr:"Il surveille la détente, contrôle les embouchures et fait respecter la sécurité. ⚠️ Le mot anglais **steward** n'a rien à voir avec l'aviation : c'est lui qu'on trouve dans le paddock, et il a autorité pour éliminer.",
          en:"They supervise the warm-up, check tack and enforce safety. « Steward » here has nothing to do with aircraft.",
          es:"Vigila el calentamiento, controla las embocaduras y hace respetar la seguridad. ⚠️ La palabra inglesa **steward** no tiene nada que ver con la aviación: es él quien está en el paddock, y tiene autoridad para eliminar.",
          it:"Sorveglia il campo prova, controlla le imboccature e fa rispettare la sicurezza. ⚠️ La parola inglese **steward** non c'entra con l'aviazione: è lui che trovi nel paddock, e ha autorità per eliminare.",
          de:"Überwacht das Abreiten, prüft die Gebisse, sorgt für Sicherheit. ⚠️ **Steward** hat nichts mit Luftfahrt zu tun: Er steht im Abreiteplatz — und darf ausschließen.",
          ja:"練習馬場を見張り、ハミを検査し、安全を守らせる係。⚠️ 英語の **steward** は飛行機とは無関係。パドックにいるのがこの人で、失権させる権限を持っています。" } },

  { ref:"chef-piste", lecon:1, coll:"engager",
    mots:{ fr:{m:"le chef de piste"}, en:{m:"the course designer", p:"korss di-zaï-neur", var:"course builder"},
           es:{m:"el jefe de pista"}, it:{m:"il disegnatore di percorsi", var:"il direttore di campo"}, /* it precise (rapport 07/08) */
           de:{m:"der Parcourschef", p:"par-kour-chèf"}, ja:{m:"コースデザイナー", p:"kōsu dezainā"} },
    def:{ fr:"Celui qui dessine le parcours, choisit les distances et décide de la difficulté. ⚠️ L'anglais insiste sur le dessin (**designer**), le français sur l'autorité (le chef), l'allemand mélange les deux.",
          en:"The person who plans the course, sets the distances and decides the difficulty. English stresses the design, French the authority.",
          es:"El que dibuja el recorrido, elige las distancias y decide la dificultad. ⚠️ El inglés insiste en el dibujo (**designer**), el francés en la autoridad (el jefe), el alemán mezcla los dos.",
          it:"Colui che disegna il percorso, sceglie le distanze e decide la difficoltà. ⚠️ L'inglese insiste sul disegno (**designer**), il francese sull'autorità (il capo), il tedesco mescola i due.",
          de:"Er entwirft den Parcours, wählt die Distanzen, bestimmt die Schwierigkeit. ⚠️ Das Englische betont das Entwerfen (**designer**), das Französische die Autorität (der Chef) — das Deutsche mischt beides.",
          ja:"コースを描き、距離を選び、難度を決める人。⚠️ 英語は設計を強調し（**designer**）、フランス語は権限を（「長」）、ドイツ語はその両方を混ぜています。" } },

  { ref:"cocarde", lecon:1, coll:"engager",
    mots:{ fr:{m:"la cocarde", var:"le flot"}, en:{m:"the rosette", p:"rô-zètt", var:"ribbon (US)"},
           es:{m:"la escarapela"}, it:{m:"la coccarda"},
           de:{m:"die Schleife", p:"chlaï-fe"}, ja:{m:"ロゼット", p:"rozetto"} }, // ??
    def:{ fr:"Le souvenir que tu rapportes de Badminton. ⚠️ Deux pièges : les Américains disent **ribbon**, et surtout **la couleur de la première place change de pays** — rouge en Grande-Bretagne et en Irlande, bleu aux États-Unis. Un cavalier britannique fier de sa rosette rouge a gagné, pas fini deuxième.",
          en:"Two traps: Americans say ribbon, and first place is red in Britain and Ireland but blue in the United States.",
          es:"El recuerdo que traes de Badminton. ⚠️ Dos trampas: los americanos dicen **ribbon**, y sobre todo **el color del primer puesto cambia de país** — rojo en Gran Bretaña e Irlanda, azul en Estados Unidos. Un jinete británico orgulloso de su escarapela roja ganó, no quedó segundo.",
          it:"Il ricordo che riporti da Badminton. ⚠️ Due trappole: gli americani dicono **ribbon**, e soprattutto **il colore del primo posto cambia paese** — rosso in Gran Bretagna e Irlanda, blu negli Stati Uniti. Un cavaliere britannico fiero della sua coccarda rossa ha vinto, non è arrivato secondo.",
          de:"Dein Andenken aus Badminton. ⚠️ Zwei Fallen: Amerikaner sagen **ribbon** — und vor allem **wechselt die Farbe des ersten Platzes das Land**: Rot in Großbritannien und Irland, Blau in den USA. Ein Brite, stolz auf seine rote Schleife, hat gewonnen — nicht Zweiter.",
          ja:"バドミントンから持ち帰る記念品。⚠️ 罠がふたつ。アメリカでは **ribbon** と言うこと、そして何より**一位の色が国によって違う**こと — 英愛では赤、アメリカでは青。赤いロゼットを誇らしげに掲げるイギリスの騎手は優勝者です。二位ではありません。" } },

  { ref:"prix", lecon:1, coll:"engager",
    mots:{ fr:{m:"le prix"}, en:{m:"the prize money", p:"praïz meu-ni"},
           es:{m:"el premio"}, it:{m:"il premio"},
           de:{m:"das Preisgeld", p:"praïss-guèlt"}, ja:{m:"賞金", p:"shōkin"} },
    def:{ fr:"Dans les épreuves de club, il n'y en a souvent pas — juste la cocarde. Dans les grands concours, il se répartit entre les premiers classés selon un barème affiché à l'avance.",
          en:"At club level there is often none, just the rosette. At big shows it is split among the placings by a published scale.",
          es:"En las pruebas de club a menudo no lo hay — solo la escarapela. En los grandes concursos se reparte entre los primeros clasificados según un baremo publicado de antemano.",
          it:"Nelle prove di club spesso non c'è — solo la coccarda. Nei grandi concorsi si ripartisce tra i primi classificati secondo un tariffario affisso in anticipo.",
          de:"In Clubprüfungen gibt es oft keins — nur die Schleife. Bei großen Turnieren wird es nach vorab ausgehängtem Schlüssel unter den Erstplatzierten verteilt.",
          ja:"クラブ競技には賞金がないことも多く、あるのはロゼットだけ。大きな大会では、事前に掲示された配分表に従って上位入賞者に分けられます。" } },

  { ref:"licence", lecon:1, coll:"engager",
    mots:{ fr:{m:"la licence"}, en:{m:"the membership", p:"mèm-beur-chip", var:"the licence"},
           es:{m:"la licencia"}, it:{m:"la tessera"},
           de:{m:"die Turnierlizenz", p:"tour-nir-li-tsèntss"}, ja:{m:"会員証", p:"kaiinshō"} }, // ??
    def:{ fr:"⚠️ Le point qui bloque le plus souvent un cavalier à l'étranger : l'anglais parle de **membership**, l'adhésion à la fédération, pas de « licence ». En Grande-Bretagne, sortir en concours affilié demande d'être membre de British Eventing ou de British Showjumping.",
          en:"The thing that most often blocks a visiting rider: English says membership, not licence. Affiliated shows need you to be a member.",
          es:"⚠️ El punto que más a menudo bloquea a un jinete en el extranjero: el inglés habla de **membership**, la afiliación a la federación, no de « licence ». En Gran Bretaña, salir en concurso afiliado exige ser miembro de British Eventing o British Showjumping.",
          it:"⚠️ Il punto che più spesso blocca un cavaliere all'estero: l'inglese parla di **membership**, l'adesione alla federazione, non di « licence ». In Gran Bretagna, uscire in concorso affiliato richiede di essere membri di British Eventing o British Showjumping.",
          de:"⚠️ Der Punkt, der Reiter im Ausland am häufigsten stoppt: Das Englische spricht von **membership**, der Verbandsmitgliedschaft — nicht von « licence ». In Großbritannien verlangt ein affiliiertes Turnier die Mitgliedschaft bei British Eventing oder British Showjumping.",
          ja:"⚠️ 海外で騎手がいちばん引っかかる点。英語で言うのは **membership** — 連盟への加入のことで、« licence » ではありません。イギリスの公認競技会に出るには、British Eventing か British Showjumping の会員であることが必要です。" } },

  /* ============ LEÇON 2 · LE CONCOURS COMPLET ============ */

  { ref:"concours-complet", lecon:2, coll:"complet",
    mots:{ fr:{m:"le concours complet"}, en:{m:"eventing", p:"i-vèn-ting", var:"horse trials · three-day event"},
           es:{m:"el concurso completo"}, it:{m:"il completo"},
           de:{m:"die Vielseitigkeit", p:"fil-zaï-tirh-kaïte"}, ja:{m:"総合馬術", p:"sōgō bajutsu"} },
    def:{ fr:"Trois tests, un cheval, un cavalier : dressage, cross, obstacle. ⚠️ Aucun mot commun entre les langues. L'anglais dit **eventing**, l'allemand « la polyvalence », le japonais « l'art équestre complet ». Traduire « complete competition » ne sera pas compris.",
          en:"Three tests, one horse, one rider. No shared word: English says eventing, German « versatility », Japanese « complete equestrian art ».",
          es:"Tres tests, un caballo, un jinete: doma, cross, salto. ⚠️ Ninguna palabra común entre lenguas. El inglés dice **eventing**, el alemán « la polivalencia », el japonés « el arte ecuestre completo ». Traducir « complete competition » no será entendido.",
          it:"Tre test, un cavallo, un cavaliere: dressage, cross, salto. ⚠️ Nessuna parola comune tra le lingue. L'inglese dice **eventing**, il tedesco « la versatilità », il giapponese « l'arte equestre completa ». Tradurre « complete competition » non sarà capito.",
          de:"Drei Teilprüfungen, ein Pferd, ein Reiter: Dressur, Gelände, Springen. ⚠️ Kein gemeinsames Wort: Englisch **eventing**, Deutsch die Vielseitigkeit, Japanisch « die vollständige Reitkunst ». « Complete competition » versteht niemand.",
          ja:"三つの競技、一頭の馬、ひとりの騎手 — 馬場、クロス、障害。⚠️ 言語間に共通語はありません。英語は **eventing**、ドイツ語は「多才さ」、日本語は「総合馬術」。« complete competition » と直訳しても通じません。" } },

  { ref:"cross", lecon:2, coll:"complet",
    mots:{ fr:{m:"le cross"}, en:{m:"the cross-country", p:"kross-keune-tri", var:"XC"},
           es:{m:"el cross"}, it:{m:"il cross"},
           de:{m:"das Gelände", p:"gue-lèn-de"}, ja:{m:"クロスカントリー", p:"kurosu kantorī"} },
    def:{ fr:"Le test de fond, sur obstacles fixes en terrain naturel. ⚠️ L'allemand est le seul à ne rien emprunter : **das Gelände**, « le terrain ». Et les Britanniques abrègent tout en **XC**, y compris à l'écrit sur les horaires.",
          en:"The endurance test, over fixed fences in open country. German borrows nothing: das Gelände, « the terrain ». The British write it XC.",
          es:"El test de fondo, sobre obstáculos fijos en terreno natural. ⚠️ El alemán es el único que no toma nada prestado: **das Gelände**, « el terreno ». Y los británicos lo abrevian todo en **XC**, incluso por escrito en los horarios.",
          it:"Il test di fondo, su ostacoli fissi in terreno naturale. ⚠️ Il tedesco è l'unico a non prendere in prestito nulla: **das Gelände**, « il terreno ». E i britannici abbreviano tutto in **XC**, anche per iscritto sugli orari.",
          de:"Die Ausdauerprüfung über feste Hindernisse im Gelände. ⚠️ Nur das Deutsche entlehnt nichts: das Gelände. Und die Briten kürzen alles zu **XC** — auch schriftlich im Zeitplan.",
          ja:"自然の地形に置かれた固定障害を跳ぶ、持久力の競技。⚠️ 何も借用しないのはドイツ語だけです — **das Gelände**、「地形」。そしてイギリス人はすべてを **XC** と略します。時間割の表記までも。" } },

  { ref:"trot-presentation", lecon:2, coll:"complet",
    mots:{ fr:{m:"le trot de présentation"}, en:{m:"the trot-up", p:"trot-eup", var:"the horse inspection"},
           es:{m:"la inspección veterinaria"}, it:{m:"l'ispezione veterinaria"},
           de:{m:"die Verfassungsprüfung", p:"fèr-fa-soungs-pru-foung"}, ja:{m:"馬体検査", p:"batai kensa"} }, // ??
    def:{ fr:"Le cheval présenté en main devant un jury vétérinaire, tressé et lustré, qui vérifie qu'il est apte à concourir. On le fait avant le concours et, en complet international, encore le matin de l'obstacle.",
          en:"The horse shown in hand to a veterinary panel, plaited and gleaming, to check it is fit to compete.",
          es:"El caballo presentado de la mano ante un jurado veterinario, trenzado y lustrado, que verifica que está apto para competir. Se hace antes del concurso y, en completo internacional, otra vez la mañana del salto.",
          it:"Il cavallo presentato a mano davanti a una giuria veterinaria, intrecciato e lucidato, che verifica che sia idoneo a gareggiare. Si fa prima del concorso e, nel completo internazionale, ancora la mattina del salto.",
          de:"Das Pferd wird an der Hand einer Verfassungsprüfung vorgeführt, eingeflochten und glänzend — sie prüft die Startfähigkeit. Vor dem Turnier, im internationalen Complet noch einmal am Morgen des Springens.",
          ja:"獣医審査団の前で、編み込みと磨き上げを施した馬を引いて見せ、出場に適うかを確かめる検査。大会前に行い、国際総合馬術では障害の日の朝にもう一度行います。" } },

  { ref:"obstacle-fixe", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'obstacle fixe"}, en:{m:"a fixed fence", p:"fikst fènce", var:"solid fence"},
           es:{m:"el obstáculo fijo"}, it:{m:"l'ostacolo fisso"},
           de:{m:"das feste Hindernis", p:"fès-te hin-deur-niss"}, ja:{m:"固定障害", p:"kotei shōgai"} }, // ??
    def:{ fr:"Il ne tombe pas. C'est toute la différence avec l'obstacle de concours hippique, et c'est la raison pour laquelle le gilet de protection et le casque aux normes sont obligatoires au cross, partout.",
          en:"It does not fall. That is the whole difference from show jumping, and why a body protector and a standard-approved hat are compulsory.",
          es:"No cae. Esa es toda la diferencia con el obstáculo de salto, y la razón por la que el chaleco de protección y el casco homologado son obligatorios en el cross, en todas partes.",
          it:"Non cade. È tutta la differenza con l'ostacolo di salto ostacoli, ed è la ragione per cui il gilet di protezione e il casco a norma sono obbligatori in cross, ovunque.",
          de:"Es fällt nicht. Das ist der ganze Unterschied zum Springhindernis — und der Grund, warum Schutzweste und geprüfter Helm im Gelände überall Pflicht sind.",
          ja:"倒れない障害。障害馬術の障害との違いはそこにあり、クロスでプロテクターベストと規格ヘルメットが世界じゅう義務である理由もそこにあります。" } },

  { ref:"option", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'option"}, en:{m:"the long route", p:"long route", var:"the alternative"},
           es:{m:"la opción"}, it:{m:"l'opzione"},
           de:{m:"der Umweg", p:"oum-vék", var:"der Alternativweg"}, ja:{m:"迂回ルート", p:"ukai rūto"} }, /* de precise (rapport 07/08) */
    def:{ fr:"Le chemin plus long et plus sûr, autorisé sur les combinaisons de cross. Prendre l'option coûte des secondes, jamais de pénalités — et un cavalier expérimenté la choisit sans hésiter quand son cheval doute.",
          en:"The longer, safer way through a cross-country combination. It costs seconds, never penalties.",
          es:"El camino más largo y más seguro, autorizado en las combinaciones de cross. Tomar la opción cuesta segundos, jamás penalizaciones — y un jinete experimentado la elige sin dudar cuando su caballo duda.",
          it:"La strada più lunga e più sicura, autorizzata sulle combinazioni di cross. Prendere l'opzione costa secondi, mai penalità — e un cavaliere esperto la sceglie senza esitare quando il suo cavallo dubita.",
          de:"Der längere, sicherere Weg, an Geländekombinationen erlaubt. Die Option kostet Sekunden, nie Strafpunkte — und ein erfahrener Reiter wählt sie ohne Zögern, wenn sein Pferd zweifelt.",
          ja:"クロスの連続障害で認められている、遠回りで安全な経路。選べば失うのは秒数だけで、減点は決してありません — そして経験ある騎手は、馬が迷った瞬間、ためらわずこちらを選びます。" } },

  { ref:"temps-optimum", lecon:2, coll:"complet",
    mots:{ fr:{m:"le temps optimum"}, en:{m:"the optimum time", p:"op-ti-meum taïm"},
           es:{m:"el tiempo óptimo"}, it:{m:"il tempo ottimale"},
           de:{m:"die Idealzeit", p:"i-dé-al-tsaïte"}, ja:{m:"規定タイム", p:"kitei taimu"} }, // ??
    def:{ fr:"Le temps de référence du cross, calculé sur la distance et la vitesse imposée. Au-delà, on prend des pénalités seconde par seconde. Ce n'est donc pas une course : c'est un exercice de régularité, chronomètre au poignet.",
          en:"The reference time for cross-country, from distance and required speed. Beyond it, penalties accrue per second — so it is regularity, not racing.",
          es:"El tiempo de referencia del cross, calculado sobre distancia y velocidad impuesta. Más allá, se toman penalizaciones segundo a segundo. No es pues una carrera: es un ejercicio de regularidad, cronómetro en la muñeca.",
          it:"Il tempo di riferimento del cross, calcolato su distanza e velocità imposta. Oltre, si prendono penalità secondo per secondo. Non è dunque una corsa: è un esercizio di regolarità, cronometro al polso.",
          de:"Die Referenzzeit des Geländes, aus Distanz und vorgegebenem Tempo errechnet. Darüber gibt es Strafpunkte Sekunde für Sekunde. Kein Rennen also — eine Übung in Gleichmaß, mit der Uhr am Handgelenk.",
          ja:"距離と規定速度から計算される、クロスの基準タイム。超えれば一秒ごとに減点。つまり競走ではなく、腕時計を頼りに刻む、一定さの試験なのです。" } },

  /* ================================================================
     QUATRE ENTRÉES POUR BADMINTON — 17/08/2026, demandées par Blandine
     après le départ du talus, du contre-bas et du gué vers Burghley :
     « on va en rajouter à Badminton alors — reprise de dressage
     justement ? parcours d'obstacle ? quel est le barème sur le
     parcours d'obstacle ? protocole de dressage ? », puis
     « classement provisoire à l'issue du dressage ».

     🟥 SA CONSIGNE SUR LES DÉFINITIONS : « une bonne occasion pour
     t'apprendre tout ça à ce moment-là ». Ces définitions n'expliquent
     donc pas seulement les mots, elles enseignent LE SYSTÈME du
     complet — le seul sport où l'on additionne trois épreuves et où
     LE SCORE LE PLUS BAS GAGNE.

     ⚠️ AUCUN CHIFFRE DE BARÈME N'EST DONNÉ. Ils changent selon le
     niveau, la fédération et l'année, et Claude ne les connaît pas avec
     certitude. Consigne de Blandine, après trois fautes de fond sur
     Windsor : « invente surtout pas des trucs ». Les phrases POSENT la
     question du barème ; elles n'y répondent pas.
     ⚠️ NE PAS ajouter de chiffres sans source vérifiée.
     ================================================================ */

  { ref:"reprise-dressage", lecon:2, coll:"complet",
    mots:{ fr:{m:"la reprise de dressage"}, en:{m:"the dressage test", p:"drè-sadj tèst"},
           es:{m:"la prueba de doma"}, it:{m:"la ripresa di dressage"},
           de:{m:"die Dressurprüfung", p:"drè-sour-pru-foung"}, ja:{m:"馬場馬術の課目", p:"bababajutsu no kamoku"} },
    def:{ fr:"La PREMIÈRE des trois épreuves du complet, et celle qui donne le score de départ. 🟥 Elle ne se note pas en points gagnés mais CONVERTIE EN PÉNALITÉS : mieux on la fait, moins on en a. C'est ce qui déroute tout le monde au début — au complet, on cherche le score le plus BAS. ⚠️ « La reprise » ici désigne l'ÉPREUVE ; à Windsor le même mot désigne le protocole, et à Aberystwyth le groupe d'élèves. Trois sens, un mot.",
          en:"The first of the three phases, and the one that sets your starting score. It isn't marked in points won but CONVERTED INTO PENALTIES: the better you go, the fewer you carry. In eventing you want the LOWEST score.",
          es:"La primera de las tres pruebas, y la que fija la puntuación de partida. No se anota en puntos ganados sino CONVERTIDA EN PENALIZACIONES: cuanto mejor, menos se arrastra.",
          it:"La prima delle tre prove, quella che fissa il punteggio di partenza. Non si segna in punti guadagnati ma CONVERTITA IN PENALITÀ: meglio si fa, meno se ne porta.",
          de:"Die erste der drei Teilprüfungen, und die, die den Startwert festlegt. Sie wird nicht in Gewinnpunkten gewertet, sondern IN STRAFPUNKTE UMGERECHNET: je besser, desto weniger.",
          ja:"三つの競技の最初で、出発点の得点を決めます。得点ではなく減点に換算されるため、良く走れば減点が少なくなります。総合馬術では最も低い点が勝ちます。" } },

  { ref:"parcours-obstacle", lecon:2, coll:"complet",
    mots:{ fr:{m:"le parcours d'obstacle"}, en:{m:"the showjumping round", p:"chô-djeum-pinng raound", var:"the showjumping"},
           es:{m:"el recorrido de salto"}, it:{m:"il percorso di salto ostacoli"},
           de:{m:"das Springen", p:"chprin-gueune"}, ja:{m:"障害飛越の走行", p:"shōgai hietsu no sōkō"} },
    def:{ fr:"⚠️ LA DERNIÈRE ÉPREUVE, et c'est voulu : elle se court après le cross, sur un cheval fatigué, et c'est là que les classements se retournent. ⚠️ En anglais on dit **showjumping** en un mot pour la discipline, jamais « obstacle » — et au complet on dit souvent simplement *the jumping*.",
          en:"The last phase, and deliberately so: it's ridden after the cross-country, on a tired horse, and that's where placings turn over. « Showjumping » is one word; in eventing you often just say « the jumping ».",
          es:"La última prueba, y a propósito: se corre después del cross, con un caballo cansado. Ahí se dan la vuelta las clasificaciones.",
          it:"L'ultima prova, e volutamente: si corre dopo il cross, su un cavallo stanco. È lì che le classifiche si ribaltano.",
          de:"Die letzte Teilprüfung, und das mit Absicht: sie kommt nach dem Geländeritt, auf einem müden Pferd. Dort drehen sich die Platzierungen.",
          ja:"最後の競技。これは意図的で、クロスカントリーのあと、疲れた馬で走ります。ここで順位がひっくり返ります。" } },

  { ref:"bareme", lecon:2, coll:"complet",
    mots:{ fr:{m:"le barème"}, en:{m:"the scoring", p:"skô-rinng", var:"the penalty system"},
           es:{m:"el baremo"}, it:{m:"il barème"}, // ?? it
           de:{m:"die Wertung", p:"vèr-toung"}, ja:{m:"減点方式", p:"genten hōshiki"} },
    def:{ fr:"🟥 LE MOT À SAVOIR POSER EN QUESTION, parce que la réponse change selon le niveau, le pays et l'année : « quel barème s'applique ? » est une question légitime même pour un cavalier expérimenté. ⚠️ Ce que le barème du complet a de particulier : les pénalités des trois épreuves S'ADDITIONNENT, et le total le plus bas gagne. Un sans-faute au cross ne fait pas gagner de points — il n'en fait pas perdre, ce qui n'est pas la même chose.",
          en:"The word to know how to ask about, because the answer changes with the level, the country and the year: « what's the scoring? » is a fair question even for an experienced rider. What makes eventing scoring particular: penalties from all three phases ADD UP, and the lowest total wins.",
          es:"La palabra que hay que saber preguntar, porque la respuesta cambia según el nivel, el país y el año. Lo particular del completo: las penalizaciones de las tres pruebas SE SUMAN y gana el total más bajo.",
          it:"La parola da saper chiedere, perché la risposta cambia col livello, il paese e l'anno. La particolarità del completo: le penalità delle tre prove SI SOMMANO e vince il totale più basso.",
          de:"Das Wort, nach dem man fragen können muss, denn die Antwort ändert sich mit Klasse, Land und Jahr. Das Besondere der Vielseitigkeit: die Strafpunkte aller drei Teilprüfungen ADDIEREN SICH, und der niedrigste Gesamtwert gewinnt.",
          ja:"尋ね方を覚えておくべき語です。答えは級、国、年によって変わるからです。総合馬術の特徴は、三つの競技の減点が合算され、合計が最も低い者が勝つことです。" } },

  { ref:"classement-provisoire", lecon:2, coll:"complet",
    mots:{ fr:{m:"le classement provisoire"}, en:{m:"the leaderboard", p:"lii-deur-bord", var:"the interim standings"},
           es:{m:"la clasificación provisional"}, it:{m:"la classifica provvisoria"},
           de:{m:"die Zwischenwertung", p:"tsvi-cheune-vèr-toung"}, ja:{m:"暫定順位", p:"zantei jun'i"} },
    def:{ fr:"🟥 LA NOTION PROPRE AU COMPLET : on est classé alors que deux épreuves restent à courir. Être troisième après le dressage ne veut presque rien dire — le cross rebat tout. ⚠️ EN ANGLAIS ON NE DIT PAS « I am third » MAIS **I'm lying third** — « je suis couché troisième », une tournure qui surprend et qu'on entend partout sur un concours. *The interim standings* est le terme officiel, *the leaderboard* celui qu'on emploie.",
          en:"The notion that belongs to eventing: you're placed while two phases are still to come. Lying third after the dressage means almost nothing — the cross-country changes everything. Note « I'm lying third », not « I am third ».",
          es:"La noción propia del completo: se está clasificado cuando quedan dos pruebas. Ser tercero después de la doma no significa casi nada.",
          it:"La nozione propria del completo: si è classificati quando restano due prove. Essere terzi dopo il dressage non significa quasi niente.",
          de:"Der Begriff, der zur Vielseitigkeit gehört: man ist platziert, während zwei Teilprüfungen noch kommen. Dritter nach der Dressur heißt fast nichts.",
          ja:"総合馬術ならではの考え方。まだ二つの競技を残した段階での順位です。馬場馬術のあとで三位でも、ほとんど意味がありません。クロスカントリーがすべてを塗り替えます。" } },

  /* ================================================================
     TROIS ENTRÉES DE PLUS POUR BADMINTON — 17/08/2026, tirées de la
     liste de vocabulaire-clé de Blandine (hindquarters, marker, steady
     rhythm, hilly ground, make up time, drop into water, ditch, direct
     route, line, warm-up, clear round, keep the poles up, final
     standings).
     ⚠️ DIX DE CES TREIZE MOTS EXISTAIENT DÉJÀ et s'emploient en
     `motsAilleurs` — c'est voulu, et c'est ce qui fait la révision :
     `engagement` (Versailles, créé le même jour) · `lettre` (Windsor) ·
     `cadence` (Versailles) · `fossé` et `voie-directe` et `ligne`
     (Burghley) · `detente` (Aberystwyth) · `sans-faute` (Wellington) ·
     `classement-provisoire` (ici, créé le même jour).
     ⚠️ NE PAS les redupliquer ici.
     ================================================================ */

  { ref:"terrain-vallonne", lecon:2, coll:"complet",
    mots:{ fr:{m:"le terrain vallonné"}, en:{m:"hilly ground", p:"hi-li graound"},
           es:{m:"el terreno ondulado"}, it:{m:"il terreno mosso"},
           de:{m:"das hügelige Gelände", p:"hu-gue-li-gue gue-lèn-de"}, ja:{m:"起伏のある地形", p:"kifuku no aru chikei"} },
    def:{ fr:"⚠️ CE QUI ÉPUISE UN CHEVAL SUR UN CROSS, bien plus que la hauteur des obstacles. Badminton et Burghley sont des parcs anglais tout en montées et descentes : on économise son cheval au début, on récupère du temps sur le plat. ⚠️ En anglais on dit **hilly ground**, et « the going » pour l'état du sol — deux notions différentes qu'un seul mot français recouvre.",
          en:"What tires a horse on a cross-country course, far more than the height of the fences. Badminton and Burghley are English parks all up and down: you save your horse early and make up time on the flat. Note « hilly ground » for the shape and « the going » for the state of the surface.",
          es:"Lo que agota a un caballo en un cross, mucho más que la altura de los obstáculos. Se economiza el caballo al principio y se recupera tiempo en lo llano.",
          it:"Ciò che sfinisce un cavallo in un cross, molto più dell'altezza degli ostacoli. Si risparmia il cavallo all'inizio e si recupera tempo in piano.",
          de:"Was ein Pferd im Gelände erschöpft, viel mehr als die Höhe der Sprünge. Man schont das Pferd am Anfang und holt die Zeit im Flachen.",
          ja:"クロスカントリーで馬を最も疲れさせるのは、障害の高さではなく起伏です。序盤は馬を節約し、平坦な区間で時間を取り戻します。" } },

  { ref:"rattraper-temps", lecon:2, coll:"complet",
    mots:{ fr:{m:"rattraper du temps"}, en:{m:"to make up time", p:"méïk eup taïm"},
           es:{m:"recuperar tiempo"}, it:{m:"recuperare tempo"},
           de:{m:"Zeit aufholen", p:"tsaïte aouf-hô-leune"}, ja:{m:"時間を取り戻す", p:"jikan o torimodosu"} },
    def:{ fr:"⚠️ On ne rattrape PAS du temps en allant plus vite entre deux obstacles difficiles : on le rattrape sur les longues lignes droites et en ne perdant rien dans les tournants. La formule anglaise **to make up time** s'entend sur tous les crossses du monde, et son contraire est *to be behind the clock*.",
          en:"You don't make up time by going faster between two difficult fences: you make it up on the long straight stretches and by losing nothing in the turns. The opposite is « to be behind the clock ».",
          es:"No se recupera tiempo yendo más rápido entre dos obstáculos difíciles: se recupera en las rectas largas y no perdiendo nada en los giros.",
          it:"Non si recupera tempo andando più veloci tra due ostacoli difficili: si recupera sui lunghi rettilinei e non perdendo niente nelle curve.",
          de:"Zeit holt man nicht auf, indem man zwischen zwei schweren Sprüngen schneller wird, sondern auf den langen Geraden und indem man in den Wendungen nichts verliert.",
          ja:"難しい障害の間で速く走っても時間は取り戻せません。長い直線と、曲がりで一切失わないことで取り戻します。" } },

  { ref:"garder-les-barres", lecon:2, coll:"complet",
    mots:{ fr:{m:"garder les barres"}, en:{m:"to keep the poles up", p:"kiipe ze pôlz eup"},
           es:{m:"no tirar las barras"}, it:{m:"non far cadere le barriere"},
           de:{m:"die Stangen oben halten", p:"chtan-gueune"}, ja:{m:"バーを落とさない", p:"bā o otosanai"} },
    def:{ fr:"🟥 L'ENJEU DU TROISIÈME JOUR, et la formule exacte des coachs : **keep the poles up**. Le parcours d'obstacle d'un complet se court sur un cheval qui a couru le cross la veille — il est fatigué, ses barres tombent plus facilement, et un sans-faute peut retourner tout le classement. ⚠️ Ce n'est pas la même équitation qu'un concours de saut : on ne cherche pas la vitesse, on cherche à ne rien faire tomber.",
          en:"The whole point of the third day, and the coaches' exact phrase. The showjumping of a three-day event is ridden on a horse who ran cross-country the day before — he's tired, poles come down more easily, and a clear round can turn the whole leaderboard over.",
          es:"Lo que se juega el tercer día. El recorrido de salto de un completo se corre sobre un caballo que hizo el cross el día antes: está cansado y las barras caen más fácilmente.",
          it:"La posta in gioco del terzo giorno. Il percorso di salto di un completo si corre su un cavallo che ha fatto il cross il giorno prima: è stanco e le barriere cadono più facilmente.",
          de:"Worum es am dritten Tag geht. Das Springen einer Vielseitigkeit reitet man auf einem Pferd, das am Tag davor das Gelände gelaufen ist — es ist müde, die Stangen fallen leichter.",
          ja:"三日目の勝負どころ。総合馬術の障害飛越は、前日にクロスカントリーを走った馬で行います。疲れているためバーが落ちやすく、クリアラウンドが順位をひっくり返します。" } },

  { ref:"carton-jaune", lecon:2, coll:"complet",
    mots:{ fr:{m:"le carton jaune"}, en:{m:"the yellow warning card", p:"yè-lô ouor-ning karde"},
           es:{m:"la tarjeta amarilla"}, it:{m:"il cartellino giallo"},
           de:{m:"die gelbe Karte", p:"guèl-be kar-te"}, ja:{m:"イエローカード", p:"ierō kādo"} },
    def:{ fr:"Il existe vraiment en équitation, et pas seulement au football : le jury le donne pour équitation dangereuse ou mauvais traitement d'un cheval. Deux cartons en un an et le cavalier est suspendu.",
          en:"It really exists in equestrian sport: the ground jury gives it for dangerous riding or abuse of a horse. Two in a year means suspension.",
          es:"Existe de verdad en equitación, y no solo en fútbol: el jurado lo da por equitación peligrosa o maltrato de un caballo. Dos tarjetas en un año y el jinete queda suspendido.",
          it:"Esiste davvero in equitazione, e non solo nel calcio: la giuria la dà per equitazione pericolosa o maltrattamento di un cavallo. Due cartellini in un anno e il cavaliere è sospeso.",
          de:"Sie existiert wirklich im Reitsport, nicht nur im Fußball: Die Jury zeigt sie für gefährliches Reiten oder schlechte Behandlung eines Pferdes. Zwei Karten in einem Jahr — der Reiter ist gesperrt.",
          ja:"馬術にも本当に存在します。サッカーだけではありません。危険騎乗や馬の虐待に対して審判団が出します。一年に二枚で、騎手は出場停止です。" } },

  { ref:"niveau", lecon:2, coll:"complet",
    mots:{ fr:{m:"le niveau"}, en:{m:"the level", p:"lè-veul", var:"BE90 · Novice · Intermediate (GB)"},
           es:{m:"el nivel"}, it:{m:"il livello"},
           de:{m:"die Klasse", p:"kla-se"}, ja:{m:"レベル", p:"reberu"} },
    def:{ fr:"⚠️ Le vrai casse-tête du cavalier voyageur : les niveaux ne se traduisent pas. La France classe en Club / Amateur / Pro, la Grande-Bretagne en BE90, BE100, Novice, Intermediate, Advanced — où **Novice n'est pas un niveau de débutant** mais déjà 1,10 m. L'Allemagne numérote de E à S. Il faut convertir en hauteur, jamais en mot.",
          en:"Levels do not translate. Britain's « Novice » is not a beginner level but already 1.10 m. Always convert into height, never into words.",
          es:"⚠️ El verdadero rompecabezas del jinete viajero: los niveles no se traducen. Francia clasifica en Club / Amateur / Pro, Gran Bretaña en BE90, BE100, Novice, Intermediate, Advanced — donde **Novice no es un nivel de principiante** sino ya 1,10 m. Alemania numera de E a S. Hay que convertir en altura, jamás en palabra.",
          it:"⚠️ Il vero rompicapo del cavaliere viaggiatore: i livelli non si traducono. La Francia classifica in Club / Amateur / Pro, la Gran Bretagna in BE90, BE100, Novice, Intermediate, Advanced — dove **Novice non è un livello da principiante** ma già 1,10 m. La Germania numera da E a S. Bisogna convertire in altezza, mai in parola.",
          de:"⚠️ Das wahre Kopfzerbrechen des reisenden Reiters: Niveaus lassen sich nicht übersetzen. Frankreich stuft in Club / Amateur / Pro, Großbritannien in BE90, BE100, Novice, Intermediate, Advanced — wobei **Novice kein Anfängerniveau** ist, sondern schon 1,10 m. Deutschland zählt von E bis S. Immer in Höhe umrechnen, nie in Wörter.",
          ja:"⚠️ 旅する騎手の本当の難問：レベルは翻訳できません。フランスは Club / Amateur / Pro、イギリスは BE90、BE100、Novice、Intermediate、Advanced — しかも **Novice は初心者レベルではなく**、もう1.1mの世界。ドイツはEからSまでの等級制。換算するなら高さで。言葉では決して。" } },

  /* ============ LEÇON 3 · LE JOUR J ============ */

  { ref:"van", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le van"}, en:{m:"the trailer", p:"tré-leur", var:"horsebox = le camion (GB)"},
           es:{m:"el remolque", var:"el camión"}, it:{m:"il van", var:"il camion"},
           de:{m:"der Pferdeanhänger", p:"pfèr-de-an-hèn-gueur"}, ja:{m:"馬運車", p:"bāunsha"} }, // ??
    def:{ fr:"⚠️ Faux ami à double fond : le mot français « van » vient de l'anglais *caravan*, mais l'anglais dit **trailer** pour le van attelé et **horsebox** pour le camion. Un Américain, lui, dit *trailer* pour les deux.",
          en:"French « van » comes from caravan, but English says trailer for the towed one and horsebox for the lorry.",
          es:"⚠️ Falso amigo de doble fondo: la palabra francesa « van » viene del inglés *caravan*, pero el inglés dice **trailer** para el remolque y **horsebox** para el camión. Un americano dice *trailer* para los dos.",
          it:"⚠️ Falso amico a doppio fondo: la parola francese « van » viene dall'inglese *caravan*, ma l'inglese dice **trailer** per il rimorchio e **horsebox** per il camion. Un americano dice *trailer* per entrambi.",
          de:"⚠️ Falscher Freund mit doppeltem Boden: Das französische « van » kommt vom englischen *caravan* — aber Englisch sagt **trailer** für den Anhänger und **horsebox** für den LKW. Ein Amerikaner sagt für beides *trailer*.",
          ja:"⚠️ 二重底の偽りの友：フランス語の « van » は英語の *caravan* 由来なのに、当の英語は牽引式を **trailer**、トラック型を **horsebox** と言います。アメリカ人はどちらも *trailer* です。" } },

  { ref:"embarquer", lecon:3, coll:"jour-j", v:true,
    mots:{ fr:{m:"embarquer"}, en:{m:"to load", p:"lôde", var:"to box up"},
           es:{m:"embarcar", var:"cargar"}, it:{m:"caricare"},
           de:{m:"verladen", p:"fèr-la-deune"}, ja:{m:"積み込む", p:"tsumikomu"} }, // ??
    def:{ fr:"Faire monter le cheval dans le van. Le premier obstacle de la journée, et parfois le plus difficile : un cheval qui refuse d'embarquer fait manquer l'épreuve avant même d'être sellé.",
          en:"Getting the horse in. The first obstacle of the day, and sometimes the hardest one.",
          es:"Hacer subir al caballo al remolque. El primer obstáculo del día, y a veces el más difícil: un caballo que se niega a embarcar hace perder la prueba antes incluso de ensillar.",
          it:"Far salire il cavallo nel van. Il primo ostacolo della giornata, e a volte il più difficile: un cavallo che rifiuta di salire fa mancare la prova prima ancora di sellare.",
          de:"Das Pferd in den Hänger verladen. Das erste Hindernis des Tages — und manchmal das schwerste: Ein Pferd, das nicht verlädt, lässt die Prüfung platzen, bevor gesattelt ist.",
          ja:"馬をトレーラーに乗せること。その日最初の障害物であり、ときに最難関です。積み込みを拒む馬は、鞍を置く前から競技を台無しにしてしまいます。" } },

  { ref:"tableau", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le tableau d'affichage"}, en:{m:"the noticeboard", p:"nô-tiss-bord", var:"the board"},
           es:{m:"el tablón de anuncios"}, it:{m:"la bacheca"},
           de:{m:"die Anschlagtafel", p:"an-chlak-ta-feul"}, ja:{m:"掲示板", p:"keijiban"} }, // ??
    def:{ fr:"Horaires, changements d'ordre, résultats, éliminations : tout est là, et rien n'est annoncé deux fois. Le réflexe qui sauve une journée de concours à l'étranger, c'est d'aller le lire toutes les heures.",
          en:"Times, order changes, results, eliminations: it is all there and nothing is announced twice. Read it every hour.",
          es:"Horarios, cambios de orden, resultados, eliminaciones: todo está ahí, y nada se anuncia dos veces. El reflejo que salva una jornada de concurso en el extranjero es ir a leerlo cada hora.",
          it:"Orari, cambi d'ordine, risultati, eliminazioni: tutto è lì, e niente viene annunciato due volte. Il riflesso che salva una giornata di concorso all'estero è andare a leggerlo ogni ora.",
          de:"Zeiten, Reihenfolgeänderungen, Ergebnisse, Ausschlüsse: Alles steht dort, und nichts wird zweimal durchgesagt. Der Reflex, der einen Auslandsturniertag rettet: jede Stunde nachlesen.",
          ja:"時間割、順番の変更、結果、失権 — すべてがここに貼り出され、二度は放送されません。海外での競技会の一日を救う習慣はひとつ：一時間ごとに見に行くことです。" } },

  { ref:"speaker", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la sonorisation"}, en:{m:"the tannoy", p:"ta-noï", var:"the announcer · the PA"},
           es:{m:"el locutor", var:"los altavoces"}, it:{m:"lo speaker"},
           de:{m:"der Sprecher", p:"chprè-cheur"}, ja:{m:"アナウンス", p:"anaunsu"} },
    def:{ fr:"⚠️ Mot britannique impossible à deviner : **the tannoy**, du nom d'un fabricant de haut-parleurs, désigne toute la sonorisation d'un concours. « It came over the tannoy » veut dire « ça a été annoncé ».",
          en:"An unguessable British word: the tannoy, from a loudspeaker brand, means the whole PA system.",
          es:"⚠️ Palabra británica imposible de adivinar: **the tannoy**, del nombre de un fabricante de altavoces, designa toda la megafonía de un concurso. « It came over the tannoy » significa « lo anunciaron ».",
          it:"⚠️ Parola britannica impossibile da indovinare: **the tannoy**, dal nome di un fabbricante di altoparlanti, indica tutta la sonorizzazione di un concorso. « It came over the tannoy » vuol dire « è stato annunciato ».",
          de:"⚠️ Britisches Wort, auf das niemand kommt: **the tannoy** — nach einem Lautsprecherhersteller — meint die ganze Turnierbeschallung. « It came over the tannoy » heißt « Es wurde durchgesagt ».",
          ja:"⚠️ 見当のつけようがないイギリス英語：**the tannoy**。スピーカーメーカーの名前がそのまま、競技会の場内放送全体を指す言葉になりました。« It came over the tannoy » は「放送で流れた」の意味です。" } },

  { ref:"appel", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"l'appel"}, en:{m:"the call", p:"kôl", var:"you're next · you're on"},
           es:{m:"la llamada"}, it:{m:"la chiamata"},
           de:{m:"der Aufruf", p:"aouf-rouf"}, ja:{m:"呼び出し", p:"yobidashi"} },
    def:{ fr:"Le moment où le commissaire t'appelle pour entrer en piste. Les deux phrases à reconnaître d'urgence en anglais : **« you're next »** et **« you're on »** — la seconde veut dire maintenant.",
          en:"When the steward calls you in. Two phrases to recognise instantly: « you're next » and « you're on » — the second means now.",
          es:"El momento en que el comisario te llama a pista. Las dos frases a reconocer con urgencia en inglés: **« you're next »** y **« you're on »** — la segunda significa ahora mismo.",
          it:"Il momento in cui il commissario ti chiama in campo. Le due frasi da riconoscere d'urgenza in inglese: **« you're next »** e **« you're on »** — la seconda vuol dire adesso.",
          de:"Der Moment, in dem der Steward dich in die Bahn ruft. Zwei Sätze sofort erkennen: **« you're next »** und **« you're on »** — der zweite heißt JETZT.",
          ja:"係員が入場を告げる瞬間。英語で即座に聞き取るべきふたつのフレーズ — **« you're next »** と **« you're on »**。後者は「今すぐ」という意味です。" } },

  { ref:"resultat", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le résultat"}, en:{m:"the result", p:"ri-zeult", var:"the scores"},
           es:{m:"el resultado"}, it:{m:"il risultato"},
           de:{m:"das Ergebnis", p:"èr-guép-niss"}, ja:{m:"結果", p:"kekka"} },
    def:{ fr:"Affiché au tableau, rarement annoncé. En complet, il s'exprime en points de pénalité cumulés sur les trois tests, et le meilleur score est le plus bas — l'inverse du dressage seul.",
          en:"Posted on the board, rarely announced. In eventing it is cumulative penalties across three tests, and the lowest score wins.",
          es:"Expuesto en el tablón, rara vez anunciado. En completo se expresa en puntos de penalización acumulados en los tres tests, y el mejor score es el más bajo — lo contrario de la doma sola.",
          it:"Affisso al tabellone, raramente annunciato. Nel completo si esprime in punti di penalità cumulati sui tre test, e il punteggio migliore è il più basso — l'inverso del dressage da solo.",
          de:"Am Brett ausgehängt, selten durchgesagt. In der Vielseitigkeit zählt die Summe der Strafpunkte aus drei Teilprüfungen — der beste Wert ist der niedrigste, umgekehrt zur reinen Dressur.",
          ja:"掲示板に貼られ、放送されることはまれです。総合馬術では三競技の減点の合計で表され、最も少ない者が勝ち — 馬場単独とは逆です。" } },

  { ref:"remise-prix", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la remise des prix"}, en:{m:"the prize-giving", p:"praïz-gui-ving"},
           es:{m:"la entrega de premios"}, it:{m:"la premiazione"},
           de:{m:"die Siegerehrung", p:"zi-gueur-é-roung"}, ja:{m:"表彰式", p:"hyōshōshiki"} },
    def:{ fr:"À cheval le plus souvent, cocarde au frontal. Y aller compte : un classé absent fait attendre tout le monde, et c'est très mal vu partout.",
          en:"Usually mounted, rosette on the browband. Turning up matters: a missing placed rider keeps everyone waiting.",
          es:"A caballo la mayoría de las veces, escarapela en la frontalera. Ir cuenta: un clasificado ausente hace esperar a todos, y está muy mal visto en todas partes.",
          it:"A cavallo il più delle volte, coccarda al frontale. Andarci conta: un classificato assente fa aspettare tutti, ed è vistissimo male ovunque.",
          de:"Meist zu Pferd, Schleife am Stirnband. Hinzugehen zählt: Ein fehlender Platzierter lässt alle warten — und das ist überall äußerst schlecht angesehen.",
          ja:"たいていは騎乗のまま、額革にロゼットをつけて行います。出席すること自体が大事 — 入賞者が来なければ全員が待たされ、どこの国でも極めて印象が悪いのです。" } },

  { ref:"groom", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le groom"}, en:{m:"the groom", p:"groum"},
           es:{m:"el mozo de cuadra"}, it:{m:"il groom"},
           de:{m:"der Pfleger", p:"pflé-gueur"}, ja:{m:"厩務員", p:"kyūmuin"} },
    def:{ fr:"⚠️ Piège grammatical parfait : en anglais, **groom** est la *personne* qui s'occupe du cheval, alors que *to groom* est le geste de panser (chapitre 2). « My groom is holding him » ne veut pas dire qu'on le brosse.",
          en:"A perfect trap: « groom » is the person, while « to groom » is the act of brushing. « My groom is holding him » is not about brushing.",
          es:"⚠️ Trampa gramatical perfecta: en inglés, **groom** es la *persona* que cuida del caballo, mientras que *to groom* es el gesto de limpiar (capítulo 2). « My groom is holding him » no significa que lo estén cepillando.",
          it:"⚠️ Trappola grammaticale perfetta: in inglese **groom** è la *persona* che si occupa del cavallo, mentre *to groom* è il gesto di pulire (capitolo 2). « My groom is holding him » non vuol dire che lo stanno spazzolando.",
          de:"⚠️ Die perfekte Grammatikfalle: **groom** ist die *Person*, die das Pferd versorgt — *to groom* ist das Putzen (Kapitel 2). « My groom is holding him » heißt nicht, dass gebürstet wird.",
          ja:"⚠️ 完璧な文法の罠：英語の **groom** は馬の世話をする*人*のこと。動詞 *to groom* は手入れの動作です（第2章）。« My groom is holding him » は、ブラシをかけているという意味ではありません。" } },

  { ref:"trac", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le trac"}, en:{m:"the nerves", p:"neurvz", var:"butterflies"},
           es:{m:"los nervios"}, it:{m:"il nervosismo"},
           de:{m:"das Lampenfieber", p:"lam-peune-fi-beur"}, ja:{m:"緊張", p:"kinchō"} },
    def:{ fr:"Chaque langue a choisi son image : l'anglais a des papillons dans le ventre (*butterflies*), l'allemand « la fièvre des lampes » — celle du théâtre. Et un cheval sent le trac de son cavalier avant que lui-même l'admette.",
          en:"Each language picked an image: English has butterflies, German « lamp fever » from the theatre. And a horse feels it before the rider admits it.",
          es:"Cada lengua eligió su imagen: el inglés tiene mariposas en el estómago (*butterflies*), el alemán « la fiebre de las candilejas » — la del teatro. Y un caballo siente el nerviosismo de su jinete antes de que él mismo lo admita.",
          it:"Ogni lingua ha scelto la sua immagine: l'inglese ha farfalle nello stomaco (*butterflies*), il tedesco « la febbre delle luci » — quella del teatro. E un cavallo sente l'ansia del suo cavaliere prima che lui stesso l'ammetta.",
          de:"Jede Sprache wählte ihr Bild: Das Englische hat Schmetterlinge im Bauch (*butterflies*), das Deutsche das Lampenfieber — das des Theaters. Und ein Pferd spürt die Nervosität seines Reiters, bevor der sie sich eingesteht.",
          ja:"言語ごとにイメージが違います。英語はお腹の中の蝶（*butterflies*）、ドイツ語は「ランプの熱」— 舞台のあがり症です。そして馬は、騎手本人が認めるより先に、その緊張を感じ取っています。" } },

  /* ================================================================
     LA COUPE DES NATIONS — dix entrées ajoutées le 17/08/2026, avec le
     lexique fourni par Blandine pour ROME.
     🟥 LA LEÇON 4 NE PARLAIT QUE DU CONCURRENT INDIVIDUEL : concurrent,
     propriétaire, entraîneur, jury, réclamation, règlement, minima,
     championnat, trophée, esprit sportif. AUCUN mot d'équipe, alors que
     Rome EST la Coupe des Nations. Le chapitre était à côté de son
     sujet.

     🟥 SA FORMULE, à garder telle quelle pour la première mini-leçon :
     **4 riders → 3 scores count → 2 rounds → 1 nation wins**
     Quatre cavaliers, trois scores comptent, deux manches, une nation
     gagne. Tout le système en une ligne. ⚠️ NE PAS la reformuler.

     ⚠️ ET LE MOT LE PLUS ÉTRANGE DU LEXIQUE : **le chef d'équipe** se
     dit « chef d'équipe » EN ANGLAIS AUSSI — les Britanniques ont gardé
     le français, comme pour « travers » et « appuyer ». On dit aussi
     *team manager*, mais sur un concours international c'est « the chef »
     tout court qu'on entend.
     ================================================================ */

  { ref:"coupe-nations", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la Coupe des Nations"}, en:{m:"the Nations Cup", p:"néï-cheunz keup"},
           es:{m:"la Copa de las Naciones"}, it:{m:"la Coppa delle Nazioni"},
           de:{m:"der Nationenpreis", p:"na-tsio-neune-praïss"}, ja:{m:"ネーションズカップ", p:"nēshonzu kappu"} },
    def:{ fr:"🟥 QUATRE CAVALIERS, TROIS SCORES COMPTENT, DEUX MANCHES, UNE NATION GAGNE. C'est la seule épreuve d'équipe du saut d'obstacles, et elle change tout : on ne monte plus pour soi. Le plus mauvais score des quatre est écarté — ce qui veut dire qu'un cavalier peut sauver son équipe, et qu'un autre peut la porter. ⚠️ L'allemand dit *Nationenpreis*, « le prix des nations ».",
          en:"Four riders, three scores count, two rounds, one nation wins. It's the only team competition in showjumping, and it changes everything: you're no longer riding for yourself. The worst of the four scores is dropped.",
          es:"Cuatro jinetes, tres resultados cuentan, dos mangas, gana una nación. Es la única prueba por equipos del salto, y lo cambia todo: ya no se monta para uno mismo.",
          it:"Quattro cavalieri, tre punteggi contano, due manche, vince una nazione. È l'unica prova a squadre del salto ostacoli, e cambia tutto: non si monta più per sé.",
          de:"Vier Reiter, drei Ergebnisse zählen, zwei Umläufe, eine Nation gewinnt. Der einzige Teamwettbewerb im Springen — und er ändert alles: man reitet nicht mehr für sich.",
          ja:"四人の騎手、上位三つの成績が有効、二回の走行、勝つのは一つの国。障害馬術で唯一の団体戦であり、すべてが変わります。もはや自分のために乗るのではありません。四人のうち最も悪い成績は除外されます。" } },

  { ref:"equipe-nationale", lecon:4, coll:"equipe",
    mots:{ fr:{m:"l'équipe nationale"}, en:{m:"the national team", p:"na-cheu-neul tiime"},
           es:{m:"el equipo nacional"}, it:{m:"la squadra nazionale"},
           de:{m:"die Nationalmannschaft", p:"na-tsio-nal-mann-chaft"}, ja:{m:"代表チーム", p:"daihyō chīmu"} },
    def:{ fr:"Quatre couples cavalier-cheval, une veste aux couleurs du pays, et un ordre de passage décidé par le chef d'équipe. ⚠️ On ne choisit pas sa place : le premier à partir n'a pas le même travail que le dernier — voir `ordre-depart`.",
          en:"Four horse-and-rider combinations, a jacket in the national colours, and a running order decided by the chef d'équipe. You don't choose your slot: going first is not the same job as going last.",
          es:"Cuatro combinaciones jinete-caballo, una chaqueta con los colores del país y un orden de salida decidido por el jefe de equipo.",
          it:"Quattro binomi cavaliere-cavallo, una giacca coi colori del paese e un ordine di partenza deciso dal capo equipe.",
          de:"Vier Reiter-Pferd-Paare, ein Jackett in den Landesfarben und eine Startfolge, die der Chef d'équipe festlegt.",
          ja:"四つの人馬コンビ、国の色のジャケット、そして監督が決める出場順。順番は選べません。一番目と最後では役割が違います。" } },

  { ref:"chef-equipe", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le chef d'équipe"}, en:{m:"the chef d'équipe", p:"chèf dé-kipe", var:"the team manager"},
           es:{m:"el jefe de equipo"}, it:{m:"il capo equipe"},
           de:{m:"der Equipechef", p:"é-kipe-chèf"}, ja:{m:"監督", p:"kantoku"} },
    def:{ fr:"🟥 L'ANGLAIS A GARDÉ LE FRANÇAIS : on dit **the chef d'équipe**, ou simplement « the chef » sur un concours international. Comme « travers » et « appuyer » en dressage, c'est un mot que l'équitation a exporté. ⚠️ C'est lui qui décide de l'ordre de passage, de la stratégie entre les deux manches, et qui désigne le cavalier du barrage.",
          en:"English kept the French: « the chef d'équipe », or just « the chef ». Like « travers » and « appuyer » in dressage, riding exported this word. He decides the running order, the strategy between rounds, and who jumps off.",
          es:"El inglés conservó el francés: « the chef d'équipe ». Él decide el orden de salida, la estrategia entre mangas y quién salta el desempate.",
          it:"L'inglese ha conservato il francese: « the chef d'équipe ». Decide l'ordine di partenza, la strategia tra le manche e chi va al barrage.",
          de:"Englisch hat das Französische behalten: « the chef d'équipe ». Er bestimmt die Startfolge, die Strategie zwischen den Umläufen und den Reiter fürs Stechen.",
          ja:"英語もフランス語をそのまま使い、the chef d'équipe と言います。馬場馬術の travers や appuyer と同じく、馬術が輸出した言葉です。出場順、二回目の戦略、そしてジャンプオフに出る騎手を決めます。" } },

  { ref:"coequipier", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le coéquipier"}, en:{m:"the teammate", p:"tiime-méïte"},
           es:{m:"el compañero de equipo"}, it:{m:"il compagno di squadra"},
           de:{m:"der Teamkollege", p:"tiime-ko-lé-gue"}, ja:{m:"チームメイト", p:"chīmumeito"} },
    def:{ fr:"⚠️ UN MOT QUI N'EXISTE PRESQUE PAS AILLEURS EN ÉQUITATION. Le reste de l'année on est concurrent de tout le monde ; en Coupe des Nations, trois personnes ont besoin qu'on réussisse. C'est ce qui rend l'épreuve si particulière — et si dure.",
          en:"A word that barely exists elsewhere in riding. The rest of the year everyone is your rival; in a Nations Cup, three people need you to go well. That's what makes it so particular, and so hard.",
          es:"Una palabra que casi no existe en el resto de la equitación. El resto del año todos son rivales; en la Copa de las Naciones, tres personas necesitan que salga bien.",
          it:"Una parola che quasi non esiste altrove nell'equitazione. Il resto dell'anno tutti sono rivali; in Coppa delle Nazioni, tre persone hanno bisogno che tu vada bene.",
          de:"Ein Wort, das es im Reitsport sonst kaum gibt. Das ganze Jahr sind alle Konkurrenten; im Nationenpreis brauchen drei Menschen, dass du gut gehst.",
          ja:"馬術ではほとんど使われない言葉です。普段は誰もが競争相手ですが、ネーションズカップでは三人があなたの成功を必要としています。それがこの競技の特別さであり、厳しさです。" } },

  { ref:"couple", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le couple cavalier-cheval"}, en:{m:"the horse-and-rider combination", p:"kom-bi-néï-cheune"},
           es:{m:"la combinación jinete-caballo"}, it:{m:"il binomio cavaliere-cavallo"},
           de:{m:"das Reiter-Pferd-Paar", p:"raï-teur-pfèrt-pare"}, ja:{m:"人馬のコンビ", p:"jinba no konbi"} },
    def:{ fr:"⚠️ EN ANGLAIS ON DIT **a combination**, mot à mot « une combinaison » — le même mot qu'une combinaison d'obstacles, ce qui prête à confusion. L'italien a le plus beau terme : *un binomio*, « un binôme ». Ce qui compte, c'est que le classement note le couple, jamais le cavalier seul.",
          en:"English says « a combination » — the same word as a combination of fences, which can confuse. Italian has the finest term: un binomio. What matters is that the score belongs to the pair, never the rider alone.",
          es:"En inglés se dice « a combination », la misma palabra que una combinación de obstáculos. El italiano tiene el término más bello: un binomio.",
          it:"In inglese si dice « a combination », la stessa parola di una combinazione di ostacoli. L'italiano ha il termine più bello: un binomio.",
          de:"Englisch sagt « a combination » — dasselbe Wort wie eine Hindernis-Kombination, was verwirren kann. Italienisch hat den schönsten Ausdruck: un binomio.",
          ja:"英語では a combination と言い、障害の組み合わせと同じ語なので混乱しやすいです。イタリア語の un binomio（二人組）が最も美しい表現です。順位は騎手個人ではなく、常に人馬のコンビに与えられます。" } },

  { ref:"premiere-manche", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la première manche"}, en:{m:"the first round", p:"feurst raound"},
           es:{m:"la primera manga"}, it:{m:"la prima manche"},
           de:{m:"der erste Umlauf", p:"èrs-te oum-laouf"}, ja:{m:"第一回走行", p:"daiichi-kai sōkō"} },
    def:{ fr:"Les quatre cavaliers passent une première fois, dans l'ordre décidé par le chef d'équipe. ⚠️ Le premier à partir a un rôle particulier : il donne un « parcours de référence » — les autres sauront ce que vaut le tracé. En anglais on dit *a good opening round*.",
          en:"All four go once, in the order the chef d'équipe decides. The first to go has a particular job: a good opening round tells the others what the course is worth.",
          es:"Los cuatro pasan una primera vez, en el orden decidido por el jefe de equipo. El primero da un recorrido de referencia.",
          it:"I quattro passano una prima volta, nell'ordine deciso dal capo equipe. Il primo dà un percorso di riferimento.",
          de:"Alle vier gehen einmal, in der Reihenfolge, die der Chef d'équipe festlegt. Der Erste hat eine besondere Aufgabe: er zeigt, was der Parcours wert ist.",
          ja:"四人が監督の決めた順で一度ずつ走ります。一番目には特別な役割があります。基準となる走行を見せ、他の三人にコースの難易度を伝えるのです。" } },

  { ref:"deuxieme-manche", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la deuxième manche"}, en:{m:"the second round", p:"sè-keunde raound"},
           es:{m:"la segunda manga"}, it:{m:"la seconda manche"},
           de:{m:"der zweite Umlauf", p:"tsvaï-te oum-laouf"}, ja:{m:"第二回走行", p:"daini-kai sōkō"} },
    def:{ fr:"🟥 SEULES LES MEILLEURES ÉQUIPES Y REVIENNENT, et **dans l'ordre inverse du classement** : la nation en tête passe en dernier. C'est ce qui rend la fin insoutenable — on sait exactement ce qu'il faut faire, et tout le monde le sait aussi. ⚠️ Le nombre d'équipes qualifiées varie selon l'épreuve : ne pas l'inventer, le demander.",
          en:"Only the best teams come back, and in reverse order of the standings: the leading nation goes last. That's what makes the end unbearable — you know exactly what you have to do, and so does everyone else.",
          es:"Solo vuelven los mejores equipos, y en orden inverso a la clasificación: la nación líder pasa última.",
          it:"Solo le squadre migliori tornano, e in ordine inverso alla classifica: la nazione in testa passa per ultima.",
          de:"Nur die besten Teams kommen zurück, und in umgekehrter Reihenfolge der Wertung: die führende Nation reitet zuletzt.",
          ja:"上位のチームだけが戻り、順位の逆順で走ります。首位の国が最後です。だから終盤は耐えがたい。何をすべきか正確にわかっていて、周りもみな知っているからです。" } },

  { ref:"score-ecarte", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le score écarté"}, en:{m:"the drop score", p:"drop skor"},
           es:{m:"el resultado descartado"}, it:{m:"il punteggio scartato"},
           de:{m:"das Streichergebnis", p:"chtraï-che-èr-guèb-niss"}, ja:{m:"除外される成績", p:"jogai sareru seiseki"} },
    def:{ fr:"🟥 LE MÉCANISME QUI FAIT TOUT LE SEL DE L'ÉPREUVE. Sur quatre scores, le plus mauvais est écarté : trois seulement comptent. Un cavalier peut donc rater complètement son parcours sans faire perdre son équipe — une fois. La deuxième erreur coûte la victoire. ⚠️ C'est ce qui explique les stratégies : « ne prends pas de risques, le temps n'est pas notre priorité ».",
          en:"The mechanism that makes the whole thing. Of four scores the worst is dropped: only three count. A rider can have a disaster without costing the team — once. The second mistake costs the win.",
          es:"El mecanismo que da todo su sabor a la prueba. De cuatro resultados se descarta el peor: solo cuentan tres. Un jinete puede fallar del todo sin hacer perder al equipo, una vez.",
          it:"Il meccanismo che dà tutto il sale alla prova. Di quattro punteggi il peggiore è scartato: solo tre contano. Un cavaliere può sbagliare tutto senza far perdere la squadra, una volta sola.",
          de:"Der Mechanismus, der alles ausmacht. Von vier Ergebnissen fällt das schlechteste weg: nur drei zählen. Ein Reiter darf einmal scheitern, ohne das Team zu kosten.",
          ja:"この競技の面白さを生む仕組み。四つの成績のうち最悪の一つが除外され、三つだけが有効です。一人が完全に失敗してもチームは負けません。ただし一度だけ。二つ目の失敗は勝利を失わせます。" } },

  { ref:"barre-tombee", lecon:4, coll:"equipe",
    mots:{ fr:{m:"une barre"}, en:{m:"a rail down", p:"réïl daoune", var:"a fence down"},
           es:{m:"una barra"}, it:{m:"una barriera"},
           de:{m:"ein Abwurf", p:"app-vourf"}, ja:{m:"バー一本の落下", p:"bā ippon no rakka"} },
    def:{ fr:"⚠️ EN ANGLAIS ON NE DIT PAS « a bar » MAIS **a rail** — et « une barre » se dit *a rail down*, avec le « down » qui porte tout le sens. La formule des chefs d'équipe : *we can still afford one rail, but no more*. En allemand un abattage se dit *ein Abwurf*, littéralement « un jet ».",
          en:"Not « a bar » but « a rail », and you say « a rail down » — the « down » carries the meaning. The chef d'équipe's phrase: we can still afford one rail, but no more.",
          es:"En inglés no se dice « a bar » sino « a rail », y se dice « a rail down ».",
          it:"In inglese non si dice « a bar » ma « a rail », e si dice « a rail down ».",
          de:"Englisch sagt nicht « a bar », sondern « a rail down ». Deutsch: ein Abwurf, wörtlich « ein Wurf ».",
          ja:"英語では a bar ではなく a rail と言い、落下は a rail down と表します。down が意味の中心です。ドイツ語の Abwurf は「投げ落とすこと」という意味です。" } },

  { ref:"ordre-depart", lecon:4, coll:"equipe",
    mots:{ fr:{m:"l'ordre de départ"}, en:{m:"the starting order", p:"star-tinng or-deur"},
           es:{m:"el orden de salida"}, it:{m:"l'ordine di partenza"},
           de:{m:"die Startfolge", p:"chtart-fol-gue"}, ja:{m:"出場順", p:"shutsujō jun"} },
    def:{ fr:"⚠️ CE N'EST PAS UN TIRAGE AU SORT, C'EST UNE DÉCISION. Le chef d'équipe place son cavalier le plus régulier en premier — il ouvre et rassure — et son meilleur en dernier, parce que c'est lui qui devra faire le score sous pression. En deuxième manche, l'ordre s'inverse selon le classement.",
          en:"It isn't a draw, it's a decision. The chef d'équipe puts the most reliable rider first — to open and to reassure — and the best one last, because that's the score made under pressure.",
          es:"No es un sorteo, es una decisión. El jefe de equipo pone al jinete más regular primero y al mejor al final, porque es el resultado bajo presión.",
          it:"Non è un sorteggio, è una decisione. Il capo equipe mette il cavaliere più regolare per primo e il migliore per ultimo, perché è il punteggio sotto pressione.",
          de:"Es ist keine Auslosung, sondern eine Entscheidung. Der Chef d'équipe setzt den zuverlässigsten Reiter zuerst und den besten zuletzt.",
          ja:"抽選ではなく判断です。監督は最も安定した騎手を先頭に置き、最も強い騎手を最後に置きます。重圧の中で成績を出すのは最後の走行だからです。" } },

  { ref:"representer-pays", lecon:4, coll:"equipe",
    mots:{ fr:{m:"représenter son pays"}, en:{m:"to represent your country", p:"rè-pri-zènte"},
           es:{m:"representar a su país"}, it:{m:"rappresentare il proprio paese"},
           de:{m:"sein Land vertreten", p:"feur-tré-teune"}, ja:{m:"国を代表する", p:"kuni o daihyō suru"} },
    def:{ fr:"🟥 CE QUI CHANGE TOUT, et la première phrase du chapitre : « aujourd'hui, tu ne montes pas seulement pour toi, tu montes pour ton pays ». On porte la veste nationale, l'hymne joue si l'on gagne, et une faute ne coûte plus seulement un classement. ⚠️ C'est aussi la seule fois de l'année où un cavalier n'a pas le droit de choisir sa stratégie seul.",
          en:"What changes everything, and the chapter's first sentence: today you're not just riding for yourself, you're riding for your country. You wear the national jacket, the anthem plays if you win, and a mistake no longer costs only a placing.",
          es:"Lo que lo cambia todo: hoy no montas solo para ti, montas para tu país. Se lleva la chaqueta nacional y suena el himno si se gana.",
          it:"Ciò che cambia tutto: oggi non monti solo per te, monti per il tuo paese. Si indossa la giacca nazionale e suona l'inno se si vince.",
          de:"Was alles ändert: heute reitest du nicht nur für dich, sondern für dein Land. Man trägt das Nationaljackett, und die Hymne spielt, wenn man gewinnt.",
          ja:"すべてを変えるもの。この章の最初の一文です。「今日は自分のためだけに乗るのではなく、国のために乗る」。国の色のジャケットを着て、勝てば国歌が流れます。ミスはもう順位だけの問題ではありません。" } },

  { ref:"concurrent", lecon:4, coll:"gens",
    mots:{ fr:{m:"le concurrent"}, en:{m:"the competitor", p:"kom-pè-ti-teur"},
           es:{m:"el participante"}, it:{m:"il concorrente"},
           de:{m:"der Teilnehmer", p:"taïl-né-meur"}, ja:{m:"出場者", p:"shutsujōsha"} }, // ??
    def:{ fr:"Toi, le temps d'une journée. L'allemand est le plus doux des six : *Teilnehmer*, « celui qui prend part » — pas celui qui concourt.",
          en:"You, for a day. German is the gentlest of the six: Teilnehmer, « the one who takes part ».",
          es:"Tú, por un día. El alemán es el más suave de los seis: *Teilnehmer*, « el que toma parte » — no el que compite.",
          it:"Tu, per una giornata. Il tedesco è il più dolce dei sei: *Teilnehmer*, « colui che prende parte » — non colui che gareggia.",
          de:"Du, für einen Tag. Das Deutsche ist das sanfteste der sechs: der Teilnehmer — der teilnimmt, nicht der kämpft.",
          ja:"一日だけの、きみ自身のこと。六言語でいちばん柔らかいのはドイツ語です — *Teilnehmer*、「参加する者」。競う者、ではなく。" } },

  { ref:"proprietaire", lecon:4, coll:"gens",
    mots:{ fr:{m:"le propriétaire"}, en:{m:"the owner", p:"ô-neur"},
           es:{m:"el propietario"}, it:{m:"il proprietario"},
           de:{m:"der Besitzer", p:"be-zit-seur"}, ja:{m:"馬主", p:"banushi"} },
    def:{ fr:"Souvent absent du terrain, toujours présent sur les papiers. En Grande-Bretagne, on remercie publiquement les owners après une victoire : c'est un usage, pas une politesse.",
          en:"Often absent from the ground, always on the paperwork. In Britain, owners are publicly thanked after a win.",
          es:"A menudo ausente del terreno, siempre presente en los papeles. En Gran Bretaña se agradece públicamente a los owners tras una victoria: es un uso, no una cortesía.",
          it:"Spesso assente dal campo, sempre presente sui documenti. In Gran Bretagna si ringraziano pubblicamente gli owners dopo una vittoria: è un uso, non una cortesia.",
          de:"Oft nicht am Platz, immer in den Papieren. In Großbritannien dankt man den Owners nach einem Sieg öffentlich: Das ist Brauch, nicht Höflichkeit.",
          ja:"会場にいないことは多くても、書類には必ずいる人。イギリスでは勝利のあと、オーナーへ公に感謝を述べます。礼儀ではなく、しきたりです。" } },

  { ref:"entraineur", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'entraîneur"}, en:{m:"the trainer", p:"tré-neur", var:"the coach"},
           es:{m:"el entrenador"}, it:{m:"l'allenatore"},
           de:{m:"der Trainer", p:"tré-neur"}, ja:{m:"コーチ", p:"kōchi"} },
    def:{ fr:"⚠️ Nuance britannique utile : **trainer** entraîne les chevaux, **coach** entraîne les cavaliers. Demander « who's your coach ? » et « who trains your horse ? » n'appelle pas la même réponse.",
          en:"A useful British nuance: a trainer trains horses, a coach trains riders.",
          es:"⚠️ Matiz británico útil: **trainer** entrena a los caballos, **coach** a los jinetes. Preguntar « who's your coach ? » y « who trains your horse ? » no llama a la misma respuesta.",
          it:"⚠️ Sfumatura britannica utile: **trainer** allena i cavalli, **coach** i cavalieri. Chiedere « who's your coach ? » e « who trains your horse ? » non chiama la stessa risposta.",
          de:"⚠️ Nützliche britische Nuance: Der **trainer** trainiert Pferde, der **coach** Reiter. « Who's your coach ? » und « Who trains your horse ? » verlangen verschiedene Antworten.",
          ja:"⚠️ 役に立つイギリスの使い分け：**trainer** は馬を鍛える人、**coach** は騎手を教える人。« who's your coach ? » と « who trains your horse ? » では、返ってくる答えが違います。" } },

  { ref:"jury", lecon:4, coll:"gens",
    mots:{ fr:{m:"le jury"}, en:{m:"the ground jury", p:"graounde djou-ri", var:"the panel"},
           es:{m:"el jurado"}, it:{m:"la giuria"},
           de:{m:"die Jury", p:"jou-ri", var:"das Richterkollegium"}, ja:{m:"審判団", p:"shinpandan"} }, // ??
    def:{ fr:"L'ensemble des officiels qui décident, distinct du juge unique du dressage. En anglais on précise **ground jury** — le jury « au sol », par opposition aux commissaires en piste.",
          en:"The officials who decide, as opposed to the single dressage judge. English specifies the ground jury.",
          es:"El conjunto de oficiales que deciden, distinto del juez único de la doma. En inglés se precisa **ground jury** — el jurado « de tierra », por oposición a los comisarios en pista.",
          it:"L'insieme degli ufficiali che decidono, distinto dal giudice unico del dressage. In inglese si precisa **ground jury** — la giuria « a terra », in opposizione ai commissari in campo.",
          de:"Die Gesamtheit der entscheidenden Offiziellen, verschieden vom Einzelrichter der Dressur. Auf Englisch präzisiert man **ground jury** — die Jury « am Boden », im Gegensatz zu den Stewards auf dem Platz.",
          ja:"裁定を下す役員の全体。馬場馬術のひとりの審判とは別物です。英語では **ground jury** と限定します — 馬場上の係員たちと区別した、「地上の」審判団という意味で。" } },

  { ref:"reclamation", lecon:4, coll:"gens",
    mots:{ fr:{m:"la réclamation"}, en:{m:"an objection", p:"ob-djèk-cheune", var:"to lodge a complaint"},
           es:{m:"la reclamación"}, it:{m:"il reclamo"},
           de:{m:"der Einspruch", p:"aïn-chprourh"}, ja:{m:"異議申立", p:"igi mōshitate"} }, // ??
    def:{ fr:"Contester une décision, dans un délai court et souvent contre une caution. À l'étranger, la première question à poser n'est pas « comment réclamer » mais « à qui » : c'est presque toujours au secrétariat, pas au juge.",
          en:"Challenging a decision, within a short deadline and often against a deposit. Ask who to go to — usually the secretary, not the judge.",
          es:"Impugnar una decisión, en un plazo corto y a menudo con fianza. En el extranjero, la primera pregunta no es « cómo reclamar » sino « a quién »: casi siempre al secretariado, no al juez.",
          it:"Contestare una decisione, in un termine breve e spesso contro cauzione. All'estero, la prima domanda da fare non è « come reclamare » ma « a chi »: quasi sempre alla segreteria, non al giudice.",
          de:"Eine Entscheidung anfechten, in kurzer Frist und oft gegen Kaution. Im Ausland lautet die erste Frage nicht « wie », sondern « bei wem »: fast immer beim Turnierbüro, nicht beim Richter.",
          ja:"短い期限内に、しばしば保証金を添えて、裁定に異議を申し立てること。海外でまず尋ねるべきは「どうやって」ではなく「誰に」— ほぼ必ず事務局であって、審判ではありません。" } },

  { ref:"reglement", lecon:4, coll:"gens",
    mots:{ fr:{m:"le règlement"}, en:{m:"the rules", p:"roulz", var:"the rule book"},
           es:{m:"el reglamento"}, it:{m:"il regolamento"},
           de:{m:"die Turnierordnung", p:"tour-nir-ord-noung"}, ja:{m:"規定", p:"kitei"} },
    def:{ fr:"Chaque pays a le sien, en plus du règlement international. C'est là que se cachent les différences qui surprennent : muserolles autorisées, âge minimum, obligation du gilet, tenue exigée.",
          en:"Every country has its own on top of the international rules — where the surprising differences hide.",
          es:"Cada país tiene el suyo, además del reglamento internacional. Ahí se esconden las diferencias que sorprenden: muserolas autorizadas, edad mínima, obligación del chaleco, vestimenta exigida.",
          it:"Ogni paese ha il suo, oltre al regolamento internazionale. È lì che si nascondono le differenze che sorprendono: capezzine autorizzate, età minima, obbligo del gilet, tenuta richiesta.",
          de:"Jedes Land hat sein eigenes, zusätzlich zum internationalen. Dort verstecken sich die Überraschungen: erlaubte Nasenriemen, Mindestalter, Westenpflicht, verlangte Kleidung.",
          ja:"国際規則に加えて、国ごとの規則があります。驚かされる違いが潜むのはそこです — 許可される鼻革、最低年齢、ベスト着用義務、服装規定。" } },

  { ref:"minima", lecon:4, coll:"gens",
    mots:{ fr:{m:"la note minimale"}, en:{m:"the qualifying score", p:"kva-li-faï-ing skor", var:"an MER (FEI)"},
           es:{m:"la nota mínima"}, it:{m:"il punteggio minimo"},
           de:{m:"die Qualifikation", p:"kva-li-fi-ka-tsi-ône"}, ja:{m:"資格得点", p:"shikaku tokuten"} }, // ??
    def:{ fr:"Le résultat qu'il faut atteindre pour accéder au niveau suivant. En complet international, l'acronyme à connaître est **MER** — *minimum eligibility requirement*, la performance minimale exigée.",
          en:"The result needed to move up a level. In international eventing the acronym is MER: minimum eligibility requirement.",
          es:"El resultado que hay que alcanzar para acceder al nivel siguiente. En completo internacional, el acrónimo a conocer es **MER** — *minimum eligibility requirement*, el rendimiento mínimo exigido.",
          it:"Il risultato da raggiungere per accedere al livello successivo. Nel completo internazionale, l'acronimo da conoscere è **MER** — *minimum eligibility requirement*, la prestazione minima richiesta.",
          de:"Das Ergebnis, das man für die nächste Stufe braucht. Im internationalen Complet heißt das Kürzel **MER** — *minimum eligibility requirement*, die geforderte Mindestleistung.",
          ja:"次のレベルへ進むために出さなければならない成績。国際総合馬術で知っておくべき略語は **MER** — *minimum eligibility requirement*、要求される最低限の成績です。" } },

  { ref:"championnat", lecon:4, coll:"gens",
    mots:{ fr:{m:"le championnat"}, en:{m:"the championship", p:"tcham-pieune-chip"},
           es:{m:"el campeonato"}, it:{m:"il campionato"},
           de:{m:"die Meisterschaft", p:"maïss-teur-chaft"}, ja:{m:"選手権", p:"senshuken"} },
    def:{ fr:"Le titre annuel, par catégorie et par pays. Badminton n'en est pas un : c'est un concours privé, plus prestigieux que bien des championnats — la géographie du prestige équestre ne suit pas les titres.",
          en:"The annual title, by category and country. Badminton is not one: it is a private event, more prestigious than many championships.",
          es:"El título anual, por categoría y país. Badminton no lo es: es un concurso privado, más prestigioso que muchos campeonatos — la geografía del prestigio ecuestre no sigue los títulos.",
          it:"Il titolo annuale, per categoria e paese. Badminton non lo è: è un concorso privato, più prestigioso di molti campionati — la geografia del prestigio equestre non segue i titoli.",
          de:"Der Jahrestitel, nach Kategorie und Land. Badminton ist keiner: ein privates Turnier, prestigeträchtiger als viele Championate — die Geographie des Reitsport-Prestiges folgt nicht den Titeln.",
          ja:"カテゴリーごと、国ごとの年間タイトル。バドミントンは選手権ではありません。私設の大会でありながら、多くの選手権より格上 — 馬術の威信の地図は、タイトルの地図とは重なりません。" } },

  { ref:"trophee", lecon:4, coll:"gens",
    mots:{ fr:{m:"le trophée"}, en:{m:"the trophy", p:"trô-fi", var:"the cup"},
           es:{m:"el trofeo"}, it:{m:"il trofeo"},
           de:{m:"der Pokal", p:"po-kal"}, ja:{m:"トロフィー", p:"torofī"} },
    def:{ fr:"Souvent un challenge : on le gagne pour un an et on le rend l'année suivante, avec son nom gravé dessus. Les grands trophées britanniques sont plus vieux que la plupart des fédérations.",
          en:"Often a perpetual trophy: won for a year, returned the next with your name engraved on it.",
          es:"A menudo un challenge: se gana por un año y se devuelve al siguiente, con el nombre grabado. Los grandes trofeos británicos son más viejos que la mayoría de las federaciones.",
          it:"Spesso un challenge: si vince per un anno e si restituisce l'anno dopo, col nome inciso sopra. I grandi trofei britannici sono più vecchi della maggior parte delle federazioni.",
          de:"Oft ein Wanderpokal: Man gewinnt ihn für ein Jahr und gibt ihn zurück, den eigenen Namen eingraviert. Die großen britischen Trophäen sind älter als die meisten Verbände.",
          ja:"持ち回りのことが多い賞杯。一年間だけ手元に置き、名前を刻んで翌年返します。イギリスの大トロフィーの多くは、たいていの連盟より年上です。" } },

  { ref:"esprit-sportif", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'esprit sportif"}, en:{m:"sportsmanship", p:"sportss-meun-chip", var:"well ridden !"},
           es:{m:"la deportividad"}, it:{m:"la sportività"},
           de:{m:"die Sportlichkeit", p:"chport-lirh-kaïte", var:"Fairplay"}, ja:{m:"スポーツマンシップ", p:"supōtsumanshippu"} },
    def:{ fr:"La phrase la plus utile de tout le chapitre, dans les six langues : **bravo, joli parcours**. La dire à quelqu'un qui vient de sortir de piste ouvre plus de portes dans une écurie étrangère que n'importe quel classement. En Grande-Bretagne on dit simplement **« well ridden ! »**.",
          en:"The most useful sentence in the chapter: « well ridden ! ». Saying it to someone leaving the arena opens more doors abroad than any placing.",
          es:"La frase más útil de todo el capítulo, en las seis lenguas: **bravo, bonito recorrido**. Decírsela a alguien que acaba de salir de pista abre más puertas en una cuadra extranjera que cualquier clasificación. En Gran Bretaña se dice simplemente **« well ridden ! »**.",
          it:"La frase più utile di tutto il capitolo, nelle sei lingue: **bravo, bel percorso**. Dirla a qualcuno appena uscito dal campo apre più porte in una scuderia straniera di qualsiasi classifica. In Gran Bretagna si dice semplicemente **« well ridden ! »**.",
          de:"Der nützlichste Satz des ganzen Kapitels, in allen sechs Sprachen: **Bravo, schöne Runde**. Ihn jemandem zu sagen, der gerade vom Platz kommt, öffnet in einem fremden Stall mehr Türen als jede Platzierung. In Großbritannien sagt man schlicht **« well ridden ! »**.",
          ja:"この章でいちばん役に立つひと言。六言語すべてで — **お見事、いい走行でしたね**。馬場から出てきたばかりの人にかけるその言葉は、どんな成績よりも、外国の厩舎の扉を開いてくれます。イギリスならただ **« well ridden ! »** と。" } },

  /* ---- ajout du 8 août 2026 (passation S147, demande de Blandine :
     « il faut aussi différencier 3 days event etc, il y a CIC et CCI
     aussi ») : les formats du concours complet, en une seule notion. ---- */

  { ref:"formats-complet", lecon:2, coll:"concours",
    mots:{ fr:{m:"le format"}, en:{m:"the format", p:"for-matt"},
           es:{m:"el formato"}, it:{m:"il formato"},
           de:{m:"das Format"}, ja:{m:"競技形式", p:"kyōgi keishiki"} },
    def:{ fr:"Le complet se court en un jour (**ODE**, one-day event) ou en trois (**le three-day event**). En international : **CCI-S** (court) et **CCI-L** (long) — ⚠️ les anciens sigles **CIC/CCI**, renommés en 2019, s'entendent encore partout. La difficulté se lit aux étoiles, de 1★ à 5★ : Badminton est un 5★, il n'en existe qu'une poignée au monde.",
          en:"Eventing runs over one day (**ODE**, one-day event) or three (**the three-day event**). Internationally: **CCI-S** (short) and **CCI-L** (long) — the old labels **CIC/CCI**, renamed in 2019, are still heard everywhere. Difficulty reads in stars, 1★ to 5★: Badminton is a 5★, and there is only a handful in the world.",
          es:"El completo se corre en un día (**ODE**, one-day event) o en tres (**el three-day event**). En internacional: **CCI-S** (corto) y **CCI-L** (largo) — ⚠️ las siglas antiguas **CIC/CCI**, renombradas en 2019, aún se oyen en todas partes. La dificultad se lee en estrellas, de 1★ a 5★: Badminton es un 5★, y solo hay un puñado en el mundo.",
          it:"Il completo si corre in un giorno (**ODE**, one-day event) o in tre (**il three-day event**). In internazionale: **CCI-S** (corto) e **CCI-L** (lungo) — ⚠️ le vecchie sigle **CIC/CCI**, rinominate nel 2019, si sentono ancora ovunque. La difficoltà si legge nelle stelle, da 1★ a 5★: Badminton è un 5★, e ne esiste una manciata al mondo.",
          de:"Die Vielseitigkeit läuft an einem Tag (**ODE**, one-day event) oder an dreien (**das Three-Day-Event**). International: **CCI-S** (kurz) und **CCI-L** (lang) — ⚠️ die alten Kürzel **CIC/CCI**, 2019 umbenannt, hört man noch überall. Die Schwierigkeit steht in Sternen, 1★ bis 5★: Badminton ist ein 5★ — davon gibt es weltweit eine Handvoll.",
          ja:"総合馬術は一日で行う **ODE**（ワンデイイベント）と、三日間の **three-day event** があります。国際競技では **CCI-S**（ショート）と **CCI-L**（ロング）— ⚠️ 2019年に改称された旧称 **CIC/CCI** も、現場ではまだあちこちで聞こえます。難易度は 1★ から 5★ の星の数で読みます。バドミントンは 5★ — 世界に一握りしかない格付けです。" } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-epreuve", lecon:1,
      fr:"Tu passes à quelle heure ?",
      en:"What time are you on ?",
      es:"¿ A qué hora pasas ?",
      it:"A che ora passi ?",
      de:"Wann bist du dran ?",
      ja:"何時 に 出番 です か ?" },
    { ref:"ou-secretariat", lecon:1,
      fr:"Je viens chercher mon dossard.",
      en:"I've come for my number.",
      es:"Vengo a por mi dorsal.",
      it:"Vengo a prendere il numero.",
      de:"Ich hole meine Startnummer.",
      ja:"ゼッケン を 取り に 来 まし た。" },
    { ref:"licence-etrangere", lecon:1,
      fr:"Ma licence suffit pour concourir ?",
      en:"Is my membership enough to compete ?",
      es:"¿ Basta mi licencia para competir ?",
      it:"Basta la mia licenza per gareggiare ?",
      de:"Reicht meine Lizenz zum Starten ?",
      ja:"ライセンス で 出場 でき ます か ?" },
    { ref:"niveau-equivalent", lecon:2,
      fr:"Le niveau Novice, quelle hauteur ?",
      en:"What height is Novice ?",
      es:"¿ Qué altura es Novice ?",
      it:"Che altezza è il Novice ?",
      de:"Wie hoch ist Novice ?",
      ja:"ノービス は 高さ いくつ です か ?" },
    { ref:"temps-optimum-cross", lecon:2,
      fr:"Le temps optimum : six minutes vingt.",
      en:"Optimum time: six twenty.",
      es:"Tiempo óptimo: seis veinte.",
      it:"Tempo ottimo: sei e venti.",
      de:"Optimalzeit: sechs zwanzig.",
      ja:"規定 タイム は 六分 二十秒。" },
    { ref:"tu-passes", lecon:3,
      fr:"C'est à toi, on t'appelle !",
      en:"You're on — they're calling you !",
      es:"¡ Te toca, te están llamando !",
      it:"Tocca a te, ti stanno chiamando !",
      de:"Du bist dran, du wirst aufgerufen !",
      ja:"出番 です 、 呼ばれて い ます !" },
    { ref:"resultats-ou", lecon:3,
      fr:"Les résultats sont affichés où ?",
      en:"Where are the results posted ?",
      es:"¿ Dónde están los resultados ?",
      it:"Dove sono affissi i risultati ?",
      de:"Wo hängen die Ergebnisse ?",
      ja:"結果 は どこ に 掲示 され ます か ?" },
    { ref:"bravo", lecon:4,
      fr:"Bravo, joli parcours !",
      en:"Well ridden — lovely round !",
      es:"¡ Enhorabuena, bonito recorrido !",
      it:"Bravissima, bel percorso !",
      de:"Toll geritten, schöne Runde !",
      ja:"お見事 でした 、 いい 走行 でした !" }
  ],

  /* ==================================================================
     LE DIALOGUE DE BADMINTON — 17 août 2026, session 214.

     LA SCÈNE : les trois jours d'un concours complet, dans l'ordre —
     l'arrivée, le dressage, le cross, l'obstacle. 27 phrases, 6 temps.

     🟥 DIX-HUIT PHRASES SUR VINGT-DEUX SONT DE BLANDINE, écrites avec
     leur traduction anglaise. Sa consigne : « pour Badminton je ferais
     un chapitre encore plus complet que Burghley, en couvrant les 3
     tests du concours complet : dressage, cross et hippique, avec des
     phrases vraiment utiles en situation ».
     ⚠️ C'EST LA STRUCTURE QUI FAIT LE CHAPITRE : un temps par épreuve,
     dans l'ordre où elles se courent. NE PAS mélanger les temps.

     🟥 CE QUE SES PHRASES APPORTENT, et que rien n'expliquait :
     · LE DRESSAGE — préparer la transition AVANT la lettre, la cadence
       régulière, l'engagement des postérieurs, et « laisse-le respirer
       avant d'entrer sur le carré » : un cheval tendu ne se détend pas
       dans le rectangle.
     · LE CROSS — économiser sur le terrain vallonné, rattraper du temps
       sur les portions plates, rééquilibrer sans casser le galop, et
       surtout « regarde déjà l'obstacle suivant pendant que tu
       franchis celui-ci ».
     · 🟥 LE TROISIÈME JOUR — ce que personne ne dit : le cheval a couru
       le cross la veille. « Il a beaucoup donné hier, regarde comment
       il se sent à la détente » · « aujourd'hui il faut préserver les
       barres, le cheval peut être fatigué » · « un sans-faute peut
       complètement changer le classement final ».
     ⚠️ NE PAS déplacer le temps 5 avant le temps 4 : l'obstacle vient
     APRÈS le cross dans un complet, et c'est tout l'intérêt.

     ⚠️ AUCUN CHIFFRE DE BARÈME. Consigne de Blandine après trois fautes
     de fond sur Windsor : « invente surtout pas des trucs ». Le mot
     `bareme` existe pour qu'on sache POSER la question.
     ⚠️ `bonne-chance` a été RETIRÉ du lexique le même jour, sur sa
     demande : la formule porte malheur dans le monde équestre, comme au
     théâtre. On dit « bon courage », les Britanniques « have a good
     ride », les Allemands « Hals- und Beinbruch ». NE PAS le remettre.

     ⚠️ MOTS EMPLOYÉS SANS ÊTRE DANS CETTE LEÇON, volontairement — c'est
     de la révision, les villes précédentes les ont donnés :
     `lettre` (Windsor) · `cadence` et `engagement` (Versailles) ·
     `detente` (Aberystwyth) · `sans-faute` (Wellington) · `fosse`,
     `contre-bas`, `gue`, `voie-directe`, `ligne`, `complexe-eau`
     (Burghley, qui vient JUSTE AVANT depuis l'interversion du 17/08).

     `dit` : "joueuse" = elle produit · "club" = le secrétariat, un
     coach, le speaker.
  ================================================================== */
  dialogue: {
    ville: "badminton", lecon: 2, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 27 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive sur le concours ---- */
      { ref:"dbd-secretariat", temps:1, dit:"joueuse", mots:[], motsAilleurs:["secretariat"],
        fr:"Où est le secrétariat ? Je viens retirer mon dossard.",
        en:"Where's the secretary's office? I've come to collect my number.",
        es:"¿Dónde está la secretaría? Vengo a recoger mi dorsal.",
        it:"Dov'è la segreteria? Vengo a ritirare il mio numero.",
        de:"Wo ist das Meldebüro? Ich möchte meine Startnummer holen.",
        ja:"事務局 は どこ です か ? ゼッケン を 受け取り に 来 まし た。" },

      { ref:"dbd-r-licence-passeport", temps:1, dit:"club", mots:[], motsAilleurs:["licence"],
        fr:"Il me faut votre licence et le passeport du cheval.",
        en:"I need your licence and the horse's passport.",
        es:"Necesito su licencia y el pasaporte del caballo.",
        it:"Mi servono la sua licenza e il passaporto del cavallo.",
        de:"Ich brauche Ihre Lizenz und den Pferdepass.",
        ja:"ライセンス と 馬 の パスポート が 必要 です。" },

      { ref:"dbd-licence-etrangere", temps:1, dit:"joueuse", mots:[], motsAilleurs:["licence"],
        fr:"Ma licence est étrangère, est-ce qu'elle est valable ici ?",
        en:"My licence is foreign — is it valid here?",
        es:"Mi licencia es extranjera, ¿es válida aquí?",
        it:"La mia licenza è straniera, è valida qui?",
        de:"Meine Lizenz ist ausländisch — gilt sie hier?",
        ja:"外国 の ライセンス です が、 ここ で 有効 です か ?" },

      { ref:"dbd-epreuves-ou", temps:1, dit:"joueuse", mots:["concours-complet","reprise-dressage","parcours-obstacle","cross"],
        fr:"Savez-vous comment et où vont se dérouler les épreuves de dressage, obstacle et cross ?",
        en:"Do you know how and where the dressage, showjumping and cross-country will be run?",
        es:"¿Sabe cómo y dónde se van a disputar las pruebas de doma, salto y cross?",
        it:"Sa come e dove si svolgeranno le prove di dressage, salto e cross?",
        de:"Wissen Sie, wie und wo Dressur, Springen und Gelände ausgetragen werden?",
        ja:"馬場、 障害、 クロスカントリー の 各 競技 が いつ どこ で 行わ れる か ご存じ です か ?" },

      { ref:"dbd-r-trois-jours", temps:1, dit:"club", mots:["reprise-dressage","cross","parcours-obstacle"],
        fr:"Dressage aujourd'hui, cross demain, obstacle dimanche.",
        en:"Dressage today, cross-country tomorrow, showjumping on Sunday.",
        es:"Doma hoy, cross mañana, salto el domingo.",
        it:"Dressage oggi, cross domani, salto domenica.",
        de:"Heute Dressur, morgen Gelände, Sonntag Springen.",
        ja:"今日 は 馬場、 明日 は クロスカントリー、 日曜 は 障害 です。" },

      /* ---- temps 2 · la reprise de dressage ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-laisse-respirer", temps:2, dit:"club", mots:["reprise-dressage"],
        fr:"Il est un peu tendu, laisse-le respirer avant d'entrer sur le carré.",
        en:"He's a little tense, let him breathe before you enter the arena.",
        es:"Está algo tenso, déjalo respirar antes de entrar en la pista.",
        it:"È un po' teso, lascialo respirare prima di entrare nel quadrato.",
        de:"Er ist etwas angespannt — lass ihn atmen, bevor du ins Viereck reitest.",
        ja:"少し 緊張 し て い ます。 馬場 に 入る 前 に 息 を つか せ て ください。" },

      /* 🟥 Phrase de Blandine. Emploie `lettre`, de Windsor. */
      { ref:"dbd-r-transition-lettre", temps:2, dit:"club", mots:[], motsAilleurs:["lettre"],
        fr:"Prépare ta transition avant la lettre, pas au dernier moment.",
        en:"Prepare your transition before the marker, not at the last second.",
        es:"Prepara la transición antes de la letra, no en el último momento.",
        it:"Prepara la transizione prima della lettera, non all'ultimo momento.",
        de:"Bereite den Übergang vor dem Buchstaben vor, nicht in der letzten Sekunde.",
        ja:"移行 は 文字 の 手前 で 準備 し ます。 直前 で は 遅い です。" },

      /* 🟥 Phrase de Blandine. Emploie `cadence`, de Versailles. */
      { ref:"dbd-r-cadence-reguliere", temps:2, dit:"club", mots:[], motsAilleurs:["cadence"],
        fr:"Garde une cadence régulière et ne le laisse pas accélérer.",
        en:"Keep a steady rhythm and don't let him rush.",
        es:"Mantén una cadencia regular y no le dejes acelerar.",
        it:"Mantieni una cadenza regolare e non lasciarlo accelerare.",
        de:"Halte einen gleichmäßigen Takt und lass ihn nicht eilen.",
        ja:"一定 の リズム を 保ち、 急がせ ない で ください。" },

      /* 🟥 Phrase de Blandine. `engagement` créé le même jour. */
      { ref:"dbd-r-engagement", temps:2, dit:"club", mots:["reprise-dressage"], motsAilleurs:["engagement"],
        fr:"Il faut davantage d'engagement des postérieurs dans cette reprise.",
        en:"We need more engagement from the hindquarters in this test.",
        es:"Hace falta más enganche de los posteriores en esta prueba.",
        it:"Serve più impegno dei posteriori in questa ripresa.",
        de:"In dieser Aufgabe braucht es mehr Untertreten der Hinterhand.",
        ja:"この 課目 で は、 後肢 の 踏み込み を もっと 出す 必要 が あり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-troisieme-provisoire", temps:2, dit:"joueuse", mots:["classement-provisoire","reprise-dressage"],
        fr:"Je suis troisième au classement provisoire après le dressage.",
        en:"I'm lying third after the dressage.",
        es:"Voy tercera en la clasificación provisional después de la doma.",
        it:"Sono terza nella classifica provvisoria dopo il dressage.",
        de:"Nach der Dressur liege ich auf dem dritten Platz.",
        ja:"馬場 の あと、 暫定 三位 です。" },

      /* ---- temps 3 · le cross, l'économie du cheval ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-terrain-vallonne", temps:3, dit:"club", mots:["terrain-vallonne","cross"],
        fr:"Le terrain est vallonné, économise ton cheval au début du cross.",
        en:"The ground is hilly, so save your horse at the beginning of the cross-country.",
        es:"El terreno es ondulado: economiza tu caballo al principio del cross.",
        it:"Il terreno è mosso: risparmia il cavallo all'inizio del cross.",
        de:"Das Gelände ist hügelig — schone dein Pferd am Anfang.",
        ja:"起伏 が ある 地形 です。 クロス の 序盤 は 馬 を 節約 し て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-galoper-recuperer", temps:3, dit:"club", mots:["rattraper-temps"],
        fr:"Laisse-le galoper sur les portions où tu peux récupérer du temps.",
        en:"Let him gallop on the stretches where you can make up time.",
        es:"Déjalo galopar en los tramos donde puedas recuperar tiempo.",
        it:"Lascialo galoppare nei tratti dove puoi recuperare tempo.",
        de:"Lass ihn auf den Strecken galoppieren, wo du Zeit aufholen kannst.",
        ja:"時間 を 取り戻せる 区間 で は 走ら せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-rebalance-galop", temps:3, dit:"club", mots:["obstacle-fixe"],
        fr:"Rééquilibre avant le gros obstacle, mais ne casse pas ton galop.",
        en:"Rebalance before the big fence, but don't kill the gallop.",
        es:"Reequilibra antes del obstáculo grande, pero no rompas el galope.",
        it:"Riequilibra prima dell'ostacolo grande, ma non rompere il galoppo.",
        de:"Balanciere vor dem großen Sprung neu, aber zerstöre den Galopp nicht.",
        ja:"大きな 障害 の 前 で 立て直し ます が、 ギャロップ を 殺さ ない で。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-regarde-suivant", temps:3, dit:"club", mots:[], motsAilleurs:["ligne"],
        fr:"Regarde déjà l'obstacle suivant pendant que tu franchis celui-ci.",
        en:"Look for the next fence while you're jumping this one.",
        es:"Mira ya el obstáculo siguiente mientras saltas este.",
        it:"Guarda già l'ostacolo successivo mentre salti questo.",
        de:"Schau schon zum nächsten Sprung, während du diesen springst.",
        ja:"この 障害 を 飛び ながら、 すでに 次 の 障害 を 見 ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-drop-dans-eau", temps:3, dit:"club", mots:[], motsAilleurs:["contre-bas","complexe-eau"],
        fr:"Il y a un gros contre-bas dans l'eau, reste bien derrière ton cheval.",
        en:"There's a big drop into the water, stay well behind your horse.",
        es:"Hay un gran contrabajo en el agua: quédate bien detrás de tu caballo.",
        it:"C'è un grosso salto in discesa nell'acqua: resta bene dietro al cavallo.",
        de:"Es gibt einen großen Absprung ins Wasser — bleib gut hinter dem Pferd.",
        ja:"水 の 中 へ の 大きな ドロップ が あり ます。 体 を しっかり 後ろ に 残し て。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-jambes-fosse", temps:3, dit:"club", mots:[], motsAilleurs:["fosse"],
        fr:"Garde tes jambes au contact s'il regarde le fossé.",
        en:"Keep your leg on if he looks at the ditch.",
        es:"Mantén las piernas en contacto si mira la zanja.",
        it:"Tieni le gambe in contatto se guarda il fosso.",
        de:"Halte den Schenkel dran, wenn er den Graben anschaut.",
        ja:"溝 を 見 たら、 脚 を つけ た まま に し て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-voie-directe-precision", temps:3, dit:"club", mots:[], motsAilleurs:["voie-directe"],
        fr:"La voie directe est plus rapide, mais elle demande beaucoup de précision.",
        en:"The direct route is quicker, but it requires a lot of accuracy.",
        es:"La vía directa es más rápida, pero exige mucha precisión.",
        it:"La via diretta è più rapida, ma richiede molta precisione.",
        de:"Der direkte Weg ist schneller, verlangt aber viel Präzision.",
        ja:"直線 ルート の ほう が 速い です が、 高い 正確 さ が 必要 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-pas-couper-virage", temps:3, dit:"club", mots:[], motsAilleurs:["ligne"],
        fr:"Ne coupe pas ton virage, tu risques de perdre ta ligne sur le deuxième élément.",
        en:"Don't cut the turn or you might lose your line to the second element.",
        es:"No cortes el giro: puedes perder la línea en el segundo elemento.",
        it:"Non tagliare la curva: rischi di perdere la linea sul secondo elemento.",
        de:"Schneide die Wendung nicht ab, sonst verlierst du die Linie zum zweiten Element.",
        ja:"回転 を 内側 に 切ら ない で。 二番目 の 要素 で ライン を 失い ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-trouve-sa-foulee", temps:3, dit:"club", mots:["obstacle-fixe"],
        fr:"Laisse-le trouver sa foulée devant le gros oxer de cross.",
        en:"Let him find his stride to the big cross-country oxer.",
        es:"Déjalo encontrar su tranco ante el gran óxer de cross.",
        it:"Lascialo trovare la sua falcata davanti al grande oxer da cross.",
        de:"Lass ihn seinen Galoppsprung zum großen Gelände-Oxer selbst finden.",
        ja:"クロス の 大きな オクサー の 前 で は、 馬 に 歩 を 見つけ さ せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-retard-chrono", temps:3, dit:"club", mots:["temps-optimum","rattraper-temps"],
        fr:"On est légèrement en retard sur le chronomètre, il faut avancer maintenant.",
        en:"We're slightly behind the clock, so we need to move on now.",
        es:"Vamos algo retrasados con el cronómetro: hay que avanzar ahora.",
        it:"Siamo leggermente in ritardo sul cronometro: bisogna avanzare adesso.",
        de:"Wir sind leicht hinter der Zeit — jetzt müssen wir vorwärts.",
        ja:"タイム が やや 遅れ て い ます。 今 から 前 へ 出 なけれ ば なり ませ ん。" },

      /* ---- temps 4 · le lendemain, la détente ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-donne-hier", temps:4, dit:"club", mots:[], motsAilleurs:["detente"],
        fr:"Il a beaucoup donné hier, regarde comment il se sent à la détente.",
        en:"He gave a lot yesterday, so see how he feels in the warm-up.",
        es:"Ayer dio mucho: mira cómo se siente en el calentamiento.",
        it:"Ieri ha dato molto: guarda come si sente nel riscaldamento.",
        de:"Er hat gestern viel gegeben — schau, wie er sich beim Abreiten anfühlt.",
        ja:"昨日 は かなり 頑張り まし た。 ウォーミング アップ で 様子 を 見 て ください。" },

      { ref:"dbd-trot-presentation", temps:4, dit:"joueuse", mots:["trot-presentation"],
        fr:"Est-ce qu'il a passé le trot de présentation ?",
        en:"Has he passed the trot-up?",
        es:"¿Ha pasado la inspección al trote?",
        it:"Ha superato la visita al trotto?",
        de:"Hat er die Verfassungsprüfung bestanden?",
        ja:"獣医 検査 の 常歩 速歩 検査 は 通り まし た か ?" },

      /* ---- temps 5 · le parcours d'obstacle, sur un cheval fatigué ---- */
      /* 🟥 Phrase de Blandine. LE cœur du troisième jour. */
      { ref:"dbd-r-garder-les-barres", temps:5, dit:"club", mots:["garder-les-barres","parcours-obstacle","cross"],
        fr:"Aujourd'hui, il faut préserver les barres : le cheval peut être fatigué après le cross.",
        en:"Today we need to keep the poles up; the horse may be tired after the cross-country.",
        es:"Hoy hay que no tirar las barras: el caballo puede estar cansado después del cross.",
        it:"Oggi bisogna non far cadere le barriere: il cavallo può essere stanco dopo il cross.",
        de:"Heute müssen die Stangen oben bleiben — das Pferd kann nach dem Gelände müde sein.",
        ja:"今日 は バー を 落とさ ない こと が 大切 です。 クロス の あと で 馬 は 疲れ て いる かも しれ ませ ん。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-attends-distance", temps:5, dit:"club", mots:["parcours-obstacle"],
        fr:"Attends ta distance et garde-le droit entre tes deux rênes.",
        en:"Wait for your distance and keep him straight between both reins.",
        es:"Espera tu distancia y mantenlo derecho entre las dos riendas.",
        it:"Aspetta la tua distanza e tienilo dritto tra le due redini.",
        de:"Warte auf die Distanz und halte ihn gerade zwischen beiden Zügeln.",
        ja:"距離 を 待っ て、 両手 の 手綱 の 間 で まっすぐ 保っ て ください。" },

      /* ---- temps 6 · le classement final ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dbd-r-sans-faute-classement", temps:6, dit:"club", mots:["classement-provisoire"], motsAilleurs:["sans-faute"],
        fr:"Un sans-faute aujourd'hui peut complètement changer le classement final.",
        en:"A clear round today could completely change the final standings.",
        es:"Un recorrido sin falta hoy puede cambiar por completo la clasificación final.",
        it:"Un percorso netto oggi può cambiare completamente la classifica finale.",
        de:"Eine Nullrunde heute kann die Endplatzierung völlig verändern.",
        ja:"今日 の クリア ラウンド が、 最終 順位 を まったく 変える こと が あり ます。" },

      { ref:"dbd-points-de-temps", temps:6, dit:"joueuse", mots:["temps-optimum","bareme"],
        fr:"Est-ce que j'ai eu des points de temps ? Quel barème s'applique ici ?",
        en:"Did I get any time penalties? Which scoring applies here?",
        es:"¿He tenido puntos de tiempo? ¿Qué baremo se aplica aquí?",
        it:"Ho preso penalità di tempo? Quale barème si applica qui?",
        de:"Habe ich Zeitfehler bekommen? Welche Wertung gilt hier?",
        ja:"タイム 減点 は あり まし た か ? ここ で は どの 減点 方式 です か ?" },

      { ref:"dbd-r-remise-prix", temps:6, dit:"club", mots:[], motsAilleurs:["trophee"],
        fr:"Remise des prix à seize heures. Tu viendras récupérer ta coupe, ta plaque et ton flot !",
        en:"Prize-giving at four. Come and collect your cup, your plaque and your rosette !",
        es:"Entrega de premios a las cuatro. ¡ Ven a recoger tu copa, tu placa y tu escarapela !",
        it:"Premiazione alle sedici. Vieni a ritirare la coppa, la placca e la coccarda !",
        de:"Siegerehrung um sechzehn Uhr. Hol deinen Pokal, dein Schild und deine Schleife !",
        ja:"表彰式 は 十六 時 です。 カップ、 プレート、 ロゼット を 受け取り に 来 て ください !" }
    ]
  },
  /* ==================================================================
     LE DIALOGUE DE ROME — 17 août 2026, session 214.
     ⚠️ CE FICHIER PORTE DEUX DIALOGUES. `dialogue` = BADMINTON (le
     complet). `dialogueRome` = ROME (la Coupe des Nations). Le moteur
     balaie toutes les clés commençant par `dialogue` depuis le 16/08.
     NE PAS fusionner.

     LA SCÈNE : une Coupe des Nations. 21 phrases, 6 temps.
     🟥 LE SEUL DIALOGUE DE L'APP OÙ L'ON NE MONTE PAS POUR SOI.
     Sa première phrase le dit : « aujourd'hui, tu ne montes pas
     seulement pour toi, tu montes pour ton pays ».

     🟥 DIX-HUIT PHRASES SUR VINGT-ET-UNE SONT DE BLANDINE, avec leur
     traduction anglaise. Elle a aussi fourni le lexique entier de la
     Coupe des Nations (onze entrées ajoutées le même jour) et la
     formule d'ouverture du chapitre :
     🟥 **4 riders → 3 scores count → 2 rounds → 1 nation wins**
     ⚠️ NE PAS la reformuler : tout le système est dans cette ligne.

     CE QUE SES PHRASES ENSEIGNENT, et que rien d'autre n'explique :
     · LE MÉCANISME — quatre couples, trois scores comptent, le plus
       mauvais est écarté. D'où les stratégies : « on peut encore se
       permettre une barre, mais pas davantage ».
     · LE RÔLE DE CHACUN — le premier donne un parcours de référence
       (*a good opening round*), le dernier fait le score sous pression.
     · LA DEUXIÈME MANCHE — dans l'ORDRE INVERSE du classement, ce qui
       rend la fin insoutenable.
     · LE BARRAGE — un seul cavalier représente l'équipe.

     ⚠️ AUCUN CHIFFRE INVENTÉ. « Les huit meilleures équipes se
     qualifieront » est la phrase de Blandine et vient d'elle ; le
     nombre varie selon l'épreuve, et la définition de
     `deuxieme-manche` dit de le demander plutôt que de le supposer.

     ⚠️ LE MOT LE PLUS ÉTRANGE DU CHAPITRE : **le chef d'équipe** se dit
     « chef d'équipe » EN ANGLAIS AUSSI. Comme « travers » et
     « appuyer » en dressage, l'équitation a exporté ce mot.
     NE PAS traduire par « team leader ».

     `dit` : "joueuse" = elle produit · "club" = le chef d'équipe ou un
     coéquipier.
  ================================================================== */
  dialogueRome: {
    ville: "rome", lecon: 4, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · on monte pour son pays ---- */
      /* 🟥 Phrase de Blandine : la première du chapitre. */
      { ref:"dr-pour-ton-pays", temps:1, dit:"club", mots:["representer-pays","coupe-nations"],
        fr:"Aujourd'hui, tu ne montes pas seulement pour toi, tu montes pour ton pays.",
        en:"Today, you're not just riding for yourself, you're riding for your country.",
        es:"Hoy no montas solo para ti: montas para tu país.",
        it:"Oggi non monti solo per te: monti per il tuo paese.",
        de:"Heute reitest du nicht nur für dich, sondern für dein Land.",
        ja:"今日 は 自分 の ため だけ で は なく、 国 の ため に 乗り ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-plusieurs-couples", temps:1, dit:"club", mots:["equipe-nationale","couple"],
        fr:"Chaque équipe est composée de plusieurs couples cavalier-cheval.",
        en:"Each team is made up of several horse-and-rider combinations.",
        es:"Cada equipo está formado por varias combinaciones jinete-caballo.",
        it:"Ogni squadra è composta da più binomi cavaliere-cavallo.",
        de:"Jede Mannschaft besteht aus mehreren Reiter-Pferd-Paaren.",
        ja:"各 チーム は 複数 の 人馬 コンビ で 構成 され ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-trois-meilleurs", temps:1, dit:"club", mots:["coupe-nations"],
        fr:"Les trois meilleurs scores de l'équipe sont pris en compte.",
        en:"The three best scores of the team count.",
        es:"Se tienen en cuenta los tres mejores resultados del equipo.",
        it:"Contano i tre migliori punteggi della squadra.",
        de:"Die drei besten Ergebnisse der Mannschaft zählen.",
        ja:"チーム の 上位 三 つ の 成績 が 有効 に なり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-score-ecarte", temps:1, dit:"club", mots:["score-ecarte"],
        fr:"Notre moins bon score pourra être écarté.",
        en:"Our worst score can be dropped.",
        es:"Nuestro peor resultado podrá descartarse.",
        it:"Il nostro punteggio peggiore potrà essere scartato.",
        de:"Unser schlechtestes Ergebnis kann gestrichen werden.",
        ja:"最も 悪い 成績 は 除外 でき ます。" },

      /* ---- temps 2 · mon rôle dans l'équipe ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-premier-reference", temps:2, dit:"club", mots:["ordre-depart","premiere-manche"],
        fr:"Tu passes en premier pour l'équipe, alors donne-nous un parcours de référence.",
        en:"You're first to go for the team, so give us a good opening round.",
        es:"Sales primera por el equipo, así que danos un recorrido de referencia.",
        it:"Parti prima per la squadra, quindi dacci un percorso di riferimento.",
        de:"Du gehst als Erste für die Mannschaft — gib uns eine gute Eröffnungsrunde.",
        ja:"チーム の 一番手 です。 基準 に なる 走行 を 見せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-sans-faute-tete", temps:2, dit:"club", mots:[], motsAilleurs:["sans-faute"],
        fr:"Nous avons besoin d'un sans-faute pour rester en tête.",
        en:"We need a clear round to stay in the lead.",
        es:"Necesitamos un recorrido sin falta para seguir en cabeza.",
        it:"Ci serve un percorso netto per restare in testa.",
        de:"Wir brauchen eine Nullrunde, um in Führung zu bleiben.",
        ja:"首位 を 守る に は クリア ラウンド が 必要 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-une-barre-pas-plus", temps:2, dit:"club", mots:["barre-tombee"],
        fr:"Nous pouvons encore nous permettre une barre, mais pas davantage.",
        en:"We can still afford one rail, but no more.",
        es:"Todavía podemos permitirnos una barra, pero no más.",
        it:"Possiamo ancora permetterci una barriera, ma non di più.",
        de:"Einen Abwurf können wir uns noch erlauben, aber nicht mehr.",
        ja:"バー 一本 まで は 許容 でき ます が、 それ 以上 は 無理 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-apres-troisieme", temps:2, dit:"club", mots:["coequipier","ordre-depart"],
        fr:"Après le parcours du troisième cavalier, nous saurons exactement ce dont tu as besoin.",
        en:"After our third rider, we'll know exactly what you need to do.",
        es:"Después del recorrido del tercer jinete sabremos exactamente lo que necesitas.",
        it:"Dopo il percorso del terzo cavaliere sapremo esattamente cosa ti serve.",
        de:"Nach unserem dritten Reiter wissen wir genau, was du brauchst.",
        ja:"三 番手 の 走行 が 終われ ば、 あなた に 必要 な こと が 正確 に わかり ます。" },

      /* ---- temps 3 · le classement ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-italie-egalite", temps:3, dit:"club", mots:["equipe-nationale"], motsAilleurs:["classement-provisoire"],
        fr:"L'équipe italienne est actuellement à égalité avec la France.",
        en:"The Italian team is currently tied with France.",
        es:"El equipo italiano está actualmente empatado con Francia.",
        it:"La squadra italiana è attualmente a pari merito con la Francia.",
        de:"Die italienische Mannschaft liegt derzeit gleichauf mit Frankreich.",
        ja:"イタリア チーム は 現在 フランス と 同点 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-quatre-points-avance", temps:3, dit:"club", mots:[], motsAilleurs:["classement-provisoire","penalites"],
        fr:"Nous avons quatre points de pénalité d'avance sur l'équipe suivante.",
        en:"We're four penalties ahead of the next team.",
        es:"Llevamos cuatro puntos de penalización de ventaja sobre el equipo siguiente.",
        it:"Abbiamo quattro penalità di vantaggio sulla squadra successiva.",
        de:"Wir haben vier Strafpunkte Vorsprung auf die nächste Mannschaft.",
        ja:"次 の チーム に 減点 四 の 差 で リード し て い ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-huit-qualifiees", temps:3, dit:"club", mots:["deuxieme-manche","equipe-nationale"],
        fr:"Les huit meilleures équipes se qualifieront pour la deuxième manche.",
        en:"The top eight teams will qualify for the second round.",
        es:"Los ocho mejores equipos se clasificarán para la segunda manga.",
        it:"Le prime otto squadre si qualificheranno per la seconda manche.",
        de:"Die besten acht Mannschaften qualifizieren sich für den zweiten Umlauf.",
        ja:"上位 八 チーム が 第二 回 走行 に 進み ます。" },

      /* ---- temps 4 · la deuxième manche ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-ordre-inverse", temps:4, dit:"club", mots:["deuxieme-manche","ordre-depart"],
        fr:"Nous repartirons dans l'ordre inverse du classement.",
        en:"We'll start again in reverse order of the standings.",
        es:"Volveremos a salir en orden inverso a la clasificación.",
        it:"Ripartiremo in ordine inverso alla classifica.",
        de:"Wir starten erneut in umgekehrter Reihenfolge der Wertung.",
        ja:"順位 の 逆順 で 再 スタート し ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-chaque-faute-compte", temps:4, dit:"club", mots:["barre-tombee"],
        fr:"Chaque faute compte maintenant, nous n'avons plus de marge d'erreur.",
        en:"Every fault counts now; we have no room for error.",
        es:"Ahora cada falta cuenta: ya no tenemos margen de error.",
        it:"Adesso ogni penalità conta: non abbiamo più margine d'errore.",
        de:"Jetzt zählt jeder Fehler — wir haben keinen Spielraum mehr.",
        ja:"もう 一つ の ミス も 許され ませ ん。 余裕 は あり ませ ん。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-chef-strategie", temps:4, dit:"club", mots:["chef-equipe","deuxieme-manche"],
        fr:"Le chef d'équipe a décidé de modifier notre stratégie pour la deuxième manche.",
        en:"The chef d'équipe has decided to change our strategy for the second round.",
        es:"El jefe de equipo ha decidido cambiar nuestra estrategia para la segunda manga.",
        it:"Il capo equipe ha deciso di cambiare la nostra strategia per la seconda manche.",
        de:"Der Equipechef hat entschieden, unsere Strategie für den zweiten Umlauf zu ändern.",
        ja:"監督 が 第二 回 走行 の 戦略 を 変える と 決め まし た。" },

      /* ---- temps 5 · le barrage ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-egalite-barrage", temps:5, dit:"club", mots:["equipe-nationale"], motsAilleurs:["barrage","penalites"],
        fr:"Si les deux nations terminent avec le même nombre de points, il y aura un barrage.",
        en:"If both nations finish on the same number of penalties, there will be a jump-off.",
        es:"Si las dos naciones terminan con el mismo número de puntos, habrá desempate.",
        it:"Se le due nazioni finiscono con lo stesso numero di penalità, ci sarà un barrage.",
        de:"Wenn beide Nationen mit gleicher Fehlerzahl abschließen, gibt es ein Stechen.",
        ja:"両国 が 同じ 減点 で 終わっ た 場合、 ジャンプオフ に なり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-un-seul-barrage", temps:5, dit:"club", mots:["equipe-nationale","chef-equipe"], motsAilleurs:["barrage"],
        fr:"Un seul cavalier représentera l'équipe au barrage.",
        en:"Only one rider will represent the team in the jump-off.",
        es:"Un solo jinete representará al equipo en el desempate.",
        it:"Un solo cavaliere rappresenterà la squadra al barrage.",
        de:"Nur ein Reiter vertritt die Mannschaft im Stechen.",
        ja:"ジャンプオフ で は 一 人 だけ が チーム を 代表 し ます。" },

      /* 🟥 Phrase de Blandine. Elle a fait RETIRER « ne prends pas de
         risques inutiles, le temps n'est pas notre priorité » — voir
         le commentaire d'en-tête. */
      { ref:"dr-r-sans-faute-victoire", temps:5, dit:"club", mots:["coupe-nations"], motsAilleurs:["sans-faute"],
        fr:"Un sans-faute nous offrirait la victoire dans la Coupe des Nations de Rome.",
        en:"A clear round would give us victory in the Nations Cup in Rome.",
        es:"Un recorrido sin falta nos daría la victoria en la Copa de las Naciones de Roma.",
        it:"Un percorso netto ci darebbe la vittoria nella Coppa delle Nazioni di Roma.",
        de:"Eine Nullrunde würde uns den Sieg im Nationenpreis von Rom bringen.",
        ja:"クリア ラウンド なら、 ローマ の ネーションズ カップ で 優勝 でき ます。" },

      /* ---- temps 6 · ce que je peux dire, moi ---- */
      { ref:"dr-je-passe-quand", temps:6, dit:"joueuse", mots:["ordre-depart","premiere-manche"],
        fr:"Je passe à quel rang dans la première manche ?",
        en:"Where am I in the running order for the first round?",
        es:"¿En qué puesto salgo en la primera manga?",
        it:"In che ordine parto nella prima manche?",
        de:"An welcher Stelle starte ich im ersten Umlauf?",
        ja:"第一 回 走行 で は 何 番目 に 出 ます か ?" },

      { ref:"dr-combien-il-faut", temps:6, dit:"joueuse", mots:["score-ecarte"], motsAilleurs:["sans-faute"],
        fr:"Il me faut un sans-faute, ou est-ce qu'on peut écarter mon score ?",
        en:"Do I need a clear round, or can my score be dropped?",
        es:"¿Necesito un sin falta, o se puede descartar mi resultado?",
        it:"Mi serve un percorso netto, o il mio punteggio può essere scartato?",
        de:"Brauche ich eine Nullrunde, oder kann mein Ergebnis gestrichen werden?",
        ja:"クリア ラウンド が 必要 です か、 それとも 私 の 成績 は 除外 でき ます か ?" },

      { ref:"dr-desole-equipe", temps:6, dit:"joueuse", mots:["coequipier","barre-tombee"],
        fr:"Je suis désolée pour l'équipe, j'ai fait tomber une barre.",
        en:"I'm sorry for the team — I had a rail down.",
        es:"Lo siento por el equipo, he tirado una barra.",
        it:"Mi dispiace per la squadra, ho fatto cadere una barriera.",
        de:"Es tut mir leid für die Mannschaft, ich hatte einen Abwurf.",
        ja:"チーム に 申し訳 あり ませ ん。 バー を 一本 落とし まし た。" },

      { ref:"dr-fiere-de-monter", temps:6, dit:"joueuse", mots:["representer-pays","equipe-nationale"],
        fr:"C'est la première fois que je monte pour mon pays.",
        en:"It's the first time I've ridden for my country.",
        es:"Es la primera vez que monto para mi país.",
        it:"È la prima volta che monto per il mio paese.",
        de:"Es ist das erste Mal, dass ich für mein Land reite.",
        ja:"国 を 代表 し て 乗る の は 今日 が 初めて です。" }
    ]
  }
};
