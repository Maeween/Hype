/* HYPE ▸ 02/11/2026 — Page « Préparer un diplôme d'enseignant » (EcranPrepaDiplomes) : Prépa AE, Prépa BPJEPS, Prépa DEJEPS.
   Demande de Blandine (02/11 14h47-14h52) : onglet sur la page des Galops, après le Galop 7, vers trois parties ; AE = Animateur
   d'Équitation ; réservé au Premium. Chargé seulement à l'ouverture (hypeEcranDiffere dans index.html).
   CONTENU = textes officiels uniquement, vérifiés le 02/11 :
   - AE : fiche France Compétences RNCP42622 (titre FFE, niveau 3, enregistré le 17/07/2026 jusqu'au 17/07/2029) ;
   - BPJEPS : arrêté du 18 novembre 2024 portant création de la mention « équitation » du BPJEPS spécialité « éducateur sportif »
     (annexe II = tests d'exigences préalables, art. 5 = mise en situation professionnelle, annexe IV = tests techniques du bloc 4,
     annexe V = dispenses) ;
   - DEJEPS : arrêté du 21 septembre 2018 modifié (arrêté du 27 mai 2024), mention « sports équestres », art. 3 et 4, annexe III.
   TEXTES EN FRANÇAIS SEULEMENT pour l'instant (règle de Blandine du 02/11 : traduire seulement après sa relecture) ;
   les autres langues affichent le français en attendant.
   « Ma préparation » : cases cochées gardées sur l'appareil (localStorage), simple aide personnelle. */
(function () {
var h = React.createElement;

var OR = "#C9A66B", IV = "#F4EFE4", GR = "#9AA3A8", BG = "#070A08", CARTE = "rgba(255,255,255,0.035)", BORD = "rgba(201,166,107,0.28)";
var SERIF = "'Cormorant Garamond','Noto Sans JP',Georgia,serif", SANS = "'Montserrat',system-ui,sans-serif";

var DIPLOMES = [
  {
    k: "ae", court: "AE", nom: "Animateur d'Équitation",
    role: "Titre de la FFE (niveau 3). Tu encadres des séances d'initiation en sécurité, tu participes à la vie de la structure et au suivi de la cavalerie.",
    entree: {
      titre: "Pour entrer en formation",
      puces: [
        "Licence fédérale de pratiquant en cours de validité.",
        "Attestation de premiers secours : PSC1 (ou équivalent reconnu).",
        "Galop 6 de cavalier ou de pleine nature (ou Degré 1).",
        "En apprentissage de moins de 2 ans : Galop 5 (ou Degré 1) suffit.",
        "En apprentissage de 2 ans ou plus : Galop 3 suffit."
      ]
    },
    tests: {
      titre: "Les épreuves du titre",
      puces: [
        "Un rapport de stage, que tu présentes à l'oral.",
        "Une séance que tu conduis en sécurité, en situation réelle.",
        "Le suivi de la cavalerie et l'entretien du matériel et des installations.",
        "Des démonstrations techniques."
      ],
      note: "Le titre est validé quand les trois blocs de compétences sont acquis."
    },
    dispenses: {
      titre: "Et après",
      puces: [
        "Le titre d'Animateur d'Équitation donne des dispenses pour entrer en BPJEPS : vérifie le détail avec ton organisme de formation."
      ]
    },
    prepa: [
      "Ma licence FFE est à jour",
      "J'ai mon PSC1",
      "J'ai le Galop exigé pour mon parcours",
      "J'ai trouvé un centre de formation et une structure de stage",
      "Je sais conduire une séance d'initiation en sécurité"
    ],
    sources: [["Fiche officielle RNCP42622 (France Compétences)", "https://www.francecompetences.fr/recherche/rncp/42622"]]
  },
  {
    k: "bpjeps", court: "BPJEPS", nom: "BPJEPS mention Équitation",
    role: "Diplôme d'État de moniteur d'équitation (spécialité « éducateur sportif »). Il permet d'enseigner l'équitation contre rémunération.",
    entree: {
      titre: "Les tests d'entrée",
      intro: "Trois épreuves de 10 minutes maximum chacune :",
      puces: [
        "Travail sur le plat : dix exercices sur un rectangle de 60 × 20 m. Filet ou bride, éperons et cravache autorisés.",
        "Saut d'obstacles : cinq exercices avec des obstacles de 50 cm à 1 m, dont un saut au trot sans étriers et un parcours de 8 obstacles. Une chute ou trois désobéissances éliminent.",
        "Travail à pied : cheval à la longe, en filet et sans enrênement, sur des cercles d'environ 15 m, des portes de 3 m et un vertical de 50 cm. Chambrière et gants obligatoires, éperons interdits."
      ],
      note: "Pour réussir : au moins 54 sur 90 au total, sans aucune note sous 5 sur 10. Une épreuve réussie (18 sur 30) peut être gardée si tu dois repasser les autres."
    },
    tests: {
      titre: "Avant de partir en stage",
      puces: [
        "Une séquence d'initiation de 15 minutes maximum, avec un groupe d'au moins quatre cavaliers du Galop 2 au Galop 7.",
        "Puis un entretien de 10 minutes maximum, surtout sur la sécurité."
      ],
      note: "Pendant la formation, d'autres tests techniques ouvrent le bloc 4 : une reprise de dressage, un parcours de type Hunter Grand Prix à 1,05 m (dix obstacles) et un test en extérieur et en terrain varié (protège-dos obligatoire)."
    },
    dispenses: {
      titre: "Les dispenses des tests d'entrée",
      puces: [
        "Galop 8 de cavalier, Galop 7 Western ou Galop 7 Attelage.",
        "Degré 2 ou Degré 3 de la FFE.",
        "Sportif de haut niveau en équitation.",
        "Certains titres et certificats (Animateur d'Équitation, CQP, Accompagnateur de tourisme équestre…) et certains classements en compétition donnent aussi des dispenses, parfois sous conditions."
      ],
      note: "Le détail exact est dans l'annexe V de l'arrêté : vérifie ton cas avec ton organisme de formation."
    },
    prepa: [
      "J'ai mon PSC1",
      "J'ai un certificat médical de moins d'un an",
      "Mon inscription aux tests d'entrée est faite",
      "Je m'entraîne aux dix exercices sur le plat",
      "Je m'entraîne aux exercices d'obstacle, dont le saut au trot sans étriers",
      "Je m'entraîne au travail à la longe"
    ],
    sources: [["Arrêté du 18 novembre 2024 (Légifrance)", "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050675315"]]
  },
  {
    k: "dejeps", court: "DEJEPS", nom: "DEJEPS mention Sports équestres",
    role: "Diplôme d'État d'entraîneur (spécialité « perfectionnement sportif »). Tu entraînes des cavaliers en compétition dans ta discipline.",
    entree: {
      titre: "Les tests d'entrée",
      intro: "Deux tests techniques, dans l'ordre que tu veux :",
      puces: [
        "Dressage : la reprise Amateur 3 Grand Prix.",
        "Saut d'obstacles : un parcours de niveau Amateur 2 (1,05 m à 1,10 m)."
      ],
      lienReprise: true,
      note: "Puis un test pédagogique : une séance d'apprentissage du travail sur le plat, de 20 minutes maximum, pour trois cavaliers de Galop 5 ou plus, suivie d'un entretien de 10 minutes maximum."
    },
    tests: {
      titre: "Avant de partir en stage",
      puces: [
        "Une séance collective de 20 minutes maximum avec des cavaliers du Galop 1 au Galop 4.",
        "Puis un entretien de 10 minutes sur la sécurité, avec ton organisme de formation."
      ]
    },
    dispenses: {
      titre: "Les dispenses",
      puces: [
        "Sportif de haut niveau en équitation, ou résultats sportifs attestés par le directeur technique national.",
        "Certains diplômes permettant déjà d'enseigner, brevets fédéraux d'entraîneur et classements en compétition donnent des dispenses."
      ],
      note: "Le détail exact est dans l'annexe III de l'arrêté : vérifie ton cas avec ton organisme de formation."
    },
    prepa: [
      "J'ai mon PSC1",
      "Je connais la reprise Amateur 3 Grand Prix par cœur",
      "Je saute un parcours Amateur 2 (1,05 m à 1,10 m) avec régularité",
      "J'ai préparé une séance de 20 minutes sur le plat pour trois cavaliers",
      "Mon inscription aux tests d'entrée est faite"
    ],
    sources: [["Fiche officielle RNCP39573 (France Compétences)", "https://www.francecompetences.fr/recherche/rncp/39573"], ["Arrêté du 21 septembre 2018 modifié, annexe III (Légifrance)", "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049772315"]]
  }
];

var CSS = ""
  + ".hpd{min-height:100vh;background:" + BG + ";color:" + IV + ";font-family:" + SANS + ";padding-bottom:calc(110px + env(safe-area-inset-bottom))}"
  + ".hpd *{box-sizing:border-box}"
  + ".hpd-in{max-width:880px;margin:0 auto;padding:0 16px}"
  + ".hpd-haut{padding:calc(env(safe-area-inset-top) + 18px) 0 6px;display:flex;align-items:center;gap:12px}"
  + ".hpd-retour{width:40px;height:40px;border-radius:50%;border:1px solid " + BORD + ";background:transparent;color:" + IV + ";font-size:18px;cursor:pointer;flex:none}"
  + ".hpd-kick{font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:" + OR + ";margin:0}"
  + ".hpd-titre{font-family:" + SERIF + ";font-weight:600;font-size:clamp(30px,6vw,46px);line-height:1.08;margin:18px 0 0}"
  + ".hpd-titre em{color:" + OR + ";font-style:italic;font-weight:500}"
  + ".hpd-filet{width:46px;height:1px;background:" + OR + ";margin:16px 0}"
  + ".hpd-phrase{color:" + GR + ";font-size:15px;line-height:1.6;margin:0 0 22px;max-width:620px}"
  + ".hpd-onglets{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px}"
  + ".hpd-onglet{border:1px solid " + BORD + ";background:transparent;color:" + IV + ";border-radius:999px;padding:10px 18px;font:600 13px " + SANS + ";letter-spacing:.6px;cursor:pointer}"
  + ".hpd-onglet[aria-selected=true]{background:" + OR + ";border-color:" + OR + ";color:#0B0E0C}"
  + ".hpd-nom{font-family:" + SERIF + ";font-size:clamp(25px,4.6vw,32px);font-weight:600;margin:0 0 8px}"
  + ".hpd-role{color:" + GR + ";font-size:14.5px;line-height:1.6;margin:0 0 20px}"
  + ".hpd-bloc{background:" + CARTE + ";border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:20px 20px 16px;margin:0 0 14px}"
  + ".hpd-bloc h3{font-family:" + SERIF + ";font-size:22px;font-weight:600;margin:0 0 10px;color:" + IV + "}"
  + ".hpd-bloc h3:before{content:'';display:block;width:26px;height:1px;background:" + OR + ";margin:0 0 12px}"
  + ".hpd-bloc p{margin:0 0 8px;font-size:14.5px;line-height:1.6;color:#D9DEE0}"
  + ".hpd-bloc ul{margin:0;padding:0;list-style:none}"
  + ".hpd-bloc li{position:relative;padding:0 0 9px 18px;font-size:14.5px;line-height:1.6;color:#E6EAEC}"
  + ".hpd-bloc li:before{content:'';position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:" + OR + "}"
  + "[dir=rtl] .hpd-bloc li{padding:0 18px 9px 0}[dir=rtl] .hpd-bloc li:before{left:auto;right:2px}"
  + ".hpd-note{color:" + GR + "!important;font-size:13.5px!important;margin-top:6px!important}"
  + ".hpd-lien{display:inline-flex;align-items:center;gap:8px;margin:6px 0 4px;border:1px solid " + OR + ";color:" + OR + ";background:transparent;border-radius:999px;padding:9px 16px;font:600 13px " + SANS + ";cursor:pointer}"
  + ".hpd-case{display:flex;align-items:flex-start;gap:12px;width:100%;text-align:start;background:transparent;border:0;border-top:1px solid rgba(255,255,255,0.06);color:#E6EAEC;padding:12px 0;font:14.5px/1.5 " + SANS + ";cursor:pointer}"
  + ".hpd-case:first-of-type{border-top:0}"
  + ".hpd-coche{flex:none;width:22px;height:22px;border-radius:7px;border:1.5px solid " + BORD + ";display:flex;align-items:center;justify-content:center;color:#0B0E0C;font-size:14px;margin-top:1px}"
  + ".hpd-case[aria-checked=true] .hpd-coche{background:" + OR + ";border-color:" + OR + "}"
  + ".hpd-case[aria-checked=true] .hpd-ct{color:" + GR + "}"
  + ".hpd-compte{font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:" + OR + ";margin:0 0 6px}"
  + ".hpd-sources{font-size:12.5px;color:" + GR + ";margin:18px 0 0;line-height:1.7}"
  + ".hpd-sources a{color:" + GR + ";text-decoration:underline}"
  + ".hpd-verrou{position:relative}"
  + ".hpd-flou{filter:blur(7px);opacity:.55;pointer-events:none;user-select:none}"
  + ".hpd-voile{position:absolute;inset:0;display:flex;align-items:flex-start;justify-content:center;padding-top:40px}"
  + ".hpd-voile-c{background:rgba(7,10,8,0.92);border:1px solid " + BORD + ";border-radius:18px;padding:22px;max-width:380px;text-align:center}"
  + ".hpd-voile-c p{margin:0 0 14px;font-size:15px;line-height:1.55}"
  + ".hpd-btn{border:0;border-radius:999px;background:" + OR + ";color:#0B0E0C;padding:12px 22px;font:700 14px " + SANS + ";cursor:pointer}"
  + "@media (min-width:768px){.hpd-in{padding:0 32px}.hpd-grille{display:grid;grid-template-columns:1fr 1fr;gap:14px}.hpd-grille .hpd-bloc{margin:0}.hpd-bloc{padding:24px 26px 18px}}";

function lireCases(k) { try { var v = JSON.parse(localStorage.getItem("hype_prepa_" + k) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function ecrireCases(k, v) { try { localStorage.setItem("hype_prepa_" + k, JSON.stringify(v)); } catch (e) { } }

function Bloc(p) {
  var b = p.b; if (!b) return null;
  return h("div", { className: "hpd-bloc" },
    h("h3", null, b.titre),
    b.intro ? h("p", null, b.intro) : null,
    h("ul", null, b.puces.map(function (t, i) { return h("li", { key: i }, t); })),
    b.lienReprise ? h("button", { type: "button", className: "hpd-lien", onClick: p.onReprise }, "Voir la reprise Amateur 3 Grand Prix", h("span", { "aria-hidden": true }, p.rtl ? "←" : "→")) : null,
    b.note ? h("p", { className: "hpd-note" }, b.note) : null);
}

function EcranPrepaDiplomes() {
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr", rtl = lg === "ar";
  var premium = !!app.premium;
  var _m = React.useState(false), estMod = _m[0], setEstMod = _m[1];
  React.useEffect(function () {
    var vif = true;
    try { window.scrollTo(0, 0); } catch (e) { }
    (async function () { try { var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (vif && typeof estModerateurHype === "function") setEstMod(!!estModerateurHype(u)); } catch (e2) { } })();
    return function () { vif = false; };
  }, []);
  var acces = premium || estMod;
  var _k = React.useState(function () { try { return sessionStorage.getItem("hype_prepa_onglet") || "ae"; } catch (e) { return "ae"; } });
  var k = _k[0], setK = _k[1];
  var d = DIPLOMES.find(function (x) { return x.k === k; }) || DIPLOMES[0];
  var _c = React.useState(function () { return lireCases(d.k); }), cases = _c[0], setCases = _c[1];
  React.useEffect(function () { setCases(lireCases(d.k)); try { sessionStorage.setItem("hype_prepa_onglet", d.k); } catch (e) { } }, [d.k]);
  var basculer = function (i) { var v = cases.indexOf(i) >= 0 ? cases.filter(function (x) { return x !== i; }) : cases.concat([i]); setCases(v); ecrireCases(d.k, v); };
  var versReprise = function () { var g = app.galopOuvert || 7; try { if (app.setGalopOuvert) app.setGalopOuvert(g); if (typeof memoriserNiveauReprise === "function") memoriserNiveauReprise("amat3gp", g); } catch (e) { } setEcran("reprises"); };

  var suite = h("div", null,
    h("div", { className: "hpd-grille" }, h(Bloc, { b: d.tests, rtl: rtl }), h(Bloc, { b: d.dispenses, rtl: rtl })),
    h("div", { className: "hpd-bloc", style: { marginTop: 14 } },
      h("h3", null, "Ma préparation"),
      h("p", { className: "hpd-compte" }, cases.filter(function (i) { return i < d.prepa.length; }).length + " / " + d.prepa.length),
      d.prepa.map(function (t, i) {
        var ok = cases.indexOf(i) >= 0;
        return h("button", { key: i, type: "button", role: "checkbox", "aria-checked": ok ? "true" : "false", className: "hpd-case", onClick: function () { basculer(i); } },
          h("span", { className: "hpd-coche", "aria-hidden": true }, ok ? "✓" : ""), h("span", { className: "hpd-ct" }, t));
      })),
    h("p", { className: "hpd-sources" }, "Sources officielles : ",
      d.sources.map(function (s, i) { return h(React.Fragment, { key: i }, i ? " · " : null, h("a", { href: s[1], target: "_blank", rel: "noopener noreferrer" }, s[0])); }),
      ". Les règles peuvent évoluer : vérifie toujours auprès de ton organisme de formation."));

  return h("div", { className: "hpd", dir: rtl ? "rtl" : "ltr" },
    h("style", null, CSS),
    h("div", { className: "hpd-in" },
      h("div", { className: "hpd-haut" },
        h("button", { type: "button", className: "hpd-retour", "aria-label": "Retour", onClick: function () { setEcran("galops"); } }, rtl ? "→" : "←"),
        h("p", { className: "hpd-kick" }, "Après le Galop 7")),
      h("h1", { className: "hpd-titre" }, "Préparer un diplôme ", h("em", null, "d'enseignant")),
      h("div", { className: "hpd-filet", "aria-hidden": true }),
      h("p", { className: "hpd-phrase" }, "Les exigences officielles pour entrer en formation, et ta liste pour t'y préparer pas à pas."),
      h("div", { className: "hpd-onglets", role: "tablist", "aria-label": "Diplômes" },
        DIPLOMES.map(function (x) { return h("button", { key: x.k, type: "button", role: "tab", "aria-selected": x.k === d.k ? "true" : "false", className: "hpd-onglet", onClick: function () { setK(x.k); } }, "Prépa " + x.court); })),
      h("div", { role: "tabpanel" },
        h("h2", { className: "hpd-nom" }, d.nom),
        h("p", { className: "hpd-role" }, d.role),
        h(Bloc, { b: d.entree, rtl: rtl, onReprise: versReprise }),
        acces ? suite : h("div", { className: "hpd-verrou" },
          h("div", { className: "hpd-flou", "aria-hidden": true }, suite),
          h("div", { className: "hpd-voile" },
            h("div", { className: "hpd-voile-c" },
              h("p", null, "Débloque la suite avec Premium : les dispenses, le déroulé complet et ta liste de préparation."),
              h("button", { type: "button", className: "hpd-btn", onClick: function () { setEcran("premium"); } }, "Découvrir Premium")))))));
}

window.HypePrepa = { Prepa: EcranPrepaDiplomes, DIPLOMES: DIPLOMES };
})();
