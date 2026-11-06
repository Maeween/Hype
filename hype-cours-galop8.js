/* =====================================================================================
   hype-cours-galop8.js — GALOP 8 (cours + quiz)
   05/11/2026 (Blandine « Ok ») : plan de 20 cours d'après le programme officiel FFE du Galop 8 (REF n°237, 2022) :
     Vie équestre 6 (g8n-01 … g8n-06), Connaissance du cheval 4 (g8n-07 … g8n-10),
     Pratique équestre 7 (g8n-11 … g8n-17), Culture équestre 3 (g8n-18 … g8n-20).
   Les 3 cours à pied (longe, longues rênes, liberté) passent en Vie équestre, comme au Galop 7.
   Écrits un par un, en FRANÇAIS d'abord ; traductions seulement après relecture de Blandine.
   ÉTAT (07/11) : branché (HYPE_COURS_FICHIERS d'index.html). Galop 8 = « Prochainement » : seules les modératrices ouvrent les cours.
   À chaque livraison : incrémenter COURS_GALOP8_VERSION ci-dessous ET sa clé ?v= dans HYPE_COURS_FICHIERS (index.html).
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined") return;
var COURS_GALOP8_VERSION = 2; /* 07/11 : cours 15, « de ferme à ferme » précisé d'après le programme FFE */ /* v1 : */ /* 07/11 (Blandine « Ok continue ») : les 20 cours g8n-01 … g8n-20 en français, branchés sur la page du Galop 8 (« Prochainement » : seules les modératrices les ouvrent), à relire avant traduction */
var S = function (titre, sous, puces) { var o = { k: "section", titre: titre }; if (sous) o.sous = sous; if (puces) o.puces = puces.map(function (p) { return typeof p === "string" ? { texte: p } : p; }); return o; };
var P = function (texte) { return { k: "para", texte: texte }; };
var E = function (emoji, titre, texte) { var o = { k: "encadre", emoji: emoji, texte: texte }; if (titre) o.titre = titre; return o; };
var B = function (titre, contenu) { return { type: "texte-riche", aere: true, titre: { fr: titre }, contenu: { fr: contenu } }; };
var Q = function (question, options, correct, explication) { return { type: "qcm", question: { fr: question }, options: { fr: options }, correct: correct, explication: { fr: explication } }; };

var COURS = [

/* ---------------------------------------------------------------------------------
   g8n-01 — SOIGNER LES BLESSURES DE GARROT ET LES PLAIES LÉGÈRES
   (programme FFE Galop 8, « S'occuper du cheval » : soigner les blessures de garrot et les plaies légères)
   Photo provisoire : images/IMG_SANTE_PLAIE.jpg
   --------------------------------------------------------------------------------- */
{ id: "g8n-01", icone: "🩹", type: { fr: "soins" }, duree: { fr: "10 min" }, titre: { fr: "Soigner les blessures de garrot et les plaies légères" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_PLAIE.jpg", couv: {} },

    B("Les blessures de garrot", [
      P("Au Galop 8, tu dois savoir soigner toi-même une blessure de garrot et une plaie légère, et reconnaître le moment où il faut appeler le vétérinaire. Le garrot, c'est la saillie osseuse en haut du dos, à la base de l'encolure : l'avant de la selle se pose juste derrière. Comme il est peu protégé par les muscles, il se blesse facilement."),
      S("🔎 D'où vient la blessure ?", null, [
        { gras: "Une selle mal adaptée :", texte: "une arcade trop large fait descendre l'avant de la selle sur le garrot ; une arcade trop étroite le pince sur les côtés." },
        { gras: "Un tapis mal posé :", texte: "tiré vers le bas, il se tend sur le garrot et frotte à chaque foulée." },
        { gras: "Une couverture :", texte: "mal ajustée, elle frotte jour et nuit au même endroit." },
        { gras: "Un cheval qui change :", texte: "un cheval qui maigrit ou perd du muscle n'a plus la même forme de dos : une selle qui allait bien peut se mettre à blesser." }
      ]),
      S("👀 Les signes", null, [
        "Une zone chaude, gonflée ou sensible quand tu passes la main dessus.",
        "Des poils frottés ou cassés, une écorchure, une croûte.",
        "Un cheval qui se dérobe, couche les oreilles ou se recule quand tu poses la selle ou que tu touches son garrot."
      ]),
      E("💡", "Le savais-tu ?", "Les petites taches de poils blancs qu'on voit parfois sur le garrot ou le dos d'un cheval sont souvent la trace d'anciennes blessures de harnachement : en cicatrisant, le poil repousse blanc.")
    ]),

    B("Soigner une blessure de garrot", [
      S("🩹 Les étapes", null, [
        { gras: "Supprimer la cause :", texte: "plus de selle tant que la blessure n'est pas guérie. C'est le repos de selle. Vérifie aussi la couverture." },
        { gras: "Nettoyer :", texte: "rince doucement à l'eau propre ou au sérum physiologique, pour retirer la saleté et la sueur." },
        { gras: "Désinfecter :", texte: "s'il y a une écorchure, applique un antiseptique doux, dilué comme l'indique sa notice ou ton vétérinaire." },
        { gras: "Calmer l'inflammation :", texte: "si la zone est chaude et gonflée sans plaie ouverte, le froid (une douche froide de quelques minutes) aide à la dégonfler." },
        { gras: "Surveiller chaque jour :", texte: "chaleur, gonflement, sensibilité. La blessure doit aller mieux de jour en jour." }
      ]),
      S("🐴 Pendant le repos de selle", null, [
        "Ton cheval peut continuer à travailler à pied ou à la longe, sans rien qui appuie sur sa blessure.",
        "Tu ne resselles qu'une fois la blessure cicatrisée et le garrot plus du tout sensible au toucher.",
        "Avant de resseller, fais vérifier la selle par ton enseignant ou par un sellier : sinon, la blessure reviendra au même endroit."
      ]),
      E("👨‍🏫", "Le conseil du coach", "À chaque fois que tu selles, remonte le tapis dans la chambre de la selle, le creux sous le pommeau, pour qu'il ne tire pas sur le garrot. Une fois en selle, tu dois pouvoir glisser environ trois doigts entre l'arcade et le garrot : la selle ne doit jamais le toucher."),
      E("🔭", "Pour aller plus loin", "Une blessure de garrot négligée peut s'infecter en profondeur. Elle ne relève plus alors des soins du cavalier : il faut le vétérinaire, et souvent de longues semaines de soins.")
    ]),

    B("Soigner une plaie légère", [
      P("Une plaie légère, c'est une écorchure, une éraflure ou une petite coupure : elle est superficielle, saigne peu et se trouve loin d'une articulation, d'un tendon ou d'un œil."),
      S("🧰 Les étapes", "Ton cheval est attaché et tu t'es lavé les mains.", [
        "S'il y a un saignement, appuie quelques minutes avec une compresse propre pour l'arrêter.",
        "Nettoie la plaie à l'eau propre, avec un jet doux, ou au sérum physiologique : retire la terre, les brins de paille et les poils.",
        "Si besoin, coupe aux ciseaux les poils qui tombent dans la plaie.",
        "Désinfecte avec un antiseptique adapté au cheval, dilué selon sa notice.",
        "Laisse sécher, puis applique un produit cicatrisant si ton vétérinaire te l'a conseillé.",
        "Les jours suivants, nettoie et surveille : la plaie doit rester propre, sans chaleur ni gonflement."
      ]),
      E("💉", "Le tétanos", "Le tétanos est une maladie grave, souvent mortelle chez le cheval : le microbe vit dans la terre et entre par une plaie, même toute petite. Dès que ton cheval se blesse, vérifie sur son livret que son vaccin contre le tétanos est à jour. S'il ne l'est pas, appelle le vétérinaire."),
      S("🚨 Appelle le vétérinaire si…", "Ce n'est plus une plaie légère.", [
        "Le saignement ne s'arrête pas après quelques minutes de compression.",
        "La plaie est profonde, elle s'ouvre largement, ou elle est faite par une pointe (un clou, un piquet).",
        "Elle se trouve près d'une articulation, d'un tendon ou d'un œil.",
        "Quelque chose est resté planté dans la plaie : n'y touche pas.",
        "Ton cheval boite.",
        "Dans les jours qui suivent, la plaie devient chaude, gonfle, sent mauvais ou laisse couler du pus."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Ajouter un tapis plus épais sous une selle trop étroite pour « protéger » le garrot : elle serre encore plus.",
        "Garder un tapis ou un amortisseur sale et raide : il frotte. Nettoie-les souvent.",
        "Désinfecter à l'alcool ou à l'eau oxygénée : ils abîment la peau et retardent la cicatrisation.",
        "Utiliser un antiseptique pur alors qu'il doit être dilué.",
        "Mettre une crème sur une plaie qui n'a pas été nettoyée : tu enfermes la saleté dessous.",
        "Utiliser une crème antibiotique sans l'avis du vétérinaire."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais prévenir et soigner.", [
        "Selle ton cheval, remonte le tapis dans la chambre et vérifie l'espace entre l'arcade et le garrot.",
        "Passe la main sur le garrot et le dos avant et après la séance : explique ce que tu cherches.",
        "Prépare ce qu'il faut pour soigner une plaie légère et explique chaque étape.",
        "Retrouve dans le livret de ton cheval la date de son dernier vaccin contre le tétanos."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si ma selle est bien adaptée à mon cheval ?",
        "Combien de temps dure un repos de selle ?",
        "Pourquoi les poils repoussent-ils blancs après une blessure ?",
        "Que mettre dans une trousse de premiers soins pour mon cheval ?",
        "Comment reconnaître une plaie qui s'infecte ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Garrot blessé : d'abord, supprimer la cause.",
        "Pas de selle avant la guérison complète.",
        "Plaie légère : nettoyer, désinfecter, surveiller.",
        "Toujours vérifier le vaccin contre le tétanos.",
        "Profonde, près d'une articulation ou qui boite : vétérinaire."
      ]),
      E("", "", "Une main passée sur le garrot à chaque pansage, c'est la meilleure façon d'arrêter une blessure avant qu'elle ne commence.")
    ])
  ],
  lexique: { fr: [
    ["Garrot", "Saillie osseuse en haut du dos, à la base de l'encolure, juste devant la selle."],
    ["Arcade", "Avant de la selle, qui passe au-dessus du garrot."],
    ["Chambre", "Creux sous la selle, entre les deux panneaux, qui laisse de la place au garrot et à la colonne."],
    ["Amortisseur", "Protection posée sous la selle, par-dessus le tapis, pour mieux répartir son appui."],
    ["Repos de selle", "Période pendant laquelle on ne selle plus le cheval, le temps qu'une blessure guérisse."],
    ["Antiseptique", "Produit qui détruit les microbes sur une plaie."],
    ["Sérum physiologique", "Eau salée stérile, douce pour rincer une plaie."],
    ["Tétanos", "Maladie grave due à un microbe de la terre qui entre par une plaie ; un vaccin en protège."]
  ] },
  quiz: [
    Q("Qu'est-ce que le garrot ?", ["L'arrière de la selle", "La saillie osseuse en haut du dos, à la base de l'encolure", "Le creux derrière la sangle", "Le haut de la croupe"], 1, "Le garrot est la saillie osseuse à la base de l'encolure, juste devant la selle. Peu protégé par les muscles, il se blesse facilement."),
    Q("Une arcade trop large…", ["Pince le garrot sur les côtés", "N'a aucun effet sur le garrot", "Fait descendre l'avant de la selle sur le garrot", "Fait glisser la selle vers l'arrière"], 2, "Trop large, l'arcade laisse descendre l'avant de la selle sur le garrot. Trop étroite, elle le pince sur les côtés."),
    Q("Quel est le premier geste face à une blessure de garrot ?", ["Mettre un tapis plus épais", "Monter moins longtemps", "Mettre une crème et continuer à monter", "Supprimer la cause : plus de selle jusqu'à la guérison"], 3, "On supprime d'abord ce qui blesse : c'est le repos de selle, jusqu'à la guérison complète."),
    Q("Quand peux-tu resseller ton cheval ?", ["Dès que la croûte se forme", "Quand la blessure est cicatrisée et que le garrot n'est plus sensible", "Après deux jours de repos", "Quand le cheval ne saigne plus"], 1, "On ne resselle qu'une fois la blessure cicatrisée et le garrot plus du tout sensible, après avoir fait vérifier la selle."),
    Q("Pourquoi remonter le tapis dans la chambre de la selle ?", ["Pour qu'il tienne plus chaud", "Pour qu'il ne tire pas sur le garrot", "Pour cacher les sangles", "Pour que la selle glisse moins"], 1, "Remonté dans la chambre, sous le pommeau, le tapis ne se tend pas sur le garrot et ne frotte pas."),
    Q("Une selle trop étroite blesse le garrot. Que fais-tu ?", ["Je change de selle ou je la fais adapter", "J'ajoute un tapis plus épais", "Je serre moins la sangle", "Je monte en suspension"], 0, "Un tapis plus épais serre encore plus le garrot : c'est la selle elle-même qu'il faut changer ou faire adapter."),
    Q("Avec quoi nettoies-tu une plaie légère ?", ["De l'eau propre ou du sérum physiologique", "De l'alcool", "De l'eau oxygénée", "De la crème cicatrisante directement"], 0, "On rince à l'eau propre, avec un jet doux, ou au sérum physiologique. L'alcool et l'eau oxygénée abîment la peau."),
    Q("Ton cheval se blesse. Quel document vérifies-tu ?", ["Sa carte d'immatriculation", "Son livret, pour le vaccin contre le tétanos", "Sa licence de compétition", "Le contrat de pension"], 1, "Le microbe du tétanos entre par une plaie, même petite : on vérifie sur le livret que le vaccin est à jour."),
    Q("Laquelle de ces plaies demande le vétérinaire ?", ["Une petite éraflure sur l'épaule", "Une petite coupure juste à côté du boulet", "Une écorchure qui saigne à peine sur la croupe", "Des poils frottés sous la couverture"], 1, "Près d'une articulation, comme le boulet, même une petite plaie peut être grave : on appelle le vétérinaire."),
    Q("Un morceau de bois est resté planté dans la plaie. Que fais-tu ?", ["Je le retire tout de suite", "Je n'y touche pas et j'appelle le vétérinaire", "Je le coupe au ras de la peau", "Je mets un pansement serré par-dessus"], 1, "Un objet planté ne se retire pas : il peut boucher un vaisseau ou cacher une plaie profonde. C'est au vétérinaire de s'en occuper.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g8n-02 — AMÉLIORER ET ENTRETENIR LA CONDITION PHYSIQUE
   (programme FFE Galop 8, « S'occuper du cheval » : améliorer et entretenir la condition physique)
   — la physiologie et le pouls sont au programme du Galop 9 : pas ici
   --------------------------------------------------------------------------------- */
{ id: "g8n-02", icone: "💪", type: { fr: "soins" }, duree: { fr: "10 min" }, titre: { fr: "Améliorer et entretenir la condition physique" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-th-vie.webp", couv: {} },

    B("Pourquoi travailler la condition physique", [
      P("Au Galop 8, ton cheval enchaîne des séances plus exigeantes : reprises plus longues, parcours plus hauts, cross plus soutenus. Pour qu'il les supporte sans se blesser ni se fatiguer, sa condition physique se construit, puis s'entretient. Tu dois savoir organiser ce travail."),
      S("🎯 Ce qu'on cherche", null, [
        { gras: "Le souffle :", texte: "le cheval fait l'effort demandé et récupère vite après." },
        { gras: "Les muscles :", texte: "ils portent le cavalier et propulsent le cheval sans se crisper." },
        { gras: "Les tendons, les articulations et les os :", texte: "ils se renforcent lentement, bien plus lentement que les muscles et le souffle." }
      ]),
      S("👀 Un cheval en forme", null, [
        "Il garde la même énergie du début à la fin de la séance.",
        "Son souffle redevient calme rapidement au pas, après l'effort.",
        "Il transpire raisonnablement pour l'effort et la température.",
        "Le lendemain, il est frais, sans raideur ni chaleur dans les membres."
      ]),
      E("💡", "Le savais-tu ?", "Un cheval reprend du souffle et du muscle en quelques semaines, mais ses tendons ont besoin de plusieurs mois pour se renforcer. C'est pour ça qu'un cheval qui « a l'air en forme » peut encore se blesser s'il va trop vite.")
    ]),

    B("Améliorer la condition physique", [
      S("📐 Les règles d'or", null, [
        { gras: "La progressivité :", texte: "augmente d'abord la durée des séances, puis leur intensité, jamais les deux en même temps." },
        { gras: "La régularité :", texte: "plusieurs séances par semaine valent mieux qu'une grosse séance de temps en temps." },
        { gras: "L'alternance :", texte: "un effort, puis une récupération au pas ; une séance difficile, puis une séance plus légère." },
        { gras: "La variété :", texte: "plat, saut, extérieur, longe : le cheval travaille tout son corps et garde le moral." }
      ]),
      S("🌳 Les outils", null, [
        { gras: "Le travail de fond :", texte: "de longues périodes au pas et au trot, en extérieur, sur des terrains variés. C'est la base de tout." },
        { gras: "Les montées :", texte: "au pas puis au trot, elles musclent l'arrière-main et le dos sans choc pour les membres." },
        { gras: "Le galop en extérieur :", texte: "des reprises de galop régulières, séparées par du pas, pour développer le souffle." },
        { gras: "Les transitions :", texte: "nombreuses sur le plat, elles font travailler les postérieurs." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Note tes séances dans ton carnet : durée, contenu, comment ton cheval a récupéré. En quelques semaines, tu verras sa progression, et tu repéreras tout de suite une séance de trop.")
    ]),

    B("Entretenir la condition physique", [
      S("🔁 Au quotidien", null, [
        "Chaque séance commence par une détente progressive et se termine par un retour au calme au pas, jusqu'à ce que le souffle soit calme.",
        "La ration suit le travail : quand le travail augmente ou diminue, on adapte les aliments concentrés, en accord avec l'enseignant ou le responsable de l'écurie.",
        "Les pieds, la ferrure et les dents sont suivis régulièrement : un cheval gêné ne peut pas progresser.",
        "Le repos compte aussi : au moins un jour léger par semaine, et du temps au paddock ou au pré."
      ]),
      S("📅 Après une pause", "Blessure, vacances, hiver : un cheval qui s'est arrêté perd vite sa forme.", [
        "Reprends d'abord au pas, en augmentant la durée petit à petit.",
        "Ajoute le trot, puis le galop, sur plusieurs semaines.",
        "Le saut et les efforts intenses reviennent en dernier.",
        "Plus la pause a été longue, plus la reprise doit l'être aussi."
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, tu apprendras comment fonctionnent le cœur et les muscles pendant l'effort, et comment mesurer la récupération avec le pouls et la respiration.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Préparer un concours en multipliant les séances intenses la dernière semaine.",
        "Faire toujours le même travail, dans la même carrière.",
        "Galoper longtemps sur un sol dur ou trop profond : les tendons souffrent.",
        "Remettre un cheval au box encore essoufflé et mouillé."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais organiser le travail de ton cheval.", [
        "Prépare un planning de quatre semaines pour un cheval qui reprend après un mois de repos.",
        "Explique pourquoi tu as placé chaque séance difficile et chaque séance légère.",
        "Pendant une séance, montre où tu places les phases d'effort et de récupération."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment préparer mon cheval pour une saison de concours ?",
        "Combien de temps faut-il pour remettre un cheval en forme ?",
        "Pourquoi les montées sont-elles bonnes pour le dos ?",
        "Comment savoir si mon cheval est fatigué ?",
        "Que faire travailler un jour de séance légère ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Durée d'abord, intensité ensuite.",
        "Régularité et variété.",
        "Effort, puis récupération.",
        "Les tendons se renforcent lentement.",
        "Après une pause, on reprend au pas."
      ]),
      E("", "", "La condition physique ne se gagne pas en une séance : elle se construit jour après jour, et c'est elle qui protège ton cheval.")
    ])
  ],
  lexique: { fr: [
    ["Condition physique", "Capacité du cheval à fournir un effort et à bien récupérer ensuite."],
    ["Travail de fond", "Longues séances au pas et au trot, souvent en extérieur, qui construisent la base de la condition physique."],
    ["Récupération", "Retour au calme du souffle et des muscles après un effort."],
    ["Retour au calme", "Fin de séance au pas, jusqu'à ce que le cheval ait retrouvé un souffle calme."],
    ["Progressivité", "Augmentation lente et régulière de la difficulté du travail."],
    ["Aliments concentrés", "Granulés et céréales, qui apportent de l'énergie en plus du foin."]
  ] },
  quiz: [
    Q("Quand on améliore la condition physique, que fait-on augmenter en premier ?", ["L'intensité", "La hauteur des obstacles", "Le nombre de concours", "La durée"], 3, "On augmente d'abord la durée, puis l'intensité, jamais les deux en même temps."),
    Q("Quelle partie du corps se renforce le plus lentement ?", ["Les tendons", "Le souffle", "Les muscles", "Le moral"], 0, "Les tendons ont besoin de plusieurs mois pour se renforcer, bien plus que le souffle et les muscles."),
    Q("Qu'appelle-t-on le travail de fond ?", ["Des sauts répétés", "Du galop rapide sur la piste", "Le travail du fond de la carrière", "De longues périodes au pas et au trot, sur des terrains variés"], 3, "Le travail de fond, au pas et au trot, souvent en extérieur, est la base de la condition physique."),
    Q("Pourquoi les montées sont-elles intéressantes ?", ["Elles fatiguent le cheval plus vite", "Elles remplacent la détente", "Elles évitent de ferrer", "Elles musclent l'arrière-main et le dos sans choc pour les membres"], 3, "Au pas puis au trot, les montées musclent l'arrière-main et le dos, en ménageant les membres."),
    Q("Un cheval en forme…", ["Reste essoufflé longtemps après l'effort", "Transpire beaucoup même au pas", "Est raide le lendemain", "Récupère vite au pas après l'effort"], 3, "Un cheval en forme retrouve vite un souffle calme au pas, après l'effort."),
    Q("Ton cheval reprend après deux mois de pause. Par quoi commences-tu ?", ["Un petit parcours pour le remotiver", "Du galop en extérieur", "Une longue séance de trot dès le premier jour", "Du pas, en augmentant la durée petit à petit"], 3, "On reprend au pas, puis on ajoute le trot et le galop sur plusieurs semaines. Le saut revient en dernier."),
    Q("Le travail de ton cheval augmente. Que fais-tu pour sa ration ?", ["Rien, le foin suffit toujours", "Je double les granulés", "Je supprime le foin", "Je l'adapte, en accord avec l'enseignant ou le responsable de l'écurie"], 3, "La ration suit le travail : on adapte les concentrés avec le responsable, sans changement brutal."),
    Q("Quelle semaine de préparation est la plus judicieuse avant un concours ?", ["Des séances très intenses tous les jours", "Un travail habituel, avec une séance plus légère la veille", "Aucune séance", "Uniquement des sauts"], 1, "La forme se construit sur des semaines : la dernière semaine, on garde le travail habituel, sans en rajouter.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-03 — LA TONTE   (programme FFE Galop 8, « S'occuper du cheval » : tondre un cheval)
   --------------------------------------------------------------------------------- */
{ id: "g8n-03", icone: "✂️", type: { fr: "soins" }, duree: { fr: "11 min" }, titre: { fr: "La tonte" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c05-soins.webp", couv: {} },

    B("Pourquoi tondre", [
      P("Au Galop 8, tu dois savoir tondre un cheval. En hiver, le cheval se couvre d'un poil épais. Au travail, il transpire dessous, met des heures à sécher et risque de prendre froid. La tonte retire une partie de ce poil pour qu'il travaille sans avoir trop chaud et sèche vite."),
      S("🤔 Faut-il tondre ?", null, [
        { gras: "Oui :", texte: "pour un cheval qui travaille régulièrement en hiver et transpire beaucoup." },
        { gras: "Pas forcément :", texte: "pour un cheval qui vit au pré et travaille peu : son poil le protège." },
        { gras: "Toujours :", texte: "un cheval tondu doit être couvert au repos, avec une couverture adaptée à la tonte et à la température." }
      ]),
      S("✂️ Les principales tontes", "Plus on tond, plus le cheval doit être couvert.", [
        { gras: "La tonte complète (intégrale) :", texte: "tout le corps, membres et tête compris. Pour un cheval qui travaille beaucoup et vit au box." },
        { gras: "La tonte de chasse :", texte: "tout le corps, sauf les membres et la place de la selle, qui gardent leur poil pour protéger." },
        { gras: "La tonte de couverture :", texte: "on garde le poil sur le dos, la croupe et les membres, comme si le cheval portait une couverture." },
        { gras: "La tonte irlandaise :", texte: "seulement le bas de l'encolure, le poitrail et le ventre, là où il transpire le plus. Pour un cheval qui vit dehors ou travaille peu." }
      ]),
      E("💡", "Le savais-tu ?", "Le poil d'hiver commence à pousser quand les jours raccourcissent, à la fin de l'été, et non quand il fait froid. C'est la lumière, et pas la température, qui donne le signal.")
    ]),

    B("Préparer la tonte", [
      S("🧰 Le matériel", null, [
        "Une tondeuse en bon état, aux lames propres et affûtées : des lames émoussées tirent le poil et chauffent.",
        "De l'huile pour graisser les lames, et une brosse pour les nettoyer pendant la tonte.",
        "Une craie ou un morceau de savon sec pour tracer les limites de la tonte.",
        "Une couverture prête pour couvrir le cheval tout de suite après."
      ]),
      S("🐴 Le cheval et le lieu", null, [
        "Le cheval est propre et parfaitement sec : un poil sale ou humide bloque la tondeuse.",
        "Il est attaché dans un endroit calme, bien éclairé, au sol sec et non glissant.",
        "Le câble de la tondeuse passe loin de ses pieds, et la prise est à l'abri de l'eau.",
        "Pour un cheval qui est tondu pour la première fois ou qui est inquiet, une personne l'aide à la tête."
      ]),
      E("⚠️", "La sécurité", "Avant de commencer, fais écouter le bruit de la tondeuse au cheval, puis pose-la éteinte, puis allumée, sur son épaule. Ne tonds jamais un cheval qui se défend : arrête-toi et demande de l'aide à ton enseignant.")
    ]),

    B("Tondre", [
      S("🔁 Les étapes", null, [
        "Trace les limites de la tonte des deux côtés, à la craie, pour qu'elles soient symétriques.",
        "Commence par une zone peu sensible, comme l'épaule.",
        "Tonds à rebrousse-poil, par longs passages qui se chevauchent un peu, la tondeuse posée à plat sur la peau.",
        "Tends la peau avec ton autre main dans les zones de plis : coude, grasset, encolure.",
        "Touche régulièrement les lames : si elles chauffent, fais une pause, nettoie-les et graisse-les.",
        "Garde les zones délicates (tête, bas des membres, entre les postérieurs) pour la fin, quand le cheval est habitué au bruit."
      ]),
      S("✅ Après la tonte", null, [
        "Brosse le cheval pour retirer les poils coupés.",
        "Couvre-le aussitôt avec une couverture adaptée.",
        "Nettoie, graisse et range la tondeuse.",
        "Les jours suivants, surveille qu'il n'a pas froid : il peut avoir besoin d'une couverture plus chaude."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour tracer une limite bien droite, par exemple celle d'une tonte de chasse sur les membres, prends des repères sur le corps du cheval : le coude devant, le grasset derrière. Regarde souvent ton cheval de loin, des deux côtés, pour comparer.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Tondre dans le sens du poil : la tonte n'est pas nette.",
        "Appuyer la pointe des lames contre la peau : elles griffent.",
        "Tondre l'intérieur des oreilles : ces poils protègent l'oreille des insectes et de la poussière.",
        "Couper les vibrisses, les longs poils autour de la bouche et des yeux : le cheval s'en sert pour sentir ce qui l'entoure."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais tondre en sécurité.", [
        "Choisis la tonte adaptée à un cheval de ton écurie, et explique ton choix.",
        "Prépare le matériel, le cheval et le lieu.",
        "Trace et réalise une tonte irlandaise symétrique.",
        "Couvre le cheval et range la tondeuse."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle tonte choisir pour mon cheval ?",
        "Comment habituer un jeune cheval à la tondeuse ?",
        "Quelle couverture mettre après une tonte de chasse ?",
        "Combien de fois tondre dans l'hiver ?",
        "Comment entretenir les lames d'une tondeuse ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "On tond pour un cheval qui travaille et transpire.",
        "Plus on tond, plus on couvre.",
        "Cheval propre, sec, attaché.",
        "À rebrousse-poil, peau tendue.",
        "Lames propres, graissées, jamais brûlantes."
      ]),
      E("", "", "Une belle tonte, c'est un cheval à l'aise au travail et au chaud au repos.")
    ])
  ],
  lexique: { fr: [
    ["Tonte complète", "Tonte de tout le corps, membres et tête compris."],
    ["Tonte de chasse", "Tonte du corps qui garde le poil sur les membres et à la place de la selle."],
    ["Tonte de couverture", "Tonte qui garde le poil sur le dos, la croupe et les membres."],
    ["Tonte irlandaise", "Tonte du bas de l'encolure, du poitrail et du ventre."],
    ["Rebrousse-poil", "Sens contraire à la pousse du poil."],
    ["Vibrisses", "Longs poils autour de la bouche et des yeux, qui servent au toucher."]
  ] },
  quiz: [
    Q("Pourquoi tond-on un cheval en hiver ?", ["Pour qu'il ait plus chaud au pré", "Pour qu'il soit plus beau en photo", "Pour éviter les parasites", "Pour qu'il transpire moins au travail et sèche plus vite"], 3, "Avec un poil d'hiver épais, le cheval qui travaille transpire beaucoup et sèche lentement. La tonte l'aide à travailler et à sécher vite."),
    Q("Quelle tonte garde le poil sur les membres et à la place de la selle ?", ["La tonte de chasse", "La tonte complète", "La tonte irlandaise", "La tonte de couverture"], 0, "La tonte de chasse tond le corps mais garde le poil sur les membres et sous la selle."),
    Q("Quelle tonte convient à un cheval qui vit dehors et travaille peu ?", ["La tonte complète", "La tonte de chasse", "Aucune tonte n'est possible", "La tonte irlandaise"], 3, "La tonte irlandaise retire seulement le poil du bas de l'encolure, du poitrail et du ventre."),
    Q("Dans quel état doit être le cheval avant la tonte ?", ["Mouillé, pour que le poil soit plus souple", "Propre et parfaitement sec", "Juste après le travail", "Couvert"], 1, "Un poil sale ou humide bloque la tondeuse et donne une tonte irrégulière."),
    Q("Dans quel sens tonds-tu ?", ["À rebrousse-poil", "Dans le sens du poil", "En travers du poil", "Peu importe"], 0, "On tond à rebrousse-poil, par longs passages qui se chevauchent un peu."),
    Q("Les lames de ta tondeuse deviennent chaudes. Que fais-tu ?", ["Je continue plus vite", "Je les mouille", "Je fais une pause, je les nettoie et je les graisse", "J'appuie moins fort"], 2, "Des lames chaudes brûlent la peau : on s'arrête, on nettoie, on graisse et on laisse refroidir."),
    Q("Que ne faut-il jamais tondre ?", ["L'épaule", "Le ventre", "Le poitrail", "L'intérieur des oreilles et les vibrisses"], 3, "Les poils des oreilles protègent des insectes et de la poussière ; les vibrisses servent au toucher."),
    Q("Que fais-tu juste après la tonte ?", ["Je mets le cheval au pré sans couverture", "Je le douche", "Je le monte pour l'échauffer", "Je le brosse et je le couvre aussitôt"], 3, "On retire les poils coupés et on couvre tout de suite le cheval, qui a perdu sa protection.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-04 — LA LONGE À L'OBSTACLE   (programme FFE Galop 8, pratique à pied : exercer un cheval
   ou un poney à l'obstacle à la longe, avec caveçon et enrênements)
   --------------------------------------------------------------------------------- */
{ id: "g8n-04", icone: "⭕", type: { fr: "à pied" }, duree: { fr: "11 min" }, titre: { fr: "La longe à l'obstacle" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c06-travail-pied.webp", couv: {} },

    B("Pourquoi sauter à la longe", [
      P("Au Galop 7, tu as appris à longer avec un enrênement. Au Galop 8, tu fais sauter ton cheval à la longe, avec un caveçon et des enrênements. Sans le poids du cavalier, il apprend à sauter librement, à trouver son équilibre et à utiliser son dos."),
      S("🎯 Les intérêts", null, [
        "Faire découvrir l'obstacle à un jeune cheval, sans le gêner.",
        "Redonner confiance à un cheval qui a eu peur.",
        "Faire travailler le dos et l'encolure d'un cheval, qui saute en s'arrondissant.",
        "Observer la façon de sauter d'un cheval, de l'extérieur."
      ]),
      S("🧰 Le matériel", null, [
        { gras: "Le caveçon :", texte: "la longe s'accroche à l'anneau du milieu de la muserolle. Il donne un contrôle précis sans agir sur la bouche." },
        { gras: "Le surfaix :", texte: "il porte les enrênements." },
        { gras: "L'enrênement :", texte: "il doit laisser au cheval toute la liberté d'étendre son encolure au saut. Un enrênement fixe se détache, ou se règle assez long, avant de sauter. Ton enseignant te dit lequel utiliser pour ton cheval." },
        { gras: "Les protections :", texte: "guêtres et protège-boulets pour le cheval ; casque, gants et chaussures fermées pour toi." },
        { gras: "La chambrière :", texte: "pour soutenir l'impulsion, jamais pour faire peur." }
      ]),
      E("💡", "Le savais-tu ?", "Le mot caveçon vient de l'italien cavezzone. Les écuyers de la Renaissance l'utilisaient déjà pour travailler leurs chevaux sans agir sur la bouche.")
    ]),

    B("Préparer l'obstacle", [
      S("🏗️ L'installation", null, [
        "Place l'obstacle sur le cercle de longe, le long du mur ou de la lice, pour que le cheval ne soit pas tenté de le contourner par l'extérieur.",
        "Sur le chandelier côté intérieur, pose une barre en biais, de son sommet jusqu'au sol, vers toi : la longe glisse dessus sans s'accrocher.",
        "Vérifie que rien ne dépasse du chandelier intérieur où la longe pourrait se prendre (taquets vides, crochets).",
        "Prévois un grand cercle : le cheval a besoin d'une ligne droite avant et après l'obstacle."
      ]),
      S("📈 La progression", null, [
        "Une barre au sol, au trot, puis au galop.",
        "Un petit croisillon, au trot puis au galop.",
        "Un petit vertical, puis un petit oxer.",
        "Toujours aux deux mains, en restant à une hauteur facile pour le cheval."
      ])
    ]),

    B("Faire sauter à la longe", [
      S("🔁 Les étapes", null, [
        "Détends ton cheval à la longe aux trois allures, aux deux mains, avant de sauter.",
        "Pour l'abord, déplace-toi avec ton cheval, parallèlement à sa ligne, pour qu'il reste droit face à l'obstacle.",
        "Rends de la longe au moment du saut : elle ne doit jamais tirer sur le caveçon pendant le saut.",
        "À la réception, reprends doucement la longe et le cercle.",
        "Récompense ton cheval par la voix après chaque saut réussi.",
        "Termine par un saut facile et un retour au calme au pas."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Ta place compte autant que ta longe : si tu restes au centre du cercle, ton cheval aborde l'obstacle en courbe et en biais. Marche avec lui sur l'abord, comme si tu l'accompagnais jusqu'à l'obstacle."),
      E("🔭", "Pour aller plus loin", "Le saut en liberté, dans un couloir d'obstacles, est une autre façon de faire sauter un cheval sans cavalier. Tu l'étudies dans le cours sur le travail en liberté.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Sauter avec des rênes fixes courtes : le cheval ne peut pas étendre son encolure et peut tomber.",
        "Laisser traîner des boucles de longe au sol ou les enrouler autour de ta main.",
        "Faire sauter un cheval qui n'a pas été détendu.",
        "Monter l'obstacle trop vite, ou multiplier les sauts : le cheval se fatigue et perd confiance."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais faire sauter un cheval à la longe.", [
        "Équipe ton cheval avec caveçon, surfaix, enrênement et protections, et explique tes réglages.",
        "Installe l'obstacle et la barre de glissement.",
        "Fais sauter un croisillon puis un petit vertical aux deux mains, au trot et au galop."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quel enrênement pour faire sauter mon cheval à la longe ?",
        "Comment installer une barre pour que la longe ne s'accroche pas ?",
        "À quelle hauteur faire sauter un jeune cheval à la longe ?",
        "Pourquoi utiliser un caveçon plutôt qu'un filet ?",
        "Mon cheval contourne l'obstacle : que faire ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Caveçon, surfaix, protections.",
        "Encolure libre au saut.",
        "Obstacle contre le mur, barre en biais côté intérieur.",
        "Tu accompagnes l'abord.",
        "Petit et facile, aux deux mains."
      ]),
      E("", "", "À la longe, ton cheval t'apprend comment il saute : regarde-le bien, tu le monteras mieux.")
    ])
  ],
  lexique: { fr: [
    ["Caveçon", "Têtière avec une muserolle renforcée et un anneau au milieu, où s'accroche la longe."],
    ["Surfaix", "Sangle large posée autour du corps du cheval, avec des anneaux pour les enrênements."],
    ["Enrênement", "Rênes accrochées au surfaix qui guident l'attitude du cheval."],
    ["Chambrière", "Long fouet du travail à pied, qui soutient l'impulsion."],
    ["Croisillon", "Obstacle formé de deux barres croisées, qui guide le cheval vers le centre."],
    ["Oxer", "Obstacle large, formé de deux plans de barres."]
  ] },
  quiz: [
    Q("Où s'accroche la longe sur un caveçon ?", ["À l'anneau du mors", "Au surfaix", "À la sous-gorge", "À l'anneau du milieu de la muserolle"], 3, "La longe s'accroche à l'anneau central de la muserolle du caveçon, sans agir sur la bouche."),
    Q("Que doit permettre l'enrênement au moment du saut ?", ["Laisser le cheval étendre librement son encolure", "Tenir la tête haute", "Bloquer l'encolure", "Empêcher le cheval de baisser la tête"], 0, "Au saut, le cheval a besoin de son encolure : un enrênement fixe se détache ou se règle assez long avant de sauter."),
    Q("Où places-tu l'obstacle ?", ["Au centre de la carrière", "En dehors du cercle", "Sur le cercle de longe, le long du mur ou de la lice", "Dans un coin"], 2, "Le long du mur, le cheval n'est pas tenté de contourner l'obstacle par l'extérieur."),
    Q("À quoi sert la barre posée en biais sur le chandelier intérieur ?", ["À faire glisser la longe sans qu'elle s'accroche", "À rendre l'obstacle plus haut", "À guider le cheval vers l'extérieur", "À rien, c'est décoratif"], 0, "Posée en biais, la barre fait glisser la longe par-dessus le chandelier au moment du saut."),
    Q("Que fais-tu de la longe au moment du saut ?", ["Je rends de la longe pour ne pas tirer sur le caveçon", "Je la tends pour tenir le cheval", "Je la lâche complètement", "Je la raccourcis"], 0, "La longe ne doit jamais tirer sur le caveçon pendant le saut : on rend, puis on reprend doucement à la réception."),
    Q("Pendant l'abord, où te places-tu ?", ["Immobile au centre du cercle", "Derrière le cheval", "De l'autre côté de l'obstacle", "Tu te déplaces parallèlement à la ligne du cheval"], 3, "En accompagnant l'abord, tu gardes ton cheval droit face à l'obstacle."),
    Q("Par quoi commences-tu la progression ?", ["Un oxer", "Un vertical", "Un mur", "Une barre au sol"], 3, "On commence par une barre au sol, puis un croisillon, puis un petit vertical."),
    Q("Pourquoi faire sauter un jeune cheval à la longe ?", ["Pour lui faire découvrir l'obstacle sans la gêne du cavalier", "Pour le fatiguer", "Pour monter haut rapidement", "Pour remplacer le travail monté"], 0, "Sans cavalier, le jeune cheval découvre l'obstacle et cherche son équilibre librement.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-05 — LES LONGUES RÊNES SUR LES COURBES   (programme FFE Galop 8, pratique à pied :
   exercer le cheval ou le poney aux longues rênes sur des courbes aux trois allures, en marchant à côté de lui)
   --------------------------------------------------------------------------------- */
{ id: "g8n-05", icone: "🪢", type: { fr: "à pied" }, duree: { fr: "10 min" }, titre: { fr: "Les longues rênes sur les courbes" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c06-travail-pied.webp", couv: {} },

    B("Les longues rênes au Galop 8", [
      P("Au Galop 7, tu as mené ton cheval aux longues rênes. Au Galop 8, tu le travailles sur des courbes, aux trois allures, en marchant à côté de lui. Avec deux rênes, tu contrôles l'incurvation, les épaules et les hanches, bien mieux qu'à la longe."),
      S("🧰 Le matériel", null, [
        "Un filet, ou un caveçon selon les habitudes de ton enseignant.",
        "Un surfaix avec des anneaux à différentes hauteurs.",
        "Deux longues rênes, souples et sans nœud.",
        "Des protections pour le cheval ; un casque, des gants et des chaussures fermées pour toi.",
        "Une chambrière ou une badine, selon ce qu'utilise ton enseignant."
      ]),
      S("🪢 Le passage des rênes", null, [
        { gras: "La rêne intérieure :", texte: "elle va de la bouche à ta main en passant par un anneau du surfaix." },
        { gras: "La rêne extérieure :", texte: "elle passe par l'anneau extérieur du surfaix puis contourne l'arrière-main, au-dessus des jarrets. Elle contrôle les hanches et l'épaule extérieure." }
      ]),
      E("⚠️", "Avant de commencer", "Un cheval qui n'a jamais senti une rêne contre ses postérieurs peut avoir peur. Habitue-le d'abord, à l'arrêt puis au pas, avec l'aide de ton enseignant.")
    ]),

    B("Travailler sur les courbes", [
      S("📍 Ta place", null, [
        "Tu marches à côté du cheval, à hauteur de sa hanche, côté intérieur de la courbe.",
        "Sur un cercle, tu marches sur un cercle plus petit, à l'intérieur du sien.",
        "Tes deux mains gardent un contact léger et égal ; l'excédent de rêne est plié dans ta main, sans boucle qui pend."
      ]),
      S("〰️ Incurver et changer de courbe", null, [
        "La rêne intérieure demande l'incurvation ; la rêne extérieure la limite et garde les hanches sur la courbe.",
        "Pour changer de main, redresse d'abord le cheval sur quelques foulées, puis incurve-le de l'autre côté. Tu passes alors de l'autre côté de lui, en faisant glisser les rênes.",
        "Commence par de grands cercles, puis des serpentines larges."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Regarde la tête et les hanches de ton cheval en même temps : sur la courbe, ses postérieurs doivent suivre la trace de ses antérieurs. Si les hanches s'échappent vers l'extérieur, la rêne extérieure les ramène.")
    ]),

    B("Aux trois allures", [
      S("🚶 Au pas et au trot", null, [
        "Au pas, tu marches au même rythme que ton cheval, à hauteur de sa hanche.",
        "Au trot, agrandis le cercle du cheval et réduis le tien : tu marches vite, mais tu ne cours pas après lui.",
        "Les transitions se demandent à la voix, accompagnées d'un léger effet des deux rênes pour ralentir."
      ]),
      S("🐎 Au galop", null, [
        "Le cheval est sur un grand cercle ; toi, tu marches sur un petit cercle au centre.",
        "Demande le départ à la voix, sur le cercle, quand le trot est équilibré.",
        "Garde un contact léger : au galop, le cheval a besoin de mouvoir son encolure.",
        "Quelques tours suffisent, puis reviens au trot et au pas."
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, les longues rênes servent aussi au travail des déplacements latéraux et des tournants autour des hanches.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Te placer juste derrière le cheval sur une courbe : tu risques un coup de pied et tu perds le contrôle des épaules.",
        "Laisser la rêne extérieure descendre sous les jarrets : le cheval peut se prendre dedans.",
        "Tirer sur les deux rênes en même temps pour freiner : le cheval se contracte.",
        "Enchaîner trop longtemps les cercles serrés : ils fatiguent les articulations."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises les longues rênes sur les courbes.", [
        "Équipe ton cheval et passe les rênes correctement.",
        "Fais-lui faire un cercle aux trois allures, aux deux mains.",
        "Enchaîne un changement de main par une serpentine au pas et au trot."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi la rêne extérieure passe-t-elle autour de l'arrière-main ?",
        "Comment changer de main aux longues rênes ?",
        "Que faire si mon cheval a peur de la rêne contre ses postérieurs ?",
        "Longe ou longues rênes : quelle différence ?",
        "Comment demander le galop aux longues rênes ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Rêne extérieure autour de l'arrière-main, au-dessus des jarrets.",
        "Toi à hauteur de la hanche, côté intérieur.",
        "Rêne intérieure qui incurve, extérieure qui contrôle.",
        "Redresser avant de changer de courbe.",
        "Galop : grand cercle pour lui, petit pour toi."
      ]),
      E("", "", "Aux longues rênes, ton cheval se déplace sous tes yeux : tu vois tout ce que tu sens d'habitude en selle.")
    ])
  ],
  lexique: { fr: [
    ["Longues rênes", "Deux rênes longues qui permettent de travailler et de diriger un cheval à pied."],
    ["Rêne extérieure", "Rêne du côté extérieur de la courbe ; aux longues rênes, elle contourne l'arrière-main."],
    ["Incurvation", "Courbure du cheval de la nuque à la queue, dans le sens de la courbe."],
    ["Serpentine", "Figure en boucles successives qui fait changer de main plusieurs fois."],
    ["Badine", "Baguette légère qui sert d'aide au travail à pied."]
  ] },
  quiz: [
    Q("Où passe la rêne extérieure, sur une courbe ?", ["Par l'anneau extérieur du surfaix, puis autour de l'arrière-main, au-dessus des jarrets", "Directement de la bouche à la main", "Sous le ventre", "Entre les antérieurs"], 0, "Elle passe par l'anneau extérieur du surfaix puis contourne l'arrière-main, au-dessus des jarrets."),
    Q("Où te places-tu sur un cercle ?", ["Juste derrière le cheval", "Devant la tête du cheval", "À hauteur de la hanche, côté intérieur, sur un cercle plus petit", "À l'extérieur du cercle"], 2, "Tu marches côté intérieur, à hauteur de la hanche, sur un cercle plus petit que celui du cheval."),
    Q("Quel est le rôle de la rêne extérieure ?", ["Demander l'incurvation", "Limiter l'incurvation et garder les hanches sur la courbe", "Freiner uniquement", "Aucun"], 1, "La rêne intérieure incurve ; l'extérieure limite l'incurvation et contrôle les hanches."),
    Q("Avant de changer de courbe, que fais-tu ?", ["Je redresse le cheval sur quelques foulées", "Je tire sur la nouvelle rêne intérieure", "Je m'arrête", "Je passe devant le cheval"], 0, "On redresse d'abord le cheval, puis on l'incurve de l'autre côté."),
    Q("Au galop, comment s'organise le travail ?", ["Le cheval sur un petit cercle, toi qui cours à côté", "En ligne droite uniquement", "Le galop est interdit aux longues rênes", "Le cheval sur un grand cercle, toi sur un petit cercle au centre"], 3, "Le cheval galope sur un grand cercle ; tu marches sur un petit cercle au centre."),
    Q("Pourquoi éviter que la rêne extérieure descende sous les jarrets ?", ["Elle s'use plus vite", "Le cheval peut se prendre dedans", "Elle ne sert plus à rien", "Elle fait avancer trop vite"], 1, "Trop basse, la rêne risque de se coincer entre les postérieurs."),
    Q("Quel avantage ont les longues rênes sur la longe ?", ["Elles vont plus vite", "Avec deux rênes, tu contrôles mieux l'incurvation, les épaules et les hanches", "Elles fatiguent moins le cheval", "Aucun"], 1, "Deux rênes permettent un contrôle bien plus précis de l'attitude et de la trajectoire."),
    Q("Ton cheval a peur de la rêne contre ses postérieurs. Que fais-tu ?", ["Je l'habitue à l'arrêt puis au pas, avec mon enseignant", "Je continue, il s'habituera", "Je passe directement au galop", "Je mets la rêne plus bas"], 0, "On habitue progressivement le cheval à la sensation, d'abord à l'arrêt puis au pas.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-06 — LE TRAVAIL EN LIBERTÉ   (programme FFE Galop 8, pratique à pied : exercer le cheval ou
   le poney en liberté, sur le plat et dans un couloir d'obstacles, en donnant les consignes techniques des aides)
   --------------------------------------------------------------------------------- */
{ id: "g8n-06", icone: "🕊️", type: { fr: "à pied" }, duree: { fr: "10 min" }, titre: { fr: "Le travail en liberté" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-th-vie2.webp", couv: {} },

    B("Le travail en liberté sur le plat", [
      P("Au Galop 8, tu sais travailler un cheval sans rien qui le relie à toi : ni longe, ni rênes. Sur le plat, puis dans un couloir d'obstacles. Et comme ce travail se fait souvent à plusieurs, tu sais aussi expliquer à tes aides où se placer et quoi faire."),
      S("📍 Le lieu", null, [
        "Un manège ou une carrière fermés, aux clôtures solides et assez hautes.",
        "Un sol sain, ni glissant, ni trop profond.",
        "Rien qui traîne sur la piste : ni obstacle mal rangé, ni brouette.",
        "Le cheval porte des protections ; il ne porte ni rênes, ni étriers qui pendent."
      ]),
      S("🧭 Diriger un cheval en liberté", "Ta position par rapport au cheval remplace tes mains.", [
        { gras: "Pour le faire avancer :", texte: "place-toi en arrière de son épaule, vers ses hanches, et dirige ta chambrière vers l'arrière-main." },
        { gras: "Pour le ralentir ou l'arrêter :", texte: "avance-toi vers l'avant de son épaule, baisse la chambrière et parle-lui calmement." },
        { gras: "Pour changer de main :", texte: "coupe sa route en te plaçant devant lui, à bonne distance : il se retourne." },
        { gras: "La voix :", texte: "les mêmes mots qu'à la longe, toujours dans le même ton." }
      ]),
      E("💡", "Le savais-tu ?", "En liberté, tu utilises ce que les chevaux font entre eux : au troupeau, un cheval en fait avancer un autre en se plaçant derrière lui, et l'arrête en se plaçant devant.")
    ]),

    B("Le couloir d'obstacles", [
      S("🏗️ L'installation", null, [
        "Le couloir longe le mur du manège ; de l'autre côté, une barrière ou des barres le ferment sur toute sa longueur.",
        "Les obstacles sont placés dans le couloir, sur la ligne droite, avec des distances adaptées au cheval.",
        "L'entrée du couloir est large et bien dégagée, pour que le cheval y entre droit.",
        "On commence par des barres au sol, puis un petit croisillon, puis on ajoute des obstacles un par un."
      ]),
      S("👥 Les consignes à tes aides", "Au Galop 8, c'est toi qui organises le travail et qui expliques à chacun son rôle.", [
        { gras: "L'aide à l'entrée :", texte: "il guide le cheval vers le couloir et soutient son impulsion, sans le poursuivre." },
        { gras: "L'aide à la sortie :", texte: "il récupère le cheval calmement et le ramène vers le grand côté." },
        { gras: "Celui qui règle les obstacles :", texte: "il ne monte les barres que quand tu le demandes, et ne reste jamais dans le couloir quand le cheval arrive." },
        "Avant de commencer, chacun sait où il se place et ce qu'il fait si le cheval refuse ou sort du couloir."
      ]),
      E("⚠️", "La sécurité", "Personne ne se tient jamais à la sortie d'un obstacle ou dans le couloir quand le cheval y est engagé. Les aides restent sur le côté, hors de sa trajectoire.")
    ]),

    B("Observer et adapter", [
      S("👀 Ce que tu regardes", null, [
        "Le cheval aborde-t-il calmement, ou se précipite-t-il ?",
        "Saute-t-il droit, au centre de l'obstacle ?",
        "S'arrondit-il au-dessus de la barre, ou saute-t-il tête haute, le dos creux ?",
        "Garde-t-il le même rythme d'un obstacle à l'autre ?"
      ]),
      S("🔧 Adapter", null, [
        "Un cheval qui se précipite : baisse les obstacles, ralentis l'entrée, raccourcis la séance.",
        "Un cheval qui hésite : reviens à un obstacle plus facile et récompense-le.",
        "Arrête la séance sur un saut réussi, avant que le cheval se fatigue."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Le saut en liberté se fait sur peu de passages : quatre à six bons sauts valent mieux que vingt sauts approximatifs. La qualité d'abord.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Courir derrière le cheval en agitant la chambrière : il s'affole.",
        "Lâcher un cheval très excité sans l'avoir d'abord détendu à la longe.",
        "Changer les distances du couloir sans prévenir les aides.",
        "Lâcher plusieurs chevaux ensemble dans le manège."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais travailler en liberté.", [
        "Fais travailler un cheval en liberté au pas, au trot et au galop, aux deux mains, avec un changement de main.",
        "Installe un couloir avec deux petits obstacles.",
        "Explique leur rôle à deux aides, puis fais passer le cheval dans le couloir."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment arrêter un cheval en liberté ?",
        "Quelle distance entre deux obstacles dans un couloir ?",
        "Pourquoi faire sauter un cheval en liberté ?",
        "Comment reprendre un cheval qui ne veut pas se laisser attraper ?",
        "Que dire à mes aides avant un travail en liberté ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Ta position remplace tes mains.",
        "Derrière l'épaule : il avance ; devant : il ralentit.",
        "Couloir le long du mur, fermé.",
        "Chaque aide connaît son rôle.",
        "Peu de sauts, de qualité."
      ]),
      E("", "", "En liberté, ton cheval te montre qui il est vraiment : son énergie, son équilibre, sa façon de sauter.")
    ])
  ],
  lexique: { fr: [
    ["Travail en liberté", "Travail du cheval sans longe ni rênes, dirigé par la position et la voix."],
    ["Couloir d'obstacles", "Passage fermé le long du mur, dans lequel le cheval saute en liberté."],
    ["Aide (personne)", "Personne qui assiste celui qui dirige le travail."],
    ["Se précipiter", "Pour un cheval, accélérer brusquement à l'abord d'un obstacle."]
  ] },
  quiz: [
    Q("Pour faire avancer un cheval en liberté, où te places-tu ?", ["En arrière de son épaule, vers ses hanches", "Devant son épaule", "Devant sa tête", "N'importe où"], 0, "Placé en arrière de l'épaule, vers les hanches, tu pousses le cheval vers l'avant."),
    Q("Pour le ralentir, que fais-tu ?", ["Je cours derrière lui", "Je lève la chambrière", "Je crie", "Je m'avance vers l'avant de son épaule et je baisse la chambrière"], 3, "Devant l'épaule, chambrière basse et voix calme, le cheval ralentit."),
    Q("Où se trouve le couloir d'obstacles ?", ["Au centre du manège, ouvert des deux côtés", "Le long du mur, fermé de l'autre côté sur toute sa longueur", "En diagonale", "Dans un coin"], 1, "Le couloir longe le mur et est fermé de l'autre côté : le cheval n'a qu'un chemin."),
    Q("Où ne doit jamais se tenir une aide ?", ["Sur le côté du couloir", "Dans le couloir ou à la sortie d'un obstacle quand le cheval y est engagé", "À l'entrée, sur le côté", "Près des chandeliers, hors du couloir"], 1, "Personne ne reste dans la trajectoire du cheval quand il est engagé dans le couloir."),
    Q("Le cheval se précipite dans le couloir. Que fais-tu ?", ["Je monte les obstacles", "J'ajoute des obstacles", "Je le fais passer plus souvent", "Je baisse les obstacles et je ralentis l'entrée"], 3, "On facilite : obstacles plus bas, entrée plus calme, séance plus courte."),
    Q("Que demande le programme du Galop 8, en plus de travailler le cheval en liberté ?", ["Monter le cheval sans selle", "Faire sauter plus haut qu'à la longe", "Travailler deux chevaux à la fois", "Donner les consignes techniques à ses aides"], 3, "Tu dois organiser le travail et expliquer à chaque aide son rôle."),
    Q("Combien de sauts dans une séance de saut en liberté ?", ["Le plus possible", "Au moins vingt", "Peu de passages, de qualité", "Un seul"], 2, "Quelques bons sauts valent mieux que beaucoup de sauts approximatifs."),
    Q("Pourquoi ne pas lâcher plusieurs chevaux ensemble ?", ["C'est interdit par la FFE", "Ils sautent moins haut", "Ils risquent de jouer, de se battre ou de se blesser", "Ils s'ennuient"], 2, "Ensemble et en liberté, les chevaux jouent, se poursuivent et peuvent se blesser.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g8n-07 — LES RACES D'ÉQUIDÉS   (programme FFE Galop 8, connaissance du cheval : connaître les différentes races d'équidés)
   --------------------------------------------------------------------------------- */
{ id: "g8n-07", icone: "🐎", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "Les races d'équidés" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-cheval.webp", couv: {} },

    B("Qu'est-ce qu'une race ?", [
      P("Au Galop 8, tu dois connaître les différentes races d'équidés. Une race, c'est un groupe d'animaux qui partagent des caractères transmis par leurs parents : le modèle, la taille, les aptitudes, parfois la robe. Chaque race a un livre où sont inscrits les animaux qui en font partie : le stud-book."),
      S("📖 Le stud-book", null, [
        "Il fixe les règles pour qu'un poulain soit inscrit dans la race : origines de ses parents, parfois examen du modèle.",
        "Il est tenu par une association de race, agréée par l'État.",
        "En France, les inscriptions sont enregistrées dans le fichier central des équidés, le SIRE, géré par l'IFCE."
      ]),
      S("🧬 Les grandes familles", null, [
        { gras: "Les chevaux de sang :", texte: "fins, rapides, endurants. Le Pur-sang et l'Arabe en sont les deux grandes races." },
        { gras: "Les chevaux de sport (demi-sang) :", texte: "issus de croisements entre chevaux de sang et chevaux plus lourds, sélectionnés pour le saut, le dressage ou le complet." },
        { gras: "Les chevaux de trait :", texte: "lourds et puissants, sélectionnés pour tirer." },
        { gras: "Les poneys :", texte: "des races de petite taille, souvent rustiques." },
        { gras: "Les ânes et les mulets :", texte: "d'autres équidés, avec leurs propres races." }
      ]),
      E("💡", "Le savais-tu ?", "Tous les Pur-sang du monde descendent de trois étalons orientaux importés en Angleterre aux XVIIe et XVIIIe siècles : le Byerley Turk, le Darley Arabian et le Godolphin Arabian.")
    ]),

    B("Les races de selle et de sport", [
      S("🏇 Les chevaux de sang", null, [
        { gras: "Le Pur-sang :", texte: "anglais d'origine, sélectionné pour la course au galop. Il a amélioré presque toutes les races de sport." },
        { gras: "L'Arabe :", texte: "petit, au profil souvent concave, très endurant. C'est la race reine de l'endurance." },
        { gras: "L'Anglo-arabe :", texte: "croisement du Pur-sang et de l'Arabe, race française, réputée pour le complet." }
      ]),
      S("🏆 Les chevaux de sport", null, [
        { gras: "Le Selle Français :", texte: "la grande race de sport française, réputée pour le saut d'obstacles." },
        { gras: "Les races européennes :", texte: "le KWPN (Pays-Bas), le Hanovrien, le Holsteiner (Allemagne), le BWP (Belgique) : très présentes en dressage et en CSO." },
        { gras: "Le Trotteur Français :", texte: "sélectionné pour les courses au trot ; reconverti, il fait aussi un bon cheval de loisir." }
      ]),
      S("🐴 D'autres races de selle", null, [
        { gras: "Les ibériques :", texte: "le Pure race espagnole (PRE) et le Lusitanien, chevaux de dressage et de tradition." },
        { gras: "Les races américaines :", texte: "le Quarter Horse, l'Appaloosa, le Paint Horse, utilisés en équitation western." },
        { gras: "Les races françaises rustiques :", texte: "le Camargue, le Mérens, entre autres, adaptés à leur région." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour reconnaître une race, regarde l'ensemble : la taille, le profil de la tête, la ligne du dos, les membres. Puis vérifie sur le livret : la race y est inscrite.")
    ]),

    B("Les chevaux de trait, les poneys et les ânes", [
      S("🚜 Les chevaux de trait", "La France compte neuf races de trait.", [
        "Le Percheron, le Boulonnais, le Breton, le Comtois, l'Ardennais, l'Auxois, le Trait du Nord, le Cob Normand et le Poitevin mulassier.",
        "Aujourd'hui, on les utilise pour l'attelage, le débardage en forêt, le travail en ville ou les loisirs."
      ]),
      S("🐎 Les poneys", null, [
        { gras: "Le Shetland :", texte: "le plus petit, très rustique." },
        { gras: "Le Welsh et le Connemara :", texte: "poneys de sport, britanniques et irlandais." },
        { gras: "Le Poney Français de Selle :", texte: "race française de sport, pour les jeunes cavaliers en compétition." },
        { gras: "Le Pottok, le Fjord, le Haflinger :", texte: "poneys rustiques, de montagne ou du Nord." }
      ]),
      S("🫏 Les ânes et les mulets", null, [
        "La France compte plusieurs races d'ânes, comme l'âne du Poitou, le Grand Noir du Berry ou l'âne de Provence.",
        "Le mulet naît d'un âne et d'une jument ; le bardot, d'un cheval et d'une ânesse. Ils sont presque toujours stériles."
      ]),
      E("🔭", "Pour aller plus loin", "Certaines races sont menacées parce que peu d'animaux naissent chaque année. Des programmes de sauvegarde les protègent : c'est le cas de plusieurs races de trait et d'ânes français.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre race et robe : un cheval pie peut appartenir à beaucoup de races différentes.",
        "Penser qu'un poney n'est qu'un « petit cheval » : les poneys sont des races à part, avec leur propre modèle.",
        "Croire qu'un cheval de trait est forcément lent et maladroit.",
        "Deviner la race d'un cheval sans vérifier son livret."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais les races.", [
        "Retrouve la race de cinq chevaux de ton écurie sur leur livret.",
        "Pour chacun, cite une ou deux qualités de sa race.",
        "Cite trois races de trait français et deux races de poneys."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle est la différence entre un Pur-sang et un Arabe ?",
        "D'où vient le Selle Français ?",
        "Quelles races de poneys pour le concours ?",
        "Qu'est-ce qu'un stud-book ?",
        "Pourquoi les mulets sont-ils stériles ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Une race, un stud-book.",
        "Chevaux de sang, de sport, de trait, poneys, ânes.",
        "Selle Français : la grande race de sport française.",
        "Neuf races de trait en France.",
        "Toujours vérifier sur le livret."
      ]),
      E("", "", "Connaître les races, c'est comprendre pourquoi chaque cheval a ses qualités, et comment les mettre en valeur.")
    ])
  ],
  lexique: { fr: [
    ["Race", "Groupe d'équidés qui partagent des caractères transmis par leurs parents."],
    ["Stud-book", "Livre généalogique d'une race, où sont inscrits les animaux qui en font partie."],
    ["SIRE", "Fichier central des équidés en France, géré par l'IFCE."],
    ["Cheval de sang", "Cheval fin, rapide et endurant, comme le Pur-sang ou l'Arabe."],
    ["Demi-sang", "Cheval issu de croisements entre chevaux de sang et chevaux plus lourds."],
    ["Mulet", "Équidé né d'un âne et d'une jument."],
    ["Bardot", "Équidé né d'un cheval et d'une ânesse."]
  ] },
  quiz: [
    Q("Qu'est-ce qu'un stud-book ?", ["Un carnet de vaccination", "Un règlement de concours", "Un manuel d'équitation", "Le livre généalogique d'une race"], 3, "Le stud-book est le livre où sont inscrits les animaux d'une race, avec ses règles d'inscription."),
    Q("Quelles sont les deux grandes races de chevaux de sang ?", ["Le Selle Français et le KWPN", "Le Pur-sang et l'Arabe", "Le Percheron et le Boulonnais", "Le Welsh et le Connemara"], 1, "Le Pur-sang et l'Arabe sont les deux grandes races de chevaux de sang."),
    Q("L'Anglo-arabe est un croisement de…", ["Arabe et Trotteur", "Pur-sang et Arabe", "Selle Français et Pur-sang", "Arabe et Percheron"], 1, "L'Anglo-arabe, race française, est issu du Pur-sang et de l'Arabe."),
    Q("Quelle est la grande race de sport française, réputée pour le saut ?", ["Le Selle Français", "Le Trotteur Français", "Le Camargue", "Le Comtois"], 0, "Le Selle Français est la grande race de sport française, réputée en CSO."),
    Q("Laquelle de ces races est une race de trait ?", ["Le Lusitanien", "Le Connemara", "Le Percheron", "L'Appaloosa"], 2, "Le Percheron fait partie des neuf races de trait françaises."),
    Q("Quelle race est un poney de sport français ?", ["Le Shetland", "Le Fjord", "Le Poney Français de Selle", "Le Haflinger"], 2, "Le Poney Français de Selle est sélectionné pour le sport des jeunes cavaliers."),
    Q("Un mulet naît…", ["D'un cheval et d'une ânesse", "De deux ânes", "D'un poney et d'une jument", "D'un âne et d'une jument"], 3, "Le mulet naît d'un âne et d'une jument ; le bardot, d'un cheval et d'une ânesse."),
    Q("Un cheval est pie. Que peux-tu en conclure sur sa race ?", ["C'est un Paint Horse", "Rien : la robe ne suffit pas à connaître la race", "C'est un Appaloosa", "C'est un poney"], 1, "Beaucoup de races ont des chevaux pie : la race se vérifie sur le livret.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-08 — LES BASES DU DÉBOURRAGE   (programme FFE Galop 8, connaissance du cheval : expliquer les principes de base du débourrage)
   --------------------------------------------------------------------------------- */
{ id: "g8n-08", icone: "🌱", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Les bases du débourrage" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c03-apprendre.webp", couv: {} },

    B("Qu'est-ce que le débourrage ?", [
      P("Au Galop 8, tu dois savoir expliquer les principes de base du débourrage. Débourrer un cheval, c'est lui apprendre à accepter le harnachement, puis le cavalier, et à répondre à ses premières demandes. C'est le tout début de sa vie de cheval de selle : tout ce qu'il vivra ensuite en dépend."),
      S("📅 Quand débourrer ?", null, [
        "Le plus souvent vers trois ans, quand le cheval est assez développé pour porter un cavalier léger.",
        "Bien avant, le poulain a été manipulé : licol, menée en main, pieds donnés, pansage, soins.",
        "Un cheval bien manipulé jeune se débourre bien plus facilement."
      ]),
      S("🎯 Les grands principes", null, [
        { gras: "La confiance :", texte: "le cheval doit se sentir en sécurité avec l'homme. Sans confiance, rien ne tient." },
        { gras: "La progressivité :", texte: "une seule nouveauté à la fois, et on ne passe à l'étape suivante que quand la précédente est acquise." },
        { gras: "Des séances courtes :", texte: "un jeune cheval se concentre peu de temps. Mieux vaut peu, mais souvent." },
        { gras: "La récompense :", texte: "la voix, une caresse, l'arrêt de la demande, dès que le cheval fait ce qu'on attend." },
        { gras: "La patience et le calme :", texte: "on ne brusque jamais, on ne punit pas une peur." }
      ]),
      E("💡", "Le savais-tu ?", "Le mot débourrer vient de la « bourre », le poil laineux du jeune animal. Débourrer, c'était à l'origine retirer cette bourre, puis, peu à peu, dégrossir un jeune cheval.")
    ]),

    B("Les étapes du débourrage", [
      S("🔁 À pied d'abord", null, [
        "Habituer le cheval à être touché partout, et aux objets du quotidien : tapis, couverture, tuyau, sac plastique.",
        "Le longer au licol ou au caveçon, aux trois allures, aux deux mains, avec la voix.",
        "Lui faire découvrir le surfaix, sanglé doucement et progressivement, puis le filet.",
        "Poser la selle, d'abord sans étriers, puis avec les étriers qui pendent.",
        "Le mener aux longues rênes, pour lui apprendre à tourner et à s'arrêter sous l'action des rênes."
      ]),
      S("🧍 Puis le cavalier", "Toujours à deux : une personne à la tête, le cavalier, léger et expérimenté.", [
        "Le cavalier s'appuie sur le dos, puis s'allonge en travers de la selle.",
        "Il passe la jambe et s'assied doucement, sans chausser les étriers.",
        "Le cheval fait ses premiers pas en main, puis à la longe, cavalier dessus.",
        "Le cavalier prend peu à peu le relais : voix, jambes légères, rênes souples."
      ]),
      E("⚠️", "La sécurité", "Le débourrage est un travail de spécialistes. Il se fait dans un lieu clos et calme, avec des personnes expérimentées. Au Galop 8, tu en connais les principes : tu ne débourres pas un cheval seul.")
    ]),

    B("Après le débourrage", [
      S("🌳 Les premiers mois", null, [
        "Des séances courtes, aux allures franches, en avant, sur de grandes courbes.",
        "Des promenades accompagnées d'un cheval calme, pour découvrir l'extérieur.",
        "Des barres au sol, puis de petits obstacles, plus tard.",
        "Des jours de repos et du temps au pré : le jeune cheval grandit encore."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Un jeune cheval apprend tout le temps, même quand tu ne le lui demandes pas. Chaque mauvaise habitude se prend vite et se corrige lentement : sois cohérent, et demande toujours la même chose de la même façon."),
      E("🔭", "Pour aller plus loin", "En France, les jeunes chevaux de sport sont valorisés par des épreuves réservées aux chevaux de 4, 5 et 6 ans, organisées par la Société Hippique Française (SHF). Elles leur permettent de progresser à leur rythme.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Vouloir aller vite et brûler les étapes : la peur revient plus tard.",
        "Punir un cheval qui a peur : il associe la peur à l'homme.",
        "Faire de longues séances qui épuisent le jeune cheval.",
        "Changer de méthode ou de mots d'un jour à l'autre."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu as compris les bases du débourrage.", [
        "Explique les grands principes du débourrage en quelques phrases.",
        "Classe les étapes dans l'ordre, du travail à pied au premier cavalier.",
        "Si un jeune cheval est débourré dans ton écurie, observe une séance et raconte-la."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "À quel âge débourrer un cheval ?",
        "Comment habituer un poulain au licol ?",
        "Combien de temps dure un débourrage ?",
        "Que faire si un jeune cheval a peur de la selle ?",
        "Qu'est-ce que les épreuves jeunes chevaux de la SHF ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Confiance d'abord.",
        "Une nouveauté à la fois.",
        "Séances courtes, récompenses.",
        "À pied, puis harnachement, puis cavalier.",
        "Un travail de spécialistes."
      ]),
      E("", "", "Un débourrage réussi, c'est un cheval qui garde toute sa vie confiance en l'homme.")
    ])
  ],
  lexique: { fr: [
    ["Débourrage", "Apprentissage par lequel un jeune cheval accepte le harnachement, puis le cavalier."],
    ["Manipulation", "Ensemble des contacts et gestes qui habituent le poulain à l'homme."],
    ["Désensibilisation", "Habitude donnée au cheval à un objet ou un bruit qui lui faisait peur."],
    ["Récompense", "Ce qui dit au cheval qu'il a bien répondu : voix, caresse, arrêt de la demande."],
    ["SHF", "Société Hippique Française, qui organise les épreuves des jeunes chevaux de sport."]
  ] },
  quiz: [
    Q("Qu'est-ce que débourrer un cheval ?", ["Le tondre pour la première fois", "Le sevrer", "Lui apprendre à accepter le harnachement puis le cavalier", "Le ferrer"], 2, "Débourrer, c'est apprendre au jeune cheval à accepter le harnachement, puis le cavalier."),
    Q("À quel âge débourre-t-on le plus souvent un cheval ?", ["À 1 an", "Vers 3 ans", "À 7 ans", "Juste après le sevrage"], 1, "Le plus souvent vers trois ans, quand le cheval est assez développé."),
    Q("Quel principe est essentiel au débourrage ?", ["Aller vite", "Des séances très longues", "Une seule nouveauté à la fois", "Punir chaque erreur"], 2, "On avance pas à pas : une nouveauté à la fois, et on passe à la suite quand l'étape est acquise."),
    Q("Que fait-on avant de poser la selle ?", ["On monte directement", "On saute un obstacle", "On fait découvrir le surfaix, sanglé progressivement", "On part en promenade"], 2, "Le surfaix habitue le cheval à la sangle avant la selle."),
    Q("Pourquoi des séances courtes ?", ["Parce qu'un jeune cheval se concentre peu de temps", "Pour gagner du temps", "Pour l'épuiser plus vite", "Parce que c'est le règlement"], 0, "Le jeune cheval se fatigue et perd son attention vite : peu, mais souvent."),
    Q("Pour la première fois qu'un cavalier monte, combien de personnes faut-il ?", ["Une seule, le cavalier", "Au moins deux : une à la tête et le cavalier", "Aucune, le cheval est en liberté", "Toute l'écurie"], 1, "On est toujours au moins deux : une personne à la tête, le cavalier léger et expérimenté."),
    Q("Un jeune cheval a peur d'un sac plastique. Que fais-tu ?", ["Je le punis", "Je l'éloigne pour toujours du sac", "Je l'habitue progressivement, dans le calme", "Je le monte pour le forcer"], 2, "On ne punit pas une peur : on désensibilise pas à pas, en récompensant le calme."),
    Q("Au Galop 8, que dois-tu savoir faire sur le débourrage ?", ["Débourrer seul un cheval", "Expliquer ses principes de base", "Monter un cheval jamais débourré", "Rien"], 1, "Le programme demande d'expliquer les principes de base. Le débourrage reste un travail de spécialistes.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-09 — COLIQUES, COUP DE CHALEUR, COUP DE SANG   (programme FFE Galop 8, connaissance du cheval :
   reconnaître les signes de coliques, de coup de chaleur et de coup de sang, et savoir quelle conduite adopter)
   --------------------------------------------------------------------------------- */
{ id: "g8n-09", icone: "🚑", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "Coliques, coup de chaleur, coup de sang" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_COLIQUE.jpg", couv: {} },

    B("Les coliques", [
      P("Au Galop 8, tu dois reconnaître trois urgences : les coliques, le coup de chaleur et le coup de sang, et savoir quoi faire en attendant le vétérinaire. Dans les trois cas, réagir vite peut sauver ton cheval."),
      P("Les coliques sont des douleurs du ventre. Le cheval ne peut pas vomir : un problème de digestion peut vite devenir grave."),
      S("👀 Les signes", null, [
        "Le cheval regarde son flanc, se mord ou se donne des coups de pied sous le ventre.",
        "Il gratte le sol, se couche et se relève souvent, ou se roule.",
        "Il ne mange plus, ne fait plus de crottins.",
        "Il transpire, son ventre peut paraître gonflé.",
        "Il est abattu, ou au contraire agité."
      ]),
      S("🚨 Que faire ?", null, [
        "Appelle le vétérinaire tout de suite, même si les signes paraissent légers.",
        "Retire la nourriture du box, laisse l'eau.",
        "Surveille le cheval en restant en sécurité : un cheval qui se roule peut te blesser.",
        "S'il cherche à se rouler violemment, fais-le marcher calmement au pas, en main, sans l'épuiser.",
        "Note ce que tu observes : l'heure des premiers signes, ce qu'il a mangé, ses crottins.",
        "Ne lui donne aucun médicament sans l'avis du vétérinaire."
      ]),
      E("💡", "Le savais-tu ?", "Un changement brusque d'alimentation, un manque d'eau ou un excès d'aliments concentrés font partie des causes fréquentes de coliques. D'où l'importance de toute transition alimentaire progressive.")
    ]),

    B("Le coup de chaleur", [
      P("Le coup de chaleur survient quand le corps du cheval n'arrive plus à évacuer sa chaleur, le plus souvent pendant un effort par temps chaud et humide."),
      S("👀 Les signes", null, [
        "Une respiration rapide qui ne se calme pas au repos.",
        "Un corps très chaud au toucher.",
        "Une transpiration très abondante, ou au contraire une peau sèche alors qu'il fait chaud.",
        "Un cheval abattu, faible, qui peut tituber."
      ]),
      S("🚨 Que faire ?", null, [
        "Arrête l'effort tout de suite et mets le cheval à l'ombre.",
        "Douche-le abondamment à l'eau fraîche sur tout le corps, racle l'eau, et recommence plusieurs fois.",
        "Propose-lui de l'eau à boire, en petites quantités, souvent.",
        "Appelle le vétérinaire."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Par forte chaleur, travaille tôt le matin ou le soir, raccourcis les séances et fais boire ton cheval souvent. Le coup de chaleur se prévient bien plus facilement qu'il ne se soigne.")
    ]),

    B("Le coup de sang", [
      P("Le coup de sang (aussi appelé myosite) est une atteinte des muscles, surtout ceux de la croupe et du dos, qui se contractent et se détruisent pendant ou juste après l'effort."),
      S("👀 Les signes", null, [
        "Le cheval se raidit, raccourcit ses foulées ou refuse d'avancer.",
        "Les muscles de la croupe sont durs et douloureux.",
        "Il transpire, tremble, respire vite.",
        "Ses urines peuvent être foncées, brun-rouge."
      ]),
      S("🚨 Que faire ?", null, [
        "Arrête l'effort tout de suite et ne le fais surtout pas marcher : chaque pas abîme encore ses muscles.",
        "Couvre-le pour le garder au chaud, s'il fait frais.",
        "Appelle le vétérinaire sans attendre.",
        "Si possible, reste sur place jusqu'à son arrivée plutôt que de ramener le cheval à pied."
      ]),
      E("🔭", "Pour aller plus loin", "Le coup de sang touche souvent un cheval qui a reçu sa ration habituelle de concentrés pendant des jours de repos, puis a repris le travail. Adapter la ration aux jours sans travail, et toujours détendre progressivement, aide à le prévenir.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre coup de sang et coliques et faire marcher un cheval au coup de sang.",
        "Attendre « pour voir si ça passe » avant d'appeler le vétérinaire.",
        "Doucher un cheval en coup de chaleur une seule fois, sans racler l'eau qui chauffe sur lui.",
        "Faire boire beaucoup d'un coup un cheval très chaud."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu saurais réagir.", [
        "Pour chacune des trois urgences, cite trois signes et la première chose à faire.",
        "Explique pourquoi on fait marcher un cheval qui a des coliques, mais jamais un cheval au coup de sang.",
        "Retrouve le numéro du vétérinaire de ton écurie et enregistre-le dans ton téléphone."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment éviter les coliques ?",
        "Quelle est la température normale d'un cheval ?",
        "Comment travailler mon cheval pendant une canicule ?",
        "Pourquoi le cheval ne peut-il pas vomir ?",
        "Comment adapter la ration d'un cheval au repos ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Coliques : vétérinaire, plus de nourriture, marcher s'il se roule.",
        "Coup de chaleur : ombre, douches répétées, eau, vétérinaire.",
        "Coup de sang : on arrête, on ne marche pas, on couvre, vétérinaire.",
        "Dans les trois cas : vite."
      ]),
      E("", "", "Savoir reconnaître une urgence, c'est déjà commencer à soigner.")
    ])
  ],
  lexique: { fr: [
    ["Coliques", "Douleurs du ventre du cheval, liées le plus souvent à sa digestion."],
    ["Coup de chaleur", "Montée dangereuse de la température du corps, souvent pendant un effort par temps chaud."],
    ["Coup de sang (myosite)", "Atteinte des muscles, surtout de la croupe, pendant ou après l'effort."],
    ["Racler", "Retirer l'eau du corps du cheval avec un couteau de chaleur."],
    ["Abattu", "Se dit d'un cheval sans énergie, tête basse, peu attentif."]
  ] },
  quiz: [
    Q("Lequel de ces signes évoque des coliques ?", ["Le cheval regarde son flanc et gratte le sol", "Le cheval mange plus vite", "Le cheval hennit", "Le cheval a les oreilles en avant"], 0, "Regarder son flanc, gratter, se coucher et se relever sont des signes typiques de coliques."),
    Q("Ton cheval a des coliques. Que retires-tu du box ?", ["L'eau", "La litière", "La nourriture", "Rien"], 2, "On retire la nourriture et on laisse l'eau, en attendant le vétérinaire."),
    Q("Un cheval en coliques cherche à se rouler violemment. Que fais-tu ?", ["Je le laisse faire", "Je le fais trotter longtemps", "Je le fais marcher calmement au pas, en main", "Je l'attache très court"], 2, "On le fait marcher calmement, sans l'épuiser, en restant en sécurité."),
    Q("Quand survient le plus souvent un coup de chaleur ?", ["Au box, en hiver", "Pendant un effort par temps chaud et humide", "Après la tonte", "Au pré, la nuit"], 1, "Le coup de chaleur survient surtout pendant un effort par temps chaud et humide."),
    Q("Comment refroidir un cheval en coup de chaleur ?", ["Une seule douche, puis on le couvre", "On le fait galoper pour qu'il transpire", "Des douches fraîches répétées, en raclant l'eau entre chaque", "On le met au soleil"], 2, "On douche abondamment, on racle l'eau qui chauffe sur lui, et on recommence."),
    Q("Quels muscles touche surtout le coup de sang ?", ["Ceux de la croupe et du dos", "Ceux de l'encolure", "Ceux des membres antérieurs", "Ceux de la tête"], 0, "Le coup de sang touche surtout les muscles de la croupe et du dos."),
    Q("Ton cheval a un coup de sang. Que ne dois-tu surtout pas faire ?", ["Le couvrir", "Appeler le vétérinaire", "Rester près de lui", "Le faire marcher"], 3, "Chaque pas abîme encore ses muscles : on ne le fait pas marcher."),
    Q("Qu'est-ce qui peut favoriser un coup de sang ?", ["Trop de foin", "Une tonte", "Une ration de concentrés gardée pendant des jours de repos, avant la reprise", "Des promenades au pas"], 2, "On adapte la ration aux jours de repos et on détend toujours progressivement.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-10 — LES PRODUITS INTERDITS EN COMPÉTITION   (programme FFE Galop 8, connaissance du cheval :
   connaître les principaux produits interdits en compétition pour le cavalier et pour le cheval)
   Source : règles antidopage et médication FFE (ffe.com/media/8938) — la liste exacte change chaque année
   --------------------------------------------------------------------------------- */
{ id: "g8n-10", icone: "🚫", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Les produits interdits en compétition" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-connaissances.webp", couv: {} },

    B("Pourquoi des produits interdits ?", [
      P("Au Galop 8, tu concours à un niveau où les contrôles existent : tu dois connaître les principaux produits interdits en compétition, pour ton cheval comme pour toi. Le dopage est interdit parce qu'il met la santé en danger, et parce qu'il fausse la compétition."),
      S("📜 Qui fixe les règles ?", null, [
        "En France, la liste des substances interdites chez le cheval est fixée par un arrêté ; au niveau international, par la FEI.",
        "Elle est révisée chaque année, et elle désigne des familles de substances plutôt que des noms de médicaments : pour savoir si un traitement est concerné, il faut demander au vétérinaire.",
        "Pour le cavalier, c'est la liste de l'Agence mondiale antidopage (AMA) qui s'applique.",
        "En France, les contrôles sont décidés et suivis par l'Agence française de lutte contre le dopage (AFLD)."
      ]),
      E("💡", "Le savais-tu ?", "Un contrôle peut se faire sur n'importe quel cheval, tiré au sort, mais les vainqueurs d'épreuve sont plus souvent contrôlés.")
    ]),

    B("Pour le cheval", [
      S("🚫 Les grandes familles interdites", null, [
        { gras: "Les produits qui changent la performance :", texte: "excitants, ou au contraire calmants et tranquillisants." },
        { gras: "Les produits qui masquent la douleur :", texte: "anti-inflammatoires et antidouleurs : un cheval qui ne sent plus sa douleur peut se blesser gravement." },
        { gras: "D'autres familles :", texte: "certaines hormones et d'autres médicaments, selon la liste en vigueur." }
      ]),
      S("💊 Si ton cheval est soigné", null, [
        "Tout traitement est prescrit par un vétérinaire, avec une ordonnance.",
        "Un cheval traité avec une substance interdite ne concourt pas tant qu'elle n'a pas été éliminée : le vétérinaire t'indique le délai.",
        "Certains soins restent compatibles avec la compétition, comme les vermifuges ou les vaccins (pas dans les 7 jours avant l'épreuve) : là encore, on vérifie avec le vétérinaire.",
        "Garde toujours l'ordonnance avec toi en concours : si ton cheval est contrôlé, tu la présentes au vétérinaire préleveur."
      ]),
      E("⚠️", "La responsabilité", "En cas de contrôle positif, c'est la personne responsable du cheval qui est sanctionnée, même si la substance a été donnée sans le vouloir, par un complément alimentaire par exemple. Une ordonnance ne suffit pas à éviter la sanction.")
    ]),

    B("Pour le cavalier", [
      S("🚫 Ce qui est interdit", null, [
        "Les produits de la liste de l'AMA : excitants, certaines hormones, certains médicaments contre l'asthme ou le rhume, diurétiques, entre autres.",
        "Le cannabis : c'est un stupéfiant en France et il est interdit en compétition.",
        "L'alcool et les autres drogues : en plus d'être interdits, ils mettent en danger le cavalier et son cheval."
      ]),
      S("💊 Si tu es malade", null, [
        "Préviens ton médecin que tu fais de la compétition : il peut choisir un médicament autorisé.",
        "Si tu dois prendre un traitement contenant une substance interdite, une autorisation d'usage à des fins thérapeutiques (AUT) se demande à l'AFLD, à l'avance.",
        "Évite l'automédication et les compléments alimentaires dont tu ne connais pas la composition."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Avant un concours, pose-toi deux questions : « Mon cheval a-t-il reçu un traitement ces dernières semaines ? » et « Ai-je pris un médicament ? » Si la réponse est oui, appelle ton vétérinaire ou ton médecin avant de partir.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Donner à ton cheval un produit « naturel » ou un complément sans vérifier sa composition.",
        "Utiliser un médicament prescrit pour un autre cheval.",
        "Penser que le dopage ne concerne que le haut niveau : les contrôles existent aussi en Amateur.",
        "Laisser l'ordonnance à la maison."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais les règles.", [
        "Cite trois familles de produits interdits chez le cheval et deux chez le cavalier.",
        "Explique ce que tu fais si ton cheval est traité dix jours avant un concours.",
        "Explique ce qu'est une AUT."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment se passe un contrôle antidopage en concours ?",
        "Un vermifuge est-il autorisé avant un concours ?",
        "Qu'est-ce que l'AFLD ?",
        "Que risque-t-on en cas de contrôle positif ?",
        "Les compléments alimentaires sont-ils dangereux pour un contrôle ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Cheval : excitants, calmants, antidouleurs, entre autres.",
        "Cavalier : liste de l'AMA, cannabis compris.",
        "Tout traitement : vétérinaire et ordonnance.",
        "Le responsable est toujours sanctionné.",
        "Au moindre doute, on demande."
      ]),
      E("", "", "Un résultat n'a de valeur que s'il est propre : celui de ton cheval, et le tien.")
    ])
  ],
  lexique: { fr: [
    ["Dopage", "Utilisation d'une substance interdite pour modifier la performance ou masquer une douleur."],
    ["AFLD", "Agence française de lutte contre le dopage, qui décide et suit les contrôles en France."],
    ["AMA", "Agence mondiale antidopage, qui établit la liste des substances interdites pour les sportifs."],
    ["FEI", "Fédération équestre internationale."],
    ["AUT", "Autorisation d'usage à des fins thérapeutiques, demandée par un sportif qui doit prendre un traitement interdit."],
    ["Délai d'élimination", "Temps nécessaire pour qu'une substance disparaisse de l'organisme."]
  ] },
  quiz: [
    Q("Pourquoi le dopage est-il interdit ?", ["Parce qu'il coûte cher", "Parce qu'il fatigue le cheval", "Il n'est interdit qu'en international", "Parce qu'il met la santé en danger et fausse la compétition"], 3, "Le dopage met en danger la santé du cheval et du cavalier et fausse l'équité sportive."),
    Q("Pourquoi les antidouleurs sont-ils interdits en compétition ?", ["Ils rendent le cheval trop calme", "Ils changent la couleur de la robe", "Un cheval qui ne sent plus sa douleur peut se blesser gravement", "Ils ne sont pas interdits"], 2, "En masquant la douleur, ils exposent le cheval à une blessure grave."),
    Q("Qui décide des contrôles antidopage en France ?", ["Le chef de piste", "Le propriétaire", "Le moniteur", "L'AFLD"], 3, "L'Agence française de lutte contre le dopage décide et suit les contrôles."),
    Q("Ton cheval est soigné avec une substance interdite. Que fais-tu ?", ["Je concours avec l'ordonnance", "Il ne concourt pas tant que la substance n'est pas éliminée", "Je change de concours", "Rien"], 1, "Une ordonnance ne permet pas de concourir : il faut attendre l'élimination de la substance."),
    Q("Qui est sanctionné en cas de contrôle positif du cheval ?", ["Personne si c'était sans le vouloir", "Le vétérinaire", "L'organisateur", "La personne responsable du cheval"], 3, "La personne responsable est sanctionnée, même si la substance a été donnée sans le vouloir."),
    Q("Pour le cavalier, quelle liste s'applique ?", ["Celle de l'Agence mondiale antidopage", "Celle de la FEI pour les chevaux", "Aucune", "Celle du club"], 0, "Le cavalier est soumis à la liste de l'AMA, comme tous les sportifs."),
    Q("Le cannabis est-il autorisé pour le cavalier ?", ["Oui, en dehors des concours internationaux", "Non, c'est un stupéfiant et il est interdit en compétition", "Oui, en petite quantité", "Seulement le soir"], 1, "Le cannabis est un stupéfiant en France et une substance interdite en compétition."),
    Q("Que demande un cavalier qui doit prendre un traitement interdit ?", ["Une AUT à l'AFLD", "Une licence", "Un certificat d'engagement", "Rien"], 0, "Il demande à l'avance une autorisation d'usage à des fins thérapeutiques (AUT).")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g8n-11 — L'ÉCHELLE DE PROGRESSION ET LES TRANSITIONS   (programme FFE Galop 8, pratique équestre :
   expliquer les trois premiers points de l'Échelle de progression ; expliquer l'intérêt des transitions dans l'entraînement)
   Source : « L'échelle de progression », FFE (2014)
   --------------------------------------------------------------------------------- */
{ id: "g8n-11", icone: "📈", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "L'échelle de progression et les transitions" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-pratique-montee.webp", couv: {} },

    B("L'échelle de progression", [
      P("Au Galop 8, tu dois savoir expliquer les trois premiers points de l'échelle de progression. L'échelle de progression est le fil conducteur du travail du cheval, défini par la FFE. Elle compte six points, dans un ordre précis : chacun s'appuie sur ceux qui le précèdent."),
      S("🪜 Les six points", null, [
        "1. La correction de l'allure.",
        "2. La souplesse et la décontraction.",
        "3. La qualité du contact.",
        "4. La propulsion.",
        "5. La rectitude.",
        "6. Le rassembler."
      ]),
      S("🧱 Trois grandes phases", null, [
        { gras: "Construire les bases :", texte: "les trois premiers points. Le cheval prend confiance en son cavalier." },
        { gras: "Développer la propulsion :", texte: "le cheval pousse davantage avec ses postérieurs, en restant droit." },
        { gras: "Perfectionner l'équilibre :", texte: "jusqu'au rassembler." }
      ]),
      E("💡", "Le savais-tu ?", "L'échelle se lit dans les deux sens : quand un point plus haut ne va pas, on revient souvent aux bases. Un cheval qui perd sa rectitude, par exemple, manque souvent de souplesse ou de contact.")
    ]),

    B("Les trois premiers points", [
      S("1️⃣ La correction de l'allure", "Elle repose sur trois éléments.", [
        { gras: "Le rythme :", texte: "la répartition des temps propre à chaque allure : quatre temps égaux au pas, deux au trot, trois au galop. Une faute de rythme est toujours une faute sérieuse." },
        { gras: "La vitesse :", texte: "juste et stable, sans précipitation." },
        { gras: "La cadence :", texte: "la fréquence des foulées, bonne et régulière." }
      ]),
      S("2️⃣ La souplesse et la décontraction", null, [
        { gras: "La décontraction :", texte: "c'est l'état d'esprit du cheval : calme, sans inquiétude." },
        { gras: "La souplesse :", texte: "c'est son état physique : aucune raideur, un dos élastique qui travaille." },
        { gras: "Le test :", texte: "quand tu laisses filer les rênes, le cheval étend son encolure vers l'avant et vers le bas, sans changer d'allure ni d'équilibre." }
      ]),
      S("3️⃣ La qualité du contact", null, [
        "Le contact est la relation entre la bouche du cheval et ta main : confiante, stable, égale des deux côtés et moelleuse.",
        "Il naît de l'énergie des postérieurs, transmise jusqu'à la main par un dos souple : c'est le cheval qui vient chercher la main, ce n'est pas la main qui tire.",
        "Tu dois pouvoir le faire varier, jusqu'à la descente de main, sans que le cheval change d'attitude ou d'allure."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Au début de chaque séance, fais le point sur ces trois bases : ton cheval a-t-il une allure régulière ? Est-il calme et souple ? Le contact est-il égal dans tes deux mains ? Si l'un des trois manque, c'est par là que tu commences.")
    ]),

    B("L'intérêt des transitions", [
      P("Une transition, c'est un passage d'une allure à une autre, ou un changement de vitesse dans une même allure. Dans l'entraînement, elles sont l'un des outils les plus utiles."),
      S("🎯 À quoi servent-elles ?", null, [
        "Elles rendent le cheval attentif et disponible à tes aides.",
        "Elles font travailler les postérieurs, qui s'engagent davantage sous la masse.",
        "Elles aident à stabiliser la vitesse.",
        "Elles améliorent l'équilibre, et préparent le rassembler, plus tard."
      ]),
      S("✅ Une bonne transition", null, [
        "Elle est nette, au moment et à l'endroit voulus.",
        "Le cheval garde son rythme, sa cadence et son énergie jusqu'au changement d'allure.",
        "Dans une transition descendante, il continue à pousser avec ses postérieurs, sans tomber sur les épaules.",
        "Il reste droit, souple et dans le contact, avant, pendant et après."
      ]),
      E("🔭", "Pour aller plus loin", "Les points 4 à 6 de l'échelle (propulsion, rectitude, rassembler) se travaillent au Galop 9. Tu les connais déjà de nom : retiens surtout qu'ils ne se construisent jamais sans les trois premiers.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Chercher un cheval « placé » en tirant sur les rênes : le contact vient de l'arrière, pas de la main.",
        "Confondre vitesse et énergie : un cheval qui court n'est pas un cheval qui pousse.",
        "Enchaîner des transitions brutales : elles crispent le cheval au lieu de l'assouplir.",
        "Sauter les étapes de l'échelle pour travailler un exercice plus difficile."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu comprends l'échelle de progression.", [
        "Cite les six points de l'échelle dans l'ordre.",
        "Explique les trois premiers avec tes mots.",
        "Fais une série de transitions trot-pas-trot et pas-galop-pas, et explique ce qu'elles apportent à ton cheval."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle est la différence entre rythme et cadence ?",
        "Comment savoir si mon cheval est décontracté ?",
        "Comment améliorer le contact de mon cheval ?",
        "Quelles transitions faire pour activer les postérieurs ?",
        "Pourquoi revenir aux bases quand un exercice ne marche pas ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Six points, dans l'ordre.",
        "1 : rythme, vitesse, cadence.",
        "2 : décontraction et souplesse.",
        "3 : un contact qui vient de l'arrière.",
        "Transitions : attention, postérieurs, équilibre."
      ]),
      E("", "", "L'échelle de progression, c'est ta boussole : quand tu ne sais plus quoi travailler, elle te dit par où commencer.")
    ])
  ],
  lexique: { fr: [
    ["Échelle de progression", "Fil conducteur du travail du cheval défini par la FFE, en six points."],
    ["Rythme", "Répartition des temps propre à chaque allure."],
    ["Cadence", "Fréquence des foulées, qui doit rester régulière."],
    ["Décontraction", "État d'esprit calme du cheval, sans inquiétude."],
    ["Contact", "Relation entre la bouche du cheval et la main du cavalier."],
    ["Descente de main", "Le cavalier avance les mains et rompt le contact, sans que le cheval change d'attitude."],
    ["Transition", "Passage d'une allure à une autre, ou changement de vitesse dans une allure."]
  ] },
  quiz: [
    Q("Combien de points compte l'échelle de progression ?", ["Trois", "Six", "Quatre", "Dix"], 1, "L'échelle compte six points, de la correction de l'allure au rassembler."),
    Q("Quel est le premier point de l'échelle ?", ["La rectitude", "La correction de l'allure", "Le contact", "La propulsion"], 1, "On commence par la correction de l'allure : rythme, vitesse et cadence."),
    Q("Combien de temps compte le trot ?", ["Trois", "Quatre", "Deux", "Un"], 2, "Le trot est une allure à deux temps ; le pas en a quatre, le galop trois."),
    Q("Qu'est-ce que la décontraction ?", ["L'état d'esprit calme du cheval", "L'état physique, sans raideur", "La vitesse du cheval", "Le placer de la tête"], 0, "La décontraction est mentale ; la souplesse, physique."),
    Q("Comment tester la souplesse et la décontraction ?", ["En laissant filer les rênes : le cheval s'étend vers l'avant et le bas sans changer d'allure", "En galopant vite", "En tirant sur les rênes", "En sautant un obstacle"], 0, "Le cheval souple et décontracté étend son encolure vers l'avant et le bas quand on laisse filer les rênes."),
    Q("D'où vient un bon contact ?", ["De la main qui tire", "D'une muserolle serrée", "D'un enrênement", "De l'énergie des postérieurs transmise par un dos souple"], 3, "C'est le cheval qui vient chercher la main, grâce à l'énergie de ses postérieurs."),
    Q("Quel est l'un des intérêts des transitions ?", ["Fatiguer le cheval", "Remplacer la détente", "Faire travailler les postérieurs", "Éviter le contact"], 2, "Les transitions engagent les postérieurs, rendent le cheval attentif et améliorent son équilibre."),
    Q("Dans une transition descendante, le cheval doit…", ["Tomber sur les épaules", "Garder l'activité de ses postérieurs", "Lever la tête", "Ralentir sa cadence au maximum"], 1, "Dans une transition descendante, il continue à pousser avec ses postérieurs.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-12 — LA DÉTENTE ET LE CHEVAL ROND ET BAS   (programme FFE Galop 8, partie commune :
   concevoir et réaliser l'échauffement selon l'objectif de la séance ; se déplacer avec un cheval rond et bas aux trois allures ;
   adapter la demande au fonctionnement du cheval pour l'améliorer)
   — 05/11 : cours nouveau (plan validé « Ok »)
   --------------------------------------------------------------------------------- */
{ id: "g8n-12", icone: "🌡️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "La détente et le cheval rond et bas" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c08-equilibre.webp", couv: {} },

    B("Une détente selon l'objectif", [
      P("Au Galop 7, tu détendais ton cheval avant le travail. Au Galop 8, tu conçois toi-même ta détente, selon l'objectif de ta séance et selon le cheval que tu montes ce jour-là."),
      S("🌡️ Les étapes qui ne changent pas", null, [
        "Du pas rênes longues, pour que les muscles et les articulations se mettent en route.",
        "Du trot et du galop en avant, sur de grandes lignes, en équilibre ou en trot enlevé, pour libérer le dos.",
        "Des courbes larges et des transitions simples, pour rendre le cheval attentif."
      ]),
      S("🎯 Ce qui change selon l'objectif", null, [
        { gras: "Une séance de dressage :", texte: "on termine la détente par des exercices d'incurvation et des transitions plus précises." },
        { gras: "Une séance de saut :", texte: "on travaille l'équilibre en étriers, les allongements et raccourcissements au galop, puis quelques barres au sol et petits sauts." },
        { gras: "Une sortie en extérieur ou un cross :", texte: "une détente un peu plus longue au galop, pour préparer le souffle." }
      ]),
      S("🐴 Ce qui change selon le cheval", null, [
        { gras: "Un cheval froid ou raide :", texte: "plus de pas, plus de temps avant de demander des efforts." },
        { gras: "Un cheval chaud ou excité :", texte: "un travail calme, régulier, sur des courbes qui l'occupent, plutôt que du galop qui l'énerve." },
        { gras: "Un cheval âgé :", texte: "une détente plus longue et plus progressive." }
      ]),
      E("💡", "Le savais-tu ?", "Une bonne détente prend en général au moins un quart d'heure. Elle ne fatigue pas le cheval : elle le prépare à travailler sans se blesser.")
    ]),

    B("Le cheval rond et bas", [
      P("Au Galop 8, tu te déplaces avec un cheval rond et bas aux trois allures. Dans cette attitude, le cheval étend son encolure vers l'avant et vers le bas, et son dos se soulève et travaille."),
      S("✅ Un cheval rond et bas", null, [
        "L'encolure s'étend vers l'avant et vers le bas, la nuque reste souple.",
        "Le chanfrein reste en avant de la verticale.",
        "Le dos se soulève, les postérieurs continuent à pousser.",
        "Le contact reste léger et égal : le cheval suit ta main vers le bas."
      ]),
      S("🔁 Comment l'obtenir", null, [
        "Pars d'un cheval en avant, au rythme régulier : sans énergie, il n'y a pas de dos qui travaille.",
        "Avance doucement les mains pour lui proposer d'étendre l'encolure, en gardant le contact.",
        "Garde tes jambes actives pour qu'il continue à pousser.",
        "Dès qu'il s'étend, accompagne-le et garde la position quelques foulées, puis récompense-le."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Rond et bas ne veut pas dire « tête en bas à tout prix ». Si ton cheval baisse la tête en tombant sur ses épaules, ou si son nez passe derrière la verticale, il ne travaille plus avec son dos : remonte-le en avant et recommence.")
    ]),

    B("Adapter la demande au cheval", [
      P("Le programme du Galop 8 demande d'adapter ta demande au fonctionnement du cheval pour l'améliorer. Chaque cheval a ses qualités et ses difficultés : à toi de les comprendre."),
      S("🔍 Observer", null, [
        "Est-il plus facile à une main qu'à l'autre ?",
        "Préfère-t-il aller vite, ou faut-il sans cesse l'encourager ?",
        "Où sont ses raideurs : nuque, épaules, dos, hanches ?",
        "Comment réagit-il à tes aides : trop vite, trop peu, avec inquiétude ?"
      ]),
      S("🔧 Adapter", null, [
        "Travaille davantage sa main difficile, sans négliger l'autre.",
        "À un cheval qui se précipite, donne des exercices calmes et des transitions ; à un cheval paresseux, des exercices vifs et variés.",
        "Raccourcis l'exercice dès que le cheval a bien répondu : la réussite s'apprend.",
        "Note dans ton carnet ce qui a marché pour ce cheval."
      ]),
      E("🔭", "Pour aller plus loin", "Adapter la demande, c'est déjà le travail d'un entraîneur. C'est aussi ce que tu apprendras à faire, au-delà des Galops, si tu te tournes vers l'enseignement.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Faire toujours la même détente, quel que soit le cheval ou l'objectif.",
        "Tirer les rênes vers le bas pour obtenir un cheval rond et bas.",
        "Laisser le cheval s'étendre en perdant toute son énergie.",
        "Rester longtemps sur un exercice raté au lieu de revenir à un exercice facile."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais préparer et adapter ta séance.", [
        "Décris la détente que tu prévois pour une séance de CSO, puis pour une séance de dressage.",
        "Réalise ta détente, puis montre ton cheval rond et bas au pas, au trot et au galop.",
        "Explique une difficulté de ton cheval et ce que tu fais pour l'aider."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Combien de temps doit durer une détente ?",
        "Comment détendre un cheval très chaud ?",
        "Pourquoi mon cheval refuse-t-il de descendre l'encolure ?",
        "Rond et bas ou encapuchonné : comment faire la différence ?",
        "Comment travailler la mauvaise main de mon cheval ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "La détente dépend de l'objectif et du cheval.",
        "Pas, allures en avant, courbes larges.",
        "Rond et bas : encolure vers l'avant et le bas, dos qui se soulève.",
        "Jamais en tirant vers le bas.",
        "Observer, puis adapter."
      ]),
      E("", "", "Une séance réussie se décide souvent dans le premier quart d'heure.")
    ])
  ],
  lexique: { fr: [
    ["Détente", "Début de séance qui prépare progressivement le cheval au travail."],
    ["Rond et bas", "Attitude où le cheval étend son encolure vers l'avant et le bas, le dos soulevé."],
    ["Chanfrein", "Devant de la tête, entre le front et les naseaux."],
    ["Encapuchonné", "Se dit d'un cheval dont le nez passe derrière la verticale."],
    ["Cheval froid", "Cheval peu réactif ou raide au début du travail."],
    ["Cheval chaud", "Cheval vif, qui s'excite facilement."]
  ] },
  quiz: [
    Q("Par quoi commence toute détente ?", ["Du galop rapide", "Un saut", "Des transitions serrées", "Du pas rênes longues"], 3, "Le pas rênes longues met en route les muscles et les articulations."),
    Q("Pour une séance de saut, comment termines-tu la détente ?", ["Par des appuyers", "Par l'équilibre en étriers, les variations au galop, puis quelques barres et petits sauts", "Par du pas", "Par un parcours complet"], 1, "La détente se termine par ce qui prépare le travail du jour : ici, le saut."),
    Q("Ton cheval est chaud et excité. Que privilégies-tu pendant la détente ?", ["Du galop pour le fatiguer", "Un travail calme et régulier sur des courbes", "Des sauts", "Aucune détente"], 1, "Un travail calme et régulier, qui l'occupe, l'aide à se poser."),
    Q("Dans l'attitude rond et bas, où se trouve le chanfrein ?", ["Derrière la verticale", "À l'horizontale", "Peu importe", "En avant de la verticale"], 3, "Le chanfrein reste en avant de la verticale : le cheval ne s'encapuchonne pas."),
    Q("Comment obtiens-tu un cheval rond et bas ?", ["En tirant les rênes vers le bas", "En raccourcissant les rênes", "En ralentissant au maximum", "À partir d'un cheval en avant, en avançant doucement les mains avec le contact"], 3, "Le cheval en avant suit la main qui avance doucement ; les jambes gardent l'impulsion."),
    Q("Ton cheval baisse la tête en tombant sur les épaules. Que fais-tu ?", ["Je le laisse faire", "Je tire sur les rênes", "Je m'arrête", "Je le remets en avant et je recommence"], 3, "Un cheval qui tombe sur les épaules ne travaille plus avec son dos : on le remet en avant."),
    Q("Que demande le programme du Galop 8 sur la demande faite au cheval ?", ["De toujours demander la même chose", "De demander plus fort", "De ne rien demander", "De l'adapter au fonctionnement du cheval pour l'améliorer"], 3, "On observe les qualités et difficultés du cheval, puis on adapte."),
    Q("Ton cheval vient de bien réussir un exercice difficile. Que fais-tu ?", ["Je le récompense et je passe à autre chose", "Je le refais dix fois", "Je rends l'exercice encore plus difficile", "J'arrête la séance sans le récompenser"], 0, "On s'arrête sur une réussite : le cheval retient ce qui a été récompensé.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-13 — INCURVATION, AMPLITUDE ET DÉPLACEMENTS LATÉRAUX   (programme FFE Galop 8, partie commune :
   incurver son cheval sur des courbes et changements de courbe ; faire varier l'amplitude aux trois allures et enchaîner des transitions ;
   adapter son équilibre lors des déplacements latéraux et de leurs transitions ; contrôler cadence et amplitude dans les latéraux)
   — 05/11 : cours nouveau (plan validé « Ok »)
   --------------------------------------------------------------------------------- */
{ id: "g8n-13", icone: "〰️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Incurvation, amplitude et déplacements latéraux" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c09-incurvation.webp", couv: {} },

    B("Incurver sur les courbes et les changements de courbe", [
      P("Au Galop 8, que tu choisisses ensuite le dressage, le CSO ou le complet, tu dois maîtriser trois choses communes à tous : l'incurvation, les variations d'amplitude et les déplacements latéraux."),
      S("〰️ Les aides de l'incurvation", "Tu les connais depuis le Galop 5 ; au Galop 8, elles doivent être précises et constantes.", [
        { gras: "La jambe intérieure, à la sangle :", texte: "le cheval s'incurve autour d'elle, elle entretient l'impulsion." },
        { gras: "La jambe extérieure, un peu en arrière :", texte: "elle empêche les hanches de s'échapper vers l'extérieur." },
        { gras: "La rêne intérieure :", texte: "elle indique le pli et la direction." },
        { gras: "La rêne extérieure :", texte: "elle limite le pli et contrôle l'épaule extérieure." }
      ]),
      S("🔀 Changer de courbe", null, [
        "Entre deux courbes, redresse ton cheval sur une ou deux foulées.",
        "Inverse tes aides : la nouvelle jambe intérieure à la sangle, la nouvelle jambe extérieure en arrière, puis le nouveau pli.",
        "Garde la même cadence pendant tout le changement.",
        "Exercices : serpentines, huit de chiffre, changements de main dans le cercle."
      ]),
      E("💡", "Le savais-tu ?", "Un cheval bien incurvé suit sur la courbe la même trace avec ses antérieurs et ses postérieurs. C'est ce qui le rend droit sur une courbe, comme sur une ligne droite.")
    ]),

    B("Faire varier l'amplitude", [
      S("↔️ Allonger et raccourcir", "L'amplitude, c'est la longueur de la foulée.", [
        "Pour allonger, demande au cheval de pousser davantage avec ses postérieurs et laisse-lui la place d'étendre son encolure : la foulée s'allonge, la cadence ne s'accélère pas.",
        "Pour raccourcir, ralentis le mouvement avec ton assiette et tes doigts, tout en gardant tes jambes : la foulée se raccourcit, l'énergie reste.",
        "Commence par de petites variations, sur une ligne droite, puis sur un cercle."
      ]),
      S("🔁 Enchaîner les transitions", null, [
        "Enchaîne allongements, raccourcissements et changements d'allure, en restant précis sur les points de la carrière.",
        "Exemple : sur un cercle de 20 m, trot de travail, quelques foulées allongées, retour au trot de travail, transition au pas, départ au trot.",
        "La qualité compte plus que le nombre : chaque transition doit être nette et le cheval rester droit."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Compte tes foulées à voix basse : « un, deux, un, deux ». Si ton comptage accélère quand tu allonges, ton cheval court au lieu d'allonger.")
    ]),

    B("Les déplacements latéraux", [
      S("↘️ Ce que tu connais", null, [
        "La cession à la jambe : le cheval se déplace en avant et de côté, presque droit, avec un léger pli à l'opposé du déplacement.",
        "L'épaule en dedans : les antérieurs sont sur une piste intérieure, parallèle à celle des postérieurs ; le cheval est incurvé autour de ta jambe intérieure et se déplace sur trois pistes, avec un angle d'environ 30°."
      ]),
      S("⚖️ Ton équilibre dans les latéraux", null, [
        "Reste assis au milieu de la selle, le buste droit, sans te pencher.",
        "Ton poids descend un peu plus dans l'étrier du côté où le cheval se déplace, sans casser ta hanche.",
        "Tes épaules restent parallèles aux épaules du cheval.",
        "Dans les transitions qui entrent dans le latéral et en sortent, tu ne dois pas bouger : c'est ton cheval qui change d'attitude, pas toi."
      ]),
      S("🎵 La cadence et l'amplitude dans les latéraux", null, [
        "Le cheval garde la même cadence qu'en ligne droite : s'il ralentit, tes jambes l'activent ; s'il accélère, ton assiette le régule.",
        "Il garde aussi l'amplitude de ses foulées : un latéral « à petits pas » n'a plus de valeur.",
        "Fais quelques foulées de latéral, puis repars en avant, droit, avant de recommencer."
      ])
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Incurver seulement l'encolure : le cheval tombe sur l'épaule extérieure.",
        "Accélérer la cadence pour allonger.",
        "Te pencher dans le sens du déplacement latéral.",
        "Enchaîner trop de foulées de latéral, jusqu'à ce que le cheval perde son énergie."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises la partie commune.", [
        "Fais une serpentine de trois boucles au trot, avec un changement d'incurvation net à chaque boucle.",
        "Sur une diagonale, allonge puis raccourcis le trot en gardant la cadence.",
        "Enchaîne quelques foulées d'épaule en dedans, puis une cession à la jambe, au trot, en restant bien assis."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment savoir si mon cheval est bien incurvé ?",
        "Pourquoi mon cheval accélère-t-il quand j'allonge ?",
        "Quelle différence entre cession à la jambe et épaule en dedans ?",
        "Comment garder mon équilibre dans les latéraux ?",
        "Quels exercices pour améliorer les changements de courbe ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Incurver : jambe intérieure à la sangle, extérieure en arrière.",
        "Changer de courbe : redresser, puis inverser.",
        "Amplitude : la foulée change, pas la cadence.",
        "Latéraux : assis, droit, immobile.",
        "Cadence et amplitude gardées."
      ]),
      E("", "", "Une incurvation juste et une cadence stable : ce sont les bases de toutes les disciplines.")
    ])
  ],
  lexique: { fr: [
    ["Incurvation", "Courbure du cheval de la nuque à la queue, dans le sens de la courbe."],
    ["Amplitude", "Longueur de la foulée."],
    ["Huit de chiffre", "Figure formée de deux cercles qui se touchent, avec un changement de main au centre."],
    ["Cession à la jambe", "Déplacement latéral presque droit, avec un léger pli opposé au déplacement."],
    ["Épaule en dedans", "Latéral où les antérieurs sont sur une piste intérieure, parallèle à celle des postérieurs, le cheval incurvé autour de la jambe intérieure."]
  ] },
  quiz: [
    Q("Où se place ta jambe intérieure pour incurver ?", ["À la sangle", "En arrière de la sangle", "Loin du cheval", "Sur l'épaule"], 0, "Le cheval s'incurve autour de la jambe intérieure, à la sangle."),
    Q("Quel est le rôle de la jambe extérieure dans l'incurvation ?", ["Accélérer", "Rien", "Empêcher les hanches de s'échapper", "Faire reculer"], 2, "Un peu en arrière, elle empêche les hanches de s'échapper vers l'extérieur."),
    Q("Que fais-tu entre deux courbes de sens opposé ?", ["Je redresse le cheval sur une ou deux foulées, puis j'inverse", "J'inverse les aides d'un coup", "Je m'arrête", "Je passe au pas"], 0, "On redresse d'abord le cheval, puis on inverse les aides."),
    Q("Quand le cheval allonge, que doit faire la cadence ?", ["Rester la même", "Accélérer", "Ralentir beaucoup", "Peu importe"], 0, "La foulée s'allonge, la cadence reste la même : sinon, le cheval court."),
    Q("Dans l'épaule en dedans, où sont les antérieurs ?", ["Sur une piste intérieure, parallèle à celle des postérieurs", "Sur la même piste que les postérieurs", "Croisés devant les postérieurs", "À l'extérieur de la piste"], 0, "Les antérieurs sont sur une piste intérieure, parallèle à celle des postérieurs : le cheval se déplace sur trois pistes."),
    Q("Dans un déplacement latéral, comment restes-tu ?", ["Assis au milieu, buste droit, épaules parallèles à celles du cheval", "Penché du côté du déplacement", "En équilibre en suspension", "Penché en arrière"], 0, "Tu restes assis au milieu, sans te pencher, le poids un peu plus dans l'étrier du côté du déplacement."),
    Q("Ton cheval ralentit dans une cession à la jambe. Que fais-tu ?", ["Je l'arrête", "Je raccourcis les rênes", "J'active avec mes jambes pour garder la cadence", "Je continue sans rien faire"], 2, "La cadence doit rester celle de la ligne droite : les jambes l'entretiennent."),
    Q("Pourquoi éviter d'incurver seulement l'encolure ?", ["Parce que c'est trop facile", "Parce que le cheval tombe alors sur l'épaule extérieure", "Parce que c'est interdit en concours", "Parce qu'il accélère"], 1, "Tout le corps s'incurve ; une encolure trop pliée fait tomber le cheval sur l'épaule extérieure.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-14 — DRESSAGE : APPUYER, CESSION AU GALOP ET CONTRE-GALOP   (programme FFE Galop 8, partie spécifique dressage :
   adapter son équilibre assis et contrôler la cadence dans les latéraux ; maîtriser l'incurvation ;
   déplacer son cheval latéralement vers le côté de l'incurvation au pas et au trot (appuyer) ;
   partir au contre-galop sur une courbe ; cession à la jambe sans incurvation au galop)
   — 05/11 : cours nouveau (plan validé « Ok »)
   --------------------------------------------------------------------------------- */
{ id: "g8n-14", icone: "↗️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Dressage : appuyer, cession au galop et contre-galop" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c10-cession.webp", couv: {} },

    B("L'appuyer", [
      P("Au Galop 8, en dressage, tu apprends un nouveau déplacement latéral : l'appuyer. Le programme le décrit ainsi : déplacer son cheval latéralement vers le côté de l'incurvation, au pas et au trot."),
      S("↗️ Qu'est-ce que l'appuyer ?", null, [
        "Le cheval se déplace en avant et de côté, incurvé dans le sens où il va.",
        "Ses membres extérieurs croisent devant ses membres intérieurs.",
        "Son corps reste presque parallèle au grand côté, les épaules légèrement en avance sur les hanches.",
        "C'est la grande différence avec la cession à la jambe, où le cheval se plie à l'opposé du déplacement."
      ]),
      S("🎛️ Les aides", "Par exemple, un appuyer à droite.", [
        { gras: "La jambe droite (intérieure), à la sangle :", texte: "elle garde l'incurvation et l'impulsion." },
        { gras: "La jambe gauche (extérieure), en arrière :", texte: "elle pousse le cheval vers la droite." },
        { gras: "La rêne droite :", texte: "elle indique le pli et la direction." },
        { gras: "La rêne gauche :", texte: "elle limite le pli et contrôle l'épaule." },
        { gras: "Ton poids :", texte: "un peu plus dans l'étrier droit, du côté du déplacement, buste droit." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Prépare l'appuyer par quelques foulées d'épaule en dedans sur le grand côté : ton cheval est déjà incurvé et ses épaules en avant. Il ne reste plus qu'à l'emmener de côté.")
    ]),

    B("La cession à la jambe au galop", [
      S("➡️ Ce qu'on demande", "Le programme demande une cession à la jambe sans incurvation au galop.", [
        "Le cheval galope en avant et de côté, le corps droit, sans incurvation.",
        "Ses hanches ne précèdent jamais ses épaules.",
        "Il garde un galop régulier, à trois temps, avec le même rebond."
      ]),
      S("🔁 Comment la travailler", null, [
        "Pars d'un galop de travail équilibré, sur une ligne droite.",
        "Ta jambe extérieure, un peu en arrière, pousse le cheval de côté ; ta jambe intérieure, à la sangle, entretient le galop.",
        "Tes rênes gardent le cheval droit, sans pli.",
        "Commence par quelques foulées, par exemple du quart de ligne vers la piste, puis repars droit."
      ]),
      E("💡", "Le savais-tu ?", "Au galop, le cheval se déplace plus facilement de côté vers le pied sur lequel il galope. C'est pour ça qu'on demande d'abord la cession vers le côté du galop.")
    ]),

    B("Le contre-galop sur une courbe", [
      S("🔄 Qu'est-ce que le contre-galop ?", null, [
        "C'est un galop à faux volontaire : à main droite, le cheval galope sur le pied gauche, et inversement.",
        "Le cheval reste légèrement plié du côté du pied sur lequel il galope, pas du côté de la courbe.",
        "C'est un exercice d'équilibre et de rectitude."
      ]),
      S("🔁 Partir au contre-galop sur une courbe", null, [
        "Prépare ton départ comme pour un départ au galop sur l'autre pied : léger pli vers le pied demandé.",
        "La jambe extérieure (celle du côté opposé au pied demandé) se recule pour tenir les hanches et appeler le postérieur externe.",
        "Garde la courbe large au début : un grand cercle ou un demi-cercle de 20 m.",
        "Reste assis, sans te pencher vers l'intérieur de la courbe : ton poids déséquilibrerait le cheval."
      ]),
      E("🔭", "Pour aller plus loin", "Le contre-galop prépare les changements de pied : le cheval apprend à galoper sur chaque pied, quelle que soit la courbe, et à rester équilibré.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Laisser les hanches précéder les épaules dans l'appuyer ou dans la cession.",
        "Perdre l'incurvation dans l'appuyer : il devient une cession.",
        "Te pencher vers l'intérieur de la courbe au contre-galop.",
        "Serrer la courbe trop tôt au contre-galop : le cheval change de pied ou se désunit."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises ces exercices.", [
        "Du quart de ligne au grand côté, fais un appuyer au trot à chaque main.",
        "Au galop, fais quelques foulées de cession à la jambe, puis repars droit.",
        "Pars au contre-galop sur un demi-cercle de 20 m et garde-le jusqu'au grand côté."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle différence entre appuyer et cession à la jambe ?",
        "Comment préparer mon premier appuyer ?",
        "Pourquoi mon cheval change de pied au contre-galop ?",
        "À quoi sert le contre-galop ?",
        "Comment garder la cadence dans l'appuyer ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Appuyer : incurvé vers le côté où il va.",
        "Cession au galop : droit, sans pli.",
        "Les épaules toujours devant les hanches.",
        "Contre-galop : plié vers le pied du galop.",
        "Assis, droit, sans te pencher."
      ]),
      E("", "", "Ces trois exercices construisent la souplesse et l'équilibre dont tu auras besoin pour tes changements de pied.")
    ])
  ],
  lexique: { fr: [
    ["Appuyer", "Déplacement latéral vers le côté de l'incurvation, le cheval presque parallèle au grand côté."],
    ["Contre-galop", "Galop volontaire sur le pied extérieur de la courbe."],
    ["Quart de ligne", "Ligne parallèle au grand côté, à 5 m de la piste sur un rectangle de 20 m."],
    ["Se désunir", "Pour un cheval au galop, galoper sur un pied devant et sur l'autre derrière."],
    ["Pied du galop", "Côté du membre antérieur qui se pose en dernier et semble mener le galop."]
  ] },
  quiz: [
    Q("Dans l'appuyer, comment est incurvé le cheval ?", ["À l'opposé du déplacement", "Pas du tout", "Seulement de l'encolure", "Vers le côté où il se déplace"], 3, "Dans l'appuyer, le cheval est incurvé vers le côté où il se déplace."),
    Q("Quelle est la différence entre appuyer et cession à la jambe ?", ["Aucune", "Dans la cession, le cheval est plié à l'opposé du déplacement ; dans l'appuyer, vers le déplacement", "L'appuyer se fait uniquement au pas", "La cession se fait en reculant"], 1, "C'est le sens du pli qui les distingue."),
    Q("Dans un appuyer à droite, quelle jambe pousse le cheval de côté ?", ["La jambe gauche, en arrière", "La jambe droite, à la sangle", "Les deux jambes ensemble", "Aucune"], 0, "La jambe extérieure, en arrière, pousse ; la jambe intérieure garde l'incurvation et l'impulsion."),
    Q("Quel exercice prépare bien l'appuyer ?", ["Le reculer", "L'épaule en dedans", "Le contre-galop", "Le saut"], 1, "L'épaule en dedans met le cheval incurvé, les épaules en avant : il ne reste qu'à l'emmener de côté."),
    Q("Dans la cession à la jambe au galop, comment est le cheval ?", ["Droit, sans incurvation", "Très incurvé", "Plié vers l'extérieur", "Au pas"], 0, "Le programme demande une cession sans incurvation au galop."),
    Q("Qu'est-ce que le contre-galop ?", ["Un galop très lent", "Un galop à faux volontaire", "Un galop désuni", "Un galop en arrière"], 1, "C'est un galop volontaire sur le pied extérieur de la courbe."),
    Q("Au contre-galop, de quel côté est plié le cheval ?", ["Du côté de la courbe", "Il n'est pas plié", "Du côté du pied sur lequel il galope", "Vers le mur"], 2, "Le cheval reste légèrement plié vers le pied du galop."),
    Q("Pour commencer le contre-galop, quelle courbe choisis-tu ?", ["Une volte de 6 m", "Un coin serré", "Une serpentine de 5 boucles", "Un grand cercle ou un demi-cercle de 20 m"], 3, "On commence sur une courbe large ; on la resserre plus tard, quand l'équilibre est acquis.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-15 — DRESSAGE : CHANGEMENTS DE PIED ET REPRISE AMATEUR 2   (programme FFE Galop 8, partie spécifique dressage :
   changer de pied au galop d'une phase de galop « ferme » à une autre ; changer de pied en l'air ;
   contrôler la rectitude en ligne droite, sur les courbes et dans les transitions ; présenter une reprise Amateur 2 GP)
   — remplace l'ancien titre « Dressage Amateur 2 » (g8-c14 du sommaire)
   — 07/11 : programme FFE vérifié, mot pour mot « Changer de pied au galop de ferme à ferme » = galop, transition directe au pas, 3 à 5 foulées de pas, galop sur l'autre pied
   --------------------------------------------------------------------------------- */
{ id: "g8n-15", icone: "🎩", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Dressage : changements de pied et reprise Amateur 2" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-video-dressage.webp", couv: {} },

    B("Changer de pied de ferme à ferme", [
      P("Au Galop 8, tu apprends à changer de pied au galop, d'abord en repassant par une allure plus lente, puis en l'air. Le programme parle de changer de pied « de ferme à ferme » : on passe d'un galop bien établi au pas, puis du pas à un nouveau galop bien établi, sans jamais trotter."),
      S("🔁 Le changement de pied simple", null, [
        "Ton cheval galope sur un pied, dans un galop régulier et équilibré.",
        "Tu reviens au pas directement, sans passer par le trot, et tu marches trois à cinq foulées.",
        "Tu repars aussitôt au galop sur l'autre pied, dans un départ franc.",
        "Le cheval reste droit et dans le contact pendant tout le changement."
      ]),
      S("🎯 Ce qui compte", null, [
        "Une transition galop-pas nette, sans foulées de trot.",
        "Des foulées de pas régulières et calmes, pas précipitées.",
        "Un nouveau départ au galop immédiat, sur le bon pied : la jambe extérieure se recule pour tenir les hanches et appeler le postérieur externe.",
        "Le même galop avant et après."
      ]),
      E("💡", "Le savais-tu ?", "Le changement de pied simple prépare directement le changement en l'air : il apprend au cheval à quitter un pied et à en prendre un autre, à ta demande, en restant droit.")
    ]),

    B("Le changement de pied en l'air", [
      S("✨ Qu'est-ce que c'est ?", null, [
        "Le cheval change de pied pendant le temps de suspension du galop, sans passer par une autre allure.",
        "Les antérieurs et les postérieurs changent en même temps.",
        "Le cheval reste droit, sans accélérer ni sauter de côté."
      ]),
      S("🎛️ Les aides", "Par exemple, du galop à gauche au galop à droite.", [
        "Prépare un galop équilibré et droit, plutôt sur une ligne droite ou une diagonale.",
        "Change légèrement le pli vers la droite.",
        "Inverse tes jambes : la jambe gauche se recule pour tenir les hanches et appeler le nouveau postérieur externe, la jambe droite vient à la sangle.",
        "Donne tes aides au bon moment, à la fin d'une foulée de galop, pour que le changement se fasse pendant la suspension.",
        "Reste assis et droit, sans te jeter d'un côté."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Un changement de pied en l'air réussi se prépare à 90 % avant la demande : un galop sauteur, un cheval droit, des départs francs sur les deux pieds. Si l'un manque, reviens aux changements simples.")
    ]),

    B("La rectitude et la reprise Amateur 2", [
      S("📏 Contrôler la rectitude", "Le programme demande de contrôler la rectitude en ligne droite, sur les courbes et dans les transitions, aux trois allures.", [
        "En ligne droite : les postérieurs suivent la trace des antérieurs, les hanches ne s'échappent pas.",
        "Sur les courbes : le cheval suit la courbe avec tout son corps.",
        "Dans les transitions : il ne se jette pas sur une épaule, il ne dévie pas des hanches.",
        "Au galop, surveille particulièrement les hanches, qui ont tendance à rentrer vers l'intérieur."
      ]),
      S("🎩 La reprise Amateur 2 Grand Prix", null, [
        "Elle se monte sur un rectangle de 60 m sur 20 m.",
        "Elle réunit les mouvements du Galop 8 : latéraux, variations d'amplitude, contre-galop, changements de pied.",
        "La reprise exacte et ses mouvements changent régulièrement : prends toujours la version en vigueur sur le site de la FFE, et révise-la dans « Réviser mes reprises ».",
        "Chaque mouvement est noté sur 10, et des notes d'ensemble s'ajoutent."
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, tu présentes une reprise de niveau Amateur 1 et tu découvres le rassembler.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Repasser par le trot dans un changement de pied simple.",
        "Demander un changement en l'air sur un galop plat, sans énergie.",
        "Lancer le cheval en avant pour obtenir le changement : il change en accélérant.",
        "Monter la reprise sans l'avoir apprise à pied."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu es prêt pour l'Amateur 2.", [
        "Sur une diagonale, fais un changement de pied simple par le pas.",
        "Sur une ligne droite, fais un changement de pied en l'air à chaque main.",
        "Présente une reprise Amateur 2 Grand Prix en entier, en respectant le tracé."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment préparer mon cheval aux changements de pied en l'air ?",
        "Pourquoi mon cheval change de pied en retard derrière ?",
        "Où trouver la reprise Amateur 2 Grand Prix ?",
        "Comment apprendre une reprise par cœur ?",
        "Comment corriger un cheval qui rentre les hanches au galop ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Changement simple : galop, pas, galop, sans trot.",
        "Changement en l'air : pendant la suspension.",
        "Un cheval droit et un galop sauteur avant tout.",
        "Rectitude partout, aux trois allures.",
        "Reprise Amateur 2 GP : version en vigueur."
      ]),
      E("", "", "Le premier changement de pied en l'air, c'est souvent le plus beau souvenir d'un cavalier de dressage.")
    ])
  ],
  lexique: { fr: [
    ["Changement de pied simple", "Changement de pied en repassant par quelques foulées de pas."],
    ["Changement de pied en l'air", "Changement de pied pendant le temps de suspension du galop."],
    ["Temps de suspension", "Moment où, au galop, aucun pied ne touche le sol."],
    ["Galop sauteur", "Galop énergique, avec une suspension bien marquée."],
    ["Rectitude", "Le cheval droit : ses postérieurs suivent la trace de ses antérieurs."],
    ["Amateur 2 Grand Prix", "Reprise de dressage du niveau Amateur 2, présentée au Galop 8."]
  ] },
  quiz: [
    Q("Dans un changement de pied simple, par quelle allure repasses-tu ?", ["Le pas", "Le trot", "L'arrêt obligatoire", "Le reculer"], 0, "On revient au pas quelques foulées, sans passer par le trot, puis on repart sur l'autre pied."),
    Q("Quand se fait le changement de pied en l'air ?", ["Quand le cheval est à l'arrêt", "Pendant une foulée de trot", "Pendant le temps de suspension du galop", "N'importe quand"], 2, "Le cheval change de pied pendant la suspension, quand aucun pied ne touche le sol."),
    Q("Du galop à gauche au galop à droite, quelle jambe se recule ?", ["La jambe droite", "Aucune", "La jambe gauche", "Les deux"], 2, "La jambe gauche devient extérieure : elle se recule pour tenir les hanches et appeler le nouveau postérieur externe."),
    Q("Qu'est-ce qui prépare le mieux le changement en l'air ?", ["Un galop rapide", "Des sauts d'obstacles", "Un galop équilibré et droit, des départs francs sur les deux pieds", "Un cheval fatigué"], 2, "Un galop sauteur, un cheval droit et des départs francs : le changement se prépare avant la demande."),
    Q("Au galop, quelle faute de rectitude est fréquente ?", ["La tête trop basse", "Le cheval trop lent", "Les hanches qui rentrent vers l'intérieur", "Les oreilles en arrière"], 2, "Au galop, les hanches ont tendance à rentrer vers l'intérieur."),
    Q("Sur quel rectangle se monte la reprise Amateur 2 Grand Prix ?", ["60 m sur 20 m", "40 m sur 20 m", "20 m sur 20 m", "80 m sur 40 m"], 0, "Elle se monte sur un rectangle de 60 m sur 20 m."),
    Q("Où trouves-tu la version à jour de la reprise ?", ["Dans un vieux livre", "Chez le maréchal-ferrant", "Nulle part", "Sur le site de la FFE"], 3, "Les reprises changent régulièrement : on prend toujours la version en vigueur sur le site de la FFE."),
    Q("Ton cheval accélère à chaque changement de pied en l'air. Que fais-tu ?", ["Je le lance encore plus", "Je reviens aux changements simples et au galop équilibré", "J'arrête le dressage", "Je change de cheval"], 1, "On revient aux bases : galop équilibré, changements simples, puis on redemande.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-16 — CSO AMATEUR 2   (programme FFE Galop 8, partie spécifique saut d'obstacles :
   maîtriser son équilibre en étriers sur différentes trajectoires ; varier les abords d'un même profil d'obstacle ;
   respecter un contrat de foulées ; conduire sur un tracé serré ; réaliser un parcours de niveau Amateur 2)
   — pas de hauteur indiquée : cotes fixées par le règlement CSO de la saison
   --------------------------------------------------------------------------------- */
{ id: "g8n-16", icone: "🚧", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "CSO Amateur 2 : abords, foulées et tracé serré" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c11-saut.webp", couv: {} },

    B("L'équilibre en étriers", [
      P("Au Galop 8, en CSO, tu montes un parcours de niveau Amateur 2. Pour cela, ton équilibre en étriers doit rester stable sur toutes les trajectoires : lignes droites, courbes serrées, sauts en biais."),
      S("⚖️ Une position stable", null, [
        "Ton poids descend dans tes talons, tes chevilles absorbent le mouvement.",
        "Tes genoux et tes mollets restent au contact, sans pincer.",
        "Ton buste, légèrement en avant, suit le mouvement du cheval sans le devancer.",
        "Tes mains restent indépendantes de ton équilibre : elles ne s'appuient jamais sur l'encolure pour te tenir."
      ]),
      S("🔄 Sur les courbes", null, [
        "Reste au centre du cheval, sans te pencher vers l'intérieur.",
        "Ton poids descend un peu plus dans l'étrier intérieur.",
        "Tes épaules suivent les épaules du cheval et tu regardes l'obstacle suivant."
      ]),
      E("💡", "Le savais-tu ?", "On dit souvent que l'œil du cavalier dirige le cheval : en regardant l'obstacle suivant pendant le saut, ton corps prépare déjà la trajectoire, sans que tu y penses.")
    ]),

    B("Varier les abords et respecter un contrat de foulées", [
      S("🎯 Varier les abords d'un même obstacle", "Le même obstacle peut se sauter de plusieurs façons.", [
        { gras: "De face :", texte: "la trajectoire la plus simple, droite au milieu de l'obstacle." },
        { gras: "En biais :", texte: "plus court, mais il faut garder le cheval droit sur ta trajectoire et viser le centre de la ligne de biais." },
        { gras: "Après un tournant court :", texte: "il faut garder l'impulsion et l'équilibre dans le tournant, puis avoir quelques foulées droites." },
        { gras: "Selon le profil :", texte: "un vertical se saute avec un galop plus équilibré, un oxer avec un galop plus ample." }
      ]),
      S("🔢 Le contrat de foulées", null, [
        "Entre deux obstacles, le nombre de foulées est prévu : à la reconnaissance, tu marches la distance et tu comptes.",
        "Repère : une foulée de galop de parcours d'un cheval mesure environ 3,50 m à 3,70 m. Ton enseignant t'aide à adapter ce repère à ton cheval.",
        "Pour faire une foulée de plus, raccourcis le galop dès la réception ; pour en faire une de moins, allonge-le progressivement.",
        "Le contrat se décide avant, et se respecte : on ne change pas d'avis au milieu de la ligne."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Entraîne-toi sur une même ligne, en faisant tantôt le nombre de foulées « normal », tantôt une de plus, tantôt une de moins. Tu sauras ainsi régler ton cheval, plutôt que de le subir.")
    ]),

    B("Le tracé serré et le parcours", [
      S("🔀 Conduire sur un tracé serré", null, [
        "Tourner plus court fait gagner du temps, mais seulement si l'équilibre reste bon.",
        "Prépare le tournant dès la réception : regarde l'obstacle suivant, ton cheval reprend le bon pied.",
        "Garde l'impulsion dans le tournant : un cheval qui ralentit trop arrive sans énergie.",
        "Garde au moins quelques foulées droites avant l'obstacle."
      ]),
      S("🏁 Le parcours Amateur 2", null, [
        "Les cotes des épreuves (hauteur, largeur) sont fixées par le règlement CSO de la saison : ton enseignant te dit ce qu'il prévoit.",
        "Reconnais le parcours à pied : ordre, lignes, nombre de foulées, tournants, changements de pied.",
        "Détends ton cheval sur le plat, puis sur quelques sauts au paddock.",
        "Pendant le parcours, garde la même cadence et ton plan de foulées."
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, tu apprendras à utiliser le tableau des distances, qui donne les distances entre obstacles selon leur type.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Couper un tournant au point d'arriver en biais sans l'avoir décidé.",
        "Changer ton contrat de foulées au milieu de la ligne.",
        "Te pencher dans les tournants serrés.",
        "Fixer la barre des yeux au lieu de regarder plus loin."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu es prêt pour l'Amateur 2.", [
        "Saute le même vertical de face, en biais, puis après un tournant court.",
        "Sur une ligne de deux obstacles, fais successivement le nombre de foulées prévu, une de plus, puis une de moins.",
        "Enchaîne un parcours de niveau Amateur 2 avec au moins deux tournants serrés."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment marcher une distance à la reconnaissance ?",
        "Comment sauter un obstacle en biais ?",
        "Pourquoi mon cheval s'allonge-t-il dans les lignes ?",
        "Comment garder mon équilibre dans les tournants serrés ?",
        "Comment préparer un barrage ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Poids dans les talons, sur toutes les trajectoires.",
        "Un même obstacle, plusieurs abords.",
        "Le contrat de foulées se décide avant.",
        "Tracé serré : préparer dès la réception.",
        "Les cotes : celles du règlement de la saison."
      ]),
      E("", "", "Un parcours réussi, c'est un plan clair et un cavalier qui le suit, foulée après foulée.")
    ])
  ],
  lexique: { fr: [
    ["Contrat de foulées", "Nombre de foulées prévu entre deux obstacles."],
    ["Abord", "Les dernières foulées avant un obstacle."],
    ["Profil", "Forme d'un obstacle : vertical, oxer, triple barre…"],
    ["Vertical", "Obstacle dont les barres sont dans un seul plan."],
    ["Tracé serré", "Trajectoire courte, aux tournants rapprochés."],
    ["Reconnaissance", "Visite du parcours à pied, avant l'épreuve."]
  ] },
  quiz: [
    Q("En équilibre en étriers, où descend ton poids ?", ["Dans tes talons", "Sur les étriers, jambes tendues", "Sur l'encolure", "Sur tes genoux"], 0, "Le poids descend dans les talons ; les chevilles absorbent le mouvement."),
    Q("Dans un tournant, comment restes-tu ?", ["Au centre du cheval, le poids un peu plus dans l'étrier intérieur", "Penché vers l'intérieur", "Penché vers l'extérieur", "Assis au fond de la selle"], 0, "On reste au centre, sans se pencher, avec un peu plus de poids dans l'étrier intérieur."),
    Q("Qu'est-ce qu'un contrat de foulées ?", ["Un document signé avec l'organisateur", "Le nombre de foulées prévu entre deux obstacles", "Le temps accordé", "La hauteur des obstacles"], 1, "C'est le nombre de foulées que tu décides entre deux obstacles, à la reconnaissance."),
    Q("Quelle est la longueur moyenne d'une foulée de galop de parcours d'un cheval ?", ["1 m", "Environ 3,50 m à 3,70 m", "6 m", "10 m"], 1, "C'est le repère habituel, à adapter à chaque cheval."),
    Q("Pour faire une foulée de plus dans une ligne, que fais-tu ?", ["J'allonge", "J'attends le dernier moment", "Je raccourcis le galop dès la réception", "Rien"], 2, "On raccourcit dès la réception, pour arriver avec une foulée de plus sans à-coup."),
    Q("Un oxer se saute plutôt avec…", ["Un galop très court", "Au trot", "Un galop désuni", "Un galop plus ample"], 3, "Plus large, l'oxer demande un galop plus ample ; le vertical, un galop plus équilibré."),
    Q("Sur un tracé serré, quand prépares-tu le tournant ?", ["Juste avant l'obstacle suivant", "Au milieu du tournant", "Après le tournant", "Dès la réception du saut"], 3, "On regarde l'obstacle suivant et on prépare le tournant dès la réception."),
    Q("Qui fixe la hauteur des obstacles d'une épreuve Amateur 2 ?", ["Le règlement CSO de la saison", "Le cavalier", "Le propriétaire du cheval", "Personne"], 0, "Les cotes sont fixées par le règlement CSO, qui peut changer à chaque saison.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-17 — CCE AMATEUR 2   (programme FFE Galop 8, partie spécifique concours complet :
   maîtriser son équilibre en étriers sur différentes trajectoires et différents reliefs ; varier les abords selon le profil des obstacles ;
   conduire sur un tracé serré en enchaînant des sauts ; réaliser un test de dressage, un parcours d'obstacles et un enchaînement de cross de niveau CCE Amateur 2)
   — pas de hauteur indiquée : cotes fixées par le règlement CCE de la saison
   --------------------------------------------------------------------------------- */
{ id: "g8n-17", icone: "🌲", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "CCE Amateur 2 : reliefs, profils et enchaînements" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c12-cross.webp", couv: {} },

    B("L'équilibre sur les reliefs", [
      P("Au Galop 8, en concours complet, tu enchaînes un test de dressage, un parcours d'obstacles et un cross de niveau Amateur 2. En cross, ton équilibre doit s'adapter non seulement aux trajectoires, mais aussi au relief du terrain."),
      S("⛰️ Dans une montée", null, [
        "Ton buste s'incline un peu plus en avant pour soulager l'arrière-main.",
        "Tes mains avancent pour laisser l'encolure libre.",
        "Ton cheval garde de l'impulsion : il pousse avec ses postérieurs."
      ]),
      S("⬇️ Dans une descente", null, [
        "Ton buste se redresse, plus droit, sans te mettre en arrière de la verticale.",
        "Ton poids descend dans tes talons, tes jambes restent au contact.",
        "Tu restes droit dans la pente et tu gardes un contact stable, à une vitesse plus lente."
      ]),
      E("💡", "Le savais-tu ?", "En cross, le cavalier raccourcit souvent ses étriers d'un ou deux trous par rapport au CSO : sa position en équilibre est plus stable au galop soutenu et sur les terrains variés.")
    ]),

    B("Varier les abords selon le profil", [
      S("🌲 Les principaux profils", null, [
        { gras: "Les troncs et obstacles droits :", texte: "un galop régulier, en avant, comme un vertical solide." },
        { gras: "Les obstacles larges (stères, tables) :", texte: "un galop plus ample, avec de l'énergie." },
        { gras: "Les fossés :", texte: "regarde loin devant, jamais au fond du fossé, et garde tes jambes." },
        { gras: "Les contrebas et les descentes :", texte: "un abord plus lent, au trot ou au petit galop, buste redressé, rênes qui glissent si besoin." },
        { gras: "L'eau :", texte: "un abord calme, à vitesse réduite : l'eau freine le cheval à l'entrée." },
        { gras: "Les angles et les obstacles étroits :", texte: "une trajectoire très précise, le cheval bien encadré entre tes jambes et tes mains." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "À la reconnaissance du cross, pour chaque obstacle, décide ta vitesse d'abord, ta trajectoire ensuite. Puis regarde la réception : c'est elle qui te dit souvent comment aborder.")
    ]),

    B("Le tracé serré et les trois tests", [
      S("🔀 Enchaîner les sauts sur un tracé serré", null, [
        "Les obstacles s'enchaînent en courbe, parfois en quelques foulées : prépare la trajectoire dès la réception.",
        "Régule la vitesse avant l'enchaînement, pas pendant.",
        "Garde ton cheval droit sur la ligne que tu as choisie à la reconnaissance."
      ]),
      S("🏅 Le CCE Amateur 2", null, [
        "Un test de dressage, puis un parcours d'obstacles, puis un cross (l'ordre peut varier selon le concours).",
        "Les cotes des obstacles, la vitesse et les reprises sont fixées par le règlement CCE de la saison : ton enseignant te dit ce qu'il prévoit.",
        "En cross, un gilet de protection et un casque aux normes sont obligatoires.",
        "Le cross se reconnaît à pied, au moins une fois, en entier."
      ]),
      E("⚠️", "La sécurité", "En cross, la vitesse se gère toujours sous contrôle. Un cavalier qui ne contrôle plus sa vitesse s'arrête avant l'obstacle suivant : ce n'est pas un échec, c'est un bon réflexe.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Arriver vite sur un contrebas ou dans l'eau.",
        "Regarder au fond du fossé.",
        "Te mettre en arrière de la verticale dans les descentes.",
        "Reconnaître le cross trop vite, sans regarder les réceptions."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu es prêt pour le CCE Amateur 2.", [
        "Enchaîne une montée et une descente au galop en gardant ton équilibre.",
        "Saute un tronc, un fossé et un contrebas en adaptant ta vitesse.",
        "Enchaîne deux obstacles en courbe, sur la trajectoire choisie à pied."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment aborder un contrebas en cross ?",
        "Comment gérer ma vitesse en cross ?",
        "Pourquoi raccourcir les étriers en cross ?",
        "Comment sauter un angle ?",
        "Comment reconnaître un cross à pied ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Montée : buste en avant, mains qui avancent.",
        "Descente : buste redressé, poids dans les talons.",
        "Chaque profil, sa vitesse.",
        "Enchaînements : vitesse réglée avant.",
        "Gilet et casque, toujours."
      ]),
      E("", "", "Le complet, c'est trois disciplines et un seul objectif : un cheval en confiance du début à la fin.")
    ])
  ],
  lexique: { fr: [
    ["Concours complet (CCE)", "Discipline qui réunit un test de dressage, un parcours d'obstacles et un cross."],
    ["Contrebas", "Obstacle de cross où la réception est plus basse que l'appel."],
    ["Stère", "Obstacle de cross formé de bûches empilées."],
    ["Angle", "Obstacle de cross en forme de V, qui se saute sur sa partie la plus étroite."],
    ["Gilet de protection", "Protection du buste obligatoire en cross."]
  ] },
  quiz: [
    Q("Dans une montée, comment est ton buste ?", ["Un peu plus en avant", "Redressé en arrière", "Couché sur l'encolure", "Droit comme en dressage"], 0, "Le buste s'incline un peu plus en avant pour soulager l'arrière-main."),
    Q("Dans une descente, comment est ton buste ?", ["Penché en avant", "Redressé, sans passer en arrière de la verticale", "Très en arrière", "Couché"], 1, "On se redresse, le poids dans les talons, sans se mettre en arrière de la verticale."),
    Q("Sur un fossé, où regardes-tu ?", ["Au fond du fossé", "Loin devant", "Mes mains", "Le sol devant le cheval"], 1, "On regarde loin devant, jamais au fond du fossé."),
    Q("Comment abordes-tu un contrebas ?", ["Vite, pour sauter loin", "En accélérant à la dernière foulée", "Au pas allongé", "Plus lentement, buste redressé"], 3, "Un contrebas s'aborde plus lentement, buste redressé, rênes qui glissent si besoin."),
    Q("Pourquoi aborder l'eau à vitesse réduite ?", ["Pour que le cheval boive", "Pour éviter les éclaboussures", "Ce n'est pas nécessaire", "Parce que l'eau freine le cheval à l'entrée"], 3, "L'eau freine brusquement le cheval : un abord rapide déséquilibre le couple."),
    Q("Dans un enchaînement en courbe, quand règles-tu la vitesse ?", ["Pendant l'enchaînement", "Avant l'enchaînement", "Après", "Jamais"], 1, "On règle la vitesse avant, puis on garde la trajectoire choisie."),
    Q("Qu'est-ce qui est obligatoire en cross ?", ["Des éperons", "Une cravache longue", "Des bandes de polo", "Un gilet de protection et un casque aux normes"], 3, "Gilet de protection et casque aux normes sont obligatoires en cross."),
    Q("Tu ne contrôles plus ta vitesse en cross. Que fais-tu ?", ["Je m'arrête avant l'obstacle suivant", "Je continue", "J'accélère pour finir plus vite", "Je saute quand même"], 0, "Sans contrôle de la vitesse, on s'arrête : c'est un réflexe de sécurité.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g8n-18 — LES GRANDS AUTEURS, BASSE ÉCOLE ET HAUTE ÉCOLE   (programme FFE Galop 8, connaissances générales :
   citer les principaux auteurs historiques de la littérature équestre ; expliquer la différence entre basse école et haute école ;
   citer les airs de haute école et les sauts d'école)
   --------------------------------------------------------------------------------- */
{ id: "g8n-18", icone: "📜", type: { fr: "culture" }, duree: { fr: "11 min" }, titre: { fr: "Les grands auteurs, basse école et haute école" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-connaissances.webp", couv: {} },

    B("Les grands auteurs", [
      P("Au Galop 8, tu dois citer les principaux auteurs de la littérature équestre. Depuis l'Antiquité, des écuyers ont écrit comment ils travaillaient leurs chevaux. Ce que tu fais aujourd'hui en carrière vient en grande partie d'eux."),
      S("🏛️ De l'Antiquité à la Renaissance", null, [
        { gras: "Xénophon (Grèce, IVe siècle avant J.-C.) :", texte: "il écrit le premier traité d'équitation qui nous soit parvenu. Il demande déjà de travailler le cheval par la douceur." },
        { gras: "Federico Grisone (Italie, XVIe siècle) :", texte: "il fonde à Naples une célèbre académie d'équitation, d'où partira l'équitation savante en Europe." },
        { gras: "Antoine de Pluvinel (France, XVIIe siècle) :", texte: "écuyer du jeune Louis XIII, il prône une équitation plus douce et invente le travail entre les piliers." }
      ]),
      S("🇫🇷 Les grands écuyers français", null, [
        { gras: "François Robichon de La Guérinière (XVIIIe siècle) :", texte: "son « École de cavalerie » reste une référence. On lui doit l'épaule en dedans." },
        { gras: "François Baucher (XIXe siècle) :", texte: "il cherche la légèreté par l'assouplissement de la mâchoire et de l'encolure, et invente les changements de pied au temps." },
        { gras: "Le comte d'Aure (XIXe siècle) :", texte: "écuyer en chef à Saumur, il défend une équitation d'extérieur, en avant et pratique." },
        { gras: "Le général L'Hotte (XIXe siècle) :", texte: "élève de Baucher et du comte d'Aure, il résume l'équitation en trois mots : « calme, en avant et droit »." }
      ]),
      S("🌍 Au XXe siècle", null, [
        { gras: "Federico Caprilli (Italie) :", texte: "il invente l'équitation en avant à l'obstacle, où le cavalier suit le mouvement du cheval au lieu de se pencher en arrière." },
        { gras: "Nuno Oliveira (Portugal) :", texte: "grand maître de l'équitation classique, recherchant la légèreté." }
      ]),
      E("💡", "Le savais-tu ?", "La devise du général L'Hotte, « calme, en avant et droit », résume en quelques mots ce qu'on attend encore aujourd'hui d'un cheval bien dressé.")
    ]),

    B("Basse école et haute école", [
      S("📗 La basse école", null, [
        "C'est le dressage de base du cheval : les allures, les figures, les transitions, les premiers déplacements latéraux.",
        "Elle rend le cheval souple, calme, en avant et attentif.",
        "C'est ce que tu travailles dans tes Galops."
      ]),
      S("📕 La haute école", null, [
        "C'est l'équitation savante, qui demande au cheval un équilibre et un rassembler très poussés.",
        "Elle s'appuie toujours sur une basse école solide.",
        "Elle comprend les airs de haute école et les sauts d'école."
      ]),
      E("👨‍🏫", "Le conseil du coach", "La haute école ne commence pas par les airs spectaculaires : un cheval qui piaffe sans être calme, en avant et droit n'a rien compris. La basse école, c'est la fondation de la maison.")
    ]),

    B("Les airs et les sauts d'école", [
      S("✨ Les airs de haute école", null, [
        { gras: "Le piaffer :", texte: "un trot cadencé, presque sur place, très rassemblé." },
        { gras: "Le passage :", texte: "un trot très rassemblé et très cadencé, avec une longue suspension, comme au ralenti." },
        { gras: "La pirouette :", texte: "le cheval tourne au galop autour de ses hanches, sur un très petit cercle." },
        { gras: "Les changements de pied au temps :", texte: "des changements de pied en l'air à chaque foulée." },
        { gras: "Les airs relevés :", texte: "le cheval lève son avant-main et se tient sur ses postérieurs pliés, comme dans la pesade." }
      ]),
      S("🦘 Les sauts d'école", "Pratiqués par le Cadre Noir de Saumur, sans étriers.", [
        { gras: "La courbette :", texte: "le cheval s'élève sur ses postérieurs et garde la position quelques secondes." },
        { gras: "La croupade :", texte: "le cheval lève la croupe et détache une ruade, les postérieurs étendus." },
        { gras: "La cabriole :", texte: "le cheval s'élève du sol et, en l'air, détache une ruade, postérieurs à l'horizontale. C'est le plus haut et le plus difficile des sauts d'école." }
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, tu découvriras l'École française d'équitation et son histoire, dont le Cadre Noir de Saumur est l'un des gardiens.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre basse école et « équitation de débutant » : c'est la base du travail de tous les chevaux.",
        "Mélanger les époques : Xénophon est grec, de l'Antiquité ; La Guérinière, français, du XVIIIe siècle.",
        "Confondre le piaffer (presque sur place) et le passage (qui avance)."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais les grands auteurs.", [
        "Cite cinq auteurs, avec leur pays et leur siècle.",
        "Explique la différence entre basse école et haute école.",
        "Cite trois airs de haute école et les trois sauts d'école du Cadre Noir."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qui était La Guérinière ?",
        "Pourquoi Baucher est-il célèbre ?",
        "Que veut dire « calme, en avant et droit » ?",
        "Quelle différence entre piaffer et passage ?",
        "Qu'est-ce que le Cadre Noir de Saumur ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Xénophon, Pluvinel, La Guérinière, Baucher, L'Hotte.",
        "Basse école : les bases ; haute école : l'équitation savante.",
        "Airs : piaffer, passage, pirouette.",
        "Sauts d'école : courbette, croupade, cabriole."
      ]),
      E("", "", "À chaque épaule en dedans, tu montes un peu avec La Guérinière.")
    ])
  ],
  lexique: { fr: [
    ["Basse école", "Dressage de base du cheval : allures, figures, transitions, premiers latéraux."],
    ["Haute école", "Équitation savante qui demande un équilibre et un rassembler très poussés."],
    ["Piaffer", "Trot rassemblé et cadencé, presque sur place."],
    ["Passage", "Trot très rassemblé et cadencé, avec une longue suspension."],
    ["Pirouette", "Tour complet du cheval au galop autour de ses hanches."],
    ["Sauts d'école", "Courbette, croupade et cabriole, pratiquées par le Cadre Noir."],
    ["Piliers", "Deux poteaux entre lesquels on travaille le cheval à pied, inventés par Pluvinel."]
  ] },
  quiz: [
    Q("Qui a écrit le premier traité d'équitation qui nous soit parvenu ?", ["Xénophon", "Baucher", "Caprilli", "L'Hotte"], 0, "Xénophon, au IVe siècle avant J.-C., en Grèce."),
    Q("À qui doit-on l'épaule en dedans ?", ["Pluvinel", "Caprilli", "Oliveira", "La Guérinière"], 3, "La Guérinière, auteur de « École de cavalerie », au XVIIIe siècle."),
    Q("Quelle est la devise du général L'Hotte ?", ["En avant toute", "Calme, en avant et droit", "Légèreté avant tout", "Toujours plus haut"], 1, "« Calme, en avant et droit » résume l'équitation selon L'Hotte."),
    Q("Qui a inventé l'équitation en avant à l'obstacle ?", ["Xénophon", "Baucher", "Pluvinel", "Federico Caprilli"], 3, "L'Italien Caprilli, au début du XXe siècle."),
    Q("Qu'est-ce que la basse école ?", ["Le dressage de base du cheval", "L'équitation des enfants", "Le travail à pied seulement", "Le saut d'obstacles"], 0, "La basse école est le dressage de base, sur lequel s'appuie la haute école."),
    Q("Quel air est un trot presque sur place ?", ["Le passage", "La pirouette", "La cabriole", "Le piaffer"], 3, "Le piaffer est un trot rassemblé presque sur place ; le passage avance."),
    Q("Quels sont les trois sauts d'école du Cadre Noir ?", ["Piaffer, passage, pirouette", "Pesade, levade, mézair", "Appuyer, cession, épaule en dedans", "Courbette, croupade, cabriole"], 3, "Le Cadre Noir pratique la courbette, la croupade et la cabriole."),
    Q("Quel est le plus haut des sauts d'école ?", ["La courbette", "La croupade", "La cabriole", "La pesade"], 2, "La cabriole : le cheval s'élève et détache une ruade, postérieurs à l'horizontale.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-19 — SPORT ET LOISIR : HISTOIRE, CIRCUITS ET LABELS   (programme FFE Galop 8, connaissances générales :
   expliquer quand et comment l'équitation sportive et de loisir s'est développée ; connaître les différents circuits et labels de la compétition)
   — À VÉRIFIER par Blandine : liste des labels de compétition en vigueur
   --------------------------------------------------------------------------------- */
{ id: "g8n-19", icone: "🏆", type: { fr: "culture" }, duree: { fr: "10 min" }, titre: { fr: "Sport et loisir : histoire, circuits et labels" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-video-parcours.webp", couv: {} },

    B("Du cheval utile au cheval de sport", [
      P("Au Galop 8, tu dois expliquer comment l'équitation sportive et de loisir s'est développée, et connaître les circuits et les labels de la compétition. Pendant des siècles, le cheval a d'abord été un outil : pour la guerre, les transports, l'agriculture. Le sport et le loisir sont venus bien plus tard."),
      S("🕰️ Les grandes étapes", null, [
        { gras: "Le XIXe siècle :", texte: "les courses se développent, et les premiers concours hippiques apparaissent en France, sous l'impulsion de la Société hippique française, créée en 1865." },
        { gras: "1912 :", texte: "l'équitation entre aux Jeux olympiques de Stockholm, avec le dressage, le saut d'obstacles et le concours complet. Les cavaliers sont alors des officiers." },
        { gras: "Après 1950 :", texte: "les chevaux disparaissent de l'armée et des champs, remplacés par les moteurs. Les civils et les femmes s'ouvrent les épreuves olympiques." },
        { gras: "Les années 1960-1970 :", texte: "l'équitation devient un loisir ouvert à tous : centres équestres, poney-clubs, tourisme équestre." },
        { gras: "1987 :", texte: "naissance de la Fédération française d'équitation (FFE), qui réunit le sport, l'équitation de club et le tourisme équestre." }
      ]),
      E("💡", "Le savais-tu ?", "En dressage, les femmes ont pu participer aux Jeux olympiques dès 1952. Aujourd'hui, l'équitation est l'un des rares sports olympiques où hommes et femmes concourent ensemble, dans les mêmes épreuves.")
    ]),

    B("Les circuits de compétition", [
      S("🏅 Les grands circuits FFE", "Chaque cavalier concourt dans le circuit qui correspond à son niveau et à sa monture.", [
        { gras: "Le circuit Club :", texte: "pour les cavaliers de club, sur les chevaux et poneys des centres équestres." },
        { gras: "Le circuit Poney :", texte: "pour les jeunes cavaliers à poney, jusqu'au niveau Élite." },
        { gras: "Le circuit Amateur :", texte: "pour les cavaliers non professionnels, souvent propriétaires de leur cheval. Le niveau Amateur 2 en fait partie." },
        { gras: "Le circuit Pro :", texte: "pour les cavaliers professionnels et les meilleurs amateurs." }
      ]),
      S("🌍 D'autres circuits", null, [
        { gras: "Les jeunes chevaux :", texte: "des épreuves réservées aux chevaux de 4 à 6 ans, organisées par la SHF." },
        { gras: "L'international :", texte: "les compétitions de la FEI, jusqu'aux Coupes des nations, aux championnats et aux Jeux olympiques." },
        { gras: "Les championnats de France :", texte: "chaque été, notamment à Lamotte-Beuvron, au Parc équestre fédéral." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Monte d'un niveau quand tu réussis régulièrement au niveau inférieur, pas avant. Un classement de temps en temps vaut moins qu'une série de parcours sans faute.")
    ]),

    B("Les labels", [
      S("🏷️ À quoi sert un label ?", null, [
        "Un label garantit un niveau de qualité, vérifié par la FFE.",
        "Il permet aux cavaliers de choisir un club, une écurie ou un concours en connaissance de cause."
      ]),
      S("🏠 Les labels des structures", null, [
        "Les labels de qualité de la FFE distinguent les clubs selon leurs activités, comme l'École française d'équitation, le Poney Club de France, le Cheval Club de France ou le Centre de tourisme équestre.",
        "Le label Écurie de compétition distingue les structures qui accompagnent les cavaliers en concours."
      ]),
      S("🏆 Les labels des concours", null, [
        "Certains concours portent un label qui garantit la qualité de l'organisation : terrain, installations, accueil, dotations.",
        "Les grands circuits nationaux regroupent des étapes labellisées, comme le Grand National pour les cavaliers Pro.",
        "Les labels et leurs noms évoluent : ton enseignant ou le site de la FFE te donne la liste en vigueur."
      ]),
      E("🔭", "Pour aller plus loin", "Au Galop 9, tu étudieras le haut niveau : son organisation, les équipes de France et les filières qui permettent d'y accéder.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Penser que le sport équestre est très ancien : il s'est surtout développé au XXe siècle.",
        "Confondre circuit (le niveau où l'on concourt) et label (une garantie de qualité).",
        "Croire qu'Amateur veut dire « débutant » : c'est un circuit exigeant, pour les cavaliers non professionnels."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais le monde de la compétition.", [
        "Raconte en quelques phrases comment le cheval est passé de l'armée et des champs au sport et au loisir.",
        "Cite les quatre grands circuits FFE et dis dans lequel tu concours.",
        "Retrouve un label de ton club ou d'un concours où tu es allé."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Depuis quand l'équitation est-elle aux Jeux olympiques ?",
        "Quelle différence entre Amateur et Pro ?",
        "Qu'est-ce que le Grand National ?",
        "Quels labels peut avoir un centre équestre ?",
        "Qu'est-ce que le Parc équestre fédéral ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "D'abord un outil, puis un sport et un loisir.",
        "1912 : l'équitation aux Jeux olympiques.",
        "1987 : naissance de la FFE.",
        "Circuits : Club, Poney, Amateur, Pro.",
        "Labels : une garantie de qualité."
      ]),
      E("", "", "Chaque concours où tu t'engages est l'héritier de plus d'un siècle d'histoire.")
    ])
  ],
  lexique: { fr: [
    ["Circuit", "Ensemble des compétitions d'un même niveau : Club, Poney, Amateur, Pro."],
    ["Label", "Garantie de qualité délivrée par la FFE à une structure ou à un concours."],
    ["FEI", "Fédération équestre internationale, qui organise les compétitions internationales."],
    ["SHF", "Société hippique française, qui organise notamment les épreuves des jeunes chevaux."],
    ["Parc équestre fédéral", "Site de la FFE à Lamotte-Beuvron, où se déroulent de grands championnats."]
  ] },
  quiz: [
    Q("Avant d'être un sport, à quoi servait surtout le cheval ?", ["Au cirque uniquement", "Aux courses", "Au tourisme", "À la guerre, aux transports et à l'agriculture"], 3, "Pendant des siècles, le cheval a d'abord été un outil."),
    Q("En quelle année l'équitation entre-t-elle aux Jeux olympiques ?", ["1896", "1912", "1952", "1987"], 1, "En 1912, aux Jeux de Stockholm, avec le dressage, le saut d'obstacles et le complet."),
    Q("Qui montait aux Jeux olympiques au début ?", ["Des officiers", "Des enfants", "Des jockeys", "Tout le monde"], 0, "Au début, les cavaliers olympiques étaient des officiers."),
    Q("Quand l'équitation devient-elle un loisir ouvert à tous ?", ["Au Moyen Âge", "Dans les années 1960-1970", "En 2000", "Au XVIIIe siècle"], 1, "Les centres équestres, les poney-clubs et le tourisme équestre se développent dans les années 1960-1970."),
    Q("En quelle année naît la FFE ?", ["1987", "1912", "1952", "2001"], 0, "La Fédération française d'équitation naît en 1987."),
    Q("Dans quel circuit se trouve le niveau Amateur 2 ?", ["Club", "Poney", "Pro", "Amateur"], 3, "Le niveau Amateur 2 fait partie du circuit Amateur."),
    Q("Qu'est-ce qu'un label ?", ["Une garantie de qualité vérifiée par la FFE", "Un niveau de compétition", "Un prix", "Un diplôme de cavalier"], 0, "Un label garantit un niveau de qualité d'une structure ou d'un concours."),
    Q("Qui organise les épreuves des jeunes chevaux ?", ["La SHF", "La FEI", "Les clubs", "L'IFCE"], 0, "La Société hippique française organise les épreuves des jeunes chevaux.")
  ]
},

/* ---------------------------------------------------------------------------------
   g8n-20 — L'EXAMEN DU GALOP 8   (comme g7n-16 au Galop 7)
   — À VÉRIFIER par Blandine : organisation en modules et choix d'une partie spécifique
   — pas de détail technique ici : chaque compétence a son cours (pas de doublon)
   --------------------------------------------------------------------------------- */
{ id: "g8n-20", icone: "🎓", type: { fr: "culture" }, duree: { fr: "8 min" }, titre: { fr: "L'examen du Galop 8" },
  blocs: [
    { type: "couv-affiche", src: "images/galop7-hero-palomino.webp", couv: {} },

    B("Comment se passe l'examen", [
      P("Le Galop 8 vérifie que tu es un cavalier confirmé : tu connais l'histoire et le monde de l'équitation, tu sais soigner et préparer un cheval, tu le travailles à pied, en liberté et à la longe à l'obstacle, et tu montes dans la discipline de ton choix au niveau Amateur 2."),
      S("👩‍🏫 Qui le fait passer ?", null, [
        "Un enseignant diplômé, licencié à la FFE pour l'année en cours, avec un code examinateur qui l'autorise à valider le Galop 8.",
        "Il peut t'évaluer pendant une session d'examen, ou petit à petit, pendant tes cours et tes stages.",
        "Ton Galop 7 doit être validé avant ton Galop 8."
      ]),
      S("🧾 Ce qui est évalué", null, [
        "Les connaissances générales et la connaissance du cheval.",
        "S'occuper du cheval : soins, condition physique, tonte.",
        "La pratique à pied : longe à l'obstacle, longues rênes, liberté.",
        "La pratique à cheval : la partie commune, puis une partie spécifique au choix, dressage, CSO ou concours complet."
      ]),
      E("💡", "Le savais-tu ?", "Une fois ton Galop validé, ton enseignant l'enregistre en ligne : il apparaît dans ton espace cavalier sur le site de la FFE, d'où tu peux imprimer ton diplôme.")
    ]),

    B("Choisir sa partie spécifique", [
      S("🎯 Trois chemins", null, [
        { gras: "Dressage :", texte: "appuyer, cession au galop, contre-galop, changements de pied, et une reprise Amateur 2 Grand Prix." },
        { gras: "Saut d'obstacles :", texte: "abords variés, contrat de foulées, tracé serré, et un parcours Amateur 2." },
        { gras: "Concours complet :", texte: "reliefs, profils de cross, enchaînements, et les trois tests du CCE Amateur 2." }
      ]),
      S("🤔 Comment choisir ?", null, [
        "Choisis la discipline que tu pratiques le plus, avec un cheval qui en a le niveau.",
        "Parles-en avec ton enseignant : il connaît tes points forts.",
        "Quelle que soit la discipline, la partie commune reste la même pour tous."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Prépare ton examen comme un concours : apprends ta reprise, marche tes parcours, prépare ton cheval. Et révise tes cours de connaissances au calme, quelques minutes par jour, avec les quiz de Hype.")
    ]),

    B("Se préparer", [
      S("📅 Le plan des dernières semaines", null, [
        "Fais le point avec ton enseignant sur ce qui est déjà validé.",
        "Travaille en priorité ce qui manque, pas ce que tu sais déjà faire.",
        "Refais chaque quiz du Galop 8 jusqu'à obtenir toutes les étoiles.",
        "La veille, prépare ton matériel, celui de ton cheval, et repose-toi."
      ]),
      S("🏇 Le défi du cavalier", "Fais le point avant l'examen.", [
        "Liste les cours du Galop 8 où tu te sens à l'aise, et ceux à retravailler.",
        "Choisis ta partie spécifique et explique ton choix à ton enseignant.",
        "Fixe une date d'examen avec lui."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment réviser mon Galop 8 ?",
        "Quelle partie spécifique choisir ?",
        "Peut-on valider le Galop 8 en plusieurs fois ?",
        "Que faire si je rate une partie de l'examen ?",
        "Que vient après le Galop 8 ?"
      ]),
      E("", "", "Le Galop 8, c'est la preuve que tu es devenu un cavalier capable de faire progresser un cheval.")
    ])
  ],
  lexique: { fr: [
    ["Code examinateur", "Autorisation donnée par la FFE à un enseignant pour valider les Galops."],
    ["Partie commune", "Compétences à cheval évaluées pour tous, quelle que soit la discipline."],
    ["Partie spécifique", "Compétences propres à la discipline choisie : dressage, CSO ou concours complet."]
  ] },
  quiz: [
    Q("Qui peut faire passer le Galop 8 ?", ["N'importe quel cavalier confirmé", "Un enseignant diplômé, licencié FFE, avec un code examinateur", "Un juge de dressage", "Le propriétaire du cheval"], 1, "Seul un enseignant diplômé, licencié et autorisé par un code examinateur peut valider le Galop 8."),
    Q("Quel Galop doit être validé avant le Galop 8 ?", ["Le Galop 7", "Le Galop 5", "Le Galop 6", "Aucun"], 0, "Le Galop 7 doit être validé avant le Galop 8."),
    Q("Pour la pratique à cheval, que présentes-tu ?", ["La partie commune et une partie spécifique au choix", "Les trois disciplines", "Seulement du dressage", "Seulement du CSO"], 0, "Tout le monde présente la partie commune, puis une partie spécifique : dressage, CSO ou complet."),
    Q("Quel niveau de compétition correspond au Galop 8 ?", ["Club 1", "Pro 1", "Amateur 2", "Poney Élite"], 2, "Les parties spécifiques du Galop 8 sont de niveau Amateur 2."),
    Q("Comment choisir ta partie spécifique ?", ["Au hasard", "Toujours le dressage", "La plus facile", "Selon la discipline que tu pratiques le plus, avec ton enseignant"], 3, "On choisit la discipline qu'on pratique le plus, avec un cheval qui en a le niveau, en accord avec l'enseignant."),
    Q("Où retrouves-tu ton Galop une fois validé ?", ["Dans ton espace cavalier sur le site de la FFE", "Sur ton livret de cheval", "Nulle part", "Sur ta licence papier uniquement"], 0, "Ton enseignant l'enregistre en ligne ; tu le retrouves dans ton espace cavalier FFE.")
  ]
}

];

window.COURS_GALOP8_FR = COURS;
window.COURS_GALOP8_VERSION = COURS_GALOP8_VERSION;
/* petit lexique de chaque cours, montré sur la page « Révise en 2 minutes » (comme les Galops 5 et 7) */
window.HYPE_LEXIQUE_EXTRA = window.HYPE_LEXIQUE_EXTRA || {};
var TITRE_LEX = {"fr":"Petit lexique","en":"Mini glossary","es":"Pequeño glosario","it":"Piccolo glossario","ja":"ミニ用語集","de":"Kleines Lexikon","ar":"معجم صغير","zh":"小词汇表","nl":"Kleine woordenlijst","pt":"Pequeno glossário","sv":"Liten ordlista","ru":"Маленький словарь","pl":"Mały słowniczek","ko":"작은 용어집"};
COURS.forEach(function (c) { if (c.lexique && c.lexique.fr) { var o = {}; Object.keys(c.lexique).forEach(function (lg) { if (Array.isArray(c.lexique[lg])) o[lg] = { titre: TITRE_LEX[lg] || TITRE_LEX.fr, mots: c.lexique[lg] }; }); window.HYPE_LEXIQUE_EXTRA[c.id] = o; } });
window.COURS_GALOP8_PARTIES = { vie: ["g8n-01", "g8n-02", "g8n-03", "g8n-04", "g8n-05", "g8n-06"], connaissance: ["g8n-07", "g8n-08", "g8n-09", "g8n-10"], technique: ["g8n-11", "g8n-12", "g8n-13", "g8n-14", "g8n-15", "g8n-16", "g8n-17"], culture: ["g8n-18", "g8n-19", "g8n-20"] };
})();
