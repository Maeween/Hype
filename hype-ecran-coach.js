/* hype-ecran-coach.js — 13/11/2026 (Blandine) — GUIDE COACH, page « Engagements » (modèle donné par Blandine).
   Page par page : seule la page Engagements existe pour l'instant (adresse 2hype.fr/#guide-coach).
   Chaque carte mène à l'endroit de l'appli (le concours ouvert en dernier, sinon la page de l'équipe).
   La frise du bas mène aux pages de l'appli pour chaque moment de la journée.
   Français seulement : les 15 langues viendront après relecture (règle du 02/11). */
(function () {
  var CH = "#C9A66B", IV = "#F3EEE4", IV2 = "#DEDAD2", IV3 = "rgba(243,238,228,0.52)", BG = "#070A08";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',system-ui,sans-serif";

  function ico(h, nom, taille) {   /* petits pictos au trait, couleur ivoire */
    var p = { width: taille || 30, height: taille || 30, viewBox: "0 0 24 24", fill: "none", stroke: IV, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
    if (nom === "agenda") return h("svg", p, h("rect", { x: 3, y: 5, width: 18, height: 16, rx: 2 }), h("path", { d: "M3 10h18M8 3v4M16 3v4" }));
    if (nom === "pdf") return h("svg", p, h("path", { d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" }), h("path", { d: "M14 3v5h5" }), h("text", { x: 12, y: 17.5, textAnchor: "middle", fontSize: 5.5, fontFamily: M, fontWeight: 700, fill: IV, stroke: "none" }, "PDF"));
    if (nom === "maj") return h("svg", p, h("path", { d: "M20 11a8 8 0 0 0-14.3-4.9L4 8" }), h("path", { d: "M4 3v5h5" }), h("path", { d: "M4 13a8 8 0 0 0 14.3 4.9L20 16" }), h("path", { d: "M20 21v-5h-5" }));
    if (nom === "micro") return h("svg", p, h("rect", { x: 9, y: 3, width: 6, height: 11, rx: 3 }), h("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" }));
    if (nom === "groupe") return h("svg", p, h("circle", { cx: 8, cy: 8, r: 2.6 }), h("circle", { cx: 16, cy: 8, r: 2.6 }), h("circle", { cx: 12, cy: 6, r: 2.6 }), h("path", { d: "M3 19c0-3 2.2-5 5-5M21 19c0-3-2.2-5-5-5M7 19c0-3.3 2.2-5.5 5-5.5s5 2.2 5 5.5" }));
    if (nom === "reglages") return h("svg", p, h("path", { d: "M4 6h16M4 12h16M4 18h16" }), h("circle", { cx: 14, cy: 6, r: 2, fill: BG }), h("circle", { cx: 9, cy: 12, r: 2, fill: BG }), h("circle", { cx: 15, cy: 18, r: 2, fill: BG }));
    if (nom === "cloche") return h("svg", Object.assign({}, p, { stroke: CH }), h("path", { d: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" }), h("path", { d: "M10 20a2 2 0 0 0 4 0" }));
    if (nom === "route") return h("svg", p, h("path", { d: "M6 21c0-6 12-6 12-12a3 3 0 0 0-6 0" }), h("circle", { cx: 6, cy: 21, r: 0.8 }), h("path", { d: "M15 9l3-3 3 3" }));
    if (nom === "liste") return h("svg", p, h("path", { d: "M9 6h11M9 12h11M9 18h11" }), h("circle", { cx: 4.5, cy: 6, r: 1 }), h("circle", { cx: 4.5, cy: 12, r: 1 }), h("circle", { cx: 4.5, cy: 18, r: 1 }));
    if (nom === "lieu") return h("svg", p, h("path", { d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" }), h("circle", { cx: 12, cy: 9.5, r: 2.5 }));
    if (nom === "horloge") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 9 }), h("path", { d: "M12 7v5l3 2" }));
    if (nom === "camion") return h("svg", p, h("path", { d: "M2 7h11v9H2zM13 10h4l3 3v3h-7" }), h("circle", { cx: 6, cy: 17.5, r: 1.7 }), h("circle", { cx: 16.5, cy: 17.5, r: 1.7 }));
    if (nom === "coche") return h("svg", p, h("rect", { x: 3, y: 4, width: 6, height: 6, rx: 1 }), h("path", { d: "M4.5 7l1.2 1.2L8 5.8M12 7h9M12 17h9" }), h("rect", { x: 3, y: 14, width: 6, height: 6, rx: 1 }));
    if (nom === "fer") return h("svg", p, h("path", { d: "M6 4c-1.5 4-1.5 9 1 12.5M18 4c1.5 4 1.5 9-1 12.5M7 16.5c1.5 2.2 3 3.5 5 3.5s3.5-1.3 5-3.5" }), h("path", { d: "M7 8h.01M17 8h.01M7.5 12h.01M16.5 12h.01" }));
    if (nom === "cadenas") return h("svg", p, h("rect", { x: 5, y: 11, width: 14, height: 10, rx: 2 }), h("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }));
    if (nom === "croix") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 9 }), h("path", { d: "M9 9l6 6M15 9l-6 6" }));
    if (nom === "jury") return h("svg", p, h("rect", { x: 5, y: 4, width: 14, height: 17, rx: 2 }), h("path", { d: "M9 4V3h6v1M8.5 13l2.5 2.5 4.5-5" }));
    if (nom === "dossier") return h("svg", p, h("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), h("rect", { x: 10, y: 12.5, width: 5, height: 4, rx: 0.8 }), h("path", { d: "M11 12.5v-1a1.5 1.5 0 0 1 3 0v1" }));
    if (nom === "telephone") return h("svg", p, h("rect", { x: 7, y: 3, width: 10, height: 18, rx: 2 }), h("path", { d: "M11 18h2" }), h("circle", { cx: 17, cy: 5, r: 2.2, fill: CH, stroke: "none" }));
    if (nom === "video") return h("svg", p, h("rect", { x: 3, y: 6, width: 13, height: 12, rx: 2 }), h("path", { d: "M16 10l5-3v10l-5-3" }));
    if (nom === "graph") return h("svg", p, h("path", { d: "M4 20V10M10 20V4M16 20v-7M21 20H3" }));
    if (nom === "bulle") return h("svg", p, h("path", { d: "M4 5h16v11H9l-5 4z" }));
    if (nom === "livre") return h("svg", p, h("path", { d: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5" }));
    if (nom === "cible") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 8.5 }), h("circle", { cx: 12, cy: 12, r: 4.5 }), h("circle", { cx: 12, cy: 12, r: 0.8, fill: IV }));
    if (nom === "info") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 9 }), h("path", { d: "M12 11v6M12 7.5v.01" }));
    if (nom === "programme") return h("svg", p, h("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }), h("path", { d: "M8 9h8M8 12h8M8 15h5" }));
    if (nom === "paddock") return h("svg", p, h("path", { d: "M6 4c-1.5 4-1.5 9 1 12.5M18 4c1.5 4 1.5 9-1 12.5M7 16.5c1.5 2.2 3 3.5 5 3.5s3.5-1.3 5-3.5" }));
    if (nom === "drapeau") return h("svg", p, h("path", { d: "M5 21V4M5 4h11l-2 4 2 4H5" }));
    if (nom === "coupe") return h("svg", p, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 21h6M10 17h4" }));
    return null;
  }

  /* Les pages du guide : textes = mots exacts des maquettes de Blandine (travaillées avec ChatGPT) */
  var PAGES = {
    engagements: { titre: "Engagements", sous: "Préparer, valider et éditer mes engagements.", bas: "coach-eng-camion", hero: "coach-eng-hero", cartes: [
      { n: "01", ico: "agenda", img: "coach-eng-fond-01", capture: "coach-cap-eng-nouveau", titre: "Préparer mes engagements", ecran: "engagements",
        paras: ["Sélectionne tes cavaliers, leurs chevaux et leurs épreuves."], liste: ["Ouvre les engagements de ton concours.", "Sélectionne le cavalier, le cheval et l’épreuve.", "Appuie sur « Engager ».", "Renseigne les informations du concours et du transport.", "Les licences sont récupérées depuis les profils des cavaliers."] },
      { n: "02", ico: "micro", img: "coach-hd-coach", capture: "coach-cap-eng-voix", titre: "Dicter mes consignes", ecran: "engagements",
        paras: ["Dicte tes informations à Hype, vérifie et valide."], liste: ["Ouvre « Ajouter un document ».", "Sélectionne « Parler avec Hype ».", "Dicte les informations à enregistrer.", "Vérifie ce que Hype a compris.", "Valide les informations."] },
      { n: "03", ico: "pdf", img: "coach-hd-documents", capture: "coach-cap-eng-feuille", titre: "Sortir ma fiche d’engagement", ecran: "engagements",
        paras: ["Génère ta fiche, imprime-la ou enregistre-la en PDF."], liste: ["Vérifie tes engagements.", "Appuie sur « Feuille d’engagement ».", "Enregistre la fiche en PDF ou imprime-la."] },
      { n: "04", ico: "maj", img: "coach-hd-embarquement", titre: "Mise à jour automatique", ecran: "registre-mouvements",
        paras: ["Bientôt : tes déplacements dans le registre d’élevage."] }
    ], savoir: "Les licences enregistrées dans les profils de tes cavaliers t’évitent de les ressaisir." },
    feuille: { titre: "Feuille de route", sous: "Préparer mon équipe, mes chevaux et mon déplacement.", hero: "coach-fr-hero", bas: "coach-fr-camion", cartes: [
      { n: "01", ico: "lieu", img: "coach-hd-entree", capture: "coach-cap-fr-infos", titre: "Informations du concours", ecran: "concours",
        paras: ["Retrouve le lieu, les informations pratiques et l'itinéraire."],
        liste: ["Renseigne les informations pratiques du concours.", "Retrouve l'adresse et le lieu de rendez-vous.", "Lance directement l'itinéraire GPS.", "Les cavaliers et les accompagnants ayant un compte Hype peuvent consulter ces informations."] },
      { n: "02", ico: "horloge", img: "coach-hd-chrono", capture: "coach-cap-fr-horaires", titre: "Horaires du concours", ecran: "concours",
        paras: ["Planifie le départ et les horaires des épreuves, même en vocal."],
        liste: ["Renseigne les horaires d'embarquement et de départ.", "Ajoute les reconnaissances et les débuts d'épreuves.", "Saisis les horaires ou dicte-les à Hype.", "Vérifie et valide les informations.", "Les cavaliers reçoivent un rappel 15 minutes avant leur reconnaissance."] },
      { n: "03", ico: "camion", img: "coach-fr-fond-03", capture: "coach-cap-fr-embarquement", titre: "Ordre d'embarquement", ecran: "concours",
        paras: ["Hype calcule l'ordre d'embarquement à partir des passages."],
        liste: ["Enregistre les numéros de départ de tes cavaliers.", "Hype calcule automatiquement l'ordre d'embarquement.", "Le cheval qui passe le plus tard embarque en premier.", "Consulte directement la liste sur ton téléphone."] },
      { n: "04", ico: "coche", img: "coach-fr-fond-04", capture: "coach-cap-fr-van", titre: "Préparer le matériel", ecran: "liste-van",
        paras: ["Une liste interactive pour ne rien oublier avant le départ."],
        liste: ["Ouvre la « Liste du van ».", "Retrouve le matériel à préparer.", "Coche chaque élément au fur et à mesure.", "Vérifie ta liste avant de partir."] },
      { n: "05", ico: "fer", img: "coach-fr-fond-05", titre: "Matériel par cheval", ecran: "liste-van",
        paras: ["Le matériel de chaque cheval s'ajoute à la liste du cavalier."],
        liste: ["Renseigne le matériel spécifique sur la fiche du cheval.", "Ajoute les embouchures, enrênements et équipements nécessaires.", "Hype les ajoute automatiquement à la Liste du van du cavalier concerné."] },
      { n: "06", ico: "cadenas", img: "coach-fr-fond-06", titre: "Documents et vaccins", ecran: "coffre",
        paras: ["Retrouve les papiers et les vaccins de tes chevaux."],
        liste: ["Photographie les papiers et les pages de vaccination.", "Utilise « Ajouter un document » pour récupérer les informations.", "Hype complète la fiche du cheval et sa rubrique Santé.", "Conserve tes documents dans ton coffre-fort privé."] }
    ], savoir: "Les copies numériques peuvent te dépanner, mais ne remplacent pas les originaux exigés lors d’un contrôle.",
      vocal: { titre: "Dicte tes consignes à Hype.", exemples: ["« La reconnaissance de la Club 3 est à 7h30. »", "« La Club 2 commence à 10h40. »"], texte: "Échange avec lui, précise tes demandes et valide les informations." },
      signature: ["Concentre-toi sur la performance.", "Hype gère la logistique."] },
    programme: { titre: "Programme", sous: "De la liste de départ à l’organisation de mon équipe.", hero: "images/galop2-hero-bai-entier.webp", cartes: [
      { n: "01", ico: "programme", img: "coach-prog-fond-01", capture: "coach-cap-prog-import", titre: "Importer mes listes de départ", ecran: "concours",
        paras: ["Une capture d’écran suffit pour récupérer tes passages."], liste: ["Ajoute une capture des listes de départ.", "Hype identifie les cavaliers et les chevaux.", "Il retrouve leurs profils et les associe aux passages.", "Vérifie les informations récupérées.", "Valide."] },
      { n: "02", ico: "horloge", img: "coach-prog-fond-02", capture: "coach-cap-eng-voix", titre: "Récupérer les horaires", ecran: "concours",
        paras: ["Importe ou dicte les horaires officiels de tes épreuves."], liste: ["Renseigne les horaires des épreuves.", "Ajoute les heures de reconnaissance.", "Tu peux également dicter ces informations à Hype.", "Vérifie et valide."] },
      { n: "03", ico: "liste", img: "coach-prog-fond-03", capture: "coach-cap-prog-passages", titre: "Calculer les passages", ecran: "concours",
        paras: ["Hype estime les heures de passage de chaque couple."], liste: ["Hype utilise les numéros de départ.", "Il tient compte des horaires et du rythme de l’épreuve.", "Consulte les heures estimées de tes cavaliers."] },
      { n: "04", ico: "maj", capture: "coach-cap-prog-decaler", img: "coach-hd-chrono", titre: "Actualiser mon programme", ecran: "concours",
        paras: ["Décale une épreuve et actualise les horaires de ton équipe."], liste: ["Appuie sur « Décaler l’épreuve ».", "Indique le décalage et valide.", "Hype recalcule les heures de passage.", "Les rendez-vous au paddock sont décalés.", "Coche « Prévenir les cavaliers » pour les avertir."] }
    ], savoir: "Les heures de passage sont estimées et peuvent évoluer pendant le concours.",
      vocal: { titre: "Dicte tes consignes à Hype.", exemples: ["« La reconnaissance de la Club 3 est à 7h30. »", "« La Club 2 commence à 10h40. »"], texte: "Échange avec lui, précise tes demandes et valide les informations." } },
    passages: { titre: "Passages", sous: "Gérer mes couples et suivre le déroulement des épreuves.", hero: "coach-pas-hero", cartes: [
      { n: "01", ico: "reglages", img: "coach-pas-fond-02", capture: "coach-cap-pas-changer", titre: "Changements et non-partants", ecran: "concours",
        paras: ["Modifie un couple ou déclare un non-partant."], liste: ["Appuie sur le crayon du passage concerné.", "Modifie le cavalier ou le cheval.", "Le remplacement apparaît sous le passage.", "Signale les non-partants si nécessaire."] },
      { n: "02", ico: "jury", capture: "coach-cap-pas-jury", img: "coach-hd-dossard", titre: "Déclarations au jury", ecran: "concours",
        paras: ["Hype rassemble les changements à déclarer au secrétariat."], liste: ["Retrouve la liste « À déclarer au jury ».", "Hype y ajoute automatiquement les changements.", "Les non-partants y figurent également.", "Présente cette liste au secrétariat."] },
      { n: "03", ico: "liste", capture: "coach-cap-prog-passages", img: "coach-hd-entree", titre: "Suivre mes passages", ecran: "concours",
        paras: ["Retrouve tes passages par épreuve, cavalier ou cheval."], liste: ["Choisis ton mode d’affichage.", "Consulte les numéros de départ.", "Retrouve les heures de reconnaissance et de début d’épreuve.", "Visualise les heures estimées de passage et les pistes."] },
      { n: "04", ico: "lieu", capture: "coach-cap-pas-heure", img: "coach-hd-selle", titre: "Modifier un passage", ecran: "concours",
        paras: ["Ajuste l’heure ou la piste d’un passage."], liste: ["Appuie sur le crayon du passage.", "Sélectionne « Heure et piste ».", "Renseigne les nouvelles informations."] },
      { n: "05", ico: "horloge", capture: "coach-cap-prog-decaler", img: "coach-hd-chrono", titre: "Décaler une épreuve", ecran: "concours",
        paras: ["Un retard ? Hype recalcule les horaires de ton équipe."], liste: ["Appuie sur « Décaler l’épreuve ».", "Indique le décalage et valide.", "Hype recalcule les heures de passage.", "Les rendez-vous des groupes sont décalés.", "Coche « Prévenir les cavaliers » pour les avertir."] },
      { n: "06", ico: "programme", capture: "coach-cap-pas-direct", img: "coach-hd-cso", titre: "Suivre le direct", ecran: "concours",
        paras: ["Retrouve le direct du chronométreur depuis Hype."], liste: ["Ouvre « Modifier les passages ».", "Ajuste le rythme de l’épreuve si nécessaire.", "Recherche le direct sur Winjump ou ajoute son lien.", "Préviens tes cavaliers si nécessaire."] }
    ], savoir: "Hype prépare tes déclarations au jury, mais tu dois toujours les transmettre au secrétariat." },
    jourj: { titre: "Jour J", sous: "Piloter mon concours et accompagner mon équipe.", hero: "coach-jj-hero", bas: "coach-fr-camion", cartes: [
      { n: "01", ico: "camion", img: "coach-jj-fond-01", capture: "coach-cap-fr-embarquement", titre: "Préparer le départ", ecran: "concours",
        paras: ["Retrouve les horaires et l’ordre d’embarquement."], liste: ["Consulte l’heure d’embarquement.", "Vérifie l’ordre des chevaux dans le camion.", "Retrouve l’heure de départ.", "Consulte la Liste du van avant de partir."] },
      { n: "02", ico: "dossier", img: "coach-jj-fond-02", titre: "Mes documents à portée de main", ecran: "coffre",
        paras: ["Retrouve les papiers de tes chevaux et du camion en cas d’oubli."], liste: ["Retrouve les copies des carnets et des vaccins dans la rubrique Santé de tes chevaux.", "Conserve les documents du camion, du van et leurs assurances dans ton coffre-fort privé.", "Accède rapidement à tes documents en cas d’oubli ou de contrôle.", "Pense à emporter les originaux obligatoires."] },
      { n: "03", ico: "reglages", img: "coach-jj-fond-03", capture: "coach-cap-jj-crayon", titre: "Gérer les imprévus", ecran: "concours",
        paras: ["Adapte ton organisation au déroulement du concours."], liste: ["Retrouve les passages de ton équipe.", "Modifie les horaires ou les pistes si nécessaire.", "Enregistre les changements et les non-partants.", "Décale une épreuve en cas de retard."] },
      { n: "04", ico: "cloche", img: "coach-jj-fond-04", capture: "coach-cap-prog-decaler", titre: "Prévenir mes cavaliers", ecran: "concours",
        paras: ["Informe ton équipe des changements de programme."], liste: ["Décale l’épreuve concernée.", "Coche « Prévenir les cavaliers ».", "Valide les modifications.", "Hype recalcule les heures de passage et décale les rendez-vous au paddock.", "Les cavaliers concernés reçoivent une notification."] },
      { n: "05", ico: "telephone", img: "coach-jj-fond-05", capture: "coach-cap-jj-alertes", titre: "Activer mes alertes", ecran: "concours",
        paras: ["Utilise « Me prévenir » pour recevoir les alertes disponibles."], liste: ["Retrouve le bouton « Me prévenir ».", "Active les alertes disponibles.", "Tu es prévenu avant le départ et avant chaque reconnaissance.", "Consulte les notifications reçues sur ton téléphone."] }
    ], savoir: "Les copies numériques ne remplacent pas toujours les originaux exigés, mais elles peuvent te sauver un concours.",
      vocal: { titre: "Dicte tes consignes à Hype.", exemples: ["« La reconnaissance de la Club 3 est à 7h30. »", "« La Club 2 commence à 10h40. »"], texte: "Échange avec lui, précise tes demandes et valide les informations." },
      signature: ["Concentre-toi sur la performance.", "Hype gère la logistique."] },
    analyse: { titre: "Analyse & progression", sous: "Observer, analyser, enseigner, progresser.", hero: "images/guide-coach/coach-hd-cso.webp", cycle: true, cartes: [
      { n: "01", ico: "video", img: "coach-hd-entree", titre: "Retrouver les parcours", ecran: "team-medias",
        paras: ["Chaque cavalier dispose de son espace pour partager ses vidéos."], liste: ["Demande à tes cavaliers d’ajouter leurs vidéos.", "Retrouve les parcours par concours, cavalier ou cheval.", "Consulte les vidéos de ton équipe."] },
      { n: "02", ico: "groupe", img: "coach-hd-cso", titre: "Suivre chaque couple", ecran: "team-medias",
        paras: ["Retrouve l’historique des parcours de chaque couple."], liste: ["Une page couple se crée automatiquement.", "Retrouve les vidéos du cavalier avec ce cheval.", "Compare les parcours au fil des concours.", "Observe leur évolution."] },
      { n: "03", ico: "graph", img: "coach-hd-chrono", titre: "Analyser les performances", ecran: "performances-chevaux",
        paras: ["Suis les résultats et les statistiques de ton équipe."], liste: ["Consulte les résultats par cavalier, cheval ou couple.", "Retrouve les sans-faute et les performances enregistrées.", "Observe leur évolution au fil de la saison.", "Identifie les axes de progression."] },
      { n: "04", ico: "bulle", img: "coach-hd-coach", titre: "Commenter les parcours", ecran: "team-medias",
        paras: ["Partage tes observations et tes conseils avec ton cavalier."], liste: ["Regarde les vidéos de tes cavaliers.", "Identifie les points forts et les difficultés.", "Ajoute tes commentaires et tes conseils."] },
      { n: "05", ico: "micro", img: "coach-hd-selle", titre: "Analyser avec Hey Baby", ecran: "team-medias",
        paras: ["Sélectionne un extrait vidéo et demande une analyse."], liste: ["Sélectionne le passage que tu souhaites travailler.", "Partage-le avec Hey Baby.", "Échange avec lui sur les difficultés rencontrées.", "Relis, complète ou modifie ses conseils."] },
      { n: "06", ico: "cadenas", img: "coach-hd-dossard", titre: "Épingler un conseil privé", ecran: "team-medias",
        paras: ["Partage un retour personnalisé avec ton cavalier."], liste: ["Sélectionne les conseils que tu souhaites transmettre.", "Ajoute tes propres observations.", "Valide et épingle le retour.", "Seuls ton cavalier et toi pouvez consulter cette épingle."] },
      { n: "07", ico: "livre", img: "coach-hd-materiel", titre: "Faire progresser mon équipe", ecran: "team-medias",
        paras: ["Transforme une difficulté rencontrée en conseil collectif."], liste: ["Demande à Hey Baby d’approfondir un thème technique.", "Prépare un contenu pédagogique sans identifier le cavalier.", "Relis, modifie et valide le contenu.", "Épingle-le pour toute ton équipe de compétition."] },
      { n: "08", ico: "cible", img: "coach-hd-documents", titre: "Préparer la suite", ecran: "team-medias",
        paras: ["Appuie-toi sur les parcours pour préparer tes prochaines séances."], liste: ["Identifie les difficultés récurrentes.", "Compare les vidéos et les performances.", "Définis tes prochains objectifs de travail.", "Adapte tes séances aux besoins de chaque couple."] }
    ], savoir: "Tu gardes la maîtrise pédagogique : les conseils de Hey Baby restent soumis à ta validation avant leur partage." },
    retour: { titre: "Retour & récupération", sous: "Le concours se termine. L’attention portée au cheval continue.", hero: "coach-jj-fond-01", cartes: [
      { n: "01", ico: "camion", img: "coach-hd-embarquement", capture: "coach-cap-fr-van", titre: "Préparer le retour", ecran: "liste-van", paras: ["Vérifie le matériel et prépare le retour des chevaux."] },
      { n: "02", ico: "coche", img: "coach-hd-materiel", capture: "coach-cap-fr-van", titre: "Ne rien oublier", ecran: "liste-van", paras: ["Réutilise ta liste interactive du matériel et récupère les documents."] },
      { n: "03", ico: "horloge", img: "coach-hd-coach", titre: "Veiller à la récupération", ecran: "chevaux", paras: ["Accompagne le retour au calme et surveille l’état général des chevaux."] },
      { n: "04", ico: "fer", img: "coach-hd-selle", titre: "Prendre soin des chevaux", ecran: "chevaux", paras: ["Vérifie les pieds, les membres et les éventuelles blessures."] },
      { n: "05", ico: "jury", img: "coach-hd-documents", titre: "Partager mes consignes", ecran: "chevaux", paras: ["Épingle les consignes de soins adaptées à chaque cheval."] },
      { n: "06", ico: "livre", img: "coach-hd-cso", titre: "Approfondir mes connaissances", ecran: "articles", paras: ["Retrouve les articles Santé consacrés aux soins et à la récupération."] }
    ], savoir: "Chaque cheval a des besoins différents. Adapte les soins à son état, à l’effort fourni et aux recommandations vétérinaires.",
      signature: ["La performance ne s’arrête pas à la ligne d’arrivée.", "Le bien-être du cheval reste notre priorité."] },
    paddock: { titre: "Paddock", sous: "Organiser la détente de mes cavaliers.", hero: "images/concours-carte-equipe.webp", cartes: [
      { n: "01", ico: "groupe", capture: "coach-cap-pad-proposer", img: "coach-hd-entree", titre: "Organiser mes groupes", ecran: "concours",
        paras: ["Hype rassemble tes cavaliers selon leurs heures de passage."], liste: ["Utilise les passages de ton équipe.", "Hype propose des groupes de six couples maximum.", "Les passages sont regroupés sur une période de 30 minutes."] },
      { n: "02", ico: "horloge", capture: "coach-cap-pad-heure", img: "coach-hd-chrono", titre: "Calculer les rendez-vous", ecran: "concours",
        paras: ["Hype calcule l’heure de rendez-vous de chaque groupe."], liste: ["Hype identifie le premier passage du groupe.", "Le rendez-vous est fixé 30 minutes avant ce passage.", "Tous les cavaliers du groupe se retrouvent à cette heure."] },
      { n: "03", ico: "fer", capture: "coach-cap-fr-van", img: "coach-hd-materiel", titre: "Consignes par cheval", ecran: "liste-van",
        paras: ["Retrouve le matériel et les consignes propres à chaque cheval."], liste: ["Consulte les informations de la fiche du cheval.", "Retrouve son matériel et son enrênement.", "Consulte ses consignes particulières."] },
      { n: "04", ico: "reglages", capture: "coach-cap-pad-modifier", img: "coach-hd-coach", titre: "Modifier mes groupes", ecran: "concours",
        paras: ["Adapte les groupes de détente à ton organisation."], liste: ["Consulte les groupes proposés.", "Modifie leur composition selon tes besoins.", "Vérifie ton organisation avant publication."] },
      { n: "05", ico: "coche", capture: "coach-cap-pad-publier", img: "coach-hd-dossard", titre: "Publier mes groupes", ecran: "concours",
        paras: ["Publie tes groupes pour les rendre visibles aux cavaliers."], liste: ["Vérifie la composition de tes groupes.", "Contrôle les heures de rendez-vous.", "Appuie sur « Publier aux cavaliers ».", "Tes cavaliers peuvent consulter leur groupe."] },
      { n: "06", ico: "cloche", capture: "coach-cap-pad-reco", img: "coach-hd-cso", titre: "Rappels de reconnaissance", ecran: "concours",
        paras: ["Tes cavaliers sont avertis 15 minutes avant la reconnaissance."], liste: ["Renseigne l’heure de reconnaissance.", "Hype programme le rappel automatique.", "Les cavaliers reçoivent une notification."] }
    ], savoir: "Au paddock, respecte l’heure de rendez-vous du groupe, même si ton passage est prévu plus tard." },
    resultats: { titre: "Résultats", sous: "Retrouver les performances de mon équipe.", hero: "images/team-competition-performances-hero.webp", cartes: [
      { n: "01", ico: "coupe", capture: "coach-cap-res-lire", img: "coach-hd-documents", titre: "Importer mes résultats", ecran: "concours",
        paras: ["Récupère les résultats depuis un PDF ou une capture d’écran."], liste: ["Ouvre les résultats du concours.", "Sélectionne « Lire les résultats ».", "Ajoute le PDF ou la capture d’écran.", "Vérifie les informations récupérées."] },
      { n: "02", ico: "reglages", capture: "coach-cap-res-saisir", img: "coach-hd-coach", titre: "Saisir ou corriger", ecran: "concours",
        paras: ["Complète ou corrige les résultats de tes cavaliers."], liste: ["Appuie sur « Saisir ou corriger ».", "Sélectionne le résultat concerné.", "Renseigne ou corrige les informations.", "Enregistre tes modifications."] },
      { n: "03", ico: "liste", img: "coach-hd-cso", titre: "Retrouver mes résultats", ecran: "performances-chevaux",
        paras: ["Consulte les performances de ton équipe après le concours."], liste: ["Ouvre les résultats du concours.", "Retrouve les résultats de tes cavaliers.", "Vérifie les performances enregistrées.", "Retrouve-les aussi dans « Performances chevaux », le classement de la saison."] }
    ], savoir: "Vérifie les résultats récupérés avant de les enregistrer." }
  };
  var FRISE = [   /* les 7 chapitres du guide (maquette « Navigation du guide ») */
    { id: "engagements", nom: "Engagements", ico: "agenda", ecran: "engagements" },
    { id: "feuille", nom: "Feuille de route", ico: "route", ecran: "concours" },
    { id: "programme", nom: "Programme", ico: "programme", ecran: "concours" },
    { id: "passages", nom: "Passages", ico: "liste", ecran: "concours" },
    { id: "paddock", nom: "Paddock", ico: "paddock", ecran: "concours" },
    { id: "jourj", nom: "Jour J", ico: "drapeau", ecran: "jour-j" },
    { id: "retour", nom: "Retour", ico: "camion", ecran: "liste-van" },
    { id: "resultats", nom: "Résultats", ico: "coupe", ecran: "concours" },
    { id: "analyse", nom: "Analyse", ico: "graph", ecran: "team-medias" }
  ];

  /* 13/11 23h10 (Blandine) : « Cycle de progression Hype » — cercle SVG, HYPE au centre, 6 étapes, fines flèches champagne */
  function Cycle(h, sansSignature) {
    var E = ["Préparer", "Concourir", "Prendre soin", "Observer", "Analyser", "Enseigner", "Progresser"]; var N = E.length, PAS = 360 / N;
    var cx = 180, cy = 180, R = 112, kids = [], LI = "rgba(243,238,228,0.72)";
    for (var i = 0; i < N; i++) {
      var a0 = (-90 + i * PAS + 11) * Math.PI / 180, a1 = (-90 + (i + 1) * PAS - 11) * Math.PI / 180;
      var x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      kids.push(h("path", { key: "a" + i, d: "M" + x0.toFixed(1) + " " + y0.toFixed(1) + " A" + R + " " + R + " 0 0 1 " + x1.toFixed(1) + " " + y1.toFixed(1), fill: "none", stroke: LI, strokeWidth: 1, markerEnd: "url(#hcFl)" }));
      var a = (-90 + i * PAS) * Math.PI / 180, nx = cx + R * Math.cos(a), ny = cy + R * Math.sin(a);
      kids.push(h("circle", { key: "p" + i, cx: nx, cy: ny, r: 4, fill: BG, stroke: IV, strokeWidth: 1 }));
      var lx = cx + (R + 16) * Math.cos(a), ly = cy + (R + 16) * Math.sin(a) + 5 + (Math.sin(a) < -0.9 ? -6 : (Math.sin(a) > 0.5 ? 10 : 0));
      kids.push(h("text", { key: "t" + i, x: lx, y: ly, textAnchor: Math.abs(Math.cos(a)) < 0.2 ? "middle" : (Math.cos(a) > 0 ? "start" : "end"), fill: IV, style: { fontFamily: M, fontSize: 15, fontWeight: 600, letterSpacing: 0.2 } }, E[i]));
    }
    kids.push(h("text", { key: "h", x: cx, y: cy + 4, textAnchor: "middle", fill: IV, style: { fontFamily: SERIF, fontSize: 40, fontWeight: 500, letterSpacing: 6 } }, "HYPE"));
    kids.push(h("text", { key: "s", x: cx, y: cy + 28, textAnchor: "middle", fill: IV, opacity: 0.8, style: { fontFamily: M, fontSize: 10, letterSpacing: 2.4 } }, "CYCLE DE PROGRESSION"));
    return h("div", { style: { padding: "18px 0 6px", textAlign: "center" } },
      h("svg", { viewBox: "-70 14 500 336", role: "img", "aria-label": "Cycle de progression Hype : préparer, concourir, prendre soin, observer, analyser, enseigner, progresser", style: { display: "block", width: "100%", maxWidth: 440, height: "auto", margin: "0 auto" } },
        h("defs", null, h("marker", { id: "hcFl", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, h("path", { d: "M1 1L9 5L1 9", fill: "none", stroke: "rgba(243,238,228,0.72)", strokeWidth: 1.3 }))),
        kids),
      sansSignature ? null : h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, marginTop: 6 } }, "Chaque concours prépare le suivant."));
  }

  function EcranGuideCoach() {
    var h = React.createElement;
    var app = ((typeof useApp === "function") ? useApp() : null) || {};
    var setEcran = app.setEcran || function () { };
    var memo0 = React.useRef((function () { try { if (window.__coachVue) return null; return JSON.parse(sessionStorage.getItem("hype_coach_etat") || "null"); } catch (e) { return null; } })());
    var _c = React.useState(null); var conc = _c[0], setConc = _c[1];
    var _d = React.useState(function () { return (memo0.current && memo0.current.deplie) || {}; }); var deplie = _d[0], setDeplie = _d[1];
    var rtlG = app.langue === "ar" || app.langue === "fa";
    var _qh = React.useState(""); var qHB = _qh[0], setQHB = _qh[1];   /* encart Hey Baby de l'accueil */
    React.useEffect(function () { try { window.__coachVueOuverte = vue; window.dispatchEvent(new Event("hype-coach-vue")); } catch (e) { } }, [vue]);
    /* 13/11 23h (recette) : en revenant d'une page de l'appli, on retrouve le chapitre, les cartes ouvertes et la position de lecture */
    var _v = React.useState(function () { try { var v = window.__coachVue || (memo0.current && memo0.current.vue) || "accueil"; window.__coachVue = null; return (v === "accueil" || v === "journee" || PAGES[v]) ? v : "accueil"; } catch (e) { return "accueil"; } });
    var vue = _v[0], setVue = _v[1];
    var premierRendu = React.useRef(true);
    React.useEffect(function () {
      try {
        window.__coachVueOuverte = vue; var z = document.getElementById("hype-defile");
        var y = (premierRendu.current && memo0.current && memo0.current.vue === vue) ? (memo0.current.y || 0) : 0; premierRendu.current = false;
        window.scrollTo(0, y); if (z) { z.scrollTo(0, y); if (y) setTimeout(function () { try { z.scrollTo(0, y); } catch (e2) { } }, 350); }
      } catch (e) { }
    }, [vue]);
    React.useEffect(function () { try { var z = document.getElementById("hype-defile"); sessionStorage.setItem("hype_coach_etat", JSON.stringify({ vue: vue, deplie: deplie, y: z ? z.scrollTop : 0 })); } catch (e) { } }, [vue, deplie]);
    React.useEffect(function () {   /* garde la position de lecture au fil du défilement */
      var z = document.getElementById("hype-defile"); if (!z) return;
      var t = null; function sv() { clearTimeout(t); t = setTimeout(function () { try { var o = JSON.parse(sessionStorage.getItem("hype_coach_etat") || "{}"); o.y = z.scrollTop; sessionStorage.setItem("hype_coach_etat", JSON.stringify(o)); } catch (e) { } }, 150); }
      z.addEventListener("scroll", sv, { passive: true }); return function () { z.removeEventListener("scroll", sv); clearTimeout(t); };
    }, []);
    React.useEffect(function () { return function () { try { window.__coachVueOuverte = null; } catch (e) { } }; }, []);
    React.useEffect(function () {   /* la frise montre le chapitre ouvert, même s'il est hors de l'écran */
      try { setTimeout(function () { var b = document.querySelector("[data-coach-frise] [aria-current=page]"); var c = b && b.parentElement; if (b && c) c.scrollLeft = Math.max(0, b.offsetLeft - (c.clientWidth - b.offsetWidth) / 2); }, 60); } catch (e) { }
    }, [vue]);
    var PHASE_DE = { engagements: "u1", feuille: "u1", programme: "u1", passages: "u2", paddock: "u2", jourj: "u2", retour: "u3", resultats: "u4", analyse: "u4" };   /* 14/11 10h35 : 4 univers */
    function versPhase(ph) { setTimeout(function () { try { var el = document.getElementById("hc-" + ph); if (el) el.scrollIntoView({ block: "start" }); } catch (e) { } }, 80); }
    function retour() { if (PAGES[vue]) { var ph = PHASE_DE[vue]; setVue("accueil"); if (ph) versPhase(ph); }   /* 14/11 : plus de page intermédiaire, retour au bon temps de l'accueil */ else if (vue === "sommaire" || vue === "journee") setVue("accueil"); else if (app.retourEcran) app.retourEcran(); else setEcran("aide"); }
    /* le concours ouvert en dernier, s'il n'est pas passé : les liens y mènent directement */
    React.useEffect(function () {
      (async function () {
        try {
          var id = localStorage.getItem("hype_concours_ouvert"); if (!id || typeof supa === "undefined") return;
          var r = await supa.from("club_agenda").select("id, titre, lieu, date_jour").eq("id", id).maybeSingle();
          if (!r || r.error || !r.data) return;
          var hier = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          if (String(r.data.date_jour || "") >= hier) setConc(r.data);
        } catch (e) { }
      })();
    }, []);
    function aller(ecran) {
      if (!ecran) return;
      if (["concours", "engagements", "jour-j", "liste-van"].indexOf(ecran) < 0) { setEcran(ecran); return; }   /* pages sans concours (registre, coffre…) */
      if (!conc) { setEcran("team-competition"); return; }   /* pas de concours en cours : la page de l'équipe, d'où on ouvre le concours */
      try { window.__concoursId = conc.id; window.__engagementsId = conc.id; localStorage.setItem("hype_concours_ouvert", String(conc.id)); } catch (e) { }
      setEcran(ecran);
    }
    function courbe(bas) {
      return h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { position: "absolute", left: 0, right: 0, width: "100%", height: 40, display: "block", top: bas ? "auto" : -1, bottom: bas ? -1 : "auto", transform: bas ? "none" : "scaleY(-1)" } },
        h("path", { d: "M0,40 L0,30 Q200,8 400,2 L400,40 Z", fill: BG }),
        h("path", { d: "M0,30 Q200,8 400,2", fill: "none", stroke: CH, strokeWidth: 1.2, opacity: 0.85 }));
    }
    /* 14/11 (audit de Blandine : « aucun titre sur aucune image ») : les 9 chapitres prennent le héros de la Vidéothèque,
       comme l'accueil et le sommaire — photo, courbe champagne, titre et sous-titre SOUS la photo. */
    function hero(titre, sous, img) {
      var src = img ? (img.indexOf("/") >= 0 ? img : "images/guide-coach/" + img + ".webp") : "images/portrait-defaut-noir.webp";
      return heroVid(src, "entiere", "GUIDE COACH", titre, sous, null, titre.length > 14 ? "clamp(36px, 9.6vw, 60px)" : null);   /* photo entière, jamais recadrée */
    }
    function gras(t) {   /* **mot** -> doré gras */
      return String(t).replace(/ ([:;!?»])/g, "\u202f$1").replace(/« /g, "«\u202f").split("**").map(function (x, i) { return i % 2 ? h("b", { key: i, style: { color: CH, fontWeight: 600 } }, x) : x; });
    }
    function carteListe(n, titre, texte, ouvrir, k) {   /* une ligne de sommaire ; sans « ouvrir » = bientôt */
      return h("div", { key: k, role: ouvrir ? "button" : undefined, tabIndex: ouvrir ? 0 : undefined, onClick: ouvrir || undefined, onKeyDown: ouvrir ? function (ev) { if (ev.key === "Enter") ouvrir(); } : undefined,
        style: { display: "grid", gridTemplateColumns: (n ? "48px 1px " : "") + "minmax(0,1fr) auto", alignItems: "center", columnGap: 14, padding: "18px 16px", borderRadius: 16, border: "1px solid rgba(243,238,228,0.16)", background: "linear-gradient(160deg, rgba(243,238,228,0.045), rgba(243,238,228,0.01))", cursor: ouvrir ? "pointer" : "default", opacity: ouvrir ? 1 : 0.55 } },
        n ? h("div", { style: { fontFamily: SERIF, fontSize: 32, color: CH, lineHeight: 1, textAlign: "center" } }, n) : null,
        n ? h("div", { "aria-hidden": "true", style: { alignSelf: "stretch", background: "rgba(201,166,107,0.5)" } }) : null,
        h("div", { style: { minWidth: 0 } },
          h("div", { style: { fontSize: 16, fontWeight: 600, color: IV, lineHeight: 1.25 } }, titre),
          h("div", { style: { fontSize: 14, color: IV2, marginTop: 4, lineHeight: 1.45 } }, texte)),
        ouvrir ? h("div", { "aria-hidden": "true", style: { color: CH, fontSize: 18 } }, "›") : h("span", { style: { fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: IV3, border: "1px solid rgba(243,238,228,0.25)", borderRadius: 999, padding: "2px 8px" } }, "Bientôt"));
    }
    /* 14/11 01h (Blandine, « Refonte de la page d'accueil du Guide Coach » + maquette ChatGPT) — page de présentation :
       héros Vidéothèque (titre SOUS la photo), 3 pictos, « Découvrir les 9 tutoriels », AVANT / PENDANT / APRÈS en
       compositions variées (photo à côté du texte sur tablette et ordinateur, empilé sur iPhone), exemple vocal, exemple
       « Retard de 20 minutes », partage individuel / collectif côte à côte, cycle, encart Hey Baby. Le sommaire des 9
       chapitres est une vue à part (« sommaire »), ouverte par le bouton et les liens « Voir les tutoriels ». */
    function ligneChap(c) {   /* chapitre : numéro, titre, phrase, flèche — une ligne éditoriale */
      function ouvrirC() { setVue(c[1]); try { var z = document.getElementById("hype-defile"); if (z) z.scrollTo(0, 0); } catch (e) { } }
      return h("div", { key: c[0], role: "button", tabIndex: 0, onClick: ouvrirC, onKeyDown: function (ev) { if (ev.key === "Enter") ouvrirC(); }, "data-coach-chap": c[1],
        style: { display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 20px", alignItems: "center", columnGap: 14, padding: "16px 2px", borderTop: "1px solid rgba(243,238,228,0.10)", cursor: "pointer", minHeight: 64 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 30, color: CH, lineHeight: 1 } }, c[0]),
        h("div", { style: { minWidth: 0 } },
          h("div", { style: { fontSize: 16.5, fontWeight: 600, color: IV, lineHeight: 1.25 } }, c[2]),
          h("div", { style: { fontSize: 14.5, color: "#DEDAD2", marginTop: 4, lineHeight: 1.4 } }, c[3])),
        h("div", { "aria-hidden": "true", style: { color: CH, fontSize: 22, lineHeight: 1, textAlign: "end" } }, rtlG ? "‹" : "›"));
    }
    var CHAPS = [
      ["AVANT LE CONCOURS", [["01", "engagements", "Engagements", "Préparer, valider et éditer mes engagements."], ["02", "feuille", "Feuille de route", "Préparer mon équipe, mes chevaux et mon déplacement."], ["03", "programme", "Programme", "De la liste de départ à l'organisation de mon équipe."]]],
      ["PENDANT LE CONCOURS", [["04", "passages", "Passages", "Gérer mes couples et suivre le déroulement des épreuves."], ["05", "paddock", "Paddock", "Organiser la détente de mes cavaliers."], ["06", "jourj", "Jour J", "Piloter mon concours et accompagner mon équipe."]]],
      ["APRÈS LE CONCOURS", [["07", "retour", "Retour & récupération", "Le concours se termine. L’attention portée au cheval continue."], ["08", "resultats", "Résultats", "Retrouver les performances de mon équipe."], ["09", "analyse", "Analyse & progression", "Observer, analyser, enseigner, progresser."]]]
    ];
    function haut0() { try { var z = document.getElementById("hype-defile"); if (z) z.scrollTo(0, 0); } catch (e) { } }
    function heroVid(img, pos, kicker, titre, sous, intro, taille) {   /* héros de la Vidéothèque : photo, courbe, textes dessous à droite */
      return h("div", { style: { position: "relative", maxWidth: 1100, margin: "0 auto" } },
        h("div", { style: { position: "relative", height: pos === "entiere" ? "auto" : "min(max(300px, 82vw), max(300px, 52vw), 620px)", overflow: "hidden", WebkitMaskImage: "linear-gradient(180deg, #000 62%, transparent 98%)", maskImage: "linear-gradient(180deg, #000 62%, transparent 98%)" } },
          h("img", { src: (img.indexOf("/") >= 0 ? img : "images/guide-coach/" + img + ".webp"), alt: "", decoding: "async", style: { display: "block", width: "100%", height: pos === "entiere" ? "auto" : "100%", objectFit: "cover", objectPosition: pos === "entiere" ? "center" : pos, transform: rtlG ? "scaleX(-1)" : "none" } })),
        h("svg", { viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 56, marginTop: -56, position: "relative", transform: rtlG ? "scaleX(-1)" : "none" } },
          h("path", { d: "M0 54 C 140 50, 260 34, 400 6", fill: "none", stroke: CH, strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" })),
        h("button", { type: "button", onClick: retour, "aria-label": "Retour", "data-retour-geste": "1", style: { position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 14px)", insetInlineStart: 14, width: 44, height: 44, borderRadius: "50%", background: "rgba(7,10,8,0.45)", border: "1px solid rgba(201,166,107,0.7)", color: IV, fontSize: 20, lineHeight: 1, cursor: "pointer" } }, rtlG ? "›" : "‹"),
        h("div", { style: { textAlign: "end", padding: "4px 20px 0", maxWidth: 1100, margin: "0 auto" } },
          h("div", { style: { fontSize: 10.5, letterSpacing: "0.36em", color: CH, fontWeight: 500, marginBottom: 10 } }, kicker),
          h("h1", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: taille || "clamp(44px, 12vw, 70px)", lineHeight: 1, margin: 0, color: IV } }, titre),
          h("p", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 5.4vw, 26px)", margin: "10px 0 0", color: IV } }, sous)),
        intro ? h("p", { style: { maxWidth: 680, margin: "22px auto 0", padding: "0 22px", fontSize: 15.5, lineHeight: 1.55, color: "#DEDAD2" } }, intro) : null);
    }
    function lienTutos(lab) {
      return h("button", { type: "button", onClick: function () { setVue("sommaire"); haut0(); }, "data-coach-tutos": "1",
        style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: 0, marginTop: 6, border: "none", background: "transparent", color: IV, opacity: 0.85, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: "rgba(243,238,228,0.3)", fontFamily: M, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", cursor: "pointer" } }, lab, h("span", { "aria-hidden": "true" }, rtlG ? "←" : "→"));
    }

    if (vue === "sommaire") {
      return h("div", { "data-noswipe": "1", style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 8 } },
        heroVid("coach-acc-entete_cheval", "76% 40%", "GUIDE COACH", "Les 9 tutoriels", "Avant, pendant et après le concours.", null),
        CHAPS.map(function (g) {
          return h("section", { key: g[0], style: { maxWidth: 680, margin: "30px auto 0", padding: "0 22px" } },
            h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 } },
              h("span", { style: { fontSize: 11, letterSpacing: "0.32em", color: "rgba(243,238,228,0.72)", fontWeight: 500 } }, g[0]),
              h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(243,238,228,0.28), rgba(243,238,228,0))" } })),
            h("div", { style: { borderBottom: "1px solid rgba(243,238,228,0.10)" } }, g[1].map(ligneChap)));
        }));
    }

    if (vue === "accueil" || vue === "journee") {
      var CSS = ".hcA-bloc{display:grid;grid-template-columns:1fr;max-width:1100px;margin:0 auto}" +
        ".hcA-photo{position:relative;height:clamp(210px,58vw,380px);overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 14%,#000 72%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0%,#000 14%,#000 72%,transparent 100%)}" +
        ".hcA-photo img{display:block;width:100%;height:100%;object-fit:cover}" +
        ".hcA-txt{padding:0 22px;max-width:680px;width:100%;box-sizing:border-box;margin:0 auto}" +
        ".hcA-duo{display:grid;grid-template-columns:1fr;gap:14px}" +
        ".hcA-fin{display:grid;grid-template-columns:1fr;gap:34px;max-width:1100px;margin:0 auto;padding:0 18px;box-sizing:border-box;align-items:center}" +
        ".hcA-pictos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-width:680px;margin:0 auto}" +
        "@media (min-width:760px){.hcA-bloc.hcA-cote{grid-template-columns:minmax(0,5fr) minmax(0,6fr);align-items:center;gap:8px}" +
        ".hcA-bloc.hcA-cote.hcA-inv>.hcA-photo{order:2}" +
        ".hcA-bloc.hcA-cote>.hcA-photo{height:100%;min-height:340px;-webkit-mask-image:linear-gradient(90deg,#000 62%,transparent 100%);mask-image:linear-gradient(90deg,#000 62%,transparent 100%)}" +
        ".hcA-bloc.hcA-cote.hcA-inv>.hcA-photo{-webkit-mask-image:linear-gradient(270deg,#000 62%,transparent 100%);mask-image:linear-gradient(270deg,#000 62%,transparent 100%)}" +
        ".hcA-duo{grid-template-columns:1fr 1fr}.hcA-fin{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px}}";
      function photo(img, pos) {
        return h("div", { className: "hcA-photo", "aria-hidden": "true" },
          h("img", { src: img.indexOf("/") >= 0 ? img : "images/guide-coach/" + img + ".webp", alt: "", decoding: "async", loading: "lazy", style: { objectPosition: pos, transform: rtlG ? "scaleX(-1)" : "none" } }));
      }
      function etiquette(lab, picto) {
        return h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          h("span", { style: { fontSize: 11, letterSpacing: "0.32em", color: "rgba(243,238,228,0.72)", fontWeight: 500, whiteSpace: "nowrap" } }, lab),
          h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(243,238,228,0.28), rgba(243,238,228,0))" } }),
          picto ? h("span", { "aria-hidden": "true", style: { color: IV, opacity: 0.85, display: "inline-flex" } }, ico(h, picto, 24)) : null);
      }
      function titre2(t) { return h("h2", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(30px, 8vw, 40px)", lineHeight: 1.08, margin: "10px 0 16px", color: IV } }, t); }
      function sousTitre(t) { return h("h3", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: 25, lineHeight: 1.15, margin: "6px 0 10px", color: IV } }, t); }
      function coches(l) {
        return h("ul", { style: { listStyle: "none", margin: "0 0 10px", padding: 0 } },
          l.map(function (t, i) {
            var bientot = typeof t !== "string"; var tx = bientot ? t[0] : t;
            return h("li", { key: i, style: { display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", columnGap: 10, fontSize: 15, lineHeight: 1.45, color: "#DEDAD2", padding: "5px 0" } },
              h("span", { "aria-hidden": "true", style: { color: IV, marginTop: 2, display: "inline-flex", opacity: bientot ? 0.45 : 0.9 } }, chk(17)),
              h("span", { style: { opacity: bientot ? 0.6 : 1 } }, tx, bientot ? h("span", { style: { marginInlineStart: 8, fontSize: 10.5, letterSpacing: "0.14em", color: CH, border: "1px solid rgba(201,166,107,0.45)", borderRadius: 999, padding: "1px 8px", whiteSpace: "nowrap" } }, "BIENTÔT") : null));
          }));
      }
      function chk(t) { return h("svg", { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 12.5l5 5L20 6.5" })); }
      function encart(enfants, k) { return h("div", { key: k, style: { border: "1px solid rgba(243,238,228,0.12)", borderRadius: 18, background: "#0B0E0C", padding: "18px 18px 16px" } }, enfants); }
      var _qHB = qHB;
      function envoyerHB() { try { window.__aideQuestion = String(_qHB || "").trim(); } catch (e) { } setEcran("aide"); }

      /* 14/11 10h35 (consigne « Refonte de la page d'accueil du Guide Coach », 4 univers) : présentation + sommaire fusionnés.
         01 Préparer mon concours · 02 Piloter mon équipe · 03 Prendre soin de mes chevaux · 04 Faire progresser mon équipe.
         Les 9 tutoriels sont accessibles en cartes dans leur univers ; ce qui n'existe pas encore est marqué « Bientôt ». */
      var CH9 = {}; CHAPS.forEach(function (g) { g[1].forEach(function (c) { CH9[c[1]] = c; }); });
      function carteChap(id) {
        var c = CH9[id]; var pg = PAGES[id] || {}; var im = pg.hero || "";
        var src = im ? (im.indexOf("/") >= 0 ? im : "images/guide-coach/" + im + ".webp") : "";
        function ouvrirC() { setVue(id); haut0(); }
        return h("div", { key: id, role: "button", tabIndex: 0, onClick: ouvrirC, onKeyDown: function (ev) { if (ev.key === "Enter") ouvrirC(); }, "data-coach-chap": id,
          style: { display: "grid", gridTemplateColumns: "84px minmax(0,1fr) 22px", alignItems: "center", columnGap: 14, padding: 8, paddingInlineEnd: 14, border: "1px solid rgba(243,238,228,0.16)", borderRadius: 16, background: "#0B0E0C", cursor: "pointer", minHeight: 84 } },
          h("div", { "aria-hidden": "true", style: { width: 84, height: 84, borderRadius: 12, overflow: "hidden", background: "#111" } },
            src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", style: { display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "75% 35%" } }) : null),
          h("div", { style: { minWidth: 0 } },
            h("div", { style: { fontSize: 10.5, letterSpacing: "0.22em", color: "rgba(243,238,228,0.6)" } }, "TUTORIEL " + c[0]),
            h("div", { style: { fontSize: 16.5, fontWeight: 600, color: IV, lineHeight: 1.25, marginTop: 4 } }, c[2]),
            h("div", { style: { fontSize: 14, color: "#DEDAD2", marginTop: 3, lineHeight: 1.4 } }, c[3])),
          h("div", { "aria-hidden": "true", style: { color: IV, fontSize: 24, lineHeight: 1, textAlign: "end", opacity: 0.8 } }, rtlG ? "‹" : "›"));
      }
      function cartes(ids) { return h("div", { style: { display: "grid", gap: 10, marginTop: 20 } }, h("div", { style: { fontSize: 11, letterSpacing: "0.3em", color: "rgba(243,238,228,0.6)" } }, ids.length > 1 ? "LES TUTORIELS" : "LE TUTORIEL"), ids.map(carteChap)); }
      function aller(ph) { try { var el = document.getElementById("hc-" + ph); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { } }
      function groupe(titre, items) {
        return h("div", { style: { marginTop: 18 } },
          h("div", { style: { fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: IV, lineHeight: 1.15, marginBottom: 4 } }, titre),
          coches(items));
      }
      function exemple(k, kicker, titre, corps) {
        return h("div", { key: k, style: { marginTop: 16 } }, encart([
          h("div", { key: "k", style: { fontSize: 10.5, letterSpacing: "0.26em", color: "rgba(243,238,228,0.6)" } }, kicker),
          h("div", { key: "t", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.2, margin: "6px 0 8px" } }, titre),
          h("div", { key: "c" }, corps)], "ex" + k));
      }
      function p(t, k) { return h("p", { key: k, style: { fontSize: 15, lineHeight: 1.5, color: "#DEDAD2", margin: k ? "8px 0 0" : 0 } }, t); }
      function enTete(n, nom, benefice, picto) {
        return h(React.Fragment, null,
          h("div", { style: { display: "flex", alignItems: "baseline", gap: 12 } },
            h("span", { style: { fontFamily: SERIF, fontSize: 30, color: CH, lineHeight: 1 } }, n),
            h("span", { style: { fontSize: 11.5, letterSpacing: "0.26em", color: "rgba(243,238,228,0.75)", fontWeight: 500 } }, nom),
            h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(243,238,228,0.28), rgba(243,238,228,0))", alignSelf: "center" } }),
            picto ? h("span", { "aria-hidden": "true", style: { color: IV, opacity: 0.85, display: "inline-flex", alignSelf: "center" } }, ico(h, picto, 24)) : null),
          titre2(benefice));
      }
      function lienVers(lab, ecran) { return h("button", { type: "button", onClick: function () { aller2(ecran); }, style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: 0, marginTop: 8, border: "none", background: "transparent", color: IV, opacity: 0.85, fontFamily: M, fontSize: 14, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: "rgba(243,238,228,0.3)", cursor: "pointer" } }, lab, h("span", { "aria-hidden": "true" }, rtlG ? "←" : "→")); }
      function aller2(ec) { try { setEcran(ec); } catch (e) { } }

      return h("div", { "data-noswipe": "1", style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 8 } },
        h("style", null, CSS + ".hcA-nav4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}@media (min-width:760px){.hcA-nav4{grid-template-columns:repeat(4,minmax(0,1fr))}}"),
        heroVid("coach-acc-entete_cheval", "76% 40%", "GUIDE COACH", "Le guide du coach", "Avant, pendant et après le concours.", null),
        h("div", { style: { maxWidth: 680, margin: "22px auto 0", padding: "0 22px" } },
          p("Prépare tes concours, organise ton équipe, accompagne tes chevaux et transforme chaque parcours en une occasion de progresser.", 0),
          p("De la préparation des engagements à l’analyse des performances, Hype t’accompagne à chaque étape.", 1),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.25, marginTop: 14 } }, "Concentre-toi sur la performance.", h("br"), "Hype gère la logistique."),
          /* accès rapide aux 4 univers */
          h("nav", { className: "hcA-nav4", "aria-label": "Les quatre univers du guide", style: { marginTop: 22 } },
            [["u1", "01", "Préparer mon concours"], ["u2", "02", "Piloter mon équipe"], ["u3", "03", "Prendre soin de mes chevaux"], ["u4", "04", "Faire progresser mon équipe"]].map(function (r) {
              return h("button", { key: r[0], type: "button", onClick: function () { aller(r[0]); }, "data-coach-phase": r[0],
                style: { textAlign: "start", minHeight: 74, padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(243,238,228,0.18)", background: "#0B0E0C", color: IV, fontFamily: M, cursor: "pointer" } },
                h("div", { style: { fontFamily: SERIF, fontSize: 20, color: CH, lineHeight: 1 } }, r[1]),
                h("div", { style: { fontSize: 14, fontWeight: 600, lineHeight: 1.25, marginTop: 6 } }, r[2]));
            }))),

        /* 01 — PRÉPARER MON CONCOURS : photo à côté, groupes, deux exemples */
        h("section", { id: "hc-u1", className: "hcA-bloc hcA-cote", style: { marginTop: 44, scrollMarginTop: 16 } },
          photo("coach-acc-camion_soir", "80% 50%"),
          h("div", { className: "hcA-txt" },
            enTete("01", "PRÉPARER MON CONCOURS", "Prépare sans tout ressaisir.", "agenda"),
            groupe("Les engagements", ["Sélectionner les cavaliers, leurs chevaux et leurs épreuves.", "Retrouver automatiquement les licences renseignées dans les profils.", "Préparer et vérifier les engagements de toute l’équipe.", "Générer, imprimer ou enregistrer la fiche d’engagement en PDF."]),
            groupe("La feuille de route", ["Organiser les horaires d’embarquement et de départ.", "Retrouver l’itinéraire du concours.", "Calculer l’ordre d’embarquement selon les passages.", "Préparer la liste du matériel à emporter.", "Retrouver le matériel et les consignes propres à chaque cheval.", "Accéder aux documents des chevaux et du camion.", "Anticiper les échéances administratives et sanitaires."]),
            groupe("Le programme", ["Importer une capture d’écran ou un document contenant les listes de départ.", "Retrouver les cavaliers et les chevaux déjà enregistrés dans Hype.", "Renseigner les horaires des épreuves et des reconnaissances.", "Calculer les heures de passage estimées.", "Retrouver les documents du concours sans avoir à les transmettre plusieurs fois."]),
            h("div", { className: "hcA-duo" },
              exemple(1, "EXEMPLE", "Une capture d’écran suffit.", p("Transmets la liste de départ du concours. Hype retrouve les informations de ton équipe et t’aide à préparer son programme.", 0)),
              exemple(2, "PARLE AVEC HYPE", "« La reconnaissance de la Club 3 est à 7h30 et la Club 2 commence à 10h40. »", p("Échange avec Hype, précise les informations et valide les horaires proposés.", 0))),
            cartes(["engagements", "feuille", "programme"]))),

        /* 02 — PILOTER MON ÉQUIPE : grande photo, groupes, avant / après */
        h("section", { id: "hc-u2", className: "hcA-bloc", style: { marginTop: 52, scrollMarginTop: 16 } },
          photo("coach-acc-cso", "84% 40%"),
          h("div", { className: "hcA-txt" },
            enTete("02", "PILOTER MON ÉQUIPE", "Garde le fil, même quand tout change.", "drapeau"),
            groupe("Les passages", ["Retrouver les ordres de passage et les horaires estimés.", "Consulter les passages par épreuve, cavalier ou cheval.", "Modifier un cavalier ou un cheval.", "Enregistrer les non-partants.", "Retrouver les changements à déclarer au jury.", "Ajuster les horaires en fonction du déroulement réel du concours."]),
            /* situation concrète : avant / après (« Décaler l'épreuve » décale passages et rendez-vous ; prévenir = case à cocher) */
            exemple(3, "SITUATION", "Une épreuve prend 20 minutes de retard ?", h("div", null,
              p("Décale l’épreuve dans Hype.", 0),
              h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 } },
                [["AVANT", "10h40", "10h10"], ["APRÈS", "11h00", "10h30"]].map(function (c, k) {
                  return h("div", { key: k, style: { border: "1px solid rgba(243,238,228,0.14)", borderRadius: 12, padding: "10px 12px" } },
                    h("div", { style: { fontSize: 10.5, letterSpacing: "0.22em", color: k ? IV : "rgba(243,238,228,0.55)" } }, c[0]),
                    h("div", { style: { fontSize: 13.5, color: "#DEDAD2", marginTop: 6 } }, "Passage ", h("b", { style: { color: IV } }, c[1])),
                    h("div", { style: { fontSize: 13.5, color: "#DEDAD2", marginTop: 2 } }, "Rendez-vous ", h("b", { style: { color: IV } }, c[2])));
                })),
              p("Les heures de passage et les rendez-vous des groupes de paddock sont ajustés.", 1),
              p("Tu peux également choisir de prévenir les cavaliers.", 2))),
            groupe("Le paddock", ["Constituer automatiquement les groupes de détente selon les heures de passage.", "Calculer les heures de rendez-vous.", "Adapter les groupes à son organisation.", "Retrouver les consignes et le matériel propres à chaque cheval.", "Publier les groupes pour les rendre accessibles aux cavaliers.", "Prévenir les cavaliers 15 minutes avant leur reconnaissance."]),
            exemple(4, "EXEMPLE", "Ton équipe compte plusieurs cavaliers dans la même épreuve ?", h("div", null, p("Hype constitue les groupes de détente et calcule leurs heures de rendez-vous selon les passages.", 0), p("Tu peux modifier les groupes avant de les publier.", 1))),
            groupe("Le jour J", ["Retrouver toutes les informations utiles au même endroit.", "Accéder aux documents du concours.", "Suivre le direct du concours.", "Gérer les retards et les imprévus.", "Informer les cavaliers des changements.", "Activer les alertes utiles."]),
            cartes(["passages", "paddock", "jourj"]))),

        /* 03 — PRENDRE SOIN DE MES CHEVAUX : photo de l'autre côté, liste, exemple, lien Santé */
        h("section", { id: "hc-u3", className: "hcA-bloc hcA-cote hcA-inv", style: { marginTop: 52, scrollMarginTop: 16 } },
          photo("coach-hd-selle", "70% 50%"),
          h("div", { className: "hcA-txt" },
            enTete("03", "PRENDRE SOIN DE MES CHEVAUX", "Le concours se termine. L’attention portée au cheval continue.", "fer"),
            coches(["Organiser le retour des chevaux.", "Retrouver la liste du matériel pour ne rien oublier.", "Consulter les consignes propres à chaque cheval.", "Accompagner la récupération après l’effort.", "Retrouver les informations de santé.", "Consulter les soins et les traitements enregistrés.", "Accéder aux contenus pédagogiques sur la récupération et les soins.", "Partager les recommandations utiles avec les cavaliers."]),
            exemple(5, "EXEMPLE", "Chaque cheval a ses propres besoins.", p("Retrouve ses consignes, ses informations de santé et les recommandations utiles pour accompagner son retour à l’écurie.", 0)),
            lienVers("Ouvrir la santé de mes chevaux", "chevaux"),
            cartes(["retour"]))),

        /* 04 — FAIRE PROGRESSER MON ÉQUIPE : la partie la plus riche */
        h("section", { id: "hc-u4", className: "hcA-bloc", style: { marginTop: 52, scrollMarginTop: 16 } },
          photo("coach-hd-coach", "78% 30%"),
          h("div", { className: "hcA-txt" },
            enTete("04", "FAIRE PROGRESSER MON ÉQUIPE", "Transforme chaque parcours en une leçon.", "video"),
            h("div", { className: "hcA-duo" },
              h("div", null, groupe("Retrouver les performances", ["Importer les résultats du concours.", "Retrouver les résultats de chaque cavalier.", "Consulter les performances des chevaux.", "Suivre les résultats de chaque couple cavalier-cheval.", "Retrouver les classements, les statistiques et les sans-faute.", "Observer l’évolution des performances dans le temps."])),
              h("div", null, groupe("Retrouver et analyser les parcours", ["Chaque cavalier dispose de son espace pour partager ses vidéos.", "Retrouver les vidéos par cavalier.", "Retrouver les vidéos par cheval.", "Accéder à l’historique des vidéos d’un même couple.", "Comparer les parcours réalisés lors de différents concours.", "Commenter les vidéos et partager ses observations.", "Sélectionner un extrait précis et demander une analyse à Hey Baby."]))),
            exemple(6, "EXEMPLE", "Un virage difficile devient un exercice de travail.", h("div", null,
              p("Un cavalier rencontre une difficulté dans un virage serré.", 0),
              p("Tu sélectionnes l’extrait vidéo et échanges avec Hey Baby sur les causes possibles : équilibre, rêne extérieure, trajectoire ou position du cavalier.", 1),
              h("div", { style: { fontSize: 15, color: IV, margin: "10px 0 2px" } }, "Tu peux ensuite :"),
              coches(["Partager un conseil personnalisé avec ce cavalier.", "Transformer cette observation en un contenu pédagogique pour toute l’équipe.", "Préparer un exercice adapté pour la prochaine séance."]))),
            h("div", { className: "hcA-duo" },
              h("div", null, groupe("Accompagner individuellement", ["Échanger avec Hey Baby sur une difficulté rencontrée.", "Approfondir l’analyse.", ["Modifier ou compléter les conseils proposés."], ["Valider les conseils avant leur partage."], "Épingler un conseil privé destiné au cavalier concerné."])),
              h("div", null, groupe("Faire progresser toute l’équipe", ["Identifier une difficulté technique rencontrée en concours.", "Demander à Hey Baby de créer un contenu pédagogique à partir de cette difficulté.", ["Relire, modifier et valider le contenu."], "Partager un enseignement collectif sans identifier le cavalier à l’origine de l’observation.", "Épingler ce contenu sur la page de l’équipe.", "S’appuyer sur les observations pour préparer les prochaines séances."]))),
            h("div", { className: "hcA-duo", style: { marginTop: 16 } },
              encart([h("div", { key: "a", style: { display: "flex", alignItems: "center", gap: 10 } }, h("span", { "aria-hidden": "true", style: { display: "inline-flex", color: IV } }, ico(h, "bulle", 20)), h("span", { style: { fontSize: 16, fontWeight: 600, color: IV } }, "Un conseil individuel")),
                h("div", { key: "b", style: { fontSize: 14.5, lineHeight: 1.45, color: "#DEDAD2", marginTop: 8 } }, "Un retour personnalisé, visible uniquement par le coach et le cavalier concerné.")], "ind"),
              encart([h("div", { key: "a", style: { display: "flex", alignItems: "center", gap: 10 } }, h("span", { "aria-hidden": "true", style: { display: "inline-flex", color: IV } }, ico(h, "groupe", 20)), h("span", { style: { fontSize: 16, fontWeight: 600, color: IV } }, "Un enseignement collectif")),
                h("div", { key: "b", style: { fontSize: 14.5, lineHeight: 1.45, color: "#DEDAD2", marginTop: 8 } }, "Un contenu pédagogique anonymisé, accessible à toute l’équipe après validation du coach.")], "col")),
            p("Tu gardes toujours la maîtrise pédagogique et décides de ce qui est partagé.", 1),
            cartes(["resultats", "analyse"]))),

        /* conclusion : cycle de progression */
        h("div", { style: { maxWidth: 680, margin: "52px auto 0", padding: "26px 22px 0", borderTop: "1px solid rgba(243,238,228,0.10)" } }, Cycle(h, true)),
        h("div", { style: { maxWidth: 680, margin: "24px auto 0", padding: "0 22px", display: "flex", alignItems: "center", gap: 16 } },
          h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(243,238,228,0.25)" } }),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: IV, lineHeight: 1.2, textAlign: "center" } }, "Chaque concours prépare le suivant."),
          h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(243,238,228,0.25)" } })));
    }
    var PG = PAGES[vue] || PAGES.engagements;
    return h("div", { "data-noswipe": "1", style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 24 } },
      hero(PG.titre, PG.sous, PG.hero),
      h("div", { style: { maxWidth: 680, margin: "0 auto", padding: "10px 18px 0", display: "flex", flexDirection: "column", gap: 12 } },
        conc ? h("div", { style: { fontSize: 12, color: IV3 } }, "Concours : " + [conc.titre || conc.lieu || "", conc.date_jour ? new Date(conc.date_jour + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : ""].filter(Boolean).join(" · ")) : null,
        PG.cartes.map(function (c) {   /* 13/11 22h03 (Blandine) : carte repliée (titre + 1re phrase), qui se déplie au toucher */
          var ouv = !!deplie[vue + c.n];
          var tous = (c.texte ? [c.texte] : []).concat(c.paras || []);
          function basculer() { var o = Object.assign({}, deplie); o[vue + c.n] = !ouv; setDeplie(o); }
          function para(t, k) { var cit = /^\*.*\*$/.test(t); return h("div", { key: "p" + k, style: { color: cit ? IV : IV2, marginTop: k ? 6 : 4, lineHeight: 1.45, fontFamily: cit ? SERIF : M, fontStyle: cit ? "italic" : "normal", fontSize: cit ? 17 : 14 } }, gras(cit ? t.slice(1, -1) : t)); }
          /* carte façon maquette : numéro | filet | picto | titre + texte, photo à droite qui s'efface vers la gauche ; le détail se déplie dessous */
          var premier = String(tous[0] || "").replace(/^\*|\*$/g, "");
          var resteP = tous.slice(1);
          return h("div", { key: c.n, role: "button", tabIndex: 0, "aria-expanded": ouv, onClick: basculer, onKeyDown: function (ev) { if (ev.key === "Enter") basculer(); },
            style: { position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid " + (ouv ? "rgba(201,166,107,0.45)" : "rgba(243,238,228,0.14)"), background: "#0B0E0C", cursor: "pointer" } },
            /* 13/11 22h19 (cahier « Harmonisation graphique ») — en-tête de carte en couches :
               1 fond noir · 2 photo calée à droite · 3 dégradé noir sans démarcation · 4 numéro, filet, picto, titre, phrase (pleine largeur) */
            h("div", { style: { position: "relative", overflow: "hidden" } },
              c.img ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, backgroundImage: "url(images/guide-coach/" + c.img + ".webp)", backgroundSize: "cover", backgroundPosition: rtlG ? "left center" : "right center", transform: rtlG ? "scaleX(-1)" : "none" } }) : null,   /* 22h22 : fonds pleine largeur, dégradé déjà dans l'image */
              c.img ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlG ? "270deg" : "90deg") + ", rgba(11,14,12,0.96) 0%, rgba(11,14,12,0.93) 46%, rgba(11,14,12,0.72) 64%, rgba(11,14,12,0.28) 84%, rgba(11,14,12,0.04) 100%)" } }) : null,   /* 22h26 : dégradé renforcé derrière le texte */
              h("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 9, padding: "16px 15px 16px 12px", minHeight: 100, boxSizing: "border-box" } },
                h("div", { style: { flex: "0 0 26px", fontFamily: SERIF, fontWeight: 400, fontSize: 28, color: CH, lineHeight: 1, textAlign: "center" } }, c.n),
                h("div", { "aria-hidden": "true", style: { flex: "0 0 1px", alignSelf: "stretch", background: "rgba(201,166,107,0.35)", margin: "8px 0" } }),
                h("span", { style: { flex: "0 0 22px", display: "flex" } }, ico(h, c.ico, 22)),
                h("div", { style: { flex: "1 1 auto", minWidth: 0 } },
                  h("div", { style: { fontSize: 16.5, fontWeight: 600, color: IV, lineHeight: 1.3, textShadow: "0 1px 8px rgba(0,0,0,.95)" } }, c.titre, c.accent ? h(React.Fragment, null, " ", h("span", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 18.5, color: CH } }, c.accent)) : null),
                  h("div", { style: { fontSize: 15, fontWeight: 400, color: "#E8E4DC", marginTop: 4, lineHeight: 1.45, textShadow: "0 1px 8px rgba(0,0,0,.95)" } }, gras(premier))))),
            ouv ? h("div", { style: { position: "relative", padding: "12px 16px 16px", borderTop: "1px solid rgba(201,166,107,0.18)" } },
              /* la flèche, à droite : rejoindre la page concernée */
              h("button", { type: "button", "aria-label": "Ouvrir la page", onClick: function (ev) { ev.stopPropagation(); aller(c.ecran); }, style: { position: "absolute", top: 12, right: 14, width: 38, height: 38, borderRadius: "50%", border: "1px solid " + CH, background: "transparent", color: CH, fontSize: 18, cursor: "pointer" } }, "→"),
              h("div", { style: { paddingInlineEnd: 46 } },
                resteP.map(function (t, k) { return para(t, k + 1); }),
                c.liste ? h("ul", { style: { margin: "6px 0 0", paddingInlineStart: 18, fontSize: 14, color: IV2, lineHeight: 1.455 } }, c.liste.map(function (t, k) { return h("li", { key: k }, t); })) : null,
                (c.apres || []).map(function (t, k) { return h("div", { key: "a" + k, style: { fontSize: 14, color: IV2, marginTop: 8, lineHeight: 1.45 } }, gras(t)); })),
              c.capture ? h("img", { src: "images/guide-coach/" + c.capture + ".jpg", alt: "", loading: "lazy", style: { display: "block", width: "100%", maxWidth: 360, height: "auto", marginTop: 14, borderRadius: 12, border: "1px solid rgba(201,166,107,0.28)" } }) : null) : null);
        }),
        (function () {   /* « À savoir » : 1re phrase, le reste se déplie */
          var ouvS = !!deplie[vue + "savoir"];
          var m = String(PG.savoir).match(/^(.*?[.!?])\s+(.*)$/); var p1 = m ? m[1] : PG.savoir, p2 = m ? m[2] : "";
          function bS() { var o = Object.assign({}, deplie); o[vue + "savoir"] = !ouvS; setDeplie(o); }
          return h("div", { role: p2 ? "button" : undefined, tabIndex: p2 ? 0 : undefined, onClick: p2 ? bS : undefined, style: { display: "grid", gridTemplateColumns: "22px auto 1px minmax(0,1fr)", alignItems: "center", columnGap: 10, padding: "16px 15px 16px 12px", borderRadius: 16, border: "1px solid rgba(243,238,228,0.16)", cursor: p2 ? "pointer" : "default" } },
            h("span", { style: { display: "flex" } }, ico(h, "info", 22)), h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: IV, whiteSpace: "nowrap" } }, "À savoir"),
            h("div", { "aria-hidden": "true", style: { alignSelf: "stretch", background: "rgba(201,166,107,0.5)" } }),
            h("div", { style: { fontSize: 15, color: "#E8E4DC", lineHeight: 1.45 } }, gras(p1), ouvS && p2 ? h("div", { style: { marginTop: 6 } }, gras(p2)) : (p2 ? h("span", { style: { color: CH } }, " …") : null)));
        })(),
        PG.vocal ? h("div", { style: { display: "grid", gridTemplateColumns: "30px minmax(0,1fr)", columnGap: 12, alignItems: "start", padding: "16px 16px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(160deg, rgba(201,166,107,0.07), rgba(201,166,107,0.01))" } },
          ico(h, "micro"),
          h("div", null, h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.15 } }, PG.vocal.titre), (PG.vocal.exemples || []).map(function (x, k) { return h("div", { key: k, style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: CH, lineHeight: 1.35, marginTop: k ? 4 : 8 } }, x); }), h("div", { style: { fontSize: 14, color: IV2, lineHeight: 1.45, marginTop: 6 } }, gras(PG.vocal.texte)))) : null,
        PG.signature ? h("div", { style: { textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.3, margin: "14px 0 4px" } }, PG.signature[0], h("br"), h("span", { style: { color: CH } }, PG.signature[1])) : null),
      PG.cycle ? h("div", { style: { maxWidth: 680, margin: "0 auto", padding: "0 18px" } }, Cycle(h)) : null,
      (PG.bas || "coach-fr-camion") ? h("div", { style: { position: "relative", maxWidth: 900, margin: "22px auto 0" } },
        h("img", { src: "images/guide-coach/" + (PG.bas || "coach-fr-camion") + ".webp", alt: "", loading: "lazy", style: { display: "block", width: "100%", height: "auto" } }),
        courbe(true)) : null,
      /* frise : les moments de la journée, chacun mène à sa page */
      h("div", { "data-coach-frise": "1", style: { maxWidth: 680, margin: "26px auto 0", padding: "0 12px 6px", display: "flex", alignItems: "center", overflowX: "auto", scrollbarWidth: "none" } },
        FRISE.map(function (f, i) {
          var ici = f.id === vue;
          return h(React.Fragment, { key: f.id },
            i ? h("span", { "aria-hidden": "true", style: { flex: "0 0 18px", height: 1, background: "rgba(201,166,107,0.45)" } }) : null,
            h("button", { type: "button", "aria-current": ici ? "page" : undefined, onClick: function () { if (ici) return; if (PAGES[f.id]) setVue(f.id); else aller(f.ecran); },
              style: { flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "8px 5px", borderRadius: 12, border: "1px solid " + (ici ? CH : "transparent"), background: "transparent", color: IV, fontFamily: M, fontSize: 10.5, cursor: ici ? "default" : "pointer" } },
              h("span", { style: { display: "flex", transform: "scale(0.85)" } }, ico(h, f.ico)), f.nom));
        })),
      /* 14/11 : chapitre précédent / suivant + retour à l'accueil du guide */
      (function () {
        var ids = FRISE.map(function (f) { return f.id; }).filter(function (x) { return PAGES[x]; }); var k = ids.indexOf(vue);
        var prec = k > 0 ? ids[k - 1] : null, suiv = k >= 0 && k < ids.length - 1 ? ids[k + 1] : null;
        function lien(id, sens) {
          if (!id) return h("span", { style: { flex: 1 } });
          return h("button", { type: "button", "data-coach-nav": sens, onClick: function () { setVue(id); try { var z = document.getElementById("hype-defile"); if (z) z.scrollTo(0, 0); } catch (e) { } },
            style: { flex: 1, minWidth: 0, minHeight: 64, padding: "10px 14px", borderRadius: 14, border: "1px solid rgba(243,238,228,0.16)", background: "transparent", color: IV, fontFamily: M, cursor: "pointer", textAlign: sens === "prec" ? "start" : "end" } },
            h("div", { style: { fontSize: 11.5, letterSpacing: "0.08em", color: "rgba(243,238,228,0.6)" } }, sens === "prec" ? ((rtlG ? "› " : "‹ ") + "Chapitre précédent") : ("Chapitre suivant" + (rtlG ? " ‹" : " ›"))),
            h("div", { style: { fontSize: 15, fontWeight: 600, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, PAGES[id].titre));
        }
        return h("div", { style: { maxWidth: 680, margin: "14px auto 0", padding: "0 16px", boxSizing: "border-box" } },
          h("div", { style: { display: "flex", gap: 10 } }, lien(prec, "prec"), lien(suiv, "suiv")),
          h("div", { style: { textAlign: "center", marginTop: 6 } },
            h("button", { type: "button", "data-coach-nav": "accueil", onClick: retour, style: { minHeight: 44, padding: "8px 16px", border: "none", background: "transparent", color: "rgba(243,238,228,0.75)", fontFamily: M, fontSize: 14, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: "rgba(243,238,228,0.3)", cursor: "pointer" } }, "Tous les chapitres du guide")));
      })());
  }

  window.HypeCoach = { Guide: EcranGuideCoach };
})();
