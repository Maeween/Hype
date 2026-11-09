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
var TM_VERSION = 6;

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
  var _tr = React.useState([]); var tvRonds = _tr[0], setTvRonds = _tr[1];   /* 08/11 soir : ronds de la page vidéo */
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
      else setErreur(T("Tu ne peux pas changer cette vidéo.", "You can't change this video.", "No puedes cambiar este vídeo.", "Non puoi modificare questo video.", "この動画は変更できません。", "Du kannst dieses Video nicht ändern.", "لا يمكنك تغيير هذا الفيديو.", "你无法更改此视频。", "Je kunt deze video niet wijzigen.", "Não podes alterar este vídeo.", "Du kan inte ändra den här videon.", "Ты не можешь изменить это видео.", "Nie możesz zmienić tego filmu.", "이 동영상은 변경할 수 없어요."));
    } catch (e) { setErreur(String((e && e.message) || e)); }
    setChangePub("");
  }
  /* 06/11 — VIDÉO SANS LE SON (décision de Blandine : seule la personne qui a mis la vidéo en ligne choisit, à l'envoi
     puis plus tard si elle change d'avis). La base vérifie de toute façon (team_video_sans_son : auteur seulement). */
  var _vv = React.useState(null); var visuV = _vv[0], setVisuV = _vv[1];   /* 07/11 : id de la vidéo ouverte (page de lecture « B ») */
  var _vm = React.useState(false); var visuMuet = _vm[0], setVisuMuet = _vm[1];
  var _cs = React.useState(""); var changeSon = _cs[0], setChangeSon = _cs[1];
  /* 08/11 (Blandine « Ok continue ») : « Ajouter à une collection » depuis la page de lecture d'une vidéo de la Team */
  var _va = React.useState(""); var visuAdr = _va[0], setVisuAdr = _va[1];       /* adresse brute de la vidéo ouverte */
  var _ccl = React.useState(null); var colCibles = _ccl[0], setColCibles = _ccl[1];   /* pages (cavalier / cheval) que je peux ranger */
  var _fcl = React.useState(null); var feuilleCol = _fcl[0], setFeuilleCol = _fcl[1];
  var T_SANS_SON = function () { return T("Sans le son", "Without sound", "Sin sonido", "Senza audio", "音声なし", "Ohne Ton", "بدون صوت", "静音", "Zonder geluid", "Sem som", "Utan ljud", "Без звука", "Bez dźwięku", "소리 없이"); };
  async function basculerSon(v) {
    if (!v || !moi || v.auteur_id !== moi.id || changeSon) return;
    setChangeSon(v.id);
    try {
      var r = await supa.rpc("team_video_sans_son", { p_id: v.id, p_sans_son: !v.sans_son });
      if (r && !r.error && r.data === true) setVideos(function (l) { return (l || []).map(function (x) { return x.id === v.id ? Object.assign({}, x, { sans_son: !v.sans_son }) : x; }); });
      else setErreur(T("Tu ne peux pas changer cette vidéo.", "You can't change this video.", "No puedes cambiar este vídeo.", "Non puoi modificare questo video.", "この動画は変更できません。", "Du kannst dieses Video nicht ändern.", "لا يمكنك تغيير هذا الفيديو.", "你无法更改此视频。", "Je kunt deze video niet wijzigen.", "Não podes alterar este vídeo.", "Du kan inte ändra den här videon.", "Ты не можешь изменить это видео.", "Nie możesz zmienić tego filmu.", "이 동영상은 변경할 수 없어요."));
    } catch (e) { setErreur(String((e && e.message) || e)); }
    setChangeSon("");
  }
  /* 06/11 soir — CONCOURS ET LIEU D'UNE VIDÉO (Blandine : « ajouter le lieu et la date quand on met une vidéo en ligne, pour
     faire le lien avec les dates de concours », en option ; choix A puis B : on touche un concours de l'agenda de la Team, sinon
     « Autre » = date et lieu écrits ; la personne qui a posté peut corriger ensuite). La base vérifie (team_video_concours). */
  var _cq = React.useState([]); var concoursEquipe = _cq[0], setConcoursEquipe = _cq[1];
  var _fq = React.useState(null); var feuilleConc = _fq[0], setFeuilleConc = _fq[1];   /* null | { pour: "form" } | { pour: <vidéo> } */
  var _qa = React.useState(false); var concAutre = _qa[0], setConcAutre = _qa[1];
  var _qd = React.useState(""); var concDate = _qd[0], setConcDate = _qd[1];
  var _ql = React.useState(""); var concLieu = _ql[0], setConcLieu = _ql[1];
  var _qe = React.useState(""); var changeConc = _qe[0], setChangeConc = _qe[1];
  /* 07/11 (Blandine : « ajoute aussi le choix de l'épreuve en plus de celle du concours ») : après le concours, 2e étape « Quelle épreuve ? »
     — les épreuves des résultats de ce jour-là (d'abord celles des chevaux choisis), sinon on l'écrit ; on peut passer. */
  var _qv = React.useState(null); var concEv = _qv[0], setConcEv = _qv[1];          /* concours choisi, en attente de l'épreuve */
  var _qp = React.useState(null); var epreuvesConc = _qp[0], setEpreuvesConc = _qp[1];
  var _qx = React.useState(""); var concEpreuve = _qx[0], setConcEpreuve = _qx[1];
  React.useEffect(function () {
    if (!groupe) return;
    var vifQ = true;
    (async function () {
      try {
        var ra = await supa.from("agenda_groupes").select("agenda_id").eq("groupe_id", groupe.id);
        var ids = ((ra && ra.data) || []).map(function (x) { return x.agenda_id; }).filter(Boolean);
        if (!ids.length) { if (vifQ) setConcoursEquipe([]); return; }
        var auj = new Date(); var lim = auj.getFullYear() + "-" + String(auj.getMonth() + 1).padStart(2, "0") + "-" + String(auj.getDate()).padStart(2, "0");
        var re = await supa.from("club_agenda").select("id, titre, date_jour, lieu, type").in("id", ids.slice(0, 300)).eq("type", "concours").lte("date_jour", lim).order("date_jour", { ascending: false }).limit(15);
        if (vifQ) setConcoursEquipe((re && re.data) || []);
      } catch (eQ) { if (vifQ) setConcoursEquipe([]); }
    })();
    return function () { vifQ = false; };
  }, [groupe && groupe.id]);
  function libelleConc(c) {   /* « Lamotte · sam. 1 nov. » */
    if (!c) return "";
    return [c.lieu || c.titre || "", c.epreuve || "", dateCourte(c.date_jour || c.date || "")].filter(Boolean).join(" · ");
  }
  function ouvrirFeuilleConc(pour, actuel) {
    var autre = !!(actuel && !actuel.agenda_id && (actuel.lieu || actuel.autre));
    setConcAutre(autre); setConcDate((actuel && (actuel.date || actuel.date_video)) || aujourdhui()); setConcLieu(autre ? (actuel.lieu || "") : "");
    setConcEv(null); setEpreuvesConc(null); setConcEpreuve((actuel && actuel.epreuve) || ""); setConcRes((actuel && actuel.resultat) || "");
    setFeuilleConc({ pour: pour });
  }
  async function allerEpreuve(ev) {
    setConcEv(ev); setEpreuvesConc(null);
    var pour = feuilleConc && feuilleConc.pour;
    var chs = pour === "form" ? fCh.slice() : ((pour && pour.chevaux) || []);
    try {
      var r = await supa.rpc("team_epreuves_concours", { p_agenda: ev.id, p_chevaux: chs.length ? chs : null });
      setEpreuvesConc(((r && !r.error && r.data) || []).map(function (x) { return x.epreuve; }).filter(Boolean));
    } catch (eEp) { setEpreuvesConc([]); }
  }
  async function choisirConc(choix) {   /* choix : { ev } | { aucun: true } | { autre: true, date, lieu } */
    var pour = feuilleConc && feuilleConc.pour; setFeuilleConc(null);
    if (pour === "form") {
      setFConc(choix.aucun ? null : choix.ev ? { agenda_id: choix.ev.id, titre: choix.ev.titre, lieu: choix.ev.lieu, date: choix.ev.date_jour, epreuve: (choix.epreuve || "").trim() || null } : { autre: true, date: choix.date, lieu: choix.lieu, epreuve: (choix.epreuve || "").trim() || null });
      return;
    }
    var v = pour; if (!v || !moi || v.auteur_id !== moi.id) return;
    setChangeConc(v.id);
    try {
      var r = await supa.rpc("team_video_concours", { p_id: v.id, p_agenda_id: choix.ev ? choix.ev.id : null, p_date: choix.autre ? (choix.date || null) : null, p_lieu: choix.autre ? (choix.lieu || "") : "" });
      var epV = choix.aucun ? null : ((choix.epreuve || "").trim() || null);
      if (r && !r.error && r.data === true) { try { await supa.rpc("team_video_epreuve", { p_id: v.id, p_epreuve: epV || "" }); } catch (eEv) { } }
      if (r && !r.error && r.data === true) {
        var maj = choix.ev ? { agenda_id: choix.ev.id, concours: choix.ev.titre, lieu: choix.ev.lieu, date_video: choix.ev.date_jour || v.date_video }
          : choix.autre ? { agenda_id: null, concours: null, lieu: (choix.lieu || "").trim() || null, date_video: choix.date || v.date_video }
          : { agenda_id: null, concours: null, lieu: null };
        maj.epreuve = epV;
        setVideos(function (l) { return (l || []).map(function (x) { return x.id === v.id ? Object.assign({}, x, maj) : x; }); });
      } else setErreur(T("Tu ne peux pas changer cette vidéo.", "You can't change this video.", "No puedes cambiar este vídeo.", "Non puoi modificare questo video.", "この動画は変更できません。", "Du kannst dieses Video nicht ändern.", "لا يمكنك تغيير هذا الفيديو.", "你无法更改此视频。", "Je kunt deze video niet wijzigen.", "Não podes alterar este vídeo.", "Du kan inte ändra den här videon.", "Ты не можешь изменить это видео.", "Nie możesz zmienić tego filmu.", "이 동영상은 변경할 수 없어요."));
    } catch (eC) { setErreur(String((eC && eC.message) || eC)); }
    setChangeConc("");
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
        if (typeof supa === "undefined" || !supa) { setErreur(T("Hors ligne", "Offline", "Sin conexión", "Offline", "オフライン", "Offline", "غير متصل", "离线", "Offline", "Offline", "Offline", "Нет сети", "Offline", "오프라인")); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        /* le groupe : celui de la page Team qui a ouvert cette page, sinon la Team par défaut */
        var idG = null; try { idG = window.__teamMediasGroupe || null; } catch (eG) { }
        var rg = idG ? await supa.from("groupes").select("id, nom, cree_par, club_clef").eq("id", idG).maybeSingle()
          : ((typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id, nom, cree_par, club_clef") : null);
        var G = rg && rg.data;
        if (!G) throw new Error(T("équipe introuvable", "team not found", "equipo no encontrado", "squadra non trovata", "チームが見つかりません", "Team nicht gefunden", "الفريق غير موجود", "找不到团队", "team niet gevonden", "equipa não encontrada", "laget hittades inte", "команда не найдена", "nie znaleziono drużyny", "팀을 찾을 수 없어요"));
        if (vif) setGroupe(G);

        var rm = await supa.from("groupes_membres").select("user_id, ajoute_le").eq("groupe_id", G.id);
        var idsM = ((rm && rm.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);

        var rv = await supa.from("team_videos").select("id, groupe_id, vignette, duree, titre, description, concours, date_video, categorie, publique, sans_son, agenda_id, lieu, epreuve, resultat, auteur_id, cree_le").eq("groupe_id", G.id).order("date_video", { ascending: false, nullsFirst: false }).order("cree_le", { ascending: false });
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

  /* 09/11 : « Ajouter une vidéo » depuis la carte Médias d'une fiche concours → formulaire ouvert, concours déjà choisi */
  React.useEffect(function () {
    if (!videos) return;
    var c = null; try { c = window.__teamMediasAjout || null; window.__teamMediasAjout = null; } catch (e) { }
    if (!c) return;
    ouvrirAjout({});
    setFConc({ agenda_id: c.agenda_id, titre: c.titre, lieu: c.lieu, date: c.date, epreuve: null });
  }, [videos]);

  /* ouverture directe d'une vidéo demandée par le chapitre de la page Team */
  React.useEffect(function () {
    if (!videos) return;
    var id = null; try { id = window.__teamMediasOuvrir || null; window.__teamMediasOuvrir = null; } catch (e) { }
    if (!id) return;
    var v = videos.filter(function (x) { return x.id === id; })[0];
    if (v) lire(v);
  }, [videos]);

  React.useEffect(function () {
    setColCibles(null);
    if (!visuV || !moi || typeof supa === "undefined" || !supa) return;
    var v = (videos || []).filter(function (x) { return x.id === visuV; })[0]; if (!v) return;
    var vifCc = true;
    (async function () {
      var cands = [];
      (v.cavaliers || []).forEach(function (u) { var pp = profilsParId[u]; cands.push({ cible: "cavalier:" + u, nom: pp ? nomProfil(pp) : "" }); });
      (v.chevaux || []).forEach(function (c) { cands.push({ cible: "cheval:" + c, nom: nomCheval(c) }); });
      var ok = [];
      for (var i = 0; i < cands.length; i++) {
        try { var r = await supa.rpc("hype_peut_gerer_collections", { p_cible: cands[i].cible }); if (r && !r.error && r.data === true) ok.push(cands[i]); } catch (eC) { }
      }
      if (vifCc) setColCibles(ok);
    })();
    return function () { vifCc = false; };
  }, [visuV, moi && moi.id]);
  async function ouvrirFeuilleCol(v) {
    var url = visuAdr; if (!url || !colCibles || !colCibles.length) return;
    var nomDef = String(v.concours || v.lieu || "").trim().slice(0, 60);
    var cib = [];
    for (var i = 0; i < colCibles.length; i++) {
      var rL = (typeof listerCollectionsVideos === "function") ? await listerCollectionsVideos(colCibles[i].cible) : { data: [] };
      var cols = (rL && rL.data) || [];
      var dedans = cols.filter(function (c) { return (Array.isArray(c.videos) ? c.videos : []).indexOf(url) >= 0; })[0];
      cib.push({ cible: colCibles[i].cible, nom: colCibles[i].nom, cols: cols, avant: dedans ? dedans.id : "", choix: dedans ? dedans.id : "", nouvNom: nomDef });
    }
    setFeuilleCol({ v: v, url: url, cib: cib, busy: false, err: "", fait: false });
  }
  function choixCol(k, val, nom) { setFeuilleCol(function (o) { if (!o) return o; var c = o.cib.slice(); c[k] = Object.assign({}, c[k], nom != null ? { nouvNom: nom } : { choix: val }); return Object.assign({}, o, { cib: c, err: "" }); }); }
  async function enregistrerFeuilleCol() {
    var f = feuilleCol; if (!f || f.busy) return;
    var refus = T("Action refusée : tu n’as pas les droits sur ces collections.", "Action refused: you don’t have rights on these collections.", "Acción rechazada: no tienes derechos sobre estas colecciones.", "Azione rifiutata: non hai i diritti su queste raccolte.", "このコレクションを編集する権限がありません。", "Aktion abgelehnt: Du hast keine Rechte an diesen Sammlungen.", "تم رفض الإجراء: ليس لديك صلاحيات على هذه المجموعات.", "操作被拒绝：你对这些合集没有权限。", "Actie geweigerd: je hebt geen rechten op deze collecties.", "Ação recusada: você não tem permissões sobre estas coleções.", "Åtgärden nekades: du har inga rättigheter för de här samlingarna.", "Действие отклонено: у тебя нет прав на эти коллекции.", "Akcja odrzucona: nie masz uprawnień do tych kolekcji.", "허용되지 않은 동작이에요. 이 컬렉션에 대한 권한이 없어요.");
    for (var k0 = 0; k0 < f.cib.length; k0++) {
      if (f.cib[k0].choix === "nouv" && !String(f.cib[k0].nouvNom || "").trim()) { setFeuilleCol(Object.assign({}, f, { err: T("Le nom est obligatoire.", "The name is required.", "El nombre es obligatorio.", "Il nome è obbligatorio.", "名前は必須です。", "Der Name ist erforderlich.", "الاسم مطلوب.", "名称必填。", "De naam is verplicht.", "O nome é obrigatório.", "Namn måste anges.", "Название обязательно.", "Nazwa jest wymagana.", "이름은 필수예요.") })); return; }
    }
    setFeuilleCol(Object.assign({}, f, { busy: true, err: "" }));
    try {
      for (var k = 0; k < f.cib.length; k++) {
        var t = f.cib[k];
        if (t.choix === t.avant) continue;
        /* une vidéo n'est que dans UNE collection par page : on la retire d'abord de celles qui l'ont */
        var aRet = t.cols.filter(function (c) { return c.id !== t.choix && (Array.isArray(c.videos) ? c.videos : []).indexOf(f.url) >= 0; });
        for (var j = 0; j < aRet.length; j++) {
          var rR = await supa.from("collections_videos").update({ videos: aRet[j].videos.filter(function (u) { return u !== f.url; }) }).eq("id", aRet[j].id).select("id");
          if (rR && rR.error) throw rR.error;
          if (!rR || !rR.data || !rR.data.length) throw new Error(refus);
        }
        if (t.choix === "nouv") {
          var maxO = t.cols.reduce(function (m, cO) { return Math.max(m, cO.ordre || 0); }, -1);
          var rI = await supa.from("collections_videos").insert({ cible: t.cible, nom: String(t.nouvNom).trim().slice(0, 60), videos: [f.url], ordre: maxO + 1 }).select("id");
          if (rI && rI.error) throw rI.error;
          if (!rI || !rI.data || !rI.data.length) throw new Error(refus);
        } else if (t.choix) {
          var col = t.cols.filter(function (c) { return c.id === t.choix; })[0];
          var l = (col && Array.isArray(col.videos) ? col.videos : []).filter(function (u) { return u !== f.url; }).concat([f.url]);
          var rU = await supa.from("collections_videos").update({ videos: l }).eq("id", t.choix).select("id");
          if (rU && rU.error) throw rU.error;
          if (!rU || !rU.data || !rU.data.length) throw new Error(refus);
        }
      }
      setFeuilleCol(Object.assign({}, f, { busy: false, fait: true }));
      setTimeout(function () { setFeuilleCol(function (o) { return (o && o.fait) ? null : o; }); }, 1400);
    } catch (eE) { setFeuilleCol(Object.assign({}, f, { busy: false, err: String((eE && eE.message) || eE) })); }
  }
  function boutonCollection(v) {
    if (!colCibles || !colCibles.length || !visuAdr) return null;
    return h("button", { type: "button", onClick: function () { ouvrirFeuilleCol(v); },
      style: { display: "inline-flex", alignItems: "center", gap: 7, minHeight: 36, padding: "0 13px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: CH, fontFamily: M, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } },
      "+ " + T("Ajouter à une collection", "Add to a collection", "Añadir a una colección", "Aggiungi a una raccolta", "コレクションに追加", "Zu einer Sammlung hinzufügen", "إضافة إلى مجموعة", "加入合集", "Aan een collectie toevoegen", "Adicionar a uma coleção", "Lägg till i en samling", "Добавить в коллекцию", "Dodaj do kolekcji", "컬렉션에 추가"));
  }
  function fenetreFeuilleCol() {
    var f = feuilleCol; if (!f) return null;
    var v = f.v;
    var radio = function (on) { return h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (on ? CH : "rgba(243,238,228,0.4)"), display: "flex", alignItems: "center", justifyContent: "center" } }, on ? h("span", { style: { width: 12, height: 12, borderRadius: "50%", background: CH } }) : null); };
    var ligne = function (k, val, txt, sous) {
      var on = f.cib[k].choix === val;
      return h("button", { key: "l" + k + "_" + val, type: "button", onClick: function () { choixCol(k, val); }, style: { display: "flex", alignItems: "center", gap: 12, width: "100%", minHeight: 48, padding: "8px 2px", background: "none", border: "none", borderBottom: "1px solid rgba(243,238,228,0.07)", color: IV, textAlign: "start", cursor: "pointer" } },
        h("span", { style: { flex: 1, minWidth: 0 } },
          h("span", { dir: "auto", style: { display: "block", fontFamily: SERIF, fontSize: 19, lineHeight: 1.2 } }, txt),
          sous ? h("span", { style: { display: "block", fontFamily: M, fontSize: 11, color: IV3, marginTop: 2 } }, sous) : null),
        radio(on));
    };
    var nbTxt = function (n) { return n + " " + (n > 1 ? T("vidéos", "videos", "vídeos", "video", "本", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "wideo", "동영상") : T("vidéo", "video", "vídeo", "video", "本", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "wideo", "동영상")); };
    return h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", onClick: function (eF) { if (eF.target === eF.currentTarget && !f.busy) setFeuilleCol(null); },
      style: { position: "fixed", inset: 0, zIndex: 100060, background: "rgba(3,7,6,0.78)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { dir: rtl ? "rtl" : "ltr", style: { width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", boxSizing: "border-box", padding: "14px 20px 0", borderRadius: "22px 22px 0 0", background: "#0E1214", borderTop: "1px solid " + CH2, color: IV, fontFamily: M } },
        h("div", { style: { width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.25)", margin: "0 auto 14px" } }),
        h("div", { style: { fontFamily: SERIF, fontSize: 26, lineHeight: 1.15 } }, T("Ajouter à une collection", "Add to a collection", "Añadir a una colección", "Aggiungi a una raccolta", "コレクションに追加", "Zu einer Sammlung hinzufügen", "إضافة إلى مجموعة", "加入合集", "Aan een collectie toevoegen", "Adicionar a uma coleção", "Lägg till i en samling", "Добавить в коллекцию", "Dodaj do kolekcji", "컬렉션에 추가")),
        h("div", { dir: "auto", style: { fontSize: 12, color: IV2, marginTop: 4 } }, [v.lieu || v.concours || "", v.epreuve || "", dateCourte(v.date_video || v.cree_le)].filter(Boolean).join(" · ")),
        h("div", { style: { fontSize: 11.5, color: IV3, lineHeight: 1.5, marginTop: 10 } }, T("Une fois dans une collection, la vidéo est visible par tous ceux qui voient la page, pas seulement par l’équipe.", "Once in a collection, the video can be seen by everyone who sees the page, not just the team.", "Una vez en una colección, el vídeo lo ve cualquiera que vea la página, no solo el equipo.", "Una volta in una raccolta, il video è visibile a chiunque veda la pagina, non solo alla squadra.", "コレクションに入れると、チームだけでなくページを見るすべての人が動画を見られます。", "In einer Sammlung sehen alle das Video, die die Seite sehen – nicht nur das Team.", "بمجرد وضعه في مجموعة، يصبح الفيديو مرئيا لكل من يرى الصفحة، وليس للفريق فقط.", "放进合集后，所有能看到该页面的人都能看到这个视频，不只是团队。", "Eenmaal in een collectie is de video zichtbaar voor iedereen die de pagina ziet, niet alleen voor het team.", "Depois de entrar numa coleção, o vídeo fica visível para todos que veem a página, não só para a equipe.", "När videon ligger i en samling syns den för alla som ser sidan, inte bara för laget.", "В коллекции видео видят все, кто открывает страницу, а не только команда.", "Po dodaniu do kolekcji wideo widzą wszyscy, którzy oglądają stronę, nie tylko drużyna.", "컬렉션에 넣으면 팀뿐 아니라 그 페이지를 보는 모든 사람이 영상을 볼 수 있어요.")),
        v.sans_son ? h("div", { style: { fontSize: 11.5, color: CH, lineHeight: 1.5, marginTop: 6 } }, T("Le son est coupé dans la Team : dans une collection, la vidéo sera lue avec le son.", "Sound is off in the Team: in a collection, the video will play with sound.", "El sonido está quitado en el equipo: en una colección, el vídeo se reproducirá con sonido.", "L’audio è disattivato nella squadra: in una raccolta il video sarà riprodotto con l’audio.", "チームでは音声なしですが、コレクションでは音声付きで再生されます。", "Im Team ist der Ton aus: In einer Sammlung läuft das Video mit Ton.", "الصوت مكتوم في الفريق: في المجموعة سيُشغَّل الفيديو بالصوت.", "团队里是静音的：放进合集后会带声音播放。", "Het geluid staat uit in het team: in een collectie speelt de video met geluid.", "O som está desligado na equipe: numa coleção, o vídeo vai tocar com som.", "Ljudet är avstängt i laget: i en samling spelas videon med ljud.", "В команде звук выключен: в коллекции видео будет со звуком.", "W drużynie dźwięk jest wyłączony: w kolekcji wideo będzie odtwarzane z dźwiękiem.", "팀에서는 소리가 꺼져 있지만, 컬렉션에서는 소리와 함께 재생돼요.")) : null,
        f.cib.map(function (t, k) {
          return h("div", { key: "cb" + k, style: { marginTop: 20 } },
            h("div", { style: { fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: CH, marginBottom: 4 } }, T("Sur la page de", "On the page of", "En la página de", "Sulla pagina di", "ページ：", "Auf der Seite von", "في صفحة", "在页面：", "Op de pagina van", "Na página de", "På sidan för", "На странице", "Na stronie", "페이지:") + " ", (t.cible.indexOf("cheval:") === 0 ? T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말") : T("Cavalier", "Rider", "Jinete", "Cavaliere", "ライダー", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "라이더")) + " · " + t.nom),
            ligne(k, "", T("Ne pas l’afficher ici", "Don’t show it here", "No mostrarlo aquí", "Non mostrarlo qui", "ここには表示しない", "Hier nicht zeigen", "لا تعرضه هنا", "不在此显示", "Hier niet tonen", "Não mostrar aqui", "Visa inte här", "Не показывать здесь", "Nie pokazuj tutaj", "여기에 표시 안 함"), null),
            t.cols.map(function (c) { return ligne(k, c.id, String(c.nom || ""), nbTxt((Array.isArray(c.videos) ? c.videos : []).length)); }),
            ligne(k, "nouv", "+ " + T("Nouvelle collection", "New collection", "Nueva colección", "Nuova raccolta", "新しいコレクション", "Neue Sammlung", "مجموعة جديدة", "新合集", "Nieuwe collectie", "Nova coleção", "Ny samling", "Новая коллекция", "Nowa kolekcja", "새 컬렉션"), null),
            t.choix === "nouv" ? h("input", { type: "text", value: t.nouvNom, maxLength: 60, dir: "auto", onChange: function (eI) { choixCol(k, null, eI.target.value); },
              placeholder: T("Nom de la collection", "Collection name", "Nombre de la colección", "Nome della raccolta", "コレクション名", "Name der Sammlung", "اسم المجموعة", "合集名称", "Naam van de collectie", "Nome da coleção", "Samlingens namn", "Название коллекции", "Nazwa kolekcji", "컬렉션 이름"),
              style: { width: "100%", boxSizing: "border-box", minHeight: 46, marginTop: 10, padding: "0 14px", borderRadius: 12, border: "1px solid " + CH2, background: "rgba(255,255,255,0.03)", color: IV, fontFamily: M, fontSize: 16 } }) : null);
        }),
        f.err ? h("div", { style: { marginTop: 14, padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.55)", fontSize: 12, color: "#FFD3D9", lineHeight: 1.5 } }, f.err) : null,
        /* 09/11 15h25 (Blandine : « on ne sait pas où valider ») : Annuler / Enregistrer toujours visibles, collés en bas de la feuille */
        h("div", { style: { position: "sticky", bottom: 0, display: "flex", gap: 10, marginTop: 22, marginInline: -20, padding: "12px 20px calc(16px + env(safe-area-inset-bottom))", background: "#0E1214", borderTop: "1px solid rgba(201,166,107,0.25)" } },
          h("button", { type: "button", disabled: f.busy, onClick: function () { setFeuilleCol(null); }, style: { flex: 1, minHeight: 46, borderRadius: 999, border: "1px solid rgba(243,238,228,0.22)", background: "transparent", color: IV2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", disabled: f.busy || f.fait, onClick: enregistrerFeuilleCol, style: { flex: 1.4, minHeight: 46, borderRadius: 999, border: "1px solid " + CH, background: "transparent", color: CH, fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } },
            f.fait ? "✓ " + T("Enregistré", "Saved", "Guardado", "Salvato", "保存しました", "Gespeichert", "تم الحفظ", "已保存", "Opgeslagen", "Salvo", "Sparat", "Сохранено", "Zapisano", "저장했어요") : (f.busy ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))));
  }

  var estDuGroupe = !!(moi && (
    (membres || []).some(function (p) { return p.id === moi.id; }) ||
    (groupe && groupe.cree_par === moi.id) ||
    ((typeof estModerateurHype === "function") && estModerateurHype(moi))));
  function peutLire(v) { return estDuGroupe || (v && v.publique); }

  React.useEffect(function () {
    var vif = true;
    var v0 = (videos || []).filter(function (x) { return x.id === visuV; })[0];
    if (!v0) { setTvRonds([]); return; }
    (async function () {
      var out = [];
      function ajoute(u) { u = String(u || ""); if (u && out.indexOf(u) === -1 && !((typeof estUrlVideo === "function") && estUrlVideo(u)) && !/^mux:/.test(u)) out.push(u); }
      try {
        if (v0.agenda_id) {
          var r = await supa.from("commentaires").select("user_id, photo_url, medias, prive").eq("cible", "agenda:" + v0.agenda_id).order("created_at", { ascending: false }).limit(60);
          ((r && !r.error && r.data) || []).forEach(function (po) { if (po.prive && !(moi && po.user_id === moi.id)) return; ajoute(po.photo_url); (Array.isArray(po.medias) ? po.medias : []).forEach(ajoute); });
        }
      } catch (eR) { }
      if (out.length < 3) (v0.chevaux || []).forEach(function (c) { var ch = chevauxParId[c]; if (ch && ch.photo_url) ajoute(ch.photo_url); });
      if (vif) setTvRonds(out.slice(0, 3));
    })();
    return function () { vif = false; };
  }, [visuV]);
  async function lire(v) {
    if (!peutLire(v)) { setReserve(true); return; }
    setOccupe(v.id);
    try {
      var r = await supa.rpc("team_video_lecture", { p_id: v.id });
      var adr = r && !r.error ? r.data : null;
      if (!adr) { setReserve(true); return; }
      setVisuMuet(!!v.sans_son); setVisuV(v.id); setVisuAdr(String(adr));
      setVisu(((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(adr) && typeof hypeMuxLecture === "function") ? hypeMuxLecture(adr) : adr);
    } catch (eR) { setReserve(true); }
    finally { setOccupe(""); }
  }

  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } try { if (typeof hypeTeamCourante === "function" && hypeTeamCourante()) window.__teamArmee = true; } catch (eA) { } setEcran("team-competition"); }

  function duree(s) { var n = Math.round(Number(s) || 0); if (!n) return ""; return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0"); }
  function dateCourte(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; try { return new Intl.DateTimeFormat(lg, { day: "numeric", month: "short" }).format(new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))); } catch (e) { return m[3] + "/" + m[2]; } }
  function vignetteDe(v) { var u = v && v.vignette; if (!u) return ""; return (typeof vignetteHype === "function") ? vignetteHype(u, 300, 190) : u; }

  /* ───────── en-tête, comme la Vidéothèque ───────── */
  var hero = h("div", { style: { position: "relative", paddingTop: "calc(env(safe-area-inset-top) + 8px)" } },
    h("div", { style: { position: "relative", height: "clamp(220px, 62vw, 340px)", overflow: "hidden", WebkitMaskImage: "linear-gradient(180deg,#000 55%,transparent 96%)", maskImage: "linear-gradient(180deg,#000 55%,transparent 96%)" } },
      h("img", { src: "images/TEAM_COMPETITION.webp", alt: "", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" } })),
    h("svg", { viewBox: "0 0 400 60", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 64, marginTop: -64, position: "relative", transform: rtl ? "scaleX(-1)" : "none" } },
      h("path", { d: "M0 22 C 120 30, 230 52, 400 18", fill: "none", stroke: CH, strokeWidth: 1.2 })),
    h("button", { type: "button", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
      style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", insetInlineStart: 14, width: 40, height: 40, borderRadius: "50%", background: "rgba(7,10,8,0.55)", border: "1px solid rgba(243,238,228,0.16)", color: IV, fontSize: 20, lineHeight: 1, cursor: "pointer" } }, rtl ? "›" : "‹"),
    h("div", { style: { textAlign: "end", padding: "0 18px", marginTop: -14, position: "relative" } },
      h("h1", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px, 12vw, 64px)", lineHeight: 1, margin: 0, color: IV } }, T("Médias", "Media", "Medios", "Media", "メディア", "Medien", "الوسائط", "媒体", "Media", "Média", "Media", "Медиа", "Media", "미디어")),
      h("p", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(17px, 4.6vw, 21px)", margin: "8px 0 0", color: IV, opacity: 0.88 } }, (groupe && groupe.nom) || "")));

  var ONGLETS = [["theorie", T("Théorie", "Theory", "Teoría", "Teoria", "理論", "Theorie", "النظرية", "理论", "Theorie", "Teoria", "Teori", "Теория", "Teoria", "이론")], ["videos", T("Vidéos", "Videos", "Vídeos", "Video", "動画", "Videos", "الفيديوهات", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "동영상")], ["epingles", T("Épingles HB", "HB pins", "Pines HB", "Pin HB", "HBピン", "HB-Pins", "تثبيتات HB", "HB 收藏", "HB-pins", "Pins HB", "HB-nålar", "Закладки HB", "Przypięte HB", "HB 핀")]];
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
  function chargement() { return vide(T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Wird geladen…", "جارٍ التحميل…", "加载中…", "Laden…", "A carregar…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…")); }
  function filet() { return h("div", { "aria-hidden": "true", style: { height: 1, background: "linear-gradient(90deg, rgba(201,166,107,.1), " + CH2 + " 50%, rgba(201,166,107,.1))" } }); }

  /* ───────── VIDÉOS : par cavalière, une sous-ligne par cheval ───────── */
  var ICONE_CADENAS = h("svg", { width: 11, height: 12, viewBox: "0 0 11 12", "aria-hidden": "true" },
    h("rect", { x: 1.2, y: 5.2, width: 8.6, height: 6, rx: 1.2, fill: "none", stroke: IV, strokeWidth: 1.1 }),
    h("path", { d: "M3.2 5.2V3.6a2.3 2.3 0 0 1 4.6 0v1.6", fill: "none", stroke: IV, strokeWidth: 1.1 }));
  function tuileVideo(v, cle, enGrille, etendue) {
    var src = vignetteDe(v), d = duree(v.duree), verrou = !peutLire(v);
    /* 05/11 soir : plus de titre à écrire — on affiche le cheval, puis la date (et « Un mot ? » s'il y en a un) */
    /* 08/11 (Blandine) : « Daphné sur Velleda » — le prénom du cavalier ou de la cavalière, puis le cheval */
    var prenoms = (v.cavaliers || []).map(function (u) { var pp = profilsParId[u]; return pp ? String(nomProfil(pp)).split(/\s+/)[0] : ""; }).filter(function (x) { return x && x !== "—"; });
    var couple = (prenoms.length && v.chevaux && v.chevaux.length) ? prenoms.join(", ") + " " + T("sur", "on", "con", "su", "×", "auf", "على", "骑", "op", "com", "på", "на", "na", "×") + " " + v.chevaux.map(nomCheval).join(", ") : "";
    var titreAff = couple || v.titre || (v.chevaux && v.chevaux.length ? v.chevaux.map(nomCheval).join(", ") : "") || T("Vidéo", "Video", "Vídeo", "Video", "動画", "Video", "فيديو", "视频", "Video", "Vídeo", "Video", "Видео", "Film", "동영상");
    var meta = [dateCourte(v.date_video || v.cree_le), v.lieu || v.concours || "", v.epreuve || ""].filter(Boolean).join(" · ");   /* 06/11 soir : + lieu ; 07/11 : + épreuve, le petit mot a sa propre ligne */
    /* 05/11 soir — « Mettre en public » : petit bouton posé sur la vignette, visible seulement pour la cavalière qui est
       sur la vidéo, la personne qui l'a postée (et, pour la remettre en privé, la coach). La base vérifie de toute façon. */
    var moiId = moi && moi.id;
    var estModo = !!((typeof estModerateurHype === "function") && moi && estModerateurHype(moi));
    var peutPublier = !!moiId && (v.auteur_id === moiId || (v.cavaliers || []).indexOf(moiId) !== -1 || estModo);
    var peutPrivatiser = peutPublier || !!(moiId && groupe && groupe.cree_par === moiId);
    var montrerPastille = v.publique ? true : peutPublier;
    var pastille = !montrerPastille ? null : h("button", { type: "button", disabled: changePub === v.id || !(v.publique ? peutPrivatiser : peutPublier),
      onClick: function (e) { e.stopPropagation(); demanderPublique(v); },
      "aria-label": v.publique ? T("Vidéo publique", "Public video", "Vídeo público", "Video pubblico", "公開動画", "Öffentliches Video", "فيديو عام", "公开视频", "Openbare video", "Vídeo público", "Offentlig video", "Публичное видео", "Film publiczny", "공개 동영상") : T("Mettre en public", "Make public", "Hacer público", "Rendi pubblico", "公開する", "Öffentlich machen", "جعله عامًا", "设为公开", "Openbaar maken", "Tornar público", "Gör offentlig", "Сделать публичным", "Upublicznij", "공개하기"),
      style: { position: "absolute", top: 6, insetInlineStart: 6, zIndex: 2, display: "flex", alignItems: "center", gap: 5, minHeight: 26, padding: "0 9px", borderRadius: 999,
        border: "1px solid " + (v.publique ? CH2 : "rgba(243,238,228,0.25)"), background: "rgba(7,10,8,0.72)", color: v.publique ? CH : IV2, fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: ".04em",
        cursor: (v.publique ? peutPrivatiser : peutPublier) ? "pointer" : "default" } },
      h("svg", { width: 10, height: 10, viewBox: "0 0 10 10", "aria-hidden": "true" },
        v.publique ? [h("circle", { key: "c", cx: 5, cy: 5, r: 4, fill: "none", stroke: CH, strokeWidth: 0.9 }), h("path", { key: "p", d: "M1 5h8M5 1c1.6 1.4 1.6 6.6 0 8M5 1c-1.6 1.4-1.6 6.6 0 8", fill: "none", stroke: CH, strokeWidth: 0.9 })]
          : [h("rect", { key: "r", x: 1.6, y: 4.4, width: 6.8, height: 4.6, rx: 1, fill: "none", stroke: IV2, strokeWidth: 0.9 }), h("path", { key: "a", d: "M3.2 4.4V3.1a1.8 1.8 0 0 1 3.6 0v1.3", fill: "none", stroke: IV2, strokeWidth: 0.9 })]),
      changePub === v.id ? "…" : (v.publique ? T("Public", "Public", "Público", "Pubblico", "公開", "Öffentlich", "عام", "公开", "Openbaar", "Público", "Offentlig", "Публичное", "Publiczny", "공개") : T("Équipe", "Team", "Equipo", "Squadra", "チーム", "Team", "الفريق", "团队", "Team", "Equipa", "Lag", "Команда", "Drużyna", "팀")));
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
      h("div", { dir: "auto", style: { fontFamily: M, fontSize: 11.5, marginTop: 6, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, titreAff,
        v.resultat ? h("span", { style: { color: CH, fontWeight: 600, whiteSpace: "nowrap" } }, " " + (/^\s*\d/.test(v.resultat) ? "🏆 " : "· ") + v.resultat) : null),
      meta ? h("div", { style: { fontFamily: M, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: IV3, marginTop: 2, paddingInlineEnd: estAuteur ? 30 : 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, meta) : null),
      v.description ? h("div", { dir: "auto", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, lineHeight: 1.25, color: IV2, marginTop: 2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, "« " + v.description + " »") : null,
      /* 06/11 nuit : j'aime sur la vidéo (Blandine : « tu peux ajouter des j'aime ou commentaires sur les vidéos de la team ») */
      (typeof HypeJaimeTexte === "function" && !verrou) ? h(HypeJaimeTexte, { cible: "teamvideo:" + v.id, petit: true, marge: 2 }) : null,
      /* 06/11 soir — l'auteur corrige le concours / la date / le lieu */
      estAuteur ? h("button", { type: "button", disabled: changeConc === v.id, onClick: function (e) { e.stopPropagation(); ouvrirFeuilleConc(v, v); },
        "aria-label": T("Modifier le concours", "Edit competition", "Editar el concurso", "Modifica il concorso", "競技会を変更", "Turnier ändern", "تعديل المسابقة", "修改比赛", "Wedstrijd wijzigen", "Alterar o concurso", "Ändra tävling", "Изменить соревнование", "Zmień zawody", "대회 수정"),
        style: { position: "absolute", insetInlineEnd: -4, bottom: -6, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", padding: 0, color: CH, cursor: "pointer" } },
        changeConc === v.id ? h("span", { style: { fontSize: 11 } }, "…")
          : h("svg", { width: 12, height: 12, viewBox: "0 0 12 12", "aria-hidden": "true" }, h("path", { d: "M2 10l.6-2.4L8.4 1.8l1.8 1.8L4.4 9.4Z M7.4 2.8l1.8 1.8", fill: "none", stroke: CH, strokeWidth: 0.9, strokeLinejoin: "round" }))) : null);
  }
  /* « + Ajouter une vidéo » : visible pour le groupe ; l'ajout lui-même arrive à l'étape 4 */
  function tuileAjout(cle, etendue, seuleSurSaLigne, pre) {
    if (!estDuGroupe) return null;
    return h("button", { key: cle, type: "button", onClick: function () { ouvrirAjout(pre); }, "aria-label": T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "동영상 추가"),
      style: { cursor: "pointer", gridColumn: etendue ? "span " + etendue : "auto", width: "100%", aspectRatio: seuleSurSaLigne ? "auto" : "16 / 10", minHeight: seuleSurSaLigne ? 58 : 0, borderRadius: 12, border: "1px dashed " + CH2, background: "none", color: IV2, fontFamily: M, fontSize: 11, lineHeight: 1.25, display: "flex", flexDirection: seuleSurSaLigne ? "row" : "column", alignItems: "center", justifyContent: "center", gap: seuleSurSaLigne ? 10 : 4 } },
      h("span", { style: { color: CH, fontSize: 20, lineHeight: 1 } }, "+"), T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "동영상 추가"));
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
  function nomCheval(id) { var c = chevauxParId[id]; return (c && (c.alias || c.nom)) || T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말"); }
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
  var _tsc = React.useState(false); var tousCav = _tsc[0], setTousCav = _tsc[1];   /* 09/11 15h25 (Blandine) : les cavaliers sans vidéo masqués par défaut */
  var _oc2 = React.useState("tous"); var ongletCheval = _oc2[0], setOngletCheval = _oc2[1];
  function ouvrirCavaliere(p) { setOngletCheval("tous"); setCavOuverte(p.id); try { window.scrollTo(0, 0); } catch (e) { } }

  function sectionCavaliere(p, i) {
    var siennes = videosDe(p), nbCh = chevauxDe(siennes).filter(function (c) { return c !== "_sans"; }).length;
    var sousTitre = siennes.length ? compte(siennes.length, T("vidéo", "video", "vídeo", "video", "本の動画", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "film", "개 동영상"), T("vidéos", "videos", "vídeos", "video", "本の動画", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "filmy", "개 동영상")) + (nbCh ? " · " + compte(nbCh, T("cheval", "horse", "caballo", "cavallo", "頭の馬", "Pferd", "حصان", "匹马", "paard", "cavalo", "häst", "лошадь", "koń", "마리 말"), T("chevaux", "horses", "caballos", "cavalli", "頭の馬", "Pferde", "خيول", "匹马", "paarden", "cavalos", "hästar", "лошади", "konie", "마리 말")) : "")
      : (estDuGroupe ? "" : T("Pas encore de vidéo", "No video yet", "Aún no hay vídeos", "Ancora nessun video", "まだ動画はありません", "Noch kein Video", "لا يوجد فيديو بعد", "还没有视频", "Nog geen video", "Ainda sem vídeos", "Ingen video än", "Пока нет видео", "Jeszcze brak filmów", "아직 동영상이 없어요"));
    var deux = siennes.slice(0, 2);
    return h("div", { key: "cav" + p.id },
      i > 0 ? filet() : null,
      h("div", { style: { padding: "12px 0 8px" } },   /* 09/11 21h10 (Blandine : « plus compacte ») — était 18 / 16 */
        h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          h("button", { type: "button", disabled: !siennes.length, onClick: function () { ouvrirCavaliere(p); }, style: { display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0, background: "none", border: "none", padding: 0, color: IV, textAlign: "start", cursor: siennes.length ? "pointer" : "default" } },
            avatar(p, 40),
            h("div", { style: { minWidth: 0 } },
              h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 21, lineHeight: 1.1 } }, nomProfil(p)),
              sousTitre ? h("div", { style: { fontFamily: M, fontSize: 11, color: IV3, marginTop: 2 } }, sousTitre) : null)),
          siennes.length ? h("button", { type: "button", onClick: function () { ouvrirCavaliere(p); }, style: { flex: "0 0 auto", minHeight: 34, background: "none", border: "none", padding: "0 2px", color: CH, fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "모두 보기") + " " + (rtl ? "‹" : "›")) : null),
        /* sans vidéo : une petite case « + » et une petite écriture, rien de plus */
        !siennes.length ? (estDuGroupe ? h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 12, paddingInlineStart: 58 } },
            h("button", { type: "button", onClick: function () { ouvrirAjout({ cav: [p.id] }); }, "aria-label": T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "동영상 추가"),
              style: { flex: "0 0 auto", width: 58, height: 40, borderRadius: 10, border: "1px dashed " + CH2, background: "transparent", color: CH, fontSize: 20, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" } }, "+"),
            h("div", { style: { fontFamily: M, fontSize: 11, fontStyle: "italic", color: IV3, lineHeight: 1.4 } }, T("Ajoute les vidéos de concours ici", "Add your competition videos here", "Añade aquí los vídeos de concurso", "Aggiungi qui i video dei concorsi", "大会の動画をここに追加しよう", "Füge hier die Turniervideos hinzu", "أضف فيديوهات المسابقات هنا", "在这里添加比赛视频", "Voeg hier je wedstrijdvideo's toe", "Adiciona aqui os vídeos de concurso", "Lägg till tävlingsvideor här", "Добавляй сюда видео с соревнований", "Dodaj tu filmy z zawodów", "대회 동영상을 여기에 추가하세요"))) : null)
          : h("div", { style: { marginTop: 9, maxWidth: 560 } },
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
      h("button", { type: "button", onClick: function () { setCavOuverte(null); }, style: { background: "none", border: "none", padding: "6px 0", minHeight: 36, color: CH, fontFamily: M, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, (rtl ? "› " : "‹ ") + T("Toute l'équipe", "Whole team", "Todo el equipo", "Tutta la squadra", "チーム全員", "Ganzes Team", "الفريق بأكمله", "整个团队", "Hele team", "Toda a equipa", "Hela laget", "Вся команда", "Cała drużyna", "팀 전체")),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 6 } },
        avatar(p, 58),
        h("div", { style: { minWidth: 0 } },
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 28, lineHeight: 1.05 } }, nomProfil(p)),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: IV3, marginTop: 3 } }, compte(siennes.length, T("vidéo", "video", "vídeo", "video", "本の動画", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "film", "개 동영상"), T("vidéos", "videos", "vídeos", "video", "本の動画", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "filmy", "개 동영상"))))),
      h("div", { "data-hscroll": "1", "data-noswipe": "1", role: "tablist", style: { display: "flex", gap: 8, overflowX: "auto", margin: "18px -18px 0", padding: "0 18px 4px", scrollbarWidth: "none" } },
        [pastille("tous", T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alle", "Todos", "Alla", "Все", "Wszystkie", "전체"), null)].concat(chs.map(function (c) { var ch = chevauxParId[c]; return pastille(c, c === "_sans" ? T("Sans cheval", "No horse", "Sin caballo", "Senza cavallo", "馬なし", "Ohne Pferd", "بدون حصان", "无马", "Zonder paard", "Sem cavalo", "Utan häst", "Без лошади", "Bez konia", "말 없음") : nomCheval(c), ch && ch.photo_url); }))),
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
              h("div", { style: { fontFamily: M, fontSize: 11, color: IV3, marginTop: 2 } }, compte(siens.length, T("vidéo", "video", "vídeo", "video", "本の動画", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "film", "개 동영상"), T("vidéos", "videos", "vídeos", "video", "本の動画", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "filmy", "개 동영상")) + " · " + compte(nbCav, T("cavalier", "rider", "jinete", "cavaliere", "人のライダー", "Reiter", "فارس", "位骑手", "ruiter", "cavaleiro", "ryttare", "всадник", "jeździec", "명의 라이더"), T("cavaliers", "riders", "jinetes", "cavalieri", "人のライダー", "Reiter", "فرسان", "位骑手", "ruiters", "cavaleiros", "ryttare", "всадники", "jeźdźców", "명의 라이더"))))),
          h("button", { type: "button", onClick: function () { ouvrirCheval(c); }, style: { flex: "0 0 auto", minHeight: 34, background: "none", border: "none", padding: "0 2px", color: CH, fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "모두 보기") + " " + (rtl ? "‹" : "›"))),
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
      h("button", { type: "button", onClick: function () { setChOuvert(null); }, style: { background: "none", border: "none", padding: "6px 0", minHeight: 36, color: CH, fontFamily: M, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, (rtl ? "› " : "‹ ") + T("Tous les chevaux", "All horses", "Todos los caballos", "Tutti i cavalli", "すべての馬", "Alle Pferde", "كل الخيول", "所有马匹", "Alle paarden", "Todos os cavalos", "Alla hästar", "Все лошади", "Wszystkie konie", "모든 말")),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 6 } },
        photoCheval(c, 58),
        h("div", { style: { minWidth: 0 } },
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontWeight: 600, fontSize: 28, lineHeight: 1.05 } }, nomCheval(c)),
          h("div", { style: { fontFamily: M, fontSize: 11.5, color: IV3, marginTop: 3 } }, compte(siens.length, T("vidéo", "video", "vídeo", "video", "本の動画", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "film", "개 동영상"), T("vidéos", "videos", "vídeos", "video", "本の動画", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "filmy", "개 동영상"))))),
      h("div", { "data-hscroll": "1", "data-noswipe": "1", role: "tablist", style: { display: "flex", gap: 8, overflowX: "auto", margin: "18px -18px 0", padding: "0 18px 4px", scrollbarWidth: "none" } },
        [pastille("tous", T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alle", "Todos", "Alla", "Все", "Wszystkie", "전체"), null)].concat(cavs.map(function (u) { var pr = profilsParId[u]; return pastille(u, nomProfil(pr), pr || { pseudo: "?" }); }))),
      h("div", { style: { height: 1, margin: "14px 0 16px", background: "linear-gradient(90deg, rgba(201,166,107,.1), " + CH2 + " 50%, rgba(201,166,107,.1))" } }),
      grilleEquilibree(visibles, "ph" + c, COLS, { ch: [c], cav: ongletCav !== "tous" ? [ongletCav] : [] }));
  }

  /* petit sélecteur discret en haut de la vidéothèque */
  function selecteurVue() {
    function lien(cle, txt) {
      var on = vue === cle;
      return h("button", { key: cle, type: "button", onClick: function () { setVue(cle); setCavOuverte(null); setChOuvert(null); },
        style: { background: "none", border: "none", borderBottom: "1px solid " + (on ? CH : "transparent"), padding: "8px 0 6px", minHeight: 36, color: on ? IV : IV3, fontFamily: M, fontSize: 10.5, fontWeight: 600, letterSpacing: largeur < 420 ? "0.12em" : "0.2em", whiteSpace: "nowrap", flex: "0 0 auto", textTransform: "uppercase", cursor: "pointer" } }, txt);
    }
    return h("div", { "data-hscroll": "1", style: { display: "flex", gap: largeur < 420 ? 16 : 22, marginTop: 18, overflowX: "auto", scrollbarWidth: "none" } }, lien("concours", T("Par concours", "By competition", "Por concurso", "Per concorso", "競技会別", "Nach Turnier", "حسب المسابقة", "按比赛", "Per wedstrijd", "Por concurso", "Per tävling", "По соревнованиям", "Według zawodów", "대회별")), lien("cavaliere", T("Par cavalier", "By rider", "Por jinete", "Per cavaliere", "ライダー別", "Nach Reiter", "حسب الفارس", "按骑手", "Per ruiter", "Por cavaleiro", "Per ryttare", "По всадникам", "Według jeźdźca", "라이더별")), lien("cheval", T("Par cheval", "By horse", "Por caballo", "Per cavallo", "馬別", "Nach Pferd", "حسب الحصان", "按马匹", "Per paard", "Por cavalo", "Per häst", "По лошадям", "Według konia", "말별")));
  }

  function ongletVideos() {
    if (videos === null || membres === null) return chargement();
    if (vue === "cavaliere") {
      var ouverte = cavOuverte && (membres || []).filter(function (p) { return p.id === cavOuverte; })[0];
      if (ouverte) return pageCavaliere(ouverte);
    } else if (chOuvert) return pageCheval(chOuvert);
    var corps;
    if (vue === "concours") {   /* 06/11 soir (Blandine : « ajoute l'onglet par concours en haut de la page vidéo ») */
      var grp = {}, ordre = [];
      (videos || []).forEach(function (v) {
        var cle = v.agenda_id ? "a:" + v.agenda_id : ((v.lieu || v.concours) ? "x:" + (v.lieu || v.concours) + "|" + (v.date_video || "") : "_sans");
        if (!grp[cle]) { grp[cle] = { cle: cle, titre: cle === "_sans" ? "" : (v.lieu || v.concours || ""), sous: (v.lieu && v.concours && v.concours !== v.lieu) ? v.concours : "", date: v.date_video || "", liste: [] }; ordre.push(cle); }
        grp[cle].liste.push(v);
      });
      ordre.sort(function (a, b) { if (a === "_sans") return 1; if (b === "_sans") return -1; return String(grp[b].date).localeCompare(String(grp[a].date)); });
      var colsQ = largeur >= 700 ? 3 : 2;
      corps = ordre.map(function (cle, i) {
            var g = grp[cle], n = g.liste.length, resteQ = n % colsQ;
            return h("section", { key: "sq" + cle, style: { padding: "18px 0 20px", borderTop: i ? "1px solid " + CH3 : "none" } },
              h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 12 } },
                h("div", { style: { minWidth: 0 } },
                  h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 24, lineHeight: 1.1, color: cle === "_sans" ? IV2 : IV } }, cle === "_sans" ? T("Sans concours", "No competition", "Sin concurso", "Senza concorso", "競技会なし", "Ohne Turnier", "بدون مسابقة", "未关联比赛", "Zonder wedstrijd", "Sem concurso", "Utan tävling", "Без соревнования", "Bez zawodów", "대회 없음") : g.titre),
                  g.sous ? h("div", { dir: "auto", style: { fontSize: 11, color: IV3, marginTop: 3 } }, g.sous) : null),
                g.date && cle !== "_sans" ? h("div", { style: { flex: "0 0 auto", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: CH } }, dateCourte(g.date)) : null),
              h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + colsQ + ", minmax(0, 1fr))", gap: "14px 10px" } },
                g.liste.map(function (v, k) { var derniere = k === n - 1 && resteQ; return tuileVideo(v, "q" + cle + v.id, true, derniere ? colsQ - resteQ + 1 : 0); })));
          });
      if (!(videos || []).length) corps = vide(T("Les concours apparaîtront ici dès qu'une vidéo y sera rattachée.", "Competitions will appear here as soon as a video is linked to one.", "Los concursos aparecerán aquí en cuanto se vincule un vídeo.", "I concorsi appariranno qui appena un video sarà collegato.", "動画が紐づけられると、ここに競技会が表示されます。", "Turniere erscheinen hier, sobald ein Video damit verknüpft ist.", "ستظهر المسابقات هنا بمجرد ربط فيديو بها.", "一旦有视频关联比赛，比赛就会显示在这里。", "Wedstrijden verschijnen hier zodra er een video aan gekoppeld is.", "Os concursos aparecerão aqui assim que um vídeo for ligado a eles.", "Tävlingar visas här så snart en video kopplas till dem.", "Соревнования появятся здесь, как только к ним привяжут видео.", "Zawody pojawią się tu, gdy tylko zostanie do nich przypisane wideo.", "영상이 연결되면 여기에 대회가 표시돼요."));
    } else if (vue === "cavaliere") {
      /* les cavalières qui ont des vidéos d'abord, puis les autres par ordre alphabétique */
      var liste = (membres || []).slice().sort(function (a, b) { var d = videosDe(b).length - videosDe(a).length; return d || nomProfil(a).localeCompare(nomProfil(b)); });
      corps = !liste.length ? vide(T("Aucun cavalier dans l'équipe pour l'instant.", "No riders in the team yet.", "Aún no hay jinetes en el equipo.", "Ancora nessun cavaliere nella squadra.", "チームにはまだライダーがいません。", "Noch keine Reiter im Team.", "لا توجد فرسان في الفريق بعد.", "团队中还没有骑手。", "Nog geen ruiters in het team.", "Ainda não há cavaleiros na equipa.", "Inga ryttare i laget än.", "В команде пока нет всадников.", "W drużynie nie ma jeszcze jeźdźców.", "아직 팀에 라이더가 없어요.")) : h("div", null, h("div", null, liste.filter(function (p) { return tousCav || videosDe(p).length; }).map(sectionCavaliere),
        liste.some(function (p) { return !videosDe(p).length; }) ? h("div", { style: { textAlign: "center", padding: "14px 0 4px" } }, h("button", { type: "button", onClick: function () { setTousCav(!tousCav); }, style: { minHeight: 38, padding: "0 16px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } },
          tousCav ? T("Masquer les cavaliers sans vidéo", "Hide riders without videos", "Ocultar jinetes sin vídeos", "Nascondi i cavalieri senza video", "動画のないライダーを隠す", "Reiter ohne Video ausblenden", "إخفاء الفرسان بلا فيديو", "隐藏没有视频的骑手", "Ruiters zonder video verbergen", "Ocultar cavaleiros sem vídeos", "Dölj ryttare utan video", "Скрыть всадников без видео", "Ukryj jeźdźców bez filmów", "영상 없는 기수 숨기기")
            : T("Afficher aussi les cavaliers sans vidéo", "Also show riders without videos", "Mostrar también jinetes sin vídeos", "Mostra anche i cavalieri senza video", "動画のないライダーも表示", "Auch Reiter ohne Video zeigen", "عرض الفرسان بلا فيديو أيضًا", "也显示没有视频的骑手", "Ook ruiters zonder video tonen", "Mostrar também cavaleiros sem vídeos", "Visa även ryttare utan video", "Показать и всадников без видео", "Pokaż też jeźdźców bez filmów", "영상 없는 기수도 보기") + " (" + liste.filter(function (p) { return !videosDe(p).length; }).length + ")")) : null));
    } else {
      var chs = []; (videos || []).forEach(function (v) { v.chevaux.forEach(function (c) { if (chs.indexOf(c) === -1) chs.push(c); }); });
      chs.sort(function (a, b) { var d = videosDuCheval(b).length - videosDuCheval(a).length; return d || nomCheval(a).localeCompare(nomCheval(b)); });
      corps = !chs.length ? vide(T("Les chevaux apparaîtront ici dès qu'une vidéo leur sera rattachée.", "Horses will appear here as soon as a video is linked to them.", "Los caballos aparecerán aquí en cuanto se les vincule un vídeo.", "I cavalli appariranno qui non appena gli verrà collegato un video.", "動画が紐づけられると、ここに馬が表示されます。", "Die Pferde erscheinen hier, sobald ihnen ein Video zugeordnet ist.", "ستظهر الخيول هنا بمجرد ربط فيديو بها.", "一旦有视频关联，马匹就会显示在这里。", "Paarden verschijnen hier zodra er een video aan gekoppeld is.", "Os cavalos aparecerão aqui assim que lhes for associado um vídeo.", "Hästarna visas här så snart en video kopplas till dem.", "Лошади появятся здесь, как только к ним привяжут видео.", "Konie pojawią się tutaj, gdy tylko zostanie do nich przypisany film.", "동영상이 연결되면 여기에 말이 표시돼요.")) : h("div", null, chs.map(sectionCheval));
    }
    return h("div", null, selecteurVue(), h("div", { style: { marginTop: 4 } }, corps));
  }

  /* ───────── THÉORIE : partages (lecture seule à cette étape) ───────── */
  var LIB_TYPE = { article_hype: T("Article Hype", "Hype article", "Artículo Hype", "Articolo Hype", "Hype記事", "Hype-Artikel", "مقال Hype", "Hype 文章", "Hype-artikel", "Artigo Hype", "Hype-artikel", "Статья Hype", "Artykuł Hype", "Hype 기사"), lien: T("Lien", "Link", "Enlace", "Link", "リンク", "Link", "رابط", "链接", "Link", "Link", "Länk", "Ссылка", "Link", "링크"), video: T("Vidéo", "Video", "Vídeo", "Video", "動画", "Video", "فيديو", "视频", "Video", "Vídeo", "Video", "Видео", "Film", "동영상"), ressource: T("Ressource", "Resource", "Recurso", "Risorsa", "資料", "Ressource", "مورد", "资源", "Bron", "Recurso", "Resurs", "Ресурс", "Materiał", "자료") };
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
        h("div", { style: { fontFamily: M, fontSize: 10.5, color: IV3, marginTop: 4 } }, T("Partagé par ", "Shared by ", "Compartido por ", "Condiviso da ", "共有者：", "Geteilt von ", "شاركه ", "分享者：", "Gedeeld door ", "Partilhado por ", "Delad av ", "Поделился(-ась): ", "Udostępnione przez ", "공유한 사람: ") + nomProfil(qui))));
  }
  function ongletTheorie() {
    if (partages === null) return chargement();
    var bouton = estDuGroupe ? h("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 16 } },
      h("button", { type: "button", onClick: ouvrirPartager, style: { minHeight: 38, padding: "0 16px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: CH, fontFamily: M, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, "+ " + T("Partager", "Share", "Compartir", "Condividi", "共有", "Teilen", "مشاركة", "分享", "Delen", "Partilhar", "Dela", "Поделиться", "Udostępnij", "공유"))) : null;
    if (!partages.length) return h("div", null, bouton, vide(T("Aucun partage pour l'instant. Partage un article, un lien ou une ressource utile à l'équipe.", "Nothing shared yet. Share an article, a link or a resource useful to the team.", "Aún no hay nada compartido. Comparte un artículo, un enlace o un recurso útil para el equipo.", "Ancora nessuna condivisione. Condividi un articolo, un link o una risorsa utile alla squadra.", "まだ共有はありません。チームに役立つ記事、リンク、資料を共有しよう。", "Noch nichts geteilt. Teile einen Artikel, einen Link oder eine Ressource, die dem Team hilft.", "لا توجد مشاركات بعد. شارك مقالًا أو رابطًا أو موردًا مفيدًا للفريق.", "还没有分享。分享一篇文章、一个链接或对团队有用的资源吧。", "Nog niets gedeeld. Deel een artikel, een link of een bron die nuttig is voor het team.", "Ainda nada partilhado. Partilha um artigo, um link ou um recurso útil para a equipa.", "Inget delat än. Dela en artikel, en länk eller en resurs som hjälper laget.", "Пока ничего не опубликовано. Поделись статьёй, ссылкой или полезным для команды материалом.", "Na razie nic nie udostępniono. Udostępnij artykuł, link lub materiał przydatny dla drużyny.", "아직 공유된 것이 없어요. 팀에 도움이 되는 기사, 링크, 자료를 공유해 보세요.")));
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
    if (r && r.error) { setPEtat(T("Le partage n'a pas pu être enregistré : ", "The share could not be saved: ", "No se pudo guardar lo compartido: ", "Impossibile salvare la condivisione: ", "共有を保存できませんでした：", "Das Teilen konnte nicht gespeichert werden: ", "تعذّر حفظ المشاركة: ", "无法保存分享：", "Het delen kon niet worden opgeslagen: ", "Não foi possível guardar a partilha: ", "Delningen kunde inte sparas: ", "Не удалось сохранить: ", "Nie udało się zapisać udostępnienia: ", "공유를 저장하지 못했어요: ") + (r.error.message || r.error)); return; }
    setPEtat("fini"); setRev(function (n) { return n + 1; });
  }
  var fenetrePartage = null;
  if (partageOuvert) {
    var ap = pApercu, envoi = pEtat === "envoi";
    var pret = !!urlPropre(pUrl) && /^https?:\/\/[^\s]+\.[^\s]+/i.test(urlPropre(pUrl)) && pEtat !== "lecture";
    var TYPES = [["lien", T("Article", "Article", "Artículo", "Articolo", "記事", "Artikel", "مقال", "文章", "Artikel", "Artigo", "Artikel", "Статья", "Artykuł", "기사")], ["video", T("Vidéo", "Video", "Vídeo", "Video", "動画", "Video", "فيديو", "视频", "Video", "Vídeo", "Video", "Видео", "Film", "동영상")], ["ressource", T("Ressource", "Resource", "Recurso", "Risorsa", "資料", "Ressource", "مورد", "资源", "Bron", "Recurso", "Resurs", "Ресурс", "Materiał", "자료")]];
    fenetrePartage = h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", dir: rtl ? "rtl" : "ltr", style: { position: "fixed", inset: 0, zIndex: 9000, background: NOIR, fontFamily: M, color: IV, overflowY: "auto" } },
      h("div", { style: { maxWidth: 620, margin: "0 auto", padding: "calc(env(safe-area-inset-top) + 16px) 20px calc(env(safe-area-inset-bottom) + 28px)" } },
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
          h("div", null,
            h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: CH } }, (groupe && groupe.nom) || ""),
            h("div", { style: { fontFamily: SERIF, fontSize: 24, marginTop: 2 } }, T("Partager avec l'équipe", "Share with the team", "Compartir con el equipo", "Condividi con la squadra", "チームと共有", "Mit dem Team teilen", "مشاركة مع الفريق", "与团队分享", "Delen met het team", "Partilhar com a equipa", "Dela med laget", "Поделиться с командой", "Udostępnij drużynie", "팀과 공유"))),
          h("button", { type: "button", disabled: envoi, onClick: function () { setPartageOuvert(false); }, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IV, fontSize: 15, cursor: "pointer" } }, "\u2715")),
        h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 30, margin: "6px 0 10px", transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
        pEtat === "fini" ? h("div", { style: { textAlign: "center", padding: "30px 0" } },
            h("div", { style: { fontFamily: SERIF, fontSize: 22 } }, T("Partagé avec l'équipe.", "Shared with the team.", "Compartido con el equipo.", "Condiviso con la squadra.", "チームと共有しました。", "Mit dem Team geteilt.", "تمت المشاركة مع الفريق.", "已与团队分享。", "Gedeeld met het team.", "Partilhado com a equipa.", "Delat med laget.", "Отправлено команде.", "Udostępniono drużynie.", "팀과 공유했어요.")),
            h("button", { type: "button", onClick: function () { setPartageOuvert(false); }, style: { marginTop: 20, minHeight: 44, padding: "0 26px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))
        : h("div", null,
          h("label", { htmlFor: "tp-url", style: { display: "block", fontSize: 12.5, color: IV3, marginBottom: 6 } }, T("Colle l'adresse de l'article, de la vidéo ou de la page", "Paste the address of the article, video or page", "Pega la dirección del artículo, del vídeo o de la página", "Incolla l'indirizzo dell'articolo, del video o della pagina", "記事・動画・ページのアドレスを貼り付けて", "Füge die Adresse des Artikels, Videos oder der Seite ein", "الصق عنوان المقال أو الفيديو أو الصفحة", "粘贴文章、视频或网页的地址", "Plak het adres van het artikel, de video of de pagina", "Cola o endereço do artigo, do vídeo ou da página", "Klistra in adressen till artikeln, videon eller sidan", "Вставь адрес статьи, видео или страницы", "Wklej adres artykułu, filmu lub strony", "기사, 동영상 또는 페이지 주소를 붙여 넣으세요")),
          h("input", { id: "tp-url", type: "url", inputMode: "url", autoCapitalize: "off", autoCorrect: "off", value: pUrl, disabled: envoi, onChange: function (e) { setPUrl(e.target.value); }, placeholder: "https://…",
            style: { width: "100%", boxSizing: "border-box", minHeight: 46, padding: "0 2px", border: "none", borderBottom: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 16, outline: "none" } }),
          /* aperçu */
          pEtat === "lecture" ? h("div", { style: { fontSize: 12, color: IV3, marginTop: 16 } }, T("Lecture de l'aperçu…", "Loading preview…", "Cargando vista previa…", "Caricamento anteprima…", "プレビューを読み込み中…", "Vorschau wird geladen…", "جارٍ تحميل المعاينة…", "正在读取预览…", "Voorbeeld laden…", "A carregar a pré-visualização…", "Läser förhandsvisning…", "Загрузка превью…", "Wczytywanie podglądu…", "미리보기 불러오는 중…"))
          : ap ? h("div", { style: { display: "flex", gap: 12, marginTop: 18, padding: 12, borderRadius: 14, border: "1px solid " + CH3 } },
              h("div", { style: { width: 96, flex: "0 0 96px", aspectRatio: "16 / 11", borderRadius: 10, overflow: "hidden", background: PAN, display: "flex", alignItems: "center", justifyContent: "center", color: CH, fontFamily: SERIF, fontSize: 24 } },
                ap.image ? h("img", { src: ap.image, alt: "", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover" } }) : "\u2726"),
              h("div", { style: { minWidth: 0, flex: 1 } },
                h("div", { style: { fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: CH } }, pType === "article_hype" ? (T("Article Hype", "Hype article", "Artículo Hype", "Articolo Hype", "Hype記事", "Hype-Artikel", "مقال Hype", "Hype 文章", "Hype-artikel", "Artigo Hype", "Hype-artikel", "Статья Hype", "Artykuł Hype", "Hype 기사") + (ap.categorie ? " · " + ap.categorie : "")) : (ap.site || "")),
                h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 3 } }, ap.titre || (ap.site ? T("Lien vers ", "Link to ", "Enlace a ", "Link a ", "リンク先：", "Link zu ", "رابط إلى ", "链接至 ", "Link naar ", "Link para ", "Länk till ", "Ссылка на ", "Link do ", "링크: ") + ap.site : urlPropre(pUrl))),
                ap.resume ? h("div", { dir: "auto", style: { fontSize: 11.5, color: IV2, marginTop: 4, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" } }, ap.resume)
                  : ap.secours ? h("div", { style: { fontSize: 11, color: IV3, marginTop: 4 } }, T("Ce site ne donne pas d'aperçu : le lien sera partagé tel quel.", "This site gives no preview: the link will be shared as it is.", "Este sitio no ofrece vista previa: el enlace se compartirá tal cual.", "Questo sito non fornisce un'anteprima: il link sarà condiviso così com'è.", "このサイトはプレビューを出しません。リンクはそのまま共有されます。", "Diese Seite liefert keine Vorschau: Der Link wird so geteilt, wie er ist.", "هذا الموقع لا يقدّم معاينة: سيُشارك الرابط كما هو.", "该网站不提供预览：链接将按原样分享。", "Deze site geeft geen voorbeeld: de link wordt gedeeld zoals hij is.", "Este site não dá pré-visualização: o link será partilhado tal como está.", "Den här sidan ger ingen förhandsvisning: länken delas som den är.", "Этот сайт не даёт превью: ссылка будет отправлена как есть.", "Ta strona nie udostępnia podglądu: link zostanie udostępniony bez zmian.", "이 사이트는 미리보기를 제공하지 않아요. 링크가 그대로 공유돼요.")) : null))
          : null,
          /* type (sauf article Hype, reconnu tout seul) */
          pType === "article_hype" ? null : h("div", { style: { display: "flex", gap: 8, marginTop: 18 } }, TYPES.map(function (t) {
            var on = pType === t[0];
            return h("button", { key: t[0], type: "button", disabled: envoi, onClick: function () { setPType(t[0]); }, style: { flex: 1, minHeight: 40, borderRadius: 12, border: "1px solid " + (on ? CH : "rgba(243,238,228,0.12)"), background: on ? "linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95))" : "rgba(16,26,29,.45)", color: on ? IV : IV2, fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, t[1]);
          })),
          h("div", { style: { display: "flex", alignItems: "center", gap: 12, minHeight: 50, borderBottom: "1px solid " + CH3, marginTop: 14 } },
            h("label", { htmlFor: "tp-com", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, T("Un mot ?", "A word?", "¿Unas palabras?", "Una parola?", "ひとこと", "Ein Wort?", "كلمة؟", "说点什么？", "Een woordje?", "Uma palavra?", "Ett ord?", "Пара слов?", "Kilka słów?", "한마디?")),
            h("input", { id: "tp-com", value: pCom, disabled: envoi, onChange: function (e) { setPCom(e.target.value); }, placeholder: T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택 사항"), style: { flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: IV, fontFamily: M, fontSize: 16, textAlign: "end" } })),
          (pEtat && pEtat !== "lecture" && pEtat !== "envoi") ? h("div", { role: "alert", style: { marginTop: 14, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", color: "#FF9B9B", fontSize: 12.5 } }, pEtat) : null,
          h("button", { type: "button", disabled: !pret || envoi, onClick: publierPartage, style: { width: "100%", marginTop: 22, minHeight: 48, borderRadius: 999, border: "1px solid " + (pret ? CH : "rgba(243,238,228,0.14)"), background: "transparent", color: pret ? IV : IV3, fontFamily: M, fontSize: 14, fontWeight: 600, cursor: pret && !envoi ? "pointer" : "default" } },
            envoi ? "…" : T("Partager avec l'équipe", "Share with the team", "Compartir con el equipo", "Condividi con la squadra", "チームと共有", "Mit dem Team teilen", "مشاركة مع الفريق", "与团队分享", "Delen met het team", "Partilhar com a equipa", "Dela med laget", "Поделиться с командой", "Udostępnij drużynie", "팀과 공유")))));
  }

  /* ───────── ÉPINGLES HB : épingles Hey Baby partagées avec le groupe ───────── */
  var _ouv = React.useState(null); var epOuverte = _ouv[0], setEpOuverte = _ouv[1];
  function carteEpingle(e) {
    var ouv = epOuverte === e.id, qui = profilsParId[e.partage_par];
    return h("div", { key: "ep" + e.id, style: { padding: "14px 0", borderTop: "1px solid rgba(243,238,228,0.06)" } },
      h("button", { type: "button", onClick: function () { setEpOuverte(ouv ? null : e.id); }, style: { width: "100%", background: "none", border: "none", padding: 0, color: IV, textAlign: "start", cursor: "pointer" } },
        h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: CH } }, e.cheval_nom ? T("Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ", "Hey Baby · ") + e.cheval_nom : "Hey Baby"),
        h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 3 } }, e.question || ""),
        h("div", { dir: "auto", style: { fontFamily: M, fontSize: 12, color: IV2, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-wrap", overflow: ouv ? "visible" : "hidden", display: ouv ? "block" : "-webkit-box", WebkitLineClamp: ouv ? "none" : 3, WebkitBoxOrient: "vertical" } }, e.reponse || ""),
        h("div", { style: { fontFamily: M, fontSize: 10.5, color: IV3, marginTop: 6 } }, T("Partagée par ", "Shared by ", "Compartida por ", "Condivisa da ", "共有者：", "Geteilt von ", "شاركتها ", "分享者：", "Gedeeld door ", "Partilhada por ", "Delad av ", "Поделился(-ась): ", "Udostępnione przez ", "공유한 사람: ") + nomProfil(qui) + (ouv ? "" : " · " + T("Lire tout", "Read all", "Leer todo", "Leggi tutto", "全文を読む", "Alles lesen", "قراءة الكل", "阅读全部", "Alles lezen", "Ler tudo", "Läs allt", "Читать полностью", "Czytaj całość", "전체 읽기")))));
  }
  function ongletEpingles() {
    if (epingles === null) return chargement();
    if (!epingles.length) return vide(T("Aucune épingle partagée avec l'équipe pour l'instant.", "No pins shared with the team yet.", "Aún no hay pines compartidos con el equipo.", "Ancora nessun pin condiviso con la squadra.", "チームと共有されたピンはまだありません。", "Noch keine Pins mit dem Team geteilt.", "لا توجد تثبيتات مشتركة مع الفريق بعد.", "还没有与团队分享的收藏。", "Nog geen pins gedeeld met het team.", "Ainda não há pins partilhados com a equipa.", "Inga nålar delade med laget än.", "Пока нет закладок, отправленных команде.", "Brak przypiętych wpisów udostępnionych drużynie.", "아직 팀과 공유한 핀이 없어요."));
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
  var _fcq = React.useState(null); var fConc = _fcq[0], setFConc = _fcq[1];   /* 06/11 soir : concours (facultatif) */
  var _fm = React.useState(false); var fSansSon = _fm[0], setFSansSon = _fm[1];
  var _frs = React.useState(""); var fRes = _frs[0], setFRes = _frs[1];   /* 08/11 (Blandine, choix B) : résultat facultatif, pré-rempli quand Hype le connaît */
  var _fra = React.useState(""); var fResAuto = _fra[0], setFResAuto = _fra[1];
  var _crs = React.useState(""); var concRes = _crs[0], setConcRes = _crs[1];   /* correction du résultat après coup */   /* 06/11 : case « Sans le son » */
  var _fp = React.useState(null); var fEtat = _fp[0], setFEtat = _fp[1];   /* null | { etape, pct, texte, erreur } */
  function aujourdhui() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function ouvrirAjout(pre) {
    setFSource("fichier"); setFFichier(null); setFHype(null); setFTitre(""); setFConcours(""); setFDate(aujourdhui()); setFDesc(""); setFEtat(null); setFSansSon(false); setFConc(null); setFRes(""); setFResAuto("");
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
      titre: meta.titre || null, description: meta.description || null, concours: meta.concours || null, date_video: meta.date || null, sans_son: !!meta.sansSon, lieu: meta.lieu || null, agenda_id: meta.agenda || null, epreuve: meta.epreuve || null, resultat: meta.resultat || null, auteur_id: moi.id }).select("id").single();
    if (r && r.error) {
      var msg = String(r.error.message || r.error);
      if (/duplicate|unique/i.test(msg)) throw new Error(T("Cette vidéo est déjà dans la vidéothèque de l'équipe.", "This video is already in the team library.", "Este vídeo ya está en la videoteca del equipo.", "Questo video è già nella videoteca della squadra.", "この動画はすでにチームのライブラリにあります。", "Dieses Video ist bereits in der Videothek des Teams.", "هذا الفيديو موجود بالفعل في مكتبة الفريق.", "该视频已在团队视频库中。", "Deze video staat al in de videotheek van het team.", "Este vídeo já está na videoteca da equipa.", "Den här videon finns redan i lagets videobibliotek.", "Это видео уже есть в видеотеке команды.", "Ten film jest już w wideotece drużyny.", "이 동영상은 이미 팀 라이브러리에 있어요."));
      throw new Error(msg);
    }
    var id = r && r.data && r.data.id;
    if (!id) throw new Error(T("la base n'a pas confirmé l'ajout", "the addition was not confirmed", "no se confirmó el añadido", "l'aggiunta non è stata confermata", "追加が確認されませんでした", "das Hinzufügen wurde nicht bestätigt", "لم يتم تأكيد الإضافة", "未确认添加", "de toevoeging is niet bevestigd", "a adição não foi confirmada", "tillägget bekräftades inte", "добавление не подтверждено", "dodanie nie zostało potwierdzone", "추가가 확인되지 않았어요"));
    var rc = await supa.from("team_videos_cavaliers").insert(meta.cav.map(function (u) { return { video_id: id, user_id: u }; }));
    var rh = await supa.from("team_videos_chevaux").insert(meta.ch.map(function (c) { return { video_id: id, cheval_id: c }; }));
    if ((rc && rc.error) || (rh && rh.error)) {
      try { await supa.from("team_videos").delete().eq("id", id); } catch (eD) { }
      throw new Error(String(((rc && rc.error) || (rh && rh.error)).message || T("rattachement refusé", "link refused", "vinculación rechazada", "collegamento rifiutato", "紐づけが拒否されました", "Zuordnung abgelehnt", "تم رفض الربط", "关联被拒绝", "koppeling geweigerd", "associação recusada", "kopplingen nekades", "привязка отклонена", "przypisanie odrzucone", "연결이 거부됐어요")));
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
  /* 08/11 : résultat déjà connu dans Hype (même concours, même épreuve, un des chevaux choisis) → on pré-remplit */
  function texteResultat(x) {
    if (!x) return "";
    if (x.place) return x.place + T(x.place === 1 ? "er" : "e", x.place === 1 ? "st" : x.place === 2 ? "nd" : x.place === 3 ? "rd" : "th", "º", "º", "位", ".", "", "名", "e", "º", ":a", "-е", ".", "위") + (x.partants ? " / " + x.partants : "");
    return x.classement || "";
  }
  React.useEffect(function () {
    var ok = true;
    if (!ajout || !fConc || !fConc.epreuve || !fCh.length || typeof supa === "undefined" || !supa) return;
    (async function () {
      try {
        var r = await supa.rpc("team_resultat_suggere", { p_agenda: fConc.agenda_id || null, p_date: fConc.agenda_id ? null : (fConc.date || null), p_epreuve: fConc.epreuve, p_chevaux: fCh.slice() });
        var x = r && !r.error && r.data && r.data[0];
        var t = texteResultat(x);
        if (!ok || !t) return;
        setFRes(function (avant) { return (!avant || avant === fResAuto) ? t : avant; }); setFResAuto(t);
      } catch (eS) { }
    })();
    return function () { ok = false; };
  }, [ajout, fConc && fConc.agenda_id, fConc && fConc.epreuve, fConc && fConc.date, fCh.join(",")]);
  async function enregistrerResultat(v, txt) {
    if (!v || !v.id) return;
    try {
      var r = await supa.rpc("team_video_resultat", { p_id: v.id, p_resultat: txt || "" });
      if (r && !r.error && r.data === true) setVideos(function (l) { return (l || []).map(function (x) { return x.id === v.id ? Object.assign({}, x, { resultat: (txt || "").trim() || null }) : x; }); });
    } catch (eR) { }
  }
  async function publier() {
    if (!fPret || !groupe || !moi) return;
    var meta = { groupe: groupe.id, titre: null, concours: (fConc && fConc.titre) || null, date: (fConc && fConc.date) || aujourdhui(), lieu: (fConc && fConc.lieu && String(fConc.lieu).trim()) || null, agenda: (fConc && fConc.agenda_id) || null, epreuve: (fConc && fConc.epreuve) || null,
      description: fDesc.trim(), cav: fCav.slice(), ch: fCh.slice(), sansSon: !!fSansSon, resultat: fRes.trim().slice(0, 60) };
    try {
      if (fSource === "hype") {
        setFEtat({ etape: "envoi", pct: 100, texte: T("Ajout à la vidéothèque…", "Adding to the library…", "Añadiendo a la videoteca…", "Aggiunta alla videoteca…", "ライブラリに追加中…", "Wird zur Videothek hinzugefügt…", "جارٍ الإضافة إلى المكتبة…", "正在添加到视频库…", "Toevoegen aan de videotheek…", "A adicionar à videoteca…", "Lägger till i biblioteket…", "Добавление в видеотеку…", "Dodawanie do wideoteki…", "라이브러리에 추가하는 중…") });
        await creerFiche(fHype.playback_id, fHype.duree, fHype.id, meta);
      } else {
        setFEtat({ etape: "envoi", pct: 0, texte: T("Préparation de l'envoi…", "Preparing upload…", "Preparando el envío…", "Preparazione dell'invio…", "アップロードを準備中…", "Upload wird vorbereitet…", "جارٍ تحضير الإرسال…", "正在准备上传…", "Upload voorbereiden…", "A preparar o envio…", "Förbereder uppladdning…", "Подготовка к отправке…", "Przygotowywanie wysyłki…", "업로드 준비 중…") });
        var rCr = await hypeMuxAppel({ cible: "team:" + groupe.id }, 25);
        if (!rCr || rCr.error || !rCr.data || !rCr.data.url || !rCr.data.upload_id) {
          var refus = String((rCr && rCr.error) || "");
          throw new Error(/plafond|autoris|quota/i.test(refus) ? T("Tu as atteint ton nombre maximum de vidéos.", "You've reached your maximum number of videos.", "Has alcanzado tu número máximo de vídeos.", "Hai raggiunto il numero massimo di video.", "動画の上限数に達しました。", "Du hast deine maximale Anzahl an Videos erreicht.", "لقد بلغت الحد الأقصى لعدد الفيديوهات.", "你的视频数量已达上限。", "Je hebt je maximale aantal video's bereikt.", "Atingiste o teu número máximo de vídeos.", "Du har nått ditt maxantal videor.", "Ты достиг(ла) максимального числа видео.", "Osiągnięto maksymalną liczbę filmów.", "동영상 최대 개수에 도달했어요.") : (T("Envoi refusé : ", "Upload refused: ", "Envío rechazado: ", "Invio rifiutato: ", "アップロードが拒否されました：", "Upload abgelehnt: ", "تم رفض الإرسال: ", "上传被拒绝：", "Upload geweigerd: ", "Envio recusado: ", "Uppladdningen nekades: ", "Отправка отклонена: ", "Wysyłka odrzucona: ", "업로드가 거부됐어요: ") + (refus || "?")));
        }
        var upId = String(rCr.data.upload_id);
        var rTr = await hypeVideoTraceMaj(upId, { destination_type: "team", destination_id: String(groupe.id), nom: fFichier.name }, null);
        if (!rTr || rTr.error) throw new Error(T("Suivi de l'envoi impossible, rien n'a été envoyé.", "The upload couldn't be tracked; nothing was sent.", "No se pudo seguir el envío; no se ha enviado nada.", "Impossibile seguire l'invio, non è stato inviato nulla.", "アップロードを追跡できず、何も送信されませんでした。", "Der Upload konnte nicht verfolgt werden, es wurde nichts gesendet.", "تعذّر تتبع الإرسال، لم يُرسل أي شيء.", "无法跟踪上传，未发送任何内容。", "Upload kon niet gevolgd worden, er is niets verstuurd.", "Não foi possível acompanhar o envio, nada foi enviado.", "Uppladdningen kunde inte följas, inget skickades.", "Не удалось отследить отправку, ничего не отправлено.", "Nie można śledzić wysyłki, nic nie zostało wysłane.", "업로드를 추적할 수 없어 아무것도 보내지 않았어요."));
        var rUp = await hypeMuxEnvoyerFichier(rCr.data.url, fFichier, function (pct) { setFEtat({ etape: "envoi", pct: pct, texte: T("Envoi de la vidéo… ", "Uploading video… ", "Enviando el vídeo… ", "Invio del video… ", "動画をアップロード中… ", "Video wird hochgeladen… ", "جارٍ إرسال الفيديو… ", "正在上传视频… ", "Video uploaden… ", "A enviar o vídeo… ", "Laddar upp videon… ", "Отправка видео… ", "Wysyłanie filmu… ", "동영상 업로드 중… ") + pct + " %" }); });
        if (rUp && rUp.error) { try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: "envoi : " + rUp.error }, "pasReady"); } catch (e2) { } throw new Error(T("Envoi interrompu : ", "Upload interrupted: ", "Envío interrumpido: ", "Invio interrotto: ", "アップロードが中断されました：", "Upload unterbrochen: ", "توقف الإرسال: ", "上传中断：", "Upload onderbroken: ", "Envio interrompido: ", "Uppladdningen avbröts: ", "Отправка прервана: ", "Wysyłka przerwana: ", "업로드가 중단됐어요: ") + rUp.error); }
        try { await hypeVideoTraceMaj(upId, { statut: "processing" }, "pasReady"); } catch (e3) { }
        var muxId = null; try { var rm = await supa.from("videos_mux").select("id").eq("upload_id", upId).maybeSingle(); muxId = rm && rm.data && rm.data.id; } catch (e4) { }
        setFEtat({ etape: "envoi", pct: 100, texte: T("Vidéo reçue, Mux la prépare…", "Video received, Mux is preparing it…", "Vídeo recibido, Mux lo está preparando…", "Video ricevuto, Mux lo sta preparando…", "動画を受信しました。Muxが準備中…", "Video empfangen, Mux bereitet es vor…", "تم استلام الفيديو، Mux يجهّزه…", "已收到视频，Mux 正在处理…", "Video ontvangen, Mux bereidt hem voor…", "Vídeo recebido, a Mux está a prepará-lo…", "Videon mottagen, Mux förbereder den…", "Видео получено, Mux его обрабатывает…", "Film odebrany, Mux go przygotowuje…", "동영상을 받았어요. Mux가 준비 중…") });
        var rSt = await hypeMuxAttendrePret(upId);
        if (rSt && rSt.playback_id) {
          await creerFiche(rSt.playback_id, rSt.duree, muxId, meta);
          try { await hypeVideoTraceMaj(upId, { statut: "ready", playback_id: rSt.playback_id, duree: rSt.duree || null }, "pasReady"); } catch (e5) { }
        } else if (rSt && rSt.errored) {
          try { await hypeVideoTraceMaj(upId, { statut: "errored", erreur: String(rSt.error || "Mux") }, "pasReady"); } catch (e6) { }
          throw new Error(T("Mux n'a pas pu préparer cette vidéo.", "Mux could not prepare this video.", "Mux no pudo preparar este vídeo.", "Mux non è riuscito a preparare questo video.", "Muxがこの動画を準備できませんでした。", "Mux konnte dieses Video nicht vorbereiten.", "تعذّر على Mux تجهيز هذا الفيديو.", "Mux 无法处理此视频。", "Mux kon deze video niet voorbereiden.", "A Mux não conseguiu preparar este vídeo.", "Mux kunde inte förbereda den här videon.", "Mux не смог обработать это видео.", "Mux nie mógł przygotować tego filmu.", "Mux가 이 동영상을 준비하지 못했어요."));
        } else {
          ecrireAttente(lireAttente().concat([{ user: moi.id, upload: upId, muxId: muxId, meta: meta }]));
          setFEtat({ etape: "fini", texte: T("La vidéo est bien envoyée. Elle est encore en préparation : elle apparaîtra ici dans quelques minutes.", "Your video has been sent. It's still being prepared and will appear here in a few minutes.", "El vídeo se ha enviado. Aún se está preparando: aparecerá aquí en unos minutos.", "Il video è stato inviato. È ancora in preparazione: apparirà qui tra qualche minuto.", "動画は送信されました。まだ準備中で、数分後にここに表示されます。", "Das Video wurde gesendet. Es wird noch vorbereitet und erscheint in ein paar Minuten hier.", "تم إرسال الفيديو. لا يزال قيد التجهيز وسيظهر هنا خلال بضع دقائق.", "视频已发送，仍在处理中，几分钟后会显示在这里。", "De video is verstuurd. Hij wordt nog voorbereid en verschijnt hier over een paar minuten.", "O vídeo foi enviado. Ainda está em preparação: vai aparecer aqui dentro de alguns minutos.", "Videon är skickad. Den förbereds fortfarande och visas här om några minuter.", "Видео отправлено. Оно ещё обрабатывается и появится здесь через несколько минут.", "Film został wysłany. Wciąż jest przygotowywany i pojawi się tu za kilka minut.", "동영상을 보냈어요. 아직 준비 중이라 몇 분 뒤 여기에 나타나요.") });
          return;
        }
      }
      setFEtat({ etape: "fini", texte: T("Vidéo ajoutée à la vidéothèque de l'équipe.", "Video added to the team library.", "Vídeo añadido a la videoteca del equipo.", "Video aggiunto alla videoteca della squadra.", "チームのライブラリに動画を追加しました。", "Video zur Videothek des Teams hinzugefügt.", "تمت إضافة الفيديو إلى مكتبة الفريق.", "视频已添加到团队视频库。", "Video toegevoegd aan de videotheek van het team.", "Vídeo adicionado à videoteca da equipa.", "Videon har lagts till i lagets bibliotek.", "Видео добавлено в видеотеку команды.", "Film dodany do wideoteki drużyny.", "팀 라이브러리에 동영상을 추가했어요.") });
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
    var resume = (fCav.length && fCh.length) ? fCav.map(function (u) { return nomProfil(profilsParId[u]); }).join(", ") + " " + T("sur", "on", "con", "su", "×", "auf", "على", "骑", "op", "com", "på", "на", "na", "/") + " " + fCh.map(nomCheval).join(", ") : "";
    var dureeChoisie = fSource === "hype" && fHype ? duree(fHype.duree) : "";

    /* haut : la vidéo choisie en grand, ou une grande zone pour la choisir */
    var haut = aVideo
      ? h("div", { style: { position: "relative", height: "clamp(210px, 56vw, 320px)", background: PAN } },
          fSource === "fichier"
            ? h("video", { src: fApercu ? fApercu + "#t=0.1" : undefined, muted: true, playsInline: true, preload: "metadata", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : h("img", { src: "https://image.mux.com/" + fHype.playback_id + "/thumbnail.jpg?width=900&fit_mode=preserve&time=2", alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
          h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,8,.35), rgba(7,10,8,.05) 40%, " + NOIR + " 98%)" } }),
          h("div", { style: { position: "absolute", insetInlineStart: 20, insetInlineEnd: 20, bottom: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" } },
            h("span", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: CH } }, T("Ta vidéo", "Your video", "Tu vídeo", "Il tuo video", "あなたの動画", "Dein Video", "الفيديو الخاص بك", "你的视频", "Jouw video", "O teu vídeo", "Din video", "Твоё видео", "Twój film", "내 동영상") + (dureeChoisie ? " · " + dureeChoisie : "")),
            h("button", { type: "button", disabled: envoiEnCours, onClick: function () { setFFichier(null); setFHype(null); }, style: { background: "none", border: "none", padding: "6px 0", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } }, T("Changer", "Change", "Cambiar", "Cambia", "変更", "Ändern", "تغيير", "更换", "Wijzigen", "Alterar", "Byt", "Изменить", "Zmień", "변경"))))
      : h("div", { style: { padding: "calc(env(safe-area-inset-top) + 72px) 20px 8px" } },
          fSource === "fichier"
            ? h("label", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, height: 168, borderRadius: 18, border: "1px dashed " + CH2, cursor: "pointer" } },
                h("span", { style: { color: CH, fontSize: 30, lineHeight: 1 } }, "+"),
                h("span", { style: { fontSize: 13, color: IV } }, T("Choisir une vidéo", "Choose a video", "Elegir un vídeo", "Scegli un video", "動画を選ぶ", "Video auswählen", "اختر فيديو", "选择视频", "Kies een video", "Escolher um vídeo", "Välj en video", "Выбрать видео", "Wybierz film", "동영상 선택")),
                h("span", { style: { fontSize: 11, color: IV3 } }, T("3 minutes au plus", "3 minutes max", "3 minutos como máximo", "3 minuti al massimo", "最長3分", "Höchstens 3 Minuten", "3 دقائق كحد أقصى", "最长 3 分钟", "Maximaal 3 minuten", "3 minutos no máximo", "Högst 3 minuter", "Не более 3 минут", "Maksymalnie 3 minuty", "최대 3분")),
                h("input", { type: "file", accept: "video/*", onChange: async function (e) { var f = e.target.files && e.target.files[0]; try { if (typeof hypeVerifierQualiteMedia === "function") f = await hypeVerifierQualiteMedia(f); } catch (eTq) { }   /* 06/11 : Titi, jamais bloquant */ setFFichier(f || null); }, style: { display: "none" } }))
            : (mesVideos === null ? vide(T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Wird geladen…", "جارٍ التحميل…", "加载中…", "Laden…", "A carregar…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
              : !mesVideos.length ? vide(T("Tu n'as pas encore de vidéo dans Hype.", "You don't have any videos in Hype yet.", "Aún no tienes vídeos en Hype.", "Non hai ancora video su Hype.", "Hypeにはまだ動画がありません。", "Du hast noch keine Videos in Hype.", "ليس لديك أي فيديو في Hype بعد.", "你在 Hype 中还没有视频。", "Je hebt nog geen video's in Hype.", "Ainda não tens vídeos no Hype.", "Du har inga videor i Hype än.", "У тебя пока нет видео в Hype.", "Nie masz jeszcze filmów w Hype.", "아직 Hype에 동영상이 없어요."))
              : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 } }, mesVideos.slice(0, 12).map(function (mv) {
                  return h("button", { key: "mv" + mv.id, type: "button", onClick: function () { setFHype(mv); }, style: { padding: 0, background: "none", border: "none", cursor: "pointer" } },
                    h("div", { style: { aspectRatio: "16 / 10", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(243,238,228,0.1)", background: PAN } },
                      h("img", { src: "https://image.mux.com/" + mv.playback_id + "/thumbnail.jpg?width=300&fit_mode=preserve", alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })),
                    h("div", { style: { fontSize: 10, marginTop: 4, color: IV3, textAlign: "start" } }, dateCourte(mv.created_at)));
                }))),
          h("button", { type: "button", onClick: function () { setFSource(fSource === "fichier" ? "hype" : "fichier"); }, style: { display: "block", margin: "12px auto 0", background: "none", border: "none", padding: "6px 0", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } },
            fSource === "fichier" ? T("ou choisir parmi mes vidéos Hype", "or pick from my Hype videos", "o elegir entre mis vídeos de Hype", "oppure scegli tra i miei video Hype", "またはHypeの動画から選ぶ", "oder aus meinen Hype-Videos wählen", "أو اختر من فيديوهاتي في Hype", "或从我的 Hype 视频中选择", "of kies uit mijn Hype-video's", "ou escolher entre os meus vídeos Hype", "eller välj bland mina Hype-videor", "или выбрать из моих видео в Hype", "lub wybierz z moich filmów w Hype", "또는 내 Hype 동영상에서 선택") : T("ou choisir sur mon téléphone", "or pick from my phone", "o elegir en mi teléfono", "oppure scegli dal mio telefono", "またはスマホから選ぶ", "oder vom Handy auswählen", "أو اختر من هاتفي", "或从手机中选择", "of kies op mijn telefoon", "ou escolher no meu telemóvel", "eller välj från min telefon", "или выбрать на телефоне", "lub wybierz z telefonu", "또는 내 휴대폰에서 선택")));

    var tuilesChevaux = !idsCh.length ? h("div", { style: { fontSize: 11.5, color: IV3, padding: "6px 0" } }, T("Aucun cheval dans l'équipe : ajoute-les depuis la page Team.", "No horses in the team: add them from the Team page.", "No hay caballos en el equipo: añádelos desde la página Team.", "Nessun cavallo nella squadra: aggiungili dalla pagina Team.", "チームに馬がいません。Teamページから追加してね。", "Keine Pferde im Team: Füge sie auf der Team-Seite hinzu.", "لا توجد خيول في الفريق: أضفها من صفحة Team.", "团队中没有马匹：请在 Team 页面添加。", "Geen paarden in het team: voeg ze toe via de Team-pagina.", "Não há cavalos na equipa: adiciona-os a partir da página Team.", "Inga hästar i laget: lägg till dem från Team-sidan.", "В команде нет лошадей: добавь их на странице Team.", "Brak koni w drużynie: dodaj je na stronie Team.", "팀에 말이 없어요. Team 페이지에서 추가하세요."))
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
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "72%", display: "flex", flexDirection: "column", background: NOIR, borderRadius: "24px 24px 0 0", borderTop: "1px solid " + CH3, padding: "12px 20px calc(env(safe-area-inset-bottom) + 96px)" } },
        h("div", { style: { width: 40, height: 4, borderRadius: 2, background: "rgba(243,238,228,0.2)", margin: "0 auto 14px" } }),
        h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          h("div", { style: { fontFamily: SERIF, fontSize: 26 } }, T("Qui monte ?", "Who's riding?", "¿Quién monta?", "Chi monta?", "誰が乗る？", "Wer reitet?", "من يركب؟", "谁来骑？", "Wie rijdt er?", "Quem monta?", "Vem rider?", "Кто едет?", "Kto jedzie?", "누가 타나요?")),
          h("button", { type: "button", onClick: function () { setFeuilleCav(false); }, style: { background: "none", border: "none", minHeight: 40, padding: "0 4px", color: CH, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, "OK")),
        h("div", { style: { fontSize: 11.5, color: IV3, margin: "4px 0 8px" } }, T("Un ou plusieurs cavaliers", "One or more riders", "Uno o varios jinetes", "Uno o più cavalieri", "1人または複数のライダー", "Eine oder mehrere Reiter", "فارس واحدة أو أكثر", "一位或多位骑手", "Een of meer ruiters", "Uma ou vários cavaleiros", "En eller flera ryttare", "Один или несколько всадников", "Jeden lub kilku jeźdźców", "한 명 이상의 라이더")),
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
              h("div", { style: { fontFamily: SERIF, fontSize: 22, marginTop: 2 } }, T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "동영상 추가"))),
            h("button", { type: "button", onClick: fermerAjout, disabled: envoiEnCours, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.2)", background: "rgba(7,10,8,0.5)", color: IV, fontSize: 15, cursor: "pointer", opacity: envoiEnCours ? 0.4 : 1 } }, "✕")),
          fEtat && fEtat.etape === "fini"
            ? h("div", { style: { padding: "calc(env(safe-area-inset-top) + 110px) 24px 40px", textAlign: "center" } },
                h("div", { style: { fontFamily: SERIF, fontSize: 24, lineHeight: 1.25 } }, fEtat.texte),
                h("button", { type: "button", onClick: function () { setAjout(null); }, style: { marginTop: 22, minHeight: 44, padding: "0 26px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))
            : envoiEnCours ? (function () {   /* 07/11 — ENVOI « C » (choix laissé à Claude par Blandine) : la vidéo en grand, le % dans un cercle */
                var pct = Math.max(0, Math.min(100, Math.round(fEtat.pct || 0))), RC = 44, LC = 2 * Math.PI * RC;
                return h("div", null,
                  h("div", { style: { position: "relative", height: "clamp(260px, 70vw, 380px)", background: PAN, overflow: "hidden" } },
                    fSource === "fichier" ? h("video", { src: fApercu ? fApercu + "#t=0.1" : undefined, muted: true, playsInline: true, preload: "metadata", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
                      : (fHype ? h("img", { src: "https://image.mux.com/" + fHype.playback_id + "/thumbnail.jpg?width=900&fit_mode=preserve&time=2", alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null),
                    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "rgba(7,10,8,0.45)" } }),
                    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, " + NOIR + ")" } }),
                    h("div", { role: "status", "aria-live": "polite", style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, paddingTop: 30 } },
                      h("svg", { width: 104, height: 104, viewBox: "0 0 104 104", "aria-hidden": "true" },
                        h("circle", { cx: 52, cy: 52, r: RC, fill: "rgba(7,10,8,0.55)", stroke: "rgba(243,238,228,0.18)", strokeWidth: 3 }),
                        h("circle", { cx: 52, cy: 52, r: RC, fill: "none", stroke: CH, strokeWidth: 3, strokeLinecap: "round", strokeDasharray: LC.toFixed(1), strokeDashoffset: (LC * (1 - pct / 100)).toFixed(1), transform: "rotate(-90 52 52)", style: { transition: "stroke-dashoffset .3s" } }),
                        h("text", { x: 52, y: 60, textAnchor: "middle", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, fill: IV }, pct + " %")),
                      h("div", { style: { fontSize: 12, color: IV, textShadow: "0 1px 6px rgba(0,0,0,.8)", padding: "0 24px", textAlign: "center" } }, fEtat.texte || ""))),
                  h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 36, marginTop: -8, position: "relative", transform: rtl ? "scaleX(-1)" : "none" } },
                    h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
                  h("div", { style: { padding: "0 20px calc(env(safe-area-inset-bottom) + 120px)" } },
                    h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 22, lineHeight: 1.25 } }, resume),
                    fConc ? h("div", { dir: "auto", style: { fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: IV3, marginTop: 5 } }, libelleConc(fConc)) : null,
                    fDesc.trim() ? h("div", { dir: "auto", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: IV2, marginTop: 6 } }, "« " + fDesc.trim() + " »") : null,
                    h("div", { style: { fontSize: 12, color: IV2, lineHeight: 1.6, marginTop: 20 } }, T("Garde cette page ouverte : la vidéo apparaîtra dans la vidéothèque de l'équipe dès qu'elle sera prête.", "Keep this page open: the video will appear in the team library as soon as it is ready.", "Mantén esta página abierta: el vídeo aparecerá en la videoteca del equipo en cuanto esté listo.", "Tieni aperta questa pagina: il video apparirà nella videoteca della squadra appena sarà pronto.", "このページを開いたままにしてね。準備ができ次第、チームのライブラリに動画が表示されます。", "Lass diese Seite offen: Das Video erscheint in der Team-Mediathek, sobald es fertig ist.", "أبقِ هذه الصفحة مفتوحة: سيظهر الفيديو في مكتبة الفريق فور جاهزيته.", "请保持此页面打开：视频准备好后会出现在团队视频库中。", "Laat deze pagina open: de video verschijnt in de teambibliotheek zodra hij klaar is.", "Mantenha esta página aberta: o vídeo aparecerá na videoteca da equipa assim que estiver pronto.", "Håll sidan öppen: videon visas i lagets bibliotek så snart den är klar.", "Не закрывай эту страницу: видео появится в видеотеке команды, как только будет готово.", "Nie zamykaj tej strony: wideo pojawi się w wideotece drużyny, gdy tylko będzie gotowe.", "이 페이지를 열어 두세요. 준비되는 대로 팀 영상함에 표시돼요."))));
              })()
            : h("div", null,
                haut,
                h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 36, marginTop: -8, position: "relative", transform: rtl ? "scaleX(-1)" : "none" } },
                  h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
                h("div", { style: { padding: "0 20px calc(env(safe-area-inset-bottom) + 120px)" } },   /* 06/11 : + place pour le menu du bas (« on voit pas le bas de page ») */
                  /* cavalière */
                  h("button", { type: "button", disabled: envoiEnCours, onClick: function () { setFeuilleCav(true); }, style: Object.assign({}, LIGNE, { width: "100%", background: "none", borderTop: "none", borderInlineStart: "none", borderInlineEnd: "none", padding: 0, color: IV, fontFamily: M, cursor: "pointer" }) },
                    h("span", { style: { fontSize: 12.5, color: IV3 } }, T("Cavalier", "Rider", "Jinete", "Cavaliere", "ライダー", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "라이더")),
                    h("span", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } },
                      fCav.slice(0, 2).map(function (u) { return h("span", { key: "a" + u, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500 } }, avatar(profilsParId[u] || { pseudo: "?" }, 28), nomProfil(profilsParId[u])); }),
                      fCav.length > 2 ? h("span", { style: { fontSize: 12, color: IV2 } }, "+" + (fCav.length - 2)) : null,
                      h("span", { style: { color: CH, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" } }, fCav.length ? T("+ Ajouter", "+ Add", "+ Añadir", "+ Aggiungi", "+ 追加", "+ Hinzufügen", "+ إضافة", "+ 添加", "+ Toevoegen", "+ Adicionar", "+ Lägg till", "+ Добавить", "+ Dodaj", "+ 추가") : T("Choisir", "Choose", "Elegir", "Scegli", "選ぶ", "Auswählen", "اختر", "选择", "Kiezen", "Escolher", "Välj", "Выбрать", "Wybierz", "선택")))),
                  /* cheval */
                  h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "16px 0 10px" } },
                    h("span", { style: { fontSize: 12.5, color: IV3 } }, T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말")),
                    h("span", { style: { fontSize: 10.5, color: IV3 } }, T("un ou plusieurs", "one or more", "uno o varios", "uno o più", "1頭または複数", "eines oder mehrere", "واحد أو أكثر", "一匹或多匹", "een of meer", "um ou vários", "en eller flera", "одна или несколько", "jeden lub kilka", "한 마리 이상"))),
                  tuilesChevaux,
                  /* 06/11 soir — concours (facultatif) */
                  h("button", { type: "button", disabled: envoiEnCours, onClick: function () { ouvrirFeuilleConc("form", fConc); }, style: Object.assign({}, LIGNE, { marginTop: 14, width: "100%", background: "none", borderTop: "none", borderInlineStart: "none", borderInlineEnd: "none", padding: 0, color: IV, fontFamily: M, cursor: "pointer" }) },
                    h("span", { style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, T("Concours", "Competition", "Concurso", "Concorso", "競技会", "Turnier", "المسابقة", "比赛", "Wedstrijd", "Concurso", "Tävling", "Соревнование", "Zawody", "대회")),
                    h("span", { dir: "auto", style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, fontSize: fConc ? 14 : 12.5, color: fConc ? IV : IV3 } },
                      h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, fConc ? libelleConc(fConc) : T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택")),
                      h("span", { style: { color: CH, fontSize: 12 } }, rtl ? "‹" : "›"))),
                  /* 08/11 — résultat (facultatif), pré-rempli quand Hype le connaît */
                  h("div", { style: Object.assign({}, LIGNE, { marginTop: 0 }) },
                    h("label", { htmlFor: "tv-res", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, "🏆 " + T("Résultat", "Result", "Resultado", "Risultato", "結果", "Ergebnis", "النتيجة", "成绩", "Resultaat", "Resultado", "Resultat", "Результат", "Wynik", "결과")),
                    h("input", { id: "tv-res", value: fRes, maxLength: 60, disabled: envoiEnCours, onChange: function (e) { setFRes(e.target.value); }, placeholder: T("Facultatif · ex. 2e / 35", "Optional · e.g. 2nd / 35", "Opcional · p. ej. 2º / 35", "Facoltativo · es. 2º / 35", "任意・例：2位 / 35", "Optional · z. B. 2. / 35", "اختياري · مثال: 2 / 35", "可选 · 例如 第2名 / 35", "Optioneel · bv. 2e / 35", "Opcional · ex. 2º / 35", "Valfritt · t.ex. 2:a / 35", "Необязательно · напр. 2-е / 35", "Opcjonalnie · np. 2. / 35", "선택 · 예: 2위 / 35"),
                      style: { flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: IV, fontFamily: M, fontSize: 16, textAlign: "end" } })),
                  /* un mot */
                  h("div", { style: Object.assign({}, LIGNE, { marginTop: 0 }) },
                    h("label", { htmlFor: "tv-desc", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, T("Un mot ?", "A word?", "¿Unas palabras?", "Una parola?", "ひとこと", "Ein Wort?", "كلمة؟", "说点什么？", "Een woordje?", "Uma palavra?", "Ett ord?", "Пара слов?", "Kilka słów?", "한마디?")),
                    h("input", { id: "tv-desc", value: fDesc, disabled: envoiEnCours, onChange: function (e) { setFDesc(e.target.value); }, placeholder: T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택 사항"),
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
                    resume || (!aVideo ? T("Choisis ta vidéo, le cavalier et le cheval.", "Pick your video, the rider and the horse.", "Elige tu vídeo, el jinete y el caballo.", "Scegli il tuo video, il cavaliere e il cavallo.", "動画、ライダー、馬を選んでね。", "Wähle dein Video, die Reiter und das Pferd.", "اختر الفيديو والفارس والحصان.", "选择你的视频、骑手和马匹。", "Kies je video, de ruiter en het paard.", "Escolhe o teu vídeo, o cavaleiro e o cavalo.", "Välj din video, ryttaren och hästen.", "Выбери видео, всадника и лошадь.", "Wybierz film, jeźdźca i konia.", "동영상, 라이더, 말을 선택하세요.") : T("Choisis le cavalier et le cheval.", "Pick the rider and the horse.", "Elige el jinete y el caballo.", "Scegli il cavaliere e il cavallo.", "ライダーと馬を選んでね。", "Wähle die Reiter und das Pferd.", "اختر الفارس والحصان.", "选择骑手和马匹。", "Kies de ruiter en het paard.", "Escolhe o cavaleiro e o cavalo.", "Välj ryttaren och hästen.", "Выбери всадника и лошадь.", "Wybierz jeźdźca i konia.", "라이더와 말을 선택하세요."))),
                  fEtat && fEtat.etape === "erreur" ? h("div", { role: "alert", style: { marginBottom: 12, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12.5, lineHeight: 1.45 } }, fEtat.texte) : null,
                  envoiEnCours ? h("div", { style: { marginBottom: 12 } },
                    h("div", { style: { fontSize: 12, color: IV2, marginBottom: 8 } }, fEtat.texte),
                    h("div", { style: { height: 3, borderRadius: 2, background: "rgba(243,238,228,0.1)", overflow: "hidden" } }, h("div", { style: { width: (fEtat.pct || 0) + "%", height: "100%", background: CH, transition: "width .3s" } })),
                    h("div", { style: { fontSize: 10.5, color: IV3, marginTop: 8 } }, T("Garde cette page ouverte pendant l'envoi.", "Keep this page open while uploading.", "Mantén esta página abierta durante el envío.", "Tieni aperta questa pagina durante l'invio.", "アップロード中はこのページを開いたままにしてね。", "Lass diese Seite während des Uploads geöffnet.", "أبقِ هذه الصفحة مفتوحة أثناء الإرسال.", "上传期间请保持此页面打开。", "Houd deze pagina open tijdens het uploaden.", "Mantém esta página aberta durante o envio.", "Håll sidan öppen medan videon laddas upp.", "Не закрывай эту страницу во время отправки.", "Nie zamykaj tej strony podczas wysyłania.", "업로드하는 동안 이 페이지를 열어 두세요."))) : null,
                  h("button", { type: "button", disabled: !fPret || envoiEnCours, onClick: publier,
                    style: { width: "100%", minHeight: 48, borderRadius: 999, border: "1px solid " + (fPret ? CH : "rgba(243,238,228,0.14)"), background: "transparent", color: fPret ? IV : IV3, fontFamily: M, fontSize: 14, fontWeight: 600, letterSpacing: ".02em", cursor: fPret && !envoiEnCours ? "pointer" : "default" } },
                    envoiEnCours ? "…" : T("Publier dans la vidéothèque", "Publish to the library", "Publicar en la videoteca", "Pubblica nella videoteca", "ライブラリに公開", "In der Videothek veröffentlichen", "نشر في المكتبة", "发布到视频库", "Publiceren in de videotheek", "Publicar na videoteca", "Publicera i biblioteket", "Опубликовать в видеотеке", "Opublikuj w wideotece", "라이브러리에 게시")))))),
      feuille);
  }

  /* 06/11 soir — feuille « Quel concours ? » : les concours passés de l'agenda de la Team (les plus récents d'abord),
     « Pas de concours », et « Autre » pour écrire la date et le lieu. Sert au formulaire ET à la correction après coup. */
  function feuilleConcours() {
    if (!feuilleConc) return null;
    var actuelId = feuilleConc.pour === "form" ? (fConc && fConc.agenda_id) : (feuilleConc.pour && feuilleConc.pour.agenda_id);
    function ligne(cle, haut, bas, on, onClick) {
      return h("button", { key: cle, type: "button", "aria-pressed": !!on, onClick: onClick,
        style: { width: "100%", display: "flex", alignItems: "center", gap: 12, minHeight: 54, background: "none", border: "none", borderBottom: "1px solid rgba(243,238,228,0.06)", padding: "6px 0", color: IV, fontFamily: M, textAlign: "start", cursor: "pointer" } },
        h("span", { style: { flex: 1, minWidth: 0 } },
          h("span", { dir: "auto", style: { display: "block", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, haut),
          bas ? h("span", { dir: "auto", style: { display: "block", fontSize: 11, color: IV3, marginTop: 2 } }, bas) : null),
        h("span", { style: { flex: "0 0 22px", width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (on ? CH : "rgba(243,238,228,0.2)"), background: on ? "radial-gradient(circle, " + CH + " 0 4px, transparent 5px)" : "transparent" } }));
    }
    var CHAMP = { flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: IV, fontFamily: M, fontSize: 16, textAlign: "end", colorScheme: "dark" };
    return h("div", { role: "dialog", "aria-modal": "true", "data-noswipe": "1", dir: rtl ? "rtl" : "ltr", style: { position: "fixed", inset: 0, zIndex: 9100 } },
      h("div", { onClick: function () { setFeuilleConc(null); }, style: { position: "absolute", inset: 0, background: "rgba(7,10,8,0.7)" } }),
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, maxWidth: 620, margin: "0 auto", maxHeight: "78%", display: "flex", flexDirection: "column", background: NOIR, borderRadius: "24px 24px 0 0", borderTop: "1px solid " + CH3, padding: "12px 20px calc(env(safe-area-inset-bottom) + 96px)", fontFamily: M, color: IV } },
        h("div", { style: { width: 40, height: 4, borderRadius: 2, background: "rgba(243,238,228,0.2)", margin: "0 auto 14px" } }),
        concEv ? h("button", { type: "button", onClick: function () { setConcEv(null); }, style: { alignSelf: "flex-start", background: "none", border: "none", padding: "2px 0 6px", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer" } }, (rtl ? "› " : "‹ ") + T("Concours", "Competition", "Concurso", "Concorso", "競技会", "Turnier", "المسابقة", "比赛", "Wedstrijd", "Concurso", "Tävling", "Соревнование", "Zawody", "대회")) : null,
        h("div", { style: { fontFamily: SERIF, fontSize: 26, marginBottom: concEv ? 2 : 6 } }, concEv ? T("Quelle épreuve ?", "Which class?", "¿Qué prueba?", "Quale prova?", "どの競技？", "Welche Prüfung?", "أي فئة؟", "哪个项目？", "Welke rubriek?", "Qual prova?", "Vilken klass?", "Какой маршрут?", "Który konkurs?", "어떤 종목인가요?") : T("Quel concours ?", "Which competition?", "¿Qué concurso?", "Quale concorso?", "どの競技会？", "Welches Turnier?", "أي مسابقة؟", "哪场比赛？", "Welke wedstrijd?", "Qual concurso?", "Vilken tävling?", "Какое соревнование?", "Które zawody?", "어떤 대회인가요?")),
        concEv ? h("div", { dir: "auto", style: { fontSize: 11.5, color: IV3, marginBottom: 8 } }, libelleConc(concEv)) : null,
        /* 08/11 — corriger le résultat d'une vidéo déjà en ligne */
        (!concEv && feuilleConc.pour && feuilleConc.pour !== "form" && feuilleConc.pour.id) ? h("div", { style: Object.assign({}, LIGNE, { marginBottom: 6 }) },
          h("label", { htmlFor: "tq-res", style: { fontSize: 12.5, color: IV3, flex: "0 0 auto" } }, "🏆 " + T("Résultat", "Result", "Resultado", "Risultato", "結果", "Ergebnis", "النتيجة", "成绩", "Resultaat", "Resultado", "Resultat", "Результат", "Wynik", "결과")),
          h("input", { id: "tq-res", value: concRes, maxLength: 60, onChange: function (e) { setConcRes(e.target.value); },
            onBlur: function () { var v0 = feuilleConc.pour; if ((concRes || "").trim() !== (v0.resultat || "")) enregistrerResultat(v0, concRes); },
            placeholder: T("Facultatif · ex. 2e / 35", "Optional · e.g. 2nd / 35", "Opcional · p. ej. 2º / 35", "Facoltativo · es. 2º / 35", "任意・例：2位 / 35", "Optional · z. B. 2. / 35", "اختياري · مثال: 2 / 35", "可选 · 例如 第2名 / 35", "Optioneel · bv. 2e / 35", "Opcional · ex. 2º / 35", "Valfritt · t.ex. 2:a / 35", "Необязательно · напр. 2-е / 35", "Opcjonalnie · np. 2. / 35", "선택 · 예: 2위 / 35"),
            style: CHAMP })) : null,
        concEv ? h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch" } },
          epreuvesConc === null ? h("div", { style: { fontSize: 12, color: IV3, padding: "10px 0" } }, "…")
            : epreuvesConc.length ? epreuvesConc.map(function (ep) { return ligne("ep" + ep, ep, null, concEpreuve === ep, function () { choisirConc({ ev: concEv, epreuve: ep }); }); })
            : h("div", { style: { fontSize: 12, color: IV3, fontStyle: "italic", padding: "10px 0" } }, T("Aucune épreuve trouvée pour ce concours : écris-la ci-dessous.", "No class found for this competition: type it below.", "No se encontró ninguna prueba para este concurso: escríbela abajo.", "Nessuna prova trovata per questo concorso: scrivila qui sotto.", "この競技会の競技が見つかりません。下に入力してください。", "Keine Prüfung für dieses Turnier gefunden: trag sie unten ein.", "لم يتم العثور على أي فئة لهذه المسابقة: اكتبها أدناه.", "未找到该比赛的项目：请在下方填写。", "Geen rubriek gevonden voor deze wedstrijd: typ hem hieronder.", "Nenhuma prova encontrada para este concurso: escreva-a abaixo.", "Ingen klass hittades för tävlingen: skriv den nedan.", "Маршруты этого соревнования не найдены: впиши ниже.", "Nie znaleziono konkursu dla tych zawodów: wpisz go poniżej.", "이 대회의 종목을 찾지 못했어요. 아래에 입력해 주세요.")),
          h("div", { style: LIGNE },
            h("label", { htmlFor: "tq-ep", style: { fontSize: 12.5, color: IV3 } }, T("Autre épreuve", "Other class", "Otra prueba", "Altra prova", "その他の競技", "Andere Prüfung", "فئة أخرى", "其他项目", "Andere rubriek", "Outra prova", "Annan klass", "Другой маршрут", "Inny konkurs", "다른 종목")),
            h("input", { id: "tq-ep", value: epreuvesConc && epreuvesConc.indexOf(concEpreuve) !== -1 ? "" : concEpreuve, maxLength: 120, onChange: function (e) { setConcEpreuve(e.target.value); }, placeholder: T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택"), style: CHAMP })),
          h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
            h("button", { type: "button", onClick: function () { choisirConc({ ev: concEv, epreuve: "" }); }, style: { flex: 1, minHeight: 44, borderRadius: 999, border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IV2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Passer", "Skip", "Omitir", "Salta", "スキップ", "Überspringen", "تخطٍّ", "跳过", "Overslaan", "Pular", "Hoppa över", "Пропустить", "Pomiń", "건너뛰기")),
            h("button", { type: "button", onClick: function () { choisirConc({ ev: concEv, epreuve: concEpreuve }); }, style: { flex: 1, minHeight: 44, borderRadius: 999, border: "1px solid " + CH, background: "transparent", color: CH, fontFamily: M, fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, T("Valider", "Confirm", "Confirmar", "Conferma", "決定", "Bestätigen", "تأكيد", "确认", "Bevestigen", "Confirmar", "Bekräfta", "Готово", "Zatwierdź", "확인")))) :
        h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch" } },
          concoursEquipe.length ? concoursEquipe.map(function (c) {
            return ligne("cq" + c.id, c.lieu || c.titre || "—", [c.lieu && c.titre && c.titre !== c.lieu ? c.titre : "", dateCourte(c.date_jour)].filter(Boolean).join(" · "), actuelId === c.id && !concAutre, function () { allerEpreuve(c); });
          }) : h("div", { style: { fontSize: 12, color: IV3, fontStyle: "italic", padding: "10px 0" } }, T("Aucun concours dans l'agenda de l'équipe.", "No competitions in the team agenda.", "No hay concursos en la agenda del equipo.", "Nessun concorso nell'agenda della squadra.", "チームの予定に競技会はありません。", "Keine Turniere im Team-Kalender.", "لا توجد مسابقات في جدول الفريق.", "团队日程中没有比赛。", "Geen wedstrijden in de teamagenda.", "Não há concursos na agenda da equipa.", "Inga tävlingar i lagets kalender.", "В календаре команды нет соревнований.", "Brak zawodów w kalendarzu drużyny.", "팀 일정에 대회가 없어요.")),
          ligne("cq-autre", T("Autre (date et lieu)", "Other (date and place)", "Otro (fecha y lugar)", "Altro (data e luogo)", "その他（日付と場所）", "Andere (Datum und Ort)", "أخرى (التاريخ والمكان)", "其他（日期和地点）", "Anders (datum en plaats)", "Outro (data e local)", "Annat (datum och plats)", "Другое (дата и место)", "Inne (data i miejsce)", "기타 (날짜와 장소)"), null, concAutre, function () { setConcAutre(!concAutre); }),
          concAutre ? h("div", { style: { padding: "4px 0 6px" } },
            h("div", { style: LIGNE },
              h("label", { htmlFor: "tq-date", style: { fontSize: 12.5, color: IV3 } }, T("Date", "Date", "Fecha", "Data", "日付", "Datum", "التاريخ", "日期", "Datum", "Data", "Datum", "Дата", "Data", "날짜")),
              h("input", { id: "tq-date", type: "date", value: concDate, max: aujourdhui(), onChange: function (e) { setConcDate(e.target.value); }, style: CHAMP })),
            h("div", { style: LIGNE },
              h("label", { htmlFor: "tq-lieu", style: { fontSize: 12.5, color: IV3 } }, T("Lieu", "Place", "Lugar", "Luogo", "場所", "Ort", "المكان", "地点", "Plaats", "Local", "Plats", "Место", "Miejsce", "장소")),
              h("input", { id: "tq-lieu", value: concLieu, maxLength: 80, onChange: function (e) { setConcLieu(e.target.value); }, placeholder: T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택"), style: CHAMP })),
            h("div", { style: LIGNE },
              h("label", { htmlFor: "tq-ep2", style: { fontSize: 12.5, color: IV3 } }, T("Épreuve", "Class", "Prueba", "Prova", "競技", "Prüfung", "الفئة", "项目", "Rubriek", "Prova", "Klass", "Маршрут", "Konkurs", "종목")),
              h("input", { id: "tq-ep2", value: concEpreuve, maxLength: 120, onChange: function (e) { setConcEpreuve(e.target.value); }, placeholder: T("Facultatif", "Optional", "Opcional", "Facoltativo", "任意", "Optional", "اختياري", "可选", "Optioneel", "Opcional", "Valfritt", "Необязательно", "Opcjonalnie", "선택"), style: CHAMP })),
            h("button", { type: "button", onClick: function () { choisirConc({ autre: true, date: concDate || aujourdhui(), lieu: concLieu, epreuve: concEpreuve }); },
              style: { width: "100%", marginTop: 14, minHeight: 44, borderRadius: 999, border: "1px solid " + CH, background: "transparent", color: CH, fontFamily: M, fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, T("Valider", "Confirm", "Confirmar", "Conferma", "決定", "Bestätigen", "تأكيد", "确认", "Bevestigen", "Confirmar", "Bekräfta", "Готово", "Zatwierdź", "확인"))) : null,
          ligne("cq-aucun", T("Pas de concours", "No competition", "Sin concurso", "Nessun concorso", "競技会なし", "Kein Turnier", "بدون مسابقة", "不关联比赛", "Geen wedstrijd", "Sem concurso", "Ingen tävling", "Без соревнования", "Bez zawodów", "대회 없음"), null, false, function () { choisirConc({ aucun: true }); }))));
  }

  /* 07/11 — PAGE DE LECTURE « B » (choix laissé à Claude par Blandine : « la vidéo est tout là-haut » avec du noir dessous) :
     la vidéo, puis sa fiche (cavalière(s) sur cheval(aux), concours · épreuve · date, le petit mot), le j'aime, le son pour
     l'auteur, les commentaires, et vidéo précédente / suivante dans la liste de l'équipe. */
  /* 08/11 soir (Blandine « Ok vas y ») : la vidéo de la Team s'ouvre dans la PAGE VIDÉO COMMUNE (HypePageVideo, maquette
     immersive), comme celles du cavalier et du cheval. En bas : les autres vidéos du même concours (sinon du même cheval) ;
     ronds = photos réelles du même concours (sinon du cheval) ; dessous, tout ce que la Team avait déjà (cavaliers, son,
     collection, j'aime, commentaires, précédente / suivante). */
  function lecteurTeam() {
    if (!visu || !visuV) return null;
    var v = (videos || []).filter(function (x) { return x.id === visuV; })[0];
    if (!v) return null;
    if (typeof HypePageVideo !== "function") return null;
    var liste = videos || [], idx = liste.indexOf(v);
    var prec = idx > 0 ? liste[idx - 1] : null, suiv = idx >= 0 && idx < liste.length - 1 ? liste[idx + 1] : null;
    var cavs = (v.cavaliers || []).map(function (u) { return profilsParId[u]; }).filter(Boolean);
    var titre = cavs.map(nomProfil).join(", ") + (v.chevaux && v.chevaux.length ? (cavs.length ? " " + T("sur", "on", "con", "su", "／", "auf", "على", "骑", "op", "com", "på", "на", "na", "—") + " " : "") + v.chevaux.map(nomCheval).join(", ") : "");
    var lieuLigne = [v.lieu || v.concours || "", v.epreuve || "", dateCourte(v.date_video || v.cree_le)].filter(Boolean).join(" · ");
    var estAuteurV = !!(moi && v.auteur_id === moi.id);
    function fermer() { setVisu(null); setVisuV(null); }
    function navBtn(cible, txt, fin) {
      return h("button", { type: "button", disabled: !cible || occupe, onClick: function () { if (cible) lire(cible); }, style: { background: "none", border: "none", padding: "10px 0", minHeight: 44, color: cible ? IV2 : "rgba(243,238,228,0.2)", fontFamily: M, fontSize: 12.5, cursor: cible ? "pointer" : "default" } }, txt);
    }
    var memes = liste.filter(function (x) { return x.id !== v.id && v.agenda_id && x.agenda_id === v.agenda_id; });
    if (!memes.length) memes = liste.filter(function (x) { return x.id !== v.id && (x.chevaux || []).some(function (c) { return (v.chevaux || []).indexOf(c) !== -1; }); });
    function videoDe(u) { if (u === visu) return v; var m = /^team:(.+)$/.exec(String(u)); return m ? liste.filter(function (x) { return x.id === m[1]; })[0] : null; }
    var dLong = (function () { var m = String(v.date_video || v.cree_le || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; try { var t = new Intl.DateTimeFormat(lg, { weekday: "long", day: "numeric", month: "long" }).format(new Date(+m[1], +m[2] - 1, +m[3])); return t.charAt(0).toUpperCase() + t.slice(1); } catch (e) { return dateCourte(v.date_video || v.cree_le); } })();
    return h(HypePageVideo, { key: "pvt", url: visu, sansSon: !!v.sans_son, sansActions: true,
      liste: memes.map(function (x) { return "team:" + x.id; }),
      vignetteDe: function (u) { return vignetteDe(videoDe(u)); },
      dureeDe: function (u) { var x = videoDe(u); return x ? duree(x.duree) : ""; },
      onChoisir: function (u) { var x = videoDe(u); if (x) lire(x); },
      titre: v.titre || titre, surTitre: v.concours || v.lieu || "", date: dLong, ronds: tvRonds,
      onFermer: fermer,
      /* 08/11 23h40 (corrections visuelles) : son et collection passent dans le menu ••• de la page ; la navigation se fait par les miniatures */
      menu: [
        (estAuteurV || v.sans_son) ? { label: changeSon === v.id ? "…" : (v.sans_son ? "\uD83D\uDD07 " + T("Son coupé", "Muted", "Silenciado", "Muto", "ミュート", "Stumm", "صامت", "已静音", "Gedempt", "Sem som", "Ljudlös", "Без звука", "Wyciszone", "음소거") + (estAuteurV ? " — " + T("remettre le son", "turn sound back on", "volver a poner el sonido", "rimetti l’audio", "音声を戻す", "Ton wieder einschalten", "إعادة الصوت", "恢复声音", "geluid weer aan", "voltar a pôr o som", "slå på ljudet", "включить звук", "włącz dźwięk", "소리 켜기") : "") : "\uD83D\uDD0A " + T("Couper le son de la vidéo", "Mute the video", "Quitar el sonido del vídeo", "Togli l’audio al video", "動画の音声を消す", "Ton des Videos ausschalten", "كتم صوت الفيديو", "关闭视频声音", "Geluid van de video uit", "Tirar o som do vídeo", "Stäng av videons ljud", "Выключить звук видео", "Wycisz wideo", "영상 소리 끄기")), actif: estAuteurV, action: function () { basculerSon(v); } } : null,
        (colCibles && colCibles.length && visuAdr) ? { label: "+ " + T("Ajouter à une collection", "Add to a collection", "Añadir a una colección", "Aggiungi a una raccolta", "コレクションに追加", "Zu einer Sammlung hinzufügen", "إضافة إلى مجموعة", "加入合集", "Aan een collectie toevoegen", "Adicionar a uma coleção", "Lägg till i en samling", "Добавить в коллекцию", "Dodaj do kolekcji", "컬렉션에 추가"), actif: true, action: function () { ouvrirFeuilleCol(v); } } : null
      ].filter(Boolean),
      dureeSecDe: function (u) { var x = videoDe(u); return x ? (Number(x.duree) || 0) : 0; },
      bas: h("div", { className: "sc-theme-team" },
        h("style", null, ".sc-theme-team .sc-ouvrir{color:" + CH + " !important}.sc-theme-team .sc-envoyer{background:transparent !important;border:1px solid " + CH + " !important;color:" + CH + " !important}"),
        h("div", { style: { padding: "18px 18px 0" } },
            v.description ? h("div", { dir: "auto", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.4, color: IV2, marginTop: 14 } }, "« " + v.description + " »") : null,
            /* 09/11 21h20 (Blandine : « ne laisse pas les commentaires visibles sur la page ») : plus de filet ni de section à part —
               la bulle des commentaires se range à côté du cœur ; la liste ne s'ouvre que si on la touche */
            h("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 12 } },
              (typeof HypeJaimeTexte === "function") ? h(HypeJaimeTexte, { key: "jt" + v.id, cible: "teamvideo:" + v.id, marge: 0 }) : null,
              (typeof SectionCommentaires === "function") ? h("div", { style: { flex: "1 1 auto", minWidth: 0 } }, h(SectionCommentaires, { key: "sc" + v.id, cible: "teamvideo:" + v.id, theme: "team" })) : null),
null)) });
  }
  /* ───────── message « réservée au groupe » ───────── */
  var calqueReserve = !reserve ? null : h("div", { role: "dialog", "aria-modal": "true", onClick: function (eF) { if (eF.target === eF.currentTarget) setReserve(false); },
    style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(7,10,8,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 max(24px, env(safe-area-inset-left))" } },
    h("div", { dir: rtl ? "rtl" : "ltr", style: { maxWidth: 340, width: "100%", background: PAN, border: "1px solid " + CH3, borderRadius: 18, padding: "26px 22px 20px", textAlign: "center" } },
      h("div", { style: { width: 44, height: 44, margin: "0 auto 14px", borderRadius: "50%", border: "1px solid " + CH2, display: "flex", alignItems: "center", justifyContent: "center" } },
        h("svg", { width: 15, height: 17, viewBox: "0 0 11 12", "aria-hidden": "true" }, h("rect", { x: 1.2, y: 5.2, width: 8.6, height: 6, rx: 1.2, fill: "none", stroke: CH, strokeWidth: 1 }), h("path", { d: "M3.2 5.2V3.6a2.3 2.3 0 0 1 4.6 0v1.6", fill: "none", stroke: CH, strokeWidth: 1 }))),
      h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IV, lineHeight: 1.2 } }, T("Désolé, cette vidéo est réservée aux cavaliers du groupe.", "Sorry, this video is for the group's riders only.", "Lo siento, este vídeo está reservado a los jinetes del grupo.", "Spiacenti, questo video è riservato ai cavalieri del gruppo.", "ごめんね、この動画はグループのライダー専用です。", "Sorry, dieses Video ist den Reitern der Gruppe vorbehalten.", "عذرًا، هذا الفيديو مخصص لفرسان المجموعة فقط.", "抱歉，此视频仅限本组骑手观看。", "Sorry, deze video is alleen voor de ruiters van de groep.", "Desculpa, este vídeo é reservado aos cavaleiros do grupo.", "Tyvärr, den här videon är bara för gruppens ryttare.", "Извини, это видео только для всадников группы.", "Przepraszamy, ten film jest tylko dla jeźdźców z grupy.", "죄송해요, 이 동영상은 그룹 라이더 전용이에요.")),
      h("button", { type: "button", onClick: function () { setReserve(false); }, style: { marginTop: 18, minHeight: 40, padding: "0 22px", borderRadius: 999, border: "1px solid " + CH2, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Compris", "Got it", "Entendido", "Capito", "わかった", "Verstanden", "حسنًا", "知道了", "Begrepen", "Entendido", "Uppfattat", "Понятно", "Rozumiem", "알겠어요"))));

  return h("div", { dir: rtl ? "rtl" : "ltr", lang: lg, style: { minHeight: "100vh", background: NOIR, color: IV, fontFamily: M, overflowX: "clip" } },
    h("div", { style: { maxWidth: 820, margin: "0 auto" } },
      hero,
      h("div", { style: { padding: "0 18px 24px" } },
        barreOnglets,
        erreur ? h("div", { style: { marginTop: 14, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", color: "#FF9B9B", fontSize: 12 } }, T("Impossible de charger : ", "Could not load: ", "No se pudo cargar: ", "Impossibile caricare: ", "読み込めませんでした：", "Laden fehlgeschlagen: ", "تعذّر التحميل: ", "无法加载：", "Kan niet laden: ", "Não foi possível carregar: ", "Kunde inte laddas: ", "Не удалось загрузить: ", "Nie można wczytać: ", "불러오지 못했어요: ") + erreur) : null,
        onglet === "videos" ? ongletVideos() : onglet === "theorie" ? ongletTheorie() : ongletEpingles())),
    (typeof caleBarreHype === "function") ? caleBarreHype() : null,
    calqueReserve,
    questionPub ? h("div", { role: "dialog", "aria-modal": "true", onClick: function (eF) { if (eF.target === eF.currentTarget) setQuestionPub(null); },
      style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(7,10,8,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 max(24px, env(safe-area-inset-left))" } },
      h("div", { dir: rtl ? "rtl" : "ltr", style: { maxWidth: 340, width: "100%", background: PAN, border: "1px solid " + CH3, borderRadius: 18, padding: "24px 22px 18px", textAlign: "center" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IV, lineHeight: 1.25 } },
          questionPub.publique ? T("Réserver cette vidéo à l'équipe ?", "Keep this video for the team only?", "¿Reservar este vídeo al equipo?", "Riservare questo video alla squadra?", "この動画をチーム限定にする？", "Dieses Video nur für das Team?", "هل تريد حصر هذا الفيديو بالفريق؟", "将此视频设为仅团队可见？", "Deze video alleen voor het team?", "Reservar este vídeo à equipa?", "Visa den här videon bara för laget?", "Оставить это видео только для команды?", "Zostawić ten film tylko dla drużyny?", "이 동영상을 팀 전용으로 할까요?") : T("Mettre cette vidéo en public ?", "Make this video public?", "¿Hacer público este vídeo?", "Rendere pubblico questo video?", "この動画を公開する？", "Dieses Video öffentlich machen?", "هل تريد جعل هذا الفيديو عامًا؟", "将此视频设为公开？", "Deze video openbaar maken?", "Tornar este vídeo público?", "Göra den här videon offentlig?", "Сделать это видео публичным?", "Upublicznić ten film?", "이 동영상을 공개할까요?")),
        h("div", { style: { fontFamily: M, fontSize: 12, color: IV2, lineHeight: 1.5, marginTop: 8 } },
          questionPub.publique ? T("Seuls les cavaliers du groupe et la coach pourront la regarder.", "Only the group's riders and the coach will be able to watch it.", "Solo los jinetes del grupo y la entrenadora podrán verlo.", "Solo i cavalieri del gruppo e la coach potranno guardarlo.", "グループのライダーとコーチだけが見られます。", "Nur die Reiter der Gruppe und die Trainerin können es ansehen.", "لن يتمكن من مشاهدته إلا فرسان المجموعة والمدرّبة.", "只有本组骑手和教练可以观看。", "Alleen de ruiters van de groep en de coach kunnen hem bekijken.", "Só os cavaleiros do grupo e a treinadora o poderão ver.", "Bara gruppens ryttare och tränaren kan titta på den.", "Смотреть его смогут только всадники группы и тренер.", "Obejrzeć go będą mogli tylko jeźdźcy z grupy i trenerka.", "그룹 라이더와 코치만 볼 수 있어요.")
            : T("Tous les comptes Hype pourront la regarder, pas seulement l'équipe.", "Every Hype account will be able to watch it, not just the team.", "Todas las cuentas de Hype podrán verlo, no solo el equipo.", "Tutti gli account Hype potranno guardarlo, non solo la squadra.", "チームだけでなく、すべてのHypeアカウントが見られます。", "Alle Hype-Konten können es ansehen, nicht nur das Team.", "سيتمكن كل حسابات Hype من مشاهدته، وليس الفريق فقط.", "所有 Hype 账号都可以观看，不只是团队。", "Alle Hype-accounts kunnen hem bekijken, niet alleen het team.", "Todas as contas Hype o poderão ver, não só a equipa.", "Alla Hype-konton kan titta på den, inte bara laget.", "Его смогут смотреть все аккаунты Hype, а не только команда.", "Obejrzeć go będą mogły wszystkie konta Hype, nie tylko drużyna.", "팀뿐 아니라 모든 Hype 계정이 볼 수 있어요.")),
        h("div", { style: { display: "flex", gap: 10, marginTop: 18 } },
          h("button", { type: "button", onClick: function () { setQuestionPub(null); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid rgba(243,238,228,0.18)", background: "transparent", color: IV2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", onClick: confirmerPublique, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid " + CH, background: "transparent", color: CH, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, questionPub.publique ? T("Réserver", "Keep for the team", "Reservar", "Riserva", "チーム限定にする", "Nur fürs Team", "حصره بالفريق", "仅团队可见", "Alleen voor team", "Reservar", "Bara för laget", "Только команде", "Tylko dla drużyny", "팀 전용으로") : T("Mettre en public", "Make public", "Hacer público", "Rendi pubblico", "公開する", "Öffentlich machen", "جعله عامًا", "设为公开", "Openbaar maken", "Tornar público", "Gör offentlig", "Сделать публичным", "Upublicznij", "공개하기"))))) : null,
    formulaireAjout,
    feuilleConcours(),
    fenetrePartage,
    visuV ? lecteurTeam() : ((visu && typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(visu, function () { setVisu(null); }, { sansSon: visuMuet }) : null),
    fenetreFeuilleCol() /* 08/11 */);
}
/* 05/11 soir — page « conseil Hey Baby partagé avec toi » (route epingle-partagee), ouverte depuis la notification.
   La base ne laisse lire l'épingle qu'à qui elle a été partagée (ou à son autrice). Lecture seule. */
function EcranEpinglePartagee() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || o.fr)) || ""; };
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
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
        if (!id || typeof supa === "undefined") { setErr(T("Ce conseil n'est plus disponible.", "This tip is no longer available.", "Este consejo ya no está disponible.", "Questo consiglio non è più disponibile.", "このアドバイスはもう利用できません。", "Dieser Rat ist nicht mehr verfügbar.", "هذه النصيحة لم تعد متاحة.", "这条建议已不可用。", "Dit advies is niet meer beschikbaar.", "Este conselho já não está disponível.", "Det här rådet finns inte längre.", "Этот совет больше недоступен.", "Ta rada nie jest już dostępna.", "이 조언은 더 이상 볼 수 없어요.")); return; }
        var r = await supa.from("echanges_heybaby_epingles").select("id, question, reponse, cheval_nom, created_at, user_id").eq("id", id).maybeSingle();
        if (!vif) return;
        if (!r || r.error || !r.data) { setErr(T("Ce conseil n'est plus partagé avec toi.", "This tip is no longer shared with you.", "Este consejo ya no se comparte contigo.", "Questo consiglio non è più condiviso con te.", "このアドバイスはもうあなたと共有されていません。", "Dieser Rat wird nicht mehr mit dir geteilt.", "لم تعد هذه النصيحة مشتركة معك.", "这条建议已不再与你分享。", "Dit advies wordt niet meer met je gedeeld.", "Este conselho já não está partilhado contigo.", "Det här rådet delas inte längre med dig.", "Этот совет больше не доступен тебе.", "Ta rada nie jest już Ci udostępniona.", "이 조언은 더 이상 공유되지 않아요.")); return; }
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
      h("button", { type: "button", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "1px solid rgba(243,238,228,0.16)", color: IV, fontSize: 20, lineHeight: 1, cursor: "pointer" } }, "‹"),
      h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: CH, marginTop: 22 } }, "Hey Baby" + (ep && ep.cheval_nom ? " · " + ep.cheval_nom : "")),
      h("h1", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px, 9vw, 48px)", lineHeight: 1.05, margin: "6px 0 0" } }, T("Un conseil pour toi", "A tip for you", "Un consejo para ti", "Un consiglio per te", "あなたへのアドバイス", "Ein Rat für dich", "نصيحة لك", "给你的建议", "Een tip voor jou", "Um conselho para ti", "Ett råd till dig", "Совет для тебя", "Rada dla Ciebie", "너를 위한 조언")),
      h("svg", { viewBox: "0 0 400 40", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 34, margin: "8px 0 4px" } }, h("path", { d: "M0 10 C 120 14, 230 34, 400 8", fill: "none", stroke: CH, strokeWidth: 1.1 })),
      err ? h("div", { style: { fontSize: 13, color: IV3, fontStyle: "italic", marginTop: 20 } }, err)
      : !ep ? h("div", { style: { fontSize: 12, color: IV3, fontStyle: "italic", marginTop: 20 } }, T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Wird geladen…", "جارٍ التحميل…", "加载中…", "Laden…", "A carregar…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
      : h("div", null,
          qui ? h("div", { style: { fontSize: 12, color: IV3, marginTop: 6 } }, T("Partagé par ", "Shared by ", "Compartido por ", "Condiviso da ", "共有者：", "Geteilt von ", "شاركه ", "分享者：", "Gedeeld door ", "Partilhado por ", "Delad av ", "Поделился(-ась): ", "Udostępnione przez ", "공유한 사람: ") + qui) : null,
          ep.question ? h("div", { dir: "auto", style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.35, marginTop: 22, color: IV } }, "« " + ep.question + " »") : null,
          h("div", { style: { marginTop: 18, padding: "18px 17px", borderRadius: 16, border: "1px solid " + CH3, background: PAN } },
            h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: CH, marginBottom: 10 } }, T("Réponse de Hey Baby", "Hey Baby's answer", "Respuesta de Hey Baby", "Risposta di Hey Baby", "Hey Babyの回答", "Antwort von Hey Baby", "رد Hey Baby", "Hey Baby 的回答", "Antwoord van Hey Baby", "Resposta do Hey Baby", "Hey Babys svar", "Ответ Hey Baby", "Odpowiedź Hey Baby", "Hey Baby의 답변")),
            h("div", { dir: "auto", style: { fontSize: 14.5, lineHeight: 1.65, color: IV2, whiteSpace: "pre-wrap" } }, ep.reponse || "")))),
    (typeof caleBarreHype === "function") ? caleBarreHype() : null);
}
window.HypeTeamMedias = { Medias: EcranTeamMedias, Epingle: EcranEpinglePartagee, version: TM_VERSION };
})();
