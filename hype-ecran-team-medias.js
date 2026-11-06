/* HYPE ▸ 05/11/2026 — Page MÉDIAS de la Team (EcranTeamMedias), route « team-medias ».
   Ouverte depuis le chapitre « Médias » de la page Team (hype-ecran-team.js). Chargée à la demande (hypeEcranDiffere).
   Trois onglets : Théorie (partages), Vidéos (vidéothèque de l'équipe), Épingles HB (épingles Hey Baby partagées avec le groupe).
   Données (étape 1, 05/11) : team_videos + team_videos_cavaliers + team_videos_chevaux, team_partages, epingles_partages.
   Règles (décisions de Blandine, la base tranche) :
   - tout compte connecté voit la liste et les vignettes ; seuls le groupe, la coach et la modératrice LISENT une vidéo
     non publique (adresse rendue par team_video_lecture, jamais lisible directement) ; les autres voient le message
     « Désolé, cette vidéo est réservée aux cavaliers du groupe. »
   - Vidéos : vue Par cavalière, une sous-ligne par cheval avec sa photo (proposition 2 du 05/11).
   Étape 2 : lecture seule (l'ajout de vidéo arrive à l'étape 4, le partage Théorie à l'étape 5, les épingles à l'étape 6).
   Textes en français d'abord : traductions après relecture (règle du 02/11). */
(function () {
var TM_VERSION = 2;

function EcranTeamMedias() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var rtl = (lg === "ar");
  var NOIR = "#070A08", PAN = "#101214", IV = "#F3EEE4", IV2 = "rgba(243,238,228,0.64)", IV3 = "rgba(243,238,228,0.42)";
  var CH = "#C9A66B", CH2 = "rgba(201,166,107,0.55)", CH3 = "rgba(201,166,107,0.22)";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',system-ui,sans-serif";

  var ongletDepart = (function () { try { var o = window.__teamMediasOnglet; window.__teamMediasOnglet = null; return o || "videos"; } catch (e) { return "videos"; } })();
  var _o = React.useState(ongletDepart); var onglet = _o[0], setOnglet = _o[1];
  var _g = React.useState(null); var groupe = _g[0], setGroupe = _g[1];
  var _mo = React.useState(null); var moi = _mo[0], setMoi = _mo[1];
  var _m = React.useState(null); var membres = _m[0], setMembres = _m[1];
  var _v = React.useState(null); var videos = _v[0], setVideos = _v[1];
  var _c = React.useState({}); var chevauxParId = _c[0], setChevauxParId = _c[1];
  var _p = React.useState(null); var partages = _p[0], setPartages = _p[1];
  var _e = React.useState(null); var epingles = _e[0], setEpingles = _e[1];
  var _pr = React.useState({}); var profilsParId = _pr[0], setProfilsParId = _pr[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _vi = React.useState(null); var visu = _vi[0], setVisu = _vi[1];
  var _re = React.useState(false); var reserve = _re[0], setReserve = _re[1];
  var _oc = React.useState(""); var occupe = _oc[0], setOccupe = _oc[1];
  var _rv = React.useState(0); var rev = _rv[0], setRev = _rv[1];            /* recharge après un ajout */
  var _cp = React.useState(""); var changePub = _cp[0], setChangePub = _cp[1];
  var _qp = React.useState(null); var questionPub = _qp[0], setQuestionPub = _qp[1];   /* vidéo dont on confirme le passage public / équipe */
  function demanderPublique(v) { setQuestionPub(v); }
  async function confirmerPublique() {
    var v = questionPub; if (!v) return;
    setQuestionPub(null); setChangePub(v.id);
    try {
      var r = await supa.rpc("team_video_publique", { p_id: v.id, p_publique: !v.publique });
      if (r && !r.error && r.data === true) setVideos(function (l) { return (l || []).map(function (x) { return x.id === v.id ? Object.assign({}, x, { publique: !v.publique }) : x; }); });
      else setErreur(T("Tu ne peux pas changer cette vidéo.", "You can't change this video."));
    } catch (e) { setErreur(String((e && e.message) || e)); }
    setChangePub("");
  }
  /* 06/11 — VIDÉO SANS LE SON (décision de Blandine : seule la personne qui a mis la vidéo en ligne choisit, à l'envoi
     puis plus tard si elle change d'avis). La base vérifie de toute façon (team_video_sans_son : auteur seulement). */
  var _vm = React.useState(false); var visuMuet = _vm[0], setVisuMuet = _vm[1];
  var _cs = React.useState(""); var changeSon = _cs[0], setChangeSon = _cs[1];
  var T_SANS_SON = function () { return T("Sans le son", "Without sound", "Sin sonido", "Senza audio", "音声なし", "Ohne Ton", "بدون صوت", "静音", "Zonder geluid", "Sem som", "Utan ljud", "Без звука", "Bez dźwięku", "소리 없이"); };
  async function basculerSon(v) {
    if (!v || !moi || v.auteur_id !== moi.id || changeSon) return;
    setChangeSon(v.id);
    try {
      var r = await supa.rpc("team_video_sans_son", { p_id: v.id, p_sans_son: !v.sans_son });
      if (r && !r.error && r.data === true) setVideos(function (l) { return (l || []).map(function (x) { return x.id === v.id ? Object.assign({}, x, { sans_son: !v.sans_son }) : x; }); });
      else setErreur(T("Tu ne peux pas changer cette vidéo.", "You can't change this video."));
    } catch (e) { setErreur(String((e && e.message) || e)); }
    setChangeSon("");
  }
  var _ec = React.useState([]); var chevauxEquipe = _ec[0], setChevauxEquipe = _ec[1];
  var _aj = React.useState(null); var ajout = _aj[0], setAjout = _aj[1];       /* formulaire « Ajouter une vidéo » ouvert : { cav: [...], ch: [...] } */

  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, [onglet]);

  function nomProfil(p) { return (p && (p.pseudo || p.handle)) || "—"; }
  function photoProfil(p) { var u = p && (p.avatar_url || p.avatar); return (u && /^https?:\/\//i.test(String(u))) ? u : ""; }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { setErreur(T("Hors ligne", "Offline")); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        /* le groupe : celui de la page Team qui a ouvert cette page, sinon la Team par défaut */
        var idG = null; try { idG = window.__teamMediasGroupe || null; } catch (eG) { }
        var rg = idG ? await supa.from("groupes").select("id, nom, cree_par, club_clef").eq("id", idG).maybeSingle()
          : ((typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom, cree_par, club_clef") : null);
        var G = rg && rg.data;
        if (!G) throw new Error(T("équipe introuvable", "team not found"));
        if (vif) setGroupe(G);

        var rm = await supa.from("groupes_membres").select("user_id, ajoute_le").eq("groupe_id", G.id);
        var idsM = ((rm && rm.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);

        var rv = await supa.from("team_videos").select("id, groupe_id, vignette, duree, titre, description, concours, date_video, categorie, publique, sans_son, auteur_id, cree_le").eq("groupe_id", G.id).order("date_video", { ascending: false, nullsFirst: false }).order("cree_le", { ascending: false });
        if (rv && rv.error) throw new Error(rv.error.message || String(rv.error));
        var vids = (rv && rv.data) || [];
        var idsV = vids.map(function (x) { return x.id; });
        var cav = [], chv = [];
        if (idsV.length) {
          var rc = await supa.from("team_videos_cavaliers").select("video_id, user_id").in("video_id", idsV);
          var rh = await supa.from("team_videos_chevaux").select("video_id, cheval_id").in("video_id", idsV);
          cav = (rc && rc.data) || []; chv = (rh && rh.data) || [];
        }
        vids.forEach(function (x) {
          x.cavaliers = cav.filter(function (c) { return c.video_id === x.id; }).map(function (c) { return c.user_id; });
          x.chevaux = chv.filter(function (c) { return c.video_id === x.id; }).map(function (c) { return c.cheval_id; });
        });

        var rp = await supa.from("team_partages").select("id, type, url, titre, image, resume, categorie, commentaire, auteur_id, cree_le").eq("groupe_id", G.id).order("cree_le", { ascending: false }).limit(60);
        var parts = (rp && !rp.error && rp.data) || [];

        /* épingles : seules celles partagées avec ce groupe que la base laisse lire */
        var eps = [];
        try {
          var rep = await supa.from("epingles_partages").select("epingle_id, partage_par, partage_le").eq("groupe_id", G.id).order("partage_le", { ascending: false }).limit(60);
          var idsE = ((rep && rep.data) || []).map(function (x) { return x.epingle_id; });
          if (idsE.length) {
            var ree = await supa.from("echanges_heybaby_epingles").select("id, question, reponse, cheval_id, cheval_nom, cavalier_nom, created_at, user_id").in("id", idsE);
            var parE = {}; ((ree && ree.data) || []).forEach(function (x) { parE[x.id] = x; });
            eps = ((rep && rep.data) || []).map(function (s) { var e = parE[s.epingle_id]; return e ? Object.assign({}, e, { partage_par: s.partage_par, partage_le: s.partage_le }) : null; }).filter(Boolean);
          }
        } catch (eEp) { eps = []; }

        /* profils : membres + auteurs + cavalières des vidéos + coach */
        var idsP = idsM.slice();
        function ajP(i) { if (i && idsP.indexOf(i) === -1) idsP.push(i); }
        vids.forEach(function (x) { ajP(x.auteur_id); x.cavaliers.forEach(ajP); });
        parts.forEach(function (x) { ajP(x.auteur_id); });
        eps.forEach(function (x) { ajP(x.partage_par); });
        ajP(G.cree_par);
        var parP = {};
        if (idsP.length) {
          var rpp = await supa.from("profiles").select("id, pseudo, handle, avatar_url, avatar").in("id", idsP);
          ((rpp && rpp.data) || []).forEach(function (p) { parP[p.id] = p; });
        }
        var rgc = await supa.from("groupes_chevaux").select("cheval_id").eq("groupe_id", G.id);
        var idsEq = ((rgc && rgc.data) || []).map(function (x) { return x.cheval_id; }).filter(Boolean);
        var idsC = idsEq.slice();
        vids.forEach(function (x) { x.chevaux.forEach(function (c) { if (idsC.indexOf(c) === -1) idsC.push(c); }); });
        var parC = {};
        if (idsC.length) {
          var rcc = await supa.from("chevaux").select("id, nom, alias, photo_url").in("id", idsC);
          ((rcc && rcc.data) || []).forEach(function (c) { parC[c.id] = c; });
        }
        if (!vif) return;
        setProfilsParId(parP);
        setChevauxParId(parC);
        setChevauxEquipe(idsEq);
        setMembres(idsM.map(function (i) { return parP[i]; }).filter(Boolean));
        setVideos(vids);
        setPartages(parts);
        setEpingles(eps);
      } catch (eL) {
        if (vif) { setErreur(String((eL && eL.message) || eL)); setVideos(function (v) { return v || []; }); setMembres(function (m) { return m || []; }); setPartages(function (p) { return p || []; }); setEpingles(function (e) { return e || []; }); }
      }
    })();
    return function () { vif = false; };
  }, [rev]);

  /* ouverture directe d'une vidéo demandée par le chapitre de la page Team */
  React.useEffect(function () {
    if (!videos) return;
    var id = null; try { id = window.__teamMediasOuvrir || null; window.__teamMediasOuvrir = null; } catch (e) { }
    if (!id) return;
    var v = videos.filter(function (x) { return x.id === id; })[0];
    if (v) lire(v);
  }, [videos]);

  var estDuGroupe = !!(moi && (
    (membres || []).some(function (p) { return p.id === moi.id; }) ||
    (groupe && groupe.cree_par === moi.id) ||
    ((typeof estModerateurHype === "function") && estModerateurHype(moi))));
  function peutLire(v) { return estDuGroupe || (v && v.publique); }

  async function lire(v) {
    if (!peutLire(v)) { setReserve(true); return; }
    setOccupe(v.id);
    try {
      var r = await supa.rpc("team_video_lecture", { p_id: v.id });
      var adr = r && !r.error ? r.data : null;
      if (!adr) { setReserve(true); return; }
      setVisuMuet(!!v.sans_son);
      setVisu(((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(adr) && typeof hypeMuxLecture === "function") ? hypeMuxLecture(adr) : adr);
    } catch (eR) { setReserve(true); }
    finally { setOccupe(""); }
  }

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("team-competition"); }

  function duree(s) { var n = Math.round(Number(s) || 0); if (!n) return ""; return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0"); }
  function dateCourte(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; try { return new Intl.DateTimeFormat(lg, { day: "numeric", month: "short" }).format(new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))); } catch (e) { return m[3] + "/" + m[2]; } }
  function vignetteDe(v) { var u = v && v.vignette; if (!u) return ""; return (typeof vignetteHype === "function") ? vignetteHype(u, 300, 190) : u; }

  /* ───────── en-tête, comme la Vidéothèque ───────── */
  var hero = h("div", { style: { position: "relative", paddingTop: "calc(env(safe-area-inset-top) + 8px)" } },
    h("div", { style: { position: "relative", height: "clamp(220px, 62vw, 340px)", overflow: "hidden", WebkitMaskImage: "linear-gradient(180deg,#000 55%,transparent 96%)", maskImage: "linear-gradient(180deg,#000 55%,transparent 96%)" } },
      h("img", { src: "images/TEAM_COMPETITION.webp", alt: "", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" } })),
    h("svg", { viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 64, marginTop: -64, position: "relative", transform: rtl ? "scaleX(-1)" : "none" } },
      h("path", { d: "M0 22 C 120 30, 230 52, 400 18", fill: "none", stroke: CH, strokeWidth: 1.2 })),
    h("button", { type: "button", onClick: retour, "aria-label": T("Retour", "Back"),
      style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", insetInlineStart: 14, width: 40, height: 40, borderRadius: "50%", background: "rgba(7,10,8,0.55)", border: "1px solid rgba(243,238,228,0.16)", color: IV, fontSize: 20, lineHeight: 1, cursor: "pointer" } }, rtl ? "›" : "‹"),
    h("div", { style: { textAlign: "end", padding: "0 18px", marginTop: -14, position: "relative" } },
      h("h1", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px, 12vw, 64px)", lineHeight: 1, margin: 0, color: IV } }, T("Médias", "Media")),
      h("p", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(17px, 4.6vw, 21px)", margin: "8px 0 0", color: IV, opacity: 0.88 } }, (groupe && groupe.nom) || "")));

  var ONGLETS = [["theorie", T("Théorie", "Theory")], ["videos", T("Vidéos", "Videos")], ["epingles", T("Épingles HB", "HB pins")]];
  var barreOnglets = h("div", { role: "tablist", style: { display: "flex", gap: 8, margin: "22px 0 0" } },
    ONGLETS.map(function (o) {
      var on = onglet === o[0];
      return h("button", { key: o[0], type: "button", role: "tab", "aria-selected": on, onClick: function () { setOnglet(o[0]); setCavOuverte(null); setChOuvert(null); },
        style: { flex: 1, minHeight: 46, padding: "9px 6px", borderRadius: 12, border: "1px solid " + (on ? CH : "rgba(243,238,228,0.12)"),
          background: on ? "linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95))" : "rgba(16,26,29,.45)",
          boxShadow: on ? "0 8px 22px -12px rgba(0,0,0,.95), inset 0 0 0 .5px rgba(201,166,107,.35)" : "none",
          color: IV, fontFamily: M, fontSize: 14, letterSpacing: ".02em", cursor: "pointer" } }, o[1]);
    }));

  function vide(txt) { return h("div", { style: { fontFamily: M, fontSize: 12, color: IV3, fontStyle: "italic", padding: "18px 0" } }, txt); }
  function chargement() { return vide(T("Chargement…", "Loading…")); }
  function filet() { return h("div", { "aria-hidden": "true", style: { height: 1, background: "linear-gradient(90deg, rgba(201,166,107,.1), " + CH2 + " 50%, rgba(201,166,107,.1))" } }); }

  /* ───────── VIDÉOS : par cavalière, une sous-ligne par cheval ───────── */
  var ICONE_CADENAS = h("svg", { width: 11, height: 12, viewBox: "0 0 11 12", "aria-hidden": "true" },
    h("rect", { x: 1.2, y: 5.2, width: 8.6, height: 6, rx: 1.2, fill: "none", stroke: IV, strokeWidth: 1.1 }),
    h("path", { d: "M3.2 5.2V3.6a2.3 2.3 0 0 1 4.6 0v1.6", fill: "none", stroke: IV, strokeWidth: 1.1 }));
  function tuileVideo(v, cle, enGrille, etendue) {
    var src = vignetteDe(v), d = duree(v.duree), verrou = !peutLire(v);
    /* 05/11 soir : plus de titre à écrire — on affiche le cheval, puis la date (et « Un mot ? » s'il y en a un) */
    var titreAff = v.titre || (v.chevaux && v.chevaux.length ? v.chevaux.map(nomCheval).join(", ") : "") || T("Vidéo", "Video");
    var meta = [dateCourte(v.date_video || v.cree_le), v.description || v.concours || ""].filter(Boolean).join(" · ");
    /* 05/11 soir — « Mettre en public » : petit bouton posé sur la vignette, visible seulement pour la cavalière qui est
       sur la vidéo, la personne qui l'a postée (et, pour la remettre en privé, la coach). La base vérifie de toute façon. */
    var moiId = moi && moi.id;
    var estModo = !!((typeof estModerateurHype === "function") && moi && estModerateurHype(moi));
    var peutPublier = !!moiId && (v.auteur_id === moiId || (v.cavaliers || []).indexOf(moiId) !== -1 || estModo);
    var peutPrivatiser = peutPublier || !!(moiId && groupe && groupe.cree_par === moiId);
    var montrerPastille = v.publique ? true : peutPublier;
    var pastille = !montrerPastille ? null : h("button", { type: "button", disabled: changePub === v.id || !(v.publique ? peutPrivatiser : peutPublier),
      onClick: function (e) { e.stopPropagation(); demanderPublique(v); },
      "aria-label": v.publique ? T("Vidéo publique", "Public video") : T("Mettre en public", "Make public"),
      style: { position: "absolute", top: 6, insetInlineStart: 6, zIndex: 2, display: "flex", alignItems: "center", gap: 5, minHeight: 26, padding: "0 9px", borderRadius: 999,
        border: "1px solid " + (v.publique ? CH2 : "rgba(243,238,228,0.25)"), background: "rgba(7,10,8,0.72)", color: v.publique ? CH : IV2, fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: ".04em",
        cursor: (v.publique ? peutPrivatiser : peutPublier) ? "pointer" : "default" } },
      h("svg", { width: 10, height: 10, viewBox: "0 0 10 10", "aria-hidden": "true" },
        v.publique ? [h("circle", { key: "c", cx: 5, cy: 5, r: 4, fill: "none", stroke: CH, strokeWidth: 0.9 }), h("path", { key: "p", d: "M1 5h8M5 1c1.6 1.4 1.6 6.6 0 8M5 1c-1.6 1.4-1.6 6.6 0 8", fill: "none", stroke: CH, strokeWidth: 0.9 })]
          : [h("rect", { key: "r", x: 1.6, y: 4.4, width: 6.8, height: 4.6, rx: 1, fill: "none", stroke: IV2, strokeWidth: 0.9 }), h("path", { key: "a", d: "M3.2 4.4V3.1a1.8 1.8 0 0 1 3.6 0v1.3", fill: "none", stroke: IV2, strokeWidth: 0.9 })]),
      changePub === v.id ? "…" : (v.publique ? T("Public", "Public") : T("Équipe", "Team")));
    /* 06/11 — pastille du son, en haut à droite : l'auteur la touche pour couper / remettre le son ; les autres ne voient
       que l'indication « Son coupé » quand la vidéo est sans le son */
    var estAuteur = !!moiId && v.auteur_id === moiId;
    var pastilleSon = !(estAuteur || v.sans_son) ? null : h("button", { type: "button", disabled: !estAuteur || changeSon === v.id,
      onClick: function (e) { e.stopPropagation(); basculerSon(v); },
      "aria-label": !estAuteur ? T("Son coupé", "Muted", "Silenciado", "Muto", "ミュート", "Stumm", "صامت", "已静音", "Gedempt", "Sem som", "Ljudlös", "Без звука", "Wyciszone", "음소거")
        : v.sans_son ? T("Remettre le son", "Turn sound back on", "Volver a poner el sonido", "Rimetti l'audio", "音声を戻す", "Ton wieder einschalten", "إعادة الصوت", "恢复声音", "Geluid weer aan", "Voltar a pôr o som", "Slå på ljudet igen", "Включить звук", "Włącz dźwięk", "소리 다시 켜기")
        : T("Couper le son", "Mute", "Quitar el sonido", "Togli l'audio", "音声を消す", "Ton ausschalten", "كتم الصوت", "关闭声音", "Geluid uit", "Tirar o som", "Stäng av ljudet", "Выключить звук", "Wyłącz dźwięk", "소리 끄기"),
      style: { position: "absolute", top: 6, insetInlineEnd: 6, zIndex: 2, display: "flex", alignItems: "center", gap: 5, minHeight: 26, padding: "0 9px", borderRadius: 999,
        border: "1px solid " + (v.sans_son ? CH2 : "rgba(243,238,228,0.25)"), background: "rgba(7,10,8,0.72)", color: v.sans_son ? CH : IV2, fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: ".04em",
        cursor: estAuteur ? "pointer" : "default" } },
      h("svg", { width: 11, height: 10, viewBox: "0 0 11 10", "aria-hidden": "true" },
        h("path", { d: "M1 3.6h2L5.6 1.4v7.2L3 6.4H1Z", fill: "none", stroke: v.sans_son ? CH : IV2, strokeWidth: 0.9, strokeLinejoin: "round" }),
        v.sans_son ? h("path", { d: "M7.4 3.4l2.6 3.2M10 3.4L7.4 6.6", fill: "none", stroke: CH, strokeWidth: 0.9 })
          : h("path", { d: "M7.3 3.2c.8.9.8 2.7 0 3.6M8.7 2c1.5 1.6 1.5 4.4 0 6", fill: "none", stroke: IV2, strokeWidth: 0.9 })),
      changeSon === v.id ? "…" : (v.sans_son ? T("Son coupé", "Muted", "Silenciado", "Muto", "ミュート", "Stumm", "صامت", "已静音", "Gedempt", "Sem som", "Ljudlös", "Без звука", "Wyciszone", "음소거")
        : T("Son", "Sound", "Sonido", "Audio", "音声", "Ton", "صوت", "有声", "Geluid", "Som", "Ljud", "Звук", "Dźwięk", "소리")));
    return h("div", { key: cle, style: { position: "relative", gridColumn: etendue ? "span " + etendue : "auto", flex: enGrille ? "initial" : "0 0 clamp(148px, 21vw, 210px)", width: enGrille ? "100%" : "auto", minWidth: 0 } },
      pastille,
      pastilleSon,
      h("button", { type: "button", onClick: function () { lire(v); }, disabled: occupe === v.id,
      style: { width: "100%", background: "none", border: "none", padding: 0, textAlign: "start", color: IV, cursor: "pointer", minWidth: 0 } },
      h("div", { style: { position: "relative", aspectRatio: "16 / 10", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(243,238,228,0.08)", background: PAN } },
        src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null,
        h("span", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          h("span", { style: { width: 28, height: 28, borderRadius: "50%", background: "rgba(7,10,8,0.55)", border: "1px solid rgba(243,238,228,0.45)", display: "flex", alignItems: "center", justifyContent: "center" } },
            occupe === v.id ? h("span", { style: { fontSize: 11 } }, "…")
              : verrou ? ICONE_CADENAS
              : h("svg", { width: 9, height: 10, viewBox: "0 0 9 10", "aria-hidden": "true" }, h("path", { d: "M1 .8v8.4L8.2 5Z", fill: IV })))),
        d ? h("span", { style: { position: "absolute", insetInlineEnd: 6, bottom: 6, fontFamily: M, fontSize: 9.5, padding: "2px 6px", borderRadius: 6, background: "rgba(7,10,8,0.72)", fontVariantNumeric: "tabular-nums" } }, d) : null),
      h("div", { dir: "auto", style: { fontFamily: M, fontSize: 11.5, marginTop: 6, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, titreAff),
      meta ? h("div", { style: { fontFamily: M, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: IV3, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, meta) : null));
  }
  /* « + Ajouter une vidéo » : visible pour le groupe ; l'ajout lui-même arrive à l'étape 4 */
  function tuileAjout(cle, etendue, seuleSurSaLigne, pre) {
    if (!estDuGroupe) return null;
    return h("button", { key: cle, type: "button", onClick: function () { ouvrirAjout(pre); }, "aria-label": T("Ajouter une vidéo", "Add a video"),
      style: { cursor: "pointer", gridColumn: etendue ? "span " + etendue : "auto", width: "100%", aspectRatio: seuleSurSaLigne ? "auto" : "16 / 10", minHeight: seuleSurSaLigne ? 58 : 0, borderRadius: 12, border: "1px dashed " + CH2, background: "none", color: IV2, fontFamily: M, fontSize: 11, lineHeight: 1.25, display: "flex", flexDirection: seuleSurSaLigne ? "row" : "column", alignItems: "center", justifyContent: "center", gap: seuleSurSaLigne ? 10 : 4 } },
      h("span", { style: { color: CH, fontSize: 20, lineHeight: 1 } }, "+"), T("Ajouter une vidéo", "Add a video"));
  }
  /* 05/11 (Blandine) : jamais de ligne à moitié vide. Grille de N colonnes : la dernière case s'étale sur la place restante
     (une vidéo seule passe en pleine largeur ; la case « Ajouter » seule sur sa ligne devient une bande compacte). */
  function grilleEquilibree(listeV, cleAjout, cols, pre) {
    var avecAjout = estDuGroupe, n = listeV.length + (avecAjout ? 1 : 0), reste = n % cols;
    var etendueDerniere = reste ? (cols - reste + 1) : 1;
    var enfants = listeV.map(function (v, k) {
      var derniere = !avecAjout && k === listeV.length - 1;
      return tuileVideo(v, cleAjout + v.id, true, derniere && etendueDerniere > 1 ? etendueDerniere : 0);
    });
    if (avecAjout) enfants.push(tuileAjout(cleAjout + "aj", etendueDerniere > 1 ? etendueDerniere : 0, reste === 1, pre));
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + cols + ", minmax(0, 1fr))", gap: "14px 10px" } }, enfants);
  }
  var _lw = React.useState((typeof window !== "undefined" && window.innerWidth) || 390); var largeur = _lw[0], setLargeur = _lw[1];
  React.useEffect(function () { function f() { try { setLargeur(window.innerWidth); } catch (e) { } } window.addEventListener("resize", f); return function () { window.removeEventListener("resize", f); }; }, []);
  var COLS = largeur >= 900 ? 4 : largeur >= 620 ? 3 : 2;
  function nomCheval(id) { var c = chevauxParId[id]; return (c && (c.alias || c.nom)) || T("Cheval", "Horse"); }
  function videosDe(p) { return (videos || []).filter(function (v) { return v.cavaliers.indexOf(p.id) !== -1; }); }
  function chevauxDe(liste) { var o = []; liste.forEach(function (v) { (v.chevaux.length ? v.chevaux : ["_sans"]).forEach(function (c) { if (o.indexOf(c) === -1) o.push(c); }); }); return o; }
  function compte(n, un, plusieurs) { return n + " " + (n > 1 ? plusieurs : un); }
  function avatar(p, taille) {
    var photo = photoProfil(p);
    return h("div", { style: { width: taille, height: taille, flex: "0 0 " + taille + "px", borderRadius: "50%", overflow: "hidden", border: "1px solid " + CH2, background: PAN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: Math.round(taille * 0.46), color: CH } },
      photo ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(photo, taille * 3, taille * 3) : photo, alt: "", loading: "lazy", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } }) : nomProfil(p).charAt(0).toUpperCase());
  }

  /* 05/11 (Blandine) : une seule ligne de 2 vidéos par cavalière ; « Voir tout » ouvre sa page, un onglet par cheval */
  var _co = React.useState(null); var cavOuverte = _co[0], setCavOuverte = _co[1];
  var _oc2 = React.useState("tous"); var ongletCheval = _oc2[0], setOngletCheval = _oc2[1];
  function ouvrirCavaliere(p) { setOngletCheval("tous"); setCavOuverte(p.id); try { window.scrollTo(0, 0); } catch (e) { } }

  function sectionCavaliere(p, i) {
    var siennes = videosDe(p), nbCh = chevauxDe(siennes).filter(function (c) { return c !== "_sans"; }).length;
    var sousTitre = siennes.length ? compte(siennes.length, T("vidéo", "video"), T("vidéos", "videos")) + (nbCh ? " · " + compte(nbCh, T("cheval", "horse"), T("chevaux", "horses")) : "")
      : (estDuGroupe ? "" : T("Pas encore de vidéo", "No video yet"));
    var deux = siennes.slice(0, 2);
    return h("div", { key: "cav" + p.id },
      i > 0 ? filet() : null,
      h("div", { style: { padding: "18px 0 16px" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          h("button", { type: "button", disabled: !siennes.length, onClick: function () { ouvrirCavaliere(p); }, style: { display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0, background: "none", border: "none", padding: 0, color: IV, textAlign: "start", cursor: siennes.length ? "pointer" : "default" } },
            avatar(p, 46),
            h("div", { style: { minWidth: 0 } },
              h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 22, lineHeight: 1.1 } }, nomProfil(p)),
              sousTitre ? h("div", { style: { fontFamily: M, fontSize: 11, color: IV3, marginTop: 2 } }, sousTitre) : null)),
          siennes.length ? h("button", { type: "button", onClick: function () { ouvrirCavaliere(p); }, style: { flex: "0 0 auto", minHeight: 34, background: "none", border: "none", padding: "0 2px", color: CH, fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, T("Voir tout", "See all") + " " + (rtl ? "‹" : "›")) : null),
        /* sans vidéo : une petite case « + » et une petite écriture, rien de plus */
        !siennes.length ? (estDuGroupe ? h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 12, paddingInlineStart: 58 } },
            h("button", { type: "button", onClick: function () { ouvrirAjout({ cav: [p.id] }); }, "aria-label": T("Ajouter une vidéo", "Add a video"),
              style: { flex: "0 0 auto", width: 58, height: 40, borderRadius: 10, border: "1px dashed " + CH2, background: "transparent", color: CH, fontSize: 20, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" } }, "+"),
            h("div", { style: { fontFamily: M, fontSize: 11, fontStyle: "italic", color: IV3, lineHeight: 1.4 } }, T("Ajoute les vidéos de concours ici", "Add competition videos here"))) : null)
          : h("div", { style: { marginTop: 12, maxWidth: 560 } },
              deux.length === 2 ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 } }, deux.map(function (v) { return tuileVideo(v, "v" + p.id + v.id, true); }))
                : grilleEquilibree(deux, "l" + p.id, 2, { cav: [p.id] }))));
  }

  /* page d'une cavalière : toutes ses vidéos, un onglet par cheval (« Tous » d'abord) */
  function pageCavaliere(p) {
    var siennes = videosDe(p), chs = chevauxDe(siennes);
    var visibles = ongletCheval === "tous" ? siennes : siennes.filter(function (v) { return ongletCheval === "_sans" ? !v.chevaux.length : v.chevaux.indexOf(ongletCheval) !== -1; });
    function pastille(cle, libelle, ph) {
      var on = ongletCheval === cle;
      return h("button", { key: "oc" + cle, type: "button", onClick: function () { setOngletCheval(cle); },
        style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8, minHeight: 38, padding: ph ? "0 14px 0 4px" : "0 15px", borderRadius: 999, border: "1px solid " + (on ? CH : "rgba(243,238,228,0.14)"), background: on ? "linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95))" : "rgba(16,26,29,.45)", color: on ? IV : IV2, fontFamily: M, fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap" } },
        ph ? h("span", { style: { width: 30, height: 30, borderRadius: "50%", overflow: "hidden", border: "1px solid " + CH3, background: PAN, flex: "0 0 30px" } }, h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, 90, 90) : ph, alt: "", loading: "lazy", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } })) : null,
        libelle);
    }
    return h("div", { style: { marginTop: 14 } },
      h("button", { type: "button", onClick: function () { setCavOuverte(null); }, style: { background: "none", border: "none", padding: "6px 0", minHeight: 36, color: CH, fontFamily: M, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, (rtl ? "› " : "‹ ") + T("Toute l'équipe", "Whole team")),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 6 } },
        avatar(p, 58),
        h("div", { style: { minWidth: 0 } },
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 28, lineHeight: 1.05 } }, nomProfil(p)),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: IV3, marginTop: 3 } }, compte(siennes.length, T("vidéo", "video"), T("vidéos", "videos"))))),
      h("div", { "data-hscroll": "1", "data-noswipe": "1", role: "tablist", style: { display: "flex", gap: 8, overflowX: "auto", margin: "18px -18px 0", padding: "0 18px 4px", scrollbarWidth: "none" } },
        [pastille("tous", T("Tous", "All"), null)].concat(chs.map(function (c) { var ch = chevauxParId[c]; return pastille(c, c === "_sans" ? T("Sans cheval", "No horse") : nomCheval(c), ch && ch.photo_url); }))),
      h("div", { style: { height: 1, margin: "14px 0 16px", background: "linear-gradient(90deg, rgba(201,166,107,.1), " + CH2 + " 50%, rgba(201,166,107,.1))" } }),
      grilleEquilibree(visibles, "pv" + p.id, COLS, { cav: [p.id], ch: (ongletCheval !== "tous" && ongletCheval !== "_sans") ? [ongletCheval] : [] }));
  }

  /* ───────── vue PAR CHEVAL (mêmes vidéos, mêmes rattachements) : une section par cheval, 2 vidéos, « Voir tout » ouvre
     la page du cheval avec un onglet par cavalière. Les chevaux n'apparaissent que s'ils ont au moins une vidéo. ───────── */
  var _vu = React.useState("cavaliere"); var vue = _vu[0], setVue = _vu[1];
  var _cho = React.useState(null); var chOuvert = _cho[0], setChOuvert = _cho[1];
  var _ocv = React.useState("tous"); var ongletCav = _ocv[0], setOngletCav = _ocv[1];
  function videosDuCheval(c) { return (videos || []).filter(function (v) { return v.chevaux.indexOf(c) !== -1; }); }
  function cavalieresDe(liste) { var o = []; liste.forEach(function (v) { v.cavaliers.forEach(function (u) { if (o.indexOf(u) === -1) o.push(u); }); }); return o; }
  function photoCheval(c, taille) {
    var ch = chevauxParId[c];
    return h("div", { style: { width: taille, height: taille, flex: "0 0 " + taille + "px", borderRadius: "50%", overflow: "hidden", border: "1px solid " + CH2, background: PAN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: Math.round(taille * 0.46), color: CH } },
      (ch && ch.photo_url) ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ch.photo_url, taille * 3, taille * 3) : ch.photo_url, alt: "", loading: "lazy", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } }) : nomCheval(c).charAt(0).toUpperCase());
  }
  function ouvrirCheval(c) { setOngletCav("tous"); setChOuvert(c); try { window.scrollTo(0, 0); } catch (e) { } }
  function sectionCheval(c, i) {
    var siens = videosDuCheval(c), nbCav = cavalieresDe(siens).length, deux = siens.slice(0, 2);
    return h("div", { key: "chv" + c },
      i > 0 ? filet() : null,
      h("div", { style: { padding: "18px 0 16px" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          h("button", { type: "button", onClick: function () { ouvrirCheval(c); }, style: { display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0, background: "none", border: "none", padding: 0, color: IV, textAlign: "start", cursor: "pointer" } },
            photoCheval(c, 46),
            h("div", { style: { minWidth: 0 } },
              h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 22, lineHeight: 1.1 } }, nomCheval(c)),
              h("div", { style: { fontFamily: M, fontSize: 11, color: IV3, marginTop: 2 } }, compte(siens.length, T("vidéo", "video"), T("vidéos", "videos")) + " · " + compte(nbCav, T("cavalière", "rider"), T("cavalières", "riders"))))),
          h("button", { type: "button", onClick: function () { ouvrirCheval(c); }, style: { flex: "0 0 auto", minHeight: 34, background: "none", border: "none", padding: "0 2px", color: CH, fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, T("Voir tout", "See all") + " " + (rtl ? "‹" : "›"))),
        h("div", { style: { marginTop: 12, maxWidth: 560 } },
          deux.length === 2 ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 } }, deux.map(function (v) { return tuileVideo(v, "cv" + c + v.id, true); }))
            : grilleEquilibree(deux, "lc" + c, 2, { ch: [c] }))));
  }
  function pageCheval(c) {
    var siens = videosDuCheval(c), cavs = cavalieresDe(siens);
    var visibles = ongletCav === "tous" ? siens : siens.filter(function (v) { return v.cavaliers.indexOf(ongletCav) !== -1; });
    function pastille(cle, libelle, prof) {
      var on = ongletCav === cle;
      return h("button", { key: "pc" + cle, type: "button", onClick: function () { setOngletCav(cle); },
        style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8, minHeight: 38, padding: prof ? "0 14px 0 4px" : "0 15px", borderRadius: 999, border: "1px solid " + (on ? CH : "rgba(243,238,228,0.14)"), background: on ? "linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95))" : "rgba(16,26,29,.45)", color: on ? IV : IV2, fontFamily: M, fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap" } },
        prof ? avatar(prof, 30) : null, libelle);
    }
    return h("div", { style: { marginTop: 14 } },
      h("button", { type: "button", onClick: function () { setChOuvert(null); }, style: { background: "none", border: "none", padding: "6px 0", minHeight: 36, color: CH, fontFamily: M, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, (rtl ? "› " : "‹ ") + T("Tous les chevaux", "All horses")),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 6 } },
        photoCheval(c, 58),
        h("div", { style: { minWidth: 0 } },
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 28, lineHeight: 1.05 } }, nomCheval(c)),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: IV3, marginTop: 3 } }, compte(siens.length, T("vidéo", "video"), T("vidéos", "videos"))))),
      h("div", { "data-hscroll": "1", "data-noswipe": "1", role: "tablist", style: { display: "flex", gap: 8, overflowX: "auto", margin: "18px -18px 0", padding: "0 18px 4px", scrollbarWidth: "none" } },
        [pastille("tous", T("Tous", "All"), null)].concat(cavs.map(function (u) { var pr = profilsParId[u]; return pastille(u, nomProfil(pr), pr || { pseudo: "?" }); }))),
      h("div", { style: { height: 1, margin: "14px 0 16px", background: "linear-gradient(90deg, rgba(201,166,107,.1), " + CH2 + " 50%, rgba(201,166,107,.1))" } }),
      grilleEquilibree(visibles, "ph" + c, COLS, { ch: [c], cav: ongletCav !== "tous" ? [ongletCav] : [] }));
  }

  /* petit sélecteur discret en haut de la vidéothèque */
  function selecteurVue() {
    function lien(cle, txt) {
      var on = vue === cle;
      return h("button", { key: cle, type: "button", onClick: function () { setVue(cle); setCavOuverte(null); setChOuvert(null); },
        style: { background: "none", border: "none", borderBottom: "1px solid " + (on ? CH : "transparent"), padding: "8px 0 6px", minHeight: 36, color: on ? IV : IV3, fontFamily: M, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" } }, txt);
    }
    return h("div", { style: { display: "flex", gap: 22, marginTop: 18 } }, lien("cavaliere", T("Par cavalière", "By rider")), lien("cheval", T("Par cheval", "By horse")));
  }

  function ongletVideos() {
    if (videos === null || membres === null) return chargement();
    if (vue === "cavaliere") {
      var ouverte = cavOuverte && (membres || []).filter(function (p) { return p.id === cavOuverte; })[0];
      if (ouverte) return pageCavaliere(ouverte);
    } else if (chOuvert) return pageCheval(chOuvert);
    var corps;
    if (vue === "cavaliere") {
      /* les cavalières qui ont des vidéos d'abord, puis les autres par ordre alphabétique */
      var liste = (membres || []).slice().sort(function (a, b) { var d = videosDe(b).length - videosDe(a).length; return d || nomProfil(a).localeCompare(nomProfil(b)); });
      corps = !liste.length ? vide(T("Aucune cavalière dans l'équipe pour l'instant.", "No riders in the team yet.")) : h("div", null, liste.map(sectionCavaliere));
    } else {
      var chs = []; (videos || []).forEach(function (v) { v.chevaux.forEach(function (c) { if (chs.indexOf(c) === -1) chs.push(c); }); });
      chs.sort(function (a, b) { var d = videosDuCheval(b).length - videosDuCheval(a).length; return d || nomCheval(a).localeCompare(nomCheval(b)); });
      corps = !chs.length ? vide(T("Les chevaux apparaîtront ici dès qu'une vidéo leur sera rattachée.", "Horses will appear here once a video is linked to them.")) : h("div", null, chs.map(sectionCheval));
    }
    return h("div", null, selecteurVue(), h("div", { style: { marginTop: 4 } }, corps));
  }

  /* ───────── THÉORIE : partages (lecture seule à cette étape) ───────── */
  var LIB_TYPE = { article_hype: T("Article Hype", "Hype article"), lien: T("Lien", "Link"), video: T("Vidéo", "Video"), ressource: T("Ressource", "Resource") };
  /* article Hype : on ouvre la page d'origine DANS Hype (on ne copie jamais le contenu) ; sinon le lien externe */
  function articleHypeDe(url) {
    var u = String(url || "").trim();
    if (!/^https?:\/\/(www\.)?2hype\.(fr|netlify\.app)\b/i.test(u) && !/^#a=/.test(u)) return null;
    var m = u.match(/[#?&]a=(\d+)/); if (!m) return null;
    var liste = []; try { liste = (typeof ARTICLES !== "undefined" && ARTICLES) || []; } catch (e) { liste = []; }
    var a = liste.filter(function (x) { return String(x.id) === m[1]; })[0];
    return a ? { id: m[1], art: a } : null;
  }
  function ouvrirPartage(p) {
    var ah = p.type === "article_hype" ? articleHypeDe(p.url) : null;
    if (ah) { try { window.__articleOuvert = ah.art.id; } catch (e) { } setEcran(ah.art.ecran || "article-detail"); return; }
    try { window.open(String(p.url || ""), "_blank", "noopener"); } catch (e) { }
  }
  function cartePartage(p) {
    var qui = profilsParId[p.auteur_id];
    return h("button", { key: "pa" + p.id, type: "button", onClick: function () { ouvrirPartage(p); },
      style: { width: "100%", display: "flex", gap: 12, alignItems: "stretch", padding: "14px 0", background: "none", border: "none", borderTop: "1px solid rgba(243,238,228,0.06)", color: IV, textAlign: "start", cursor: "pointer" } },
      h("div", { style: { width: 88, flex: "0 0 88px", aspectRatio: "16 / 11", borderRadius: 10, overflow: "hidden", background: PAN, border: "1px solid " + CH3, display: "flex", alignItems: "center", justifyContent: "center", color: CH, fontFamily: SERIF, fontSize: 22 } },
        p.image ? h("img", { src: p.image, alt: "", loading: "lazy", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } }) : "✦"),
      h("div", { style: { minWidth: 0, flex: 1 } },
        h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: CH } }, LIB_TYPE[p.type] || ""),
        h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, lineHeight: 1.15, marginTop: 3 } }, p.titre || p.url),
        p.commentaire ? h("div", { dir: "auto", style: { fontFamily: M, fontSize: 11.5, color: IV2, marginTop: 4, lineHeight: 1.45 } }, "« " + p.commentaire + " »") : null,
        h("div", { style: { fontFamily: M, fontSize: 10.5, color: IV3, marginTop: 4 } }, T("Partagé par ", "Shared by ") + nomProfil(qui))));
  }
  function ongletTheorie() {
    if (partages === null) return chargement();
    var bouton = estDuGroupe ? h("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 16 } },
      h("button", { type: "button", onClick: ouvrirPartager, style: { minHeight: 38, padding: "0 16px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: CH, fontFamily: M, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, "+ " + T("Partager", "Share"))) : null;
    if (!partages.length) return h("div", null, bouton, vide(T("Aucun partage pour l'instant. Partage un article, un lien ou une ressource utile à l'équipe.", "No shares yet.")));
    return h("div", null, bouton, h("div", { style: { marginTop: 6 } }, partages.map(cartePartage)));
  }

  /* ═════════ « + PARTAGER » (onglet Théorie, 05/11 soir) ═════════
     On colle une adresse : article Hype (2hype.fr/#a=…) → titre, image, résumé et catégorie lus dans l'appli, on garde
     l'adresse et la page s'ouvre dans Hype ; lien externe → aperçu lu par le serveur (netlify/functions/apercu-lien.js),
     carte de secours (nom du site) si le site ne donne rien. Un commentaire facultatif ; le nom de qui partage est gardé. */
  var _pa = React.useState(false); var partageOuvert = _pa[0], setPartageOuvert = _pa[1];
  var _pu = React.useState(""); var pUrl = _pu[0], setPUrl = _pu[1];
  var _pt = React.useState("lien"); var pType = _pt[0], setPType = _pt[1];
  var _pc = React.useState(""); var pCom = _pc[0], setPCom = _pc[1];
  var _pv = React.useState(null); var pApercu = _pv[0], setPApercu = _pv[1];      /* { titre, image, resume, categorie, site, secours } */
  var _pe = React.useState(""); var pEtat = _pe[0], setPEtat = _pe[1];            /* "" | "lecture" | "envoi" | "fini" | message d'erreur */
  function ouvrirPartager() { setPUrl(""); setPType("lien"); setPCom(""); setPApercu(null); setPEtat(""); setPartageOuvert(true); }
  function urlPropre(u) { u = String(u || "").trim(); if (u && !/^https?:\/\//i.test(u) && /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(u)) u = "https://" + u; return u; }
  function estVideoExterne(u) { return /(youtube\.com|youtu\.be|vimeo\.com|tiktok\.com|instagram\.com\/reel)/i.test(u); }
  async function lireApercu(brut) {
    var u = urlPropre(brut);
    if (!/^https?:\/\/[^\s]+\.[^\s]+/i.test(u)) { setPApercu(null); return; }
    var ah = articleHypeDe(u);
    if (ah) {
      var a = ah.art, img = (typeof a.tuile === "string" && /^(images\/|https?:)/.test(a.tuile)) ? a.tuile : "";
      setPType("article_hype");
      setPApercu({ titre: tr(a.titre) || "", image: img, resume: tr(a.extrait) || "", categorie: a.categorie || "", site: "Hype" });
      return;
    }
    setPType(estVideoExterne(u) ? "video" : (pType === "article_hype" ? "lien" : pType));
    setPEtat("lecture");
    try {
      var hd = { "Content-Type": "application/json" };
      try { var se = await supa.auth.getSession(); var jt = se && se.data && se.data.session && se.data.session.access_token; if (jt) hd.Authorization = "Bearer " + jt; } catch (eS) { }
      var r = await fetch("/.netlify/functions/apercu-lien", { method: "POST", headers: hd, body: JSON.stringify({ url: u }) });
      var d = await r.json().catch(function () { return null; });
      var site = ""; try { site = new URL(u).hostname.replace(/^www\./, ""); } catch (e) { }
      setPApercu(d && d.ok ? { titre: d.titre || "", image: d.image || "", resume: d.resume || "", site: d.site || site, secours: !!d.secours } : { titre: "", image: "", resume: "", site: site, secours: true });
    } catch (eA) {
      var s2 = ""; try { s2 = new URL(u).hostname.replace(/^www\./, ""); } catch (e) { }
      setPApercu({ titre: "", image: "", resume: "", site: s2, secours: true });
    }
    setPEtat("");
  }
  React.useEffect(function () {
    if (!partageOuvert) return;
    var t = setTimeout(function () { lireApercu(pUrl); }, 500);
    return function () { clearTimeout(t); };
  }, [pUrl, partageOuvert]);
  async function publierPartage() {
    var u = urlPropre(pUrl);
    if (!u || !groupe || !moi) return;
    setPEtat("envoi");
    var ap = pApercu || {};
    var r = await supa.from("team_partages").insert({ groupe_id: groupe.id, type: pType, url: u, titre: ap.titre || null, image: ap.image || null, resume: ap.resume || null, categorie: ap.categorie || null, commentaire: pCom.trim() || null, auteur_id: moi.id });
    if (r && r.error) { setPEtat(T("Le partage n'a pas pu être enregistré : ", "Could not share: ") + (r.error.message || r.error)); return; }
    setPEtat("fini"); setRev(function (n) { return n + 1; });
  }
  var fenetrePartage = null;
  if (partageOuvert) {
    var ap = pApercu, envoi = pEtat === "envoi";
    var pret = !!urlPropre(pUrl) && /^https?:\/\/[^\s]+\.[^\s]+/i.test(urlPropre(pUrl)) && pEtat !== "lecture";
    var TYPES = [["lien", T("Article", "Article")], ["video", T("Vidéo", "Video")], ["ressource", T("Ressource", "Resource")]];
    fenetrePartage = h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", dir: rtl ? "rtl" : "ltr", style: { position: "fixed", inset: 0, zIndex: 9000, background: NOIR, fontFamily: M, color: IV, overflowY: "auto" } },
      h("div", { style: { maxWidth: 620, margin: "0 auto", padding: "calc(env(safe-area-inset-top) + 16px) 20px calc(env(safe-area-inset-bottom) + 28px)" } },
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
          h("div", null,
            h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: CH } }, (groupe && groupe.nom) || ""),
            h("div", { style: { fontFamily: SERIF, fontSize: 24, marginTop: 2 } }, T("Partager avec l'équipe", "Share with the team"))),
          h("button", { type: "button", disabled: envoi, onClick: function () { setPartageOuvert(false); }, "aria-label": T("Fermer", "Close"), style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IV, fontSize: 15, cursor: "pointer" } }, "\u2715")),
        h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 30, margin: "6px 0 10px", transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
        pEtat === "fini" ? h("div", { style: { textAlign: "center", padding: "30px 0" } },
            h("div", { style: { fontFamily: SERIF, fontSize: 22 } }, T("Partagé avec l'équipe.", "Shared with the team.")),
            h("button", { type: "button", onClick: function () { setPartageOuvert(false); }, style: { marginTop: 20, minHeight: 44, padding: "0 26px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Fermer", "Close")))
        : h("div", null,
          h("label", { htmlFor: "tp-url", style: { display: "block", fontSize: 12.5, color: IV3, marginBottom: 6 } }, T("Colle l'adresse de l'article, de la vidéo ou de la page", "Paste the address of the article, video or page")),
          h("input", { id: "tp-url", type: "url", inputMode: "url", autoCapitalize: "off", autoCorrect: "off", value: pUrl, disabled: envoi, onChange: function (e) { setPUrl(e.target.value); }, placeholder: "https://…",
            style: { width: "100%", boxSizing: "border-box", minHeight: 46, padding: "0 2px", border: "none", borderBottom: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 16, outline: "none" } }),
          /* aperçu */
          pEtat === "lecture" ? h("div", { style: { fontSize: 12, color: IV3, marginTop: 16 } }, T("Lecture de l'aperçu…", "Reading preview…"))
          : ap ? h("div", { style: { display: "flex", gap: 12, marginTop: 18, padding: 12, borderRadius: 14, border: "1px solid " + CH3 } },
              h("div", { style: { width: 96, flex: "0 0 96px", aspectRatio: "16 / 11", borderRadius: 10, overflow: "hidden", background: PAN, display: "flex", alignItems: "center", justifyContent: "center", color: CH, fontFamily: SERIF, fontSize: 24 } },
                ap.image ? h("img", { src: ap.image, alt: "", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } }) : "\u2726"),
              h("div", { style: { minWidth: 0, flex: 1 } },
                h("div", { style: { fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: CH } }, pType === "article_hype" ? (T("Article Hype", "Hype article") + (ap.categorie ? " · " + ap.categorie : "")) : (ap.site || "")),
                h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 3 } }, ap.titre || (ap.site ? T("Lien vers ", "Link to ") + ap.site : urlPropre(pUrl))),
                ap.resume ? h("div", { dir: "auto", style: { fontSize: 11.5, color: IV2, marginTop: 4, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" } }, ap.resume)
                  : ap.secours ? h("div", { style: { fontSize: 11, color: IV3, marginTop: 4 } }, T("Ce site ne donne pas d'aperçu : le lien sera partagé tel quel.", "No preview from this site: the link will be shared as is.")) : null))
          : null,
          /* type (sauf article Hype, reconnu tout seul) */
          pType === "article_hype" ? null : h("div", { style: { display: "flex", gap: 8, marginTop: 18 } }, TYPES.map(function (t) {
            var on = pType === t[0];
            return h("button", { key: t[0], type: "button", disabled: envoi, onClick: function () { setPType(t[0]); }, style: { flex: 1, minHeight: 40, borderRadius: 12, border: "1px solid " + (on ? CH : "rgba(243,238,228,0.12)"), background: on ? "linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95))" : "rgba(16,26,29,.45)", color: on ? IV : IV2, fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, t[1]);
          })),
          h("div", { style: { display: "flex", alignItems: "center", gap: 12, minHeight: 50, borderBottom: "1px solid " + CH3, marginTop: 14 } },
            h("label", { htmlFor: "tp-com", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, T("Un mot ?", "A word?")),
            h("input", { id: "tp-com", value: pCom, disabled: envoi, onChange: function (e) { setPCom(e.target.value); }, placeholder: T("Facultatif", "Optional"), style: { flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: IV, fontFamily: M, fontSize: 16, textAlign: "end" } })),
          (pEtat && pEtat !== "lecture" && pEtat !== "envoi") ? h("div", { role: "alert", style: { marginTop: 14, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", color: "#FF9B9B", fontSize: 12.5 } }, pEtat) : null,
          h("button", { type: "button", disabled: !pret || envoi, onClick: publierPartage, style: { width: "100%", marginTop: 22, minHeight: 48, borderRadius: 999, border: "1px solid " + (pret ? CH : "rgba(243,238,228,0.14)"), background: "transparent", color: pret ? IV : IV3, fontFamily: M, fontSize: 14, fontWeight: 600, cursor: pret && !envoi ? "pointer" : "default" } },
            envoi ? "…" : T("Partager avec l'équipe", "Share with the team")))));
  }

  /* ───────── ÉPINGLES HB : épingles Hey Baby partagées avec le groupe ───────── */
  var _ouv = React.useState(null); var epOuverte = _ouv[0], setEpOuverte = _ouv[1];
  function carteEpingle(e) {
    var ouv = epOuverte === e.id, qui = profilsParId[e.partage_par];
    return h("div", { key: "ep" + e.id, style: { padding: "14px 0", borderTop: "1px solid rgba(243,238,228,0.06)" } },
      h("button", { type: "button", onClick: function () { setEpOuverte(ouv ? null : e.id); }, style: { width: "100%", background: "none", border: "none", padding: 0, color: IV, textAlign: "start", cursor: "pointer" } },
        h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: CH } }, e.cheval_nom ? T("Hey Baby · ", "Hey Baby · ") + e.cheval_nom : "Hey Baby"),
        h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 3 } }, e.question || ""),
        h("div", { dir: "auto", style: { fontFamily: M, fontSize: 12, color: IV2, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-wrap", overflow: ouv ? "visible" : "hidden", display: ouv ? "block" : "-webkit-box", WebkitLineClamp: ouv ? "none" : 3, WebkitBoxOrient: "vertical" } }, e.reponse || ""),
        h("div", { style: { fontFamily: M, fontSize: 10.5, color: IV3, marginTop: 6 } }, T("Partagée par ", "Shared by ") + nomProfil(qui) + (ouv ? "" : " · " + T("Lire tout", "Read all")))));
  }
  function ongletEpingles() {
    if (epingles === null) return chargement();
    if (!epingles.length) return vide(T("Aucune épingle partagée avec l'équipe pour l'instant.", "No pins shared with the team yet."));
    return h("div", { style: { marginTop: 10 } }, epingles.map(carteEpingle));
  }

  /* ═════════ AJOUTER UNE VIDÉO (étape 4, 05/11) ═════════
     Deux sources : un fichier du téléphone (envoyé chez Mux par le même chemin que les albums : réservation de place
     côté serveur, trace videos_mux, envoi avec progression, attente « prête ») ou une vidéo déjà dans Hype
     (« Depuis mes vidéos » : aucune nouvelle vidéo chez Mux, juste une fiche de plus qui pointe dessus).
     Avant de publier, il faut avoir coché au moins une cavalière ET au moins un cheval (décision de Blandine).
     La vignette est recopiée dans les photos Hype : elle ne contient pas le code de lecture de la vidéo. */
  var _fs = React.useState("fichier"); var fSource = _fs[0], setFSource = _fs[1];
  var _ff = React.useState(null); var fFichier = _ff[0], setFFichier = _ff[1];
  var _fh = React.useState(null); var fHype = _fh[0], setFHype = _fh[1];
  var _fl = React.useState(null); var mesVideos = _fl[0], setMesVideos = _fl[1];
  var _fc = React.useState([]); var fCav = _fc[0], setFCav = _fc[1];
  var _fx = React.useState([]); var fCh = _fx[0], setFCh = _fx[1];
  var _ft = React.useState(""); var fTitre = _ft[0], setFTitre = _ft[1];
  var _fk = React.useState(""); var fConcours = _fk[0], setFConcours = _fk[1];
  var _fd = React.useState(""); var fDate = _fd[0], setFDate = _fd[1];
  var _fe = React.useState(""); var fDesc = _fe[0], setFDesc = _fe[1];
  var _fm = React.useState(false); var fSansSon = _fm[0], setFSansSon = _fm[1];   /* 06/11 : case « Sans le son » */
  var _fp = React.useState(null); var fEtat = _fp[0], setFEtat = _fp[1];   /* null | { etape, pct, texte, erreur } */
  function aujourdhui() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function ouvrirAjout(pre) {
    setFSource("fichier"); setFFichier(null); setFHype(null); setFTitre(""); setFConcours(""); setFDate(aujourdhui()); setFDesc(""); setFEtat(null); setFSansSon(false);
    setFCav((pre && pre.cav) ? pre.cav.slice() : []); setFCh((pre && pre.ch) ? pre.ch.slice() : []);
    setFeuilleCav(false);
    setAjout(pre || {});
  }
  function fermerAjout() { if (fEtat && fEtat.etape === "envoi") return; setAjout(null); }
  React.useEffect(function () {
    if (!ajout || fSource !== "hype" || mesVideos !== null || !moi) return;
    (async function () {
      try {
        var r = await supa.from("videos_mux").select("id, playback_id, nom, duree, created_at").eq("user_id", moi.id).eq("statut", "ready").not("playback_id", "is", null).order("created_at", { ascending: false }).limit(60);
        setMesVideos((r && !r.error && r.data) || []);
      } catch (e) { setMesVideos([]); }
    })();
  }, [ajout, fSource]);
  function basculer(liste, setListe, id) { setListe(liste.indexOf(id) === -1 ? liste.concat([id]) : liste.filter(function (x) { return x !== id; })); }

  async function copierVignette(playbackId) {
    try {
      var rep = await fetch("https://image.mux.com/" + playbackId + "/thumbnail.jpg?width=960&fit_mode=preserve&time=2");
      if (!rep.ok) return null;
      var b = await rep.blob();
      if (typeof envoyerPhoto !== "function") return null;
      var r = await envoyerPhoto(new File([b], "vignette-equipe.jpg", { type: "image/jpeg" }));
      return (r && !r.error && r.url) ? r.url : null;
    } catch (e) { return null; }
  }
  /* la vidéo est prête chez Mux : on crée la fiche d'équipe, ses cavalières et ses chevaux */
  async function creerFiche(playbackId, duree, videoMuxId, meta) {
    var media = (typeof hypeMuxUrlLecture === "function") ? hypeMuxUrlLecture(playbackId) : ("https://stream.mux.com/" + playbackId + ".m3u8");
    var vign = await copierVignette(playbackId);
    var r = await supa.from("team_videos").insert({ groupe_id: meta.groupe, media: media, video_mux_id: videoMuxId || null, vignette: vign, duree: duree || null,
      titre: meta.titre || null, description: meta.description || null, concours: meta.concours || null, date_video: meta.date || null, sans_son: !!meta.sansSon, auteur_id: moi.id }).select("id").single();
    if (r && r.error) {
      var msg = String(r.error.message || r.error);
      if (/duplicate|unique/i.test(msg)) throw new Error(T("Cette vidéo est déjà dans la vidéothèque de l'équipe.", "This video is already in the team library."));
      throw new Error(msg);
    }
    var id = r && r.data && r.data.id;
    if (!id) throw new Error(T("la base n'a pas confirmé l'ajout", "not confirmed"));
    var rc = await supa.from("team_videos_cavaliers").insert(meta.cav.map(function (u) { return { video_id: id, user_id: u }; }));
    var rh = await supa.from("team_videos_chevaux").insert(meta.ch.map(function (c) { return { video_id: id, cheval_id: c }; }));
    if ((rc && rc.error) || (rh && rh.error)) {
      try { await supa.from("team_videos").delete().eq("id", id); } catch (eD) { }
      throw new Error(String(((rc && rc.error) || (rh && rh.error)).message || T("rattachement refusé", "link refused")));
    }
    return id;
  }
  /* envois commencés mais pas encore prêts (application fermée, vidéo longue) : repris à l'ouverture de la page */
  var CLE_ATTENTE = "hype_team_videos_attente";
  function lireAttente() { try { return JSON.parse(localStorage.getItem(CLE_ATTENTE) || "[]") || []; } catch (e) { return []; } }
  function ecrireAttente(l) { try { localStorage.setItem(CLE_ATTENTE, JSON.stringify(l)); } catch (e) { } }
  React.useEffect(function () {
    if (!moi || !groupe) return;
    var l = lireAttente().filter(function (x) { return x.user === moi.id && x.meta && x.meta.groupe === groupe.id; });
    if (!l.length) return;
    (async function () {
      var fini = false;
      for (var i = 0; i < l.length; i++) {
        try {
          var st = await hypeMuxAppel({ action: "status", upload_id: l[i].upload }, 20);
          if (st && st.data && st.data.playback_id) {
            try { await creerFiche(st.data.playback_id, st.data.duration || null, l[i].muxId || null, l[i].meta); } catch (eF) { }
            try { await hypeVideoTraceMaj(l[i].upload, { statut: "ready", playback_id: st.data.playback_id }, "pasReady"); } catch (eT) { }
            ecrireAttente(lireAttente().filter(function (x) { return x.upload !== l[i].upload; })); fini = true;
          } else if (st && st.data && typeof hypeMuxStatutTermine === "function" && hypeMuxStatutTermine(st.data.status)) {
            ecrireAttente(lireAttente().filter(function (x) { return x.upload !== l[i].upload; }));
          }
        } catch (eS) { }
      }
      if (fini) setRev(function (n) { return n + 1; });
    })();
  }, [moi && moi.id, groupe && groupe.id]);

  var fPret = (fSource === "fichier" ? !!fFichier : !!fHype) && fCav.length > 0 && fCh.length > 0;
  async function publier() {
    if (!fPret || !groupe || !moi) return;
    var meta = { groupe: groupe.id, titre: null, concours: null, date: aujourdhui(), description: fDesc.trim(), cav: fCav.slice(), ch: fCh.slice(), sansSon: !!fSansSon };
    try {
      if (fSource === "hype") {
        setFEtat({ etape: "envoi", pct: 100, texte: T("Ajout à la vidéothèque…", "Adding…") });
        await creerFiche(fHype.playback_id, fHype.duree, fHype.id, meta);
      } else {
        setFEtat({ etape: "envoi", pct: 0, texte: T("Préparation de l'envoi…", "Preparing…") });
        var rCr = await hypeMuxAppel({ cible: "team:" + groupe.id }, 25);
        if (!rCr || rCr.error || !rCr.data || !rCr.data.url || !rCr.data.upload_id) {
          var refus = String((rCr && rCr.error) || "");
          throw new Error(/plafond|autoris|quota/i.test(refus) ? T("Tu as atteint ton nombre maximum de vidéos.", "Video limit reached.") : (T("Envoi refusé : ", "Upload refused: ") + (refus || "?")));
        }
        var upId = String(rCr.data.upload_id);
        var rTr = await hypeVideoTraceMaj(upId, { destination_type: "team", destination_id: String(groupe.id), nom: fFichier.name }, null);
        if (!rTr || rTr.error) throw new Error(T("Suivi de l'envoi impossible, rien n'a été envoyé.", "Tracking failed, nothing was sent."));
        var rUp = await hypeMuxEnvoyerFichier(rCr.data.url, fFichier, function (pct) { setFEtat({ etape: "envoi", pct: pct, texte: T("Envoi de la vidéo… ", "Uploading… ") + pct + " %" }); });
        if (rUp && rUp.error) { try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: "envoi : " + rUp.error }, "pasReady"); } catch (e2) { } throw new Error(T("Envoi interrompu : ", "Upload stopped: ") + rUp.error); }
        try { await hypeVideoTraceMaj(upId, { statut: "processing" }, "pasReady"); } catch (e3) { }
        var muxId = null; try { var rm = await supa.from("videos_mux").select("id").eq("upload_id", upId).maybeSingle(); muxId = rm && rm.data && rm.data.id; } catch (e4) { }
        setFEtat({ etape: "envoi", pct: 100, texte: T("Vidéo reçue, Mux la prépare…", "Received, processing…") });
        var rSt = await hypeMuxAttendrePret(upId);
        if (rSt && rSt.playback_id) {
          await creerFiche(rSt.playback_id, rSt.duree, muxId, meta);
          try { await hypeVideoTraceMaj(upId, { statut: "ready", playback_id: rSt.playback_id, duree: rSt.duree || null }, "pasReady"); } catch (e5) { }
        } else if (rSt && rSt.errored) {
          try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: String(rSt.error || "Mux") }, "pasReady"); } catch (e6) { }
          throw new Error(T("Mux n'a pas pu préparer cette vidéo.", "Mux could not process this video."));
        } else {
          ecrireAttente(lireAttente().concat([{ user: moi.id, upload: upId, muxId: muxId, meta: meta }]));
          setFEtat({ etape: "fini", texte: T("La vidéo est bien envoyée. Elle est encore en préparation : elle apparaîtra ici dans quelques minutes.", "Uploaded. Still processing: it will appear in a few minutes.") });
          return;
        }
      }
      setFEtat({ etape: "fini", texte: T("Vidéo ajoutée à la vidéothèque de l'équipe.", "Video added to the team library.") });
      setRev(function (n) { return n + 1; });
    } catch (eP) {
      setFEtat({ etape: "erreur", texte: String((eP && eP.message) || eP) });
    }
  }

  /* 05/11 soir — formulaire simplifié (mélange des propositions 2 et 6, validé par Blandine) :
     la vidéo en grand en haut, « Cavalière » en ligne de fiche (feuille de choix qui monte), les chevaux en petites
     tuiles photo, « Un mot ? » facultatif, la phrase de vérification, Publier. Plus de titre / concours / date à remplir :
     la date du jour est prise toute seule, et la vidéothèque affiche « cheval · date » sous chaque vignette. */
  var _fsh = React.useState(false); var feuilleCav = _fsh[0], setFeuilleCav = _fsh[1];
  var _fu = React.useState(""); var fApercu = _fu[0], setFApercu = _fu[1];
  React.useEffect(function () {
    if (!fFichier) { setFApercu(""); return; }
    var u = ""; try { u = URL.createObjectURL(fFichier); } catch (e) { u = ""; }
    setFApercu(u);
    return function () { try { if (u) URL.revokeObjectURL(u); } catch (e) { } };
  }, [fFichier]);
  var LIGNE = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, minHeight: 50, borderBottom: "1px solid " + CH3 };
  var formulaireAjout = null;
  if (ajout) {
    var envoiEnCours = fEtat && fEtat.etape === "envoi";
    var idsCh = chevauxEquipe.slice(); fCh.forEach(function (c) { if (idsCh.indexOf(c) === -1) idsCh.push(c); });
    idsCh.sort(function (a, b) { var d = (fCh.indexOf(b) !== -1) - (fCh.indexOf(a) !== -1); return d || nomCheval(a).localeCompare(nomCheval(b)); });
    var aVideo = fSource === "fichier" ? !!fFichier : !!fHype;
    var resume = (fCav.length && fCh.length) ? fCav.map(function (u) { return nomProfil(profilsParId[u]); }).join(", ") + " " + T("sur", "on") + " " + fCh.map(nomCheval).join(", ") : "";
    var dureeChoisie = fSource === "hype" && fHype ? duree(fHype.duree) : "";

    /* haut : la vidéo choisie en grand, ou une grande zone pour la choisir */
    var haut = aVideo
      ? h("div", { style: { position: "relative", height: "clamp(210px, 56vw, 320px)", background: PAN } },
          fSource === "fichier"
            ? h("video", { src: fApercu || undefined, muted: true, playsInline: true, preload: "metadata", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : h("img", { src: "https://image.mux.com/" + fHype.playback_id + "/thumbnail.jpg?width=900&fit_mode=preserve&time=2", alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
          h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,8,.35), rgba(7,10,8,.05) 40%, " + NOIR + " 98%)" } }),
          h("div", { style: { position: "absolute", insetInlineStart: 20, insetInlineEnd: 20, bottom: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" } },
            h("span", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: CH } }, T("Ta vidéo", "Your video") + (dureeChoisie ? " · " + dureeChoisie : "")),
            h("button", { type: "button", disabled: envoiEnCours, onClick: function () { setFFichier(null); setFHype(null); }, style: { background: "none", border: "none", padding: "6px 0", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } }, T("Changer", "Change"))))
      : h("div", { style: { padding: "calc(env(safe-area-inset-top) + 72px) 20px 8px" } },
          fSource === "fichier"
            ? h("label", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, height: 168, borderRadius: 18, border: "1px dashed " + CH2, cursor: "pointer" } },
                h("span", { style: { color: CH, fontSize: 30, lineHeight: 1 } }, "+"),
                h("span", { style: { fontSize: 13, color: IV } }, T("Choisir une vidéo", "Choose a video")),
                h("span", { style: { fontSize: 11, color: IV3 } }, T("3 minutes au plus", "3 minutes max")),
                h("input", { type: "file", accept: "video/*", onChange: async function (e) { var f = e.target.files && e.target.files[0]; try { if (typeof hypeVerifierQualiteMedia === "function") f = await hypeVerifierQualiteMedia(f); } catch (eTq) { }   /* 06/11 : Titi, jamais bloquant */ setFFichier(f || null); }, style: { display: "none" } }))
            : (mesVideos === null ? vide(T("Chargement…", "Loading…"))
              : !mesVideos.length ? vide(T("Tu n'as pas encore de vidéo dans Hype.", "No Hype videos yet."))
              : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 } }, mesVideos.slice(0, 12).map(function (mv) {
                  return h("button", { key: "mv" + mv.id, type: "button", onClick: function () { setFHype(mv); }, style: { padding: 0, background: "none", border: "none", cursor: "pointer" } },
                    h("div", { style: { aspectRatio: "16 / 10", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(243,238,228,0.1)", background: PAN } },
                      h("img", { src: "https://image.mux.com/" + mv.playback_id + "/thumbnail.jpg?width=300&fit_mode=preserve", alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })),
                    h("div", { style: { fontSize: 10, marginTop: 4, color: IV3, textAlign: "start" } }, dateCourte(mv.created_at)));
                }))),
          h("button", { type: "button", onClick: function () { setFSource(fSource === "fichier" ? "hype" : "fichier"); }, style: { display: "block", margin: "12px auto 0", background: "none", border: "none", padding: "6px 0", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } },
            fSource === "fichier" ? T("ou choisir parmi mes vidéos Hype", "or pick from my Hype videos") : T("ou choisir sur mon téléphone", "or pick from my phone")));

    var tuilesChevaux = !idsCh.length ? h("div", { style: { fontSize: 11.5, color: IV3, padding: "6px 0" } }, T("Aucun cheval dans l'équipe : ajoute-les depuis la page Team.", "No horses in the team yet."))
      : h("div", { "data-hscroll": "1", "data-noswipe": "1", style: { display: "flex", gap: 8, overflowX: "auto", margin: "0 -20px", padding: "0 20px 4px", scrollbarWidth: "none" } }, idsCh.map(function (c) {
          var on = fCh.indexOf(c) !== -1, ch = chevauxParId[c];
          return h("button", { key: "tx" + c, type: "button", "aria-pressed": on, onClick: function () { if (!envoiEnCours) basculer(fCh, setFCh, c); },
            style: { position: "relative", flex: "0 0 72px", height: 90, padding: 0, borderRadius: 12, overflow: "hidden", border: on ? "1.5px solid " + CH : "1px solid rgba(243,238,228,0.1)", background: PAN, opacity: (fCh.length && !on) ? 0.55 : 1, cursor: "pointer" } },
            (ch && ch.photo_url) ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ch.photo_url, 160, 200) : ch.photo_url, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
              : h("div", { style: { height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 30, color: CH } }, nomCheval(c).charAt(0)),
            h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 6px 5px", background: "linear-gradient(180deg, transparent, rgba(7,10,8,.94))", fontSize: 9.5, lineHeight: 1.15, color: IV, textAlign: "start" } }, nomCheval(c)),
            on ? h("span", { style: { position: "absolute", top: 5, insetInlineEnd: 5, width: 16, height: 16, borderRadius: "50%", background: NOIR, border: "1px solid " + CH, display: "flex", alignItems: "center", justifyContent: "center" } },
              h("svg", { width: 9, height: 8, viewBox: "0 0 9 8", "aria-hidden": "true" }, h("path", { d: "M1 4l2.4 2.4L8 1.5", fill: "none", stroke: CH, strokeWidth: 1.4 }))) : null);
        }));

    /* feuille « Qui monte ? » */
    var feuille = !feuilleCav ? null : h("div", { style: { position: "absolute", inset: 0, zIndex: 3 } },
      h("div", { onClick: function () { setFeuilleCav(false); }, style: { position: "absolute", inset: 0, background: "rgba(7,10,8,0.7)" } }),
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "72%", display: "flex", flexDirection: "column", background: NOIR, borderRadius: "24px 24px 0 0", borderTop: "1px solid " + CH3, padding: "12px 20px calc(env(safe-area-inset-bottom) + 16px)" } },
        h("div", { style: { width: 40, height: 4, borderRadius: 2, background: "rgba(243,238,228,0.2)", margin: "0 auto 14px" } }),
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          h("div", { style: { fontFamily: SERIF, fontSize: 26 } }, T("Qui monte ?", "Who is riding?")),
          h("button", { type: "button", onClick: function () { setFeuilleCav(false); }, style: { background: "none", border: "none", minHeight: 40, padding: "0 4px", color: CH, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, "OK")),
        h("div", { style: { fontSize: 11.5, color: IV3, margin: "4px 0 8px" } }, T("Une ou plusieurs cavalières", "One or more riders")),
        h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch" } }, (membres || []).slice().sort(function (a, b) { return nomProfil(a).localeCompare(nomProfil(b)); }).map(function (p) {
          var on = fCav.indexOf(p.id) !== -1;
          return h("button", { key: "fc" + p.id, type: "button", "aria-pressed": on, onClick: function () { basculer(fCav, setFCav, p.id); },
            style: { width: "100%", display: "flex", alignItems: "center", gap: 12, minHeight: 52, background: "none", border: "none", borderBottom: "1px solid rgba(243,238,228,0.06)", padding: 0, color: IV, fontFamily: M, fontSize: 14, textAlign: "start", cursor: "pointer" } },
            avatar(p, 36), h("span", { dir: "auto", style: { flex: 1 } }, nomProfil(p)),
            h("span", { style: { width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (on ? CH : "rgba(243,238,228,0.2)"), background: on ? "radial-gradient(circle, " + CH + " 0 4px, transparent 5px)" : "transparent" } }));
        }))));

    formulaireAjout = h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", dir: rtl ? "rtl" : "ltr",
      style: { position: "fixed", inset: 0, zIndex: 9000, background: NOIR, fontFamily: M, color: IV } },
      h("div", { style: { position: "absolute", inset: 0, overflowY: "auto", WebkitOverflowScrolling: "touch" } },
        h("div", { style: { maxWidth: 620, margin: "0 auto", position: "relative" } },
          /* titre et fermeture, posés sur le haut */
          h("div", { style: { position: "absolute", zIndex: 2, top: "calc(env(safe-area-inset-top) + 14px)", insetInlineStart: 18, insetInlineEnd: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
            h("div", null,
              h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: CH } }, (groupe && groupe.nom) || ""),
              h("div", { style: { fontFamily: SERIF, fontSize: 22, marginTop: 2 } }, T("Ajouter une vidéo", "Add a video"))),
            h("button", { type: "button", onClick: fermerAjout, disabled: envoiEnCours, "aria-label": T("Fermer", "Close"), style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.2)", background: "rgba(7,10,8,0.5)", color: IV, fontSize: 15, cursor: "pointer", opacity: envoiEnCours ? 0.4 : 1 } }, "✕")),
          fEtat && fEtat.etape === "fini"
            ? h("div", { style: { padding: "calc(env(safe-area-inset-top) + 110px) 24px 40px", textAlign: "center" } },
                h("div", { style: { fontFamily: SERIF, fontSize: 24, lineHeight: 1.25 } }, fEtat.texte),
                h("button", { type: "button", onClick: function () { setAjout(null); }, style: { marginTop: 22, minHeight: 44, padding: "0 26px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Fermer", "Close")))
            : h("div", null,
                haut,
                h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 36, marginTop: -8, position: "relative", transform: rtl ? "scaleX(-1)" : "none" } },
                  h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
                h("div", { style: { padding: "0 20px calc(env(safe-area-inset-bottom) + 28px)" } },
                  /* cavalière */
                  h("button", { type: "button", disabled: envoiEnCours, onClick: function () { setFeuilleCav(true); }, style: Object.assign({}, LIGNE, { width: "100%", background: "none", borderTop: "none", borderInlineStart: "none", borderInlineEnd: "none", padding: 0, color: IV, fontFamily: M, cursor: "pointer" }) },
                    h("span", { style: { fontSize: 12.5, color: IV3 } }, T("Cavalière", "Rider")),
                    h("span", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } },
                      fCav.slice(0, 2).map(function (u) { return h("span", { key: "a" + u, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500 } }, avatar(profilsParId[u] || { pseudo: "?" }, 28), nomProfil(profilsParId[u])); }),
                      fCav.length > 2 ? h("span", { style: { fontSize: 12, color: IV2 } }, "+" + (fCav.length - 2)) : null,
                      h("span", { style: { color: CH, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" } }, fCav.length ? T("+ Ajouter", "+ Add") : T("Choisir", "Choose")))),
                  /* cheval */
                  h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "16px 0 10px" } },
                    h("span", { style: { fontSize: 12.5, color: IV3 } }, T("Cheval", "Horse")),
                    h("span", { style: { fontSize: 10.5, color: IV3 } }, T("un ou plusieurs", "one or more"))),
                  tuilesChevaux,
                  /* un mot */
                  h("div", { style: Object.assign({}, LIGNE, { marginTop: 14 }) },
                    h("label", { htmlFor: "tv-desc", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, T("Un mot ?", "A word?")),
                    h("input", { id: "tv-desc", value: fDesc, disabled: envoiEnCours, onChange: function (e) { setFDesc(e.target.value); }, placeholder: T("Facultatif", "Optional"),
                      style: { flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: IV, fontFamily: M, fontSize: 16, textAlign: "end" } })),
                  /* 06/11 — sans le son (la personne qui publie choisit ; elle pourra changer d'avis sur la vignette) */
                  h("button", { type: "button", role: "switch", "aria-checked": fSansSon, disabled: envoiEnCours, onClick: function () { setFSansSon(!fSansSon); },
                    style: Object.assign({}, LIGNE, { width: "100%", background: "none", borderTop: "none", borderInlineStart: "none", borderInlineEnd: "none", padding: 0, color: IV, fontFamily: M, cursor: "pointer", textAlign: "start" }) },
                    h("span", { style: { display: "flex", flexDirection: "column", gap: 2 } },
                      h("span", { style: { fontSize: 12.5, color: fSansSon ? IV : IV3 } }, T_SANS_SON()),
                      h("span", { style: { fontSize: 10.5, color: IV3 } }, T("Tu pourras le remettre plus tard.", "You can turn it back on later.", "Podrás volver a activarlo más tarde.", "Potrai riattivarlo più tardi.", "あとで元に戻せます。", "Du kannst ihn später wieder einschalten.", "يمكنك إعادة تشغيله لاحقًا.", "之后可以重新开启。", "Je kunt het later weer aanzetten.", "Dá para voltar a ativar depois.", "Du kan slå på det igen senare.", "Позже можно снова включить.", "Możesz go później włączyć.", "나중에 다시 켤 수 있어요."))),
                    h("span", { "aria-hidden": "true", style: { position: "relative", flex: "0 0 42px", width: 42, height: 24, borderRadius: 999, border: "1px solid " + (fSansSon ? CH : "rgba(243,238,228,0.25)"), background: "transparent", transition: "border-color .2s" } },
                      h("span", { style: { position: "absolute", top: 3, insetInlineStart: fSansSon ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: fSansSon ? CH : "rgba(243,238,228,0.35)", transition: "inset-inline-start .2s" } }))),
                  /* vérification et publication */
                  h("div", { style: { fontFamily: SERIF, fontSize: 20, lineHeight: 1.3, margin: "20px 0 12px", color: resume ? IV : IV3 } },
                    resume || (!aVideo ? T("Choisis ta vidéo, la cavalière et le cheval.", "Pick your video, the rider and the horse.") : T("Choisis la cavalière et le cheval.", "Pick the rider and the horse."))),
                  fEtat && fEtat.etape === "erreur" ? h("div", { role: "alert", style: { marginBottom: 12, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12.5, lineHeight: 1.45 } }, fEtat.texte) : null,
                  envoiEnCours ? h("div", { style: { marginBottom: 12 } },
                    h("div", { style: { fontSize: 12, color: IV2, marginBottom: 8 } }, fEtat.texte),
                    h("div", { style: { height: 3, borderRadius: 2, background: "rgba(243,238,228,0.1)", overflow: "hidden" } }, h("div", { style: { width: (fEtat.pct || 0) + "%", height: "100%", background: CH, transition: "width .3s" } })),
                    h("div", { style: { fontSize: 10.5, color: IV3, marginTop: 8 } }, T("Garde cette page ouverte pendant l'envoi.", "Keep this page open while uploading."))) : null,
                  h("button", { type: "button", disabled: !fPret || envoiEnCours, onClick: publier,
                    style: { width: "100%", minHeight: 48, borderRadius: 999, border: "1px solid " + (fPret ? CH : "rgba(243,238,228,0.14)"), background: "transparent", color: fPret ? IV : IV3, fontFamily: M, fontSize: 14, fontWeight: 600, letterSpacing: ".02em", cursor: fPret && !envoiEnCours ? "pointer" : "default" } },
                    envoiEnCours ? "…" : T("Publier dans la vidéothèque", "Publish to the library")))))),
      feuille);
  }

  /* ───────── message « réservée au groupe » ───────── */
  var calqueReserve = !reserve ? null : h("div", { role: "dialog", "aria-modal": "true", onClick: function (eF) { if (eF.target === eF.currentTarget) setReserve(false); },
    style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(7,10,8,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 max(24px, env(safe-area-inset-left))" } },
    h("div", { dir: rtl ? "rtl" : "ltr", style: { maxWidth: 340, width: "100%", background: PAN, border: "1px solid " + CH3, borderRadius: 18, padding: "26px 22px 20px", textAlign: "center" } },
      h("div", { style: { width: 44, height: 44, margin: "0 auto 14px", borderRadius: "50%", border: "1px solid " + CH2, display: "flex", alignItems: "center", justifyContent: "center" } },
        h("svg", { width: 15, height: 17, viewBox: "0 0 11 12", "aria-hidden": "true" }, h("rect", { x: 1.2, y: 5.2, width: 8.6, height: 6, rx: 1.2, fill: "none", stroke: CH, strokeWidth: 1 }), h("path", { d: "M3.2 5.2V3.6a2.3 2.3 0 0 1 4.6 0v1.6", fill: "none", stroke: CH, strokeWidth: 1 }))),
      h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IV, lineHeight: 1.2 } }, T("Désolé, cette vidéo est réservée aux cavaliers du groupe.", "Sorry, this video is for the group's riders only.")),
      h("button", { type: "button", onClick: function () { setReserve(false); }, style: { marginTop: 18, minHeight: 40, padding: "0 22px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Compris", "Got it"))));

  return h("div", { dir: rtl ? "rtl" : "ltr", lang: lg, style: { minHeight: "100vh", background: NOIR, color: IV, fontFamily: M, overflowX: "clip" } },
    h("div", { style: { maxWidth: 820, margin: "0 auto" } },
      hero,
      h("div", { style: { padding: "0 18px 24px" } },
        barreOnglets,
        erreur ? h("div", { style: { marginTop: 14, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", color: "#FF9B9B", fontSize: 12 } }, T("Impossible de charger : ", "Could not load: ") + erreur) : null,
        onglet === "videos" ? ongletVideos() : onglet === "theorie" ? ongletTheorie() : ongletEpingles())),
    (typeof caleBarreHype === "function") ? caleBarreHype() : null,
    calqueReserve,
    questionPub ? h("div", { role: "dialog", "aria-modal": "true", onClick: function (eF) { if (eF.target === eF.currentTarget) setQuestionPub(null); },
      style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(7,10,8,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 max(24px, env(safe-area-inset-left))" } },
      h("div", { dir: rtl ? "rtl" : "ltr", style: { maxWidth: 340, width: "100%", background: PAN, border: "1px solid " + CH3, borderRadius: 18, padding: "24px 22px 18px", textAlign: "center" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IV, lineHeight: 1.25 } },
          questionPub.publique ? T("Réserver cette vidéo à l'équipe ?", "Keep this video for the team only?") : T("Mettre cette vidéo en public ?", "Make this video public?")),
        h("div", { style: { fontFamily: M, fontSize: 12, color: IV2, lineHeight: 1.5, marginTop: 8 } },
          questionPub.publique ? T("Seuls les cavaliers du groupe et la coach pourront la regarder.", "Only the group's riders and the coach will be able to watch it.")
            : T("Tous les comptes Hype pourront la regarder, pas seulement l'équipe.", "Every Hype account will be able to watch it.")),
        h("div", { style: { display: "flex", gap: 10, marginTop: 18 } },
          h("button", { type: "button", onClick: function () { setQuestionPub(null); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid rgba(243,238,228,0.18)", background: "transparent", color: IV2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel")),
          h("button", { type: "button", onClick: confirmerPublique, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid " + CH, background: "transparent", color: CH, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, questionPub.publique ? T("Réserver", "Keep private") : T("Mettre en public", "Make public"))))) : null,
    formulaireAjout,
    fenetrePartage,
    (visu && typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(visu, function () { setVisu(null); }, { sansSon: visuMuet }) : null);
}
/* 05/11 soir — page « conseil Hey Baby partagé avec toi » (route epingle-partagee), ouverte depuis la notification.
   La base ne laisse lire l'épingle qu'à qui elle a été partagée (ou à son autrice). Lecture seule. */
function EcranEpinglePartagee() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var NOIR = "#070A08", PAN = "#101214", IV = "#F3EEE4", IV2 = "rgba(243,238,228,0.70)", IV3 = "rgba(243,238,228,0.42)", CH = "#C9A66B", CH3 = "rgba(201,166,107,0.22)";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',system-ui,sans-serif";
  var _e = React.useState(null); var ep = _e[0], setEp = _e[1];
  var _q = React.useState(""); var qui = _q[0], setQui = _q[1];
  var _r = React.useState(""); var err = _r[0], setErr = _r[1];
  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        var id = null; try { id = window.__epinglePartagee || null; } catch (e) { }
        if (!id || typeof supa === "undefined") { setErr("Ce conseil n'est plus disponible."); return; }
        var r = await supa.from("echanges_heybaby_epingles").select("id, question, reponse, cheval_nom, created_at, user_id").eq("id", id).maybeSingle();
        if (!vif) return;
        if (!r || r.error || !r.data) { setErr("Ce conseil n'est plus partagé avec toi."); return; }
        setEp(r.data);
        var rp = await supa.from("profiles").select("pseudo").eq("id", r.data.user_id).maybeSingle();
        if (vif && rp && rp.data) setQui(rp.data.pseudo || "");
      } catch (eL) { if (vif) setErr(String((eL && eL.message) || eL)); }
    })();
    return function () { vif = false; };
  }, []);
  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (e) { } setEcran("dashboard"); }
  return h("div", { style: { minHeight: "100vh", background: NOIR, color: IV, fontFamily: M } },
    h("div", { style: { maxWidth: 720, margin: "0 auto", padding: "calc(env(safe-area-inset-top) + 14px) 20px 40px" } },
      h("button", { type: "button", onClick: retour, "aria-label": "Retour", style: { width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "1px solid rgba(243,238,228,0.16)", color: IV, fontSize: 20, lineHeight: 1, cursor: "pointer" } }, "‹"),
      h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: CH, marginTop: 22 } }, "Hey Baby" + (ep && ep.cheval_nom ? " · " + ep.cheval_nom : "")),
      h("h1", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px, 9vw, 48px)", lineHeight: 1.05, margin: "6px 0 0" } }, "Un conseil pour toi"),
      h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 34, margin: "8px 0 4px" } }, h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
      err ? h("div", { style: { fontSize: 13, color: IV3, fontStyle: "italic", marginTop: 20 } }, err)
      : !ep ? h("div", { style: { fontSize: 12, color: IV3, fontStyle: "italic", marginTop: 20 } }, "Chargement…")
      : h("div", null,
          qui ? h("div", { style: { fontSize: 12, color: IV3, marginTop: 6 } }, "Partagé par " + qui) : null,
          ep.question ? h("div", { dir: "auto", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.35, marginTop: 22, color: IV } }, "« " + ep.question + " »") : null,
          h("div", { style: { marginTop: 18, padding: "18px 17px", borderRadius: 16, border: "1px solid " + CH3, background: PAN } },
            h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: CH, marginBottom: 10 } }, "Réponse de Hey Baby"),
            h("div", { dir: "auto", style: { fontSize: 14.5, lineHeight: 1.65, color: IV2, whiteSpace: "pre-wrap" } }, ep.reponse || "")))),
    (typeof caleBarreHype === "function") ? caleBarreHype() : null);
}
window.HypeTeamMedias = { Medias: EcranTeamMedias, Epingle: EcranEpinglePartagee, version: TM_VERSION };
})();
