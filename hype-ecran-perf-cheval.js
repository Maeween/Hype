/* HYPE ▸ 30/10/2026 — Page PERFORMANCES DU CHEVAL (EcranPerformancesCheval), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~133 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranPerformancesCheval(props) {
  var h = React.createElement;
  /* 18/10 (perf g9) MODE CAVALIER : la meme page sert aux Performances du cavalier (ecran 6 de la maquette). Resultats = ceux
     rattaches au compte (resultats.cavalier_id, hors masque_cavaliere), MEME REGLE que l ancienne page Resultats de la cavaliere ;
     le filtre porte sur les CHEVAUX ; droits = ceux du cavalier (ajout et import a son nom, choix des moments forts comme avant). */
  var riderId = (props && props.cavalierId) ? String(props.cavalierId) : "";
  var modeCav = !!riderId;
  var archSt = React.useState("saison"), chOuvSt = React.useState({});
  var detSt = React.useState(null); var detOuv = detSt[0], setDetOuv = detSt[1];
  var magSt = React.useState(null); var magOuv = magSt[0], setMagOuv = magSt[1];
  var arSelSt = React.useState(null), arOuvSt = React.useState({});   /* 13/11 00h46 : propositions « Tous tes résultats » (saison choisie, saisons ouvertes) */   /* 13/11 00h04 (Blandine) : cheval déplié = ses 10 meilleurs résultats ensemble */   /* 12/11 20h50 (Blandine 16h36 : « que ça se déplie ») : chiffre de « En bref » déplié */   /* 12/11 19h : archives de la page du cavalier (par saison / par cheval) */
  var app = useApp();
  var tr = app.tr || function (o) { return (o && o.fr) || ""; };
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko, fa) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko, fa: fa }); }
  var setEcran = app.setEcran;
  var langue = app.langue || "fr";
  var rtl = ((langue === "ar" || langue === "fa"));
  var NOIR = "#070A08", PETROLE = "#101A1D", PETROLE2 = "#101D22", IVOIRE = "#F3EEE4", CHAMP = "#C9A66B";
  var SERIF = "'Cormorant Garamond', Georgia, serif", SANS = "'Montserrat', system-ui, sans-serif";
  var MUET = "rgba(243,238,228,0.62)", MUET2 = "rgba(243,238,228,0.42)", FILET = "rgba(201,166,107,0.32)";

  /* ── le cheval ouvert : meme ordre que la fiche V2 (window.__chevalOuvert, puis l adresse) ── */
  var idSt = React.useState(function () {
    try { if (typeof window !== "undefined" && window.__chevalOuvert) return String(window.__chevalOuvert); } catch (eW) { }
    try { var hs = (typeof location !== "undefined" && location.hash) || ""; var m = hs.match(/perf-([\w-]+)/); if (m && m[1]) return m[1]; } catch (eH) { }
    try { var dern = sessionStorage.getItem("hype_perf_cheval"); if (dern) return dern; } catch (eS) { }   /* 12/11 18h40 (Blandine : « Cheval introuvable » sur Rizotto) : repli sur le dernier cheval ouvert ici */
    return "";
  });
  try { if (id) sessionStorage.setItem("hype_perf_cheval", String(id)); } catch (eSs) { }
  var id = idSt[0];
  var etSt = React.useState({ charge: false, cheval: null, erreur: null }); var etat = etSt[0], setEtat = etSt[1];
  React.useEffect(function () {
    var vivant = true;
    setEtat({ charge: false, cheval: null, erreur: null });
    if (modeCav) return;   /* (g9) le cavalier est charge plus bas */
    if (!id || typeof hypeLireFicheCheval !== "function") { setEtat({ charge: true, cheval: null, erreur: "introuvable" }); return; }
    hypeLireFicheCheval(id).then(function (r) { if (vivant) setEtat({ charge: true, cheval: (r && r.cheval) || null, erreur: (r && r.erreur) || null }); })
      .catch(function (eC) { if (vivant) setEtat({ charge: true, cheval: null, erreur: String((eC && eC.message) || eC || "?") }); });
    return function () { vivant = false; };
  }, [id]);
  /* (g9) mode cavalier : profil, resultats a son nom, chevaux (nom, photo, photos de moments forts choisies par leur proprietaire) */
  var cvSt = React.useState(null); var cav = cvSt[0], setCav = cvSt[1];
  var relCSt = React.useState(0); var relireCav = relCSt[0], setRelireCav = relCSt[1];
  React.useEffect(function () {
    if (!modeCav) return;
    var v = true; setCav(null);
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (v) setCav({ prof: { id: riderId }, lignes: [], chevaux: {} }); return; }
        var rp = await supa.from("profiles").select("id, pseudo, avatar_url, avatar, ecurie").eq("id", riderId).maybeSingle(); if (rp && rp.error) rp = await supa.from("profiles").select("id, pseudo, avatar_url, avatar").eq("id", riderId).maybeSingle(); /* 11/11 : visiteur sans compte */
        var rr = await supa.from("resultats").select("*").eq("cavalier_id", riderId).limit(2000);
        var ls = ((rr && !rr.error && rr.data) || []).filter(function (x) { return x && x.masque_cavaliere !== true; });   /* 12/11 14h19 (Blandine, régularité à 100 % alors qu elle est tombée) : les lignes masquées reviennent pour les CHIFFRES (règle « masquer = affichage seulement ») ; les listes les cachent toujours (f.masque) */   /* 12/11 08h (Blandine : la page montrait des résultats qu elle avait cachés) : même règle que l ancienne page Résultats */
        var ids = []; ls.forEach(function (x) { if (x.cheval_id && ids.indexOf(x.cheval_id) === -1) ids.push(x.cheval_id); });
        var chx = {};
        if (ids.length) { var rc = await supa.from("chevaux").select("id, nom, alias, photo_url, moments_forts_medias").in("id", ids.slice(0, 300)); ((rc && !rc.error && rc.data) || []).forEach(function (c) { if (c && c.id) chx[String(c.id)] = c; }); }
        ls = ls.map(function (x) { var c = x.cheval_id && chx[String(x.cheval_id)]; var nomC = (c && (String(c.alias || "").trim() || c.nom)) || x.cheval_nom || ""; return Object.assign({}, x, { cav_reel: x.cavalier || "", cavalier: nomC || x.cavalier || "", cavalier_id: null }); });
        if (v) setCav({ prof: (rp && rp.data) || { id: riderId }, lignes: ls, chevaux: chx });
      } catch (eC) { if (v) setCav({ prof: { id: riderId }, lignes: [], chevaux: {} }); }
    })();
    return function () { v = false; };
  }, [riderId, relireCav]);
  if (modeCav) {
    var nomCavC = cav ? (cav.prof.pseudo || "") : "";
    etat = { charge: !!cav, cheval: cav ? { dbId: null, nom: nomCavC, ligne: { photo_url: cav.prof.avatar_url || cav.prof.avatar || "", ecurie: cav.prof.ecurie || "" }, secours: {} } : null, erreur: null };
  }
  var chV = etat.cheval;
  var dbId = (chV && chV.dbId) || null;
  var ligneCh = (chV && chV.ligne) || {};
  var secours = (chV && chV.secours) || {};
  var nomCh = (chV && (String(ligneCh.alias || "").trim() || chV.nom)) || "";

  /* ── qui regarde ── */
  var moiSt = React.useState(null); var moi = moiSt[0], setMoi = moiSt[1];
  React.useEffect(function () { var v = true; try { utilisateurActuel().then(function (u) { if (v) setMoi(u || null); }).catch(function () { }); } catch (eU) { } return function () { v = false; }; }, []);
  var estProprio = modeCav ? !!(moi && moi.id === riderId) : !!(moi && dbId && ligneCh.user_id === moi.id);
  var MOI = !!(modeCav && estProprio);   /* 13/11 00h10 (Blandine, sur sa propre page : « je vois ses meilleurs moments ») : « tes » au lieu de « ses » */
  var estMod = !!(moi && typeof estModerateurHype === "function" && estModerateurHype(moi));
  var droitsSt = React.useState({ lie: false, memeEcurie: false }); var droits = droitsSt[0], setDroits = droitsSt[1];
  React.useEffect(function () {
    var v = true; setDroits({ lie: false, memeEcurie: false });
    if (!moi || !dbId || typeof supa === "undefined" || !supa) return;
    (async function () {
      var lie = false, meme = false;
      try { var rL = await supa.from("chevaux_liens").select("cheval_id").eq("cheval_id", dbId).eq("user_id", moi.id).limit(1); lie = !!(rL && !rL.error && rL.data && rL.data.length); } catch (eL) { }
      try {
        var mesC = (typeof mesClubs === "function") ? await mesClubs() : [];
        var cCh = String(ligneCh.club || "").trim(); if (!cCh || cCh === "__perso__") cCh = String(ligneCh.ecurie || "").trim();
        if (cCh && cCh !== "__perso__" && mesC.length) {
          var noy = function (x) { return String((typeof noyauEcurie === "function" ? (noyauEcurie(x) || x) : x)).toLowerCase(); };
          var nCh = noy(cCh); meme = mesC.some(function (mC) { var nM = noy(mC); return !!nM && nM === nCh; });
        }
      } catch (eM) { }
      if (v) setDroits({ lie: lie, memeEcurie: meme });
    })();
    return function () { v = false; };
  }, [moi && moi.id, dbId]);
  var peutSaisir = modeCav ? estProprio : !!(moi && dbId && (estProprio || estMod || droits.lie || droits.memeEcurie));
  var peutImporter = modeCav ? estProprio : !!(moi && dbId && (estProprio || estMod || droits.lie || droits.memeEcurie));   /* 30/10 (Blandine) : + cavalieres de l ecurie du cheval ; le reglage d affichage reste a la proprietaire (verrou dans l import) */
  var peutForts = modeCav ? !!(moi && (estProprio || estMod)) : !!(moi && dbId && (estProprio || estMod));   /* (g9) cavalier : choix des moments forts comme l ancienne page (la base reste juge) */
  var premiumOk = !!(app.premium || estMod);

  /* ── les resultats (table resultats, lecture partagee avec la fiche V2) ── */
  var resSt = React.useState(null); var lignes = resSt[0], setLignes = resSt[1];
  var relSt = React.useState(0); var relire = relSt[0], setRelire = relSt[1];
  React.useEffect(function () { if (modeCav && relire) setRelireCav(function (n) { return n + 1; }); }, [relire]);   /* (g9) apres un ajout / une modification : relire les resultats du cavalier */
  React.useEffect(function () {
    var v = true; setLignes(null);
    if (!etat.charge) return;
    if (modeCav) { setLignes((cav && cav.lignes) || []); return; }
    if (!dbId) { setLignes([]); return; }
    if (typeof hypeResultatsCheval !== "function") { setLignes([]); return; }
    hypeResultatsCheval(dbId).then(function (r) { if (v) setLignes((r && r.lignes) || []); }).catch(function () { if (v) setLignes([]); });
    return function () { v = false; };
  }, [dbId, etat.charge, relire, cav]);
  var vmSt = React.useState(false); var voirMasques = vmSt[0], setVoirMasques = vmSt[1];
  var ouvSt = React.useState(null); var ouvertes = ouvSt[0], setOuvertes = ouvSt[1];   /* saisons depliees (plusieurs possibles) ; null = la plus recente */
  var flSt = React.useState({}); var filtres = flSt[0], setFiltres = flSt[1];   /* filtre secondaire, par saison */
  /* 30/10 (Blandine, choix B) : le filtre de depart de chaque saison = SA vue, enregistree sur son compte (voir hypeVueResCharger) */
  var vueDfSt = React.useState(function () { try { return (typeof hypeVueResLocale === "function") ? hypeVueResLocale() : "tous"; } catch (eVd) { return "tous"; } }); var vueDefaut = vueDfSt[0], setVueDefaut = vueDfSt[1];
  React.useEffect(function () { var vVr = true; try { if (typeof hypeVueResCharger === "function") hypeVueResCharger().then(function (v) { if (vVr && v) setVueDefaut(v); }); } catch (eVr) { } return function () { vVr = false; }; }, []);
  var fortsLocSt = React.useState({}); var fortsLocal = fortsLocSt[0], setFortsLocal = fortsLocSt[1];   /* reponse immediate au tap, par id */
  var lignesVues = React.useMemo(function () {
    return (lignes || []).map(function (r) { var loc = r && r.id && fortsLocal[r.id]; return loc ? Object.assign({}, r, { fort_force: loc.ff, fort_exclu: loc.fx }) : r; });
  }, [lignes, fortsLocal]);
  /* toutes les lignes (eliminations et abandons compris) ; la proprietaire peut afficher les lignes masquees */
  /* (g11) masquer = affichage seulement : chiffres, points et saisons comptent TOUTES les lignes ; seules les listes de resultats
     cachent les lignes masquees (la proprietaire peut les afficher). */
  var tous = React.useMemo(function () { return hypePerfLignes(lignesVues, true, true); }, [lignesVues]);
  var montreMasques = !!(voirMasques && estProprio);
  var nbMasques = (lignes || []).filter(function (r) { return r && r.visible === false; }).length;   /* 13/11 00h10 (Blandine « je vois pas où modifier ») : aussi sur la page du cavalier */   /* (g9) les masquages restent ceux de la page du cheval */

  /* ── filtre cavalier (decision D3 : il agit sur les chiffres du haut ET sur le tableau) ── */
  var cavSt = React.useState("tous"); var cavChoisi = cavSt[0], setCavChoisi = cavSt[1];
  var cavaliers = React.useMemo(function () {
    var st = {}; tous.forEach(function (f) { if (!f.cav) return; if (!st[f.cav]) st[f.cav] = { n: 0, d: "" }; st[f.cav].n++; if (f.d > st[f.cav].d) st[f.cav].d = f.d; });
    return Object.keys(st).sort(function (a, b) { return (st[b].n - st[a].n) || st[b].d.localeCompare(st[a].d); });
  }, [tous]);
  var cavEffectif = (cavChoisi !== "tous" && cavaliers.indexOf(cavChoisi) >= 0) ? cavChoisi : "tous";
  var base = (cavEffectif === "tous") ? tous : tous.filter(function (f) { return f.cav === cavEffectif; });
  var places = base.filter(function (f) { return f.pl != null; });
  /* chiffres du haut : carriere, definitions historiques ; 5e chiffre = points connus de la SAISON EN COURS (D2) */
  var stats = hypePerfStatsHisto(base);
  var saisonCour = (function () { var d = new Date(); return hypePerfSaisonDe(d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)); })();
  var ptsCour = 0, avecPtsCour = 0;
  places.forEach(function (f) { if (f.saison === saisonCour && f.pts != null && !isNaN(f.pts)) { ptsCour += f.pts; avecPtsCour++; } });
  ptsCour = Math.round(ptsCour * 100) / 100;
  /* ── les saisons (1er septembre -> 31 aout), chacune separee, la plus recente d abord ── */
  var saisons = React.useMemo(function () {
    var par = {}, sansDate = [];
    base.forEach(function (f) { if (f.saison == null) { sansDate.push(f); return; } (par[f.saison] = par[f.saison] || []).push(f); });
    var out = Object.keys(par).map(Number).sort(function (a, b) { return b - a; }).map(function (k) { return { cle: String(k), lib: k + "-" + (k + 1), lignes: par[k] }; });
    if (sansDate.length) out.push({ cle: "sd", lib: T("Sans date", "Undated", "Sin fecha", "Senza data", "日付なし", "Ohne Datum", "بلا تاريخ", "未定日期", "Zonder datum", "Sem data", "Utan datum", "Без даты", "Bez daty", "날짜 없음", "بدون تاریخ"), lignes: sansDate });
    return out;
  }, [base]);
  var ouv = ouvertes || (saisons[0] ? (function () { var o = {}; o[saisons[0].cle] = true; return o; })() : {});
  function basculerSaison(cle) { var n = Object.assign({}, ouv); if (n[cle]) delete n[cle]; else n[cle] = true; setOuvertes(n); }

  /* ── moments forts : regle unifiee (choisis a la main, victoires, podiums…), toute la carriere ── */
  var forts = React.useMemo(function () {
    if (typeof hypePrincipauxResultats !== "function") return [];
    var vis = lignesVues.filter(function (r) { return r && (r.visible !== false || (voirMasques && estProprio)); });
    var resF = hypePrincipauxResultats(vis, (chV && chV.demo && secours.palmares) || [], 400);
    /* 13/11 00h25 (Blandine : « je comprends pas comment tu choisis… des 3e sur 21 alors que j'ai des 1er sur 115 ») — nouveau choix :
       1) les moments choisis à la main ; 2) la PLUS HAUTE ÉPREUVE courue (hauteur lue dans le nom) ; 3) les podiums sur les plus gros
       nombres de partants (à égalité : la plus haute, puis la meilleure place) ; complétés par les classements (premier quart). 8 au plus. */
    var forces = resF.filter(function (f) { return f && f.ff && !f.fx; });
    var libres = resF.filter(function (f) { return f && !f.ff && !f.fx && f.pl != null; });
    if (modeCav) libres = libres.filter(function (f) { return !(f.d && typeof hypePerfSaisonDe === "function" && hypePerfSaisonDe(f.d) === saisonCour); });
    libres.forEach(function (f) { f.haut = hauteurEp(f.ep); });
    var haute = null; libres.forEach(function (f) { if (f.haut != null && (!haute || f.haut > haute.haut || (f.haut === haute.haut && (f.pl < haute.pl || (f.pl === haute.pl && (f.part || 0) > (haute.part || 0)))))) haute = f; });
    /* 13/11 01h25 (Blandine : « il me prend une C1 à 1m25 alors que ma plus haute épreuve, c'est une B1 Open à 1m35 ») : la plus
       haute épreuve se cherche dans TOUS les parcours courus, classés ou non (sa B1 Open du 11/11/2000 est « Non classé »).
       Ni éliminés, ni abandons, ni forfaits : un parcours terminé. */
    try {
      var hMax = null;
      vis.forEach(function (r) {
        if (!r || !r.date_epreuve) return;
        var place = (r.place != null && r.place !== "") ? Number(r.place) : null;
        var st = String(r.statut || "");
        if (place == null && !(st === "hors_classement" || (st === "" && r.concours))) return;
        if (modeCav && typeof hypePerfSaisonDe === "function" && hypePerfSaisonDe(String(r.date_epreuve)) === saisonCour) return;
        var hr = hauteurEp(r.epreuve); if (hr == null) return;
        if (!hMax || hr > hMax.haut || (hr === hMax.haut && (place != null ? place : 999) < (hMax.pl != null ? hMax.pl : 999))) hMax = { id: r.id, pl: place, part: r.partants ? Number(r.partants) : null, nom: r.concours || "", ep: r.epreuve || "", cav: r.cavalier || "", cavId: r.cavalier_id || null, d: String(r.date_epreuve || ""), an: String(r.date_epreuve || "").slice(0, 4), haut: hr, nc: place == null };
      });
      if (hMax && (!haute || hMax.haut > haute.haut)) {
        var dejaL = libres.filter(function (f) { return f.id && f.id === hMax.id; })[0];
        haute = dejaL || hMax;
      }
    } catch (eHm) { }
    var triG = function (a, b) { return ((b.part || 0) - (a.part || 0)) || ((b.haut || 0) - (a.haut || 0)) || (a.pl - b.pl); };
    var pods = libres.filter(function (f) { return f !== haute && f.pl <= 3 && (f.part == null || f.part >= 5); }).sort(triG);   /* un podium sur moins de 5 partants n est pas un « beau moment » */
    var cls = libres.filter(function (f) { return f !== haute && f.pl > 3 && estClasseQ(f); }).sort(triG);
    if (haute) haute.plusHaute = true;
    resF = forces.concat(haute ? [haute] : [], pods, cls).slice(0, 8);
    return resF;
    /* 12/11 16h30 (page du cavalier) : un moment fort choisi automatiquement doit être un vrai classement (premier quart) ;
       ceux choisis à la main par la propriétaire restent */
    /* 12/11 16h35 (Blandine : « entre pas de doublons et tout retirer, il y a un juste milieu ») : les moments forts choisis
       automatiquement viennent des saisons PASSÉES ; la saison en cours est déjà ouverte en bas avec ses résultats récents */

  }, [lignesVues, voirMasques, estProprio, chV]);

  /* ── portraits des cavaliers relies a un compte ── */
  var avSt = React.useState({}); var avatars = avSt[0], setAvatars = avSt[1];
  var idsCav = React.useMemo(function () { var ids = []; forts.concat(base).forEach(function (f) { if (f && f.cavId && ids.indexOf(f.cavId) < 0 && ids.length < 150) ids.push(f.cavId); }); return ids; }, [forts, base]);
  React.useEffect(function () {
    var v = true; if (!idsCav.length || typeof supa === "undefined" || !supa) { setAvatars({}); return; }
    supa.from("profiles").select("id, avatar_url").in("id", idsCav).then(function (rA) {
      if (!v) return; var m = {}; ((rA && !rA.error && rA.data) || []).forEach(function (p) { if (p && p.id && p.avatar_url && String(p.avatar_url).charAt(0) !== "@") m[String(p.id)] = p.avatar_url; }); setAvatars(m);
    }, function () { });
    return function () { v = false; };
  }, [idsCav.join(",")]);

  /* ── photos du cheval (pour les moments forts sans media choisi) : album au nom du concours, sinon tirage stable dans la journee ── */
  var cibleCh = "cheval:" + (dbId || id);
  var phSt = React.useState(null); var photosPool = phSt[0], setPhotosPool = phSt[1];
  var alSt = React.useState([]); var albums = alSt[0], setAlbums = alSt[1];
  React.useEffect(function () {
    var v = true; if (!dbId) { setPhotosPool([]); setAlbums([]); return; }
    var estVid = function (u) { return u && typeof estUrlVideo === "function" && estUrlVideo(u); };
    Promise.all([
      Promise.resolve(typeof chargerPhotosSouvenirs === "function" ? chargerPhotosSouvenirs(cibleCh) : []),
      Promise.resolve(typeof listerAlbumsCheval === "function" ? listerAlbumsCheval(cibleCh) : { data: [] })
    ]).then(function (res) {
      if (!v) return;
      setPhotosPool((res[0] || []).filter(function (u) { return u && !estVid(u); }).slice(0, 24));
      try { setAlbums(((res[1] && res[1].data) || []).map(function (a) { return { nom: String((a && a.nom) || ""), photos: ((a && a.photos) || []).filter(function (u) { return u && !estVid(u); }) }; }).filter(function (a) { return a.photos.length; })); } catch (eA) { setAlbums([]); }
    }).catch(function () { if (v) { setPhotosPool([]); setAlbums([]); } });
    return function () { v = false; };
  }, [dbId]);
  var mnSt = React.useState(false); var menuOuvert = mnSt[0], setMenuOuvert = mnSt[1];
  var largeP = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;   /* (g8) tablette et plus : deux colonnes */
  var ordiP = (typeof useHypeLargeur === "function") ? useHypeLargeur(1024) : false;   /* (g8) ordinateur */
  /* (g6) lecture d une capture de palmares (moderatrice) : outil historique partage (hypeLireCapturePalmares / hypeEnregistrerCapturePalmares) */
  var cpE = React.useState(false); var capEnCours = cpE[0], setCapEnCours = cpE[1];
  var cpM = React.useState(null); var capMsg = cpM[0], setCapMsg = cpM[1];
  var cpT = React.useState(null); var capTrouves = cpT[0], setCapTrouves = cpT[1];
  var cpO = React.useState(false); var capOuvert = cpO[0], setCapOuvert = cpO[1];
  var refCapture = React.useRef(null);
  var edSt = React.useState(null); var ligneEdit = edSt[0], setLigneEdit = edSt[1];   /* (g6) resultat saisi a la main en cours de modification */
  var vgSt = React.useState(false); var videoGrande = vgSt[0], setVideoGrande = vgSt[1];   /* (g4) video en grand */
  var fgSt = React.useState(null); var fortGere = fgSt[0], setFortGere = fgSt[1];   /* (g3) feuille du crayon d un moment fort */   /* (g2) feuille du « ••• » */
  var mfSt = React.useState(null); var mfLocal = mfSt[0], setMfLocal = mfSt[1];
  var mfMedias = React.useMemo(function () {
    if (mfLocal) return mfLocal;
    try { var vM = ligneCh.moments_forts_medias; if (typeof vM === "string") vM = JSON.parse(vM); return (vM && typeof vM === "object") ? vM : {}; } catch (eM) { return {}; }
  }, [mfLocal, ligneCh.moments_forts_medias]);
  var photoCh = modeCav ? ((ligneCh.photo_url ? ((typeof avSrc === "function") ? avSrc(ligneCh.photo_url) : ligneCh.photo_url) : "") || (typeof IMG_CAVALIER_HERO_DEFAUT !== "undefined" ? IMG_CAVALIER_HERO_DEFAUT : ""))   /* (g9) portrait du cavalier, sinon le fond des pages cavalier (comme l ancienne page) */
    : (function () { var loc = ""; try { loc = localStorage.getItem("hype_cheval_photo_" + id) || ""; } catch (eL) { } return loc || ligneCh.photo_url || secours.photo || (typeof UV3_H1 !== "undefined" ? UV3_H1 : ""); })();
  /* (g3) Regle de Blandine pour les photos des moments forts : 1) photo choisie a la main ; 2) photo REELLEMENT associee au concours
     (aucune association fiable en base aujourd hui) ; 3) photo du couple si lien fiable (aucun aujourd hui) ; 4) etat sans photo.
     Donc : seulement le choix manuel. Plus de portrait du cavalier, plus d album « au nom proche », plus de photo tiree au hasard.
     Les albums et photos du cheval restent proposes DANS le choix manuel (crayon > Changer la photo), a confirmer par la proprietaire. */
  var photosForts = React.useMemo(function () {
    return forts.map(function (f) {
      var med = mfMedias;
      if (modeCav) { var lg = (lignes || []).filter(function (r) { return r && String(r.id) === String(f.id); })[0]; var cvx = lg && lg.cheval_id && cav && cav.chevaux[String(lg.cheval_id)]; med = {}; try { var mm = cvx && cvx.moments_forts_medias; if (typeof mm === "string") mm = JSON.parse(mm); med = (mm && typeof mm === "object") ? mm : {}; } catch (eM) { med = {}; } }   /* (g9) photo choisie par la proprietaire du cheval pour ce resultat */
      var sur = med[f.jeton] || null; return (sur && sur.url) ? { url: sur.url, video: sur.type === "video" } : null;
    });
  }, [forts, mfMedias, lignes, cav]);

  /* ── Team : carte Classement saison, seulement si le cheval est REELLEMENT dans la Team ── */
  var tmSt = React.useState(null); var teamInfo = tmSt[0], setTeamInfo = tmSt[1];
  React.useEffect(function () {
    var v = true; setTeamInfo(null);
    if (!dbId || typeof hypeClassementTeamChevaux !== "function") return;
    hypeClassementTeamChevaux().then(function (rT) { if (!v || !rT) return; var moiT = (rT.classement || []).filter(function (c) { return String(c.id) === String(dbId); })[0]; setTeamInfo(moiT ? { rang: moiT.rang, pts: moiT.pts, nom: rT.nom || "", saison: rT.saison, total: (rT.classement || []).length } : null); }).catch(function () { });
    return function () { v = false; };
  }, [dbId]);

  /* ── video pedagogique : masquage retenu dans ce telephone ── */
  var cleVid = "hype_perf_video_masquee_" + ((moi && moi.id) || "");
  var vdSt = React.useState(false); var videoMasquee = vdSt[0], setVideoMasquee = vdSt[1];
  React.useEffect(function () { try { setVideoMasquee(localStorage.getItem(cleVid) === "1"); } catch (eV) { } }, [cleVid]);
  function poserVideoMasquee(val) { setVideoMasquee(val); try { if (val) localStorage.setItem(cleVid, "1"); else localStorage.removeItem(cleVid); } catch (eV) { } }

  /* ── feuilles et toasts ── */
  var ajSt = React.useState(false); var ajoutOuvert = ajSt[0], setAjoutOuvert = ajSt[1];
  var cfSt = React.useState(false); var choixFortOuvert = cfSt[0], setChoixFortOuvert = cfSt[1];
  var pkSt = React.useState(null); var pickerJeton = pkSt[0], setPickerJeton = pkSt[1];
  var mdSt = React.useState(null); var mediasTous = mdSt[0], setMediasTous = mdSt[1];
  var toSt = React.useState(null); var toast = toSt[0], setToast = toSt[1];
  function annonce(msg) { setToast(msg); setTimeout(function () { setToast(null); }, 2600); }
  React.useEffect(function () {
    if (!pickerJeton || mediasTous !== null || !dbId) return;
    var v = true;
    Promise.resolve(typeof chargerPhotosSouvenirs === "function" ? chargerPhotosSouvenirs(cibleCh) : []).then(function (l) { if (v) setMediasTous((l || []).filter(Boolean)); }).catch(function () { if (v) setMediasTous([]); });
    return function () { v = false; };
  }, [pickerJeton, dbId]);

  function poserFort(f, champs) {
    if (!f || !f.id || typeof supa === "undefined" || !supa) return;
    var avant = fortsLocal[f.id] || null;
    var base = { ff: avant ? !!avant.ff : !!f.ff, fx: avant ? !!avant.fx : !!f.fx };
    var apres = { ff: (champs.fort_force != null) ? !!champs.fort_force : base.ff, fx: (champs.fort_exclu != null) ? !!champs.fort_exclu : base.fx };
    setFortsLocal(function (p) { var n = Object.assign({}, p); n[f.id] = apres; return n; });
    function revenir() { setFortsLocal(function (p) { var n = Object.assign({}, p); if (avant) n[f.id] = avant; else delete n[f.id]; return n; }); }
    supa.from("resultats").update(champs).eq("id", f.id).select("id").then(function (rF) {
      if (rF && rF.error) { annonce(T("Le choix n'a pas pu être enregistré.", "The choice could not be saved.", "No se pudo guardar.", "Impossibile salvare.", "保存できません。", "Auswahl nicht gespeichert.", "تعذر حفظ الاختيار.", "无法保存这个选择。", "De keuze kon niet worden opgeslagen.", "Não foi possível salvar a escolha.", "Valet kunde inte sparas.", "Не удалось сохранить выбор.", "Nie udało się zapisać wyboru.", "선택을 저장하지 못했어요.", "انتخاب ذخیره نشد.")); revenir(); return; }
      if (!rF || !rF.data || !rF.data.length) { annonce(T("Pas autorisé sur ce résultat.", "Not allowed on this result.", "Sin permiso en este resultado.", "Non autorizzato su questo risultato.", "この結果は変更できません。", "Bei diesem Ergebnis nicht erlaubt.", "غير مسموح لهذه النتيجة.", "你没有权限操作这条成绩。", "Niet toegestaan bij dit resultaat.", "Sem permissão neste resultado.", "Inte tillåtet på det här resultatet.", "Для этого результата нет доступа.", "Brak uprawnień do tego wyniku.", "이 결과에 대한 권한이 없어요.", "روی این نتیجه مجاز نیستی.")); revenir(); }
    }, function () { revenir(); });
  }
  async function definirMedia(jeton, url) {
    if (!dbId || typeof supa === "undefined" || !supa) return;
    var actuel = Object.assign({}, mfMedias);
    if (url) actuel[jeton] = { url: url, type: (typeof estUrlVideo === "function" && estUrlVideo(url)) ? "video" : "photo" }; else delete actuel[jeton];
    var rM = await supa.from("chevaux").update({ moments_forts_medias: actuel }).eq("id", dbId).select("id");
    if ((rM && rM.error) || !(rM && rM.data && rM.data.length)) { annonce(T("Enregistrement impossible.", "Could not save.", "No se pudo guardar.", "Salvataggio non riuscito.", "保存できません。", "Speichern nicht möglich.", "تعذر الحفظ.", "无法保存。", "Opslaan niet mogelijk.", "Não foi possível salvar.", "Det gick inte att spara.", "Не удалось сохранить.", "Nie udało się zapisać.", "저장할 수 없어요.", "ذخیره ممکن نیست.")); return; }
    setMfLocal(actuel); setPickerJeton(null);
    annonce(url ? T("Moment fort mis à jour ✨", "Highlight updated ✨", "Momento actualizado ✨", "Momento aggiornato ✨", "更新しました ✨", "Aktualisiert ✨", "تم التحديث ✨", "精彩时刻已更新 ✨", "Hoogtepunt bijgewerkt ✨", "Momento marcante atualizado ✨", "Höjdpunkt uppdaterad ✨", "Яркий момент обновлён ✨", "Najważniejszy moment zaktualizowany ✨", "하이라이트를 업데이트했어요 ✨", "لحظهٔ مهم به‌روز شد ✨") : T("Photo automatique rétablie", "Automatic photo restored", "Foto automática restablecida", "Foto automatica ripristinata", "自動の写真に戻しました", "Automatisches Foto wiederhergestellt", "تمت استعادة الصورة التلقائية", "已恢复自动照片", "Automatische foto hersteld", "Foto automática restaurada", "Automatiskt foto återställt", "Автоматическое фото восстановлено", "Przywrócono automatyczne zdjęcie", "자동 사진으로 되돌렸어요", "عکس خودکار بازگردانده شد"));
  }
  async function supprimerLigne(f) {
    var quoi = (f.nom || "") + (f.ep ? " · " + f.ep : "");
    var ok = false; try { ok = window.confirm(T("Retirer définitivement ce résultat saisi à la main ?", "Permanently remove this hand-entered result?", "¿Quitar definitivamente este resultado escrito a mano?", "Rimuovere definitivamente questo risultato inserito a mano?", "手入力のこの結果を削除しますか？", "Dieses von Hand erfasste Ergebnis endgültig entfernen?", "إزالة هذه النتيجة المدخلة يدويا نهائيا؟", "确定要永久删除这条手动录入的成绩吗？", "Dit handmatig ingevoerde resultaat definitief verwijderen?", "Remover definitivamente este resultado digitado à mão?", "Ta bort det här handskrivna resultatet för gott?", "Удалить этот результат, введённый вручную, насовсем?", "Usunąć na stałe ten wynik wpisany ręcznie?", "직접 입력한 이 결과를 완전히 삭제할까요?", "این نتیجهٔ دستی برای همیشه حذف شود؟") + "\n" + quoi); } catch (eC) { ok = false; }
    if (!ok) return;
    try {
      var r = await supprimerResultat(f.id);
      if (r && r.error) { annonce(T("Suppression impossible.", "Could not delete.", "No se pudo eliminar.", "Eliminazione impossibile.", "削除できません。", "Löschen nicht möglich.", "تعذر الحذف.", "无法删除。", "Verwijderen niet mogelijk.", "Não foi possível excluir.", "Det gick inte att ta bort.", "Не удалось удалить.", "Nie udało się usunąć.", "삭제할 수 없어요.", "حذف ممکن نیست.")); return; }
      if (r && r.aucuneLigne) { annonce(T("Suppression refusée : ce résultat n'est pas le tien.", "Refused: this result is not yours.", "Rechazado: este resultado no es tuyo.", "Rifiutato: questo risultato non è tuo.", "拒否：あなたの結果ではありません。", "Abgelehnt: dieses Ergebnis ist nicht deins.", "مرفوض: هذه النتيجة ليست لك.", "删除被拒绝：这条成绩不是你的。", "Verwijderen geweigerd: dit resultaat is niet van jou.", "Exclusão recusada: este resultado não é seu.", "Borttagning nekades: det här resultatet är inte ditt.", "Удаление отклонено: этот результат не твой.", "Usunięcie odrzucone: ten wynik nie jest twój.", "삭제가 거부되었어요: 이 결과는 내 것이 아니에요.", "حذف رد شد: این نتیجه مال تو نیست.")); return; }
      setLignes(function (av) { return (av || []).filter(function (x) { return x && x.id !== f.id; }); });
      annonce(T("Résultat retiré.", "Result removed.", "Resultado eliminado.", "Risultato rimosso.", "結果を削除しました。", "Ergebnis entfernt.", "تمت إزالة النتيجة.", "成绩已移除。", "Resultaat verwijderd.", "Resultado removido.", "Resultatet har tagits bort.", "Результат удалён.", "Wynik usunięty.", "결과를 삭제했어요.", "نتیجه برداشته شد."));
    } catch (eS) { annonce(T("Suppression impossible.", "Could not delete.", "No se pudo eliminar.", "Eliminazione impossibile.", "削除できません。", "Löschen nicht möglich.", "تعذر الحذف.", "无法删除。", "Verwijderen niet mogelijk.", "Não foi possível excluir.", "Det gick inte att ta bort.", "Не удалось удалить.", "Nie udało się usunąć.", "삭제할 수 없어요.", "حذف ممکن نیست.")); }
  }
  function retour() { try { if (app.peutReculer && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } if (modeCav) { setEcran("dashboard"); return; } /* (g9) */ if (!id) { setEcran("chevaux"); return; } /* 12/11 : sans cheval, la fiche serait vide aussi */ try { window.__chevalOuvert = id; } catch (eO) { } setEcran("cheval"); }
  function ouvrirImport() {
    if (!peutImporter) return;
    if (modeCav) { try { window.HYPE_IMPORT_MULTI = false; window.HYPE_IMPORT_CAVALIERE = true; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.HYPE_IMPORT_RETOUR = "performances-cavalier"; window.localStorage.removeItem("hype_cheval_import"); } catch (eIc) { } setEcran("import-resultats"); return; }   /* (g9) import a son nom, comme l ancienne page cavaliere */
    try { window.HYPE_IMPORT_VERROU_AFFICHAGE = !(estProprio || estMod); window.HYPE_IMPORT_CAVALIERE = false; window.HYPE_IMPORT_MULTI = false; window.HYPE_CHEVAL_IMPORT = dbId; window.HYPE_CHEVAL_IMPORT_NOM = nomCh || null; window.HYPE_IMPORT_RETOUR = "performances-cheval"; window.localStorage.removeItem("hype_cheval_import"); } catch (eI) { }
    setEcran("import-resultats");
  }
  function ouvrirClassementTeam() { try { window.__perfGroupe = null; window.__perfGroupeCourant = null; } catch (eG) { } setEcran("performances-chevaux"); }

  /* ── petits rendus ── */
  var LOCALES = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR", fa: "fa-IR-u-ca-gregory" };
  function dateLisible(d) { try { var m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]))).toLocaleDateString(LOCALES[langue] || "fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); } catch (eD) { return String(d || ""); } }
  function rangTxt(pl) { if (pl == null) return ""; if (langue === "fr") return pl === 1 ? "1er" : pl + "e"; if (langue === "en") return pl === 1 ? "1st" : pl === 2 ? "2nd" : pl === 3 ? "3rd" : pl + "th"; if (langue === "ja") return pl + "位"; if (langue === "zh") return "第" + pl + "名"; if (langue === "nl") return pl + "e"; if (langue === "pt") return pl + "º"; if (langue === "sv") return (pl + ((pl % 10 === 1 || pl % 10 === 2) && pl % 100 !== 11 && pl % 100 !== 12 ? ":a" : ":e")); if (langue === "ru") return (pl + "-\u0439"); if (langue === "pl") return (pl + "."); if (langue === "ko") return (pl + "\uc704"); if (langue === "de") return pl + "."; if (langue === "ar") return String(pl); return pl + "º"; }
  function libMasques() {
    if (voirMasques) return T("Masquer de nouveau les lignes masquées", "Hide the hidden lines again", "Volver a ocultar las líneas", "Nascondi di nuovo le righe", "非表示の行を再び隠す", "Ausgeblendete Zeilen wieder verbergen", "إخفاء الأسطر المخفية مجددا", "重新隐藏已隐藏的行", "Verborgen regels weer verbergen", "Ocultar de novo as linhas ocultas", "Dölj de dolda raderna igen", "Снова скрыть скрытые строки", "Ukryj ponownie ukryte wiersze", "숨긴 줄 다시 숨기기", "پنهان کردن دوبارهٔ سطرهای پنهان");
    if (nbMasques === 1) return T("Afficher aussi la ligne masquée", "Also show the hidden line", "Mostrar también la línea oculta", "Mostra anche la riga nascosta", "非表示の1行も表示", "Auch die ausgeblendete Zeile zeigen", "عرض السطر المخفي أيضا", "同时显示已隐藏的行", "Ook de verborgen regel tonen", "Mostrar também a linha oculta", "Visa även den dolda raden", "Показать также скрытую строку", "Pokaż też ukryty wiersz", "숨긴 줄도 함께 보기", "نمایش سطر پنهان هم");
    return T("Afficher aussi les " + nbMasques + " lignes masquées", "Also show the " + nbMasques + " hidden lines", "Mostrar también las " + nbMasques + " líneas ocultas", "Mostra anche le " + nbMasques + " righe nascoste", nbMasques + " 件の非表示行も表示", "Auch die " + nbMasques + " ausgeblendeten Zeilen zeigen", "عرض الأسطر المخفية أيضا (" + nbMasques + ")", "同时显示" + nbMasques + "条已隐藏的行", "Toon ook de " + nbMasques + " verborgen regels", "Mostrar também as " + nbMasques + " linhas ocultas", ("Visa även de " + nbMasques + " dolda raderna"), ("Показать также скрытые строки: " + nbMasques), ("Pokaż też ukryte wiersze (" + nbMasques + ")"), ("숨긴 " + nbMasques + "줄도 함께 보기"));
  }
  /* nom complet lisible (« Evan Roux »), comme la maquette — pas le nom court « Evan R. » de l ancienne page */
  function nomCourt(x) {
    try {
      var t = (typeof netNomCavalierFFE === "function") ? netNomCavalierFFE(x) : String(x || "").replace(/\s+/g, " ").trim();
      if (!t) return String(x || "");
      return t.split(" ").map(function (mot) { return mot.split("-").map(function (p) { return p ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p; }).join("-"); }).join(" ");
    } catch (eN) { return String(x || ""); }
  }
  function initiales(nom) { return String(nom || "").split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join(""); }
  function titreSection(txt, droite) {
    return h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "30px 18px 12px" } },
      h("div", { style: { fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: IVOIRE, letterSpacing: ".01em" } }, txt), droite || null);
  }
  function pilule(txt, actif, onClick, cle) {
    return h("button", { key: cle, type: "button", onClick: onClick, style: { flex: "0 0 auto", minHeight: 34, padding: "0 14px", borderRadius: 10, border: (actif ? "1.5px solid #C9A66B" : "1px solid rgba(243,238,228,0.14)"), background: "transparent", color: actif ? "#F3EEE4" : "rgba(243,238,228,0.82)", fontFamily: SANS, fontSize: 11.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" } }, txt);   /* (g2) pastille choisie remplie de champagne clair, comme la maquette */
  }
  function boutonContour(txt, onClick, icone, cle, desactive) {
    return h("button", { key: cle, type: "button", onClick: onClick, disabled: !!desactive, style: { flex: 1, minHeight: 50, padding: "0 12px", borderRadius: 14, border: "1px solid " + (desactive ? "rgba(201,166,107,0.3)" : "rgba(201,166,107,0.7)"), background: "rgba(16,26,29,0.85)", color: desactive ? MUET : IVOIRE, fontFamily: SANS, fontSize: 12.5, fontWeight: 600, cursor: desactive ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 } }, icone || null, h("span", null, txt));
  }
  var ICO_CADENAS = h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: CHAMP, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("rect", { x: 5, y: 11, width: 14, height: 10, rx: 2 }), h("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }));
  var ICO_COUPE = h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: "#1b1205", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }));
  /* Toucher un moment fort ouvre SA saison dans le tableau, la fait defiler et met le resultat en evidence (2 s).
     Si le filtre cavalier l exclut : retour a « Tous » d abord. Si le filtre secondaire de la saison le cache : retour a « Tous ».
     Pas de saison connue (palmares de demonstration sans date) : carte non cliquable, aucune navigation trompeuse. */
  var surSt = React.useState(null); var surligne = surSt[0], setSurligne = surSt[1];
  function saisonDeFort(f) { return (f && (f.d || f.an)) ? hypePerfSaisonDe(f.d, f.an) : null; }
  function allerAuFort(f) {
    var sa = saisonDeFort(f); if (sa == null) return;
    var cle = String(sa);
    var dansListe = !!(f.id && tous.some(function (x) { return x.id === f.id; }));
    if (cavEffectif !== "tous" && f.cav !== cavEffectif) setCavChoisi("tous");
    var o = Object.assign({}, ouv); o[cle] = true; setOuvertes(o);
    if ((filtres[cle] || vueDefaut || "tous") !== "tous") { var nf = Object.assign({}, filtres); nf[cle] = "tous"; setFiltres(nf); }   /* 30/10 : tient compte de sa vue par defaut */
    if (dansListe) { setSurligne(f.id); setTimeout(function () { setSurligne(function (c) { return c === f.id ? null : c; }); }, 2400); }
    setTimeout(function () {
      try {
        var el = (dansListe && document.getElementById("perf-r-" + f.id)) || document.getElementById("perf-saison-" + cle);
        if (el) el.scrollIntoView({ behavior: "smooth", block: dansListe ? "center" : "start" });
      } catch (eSc) { }
    }, 140);
  }
  var ICO_SANS_PHOTO = h("svg", { viewBox: "0 0 24 24", width: 26, height: 26, fill: "none", stroke: "rgba(201,166,107,0.45)", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }));
  function petitBouton(label, contenu, action) {
    return h("button", { type: "button", "aria-label": label, onClick: function (e) { try { e.stopPropagation(); } catch (eS) { } action(); }, style: { width: 26, height: 26, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.28)", background: "rgba(7,10,8,0.6)", color: IVOIRE, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, fontSize: 16, lineHeight: 1 } }, contenu);
  }
  /* (g3) MOMENT FORT facon maquette : la photo occupe toute la carte, degrade sombre discret en bas, rang en champagne,
     epreuve / concours + annee / cavalier lisibles ; UN seul petit crayon (proprietaire / moderatrice selon les droits reels)
     qui ouvre une petite feuille : Changer la photo, Retirer des moments forts. Plus de pastille de rang en haut a gauche. */
  function carteFort(f, grande, idx) {
    if (!f) return null;
    var ph = photosForts[idx] || null;
    var loc = f.id && fortsLocal[f.id];
    var ffCour = loc ? !!loc.ff : !!f.ff;
    var cliquable = saisonDeFort(f) != null;
    var peutPhoto = !!(!modeCav && estProprio && f.id && f.jeton);   /* la base ne laisse modifier la fiche (moments_forts_medias) qu a sa proprietaire ; (g9) jamais depuis la page du cavalier */
    var peutRetirer = !!(peutForts && f.id);             /* resultats.fort_force / fort_exclu : proprietaire du cheval ou moderatrice */
    var annee = f.an || (f.d ? String(f.d).slice(0, 4) : "");
    var concoursC = String(f.nom || "").replace(/^\s*CSO\s+/i, "");
    var ombre = "0 1px 8px rgba(0,0,0,0.75)";
    return h("div", { key: "mf" + idx, "data-perf-fort": String(idx), role: cliquable ? "button" : undefined, tabIndex: cliquable ? 0 : undefined, onClick: cliquable ? function () { allerAuFort(f); } : undefined,
      style: { position: "relative", borderRadius: grande ? 16 : 13, overflow: "hidden", border: "1px solid rgba(201,166,107,0.22)", background: "radial-gradient(120% 90% at 30% 20%, " + PETROLE2 + " 0%, " + NOIR + " 75%)", gridRow: grande ? "span 2" : undefined, minHeight: 0, cursor: cliquable ? "pointer" : "default" } },
      ph ? (ph.video ? hypeMiniatureVideo(ph.url, { largeur: grande ? 900 : 500, objectPosition: "center 30%", picto: false, style: { position: "absolute", inset: 0 } })
        : h("img", { src: ph.url, alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" } }))
        : h("div", { "aria-hidden": "true", style: { position: "absolute", top: grande ? "26%" : "22%", left: 0, right: 0, display: "flex", justifyContent: "center" } }, ICO_SANS_PHOTO),
      h("div", { "aria-hidden": "true", style: { pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,8,0) 40%, rgba(7,10,8,0.5) 66%, rgba(7,10,8,0.9) 100%)" } }),
      (peutPhoto || peutRetirer) ? h("button", { type: "button", "data-perf-crayon": String(idx), "aria-label": T("Gérer ce moment fort", "Manage this highlight", "Gestionar este momento", "Gestisci questo momento", "このハイライトを管理", "Diesen Moment verwalten", "إدارة هذه اللحظة", "管理这个精彩时刻", "Dit hoogtepunt beheren", "Gerenciar este momento marcante", "Hantera den här höjdpunkten", "Управлять этим ярким моментом", "Zarządzaj tym najważniejszym momentem", "이 하이라이트 관리", "مدیریت این لحظهٔ مهم"), onClick: function (e) { try { e.stopPropagation(); } catch (eS) { } setFortGere({ f: f, peutPhoto: peutPhoto, peutRetirer: peutRetirer, ff: ffCour }); },
        style: { position: "absolute", top: grande ? 8 : 6, insetInlineEnd: grande ? 8 : 6, width: 26, height: 26, borderRadius: 8, border: "none", background: "rgba(7,10,8,0.55)", color: "#E6CF9C", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } },
        h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" }))) : null,
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: grande ? "0 12px 12px" : "0 8px 8px" } },
        h("div", { style: { fontFamily: SERIF, fontSize: grande ? 34 : 25, fontWeight: 600, color: "#E6CF9C", lineHeight: 1, textShadow: ombre } },
          rangTxt(f.pl), (grande && f.part) ? h("span", { style: { fontSize: 19, color: "#E6CF9C" } }, " " + T("sur", "of", "de", "su", "/", "von", "من", "/", "van", "de", "av", "из", "z", "중", "از") + " " + f.part) : null),
        f.ep ? h("div", { style: { marginTop: grande ? 6 : 4, fontFamily: SANS, fontSize: grande ? 12 : 10, fontWeight: 500, color: IVOIRE, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: ombre } }, grande ? f.ep : String(f.ep).replace(/^\s*Poney\s+(\d|Elite)\b/i, "P$1")) : null,   /* petite carte : « P1 Grand Prix » comme la maquette */
        h("div", { style: { marginTop: 1, fontFamily: SANS, fontSize: grande ? 12 : 10, fontWeight: 500, color: IVOIRE, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: ombre } }, grande ? (concoursC + (annee ? " " + annee : "")) : concoursC),
        (grande ? f.cav : (annee || f.cav)) ? h("div", { style: { marginTop: 2, fontFamily: SANS, fontSize: grande ? 11 : 9, color: "rgba(230,207,156,0.92)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: ombre } }, grande ? nomCourt(f.cav) : [annee, f.cav ? nomCourt(f.cav) : ""].filter(Boolean).join(" \u00b7 ")) : null));
  }
  function tuileAjoutFort() {
    return h("button", { type: "button", key: "ajf", onClick: function () { setChoixFortOuvert(true); }, style: { minHeight: 0, borderRadius: 13, border: "1px dashed rgba(201,166,107,0.55)", background: "rgba(16,26,29,0.5)", color: "#E6CF9C", fontFamily: SANS, fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 8, textAlign: "center", lineHeight: 1.25 } },
      h("span", { style: { fontFamily: SERIF, fontSize: 26, lineHeight: 1, color: CHAMP } }, "+"),
      T("Ajouter un moment fort", "Add a highlight", "Añadir un momento", "Aggiungi un momento", "ハイライトを追加", "Moment hinzufügen", "إضافة لحظة بارزة", "添加精彩时刻", "Hoogtepunt toevoegen", "Adicionar um momento marcante", "Lägg till en höjdpunkt", "Добавить яркий момент", "Dodaj najważniejszy moment", "하이라이트 추가", "افزودن یک لحظهٔ مهم"));
  }
  function ligneResultat(f, i) {
    var av = f.cavId && avatars[String(f.cavId)];
    var peutCorb = !!(f.id && f.og !== "import" && (estProprio || estMod));
    var brutEdit = (f.id && f.og !== "import" && moi) ? ((lignes || []).filter(function (r) { return r && String(r.id) === String(f.id) && r.user_id === moi.id; })[0] || null) : null;
    var enEvidence = !!(f.id && surligne === f.id);
    return h("div", { key: "lr" + (f.id || i), id: f.id ? "perf-r-" + f.id : undefined, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 6px", margin: "0 -6px", borderRadius: 10, borderTop: "1px solid rgba(243,238,228,0.07)", background: enEvidence ? "rgba(201,166,107,0.16)" : "transparent", boxShadow: enEvidence ? "inset 0 0 0 1px rgba(201,166,107,0.6)" : "none", transition: "background .4s ease, box-shadow .4s ease" } },
      f.photo ? h("img", { src: f.photo, alt: "", loading: "lazy", decoding: "async", style: { width: 54, height: 54, borderRadius: 12, objectFit: "cover", flex: "0 0 auto", border: "1px solid " + FILET } }) : null,
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET2, letterSpacing: ".04em" } }, f.d ? dateLisible(f.d) : (f.saison != null ? (f.saison + "-" + (f.saison + 1)) : "")),
        h("div", { style: { marginTop: 2, fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: IVOIRE, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" } }, [f.ep, String(f.nom || "").replace(/^\s*CSO\s+/i, "")].filter(Boolean).join(" \u2022 ")),   /* (g1) une ligne « Epreuve • Concours » comme la maquette ; le « CSO » du nom FFE retire a l affichage seulement */
        h("div", { style: { marginTop: 4, display: "flex", alignItems: "center", gap: 6, minWidth: 0 } },
          f.cav ? (av ? h("img", { src: av, alt: "", loading: "lazy", style: { width: 18, height: 18, borderRadius: "50%", objectFit: "cover", flex: "0 0 auto" } }) : h("span", { style: { width: 18, height: 18, borderRadius: "50%", background: "rgba(201,166,107,0.2)", color: "#E6CF9C", fontFamily: SANS, fontSize: 8, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, initiales(f.cav))) : null,
          f.cav ? h("span", { style: { fontFamily: SANS, fontSize: 11, color: MUET, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, nomCourt(f.cav)) : null,
          hypePerfEstSansFaute(f) ? h("span", { style: { fontFamily: SANS, fontSize: 9, fontWeight: 600, color: "#E6CF9C", border: "1px solid rgba(201,166,107,0.5)", borderRadius: 999, padding: "1px 6px", whiteSpace: "nowrap", flex: "0 0 auto" } }, T("Sans faute", "Clear round", "Sin faltas", "Netto", "クリア", "Fehlerfrei", "بلا أخطاء", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bez błędu", "무실수", "بدون خطا")) : null,
          f.masque ? h("span", { style: { fontFamily: SANS, fontSize: 9, color: MUET2, border: "1px solid rgba(243,238,228,0.18)", borderRadius: 999, padding: "1px 6px", whiteSpace: "nowrap", flex: "0 0 auto" } }, T("masqué", "hidden", "oculto", "nascosto", "非表示", "ausgeblendet", "مخفي", "已隐藏", "verborgen", "oculto", "dold", "скрыто", "ukryte", "숨김", "پنهان")) : null)),
      h("div", { style: { flex: "0 0 auto", textAlign: "end" } },
        h("div", { style: { fontFamily: SERIF, fontSize: f.pl != null ? 28 : 15, fontWeight: 600, color: f.pl != null ? "#E6CF9C" : "#C8908A", lineHeight: 1 } },   /* (g1) place en grand champagne, comme la maquette */ f.pl != null ? rangTxt(f.pl) : (f.statut === "el" ? T("Élim.", "Elim.", "Elim.", "Elim.", "失権", "Ausg.", "مستبعد", "淘汰", "Uitgesch.", "Elim.", "Utsl.", "Выб.", "Wyc.", "탈락", "حذف") : (f.statut === "ab" ? T("Abandon", "Retired", "Abandono", "Ritiro", "棄権", "Aufgabe", "انسحاب", "弃权", "Opgave", "Desistência", "Bröt", "Снятие", "Wycofanie", "기권", "انصراف") : (f.clTxt || "—")))),
        f.part ? h("div", { style: { fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 3, direction: "ltr", unicodeBidi: "isolate" } }, "/" + f.part) : null,
        (f.pts != null && !isNaN(f.pts)) ? h("div", { style: { fontFamily: SANS, fontSize: 10, color: "#E6CF9C", marginTop: 2, direction: "ltr", unicodeBidi: "isolate" } }, "+" + (Math.round(f.pts * 100) / 100) + " pts") : null),
      /* (g6) MODIFIER un resultat saisi a la main : meme fenetre que l ajout, en mode modification (FeuilleAjoutResultatV2, ligneEdition),
         seulement pour la personne qui l a saisi (regle du mode modification) ; les resultats importes FFE ne se modifient pas ici. */
      brutEdit ? h("button", { type: "button", "data-perf-modifier": f.id, onClick: function () { setLigneEdit(brutEdit); }, "aria-label": T("Modifier ce résultat", "Edit this result", "Editar este resultado", "Modifica questo risultato", "この結果を編集", "Dieses Ergebnis bearbeiten", "تعديل هذه النتيجة", "修改这条成绩", "Dit resultaat wijzigen", "Editar este resultado", "Redigera det här resultatet", "Изменить этот результат", "Edytuj ten wynik", "이 결과 수정", "ویرایش این نتیجه"), style: { flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.16)", background: "transparent", color: "#E6CF9C", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } },
        h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" }))) : null,
      peutCorb ? h("button", { type: "button", onClick: function () { supprimerLigne(f); }, "aria-label": T("Retirer ce résultat", "Remove this result", "Quitar este resultado", "Rimuovi questo risultato", "この結果を削除", "Dieses Ergebnis entfernen", "إزالة هذه النتيجة", "移除这条成绩", "Dit resultaat verwijderen", "Remover este resultado", "Ta bort det här resultatet", "Убрать этот результат", "Usuń ten wynik", "이 결과 삭제", "برداشتن این نتیجه"), style: { flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.16)", background: "transparent", color: "#C8706A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } },
        h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" }))) : null);
  }
  /* les feuilles et le toast passent par un portail vers <body> : la barre d onglets du bas y vit aussi, sinon elle passe devant */
  function portail(el, cle) { return (typeof ReactDOM !== "undefined" && ReactDOM.createPortal && typeof document !== "undefined" && document.body) ? ReactDOM.createPortal(el, document.body, cle) : el; }
  function feuille(contenu, fermer, cle) {
    return portail(h("div", { key: cle, onClick: fermer, "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,5,0.82)", display: "flex", alignItems: "flex-end", justifyContent: "center", direction: rtl ? "rtl" : "ltr" } },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "80vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))", boxSizing: "border-box" } }, contenu)), cle);
  }
  function boutonFermer(fermer) {
    return h("button", { type: "button", onClick: fermer, style: { marginTop: 12, width: "100%", minHeight: 44, borderRadius: 999, border: "1px solid rgba(243,238,228,0.22)", background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기", "بستن"));
  }

  /* ── etats de chargement ── */
  var racineSt = { minHeight: "100vh", background: NOIR, color: IVOIRE, fontFamily: SANS, fontVariantNumeric: "lining-nums" /* (g1) chiffres droits : le Cormorant dessine par defaut des chiffres « a l ancienne » (12 ressemblait a I2) */, direction: rtl ? "rtl" : "ltr", paddingBottom: "calc(96px + env(safe-area-inset-bottom))" /* la barre d onglets du bas */ };
  if (!etat.charge || lignes === null) {
    return h("div", { "data-ecran": "performances-cheval", style: Object.assign({}, racineSt, { display: "flex", alignItems: "center", justifyContent: "center" }) },
      h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: MUET } }, "…"));
  }
  if (!chV) {
    return h("div", { "data-ecran": "performances-cheval", style: Object.assign({}, racineSt, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }) },
      h("div", { style: { fontFamily: SERIF, fontSize: 24, color: IVOIRE } }, T("Cheval introuvable", "Horse not found", "Caballo no encontrado", "Cavallo non trovato", "馬が見つかりません", "Pferd nicht gefunden", "الحصان غير موجود", "找不到这匹马", "Paard niet gevonden", "Cavalo não encontrado", "Hästen hittades inte", "Лошадь не найдена", "Nie znaleziono konia", "말을 찾을 수 없어요", "اسب پیدا نشد")),
      h("button", { type: "button", onClick: retour, style: { minHeight: 44, padding: "0 22px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.7)", background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 13, cursor: "pointer" } }, T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로", "بازگشت")));
  }

  /* ── haut de page : photo, nom, infos, badge Team ── */
  var og = (function () { try { var o = ligneCh.origines; if (typeof o === "string") o = JSON.parse(o); return (o && typeof o === "object") ? o : (secours.origines || {}); } catch (eO) { return secours.origines || {}; } })() || {};
  var SEXES = { hongre: T("Hongre", "Gelding", "Castrado", "Castrone", "せん馬", "Wallach", "مخصي", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마", "اسب اخته"), jument: T("Jument", "Mare", "Yegua", "Giumenta", "牡馬", "Stute", "فرس", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말", "مادیان"), entier: T("Entier", "Stallion", "Entero", "Stallone", "牡馬", "Hengst", "فحل", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마", "نریان") };
  var infos = modeCav ? [String(ligneCh.ecurie || "").trim()].filter(Boolean)   /* (g9) cavalier : son ecurie */
    : [SEXES[String(og.sexe || "").toLowerCase().trim()] || "", String(ligneCh.race || secours.race || "").trim(), (function () { var m = String(og.naissance || "").match(/^(\d{4})/); return m ? m[1] : ""; })(),
       /* (g10) taille du cheval comme la maquette (« 1,68 m »), seulement si les origines la donnent ; jamais inventee */
       (function () { var t = String(og.taille || "").trim(); if (!t) return ""; var mC = t.match(/^(\d{3})\s*(cm)?$/i); if (mC) return (Number(mC[1]) / 100).toFixed(2).replace(".", ",") + " m"; var mM = t.match(/^(\d)[.,](\d{1,2})\s*m?$/i); if (mM) return mM[1] + "," + (mM[2].length === 1 ? mM[2] + "0" : mM[2]) + " m"; return t; })()].filter(Boolean);
  var rondHaut = { width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.28)", background: "rgba(7,10,8,0.45)", color: IVOIRE, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, flex: "0 0 auto" };
  var peutLier = !!(moi && dbId && !estProprio && typeof lierCheval === "function" && typeof delierCheval === "function");
  async function basculerLien() {
    try {
      var rB = droits.lie ? await delierCheval(dbId) : await lierCheval(dbId);
      var msgB = rB && rB.error ? String((rB.error && rB.error.message) || rB.error) : "";
      if (rB && rB.error && !(!droits.lie && /duplicate|23505|unique/i.test(msgB))) { annonce(T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "غير ممكن حاليا — أعيدي المحاولة", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요", "فعلاً ممکن نیست — دوباره امتحان کن")); return; }
      var lieN = !droits.lie; setDroits(Object.assign({}, droits, { lie: lieN }));
      annonce(lieN ? T("Ajouté à tes chevaux ✓", "Added to your horses ✓", "Añadido a tus caballos ✓", "Aggiunto ai tuoi cavalli ✓", "私の馬に追加しました ✓", "Zu deinen Pferden hinzugefügt ✓", "تمت الإضافة إلى خيولك ✓", "已添加到你的马 ✓", "Toegevoegd aan je paarden ✓", "Adicionado aos seus cavalos ✓", "Tillagd bland dina hästar ✓", "Добавлено в твоих лошадей ✓", "Dodano do twoich koni ✓", "내 말에 추가했어요 ✓", "به اسب‌هایت اضافه شد ✓") : T("Retiré de tes chevaux ✓", "Removed from your horses ✓", "Retirado de tus caballos ✓", "Rimosso dai tuoi cavalli ✓", "私の馬から削除しました ✓", "Aus deinen Pferden entfernt ✓", "تمت الإزالة من خيولك ✓", "已从你的马中移除 ✓", "Verwijderd uit je paarden ✓", "Removido dos seus cavalos ✓", "Borttagen från dina hästar ✓", "Убрано из твоих лошадей ✓", "Usunięto z twoich koni ✓", "내 말에서 뺐어요 ✓", "از اسب‌هایت حذف شد ✓"));
    } catch (eB) { annonce(T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "غير ممكن حاليا — أعيدي المحاولة", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요", "فعلاً ممکن نیست — دوباره امتحان کن")); }
  }
  /* meme adresse que « Partager sa fiche » : adresse publique /cheval/<slug> si la base en donne une, sinon /#cheval-<id> */
  async function inviterCav() {   /* 12/11 : message d invitation, envoyé par le cavalier qui regarde (Messages, WhatsApp…) */
    var u = location.origin + "/#perfcav-" + riderId;
    var tx = T("Ajoute tes résultats de concours sur Hype, c'est rapide : tu peux les importer depuis la FFE en deux minutes. Ta page Performances : ", "Add your show results on Hype, it's quick: import them from the FFE in two minutes. Your Performances page: ", "Añade tus resultados en Hype, es rápido: impórtalos desde la FFE en dos minutos. Tu página: ", "Aggiungi i tuoi risultati su Hype, è veloce: importali dalla FFE in due minuti. La tua pagina: ", "Hypeに大会成績を追加しよう。FFEから2分でインポートできます。あなたのページ：", "Füge deine Turnierergebnisse auf Hype hinzu, es geht schnell: Import von der FFE in zwei Minuten. Deine Seite: ", "أضف نتائج مسابقاتك على Hype، الأمر سريع: استوردها من FFE في دقيقتين. صفحتك: ", "在Hype上添加你的比赛成绩吧，很快：两分钟就能从FFE导入。你的页面：", "Voeg je wedstrijdresultaten toe op Hype, het gaat snel: importeer ze in twee minuten van de FFE. Je pagina: ", "Adiciona os teus resultados no Hype, é rápido: importa-os da FFE em dois minutos. A tua página: ", "Lägg till dina tävlingsresultat på Hype, det går snabbt: importera dem från FFE på två minuter. Din sida: ", "Добавь свои результаты в Hype, это быстро: импорт из FFE за две минуты. Твоя страница: ", "Dodaj swoje wyniki w Hype, to szybkie: zaimportuj je z FFE w dwie minuty. Twoja strona: ", "Hype에 대회 성적을 추가해 봐요. FFE에서 2분이면 가져올 수 있어요. 내 페이지: ", "نتایج مسابقه‌هایت را به Hype اضافه کن، سریع است: می‌توانی در دو دقیقه از FFE واردشان کنی. صفحهٔ عملکردهایت: ");
    try { if (navigator.share) { await navigator.share({ title: "Hype", text: tx, url: u }); return; } } catch (eS) { return; }
    try { await navigator.clipboard.writeText(tx + u); annonce(T("Message copié !", "Message copied!", "¡Mensaje copiado!", "Messaggio copiato!", "メッセージをコピーしました！", "Nachricht kopiert!", "تم نسخ الرسالة!", "消息已复制！", "Bericht gekopieerd!", "Mensagem copiada!", "Meddelandet kopierades!", "Сообщение скопировано!", "Wiadomość skopiowana!", "메시지를 복사했어요!", "پیام کپی شد!")); } catch (eC) { }
  }
  async function partagerCav() {   /* 12/11 (Blandine : « le bouton partager la page… partout ») : adresse de la page du cavalier */
    var u = location.origin + "/#perfcav-" + riderId;
    var tx = (nomCh || "Hype") + " \u2014 " + T("Performances", "Performances", "Rendimiento", "Prestazioni", "成績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki", "성적", "عملکردها") + " \u2014 Hype";
    try { if (navigator.share) { await navigator.share({ title: tx, text: tx, url: u }); return; } } catch (eS) { return; }
    try { await navigator.clipboard.writeText(u); annonce(T("Lien copié !", "Link copied!", "¡Enlace copiado!", "Link copiato!", "リンクをコピーしました！", "Link kopiert!", "تم نسخ الرابط!", "链接已复制！", "Link gekopieerd!", "Link copiado!", "Länken kopierades!", "Ссылка скопирована!", "Link skopiowany!", "링크를 복사했어요!", "لینک کپی شد!")); } catch (eC) { }
  }
  async function partagerCheval() {
    setMenuOuvert(false);
    var sl = typeof ligneCh.slug === "string" ? ligneCh.slug : "";
    var u = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sl) ? (location.origin + "/cheval/" + sl) : (location.origin + "/#cheval-" + (dbId || id));
    var tx = (nomCh || "Hype") + " \u2014 Hype \uD83D\uDC0E";
    try { if (navigator.share) { await navigator.share({ title: tx, text: tx, url: u }); return; } } catch (eS) { return; }
    try { await navigator.clipboard.writeText(u); annonce(T("Lien copié !", "Link copied!", "¡Enlace copiado!", "Link copiato!", "リンクをコピーしました！", "Link kopiert!", "تم نسخ الرابط!", "链接已复制！", "Link gekopieerd!", "Link copiado!", "Länken kopierades!", "Ссылка скопирована!", "Link skopiowany!", "링크를 복사했어요!", "لینک کپی شد!")); } catch (eC) { annonce(u); }
  }
  function ctxCapture() { return { T: T, setImportResEnCours: setCapEnCours, setImportResMsg: setCapMsg, setImportResTrouves: setCapTrouves, chevalDyn: { nom: nomCh, dbId: dbId }, c: { nom: nomCh }, resDb: lignes || [], moi: moi }; }
  function lireCapture(fichier) { setCapOuvert(true); hypeLireCapturePalmares(fichier, ctxCapture()); }
  function validerCapture() {
    hypeEnregistrerCapturePalmares({ T: T, importResTrouves: capTrouves, setImportResTrouves: setCapTrouves, setAjoutRes: function (v) { if (!v) setCapOuvert(false); }, setToast: setToast, setResDb: function () { setRelire(function (n) { return n + 1; }); }, chevalDyn: { nom: nomCh, dbId: dbId }, moi: moi });
  }
  function libRangCap(r) { r = String(r || ""); if (r === "1") return T("1er", "1st", "1.º", "1°", "1位", "1.", "الأول", "第1名", "1e", "1º", "1:a", "1-е", "1.", "1위", "اول"); if (r === "classe") return T("Classé", "Placed", "Clasificado", "Classificato", "入賞", "Platziert", "مصنف", "获得名次", "Geplaatst", "Classificado", "Placerad", "Призёр", "Sklasyfikowany", "입상", "رتبه‌دار"); return r ? (r + T("e", "th", ".º", "°", "位", ".", "", "th", "th", "th", "th", "th", "th", "th", "م")) : ""; }
  var outilCapture = (estMod && dbId && typeof hypeLireCapturePalmares === "function") ? h("div", { style: { margin: "10px 18px 0", textAlign: "center" } },
    h("input", { ref: refCapture, type: "file", accept: "image/*", style: { display: "none" }, onChange: function (eIm) { var fIm = (eIm.target && eIm.target.files && eIm.target.files[0]) || null; try { eIm.target.value = ""; } catch (eRi) { } if (fIm) lireCapture(fIm); } }),
    h("button", { type: "button", "data-perf-capture": "1", onClick: function () { if (!capEnCours && refCapture.current) refCapture.current.click(); }, style: { minHeight: 38, padding: "0 14px", borderRadius: 999, border: "1px dashed rgba(201,166,107,0.55)", background: "transparent", color: "#E6CF9C", fontFamily: SANS, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } },
      capEnCours ? T("Lecture de la capture…", "Reading the screenshot…", "Leyendo la captura…", "Lettura della schermata…", "キャプチャを読み取り中…", "Screenshot wird gelesen…", "جار قراءة اللقطة…", "正在识别截图…", "Screenshot lezen…", "Lendo a captura…", "Läser skärmdumpen…", "Чтение скриншота…", "Odczytywanie zrzutu ekranu…", "캡처를 읽는 중…", "در حال خواندن اسکرین‌شات…") : ("\u2913 " + T("Lire une capture (IFCE, Horsetelex…)", "Read a screenshot (IFCE, Horsetelex…)", "Leer una captura (IFCE, Horsetelex…)", "Leggi una schermata (IFCE, Horsetelex…)", "キャプチャを読む（IFCE、Horsetelex…）", "Screenshot lesen (IFCE, Horsetelex…)", "قراءة لقطة (IFCE، Horsetelex…)", "识别截图（IFCE、Horsetelex…）", "Een screenshot lezen (IFCE, Horsetelex…)", "Ler uma captura (IFCE, Horsetelex…)", "Läs en skärmdump (IFCE, Horsetelex…)", "Прочитать скриншот (IFCE, Horsetelex…)", "Odczytaj zrzut ekranu (IFCE, Horsetelex…)", "캡처 읽기(IFCE, Horsetelex…)", "خواندن یک تصویر صفحه (IFCE، Horsetelex…)")))) : null;
  var feuilleCapture = (capOuvert && (capEnCours || capMsg || capTrouves)) ? feuille(h(React.Fragment, null,
    h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE, marginBottom: 10 } }, T("Lecture d'une capture", "Reading a screenshot", "Lectura de una captura", "Lettura di una schermata", "キャプチャの読み取り", "Screenshot lesen", "قراءة لقطة", "识别截图", "Een screenshot lezen", "Leitura de uma captura", "Läsning av en skärmdump", "Чтение скриншота", "Odczytywanie zrzutu ekranu", "캡처 읽기", "خواندن یک اسکرین‌شات")),
    capEnCours ? h("div", { style: { fontFamily: SANS, fontSize: 12.5, color: MUET, padding: "8px 0" } }, T("Lecture de la capture…", "Reading the screenshot…", "Leyendo la captura…", "Lettura della schermata…", "キャプチャを読み取り中…", "Screenshot wird gelesen…", "جار قراءة اللقطة…", "正在识别截图…", "Screenshot lezen…", "Lendo a captura…", "Läser skärmdumpen…", "Чтение скриншота…", "Odczytywanie zrzutu ekranu…", "캡처를 읽는 중…", "در حال خواندن اسکرین‌شات…")) : null,
    capMsg ? h("div", { style: { fontFamily: SANS, fontSize: 12, lineHeight: 1.5, color: "#E8A79F", padding: "8px 10px", borderRadius: 10, background: "rgba(122,59,52,0.18)", marginBottom: 10 } }, capMsg.texte) : null,
    capTrouves ? h(React.Fragment, null,
      h("div", { style: { fontFamily: SANS, fontSize: 11.5, color: MUET, marginBottom: 8, lineHeight: 1.5 } }, capTrouves.length + " " + T("résultat(s) trouvé(s) — vérifie puis coche ceux à ajouter.", "result(s) found — check them, then tick the ones to add.", "resultado(s) encontrado(s) — revísalos y marca los que quieras añadir.", "risultato/i trovato/i — controlla e spunta quelli da aggiungere.", "件見つかりました — 確認して追加する結果を選んでください。", "Ergebnis(se) gefunden — prüfen und die gewünschten ankreuzen.", "تم العثور على نتيجة/نتائج — تحققي ثم اختاري ما تريدين إضافته.", "条成绩已找到——请检查后勾选要添加的。", "resultaat/resultaten gevonden — controleer ze en vink de resultaten aan die je wilt toevoegen.", "resultado(s) encontrado(s) — confira e marque os que quer adicionar.", "resultat hittades – kontrollera och markera de som ska läggas till.", "результат(ов) найдено — проверь и отметь те, что нужно добавить.", "znalezionych wyników — sprawdź je, a potem zaznacz te, które chcesz dodać.", "개의 결과를 찾았어요. 확인한 뒤 추가할 것을 체크하세요.", "نتیجه پیدا شد — بررسی کن و سپس آن‌هایی را که باید اضافه شوند علامت بزن.")),
      h("div", { style: { overflowY: "auto", flex: "1 1 auto", minHeight: 0, marginBottom: 10 } }, capTrouves.map(function (rIt, iIt) {
        return h("label", { key: rIt.cle, style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 2px", borderTop: iIt ? "1px solid rgba(243,238,228,0.07)" : "none", opacity: rIt.dejaLa ? 0.55 : 1 } },
          h("input", { type: "checkbox", checked: !!rIt.coche, onChange: function () { setCapTrouves(function (li) { return (li || []).map(function (x, iX) { return iX === iIt ? Object.assign({}, x, { coche: !x.coche }) : x; }); }); }, style: { width: 18, height: 18, marginTop: 2, flexShrink: 0, accentColor: CHAMP } }),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, wordBreak: "break-word" } }, (rIt.annee ? (rIt.annee + " \u00b7 ") : "") + rIt.event),
            h("div", { style: { color: MUET, fontFamily: SANS, fontSize: 11.5, marginTop: 2 } }, [rIt.ds, libRangCap(rIt.rang)].filter(Boolean).join(" \u00b7 ") || "\u2014"),
            rIt.dejaLa ? h("div", { style: { color: "#E6CF9C", fontFamily: SANS, fontSize: 10.5, marginTop: 2, fontStyle: "italic" } }, T("Déjà dans tes résultats", "Already in your results", "Ya en tus resultados", "Già nei tuoi risultati", "既に登録済み", "Bereits in deinen Ergebnissen", "موجودة بالفعل في نتائجك", "已在你的成绩中", "Al in je resultaten", "Já está nos seus resultados", "Finns redan bland dina resultat", "Уже в твоих результатах", "Już w twoich wynikach", "이미 내 결과에 있어요", "از قبل در نتایج توست")) : null));
      })),
      h("div", { style: { display: "flex", gap: 10 } },
        h("button", { type: "button", onClick: function () { setCapTrouves(null); setCapOuvert(false); }, style: { flex: 1, minHeight: 44, borderRadius: 12, border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 13, cursor: "pointer" } }, T("Annuler l'import", "Cancel import", "Cancelar la importación", "Annulla l'importazione", "取り込みをキャンセル", "Import abbrechen", "إلغاء الاستيراد", "取消导入", "Import annuleren", "Cancelar a importação", "Avbryt importen", "Отменить импорт", "Anuluj import", "가져오기 취소", "لغو وارد کردن")),
        h("button", { type: "button", "data-perf-capture-ajouter": "1", onClick: validerCapture, style: { flex: 1, minHeight: 44, borderRadius: 12, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가", "افزودن")))) : boutonFermer(function () { setCapOuvert(false); setCapMsg(null); })), function () { if (!capEnCours) { setCapOuvert(false); setCapMsg(null); } }, "fCapture") : null;
  /* 12/11 00h05 (Blandine : « virer les trucs du haut… à cet endroit il faut les onglets des autres pages photo vidéo… ») :
     page du cavalier = petit menu vers ses autres pages ; les chiffres sont racontés plus bas dans les chapitres */
  function allerPageCav(ecr) { try { window.__photosCavaliereId = riderId; window.__videosCavaliereId = riderId; window.__actuCavaliereId = riderId; } catch (eP) { } setEcran(ecr); }
  /* 12/11 08h (Blandine : « on garde mon héros actuel ») : en mode cavalier, le héros de l ancienne page (hypeHeroSousPageCavalier) */
  var heroCav = (modeCav && typeof hypeHeroSousPageCavalier === "function") ? h(React.Fragment, null,
    (typeof HypeDrapeauLangue !== "undefined") ? h(HypeDrapeauLangue, null) : null,
    hypeHeroSousPageCavalier({ idCav: riderId, large: largeP, ordi: ordiP, retour: retour, labelRetour: T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로", "بازگشت"), libelle: T("Performances", "Performances", "Rendimiento", "Prestazioni", "成績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적", "عملکردها"), nom: nomCh, photo: ligneCh.photo_url ? photoCh : "", ecurie: (ligneCh.ecurie && ligneCh.ecurie !== "__perso__") ? ligneCh.ecurie : "" })) : null;
  var menuCav = h("div", { "data-perf-menu-cav": "1", style: { display: "flex", alignItems: "center", gap: 8, margin: "14px 0 0", padding: "0 18px 12px", borderBottom: "1px solid rgba(243,238,228,0.08)" } }, h("div", { "data-noswipe": "1", "data-hscroll": "1", style: { display: "flex", gap: 8, flex: 1, minWidth: 0, overflowX: "auto", scrollbarWidth: "none" } },
    [["perf", T("Performances", "Performances", "Rendimiento", "Prestazioni", "成績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki", "성적", "عملکردها"), null],
     ["ph", T("Photos", "Photos", "Fotos", "Foto", "写真", "Fotos", "الصور", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진", "عکس‌ها"), "photos-cavalier"],
     ["vi", T("Vidéos", "Videos", "Vídeos", "Video", "動画", "Videos", "الفيديوهات", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상", "ویدیوها"), "videos-cavalier"],
     ["ac", T("Actualité", "News", "Actualidad", "Attualità", "ニュース", "Aktuelles", "الأخبار", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식", "خبر"), "actualite-cavalier"]].map(function (o) {
      var on = !o[2];
      return h("button", { key: "mc" + o[0], type: "button", onClick: on ? undefined : function () { allerPageCav(o[2]); }, "aria-current": on ? "page" : undefined,
        style: { flex: "0 0 auto", minHeight: 34, padding: "0 14px", borderRadius: 999, border: on ? "1.5px solid " + CHAMP : "1px solid rgba(243,238,228,0.18)", background: "transparent", color: on ? IVOIRE : "rgba(243,238,228,0.78)", fontFamily: SANS, fontSize: 13, fontWeight: on ? 600 : 500, cursor: on ? "default" : "pointer", whiteSpace: "nowrap" } }, o[1]);
    })), h("button", { key: "mcPart", type: "button", onClick: partagerCav, "aria-label": T("Partager la page", "Share the page", "Compartir la página", "Condividi la pagina", "ページを共有", "Seite teilen", "مشاركة الصفحة", "分享页面", "Pagina delen", "Partilhar a página", "Dela sidan", "Поделиться страницей", "Udostępnij stronę", "페이지 공유", "اشتراک‌گذاری صفحه"),
      style: { flex: "0 0 auto", width: 38, height: 38, borderRadius: 999, border: "1px solid rgba(243,238,228,0.18)", background: "transparent", color: CHAMP, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
      h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" }))));
  var heroVide = !tous.length;   /* (g5) page sans resultat : la photo prend plus de place, comme l ecran 5 de la maquette */
  /* 11/11 21h45 (Blandine : « le héros est tout écrasé… sans résultat il est beaucoup plus grand et beaucoup plus beau ») : page du cavalier = toujours le grand héros */
  var hero = h("div", { style: { position: "relative", height: (heroVide || modeCav) ? (largeP ? 380 : 340) : (largeP ? (ordiP ? 380 : 320) : 260), overflow: "hidden", background: PETROLE, borderRadius: ordiP ? "0 0 18px 18px" : 0 } },   /* (tableau) 320 -> 260 : demande de Blandine, le hero repoussait les resultats */
    photoCh ? h("img", { src: photoCh, alt: "", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" /* 04/11 19h15 Blandine : photo du cheval ENTIÈRE */, objectPosition: "center 40%" } }) : null,
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,8,0.55) 0%, rgba(7,10,8,0.05) 30%, rgba(7,10,8,0.1) 55%, rgba(7,10,8,0.86) 82%, " + NOIR + " 100%)" } }),
    h("div", { style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 10px)", insetInlineStart: 14, insetInlineEnd: 14, display: "flex", alignItems: "center", gap: 12 } },
      h("button", { type: "button", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로", "بازگشت"), style: { width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.28)", background: "rgba(7,10,8,0.45)", color: IVOIRE, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, flex: "0 0 auto" } },
        h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M15 5l-7 7 7 7" }))),
      h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE, textShadow: "0 2px 10px rgba(0,0,0,0.6)" } }, T("Performances", "Performances", "Rendimiento", "Prestazioni", "成績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적", "عملکردها")),
      /* (g2) coeur et « ••• » de la maquette, branches sur des fonctions qui existent deja : coeur = Ajouter a mes chevaux / Retirer
         (lierCheval / delierCheval, comme la fiche ; jamais pour la proprietaire) ; ••• = petite feuille Partager / Voir sa fiche. */
      h("div", { style: { marginInlineStart: "auto", display: "flex", gap: 8 } },
        peutLier ? h("button", { type: "button", "data-perf-coeur": droits.lie ? "1" : "0", onClick: basculerLien, "aria-pressed": droits.lie ? "true" : "false", "aria-label": droits.lie ? T("Retirer de mes chevaux", "Remove from my horses", "Quitar de mis caballos", "Rimuovi dai miei cavalli", "マイ馬から外す", "Aus meinen Pferden entfernen", "إزالة من خيولي", "从我的马中移除", "Verwijderen uit mijn paarden", "Remover dos meus cavalos", "Ta bort från mina hästar", "Убрать из моих лошадей", "Usuń z moich koni", "내 말에서 빼기", "حذف از اسب‌های من") : T("Ajouter à mes chevaux", "Add to my horses", "Añadir a mis caballos", "Aggiungi ai miei cavalli", "マイ馬に追加", "Zu meinen Pferden hinzufügen", "إضافة إلى خيولي", "添加到我的马", "Toevoegen aan mijn paarden", "Adicionar aos meus cavalos", "Lägg till bland mina hästar", "Добавить к моим лошадям", "Dodaj do moich koni", "내 말에 추가", "افزودن به اسب‌هایم"), style: rondHaut },
          h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: droits.lie ? "#E6CF9C" : "none", stroke: droits.lie ? "#E6CF9C" : "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" }))) : null,
        modeCav ? h("button", { type: "button", "data-perf-partager": "1", onClick: partagerCav, "aria-label": T("Partager la page", "Share the page", "Compartir la página", "Condividi la pagina", "ページを共有", "Seite teilen", "مشاركة الصفحة", "分享页面", "Pagina delen", "Partilhar a página", "Dela sidan", "Поделиться страницей", "Udostępnij stronę", "페이지 공유", "اشتراک‌گذاری صفحه"), style: rondHaut },
          h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 3v12M7.5 7.5L12 3l4.5 4.5" }), h("path", { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" }))) : h("button", { type: "button", "data-perf-plus": "1", onClick: function () { setMenuOuvert(true); }, "aria-label": T("Plus d'options", "More options", "Más opciones", "Altre opzioni", "その他", "Weitere Optionen", "خيارات أخرى", "更多选项", "Meer opties", "Mais opções", "Fler alternativ", "Ещё варианты", "Więcej opcji", "더 보기", "گزینه‌های بیشتر"), style: rondHaut },
          h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "currentColor", "aria-hidden": "true" }, h("circle", { cx: 5.5, cy: 12, r: 1.6 }), h("circle", { cx: 12, cy: 12, r: 1.6 }), h("circle", { cx: 18.5, cy: 12, r: 1.6 }))))),
    h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 18px 14px" } },
      h("div", { style: { fontFamily: SERIF, fontSize: largeP ? 48 : 36, fontWeight: 600, color: IVOIRE, lineHeight: 1.02, textShadow: "0 2px 14px rgba(0,0,0,0.7)", overflowWrap: "anywhere" } }, nomCh),
      infos.length ? h("div", { style: { marginTop: 5, fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".16em", color: "rgba(243,238,228,0.78)" } }, infos.map(function (x) { return /\d,\d{2} m$/.test(x) ? x : String(x).toUpperCase(); }).join("  ·  ")) : null,   /* (g10) « 1,68 m » garde son m minuscule */
      teamInfo ? h("div", { style: { marginTop: 9, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(7,10,8,0.5)", color: "#E6CF9C", fontFamily: SANS, fontSize: 9.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" } },
        h("svg", { viewBox: "0 0 24 24", width: 12, height: 12, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 17h16l-1.5-9-4.5 4-2-6-2 6-4.5-4z" })),
        T("Équipe compétition", "Competition team", "Equipo de competición", "Squadra agonistica", "競技チーム", "Turnierteam", "فريق المنافسات", "比赛队", "Wedstrijdteam", "Equipe de competição", "Tävlingsteam", "Команда соревнований", "Drużyna zawodnicza", "대회 팀", "تیم مسابقه")) : null));

  /* ── video pedagogique (proprietaire seulement) ── */
  /* (g4) VIDEO PEDAGOGIQUE en petite carte horizontale, comme la maquette : miniature + bouton lecture, « Tes resultats officiels »,
     une phrase, « Masquer la video ». Toucher la miniature ouvre la video en grand par-dessus la page. Proprietaire seulement ;
     meme video et meme preference de masquage qu avant (VideoResultatsOfficiels reste inchange pour les autres pages). */
  var blocVideo = estProprio ? (videoMasquee
    ? h("div", { style: { textAlign: "center", margin: "18px 18px 0" } }, h("button", { type: "button", onClick: function () { poserVideoMasquee(false); }, style: { background: "none", border: "none", padding: "6px 10px", color: MUET2, fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, cursor: "pointer" } }, T("Revoir la petite vidéo ▸", "Watch the short video again ▸", "Volver a ver el vídeo ▸", "Rivedi il breve video ▸", "動画をもう一度見る ▸", "Das kurze Video erneut ansehen ▸", "مشاهدة الفيديو مجددا ▸", "重看小视频 ▸", "De korte video nog eens bekijken ▸", "Rever o vídeo curto ▸", "Se den korta videon igen ▸", "Посмотреть коротенькое видео ещё раз ▸", "Obejrzyj jeszcze raz krótki film ▸", "짧은 영상 다시 보기 ▸", "دیدن دوبارهٔ ویدیوی کوتاه ▸")))
    : h("div", { "data-perf-video": "1", style: { display: "flex", alignItems: "center", gap: 14, margin: "22px 18px 0", padding: 10, borderRadius: 16, border: "1px solid rgba(201,166,107,0.24)", background: "linear-gradient(165deg, " + PETROLE2 + " 0%, " + NOIR + " 100%)" } },
        h("button", { type: "button", "data-perf-video-lire": "1", onClick: function () { setVideoGrande(true); }, "aria-label": T("Lire la vidéo", "Play the video", "Ver el vídeo", "Guarda il video", "動画を再生", "Video abspielen", "تشغيل الفيديو", "观看视频", "Video afspelen", "Ver o vídeo", "Spela upp videon", "Смотреть видео", "Odtwórz film", "영상 보기", "پخش ویدیو"), style: { position: "relative", flex: "0 0 112px", height: 74, borderRadius: 11, overflow: "hidden", border: "1px solid rgba(201,166,107,0.35)", padding: 0, background: "#000", cursor: "pointer" } },
          h("img", { src: "palmares-video-2.jpg?v=1", alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
          h("span", { "aria-hidden": "true", style: { position: "absolute", left: "50%", top: "50%", width: 34, height: 34, marginLeft: -17, marginTop: -17, borderRadius: "50%", background: "rgba(7,10,8,0.6)", border: "1px solid rgba(243,238,228,0.7)", display: "flex", alignItems: "center", justifyContent: "center" } },
            h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: IVOIRE }, h("path", { d: "M8 5v14l11-7z" })))),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: IVOIRE, lineHeight: 1.15 } }, T("Tes résultats officiels", "Your official results", "Tus resultados oficiales", "I tuoi risultati ufficiali", "あなたの公式成績", "Deine offiziellen Ergebnisse", "نتائجك الرسمية", "你的官方成绩", "Je officiële resultaten", "Seus resultados oficiais", "Dina officiella resultat", "Твои официальные результаты", "Twoje oficjalne wyniki", "내 공식 결과", "نتایج رسمی تو")),
          h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 11, lineHeight: 1.45, color: MUET } }, T("Comment importer tes résultats FFE et les retrouver dans Hype.", "How to import your FFE results and find them in Hype.", "Cómo importar tus resultados FFE y encontrarlos en Hype.", "Come importare i tuoi risultati FFE e ritrovarli in Hype.", "FFE成績を取り込んでHypeで見る方法。", "So importierst du deine FFE-Ergebnisse und findest sie in Hype.", "كيف تستوردين نتائج FFE وتجدينها في Hype.", "如何导入你的 FFE 成绩并在 Hype 中找到它们。", "Hoe je je FFE-resultaten importeert en terugvindt in Hype.", "Como importar seus resultados da FFE e encontrá-los no Hype.", "Så importerar du dina FFE-resultat och hittar dem i Hype.", "Как импортировать твои результаты FFE и найти их в Hype.", "Jak zaimportować swoje wyniki FFE i znaleźć je w Hype.", "FFE 결과를 가져와서 Hype에서 다시 찾아보는 방법이에요.", "چگونه نتایج FFE خود را وارد کنی و آن‌ها را در Hype پیدا کنی.")),
          h("button", { type: "button", onClick: function () { poserVideoMasquee(true); }, style: { marginTop: 4, padding: 0, background: "none", border: "none", color: "#E6CF9C", fontFamily: SANS, fontSize: 11, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" } }, T("Masquer la vidéo", "Hide the video", "Ocultar el vídeo", "Nascondi il video", "動画を隠す", "Video ausblenden", "إخفاء الفيديو", "隐藏视频", "Video verbergen", "Ocultar o vídeo", "Dölj videon", "Скрыть видео", "Ukryj film", "영상 숨기기", "پنهان‌کردن ویدیو") + " \u02c4")))) : null;
  var videoPlein = videoGrande ? portail(h("div", { key: "vidG", onClick: function () { setVideoGrande(false); }, "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8800, background: "rgba(4,6,5,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
    h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", maxWidth: 360 } },
      h("video", { src: "palmares-video-2.mp4?v=1", poster: "palmares-video-2.jpg?v=1", autoPlay: true, controls: true, playsInline: true, "webkit-playsinline": "true", style: { width: "100%", display: "block", borderRadius: 16, background: "#000" } }),
      boutonFermer(function () { setVideoGrande(false); }))), "vidG") : null;

  /* ── boutons du bas ── */
  var boutons = (peutSaisir || peutImporter) ? h("div", { style: { display: "flex", gap: 10, margin: "26px 18px 0" } },
    peutSaisir ? boutonContour("+ " + T("Ajouter un résultat", "Add a result", "Añadir un resultado", "Aggiungi un risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가", "افزودن نتیجه"), function () { setAjoutOuvert(true); }, null, "bAj") : null,
    peutImporter ? boutonContour(T("Importer mes résultats FFE", "Import my FFE results", "Importar mis resultados FFE", "Importa i miei risultati FFE", "FFE成績を取り込む", "Meine FFE-Ergebnisse importieren", "استيراد نتائج FFE", "导入我的 FFE 成绩", "Mijn FFE-resultaten importeren", "Importar meus resultados da FFE", "Importera mina FFE-resultat", "Импортировать мои результаты FFE", "Importuj moje wyniki FFE", "내 FFE 결과 가져오기", "وارد کردن نتایج FFE من"), ouvrirImport, premiumOk ? null : ICO_CADENAS, "bImp") : null) : null;

  /* ── page vide : aucun resultat ── */
  if (!tous.length) {
    /* (g5) PAGE SANS RESULTAT d apres l ecran 5 : grande photo, trophee plein dans un cercle, titre sur deux lignes, phrase,
       deux grands boutons l un sous l autre (selon les droits reels), petite carte video. Aucun chiffre ni moment fort fictif. */
    var grandBouton = function (contenu, onClick, cle) { return h("button", { key: cle, type: "button", onClick: onClick, style: { width: "100%", minHeight: 58, padding: "0 16px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.75)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 } }, contenu); };
    return h("div", { "data-ecran": "performances-cheval", "data-perf-vide": "1", style: racineSt },
      heroCav || hero,
      modeCav ? menuCav : null,
      h("div", { style: { maxWidth: largeP ? 620 : "none", margin: "0 auto" } },   /* (g8) page sans resultat en grand : colonne centree */
      h("div", { style: { padding: "22px 26px 0", textAlign: "center" } },
        h("div", { "aria-hidden": "true", style: { width: 84, height: 84, margin: "0 auto 18px", borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", background: "radial-gradient(circle at 50% 40%, rgba(201,166,107,0.12), rgba(7,10,8,0) 70%)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 38, height: 38, fill: CHAMP, stroke: "#E6CF9C", strokeWidth: 0.8, strokeLinejoin: "round" }, h("path", { d: "M7 3.5h10v5.2a5 5 0 0 1-10 0z" }), h("path", { fill: "none", stroke: CHAMP, strokeWidth: 1.5, strokeLinecap: "round", d: "M7 5H4.5a3 3 0 0 0 3 4.2M17 5h2.5a3 3 0 0 1-3 4.2" }), h("path", { d: "M11 13.6h2v3.2h-2z" }), h("path", { d: "M8.5 17h7l.8 3.5H7.7z" }))),
        h("div", { style: { fontFamily: SERIF, fontSize: modeCav ? 25 : 31, fontWeight: 600, lineHeight: 1.15, color: IVOIRE, maxWidth: modeCav ? 320 : 215, margin: "0 auto" } }, modeCav ? (nomCh || "") + T(" n'a pas encore partagé ses résultats", " hasn't shared their results yet", " aún no ha compartido sus resultados", " non ha ancora condiviso i suoi risultati", " はまだ成績を公開していません", " hat seine Ergebnisse noch nicht geteilt", " لم يشارك نتائجه بعد", " 还没有分享成绩", " heeft zijn resultaten nog niet gedeeld", " ainda não partilhou os resultados", " har inte delat sina resultat än", " ещё не поделился результатами", " nie udostępnił jeszcze wyników", "님은 아직 성적을 공유하지 않았어요", " هنوز نتایجش را به اشتراک نگذاشته است") : T("Aucun résultat pour le moment", "No results yet", "Ningún resultado por ahora", "Ancora nessun risultato", "まだ結果はありません", "Noch keine Ergebnisse", "لا توجد نتائج بعد", "暂时没有成绩", "Nog geen resultaten", "Nenhum resultado por enquanto", "Inga resultat ännu", "Пока нет результатов", "Na razie brak wyników", "아직 결과가 없어요", "فعلاً نتیجه‌ای نیست")),
        h("div", { style: { margin: "12px auto 0", maxWidth: 320, fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: MUET } },
          (peutSaisir && modeCav) ? T("Ajoute tes résultats pour suivre ta progression, conserver ta régularité et les partager avec ta communauté.", "Add your results to follow your progress, keep track of your consistency and share them with your community.", "Añade tus resultados para seguir tu progresión, conservar tu regularidad y compartirlos con tu comunidad.", "Aggiungi i tuoi risultati per seguire i tuoi progressi, la tua regolarità e condividerli con la tua comunità.", "成績を追加して、成長と安定感を記録し、コミュニティと共有しよう。", "Füge deine Ergebnisse hinzu, um deine Entwicklung und Beständigkeit zu verfolgen und mit deiner Community zu teilen.", "أضيفي نتائجك لمتابعة تقدمك والحفاظ على انتظامك ومشاركتها مع مجتمعك.", "添加你的成绩，跟踪你的进步、保持稳定发挥，并与你的社区分享。", "Voeg je resultaten toe om je vooruitgang te volgen, je regelmaat bij te houden en ze te delen met je community.", "Adicione seus resultados para acompanhar sua evolução, manter sua regularidade e compartilhá-los com sua comunidade.", "Lägg till dina resultat för att följa din utveckling, hålla koll på din jämnhet och dela dem med din community.", "Добавь свои результаты, чтобы следить за прогрессом, сохранять стабильность и делиться ими со своим сообществом.", "Dodaj swoje wyniki, aby śledzić postępy, utrzymać regularność i dzielić się nimi ze swoją społecznością.", "결과를 추가해서 성장 과정을 확인하고, 꾸준함을 이어가고, 커뮤니티와 함께 나눠 보세요.", "نتایجت را اضافه کن تا پیشرفتت را دنبال کنی، ثباتت را حفظ کنی و آن‌ها را با جامعه‌ات به اشتراک بگذاری.")
            : peutSaisir ? T("Ajoute les résultats de " + nomCh + " pour suivre sa progression, conserver sa régularité et les partager avec ta communauté.", "Add " + nomCh + "'s results to follow their progress, keep track of their consistency and share them with your community.", "Añade los resultados de " + nomCh + " para seguir su progresión, conservar su regularidad y compartirlos con tu comunidad.", "Aggiungi i risultati di " + nomCh + " per seguirne i progressi, la regolarità e condividerli con la tua comunità.", nomCh + " の結果を追加して、成長と安定感を記録し、コミュニティと共有しよう。", "Füge die Ergebnisse von " + nomCh + " hinzu, um die Entwicklung und Beständigkeit zu verfolgen und mit deiner Community zu teilen.", "أضيفي نتائج " + nomCh + " لمتابعة تقدمه والحفاظ على انتظامه ومشاركتها مع مجتمعك.", "添加" + nomCh + "的成绩，跟踪TA的进步、保持稳定发挥，并与你的社区分享。", "Voeg de resultaten van " + nomCh + " toe om de voortgang te volgen, de regelmaat te behouden en ze met je community te delen.", "Adicione os resultados de " + nomCh + " para acompanhar a evolução, manter a regularidade e compartilhá-los com sua comunidade.", ("Lägg till resultaten för " + nomCh + " för att följa utvecklingen, hålla koll på jämnheten och dela dem med din community."), ("Добавь результаты " + nomCh + ", чтобы следить за прогрессом, сохранять стабильность и делиться ими со своим сообществом."), ("Dodaj wyniki konia " + nomCh + ", aby śledzić jego postępy, utrzymać regularność i dzielić się nimi ze swoją społecznością."), ("" + nomCh + "의 결과를 추가해서 성장 과정을 확인하고, 꾸준함을 이어가고, 커뮤니티와 함께 나눠 보세요."))
            : T("Ses premiers résultats l'attendent.", "Its first results are yet to come.", "Sus primeros resultados están por llegar.", "I suoi primi risultati sono ancora da scrivere.", "最初の結果はこれからです。", "Die ersten Ergebnisse stehen noch aus.", "نتائجه الأولى بانتظاره.", "它的第一批成绩正等着呢。", "Zijn eerste resultaten laten nog op zich wachten.", "Os primeiros resultados ainda estão por vir.", "Dess första resultat väntar på sin tur.", "Её первые результаты ещё впереди.", "Jego pierwsze wyniki jeszcze przed nim.", "첫 번째 결과가 기다리고 있어요.", "نخستین نتایجش در انتظارش هستند."))),
      (peutSaisir || peutImporter) ? h("div", { "data-perf-vide-actions": "1", style: { display: "flex", flexDirection: "column", gap: 12, margin: "24px 22px 0" } },
        peutSaisir ? grandBouton([h("span", { key: "p", "aria-hidden": "true", style: { fontFamily: SERIF, fontSize: 24, lineHeight: 1, color: CHAMP } }, "+"), h("span", { key: "t" }, T("Ajouter un résultat", "Add a result", "Añadir un resultado", "Aggiungi un risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가", "افزودن نتیجه"))], function () { setAjoutOuvert(true); }, "vAj") : null,
        peutImporter ? grandBouton([premiumOk ? null : h("span", { key: "c", style: { display: "inline-flex" } }, ICO_CADENAS), h("span", { key: "t", style: { textAlign: "start" } }, h("span", { style: { display: "block" } }, T("Importer mes résultats FFE", "Import my FFE results", "Importar mis resultados FFE", "Importa i miei risultati FFE", "FFE成績を取り込む", "Meine FFE-Ergebnisse importieren", "استيراد نتائج FFE", "导入我的 FFE 成绩", "Mijn FFE-resultaten importeren", "Importar meus resultados da FFE", "Importera mina FFE-resultat", "Импортировать мои результаты FFE", "Importuj moje wyniki FFE", "내 FFE 결과 가져오기", "وارد کردن نتایج FFE من")), premiumOk ? null : h("span", { style: { display: "block", marginTop: 2, fontSize: 10.5, fontWeight: 500, color: MUET2 } }, "Premium"))], ouvrirImport, "vImp") : null) : null,
      outilCapture,
      /* 12/11 00h20 (Blandine) : la petite carte vidéo « Importer tes résultats FFE » de l ancienne page Résultats est gardée */
      (modeCav && peutImporter) ? h("button", { type: "button", "data-perf-video-import": "1", onClick: function () { try { window.__hypeVoirVideoImport = true; } catch (eW) { } ouvrirImport(); },   /* 12/11 00h20 (Blandine : « tellement petite qu'on n'arrive plus à la voir ») : en grand, image entière */
        style: { display: "flex", alignItems: "center", width: "calc(100% - 44px)", margin: "22px 22px 0", padding: 0, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(201,166,107,0.35)", background: "#0B0F13", color: IVOIRE, textAlign: "start", cursor: "pointer" } },
        h("span", { style: { position: "relative", display: "block", flex: "0 0 44%" } },
          h("img", { src: "palmares-video-2.jpg?v=1", alt: "", loading: "lazy", style: { display: "block", width: "100%", height: "auto" } }),
          h("span", { "aria-hidden": "true", style: { position: "absolute", left: "50%", top: "50%", width: 42, height: 42, marginLeft: -21, marginTop: -21, borderRadius: "50%", border: "1.5px solid " + CHAMP, background: "rgba(7,10,8,0.55)", display: "flex", alignItems: "center", justifyContent: "center" } },
            h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: IVOIRE }, h("path", { d: "M9 6.5v11l9-5.5z" })))),
        h("span", { style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" } },
          h("span", { style: { flex: 1, minWidth: 0 } },
            h("span", { style: { display: "block", fontFamily: SERIF, fontSize: 18, fontWeight: 500, lineHeight: 1.15 } }, T("Importer tes résultats FFE", "Import your FFE results", "Importar tus resultados FFE", "Importa i tuoi risultati FFE", "FFEの成績をインポート", "Deine FFE-Ergebnisse importieren", "استيراد نتائجك من FFE", "导入你的FFE成绩", "Je FFE-resultaten importeren", "Importar os teus resultados FFE", "Importera dina FFE-resultat", "Импортировать результаты FFE", "Zaimportuj wyniki FFE", "FFE 성적 가져오기", "نتایج FFE خودت را وارد کن")),
            h("span", { style: { display: "block", marginTop: 3, fontFamily: SANS, fontSize: 12.5, color: MUET } }, T("Voir comment faire, en vidéo", "See how, in a video", "Ver cómo hacerlo, en vídeo", "Guarda come fare, in video", "やり方を動画で見る", "So geht's, im Video", "شاهد الطريقة بالفيديو", "看视频了解操作", "Bekijk hoe, in een video", "Ver como fazer, em vídeo", "Se hur, i en video", "Как это сделать — в видео", "Zobacz, jak to zrobić, na filmie", "영상으로 방법 보기", "دیدن روش کار، در ویدیو"))),
          h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 20 } }, rtl ? "‹" : "›"))) : null,
      /* 12/11 00h20 (Blandine : « un petit onglet sympa… il invite à le faire ») : visiteur d une page vide */
      (modeCav && !estProprio) ? h("div", { "data-perf-invite": "1", style: { position: "relative", overflow: "hidden", margin: "26px 22px 0", borderRadius: 18, border: "1px solid rgba(201,166,107,0.35)", background: "#0B0F13" } },
        h("img", { src: "images/concours-hero-bai-tresse.webp", alt: "", loading: "lazy", style: { display: "block", width: "100%", height: "auto", opacity: 0.85 } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,15,19,0) 25%, rgba(11,15,19,0.92) 70%, #0B0F13 100%)" } }),
        h("div", { style: { position: "absolute", left: 18, right: 18, bottom: 16 } },
          h("div", { style: { fontFamily: SERIF, fontSize: 24, fontWeight: 500, lineHeight: 1.15, color: IVOIRE } }, (nomCh || "") + T(" n'a pas encore partagé ses résultats.", " hasn't shared any results yet.", " aún no ha compartido sus resultados.", " non ha ancora condiviso i suoi risultati.", " はまだ成績を公開していません。", " hat noch keine Ergebnisse geteilt.", " لم يشارك نتائجه بعد.", " 还没有分享成绩。", " heeft nog geen resultaten gedeeld.", " ainda não partilhou os seus resultados.", " har inte delat några resultat än.", " ещё не поделился результатами.", " nie udostępnił jeszcze wyników.", "님은 아직 성적을 공유하지 않았어요.", " هنوز نتایجش را به اشتراک نگذاشته است.")),
          h("div", { style: { marginTop: 6, fontFamily: SANS, fontSize: 12.5, lineHeight: 1.5, color: MUET } }, T("Invite-le à les ajouter : en deux minutes, ses concours s'afficheront ici.", "Invite them to add them: in two minutes, their shows will appear here.", "Invítalo a añadirlos: en dos minutos, sus concursos aparecerán aquí.", "Invitalo ad aggiungerli: in due minuti i suoi concorsi appariranno qui.", "追加するよう誘ってみよう。2分で大会がここに表示されます。", "Lade ihn ein, sie hinzuzufügen: in zwei Minuten erscheinen seine Turniere hier.", "ادعه لإضافتها: خلال دقيقتين ستظهر مسابقاته هنا.", "邀请TA添加吧：两分钟后，TA的比赛就会显示在这里。", "Nodig hem uit ze toe te voegen: binnen twee minuten staan zijn wedstrijden hier.", "Convida-o a adicioná-los: em dois minutos, os concursos aparecem aqui.", "Bjud in hen att lägga till dem: på två minuter syns tävlingarna här.", "Пригласи его добавить их: через две минуты старты появятся здесь.", "Zaproś go do ich dodania: w dwie minuty zawody pojawią się tutaj.", "추가하도록 초대해 보세요. 2분이면 대회가 여기에 표시돼요.", "دعوتش کن آن‌ها را اضافه کند: در دو دقیقه، مسابقاتش اینجا نمایش داده می‌شوند.")),
          h("button", { type: "button", onClick: inviterCav, style: { marginTop: 12, minHeight: 44, padding: "0 20px", borderRadius: 999, border: "1.5px solid " + CHAMP, background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 14, fontWeight: 600, cursor: "pointer" } }, T("L'inviter", "Invite", "Invitarlo", "Invitalo", "誘う", "Einladen", "دعوته", "邀请", "Uitnodigen", "Convidar", "Bjud in", "Пригласить", "Zaproś", "초대하기", "دعوتش کن")))) : null,
      modeCav ? null : blocVideo),   /* 12/11 : page du cavalier vide = la grande carte vidéo au-dessus, pas de doublon */
      (estProprio && nbMasques) ? h("div", { style: { textAlign: "center", margin: "18px 18px 0" } }, h("button", { type: "button", onClick: function () { setVoirMasques(!voirMasques); }, style: { background: "none", border: "none", color: MUET2, fontFamily: SANS, fontSize: 11.5, cursor: "pointer" } }, libMasques())) : null,
      typeof FinPageHype === "function" ? h(FinPageHype, { key: "finPerfVide" }) : null,
      (modeCav && ajoutOuvert && typeof HypeAjoutResultatCavaliere === "function") ? h(HypeAjoutResultatCavaliere, { onFermer: function () { setAjoutOuvert(false); }, onAjoute: function (av) { setRelireCav(function (n) { return n + 1; }); if (av) { try { window.alert(av === "nom" ? "R\u00e9sultat enregistr\u00e9. Il n'appara\u00eetra ici qu'une fois ton nom FFE reli\u00e9 (Mon compte \u2192 \u00ab Mes r\u00e9sultats de concours \u00bb)." : "R\u00e9sultat enregistr\u00e9, mais pas encore rattach\u00e9 \u00e0 ton compte : " + av); } catch (eAl) { } } } })   /* (g9) mode cavalier : le formulaire historique de la page cavaliere (memes messages) */
      : ajoutOuvert && typeof FeuilleAjoutResultatV2 === "function" ? portail(h(FeuilleAjoutResultatV2, { cheval: chV, moi: moi, lignes: lignes || [], nomDefaut: (app.profil && [app.profil.prenom, app.profil.nom].filter(Boolean).join(" ")) || "", T: T, onFermer: function () { setAjoutOuvert(false); }, onEnregistre: function () { setAjoutOuvert(false); setRelire(function (n) { return n + 1; }); annonce(T("Résultat ajouté 🏆", "Result added 🏆", "Resultado añadido 🏆", "Risultato aggiunto 🏆", "結果を追加しました 🏆", "Ergebnis hinzugefügt 🏆", "تمت إضافة النتيجة 🏆", "成绩已添加 🏆", "Resultaat toegevoegd 🏆", "Resultado adicionado 🏆", "Resultat tillagt 🏆", "Результат добавлен 🏆", "Wynik dodany 🏆", "결과를 추가했어요 🏆", "نتیجه افزوده شد 🏆")); } }), "fAjout") : null,
      videoPlein,
      feuilleCapture,
      ligneEdit && typeof FeuilleAjoutResultatV2 === "function" ? portail(h(FeuilleAjoutResultatV2, { cheval: modeCav ? { dbId: ligneEdit.cheval_id, nom: ligneEdit.cavalier || "" } : chV, moi: moi, lignes: lignes || [], ligneEdition: ligneEdit, nomDefaut: "", T: T, onFermer: function () { setLigneEdit(null); }, onEnregistre: function () { setLigneEdit(null); setRelire(function (n) { return n + 1; }); annonce(T("Résultat modifié ✓", "Result updated ✓", "Resultado modificado ✓", "Risultato modificato ✓", "結果を更新しました ✓", "Ergebnis geändert ✓", "تم تعديل النتيجة ✓", "成绩已修改 ✓", "Resultaat gewijzigd ✓", "Resultado atualizado ✓", "Resultat ändrat ✓", "Результат изменён ✓", "Wynik zmieniony ✓", "결과를 수정했어요 ✓", "نتیجه ویرایش شد ✓")); } }), "fModif") : null,
            fortGere ? feuille(h(React.Fragment, null,
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE } }, rangTxt(fortGere.f.pl) + (fortGere.f.part ? " / " + fortGere.f.part : "")),
        h("div", { style: { marginTop: 2, marginBottom: 14, fontFamily: SANS, fontSize: 12, color: MUET } }, [fortGere.f.ep, String(fortGere.f.nom || "").replace(/^\s*CSO\s+/i, "")].filter(Boolean).join(" \u2022 ")),
        fortGere.peutPhoto ? h("button", { type: "button", "data-perf-fort-photo": "1", onClick: function () { var fx = fortGere.f; setFortGere(null); setMediasTous(null); setPickerJeton(fx.jeton); }, style: { width: "100%", minHeight: 46, marginBottom: 8, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Changer la photo", "Change the photo", "Cambiar la foto", "Cambia la foto", "写真を変更", "Foto ändern", "تغيير الصورة", "更换照片", "Foto wijzigen", "Trocar a foto", "Byt foto", "Сменить фото", "Zmień zdjęcie", "사진 변경", "تغییر عکس")) : null,
        fortGere.peutRetirer ? h("button", { type: "button", "data-perf-fort-retirer": "1", onClick: function () { var fx = fortGere.f, ffx = fortGere.ff; setFortGere(null); poserFort(fx, ffx ? { fort_force: false } : { fort_exclu: true }); }, style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Retirer des moments forts", "Remove from highlights", "Quitar de los momentos", "Rimuovi dai momenti forti", "ハイライトから外す", "Aus den Highlights entfernen", "إزالة من اللحظات البارزة", "从精彩时刻中移除", "Verwijderen uit de hoogtepunten", "Remover dos momentos marcantes", "Ta bort från höjdpunkterna", "Убрать из ярких моментов", "Usuń z najważniejszych momentów", "하이라이트에서 빼기", "حذف از لحظه‌های مهم")) : null,
        h("div", { style: { marginTop: 8, fontFamily: SANS, fontSize: 11, color: MUET2, textAlign: "center" } }, T("Le résultat reste dans ses saisons.", "The result stays in its seasons.", "El resultado sigue en sus temporadas.", "Il risultato resta nelle sue stagioni.", "成績はシーズン一覧に残ります。", "Das Ergebnis bleibt in seinen Saisons.", "تبقى النتيجة في مواسمها.", "这条成绩仍保留在它的赛季里。", "Het resultaat blijft in zijn seizoenen staan.", "O resultado continua nas temporadas.", "Resultatet finns kvar i sina säsonger.", "Результат остаётся в своих сезонах.", "Wynik zostaje w jego sezonach.", "결과는 해당 시즌에 그대로 남아요.", "نتیجه در فصل‌هایش باقی می‌ماند.")),
        boutonFermer(function () { setFortGere(null); })), function () { setFortGere(null); }, "fFort") : null,
      menuOuvert ? feuille(h(React.Fragment, null,
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE, marginBottom: 12 } }, nomCh),
        h("button", { type: "button", "data-perf-partager": "1", onClick: partagerCheval, style: { width: "100%", minHeight: 46, marginBottom: 8, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Partager", "Share", "Compartir", "Condividi", "共有", "Teilen", "مشاركة", "分享", "Delen", "Compartilhar", "Dela", "Поделиться", "Udostępnij", "공유하기", "اشتراک‌گذاری")),
        h("button", { type: "button", onClick: function () { setMenuOuvert(false); try { window.__chevalOuvert = id; } catch (eO) { } setEcran("cheval"); }, style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Voir sa fiche", "View profile", "Ver su ficha", "Vedi la scheda", "プロフィールを見る", "Steckbrief ansehen", "عرض بطاقته", "查看它的档案", "Profiel bekijken", "Ver a ficha", "Se profilen", "Смотреть карточку", "Zobacz jego kartę", "프로필 보기", "دیدن برگه‌اش")),
        boutonFermer(function () { setMenuOuvert(false); })), function () { setMenuOuvert(false); }, "fMenu") : null,
      toast ? portail(h("div", { style: { position: "fixed", left: 16, right: 16, bottom: "calc(24px + env(safe-area-inset-bottom))", zIndex: 9000, padding: "12px 16px", borderRadius: 14, background: "rgba(16,26,29,0.96)", border: "1px solid " + FILET, color: IVOIRE, fontFamily: SANS, fontSize: 13, textAlign: "center" } }, toast), "fToast") : null);
  }

  /* ── page avec resultats ── */
  function ico(d) { return h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: CHAMP, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d); }
  var ICO_SORTIES = ico([h("path", { key: "a", d: "M5 21V4" }), h("path", { key: "b", d: "M5 4h11l-2 4 2 4H5" })]);
  var ICO_VICT = ico(h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }));
  var ICO_POD = ico([h("path", { key: "a", d: "M9 21V10h6v11" }), h("path", { key: "b", d: "M3 21v-6h6M15 21v-8h6v8M2 21h20" })]);
  var ICO_CLASSE = ico([h("circle", { key: "a", cx: 12, cy: 9, r: 5 }), h("path", { key: "b", d: "M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" })]);
  var ICO_PTS = ico(h("path", { d: "M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" }));
  var libSaisonCour = (saisonCour != null) ? (saisonCour + "-" + String(saisonCour + 1).slice(2)) : "";
  var chiffres = [
    [stats.sorties, T("sorties", "outings", "salidas", "uscite", "出場", "Starts", "مشاركات", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전", "حضور"), ICO_SORTIES],
    [stats.victoires, T("victoires", "wins", "victorias", "vittorie", "優勝", "Siege", "انتصارات", "冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstwa", "우승", "پیروزی"), ICO_VICT],
    [stats.podiums, T("podiums", "podiums", "podios", "podi", "表彰台", "Podien", "منصات", "领奖台", "podiumplaatsen", "pódios", "prispallsplaceringar", "пьедесталов", "podia", "시상대", "سکو"), ICO_POD],
    [stats.classes, T("classés", "placings", "clasificados", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "获得名次", "geplaatst", "classificados", "placerade", "призовых мест", "w czołówce", "입상", "رتبه‌دار"), ICO_CLASSE],
    [avecPtsCour ? ptsCour : "—", T("pts ", "pts ", "pts ", "pti ", "pts ", "Pkt. ", "نقاط ", "分 ", "ptn ", "pts ", "p ", "очк. ", "pkt ", "점 ", "امتیاز ") + libSaisonCour, ICO_PTS]
  ];
  /* couleurs de la barre de repartition (aucun cyan) : 1re champagne, 2e ivoire, 3e bronze, autres places, eliminations / abandons */
  var COUL_BARRE = { p1: "#C9A66B", p2: "rgba(243,238,228,0.75)", p3: "#A9713C", autres: "rgba(243,238,228,0.2)", elab: "#7A3B34" };
  function barre(fs) {
    var n1 = 0, n2 = 0, n3 = 0, nA = 0, nE = 0;
    fs.forEach(function (f) { if (f.pl === 1) n1++; else if (f.pl === 2) n2++; else if (f.pl === 3) n3++; else if (f.pl != null) nA++; else if (f.statut === "el" || f.statut === "ab") nE++; });
    var segs = [[n1, COUL_BARRE.p1], [n2, COUL_BARRE.p2], [n3, COUL_BARRE.p3], [nA, COUL_BARRE.autres], [nE, COUL_BARRE.elab]];
    return h("div", { "aria-hidden": "true", style: { display: "flex", gap: 2, height: 8, marginTop: 10 } },
      segs.map(function (sg, i) { return sg[0] ? h("div", { key: "sg" + i, style: { flex: sg[0], minWidth: 6, borderRadius: 2, background: sg[1] } }) : null; }));
  }
  var arr = function (x) { return Math.round(x * 100) / 100; };
  var FILTRES_SEC = [["tous", T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체", "همه")], ["classes", T("Classés", "Placed", "Clasificados", "Piazzati", "入賞", "Platziert", "المصنفون", "获得名次", "Geplaatst", "Classificados", "Placerade", "Призёры", "Sklasyfikowane", "입상", "رتبه‌دار")], ["podiums", T("Podiums", "Podiums", "Podios", "Podi", "表彰台", "Podien", "منصات", "领奖台", "Podiums", "Pódios", "Prispallsplaceringar", "Пьедесталы", "Podia", "시상대", "سکوها")]];
  if (estProprio) FILTRES_SEC.push(["sf", T("Sans faute", "Clear round", "Sin faltas", "Netto", "クリア", "Fehlerfrei", "بلا أخطاء", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bez błędu", "무실수", "بدون خطا")]);
  /* filtres secondaires = ceux de l ancien palmares (menu d affichage) : Classes = premier quart (preparatoire : victoire seule),
     Podiums = 3 premiers (preparatoire : victoire seule), Sans faute = mention du telemat (proprietaire). Ils ne touchent pas aux chiffres. */
  /* 12/11 14h25 (Blandine) : « classé » = premier quart des partants (place ≤ partants ÷ 4, arrondi au-dessus) ; la colonne
     quart du fichier FFE ne sert que si le nombre de partants manque. Les points restent ceux écrits par la FFE (dégressifs). */
  /* 13/11 00h25 (Blandine) : hauteur d'une épreuve, lue dans son nom. 1) hauteur écrite : « (0,90 m) », « 1m05 », « 85 cm » ;
   2) anciennes catégories (tableau de Blandine) : B1 1,35 · B2 = C1 1,25 · C2 = D1 1,15 · C3 = D2 1,05 ; l'indice 4 (venu plus tard) :
   10 cm sous l'indice 3 (Blandine pas sûre : même hauteur ou 10 cm de moins — on prend le plus bas pour ne jamais surestimer) ;
   3) catégories actuelles : tableau officiel FFE (règlement CSO 2026, art. 6.3). Inconnue -> null. */
function hauteurEp(ep) {
  var t = String(ep || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  var m = /(\d)[,.](\d{2})\s*m\b/.exec(t); if (m) return Number(m[1]) + Number(m[2]) / 100;
  m = /\b(\d)\s*m\s*(\d{2})\b/.exec(t); if (m) return Number(m[1]) + Number(m[2]) / 100;
  m = /\b(\d{2,3})\s*cm\b/.exec(t); if (m) return Number(m[1]) / 100;
  m = /(?:^|[^a-z])([bcd])([1-4])(?![0-9])/.exec(t);
  if (m) { var base = { b: 1.45, c: 1.35, d: 1.25 }[m[1]]; return Math.round((base - 0.10 * Number(m[2])) * 100) / 100; }
  var niv = function (re) { var x = re.exec(t); return x ? (/elite/.test(x[1]) ? "e" : x[1]) : null; };
  var n;
  if ((n = niv(/as\s*poney\s*(elite|[12])/))) return { e: 1.25, "1": 1.20, "2": 1.10 }[n];
  if ((n = niv(/\bpro\s*(elite|[1-3])/))) return { e: 1.50, "1": 1.40, "2": 1.30, "3": 1.20 }[n];
  if ((n = niv(/(?:amateur|enseignant)\s*(elite|[1-3])/))) return { e: 1.25, "1": 1.15, "2": 1.05, "3": 0.95 }[n];
  if ((n = niv(/(?:club|poney)\s*(elite|[1-4])/))) return { e: 1.00, "1": 0.90, "2": 0.80, "3": 0.70, "4": 0.60 }[n];
  return null;
}
function estClasseQ(f) {
    if (!f || f.pl == null) return false;
    if (hypePerfEstPrepa(f.ep)) return f.pl === 1;
    if (f.part) return f.pl <= Math.ceil(f.part / 4);
    return f.q === 1;
  }
  function filtrer(fs, cle) {
    if (cle === "classes") return fs.filter(estClasseQ);
    if (cle === "podiums") return fs.filter(function (f) { return f.pl != null && (hypePerfEstPrepa(f.ep) ? f.pl === 1 : f.pl <= 3); });
    if (cle === "sf") return fs.filter(hypePerfEstSansFaute);
    return fs;
  }
  function corpsSaison(sx) {
    var fs = sx.lignes;
    var st = hypePerfStatsHisto(fs);
    var pl = fs.filter(function (f) { return f.pl != null; });
    var parFam = {}, nbFam = {}, total = 0, avecP = 0;
    pl.forEach(function (f) { if (f.pts == null || isNaN(f.pts)) return; var k = hypePerfFamille(f.ep); parFam[k] = (parFam[k] || 0) + f.pts; nbFam[k] = (nbFam[k] || 0) + 1; total += f.pts; avecP++; });
    var fams = Object.keys(parFam).sort(function (a, b) { return (parFam[b] - parFam[a]) || (nbFam[b] - nbFam[a]); });
    var maxF = fams.length ? Math.max.apply(null, fams.map(function (k) { return parFam[k]; })) : 0;
    var sansP = pl.length - avecP;
    var cleF = filtres[sx.cle] || vueDefaut || "tous"; if (cleF === "sf" && !estProprio) cleF = "tous";
    var fsAff = montreMasques ? fs : fs.filter(function (f) { return !f.masque; });   /* (g11) liste affichee : sans les lignes masquees */
    var liste = filtrer(fsAff, cleF).slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); });
    var nbF = {}; FILTRES_SEC.forEach(function (fx) { nbF[fx[0]] = filtrer(montreMasques ? fs : fs.filter(function (f) { return !f.masque; }), fx[0]).length; });
    var titreSec = function (txt, extra) { return h("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, h("div", { style: { fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: IVOIRE, lineHeight: 1.1 } }, txt), extra || null); };
    /* (g1) l INTERIEUR D UNE SAISON reprend l ecran 2 de la maquette (Details de la saison) : plus de chiffres repetes, titre serif,
       barres epaisses + encadre « Total saison » a droite, « Tous les resultats » avec les filtres et leurs nombres. Calculs inchanges. */
    var infoPts = h("button", { type: "button", "aria-label": T("À propos des points", "About the points", "Sobre los puntos", "Informazioni sui punti", "ポイントについて", "Zu den Punkten", "حول النقاط", "关于积分", "Over de punten", "Sobre os pontos", "Om poängen", "Об очках", "O punktach", "점수 안내", "دربارهٔ امتیازها"), onClick: function () { annonce(T("Points FFE enregistrés avec chaque résultat (télémat), jamais recalculés ici.", "FFE points recorded with each result, never recalculated here.", "Puntos FFE registrados con cada resultado, nunca recalculados aquí.", "Punti FFE registrati con ogni risultato, mai ricalcolati qui.", "各成績に記録されたFFEポイントで、ここでは再計算しません。", "Mit jedem Ergebnis gespeicherte FFE-Punkte, hier nie neu berechnet.", "نقاط FFE مسجلة مع كل نتيجة، ولا يعاد حسابها هنا.", "FFE 积分随每条成绩一起记录（télémat），这里绝不会重新计算。", "FFE-punten zoals ze bij elk resultaat zijn geregistreerd (télémat), hier nooit opnieuw berekend.", "Pontos da FFE registrados com cada resultado (télémat), nunca recalculados aqui.", "FFE-poäng som sparas med varje resultat (télémat), de räknas aldrig om här.", "Очки FFE записываются вместе с каждым результатом (télémat) и здесь никогда не пересчитываются.", "Punkty FFE zapisane przy każdym wyniku (télémat), nigdy nie są tu przeliczane.", "FFE 점수는 각 결과(télémat)와 함께 저장되며, 여기서 다시 계산하지 않아요.", "امتیازهای FFE همراه هر نتیجه ثبت شده‌اند (télémat) و هرگز اینجا دوباره محاسبه نمی‌شوند.")); }, style: { width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.7)", background: "transparent", color: "#E6CF9C", fontFamily: SERIF, fontSize: 13, fontWeight: 700, fontStyle: "italic", lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer", flex: "0 0 auto" } }, "i");
    return h("div", { "data-perf-corps": sx.cle, style: { marginTop: 14, paddingTop: 16, borderTop: "1px solid rgba(243,238,228,0.07)" } },
      h("div", { "data-perf-points": sx.cle },
        titreSec(T("Points de qualification", "Qualification points", "Puntos de calificación", "Punti di qualifica", "資格ポイント", "Qualifikationspunkte", "نقاط التأهل", "资格积分", "Kwalificatiepunten", "Pontos de qualificação", "Kvalificeringspoäng", "Квалификационные очки", "Punkty kwalifikacyjne", "자격 점수", "امتیاز صلاحیت"), infoPts),
        avecP ? h("div", { style: { display: "flex", alignItems: "stretch", gap: 12, marginTop: 12 } },
          h("div", { style: { flex: 1, minWidth: 0 } }, fams.map(function (k) {
            var pc = maxF > 0 ? Math.max(5, Math.round(parFam[k] / maxF * 100)) : 0;
            return h("div", { key: "fm" + k, "data-perf-fam": k, style: { display: "flex", alignItems: "center", gap: 8, padding: "4px 0" } },
              h("div", { style: { flex: "0 0 74px", minWidth: 0 } },
                h("div", { style: { fontFamily: SANS, fontSize: 12.5, fontWeight: 500, color: IVOIRE, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, k),
                h("div", { style: { fontFamily: SANS, fontSize: 8.5, color: MUET2, lineHeight: 1.2 } }, nbFam[k] + " " + (nbFam[k] > 1 ? T("épreuves", "classes", "pruebas", "prove", "競技", "Prüfungen", "مسابقات", "比赛项目", "klassen", "provas", "klasser", "маршрутов", "konkurencje", "경기", "رده") : T("épreuve", "class", "prueba", "prova", "競技", "Prüfung", "مسابقة", "比赛项目", "klasse", "prova", "klass", "маршрут", "konkurencja", "경기", "رده")))),
              h("div", { style: { flex: 1, height: 8, borderRadius: 4, background: "rgba(243,238,228,0.09)", overflow: "hidden" } }, h("div", { style: { width: pc + "%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #F0D7A4, #C9A66B)" } })),
              h("div", { style: { flex: "0 0 auto", minWidth: 44, textAlign: "end", fontFamily: SANS, fontSize: 12, fontWeight: 500, color: IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, arr(parFam[k]) + " pts"));
          })),
          h("div", { "data-perf-total": sx.cle, style: { flex: "0 0 92px", alignSelf: "center", padding: "14px 6px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.32)", background: "rgba(16,26,29,0.6)", textAlign: "center" } },
            h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET } }, T("Total saison", "Season total", "Total temporada", "Totale stagione", "シーズン合計", "Saison gesamt", "مجموع الموسم", "赛季总计", "Totaal seizoen", "Total da temporada", "Totalt för säsongen", "Итого за сезон", "Suma za sezon", "시즌 합계", "مجموع فصل")),
            h("div", { style: { marginTop: 4, fontFamily: SERIF, fontSize: 28, fontWeight: 600, color: "#E6CF9C", lineHeight: 1, direction: "ltr", unicodeBidi: "isolate" } }, String(arr(total))),
            h("div", { style: { marginTop: 2, fontFamily: SANS, fontSize: 11.5, color: "#E6CF9C" } }, T("points", "points", "puntos", "punti", "ポイント", "Punkte", "نقاط", "分", "punten", "pontos", "poäng", "очков", "punkty", "점", "امتیاز")))) :
          h("div", { style: { marginTop: 8, fontFamily: SANS, fontSize: 12, color: MUET } }, T("Aucun point connu sur cette saison.", "No known points this season.", "Ningún punto conocido esta temporada.", "Nessun punto noto in questa stagione.", "このシーズンの判明ポイントはありません。", "Keine bekannten Punkte in dieser Saison.", "لا توجد نقاط معروفة في هذا الموسم.", "这个赛季没有已知积分。", "Geen bekende punten in dit seizoen.", "Nenhum ponto conhecido nesta temporada.", "Inga kända poäng den här säsongen.", "За этот сезон нет известных очков.", "Brak znanych punktów w tym sezonie.", "이번 시즌에 확인된 점수가 없어요.", "در این فصل هیچ امتیاز مشخصی نیست.")),
        sansP > 0 ? h("div", { style: { marginTop: 10, display: "flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 11.5, color: MUET } },
          h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: CHAMP, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" })),
          sansP + " " + (sansP > 1 ? T("résultats sans points connus", "results with no known points", "resultados sin puntos conocidos", "risultati senza punti noti", "件はポイント不明", "Ergebnisse ohne bekannte Punkte", "نتائج بلا نقاط معروفة", "条成绩暂无已知积分", "resultaten zonder bekende punten", "resultados sem pontos conhecidos", "resultat utan kända poäng", "результатов без известных очков", "wyników bez znanych punktów", "점수를 알 수 없는 결과", "نتیجه بدون امتیاز مشخص") : T("résultat sans points connus", "result with no known points", "resultado sin puntos conocidos", "risultato senza punti noti", "件はポイント不明", "Ergebnis ohne bekannte Punkte", "نتيجة بلا نقاط معروفة", "条成绩暂无已知积分", "resultaat zonder bekende punten", "resultado sem pontos conhecidos", "resultat utan kända poäng", "результат без известных очков", "wynik bez znanych punktów", "점수를 알 수 없는 결과", "نتیجه بدون امتیاز مشخص"))) : null),
      h("div", { style: { height: 1, background: "rgba(243,238,228,0.07)", margin: "18px 0 16px" } }),
      titreSec(T("Tous les résultats", "All results", "Todos los resultados", "Tutti i risultati", "すべての成績", "Alle Ergebnisse", "كل النتائج", "所有成绩", "Alle resultaten", "Todos os resultados", "Alla resultat", "Все результаты", "Wszystkie wyniki", "모든 결과", "همهٔ نتایج")),
      h("div", { style: { display: "flex", gap: 6, marginTop: 12, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: 2 } },
        FILTRES_SEC.filter(function (fx) { return !modeCav || fx[0] === "tous" || fx[0] === cleF || nbF[fx[0]]; }).map(function (fx) {   /* 12/11 16h30 : pas de pastille « Classés (0) » */
          var on = cleF === fx[0];
          return h("button", { key: "f" + sx.cle + fx[0], type: "button", onClick: function () { var n = Object.assign({}, filtres); n[sx.cle] = fx[0]; setFiltres(n); try { if (typeof hypeVueResPoser === "function") hypeVueResPoser(fx[0]); } catch (eVp) { } }, style: { flex: "0 0 auto", minHeight: 32, padding: "0 9px", borderRadius: 10, border: (on ? "1.5px solid #C9A66B" : "1px solid rgba(243,238,228,0.14)"), background: "transparent", color: on ? "#F3EEE4" : "rgba(243,238,228,0.82)", fontFamily: SANS, fontSize: 10.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" } }, fx[1] + " (" + nbF[fx[0]] + ")");
        })),
      liste.length ? h("div", { "data-perf-liste": sx.cle, style: { marginTop: 6 } }, liste.map(ligneResultat)) : h("div", { style: { padding: "14px 0", fontFamily: SANS, fontSize: 12, color: MUET, textAlign: "center" } }, T("Aucun résultat pour ce filtre.", "No result for this filter.", "Ningún resultado con este filtro.", "Nessun risultato per questo filtro.", "この条件の成績はありません。", "Kein Ergebnis für diesen Filter.", "لا توجد نتيجة لهذا الفلتر.", "这个筛选条件下没有成绩。", "Geen resultaat voor dit filter.", "Nenhum resultado para este filtro.", "Inga resultat för det här filtret.", "Нет результатов для этого фильтра.", "Brak wyników dla tego filtra.", "이 필터에 맞는 결과가 없어요.", "هیچ نتیجه‌ای برای این فیلتر نیست.")));
  }
  function ligneSaison(sx) {
    var st = hypePerfStatsHisto(sx.lignes);
    var ouverte = !!ouv[sx.cle];
    var resume = [st.sorties + " " + (st.sorties > 1 ? T("sorties", "outings", "salidas", "uscite", "出場", "Starts", "مشاركات", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전", "حضور") : T("sortie", "outing", "salida", "uscita", "出場", "Start", "مشاركة", "次出赛", "start", "saída", "start", "старт", "start", "출전", "شرکت")),
      st.victoires + " " + (st.victoires > 1 ? T("victoires", "wins", "victorias", "vittorie", "優勝", "Siege", "انتصارات", "冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstwa", "우승", "پیروزی") : T("victoire", "win", "victoria", "vittoria", "優勝", "Sieg", "انتصار", "冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "우승", "پیروزی")),
      st.podiums + " " + (st.podiums > 1 ? T("podiums", "podiums", "podios", "podi", "表彰台", "Podien", "منصات", "领奖台", "podiumplaatsen", "pódios", "prispallsplaceringar", "пьедесталов", "podia", "시상대", "سکو") : T("podium", "podium", "podio", "podio", "表彰台", "Podium", "منصة", "领奖台", "podium", "pódio", "prispallsplacering", "пьедестал", "podium", "시상대", "سکو")),
      st.classes + " " + (st.classes > 1 ? T("classés", "placings", "clasificados", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "获得名次", "geplaatst", "classificados", "placerade", "призовых мест", "w czołówce", "입상", "رتبه‌دار") : T("classé", "placing", "clasificado", "piazzamento", "入賞", "Platzierung", "تصنيف", "获得名次", "geplaatst", "classificação", "placering", "призёр", "miejsce w klasyfikacji", "입상", "رتبه‌دار"))];
    /* 12/11 16h30 (page du cavalier) : « classés » = premier quart, comme « Ses chiffres » ; jamais de « 0 victoire » ni « 0 podium » */
    if (modeCav) { var nQs = sx.lignes.filter(estClasseQ).length; resume[3] = resume[3].replace(/^\d+/, String(nQs)); var nEpS = sx.lignes.filter(function (f) { return f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom); }).length; resume[0] = nEpS + " " + (nEpS > 1 ? T("épreuves", "classes", "pruebas", "prove", "競技", "Prüfungen", "مسابقات", "场比赛", "proeven", "provas", "klasser", "стартов", "konkursów", "경기") : T("épreuve", "class", "prueba", "prova", "競技", "Prüfung", "مسابقة", "场比赛", "proef", "prova", "klass", "старт", "konkurs", "경기")); resume = resume.filter(function (x) { return !/^0 /.test(x); }); }
    if (st.elAb) resume.push(st.elAb + " " + T("élim. / ab.", "elim. / ret.", "elim. / ab.", "elim. / rit.", "失権/棄権", "Ausg./Aufg.", "استبعاد/انسحاب", "淘汰 / 弃权", "uitgesch. / opg.", "elim. / desist.", "utsl. / avbr.", "выб. / снят.", "wyc. / rez.", "탈락 / 기권", "حذف / انصراف"));
    return h("div", { key: "sa" + sx.cle, id: "perf-saison-" + sx.cle, "data-perf-saison": sx.cle, style: { margin: "0 18px 12px", padding: "14px 14px", scrollMarginTop: 16, borderRadius: 16, background: "linear-gradient(165deg, " + PETROLE2 + " 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid " + (ouverte ? "rgba(201,166,107,0.55)" : FILET) } },
      h("button", { type: "button", "aria-expanded": ouverte ? "true" : "false", onClick: function () { basculerSaison(sx.cle); }, style: { display: "block", width: "100%", background: "none", border: "none", padding: 0, textAlign: "start", color: IVOIRE, cursor: "pointer", fontFamily: SANS } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: IVOIRE, lineHeight: 1.1, direction: "ltr", unicodeBidi: "isolate", textAlign: "start" } }, sx.lib),
            h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 11, color: MUET, lineHeight: 1.4 } }, resume.join("  ·  "))),
          h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: CHAMP, fontSize: 16, lineHeight: 1, transition: "transform .2s ease", transform: ouverte ? "rotate(180deg)" : "none" } }, "˅")),
        barre(sx.lignes)),
      ouverte ? corpsSaison(sx) : null);
  }
  var LEGENDE = [[COUL_BARRE.p1, T("1re", "1st", "1.º", "1º", "1位", "1.", "الأول", "第1名", "1e", "1º", "1:a", "1-е", "1.", "1위", "اول")], [COUL_BARRE.p2, T("2e", "2nd", "2.º", "2º", "2位", "2.", "الثاني", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd", "دوم")], [COUL_BARRE.p3, T("3e", "3rd", "3.º", "3º", "3位", "3.", "الثالث", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd", "سوم")], [COUL_BARRE.autres, T("autres places", "other places", "otros puestos", "altri posti", "その他", "andere Plätze", "مراكز أخرى", "其他名次", "andere plaatsen", "outras colocações", "andra placeringar", "другие места", "inne miejsca", "기타 순위", "رتبه‌های دیگر")], [COUL_BARRE.elab, T("élim. / abandon", "elim. / retired", "elim. / abandono", "elim. / ritiro", "失権/棄権", "Ausg./Aufgabe", "استبعاد/انسحاب", "淘汰 / 弃权", "uitgesch. / opgave", "elim. / desistência", "utsl. / bröt", "выбывание / снятие", "wyc. / rezygnacja", "탈락 / 기권", "حذف / انصراف")]];
  /* (g4) deux boutons cote a cote, sombres a contour champagne, comme la maquette ; « Premium » sous l import si l abonnement manque */
  var actionsCompactes = (peutSaisir || peutImporter) ? h("div", { "data-perf-actions": "1", style: { display: "flex", gap: 10, margin: "22px 18px 0" } },
    peutSaisir ? h("button", { type: "button", onClick: function () { setAjoutOuvert(true); }, style: { flex: 1, minWidth: 0, minHeight: 56, padding: "0 10px", borderRadius: 13, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 } },
      h("span", { "aria-hidden": "true", style: { fontFamily: SERIF, fontSize: 22, lineHeight: 1, color: CHAMP } }, "+"), T("Ajouter un résultat", "Add a result", "Añadir un resultado", "Aggiungi un risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가", "افزودن نتیجه")) : null,
    peutImporter ? h("button", { type: "button", onClick: ouvrirImport, style: { flex: 1, minWidth: 0, minHeight: 56, padding: "0 10px", borderRadius: 13, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "start" } },
      premiumOk ? null : ICO_CADENAS,
      h("span", { style: { minWidth: 0 } }, h("span", { style: { display: "block", lineHeight: 1.25 } }, T("Importer mes résultats FFE", "Import my FFE results", "Importar mis resultados FFE", "Importa i miei risultati FFE", "FFE成績を取り込む", "Meine FFE-Ergebnisse importieren", "استيراد نتائج FFE", "导入我的 FFE 成绩", "Mijn FFE-resultaten importeren", "Importar meus resultados da FFE", "Importera mina FFE-resultat", "Импортировать мои результаты FFE", "Importuj moje wyniki FFE", "내 FFE 결과 가져오기", "وارد کردن نتایج FFE من")),
        premiumOk ? null : h("span", { style: { display: "block", marginTop: 2, fontSize: 10, fontWeight: 500, color: MUET2 } }, "Premium"))) : null) : null;
  /* (g8) TABLETTE / ORDINATEUR : deux colonnes (ecrans 7 a 9 de la maquette) — a gauche chiffres, cavaliers, moments forts, Team,
     actions et video ; a droite le tableau des saisons, qui profite de la largeur. Sur iPhone : la meme suite, en une colonne. */
  /* 12/11 00h05 — maquette K « Chapitres » choisie par Blandine pour la page du CAVALIER : grandes photos entières, une idée par écran.
     Tout l existant reste en dessous (moments forts, Team, ajout / import, saisons dépliables, filtres, modification, vidéo). */
  /* 12/11 08h (Blandine : « tous les encarts sont 10 fois trop gros ») : chapitre = carte compacte, photo entière en vignette à côté du texte */
  function chapitre(cle, img, kick, contenu) {
    return h("div", { key: cle, "data-perf-chapitre": cle, style: { display: "flex", alignItems: "center", gap: 14, margin: "14px 18px 0", padding: 12, borderRadius: 16, background: "rgba(243,238,228,0.03)", border: "1px solid rgba(201,166,107,0.16)" } },
      img ? h("div", { style: { flex: "0 0 34%", maxWidth: 140, display: "flex", alignItems: "center", justifyContent: "center" } },
        h("img", { src: img, alt: "", loading: "lazy", decoding: "async", style: { display: "block", maxWidth: "100%", maxHeight: 130, width: "auto", height: "auto", borderRadius: 10 } })) : null,
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: CHAMP, lineHeight: 1.4 } }, kick),
        contenu));
  }
  var chapitres = null;
  if (modeCav && base.length) {
    var nbClassesQ = base.filter(estClasseQ).length;   /* 14h19 : « classé » = dans le quart (comme le filtre Classés) */
    var nbEpreuves = base.filter(function (f) { return f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom); }).length;   /* toutes les épreuves courues, éliminations et abandons compris */
    var pctCl = nbEpreuves ? Math.round(nbClassesQ / nbEpreuves * 100) : 0;
    var lgCour = base.filter(function (f) { return f.saison === saisonCour; });
    var famPts = {}, famOrdre = [];
    lgCour.forEach(function (f) { var k = hypePerfFamille(f.ep); if (!k) return; if (!(k in famPts)) { famPts[k] = null; famOrdre.push(k); } if (f.pts != null && !isNaN(f.pts)) famPts[k] = (famPts[k] || 0) + f.pts; });
    famOrdre.sort(function (a, b) { return ((famPts[b] || 0) - (famPts[a] || 0)); });
    var record = places.filter(function (f) { return !f.masque && estClasseQ(f); })   /* 12/11 15h30 : « Son record » seulement si c est un vrai classement */.sort(function (a, b) { return (a.pl - b.pl) || ((b.part || 0) - (a.part || 0)) || (b.d || "").localeCompare(a.d || ""); })[0] || null;
    var dernier = base.filter(function (f) { return f.pl != null || f.statut; }).slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); })[0] || null;
    var serifBig = function (txt, coul, taille) { return h("div", { style: { fontFamily: SERIF, fontSize: taille || 26, fontWeight: 500, lineHeight: 1, color: coul || IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, txt); };
    chapitres = h(React.Fragment, null,
      chapitre("c1", "images/TEAM_COMPETITION.webp", T("Chapitre I · Sa saison", "Chapter I · The season", "Capítulo I · Su temporada", "Capitolo I · La stagione", "第1章・シーズン", "Kapitel I · Die Saison", "الفصل الأول · موسمه", "第一章 · 赛季", "Hoofdstuk I · Het seizoen", "Capítulo I · A época", "Kapitel I · Säsongen", "Глава I · Сезон", "Rozdział I · Sezon", "1장 · 시즌", "فصل I · فصل مسابقاتش"),
        h("div", { style: { fontFamily: SERIF, fontSize: 24, fontWeight: 500, lineHeight: 1.1, marginTop: 6, color: IVOIRE } },
          /* 12/11 15h30 : jamais « 0 victoire » ni « 0 podium » — on n écrit que ce qui existe */
          stats.victoires ? stats.victoires + " " + (stats.victoires > 1 ? T("victoires", "wins", "victorias", "vittorie", "勝", "Siege", "انتصارات", "次冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstw", "승", "پیروزی") : T("victoire", "win", "victoria", "vittoria", "勝", "Sieg", "انتصار", "次冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "승", "پیروزی")) + "," : null,
          (stats.victoires && stats.podiums) ? h("br") : null,
          stats.podiums ? h("span", { style: { color: CHAMP } }, stats.podiums + " " + (stats.podiums > 1 ? T("podiums", "podiums", "podios", "podi", "表彰台", "Podien", "منصات", "次领奖台", "podiumplaatsen", "pódios", "prispallsplaceringar", "пьедесталов", "podia", "시상대", "سکو") : T("podium", "podium", "podio", "podio", "表彰台", "Podium", "منصة", "次领奖台", "podiumplaats", "pódio", "prispallsplacering", "пьедестал", "podium", "시상대", "سکو"))) : null,
          (!stats.victoires && !stats.podiums) ? (stats.sorties + " " + (stats.sorties > 1 ? T("sorties en concours", "show outings", "salidas a concurso", "uscite in concorso", "回の出場", "Turnierstarts", "مشاركات في المسابقات", "次参赛", "wedstrijdstarts", "saídas em concurso", "tävlingsstarter", "выездов на соревнования", "startów w zawodach", "회 출전", "شرکت در مسابقه") : T("sortie en concours", "show outing", "salida a concurso", "uscita in concorso", "回の出場", "Turnierstart", "مشاركة في مسابقة", "次参赛", "wedstrijdstart", "saída em concurso", "tävlingsstart", "выезд на соревнования", "start w zawodach", "회 출전", "شرکت در مسابقه"))) : null)),
      h("div", { style: { margin: "12px 22px 0" } }, barre(base)),
      h("div", { style: { margin: "8px 22px 0", fontFamily: SANS, fontSize: 12, color: MUET, display: "flex", justifyContent: "space-between" } },
        h("span", null, stats.sorties + " " + (stats.sorties > 1 ? T("sorties", "outings", "salidas", "uscite", "出場", "Starts", "مشاركات", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전", "حضور") : T("sortie", "outing", "salida", "uscita", "出場", "Start", "مشاركة", "次出赛", "start", "saída", "start", "старт", "start", "출전", "شرکت"))),
        /* 12/11 15h30 : pas de « 0 classé » */ ((typeof nbClassesQ === "number" ? nbClassesQ : stats.classes) ? h("span", null, (typeof nbClassesQ === "number" ? nbClassesQ : stats.classes) + " " + T("classés", "placings", "clasificados", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "获得名次", "geplaatst", "classificados", "placerade", "призовых мест", "w czołówce", "입상", "رتبه‌دار")) : null)),
      /* 12/11 00h05 — ajouts de la maquette J demandés par Blandine : le grand pourcentage et « Son record » */
      h("svg", { viewBox: "0 0 400 34", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 24, marginTop: 20, transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M0 8 C 120 12, 230 32, 400 6", fill: "none", stroke: CHAMP, strokeWidth: 1 })),
      /* 12/11 14h51 (Blandine : « 0 %, je pleure ») : le pourcentage n apparaît que s il y a au moins un classement ;
         sinon une phrase d attente, sans chiffre. Podiums ajoutés sous le pourcentage. */
      /* 12/11 15h30 (Blandine : « à 0 %, ça fait mal… à 0 % on n affiche rien… plusieurs stats ») :
         « Ses chiffres » = une case par statistique, seulement celles qui ne sont pas à zéro (classements, podiums,
         sans faute, régularité). Aucune case : phrase d attente, sans chiffre. */
      (function () {
        var nbSF = base.filter(function (f) { return typeof hypePerfEstSansFaute === "function" && hypePerfEstSansFaute(f); }).length;
        var cases = [];
        if (nbClassesQ) cases.push([String(nbClassesQ), nbClassesQ > 1 ? T("classements", "placings", "clasificaciones", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "次获得名次", "klasseringen", "classificações", "placeringar", "призовых мест", "klasyfikacje", "입상", "رتبه") : T("classement", "placing", "clasificación", "piazzamento", "入賞", "Platzierung", "تصنيف", "次获得名次", "klassering", "classificação", "placering", "призовое место", "klasyfikacja", "입상", "رتبه")]);
        if (stats.podiums) cases.push([String(stats.podiums), stats.podiums > 1 ? T("podiums", "podiums", "podios", "podi", "表彰台", "Podestplätze", "منصات", "次领奖台", "podiumplaatsen", "pódios", "pallplatser", "подиумов", "podia", "시상대", "سکو") : T("podium", "podium", "podio", "podio", "表彰台", "Podestplatz", "منصة", "次领奖台", "podiumplaats", "pódio", "pallplats", "подиум", "podium", "시상대", "سکو")]);
        if (nbSF) cases.push([String(nbSF), nbSF > 1 ? T("sans faute", "clear rounds", "sin faltas", "percorsi netti", "クリア", "fehlerfreie Ritte", "جولات بلا أخطاء", "次零罚分", "foutloze rondes", "percursos sem faltas", "felfria rundor", "чистых маршрутов", "przejazdów bez błędu", "무실수", "بدون خطا") : T("sans faute", "clear round", "sin faltas", "percorso netto", "クリア", "fehlerfreier Ritt", "جولة بلا أخطاء", "次零罚分", "foutloze ronde", "percurso sem faltas", "felfri runda", "чистый маршрут", "przejazd bez błędu", "무실수", "بدون خطا")]);
        if (nbClassesQ && pctCl) cases.push([pctCl + " %", T("des épreuves classées", "of classes placed", "de pruebas clasificadas", "delle prove a premio", "の競技で入賞", "der Prüfungen platziert", "من المسابقات مصنّفة", "的项目获得名次", "van de proeven geplaatst", "das provas classificadas", "av klasserna placerade", "стартов в призах", "konkursów w czołówce", "의 경기에서 입상", "از رده‌ها با رتبه")]);
        return h("div", { "data-perf-chiffres": "1", style: { margin: "4px 18px 0", textAlign: "center" } },
          h("div", { style: { fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".3em", textTransform: "uppercase", color: CHAMP } }, T("Ses chiffres", "In numbers", "Sus cifras", "I suoi numeri", "数字で見る", "In Zahlen", "بالأرقام", "数据", "In cijfers", "Em números", "I siffror", "В цифрах", "W liczbach", "숫자로 보기", "آمارش")),
          cases.length
            ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + (cases.length === 4 ? 2 : cases.length) + ", 1fr)", gap: 8, marginTop: 10 } },
                cases.map(function (c, ic) {
                  return h("div", { key: "ch" + ic, style: { padding: "12px 6px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.18)", background: "rgba(243,238,228,0.03)" } },
                    h("div", { style: { fontFamily: SERIF, fontSize: 30, fontWeight: 500, lineHeight: 1, color: ic === 1 ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, c[0]),
                    h("div", { style: { marginTop: 5, fontFamily: SANS, fontSize: 11.5, lineHeight: 1.3, color: "rgba(243,238,228,0.72)" } }, c[1]));
                }))
            : h("div", { style: { margin: "10px 16px 0", fontFamily: SERIF, fontStyle: "italic", fontSize: 19, lineHeight: 1.35, color: "rgba(243,238,228,0.85)" } },
                T("Ses prochains classements et podiums s’afficheront ici.", "Their next placings and podiums will show here.", "Sus próximas clasificaciones y podios aparecerán aquí.", "I suoi prossimi piazzamenti e podi appariranno qui.", "次の入賞と表彰台はここに表示されます。", "Die nächsten Platzierungen und Podestplätze erscheinen hier.", "ستظهر هنا تصنيفاته ومنصاته القادمة.", "接下来的名次和领奖台将显示在这里。", "Volgende klasseringen en podiumplaatsen verschijnen hier.", "As próximas classificações e pódios aparecerão aqui.", "Kommande placeringar och pallplatser visas här.", "Следующие призовые места и подиумы появятся здесь.", "Kolejne klasyfikacje i podia pojawią się tutaj.", "다음 입상과 시상대가 여기에 표시돼요.", "رده‌بندی‌ها و سکوهای بعدی‌اش اینجا نمایش داده می‌شوند.")));
      })(),
      record ? chapitre("rec", "images/concours-carte-passages.webp", T("Son record", "Personal best", "Su récord", "Il suo record", "自己ベスト", "Sein Rekord", "رقمه القياسي", "最佳成绩", "Zijn record", "O recorde", "Rekordet", "Рекорд", "Rekord", "최고 기록", "رکوردش"),
        h("div", null,
          h("div", { style: { fontFamily: SERIF, fontSize: 28, fontWeight: 500, lineHeight: 1, color: IVOIRE, marginTop: 6, direction: "ltr", unicodeBidi: "isolate" } }, rangTxt(record.pl), record.part ? h("span", { style: { fontSize: 16, color: "rgba(243,238,228,0.7)" } }, " " + T("sur", "of", "de", "su", "/", "von", "من", "/", "van", "de", "av", "из", "z", "/", "از") + " " + record.part) : null),
          h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 13, color: "rgba(243,238,228,0.75)" } }, [record.ep, record.nom, record.d ? dateLisible(record.d) : ""].filter(Boolean).join(" · ")))) : null,
      chapitre("c2", null, T("Chapitre II · Ses points", "Chapter II · Points", "Capítulo II · Sus puntos", "Capitolo II · I suoi punti", "第2章・ポイント", "Kapitel II · Seine Punkte", "الفصل الثاني · نقاطه", "第二章 · 积分", "Hoofdstuk II · Zijn punten", "Capítulo II · Os pontos", "Kapitel II · Poängen", "Глава II · Очки", "Rozdział II · Punkty", "2장 · 포인트", "فصل II · امتیازهایش"),
        h("div", null, libSaisonCour ? h("div", { style: { marginTop: 6, fontFamily: SANS, fontSize: 12, color: "rgba(243,238,228,0.7)" } }, T("Saison ", "Season ", "Temporada ", "Stagione ", "シーズン ", "Saison ", "موسم ", "赛季 ", "Seizoen ", "Época ", "Säsong ", "Сезон ", "Sezon ", "시즌 ", "فصل ") + libSaisonCour) : null,
        famOrdre.length ? h("div", { style: { display: "flex", marginTop: 12 } }, famOrdre.slice(0, 3).map(function (k, ik) {
          var v = famPts[k];
          return h("div", { key: "cp" + k, style: { flex: 1, minWidth: 0, textAlign: "center", borderInlineStart: ik ? "1px solid rgba(201,166,107,0.3)" : "none" } },
            serifBig(v != null ? String(arr(v)) : "–", v != null ? CHAMP : "rgba(243,238,228,0.35)"),
            h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 12, color: "rgba(243,238,228,0.75)" } }, k + (v == null ? " · " + T("à venir", "to come", "por llegar", "in arrivo", "未定", "folgt", "قريبًا", "待定", "volgt", "a seguir", "kommer", "скоро", "wkrótce", "예정", "پیش رو") : "")));
        })) : h("div", { style: { marginTop: 6, fontFamily: SERIF, fontSize: 17, color: IVOIRE, lineHeight: 1.2 } }, T("Pas encore de concours cette saison", "No shows yet this season", "Aún sin concursos esta temporada", "Ancora nessun concorso in questa stagione", "今シーズンはまだ大会なし", "Noch keine Turniere in dieser Saison", "لا مسابقات بعد هذا الموسم", "本赛季还没有比赛", "Nog geen wedstrijden dit seizoen", "Ainda sem concursos nesta época", "Inga tävlingar ännu denna säsong", "В этом сезоне ещё нет стартов", "Brak zawodów w tym sezonie", "이번 시즌 아직 대회 없음", "هنوز در این فصل مسابقه‌ای نیست")))),
      dernier ? chapitre("c3", dernier.photo || null, T("Chapitre III · Son dernier concours", "Chapter III · Latest show", "Capítulo III · Su último concurso", "Capitolo III · L'ultimo concorso", "第3章・最新の大会", "Kapitel III · Sein letztes Turnier", "الفصل الثالث · آخر مسابقة", "第三章 · 最近一场比赛", "Hoofdstuk III · Laatste wedstrijd", "Capítulo III · O último concurso", "Kapitel III · Senaste tävlingen", "Глава III · Последний старт", "Rozdział III · Ostatnie zawody", "3장 · 최근 대회", "فصل III · آخرین مسابقه‌اش"),
        h("div", null,
          serifBig(dernier.pl != null ? rangTxt(dernier.pl) : (dernier.statut === "el" ? T("Élim.", "Elim.", "Elim.", "Elim.", "失権", "Ausg.", "استبعاد", "淘汰", "Uitg.", "Elim.", "Utsl.", "Искл.", "Wyel.", "실격", "حذف") : T("Ab.", "Ret.", "Ab.", "Rit.", "棄権", "Aufg.", "انسحاب", "弃权", "Opg.", "Desist.", "Bröt", "Сход", "Rez.", "기권", "انصراف")), CHAMP, 60),
          h("div", { style: { fontFamily: SERIF, fontSize: 16, color: IVOIRE, marginTop: 4, lineHeight: 1.2 } }, [dernier.ep, dernier.lieu || dernier.nom].filter(Boolean).join(" · ")),
          h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 12.5, color: "rgba(243,238,228,0.75)" } }, [dernier.d ? dateLisible(dernier.d) : "", dernier.cav || "", dernier.part ? T("sur ", "of ", "de ", "su ", "/", "von ", "من ", "/", "van ", "de ", "av ", "из ", "z ", "/", "از ") + dernier.part : "", hypePerfEstSansFaute(dernier) ? T("sans faute", "clear round", "sin faltas", "netto", "減点なし", "fehlerfrei", "بلا أخطاء", "零罚分", "foutloos", "sem faltas", "felfri", "чисто", "bez zrzutki", "무감점", "بدون خطا") : ""].filter(Boolean).join(" · ")))) : null,
      h("div", { style: { height: 6 } }));
  }
  /* 12/11 00h10 — maquette O choisie par Blandine : « Chapitre IV · Ses chevaux », une grande photo par cheval, ses résultats
     avec ce cheval et « Sa fiche » ; les saisons dépliables deviennent le Chapitre V, les boutons Ajouter / Importer passent en dessous. */
  var chapChevaux = null;
  if (modeCav && base.length) {
    var parCh = {}, ordreCh = [];
    base.forEach(function (f) { var k = f.cav || ""; if (!k) return; if (!parCh[k]) { parCh[k] = []; ordreCh.push(k); } parCh[k].push(f); });
    ordreCh.sort(function (a, b) { return parCh[b].length - parCh[a].length; });
    chapChevaux = h(React.Fragment, null,
      h("div", { style: { padding: "26px 22px 0" } },
        h("div", { style: { fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: CHAMP } }, T("Chapitre IV · Ses chevaux", "Chapter IV · The horses", "Capítulo IV · Sus caballos", "Capitolo IV · I suoi cavalli", "第4章・馬たち", "Kapitel IV · Seine Pferde", "الفصل الرابع · خيوله", "第四章 · 马匹", "Hoofdstuk IV · Zijn paarden", "Capítulo IV · Os cavalos", "Kapitel IV · Hästarna", "Глава IV · Лошади", "Rozdział IV · Konie", "4장 · 말들", "فصل IV · اسب‌هایش")),
        h("div", { style: { fontFamily: SERIF, fontSize: 24, fontWeight: 500, color: IVOIRE, marginTop: 4 } }, T("Un couple, une histoire", "One pair, one story", "Una pareja, una historia", "Un binomio, una storia", "ひと組のペア、ひとつの物語", "Ein Paar, eine Geschichte", "ثنائي وحكاية", "一对搭档，一段故事", "Eén combinatie, één verhaal", "Um par, uma história", "Ett ekipage, en historia", "Пара — это история", "Para, jedna historia", "한 쌍, 하나의 이야기", "یک زوج، یک داستان"))),
      ordreCh.map(function (k) {
        var fsC = parCh[k].slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); });
        var cvx = null, cvId = null; try { Object.keys((cav && cav.chevaux) || {}).forEach(function (idc) { var c = cav.chevaux[idc]; if (c && ((String(c.alias || "").trim() || c.nom) === k)) { cvx = c; cvId = idc; } }); } catch (eCh) { }
        var stC = hypePerfStatsHisto(fsC);
        var ligne1 = stC.victoires ? stC.victoires + " " + (stC.victoires > 1 ? T("victoires", "wins", "victorias", "vittorie", "勝", "Siege", "انتصارات", "次冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstw", "승", "پیروزی") : T("victoire", "win", "victoria", "vittoria", "勝", "Sieg", "انتصار", "次冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "승", "پیروزی")) : null;
        var ligne2 = stC.sorties + " " + (stC.sorties > 1 ? T("sorties ensemble", "outings together", "salidas juntos", "uscite insieme", "回一緒に出場", "gemeinsame Starts", "مشاركات معًا", "次共同出赛", "starts samen", "saídas juntos", "starter tillsammans", "совместных стартов", "wspólnych startów", "회 함께 출전", "بیرون‌رفتن‌ها با هم") : T("sortie ensemble", "outing together", "salida juntos", "uscita insieme", "回一緒に出場", "gemeinsamer Start", "مشاركة معًا", "次共同出赛", "start samen", "saída juntos", "start tillsammans", "совместный старт", "wspólny start", "회 함께 출전", "بیرون‌رفتن با هم"));
        return h("div", { key: "chx" + k, "data-perf-couple": k },
          chapitre("cpl" + k, (cvx && cvx.photo_url) || "images/concours-hero-cso.webp", T("Avec ", "With ", "Con ", "Con ", "", "Mit ", "مع ", "与 ", "Met ", "Com ", "Med ", "С ", "Z ", "", "با ") + k,
            h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 500, lineHeight: 1.12, color: IVOIRE, marginTop: 5 } }, ligne1 ? h(React.Fragment, null, ligne1, h("br"), h("span", { style: { color: CHAMP } }, ligne2)) : ligne2)),
          h("div", { style: { padding: "2px 30px 0" } },
            fsC.filter(function (f) { return !f.masque; }).slice(0, 3).map(function (f, i) {
              var g = f.pl === 1;
              return h("div", { key: "cr" + (f.id || i), style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "9px 0", borderBottom: "1px solid rgba(201,166,107,0.12)" } },
                h("div", { style: { minWidth: 0 } },
                  h("div", { style: { fontFamily: SANS, fontSize: 13, fontWeight: 500, color: IVOIRE, lineHeight: 1.3 } }, [f.ep, f.nom].filter(Boolean).join(" · ")),
                  h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 12, color: MUET } }, [f.d ? dateLisible(f.d) : "", f.part ? T("sur ", "of ", "de ", "su ", "/", "von ", "من ", "/", "van ", "de ", "av ", "из ", "z ", "/", "از ") + f.part : "", hypePerfEstSansFaute(f) ? T("sans faute", "clear round", "sin faltas", "netto", "減点なし", "fehlerfrei", "بلا أخطاء", "零罚分", "foutloos", "sem faltas", "felfri", "чисто", "bez zrzutki", "무감점", "بدون خطا") : "", (f.pts != null && !isNaN(f.pts)) ? "+" + arr(f.pts) + " pts" : ""].filter(Boolean).join(" · "))),
                h("div", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 21, color: g ? CHAMP : IVOIRE, lineHeight: 1 } }, f.pl != null ? rangTxt(f.pl) : (f.statut === "el" ? T("Élim.", "Elim.", "Elim.", "Elim.", "失権", "Ausg.", "استبعاد", "淘汰", "Uitg.", "Elim.", "Utsl.", "Искл.", "Wyel.", "실격", "حذف") : T("Ab.", "Ret.", "Ab.", "Rit.", "棄権", "Aufg.", "انسحاب", "弃权", "Opg.", "Desist.", "Bröt", "Сход", "Rez.", "기권", "انصراف"))));
            }),
            cvId ? h("div", { style: { textAlign: "end", marginTop: 10 } }, h("button", { type: "button", onClick: function () { try { window.__chevalOuvert = cvId; } catch (eO) { } setEcran("cheval"); }, style: { background: "none", border: "none", padding: "6px 0", color: CHAMP, fontFamily: SANS, fontSize: 13, cursor: "pointer" } }, T("Sa fiche", "Profile", "Su ficha", "La scheda", "プロフィール", "Steckbrief", "ملفه", "档案", "Profiel", "A ficha", "Profil", "Карточка", "Profil", "프로필", "صفحه‌اش") + " " + (rtl ? "‹" : "›"))) : null));
      }),
      h("svg", { viewBox: "0 0 400 34", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 24, marginTop: 20, transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M0 8 C 120 12, 230 32, 400 6", fill: "none", stroke: CHAMP, strokeWidth: 1 })));
  }
  /* 12/11 16h20 PROPOSITION (Blandine : « tout se mélange… des trucs en doublon ») — page du cavalier sans doublon :
     une seule fois chaque information. Les chiffres (sorties, victoires, podiums, classements, sans faute, %) dans une seule grille ;
     plus de « Son dernier concours » (c est la 1re ligne de la saison), plus de « Ses points » en haut (ils sont dans la saison,
     avec le détail par type d épreuve), plus de chapitre « Ses chevaux » (les pastilles des chevaux font le tri ; « Sa fiche » sous
     les pastilles quand un cheval est choisi) ; « Son record » seulement s il n y a pas encore de moments forts. */
  if (modeCav && base.length) {
    var nbSF2 = base.filter(function (f) { return typeof hypePerfEstSansFaute === "function" && hypePerfEstSansFaute(f); }).length;
    var pl2 = function (n, un, plu) { return n > 1 ? plu : un; };
    var tuiles = [];
    /* 12/11 16h30 (Blandine : « des chiffres depuis le début, d autres sur la saison… pas clair ») : tout est compté en ÉPREUVES,
       sur toute sa carrière ; plus de « sorties » (journées, une autre unité) ni de « sans faute » (la mention manque dans la plupart des imports FFE) */
    var nbEp2 = base.filter(function (f) { return f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom); }).length;
    if (nbEp2) tuiles.push([String(nbEp2), pl2(nbEp2, T("épreuve courue", "class ridden", "prueba disputada", "prova disputata", "出場競技", "Prüfung geritten", "مسابقة", "场比赛", "proef gereden", "prova disputada", "klass riden", "старт", "konkurs", "경기 출전"), T("épreuves courues", "classes ridden", "pruebas disputadas", "prove disputate", "出場競技", "Prüfungen geritten", "مسابقات", "场比赛", "proeven gereden", "provas disputadas", "klasser ridna", "стартов", "konkursów", "경기 출전"))]);
    if (stats.victoires) tuiles.push([String(stats.victoires), pl2(stats.victoires, T("victoire", "win", "victoria", "vittoria", "勝", "Sieg", "انتصار", "次冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "승"), T("victoires", "wins", "victorias", "vittorie", "勝", "Siege", "انتصارات", "次冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstw", "승")), 1]);
    if (stats.podiums) tuiles.push([String(stats.podiums), pl2(stats.podiums, T("podium", "podium", "podio", "podio", "表彰台", "Podestplatz", "منصة", "次领奖台", "podiumplaats", "pódio", "pallplats", "подиум", "podium", "시상대"), T("podiums", "podiums", "podios", "podi", "表彰台", "Podestplätze", "منصات", "次领奖台", "podiumplaatsen", "pódios", "pallplatser", "подиумов", "podia", "시상대")), 1]);
    if (nbClassesQ) tuiles.push([String(nbClassesQ), pl2(nbClassesQ, T("classement", "placing", "clasificación", "piazzamento", "入賞", "Platzierung", "تصنيف", "次获得名次", "klassering", "classificação", "placering", "призовое место", "klasyfikacja", "입상"), T("classements", "placings", "clasificaciones", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "次获得名次", "klasseringen", "classificações", "placeringar", "призовых мест", "klasyfikacje", "입상"))]);
    /* (sans faute retiré le 12/11 16h30) */
    /* 12/11 18h35 (Blandine : « classement par concours, c'est plus sympa ») : le pourcentage se compte par CONCOURS (journée) :
       classé au moins une fois (premier quart) ce jour-là ; affiché seulement s il n est pas à zéro */
    var jrs2 = {}; base.forEach(function (f) { if (f.d) {   /* 13/11 : les lignes sans place sont des « Non classé » FFE (parcours couru) ; les non partants ne sont jamais importés */ if (!jrs2[f.d]) jrs2[f.d] = false; if (estClasseQ(f)) jrs2[f.d] = true; } });
    var nJ2 = Object.keys(jrs2).length, nJQ2 = Object.keys(jrs2).filter(function (k) { return jrs2[k]; }).length;
    if (nJ2 && nJQ2) tuiles.push([Math.round(100 * nJQ2 / nJ2) + " %", T("classé à ", "placed at ", "clasificado en ", "piazzato in ", "入賞：", "platziert bei ", "مصنف في ", "获得名次：", "geplaatst op ", "classificado em ", "placerad på ", "в призах: ", "w czołówce: ", "입상: ") + nJQ2 + " " + T("concours sur", "shows out of", "concursos de", "concorsi su", "大会 /", "Turnieren von", "مسابقة من", "场比赛，共", "wedstrijden van", "concursos em", "tävlingar av", "соревнований из", "zawodach z", "대회 /") + " " + nJ2]);
    /* jamais de ligne à moitié vide : 6 colonnes, chaque ligne remplie */
    var nT = tuiles.length, spans = [];
    if (nT === 4) spans = [3, 3, 3, 3]; else if (nT === 5) spans = [2, 2, 2, 3, 3]; else if (nT === 6) spans = [2, 2, 2, 2, 2, 2];
    else for (var iS = 0; iS < nT; iS++) spans.push(6 / nT);
    var ficheCh = null;
    if (cavEffectif !== "tous") { try { Object.keys((cav && cav.chevaux) || {}).forEach(function (idc) { var c = cav.chevaux[idc]; if (c && ((String(c.alias || "").trim() || c.nom) === cavEffectif)) ficheCh = idc; }); } catch (eFc) { } }
    chapitres = h(React.Fragment, null,
      ficheCh ? h("div", { style: { textAlign: "end", margin: "8px 22px 0" } }, h("button", { type: "button", onClick: function () { try { window.__chevalOuvert = ficheCh; } catch (eO) { } setEcran("cheval"); }, style: { border: "none", background: "transparent", color: CHAMP, fontFamily: SANS, fontSize: 12.5, cursor: "pointer", padding: 0 } }, T("Voir la fiche de ", "See the profile of ", "Ver la ficha de ", "Vedi la scheda di ", "プロフィールを見る：", "Profil ansehen: ", "عرض ملف ", "查看资料：", "Bekijk het profiel van ", "Ver a ficha de ", "Se profilen för ", "Карточка: ", "Zobacz profil: ", "프로필 보기: ") + cavEffectif + (rtl ? " ‹" : " ›"))) : null,
      h("div", { "data-perf-chiffres": "1", style: { margin: "22px 18px 0" } },
        h("div", { style: { textAlign: "center", fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".3em", textTransform: "uppercase", color: CHAMP } }, T("Ses chiffres", "In numbers", "Sus cifras", "I suoi numeri", "数字で見る", "In Zahlen", "بالأرقام", "数据", "In cijfers", "Em números", "I siffror", "В цифрах", "W liczbach", "숫자로 보기")),
        nT ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 12 } }, tuiles.map(function (c, ic) {
          return h("div", { key: "tu" + ic, style: { gridColumn: "span " + spans[ic], textAlign: "center", padding: "12px 4px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.18)", background: "rgba(243,238,228,0.03)" } },
            h("div", { style: { fontFamily: SERIF, fontSize: 28, fontWeight: 500, lineHeight: 1, color: c[2] ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, c[0]),
            h("div", { style: { marginTop: 5, fontFamily: SANS, fontSize: 11, lineHeight: 1.3, color: "rgba(243,238,228,0.72)" } }, c[1]));
        })) : null,
        h("div", { style: { marginTop: 14 } }, barre(base))),
      false ? chapitre("rec", "images/concours-carte-passages.webp", T("Son record", "Personal best", "Su récord", "Il suo record", "自己ベスト", "Sein Rekord", "رقمه القياسي", "最佳成绩", "Zijn record", "O recorde", "Rekordet", "Рекорд", "Rekord", "최고 기록"),
        h("div", null,
          h("div", { style: { fontFamily: SERIF, fontSize: 28, fontWeight: 500, lineHeight: 1, color: IVOIRE, marginTop: 6, direction: "ltr", unicodeBidi: "isolate" } }, rangTxt(record.pl), record.part ? h("span", { style: { fontSize: 16, color: "rgba(243,238,228,0.7)" } }, " / " + record.part) : null),
          h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 13, color: "rgba(243,238,228,0.75)" } }, [record.ep, record.nom, record.d ? dateLisible(record.d) : ""].filter(Boolean).join(" · ")))) : null);
    chapChevaux = null;
  }
  var elG = [
    /* les cinq chiffres (carriere, definitions historiques ; points = saison en cours) */
    /* (g2) comme la maquette : chiffres poses sur le fond, sans cadre, chiffres ivoire en serif, libelles en minuscules, filet fin dessous */
    modeCav ? menuCav : h("div", { "data-perf-chiffres": "1", style: { display: "flex", margin: "16px 14px 0", padding: "4px 0 14px", borderBottom: "1px solid rgba(243,238,228,0.08)" } },
      chiffres.map(function (cq, i) {
        return h("div", { key: "ch" + i, "data-perf-chiffre": String(i), style: { flex: 1, textAlign: "center", minWidth: 0 } },
          h("div", { style: { display: "flex", justifyContent: "center", marginBottom: 6 } }, cq[2]),
          h("div", { style: { fontFamily: SERIF, fontSize: 27, fontWeight: 600, color: IVOIRE, lineHeight: 1 } }, String(cq[0])),
          h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 10.5, color: MUET, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", direction: "ltr", unicodeBidi: "isolate" } }, cq[1]));
      })),
    /* filtre cavalier : seulement s il y a au moins deux cavaliers ; il agit sur les chiffres et le tableau */
    (cavaliers.length >= 2) ? h("div", { "data-perf-cavaliers": "1", style: { display: "flex", gap: 8, padding: "12px 18px 0", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" } },
      [pilule(T("Tous", "All", "Todos", "Tutti", "全員", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체", "همه"), cavEffectif === "tous", function () { setCavChoisi("tous"); setOuvertes(null); }, "cavTous")].concat(cavaliers.map(function (cv) {
        if (!modeCav) return pilule(nomCourt(cv), cavEffectif === cv, function () { setCavChoisi(cv); setOuvertes(null); }, "cav" + cv);
        /* (g9) page du cavalier : le filtre porte sur les chevaux, avec leur photo (maquette, ecran 6) */
        var cvx = null; try { Object.keys((cav && cav.chevaux) || {}).forEach(function (k) { var c = cav.chevaux[k]; if (c && ((String(c.alias || "").trim() || c.nom) === cv)) cvx = c; }); } catch (eCx) { }
        var on = cavEffectif === cv;
        return h("button", { key: "cav" + cv, type: "button", onClick: function () { setCavChoisi(cv); setOuvertes(null); }, style: { flex: "0 0 auto", minHeight: 34, padding: "0 12px 0 4px", borderRadius: 10, border: (on ? "1.5px solid #C9A66B" : "1px solid rgba(243,238,228,0.14)"), background: "transparent", color: on ? "#F3EEE4" : "rgba(243,238,228,0.82)", fontFamily: SANS, fontSize: 11.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 7 } },
          (cvx && cvx.photo_url) ? h("img", { src: cvx.photo_url, alt: "", loading: "lazy", style: { width: 26, height: 26, borderRadius: 7, objectFit: "cover", flex: "0 0 auto" } }) : h("span", { style: { width: 4 } }),
          cv);
      })).concat([h("span", { key: "finPil", "aria-hidden": "true", style: { flex: "0 0 6px" } })])) : null,
    chapitres,
    /* ses moments forts : mosaique de la maquette, une grande a gauche + quatre petites (2 x 2) ; toute la carriere, tous cavaliers */
    (forts.length || peutForts) ? h(React.Fragment, null,
      titreSection((MOI ? T("Tes moments forts", "Your highlights") : T("Ses moments forts", "Career highlights", "Sus grandes momentos", "I suoi momenti forti", "ハイライト", "Seine Highlights", "لحظاته المميزة", "它的精彩时刻", "Zijn hoogtepunten", "Seus momentos marcantes", "Dess höjdpunkter", "Её яркие моменты", "Jego najważniejsze momenty", "하이라이트", "لحظه‌های مهمش"))),
      (function () {
        var cases = [];
        if (forts[0]) cases.push(carteFort(forts[0], true, 0)); else if (peutForts) cases.push(tuileAjoutFort());
        for (var k = 1; k <= 4; k++) {
          if (forts[k]) cases.push(carteFort(forts[k], false, k));
          else if (peutForts && forts.length && k === forts.length) cases.push(tuileAjoutFort());
        }
        var seule = (cases.length === 1);
        return h("div", { "data-perf-mosaique": "1", style: { margin: "0 18px", display: "grid", gridTemplateColumns: seule ? "1fr" : "1.3fr 1fr 1fr", gridTemplateRows: seule ? "190px" : "128px 128px", gap: 8 } }, cases);
      })(),
      (peutForts && forts.length >= 5) ? h("div", { style: { textAlign: "center", marginTop: 10 } }, h("button", { type: "button", onClick: function () { setChoixFortOuvert(true); }, style: { minHeight: 36, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.55)", background: "transparent", color: "#E6CF9C", fontFamily: SANS, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, "+ " + T("Ajouter un moment fort", "Add a highlight", "Añadir un momento", "Aggiungi un momento", "ハイライトを追加", "Moment hinzufügen", "إضافة لحظة بارزة", "添加精彩时刻", "Hoogtepunt toevoegen", "Adicionar um momento marcante", "Lägg till en höjdpunkt", "Добавить яркий момент", "Dodaj najważniejszy moment", "하이라이트 추가", "افزودن یک لحظهٔ مهم"))) : null) : null,
    /* classement saison (Team seulement, regles Team inchangees) */
    teamInfo ? h("div", { role: "button", onClick: ouvrirClassementTeam, style: { margin: "22px 18px 0", padding: "14px 16px", borderRadius: 16, border: "1px solid " + FILET, background: "linear-gradient(165deg, " + PETROLE2 + " 0%, " + NOIR + " 100%)", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" } },
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SANS, fontSize: 9.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#E6CF9C" } }, T("Classement Team", "Team ranking", "Clasificación Team", "Classifica Team", "チーム順位", "Team-Wertung", "ترتيب الفريق", "Team 排名", "Teamklassement", "Classificação Team", "Teamets rankning", "Рейтинг Team", "Klasyfikacja Team", "팀 순위", "رده‌بندی تیم")),
        h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 12, color: MUET, lineHeight: 1.35 } }, (teamInfo.nom || "Team") + (teamInfo.saison ? " · " + T("saison Team ", "Team season ", "temporada Team ", "stagione Team ", "チームシーズン ", "Team-Saison ", "موسم الفريق ", "Team 赛季 ", "teamseizoen ", "temporada Team ", "Teamsäsong ", "сезон Team ", "sezon Team ", "팀 시즌 ", "فصل تیم ") + teamInfo.saison + "-" + (Number(teamInfo.saison) + 1) : ""))),
      h("div", { style: { textAlign: "end", flex: "0 0 auto" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: IVOIRE, lineHeight: 1, direction: "ltr", unicodeBidi: "isolate" } }, rangTxt(teamInfo.rang), teamInfo.total ? h("span", { style: { fontSize: 14, color: MUET2 } }, " / " + teamInfo.total) : null),
        h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 11, color: "#E6CF9C", direction: "ltr", unicodeBidi: "isolate" } }, (Math.round((teamInfo.pts || 0) * 100) / 100) + " pts Team")),
      h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 20, lineHeight: 1 } }, rtl ? "‹" : "›")) : null,
    /* actions compactes */
    modeCav ? null : actionsCompactes,
    modeCav ? null : outilCapture,
  ];
  var elD = [
    chapChevaux,
    null,   /* 12/11 16h20 : titre « Chapitre V » retiré (proposition sans chapitres numérotés) */
    /* toutes ses saisons : le tableau depliable */
    titreSection((MOI ? T("Toutes tes saisons", "All your seasons") : T("Toutes ses saisons", "All seasons", "Todas sus temporadas", "Tutte le stagioni", "全シーズン", "Alle Saisons", "كل مواسمه", "它的所有赛季", "Al zijn seizoenen", "Todas as temporadas", "Alla dess säsonger", "Все её сезоны", "Wszystkie jego sezony", "모든 시즌", "همهٔ فصل‌هایش"))),
    h("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 12px", margin: "-4px 18px 12px" } }, LEGENDE.map(function (lg, i) {
      return h("span", { key: "lg" + i, style: { display: "inline-flex", alignItems: "center", gap: 5, fontFamily: SANS, fontSize: 10.5, color: MUET } }, h("span", { style: { width: 12, height: 8, borderRadius: 2, background: lg[0] } }), lg[1]);
    })),
    h("div", { "data-perf-tableau": "1" }, saisons.map(ligneSaison)),
    (estProprio && nbMasques) ? h("div", { style: { textAlign: "center", margin: "6px 18px 0" } }, h("button", { type: "button", onClick: function () { setVoirMasques(!voirMasques); }, style: { background: "none", border: "none", color: MUET2, fontFamily: SANS, fontSize: 11.5, cursor: "pointer", padding: "8px" } }, libMasques())) : null,
    modeCav ? null : h("div", { "data-perf-compteur": "1",   /* 12/11 16h35 : sur la page du cavalier, le total est déjà dans « Ses chiffres » */ style: { textAlign: "center", margin: "6px 18px 0", fontFamily: SANS, fontSize: 10.5, color: MUET2 } }, places.length + " " + (places.length > 1 ? T("résultats enregistrés", "recorded results", "resultados registrados", "risultati registrati", "件の成績", "erfasste Ergebnisse", "نتائج مسجلة", "条已记录的成绩", "geregistreerde resultaten", "resultados registrados", "sparade resultat", "сохранённых результатов", "zapisanych wyników", "저장된 결과", "نتیجهٔ ثبت‌شده") : T("résultat enregistré", "recorded result", "resultado registrado", "risultato registrato", "件の成績", "erfasstes Ergebnis", "نتيجة مسجلة", "条已记录的成绩", "geregistreerd resultaat", "resultado registrado", "sparat resultat", "сохранённый результат", "zapisany wynik", "저장된 결과", "نتیجهٔ ثبت‌شده"))),
    modeCav ? actionsCompactes : null,
    modeCav ? outilCapture : null,
  ];
  /* 12/11 19h (Blandine, maquette A2 validée : « Ok, super, vas-y, tu peux mettre en ligne ») — page du cavalier façon « groupe compétition » :
     1 En bref (anneau % par concours + 4 chiffres + barre) · 2 Ses chevaux (magazine immersif, photo entière) · 3 Récent (3 cartes basses)
     · 4 Souvenirs (3 moments forts) · 5 Archives (par saison / par cheval). Jamais de zéro ; les lignes masquées ne sont jamais listées. */
  if (base.length && (modeCav || (typeof window !== "undefined" && window.__perfChevalA2))) (function () {   /* (page du cheval : en essai, pas encore validée) 12/11 23h48 (Blandine « Ok, super, vas-y ») : la maquette A2 sert aussi à la page d'un CHEVAL (ses cavaliers à la place de ses chevaux) */
    var visL = function (f) { return montreMasques || !f.masque; };
    var nPart = 0;
    var sepA2 = function (k) { return h("div", { key: k, "aria-hidden": "true", style: { height: 1, background: "rgba(201,166,107,0.18)", margin: "34px 22px 0" } }); };
    var partie = function (k, kick, titre) { nPart++; return h("div", { key: k, style: { padding: "30px 22px 0" } },
      h("div", { style: { fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: CHAMP } }, nPart + " · " + kick),
      h("div", { style: { fontFamily: SERIF, fontSize: 24, lineHeight: 1.1, marginTop: 4, color: IVOIRE } }, titre)); };   /* 13/11 00h55 (« ça viole les yeux ») : 34 -> 24 */
    var nbEpDe = function (ls) { return ls.filter(function (f) { return f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom); }).length; };
    var L_EP = function (n) { return n > 1 ? T("épreuves", "classes", "pruebas", "prove", "競技", "Prüfungen", "مسابقات", "场比赛", "proeven", "provas", "klasser", "стартов", "konkursów", "경기", "مسابقه") : T("épreuve", "class", "prueba", "prova", "競技", "Prüfung", "مسابقة", "场比赛", "proef", "prova", "klass", "старт", "konkurs", "경기", "مسابقه"); };
    var L_V = function (n) { return n > 1 ? T("victoires", "wins", "victorias", "vittorie", "勝", "Siege", "انتصارات", "次冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstw", "승", "پیروزی") : T("victoire", "win", "victoria", "vittoria", "勝", "Sieg", "انتصار", "次冠军", "overwinning", "vitória", "seger", "победа", "zwycięstwo", "승", "پیروزی"); };
    var L_P = function (n) { return n > 1 ? T("podiums", "podiums", "podios", "podi", "表彰台", "Podestplätze", "منصات", "次领奖台", "podiumplaatsen", "pódios", "pallplatser", "подиумов", "podiów", "시상대", "سکو") : T("podium", "podium", "podio", "podio", "表彰台", "Podestplatz", "منصة", "次领奖台", "podiumplaats", "pódio", "pallplats", "подиум", "podium", "시상대", "سکو"); };
    var L_Q = function (n) { return n > 1 ? T("classements", "placings", "clasificaciones", "piazzamenti", "入賞", "Platzierungen", "تصنيفات", "次获得名次", "klasseringen", "classificações", "placeringar", "призовых мест", "klasyfikacji", "입상", "رتبه") : T("classement", "placing", "clasificación", "piazzamento", "入賞", "Platzierung", "تصنيف", "次获得名次", "klassering", "classificação", "placering", "призовое место", "klasyfikacja", "입상", "رتبه"); };
    var chiffreS = function (k, v, lib, or, taille) { return h("div", { key: k, style: { textAlign: "center", minWidth: 0 } },
      h("div", { style: { fontFamily: SERIF, fontSize: taille || 32, fontWeight: 500, lineHeight: 1, color: or ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, String(v)),
      h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 10.5, color: MUET } }, lib)); };   /* chiffres des blocs chevaux : pas de dépliage */
    var chiffre = function (k, v, lib, or, taille) { var act = detOuv === k; return h("div", { key: k, role: "button", tabIndex: 0, "aria-expanded": act, onClick: function () { setDetOuv(act ? null : k); }, style: { textAlign: "center", minWidth: 0, cursor: "pointer", padding: "6px 2px", borderRadius: 12, border: "1px solid " + (act ? "rgba(201,166,107,0.55)" : "transparent"), background: act ? "rgba(201,166,107,0.06)" : "transparent" } },
      h("div", { style: { fontFamily: SERIF, fontSize: taille || 32, fontWeight: 500, lineHeight: 1, color: or ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, String(v)),
      h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 10.5, color: MUET } }, lib, h("span", { "aria-hidden": "true", style: { color: CHAMP, marginInlineStart: 4 } }, act ? "˄" : "˅"))); };
    var parCheval = function (nm) { var r = null; try { Object.keys((cav && cav.chevaux) || {}).forEach(function (k) { var c = cav.chevaux[k]; if (c && ((String(c.alias || "").trim() || c.nom) === nm)) r = { id: k, c: c }; }); } catch (eP) { } return r; };
    var ouvrirFiche = function (id) { try { window.__chevalOuvert = id; } catch (eO) { } setEcran("cheval"); };
    var meilleur = function (ls) { var pl = ls.filter(function (f) { return f.pl != null && visL(f) && estClasseQ(f); });   /* seulement un vrai classement */ if (!pl.length) return null; return pl.slice().sort(function (a, b) { return (a.pl - b.pl) || ((b.part || 0) - (a.part || 0)) || String(b.d || "").localeCompare(String(a.d || "")); })[0]; };
    var resTxt = function (f) { return f.pl != null ? rangTxt(f.pl) : (f.statut === "" ? T("Non classé", "Not placed") : f.statut === "el" ? T("Élim.", "Elim.", "Elim.", "Elim.", "失権", "Ausg.", "استبعاد", "淘汰", "Uitg.", "Elim.", "Utsl.", "Искл.", "Wyel.", "실격", "حذف") : T("Ab.", "Ret.", "Ab.", "Rit.", "棄権", "Aufg.", "انسحاب", "弃权", "Opg.", "Desist.", "Bröt", "Сход", "Rez.", "기권", "انصراف")); };
    var SUR = function () { return T("sur", "of", "de", "su", "/", "von", "من", "/", "van", "de", "av", "из", "z", "중", "از"); };
    var TROPH = function () { return h("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" })); };
    var ETOI = function () { return h("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" })); };
    /* carte basse (style des portes de la page Team) : icône, filet, texte, photo entière à droite en fondu */
    var carteBasse = function (k, ico, l1, l2, ph, onClick) {
      return h("div", { key: k, role: "button", tabIndex: 0, onClick: onClick, style: { position: "relative", display: "flex", alignItems: "center", minHeight: 88, border: "1px solid rgba(201,166,107,0.28)", borderRadius: 18, background: "#0B1114", overflow: "hidden", marginBottom: 10, cursor: "pointer" } },
        ph ? h("div", { "aria-hidden": "true", style: { position: "absolute", insetInlineEnd: 0, top: 0, bottom: 0, width: "46%", display: "flex", justifyContent: "flex-end" } },
          h("img", { src: ph, alt: "", loading: "lazy", decoding: "async", style: { height: "100%", width: "auto", maxWidth: "100%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", transparent, #000 55%)", maskImage: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", transparent, #000 55%)" } })) : null,
        h("div", { style: { width: 58, flex: "0 0 auto", display: "flex", justifyContent: "center", color: CHAMP, position: "relative" } }, ico),
        h("div", { style: { width: 1, alignSelf: "stretch", margin: "16px 0", background: "rgba(201,166,107,0.3)", position: "relative" } }),
        h("div", { style: { padding: "12px 14px", position: "relative", minWidth: 0, maxWidth: ph ? "64%" : "100%" } },
          h("div", { style: { fontFamily: SERIF, fontSize: 23, lineHeight: 1.1, color: IVOIRE, overflowWrap: "anywhere" } }, l1),
          h("div", { style: { fontFamily: SANS, fontSize: 11.5, color: "rgba(243,238,228,0.65)", marginTop: 3, lineHeight: 1.35 } }, l2)));
    };
    var concoursC = function (f) { return String(f.nom || "").replace(/^\s*CSO\s+/i, ""); };
    var g = [];

    /* 1 · En bref */
    var jrs = {}; base.forEach(function (f) { if (f.d) {   /* 13/11 : les lignes sans place sont des « Non classé » FFE (parcours couru) ; les non partants ne sont jamais importés */ if (!jrs[f.d]) jrs[f.d] = false; if (estClasseQ(f)) jrs[f.d] = true; } });
    var nJ = Object.keys(jrs).length, nJQ = Object.keys(jrs).filter(function (k) { return jrs[k]; }).length;
    var nEp = nbEpDe(base), nQ = base.filter(estClasseQ).length;
    var its = [];
    if (nEp) its.push(chiffre("e", nEp, L_EP(nEp), false));
    if (stats.victoires) its.push(chiffre("v", stats.victoires, L_V(stats.victoires), true));
    if (stats.podiums) its.push(chiffre("p", stats.podiums, L_P(stats.podiums), true));
    if (nQ) its.push(chiffre("q", nQ, L_Q(nQ), false));
    var anneau = null;
    if (nJ && nJQ) {
      var pct = Math.round(100 * nJQ / nJ), r = 48, ci = 2 * Math.PI * r;
      anneau = h("div", { role: "button", tabIndex: 0, "aria-expanded": detOuv === "pct", onClick: function () { setDetOuv(detOuv === "pct" ? null : "pct"); }, style: { textAlign: "center", flex: "0 0 auto", cursor: "pointer", padding: 4, borderRadius: 16, border: "1px solid " + (detOuv === "pct" ? "rgba(201,166,107,0.55)" : "transparent"), background: detOuv === "pct" ? "rgba(201,166,107,0.06)" : "transparent" } },
        h("svg", { width: 128, height: 128, viewBox: "0 0 120 120", role: "img", "aria-label": pct + " %" },
          h("circle", { cx: 60, cy: 60, r: r, fill: "none", stroke: "rgba(243,238,228,0.1)", strokeWidth: 9 }),
          h("circle", { cx: 60, cy: 60, r: r, fill: "none", stroke: CHAMP, strokeWidth: 9, strokeLinecap: "round", strokeDasharray: (ci * pct / 100).toFixed(1) + " " + ci.toFixed(1), transform: "rotate(-90 60 60)" }),
          h("text", { x: 60, y: 64, textAnchor: "middle", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 34, fill: IVOIRE }, pct + "%")),
        h("div", { style: { fontFamily: SANS, fontSize: 10.5, lineHeight: 1.3, marginTop: -2, color: MUET } },
          T("classé à ", "placed at ", "clasificado en ", "piazzato in ", "入賞 ", "platziert bei ", "مصنف في ", "获得名次 ", "geplaatst op ", "classificado em ", "placerad på ", "в призах на ", "w czołówce na ", "입상 ", "رتبه در ") + nJQ + " " + T("concours", "shows", "concursos", "concorsi", "大会", "Turnieren", "مسابقات", "场赛事", "wedstrijden", "concursos", "tävlingar", "турнирах", "zawodach", "대회", "مسابقه"),
          h("br"), SUR() + " " + nJ, h("span", { "aria-hidden": "true", style: { color: CHAMP, marginInlineStart: 4 } }, detOuv === "pct" ? "˄" : "˅")));
    }
    /* Détail déplié : sur quoi le chiffre est calculé. Les lignes cachées comptent dans les chiffres mais ne sont jamais listées. */
    var detail = (function () {
      if (!detOuv) return null;
      var court = function (ls) { return ls.slice().sort(function (a, b) { return String(b.d || "").localeCompare(String(a.d || "")) || ((a.pl || 99) - (b.pl || 99)); }); };
      var expl = null, titre = "", lignesD = [], nbCaches = 0;
      var avecRes = function (f) { return f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom); };
      var EXPL_Q = T("✓ = classé : dans le premier quart des partants (en préparatoire, seulement la 1re place).", "✓ = placed: in the top quarter of starters (in preparatory classes, 1st place only).");
      var propre = function (x) { var n = concoursC({ nom: x }); if (n && n === n.toUpperCase() && /[A-Z]/.test(n)) n = n.toLowerCase().replace(/(^|[\s'’-])(\S)/g, function (m, a1, a2) { return a1 + a2.toUpperCase(); }).replace(/ (De|Du|Des|La|Le|Les|Et|D’|D') ?/g, function (m) { return m.toLowerCase(); }); return n; };
      if (detOuv === "pct") {
        titre = T("Classé au moins une fois dans " + nJQ + " concours sur " + nJ, "Placed at least once in " + nJQ + " shows out of " + nJ);
        expl = EXPL_Q;
        Object.keys(jrs).sort().reverse().forEach(function (jr) {
          var ls = base.filter(function (f) { return f.d === jr && avecRes(f); });
          var vis = ls.filter(visL); if (!vis.length) { nbCaches++; return; }
          var best = vis.filter(estClasseQ).sort(function (a, b) { return a.pl - b.pl; })[0] || vis.slice().sort(function (a, b) { return (a.pl || 99) - (b.pl || 99); })[0];
          lignesD.push({ f: best, ok: jrs[jr], sous: ls.length > 1 ? ls.length + " " + L_EP(ls.length) : "" });
        });
      } else {
        var filt = detOuv === "v" ? function (f) { return f.pl === 1; } : detOuv === "p" ? function (f) { return f.pl != null && f.pl <= 3; } : detOuv === "q" ? estClasseQ : avecRes;
        var ls = base.filter(filt);
        titre = detOuv === "v" ? (MOI ? T("Tes victoires", "Your wins") : T("Ses victoires", "Wins")) : detOuv === "p" ? (MOI ? T("Tes podiums : 1er, 2e ou 3e", "Your podiums: 1st, 2nd or 3rd") : T("Ses podiums : 1er, 2e ou 3e", "Podiums: 1st, 2nd or 3rd")) : detOuv === "q" ? (MOI ? T("Tes classements", "Your placings") : T("Ses classements", "Placings")) : (MOI ? T("Toutes tes épreuves", "All your classes") : T("Toutes ses épreuves", "All classes"));
        if (detOuv === "q") expl = EXPL_Q;
        if (detOuv === "e") expl = T("Éliminations et abandons compris. ", "Eliminations and retirements included. ") + EXPL_Q;
        court(ls).forEach(function (f) { if (!visL(f)) { nbCaches++; return; } lignesD.push({ f: f, ok: (detOuv === "e") ? estClasseQ(f) : true }); });
      }
      return h("div", { key: "det", style: { marginTop: 14, padding: "14px 14px 6px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.22)", background: "rgba(243,238,228,0.03)" } },
        h("div", { style: { fontFamily: SERIF, fontSize: 19, lineHeight: 1.2, color: IVOIRE } }, titre),
        expl ? h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 11, lineHeight: 1.4, color: MUET } }, expl) : null,
        h("div", { style: { marginTop: 8 } }, lignesD.map(function (L, iL) {
          var f = L.f;
          return h("div", { key: "dl" + iL, role: "button", tabIndex: 0, onClick: function () { allerAuFort(f); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: iL ? "1px solid rgba(243,238,228,0.07)" : "none", cursor: "pointer" } },
            h("span", { "aria-hidden": "true", style: { flex: "0 0 16px", textAlign: "center", fontSize: 12, color: L.ok ? CHAMP : "rgba(243,238,228,0.3)" } }, L.ok ? "✓" : "–"),
            h("span", { style: { flex: 1, minWidth: 0 } },
              h("span", { dir: "auto", style: { display: "block", fontFamily: SANS, fontSize: 12.5, color: IVOIRE, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, propre(f.nom) || "—"),
              h("span", { dir: "auto", style: { display: "block", fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [f.d ? dateLisible(f.d) : "", L.sous || f.ep, L.sous ? "" : f.cav].filter(Boolean).join(" · "))),
            h("span", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 17, color: f.pl != null && f.pl <= 3 ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, resTxt(f) + (f.pl != null && f.part ? " / " + f.part : "")));
        })),
        nbCaches ? h("div", { style: { padding: "8px 0 6px", borderTop: "1px solid rgba(243,238,228,0.07)", fontFamily: SANS, fontSize: 11, color: MUET } },
          "+ " + nbCaches + " " + (nbCaches > 1 ? T("résultats cachés, comptés aussi", "hidden results, counted too") : T("résultat caché, compté aussi", "hidden result, counted too"))) : null);
    })();
    g.push(partie("p1", T("En bref", "In short", "En breve", "In breve", "ひと目で", "Kurz gesagt", "باختصار", "概览", "In het kort", "Em resumo", "I korthet", "Коротко", "W skrócie", "한눈에", "به‌طور خلاصه"), (MOI ? T("Ta saison, tes chiffres", "Your season, your numbers") : T("Sa saison, ses chiffres", "The season in numbers", "Su temporada, sus cifras", "La stagione, i numeri", "シーズンと数字", "Saison und Zahlen", "موسمه بالأرقام", "赛季与数据", "Seizoen en cijfers", "A temporada em números", "Säsongen i siffror", "Сезон в цифрах", "Sezon w liczbach", "시즌과 기록", "فصل و آمارش"))));
    g.push(h("div", { key: "p1c", "data-perf-chiffres": "1", style: { padding: "0 22px" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 16 } }, anneau,
        its.length ? h("div", { style: { flex: 1, display: "grid", gridTemplateColumns: its.length > 1 ? "1fr 1fr" : "1fr", gap: "12px 6px" } }, its) : null),
      detail,
      h("div", { style: { marginTop: 14 } }, barre(base))));

    /* 2 · Ses chevaux — magazine immersif */
    var chx = cavaliers.map(function (nm) { var ls = tous.filter(function (f) { return f.cav === nm; }); return { nm: nm, ls: ls, ch: modeCav ? parCheval(nm) : null, cid: (ls.filter(function (f) { return f.cavId; })[0] || {}).cavId || null }; }).filter(function (c) { return nbEpDe(c.ls.filter(visL)) > 0; });   /* 12/11 20h (Blandine « Ok vas y ») : un cheval dont tous les résultats sont cachés n a pas de bloc */
    if (chx.length) {
      g.push(sepA2("s2")); g.push(partie("p2", modeCav ? (MOI ? T("Tes chevaux", "Your horses") : T("Ses chevaux", "The horses", "Sus caballos", "I cavalli", "愛馬たち", "Die Pferde", "خيوله", "马匹", "De paarden", "Os cavalos", "Hästarna", "Лошади", "Konie", "말들", "اسب‌هایش")) : T("Ses cavaliers", "The riders"), modeCav ? T("Un couple, une histoire", "One pair, one story", "Una pareja, una historia", "Una coppia, una storia", "人馬の物語", "Ein Paar, eine Geschichte", "ثنائي وحكاية", "人马搭档的故事", "Een duo, een verhaal", "Uma dupla, uma história", "Ett par, en historia", "Пара и её история", "Para i jej historia", "한 쌍의 이야기", "یک زوج، یک داستان") : T("Un couple, une histoire", "One pair, one story")));
      var MV = (typeof window !== "undefined" && window.__magVar) || "C";   /* 12/11 23h55 (Blandine : « avec 5 chevaux ça n'en finit pas », 3-4 propositions) : A = actuel ; B carrousel ; C un grand + lignes ; D grille 2 ; E liste */
      var infoC = function (c) { var st = hypePerfStatsHisto(c.ls), ne = nbEpDe(c.ls); var ph = c.ch && c.ch.c && c.ch.c.photo_url;
        var ouvrir = c.ch ? function () { ouvrirFiche(c.ch.id); } : ((!modeCav && c.cid) ? function () { try { window.__perfCavalierId = c.cid; } catch (eC) { } setEcran("performances-cavalier"); } : undefined);
        var nq = c.ls.filter(estClasseQ).length;   /* 13/11 (Blandine : « plein de 4e sur 90… mais les classements ») */
        var txt = [ne ? ne + " " + L_EP(ne) : "", st.victoires ? st.victoires + " " + L_V(st.victoires) : "", st.podiums ? st.podiums + " " + L_P(st.podiums) : "", nq ? nq + " " + L_Q(nq) : ""].filter(Boolean);
        return { st: st, ne: ne, nq: nq, ph: ph, ouvrir: ouvrir, txt: txt, b: meilleur(c.ls) }; };
      var photoEntiere = function (ph, hauteur, rayon) { return h("div", { style: { height: hauteur, background: "#000", borderRadius: rayon || 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" } },
        ph ? h("img", { src: ph, alt: "", loading: "lazy", decoding: "async", style: { maxWidth: "100%", maxHeight: "100%", display: "block" } }) : h("div", { style: { width: "100%", height: "100%", background: "radial-gradient(120% 90% at 30% 20%, " + PETROLE2 + " 0%, #000 80%)" } })); };
      var miniC = function (I) { var m = []; if (I.ne) m.push(chiffreS("e", I.ne, L_EP(I.ne), false, 24)); if (I.st.victoires) m.push(chiffreS("v", I.st.victoires, L_V(I.st.victoires), true, 24)); if (I.st.podiums) m.push(chiffreS("p", I.st.podiums, L_P(I.st.podiums), true, 24)); if (I.nq) m.push(chiffreS("q", I.nq, L_Q(I.nq), false, 24)); return m; };
      if (MV === "B") {
        g.push(h("div", { key: "magB", "data-hscroll": "1", "data-noswipe": "1", style: { display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", padding: "18px 22px 4px", scrollPaddingInline: 22, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } }, chx.map(function (c, i) {
          var I = infoC(c);
          return h("div", { key: "b" + i, role: I.ouvrir ? "button" : undefined, onClick: I.ouvrir, style: { flex: "0 0 84%", scrollSnapAlign: "start", border: "1px solid rgba(201,166,107,0.28)", borderRadius: 20, overflow: "hidden", background: "#000", cursor: I.ouvrir ? "pointer" : "default" } },
            photoEntiere(I.ph, 230),
            h("div", { style: { padding: "12px 16px 16px" } },
              h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } },
                h("div", { style: { fontFamily: SERIF, fontSize: 30, lineHeight: 1.05, color: IVOIRE, overflowWrap: "anywhere" } }, c.nm),
                h("div", { style: { fontFamily: SERIF, fontSize: 13, color: "rgba(243,238,228,0.6)", letterSpacing: ".15em", direction: "ltr" } }, ("0" + (i + 1)).slice(-2) + " / " + ("0" + chx.length).slice(-2))),
              h("div", { style: { display: "flex", gap: 16, marginTop: 10 } }, miniC(I)),
              h("div", { style: { marginTop: 10 } }, barre(c.ls))));
        })));
      } else if (MV === "C" || MV === "E") {
        /* les 10 meilleurs : place d'abord, puis le plus de partants, puis le plus récent ; lignes cachées jamais montrées */
        var top10 = function (c) { return c.ls.filter(function (f) { return visL(f) && f.pl != null; }).slice().sort(function (a, b) { return (a.pl - b.pl) || ((b.part || 0) - (a.part || 0)) || String(b.d || "").localeCompare(String(a.d || "")); }).slice(0, 10); };
        var deplie = function (c, I) {
          var t = top10(c);
          return h("div", { style: { padding: "4px 0 10px" } },
            h("div", { style: { fontFamily: SANS, fontSize: 8.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: CHAMP, margin: "6px 0 2px" } }, t.length > 1 ? (MOI ? T("Vos " + t.length + " meilleurs résultats ensemble", "Your " + t.length + " best results together") : T("Ses " + t.length + " meilleurs résultats ensemble", "Their " + t.length + " best results together")) : (MOI ? T("Votre meilleur résultat ensemble", "Your best result together") : T("Son meilleur résultat ensemble", "Their best result together"))),
            t.map(function (f, j) { return h("div", { key: "t" + j, role: "button", tabIndex: 0, onClick: function (e) { e.stopPropagation(); allerAuFort(f); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: j ? "1px solid rgba(243,238,228,0.07)" : "none", cursor: "pointer" } },
              h("span", { style: { flex: "0 0 22px", fontFamily: SERIF, fontSize: 15, color: "rgba(243,238,228,0.45)", direction: "ltr" } }, String(j + 1)),
              h("span", { style: { flex: 1, minWidth: 0 } },
                h("span", { dir: "auto", style: { display: "block", fontFamily: SANS, fontSize: 12.5, color: IVOIRE, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [f.ep, (function (n) { if (n && n === n.toUpperCase() && /[A-Z]/.test(n)) n = n.toLowerCase().replace(/(^|[\s'’-])(\S)/g, function (m, a1, a2) { return a1 + a2.toUpperCase(); }).replace(/ (De|Du|Des|La|Le|Les|Et) /g, function (m) { return m.toLowerCase(); }); return n; })(concoursC(f))].filter(Boolean).join(" · ")),
                h("span", { style: { display: "block", fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 1 } }, f.d ? dateLisible(f.d) : "")),
              h("span", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 17, color: f.pl <= 3 ? CHAMP : IVOIRE, direction: "ltr", unicodeBidi: "isolate" } }, rangTxt(f.pl) + (f.part ? " / " + f.part : ""))); }),
            I.ouvrir ? h("div", { role: "button", tabIndex: 0, onClick: function (e) { e.stopPropagation(); I.ouvrir(); }, style: { textAlign: "end", paddingTop: 6, fontFamily: SANS, fontSize: 12, color: CHAMP, cursor: "pointer" } }, (modeCav ? T("Sa fiche", "Profile") : T("Ses performances", "Performances")) + " " + (rtl ? "‹" : "›")) : null);
        };
        var rangeeC = function (c, i) { var I = infoC(c);
          if (MV === "C") { var ouv = magOuv === c.nm;
            return h("div", { key: "r" + i, style: { borderTop: i ? "1px solid rgba(243,238,228,0.08)" : "none" } },
              h("div", { role: "button", tabIndex: 0, "aria-expanded": ouv, onClick: function () { setMagOuv(ouv ? null : c.nm); }, style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", cursor: "pointer" } },
                h("div", { style: { flex: "0 0 60px" } }, photoEntiere(I.ph, 52, 10)),
                h("div", { style: { flex: 1, minWidth: 0 } },
                  h("div", { style: { fontFamily: SERIF, fontSize: 19, lineHeight: 1.1, color: IVOIRE, overflowWrap: "anywhere" } }, c.nm),
                  h("div", { style: { fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 3 } }, I.txt.join(" · ")),
                  h("div", { style: { marginTop: 7 } }, barre(c.ls))),
                h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 14 } }, ouv ? "˄" : "˅")),
              ouv ? deplie(c, I) : null); }
          return h("div", { key: "r" + i, role: I.ouvrir ? "button" : undefined, onClick: I.ouvrir, style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderTop: i ? "1px solid rgba(243,238,228,0.08)" : "none", cursor: I.ouvrir ? "pointer" : "default" } },
            h("div", { style: { flex: "0 0 60px" } }, photoEntiere(I.ph, 52, 10)),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontFamily: SERIF, fontSize: 19, lineHeight: 1.1, color: IVOIRE, overflowWrap: "anywhere" } }, c.nm),
              h("div", { style: { fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 3 } }, I.txt.join(" · ")),
              h("div", { style: { marginTop: 7 } }, barre(c.ls))),
            I.ouvrir ? h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 18 } }, rtl ? "‹" : "›") : null); };
        if (MV === "C") {
          var I0 = infoC(chx[0]);
          var ouv0 = magOuv === chx[0].nm;
          g.push(h("div", { key: "magC0", style: { margin: "16px 22px 0", border: "1px solid rgba(201,166,107,0.28)", borderRadius: 16, overflow: "hidden", background: "#05090A" } },   /* 13/11 00h52 (« encore beaucoup trop gros ») : carte basse */
            h("div", { role: "button", tabIndex: 0, "aria-expanded": ouv0, onClick: function () { setMagOuv(ouv0 ? null : chx[0].nm); }, style: { display: "flex", alignItems: "center", gap: 12, padding: 10, cursor: "pointer" } },
              h("div", { style: { flex: "0 0 96px" } }, photoEntiere(I0.ph, 96, 12)),
              h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { style: { fontFamily: SANS, fontSize: 8.5, fontWeight: 600, letterSpacing: ".26em", textTransform: "uppercase", color: CHAMP } }, (MOI ? T("Ton partenaire principal", "Your main partner") : T("Son partenaire principal", "Main partner"))),
                h("div", { style: { fontFamily: SERIF, fontSize: 22, lineHeight: 1.05, marginTop: 3, color: IVOIRE, overflowWrap: "anywhere" } }, chx[0].nm),
                h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET, marginTop: 4, lineHeight: 1.35 } }, I0.txt.join(" · ")),
                h("div", { style: { marginTop: 6 } }, barre(chx[0].ls))),
              h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 13, alignSelf: "center" } }, ouv0 ? "˄" : "˅")),
            ouv0 ? h("div", { style: { padding: "0 12px 4px" } }, deplie(chx[0], I0)) : null));
          if (chx.length > 1) g.push(h("div", { key: "magCr", style: { padding: "12px 22px 0" } }, chx.slice(1).map(function (c, i) { return rangeeC(c, i); })));
        } else g.push(h("div", { key: "magE", style: { padding: "14px 22px 0" } }, chx.map(rangeeC)));
      } else if (MV === "D") {
        g.push(h("div", { key: "magD", style: { display: "grid", gridTemplateColumns: chx.length === 1 ? "1fr" : "1fr 1fr", gap: 10, padding: "18px 22px 0" } }, chx.map(function (c, i) {
          var I = infoC(c), plein = chx.length % 2 === 1 && i === chx.length - 1 && chx.length > 1;   /* dernier seul = pleine largeur (grille équilibrée) */
          return h("div", { key: "d" + i, role: I.ouvrir ? "button" : undefined, onClick: I.ouvrir, style: { gridColumn: plein ? "1 / -1" : undefined, border: "1px solid rgba(201,166,107,0.28)", borderRadius: 16, overflow: "hidden", background: "#000", cursor: I.ouvrir ? "pointer" : "default" } },
            photoEntiere(I.ph, plein ? 190 : 140),
            h("div", { style: { padding: "8px 11px 11px" } },
              h("div", { style: { fontFamily: SERIF, fontSize: 21, lineHeight: 1.1, color: IVOIRE, overflowWrap: "anywhere" } }, c.nm),
              h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET, marginTop: 3, lineHeight: 1.35 } }, I.txt.join(" · ")),
              h("div", { style: { marginTop: 7 } }, barre(c.ls))));
        })));
      }
      chx.forEach(function (c, i) {
        if (MV !== "A") return;
        var st = hypePerfStatsHisto(c.ls), ne = nbEpDe(c.ls), b = meilleur(c.ls);
        var ph = c.ch && c.ch.c && c.ch.c.photo_url;
        var ouvrir = c.ch ? function () { ouvrirFiche(c.ch.id); } : ((!modeCav && c.cid) ? function () { try { window.__perfCavalierId = c.cid; } catch (eC) { } setEcran("performances-cavalier"); } : undefined);
        var mini = [];
        if (ne) mini.push(chiffreS("e", ne, L_EP(ne), false, 28));
        if (st.victoires) mini.push(chiffreS("v", st.victoires, L_V(st.victoires), true, 28));
        if (st.podiums) mini.push(chiffreS("p", st.podiums, L_P(st.podiums), true, 28));
        g.push(h("div", { key: "mag" + i, "data-perf-cheval-mag": String(i), role: ouvrir ? "button" : undefined, tabIndex: ouvrir ? 0 : undefined, onClick: ouvrir, style: { position: "relative", marginTop: 18, background: "#000", overflow: "hidden", paddingBottom: 20, cursor: ouvrir ? "pointer" : "default" } },
          ph ? h("div", { style: { position: "relative", minHeight: 200, display: "flex", alignItems: "flex-end" } },   /* photo entière ; une photo très large laisse du noir en haut pour le numéro */
            h("img", { src: ph, alt: "", loading: "lazy", decoding: "async", style: { display: "block", width: "100%", height: "auto" } }),
            h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, #000 100%)" } })) : h("div", { style: { height: 130, background: "radial-gradient(120% 90% at 30% 20%, " + PETROLE2 + " 0%, #000 80%)" } }),
          h("div", { style: { position: "absolute", top: 16, insetInlineStart: 22, fontFamily: SERIF, fontSize: 15, color: "rgba(243,238,228,0.75)", letterSpacing: ".2em", textShadow: "0 1px 6px rgba(0,0,0,0.8)", direction: "ltr", unicodeBidi: "isolate" } }, ("0" + (i + 1)).slice(-2) + " / " + ("0" + chx.length).slice(-2)),
          h("div", { style: { position: "relative", margin: ph ? "-96px 22px 0" : "-50px 22px 0" } },
            h("div", { style: { fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: ".32em", textTransform: "uppercase", color: CHAMP } }, T("Avec", "With", "Con", "Con", "パートナー", "Mit", "مع", "搭档", "Met", "Com", "Med", "С", "Z", "함께", "با")),
            h("div", { style: { fontFamily: SERIF, fontSize: 44, lineHeight: 1, marginTop: 4, color: IVOIRE, overflowWrap: "anywhere" } }, c.nm),
            mini.length ? h("div", { style: { display: "flex", gap: 18, marginTop: 10 } }, mini) : null,
            b ? h("div", { style: { fontFamily: SANS, fontSize: 11, marginTop: 8, maxWidth: "72%", color: MUET, lineHeight: 1.4 } }, (MOI ? T("Ton meilleur : ", "Your best: ") : T("Son meilleur : ", "Best: ", "Su mejor: ", "Il migliore: ", "ベスト：", "Bestes: ", "أفضل نتيجة: ", "最佳：", "Beste: ", "Melhor: ", "Bäst: ", "Лучший: ", "Najlepszy: ", "최고: ", "بهترین: ")), h("span", { style: { color: CHAMP } }, rangTxt(b.pl)), [b.ep, b.d ? String(b.d).slice(0, 4) : ""].filter(Boolean).map(function (x) { return " · " + x; }).join("")) : null,
            h("div", { style: { marginTop: 10, maxWidth: "72%" } }, barre(c.ls)),
            ouvrir ? h("div", { style: { position: "absolute", insetInlineEnd: 0, bottom: 0, fontFamily: SANS, fontSize: 12, color: CHAMP } }, (modeCav ? T("Sa fiche", "Profile", "Su ficha", "La scheda", "プロフィール", "Profil", "ملفه", "档案", "Profiel", "Ficha", "Profil", "Профиль", "Profil", "프로필", "پرونده") : T("Ses performances", "Performances")) + (rtl ? " ‹" : " ›")) : null)));
      });
    }

    /* 3 · Récent */
    var recents = tous.filter(function (f) { return visL(f) && f.d && (f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom)); }).slice().sort(function (a, b) { return String(b.d).localeCompare(String(a.d)); }).slice(0, 3);
    if (recents.length) {
      g.push(sepA2("s3")); g.push(partie("p3", T("Récent", "Recent", "Reciente", "Recenti", "最近", "Zuletzt", "الأحدث", "最近", "Recent", "Recente", "Senaste", "Недавно", "Ostatnio", "최근", "اخیر"), (MOI ? T("Tes derniers concours", "Your latest shows") : T("Ses derniers concours", "Latest shows", "Sus últimos concursos", "Gli ultimi concorsi", "最近の大会", "Die letzten Turniere", "آخر مسابقاته", "最近的赛事", "Laatste wedstrijden", "Últimos concursos", "Senaste tävlingarna", "Последние турниры", "Ostatnie zawody", "최근 대회", "آخرین مسابقه‌هایش"))));
      g.push(h("div", { key: "p3c", style: { padding: "16px 22px 0" } }, recents.map(function (f, i) {
        var chP = parCheval(f.cav), ph = (chP && chP.c && chP.c.photo_url) || null;
        return carteBasse("rc" + i, TROPH(), h(React.Fragment, null, h("span", { style: { color: f.pl === 1 ? CHAMP : IVOIRE } }, resTxt(f)), f.ep ? " · " + f.ep : ""),
          [concoursC(f), f.d ? dateLisible(f.d) : "", f.part ? SUR() + " " + f.part : ""].filter(Boolean).join(" · "), ph, function () { allerAuFort(f); });
      })));
    }

    /* 4 · Souvenirs */
    var fs3 = forts.slice(0, 8);   /* 13/11 : jusqu à 8 (plus haute épreuve + plus beaux podiums) */
    if (fs3.length) {
      g.push(sepA2("s4")); g.push(partie("p4", T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "思い出", "Erinnerungen", "ذكريات", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억", "خاطره‌ها"), (MOI ? T("Tes plus beaux moments", "Your finest moments") : T("Ses plus beaux moments", "Finest moments", "Sus mejores momentos", "I momenti più belli", "最高の瞬間", "Die schönsten Momente", "أجمل لحظاته", "最美好的时刻", "Mooiste momenten", "Os melhores momentos", "Finaste stunderna", "Лучшие моменты", "Najpiękniejsze chwile", "최고의 순간", "زیباترین لحظه‌هایش"))));
      g.push(h("div", { key: "p4c", style: { padding: "16px 22px 0" } }, fs3.map(function (f, i) {
        var pf = photosForts[i], chP = parCheval(f.cav);
        var ph = (pf && !pf.video && pf.url) || (chP && chP.c && chP.c.photo_url) || null;
        var annee = f.an || (f.d ? String(f.d).slice(0, 4) : "");
        var hTxt = (f.haut != null && !/\d\s*(m|cm)\b|\dm\d/i.test(f.ep || "")) ? String(f.haut.toFixed(2)).replace(".", ",") + " m" : "";   /* pas de doublon si la hauteur est déjà écrite */
        var propreC = function (n) { if (n && n === n.toUpperCase() && /[A-Z]/.test(n)) n = n.toLowerCase().replace(/(^|[\s'’\/-])(\S)/g, function (m, a1, a2) { return a1 + a2.toUpperCase(); }).replace(/ (De|Du|Des|La|Le|Les|Et|En|Sur) /g, function (m) { return m.toLowerCase(); }); return n; };
        return carteBasse("sv" + i, ETOI(), h(React.Fragment, null, f.plusHaute ? h("span", { style: { display: "block", fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: CHAMP, marginBottom: 3 } }, MOI ? T("Ta plus haute épreuve", "Your highest class") : T("Sa plus haute épreuve", "Highest class")) : null, (f.pl == null ? h("span", { style: { color: CHAMP } }, T("Parcours couru", "Completed round")) : h("span", { style: { color: CHAMP } }, rangTxt(f.pl))), (f.part && f.pl != null) ? " " + SUR() + " " + f.part : ""),
          h(React.Fragment, null, [f.ep, hTxt].filter(Boolean).join(" · ") || concoursC(f), h("br"), [propreC(concoursC(f)), annee, f.cav ? nomCourt(f.cav) : ""].filter(Boolean).join(" · ")), ph, function () { allerAuFort(f); });
      })));
    }
    if (peutForts) g.push(h("div", { key: "ajf", style: { textAlign: "center", marginTop: fs3.length ? 4 : 18 } }, h("button", { type: "button", onClick: function () { setChoixFortOuvert(true); }, style: { minHeight: 36, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.55)", background: "transparent", color: "#E6CF9C", fontFamily: SANS, fontSize: 11.5, fontWeight: 600, cursor: "pointer" } }, T("Choisir ses moments forts", "Choose highlights", "Elegir momentos", "Scegli i momenti", "ハイライトを選ぶ", "Highlights wählen", "اختيار اللحظات", "选择精彩时刻", "Hoogtepunten kiezen", "Escolher momentos", "Välj höjdpunkter", "Выбрать моменты", "Wybierz momenty", "하이라이트 선택", "انتخاب لحظه‌ها"))));
    if (teamInfo) g.push(elG[4]);

    /* 13/11 00h46 (Blandine : « tous tes résultats… c'est énorme, ça ressemble à rien, fais-moi 8 propositions ») —
       8 formes ; points de qualification seulement pour la saison en cours. */
    function archives(AV) {
      var arSel = arSelSt[0], setArSel = arSelSt[1], arOuv = arOuvSt[0], setArOuv = arOuvSt[1];
      var S = (AV === "CH" ? chx.map(function (c) { return { cle: "ch:" + c.nm, lib: c.nm, lignes: c.ls, cheval: c }; }) : saisons).map(function (sx) { var ls = sx.lignes.filter(function (f) { return visL(f) && (f.pl != null || f.statut === "el" || f.statut === "ab" || (f.statut === "" && !!f.nom)); }).sort(function (a, b) { return String(b.d || "").localeCompare(String(a.d || "")) || ((a.pl || 99) - (b.pl || 99)); }); return { cle: sx.cle, lib: sx.lib, ls: ls, toutes: sx.lignes, cheval: sx.cheval || null }; }).filter(function (x) { return x.ls.length; });
      if (!S.length) return null;
      var propreA = function (n) { n = concoursC({ nom: n }); if (n && n === n.toUpperCase() && /[A-Z]/.test(n)) n = n.toLowerCase().replace(/(^|[\s'’\/-])(\S)/g, function (m, a1, a2) { return a1 + a2.toUpperCase(); }).replace(/ (De|Du|Des|La|Le|Les|Et|En|Sur) /g, function (m) { return m.toLowerCase(); }); return n; };
      var resA = function (f) { return f.pl != null ? rangTxt(f.pl) + (f.part ? " / " + f.part : "") : resTxt(f); };
      var colR = function (f) { return f.pl != null && f.pl <= 3 ? CHAMP : (f.pl != null ? IVOIRE : "rgba(243,238,228,0.45)"); };
      var dateC = function (d) { try { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || ""); return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toLocaleDateString(LOCALES[langue] || "fr-FR", AV === "CH" ? { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" } : { day: "numeric", month: "short", timeZone: "UTC" }) : ""; } catch (e) { return ""; } };   /* par cheval : plusieurs années -> l'année aussi */
      var ligneA = function (f, i, sansDate) {
        return h("div", { key: "la" + i, role: "button", tabIndex: 0, onClick: function () { allerAuFort(f); }, style: { display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: i ? "1px solid rgba(243,238,228,0.07)" : "none", cursor: "pointer" } },
          sansDate ? null : h("span", { style: { flex: AV === "CH" ? "0 0 58px" : "0 0 46px", fontFamily: SANS, fontSize: 11.5, color: MUET, lineHeight: 1.25 } }, dateC(f.d)),
          h("span", { style: { flex: 1, minWidth: 0 } },
            h("span", { dir: "auto", style: { display: "block", fontFamily: SANS, fontSize: 13.5, color: IVOIRE, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, propreA(f.nom)),
            h("span", { dir: "auto", style: { display: "block", fontFamily: SANS, fontSize: 12, color: "rgba(243,238,228,0.8)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [f.ep, f.cav ? nomCourt(f.cav) : ""].filter(Boolean).join(" · "))),
          h("span", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 17, color: colR(f), direction: "ltr", unicodeBidi: "isolate", textAlign: "end" } }, resA(f)));
      };
      var resume = function (x) { var st = hypePerfStatsHisto(x.ls), n = x.ls.length, nq = x.ls.filter(estClasseQ).length; return [n + " " + L_EP(n), st.victoires ? st.victoires + " " + L_V(st.victoires) : "", st.podiums ? st.podiums + " " + L_P(st.podiums) : "", nq ? nq + " " + L_Q(nq) : ""].filter(Boolean).join(" · "); };
      /* points de qualification : saison en cours seulement */
      var cour = AV === "CH" ? null : S.filter(function (x) { return Number(x.cle) === saisonCour; })[0];
      var pts = null;
      if (cour) { var tot = 0, parF = {}; cour.toutes.forEach(function (f) { if (f.pts != null && !isNaN(f.pts)) { tot += f.pts; var k = (typeof hypePerfFamille === "function") ? hypePerfFamille(f.ep) : "—"; parF[k] = (parF[k] || 0) + f.pts; } });
        if (tot > 0) pts = h("div", { key: "pq", style: { margin: "14px 22px 4px", padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.28)", display: "flex", alignItems: "center", gap: 14 } },
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: CHAMP } }, T("Points de qualification", "Qualification points") + " · " + cour.lib),
            h("div", { style: { fontFamily: SANS, fontSize: 11, color: MUET, marginTop: 4 } }, Object.keys(parF).map(function (k) { return k + " " + Math.round(parF[k] * 100) / 100 + " pts"; }).join(" · "))),
          h("div", { style: { fontFamily: SERIF, fontSize: 30, color: "#E6CF9C", lineHeight: 1, direction: "ltr" } }, String(Math.round(tot * 100) / 100), h("span", { style: { fontFamily: SANS, fontSize: 11, marginInlineStart: 4 } }, "pts"))); }
      var sel = (arSel && S.some(function (x) { return x.cle === arSel; })) ? arSel : S[0].cle;
      var X = S.filter(function (x) { return x.cle === sel; })[0];
      var pastille = function (x, petit) { var on = x.cle === sel; return h("button", { key: "pa" + x.cle, type: "button", onClick: function () { setArSel(x.cle); }, style: { flex: "0 0 auto", minHeight: 34, padding: "0 14px", borderRadius: 999, border: on ? "1.5px solid " + CHAMP : "1px solid rgba(243,238,228,0.16)", background: on ? "rgba(201,166,107,0.12)" : "transparent", color: on ? "#E6CF9C" : MUET, fontFamily: SANS, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", direction: "ltr" } }, petit ? x.lib.replace(/^(\d{4})-\d{2}(\d{2})$/, "$1-$2") : x.lib); };
      var rail = function (k, items) { return h("div", { key: k, "data-hscroll": "1", "data-noswipe": "1", style: { display: "flex", gap: 8, overflowX: "auto", padding: "14px 22px 4px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } }, items); };
      var bloc = function (k, enfants, pad) { return h.apply(null, ["div", { key: k, style: { padding: pad || "6px 22px 0" } }].concat(enfants)); };
      var out = [];
      if (pts) out.push(pts);
      if (AV === "A") {   /* lignes fines par saison, dépliables */
        out.push(bloc("A", S.map(function (x, i) { var o = arOuv[x.cle] != null ? arOuv[x.cle] : i === 0;
          return h("div", { key: "a" + x.cle, style: { borderTop: "1px solid rgba(243,238,228,0.1)" } },
            h("div", { role: "button", tabIndex: 0, onClick: function () { var n = Object.assign({}, arOuv); n[x.cle] = !o; setArOuv(n); }, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", cursor: "pointer" } },
              h("span", { style: { flex: "0 0 92px", fontFamily: SERIF, fontSize: 18, color: IVOIRE, direction: "ltr" } }, x.lib),
              h("span", { style: { flex: 1, minWidth: 0 } }, h("span", { style: { display: "block", fontFamily: SANS, fontSize: 10.5, color: MUET, marginBottom: 5 } }, resume(x)), barre(x.ls)),
              h("span", { "aria-hidden": "true", style: { color: CHAMP, fontSize: 13 } }, o ? "˄" : "˅")),
            o ? h("div", { style: { paddingBottom: 8 } }, x.ls.map(function (f, j) { return ligneA(f, j); })) : null); })));
      } else if (AV === "B") {   /* pastilles d'années + liste simple */
        out.push(rail("Br", S.map(function (x) { return pastille(x); })));
        out.push(bloc("B", [h("div", { key: "bs", style: { fontFamily: SANS, fontSize: 11, color: MUET, padding: "8px 0 6px" } }, resume(X)), h("div", { key: "bl" }, X.ls.map(function (f, j) { return ligneA(f, j); }))]));
      } else if (AV === "C") {   /* liste continue, intertitre doré par saison */
        out.push(bloc("C", S.map(function (x) { return h("div", { key: "c" + x.cle },
          h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "18px 0 6px", borderBottom: "1px solid rgba(201,166,107,0.3)" } },
            h("span", { style: { fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".25em", color: CHAMP, direction: "ltr" } }, x.lib),
            h("span", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET } }, resume(x))),
          x.ls.map(function (f, j) { return ligneA(f, j); })); })));
      } else if (AV === "D") {   /* pastilles d'années + filtre par cheval avec photo */
        out.push(rail("Dr", S.map(function (x) { return pastille(x, true); })));
        var chD = []; X.ls.forEach(function (f) { if (f.cav && chD.indexOf(f.cav) < 0) chD.push(f.cav); });
        var chSel = arOuv.__ch && chD.indexOf(arOuv.__ch) >= 0 ? arOuv.__ch : null;
        if (chD.length > 1) out.push(rail("Dc", [null].concat(chD).map(function (c) { var on = c === chSel; var cx = c ? parCheval(c) : null; var ph = cx && cx.c && cx.c.photo_url;
          return h("button", { key: "dc" + (c || "tous"), type: "button", onClick: function () { setArOuv(Object.assign({}, arOuv, { __ch: c })); }, style: { flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 6, minHeight: 32, padding: ph ? "0 12px 0 3px" : "0 12px", borderRadius: 999, border: on ? "1.5px solid " + CHAMP : "1px solid rgba(243,238,228,0.14)", background: "transparent", color: on ? "#E6CF9C" : MUET, fontFamily: SANS, fontSize: 11.5, cursor: "pointer", whiteSpace: "nowrap" } },
            ph ? h("img", { src: ph, alt: "", style: { width: 26, height: 26, borderRadius: "50%", objectFit: "cover" } }) : null, c ? nomCourt(c) : T("Tous", "All")); })));
        out.push(bloc("D", X.ls.filter(function (f) { return !chSel || f.cav === chSel; }).map(function (f, j) { return ligneA(f, j); })));
      } else if (AV === "E") {   /* frise verticale : un point par concours */
        out.push(bloc("E", S.map(function (x) { return h("div", { key: "e" + x.cle, style: { position: "relative", paddingInlineStart: 22 } },
          h("div", { "aria-hidden": "true", style: { position: "absolute", insetInlineStart: 6, top: 0, bottom: 0, width: 1, background: "rgba(201,166,107,0.3)" } }),
          h("div", { style: { position: "relative", fontFamily: SERIF, fontSize: 20, color: IVOIRE, padding: "14px 0 4px", direction: "ltr" } }, h("span", { "aria-hidden": "true", style: { position: "absolute", insetInlineStart: -21, top: 21, width: 11, height: 11, borderRadius: "50%", background: CHAMP } }), x.lib, h("span", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET, marginInlineStart: 10 } }, resume(x))),
          x.ls.map(function (f, j) { return h("div", { key: "ef" + j, style: { position: "relative" } }, h("span", { "aria-hidden": "true", style: { position: "absolute", insetInlineStart: -19, top: 17, width: 7, height: 7, borderRadius: "50%", background: f.pl != null && f.pl <= 3 ? CHAMP : "rgba(243,238,228,0.25)" } }), ligneA(f, j)); })); })));
      } else if (AV === "F") {   /* tableau des saisons, chiffres alignés ; la saison choisie s'ouvre dessous */
        out.push(bloc("F", [h("div", { key: "fh", style: { display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: 4, padding: "8px 0 6px", fontFamily: SANS, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: MUET2 } }, h("span", null, T("Saison", "Season")), h("span", { style: { textAlign: "center" } }, T("Épr.", "Cl.")), h("span", { style: { textAlign: "center" } }, T("Vict.", "Wins")), h("span", { style: { textAlign: "center" } }, T("Podiums", "Podiums")))]
          .concat(S.map(function (x) { var st = hypePerfStatsHisto(x.ls), on = x.cle === sel; return h("div", { key: "f" + x.cle },
            h("div", { role: "button", tabIndex: 0, onClick: function () { setArSel(x.cle); }, style: { display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: 4, alignItems: "center", padding: "10px 0", borderTop: "1px solid rgba(243,238,228,0.08)", cursor: "pointer", color: on ? "#E6CF9C" : IVOIRE } },
              h("span", { style: { fontFamily: SERIF, fontSize: 17, direction: "ltr" } }, x.lib),
              h("span", { style: { textAlign: "center", fontFamily: SERIF, fontSize: 18 } }, x.ls.length),
              h("span", { style: { textAlign: "center", fontFamily: SERIF, fontSize: 18, color: st.victoires ? CHAMP : MUET2 } }, st.victoires || "–"),
              h("span", { style: { textAlign: "center", fontFamily: SERIF, fontSize: 18, color: st.podiums ? CHAMP : MUET2 } }, st.podiums || "–")),
            on ? h("div", { style: { padding: "0 0 10px 10px", borderInlineStart: "1px solid rgba(201,166,107,0.4)" } }, x.ls.map(function (f, j) { return ligneA(f, j); })) : null); }))));
      } else if (AV === "G") {   /* cartes de saison qui défilent, la liste dessous */
        out.push(rail("Gr", S.map(function (x) { var st = hypePerfStatsHisto(x.ls), on = x.cle === sel; return h("div", { key: "g" + x.cle, role: "button", tabIndex: 0, onClick: function () { setArSel(x.cle); }, style: { flex: "0 0 128px", padding: "12px 12px 12px", borderRadius: 16, border: on ? "1.5px solid " + CHAMP : "1px solid rgba(201,166,107,0.22)", background: on ? "rgba(201,166,107,0.08)" : "#0B1114", cursor: "pointer" } },
          h("div", { style: { fontFamily: SERIF, fontSize: 19, color: on ? "#E6CF9C" : IVOIRE, direction: "ltr" } }, x.lib),
          h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET, margin: "4px 0 8px" } }, x.ls.length + " " + L_EP(x.ls.length) + (st.victoires ? " · " + st.victoires + " " + L_V(st.victoires) : "")),
          barre(x.ls)); })));
        out.push(bloc("G", X.ls.map(function (f, j) { return ligneA(f, j); })));
      } else if (AV === "H") {   /* pastilles d'années, regroupé par concours */
        out.push(rail("Hr", S.map(function (x) { return pastille(x, true); })));
        var parC = [], idx = {}; X.ls.forEach(function (f) { var k = f.d + "|" + String(f.nom).toLowerCase(); if (idx[k] == null) { idx[k] = parC.length; parC.push({ d: f.d, nom: f.nom, ls: [] }); } parC[idx[k]].ls.push(f); });
        out.push(bloc("H", parC.map(function (c, i) { return h("div", { key: "h" + i, style: { padding: "10px 0", borderTop: i ? "1px solid rgba(243,238,228,0.08)" : "none" } },
          h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 } }, h("span", { style: { fontFamily: SERIF, fontSize: 18, color: IVOIRE, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, propreA(c.nom)), h("span", { style: { flex: "0 0 auto", fontFamily: SANS, fontSize: 10.5, color: MUET2 } }, dateC(c.d))),
          c.ls.map(function (f, j) { return h("div", { key: "hf" + j, role: "button", tabIndex: 0, onClick: function () { allerAuFort(f); }, style: { display: "flex", justifyContent: "space-between", gap: 10, padding: "4px 0 0 12px", cursor: "pointer" } },
            h("span", { style: { fontFamily: SANS, fontSize: 11.5, color: MUET, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, [f.ep, f.cav ? nomCourt(f.cav) : ""].filter(Boolean).join(" · ")),
            h("span", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 16, color: colR(f), direction: "ltr" } }, resA(f))); })); })));
      }
      /* 13/11 00h50 (Blandine : « vraiment différents… modernes et magazine, comme la page de l'équipe, les médias, la Vidéothèque ») */
      var chevalPrincipal = function (x) { var n = {}; x.ls.forEach(function (f) { if (f.cav) n[f.cav] = (n[f.cav] || 0) + 1; }); var best = Object.keys(n).sort(function (a, b) { return n[b] - n[a]; })[0]; var cx = best ? parCheval(best) : null; return { nom: best || "", ph: (cx && cx.c && cx.c.photo_url) || "" }; };
      var meilleurS = function (x) { return x.ls.filter(function (f) { return f.pl != null; }).sort(function (a, b) { return (a.pl - b.pl) || ((b.part || 0) - (a.part || 0)); })[0] || null; };
      var anCourt = function (lib) { return String(lib).replace(/^(\d{4})-\d{2}(\d{2})$/, "$1–$2"); };
      var ouvrirS = function (x, i) { var o = arOuv[x.cle] != null ? arOuv[x.cle] : false; return [o, function () { var n = Object.assign({}, arOuv); n[x.cle] = !o; setArOuv(n); }]; };
      var listeOuv = function (x) { var st = hypePerfStatsHisto(x.ls), nq = x.ls.filter(estClasseQ).length, t = [st.victoires ? st.victoires + " " + L_V(st.victoires) : "", st.podiums ? st.podiums + " " + L_P(st.podiums) : "", nq ? nq + " " + L_Q(nq) : ""].filter(Boolean).join(" · ");
        /* 13/11 01h22 (Blandine : « je vois plus où choisir ce que je veux afficher ») : les pastilles d affichage de l ancienne liste
           (Tous, Classés, Podiums, Sans faute) reviennent dans le déroulé ; le choix devient sa vue par défaut, comme avant. */
        var cleF = filtres[x.cle] || vueDefaut || "tous"; if (cleF === "sf" && !estProprio) cleF = "tous";
        var nbF = {}; FILTRES_SEC.forEach(function (fx) { nbF[fx[0]] = filtrer(x.ls, fx[0]).length; });
        var pastilles = h("div", { style: { display: "flex", gap: 6, padding: "2px 0 8px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" } },
          FILTRES_SEC.filter(function (fx) { return fx[0] === "tous" || fx[0] === cleF || nbF[fx[0]]; }).map(function (fx) {
            var on = cleF === fx[0];
            return h("button", { key: "pf" + x.cle + fx[0], type: "button", onClick: function () { var n = Object.assign({}, filtres); n[x.cle] = fx[0]; setFiltres(n); try { if (typeof hypeVueResPoser === "function") hypeVueResPoser(fx[0]); } catch (eVp) { } }, style: { flex: "0 0 auto", minHeight: 30, padding: "0 10px", borderRadius: 999, border: on ? "1.5px solid #C9A66B" : "1px solid rgba(243,238,228,0.18)", background: "transparent", color: on ? "#F3EEE4" : "rgba(243,238,228,0.82)", fontFamily: SANS, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" } }, fx[1] + " (" + nbF[fx[0]] + ")");
          }));
        var lsF = filtrer(x.ls, cleF);
        return h("div", { style: { padding: "8px 22px 10px" } }, t ? h("div", { style: { fontFamily: SANS, fontSize: 12.5, color: CHAMP, padding: "2px 0 8px" } }, t) : null, pastilles, lsF.length ? lsF.map(function (f, j) { return ligneA(f, j); }) : h("div", { style: { padding: "12px 0", fontFamily: SANS, fontSize: 12, color: MUET, textAlign: "center" } }, T("Aucun résultat pour ce filtre.", "No result for this filter."))); };   /* 13/11 01h14 : les chiffres ne s affichent qu une fois deroule ; ligne grise plus grosse et plus claire */
      var photoBloc = function (ph, hauteur, cote) { return h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, bottom: 0, [cote]: 0, width: "62%", display: "flex", justifyContent: cote === "right" ? "flex-end" : "flex-start", alignItems: "center", pointerEvents: "none" } },
        ph ? h("img", { src: ph, alt: "", loading: "lazy", style: { maxHeight: "100%", maxWidth: "100%", height: hauteur, objectFit: "contain", display: "block", mixBlendMode: "lighten", WebkitMaskImage: "linear-gradient(" + (cote === "right" ? "90deg" : "270deg") + ", transparent 0%, #000 45%)", maskImage: "linear-gradient(" + (cote === "right" ? "90deg" : "270deg") + ", transparent 0%, #000 45%)" } }) : null); };
      var courbe = function (k, inv) { return h("svg", { key: k, viewBox: "0 0 390 26", preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: 26 } }, h("path", { d: inv ? "M0 4 C 130 26, 260 26, 390 4" : "M0 22 C 130 0, 260 0, 390 22", fill: "none", stroke: "rgba(201,166,107,0.55)", strokeWidth: 1 })); };
      if (AV === "I" || AV === "CH") {   /* couvertures de saison en miroir, courbe dorée entre elles */
        S.forEach(function (x, i) { var P = x.cheval ? { nom: "", ph: (x.cheval.ch && x.cheval.ch.c && x.cheval.ch.c.photo_url) || "" } : chevalPrincipal(x), st = hypePerfStatsHisto(x.ls), droite = i % 2 === 0, oo = ouvrirS(x, i);
          if (i) out.push(courbe("ci" + i, i % 2 === 0));
          out.push(h("div", { key: "I" + x.cle },
            h("div", { role: "button", tabIndex: 0, onClick: oo[1], style: { position: "relative", height: 128, overflow: "hidden", cursor: "pointer", background: "#000" } },   /* 13/11 01h14 (Blandine : « on laisse juste la saison, voir les résultats ») ; hauteur d origine gardee (01h17) */
              photoBloc(P.ph, 128, droite ? "right" : "left"),
              h("div", { style: { position: "absolute", top: 0, bottom: 0, [droite ? "left" : "right"]: 22, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: droite ? "flex-start" : "flex-end", textAlign: droite ? "start" : "end", maxWidth: "56%" } },
                h("div", { style: { fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: ".3em", textTransform: "uppercase", color: CHAMP } }, x.cheval ? (modeCav ? T("Cheval", "Horse") : T("Cavalier", "Rider")) : T("Saison", "Season")),
                h("div", { style: { fontFamily: SERIF, fontSize: x.cheval ? 24 : 26, lineHeight: 1.05, color: IVOIRE, marginTop: 3, direction: x.cheval ? undefined : "ltr", overflowWrap: "anywhere" } }, x.cheval ? x.lib : anCourt(x.lib)),
                h("div", { style: { fontFamily: SANS, fontSize: 11, color: CHAMP, marginTop: 8 } }, oo[0] ? "˄" : (T("Voir les résultats", "See results") + " ˅")))),
            oo[0] ? listeOuv(x) : null)); });
      } else if (AV === "J") {   /* affiches de saison qui défilent, la liste dessous */
        out.push(rail("Jr", S.map(function (x) { var P = chevalPrincipal(x), on = x.cle === sel, b = meilleurS(x);
          return h("div", { key: "j" + x.cle, role: "button", tabIndex: 0, onClick: function () { setArSel(x.cle); }, style: { flex: "0 0 150px", position: "relative", height: 210, borderRadius: 18, overflow: "hidden", background: "#000", border: on ? "1.5px solid " + CHAMP : "1px solid rgba(201,166,107,0.22)", cursor: "pointer" } },
            P.ph ? h("img", { src: P.ph, alt: "", loading: "lazy", style: { position: "absolute", top: 8, left: 0, right: 0, margin: "0 auto", maxWidth: "100%", maxHeight: 130, objectFit: "contain", display: "block" } }) : null,
            h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.92) 72%)" } }),
            h("div", { style: { position: "absolute", left: 12, right: 12, bottom: 12 } },
              h("div", { style: { fontFamily: SERIF, fontSize: 26, lineHeight: 1, color: on ? "#E6CF9C" : IVOIRE, direction: "ltr" } }, anCourt(x.lib)),
              h("div", { style: { fontFamily: SANS, fontSize: 10, color: MUET, marginTop: 4 } }, x.ls.length + " " + L_EP(x.ls.length)),
              b ? h("div", { style: { fontFamily: SERIF, fontSize: 15, color: CHAMP, marginTop: 3 } }, resA(b)) : null)); })));
        out.push(h("div", { key: "Jt", style: { padding: "14px 22px 0", fontFamily: SERIF, fontSize: 22, color: IVOIRE } }, T("Saison ", "Season ") + X.lib));
        out.push(bloc("J", X.ls.map(function (f, j) { return ligneA(f, j); })));
      } else if (AV === "K") {   /* sommaire de magazine : grands numéros, filets, petite photo ronde */
        out.push(bloc("K", S.map(function (x, i) { var P = chevalPrincipal(x), st = hypePerfStatsHisto(x.ls), oo = ouvrirS(x, i);
          return h("div", { key: "k" + x.cle, style: { borderTop: i ? "1px solid rgba(201,166,107,0.2)" : "none" } },
            h("div", { role: "button", tabIndex: 0, onClick: oo[1], style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 0", cursor: "pointer" } },
              h("span", { style: { flex: "0 0 40px", fontFamily: SERIF, fontSize: 34, color: "rgba(201,166,107,0.75)", lineHeight: 1, direction: "ltr" } }, ("0" + (i + 1)).slice(-2)),
              h("span", { style: { flex: 1, minWidth: 0 } },
                h("span", { style: { display: "block", fontFamily: SERIF, fontSize: 22, color: IVOIRE, lineHeight: 1.1, direction: "ltr" } }, x.lib),
                h("span", { style: { display: "block", fontFamily: SANS, fontSize: 10.5, color: MUET, marginTop: 3 } }, resume(x) + (P.nom ? " · " + nomCourt(P.nom) : ""))),
              P.ph ? h("span", { style: { flex: "0 0 64px", width: 64, height: 52, borderRadius: 12, background: "#000", border: "1px solid rgba(201,166,107,0.3)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" } }, h("img", { src: P.ph, alt: "", loading: "lazy", style: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" } })) : null),   /* photo entière */
            oo[0] ? h("div", { style: { paddingBottom: 10 } }, x.ls.map(function (f, j) { return ligneA(f, j); })) : null); })));
      } else if (AV === "L") {   /* la plus belle de chaque saison en vedette, le reste à déplier */
        out.push(bloc("L", S.map(function (x, i) { var b = meilleurS(x) || x.ls[0], cx = b && b.cav ? parCheval(b.cav) : null, ph = cx && cx.c && cx.c.photo_url, oo = ouvrirS(x, i), reste = x.ls.length - 1;
          return h("div", { key: "l" + x.cle, style: { marginBottom: 14 } },
            h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "4px 0 8px" } },
              h("span", { style: { fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: ".28em", color: CHAMP, direction: "ltr" } }, x.lib),
              h("span", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET } }, resume(x))),
            h("div", { role: "button", tabIndex: 0, onClick: function () { allerAuFort(b); }, style: { position: "relative", minHeight: 108, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(201,166,107,0.28)", background: "linear-gradient(165deg, rgba(40,74,86,0.45) 0%, #0B1114 60%)", cursor: "pointer" } },
              photoBloc(ph, 108, "right"),
              h("div", { style: { position: "relative", padding: "14px 16px", maxWidth: "62%" } },
                h("div", { style: { fontFamily: SERIF, fontSize: 32, lineHeight: 1, color: b && b.pl != null && b.pl <= 3 ? CHAMP : IVOIRE, direction: "ltr" } }, b ? resA(b) : ""),
                h("div", { style: { fontFamily: SANS, fontSize: 11.5, color: IVOIRE, marginTop: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, b ? propreA(b.nom) : ""),
                h("div", { style: { fontFamily: SANS, fontSize: 10.5, color: MUET, marginTop: 2 } }, b ? [b.ep, b.cav ? nomCourt(b.cav) : ""].filter(Boolean).join(" · ") : ""))),
            reste > 0 ? h("div", { role: "button", tabIndex: 0, onClick: oo[1], style: { textAlign: "center", padding: "8px 0 0", fontFamily: SANS, fontSize: 11.5, color: CHAMP, cursor: "pointer" } }, oo[0] ? "˄" : ("+ " + reste + " " + (reste > 1 ? T("autres résultats", "other results") : T("autre résultat", "other result")) + " ˅")) : null,
            oo[0] ? h("div", null, x.ls.filter(function (f) { return f !== b; }).map(function (f, j) { return ligneA(f, j); })) : null); })));
      } else if (AV === "M") {   /* mosaïque de saisons, photo entière, grille équilibrée */
        out.push(h("div", { key: "Mg", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "14px 22px 0" } }, S.map(function (x, i) { var P = chevalPrincipal(x), on = x.cle === sel, st = hypePerfStatsHisto(x.ls), plein = S.length % 2 === 1 && i === 0;
          return h("div", { key: "m" + x.cle, role: "button", tabIndex: 0, onClick: function () { setArSel(x.cle); }, style: { gridColumn: plein ? "1 / -1" : undefined, position: "relative", height: plein ? 170 : 150, borderRadius: 16, overflow: "hidden", background: "#000", border: on ? "1.5px solid " + CHAMP : "1px solid rgba(201,166,107,0.2)", cursor: "pointer" } },
            P.ph ? h("img", { src: P.ph, alt: "", loading: "lazy", style: { position: "absolute", top: 0, bottom: 0, right: 0, height: "100%", maxWidth: plein ? "60%" : "100%", objectFit: "contain", display: "block", opacity: on ? 1 : 0.75 } }) : null,
            h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)" } }),
            h("div", { style: { position: "absolute", left: 12, bottom: 10, right: 10 } },
              h("div", { style: { fontFamily: SERIF, fontSize: plein ? 30 : 24, lineHeight: 1, color: on ? "#E6CF9C" : IVOIRE, direction: "ltr" } }, anCourt(x.lib)),
              h("div", { style: { fontFamily: SANS, fontSize: 10, color: MUET, marginTop: 3 } }, x.ls.length + " " + L_EP(x.ls.length) + (st.victoires ? " · " + st.victoires + " " + L_V(st.victoires) : "")))); })));
        out.push(h("div", { key: "Mt", style: { padding: "16px 22px 0", fontFamily: SERIF, fontSize: 22, color: IVOIRE } }, T("Saison ", "Season ") + X.lib));
        out.push(bloc("M", X.ls.map(function (f, j) { return ligneA(f, j); })));
      }
      return h.apply(null, ["div", { key: "arch" + AV, "data-perf-archives": AV }].concat(out));
    }
    /* 5 · Archives — par saison / par cheval */
    var d = [];
    var vueA = archSt[0], setVueA = archSt[1];
    if (!largeP) d.push(sepA2("s5"));
    d.push(partie("p5", T("Archives", "Archive", "Archivo", "Archivio", "アーカイブ", "Archiv", "الأرشيف", "档案", "Archief", "Arquivo", "Arkiv", "Архив", "Archiwum", "기록 보관", "بایگانی"), (MOI ? T("Tous tes résultats", "All your results") : T("Tous ses résultats", "All results", "Todos sus resultados", "Tutti i risultati", "全成績", "Alle Ergebnisse", "كل نتائجه", "所有成绩", "Alle resultaten", "Todos os resultados", "Alla resultat", "Все результаты", "Wszystkie wyniki", "모든 성적", "همهٔ نتایجش"))));
    var bascBtn = function (cle, lib) { var on = vueA === cle; return h("button", { key: "b" + cle, type: "button", onClick: function () { setVueA(cle); }, style: { flex: 1, minHeight: 38, borderRadius: 999, border: "none", background: on ? "rgba(201,166,107,0.16)" : "transparent", color: on ? "#E6CF9C" : MUET, fontFamily: SANS, fontSize: 12, fontWeight: 600, cursor: "pointer", boxShadow: on ? "inset 0 0 0 1px rgba(201,166,107,0.55)" : "none" } }, lib); };
    if (chx.length > 1) d.push(h("div", { key: "basc", style: { display: "flex", gap: 4, padding: 4, margin: "16px 22px 14px", borderRadius: 999, border: "1px solid rgba(243,238,228,0.12)" } },
      bascBtn("saison", T("Par saison", "By season", "Por temporada", "Per stagione", "シーズン別", "Nach Saison", "حسب الموسم", "按赛季", "Per seizoen", "Por temporada", "Per säsong", "По сезонам", "Według sezonu", "시즌별", "بر اساس فصل")),
      chx.length > 1 ? bascBtn("cheval", (modeCav ? T("Par cheval", "By horse", "Por caballo", "Per cavallo", "馬別", "Nach Pferd", "حسب الحصان", "按马匹", "Per paard", "Por cavalo", "Per häst", "По лошадям", "Według konia", "말별", "بر اساس اسب") : T("Par cavalier", "By rider"))) : null));
    if (vueA === "cheval" && chx.length > 1) {
      d.push(archives("CH"));   /* 13/11 01h02 (Blandine : « par cheval… 15 pages de résultats ») : bandeaux par cheval, fermés, qui se déroulent */
    } else {
      d.push(archives((typeof window !== "undefined" && window.__archVar) || "I"));   /* 13/11 00h55 (Blandine « ok ») : couvertures de saison (I) */
    }
    d.push(elD[5]); d.push(elD[7]); d.push(elD[8]);
    if (!modeCav) { d.push(actionsCompactes); d.push(outilCapture); }
    elG = [modeCav ? menuCav : null].concat(g);
    elD = d;
  })();
  return h("div", { "data-ecran": "performances-cheval", style: racineSt },
    heroCav || hero,
    largeP ? h("div", { "data-perf-colonnes": "1", style: { display: "grid", gridTemplateColumns: ordiP ? "minmax(0, 1fr) minmax(0, 1.25fr)" : "minmax(0, 1fr) minmax(0, 1.1fr)", gap: ordiP ? 28 : 18, alignItems: "start", padding: ordiP ? "0 14px" : "0 4px" } },
      h.apply(null, ["div", { style: { minWidth: 0 } }].concat(elG, [blocVideo])),
      h.apply(null, ["div", { style: { minWidth: 0, paddingTop: 6 } }].concat(elD)))
      : h.apply(null, [React.Fragment, null].concat(elG, elD, [blocVideo])),
    typeof FinPageHype === "function" ? h(FinPageHype, { key: "finPerf" }) : null,
    /* feuille : ajouter un moment fort */
    choixFortOuvert ? feuille(h(React.Fragment, null,
      h("div", { style: { fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: IVOIRE, textAlign: "center" } }, T("Ajouter un moment fort", "Add a highlight", "Añadir un momento", "Aggiungi un momento", "ハイライトを追加", "Moment hinzufügen", "إضافة لحظة بارزة", "添加精彩时刻", "Hoogtepunt toevoegen", "Adicionar um momento marcante", "Lägg till en höjdpunkt", "Добавить яркий момент", "Dodaj najważniejszy moment", "하이라이트 추가", "افزودن یک لحظهٔ مهم")),
      h("div", { style: { margin: "6px 0 14px", fontFamily: SANS, fontSize: 11.5, color: MUET, textAlign: "center", lineHeight: 1.5 } }, T("Touche un résultat pour le mettre en vitrine. Un moment choisi à la main passe devant le choix automatique.", "Tap a result to showcase it. A hand-picked highlight comes before the automatic choice.", "Toca un resultado para destacarlo. Un momento elegido a mano pasa delante de la selección automática.", "Tocca un risultato per metterlo in vetrina. Un momento scelto a mano precede la scelta automatica.", "結果をタップしてハイライトに追加。手動で選んだものが自動選択より優先されます。", "Tippe ein Ergebnis an, um es hervorzuheben. Ein von Hand gewählter Moment steht vor der automatischen Auswahl.", "المس نتيجة لإبرازها. اللحظة المختارة يدويا تتقدم على الاختيار التلقائي.", "点一条成绩把它放进展示柜。手动选择的时刻优先于自动选择。", "Tik op een resultaat om het in de spotlight te zetten. Een handmatig gekozen hoogtepunt gaat voor op de automatische keuze.", "Toque em um resultado para colocá-lo em destaque. Um momento escolhido à mão tem prioridade sobre a escolha automática.", "Tryck på ett resultat för att lyfta fram det. En handplockad höjdpunkt går före det automatiska valet.", "Нажми на результат, чтобы выставить его на витрину. Момент, выбранный вручную, идёт раньше автоматического выбора.", "Dotknij wyniku, aby wystawić go na widok. Moment wybrany ręcznie ma pierwszeństwo przed wyborem automatycznym.", "결과를 눌러 쇼케이스에 올려 보세요. 직접 고른 순간이 자동 선택보다 먼저 표시돼요.", "روی یک نتیجه بزن تا آن را در ویترین بگذاری. لحظه‌ای که با دست انتخاب شده پیش از انتخاب خودکار می‌آید.")),
      h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
        (function () {
          var deja = {}; forts.forEach(function (f) { if (f && f.id) deja[f.id] = 1; });
          var cands = tous.filter(function (f) { return f.id && !deja[f.id]; }).slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); }).slice(0, 80);
          if (!cands.length) return h("div", { style: { color: MUET, fontFamily: SANS, fontSize: 12.5, textAlign: "center", padding: "18px 0" } }, T("Aucun autre résultat à proposer.", "No other result to offer.", "Ningún otro resultado.", "Nessun altro risultato.", "他に結果はありません。", "Kein weiteres Ergebnis.", "لا توجد نتيجة أخرى.", "没有其他可推荐的成绩了。", "Geen ander resultaat om voor te stellen.", "Nenhum outro resultado a sugerir.", "Inga fler resultat att föreslå.", "Других результатов для предложения нет.", "Brak innych wyników do zaproponowania.", "제안할 다른 결과가 없어요.", "نتیجهٔ دیگری برای پیشنهاد نیست."));
          return cands.map(function (f) {
            var loc = fortsLocal[f.id]; var fxC = loc ? !!loc.fx : !!f.fx;
            return h("div", { key: "cf" + f.id, role: "button", onClick: function () { poserFort(f, { fort_force: true, fort_exclu: false }); setChoixFortOuvert(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 2px", minHeight: 48, borderBottom: "1px solid rgba(243,238,228,0.06)", cursor: "pointer" } },
              h("div", { style: { flex: "0 0 84px", fontFamily: SANS, fontSize: 10.5, color: MUET2, lineHeight: 1.3 } }, f.d ? dateLisible(f.d) : ""),
              h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { style: { fontFamily: SANS, fontSize: 13, fontWeight: 600, color: IVOIRE, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.nom || ""),
                h("div", { style: { fontFamily: SANS, fontSize: 11, color: MUET, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, (f.ep || "") + (f.cav ? " · " + (nomCourt(f.cav)) : "") + (fxC ? " · " + T("retiré", "removed", "quitado", "rimosso", "外した", "entfernt", "مُزال", "已移除", "verwijderd", "removido", "borttaget", "убрано", "usunięto", "삭제됨", "حذف‌شده") : ""))),
              h("div", { style: { flex: "0 0 auto", fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: "#E6CF9C" } }, rangTxt(f.pl) + (f.part ? " / " + f.part : "")));
          });
        })()),
      boutonFermer(function () { setChoixFortOuvert(false); })), function () { setChoixFortOuvert(false); }, "fChoix") : null,
    /* feuille : photo ou video d un moment fort */
    pickerJeton ? feuille(h(React.Fragment, null,
      h("div", { style: { fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: IVOIRE, textAlign: "center" } }, T("Photo ou vidéo de ce moment", "Photo or video for this highlight", "Foto o vídeo de este momento", "Foto o video di questo momento", "この瞬間の写真・動画", "Foto oder Video für diesen Moment", "صورة أو فيديو لهذه اللحظة", "这个时刻的照片或视频", "Foto of video van dit moment", "Foto ou vídeo deste momento", "Foto eller video från den här stunden", "Фото или видео для этого момента", "Zdjęcie lub film z tego momentu", "이 순간의 사진 또는 영상", "عکس یا ویدیوی این لحظه")),
      h("div", { style: { margin: "6px 0 14px", fontFamily: SANS, fontSize: 11.5, color: MUET, textAlign: "center" } }, T("Choisis parmi les photos et vidéos déjà envoyées sur ce cheval.", "Pick from the photos and videos already sent for this horse.", "Elige entre las fotos y vídeos ya enviados de este caballo.", "Scegli tra le foto e i video già inviati per questo cavallo.", "この馬に送信済みの写真や動画から選びます。", "Wähle aus den bereits gesendeten Fotos und Videos dieses Pferdes.", "اختر من الصور والفيديوهات المرسلة لهذا الحصان.", "从已上传到这匹马的照片和视频中选择。", "Kies uit de foto’s en video’s die al zijn verstuurd voor dit paard.", "Escolha entre as fotos e vídeos já enviados para este cavalo.", "Välj bland de foton och videor som redan skickats för den här hästen.", "Выбери из фото и видео, уже загруженных для этой лошади.", "Wybierz spośród zdjęć i filmów już wysłanych dla tego konia.", "이 말에 이미 올린 사진과 영상 중에서 고르세요.", "از میان عکس‌ها و ویدیوهایی که قبلاً برای این اسب فرستاده شده انتخاب کن.")),
      h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
        (mediasTous === null) ? h("div", { style: { color: MUET2, fontFamily: SANS, fontSize: 12.5, textAlign: "center", padding: "22px 0" } }, "…")
          : (!mediasTous.length ? h("div", { style: { color: MUET2, fontFamily: SANS, fontSize: 12.5, fontStyle: "italic", textAlign: "center", padding: "22px 0" } }, T("Aucune photo ni vidéo pour l'instant.", "No photo or video yet.", "Aún ninguna foto ni vídeo.", "Ancora nessuna foto o video.", "まだ写真も動画もありません。", "Noch kein Foto oder Video.", "لا توجد صور أو فيديوهات بعد.", "暂时没有照片或视频。", "Nog geen foto of video.", "Nenhuma foto nem vídeo por enquanto.", "Inga foton eller videor ännu.", "Пока нет ни фото, ни видео.", "Na razie brak zdjęć i filmów.", "아직 사진이나 영상이 없어요.", "فعلاً هیچ عکس یا ویدیویی نیست."))
            : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 } },
              mediasTous.map(function (u, i) {
                var vid = typeof estUrlVideo === "function" && estUrlVideo(u);
                return h("div", { key: "pm" + i, role: "button", onClick: function () { definirMedia(pickerJeton, u); }, style: { position: "relative", paddingBottom: "100%", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: PETROLE } },
                  vid ? hypeMiniatureVideo(u, { largeur: 400, style: { position: "absolute", inset: 0 } }) : h("img", { src: u, alt: "", loading: "lazy", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
                  vid ? h("div", { style: { position: "absolute", insetInlineEnd: 4, bottom: 4, fontSize: 13 } }, "▶️") : null);
              })))),
      mfMedias[pickerJeton] ? h("button", { type: "button", onClick: function () { definirMedia(pickerJeton, null); }, style: { marginTop: 12, width: "100%", minHeight: 44, borderRadius: 999, border: "1px solid rgba(243,238,228,0.18)", background: "transparent", color: MUET, fontFamily: SANS, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, T("Revenir à la photo automatique", "Back to the automatic photo", "Volver a la foto automática", "Torna alla foto automatica", "自動の写真に戻す", "Zurück zum automatischen Foto", "العودة إلى الصورة التلقائية", "恢复自动照片", "Terug naar de automatische foto", "Voltar à foto automática", "Tillbaka till det automatiska fotot", "Вернуться к автоматическому фото", "Wróć do zdjęcia automatycznego", "자동 사진으로 되돌리기", "بازگشت به عکس خودکار")) : null,
      boutonFermer(function () { setPickerJeton(null); })), function () { setPickerJeton(null); }, "fPick") : null,
    (modeCav && ajoutOuvert && typeof HypeAjoutResultatCavaliere === "function") ? h(HypeAjoutResultatCavaliere, { onFermer: function () { setAjoutOuvert(false); }, onAjoute: function (av) { setRelireCav(function (n) { return n + 1; }); if (av) { try { window.alert(av === "nom" ? "R\u00e9sultat enregistr\u00e9. Il n'appara\u00eetra ici qu'une fois ton nom FFE reli\u00e9 (Mon compte \u2192 \u00ab Mes r\u00e9sultats de concours \u00bb)." : "R\u00e9sultat enregistr\u00e9, mais pas encore rattach\u00e9 \u00e0 ton compte : " + av); } catch (eAl) { } } } })   /* (g9) mode cavalier : le formulaire historique de la page cavaliere (memes messages) */
      : ajoutOuvert && typeof FeuilleAjoutResultatV2 === "function" ? portail(h(FeuilleAjoutResultatV2, { cheval: chV, moi: moi, lignes: lignes || [], nomDefaut: (app.profil && [app.profil.prenom, app.profil.nom].filter(Boolean).join(" ")) || "", T: T, onFermer: function () { setAjoutOuvert(false); }, onEnregistre: function () { setAjoutOuvert(false); setRelire(function (n) { return n + 1; }); annonce(T("Résultat ajouté 🏆", "Result added 🏆", "Resultado añadido 🏆", "Risultato aggiunto 🏆", "結果を追加しました 🏆", "Ergebnis hinzugefügt 🏆", "تمت إضافة النتيجة 🏆", "成绩已添加 🏆", "Resultaat toegevoegd 🏆", "Resultado adicionado 🏆", "Resultat tillagt 🏆", "Результат добавлен 🏆", "Wynik dodany 🏆", "결과를 추가했어요 🏆", "نتیجه افزوده شد 🏆")); } }), "fAjout") : null,
    videoPlein,
      feuilleCapture,
      ligneEdit && typeof FeuilleAjoutResultatV2 === "function" ? portail(h(FeuilleAjoutResultatV2, { cheval: modeCav ? { dbId: ligneEdit.cheval_id, nom: ligneEdit.cavalier || "" } : chV, moi: moi, lignes: lignes || [], ligneEdition: ligneEdit, nomDefaut: "", T: T, onFermer: function () { setLigneEdit(null); }, onEnregistre: function () { setLigneEdit(null); setRelire(function (n) { return n + 1; }); annonce(T("Résultat modifié ✓", "Result updated ✓", "Resultado modificado ✓", "Risultato modificato ✓", "結果を更新しました ✓", "Ergebnis geändert ✓", "تم تعديل النتيجة ✓", "成绩已修改 ✓", "Resultaat gewijzigd ✓", "Resultado atualizado ✓", "Resultat ändrat ✓", "Результат изменён ✓", "Wynik zmieniony ✓", "결과를 수정했어요 ✓", "نتیجه ویرایش شد ✓")); } }), "fModif") : null,
            fortGere ? feuille(h(React.Fragment, null,
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE } }, rangTxt(fortGere.f.pl) + (fortGere.f.part ? " / " + fortGere.f.part : "")),
        h("div", { style: { marginTop: 2, marginBottom: 14, fontFamily: SANS, fontSize: 12, color: MUET } }, [fortGere.f.ep, String(fortGere.f.nom || "").replace(/^\s*CSO\s+/i, "")].filter(Boolean).join(" \u2022 ")),
        fortGere.peutPhoto ? h("button", { type: "button", "data-perf-fort-photo": "1", onClick: function () { var fx = fortGere.f; setFortGere(null); setMediasTous(null); setPickerJeton(fx.jeton); }, style: { width: "100%", minHeight: 46, marginBottom: 8, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Changer la photo", "Change the photo", "Cambiar la foto", "Cambia la foto", "写真を変更", "Foto ändern", "تغيير الصورة", "更换照片", "Foto wijzigen", "Trocar a foto", "Byt foto", "Сменить фото", "Zmień zdjęcie", "사진 변경", "تغییر عکس")) : null,
        fortGere.peutRetirer ? h("button", { type: "button", "data-perf-fort-retirer": "1", onClick: function () { var fx = fortGere.f, ffx = fortGere.ff; setFortGere(null); poserFort(fx, ffx ? { fort_force: false } : { fort_exclu: true }); }, style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(243,238,228,0.2)", background: "transparent", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Retirer des moments forts", "Remove from highlights", "Quitar de los momentos", "Rimuovi dai momenti forti", "ハイライトから外す", "Aus den Highlights entfernen", "إزالة من اللحظات البارزة", "从精彩时刻中移除", "Verwijderen uit de hoogtepunten", "Remover dos momentos marcantes", "Ta bort från höjdpunkterna", "Убрать из ярких моментов", "Usuń z najważniejszych momentów", "하이라이트에서 빼기", "حذف از لحظه‌های مهم")) : null,
        h("div", { style: { marginTop: 8, fontFamily: SANS, fontSize: 11, color: MUET2, textAlign: "center" } }, T("Le résultat reste dans ses saisons.", "The result stays in its seasons.", "El resultado sigue en sus temporadas.", "Il risultato resta nelle sue stagioni.", "成績はシーズン一覧に残ります。", "Das Ergebnis bleibt in seinen Saisons.", "تبقى النتيجة في مواسمها.", "这条成绩仍保留在它的赛季里。", "Het resultaat blijft in zijn seizoenen staan.", "O resultado continua nas temporadas.", "Resultatet finns kvar i sina säsonger.", "Результат остаётся в своих сезонах.", "Wynik zostaje w jego sezonach.", "결과는 해당 시즌에 그대로 남아요.", "نتیجه در فصل‌هایش باقی می‌ماند.")),
        boutonFermer(function () { setFortGere(null); })), function () { setFortGere(null); }, "fFort") : null,
      menuOuvert ? feuille(h(React.Fragment, null,
        h("div", { style: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: IVOIRE, marginBottom: 12 } }, nomCh),
        h("button", { type: "button", "data-perf-partager": "1", onClick: partagerCheval, style: { width: "100%", minHeight: 46, marginBottom: 8, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Partager", "Share", "Compartir", "Condividi", "共有", "Teilen", "مشاركة", "分享", "Delen", "Compartilhar", "Dela", "Поделиться", "Udostępnij", "공유하기", "اشتراک‌گذاری")),
        h("button", { type: "button", onClick: function () { setMenuOuvert(false); try { window.__chevalOuvert = id; } catch (eO) { } setEcran("cheval"); }, style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(16,26,29,0.85)", color: IVOIRE, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Voir sa fiche", "View profile", "Ver su ficha", "Vedi la scheda", "プロフィールを見る", "Steckbrief ansehen", "عرض بطاقته", "查看它的档案", "Profiel bekijken", "Ver a ficha", "Se profilen", "Смотреть карточку", "Zobacz jego kartę", "프로필 보기", "دیدن برگه‌اش")),
        boutonFermer(function () { setMenuOuvert(false); })), function () { setMenuOuvert(false); }, "fMenu") : null,
      toast ? portail(h("div", { style: { position: "fixed", left: 16, right: 16, bottom: "calc(24px + env(safe-area-inset-bottom))", zIndex: 9000, padding: "12px 16px", borderRadius: 14, background: "rgba(16,26,29,0.96)", border: "1px solid " + FILET, color: IVOIRE, fontFamily: SANS, fontSize: 13, textAlign: "center" } }, toast), "fToast") : null);
}
window.HypePerfCheval = { PerfCheval: EcranPerformancesCheval };
})();
