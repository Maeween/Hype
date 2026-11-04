/* HYPE ▸ 04/11/2026 — CENTRE DE COMPÉTITION, ÉTAPE 1 : la page « MA SAISON » (EcranMaSaison).
   Demande de Blandine (04/11, 15 h 54) : « Mets en ligne la première page. La page la saison tu peux déjà. »
   Design : en-tête EXACT de la Vidéothèque (hype-video.js, heroDe + courbe) — courbe c1 en haut, photo masquée
   en dégradé, courbe c2 avec tout le noir sous le trait, titre Cormorant aligné à droite, sous-titre italique.
   Trois couleurs seulement : noir #070A08, ivoire #F3EEE4, champagne #C9A66B (+ #101A1D en dégradés).
   DONNÉES, toutes réelles, rien d'inventé :
     · les concours (club_agenda, type « concours ») des clubs de la personne (profil : ecurie et ecurie2),
       depuis le 1er septembre de la saison en cours ;
     · le nombre de cavalières inscrites (agenda_inscriptions), et « Tu es inscrite » quand c'est son cas.
     Si une lecture échoue, la page le dit ; elle ne casse rien d'autre.
   PHOTOS : en-tête = le cheval bai tressé de Blandine (images/concours-hero-bai-tresse.webp). Chaque concours
   reçoit une photo de la série « cheval sur fond noir » (la sienne + les héros des Galops), en rotation dans
   l'ordre des dates : deux concours qui se suivent n'ont jamais la même.
   OUVERTURE : un concours à venir ou en cours ouvre sa fiche d'agenda (même porte que la page Team) et la
   fermeture revient ici ; un concours terminé ouvre sa page souvenirs (evenement-passe).
   Textes en français seulement : traduction quand le français sera relu (règle de Blandine).
   Accès : 2hype.fr/#saison, et le lien « Ma saison » sous l'agenda de la page Team. */
(function () {
var PHOTOS_SAISON = [
  { img: "images/concours-hero-bai-tresse.webp", pos: "70% 30%" },
  { img: "images/galop1-hero-bai.webp", pos: "60% 35%" },
  { img: "images/galop6-hero-gris.webp", pos: "60% 35%" },
  { img: "images/galop2-hero-bai-entier.webp", pos: "60% 35%" },
  { img: "images/galop7-hero-palomino.webp", pos: "60% 35%" },
  { img: "images/galop5-emb-hero-v2.webp", pos: "60% 35%" },
  { img: "images/galop9-hero-alezan.webp", pos: "60% 35%" },
  { img: "images/galop8-hero-bai.webp", pos: "60% 35%" }
];

var CSS_ID = "hype-saison-css-1";
var CSS = [
  ".hs{--hs-noir:#070A08;--hs-iv:#F3EEE4;--hs-iv2:rgba(243,238,228,.64);--hs-iv3:rgba(243,238,228,.42);--hs-ch:#C9A66B;background:var(--hs-noir);color:var(--hs-iv);font-family:'Montserrat',system-ui,sans-serif;min-height:100vh;padding-bottom:40px;overflow-x:clip;position:relative}",
  ".hs *{box-sizing:border-box}.hs button{font-family:inherit;color:inherit;-webkit-tap-highlight-color:transparent;cursor:pointer}",
  ".hs-in{max-width:1240px;margin:0 auto;padding:0 18px}",
  /* en-tête : copie exacte de la Vidéothèque */
  ".hs-langue{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:14px}",
  ".hs-hero{position:relative;padding-top:calc(env(safe-area-inset-top) + 14px)}",
  ".hs-photo{position:relative;height:clamp(300px,92vw,430px);margin-top:-30px;overflow:hidden;background:#0B0F0E}",
  ".hs-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--hs-pos,center);filter:saturate(.92) contrast(1.05) brightness(.95) sepia(.07)}",
  ".hs-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);mask-composite:intersect}",
  "[dir=rtl] .hs-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(270deg,transparent 0,#000 12%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(270deg,transparent 0,#000 12%,#000 100%)}",
  ".hs-courbe{position:absolute;left:0;right:0;width:100%;height:70px;pointer-events:none;z-index:2}",
  ".hs-courbe.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}",
  ".hs-courbe.c2{position:relative;display:block;height:64px;margin-top:-64px}",
  "[dir=rtl] .hs-courbe{transform:scaleX(-1)}",
  ".hs-hero-retour{position:relative;z-index:4;margin-top:2px}",
  ".hs-retour{display:flex;align-items:center;gap:10px;background:none;border:none;padding:12px 2px;min-height:44px;font-size:14px;color:var(--hs-iv);letter-spacing:.02em}",
  ".hs-retour i{font-style:normal;color:var(--hs-ch);font-size:22px;line-height:1}[dir=rtl] .hs-retour i{transform:scaleX(-1)}",
  ".hs-titre{text-align:end;margin-top:-12px;position:relative;z-index:3}",
  ".hs-titre h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(44px,12vw,64px);line-height:1;margin:0;color:var(--hs-iv);letter-spacing:.005em}",
  ".hs-titre p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(17px,4.6vw,21px);margin:8px 0 0;color:var(--hs-iv);opacity:.88}",
  /* pastilles en verre fumé */
  ".hs-pills{display:flex;gap:8px;margin-top:22px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.hs-pills::-webkit-scrollbar{display:none}",
  ".hs-pl{flex:0 0 auto;min-height:36px;padding:0 15px;border-radius:999px;font-size:12px;letter-spacing:.02em;white-space:nowrap;background:linear-gradient(180deg,rgba(28,34,38,.85),rgba(12,16,18,.85));border:1px solid rgba(243,238,228,.08);box-shadow:0 2px 6px rgba(0,0,0,.35);color:var(--hs-iv2)}",
  ".hs-pl.on{border-color:rgba(201,166,107,.7);color:var(--hs-iv)}",
  /* rubriques */
  ".hs-sec{display:flex;align-items:center;justify-content:space-between;margin:26px 0 12px}",
  ".hs-sec b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:21px;border-inline-start:1.5px solid var(--hs-ch);padding-inline-start:10px;line-height:1.05}",
  ".hs-sec span{font-size:11.5px;color:var(--hs-iv2)}",
  /* cartes concours */
  ".hs-cd{display:flex;width:100%;text-align:start;padding:0;margin:0 0 8px;border:1px solid rgba(243,238,228,.12);border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#0d1416,#070A08 70%);min-height:86px}",
  ".hs-cd:active{transform:scale(.985)}",
  ".hs-im{width:122px;flex:0 0 122px;background-size:cover;background-position:center;position:relative;background-color:#0B0F0E}",
  ".hs-bd{position:absolute;inset-inline-end:5px;bottom:5px;background:rgba(0,0,0,.75);border-radius:5px;padding:1px 6px;font-size:10.5px;color:var(--hs-iv)}",
  ".hs-tx{flex:1;min-width:0;padding:8px 11px;display:flex;flex-direction:column;justify-content:center;gap:4px}",
  ".hs-t{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:17px;line-height:1.1;color:var(--hs-iv);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-s{font-size:11px;color:rgba(243,238,228,.75);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-gp{border:1px solid var(--hs-ch);color:var(--hs-ch);border-radius:999px;padding:0 7px;font-size:10px;margin-inline-end:6px}",
  ".hs-mini{font-size:10px;color:var(--hs-ch)}",
  ".hs-vide{border:1px solid rgba(243,238,228,.12);border-radius:12px;padding:16px 14px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:17px;color:var(--hs-iv2);background:linear-gradient(135deg,#0d1416,#070A08 70%)}",
  ".hs-err{margin-top:14px;font-size:12px;color:var(--hs-ch)}",
  /* le carnet : derniers concours terminés */
  ".hs-sep{height:1px;background:rgba(243,238,228,.08);margin-top:24px}",
  ".hs-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}",
  ".hs-tile{height:76px;border-radius:10px;background-size:cover;background-position:center;position:relative;border:none;padding:0;overflow:hidden;background-color:#0B0F0E}",
  ".hs-tile:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,rgba(7,10,8,.85))}",
  ".hs-tile span{position:absolute;inset-inline-start:7px;inset-inline-end:7px;bottom:6px;font-size:10.5px;text-align:start;z-index:1;text-shadow:0 1px 4px #000;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".hs-attente{padding:18px 0;color:var(--hs-ch);font-size:22px;text-align:center}",
  "@media (min-width:700px){.hs-photo{height:clamp(360px,52vw,460px)}.hs-titre{margin-top:-16px}.hs-liste{display:grid;grid-template-columns:1fr 1fr;column-gap:10px}}"
].join("\n");

function injecterCss() {
  try {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement("style"); st.id = CSS_ID; st.textContent = CSS; document.head.appendChild(st);
  } catch (e) { }
}

function EcranMaSaison() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return tr({ fr: fr }); }   /* français seulement pour l'instant (traduction après relecture) */
  var rtl = (lg === "ar");

  var _ev = React.useState(null); var evs = _ev[0], setEvs = _ev[1];
  var _ins = React.useState({}); var ins = _ins[0], setIns = _ins[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _cl = React.useState([]); var clubs = _cl[0], setClubs = _cl[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _vu = React.useState(null); var vue = _vu[0], setVue = _vu[1];

  React.useEffect(function () { injecterCss(); try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function isoDe(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var auj = new Date(); auj.setHours(0, 0, 0, 0);
  var isoAuj = isoDe(auj);
  var anDebut = auj.getMonth() >= 8 ? auj.getFullYear() : auj.getFullYear() - 1;   /* la saison commence le 1er septembre */
  var isoDebutSaison = anDebut + "-09-01";

  function clefDe(n) { try { return (typeof clefClubG === "function") ? clefClubG(n) : String(n || "").toLowerCase().trim(); } catch (e) { return String(n || "").toLowerCase().trim(); } }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { setErreur(F("Pas de connexion.")); setEvs([]); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        var noms = [];
        var p = app.profil || null;
        if (u && u.id) {
          try {
            var rp = await supa.from("profiles").select("ecurie, ecurie2").eq("id", u.id).maybeSingle();
            if (rp && rp.data) p = rp.data;
          } catch (eP) { }
        }
        [p && p.ecurie, p && p.ecurie2].forEach(function (n) { if (n && n !== "__perso__" && noms.indexOf(n) === -1) noms.push(n); });
        var cles = []; noms.forEach(function (n) { var k = clefDe(n); if (k && cles.indexOf(k) === -1) cles.push(k); });
        if (vif) setClubs(noms);
        if (!cles.length) { if (vif) setEvs([]); return; }
        var r = await supa.from("club_agenda").select("*").in("club_clef", cles).eq("type", "concours").gte("date_jour", isoDebutSaison).order("date_jour", { ascending: true }).limit(200);
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        var liste = (r && r.data) || [];
        if (vif) setEvs(liste);
        var ids = liste.map(function (x) { return x.id; });
        if (ids.length) {
          try {
            var ri = await supa.from("agenda_inscriptions").select("agenda_id, user_id").in("agenda_id", ids.slice(0, 200));
            var m = {};
            ((ri && !ri.error && ri.data) || []).forEach(function (x) { (m[x.agenda_id] = m[x.agenda_id] || []).push(x.user_id); });
            if (vif) setIns(m);
          } catch (eI) { }
        }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setEvs(function (e) { return e || []; }); } }
    })();
    return function () { vif = false; };
  }, []);

  /* ── tri : à venir / en cours / terminés (la date de FIN décide, comme l'agenda) ── */
  var tous = evs || [];
  var photoDe = {};
  tous.forEach(function (ev, i) { photoDe[ev.id] = PHOTOS_SAISON[(i + 1) % PHOTOS_SAISON.length]; });
  var avenir = [], encours = [], finis = [];
  tous.forEach(function (ev) {
    var deb = String(ev.date_jour || "").slice(0, 10), fin = String(ev.date_fin || ev.date_jour || "").slice(0, 10);
    if (fin < isoAuj) finis.push(ev); else if (deb <= isoAuj) encours.push(ev); else avenir.push(ev);
  });
  finis.reverse();
  var vueEff = vue || (encours.length ? "encours" : (avenir.length ? "avenir" : "finis"));

  /* ── dates ── */
  function dateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  function fmt(iso, o) { var d = dateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat("fr-FR", o).format(d); } catch (e) { return String(iso).slice(0, 10); } }
  function plage(ev) {
    var deb = String(ev.date_jour || "").slice(0, 10), fin = String(ev.date_fin || "").slice(0, 10);
    if (!fin || fin === deb) { var t = fmt(deb, { weekday: "long", day: "numeric", month: "long" }); return t.charAt(0).toUpperCase() + t.slice(1); }
    var d1 = dateLoc(deb), d2 = dateLoc(fin);
    if (d1 && d2 && d1.getMonth() === d2.getMonth()) return "Du " + d1.getDate() + " au " + fmt(fin, { day: "numeric", month: "long" });
    return "Du " + fmt(deb, { day: "numeric", month: "long" }) + " au " + fmt(fin, { day: "numeric", month: "long" });
  }
  function badge(ev) {
    var deb = String(ev.date_jour || "").slice(0, 10);
    var d = dateLoc(deb); if (!d) return "";
    var n = Math.round((d - auj) / 86400000);
    if (n === 1) return F("demain");
    if (n > 1 && n <= 7) return F("dans ") + n + " j";
    if (n <= 0 && String(ev.date_fin || deb).slice(0, 10) >= isoAuj) return F("en cours");
    return fmt(deb, { day: "numeric", month: "short" });
  }

  /* ── navigation ── */
  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("team-competition"); }
  function ouvrir(ev) {
    var fin = String(ev.date_fin || ev.date_jour || "").slice(0, 10);
    if (fin < isoAuj) { try { window.__evPasse = null; window.__evPasseId = ev.id; } catch (e1) { } setEcran("evenement-passe"); return; }
    try { window.__agendaFiche = ev.id; window.__agendaFicheRetour = "ma-saison"; } catch (e2) { }
    setEcran("guilde");
  }

  /* ── en-tête Vidéothèque ── */
  function courbe(cls, d) {
    return h("svg", { className: "hs-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hsg-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
        h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
        h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#hsg-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  var hero = h("div", { className: "hs-hero" },
    (typeof SelecteurLangue === "function") ? h("div", { className: "hs-langue" }, h(SelecteurLangue, { compact: true })) : null,
    h("div", { className: "hs-in hs-hero-retour" },
      h("button", { type: "button", className: "hs-retour", onClick: retour }, h("i", null, "‹"), F("Retour"))),
    courbe("c1", "M250 4 C 330 8, 385 40, 400 96"),
    h("div", { className: "hs-photo", style: { "--hs-pos": PHOTOS_SAISON[0].pos } },
      h("img", { src: PHOTOS_SAISON[0].img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
    courbe("c2", "M0 92 C 130 90, 240 62, 400 8"),
    h("div", { className: "hs-in" },
      h("div", { className: "hs-titre" }, h("h1", null, F("Ma saison")),
        h("p", null, F("Tes concours, saison ") + anDebut + "-" + (anDebut + 1) + "."))));

  /* ── une carte concours ── */
  function carte(ev) {
    var ph = photoDe[ev.id] || PHOTOS_SAISON[1];
    var liste = ins[ev.id] || [];
    var moiDedans = !!(moi && moi.id && liste.indexOf(moi.id) !== -1);
    var nb = liste.length;
    var etiquette = nb ? (nb + (nb > 1 ? F(" cavalières") : F(" cavalière"))) : (String(ev.date_jour || "").slice(0, 10) > isoAuj ? F("À engager") : "");
    var clubCourt = clubs.length > 1 ? (clubs.filter(function (n) { return clefDe(n) === ev.club_clef; })[0] || "") : "";
    var lieu = ev.lieu || clubCourt;
    return h("button", { type: "button", key: ev.id, className: "hs-cd", onClick: function () { ouvrir(ev); } },
      h("div", { className: "hs-im", style: { backgroundImage: "url(" + ph.img + ")", backgroundPosition: ph.pos } },
        h("span", { className: "hs-bd" }, badge(ev))),
      h("div", { className: "hs-tx" },
        h("span", { className: "hs-t" }, ev.titre || F("Concours")),
        h("span", { className: "hs-s" }, plage(ev)),
        (etiquette || lieu) ? h("span", { className: "hs-s" }, etiquette ? h("span", { className: "hs-gp" }, etiquette) : null, lieu) : null,
        moiDedans ? h("span", { className: "hs-mini" }, F("Tu es inscrite")) : null));
  }

  var pills = [
    { k: "avenir", l: F("À venir"), n: avenir.length },
    { k: "encours", l: F("En cours"), n: encours.length },
    { k: "finis", l: F("Terminés"), n: finis.length }
  ];
  var listeVue = vueEff === "avenir" ? avenir : (vueEff === "encours" ? encours : finis);
  var titreVue = vueEff === "avenir" ? F("Prochains concours") : (vueEff === "encours" ? F("En ce moment") : F("Concours terminés"));
  var videVue = vueEff === "avenir" ? F("Aucun concours à venir pour l’instant.") : (vueEff === "encours" ? F("Aucun concours en ce moment.") : F("Aucun concours terminé cette saison."));

  var corps;
  if (evs === null) corps = h("div", { className: "hs-attente", "aria-busy": "true" }, "…");
  else if (!clubs.length) corps = h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Indique ton écurie dans ton profil : tes concours s’afficheront ici."));
  else corps = h("div", null,
    h("div", { className: "hs-pills", role: "tablist" }, pills.map(function (p) {
      return h("button", { type: "button", key: p.k, role: "tab", "aria-selected": vueEff === p.k ? "true" : "false", className: "hs-pl" + (vueEff === p.k ? " on" : ""), onClick: function () { setVue(p.k); } }, p.l + " (" + p.n + ")");
    })),
    h("div", { className: "hs-sec" }, h("b", null, titreVue)),
    listeVue.length ? h("div", { className: "hs-liste" }, listeVue.map(carte)) : h("div", { className: "hs-vide" }, videVue),
    (vueEff !== "finis" && finis.length) ? h("div", null,
      h("div", { className: "hs-sep" }),
      h("div", { className: "hs-sec" }, h("b", null, F("Le carnet")),
        h("button", { type: "button", onClick: function () { setVue("finis"); try { window.scrollTo(0, 0); } catch (e) { } }, style: { background: "none", border: "none", padding: "8px 0", fontSize: 11.5, color: "rgba(243,238,228,.64)" } }, F("Tout voir") + (rtl ? " ‹" : " ›"))),
      h("div", { className: "hs-tiles" }, finis.slice(0, 3).map(function (ev) {
        var ph = photoDe[ev.id] || PHOTOS_SAISON[1];
        return h("button", { type: "button", key: ev.id, className: "hs-tile", style: { backgroundImage: "url(" + ph.img + ")", backgroundPosition: ph.pos }, onClick: function () { ouvrir(ev); } },
          h("span", null, (ev.titre || "") + " · " + fmt(ev.date_jour, { day: "numeric", month: "short" })));
      }))) : null);

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      corps,
      erreur ? h("div", { className: "hs-err" }, F("Une partie n’a pas pu se charger : ") + erreur) : null));
}
window.HypeSaison = { Saison: EcranMaSaison };
})();
