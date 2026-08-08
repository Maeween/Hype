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

  { ref:"talus", lecon:2, coll:"complet",
    mots:{ fr:{m:"le talus"}, en:{m:"the bank", p:"bannk"},
           es:{m:"el talud"}, it:{m:"la banchina", var:"il gradino"}, /* it precise (rapport 07/08) */
           de:{m:"der Wall", p:"val"}, ja:{m:"バンク", p:"banku"} },
    def:{ fr:"Une butte à monter ou à descendre, parfois avec une barre au sommet. Le plus célèbre du monde est le Derby Bank de Hickstead — la ville de l'étape précédente.",
          en:"A mound to climb or drop off, sometimes with a rail on top. The most famous is Hickstead's Derby Bank.",
          es:"Una loma que subir o bajar, a veces con una barra en la cima. El más célebre del mundo es el Derby Bank de Hickstead — la ciudad de la etapa anterior.",
          it:"Una collinetta da salire o scendere, a volte con una barriera in cima. Il più celebre al mondo è il Derby Bank di Hickstead — la città della tappa precedente.",
          de:"Ein Wall zum Hinauf- oder Hinabreiten, manchmal mit Stange auf der Kuppe. Der berühmteste der Welt ist die Derby Bank von Hickstead — der Stadt der vorigen Etappe.",
          ja:"登り、あるいは下る土手。頂上にバーが載ることもあります。世界一有名なのはヒックステッドのダービー・バンク — ひとつ前の街のあれです。" } },

  { ref:"contre-bas", lecon:2, coll:"complet",
    mots:{ fr:{m:"le contre-bas"}, en:{m:"the drop", p:"drop", var:"a drop fence"},
           es:{m:"el salto en bajada", var:"el escalón de bajada"}, it:{m:"il salto in discesa"}, /* es precise (rapport 07/08) */
           de:{m:"der Tiefsprung", p:"tif-chproung"}, ja:{m:"ドロップ", p:"doroppu"} },
    def:{ fr:"La réception est plus basse que la battue. Le cavalier laisse filer les rênes et reste en arrière : c'est le seul obstacle où l'on s'interdit d'anticiper.",
          en:"The landing is lower than the take-off. Let the reins slip and stay behind the movement.",
          es:"La recepción es más baja que la batida. El jinete deja correr las riendas y se queda atrás: es el único obstáculo donde uno se prohíbe anticipar.",
          it:"La ricezione è più bassa dello stacco. Il cavaliere lascia scorrere le redini e resta indietro: è l'unico ostacolo dove ci si vieta di anticipare.",
          de:"Die Landung liegt tiefer als der Absprung. Der Reiter lässt die Zügel gleiten und bleibt zurück: das einzige Hindernis, an dem man sich das Vorgreifen verbietet.",
          ja:"着地が踏切より低い障害。騎手は手綱を滑らせ、上体を後ろに残します。先回りを自分に禁じる、唯一の障害です。" } },

  { ref:"gue", lecon:2, coll:"complet",
    mots:{ fr:{m:"le gué"}, en:{m:"the water", p:"ouo-teur", var:"the water complex"},
           es:{m:"el paso de agua"}, it:{m:"il passaggio d'acqua"},
           de:{m:"die Wasserdurchfahrt", p:"va-seur-dourh-fart"}, ja:{m:"水中障害", p:"suichū shōgai"} }, // ??
    def:{ fr:"On y entre dans l'eau, on n'y saute pas au-dessus : c'est ce qui le distingue de la rivière du concours hippique. Toujours au pas ou au petit galop, et c'est le point du parcours où le public se masse.",
          en:"You ride into it rather than over it, unlike the show-jumping water. Always the spot where the crowd gathers.",
          es:"Se entra en el agua, no se salta por encima: eso lo distingue de la ría del salto. Siempre al paso o al galope corto, y es el punto del recorrido donde se agolpa el público.",
          it:"Ci si entra nell'acqua, non ci si salta sopra: è ciò che lo distingue dalla riviera del salto ostacoli. Sempre al passo o al piccolo galoppo, ed è il punto del percorso dove si ammassa il pubblico.",
          de:"Man reitet ins Wasser hinein, nicht darüber: Das unterscheidet ihn vom Wassergraben des Springens. Immer im Schritt oder ruhigen Galopp — und der Punkt, an dem sich das Publikum drängt.",
          ja:"水の中へ入っていく障害。上を跳び越すのではありません — 障害馬術の水濠との違いはそこです。常歩か抑えた駈歩で。そして観客がいちばん集まるのも、この地点です。" } },

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

  { ref:"bonne-chance", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"bonne chance"}, en:{m:"good luck", p:"goude leuk", var:"⚠️ jamais « break a leg » à cheval"},
           es:{m:"buena suerte", var:"mucha suerte"}, it:{m:"buona fortuna", var:"in bocca al lupo"},
           de:{m:"viel Glück", p:"fil gluk", var:"Hals- und Beinbruch"}, ja:{m:"頑張って", p:"ganbatte"} },
    def:{ fr:"Le piège le plus savoureux du module. L'allemand souhaite littéralement **« que tu te casses le cou et la jambe »** (*Hals- und Beinbruch*), l'italien envoie **« dans la gueule du loup »** (*in bocca al lupo*, auquel on répond *crepi il lupo*), et l'anglais a bien *break a leg* — mais au théâtre seulement, jamais à un cavalier.",
          en:"The best trap in the module: German literally wishes you a broken neck and leg, Italian sends you into the wolf's mouth, and English keeps « break a leg » for the theatre.",
          es:"La trampa más sabrosa del módulo. El alemán desea literalmente **« que te rompas el cuello y la pierna »** (*Hals- und Beinbruch*), el italiano manda **« a la boca del lobo »** (*in bocca al lupo*, al que se responde *crepi il lupo*), y el inglés tiene *break a leg* — pero solo en el teatro, jamás a un jinete.",
          it:"La trappola più gustosa del modulo. Il tedesco augura alla lettera **« che tu ti rompa il collo e la gamba »** (*Hals- und Beinbruch*), l'italiano manda **« in bocca al lupo »** (a cui si risponde *crepi il lupo*), e l'inglese ha *break a leg* — ma solo a teatro, mai a un cavaliere.",
          de:"Die köstlichste Falle des Moduls. Das Deutsche wünscht wörtlich **Hals- und Beinbruch**, das Italienische schickt einen **« in den Rachen des Wolfs »** (*in bocca al lupo* — Antwort: *crepi il lupo*), und das Englische hat *break a leg* — aber nur im Theater, nie für Reiter.",
          ja:"この教材でいちばん味わい深い罠。ドイツ語は文字どおり**「首と脚を折れ」**（*Hals- und Beinbruch*）と願い、イタリア語は**「狼の口の中へ」**（*in bocca al lupo* — 返事は *crepi il lupo*）と送り出します。英語の *break a leg* は劇場だけの言葉 — 騎手には決して言いません。" } },

  /* ============ LEÇON 4 · LES GENS ET LES RÈGLES ============ */

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
  ]
};
