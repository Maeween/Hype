/* HYPE ▸ 30/10/2026 — FICHE CHEVAL V2 (EcranChevalV2), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~83 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranChevalV2() {
  var h = React.createElement;
  var ctx = useApp();
  var tr = ctx.tr, setEcran = ctx.setEcran;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var rtl = ctx.langue === "ar";
  /* Palette V2 (direction validee) : noir legerement vert, ivoire, champagne mat. Aucun cyan. */
  var FOND = "#070A08", IVOIRE = "#F2EBDD", IVOIRE_DOUX = "rgba(242,235,221,0.62)", CHAMPAGNE = "#C9A96E";
  var SERIF = "'Cormorant Garamond', Georgia, serif", SANS = "'Montserrat', system-ui, sans-serif";

  /* (739) L IDENTIFIANT — ordre corrige (regle du chantier referencement) : le cheval ouvert
     (window.__chevalOuvert, pose par toute l appli ET par les adresses #cheval-<id> / #chevalv2-<id>)
     d abord ; sinon l adresse de test #chevalv2-<id> ; sinon l ancien lien #cheval-<id>.
     Puis un etat local : ouvrir un ancetre ou un poulain depuis la V2 change de cheval SUR PLACE
     (aller sur le meme ecran ne fait rien dans l appli). */
  var idSt = React.useState(function () {
    try { if (typeof window !== "undefined" && window.__chevalOuvert) return String(window.__chevalOuvert); } catch (eW) { }
    try {
      var hs = (typeof location !== "undefined" && location.hash) || "";
      var m2 = hs.match(/chevalv2-([\w-]+)/); if (m2 && m2[1]) return m2[1];
      var m1 = hs.match(/cheval-([\w-]+)/); if (m1 && m1[1]) return m1[1];
    } catch (eH) { }
    return "";
  });
  var id = idSt[0], setIdCourant = idSt[1];
  function ouvrirAutreCheval(idN) {
    if (!idN || String(idN) === String(id)) return;
    try { window.__chevalOuvert = idN; } catch (eO) { }
    setIdCourant(String(idN));
    try { window.scrollTo(0, 0); } catch (eS) { }
  }

  var etSt = React.useState({ charge: false, cheval: null, erreur: null });
  var etat = etSt[0], setEtat = etSt[1];
  React.useEffect(function () {
    var vivant = true;
    setEtat({ charge: false, cheval: null, erreur: null });
    hypeLireFicheCheval(id).then(function (r) {
      if (!vivant) return;
      setEtat({ charge: true, cheval: (r && r.cheval) || null, erreur: (r && r.erreur) || null });
    }).catch(function (eC) {
      if (vivant) setEtat({ charge: true, cheval: null, erreur: String((eC && eC.message) || eC || "?") });
    });
    return function () { vivant = false; };
  }, [id]);

  /* (736) qui regarde : sert seulement a choisir la photo (perso ou officielle). */
  var moiSt = React.useState(null); var moi = moiSt[0], setMoi = moiSt[1];
  React.useEffect(function () {
    var vivantU = true;
    try { if (typeof utilisateurActuel === "function") utilisateurActuel().then(function (u) { if (vivantU) setMoi(u || null); }).catch(function () { }); } catch (eU) { }
    return function () { vivantU = false; };
  }, []);
  /* (736) LA PHOTO — meme regle que l ancienne fiche (photoCh = photoPerso || c.photo) :
     1. photo perso de la cavaliere, rangee en base (chevaux_histoires.photo_url), SEULEMENT si le
        cheval n est pas le sien (decision du 02/09, conservee le 08/10) ;
     2. sinon la photo gardee dans ce telephone (hype_cheval_photo_<id>), comme l ancienne fiche ;
     3. sinon la photo officielle du cheval, puis celle de la fiche de demonstration, puis le portrait Hype. */
  var phLoc = (function () { try { return localStorage.getItem("hype_cheval_photo_" + id) || ""; } catch (eL) { return ""; } })();
  var ppSt = React.useState(""); var photoPersoBase = ppSt[0], setPhotoPersoBase = ppSt[1];
  var chV = etat.cheval;
  var estMien = !!(moi && chV && chV.ligne && chV.ligne.user_id === moi.id);
  var gc2St = React.useState(false); var gereClubCh2 = gc2St[0], setGereClubCh2 = gc2St[1];   /* (820) responsable du club du cheval */
  React.useEffect(function () { var aG = true; setGereClubCh2(false); var dG = chV && chV.dbId; if (dG && moi) hypePeutGererClubCheval(dG).then(function (ok) { if (aG) setGereClubCh2(!!ok); }); return function () { aG = false; }; }, [chV && chV.dbId, moi && moi.id]);
  React.useEffect(function () {
    var vivantP = true;
    setPhotoPersoBase("");
    if (!moi || !chV || !chV.dbId || estMien || typeof histoirePersoCheval !== "function") return;
    histoirePersoCheval(chV.dbId).then(function (rP) {
      if (vivantP && rP && rP.data && rP.data.photo_url) setPhotoPersoBase(String(rP.data.photo_url));
    }).catch(function () { });
    return function () { vivantP = false; };
  }, [moi && moi.id, chV && chV.dbId, estMien]);

  function retour() {
    /* meme regle que l ancienne fiche : page precedente si elle existe, sinon Mon cavalier */
    if (ctx && ctx.peutReculer && typeof ctx.retourEcran === "function") ctx.retourEcran(); else setEcran("moncavalier");
  }

  var message = null;
  if (!etat.charge) {
    message = null;   /* (736) pendant le chargement : le haut de page reste sombre, sans texte */
  } else if (!chV) {
    message = (etat.erreur === "introuvable")
      ? T("Cheval introuvable.", "Horse not found.", "Caballo no encontrado.", "Cavallo non trovato.", "馬が見つかりません。", "Pferd nicht gefunden.", "لم يتم العثور على الحصان.", "找不到这匹马。", "Paard niet gevonden.", "Cavalo não encontrado.", "Hästen hittades inte.", "Лошадь не найдена.", "Nie znaleziono konia.", "말을 찾을 수 없어요.")
      : T("Impossible de charger ce cheval : ", "Could not load this horse: ", "No se pudo cargar este caballo: ", "Impossibile caricare questo cavallo: ", "この馬を読み込めません：", "Dieses Pferd konnte nicht geladen werden: ", "تعذّر تحميل هذا الحصان: ", "无法加载这匹马：", "Dit paard kan niet worden geladen: ", "Não foi possível carregar este cavalo: ", "Det gick inte att ladda hästen: ", "Не удалось загрузить эту лошадь: ", "Nie udało się wczytać tego konia: ", "이 말을 불러오지 못했어요: ") + (etat.erreur === "reseau" ? "—" : String(etat.erreur || "?"));
  }

  /* (736) Donnees du haut de page, UNIQUEMENT quand elles existent (rien d invente). */
  var ligne = (chV && chV.ligne) || {};
  var secours = (chV && chV.secours) || {};
  var og = (function () { try { var o = ligne.origines; if (typeof o === "string") o = JSON.parse(o); return (o && typeof o === "object") ? o : (secours.origines || {}); } catch (eO) { return secours.origines || {}; } })() || {};
  /* le nom : alias FFE s il existe (regle du 02/09 : alias > nom ; le surnom perso est retire de la V2), sinon le nom */
  var nomAffiche = (chV && (String(ligne.alias || "").trim() || chV.nom)) || "";
  var race = String(ligne.race || "").trim();
  /* sexe : range dans les origines (decision du 08/10, saisie au build « sexe ») — rien tant qu il n est pas renseigne */
  var SEXES = {
    hongre: T("Hongre", "Gelding", "Castrado", "Castrone", "せん馬", "Wallach", "مخصي", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마"),
    jument: T("Jument", "Mare", "Yegua", "Giumenta", "牝馬", "Stute", "فرس", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말"),
    entier: T("Entier", "Stallion", "Entero", "Stallone", "牡馬", "Hengst", "فحل", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마")
  };
  var sexe = SEXES[String(og.sexe || "").toLowerCase().trim()] || "";
  /* annee : seulement depuis la date de naissance exacte (origines.naissance). Pas deduite de l age. */
  var annee = (function () { var m = String(og.naissance || "").match(/^(\d{4})(-|$)/); return m ? m[1] : ""; })();   /* (740) une annee seule (date incomplete) est aussi une donnee exacte */
  var sousTitre = [race, sexe, annee].filter(Boolean).join("  ·  ");

  var photoBrute = photoPersoBase || phLoc || ligne.photo_url || secours.photo || (typeof UV3_H1 !== "undefined" ? UV3_H1 : "");
  var photoSrc = (typeof grandeImageHype === "function" && photoBrute) ? grandeImageHype(photoBrute, 1600) : photoBrute;

  /* (738) RECTO DE LA CARTE IDENTITE — donnees, UNIQUEMENT quand elles existent.
     · age : calcule depuis la date de naissance exacte (origines.naissance, annees revolues) ;
       sinon la colonne chevaux.age (meme valeur que l ancienne fiche) ; sinon rien ;
     · sexe : origines.sexe (vide aujourd hui, saisie au build « sexe ») ;
     · resume des origines : pere x pere de mere, lus EXACTEMENT comme l ancienne fiche
       (origines.pedigree, sinon origines.pere / origines.mere).
     Race et annee ne sont pas repetees : elles sont deja dans le haut de page. */
  var ageAns = (function () {
    var m = String(og.naissance || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      var n = new Date(), a = n.getFullYear() - Number(m[1]);
      if ((n.getMonth() + 1) < Number(m[2]) || ((n.getMonth() + 1) === Number(m[2]) && n.getDate() < Number(m[3]))) a--;
      if (a >= 0 && a < 60) return a;
    }
    var mA = String(og.naissance || "").match(/^(\d{4})$/);   /* (740) annee seule : meme calcul que hypeNaissanceNormaliser */
    if (mA) { var aA = new Date().getFullYear() - Number(mA[1]); if (aA >= 0 && aA < 60) return aA; }
    var v = parseInt(String(ligne.age == null ? "" : ligne.age), 10);
    return (isFinite(v) && v >= 0 && v < 60) ? v : null;
  })();
  var ageTxt = (ageAns == null) ? "" : (ageAns <= 1
    ? T(ageAns + " an", ageAns + " year", ageAns + " año", ageAns + " anno", ageAns + "歳", ageAns + " Jahr", ageAns + " سنة", ageAns + " 岁", ageAns + " jaar", ageAns + " ano", (ageAns + " år"), (ageAns + " год"), (ageAns + " rok"), (ageAns + "세"))
    : T(ageAns + " ans", ageAns + " years", ageAns + " años", ageAns + " anni", ageAns + "歳", ageAns + " Jahre", ageAns + " سنوات", ageAns + " 岁", ageAns + " jaar", ageAns + " anos", (ageAns + " år"), (ageAns + " " + (ageAns % 10 === 1 && ageAns % 100 !== 11 ? "год" : (ageAns % 10 >= 2 && ageAns % 10 <= 4 && (ageAns % 100 < 10 || ageAns % 100 >= 20)) ? "года" : "лет")), (ageAns + ((ageAns % 10 >= 2 && ageAns % 10 <= 4 && (ageAns % 100 < 10 || ageAns % 100 >= 20)) ? " lata" : " lat")), (ageAns + "세")));
  var pdgR = og.pedigree || { pere: og.pere || null, mere: og.mere || null };
  function nomDeR(x) { if (!x) return ""; if (typeof x === "string") return x.trim(); return String(x.nom || "").trim(); }
  var pereR = nomDeR(pdgR.pere);
  var pmR = nomDeR(pdgR.mere && pdgR.mere.pere) || nomDeR(og.mere && og.mere.pere);
  var resumeOrig = (pereR && pmR) ? (pereR + " × " + pmR) : (pereR || (pmR ? ("× " + pmR) : ""));
  var sexeCle = String(og.sexe || "").toLowerCase().trim();
  var photoCarte = (typeof vignetteHype === "function" && photoBrute) ? vignetteHype(photoBrute, 360, 440) : photoBrute;
  function icone(type) {
    var p = { viewBox: "0 0 24 24", width: 21, height: 21, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.35, strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } };
    if (type === "age") return h("svg", p, h("rect", { x: 3.5, y: 5, width: 17, height: 15, rx: 2 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" }));
    if (type === "jument") return h("svg", p, h("circle", { cx: 12, cy: 9, r: 5 }), h("path", { d: "M12 14v7M9 18h6" }));
    if (type === "sexe") return h("svg", p, h("circle", { cx: 10, cy: 14, r: 5 }), h("path", { d: "M13.6 10.4L20 4M15 4h5v5" }));
    if (type === "team") return h("svg", p, h("circle", { cx: 9, cy: 8.5, r: 3 }), h("circle", { cx: 16, cy: 9.5, r: 2.4 }), h("path", { d: "M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14.5 14.6c.5-.2 1-.3 1.5-.3 2.2 0 3.9 1.5 4.4 4.2" }));   /* (744) */
    return h("svg", p, h("circle", { cx: 9, cy: 12, r: 4.5 }), h("circle", { cx: 15, cy: 12, r: 4.5 }));
  }
  function ligneId(type, texte, detail) {
    return h("div", { key: type, style: { display: "flex", alignItems: "flex-start", gap: 12, padding: "6px 0" } },   /* (754) 9 -> 6 : carte plus dense */
      icone(type),
      h("div", { style: { minWidth: 0 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.25, color: IVOIRE } }, texte),
        detail ? h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 13, lineHeight: 1.28, color: IVOIRE_DOUX, overflowWrap: "anywhere" } }, detail) : null));
  }
  /* (744) LIGNE TEAM — seulement si le cheval est REELLEMENT dans le groupe Team (meme classement que la page Performances chevaux) */
  var tmSt = React.useState(null); var teamInfo = tmSt[0], setTeamInfo = tmSt[1];
  React.useEffect(function () {
    var vivantT = true;
    setTeamInfo(null);
    if (!chV || !chV.dbId) return;
    hypeClassementTeamChevaux().then(function (rT) {
      if (!vivantT || !rT) return;
      var moiT = (rT.classement || []).filter(function (c) { return String(c.id) === String(chV.dbId); })[0];
      setTeamInfo(moiT ? { rang: moiT.rang, pts: moiT.pts, nom: rT.nom || "" } : null);   /* (786) + nom de la Team */
    }).catch(function () { });
    return function () { vivantT = false; };
  }, [chV && chV.dbId]);
  /* 10/10 (795) ÉTAPE G : LES PIQUETS DU CHEVAL (groupes de nature « piquet » où il figure), en pastilles sous la carte.
     Chaque pastille ouvre la page des chevaux de l'écurie du piquet, ce piquet déjà choisi. Les Teams n'y sont pas. */
  var pqSt = React.useState([]); var piquetsCh = pqSt[0], setPiquetsCh = pqSt[1];
  React.useEffect(function () {
    var vivantPq = true;
    setPiquetsCh([]);
    if (!chV || !chV.dbId || typeof supa === "undefined" || !supa) return;
    (async function () {
      try {
        var rPq = await supa.from("groupes_chevaux").select("groupe_id, groupes(id, nom, nature, club_clef, type)").eq("cheval_id", chV.dbId);
        var lPq = ((rPq && !rPq.error && rPq.data) || []).map(function (x) { return x && x.groupes; }).filter(function (g) { return g && g.id && g.nature === "piquet"; });
        if (!lPq.length) return;
        var clubCh = "";
        try { var rCc = await supa.from("chevaux").select("club").eq("id", chV.dbId).maybeSingle(); clubCh = (rCc && rCc.data && rCc.data.club) || ""; } catch (eCc) { }
        lPq.forEach(function (g) { g.__club = (clubCh && typeof hypeMemeClub === "function" && hypeMemeClub(clubCh, g.club_clef)) ? clubCh : g.club_clef; });
        lPq.sort(function (a, b) { return String(a.nom).localeCompare(String(b.nom)); });
        if (vivantPq) setPiquetsCh(lPq);
      } catch (ePq) { }
    })();
    return function () { vivantPq = false; };
  }, [chV && chV.dbId]);
  var lignesRecto = [];
  if (ageTxt) lignesRecto.push(ligneId("age", ageTxt));
  if (sexe) lignesRecto.push(ligneId(sexeCle === "jument" ? "jument" : "sexe", sexe));
  var LIB_ORIG = T("Origines", "Bloodline", "Orígenes", "Origini", "血統", "Herkunft", "النسب", "血统", "Afstamming", "Origens", "Ursprung", "Происхождение", "Pochodzenie", "혈통");
  lignesRecto.push(resumeOrig
    ? ligneId("orig", LIB_ORIG, resumeOrig)
    : ligneId("orig", T("Origines non renseignées", "Bloodline not provided", "Orígenes no indicados", "Origini non indicate", "血統は未登録", "Herkunft nicht angegeben", "النسب غير مُدخل", "血统未填写", "Afstamming niet ingevuld", "Origens não informadas", "Ursprung ej angivet", "Происхождение не указано", "Brak informacji o pochodzeniu", "혈통 정보 없음")));  if (teamInfo) lignesRecto.push(ligneId("team", (teamInfo.nom || T("Team compétition", "Competition team", "Equipo de competición", "Team agonistico", "競技チーム", "Turnierteam", "فريق المنافسات", "比赛队", "Wedstrijdteam", "Team de competição", "Tävlingsteam", "Команда соревнований", "Drużyna zawodnicza", "팀 대회")),   /* (786) nom lu dans la fiche */
    "#" + teamInfo.rang + " · " + teamInfo.pts + " " + T("points", "points", "puntos", "punti", "ポイント", "Punkte", "نقاط", "分", "punten", "pontos", "poäng", "очков", "punkty", "점")));


  /* (739) RETOURNEMENT DE LA CARTE : quart de tour, changement de face, quart de tour retour.
     La hauteur suit la face visible (le verso est plus haut que le recto). */
  var faceSt = React.useState("recto"); var face = faceSt[0], setFace = faceSt[1];
  var rotSt = React.useState(0); var rot = rotSt[0], setRot = rotSt[1];
  var occSt = React.useState(false); var occupe = occSt[0], setOccupe = occSt[1];
  React.useEffect(function () { setFace("recto"); setRot(0); setOccupe(false); }, [id]);
  var refCarte = React.useRef(null);   /* (743) pour garder la carte en vue apres le retournement */
  function retourner() {
    if (occupe) return;
    setOccupe(true);
    setRot(90);
    setTimeout(function () {
      setFace(function (f) { return f === "recto" ? "verso" : "recto"; });
      setRot(-90);
      setTimeout(function () {
        setRot(0);
        /* (743) le verso est plus haut que le recto : si le haut de la carte est passe au-dessus de l ecran
           (on avait fait defiler le verso), on ramene doucement la carte en vue au lieu de laisser la page sauter */
        try { var el = refCarte.current; if (el) { var t = el.getBoundingClientRect().top; if (t < 70) window.scrollBy({ top: t - 90, behavior: "smooth" }); } } catch (eSc) { }
        setTimeout(function () { setOccupe(false); }, 230);
      }, 30);
    }, 230);
  }
  /* (739) parente : chargee UNE fois, au premier passage au verso (decision du 05/09, comme l ancienne fiche) */
  var parSt = React.useState(null); var parente = parSt[0], setParente = parSt[1];
  React.useEffect(function () { setParente(null); }, [id]);
  React.useEffect(function () {
    var vivantPa = true;
    if (face !== "verso" || parente || !chV) return;
    setParente({ enCours: true, descendants: [], tousChevaux: [], erreur: null });
    hypeParenteCheval(chV.nom, chV.dbId).then(function (rPa) { if (vivantPa) setParente(Object.assign({ enCours: false }, rPa)); });
    return function () { vivantPa = false; };
  }, [face, chV && chV.dbId]);
  function ficheDe(nomA) {
    if (!nomA || !parente || !parente.tousChevaux) return null;
    for (var iA = 0; iA < parente.tousChevaux.length; iA++) { if (nomsHippiquesProches(parente.tousChevaux[iA].nom, nomA)) return parente.tousChevaux[iA].id; }
    return null;
  }
  var LIB_PERE = T("Père", "Sire", "Padre", "Padre", "父", "Vater", "الأب", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지"), LIB_MERE = T("Mère", "Dam", "Madre", "Madre", "母", "Mutter", "الأم", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니");
  function celPed(n, o) {
    o = o || {};
    var nomN = (n && typeof n === "object") ? String(n.nom || "") : (typeof n === "string" ? n : "");
    var det = (n && typeof n === "object") ? String(n.detail || "") : "";
    var idA = nomN ? ficheDe(nomN) : null;
    var ipoN = (det && typeof hypeIpoDe === "function") ? hypeIpoDe(det) : null;
    var bon = !!(ipoN !== null && ipoN >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120));
    return h("div", { key: o.k, role: idA ? "button" : null, onClick: idA ? function () { ouvrirAutreCheval(idA); } : null,
      style: { gridColumn: o.col, gridRow: o.row, padding: "9px 8px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", borderInlineStart: o.col > 1 ? "1px solid rgba(201,169,110,0.16)" : "none", borderBottom: o.bb ? "1px solid rgba(201,169,110,0.12)" : "none", cursor: idA ? "pointer" : "default" } },
      o.label ? h("div", { style: { fontFamily: SANS, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: CHAMPAGNE, marginBottom: 4 } }, o.label) : null,
      h("div", { style: { fontFamily: SERIF, fontSize: o.grand ? 17 : (o.moyen ? 14.5 : 13), fontWeight: 500, lineHeight: 1.22, color: bon ? "#E6CF9C" : IVOIRE, overflowWrap: "anywhere", textDecoration: idA ? "underline" : "none", textDecorationColor: "rgba(201,169,110,0.5)", textUnderlineOffset: 3 } }, (bon ? "★ " : "") + (nomN || "—")),
      det ? h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 10, lineHeight: 1.35, color: "rgba(242,235,221,0.5)", overflowWrap: "anywhere" } }, det) : null);
  }
  function versoCarte() {
    var pg = og.pedigree || { pere: og.pere || null, mere: og.mere || null };
    var a2 = !!((pg.pere && typeof pg.pere === "object" && (pg.pere.pere || pg.pere.mere)) || (pg.mere && typeof pg.mere === "object" && (pg.mere.pere || pg.mere.mere)));
    var a3 = false;
    [pg.pere, pg.mere].forEach(function (pN) { if (pN && typeof pN === "object") [pN.pere, pN.mere].forEach(function (gN) { if (gN && typeof gN === "object" && (gN.pere || gN.mere)) a3 = true; }); });
    var aDesOrig = !!(pg.pere || pg.mere);
    function g(x, k) { return (x && typeof x === "object") ? x[k] : null; }
    var blocs = [];
    blocs.push(h("div", { key: "titreV", style: { display: "flex", alignItems: "center", gap: 10, padding: "4px 4px 12px" } },
      icone("orig"),
      h("div", { style: { fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.26em", textTransform: "uppercase", color: CHAMPAGNE } }, LIB_ORIG)));
    if (aDesOrig) {
      blocs.push(h("div", { key: "grille", style: { display: "grid", gridTemplateColumns: a3 ? "1.2fr 1fr 1fr" : (a2 ? "1.25fr 1fr" : "1fr"), border: "1px solid rgba(201,169,110,0.16)", borderRadius: 12, overflow: "hidden" } },
        celPed(pg.pere, { k: "p", col: 1, row: a2 ? "1 / span 4" : "1", label: LIB_PERE, grand: true, bb: true }),
        celPed(pg.mere, { k: "m", col: 1, row: a2 ? "5 / span 4" : "2", label: LIB_MERE, grand: true }),
        a2 ? celPed(g(pg.pere, "pere"), { k: "pp", col: 2, row: "1 / span 2", moyen: true, bb: true }) : null,
        a2 ? celPed(g(pg.pere, "mere"), { k: "pm", col: 2, row: "3 / span 2", moyen: true, bb: true }) : null,
        a2 ? celPed(g(pg.mere, "pere"), { k: "mp", col: 2, row: "5 / span 2", moyen: true, bb: true }) : null,
        a2 ? celPed(g(pg.mere, "mere"), { k: "mm", col: 2, row: "7 / span 2", moyen: true }) : null,
        a3 ? celPed(g(g(pg.pere, "pere"), "pere"), { k: "ppp", col: 3, row: "1", bb: true }) : null,
        a3 ? celPed(g(g(pg.pere, "pere"), "mere"), { k: "ppm", col: 3, row: "2", bb: true }) : null,
        a3 ? celPed(g(g(pg.pere, "mere"), "pere"), { k: "pmp", col: 3, row: "3", bb: true }) : null,
        a3 ? celPed(g(g(pg.pere, "mere"), "mere"), { k: "pmm", col: 3, row: "4", bb: true }) : null,
        a3 ? celPed(g(g(pg.mere, "pere"), "pere"), { k: "mpp", col: 3, row: "5", bb: true }) : null,
        a3 ? celPed(g(g(pg.mere, "pere"), "mere"), { k: "mpm", col: 3, row: "6", bb: true }) : null,
        a3 ? celPed(g(g(pg.mere, "mere"), "pere"), { k: "mmp", col: 3, row: "7", bb: true }) : null,
        a3 ? celPed(g(g(pg.mere, "mere"), "mere"), { k: "mmm", col: 3, row: "8" }) : null));
    } else if (!(og.arbre && og.arbre.length)) {
      blocs.push(h("div", { key: "vide", style: { padding: "6px 4px 4px", fontFamily: SERIF, fontSize: 17, color: IVOIRE_DOUX } },
        T("Origines non renseignées", "Bloodline not provided", "Orígenes no indicados", "Origini non indicate", "血統は未登録", "Herkunft nicht angegeben", "النسب غير مُدخل", "血统未填写", "Afstamming niet ingevuld", "Origens não informadas", "Ursprung ej angivet", "Происхождение не указано", "Brak informacji o pochodzeniu", "혈통 정보 없음")));
    }
    /* ancien format d arbre (liste par generation) : affiche seulement s il n y a pas de grille, pour ne pas doubler */
    if (!aDesOrig && og.arbre && og.arbre.length) {
      og.arbre.forEach(function (gn, gi) {
        blocs.push(h("div", { key: "gen" + gi, style: { padding: "8px 4px" } },
          h("div", { style: { fontFamily: SANS, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: CHAMPAGNE, marginBottom: 6 } }, (gn && gn.gen) ? tr(gn.gen) : ""),
          ((gn && gn.lignes) || []).map(function (ln, li) { return h("div", { key: "l" + li, style: { fontFamily: SERIF, fontSize: 15, color: IVOIRE, lineHeight: 1.4 } }, ln[0], ln[1] ? h("span", { style: { fontFamily: SANS, fontSize: 10, color: "rgba(242,235,221,0.5)", marginInlineStart: 8 } }, ln[1]) : null); })));
      });
    }
    if (og.naisseur || og.sire) {
      blocs.push(h("div", { key: "infos", style: { marginTop: 14, padding: "0 4px", display: "flex", flexDirection: "column", gap: 10 } },
        og.naisseur ? h("div", { style: { display: "flex", gap: 12, alignItems: "baseline" } },
          h("span", { style: { flex: "0 0 auto", fontFamily: SANS, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,235,221,0.5)" } }, T("Naisseur", "Breeder", "Criador", "Allevatore", "生産者", "Züchter", "المربي", "育马人", "Fokker", "Criador", "Uppfödare", "Заводчик", "Hodowca", "생산자")),
          h("span", { style: { fontFamily: SERIF, fontSize: 16, color: IVOIRE, overflowWrap: "anywhere" } }, og.naisseur)) : null,
        og.sire ? h("a", { href: "https://infochevaux.ifce.fr/fr/info-chevaux", target: "_blank", rel: "noopener", style: { display: "flex", gap: 12, alignItems: "baseline", textDecoration: "none" } },
          h("span", { style: { flex: "0 0 auto", fontFamily: SANS, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,235,221,0.5)" } }, "SIRE"),
          h("span", { style: { fontFamily: SANS, fontSize: 13, letterSpacing: "0.06em", color: IVOIRE } }, og.sire),
          h("span", { style: { marginInlineStart: "auto", fontFamily: SANS, fontSize: 11, color: CHAMPAGNE } }, "Info Chevaux ↗")) : null));
    }
    if (parente && parente.descendants && parente.descendants.length) {
      blocs.push(h("div", { key: "poul", style: { marginTop: 16, padding: "14px 4px 2px", borderTop: "1px solid rgba(201,169,110,0.16)" } },
        h("div", { style: { fontFamily: SANS, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: CHAMPAGNE, marginBottom: 10 } }, T("Poulains", "Foals", "Potros", "Puledri", "子馬", "Fohlen", "المهور", "小马驹", "Veulens", "Potros", "Föl", "Жеребята", "Źrebaki", "망아지")),
        h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
          parente.descendants.map(function (d) {
            return h("button", { key: d.id, onClick: function () { ouvrirAutreCheval(d.id); }, style: { padding: "7px 13px", borderRadius: 999, border: "1px solid rgba(201,169,110,0.45)", background: "rgba(201,169,110,0.06)", color: IVOIRE, fontFamily: SERIF, fontSize: 15, cursor: "pointer" } }, d.nom);
          }))));
    }
    if (parente && parente.erreur) {
      blocs.push(h("div", { key: "errP", style: { marginTop: 12, padding: "0 4px", fontFamily: SANS, fontSize: 11, color: "rgba(242,235,221,0.5)" } },
        T("Liens de parenté indisponibles pour le moment : ", "Family links unavailable for now: ", "Parentesco no disponible por ahora: ", "Parentele non disponibili per ora: ", "血縁リンクは現在利用できません：", "Verwandtschaft derzeit nicht verfügbar: ", "روابط القرابة غير متاحة حاليًا: ", "暂时无法获取亲缘关系：", "Verwantschap momenteel niet beschikbaar: ", "Vínculos de parentesco indisponíveis no momento: ", "Släktskapslänkar är inte tillgängliga just nu: ", "Сейчас информация о родстве недоступна: ", "Powiązania rodzinne chwilowo niedostępne: ", "지금은 혈연 관계를 볼 수 없어요: ") + parente.erreur));
    }
    if (peutOrig) blocs.push(h("div", { key: "outilO", style: { padding: "2px 4px 0" } }, boutonOrig("bO")));   /* (740) */
    return h("div", { style: { padding: "16px 14px 16px" } }, blocs);
  }
  var LIB_RETOURNER = T("Retourner la carte", "Flip the card", "Girar la tarjeta", "Gira la scheda", "カードを裏返す", "Karte umdrehen", "اقلب البطاقة", "翻转卡片", "Draai de kaart om", "Virar o cartão", "Vänd kortet", "Перевернуть карточку", "Odwróć kartę", "카드 뒤집기");

  /* (740) OUTIL DES ORIGINES — visible SEULEMENT pour la proprietaire ou une moderatrice, sur un cheval
     enregistre en base. Libelle selon l etat reel : rien -> « Ajouter », pere OU mere -> « Completer »,
     pere ET mere -> « Voir / modifier ». La base (RLS) reste la vraie protection. */
  var ofSt = React.useState(false); var origOuverte = ofSt[0], setOrigOuverte = ofSt[1];
  var msgSt = React.useState(""); var msgV2 = msgSt[0], setMsgV2 = msgSt[1];
  React.useEffect(function () { setOrigOuverte(false); }, [id]);
  var peutOrig = !!(chV && chV.dbId && moi && (estMien || gereClubCh2 || (typeof estModerateurHype === "function" && estModerateurHype(moi))));   /* (820) + responsable du club */
  var etatOrig = (pereR || nomDeR(pdgR.mere)) ? ((pereR && nomDeR(pdgR.mere)) ? "complet" : "partiel") : "vide";
  var LIB_OUTIL_ORIG = etatOrig === "vide"
    ? T("Ajouter les origines", "Add the bloodline", "Añadir los orígenes", "Aggiungi le origini", "血統を追加", "Herkunft hinzufügen", "إضافة النسب", "添加血统", "Afstamming toevoegen", "Adicionar as origens", "Lägg till ursprung", "Добавить происхождение", "Dodaj pochodzenie", "혈통 추가")
    : (etatOrig === "partiel"
      ? T("Compléter les origines", "Complete the bloodline", "Completar los orígenes", "Completa le origini", "血統を補完", "Herkunft ergänzen", "إكمال النسب", "补全血统", "Afstamming aanvullen", "Completar as origens", "Komplettera ursprunget", "Дополнить происхождение", "Uzupełnij pochodzenie", "혈통 보완하기")
      : T("Voir / modifier les origines", "View / edit the bloodline", "Ver / modificar los orígenes", "Vedi / modifica le origini", "血統を表示・編集", "Herkunft ansehen / bearbeiten", "عرض / تعديل النسب", "查看 / 修改血统", "Afstamming bekijken / aanpassen", "Ver / editar as origens", "Visa / redigera ursprung", "Смотреть / изменить происхождение", "Zobacz / edytuj pochodzenie", "혈통 보기 / 수정"));
  function boutonOrig(cle) {
    if (!peutOrig) return null;
    return h("button", { key: cle, onClick: function (eB) { try { eB.stopPropagation(); } catch (eS) { } setOrigOuverte(true); }, style: { display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 18px", borderRadius: 999, border: "1px solid " + CHAMPAGNE, background: "rgba(201,169,110,0.06)", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 16, cursor: "pointer" } },
      LIB_OUTIL_ORIG, h("span", { "aria-hidden": "true", style: { fontFamily: SANS, fontSize: 13, display: "inline-block", transform: rtl ? "scaleX(-1)" : "none" } }, "›"));
  }
  function apresOrigines(ligneMaj) {
    setOrigOuverte(false);
    setEtat(function (prev) { return (prev && prev.cheval) ? Object.assign({}, prev, { cheval: Object.assign({}, prev.cheval, { ligne: ligneMaj }) }) : prev; });
    setMsgV2(T("Origines mises à jour ✨", "Bloodline updated ✨", "Orígenes actualizados ✨", "Origini aggiornate ✨", "血統を更新しました ✨", "Herkunft aktualisiert ✨", "تم تحديث النسب ✨", "血统已更新 ✨", "Afstamming bijgewerkt ✨", "Origens atualizadas ✨", "Stamträdet uppdaterat ✨", "Родословная обновлена ✨", "Rodowód zaktualizowany ✨", "혈통이 업데이트됐어요 ✨"));
    setTimeout(function () { setMsgV2(""); }, 2600);
  }

  /* (743) « AJOUTER A MES CHEVAUX / RETIRER DE MES CHEVAUX » — meme mecanique que l ancienne fiche :
     lecture de chevaux_liens (cheval + moi) ; lierCheval / delierCheval (fonctions existantes).
     Bouton CACHE (comme l ancienne fiche) : visiteur non connecte, rattachement indetermine (lecture
     en echec : on ne propose pas le mauvais geste), proprietaire du cheval, moderatrice sur une fiche
     de demonstration ecrite dans le code. Remplace « Suivre ce cheval » (decision du 08/10). */
  var liSt = React.useState(false); var estLie = liSt[0], setEstLie = liSt[1];
  var liIndSt = React.useState(false); var lienIndet = liIndSt[0], setLienIndet = liIndSt[1];
  var liBzSt = React.useState(false); var lienBusy = liBzSt[0], setLienBusy = liBzSt[1];
  React.useEffect(function () {
    var vivantL = true;
    setEstLie(false); setLienIndet(false);
    if (!moi || !chV || !chV.dbId || typeof supa === "undefined" || !supa) return;
    (async function () {
      try {
        var rL = await supa.from("chevaux_liens").select("cheval_id").eq("cheval_id", chV.dbId).eq("user_id", moi.id).limit(1);
        if (!vivantL) return;
        if (rL && rL.error) { setLienIndet(true); setEstLie(false); return; }
        setLienIndet(false); setEstLie(!!(rL && rL.data && rL.data.length));
      } catch (eL) { if (vivantL) { setLienIndet(true); setEstLie(false); } }
    })();
    return function () { vivantL = false; };
  }, [moi && moi.id, chV && chV.dbId]);
  var ficheDemo = !!(typeof CHEVAUX_FICHE !== "undefined" && CHEVAUX_FICHE && CHEVAUX_FICHE[id]);
  var montrerLien = !!(moi && chV && chV.dbId && !lienIndet && !estMien && !(ficheDemo && typeof estModerateurHype === "function" && estModerateurHype(moi)));
  /* (750) visiteur NON connecte : le bouton reste visible (maquette) et mene a la connexion (regle du chantier referencement) */
  var lienVersConnexion = !!(!moi && chV && chV.dbId);
  function annonce(txt) { setMsgV2(txt); setTimeout(function () { setMsgV2(""); }, 2600); }
  var MSG_IMPOSSIBLE = T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "غير ممكن حاليا — أعيدي المحاولة", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요");
  async function basculerLien() {
    if (lienBusy || !chV || !chV.dbId) return;
    setLienBusy(true);
    try {
      if (estLie) {
        var rD = (typeof delierCheval === "function") ? await delierCheval(chV.dbId) : { error: "?" };
        if (rD && rD.error) annonce(MSG_IMPOSSIBLE + " (" + String((rD.error && rD.error.message) || rD.error) + ")");
        else { setEstLie(false); annonce(T("Retiré de tes chevaux ✓", "Removed from your horses ✓", "Retirado de tus caballos ✓", "Rimosso dai tuoi cavalli ✓", "私の馬から削除しました ✓", "Aus deinen Pferden entfernt ✓", "تمت الإزالة من خيولك ✓", "已从你的马中移除 ✓", "Verwijderd uit je paarden ✓", "Removido dos seus cavalos ✓", "Borttagen från dina hästar ✓", "Убрано из твоих лошадей ✓", "Usunięto z twoich koni ✓", "내 말에서 뺐어요 ✓")); }
      } else {
        var rA = (typeof lierCheval === "function") ? await lierCheval(chV.dbId) : { error: "?" };
        var mA = (rA && rA.error) ? String((rA.error && rA.error.message) || rA.error) : "";
        var deja = !!(rA && rA.error && /duplicate|23505|unique/i.test(mA));
        if (rA && rA.error && !deja) annonce(MSG_IMPOSSIBLE + " (" + mA + ")");
        else { setEstLie(true); annonce(deja ? T("Déjà dans tes chevaux ✓", "Already in your horses ✓", "Ya en tus caballos ✓", "Già nei tuoi cavalli ✓", "すでに私の馬にいます ✓", "Bereits bei deinen Pferden ✓", "موجود بالفعل في خيولك ✓", "已在你的马里 ✓", "Al bij jouw paarden ✓", "Já está nos seus cavalos ✓", "Redan bland dina hästar ✓", "Уже среди твоих лошадей ✓", "Już wśród twoich koni ✓", "이미 내 말에 있어요 ✓") : T("Dans tes chevaux ✓", "In your horses ✓", "En tus caballos ✓", "Nei tuoi cavalli ✓", "私の馬に追加しました ✓", "Bei deinen Pferden ✓", "أضيف إلى خيولك ✓", "在你的马匹中 ✓", "In jouw paarden ✓", "Nos seus cavalos ✓", "Bland dina hästar ✓", "Среди твоих лошадей ✓", "W twoich koniach ✓", "내 말에 있음 ✓")); }
      }
    } catch (eB) { annonce(MSG_IMPOSSIBLE); }
    setLienBusy(false);
  }

  /* (745) APERCU PHOTOS & VIDEOS — memes medias que le rail de l ancienne fiche (chargerPhotosSouvenirs :
     vedettes, souvenirs publies, albums), quelques-uns seulement. Toucher un media ouvre l ancienne fiche
     DIRECTEMENT dans sa visionneuse sur ce media (window.__chevalPhotoOuvrir, mecanisme des notifications,
     j aime + commentaires). « Voir tout » et « Ajouter » ouvrent l ancienne fiche (pas encore d ouverture
     directe de ses onglets Photos / Videos ; ils seront refaits dans la V2). */
  var mdSt = React.useState(null); var medias = mdSt[0], setMedias = mdSt[1];
  React.useEffect(function () {
    var vivantM = true;
    setMedias(null);
    if (!chV || typeof chargerPhotosSouvenirs !== "function") return;
    chargerPhotosSouvenirs("cheval:" + (chV.dbId || id)).then(function (l) { if (vivantM) setMedias(Array.isArray(l) ? l : []); }).catch(function () { if (vivantM) setMedias([]); });
    return function () { vivantM = false; };
  }, [chV && chV.dbId, id]);
  var peutAjouterMedia = !!(moi && chV && chV.dbId && (estMien || estLie || (typeof estModerateurHype === "function" && estModerateurHype(moi))));
  function estVid(u) { try { return typeof estUrlVideo === "function" && estUrlVideo(u); } catch (eV) { return false; } }
  function vignetteMedia(u, l) {
    if (estVid(u)) { try { return (typeof hypeMuxVignetteUrl === "function") ? hypeMuxVignetteUrl(u, l) : null; } catch (eM) { return null; } }
    try { return (typeof vignetteHype === "function") ? vignetteHype(u, l, Math.round(l * 1.25)) : u; } catch (eP) { return u; }
  }
  function ouvrirMedia(u) {
    if (!chV) return;
    try { window.__chevalOuvert = id; window.__chevalPhotoOuvrir = u; } catch (eO) { }
    setEcran("cheval");
  }
  var LIB_VOIR_TOUT = T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기");
  function enteteSection(titre, onVoir) {
    return h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, margin: "0 4px 18px" } },   /* (746) 22 px sous le titre */
      h("h2", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: 22, lineHeight: 1.2, color: IVOIRE } }, titre),
      onVoir ? h("button", { onClick: onVoir, style: { flexShrink: 0, background: "none", border: "none", padding: "4px 0", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" } },
        LIB_VOIR_TOUT + " ", h("span", { "aria-hidden": "true", style: { display: "inline-block", fontFamily: SANS, transform: rtl ? "scaleX(-1)" : "none" } }, "›")) : null);
  }

  /* (747) DERNIERS RESULTATS — l actualite sportive : les 3 epreuves les plus recentes (date d epreuve decroissante).
     Une ligne par epreuve (meme concours + epreuve + date regroupes, la mieux classee affichee, comme le rail
     de l ancienne fiche). Resultats masques (visible = false) exclus, comme partout pour les visiteurs. */
  var rsSt = React.useState(null); var resultats = rsSt[0], setResultats = rsSt[1];
  var rlSt = React.useState(0); var relireRes = rlSt[0], setRelireRes = rlSt[1];   /* (749) relecture apres ajout */
  React.useEffect(function () {
    var vivantR = true;
    setResultats(null);
    if (!chV) return;
    if (!chV.dbId) { setResultats({ lignes: [], erreur: null }); return; }
    hypeResultatsCheval(chV.dbId).then(function (rR) { if (vivantR) setResultats(rR || { lignes: [], erreur: null }); });
    return function () { vivantR = false; };
  }, [chV && chV.dbId, relireRes]);
  var peutSaisirRes = !!(chV && chV.dbId && moi && (estMien || estLie || (typeof estModerateurHype === "function" && estModerateurHype(moi))));
  /* (749) fenetre d ajout V2 + relecture des resultats apres enregistrement */
  var ajSt = React.useState(false); var ajoutResOuvert = ajSt[0], setAjoutResOuvert = ajSt[1];
  var edSt = React.useState(null); var resEdition = edSt[0], setResEdition = edSt[1];   /* (752) ligne en cours de modification */
  function placeDe(r) { if (!r) return null; if (r.place != null && r.place !== "") { var n = Number(r.place); return isFinite(n) ? n : null; } var m = String(r.classement || "").match(/^\s*(\d+)/); return m ? Number(m[1]) : null; }
  var derniers = (function () {
    if (!resultats || !resultats.lignes) return [];
    var grp = {}, ordre = [];
    resultats.lignes.forEach(function (r) {
      if (!r || r.visible === false) return;
      var cle = String(r.concours || "") + "|" + String(r.epreuve || "") + "|" + String(r.date_epreuve || r.annee || "");
      var pl = placeDe(r);
      if (!grp[cle]) { grp[cle] = { r: r, pl: pl, places: [] }; ordre.push(cle); }
      else if (pl != null && (grp[cle].pl == null || pl < grp[cle].pl)) { grp[cle].r = r; grp[cle].pl = pl; }
      grp[cle].places.push({ pl: pl, cav: String(r.cavalier || "").trim() });   /* (758) tous les classes de l epreuve, pour la carte verticale */
    });
    return ordre.slice(0, 3).map(function (k) { return grp[k]; });
  })();
  function dateRes(r) {
    var d = String(r.date_epreuve || "");
    var m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) { try { return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString(ctx.langue || "fr", { day: "numeric", month: "short", year: "numeric" }); } catch (eD) { return m[3] + "/" + m[2] + "/" + m[1]; } }
    return String(r.annee || (r.created_at ? String(r.created_at).slice(0, 4) : "") || "");
  }
  function rangTxt(pl, r) {
    if (pl == null) return String(r.classement || "").trim() || "—";
    var suf = (ctx.langue === "fr" || !ctx.langue) ? (pl === 1 ? "er" : "e") : (ctx.langue === "en" ? (pl === 1 ? "st" : pl === 2 ? "nd" : pl === 3 ? "rd" : "th") : "");
    return pl + suf;
  }

  /* (748) PRINCIPAUX RESULTATS — 3 cartes ; media : celui choisi a la main pour ce moment fort
     (chevaux.moments_forts_medias, comme l ancienne fiche), sinon le portrait du cavalier relie a un compte,
     sinon la photo du cheval en fond tres discret. */
  var principaux = (resultats && resultats.lignes) ? hypePrincipauxResultats(resultats.lignes, (chV && chV.secours && chV.secours.palmares) || [], 3) : [];
  var avSt = React.useState({}); var avatarsCav = avSt[0], setAvatarsCav = avSt[1];
  React.useEffect(function () {
    var vivantA = true;
    var ids = []; principaux.forEach(function (f) { if (f.cavId && ids.indexOf(f.cavId) < 0) ids.push(f.cavId); }); derniers.forEach(function (g) { var cI = g && g.r && g.r.cavalier_id; if (cI && ids.indexOf(cI) < 0) ids.push(cI); });   /* (757) + cavaliers des derniers resultats (cartes) */
    if (!ids.length || typeof supa === "undefined" || !supa) { setAvatarsCav({}); return; }
    supa.from("profiles").select("id, avatar_url").in("id", ids).then(function (rA) {
      if (!vivantA) return;
      var m = {}; ((rA && !rA.error && rA.data) || []).forEach(function (pA) { if (pA && pA.id && pA.avatar_url && String(pA.avatar_url).charAt(0) !== "@") m[String(pA.id)] = pA.avatar_url; });
      setAvatarsCav(m);
    }, function () { });
    return function () { vivantA = false; };
  }, [principaux.map(function (f) { return f.cavId || ""; }).join(",") + "|" + derniers.map(function (g) { return (g && g.r && g.r.cavalier_id) || ""; }).join(",")]);
  var mfMedias = (function () { try { var v = ligne.moments_forts_medias; if (typeof v === "string") v = JSON.parse(v); return (v && typeof v === "object") ? v : {}; } catch (eM) { return {}; } })();
  /* (758) CARTE VERTICALE de resultat — reprend le format deja valide des pages Cavalier / Ecurie / ancienne fiche
     (rail du palmares, maquette du 01/09) : medaille + annee, portrait rond du cheval, « 1er CAVALIER sur CHEVAL »
     (le cheval nomme une seule fois), concours, epreuve, partants, puis les autres classes de la meme epreuve en petit.
     Sans photo : pas de trou, le medaillon n est pas dessine. Couleurs et polices de la V2 (champagne, Cormorant / Montserrat). */
  function carteVerticale(g, cle, onModifier) {
    var r = g.r || {};
    var tries = (g.places || []).slice().sort(function (a5, b5) { return (a5.pl || 99) - (b5.pl || 99); });
    var meilleur = tries[0] || { pl: g.pl, cav: String(r.cavalier || "").trim() };
    var coup = meilleur.pl === 1 ? "\ud83c\udfc6" : meilleur.pl === 2 ? "\ud83e\udd48" : meilleur.pl === 3 ? "\ud83e\udd49" : "\ud83c\udf96\ufe0f";
    var rangM = meilleur.pl != null ? rangTxt(meilleur.pl, r) : String(r.classement || "").trim();
    var an = (String(r.date_epreuve || "").match(/^(\d{4})/) || [])[1] || String(r.annee || "");
    var portrait = photoBrute ? ((typeof vignetteHype === "function") ? vignetteHype(photoBrute, 140, 140) : photoBrute) : null;
    var autres = tries.slice(1, 4);
    return h("div", { key: cle, role: "button", tabIndex: 0, onClick: function () { ouvrirAcces("performances"); },
      style: { position: "relative", flex: "0 0 158px", width: 158, boxSizing: "border-box", padding: "12px 13px 14px", borderRadius: 14, background: "linear-gradient(165deg, rgba(20,24,20,0.92), rgba(8,10,9,0.98))", border: "1px solid rgba(201,169,110,0.36)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", scrollSnapAlign: "start" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%", minHeight: 22 } },
        h("span", { style: { fontSize: 18, lineHeight: 1 } }, coup),
        an ? h("span", { style: { marginInlineStart: "auto", fontFamily: SANS, fontSize: 9, letterSpacing: "0.12em", color: CHAMPAGNE } }, an) : null,
        onModifier ? h("button", { onClick: function (eM) { try { eM.stopPropagation(); } catch (eS) { } onModifier(); }, "aria-label": T("Modifier ce résultat", "Edit this result", "Modificar este resultado", "Modifica questo risultato", "この結果を編集", "Dieses Ergebnis bearbeiten", "تعديل هذه النتيجة", "修改这条成绩", "Dit resultaat wijzigen", "Editar este resultado", "Redigera det här resultatet", "Изменить этот результат", "Edytuj ten wynik", "이 결과 수정"),
          style: { marginInlineStart: an ? 6 : "auto", width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.6)", background: "rgba(7,10,8,0.6)", color: CHAMPAGNE, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer", flexShrink: 0 } }, "✎") : null),
      portrait ? h("img", { src: portrait, alt: "", loading: "lazy", onError: function (eIm) { try { eIm.currentTarget.style.display = "none"; } catch (e9) { } }, style: { width: 66, height: 66, borderRadius: "50%", objectFit: "cover", marginTop: 10, border: "1px solid rgba(201,169,110,0.35)" } }) : null,
      h("div", { style: { marginTop: 10, fontFamily: SANS, fontSize: 11.5, fontWeight: 700, lineHeight: 1.35, color: IVOIRE } },
        (rangM ? (rangM + " ") : "") + (meilleur.cav || ""),
        nomAffiche ? h("span", { style: { color: CHAMPAGNE, fontWeight: 600 } }, " " + T("sur", "on", "con", "su", "騎乗", "auf", "على", "/", "van", "de", "av", "из", "z", "중") + " " + nomAffiche) : null),
      h("div", { style: { marginTop: 10, fontFamily: SERIF, fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: IVOIRE, overflowWrap: "anywhere" } }, String(r.concours || "").trim() || "—"),
      r.epreuve ? h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 9.5, lineHeight: 1.35, color: "rgba(242,235,221,0.6)" } }, String(r.epreuve).trim()) : null,
      r.partants ? h("div", { style: { marginTop: 4, fontFamily: SANS, fontSize: 9, color: "rgba(242,235,221,0.45)" } }, "/ " + r.partants) : null,
      autres.length ? h("div", { style: { marginTop: 8, paddingTop: 7, borderTop: "1px solid rgba(201,169,110,0.14)", width: "100%" } },
        autres.map(function (pp, iA) {
          return h("div", { key: "af" + iA, style: { marginTop: iA ? 3 : 0, fontFamily: SANS, fontSize: 9.5, lineHeight: 1.35, color: "rgba(242,235,221,0.6)" } },
            (pp.pl != null ? (rangTxt(pp.pl, {}) + " ") : "") + (pp.cav || ""));
        })) : null);
  }
  /* (757) une LIGNE de resultat (carte de 3 lignes) : date, concours, epreuve, cavalier, pastille de classement (presentation de la 747). */
  function ligneResultat(it, cle, idx) {
    var podium = it.pl != null && it.pl <= 3;
    return h("button", { key: cle, onClick: function () { ouvrirAcces("performances"); },
      style: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 14px", background: "none", border: "none", borderTop: idx ? "1px solid rgba(201,169,110,0.12)" : "none", cursor: "pointer", textAlign: "start" } },
      h("div", { style: { flex: "0 0 74px", fontFamily: SERIF, fontSize: 14, lineHeight: 1.25, color: IVOIRE_DOUX } }, it.date || ""),
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.25, color: IVOIRE, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "anywhere" } }, it.concours || "—"),
        it.epreuve ? h("div", { style: { marginTop: 3, fontFamily: SANS, fontSize: 11.5, lineHeight: 1.35, color: "rgba(242,235,221,0.55)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } }, it.epreuve) : null,
        it.cav ? h("div", { style: { marginTop: 2, fontFamily: SANS, fontSize: 11.5, lineHeight: 1.35, color: "rgba(242,235,221,0.8)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } }, it.cav) : null),
      h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8 } },
        h("span", { style: { minWidth: 46, textAlign: "center", padding: "5px 9px", borderRadius: 999, fontFamily: SERIF, fontSize: 15, lineHeight: 1, whiteSpace: "nowrap",
          color: it.pl === 1 ? "#14110A" : (podium ? CHAMPAGNE : "rgba(242,235,221,0.8)"),
          background: it.pl === 1 ? CHAMPAGNE : (podium ? "rgba(201,169,110,0.12)" : "rgba(242,235,221,0.06)"),
          border: "1px solid " + (podium ? "rgba(201,169,110,0.55)" : "rgba(242,235,221,0.14)") } },
          rangTxt(it.pl, { classement: it.classement || "" }), (it.pl != null && it.part) ? h("span", { style: { fontFamily: SANS, fontSize: 10, opacity: 0.75 } }, " / " + it.part) : null),
        h("span", { "aria-hidden": "true", style: { fontFamily: SANS, fontSize: 15, color: "rgba(201,169,110,0.8)", display: "inline-block", transform: rtl ? "scaleX(-1)" : "none" } }, "›")));
  }

  function rond(contenu, label, onClick) {
    return h("button", {
      onClick: onClick || null, "aria-label": label,
      style: { width: 44, height: 44, borderRadius: "50%", border: "1px solid " + CHAMPAGNE, background: "rgba(7,10,8,0.38)", color: CHAMPAGNE, display: "flex", alignItems: "center", justifyContent: "center", cursor: onClick ? "pointer" : "default", padding: 0, WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }
    }, contenu);
  }

  /* (737) LES 6 ACCES — six portes vers les sous-pages. Aucun ne parait selectionne sur cette page.
     Pour l instant ils ouvrent les pages EXISTANTES, sans toucher l ancienne fiche :
     · Performances -> ancienne fiche ouverte sur le palmares (window.__ouvrirPalmares, en place depuis le 26/08) ;
     · Actualite    -> ancienne fiche ouverte sur le fil (window.__ouvrirActualite, en place) ;
     · Sante        -> ecran Sante du cheval (window.__santeCheval, meme forme que l ancienne fiche) ;
     · Son histoire, Photos, Videos -> ancienne fiche, ouverte en haut (elle n a pas d ouverture directe
       pour ces parties ; elles seront refaites dans la V2, une par livraison).
     Le retour depuis ces pages revient sur la V2 (historique des ecrans). */
  function ouvrirAcces(cle) {
    if (!chV) return;
    try { window.__chevalOuvert = id; } catch (eO) { }
    if (cle === "sante") {
      try { window.__santeCheval = { id: chV.dbId || id, nom: chV.nom || "" }; } catch (eS) { }
      setEcran("sante-cheval");
      return;
    }
    if (cle === "performances") { try { window.__ouvrirPalmares = true; } catch (eP) { } }
    if (cle === "actualite") { try { window.__ouvrirActualite = true; } catch (eA) { } }
    setEcran("cheval");
  }
  var largeV2 = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;   /* 12/10 (1067) tablette et ordinateur */
  var tresLargeV2 = (typeof useHypeLargeur === "function") ? useHypeLargeur(1100) : false;   /* (1067) ordinateur : deux colonnes */
  /* (1067) Blandine : « re propose le menu des encarts mais dans le meme design que le reste de la page au lieu des onglets » :
     les 6 acces redeviennent des encarts (icone + nom), habilles comme les cartes de la V2 (degrade sombre, filet champagne). */
  var ACCES = [
    { c: "histoire", t: T("Son histoire", "Their story", "Su historia", "La sua storia", "物語", "Seine Geschichte", "قصته", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기"), ic: h("path", { d: "M12 20s-7-4.5-9-9c-1.2-2.8.6-6 3.7-6 2 0 3.4 1.2 4.3 2.6C12 6.2 13.4 5 15.4 5c3.1 0 4.9 3.2 3.7 6-2 4.5-9 9-9 9z" }) },
    { c: "performances", t: T("Performances", "Performances", "Rendimiento", "Prestazioni", "成績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적"), ic: h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }) },
    { c: "sante", t: T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "الصحة", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강"), ic: h("g", null, h("path", { d: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3.5a4.5 4.5 0 0 0 9 0V14" }), h("circle", { cx: 19, cy: 11.5, r: 2.2 })) },
    { c: "photos", t: T("Photos", "Photos", "Fotos", "Foto", "写真", "Fotos", "الصور", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"), ic: h("g", null, h("rect", { x: 3, y: 5, width: 18, height: 14, rx: 2.5 }), h("circle", { cx: 8.5, cy: 10, r: 1.6 }), h("path", { d: "M21 16l-5-5-4 4-2-2-4 4" })) },
    { c: "videos", t: T("Vidéos", "Videos", "Vídeos", "Video", "動画", "Videos", "الفيديوهات", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"), ic: h("g", null, h("rect", { x: 3, y: 6, width: 12, height: 12, rx: 2.5 }), h("path", { d: "M15 10.5l6-3.5v10l-6-3.5z" })) },
    { c: "actualite", t: T("Actualité", "News", "Actualidad", "Attualità", "ニュース", "Aktuelles", "الأخبار", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"), ic: h("g", null, h("path", { d: "M4 5h13a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5z" }), h("path", { d: "M7 9h7M7 12.5h7M7 16h4" })) }
  ];
  /* (1067) « Importer mes resultats officiels », comme la V1 (meme ecran, meme cible d import) */
  function ouvrirImportV2() {
    if (!chV || !chV.dbId) return;
    try {
      window.HYPE_IMPORT_CAVALIERE = false; window.HYPE_IMPORT_MULTI = false;
      window.HYPE_CHEVAL_IMPORT = chV.dbId; window.HYPE_CHEVAL_IMPORT_NOM = chV.nom || null;
      window.localStorage.removeItem("hype_cheval_import");
    } catch (eCI) { }
    setEcran("import-resultats");
  }
  /* (1067) « Partager sa fiche », meme adresse que la V1 (adresse publique si le cheval en a une) */
  async function partagerV2() {
    if (!chV) return;
    var u = (chV.slug ? (location.origin + "/cheval/" + chV.slug) : (location.origin + "/#cheval-" + (chV.dbId || id)));
    var tx = (nomAffiche || "Hype") + " \u2014 Hype \uD83D\uDC0E";
    try { if (navigator.share) { await navigator.share({ title: tx, text: tx, url: u }); return; } } catch (eS) { return; }
    try { await navigator.clipboard.writeText(u); annonce(T("Lien copié !", "Link copied!", "¡Enlace copiado!", "Link copiato!", "リンクをコピーしました！", "Link kopiert!", "تم نسخ الرابط!", "链接已复制！", "Link gekopieerd!", "Link copiado!", "Länken kopierades!", "Ссылка скопирована!", "Link skopiowany!", "링크를 복사했어요!")); } catch (eC) { annonce(u); }
  }
  function carteV2(style) { return Object.assign({ border: "1px solid rgba(201,169,110,0.34)", borderRadius: 16, background: "linear-gradient(165deg, rgba(20,24,20,0.86), rgba(8,10,9,0.94))" }, style || {}); }

  return h("div", { dir: rtl ? "rtl" : undefined, style: { position: "relative", zIndex: 0, minHeight: "100vh", background: FOND, color: IVOIRE, paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)", boxSizing: "border-box", overflowX: "clip" } },
    /* 12/10 (1067) V2 : le fond de la fiche V1 (images/FOND_SANTE.webp, memes voiles), fixe, en calque a part (comme 989 / 1003) */
    h("div", { "aria-hidden": "true", style: { position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", transform: "translateZ(0)", WebkitTransform: "translateZ(0)", willChange: "transform", WebkitBackfaceVisibility: "hidden", backgroundColor: FOND,
      backgroundImage: "linear-gradient(180deg, rgba(6,7,9,0.80) 0%, rgba(6,7,9,0.14) 28%, rgba(6,7,9,0.22) 60%, rgba(6,7,9,0.92) 100%), linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(6,7,9,0.90) 0%, rgba(6,7,9,0.52) 48%, rgba(6,7,9,0.24) 100%), url('images/FOND_SANTE.webp')",
      backgroundSize: "cover, cover, cover", backgroundPosition: "center, center, " + (rtl ? "center left" : "center right"), backgroundRepeat: "no-repeat, no-repeat, no-repeat" } }),
    /* ═══ (736) HERO ═══ grande photo qui se fond dans le fond sombre ; retour et ••• en haut ;
       nom + race · sexe · annee en bas. Haut mais pas ecrasant. */
    h("div", { style: { position: "relative", width: "100%", height: largeV2 ? "calc(env(safe-area-inset-top) + clamp(380px, 38vw, 500px))" : "calc(env(safe-area-inset-top) + clamp(300px, 84vw, 350px))" /* (1068) un peu plus haut, comme la V1 */, overflow: "hidden", background: "transparent" } },
      h("div", { style: { position: "absolute", inset: 0, WebkitMaskImage: "linear-gradient(180deg,#000 0%,#000 66%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 0%,#000 66%,transparent 100%)" } },   /* (1067) la photo se fond dans le fond de page */   /* (751) proportions de la maquette : ~300 pt (les 500-560 px du brief etaient des pixels de la maquette) */   /* (742) hauteur ramenee aux proportions de la maquette (avant 64 % de l ecran) */
      (chV && photoSrc) ? h("img", {
        src: photoSrc, alt: nomAffiche,
        onError: function (eI) { try { var im = eI.currentTarget; if (im.dataset.repli !== "1" && photoBrute && im.src !== photoBrute) { im.dataset.repli = "1"; im.src = photoBrute; } else { im.style.display = "none"; } } catch (eR) { } },
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%", display: "block" }
      }) : null,   /* (750) cadrage remonte vers les tetes */
      /* le fondu : haut legerement assombri (lisibilite des boutons), bas qui rejoint le fond */
      h("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(7,10,8,0.4) 0%, rgba(7,10,8,0) 22%, rgba(7,10,8,0.1) 50%, rgba(7,10,8,0.45) 80%, rgba(7,10,8,0.6) 100%)" } }),   /* (750) fondu progressif : la photo se dissout dans le fond sous le nom */
      /* (742) fondu lateral cote texte, comme la maquette (nom a gauche sur fond sombre, cheval a droite) */
      h("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(7,10,8,0.6) 0%, rgba(7,10,8,0.2) 45%, rgba(7,10,8,0) 70%)" } })),
      h("div", { style: { position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "calc(env(safe-area-inset-top) + 14px) 20px 0" } },
        rond(h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: rtl ? "scaleX(-1)" : "none" } }, h("path", { d: "M15 5l-7 7 7 7" })),
          T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), retour),
        /* ••• : visible comme sur la maquette ; le menu arrive dans sa propre livraison (V2-13) */
        h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },   /* (1067) langue a cote du menu, comme la V1 */
          (typeof SelecteurLangue === "function") ? h(SelecteurLangue, { compact: true }) : null,
          rond(h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: CHAMPAGNE }, h("circle", { cx: 6, cy: 12, r: 1.6 }), h("circle", { cx: 12, cy: 12, r: 1.6 }), h("circle", { cx: 18, cy: 12, r: 1.6 })),
            T("Menu de la fiche", "Profile menu", "Menú de la ficha", "Menu della scheda", "メニュー", "Profilmenü", "قائمة الملف", "资料菜单", "Menu van de pagina", "Menu da ficha", "Sidans meny", "Меню карточки", "Menu karty", "프로필 메뉴"), null))),
      chV ? h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: largeV2 ? "0 max(36px, calc((100% - 1080px) / 2)) 8px" : "0 22px 4px" } },   /* (1067) tablette / ordinateur : aligne sur la colonne du contenu */   /* (757) 16 -> 4 : titre descendu de 12 pt (Blandine : il ecrasait la photo) */   /* (754) 26 -> 16 : moins de noir sous le bouton */   /* (751) bloc nom + ligne + bouton dans le bas du hero, comme la maquette */
        h("h1", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: largeV2 ? "clamp(40px, 4.4vw, 52px)" : "clamp(30px, 8vw, 32px)", lineHeight: 0.98, letterSpacing: "0.005em", color: IVOIRE, overflowWrap: "anywhere", textShadow: "0 2px 18px rgba(0,0,0,0.45)" } }, nomAffiche || "—"),
        sousTitre ? h("div", { style: { marginTop: 9, fontFamily: SANS, fontSize: 9.5, fontWeight: 500, letterSpacing: rtl ? "0.04em" : "0.21em", textTransform: "uppercase", color: "rgba(242,235,221,0.86)" } }, sousTitre) : null,
        null) : null),   /* (1068) le bouton « Ajouter a mes chevaux » sort du hero (voir sous le hero) */
    /* 12/10 (1068) Blandine : « il faut clairement descendre les titres ». Le bouton « Ajouter a mes chevaux » quitte le bas
       de la photo (c est lui qui faisait remonter le nom sur la tete du cheval) et se place juste dessous, aligne sur le nom. */
    (chV && (montrerLien || lienVersConnexion)) ? h("div", { style: { padding: largeV2 ? "14px max(36px, calc((100% - 1080px) / 2)) 0" : "12px 22px 0" } },
      (montrerLien || lienVersConnexion) ? h("button", { onClick: lienVersConnexion ? function () { setEcran("connexion"); } : basculerLien, "aria-pressed": estLie ? "true" : "false", style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 35, padding: "6px 16px 6px 13px", borderRadius: 999, border: "1px solid " + CHAMPAGNE, background: estLie ? "rgba(201,169,110,0.14)" : "rgba(7,10,8,0.35)", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 13.5, lineHeight: 1.1, cursor: lienBusy ? "default" : "pointer", opacity: lienBusy ? 0.65 : 1, WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" } },
          h("svg", { viewBox: "0 0 24 24", width: 15.5, height: 15.5, fill: estLie ? CHAMPAGNE : "none", stroke: CHAMPAGNE, strokeWidth: 1.5, strokeLinejoin: "round", style: { flexShrink: 0 } }, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" })),
          estLie ? T("Retirer de mes chevaux", "Remove from my horses", "Quitar de mis caballos", "Rimuovi dai miei cavalli", "マイ馬から外す", "Aus meinen Pferden entfernen", "إزالة من خيولي", "从我的马中移除", "Verwijderen uit mijn paarden", "Remover dos meus cavalos", "Ta bort från mina hästar", "Убрать из моих лошадей", "Usuń z moich koni", "내 말에서 빼기")
                 : T("Ajouter à mes chevaux", "Add to my horses", "Añadir a mis caballos", "Aggiungi ai miei cavalli", "マイ馬に追加", "Zu meinen Pferden hinzufügen", "إضافة إلى خيولي", "添加到我的马", "Toevoegen aan mijn paarden", "Adicionar aos meus cavalos", "Lägg till bland mina hästar", "Добавить к моим лошадям", "Dodaj do moich koni", "내 말에 추가")) : null) : null,
    /* (1067) tablette et ordinateur : le contenu sous le hero tient dans une colonne centree (1120 px max) */
    h("div", { style: largeV2 ? { maxWidth: 1120, margin: "0 auto", padding: "0 20px", boxSizing: "border-box" } : null },
    /* (1067) LES 6 ENCARTS — grille 3 x 2 sur telephone, une ligne de 6 sur tablette et ordinateur */
    chV ? h("nav", { "aria-label": T("Rubriques du cheval", "Horse sections", "Secciones del caballo", "Sezioni del cavallo", "馬のセクション", "Bereiche des Pferdes", "أقسام الحصان", "马的栏目", "Rubrieken van het paard", "Seções do cavalo", "Hästens avsnitt", "Разделы лошади", "Sekcje konia", "말 메뉴"), style: { margin: largeV2 ? "30px 16px 0" : "24px 16px 0", display: "grid", gridTemplateColumns: largeV2 ? "repeat(6, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))", gap: largeV2 ? 12 : 10 } },
      ACCES.map(function (a) {
        return h("button", { key: a.c, type: "button", onClick: function () { ouvrirAcces(a.c); }, style: carteV2({ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: largeV2 ? 92 : 78, padding: "12px 6px 11px", color: IVOIRE, cursor: "pointer", WebkitTapHighlightColor: "transparent", boxShadow: "inset 0 1px 0 rgba(242,235,221,0.04)" }) },
          h("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", width: largeV2 ? 26 : 24, height: largeV2 ? 26 : 24, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.45, strokeLinecap: "round", strokeLinejoin: "round", style: { display: "block" } }, a.ic),
          h("span", { style: { fontFamily: SERIF, fontSize: largeV2 ? 16 : 15, fontWeight: 500, lineHeight: 1.1, textAlign: "center", maxWidth: "100%", overflowWrap: "anywhere" } }, a.t));
      })) : null,
    /* (1067) ordinateur (>= 1100 px) : identite et origines a gauche, resultats a droite */
    h("div", { style: tresLargeV2 ? { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 28, alignItems: "start" } : null },
    h("div", { style: { minWidth: 0 } },
    /* (738) IDENTITE & ORIGINES — (739) carte retournable recto / verso. Le bouton Ajouter / Completer
       les origines arrive en V2-6, la ligne Team en V2-7. */
    chV ? h("section", { style: { margin: "30px 16px 0" } },   /* (754) 44 -> 30 sous la barre */
      h("h2", { style: { margin: "0 4px 18px", fontFamily: SERIF, fontWeight: 500, fontSize: 22, lineHeight: 1.2, color: IVOIRE } },   /* (742) 28 -> 22 (maquette) ; (746) 22 px sous le titre */
        T("Identité & origines", "Identity & bloodline", "Identidad y orígenes", "Identità e origini", "プロフィールと血統", "Identität & Herkunft", "الهوية والنسب", "身份与血统", "Identiteit & afstamming", "Identidade e origens", "Identitet & ursprung", "Данные и происхождение", "Tożsamość i pochodzenie", "기본 정보 & 혈통")),
      /* (739) la carte qui se retourne : toucher le recto, ou le bouton rond, la retourne ; le bouton la remet au recto */
      h("div", { ref: refCarte, style: { position: "relative", perspective: 1200, scrollMarginTop: 90 } },
        h("div", { style: { position: "relative", border: "1px solid rgba(201,169,110,0.42)", borderRadius: 18, background: "linear-gradient(165deg, rgba(20,24,20,0.92), rgba(8,10,9,0.98))", transform: "rotateY(" + (rtl ? -rot : rot) + "deg)", transition: rot === -90 ? "none" : "transform 230ms ease", transformOrigin: "center" } },
          face === "recto"
            ? h("div", { role: "button", onClick: retourner, "aria-label": LIB_RETOURNER, style: { display: "flex", alignItems: "stretch", gap: 14, padding: 12, minHeight: 204, boxSizing: "border-box", cursor: "pointer" } },   /* (754) carte ~204 pt de haut */
                photoCarte ? h("div", { style: { position: "relative", flex: "0 0 43%", margin: "8px 0", borderRadius: 11, overflow: "hidden", background: "#0B0E0C" } },
                  h("img", { src: photoCarte, alt: "", loading: "lazy", onError: function (eI) { try { var im = eI.currentTarget; if (im.dataset.repli !== "1" && photoBrute && im.src !== photoBrute) { im.dataset.repli = "1"; im.src = photoBrute; } else { im.style.display = "none"; } } catch (eR) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" } })) : null,
                h("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4px 34px 4px 0" } }, lignesRecto, (etatOrig === "vide") ? h("div", null, boutonOrig("rO")) : null))
            : versoCarte(),
          /* bouton rond de retournement, coin haut (cote fin de lecture) */
          h("button", { onClick: function (eB) { try { eB.stopPropagation(); } catch (eS) { } retourner(); }, "aria-label": LIB_RETOURNER, style: { position: "absolute", top: 10, insetInlineEnd: 10, width: 37, height: 37, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.7)", background: "rgba(7,10,8,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer" } },
            h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" },
              h("path", { d: "M20 11a8 8 0 0 0-14.3-4.9L4 8" }), h("path", { d: "M4 4v4h4" }), h("path", { d: "M4 13a8 8 0 0 0 14.3 4.9L20 16" }), h("path", { d: "M20 20v-4h-4" })))))) : null,
    /* (1067) Blandine : « retire le mot Piquet devant CSO club » et la Team « sur la meme ligne, a droite ».
       Pastilles des piquets a gauche (795), pastille Team a droite (797 : seulement si le cheval est reellement dans la Team). */
    (chV && (piquetsCh.length || teamInfo)) ? h("div", { "data-piquets-cheval": "1", style: { margin: "16px 20px 0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 } },
      piquetsCh.map(function (g) {
        return h("button", { key: "pqc" + g.id, type: "button", onClick: function () { try { window.__ecurieHypeClub = g.__club; window.__ecurieHypePiquet = g.id; } catch (eNv) { } setEcran("ecurie-hype"); },
          style: { display: "inline-flex", alignItems: "center", gap: 6, minHeight: 34, padding: "0 13px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.4)", background: "rgba(201,166,107,0.06)", color: IVOIRE, fontFamily: SANS, fontSize: 12.5, cursor: "pointer" } },
          (typeof hypeLibPiquet === "function" ? hypeLibPiquet(g.nom) : g.nom), h("span", { "aria-hidden": "true", style: { color: CHAMPAGNE, fontSize: 14, lineHeight: 1, display: "inline-block", transform: rtl ? "scaleX(-1)" : "none" } }, "›"));
      }),
      teamInfo ? h("button", { type: "button", "data-ligne-team": "1", onClick: function () { try { window.__perfGroupe = null; window.__perfGroupeCourant = null; } catch (eTl) { } setEcran("team-competition"); },
        style: { marginInlineStart: "auto", display: "inline-flex", alignItems: "center", gap: 7, minHeight: 34, padding: "0 13px 0 10px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", background: "rgba(201,166,107,0.12)", color: IVOIRE, fontFamily: SANS, fontSize: 12.5, cursor: "pointer" } },
        h("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }, h("circle", { cx: 9, cy: 8.5, r: 3 }), h("circle", { cx: 16, cy: 9.5, r: 2.4 }), h("path", { d: "M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14.5 14.6c.5-.2 1-.3 1.5-.3 2.2 0 3.9 1.5 4.4 4.2" })),
        teamInfo.nom || T("Team compétition", "Competition team", "Equipo de competición", "Team agonistico", "競技チーム", "Turnierteam", "فريق المنافسات", "比赛队", "Wedstrijdteam", "Team de competição", "Tävlingsteam", "Команда соревнований", "Drużyna zawodnicza", "팀 대회"),
        h("span", { "aria-hidden": "true", style: { color: CHAMPAGNE, fontSize: 14, lineHeight: 1, display: "inline-block", transform: rtl ? "scaleX(-1)" : "none" } }, "›")) : null) : null,
    message ? h("div", { style: { margin: "28px 22px 0", fontFamily: SANS, fontSize: 14, lineHeight: 1.6, color: IVOIRE_DOUX } }, message) : null,
    tresLargeV2 ? null : h("div", null,
    /* (1067) PHOTOS & VIDEOS comme la V1 (961 / 1036) : la carte « Le voir en mouvement » puis « Les moments recents ».
       Memes composants que la V1, lecture seule ; les boutons ouvrent les pages existantes (rien de nouveau n est branche). */
    chV ? h("section", { style: largeV2 ? { margin: "36px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 12, alignItems: "start" } : { margin: "36px 0 0" } },   /* (1067) les deux encarts ont deja leur marge de 16 px ; tablette : cote a cote */
      (typeof AlbumsPromus === "function") ? h(AlbumsPromus, { cible: "cheval:" + (chV.dbId || id), sansTitre: true, sansDefile: true, sansAlbums: true, teinte: CHAMPAGNE, photoDefaut: photoSrc || null,
        onOuvrirMedia: function (uM) { ouvrirMedia(uM); }, onVideosTrouvees: function () { }, onVoirVideos: function () { ouvrirAcces("videos"); },
        onTout: function () { ouvrirAcces("photos"); }, onOuvrir: function () { ouvrirAcces("photos"); } }) : null,
      (typeof ChronologieSouvenirs === "function" && chV.dbId) ? h(ChronologieSouvenirs, { key: "souv-v2-" + chV.dbId, mode: "fiche", chevalId: chV.dbId, nomCheval: String(chV.nom || ""), vedetteUrl: null,
        teinte: CHAMPAGNE, teinteCl: CHAMPAGNE,
        onVoirTout: function () { ouvrirAcces("photos"); }, onOuvrir: function (uV) { ouvrirMedia(uV); }, onAjouter: function () { ouvrirAcces("photos"); } }) : null) : null,
    null)),
    h("div", { style: { minWidth: 0 } },
    /* (757) PRESENTATIONS INTERVERTIES (Blandine, 08/10) : « Derniers résultats » en CARROUSEL de cartes,
       « Principaux résultats » en carte de 3 lignes. Donnees, tris et regles inchanges (747 / 748). */
    (chV && resultats !== null) ? h("section", { style: { margin: "36px 0 0" } },
      h("div", { style: { padding: "0 16px" } }, enteteSection(T("Derniers résultats", "Latest results", "Últimos resultados", "Ultimi risultati", "最新の成績", "Letzte Ergebnisse", "آخر النتائج", "最近成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Ostatnie wyniki", "최근 결과"), derniers.length ? function () { ouvrirAcces("performances"); } : null)),
      derniers.length
        ? h("div", { style: { display: "flex", gap: 10, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", padding: "0 16px 4px", scrollSnapType: "x proximity", alignItems: "stretch" } },
            derniers.map(function (g, iD) {
              var r = g.r;
              var modifiable = !!(moi && r.id && r.user_id === moi.id && String(r.origine || "") !== "import");   /* (752) A1 + B1 */
              return carteVerticale(g, "dr" + iD, modifiable ? function () { setResEdition(r); } : null);   /* (758) format des pages Cavalier / Écurie */
            }))
        : h("div", { style: { margin: "0 16px", padding: "16px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderTop: "1px solid rgba(201,169,110,0.14)", borderBottom: "1px solid rgba(201,169,110,0.14)" } },
            h("span", { style: { fontFamily: SERIF, fontSize: 16, color: IVOIRE_DOUX } }, resultats.erreur
              ? T("Résultats indisponibles pour le moment : ", "Results unavailable for now: ", "Resultados no disponibles por ahora: ", "Risultati non disponibili per ora: ", "成績は現在表示できません：", "Ergebnisse derzeit nicht verfügbar: ", "النتائج غير متاحة حاليا: ", "暂时无法获取成绩：", "Resultaten momenteel niet beschikbaar: ", "Resultados indisponíveis no momento: ", "Resultat är inte tillgängliga just nu: ", "Сейчас результаты недоступны: ", "Wyniki chwilowo niedostępne: ", "지금은 결과를 볼 수 없어요: ") + resultats.erreur
              : T("Aucun résultat pour l'instant", "No results yet", "Aún sin resultados", "Ancora nessun risultato", "まだ成績はありません", "Noch keine Ergebnisse", "لا توجد نتائج حاليا", "暂时还没有成绩", "Nog geen resultaten", "Nenhum resultado por enquanto", "Inga resultat ännu", "Пока нет результатов", "Na razie brak wyników", "아직 결과가 없어요")),
            (peutSaisirRes && !resultats.erreur) ? h("button", { onClick: function () { setAjoutResOuvert(true); }, style: { flexShrink: 0, background: "none", border: "none", padding: "4px 0", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 15, cursor: "pointer" } },
              "+ " + T("Ajouter un résultat", "Add a result", "Añadir resultado", "Aggiungi risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가")) : null),
      (derniers.length && peutSaisirRes) ? h("div", { style: { margin: "12px 16px 0", textAlign: "end" } },   /* (749) acces discret a l ajout, personnes autorisees seulement */
        h("button", { onClick: function () { setAjoutResOuvert(true); }, style: { background: "none", border: "none", padding: "6px 2px", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 15, cursor: "pointer" } },
          "+ " + T("Ajouter un résultat", "Add a result", "Añadir resultado", "Aggiungi risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가"))) : null) : null,
    (chV && resultats !== null) ? h("section", { style: { margin: "36px 16px 0" } },
      enteteSection(T("Principaux résultats", "Major results", "Resultados destacados", "Risultati principali", "主な成績", "Wichtigste Ergebnisse", "أبرز النتائج", "主要成绩", "Belangrijkste resultaten", "Principais resultados", "Viktigaste resultat", "Главные результаты", "Najważniejsze wyniki", "주요 결과"), principaux.length ? function () { ouvrirAcces("performances"); } : null),
      principaux.length
        ? h("div", { style: { border: "1px solid rgba(201,169,110,0.34)", borderRadius: 16, background: "linear-gradient(165deg, rgba(18,22,19,0.9), rgba(8,10,9,0.96))", overflow: "hidden" } },
            principaux.map(function (f, iP) {
              return ligneResultat({ pl: f.pl, part: f.part, date: dateRes({ date_epreuve: f.d, annee: f.an }), concours: String(f.nom || "").trim(), epreuve: String(f.ep || "").trim(), cav: String(f.cav || "").trim(), classement: "" }, "pr" + iP, iP);
            }))
        : h("div", { style: { padding: "18px 4px 6px", fontFamily: SERIF, fontSize: 16, fontStyle: "italic", color: IVOIRE_DOUX } },
            T("Pas encore de résultat marquant", "No standout result yet", "Aún no hay resultados destacados", "Ancora nessun risultato di rilievo", "まだ目立った成績はありません", "Noch kein herausragendes Ergebnis", "لا توجد نتائج بارزة بعد", "暂时还没有亮眼的成绩", "Nog geen opvallend resultaat", "Ainda sem resultado de destaque", "Inget framträdande resultat ännu", "Пока нет заметных результатов", "Brak jeszcze wybitnego wyniku", "아직 눈에 띄는 결과가 없어요"))) : null,
    /* (1067) « Importer mes resultats officiels » (comme la V1), personnes autorisees seulement */
    (chV && chV.dbId && peutSaisirRes) ? h("div", { style: { margin: "22px 16px 0" } },
      h("button", { type: "button", onClick: ouvrirImportV2, style: { width: "100%", minHeight: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0 16px", borderRadius: 14, border: "1px solid rgba(201,169,110,0.6)", background: "rgba(201,169,110,0.08)", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 16.5, cursor: "pointer" } },
        h("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "M12 4v11M7 10l5 5 5-5M5 19h14" })),
        T("Importer mes résultats officiels", "Import my official results", "Importar mis resultados oficiales", "Importa i miei risultati ufficiali", "公式成績を取り込む", "Meine offiziellen Ergebnisse importieren", "استيراد نتائجي الرسمية", "导入我的官方成绩", "Mijn officiële resultaten importeren", "Importar meus resultados oficiais", "Importera mina officiella resultat", "Импортировать мои официальные результаты", "Importuj moje oficjalne wyniki", "공식 결과 가져오기"))) : null,
    null)),
    tresLargeV2 ? h("div", null,
    /* (1067) PHOTOS & VIDEOS comme la V1 (961 / 1036) : la carte « Le voir en mouvement » puis « Les moments recents ».
       Memes composants que la V1, lecture seule ; les boutons ouvrent les pages existantes (rien de nouveau n est branche). */
    chV ? h("section", { style: { margin: "40px 0 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 12, alignItems: "start" } },   /* (1067) ordinateur : la video et les moments recents cote a cote */
      (typeof AlbumsPromus === "function") ? h(AlbumsPromus, { cible: "cheval:" + (chV.dbId || id), sansTitre: true, sansDefile: true, sansAlbums: true, teinte: CHAMPAGNE, photoDefaut: photoSrc || null,
        onOuvrirMedia: function (uM) { ouvrirMedia(uM); }, onVideosTrouvees: function () { }, onVoirVideos: function () { ouvrirAcces("videos"); },
        onTout: function () { ouvrirAcces("photos"); }, onOuvrir: function () { ouvrirAcces("photos"); } }) : null,
      (typeof ChronologieSouvenirs === "function" && chV.dbId) ? h(ChronologieSouvenirs, { key: "souv-v2-" + chV.dbId, mode: "fiche", chevalId: chV.dbId, nomCheval: String(chV.nom || ""), vedetteUrl: null,
        teinte: CHAMPAGNE, teinteCl: CHAMPAGNE,
        onVoirTout: function () { ouvrirAcces("photos"); }, onOuvrir: function (uV) { ouvrirMedia(uV); }, onAjouter: function () { ouvrirAcces("photos"); } }) : null) : null,
    null) : null,
    /* (1067) « Partager sa fiche », habillee comme les cartes de la V2 */
    chV ? h("section", { style: carteV2({ margin: "40px 16px 0", padding: "18px 18px 16px" }) },
      h("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { fontFamily: SERIF, fontSize: 20, fontWeight: 500, color: IVOIRE, lineHeight: 1.2 } }, T("Partager sa fiche", "Share this profile", "Compartir ficha", "Condividi la scheda", "プロフィールを共有", "Profil teilen", "مشاركة صفحته", "分享它的资料", "Deel je profiel", "Compartilhar sua ficha", "Dela profilen", "Поделиться карточкой", "Udostępnij jego profil", "프로필 공유하기")),
          h("div", { style: { marginTop: 5, fontFamily: SANS, fontSize: 12.5, lineHeight: 1.5, color: IVOIRE_DOUX } }, T("Avec ton entraîneur, ton écurie ou tes proches.", "With your coach, stable or family.", "Con tu entrenador, cuadra o familia.", "Con il tuo istruttore, la scuderia o i tuoi cari.", "コーチや家族と共有。", "Mit deinem Trainer, deinem Stall oder deinen Nahestehenden.", "مع مدربك أو إسطبلك أو المقربين منك.", "分享给你的教练、马厩或亲友。", "Met je trainer, je stal of je naasten.", "Com seu treinador, sua cocheira ou seus familiares.", "Med din tränare, ditt stall eller dina nära.", "С тренером, конюшней или близкими.", "Twojemu trenerowi, stajni lub bliskim.", "코치, 마구간, 가족과 함께 나눠 보세요."))),
        h("span", { "aria-hidden": "true", style: { flexShrink: 0, width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.5)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: CHAMPAGNE, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }, h("circle", { cx: 18, cy: 5, r: 2.5 }), h("circle", { cx: 6, cy: 12, r: 2.5 }), h("circle", { cx: 18, cy: 19, r: 2.5 }), h("path", { d: "M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" })))),
      h("button", { type: "button", onClick: partagerV2, style: { marginTop: 16, width: "100%", minHeight: 46, borderRadius: 999, border: "1px solid " + CHAMPAGNE, background: "rgba(201,169,110,0.08)", color: CHAMPAGNE, fontFamily: SERIF, fontSize: 16, cursor: "pointer" } },
        T("Générer un lien", "Generate a link", "Generar enlace", "Genera un link", "リンクを生成", "Link erstellen", "إنشاء رابط", "生成链接", "Link maken", "Gerar um link", "Skapa en länk", "Создать ссылку", "Wygeneruj link", "링크 만들기"))) : null,
    (typeof FinPageHype === "function") ? h(FinPageHype, null) : null,
    null),
    ajoutResOuvert && chV ? h(FeuilleAjoutResultatV2, { cheval: chV, moi: moi, lignes: (resultats && resultats.lignes) || [], nomDefaut: (ctx.profil && [ctx.profil.prenom, ctx.profil.nom].filter(Boolean).join(" ")) || "", T: T, onFermer: function () { setAjoutResOuvert(false); }, onEnregistre: function () { setAjoutResOuvert(false); setRelireRes(function (n) { return n + 1; }); annonce(T("Résultat ajouté 🏆", "Result added 🏆", "Resultado añadido 🏆", "Risultato aggiunto 🏆", "結果を追加しました 🏆", "Ergebnis hinzugefügt 🏆", "تمت إضافة النتيجة 🏆", "成绩已添加 🏆", "Resultaat toegevoegd 🏆", "Resultado adicionado 🏆", "Resultat tillagt 🏆", "Результат добавлен 🏆", "Wynik dodany 🏆", "결과를 추가했어요 🏆")); } }) : null,   /* (749) */
    (resEdition && chV) ? h(FeuilleAjoutResultatV2, { key: "ed" + resEdition.id, ligneEdition: resEdition, cheval: chV, moi: moi, lignes: [], T: T, onFermer: function () { setResEdition(null); }, onEnregistre: function () { setResEdition(null); setRelireRes(function (n) { return n + 1; }); annonce(T("Résultat modifié ✓", "Result updated ✓", "Resultado modificado ✓", "Risultato modificato ✓", "結果を更新しました ✓", "Ergebnis geändert ✓", "تم تعديل النتيجة ✓", "成绩已修改 ✓", "Resultaat gewijzigd ✓", "Resultado atualizado ✓", "Resultat ändrat ✓", "Результат изменён ✓", "Wynik zmieniony ✓", "결과를 수정했어요 ✓")); } }) : null,   /* (752) */
    origOuverte && chV ? h(FeuilleOriginesCheval, { cheval: chV, T: T, onFermer: function () { setOrigOuverte(false); }, onEnregistre: apresOrigines }) : null,   /* (740) */
    msgV2 ? h("div", { role: "status", style: { position: "fixed", left: "50%", bottom: "calc(100px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", zIndex: 90, padding: "11px 18px", borderRadius: 999, border: "1px solid rgba(201,169,110,0.5)", background: "rgba(10,13,11,0.96)", color: IVOIRE, fontFamily: SANS, fontSize: 13, whiteSpace: "nowrap" } }, msgV2) : null,
    /* mention discrete de la version en construction (disparaitra au passage de la route) */
    h("div", { style: { margin: "44px 22px 0", fontFamily: SANS, fontSize: 9.5, letterSpacing: "0.24em", textTransform: "uppercase", color: CHAMPAGNE, opacity: 0.55 } },
      T("Nouvelle fiche · version de test", "New profile · test version", "Nueva ficha · versión de prueba", "Nuova scheda · versione di prova", "新しいプロフィール · テスト版", "Neues Profil · Testversion", "ملف جديد · نسخة تجريبية", "新档案 · 测试版", "Nieuw profiel · testversie", "Nova ficha · versão de teste", "Ny profil · testversion", "Новая карточка · тестовая версия", "Nowy profil · wersja testowa", "새 프로필 · 테스트 버전")));
}
window.HypeChevalV2 = { ChevalV2: EcranChevalV2 };
})();
