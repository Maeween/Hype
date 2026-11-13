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
    if (nom === "info") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 9 }), h("path", { d: "M12 11v6M12 7.5v.01" }));
    if (nom === "programme") return h("svg", p, h("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }), h("path", { d: "M8 9h8M8 12h8M8 15h5" }));
    if (nom === "paddock") return h("svg", p, h("path", { d: "M6 4c-1.5 4-1.5 9 1 12.5M18 4c1.5 4 1.5 9-1 12.5M7 16.5c1.5 2.2 3 3.5 5 3.5s3.5-1.3 5-3.5" }));
    if (nom === "drapeau") return h("svg", p, h("path", { d: "M5 21V4M5 4h11l-2 4 2 4H5" }));
    if (nom === "coupe") return h("svg", p, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 21h6M10 17h4" }));
    return null;
  }

  /* Les pages du guide : textes = mots exacts des maquettes de Blandine (travaillées avec ChatGPT) */
  var PAGES = {
    engagements: { titre: "Engagements", sous: "Préparer, valider et éditer mes engagements.", cartes: [
      { n: "01", ico: "agenda", img: "coach-eng-fond-01", capture: "coach-cap-eng-nouveau", titre: "Préparer mes engagements", ecran: "engagements",
        paras: ["Choisis ton concours, les épreuves, les cavaliers et les chevaux.", "Renseigne les informations nécessaires :"],
        liste: ["Numéro et date du concours.", "Épreuves.", "Couples cavalier-cheval.", "Numéros de licence et SIRE.", "Chef d'équipe.", "Tarifs des engagements et du transport."],
        apres: ["Si tes cavaliers et tes chevaux ont déjà un profil sur Hype, tout se remplit automatiquement : numéros de licence, numéros SIRE… Pas de double saisie."] },
      { n: "02", ico: "micro", img: "coach-eng-fond-02", capture: "coach-cap-eng-voix", titre: "Gère tes engagements,", accent: "même en vocal", ecran: "engagements",
        paras: ["Tu peux dicter directement tes engagements à Hype, sans avoir à les saisir un par un.", "Par exemple :", "*« Engage Lauren avec Yellow en Club 3 et Emma avec Apache en Club 2. »*", "Hype récupère les informations, prépare les engagements et te les soumet pour validation.", "Tu peux également demander des modifications à la voix, à tout moment."] },
      { n: "03", ico: "pdf", img: "coach-eng-fond-03", capture: "coach-cap-eng-feuille", titre: "Sortir ma fiche d'engagement", ecran: "engagements",
        paras: ["Vérifie tes engagements et génère automatiquement ta fiche récapitulative, prête à imprimer ou à transmettre."] },
      { n: "04", ico: "maj", img: "coach-eng-fond-04", capture: "coach-cap-eng-registre", titre: "Mise à jour automatique", ecran: "registre-mouvements",
        paras: ["Les déplacements des chevaux liés au concours sont automatiquement enregistrés dans le **registre d'élevage** de l'écurie.", "Pas besoin de saisir une seconde fois les informations."] }
    ], bas: "coach-eng-camion", hero: "coach-eng-hero", savoir: "Tes engagements constituent le point de départ de toute l'organisation du concours. Hype réutilise ces informations pour préparer ta feuille de route, organiser le transport, calculer les passages et générer les groupes de détente lorsque les informations officielles sont disponibles." },
    feuille: { titre: "Feuille de route", sous: "Préparer mon équipe, mes chevaux et mon déplacement.", hero: "coach-fr-hero", bas: "coach-fr-camion", cartes: [
      { n: "01", ico: "lieu", img: "coach-fr-fond-01", capture: "coach-cap-fr-infos", titre: "Informations du concours", ecran: "concours",
        paras: ["Retrouve le lieu, les informations pratiques et l'itinéraire."],
        liste: ["Renseigne les informations pratiques du concours.", "Retrouve l'adresse et le lieu de rendez-vous.", "Lance directement l'itinéraire GPS.", "Les cavaliers et les accompagnants ayant un compte Hype peuvent consulter ces informations."] },
      { n: "02", ico: "horloge", img: "coach-fr-fond-02", capture: "coach-cap-fr-horaires", titre: "Horaires du concours", ecran: "concours",
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
    ], savoir: "Les copies numériques peuvent te dépanner, mais ne remplacent pas les documents originaux exigés lors d'un contrôle.",
      vocal: { titre: "Tu parles. Hype organise.", texte: "Dicte tes horaires, vérifie les informations et valide." },
      signature: ["Concentre-toi sur la performance.", "Hype gère la logistique."] },
    paddock: { titre: "Paddock", sous: "Organiser mes groupes, mes départs et mes rappels", cartes: [
      { n: "01", ico: "micro", titre: "Gère ton concours,", accent: "même en vocal", texte: "Dicte à Hype tes horaires, épreuves, consignes ou modifications, à tout moment de la journée.", ecran: "concours" },
      { n: "02", ico: "groupe", titre: "Génère tes groupes automatiquement", texte: "Hype analyse le type d'épreuve, l'ordre des passages et les horaires pour créer les groupes de détente et calculer les heures de départ.", ecran: "concours" },
      { n: "03", ico: "reglages", titre: "Personnalise ton organisation", texte: "Modifie les groupes, déplace des cavaliers, ajuste les rendez-vous et ajoute des consignes si besoin.", ecran: "concours" },
      { n: "04", ico: "maj", titre: "Gère les imprévus en temps réel", texte: "Une épreuve prend du retard ? Dis-le à Hype (à la voix ou en un clic) : les horaires sont automatiquement décalés, les groupes recalculés et l'organisation mise à jour.", ecran: "concours" },
      { n: "05", ico: "cloche", titre: "Envoie les rappels aux cavaliers", texte: "Les cavaliers reçoivent sur leur téléphone des notifications aux moments clés (ex. : 15 minutes avant la reconnaissance), automatiquement mises à jour en cas de changement.", ecran: "concours" }
    ], savoir: "Tu peux dicter, modifier ou décaler une épreuve à tout moment. Hype recalcule les horaires, met à jour les groupes et renvoie les notifications aux cavaliers après ta validation." }
  };
  var FRISE = [   /* les 7 chapitres du guide (maquette « Navigation du guide ») */
    { id: "engagements", nom: "Engagements", ico: "agenda", ecran: "engagements" },
    { id: "feuille", nom: "Feuille de route", ico: "route", ecran: "concours" },
    { id: "programme", nom: "Programme", ico: "programme", ecran: "concours" },
    { id: "passages", nom: "Passages", ico: "liste", ecran: "concours" },
    { id: "paddock", nom: "Paddock", ico: "paddock", ecran: "concours" },
    { id: "jourj", nom: "Jour J", ico: "drapeau", ecran: "jour-j" },
    { id: "resultats", nom: "Résultats", ico: "coupe", ecran: "concours" }
  ];

  function EcranGuideCoach() {
    var h = React.createElement;
    var app = ((typeof useApp === "function") ? useApp() : null) || {};
    var setEcran = app.setEcran || function () { };
    var _c = React.useState(null); var conc = _c[0], setConc = _c[1];
    var _d = React.useState({}); var deplie = _d[0], setDeplie = _d[1];
    var rtlG = app.langue === "ar" || app.langue === "fa";
    var _v = React.useState(function () { try { var v = window.__coachVue || "accueil"; window.__coachVue = null; return (v === "accueil" || v === "journee" || PAGES[v]) ? v : "accueil"; } catch (e) { return "accueil"; } });
    var vue = _v[0], setVue = _v[1];
    React.useEffect(function () { try { window.__coachVueOuverte = vue; window.scrollTo(0, 0); var z = document.getElementById("hype-defile"); if (z) z.scrollTo(0, 0); } catch (e) { } }, [vue]);
    React.useEffect(function () { return function () { try { window.__coachVueOuverte = null; } catch (e) { } }; }, []);
    function retour() { if (PAGES[vue]) setVue("journee"); else if (vue === "journee") setVue("accueil"); else if (app.retourEcran) app.retourEcran(); else setEcran("aide"); }
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
    function hero(titre, sous, img) {   /* héros : cheval noir entier, titre, courbe dorée */
      return h("div", { style: { position: "relative", maxWidth: 900, margin: "0 auto" } },
        img ? h("img", { src: "images/guide-coach/" + img + ".webp", alt: "", style: { display: "block", width: "100%", height: "clamp(270px, 66vw, 480px)", objectFit: "cover", objectPosition: "right center" } })
          : h("img", { src: "images/portrait-defaut-noir.webp", alt: "", style: { display: "block", width: "100%", height: "clamp(380px, 62vh, 560px)", objectFit: "cover", objectPosition: "72% 30%" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,10,8,0.85) 0%, rgba(7,10,8,0.35) 55%, rgba(7,10,8,0) 100%)" } }),
        h("button", { type: "button", onClick: retour, "aria-label": "Retour", style: { position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 14px)", left: 14, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.45)", background: "rgba(9,13,17,0.35)", color: IV, fontSize: 18, cursor: "pointer" } }, "‹"),
        h("div", { style: { position: "absolute", left: 22, right: "30%", bottom: "20%" } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
            h("span", { style: { fontSize: 10.5, letterSpacing: "0.36em", color: CH, fontWeight: 500 } }, "GUIDE COACH"),
            h("span", { "aria-hidden": "true", style: { width: 44, height: 1, background: CH } })),
          h("div", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: titre.length > 14 ? "clamp(32px, 8.4vw, 60px)" : "clamp(40px, 11vw, 72px)", lineHeight: 1, marginTop: 8 } }, titre),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(17px, 4.6vw, 26px)", color: IV2, marginTop: 8, lineHeight: 1.2 } }, sous)),
        courbe(true));
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
    if (vue === "accueil") {
      return h("div", { style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 24 } },
        hero("Le guide du coach", "Tous les tutos pour accompagner tes cavaliers"),
        h("div", { style: { maxWidth: 680, margin: "0 auto", padding: "10px 18px 0", display: "flex", flexDirection: "column", gap: 12 } },
          carteListe(null, "Organiser une journée de compétition", "Engagements, programme, paddock, jour J, résultats.", function () { setVue("journee"); }, "j")));
    }
    if (vue === "journee") {
      var JOUR = [
        ["01", "Engagements", "Préparer, valider et éditer mes engagements.", function () { setVue("engagements"); }],
        ["02", "Feuille de route", "Préparer mon équipe, mes chevaux et mon déplacement.", function () { setVue("feuille"); }],
        ["03", "Programme", "", null],
        ["04", "Passages", "", null],
        ["05", "Paddock", "Organiser mes groupes, mes départs et mes rappels", function () { setVue("paddock"); }],
        ["06", "Jour J", "", null],
        ["07", "Résultats", "", null]
      ];
      return h("div", { style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 24 } },
        hero("Journée de compétition", "Organiser une journée de compétition, étape par étape"),
        h("div", { style: { maxWidth: 680, margin: "0 auto", padding: "10px 18px 0", display: "flex", flexDirection: "column", gap: 12 } },
          JOUR.map(function (j) { return carteListe(j[0], j[1], j[2], j[3], j[0]); })));
    }
    var PG = PAGES[vue] || PAGES.engagements;
    return h("div", { style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 24 } },
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
              c.img ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlG ? "270deg" : "90deg") + ", rgba(11,14,12,0.94) 0%, rgba(11,14,12,0.88) 48%, rgba(11,14,12,0.62) 70%, rgba(11,14,12,0.22) 88%, rgba(11,14,12,0.05) 100%)" } }) : null,   /* 22h26 : dégradé renforcé derrière le texte */
              h("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 11, padding: "16px 15px", minHeight: 100, boxSizing: "border-box" } },
                h("div", { style: { flex: "0 0 30px", fontFamily: SERIF, fontWeight: 400, fontSize: 30, color: CH, lineHeight: 1, textAlign: "center" } }, c.n),
                h("div", { "aria-hidden": "true", style: { flex: "0 0 1px", alignSelf: "stretch", background: "rgba(201,166,107,0.35)", margin: "8px 0" } }),
                h("span", { style: { flex: "0 0 24px", display: "flex" } }, ico(h, c.ico, 24)),
                h("div", { style: { flex: "1 1 auto", minWidth: 0 } },
                  h("div", { style: { fontSize: 16, fontWeight: 600, color: IV, lineHeight: 1.3, textShadow: "0 1px 8px rgba(0,0,0,.95)" } }, c.titre, c.accent ? h(React.Fragment, null, " ", h("span", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 18.5, color: CH } }, c.accent)) : null),
                  h("div", { style: { fontSize: 14.5, color: IV2, marginTop: 4, lineHeight: 1.4, textShadow: "0 1px 8px rgba(0,0,0,.95)" } }, gras(premier))))),
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
          return h("div", { role: p2 ? "button" : undefined, tabIndex: p2 ? 0 : undefined, onClick: p2 ? bS : undefined, style: { display: "grid", gridTemplateColumns: "30px auto 1px minmax(0,1fr)", alignItems: "center", columnGap: 12, padding: "16px 16px", borderRadius: 16, border: "1px solid rgba(243,238,228,0.16)", cursor: p2 ? "pointer" : "default" } },
            ico(h, "info"),
            h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 21, color: IV } }, "À savoir"),
            h("div", { "aria-hidden": "true", style: { alignSelf: "stretch", background: "rgba(201,166,107,0.5)" } }),
            h("div", { style: { fontSize: 14, color: IV2, lineHeight: 1.45 } }, gras(p1), ouvS && p2 ? h("div", { style: { marginTop: 6 } }, gras(p2)) : (p2 ? h("span", { style: { color: CH } }, " …") : null)));
        })(),
        PG.vocal ? h("div", { style: { display: "grid", gridTemplateColumns: "30px minmax(0,1fr)", columnGap: 12, alignItems: "start", padding: "16px 16px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.35)", background: "linear-gradient(160deg, rgba(201,166,107,0.07), rgba(201,166,107,0.01))" } },
          ico(h, "micro"),
          h("div", null, h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.15 } }, PG.vocal.titre), h("div", { style: { fontSize: 14, color: IV2, lineHeight: 1.45, marginTop: 6 } }, gras(PG.vocal.texte)))) : null,
        PG.signature ? h("div", { style: { textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV, lineHeight: 1.3, margin: "14px 0 4px" } }, PG.signature[0], h("br"), h("span", { style: { color: CH } }, PG.signature[1])) : null),
      PG.bas ? h("div", { style: { position: "relative", maxWidth: 900, margin: "22px auto 0" } },
        h("img", { src: "images/guide-coach/" + PG.bas + ".webp", alt: "", loading: "lazy", style: { display: "block", width: "100%", height: "auto" } }),
        courbe(true)) : null,
      /* frise : les moments de la journée, chacun mène à sa page */
      h("div", { style: { maxWidth: 680, margin: "26px auto 0", padding: "0 12px 6px", display: "flex", alignItems: "center", overflowX: "auto", scrollbarWidth: "none" } },
        FRISE.map(function (f, i) {
          var ici = f.id === vue;
          return h(React.Fragment, { key: f.id },
            i ? h("span", { "aria-hidden": "true", style: { flex: "0 0 18px", height: 1, background: "rgba(201,166,107,0.45)" } }) : null,
            h("button", { type: "button", "aria-current": ici ? "page" : undefined, onClick: function () { if (ici) return; if (PAGES[f.id]) setVue(f.id); else aller(f.ecran); },
              style: { flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "8px 5px", borderRadius: 12, border: "1px solid " + (ici ? CH : "transparent"), background: "transparent", color: IV, fontFamily: M, fontSize: 10.5, cursor: ici ? "default" : "pointer" } },
              h("span", { style: { display: "flex", transform: "scale(0.85)" } }, ico(h, f.ico)), f.nom));
        })));
  }

  window.HypeCoach = { Guide: EcranGuideCoach };
})();
