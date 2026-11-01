/* =====================================================================================
   hype-cours-galop5-v2.js — GALOP 5 : LES NOUVEAUX COURS (modèle éditorial des Galops 1 à 4)
   01/11/2026 — demande de Blandine (17h34) : « Tu peux commencer à préparer les mêmes modèles de cours pour les G5 à 9 »,
   puis (17h55) « Tu peux faire si tu veux et on valide avec Chat après ».
   Liste des 12 cours = celle de la page Galop 5 (G5_THEMES, identifiants g5n-01 … g5n-12), d'après le programme FFE.
   « Les embouchures » (g5n-02) garde sa propre page (hype-cours-g5-embouchures.js).
   Format = celui des Galops 1 à 3 (blocs « texte-riche ») : le modèle commun (hype-cours-editorial.js, construireAuto)
   en tire les chapitres, le conseil du coach, le défi, les questions Hey Baby, la synthèse et la phrase de fin.
   Brouillons d'origine (g5-c1 … g5-c6, hype-cours-galop5.js) : leur contenu est repris ici, rien n'est perdu.
   ÉTAT : FRANÇAIS SEUL, EN RELECTURE (Blandine + ChatGPT). Traduction des 14 langues après validation.
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined") return;
var S = function (titre, sous, puces) { var o = { k: "section", titre: titre }; if (sous) o.sous = sous; if (puces) o.puces = puces.map(function (p) { return typeof p === "string" ? { texte: p } : p; }); return o; };
var P = function (texte) { return { k: "para", texte: texte }; };
var E = function (emoji, titre, texte) { var o = { k: "encadre", emoji: emoji, texte: texte }; if (titre) o.titre = titre; return o; };
var B = function (titre, contenu) { return { type: "texte-riche", aere: true, titre: { fr: titre }, contenu: { fr: contenu } }; };
var Q = function (question, options, correct, explication) { return { type: "qcm", question: { fr: question }, options: { fr: options }, correct: correct, explication: { fr: explication } }; };

var COURS = [

/* ---------------------------------------------------------------------------------
   g5n-03 — COMMENT APPREND LE CHEVAL ?   (programme FFE Galop 5 : « connaître et expliquer
   les grands principes de l'apprentissage du cheval ») — reprend le brouillon g5-c5
   --------------------------------------------------------------------------------- */
{ id: "g5n-03", icone: "🧠", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Comment apprend le cheval ?" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-cours-provisoire.jpg", couv: {} },

    B("Un cerveau de proie", [
      P("Ton cheval apprend à chaque instant : quand tu le panses, quand tu le mènes, quand tu le montes. Il apprend même quand tu ne cherches pas à lui apprendre quelque chose. Comprendre comment il apprend, c'est pouvoir l'éduquer sans le brusquer, et éviter de lui apprendre des choses que tu ne voulais pas."),
      S("🦓 Un animal de fuite", "Le cheval est une proie. Pendant des millions d'années, sa survie a dépendu d'une seule règle : réagir vite, réfléchir après. Face à ce qui l'inquiète, son premier réflexe est de fuir.", [
        "Un cheval qui a peur n'apprend pas : il cherche d'abord à se mettre en sécurité.",
        "Un cheval calme et attentif apprend beaucoup plus vite.",
        "Ton calme fait partie de la leçon : il le perçoit et s'y appuie."
      ]),
      S("🧩 Il apprend par association", "Le cheval ne raisonne pas comme nous. Il relie ce qu'il vient de faire à ce qui se passe juste après. C'est cette association, répétée, qui crée une habitude.", [
        "Le bruit du seau annonce le repas : il hennit dès qu'il l'entend.",
        "La jambe qui se relâche quand il avance lui apprend qu'avancer était la bonne réponse.",
        "Ce qui se passe plusieurs secondes après n'est plus relié à son geste."
      ]),
      S("🗂️ Une mémoire très solide", "Le cheval retient longtemps ce qu'il a appris, le bon comme le mauvais. Une mauvaise expérience peut laisser une trace durable : un cheval qui s'est fait peur dans un van peut refuser d'y remonter pendant longtemps.")
    ]),

    B("Les grands principes", [
      P("Au Galop 5, on retient quatre mécanismes. Ils fonctionnent tous en même temps, que tu le veuilles ou non."),
      S("🔁 L'habituation", "Le cheval cesse peu à peu de réagir à quelque chose qui se répète et qui ne présente aucun danger.", [
        "Exemple : une bâche posée au bord de la carrière, qu'il finit par ignorer.",
        "On avance par petites étapes, sans jamais le mettre en situation de panique.",
        "On s'arrête quand il est détendu, pas quand il a peur."
      ]),
      S("📈 La sensibilisation", "C'est l'inverse : le cheval devient plus réactif à un signal. C'est utile quand on veut qu'il réponde à une aide plus légère, mais cela peut aussi le rendre craintif ou nerveux.", [
        "Exemple utile : il répond à une jambe de plus en plus légère.",
        "Exemple à éviter : il sursaute dès que tu lèves la main, parce qu'un geste brusque l'a déjà surpris."
      ]),
      S("➖ Le renforcement négatif", "On retire une pression dès que le cheval donne la bonne réponse. C'est le relâchement qui le récompense. C'est le cœur de l'équitation.", [
        "La jambe presse, le cheval avance, la jambe se relâche aussitôt.",
        "La main résiste, le cheval ralentit, la main cède.",
        "Si la pression ne s'arrête jamais, le cheval ne sait pas ce qu'on attend : il finit par ne plus y répondre."
      ]),
      S("➕ Le renforcement positif", "On ajoute quelque chose d'agréable juste après la bonne réponse : la voix, une pause, une friandise à pied, un grattage au garrot. Il donne envie au cheval de recommencer.", [
        "Le grattage au garrot lui fait plus d'effet qu'une petite tape sur l'encolure.",
        "La friandise se donne à pied et seulement après une demande réussie, jamais quand il la réclame."
      ]),
      E("⚠️", "Et la punition ?", "La punition ajoute quelque chose de désagréable pour faire cesser un comportement. Mal employée, elle crée la peur, la confusion et des défenses. Au Galop 5, tu ne punis pas : face à un comportement dangereux, tu te mets en sécurité et tu appelles ton enseignant.")
    ]),

    B("Bien demander, bien récompenser", [
      S("⏱️ Le bon moment", "Pour que le cheval comprenne, la récompense doit tomber au moment exact de la bonne réponse, ou dans les toutes premières secondes qui suivent.", [
        "Rendre la jambe dès qu'il avance, pas trois foulées plus tard.",
        "Féliciter à la voix pendant le bon geste, pas à la fin de la séance."
      ]),
      S("🪶 Demander léger, puis plus fort, puis relâcher", "Commence toujours par l'aide la plus légère. Si le cheval ne répond pas, augmente progressivement. Dès qu'il répond, relâche tout. La fois suivante, recommence par l'aide légère : c'est elle qu'il apprendra à écouter."),
      S("🧭 Être clair et constant", "Le cheval apprend mieux quand le même signal veut toujours dire la même chose.", [
        "Une demande à la fois.",
        "Les mêmes aides pour la même réponse, séance après séance.",
        "Les cavaliers d'un même cheval s'accordent sur les règles : on ne laisse pas pousser à pied un jour et pas le lendemain."
      ]),
      S("🔂 Des séances courtes, qui finissent bien", "Un exercice nouveau se travaille par petites répétitions, avec des pauses. On termine sur une réussite, même petite : c'est le dernier souvenir de la séance qui reste.", [
        "Une pause en rênes longues est une récompense en soi.",
        "Si ça ne marche pas, on revient à une étape plus facile plutôt que d'insister."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pense « demander, obtenir, rendre ». Le cheval apprend surtout au moment où tu rends : si tu continues à pousser ou à tirer après sa réponse, il ne peut pas savoir qu'il a bien fait."),
      E("💡", "Le savais-tu ?", "Des études ont montré que des chevaux se souviennent encore, plusieurs années après, d'exercices appris une seule fois correctement. C'est une raison de plus pour soigner les premières fois : premier van, premier obstacle, première sortie en extérieur.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Punir après coup : le cheval relie la punition à ce qu'il fait au moment où elle arrive, pas à la bêtise d'avant.",
        "Garder une pression continue (jambe qui serre, main qui tire) : le cheval s'y endurcit et devient « dur » aux aides.",
        "Donner une friandise quand le cheval pousse ou fouille les poches : on récompense l'insistance.",
        "Répéter un exercice raté jusqu'à l'énervement : on apprend surtout au cheval à se défendre.",
        "Confondre peur et désobéissance : un cheval qui a peur a besoin d'être rassuré, pas corrigé."
      ]),
      S("🏇 Le défi du cavalier", "Pendant ta prochaine séance, observe le moment exact où tu rends tes aides.", [
        "Avant de monter, choisis avec ton enseignant une transition à travailler, par exemple pas-trot.",
        "Pendant la séance, relâche la jambe dès la première foulée de trot obtenue, puis note si ton cheval répond plus vite à la demande suivante.",
        "Après la séance, dis à ton enseignant à quelle aide légère ton cheval a fini par répondre."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi mon cheval a-t-il peur d'un objet qu'il voit tous les jours ?",
        "Comment savoir si je relâche mes aides au bon moment ?",
        "Quelle différence entre renforcement négatif et punition ?",
        "Comment habituer mon cheval à la tondeuse sans le stresser ?",
        "Pourquoi mon cheval devient-il de moins en moins sensible à ma jambe ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Le cheval est une proie : la peur bloque l'apprentissage.",
        "Il relie son geste à ce qui arrive juste après.",
        "Le relâchement de la pression est sa récompense.",
        "Demande léger, augmente si besoin, rends dès qu'il répond.",
        "Des séances courtes qui finissent sur une réussite."
      ]),
      E("", "", "Un cheval n'obéit jamais aussi bien que lorsqu'il a compris ce qu'on attendait de lui.")
    ])
  ],
  quiz: [
    Q("Céder la pression de la jambe dès que le cheval avance, c'est…", ["De la punition", "Du renforcement négatif", "De l'habituation", "De la sensibilisation"], 1, "Retirer une pression dès la bonne réponse est un renforcement négatif : le relâchement récompense le cheval."),
    Q("Habituer progressivement un cheval à une bâche qui ne le menace pas, c'est…", ["La sensibilisation", "L'habituation", "La punition", "Le renforcement positif"], 1, "L'habituation : face à un stimulus répété et sans danger, le cheval cesse peu à peu d'y réagir."),
    Q("Pourquoi un cheval qui a peur apprend-il mal ?", ["Parce qu'il est têtu", "Parce que son premier réflexe est de se mettre en sécurité", "Parce qu'il a une mauvaise mémoire", "Parce qu'il est fatigué"], 1, "Le cheval est une proie : quand il a peur, il cherche d'abord à fuir ou à se protéger, pas à comprendre ta demande."),
    Q("Quand faut-il récompenser le cheval pour qu'il comprenne ?", ["À la fin de la séance", "Au moment exact de la bonne réponse, ou juste après", "Le lendemain", "Quand il a fait dix fois l'exercice"], 1, "Le cheval relie la récompense à ce qu'il fait au moment où elle arrive : elle doit tomber pendant ou juste après la bonne réponse."),
    Q("Une jambe qui serre en permanence…", ["Rend le cheval plus attentif", "Endurcit le cheval aux aides", "Le récompense", "N'a aucun effet"], 1, "Sans relâchement, le cheval ne peut pas savoir qu'il a bien répondu : il finit par ne plus réagir à la jambe."),
    Q("Quel ordre est le bon pour une demande ?", ["Fort, puis léger", "Léger, puis plus fort si besoin, puis relâcher", "Toujours fort", "Relâcher, puis demander"], 1, "On commence par l'aide la plus légère, on augmente seulement si nécessaire, et on relâche dès la réponse."),
    Q("Donner une friandise à un cheval qui fouille tes poches…", ["L'apprend à être poli", "Récompense son insistance", "Le calme durablement", "N'a aucune conséquence"], 1, "Le cheval associe la friandise à ce qu'il faisait : fouiller. Il recommencera de plus belle."),
    Q("Ton cheval se défend après une punition donnée plusieurs secondes après sa bêtise. Pourquoi ?", ["Il est rancunier", "Il ne relie pas la punition à la bêtise d'avant", "Il n'a pas eu assez mal", "Il veut jouer"], 1, "Le cheval associe ce qui lui arrive à ce qu'il fait à ce moment-là : une punition décalée n'est pas comprise et crée de la confusion."),
    Q("Comment terminer une séance où l'on apprend quelque chose de nouveau ?", ["Sur l'exercice le plus difficile", "Sur une réussite, même petite", "Quand le cheval est épuisé", "Sur une erreur, pour qu'il s'en souvienne"], 1, "C'est le dernier souvenir de la séance qui reste : finir sur une réussite aide le cheval à retenir la bonne réponse."),
    Q("Le cheval sursaute dès que tu lèves la main près de sa tête. Quel mécanisme est en jeu ?", ["L'habituation", "La sensibilisation", "Le renforcement positif", "La rectitude"], 1, "Le cheval est devenu plus réactif à ce geste, souvent après une mauvaise expérience : c'est une sensibilisation.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-01 — LE MATÉRIEL, LA CARRIÈRE ET LES OBSTACLES   (programme FFE Galop 5, connaissances générales :
   lettres de la carrière de dressage, principaux obstacles de CSO, démarches d'engagement en compétition,
   serpentines, vocabulaire) — reprend le brouillon g5-c3
   --------------------------------------------------------------------------------- */
{ id: "g5n-01", icone: "🏟️", type: { fr: "culture" }, duree: { fr: "10 min" }, titre: { fr: "La carrière, les obstacles et la compétition" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-reprises-hd2.jpg", couv: {} },

    B("La carrière de dressage", [
      P("Au Galop 5, tu présentes des reprises de dressage de niveau Club 3 et des parcours d'obstacles plus construits. Pour être précis, il faut connaître le terrain sur lequel tu travailles, savoir nommer ce que tu sautes, et comprendre comment on s'inscrit à un concours."),
      S("📐 Le rectangle et ses lettres", "La carrière de dressage la plus utilisée en club mesure 20 m sur 40 m. Des lettres placées sur le pourtour servent de repères : chaque figure de la reprise commence et se termine à une lettre précise.", [
        "Sur le pourtour, dans l'ordre : A, K, E, H, C, M, B, F.",
        "A et C sont au milieu des petits côtés, E et B au milieu des grands côtés.",
        "Au centre, la lettre X. Sur la ligne du milieu, entre A et C, on trouve aussi D, X et G, qui ne sont pas affichées : on les repère à l'œil.",
        "Sur une carrière de 20 m sur 60 m, on ajoute des lettres sur les grands côtés : la règle reste la même, on suit le pourtour."
      ]),
      S("〰️ La serpentine", "Une serpentine est une suite de boucles qui traversent la carrière d'un grand côté à l'autre. À chaque passage sur la ligne du milieu, le cheval change de main et donc d'incurvation.", [
        "Elle part de A ou de C et se termine sur le petit côté opposé.",
        "Dans un rectangle de 20 m sur 40 m, une serpentine de 3 boucles touche le grand côté à chaque boucle.",
        "Les boucles doivent avoir la même taille : on les prépare en regardant loin devant.",
        "Au moment de traverser la ligne du milieu, le cheval est droit pendant une ou deux foulées, puis s'incurve de l'autre côté."
      ]),
      S("🧭 Les autres figures à connaître", null, [
        { gras: "Le cercle :", texte: "une courbe régulière de 20 m (toute la largeur), 15 m ou 12 m de diamètre." },
        { gras: "La volte :", texte: "un petit cercle, de 10 m de diamètre au plus." },
        { gras: "Le changement de main :", texte: "une ligne qui te fait passer d'une main à l'autre, par exemple en diagonale." },
        { gras: "Doubler :", texte: "quitter la piste pour suivre une ligne droite parallèle au grand ou au petit côté." }
      ])
    ]),

    B("Les obstacles du CSO", [
      P("En concours de saut d'obstacles (CSO), chaque obstacle a un nom. Le connaître t'aide à comprendre ce que le parcours demande à ton cheval : sauter haut, sauter large, ou les deux."),
      S("🚧 Les obstacles droits", "Ils demandent surtout de la hauteur.", [
        { gras: "Le vertical :", texte: "une ou plusieurs barres posées les unes au-dessus des autres, dans un même plan." },
        { gras: "Le mur :", texte: "un vertical plein, fait de blocs posés les uns sur les autres." },
        { gras: "La palanque :", texte: "un vertical fait de planches." }
      ]),
      S("↔️ Les obstacles larges", "Ils demandent de la hauteur et de la largeur : le cheval doit sauter en arrondissant davantage.", [
        { gras: "L'oxer :", texte: "deux plans de barres l'un derrière l'autre. Montant si la barre arrière est plus haute, carré si les deux sont à la même hauteur." },
        { gras: "La triple barre :", texte: "trois plans de barres de plus en plus hauts." },
        { gras: "La rivière :", texte: "une surface d'eau à franchir en largeur." }
      ]),
      S("🔢 Les combinaisons", "Une combinaison regroupe deux obstacles (double) ou trois (triple) séparés par une ou deux foulées. Elle porte un seul numéro, suivi d'une lettre : 5A, 5B, 5C.", [
        "En cas de refus dans une combinaison, on recommence toute la combinaison.",
        "Les distances sont calculées pour un galop régulier : la cadence compte plus que la vitesse."
      ]),
      E("🚩", "Les drapeaux", "Chaque obstacle est encadré par un drapeau rouge à droite et un drapeau blanc à gauche. Pour franchir l'obstacle dans le bon sens, tu dois avoir le rouge à ta droite. C'est valable en CSO comme en cross.")
    ]),

    B("S'engager en compétition", [
      P("Les compétitions Club sont la suite logique de tes Galops. Au Galop 5, tu vises le niveau Club 3 : reprise de dressage Club 3, parcours de CSO de 70 cm et parcours de cross de 60 cm."),
      S("📝 Les démarches", "En général, c'est ton enseignant qui engage les cavaliers du club. Mais tu dois connaître les étapes.", [
        "Avoir une licence fédérale de l'année en cours, valable pour la compétition.",
        "Avoir le niveau demandé par l'épreuve, et un cheval inscrit pour cette épreuve.",
        "Choisir le concours sur le site FFE Compet, puis s'engager avant la date de clôture.",
        "Régler l'engagement, puis consulter les horaires et l'ordre de passage, publiés avant le concours.",
        "Le jour J : arriver en avance, confirmer sa présence au secrétariat, reconnaître le parcours à pied."
      ]),
      S("👀 La reconnaissance du parcours", "Avant une épreuve de CSO, les cavaliers marchent le parcours à pied. C'est le moment de mémoriser l'ordre des obstacles et de choisir tes trajectoires.", [
        "Repère le départ et l'arrivée, entre les deux drapeaux.",
        "Compte les foulées entre les obstacles proches.",
        "Prépare tes virages : où tourner, où regarder."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Avant chaque reprise ou parcours, récite-le à voix basse, les yeux fermés, à pied. Si tu le connais par cœur, tu peux penser à ton cheval plutôt qu'à la prochaine lettre."),
      E("💡", "Le savais-tu ?", "Le CSO est né de l'équitation militaire. Il figure à chaque édition des Jeux olympiques depuis 1912, à Stockholm.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Sauter un obstacle avec le drapeau rouge à ta gauche : c'est l'élimination.",
        "Commencer une serpentine sans regarder où se trouve la boucle suivante : les boucles deviennent inégales.",
        "Confondre volte et cercle : une volte fait 10 m au plus.",
        "Attendre la veille pour vérifier ta licence ou ton engagement.",
        "Oublier de reconnaître le parcours : une erreur de parcours non rectifiée entraîne l'élimination."
      ]),
      S("🏇 Le défi du cavalier", "Entraîne-toi à lire un terrain comme un juge.", [
        "Dessine sur papier une carrière de 20 m sur 40 m avec toutes ses lettres, sans regarder.",
        "Trace une serpentine de 3 boucles et place les endroits où ton cheval change d'incurvation.",
        "Au club, nomme à voix haute chaque obstacle de la carrière d'obstacles devant ton enseignant."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment retenir l'ordre des lettres de la carrière ?",
        "Quelle différence entre un oxer montant et un oxer carré ?",
        "Comment bien préparer ma première reprise Club 3 ?",
        "Que se passe-t-il si mon cheval refuse dans une combinaison ?",
        "Comment s'engager à un concours sur FFE Compet ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Le pourtour : A, K, E, H, C, M, B, F, et X au centre.",
        "La serpentine change de main à chaque boucle.",
        "Droit pour la hauteur, large pour la largeur.",
        "Le drapeau rouge toujours à ta droite.",
        "Licence, engagement, horaires, reconnaissance : dans cet ordre."
      ]),
      E("", "", "Un parcours bien appris, c'est un cavalier libre de regarder où il va.")
    ])
  ],
  quiz: [
    Q("Quelle lettre se trouve au centre de la carrière de dressage ?", ["A", "C", "X", "B"], 2, "X marque le centre de la carrière. A et C sont au milieu des petits côtés, B et E au milieu des grands côtés."),
    Q("Dans l'ordre du pourtour, quelle lettre suit K ?", ["H", "E", "M", "F"], 1, "Le pourtour se lit A, K, E, H, C, M, B, F."),
    Q("Dans une serpentine, que se passe-t-il à chaque passage sur la ligne du milieu ?", ["Le cheval accélère", "Le cheval change de main et d'incurvation", "On s'arrête", "On change d'allure"], 1, "Chaque boucle change de côté : le cheval passe droit sur la ligne du milieu, puis s'incurve de l'autre côté."),
    Q("Une volte est un cercle de…", ["20 m", "15 m", "10 m au plus", "30 m"], 2, "La volte est un petit cercle, de 10 m de diamètre au plus."),
    Q("Un oxer est un obstacle…", ["Droit, fait de planches", "Large, fait de deux plans de barres", "Fait d'eau", "Fait de blocs"], 1, "L'oxer a deux plans de barres : il demande de la hauteur et de la largeur."),
    Q("Une triple barre, c'est…", ["Trois obstacles à la suite", "Trois plans de barres de plus en plus hauts", "Trois barres sur un même vertical", "Un mur de trois blocs"], 1, "La triple barre est un obstacle large formé de trois plans de barres, du plus bas au plus haut."),
    Q("Pour franchir un obstacle dans le bon sens, le drapeau rouge doit être…", ["À ta gauche", "À ta droite", "Devant toi", "Peu importe"], 1, "Le drapeau rouge est toujours à droite du cavalier, le blanc à gauche."),
    Q("Une combinaison numérotée 4A, 4B, c'est…", ["Deux obstacles séparés par une ou deux foulées", "Deux obstacles éloignés", "Un obstacle à sauter deux fois", "Une rivière"], 0, "Une combinaison regroupe deux ou trois obstacles proches, sous un même numéro suivi d'une lettre."),
    Q("Que faut-il avoir avant de s'engager en compétition ?", ["Une licence fédérale valable pour la compétition", "Un cheval à soi", "Le Galop 7", "Rien de particulier"], 0, "La licence de l'année en cours, valable pour la compétition, est indispensable. Le cheval peut être celui du club."),
    Q("Pourquoi reconnaître le parcours à pied ?", ["Pour tester le sol", "Pour mémoriser l'ordre des obstacles et préparer ses trajectoires", "Pour saluer le jury", "Ce n'est pas utile"], 1, "La reconnaissance permet de retenir le parcours et de choisir ses virages : une erreur de parcours non rectifiée élimine.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-04 — ANATOMIE, LOCOMOTION ET DIGESTION   (programme FFE Galop 5 : principales parties du squelette,
   principaux groupes musculaires et leurs rôles, particularités de la digestion) — reprend le brouillon g5-c6
   --------------------------------------------------------------------------------- */
{ id: "g5n-04", icone: "🦴", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "Anatomie, locomotion et digestion" },
  blocs: [
    { type: "couv-affiche", src: "images/robes-portrait-gris-pommele.webp", couv: {} },

    B("Le squelette", [
      P("Au Galop 2, tu as appris à nommer les parties extérieures du cheval. Au Galop 5, on regarde à l'intérieur : les os qui le portent, les muscles qui le font avancer et l'appareil digestif qui le nourrit. Ces connaissances expliquent beaucoup de règles de travail et de soins."),
      S("🦴 La colonne vertébrale", "Elle va de la tête à la queue et se divise en cinq parties.", [
        { gras: "Les vertèbres cervicales (7) :", texte: "elles forment l'encolure, très mobile." },
        { gras: "Les vertèbres dorsales (18) :", texte: "elles portent les côtes et la selle repose au-dessus." },
        { gras: "Les vertèbres lombaires (6) :", texte: "la région du rein, sans côtes, plus fragile." },
        { gras: "Le sacrum :", texte: "des vertèbres soudées, reliées au bassin." },
        { gras: "Les vertèbres coccygiennes :", texte: "elles forment la queue." }
      ]),
      S("🐴 Les membres antérieurs", "Ils portent environ 60 % du poids du cheval et amortissent les chocs.", [
        "De haut en bas : l'omoplate, l'humérus, le radius, le genou, le canon, le boulet, le paturon, la couronne et le pied.",
        "Le cheval n'a pas de clavicule : l'antérieur est relié au tronc uniquement par des muscles et des tendons."
      ]),
      S("🐎 Les membres postérieurs", "Ils sont le moteur : ce sont eux qui poussent le cheval vers l'avant.", [
        "De haut en bas : le bassin, le fémur, le grasset, le tibia, le jarret, le canon, le boulet, le paturon, la couronne et le pied.",
        "Le grasset correspond à notre genou, le jarret à notre cheville."
      ]),
      E("💡", "Le savais-tu ?", "Ce que l'on appelle « genou » chez le cheval correspond en réalité à notre poignet. Sous le genou et le jarret, il n'y a plus aucun muscle : seulement des os, des tendons et des ligaments. C'est pour cela qu'on protège tant le bas des membres.")
    ]),

    B("Les muscles et le mouvement", [
      S("💪 Les grands groupes musculaires", null, [
        { gras: "Les muscles de l'encolure :", texte: "ils portent la tête et participent au mouvement des antérieurs." },
        { gras: "Les muscles du dos (ligne du dessus) :", texte: "ils transmettent la poussée des postérieurs vers l'avant et portent le cavalier." },
        { gras: "Les muscles abdominaux :", texte: "ils soutiennent le dos par en dessous." },
        { gras: "Les muscles de la croupe et de la cuisse :", texte: "ils propulsent le cheval, à toutes les allures et au saut." },
        { gras: "Les muscles de l'épaule et du bras :", texte: "ils portent l'avant-main et lancent les antérieurs." }
      ]),
      S("⚙️ Comment le cheval avance", "La force naît dans les postérieurs. Elle passe par le dos et l'encolure pour arriver jusqu'à l'avant-main. Si le dos est tendu ou creux, la poussée se perd.", [
        "Un cheval qui engage ses postérieurs sous lui porte mieux son cavalier.",
        "Un dos souple et tonique laisse passer le mouvement.",
        "Les abdominaux et le dos travaillent ensemble, comme un pont."
      ]),
      S("🌱 Muscler son cheval", "Un cheval bien travaillé développe une ligne du dessus arrondie : encolure musclée vers le haut, dos rempli, croupe ronde.", [
        "Un travail régulier, avec des transitions et des courbes, renforce le dos.",
        "Un cheval monté tête haute et dos creux muscle surtout le dessous de l'encolure.",
        "La détente au début et le retour au calme à la fin protègent muscles et tendons."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Regarde la ligne du dessus de ton cheval de profil, une fois par mois. Si son dos se remplit et que son encolure se muscle vers le haut, votre travail va dans le bon sens.")
    ]),

    B("La digestion du cheval", [
      S("🌾 Un herbivore fait pour manger souvent", "Dans la nature, le cheval mange de l'herbe 14 à 16 heures par jour, par petites quantités. Tout son appareil digestif est construit pour cela.", [
        { gras: "La bouche :", texte: "les incisives coupent l'herbe, les molaires la broient. La salive n'est produite que lorsqu'il mâche." },
        { gras: "L'estomac :", texte: "petit (une quinzaine de litres), il se vide vite et produit de l'acide en continu, même à jeun." },
        { gras: "L'intestin grêle :", texte: "très long (plus de 20 m), il absorbe les sucres, les graisses et une partie des protéines." },
        { gras: "Le cæcum et le gros côlon :", texte: "une grande cuve de fermentation où des micro-organismes digèrent les fibres du foin et de l'herbe." }
      ]),
      S("⚠️ Des points faibles", null, [
        "Le cheval ne peut pas vomir : ce qu'il avale doit traverser tout l'intestin.",
        "Un changement brutal d'alimentation dérègle les micro-organismes du cæcum.",
        "Un estomac vide trop longtemps peut s'abîmer (ulcères).",
        "Un repas de céréales trop gros, de la paille avalée en grande quantité ou un manque d'eau favorisent les coliques."
      ]),
      S("🥕 Les règles qui en découlent", null, [
        "Du fourrage (foin, herbe) en quantité, réparti sur toute la journée.",
        "Des repas de concentrés petits et fractionnés.",
        "Toute transition alimentaire sur une à deux semaines.",
        "De l'eau propre à volonté.",
        "Pas de travail intense juste après un repas de concentrés."
      ]),
      E("💡", "Le savais-tu ?", "Le cheval n'a pas de vésicule biliaire. La bile coule en continu dans l'intestin : encore une preuve qu'il est fait pour manger peu, mais tout le temps.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Penser que le « genou » du cheval est comme le nôtre : c'est son poignet.",
        "Travailler fort sans détente : muscles et tendons froids se blessent plus facilement.",
        "Laisser un cheval de longues heures sans rien à manger.",
        "Changer d'aliment du jour au lendemain.",
        "Monter juste après un repas de granulés."
      ]),
      S("🏇 Le défi du cavalier", "Retrouve sur ton cheval ce que tu viens d'apprendre.", [
        "À pied et avec ton enseignant, montre sur ton cheval le garrot, le rein, le grasset et le jarret.",
        "Pose la main sur sa croupe pendant qu'il marche en main et sens les muscles qui poussent.",
        "Demande à quelle heure il reçoit son foin et ses concentrés, puis explique pourquoi les repas sont répartis."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi le cheval n'a-t-il pas de clavicule ?",
        "Comment savoir si mon cheval est bien musclé du dos ?",
        "Qu'est-ce qu'une colique et comment la reconnaître ?",
        "Pourquoi faut-il changer d'aliment progressivement ?",
        "Quel est le rôle du cæcum dans la digestion ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Les postérieurs poussent, les antérieurs portent.",
        "Le dos transmet la force de l'arrière vers l'avant.",
        "Sous le genou et le jarret : aucun muscle.",
        "Petit estomac : manger peu, mais souvent.",
        "Le cheval ne vomit pas : prudence avec l'alimentation."
      ]),
      E("", "", "Connaître le corps de son cheval, c'est savoir ce qu'on peut lui demander, et quand s'arrêter.")
    ])
  ],
  quiz: [
    Q("Combien le cheval a-t-il de vertèbres cervicales ?", ["5", "7", "12", "18"], 1, "Comme presque tous les mammifères, le cheval a 7 vertèbres cervicales, qui forment l'encolure."),
    Q("Quel os relie l'antérieur au tronc ?", ["La clavicule", "Aucun : ce sont des muscles et des tendons", "Le sternum", "Le bassin"], 1, "Le cheval n'a pas de clavicule : son antérieur tient au tronc par des muscles et des tendons."),
    Q("Le « genou » du cheval correspond chez nous…", ["Au genou", "Au poignet", "À la cheville", "Au coude"], 1, "Le genou du cheval correspond à notre poignet. Notre genou correspond à son grasset."),
    Q("Quels membres propulsent le cheval vers l'avant ?", ["Les antérieurs", "Les postérieurs", "Les quatre de la même façon", "Aucun"], 1, "Les postérieurs sont le moteur ; les antérieurs portent et amortissent."),
    Q("Quel est le rôle des muscles du dos ?", ["Tourner la tête", "Transmettre la poussée et porter le cavalier", "Digérer", "Respirer"], 1, "La ligne du dessus transmet la force des postérieurs vers l'avant et porte le poids du cavalier."),
    Q("Sous le genou et le jarret, on trouve…", ["De gros muscles", "Des os, des tendons et des ligaments", "Uniquement de la graisse", "Le cæcum"], 1, "Il n'y a plus de muscles sous le genou et le jarret : c'est une zone fragile, d'où les protections."),
    Q("L'estomac du cheval est…", ["Grand, environ 100 litres", "Petit, une quinzaine de litres", "Absent", "Divisé en quatre poches"], 1, "Son estomac est petit : il est fait pour recevoir de petites quantités souvent."),
    Q("Où sont digérées les fibres du foin ?", ["Dans l'estomac", "Dans le cæcum et le gros côlon", "Dans la bouche", "Dans l'œsophage"], 1, "Le cæcum et le gros côlon contiennent des micro-organismes qui font fermenter et digèrent les fibres."),
    Q("Pourquoi changer d'aliment progressivement ?", ["Pour économiser", "Pour ne pas dérégler les micro-organismes de l'intestin", "Par habitude", "Ce n'est pas nécessaire"], 1, "Un changement brutal perturbe la flore du cæcum et peut provoquer des coliques."),
    Q("Le cheval peut-il vomir ?", ["Oui, facilement", "Non", "Seulement le foin", "Seulement après l'effort"], 1, "Le cheval ne peut pas vomir : c'est une des raisons pour lesquelles les coliques sont si graves.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-05 — SOINS, PROTECTIONS ET BANDES DE REPOS   (programme FFE Galop 5 : mettre, enlever et rouler des bandes de repos)
   --------------------------------------------------------------------------------- */
{ id: "g5n-05", icone: "🩹", type: { fr: "soins" }, duree: { fr: "10 min" }, titre: { fr: "Soins, protections et bandes de repos" },
  blocs: [
    { type: "couv-affiche", src: "images/securite-g1-bandes.webp", couv: {} },

    B("Protéger les membres", [
      P("Les membres du cheval portent tout son poids et encaissent chaque foulée. Sous le genou et le jarret, il n'y a ni muscle ni graisse pour les protéger : seulement des os, des tendons et des ligaments. Au Galop 5, tu apprends à choisir les bonnes protections et à poser des bandes de repos."),
      S("🛡️ Les protections de travail", "Elles protègent des coups que le cheval peut se donner lui-même ou recevoir d'un obstacle.", [
        { gras: "Les guêtres :", texte: "elles protègent le tendon et le canon des antérieurs. Les guêtres ouvertes, utilisées à l'obstacle, laissent le devant du canon libre pour que le cheval sente la barre." },
        { gras: "Les protège-boulets :", texte: "ils protègent l'intérieur du boulet des postérieurs, que le cheval peut toucher avec le pied opposé." },
        { gras: "Les cloches :", texte: "elles couvrent la couronne et les talons des antérieurs, qu'un postérieur peut atteindre." },
        { gras: "Les bandes de polo :", texte: "des bandes souples de travail, qui maintiennent et protègent le bas du membre." }
      ]),
      S("📏 Bien les poser", null, [
        "Sur un membre propre et sec : un grain de sable sous une guêtre suffit à blesser.",
        "Les fermetures se placent à l'extérieur du membre et se ferment de l'avant vers l'arrière.",
        "Assez serré pour ne pas tourner, assez souple pour glisser un doigt dessous.",
        "On les retire dès la fin du travail, puis on vérifie les membres."
      ]),
      E("💡", "Le savais-tu ?", "Un tendon fléchisseur du cheval peut supporter plusieurs tonnes au galop et à la réception d'un saut. Mais une fois abîmé, il cicatrise lentement : il faut souvent plusieurs mois de repos.")
    ]),

    B("Poser une bande de repos", [
      P("Les bandes de repos se posent au box, après un effort, pour le transport ou sur conseil du vétérinaire. Elles soutiennent le bas du membre et le gardent au chaud. Mal posées, elles peuvent abîmer le tendon : la méthode compte autant que le matériel."),
      S("🧰 Le matériel", null, [
        "Une sous-bande épaisse (en ouate ou en mousse), propre et sans pli.",
        "Une bande de repos large et un peu élastique, bien roulée."
      ]),
      S("🔁 Les étapes", "Commence par un membre antérieur, attaché et surveillé, en restant accroupi sur tes pieds, jamais à genoux, pour pouvoir te relever vite.", [
        "Enroule la sous-bande autour du canon, de sous le genou (ou le jarret) jusqu'au boulet, sans pli, bord à bord.",
        "Pose le début de la bande à l'extérieur du membre, sous le genou, puis enroule de l'avant vers l'arrière en passant par l'extérieur.",
        "Descends en recouvrant à chaque tour la moitié du tour précédent, avec une tension égale.",
        "Enveloppe le boulet en formant un V sous l'arrière du boulet, puis remonte de la même façon.",
        "Ferme la bande à l'extérieur du membre, jamais sur le tendon ni sur l'os du devant.",
        "Vérifie qu'un doigt glisse sous la bande et que la sous-bande dépasse d'un ou deux centimètres en haut et en bas."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Garde toujours la même tension, du début à la fin : ce n'est pas une bande serrée qui protège, c'est une bande régulière. Un pli ou un tour plus serré que les autres peut marquer le tendon.")
    ]),

    B("Enlever et rouler une bande", [
      S("✋ Enlever la bande", null, [
        "Défais la fermeture, puis déroule la bande en la passant d'une main à l'autre, près du membre, sans tirer.",
        "Ne la roule pas en la retirant : tu risquerais de tirer sur le membre.",
        "Retire la sous-bande, puis passe la main sur le canon et le tendon pour vérifier qu'il n'y a ni chaleur, ni gonflement, ni marque.",
        "Laisse les membres à l'air quelques minutes avant de reposer des bandes si besoin."
      ]),
      S("🌀 Rouler la bande", "Une bande bien roulée se pose bien. Roule-la toujours tout de suite après l'avoir enlevée.", [
        "Commence par la fermeture, pliée vers l'intérieur, au centre du rouleau.",
        "Roule la bande serrée, bien droite, le côté qui touche le membre à l'intérieur du rouleau.",
        "Range-la propre et sèche. Une bande sale ou mouillée se lave avant d'être réutilisée."
      ]),
      E("⚠️", "Combien de temps ?", "Une bande de repos ne reste jamais en place toute une journée sans être refaite. Si tu vois un gonflement au-dessus ou en dessous de la bande, si elle a glissé ou si le cheval se gratte, enlève-la et préviens ton enseignant.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Poser une bande sans sous-bande, ou sur une sous-bande qui fait des plis.",
        "Serrer plus fort sur le tendon que sur le reste du membre.",
        "Fermer la bande sur le tendon ou sur l'avant du canon.",
        "Enrouler dans le mauvais sens, en tirant le tendon vers l'intérieur.",
        "Se mettre à genoux près des membres : on ne peut pas se relever assez vite."
      ]),
      S("🏇 Le défi du cavalier", "Prouve que tu sais poser une bande de repos en toute sécurité.", [
        "Avec ton enseignant, pose une sous-bande et une bande de repos sur un antérieur, sans pli.",
        "Fais vérifier la tension, le sens d'enroulement et la place de la fermeture.",
        "Enlève la bande, roule-la correctement et range-la."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi enrouler les bandes de l'avant vers l'arrière ?",
        "Quelle différence entre une guêtre ouverte et une guêtre fermée ?",
        "Quand utiliser des bandes de repos plutôt que rien ?",
        "Comment reconnaître une bande trop serrée ?",
        "Comment laver et entretenir mes bandes ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Sous le genou et le jarret, rien ne protège le tendon.",
        "Toujours une sous-bande, propre et sans pli.",
        "De l'avant vers l'arrière, par l'extérieur.",
        "Une tension égale, fermeture à l'extérieur.",
        "Enlever sans tirer, rouler tout de suite."
      ]),
      E("", "", "Une bande bien posée ne se voit pas : on ne remarque que celle qui est mal posée.")
    ])
  ],
  quiz: [
    Q("Pourquoi faut-il bien protéger le bas des membres ?", ["Parce qu'il est très musclé", "Parce qu'il n'y a ni muscle ni graisse pour protéger os et tendons", "Pour décorer", "Parce que c'est obligatoire en carrière"], 1, "Sous le genou et le jarret, on ne trouve que des os, des tendons et des ligaments, très exposés aux chocs."),
    Q("À quoi servent les cloches ?", ["À protéger la couronne et les talons des antérieurs", "À protéger le dos", "À tenir chaud aux oreilles", "À protéger la queue"], 0, "Les cloches protègent la couronne et les talons des antérieurs, qu'un postérieur peut atteindre."),
    Q("Que place-t-on sous une bande de repos ?", ["Rien", "Une sous-bande propre et sans pli", "Du foin", "Une guêtre"], 1, "La sous-bande répartit la pression et protège le tendon : elle est indispensable."),
    Q("Dans quel sens enroule-t-on la bande ?", ["De l'arrière vers l'avant, par l'intérieur", "De l'avant vers l'arrière, par l'extérieur", "Peu importe", "De haut en bas uniquement"], 1, "On enroule de l'avant vers l'arrière en passant par l'extérieur, pour ne pas tirer le tendon vers l'intérieur."),
    Q("Où ferme-t-on la bande ?", ["Sur le tendon", "Sur l'avant du canon", "À l'extérieur du membre", "Sous le boulet"], 2, "La fermeture se place à l'extérieur, jamais sur le tendon ni sur l'os du devant."),
    Q("Comment vérifier la tension d'une bande ?", ["Elle ne doit pas bouger du tout, même pas un doigt dessous", "Un doigt doit pouvoir glisser dessous", "Elle doit pendre", "On ne vérifie pas"], 1, "Un doigt doit glisser sous la bande : assez serrée pour tenir, pas assez pour comprimer."),
    Q("Comment enlève-t-on une bande de repos ?", ["En tirant d'un coup", "En la déroulant d'une main à l'autre, sans tirer", "En la coupant", "En la roulant sur le membre"], 1, "On la déroule en la passant d'une main à l'autre, près du membre, sans tirer."),
    Q("Que fais-tu après avoir enlevé une bande ?", ["Je la jette dans un coin", "Je vérifie le membre puis je roule la bande", "Je remets la même tout de suite sans vérifier", "Rien"], 1, "On vérifie l'absence de chaleur, de gonflement ou de marque, puis on roule la bande correctement."),
    Q("Comment te places-tu pour poser une bande ?", ["À genoux", "Assis par terre", "Accroupi sur tes pieds, prêt à te relever", "Allongé"], 2, "Accroupi sur tes pieds, tu peux te relever vite si le cheval bouge. À genoux ou assis, c'est impossible."),
    Q("Une guêtre ouverte, utilisée à l'obstacle…", ["Couvre tout le canon", "Laisse le devant du canon libre", "Se met sur les postérieurs uniquement", "Protège la couronne"], 1, "Elle protège le tendon mais laisse le devant du canon libre, pour que le cheval sente la barre.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-06 — TRAVAIL À PIED : LONGE ET LONGUES RÊNES   (programme FFE Galop 5 : mener seul en main au pas et au trot,
   longer un cheval détendu au pas, au trot et à l'arrêt, travailler aux longues rênes sur le cercle au pas)
   — reprend le brouillon g5-c4 (partie longe)
   --------------------------------------------------------------------------------- */
{ id: "g5n-06", icone: "🎯", type: { fr: "à pied" }, duree: { fr: "11 min" }, titre: { fr: "Travail à pied : longe et longues rênes" },
  blocs: [
    { type: "couv-affiche", src: "images/securite-g1-longe.webp", couv: {} },

    B("Mener en main au pas et au trot", [
      P("Travailler à pied, c'est apprendre à se faire comprendre sans être sur le dos du cheval. Au Galop 5, tu mènes seul ton cheval au pas et au trot, tu le longes au pas, au trot et à l'arrêt, et tu découvres les longues rênes. Ce travail sert à détendre, à éduquer et à présenter un cheval, par exemple à un vétérinaire."),
      S("🚶 Mener au pas", null, [
        "Place-toi à gauche du cheval, à hauteur de son épaule, en regardant devant toi.",
        "La main droite tient la longe à une vingtaine de centimètres du licol, la main gauche tient le reste plié en boucles, jamais enroulé autour de la main.",
        "Marche d'un pas décidé : c'est ton corps qui donne l'allure, pas la longe."
      ]),
      S("🏃 Mener au trot", "On demande souvent de présenter un cheval au trot en ligne droite, pour vérifier qu'il marche bien.", [
        "Prends un peu d'élan au pas, puis trotte toi-même : le cheval doit trotter à côté de toi, sans te dépasser ni traîner.",
        "Laisse assez de longe pour que sa tête reste libre : un cheval tenu trop court ne peut pas trotter droit.",
        "Pour faire demi-tour, repasse au pas et tourne en poussant le cheval vers la droite, loin de toi, pour ne pas te faire marcher sur les pieds."
      ]),
      E("💡", "Le savais-tu ?", "Le vétérinaire observe le cheval au trot en ligne droite pour repérer une boiterie : la tête qui hoche au même rythme qu'un antérieur ou la hanche qui monte plus d'un côté sont des indices. Un cheval mené droit et à la bonne allure l'aide à bien voir.")
    ]),

    B("Longer en sécurité", [
      S("🧰 Le matériel", null, [
        "Un caveçon, ou un licol bien ajusté, avec la longe accrochée à l'anneau du milieu.",
        "Une longe de 7 à 8 mètres et une chambrière.",
        "Des gants : la longe peut brûler les mains si le cheval tire.",
        "Des protections sur les quatre membres du cheval, et ton casque."
      ]),
      S("📐 Le triangle de longe", "Tu te places au centre du cercle. Ta main qui tient la longe, ta main qui tient la chambrière et le cheval forment un triangle.", [
        "La longe dans la main du côté où va le cheval (main gauche quand il tourne à gauche).",
        "La chambrière dans l'autre main, pointée vers les hanches, basse et calme.",
        "Ton épaule regarde vers les hanches du cheval : tu es légèrement derrière lui.",
        "La longe lovée en boucles dans la main, prête à filer, jamais enroulée autour de la main."
      ]),
      S("🗣️ Les commandes", "La voix, le placement de ton corps et la chambrière remplacent les aides du cavalier.", [
        "Pour avancer : un mot clair et dynamique, la chambrière qui se lève vers les hanches, toi légèrement derrière.",
        "Pour ralentir ou s'arrêter : une voix grave et longue, la chambrière baissée, toi qui te places un peu plus vers la tête.",
        "Pour rester sur le cercle : la chambrière dirigée vers l'épaule si le cheval rentre vers toi."
      ]),
      E("👨‍🏫", "Le conseil du coach", "À la longe, ton corps parle plus fort que ta voix. Si ton cheval n'avance pas, recule d'un pas vers ses hanches avant de lever la chambrière. Si tu te places devant lui, il s'arrêtera, quoi que tu dises.")
    ]),

    B("Changer de main et découvrir les longues rênes", [
      S("🔄 Changer de main à la longe", null, [
        "Arrête le cheval sur le cercle, à la voix.",
        "Pose la chambrière au sol, pointe vers l'arrière, et va vers lui en raccourcissant la longe.",
        "Change la longe de côté, reprends ta chambrière, puis repars dans l'autre sens.",
        "Ne laisse jamais la longe traîner au sol : tes pieds ou ceux du cheval pourraient s'y prendre."
      ]),
      S("🪢 Les longues rênes", "On utilise deux longes, accrochées au mors ou au caveçon et passées dans les anneaux d'un surfaix. Le meneur se tient derrière et à l'intérieur du cercle.", [
        "Au Galop 5, on travaille au pas sur le cercle, sur un cheval calme et habitué.",
        "La rêne extérieure passe autour des hanches du cheval : elle l'encadre et le fait tourner.",
        "Les mains restent douces et suivent le mouvement, comme à cheval.",
        "Garde une distance suffisante pour rester hors de portée d'un coup de pied."
      ]),
      E("⚠️", "Toujours encadré", "Les longues rênes se découvrent avec ton enseignant, sur un cheval qui connaît l'exercice et dans un endroit clos. Si une rêne s'emmêle, arrête le cheval à la voix avant de la démêler.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Enrouler la longe autour de la main : si le cheval tire, tu ne peux plus la lâcher.",
        "Faire claquer la chambrière à tout bout de champ : le cheval s'énerve ou n'y fait plus attention.",
        "Se placer devant le cheval en lui demandant d'avancer.",
        "Longer sans gants, ou un cheval sans protections.",
        "Longer trop longtemps sur la même main, ou sur un cercle trop petit : c'est fatigant pour les articulations."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises le travail à pied.", [
        "Mène ton cheval au trot en ligne droite sur 20 mètres, puis fais-le tourner vers la droite au pas.",
        "Longe-le au pas, au trot et à l'arrêt sur les deux mains, en gardant un cercle régulier.",
        "Change de main à la longe sans laisser la longe toucher le sol."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi longer avec un caveçon plutôt qu'avec un filet ?",
        "Que faire si mon cheval tourne le dos et part à la longe ?",
        "Comment savoir si mon cheval est détendu à la longe ?",
        "Combien de temps longer un cheval ?",
        "À quoi servent les longues rênes par rapport à la longe ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "À pied, ton corps donne l'allure.",
        "Longe lovée, jamais enroulée, et des gants.",
        "Le triangle : longe, cheval, chambrière.",
        "Derrière l'épaule pour avancer, vers la tête pour ralentir.",
        "Les longues rênes : au pas, sur le cercle, encadré."
      ]),
      E("", "", "Un cheval qui t'écoute à pied t'écoutera mieux en selle.")
    ])
  ],
  quiz: [
    Q("De quel côté mène-t-on habituellement un cheval ?", ["À droite, devant sa tête", "À gauche, à hauteur de son épaule", "Derrière lui", "Devant lui"], 1, "On mène à gauche, à hauteur de l'épaule, en regardant devant soi."),
    Q("Pour faire demi-tour en menant, on tourne le cheval…", ["Vers soi", "Vers la droite, loin de soi", "En reculant", "En le tirant"], 1, "En le poussant vers la droite, loin de toi, tu évites qu'il te marche sur les pieds."),
    Q("À la longe, on peut enrouler la longe autour de sa main pour mieux tenir.", ["Vrai", "Faux"], 1, "Jamais : une longe enroulée autour de la main peut blesser gravement si le cheval tire. On la tient lovée, prête à filer."),
    Q("Que forment le cavalier, la longe, la chambrière et le cheval ?", ["Un carré", "Un triangle", "Une ligne", "Un cercle fermé"], 1, "La main de longe, la main de chambrière et le cheval forment un triangle, avec le meneur à son sommet."),
    Q("Vers quelle partie du cheval pointe la chambrière ?", ["Sa tête", "Ses hanches", "Ses oreilles", "Le sol devant lui"], 1, "La chambrière est dirigée vers les hanches pour faire avancer, ou vers l'épaule si le cheval rentre sur le cercle."),
    Q("Ton cheval ne veut pas avancer à la longe. Que fais-tu d'abord ?", ["Je me place devant lui", "Je recule d'un pas vers ses hanches", "Je tire sur la longe", "Je crie"], 1, "En te plaçant un peu plus vers ses hanches, tu le pousses vers l'avant avec ton corps."),
    Q("Pourquoi porter des gants à la longe ?", ["Pour le style", "Parce que la longe peut brûler les mains", "Pour avoir chaud", "Ce n'est pas utile"], 1, "Si le cheval tire, la longe glisse dans les mains et peut les brûler."),
    Q("Aux longues rênes, où se tient le meneur au Galop 5 ?", ["Devant le cheval", "Derrière et à l'intérieur du cercle", "Sur le dos du cheval", "Au milieu, sans bouger"], 1, "Le meneur se place derrière et à l'intérieur du cercle, à une distance qui le met hors de portée d'un coup de pied."),
    Q("Que fais-tu de la chambrière pour changer de main ?", ["Je la garde levée", "Je la pose au sol, pointe vers l'arrière", "Je la fais claquer", "Je la donne au cheval"], 1, "On pose la chambrière au sol, pointe vers l'arrière, avant d'aller vers le cheval."),
    Q("Pourquoi éviter de longer sur un cercle trop petit ?", ["Parce que c'est fatigant pour les articulations", "Parce que le cheval s'ennuie", "Parce que la longe est trop courte", "Ce n'est pas un problème"], 0, "Un cercle trop petit sollicite fortement les articulations et les tendons du cheval.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-07 — EMBARQUEMENT ET TRANSPORT DU CHEVAL   (programme FFE Galop 5 : embarquer un cheval dans un van ou un camion ;
   + numéro SIRE et puce électronique, qui n'avaient pas de cours : placés ici, avec les papiers du voyage)
   — reprend le brouillon g5-c4 (partie embarquement et protections)
   --------------------------------------------------------------------------------- */
{ id: "g5n-07", icone: "🚚", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Embarquement, transport et identification" },
  blocs: [
    { type: "couv-affiche", src: "images/securite-g1-porte.webp", couv: {} },

    B("Préparer le cheval et le véhicule", [
      P("Monter dans un van, c'est entrer dans un petit espace sombre qui bouge : tout ce qu'un animal de fuite redoute. Un embarquement réussi se prépare. Au Galop 5, tu apprends à embarquer un cheval calmement, à le protéger pour la route et à connaître les papiers qui l'accompagnent."),
      S("🧳 Protéger le cheval pour la route", null, [
        "Des protections de transport sur les quatre membres, qui couvrent bien les couronnes et les talons, ou des bandes de repos.",
        "Un protège-queue, pour qu'il ne s'abîme pas la queue contre la paroi.",
        "Un licol solide et une longe pour voyager, jamais le filet.",
        "Une couverture adaptée à la saison, sans qu'il ait trop chaud dans le van."
      ]),
      S("🔧 Préparer le van ou le camion", null, [
        "Garé sur un sol plat et stable, frein serré, attelé à la voiture.",
        "Pont abaissé, bien posé au sol, et van ouvert et lumineux devant.",
        "Un filet à foin accroché à la bonne hauteur, et la barre de poitrail en place.",
        "Rien qui dépasse ni qui traîne : seau, fourche, outils sont rangés."
      ]),
      E("💡", "Le savais-tu ?", "Dans un van, beaucoup de chevaux préfèrent voyager de biais ou dos à la route, parce qu'ils gardent mieux leur équilibre quand le véhicule freine. C'est pour cela que certains camions installent les chevaux en épi.")
    ]),

    B("Embarquer et débarquer", [
      S("➡️ Embarquer", null, [
        "Mène le cheval bien droit vers le pont, d'un pas décidé, en regardant l'intérieur du van, pas le cheval.",
        "Monte avec lui, sans tirer : une longe tendue en continu le fait reculer.",
        "Une fois le cheval entré, un aide ferme la barre arrière (ou la porte) en se tenant sur le côté, jamais derrière le cheval.",
        "Attache le cheval seulement une fois la barre arrière fermée, puis relève le pont."
      ]),
      S("⬅️ Débarquer", null, [
        "Abaisse le pont et ouvre l'arrière en te tenant sur le côté.",
        "Détache le cheval avant d'ouvrir la barre arrière.",
        "Fais-le reculer calmement, en ligne droite, en le guidant à la voix.",
        "Laisse-lui le temps de trouver le pont avec ses postérieurs."
      ]),
      S("🧘 S'il refuse", "Un cheval qui refuse a souvent peur ou se souvient d'un mauvais voyage. Ne t'énerve jamais.", [
        "Récompense chaque pas en avant en relâchant la longe.",
        "Laisse-le regarder et sentir le pont.",
        "Appelle ton enseignant : il existe des techniques d'embarquement qui se pratiquent à deux, en sécurité."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Entraîne ton cheval à monter dans le van un jour où vous ne partez pas. Embarquer, donner un peu de foin, débarquer, recommencer : le jour du départ, ce sera une habitude, pas une épreuve.")
    ]),

    B("Le voyage et les papiers", [
      S("🛣️ Pendant le voyage", null, [
        "Une conduite douce : accélérer, freiner et tourner lentement.",
        "Sur un long trajet, une pause toutes les deux à trois heures, sans faire descendre le cheval.",
        "De l'air sans courant d'air froid, et de l'eau proposée régulièrement.",
        "À l'arrivée, on vérifie les membres et l'état général avant de travailler."
      ]),
      S("📄 Le document d'identification", "Chaque cheval a un document d'identification, souvent appelé livret ou passeport. Il le suit toute sa vie et doit voyager avec lui à chaque transport.", [
        "Il contient le signalement du cheval (robe, marques) et ses vaccinations.",
        "Il précise si le cheval peut, ou non, être destiné un jour à la consommation."
      ]),
      S("🔢 Le numéro SIRE", "Chaque équidé né ou vivant en France est enregistré dans le fichier SIRE (Système d'information relatif aux équidés), tenu par l'IFCE. Son numéro SIRE est son identité unique.", [
        "Il est composé de 8 chiffres et d'une lettre.",
        "Il sert à retrouver le cheval, son propriétaire, ses origines et ses résultats en compétition.",
        "Pour engager un cheval en concours, on utilise son numéro SIRE."
      ]),
      S("📡 La puce électronique", "Tous les équidés doivent porter une puce électronique, ou transpondeur. Elle est posée par un vétérinaire, sous la peau, sur le côté gauche de l'encolure.", [
        "Elle contient un numéro à 15 chiffres, lu avec un lecteur spécial.",
        "Ce numéro est inscrit dans le document d'identification : il prouve que le cheval est bien celui du livret.",
        "Elle permet d'identifier un cheval perdu, volé ou vendu."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Se placer derrière le cheval pour fermer la barre arrière.",
        "Attacher le cheval avant que la barre arrière soit fermée.",
        "Ouvrir la barre arrière alors que le cheval est encore attaché.",
        "Transporter le cheval avec son filet, ou sans protections.",
        "Partir sans son document d'identification."
      ]),
      S("🏇 Le défi du cavalier", "Prépare un départ en concours comme un vrai groom.", [
        "Avec ton enseignant, pose les protections de transport et le protège-queue sur ton cheval.",
        "Vérifie le van : sol, pont, barres, filet à foin.",
        "Retrouve le numéro SIRE de ton cheval dans son livret et montre où se trouve sa puce."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Que faire si mon cheval refuse de monter dans le van ?",
        "Pourquoi détacher le cheval avant d'ouvrir l'arrière ?",
        "Que contient le livret de mon cheval ?",
        "À quoi sert le numéro SIRE ?",
        "Comment savoir si mon cheval supporte bien le transport ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Protections, protège-queue, licol : jamais le filet.",
        "Droit vers le pont, en regardant devant.",
        "Barre fermée avant d'attacher, détacher avant d'ouvrir.",
        "Le livret voyage toujours avec le cheval.",
        "SIRE et puce : la carte d'identité du cheval."
      ]),
      E("", "", "Un cheval qui monte calmement dans un van a surtout appris à faire confiance à celui qui le mène.")
    ])
  ],
  quiz: [
    Q("Avec quoi transporte-t-on un cheval ?", ["Son filet", "Un licol solide et une longe", "Rien sur la tête", "Un caveçon"], 1, "On voyage toujours avec un licol solide et une longe, jamais avec le filet."),
    Q("Quand attache-t-on le cheval dans le van ?", ["Avant qu'il entre", "Dès qu'il pose un pied sur le pont", "Une fois la barre arrière fermée", "On ne l'attache jamais"], 2, "On attache seulement quand la barre arrière est fermée : s'il recule attaché sans barre, il peut paniquer et se blesser."),
    Q("Au débarquement, on détache le cheval…", ["Après avoir ouvert la barre arrière", "Avant d'ouvrir la barre arrière", "Une fois sorti", "On ne le détache pas"], 1, "On détache avant d'ouvrir : un cheval qui recule encore attaché peut paniquer."),
    Q("Où se place l'aide qui ferme la barre arrière ?", ["Derrière le cheval", "Sur le côté", "Devant le cheval", "Dans le van"], 1, "Toujours sur le côté, hors de portée d'un coup de pied."),
    Q("Pour embarquer, tu regardes…", ["Le cheval dans les yeux", "L'intérieur du van, devant toi", "Le sol", "Derrière toi"], 1, "Regarder devant toi et avancer d'un pas décidé encourage le cheval à suivre."),
    Q("À quoi sert le protège-queue ?", ["À tenir chaud", "À éviter que la queue s'abîme contre la paroi", "À attacher le cheval", "À rien"], 1, "Le cheval peut s'appuyer contre la paroi arrière : le protège-queue évite que la queue s'abîme."),
    Q("Le numéro SIRE est composé de…", ["15 chiffres", "8 chiffres et une lettre", "Le nom du cheval", "Un code-barres"], 1, "Le numéro SIRE compte 8 chiffres et une lettre. Les 15 chiffres sont ceux de la puce."),
    Q("Où est posée la puce électronique ?", ["Dans l'oreille", "Sous la peau, sur le côté gauche de l'encolure", "Dans le sabot", "Sur la croupe"], 1, "Le vétérinaire la pose sous la peau, sur le côté gauche de l'encolure."),
    Q("Quel document doit accompagner le cheval à chaque transport ?", ["Son carnet de notes", "Son document d'identification (livret)", "Sa licence", "Rien"], 1, "Le document d'identification suit le cheval toute sa vie et voyage avec lui."),
    Q("Ton cheval refuse de monter. Que fais-tu ?", ["Je tire plus fort", "Je le frappe", "Je reste calme, je récompense chaque pas et j'appelle mon enseignant", "Je renonce pour toujours"], 2, "La patience, la récompense de chaque progrès et l'aide d'un adulte expérimenté sont la bonne réponse.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-08 — ÉQUILIBRE, CADENCE ET TRANSITIONS   (programme FFE Galop 5 : définir les transitions, leurs qualités et leurs défauts ;
   être stable et décontracté sans étriers aux trois allures ; être assis aux trois allures et dans les transitions ;
   augmenter progressivement l'allure en conservant la cadence) — reprend le brouillon g5-c1
   --------------------------------------------------------------------------------- */
{ id: "g5n-08", icone: "⚖️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Équilibre, cadence et transitions" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-reprises-hd1.jpg", couv: {} },

    B("Une assiette indépendante", [
      P("Au Galop 5, ton cheval doit pouvoir compter sur toi : un cavalier stable, assis, qui ne le gêne pas quand il change d'allure. C'est ce qui rend les transitions fluides et les allures régulières. Tout commence par ton assiette."),
      S("🪑 Être assis aux trois allures", "Être assis, c'est garder le contact de la selle sans rebondir, au trot comme au galop.", [
        "Le bassin suit le mouvement du dos du cheval, comme sur une balançoire.",
        "Le haut du corps reste droit et souple, les épaules au-dessus des hanches.",
        "Les jambes descendent, sans serrer : ce sont elles qui stabilisent par leur poids.",
        "Au trot assis, commence par quelques foulées sur un trot calme, puis allonge peu à peu."
      ]),
      S("🦵 Le travail sans étriers", "C'est l'exercice roi pour approfondir l'assiette. Au Galop 5, tu dois rester stable et décontracté sans étriers aux trois allures.", [
        "Il approfondit l'assiette : le bassin descend dans la selle.",
        "Il améliore le liant : le dos et les hanches accompagnent mieux le mouvement.",
        "Il développe l'indépendance des aides : jambes et mains agissent séparément.",
        "Il renforce l'équilibre, sans t'appuyer sur l'étrier."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Sans étriers, laisse tes jambes longues et relâchées, sans chercher à serrer. C'est le poids des jambes, pas la crispation, qui te stabilise. Si tu te crispes, reviens au pas, respire, et recommence.")
    ]),

    B("Cadence et rythme", [
      S("🎵 La cadence", "La cadence, c'est la régularité du rythme : des foulées toutes identiques, comme un métronome. Une allure cadencée est régulière, énergique et bien marquée.", [
        "Au pas : 4 temps réguliers.",
        "Au trot : 2 temps, bien marqués.",
        "Au galop : 3 temps, suivis d'un temps de suspension."
      ]),
      S("📈 Augmenter l'allure sans perdre la cadence", "Augmenter l'allure ne veut pas dire accélérer le rythme. Le cheval doit allonger ses foulées, pas les rendre plus rapides.", [
        "Demande progressivement, avec ta jambe et ton assiette.",
        "Laisse la main accompagner l'encolure qui s'allonge.",
        "Compte les foulées dans ta tête : si le rythme s'accélère, le cheval se précipite.",
        "Reviens à l'allure de départ aussi progressivement que tu l'as quittée."
      ]),
      E("💡", "Le savais-tu ?", "Les juges de dressage notent la régularité des allures avant tout. Un cheval qui garde la même cadence dans les allongements obtient de meilleures notes qu'un cheval qui va plus vite mais se précipite.")
    ]),

    B("Les transitions", [
      S("🔀 Qu'est-ce qu'une transition ?", "Une transition, c'est un changement d'allure (par exemple du trot au galop) ou un changement à l'intérieur d'une même allure (par exemple d'un trot de travail à un trot moyen).", [
        { gras: "Montante :", texte: "vers une allure plus rapide ou plus énergique." },
        { gras: "Descendante :", texte: "vers une allure plus lente." }
      ]),
      S("✅ Les qualités d'une bonne transition", null, [
        "Elle se fait à l'endroit demandé, par exemple à une lettre.",
        "Elle est nette et fluide, sans à-coup.",
        "Le cheval reste droit, équilibré et en avant.",
        "La cadence de la nouvelle allure s'installe tout de suite.",
        "Le cheval accepte la main, sans lever la tête ni ouvrir la bouche."
      ]),
      S("❌ Les défauts à reconnaître", null, [
        "Une transition tardive, qui arrive bien après la lettre.",
        "Une transition brutale, où le cheval « tombe » sur les épaules.",
        "Des foulées précipitées ou traînantes juste avant ou juste après.",
        "Un cheval qui se défend : tête en l'air, bouche ouverte, hanches de travers."
      ]),
      S("🧩 Bien préparer", "Une transition se prépare quelques foulées avant. Ton cheval doit être attentif, en avant et équilibré.", [
        "Un demi-arrêt pour prévenir : un bref temps d'assiette et de doigts, aussitôt relâché.",
        "Les aides de la nouvelle allure, claires et légères.",
        "Ta main qui cède dès que le cheval répond."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Serrer les jambes sans étriers : tu remontes et tu rebondis.",
        "Confondre vitesse et amplitude : pousser le cheval à trotter plus vite au lieu d'allonger.",
        "Demander une transition sans prévenir le cheval.",
        "Tirer sur les rênes pour passer à l'allure inférieure.",
        "Garder les aides après la transition, au lieu de les relâcher."
      ]),
      S("🏇 Le défi du cavalier", "Mesure la qualité de tes transitions.", [
        "Choisis deux lettres sur la piste et fais une transition trot-pas, puis pas-trot, exactement à chacune.",
        "Fais un tour au trot assis sans étriers, sans perdre ta position.",
        "Allonge le trot sur un grand côté en comptant tes foulées : le rythme doit rester le même."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment ne plus rebondir au trot assis ?",
        "Combien de temps travailler sans étriers par séance ?",
        "Quelle différence entre cadence et vitesse ?",
        "Comment faire un bon demi-arrêt ?",
        "Pourquoi mon cheval lève-t-il la tête dans les transitions ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Le poids des jambes stabilise, pas leur force.",
        "La cadence est un rythme régulier, pas une vitesse.",
        "Allonger, c'est agrandir la foulée, pas la presser.",
        "Une transition se prépare, se demande, puis se relâche.",
        "Nette, à l'endroit demandé, cheval droit et en avant."
      ]),
      E("", "", "Les transitions sont des conversations : plus elles sont fines, mieux on se comprend.")
    ])
  ],
  quiz: [
    Q("Quel est le principal bénéfice du travail sans étriers ?", ["Aller plus vite", "Approfondir l'assiette et le liant", "Sauter plus haut", "Fatiguer le cheval"], 1, "Sans étriers, l'assiette s'approfondit et le cavalier gagne en liant et en indépendance des aides."),
    Q("Sans étriers, qu'est-ce qui stabilise tes jambes ?", ["Le fait de serrer fort", "Leur poids, jambes longues et relâchées", "Les rênes", "Rien"], 1, "Ce sont des jambes longues et décontractées qui tiennent par leur poids. Serrer fait remonter et rebondir."),
    Q("La cadence, c'est…", ["La vitesse du cheval", "La régularité du rythme des foulées", "La hauteur des sauts", "La longueur des rênes"], 1, "La cadence est la régularité du rythme : des foulées toutes identiques."),
    Q("Combien de temps compte le trot ?", ["4", "3", "2", "1"], 2, "Le trot est une allure à 2 temps, par diagonaux."),
    Q("Augmenter l'allure en gardant la cadence, c'est…", ["Accélérer le rythme des foulées", "Allonger les foulées sans les presser", "Tirer sur les rênes", "Passer au galop"], 1, "Le cheval doit agrandir ses foulées tout en gardant le même rythme."),
    Q("Qu'est-ce qu'une transition descendante ?", ["Le passage vers une allure plus rapide", "Le passage vers une allure plus lente", "Une descente en terrain varié", "Un saut"], 1, "Une transition descendante mène vers une allure plus lente, par exemple du trot au pas."),
    Q("Laquelle est une qualité d'une bonne transition ?", ["Elle arrive bien après la lettre", "Elle est nette, fluide et à l'endroit demandé", "Le cheval lève la tête", "Le cheval tombe sur les épaules"], 1, "Une bonne transition est nette, fluide, à l'endroit demandé, avec un cheval droit et en avant."),
    Q("À quoi sert le demi-arrêt avant une transition ?", ["À arrêter le cheval", "À prévenir le cheval et l'équilibrer", "À punir", "À accélérer"], 1, "Le demi-arrêt est un bref temps d'assiette et de doigts, aussitôt relâché, qui prévient et équilibre le cheval."),
    Q("Que fais-tu de tes aides une fois la transition obtenue ?", ["Je les garde pour qu'il continue", "Je les relâche", "Je les augmente", "Je change de main"], 1, "On relâche dès que le cheval répond : c'est ce qui lui dit qu'il a bien fait."),
    Q("Au trot assis, ton bassin…", ["Reste bloqué", "Suit le mouvement du dos du cheval", "Se soulève à chaque foulée", "Penche vers l'avant"], 1, "Le bassin accompagne le dos du cheval, souple, comme sur une balançoire.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-09 — INCURVATION ET TRAVAIL SUR LES COURBES   (programme FFE Galop 5 : incurver son cheval sur les courbes aux trois allures ;
   serpentines et cercles de 12 m au pas, de 15 m au trot, cercles de 20 m au galop) — reprend le brouillon g5-c2 (incurvation)
   --------------------------------------------------------------------------------- */
{ id: "g5n-09", icone: "〰️", type: { fr: "pratique" }, duree: { fr: "10 min" }, titre: { fr: "Incurvation et travail sur les courbes" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-th-cheval2.webp", couv: {} },

    B("Qu'est-ce que l'incurvation ?", [
      P("Sur une courbe, un cheval bien incurvé suit la ligne avec tout son corps, comme un wagon suit les rails. Au Galop 5, tu recherches cette incurvation aux trois allures, sur des cercles et des serpentines de plus en plus précis."),
      S("🌙 Tout le corps sur la courbe", "L'incurvation, c'est le cheval qui se courbe régulièrement de la nuque à la queue pour épouser la ligne du cercle. Il ne se contente pas de tourner la tête : tout son corps suit la courbe, sans se casser à l'encolure.", [
        "Ses postérieurs marchent dans la trace de ses antérieurs.",
        "Tu vois juste le coin de son œil intérieur, pas toute sa tête.",
        "Plus la courbe est serrée, plus l'incurvation est marquée, et plus elle est difficile."
      ]),
      S("💪 À quoi ça sert ?", null, [
        "À assouplir le cheval à gauche et à droite.",
        "À l'équilibrer dans les virages, pour qu'il ne tombe pas sur l'épaule intérieure.",
        "À préparer les départs au galop, les tracés d'obstacles et le travail de deux pistes."
      ]),
      E("💡", "Le savais-tu ?", "Comme nous, les chevaux ont un « bon côté » : ils s'incurvent plus facilement d'un côté que de l'autre. Le travail sur les deux mains, avec patience, les rend peu à peu plus symétriques.")
    ]),

    B("Les aides de l'incurvation", [
      S("🦵 Les jambes", null, [
        { gras: "La jambe intérieure, à la sangle :", texte: "c'est autour d'elle que le cheval s'incurve, et elle entretient l'impulsion." },
        { gras: "La jambe extérieure, un peu en arrière :", texte: "elle empêche les hanches de partir vers l'extérieur." }
      ]),
      S("🤲 Les mains", null, [
        { gras: "La rêne intérieure :", texte: "elle demande un léger pli, juste assez pour voir l'œil intérieur." },
        { gras: "La rêne extérieure :", texte: "elle contrôle l'encolure et l'épaule extérieure, et limite le pli." }
      ]),
      S("🪑 L'assiette et le regard", null, [
        "Tes épaules suivent les épaules du cheval, tes hanches suivent ses hanches.",
        "Un peu plus de poids sur la fesse intérieure, sans te pencher.",
        "Ton regard est sur la courbe, quelques mètres devant."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pense « la jambe intérieure vers la main extérieure ». Si ton cheval tourne seulement la tête, c'est souvent que ta rêne intérieure fait tout le travail : redonne-lui de la place et pousse avec ta jambe intérieure.")
    ]),

    B("Les figures du Galop 5", [
      S("📏 Les tailles à connaître", "Plus l'allure est rapide, plus la courbe est large.", [
        { gras: "Au pas :", texte: "cercles et serpentines de 12 m." },
        { gras: "Au trot :", texte: "cercles et serpentines de 15 m." },
        { gras: "Au galop :", texte: "cercles de 20 m, en partant d'un point précis." }
      ]),
      S("🎯 Réussir un cercle", null, [
        "Repère quatre points sur le cercle, à égale distance : ton cheval doit passer sur chacun.",
        "Garde la même incurvation et la même cadence tout le long.",
        "Si le cercle « s'ovalise », c'est que ton cheval sort par l'épaule : utilise davantage la rêne extérieure et la jambe intérieure."
      ]),
      S("〰️ Réussir une serpentine", null, [
        "Avant chaque changement de direction, redresse ton cheval pendant une ou deux foulées.",
        "Change ensuite tes aides : nouvelle jambe intérieure, nouvelle rêne intérieure.",
        "Garde des boucles de la même taille, en regardant toujours la boucle suivante."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tirer sur la rêne intérieure : le cheval tourne la tête mais son corps reste raide.",
        "Laisser les hanches partir vers l'extérieur.",
        "Se pencher vers l'intérieur de la courbe : le cheval perd l'équilibre.",
        "Faire des cercles de plus en plus petits sans le vouloir.",
        "Oublier de redresser le cheval avant de changer d'incurvation."
      ]),
      S("🏇 Le défi du cavalier", "Teste la précision de tes courbes.", [
        "Pose quatre plots sur un cercle de 15 m et trotte en passant juste à côté de chacun, sur les deux mains.",
        "Fais une serpentine de 3 boucles au pas en redressant ton cheval à chaque passage sur la ligne du milieu.",
        "Demande à ton enseignant sur quelle main ton cheval s'incurve le plus facilement."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon cheval est vraiment incurvé ?",
        "Pourquoi mon cheval s'incurve-t-il mieux à une main qu'à l'autre ?",
        "Comment éviter que mes cercles deviennent des ovales ?",
        "Quelle différence entre pli et incurvation ?",
        "Comment préparer une serpentine au trot ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Incurver, c'est courber tout le corps, pas seulement la tête.",
        "Jambe intérieure à la sangle, extérieure en arrière.",
        "La rêne extérieure tient l'épaule.",
        "12 m au pas, 15 m au trot, 20 m au galop.",
        "Redresser avant de changer d'incurvation."
      ]),
      E("", "", "Une belle courbe ne se dessine pas avec les mains : elle se dessine avec tout le corps du cheval.")
    ])
  ],
  quiz: [
    Q("Qu'est-ce que l'incurvation ?", ["Tourner seulement la tête", "Courber tout le corps le long de la ligne", "Accélérer dans la courbe", "Lever l'encolure"], 1, "L'incurvation engage tout le corps du cheval, de la nuque à la queue, pour épouser la courbe."),
    Q("Autour de quelle aide le cheval s'incurve-t-il ?", ["La jambe extérieure", "La jambe intérieure, à la sangle", "La rêne extérieure", "La voix"], 1, "Le cheval s'incurve autour de la jambe intérieure placée à la sangle."),
    Q("Le rôle de la jambe extérieure, un peu en arrière, est…", ["De faire accélérer", "D'empêcher les hanches de partir vers l'extérieur", "De faire tourner la tête", "Aucun"], 1, "Elle contrôle les hanches pour qu'elles restent sur la courbe."),
    Q("Quelle rêne contrôle l'épaule extérieure ?", ["La rêne intérieure", "La rêne extérieure", "Aucune", "Les deux tirées en même temps"], 1, "La rêne extérieure contrôle l'encolure et l'épaule extérieure et limite le pli."),
    Q("Quelle taille de cercle au trot au Galop 5 ?", ["10 m", "12 m", "15 m", "30 m"], 2, "Au Galop 5 : 12 m au pas, 15 m au trot, 20 m au galop."),
    Q("Quelle taille de cercle au galop au Galop 5 ?", ["12 m", "15 m", "20 m", "8 m"], 2, "Au galop, on travaille sur des cercles de 20 m."),
    Q("Ton cercle devient ovale. Pourquoi, le plus souvent ?", ["Le cheval sort par l'épaule extérieure", "Le cheval est trop incurvé", "La carrière est trop grande", "Tu regardes trop loin"], 0, "Le cheval fuit par l'épaule extérieure : il faut plus de rêne extérieure et de jambe intérieure."),
    Q("Avant de changer d'incurvation dans une serpentine, tu…", ["Accélères", "Redresses ton cheval une ou deux foulées", "T'arrêtes", "Tires sur la nouvelle rêne intérieure"], 1, "On redresse le cheval avant d'inverser les aides."),
    Q("Sur la courbe, ton poids est…", ["Penché vers l'extérieur", "Un peu plus sur la fesse intérieure, sans te pencher", "Sur l'avant", "Sur les étriers"], 1, "Un peu plus de poids à l'intérieur, buste droit, épaules qui suivent celles du cheval."),
    Q("Si ton cheval tourne seulement la tête, c'est souvent parce que…", ["Ta rêne intérieure fait tout le travail", "Ta jambe extérieure est trop en arrière", "Tu regardes la courbe", "Il est trop détendu"], 0, "Trop de rêne intérieure fait tourner la tête sans incurver le corps : il faut plus de jambe intérieure.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-10 — CESSION À LA JAMBE ET DÉPARTS AU GALOP   (programme FFE Galop 5 : définir la cession à la jambe et ses critères de jugement,
   la réaliser au pas des deux côtés ; partir au galop du pas ou du trot à un endroit précis) — reprend le brouillon g5-c2 (cession)
   --------------------------------------------------------------------------------- */
{ id: "g5n-10", icone: "↗️", type: { fr: "pratique" }, duree: { fr: "10 min" }, titre: { fr: "Cession à la jambe et départs au galop" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-examens-hd2.jpg", couv: {} },

    B("La cession à la jambe", [
      P("La cession à la jambe est ton premier travail « de côté » : le cheval avance tout en se déplaçant latéralement. Elle t'apprend à coordonner tes aides et rend ton cheval plus attentif à ta jambe. Au Galop 5, tu la réalises au pas, des deux côtés."),
      S("↗️ Comment se déplace le cheval ?", "Dans la cession à la jambe, le cheval avance et se déplace de côté en restant droit, légèrement plié à l'opposé de la direction du mouvement. Il croise les membres.", [
        "Son corps reste presque parallèle à la piste.",
        "Ses antérieurs et ses postérieurs croisent : le membre intérieur passe devant le membre extérieur.",
        "Il garde le même rythme qu'au pas sur une ligne droite."
      ]),
      S("📋 Les critères du juge", null, [
        "Un cheval droit, avec un léger pli de la nuque à l'opposé du mouvement.",
        "Les épaules légèrement en avance sur les hanches, jamais les hanches devant.",
        "Des membres qui croisent nettement.",
        "Un pas régulier, sans précipitation ni ralentissement.",
        "Une ligne de déplacement précise, du point de départ au point d'arrivée."
      ])
    ]),

    B("Réaliser une cession au pas", [
      S("🦵 Les aides (cession vers la droite, depuis la main gauche)", null, [
        { gras: "La jambe gauche, un peu en arrière de la sangle :", texte: "elle pousse le cheval vers la droite, par petites pressions qui se relâchent à chaque pas." },
        { gras: "La jambe droite, à la sangle :", texte: "elle entretient l'avancée et reçoit le déplacement." },
        { gras: "La rêne gauche :", texte: "elle demande le léger pli vers la gauche." },
        { gras: "La rêne droite :", texte: "elle contrôle l'épaule et limite le pli." }
      ]),
      S("📍 Un exercice pour commencer", null, [
        "Sur la ligne du quart (à 5 m de la piste), au pas, redresse bien ton cheval.",
        "Demande quelques pas de côté vers la piste, puis repars tout droit.",
        "Récompense dès les premiers pas corrects, puis fais la même chose de l'autre côté."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Demande peu à la fois. Trois pas de cession bien croisés, cheval droit, valent mieux qu'une diagonale entière où les hanches passent devant. Récompense chaque pas de côté correct en relâchant ta jambe.")
    ]),

    B("Les départs au galop", [
      S("🎯 Partir à un endroit précis", "Au Galop 5, tu pars au galop du trot ou du pas, exactement à l'endroit demandé, sur le bon pied. Comme toute transition, le départ se prépare.", [
        "Quelques foulées avant : un trot (ou un pas) actif, régulier et bien droit.",
        "Un demi-arrêt pour prévenir le cheval.",
        "Au point demandé : les aides du galop, nettes et brèves."
      ]),
      S("🦵 Les aides du départ au galop", null, [
        { gras: "La jambe intérieure, à la sangle :", texte: "elle donne l'impulsion du départ." },
        { gras: "La jambe extérieure, un peu en arrière :", texte: "elle indique le pied et engage le postérieur extérieur, qui donne la première foulée." },
        { gras: "La rêne intérieure :", texte: "un léger pli du côté du galop demandé." },
        { gras: "La rêne extérieure :", texte: "elle encadre et équilibre." },
        { gras: "L'assiette :", texte: "assise, un peu plus de poids vers l'intérieur, sans te pencher." }
      ]),
      S("🚶 Partir du pas", "Partir directement du pas demande un cheval attentif et bien en avant.", [
        "Commence par un pas énergique, presque « pressé » de partir.",
        "Demande le galop dans un coin, où le cheval est naturellement incurvé.",
        "Si le cheval trotte d'abord, repasse au pas, rééquilibre-le, puis redemande."
      ]),
      E("💡", "Le savais-tu ?", "La première foulée de galop part toujours du postérieur extérieur. C'est pour cela que ta jambe extérieure, un peu en arrière, joue un rôle si important dans le départ sur le bon pied.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Laisser les hanches passer devant les épaules dans la cession.",
        "Trop plier l'encolure : le cheval « fuit » par l'épaule.",
        "Ralentir ou accélérer pendant la cession.",
        "Se pencher en avant au moment du départ au galop.",
        "Demander le galop en poussant fort et en continu, au lieu d'une aide nette et brève."
      ]),
      S("🏇 Le défi du cavalier", "Montre la précision de tes aides.", [
        "Réalise une cession à la jambe au pas, de la ligne du quart à la piste, d'un côté puis de l'autre.",
        "Pars au galop du trot à une lettre choisie par ton enseignant, sur le bon pied.",
        "Pars au galop du pas une fois à chaque main."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi mon cheval met-il les hanches devant dans la cession ?",
        "Comment savoir si mon cheval croise bien ses membres ?",
        "Pourquoi mon cheval part-il sur le mauvais pied ?",
        "Comment réussir un départ au galop du pas ?",
        "À quoi sert la cession à la jambe pour la suite ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Cession : le cheval avance, se déplace de côté et croise.",
        "Corps droit, léger pli opposé au mouvement.",
        "Les épaules un peu devant les hanches.",
        "Le galop part du postérieur extérieur.",
        "Préparer, demander net, puis relâcher."
      ]),
      E("", "", "Un pas de côté bien fait, c'est un cheval qui a écouté une seule jambe.")
    ])
  ],
  quiz: [
    Q("Dans la cession à la jambe, le cheval…", ["Recule", "Avance et se déplace de côté en croisant les membres", "Tourne sur place", "Galope de côté"], 1, "Le cheval avance et se déplace latéralement en croisant les membres, légèrement plié à l'opposé du mouvement."),
    Q("De quel côté est le léger pli dans une cession à la jambe ?", ["Du côté du déplacement", "Du côté opposé au déplacement", "Il n'y a pas de pli", "Vers le haut"], 1, "Le cheval est légèrement plié à l'opposé de la direction du mouvement."),
    Q("Dans la cession, quelle partie du cheval doit être légèrement en avance ?", ["Les hanches", "Les épaules", "La tête seulement", "Aucune"], 1, "Les épaules sont légèrement en avance sur les hanches : des hanches devant sont une faute."),
    Q("Pour une cession vers la droite, quelle jambe pousse ?", ["La jambe droite", "La jambe gauche, un peu en arrière de la sangle", "Les deux ensemble", "Aucune"], 1, "C'est la jambe gauche, un peu en arrière de la sangle, qui pousse le cheval vers la droite."),
    Q("À quelle allure fait-on la cession à la jambe au Galop 5 ?", ["Au pas", "Au trot", "Au galop", "À l'arrêt"], 0, "Au Galop 5, la cession à la jambe se réalise au pas, des deux côtés."),
    Q("Quel membre donne la première foulée de galop ?", ["L'antérieur intérieur", "Le postérieur extérieur", "Le postérieur intérieur", "L'antérieur extérieur"], 1, "Le galop part toujours du postérieur extérieur."),
    Q("Quel est le rôle de la jambe extérieure dans le départ au galop ?", ["Elle ralentit", "Elle indique le pied et engage le postérieur extérieur", "Elle fait tourner la tête", "Elle n'a aucun rôle"], 1, "Placée un peu en arrière, elle indique le pied et engage le postérieur qui part en premier."),
    Q("Avant un départ au galop à une lettre, tu…", ["Accélères le trot au maximum", "Fais un demi-arrêt pour prévenir le cheval", "Lâches les rênes", "Te penches en avant"], 1, "On prépare avec un trot actif et droit, puis un demi-arrêt, avant les aides du galop."),
    Q("Ton cheval trotte au lieu de partir au galop du pas. Que fais-tu ?", ["Je pousse jusqu'à ce qu'il galope", "Je repasse au pas, je le rééquilibre et je redemande", "J'abandonne", "Je tire sur les rênes"], 1, "On revient au pas, on réinstalle un pas actif et équilibré, puis on redemande."),
    Q("Pourquoi demander le galop du pas dans un coin ?", ["Parce que le cheval y est naturellement incurvé", "Parce qu'il y a plus de place", "Parce que c'est obligatoire", "Pour ralentir"], 0, "Dans le coin, le cheval est déjà incurvé, ce qui l'aide à partir sur le bon pied.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-11 — SAUT D'OBSTACLES : TECHNIQUE ET PARCOURS   (programme FFE Galop 5 : stable et liant au galop et sur des obstacles rapprochés
   jusqu'à 90 cm ; galoper à la bonne cadence et à la bonne vitesse sur un parcours ; transitions entre les obstacles ;
   tracé précis en enchaînant les obstacles ; parcours CSO Club 3, 70 cm)
   --------------------------------------------------------------------------------- */
{ id: "g5n-11", icone: "🏆", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Saut d'obstacles : technique et parcours" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-exercices-hd2.jpg", couv: {} },

    B("Une position stable au saut", [
      P("Au Galop 5, tu ne sautes plus un obstacle isolé : tu enchaînes un parcours. Pour cela, il te faut une position stable, un galop réglé et des trajectoires précises. Ton cheval saute mieux quand tu ne le gênes pas et que tu l'amènes au bon endroit, à la bonne vitesse."),
      S("🏇 La position en équilibre", "Entre les obstacles, tu galopes en équilibre sur tes étriers, le buste un peu incliné, assis juste au-dessus de la selle.", [
        "Les talons bas, les genoux souples : ils amortissent comme des ressorts.",
        "Les mains basses, de chaque côté de l'encolure, en contact léger.",
        "Le regard loin devant, vers le prochain obstacle."
      ]),
      S("🪂 Pendant le saut", null, [
        "Tu laisses le cheval te fermer : ton buste s'incline quand il décolle, sans te jeter en avant.",
        "Tes mains suivent l'encolure pour lui laisser la liberté de s'arrondir.",
        "Tes jambes restent sous toi, sans glisser vers l'arrière.",
        "À la réception, tu te redresses progressivement et tu regardes déjà la suite."
      ]),
      S("🔁 Les obstacles rapprochés", "Les lignes de gymnastique (plusieurs obstacles séparés par une ou deux foulées, jusqu'à 90 cm au Galop 5) t'apprennent à rester liant et stable.", [
        "Le cheval trouve seul ses distances : toi, tu restes au milieu, sans bouger.",
        "Ton seul travail : regarder devant, garder la jambe au contact et les mains souples."
      ])
    ]),

    B("Le galop de parcours", [
      S("🎵 La bonne cadence", "La cadence est la clé d'un parcours : un galop régulier, énergique, ni trop rapide ni trop lent.", [
        "Un galop trop rapide met le cheval sur les épaules : il saute à plat et fait tomber des barres.",
        "Un galop trop lent manque d'énergie : le cheval peut refuser ou toucher.",
        "Pour les distances d'un parcours Club, on compte en moyenne une foulée de 3,50 m environ."
      ]),
      S("⏯️ Les transitions entre les obstacles", "Au Galop 5, tu sais changer d'allure entre deux obstacles : repasser au trot pour changer de pied, ou rééquilibrer le galop avant un virage.", [
        "Un demi-arrêt pour rééquilibrer, puis la jambe pour relancer.",
        "Si ton cheval est sur le mauvais pied dans un virage, une transition par le trot permet de repartir sur le bon pied."
      ]),
      E("💡", "Le savais-tu ?", "Les chefs de piste calculent les distances entre les obstacles d'un parcours en multiples de foulées. C'est pour cela qu'un galop régulier facilite tout : les obstacles « tombent » au bon endroit.")
    ]),

    B("Le tracé et le parcours", [
      S("🛤️ Choisir ses trajectoires", "Un bon tracé t'amène droit au centre de chaque obstacle, avec assez de place pour préparer l'abord.", [
        "Regarde le prochain obstacle dès la réception du précédent.",
        "Utilise toute la place : des virages réguliers plutôt que des coupes brusques.",
        "Arrive perpendiculaire à l'obstacle, au milieu, sur quelques foulées droites."
      ]),
      S("🏁 Le parcours Club 3", "Au Galop 5, tu vises des parcours de CSO de niveau Club 3, autour de 70 cm, avec une dizaine d'obstacles et une combinaison.", [
        "Reconnais le parcours à pied et mémorise l'ordre.",
        "Détends ton cheval sur le plat, puis sur quelques sauts.",
        "Passe entre les drapeaux de départ, sois régulier, passe entre les drapeaux d'arrivée."
      ]),
      E("👨‍🏫", "Le conseil du coach", "À la réception de chaque obstacle, tourne la tête vers le suivant avant même que ton cheval ait posé ses quatre pieds. Ton regard prépare le virage, et ton cheval le sent."),
      E("⚠️", "Toujours en sécurité", "On saute toujours avec un casque attaché et en présence d'un enseignant, sur des obstacles aux barres posées sur des taquets de sécurité. En cas de chute, on ne remonte qu'après l'accord de l'enseignant.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Se jeter en avant avant que le cheval décolle.",
        "Tirer sur les rênes au-dessus de l'obstacle.",
        "Accélérer avant chaque obstacle : le cheval se met sur les épaules.",
        "Regarder la barre ou le sol au lieu de regarder loin.",
        "Couper les virages : le cheval arrive de biais."
      ]),
      S("🏇 Le défi du cavalier", "Enchaîne comme sur un vrai parcours.", [
        "Saute une ligne de gymnastique de trois éléments sans toucher aux rênes, mains posées sur l'encolure.",
        "Enchaîne trois obstacles en gardant le même galop du début à la fin.",
        "Fais une transition au trot entre deux obstacles, puis repars au galop sur le bon pied."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon galop est à la bonne cadence ?",
        "Pourquoi je me jette en avant au saut ?",
        "Comment bien tourner entre deux obstacles ?",
        "Que faire si mon cheval refuse ?",
        "Comment me préparer à un parcours Club 3 ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Talons bas, genoux souples, regard loin.",
        "Laisse le cheval te fermer au saut.",
        "Un galop régulier rend les distances faciles.",
        "Droit et au milieu de chaque obstacle.",
        "Regarde le suivant dès la réception."
      ]),
      E("", "", "Un parcours réussi ne se gagne pas au-dessus des barres, mais dans les foulées entre elles.")
    ])
  ],
  quiz: [
    Q("Entre les obstacles, tu galopes…", ["Assis au fond de la selle", "En équilibre sur tes étriers, juste au-dessus de la selle", "Debout, jambes tendues", "Couché sur l'encolure"], 1, "En position d'équilibre, tu es juste au-dessus de la selle, talons bas, genoux souples."),
    Q("Au moment où le cheval décolle, ton buste…", ["Se jette vers l'avant avant lui", "S'incline quand il décolle, sans te jeter", "Reste bien droit", "Part en arrière"], 1, "Tu laisses le cheval te fermer : ton buste suit le mouvement, sans anticiper."),
    Q("Que font tes mains pendant le saut ?", ["Elles tirent pour aider le cheval", "Elles suivent l'encolure pour lui laisser sa liberté", "Elles lâchent les rênes", "Elles montent vers ton visage"], 1, "Les mains suivent l'encolure : le cheval doit pouvoir s'arrondir librement."),
    Q("Dans une ligne de gymnastique, qui trouve les distances ?", ["Le cavalier", "Le cheval, le cavalier restant stable", "L'enseignant", "Personne"], 1, "Les distances sont réglées : le cheval les trouve, toi tu restes stable et liant."),
    Q("Un galop trop rapide sur un parcours…", ["Aide le cheval à sauter haut", "Met le cheval sur les épaules : il saute à plat", "N'a aucun effet", "Évite les refus à coup sûr"], 1, "Trop vite, le cheval est déséquilibré sur l'avant et saute à plat."),
    Q("Quelle est la longueur moyenne d'une foulée de galop de parcours Club ?", ["1 m", "Environ 3,50 m", "6 m", "10 m"], 1, "On compte environ 3,50 m par foulée pour calculer les distances."),
    Q("Ton cheval est sur le mauvais pied dans un virage entre deux obstacles. Que peux-tu faire ?", ["Continuer quand même", "Faire une transition par le trot et repartir sur le bon pied", "T'arrêter", "Sauter plus vite"], 1, "Une transition par le trot permet de repartir au galop sur le bon pied."),
    Q("Comment aborder un obstacle ?", ["De biais, sur le côté", "Droit, au milieu, sur quelques foulées droites", "En accélérant fort", "Au trot uniquement"], 1, "Un abord droit et centré, sur quelques foulées, donne au cheval toutes ses chances."),
    Q("Quelle hauteur pour un parcours de CSO Club 3 ?", ["40 cm", "Environ 70 cm", "1,20 m", "1,50 m"], 1, "Le parcours de CSO Club 3, visé au Galop 5, est autour de 70 cm."),
    Q("Quand regardes-tu l'obstacle suivant ?", ["Juste avant de l'aborder", "Dès la réception du précédent", "Jamais", "Au départ seulement"], 1, "Tourner la tête vers le suivant dès la réception prépare le virage et le tracé.")
  ]
},

/* ---------------------------------------------------------------------------------
   g5n-12 — CROSS ET ÉQUITATION EN TERRAIN VARIÉ   (programme FFE Galop 5 : sauter de petits obstacles en extérieur à une vitesse stable
   et contrôlée ; rester en équilibre sur les étriers aux trois allures en extérieur et en terrain varié ; parcours de cross Club 3, 60 cm)
   --------------------------------------------------------------------------------- */
{ id: "g5n-12", icone: "🌲", type: { fr: "pratique" }, duree: { fr: "10 min" }, titre: { fr: "Cross et équitation en terrain varié" },
  blocs: [
    { type: "couv-affiche", src: "images/galops-v2-carte-videos-hd2.jpg", couv: {} },

    B("L'équilibre en terrain varié", [
      P("Sortir de la carrière, c'est retrouver ce que le cheval aime le plus : l'espace. Mais le terrain change sans arrêt : montées, descentes, sol dur ou glissant. Au Galop 5, tu restes en équilibre sur tes étriers aux trois allures, en extérieur, et tu découvres le cross."),
      S("⛰️ Dans les montées", null, [
        "Avance ton buste et laisse le cheval allonger l'encolure : c'est lui qui porte l'effort.",
        "Si besoin, attrape une mèche de crinière plutôt que de te tenir aux rênes.",
        "Garde un rythme régulier, sans t'arrêter au milieu d'une montée raide."
      ]),
      S("⬇️ Dans les descentes", null, [
        "Descends bien droit dans la pente, jamais en travers : le cheval pourrait glisser.",
        "Reste droit, le buste au-dessus de tes jambes, les talons bas.",
        "Garde un contact léger et une allure lente : le pas est la meilleure allure en descente raide."
      ]),
      S("🌧️ Lire le sol", null, [
        "Sur un sol dur ou caillouteux, on ralentit pour ménager les membres.",
        "Sur un sol glissant ou boueux, on évite les virages serrés et les accélérations.",
        "Dans les flaques et les gués, on avance au pas, en laissant le cheval regarder."
      ])
    ]),

    B("Le cross", [
      S("🪵 Les obstacles naturels", "Le cross se court en extérieur, sur des obstacles fixes inspirés de la nature.", [
        { gras: "Les troncs :", texte: "des obstacles droits et fixes." },
        { gras: "Les fossés :", texte: "on les saute en regardant loin devant, jamais au fond." },
        { gras: "Les contre-bas et les talus :", texte: "on descend ou on monte une marche de terrain." },
        { gras: "Le gué :", texte: "un passage dans l'eau, que l'on aborde lentement, au pas ou au trot, cheval droit et en avant." }
      ]),
      S("🏁 Le parcours Club 3", "Au Galop 5, tu vises des parcours de cross de niveau Club 3, avec des obstacles de 60 cm environ.", [
        "Comme en CSO : drapeau rouge à droite, drapeau blanc à gauche.",
        "Le parcours se reconnaît à pied, en regardant les abords et les réceptions.",
        "On galope à une vitesse stable et contrôlée, en ralentissant avant les obstacles qui le demandent (contre-bas, gué)."
      ]),
      E("🦺", "L'équipement obligatoire", "En cross, le gilet de protection est obligatoire, en plus du casque aux normes, bien attaché. Ton cheval porte des protections adaptées. Un parcours de cross se fait toujours encadré, jamais seul.")
    ]),

    B("Vitesse, contrôle et sécurité", [
      S("🎚️ Une vitesse stable et contrôlée", "En cross, la vitesse est plus grande qu'en carrière, mais elle doit rester sous contrôle.", [
        "Tu dois pouvoir ralentir à tout moment, avant chaque obstacle si besoin.",
        "Un galop de chasse, en équilibre, entre les obstacles.",
        "Avant un obstacle, tu te rassois un peu, tu raccourcis le galop et tu gardes la jambe."
      ]),
      S("🤝 Sortir en groupe", null, [
        "On garde au moins une longueur de cheval avec le cheval de devant.",
        "On prévient avant de changer d'allure, et on ne dépasse pas sans accord.",
        "Le plus lent du groupe donne le rythme."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Avant un obstacle de cross, pense « lent, regard, jambe ». Lent : tu règles ton galop assez tôt. Regard : tu regardes au-delà de l'obstacle. Jambe : tu gardes l'impulsion jusqu'au bout."),
      E("💡", "Le savais-tu ?", "Le cross est l'une des trois épreuves du concours complet, avec le dressage et le saut d'obstacles. Cette discipline est née des tests demandés aux chevaux de l'armée.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Descendre une pente en travers.",
        "Regarder le fond d'un fossé.",
        "Arriver trop vite sur un contre-bas ou dans un gué.",
        "Se tenir aux rênes dans une montée.",
        "Partir en cross sans gilet de protection."
      ]),
      S("🏇 Le défi du cavalier", "Montre que tu sais gérer le terrain.", [
        "En extérieur, avec ton enseignant, monte puis descends une pente au pas en restant en équilibre.",
        "Passe un gué au pas ou au trot, cheval droit et calme.",
        "Saute trois petits obstacles de cross en gardant le même galop entre eux."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment me placer dans une descente raide ?",
        "Pourquoi le gilet de protection est-il obligatoire en cross ?",
        "Comment aborder un fossé sans que mon cheval refuse ?",
        "Quelle vitesse adopter sur un parcours de cross Club 3 ?",
        "Comment aider mon cheval à passer l'eau la première fois ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Montée : buste en avant, encolure libre.",
        "Descente : bien droit dans la pente, lentement.",
        "Rouge à droite, blanc à gauche, comme en CSO.",
        "Gilet et casque obligatoires en cross.",
        "Lent, regard, jambe avant chaque obstacle."
      ]),
      E("", "", "En extérieur, le meilleur cavalier est celui qui lit le terrain avant que son cheval ne le découvre.")
    ])
  ],
  quiz: [
    Q("Dans une montée, ton buste…", ["Part en arrière", "S'avance pour laisser le cheval porter l'effort", "Reste bloqué droit", "Se penche sur le côté"], 1, "Tu avances le buste et laisses l'encolure libre : c'est le cheval qui porte l'effort."),
    Q("Comment descend-on une pente ?", ["En travers", "Bien droit dans la pente", "Au galop", "En zigzag rapide"], 1, "On descend droit dans la pente : en travers, le cheval risque de glisser."),
    Q("Quelle est la meilleure allure dans une descente raide ?", ["Le galop", "Le trot", "Le pas", "Peu importe"], 2, "Le pas permet au cheval de bien poser ses pieds et de garder l'équilibre."),
    Q("En sautant un fossé, tu regardes…", ["Le fond du fossé", "Loin devant, au-delà", "Ton cheval", "Le ciel"], 1, "Regarder le fond fait hésiter cavalier et cheval : on regarde loin devant."),
    Q("Quel équipement est obligatoire en cross, en plus du casque ?", ["Les éperons", "Le gilet de protection", "Une cravache", "Des gants"], 1, "Le gilet de protection est obligatoire en cross."),
    Q("Quelle hauteur pour un parcours de cross Club 3 ?", ["Environ 60 cm", "1 m", "1,20 m", "30 cm"], 0, "Le cross Club 3, visé au Galop 5, propose des obstacles d'environ 60 cm."),
    Q("Sur un sol glissant, tu…", ["Accélères", "Évites les virages serrés et les accélérations", "Fais des voltes", "Sautes plus haut"], 1, "Sur un sol glissant, on reste prudent : pas de virages serrés ni d'accélérations."),
    Q("En groupe en extérieur, quelle distance garder avec le cheval de devant ?", ["Aucune", "Au moins une longueur de cheval", "1 mètre", "Collé à lui"], 1, "Au moins une longueur de cheval, pour éviter les coups de pied."),
    Q("Avant un contre-bas ou un gué, tu…", ["Accélères", "Ralentis et gardes la jambe", "Lâches tout", "Fermes les yeux"], 1, "On ralentit et on garde l'impulsion avec la jambe, pour aborder de façon contrôlée."),
    Q("Le cross fait partie de quelle discipline ?", ["Le dressage", "Le concours complet", "L'endurance", "Le horse-ball"], 1, "Le cross est l'une des trois épreuves du concours complet, avec le dressage et le saut d'obstacles.")
  ]
}

];

window.COURS_GALOP5_V2 = COURS;
window.COURS_GALOP5_V2_VERSION = 1;
})();
