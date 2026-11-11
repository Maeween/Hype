function hypeNomClubLisible(c) { /* 10/11 22h (Blandine : « avoir le nom du groupe en haut de la page ») : « societe d'equitation de paris (sep) » -> « SEP », « ecurie feinn » -> « Écurie Feinn » */
  c = String(c || "").trim(); if (!c) return "";
  var m = c.match(/\(([^)]+)\)\s*$/); if (m) return m[1].toUpperCase();
  return c.replace(/^ecurie\b/i, "Écurie").replace(/(^|[\s'-])(\S)/g, function (a, s, l) { return s + l.toUpperCase(); });
}
/* HYPE ▸ 30/10/2026 — Page TEAM COMPÉTITION (EcranTeamCompetition), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~94 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranTeamCompetition() {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  var tr = app.tr || function (o) { return (o && (o[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && o.en) || o.fr)) || ""; };
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var rtl = (lg === "ar");
  /* 06/11 (Blandine : « la page compet pour Feinn ») : la page sert à TOUTES les équipes. Équipe choisie =
     window.__teamCourante { id, club_clef, club } posée par hypeOuvrirEquipe() ; sinon la Team CSO Club de la SEP.
     Les noms TEAM_CLE / TEAM_CLUB sont redéfinis ICI pour l'équipe ouverte (les valeurs globales ne bougent pas). */
  var TC = (typeof hypeTeamCourante === "function") ? hypeTeamCourante() : null;
  var TEAM_CLE = TC ? TC.club_clef : window.TEAM_CLE;
  var TEAM_CLUB = TC ? (TC.club || TC.club_clef) : window.TEAM_CLUB;
  function SEPx(t) { return TC ? String(t || "").replace(/de la SEP/g, "de l'écurie").replace(/la SEP/g, "l'écurie").replace(/SEP/g, String(TEAM_CLUB || "")) : t; }
  var BG = "#060709", PANEL = "#0D1318", IV = "#F4F1EA", OR = "#D6B676", GR = "#9299A0";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',sans-serif";
  var CHEV = rtl ? "‹" : "›";

  var _g = React.useState(null); var groupe = _g[0], setGroupe = _g[1];
  var _mg = React.useState(false); var modifGroupe = _mg[0], setModifGroupe = _mg[1];   /* 08/11 : « Modifier le groupe » (nom, discipline, niveau) */
  /* 10/10 (799) ÉTAPE K : piquet de destination de la Team (groupes.groupe_destination_id, réglable, lien par identifiant).
     Lu à part et sans risque : si la colonne n'existe pas encore, l'erreur est ignorée et « Voir tout » garde son comportement. */
  var _gd = React.useState(null); var destPiquet = _gd[0], setDestPiquet = _gd[1];
  React.useEffect(function () {
    var vifD = true;
    if (!groupe || !groupe.id || typeof supa === "undefined" || !supa) return;
    (async function () {
      try {
        var rD = await supa.from("groupes").select("groupe_destination_id").eq("id", groupe.id).maybeSingle();
        var idD = rD && !rD.error && rD.data && rD.data.groupe_destination_id;
        if (!idD) return;
        var rP = await supa.from("groupes").select("id, nature").eq("id", idD).maybeSingle();
        if (vifD && rP && !rP.error && rP.data && rP.data.nature === "piquet") setDestPiquet(rP.data.id);
      } catch (eD) { }
    })();
    return function () { vifD = false; };
  }, [groupe && groupe.id]);
  var _mb = React.useState(null); var membres = _mb[0], setMembres = _mb[1];
  var _cl = React.useState([]); var clubMembres = _cl[0], setClubMembres = _cl[1];
  var _ch = React.useState(null); var chevaux = _ch[0], setChevaux = _ch[1];
  var _ag = React.useState(null); var agenda = _ag[0], setAgenda = _ag[1];
  /* 11/11 21h24 (Blandine) : « Nos chevaux » — les deux chevaux qui ont gagné le plus de points sur la SAISON EN COURS passent en tête
     (deux grandes demi-cases quand la grille en a), les autres ensuite, mélangés à chaque ouverture de la page. */
  var _pc = React.useState({}); var ptsChevaux = _pc[0], setPtsChevaux = _pc[1];
  var _sm = React.useState(function () { return Math.random(); }); var graineMelange = _sm[0];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        var ids = (chevaux || []).map(function (c) { return c.id; }).filter(Boolean);
        if (!ids.length || typeof supa === "undefined" || !supa || typeof hypeSaisonTeam !== "function" || typeof hypeClasserChevauxTeam !== "function") return;
        var rr = await supa.from("resultats").select("cheval_id, points, date_epreuve, epreuve, concours, visible, cavalier").in("cheval_id", ids.slice(0, 300)).limit(5000);
        if (!rr || rr.error) return;
        var aj = new Date(), ajIso = aj.getFullYear() + "-" + ("0" + (aj.getMonth() + 1)).slice(-2) + "-" + ("0" + aj.getDate()).slice(-2);
        var sCour = hypeSaisonTeam(ajIso, "poney");
        var resS = (rr.data || []).filter(function (r) { return r && hypeSaisonTeam(r.date_epreuve, r.epreuve) === sCour; });
        var o = {}; hypeClasserChevauxTeam(chevaux, resS, [], false).forEach(function (c) { o[c.id] = c.pts || 0; });
        /* 11/11 22h23 : qui l'a monté cette saison (prénoms), pour la grande carte du meilleur cheval */
        var mt = {}; resS.forEach(function (r) { if (!r || r.visible === false || !r.cheval_id) return; var pr = String(r.cavalier || "").trim().split(/\s+/)[0] || ""; if (!pr) return; pr = pr.charAt(0).toUpperCase() + pr.slice(1).toLowerCase(); var l = mt[r.cheval_id] || (mt[r.cheval_id] = []); if (l.indexOf(pr) < 0) l.push(pr); });
        o.__montes = mt;
        if (vif) setPtsChevaux(o);
      } catch (eP) { }
    })();
    return function () { vif = false; };
  }, [chevaux]);
  var _rs = React.useState(null); var resultats = _rs[0], setResultats = _rs[1];
  var _lx = React.useState({}); var lieuxConcours = _lx[0], setLieuxConcours = _lx[1];
  var _ri = React.useState({ ch: {}, cav: {} }); var resInfos = _ri[0], setResInfos = _ri[1];   /* (528) chevaux et cavalieres des resultats */
  var _ro = React.useState(null); var resOuvert = _ro[0], setResOuvert = _ro[1];   /* (528) la carte resultat depliee */   /* 01/10 (522) : lieu de chaque concours (table concours_lieux) */
  var _sv = React.useState(null); var souvenirs = _sv[0], setSouvenirs = _sv[1];
  /* 05/11 CHAPITRE « Médias » (proposition 4 de Blandine) : 2 vidéos les plus aimées + 2 derniers partages. Lecture seule ici,
     la page Médias complète est hype-ecran-team-medias.js (route team-medias). */
  var _md = React.useState(null); var mediasTop = _md[0], setMediasTop = _md[1];
  var _mp = React.useState(null); var mediasPartages = _mp[0], setMediasPartages = _mp[1];
  var _mr = React.useState(null); var vidsRecentes = _mr[0], setVidsRecentes = _mr[1];
  var _mg = React.useState(false); var menuGerer = _mg[0], setMenuGerer = _mg[1];   /* 11/11 22h29 : menu « Gérer l'équipe » (coach) */   /* 11/11 22h05 : dernières vidéos (non privées) pour « Souvenirs » + leur nombre */
  React.useEffect(function () {
    if (!groupe || !groupe.id || typeof supa === "undefined" || !supa) return;
    var vifM = true;
    (async function () {
      try {
        var rv = await supa.from("team_videos").select("id, vignette, duree, titre, concours, date_video, cree_le, resultat, privee").eq("groupe_id", groupe.id).order("cree_le", { ascending: false }).limit(200);
        var vids = ((rv && !rv.error && rv.data) || []).filter(function (x) { return !x.privee; });   /* 10/11 : les vidéos privées ne sont pas mises en avant */
        /* 05/11 soir : pas de titre saisi → on affiche le nom du cheval sous la vignette */
        if (vids.length) {
          try {
            var rhc = await supa.from("team_videos_chevaux").select("video_id, cheval_id").in("video_id", vids.map(function (x) { return x.id; }));
            var lh = (rhc && rhc.data) || [], idsH = [];
            lh.forEach(function (x) { if (idsH.indexOf(x.cheval_id) === -1) idsH.push(x.cheval_id); });
            var nh = {}; if (idsH.length) { var rnc = await supa.from("chevaux").select("id, nom, alias").in("id", idsH); ((rnc && rnc.data) || []).forEach(function (c) { nh[c.id] = c.alias || c.nom; }); }
            vids.forEach(function (x) { x.nomsChevaux = lh.filter(function (l) { return l.video_id === x.id; }).map(function (l) { return nh[l.cheval_id]; }).filter(Boolean).join(", "); });
            /* 08/11 (Blandine) : « Daphné sur Velleda » — prénom du cavalier ou de la cavalière + cheval */
            var rcv = await supa.from("team_videos_cavaliers").select("video_id, user_id").in("video_id", vids.map(function (x) { return x.id; }));
            var lc = (rcv && rcv.data) || [], idsC = [];
            lc.forEach(function (x) { if (idsC.indexOf(x.user_id) === -1) idsC.push(x.user_id); });
            var np = {}; if (idsC.length) { var rnp = await supa.from("profiles").select("id, pseudo").in("id", idsC); ((rnp && rnp.data) || []).forEach(function (pp) { np[pp.id] = String(pp.pseudo || "").trim().split(/\s+/)[0]; }); }
            vids.forEach(function (x) { x.prenoms = lc.filter(function (l) { return l.video_id === x.id; }).map(function (l) { return np[l.user_id]; }).filter(Boolean).join(", "); });
          } catch (eH) { }
        }
        var nb = {};
        if (vids.length) { var rj = await supa.rpc("team_videos_jaime", { p_groupe: groupe.id }); ((rj && !rj.error && rj.data) || []).forEach(function (x) { nb[x.video_id] = x.jaime || 0; }); }
        vids.forEach(function (x) { x.jaime = nb[x.id] || 0; });
        /* les plus aimées ; à égalité (ou aucune aimée), les plus récentes — vids est déjà du plus récent au plus ancien */
        var top = vids.map(function (x, i) { return [x, i]; }).sort(function (a, b) { return (b[0].jaime - a[0].jaime) || (a[1] - b[1]); }).slice(0, 2).map(function (x) { return x[0]; });
        var rp = await supa.from("team_partages").select("id, type, url, titre, image, commentaire, auteur_id, cree_le").eq("groupe_id", groupe.id).order("cree_le", { ascending: false }).limit(2);
        var parts = (rp && !rp.error && rp.data) || [];
        if (parts.length) {
          var idsA = parts.map(function (x) { return x.auteur_id; }).filter(Boolean);
          var ra = idsA.length ? await supa.from("profiles").select("id, pseudo").in("id", idsA) : null;
          var pa = {}; ((ra && ra.data) || []).forEach(function (x) { pa[x.id] = x.pseudo; });
          parts.forEach(function (x) { x.auteur_nom = pa[x.auteur_id] || ""; });
        }
        if (vifM) { setMediasTop(top); setMediasPartages(parts); setVidsRecentes({ n: vids.filter(function (x) { return !x.privee; }).length, l: vids.filter(function (x) { return !x.privee && x.vignette; }).slice(0, 6) }); }
      } catch (eM) { if (vifM) { setMediasTop([]); setMediasPartages([]); setVidsRecentes({ n: 0, l: [] }); } }
    })();
    return function () { vifM = false; };
  }, [groupe && groupe.id]);
  var _rm = React.useState({}); var resMasques = _rm[0], setResMasques = _rm[1];   /* (529) resultats retires de la page Team (groupes_resultats_masques) */
  var _rv = React.useState(false); var voirRetires = _rv[0], setVoirRetires = _rv[1];
  var _rdo = React.useState(null); var rdvOuvert = _rdo[0], setRdvOuvert = _rdo[1];   /* (530) la carte rendez-vous depliee */
  var _rb = React.useState(""); var resOccupe = _rb[0], setResOccupe = _rb[1];
  var _rx = React.useState(""); var errRes = _rx[0], setErrRes = _rx[1];
  var _mo = React.useState(null); var moi = _mo[0], setMoi = _mo[1];
  var _gs = React.useState(false); var gestion = _gs[0], setGestion = _gs[1];
  var _er = React.useState(""); var erreur = _er[0], setErreur = _er[1];
  var _ou = React.useState({}); var ouvert = _ou[0], setOuvert = _ou[1];
  var _pa = React.useState(false); var panneau = _pa[0], setPanneau = _pa[1];   /* (523) false | "membres" | "chevaux" */
  var _cc = React.useState([]); var clubChevaux = _cc[0], setClubChevaux = _cc[1];   /* (523) chevaux de la SEP proposés dans le panneau */
  var _ec = React.useState(""); var errChevaux = _ec[0], setErrChevaux = _ec[1];
  var _ap = React.useState([]); var agendaPasse = _ap[0], setAgendaPasse = _ap[1];
  var _po = React.useState(false); var passesOuv = _po[0], setPassesOuv = _po[1];   /* 09/11 14h08 (Blandine : « ajoute événements passés, sinon ils ne savent pas où accéder à leur concours passé ») */   /* (526) rendez-vous PASSES du groupe */
  var _cr = React.useState(null); var clubRdv = _cr[0], setClubRdv = _cr[1];   /* (526) rendez-vous a venir de la SEP, pour le panneau */
  var _vu = React.useState(null); var visu = _vu[0], setVisu = _vu[1];
  var _rq = React.useState(""); var recherche = _rq[0], setRecherche = _rq[1];
  var _oc = React.useState({}); var occupe = _oc[0], setOccupe = _oc[1];
  var _pe = React.useState(""); var errPanneau = _pe[0], setErrPanneau = _pe[1];

  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, []);

  function normTeam(s) {
    try { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
    catch (e) { return String(s || "").toLowerCase().trim(); }
  }
  function photoProfil(p) {
    var v = p && p.avatar_url;
    var s = v ? ((String(v).charAt(0) === "@") ? ((typeof CAV_IMGS !== "undefined" && CAV_IMGS[String(v).slice(1)]) || null) : v) : null;
    return s || ((typeof avatarHypeDefaut === "function") ? avatarHypeDefaut((p && (p.id || p.pseudo)) || "") : "");
  }
  function isoAuj() {
    var d = new Date(); d.setHours(0, 0, 0, 0);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  var LOC = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }[lg] || "fr-FR";
  function dateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  function moisCourt(iso) { var d = dateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat(LOC, { month: "short" }).format(d); } catch (e) { return ""; } }
  function jourMois(iso) { var d = dateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat(LOC, { day: "2-digit", month: "short" }).format(d); } catch (e) { return String(iso).slice(0, 10); } }

  /* ── les membres du groupe (relu après chaque ajout / retrait) ── */
  async function chargerMembres(idG) {
    /* 07/11 : + rôle (« coach » ou « membre ») — droits de coach dans le groupe, comme les admins WhatsApp */
    var rm = await supa.from("groupes_membres").select("user_id, ajoute_le, role").eq("groupe_id", idG).order("ajoute_le", { ascending: true });
    if (rm && rm.error) throw new Error("membres : " + (rm.error.message || rm.error));
    var ids = ((rm && rm.data) || []).map(function (x) { return x.user_id; }).filter(Boolean);
    if (!ids.length) return [];
    var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie, ville").in("id", ids);
    var parId = {}; ((rp && rp.data) || []).forEach(function (p) { parId[p.id] = p; });
    var roleDe = {}; ((rm && rm.data) || []).forEach(function (x) { roleDe[x.user_id] = x.role || "membre"; });
    return ids.map(function (i) { return parId[i] ? Object.assign({}, parId[i], { role: roleDe[i] }) : null; }).filter(Boolean);
  }

  /* (523) les chevaux du groupe, dans l'ordre d'ajout */
  /* (526) a venir / passe : MEME regle que l agenda du club (la date de FIN decide quand elle existe) */
  function estAVenir(ev) { var iso = isoAuj(); return String((ev && (ev.date_fin || ev.date_jour)) || "") >= iso; }
  function separerRdv(liste) {
    var av = [], pa = [];
    (liste || []).forEach(function (ev) { if (estAVenir(ev)) av.push(ev); else pa.push(ev); });
    av.sort(function (a, b) { return String(a.date_jour || "").localeCompare(String(b.date_jour || "")); });
    pa.sort(function (a, b) { return String(b.date_jour || "").localeCompare(String(a.date_jour || "")); });
    return { avenir: av, passe: pa };
  }
  /* (526) TOUS les rendez-vous rattaches au groupe (a venir ET passes) */
  async function chargerAgendaGroupe(idG) {
    var ra = await supa.from("agenda_groupes").select("agenda_id").eq("groupe_id", idG);
    if (ra && ra.error) throw new Error(ra.error.message || String(ra.error));
    var idsEv = ((ra && ra.data) || []).map(function (x) { return x.agenda_id; });
    if (!idsEv.length) return { avenir: [], passe: [] };
    var re = await supa.from("club_agenda").select("*").in("id", idsEv.slice(0, 300)).limit(300);
    return separerRdv((re && re.data) || []);
  }
  /* (526) les rendez-vous de l agenda de la SEP : a venir ET passes (les 200 plus recents) */
  async function chargerRdvClub() {
    try {
      var rc = await supa.from("club_agenda").select("id, titre, date_jour, date_fin, lieu, type").eq("club_clef", TEAM_CLE).order("date_jour", { ascending: false }).limit(200);
      if (rc && rc.error) { setErrPanneau(String(rc.error.message || rc.error)); setClubRdv([]); return; }
      setClubRdv((rc && rc.data) || []);
    } catch (eRc) { setErrPanneau(String(eRc)); setClubRdv([]); }
  }
  async function basculerRdv(ev, estDedans) {
    if (!groupe || !ev || !ev.id) return;
    setErrPanneau(""); setOccupe(function (o0) { var o = Object.assign({}, o0); o[ev.id] = true; return o; });
    try {
      var r = estDedans
        ? await supa.from("agenda_groupes").delete().eq("groupe_id", groupe.id).eq("agenda_id", ev.id).select("agenda_id")
        : await supa.from("agenda_groupes").insert({ groupe_id: groupe.id, agenda_id: ev.id }).select("agenda_id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base", "rifiutato dal database", "拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      var sepR = await chargerAgendaGroupe(groupe.id); setAgenda(sepR.avenir); setAgendaPasse(sepR.passe);
    } catch (eB) { setErrPanneau(T("Échec : ", "Failed: ", "Error: ", "Errore: ", "失敗：", "Fehler: ", "فشل: ", "失败：", "Mislukt: ", "Falha: ", "Misslyckades: ", "Ошибка: ", "Błąd: ", "실패: ") + String((eB && eB.message) || eB)); }
    setOccupe(function (o1) { var o2 = Object.assign({}, o1); delete o2[ev.id]; return o2; });
  }
  async function chargerChevauxGroupe(idG) {
    var rg = await supa.from("groupes_chevaux").select("cheval_id, ajoute_le").eq("groupe_id", idG).order("ajoute_le", { ascending: true });
    if (rg && rg.error) throw new Error("chevaux du groupe : " + (rg.error.message || rg.error));
    var ids = ((rg && rg.data) || []).map(function (x) { return x.cheval_id; }).filter(Boolean);
    if (!ids.length) return [];
    var rc2 = await supa.from("chevaux").select("id, nom, photo_url").in("id", ids).is("supprime_le", null);
    var parId = {}; ((rc2 && rc2.data) || []).forEach(function (c) { parId[c.id] = c; });
    return ids.map(function (i) { return parId[i]; }).filter(Boolean);
  }
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { setErreur("hors ligne"); return; }
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        /* droits affichés (la base reste seule juge) : propriétaire du club OU gestionnaire désignée */
        try {
          var proprio = (typeof clubRevendiquePar === "function") && clubRevendiquePar(TEAM_CLUB, u);
          if (proprio) { if (vif) setGestion(true); }
          else if (u && u.id) {
            var rgs = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", TEAM_CLE).eq("user_id", u.id).limit(1);
            if (vif) setGestion(!!(rgs && rgs.data && rgs.data.length));
          }
        } catch (eGs) { }
        var rg = TC ? await supa.from("groupes").select("id, club_clef, nom, discipline, niveau, type").eq("id", TC.id).maybeSingle() : await hypeRequeteTeam("id, club_clef, nom, discipline, niveau, type");   /* (783) par la fiche ; 06/11 : ou l'équipe choisie */
        if (rg && rg.error) throw new Error("groupe : " + (rg.error.message || rg.error));
        var G = rg && rg.data;
        if (!G) throw new Error("groupe « " + TEAM_NOM_GROUPE + " » introuvable");
        if (vif) setGroupe(G);
        /* 07/11 : une coach du groupe (nommée, ou créatrice du groupe) gère aussi la Team — la base reste seule juge */
        try { if (u && u.id) { var rcg = await supa.rpc("hype_coach_groupe", { p_groupe: G.id }); if (vif && rcg && rcg.data === true) setGestion(true); } } catch (eCg) { }
        var mb = await chargerMembres(G.id);
        if (vif) setMembres(mb);
        var idsCav = mb.map(function (p) { return p.id; });

        /* (523) chevaux proposés dans le panneau = ceux des membres de la SEP, même filtre que la page Club */
        var mm = [];
        try { mm = await hypeCavaliersDuClub(TEAM_CLUB, "id, pseudo, avatar_url, ecurie, ecurie2"); } catch (eCm) { mm = []; }
        if (vif) setClubMembres(mm || []);
        var idsClub = (mm || []).map(function (p) { return p.id; }).filter(Boolean);
        if (idsClub.length) {
          try {
            var rc = await supa.from("chevaux").select("id, user_id, nom, photo_url, club").in("user_id", idsClub.slice(0, 400)).is("supprime_le", null).limit(800);
            var liste = (rc && rc.data) || [];
            try { liste = hypeChevauxDuClub(liste, TEAM_CLUB); } catch (eF) { }
            if (vif) setClubChevaux(liste);
          } catch (eCc) { }
        }
        /* (523) chevaux affichés = ceux du groupe. Un échec ici ne vide pas le reste de la page. */
        var trouves = [];
        try { trouves = await chargerChevauxGroupe(G.id); } catch (eCg) { if (vif) setErrChevaux(String((eCg && eCg.message) || eCg)); }
        if (vif) setChevaux(trouves);
        var idsCh = trouves.map(function (c) { return c.id; });

        /* agenda : les rendez-vous rattachés au groupe ; (526) à venir ET passés */
        try { var sepA = await chargerAgendaGroupe(G.id); if (vif) { setAgenda(sepA.avenir); setAgendaPasse(sepA.passe); } } catch (eAg) { if (vif) setAgenda([]); }

        /* résultats : ceux des cavalières (rattachées par cavalier_id) OU des chevaux de l'équipe */
        try {
          var conds = [];
          if (idsCav.length) conds.push("cavalier_id.in.(" + idsCav.join(",") + ")");
          if (idsCh.length) conds.push("cheval_id.in.(" + idsCh.join(",") + ")");
          if (!conds.length) { if (vif) setResultats([]); }
          else {
            var rr = await supa.from("resultats").select("id, concours, epreuve, place, classement, partants, mention, cavalier, date_epreuve, cheval_id, cavalier_id, visible, masque_cavaliere, created_at").or(conds.join(",")).order("date_epreuve", { ascending: false, nullsFirst: false }).limit(60);
            var lr = ((rr && rr.data) || []).filter(function (x) { return x && x.masque_cavaliere !== true && x.visible !== false; });
            if (vif) setResultats(lr);
            /* (529) resultats retires de l equipe par la proprietaire / une gestionnaire. Table absente ou
               lecture refusee : rien n est masque (la page reste comme avant). */
            try {
              var rmq = await supa.from("groupes_resultats_masques").select("resultat_id").eq("groupe_id", G.id);
              var mq = {}; ((rmq && !rmq.error && rmq.data) || []).forEach(function (x) { mq[String(x.resultat_id)] = true; });
              if (vif) setResMasques(mq);
            } catch (eMq) { }
            /* 01/10 (522) : le lieu de chaque concours, lu dans concours_lieux (cle = nom normalise,
               meme regle que le SQL du 01/10 : sans accents, minuscules, ponctuation -> espace). */
            try {
              var cles = [];
              lr.forEach(function (x) { var k = normTeam(x.concours); if (k && cles.indexOf(k) === -1) cles.push(k); });
              if (cles.length) {
                var rl = await supa.from("concours_lieux").select("concours_cle, lieu_nom, ville, departement").in("concours_cle", cles.slice(0, 200));
                var mapL = {}; ((rl && !rl.error && rl.data) || []).forEach(function (l) { mapL[l.concours_cle] = l; });
                if (vif) setLieuxConcours(mapL);
              }
            } catch (eLx) { }
            /* (528) photo et nom du cheval, pseudo et photo de la cavaliere, pour les cartes */
            try {
              var idsChR = [], idsCvR = [];
              lr.slice(0, 60).forEach(function (x) { if (x.cheval_id && idsChR.indexOf(x.cheval_id) === -1) idsChR.push(x.cheval_id); if (x.cavalier_id && idsCvR.indexOf(x.cavalier_id) === -1) idsCvR.push(x.cavalier_id); });
              var mCh = {}, mCv = {};
              if (idsChR.length) { var rcR = await supa.from("chevaux").select("id, nom, photo_url").in("id", idsChR); ((rcR && rcR.data) || []).forEach(function (c) { mCh[c.id] = c; }); }
              if (idsCvR.length) { var rpR = await supa.from("profiles").select("id, pseudo, avatar_url").in("id", idsCvR); ((rpR && rpR.data) || []).forEach(function (p) { mCv[p.id] = p; }); }
              if (vif) setResInfos({ ch: mCh, cav: mCv });
            } catch (eRi) { }
          }
        } catch (eRs) { if (vif) setResultats([]); }

        /* souvenirs : albums publics des chevaux et des profils de l'équipe + photos où elles / ils sont identifiés */
        try {
          var out = [], vus = {};
          function pousser(u2, d) { if (!u2 || typeof u2 !== "string" || vus[u2]) return; if (String(u2).indexOf("post:") === 0) return; vus[u2] = 1; out.push({ u: u2, d: d || "" }); }
          var cibles = idsCh.map(function (x) { return "cheval:" + x; }).concat(idsCav.map(function (x) { return "cavalier:" + x; }));
          if (cibles.length) {
            var rab = await supa.from("albums_cheval").select("id, cible, photos, visibilite, user_id, created_at").in("cible", cibles.slice(0, 120)).order("created_at", { ascending: false }).limit(200);
            ((rab && rab.data) || []).forEach(function (al) {
              if (!al) return;
              if (String(al.visibilite || "public").toLowerCase() === "prive" && !(u && al.user_id === u.id)) return;
              var ph = Array.isArray(al.photos) ? al.photos.slice().reverse() : [];
              ph.forEach(function (x) { pousser(x, al.created_at); });
            });
          }
          var idsPost = [], datesPost = {};
          async function lireIdent(type, ids) {
            if (!ids.length) return;
            var ri = await supa.from("identifications").select("photo_url, created_at").eq("type", type).in("cible_id", ids.map(String).slice(0, 200)).eq("statut", "accepte").limit(300);
            ((ri && ri.data) || []).forEach(function (x) {
              var pu = String(x.photo_url || "");
              if (pu.indexOf("post:") === 0) { var pid = pu.slice(5); if (pid && idsPost.indexOf(pid) === -1) { idsPost.push(pid); datesPost[pid] = x.created_at; } return; }
              pousser(pu, x.created_at);
            });
          }
          await lireIdent("cavalier", idsCav);
          await lireIdent("cheval", idsCh);
          if (idsPost.length) {
            var rpo = await supa.from("commentaires").select("id, photo_url, medias, created_at, prive, user_id").in("id", idsPost.slice(0, 100));
            ((rpo && rpo.data) || []).forEach(function (po) {
              if (po.prive && !(u && po.user_id === u.id)) return;
              [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (x) { pousser(x, po.created_at); });
            });
          }
          out = out.filter(function (s) { return /^https?:\/\//i.test(s.u) || ((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(s.u)); });
          out.sort(function (a, b) { return String(b.d || "").localeCompare(String(a.d || "")); });
          if (vif) setSouvenirs(out.slice(0, 40));
        } catch (eSv) { if (vif) setSouvenirs([]); }
      } catch (eL) {
        if (vif) { setErreur(String((eL && eL.message) || eL)); setMembres(function (m) { return m || []; }); setChevaux(function (c) { return c || []; }); setAgenda(function (a) { return a || []; }); setResultats(function (r) { return r || []; }); setSouvenirs(function (s) { return s || []; }); }
      }
    })();
    return function () { vif = false; };
  }, []);

  /* ── navigation ── */
  function retour() { try { if (app.histLen && app.histLen > 0 && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("guilde"); }
  function ouvrirCavaliere(p) {
    try {
      if (moi && p && p.id === moi.id) { window.__cavalierOuvert = null; window.__cavalierPublic = null; }
      else { window.__cavalierPublic = { id: p.id, pseudo: p.pseudo, photo: photoProfil(p) || null, ecurie: p.ecurie || "", club: p.ecurie || "", ville: p.ville || "" }; window.__cavalierOuvert = "__public"; }
    } catch (eO) { }
    setEcran("cavalier");
  }
  function ouvrirCheval(id) { try { window.__chevalOuvert = id; } catch (e) { } setEcran("cheval"); }
  function ouvrirRdv(ev) { try { window.__agendaFiche = ev.id; } catch (e) { } setEcran("guilde"); }
  /* (526) un rendez-vous PASSE s ouvre sur sa page souvenirs (photos, fil), meme porte que l agenda du club */
  function ouvrirRdvPasse(ev) { /* 07/11 : un concours s'ouvre sur la fiche du Centre (hypeOuvrirRdv, index.html) */ hypeOuvrirRdv(ev, setEcran, function () { try { window.__evPasse = null; window.__evPasseId = ev.id; } catch (e) { } setEcran("evenement-passe"); }); }
  function ouvrirResultat(r) {
    if (r.cavalier_id) { try { window.__resCavaliereId = r.cavalier_id; } catch (e) { } setEcran("resultats-cavalier"); return; }
    if (r.cheval_id) ouvrirCheval(r.cheval_id);
  }
  function basculer(cle) { var n = Object.assign({}, ouvert); n[cle] = !n[cle]; setOuvert(n); }

  /* ── petits éléments de style ── */
  function enTete(titre, cle, total, seuil, extra) {   /* (527) extra : petit bouton pose a droite du titre */
    var montrer = (total || 0) > seuil;
    return h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, margin: "0 0 12px" } },
      h("div", { style: { fontFamily: SERIF, fontSize: 24, fontWeight: 500, color: IV, lineHeight: 1.1, minWidth: 0 } }, titre),
      h("div", { style: { display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto" } },
      montrer ? h("button", { type: "button", onClick: function () { if (cle === "ch" && destPiquet) { try { window.__ecurieHypeClub = TEAM_CLUB; window.__ecurieHypePiquet = destPiquet; } catch (eDp) { } setEcran("ecurie-hype"); return; } basculer(cle); },   /* (799) chevaux : vers le piquet de destination s'il est réglé */ style: { flex: "0 0 auto", minHeight: 36, padding: "0 2px", background: "none", border: "none", color: "rgba(244,241,234,0.78)", fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" } },
        (ouvert[cle] ? T("Réduire", "Show less", "Mostrar menos", "Riduci", "閉じる", "Weniger", "إخفاء", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기") : T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기")) + " " + (ouvert[cle] ? "˄" : CHEV)) : null,
      extra || null));
  }
  function vide(txt) { return h("div", { style: { fontFamily: M, fontSize: 11.5, color: GR, fontStyle: "italic", padding: "4px 0 2px" } }, txt); }
  function chargement() { return h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(146,153,160,0.7)", padding: "4px 0 2px" } }, T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Lädt…", "جار التحميل…", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…")); }
  function section(contenu, premier) { return h("div", { style: { padding: premier ? "8px 20px 0" : "26px 20px 0" } }, contenu); }
  function trait() { return h("div", { style: { height: 1, margin: "24px 20px 0", background: "linear-gradient(90deg, rgba(214,182,118,0), rgba(214,182,118,0.22), rgba(214,182,118,0))" } }); }

  /* 11/11 21h40 refonte de la page (maquette validée par Blandine) : cartes basses alignées, parties vides en petite carte avec photo */
  function carteBasse(key, icone, titre, sous, img, onClick, extraStyle) {
    var Tag = onClick ? "button" : "div";
    return h(Tag, Object.assign({ key: key, style: Object.assign({ position: "relative", overflow: "hidden", width: "100%", minHeight: 92, display: "flex", alignItems: "center", gap: 12, padding: "12px 13px", marginTop: 10, borderRadius: 14, background: "#0B0F13", border: "1px solid rgba(214,182,118,0.32)", color: IV, textAlign: "start", fontFamily: M, cursor: onClick ? "pointer" : "default", boxSizing: "border-box" }, extraStyle || {}) }, onClick ? { type: "button", onClick: onClick } : {}),
      img ? h("img", { src: img, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "50%", height: "100%", objectFit: "cover", display: "block", transform: rtl ? "scaleX(-1)" : "none" } }) : null,
      img ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 46%, rgba(11,15,19,0.78) 62%, rgba(11,15,19,0) 88%)" } }) : null,
      h("span", { style: { flex: "0 0 26px", position: "relative", display: "flex", justifyContent: "center" } }, icone),
      h("span", { style: { flex: "0 0 auto", position: "relative", width: 1, alignSelf: "stretch", background: "rgba(214,182,118,0.28)" } }),
      h("div", { style: { flex: 1, minWidth: 0, position: "relative", maxWidth: img ? "64%" : "none" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 19, fontWeight: 600, color: IV, lineHeight: 1.15 } }, titre),
        sous ? h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(244,241,234,0.72)", marginTop: 4, lineHeight: 1.4 } }, sous) : null),
      onClick ? h("span", { style: { flex: "0 0 auto", position: "relative", color: OR, fontSize: 18, lineHeight: 1, marginInlineStart: "auto" } }, CHEV) : null);
  }
  var ICO = {
    agenda: h("svg", { width: 22, height: 22, viewBox: "0 0 18 18", "aria-hidden": "true" }, h("rect", { x: 1.5, y: 3, width: 15, height: 13.5, rx: 2, fill: "none", stroke: OR, strokeWidth: 1.2 }), h("path", { d: "M1.5 7h15M5.5 1v4M12.5 1v4", stroke: OR, strokeWidth: 1.2 })),
    coupe: h("svg", { width: 22, height: 22, viewBox: "0 0 18 18", "aria-hidden": "true" }, h("path", { d: "M5 2h8v4a4 4 0 0 1-8 0V2Zm0 1.5H2.2c0 2.4 1.2 3.6 3.1 3.9M13 3.5h2.8c0 2.4-1.2 3.6-3.1 3.9M9 10v3.5M6 16h6M7 13.5h4", fill: "none", stroke: OR, strokeWidth: 1.2 })),
    photo: h("svg", { width: 22, height: 20, viewBox: "0 0 18 16", "aria-hidden": "true" }, h("rect", { x: 1, y: 1.5, width: 16, height: 13, rx: 1.5, fill: "none", stroke: OR, strokeWidth: 1.2 }), h("path", { d: "M2.5 12.5l4-4 3 3 2-2 4 3", fill: "none", stroke: OR, strokeWidth: 1.2 })),
    cavalier: h("svg", { width: 22, height: 22, viewBox: "0 0 20 20", "aria-hidden": "true" }, h("circle", { cx: 10, cy: 6.5, r: 3.2, fill: "none", stroke: OR, strokeWidth: 1.3 }), h("path", { d: "M3.5 17.5c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5", fill: "none", stroke: OR, strokeWidth: 1.3 })),
    video: h("svg", { width: 24, height: 21, viewBox: "0 0 18 16", "aria-hidden": "true" }, h("rect", { x: 1, y: 2, width: 12, height: 12, rx: 1.5, fill: "none", stroke: OR, strokeWidth: 1.2 }), h("path", { d: "M13 6.5l4-2.5v8l-4-2.5", fill: "none", stroke: OR, strokeWidth: 1.2 })),
    bulle: h("svg", { width: 22, height: 22, viewBox: "0 0 20 20", "aria-hidden": "true" }, h("path", { d: "M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v4a2.5 2.5 0 0 1-2.5 2.5H9l-3 2.5V13A2.5 2.5 0 0 1 4 10.5z", fill: "none", stroke: OR, strokeWidth: 1.3 })),
    perfs: h("svg", { width: 24, height: 24, viewBox: "0 0 20 20", "aria-hidden": "true" }, h("path", { d: "M3 15 H9 Q12 15 13.5 12.5 L16 7", fill: "none", stroke: OR, strokeWidth: 1.3, strokeLinecap: "round", strokeDasharray: "2 2" }), h("path", { d: "M14 3.5 L18.5 8 M15.2 2.3 L19.7 6.8", stroke: OR, strokeWidth: 1.3 }))
  };
  function videCartePh(icone, img, txt) { return videCarte(icone, txt, img); }
  function videCarte(icone, txt, img) { return carteBasse(null, icone, h("span", { style: { fontFamily: M, fontSize: 13.5, fontWeight: 400, lineHeight: 1.4 } }, txt), null, img, null, { marginTop: 0 }); }
  function partie(id, n, lab, titre) {
    return h("div", { id: id, style: { padding: "34px 20px 0", scrollMarginTop: 70 } },
      h("div", { style: { fontFamily: M, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: OR, fontWeight: 600 } }, n + " · " + lab),
      h("div", { style: { fontFamily: SERIF, fontSize: 34, fontWeight: 500, lineHeight: 1.05, color: IV, marginTop: 4 } }, titre));
  }
  var PARTIES = [   /* 11/11 23h06 : Souvenirs après Les concours (« après la saison ») */
    { id: "eq-p1", lab: T("L'équipe", "The team", "El equipo", "La squadra", "チーム", "Das Team", "الفريق", "团队", "Het team", "A equipa", "Laget", "Команда", "Drużyna", "팀"),
      titre: T("Cavaliers & chevaux", "Riders & horses", "Jinetes y caballos", "Cavalieri e cavalli", "ライダーと馬", "Reiter & Pferde", "الفرسان والخيول", "骑手与马匹", "Ruiters & paarden", "Cavaleiros e cavalos", "Ryttare & hästar", "Всадники и лошади", "Jeźdźcy i konie", "기수와 말") },   /* 11/11 23h15 : titres « A » */
    { id: "eq-p2", lab: T("La saison", "The season", "La temporada", "La stagione", "シーズン", "Die Saison", "الموسم", "赛季", "Het seizoen", "A época", "Säsongen", "Сезон", "Sezon", "시즌"),
      titre: T("Concours & résultats", "Competitions & results", "Concursos y resultados", "Concorsi e risultati", "競技会と成績", "Turniere & Ergebnisse", "المسابقات والنتائج", "比赛与成绩", "Wedstrijden & resultaten", "Concursos e resultados", "Tävlingar & resultat", "Соревнования и результаты", "Zawody i wyniki", "대회와 결과") },
    { id: "eq-p3", lab: T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "思い出", "Erinnerungen", "الذكريات", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억"),
      titre: T("Nos plus beaux moments", "Our best moments", "Nuestros mejores momentos", "I nostri momenti più belli", "最高の瞬間", "Unsere schönsten Momente", "أجمل لحظاتنا", "我们最美的时刻", "Onze mooiste momenten", "Os nossos melhores momentos", "Våra finaste stunder", "Наши лучшие моменты", "Nasze najpiękniejsze chwile", "우리의 가장 멋진 순간") },
    { id: "eq-p4", lab: T("Apprendre", "Learn", "Aprender", "Imparare", "学ぶ", "Lernen", "التعلّم", "学习", "Leren", "Aprender", "Lära", "Учиться", "Nauka", "배우기"),
      titre: T("Progresser ensemble", "Grow together", "Progresar juntos", "Progredire insieme", "一緒に上達しよう", "Gemeinsam besser werden", "نتقدّم معًا", "一起进步", "Samen vooruit", "Progredir juntos", "Utvecklas tillsammans", "Расти вместе", "Rozwijać się razem", "함께 성장하기") }
  ];
  var _pa = React.useState(0); var partieActive = _pa[0], setPartieActive = _pa[1];
  function allerPartie(i) { setPartieActive(i); try { var el = document.getElementById(PARTIES[i].id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (eS) { } }
  var menuParties = h("div", { "data-noswipe": "1", "data-hscroll": "1", style: { position: "sticky", top: 0, zIndex: 20, display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", padding: "calc(env(safe-area-inset-top) * 0 + 12px) 20px", background: "rgba(6,7,9,0.94)", borderBottom: "1px solid rgba(214,182,118,0.18)", WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" } },
    PARTIES.map(function (P, i) { var on = i === partieActive; return h("button", { key: "mp" + i, type: "button", onClick: function () { allerPartie(i); }, style: { flex: "0 0 auto", minHeight: 38, padding: "0 15px", borderRadius: 999, border: on ? "1.5px solid " + OR : "1px solid rgba(244,241,234,0.22)", background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, P.lab); }));
  React.useEffect(function () {   /* le bouton du menu suit la partie qu'on regarde */
    function surDefil() { try { var act = 0; PARTIES.forEach(function (P, i) { var el = document.getElementById(P.id); if (el && el.getBoundingClientRect().top < 140) act = i; }); setPartieActive(act); } catch (e) { } }
    window.addEventListener("scroll", surDefil, { passive: true }); return function () { window.removeEventListener("scroll", surDefil); };
  }, []);

  function portrait(key, src, nom, onClick, repli) {
    return h("button", { key: key, type: "button", onClick: onClick, style: { width: "100%", background: "none", border: "none", padding: "2px 0 4px", cursor: "pointer", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "start" } },
      h("div", { style: { width: "100%", maxWidth: 74, aspectRatio: "1 / 1", borderRadius: "50%", padding: 2, border: "1px solid rgba(214,182,118,0.75)", boxSizing: "border-box" } },
        h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#11171C", display: "flex", alignItems: "center", justifyContent: "center" } },
          src ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(src, 200, 200) : src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : h("span", { style: { fontFamily: SERIF, fontSize: 24, color: OR } }, repli || ""))),
      h("div", { dir: "auto", style: { marginTop: 8, maxWidth: "100%", fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.1, textTransform: "uppercase", color: IV, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, nom || ""),
      h("span", { style: { display: "block", width: 14, height: 1, marginTop: 6, background: "rgba(214,182,118,0.7)" } }));
  }
  function grillePortraits(items, cle) {
    var liste = ouvert[cle] ? items : items.slice(0, 8);   /* (702) deux lignes de quatre */
    /* 09/11 15h03 (Blandine : « équilibrer pour qu'il n'y ait pas de vide sur les lignes : 5 → 3 puis 2 centrés ») :
       lignes de 4 au plus, réparties le plus également possible, les plus pleines d'abord, chaque ligne centrée ; même taille de portrait */
    var n = liste.length, nbL = Math.max(1, Math.ceil(n / 4)), base = Math.floor(n / nbL), plus = n % nbL, lignes = [], k = 0;
    for (var r = 0; r < nbL; r++) { var t = base + (r < plus ? 1 : 0); lignes.push(liste.slice(k, k + t)); k += t; }
    return h("div", { style: { display: "flex", flexDirection: "column", rowGap: 16 } }, lignes.map(function (lg0, r) {
      return h("div", { key: "l" + r, style: { display: "flex", justifyContent: "center", columnGap: 10 } }, lg0.map(function (it, j) { return h("div", { key: (it && it.key) || ("p" + j), style: { flex: "0 0 calc((100% - 30px) / 4)", minWidth: 0, display: "flex", justifyContent: "center" } }, it); }));
    }));
  }

  /* 11/11 (Blandine : « je croyais qu'on avait validé les carrés pour les chevaux ») : chevaux en CARTES CARRÉES
     sur téléphone (3 par ligne) et tablette (4 par ligne), 8 visibles ; lignes équilibrées et centrées comme les ronds.
     Ordinateur (≥ 1024 px) inchangé (ronds) en attendant son choix de mise en page. Les cavaliers gardent leurs ronds. */
  function carreCheval(key, src, nom, onClick, repli) {
    return h("button", { key: key, type: "button", onClick: onClick, style: { width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "stretch", alignSelf: "start" } },
      h("div", { style: { width: "100%", aspectRatio: "1 / 1", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(214,182,118,0.55)", background: "#11171C", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" } },
        src ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(src, 360, 360) : src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
          : h("span", { style: { fontFamily: SERIF, fontSize: 30, color: OR } }, repli || "")),
      h("div", { dir: "auto", style: { marginTop: 8, maxWidth: "100%", fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.1, textTransform: "uppercase", color: IV, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" } }, nom || ""));
  }
  function grilleCarres(items, cle, parLigne) {
    var liste = ouvert[cle] ? items : items.slice(0, 8);
    /* 11/11 21h24 (Blandine : « toujours toute la ligne de remplie […] deux demi-cases plus larges, on peut même commencer par elles ») :
       chaque ligne occupe toute la largeur ; les lignes plus courtes (2 cases plus grandes) passent EN TÊTE, là où sont les deux
       chevaux qui ont gagné le plus de points. Ex. 3 par ligne : 8 = 2+3+3, 7 = 2+2+3, 5 = 2+3, 4 = 2+2 ; 4 par ligne : 6 = 2+4, 7 = 3+4, 5 = 2+3. */
    var n = liste.length, tailles = [], reste = n % parLigne, pleines = Math.floor(n / parLigne);
    if (n <= parLigne) tailles = [n];
    else if (reste === 0) { for (var q = 0; q < pleines; q++) tailles.push(parLigne); }
    else if (reste >= 2) { tailles.push(reste); for (var q2 = 0; q2 < pleines; q2++) tailles.push(parLigne); }
    else { tailles = parLigne === 3 ? [2, 2] : [2, parLigne - 1]; for (var q3 = 0; q3 < pleines - 1; q3++) tailles.push(parLigne); }
    var lignes = [], k = 0;
    tailles.forEach(function (t) { lignes.push(liste.slice(k, k + t)); k += t; });
    var ecart = 10;
    return h("div", { style: { display: "flex", flexDirection: "column", rowGap: 14 } }, lignes.map(function (lg0, r) {
      var nb = lg0.length, larg = "calc((100% - " + (ecart * (nb - 1)) + "px) / " + nb + ")";
      return h("div", { key: "l" + r, style: { display: "flex", justifyContent: "center", columnGap: ecart } }, lg0.map(function (it, j) { return h("div", { key: (it && it.key) || ("c" + j), style: { flex: "0 0 " + larg, minWidth: 0, display: "flex" } }, it); }));
    }));
  }
  var largEcran = 390; try { largEcran = window.innerWidth || 390; } catch (eLe) { }
  var chevauxCarres = largEcran < 1024, carresParLigne = largEcran < 600 ? 3 : 4;

  /* ── hero ── */
  var hero = h("div", { style: { position: "relative", height: "calc(env(safe-area-inset-top) + 292px)", overflow: "hidden", background: BG } },
    h("img", { src: "images/TEAM_COMPETITION.webp", alt: "", decoding: "async", style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "72%", height: "100%", objectFit: "cover", objectPosition: "center 28%", display: "block", transform: rtl ? "scaleX(-1)" : "none" } }),
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", " + BG + " 26%, rgba(6,7,9,0.82) 40%, rgba(6,7,9,0.25) 62%, rgba(6,7,9,0) 78%)" } }),
    h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, bottom: 0, height: 70, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,7,9,0), " + BG + ")" } }),
    h("button", { type: "button", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
      style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 12px)", insetInlineStart: 14, width: 40, height: 40, borderRadius: "50%", background: "rgba(6,7,9,0.55)", border: "1px solid rgba(244,241,234,0.16)", color: IV, fontSize: 18, cursor: "pointer", zIndex: 2 } }, rtl ? "›" : "‹"),
    h("div", { style: { position: "absolute", insetInlineStart: 20, bottom: 34, maxWidth: "62%", zIndex: 1 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
        h("span", { style: { width: 5, height: 5, background: OR, display: "inline-block" } }),
        h("span", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: OR } }, T("Équipe", "Team", "Equipo", "Squadra", "チーム", "Team", "الفريق", "队伍", "Team", "Equipe", "Lag", "Команда", "Drużyna", "팀")),
        h("span", { style: { width: 34, height: 1, background: "rgba(214,182,118,0.6)", display: "inline-block" } })),
      h("div", { style: { fontFamily: SERIF, fontWeight: 500, fontSize: 40, lineHeight: 1.0, color: IV, marginTop: 12 } },
        /* (784) E3 : titre tiré du NOM de la Team dans sa fiche (« Team CSO Club » -> « Team » / « CSO Club ») ;
           tant que la fiche n'est pas chargée, ou si son nom ne commence pas par « Team », ancien titre traduit. */
        (groupe && /^Team\s+\S/.test(String(groupe.nom || "")) && !/^Team\s+Comp/i.test(String(groupe.nom || "")))
          ? [h("div", { key: "t1" }, "Team"), h("div", { key: "t2" }, String(groupe.nom).replace(/^Team\s+/, ""))]
          : [h("div", { key: "t1" }, T("Team", "Competition", "Equipo de", "Team", "競技", "Wettkampf", "فريق", "Team", "Competitie", "Team", "Team", "Team", "Team", "팀")),
             h("div", { key: "t2" }, T("Compétition", "Team", "competición", "Agonistico", "チーム", "Team", "المنافسات", "比赛", "Wedstrijdsport", "Competição", "Tävling", "Соревнования", "Zawody", "대회"))]),
      (groupe && hypeNomClubLisible(groupe.club_clef)) ? h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 21, color: OR, marginTop: 8 } }, hypeNomClubLisible(groupe.club_clef)) : null,   /* 10/11 22h : le club de l'équipe, sous le titre */
      h("span", { style: { display: "block", width: 38, height: 1, background: OR, margin: "14px 0 12px" } }),
      h("div", { style: { fontFamily: M, fontSize: 12, lineHeight: 1.55, color: "rgba(244,241,234,0.86)" } },
        h("div", null, T("Des cavaliers, des chevaux,", "Riders, horses,", "Jinetes, caballos,", "Amazzoni, cavalli,", "ライダーと馬、", "Reiter, Pferde,", "فرسان، خيول،", "骑手们，马匹们，", "Ruiters, paarden,", "Cavaleiros, cavalos,", "Ryttare, hästar,", "Всадники, лошади,", "Jeźdźcy, konie,", "기수와 말,")),
        h("div", null, T("des objectifs communs.", "shared goals.", "objetivos comunes.", "obiettivi comuni.", "そして共通の目標。", "gemeinsame Ziele.", "وأهداف مشتركة.", "共同的目标。", "gedeelde doelen.", "objetivos em comum.", "gemensamma mål.", "общие цели.", "wspólne cele.", "모두 함께하는 목표.")))));

  /* ── nos cavalières ── */
  var itemsCav = (membres || []).map(function (p) { return portrait("cv" + p.id, photoProfil(p), (p.pseudo || "") + (p.role === "coach" ? " · Coach" : ""), function () { ouvrirCavaliere(p); }, (p.pseudo || "?").charAt(0)); });
  var blocCav = section(h("div", null,
    enTete(T("Nos cavaliers", "Our riders", "Nuestras jinetes", "Le nostre cavalieri", "私たちのライダー", "Unsere Reiter", "فرساننا", "我们的骑手", "Onze ruiters", "Nossos cavaleiros", "Våra ryttare", "Наши всадники", "Nasze jeźdźcy", "우리 기수들"), "cav", itemsCav.length, 8),
    membres === null ? chargement()
      : (itemsCav.length ? grillePortraits(itemsCav, "cav") : vide(T("Aucun cavalier pour l’instant.", "No riders yet.", "Aún no hay jinetes.", "Nessun cavaliere per ora.", "まだライダーはいません。", "Noch keine Reiter.", "لا توجد فرسان حاليا.", "目前还没有骑手。", "Nog geen ruiters.", "Nenhum cavaleiro por enquanto.", "Inga ryttare ännu.", "Пока нет ни одной всадники.", "Na razie nie ma żadnej jeźdźcy.", "아직 기수가 없어요."))),
    null,
    (modifGroupe && groupe && typeof CreationEquipeEH === "function") ? h(CreationEquipeEH, { clef: groupe.club_clef, club: TEAM_CLUB, groupe: groupe, communaute: groupe.type === "loisir", chevaux: [], piquets: [],
      onFermer: function () { setModifGroupe(false); },
      onFini: function (gN) { setGroupe(Object.assign({}, groupe, gN || {})); setModifGroupe(false); } }) : null), true);

  /* ── nos chevaux ── */
  /* 11/11 22h23 (Blandine, proposition 4 : « celui en grand, c'est celui avec le plus de points, toujours par ordre de points gagnés,
     et ça défile ») : tous les chevaux par points de la SAISON EN COURS (à égalité : ordre alphabétique) ; le premier en grand
     (« Meilleur de la saison » s'il a des points), les autres dans une rangée qui défile. */
  var chevauxOrdonnes = (chevaux || []).slice().sort(function (a, b) { return ((ptsChevaux[b.id] || 0) - (ptsChevaux[a.id] || 0)) || String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
  var montesCh = (ptsChevaux && ptsChevaux.__montes) || {};
  function libPts(n) { return n + " " + (n > 1 ? T("pts", "pts", "pts", "pt", "pt", "Pkt.", "نقاط", "分", "ptn", "pts", "p", "очк.", "pkt", "점") : T("pt", "pt", "pt", "pt", "pt", "Pkt.", "نقطة", "分", "pt", "pt", "p", "очк.", "pkt", "점")); }
  function grandCheval(c) {
    var pts = ptsChevaux[c.id] || 0, mts = montesCh[c.id] || [];
    var src = c.photo_url ? ((typeof vignetteHype === "function") ? vignetteHype(c.photo_url, 900, 560) : c.photo_url) : "";
    return h("button", { key: "chg" + c.id, type: "button", onClick: function () { ouvrirCheval(c.id); }, style: { position: "relative", display: "block", width: "100%", height: chevauxCarres ? 200 : 260, padding: 0, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(214,182,118,0.38)", background: "#11171C", cursor: "pointer", textAlign: "start", color: IV } },
      src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" } }) : null,
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0) 38%, rgba(6,7,9,0.88) 100%)" } }),
      pts > 0 ? h("span", { style: { position: "absolute", top: 10, insetInlineStart: 10, fontFamily: M, fontSize: 9.5, letterSpacing: 1.6, textTransform: "uppercase", color: OR, border: "1px solid rgba(214,182,118,0.6)", borderRadius: 999, padding: "4px 9px", background: "rgba(6,7,9,0.55)" } }, "★ " + T("Meilleur de la saison", "Best of the season", "El mejor de la temporada", "Il migliore della stagione", "今シーズンのベスト", "Bester der Saison", "الأفضل هذا الموسم", "本赛季最佳", "Beste van het seizoen", "O melhor da temporada", "Säsongens bästa", "Лучший в сезоне", "Najlepszy w sezonie", "이번 시즌 최고")) : null,
      h("div", { style: { position: "absolute", insetInlineStart: 14, insetInlineEnd: 14, bottom: 12 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 26, fontWeight: 600, lineHeight: 1.1 } }, c.nom || ""),
        (pts > 0 || mts.length) ? h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(244,241,234,0.82)", marginTop: 4 } }, [pts > 0 ? libPts(pts) : "", mts.length ? T("monté par ", "ridden by ", "montado por ", "montato da ", "騎乗：", "geritten von ", "يمتطيه ", "骑手：", "gereden door ", "montado por ", "riden av ", "всадники: ", "jeźdźcy: ", "기수: ") + mts.slice(0, 3).join(", ") : ""].filter(Boolean).join(" · ")) : null));
  }
  function petitCheval(c) {
    var pts = ptsChevaux[c.id] || 0;
    var src = c.photo_url ? ((typeof vignetteHype === "function") ? vignetteHype(c.photo_url, 240, 240) : c.photo_url) : "";
    return h("button", { key: "chp" + c.id, type: "button", onClick: function () { ouvrirCheval(c.id); }, style: { display: "block", flex: chevauxCarres ? "0 0 96px" : "0 0 128px", padding: 0, border: "none", background: "none", color: IV, textAlign: "start", cursor: "pointer", scrollSnapAlign: "start" } },
      h("div", { style: { position: "relative", aspectRatio: "1 / 1", borderRadius: 11, overflow: "hidden", border: "1px solid rgba(214,182,118,0.28)", background: "#11171C" } },
        src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
          : h("span", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 28, color: OR } }, (c.nom || "?").charAt(0))),
      h("div", { style: { fontFamily: SERIF, fontSize: 14.5, fontWeight: 600, lineHeight: 1.12, marginTop: 6 } }, c.nom || ""),
      pts > 0 ? h("div", { style: { fontFamily: M, fontSize: 10, color: "rgba(244,241,234,0.6)", marginTop: 2 } }, libPts(pts)) : null);
  }
  var blocCh = section(h("div", null,
    enTete(T("Nos chevaux", "Our horses", "Nuestros caballos", "I nostri cavalli", "私たちの馬", "Unsere Pferde", "خيولنا", "我们的马", "Onze paarden", "Nossos cavalos", "Våra hästar", "Наши лошади", "Nasze konie", "우리 말"), "ch", 0, 0),
    chevaux === null ? chargement()
      : (chevauxOrdonnes.length ? h("div", null,
          grandCheval(chevauxOrdonnes[0]),
          chevauxOrdonnes.length > 1 ? h("div", { "data-noswipe": "1", style: { display: "flex", alignItems: "flex-start", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginTop: 12, paddingBottom: 2, scrollbarWidth: "none" } }, chevauxOrdonnes.slice(1).map(petitCheval)) : null)
        : vide(T("Aucun cheval trouvé pour l’instant.", "No horses found yet.", "Aún no hay caballos.", "Nessun cavallo per ora.", "まだ馬はいません。", "Noch keine Pferde gefunden.", "لا توجد خيول حاليا.", "暂时没有找到马。", "Nog geen paarden gevonden.", "Nenhum cavalo encontrado por enquanto.", "Inga hästar hittades ännu.", "Пока лошадей нет.", "Na razie brak koni.", "아직 말이 없어요."))),
    errChevaux ? h("div", { style: { marginTop: 8, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12 } }, errChevaux) : null,
    null));

  /* 11/11 22h29 : un seul bouton « Gérer l'équipe » (coach) en bas de « L'équipe », qui ouvre les trois réglages */
  var blocGerer = (gestion && groupe) ? section(h("div", { style: { position: "relative" } },
    h("button", { type: "button", "aria-expanded": menuGerer ? "true" : "false", onClick: function () { setMenuGerer(!menuGerer); }, style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 38, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(214,182,118,0.45)", background: "transparent", color: OR, fontFamily: M, fontSize: 10.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" } },
      h("svg", { width: 15, height: 15, viewBox: "0 0 20 20", "aria-hidden": "true" }, h("circle", { cx: 10, cy: 10, r: 2.6, fill: "none", stroke: OR, strokeWidth: 1.3 }), h("path", { d: "M10 2.5v2.2M10 15.3v2.2M2.5 10h2.2M15.3 10h2.2M4.7 4.7l1.6 1.6M13.7 13.7l1.6 1.6M4.7 15.3l1.6-1.6M13.7 6.3l1.6-1.6", stroke: OR, strokeWidth: 1.3, strokeLinecap: "round" })),
      T("Gérer l'équipe", "Manage the team", "Gestionar el equipo", "Gestisci la squadra", "チームを管理", "Team verwalten", "إدارة الفريق", "管理团队", "Team beheren", "Gerenciar a equipe", "Hantera laget", "Управлять командой", "Zarządzaj drużyną", "팀 관리"), h("span", { "aria-hidden": "true", style: { fontSize: 11 } }, menuGerer ? "▴" : "▾")),
    menuGerer ? h("div", { style: { marginTop: 8, maxWidth: 320, borderRadius: 14, border: "1px solid rgba(214,182,118,0.38)", background: "#0B0F13", overflow: "hidden" } },
      h("button", { type: "button", onClick: function () { setMenuGerer(false); setErrPanneau(""); setRecherche(""); setPanneau("membres"); }, style: { display: "block", width: "100%", textAlign: "start", padding: "13px 14px", background: "transparent", border: "none", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Gérer les membres", "Manage members", "Gestionar miembros", "Gestisci i membri", "メンバーを管理", "Mitglieder verwalten", "إدارة الأعضاء", "管理成员", "Leden beheren", "Gerenciar os membros", "Hantera medlemmar", "Управлять участниками", "Zarządzaj członkami", "멤버 관리")),
      h("button", { type: "button", onClick: function () { setMenuGerer(false); setErrPanneau(""); setRecherche(""); setPanneau("chevaux"); }, style: { display: "block", width: "100%", textAlign: "start", padding: "13px 14px", background: "transparent", border: "none", borderTop: "1px solid rgba(214,182,118,0.16)", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Gérer les chevaux", "Manage horses", "Gestionar caballos", "Gestisci i cavalli", "馬を管理", "Pferde verwalten", "إدارة الخيول", "管理马匹", "Paarden beheren", "Gerenciar os cavalos", "Hantera hästar", "Управлять лошадьми", "Zarządzaj końmi", "말 관리")),
      typeof CreationEquipeEH === "function" ? h("button", { type: "button", onClick: function () { setMenuGerer(false); setModifGroupe(true); }, style: { display: "block", width: "100%", textAlign: "start", padding: "13px 14px", background: "transparent", border: "none", borderTop: "1px solid rgba(214,182,118,0.16)", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Modifier le groupe", "Edit the group", "Modificar el grupo", "Modifica il gruppo", "グループを編集", "Gruppe bearbeiten", "تعديل المجموعة", "修改小组", "Groep wijzigen", "Modificar o grupo", "Ändra gruppen", "Изменить группу", "Edytuj grupę", "그룹 수정")) : null) : null), false) : null;

  /* (706) CHAPITRE « Classements des chevaux » : meme titre et meme carte que les autres chapitres de la page ;
     l'onglet « Performances chevaux » mene a la page classement (route performances-chevaux). */
  /* 11/11 : « Classement des cavaliers » (comme Performances chevaux) : la liste des cavaliers de l'équipe, chacun ouvre sa page Performances */
  var listePerfCav = !ouvert.pcav ? null : h("div", { style: { marginTop: 6, borderRadius: 14, border: "1px solid rgba(214,182,118,0.2)", overflow: "hidden" } },
    (membres || []).filter(function (p) { return p.role !== "coach"; }).map(function (p) {
      return h("button", { key: "pc" + p.id, type: "button", onClick: function () { try { window.__perfCavalierId = p.id; } catch (ePc) { } setEcran("performances-cavalier"); },
        style: { width: "100%", display: "flex", alignItems: "center", gap: 12, minHeight: 54, padding: "6px 14px", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,241,234,0.06)", color: IV, fontFamily: M, fontSize: 14, textAlign: "start", cursor: "pointer" } },
        h("span", { style: { width: 36, height: 36, flex: "0 0 36px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(214,182,118,0.5)", background: "#11171C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 17, color: OR } },
          photoProfil(p) ? h("img", { src: photoProfil(p), alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover" } }) : (p.pseudo || "?").charAt(0).toUpperCase()),
        h("span", { dir: "auto", style: { flex: 1, minWidth: 0 } }, p.pseudo || ""), h("span", { style: { color: OR } }, CHEV));
    }));
  var blocClass = section(h("div", null,
    enTete(T("Classements", "Rankings", "Clasificaciones", "Classifiche", "ランキング", "Ranglisten", "التصنيفات", "排名", "Klassementen", "Classificações", "Rankningar", "Рейтинги", "Klasyfikacje", "순위"), "cl", 0, 0),
    carteBasse("pcav", ICO.cavalier, T("Classement des cavaliers", "Riders' ranking", "Clasificación de los jinetes", "Classifica dei cavalieri", "ライダーのランキング", "Reiter-Rangliste", "تصنيف الفرسان", "骑手排名", "Klassement van de ruiters", "Classificação dos cavaleiros", "Ryttarranking", "Рейтинг всадников", "Klasyfikacja jeźdźców", "라이더 순위"),
      T("Résultats et points championnat", "Results and championship points", "Resultados y puntos de campeonato", "Risultati e punti campionato", "結果と選手権ポイント", "Ergebnisse und Meisterschaftspunkte", "النتائج ونقاط البطولة", "成绩与锦标赛积分", "Resultaten en kampioenschapspunten", "Resultados e pontos de campeonato", "Resultat och mästerskapspoäng", "Результаты и очки чемпионата", "Wyniki i punkty mistrzostw", "결과와 챔피언십 포인트"),
      "images/cavalier-acces-performances.webp", function () { basculer("pcav"); }, { marginTop: 0 }),
    listePerfCav,
    h("div", { style: { height: 10 } }),
    h("button", { type: "button", "data-perf-chevaux": "1", onClick: function () { try { window.__perfGroupe = null; window.__perfGroupeCourant = null; } catch (eP0) { } setEcran("performances-chevaux"); }, style: { position: "relative", overflow: "hidden", width: "100%", height: 104, display: "flex", alignItems: "center", gap: 12, padding: "0 13px", borderRadius: 12, background: "#0B0F13", border: "1px solid rgba(214,182,118,0.38)", color: IV, cursor: "pointer", textAlign: "start", boxSizing: "border-box" } },
      h("img", { src: "images/team-competition-performances-hero.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "78% 40%", display: "block", transform: rtl ? "scaleX(-1)" : "none" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 40%, rgba(11,15,19,0.8) 55%, rgba(11,15,19,0) 82%)" } }),
      h("svg", { width: 26, height: 26, viewBox: "0 0 20 20", "aria-hidden": "true", style: { flex: "0 0 auto", position: "relative" } },
        h("rect", { x: 2, y: 11, width: 4, height: 7, rx: 1, fill: "none", stroke: OR, strokeWidth: 1.3 }),
        h("rect", { x: 8, y: 6, width: 4, height: 12, rx: 1, fill: "none", stroke: OR, strokeWidth: 1.3 }),
        h("rect", { x: 14, y: 2, width: 4, height: 16, rx: 1, fill: "none", stroke: OR, strokeWidth: 1.3 })),
      h("span", { style: { flex: "0 0 auto", position: "relative", width: 1, alignSelf: "stretch", background: "rgba(214,182,118,0.28)" } }),
      h("div", { style: { flex: 1, minWidth: 0, position: "relative" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: IV, lineHeight: 1.15 } }, T("Performances chevaux", "Horse performances", "Rendimiento de los caballos", "Prestazioni dei cavalli", "\u99ac\u306e\u6210\u7e3e", "Leistungen der Pferde", "\u0623\u062f\u0627\u0621 \u0627\u0644\u062e\u064a\u0648\u0644", "马匹表现", "Prestaties van de paarden", "Desempenho dos cavalos", "Hästarnas prestationer", "Выступления лошадей", "Osiągnięcia koni", "말 성적")),
        h("div", { style: { fontFamily: M, fontSize: 11, color: "rgba(244,241,234,0.72)", marginTop: 4 } }, T("Classement de la saison", "Season ranking", "Clasificaci\u00f3n de la temporada", "Classifica della stagione", "\u30b7\u30fc\u30ba\u30f3\u306e\u30e9\u30f3\u30ad\u30f3\u30b0", "Saisonwertung", "\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0645\u0648\u0633\u0645", "赛季排名", "Klassement van het seizoen", "Classificação da temporada", "Säsongens rankning", "Рейтинг сезона", "Klasyfikacja sezonu", "시즌 순위"))),
      h("span", { style: { flex: "0 0 auto", position: "relative", color: OR, fontSize: 18, lineHeight: 1 } }, CHEV))));

  /* ── agenda ── */
  function badgeRdv(ev) {
    var auj = isoAuj();
    var enCours = String(ev.date_jour || "") <= auj;
    return h("span", { style: { flex: "0 0 auto", padding: "5px 9px", borderRadius: 999, border: "1px solid rgba(214,182,118,0.55)", color: OR, fontFamily: M, fontSize: 8.5, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", whiteSpace: "nowrap" } },
      enCours ? T("En cours", "Ongoing", "En curso", "In corso", "開催中", "Läuft", "جارٍ", "进行中", "Lopend", "Em andamento", "Pågående", "Текущие", "Trwające", "진행 중") : T("À venir", "Upcoming", "Próximo", "In arrivo", "予定", "Demnächst", "قادم", "即将推出", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "공개 예정"));
  }
  function carteRdv(ev) {
    var jour = (String(ev.date_jour || "").match(/-(\d{2})$/) || [])[1] || "";
    var sous = String(ev.description || "").split("\n")[0].trim();
    return h("button", { key: "rdv" + ev.id, type: "button", onClick: function () { ouvrirRdv(ev); }, style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 12px 14px 14px", borderRadius: 12, background: PANEL, border: "1px solid rgba(214,182,118,0.16)", color: IV, cursor: "pointer", textAlign: "start", boxSizing: "border-box" } },
      h("div", { style: { flex: "0 0 auto", width: 52, textAlign: "center" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 36, lineHeight: 1, color: OR } }, jour),
        h("div", { style: { fontFamily: SERIF, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", color: OR, marginTop: 3 } }, moisCourt(ev.date_jour))),
      h("span", { style: { flex: "0 0 auto", width: 1, alignSelf: "stretch", background: "rgba(214,182,118,0.28)" } }),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: IV, lineHeight: 1.15, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" } }, ev.titre || ""),
        sous ? h("div", { style: { fontFamily: M, fontSize: 11, color: "rgba(244,241,234,0.72)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sous) : null,
        ev.lieu ? h("div", { style: { display: "flex", alignItems: "center", gap: 5, fontFamily: M, fontSize: 10.5, color: GR, marginTop: 5, minWidth: 0 } },
          h("svg", { width: 10, height: 12, viewBox: "0 0 10 12", "aria-hidden": "true", style: { flex: "0 0 auto" } }, h("path", { d: "M5 0.6C2.6 0.6 0.8 2.4 0.8 4.7 0.8 7.6 5 11.4 5 11.4S9.2 7.6 9.2 4.7C9.2 2.4 7.4 0.6 5 0.6Zm0 5.7a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z", fill: OR })),
          h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ev.lieu)) : null),
      badgeRdv(ev),
      h("span", { style: { flex: "0 0 auto", color: OR, fontSize: 18, lineHeight: 1 } }, CHEV));
  }
  /* ── (530) rendez-vous en CARTES. Choix de Blandine (01/10) : replie = visuel A (meme carte que les
     resultats, affiche du rendez-vous a droite fondue dans le noir) ; deplie = visuel B (date, lieu, type,
     l affiche EN GRAND si elle existe, « Ouvrir le rendez-vous › » vers l agenda du club). Pas de mur de
     photos, pas de « Je participe ». ── */
  function libTypeRdv(t) {
    return (t === "concours") ? T("Concours", "Show", "Concurso", "Concorso", "大会", "Turnier", "مسابقة", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회")
      : (t === "sortie") ? T("Sortie", "Outing", "Salida", "Uscita", "お出かけ", "Ausflug", "خرجة", "外出活动", "Uitje", "Passeio", "Utflykt", "Выезд", "Wyjazd", "나들이")
      : T("Stage", "Clinic", "Curso", "Stage", "講習会", "Kurs", "تدريب", "训练营", "Clinic", "Estágio", "Kurs", "Сбор", "Warsztaty", "클리닉");
  }
  /* 09/11 14h40 (Blandine : « fais un encart similaire pour le dernier concours ») : le dernier concours passé, même carte que « À venir »,
     le toucher ouvre directement sa fiche (résultats, vidéos, médias) */
  function carteDernier(ev) {
    var aff = (typeof ev.image_url === "string" && ev.image_url.trim()) ? ev.image_url.trim() : "";
    var sous = [ev.lieu || ""].filter(Boolean).join(" · ");
    return h("button", { key: "dern" + ev.id, type: "button", "data-team-dernier": "1", onClick: function () { ouvrirRdvPasse(ev); }, style: { position: "relative", display: "block", width: "100%", height: 104, padding: 0, marginBottom: 10, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(214,182,118,0.38)", background: "#0B0F13", cursor: "pointer", textAlign: "start", color: IV } },
      h("img", { src: aff ? ((typeof vignetteHype === "function") ? vignetteHype(aff, 480, 300) : aff) : (({ stage: "images/theme-dressage-bai-trot.webp", sortie: "images/actualite-ambiance.webp" })[ev.type] || "images/hype-entete-concours.jpg"), alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "55%", height: "100%", objectFit: "cover", display: "block" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 40%, rgba(11,15,19,0.8) 55%, rgba(11,15,19,0) 82%)" } }),
      h("div", { style: { position: "absolute", insetInlineStart: 13, top: 11, insetInlineEnd: "40%" } },
        h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: 1.8, fontWeight: 700, textTransform: "uppercase", color: OR, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, T("Dernier concours", "Last competition", "Último concurso", "Ultimo concorso", "前回の大会", "Letztes Turnier", "آخر مسابقة", "上一场比赛", "Laatste wedstrijd", "Último concurso", "Senaste tävlingen", "Последние соревнования", "Ostatnie zawody", "지난 대회") + " · " + jourMois(ev.date_jour)),
        h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.12, marginTop: 5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "start", overflowWrap: "anywhere" } }, ev.titre || ""),
        sous ? h("div", { dir: "auto", style: { fontFamily: M, fontSize: 10.5, color: GR, marginTop: 4, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, sous + " · " + T("Résultats et vidéos", "Results and videos", "Resultados y vídeos", "Risultati e video", "結果と動画", "Ergebnisse und Videos", "النتائج والفيديوهات", "成绩和视频", "Uitslagen en video's", "Resultados e vídeos", "Resultat och videor", "Результаты и видео", "Wyniki i filmy", "결과와 영상")) : null),
      h("span", { "aria-hidden": "true", style: { position: "absolute", insetInlineEnd: 12, bottom: 10, color: OR, fontSize: 16 } }, CHEV));
  }
  var dernierConcours = (function () { var l = (agendaPasse || []).filter(function (e) { return String(e.type || "").toLowerCase() === "concours"; }); if (!l.length) return null; return l.slice().sort(function (a, b) { return String(b.date_fin || b.date_jour || "").localeCompare(String(a.date_fin || a.date_jour || "")); })[0]; })();
  var autresPasses = (agendaPasse || []).filter(function (e) { return !dernierConcours || e.id !== dernierConcours.id; });   /* le dernier concours est déjà affiché : pas de doublon dans la liste dépliée */
  function carteRdvE(ev, passe) {
    var cle = String(ev.id), ouv = (rdvOuvert === cle);
    var aff = (typeof ev.image_url === "string" && ev.image_url.trim()) ? ev.image_url.trim() : "";
    var enCours = !passe && String(ev.date_jour || "") <= isoAuj();
    var etat = passe ? T("Passé", "Past", "Pasado", "Passato", "終了", "Vorbei", "سابق", "已结束", "Afgelopen", "Passado", "Tidigare", "Прошедшие", "Minione", "지난 대회")
      : (enCours ? T("En cours", "Ongoing", "En curso", "In corso", "開催中", "Läuft", "جارٍ", "进行中", "Lopend", "Em andamento", "Pågående", "Текущие", "Trwające", "진행 중") : T("À venir", "Upcoming", "Próximo", "In arrivo", "予定", "Demnächst", "قادم", "即将推出", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "공개 예정"));
    var sous = [ev.lieu || "", ev.heure || ""].filter(Boolean).join(" · ");
    return h("div", { key: "crdv" + cle },
      h("button", { type: "button", onClick: function () { setRdvOuvert(ouv ? null : cle); }, style: { position: "relative", display: "block", width: "100%", height: 104, padding: 0, marginBottom: ouv ? 0 : 10, borderRadius: ouv ? "12px 12px 0 0" : 12, overflow: "hidden", border: "1px solid " + (passe ? "rgba(214,182,118,0.16)" : "rgba(214,182,118,0.38)"), background: "#0B0F13", cursor: "pointer", textAlign: "start", color: IV } },
        /* 07/11 23h45 (Blandine : « toujours pas de photo de thème quand il n'y a pas d'affiche ») : même règle que l'agenda du club —
           sans affiche, une photo en rapport avec la sorte de rendez-vous (concours, stage, sortie). Le détail n'affiche que la vraie affiche. */
        h("img", { src: aff ? ((typeof vignetteHype === "function") ? vignetteHype(aff, 480, 300) : aff) : (({ stage: "images/theme-dressage-bai-trot.webp", sortie: "images/actualite-ambiance.webp" })[ev.type] || "images/hype-entete-concours.jpg"), alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "55%", height: "100%", objectFit: "cover", display: "block" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 40%, rgba(11,15,19,0.8) 55%, rgba(11,15,19,0) 82%)" } }),
        h("div", { style: { position: "absolute", insetInlineStart: 13, top: 11, insetInlineEnd: "40%" } },
          h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: 1.8, fontWeight: 700, textTransform: "uppercase", color: passe ? GR : OR, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, etat + " · " + jourMois(ev.date_jour)),
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.12, marginTop: 5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "start", overflowWrap: "anywhere" } }, ev.titre || ""),
          sous ? h("div", { dir: "auto", style: { fontFamily: M, fontSize: 10.5, color: GR, marginTop: 4, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, sous) : null)),
      ouv ? detailRdv(ev, passe, aff) : null);
  }
  function detailRdv(ev, passe, aff) {
    function ligneKV(k, v) { return v ? [h("span", { key: "k" + k, style: { color: GR } }, k), h("div", { key: "v" + k, dir: "auto", style: { textAlign: "start" } }, v)] : []; }
    var dateT = dateLongue(ev.date_jour);
    if (ev.date_fin && String(ev.date_fin) !== String(ev.date_jour)) dateT += " → " + dateLongue(ev.date_fin);
    if (ev.heure) dateT += " · " + ev.heure;
    return h("div", { style: { background: PANEL, border: "1px solid rgba(214,182,118,0.18)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "12px 12px 10px", marginBottom: 10 } },
      h("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px", fontFamily: M, fontSize: 11.5 } },
        ligneKV(T("Date", "Date", "Fecha", "Data", "日付", "Datum", "التاريخ", "日期", "Datum", "Data", "Datum", "Дата", "Data", "날짜"), dateT),
        ligneKV(T("Lieu", "Venue", "Lugar", "Luogo", "場所", "Ort", "المكان", "地点", "Plaats", "Local", "Plats", "Место", "Miejsce", "장소"), ev.lieu || ""),
        ligneKV(T("Type", "Type", "Tipo", "Tipo", "種類", "Art", "النوع", "类型", "Type", "Tipo", "Typ", "Тип", "Typ", "유형"), libTypeRdv(ev.type))),
      aff ? h("div", { style: { marginTop: 12 } },
        h("button", { type: "button", onClick: function () { setVisu(aff); }, style: { display: "block", width: "100%", padding: 0, border: "none", background: "none", cursor: "zoom-in" } },
          h("img", { src: aff, alt: "", loading: "lazy", decoding: "async", style: { display: "block", width: "100%", height: "auto", maxHeight: 560, objectFit: "contain", borderRadius: 10, background: "#060709" } })),
        h("div", { style: { fontFamily: M, fontSize: 10, color: GR, marginTop: 5, textAlign: "center" } }, T("Toucher l’affiche pour l’agrandir", "Tap the poster to enlarge it", "Toca el cartel para ampliarlo", "Tocca la locandina per ingrandirla", "ポスターをタップして拡大", "Plakat antippen zum Vergrößern", "المس الملصق لتكبيره", "点海报即可放大", "Tik op de poster om hem te vergroten", "Toque no cartaz para ampliá-lo", "Tryck på affischen för att förstora den", "Нажми на афишу, чтобы увеличить", "Dotknij plakatu, aby go powiększyć", "포스터를 누르면 크게 볼 수 있어요"))) : null,
      h("button", { type: "button", onClick: function () { if (passe) ouvrirRdvPasse(ev); else ouvrirRdv(ev); }, style: { marginTop: 10, background: "none", border: "none", padding: 0, minHeight: 32, color: OR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: "pointer" } },
        T("Ouvrir le rendez-vous", "Open the event", "Abrir la cita", "Apri l’appuntamento", "予定を開く", "Termin öffnen", "فتح الموعد", "打开日程", "De afspraak openen", "Abrir o compromisso", "Öppna evenemanget", "Открыть событие", "Otwórz wydarzenie", "일정 열기") + " " + CHEV));
  }
  function ligneRdv(ev) {
    return h("button", { key: "lrdv" + ev.id, type: "button", onClick: function () { ouvrirRdv(ev); }, style: { width: "100%", display: "flex", alignItems: "center", gap: 10, minHeight: 42, padding: "0 2px", background: "none", border: "none", borderBottom: "1px solid rgba(244,241,234,0.07)", color: IV, cursor: "pointer", textAlign: "start" } },
      h("span", { style: { flex: "0 0 auto", width: 62, fontFamily: SERIF, fontSize: 15, color: "rgba(244,241,234,0.85)" } }, jourMois(ev.date_jour)),
      h("span", { style: { flex: 1, minWidth: 0, fontFamily: SERIF, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ev.titre || ""),
      h("span", { style: { flex: "0 0 auto", color: OR, fontSize: 16 } }, CHEV));
  }
  /* 01/10 (525) : « + Ajouter un rendez-vous » (proprietaire / gestionnaires SEP). Ouvre la page du club SEP
     avec le formulaire de creation de son agenda deja ouvert, et « Team Competition » deja coche. */
  var btnAjoutRdv = (gestion && groupe) ? h("button", { type: "button", "aria-label": T("Ajouter un rendez-vous", "Add an event", "Añadir una cita", "Aggiungi un evento", "予定を追加", "Termin hinzufügen", "إضافة موعد", "添加日程", "Afspraak toevoegen", "Adicionar um compromisso", "Lägg till en händelse", "Добавить событие", "Dodaj wydarzenie", "일정 추가"), onClick: function () {
      setErrPanneau(""); setRecherche(""); setClubRdv(null); setPanneau("rdv"); chargerRdvClub();   /* (526) ouvre le panneau des rendez-vous */
    }, style: { flex: "0 0 auto", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(214,182,118,0.7)", background: "transparent", color: OR, fontSize: 18, lineHeight: "28px", fontWeight: 400, padding: 0, cursor: "pointer", fontFamily: M } }, "+") : null;   /* 01/10 (527) : un simple « + » entoure, a droite du titre (Blandine : « le bouton prend beaucoup de place ») */
  /* 04/11 — CENTRE DE COMPÉTITION, ÉTAPE 1 : lien vers la page « Ma saison » (hype-ecran-saison.js), sous l agenda. */
  /* 04/11 23h20 (Blandine : « pour l'instant, toute cette série-là, tu la laisses accessible à personne à part moi ») : bouton visible par la modératrice seulement */
  var lienSaison = !((typeof estModerateurHype === "function") && estModerateurHype(moi)) ? null : h("button", { type: "button", onClick: function () { setEcran("ma-saison"); },
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", minHeight: 44, marginTop: 14, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,.7)", background: "transparent", color: OR, fontFamily: M, fontSize: 12.5, letterSpacing: 0.3, cursor: "pointer" } },
    h("span", null, tr({ fr: "Ma saison : tous les concours" })), h("span", { style: { fontSize: 16 } }, CHEV));
  var blocAg = section(h("div", null,
    enTete(h("span", { style: { display: "inline-flex", alignItems: "center", gap: 10 } },
      h("svg", { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": "true" }, h("rect", { x: 1.5, y: 3, width: 15, height: 13.5, rx: 2, fill: "none", stroke: OR, strokeWidth: 1.2 }), h("path", { d: "M1.5 7h15M5.5 1v4M12.5 1v4", stroke: OR, strokeWidth: 1.2, fill: "none" })),
      T("Agenda", "Calendar", "Agenda", "Agenda", "予定", "Termine", "المواعيد", "日程", "Agenda", "Agenda", "Kalender", "Календарь", "Kalendarz", "일정")), "ag", (agenda || []).length + ((agendaPasse || []).length ? 9 : 0), 1, btnAjoutRdv),
    agenda === null ? chargement()
      : h("div", null,
          agenda.length ? carteRdvE(agenda[0], false) : videCartePh(ICO.agenda, "images/concours-carte-passages.webp", T("Aucun rendez-vous \u00e0 venir pour l\u2019instant.", "No upcoming events yet.", "A\u00fan no hay citas pr\u00f3ximas.", "Nessun appuntamento in arrivo per ora.", "\u4eca\u5f8c\u306e\u4e88\u5b9a\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002", "Noch keine anstehenden Termine.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0648\u0627\u0639\u064a\u062f \u0642\u0627\u062f\u0645\u0629 \u062d\u0627\u0644\u064a\u0627.", "目前没有即将到来的日程。", "Nog geen komende afspraken.", "Nenhum compromisso futuro por enquanto.", "Inga kommande evenemang ännu.", "Пока нет предстоящих событий.", "Na razie brak nadchodzących wydarzeń.", "예정된 일정이 아직 없어요.")),
          (ouvert.ag && agenda.length > 1) ? h("div", null, agenda.slice(1).map(function (ev) { return carteRdvE(ev, false); })) : null,
          dernierConcours ? carteDernier(dernierConcours) : null,
          /* (526) les rendez-vous PASSES : dans « Voir tout », ouverts sur leur page souvenirs (photos) */
          /* 09/11 15h01 (Blandine) : plus de bouton « Événements passés » — « Voir tout » montre à venir ET passés */
          (ouvert.ag && autresPasses.length) ? h("div", { style: { marginTop: 16 } },
            h("div", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: GR, marginBottom: 4 } }, T("Rendez-vous pass\u00e9s", "Past events", "Citas pasadas", "Appuntamenti passati", "\u904e\u53bb\u306e\u4e88\u5b9a", "Vergangene Termine", "\u0645\u0648\u0627\u0639\u064a\u062f \u0633\u0627\u0628\u0642\u0629", "过去的日程", "Afgelopen afspraken", "Compromissos passados", "Tidigare evenemang", "Прошедшие события", "Minione wydarzenia", "지난 일정")),
            h("div", { style: { marginTop: 6 } }, autresPasses.map(function (ev) { return carteRdvE(ev, true); }))) : null),));   /* 09/11 23h00 (Blandine : « décale plus bas le bouton Ma saison ») : déplacé sous les Résultats récents */

  /* ── résultats récents ── */
  function placeDe(r) { if (r.place != null && !isNaN(Number(r.place))) return Number(r.place); var m = String(r.classement || "").match(/^\s*(\d+)/); return m ? Number(m[1]) : null; }
  function ordinal(n) {
    if (lg === "fr") return n === 1 ? "1er" : (n + "e");
    if (lg === "en") { var d10 = n % 10, d100 = n % 100; return n + ((d100 >= 11 && d100 <= 13) ? "th" : (d10 === 1 ? "st" : d10 === 2 ? "nd" : d10 === 3 ? "rd" : "th")); }
    if (lg === "es" || lg === "it") return n + "º";
    if (lg === "de") return n + ".";
    if (lg === "ja") return n + "位";
    if (lg === "zh") return "第" + n + "名";
    if (lg === "nl") return n + "e";
    if (lg === "pt") return n + "º";
    if (lg === "sv") return (n + ((n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? ":a" : ":e"));
    if (lg === "ru") return (n + "-\u0439");
    if (lg === "pl") return (n + ".");
    if (lg === "ko") return (n + "\uc704");
    if (lg === "ar") return "المركز " + n;
    return String(n);
  }
  function ligneRes(r) {
    var pl = placeDe(r);
    var podium = pl != null && pl >= 1 && pl <= 3;
    var txtPl = (pl != null) ? ordinal(pl) : (String(r.classement || "").trim().slice(0, 8) || "—");
    return h("button", { key: "res" + r.id, type: "button", onClick: function () { ouvrirResultat(r); }, style: { width: "100%", display: "flex", alignItems: "center", gap: 10, minHeight: 42, padding: "0 2px", background: "none", border: "none", borderBottom: "1px solid rgba(244,241,234,0.07)", color: IV, cursor: "pointer", textAlign: "start" } },
      h("span", { style: { flex: "0 0 auto", width: 62, fontFamily: SERIF, fontSize: 15, color: "rgba(244,241,234,0.85)", whiteSpace: "nowrap" } }, jourMois(r.date_epreuve || r.created_at)),
      h("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "7px 0" } },
        h("span", { dir: "auto", style: { fontFamily: SERIF, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, r.concours || r.epreuve || ""),
        (function () {
          /* 01/10 (522) : « Haras de Jardy · Marnes-la-Coquette (92) », ou la ville seule */
          var L = lieuxConcours[normTeam(r.concours)];
          if (!L) return null;
          var villeT = L.ville ? (L.ville + (L.departement ? " (" + L.departement + ")" : "")) : "";
          var txtL = [L.lieu_nom, villeT].filter(Boolean).join(" · ");
          if (!txtL) return null;
          return h("span", { style: { display: "flex", alignItems: "center", gap: 5, marginTop: 2, minWidth: 0, fontFamily: M, fontSize: 10.5, color: GR } },
            h("svg", { width: 9, height: 11, viewBox: "0 0 10 12", "aria-hidden": "true", style: { flex: "0 0 auto" } }, h("path", { d: "M5 0.6C2.6 0.6 0.8 2.4 0.8 4.7 0.8 7.6 5 11.4 5 11.4S9.2 7.6 9.2 4.7C9.2 2.4 7.4 0.6 5 0.6Zm0 5.7a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z", fill: OR })),
            h("span", { dir: "auto", style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, txtL));
        })()),
      h("span", { style: { flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 7, minWidth: 48, justifyContent: "flex-end" } },
        h("span", { style: { width: 7, height: 7, borderRadius: "50%", background: podium ? OR : "rgba(244,241,234,0.45)" } }),
        h("span", { style: { fontFamily: SERIF, fontSize: 15.5, color: podium ? OR : "rgba(244,241,234,0.8)", whiteSpace: "nowrap" } }, txtPl)),
      h("span", { style: { flex: "0 0 auto", color: "rgba(244,241,234,0.7)", fontSize: 16 } }, CHEV));
  }
  /* ── (528) résultats en CARTES (proposition « E bis » validée par Blandine) : photo à droite fondue dans le
     noir, texte à gauche ; podium = contour et sur-titre dorés ; toucher déplie le détail et le fil de souvenirs
     du résultat (MurHype, cible « resultat:<id> », même outil que les rendez-vous passés). ── */
  function nomPropre(t) { return String(t || "").toLowerCase().replace(/(^|[\s\-'])([a-zà-ÿ])/g, function (m, a, b) { return a + b.toUpperCase(); }).trim(); }
  function infosRes(r) {
    var cv = (r.cavalier_id && resInfos.cav[r.cavalier_id]) || null;
    var ch = (r.cheval_id && resInfos.ch[r.cheval_id]) || null;
    var qui = (cv && cv.pseudo) || nomPropre(r.cavalier) || "";
    var L = lieuxConcours[normTeam(r.concours)] || null;
    var lieuNom = (L && (L.lieu_nom || L.ville)) || r.concours || "";
    return { cv: cv, ch: ch, qui: qui, cheval: (ch && ch.nom) || "", photo: (ch && ch.photo_url) || (cv ? photoProfil(cv) : ""), L: L, lieuNom: lieuNom };
  }
  function dateLongue(iso) { var d = dateLoc(iso); if (!d) return ""; try { return new Intl.DateTimeFormat(LOC, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d); } catch (e) { return String(iso).slice(0, 10); } }
  function carteRes(r) {
    var I = infosRes(r);
    var pl = placeDe(r); var podium = pl != null && pl >= 1 && pl <= 3;
    var med = pl === 1 ? "🏆 " : pl === 2 ? "🥈 " : pl === 3 ? "🥉 " : "";
    var etiq = (pl === 1 ? T("Victoire", "Win", "Victoria", "Vittoria", "優勝", "Sieg", "فوز", "冠军（获胜）", "Overwinning", "Vitória", "Seger", "Победа", "Zwycięstwo", "우승") : (pl != null ? ordinal(pl) : (String(r.classement || "").trim().slice(0, 12) || "—")));
    var jm = jourMois(r.date_epreuve || r.created_at);
    var titre = [I.qui, I.cheval].filter(Boolean).join(" & ") || (r.concours || "");
    var placeTxt = (pl != null ? ordinal(pl) : "") + (r.partants ? " / " + r.partants : "");
    var sous = [r.epreuve || "", I.lieuNom, placeTxt].filter(Boolean).join(" · ");
    var ouv = (resOuvert === r.id);
    return h("div", { key: "cres" + r.id },
      h("button", { type: "button", onClick: function () { setResOuvert(ouv ? null : r.id); }, style: { position: "relative", display: "block", width: "100%", height: 104, padding: 0, marginBottom: ouv ? 0 : 10, borderRadius: ouv ? "12px 12px 0 0" : 12, overflow: "hidden", border: "1px solid " + (podium ? "rgba(214,182,118,0.38)" : "rgba(214,182,118,0.16)"), background: "#0B0F13", cursor: "pointer", textAlign: "start", color: IV } },
        I.photo ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(I.photo, 480, 300) : I.photo, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "55%", height: "100%", objectFit: "cover", display: "block" } }) : null,
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 40%, rgba(11,15,19,0.8) 55%, rgba(11,15,19,0) 82%)" } }),
        h("div", { style: { position: "absolute", insetInlineStart: 13, top: 11, insetInlineEnd: "40%" } },
          h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: 1.8, fontWeight: 700, textTransform: "uppercase", color: podium ? OR : GR, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, med + etiq + (jm ? " · " + jm : "")),
          h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.12, marginTop: 5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "start" } }, titre),
          h("div", { dir: "auto", style: { fontFamily: M, fontSize: 10.5, color: GR, marginTop: 4, lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "start" } }, sous))),
      ouv ? detailRes(r, I, pl) : null);
  }
  /* (529) « Retirer de l'équipe » / « Remettre dans l'équipe » : le resultat disparait de la page Team
     seulement (il reste sur la fiche du cheval et dans « Tous ses résultats »). La base reste seule juge. */
  async function basculerMasqueRes(r) {
    if (!groupe || !groupe.id || resOccupe) return;
    var cle = String(r.id), masque = !!resMasques[cle];
    setResOccupe(cle); setErrRes("");
    try {
      var rq = masque
        ? await supa.from("groupes_resultats_masques").delete().eq("groupe_id", groupe.id).eq("resultat_id", cle).select("resultat_id")
        : await supa.from("groupes_resultats_masques").insert({ groupe_id: groupe.id, resultat_id: cle }).select("resultat_id");
      if (rq && rq.error) throw rq.error;
      if (!rq || !rq.data || !rq.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base de datos", "rifiutato dal database", "データベースに拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      setResMasques(function (o) { var n = Object.assign({}, o); if (masque) delete n[cle]; else n[cle] = true; return n; });
      setResOuvert(null);
    } catch (eB) { setErrRes(cle + "|" + String((eB && eB.message) || eB)); }
    setResOccupe("");
  }
  function detailRes(r, I, pl) {
    function ligneKV(k, v) { return v ? [h("span", { key: "k" + k, style: { color: GR } }, k), h("div", { key: "v" + k, dir: "auto", style: { textAlign: "start" } }, v)] : []; }
    var villeT = I.L && I.L.ville ? (I.L.ville + (I.L.departement ? " (" + I.L.departement + ")" : "")) : "";
    var lieuT = [I.L && I.L.lieu_nom, villeT].filter(Boolean).join(" · ");   /* vide si le concours n est pas encore relie a un lieu : la ligne disparait */
    var classT = (pl != null ? ordinal(pl) : (String(r.classement || "").trim() || "—")) + (r.partants ? " / " + r.partants : "") + (r.mention ? " · " + T("sans faute", "clear round", "sin faltas", "netto", "減点なし", "fehlerfrei", "دون أخطاء", "零罚分", "foutloos", "sem faltas", "felfri", "без штрафных очков", "bez błędów", "무벌점") : "");
    return h("div", { style: { background: PANEL, border: "1px solid rgba(214,182,118,0.18)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "12px 12px 10px", marginBottom: 10 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 12.5 } },
        I.cv ? h("img", { src: photoProfil(I.cv), alt: "", style: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(214,182,118,0.6)" } }) : null,
        I.qui ? h("b", null, I.qui) : null,
        (I.qui && I.cheval) ? h("span", { style: { color: GR } }, T("sur", "on", "con", "su", "と", "auf", "على", "/", "van", "de", "av", "из", "z", "중")) : null,
        (I.ch && I.ch.photo_url) ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(I.ch.photo_url, 120, 120) : I.ch.photo_url, alt: "", style: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(214,182,118,0.6)" } }) : null,
        I.cheval ? h("b", { style: { color: OR } }, I.cheval) : null),
      h("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px", fontFamily: M, fontSize: 11.5, marginTop: 10 } },
        ligneKV(T("Concours", "Show", "Concurso", "Concorso", "大会", "Turnier", "المسابقة", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회"), r.concours || ""),
        ligneKV(T("Épreuve", "Class", "Prueba", "Prova", "競技", "Prüfung", "الفئة", "比赛项目", "Proef", "Prova", "Klass", "Маршрут", "Konkurencja", "경기"), r.epreuve || ""),
        ligneKV(T("Classement", "Placing", "Clasificación", "Classifica", "順位", "Platzierung", "الترتيب", "排名", "Klassement", "Classificação", "Rankning", "Рейтинг", "Klasyfikacja", "순위"), classT),
        ligneKV(T("Date", "Date", "Fecha", "Data", "日付", "Datum", "التاريخ", "日期", "Datum", "Data", "Datum", "Дата", "Data", "날짜"), dateLongue(r.date_epreuve || r.created_at)),
        ligneKV(T("Lieu", "Venue", "Lugar", "Luogo", "場所", "Ort", "المكان", "地点", "Plaats", "Local", "Plats", "Место", "Miejsce", "장소"), lieuT)),
      h("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 10 } },
        r.cheval_id ? h("button", { type: "button", onClick: function () { ouvrirCheval(r.cheval_id); }, style: { background: "none", border: "none", padding: 0, minHeight: 32, color: OR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: "pointer" } }, T("Fiche du cheval", "Horse page", "Ficha del caballo", "Scheda del cavallo", "馬のページ", "Pferdeseite", "صفحة الحصان", "马的档案", "Paardenprofiel", "Perfil do cavalo", "Hästens sida", "Карточка лошади", "Karta konia", "말 페이지") + " " + CHEV) : null,
        r.cavalier_id ? h("button", { type: "button", onClick: function () { try { window.__resCavaliereId = r.cavalier_id; } catch (e) { } setEcran("resultats-cavalier"); }, style: { background: "none", border: "none", padding: 0, minHeight: 32, color: OR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: "pointer" } }, T("Tous ses résultats", "All results", "Todos sus resultados", "Tutti i risultati", "すべての結果", "Alle Ergebnisse", "كل نتائجها", "它的所有成绩", "Al zijn resultaten", "Todos os resultados", "Alla hans resultat", "Все её результаты", "Wszystkie jego wyniki", "모든 결과") + " " + CHEV) : null),
      gestion ? (function () {
        var cleR = String(r.id), estM = !!resMasques[cleR], occ = (resOccupe === cleR);
        var errT = (errRes && errRes.indexOf(cleR + "|") === 0) ? errRes.slice(cleR.length + 1) : "";
        return h("div", { style: { marginTop: 8 } },
          h("button", { type: "button", disabled: occ, onClick: function () { basculerMasqueRes(r); }, style: { minHeight: 32, padding: "6px 12px", borderRadius: 16, border: "1px solid " + (estM ? "rgba(214,182,118,0.6)" : "rgba(146,153,160,0.5)"), background: "transparent", color: estM ? OR : GR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: occ ? "default" : "pointer", opacity: occ ? 0.6 : 1 } },
            occ ? "…" : (estM
              ? "↺ " + T("Remettre dans l’équipe", "Put back in the team", "Volver a poner en el equipo", "Rimetti nella squadra", "チームに戻す", "Zurück ins Team", "إعادة إلى الفريق", "重新加入队伍", "Weer in het team zetten", "Colocar de volta na equipe", "Sätt tillbaka i laget", "Вернуть в команду", "Przywróć do drużyny", "팀에 다시 넣기")
              : "✕ " + T("Retirer de l’équipe", "Remove from the team", "Quitar del equipo", "Togli dalla squadra", "チームから外す", "Aus dem Team entfernen", "إزالة من الفريق", "从队伍中移除", "Uit het team halen", "Tirar da equipe", "Ta bort från laget", "Убрать из команды", "Usuń z drużyny", "팀에서 빼기"))),
          errT ? h("div", { dir: "auto", style: { color: "#E08A8A", fontFamily: M, fontSize: 11, marginTop: 4 } }, T("Impossible : ", "Not possible: ", "Imposible: ", "Impossibile: ", "できません：", "Nicht möglich: ", "غير ممكن: ", "无法操作：", "Niet mogelijk: ", "Não é possível: ", "Det går inte: ", "Невозможно: ", "Niemożliwe: ", "할 수 없어요: ") + errT) : null);
      })() : null,
      h("div", { style: { marginTop: 10, borderTop: "1px solid rgba(214,182,118,0.18)", paddingTop: 10 } },
        h("div", { style: { fontFamily: M, fontSize: 9.5, letterSpacing: 1.6, fontWeight: 700, textTransform: "uppercase", color: OR, marginBottom: 6 } }, "✦ " + T("Souvenirs de ce résultat", "Memories of this result", "Recuerdos de este resultado", "Ricordi di questo risultato", "この結果の思い出", "Erinnerungen an dieses Ergebnis", "ذكريات هذه النتيجة", "这条成绩的回忆", "Herinneringen aan dit resultaat", "Lembranças deste resultado", "Minnen från det här resultatet", "Воспоминания об этом результате", "Wspomnienia z tego wyniku", "이 결과의 추억")),
        (typeof MurHype === "function") ? h(MurHype, { key: "murres-" + r.id, cible: "resultat:" + String(r.id), vignette: true, sansTitre: true, teinte: OR, limite: 3, composerEnBas: true }) : null));
  }
  var resVisibles = (resultats || []).filter(function (x) { return !resMasques[String(x.id)]; });   /* (529) */
  var resRetires = (resultats || []).filter(function (x) { return !!resMasques[String(x.id)]; });
  var blocRes = section(h("div", null,
    enTete(h("span", { style: { display: "inline-flex", alignItems: "center", gap: 10 } },
      h("svg", { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": "true" }, h("path", { d: "M5 2h8v4a4 4 0 0 1-8 0V2Zm0 1.5H2.2c0 2.4 1.2 3.6 3.1 3.9M13 3.5h2.8c0 2.4-1.2 3.6-3.1 3.9M9 10v3.5M6 16h6M7 13.5h4", fill: "none", stroke: OR, strokeWidth: 1.2, strokeLinejoin: "round" })),
      T("Résultats récents", "Recent results", "Resultados recientes", "Risultati recenti", "最近の結果", "Neueste Ergebnisse", "أحدث النتائج", "最近的成绩", "Recente resultaten", "Resultados recentes", "Senaste resultat", "Недавние результаты", "Ostatnie wyniki", "최근 결과")), "res", resVisibles.length, 3),
    resultats === null ? chargement()
      : h("div", null,
        !resVisibles.length ? videCartePh(ICO.coupe, "images/concours-hero-bai-tresse.webp", T("Aucun résultat pour l’instant.", "No results yet.", "Aún no hay resultados.", "Nessun risultato per ora.", "まだ結果はありません。", "Noch keine Ergebnisse.", "لا توجد نتائج حاليا.", "目前还没有成绩。", "Nog geen resultaten.", "Nenhum resultado por enquanto.", "Inga resultat ännu.", "Пока нет результатов.", "Na razie brak wyników.", "아직 결과가 없어요."))
          : h("div", null, (ouvert.res ? resVisibles : resVisibles.slice(0, 3)).map(carteRes)),   /* (528) cartes E bis */
        /* (529) resultats retires : visibles seulement pour la proprietaire / les gestionnaires, pour les remettre */
        (gestion && resRetires.length) ? h("div", { style: { marginTop: 4 } },
          h("button", { type: "button", onClick: function () { setVoirRetires(!voirRetires); }, style: { background: "none", border: "none", padding: 0, minHeight: 32, color: GR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: "pointer" } },
            T("Résultats retirés", "Removed results", "Resultados quitados", "Risultati tolti", "外した結果", "Entfernte Ergebnisse", "النتائج المحذوفة", "已移除的成绩", "Verwijderde resultaten", "Resultados removidos", "Borttagna resultat", "Убранные результаты", "Usunięte wyniki", "삭제된 결과") + " (" + resRetires.length + ") " + (voirRetires ? "˄" : "˅")),
          voirRetires ? h("div", { style: { opacity: 0.6, marginTop: 6 } }, resRetires.map(carteRes)) : null) : null,
        /* 11/11 22h29 (Blandine : les boutons « ne devraient pas aller ailleurs ? ») : « Importer des résultats » vit sous les résultats */
        (gestion && groupe) ? h("div", { style: { marginTop: 12 } }, h("button", { type: "button", "data-import-multi": "1", onClick: function () { try { window.HYPE_IMPORT_MULTI = true; window.HYPE_IMPORT_CAVALIERE = false; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.localStorage.removeItem("hype_cheval_import"); } catch (eIm) { } setEcran("import-resultats"); }, style: { minHeight: 36, padding: "0 10px", whiteSpace: "nowrap", flex: "0 1 auto", borderRadius: 999, border: "1px solid rgba(214,182,118,0.45)", background: "transparent", color: OR, fontFamily: M, fontSize: 10, fontWeight: 600, letterSpacing: 0.9, textTransform: "uppercase", cursor: "pointer" } },
      T("Importer des r\u00e9sultats", "Import results", "Importar resultados", "Importa risultati", "\u6210\u7e3e\u3092\u53d6\u308a\u8fbc\u3080", "Ergebnisse importieren", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "导入成绩", "Resultaten importeren", "Importar resultados", "Importera resultat", "Импортировать результаты", "Importuj wyniki", "결과 가져오기"))) : null)));

  /* ── souvenirs récents ── */
  function estVid(u) { return ((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(u)) || ((typeof estUrlVideo === "function") && estUrlVideo(u)); }
  function vignette(u) {
    if ((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(u)) return (typeof hypeMuxVignette === "function") ? hypeMuxVignette(u) : "";
    var m = String(u).match(/stream\.mux\.com\/([^/.?#]+)/i); if (m) return "https://image.mux.com/" + m[1] + "/thumbnail.jpg?width=480";
    if (estVid(u)) return "";
    return (typeof vignetteHype === "function") ? vignetteHype(u, 400, 400) : u;   /* (531) tuiles carrees plus grandes */
  }
  function tuile(s, i) {
    var vid = estVid(s.u), src = vignette(s.u);
    return h("button", { key: "sv" + i, type: "button", onClick: function () { setVisu(((typeof hypeEstVideoMux === "function") && hypeEstVideoMux(s.u) && typeof hypeMuxLecture === "function") ? hypeMuxLecture(s.u) : s.u); },
      style: { position: "relative", padding: 0, border: "1px solid rgba(214,182,118,0.25)", borderRadius: 10, overflow: "hidden", aspectRatio: "1 / 1", background: "#11171C", cursor: "pointer", minWidth: 0 } },
      src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null,
      vid ? h("span", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
        h("span", { style: { width: 26, height: 26, borderRadius: "50%", background: "rgba(6,7,9,0.6)", border: "1px solid rgba(244,241,234,0.5)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { width: 9, height: 10, viewBox: "0 0 9 10", "aria-hidden": "true" }, h("path", { d: "M1 0.8v8.4L8.2 5Z", fill: IV })))) : null);
  }
  /* 05/11 CHAPITRE « Médias » — proposition 4 : bandeau photo comme « Performances » / « Conseils du coach »,
     puis « Les plus aimées » (2 vidéos côte à côte, une seule = pleine largeur) et « Derniers partages » (idem ; absents si vides). */
  function ouvrirMedias(onglet, idVideo) {
    try { window.__teamMediasGroupe = groupe && groupe.id; window.__teamMediasOnglet = onglet || "accueil"; window.__teamMediasOuvrir = idVideo || null; } catch (eO) { }
    setEcran("team-medias");
  }
  function dureeM(s) { var n = Math.round(Number(s) || 0); return n ? Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0") : ""; }
  function tuileMedia(v, seule) {
    var src = v.vignette ? ((typeof vignetteHype === "function") ? vignetteHype(v.vignette, seule ? 640 : 320, seule ? 400 : 200) : v.vignette) : "";
    return h("button", { key: "mv" + v.id, type: "button", onClick: function () { ouvrirMedias("videos", v.id); }, style: { background: "none", border: "none", padding: 0, textAlign: "start", color: IV, cursor: "pointer", minWidth: 0, gridColumn: seule ? "1 / -1" : "auto" } },
      h("div", { style: { position: "relative", aspectRatio: "16 / 10", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(244,241,234,0.08)", background: "#11171C" } },
        src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null,
        h("span", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          h("span", { style: { width: 30, height: 30, borderRadius: "50%", background: "rgba(6,7,9,0.55)", border: "1px solid rgba(244,241,234,0.5)", display: "flex", alignItems: "center", justifyContent: "center" } },
            h("svg", { width: 9, height: 10, viewBox: "0 0 9 10", "aria-hidden": "true" }, h("path", { d: "M1 .8v8.4L8.2 5Z", fill: IV })))),
        v.jaime ? h("span", { style: { position: "absolute", insetInlineStart: 6, top: 6, fontFamily: M, fontSize: 10, padding: "2px 7px", borderRadius: 999, background: "rgba(6,7,9,0.66)" } }, "\u2661 " + v.jaime) : null,
        dureeM(v.duree) ? h("span", { style: { position: "absolute", insetInlineEnd: 6, bottom: 6, fontFamily: M, fontSize: 9.5, padding: "2px 6px", borderRadius: 6, background: "rgba(6,7,9,0.72)", fontVariantNumeric: "tabular-nums" } }, dureeM(v.duree)) : null),
      h("div", { dir: "auto", style: { fontFamily: M, fontSize: 12, marginTop: 7, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, ((v.prenoms && v.nomsChevaux) ? v.prenoms + " " + T("sur", "on", "con", "su", "×", "auf", "على", "骑", "op", "com", "på", "на", "na", "×") + " " + v.nomsChevaux : (v.titre || v.nomsChevaux || T("Vidéo", "Video"))),   /* 08/11 : « Daphné sur Velleda 🏆 2e / 35 » */
        v.resultat ? h("span", { style: { color: "#C9A66B", fontWeight: 600 } }, " " + (/^\s*\d/.test(v.resultat) ? "🏆 " : "· ") + v.resultat) : null));
  }
  var LIB_PARTAGE = { article_hype: T("Article Hype", "Hype article"), lien: T("Lien", "Link"), video: T("Vidéo", "Video"), ressource: T("Ressource", "Resource") };
  function tuilePartage(p, seule) {
    return h("button", { key: "mp" + p.id, type: "button", onClick: function () { ouvrirMedias("theorie"); }, style: { display: "flex", flexDirection: "column", gap: 5, padding: 12, borderRadius: 12, border: "1px solid rgba(214,182,118,0.22)", background: "transparent", color: IV, textAlign: "start", cursor: "pointer", minWidth: 0, gridColumn: seule ? "1 / -1" : "auto" } },
      h("span", { style: { fontFamily: M, fontSize: 9, letterSpacing: 1.6, textTransform: "uppercase", color: OR } }, LIB_PARTAGE[p.type] || ""),
      h("span", { dir: "auto", style: { fontFamily: SERIF, fontSize: 16, fontWeight: 600, lineHeight: 1.15, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" } }, p.titre || p.url),
      p.auteur_nom ? h("span", { style: { fontFamily: M, fontSize: 10.5, color: GR } }, T("Partagé par ", "Shared by ") + p.auteur_nom) : null);
  }
  function sousTitreM(txt) { return h("div", { style: { fontFamily: M, fontSize: 9.5, letterSpacing: 2.2, textTransform: "uppercase", color: "rgba(244,241,234,0.45)", margin: "16px 0 8px" } }, txt); }
  /* 11/11 21h40 (Blandine : « la Vidéothèque va directement aux vidéos… les onglets que tu as faits sont beaucoup mieux… ça vire
     toutes les petites merdes en bas ») : le chapitre Médias devient les trois portes (mêmes cartes que l'ancienne page d'accueil des
     Médias, qui disparaît) ; « Les plus aimées », « Derniers partages » et « Conseils du coach » (déjà dans Optimise tes perfs) sont retirés. */
  var PORTES_M = [
    { cle: "videos", img: "images/concours-hero-cso.webp",
      lab: T("Les vidéos", "Videos", "Los vídeos", "I video", "動画", "Die Videos", "الفيديوهات", "视频", "De video's", "Os vídeos", "Videorna", "Видео", "Filmy", "동영상"),
      titre: T("En piste", "In the ring", "En pista", "In campo", "いざ、コースへ", "Ab in den Parcours", "إلى الميدان", "上场", "Op de piste", "Em pista", "På banan", "На маршруте", "Na parkurze", "코스로"),
      sous: T("Les parcours de l'équipe", "The team's rounds", "Los recorridos del equipo", "I percorsi della squadra", "チームの走行", "Die Ritte des Teams", "جولات الفريق", "团队的比赛视频", "De rondes van het team", "Os percursos da equipa", "Lagets rundor", "Маршруты команды", "Przejazdy drużyny", "팀의 주행 영상") },
    { cle: "epingles", img: "images/concours-hero-bai-tresse.webp",
      lab: T("Les conseils de Hey Baby", "Hey Baby's tips", "Los consejos de Hey Baby", "I consigli di Hey Baby", "Hey Baby のアドバイス", "Die Tipps von Hey Baby", "نصائح Hey Baby", "Hey Baby 的建议", "De tips van Hey Baby", "Os conselhos do Hey Baby", "Hey Babys tips", "Советы Hey Baby", "Rady Hey Baby", "Hey Baby의 조언"),
      titre: T("Les clés de Hey Baby", "Hey Baby's keys", "Las claves de Hey Baby", "Le chiavi di Hey Baby", "Hey Baby のポイント", "Die Schlüssel von Hey Baby", "مفاتيح Hey Baby", "Hey Baby 的要点", "De sleutels van Hey Baby", "As chaves do Hey Baby", "Hey Babys nycklar", "Ключи от Hey Baby", "Klucze Hey Baby", "Hey Baby의 핵심"),
      sous: T("Les conseils épinglés pour l'équipe", "Tips pinned for the team", "Los consejos fijados para el equipo", "I consigli fissati per la squadra", "チームに共有されたアドバイス", "Für das Team angeheftete Tipps", "نصائح مثبتة للفريق", "为团队置顶的建议", "Vastgezette tips voor het team", "Conselhos fixados para a equipa", "Fästa tips för laget", "Советы, закреплённые для команды", "Rady przypięte dla drużyny", "팀에 고정된 조언") },
    { cle: "theorie", img: "images/galop2-hero-bai-entier.webp",
      lab: T("Les médias à découvrir", "Media to discover", "Medios para descubrir", "Media da scoprire", "おすすめメディア", "Medien zum Entdecken", "وسائط لاكتشافها", "值得一看的媒体", "Media om te ontdekken", "Mídia a descobrir", "Media att upptäcka", "Медиа для открытий", "Media do odkrycia", "살펴볼 미디어"),
      titre: T("Optimise tes perfs", "Boost your performance", "Optimiza tu rendimiento", "Ottimizza le tue prestazioni", "パフォーマンスを高めよう", "Optimiere deine Leistung", "حسّن أداءك", "提升你的表现", "Optimaliseer je prestaties", "Otimiza o teu desempenho", "Optimera dina prestationer", "Улучшай свои результаты", "Popraw swoje wyniki", "실력을 끌어올려"),
      sous: T("Articles et conseils du coach", "Articles and coach's tips", "Artículos y consejos del entrenador", "Articoli e consigli del coach", "記事とコーチのアドバイス", "Artikel und Tipps vom Coach", "مقالات ونصائح المدرّب", "文章与教练建议", "Artikelen en tips van de coach", "Artigos e conselhos do treinador", "Artiklar och tips från coachen", "Статьи и советы тренера", "Artykuły i rady trenera", "아티클과 코치의 조언") }
  ];
  function porteM(P) { return carteBasse("pm" + P.cle, ICO[P.cle === "videos" ? "video" : P.cle === "epingles" ? "bulle" : "perfs"], P.titre, P.sous, P.img, function () { ouvrirMedias(P.cle); }); }
  var blocMedias = section(h("div", null,
    enTete(T("Médias", "Media", "Medios", "Media", "メディア", "Medien", "الوسائط", "媒体", "Media", "Mídia", "Media", "Медиа", "Media", "미디어"), "md", 0, 0),
    h("div", { style: { marginTop: -10 } }, PORTES_M.filter(function (P) { return P.cle !== "videos"; }).map(porteM))));   /* 11/11 22h05 : « En piste » part dans Souvenirs */

  /* 30/10 (2130) CHAPITRE « Conseils du coach » : ouvre l'article Hype Magazine CSO (écran article-cso, réservé Premium :
     la page de l'article affiche elle-même son écran « Article réservé » aux non-abonnés). Même carte que « Performances chevaux ». */
  var blocCoach = section(h("div", null,
    enTete(T("Conseils du coach", "Coach’s tips", "Consejos del entrenador", "Consigli del coach", "コーチのアドバイス", "Tipps vom Coach", "نصائح المدرّب", "教练建议", "Tips van de coach", "Dicas do treinador", "Tränarens råd", "Советы тренера", "Rady trenera", "코치의 조언"), "co", 0, 0),
    h("button", { type: "button", "data-article-cso": "1", onClick: function () { setEcran("article-cso"); }, style: { position: "relative", overflow: "hidden", width: "100%", height: 104, display: "flex", alignItems: "center", gap: 12, padding: "0 13px", borderRadius: 12, background: "#0B0F13", border: "1px solid rgba(214,182,118,0.25)", color: IV, cursor: "pointer", textAlign: "start" } },
      h("img", { src: "images/article-cso-tuile.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", top: 0, insetInlineEnd: 0, width: "42%", height: "100%", objectFit: "cover", objectPosition: "center 35%" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", #0B0F13 40%, rgba(11,15,19,0.8) 55%, rgba(11,15,19,0) 82%)" } }),
      h("svg", { width: 26, height: 26, viewBox: "0 0 20 20", "aria-hidden": "true", style: { flex: "0 0 auto", position: "relative" } },
        h("path", { d: "M3 15 H9 Q12 15 13.5 12.5 L16 7", fill: "none", stroke: OR, strokeWidth: 1.3, strokeLinecap: "round", strokeDasharray: "2 2" }),
        h("path", { d: "M14 3.5 L18.5 8 M15.2 2.3 L19.7 6.8", stroke: OR, strokeWidth: 1.3 })),
      h("span", { style: { flex: "0 0 auto", position: "relative", width: 1, alignSelf: "stretch", background: "rgba(214,182,118,0.28)" } }),
      h("div", { style: { flex: 1, minWidth: 0, position: "relative", maxWidth: "66%" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: IV, lineHeight: 1.15 } }, T("Pourquoi éviter la longue après un virage serré ?", "Why avoid the long spot after a tight turn?", "¿Por qué evitar la batida larga tras un giro cerrado?", "Perché evitare la battuta lunga dopo una curva stretta?", "急なターンの直後、なぜ遠い踏み切りを避けるの？", "Warum nach einer engen Wendung den weiten Absprung vermeiden?", "لماذا تتجنّبين الارتقاء البعيد بعد منعطف حاد؟", "急转弯之后，为什么要避免远点起跳？", "Waarom geen lange afstand na een korte wending?", "Por que evitar a distância longa depois de uma curva fechada?", "Varför undvika långt avsprång efter en snäv sväng?", "Почему не стоит брать далёкую точку после крутого поворота?", "Dlaczego unikać dalekiego wybicia po ciasnym zakręcie?", "급회전 직후, 왜 먼 도약은 피해야 할까요?")),
        h("div", { style: { fontFamily: M, fontSize: 11, color: "rgba(244,241,234,0.72)", marginTop: 4 } }, T("Décryptage CSO · 7 min", "Show-jumping breakdown · 7 min", "Análisis de salto · 7 min", "Analisi salto ostacoli · 7 min", "障害飛越の解説 · 7分", "Analyse Springen · 7 Min.", "تحليل قفز الحواجز · 7 دقائق", "场地障碍解析 · 7 分钟", "Springanalyse · 7 min", "Análise de salto · 7 min", "Hoppanalys · 7 min", "Разбор конкура · 7 мин", "Analiza skoków · 7 min", "장애물 비월 분석 · 7분"))),
      h("span", { style: { flex: "0 0 auto", position: "relative", color: OR, fontSize: 18, lineHeight: 1, marginInlineStart: "auto" } }, CHEV))));

  /* (721) CHAPITRE « Règlements » : les règlements officiels (PDF dans docs/), ouverts dans un nouvel onglet.
     11/11 21h46 (Blandine : « deux petites cartes carrées côte à côte, ça prend beaucoup de place pour rien ») : deux carrés. */
  function carteReg(attr, href, titre, sous, source, photo) {   /* 11/11 21h51 : « mets un visuel dessus quand même » → photo en fond, voilée */
    var pr = { href: href, target: "_blank", rel: "noopener noreferrer", style: { position: "relative", minHeight: 104, backgroundImage: "linear-gradient(180deg, rgba(6,7,9,0.35) 0%, rgba(6,7,9,0.7) 45%, rgba(6,7,9,0.95) 100%), url(" + photo + ")", backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 10px 9px", borderRadius: 12, backgroundColor: "#0B0F13", border: "1px solid rgba(214,182,118,0.38)", color: IV, textDecoration: "none", textAlign: "start", boxSizing: "border-box", overflow: "hidden" } };
    pr[attr] = "1";
    return h("a", pr,
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h("svg", { width: 18, height: 18, viewBox: "0 0 20 20", "aria-hidden": "true" },
          h("path", { d: "M5 2h7l4 4v12H5z", fill: "none", stroke: OR, strokeWidth: 1.3, strokeLinejoin: "round" }),
          h("path", { d: "M12 2v4h4M7.5 10h6M7.5 13h6", fill: "none", stroke: OR, strokeWidth: 1.3, strokeLinecap: "round" })),
        h("span", { style: { fontFamily: M, fontSize: 8.5, letterSpacing: 1.3, color: OR } }, "PDF")),
      h("div", null,
        h("div", { style: { fontFamily: SERIF, fontSize: 14, fontWeight: 600, color: IV, lineHeight: 1.1 } }, titre),
        h("div", { style: { fontFamily: M, fontSize: 9, color: "rgba(244,241,234,0.72)", marginTop: 3, lineHeight: 1.3 } }, sous),
        h("div", { style: { fontFamily: M, fontSize: 8, fontStyle: "italic", color: "rgba(243,238,228,0.55)", marginTop: 3, lineHeight: 1.25 } }, source)));
  }
  var blocReg = section(h("div", null,
    enTete(T("Règlements", "Rules", "Reglamentos", "Regolamenti", "規則", "Reglements", "اللوائح", "规则", "Reglementen", "Regulamentos", "Regler", "Регламенты", "Regulaminy", "규정"), "rg", 0, 0),
    h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 } },   /* 11/11 22h05 : petits rectangles sur toute la largeur */
      carteReg("data-reglement-odf", "docs/reglement-open-de-france-2026.pdf",
        T("Open de France 2026", "Open de France 2026", "Open de France 2026", "Open de France 2026", "オープン・ド・フランス2026", "Open de France 2026", "أوبن فرنسا 2026", "2026 年法国公开赛", "Open de France 2026", "Open de France 2026", "Open de France 2026", "Open de France 2026", "Open de France 2026", "2026 Open de France"),
        T("Championnats de France Poney & Clubs", "French Pony & Club Championships", "Campeonatos de Francia Poni y Clubes", "Campionati di Francia Pony e Club", "フランス選手権 ポニー&クラブ", "Französische Pony- & Club-Meisterschaften", "بطولات فرنسا للبوني والأندية", "法国小马与俱乐部锦标赛", "Franse kampioenschappen Pony & Clubs", "Campeonatos da França de Pônei e Clubes", "Franska mästerskapen för ponny & ridklubb", "Чемпионаты Франции: пони и клубы", "Mistrzostwa Francji Kucyków i Klubów", "프랑스 포니·클럽 선수권"),
        T("FFE · mis à jour le 09/01/2026", "FFE · updated 09/01/2026", "FFE · actualizado el 09/01/2026", "FFE · aggiornato il 09/01/2026", "FFE・2026年1月9日更新", "FFE · aktualisiert am 09.01.2026", "FFE · حُدّث في 09/01/2026", "FFE · 2026年1月9日更新", "FFE · bijgewerkt op 09/01/2026", "FFE · atualizado em 09/01/2026", "FFE · uppdaterad 09/01/2026", "FFE · обновлено 09.01.2026", "FFE · zaktualizowano 09.01.2026", "FFE · 2026년 1월 9일 업데이트"), "images/piquet-cso-poney.webp"),
      /* 09/11 (Blandine, choix A) : 2e reglement, Championnat de France Amateur CSO 2026 (PDF fourni par Blandine, range dans docs/). */
      carteReg("data-reglement-amateur", "docs/reglement-championnat-amateur-cso-2026.pdf",
        T("Championnat de France Amateur CSO 2026", "French Amateur Show-Jumping Championship 2026", "Campeonato de Francia Amateur de Salto 2026", "Campionato di Francia Amateur Salto 2026", "フランス・アマチュア障害飛越選手権2026", "Französische Amateur-Meisterschaft Springen 2026", "بطولة فرنسا للهواة في قفز الحواجز 2026", "2026 年法国业余场地障碍锦标赛", "Frans Amateurkampioenschap Springen 2026", "Campeonato da França Amador de Saltos 2026", "Franska amatörmästerskapet i hoppning 2026", "Чемпионат Франции среди любителей по конкуру 2026", "Amatorskie Mistrzostwa Francji w skokach 2026", "2026 프랑스 아마추어 장애물 선수권"),
        T("Tours-Pernay, 15–18 octobre 2026", "Tours-Pernay, 15–18 October 2026", "Tours-Pernay, 15–18 de octubre de 2026", "Tours-Pernay, 15–18 ottobre 2026", "トゥール=ペルネ、2026年10月15〜18日", "Tours-Pernay, 15.–18. Oktober 2026", "تور-بيرنيه، 15–18 أكتوبر 2026", "图尔-佩尔奈，2026年10月15–18日", "Tours-Pernay, 15–18 oktober 2026", "Tours-Pernay, 15–18 de outubro de 2026", "Tours-Pernay, 15–18 oktober 2026", "Тур-Перне, 15–18 октября 2026", "Tours-Pernay, 15–18 października 2026", "투르-페르네, 2026년 10월 15–18일"),
        T("FFE · mis à jour le 10/06/2026", "FFE · updated 10/06/2026", "FFE · actualizado el 10/06/2026", "FFE · aggiornato il 10/06/2026", "FFE・2026年6月10日更新", "FFE · aktualisiert am 10.06.2026", "FFE · حُدّث في 10/06/2026", "FFE · 2026年6月10日更新", "FFE · bijgewerkt op 10/06/2026", "FFE · atualizado em 10/06/2026", "FFE · uppdaterad 10/06/2026", "FFE · обновлено 10.06.2026", "FFE · zaktualizowano 10.06.2026", "FFE · 2026년 6월 10일 업데이트"), "images/concours-hero-bai-tresse.webp"))));

  /* 11/11 22h05 (Blandine : mélange des maquettes 1 et 5, « un visuel, un petit peu des dernières photos et ensuite l'accès vers
     les pages ») : Souvenirs = les dernières photos ET vidéos (défilent sur téléphone, 4 de front sur grand écran), puis deux accès :
     « Nos photos » (déplie toutes les photos ici) et « En piste » (les vidéos de l'équipe, déplacées depuis Apprendre). Pas de 2e titre. */
  var svPhotos = (souvenirs || []).filter(function (x) { return !estVid(x.u); });
  var svVids = (vidsRecentes && vidsRecentes.l) || [];
  var svMix = svPhotos.slice(0, 8).map(function (x) { return { t: "p", d: String(x.d || ""), s: x }; })
    .concat(svVids.map(function (v) { return { t: "v", d: String(v.date_video || v.cree_le || ""), v: v }; }))
    .sort(function (a, b) { return b.d.localeCompare(a.d); }).slice(0, 8);
  var svLarge = (typeof window !== "undefined" && window.innerWidth >= 820);
  function tuileSv(m, i) {
    var base = { flex: svLarge ? "0 0 calc((100% - 36px) / 4)" : "0 0 calc((100% - 24px) / 3)", aspectRatio: "4 / 5",   /* 11/11 22h15 : 3 photos visibles avant de faire glisser */ position: "relative", padding: 0, border: "1px solid rgba(214,182,118,0.25)", borderRadius: 12, overflow: "hidden", background: "#11171C", cursor: "pointer", scrollSnapAlign: "start" };
    if (m.t === "v") {
      var v = m.v, src = (typeof vignetteHype === "function") ? vignetteHype(v.vignette, 400, 500) : v.vignette;
      return h("button", { key: "svv" + v.id, type: "button", onClick: function () { ouvrirMedias("videos", v.id); }, style: base },
        h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
        h("span", { style: { position: "absolute", top: 8, insetInlineEnd: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(6,7,9,0.55)", border: "1px solid rgba(244,241,234,0.6)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { width: 9, height: 10, viewBox: "0 0 9 10", "aria-hidden": "true" }, h("path", { d: "M1 .8v8.4L8.2 5Z", fill: IV }))),
        dureeM(v.duree) ? h("span", { style: { position: "absolute", insetInlineEnd: 6, bottom: 6, fontFamily: M, fontSize: 9.5, color: IV, padding: "2px 6px", borderRadius: 6, background: "rgba(6,7,9,0.72)" } }, dureeM(v.duree)) : null);
    }
    var x = m.s, srcP = vignette(x.u);
    return h("button", { key: "svp" + i, type: "button", onClick: function () { setVisu(x.u); }, style: base },
      srcP ? h("img", { src: srcP, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null);
  }
  var nbVidsSv = (vidsRecentes && vidsRecentes.n) || 0;
  var accesSv = h("div", { style: { display: "grid", gridTemplateColumns: svLarge ? "1fr 1fr" : "1fr", gap: svLarge ? 12 : 0, marginTop: 4 } },
    carteBasse("svph", ICO.photo, T("Nos photos", "Our photos", "Nuestras fotos", "Le nostre foto", "私たちの写真", "Unsere Fotos", "صورنا", "我们的照片", "Onze foto's", "As nossas fotos", "Våra foton", "Наши фото", "Nasze zdjęcia", "우리의 사진"),
      svPhotos.length ? (svPhotos.length + " " + (svPhotos.length > 1 ? T("photos", "photos", "fotos", "foto", "枚の写真", "Fotos", "صور", "张照片", "foto's", "fotos", "foton", "фото", "zdjęć", "장의 사진") : T("photo", "photo", "foto", "foto", "枚の写真", "Foto", "صورة", "张照片", "foto", "foto", "foto", "фото", "zdjęcie", "장의 사진"))) : T("Les photos des concours", "Competition photos", "Las fotos de los concursos", "Le foto dei concorsi", "大会の写真", "Die Turnierfotos", "صور المسابقات", "比赛照片", "De wedstrijdfoto's", "As fotos dos concursos", "Tävlingsfotona", "Фото с соревнований", "Zdjęcia z zawodów", "대회 사진"),
      "images/concours-carte-equipe.webp", svPhotos.length ? function () { basculer("sv"); } : null, svLarge ? { marginBottom: 0 } : null),
    carteBasse("svvi", ICO.video, T("En piste", "In the ring", "En pista", "In campo", "いざ、コースへ", "Ab in den Parcours", "إلى الميدان", "上场", "Op de piste", "Em pista", "På banan", "На маршруте", "Na parkurze", "코스로"),
      nbVidsSv ? (nbVidsSv + " " + (nbVidsSv > 1 ? T("parcours filmés", "filmed rounds", "recorridos grabados", "percorsi filmati", "本の走行動画", "gefilmte Ritte", "جولات مصوّرة", "段比赛视频", "gefilmde rondes", "percursos filmados", "filmade rundor", "снятых маршрутов", "nagranych przejazdów", "개의 주행 영상") : T("parcours filmé", "filmed round", "recorrido grabado", "percorso filmato", "本の走行動画", "gefilmter Ritt", "جولة مصوّرة", "段比赛视频", "gefilmde ronde", "percurso filmado", "filmad runda", "снятый маршрут", "nagrany przejazd", "개의 주행 영상"))) : T("Les parcours de l'équipe", "The team's rounds", "Los recorridos del equipo", "I percorsi della squadra", "チームの走行", "Die Ritte des Teams", "جولات الفريق", "团队的比赛视频", "De rondes van het team", "Os percursos da equipa", "Lagets rundor", "Маршруты команды", "Przejazdy drużyny", "팀의 주행 영상"),
      "images/galop2-hero-bai-entier.webp", function () { ouvrirMedias("videos"); }, svLarge ? { marginBottom: 0 } : null));
  var blocSv = section(h("div", null,
    (souvenirs === null && vidsRecentes === null) ? chargement()
      : (!svMix.length ? videCartePh(ICO.photo, "images/concours-carte-equipe.webp", T("Aucun souvenir pour l’instant.", "No memories yet.", "Aún no hay recuerdos.", "Nessun ricordo per ora.", "まだ思い出はありません。", "Noch keine Erinnerungen.", "لا توجد ذكريات حاليا.", "暂时还没有回忆。", "Nog geen herinneringen.", "Nenhuma lembrança por enquanto.", "Inga minnen ännu.", "Пока нет воспоминаний.", "Na razie brak wspomnień.", "아직 추억이 없어요."))
        : h("div", { "data-noswipe": "1", style: { display: "flex", gap: 12, overflowX: svLarge ? "hidden" : "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingBottom: 2, scrollbarWidth: "none" } }, svMix.map(tuileSv))),
    accesSv,
    ouvert.sv && svPhotos.length ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + (svLarge ? 6 : 3) + ", minmax(0, 1fr))", gap: 8, marginTop: 12 } }, svPhotos.map(tuile)) : null), true);

  /* ── panneau « Gérer les membres » (propriétaire / gestionnaires ; la base tranche) ── */
  async function ajouterMembre(p) {
    if (!groupe || !p || !p.id) return;
    setErrPanneau(""); setOccupe(function (o0) { var o = Object.assign({}, o0); o[p.id] = true; return o; });
    try {
      var r = await supa.from("groupes_membres").insert({ groupe_id: groupe.id, user_id: p.id }).select("user_id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base", "rifiutato dal database", "拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      setMembres(await chargerMembres(groupe.id));
    } catch (eA) { setErrPanneau(T("Échec : ", "Failed: ", "Error: ", "Errore: ", "失敗：", "Fehler: ", "فشل: ", "失败：", "Mislukt: ", "Falha: ", "Misslyckades: ", "Ошибка: ", "Błąd: ", "실패: ") + String((eA && eA.message) || eA)); }
    setOccupe(function (o1) { var o2 = Object.assign({}, o1); delete o2[p.id]; return o2; });
  }
  /* 07/11 : nommer / retirer une coach du groupe (comme « Nommer admin » sur WhatsApp) */
  async function basculerCoach(p) {
    if (!groupe || !p || !p.id) return;
    var nv = p.role === "coach" ? "membre" : "coach";
    setErrPanneau(""); setOccupe(function (o0) { var o = Object.assign({}, o0); o["c" + p.id] = true; return o; });
    try {
      var r = await supa.from("groupes_membres").update({ role: nv }).eq("groupe_id", groupe.id).eq("user_id", p.id).select("user_id, role");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error("refusé par la base");
      setMembres(await chargerMembres(groupe.id));
    } catch (eC) { setErrPanneau("Échec : " + String((eC && eC.message) || eC)); }
    setOccupe(function (o1) { var o2 = Object.assign({}, o1); delete o2["c" + p.id]; return o2; });
  }
  async function retirerMembre(p) {
    if (!groupe || !p || !p.id) return;
    setErrPanneau(""); setOccupe(function (o0) { var o = Object.assign({}, o0); o[p.id] = true; return o; });
    try {
      var r = await supa.from("groupes_membres").delete().eq("groupe_id", groupe.id).eq("user_id", p.id).select("user_id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base", "rifiutato dal database", "拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      setMembres(await chargerMembres(groupe.id));
    } catch (eR) { setErrPanneau(T("Échec : ", "Failed: ", "Error: ", "Errore: ", "失敗：", "Fehler: ", "فشل: ", "失败：", "Mislukt: ", "Falha: ", "Misslyckades: ", "Ошибка: ", "Błąd: ", "실패: ") + String((eR && eR.message) || eR)); }
    setOccupe(function (o1) { var o2 = Object.assign({}, o1); delete o2[p.id]; return o2; });
  }
  async function basculerCheval(c, estDedans) {
    if (!groupe || !c || !c.id) return;
    setErrPanneau(""); setOccupe(function (o0) { var o = Object.assign({}, o0); o[c.id] = true; return o; });
    try {
      var r = estDedans
        ? await supa.from("groupes_chevaux").delete().eq("groupe_id", groupe.id).eq("cheval_id", c.id).select("cheval_id")
        : await supa.from("groupes_chevaux").insert({ groupe_id: groupe.id, cheval_id: c.id }).select("cheval_id");
      if (r && r.error) throw new Error(r.error.message || String(r.error));
      if (!r || !r.data || !r.data.length) throw new Error(T("refusé par la base", "refused by the database", "rechazado por la base", "rifiutato dal database", "拒否されました", "von der Datenbank abgelehnt", "رفضته قاعدة البيانات", "被数据库拒绝", "geweigerd door de database", "recusado pelo banco de dados", "nekades av databasen", "отклонено базой данных", "odrzucone przez bazę", "데이터베이스에서 거부함"));
      setErrChevaux(""); setChevaux(await chargerChevauxGroupe(groupe.id));
    } catch (eB) { setErrPanneau(T("Échec : ", "Failed: ", "Error: ", "Errore: ", "失敗：", "Fehler: ", "فشل: ", "失败：", "Mislukt: ", "Falha: ", "Misslyckades: ", "Ошибка: ", "Błąd: ", "실패: ") + String((eB && eB.message) || eB)); }
    setOccupe(function (o1) { var o2 = Object.assign({}, o1); delete o2[c.id]; return o2; });
  }
  var panneauEl = null;
  if (panneau && panneau !== "rdv") {
    var modeCh = (panneau === "chevaux");   /* (523) le même panneau sert aux chevaux */
    var dans = {}; ((modeCh ? chevaux : membres) || []).forEach(function (p) { dans[p.id] = true; });
    var q = normTeam(recherche);
    var nomDe = function (p) { return modeCh ? (p.nom || "") : (p.pseudo || ""); };
    var candidats = ((modeCh ? clubChevaux : clubMembres) || []).filter(function (p) { return p && p.id && (!q || normTeam(nomDe(p)).indexOf(q) >= 0); })
      .sort(function (a, b) { if (!!dans[a.id] !== !!dans[b.id]) return dans[a.id] ? -1 : 1; return nomDe(a).localeCompare(nomDe(b)); });
    panneauEl = h("div", { "data-noswipe": "1", "data-hscroll": "1", dir: rtl ? "rtl" : "ltr", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(6,7,9,0.97)", display: "flex", flexDirection: "column", fontFamily: M, color: IV } },
      h("div", { style: { padding: "calc(env(safe-area-inset-top) + 16px) 18px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(214,182,118,0.18)" } },
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: OR } }, (groupe && groupe.nom) || TEAM_NOM_GROUPE),   /* (783) nom lu dans la fiche */
          h("div", { style: { fontFamily: SERIF, fontSize: 22, marginTop: 2 } }, (modeCh ? T("Chevaux de l\u2019\u00e9quipe", "Team horses", "Caballos del equipo", "Cavalli della squadra", "\u30c1\u30fc\u30e0\u306e\u99ac", "Pferde des Teams", "\u062e\u064a\u0648\u0644 \u0627\u0644\u0641\u0631\u064a\u0642", "队里的马", "Paarden van het team", "Cavalos da equipe", "Lagets hästar", "Лошади команды", "Konie drużyny", "팀의 말") : T("Membres de l’équipe", "Team members", "Miembros del equipo", "Membri della squadra", "チームメンバー", "Teammitglieder", "أعضاء الفريق", "队员", "Teamleden", "Membros da equipe", "Lagets medlemmar", "Участники команды", "Członkowie drużyny", "팀 멤버")))),
        h("button", { type: "button", onClick: function () { setPanneau(false); }, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { width: 40, height: 40, borderRadius: "50%", background: "rgba(244,241,234,0.06)", border: "1px solid rgba(244,241,234,0.16)", color: IV, fontSize: 16, cursor: "pointer" } }, "✕")),
      h("div", { style: { padding: "12px 18px 6px" } },
        h("input", { value: recherche, onChange: function (e) { setRecherche(e.target.value); }, placeholder: (modeCh ? SEPx(T("Rechercher un cheval de la SEP", "Search a SEP horse", "Buscar un caballo de la SEP", "Cerca un cavallo della SEP", "SEP\u306e\u99ac\u3092\u691c\u7d22", "SEP-Pferd suchen", "\u0627\u0628\u062d\u062b \u0639\u0646 \u062d\u0635\u0627\u0646 \u0645\u0646 SEP", "搜索 SEP 的马", "Zoek een paard van de SEP", "Procurar um cavalo da SEP", "Sök en häst från SEP", "Найти лошадь SEP", "Szukaj konia z SEP", "SEP의 말 검색")) : T("Rechercher un cavalier de la SEP", "Search a SEP rider", "Buscar un jinete de la SEP", "Cerca un cavaliere della SEP", "SEPのライダーを検索", "SEP-Reiter suchen", "ابحث عن فارس من SEP", "搜索 SEP 的骑手", "Zoek een ruiter van de SEP", "Procurar um cavaleiro da SEP", "Sök en ryttare från SEP", "Найти всадника SEP", "Szukaj jeźdźca z SEP", "SEP의 기수 검색")),
          style: { width: "100%", boxSizing: "border-box", height: 42, padding: "0 14px", borderRadius: 10, border: "1px solid rgba(244,241,234,0.14)", background: PANEL, color: IV, fontFamily: M, fontSize: 16, outline: "none" } }),
        errPanneau ? h("div", { style: { marginTop: 10, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12 } }, errPanneau) : null),
      h("div", { style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "4px 18px calc(env(safe-area-inset-bottom) + 24px)" } },
        !candidats.length ? vide(T("Personne à afficher.", "Nobody to show.", "Nadie que mostrar.", "Nessuno da mostrare.", "表示する人はいません。", "Niemand anzuzeigen.", "لا يوجد أحد.", "没有可显示的人。", "Niemand om te tonen.", "Ninguém para mostrar.", "Ingen att visa.", "Некого показывать.", "Nie ma kogo wyświetlić.", "표시할 사람이 없어요.")) :
        candidats.map(function (p) {
          var est = !!dans[p.id], busy = !!occupe[p.id];
          return h("div", { key: "gm" + p.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid rgba(244,241,234,0.06)" } },
            h("div", { style: { width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", border: est ? "1px solid " + OR : "1px solid rgba(244,241,234,0.12)", background: "#11171C" } },
              (modeCh ? (p.photo_url ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(p.photo_url, 120, 120) : p.photo_url, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null) : h("img", { src: photoProfil(p), alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }))),
            h("div", { dir: "auto", style: { flex: 1, minWidth: 0, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, nomDe(p) || "—"),
            (!modeCh && est) ? (function () {
              var m0 = (membres || []).filter(function (x) { return x.id === p.id; })[0] || {}, co = m0.role === "coach", bz = !!occupe["c" + p.id];
              return h("button", { type: "button", disabled: bz, "aria-pressed": co, onClick: function () { basculerCoach(m0); },
                style: { flex: "0 0 auto", minHeight: 34, padding: "0 12px", borderRadius: 999, border: "1px solid " + (co ? OR : "rgba(244,241,234,0.25)"), background: "transparent", color: co ? OR : "rgba(244,241,234,0.7)", fontFamily: M, fontSize: 12, cursor: "pointer" } },
                bz ? "…" : (co ? "Coach ✓" : "Coach"));
            })() : null,
            h("button", { type: "button", disabled: busy, onClick: function () { if (modeCh) basculerCheval(p, est); else if (est) retirerMembre(p); else ajouterMembre(p); },
              style: { flex: "0 0 auto", minHeight: 34, minWidth: 84, padding: "0 12px", borderRadius: 999, border: "1px solid " + (est ? "rgba(244,241,234,0.25)" : "rgba(214,182,118,0.6)"), background: est ? "transparent" : "rgba(214,182,118,0.10)", color: est ? "rgba(244,241,234,0.8)" : OR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: busy ? "default" : "pointer", opacity: busy ? 0.5 : 1 } },
              busy ? "…" : (est ? T("Retirer", "Remove", "Quitar", "Rimuovi", "外す", "Entfernen", "إزالة", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제") : T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"))));
        })));
  }

  /* (526) panneau des rendez-vous : creer un nouveau OU ajouter / retirer un rendez-vous a venir de la SEP */
  if (panneau === "rdv") {
    var dansR = {}; (agenda || []).concat(agendaPasse || []).forEach(function (ev) { dansR[ev.id] = true; });
    var qR = normTeam(recherche);
    var listeR = (clubRdv || []).filter(function (ev) { return ev && ev.id && (!qR || normTeam(ev.titre).indexOf(qR) >= 0 || normTeam(ev.lieu).indexOf(qR) >= 0); })
      .sort(function (a, b) {
        var fa = estAVenir(a), fb = estAVenir(b);   /* a venir d abord (le plus proche en haut), puis les passes (le plus recent en haut) */
        if (fa !== fb) return fa ? -1 : 1;
        return fa ? String(a.date_jour || "").localeCompare(String(b.date_jour || "")) : String(b.date_jour || "").localeCompare(String(a.date_jour || ""));
      });
    function ligneR(ev) {
          var est = !!dansR[ev.id], busy = !!occupe[ev.id];
          var jourR = (String(ev.date_jour || "").match(/-(\d{2})$/) || [])[1] || "";
          return h("div", { key: "rv" + ev.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(244,241,234,0.06)" } },
            h("div", { style: { flex: "0 0 auto", width: 44, textAlign: "center", borderInlineEnd: "1px solid rgba(214,182,118,0.28)", paddingInlineEnd: 8 } },
              h("div", { style: { fontFamily: SERIF, fontSize: 22, lineHeight: 1, color: est ? OR : IV } }, jourR),
              h("div", { style: { fontFamily: SERIF, fontSize: 11, textTransform: "uppercase", color: est ? OR : GR, marginTop: 2 } }, moisCourt(ev.date_jour))),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { dir: "auto", style: { fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, ev.titre || "—"),
              ev.lieu ? h("div", { dir: "auto", style: { fontSize: 10.5, color: GR, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, ev.lieu) : null),
            h("button", { type: "button", disabled: busy, onClick: function () { basculerRdv(ev, est); },
              style: { flex: "0 0 auto", minHeight: 34, minWidth: 84, padding: "0 12px", borderRadius: 999, border: "1px solid " + (est ? "rgba(244,241,234,0.25)" : "rgba(214,182,118,0.6)"), background: est ? "transparent" : "rgba(214,182,118,0.10)", color: est ? "rgba(244,241,234,0.8)" : OR, fontFamily: M, fontSize: 11, fontWeight: 600, cursor: busy ? "default" : "pointer", opacity: busy ? 0.5 : 1 } },
              busy ? "…" : (est ? T("Retirer", "Remove", "Quitar", "Rimuovi", "外す", "Entfernen", "إزالة", "移除", "Verwijderen", "Remover", "Ta bort", "Убрать", "Usuń", "삭제") : T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"))));
    }
    panneauEl = h("div", { "data-noswipe": "1", "data-hscroll": "1", dir: rtl ? "rtl" : "ltr", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(6,7,9,0.97)", display: "flex", flexDirection: "column", fontFamily: M, color: IV } },
      h("div", { style: { padding: "calc(env(safe-area-inset-top) + 16px) 18px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(214,182,118,0.18)" } },
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: OR } }, (groupe && groupe.nom) || TEAM_NOM_GROUPE),   /* (783) nom lu dans la fiche */
          h("div", { style: { fontFamily: SERIF, fontSize: 22, marginTop: 2 } }, T("Rendez-vous de l’équipe", "Team events", "Citas del equipo", "Appuntamenti della squadra", "チームの予定", "Termine des Teams", "مواعيد الفريق", "队里的日程", "Afspraken van het team", "Compromissos da equipe", "Lagets evenemang", "События команды", "Wydarzenia drużyny", "팀 일정"))),
        h("button", { type: "button", onClick: function () { setPanneau(false); }, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { width: 40, height: 40, borderRadius: "50%", background: "rgba(244,241,234,0.06)", border: "1px solid rgba(244,241,234,0.16)", color: IV, fontSize: 16, cursor: "pointer" } }, "✕")),
      h("div", { style: { padding: "12px 18px 6px" } },
        h("button", { type: "button", onClick: function () {
            try { window.__guildeEcurie = TEAM_CLUB; window.__agendaOuvrirAjout = true; window.__agendaGroupesCoches = [groupe.id]; } catch (eAr) { }
            setPanneau(false); setEcran("guilde");
          }, style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(214,182,118,0.6)", background: "rgba(214,182,118,0.10)", color: OR, fontFamily: M, fontSize: 12.5, fontWeight: 700, cursor: "pointer" } },
          "✦ " + T("Créer un nouveau rendez-vous", "Create a new event", "Crear una nueva cita", "Crea un nuovo appuntamento", "新しい予定を作成", "Neuen Termin erstellen", "إنشاء موعد جديد", "创建新日程", "Nieuwe afspraak maken", "Criar um novo compromisso", "Skapa ett nytt evenemang", "Создать новое событие", "Utwórz nowe wydarzenie", "새 일정 만들기")),
        h("div", { style: { fontSize: 9.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: GR, margin: "16px 2px 8px" } },
          SEPx(T("Ou ajouter un rendez-vous de la SEP", "Or add a SEP event", "O añadir una cita de la SEP", "Oppure aggiungi un appuntamento della SEP", "またはSEPの予定を追加", "Oder einen SEP-Termin hinzufügen", "أو أضيفي موعدا من SEP", "或添加一个 SEP 日程", "Of voeg een afspraak van de SEP toe", "Ou adicionar um compromisso da SEP", "Eller lägg till ett evenemang från SEP", "Или добавить событие SEP", "Lub dodaj wydarzenie SEP", "또는 SEP 일정 추가하기"))),
        h("input", { value: recherche, onChange: function (e) { setRecherche(e.target.value); }, placeholder: T("Rechercher un rendez-vous", "Search an event", "Buscar una cita", "Cerca un appuntamento", "予定を検索", "Termin suchen", "ابحث عن موعد", "搜索日程", "Zoek een afspraak", "Procurar um compromisso", "Sök ett evenemang", "Найти событие", "Szukaj wydarzenia", "일정 검색"),
          style: { width: "100%", boxSizing: "border-box", height: 42, padding: "0 14px", borderRadius: 10, border: "1px solid rgba(244,241,234,0.14)", background: PANEL, color: IV, fontFamily: M, fontSize: 16, outline: "none" } }),
        errPanneau ? h("div", { style: { marginTop: 10, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12 } }, errPanneau) : null),
      h("div", { style: { flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "4px 18px calc(env(safe-area-inset-bottom) + 24px)" } },
        clubRdv === null ? chargement() :
        !listeR.length ? vide(SEPx(T("Aucun rendez-vous à venir dans l’agenda de la SEP.", "No upcoming event in the SEP calendar.", "No hay citas próximas en la agenda de la SEP.", "Nessun appuntamento in arrivo nell’agenda della SEP.", "SEPの予定に今後の予定はありません。", "Keine anstehenden Termine im SEP-Kalender.", "لا توجد مواعيد قادمة في مواعيد SEP.", "SEP 日历里暂时没有即将到来的日程。", "Geen komende afspraken in de agenda van de SEP.", "Nenhum compromisso futuro na agenda da SEP.", "Inga kommande evenemang i SEP:s kalender.", "В календаре SEP нет предстоящих событий.", "Brak nadchodzących wydarzeń w kalendarzu SEP.", "SEP 일정에 예정된 일정이 없어요."))) :
        (function () { var lignesR = []; var vuPasse = false; listeR.forEach(function (ev) { if (!vuPasse && !estAVenir(ev)) { vuPasse = true; lignesR.push(h("div", { key: "tpa", style: { fontSize: 9.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: GR, margin: "16px 2px 4px" } }, T("Rendez-vous pass\u00e9s", "Past events", "Citas pasadas", "Appuntamenti passati", "\u904e\u53bb\u306e\u4e88\u5b9a", "Vergangene Termine", "\u0645\u0648\u0627\u0639\u064a\u062f \u0633\u0627\u0628\u0642\u0629", "过去的日程", "Afgelopen afspraken", "Compromissos passados", "Tidigare evenemang", "Прошедшие события", "Minione wydarzenia", "지난 일정"))); } lignesR.push(ligneR(ev)); }); return lignesR; })()));
  }

  return h("div", { dir: rtl ? "rtl" : "ltr", lang: lg, style: { minHeight: "100vh", background: BG, color: IV, paddingBottom: 8, fontFamily: M, overflowX: "clip" } },
    (typeof HypeDrapeauLangue === "function") ? h(HypeDrapeauLangue, null) : null,
    hero,
    erreur ? h("div", { style: { margin: "4px 20px 0", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontSize: 12 } },
      T("La page n’a pas pu se charger : ", "The page could not load: ", "No se pudo cargar la página: ", "Impossibile caricare la pagina: ", "ページを読み込めません：", "Seite nicht geladen: ", "تعذر تحميل الصفحة: ", "页面加载失败：", "De pagina kon niet laden: ", "Não foi possível carregar a página: ", "Sidan kunde inte laddas: ", "Не удалось загрузить страницу: ", "Nie udało się załadować strony: ", "페이지를 불러오지 못했어요: ") + erreur) : null,
    menuParties,
    partie(PARTIES[0].id, 1, PARTIES[0].lab, PARTIES[0].titre), blocCav, blocCh, blocGerer, trait(),
    partie(PARTIES[1].id, 2, PARTIES[1].lab, PARTIES[1].titre), blocAg, blocRes, lienSaison ? h("div", { key: "lsa", style: { padding: "26px 20px 0" } }, lienSaison) : null, blocClass, trait(),
    partie(PARTIES[2].id, 3, PARTIES[2].lab, PARTIES[2].titre), blocSv, trait(),
    partie(PARTIES[3].id, 4, PARTIES[3].lab, PARTIES[3].titre), blocMedias, blocReg, h("div", { style: { height: 30 } }),
    panneauEl,
    (typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(visu, function () { setVisu(null); }) : null);
}
window.HypeTeam = { Team: EcranTeamCompetition };
})();
