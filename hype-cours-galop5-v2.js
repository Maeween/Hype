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
    { type: "couv-affiche", src: "images/galop5-c03-apprendre.webp", couv: {} },

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
}

];

window.COURS_GALOP5_V2 = COURS;
window.COURS_GALOP5_V2_VERSION = 1;
})();
