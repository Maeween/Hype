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
  ".hs-pills{display:flex;gap:8px;margin-top:34px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.hs-pills::-webkit-scrollbar{display:none}",
  ".hs-pl{flex:0 0 auto;min-height:36px;padding:0 15px;border-radius:999px;font-size:12px;letter-spacing:.02em;white-space:nowrap;background:linear-gradient(180deg,rgba(28,34,38,.85),rgba(12,16,18,.85));border:1px solid rgba(243,238,228,.08);box-shadow:0 2px 6px rgba(0,0,0,.35);color:var(--hs-iv2)}",
  ".hs-pl.on{border-color:rgba(201,166,107,.7);color:var(--hs-iv)}",
  /* rubriques */
  ".hs-sec{display:flex;align-items:center;justify-content:space-between;margin:42px 0 16px}",   /* 04/11 22h51 (Blandine : « aéré entre les titres ») : 26/12 → 42/16 */
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
  var _tm = React.useState(null); var team = _tm[0], setTeam = _tm[1];   /* 04/11 22h55 : { id, nom, membre } */
  var _rs = React.useState(""); var reserve = _rs[0], setReserve = _rs[1];

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
        /* 04/11 22h55 (Blandine : « l’équipe compétition ne participe pas forcément à la totalité des événements de la SEP », « ça mélange
           la SEP et Feinn », « concours et stages propres à l’équipe uniquement ») — la saison = les concours et stages RATTACHÉS À L’ÉQUIPE
           (agenda_groupes, comme la page Team), passés et à venir, depuis le 1er septembre. Une cavalière hors de l’équipe voit la page,
           mais en touchant un rendez-vous : « Réservé à l’équipe … ». Les modératrices (la coach) ont l’accès de l’équipe. */
        var rg = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom") : null;
        var G = rg && !rg.error && rg.data;
        if (!G || !G.id) { if (vif) { setTeam(false); setEvs([]); } return; }
        var membre = false;
        if (u && u.id) {
          try { membre = (typeof estModerateurHype === "function") && estModerateurHype(u); } catch (eM) { }
          if (!membre) { try { var rmb = await supa.from("groupes_membres").select("user_id").eq("groupe_id", G.id).eq("user_id", u.id).maybeSingle(); membre = !!(rmb && rmb.data); } catch (eMb) { } }
        }
        if (vif) setTeam({ id: G.id, nom: G.nom || ((typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : F("l’équipe")), membre: membre });
        var ra = await supa.from("agenda_groupes").select("agenda_id").eq("groupe_id", G.id);
        if (ra && ra.error) throw new Error(ra.error.message || String(ra.error));
        var idsT = ((ra && ra.data) || []).map(function (x) { return x.agenda_id; });
        var liste = [];
        if (idsT.length) {
          var r = await supa.from("club_agenda").select("*").in("id", idsT.slice(0, 300)).in("type", ["concours", "stage"]).gte("date_jour", isoDebutSaison).order("date_jour", { ascending: true }).limit(300);
          if (r && r.error) throw new Error(r.error.message || String(r.error));
          liste = (r && r.data) || [];
        }
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
    /* 04/11 (étape 2) : un concours à venir ou en cours ouvre la NOUVELLE fiche concours (même design) */
    try { window.__concoursId = ev.id; window.__concoursPhoto = photoDe[ev.id] || null; } catch (e2) { }
    setEcran("concours");
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
        h("p", null, (team && team.nom ? team.nom : F("L’équipe")) + F(", saison ") + anDebut + "-" + (anDebut + 1) + "."))));

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
        h("span", { className: "hs-t" }, ev.titre || (ev.type === "stage" ? F("Stage") : F("Concours"))),
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
  var titreVue = vueEff === "avenir" ? F("Prochains rendez-vous") : (vueEff === "encours" ? F("En ce moment") : F("Rendez-vous terminés"));
  var videVue = vueEff === "avenir" ? F("Rien de prévu pour l’équipe pour l’instant.") : (vueEff === "encours" ? F("Rien en ce moment.") : F("Rien de terminé cette saison."));

  var corps;
  if (evs === null) corps = h("div", { className: "hs-attente", "aria-busy": "true" }, "…");
  else if (team === false) corps = h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Aucune équipe compétition pour l’instant."));
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
      erreur ? h("div", { className: "hs-err" }, F("Une partie n’a pas pu se charger : ") + erreur) : null),
    reserve ? h("div", { role: "status", style: { position: "fixed", left: "50%", bottom: "calc(96px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", zIndex: 60, maxWidth: "86%", padding: "12px 18px", borderRadius: 999, background: "rgba(12,16,18,.96)", border: "1px solid rgba(201,166,107,.7)", color: "#F3EEE4", fontSize: 13, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,.5)" } }, "🔒 " + reserve) : null);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   04/11/2026 — CENTRE DE COMPÉTITION, ÉTAPE 2 : LA FICHE CONCOURS et LA PAGE ENGAGEMENTS
   Demandes de Blandine (04/11 17h24 → 17h32) :
     · fiche du concours : « lieu du concours et horaires embarquement etc », garder « l'option qu'on a sur
       les événements pour dire qu'on y participe » et « les alertes aux heures prévues » ;
     · page Engagements : la coach choisit les couples dans les épreuves et Hype prépare « le papier à remettre
       à la SEP » (feuille « Engagements Concours CSO Club »). Licences des cavalières gardées. Le bas de la
       feuille (montants, bénéficiaires, Dû) reste VIDE : « en bas c'est pas moi ».
   Mêmes données que l'ancienne fiche : club_agenda, agenda_inscriptions (Je participe), abonnement aux
   notifications (hypePush*). Les alertes partent 15 min avant le DÉPART et la RECONNAISSANCE (notifier-rdv,
   inchangé). Nouvelles tables (SQL du 04/11) : concours_feuille, concours_engagements, cavaliers_licences.
   Toute écriture est vérifiée ; un refus est affiché, jamais avalé.
   ═══════════════════════════════════════════════════════════════════════════════ */
var CSS2_ID = "hype-saison-css-2";
var CSS2 = [
  ".hs-carte{border:1px solid rgba(243,238,228,.12);border-radius:14px;background:linear-gradient(135deg,#0d1416,#070A08 70%);overflow:hidden}",
  ".hs-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-top:1px solid rgba(243,238,228,.07);min-height:48px}.hs-row:first-child{border-top:0}",
  ".hs-row .g{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.hs-row .g b{font-weight:500;font-size:13.5px;color:var(--hs-iv)}.hs-row .g span{font-size:11.5px;color:var(--hs-iv2)}",
  ".hs-row .d{font-size:15px;font-variant-numeric:tabular-nums;color:var(--hs-iv);white-space:nowrap}",
  ".hs-row a,.hs-lien{color:var(--hs-ch);font-size:12.5px;text-decoration:none;background:none;border:none;padding:6px 0;white-space:nowrap}",
  ".hs-texte{padding:14px;font-size:13.5px;line-height:1.55;color:rgba(243,238,228,.86);white-space:pre-wrap;overflow-wrap:anywhere}",
  ".hs-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:46px;border-radius:999px;border:1px solid rgba(201,166,107,.8);background:transparent;color:var(--hs-ch);font-size:13.5px;letter-spacing:.02em}",
  ".hs-btn.plein{background:var(--hs-ch);color:#070A08;font-weight:600}",
  ".hs-btn.doux{border-color:rgba(243,238,228,.2);color:var(--hs-iv)}",
  ".hs-btn[disabled]{opacity:.5}",
  ".hs-duo{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}",
  ".hs-note{font-size:11.5px;line-height:1.5;color:var(--hs-iv2);margin-top:10px}",
  ".hs-msg{font-size:12px;line-height:1.5;color:var(--hs-ch);margin-top:10px}",
  ".hs-av{display:flex;flex-wrap:wrap;gap:6px;padding:12px 14px}",
  ".hs-av span{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(243,238,228,.12);border-radius:999px;padding:3px 10px 3px 3px;font-size:12px}",
  ".hs-av img{width:24px;height:24px;border-radius:50%;object-fit:cover;background:#0B0F0E}",
  /* formulaires de la page Engagements */
  ".hs-champ{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}",
  ".hs-champ label{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--hs-iv2)}",
  ".hs input,.hs select{width:100%;min-height:44px;border-radius:10px;border:1px solid rgba(243,238,228,.16);background:rgba(16,26,29,.6);color:var(--hs-iv);font-family:inherit;font-size:16px;padding:0 12px;-webkit-appearance:none;appearance:none}",
  ".hs select{background-image:linear-gradient(45deg,transparent 50%,#C9A66B 50%),linear-gradient(135deg,#C9A66B 50%,transparent 50%);background-position:calc(100% - 18px) 19px,calc(100% - 13px) 19px;background-size:5px 5px;background-repeat:no-repeat;padding-inline-end:30px}",
  ".hs input:focus,.hs select:focus{outline:none;border-color:rgba(201,166,107,.7)}",
  ".hs input[type=checkbox]{-webkit-appearance:checkbox;appearance:auto;width:20px;min-height:20px;height:20px;padding:0;flex:0 0 auto}",
  ".hs-g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
  ".hs-g2 .hs-champ{margin-bottom:8px}",
  ".hs-puces{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}",
  ".hs-puce{display:inline-flex;align-items:center;gap:8px;min-height:34px;border-radius:999px;border:1px solid rgba(201,166,107,.6);padding:0 6px 0 12px;font-size:12.5px}",
  ".hs-puce button{width:26px;height:26px;border-radius:50%;border:none;background:none;color:var(--hs-iv2);font-size:16px;line-height:1;padding:0}",
  ".hs-ajout{display:flex;gap:8px}.hs-ajout input{flex:1}.hs-ajout button{flex:0 0 auto;width:auto;padding:0 16px}",
  ".hs-couple{padding:14px;border-top:1px solid rgba(243,238,228,.08)}.hs-couple:first-child{border-top:0}",
  ".hs-couple-t{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}",
  ".hs-couple-t b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19px}",
  ".hs-ep{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:8px;margin-bottom:8px}",
  ".hs-coll{position:sticky;bottom:0;z-index:5;padding:14px 0 calc(env(safe-area-inset-bottom) + 12px);background:linear-gradient(180deg,rgba(7,10,8,0),#070A08 14px)}",
  /* LA FEUILLE SEP — page blanche à imprimer, copie de la fiche papier */
  "#zone-impression.hs-feuille{position:fixed;inset:0;z-index:400;background:#fff;color:#111;overflow:auto;font-family:Calibri,'Segoe UI',Arial,sans-serif}",
  ".hs-feuille .bar{position:sticky;top:0;display:flex;gap:8px;padding:calc(env(safe-area-inset-top) + 10px) 14px 10px;background:#f3f3f3;border-bottom:1px solid #ddd}",
  ".hs-feuille .bar button{flex:1;min-height:44px;border-radius:10px;border:none;font-size:14px;font-weight:600}",
  ".hs-feuille .bar .p{background:#111;color:#fff}.hs-feuille .bar .f{flex:0 0 auto;padding:0 18px;background:#e2e2e2;color:#111}",
  ".hs-feuille .page{width:100%;max-width:780px;margin:0 auto;padding:22px 16px 40px}",
  ".hs-feuille h2{font-family:'Monotype Corsiva','Apple Chancery','URW Chancery L',cursive;font-style:italic;font-weight:400;color:#1d2a8a;text-align:center;font-size:clamp(21px,6.2vw,30px);margin:6px 0 22px}",
  ".hs-feuille .tete{display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;font-size:13px;margin-bottom:16px}",
  ".hs-feuille .tete div{display:flex;gap:6px;align-items:baseline;min-width:0}",
  ".hs-feuille .tete i{font-style:normal;flex:1;min-width:0;border-bottom:1px dotted #888;font-weight:700;min-height:16px}",
  ".hs-feuille .tete small{font-size:11.5px}",
  ".hs-feuille table{border-collapse:collapse;width:100%}",
  ".hs-feuille .grille th,.hs-feuille .grille td{border:1px solid #333;font-size:12px;padding:6px 5px;text-align:left;vertical-align:middle}",
  ".hs-feuille .grille th{font-weight:700;font-size:12.5px}",
  ".hs-feuille .grille td{height:40px;font-weight:700}",
  ".hs-feuille .grille .c{text-align:center}",
  ".hs-feuille .bas{margin:26px 0 0 auto;width:62%;font-size:12px}",
  ".hs-feuille .bas td,.hs-feuille .bas th{border:1px solid #333;padding:3px 6px;font-weight:400}",
  ".hs-feuille .bas th{text-align:center}",
  ".hs-feuille .fait{margin-top:24px;font-size:12px}",
  "@media print{.hs-feuille .bar{display:none!important}.hs-feuille .page{max-width:none;padding:0}#zone-impression.hs-feuille{position:absolute!important}@page{size:A4 portrait;margin:14mm}}"
].join("\n");
function injecterCss2() {
  try { injecterCss(); if (document.getElementById(CSS2_ID)) return; var st = document.createElement("style"); st.id = CSS2_ID; st.textContent = CSS2; document.head.appendChild(st); } catch (e) { }
}

/* ── outils communs aux deux pages ── */
function hsCourbe(h, cls, d) {
  return h("svg", { className: "hs-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
    h("defs", null, h("linearGradient", { id: "hsg2-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
      h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
      h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
      h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
    cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
    h("path", { d: d, fill: "none", stroke: "url(#hsg2-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
}
function hsHero(h, o) {
  var ph = o.photo || PHOTOS_SAISON[0];
  return h("div", { className: "hs-hero" },
    (typeof SelecteurLangue === "function") ? h("div", { className: "hs-langue" }, h(SelecteurLangue, { compact: true })) : null,
    h("div", { className: "hs-in hs-hero-retour" },
      h("button", { type: "button", className: "hs-retour", onClick: o.retour }, h("i", null, "‹"), o.retourTxt)),
    hsCourbe(h, "c1", "M250 4 C 330 8, 385 40, 400 96"),
    h("div", { className: "hs-photo", style: { "--hs-pos": ph.pos } }, h("img", { src: ph.img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
    hsCourbe(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),
    h("div", { className: "hs-in" }, h("div", { className: "hs-titre" }, h("h1", { style: o.petit ? { fontSize: "clamp(34px,9.5vw,52px)", lineHeight: 1.05 } : null }, o.titre), o.sous ? h("p", null, o.sous) : null)));
}
function hsPhotoDe(id) {
  try { var p = window.__concoursPhoto; if (p && p.img) return p; } catch (e) { }
  var s = String(id || ""), n = 0; for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return PHOTOS_SAISON[n % PHOTOS_SAISON.length];
}
function hsDateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
function hsFmt(iso, o) { var d = hsDateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat("fr-FR", o).format(d); } catch (e) { return String(iso).slice(0, 10); } }
function hsPlage(ev) {
  var deb = String((ev && ev.date_jour) || "").slice(0, 10), fin = String((ev && ev.date_fin) || "").slice(0, 10);
  if (!deb) return "";
  if (!fin || fin === deb) { var t = hsFmt(deb, { weekday: "long", day: "numeric", month: "long" }); return t.charAt(0).toUpperCase() + t.slice(1); }
  var d1 = hsDateLoc(deb), d2 = hsDateLoc(fin);
  if (d1 && d2 && d1.getMonth() === d2.getMonth()) return "Du " + d1.getDate() + " au " + hsFmt(fin, { day: "numeric", month: "long" });
  return "Du " + hsFmt(deb, { day: "numeric", month: "long" }) + " au " + hsFmt(fin, { day: "numeric", month: "long" });
}
async function hsPeutGerer(clef) {
  try {
    if (typeof supa === "undefined" || !supa || !clef) return false;
    var r1 = await supa.rpc("hype_est_moderatrice");
    if (r1 && r1.data === true) return true;
    var r2 = await supa.rpc("hype_peut_gerer_club", { clef: clef });
    return !!(r2 && r2.data === true);
  } catch (e) { return false; }
}
function hsPhotoProfil(p) {
  var v = p && p.avatar_url;
  var s = v ? ((String(v).charAt(0) === "@") ? ((typeof CAV_IMGS !== "undefined" && CAV_IMGS[String(v).slice(1)]) || null) : v) : null;
  try { return s || ((typeof avatarHypeDefaut === "function") ? avatarHypeDefaut((p && (p.id || p.pseudo)) || "") : ""); } catch (e) { return s || ""; }
}

/* ════════════════════ LA FICHE CONCOURS ════════════════════ */
/* 04/11 22h57 (Blandine : « une cavalière qui n’est pas dans l’équipe … voir la liste et ce qu’elle prépare : on peut limiter ; elle a le
   droit de voir quand même les concours qui sont prévus ») — l’équipe et l’appartenance de la personne (membre du groupe, ou modératrice = la coach) */
var HS_EQUIPE = null;
async function hsEquipe() {
  if (HS_EQUIPE) return HS_EQUIPE;
  try {
    var rg = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom") : null;
    var G = rg && !rg.error && rg.data; if (!G || !G.id) return null;
    var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
    var membre = false;
    try { membre = !!u && (typeof estModerateurHype === "function") && estModerateurHype(u); } catch (eM) { }
    if (!membre && u && u.id) { var rm = await supa.from("groupes_membres").select("user_id").eq("groupe_id", G.id).eq("user_id", u.id).maybeSingle(); membre = !!(rm && rm.data); }
    HS_EQUIPE = { id: G.id, nom: G.nom || ((typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : "l’équipe"), membre: membre };
    return HS_EQUIPE;
  } catch (e) { return null; }
}
function EcranConcours() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return tr({ fr: fr }); }
  var rtl = (lg === "ar");
  var idEv = null; try { idEv = window.__concoursId || null; } catch (e0) { }

  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _ins = React.useState(null); var inscrits = _ins[0], setInscrits = _ins[1];
  var _jv = React.useState(false); var jeViens = _jv[0], setJeViens = _jv[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _pe = React.useState(""); var pushEtat = _pe[0], setPushEtat = _pe[1];
  var _pm = React.useState(""); var pushMsg = _pm[0], setPushMsg = _pm[1];
  var _ge = React.useState(false); var gestion = _ge[0], setGestion = _ge[1];
  var _mg = React.useState([]); var mesEng = _mg[0], setMesEng = _mg[1];
  var _cs = React.useState([]); var consignes = _cs[0], setConsignes = _cs[1];
  var _hi = React.useState([]); var histo = _hi[0], setHisto = _hi[1];
  var _eq = React.useState(null); var equipe = _eq[0], setEquipe = _eq[1];
  var _rp = React.useState(""); var msgPrep = _rp[0], setMsgPrep = _rp[1];
  React.useEffect(function () { var vif = true; hsEquipe().then(function (q) { if (vif) setEquipe(q); }); return function () { vif = false; }; }, []);
  function prep(ecran) {
    if (equipe && !equipe.membre) { setMsgPrep("🔒 " + F("Réservé à l’équipe ") + equipe.nom + "."); setTimeout(function () { setMsgPrep(""); }, 3000); return; }
    ouvrir(ecran);
  }
  var _dv = React.useState(null); var enDirect = _dv[0], setEnDirect = _dv[1];
  var _vp = React.useState([]); var videos = _vp[0], setVideos = _vp[1];
  var _dvo = React.useState(false); var dvOcc = _dvo[0], setDvOcc = _dvo[1];
  /* 04/11 22h — le direct lu par Hype sur Winjump (fonction direct-concours) : elle ne voit que ses passages */
  function lireEnDirect() {
    setDvOcc(true);
    supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: idEv } }).then(function (r) {
      setDvOcc(false);
      if (r && !r.error && r.data && !r.data.erreur) setEnDirect(r.data);
    }).catch(function () { setDvOcc(false); });
  }
  React.useEffect(function () {
    if (ev && mesEng.length && /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String(ev.lien_direct || ""))) lireEnDirect();
  }, [ev && ev.lien_direct, mesEng.length]);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function chargerInscrits(u) {
    (async function () {
      try {
        var r = await supa.from("agenda_inscriptions").select("user_id, cree_le").eq("agenda_id", idEv).order("cree_le");
        var ids = ((r && r.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);
        setJeViens(!!(u && ids.indexOf(u.id) >= 0));
        if (!ids.length) { setInscrits([]); return; }
        var rp = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", ids);
        var parId = {}; ((rp && rp.data) || []).forEach(function (x) { parId[x.id] = x; });
        setInscrits(ids.map(function (i) { return parId[i] || { id: i, pseudo: "?" }; }));
      } catch (eI) { setInscrits([]); }
    })();
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) { setErreur(F("Concours introuvable.")); return; }
        if (typeof supa === "undefined" || !supa) { setErreur(F("Pas de connexion.")); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        if (vif) setMoi(u);
        var r = await chargerAgendaEvenement(idEv);
        if (r && r.error) throw new Error(String(r.error.message || r.error));
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        if (vif) setEv(r.data);
        chargerInscrits(u);
        hsPeutGerer(r.data.club_clef).then(function (g) { if (vif) setGestion(g); });
        /* 04/11 22h15 — vidéos de parcours : celles publiées sur le fil du concours (cible « agenda:<id> ») */
        try {
          var rv = await supa.from("commentaires").select("id, user_id, photo_url, medias, prive, created_at").eq("cible", "agenda:" + idEv).order("created_at", { ascending: false }).limit(200);
          var vids = [];
          ((rv && !rv.error && rv.data) || []).forEach(function (po) {
            if (po.prive && !(u && po.user_id === u.id)) return;
            [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (m) { if (hsEstVideo(m)) vids.push({ media: String(m), proprio: po.user_id, le: po.created_at }); });
          });
          var idsA = []; vids.forEach(function (v) { if (v.proprio && idsA.indexOf(v.proprio) === -1) idsA.push(v.proprio); });
          if (idsA.length) { var rpa = await supa.from("profiles").select("id, pseudo").in("id", idsA); var pa = {}; ((rpa && rpa.data) || []).forEach(function (x) { pa[x.id] = x.pseudo; }); vids.forEach(function (v) { v.pseudo = pa[v.proprio] || ""; }); }
          if (vif) setVideos(vids);
        } catch (eV) { }
        if (u && u.id) {
          try {
            var re = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).eq("cavalier_id", u.id);
            var mes = (re && !re.error && re.data) || [];
            if (vif) setMesEng(mes);
            /* 04/11 (étape 3) : consignes de ses chevaux engagés (cheval_consignes, mêmes droits que Santé)
               et l'historique du couple (resultats : elle + ce cheval). Une lecture refusée = section absente. */
            var idsCh = [];
            mes.forEach(function (e) { [e.cheval1_id, e.cheval2_id].forEach(function (c) { if (c && idsCh.indexOf(c) === -1) idsCh.push(c); }); });
            if (idsCh.length) {
              try {
                var rcs = await supa.from("cheval_consignes").select("cheval_id, enrenement, materiel, soins").in("cheval_id", idsCh);
                if (vif && rcs && !rcs.error) setConsignes(rcs.data || []);
              } catch (eCs) { }
              try {
                var rh = await supa.from("resultats").select("id, concours, epreuve, date_epreuve, classement, place, partants, cheval_id").eq("cavalier_id", u.id).in("cheval_id", idsCh).order("date_epreuve", { ascending: false }).limit(12);
                if (vif && rh && !rh.error) setHisto(rh.data || []);
              } catch (eH) { }
            }
          } catch (eE) { }
        }
      } catch (eL) { if (vif) setErreur(String((eL && eL.message) || eL)); }
    })();
    try { Promise.resolve(hypePushEtat()).then(function (e) { if (vif) setPushEtat(e); }).catch(function () { }); } catch (eP) { }
    return function () { vif = false; };
  }, [idEv]);

  async function basculerJeViens() {
    if (!ev || occupe) return;
    if (!moi || !moi.id) { setMsg(F("Connecte-toi pour t’inscrire.")); return; }
    setOccupe(true); setMsg("");
    try {
      var r = jeViens
        ? await supa.from("agenda_inscriptions").delete().eq("agenda_id", ev.id).eq("user_id", moi.id).select("user_id")
        : await supa.from("agenda_inscriptions").insert({ agenda_id: ev.id, user_id: moi.id }).select("user_id");
      if (r && r.error) setMsg(F("La base a refusé : ") + String(r.error.message || r.error));
      else if (!r || !r.data || !r.data.length) setMsg(F("Rien n’a été enregistré."));
      chargerInscrits(moi);
    } catch (eB) { setMsg(String(eB)); }
    setOccupe(false);
  }
  async function basculerPush() {
    setPushMsg("");
    try {
      if (!hypePushPossible()) { setPushMsg(F("Ce téléphone ne sait pas recevoir les notifications de Hype.")); return; }
      if (!hypePushInstallee()) { setPushMsg(F("Sur iPhone, ajoute d’abord Hype à ton écran d’accueil (bouton Partager → Sur l’écran d’accueil), puis reviens ici.")); return; }
      if (pushEtat === "actif") { var rc = await hypePushCouper(); setPushEtat(await hypePushEtat()); if (rc && rc.error) setPushMsg(String(rc.error)); else setPushMsg(F("Alertes coupées sur ce téléphone.")); return; }
      var r = await hypePushActiver();
      setPushEtat(await hypePushEtat());
      if (r && r.error) { setPushMsg(r.error === "refuse" ? F("Les notifications ont été refusées. Tu peux les réautoriser dans Réglages → Notifications → Hype.") : (r.error === "connexion" ? F("Connecte-toi d’abord.") : String(r.error))); return; }
      setPushMsg(F("C’est activé. Tu seras prévenue avant le départ et avant la reconnaissance."));
    } catch (eP) { setPushMsg(String(eP)); }
  }

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("ma-saison"); }
  function ficheComplete() { try { window.__agendaFiche = idEv; window.__agendaFicheRetour = "concours"; } catch (e) { } setEcran("guilde"); }
  function ouvrirEngagements() { try { window.__engagementsId = idEv; } catch (e) { } setEcran("engagements"); }
  function ouvrir(ecran) { try { window.__concoursId = idEv; window.__engagementsId = idEv; } catch (e) { } setEcran(ecran); }

  var photo = hsPhotoDe(idEv);
  var hero = hsHero(h, { photo: photo, retour: retour, retourTxt: F("Ma saison"), titre: (ev && ev.titre) || F("Concours"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "", petit: !!(ev && String(ev.titre || "").length > 14) });
  if (!ev) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" },
    erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Impossible d’ouvrir ce concours : ") + erreur) : h("div", { className: "hs-attente", "aria-busy": "true" }, "…")));

  var horaires = [
    { k: F("Rendez-vous"), v: ev.heure },
    { k: F("Embarquement"), v: ev.heure_embarquement },
    { k: F("Départ"), v: ev.heure_depart, alerte: true },
    { k: F("Reconnaissance"), v: ev.heure_reco, alerte: true },
    { k: F("Début de l’épreuve"), v: ev.heure_epreuve }
  ].filter(function (x) { return x.v && String(x.v).trim(); });
  var aAlerte = horaires.some(function (x) { return x.alerte; });
  var lienPlan = ev.lieu ? ("https://maps.apple.com/?q=" + encodeURIComponent(ev.lieu)) : null;
  var fini = String(ev.date_fin || ev.date_jour || "").slice(0, 10) < (function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      /* infos pratiques */
      h("div", { className: "hs-sec" }, h("b", null, F("Infos pratiques"))),
      h("div", { className: "hs-carte" },
        h("div", { className: "hs-row" },
          h("div", { className: "g" }, h("span", null, F("Lieu")), h("b", null, ev.lieu || F("Pas encore indiqué"))),
          lienPlan ? h("a", { href: lienPlan, target: "_blank", rel: "noopener" }, F("Itinéraire") + (rtl ? " ‹" : " ›")) : null),
        horaires.length ? horaires.map(function (x, i) {
          return h("div", { key: i, className: "hs-row" }, h("div", { className: "g" }, h("b", null, x.k), x.alerte ? h("span", null, F("alerte 15 min avant")) : null), h("span", { className: "d" }, x.v));
        }) : h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Les horaires ne sont pas encore indiqués."))))),
      /* mon engagement */
      /* 04/11 (étape 3) MA JOURNÉE : ses épreuves, son cheval, son heure de passage et sa piste (saisies par la coach) */
      mesEng.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ma journée"))),
        h("div", { className: "hs-carte" }, mesEng.reduce(function (acc, e) {
          if (e.epreuve1 || e.cheval1_nom) acc.push({ ep: e.epreuve1, ch: e.cheval1_nom, hp: e.passage1, pi: e.piste1, maj: e.passage_maj_le });
          if (e.epreuve2 || e.cheval2_nom) acc.push({ ep: e.epreuve2, ch: e.cheval2_nom, hp: e.passage2, pi: e.piste2, maj: e.passage_maj_le });
          return acc;
        }, []).sort(function (a, b) { return hsMinutes(a.hp) - hsMinutes(b.hp); }).map(function (x, i) {
          var recent = x.maj && (Date.now() - new Date(x.maj).getTime() < 36 * 3600 * 1000);
          return h("div", { key: i, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, x.ep || F("Épreuve à venir")),
              h("span", null, [x.ch ? F("avec ") + x.ch : "", x.pi ? F("piste ") + x.pi : ""].filter(Boolean).join(" · ")),
              (x.hp && recent) ? h("span", { style: { color: "#C9A66B" } }, F("heure mise à jour par ta coach")) : null),
            h("span", { className: "d" }, x.hp || F("heure à venir")));
        }))) : null,
      /* le direct (Winjump) : son numéro, son heure estimée, son résultat */
      (enDirect && enDirect.lignes && enDirect.lignes.length) ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("En direct")),
          h("button", { type: "button", className: "hs-lien", disabled: dvOcc, onClick: lireEnDirect }, dvOcc ? "…" : F("Actualiser"))),
        h("div", { className: "hs-carte" }, enDirect.lignes.map(function (d, i) {
          var res = d.clt ? (d.clt + (d.clt === "1" ? "re" : "e") + (d.points !== "" ? " · " + d.points + " pt" : "") + (d.temps ? " · " + d.temps + " s" : "")) : "";
          return h("div", { key: i, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, d.epreuve), h("span", null, [d.cheval, F("n° ") + d.ordre + F(" sur ") + d.engages, d.heure_estimee ? F("vers ") + d.heure_estimee : ""].filter(Boolean).join(" · "))),
            h("span", { className: "d", style: { fontSize: 13 } }, res || F("à venir")));
        })),
        h("div", { className: "hs-note" }, F("Lu par Hype chez le chronométreur. Heure estimée, résultats provisoires pendant le concours."))) : null,
      /* consignes de son cheval (page Santé du cheval) */
      consignes.filter(function (c) { return c.enrenement || c.materiel || c.soins; }).map(function (c) {
        var nomC = ""; mesEng.forEach(function (e) { if (e.cheval1_id === c.cheval_id) nomC = e.cheval1_nom || nomC; if (e.cheval2_id === c.cheval_id) nomC = e.cheval2_nom || nomC; });
        return h("div", { key: "cs" + c.cheval_id },
          h("div", { className: "hs-sec" }, h("b", null, F("Consignes pour ") + (nomC || F("ton cheval")))),
          h("div", { className: "hs-carte" },
            c.materiel ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Matériel")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.materiel))) : null,
            c.enrenement ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Enrênement")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.enrenement))) : null,
            c.soins ? h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Soins")), h("b", { style: { whiteSpace: "pre-wrap" } }, c.soins))) : null));
      }),
      /* vidéos de parcours, à commenter */
      h("div", { className: "hs-sec" }, h("b", null, F("Vidéos de parcours")), h("button", { type: "button", className: "hs-lien", onClick: ficheComplete }, F("+ Ajouter"))),
      videos.length ? h("div", { className: "hs-tiles" }, videos.slice(0, 9).map(function (v, i) {
        return h("button", { type: "button", key: i, className: "hs-tile", style: { height: 96, backgroundImage: hsVignetteVideo(v.media) ? "url(" + hsVignetteVideo(v.media) + ")" : "none" }, onClick: function () { try { window.__videoParcours = { media: v.media, proprio: v.proprio, pseudo: v.pseudo, agenda: idEv, titre: ev.titre }; } catch (e) { } setEcran("video-parcours"); } },
          h("span", null, "▶ " + (v.pseudo || "")));
      })) : h("div", { className: "hs-vide" }, F("Pas encore de vidéo. Ajoute-la sur le fil du concours : ta coach pourra la commenter seconde par seconde.")),
      /* sa préparation */
      !fini ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ma préparation"))),
        h("div", { className: "hs-carte" },
          h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("liste-van"); } },
            h("div", { className: "g" }, h("b", null, F("Ma liste du van")), h("span", null, F("à cocher, gardée d’un concours à l’autre"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›")),
          h("button", { type: "button", className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { prep("dossier-concours"); } },
            h("div", { className: "g" }, h("b", null, F("Le dossier")), h("span", null, F("licence, vaccins du cheval, papiers"))), h("span", { className: "hs-lien" }, rtl ? "‹" : "›"))),
        msgPrep ? h("div", { className: "hs-msg" }, msgPrep) : null) : null,
      /* résultats en direct (lien posé par la coach) */
      ev.lien_direct ? h("div", { style: { marginTop: 14 } },
        h("a", { className: "hs-btn plein", href: ev.lien_direct, target: "_blank", rel: "noopener", style: { textDecoration: "none" } }, F("Résultats en direct"))) : null,
      /* historique du couple */
      histo.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ton historique avec ce cheval"))),
        h("div", { className: "hs-carte" }, histo.map(function (r) {
          var pl = r.place ? (r.place + (r.place === 1 ? "re" : "e") + (r.partants ? " / " + r.partants : "")) : (r.classement || "");
          return h("div", { key: r.id, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, r.concours || F("Concours")), h("span", null, [r.epreuve, hsFmt(r.date_epreuve, { day: "numeric", month: "short", year: "numeric" })].filter(Boolean).join(" · "))),
            pl ? h("span", { className: "d", style: { fontSize: 13 } }, pl) : null);
        }))) : null,
      /* je participe + alertes */
      h("div", { className: "hs-sec" }, h("b", null, F("Je participe"))),
      fini ? h("div", { className: "hs-vide" }, F("Ce concours est terminé.")) : h("div", null,
        h("button", { type: "button", className: "hs-btn" + (jeViens ? " plein" : ""), disabled: occupe, onClick: basculerJeViens }, jeViens ? F("✓ Tu participes") : F("Je participe")),
        jeViens ? h("div", { className: "hs-note" }, F("Touche encore pour te retirer.")) : null,
        h("button", { type: "button", className: "hs-btn doux", style: { marginTop: 10 }, onClick: basculerPush }, pushEtat === "actif" ? F("✓ Alertes activées sur ce téléphone") : F("Me prévenir (alertes)")),
        h("div", { className: "hs-note" }, aAlerte
          ? F("Si tu participes et que les alertes sont activées, Hype te prévient 15 minutes avant le départ et avant la reconnaissance.")
          : F("Les alertes partiront dès que l’heure de départ ou de reconnaissance sera indiquée.")),
        msg ? h("div", { className: "hs-msg" }, msg) : null,
        pushMsg ? h("div", { className: "hs-msg" }, pushMsg) : null),
      inscrits && inscrits.length ? h("div", { className: "hs-carte", style: { marginTop: 14 } },
        h("div", { className: "hs-row" }, h("div", { className: "g" }, h("b", null, inscrits.length + (inscrits.length > 1 ? F(" cavalières participent") : F(" cavalière participe"))))),
        h("div", { className: "hs-av" }, inscrits.map(function (p) { return h("span", { key: p.id }, h("img", { src: hsPhotoProfil(p), alt: "" }), p.pseudo || "?"); }))) : null,
      /* ce qu'il faut savoir */
      ev.description ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Ce qu’il faut savoir"))),
        h("div", { className: "hs-carte" }, h("div", { className: "hs-texte" }, ev.description))) : null,
      /* coach */
      gestion ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Pour la coach"))),
        h("button", { type: "button", className: "hs-btn plein", onClick: ouvrirEngagements }, F("Engagements et feuille SEP")),
        h("div", { className: "hs-duo" },
          h("button", { type: "button", className: "hs-btn", onClick: function () { ouvrir("jour-j"); } }, F("Jour J : passages")),
          h("button", { type: "button", className: "hs-btn", onClick: function () { ouvrir("dossier-concours"); } }, F("Le dossier"))),
        h("div", { style: { height: 8 } })) : null,
      h("div", { style: { marginTop: gestion ? 0 : 22 } },
        h("button", { type: "button", className: "hs-btn doux", onClick: ficheComplete }, gestion ? F("Fiche complète : fil, photos, modifier") : F("Fiche complète : fil et photos"))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ LA PAGE ENGAGEMENTS (coach) ════════════════════ */
function EcranEngagements() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function F(fr) { return tr({ fr: fr }); }
  var rtl = (lg === "ar");
  var idEv = null; try { idEv = window.__engagementsId || window.__concoursId || null; } catch (e0) { }

  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _ge = React.useState(null); var gestion = _ge[0], setGestion = _ge[1];
  var _fe = React.useState(null); var feuille = _fe[0], setFeuille = _fe[1];
  var _li = React.useState(null); var lignes = _li[0], setLignes = _li[1];
  var _sup = React.useState([]); var supprimees = _sup[0], setSupprimees = _sup[1];
  var _ca = React.useState([]); var candidates = _ca[0], setCandidates = _ca[1];
  var _ch = React.useState([]); var chevaux = _ch[0], setChevaux = _ch[1];
  var _nep = React.useState(""); var nouvelleEp = _nep[0], setNouvelleEp = _nep[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _mod = React.useState(false); var modifie = _mod[0], setModifie = _mod[1];
  var _vf = React.useState(false); var voirFeuille = _vf[0], setVoirFeuille = _vf[1];

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function clefDe(n) { try { return (typeof clefClubG === "function") ? clefClubG(n) : String(n || "").toLowerCase().trim(); } catch (e) { return String(n || "").toLowerCase().trim(); } }
  function nomFfeDe(pseudo) { return String(pseudo || "").trim(); }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        if (typeof supa === "undefined" || !supa) throw new Error(F("pas de connexion"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        var E = r.data; if (vif) setEv(E);
        var g = await hsPeutGerer(E.club_clef);
        if (vif) setGestion(g);
        if (!g) return;
        /* l'en-tête de la feuille (ou des valeurs de départ) */
        var rf = await supa.from("concours_feuille").select("*").eq("agenda_id", idEv).maybeSingle();
        if (rf && rf.error) throw new Error(F("feuille : ") + (rf.error.message || rf.error));
        var Fe = (rf && rf.data) || null;
        if (!Fe) {
          Fe = { agenda_id: idEv, epreuves: [], discipline: "CSO", numero: "", prix: "", transport: "", facturer_le: "", faits_le: "", chef_nom: "", chef_licence: "" };
          if (u && u.id) {
            try { var rl0 = await supa.from("cavaliers_licences").select("nom, licence").eq("user_id", u.id).maybeSingle(); if (rl0 && rl0.data) { Fe.chef_nom = rl0.data.nom || ""; Fe.chef_licence = rl0.data.licence || ""; } } catch (eC) { }
          }
          Fe.__nouvelle = true;
        }
        if (vif) setFeuille(Fe);
        /* les lignes déjà enregistrées */
        var rl = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true });
        if (rl && rl.error) throw new Error(F("engagements : ") + (rl.error.message || rl.error));
        var L = (rl && rl.data) || [];
        /* cavalières possibles : inscrites, membres de la Team (SEP), membres du club */
        var parId = {};
        function ajouterP(p, src) { if (!p || !p.id) return; if (!parId[p.id]) parId[p.id] = { id: p.id, pseudo: p.pseudo || "", avatar_url: p.avatar_url || null, src: src }; }
        try {
          var ri = await supa.from("agenda_inscriptions").select("user_id").eq("agenda_id", idEv);
          var idsI = ((ri && ri.data) || []).map(function (x) { return x.user_id; });
          if (idsI.length) { var rpi = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsI); ((rpi && rpi.data) || []).forEach(function (p) { ajouterP(p, "inscrite"); }); }
        } catch (eI) { }
        var nomClub = E.club_clef;
        try {
          if (typeof TEAM_CLE !== "undefined" && E.club_clef === TEAM_CLE) {
            nomClub = TEAM_CLUB;
            var rg = await hypeRequeteTeam("id");
            if (rg && rg.data && rg.data.id) {
              var rm = await supa.from("groupes_membres").select("user_id").eq("groupe_id", rg.data.id);
              var idsT = ((rm && rm.data) || []).map(function (x) { return x.user_id; });
              if (idsT.length) { var rpt = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsT); ((rpt && rpt.data) || []).forEach(function (p) { ajouterP(p, "team"); }); }
            }
          } else if (u && u.id) {
            var rpm = await supa.from("profiles").select("ecurie, ecurie2").eq("id", u.id).maybeSingle();
            [rpm && rpm.data && rpm.data.ecurie, rpm && rpm.data && rpm.data.ecurie2].forEach(function (n) { if (n && clefDe(n) === E.club_clef) nomClub = n; });
          }
        } catch (eT) { }
        var membres = [];
        try { membres = await hypeCavaliersDuClub(nomClub, "id, pseudo, avatar_url, ecurie, ecurie2"); } catch (eM) { membres = []; }
        (membres || []).forEach(function (p) { ajouterP(p, "club"); });
        var cand = Object.keys(parId).map(function (k) { return parId[k]; });
        /* licences gardées */
        var lic = {};
        try {
          var idsC = cand.map(function (p) { return p.id; });
          if (idsC.length) { var rlc = await supa.from("cavaliers_licences").select("user_id, nom, licence").in("user_id", idsC.slice(0, 400)); ((rlc && rlc.data) || []).forEach(function (x) { lic[x.user_id] = x; }); }
        } catch (eLc) { }
        cand.forEach(function (p) { p.nom = (lic[p.id] && lic[p.id].nom) || ""; p.licence = (lic[p.id] && lic[p.id].licence) || ""; });
        cand.sort(function (a, b) { var o = { inscrite: 0, team: 1, club: 2 }; return (o[a.src] - o[b.src]) || String(a.nom || a.pseudo).localeCompare(String(b.nom || b.pseudo), "fr"); });
        if (vif) setCandidates(cand);
        /* première ouverture : on part des cavalières inscrites */
        if (!L.length) {
          L = cand.filter(function (p) { return p.src === "inscrite"; }).map(function (p, i) { return { __n: true, cavalier_id: p.id, nom: p.nom || nomFfeDe(p.pseudo), licence: p.licence || "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: i }; });
          if (L.length && vif) setModifie(true);
        }
        if (vif) setLignes(L);
        /* chevaux du club, proposés dans la liste */
        try {
          var idsCl = (membres || []).map(function (p) { return p.id; }).concat(cand.map(function (p) { return p.id; }));
          if (idsCl.length) {
            var rc = await supa.from("chevaux").select("id, user_id, nom, club").in("user_id", idsCl.slice(0, 400)).is("supprime_le", null).limit(800);
            var lc = (rc && rc.data) || [];
            try { lc = hypeChevauxDuClub(lc, nomClub); } catch (eF) { }
            lc.sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
            if (vif) setChevaux(lc);
          }
        } catch (eCh) { }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setLignes(function (l) { return l || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("concours"); }
  function poserF(k, v) { setFeuille(Object.assign({}, feuille, (function () { var o = {}; o[k] = v; return o; })())); setModifie(true); setMsg(""); }
  function poserL(i, k, v) { var n = lignes.slice(); n[i] = Object.assign({}, n[i]); n[i][k] = v; setLignes(n); setModifie(true); setMsg(""); }
  function ajouterEpreuve() {
    var t = String(nouvelleEp || "").trim(); if (!t) return;
    var l = (feuille.epreuves || []).slice(); if (l.indexOf(t) === -1) l.push(t);
    poserF("epreuves", l); setNouvelleEp("");
  }
  function retirerEpreuve(t) { poserF("epreuves", (feuille.epreuves || []).filter(function (x) { return x !== t; })); }
  function ajouterCavaliere(val) {
    if (!val) return;
    var n = lignes.slice();
    if (val === "__autre") n.push({ __n: true, cavalier_id: null, nom: "", licence: "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: n.length });
    else {
      var p = candidates.filter(function (c) { return c.id === val; })[0]; if (!p) return;
      n.push({ __n: true, cavalier_id: p.id, nom: p.nom || nomFfeDe(p.pseudo), licence: p.licence || "", epreuve1: "", cheval1_nom: "", epreuve2: "", cheval2_nom: "", ordre: n.length });
    }
    setLignes(n); setModifie(true); setMsg("");
  }
  function retirerLigne(i) {
    var l = lignes[i]; if (l && l.id) setSupprimees(supprimees.concat([l.id]));
    setLignes(lignes.filter(function (x, j) { return j !== i; })); setModifie(true); setMsg("");
  }
  function idCheval(nom) {
    var t = String(nom || "").trim().toLowerCase(); if (!t) return null;
    var c = chevaux.filter(function (x) { return String(x.nom || "").trim().toLowerCase() === t; });
    return c.length === 1 ? c[0].id : null;
  }

  async function enregistrer() {
    if (occupe || !feuille || !lignes) return;
    var vides = lignes.filter(function (l) { return !String(l.nom || "").trim(); });
    if (vides.length) { setMsg(F("Il manque le nom d’une cavalière.")); return; }
    setOccupe(true); setMsg("");
    try {
      var fe = { agenda_id: idEv, epreuves: feuille.epreuves || [], discipline: feuille.discipline || null, numero: feuille.numero || null, prix: feuille.prix || null, transport: feuille.transport || null, facturer_le: feuille.facturer_le || null, faits_le: feuille.faits_le || null, chef_nom: feuille.chef_nom || null, chef_licence: feuille.chef_licence || null, maj_le: new Date().toISOString() };
      var rf = await supa.from("concours_feuille").upsert(fe, { onConflict: "agenda_id" }).select("agenda_id");
      if (rf && rf.error) throw new Error(F("feuille : ") + (rf.error.message || rf.error));
      if (!rf || !rf.data || !rf.data.length) throw new Error(F("la feuille n’a pas été enregistrée (droits ?)"));
      if (supprimees.length) {
        var rd = await supa.from("concours_engagements").delete().in("id", supprimees).select("id");
        if (rd && rd.error) throw new Error(F("retrait : ") + (rd.error.message || rd.error));
      }
      var nouv = [];
      for (var i = 0; i < lignes.length; i++) {
        var l = lignes[i];
        var row = { agenda_id: idEv, cavalier_id: l.cavalier_id || null, nom: String(l.nom || "").trim(), licence: String(l.licence || "").trim() || null,
          epreuve1: l.epreuve1 || null, cheval1_nom: String(l.cheval1_nom || "").trim() || null, cheval1_id: idCheval(l.cheval1_nom),
          epreuve2: l.epreuve2 || null, cheval2_nom: String(l.cheval2_nom || "").trim() || null, cheval2_id: idCheval(l.cheval2_nom),
          ordre: i, maj_le: new Date().toISOString() };
        var rr = l.id
          ? await supa.from("concours_engagements").update(row).eq("id", l.id).select("*")
          : await supa.from("concours_engagements").insert(row).select("*");
        if (rr && rr.error) throw new Error(row.nom + " : " + (rr.error.message || rr.error));
        if (!rr || !rr.data || !rr.data.length) throw new Error(row.nom + F(" : refusé par la base"));
        nouv.push(rr.data[0]);
        /* la licence et le nom sont gardés pour la prochaine fois */
        if (row.cavalier_id && (row.licence || row.nom)) {
          try { await supa.from("cavaliers_licences").upsert({ user_id: row.cavalier_id, nom: row.nom, licence: row.licence, maj_le: new Date().toISOString() }, { onConflict: "user_id" }).select("user_id"); } catch (eLi) { }
        }
      }
      setLignes(nouv); setSupprimees([]); setModifie(false);
      setFeuille(Object.assign({}, feuille, { __nouvelle: false }));
      setMsg(F("✓ Enregistré."));
    } catch (eS) { setMsg(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    setOccupe(false);
  }

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: retour, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Engagements"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "" });
  if (gestion === false) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Cette page est réservée à la coach du club."))));
  if (!feuille || !lignes) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" },
    erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Impossible de charger les engagements : ") + erreur) : h("div", { className: "hs-attente", "aria-busy": "true" }, "…")));

  function champ(lab, k, ph, type) {
    return h("div", { className: "hs-champ" }, h("label", null, lab),
      h("input", { type: type || "text", value: feuille[k] || "", placeholder: ph || "", onChange: function (e) { poserF(k, e.target.value); } }));
  }
  var eps = feuille.epreuves || [];
  function selEp(i, k) {
    var v = lignes[i][k] || "";
    var opts = eps.slice(); if (v && opts.indexOf(v) === -1) opts.unshift(v);
    return h("select", { value: v, "aria-label": F("Épreuve"), onChange: function (e) { poserL(i, k, e.target.value); } },
      h("option", { value: "" }, "—"), opts.map(function (o) { return h("option", { key: o, value: o }, o); }));
  }
  var dejaLa = {}; lignes.forEach(function (l) { if (l.cavalier_id) dejaLa[l.cavalier_id] = true; });
  var restantes = candidates.filter(function (c) { return !dejaLa[c.id]; });
  var groupes = [{ k: "inscrite", l: F("Inscrites au concours") }, { k: "team", l: F("Team") }, { k: "club", l: F("Club") }];

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" },
    hero,
    h("div", { className: "hs-in" },
      /* 1. le concours */
      h("div", { className: "hs-sec" }, h("b", null, F("Le concours"))),
      h("div", { className: "hs-g2" }, champ(F("Discipline"), "discipline", "CSO"), champ(F("N° concours"), "numero", "")),
      h("div", { className: "hs-g2" }, champ(F("Prix engagement"), "prix", ""),
        h("div", { className: "hs-champ" }, h("label", null, F("Transport")),
          h("select", { value: feuille.transport || "", onChange: function (e) { poserF("transport", e.target.value); } },
            h("option", { value: "" }, "—"), h("option", { value: "Oui" }, F("Oui")), h("option", { value: "Non" }, F("Non"))))),
      h("div", { className: "hs-g2" }, champ(F("À facturer le"), "facturer_le", ""), champ(F("Engagements faits le"), "faits_le", "")),
      h("div", { className: "hs-g2" }, champ(F("Chef d’équipe"), "chef_nom", ""), champ(F("Sa licence"), "chef_licence", "")),
      /* 2. les épreuves */
      h("div", { className: "hs-sec" }, h("b", null, F("Les épreuves"))),
      eps.length ? h("div", { className: "hs-puces" }, eps.map(function (t) {
        return h("span", { key: t, className: "hs-puce" }, t, h("button", { type: "button", "aria-label": F("Retirer ") + t, onClick: function () { retirerEpreuve(t); } }, "×"));
      })) : h("div", { className: "hs-note", style: { marginTop: 0, marginBottom: 10 } }, F("Ajoute les épreuves du concours, par exemple « Club 2 » ou « Club 1 GP ».")),
      h("div", { className: "hs-ajout" },
        h("input", { type: "text", value: nouvelleEp, placeholder: F("Nom de l’épreuve"), onChange: function (e) { setNouvelleEp(e.target.value); }, onKeyDown: function (e) { if (e.key === "Enter") { e.preventDefault(); ajouterEpreuve(); } } }),
        h("button", { type: "button", className: "hs-btn", onClick: ajouterEpreuve }, F("Ajouter"))),
      /* 3. les couples */
      h("div", { className: "hs-sec" }, h("b", null, F("Les couples")), h("span", null, lignes.length ? String(lignes.length) : "")),
      h("datalist", { id: "hs-chevaux" }, chevaux.map(function (c) { return h("option", { key: c.id, value: c.nom }); })),
      lignes.length ? h("div", { className: "hs-carte" }, lignes.map(function (l, i) {
        return h("div", { key: l.id || ("n" + i), className: "hs-couple" },
          h("div", { className: "hs-couple-t" }, h("b", null, l.nom || F("Nouvelle cavalière")),
            h("button", { type: "button", className: "hs-lien", onClick: function () { retirerLigne(i); } }, F("Retirer"))),
          h("div", { className: "hs-g2" },
            h("div", { className: "hs-champ" }, h("label", null, F("Nom Prénom")), h("input", { type: "text", value: l.nom || "", placeholder: "NOM Prénom", onChange: function (e) { poserL(i, "nom", e.target.value); } })),
            h("div", { className: "hs-champ" }, h("label", null, F("Licence")), h("input", { type: "text", value: l.licence || "", autoCapitalize: "characters", onChange: function (e) { poserL(i, "licence", e.target.value); } }))),
          h("div", { className: "hs-champ", style: { marginBottom: 4 } }, h("label", null, F("1re épreuve et cheval"))),
          h("div", { className: "hs-ep" }, selEp(i, "epreuve1"), h("input", { type: "text", list: "hs-chevaux", value: l.cheval1_nom || "", placeholder: F("Cheval"), onChange: function (e) { poserL(i, "cheval1_nom", e.target.value); } })),
          h("div", { className: "hs-champ", style: { marginBottom: 4 } }, h("label", null, F("2e épreuve et cheval (facultatif)"))),
          h("div", { className: "hs-ep", style: { marginBottom: 0 } }, selEp(i, "epreuve2"), h("input", { type: "text", list: "hs-chevaux", value: l.cheval2_nom || "", placeholder: F("Cheval"), onChange: function (e) { poserL(i, "cheval2_nom", e.target.value); } })));
      })) : h("div", { className: "hs-vide" }, F("Aucune cavalière pour l’instant. Ajoute-les ci-dessous.")),
      h("div", { className: "hs-champ", style: { marginTop: 12 } }, h("label", null, F("Ajouter une cavalière")),
        h("select", { value: "", onChange: function (e) { ajouterCavaliere(e.target.value); } },
          h("option", { value: "" }, F("Choisir…")),
          groupes.map(function (g) {
            var l = restantes.filter(function (c) { return c.src === g.k; });
            return l.length ? h("optgroup", { key: g.k, label: g.l }, l.map(function (c) { return h("option", { key: c.id, value: c.id }, (c.nom || c.pseudo || "?") + (c.nom && c.pseudo ? " (" + c.pseudo + ")" : "")); })) : null;
          }),
          h("option", { value: "__autre" }, F("Une cavalière sans compte Hype")))),
      h("div", { className: "hs-note" }, F("Les licences sont gardées pour la prochaine fois. Seules toi et la cavalière concernée les voient. Chaque cavalière voit son engagement sur la fiche du concours.")),
      /* actions */
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("div", { className: "hs-duo", style: { marginTop: 0 } },
          h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !modifie, onClick: enregistrer }, occupe ? F("Enregistrement…") : (modifie ? F("Enregistrer") : F("✓ Enregistré"))),
          h("button", { type: "button", className: "hs-btn", onClick: function () { setVoirFeuille(true); } }, F("Feuille SEP")))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null),
    voirFeuille ? feuilleSep(h, ev, feuille, lignes, function () { setVoirFeuille(false); }, modifie) : null);
}

/* La feuille « Engagements Concours CSO Club », à l'identique de la fiche papier de la SEP.
   Le bas (Dû, montants, bénéficiaires) reste VIDE : ce n'est pas la coach qui le remplit. */
function feuilleSep(h, ev, fe, lignes, fermer, nonEnregistre) {
  var d = hsDateLoc(ev && ev.date_jour), df = hsDateLoc(ev && ev.date_fin);
  function jj(x) { return String(x.getDate()).padStart(2, "0") + "/" + String(x.getMonth() + 1).padStart(2, "0") + "/" + x.getFullYear(); }
  var date = d ? (df && df.getTime() !== d.getTime() ? "du " + jj(d) + " au " + jj(df) : jj(d)) : "";
  var disc = String(fe.discipline || "").trim();
  var titre = "Engagements Concours " + ((!disc || /^cso$/i.test(disc)) ? "CSO" : disc) + " Club";
  var tri = lignes.slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
  var vides = Math.max(1, 9 - tri.length);
  function partagerPdf() {
    try {
      var octets = hsPdfFeuille({ titre: titre, date: date, lieu: (ev && ev.lieu) || "", fe: fe, tri: tri });
      var nom = "engagements-" + String((ev && ev.titre) || "concours").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "") + ".pdf";
      var fic = null; try { fic = new File([octets], nom, { type: "application/pdf" }); } catch (eF) { fic = null; }
      if (fic && navigator.canShare && navigator.canShare({ files: [fic] }) && navigator.share) { navigator.share({ files: [fic], title: titre }).catch(function () { }); return; }
      var url = URL.createObjectURL(new Blob([octets], { type: "application/pdf" }));
      var lien = document.createElement("a"); lien.href = url; lien.download = nom; document.body.appendChild(lien); lien.click(); lien.remove();
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (eR) { } }, 60000);
    } catch (eP) { try { window.__hsPdfErreur = String(eP); console.error(eP); } catch (e2) { } }
  }
  function ligneVal(k, v) { return h("div", null, h("span", null, k), h("i", null, v || "")); }
  return h("div", { id: "zone-impression", className: "hs-feuille", role: "dialog", "aria-label": titre },
    h("div", { className: "bar no-print" },
      h("button", { type: "button", className: "p", onClick: function () { partagerPdf(); } }, "Enregistrer en PDF"),
      h("button", { type: "button", className: "f", onClick: function () { try { window.print(); } catch (e) { } } }, "Imprimer"),
      h("button", { type: "button", className: "f", onClick: fermer }, "Fermer")),
    nonEnregistre ? h("div", { className: "no-print", style: { maxWidth: 780, margin: "10px auto 0", padding: "0 16px", fontSize: 12.5, color: "#8a5a00" } }, "Attention : tes dernières modifications ne sont pas encore enregistrées. Elles apparaissent quand même ci-dessous.") : null,
    h("div", { className: "page" },
      h("h2", null, titre),
      h("div", { className: "tete" },
        ligneVal("Date :", date), ligneVal("Lieu :", ev && ev.lieu),
        ligneVal("Discipline :", fe.discipline), ligneVal("N° Concours :", fe.numero),
        h("div", null, h("span", null, "Chef d’équipe :"), h("i", null, (fe.chef_nom || "") + (fe.chef_licence ? "   Lic. " + fe.chef_licence : ""))),
        ligneVal("Prix engagement :", fe.prix),
        h("div", null), h("div", null, h("small", null, "Transport oui ou non :"), h("i", null, fe.transport || "")),
        h("div", null), h("div", null, h("small", null, "A facturer le :"), h("i", null, fe.facturer_le || ""))),
      h("table", { className: "grille" },
        h("thead", null, h("tr", null,
          h("th", { className: "c", style: { width: "22%" } }, "CAVALIERS"), h("th", { className: "c", style: { width: "5%" } }, "Dû"), h("th", { className: "c", style: { width: "13%" } }, "Licence"),
          h("th", { className: "c", style: { width: "10%" } }, "Ep."), h("th", { style: { width: "19%" } }, "CHEVAL"), h("th", { className: "c", style: { width: "10%" } }, "Ep."), h("th", { style: { width: "21%" } }, "CHEVAL"))),
        h("tbody", null,
          tri.map(function (l, i) {
            return h("tr", { key: i }, h("td", null, l.nom || ""), h("td", null, ""), h("td", { className: "c" }, l.licence || ""),
              h("td", { className: "c" }, l.epreuve1 || ""), h("td", null, l.cheval1_nom || ""), h("td", { className: "c" }, l.epreuve2 || ""), h("td", null, l.cheval2_nom || ""));
          }),
          Array.apply(null, Array(vides)).map(function (x, i) { return h("tr", { key: "v" + i }, h("td", null), h("td", null), h("td", null), h("td", null), h("td", null), h("td", null), h("td", null)); }))),
      h("table", { className: "bas" },
        h("thead", null, h("tr", null, h("th", { style: { border: "none" } }), h("th", null, "Montant"), h("th", null, "Bénéficiaires"))),
        h("tbody", null, ["Engagements", "Location chevaux", "Coaching", "Transport"].map(function (k) { return h("tr", { key: k }, h("td", null, k), h("td", null), h("td", null)); }),
          h("tr", null, h("td", { style: { textAlign: "right", fontWeight: 700, border: "none" } }, "TOTAL"), h("td", null), h("td", null)))),
      h("div", { className: "fait" }, "Engagements faits le ", h("span", { style: { display: "inline-block", minWidth: 170, borderBottom: "1px dotted #888", fontWeight: 700 } }, fe.faits_le || ""))));
}

/* ── Le PDF de la feuille, écrit directement (aucune bibliothèque à charger) : polices standard des PDF
   (Helvetica, Helvetica-Bold, Times-Italic), encodage Windows-1252 (accents français). A4 portrait. ── */
var HS_CP1252 = { 0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F };
function hsPdfTexte(t) {
  var s = String(t == null ? "" : t), o = "";
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i), b = (c < 0x80 || (c >= 0xA0 && c <= 0xFF)) ? c : (HS_CP1252[c] || 0x3F);
    if (b < 0x20) b = 0x20;
    var ch = String.fromCharCode(b);
    if (ch === "(" || ch === ")" || ch === "\\") ch = "\\" + ch;
    o += ch;
  }
  return o;
}
var hsMesureCtx = null;
function hsLargeur(t, police, taille) {
  try {
    if (!hsMesureCtx) hsMesureCtx = document.createElement("canvas").getContext("2d");
    hsMesureCtx.font = (police === "F2" ? "bold " : (police === "F3" ? "italic " : "")) + "100px " + (police === "F3" ? "'Times New Roman',Times,serif" : "Helvetica,Arial,sans-serif");
    return hsMesureCtx.measureText(String(t || "")).width * taille / 100;
  } catch (e) { return String(t || "").length * taille * 0.55; }
}
function hsCouper(t, police, taille, max) {
  var s = String(t || "");
  if (hsLargeur(s, police, taille) <= max) return s;
  while (s.length > 1 && hsLargeur(s + "…", police, taille) > max) s = s.slice(0, -1);
  return s + "…";
}
function hsPdfFeuille(o) {
  var W = 595.28, H = 841.89, ops = [];
  function Y(y) { return (H - y).toFixed(2); }
  function txt(x, y, t, pol, tl, coul) {
    if (!t) return;
    ops.push((coul || "0 0 0") + " rg BT /" + pol + " " + tl + " Tf " + x.toFixed(2) + " " + Y(y) + " Td (" + hsPdfTexte(t) + ") Tj ET");
  }
  function txtC(x1, x2, y, t, pol, tl) { if (!t) return; var tt = hsCouper(t, pol, tl, x2 - x1 - 6); txt(x1 + (x2 - x1 - hsLargeur(tt, pol, tl)) / 2, y, tt, pol, tl); }
  function txtG(x1, x2, y, t, pol, tl) { if (!t) return; txt(x1 + 4, y, hsCouper(t, pol, tl, x2 - x1 - 8), pol, tl); }
  function trait(x1, y1, x2, y2, ep) { ops.push((ep || 0.8) + " w 0 0 0 RG " + x1.toFixed(2) + " " + Y(y1) + " m " + x2.toFixed(2) + " " + Y(y2) + " l S"); }
  function pointilles(x1, x2, y) { ops.push("[0.6 1.6] 0 d 0.5 w 0.45 0.45 0.45 RG " + x1.toFixed(2) + " " + Y(y) + " m " + x2.toFixed(2) + " " + Y(y) + " l S [] 0 d"); }
  function cadre(x, y, w, hh) { ops.push("0.8 w 0 0 0 RG " + x.toFixed(2) + " " + Y(y + hh) + " " + w.toFixed(2) + " " + hh.toFixed(2) + " re S"); }
  var fe = o.fe || {};
  /* titre */
  var tlT = 24; txt((W - hsLargeur(o.titre, "F3", tlT)) / 2, 66, o.titre, "F3", tlT, "0.11 0.16 0.54");
  /* en-tête : deux colonnes, valeurs en gras sur pointillés */
  function champ(x, y, lab, val, xFin, tlab) {
    var t2 = tlab || 10.5; txt(x, y, lab, "F1", t2); var xv = x + hsLargeur(lab, "F1", t2) + 5;
    pointilles(xv, xFin, y + 2); if (val) txt(xv + 2, y - 1, hsCouper(val, "F2", 10.5, xFin - xv - 4), "F2", 10.5);
  }
  champ(52, 112, "Date :", o.date, 285); champ(52, 132, "Discipline :", fe.discipline, 285);
  champ(52, 152, "Chef d’équipe :", fe.chef_nom, 285);
  txt(135, 167, "Lic." + (fe.chef_licence ? " " + fe.chef_licence : ""), "F2", 10.5);
  champ(318, 112, "Lieu :", o.lieu, 548); champ(318, 132, "N° Concours :", fe.numero, 548);
  champ(318, 152, "Prix engagement :", fe.prix, 548);
  champ(318, 167, "Transport oui ou non :", fe.transport, 548, 9); champ(318, 181, "A facturer le :", fe.facturer_le, 470, 9);
  /* grille des engagements */
  var x0 = 40, wT = 515, props = [22, 5, 13, 10, 19, 10, 21], xs = [x0];
  props.forEach(function (p) { xs.push(xs[xs.length - 1] + wT * p / 100); });
  var tri = o.tri || [], n = Math.max(9, tri.length + 1), yT = 200, hT = 24, hL = Math.min(34, (590 - yT - hT) / n);
  var yFin = yT + hT + n * hL;
  cadre(x0, yT, wT, yFin - yT);
  trait(x0, yT + hT, x0 + wT, yT + hT);
  for (var r = 1; r < n; r++) trait(x0, yT + hT + r * hL, x0 + wT, yT + hT + r * hL, 0.6);
  for (var c = 1; c < xs.length - 1; c++) trait(xs[c], yT, xs[c], yFin, 0.6);
  var tete = ["CAVALIERS", "Dû", "Licence", "Ep.", "CHEVAL", "Ep.", "CHEVAL"];
  tete.forEach(function (t, i) { if (i === 4 || i === 6) txtG(xs[i], xs[i + 1], yT + 16, t, "F2", 10); else txtC(xs[i], xs[i + 1], yT + 16, t, "F2", 10); });
  var tlL = hL < 22 ? 8.5 : 9.5;
  /* le nom d'une épreuve rétrécit pour tenir dans sa case (jusqu'à 6,5) avant d'être coupé */
  function taillePour(t, max, t0) { var tt = t0; while (tt > 6.5 && hsLargeur(t, "F2", tt) > max) tt -= 0.5; return tt; }
  tri.forEach(function (l, i) {
    var yy = yT + hT + i * hL + hL / 2 + 3.5;
    txtG(xs[0], xs[1], yy, l.nom, "F2", tlL); txtC(xs[2], xs[3], yy, l.licence, "F2", tlL);
    txtC(xs[3], xs[4], yy, l.epreuve1, "F2", taillePour(l.epreuve1, xs[4] - xs[3] - 6, tlL)); txtG(xs[4], xs[5], yy, l.cheval1_nom, "F2", tlL);
    txtC(xs[5], xs[6], yy, l.epreuve2, "F2", taillePour(l.epreuve2, xs[6] - xs[5] - 6, tlL)); txtG(xs[6], xs[7], yy, l.cheval2_nom, "F2", tlL);
  });
  /* petite case sous la colonne « Dû », comme sur la fiche */
  cadre(xs[1], yFin, xs[2] - xs[1], 14);
  /* tableau du bas, laissé vide (ce n'est pas la coach qui le remplit) */
  var yB = yFin + 40, xa = 300, xb = 420, xc = 490, xd = 555, hB = 15;
  cadre(xb, yB, xd - xb, hB); trait(xc, yB, xc, yB + hB);
  txtC(xb, xc, yB + 11, "Montant", "F1", 9.5); txtC(xc, xd, yB + 11, "Bénéficiaires", "F1", 9.5);
  ["Engagements", "Location chevaux", "Coaching", "Transport"].forEach(function (t, i) {
    var yy = yB + hB * (i + 1); cadre(xa, yy, xd - xa, hB); trait(xb, yy, xb, yy + hB); trait(xc, yy, xc, yy + hB); txt(xa + 4, yy + 11, t, "F1", 9.5);
  });
  var yTot = yB + hB * 5;
  trait(xa, yTot + hB, xb, yTot + hB); cadre(xb, yTot, xd - xb, hB * 2); trait(xc, yTot, xc, yTot + hB * 2); trait(xb, yTot + hB, xd, yTot + hB);
  txt(xb - 8 - hsLargeur("TOTAL", "F1", 9.5), yTot + 11, "TOTAL", "F1", 9.5);
  /* engagements faits le */
  var yF = yTot + hB * 2 + 30; txt(60, yF, "Engagements faits le", "F1", 9.5);
  var xF = 60 + hsLargeur("Engagements faits le", "F1", 9.5) + 6; pointilles(xF, xF + 140, yF + 2);
  if (fe.faits_le) txt(xF + 2, yF - 1, fe.faits_le, "F2", 9.5);
  /* assemblage du fichier */
  var flux = ops.map(hsPdfTexteBrut).join("\n");
  var objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>",
    "<< /Length " + flux.length + " >>\nstream\n" + flux + "\nendstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>"
  ];
  var out = "%PDF-1.4\n%âãÏÓ\n", pos = [];
  objs.forEach(function (ob, i) { pos.push(out.length); out += (i + 1) + " 0 obj\n" + ob + "\nendobj\n"; });
  var xref = out.length;
  out += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
  pos.forEach(function (p) { out += String(p).padStart(10, "0") + " 00000 n \n"; });
  out += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF";
  var octets = new Uint8Array(out.length);
  for (var k = 0; k < out.length; k++) octets[k] = out.charCodeAt(k) & 0xFF;
  return octets;
}
/* les opérations sont déjà en octets 0-255 (texte converti par hsPdfTexte) : rien à faire */
function hsPdfTexteBrut(x) { return x; }


/* ═══════════════════════════════════════════════════════════════════════════════
   04/11/2026 21h — CENTRE DE COMPÉTITION, ÉTAPE 3 (Blandine 21h20 : « mets tout en ligne, t'as carte blanche
   et on refera au fur et à mesure ensemble »). Trois écrans de plus, même design :
     · LISTE DU VAN (écran « liste-van ») : la liste de la cavalière pour ce concours, à cocher, recopiée de
       son dernier concours (cases décochées), téléchargeable en PDF. Table listes_van (elle seule).
     · JOUR J (écran « jour-j », coach) : heures de passage et pistes de chaque couple, décalage groupé d'une
       épreuve (+/- minutes), alerte quand deux passages tombent en même temps sur deux pistes différentes,
       lien des résultats en direct (club_agenda.lien_direct, collé par la coach : la recherche automatique
       viendra plus tard). Colonnes passage1/piste1/passage2/piste2 de concours_engagements.
     · LE DOSSIER (écran « dossier-concours ») : papiers du van (coach seulement, fichiers privés), vaccins des
       chevaux engagés (page Santé, mêmes droits), licences (chacune la sienne, la coach toutes).
   ═══════════════════════════════════════════════════════════════════════════════ */
function hsMinutes(v) {
  var m = String(v || "").trim().toLowerCase().match(/^(\d{1,2})\s*[h:.]\s*(\d{0,2})$/);
  if (!m) return 99999;
  return Number(m[1]) * 60 + Number(m[2] || 0);
}
function hsHeure(min) {
  if (!(min >= 0 && min < 24 * 60)) return "";
  var hh = Math.floor(min / 60), mm = min % 60;
  return hh + "h" + (mm < 10 ? "0" : "") + mm;
}
function hsEstVideo(m) { var s = String(m || ""); return /^mux:/.test(s) || /\.(mp4|mov|m4v|webm|m3u8)(\?|$)/i.test(s); }
function hsUrlVideo(m) { var s = String(m || ""); if (/^mux:/.test(s)) { try { return (typeof hypeMuxLecture === "function") ? hypeMuxLecture(s) : "https://stream.mux.com/" + s.slice(4) + ".m3u8"; } catch (e) { return ""; } } return s; }
function hsVignetteVideo(m) { var s = String(m || ""); if (/^mux:/.test(s)) return "https://image.mux.com/" + s.slice(4) + "/thumbnail.jpg?width=480&fit_mode=preserve"; return ""; }
function hsTemps(t) { t = Math.max(0, Math.round(Number(t) || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); }

/* ════════════════════ VIDÉO DE PARCOURS COMMENTÉE ════════════════════
   04/11 22h15 (carte blanche). La vidéo publiée sur le fil du concours, et des commentaires posés à un instant
   précis (table video_notes) : la coach (ou la cavalière sur sa propre vidéo) met la vidéo en pause et écrit ;
   toucher un commentaire ramène la vidéo à ce moment-là. Lecture : la cavalière, la coach du club, l'auteur. */
function EcranVideoParcours() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var V = null; try { V = window.__videoParcours || null; } catch (e0) { }
  var refV = React.useRef(null);
  var _no = React.useState(null); var notes = _no[0], setNotes = _no[1];
  var _tx = React.useState(""); var texte = _tx[0], setTexte = _tx[1];
  var _t = React.useState(0); var tps = _t[0], setTps = _t[1];
  var _ge = React.useState(false); var peutEcrire = _ge[0], setPeutEcrire = _ge[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  function charger() {
    if (!V) return;
    supa.from("video_notes").select("*").eq("media", V.media).order("t", { ascending: true }).then(function (r) { setNotes((r && !r.error && r.data) || []); });
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      if (!V) return;
      var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
      if (vif) setMoi(u);
      var g = false;
      if (u && V.proprio === u.id) g = true;
      else if (V.agenda) { try { var r = await chargerAgendaEvenement(V.agenda); if (r && r.data) g = await hsPeutGerer(r.data.club_clef); } catch (eG) { } }
      if (vif) setPeutEcrire(g);
      charger();
    })();
    return function () { vif = false; };
  }, []);
  function aller(t) { try { var v = refV.current; v.currentTime = Number(t) || 0; v.play(); } catch (e) { } }
  async function ajouter() {
    var t = String(texte || "").trim(); if (!t || occupe) return;
    setOccupe(true); setMsg("");
    try {
      var r = await supa.from("video_notes").insert({ agenda_id: V.agenda || null, media: V.media, proprio: V.proprio || null, t: Math.round(tps * 10) / 10, texte: t }).select("id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(F("refusé par la base"));
      setTexte(""); charger();
    } catch (eA) { setMsg(F("Pas enregistré : ") + String((eA && eA.message) || eA)); }
    setOccupe(false);
  }
  async function retirer(n) {
    try { var r = await supa.from("video_notes").delete().eq("id", n.id).select("id"); if (r && r.error) throw new Error(r.error.message); charger(); } catch (eR) { setMsg(String((eR && eR.message) || eR)); }
  }
  var retour = h("div", { className: "hs-in", style: { paddingTop: "calc(env(safe-area-inset-top) + 10px)" } },
    h("button", { type: "button", className: "hs-retour", onClick: function () { hsRetour(c.app, c.setEcran, "concours"); } }, h("i", null, "‹"), (V && V.titre) || F("Concours")));
  if (!V) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, retour, h("div", { className: "hs-in" }, h("div", { className: "hs-vide" }, F("Vidéo introuvable."))));
  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, retour,
    h("div", { className: "hs-in" },
      h("div", { className: "hs-titre", style: { marginTop: 4, marginBottom: 14 } }, h("h1", { style: { fontSize: "clamp(32px,9vw,46px)" } }, F("Le parcours")), V.pseudo ? h("p", null, V.pseudo) : null),
      h("video", { ref: refV, src: hsUrlVideo(V.media), poster: hsVignetteVideo(V.media) || undefined, controls: true, playsInline: true, preload: "metadata", onTimeUpdate: function (e) { setTps(e.target.currentTime || 0); }, style: { width: "100%", maxHeight: "62vh", borderRadius: 14, background: "#000", display: "block" } }),
      h("div", { className: "hs-sec" }, h("b", null, F("Les commentaires")), h("span", null, notes ? String(notes.length) : "")),
      notes === null ? h("div", { className: "hs-attente" }, "…") : (notes.length ? h("div", { className: "hs-carte" }, notes.map(function (n) {
        return h("div", { key: n.id, className: "hs-row", style: { alignItems: "flex-start" } },
          h("button", { type: "button", onClick: function () { aller(n.t); }, style: { flex: "0 0 auto", minWidth: 52, minHeight: 32, borderRadius: 999, border: "1px solid rgba(201,166,107,.7)", background: "transparent", color: "#C9A66B", fontSize: 12.5, fontVariantNumeric: "tabular-nums" } }, hsTemps(n.t)),
          h("div", { className: "g" }, h("b", { style: { whiteSpace: "pre-wrap", lineHeight: 1.4 } }, n.texte)),
          (moi && n.auteur === moi.id) ? h("button", { type: "button", "aria-label": F("Retirer"), onClick: function () { retirer(n); }, style: { flex: "0 0 auto", width: 30, height: 30, background: "none", border: "none", color: "rgba(243,238,228,.45)", fontSize: 17, padding: 0 } }, "×") : null);
      })) : h("div", { className: "hs-vide" }, peutEcrire ? F("Mets la vidéo en pause au bon moment et écris ton commentaire.") : F("Pas encore de commentaire de ta coach."))),
      peutEcrire ? h("div", { style: { marginTop: 14 } },
        h("div", { className: "hs-champ" }, h("label", null, F("Commentaire à ") + hsTemps(tps)),
          h("textarea", { value: texte, rows: 3, placeholder: F("ex. Abord trop rapide, reprends le galop avant le virage"), onFocus: function () { try { refV.current.pause(); } catch (e) { } }, onChange: function (e) { setTexte(e.target.value); }, style: { width: "100%", borderRadius: 10, border: "1px solid rgba(243,238,228,.16)", background: "rgba(16,26,29,.6)", color: "#F3EEE4", fontFamily: "inherit", fontSize: 16, padding: "10px 12px", resize: "vertical" } })),
        h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !String(texte).trim(), onClick: ajouter }, occupe ? "…" : F("Ajouter à ") + hsTemps(tps))) : null,
      msg ? h("div", { className: "hs-msg" }, msg) : null,
      h("div", { className: "hs-note" }, F("Touche une heure pour revoir ce moment. Commentaires visibles par la cavalière, sa coach et leur auteur."))));
}

function hsOrdreBase(L) {
  var o = {}; (L || []).forEach(function (l, i) { o[i + "-1"] = hsMinutes(l.passage1); o[i + "-2"] = hsMinutes(l.passage2); }); return o;
}
function hsHeurePropre(v) {
  try { if (typeof hypeHeurePropre === "function") return hypeHeurePropre(v); } catch (e) { }
  return String(v || "").trim();
}
function hsCtx() {
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  return { app: app, setEcran: app.setEcran || function () { }, F: function (fr) { return tr({ fr: fr }); }, rtl: lg === "ar" };
}
function hsRetour(app, setEcran, defaut) { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran(defaut); }
function hsIdConcours() { try { return window.__concoursId || window.__engagementsId || null; } catch (e) { return null; } }

/* ── la liste par défaut, la toute première fois (modifiable ligne par ligne) ── */
/* 04/11 22h45 (Blandine) : + ses ajouts du 04/11 (retouches validées : « Guêtres ou bandes de polo », « Enrênement », « Gants » seul) */
var HS_LISTE_DEFAUT = [
  { r: "cheval", t: "Selle et tapis" }, { r: "cheval", t: "Filet ou bride" }, { r: "cheval", t: "Sangle bavette" },
  { r: "cheval", t: "Guêtres ou bandes de polo, protège-boulets" }, { r: "cheval", t: "Enrênement si le cheval en a" }, { r: "cheval", t: "Amortisseur pour le dos" },
  { r: "cheval", t: "Protections de transport" }, { r: "cheval", t: "Licol et longe" }, { r: "cheval", t: "Couverture" },
  { r: "cheval", t: "Seau, foin et eau" }, { r: "cheval", t: "Nourriture si concours prolongé à l’extérieur" }, { r: "cheval", t: "Trousse de pansage" },
  { r: "cheval", t: "Élastiques pour natter et ciseaux" }, { r: "cheval", t: "Tendonyl ou équivalent post compétition à mettre sur les membres" },
  { r: "cheval", t: "Stable boots pour le repos après compétition" }, { r: "cheval", t: "Livret du cheval (vaccins)" },
  { r: "moi", t: "Casque" }, { r: "moi", t: "Veste de concours" }, { r: "moi", t: "Culotte claire" }, { r: "moi", t: "Bottes" },
  { r: "moi", t: "Gants" }, { r: "moi", t: "Cravache" }, { r: "moi", t: "Éperons" }, { r: "moi", t: "Airbag" },
  { r: "moi", t: "Cartouche de recharge et / ou protection dorsale" }, { r: "moi", t: "Matériel pour changer la cartouche" },
  { r: "moi", t: "Manteau ou veste imperméable" }, { r: "moi", t: "Affaires de rechange en cas de pluie" },
  { r: "moi", t: "Licence sur le téléphone" }, { r: "moi", t: "Eau et goûter" }
];

/* ════════════════════ LISTE DU VAN ════════════════════ */
function EcranListeVan() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _it = React.useState(null); var items = _it[0], setItems = _it[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _st = React.useState(""); var etat = _st[0], setEtat = _st[1];
  var _nv = React.useState({ cheval: "", moi: "" }); var nouv = _nv[0], setNouv = _nv[1];
  var _ch = React.useState(""); var nomCheval = _ch[0], setNomCheval = _ch[1];
  var _mt = React.useState(""); var materiel = _mt[0], setMateriel = _mt[1];
  var _en = React.useState(""); var enrenement = _en[0], setEnrenement = _en[1];
  var _ed = React.useState(false); var edition = _ed[0], setEdition = _ed[1];
  var _ou = React.useState(null); var ouvert = _ou[0], setOuvert = _ou[1];
  var _pc = React.useState(""); var photoCheval = _pc[0], setPhotoCheval = _pc[1];
  var _moi = React.useState(null); var moi = _moi[0], setMoi = _moi[1];
  var minuteur = React.useRef(null);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        if (!u || !u.id) { if (vif) { setMoi(null); setItems([]); } return; }
        if (vif) setMoi(u);
        var r = await chargerAgendaEvenement(idEv); if (vif && r && r.data) setEv(r.data);
        var rl = await supa.from("listes_van").select("items").eq("agenda_id", idEv).eq("user_id", u.id).maybeSingle();
        if (rl && rl.error) throw new Error(rl.error.message || String(rl.error));
        var L = rl && rl.data && Array.isArray(rl.data.items) ? rl.data.items : null;
        if (!L) {
          /* gardée d'un concours à l'autre : on repart de sa dernière liste, cases décochées */
          var rp = await supa.from("listes_van").select("items").eq("user_id", u.id).neq("agenda_id", idEv).order("maj_le", { ascending: false }).limit(1);
          var der = rp && rp.data && rp.data[0] && Array.isArray(rp.data[0].items) ? rp.data[0].items : null;
          L = (der && der.length ? der : HS_LISTE_DEFAUT).filter(function (x) { return x.r !== "propre"; }).map(function (x) { return { r: x.r === "moi" ? "moi" : "cheval", t: String(x.t || ""), f: false }; });   /* le matériel propre au cheval vient de SA fiche, à chaque concours */
        }
        if (vif) setItems(L);
        /* le cheval engagé et ses consignes de matériel (page Santé) */
        try {
          var re = await supa.from("concours_engagements").select("cheval1_id, cheval1_nom").eq("agenda_id", idEv).eq("cavalier_id", u.id).limit(1);
          var e = re && re.data && re.data[0];
          if (e && vif) setNomCheval(e.cheval1_nom || "");
          if (e && e.cheval1_id) {
            var rc = await supa.from("cheval_consignes").select("materiel, enrenement").eq("cheval_id", e.cheval1_id).maybeSingle();
            if (vif && rc && rc.data && rc.data.materiel) setMateriel(rc.data.materiel);
            if (vif && rc && rc.data && rc.data.enrenement) setEnrenement(rc.data.enrenement);
            try { var rph = await supa.from("chevaux").select("photo_url").eq("id", e.cheval1_id).maybeSingle(); if (vif && rph && rph.data && rph.data.photo_url) setPhotoCheval(rph.data.photo_url); } catch (ePh) { }
          }
        } catch (eE) { }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setItems(function (x) { return x || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function sauver(L) {
    setItems(L); setEtat("…");
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(async function () {
      try {
        var r = await supa.from("listes_van").upsert({ user_id: moi.id, agenda_id: idEv, items: L, maj_le: new Date().toISOString() }, { onConflict: "user_id,agenda_id" }).select("agenda_id");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        if (!r || !r.data || !r.data.length) throw new Error(F("refusé par la base"));
        setEtat("✓");
      } catch (eS) { setEtat(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    }, 600);
  }
  function cocher(i) { if (typeof i === "string") { sauver(items.concat([{ r: "propre", t: i, f: true }])); return; } var L = items.slice(); L[i] = Object.assign({}, L[i], { f: !L[i].f }); sauver(L); }
  function retirer(i) { sauver(items.filter(function (x, j) { return j !== i; })); }
  function ajouter(r) { var t = String(nouv[r] || "").trim(); if (!t) return; sauver(items.concat([{ r: r, t: t, f: false }])); var n = Object.assign({}, nouv); n[r] = ""; setNouv(n); }
  function toutDecocher() { sauver(items.map(function (x) { return Object.assign({}, x, { f: false }); })); }

  /* la liste propre au cheval engagé : ses consignes (matériel, enrênement) de sa fiche, en lignes à cocher */
  var propres = [];
  [materiel, enrenement].forEach(function (t) { String(t || "").split(/[\n,;]+/).forEach(function (z) { z = z.trim(); if (z) propres.push(z); }); });
  var lignesPropres = propres.map(function (t) { var i = -1; (items || []).forEach(function (x, j) { if (x.r === "propre" && x.t === t) i = j; }); return { x: i >= 0 ? (items || [])[i] : { t: t, f: false }, i: i, t: t }; });
  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Liste du van"),
    sous: items && items.length ? (function () { var vus = items.filter(function (x) { return x.r !== "propre"; }); var n = vus.filter(function (x) { return x.f; }).length + lignesPropres.filter(function (o) { return o.x.f; }).length; return n + F(" sur ") + (vus.length + lignesPropres.length) + F(" cochés."); })() : "" });
  if (items === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-attente" }, "…")));
  if (!moi) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Connecte-toi pour avoir ta liste."))));

  /* 04/11 22h45 (Blandine : « j’aime bien la troisième ») — LISTE DU VAN AU STYLE DE LA VIDÉOTHÈQUE : une carte par partie (photo à gauche,
     titre, étiquette dorée, barre de progression), une seule dépliée à la fois ; les × et « Ajouter une ligne » seulement en mode « Modifier ». */
  function croix(x, i) { return edition ? h("button", { type: "button", "aria-label": F("Retirer ") + x.t, onClick: function () { retirer(i); }, style: { flex: "0 0 auto", width: 26, height: 26, background: "none", border: "none", color: "rgba(243,238,228,.45)", fontSize: 16, padding: 0 } }, "×") : null; }
  function ajoutLigne(r) {
    return edition ? h("div", { style: { padding: "8px 10px" } }, h("div", { className: "hs-ajout", style: { width: "100%" } },
      h("input", { type: "text", value: nouv[r], placeholder: F("Ajouter une ligne"), onChange: function (e) { var n = Object.assign({}, nouv); n[r] = e.target.value; setNouv(n); }, onKeyDown: function (e) { if (e.key === "Enter") { e.preventDefault(); ajouter(r); } } }),
      h("button", { type: "button", className: "hs-btn", onClick: function () { ajouter(r); } }, "+"))) : null;
  }
  var PH = { propre: photoCheval || "images/concours-hero-bai-tresse.webp", cheval: "images/cours-g1-c17-seller.webp", moi: "images/securite-g1-tenue.webp" };
  var POS = { propre: "60% 30%", cheval: "60% 40%", moi: "40% 30%" };
  function rondCoche(x, i) {
    return h("button", { type: "button", "aria-pressed": x.f ? "true" : "false", onClick: function () { cocher(i); }, style: { flex: "0 0 auto", width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (x.f ? "#C9A66B" : "rgba(201,166,107,.6)"), background: x.f ? "#C9A66B" : "transparent", color: "#070A08", fontSize: 12, padding: 0, lineHeight: 1 } }, x.f ? "✓" : "");
  }
  function ligneFine(o, k) {
    var x = o.x; return h("div", { key: o.i, style: { display: "flex", alignItems: "center", gap: 12, padding: "7px 2px", minHeight: 40, borderTop: k ? "1px solid rgba(243,238,228,.07)" : "0" } },
      rondCoche(x, o.i), h("button", { type: "button", onClick: function () { cocher(o.i); }, style: { flex: 1, minWidth: 0, textAlign: "start", background: "none", border: "none", padding: 0, fontSize: 13, lineHeight: 1.35, color: x.f ? "rgba(243,238,228,.45)" : "#F3EEE4", textDecoration: x.f ? "line-through" : "none" } }, x.t), (typeof o.i === "number" && x.r !== "propre") ? croix(x, o.i) : null);   /* le matériel du cheval se change sur SA fiche */
  }
  function groupes() {
    var G = [];
    if (lignesPropres.length) G.push({ r: "propre", t: F("Son matériel à lui"), s: nomCheval || F("ton cheval"), L: lignesPropres.map(function (o) { return { x: o.x, i: o.i >= 0 ? o.i : o.t }; }) });
    G.push({ r: "cheval", t: F("Pour le cheval"), s: nomCheval || "", L: items.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.r === "cheval"; }) });
    G.push({ r: "moi", t: F("Pour toi"), s: F("ta tenue, ta sécurité"), L: items.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.r === "moi"; }) });
    G.forEach(function (g) { g.n = g.L.filter(function (o) { return o.x.f; }).length; });
    return G;
  }
  function vueHype() {
    /* style de la Vidéothèque : pastilles dorées « Toutes (9) », titres au trait doré, cartes photo à gauche + barre de progression */
    var G = groupes(), tot = 0, fait = 0; G.forEach(function (g) { tot += g.L.length; fait += g.n; });
    var CG = "'Cormorant Garamond',Georgia,serif";
    var titreSec = function (t, droite) { return h("div", { className: "hs-sec" }, h("b", null, t), droite ? h("span", null, droite) : null); };
    var modif = h("button", { type: "button", onClick: function () { setEdition(!edition); }, style: { background: "none", border: "none", color: "#C9A66B", fontSize: 12, padding: "6px 0" } }, edition ? F("Terminé") : F("Modifier"));
    var barre = function (n, t) { return h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 10 } },
      h("div", { style: { flex: 1, height: 2, background: "rgba(243,238,228,.12)", borderRadius: 2 } }, h("div", { style: { height: 2, width: (t ? Math.round(n / t * 100) : 0) + "%", background: "#C9A66B", borderRadius: 2 } })),
      h("span", { style: { fontSize: 11.5, color: n === t && t ? "#C9A66B" : "rgba(243,238,228,.7)" } }, n === t && t ? "✓ " + F("Prêt") : n + " / " + t)); };
    var tag = function (t) { return h("span", { style: { display: "inline-block", border: "1px solid rgba(201,166,107,.7)", color: "#C9A66B", borderRadius: 999, padding: "2px 10px", fontSize: 11 } }, t); };
    /* P3 : cartes comme les vidéos (photo à gauche, titre, étiquette, barre), qui se déplient */
    var ouv = ouvert || (G.filter(function (g) { return g.n < g.L.length; })[0] || G[0]).r;
    return h("div", null, titreSec(F("Ta liste"), fait + " / " + tot), G.map(function (g) {
      var on = g.r === ouv;
      return h("div", { key: g.r, style: { marginTop: 10, border: "1px solid " + (on ? "rgba(201,166,107,.45)" : "rgba(243,238,228,.1)"), borderRadius: 14, overflow: "hidden", background: "linear-gradient(135deg,#0d1416,#070A08 70%)" } },
        h("button", { type: "button", onClick: function () { setOuvert(on ? "aucun" : g.r); }, style: { display: "flex", width: "100%", padding: 0, border: "none", background: "none", textAlign: "start", color: "#F3EEE4" } },
          h("div", { style: { position: "relative", flex: "0 0 38%", minHeight: 108 } }, h("img", { src: PH[g.r], alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: POS[g.r] } }), h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 55%,#0b1112)" } })),
          h("div", { style: { flex: 1, minWidth: 0, padding: "12px 14px" } },
            h("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 } }, h("span", { style: { fontFamily: CG, fontSize: 21, lineHeight: 1.1 } }, g.t), h("span", { style: { color: "#C9A66B", fontSize: 14 } }, on ? "⌃" : "⌄")),
            h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,.6)", marginTop: 3 } }, g.s),
            h("div", { style: { marginTop: 7 } }, tag(g.r === "propre" ? F("de sa fiche") : (g.L.length + " " + F("objets")))),
            barre(g.n, g.L.length))),
        on ? h("div", { style: { padding: "2px 14px 10px", borderTop: "1px solid rgba(243,238,228,.07)" } }, g.L.map(ligneFine), g.r !== "propre" ? ajoutLigne(g.r) : null) : null);
    }), h("div", { style: { display: "flex", justifyContent: "flex-end" } }, modif));
  }
  function pdf() {
    var lignes = [];
    if (lignesPropres.length) { lignes.push({ titre: F("Son matériel à lui") + (nomCheval ? " · " + nomCheval : "") }); lignesPropres.forEach(function (o) { lignes.push({ t: o.t, f: !!o.x.f }); }); }
    [["cheval", F("Pour ") + (nomCheval || F("le cheval"))], ["moi", F("Pour moi")]].forEach(function (g) {
      lignes.push({ titre: g[1] });
      items.forEach(function (x) { if (x.r === g[0]) lignes.push({ t: x.t, f: x.f }); });
    });
    hsPartagerPdf(hsPdfListe(F("Liste du van") + " · " + ((ev && ev.titre) || ""), ev ? hsPlage(ev) : "", lignes), "liste-du-van-" + String((ev && ev.titre) || "concours"));
  }
  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      vueHype(),
      h("div", { className: "hs-duo", style: { marginTop: 18 } },
        h("button", { type: "button", className: "hs-btn plein", onClick: pdf }, F("Télécharger")),
        h("button", { type: "button", className: "hs-btn doux", onClick: toutDecocher }, F("Tout décocher"))),
      h("div", { className: "hs-note" }, F("Ta liste n’est visible que par toi. Au prochain concours, elle repart de celle-ci, cases décochées.")),
      etat && etat !== "✓" && etat !== "…" ? h("div", { className: "hs-msg" }, etat) : null,
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ JOUR J (coach) ════════════════════ */
function EcranJourJ() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _li = React.useState(null); var lignes = _li[0], setLignes = _li[1];
  var _ge = React.useState(null); var gestion = _ge[0], setGestion = _ge[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _mod = React.useState({}); var modif = _mod[0], setModif = _mod[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _dc = React.useState({ ep: "", min: "10" }); var dec = _dc[0], setDec = _dc[1];
  var _ld = React.useState(""); var lien = _ld[0], setLien = _ld[1];
  var _cd = React.useState(null); var cands = _cd[0], setCands = _cd[1];
  var _pv = React.useState(true); var prevenir = _pv[0], setPrevenir = _pv[1];
  var _bs = React.useState({}); var base = _bs[0], setBase = _bs[1];   /* ordre d'affichage figé pendant la saisie */
  var _dl = React.useState(null); var direct = _dl[0], setDirect = _dl[1];
  var _db = React.useState(""); var dirOcc = _db[0], setDirOcc = _db[1];

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        if (vif) { setEv(r.data); setLien(r.data.lien_direct || ""); }
        var g = await hsPeutGerer(r.data.club_clef); if (vif) setGestion(g);
        if (!g) return;
        var rl = await supa.from("concours_engagements").select("*").eq("agenda_id", idEv).order("ordre", { ascending: true });
        if (rl && rl.error) throw new Error(rl.error.message || String(rl.error));
        if (vif) { setLignes(rl.data || []); setBase(hsOrdreBase(rl.data || [])); }
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setLignes(function (l) { return l || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  function poser(i, k, v) { var n = lignes.slice(); n[i] = Object.assign({}, n[i]); n[i][k] = v; setLignes(n); var m = Object.assign({}, modif); m[n[i].id] = true; setModif(m); setMsg(""); }
  /* toutes les passes de la journée, dans l'ordre de l'heure */
  var passes = [];
  (lignes || []).forEach(function (l, i) {
    if (l.epreuve1 || l.cheval1_nom) passes.push({ i: i, n: 1, nom: l.nom, ep: l.epreuve1, ch: l.cheval1_nom, hp: l.passage1, pi: l.piste1 });
    if (l.epreuve2 || l.cheval2_nom) passes.push({ i: i, n: 2, nom: l.nom, ep: l.epreuve2, ch: l.cheval2_nom, hp: l.passage2, pi: l.piste2 });
  });
  passes.sort(function (a, b) { var ka = base[a.i + "-" + a.n], kb = base[b.i + "-" + b.n]; return (ka == null ? 99999 : ka) - (kb == null ? 99999 : kb) || a.i - b.i; });
  /* alerte : deux passages à moins de 10 minutes sur deux pistes différentes (la coach ne peut pas être aux deux) */
  var conflits = {};
  for (var a = 0; a < passes.length; a++) for (var b = a + 1; b < passes.length; b++) {
    var pa = passes[a], pb = passes[b], ma = hsMinutes(pa.hp), mb = hsMinutes(pb.hp);
    if (ma > 9999 || mb > 9999) continue;
    if (Math.abs(ma - mb) < 10 && String(pa.pi || "").trim().toLowerCase() !== String(pb.pi || "").trim().toLowerCase()) {
      conflits[pa.i + "-" + pa.n] = pb.nom; conflits[pb.i + "-" + pb.n] = pa.nom;
    }
  }
  var nbConflits = Object.keys(conflits).length;
  var epreuves = []; passes.forEach(function (p) { if (p.ep && epreuves.indexOf(p.ep) === -1) epreuves.push(p.ep); });

  function decaler() {
    var d = parseInt(dec.min, 10); if (!dec.ep || !d) { setMsg(F("Choisis une épreuve et un nombre de minutes.")); return; }
    var n = lignes.slice(), m = Object.assign({}, modif), nb = 0;
    n.forEach(function (l, i) {
      [1, 2].forEach(function (k) {
        if (l["epreuve" + k] !== dec.ep) return;
        var mi = hsMinutes(l["passage" + k]); if (mi > 9999) return;
        n[i] = Object.assign({}, n[i]); n[i]["passage" + k] = hsHeure(mi + d); m[l.id] = true; nb++;
      });
    });
    setLignes(n); setModif(m);
    setMsg(nb ? (nb + F(" passage(s) décalé(s) de ") + (d > 0 ? "+" : "") + d + F(" min. Pense à enregistrer.")) : F("Aucune heure à décaler dans cette épreuve."));
  }
  async function enregistrer() {
    if (occupe) return; setOccupe(true); setMsg("");
    try {
      var ids = Object.keys(modif), maint = new Date().toISOString();
      for (var k = 0; k < ids.length; k++) {
        var l = lignes.filter(function (x) { return x.id === ids[k]; })[0]; if (!l) continue;
        var row = { passage1: hsHeurePropre(l.passage1) || null, piste1: String(l.piste1 || "").trim() || null, passage2: hsHeurePropre(l.passage2) || null, piste2: String(l.piste2 || "").trim() || null, passage_maj_le: maint };
        var r = await supa.from("concours_engagements").update(row).eq("id", l.id).select("id");
        if (r && r.error) throw new Error(l.nom + " : " + (r.error.message || r.error));
        if (!r || !r.data || !r.data.length) throw new Error(l.nom + F(" : refusé par la base"));
      }
      if (ev && String(lien || "").trim() !== String(ev.lien_direct || "")) {
        var t = String(lien || "").trim();
        if (t && !/^https?:\/\//i.test(t)) throw new Error(F("le lien du direct doit commencer par https://"));
        var rd = await supa.from("club_agenda").update({ lien_direct: t || null }).eq("id", ev.id).select("id");
        if (rd && rd.error) throw new Error(F("lien du direct : ") + (rd.error.message || rd.error));
        if (!rd || !rd.data || !rd.data.length) throw new Error(F("lien du direct : refusé par la base"));
        setEv(Object.assign({}, ev, { lien_direct: t || null }));
      }
      setModif({}); setBase(hsOrdreBase(lignes));
      /* 04/11 22h : prévenir chaque cavalière concernée sur son téléphone (fonction serveur notifier-passage) */
      var faitMsg = F("✓ Enregistré. Les cavalières voient leur nouvelle heure sur la fiche du concours.");
      if (prevenir && ids.length) {
        try {
          var rn = await supa.functions.invoke("notifier-passage", { body: { agenda_id: idEv, engagements: ids } });
          var dn = rn && rn.data;
          if (rn && rn.error) faitMsg += " " + F("Notification impossible : ") + (rn.error.message || rn.error);
          else if (dn && dn.ok) faitMsg += " " + (dn.envois ? F("Notification envoyée") + " (" + dn.envois + ")." : "") + (dn.sans_alertes ? " " + dn.sans_alertes + F(" cavalière(s) sans alertes activées.") : "");
        } catch (eN) { faitMsg += " " + F("Notification impossible."); }
      }
      setMsg(faitMsg);
    } catch (eS) { setMsg(F("Pas enregistré : ") + String((eS && eS.message) || eS)); }
    setOccupe(false);
  }

  /* 04/11 22h — le direct trouvé par Hype (fonction serveur direct-concours, sites Winjump) */
  async function chercherDirect() {
    setDirOcc("chercher"); setCands(null); setMsg("");
    try {
      var r = await supa.functions.invoke("direct-concours", { body: { action: "chercher", agenda_id: idEv } });
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      setCands((r.data && r.data.candidats) || []);
    } catch (eC) { setMsg(F("Recherche impossible : ") + String((eC && eC.message) || eC)); }
    setDirOcc("");
  }
  async function confirmerDirect(url) {
    setDirOcc("confirmer"); setMsg("");
    try {
      var rd = await supa.from("club_agenda").update({ lien_direct: url }).eq("id", ev.id).select("id");
      if (rd && rd.error) throw new Error(rd.error.message || String(rd.error));
      if (!rd || !rd.data || !rd.data.length) throw new Error(F("refusé par la base"));
      setEv(Object.assign({}, ev, { lien_direct: url })); setLien(url); setCands(null);
      setDirOcc(""); lireDirect(true);
      return;
    } catch (eF) { setMsg(F("Pas enregistré : ") + String((eF && eF.message) || eF)); }
    setDirOcc("");
  }
  async function lireDirect(forcer) {
    setDirOcc("lire"); setMsg("");
    try {
      var r = await supa.functions.invoke("direct-concours", { body: { action: "lire", agenda_id: idEv, forcer: !!forcer } });
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (r.data && r.data.erreur) throw new Error(r.data.erreur);
      setDirect(r.data || { lignes: [] });
    } catch (eL) { setMsg(F("Lecture du direct impossible : ") + String((eL && eL.message) || eL)); }
    setDirOcc("");
  }
  function prendreHeures() {
    if (!direct || !direct.lignes) return;
    var n = lignes.slice(), m = Object.assign({}, modif), nb = 0;
    function proche(a, b) { a = String(a || "").toLowerCase(); b = String(b || "").toLowerCase(); return !!a && !!b && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0); }
    direct.lignes.forEach(function (d) {
      if (!d.heure_estimee) return;
      var i = -1; n.forEach(function (l, j) { if (l.id === d.engagement) i = j; }); if (i < 0) return;
      var l = Object.assign({}, n[i]);
      var k = proche(l.epreuve2, d.epreuve) ? 2 : (proche(l.epreuve1, d.epreuve) || !l.passage1 ? 1 : 2);
      l["passage" + k] = d.heure_estimee; n[i] = l; m[l.id] = true; nb++;
    });
    setLignes(n); setModif(m);
    setMsg(nb ? (nb + F(" heure(s) estimée(s) reprise(s). Vérifie, puis enregistre.")) : F("Aucune heure à reprendre."));
  }
  var estWinjump = /^https:\/\/[a-z0-9-]+\.winjump\.fr\/concours\//i.test(String((ev && ev.lien_direct) || ""));

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Jour J"), sous: ev ? [hsPlage(ev), ev.lieu].filter(Boolean).join(" · ") : "" });
  if (gestion === false) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, h("div", { className: "hs-vide", style: { marginTop: 22 } }, F("Cette page est réservée à la coach du club."))));
  if (lignes === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, erreur) : h("div", { className: "hs-attente" }, "…")));
  var aModif = Object.keys(modif).length > 0 || (ev && String(lien || "").trim() !== String(ev.lien_direct || ""));

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      nbConflits ? h("div", { className: "hs-carte", style: { borderColor: "rgba(201,166,107,.7)", padding: "12px 14px", marginTop: 18, fontSize: 13, lineHeight: 1.5 } },
        h("b", { style: { color: "#C9A66B" } }, F("Attention : ")), F("deux cavalières passent en même temps sur deux pistes différentes. Regarde les lignes marquées.")) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Les passages"))),
      !passes.length ? h("div", { className: "hs-vide" }, F("Aucun couple engagé. Commence par la page Engagements.")) :
      h("div", { className: "hs-carte" }, passes.map(function (p) {
        var cle = p.i + "-" + p.n, conf = conflits[cle];
        return h("div", { key: cle, className: "hs-couple", style: conf ? { background: "rgba(201,166,107,.08)" } : null },
          h("div", { className: "hs-couple-t", style: { marginBottom: 6 } }, h("b", { style: { fontSize: 17 } }, p.nom), h("span", { style: { fontSize: 11.5, color: "rgba(243,238,228,.64)" } }, [p.ep, p.ch].filter(Boolean).join(" · "))),
          conf ? h("div", { style: { fontSize: 11.5, color: "#C9A66B", marginBottom: 6 } }, F("En même temps que ") + conf + F(", sur une autre piste")) : null,
          h("div", { className: "hs-g2" },
            h("div", { className: "hs-champ" }, h("label", null, F("Heure de passage")), h("input", { type: "text", inputMode: "numeric", value: p.hp || "", placeholder: "11h40", onChange: function (e) { poser(p.i, "passage" + p.n, e.target.value); } })),
            h("div", { className: "hs-champ" }, h("label", null, F("Piste")), h("input", { type: "text", value: p.pi || "", placeholder: F("ex. 1, Bleue"), onChange: function (e) { poser(p.i, "piste" + p.n, e.target.value); } }))));
      })),
      epreuves.length ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Décaler une épreuve"))),
        h("div", { className: "hs-note", style: { marginTop: -4, marginBottom: 10 } }, F("Le concours a du retard ou de l’avance : décale d’un coup toutes les heures d’une épreuve.")),
        h("div", { className: "hs-ep" },
          h("select", { value: dec.ep, onChange: function (e) { setDec(Object.assign({}, dec, { ep: e.target.value })); } }, h("option", { value: "" }, F("Épreuve…")), epreuves.map(function (x) { return h("option", { key: x, value: x }, x); })),
          h("select", { value: dec.min, onChange: function (e) { setDec(Object.assign({}, dec, { min: e.target.value })); } }, ["-30", "-15", "-10", "-5", "5", "10", "15", "20", "30", "45", "60"].map(function (x) { return h("option", { key: x, value: x }, (Number(x) > 0 ? "+" : "") + x + " min"); }))),
        h("button", { type: "button", className: "hs-btn", onClick: decaler }, F("Décaler"))) : null,
      h("div", { className: "hs-sec" }, h("b", null, F("Résultats en direct"))),
      h("button", { type: "button", className: "hs-btn", disabled: !!dirOcc, onClick: chercherDirect }, dirOcc === "chercher" ? F("Recherche sur Winjump…") : F("Trouver le direct sur Winjump")),
      cands ? (cands.length ? h("div", { className: "hs-carte", style: { marginTop: 10 } },
        h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Concours Winjump à la même date. Lequel est le tien ?")))),
        cands.map(function (k) {
          return h("div", { key: k.url, className: "hs-row" },
            h("div", { className: "g" }, h("b", null, k.nom), h("span", null, hsFmt(k.debut, { day: "numeric", month: "short" }) + (k.fin && k.fin !== k.debut ? " → " + hsFmt(k.fin, { day: "numeric", month: "short" }) : "") + " · " + k.site + ".winjump.fr")),
            h("button", { type: "button", className: "hs-lien", disabled: !!dirOcc, onClick: function () { confirmerDirect(k.url); } }, F("C’est lui")));
        })) : h("div", { className: "hs-vide", style: { marginTop: 10 } }, F("Aucun concours Winjump à cette date. Il est peut-être chronométré par un autre site : colle son lien ci-dessous."))) : null,
      estWinjump ? h("div", { style: { marginTop: 10 } },
        h("button", { type: "button", className: "hs-btn plein", disabled: !!dirOcc, onClick: function () { lireDirect(true); } }, dirOcc === "lire" ? F("Lecture du direct…") : F("Lire les départs et les résultats")),
        direct ? (direct.lignes && direct.lignes.length ? h("div", null,
          h("div", { className: "hs-carte", style: { marginTop: 10 } }, direct.lignes.map(function (d, i) {
            var res = d.clt ? (d.clt + (d.clt === "1" ? "re" : "e") + (d.points !== "" ? " · " + d.points + " pt" : "") + (d.temps ? " · " + d.temps + " s" : "")) : "";
            return h("div", { key: i, className: "hs-row" },
              h("div", { className: "g" }, h("b", null, d.nom + " · " + d.epreuve),
                h("span", null, [d.cheval, F("n° ") + d.ordre + F(" sur ") + d.engages, d.heure_estimee ? F("vers ") + d.heure_estimee : ""].filter(Boolean).join(" · "))),
              h("span", { className: "d", style: { fontSize: 13 } }, res || F("à venir")));
          })),
          h("button", { type: "button", className: "hs-btn", style: { marginTop: 10 }, onClick: prendreHeures }, F("Reprendre ces heures dans les passages")),
          h("div", { className: "hs-note" }, F("Heures estimées par Hype : début de l’épreuve + environ 1 min 45 par couple avant le sien. Les résultats sont ceux du chronométreur, encore provisoires pendant le concours."))) :
          h("div", { className: "hs-vide", style: { marginTop: 10 } }, F("Aucune de tes cavalières trouvée dans les listes de départ pour l’instant (les listes sont souvent publiées la veille)."))) : null) : null,
      h("div", { className: "hs-champ", style: { marginTop: 14 } }, h("label", null, F("Lien du direct (chronométreur)")), h("input", { type: "url", value: lien, placeholder: "https://…", onChange: function (e) { setLien(e.target.value); setMsg(""); } })),
      h("div", { className: "hs-note", style: { marginTop: -4 } }, F("Colle ici la page des résultats en direct : les cavalières auront un bouton « Résultats en direct » sur la fiche du concours.")),
      h("div", { className: "hs-coll" },
        msg ? h("div", { className: "hs-msg", style: { marginTop: 0, marginBottom: 8 } }, msg) : null,
        h("label", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "rgba(243,238,228,.8)", marginBottom: 10 } },
          h("input", { type: "checkbox", checked: prevenir, onChange: function (e) { setPrevenir(e.target.checked); }, style: { width: 20, minHeight: 20, height: 20, accentColor: "#C9A66B" } }),
          F("Prévenir les cavalières sur leur téléphone")),
        h("button", { type: "button", className: "hs-btn plein", disabled: occupe || !aModif, onClick: enregistrer }, occupe ? F("Enregistrement…") : (aModif ? F("Enregistrer") : F("✓ Enregistré")))),
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ════════════════════ LE DOSSIER ════════════════════ */
function EcranDossierConcours() {
  var h = React.createElement, c = hsCtx(), F = c.F, rtl = c.rtl;
  var idEv = hsIdConcours();
  var _ev = React.useState(null); var ev = _ev[0], setEv = _ev[1];
  var _ge = React.useState(false); var gestion = _ge[0], setGestion = _ge[1];
  var _vd = React.useState([]); var van = _vd[0], setVan = _vd[1];
  var _cv = React.useState(null); var chevaux = _cv[0], setChevaux = _cv[1];
  var _lc = React.useState([]); var licences = _lc[0], setLicences = _lc[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _msg = React.useState(""); var msg = _msg[0], setMsg = _msg[1];
  var _bz = React.useState(false); var occupe = _bz[0], setOccupe = _bz[1];
  var _nd = React.useState({ nom: "", valable: "" }); var nd = _nd[0], setNd = _nd[1];
  var refFic = React.useRef(null);

  React.useEffect(function () { injecterCss2(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
  function chargerVan(clef) {
    supa.from("dossier_van").select("*").eq("club_clef", clef).order("ajoute_le", { ascending: false }).then(function (r) { if (r && !r.error) setVan(r.data || []); });
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!idEv) throw new Error(F("concours introuvable"));
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { }
        var r = await chargerAgendaEvenement(idEv);
        if (!r || !r.data) throw new Error(F("ce concours n’existe plus"));
        var E = r.data; if (vif) setEv(E);
        var g = await hsPeutGerer(E.club_clef); if (vif) setGestion(g);
        if (g) chargerVan(E.club_clef);
        /* engagements lisibles : tous pour la coach, sa seule ligne pour une cavalière (droits de la base) */
        var re = await supa.from("concours_engagements").select("nom, licence, cavalier_id, cheval1_id, cheval1_nom, cheval2_id, cheval2_nom").eq("agenda_id", idEv);
        var L = (re && !re.error && re.data) || [];
        if (vif) setLicences(L.map(function (l) { return { nom: l.nom, licence: l.licence, moi: !!(u && l.cavalier_id === u.id) }; }));
        var ch = {};
        L.forEach(function (l) { if (l.cheval1_id) ch[l.cheval1_id] = l.cheval1_nom; if (l.cheval2_id) ch[l.cheval2_id] = l.cheval2_nom; });
        var ids = Object.keys(ch), res = [];
        if (ids.length) {
          var rs = await supa.from("soins_cheval").select("cheval_id, titre, date_intervention, date_prochaine").eq("type", "vaccin").in("cheval_id", ids).order("date_intervention", { ascending: false });
          var der = {}; ((rs && !rs.error && rs.data) || []).forEach(function (s) { if (!der[s.cheval_id]) der[s.cheval_id] = s; });
          ids.forEach(function (id) { res.push({ id: id, nom: ch[id], vaccin: der[id] || null, lisible: !!(rs && !rs.error) }); });
        }
        if (vif) setChevaux(res);
      } catch (eL) { if (vif) { setErreur(String((eL && eL.message) || eL)); setChevaux(function (x) { return x || []; }); } }
    })();
    return function () { vif = false; };
  }, [idEv]);

  async function deposer(e) {
    var f = e && e.target && e.target.files && e.target.files[0];
    if (!f || !ev) return;
    var nom = String(nd.nom || "").trim() || f.name;
    setOccupe(true); setMsg("");
    try {
      var u = await utilisateurActuel();
      var ext = (String(f.name).match(/\.[a-z0-9]{1,5}$/i) || [""])[0].toLowerCase();
      var chemin = "van/" + u.id + "/" + Date.now() + ext;
      var up = await supa.storage.from("dossier").upload(chemin, f, { contentType: f.type || "application/octet-stream", upsert: false });
      if (up && up.error) throw new Error(up.error.message || String(up.error));
      var ri = await supa.from("dossier_van").insert({ club_clef: ev.club_clef, nom: nom, chemin: chemin, valable_jusqu: nd.valable || null }).select("id");
      if (ri && ri.error) { try { await supa.storage.from("dossier").remove([chemin]); } catch (eR) { } throw new Error(ri.error.message || String(ri.error)); }
      setNd({ nom: "", valable: "" }); setMsg(F("✓ Document ajouté.")); chargerVan(ev.club_clef);
    } catch (eD) { setMsg(F("Pas ajouté : ") + String((eD && eD.message) || eD)); }
    setOccupe(false);
    try { e.target.value = ""; } catch (eV) { }
  }
  async function ouvrirDoc(d) {
    try {
      var r = await supa.storage.from("dossier").createSignedUrl(d.chemin, 300);
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      window.open(r.data.signedUrl, "_blank");
    } catch (eO) { setMsg(F("Impossible d’ouvrir : ") + String((eO && eO.message) || eO)); }
  }
  async function retirerDoc(d) {
    try {
      var r = await supa.from("dossier_van").delete().eq("id", d.id).select("id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      try { await supa.storage.from("dossier").remove([d.chemin]); } catch (eR) { }
      chargerVan(ev.club_clef);
    } catch (eX) { setMsg(F("Pas retiré : ") + String((eX && eX.message) || eX)); }
  }
  function ouvrirSante(ch) { try { window.__santeCheval = { id: ch.id, nom: ch.nom || "" }; } catch (e) { } c.setEcran("sante-cheval"); }
  function etatVaccin(v) {
    if (!v) return { t: F("aucun vaccin noté"), s: F("À vérifier"), alerte: true };
    var p = v.date_prochaine ? hsDateLoc(v.date_prochaine) : null;
    var dateC = ev ? hsDateLoc(ev.date_jour) : null;
    if (p && dateC && p < dateC) return { t: F("rappel à faire avant le ") + hsFmt(v.date_prochaine, { day: "numeric", month: "long" }), s: F("À refaire"), alerte: true };
    return { t: F("dernier vaccin le ") + hsFmt(v.date_intervention, { day: "numeric", month: "long", year: "numeric" }), s: "✓", alerte: false };
  }

  var hero = hsHero(h, { photo: hsPhotoDe(idEv), retour: function () { hsRetour(c.app, c.setEcran, "concours"); }, retourTxt: (ev && ev.titre) || F("Concours"), titre: F("Le dossier"), sous: F("Ce qu’on peut te demander sur place.") });
  if (chevaux === null) return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero, h("div", { className: "hs-in" }, erreur ? h("div", { className: "hs-vide", style: { marginTop: 22 } }, erreur) : h("div", { className: "hs-attente" }, "…")));
  var aujISO = new Date().toISOString().slice(0, 10);

  return h("div", { className: "hs", dir: rtl ? "rtl" : "ltr" }, hero,
    h("div", { className: "hs-in" },
      /* van : coach seulement */
      gestion ? h("div", null,
        h("div", { className: "hs-sec" }, h("b", null, F("Le van")), h("span", null, "🔒 " + F("toi seule"))),
        h("div", { className: "hs-carte" },
          van.length ? van.map(function (d) {
            var perime = d.valable_jusqu && String(d.valable_jusqu) < aujISO;
            return h("div", { key: d.id, className: "hs-row" },
              h("div", { className: "g" }, h("b", null, d.nom), h("span", { style: perime ? { color: "#C9A66B" } : null }, d.valable_jusqu ? ((perime ? F("expiré depuis le ") : F("valable jusqu’au ")) + hsFmt(d.valable_jusqu, { day: "numeric", month: "long", year: "numeric" })) : F("ajouté le ") + hsFmt(String(d.ajoute_le).slice(0, 10), { day: "numeric", month: "long" }))),
              h("button", { type: "button", className: "hs-lien", onClick: function () { ouvrirDoc(d); } }, F("Ouvrir")),
              h("button", { type: "button", className: "hs-lien", style: { color: "rgba(243,238,228,.45)" }, onClick: function () { retirerDoc(d); } }, "×"));
          }) : h("div", { className: "hs-row" }, h("div", { className: "g" }, h("span", null, F("Aucun papier pour l’instant (carte grise, assurance, contrôle technique…)."))))),
        h("div", { className: "hs-g2", style: { marginTop: 12 } },
          h("div", { className: "hs-champ" }, h("label", null, F("Nom du papier")), h("input", { type: "text", value: nd.nom, placeholder: F("Carte grise"), onChange: function (e) { setNd(Object.assign({}, nd, { nom: e.target.value })); } })),
          h("div", { className: "hs-champ" }, h("label", null, F("Valable jusqu’au")), h("input", { type: "date", value: nd.valable, onChange: function (e) { setNd(Object.assign({}, nd, { valable: e.target.value })); } }))),
        h("input", { ref: refFic, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: deposer }),
        h("button", { type: "button", className: "hs-btn", disabled: occupe, onClick: function () { try { refFic.current.click(); } catch (e) { } } }, occupe ? F("Envoi…") : F("+ Ajouter un papier (photo ou PDF)")),
        msg ? h("div", { className: "hs-msg" }, msg) : null) : null,
      /* chevaux */
      h("div", { className: "hs-sec" }, h("b", null, F("Les chevaux")), h("span", null, "🔒 " + (gestion ? F("toi et les propriétaires") : F("comme la page Santé")))),
      chevaux.length ? h("div", { className: "hs-carte" }, chevaux.map(function (ch) {
        var e = etatVaccin(ch.vaccin);
        return h("button", { type: "button", key: ch.id, className: "hs-row", style: { width: "100%", background: "none", border: "none", textAlign: "start" }, onClick: function () { ouvrirSante(ch); } },
          h("div", { className: "g" }, h("b", null, ch.nom || F("Cheval")), h("span", null, e.t)),
          h("span", { className: "d", style: { fontSize: 12.5, color: e.alerte ? "#C9A66B" : "#F3EEE4" } }, e.s));
      })) : h("div", { className: "hs-vide" }, F("Les chevaux apparaîtront quand les couples seront choisis (page Engagements).")),
      h("div", { className: "hs-note" }, F("Touche un cheval pour ouvrir sa page Santé : livret, vaccins et documents.")),
      /* licences */
      h("div", { className: "hs-sec" }, h("b", null, F("Les licences")), h("span", null, "🔒 " + F("chacune la sienne"))),
      licences.length ? h("div", { className: "hs-carte" }, licences.map(function (l, i) {
        return h("div", { key: i, className: "hs-row" },
          h("div", { className: "g" }, h("b", null, l.nom), h("span", null, l.licence ? F("licence ") + l.licence : F("pas encore ajoutée"))),
          h("span", { className: "d", style: { fontSize: 12.5, color: l.licence ? "#F3EEE4" : "#C9A66B" } }, l.licence ? "✓" : F("Manquante")));
      })) : h("div", { className: "hs-vide" }, F("Les licences apparaîtront quand les couples seront choisis.")),
      erreur ? h("div", { className: "hs-err" }, erreur) : null));
}

/* ── PDF : partage (iPhone) ou téléchargement, et la liste du van ── */
function hsPartagerPdf(octets, base) {
  try {
    var nom = String(base || "document").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "") + ".pdf";
    var fic = null; try { fic = new File([octets], nom, { type: "application/pdf" }); } catch (eF) { fic = null; }
    if (fic && navigator.canShare && navigator.canShare({ files: [fic] }) && navigator.share) { navigator.share({ files: [fic] }).catch(function () { }); return; }
    var url = URL.createObjectURL(new Blob([octets], { type: "application/pdf" }));
    var a = document.createElement("a"); a.href = url; a.download = nom; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (eR) { } }, 60000);
  } catch (eP) { try { console.error(eP); } catch (e2) { } }
}
function hsPdfListe(titre, sousTitre, lignes) {
  var W = 595.28, H = 841.89, ops = [], y = 70;
  function Y(v) { return (H - v).toFixed(2); }
  function txt(x, yy, t, pol, tl, coul) { ops.push((coul || "0 0 0") + " rg BT /" + pol + " " + tl + " Tf " + x.toFixed(2) + " " + Y(yy) + " Td (" + hsPdfTexte(t) + ") Tj ET"); }
  txt(50, y, titre, "F3", 22, "0.11 0.16 0.54"); y += 22;
  if (sousTitre) { txt(50, y, sousTitre, "F1", 11); y += 14; }
  y += 10;
  lignes.forEach(function (l) {
    if (y > H - 50) return;
    if (l.titre) { y += 12; txt(50, y, l.titre, "F2", 12.5); y += 8; ops.push("0.6 w 0.6 0.6 0.6 RG 50 " + Y(y) + " m 545 " + Y(y) + " l S"); y += 16; return; }
    ops.push("0.8 w 0 0 0 RG 52 " + Y(y + 1) + " 10 10 re S");
    if (l.f) txt(53.5, y - 0.5, "X", "F2", 9);
    txt(70, y + 0.5, hsCouper(l.t, "F1", 11, 470), "F1", 11); y += 18;
  });
  var flux = ops.join("\n");
  var objs = [
    "<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>",
    "<< /Length " + flux.length + " >>\nstream\n" + flux + "\nendstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>"
  ];
  var out = "%PDF-1.4\n%âãÏÓ\n", pos = [];
  objs.forEach(function (ob, i) { pos.push(out.length); out += (i + 1) + " 0 obj\n" + ob + "\nendobj\n"; });
  var xref = out.length;
  out += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
  pos.forEach(function (p) { out += String(p).padStart(10, "0") + " 00000 n \n"; });
  out += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF";
  var o = new Uint8Array(out.length); for (var k = 0; k < out.length; k++) o[k] = out.charCodeAt(k) & 0xFF;
  return o;
}

window.HypeSaison = { Saison: EcranMaSaison, Concours: EcranConcours, Engagements: EcranEngagements, ListeVan: EcranListeVan, JourJ: EcranJourJ, Dossier: EcranDossierConcours, VideoParcours: EcranVideoParcours };
})();
