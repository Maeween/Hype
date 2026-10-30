/* HYPE ▸ 30/10/2026 — Page MON CARNET (EcranMonCarnet), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~55 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranMonCarnet() {
  var h = React.createElement;
  var ctx = (typeof useApp === "function") ? useApp() : {};
  var tr = ctx.tr || function (o) { return (o && (o.fr || "")) || ""; };
  var setEcran = ctx.setEcran || function () { };
  var retourEcran = ctx.retourEcran, peutReculer = ctx.peutReculer;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (411) : arabe */
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var OR = "#E8B84B", TQ = "#7FA3AD", TQL = "#CFE3E8";
  /* 27/09 (425) : palette du journal de progression */
  /* 27/09 (431) : « ca manque un peu de dore et de vie dans le bleu » - petrole plus vif, dore plus franc, textes plus lumineux. */
  var JC = { fond: "#080A0B", carte: "#131819", pet: "#2E6A80", reflet: "#7DB6C3", bronze: "#C29B5C", champ: "#D6B676", ivoire: "#F2EDE4", ligne: "rgba(242,237,228,0.16)" };
  var rtlJC = (ctx.langue === "ar");

  var stN = React.useState(null); var nbConseils = stN[0], setNbConseils = stN[1];
  /* 27/09 (441) : etats prios et toutVoir retires (plus affiches depuis le 425), ainsi que leur lecture en base. */
  var stS = React.useState(null); var seances = stS[0], setSeances = stS[1];
  var stE = React.useState(""); var err = stE[0], setErr = stE[1];
  var stPan = React.useState(false); var panOuvert = stPan[0], setPanOuvert = stPan[1];   /* 15/09 (179) : le panneau des conseils */
  /* 27/09 (427) : FILTRE DE DISCIPLINE et AFFICHAGE PROGRESSIF (8 de plus a chaque toucher). Gardes dans
     window pendant la visite : au retour d une seance, la liste revient telle qu on l a laissee (la
     memoire de defilement retombe sur la meme carte). Rien n est stocke sur l appareil. */
  var stFi = React.useState(function () { try { return window.__jcFiltre || ""; } catch (eF) { return ""; } }); var filtreJC = stFi[0], setFiltreJC = stFi[1];
  var stNb = React.useState(function () { try { return window.__jcNb || 8; } catch (eF2) { return 8; } }); var nbJC = stNb[0], setNbJC = stNb[1];
  function choisirFiltreJC(k) { try { window.__jcFiltre = k; window.__jcNb = 8; } catch (eW) { } setFiltreJC(k); setNbJC(8); }
  function voirPlusJC(n) { try { window.__jcNb = n; } catch (eW2) { } setNbJC(n); }
  /* 27/09 (428) : CALENDRIER. Dates en chaines AAAA-MM-JJ, calculs en UTC a partir des morceaux de
     la chaine (jamais new Date("AAAA-MM-JJ")). Semaine affichee et jour choisi gardes pendant la visite. */
  function jcT(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : 0; }
  function jcDeT(t) { var d = new Date(t); return d.getUTCFullYear() + "-" + String(d.getUTCMonth() + 1).padStart(2, "0") + "-" + String(d.getUTCDate()).padStart(2, "0"); }
  function jcDecale(iso, n) { return jcDeT(jcT(iso) + n * 86400000); }
  function jcAujourdhui() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function jcLundiDe(iso) { var j = new Date(jcT(iso)).getUTCDay(); return jcDecale(iso, -((j + 6) % 7)); }
  function jcIso(x) { return String(x || ""); }
  var stSem = React.useState(function () { try { return window.__jcSem || jcLundiDe(jcAujourdhui()); } catch (eS) { return jcLundiDe(jcAujourdhui()); } }); var semJC = stSem[0], setSemJC = stSem[1];
  var stJr = React.useState(function () { try { return window.__jcJour || ""; } catch (eJ) { return ""; } }); var jourJC = stJr[0], setJourJC = stJr[1];
  function changerSemJC(l) { try { window.__jcSem = l; } catch (eW3) { } setSemJC(l); }
  function choisirJourJC(iso) { try { window.__jcJour = iso; window.__jcNb = 8; } catch (eW4) { } setJourJC(iso); setNbJC(8); }
  /* 27/09 (429) : MON OBJECTIF DU MOMENT. Table privee public.carnet_objectifs (une ligne par compte :
     user_id = auth.uid() en cle primaire, texte, updated_at ; RLS « soi seulement »). DEUX echanges
     seulement : une lecture a l ouverture, une ecriture quand on enregistre. Texte vide enregistre =
     la ligne est supprimee (action volontaire). Jamais dans profiles (lisible par d autres). */
  var stOb = React.useState(undefined); var objJC = stOb[0], setObjJC = stOb[1];       /* undefined = chargement, null = indisponible, "" = aucun */
  var stObE = React.useState(false); var objEd = stObE[0], setObjEd = stObE[1];
  var stObT = React.useState(""); var objTmp = stObT[0], setObjTmp = stObT[1];
  var stObS = React.useState(false); var objEnv = stObS[0], setObjEnv = stObS[1];
  var stObR = React.useState(""); var objErr = stObR[0], setObjErr = stObR[1];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (vif) setObjJC(null); return; }
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (!u || !u.id) { if (vif) setObjJC(null); return; }
        var r = await supa.from("carnet_objectifs").select("texte").eq("user_id", u.id).maybeSingle();
        if (!vif) return;
        if (r && r.error) { try { console.warn("[journal] objectif illisible :", r.error.message || r.error); } catch (eC) { } setObjJC(null); return; }
        setObjJC(String((r && r.data && r.data.texte) || ""));
      } catch (eO) { if (vif) setObjJC(null); }
    })();
    return function () { vif = false; };
  }, []);
  /* 27/09 (430) : PHOTO DE SECOURS DES CARTES. Pour une seance SANS media, dans l ordre de la fiche
     cheval : 1) la photo PERSO de la cavaliere pour ce cheval (chevaux_histoires.photo_url, la sienne
     seulement) ; 2) la photo de la fiche commune (chevaux.photo_url) ; 3) rien. DEUX lectures groupees
     pour toute la page (les chevaux uniques des seances sans photo), jamais une par carte. Un echec
     de lecture = pas de photo de secours, rien d autre ne change. */
  var stPhC = React.useState({}); var photosChJC = stPhC[0], setPhotosChJC = stPhC[1];
  /* 27/09 (434) : vignettes des photos du coffre prive (1re photo de chaque seance), en UNE demande. */
  var stUj = React.useState({}); var urlsJC = stUj[0], setUrlsJC = stUj[1];
  React.useEffect(function () {
    if (!Array.isArray(seances) || !seances.length) return;
    var refs = [];
    seances.forEach(function (se) { var m1 = premierMedia(se); if (hjEstCarnet(m1)) refs.push(m1); });
    if (!refs.length) return;
    var vif = true;
    hypeCarnetSigner(refs).then(function (mp) { if (vif) setUrlsJC(mp); });
    return function () { vif = false; };
  }, [seances]);
  React.useEffect(function () {
    if (!Array.isArray(seances) || !seances.length) return;
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) return;
        var vus = {}, ids = [];
        seances.forEach(function (se) {
          var aMedia = false;
          try { aMedia = Array.isArray(se.medias) && se.medias.length > 0; } catch (eM) { }
          if (!aMedia && se.cheval_id && !vus[se.cheval_id]) { vus[se.cheval_id] = 1; ids.push(se.cheval_id); }
        });
        if (!ids.length) return;
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        var perso = {}, fiche = {};
        if (u && u.id) {
          try {
            var rp = await supa.from("chevaux_histoires").select("cheval_id, photo_url").eq("user_id", u.id).in("cheval_id", ids);
            ((rp && rp.data) || []).forEach(function (x) { if (x && x.cheval_id && x.photo_url) perso[String(x.cheval_id)] = String(x.photo_url); });
          } catch (eP) { }
        }
        try {
          var rc = await supa.from("chevaux").select("id, photo_url").in("id", ids);
          ((rc && rc.data) || []).forEach(function (x) { if (x && x.id && x.photo_url) fiche[String(x.id)] = String(x.photo_url); });
        } catch (eF) { }
        if (!vif) return;
        var res = {};
        ids.forEach(function (id) { var k = String(id); var p = perso[k] || fiche[k] || ""; if (p) res[k] = p; });
        setPhotosChJC(res);
      } catch (eG) { }
    })();
    return function () { vif = false; };
  }, [seances]);

  async function enregistrerObjJC() {
    if (objEnv) return;
    setObjErr(""); setObjEnv(true);
    try {
      var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
      if (!u || !u.id) throw new Error("session");
      var t = String(objTmp || "").trim();
      var r;
      if (t) r = await supa.from("carnet_objectifs").upsert({ user_id: u.id, texte: t, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      else r = await supa.from("carnet_objectifs").delete().eq("user_id", u.id);
      if (r && r.error) throw r.error;
      setObjJC(t); setObjEd(false);
    } catch (eE) {
      try { console.warn("[journal] objectif non enregistre :", (eE && eE.message) || eE); } catch (eC2) { }
      setObjErr(T("L’objectif n’a pas pu être enregistré.", "The goal could not be saved.", "No se pudo guardar el objetivo.", "Impossibile salvare l’obiettivo.", "目標を保存できませんでした。", "Das Ziel konnte nicht gespeichert werden.", "تعذر حفظ الهدف.", "目标保存失败。", "Het doel kon niet worden opgeslagen.", "Não foi possível salvar o objetivo.", "Målet kunde inte sparas.", "Не удалось сохранить цель.", "Nie udało się zapisać celu.", "목표를 저장하지 못했어요."));
    }
    setObjEnv(false);
  }
  /* 16/09 (210) : au retour d un conseil ouvert depuis Mon carnet, on rouvre le panneau. */
  React.useEffect(function () {
    try {
      if (window.__rouvrirConseils === "carnet") { window.__rouvrirConseils = null; setPanOuvert(true); }
    } catch (eRo2) { }
  }, []);

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (vif) { setSeances([]); setNbConseils(0); } return; }
        var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
        if (!vif) return;
        if (!u || !u.id) { setSeances([]); setNbConseils(0); return; }

        /* Le nombre de conseils, tel qu il est deja compte ailleurs dans l app. */
        try {
          var rn = (typeof compterEpinglesHB === "function") ? await compterEpinglesHB() : { count: 0 };
          if (vif) setNbConseils((rn && rn.count) || 0);
        } catch (eN) { if (vif) setNbConseils(0); }

        /* Les seances. La RLS fait le tri : on ne voit que les siennes. */
        var rs = await supa.from("carnet_seances").select("*").order("date_seance", { ascending: false }).order("created_at", { ascending: false }).limit(200);
        if (!vif) return;
        if (rs && rs.error) { setErr(String((rs.error && rs.error.message) || rs.error)); setSeances([]); }
        else setSeances((rs && rs.data) || []);

        /* 27/09 (437) : rattrapage des videos de seance envoyees avant une fermeture de l appli.
           En arriere-plan ; si une video a ete rattachee, la liste est relue une fois. */
        try {
          hypeCarnetRattraperVideos().then(async function (bl) {
            if (!vif || !bl || !bl.ajoutes) return;
            try {
              var rs2 = await supa.from("carnet_seances").select("*").order("date_seance", { ascending: false }).order("created_at", { ascending: false }).limit(200);
              if (vif && rs2 && !rs2.error) setSeances(rs2.data || []);
            } catch (eR2) { }
          });
        } catch (eRt) { }
      } catch (eG) { if (vif) { setErr(String(eG)); setSeances([]); } }
    })();
    return function () { vif = false; };
  }, []);

  function retour() { if (peutReculer && retourEcran) { retourEcran(); } else { setEcran("moncavalier"); } }

  var MOIS = [T("janvier", "January", "enero", "gennaio", "1\u6708", "Januar", "\u064a\u0646\u0627\u064a\u0631", "一月", "januari", "janeiro", "januari", "январь", "styczeń", "1월"), T("f\u00e9vrier", "February", "febrero", "febbraio", "2\u6708", "Februar", "\u0641\u0628\u0631\u0627\u064a\u0631", "二月", "februari", "fevereiro", "februari", "февраль", "luty", "2월"), T("mars", "March", "marzo", "marzo", "3\u6708", "M\u00e4rz", "\u0645\u0627\u0631\u0633", "3月", "mrt", "mar", "mars", "мар", "mar", "3월"), T("avril", "April", "abril", "aprile", "4\u6708", "April", "\u0623\u0628\u0631\u064a\u0644", "四月", "april", "abril", "april", "апрель", "kwiecień", "4월"), T("mai", "May", "mayo", "maggio", "5\u6708", "Mai", "\u0645\u0627\u064a\u0648", "5月", "mei", "mai", "maj", "мая", "maj", "5월"), T("juin", "June", "junio", "giugno", "6\u6708", "Juni", "\u064a\u0648\u0646\u064a\u0648", "6月", "jun", "jun", "juni", "июн", "cze", "6월"), T("juillet", "July", "julio", "luglio", "7\u6708", "Juli", "\u064a\u0648\u0644\u064a\u0648", "七月", "juli", "julho", "juli", "июль", "lipiec", "7월"), T("ao\u00fbt", "August", "agosto", "agosto", "8\u6708", "August", "\u0623\u063a\u0633\u0637\u0633", "8月", "aug", "ago", "aug", "авг", "sie", "8월"), T("septembre", "September", "septiembre", "settembre", "9\u6708", "September", "\u0633\u0628\u062a\u0645\u0628\u0631", "九月", "september", "setembro", "september", "сентябрь", "wrzesień", "9월"), T("octobre", "October", "octubre", "ottobre", "10\u6708", "Oktober", "\u0623\u0643\u062a\u0648\u0628\u0631", "十月", "oktober", "outubro", "oktober", "октябрь", "październik", "10월"), T("novembre", "November", "noviembre", "novembre", "11\u6708", "November", "\u0646\u0648\u0641\u0645\u0628\u0631", "十一月", "november", "novembro", "november", "ноябрь", "listopad", "11월"), T("d\u00e9cembre", "December", "diciembre", "dicembre", "12\u6708", "Dezember", "\u062f\u064a\u0633\u0645\u0628\u0631", "十二月", "december", "dezembro", "december", "декабрь", "grudzień", "12월")];
  function enClair(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return String(s || "");
    return Number(m[3]) + " " + MOIS[Number(m[2]) - 1] + " " + m[1];
  }
  function sousTitre(se) {
    return [se.cheval_nom || null, se.discipline || null].filter(function (x) { return !!x; }).join(" \u00b7 ");
  }
  function premierMedia(se) {
    try { var l = Array.isArray(se.medias) ? se.medias : []; return l.length ? l[0] : ""; } catch (e) { return ""; }
  }

  /* 27/09 (426) : LES NOUVELLES CARTES DE SEANCE (maquette). Memes donnees (la liste deja chargee),
     meme toucher (window.__carnet = { quoi: "seance", seance } puis carnet-detail), meme 1re photo.
     Anciennes valeurs traduites A L AFFICHAGE seulement : « Obstacle » se lit « Saut », une
     discipline inconnue (« Theorie »...) s affiche telle quelle. Rien n est ecrit. */
  var JC_DISC = ["plat", "dressage", "saut", "exterieur", "travail_a_pied", "autre"];
  function jcNorm(v) { try { return String(v || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); } catch (eN) { return String(v || "").toLowerCase().trim(); } }
  function jcLibDisc(k) {
    if (k === "plat") return T("Plat", "Flatwork", "Plano", "Piano", "馬場", "Flacharbeit", "التدريب المسطح", "平地", "Binnenwerk", "Plano", "Plan ridning", "Работа на плацу", "Ujeżdżenie na płaskim", "평지");
    if (k === "dressage") return T("Dressage", "Dressage", "Doma", "Dressage", "馬術", "Dressur", "الترويض", "盛装舞步", "Dressuur", "Adestramento", "Dressyr", "Выездка", "Ujeżdżenie", "마장마술");
    if (k === "saut") return T("Saut", "Jumping", "Salto", "Salto", "障害", "Springen", "قفز الحواجز", "跳跃", "Springen", "Salto", "Hoppning", "Конкур", "Skoki", "장애물");
    if (k === "exterieur") return T("Extérieur", "Outdoor", "Exterior", "Esterno", "外乗", "Ausritt", "نزهة خارجية", "户外", "Buiten", "Externo", "Utomhus", "Прогулка", "Teren", "야외");
    if (k === "travail_a_pied") return T("Travail à pied", "Groundwork", "Trabajo a pie", "Lavoro da terra", "地上作業", "Bodenarbeit", "العمل من الأرض", "地面训练", "Grondwerk", "Trabalho a pé", "Arbete från marken", "Работа с земли", "Praca z ziemi", "지상 훈련");
    if (k === "autre") return T("Autre", "Other", "Otro", "Altro", "その他", "Andere", "أخرى", "其他", "Anders", "Outro", "Annat", "Другое", "Inne", "기타");
    return "";
  }
  function jcCleDisc(se) {
    if (se && se.discipline_cle && JC_DISC.indexOf(se.discipline_cle) >= 0) return se.discipline_cle;
    var n = jcNorm(se && se.discipline); if (!n) return "";
    var M2 = { plat: ["plat", "flat", "flatwork", "plano", "piano", "馬場"], saut: ["saut", "obstacle", "jumping", "salto", "springen", "障害"], dressage: ["dressage", "doma", "馬術"], exterieur: ["exterieur", "outdoor", "exterior", "esterno", "ausritt", "外乗"], travail_a_pied: ["travail a pied", "groundwork", "trabajo a pie", "lavoro da terra", "bodenarbeit", "地上作業"], autre: ["autre"] };
    for (var k in M2) { if (M2[k].indexOf(n) >= 0) return k; }
    return "";
  }
  function jcLibelleSeance(se) {
    var k = jcCleDisc(se);
    if (k === "autre" && se.discipline && jcNorm(se.discipline) !== "autre") return String(se.discipline);
    if (k) return jcLibDisc(k);
    return se.discipline ? String(se.discipline) : "";
  }
  function jcRessenti(cle) {
    if (cle === "bonnes") return T("Bonnes sensations", "Good feelings", "Buenas sensaciones", "Buone sensazioni", "良い感覚", "Gutes Gefühl", "إحساس جيد", "感觉很好", "Goed gevoel", "Boas sensações", "Bra känsla", "Хорошие ощущения", "Dobre odczucia", "좋은 느낌");
    if (cle === "mitigees") return T("Sensations mitigées", "Mixed feelings", "Sensaciones mixtas", "Sensazioni contrastanti", "まあまあ", "Gemischtes Gefühl", "إحساس متفاوت", "感觉一般", "Wisselend gevoel", "Sensações mistas", "Blandade känslor", "Смешанные ощущения", "Mieszane odczucia", "그저 그런 느낌");
    if (cle === "difficile") return T("Séance difficile", "Tough session", "Sesión difícil", "Sessione difficile", "難しい稽古", "Schwierige Einheit", "حصة صعبة", "艰难的训练", "Zware training", "Sessão difícil", "Tufft ridpass", "Тяжёлая тренировка", "Trudny trening", "힘든 훈련");
    return cle ? String(cle) : "";
  }
  /* Date de la carte : jour en grand + mois court dans la langue de l appli. La chaine AAAA-MM-JJ est
     DECOUPEE (jamais new Date("AAAA-MM-JJ")) ; Intl ne sert qu a nommer le mois, en UTC. */
  function jcDate(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return { jour: "", mois: String(s || ""), an: "" };
    var mois = "";
    try { mois = new Intl.DateTimeFormat(ctx.langue || "fr", { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))); } catch (eI) { mois = MOIS[Number(m[2]) - 1] || ""; }
    var anCourant = "";
    try { anCourant = String(new Date().getFullYear()); } catch (eA) { }
    return { jour: String(Number(m[3])), mois: mois, an: (m[1] !== anCourant) ? m[1] : "" };
  }
  function jcIco(d, taille, coul) {
    return h.apply(null, ["svg", { width: taille, height: taille, viewBox: "0 0 24 24", fill: "none", stroke: coul, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "0 0 auto", display: "block" } }]
      .concat(d.map(function (p, i) { return h("path", { key: "p" + i, d: p }); })));
  }

  function ligneSeance(se, grande) {
    var med = premierMedia(se);
    /* 27/09 (430) : sans media, photo du cheval (perso, sinon fiche commune) ; sinon rien. */
    var medCh = (!med && se.cheval_id) ? (photosChJC[String(se.cheval_id)] || "") : "";
    var dt = jcDate(se.date_seance);
    var disc = jcLibelleSeance(se);
    var aRet = String(se.a_retenir || "").trim();
    var noteC = String(se.note || "").trim();
    var ress = jcRessenti(se.ressenti_cle);
    return h("div", { key: se.id, role: "button",
      onClick: function () {
        try { window.__carnet = { quoi: "seance", seance: se }; } catch (eOc) { }
        setEcran("carnet-detail");
      },
      style: { display: "block", padding: "14px 14px 12px", borderRadius: 16, border: "1px solid rgba(125,182,195,0.24)", background: JC.carte, cursor: "pointer", minWidth: 0 } },
      h("div", { style: { display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 } },
        /* date encadree */
        h("div", { style: { flex: "0 0 auto", width: 54, minHeight: 60, borderRadius: 10, border: "1px solid rgba(214,182,118,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6px 2px", boxSizing: "border-box" } },
          h("div", { style: { fontFamily: C, fontSize: 24, fontWeight: 600, lineHeight: 1, color: JC.ivoire } }, dt.jour),
          h("div", { style: { fontFamily: M, fontSize: 10, letterSpacing: rtlJC ? 0 : 0.8, textTransform: "uppercase", color: "rgba(242,237,228,0.86)", marginTop: 5, textAlign: "center", lineHeight: 1.2, overflowWrap: "anywhere" } }, dt.mois),
          dt.an ? h("div", { style: { fontFamily: M, fontSize: 9.5, color: "rgba(242,237,228,0.72)", marginTop: 2 } }, dt.an) : null),
        /* textes */
        h("div", { style: { flex: 1, minWidth: 0 } },
          se.cheval_nom ? h("div", { dir: "auto", style: { fontFamily: C, fontSize: 14, fontWeight: 600, letterSpacing: rtlJC ? 0 : 0.5, textTransform: "uppercase", color: JC.ivoire, lineHeight: 1.25, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "anywhere" } }, se.cheval_nom) : null,
          disc ? h("span", { style: { display: "inline-block", marginTop: 6, padding: "2px 9px", borderRadius: 999, border: "1px solid " + JC.reflet, background: "rgba(42,97,118,0.6)", fontFamily: M, fontSize: 10.5, letterSpacing: rtlJC ? 0 : 0.8, textTransform: "uppercase", color: "#F2EDE4", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", boxSizing: "border-box" } }, disc) : null,
          se.theme ? h("div", { dir: "auto", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 19, fontWeight: 600, color: JC.ivoire, lineHeight: 1.2, marginTop: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "anywhere" } }, se.theme) : null,
          se.lieu ? h("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 5, minWidth: 0 } },
            jcIco(["M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z", "M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"], 14, "rgba(242,237,228,0.84)"),
            h("span", { dir: "auto", style: { minWidth: 0, fontFamily: M, fontSize: 12.5, color: "rgba(242,237,228,0.88)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, se.lieu)) : null),
        /* 1re photo (inchangee : vignette cover, video par sa miniature) */
        med ? h("div", { style: { flex: "0 0 auto", width: "clamp(72px, 27%, 128px)", aspectRatio: "4 / 3", borderRadius: 10, overflow: "hidden", background: "#0B1116" } },
          ((typeof estUrlVideo === "function") && estUrlVideo(med))
            ? ((typeof hypeMiniatureVideo === "function") ? hypeMiniatureVideo(med, { largeur: 260, picto: 16 }) : null)
            : h("img", { src: hjEstCarnet(med) ? (((urlsJC[med] || {}).vignette) || undefined) : ((typeof vignetteHype === "function") ? vignetteHype(med, 260, 196) : med), alt: "", loading: "lazy", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%", display: "block" } }))
        : (medCh ? h("div", { style: { flex: "0 0 auto", width: "clamp(72px, 27%, 128px)", aspectRatio: "4 / 3", borderRadius: 10, overflow: "hidden", background: "#0B1116" } },
            h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(medCh, 260, 196) : medCh, alt: "", loading: "lazy", decoding: "async",
              onError: function (e) { try { e.target.parentNode.style.display = "none"; } catch (eIm) { } },
              style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block" } })) : null)),
      /* bas de carte : A retenir (sinon le debut du resume), ressenti, Voir la seance */
      (aRet || noteC || ress) ? h("div", { style: { marginTop: 12, paddingTop: 10, borderTop: "1px solid " + JC.ligne } },
        (aRet || noteC) ? h("div", { style: { display: "flex", alignItems: "flex-start", gap: 7, minWidth: 0 } },
          jcIco(["M21 12a8 8 0 0 1-11.7 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"], 15, "rgba(242,237,228,0.8)"),
          h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 12.5, lineHeight: 1.45, color: "rgba(242,237,228,0.92)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } },
            aRet ? h("span", { style: { fontStyle: "italic", color: "rgba(242,237,228,0.82)" } }, T("À retenir : ", "To remember: ", "Para recordar: ", "Da ricordare: ", "覚えておくこと：", "Merken: ", "للتذكر: ", "要点：", "Om te onthouden: ", "Para lembrar: ", "Att komma ihåg: ", "Запомнить: ", "Do zapamiętania: ", "기억할 점: ")) : null,
            h("span", { dir: "auto" }, aRet || noteC))) : null) : null,
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 10, minWidth: 0 } },
        h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: M, fontSize: 13, fontWeight: 500, color: "#8ECBD8" } },
          T("Voir la séance", "View the session", "Ver la sesión", "Vedi la sessione", "セッションを見る", "Einheit ansehen", "عرض الحصة", "查看训练", "De training bekijken", "Ver a sessão", "Se ridpasset", "Смотреть тренировку", "Zobacz trening", "훈련 보기"),
          h("span", { "aria-hidden": "true", style: { fontSize: 18, lineHeight: 1 } }, "›")),
        ress ? h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(214,182,118,0.75)", fontFamily: M, fontSize: 11.5, color: "rgba(242,237,228,0.95)", maxWidth: "100%", boxSizing: "border-box" } },
          h("span", { "aria-hidden": "true", style: { width: 6, height: 6, borderRadius: "50%", background: JC.champ, flex: "0 0 auto" } }), ress) : null));
  }

  var corps;
  if (seances === null) {
    corps = h("div", { style: { padding: "34px 20px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#6D7681" } }, "\u2026");
  } else {
    var derniere = seances.length ? seances[0] : null;
    var suite = seances;   /* 27/09 (425) : « Ma derniere seance » n est plus un bloc a part - elle est la 1re carte de la liste */
    /* 27/09 (427) : filtre LOCAL sur la liste deja chargee (aucune requete). « Autre » = cle autre ;
       les anciennes valeurs inconnues (« Theorie »...) n apparaissent que dans « Toutes ». */
    var filtrees = filtreJC ? suite.filter(function (se) { return jcCleDisc(se) === filtreJC; }) : suite;
    /* 27/09 (428) : + le jour choisi dans le calendrier (combine avec le filtre de discipline) */
    if (jourJC) filtrees = filtrees.filter(function (se) { return String(se.date_seance || "").slice(0, 10) === jourJC; });
    var vues = filtrees.slice(0, nbJC);
    corps = h("div", { className: "jc-corps", style: { padding: "4px 16px 30px", minWidth: 0 } },
      /* 27/09 (425) : LE BOUTON PRINCIPAL, sous le bandeau. Navigation INCHANGEE
         (window.__carnet = { quoi: "nouvelle" } puis carnet-detail). */
      h("div", { className: "jc-noter", role: "button", onClick: function () {
          try { window.__carnet = { quoi: "nouvelle" }; } catch (eNs) { }
          setEcran("carnet-detail");
        },
        style: { display: "flex", alignItems: "center", gap: 12, width: "100%", minHeight: 56, padding: "0 16px", borderRadius: 14, border: "1px solid " + JC.reflet, background: "linear-gradient(180deg, #37788F 0%, " + JC.pet + " 100%)", color: JC.ivoire, cursor: "pointer", boxSizing: "border-box", boxShadow: "0 6px 18px rgba(46,106,128,0.28)" } },
        h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(242,237,228,0.86)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 300, lineHeight: 1 } }, "+"),
        h("span", { style: { flex: 1, minWidth: 0, textAlign: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 21, fontWeight: 600, lineHeight: 1.15 } },
          T("Noter une séance", "Log a session", "Registrar una sesión", "Registra una sessione", "セッションを記録", "Einheit eintragen", "تدوين حصة", "记录一次训练", "Een training noteren", "Anotar uma sessão", "Anteckna ett ridpass", "Записать тренировку", "Zapisz trening", "훈련 기록하기")),
        h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 30, textAlign: "center", fontSize: 22, lineHeight: 1, opacity: 0.85 } }, "\u203a")),

      /* 27/09 (428) : LE CALENDRIER COMPACT. Calcule sur la liste DEJA chargee (aucune requete).
         Semaine du lundi au dimanche, fleches pour changer de semaine, point sous un jour qui a une
         seance, mois + nombre de seances du mois sur une ligne. Un toucher sur un jour n affiche
         que les seances de ce jour ; un second toucher (ou « Tout afficher ») remet tout. */
      (function () {
        var lundi = jcIso(semJC);
        var jours = [];
        for (var d = 0; d < 7; d++) jours.push(jcDecale(lundi, d));
        var jeudi = jcDecale(lundi, 3);   /* le mois affiche est celui du jeudi (semaine a cheval) */
        var ym = jeudi.slice(0, 7);
        var nbMois = (seances || []).filter(function (se) { return String(se.date_seance || "").slice(0, 7) === ym; }).length;
        var parJour = {};
        (seances || []).forEach(function (se) { var k = String(se.date_seance || "").slice(0, 10); if (k) parJour[k] = (parJour[k] || 0) + 1; });
        var auj = jcAujourdhui();
        var moisTxt = "";
        try { moisTxt = new Intl.DateTimeFormat(ctx.langue || "fr", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(jcT(jeudi))); } catch (eM) { moisTxt = ym; }
        var nbTxt = (nbMois === 0)
          ? T("aucune séance", "no sessions", "ninguna sesión", "nessuna sessione", "0回", "keine Einheit", "لا حصص", "没有训练", "geen trainingen", "nenhuma sessão", "inga ridpass", "нет тренировок", "brak treningów", "훈련 없음")
          : (nbMois === 1)
          ? T("1 séance", "1 session", "1 sesión", "1 sessione", "1回", "1 Einheit", "حصة واحدة", "1 次训练", "1 training", "1 sessão", "1 ridpass", "1 тренировка", "1 trening", "훈련 1번")
          : T(nbMois + " séances", nbMois + " sessions", nbMois + " sesiones", nbMois + " sessioni", nbMois + "回", nbMois + " Einheiten", nbMois + " حصص", nbMois + " 次训练", nbMois + " trainingen", nbMois + " sessões", (nbMois + " ridpass"), (nbMois + " " + (nbMois % 10 === 1 && nbMois % 100 !== 11 ? "тренировка" : (nbMois % 10 >= 2 && nbMois % 10 <= 4 && (nbMois % 100 < 10 || nbMois % 100 >= 20)) ? "тренировки" : "тренировок")), (nbMois + " " + (nbMois === 1 ? "trening" : (nbMois % 10 >= 2 && nbMois % 10 <= 4 && (nbMois % 100 < 10 || nbMois % 100 >= 20)) ? "treningi" : "treningów")), (nbMois + "번의 훈련"));
        var fleche = function (sens, txt, aria) {
          return h("button", { type: "button", "aria-label": aria, onClick: function () { changerSemJC(jcDecale(lundi, sens * 7)); },
            style: { flex: "0 0 auto", width: 44, height: 44, borderRadius: "50%", border: 0, background: "transparent", color: JC.ivoire, fontSize: 22, lineHeight: 1, cursor: "pointer", padding: 0 } }, txt);
        };
        return h("div", { className: "jc-cal", style: { marginTop: 14, padding: "6px 8px 10px", borderRadius: 16, border: "1px solid rgba(214,182,118,0.72)", background: JC.carte, minWidth: 0 } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 4, minWidth: 0 } },
            fleche(-1, "‹", T("Semaine précédente", "Previous week", "Semana anterior", "Settimana precedente", "前の週", "Vorherige Woche", "الأسبوع السابق", "上一周", "Vorige week", "Semana anterior", "Föregående vecka", "Предыдущая неделя", "Poprzedni tydzień", "이전 주")),
            h("div", { style: { flex: 1, minWidth: 0, display: "flex", alignItems: "baseline", justifyContent: "center", flexWrap: "wrap", columnGap: 10, rowGap: 2, textAlign: "center" } },
              h("span", { style: { fontFamily: C, fontSize: 15, fontWeight: 600, letterSpacing: rtlJC ? 0 : 1.6, textTransform: "uppercase", color: JC.ivoire } }, moisTxt),
              h("span", { style: { fontFamily: M, fontSize: 12.5, color: "rgba(242,237,228,0.86)" } }, "• " + nbTxt)),
            fleche(1, "›", T("Semaine suivante", "Next week", "Semana siguiente", "Settimana successiva", "次の週", "Nächste Woche", "الأسبوع التالي", "下一周", "Volgende week", "Próxima semana", "Nästa vecka", "Следующая неделя", "Następny tydzień", "다음 주"))),
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 2, marginTop: 4 } },
            jours.map(function (iso) {
              var pris = jourJC === iso;
              var n = parJour[iso] || 0;
              var estAuj = iso === auj;
              var abr = "";
              try { abr = new Intl.DateTimeFormat(ctx.langue || "fr", { weekday: "short", timeZone: "UTC" }).format(new Date(jcT(iso))).replace(/\.$/, ""); } catch (eW) { abr = ""; }
              return h("div", { key: iso, role: "button", "aria-pressed": pris ? "true" : "false", onClick: function () { choisirJourJC(pris ? "" : iso); },
                style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minHeight: 72, minWidth: 0, padding: "4px 0", cursor: "pointer" } },
                h("span", { style: { fontFamily: M, fontSize: 10, letterSpacing: rtlJC ? 0 : 0.8, textTransform: "uppercase", color: pris ? JC.ivoire : "rgba(242,237,228,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", maxWidth: "100%" } }, abr),
                h("span", { style: { width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: M, fontSize: 15, fontWeight: (pris || estAuj) ? 600 : 500, color: JC.ivoire, background: pris ? JC.pet : "transparent", border: "1px solid " + (pris ? JC.reflet : (estAuj ? "rgba(214,182,118,0.8)" : "transparent")), boxSizing: "border-box" } }, String(Number(iso.slice(8, 10)))),
                h("span", { "aria-hidden": "true", style: { width: 6, height: 6, borderRadius: "50%", background: n ? JC.champ : "transparent" } }));
            })));
      })(),

      /* 27/09 (429) : MON OBJECTIF DU MOMENT (sous le calendrier) */
      (objJC === undefined) ? null : h("div", { className: "jc-obj", style: { marginTop: 26, minWidth: 0 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12, minWidth: 0 } },
          h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 30, height: 2, background: JC.champ } }),
          h("div", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 17, fontWeight: 600, letterSpacing: rtlJC ? 0 : 1.4, textTransform: "uppercase", color: JC.ivoire, lineHeight: 1.25 } },
            T("Mon objectif du moment", "My current goal", "Mi objetivo del momento", "Il mio obiettivo del momento", "今の目標", "Mein aktuelles Ziel", "هدفي الحالي", "我当前的目标", "Mijn doel van dit moment", "Meu objetivo do momento", "Mitt mål just nu", "Моя цель на сейчас", "Mój cel na teraz", "지금 내 목표"))),
        (objJC === null)
          ? h("div", { style: { padding: "14px 16px", borderRadius: 14, border: "1px solid " + JC.ligne, background: JC.carte, fontFamily: M, fontSize: 13, color: "rgba(242,237,228,0.8)" } },
              T("Objectif indisponible pour le moment.", "Goal unavailable for now.", "Objetivo no disponible por ahora.", "Obiettivo non disponibile al momento.", "目標は現在表示できません。", "Ziel derzeit nicht verfügbar.", "الهدف غير متاح حاليًا.", "目标暂时无法使用。", "Doel op dit moment niet beschikbaar.", "Objetivo indisponível no momento.", "Målet är inte tillgängligt just nu.", "Цель пока недоступна.", "Cel chwilowo niedostępny.", "지금은 목표를 사용할 수 없어요."))
          : objEd
            ? h("div", { style: { padding: 14, borderRadius: 14, border: "1px solid " + JC.reflet, background: JC.carte, minWidth: 0 } },
                h("textarea", { value: objTmp, rows: 2, maxLength: 140, dir: String(objTmp || "").trim() ? "auto" : (rtlJC ? "rtl" : "ltr"), onChange: function (e) { setObjTmp(e.target.value); },
                  placeholder: T("ex. Gagner en stabilité dans mes transitions", "e.g. Gain stability in my transitions", "p. ej. Ganar estabilidad en mis transiciones", "es. Più stabilità nelle transizioni", "例：移行を安定させる", "z. B. Mehr Stabilität in den Übergängen", "مثلا: ثبات أكبر في الانتقالات", "例如：让我的过渡更稳定", "bijv. Stabieler worden in mijn overgangen", "ex.: Ganhar estabilidade nas minhas transições", "t.ex. Bli stadigare i mina övergångar", "напр. Стать устойчивее в переходах", "np. Zyskać stabilność w przejściach", "예: 전환할 때 더 안정적으로 하기"),
                  style: { display: "block", width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", minHeight: 72, padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(242,237,228,0.2)", background: JC.fond, color: JC.ivoire, fontFamily: M, fontSize: 16, lineHeight: 1.45, resize: "none", outline: "none", WebkitAppearance: "none" } }),
                objErr ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12.5, color: "#FF9B9B" } }, objErr) : null,
                h("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap", gap: 8, marginTop: 12 } },
                  h("div", { role: "button", onClick: function () { setObjEd(false); setObjErr(""); },
                    style: { display: "flex", alignItems: "center", minHeight: 44, padding: "0 14px", fontFamily: M, fontSize: 13, color: "rgba(242,237,228,0.86)", cursor: "pointer" } },
                    T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
                  h("div", { role: "button", onClick: enregistrerObjJC,
                    style: { display: "flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 12, border: "1px solid " + JC.reflet, background: JC.pet, fontFamily: M, fontSize: 13.5, fontWeight: 600, color: JC.ivoire, cursor: objEnv ? "default" : "pointer", opacity: objEnv ? 0.6 : 1 } },
                    objEnv ? T("Enregistrement…", "Saving…", "Guardando…", "Salvataggio…", "保存中…", "Speichern…", "جار الحفظ…", "保存中…", "Opslaan…", "Salvando…", "Sparar…", "Сохранение…", "Zapisywanie…", "저장하는 중…") : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))
            : h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 12px 12px 14px", borderRadius: 14, border: "1px solid " + JC.ligne, background: JC.carte, minWidth: 0 } },
                h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 46, height: 46, borderRadius: 10, border: "1px solid rgba(214,182,118,0.8)", display: "flex", alignItems: "center", justifyContent: "center" } },
                  h("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: JC.champ, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: { display: "block" } },
                    h("path", { d: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z" }),
                    h("path", { d: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" }),
                    h("path", { d: "M12 12l7-7M16 5h3v3" }))),
                h("div", { dir: objJC ? "auto" : undefined, style: { flex: 1, minWidth: 0, fontFamily: objJC ? "'Cormorant Garamond',Georgia,serif" : M, fontSize: objJC ? "clamp(16.5px, 4.9vw, 19px)" : 13.5, fontWeight: objJC ? 600 : 400, lineHeight: 1.3, color: objJC ? JC.ivoire : "rgba(242,237,228,0.84)", overflowWrap: "anywhere" } },
                  objJC || T("Choisis un objectif sur lequel te concentrer.", "Pick a goal to focus on.", "Elige un objetivo en el que concentrarte.", "Scegli un obiettivo su cui concentrarti.", "取り組む目標を決めましょう。", "Wähle ein Ziel, auf das du dich konzentrierst.", "اختاري هدفًا تركزين عليه.", "选一个要专注的目标。", "Kies een doel om je op te richten.", "Escolha um objetivo para focar.", "Välj ett mål att fokusera på.", "Выбери цель, на которой сосредоточиться.", "Wybierz cel, na którym chcesz się skupić.", "집중할 목표를 골라 보세요.")),
                h("div", { role: "button", onClick: function () { setObjTmp(objJC || ""); setObjErr(""); setObjEd(true); },
                  style: { flex: "0 0 auto", display: "flex", alignItems: "center", minHeight: 44, padding: "0 4px 0 12px", borderInlineStart: "1px solid " + JC.ligne, fontFamily: M, fontSize: 13.5, color: "#8ECBD8", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" } },
                  objJC ? T("Modifier", "Edit", "Editar", "Modifica", "編集", "Bearbeiten", "تعديل", "修改", "Bewerken", "Editar", "Redigera", "Изменить", "Edytuj", "수정") : T("Définir", "Set", "Definir", "Definisci", "設定", "Festlegen", "تحديد", "设定", "Instellen", "Definir", "Ange", "Задать", "Ustaw", "설정하기")))),

      /* 27/09 (425) : « MES CONSEILS HEY BABY » en ligne secondaire compacte. Fonctionnement INCHANGE :
         compterEpinglesHB, ouverture de PanneauConseilsHB, reouverture au retour d un conseil
         (window.__rouvrirConseils === "carnet"). Le bloc des 3 priorites n est plus rendu (les
         lectures restent, aucune donnee touchee) ; « Ma derniere seance » non plus. */
      h("div", { className: "jc-cons", role: "button", onClick: function () { setPanOuvert(true); },
        style: { display: "flex", alignItems: "center", gap: 12, minHeight: 52, marginTop: 12, padding: "0 4px", borderTop: "1px solid " + JC.ligne, borderBottom: "1px solid " + JC.ligne, cursor: "pointer" } },
        h("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(242,237,228,0.92)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "0 0 auto", display: "block" } },
          h("path", { d: "M3 6.5c3-1.3 6-1.3 9 .6v12.4c-3-1.9-6-1.9-9-.6z" }),
          h("path", { d: "M21 6.5c-3-1.3-6-1.3-9 .6v12.4c3-1.9 6-1.9 9-.6z" })),
        h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 14, color: "rgba(242,237,228,0.95)" } },
          T("Mes conseils Hey Baby", "My Hey Baby tips", "Mis consejos Hey Baby", "I miei consigli Hey Baby", "\u30a2\u30c9\u30d0\u30a4\u30b9", "Meine Hey-Baby-Tipps", "\u0646\u0635\u0627\u0626\u062d\u064a \u0645\u0646 Hey Baby", "我的 Hey Baby 建议", "Mijn Hey Baby-tips", "Minhas dicas do Hey Baby", "Mina Hey Baby-tips", "Мои советы Hey Baby", "Moje porady Hey Baby", "내 Hey Baby 조언")),
        h("div", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 14, fontWeight: 600, color: JC.champ } }, (nbConseils === null) ? "\u2026" : String(nbConseils)),
        h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: "rgba(242,237,228,0.86)", fontSize: 20, lineHeight: 1 } }, "\u203a")),

      /* 4 - MES SEANCES. */
      suite.length ? h("div", { className: "jc-seances", style: { marginTop: 30 } },
        /* 27/09 (425) : titre « Mes dernieres seances » ; les cartes, elles, sont INCHANGEES (426). */
        h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, minWidth: 0 } },
          h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 30, height: 2, background: JC.champ } }),
          h("div", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 17, fontWeight: 600, letterSpacing: rtlJC ? 0 : 1.4, textTransform: "uppercase", color: JC.ivoire, lineHeight: 1.25 } },
            T("Mes dernières séances", "My latest sessions", "Mis últimas sesiones", "Le mie ultime sessioni", "最近のセッション", "Meine letzten Einheiten", "حصصي الأخيرة", "我最近的训练", "Mijn laatste trainingen", "Minhas últimas sessões", "Mina senaste ridpass", "Мои последние тренировки", "Moje ostatnie treningi", "내 최근 훈련"))),
        /* les filtres : rail horizontal (data-hscroll : pas de changement d onglet au balayage) */
        h("div", { className: "jc-rail", "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain", scrollbarWidth: "none", minWidth: 0, maxWidth: "100%", margin: "0 0 16px", paddingBottom: 2 } },
          [""].concat(JC_DISC).map(function (k) {
            var pris = filtreJC === k;
            return h("div", { key: "f" + (k || "tout"), role: "button", "aria-pressed": pris ? "true" : "false", onClick: function () { choisirFiltreJC(k); },
              style: { flex: "0 0 auto", display: "flex", alignItems: "center", minHeight: 44, padding: "0 16px", borderRadius: 999, border: "1px solid " + (pris ? JC.reflet : "rgba(242,237,228,0.24)"), background: pris ? "rgba(42,97,118,0.95)" : "transparent", color: pris ? JC.ivoire : "rgba(242,237,228,0.9)", fontFamily: M, fontSize: 13.5, fontWeight: pris ? 600 : 500, whiteSpace: "nowrap", cursor: "pointer", boxSizing: "border-box" } },
              k ? jcLibDisc(k) : T("Toutes", "All", "Todas", "Tutte", "すべて", "Alle", "الكل", "全部", "Alle", "Todas", "Alla", "Все", "Wszystkie", "전체"));
          })),
        /* 27/09 (428) : jour choisi dans le calendrier -> rappel et « Tout afficher » */
        jourJC ? h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, margin: "-4px 0 12px", minWidth: 0 } },
          h("span", { style: { fontFamily: M, fontSize: 13, color: "rgba(242,237,228,0.92)" } }, T("Séances du ", "Sessions on ", "Sesiones del ", "Sessioni del ", "", "Einheiten am ", "حصص يوم ", "训练日期：", "Trainingen van ", "Sessões de ", "Ridpass den ", "Тренировки: ", "Treningi z dnia ", "훈련 날짜: ") + enClair(jourJC) + T("", "", "", "", " のセッション", "", "", "", "", "", "", "", "", "")),
          h("div", { role: "button", onClick: function () { choisirJourJC(""); },
            style: { display: "flex", alignItems: "center", minHeight: 44, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(242,237,228,0.2)", fontFamily: M, fontSize: 12.5, color: JC.ivoire, cursor: "pointer", boxSizing: "border-box" } },
            T("Tout afficher", "Show all", "Mostrar todo", "Mostra tutto", "すべて表示", "Alle anzeigen", "عرض الكل", "全部显示", "Alles tonen", "Exibir tudo", "Visa allt", "Показать всё", "Pokaż wszystko", "모두 표시"))) : null,
        filtrees.length
          ? h("div", { className: "jc-liste", style: { display: "flex", flexDirection: "column", gap: 12 } }, vues.map(function (se) { return ligneSeance(se, false); }))
          : h("div", { style: { padding: "22px 16px", borderRadius: 16, border: "1px solid " + JC.ligne, background: JC.carte, textAlign: "center", fontFamily: M, fontSize: 13.5, lineHeight: 1.5, color: "rgba(242,237,228,0.84)" } },
              jourJC
                ? T("Aucune séance ce jour-là.", "No session on that day.", "No hay sesiones ese día.", "Nessuna sessione quel giorno.", "この日のセッションはありません。", "Keine Einheit an diesem Tag.", "لا توجد حصص في ذلك اليوم.", "那天没有课程。", "Geen les op die dag.", "Nenhuma sessão neste dia.", "Inga pass den dagen.", "В этот день занятий нет.", "Tego dnia nie ma żadnej jazdy.", "그날은 레슨이 없어요.")
                : T("Aucune séance dans cette discipline pour le moment.", "No session in this discipline yet.", "Aún no hay sesiones en esta disciplina.", "Ancora nessuna sessione in questa disciplina.", "この種目のセッションはまだありません。", "Noch keine Einheit in dieser Disziplin.", "لا توجد حصص في هذا الاختصاص حاليًا.", "这个项目暂时还没有训练记录。", "Nog geen training in deze discipline.", "Nenhuma sessão nesta modalidade por enquanto.", "Inga ridpass i den här grenen ännu.", "Пока нет ни одной тренировки в этой дисциплине.", "Na razie brak treningów w tej dyscyplinie.", "이 종목에는 아직 훈련 기록이 없어요.")),
        /* affichage progressif : 8 de plus a chaque toucher, puis « Replier » */
        (filtrees.length > 8) ? h("div", { role: "button", onClick: function () { if (vues.length < filtrees.length) voirPlusJC(nbJC + 8); else voirPlusJC(8); },
          style: { margin: "16px auto 0", display: "flex", alignItems: "center", justifyContent: "center", width: "fit-content", minHeight: 44, padding: "0 22px", borderRadius: 999, border: "1px solid " + JC.reflet, background: "rgba(42,97,118,0.35)", color: JC.ivoire, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer", boxSizing: "border-box" } },
          (vues.length < filtrees.length)
            ? (T("Voir plus", "See more", "Ver más", "Vedi altro", "もっと見る", "Mehr anzeigen", "عرض المزيد", "查看更多", "Meer bekijken", "Ver mais", "Visa mer", "Показать ещё", "Zobacz więcej", "더 보기") + "  (" + (filtrees.length - vues.length) + ")")
            : T("Replier", "Collapse", "Reducir", "Riduci", "閉じる", "Einklappen", "طي", "收起", "Inklappen", "Recolher", "Fäll ihop", "Свернуть", "Zwiń", "접기")) : null) : null,

      /* Rien encore : on le dit simplement, sans bouton qui ne marche pas. */
      (!seances.length) ? h("div", { className: "jc-vide", style: { marginTop: 30, padding: "26px 20px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", textAlign: "center" } },
        h("div", { style: { fontSize: 30 } }, "\ud83d\udcd2"),
        h("div", { style: { fontFamily: M, fontSize: 13.5, color: "#C9D3D8", marginTop: 12, lineHeight: 1.6 } },
          T("Ton carnet est vide. Note ta premi\u00e8re s\u00e9ance avec le bouton ci-dessus.", "Your notebook is empty. Record your first session with the button above.", "Tu cuaderno est\u00e1 vac\u00edo. Anota tu primera sesi\u00f3n con el bot\u00f3n de arriba.", "Il tuo quaderno \u00e8 vuoto. Annota la prima sessione col pulsante sopra.", "\u30ce\u30fc\u30c8\u306f\u7a7a\u3067\u3059\u3002", "Dein Heft ist leer.", "\u062f\u0641\u062a\u0631\u0643 \u0641\u0627\u0631\u063a. \u0633\u062c\u0644\u064a \u0623\u0648\u0644 \u062d\u0635\u0629 \u0628\u0627\u0644\u0632\u0631 \u0623\u0639\u0644\u0627\u0647.", "你的日志还是空的。点击上方按钮，记录你的第一次训练吧。", "Je logboek is leeg. Noteer je eerste training met de knop hierboven.", "Seu caderno está vazio. Anote a sua primeira sessão com o botão acima.", "Din anteckningsbok är tom. Anteckna ditt första ridpass med knappen ovan.", "Твой дневник пуст. Запиши первую тренировку кнопкой выше.", "Twój notes jest pusty. Zapisz swój pierwszy trening przyciskiem powyżej.", "노트가 비어 있어요. 위 버튼으로 첫 훈련을 기록해 보세요."))) : null);
  }

  /* 27/09 (425) : LE BANDEAU DU JOURNAL (image du carnet en cuir, images/JOURNAL_CARNET_FOND.webp).
     Le cote gauche de l image est deja sombre : c est la que se posent les textes. En arabe, l image
     est retournee (le carnet passe a gauche, le texte a droite). Bouton retour : meme retour(). */
  return h("div", { dir: rtlJC ? "rtl" : undefined, style: { minHeight: "100vh", background: JC.fond, color: "#EDF2F5", paddingBottom: 8 } },
    h("style", null, ".jc-rail::-webkit-scrollbar{display:none}" +   /* 27/09 (427) */
      /* 21/10 (tests Blandine, probleme 3) : grand ecran. Tablette : colonne centree. Des 1024 px : outils du carnet a gauche
         (noter, calendrier, objectif, conseils), seances a droite ; des 1280 px les seances passent en grille de deux. */
      "@media (min-width:768px){.jc-corps{max-width:760px;margin-left:auto;margin-right:auto}}" +
      "@media (min-width:1024px){.jc-corps{max-width:1180px;padding:4px 40px 30px !important;display:grid;grid-template-columns:minmax(300px,380px) minmax(0,1fr);column-gap:36px;align-items:start;grid-auto-flow:row dense}" +
      ".jc-corps>.jc-noter,.jc-corps>.jc-cal,.jc-corps>.jc-obj,.jc-corps>.jc-cons{grid-column:1}" +
      ".jc-corps>.jc-seances,.jc-corps>.jc-vide{grid-column:2;grid-row:1 / span 6;margin-top:0 !important}}" +
      "@media (min-width:1280px){.jc-liste{display:grid !important;grid-template-columns:repeat(2,minmax(0,1fr))}}"),
    h("div", { style: { position: "relative", overflow: "hidden", minWidth: 0 } },
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, backgroundColor: JC.fond, backgroundImage: "url(images/JOURNAL_CARNET_FOND.webp)", backgroundSize: "cover", backgroundPosition: "72% 40%", backgroundRepeat: "no-repeat", transform: rtlJC ? "scaleX(-1)" : "none" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlJC ? "270deg" : "90deg") + ", rgba(8,10,11,0.82) 0%, rgba(8,10,11,0.55) 42%, rgba(8,10,11,0.10) 78%)" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,10,11,0.35) 0%, rgba(8,10,11,0.05) 32%, rgba(8,10,11,0.45) 72%, rgba(8,10,11,0.9) 90%, #080A0B 100%)" } }),
      h("button", { onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
        style: Object.assign({ position: "absolute", top: "calc(env(safe-area-inset-top) + 12px)", zIndex: 2, width: 44, height: 44, borderRadius: "50%", background: "rgba(8,10,11,0.45)", border: "1px solid rgba(242,237,228,0.22)", color: JC.ivoire, fontSize: 20, lineHeight: 1, cursor: "pointer", padding: 0 }, rtlJC ? { right: 14 } : { left: 14 }) }, "\u2039"),
      h("div", { style: { position: "relative", zIndex: 1, padding: "calc(env(safe-area-inset-top) + 84px) 20px 26px", minWidth: 0, maxWidth: 520 } },
        h("div", { style: { fontFamily: C, fontSize: "clamp(21px, 6.6vw, 28px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: rtlJC ? 0 : 0.6, textTransform: "uppercase", color: JC.ivoire, overflowWrap: "break-word", maxWidth: "74%" } },   /* 27/09 (425) : taille souple, jamais un mot coupe au milieu (cesure douce en allemand) */
          T("Mon journal de progression", "My progress journal", "Mi diario de progreso", "Il mio diario dei progressi", "私の上達日記", "Mein Fortschritts\u00adtagebuch", "مذكّرة تقدّمي", "我的成长日志", "Mijn voortgangsdagboek", "Meu diário de progresso", "Min utvecklingsdagbok", "Мой дневник прогресса", "Mój dziennik postępów", "내 진행 일지")),
        h("div", { style: { fontFamily: M, fontSize: 10, letterSpacing: rtlJC ? 0 : 2.4, textTransform: "uppercase", color: "rgba(242,237,228,0.94)", fontWeight: 500, marginTop: 14, lineHeight: 1.6 } },
          T("Mes séances · Mes sensations · Mes objectifs", "My sessions · My feelings · My goals", "Mis sesiones · Mis sensaciones · Mis objetivos", "Le mie sessioni · Le mie sensazioni · I miei obiettivi", "セッション・感覚・目標", "Meine Einheiten · Meine Gefühle · Meine Ziele", "حصصي · إحساسي · أهدافي", "我的训练 · 我的感受 · 我的目标", "Mijn trainingen · Mijn gevoel · Mijn doelen", "Minhas sessões · Minhas sensações · Meus objetivos", "Mina ridpass · Mina känslor · Mina mål", "Мои тренировки · Мои ощущения · Мои цели", "Moje treningi · Moje odczucia · Moje cele", "내 훈련 · 내 느낌 · 내 목표")),
        h("div", { "aria-hidden": "true", style: { width: 34, height: 1.5, background: JC.champ, opacity: 0.8, margin: "16px 0 12px" } }),
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 21, fontWeight: 500, lineHeight: 1.25, color: JC.champ } },
          T("Chaque séance laisse une trace.", "Every session leaves a mark.", "Cada sesión deja huella.", "Ogni sessione lascia una traccia.", "一つひとつのセッションが、成長の跡を残す。", "Jede Einheit hinterlässt eine Spur.", "كل حصة تترك أثرًا.", "每一次训练都会留下痕迹。", "Elke training laat een spoor na.", "Cada sessão deixa uma marca.", "Varje ridpass lämnar ett spår.", "Каждая тренировка оставляет след.", "Każdy trening zostawia ślad.", "훈련할 때마다 흔적이 남아요.")))),
    err ? h("div", { style: { margin: "0 16px 14px", padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5, lineHeight: 1.5 } },
      T("Le carnet n\u2019a pas pu \u00eatre lu : ", "The notebook could not load: ", "No se pudo cargar el cuaderno: ", "Impossibile caricare il quaderno: ", "\u30ce\u30fc\u30c8\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\uff1a", "Heft nicht geladen: ", "\u062a\u0639\u0630\u0631\u062a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062f\u0641\u062a\u0631: ", "日志无法读取：", "Het logboek kon niet worden geladen: ", "Não foi possível ler o caderno: ", "Anteckningsboken kunde inte läsas: ", "Не удалось прочитать дневник: ", "Nie udało się wczytać notesu: ", "노트를 불러오지 못했어요: ") + err) : null,
    corps,
    /* 15/09 (179) : le panneau des conseils, monte a la demande seulement. */
    panOuvert ? h(PanneauConseilsHB, { depuis: "carnet", onFermer: function () { setPanOuvert(false); } }) : null);
}
window.HypeMonCarnet = { MonCarnet: EcranMonCarnet };
})();
