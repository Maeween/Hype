/* =====================================================================================
   hype-cours-galop9.js — GALOP 9 (cours + quiz)
   07/11/2026 (Blandine « Ok continue », après le Galop 8) : 19 cours d'après le programme officiel FFE du Galop 9 (REF n°237, 2022) :
     Vie équestre 5 (g9n-01 … g9n-05), Connaissance du cheval 4 (g9n-06 … g9n-09),
     Pratique équestre 6 (g9n-10 … g9n-15), Culture équestre 4 (g9n-16 … g9n-19).
   Les 15 titres de l'ancien sommaire (HYPE_SOMMAIRE_G89, g9-c1 … g9-c15) sont repris ; 4 cours ajoutés pour couvrir le programme
   (longues rênes en 2 cours, dressage et CSO en 2 cours chacun, examen) ; « Éthologie et bien-être » recentré sur la charte (À CONFIRMER).
   Écrits en FRANÇAIS d'abord ; traductions seulement après relecture de Blandine.
   À chaque livraison : incrémenter COURS_GALOP9_VERSION ci-dessous ET sa clé ?v= dans HYPE_COURS_FICHIERS (index.html).
   ===================================================================================== */
(function () {
"use strict";
if (typeof window === "undefined") return;
var COURS_GALOP9_VERSION = 3; /* 07/11 nuit : relecture (Claude) — équilibre « poids dans les talons » au lieu de « sur les étriers » (cours 13 et 15), conseil des bandes reformulé (cours 1) */ /* 07/11 : quiz à 10 questions partout (comme le Galop 7), relecture ; vaccins (calendrier) et niveaux de l'examen précisés d'après le programme FFE */ /* v1 : */ /* 07/11 : les 19 cours g9n-01 … g9n-19 écrits en français, à relire */
var S = function (titre, sous, puces) { var o = { k: "section", titre: titre }; if (sous) o.sous = sous; if (puces) o.puces = puces.map(function (p) { return typeof p === "string" ? { texte: p } : p; }); return o; };
var P = function (texte) { return { k: "para", texte: texte }; };
var E = function (emoji, titre, texte) { var o = { k: "encadre", emoji: emoji, texte: texte }; if (titre) o.titre = titre; return o; };
var B = function (titre, contenu) { return { type: "texte-riche", aere: true, titre: { fr: titre }, contenu: { fr: contenu } }; };
var Q = function (question, options, correct, explication) { return { type: "qcm", question: { fr: question }, options: { fr: options }, correct: correct, explication: { fr: explication } }; };

var COURS = [

/* ---------------------------------------------------------------------------------
   g9n-01 — POSER DES BANDES DE TRAVAIL   (programme FFE Galop 9, s'occuper du cheval : poser des bandes de travail)
   --------------------------------------------------------------------------------- */
{ id: "g9n-01", icone: "🎗️", type: { fr: "soins" }, duree: { fr: "10 min" }, titre: { fr: "Poser des bandes de travail" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c05-soins.webp", couv: {} },

    B("À quoi servent les bandes de travail ?", [
      P("Au Galop 9, tu dois savoir poser des bandes de travail. Ce ne sont pas les bandes de repos que tu poses au box : les bandes de travail se portent pendant la séance, sur les canons, pour protéger et soutenir les membres."),
      S("🎯 Leurs rôles", null, [
        { gras: "Protéger :", texte: "des coups que le cheval peut se donner lui-même, d'un membre contre l'autre." },
        { gras: "Soutenir :", texte: "bien posées, elles accompagnent les tendons pendant l'effort. On les choisit surtout pour un cheval dont les tendons sont fragiles." },
        { gras: "Tenir propre :", texte: "elles évitent que la terre et le sable frottent la peau." }
      ]),
      S("🧰 Le matériel", null, [
        "Des sous-bandes (ou des cotons de bandage), propres, sans pli, qui protègent le tendon de la pression de la bande.",
        "Des bandes de travail élastiques, propres et bien roulées, avec leur fermeture.",
        "Toujours quatre bandes de même tension, pour que les membres soient traités pareil."
      ]),
      E("💡", "Le savais-tu ?", "Une bande de travail mal posée fait plus de mal que pas de bande du tout : trop serrée ou serrée par endroits, elle peut abîmer le tendon qu'elle devait protéger.")
    ]),

    B("La technique de pose", [
      S("🔁 Les étapes", "Ton cheval est propre, sec et attaché.", [
        "Pose la sous-bande bien à plat autour du canon, sans pli, en la tendant légèrement.",
        "Commence la bande en haut du canon, sous le genou ou sous le jarret, en tenant le rouleau du côté extérieur du membre.",
        "Descends en spirale régulière : chaque tour recouvre la moitié du tour précédent.",
        "Arrête-toi au boulet sans le bloquer : le cheval doit pouvoir le plier complètement.",
        "Remonte de la même façon, toujours en recouvrant la moitié, jusque sous le genou ou le jarret.",
        "Ferme la bande sur la face extérieure du membre, jamais sur le tendon, et range bien l'extrémité de la fermeture."
      ]),
      S("🤏 Le juste serrage", null, [
        "La tension est la même du début à la fin : c'est la régularité qui protège le tendon.",
        "Tu tends la bande en l'enroulant, pas en tirant fort au moment de fermer.",
        "Tu dois pouvoir glisser un doigt sous la bande, sans plus.",
        "La sous-bande dépasse légèrement en haut et en bas de la bande."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Enroule toujours de l'avant vers l'arrière en passant par l'extérieur du membre, aux quatre membres : c'est le sens qui évite de tirer le tendon vers l'extérieur.")
    ]),

    B("Pendant et après le travail", [
      S("👀 Pendant la séance", null, [
        "Regarde les bandes après la détente : aucune ne doit avoir glissé.",
        "Si une bande se défait, arrête-toi et repose-la entièrement : une bande qui pend peut faire tomber le cheval."
      ]),
      S("✅ Après la séance", null, [
        "Retire les bandes dès la fin du travail : on ne les laisse jamais au box.",
        "Défais-les vite, sans les rouler sur le membre.",
        "Passe la main sur chaque tendon : il doit être froid, sans gonflement ni marque.",
        "Lave les bandes et les sous-bandes, fais-les sécher, puis roule-les bien serrées, fermeture à l'intérieur, prêtes pour la prochaine fois."
      ]),
      E("🔭", "Pour aller plus loin", "Les guêtres et les protège-tendons sont plus rapides à poser et ne risquent pas d'être mal serrés. Beaucoup de cavaliers les préfèrent aujourd'hui, et certaines compétitions encadrent les protections permises : ton enseignant te dit ce qui est autorisé.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Serrer plus fort à certains endroits : la pression inégale abîme le tendon.",
        "Fermer la bande sur le tendon ou à l'avant du canon.",
        "Bloquer le boulet en descendant trop bas.",
        "Poser une bande sur un membre mouillé ou sale.",
        "Laisser des bandes de travail au box."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais poser des bandes de travail.", [
        "Pose les quatre bandes de travail, sous-bandes comprises.",
        "Fais vérifier la tension et la fermeture de chacune.",
        "Après la séance, retire-les, vérifie les tendons et range les bandes roulées."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle différence entre bandes de travail et bandes de repos ?",
        "Bandes ou guêtres : que choisir ?",
        "Comment savoir si une bande est trop serrée ?",
        "Comment bien rouler une bande ?",
        "Quels signes sur un tendon doivent m'inquiéter ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Sous-bande à plat, sans pli.",
        "Du haut du canon au boulet, puis remonter.",
        "Chaque tour recouvre la moitié du précédent.",
        "Tension égale, un doigt dessous.",
        "Fermeture à l'extérieur, jamais sur le tendon."
      ]),
      E("", "", "Une bande bien posée ne se voit pas : le cheval travaille comme s'il n'en portait pas.")
    ])
  ],
  lexique: { fr: [
    ["Bande de travail", "Bande élastique posée sur le canon pendant la séance, pour protéger et soutenir le membre."],
    ["Bande de repos", "Bande posée au box, sur un coton épais, pour reposer les membres."],
    ["Sous-bande", "Protection posée sous la bande, qui répartit la pression sur le tendon."],
    ["Canon", "Partie du membre entre le genou (ou le jarret) et le boulet."],
    ["Tendon", "Cordon qui relie un muscle à un os ; à l'arrière du canon, il est fragile chez le cheval de sport."]
  ] },
  quiz: [
    Q("Quand porte-t-on des bandes de travail ?", ["Au box, la nuit", "Pendant le transport uniquement", "Au pré", "Pendant la séance"], 3, "Les bandes de travail se portent pendant la séance ; les bandes de repos, au box."),
    Q("Pour quel cheval choisit-on surtout des bandes de travail ?", ["Un poney au pré", "Un cheval qui ne travaille pas", "Un cheval aux tendons fragiles", "Un cheval qui a froid"], 2, "Bien posées, elles soutiennent et protègent les membres, surtout quand les tendons sont fragiles."),
    Q("Où commences-tu la bande ?", ["Au sabot", "Au boulet", "En haut du canon, sous le genou ou le jarret", "Au milieu du tendon"], 2, "On commence en haut du canon, on descend jusqu'au boulet, puis on remonte."),
    Q("De combien chaque tour recouvre-t-il le précédent ?", ["D'un quart", "De la moitié", "Pas du tout", "Entièrement"], 1, "Chaque tour recouvre la moitié du précédent, pour une tension régulière."),
    Q("Jusqu'où descend la bande ?", ["Jusqu'au sabot", "Jusqu'au boulet, sans le bloquer", "Jusqu'au milieu du canon", "Sous le paturon"], 1, "Elle s'arrête au boulet sans gêner sa flexion."),
    Q("Une bande se défait pendant la séance. Que fais-tu ?", ["Je continue", "Je la serre un peu", "Je la coupe", "Je m'arrête et je la repose entièrement"], 3, "Une bande qui pend peut faire tomber le cheval : on la repose entièrement."),
    Q("Où places-tu la fermeture ?", ["Sur la face extérieure du membre", "Sur le tendon", "À l'avant du canon", "À l'intérieur du membre"], 0, "On ferme sur la face extérieure, jamais sur le tendon."),
    Q("Comment vérifies-tu le serrage ?", ["Je ne dois rien pouvoir glisser dessous", "Je glisse toute la main", "Je glisse un doigt sous la bande, sans plus", "Je regarde si la bande pend"], 2, "Un doigt doit passer sous la bande, sans plus : c'est le signe d'une tension juste."),
    Q("Que fais-tu des bandes après la séance ?", ["Je les laisse pour la nuit", "Je les retire le lendemain", "Je les mouille sur le cheval", "Je les retire tout de suite et je vérifie les tendons"], 3, "On les retire dès la fin du travail, puis on vérifie que les tendons sont froids et sans gonflement."),
    Q("À quoi sert la sous-bande ?", ["À décorer", "À répartir la pression sur le tendon", "À tenir chaud", "À remplacer la bande"], 1, "La sous-bande protège le tendon de la pression de la bande.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-02 — LES SOINS PÉRIODIQUES   (programme FFE Galop 9 : vaccinations, vermifugation, soins dentaires,
   bilan sanitaire, points de contrôle quotidiens au box, au pré, au pansage, avant et après le travail)
   — À VÉRIFIER par Blandine : « Bilan sanitaire d'élevage » (BSE) ; règles vaccinales FFE de la saison
   --------------------------------------------------------------------------------- */
{ id: "g9n-02", icone: "💉", type: { fr: "soins" }, duree: { fr: "11 min" }, titre: { fr: "Les soins périodiques" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_VERMIFUGE.jpg", couv: {} },

    B("Les vaccinations", [
      P("Au Galop 9, tu organises les soins qui reviennent régulièrement : vaccins, vermifuges, dents, pieds, et la surveillance de chaque jour. Ces soins préviennent la plupart des problèmes de santé."),
      S("💉 Les vaccins du cheval de compétition", "Les règles changent : vérifie chaque saison le règlement général de la FFE.", [
        { gras: "La grippe équine :", texte: "obligatoire pour toute compétition et tout rassemblement de chevaux." },
        { gras: "La rhinopneumonie :", texte: "obligatoire en compétition Amateur et Pro, en même temps que la grippe." },
        { gras: "Le tétanos :", texte: "pas obligatoire en compétition, mais vivement conseillé pour tous les chevaux." }
      ]),
      S("📅 Le calendrier", null, [
        "La primo-vaccination : deux injections à 21 à 92 jours d'intervalle, puis un premier rappel 4 à 6 mois plus tard (120 à 180 jours ; protocole 2026).",
        "Ensuite, un rappel chaque année, sans jamais dépasser le délai : sinon, tout est à recommencer.",
        "Aucune injection dans les 7 jours qui précèdent une compétition.",
        "Chaque vaccin est noté par le vétérinaire dans le livret du cheval et enregistré en ligne."
      ]),
      E("💡", "Le savais-tu ?", "Un retard de quelques jours sur un rappel suffit pour qu'un cheval ne puisse plus concourir : c'est l'une des causes les plus fréquentes de refus aux contrôles des papiers en concours.")
    ]),

    B("Vermifuges, dents, pieds et bilan sanitaire", [
      S("🪱 La vermifugation", null, [
        "On ne vermifuge plus « tous les deux mois par habitude » : les vers deviennent résistants aux produits.",
        "On fait d'abord analyser les crottins (coproscopie) pour savoir si le cheval en a besoin, et lequel.",
        "Le vétérinaire établit un plan pour l'écurie, selon l'âge des chevaux, le pré et la saison.",
        "Chaque traitement est noté : date, produit, cheval."
      ]),
      S("🦷 Les dents", null, [
        "Les dents du cheval poussent toute sa vie et s'usent en formant des pointes qui blessent les joues.",
        "Un contrôle au moins une fois par an, par un vétérinaire ou un technicien dentaire équin.",
        "Signes d'alerte : le cheval perd du grain, mâche de travers, maigrit, ou se défend contre le mors."
      ]),
      S("🦶 Les pieds", null, [
        "Parage ou ferrure environ toutes les 6 à 8 semaines, selon la pousse de la corne.",
        "Entre deux visites, surveille les fers qui bougent, les clous qui dépassent et la corne qui se fend."
      ]),
      S("🩺 Le bilan sanitaire d'élevage", null, [
        "Une visite du vétérinaire dans l'écurie, au moins une fois par an.",
        "Il fait le point sur la santé des chevaux, le logement, l'alimentation et les traitements, et propose un plan de prévention."
      ])
    ]),

    B("Les points de contrôle quotidiens", [
      S("🏠 Au box", null, [
        "L'eau : propre, et le cheval a bu.",
        "La nourriture : la ration d'hier est finie.",
        "Les crottins : nombre et aspect habituels.",
        "La litière : le cheval s'est-il couché, roulé, agité ?"
      ]),
      S("🌳 Au pré", null, [
        "Les clôtures, l'abreuvoir, l'herbe et les plantes toxiques.",
        "Le comportement : le cheval mange, se déplace normalement, n'est pas isolé du groupe."
      ]),
      S("🪮 Au pansage, avant et après le travail", null, [
        "Passe la main partout : chaleur, gonflement, plaie, zone sensible.",
        "Regarde les membres et les pieds avant de partir, et de nouveau en rentrant.",
        "Au travail, sois attentif à toute irrégularité des allures ou à un manque d'énergie inhabituel.",
        "Après la séance, vérifie que le souffle redevient calme et que les membres sont froids."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Garde un carnet de soins pour chaque cheval : vaccins, vermifuges, dents, pieds. Une page par cheval, et tu sais en un coup d'œil ce qui arrive à échéance.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Laisser passer la date d'un rappel de vaccin.",
        "Faire vacciner son cheval la veille d'un concours.",
        "Vermifuger tous les chevaux toujours avec le même produit, sans analyse.",
        "Attendre que le cheval maigrisse pour faire contrôler ses dents."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais organiser les soins.", [
        "Retrouve sur le livret d'un cheval la date de ses derniers vaccins et calcule la date limite du prochain rappel.",
        "Prépare le calendrier des soins d'un cheval pour l'année : vaccins, dents, pieds, analyses.",
        "Fais le tour du box et du pré, puis dis ce que tu as contrôlé."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qu'est-ce qu'une coproscopie ?",
        "Quels vaccins faut-il pour concourir en Amateur ?",
        "Combien de fois par an faire contrôler les dents ?",
        "Que se passe-t-il si un rappel est en retard ?",
        "Qu'est-ce que le bilan sanitaire d'élevage ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Vaccins : grippe et rhinopneumonie en Amateur et Pro, rappels à l'heure.",
        "Pas de vaccin dans les 7 jours avant un concours.",
        "Vermifuge après analyse des crottins.",
        "Dents une fois par an, pieds toutes les 6 à 8 semaines.",
        "Chaque jour : box, pré, pansage, avant et après le travail."
      ]),
      E("", "", "La prévention ne se voit pas, et c'est justement pour ça qu'elle marche.")
    ])
  ],
  lexique: { fr: [
    ["Primo-vaccination", "Première série d'injections d'un vaccin, avant les rappels."],
    ["Rappel", "Injection qui entretient la protection d'un vaccin."],
    ["Rhinopneumonie", "Maladie virale du cheval, contre laquelle la vaccination est obligatoire en compétition Amateur et Pro."],
    ["Coproscopie", "Analyse des crottins qui compte les œufs de vers."],
    ["Parage", "Taille de la corne du sabot par le maréchal-ferrant."],
    ["Bilan sanitaire d'élevage", "Visite annuelle du vétérinaire qui fait le point sur la santé des chevaux de l'écurie."]
  ] },
  quiz: [
    Q("Quel vaccin est obligatoire pour toute compétition ?", ["La grippe équine", "La rage", "La gourme", "Aucun"], 0, "La grippe équine est obligatoire pour toute compétition et tout rassemblement de chevaux."),
    Q("Quel vaccin s'ajoute à la grippe en compétition Amateur et Pro ?", ["Le tétanos", "La rage", "La rhinopneumonie", "La piroplasmose"], 2, "La rhinopneumonie est obligatoire en Amateur et Pro, en même temps que la grippe."),
    Q("Combien de jours avant un concours ne doit-on plus vacciner ?", ["7 jours", "1 jour", "3 jours", "30 jours"], 0, "Aucune injection dans les 7 jours qui précèdent une compétition."),
    Q("Qu'est-ce qu'une coproscopie ?", ["Une prise de sang", "Une radio des pieds", "Un contrôle des dents", "Une analyse des crottins"], 3, "La coproscopie compte les œufs de vers dans les crottins, pour savoir s'il faut vermifuger."),
    Q("Pourquoi ne vermifuge-t-on plus systématiquement ?", ["Parce que c'est interdit", "Parce que les vers deviennent résistants aux produits", "Parce que les vermifuges sont trop chers", "Parce que les chevaux n'ont plus de vers"], 1, "Les traitements répétés sans analyse rendent les vers résistants."),
    Q("Quel signe peut indiquer un problème de dents ?", ["Le cheval perd du grain et mâche de travers", "Le cheval hennit", "Le poil brille", "Le cheval galope vite"], 0, "Perte de grain, mastication de travers, amaigrissement ou défenses contre le mors doivent alerter."),
    Q("À quelle fréquence contrôle-t-on les dents ?", ["Tous les mois", "Tous les 5 ans", "Jamais si le cheval mange", "Au moins une fois par an"], 3, "Les dents poussent toute la vie : un contrôle au moins une fois par an."),
    Q("Que fait le vétérinaire lors du bilan sanitaire d'élevage ?", ["Il fait le point sur la santé, le logement, l'alimentation et les traitements", "Il ferre les chevaux", "Il délivre les Galops", "Il juge les reprises"], 0, "C'est une visite annuelle qui débouche sur un plan de prévention."),
    Q("Tous les combien parer ou ferrer un cheval ?", ["Toutes les 2 semaines", "Tous les 6 mois", "Une fois par an", "Environ toutes les 6 à 8 semaines"], 3, "Environ toutes les 6 à 8 semaines, selon la pousse de la corne."),
    Q("Au box, que contrôles-tu chaque matin ?", ["La couleur de la porte", "L'eau, la ration finie, les crottins et la litière", "Seulement la litière", "Rien si le cheval hennit"], 1, "Eau, ration, crottins et litière disent beaucoup de la santé du cheval.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-03 — LA PHARMACIE ÉQUINE   (programme FFE Galop 9 : composer une pharmacie / trousse de secours)
   --------------------------------------------------------------------------------- */
{ id: "g9n-03", icone: "🧰", type: { fr: "soins" }, duree: { fr: "9 min" }, titre: { fr: "La pharmacie équine" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_PLAIE.jpg", couv: {} },

    B("Composer la pharmacie", [
      P("Au Galop 9, tu sais composer la pharmacie de l'écurie : une trousse prête pour les petits soins et pour attendre le vétérinaire dans de bonnes conditions."),
      S("🌡️ Pour observer", null, [
        "Un thermomètre (et de la vaseline), pour prendre la température.",
        "Un stéthoscope, pour écouter le cœur et compter le pouls.",
        "Une lampe de poche.",
        "Une montre ou un téléphone, pour compter les pulsations et les respirations."
      ]),
      S("🩹 Pour les plaies", null, [
        "Du sérum physiologique et des compresses stériles.",
        "Un antiseptique pour cheval, à diluer selon sa notice.",
        "Des ciseaux à bouts ronds, une pince, des gants à usage unique.",
        "Des seringues sans aiguille, pour rincer une plaie.",
        "Du coton, des bandes, un pansement adhésif élastique."
      ]),
      S("❄️ Pour les membres", null, [
        "Des bandes de repos et des cotons.",
        "Une poche de froid ou des guêtres réfrigérantes.",
        "De l'argile, si ton vétérinaire te la conseille."
      ]),
      E("💡", "Le savais-tu ?", "Une trousse de secours n'est utile que si tout le monde sait où elle est. Range-la toujours au même endroit, et affiche à côté le numéro du vétérinaire.")
    ]),

    B("Les médicaments", [
      S("💊 Les règles", null, [
        "Les médicaments sont prescrits par le vétérinaire, pour un cheval donné, avec une ordonnance.",
        "On ne donne jamais à un cheval un médicament prescrit pour un autre.",
        "On respecte la dose, la durée et le mode d'administration indiqués.",
        "Chaque traitement est noté dans le registre d'élevage de l'écurie, avec l'ordonnance."
      ]),
      S("🗄️ La conservation", null, [
        "À l'abri de la chaleur, de la lumière et de l'humidité, ou au réfrigérateur si la notice le demande.",
        "Hors de portée des enfants et des animaux.",
        "Les flacons entamés sont datés à l'ouverture.",
        "On vérifie régulièrement les dates de péremption, et on rapporte les produits périmés au vétérinaire ou à la pharmacie."
      ]),
      E("⚠️", "Attention", "Certains médicaments sont interdits en compétition. Avant de partir en concours, demande toujours au vétérinaire si un traitement en cours est compatible.")
    ]),

    B("Entretenir la pharmacie", [
      S("🔁 La routine", null, [
        "Après chaque utilisation, remplace ce qui a servi.",
        "Une fois par mois, fais l'inventaire et vérifie les dates.",
        "Garde une petite trousse dans le camion pour les déplacements et les concours."
      ]),
      S("📋 Dans la trousse, aussi", null, [
        "Le numéro du vétérinaire et celui du vétérinaire de garde.",
        "Une fiche avec les valeurs normales de chaque cheval au repos : température, pouls, respiration.",
        "Un cure-pied et un couteau à usages multiples."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Fais l'inventaire de la pharmacie avec quelqu'un d'autre de l'écurie : le jour où il faut faire vite, chacun saura où est chaque chose.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Garder des médicaments sans étiquette ni ordonnance.",
        "Utiliser un produit périmé.",
        "Oublier de remplacer ce qui a servi.",
        "Traiter un cheval soi-même sans l'avis du vétérinaire."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais tenir une pharmacie.", [
        "Fais l'inventaire de la pharmacie de ton écurie et liste ce qui manque.",
        "Range les produits par usage : observer, plaies, membres, médicaments.",
        "Prépare une petite trousse pour le camion."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Que mettre dans une trousse de secours pour le camion ?",
        "Comment prendre la température d'un cheval ?",
        "Comment conserver un médicament entamé ?",
        "Pourquoi noter les traitements dans le registre d'élevage ?",
        "Que faire des médicaments périmés ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Observer, nettoyer, protéger, refroidir.",
        "Médicaments : ordonnance, un cheval, la bonne dose.",
        "Tout traitement noté dans le registre.",
        "Inventaire chaque mois.",
        "Numéro du vétérinaire affiché."
      ]),
      E("", "", "Une pharmacie bien tenue, c'est du temps gagné le jour où chaque minute compte.")
    ])
  ],
  lexique: { fr: [
    ["Pharmacie équine", "Ensemble du matériel et des produits de soin d'une écurie."],
    ["Stéthoscope", "Instrument qui permet d'écouter le cœur et la respiration."],
    ["Ordonnance", "Document du vétérinaire qui indique le traitement, la dose et la durée."],
    ["Registre d'élevage", "Registre obligatoire de l'écurie où sont notés notamment les traitements des chevaux."],
    ["Péremption", "Date après laquelle un produit ne doit plus être utilisé."]
  ] },
  quiz: [
    Q("Quel instrument sert à écouter le cœur ?", ["Le thermomètre", "Le stéthoscope", "La seringue", "La lampe"], 1, "Le stéthoscope permet d'écouter le cœur et de compter le pouls."),
    Q("Avec quoi rinces-tu une plaie ?", ["De l'alcool", "Du sérum physiologique", "De l'eau oxygénée pure", "Du vinaigre"], 1, "Le sérum physiologique est doux et stérile, idéal pour rincer une plaie."),
    Q("Avant un concours, que demandes-tu au vétérinaire si ton cheval est traité ?", ["Le prix du traitement", "La couleur du flacon", "Rien", "Si le traitement est compatible avec la compétition"], 3, "Certains médicaments sont interdits en compétition : on vérifie toujours avant de partir."),
    Q("Peux-tu donner à ton cheval le médicament prescrit pour un autre ?", ["Non, jamais", "Oui, s'il a les mêmes symptômes", "Oui, à moitié dose", "Oui, si c'est le même âge"], 0, "Un médicament est prescrit pour un cheval donné : on ne le donne jamais à un autre."),
    Q("Où note-t-on chaque traitement ?", ["Dans le registre d'élevage, avec l'ordonnance", "Sur le tableau des leçons", "Nulle part", "Sur la porte du box"], 0, "Le registre d'élevage est obligatoire et garde la trace de chaque traitement."),
    Q("Un flacon est entamé. Que fais-tu ?", ["Rien", "Je note la date d'ouverture dessus", "Je le jette tout de suite", "Je le mélange avec un autre"], 1, "On date les flacons entamés pour savoir combien de temps ils restent utilisables."),
    Q("Que fais-tu des médicaments périmés ?", ["Je les rapporte au vétérinaire ou à la pharmacie", "Je les utilise quand même", "Je les jette à la poubelle", "Je les donne au pré"], 0, "Les médicaments périmés se rapportent au vétérinaire ou en pharmacie."),
    Q("À quelle fréquence fais-tu l'inventaire ?", ["Une fois par an", "Jamais", "Seulement avant un concours", "Une fois par mois, et après chaque utilisation"], 3, "On remplace après chaque utilisation et on fait l'inventaire une fois par mois."),
    Q("Où gardes-tu une petite trousse pour les concours ?", ["Dans le camion", "À la maison", "Au club-house", "Nulle part"], 0, "Une petite trousse dans le camion sert pour les déplacements et les concours."),
    Q("Que garder affiché près de la pharmacie ?", ["Le numéro du vétérinaire", "Le planning des cours", "Le prix des aliments", "Les résultats de concours"], 0, "Le numéro du vétérinaire (et celui de garde) doit être visible de tous.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-04 — LONGUES RÊNES : TRANSITIONS, AMPLITUDE ET CAVALETTI   (programme FFE Galop 9, pratique à pied :
   transitions et variations d'amplitude aux longues rênes ; cavaletti aux longues rênes)
   — 07/11 : cours nouveau (le plan prévu en avait un seul pour les longues rênes)
   --------------------------------------------------------------------------------- */
{ id: "g9n-04", icone: "🪢", type: { fr: "à pied" }, duree: { fr: "10 min" }, titre: { fr: "Longues rênes : transitions, amplitude et cavaletti" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c06-travail-pied.webp", couv: {} },

    B("Transitions et amplitude aux longues rênes", [
      P("Au Galop 8, tu as travaillé ton cheval aux longues rênes sur les courbes, aux trois allures. Au Galop 9, tu lui demandes des transitions précises, tu fais varier l'amplitude de ses foulées, et tu le fais passer sur des cavaletti."),
      S("🔁 Les transitions", null, [
        "Demande-les d'abord à la voix, avec les mots habituels du travail à pied.",
        "Ensuite seulement, ajoute un contact léger et progressif des deux rênes pour ralentir.",
        "Garde l'impulsion : dans une transition descendante, le cheval continue à pousser avec ses postérieurs.",
        "Garde la trajectoire : le cheval reste sur sa ligne pendant la transition."
      ]),
      S("↔️ Faire varier l'amplitude", null, [
        "Pour allonger, soutiens l'impulsion par la voix ou la chambrière, et laisse l'encolure s'étendre en rendant un peu.",
        "Pour raccourcir, demande de ralentir le mouvement par la voix et un léger contact, sans laisser tomber l'énergie.",
        "La cadence reste la même : la foulée change de longueur, pas de rythme."
      ]),
      E("💡", "Le savais-tu ?", "Aux longues rênes, tu vois les postérieurs de ton cheval : c'est le moment idéal pour apprendre à reconnaître un cheval qui s'engage vraiment sous lui.")
    ]),

    B("Les cavaletti aux longues rênes", [
      S("🏗️ L'installation", null, [
        "Des cavaletti, ou des barres au sol bien calées, sur une ligne droite ou un grand cercle.",
        "Les distances dépendent de l'allure et du cheval. Repères courants pour un cheval : environ 0,80 à 1 m au pas, environ 1,30 à 1,50 m au trot. Ton enseignant les ajuste à ton cheval.",
        "On commence par une seule barre, puis trois, puis quatre à six."
      ]),
      S("🧭 Les principes", null, [
        { gras: "Respecter les distances :", texte: "si le cheval touche ou se désunit, on règle les barres plutôt que de le pousser." },
        { gras: "Observer et anticiper :", texte: "regarde le cheval quelques foulées avant les barres pour préparer l'abord." },
        { gras: "Une seule information à la fois :", texte: "pendant le passage des barres, tu ne demandes rien d'autre : pas de transition, pas de changement de trajectoire." },
        { gras: "Récompenser souvent :", texte: "par la voix, dès qu'un passage est réussi." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Sur les cavaletti, laisse les rênes souples : ton cheval a besoin de baisser l'encolure et de regarder où il met ses pieds. C'est en cherchant les barres qu'il assouplit son dos.")
    ]),

    B("Organiser la séance", [
      S("📋 Un exemple de séance", null, [
        "Détente au pas puis au trot, aux deux mains.",
        "Transitions pas-trot et trot-pas sur le cercle, à la voix d'abord.",
        "Quelques variations d'amplitude au trot sur la ligne droite.",
        "Passages sur les cavaletti au pas, puis au trot, aux deux mains.",
        "Retour au calme au pas, rênes longues."
      ]),
      S("🔍 Ce que tu observes", null, [
        "Le cheval garde-t-il le même rythme avant, pendant et après les barres ?",
        "S'arrondit-il, encolure basse, sur les cavaletti ?",
        "Ses postérieurs s'engagent-ils davantage ?"
      ]),
      E("🔭", "Pour aller plus loin", "Les cavaletti peuvent aussi être surélevés pour travailler davantage la flexion des articulations. Ce travail plus intense se dose avec ton enseignant.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Demander une transition en tirant sur les rênes avant d'avoir parlé.",
        "Laisser le cheval accélérer pour allonger.",
        "Pousser un cheval qui touche les barres au lieu de régler les distances.",
        "Enchaîner trop de passages : les cavaletti fatiguent vite."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises ces exercices.", [
        "Enchaîne des transitions pas-trot-pas aux longues rênes, à la voix puis avec un léger contact.",
        "Fais allonger puis raccourcir le trot en gardant la cadence.",
        "Installe quatre cavaletti au trot et fais-les passer aux deux mains."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle distance entre des cavaletti au trot ?",
        "Pourquoi demander les transitions à la voix d'abord ?",
        "Comment savoir si mon cheval s'engage ?",
        "Combien de passages sur les cavaletti par séance ?",
        "Que faire si mon cheval saute les barres ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Transitions : la voix d'abord, le contact ensuite.",
        "Impulsion et trajectoire gardées.",
        "Amplitude qui change, cadence qui reste.",
        "Cavaletti : distances justes, une information à la fois.",
        "Récompenser souvent."
      ]),
      E("", "", "Aux longues rênes, moins tu en fais, mieux ton cheval t'écoute.")
    ])
  ],
  lexique: { fr: [
    ["Cavaletti", "Barres posées sur de petits supports, utilisées pour assouplir et rythmer le cheval."],
    ["Amplitude", "Longueur de la foulée."],
    ["Impulsion", "Énergie que le cheval produit avec ses postérieurs pour se porter en avant."],
    ["Transition", "Passage d'une allure à une autre, ou changement d'amplitude dans une allure."],
    ["Chambrière", "Long fouet du travail à pied, qui soutient l'impulsion."]
  ] },
  quiz: [
    Q("Comment demandes-tu d'abord une transition aux longues rênes ?", ["En tirant sur les rênes", "Avec la chambrière uniquement", "À la voix", "En t'arrêtant"], 2, "On demande d'abord à la voix, puis on ajoute un contact léger et progressif."),
    Q("Quel est un repère courant de distance entre cavaletti au pas pour un cheval ?", ["Environ 0,80 à 1 m", "Environ 3 m", "Environ 0,30 m", "Environ 2 m"], 0, "Environ 0,80 à 1 m au pas, à ajuster au cheval."),
    Q("Dans une transition descendante, que doit garder le cheval ?", ["Sa vitesse", "Son impulsion et sa trajectoire", "La tête haute", "Le contre-galop"], 1, "Il continue à pousser avec ses postérieurs et reste sur sa ligne."),
    Q("Par combien de barres commences-tu ?", ["Six d'un coup", "Une seule", "Dix", "Aucune"], 1, "On commence par une barre, puis trois, puis quatre à six."),
    Q("Quand le cheval allonge, la cadence…", ["Accélère", "Reste la même", "Ralentit beaucoup", "Disparaît"], 1, "La foulée s'allonge, la cadence reste la même."),
    Q("Quel est un repère courant de distance entre cavaletti au trot pour un cheval ?", ["Environ 0,50 m", "Environ 3 m", "Environ 5 m", "Environ 1,30 à 1,50 m"], 3, "Environ 1,30 à 1,50 m au trot, à ajuster au cheval avec ton enseignant."),
    Q("Pendant le passage des cavaletti, que demandes-tu en plus ?", ["Rien : une seule information à la fois", "Une transition", "Un changement de direction", "Un arrêt"], 0, "Sur les barres, on ne demande rien d'autre : une seule information à la fois."),
    Q("Ton cheval touche toutes les barres. Que fais-tu ?", ["Je le pousse plus fort", "J'ajoute des barres", "Je règle les distances", "Je relève les barres très haut"], 2, "On ajuste les distances au cheval plutôt que de le pousser."),
    Q("Comment tiens-tu les rênes sur les cavaletti ?", ["Très courtes", "Souples, pour qu'il baisse l'encolure", "Tendues vers le haut", "Lâchées complètement"], 1, "Rênes souples : le cheval baisse l'encolure, regarde les barres et assouplit son dos."),
    Q("Que fais-tu après un passage réussi ?", ["Je recommence dix fois", "Je l'ignore", "Je monte les barres", "Je le récompense par la voix"], 3, "Récompenser souvent aide le cheval à comprendre ce qui est attendu.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-05 — LONGUES RÊNES : LATÉRAUX ET AUTOUR DES HANCHES   (programme FFE Galop 9, pratique à pied :
   déplacements latéraux aux trois allures aux longues rênes ; travail autour des hanches : demi-pirouette et appuyer)
   — À VÉRIFIER par Blandine : placement du longeur dans les latéraux
   --------------------------------------------------------------------------------- */
{ id: "g9n-05", icone: "↔️", type: { fr: "à pied" }, duree: { fr: "10 min" }, titre: { fr: "Longues rênes : latéral et autour des hanches" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-th-vie2.webp", couv: {} },

    B("Les déplacements latéraux aux longues rênes", [
      P("Au Galop 9, tu fais travailler ton cheval aux longues rênes en déplacements latéraux, aux trois allures, et autour de ses hanches. C'est le travail à pied le plus fin du programme des Galops."),
      S("📍 Ta place", null, [
        "Tu te places en arrière du cheval, légèrement décalé du côté opposé au déplacement, à l'extérieur : c'est de là que tu le pousses de côté.",
        "Tu restes à une distance de sécurité, hors de portée des postérieurs.",
        "Tes deux rênes gardent un contact léger et égal."
      ]),
      S("↗️ Comment faire", null, [
        "Pars d'un cheval en avant, droit, sur la ligne droite.",
        "La rêne du côté du déplacement indique la direction ; l'autre rêne, contre le flanc, pousse les hanches de côté.",
        "Commence par quelques foulées au pas, puis au trot ; le galop vient en dernier, seulement si le cheval est bien en avant.",
        "Entre deux déplacements, repars droit, en avant, pour reprendre l'impulsion."
      ]),
      E("💡", "Le savais-tu ?", "Les écuyers du Cadre Noir présentent encore aujourd'hui des reprises entières aux longues rênes, jusqu'aux airs de haute école : la preuve que ce travail peut aller très loin.")
    ]),

    B("Le travail autour des hanches", [
      S("🔄 La demi-pirouette au pas", "Le cheval tourne ses épaules autour de ses hanches.", [
        "Prépare au pas, sur la ligne droite, avec un léger pli du côté où il va tourner.",
        "La rêne intérieure conduit les épaules dans le tournant ; la rêne extérieure, contre le flanc, empêche les hanches de s'échapper.",
        "Le postérieur intérieur marque le pas presque sur place, sans s'arrêter.",
        "À la fin du demi-tour, repars aussitôt droit, en avant."
      ]),
      S("↗️ L'appuyer", null, [
        "Le cheval se déplace en avant et de côté, incurvé du côté où il va.",
        "Demande un angle peu prononcé : il doit garder la cadence et l'activité de ses postérieurs.",
        "Quelques foulées suffisent, puis repars droit."
      ]),
      E("⚠️", "La sécurité", "Dans le travail autour des hanches, les postérieurs du cheval passent près de toi. Reste toujours hors de leur portée, et ne te place jamais juste derrière un cheval qui pourrait reculer brusquement.")
    ]),

    B("Construire la progression", [
      S("📈 Étape par étape", null, [
        "D'abord des latéraux au pas, sur quelques foulées, le long du mur.",
        "Puis au trot, quand le cheval reste en avant au pas.",
        "La demi-pirouette au pas vient quand le cheval accepte bien la rêne extérieure contre son flanc.",
        "Le galop dans les latéraux arrive en dernier."
      ]),
      S("🎯 Ce que tu cherches", null, [
        "Un cheval qui garde la même cadence qu'en ligne droite.",
        "Des postérieurs actifs, qui croisent sans traîner.",
        "Un cheval calme, qui repart en avant dès que tu le demandes."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Si ton cheval s'arrête ou recule dans un déplacement latéral, n'insiste pas : repars en avant, droit, et redemande un angle plus faible. L'impulsion passe toujours avant l'angle.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Demander un angle trop fort : le cheval perd sa cadence et ses postérieurs traînent.",
        "Enchaîner les latéraux sans repartir en avant entre eux.",
        "Te placer à portée des postérieurs.",
        "Laisser les hanches s'échapper dans la demi-pirouette."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises ce travail.", [
        "Fais quelques foulées de déplacement latéral au pas puis au trot, à chaque main, en reprenant l'impulsion entre chaque.",
        "Fais une demi-pirouette au pas aux longues rênes, à chaque main.",
        "Enchaîne quelques foulées d'appuyer, avec un angle peu prononcé."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Où me placer pour un déplacement latéral aux longues rênes ?",
        "Comment demander une demi-pirouette au pas à pied ?",
        "Que faire si mon cheval recule ?",
        "Pourquoi garder un angle peu prononcé ?",
        "Comment le Cadre Noir travaille-t-il aux longues rênes ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Toi en arrière, à l'extérieur, hors de portée.",
        "Quelques foulées, puis droit et en avant.",
        "Demi-pirouette : les épaules autour des hanches.",
        "Angle peu prononcé, cadence gardée.",
        "L'impulsion avant l'angle."
      ]),
      E("", "", "Aux longues rênes, un déplacement latéral réussi, c'est un cheval qui t'écoute sans que tu sois sur son dos.")
    ])
  ],
  lexique: { fr: [
    ["Déplacement latéral", "Mouvement où le cheval avance en se déplaçant de côté."],
    ["Demi-pirouette au pas", "Demi-tour du cheval, les épaules tournant autour des hanches."],
    ["Appuyer", "Déplacement latéral où le cheval est incurvé vers le côté où il va."],
    ["Angle", "Écart entre la direction du cheval et la ligne qu'il suit, dans un latéral."],
    ["Longues rênes", "Deux rênes longues qui permettent de travailler un cheval à pied, en le dirigeant."]
  ] },
  quiz: [
    Q("Dans un déplacement latéral aux longues rênes, où te places-tu ?", ["Devant le cheval", "Juste derrière, collé aux postérieurs", "En arrière, légèrement à l'extérieur, hors de portée", "Au centre d'un cercle"], 2, "En arrière, légèrement du côté opposé au déplacement, à distance de sécurité."),
    Q("Que fais-tu entre deux déplacements latéraux ?", ["Je m'arrête longtemps", "J'enchaîne tout de suite", "Je repars droit, en avant, pour reprendre l'impulsion", "Je recule"], 2, "On reprend l'impulsion en repartant droit, en avant."),
    Q("Dans la demi-pirouette au pas, qu'est-ce qui tourne autour de quoi ?", ["Les épaules autour des hanches", "Les hanches autour des épaules", "La tête autour de la queue", "Rien ne tourne"], 0, "Les épaules tournent autour des hanches ; le postérieur intérieur marque le pas presque sur place."),
    Q("Quel rôle a la rêne extérieure dans la demi-pirouette ?", ["Elle tire la tête vers l'extérieur", "Elle empêche les hanches de s'échapper", "Elle fait reculer", "Aucun"], 1, "Contre le flanc, elle empêche les hanches de s'échapper."),
    Q("Quel angle demandes-tu dans l'appuyer aux longues rênes ?", ["Peu prononcé", "Le plus fort possible", "90 degrés", "Aucun, le cheval reste droit"], 0, "Un angle peu prononcé, pour garder la cadence et l'activité des postérieurs."),
    Q("Quand demandes-tu la demi-pirouette au pas ?", ["Quand le cheval accepte bien la rêne extérieure contre son flanc", "Dès la première séance", "Au galop d'abord", "Jamais aux longues rênes"], 0, "Elle vient quand le cheval accepte bien la rêne extérieure contre son flanc."),
    Q("Par quelle allure commences-tu les latéraux ?", ["Le galop", "Le trot", "L'arrêt", "Le pas"], 3, "On commence au pas, puis au trot ; le galop vient en dernier."),
    Q("Que fais-tu à la fin d'une demi-pirouette ?", ["Je m'arrête", "Je recule", "Je repars aussitôt droit, en avant", "Je fais une autre demi-pirouette"], 2, "On repart tout de suite droit, en avant, pour garder l'impulsion."),
    Q("Ton cheval recule dans un latéral. Que fais-tu ?", ["Je repars en avant et je redemande un angle plus faible", "J'insiste", "J'augmente l'angle", "Je passe au galop"], 0, "L'impulsion passe avant l'angle : on repart en avant et on simplifie."),
    Q("Quelle est la règle de sécurité principale ?", ["Travailler sans casque", "Enrouler les rênes autour des mains", "Se placer juste derrière le cheval", "Rester hors de portée des postérieurs"], 3, "Les postérieurs passent près de toi : reste toujours hors de leur portée.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g9n-06 — LE BIEN-ÊTRE DU CHEVAL   (programme FFE Galop 9, connaissance du cheval : les 8 mesures de la Charte nationale pour le bien-être équin)
   — ancien titre du sommaire : « Éthologie et bien-être » ; le programme parle de la charte : titre recentré, À CONFIRMER par Blandine
   Source : Charte nationale pour le bien-être équin (filière cheval, 2016)
   --------------------------------------------------------------------------------- */
{ id: "g9n-06", icone: "🧠", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "La charte du bien-être équin" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_PORTRAIT.jpg", couv: {} },

    B("La charte nationale", [
      P("Au Galop 9, tu dois connaître les 8 mesures de la Charte nationale pour le bien-être équin. Cette charte a été écrite en 2016 par toute la filière cheval : éleveurs, vétérinaires, Fédération française d'équitation, courses. Elle dit ce dont un cheval a besoin pour bien vivre, de sa naissance à sa mort."),
      S("🐴 Le bien-être, c'est quoi ?", null, [
        "Un cheval en bonne santé, sans douleur.",
        "Un cheval qui mange, boit et se repose selon ses besoins.",
        "Un cheval qui peut se comporter en cheval : vivre avec d'autres, bouger, brouter.",
        "Un cheval qui n'a pas peur de l'homme."
      ]),
      E("💡", "Le savais-tu ?", "Le cheval est un animal de troupeau et de mouvement : dans la nature, il passe la plus grande partie de sa journée à marcher en broutant, au milieu des siens.")
    ]),

    B("Les 8 mesures", [
      S("📜 Ce que dit la charte", "En résumé, les acteurs de la filière s'engagent à :", [
        { gras: "1. Respecter la vie en groupe :", texte: "favoriser les contacts sociaux positifs entre chevaux." },
        { gras: "2. Partager les bonnes pratiques :", texte: "définir ensemble les bonnes pratiques d'élevage, de détention et d'utilisation des chevaux." },
        { gras: "3. Prévenir ou soulager la douleur." },
        { gras: "4. Soigner toute la vie :", texte: "assurer les soins nécessaires tout au long de la vie, et une fin de vie dans des conditions décentes." },
        { gras: "5. Construire la confiance :", texte: "établir une relation de confiance dans les manipulations et les contacts avec l'homme." },
        { gras: "6. Nourrir et abreuver :", texte: "garantir assez d'eau et d'aliments, adaptés à ses besoins physiques et à son comportement." },
        { gras: "7. Un lieu de vie sûr :", texte: "aménager le lieu de vie pour éviter blessures et maladies." },
        { gras: "8. Un environnement adapté :", texte: "organiser le lieu de vie pour que le cheval puisse exprimer les comportements propres à son espèce." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour retenir les 8 mesures, pense à une journée de ton cheval : ses copains, ses soins, sa santé, sa relation avec toi, sa nourriture, son box, son pré. Tout y est.")
    ]),

    B("Dans ton écurie", [
      S("🔍 Ce que tu peux vérifier", null, [
        { gras: "La vie sociale :", texte: "le cheval voit, touche ou côtoie d'autres chevaux chaque jour." },
        { gras: "Le mouvement :", texte: "il sort chaque jour, au pré, au paddock ou au travail." },
        { gras: "L'alimentation :", texte: "du fourrage en quantité, réparti dans la journée, et de l'eau propre à volonté." },
        { gras: "Le lieu de vie :", texte: "un box assez grand, propre, aéré, sans objet qui blesse ; des clôtures sûres." },
        { gras: "La douleur :", texte: "tout signe de douleur est pris au sérieux et soigné." },
        { gras: "La relation :", texte: "des gestes calmes, constants, sans brutalité." }
      ]),
      S("👀 Les signes d'un cheval mal à l'aise", null, [
        "Des tics : il mord le bord de la mangeoire, se balance sans cesse, tourne en rond dans son box.",
        "Un cheval abattu, qui se tient au fond du box, tête basse.",
        "Un cheval agressif ou très craintif sans raison."
      ]),
      E("🔭", "Pour aller plus loin", "Les courses (France Galop, LeTrot) font contrôler chaque année le respect de la charte dans les écuries. Dans les centres équestres, des labels de la FFE en tiennent compte aussi.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Croire qu'un cheval seul au box, bien nourri et bien soigné, a tout ce qu'il lui faut.",
        "Laisser de longues heures sans fourrage entre deux repas.",
        "Prendre un tic pour un caprice, alors qu'il traduit souvent un mal-être.",
        "Punir un cheval qui a peur."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais la charte.", [
        "Cite les 8 mesures de la charte avec tes mots.",
        "Fais le tour de ton écurie et dis, pour chaque mesure, ce qui est déjà en place.",
        "Propose une amélioration simple pour un cheval de ton écurie."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qu'est-ce que la Charte pour le bien-être équin ?",
        "Pourquoi un cheval a-t-il des tics ?",
        "Combien d'heures par jour un cheval mange-t-il dans la nature ?",
        "Comment améliorer la vie d'un cheval au box ?",
        "Comment savoir si mon cheval a mal ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Une charte, 8 mesures, toute la filière.",
        "Vie en groupe, bonnes pratiques, douleur, soins.",
        "Confiance, eau et aliments, lieu sûr, environnement adapté.",
        "Un cheval doit pouvoir vivre en cheval."
      ]),
      E("", "", "Le bien-être de ton cheval se joue d'abord les jours où tu ne le montes pas.")
    ])
  ],
  lexique: { fr: [
    ["Bien-être", "État d'un animal en bonne santé, sans douleur, qui peut satisfaire ses besoins et exprimer son comportement naturel."],
    ["Grégaire", "Qui vit en groupe ; le cheval est un animal grégaire."],
    ["Tic", "Comportement répété et sans but apparent, souvent signe de mal-être."],
    ["Filière cheval", "Ensemble des professionnels du cheval : éleveurs, sport, courses, vétérinaires."],
    ["Fourrage", "Foin, paille ou herbe : la base de l'alimentation du cheval."]
  ] },
  quiz: [
    Q("Combien de mesures compte la Charte nationale pour le bien-être équin ?", ["4", "6", "12", "8"], 3, "La charte compte 8 mesures."),
    Q("Qui a écrit la charte ?", ["Une seule écurie", "Toute la filière cheval", "Les cavaliers olympiques", "L'Union européenne"], 1, "Éleveurs, vétérinaires, FFE et courses l'ont élaborée ensemble."),
    Q("La première mesure demande de respecter…", ["Le caractère grégaire du cheval", "Son pedigree", "Ses résultats", "Ses horaires"], 0, "Le cheval vit en groupe : il a besoin de contacts sociaux positifs."),
    Q("Que garantit la sixième mesure ?", ["Assez d'eau et d'aliments, adaptés aux besoins du cheval", "Un concours par mois", "Un box individuel", "Une couverture"], 0, "Elle demande de garantir eau et aliments, adaptés aux besoins physiques et au comportement."),
    Q("Que dit la charte sur la douleur ?", ["Qu'elle est normale au travail", "Qu'il faut la prévenir ou la soulager", "Qu'il ne faut pas en parler", "Rien"], 1, "Une mesure entière est consacrée à prévenir ou soulager la douleur."),
    Q("En quelle année la charte a-t-elle été écrite ?", ["1921", "2016", "1987", "2024"], 1, "La Charte nationale pour le bien-être équin a été écrite en 2016 par la filière cheval."),
    Q("Quelle mesure concerne la relation avec l'homme ?", ["Monter tous les jours", "Ne jamais toucher le cheval", "Le récompenser avec du sucre", "Établir une relation de confiance"], 3, "La charte demande d'établir une relation de confiance dans les manipulations."),
    Q("Un cheval mord sans cesse le bord de sa mangeoire. C'est souvent…", ["Un tic, signe possible de mal-être", "Un jeu sans importance", "Un signe de bonne santé", "De la gourmandise"], 0, "Les tics traduisent souvent un mal-être : ennui, isolement, manque de fourrage."),
    Q("Quelle situation respecte le mieux le bien-être ?", ["Un cheval qui sort chaque jour et voit d'autres chevaux", "Un cheval seul au box toute la journée", "Un cheval nourri deux fois par jour sans foin", "Un cheval toujours attaché"], 0, "Mouvement et contacts sociaux font partie des besoins essentiels du cheval."),
    Q("La charte couvre la vie du cheval…", ["De sa naissance à sa mort", "Seulement pendant sa carrière sportive", "Seulement au pré", "Seulement en compétition"], 0, "Elle demande des soins tout au long de la vie, et une fin de vie décente.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-07 — LA CONDITION PHYSIQUE : PHYSIOLOGIE ET TECHNIQUES   (programme FFE Galop 9 : alternance des types de travail,
   étirements, abaissement de l'encolure et ses limites)
   --------------------------------------------------------------------------------- */
{ id: "g9n-07", icone: "❤️", type: { fr: "théorie" }, duree: { fr: "11 min" }, titre: { fr: "La condition physique : physiologie et techniques" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-th-vie.webp", couv: {} },

    B("Comment le corps du cheval travaille", [
      P("Au Galop 8, tu as appris à améliorer et entretenir la condition physique de ton cheval. Au Galop 9, tu comprends ce qui se passe dans son corps pendant l'effort, et tu choisis tes techniques en conséquence."),
      S("❤️ Le cœur et le souffle", null, [
        "Pendant l'effort, le cœur bat plus vite et la respiration s'accélère, pour apporter plus d'oxygène aux muscles.",
        "Un cheval entraîné fait le même effort avec un cœur plus lent, et revient plus vite au calme.",
        "C'est pour ça que la récupération est un bon indicateur de forme."
      ]),
      S("💪 Deux façons de produire de l'énergie", null, [
        { gras: "L'effort long et modéré :", texte: "le muscle utilise l'oxygène. Le cheval peut le tenir longtemps : c'est le travail de fond, au pas, au trot, au galop calme." },
        { gras: "L'effort court et intense :", texte: "le muscle travaille sans assez d'oxygène et se fatigue vite. C'est l'effort d'un parcours, d'un galop rapide, d'une montée raide." },
        "Un bon entraînement développe les deux, en commençant toujours par le travail de fond."
      ]),
      E("💡", "Le savais-tu ?", "La rate du cheval stocke des globules rouges et les libère pendant l'effort : son sang devient plus riche en oxygène au moment où il en a besoin. Très peu d'animaux en sont capables à ce point.")
    ]),

    B("Alterner les types de travail", [
      S("🔁 Pourquoi alterner ?", null, [
        "Chaque type de travail sollicite le corps différemment : souffle, muscles, tendons, articulations.",
        "Alterner évite de fatiguer toujours les mêmes structures.",
        "Le cheval garde le moral et l'envie de travailler."
      ]),
      S("📅 Une semaine équilibrée", "Un exemple, à adapter à chaque cheval :", [
        "Du plat technique.",
        "Du travail de fond en extérieur, avec des montées.",
        "Du saut ou du travail sur barres.",
        "Une séance à pied : longe ou longues rênes.",
        "Un jour léger ou de détente, et du temps au pré."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Après une séance intense, la suivante est toujours plus légère. Ton cheval progresse pendant la récupération, pas pendant l'effort.")
    ]),

    B("Étirements et abaissement de l'encolure", [
      S("🧘 Les étirements", null, [
        "Ils se font à pied, de préférence après le travail, sur des muscles chauds.",
        "Exemples : le cheval suit une friandise vers son poitrail, vers ses antérieurs, vers son flanc ; tu étends doucement un antérieur vers l'avant.",
        "Toujours lentement, sans forcer, en gardant la position quelques secondes.",
        "Arrête dès que le cheval se crispe ou se défend."
      ]),
      S("⬇️ L'abaissement de l'encolure", "En selle ou à pied, le cheval étend son encolure vers l'avant et vers le bas.", [
        { gras: "Son effet :", texte: "il étire la ligne du dessus, de la nuque à la croupe ; le dos se soulève et se décontracte." },
        { gras: "Quand l'utiliser :", texte: "en détente, entre deux exercices, en fin de séance." },
        { gras: "Ses limites :", texte: "trop longtemps, ou trop bas, le cheval tombe sur ses épaules et surcharge son avant-main ; s'il s'encapuchonne, nez derrière la verticale, il ne s'étire plus. Avec un jeune cheval ou un cheval peu musclé, on le dose avec prudence." }
      ]),
      E("🔭", "Pour aller plus loin", "Le pouls et la fréquence respiratoire permettent de mesurer la récupération après l'effort : tu les découvres dans le cours qui leur est consacré.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Enchaîner plusieurs séances intenses de suite.",
        "Étirer un cheval à froid ou en forçant.",
        "Garder un cheval encolure très basse pendant toute la séance.",
        "Confondre un cheval rond et bas avec un cheval qui s'encapuchonne."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais construire l'entraînement.", [
        "Prépare la semaine de travail d'un cheval de concours en alternant les types de travail.",
        "Après une séance, fais trois étirements à pied et explique leur effet.",
        "En selle, montre un abaissement de l'encolure correct et explique ses limites."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Pourquoi alterner les types de travail ?",
        "Quels étirements faire avec mon cheval ?",
        "Combien de temps garder mon cheval encolure basse ?",
        "Quelle différence entre effort long et effort court ?",
        "Comment savoir si mon cheval récupère bien ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Effort long : oxygène, travail de fond.",
        "Effort court : intense, fatigue vite.",
        "Alterner pour ménager le corps.",
        "Étirements : après le travail, sans forcer.",
        "Encolure basse : utile, mais dosée."
      ]),
      E("", "", "Comprendre le corps de ton cheval, c'est le préparer sans jamais l'abîmer.")
    ])
  ],
  lexique: { fr: [
    ["Physiologie", "Étude du fonctionnement du corps."],
    ["Récupération", "Retour au calme du cœur, du souffle et des muscles après l'effort."],
    ["Travail de fond", "Effort long et modéré, au pas, au trot ou au galop calme."],
    ["Étirement", "Mouvement lent qui allonge un muscle."],
    ["Ligne du dessus", "Muscles qui vont de la nuque à la croupe, en passant par le dos."],
    ["Encapuchonné", "Se dit d'un cheval dont le nez passe derrière la verticale."]
  ] },
  quiz: [
    Q("Pendant l'effort, pourquoi le cœur bat-il plus vite ?", ["Pour refroidir le cheval", "Pour apporter plus d'oxygène aux muscles", "Parce que le cheval a peur", "Pour digérer"], 1, "Le cœur et le souffle s'accélèrent pour apporter plus d'oxygène aux muscles."),
    Q("Qu'est-ce qu'un effort court et intense ?", ["Un effort où le muscle manque d'oxygène et se fatigue vite", "Un travail de fond", "Une promenade au pas", "Un étirement"], 0, "C'est l'effort d'un parcours ou d'un galop rapide : il fatigue vite le muscle."),
    Q("Quel effort le cheval peut-il tenir longtemps ?", ["L'effort court et intense", "L'effort long et modéré", "Un sprint", "Un saut très haut"], 1, "L'effort long et modéré utilise l'oxygène : c'est le travail de fond."),
    Q("Pourquoi alterner les types de travail ?", ["Pour aller plus vite", "Parce que c'est obligatoire", "Pour ne pas fatiguer toujours les mêmes structures", "Pour éviter de seller"], 2, "Chaque travail sollicite différemment le corps : alterner le ménage et garde le moral du cheval."),
    Q("Quand fait-on de préférence les étirements ?", ["Après le travail, sur des muscles chauds", "Avant le travail, à froid", "Pendant le galop", "Jamais"], 0, "Sur des muscles chauds, après le travail, lentement et sans forcer."),
    Q("Que fais-tu si le cheval se crispe pendant un étirement ?", ["Je force un peu", "Je recommence plus vite", "J'arrête", "Je l'attache"], 2, "Un étirement se fait sans forcer : on arrête dès que le cheval se crispe."),
    Q("Quel est l'effet de l'abaissement de l'encolure ?", ["Il étire la ligne du dessus et soulève le dos", "Il creuse le dos", "Il bloque les épaules", "Il fatigue les postérieurs"], 0, "L'encolure qui s'étend vers l'avant et le bas étire la ligne du dessus et soulève le dos."),
    Q("Quelle est une limite de l'abaissement de l'encolure ?", ["Il n'en a aucune", "Trop longtemps, le cheval tombe sur ses épaules", "Il rend le cheval trop rapide", "Il empêche de tourner"], 1, "Trop long ou trop bas, il surcharge l'avant-main."),
    Q("Après une séance intense, la suivante est…", ["Plus légère", "Encore plus intense", "Supprimée pour un mois", "Identique"], 0, "Le cheval progresse pendant la récupération : on alterne effort et séance légère."),
    Q("Un cheval dont le nez passe derrière la verticale est…", ["Encapuchonné", "Rond et bas", "Rassemblé", "Droit"], 0, "Encapuchonné, il ne s'étire plus correctement.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-08 — POULS ET FRÉQUENCE RESPIRATOIRE   (programme FFE Galop 9 : prendre le pouls et la fréquence respiratoire ;
   valeurs normales au repos ; signes d'alerte) — repère du programme : FR au repos 8 à 14 / min
   --------------------------------------------------------------------------------- */
{ id: "g9n-08", icone: "🩺", type: { fr: "théorie" }, duree: { fr: "9 min" }, titre: { fr: "Pouls et fréquence respiratoire" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_SIGNAUX.jpg", couv: {} },

    B("Prendre le pouls", [
      P("Au Galop 9, tu sais prendre le pouls et la fréquence respiratoire de ton cheval, et tu connais leurs valeurs normales au repos. Ce sont deux des premiers signes que le vétérinaire te demandera au téléphone."),
      S("🩺 Au stéthoscope", null, [
        "Place le stéthoscope sur le côté gauche de la poitrine, derrière le coude, sous la sangle.",
        "Chaque battement du cœur fait deux bruits rapprochés : ils ne comptent que pour un.",
        "Compte pendant 30 secondes et multiplie par 2, ou pendant 15 secondes et multiplie par 4."
      ]),
      S("🖐️ Avec les doigts", null, [
        "Cherche l'artère qui passe sous la mâchoire inférieure, sur son bord, côté intérieur.",
        "Pose deux doigts à plat, sans appuyer fort : tu sens la pulsation.",
        "Compte de la même façon."
      ]),
      S("📏 Les valeurs au repos", "Pour un cheval adulte, calme, au repos :", [
        "Le pouls : environ 28 à 44 battements par minute.",
        "La température : environ 37,5 à 38,5 °C.",
        "Chez le poulain, le pouls et la respiration sont plus rapides."
      ]),
      E("💡", "Le savais-tu ?", "Chaque cheval a ses propres valeurs. Prends-les plusieurs matins de suite, au calme, et note-les : ce sont ses valeurs de référence, bien plus utiles que les moyennes.")
    ]),

    B("La fréquence respiratoire", [
      S("🌬️ Compter les respirations", null, [
        "Place-toi un peu en arrière du cheval, et regarde son flanc se soulever puis s'abaisser.",
        "Un mouvement complet, une inspiration et une expiration, compte pour une respiration.",
        "Tu peux aussi sentir le souffle en posant la main devant un naseau, par temps froid tu vois la buée.",
        "Compte pendant une minute entière : la respiration est plus lente que le pouls."
      ]),
      S("📏 Les valeurs au repos", null, [
        "Repère du programme : 8 à 14 respirations par minute au repos.",
        "La respiration est régulière, silencieuse, sans effort visible du ventre."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Prends les valeurs le matin, avant le pansage et avant le travail, dans le calme : un cheval qui vient de manger, de s'agiter ou qui a chaud a des valeurs plus élevées.")
    ]),

    B("Les signes d'alerte", [
      S("🚨 Au repos", null, [
        "Un pouls au-dessus de ses valeurs habituelles, sans raison : douleur, fièvre, coliques possibles.",
        "Une respiration rapide, bruyante, ou avec un effort marqué du ventre.",
        "Une température au-dessus de 38,5 °C.",
        "Dans tous ces cas, note les valeurs et l'heure, et appelle le vétérinaire."
      ]),
      S("🏃 Après l'effort", null, [
        "Le pouls et la respiration montent pendant l'effort : c'est normal.",
        "Ce qui compte, c'est la vitesse à laquelle ils redescendent au pas, au calme.",
        "Une récupération plus lente que d'habitude peut signaler une fatigue, une douleur ou un début de maladie."
      ]),
      E("🔭", "Pour aller plus loin", "En endurance, les vétérinaires contrôlent le pouls à chaque étape : un cheval dont le cœur ne redescend pas assez vite n'a pas le droit de repartir.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Compter les deux bruits d'un battement comme deux battements.",
        "Prendre le pouls avec le pouce, qui a son propre pouls.",
        "Prendre les valeurs juste après le travail et les croire « au repos ».",
        "Compter les respirations sur 15 secondes seulement : l'erreur est trop grande."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais prendre les constantes.", [
        "Prends le pouls de ton cheval au stéthoscope, puis sous la mâchoire, et compare.",
        "Compte sa fréquence respiratoire au repos.",
        "Prends-les de nouveau après une séance, puis toutes les cinq minutes jusqu'au retour au calme."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Où prendre le pouls d'un cheval ?",
        "Quelles sont les valeurs normales au repos ?",
        "Comment prendre la température d'un cheval ?",
        "Pourquoi le pouls d'un poulain est-il plus rapide ?",
        "Que veut dire une récupération lente ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Stéthoscope derrière le coude gauche, ou sous la mâchoire.",
        "Pouls au repos : environ 28 à 44.",
        "Respiration au repos : 8 à 14.",
        "Valeurs prises le matin, au calme.",
        "Récupération lente : on surveille."
      ]),
      E("", "", "Connaître les chiffres de ton cheval au repos, c'est savoir tout de suite quand quelque chose ne va pas.")
    ])
  ],
  lexique: { fr: [
    ["Pouls", "Battement du cœur ressenti dans une artère ; on le compte par minute."],
    ["Fréquence respiratoire", "Nombre de respirations par minute."],
    ["Stéthoscope", "Instrument qui permet d'écouter le cœur et la respiration."],
    ["Constantes", "Pouls, respiration et température : les signes de base de la santé."],
    ["Valeurs de référence", "Constantes habituelles d'un cheval précis, au repos."]
  ] },
  quiz: [
    Q("Où places-tu le stéthoscope pour écouter le cœur ?", ["Sur la croupe", "Sur l'encolure, côté droit", "Sous le ventre, derrière le nombril", "Sur le côté gauche, derrière le coude"], 3, "Le cœur s'écoute sur le côté gauche de la poitrine, derrière le coude."),
    Q("Un battement fait deux bruits rapprochés. Combien en comptes-tu ?", ["Deux", "Un", "Aucun", "Quatre"], 1, "Les deux bruits rapprochés forment un seul battement."),
    Q("Quel est un repère courant du pouls d'un cheval adulte au repos ?", ["Environ 10 à 15", "Environ 80 à 100", "Environ 150", "Environ 28 à 44"], 3, "Environ 28 à 44 battements par minute au repos, à comparer aux valeurs habituelles du cheval."),
    Q("Quelle est la fréquence respiratoire au repos indiquée par le programme ?", ["8 à 14", "2 à 4", "30 à 40", "60 à 80"], 0, "Le programme indique 8 à 14 respirations par minute au repos."),
    Q("Qu'est-ce qui compte pour une respiration ?", ["Une inspiration seule", "Un hennissement", "Un mouvement d'oreille", "Une inspiration et une expiration"], 3, "Un cycle complet, inspiration et expiration, compte pour une respiration."),
    Q("Quelle température indique une fièvre chez le cheval adulte ?", ["36 °C", "37,5 °C", "38 °C", "Au-dessus de 38,5 °C"], 3, "Au-dessus d'environ 38,5 °C au repos, on parle de fièvre : appelle le vétérinaire."),
    Q("Pourquoi éviter de prendre le pouls avec le pouce ?", ["Il est trop gros", "Il a son propre pouls", "Il chatouille le cheval", "Ce n'est pas autorisé"], 1, "Le pouce a son propre pouls, qui fausse le comptage."),
    Q("Quand prends-tu les valeurs de référence de ton cheval ?", ["Le matin, au calme, avant le travail", "Juste après le galop", "Pendant le repas", "Après la douche"], 0, "Au calme, le matin, avant le pansage et le travail."),
    Q("Où peux-tu sentir le pouls avec les doigts ?", ["Sur la croupe", "Au garrot", "Sur le sabot", "Sur l'artère qui passe sous la mâchoire inférieure"], 3, "L'artère sous le bord de la mâchoire inférieure permet de sentir la pulsation."),
    Q("Après l'effort, qu'est-ce qui renseigne sur la forme ?", ["La hauteur des oreilles", "La vitesse à laquelle pouls et respiration redescendent", "La couleur de la robe", "La longueur de la crinière"], 1, "Une récupération rapide est le signe d'un cheval en forme.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-09 — LES TARES DURES ET MOLLES   (programme FFE Galop 9 : reconnaître les principales tares ;
   prévention : parage et ferrure, poids, choix des sols ; avis vétérinaire)
   --------------------------------------------------------------------------------- */
{ id: "g9n-09", icone: "🦵", type: { fr: "théorie" }, duree: { fr: "10 min" }, titre: { fr: "Les tares dures et molles" },
  blocs: [
    { type: "couv-affiche", src: "images/IMG_SANTE_BOITERIE.jpg", couv: {} },

    B("Qu'est-ce qu'une tare ?", [
      P("Au Galop 9, tu sais reconnaître les principales tares des membres et comment les prévenir. Une tare est une déformation visible d'un membre, souvent la trace d'un effort répété, d'un choc ou d'une blessure ancienne."),
      S("🔎 Deux familles", null, [
        { gras: "Les tares dures :", texte: "osseuses, elles ne se déforment pas sous le doigt." },
        { gras: "Les tares molles :", texte: "des poches de liquide, souples sous le doigt, autour d'une articulation, d'un tendon ou d'une bourse." }
      ]),
      S("🤔 Grave ou pas ?", null, [
        "Beaucoup de tares sont anciennes et ne gênent pas le cheval : on dit qu'elles sont « froides ».",
        "Une tare qui apparaît, chauffe, grossit ou fait boiter doit être vue par le vétérinaire.",
        "Lors d'un achat, le vétérinaire les note dans sa visite : elles comptent dans la valeur du cheval."
      ]),
      E("💡", "Le savais-tu ?", "Le mot « tare » vient du vocabulaire du commerce : c'était un défaut qui diminuait la valeur d'une marchandise. Pour le cheval, l'idée est restée.")
    ]),

    B("Les principales tares", [
      S("🦴 Les tares dures", null, [
        { gras: "Le suros :", texte: "une grosseur osseuse sur le canon, souvent à l'intérieur de l'antérieur, chez le jeune cheval." },
        { gras: "L'éparvin :", texte: "une grosseur osseuse à la face intérieure du jarret, liée à l'arthrose du bas du jarret." },
        { gras: "La forme :", texte: "une grosseur osseuse autour du paturon ou de la couronne." }
      ]),
      S("💧 Les tares molles", null, [
        { gras: "Les molettes :", texte: "des poches souples juste au-dessus du boulet, sur les côtés." },
        { gras: "Le vessigon :", texte: "une poche souple au jarret." },
        { gras: "Le capelet :", texte: "une poche à la pointe du jarret." },
        { gras: "L'éponge :", texte: "une poche à la pointe du coude, souvent due au fer qui appuie quand le cheval est couché." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour bien voir les tares, compare toujours les deux membres d'une même paire, de face, de profil et de dos. Ce qui n'existe que d'un côté attire l'attention.")
    ]),

    B("Prévenir les tares", [
      S("🛡️ Les moyens de prévention", null, [
        { gras: "Le parage et la ferrure :", texte: "réguliers et adaptés aux aplombs, ils répartissent les efforts sur le membre." },
        { gras: "Le poids :", texte: "un cheval trop gros charge davantage ses articulations." },
        { gras: "Le choix des sols :", texte: "éviter les sols trop durs, trop profonds ou irréguliers pour le travail intense." },
        { gras: "La progressivité :", texte: "un travail adapté à l'âge et à la condition physique, surtout chez le jeune cheval." },
        { gras: "Le confort au box :", texte: "une litière épaisse évite les éponges et les capelets." }
      ]),
      S("🩺 L'avis du vétérinaire", null, [
        "Toute tare nouvelle, chaude ou douloureuse est montrée au vétérinaire.",
        "Il peut faire des examens (radiographie, échographie) et proposer des soins.",
        "Ne crève jamais une poche de liquide et n'applique pas de produit sans son avis."
      ]),
      E("🔭", "Pour aller plus loin", "Les aplombs, que tu as étudiés au Galop 7, jouent un grand rôle : un cheval aux aplombs défectueux use certaines parties de ses membres plus vite que d'autres.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre une tare molle avec un gonflement d'œdème qui disparaît après le travail.",
        "Croire qu'une tare ancienne et froide empêche forcément de monter.",
        "Négliger une grosseur qui chauffe.",
        "Repousser le maréchal-ferrant de plusieurs semaines."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais reconnaître les tares.", [
        "Examine les quatre membres d'un cheval : compare chaque paire.",
        "Dis si tu vois une tare, dure ou molle, et où elle se trouve.",
        "Explique ce que l'écurie fait pour les prévenir."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qu'est-ce qu'un suros ?",
        "Une molette est-elle grave ?",
        "Comment éviter les éponges ?",
        "Pourquoi le vétérinaire note-t-il les tares lors d'un achat ?",
        "Quels sols pour préserver les membres ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Dures : osseuses (suros, éparvin, forme).",
        "Molles : poches de liquide (molettes, vessigon, capelet, éponge).",
        "Froides et anciennes : souvent sans gêne.",
        "Nouvelles, chaudes ou douloureuses : vétérinaire.",
        "Prévenir : pieds, poids, sols, progressivité."
      ]),
      E("", "", "Passe la main sur les membres de ton cheval chaque jour : c'est ainsi qu'on repère une tare avant qu'elle ne s'installe.")
    ])
  ],
  lexique: { fr: [
    ["Tare", "Déformation visible d'un membre, trace d'un effort, d'un choc ou d'une blessure."],
    ["Tare dure", "Tare osseuse, qui ne se déforme pas sous le doigt."],
    ["Tare molle", "Poche de liquide, souple sous le doigt."],
    ["Suros", "Grosseur osseuse sur le canon."],
    ["Molette", "Poche souple au-dessus du boulet."],
    ["Éponge", "Poche à la pointe du coude."]
  ] },
  quiz: [
    Q("Qu'est-ce qu'une tare dure ?", ["Une poche de liquide", "Une déformation osseuse", "Une plaie", "Une chute de poils"], 1, "Les tares dures sont osseuses et ne se déforment pas sous le doigt."),
    Q("Où se trouve un suros ?", ["Sur le canon", "À la pointe du coude", "Sur l'encolure", "Au garrot"], 0, "Le suros est une grosseur osseuse sur le canon."),
    Q("Quelle tare se trouve à la face intérieure du jarret ?", ["L'éparvin", "La molette", "L'éponge", "Le suros"], 0, "L'éparvin est une tare dure à la face intérieure du jarret."),
    Q("Comment repères-tu le mieux une tare ?", ["En regardant un seul membre", "En faisant galoper le cheval", "En comparant les deux membres d'une même paire", "En prenant sa température"], 2, "Ce qui n'existe que d'un côté attire l'attention."),
    Q("Où se trouvent les molettes ?", ["Sur le garrot", "Au genou", "Au-dessus du boulet", "Dans la bouche"], 2, "Les molettes sont des poches souples juste au-dessus du boulet."),
    Q("Qu'est-ce qu'une éponge ?", ["Un outil de pansage seulement", "Une poche à la pointe du coude", "Une tare du jarret", "Un défaut du sabot"], 1, "L'éponge est une poche à la pointe du coude, souvent due au fer quand le cheval est couché."),
    Q("Une tare ancienne et froide…", ["Empêche toujours de monter", "Doit être crevée", "Ne gêne souvent pas le cheval", "Est contagieuse"], 2, "Beaucoup de tares anciennes et froides ne gênent pas le cheval."),
    Q("Quel est un moyen de prévention des tares ?", ["Parage et ferrure réguliers", "Travailler sur sol très dur", "Faire grossir le cheval", "Sauter haut tous les jours"], 0, "Pieds bien entretenus, poids juste, sols adaptés et progressivité préviennent les tares."),
    Q("Une grosseur apparaît et chauffe. Que fais-tu ?", ["Je la montre au vétérinaire", "Je la crève", "J'attends six mois", "Je monte plus fort"], 0, "Toute tare nouvelle, chaude ou douloureuse se montre au vétérinaire."),
    Q("Où se trouve le capelet ?", ["Au boulet", "Au garrot", "Au genou", "À la pointe du jarret"], 3, "Le capelet est une poche à la pointe du jarret.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g9n-10 — LE RASSEMBLER   (programme FFE Galop 9, partie commune : objectifs du rassembler — transfert du poids vers les postérieurs,
   allègement de l'avant-main, souplesse des hanches ; utilisation des transitions ; échelle de progression en 6 points)
   — pas de « demi-arrêt » : absent du programme
   --------------------------------------------------------------------------------- */
{ id: "g9n-10", icone: "👑", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Le rassembler" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c08-equilibre.webp", couv: {} },

    B("L'échelle de progression en entier", [
      P("Au Galop 8, tu as étudié les trois premiers points de l'échelle de progression. Au Galop 9, tu la connais en entier, jusqu'à son sommet : le rassembler."),
      S("🪜 Les six points", null, [
        "1. La correction de l'allure.",
        "2. La souplesse et la décontraction.",
        "3. La qualité du contact.",
        { gras: "4. La propulsion :", texte: "le cheval pousse davantage avec ses postérieurs, l'énergie passe par un dos souple jusqu'à la main." },
        { gras: "5. La rectitude :", texte: "les postérieurs suivent la trace des antérieurs, sur les lignes droites comme sur les courbes ; les deux côtés du cheval travaillent de la même façon." },
        { gras: "6. Le rassembler :", texte: "l'aboutissement des cinq autres." }
      ]),
      E("💡", "Le savais-tu ?", "Tous les chevaux naissent un peu « tordus », plus souples d'un côté que de l'autre, comme nous sommes droitiers ou gauchers. La rectitude se construit toute la carrière du cheval.")
    ]),

    B("Qu'est-ce que le rassembler ?", [
      S("🎯 Ses objectifs", null, [
        { gras: "Transférer du poids vers les postérieurs :", texte: "les postérieurs s'engagent plus loin sous la masse et la portent davantage." },
        { gras: "Alléger l'avant-main :", texte: "les épaules sont plus libres ; l'encolure se relève d'elle-même, sans que la main la relève." },
        { gras: "Assouplir les hanches :", texte: "les articulations des postérieurs se plient davantage, comme des ressorts." }
      ]),
      S("👀 Ce que tu vois et ce que tu sens", null, [
        "Les foulées sont plus courtes et plus élevées, sans perdre leur énergie.",
        "La cadence reste la même.",
        "Le cheval est plus léger dans la main et plus disponible : il répond plus vite et plus finement.",
        "Les hanches s'abaissent un peu ; le cheval semble « monter » devant."
      ]),
      E("⚠️", "Attention", "Un cheval qui ralentit, tête haute et dos creux, n'est pas rassemblé : il est seulement freiné. Le rassembler vient de l'arrière, jamais de la main.")
    ]),

    B("Travailler vers le rassembler", [
      S("🔁 Les transitions", "C'est l'outil principal.", [
        "Les transitions entre allures (trot-pas-trot, galop-pas-galop) engagent les postérieurs.",
        "Les transitions dans l'allure (allonger, raccourcir) apprennent au cheval à garder son énergie en raccourcissant sa foulée.",
        "Plus les transitions sont rapprochées et nettes, plus le cheval s'équilibre sur ses postérieurs.",
        "Chaque transition se prépare : le cheval reste droit, dans le contact, et garde sa cadence."
      ]),
      S("🧩 D'autres exercices utiles", null, [
        "Les cercles et les voltes, qui demandent au postérieur intérieur de se plier davantage.",
        "L'épaule en dedans, qui engage le postérieur intérieur sous la masse.",
        "Le galop raccourci sur de grands cercles, en gardant le rebond."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Le rassembler se demande peu de temps à la fois : quelques foulées, puis repars en avant, plus grand. Un cheval qu'on garde trop longtemps rassemblé finit par se fatiguer et se crisper.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Raccourcir en tirant sur les rênes.",
        "Confondre lenteur et rassembler.",
        "Chercher le rassembler sur un cheval qui n'est pas décontracté ou pas droit.",
        "Rester longtemps rassemblé sans repartir en avant."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu comprends le rassembler.", [
        "Cite les six points de l'échelle de progression dans l'ordre.",
        "Explique les objectifs du rassembler avec tes mots.",
        "Enchaîne une série de transitions rapprochées au trot et au galop, puis quelques foulées raccourcies, et décris ce que tu ressens."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Quelle différence entre un cheval rassemblé et un cheval lent ?",
        "Pourquoi la rectitude vient-elle avant le rassembler ?",
        "Quels exercices pour engager les postérieurs ?",
        "Combien de temps garder un cheval rassemblé ?",
        "Pourquoi l'encolure se relève-t-elle d'elle-même ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Six points, le rassembler au sommet.",
        "Poids vers les postérieurs, avant-main allégée.",
        "Foulées plus courtes et plus élevées, même énergie.",
        "Transitions : l'outil principal.",
        "Quelques foulées, puis en avant."
      ]),
      E("", "", "Le rassembler ne se fabrique pas : il se construit, point après point, sur toute l'échelle.")
    ])
  ],
  lexique: { fr: [
    ["Rassembler", "Équilibre où le cheval porte davantage de poids sur ses postérieurs, l'avant-main allégée."],
    ["Propulsion", "Poussée des postérieurs qui porte le cheval en avant."],
    ["Rectitude", "Le cheval droit : ses postérieurs suivent la trace de ses antérieurs."],
    ["Avant-main", "Partie avant du cheval : tête, encolure, épaules, antérieurs."],
    ["Engagement", "Avancée des postérieurs sous la masse du cheval."]
  ] },
  quiz: [
    Q("Quel est le dernier point de l'échelle de progression ?", ["La rectitude", "Le contact", "La propulsion", "Le rassembler"], 3, "Le rassembler est le sixième et dernier point, l'aboutissement des cinq autres."),
    Q("Quel point vient juste avant le rassembler ?", ["Le contact", "La rectitude", "La décontraction", "La correction de l'allure"], 1, "L'ordre est : allure, souplesse et décontraction, contact, propulsion, rectitude, rassembler."),
    Q("Quel est l'un des objectifs du rassembler ?", ["Charger les épaules", "Transférer du poids vers les postérieurs", "Accélérer la cadence", "Baisser la tête au sol"], 1, "Le rassembler transfère du poids vers les postérieurs et allège l'avant-main."),
    Q("Dans le rassembler, les foulées sont…", ["Plus courtes et plus élevées, avec la même énergie", "Plus longues et plus basses", "Plus rapides", "Irrégulières"], 0, "Plus courtes et plus élevées, sans perdre d'énergie ni changer de cadence."),
    Q("D'où vient le rassembler ?", ["De la main qui relève la tête", "Des éperons seuls", "De l'arrière, des postérieurs qui s'engagent", "De la vitesse"], 2, "Le rassembler vient de l'arrière ; l'encolure se relève d'elle-même."),
    Q("Quel est l'outil principal pour aller vers le rassembler ?", ["Les transitions", "Le galop rapide", "Les rênes fixes", "Le saut"], 0, "Les transitions, entre allures et dans l'allure, engagent les postérieurs."),
    Q("Quel exercice engage le postérieur intérieur sous la masse ?", ["L'épaule en dedans", "Le galop allongé en ligne droite", "Le pas rênes longues", "L'arrêt"], 0, "L'épaule en dedans, comme les cercles et les voltes, engage le postérieur intérieur."),
    Q("Un cheval tête haute, dos creux, qui ralentit est…", ["Rassemblé", "Rectiligne", "Seulement freiné", "Décontracté"], 2, "Il n'est pas rassemblé : il est freiné, le dos creux."),
    Q("Qu'est-ce que la propulsion ?", ["La poussée des postérieurs qui porte le cheval en avant", "La vitesse maximale", "Le saut", "La décontraction"], 0, "La propulsion vient des postérieurs ; l'énergie passe par un dos souple jusqu'à la main."),
    Q("Combien de temps demandes-tu le rassembler au début ?", ["Quelques foulées, puis en avant", "Toute la séance", "Une heure", "Jamais"], 0, "Quelques foulées à la fois, puis on repart en avant pour éviter fatigue et crispation.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-11 — DRESSAGE : POIDS, CADENCE ET LATÉRAUX   (programme FFE Galop 9, spécifique dressage : utiliser son poids sur l'équilibre
   et les transitions ; maîtriser la cadence sur les figures à une ou deux pistes ; inverser les déplacements latéraux aux trois allures ;
   tourner sur les hanches au galop ; transitions dans les déplacements latéraux)
   — 07/11 : cours nouveau ; À VÉRIFIER par Blandine : « tourner sur les hanches au galop » présenté comme une préparation à la pirouette
   --------------------------------------------------------------------------------- */
{ id: "g9n-11", icone: "⚖️", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Dressage : poids, cadence et latéraux" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c10-cession.webp", couv: {} },

    B("Utiliser son poids", [
      P("Au Galop 9, en dressage, tes aides deviennent plus fines : ton poids et ton assiette agissent sur l'équilibre du cheval, et tu contrôles la cadence sur toutes les figures, à une ou à deux pistes."),
      S("⚖️ Le poids du cavalier", null, [
        "Assis au milieu de la selle, tu laisses ton poids descendre dans tes deux ischions et tes talons de façon égale.",
        "Un peu plus de poids sur un ischion accompagne une courbe ou un déplacement latéral, sans te pencher.",
        "Ton bassin accompagne le mouvement : en le suivant moins, tu ralentis le mouvement ; en le suivant pleinement, tu le laisses se développer.",
        "Dans les transitions, ton poids prépare le cheval avant que tes mains interviennent."
      ]),
      S("🎵 La cadence sur les figures", null, [
        "Sur une volte, une serpentine ou un déplacement latéral, la cadence doit rester celle de la ligne droite.",
        "Si le cheval ralentit dans la figure, tes jambes entretiennent l'activité ; s'il accélère, ton assiette régule.",
        "Compte tes foulées à voix basse pour vérifier."
      ]),
      E("💡", "Le savais-tu ?", "Les juges de dressage regardent la régularité de la cadence d'un bout à l'autre de la reprise : un cheval qui accélère dans les lignes droites et ralentit dans les figures perd des points partout.")
    ]),

    B("Inverser les déplacements latéraux", [
      S("🔀 Enchaîner deux latéraux opposés", "Le programme demande d'inverser les déplacements latéraux, aux trois allures.", [
        "Exemple : un appuyer vers la gauche, quelques foulées droites, puis un appuyer vers la droite.",
        "Au moment d'inverser, redresse le cheval, change son pli, puis inverse tes jambes : la nouvelle jambe extérieure se recule et pousse.",
        "Garde la même cadence avant, pendant et après le changement.",
        "Commence au pas et au trot ; au galop, chaque changement de sens demande aussi un changement de pied."
      ]),
      S("🔁 Les transitions dans les latéraux", null, [
        "Le programme demande aussi d'obtenir des transitions dans les déplacements latéraux.",
        "Exemple : en appuyer au trot, quelques foulées au pas en gardant l'appuyer, puis de nouveau au trot.",
        "Le cheval garde l'angle et le pli pendant la transition : c'est un excellent test de son équilibre."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Avant d'inverser, vérifie que ton cheval est vraiment droit pendant une ou deux foulées. Si tu changes de pli sans le redresser, il bascule d'une épaule sur l'autre.")
    ]),

    B("Tourner sur les hanches au galop", [
      S("🔄 Ce qu'on demande", null, [
        "Le cheval tourne ses épaules autour de ses hanches, au galop, sur un petit cercle.",
        "Il garde un galop à trois temps, sauteur, et la même cadence.",
        "C'est la préparation de la pirouette, que l'on rencontre aux niveaux plus élevés."
      ]),
      S("🔁 Comment le travailler", null, [
        "Pars d'un galop raccourci, sur un grand cercle, avec un léger pli intérieur.",
        "Diminue peu à peu le cercle, en gardant les hanches sur la ligne grâce à la jambe extérieure.",
        "Demande seulement quelques foulées de tournant serré, puis agrandis de nouveau en avant.",
        "Si le galop perd ses trois temps ou s'éteint, repars tout de suite plus grand."
      ]),
      E("🔭", "Pour aller plus loin", "La pirouette au galop, où le postérieur intérieur galope presque sur place, est présentée à partir des reprises de niveau supérieur. Le travail du Galop 9 en pose les bases.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Te pencher pour peser d'un côté : tu déséquilibres le cheval.",
        "Laisser la cadence ralentir dans les figures.",
        "Inverser un latéral sans redresser le cheval entre les deux.",
        "Serrer le tournant au galop au point que le galop s'éteint."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises ces exercices.", [
        "Enchaîne une volte, une serpentine et un appuyer au trot en gardant la même cadence.",
        "Fais un appuyer à gauche puis à droite au trot, avec un redressement entre les deux.",
        "Au galop, diminue un cercle pour tourner quelques foulées sur les hanches, puis repars grand."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment utiliser mon poids sans me pencher ?",
        "Comment garder la cadence dans un appuyer ?",
        "Comment enchaîner deux appuyers opposés ?",
        "Qu'est-ce qu'une pirouette au galop ?",
        "Pourquoi faire des transitions dans un latéral ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Le poids prépare, les mains confirment.",
        "Même cadence sur toutes les figures.",
        "Inverser : redresser, changer le pli, inverser les jambes.",
        "Transitions dans le latéral : l'angle reste.",
        "Tourner sur les hanches : quelques foulées, galop vivant."
      ]),
      E("", "", "Au Galop 9, tes aides se font de plus en plus discrètes : c'est le signe que ton cheval t'écoute.")
    ])
  ],
  lexique: { fr: [
    ["Ischions", "Les deux os du bassin sur lesquels le cavalier est assis."],
    ["Assiette", "Façon dont le cavalier est assis et accompagne le mouvement du cheval."],
    ["Figure à deux pistes", "Figure où les postérieurs ne suivent pas la trace des antérieurs, comme un déplacement latéral."],
    ["Pirouette", "Tour du cheval autour de ses hanches, au galop, le postérieur intérieur galopant presque sur place."],
    ["Galop sauteur", "Galop énergique, avec une suspension bien marquée."]
  ] },
  quiz: [
    Q("Comment augmentes-tu ton poids d'un côté ?", ["En te penchant", "En levant une jambe", "Un peu plus de poids sur un ischion, sans te pencher", "En tirant sur une rêne"], 2, "Tu charges un peu plus un ischion en restant droit, sans te pencher."),
    Q("Dans une transition, quelle aide intervient en premier ?", ["Les mains", "La cravache", "La voix seule", "Le poids et l'assiette"], 3, "Le poids et l'assiette préparent le cheval ; les mains confirment."),
    Q("Sur une volte, la cadence doit…", ["Ralentir", "Rester celle de la ligne droite", "Accélérer", "Changer à chaque foulée"], 1, "La cadence reste la même sur toutes les figures."),
    Q("Entre un appuyer à gauche et un appuyer à droite, que fais-tu ?", ["J'enchaîne directement", "Je m'arrête", "Je passe au galop", "Je redresse le cheval, puis je change le pli et j'inverse mes jambes"], 3, "On redresse d'abord, puis on change le pli et on inverse les jambes."),
    Q("Au galop, inverser un déplacement latéral demande aussi…", ["Un arrêt", "Un changement de pied", "Un reculer", "Un trot"], 1, "Au galop, chaque changement de sens du latéral demande un changement de pied."),
    Q("Dans une transition au cours d'un appuyer, le cheval…", ["Garde l'angle et le pli", "Se redresse", "Change de direction", "S'arrête"], 0, "Il garde l'angle et le pli : c'est un test de son équilibre."),
    Q("Tourner sur les hanches au galop prépare…", ["Le changement de pied simple", "Le contre-galop", "Le reculer", "La pirouette"], 3, "C'est la préparation de la pirouette, rencontrée aux niveaux plus élevés."),
    Q("Que demande le programme dans les déplacements latéraux ?", ["Des sauts", "Des arrêts prolongés", "Des reculers", "Des transitions dans les déplacements latéraux"], 3, "Le programme demande d'obtenir des transitions dans les déplacements latéraux, aux trois allures."),
    Q("Comment ralentis-tu le mouvement avec ton bassin ?", ["En le bloquant brutalement", "En le suivant moins", "En le suivant davantage", "En te levant"], 1, "En suivant moins le mouvement, ton bassin ralentit le cheval, sans à-coup."),
    Q("Le galop s'éteint pendant le tournant. Que fais-tu ?", ["Je serre encore plus", "Je passe au trot et j'arrête la séance", "Je repars aussitôt plus grand, en avant", "Je recule"], 2, "On repart plus grand pour retrouver un galop vivant.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-12 — DRESSAGE AMATEUR 1   (programme FFE Galop 9, spécifique dressage : rassembler et allonger ; contrôler la rectitude
   dans les changements de pied en l'air ; enchaîner appuyer, changement de pied et appuyer au galop ; reprise de niveau Amateur 1)
   — À VÉRIFIER par Blandine : reprise Amateur 1 Grand Prix, rectangle 60 x 20 m
   --------------------------------------------------------------------------------- */
{ id: "g9n-12", icone: "🎩", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "Dressage Amateur 1" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-video-dressage.webp", couv: {} },

    B("Rassembler et allonger", [
      P("Au Galop 9, en dressage, tu montes au niveau Amateur 1. Tu passes du rassembler à l'allongement et inversement, tu contrôles la rectitude dans tes changements de pied en l'air, et tu enchaînes des appuyers au galop."),
      S("↔️ Du rassemblé à l'allongé", null, [
        "Le cheval passe d'une foulée courte et élevée à une foulée longue, qui couvre le plus de terrain possible.",
        "Dans l'allongé, l'encolure s'étend un peu, les postérieurs poussent fort, la cadence reste la même.",
        "Au retour au rassemblé, l'énergie reste : le cheval se raccourcit sans tomber sur les épaules.",
        "Ces transitions dans l'allure sont l'un des meilleurs exercices pour développer à la fois la propulsion et le rassembler."
      ]),
      E("💡", "Le savais-tu ?", "Dans un allongé réussi, les juges regardent les antérieurs : ils doivent se poser à l'endroit qu'ils montrent, sans fouetter vers l'avant puis revenir en arrière.")
    ]),

    B("Les changements de pied en l'air et l'appuyer au galop", [
      S("📏 Rester droit dans le changement de pied", null, [
        "Avant le changement, le cheval est droit, sur la ligne : les hanches ne rentrent pas.",
        "Pendant le changement, il ne se jette pas de côté et n'accélère pas.",
        "Après, il garde la même ligne et le même galop.",
        "Travaille-le sur une ligne droite, le long du mur ou sur la ligne du milieu, pour voir tout de suite s'il se décale."
      ]),
      S("↗️ Appuyer, changement de pied, appuyer", "C'est le « zigzag » au galop.", [
        "Un appuyer au galop, par exemple vers la droite, sur quelques foulées.",
        "Redresse le cheval sur une ou deux foulées, puis demande le changement de pied en l'air.",
        "Enchaîne un appuyer dans l'autre sens, sur le nouveau pied.",
        "La cadence et le rebond du galop restent les mêmes d'un bout à l'autre."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Dans le zigzag, ne pense pas au changement de pied : pense à redresser. Un cheval droit change de pied tout seul quand tu inverses tes aides ; un cheval de travers change en retard ou de côté.")
    ]),

    B("La reprise Amateur 1", [
      S("🎩 Ce qui t'attend", null, [
        "Une reprise de niveau Amateur 1, le plus souvent la « Amateur 1 Grand Prix », sur un rectangle de 60 m sur 20 m.",
        "Elle réunit les mouvements du Galop 9 : rassemblé et allongé, latéraux au trot et au galop, changements de pied en l'air.",
        "La reprise exacte change régulièrement : prends toujours la version en vigueur sur le site de la FFE, et révise-la dans « Réviser mes reprises »."
      ]),
      S("⚖️ Ce que regardent les juges", null, [
        "Chaque mouvement noté sur 10 : précision, qualité de l'allure, rectitude, transitions.",
        "Des notes d'ensemble : allures, impulsion, soumission, position et emploi des aides du cavalier.",
        "La régularité de la cadence et la justesse du tracé comptent partout."
      ]),
      E("🔭", "Pour aller plus loin", "Après l'Amateur 1, l'Amateur Élite puis les reprises Pro et internationales demandent des pirouettes, des changements de pied rapprochés et, au plus haut niveau, le piaffer et le passage.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre allonger et accélérer.",
        "Laisser le cheval s'étendre en tombant sur les épaules au retour au rassemblé.",
        "Demander le changement de pied pendant l'appuyer, sans redresser.",
        "Monter la reprise avant de savoir chaque mouvement seul."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu es prêt pour l'Amateur 1.", [
        "Au trot, enchaîne rassemblé, allongé, rassemblé sur une diagonale.",
        "Au galop, fais un changement de pied en l'air sur la ligne du milieu, en restant droit.",
        "Fais un zigzag : appuyer, changement de pied, appuyer.",
        "Présente une reprise Amateur 1 en entier."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment préparer un allongement au trot ?",
        "Pourquoi mon cheval change de pied en se décalant ?",
        "Comment enchaîner appuyer et changement de pied ?",
        "Où trouver la reprise Amateur 1 Grand Prix ?",
        "Quelles notes d'ensemble donnent les juges ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Allonger : foulée plus longue, même cadence.",
        "Rassembler : plus court, même énergie.",
        "Changement de pied : droit avant, pendant, après.",
        "Zigzag : appuyer, redresser, changer, appuyer.",
        "Reprise : version en vigueur."
      ]),
      E("", "", "Une reprise Amateur 1 réussie, c'est un cheval qui reste droit, en avant et léger, du salut d'entrée au salut final.")
    ])
  ],
  lexique: { fr: [
    ["Allongé", "Allure où la foulée est la plus longue possible, à cadence égale."],
    ["Rassemblé", "Allure où la foulée est plus courte et plus élevée, le poids sur les postérieurs."],
    ["Zigzag", "Enchaînement d'appuyers dans les deux sens, séparés par des changements de pied au galop."],
    ["Amateur 1 Grand Prix", "Reprise de dressage du niveau Amateur 1."],
    ["Soumission", "Note d'ensemble des juges : attention, confiance et légèreté du cheval."]
  ] },
  quiz: [
    Q("Dans l'allongé, la cadence…", ["Reste la même", "Accélère", "Ralentit", "Disparaît"], 0, "La foulée s'allonge, la cadence reste la même."),
    Q("Au retour au rassemblé après l'allongé, le cheval doit…", ["Tomber sur les épaules", "S'arrêter", "Changer de pied", "Se raccourcir en gardant son énergie"], 3, "Il se raccourcit sans perdre d'énergie ni tomber sur les épaules."),
    Q("Avant un changement de pied en l'air, le cheval est…", ["Droit sur la ligne", "De travers, hanches dedans", "À l'arrêt", "Au trot"], 0, "Un cheval droit change de pied proprement, sans se décaler."),
    Q("Où travailler le changement de pied pour vérifier la rectitude ?", ["Dans un coin", "Sur une volte de 6 m", "Sur une ligne droite, le long du mur ou sur la ligne du milieu", "Au trot"], 2, "Sur une ligne droite, on voit tout de suite si le cheval se décale."),
    Q("Qu'est-ce que le « zigzag » au galop ?", ["Une serpentine au trot", "Des appuyers dans les deux sens, séparés par des changements de pied", "Un parcours de CSO", "Un reculer en courbe"], 1, "Appuyer, changement de pied, appuyer dans l'autre sens."),
    Q("Dans un allongé réussi, comment se posent les antérieurs ?", ["Très haut", "À l'endroit qu'ils montrent, sans revenir en arrière", "En croisant", "Au hasard"], 1, "Les juges regardent les antérieurs : ils se posent là où ils montrent."),
    Q("Entre l'appuyer et le changement de pied, que fais-tu ?", ["Je m'arrête", "Je redresse le cheval sur une ou deux foulées", "J'accélère", "Rien"], 1, "On redresse avant de changer de pied."),
    Q("Sur quel rectangle se monte la reprise Amateur 1 Grand Prix ?", ["40 m sur 20 m", "20 m sur 20 m", "100 m sur 40 m", "60 m sur 20 m"], 3, "Elle se monte sur un rectangle de 60 m sur 20 m."),
    Q("Quelle est une note d'ensemble des juges ?", ["La couleur du tapis", "Le prix du cheval", "La soumission", "Le temps"], 2, "Allures, impulsion, soumission, position et emploi des aides sont notés en ensemble."),
    Q("Où trouves-tu la version à jour de la reprise ?", ["Dans un vieux programme papier", "Chez le maréchal", "Sur le site de la FFE", "Nulle part"], 2, "Les reprises changent : on prend toujours la version en vigueur sur le site de la FFE.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-13 — CSO : ABORDS, PROFILS ET TOURNER SUR L'OBSTACLE   (programme FFE Galop 9, spécifique obstacle : utiliser son équilibre
   sur les étriers et son poids pour varier l'abord ; maîtriser l'abord des différents profils, dont tourner sur l'obstacle ;
   suivre un tracé choisi dans un enchaînement complexe)
   — 07/11 : cours nouveau
   --------------------------------------------------------------------------------- */
{ id: "g9n-13", icone: "🎯", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "CSO : abords, profils et tourner sur l'obstacle" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c11-saut.webp", couv: {} },

    B("Varier l'abord avec son équilibre", [
      P("Au Galop 9, en CSO, tu n'es plus seulement stable : tu utilises ton équilibre, le poids descendu dans les talons, pour changer l'abord de ton cheval, selon l'obstacle et le tracé."),
      S("⚖️ Ton équilibre agit sur le cheval", null, [
        { gras: "En équilibre, le poids dans les talons, buste un peu avancé :", texte: "tu libères le dos et tu accompagnes un galop plus ample." },
        { gras: "Le buste plus redressé, plus près de la selle :", texte: "tu aides le cheval à se raccourcir et à porter davantage sur ses postérieurs." },
        { gras: "Un peu plus de poids dans un étrier :", texte: "tu accompagnes un tournant, sans te pencher." },
        "Toujours le poids dans les talons, les jambes au contact."
      ]),
      E("💡", "Le savais-tu ?", "Les meilleurs cavaliers de CSO touchent très peu la bouche de leur cheval dans un parcours : ils règlent la plupart des abords avec leur équilibre et leur poids.")
    ]),

    B("Les profils et tourner sur l'obstacle", [
      S("🚧 Chaque profil, son abord", null, [
        { gras: "Le vertical :", texte: "un galop plus rassemblé, un cheval bien équilibré, qui arrive assez près pour monter." },
        { gras: "L'oxer :", texte: "un galop plus ample et énergique : le cheval doit sauter haut et large." },
        { gras: "La triple barre :", texte: "un galop ample, un abord qui peut être un peu plus près de la première barre." },
        { gras: "Le mur, la rivière, les obstacles impressionnants :", texte: "de la décision, des jambes actives, le regard au-delà." }
      ]),
      S("↪️ Tourner sur l'obstacle", "Sauter en préparant déjà la direction suivante.", [
        "Avant le saut, ton regard se tourne vers la direction suivante.",
        "Au-dessus de l'obstacle, ton poids passe un peu plus dans l'étrier du côté où tu vas tourner, ta rêne intérieure s'ouvre légèrement.",
        "Le cheval se reçoit déjà sur le bon pied, prêt à tourner.",
        "Ne tourne pas avant le saut : le cheval doit franchir l'obstacle droit."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour t'entraîner à tourner sur l'obstacle, place une barre au sol après un petit vertical, en courbe : ton cheval apprend à se recevoir sur le bon pied et toi à regarder tôt.")
    ]),

    B("Suivre un tracé dans un enchaînement complexe", [
      S("🗺️ Choisir son tracé", null, [
        "À la reconnaissance, choisis ta trajectoire exacte entre chaque obstacle : large, serrée, en biais.",
        "Repère des points de passage au sol pour ne pas t'en écarter.",
        "Décide où tu changes de pied, et comment."
      ]),
      S("🔀 Les enchaînements complexes", null, [
        "Des lignes courbes, où le nombre de foulées dépend de ton tracé.",
        "Des retours courts après un obstacle, où tu dois tourner tôt.",
        "Des combinaisons qui suivent un tournant.",
        "Dans chacun, le tracé choisi se suit jusqu'au bout : changer d'avis en route désorganise le cheval."
      ]),
      E("🔭", "Pour aller plus loin", "Au barrage, le cavalier choisit souvent le tracé le plus court, quitte à sauter en biais et à tourner sur les obstacles : c'est là que tout ce travail prend son sens.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Te pencher dans le tournant pour « aider » le cheval.",
        "Tourner avant d'avoir franchi l'obstacle.",
        "Aborder un oxer avec un galop trop court.",
        "Improviser ton tracé pendant le parcours."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu maîtrises tes abords.", [
        "Saute un vertical puis un oxer en adaptant ton équilibre à chacun.",
        "Saute un obstacle en tournant à gauche, puis à droite, avec une réception sur le bon pied.",
        "Enchaîne un parcours avec une ligne courbe et un retour court, en suivant le tracé choisi à pied."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment varier l'abord avec mon équilibre ?",
        "Comment aborder un oxer ?",
        "Comment tourner sur l'obstacle sans que mon cheval dévie ?",
        "Comment choisir mon tracé à la reconnaissance ?",
        "Comment préparer un barrage ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Ton équilibre règle l'abord.",
        "Vertical : équilibre ; oxer : amplitude.",
        "Tourner sur l'obstacle : regard tôt, poids, rêne qui s'ouvre.",
        "Le cheval franchit droit.",
        "Le tracé choisi se suit jusqu'au bout."
      ]),
      E("", "", "Au Galop 9, tu ne subis plus le parcours : tu le dessines.")
    ])
  ],
  lexique: { fr: [
    ["Abord", "Les dernières foulées avant un obstacle."],
    ["Profil", "Forme d'un obstacle : vertical, oxer, triple barre…"],
    ["Triple barre", "Obstacle large formé de trois plans de barres de plus en plus hauts."],
    ["Tourner sur l'obstacle", "Préparer, pendant le saut, la direction de la réception."],
    ["Barrage", "Second tour, chronométré, réservé aux couples sans faute."]
  ] },
  quiz: [
    Q("Comment aides-tu ton cheval à se raccourcir avant un vertical ?", ["En redressant un peu le buste, plus près de la selle", "En me couchant sur l'encolure", "En lâchant les rênes", "En levant les talons"], 0, "Un buste plus redressé aide le cheval à se raccourcir et à porter sur ses postérieurs."),
    Q("Avec quel galop abordes-tu un oxer ?", ["Très court", "Au trot", "Plus ample et énergique", "Désuni"], 2, "L'oxer est haut et large : il demande un galop ample et énergique."),
    Q("Pour tourner sur l'obstacle, quand regardes-tu la direction suivante ?", ["Après la réception", "Jamais", "Avant le saut", "Au milieu du tournant"], 2, "Le regard se tourne vers la direction suivante avant le saut."),
    Q("Qu'est-ce qu'une triple barre ?", ["Trois verticaux en ligne", "Un mur", "Une rivière", "Un obstacle large de trois plans de barres de plus en plus hauts"], 3, "La triple barre se saute avec un galop ample."),
    Q("Pour t'entraîner à tourner sur l'obstacle, quel exercice ?", ["Une barre au sol en courbe après un petit vertical", "Un grand oxer en ligne droite", "Du pas rênes longues", "Un parcours complet tout de suite"], 0, "La barre au sol en courbe apprend au cheval à se recevoir sur le bon pied."),
    Q("Au-dessus de l'obstacle, comment prépares-tu le tournant ?", ["Un peu plus de poids dans l'étrier du côté du tournant, rêne intérieure légèrement ouverte", "Je me penche", "Je tire fort sur la rêne", "Je lâche tout"], 0, "Le poids et une rêne qui s'ouvre légèrement préparent une réception sur le bon pied."),
    Q("Le cheval doit-il tourner avant de sauter ?", ["Non, il franchit droit", "Oui", "Seulement sur un oxer", "Seulement au barrage"], 0, "Le cheval franchit l'obstacle droit ; le tournant se prépare pendant le saut."),
    Q("Quand choisis-tu ton tracé ?", ["À la reconnaissance à pied", "Pendant le parcours", "Après le parcours", "Jamais"], 0, "Le tracé se choisit à la reconnaissance, avec des points de passage."),
    Q("Que se passe-t-il si tu changes de tracé en route ?", ["Rien", "Tu gagnes du temps", "Le cheval saute mieux", "Tu désorganises le cheval"], 3, "Changer d'avis en route désorganise le cheval."),
    Q("Qu'est-ce qu'un barrage ?", ["Un obstacle d'eau", "Un refus", "Un tour de reconnaissance", "Un second tour chronométré pour les couples sans faute"], 3, "Le barrage départage, au chronomètre, les couples sans faute.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-14 — CSO AMATEUR ET TABLEAU DES DISTANCES   (programme FFE Galop 9, spécifique obstacle ; parcours de niveau Amateur)
   — À VÉRIFIER par Blandine : repères de distances (indicatifs) et niveau exact du parcours d'examen (Amateur 1)
   --------------------------------------------------------------------------------- */
{ id: "g9n-14", icone: "🚧", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "CSO Amateur et tableau des distances" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-video-parcours.webp", couv: {} },

    B("Le tableau des distances", [
      P("Au Galop 8, tu as appris à respecter un contrat de foulées. Au Galop 9, tu sais lire et utiliser un tableau des distances : il donne les distances habituelles entre obstacles, selon leur type et le nombre de foulées."),
      S("📏 Des repères courants pour un cheval", "Ce sont des ordres de grandeur ; les chefs de piste les adaptent à chaque épreuve.", [
        "Une combinaison à une foulée : environ 7,50 m à 8 m.",
        "Une combinaison à deux foulées : environ 10,50 m à 11 m.",
        "Une ligne plus longue : on ajoute environ 3,50 m à 3,70 m par foulée supplémentaire.",
        "Pour les poneys, les distances sont plus courtes, selon leur taille."
      ]),
      S("🔧 Ce qui fait varier la distance", null, [
        "Le profil des obstacles : vertical, oxer, triple barre.",
        "Le lieu : en manège, les foulées sont plus courtes qu'en extérieur.",
        "Le terrain : une montée raccourcit la foulée, une descente l'allonge.",
        "Le sol : profond, il raccourcit les foulées.",
        "Le sens : vers la sortie ou vers l'écurie, beaucoup de chevaux allongent."
      ]),
      E("💡", "Le savais-tu ?", "Les chefs de piste jouent volontairement avec les distances : une ligne un peu longue ou un peu courte oblige le cavalier à régler son cheval, et c'est ce qui fait la difficulté d'un parcours.")
    ]),

    B("Utiliser les distances", [
      S("🚶 À la reconnaissance", null, [
        "Marche chaque distance importante, à grands pas réguliers : environ quatre pas d'homme pour une foulée de cheval.",
        "Compare ce que tu mesures au repère du tableau : la distance est-elle normale, longue ou courte ?",
        "Décide comment tu vas la monter : galop plus ample, galop plus court, nombre de foulées."
      ]),
      S("🐴 Selon ton cheval", null, [
        "Un cheval à grande foulée trouvera les distances courtes : il faudra le raccourcir.",
        "Un cheval à petite foulée trouvera les distances longues : il faudra l'allonger tôt.",
        "Connaître la foulée naturelle de ton cheval, c'est savoir d'avance où tu devras agir."
      ]),
      E("👨‍🏫", "Le conseil du coach", "À l'entraînement, pose deux obstacles à une distance que tu as mesurée toi-même, puis compte tes foulées. En quelques séances, tu sauras à quoi ressemble « une foulée de ton cheval » sur le terrain.")
    ]),

    B("Le parcours Amateur", [
      S("🏁 Ce qui t'attend", null, [
        "Un parcours de niveau Amateur, avec des lignes, des combinaisons, des tournants serrés et des profils variés.",
        "Les cotes des obstacles (hauteur, largeur) sont fixées par le règlement CSO de la saison : ton enseignant te dit ce qu'il prévoit.",
        "Le Galop 9 ouvre l'accès aux compétitions Amateur et Pro, selon le règlement des épreuves."
      ]),
      S("🎯 Ta préparation", null, [
        "Reconnaissance à pied : tracé, distances, changements de pied.",
        "Détente sur le plat, puis sur un vertical et un oxer au paddock.",
        "Pendant le parcours : la cadence, le tracé choisi, et ton plan de foulées."
      ]),
      E("🔭", "Pour aller plus loin", "Les distances des combinaisons varient aussi selon le niveau : plus l'épreuve est haute, plus les obstacles sont larges et plus les distances sont précises à monter.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Marcher les distances à petits pas irréguliers.",
        "Oublier que le manège ou une montée raccourcit les foulées.",
        "Découvrir pendant le parcours qu'une distance est longue.",
        "Croire que les repères du tableau s'appliquent tels quels à tous les chevaux."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu sais utiliser les distances.", [
        "Marche trois distances d'un parcours et dis, pour chacune, si elle est normale, longue ou courte.",
        "Explique comment tu vas monter chacune avec ton cheval.",
        "Enchaîne le parcours en respectant ton plan."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment marcher une distance à la reconnaissance ?",
        "Quelle distance pour une combinaison à une foulée ?",
        "Pourquoi les distances sont-elles plus courtes en manège ?",
        "Comment monter une distance longue ?",
        "Quels concours puis-je faire avec le Galop 9 ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Une foulée : environ 3,50 à 3,70 m.",
        "Une foulée de cheval : environ quatre pas d'homme.",
        "Manège, montée, sol profond : plus court.",
        "Comparer au tableau, puis décider.",
        "Les cotes : celles du règlement de la saison."
      ]),
      E("", "", "Une distance bien lue à pied, c'est une ligne réussie à cheval.")
    ])
  ],
  lexique: { fr: [
    ["Tableau des distances", "Tableau des distances habituelles entre obstacles, selon leur type et le nombre de foulées."],
    ["Combinaison", "Deux ou trois obstacles rapprochés, séparés d'une ou deux foulées, qui se sautent comme un seul ensemble."],
    ["Distance longue", "Distance plus grande que la normale, qui demande d'allonger."],
    ["Distance courte", "Distance plus petite que la normale, qui demande de raccourcir."],
    ["Chef de piste", "Personne qui dessine et construit le parcours."]
  ] },
  quiz: [
    Q("Quel est un repère courant pour une combinaison à une foulée ?", ["Environ 4 m", "Environ 12 m", "Environ 20 m", "Environ 7,50 m à 8 m"], 3, "Environ 7,50 m à 8 m pour un cheval, à adapter selon les obstacles et le terrain."),
    Q("Combien ajoute-t-on environ par foulée supplémentaire ?", ["1 m", "6 m", "Environ 3,50 m à 3,70 m", "10 m"], 2, "Une foulée de galop de parcours mesure environ 3,50 m à 3,70 m."),
    Q("Combien de pas d'homme font environ une foulée de cheval ?", ["Un", "Quatre", "Deux", "Huit"], 1, "À grands pas réguliers, environ quatre pas d'homme pour une foulée."),
    Q("En manège, les foulées sont…", ["Plus courtes", "Plus longues", "Identiques", "Irrégulières"], 0, "En manège, les chevaux ont des foulées plus courtes qu'en extérieur."),
    Q("Dans une montée, la foulée…", ["S'allonge", "Ne change pas", "Disparaît", "Se raccourcit"], 3, "Une montée raccourcit la foulée ; une descente l'allonge."),
    Q("Ton cheval a une petite foulée et la distance est longue. Que fais-tu ?", ["Je raccourcis", "J'allonge tôt", "Je ne fais rien", "Je m'arrête"], 1, "Un cheval à petite foulée doit être allongé tôt sur une distance longue."),
    Q("Pour les poneys, les distances sont…", ["Les mêmes que pour les chevaux", "Plus courtes, selon leur taille", "Plus longues", "Libres"], 1, "Les distances des poneys sont plus courtes, selon leur taille."),
    Q("Qui fixe les cotes d'un parcours Amateur ?", ["Le règlement CSO de la saison", "Le cavalier", "Le propriétaire", "Le public"], 0, "Les cotes sont fixées par le règlement CSO, qui peut changer chaque saison."),
    Q("Vers la sortie ou l'écurie, beaucoup de chevaux…", ["Raccourcissent", "S'arrêtent", "Allongent leurs foulées", "Changent d'allure"], 2, "Le sens du parcours compte : vers la sortie, beaucoup de chevaux allongent."),
    Q("Qu'est-ce qu'une combinaison ?", ["Un seul obstacle large", "Un tour d'honneur", "Une barre au sol", "Deux ou trois obstacles rapprochés, sautés comme un ensemble"], 3, "Deux ou trois obstacles séparés d'une ou deux foulées, qui forment un ensemble.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-15 — CCE AMATEUR 1   (programme FFE Galop 9, spécifique cross : utiliser son équilibre pour varier l'abord et intervenir sur celui
   de sa monture ; adapter l'abord, l'amplitude et le tracé dans les enchaînements et les combinaisons ; optimiser tracé et vitesse
   selon le temps accordé, les difficultés et l'effort du cheval)
   — À VÉRIFIER par Blandine : niveau Amateur 1
   --------------------------------------------------------------------------------- */
{ id: "g9n-15", icone: "🌲", type: { fr: "pratique" }, duree: { fr: "11 min" }, titre: { fr: "CCE Amateur 1" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-c12-cross.webp", couv: {} },

    B("Intervenir sur l'abord", [
      P("Au Galop 9, en cross, tu ne te contentes plus de rester en équilibre : tu utilises ton équilibre pour intervenir sur l'abord de ton cheval, l'adapter à chaque obstacle, et gérer ton parcours contre la montre."),
      S("⚖️ Ton équilibre, ton outil", null, [
        { gras: "Pour allonger :", texte: "en équilibre, le poids dans les talons, buste avancé, mains qui accompagnent : le cheval peut ouvrir son galop." },
        { gras: "Pour raccourcir et équilibrer :", texte: "buste redressé, assiette plus proche de la selle, sans t'asseoir lourdement : le cheval se remet sur ses postérieurs." },
        { gras: "Pour soutenir :", texte: "jambes au contact, actives, pour garder l'impulsion jusqu'à l'obstacle." },
        "Tu agis tôt, plusieurs foulées avant l'obstacle, pour que l'abord soit calme."
      ]),
      E("💡", "Le savais-tu ?", "En cross, les cavaliers expérimentés « rééquilibrent » leur cheval une dizaine de foulées avant un obstacle technique, puis le laissent faire : plus l'intervention est tôt, moins elle se voit.")
    ]),

    B("Les enchaînements et les combinaisons", [
      S("🔀 Adapter abord, amplitude et tracé", null, [
        "Dans une combinaison, l'abord du premier élément décide de tout : une amplitude juste et un cheval droit.",
        "Entre deux éléments, garde le cheval sur la ligne choisie : un regard vers l'élément suivant dès la réception.",
        "Sur les angles et les obstacles étroits, ton tracé doit être précis à quelques centimètres près.",
        "Sur les contrebas et dans l'eau, l'amplitude se raccourcit ; sur les obstacles larges, elle s'ouvre."
      ]),
      S("🌊 Les combinaisons typiques", null, [
        "Entrée et sortie d'eau, avec un obstacle dans l'eau.",
        "Fossé suivi d'un obstacle droit.",
        "Contrebas suivi d'un obstacle étroit.",
        "Deux angles enchaînés."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour chaque combinaison, prévois aussi l'option : le passage plus long et plus facile que la plupart des cross proposent. Si ton cheval hésite, la prendre n'est pas un échec, c'est une décision.")
    ]),

    B("Optimiser le tracé et la vitesse", [
      S("⏱️ Le temps accordé", null, [
        "Chaque cross a un temps accordé, calculé d'après la longueur du parcours et la vitesse demandée par le règlement.",
        "Les pénalités de temps commencent dès que tu le dépasses.",
        "Repère sur le parcours des points intermédiaires, avec le temps où tu dois y passer."
      ]),
      S("📐 Gagner du temps sans prendre de risque", null, [
        "Le tracé le plus court entre les obstacles, sans couper au détriment de l'abord.",
        "Une vitesse régulière sur les parties de galop, plutôt que des accélérations brusques.",
        "Ralentir avant les obstacles techniques, relancer tout de suite après.",
        "Ménager l'effort du cheval : il doit finir le parcours avec de l'énergie."
      ]),
      E("⚠️", "La sécurité", "La vitesse ne prime jamais sur le contrôle. Un cheval fatigué fait des fautes : s'il s'essouffle, ralentis, quitte à prendre des pénalités de temps.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Rééquilibrer le cheval à la dernière foulée.",
        "Couper un tournant au point d'aborder en biais sans l'avoir décidé.",
        "Galoper très vite au début et finir avec un cheval épuisé.",
        "Oublier de reconnaître les options."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu es prêt pour le CCE Amateur 1.", [
        "Enchaîne un obstacle large et un contrebas en adaptant ton équilibre à chacun.",
        "Saute une combinaison d'eau ou de fossé sur le tracé choisi à pied.",
        "Fais un parcours de cross en passant à tes points intermédiaires à l'heure prévue."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment calculer mes temps intermédiaires en cross ?",
        "Quand rééquilibrer mon cheval avant un obstacle ?",
        "Comment aborder une entrée d'eau ?",
        "Faut-il prendre l'option ?",
        "Comment ménager mon cheval pendant un cross ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Ton équilibre règle l'abord, tôt.",
        "Combinaisons : premier abord, ligne tenue.",
        "Tracé court, vitesse régulière.",
        "Ralentir avant, relancer après.",
        "Le contrôle avant la vitesse."
      ]),
      E("", "", "Un bon cross, c'est un cheval qui finit le parcours avec l'envie d'en faire un autre.")
    ])
  ],
  lexique: { fr: [
    ["Temps accordé", "Temps maximum pour faire le parcours sans pénalité."],
    ["Temps intermédiaire", "Temps prévu pour passer à un point du parcours."],
    ["Option", "Passage plus long et plus facile proposé sur certains obstacles de cross."],
    ["Combinaison de cross", "Plusieurs éléments rapprochés, jugés comme un seul obstacle."],
    ["Rééquilibrer", "Ramener le poids du cheval vers l'arrière avant un obstacle."]
  ] },
  quiz: [
    Q("Pour raccourcir et équilibrer ton cheval avant un obstacle technique, tu…", ["Te couches sur l'encolure", "Lâches les rênes", "Redresses le buste, assiette plus proche de la selle", "Accélères"], 2, "Le buste redressé aide le cheval à revenir sur ses postérieurs."),
    Q("Quand interviens-tu sur l'abord ?", ["À la dernière foulée", "Après le saut", "Tôt, plusieurs foulées avant l'obstacle", "Jamais"], 2, "Une intervention précoce donne un abord calme."),
    Q("Dans une combinaison, qu'est-ce qui décide de tout ?", ["Le dernier élément", "L'abord du premier élément", "La couleur des obstacles", "Le public"], 1, "Une amplitude juste et un cheval droit au premier élément conditionnent la suite."),
    Q("Sur un contrebas, l'amplitude…", ["S'ouvre", "Ne compte pas", "Se raccourcit", "Est maximale"], 2, "Sur les contrebas et dans l'eau, l'amplitude se raccourcit."),
    Q("Que fais-tu juste après un obstacle technique ?", ["Je marche", "Je m'arrête", "Je reste au trot", "Je relance tout de suite"], 3, "Ralentir avant, relancer tout de suite après : c'est ce qui fait gagner du temps."),
    Q("Qu'est-ce qu'une option en cross ?", ["Un obstacle obligatoire", "Un passage plus long et plus facile", "Une pénalité", "Un raccourci interdit"], 1, "L'option est un passage plus long et plus facile, proposé sur certains obstacles."),
    Q("Que sont les temps intermédiaires ?", ["Des pauses", "Les temps de détente", "Les temps prévus pour passer à certains points du parcours", "Les temps des autres cavaliers"], 2, "Ils te permettent de vérifier ta vitesse pendant le parcours."),
    Q("À partir de quand comptent les pénalités de temps ?", ["Après 10 minutes", "Jamais en Amateur", "Seulement au barrage", "Dès que tu dépasses le temps accordé"], 3, "Les pénalités de temps commencent dès que le temps accordé est dépassé."),
    Q("Comment gagner du temps sans risque ?", ["Tracé court, vitesse régulière, relancer après les obstacles", "Galoper au maximum partout", "Couper tous les tournants", "Sauter en biais partout"], 0, "Un tracé court et une vitesse régulière font gagner plus de temps que des accélérations brusques."),
    Q("Ton cheval s'essouffle. Que fais-tu ?", ["Je ralentis, quitte à prendre des pénalités de temps", "J'accélère pour finir", "Je saute plus haut", "Je ne change rien"], 0, "Le contrôle et la santé du cheval passent avant le chronomètre.")
  ]
}
,

/* ---------------------------------------------------------------------------------
   g9n-16 — L'ÉCOLE FRANÇAISE D'ÉQUITATION ET SES AUTEURS   (programme FFE Galop 9, connaissances générales :
   l'École française, de Pluvinel à La Guérinière, le comte d'Aure, Baucher et le général L'Hotte)
   — pas de doublon avec g8n-18 : ici, la filiation et l'héritage (Versailles, Saumur, Cadre Noir, UNESCO)
   --------------------------------------------------------------------------------- */
{ id: "g9n-16", icone: "🎓", type: { fr: "culture" }, duree: { fr: "10 min" }, titre: { fr: "L'École française d'équitation et ses auteurs" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-connaissances.webp", couv: {} },

    B("Ce qu'on appelle l'École française", [
      P("Au Galop 8, tu as découvert les grands auteurs de l'équitation. Au Galop 9, tu comprends comment, en France, leurs idées se sont transmises de maître en élève pendant quatre siècles, pour former ce qu'on appelle l'École française d'équitation."),
      S("🇫🇷 Ses grandes idées", null, [
        "La recherche de la légèreté : un cheval qui répond à des aides de plus en plus discrètes.",
        "Le respect du cheval, travaillé par la douceur et la compréhension plutôt que par la force.",
        "L'harmonie entre le cavalier et le cheval.",
        "Une équitation à la fois savante, au manège, et pratique, en extérieur."
      ]),
      E("💡", "Le savais-tu ?", "En 2011, « l'équitation de tradition française » a été inscrite par l'UNESCO au patrimoine culturel immatériel de l'humanité.")
    ]),

    B("De Pluvinel à L'Hotte", [
      S("🏰 Les fondateurs", null, [
        { gras: "Antoine de Pluvinel (XVIIe siècle) :", texte: "considéré comme le premier maître de l'École française. Il enseigne aux jeunes nobles une équitation plus douce que celle de l'école italienne." },
        { gras: "François Robichon de La Guérinière (XVIIIe siècle) :", texte: "à l'époque où l'équitation de cour brille à Versailles, il écrit « École de cavalerie », qui fixe les bases de l'équitation classique, toujours enseignée dans le monde entier." }
      ]),
      S("⚔️ Le XIXe siècle : deux visions", null, [
        { gras: "Le comte d'Aure :", texte: "écuyer en chef à Saumur, il défend une équitation d'extérieur, en avant, pratique, adaptée à la cavalerie et à la chasse." },
        { gras: "François Baucher :", texte: "écuyer de cirque, il développe une équitation savante, qui cherche la légèreté par l'assouplissement du cheval. Ses idées font débat à son époque." },
        { gras: "Le général L'Hotte :", texte: "élève des deux, il réunit leurs apports. Écuyer en chef à Saumur, il résume l'équitation en trois mots : « calme, en avant et droit »." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Pour retenir la filiation, pense à une ligne du temps : Pluvinel pose les bases, La Guérinière les écrit, d'Aure et Baucher s'opposent, L'Hotte les réunit.")
    ]),

    B("L'héritage aujourd'hui", [
      S("🎩 Le Cadre Noir de Saumur", null, [
        "Né au XIXe siècle, avec les écuyers de l'école de cavalerie de Saumur.",
        "Ses écuyers, en tenue noire, enseignent et présentent l'équitation de tradition française dans le monde entier.",
        "Il fait aujourd'hui partie de l'Institut français du cheval et de l'équitation (IFCE)."
      ]),
      S("🔗 Dans tes Galops", null, [
        "L'épaule en dedans de La Guérinière.",
        "Le « calme, en avant et droit » de L'Hotte, que tu retrouves dans l'échelle de progression.",
        "La recherche de la légèreté, dans chaque transition."
      ]),
      E("🔭", "Pour aller plus loin", "D'autres pays ont leur propre tradition, comme l'École espagnole de Vienne ou l'École portugaise d'art équestre. Elles partagent avec l'École française une même source : l'équitation classique de la Renaissance.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Penser que l'École française n'est qu'une affaire de haute école : elle concerne aussi l'équitation d'extérieur.",
        "Confondre les époques : Pluvinel au XVIIe, La Guérinière au XVIIIe, d'Aure, Baucher et L'Hotte au XIXe.",
        "Croire que le Cadre Noir est un club : c'est le corps des écuyers de l'École nationale d'équitation, au sein de l'IFCE."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais l'École française.", [
        "Place sur une ligne du temps Pluvinel, La Guérinière, d'Aure, Baucher et L'Hotte.",
        "Explique la différence entre l'équitation du comte d'Aure et celle de Baucher.",
        "Cite deux choses de l'École française que tu utilises dans tes séances."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qu'est-ce que l'équitation de tradition française ?",
        "Pourquoi d'Aure et Baucher s'opposaient-ils ?",
        "Qu'est-ce que le Cadre Noir ?",
        "Que veut dire la légèreté en équitation ?",
        "Qu'est-ce que l'École espagnole de Vienne ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Pluvinel, La Guérinière, d'Aure, Baucher, L'Hotte.",
        "Légèreté, douceur, harmonie.",
        "« Calme, en avant et droit ».",
        "Cadre Noir de Saumur, au sein de l'IFCE.",
        "UNESCO, 2011."
      ]),
      E("", "", "Chaque fois que tu cherches la légèreté, tu prolonges quatre siècles d'École française.")
    ])
  ],
  lexique: { fr: [
    ["École française", "Tradition d'équitation française, transmise depuis Pluvinel, qui recherche la légèreté et l'harmonie."],
    ["Légèreté", "Qualité d'un cheval qui répond à des aides très discrètes."],
    ["Cadre Noir", "Corps des écuyers de l'École nationale d'équitation, à Saumur."],
    ["IFCE", "Institut français du cheval et de l'équitation."],
    ["Patrimoine culturel immatériel", "Traditions vivantes reconnues et protégées par l'UNESCO."]
  ] },
  quiz: [
    Q("Qui est considéré comme le premier maître de l'École française ?", ["Baucher", "Antoine de Pluvinel", "Caprilli", "Xénophon"], 1, "Pluvinel, au XVIIe siècle, est considéré comme le premier maître de l'École française."),
    Q("Qui a écrit « École de cavalerie » ?", ["L'Hotte", "D'Aure", "La Guérinière", "Pluvinel"], 2, "La Guérinière, au XVIIIe siècle."),
    Q("Quelle école étrangère partage avec l'École française une même source classique ?", ["L'école western", "Le polo argentin", "L'École espagnole de Vienne", "Le horse-ball"], 2, "L'École espagnole de Vienne et l'École portugaise d'art équestre viennent aussi de l'équitation classique de la Renaissance."),
    Q("Quelle équitation défendait le comte d'Aure ?", ["Uniquement la haute école", "Une équitation d'extérieur, en avant et pratique", "L'équitation western", "Le saut d'obstacles moderne"], 1, "Le comte d'Aure défendait une équitation d'extérieur, pratique."),
    Q("Qu'est-ce que la légèreté ?", ["Un cheval maigre", "Un cheval rapide", "Un cheval sans selle", "Un cheval qui répond à des aides très discrètes"], 3, "La légèreté est au cœur de l'École française."),
    Q("Que cherchait Baucher ?", ["La légèreté par l'assouplissement", "La vitesse", "La force", "Le saut"], 0, "Baucher cherchait la légèreté par l'assouplissement du cheval."),
    Q("Qui a réuni les apports de d'Aure et de Baucher ?", ["Pluvinel", "Le général L'Hotte", "La Guérinière", "Caprilli"], 1, "L'Hotte, élève des deux, a réuni leurs apports."),
    Q("En quelle année l'équitation de tradition française est-elle inscrite à l'UNESCO ?", ["2011", "1921", "1987", "2024"], 0, "En 2011, au patrimoine culturel immatériel de l'humanité."),
    Q("Dans quel organisme se trouve aujourd'hui le Cadre Noir ?", ["L'IFCE", "La FEI", "France Galop", "Une association privée"], 0, "Le Cadre Noir fait partie de l'Institut français du cheval et de l'équitation."),
    Q("Quelle est la grande idée de l'École française ?", ["La légèreté et l'harmonie", "La force", "La vitesse", "La hauteur"], 0, "Légèreté, douceur et harmonie entre cavalier et cheval.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-17 — LES INSTITUTIONS DE L'ÉQUITATION ET DE L'ÉLEVAGE   (programme FFE Galop 9, connaissances générales :
   environnement institutionnel ; histoire de la FFE ; FNSE et FEI en 1921, le baron du Teil)
   — À VÉRIFIER par Blandine : dates et noms des fédérations d'origine
   --------------------------------------------------------------------------------- */
{ id: "g9n-17", icone: "🏛️", type: { fr: "culture" }, duree: { fr: "10 min" }, titre: { fr: "Les institutions de l'équitation et de l'élevage" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-theme-cheval.webp", couv: {} },

    B("1921 : la naissance des fédérations", [
      P("Au Galop 9, tu connais les organismes qui encadrent l'équitation et l'élevage en France et dans le monde, et l'histoire de ta fédération."),
      S("📜 Une année clé", null, [
        "En juin 1921 naît en France la Fédération nationale des sports équestres (FNSE).",
        "En novembre 1921 naît la Fédération équestre internationale (FEI), à l'initiative d'un Français, le baron du Teil.",
        "Pour la première fois, les règles des compétitions sont communes à plusieurs pays."
      ]),
      E("💡", "Le savais-tu ?", "La FEI a été créée par huit pays seulement. Elle en réunit aujourd'hui plus de 130, et organise les championnats du monde et les épreuves des Jeux olympiques.")
    ]),

    B("La Fédération française d'équitation", [
      S("🏇 Son histoire", null, [
        "Au fil du XXe siècle, l'équitation se développe en trois mondes : le sport, le tourisme équestre et les poney-clubs, chacun avec sa fédération.",
        "En 1987, ils se réunissent dans une seule fédération : la Fédération française d'équitation (FFE).",
        "Elle a son siège au Parc équestre fédéral de Lamotte-Beuvron."
      ]),
      S("🧭 Ses missions", null, [
        "Organiser les compétitions et délivrer les licences.",
        "Définir l'enseignement : les Galops, les diplômes, l'échelle de progression.",
        "Accompagner les clubs, avec les labels de qualité.",
        "Préparer les équipes de France."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Ton espace cavalier sur le site de la FFE contient ta licence, tes Galops et tes résultats : apprends à t'en servir, c'est ton dossier de cavalier.")
    ]),

    B("Les autres organismes", [
      S("🐎 L'élevage et l'État", null, [
        { gras: "Le ministère de l'Agriculture :", texte: "il encadre l'élevage, la santé et l'identification des chevaux." },
        { gras: "Le ministère des Sports :", texte: "il délègue à la FFE l'organisation du sport équestre." },
        { gras: "L'IFCE :", texte: "l'Institut français du cheval et de l'équitation, né en 2010 de la réunion des Haras nationaux et de l'École nationale d'équitation. Il tient le fichier SIRE et abrite le Cadre Noir." },
        { gras: "Les associations de race :", texte: "elles tiennent les stud-books et organisent la sélection." }
      ]),
      S("🏁 Le sport et les courses", null, [
        { gras: "La Société hippique française (SHF) :", texte: "elle organise les épreuves des jeunes chevaux de sport." },
        { gras: "France Galop et LeTrot :", texte: "elles organisent les courses au galop et au trot." },
        { gras: "Le Comité national olympique et sportif français :", texte: "il réunit toutes les fédérations olympiques, dont la FFE." }
      ]),
      E("🔭", "Pour aller plus loin", "Tu peux suivre les décisions de ces organismes sur leurs sites : règlements de la FFE, programme des Jeux sur celui de la FEI, informations sanitaires sur celui de l'IFCE.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Confondre la FFE (française) et la FEI (internationale).",
        "Croire que la FFE existe depuis 1921 : c'est la FNSE qui naît en 1921, la FFE en 1987.",
        "Penser que l'IFCE s'occupe des compétitions : il s'occupe surtout de l'élevage, de l'identification, de la recherche et de la formation."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais les institutions.", [
        "Raconte en quelques phrases l'histoire de ta fédération, de 1921 à aujourd'hui.",
        "Pour chaque organisme cité, donne une de ses missions.",
        "Retrouve, sur le livret d'un cheval, l'organisme qui l'a identifié."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Qui était le baron du Teil ?",
        "Que fait la FEI ?",
        "Qu'est-ce que l'IFCE ?",
        "Que fait la SHF ?",
        "À quoi sert ma licence FFE ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "1921 : FNSE en France, FEI dans le monde.",
        "Le baron du Teil, à l'origine de la FEI.",
        "1987 : la FFE réunit sport, tourisme et poney-clubs.",
        "IFCE : élevage, SIRE, Cadre Noir.",
        "SHF, France Galop, LeTrot, CNOSF."
      ]),
      E("", "", "Derrière chaque concours, chaque Galop et chaque poulain enregistré, il y a une institution qui veille.")
    ])
  ],
  lexique: { fr: [
    ["FEI", "Fédération équestre internationale, créée en 1921."],
    ["FNSE", "Fédération nationale des sports équestres, créée en 1921 en France."],
    ["FFE", "Fédération française d'équitation, créée en 1987."],
    ["IFCE", "Institut français du cheval et de l'équitation, créé en 2010."],
    ["CNOSF", "Comité national olympique et sportif français."]
  ] },
  quiz: [
    Q("En quelle année naissent la FNSE et la FEI ?", ["1912", "1987", "2010", "1921"], 3, "Les deux naissent en 1921, en juin et en novembre."),
    Q("Combien de pays ont créé la FEI ?", ["Deux", "Cinquante", "Cent", "Huit"], 3, "La FEI a été créée par huit pays ; elle en réunit aujourd'hui plus de 130."),
    Q("Qui est à l'origine de la FEI ?", ["La Guérinière", "Le baron du Teil", "Le comte d'Aure", "Pierre de Coubertin"], 1, "La FEI a été créée à l'initiative du Français baron du Teil."),
    Q("En quelle année naît la FFE ?", ["1921", "1952", "2010", "1987"], 3, "La FFE naît en 1987 de la réunion du sport, du tourisme équestre et des poney-clubs."),
    Q("Où se trouve le siège de la FFE ?", ["À Saumur", "À Paris, place de la Concorde", "Au Parc équestre fédéral de Lamotte-Beuvron", "À Lausanne"], 2, "La FFE a son siège au Parc équestre fédéral, à Lamotte-Beuvron."),
    Q("De quelle réunion est né l'IFCE ?", ["Des Haras nationaux et de l'École nationale d'équitation", "De la FFE et de la FEI", "De France Galop et LeTrot", "Des clubs parisiens"], 0, "L'IFCE est né en 2010 de la réunion des Haras nationaux et de l'École nationale d'équitation."),
    Q("Quel ministère encadre l'élevage et l'identification des chevaux ?", ["Le ministère de la Culture", "Le ministère des Transports", "Le ministère de la Justice", "Le ministère de l'Agriculture"], 3, "Le ministère de l'Agriculture encadre l'élevage, la santé et l'identification."),
    Q("Quel organisme tient le fichier SIRE ?", ["La FFE", "La FEI", "L'IFCE", "La SHF"], 2, "Le fichier central des équidés, le SIRE, est tenu par l'IFCE."),
    Q("Qui organise les courses au trot ?", ["France Galop", "La FFE", "LeTrot", "La SHF"], 2, "LeTrot organise les courses au trot ; France Galop, les courses au galop."),
    Q("Que fait la SHF ?", ["Elle délivre les Galops", "Elle organise les épreuves des jeunes chevaux de sport", "Elle organise les Jeux olympiques", "Elle tient les stud-books de toutes les races"], 1, "La Société hippique française organise les épreuves des jeunes chevaux.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-18 — LE HAUT NIVEAU : ORGANISATION ET FILIÈRES   (programme FFE Galop 9, connaissances générales : accès au haut niveau,
   statut de sportif de haut niveau, critères par olympiade, document « Saison sportive », groupes cibles fédéraux)
   — À VÉRIFIER par Blandine : vocabulaire fédéral en vigueur (listes, groupes)
   --------------------------------------------------------------------------------- */
{ id: "g9n-18", icone: "🥇", type: { fr: "culture" }, duree: { fr: "9 min" }, titre: { fr: "Le haut niveau : organisation et filières" },
  blocs: [
    { type: "couv-affiche", src: "images/galop5-video-saut.webp", couv: {} },

    B("Le sportif de haut niveau", [
      P("Au Galop 9, tu sais comment s'organise l'accès au haut niveau. Les meilleurs cavaliers français ont un statut reconnu par l'État, et la fédération les accompagne vers les grandes échéances."),
      S("🏅 Le statut de sportif de haut niveau", null, [
        "Il est reconnu par le ministère des Sports, sur proposition de la FFE.",
        "Le cavalier est inscrit sur une liste officielle, dans une catégorie selon son niveau.",
        "Les critères sont fixés pour une olympiade, la période de quatre ans entre deux Jeux olympiques.",
        "Ce statut donne des droits : aménagement des études ou du travail, aides, suivi médical."
      ]),
      E("💡", "Le savais-tu ?", "En équitation, le haut niveau se joue en couple : un cavalier peut perdre sa place si son cheval se blesse ou est vendu. C'est l'un des rares sports où l'athlète dépend autant d'un partenaire.")
    ]),

    B("Comment la fédération organise le haut niveau", [
      S("📘 La « Saison sportive »", null, [
        "Chaque saison, la FFE publie un document qui présente ses objectifs, ses échéances et ses critères de sélection.",
        "On y trouve les championnats visés, les circuits de sélection, et la façon dont les couples sont choisis."
      ]),
      S("🎯 Les groupes cibles", null, [
        "Pour chaque discipline, la fédération classe les couples dans des groupes, selon leurs résultats et leur potentiel.",
        "Ces groupes déterminent l'accompagnement : stages, entraîneurs, sélections en équipe de France.",
        "Un couple peut changer de groupe d'une saison à l'autre, selon ses résultats."
      ]),
      S("🌱 Les filières", null, [
        "Les jeunes cavaliers commencent souvent dans les circuits Poney, puis Amateur et Pro.",
        "Des championnats par âge (enfants, juniors, jeunes cavaliers) préparent au haut niveau international.",
        "Des structures d'entraînement accueillent les espoirs, en lien avec leur scolarité."
      ]),
      E("👨‍🏫", "Le conseil du coach", "Le haut niveau commence par la régularité : des résultats répétés au même niveau valent plus aux yeux des sélectionneurs qu'un seul exploit.")
    ]),

    B("Les grandes échéances", [
      S("🌍 Le calendrier international", null, [
        "Les Jeux olympiques, tous les quatre ans, en saut d'obstacles, dressage et concours complet.",
        "Les championnats du monde et d'Europe.",
        "Les Coupes des nations, où chaque pays présente une équipe.",
        "Les grands circuits internationaux, pour les cavaliers professionnels."
      ]),
      E("🔭", "Pour aller plus loin", "Les sports équestres paralympiques (para-dressage) font aussi partie du haut niveau, avec leurs propres sélections et leurs propres championnats.")
    ]),

    B("Les erreurs et l'entraînement", [
      S("⚠️ Les erreurs à éviter", null, [
        "Croire qu'un seul bon résultat suffit pour entrer en équipe de France.",
        "Confondre la liste des sportifs de haut niveau (décidée par l'État) et les groupes cibles (décidés par la fédération).",
        "Oublier que les critères changent à chaque olympiade."
      ]),
      S("🏇 Le défi du cavalier", "Montre à ton enseignant que tu connais l'organisation du haut niveau.", [
        "Explique ce qu'est une olympiade et pourquoi les critères en dépendent.",
        "Cherche le document « Saison sportive » de ta discipline sur le site de la FFE et dis ce qu'il contient.",
        "Cite trois grandes échéances internationales."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment devient-on sportif de haut niveau en équitation ?",
        "Qu'est-ce qu'une olympiade ?",
        "Qu'est-ce qu'une Coupe des nations ?",
        "Comment sont sélectionnées les équipes de France ?",
        "Qu'est-ce que le para-dressage ?"
      ]),
      S("⚡ La synthèse en 10 secondes", null, [
        "Statut reconnu par le ministère des Sports.",
        "Critères fixés pour une olympiade.",
        "« Saison sportive » : objectifs et sélections.",
        "Groupes cibles : l'accompagnement fédéral.",
        "Le haut niveau se joue en couple."
      ]),
      E("", "", "Tous les champions ont commencé par un Galop 1.")
    ])
  ],
  lexique: { fr: [
    ["Sportif de haut niveau", "Statut reconnu par l'État aux meilleurs sportifs, inscrits sur une liste officielle."],
    ["Olympiade", "Période de quatre ans entre deux Jeux olympiques."],
    ["Saison sportive", "Document annuel de la FFE qui présente objectifs, échéances et critères de sélection."],
    ["Groupes cibles", "Classement fédéral des couples selon leurs résultats et leur potentiel."],
    ["Coupe des nations", "Compétition par équipes de pays."]
  ] },
  quiz: [
    Q("Qui reconnaît le statut de sportif de haut niveau ?", ["Le club", "La FEI seule", "Le propriétaire du cheval", "Le ministère des Sports, sur proposition de la FFE"], 3, "Le statut est reconnu par le ministère des Sports, sur proposition de la fédération."),
    Q("Quels droits peut donner le statut de sportif de haut niveau ?", ["Un cheval gratuit", "Aménagement des études ou du travail, aides, suivi médical", "Aucun", "Le droit de ne pas faire de concours"], 1, "Le statut donne notamment des aménagements, des aides et un suivi médical."),
    Q("Qu'est-ce qu'une olympiade ?", ["Une épreuve des Jeux", "Un championnat d'Europe", "La période de quatre ans entre deux Jeux olympiques", "Une équipe"], 2, "Les critères de haut niveau sont fixés pour une olympiade."),
    Q("Que contient le document « Saison sportive » ?", ["Les prix des chevaux", "Les objectifs, échéances et critères de sélection", "Les résultats du club", "Le règlement intérieur"], 1, "La FFE y présente ses objectifs, ses échéances et ses critères de sélection."),
    Q("À quoi servent les groupes cibles ?", ["À organiser l'accompagnement fédéral des couples", "À classer les chevaux par robe", "À choisir les juges", "À fixer le prix des licences"], 0, "Ils déterminent stages, entraînement et sélections."),
    Q("Pourquoi dit-on que le haut niveau se joue en couple ?", ["Parce qu'on monte à deux", "Parce que c'est une règle olympique", "Parce que le cavalier dépend de son cheval", "Parce qu'il faut un entraîneur"], 2, "Un cavalier peut perdre sa place si son cheval se blesse ou est vendu."),
    Q("Quelles disciplines équestres sont aux Jeux olympiques ?", ["Saut d'obstacles, dressage, concours complet", "Polo, endurance, voltige", "Attelage, reining, horse-ball", "Courses au galop"], 0, "Le saut d'obstacles, le dressage et le concours complet sont olympiques."),
    Q("Quelle discipline paralympique existe en équitation ?", ["Le para-polo", "Le para-dressage", "Le para-cross", "Aucune"], 1, "Le para-dressage fait partie du haut niveau, avec ses propres championnats."),
    Q("Qu'est-ce qu'une Coupe des nations ?", ["Une compétition par équipes de pays", "Un trophée de club", "Un concours d'élevage", "Une course hippique"], 0, "Chaque pays y présente une équipe."),
    Q("Qu'est-ce qui compte le plus pour les sélectionneurs ?", ["Un seul exploit", "La couleur du cheval", "Le prix du cheval", "La régularité des résultats"], 3, "Des résultats réguliers au même niveau comptent plus qu'un seul exploit.")
  ]
},

/* ---------------------------------------------------------------------------------
   g9n-19 — L'EXAMEN DU GALOP 9   (comme g7n-16 et g8n-20)
   — 07/11 : niveaux vérifiés dans le programme FFE (dressage Amateur 1 GP, CSO « niveau Amateur », CCE Amateur 1) ; À VÉRIFIER : partie commune
   --------------------------------------------------------------------------------- */
{ id: "g9n-19", icone: "🏆", type: { fr: "culture" }, duree: { fr: "8 min" }, titre: { fr: "L'examen du Galop 9" },
  blocs: [
    { type: "couv-affiche", src: "images/galop9-hero-alezan.webp", couv: {} },

    B("Comment se passe l'examen", [
      P("Le Galop 9 est le dernier Galop. Il vérifie que tu es un cavalier accompli : tu connais l'histoire et les institutions de l'équitation, tu sais entretenir la santé et la forme de ton cheval, tu le travailles finement à pied, et tu montes au niveau Amateur dans la discipline de ton choix : reprise Amateur 1 Grand Prix en dressage, parcours Amateur en CSO, ou CCE Amateur 1."),
      S("👩‍🏫 Qui le fait passer ?", null, [
        "Un enseignant diplômé, licencié à la FFE pour l'année en cours, avec un code examinateur qui l'autorise à valider le Galop 9.",
        "Il peut t'évaluer pendant une session d'examen, ou petit à petit, pendant tes cours et tes stages.",
        "Ton Galop 8 doit être validé avant ton Galop 9."
      ]),
      S("🧾 Ce qui est évalué", null, [
        "Les connaissances générales et la connaissance du cheval.",
        "S'occuper du cheval : bandes de travail, soins périodiques, pharmacie, constantes, tares.",
        "La pratique à pied : longues rênes, cavaletti, latéraux et travail autour des hanches.",
        "La pratique à cheval : la partie commune, puis une partie spécifique au choix, dressage, CSO ou concours complet."
      ]),
      E("💡", "Le savais-tu ?", "Une fois ton Galop validé, ton enseignant l'enregistre en ligne : il apparaît dans ton espace cavalier sur le site de la FFE, d'où tu peux imprimer ton diplôme.")
    ]),

    B("Choisir sa partie spécifique", [
      S("🎯 Trois chemins", null, [
        { gras: "Dressage :", texte: "poids et cadence, latéraux inversés, tournant sur les hanches au galop, zigzag, et une reprise Amateur 1." },
        { gras: "Saut d'obstacles :", texte: "abords selon les profils, tourner sur l'obstacle, tracés complexes, distances, et un parcours Amateur." },
        { gras: "Concours complet :", texte: "abords en cross, combinaisons, tracé et vitesse, et les trois tests du CCE Amateur 1." }
      ]),
      E("👨‍🏫", "Le conseil du coach", "Le Galop 9 se prépare sur une saison. Fixe avec ton enseignant un calendrier : les connaissances au fil des semaines, la partie à pied pendant l'hiver, la partie à cheval avec tes concours.")
    ]),

    B("Et après le Galop 9 ?", [
      S("🚀 Ce qui s'ouvre à toi", null, [
        "Les compétitions Amateur et Pro, selon le règlement des épreuves.",
        "Les tests d'entrée des diplômes d'enseignant et d'entraîneur, si tu veux transmettre ta passion.",
        "Les Galops de spécialité et les autres disciplines, pour continuer d'apprendre."
      ]),
      S("🏇 Le défi du cavalier", "Fais le point avant l'examen.", [
        "Liste les cours du Galop 9 où tu te sens à l'aise, et ceux à retravailler.",
        "Choisis ta partie spécifique et explique ton choix à ton enseignant.",
        "Refais tous les quiz du Galop 9 jusqu'à obtenir toutes les étoiles."
      ]),
      S("🤖 Demande à Hey Baby", null, [
        "Comment réviser mon Galop 9 ?",
        "Quelle partie spécifique choisir ?",
        "Que faire après le Galop 9 ?",
        "Comment devenir enseignant d'équitation ?",
        "Peut-on valider le Galop 9 en plusieurs fois ?"
      ]),
      E("", "", "Le Galop 9, ce n'est pas la fin de l'apprentissage : c'est le début d'une équitation que tu construis toi-même.")
    ])
  ],
  lexique: { fr: [
    ["Code examinateur", "Autorisation donnée par la FFE à un enseignant pour valider les Galops."],
    ["Partie commune", "Compétences à cheval évaluées pour tous, quelle que soit la discipline."],
    ["Partie spécifique", "Compétences propres à la discipline choisie : dressage, CSO ou concours complet."]
  ] },
  quiz: [
    Q("Le Galop 9 est…", ["Le premier Galop", "Un Galop poney", "Un diplôme d'enseignant", "Le dernier Galop"], 3, "Le Galop 9 est le dernier Galop du cursus fédéral."),
    Q("Quel Galop doit être validé avant le Galop 9 ?", ["Le Galop 6", "Le Galop 8", "Le Galop 7", "Aucun"], 1, "Le Galop 8 doit être validé avant le Galop 9."),
    Q("Quel niveau de reprise présentes-tu en dressage ?", ["Amateur 1 Grand Prix", "Club 2", "Pro Élite", "Poney 1"], 0, "Le programme demande une reprise de niveau Amateur 1 Grand Prix."),
    Q("Qui peut faire passer le Galop 9 ?", ["N'importe quel cavalier confirmé", "Un juge de CSO", "Le propriétaire du cheval", "Un enseignant diplômé, licencié FFE, avec un code examinateur"], 3, "Seul un enseignant diplômé, licencié et autorisé peut valider le Galop 9."),
    Q("Comment se prépare le Galop 9 ?", ["En une semaine", "Sur une saison, avec un calendrier fixé avec ton enseignant", "Seul, sans enseignant", "Sans cheval"], 1, "Connaissances au fil des semaines, travail à pied l'hiver, partie à cheval avec les concours."),
    Q("En concours complet, quel est le niveau demandé ?", ["CCE Club 3", "CCE Pro 1", "Aucun", "CCE Amateur 1"], 3, "Le programme demande un test de dressage, un parcours d'obstacles et un cross de niveau CCE Amateur 1."),
    Q("Pour la pratique à cheval, que présentes-tu ?", ["Les trois disciplines", "La partie commune et une partie spécifique au choix", "Seulement du dressage", "Seulement du cross"], 1, "La partie commune pour tous, puis une partie spécifique : dressage, CSO ou complet."),
    Q("Que t'ouvre le Galop 9 ?", ["Seulement les compétitions Club", "Le permis de conduire un van", "Les compétitions Amateur et Pro, selon le règlement des épreuves", "Rien de plus"], 2, "Il ouvre l'accès aux compétitions Amateur et Pro, selon le règlement des épreuves."),
    Q("Où retrouves-tu ton Galop une fois validé ?", ["Sur le livret de ton cheval", "Nulle part", "Au secrétariat de la mairie", "Dans ton espace cavalier sur le site de la FFE"], 3, "Ton enseignant l'enregistre en ligne ; tu le retrouves dans ton espace cavalier FFE."),
    Q("Que peux-tu faire après le Galop 9, si tu veux transmettre ta passion ?", ["Rien", "Passer les tests d'entrée des diplômes d'enseignant", "Repasser le Galop 1", "Devenir juge immédiatement"], 1, "Le Galop 9 ouvre la voie aux tests d'entrée des diplômes d'enseignant et d'entraîneur.")
  ]
}

];

window.COURS_GALOP9_FR = COURS;
window.COURS_GALOP9_VERSION = COURS_GALOP9_VERSION;
/* petit lexique de chaque cours, montré sur la page « Révise en 2 minutes » (comme les Galops 5, 7 et 8) */
window.HYPE_LEXIQUE_EXTRA = window.HYPE_LEXIQUE_EXTRA || {};
var TITRE_LEX = {"fr":"Petit lexique","en":"Mini glossary","es":"Pequeño glosario","it":"Piccolo glossario","ja":"ミニ用語集","de":"Kleines Lexikon","ar":"معجم صغير","zh":"小词汇表","nl":"Kleine woordenlijst","pt":"Pequeno glossário","sv":"Liten ordlista","ru":"Маленький словарь","pl":"Mały słowniczek","ko":"작은 용어집"};
COURS.forEach(function (c) { if (c.lexique && c.lexique.fr) { var o = {}; Object.keys(c.lexique).forEach(function (lg) { if (Array.isArray(c.lexique[lg])) o[lg] = { titre: TITRE_LEX[lg] || TITRE_LEX.fr, mots: c.lexique[lg] }; }); window.HYPE_LEXIQUE_EXTRA[c.id] = o; } });
window.COURS_GALOP9_PARTIES = { vie: ["g9n-01", "g9n-02", "g9n-03", "g9n-04", "g9n-05"], connaissance: ["g9n-06", "g9n-07", "g9n-08", "g9n-09"], technique: ["g9n-10", "g9n-11", "g9n-12", "g9n-13", "g9n-14", "g9n-15"], culture: ["g9n-16", "g9n-17", "g9n-18", "g9n-19"] };
})();
