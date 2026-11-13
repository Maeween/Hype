/* hype-ecran-coach.js — 13/11/2026 (Blandine) — GUIDE COACH, page « Engagements » (modèle donné par Blandine).
   Page par page : seule la page Engagements existe pour l'instant (adresse 2hype.fr/#guide-coach).
   Chaque carte mène à l'endroit de l'appli (le concours ouvert en dernier, sinon la page de l'équipe).
   La frise du bas mène aux pages de l'appli pour chaque moment de la journée.
   Français seulement : les 15 langues viendront après relecture (règle du 02/11). */
(function () {
  var CH = "#C9A66B", IV = "#F3EEE4", IV2 = "rgba(243,238,228,0.74)", IV3 = "rgba(243,238,228,0.52)", BG = "#070A08";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',system-ui,sans-serif";

  function ico(h, nom) {   /* petits pictos au trait, couleur ivoire */
    var p = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: IV, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
    if (nom === "agenda") return h("svg", p, h("rect", { x: 3, y: 5, width: 18, height: 16, rx: 2 }), h("path", { d: "M3 10h18M8 3v4M16 3v4" }));
    if (nom === "pdf") return h("svg", p, h("path", { d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" }), h("path", { d: "M14 3v5h5" }), h("text", { x: 12, y: 17.5, textAnchor: "middle", fontSize: 5.5, fontFamily: M, fontWeight: 700, fill: IV, stroke: "none" }, "PDF"));
    if (nom === "maj") return h("svg", p, h("path", { d: "M20 11a8 8 0 0 0-14.3-4.9L4 8" }), h("path", { d: "M4 3v5h5" }), h("path", { d: "M4 13a8 8 0 0 0 14.3 4.9L20 16" }), h("path", { d: "M20 21v-5h-5" }));
    if (nom === "info") return h("svg", p, h("circle", { cx: 12, cy: 12, r: 9 }), h("path", { d: "M12 11v6M12 7.5v.01" }));
    if (nom === "programme") return h("svg", p, h("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }), h("path", { d: "M8 9h8M8 12h8M8 15h5" }));
    if (nom === "paddock") return h("svg", p, h("path", { d: "M6 4c-1.5 4-1.5 9 1 12.5M18 4c1.5 4 1.5 9-1 12.5M7 16.5c1.5 2.2 3 3.5 5 3.5s3.5-1.3 5-3.5" }));
    if (nom === "drapeau") return h("svg", p, h("path", { d: "M5 21V4M5 4h11l-2 4 2 4H5" }));
    if (nom === "coupe") return h("svg", p, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 21h6M10 17h4" }));
    return null;
  }

  var CARTES = [
    { n: "01", ico: "agenda", titre: "Saisir mes engagements", texte: "Choisis le concours, les épreuves, les cavaliers et les chevaux.", ecran: "engagements" },
    { n: "02", ico: "pdf", titre: "Sortir ma fiche d'engagement", texte: "Génère la fiche récapitulative prête à transmettre.", ecran: "engagements" },
    { n: "03", ico: "maj", titre: "Mise à jour automatique", texte: "Le déplacement des chevaux est enregistré dans le registre d'élevage.", ecran: "registre-mouvements", lien: "registre d'élevage" }
  ];
  var FRISE = [
    { id: "engagements", nom: "Engagements", ico: "agenda", ecran: null },
    { id: "programme", nom: "Programme", ico: "programme", ecran: "concours" },
    { id: "paddock", nom: "Paddock", ico: "paddock", ecran: "concours" },
    { id: "jourj", nom: "Jour J", ico: "drapeau", ecran: "jour-j" },
    { id: "resultats", nom: "Résultats", ico: "coupe", ecran: "concours" }
  ];

  function EcranGuideCoach() {
    var h = React.createElement;
    var app = ((typeof useApp === "function") ? useApp() : null) || {};
    var setEcran = app.setEcran || function () { };
    var _c = React.useState(null); var conc = _c[0], setConc = _c[1];
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
      if (ecran === "registre-mouvements") { setEcran(ecran); return; }
      if (!conc) { setEcran("team-competition"); return; }   /* pas de concours en cours : la page de l'équipe, d'où on ouvre le concours */
      try { window.__concoursId = conc.id; window.__engagementsId = conc.id; localStorage.setItem("hype_concours_ouvert", String(conc.id)); } catch (e) { }
      setEcran(ecran);
    }
    function courbe(bas) {
      return h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { position: "absolute", left: 0, right: 0, width: "100%", height: 40, display: "block", top: bas ? "auto" : -1, bottom: bas ? -1 : "auto", transform: bas ? "none" : "scaleY(-1)" } },
        h("path", { d: "M0,40 L0,30 Q200,8 400,2 L400,40 Z", fill: BG }),
        h("path", { d: "M0,30 Q200,8 400,2", fill: "none", stroke: CH, strokeWidth: 1.2, opacity: 0.85 }));
    }
    function texteLien(c) {
      if (!c.lien) return c.texte;
      var i = c.texte.indexOf(c.lien);
      return [c.texte.slice(0, i), h("b", { key: "l", style: { color: CH, fontWeight: 600 } }, c.lien), c.texte.slice(i + c.lien.length)];
    }
    return h("div", { style: { minHeight: "100vh", background: BG, color: IV, fontFamily: M, paddingBottom: 24 } },
      /* héros : cheval noir entier, titre, courbe dorée */
      h("div", { style: { position: "relative", maxWidth: 900, margin: "0 auto" } },
        h("img", { src: "images/portrait-defaut-noir.webp", alt: "", style: { display: "block", width: "100%", height: "auto" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,10,8,0.85) 0%, rgba(7,10,8,0.35) 55%, rgba(7,10,8,0) 100%)" } }),
        h("button", { type: "button", onClick: function () { if (app.retourEcran) app.retourEcran(); else setEcran("aide"); }, "aria-label": "Retour", style: { position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 14px)", left: 14, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.45)", background: "rgba(9,13,17,0.35)", color: IV, fontSize: 18, cursor: "pointer" } }, "‹"),
        h("div", { style: { position: "absolute", left: 22, right: "30%", bottom: "20%" } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
            h("span", { style: { fontSize: 10.5, letterSpacing: "0.36em", color: CH, fontWeight: 500 } }, "GUIDE COACH"),
            h("span", { "aria-hidden": "true", style: { width: 44, height: 1, background: CH } })),
          h("div", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px, 11vw, 72px)", lineHeight: 1, marginTop: 8 } }, "Engagements"),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(17px, 4.6vw, 26px)", color: IV2, marginTop: 8, lineHeight: 1.2 } }, "Préparer, valider et éditer mes engagements")),
        courbe(true)),
      h("div", { style: { maxWidth: 680, margin: "0 auto", padding: "10px 18px 0", display: "flex", flexDirection: "column", gap: 12 } },
        conc ? h("div", { style: { fontSize: 12, color: IV3 } }, "Concours : " + [conc.titre || conc.lieu || "", conc.date_jour ? new Date(conc.date_jour + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : ""].filter(Boolean).join(" · ")) : null,
        CARTES.map(function (c) {
          return h("div", { key: c.n, role: "button", tabIndex: 0, onClick: function () { aller(c.ecran); }, onKeyDown: function (ev) { if (ev.key === "Enter") aller(c.ecran); },
            style: { display: "grid", gridTemplateColumns: "48px 1px 34px minmax(0,1fr) 14px", alignItems: "center", columnGap: 14, padding: "18px 16px", borderRadius: 16, border: "1px solid rgba(243,238,228,0.16)", background: "linear-gradient(160deg, rgba(243,238,228,0.045), rgba(243,238,228,0.01))", cursor: "pointer" } },
            h("div", { style: { fontFamily: SERIF, fontSize: 32, color: CH, lineHeight: 1, textAlign: "center" } }, c.n),
            h("div", { "aria-hidden": "true", style: { alignSelf: "stretch", background: "rgba(201,166,107,0.5)" } }),
            ico(h, c.ico),
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { fontSize: 16, fontWeight: 600, color: IV, lineHeight: 1.25 } }, c.titre),
              h("div", { style: { fontSize: 13, color: IV2, marginTop: 4, lineHeight: 1.45 } }, texteLien(c))),
            h("div", { "aria-hidden": "true", style: { color: CH, fontSize: 18 } }, "›"));
        }),
        h("div", { style: { display: "grid", gridTemplateColumns: "30px auto 1px minmax(0,1fr)", alignItems: "center", columnGap: 12, padding: "16px 16px", borderRadius: 16, border: "1px solid rgba(243,238,228,0.16)" } },
          ico(h, "info"),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: IV } }, "À savoir"),
          h("div", { "aria-hidden": "true", style: { alignSelf: "stretch", background: "rgba(201,166,107,0.5)" } }),
          h("div", { style: { fontSize: 12.5, color: IV2, lineHeight: 1.5 } }, "Les engagements, les déplacements et les retours sont centralisés dans le ", h("b", { style: { color: CH, fontWeight: 600 } }, "registre d'élevage"), " (transport, dates, concours)."))),
      /* photo entière + courbe */
      h("div", { style: { position: "relative", maxWidth: 900, margin: "22px auto 0" } },
        h("img", { src: "images/team-competition-performances-hero.webp", alt: "", loading: "lazy", style: { display: "block", width: "100%", height: "auto" } }),
        courbe(true)),
      /* frise : les moments de la journée, chacun mène à sa page */
      h("div", { style: { maxWidth: 680, margin: "6px auto 0", padding: "0 8px", display: "flex", alignItems: "center", justifyContent: "space-between" } },
        FRISE.map(function (f, i) {
          var ici = !f.ecran;
          return h(React.Fragment, { key: f.id },
            i ? h("span", { "aria-hidden": "true", style: { flex: "1 1 4px", minWidth: 3, maxWidth: 30, height: 1, background: "rgba(201,166,107,0.45)" } }) : null,
            h("button", { type: "button", "aria-current": ici ? "page" : undefined, onClick: function () { aller(f.ecran); },
              style: { flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "8px 5px", borderRadius: 12, border: "1px solid " + (ici ? CH : "transparent"), background: "transparent", color: IV, fontFamily: M, fontSize: 10.5, cursor: ici ? "default" : "pointer" } },
              h("span", { style: { display: "flex", transform: "scale(0.85)" } }, ico(h, f.ico)), f.nom));
        })));
  }

  window.HypeCoach = { Guide: EcranGuideCoach };
})();
