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
          en:"English says the show, or the event for eventing. « Concourse » exists but means a station hall." } },

  { ref:"engagement", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'engagement"}, en:{m:"the entry", p:"èn-tri"},
           es:{m:"la inscripción"}, it:{m:"l'iscrizione"},
           de:{m:"die Nennung", p:"nè-noung"}, ja:{m:"出場申込", p:"shutsujō mōshikomi"} }, // ??
    def:{ fr:"L'inscription à une épreuve, avec sa date de clôture. À l'étranger, c'est là qu'on découvre qu'il faut une licence du pays ou un passeport à jour — à vérifier des semaines avant, pas la veille.",
          en:"Entering a class, with its closing date. Abroad this is where you find out you need a local membership or an up-to-date passport." } },

  { ref:"epreuve", lecon:1, coll:"engager",
    mots:{ fr:{m:"l'épreuve"}, en:{m:"the class", p:"klass"},
           es:{m:"la prueba"}, it:{m:"la prova"},
           de:{m:"die Prüfung", p:"pru-foung"}, ja:{m:"競技", p:"kyōgi"} },
    def:{ fr:"⚠️ Un des faux amis les plus coûteux du module : l'anglais dit **the class**. Ni « the proof », ni « the trial », ni « the event » — event désigne le concours entier. « Which class are you in ? » veut dire « tu fais quelle épreuve ? ».",
          en:"English says the class. Not proof, not trial, and not event, which means the whole competition." } },

  { ref:"liste-depart", lecon:1, coll:"engager",
    mots:{ fr:{m:"la liste de départ"}, en:{m:"the start list", p:"start liste", var:"the running order"},
           es:{m:"la lista de salida"}, it:{m:"l'ordine di partenza"},
           de:{m:"die Startliste", p:"chtart-liss-te"}, ja:{m:"出場順", p:"shutsujōjun"} }, // ??
    def:{ fr:"L'ordre de passage, affiché la veille ou le matin. Les Britanniques disent aussi **the running order**, et il change souvent : on le revérifie en arrivant, toujours.",
          en:"The order of go, posted the night before or that morning. It changes often, so always check again on arrival." } },

  { ref:"dossard", lecon:1, coll:"engager",
    mots:{ fr:{m:"le dossard"}, en:{m:"the number", p:"neum-beur", var:"number cloth · bridle number"},
           es:{m:"el dorsal"}, it:{m:"il numero di gara"},
           de:{m:"die Startnummer", p:"chtart-nou-meur"}, ja:{m:"ゼッケン", p:"zekken"} },
    def:{ fr:"Sans lui, pas de départ, et il doit rester visible du début à la fin. ⚠️ Curiosité japonaise : **ゼッケン** désigne à la fois le dossard et le tapis de selle (chapitre 4), parce que le numéro se porte justement sur le tapis.",
          en:"No number, no start, and it must stay visible throughout. In Japanese, ゼッケン means both the number and the saddle cloth, since the number is worn on it." } },

  { ref:"secretariat", lecon:1, coll:"engager",
    mots:{ fr:{m:"le secrétariat"}, en:{m:"the show secretary", p:"sè-kre-tri", var:"the show office"},
           es:{m:"la secretaría"}, it:{m:"la segreteria"},
           de:{m:"die Meldestelle", p:"mèl-de-chtè-le"}, ja:{m:"事務局", p:"jimukyoku"} },
    def:{ fr:"Le premier arrêt en arrivant : dossard, horaires, protocoles, forfaits. En Grande-Bretagne, **the secretary** désigne la personne autant que le bureau, et c'est elle qui règle tout.",
          en:"Your first stop on arrival: number, times, sheets, withdrawals. In Britain « the secretary » is both the person and the office." } },

  { ref:"commissaire", lecon:1, coll:"engager",
    mots:{ fr:{m:"le commissaire"}, en:{m:"the steward", p:"stiou-eurd"},
           es:{m:"el comisario"}, it:{m:"il commissario"},
           de:{m:"der Steward", p:"stiou-eurd", var:"der Ordner"}, ja:{m:"スチュワード", p:"suchuwādo"} }, // ??
    def:{ fr:"Il surveille la détente, contrôle les embouchures et fait respecter la sécurité. ⚠️ Le mot anglais **steward** n'a rien à voir avec l'aviation : c'est lui qu'on trouve dans le paddock, et il a autorité pour éliminer.",
          en:"They supervise the warm-up, check tack and enforce safety. « Steward » here has nothing to do with aircraft." } },

  { ref:"chef-piste", lecon:1, coll:"engager",
    mots:{ fr:{m:"le chef de piste"}, en:{m:"the course designer", p:"korss di-zaï-neur", var:"course builder"},
           es:{m:"el jefe de pista"}, it:{m:"il disegnatore di percorsi", var:"il direttore di campo"}, /* it precise (rapport 07/08) */
           de:{m:"der Parcourschef", p:"par-kour-chèf"}, ja:{m:"コースデザイナー", p:"kōsu dezainā"} },
    def:{ fr:"Celui qui dessine le parcours, choisit les distances et décide de la difficulté. ⚠️ L'anglais insiste sur le dessin (**designer**), le français sur l'autorité (le chef), l'allemand mélange les deux.",
          en:"The person who plans the course, sets the distances and decides the difficulty. English stresses the design, French the authority." } },

  { ref:"cocarde", lecon:1, coll:"engager",
    mots:{ fr:{m:"la cocarde"}, en:{m:"the rosette", p:"rô-zètt", var:"ribbon (US)"},
           es:{m:"la escarapela"}, it:{m:"la coccarda"},
           de:{m:"die Schleife", p:"chlaï-fe"}, ja:{m:"ロゼット", p:"rozetto"} }, // ??
    def:{ fr:"Le souvenir que tu rapportes de Badminton. ⚠️ Deux pièges : les Américains disent **ribbon**, et surtout **la couleur de la première place change de pays** — rouge en Grande-Bretagne et en Irlande, bleu aux États-Unis. Un cavalier britannique fier de sa rosette rouge a gagné, pas fini deuxième.",
          en:"Two traps: Americans say ribbon, and first place is red in Britain and Ireland but blue in the United States." } },

  { ref:"prix", lecon:1, coll:"engager",
    mots:{ fr:{m:"le prix"}, en:{m:"the prize money", p:"praïz meu-ni"},
           es:{m:"el premio"}, it:{m:"il premio"},
           de:{m:"das Preisgeld", p:"praïss-guèlt"}, ja:{m:"賞金", p:"shōkin"} },
    def:{ fr:"Dans les épreuves de club, il n'y en a souvent pas — juste la cocarde. Dans les grands concours, il se répartit entre les premiers classés selon un barème affiché à l'avance.",
          en:"At club level there is often none, just the rosette. At big shows it is split among the placings by a published scale." } },

  { ref:"licence", lecon:1, coll:"engager",
    mots:{ fr:{m:"la licence"}, en:{m:"the membership", p:"mèm-beur-chip", var:"the licence"},
           es:{m:"la licencia"}, it:{m:"la tessera"},
           de:{m:"die Turnierlizenz", p:"tour-nir-li-tsèntss"}, ja:{m:"会員証", p:"kaiinshō"} }, // ??
    def:{ fr:"⚠️ Le point qui bloque le plus souvent un cavalier à l'étranger : l'anglais parle de **membership**, l'adhésion à la fédération, pas de « licence ». En Grande-Bretagne, sortir en concours affilié demande d'être membre de British Eventing ou de British Showjumping.",
          en:"The thing that most often blocks a visiting rider: English says membership, not licence. Affiliated shows need you to be a member." } },

  /* ============ LEÇON 2 · LE CONCOURS COMPLET ============ */

  { ref:"concours-complet", lecon:2, coll:"complet",
    mots:{ fr:{m:"le concours complet"}, en:{m:"eventing", p:"i-vèn-ting", var:"horse trials · three-day event"},
           es:{m:"el concurso completo"}, it:{m:"il completo"},
           de:{m:"die Vielseitigkeit", p:"fil-zaï-tirh-kaïte"}, ja:{m:"総合馬術", p:"sōgō bajutsu"} },
    def:{ fr:"Trois tests, un cheval, un cavalier : dressage, cross, obstacle. ⚠️ Aucun mot commun entre les langues. L'anglais dit **eventing**, l'allemand « la polyvalence », le japonais « l'art équestre complet ». Traduire « complete competition » ne sera pas compris.",
          en:"Three tests, one horse, one rider. No shared word: English says eventing, German « versatility », Japanese « complete equestrian art »." } },

  { ref:"cross", lecon:2, coll:"complet",
    mots:{ fr:{m:"le cross"}, en:{m:"the cross-country", p:"kross-keune-tri", var:"XC"},
           es:{m:"el cross"}, it:{m:"il cross"},
           de:{m:"das Gelände", p:"gue-lèn-de"}, ja:{m:"クロスカントリー", p:"kurosu kantorī"} },
    def:{ fr:"Le test de fond, sur obstacles fixes en terrain naturel. ⚠️ L'allemand est le seul à ne rien emprunter : **das Gelände**, « le terrain ». Et les Britanniques abrègent tout en **XC**, y compris à l'écrit sur les horaires.",
          en:"The endurance test, over fixed fences in open country. German borrows nothing: das Gelände, « the terrain ». The British write it XC." } },

  { ref:"trot-presentation", lecon:2, coll:"complet",
    mots:{ fr:{m:"le trot de présentation"}, en:{m:"the trot-up", p:"trot-eup", var:"the horse inspection"},
           es:{m:"la inspección veterinaria"}, it:{m:"l'ispezione veterinaria"},
           de:{m:"die Verfassungsprüfung", p:"fèr-fa-soungs-pru-foung"}, ja:{m:"馬体検査", p:"batai kensa"} }, // ??
    def:{ fr:"Le cheval présenté en main devant un jury vétérinaire, tressé et lustré, qui vérifie qu'il est apte à concourir. On le fait avant le concours et, en complet international, encore le matin de l'obstacle.",
          en:"The horse shown in hand to a veterinary panel, plaited and gleaming, to check it is fit to compete." } },

  { ref:"obstacle-fixe", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'obstacle fixe"}, en:{m:"a fixed fence", p:"fikst fènce", var:"solid fence"},
           es:{m:"el obstáculo fijo"}, it:{m:"l'ostacolo fisso"},
           de:{m:"das feste Hindernis", p:"fès-te hin-deur-niss"}, ja:{m:"固定障害", p:"kotei shōgai"} }, // ??
    def:{ fr:"Il ne tombe pas. C'est toute la différence avec l'obstacle de concours hippique, et c'est la raison pour laquelle le gilet de protection et le casque aux normes sont obligatoires au cross, partout.",
          en:"It does not fall. That is the whole difference from show jumping, and why a body protector and a standard-approved hat are compulsory." } },

  { ref:"talus", lecon:2, coll:"complet",
    mots:{ fr:{m:"le talus"}, en:{m:"the bank", p:"bannk"},
           es:{m:"el talud"}, it:{m:"la banchina", var:"il gradino"}, /* it precise (rapport 07/08) */
           de:{m:"der Wall", p:"val"}, ja:{m:"バンク", p:"banku"} },
    def:{ fr:"Une butte à monter ou à descendre, parfois avec une barre au sommet. Le plus célèbre du monde est le Derby Bank de Hickstead — la ville de l'étape précédente.",
          en:"A mound to climb or drop off, sometimes with a rail on top. The most famous is Hickstead's Derby Bank." } },

  { ref:"contre-bas", lecon:2, coll:"complet",
    mots:{ fr:{m:"le contre-bas"}, en:{m:"the drop", p:"drop", var:"a drop fence"},
           es:{m:"el salto en bajada", var:"el escalón de bajada"}, it:{m:"il salto in discesa"}, /* es precise (rapport 07/08) */
           de:{m:"der Tiefsprung", p:"tif-chproung"}, ja:{m:"ドロップ", p:"doroppu"} },
    def:{ fr:"La réception est plus basse que la battue. Le cavalier laisse filer les rênes et reste en arrière : c'est le seul obstacle où l'on s'interdit d'anticiper.",
          en:"The landing is lower than the take-off. Let the reins slip and stay behind the movement." } },

  { ref:"gue", lecon:2, coll:"complet",
    mots:{ fr:{m:"le gué"}, en:{m:"the water", p:"ouo-teur", var:"the water complex"},
           es:{m:"el paso de agua"}, it:{m:"il passaggio d'acqua"},
           de:{m:"die Wasserdurchfahrt", p:"va-seur-dourh-fart"}, ja:{m:"水中障害", p:"suichū shōgai"} }, // ??
    def:{ fr:"On y entre dans l'eau, on n'y saute pas au-dessus : c'est ce qui le distingue de la rivière du concours hippique. Toujours au pas ou au petit galop, et c'est le point du parcours où le public se masse.",
          en:"You ride into it rather than over it, unlike the show-jumping water. Always the spot where the crowd gathers." } },

  { ref:"option", lecon:2, coll:"complet",
    mots:{ fr:{m:"l'option"}, en:{m:"the long route", p:"long route", var:"the alternative"},
           es:{m:"la opción"}, it:{m:"l'opzione"},
           de:{m:"der Umweg", p:"oum-vék", var:"der Alternativweg"}, ja:{m:"迂回ルート", p:"ukai rūto"} }, /* de precise (rapport 07/08) */
    def:{ fr:"Le chemin plus long et plus sûr, autorisé sur les combinaisons de cross. Prendre l'option coûte des secondes, jamais de pénalités — et un cavalier expérimenté la choisit sans hésiter quand son cheval doute.",
          en:"The longer, safer way through a cross-country combination. It costs seconds, never penalties." } },

  { ref:"temps-optimum", lecon:2, coll:"complet",
    mots:{ fr:{m:"le temps optimum"}, en:{m:"the optimum time", p:"op-ti-meum taïm"},
           es:{m:"el tiempo óptimo"}, it:{m:"il tempo ottimale"},
           de:{m:"die Idealzeit", p:"i-dé-al-tsaïte"}, ja:{m:"規定タイム", p:"kitei taimu"} }, // ??
    def:{ fr:"Le temps de référence du cross, calculé sur la distance et la vitesse imposée. Au-delà, on prend des pénalités seconde par seconde. Ce n'est donc pas une course : c'est un exercice de régularité, chronomètre au poignet.",
          en:"The reference time for cross-country, from distance and required speed. Beyond it, penalties accrue per second — so it is regularity, not racing." } },

  { ref:"carton-jaune", lecon:2, coll:"complet",
    mots:{ fr:{m:"le carton jaune"}, en:{m:"the yellow warning card", p:"yè-lô ouor-ning karde"},
           es:{m:"la tarjeta amarilla"}, it:{m:"il cartellino giallo"},
           de:{m:"die gelbe Karte", p:"guèl-be kar-te"}, ja:{m:"イエローカード", p:"ierō kādo"} },
    def:{ fr:"Il existe vraiment en équitation, et pas seulement au football : le jury le donne pour équitation dangereuse ou mauvais traitement d'un cheval. Deux cartons en un an et le cavalier est suspendu.",
          en:"It really exists in equestrian sport: the ground jury gives it for dangerous riding or abuse of a horse. Two in a year means suspension." } },

  { ref:"niveau", lecon:2, coll:"complet",
    mots:{ fr:{m:"le niveau"}, en:{m:"the level", p:"lè-veul", var:"BE90 · Novice · Intermediate (GB)"},
           es:{m:"el nivel"}, it:{m:"il livello"},
           de:{m:"die Klasse", p:"kla-se"}, ja:{m:"レベル", p:"reberu"} },
    def:{ fr:"⚠️ Le vrai casse-tête du cavalier voyageur : les niveaux ne se traduisent pas. La France classe en Club / Amateur / Pro, la Grande-Bretagne en BE90, BE100, Novice, Intermediate, Advanced — où **Novice n'est pas un niveau de débutant** mais déjà 1,10 m. L'Allemagne numérote de E à S. Il faut convertir en hauteur, jamais en mot.",
          en:"Levels do not translate. Britain's « Novice » is not a beginner level but already 1.10 m. Always convert into height, never into words." } },

  /* ============ LEÇON 3 · LE JOUR J ============ */

  { ref:"van", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le van"}, en:{m:"the trailer", p:"tré-leur", var:"horsebox = le camion (GB)"},
           es:{m:"el remolque", var:"el camión"}, it:{m:"il van", var:"il camion"},
           de:{m:"der Pferdeanhänger", p:"pfèr-de-an-hèn-gueur"}, ja:{m:"馬運車", p:"bāunsha"} }, // ??
    def:{ fr:"⚠️ Faux ami à double fond : le mot français « van » vient de l'anglais *caravan*, mais l'anglais dit **trailer** pour le van attelé et **horsebox** pour le camion. Un Américain, lui, dit *trailer* pour les deux.",
          en:"French « van » comes from caravan, but English says trailer for the towed one and horsebox for the lorry." } },

  { ref:"embarquer", lecon:3, coll:"jour-j", v:true,
    mots:{ fr:{m:"embarquer"}, en:{m:"to load", p:"lôde", var:"to box up"},
           es:{m:"embarcar", var:"cargar"}, it:{m:"caricare"},
           de:{m:"verladen", p:"fèr-la-deune"}, ja:{m:"積み込む", p:"tsumikomu"} }, // ??
    def:{ fr:"Faire monter le cheval dans le van. Le premier obstacle de la journée, et parfois le plus difficile : un cheval qui refuse d'embarquer fait manquer l'épreuve avant même d'être sellé.",
          en:"Getting the horse in. The first obstacle of the day, and sometimes the hardest one." } },

  { ref:"tableau", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le tableau d'affichage"}, en:{m:"the noticeboard", p:"nô-tiss-bord", var:"the board"},
           es:{m:"el tablón de anuncios"}, it:{m:"la bacheca"},
           de:{m:"die Anschlagtafel", p:"an-chlak-ta-feul"}, ja:{m:"掲示板", p:"keijiban"} }, // ??
    def:{ fr:"Horaires, changements d'ordre, résultats, éliminations : tout est là, et rien n'est annoncé deux fois. Le réflexe qui sauve une journée de concours à l'étranger, c'est d'aller le lire toutes les heures.",
          en:"Times, order changes, results, eliminations: it is all there and nothing is announced twice. Read it every hour." } },

  { ref:"speaker", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la sonorisation"}, en:{m:"the tannoy", p:"ta-noï", var:"the announcer · the PA"},
           es:{m:"el locutor", var:"los altavoces"}, it:{m:"lo speaker"},
           de:{m:"der Sprecher", p:"chprè-cheur"}, ja:{m:"アナウンス", p:"anaunsu"} },
    def:{ fr:"⚠️ Mot britannique impossible à deviner : **the tannoy**, du nom d'un fabricant de haut-parleurs, désigne toute la sonorisation d'un concours. « It came over the tannoy » veut dire « ça a été annoncé ».",
          en:"An unguessable British word: the tannoy, from a loudspeaker brand, means the whole PA system." } },

  { ref:"appel", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"l'appel"}, en:{m:"the call", p:"kôl", var:"you're next · you're on"},
           es:{m:"la llamada"}, it:{m:"la chiamata"},
           de:{m:"der Aufruf", p:"aouf-rouf"}, ja:{m:"呼び出し", p:"yobidashi"} },
    def:{ fr:"Le moment où le commissaire t'appelle pour entrer en piste. Les deux phrases à reconnaître d'urgence en anglais : **« you're next »** et **« you're on »** — la seconde veut dire maintenant.",
          en:"When the steward calls you in. Two phrases to recognise instantly: « you're next » and « you're on » — the second means now." } },

  { ref:"resultat", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le résultat"}, en:{m:"the result", p:"ri-zeult", var:"the scores"},
           es:{m:"el resultado"}, it:{m:"il risultato"},
           de:{m:"das Ergebnis", p:"èr-guép-niss"}, ja:{m:"結果", p:"kekka"} },
    def:{ fr:"Affiché au tableau, rarement annoncé. En complet, il s'exprime en points de pénalité cumulés sur les trois tests, et le meilleur score est le plus bas — l'inverse du dressage seul.",
          en:"Posted on the board, rarely announced. In eventing it is cumulative penalties across three tests, and the lowest score wins." } },

  { ref:"remise-prix", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"la remise des prix"}, en:{m:"the prize-giving", p:"praïz-gui-ving"},
           es:{m:"la entrega de premios"}, it:{m:"la premiazione"},
           de:{m:"die Siegerehrung", p:"zi-gueur-é-roung"}, ja:{m:"表彰式", p:"hyōshōshiki"} },
    def:{ fr:"À cheval le plus souvent, cocarde au frontal. Y aller compte : un classé absent fait attendre tout le monde, et c'est très mal vu partout.",
          en:"Usually mounted, rosette on the browband. Turning up matters: a missing placed rider keeps everyone waiting." } },

  { ref:"groom", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le groom"}, en:{m:"the groom", p:"groum"},
           es:{m:"el mozo de cuadra"}, it:{m:"il groom"},
           de:{m:"der Pfleger", p:"pflé-gueur"}, ja:{m:"厩務員", p:"kyūmuin"} },
    def:{ fr:"⚠️ Piège grammatical parfait : en anglais, **groom** est la *personne* qui s'occupe du cheval, alors que *to groom* est le geste de panser (chapitre 2). « My groom is holding him » ne veut pas dire qu'on le brosse.",
          en:"A perfect trap: « groom » is the person, while « to groom » is the act of brushing. « My groom is holding him » is not about brushing." } },

  { ref:"trac", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le trac"}, en:{m:"the nerves", p:"neurvz", var:"butterflies"},
           es:{m:"los nervios"}, it:{m:"il nervosismo"},
           de:{m:"das Lampenfieber", p:"lam-peune-fi-beur"}, ja:{m:"緊張", p:"kinchō"} },
    def:{ fr:"Chaque langue a choisi son image : l'anglais a des papillons dans le ventre (*butterflies*), l'allemand « la fièvre des lampes » — celle du théâtre. Et un cheval sent le trac de son cavalier avant que lui-même l'admette.",
          en:"Each language picked an image: English has butterflies, German « lamp fever » from the theatre. And a horse feels it before the rider admits it." } },

  { ref:"bonne-chance", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"bonne chance"}, en:{m:"good luck", p:"goude leuk", var:"⚠️ jamais « break a leg » à cheval"},
           es:{m:"buena suerte", var:"mucha suerte"}, it:{m:"buona fortuna", var:"in bocca al lupo"},
           de:{m:"viel Glück", p:"fil gluk", var:"Hals- und Beinbruch"}, ja:{m:"頑張って", p:"ganbatte"} },
    def:{ fr:"Le piège le plus savoureux du module. L'allemand souhaite littéralement **« que tu te casses le cou et la jambe »** (*Hals- und Beinbruch*), l'italien envoie **« dans la gueule du loup »** (*in bocca al lupo*, auquel on répond *crepi il lupo*), et l'anglais a bien *break a leg* — mais au théâtre seulement, jamais à un cavalier.",
          en:"The best trap in the module: German literally wishes you a broken neck and leg, Italian sends you into the wolf's mouth, and English keeps « break a leg » for the theatre." } },

  /* ============ LEÇON 4 · LES GENS ET LES RÈGLES ============ */

  { ref:"concurrent", lecon:4, coll:"gens",
    mots:{ fr:{m:"le concurrent"}, en:{m:"the competitor", p:"kom-pè-ti-teur"},
           es:{m:"el participante"}, it:{m:"il concorrente"},
           de:{m:"der Teilnehmer", p:"taïl-né-meur"}, ja:{m:"出場者", p:"shutsujōsha"} }, // ??
    def:{ fr:"Toi, le temps d'une journée. L'allemand est le plus doux des six : *Teilnehmer*, « celui qui prend part » — pas celui qui concourt.",
          en:"You, for a day. German is the gentlest of the six: Teilnehmer, « the one who takes part »." } },

  { ref:"proprietaire", lecon:4, coll:"gens",
    mots:{ fr:{m:"le propriétaire"}, en:{m:"the owner", p:"ô-neur"},
           es:{m:"el propietario"}, it:{m:"il proprietario"},
           de:{m:"der Besitzer", p:"be-zit-seur"}, ja:{m:"馬主", p:"banushi"} },
    def:{ fr:"Souvent absent du terrain, toujours présent sur les papiers. En Grande-Bretagne, on remercie publiquement les owners après une victoire : c'est un usage, pas une politesse.",
          en:"Often absent from the ground, always on the paperwork. In Britain, owners are publicly thanked after a win." } },

  { ref:"entraineur", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'entraîneur"}, en:{m:"the trainer", p:"tré-neur", var:"the coach"},
           es:{m:"el entrenador"}, it:{m:"l'allenatore"},
           de:{m:"der Trainer", p:"tré-neur"}, ja:{m:"コーチ", p:"kōchi"} },
    def:{ fr:"⚠️ Nuance britannique utile : **trainer** entraîne les chevaux, **coach** entraîne les cavaliers. Demander « who's your coach ? » et « who trains your horse ? » n'appelle pas la même réponse.",
          en:"A useful British nuance: a trainer trains horses, a coach trains riders." } },

  { ref:"jury", lecon:4, coll:"gens",
    mots:{ fr:{m:"le jury"}, en:{m:"the ground jury", p:"graounde djou-ri", var:"the panel"},
           es:{m:"el jurado"}, it:{m:"la giuria"},
           de:{m:"die Jury", p:"jou-ri", var:"das Richterkollegium"}, ja:{m:"審判団", p:"shinpandan"} }, // ??
    def:{ fr:"L'ensemble des officiels qui décident, distinct du juge unique du dressage. En anglais on précise **ground jury** — le jury « au sol », par opposition aux commissaires en piste.",
          en:"The officials who decide, as opposed to the single dressage judge. English specifies the ground jury." } },

  { ref:"reclamation", lecon:4, coll:"gens",
    mots:{ fr:{m:"la réclamation"}, en:{m:"an objection", p:"ob-djèk-cheune", var:"to lodge a complaint"},
           es:{m:"la reclamación"}, it:{m:"il reclamo"},
           de:{m:"der Einspruch", p:"aïn-chprourh"}, ja:{m:"異議申立", p:"igi mōshitate"} }, // ??
    def:{ fr:"Contester une décision, dans un délai court et souvent contre une caution. À l'étranger, la première question à poser n'est pas « comment réclamer » mais « à qui » : c'est presque toujours au secrétariat, pas au juge.",
          en:"Challenging a decision, within a short deadline and often against a deposit. Ask who to go to — usually the secretary, not the judge." } },

  { ref:"reglement", lecon:4, coll:"gens",
    mots:{ fr:{m:"le règlement"}, en:{m:"the rules", p:"roulz", var:"the rule book"},
           es:{m:"el reglamento"}, it:{m:"il regolamento"},
           de:{m:"die Turnierordnung", p:"tour-nir-ord-noung"}, ja:{m:"規定", p:"kitei"} },
    def:{ fr:"Chaque pays a le sien, en plus du règlement international. C'est là que se cachent les différences qui surprennent : muserolles autorisées, âge minimum, obligation du gilet, tenue exigée.",
          en:"Every country has its own on top of the international rules — where the surprising differences hide." } },

  { ref:"minima", lecon:4, coll:"gens",
    mots:{ fr:{m:"la note minimale"}, en:{m:"the qualifying score", p:"kva-li-faï-ing skor", var:"an MER (FEI)"},
           es:{m:"la nota mínima"}, it:{m:"il punteggio minimo"},
           de:{m:"die Qualifikation", p:"kva-li-fi-ka-tsi-ône"}, ja:{m:"資格得点", p:"shikaku tokuten"} }, // ??
    def:{ fr:"Le résultat qu'il faut atteindre pour accéder au niveau suivant. En complet international, l'acronyme à connaître est **MER** — *minimum eligibility requirement*, la performance minimale exigée.",
          en:"The result needed to move up a level. In international eventing the acronym is MER: minimum eligibility requirement." } },

  { ref:"championnat", lecon:4, coll:"gens",
    mots:{ fr:{m:"le championnat"}, en:{m:"the championship", p:"tcham-pieune-chip"},
           es:{m:"el campeonato"}, it:{m:"il campionato"},
           de:{m:"die Meisterschaft", p:"maïss-teur-chaft"}, ja:{m:"選手権", p:"senshuken"} },
    def:{ fr:"Le titre annuel, par catégorie et par pays. Badminton n'en est pas un : c'est un concours privé, plus prestigieux que bien des championnats — la géographie du prestige équestre ne suit pas les titres.",
          en:"The annual title, by category and country. Badminton is not one: it is a private event, more prestigious than many championships." } },

  { ref:"trophee", lecon:4, coll:"gens",
    mots:{ fr:{m:"le trophée"}, en:{m:"the trophy", p:"trô-fi", var:"the cup"},
           es:{m:"el trofeo"}, it:{m:"il trofeo"},
           de:{m:"der Pokal", p:"po-kal"}, ja:{m:"トロフィー", p:"torofī"} },
    def:{ fr:"Souvent un challenge : on le gagne pour un an et on le rend l'année suivante, avec son nom gravé dessus. Les grands trophées britanniques sont plus vieux que la plupart des fédérations.",
          en:"Often a perpetual trophy: won for a year, returned the next with your name engraved on it." } },

  { ref:"esprit-sportif", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'esprit sportif"}, en:{m:"sportsmanship", p:"sportss-meun-chip", var:"well ridden !"},
           es:{m:"la deportividad"}, it:{m:"la sportività"},
           de:{m:"die Sportlichkeit", p:"chport-lirh-kaïte", var:"Fairplay"}, ja:{m:"スポーツマンシップ", p:"supōtsumanshippu"} },
    def:{ fr:"La phrase la plus utile de tout le chapitre, dans les six langues : **bravo, joli parcours**. La dire à quelqu'un qui vient de sortir de piste ouvre plus de portes dans une écurie étrangère que n'importe quel classement. En Grande-Bretagne on dit simplement **« well ridden ! »**.",
          en:"The most useful sentence in the chapter: « well ridden ! ». Saying it to someone leaving the arena opens more doors abroad than any placing." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-epreuve", lecon:1,
      fr:"Tu fais quelle épreuve, et à quelle heure tu passes ?",
      en:"Which class are you in, and what time are you on ?",
      es:"¿ En qué prueba estás y a qué hora sales ?",
      it:"In quale prova sei e a che ora entri ?",
      de:"In welcher Prüfung startest du, und wann ?",
      ja:"どの 競技 に 出場 し ます か 。 出番 は 何時 です か ?" },
    { ref:"ou-secretariat", lecon:1,
      fr:"Où est le secrétariat ? Je viens chercher mon dossard.",
      en:"Where's the show secretary ? I've come for my number.",
      es:"¿ Dónde está la secretaría ? Vengo a por el dorsal.",
      it:"Dov'è la segreteria ? Vengo a prendere il numero.",
      de:"Wo ist die Meldestelle ? Ich hole meine Startnummer.",
      ja:"事務局 は どこ です か 。 ゼッケン を 受け取り に 来 ました 。" },
    { ref:"licence-etrangere", lecon:1,
      fr:"J'ai une licence française, ça suffit pour concourir ici ?",
      en:"I've got a French membership — is that enough to compete here ?",
      es:"Tengo licencia francesa, ¿ basta para competir aquí ?",
      it:"Ho la tessera francese, basta per gareggiare qui ?",
      de:"Ich habe eine französische Lizenz, genügt das hier ?",
      ja:"フランス の 会員証 が あり ます が 、 出場 でき ます か ?" },
    { ref:"niveau-equivalent", lecon:2,
      fr:"Votre niveau Novice, ça fait quelle hauteur exactement ?",
      en:"What height is your Novice level, exactly ?",
      es:"¿ Qué altura tiene vuestro nivel Novice, exactamente ?",
      it:"Che altezza ha il vostro livello Novice, esattamente ?",
      de:"Welcher Höhe entspricht eure Klasse Novice genau ?",
      ja:"Novice は 正確 に は 何 センチ です か ?" },
    { ref:"temps-optimum-cross", lecon:2,
      fr:"Le temps optimum du cross est de six minutes vingt.",
      en:"The optimum time for the cross-country is six twenty.",
      es:"El tiempo óptimo del cross es de seis veinte.",
      it:"Il tempo ottimale del cross è sei e venti.",
      de:"Die Idealzeit im Gelände ist sechs Minuten zwanzig.",
      ja:"クロスカントリー の 規定 タイム は 六 分 二十 秒 です 。" },
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
