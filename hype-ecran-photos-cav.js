/* HYPE ▸ 30/10/2026 — Page PHOTOS DE LA CAVALIÈRE (EcranPhotosCavaliere), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~57 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranPhotosCavaliere() {
  var h = React.createElement;
  var app = useApp();
  var tr = app.tr, setEcran = app.setEcran;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif", TQL = "#CFE3E8";
  var largeP = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;   /* 15/10 (1152) tablette */
  var ordiP = (typeof useHypeLarge === "function") ? useHypeLarge() : false;   /* (1152) ordinateur */
  var stId = React.useState(function () { try { return String(window.__photosCavaliereId || ""); } catch (e) { return ""; } });
  var cid = stId[0];
  var stP = React.useState(null); var prof = stP[0], setProf = stP[1];
  var stV = React.useState(null); var vids = stV[0], setVids = stV[1];
  var stO = React.useState(null); var visu = stO[0], setVisu = stO[1];
  /* une PHOTO : une adresse web, pas une video (ni Mux) */
  function estPhotoP(u) { var s0 = String(u || ""); if (!/^https?:\/\//i.test(s0)) return false; if ((typeof estUrlVideo === "function") && estUrlVideo(s0)) return false; if (/stream\.mux\.com/i.test(s0)) return false; return true; }
  var stE = React.useState(""); var erreur = stE[0], setErreur = stE[1];
  var stNb = React.useState(18); var nbAff = stNb[0], setNbAff = stNb[1];   /* 19/10 etape 2 : 18 photos, puis +18 */
  var stFc = React.useState(""); var filtreCh = stFc[0], setFiltreCh = stFc[1];
  var stFa = React.useState(""); var filtreAn = stFa[0], setFiltreAn = stFa[1];   /* 19/10 : "" = toutes, "__sans" = sans date, sinon l annee */
  var stFv = React.useState(""); var filtreCav = stFv[0], setFiltreCav = stFv[1];
  /* 19/10 CLASSEMENT EN LOT (Blandine, « Ok continue ») : sur SA page seulement. « Selectionner » -> toucher les photos ->
     « Dater » (photo_dates, source manuel_mois / manuel_annee) ou « Identifier » (identifications : en attente pour les autres,
     acceptee pour soi-meme et pour ses propres chevaux). Une seule notification par personne identifiee. */
  var stMs = React.useState(false); var modeSel = stMs[0], setModeSel = stMs[1];
  var stSl = React.useState({}); var sel = stSl[0], setSel = stSl[1];
  var stFl = React.useState(""); var feuilleLot = stFl[0], setFeuilleLot = stFl[1];
  var stEl = React.useState(""); var etatLot = stEl[0], setEtatLot = stEl[1];
  var stRc = React.useState(0); var rech = stRc[0], setRech = stRc[1];
  var stAn = React.useState(String(new Date().getFullYear())); var lotAn = stAn[0], setLotAn = stAn[1];
  var stMo = React.useState(""); var lotMois = stMo[0], setLotMois = stMo[1];
  var stCi = React.useState([]); var lotCibles = stCi[0], setLotCibles = stCi[1];
  var stRq = React.useState(""); var lotRech = stRq[0], setLotRech = stRq[1];
  var stRr = React.useState([]); var lotRes = stRr[0], setLotRes = stRr[1];   /* 19/10 : "" = tous, "__sans" = non identifiees, sinon id du cavalier */   /* 19/10 etape 3 : "" = tous, "__sans" = sans cheval, sinon id du cheval */
  var ancreGal = React.useRef(null);
  var stMoi = React.useState(null); var moiPc = stMoi[0], setMoiPc = stMoi[1];   /* 19/10 etape 1 : savoir si c est sa propre page (etat vide) */
  React.useEffect(function () { var vifM = true; (async function () { try { var uM = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (vifM) setMoiPc(uM && uM.id ? String(uM.id) : ""); } catch (eM) { if (vifM) setMoiPc(""); } })(); return function () { vifM = false; }; }, []);
  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (!cid || typeof supa === "undefined" || !supa) { if (vif) setVids([]); return; }
        var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").eq("id", cid).maybeSingle();   /* 18/10 : photo et ecurie pour le hero */
        if (vif) setProf((rp && rp.data) || { id: cid, pseudo: "" });
        var r = await supa.from("commentaires").select("id, cible, photo_url, medias, created_at")
          .eq("user_id", cid).or("cible.like.ecurie:%,cible.like.club:%,cible.like.agenda:%,cible.like.cheval:%")
          .order("created_at", { ascending: false }).limit(200);
        if (r && r.error) { if (vif) { setErreur(String(r.error.message || r.error)); setVids([]); } return; }
        var out = [], vus = {}, nomChG = {};
        ((r && r.data) || []).forEach(function (po) {
          var tous = [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []);
          tous.forEach(function (u) {
            if (!u || typeof u !== "string" || vus[u]) return;
            if (!estPhotoP(u)) return;
            vus[u] = 1; out.push({ u: u, d: po.created_at, cible: po.cible, pid: po.id });   /* 19/10 etape 3 : la cible sert a retrouver le cheval */
          });
        });
        /* (353) Sa réponse : « les 1 faut les mettre, et les 2 avec son accord » :
           1) les vidéos des ALBUMS DE SES CHEVAUX (chevaux possédés + chevaux rattachés), albums
              publics, ou privés si c est l utilisatrice qui les lit et en est l autrice ;
           2) les vidéos où elle est IDENTIFIÉE, seulement quand elle a ACCEPTÉ (statut « accepte ») :
              identification d une publication (« post:<id> » -> ses médias) ou d un média direct. */
        try {
          var moiV = null; try { moiV = await utilisateurActuel(); } catch (eMv) { moiV = null; }
          var idsCh = [], nomCh = nomChG;
          var rc1 = await supa.from("chevaux").select("id, nom").eq("user_id", cid).limit(60);
          ((rc1 && !rc1.error && rc1.data) || []).forEach(function (cv) { if (cv && cv.id && idsCh.indexOf(cv.id) === -1) { idsCh.push(cv.id); nomCh[String(cv.id)] = cv.nom || ""; } });
          var rl = await supa.from("chevaux_liens").select("cheval_id").eq("user_id", cid).limit(60);
          var idsL = ((rl && !rl.error && rl.data) || []).map(function (x) { return x.cheval_id; }).filter(function (x) { return x && idsCh.indexOf(x) === -1; });
          if (idsL.length) {
            var rc2 = await supa.from("chevaux").select("id, nom").in("id", idsL);
            ((rc2 && !rc2.error && rc2.data) || []).forEach(function (cv) { if (cv && cv.id) { idsCh.push(cv.id); nomCh[String(cv.id)] = cv.nom || ""; } });
          }
          if (idsCh.length) {
            var cibles = idsCh.map(function (x) { return "cheval:" + x; });
            var ra = await supa.from("albums_cheval").select("id, cible, photos, visibilite, user_id, created_at").in("cible", cibles.slice(0, 80));
            ((ra && !ra.error && ra.data) || []).forEach(function (al) {
              if (!al) return;
              if (String(al.visibilite || "public").toLowerCase() === "prive" && !(moiV && al.user_id === moiV.id)) return;
              var nomA = nomCh[String(al.cible || "").slice(7)] || "";
              (Array.isArray(al.photos) ? al.photos : []).forEach(function (u) {
                if (!u || typeof u !== "string" || vus[u]) return;
                if (!estPhotoP(u)) return;
                vus[u] = 1; out.push({ u: u, d: al.created_at, src: nomA, ch: String(al.cible || "").slice(7) });
              });
            });
          }
          /* (482) + ses albums de PROFIL (« cavalier:<elle> ») : publics, ou prives si c est elle qui regarde */
          var rpa = await supa.from("albums_cheval").select("id, photos, visibilite, user_id, created_at").eq("cible", "cavalier:" + cid).limit(60);
          ((rpa && !rpa.error && rpa.data) || []).forEach(function (al) {
            if (!al) return;
            if (String(al.visibilite || "public").toLowerCase() === "prive" && !(moiV && al.user_id === moiV.id)) return;
            (Array.isArray(al.photos) ? al.photos : []).forEach(function (u) { if (!u || typeof u !== "string" || vus[u] || !estPhotoP(u)) return; vus[u] = 1; out.push({ u: u, d: al.created_at }); });
          });
          var ri = await supa.from("identifications").select("photo_url, created_at").eq("type", "cavalier").eq("cible_id", String(cid)).eq("statut", "accepte").limit(200);
          var idsPost = [];
          ((ri && !ri.error && ri.data) || []).forEach(function (x) {
            var pu = String(x.photo_url || "");
            if (pu.indexOf("post:") === 0) { var pid = pu.slice(5); if (pid && idsPost.indexOf(pid) === -1) idsPost.push(pid); return; }
            if (pu && !vus[pu] && estPhotoP(pu)) { vus[pu] = 1; out.push({ u: pu, d: x.created_at, src: "__id__" }); }
          });
          if (idsPost.length) {
            var rpo = await supa.from("commentaires").select("id, photo_url, medias, created_at").in("id", idsPost.slice(0, 100));
            ((rpo && !rpo.error && rpo.data) || []).forEach(function (po) {
              [po.photo_url].concat(Array.isArray(po.medias) ? po.medias : []).forEach(function (u) {
                if (!u || typeof u !== "string" || vus[u]) return;
                if (!estPhotoP(u)) return;
                vus[u] = 1; out.push({ u: u, d: po.created_at, src: "__id__" });
              });
            });
          }
        } catch (eX) { }
        /* 19/10 etape 3 : une publication faite sur la fiche d un de ses chevaux porte ce cheval (aucune deduction : seule la cible compte) */
        try { out.forEach(function (o) { if (!o.ch && typeof o.cible === "string" && o.cible.indexOf("cheval:") === 0) { var idC = o.cible.slice(7); if (nomChG[idC]) { o.ch = idC; if (!o.src) o.src = nomChG[idC]; } } }); } catch (eCh) { }
        out.sort(function (a, b) { return String(b.d || "").localeCompare(String(a.d || "")); });
        /* 19/10 filtres Annee et Cavalier (choix de Blandine) : rien n est deduit.
           - ANNEE = date de prise de vue (table photo_dates), seulement lue dans la photo (exif) ou saisie a la main (manuel).
             La source « album » (date d ajout de l album) et le 1er janvier 2000 (date par defaut d appareil) = « sans date ».
           - CAVALIER (et cheval en complement) = identifications ACCEPTEES de la photo (ou de sa publication « post:<id> »). */
        try {
          var cleP = function (x) { return String(x || "").split("#")[0]; };
          var clesD = []; out.forEach(function (o) { var k = cleP(o.u); if (clesD.indexOf(k) === -1) clesD.push(k); });
          var dates = {};
          for (var iD = 0; iD < clesD.length; iD += 100) {
            var rD = await supa.from("photo_dates").select("photo_url, prise_le, source").in("photo_url", clesD.slice(iD, iD + 100));
            ((rD && !rD.error && rD.data) || []).forEach(function (l) {
              var src = String(l.source || ""); if (src !== "exif" && src.indexOf("manuel") !== 0) return;   /* 19/10 : manuel, manuel_mois, manuel_annee */
              var pl = String(l.prise_le || ""); if (!/^\d{4}-/.test(pl) || pl.slice(0, 10) === "2000-01-01") return;
              var ex = dates[l.photo_url]; if (!ex || (src.indexOf("manuel") === 0 && String(ex.s).indexOf("manuel") !== 0)) dates[l.photo_url] = { d: pl, s: src };
            });
          }
          var refsI = clesD.slice(); out.forEach(function (o) { if (o.pid) refsI.push("post:" + o.pid); });
          var idents = {};
          for (var iI = 0; iI < refsI.length; iI += 100) {
            var rI = await supa.from("identifications").select("photo_url, type, cible_id, cible_nom, statut").in("photo_url", refsI.slice(iI, iI + 100)).eq("statut", "accepte");
            ((rI && !rI.error && rI.data) || []).forEach(function (l) { if (l.statut && l.statut !== "accepte") return; (idents[l.photo_url] = idents[l.photo_url] || []).push(l); });
          }
          out.forEach(function (o) {
            var k = cleP(o.u);
            if (dates[k]) { o.pd = dates[k].d; o.ps = dates[k].s; }
            var lst = (idents[k] || []).concat(o.pid ? (idents["post:" + o.pid] || []) : []);
            var cav = [], vuC = {};
            lst.forEach(function (l) {
              if (l.type === "cavalier" && l.cible_id && !vuC[l.cible_id]) { vuC[l.cible_id] = 1; cav.push({ id: String(l.cible_id), nom: l.cible_nom || "" }); }
              if (l.type === "cheval" && l.cible_id && !o.ch) { o.ch = String(l.cible_id); if (!o.src) o.src = l.cible_nom || ""; }
            });
            if (cav.length) o.cav = cav;
          });
        } catch (eF) { }
        if (vif) setVids(out);
      } catch (eL) { if (vif) { setErreur(String(eL)); setVids([]); } }
    })();
    return function () { vif = false; };
  }, [cid, rech]);
  function dateMois(d) { try { var m = String(d || "").match(/^(\d{4})-(\d{2})/); if (!m) return ""; var lg = (app && app.langue) || "fr"; var LOCM = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }[String(lg).slice(0, 2)] || "fr-FR"; return new Intl.DateTimeFormat(LOCM, { month: "long", year: "numeric" }).format(new Date(Number(m[1]), Number(m[2]) - 1, 15)); } catch (e) { return String(d || "").slice(0, 7); } }
  function dateCourte(d) {   /* 19/10 : date dans la langue de l appli (avant : toujours en francais) */
    try { var m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; var lg = (app && app.langue) || (typeof document !== "undefined" && document.documentElement.lang) || "fr"; var LOCP = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }[String(lg).slice(0, 2)] || "fr-FR"; return new Intl.DateTimeFormat(LOCP, { day: "numeric", month: "short", year: "numeric" }).format(new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))); } catch (e) { return String(d || "").slice(0, 10); }
  }
  var retour = function () { try { if (app.peutReculer && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("cavalier"); };   /* 18/10 : sans page precedente, retour a la page Cavalier (avant : rien) */
  var nom = (prof && prof.pseudo) || "";
  var estMoiPc = !!(moiPc && cid && moiPc === String(cid));
  var SERIF_P = "'Cormorant Garamond',Georgia,serif";
  return h("div", { style: { minHeight: "100vh", background: "#050809" /* 19/10 etape 1 : noir Hype (avant #060709) */, color: "#F3EEE4", paddingBottom: 110, fontFamily: M } },
    h(HypeDrapeauLangue, null),   /* (491) */
    h(HypeBoutonPartagerPage, { obtenir: function () { return cid ? { fam: "pp", val: cid, titre: (prof && prof.pseudo) || "" } : null; } }),   /* (492) */
    /* 15/10 (1139) Blandine : la photo de Mes chevaux en haut de toutes les sous-pages du cavalier. Photo du cavalier s il en a une,
       sinon IMG_CAVALIER_HERO_DEFAUT ; meme retour, meme titre, meme nom (ancien bandeau sans photo). */
    hypeHeroSousPageCavalier({ large: largeP, ordi: ordiP /* (1152) */, retour: retour, libelle: T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진") + (vids && vids.length ? " \u00b7 " + vids.length : ""), nom: nom, photo: ((prof && prof.avatar_url) ? ((typeof avSrc === "function") ? avSrc(prof.avatar_url) : prof.avatar_url) : ""), labelRetour: T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), ecurie: (prof && prof.ecurie && prof.ecurie !== "__perso__") ? prof.ecurie : "" }),
    /* 28/09 (484) : LES ALBUMS « souvenirs » de son profil arrivent ici (retires de la page Histoire, choix de
       Blandine). Meme composant qu avant (creation, ajout, visionneuse). */
    cid ? h("div", { style: { paddingTop: 6 } }, h(AlbumsCheval, { cible: "cavalier:" + cid, teinte: "#C9A66B" /* 19/10 : champagne Hype (avant : teinte de l appli, bleutee) */, habillageHype: true, lectureSeule: (moiPc !== null && !estMoiPc) /* 19/10 etape 4 : un visiteur ne voit ni « + Nouvel album » ni les propositions */ })) : null,
    /* 19/10 etape 1 (choix de Blandine) : titre de section « Photos », espacements 40 / 48 / 56 px, palette Hype,
       etat vide « pictogramme dore » (proposition 2) : le proprietaire est invite a commencer, le visiteur lit un message
       sans bouton. La creation d album reste celle des Albums juste au-dessus (meme regle qu avant). */
    h("div", { style: { padding: (ordiP ? "56px 32px 0" : (largeP ? "48px 32px 0" : "40px 16px 0")) } },
      (vids === null)
        ? h("div", { style: { padding: "30px 0", textAlign: "center", color: "rgba(243,238,228,0.55)", fontSize: 13 } }, T("Chargement\u2026", "Loading\u2026", "Cargando\u2026", "Caricamento\u2026", "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026", "L\u00e4dt\u2026", "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
        : (!vids.length
            ? (erreur
                ? h("div", { style: { borderRadius: 14, border: "1px solid rgba(201,166,107,0.18)", padding: 16, color: "rgba(243,238,228,0.62)", fontSize: 12.5, lineHeight: 1.55 } }, erreur)
                : h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, maxWidth: 760, margin: "0 auto", padding: ordiP ? "34px 30px 32px" : "28px 22px 26px", boxSizing: "border-box", borderRadius: 18, border: "1px solid rgba(201,166,107,0.16)", background: "linear-gradient(180deg, rgba(16,29,34,0.6) 0%, rgba(5,8,9,0.6) 100%)" } },
                    h("div", { "aria-hidden": "true", style: { width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.6)", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 30%, rgba(243,238,228,0.06), rgba(0,0,0,0.25) 75%)" } },
                      h("svg", { viewBox: "0 0 24 24", width: 30, height: 30, fill: "none", stroke: "#C9A66B", strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "M4 8h3l1.6-2.2h6.8L17 8h3v11H4z" }), h("circle", { cx: 12, cy: 13.2, r: 3.4 }))),
                    h("div", { style: { fontFamily: SERIF_P, fontWeight: 500, fontSize: ordiP ? 26 : 24, lineHeight: 1.15, color: "#F3EEE4" } }, estMoiPc
                      ? T("Commence ta phototh\u00e8que", "Start your photo library", "Empieza tu fototeca", "Inizia la tua fototeca", "\u30d5\u30a9\u30c8\u30e9\u30a4\u30d6\u30e9\u30ea\u30fc\u3092\u59cb\u3081\u3088\u3046", "Starte deine Fotothek", "\u0627\u0628\u062f\u0623 \u0645\u0643\u062a\u0628\u0629 \u0635\u0648\u0631\u0643", "开始你的照片库", "Begin je fotobibliotheek", "Comece sua fototeca", "Börja bygga ditt fotobibliotek", "Начни свою фототеку", "Zacznij tworzyć swoją fototekę", "포토 라이브러리를 시작해 보세요")
                      : T("Pas encore de photos", "No photos yet", "A\u00fan no hay fotos", "Ancora nessuna foto", "\u307e\u3060\u5199\u771f\u306f\u3042\u308a\u307e\u305b\u3093", "Noch keine Fotos", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0635\u0648\u0631 \u0628\u0639\u062f", "还没有照片", "Nog geen foto’s", "Ainda sem fotos", "Inga foton ännu", "Фото пока нет", "Na razie brak zdjęć", "아직 사진이 없어요")),
                    h("div", { style: { fontSize: 13, lineHeight: 1.6, color: "rgba(243,238,228,0.62)", maxWidth: 440 } }, estMoiPc
                      ? T("Tes plus beaux souvenirs de concours, d\u2019\u00e9curie et de tes chevaux se rangeront ici. Cr\u00e9e ton premier album juste au-dessus.", "Your best memories from shows, the stable and your horses will be kept here. Create your first album just above.", "Tus mejores recuerdos de concursos, de la cuadra y de tus caballos se guardar\u00e1n aqu\u00ed. Crea tu primer \u00e1lbum justo arriba.", "I tuoi ricordi pi\u00f9 belli di gare, scuderia e cavalli saranno raccolti qui. Crea il tuo primo album qui sopra.", "\u7af6\u6280\u4f1a\u3084\u53a9\u820e\u3001\u611b\u99ac\u306e\u3059\u3066\u304d\u306a\u601d\u3044\u51fa\u304c\u3053\u3053\u306b\u96c6\u307e\u308a\u307e\u3059\u3002\u3059\u3050\u4e0a\u3067\u6700\u521d\u306e\u30a2\u30eb\u30d0\u30e0\u3092\u4f5c\u308d\u3046\u3002", "Deine sch\u00f6nsten Erinnerungen an Turniere, den Stall und deine Pferde landen hier. Erstelle dein erstes Album gleich dar\u00fcber.", "\u0633\u062a\u064f\u062d\u0641\u0638 \u0647\u0646\u0627 \u0623\u062c\u0645\u0644 \u0630\u0643\u0631\u064a\u0627\u062a\u0643 \u0645\u0646 \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062a \u0648\u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0648\u062e\u064a\u0648\u0644\u0643. \u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0623\u0644\u0628\u0648\u0645 \u0644\u0643 \u0641\u064a \u0627\u0644\u0623\u0639\u0644\u0649.", "你在比赛、马厩和你的马身上留下的最美回忆都会收在这里。在上方创建你的第一个相册吧。", "Je mooiste herinneringen aan wedstrijden, de stal en je paarden worden hier bewaard. Maak hierboven je eerste album aan.", "Suas melhores lembranças de competições, da cocheira e dos seus cavalos ficarão guardadas aqui. Crie seu primeiro álbum logo acima.", "Dina finaste minnen från tävlingar, stallet och dina hästar samlas här. Skapa ditt första album precis ovanför.", "Здесь будут храниться твои лучшие воспоминания о соревнованиях, конюшне и твоих лошадях. Создай свой первый альбом чуть выше.", "Twoje najpiękniejsze wspomnienia z zawodów, ze stajni i z twoich koni znajdą się tutaj. Utwórz swój pierwszy album tuż powyżej.", "대회, 마구간, 내 말과의 가장 아름다운 추억이 여기에 정리돼요. 바로 위에서 첫 앨범을 만들어 보세요.")
                      : T("Ce cavalier n\u2019a pas encore partag\u00e9 de souvenirs. Reviens bient\u00f4t d\u00e9couvrir ses concours et ses chevaux.", "This rider hasn\u2019t shared any memories yet. Come back soon to discover their shows and horses.", "Este jinete a\u00fan no ha compartido recuerdos. Vuelve pronto para descubrir sus concursos y sus caballos.", "Questo cavaliere non ha ancora condiviso ricordi. Torna presto a scoprire le sue gare e i suoi cavalli.", "\u3053\u306e\u30e9\u30a4\u30c0\u30fc\u306f\u307e\u3060\u601d\u3044\u51fa\u3092\u5171\u6709\u3057\u3066\u3044\u307e\u305b\u3093\u3002\u307e\u305f\u898b\u306b\u6765\u3066\u306d\u3002", "Dieser Reiter hat noch keine Erinnerungen geteilt. Schau bald wieder vorbei, um seine Turniere und Pferde zu entdecken.", "\u0644\u0645 \u064a\u0634\u0627\u0631\u0643 \u0647\u0630\u0627 \u0627\u0644\u0641\u0627\u0631\u0633 \u0623\u064a \u0630\u0643\u0631\u064a\u0627\u062a \u0628\u0639\u062f. \u0639\u062f \u0642\u0631\u064a\u0628\u0627 \u0644\u0627\u0643\u062a\u0634\u0627\u0641 \u0645\u0633\u0627\u0628\u0642\u0627\u062a\u0647 \u0648\u062e\u064a\u0648\u0644\u0647.", "这位骑手还没有分享回忆。过几天再来看看他的比赛和他的马吧。", "Deze ruiter heeft nog geen herinneringen gedeeld. Kom snel terug om zijn of haar wedstrijden en paarden te ontdekken.", "Este cavaleiro ainda não compartilhou lembranças. Volte em breve para descobrir as competições e os cavalos dele.", "Den här ryttaren har inte delat några minnen ännu. Kom tillbaka snart för att upptäcka hens tävlingar och hästar.", "Этот всадник пока не поделился воспоминаниями. Загляни позже, чтобы узнать о его соревнованиях и лошадях.", "Ten jeździec nie podzielił się jeszcze żadnymi wspomnieniami. Wróć wkrótce, aby odkryć jego zawody i konie.", "이 기수는 아직 추억을 공유하지 않았어요. 곧 다시 와서 대회와 말을 구경해 보세요."))))
            : (function () {
                /* 19/10 etapes 2 et 3 (choix de Blandine) : titre, filtres (Cheval actif ; Annee et Cavalier visibles mais grises
                   tant que la base n a ni date de prise de vue ni personnes associees), 18 photos puis +18, et sur ordinateur
                   6 photos par ligne, 5 quand une photo resterait seule sur la derniere ligne. Rien n est deduit : le cheval vient
                   de l album du cheval ou de la fiche ou la photo a ete publiee. */
                var nT = vids.length;
                var chevx = {}, ordreCh = [], nSans = 0;
                vids.forEach(function (v) { if (v.ch) { if (!chevx[v.ch]) { chevx[v.ch] = { nom: v.src || "?", n: 0 }; ordreCh.push(v.ch); } chevx[v.ch].n++; } else nSans++; });
                ordreCh.sort(function (x, y) { return (chevx[y].n - chevx[x].n) || String(chevx[x].nom).localeCompare(String(chevx[y].nom)); });
                var fc = (filtreCh && (filtreCh === "__sans" || chevx[filtreCh])) ? filtreCh : "";
                /* 19/10 : annees (date de prise de vue) et cavaliers identifies (acceptes) */
                var ans = {}, nSansAn = 0, cavs = {}, ordreCav = [], nSansCav = 0;
                vids.forEach(function (v) {
                  if (v.pd) { var y = String(v.pd).slice(0, 4); ans[y] = (ans[y] || 0) + 1; } else nSansAn++;
                  if (v.cav && v.cav.length) v.cav.forEach(function (c) { if (!cavs[c.id]) { cavs[c.id] = { nom: c.nom || "?", n: 0 }; ordreCav.push(c.id); } cavs[c.id].n++; }); else nSansCav++;
                });
                var ordreAn = Object.keys(ans).sort(function (x, y) { return y.localeCompare(x); });
                ordreCav.sort(function (x, y) { return (cavs[y].n - cavs[x].n) || String(cavs[x].nom).localeCompare(String(cavs[y].nom)); });
                var fa = (filtreAn && (filtreAn === "__sans" || ans[filtreAn])) ? filtreAn : "";
                var fv = (filtreCav && (filtreCav === "__sans" || cavs[filtreCav])) ? filtreCav : "";
                var liste = vids.filter(function (v) {
                  if (fc && !(fc === "__sans" ? !v.ch : v.ch === fc)) return false;
                  if (fa && !(fa === "__sans" ? !v.pd : (v.pd && String(v.pd).slice(0, 4) === fa))) return false;
                  if (fv && !(fv === "__sans" ? !(v.cav && v.cav.length) : (v.cav || []).some(function (c) { return c.id === fv; }))) return false;
                  return true;
                });
                var vis = liste.slice(0, nbAff);
                var k = vis.length;
                var colsO = (k > 1 && k % 6 === 1) ? 5 : 6;
                var avecFiltres = nT >= 12;
                var nomFiltre = fc === "__sans" ? T("sans cheval", "without a horse", "sin caballo", "senza cavallo", "馬なし", "ohne Pferd", "بدون حصان", "没有马", "zonder paard", "sem cavalo", "utan häst", "без лошади", "bez konia", "말 없음") : (fc ? chevx[fc].nom : "");
                function allerHaut() { try { var el = ancreGal.current; if (el) { var y = el.getBoundingClientRect().top + (window.scrollY || 0) - 90; window.scrollTo({ top: Math.max(0, y), behavior: "smooth" }); } } catch (eS) { } }
                function choisir(val) { setFiltreCh(val); setNbAff(18); setTimeout(allerHaut, 30); }
                function choisirAn(val) { setFiltreAn(val); setNbAff(18); setTimeout(allerHaut, 30); }
                function choisirCav(val) { setFiltreCav(val); setNbAff(18); setTimeout(allerHaut, 30); }
                function toutAfficher() { setFiltreCh(""); setFiltreAn(""); setFiltreCav(""); setNbAff(18); setTimeout(allerHaut, 30); }
                var unFiltre = !!(fc || fa || fv);
                function pastille(lib, valTxt, actif, inactif, enfantSelect) {
                  return h("label", { style: { position: "relative", display: "inline-flex", alignItems: "center", gap: 6, minHeight: 34, padding: "0 12px", borderRadius: 999, border: "1px solid " + (actif ? "rgba(201,166,107,0.75)" : "rgba(243,238,228,0.16)"), background: actif ? "rgba(201,166,107,0.08)" : "transparent", color: actif ? "#E6CF9C" : "rgba(243,238,228,0.62)", fontSize: 12, whiteSpace: "nowrap", opacity: inactif ? 0.42 : 1, cursor: inactif ? "default" : "pointer", flex: "0 0 auto" }, title: inactif ? T("Bientôt disponible", "Coming soon", "Próximamente", "Presto disponibile", "近日公開", "Bald verfügbar", "قريبا", "即将上线", "Binnenkort beschikbaar", "Em breve", "Kommer snart", "Скоро будет доступно", "Wkrótce dostępne", "곧 만나요") : undefined },
                    h("b", { style: { fontWeight: 600, color: actif ? "#E6CF9C" : "#F3EEE4" } }, lib), h("span", null, valTxt), h("span", { "aria-hidden": "true", style: { fontSize: 9, opacity: 0.7 } }, "▾"),
                    enfantSelect);
                }
                var TOUS = T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체"), TOUTES = T("Toutes", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alle", "Todas", "Alla", "Все", "Wszystkie", "전체");
                var selCh = h("select", { value: fc, onChange: function (e) { choisir(e.target.value); }, "aria-label": T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말"), style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: 16 } },
                  h("option", { value: "" }, TOUS + " (" + nT + ")"),
                  ordreCh.map(function (idC) { return h("option", { key: idC, value: idC }, chevx[idC].nom + " (" + chevx[idC].n + ")"); }),
                  nSans ? h("option", { value: "__sans" }, T("Sans cheval", "Without a horse", "Sin caballo", "Senza cavallo", "馬なし", "Ohne Pferd", "بدون حصان", "没有马", "Zonder paard", "Sem cavalo", "Utan häst", "Без лошади", "Bez konia", "말 없음") + " (" + nSans + ")") : null);
                var SANS_DATE = T("Sans date", "No date", "Sin fecha", "Senza data", "日付なし", "Ohne Datum", "بدون تاريخ", "未定日期", "Zonder datum", "Sem data", "Utan datum", "Без даты", "Bez daty", "날짜 없음");
                var NON_ID = T("Non identifiées", "Not tagged", "Sin etiquetar", "Non taggate", "未タグ", "Nicht markiert", "غير مشار إليها", "未标记", "Niet getagd", "Não marcadas", "Inte taggade", "Без отметок", "Nieoznaczone", "태그 안 됨");
                var anInactif = !ordreAn.length, cavInactif = !ordreCav.length;
                var selAn = anInactif ? null : h("select", { value: fa, onChange: function (e) { choisirAn(e.target.value); }, "aria-label": T("Année", "Year", "Año", "Anno", "年", "Jahr", "السنة", "年份", "Jaar", "Ano", "År", "Год", "Rok", "연도"), style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: 16 } },
                  h("option", { value: "" }, TOUTES + " (" + nT + ")"),
                  ordreAn.map(function (y) { return h("option", { key: y, value: y }, y + " (" + ans[y] + ")"); }),
                  nSansAn ? h("option", { value: "__sans" }, SANS_DATE + " (" + nSansAn + ")") : null);
                var selCav = cavInactif ? null : h("select", { value: fv, onChange: function (e) { choisirCav(e.target.value); }, "aria-label": T("Cavalier", "Rider", "Jinete", "Cavaliere", "ライダー", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수"), style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: 16 } },
                  h("option", { value: "" }, TOUS + " (" + nT + ")"),
                  ordreCav.map(function (idC) { return h("option", { key: idC, value: idC }, cavs[idC].nom + " (" + cavs[idC].n + ")"); }),
                  nSansCav ? h("option", { value: "__sans" }, NON_ID + " (" + nSansCav + ")") : null);
                var resume = [fa ? (fa === "__sans" ? SANS_DATE : fa) : "", fc ? nomFiltre : "", fv ? (fv === "__sans" ? NON_ID : cavs[fv].nom) : ""].filter(Boolean).join(" · ");
                return h("div", { ref: ancreGal },
                  estMoiPc ? h("div", { style: { float: "inline-end", marginTop: 2 } },
                    h("button", { type: "button", onClick: function () { if (modeSel) { setModeSel(false); setSel({}); } else { setModeSel(true); setSel({}); } }, style: { minHeight: 34, padding: "0 14px", borderRadius: 999, border: "1px solid " + (modeSel ? "rgba(201,166,107,0.75)" : "rgba(201,166,107,0.4)"), background: modeSel ? "rgba(201,166,107,0.08)" : "transparent", color: modeSel ? "#E6CF9C" : "#C9A66B", fontFamily: M, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" } },
                      modeSel ? T("Terminer", "Done", "Terminar", "Fine", "\u5b8c\u4e86", "Fertig", "\u062a\u0645", "完成", "Klaar", "Concluir", "Klart", "Готово", "Gotowe", "완료") : T("S\u00e9lectionner", "Select", "Seleccionar", "Seleziona", "\u9078\u629e", "Ausw\u00e4hlen", "\u062a\u062d\u062f\u064a\u062f", "选择", "Selecteren", "Selecionar", "Välj", "Выбрать", "Wybierz", "선택"))) : null,
                  h("div", { style: { marginBottom: 14 } },
                    h("h2", { style: { margin: 0, fontFamily: SERIF_P, fontWeight: 500, fontSize: ordiP ? 28 : (largeP ? 26 : 24), lineHeight: 1.1, color: "#F3EEE4" } }, nT > 18 ? T("Photos récentes", "Recent photos", "Fotos recientes", "Foto recenti", "最近の写真", "Neueste Fotos", "أحدث الصور", "最近的照片", "Recente foto’s", "Fotos recentes", "Senaste foton", "Недавние фото", "Ostatnie zdjęcia", "최근 사진") : T("Photos", "Photos", "Fotos", "Foto", "写真", "Fotos", "الصور", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진")),
                    h("div", { style: { marginTop: 3, fontSize: 12, color: "#C9A66B" } }, nT + " " + (nT > 1 ? T("photos", "photos", "fotos", "foto", "枚", "Fotos", "صور", "张照片", "foto's", "fotos", "foton", "фото", "zdjęcia", "사진") : T("photo", "photo", "foto", "foto", "枚", "Foto", "صورة", "张照片", "foto", "foto", "foto", "фото", "zdjęcie", "사진")))),
                  avecFiltres ? h("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: largeP ? "wrap" : "nowrap", overflowX: largeP ? "visible" : "auto", scrollbarWidth: "none", marginBottom: 4 } },
                    pastille(T("Année", "Year", "Año", "Anno", "年", "Jahr", "السنة", "年份", "Jaar", "Ano", "År", "Год", "Rok", "연도"), fa ? (fa === "__sans" ? SANS_DATE : fa) : TOUTES, !!fa, anInactif, selAn),
                    pastille(T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "الحصان", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말"), fc === "__sans" ? T("Aucun", "None", "Ninguno", "Nessuno", "\u306a\u3057", "Keins", "\u0644\u0627 \u0634\u064a\u0621", "无", "Geen", "Nenhum", "Inga", "Нет", "Brak", "없음") : (fc ? nomFiltre : TOUS), !!fc, false, selCh),
                    pastille(T("Cavalier", "Rider", "Jinete", "Cavaliere", "ライダー", "Reiter", "الفارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수"), fv ? (fv === "__sans" ? NON_ID : cavs[fv].nom) : TOUS, !!fv, cavInactif, selCav),
                    unFiltre ? h("button", { type: "button", onClick: toutAfficher, style: { flex: "0 0 auto", background: "none", border: "none", padding: "6px 4px", fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.55)", textDecoration: "underline", textDecorationColor: "rgba(201,166,107,0.45)", textUnderlineOffset: 3, cursor: "pointer", whiteSpace: "nowrap" } }, T("Tout afficher", "Show all", "Ver todo", "Mostra tutto", "すべて表示", "Alle zeigen", "عرض الكل", "全部显示", "Alles tonen", "Exibir tudo", "Visa allt", "Показать всё", "Pokaż wszystko", "모두 표시")) : null) : null,
                  (avecFiltres && unFiltre) ? h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,0.45)", margin: "8px 0 0" } }, liste.length + " " + (liste.length > 1 ? T("photos", "photos", "fotos", "foto", "枚", "Fotos", "صور", "张照片", "foto's", "fotos", "foton", "фото", "zdjęcia", "사진") : T("photo", "photo", "foto", "foto", "枚", "Foto", "صورة", "张照片", "foto", "foto", "foto", "фото", "zdjęcie", "사진")) + " · " + resume) : null,
                  !liste.length
                    ? h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", padding: "26px 16px", marginTop: 14, borderRadius: 14, border: "1px solid rgba(201,166,107,0.16)", fontSize: 12.5, color: "rgba(243,238,228,0.62)" } },
                        h("div", { style: { fontFamily: SERIF_P, fontSize: 20, fontWeight: 500, color: "#F3EEE4" } }, T("Aucune photo ne correspond", "No matching photo", "Ninguna foto coincide", "Nessuna foto corrisponde", "該当する写真はありません", "Kein passendes Foto", "لا توجد صور مطابقة", "没有匹配的照片", "Geen enkele foto komt overeen", "Nenhuma foto corresponde", "Inget foto matchar", "Подходящих фото нет", "Żadne zdjęcie nie pasuje", "일치하는 사진이 없어요")),
                        h("button", { type: "button", onClick: toutAfficher, style: { minHeight: 36, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "transparent", color: "#C9A66B", fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, T("Tout afficher", "Show all", "Ver todo", "Mostra tutto", "すべて表示", "Alle zeigen", "عرض الكل", "全部显示", "Alles tonen", "Exibir tudo", "Visa allt", "Показать всё", "Pokaż wszystko", "모두 표시")))
                    : h("div", { style: { display: "grid", gridTemplateColumns: ordiP ? "repeat(" + colsO + ", minmax(0, 1fr))" : (largeP ? "repeat(4, minmax(0, 1fr))" : "1fr 1fr 1fr") /* (1152) ; 19/10 : 5 colonnes si une photo resterait seule */, gap: ordiP ? 14 : (largeP ? 12 : 8), marginTop: avecFiltres ? 12 : 0 } },
                    vis.map(function (v, i) {
                      var choisie = !!(modeSel && sel[v.u]);
                      return h("div", { key: v.u, role: "button", "aria-pressed": modeSel ? choisie : undefined, onClick: function () { if (modeSel) { setSel(function (o) { var n2 = Object.assign({}, o); if (n2[v.u]) delete n2[v.u]; else n2[v.u] = v; return n2; }); return; } setVisu(v.u); }, style: { cursor: "pointer", minWidth: 0 } },
                        h("div", { style: { position: "relative", width: "100%", aspectRatio: "3 / 4", borderRadius: 12, overflow: "hidden", background: "#101D22", border: choisie ? "2px solid #C9A66B" : "1px solid rgba(243,238,228,0.07)", boxSizing: "border-box" } },
                          modeSel ? h("span", { "aria-hidden": "true", style: { position: "absolute", top: 6, insetInlineEnd: 6, zIndex: 2, width: 22, height: 22, borderRadius: "50%", border: "1.5px solid " + (choisie ? "#C9A66B" : "rgba(243,238,228,0.8)"), background: choisie ? "#C9A66B" : "rgba(3,7,8,0.45)", color: "#050809", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 } }, choisie ? "\u2713" : "") : null,
                          h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(v.u, 360) : v.u, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } })),
                        h("div", { style: { fontSize: 9.5, color: "rgba(243,238,228,0.45)", marginTop: 4, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                          v.src === "__id__" ? T("Identifiée", "Tagged", "Etiquetada", "Taggata", "タグ", "Markiert", "أشير إليها", "被标记", "Getagd", "Marcada", "Taggad", "Отмечена", "Oznaczone", "태그됨") : h(React.Fragment, null, (v.ps === "manuel_annee" ? String(v.pd).slice(0, 4) : (v.ps === "manuel_mois" ? dateMois(v.pd) : dateCourte(v.pd || v.d))) /* 19/10 : date de prise de vue si connue, a la precision saisie */, v.src ? h("span", null, " · ", h("span", { style: { color: "rgba(230,207,156,0.85)" } }, v.src)) : null)));
                    })),
                  (liste.length > k) ? h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 22 } },
                    h("button", { type: "button", onClick: function () { setNbAff(nbAff + 18); }, style: { minHeight: 42, padding: "0 20px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", background: "transparent", color: "#E6CF9C", fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, T("Afficher 18 photos de plus", "Show 18 more photos", "Ver 18 fotos más", "Mostra altre 18 foto", "さらに18枚表示", "18 weitere Fotos zeigen", "عرض 18 صورة أخرى", "再显示 18 张照片", "18 foto’s meer tonen", "Mostrar mais 18 fotos", "Visa 18 foton till", "Показать ещё 18 фото", "Pokaż 18 zdjęć więcej", "사진 18장 더 보기")),
                    h("span", { style: { fontSize: 11, color: "rgba(243,238,228,0.42)" } }, k + " " + T("sur", "of", "de", "su", "/", "von", "من", "/", "van", "de", "av", "из", "z", "중") + " " + liste.length)) : null);
              })())),
    /* 19/10 etape 1 : bas de page HYPE (paysage + signature), 118 / 150 / 180 px */
    h("div", { "aria-hidden": "true", style: { paddingTop: largeP ? 64 : 56 } },
      h("div", { style: { position: "relative", height: ordiP ? 180 : (largeP ? 150 : 118), overflow: "hidden" } },
        h("img", { src: "images/ecurie-fin-de-page-2.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, #050809 0%, rgba(5,8,9,0) 12%, rgba(5,8,9,0) 88%, #050809 100%)" } })),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "6px 24px 0" } },
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,166,107,0), rgba(201,166,107,0.55))" } }),
        h("span", { dir: "ltr", style: { fontFamily: SERIF_P, fontSize: 13, letterSpacing: 4, paddingInlineStart: 4, color: "#C9A66B" } }, "HYPE"),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(270deg, rgba(201,166,107,0), rgba(201,166,107,0.55))" } }))),
    (estMoiPc && modeSel) ? (function () {
      /* 19/10 classement en lot : barre en bas + feuilles « Dater » / « Identifier » */
      var lstSel = Object.keys(sel).map(function (k) { return sel[k]; });
      var nS = lstSel.length;
      var BTN = { minHeight: 40, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.6)", background: "transparent", color: "#E6CF9C", fontFamily: M, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" };
      var cleL = function (x) { return String(x || "").split("#")[0]; };
      async function appliquerDate() {
        setEtatLot("envoi");
        try {
          var u = await utilisateurActuel(); if (!u) { setEtatLot("erreur"); return; }
          var y = Number(lotAn), mo = lotMois ? Number(lotMois) : 0;
          var iso = mo ? (y + "-" + String(mo).padStart(2, "0") + "-15T12:00:00Z") : (y + "-07-01T12:00:00Z");
          var lignes = lstSel.map(function (v) { return { photo_url: cleL(v.u), prise_le: iso, source: mo ? "manuel_mois" : "manuel_annee", user_id: u.id }; });
          var ok = 0, ko = 0;
          for (var i = 0; i < lignes.length; i += 50) { var r = await supa.from("photo_dates").upsert(lignes.slice(i, i + 50), { onConflict: "photo_url" }); if (r && r.error) ko += Math.min(50, lignes.length - i); else ok += Math.min(50, lignes.length - i); }
          setEtatLot(ko ? ("partiel:" + ok + "/" + lignes.length) : ("ok:" + ok)); setFeuilleLot(""); setSel({}); setRech(rech + 1);
        } catch (e) { setEtatLot("erreur"); }
      }
      async function chercherCav(q) {
        setLotRech(q);
        try { if (String(q).trim().length < 2) { setLotRes([]); return; } var r = await supa.from("profiles").select("id, pseudo").ilike("pseudo", "%" + String(q).trim().replace(/[%_]/g, "") + "%").limit(8); setLotRes(((r && r.data) || []).filter(function (x) { return x && x.id; })); } catch (e) { setLotRes([]); }
      }
      async function appliquerIdent() {
        setEtatLot("envoi");
        try {
          var u = await utilisateurActuel(); if (!u || !lotCibles.length) { setEtatLot("erreur"); return; }
          var refs = lstSel.map(function (v) { return cleL(v.u); });
          var deja = {};
          for (var i = 0; i < refs.length; i += 100) { var rE = await supa.from("identifications").select("photo_url, type, cible_id").in("photo_url", refs.slice(i, i + 100)); ((rE && rE.data) || []).forEach(function (l) { deja[l.photo_url + "|" + l.type + "|" + l.cible_id] = 1; }); }
          var mesCh = {}; try { var rC = await supa.from("chevaux").select("id").eq("user_id", u.id).limit(200); ((rC && rC.data) || []).forEach(function (c) { mesCh[String(c.id)] = 1; }); } catch (eC) { }
          var lignes = [], parPers = {};
          refs.forEach(function (ref) { lotCibles.forEach(function (c) {
            if (deja[ref + "|" + c.type + "|" + c.id]) return;
            var auto = (c.type === "cavalier" && String(c.id) === String(u.id)) || (c.type === "cheval" && mesCh[String(c.id)]);
            lignes.push({ photo_url: ref, type: c.type, cible_id: String(c.id), cible_nom: c.nom || null, auteur_id: u.id, statut: auto ? "accepte" : "attente" });
            if (c.type === "cavalier" && !auto) parPers[c.id] = (parPers[c.id] || 0) + 1;
          }); });
          var ko = 0;
          for (var j = 0; j < lignes.length; j += 50) { var rI = await supa.from("identifications").insert(lignes.slice(j, j + 50)); if (rI && rI.error) ko += Math.min(50, lignes.length - j); }
          Object.keys(parPers).forEach(function (idP) { try { hypeNotifier({ type: "identification_photos", destinataire: String(idP), contexte: String(parPers[idP]), cible: "photos-cavalier:" + idP }); } catch (eN) { } });
          setEtatLot(ko ? ("partiel:" + (lignes.length - ko) + "/" + lignes.length) : ("ok:" + lignes.length)); setFeuilleLot(""); setSel({}); setLotCibles([]); setLotRech(""); setLotRes([]); setRech(rech + 1);
        } catch (e) { setEtatLot("erreur"); }
      }
      var chevauxConnus = {}; (vids || []).forEach(function (v) { if (v.ch && v.src && v.src !== "__id__") chevauxConnus[v.ch] = v.src; });
      var annees = []; for (var yA = new Date().getFullYear(); yA >= 1990; yA--) annees.push(String(yA));
      var MOIS = []; for (var mI = 1; mI <= 12; mI++) { var nm = ""; try { nm = new Intl.DateTimeFormat(({ fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" })[String((app && app.langue) || "fr").slice(0, 2)] || "fr-FR", { month: "long" }).format(new Date(2020, mI - 1, 15)); } catch (eM) { nm = String(mI); } MOIS.push([String(mI), nm]); }
      var SEL_ST = { width: "100%", minHeight: 44, padding: "0 12px", borderRadius: 12, border: "1px solid rgba(201,166,107,0.35)", background: "#101D22", color: "#F3EEE4", fontFamily: M, fontSize: 16 };
      var msg = etatLot === "envoi" ? T("Enregistrement…", "Saving…", "Guardando…", "Salvataggio…", "保存中…", "Wird gespeichert…", "جار الحفظ…", "保存中…", "Opslaan…", "Salvando…", "Sparar…", "Сохранение…", "Zapisywanie…", "저장하는 중…")
        : (/^ok:/.test(etatLot) ? ("✓ " + etatLot.slice(3) + " " + T("enregistré(s)", "saved", "guardado(s)", "salvato/i", "件保存", "gespeichert", "تم الحفظ", "已保存", "opgeslagen", "salvo(s)", "sparade", "сохранено", "zapisano", "저장됨"))
        : (/^partiel:/.test(etatLot) ? (etatLot.slice(8) + " " + T("enregistré(s) — certains refusés", "saved — some refused", "guardado(s) — algunos rechazados", "salvati — alcuni rifiutati", "件保存（一部拒否）", "gespeichert — einige abgelehnt", "حُفظ — بعضها رُفض", "已保存——部分被拒绝", "opgeslagen — sommige geweigerd", "salvo(s) — alguns recusados", "sparade – vissa nekades", "сохранено — некоторые отклонены", "zapisano — niektóre odrzucone", "저장됨 — 일부는 거부됨"))
        : (etatLot === "erreur" ? T("Pas enregistré", "Not saved", "No guardado", "Non salvato", "保存できませんでした", "Nicht gespeichert", "لم يتم الحفظ", "未保存", "Niet opgeslagen", "Não salvo", "Inte sparat", "Не сохранено", "Nie zapisano", "저장 안 됨") : "")));
      var feuille = !feuilleLot ? null : h("div", { onClick: function () { setFeuilleLot(""); }, style: { position: "fixed", inset: 0, zIndex: 9200, background: "rgba(3,7,8,0.72)", display: "flex", alignItems: largeP ? "center" : "flex-end", justifyContent: "center" } },
        h("div", { onClick: function (e) { e.stopPropagation(); }, role: "dialog", style: { width: "100%", maxWidth: 480, maxHeight: "86vh", overflowY: "auto", boxSizing: "border-box", background: "#101D22", borderRadius: largeP ? 20 : "20px 20px 0 0", border: "1px solid rgba(201,166,107,0.18)", padding: largeP ? "22px 20px" : "20px 18px calc(env(safe-area-inset-bottom) + 96px)", color: "#F3EEE4", fontFamily: M } },
          h("div", { style: { fontFamily: SERIF_P, fontSize: 22, marginBottom: 4 } }, feuilleLot === "dater" ? T("Dater les photos", "Date the photos", "Fechar las fotos", "Data le foto", "写真の日付", "Fotos datieren", "تأريخ الصور", "标注照片日期", "De foto’s dateren", "Datar as fotos", "Datera fotona", "Датировать фото", "Ustaw daty zdjęć", "사진에 날짜 지정") : T("Qui est sur ces photos ?", "Who is in these photos?", "¿Quién aparece en estas fotos?", "Chi c’è in queste foto?", "写っているのは誰？", "Wer ist auf diesen Fotos?", "من في هذه الصور؟", "这些照片里有谁？", "Wie staat er op deze foto’s?", "Quem aparece nestas fotos?", "Vem är med på de här fotona?", "Кто на этих фото?", "Kto jest na tych zdjęciach?", "이 사진에는 누가 있나요?")),
          h("div", { style: { fontSize: 12.5, color: "rgba(243,238,228,0.6)", marginBottom: 14 } }, nS + " " + (nS > 1 ? T("photos sélectionnées", "photos selected", "fotos seleccionadas", "foto selezionate", "枚選択中", "Fotos ausgewählt", "صور محددة", "张照片已选中", "foto’s geselecteerd", "fotos selecionadas", "foton valda", "фото выбрано", "zaznaczonych zdjęć", "장 선택됨") : T("photo sélectionnée", "photo selected", "foto seleccionada", "foto selezionata", "枚選択中", "Foto ausgewählt", "صورة محددة", "张照片已选中", "foto geselecteerd", "foto selecionada", "foto valt", "фото выбрано", "zaznaczone zdjęcie", "장 선택됨"))),
          feuilleLot === "dater" ? h(React.Fragment, null,
            h("div", { style: { display: "flex", gap: 10 } },
              h("select", { value: lotAn, onChange: function (e) { setLotAn(e.target.value); }, "aria-label": T("Année", "Year", "Año", "Anno", "年", "Jahr", "السنة", "年份", "Jaar", "Ano", "År", "Год", "Rok", "연도"), style: SEL_ST }, annees.map(function (yy) { return h("option", { key: yy, value: yy }, yy); })),
              h("select", { value: lotMois, onChange: function (e) { setLotMois(e.target.value); }, "aria-label": T("Mois", "Month", "Mes", "Mese", "月", "Monat", "الشهر", "月份", "Maand", "Mês", "Månad", "Месяц", "Miesiąc", "월"), style: SEL_ST }, h("option", { value: "" }, T("Mois inconnu", "Month unknown", "Mes desconocido", "Mese sconosciuto", "月不明", "Monat unbekannt", "الشهر غير معروف", "月份未知", "Maand onbekend", "Mês desconhecido", "Okänd månad", "Месяц неизвестен", "Miesiąc nieznany", "월 모름")), MOIS.map(function (mm) { return h("option", { key: mm[0], value: mm[0] }, mm[1]); }))),
            h("div", { style: { marginTop: 10, fontSize: 11.5, lineHeight: 1.5, color: "rgba(243,238,228,0.5)" } }, T("Remplace la date actuelle de ces photos.", "Replaces the current date of these photos.", "Reemplaza la fecha actual de estas fotos.", "Sostituisce la data attuale di queste foto.", "これらの写真の日付を置き換えます。", "Ersetzt das aktuelle Datum dieser Fotos.", "يستبدل التاريخ الحالي لهذه الصور.", "替换这些照片当前的日期。", "Vervangt de huidige datum van deze foto’s.", "Substitui a data atual destas fotos.", "Ersätter det nuvarande datumet för de här fotona.", "Заменяет текущую дату этих фото.", "Zastępuje obecną datę tych zdjęć.", "이 사진들의 현재 날짜를 바꿔요.")),
            h("button", { type: "button", disabled: etatLot === "envoi", onClick: appliquerDate, style: Object.assign({}, BTN, { width: "100%", marginTop: 16, minHeight: 46 }) }, T("Appliquer", "Apply", "Aplicar", "Applica", "適用", "Übernehmen", "تطبيق", "应用", "Toepassen", "Aplicar", "Tillämpa", "Применить", "Zastosuj", "적용")))
          : h(React.Fragment, null,
            lotCibles.length ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 } }, lotCibles.map(function (c) { return h("button", { key: c.type + c.id, type: "button", onClick: function () { setLotCibles(lotCibles.filter(function (x) { return !(x.type === c.type && x.id === c.id); })); }, style: { minHeight: 30, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(201,166,107,0.08)", color: "#E6CF9C", fontFamily: M, fontSize: 12, cursor: "pointer" } }, (c.type === "cheval" ? "\u{1F40E} " : "") + c.nom + " ×"); })) : null,
            h("input", { value: lotRech, onChange: function (e) { chercherCav(e.target.value); }, placeholder: T("Chercher un cavalier…", "Search a rider…", "Buscar un jinete…", "Cerca un cavaliere…", "ライダーを検索…", "Reiter suchen…", "ابحث عن فارس…", "搜索骑手…", "Een ruiter zoeken…", "Procurar um cavaleiro…", "Sök efter en ryttare…", "Найти всадника…", "Szukaj jeźdźca…", "기수 검색…"), style: Object.assign({}, SEL_ST, { boxSizing: "border-box", outline: "none" }) }),
            lotRes.length ? h("div", { style: { marginTop: 6, display: "flex", flexDirection: "column" } }, lotRes.map(function (pR) { return h("button", { key: pR.id, type: "button", onClick: function () { if (!lotCibles.some(function (x) { return x.type === "cavalier" && x.id === pR.id; })) setLotCibles(lotCibles.concat([{ type: "cavalier", id: pR.id, nom: pR.pseudo || "?" }])); setLotRech(""); setLotRes([]); }, style: { minHeight: 42, textAlign: "start", padding: "0 6px", background: "none", border: "none", borderBottom: "1px solid rgba(201,166,107,0.12)", color: "#F3EEE4", fontFamily: M, fontSize: 14, cursor: "pointer" } }, pR.pseudo || "?"); })) : null,
            Object.keys(chevauxConnus).length ? h("div", { style: { marginTop: 14 } },
              h("div", { style: { fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(243,238,228,0.45)", marginBottom: 6 } }, T("Chevaux", "Horses", "Caballos", "Cavalli", "馬", "Pferde", "الخيول", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말")),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, Object.keys(chevauxConnus).map(function (idC) { var on = lotCibles.some(function (x) { return x.type === "cheval" && x.id === idC; }); return h("button", { key: idC, type: "button", onClick: function () { setLotCibles(on ? lotCibles.filter(function (x) { return !(x.type === "cheval" && x.id === idC); }) : lotCibles.concat([{ type: "cheval", id: idC, nom: chevauxConnus[idC] }])); }, style: { minHeight: 32, padding: "0 12px", borderRadius: 999, border: "1px solid " + (on ? "rgba(201,166,107,0.75)" : "rgba(243,238,228,0.16)"), background: on ? "rgba(201,166,107,0.08)" : "transparent", color: on ? "#E6CF9C" : "rgba(243,238,228,0.75)", fontFamily: M, fontSize: 12, cursor: "pointer" } }, chevauxConnus[idC]); }))) : null,
            h("div", { style: { marginTop: 12, fontSize: 11.5, lineHeight: 1.5, color: "rgba(243,238,228,0.5)" } }, T("Chaque cavalier reçoit une seule notification et accepte depuis sa page Photos avant que les photos y apparaissent.", "Each rider gets a single notification and accepts from their Photos page before the photos appear there.", "Cada jinete recibe una sola notificación y acepta desde su página Fotos antes de que aparezcan.", "Ogni cavaliere riceve una sola notifica e accetta dalla sua pagina Foto prima che le foto vi appaiano.", "各ライダーには通知が1件届き、写真ページで承認すると表示されます。", "Jeder Reiter erhält eine einzige Benachrichtigung und bestätigt auf seiner Fotoseite, bevor die Fotos dort erscheinen.", "يتلقى كل فارس إشعارا واحدا ويوافق من صفحة صوره قبل ظهورها.", "每位骑手只会收到一条通知，并在他的照片页面接受后，照片才会出现在那里。", "Elke ruiter krijgt één melding en accepteert op zijn of haar Foto’s-pagina voordat de foto’s daar verschijnen.", "Cada cavaleiro recebe uma única notificação e aceita na própria página de Fotos antes que as fotos apareçam lá.", "Varje ryttare får en enda avisering och godkänner från sin Foton-sida innan fotona visas där.", "Каждый всадник получает одно уведомление и подтверждает на своей странице «Фото», прежде чем фото там появятся.", "Każdy jeździec dostaje jedno powiadomienie i akceptuje je na swojej stronie Zdjęcia, zanim zdjęcia się tam pojawią.", "기수마다 알림이 한 번만 가고, 기수가 자신의 사진 페이지에서 수락해야 사진이 거기에 나타나요.")),
            h("button", { type: "button", disabled: etatLot === "envoi" || !lotCibles.length, onClick: appliquerIdent, style: Object.assign({}, BTN, { width: "100%", marginTop: 16, minHeight: 46, opacity: lotCibles.length ? 1 : 0.45 }) }, T("Identifier", "Tag", "Etiquetar", "Tagga", "タグ付け", "Markieren", "الإشارة", "标记人物", "Taggen", "Marcar", "Tagga", "Отметить", "Oznacz", "태그하기"))),
          h("button", { type: "button", onClick: function () { setFeuilleLot(""); }, style: { marginTop: 8, width: "100%", minHeight: 42, border: "none", background: "transparent", color: "rgba(243,238,228,0.6)", fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"))));
      return h(React.Fragment, null,
        h("div", { style: { position: "fixed", insetInline: 0, bottom: ordiP ? 20 : "calc(env(safe-area-inset-bottom) + 84px)", zIndex: 9100, display: "flex", justifyContent: "center", pointerEvents: "none", paddingInline: 12 } },
          h("div", { style: { pointerEvents: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "10px 12px", borderRadius: 18, border: "1px solid rgba(201,166,107,0.3)", background: "rgba(10,18,22,0.96)", boxShadow: "0 12px 30px rgba(0,0,0,0.6)", fontFamily: M, maxWidth: 560 } },
            h("span", { style: { fontSize: 12.5, color: "#F3EEE4", paddingInline: 4 } }, msg || (nS + " " + (nS > 1 ? T("sélectionnées", "selected", "seleccionadas", "selezionate", "枚選択", "ausgewählt", "محددة", "已选中", "geselecteerd", "selecionadas", "valda", "выбрано", "zaznaczone", "선택됨") : T("sélectionnée", "selected", "seleccionada", "selezionata", "枚選択", "ausgewählt", "محددة", "已选中", "geselecteerd", "selecionada", "vald", "выбрано", "zaznaczone", "선택됨")))),
            h("button", { type: "button", disabled: !nS, onClick: function () { setEtatLot(""); setFeuilleLot("dater"); }, style: Object.assign({}, BTN, { opacity: nS ? 1 : 0.4 }) }, T("Dater", "Date", "Fechar", "Data", "日付", "Datieren", "تأريخ", "标注日期", "Dateren", "Datar", "Datera", "Датировать", "Ustaw datę", "날짜 지정")),
            h("button", { type: "button", disabled: !nS, onClick: function () { setEtatLot(""); setFeuilleLot("identifier"); }, style: Object.assign({}, BTN, { opacity: nS ? 1 : 0.4 }) }, T("Identifier", "Tag", "Etiquetar", "Tagga", "タグ付け", "Markieren", "الإشارة", "标记人物", "Taggen", "Marcar", "Tagga", "Отметить", "Oznacz", "태그하기")))),
        feuille);
    })() : null,
    (typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(visu, function () { setVisu(null); }) : null);
}
window.HypePhotosCav = { PhotosCav: EcranPhotosCavaliere };
})();
