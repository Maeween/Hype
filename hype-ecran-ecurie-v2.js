/* HYPE ▸ 30/10/2026 — Dessin de la page ÉCURIE DU CLUB (EcranEcurieV2), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~147 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranEcurieV2(props) {
  var h = React.createElement;
  var large = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : useHypeLarge();   /* (859) ; (1019) aussi tablette (>= 768 px) */
  var d = props.d || {};
  var T = d.T;
  var setEcran = d.setEcran || function () { };
  var rtl = d.lg === "ar";
  var NOIR = "#050809" /* (662) noir bleute, brief de Blandine du 05/10 (avant 030706, un noir vert ; 548) */, SURF = "#101D22" /* (662) surfaces bleu petrole (avant 0E1A18, vert) */, IV = "#F3EEE4", CH = "#C9A66B", GR2 = "#BDB6AA", GR3 = "#8E8A80";
  var BORD = "rgba(201,166,107,0.28)", BORD2 = "rgba(201,166,107,0.18)", OMBRE = "0 6px 18px rgba(0,0,0,0.28)";
  var SERIF = "'Cormorant Garamond',Georgia,serif", M = "'Montserrat',sans-serif";
  var CHEV = rtl ? "‹" : "›";
  var FLECHE = rtl ? "←" : "→";

  var pont = React.useRef(null);
  /* 12/10 (1046) Blandine : « l idee c est de mettre une image de fond comme on vient de faire pour la page Chevaux » -> la photo
     de couverture de l ecurie devient un FOND FIXE (meme principe que « Mes chevaux » et Communaute) : son haut fait office de
     hero, elle se fond dans le noir en bas, les encarts glissent dessus, un voile noir fonce sur les 320 premiers px de
     defilement. Photo JAMAIS recadree : verticale -> entiere, calee a droite (a gauche en arabe), bord fondu ; horizontale ->
     entiere sur toute la largeur. */
  var menuFondEc = (typeof useHypeLarge === "function") ? useHypeLarge() : false;
  var refNuitEc = React.useRef(null);
  React.useEffect(function () {
    var att = false;
    function maj() { att = false; try { var y = window.scrollY || document.documentElement.scrollTop || 0; if (refNuitEc.current) refNuitEc.current.style.opacity = String(Math.max(0, Math.min(1, y / 320))); } catch (eN) { } }
    function surDefil() { if (!att) { att = true; requestAnimationFrame(maj); } }
    maj(); window.addEventListener("scroll", surDefil, { passive: true });
    return function () { window.removeEventListener("scroll", surDefil); };
  }, []);
  /* 22/10 15 h 47 (Blandine : « Oui par tlm », « En dessous de l onglet écurie ») : LES GROUPES DE L ECURIE, visibles par
     toutes les personnes connectées, juste sous l en-tête de l écurie. On montre la Team (équipe) et les piquets qui ont au
     moins un cavalier. Rien n est écrit ; lecture soumise à la RLS existante. */
  var _grE = React.useState([]); var groupesEc = _grE[0], setGroupesEc = _grE[1];
  React.useEffect(function () {
    var vivant = true;
    var nomC = String(d.monClub || "").trim();
    if (!nomC || d.visiteurG === true || typeof supa === "undefined" || !supa || typeof hypeClefClubPiquets !== "function") { setGroupesEc([]); return; }
    (async function () {
      try {
        var cle = hypeClefClubPiquets(nomC);
        var rg = await supa.from("groupes").select("id, nom, nature, club_clef, discipline, niveau, saison, photo_url, ordre, cree_le").eq("club_clef", cle);
        var gs = (rg && !rg.error && Array.isArray(rg.data)) ? rg.data : [];
        var nb = {};
        if (gs.length) {
          try { var rm = await supa.from("groupes_membres").select("groupe_id").in("groupe_id", gs.map(function (g) { return g.id; })); ((rm && !rm.error && rm.data) || []).forEach(function (x) { nb[x.groupe_id] = (nb[x.groupe_id] || 0) + 1; }); } catch (eM) { }
        }
        var l = gs.filter(function (g) { return g.nature === "equipe" || (nb[g.id] || 0) > 0; });
        l.sort(function (x, y) { return ((x.nature === "equipe" ? 0 : 1) - (y.nature === "equipe" ? 0 : 1)) || ((x.ordre == null ? 9999 : x.ordre) - (y.ordre == null ? 9999 : y.ordre)) || String(x.cree_le || "").localeCompare(String(y.cree_le || "")); });
        if (vivant) setGroupesEc(l.map(function (g) { return Object.assign({}, g, { __club: nomC }); }));
      } catch (eG) { if (vivant) setGroupesEc([]); }
    })();
    return function () { vivant = false; };
  }, [d.monClub, d.visiteurG]);
  var _ev = React.useState(null); var evs = _ev[0], setEvs = _ev[1];
  /* 26/10 (Blandine) : les 3 derniers événements passés de l'écurie, sous les prochains événements */
  var _evp = React.useState(null); var evsPasses = _evp[0], setEvsPasses = _evp[1];
  React.useEffect(function () {
    var vivant = true, nomC = String(d.monClub || "").trim();
    if (!nomC || typeof chargerAgendaClubPasse !== "function") { setEvsPasses([]); return; }
    var clefP = (typeof clefClubG === "function") ? clefClubG(nomC) : nomC.toLowerCase();
    chargerAgendaClubPasse(clefP).then(function (r) { if (vivant) setEvsPasses((r && r.data) || []); }).catch(function () { if (vivant) setEvsPasses([]); });
    return function () { vivant = false; };
  }, [d.monClub]);
  var _sh = React.useState(false); var feuilleEc = _sh[0], setFeuilleEc = _sh[1];
  var _po = React.useState(null); var post = _po[0], setPost = _po[1];
  var _sv = React.useState(null); var souvFil = _sv[0], setSouv = _sv[1];
  /* (547) Blandine : « pourquoi les souvenirs de la SEP sont vides alors qu il y a des photos dans les albums » -
     on ajoute les albums PUBLICS des chevaux du club, la MEME lecture que la page Souvenirs (albums_cheval,
     visibilite public), sur les chevaux deja charges par la page (aucune lecture de chevaux en plus). */
  var _sa = React.useState([]); var souvAlb = _sa[0], setSouvAlb = _sa[1];
  var clefAlb = ((d.chevauxClub || []).map(function (c) { return c && c.id; }).filter(Boolean).sort().join(","));
  React.useEffect(function () {
    var vif = true; setSouvAlb([]);
    (async function () {
      try {
        if (true) return;   /* (569) bloc Souvenirs retire : on ne lit plus les albums ici (remettre la ligne ci-dessous si on le remet) */
        if (typeof supa === "undefined" || !supa || !clefAlb) return;
        var ids = clefAlb.split(",").slice(0, 300).map(function (x) { return "cheval:" + x; });
        var ra = await supa.from("albums_cheval").select("id, photos, visibilite, created_at").in("cible", ids).eq("visibilite", "public").order("created_at", { ascending: false }).limit(16);
        if (!vif) return;
        var o = [];
        ((ra && ra.data) || []).forEach(function (al, iAl) { var t = Date.parse(al && al.created_at) || 0; ((al && al.photos) || []).forEach(function (p) { var u = String((p && typeof p === "object") ? (p.url || p.src || "") : (p || "")).trim(); if (u) o.push({ u: u, t: t, k: "a" + ((al && al.id) || iAl) }); }); });
        setSouvAlb(o);
      } catch (eA) { }
    })();
    return function () { vif = false; };
  }, [clefAlb]);
  var souv = (function () {
    if (souvFil === null) return null;
    /* (560) Blandine : « varie plus et ne prends pas la meme que celle de l actualite » :
       1) les photos de la publication montree dans « Actualites » sont ecartees ;
       2) UNE photo par publication / par album d abord (la plus recente de chacun), en alternant fil et albums ;
       3) seulement s il manque de quoi remplir, une 2e photo d une meme source. */
    var exclues = {};
    try { (post || []).forEach(function (pA) { [pA.photo_url].concat(Array.isArray(pA.medias) ? pA.medias : []).forEach(function (u) { var u0 = String(u || "").trim(); if (u0) exclues[u0] = 1; }); }); } catch (eX) { }
    var vus = {}, l = souvFil.concat(souvAlb).filter(function (x) { if (!x || !x.u || vus[x.u] || exclues[x.u]) return false; vus[x.u] = 1; return true; });
    l.sort(function (x, y) { return (y.t || 0) - (x.t || 0); });
    var parSource = {}, ordreF = [], ordreA = [];
    l.forEach(function (x) { var k = x.k || x.u; if (!parSource[k]) { parSource[k] = []; (k.charAt(0) === "a" ? ordreA : ordreF).push(k); } parSource[k].push(x); });
    var sources = [], iF = 0, iA = 0;
    while (iF < ordreF.length || iA < ordreA.length) { if (iF < ordreF.length) sources.push(ordreF[iF++]); if (iA < ordreA.length) sources.push(ordreA[iA++]); }
    var choix = [];
    for (var tour = 0; choix.length < 5 && tour < 6; tour++) {
      sources.forEach(function (k) { if (choix.length < 5 && parSource[k][tour]) choix.push(parSource[k][tour]); });
    }
    return choix;
  })();
  var _sx = React.useState(0); var souvActif = _sx[0], setSouvActif = _sx[1];   /* (557) carrousel Souvenirs */
  var souvRail = React.useRef(null);   /* (542) souvenirs : photos des publications du fil */
  var _vz = React.useState(null); var visu = _vz[0], setVisu = _vz[1];
  var clefFil = "ecurie:" + String(d.monClub || "").trim().toLowerCase();

  /* la dernière publication du fil de l'écurie (lecture ouverte à tous, comme le fil) */
  React.useEffect(function () {
    var vif = true; setPost(null); setSouv(null);
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !d.monClub) { if (vif) { setPost(false); setSouv([]); } return; }
        /* (542) la MEME lecture sert aux actualites (2 dernieres) et aux souvenirs (photos des 40 dernieres) */
        var r = await supa.from("commentaires").select("id, texte, photo_url, medias, created_at, prive, user_id").eq("cible", clefFil).order("created_at", { ascending: false }).limit(40);
        if (!vif) return;
        var moiId = d.moiG && d.moiG.id;
        var l = ((r && r.data) || []).filter(function (p) { return p && (!p.prive || (moiId && p.user_id === moiId)); });
        setPost(l.length ? l.slice(0, 1) : false);   /* (555) Blandine : une seule actualite, toute la largeur */   /* (540) Blandine : « tu peux en mettre deux » */
        var vus = {}, ph = [];
        l.forEach(function (p) { var tP = Date.parse(p.created_at) || 0; [p.photo_url].concat(Array.isArray(p.medias) ? p.medias : []).forEach(function (u) { var u0 = String(u || "").trim(); if (!u0 || vus[u0]) return; vus[u0] = 1; ph.push({ u: u0, t: tP, k: "p" + (p.id || tP) }); }); });
        setSouv(ph);   /* (547) avec la date, pour melanger avec les albums */
      } catch (eP) { if (vif) { setPost(false); setSouv([]); } }
    })();
    return function () { vif = false; };
  }, [clefFil]);

  /* ── petits outils ── */
  function svg(paths, sz, col, sw) { return h("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: col, strokeWidth: sw || 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "0 0 auto", display: "block" } }, paths); }
  function icPin(c) { return svg([h("path", { key: 1, d: "M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" }), h("circle", { key: 2, cx: 12, cy: 10, r: 2.3 })], 13, c || CH); }
  function icGens(c) { return svg([h("circle", { key: 1, cx: 9, cy: 8, r: 3.1 }), h("path", { key: 2, d: "M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" }), h("circle", { key: 3, cx: 16.8, cy: 9.2, r: 2.4 }), h("path", { key: 4, d: "M15.4 14.6c2.6-.4 4.6 1 5.1 3.6" })], 15, c || CH); }
  function rondChevron(sz) { return h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: sz || 28, height: sz || 28, borderRadius: "50%", border: "1px solid " + BORD, display: "inline-flex", alignItems: "center", justifyContent: "center", color: CH, fontSize: 15, lineHeight: 1 } }, CHEV); }
  function titreSection(txt, voirTout, sous, droite) {
    return h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginBottom: 16 } },
      h("div", { style: { minWidth: 0 } },
        h("h2", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: large ? (menuFondEc ? 28 : 26) : 24 /* 19/10 etape A */, lineHeight: 1.15, color: IV } }, txt),
        sous ? h("div", { style: { marginTop: 3, fontFamily: M, fontSize: 13, color: CH } }, sous) : null),
      droite || (voirTout ? h("button", { type: "button", onClick: voirTout, style: { flex: "0 0 auto", background: "none", border: "none", padding: "6px 0", minHeight: 36, color: CH, fontFamily: M, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 } },
        T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Показать все", "Zobacz wszystko", "전체 보기"), h("span", { style: { fontSize: 17, lineHeight: 1 } }, CHEV)) : null));
  }
  function vide(txt) { return h("div", { style: { padding: "13px 14px", borderRadius: 12, border: "1px solid " + BORD2, background: SURF, color: GR3, fontFamily: M, fontSize: 12.5, fontStyle: "italic", textAlign: "center" } }, txt); }
  var LOC = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" }[d.lg] || "fr-FR";
  function dateLoc(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  function fmt(iso, o) { var dd = dateLoc(iso); if (!dd) return ""; try { return new Intl.DateTimeFormat(LOC, o).format(dd); } catch (e) { return String(iso).slice(0, 10); } }
  function section(enfants, haut) { return h("section", { style: { padding: (large ? (haut === -1 ? 40 : (menuFondEc ? 56 : 48)) /* 19/10 etape A : tablette 48, ordinateur 56, 40 avant le contact */ : (haut == null ? 40 : haut)) + "px 16px 0" } }   /* (558) blocs un peu plus rapproches (52 avant) */, enfants); }

  /* ── 1. BANDEAU ── */
  var nom = String(d.monClub || "").trim();
  /* (541) affichage seulement : la SEP est enregistree sans accents ; on l affiche « Société d’Équitation de
     Paris (SEP) ». La valeur en base ne change pas ; les autres ecuries gardent leur vrai nom. */
  var NOMS_AFFICHES = { "societe d'equitation de paris (sep)": "Soci\u00e9t\u00e9 d\u2019\u00c9quitation de Paris (SEP)" };
  function clefNom(x) { try { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u2019\u2018]/g, "'").toLowerCase().replace(/\s+/g, " ").trim(); } catch (e) { return String(x || "").toLowerCase().trim(); } }
  function nomAffiche(x) { return NOMS_AFFICHES[clefNom(x)] || String(x || "").trim(); }
  var nomAff = nomAffiche(nom);
  var lignesNom = (function () {
    var p = nomAff.match(/^(.*?)\s*(\([^)]*\))\s*$/);
    var corps = p ? p[1] : nomAff, paren = p ? p[2] : "";
    var mots = corps.split(/\s+/).filter(Boolean);
    var l = (mots.length >= 3) ? [mots[0], mots.slice(1).join(" ")] : [corps];
    if (paren) l.push(paren);
    return l;
  })();
  var deuxEcuries = !!(d.ecurieSecondaire && d.clefClub && d.clefClub(d.ecurieSecondaire) !== d.clefClub(d.ecuriePrincipale));
  /* (541) LA COUVERTURE = EXACTEMENT LA SOURCE DE L ANCIENNE PAGE : sa bannière (tableaux_clubs « club-banniere »)
     SINON l image par defaut de Hype (UV3_H2, ou le bandeau crimson). La 539 ne prenait que la bannière : une ecurie
     sans bannière propre (cas de la SEP) avait un bandeau vide alors que l ancienne page montrait l image par defaut. */
  var couv = d.banniere || (typeof IMG_ECURIE_DEFAUT_V2 !== "undefined" ? IMG_ECURIE_DEFAUT_V2 : "");   /* (567) photo choisie par Blandine pour les ecuries sans couverture */   /* (565) brief : jamais de photo generique presentee comme celle du club -> fond graphique */
  var bandeau = h("div", { className: "ecurie-v2-bandeau", style: { position: "relative", height: large ? 410 : "calc(env(safe-area-inset-top) + 340px)" /* (543) moins haut ; (863) ordinateur : 410 px */, overflow: "hidden", background: couv ? "transparent" /* (1046) */ : "radial-gradient(120% 80% at 70% 10%, #162A30 0%, #101D22 45%, #050809 100%)" } },
    null /* (1046) la photo n est plus dans le bandeau : elle est le fond fixe de la page (voir fondFixeEc) */,
    /* (565) sans photo : fond graphique volontaire - fin motif equestre champagne tres peu visible + grain discret */
    !couv ? h("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", stroke: "rgba(201,166,107,0.10)", strokeWidth: 0.35, strokeLinecap: "round", strokeLinejoin: "round", style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 30px)", insetInlineEnd: -40, width: 300, height: 300, transform: rtl ? "scaleX(-1)" : "none" } },
      h("path", { d: "M8.5 21v-3.4c0-1.9.7-3.2 1.9-4.4L7.6 9.8c-.6-.8-.2-1.8.8-1.8 1 0 1.8-.4 2.4-1.1l1.3-3.4 1 2.7c2.7 1 4.4 3.6 4.4 6.9V21" }), h("circle", { cx: 12.6, cy: 9.2, r: 0.5 })) : null,
    !couv ? h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.35, backgroundImage: "radial-gradient(rgba(243,238,228,0.05) 0.6px, transparent 0.6px)", backgroundSize: "3px 3px" } }) : null,
    /* degrade : leger en haut (boutons lisibles), photo bien visible au milieu, sombre seulement en bas */
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,7,8,0.30) 0%, rgba(3,7,8,0) 18%, rgba(3,7,8,0) 34%, rgba(3,7,8,0.55) 58%, rgba(3,7,8,0.92) 82%, " + NOIR + " 100%)" } }),   /* (543) plus sombre en bas */
    /* (543) Blandine, maquette a l appui : degrade depuis la GAUCHE qui porte le titre (miroir en arabe), sur le bas */
    h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, bottom: 0, height: "72%", background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(3,7,8,0.82) 0%, rgba(3,7,8,0.5) 38%, rgba(3,7,8,0.12) 62%, rgba(3,7,8,0) 78%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 35%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 35%)" } }),
    /* (540) Blandine : « assombri a gauche en bas pour le titre » - voile en coin, cote du nom (miroir en arabe) */
    h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "radial-gradient(120% 55% at " + (rtl ? "100%" : "0%") + " 100%, rgba(3,7,8,0.85) 0%, rgba(3,7,8,0.55) 40%, rgba(3,7,8,0) 75%)" } }),
    (!couv && d.peutEditerBanniere) ? h("button", { type: "button", onClick: function () { if (d.banRef && d.banRef.current) d.banRef.current.click(); }, style: { position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", padding: "0 16px", height: 36, whiteSpace: "nowrap", borderRadius: 18, border: "1px solid " + BORD, background: "rgba(3,7,8,0.5)", color: CH, fontFamily: M, fontSize: 12, cursor: "pointer", zIndex: 2 } },   /* (565) petite action discrete */
      T("Ajouter une photo de couverture", "Add a cover photo", "Añadir una foto de portada", "Aggiungi una foto di copertina", "カバー写真を追加", "Titelbild hinzufügen", "إضافة صورة غلاف", "添加封面照片", "Dekfoto toevoegen", "Adicionar uma foto de capa", "Lägg till ett omslagsfoto", "Добавить обложку", "Dodaj zdjęcie w tle", "커버 사진 추가하기")) : null,
    d.peutEditerBanniere ? h("button", { type: "button", "aria-label": T("Changer la photo", "Change photo", "Cambiar foto", "Cambia foto", "写真を変更", "Foto ändern", "تغيير الصورة", "更换照片", "Foto wijzigen", "Trocar foto", "Byt foto", "Сменить фото", "Zmień zdjęcie", "사진 바꾸기"), onClick: function () { if (d.banRef && d.banRef.current) d.banRef.current.click(); }, style: { position: "absolute", right: 18, top: "calc(env(safe-area-inset-top) + 14px)", width: 38, height: 38, borderRadius: "50%"   /* (564) Blandine : alignee avec partager et drapeau (meme rangee, meme taille, meme ecart de 8 px) */, border: "1px solid rgba(243,238,228,0.25)", background: "rgba(3,7,8,0.45)", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 } },
      svg([h("path", { key: 1, d: "M4 8h3l1.6-2.2h6.8L17 8h3v11H4z" }), h("circle", { key: 2, cx: 12, cy: 13.2, r: 3.4 })], 16, IV)) : null,
    d.peutEditerBanniere ? h("input", { ref: d.banRef, type: "file", accept: "image/*", onChange: d.choisirBanniere, style: { display: "none" } }) : null,
    h("div", { style: { position: "absolute", insetInlineStart: large ? 44 : 20, insetInlineEnd: large ? 44 : 20, bottom: large ? 34 : 20 } },   /* (863) */
      /* (541) le NOM lui-meme est le bouton (2 ecuries) ; chevron tres discret apres la derniere ligne, sans cercle */
      h("button", { type: "button", disabled: !deuxEcuries, onClick: function () { if (deuxEcuries) setFeuilleEc(true); }, "aria-haspopup": deuxEcuries ? "dialog" : undefined, style: { display: "block", maxWidth: "92%", background: "none", border: "none", padding: 0, textAlign: "start", cursor: deuxEcuries ? "pointer" : "default", color: IV } },
        h("h1", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: large ? 48 : 32 /* (859) ordinateur */, lineHeight: 1.06, color: IV, textShadow: "0 2px 14px rgba(0,0,0,0.55)" } },
          lignesNom.map(function (l, i) {
            var der = i === lignesNom.length - 1;
            return h("span", { key: i, dir: "auto", style: { display: "block", fontSize: (der && /^\(/.test(l)) ? (large ? 34 : 24) : (large ? (String(d.monClub || "").length > 42 ? 46 : 56) : 32) /* (863) ordinateur : 56 px (46 si le nom est tres long) */ } }, l,
              (der && deuxEcuries) ? h("span", { "aria-hidden": "true", style: { display: "inline-block", marginInlineStart: 8, fontFamily: M, fontSize: 15, color: CH, verticalAlign: "middle", transform: "translateY(-2px)" } }, "\u2304") : null);
          }))),
      h("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px 12px", marginTop: large ? 16 : 12, fontFamily: M, fontSize: large ? 14.5 : 13, color: "rgba(243,238,228,0.88)" } },
        d.villeClub ? h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, icPin(CH), d.villeClub) : null,
        (d.villeClub && d.nbMembres) ? h("span", { "aria-hidden": "true", style: { width: 1, height: 14, background: "rgba(243,238,228,0.35)" } }) : null,
        d.nbMembres ? h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, icGens(CH), d.nbMembres + " " + (d.nbMembres > 1 ? T("membres", "members", "miembros", "membri", "メンバー", "Mitglieder", "أعضاء", "成员", "leden", "membros", "medlemmar", "участников", "członków", "멤버") : T("membre", "member", "miembro", "membro", "メンバー", "Mitglied", "عضو", "成员", "lid", "membro", "medlem", "участник", "członek", "멤버"))) : null)));

  /* feuille « choisir l'écurie » */
  var feuille = feuilleEc ? h("div", { onClick: function () { setFeuilleEc(false); }, style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(3,7,8,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
    h("div", { onClick: function (e) { e.stopPropagation(); }, role: "dialog", style: { width: "100%", maxWidth: 480, background: SURF, borderRadius: "20px 20px 0 0", border: "1px solid " + BORD2, borderBottom: "none", padding: "18px 16px calc(16px + env(safe-area-inset-bottom))" } },
      h("div", { style: { fontFamily: SERIF, fontSize: 20, color: IV, textAlign: "center", marginBottom: 12 } }, T("Choisir l’écurie", "Choose the stable", "Elegir la cuadra", "Scegli la scuderia", "厩舎を選ぶ", "Stall wählen", "اختيار الإسطبل", "选择马厩", "Kies de stal", "Escolher a cocheira", "Välj stall", "Выбрать конюшню", "Wybierz stajnię", "마구간 선택")),
      [d.ecuriePrincipale, d.ecurieSecondaire].map(function (nE, iE) {
        var actif = d.clefClub(d.monClub) === d.clefClub(nE);
        return h("button", { key: "ec" + iE, type: "button", onClick: function () { setFeuilleEc(false); d.setClubForce(iE === 0 ? null : nE); }, style: { width: "100%", display: "flex", alignItems: "center", gap: 12, minHeight: 56, padding: "8px 6px", background: "none", border: "none", borderBottom: "1px solid " + BORD2, color: IV, textAlign: "start", cursor: "pointer" } },
          (actif && couv) ? h("img", { src: couv, alt: "", style: { flex: "0 0 auto", width: 44, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid " + BORD } })
            : h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 44, height: 44, borderRadius: 10, border: "1px solid " + BORD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 20, color: CH } }, String(nomAffiche(nE) || "?").trim().charAt(0).toUpperCase()),
          h("span", { style: { flex: 1, minWidth: 0 } },
            h("span", { dir: "auto", style: { display: "block", fontFamily: M, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, nomAffiche(nE)),
            (actif && d.villeClub) ? h("span", { style: { display: "block", marginTop: 2, fontFamily: M, fontSize: 11.5, color: GR2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, d.villeClub) : null),
          actif ? h("span", { style: { color: CH, fontSize: 17 } }, "✓") : null);
      }),
      h("button", { type: "button", onClick: function () { setFeuilleEc(false); }, style: { marginTop: 12, width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid " + BORD2, background: "transparent", color: IV, fontFamily: M, fontSize: 13.5, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))) : null;

  /* 22/10 : rangée « Groupes » sous l en-tête (voir l effet groupesEc plus haut). Même navigation que la page Cavalier. */
  var blocGroupes = (groupesEc && groupesEc.length) ? h("div", { "data-groupes-ecurie": "1", style: { padding: large ? "18px 0 0" : "18px 16px 0", maxWidth: large ? 820 : undefined, margin: large ? "0 auto" : undefined } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 } },
      h("h2", { style: { margin: 0, flex: "0 0 auto", fontFamily: SERIF, fontWeight: 500, fontSize: 20, lineHeight: 1.15, color: IV } }, T("Groupes", "Groups", "Grupos", "Gruppi", "グループ", "Gruppen", "المجموعات", "小组", "Groepen", "Grupos", "Grupper", "Группы", "Grupy", "그룹")),
      h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(" + (rtl ? "to left" : "to right") + ", rgba(201,166,107,0.45), rgba(201,166,107,0))" } })),
    h("div", { "data-noswipe": "1", style: { display: "flex", gap: 10, overflowX: "auto", WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain", scrollbarWidth: "none", paddingBottom: 4, flexWrap: large ? "wrap" : "nowrap" } },
      groupesEc.map(function (g) {
        var sansPage = g.nature === "equipe" && !(typeof TEAM_CLUB !== "undefined" && g.club_clef === hypeClefClubPiquets(TEAM_CLUB) && g.discipline === TEAM_DISCIPLINE && g.niveau === TEAM_NIVEAU);
        var photo = g.nature === "equipe" ? (g.photo_url || "images/TEAM_COMPETITION.webp") : ((typeof hypePhotoPiquet === "function") ? hypePhotoPiquet(g) : (g.photo_url || ""));
        var nomG = (g.nature !== "equipe" && typeof hypeLibPiquet === "function") ? hypeLibPiquet(g.nom) : g.nom;
        return h("button", { key: "gre" + g.id, type: "button", "data-groupe-ecurie": g.id, disabled: sansPage, "aria-disabled": sansPage ? "true" : undefined,
          onClick: function () {
            if (sansPage) return;
            if (g.nature === "equipe") { try { window.__perfGroupe = null; window.__perfGroupeCourant = null; } catch (eT) { } setEcran("team-competition"); return; }
            try { window.__ecurieHypeClub = g.__club; window.__ecurieHypePiquet = g.id; } catch (eP) { }
            setEcran("ecurie-hype");
          },
          style: { flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 9, minHeight: 46, padding: "5px 14px 5px 5px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.4)", background: "rgba(16,29,34,0.88)", color: IV, fontFamily: M, fontSize: 13, cursor: sansPage ? "default" : "pointer", opacity: sansPage ? 0.75 : 1, whiteSpace: "nowrap" } },
          photo ? h("img", { src: photo, alt: "", loading: "lazy", style: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flex: "0 0 auto", border: "1px solid rgba(201,166,107,0.35)" } }) : null,
          h("bdi", null, nomG),
          sansPage ? h("span", { style: { fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: CH } }, T("Prochainement", "Coming soon", "Pr\u00f3ximamente", "Prossimamente", "\u8fd1\u65e5\u516c\u958b", "Demnächst", "\u0642\u0631\u064a\u0628\u0627", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개")) : h("span", { "aria-hidden": "true", style: { color: CH, fontSize: 15 } }, CHEV));
      }))) : null;

  /* ── 2. SIX ONGLETS ── */
  var ONGLETS = [
    ["cavaliers", T("Cavaliers", "Riders", "Jinetes", "Cavalieri", "ライダー", "Reiter", "الفرسان", "骑手", "Ruiters", "Cavaleiros", "Ryttare", "Всадники", "Jeźdźcy", "기수")],
    ["chevaux", T("Chevaux", "Horses", "Caballos", "Cavalli", "馬", "Pferde", "الخيول", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말")],
    ["agenda", T("Agenda", "Agenda", "Agenda", "Agenda", "予定", "Termine", "المواعيد", "日程", "Agenda", "Agenda", "Kalender", "Расписание", "Kalendarz", "일정")],
    ["actus", T("Actualités", "News", "Novedades", "Novità", "活動", "News", "الأخبار", "动态", "Nieuws", "Notícias", "Nyheter", "Новости", "Aktualności", "소식")],
    ["souvenirs", T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "思い出", "Erinnerungen", "الذكريات", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억")],
    ["sante", T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "الصحة", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")]
  ];
  /* (553) ACCES RAPIDES (brief de Blandine) : grille 3 x 2 de petits onglets « joaillier » - fond a peine plus clair
     que la page, contour champagne fin, petite icone dans un cercle tres fin, nom en serif ivoire, plus de « Ouvrir ».
     Toute la carte est tactile. Memes 6 destinations qu avant (d.ouvrirOnglet). */
  var IC_ONG = {
    cavaliers: [h("circle", { key: 1, cx: 9, cy: 8, r: 3 }), h("path", { key: 2, d: "M3.5 19c.6-3.3 2.8-5.2 5.5-5.2s4.9 1.9 5.5 5.2" }), h("circle", { key: 3, cx: 16.5, cy: 9, r: 2.4 }), h("path", { key: 4, d: "M15.8 14.1c2.4.1 4.1 1.8 4.7 4.6" })],
    chevaux: [h("path", { key: 1, d: "M8.5 21v-3.4c0-1.9.7-3.2 1.9-4.4L7.6 9.8c-.6-.8-.2-1.8.8-1.8 1 0 1.8-.4 2.4-1.1l1.3-3.4 1 2.7c2.7 1 4.4 3.6 4.4 6.9V21" }), h("circle", { key: 2, cx: 12.6, cy: 9.2, r: 0.6 })],
    agenda: [h("rect", { key: 1, x: 3.5, y: 5, width: 17, height: 15, rx: 2.5 }), h("path", { key: 2, d: "M3.5 10h17M8 3.5v3m8-3v3" })],
    actus: [h("rect", { key: 1, x: 4.5, y: 3.5, width: 15, height: 17, rx: 2 }), h("path", { key: 2, d: "M8 8h8M8 12h8M8 16h5" })],
    souvenirs: [h("rect", { key: 1, x: 3.5, y: 5, width: 17, height: 14, rx: 2 }), h("circle", { key: 2, cx: 9, cy: 10, r: 1.6 }), h("path", { key: 3, d: "M4 17l5-4.5 3.5 3 3-2.5L20 17" })],
    sante: [h("path", { key: 1, d: "M6 3.5v4.5a4 4 0 0 0 8 0V3.5" }), h("path", { key: 2, d: "M10 12v2.5a4.5 4.5 0 0 0 9 0V13" }), h("circle", { key: 3, cx: 19, cy: 11, r: 2 })]
  };
  var onglets = h("div", { style: { padding: "22px 16px 0" } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } },
      h("h2", { style: { margin: 0, flex: "0 0 auto", fontFamily: SERIF, fontWeight: 500, fontSize: 20, lineHeight: 1.15, color: IV } }, T("Acc\u00e8s rapides", "Quick access", "Accesos r\u00e1pidos", "Accessi rapidi", "\u30af\u30a4\u30c3\u30af\u30a2\u30af\u30bb\u30b9", "Schnellzugriff", "\u0648\u0635\u0648\u0644 \u0633\u0631\u064a\u0639", "快捷入口", "Snelle toegang", "Acesso rápido", "Genvägar", "Быстрый доступ", "Szybki dostęp", "바로가기")),
      h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(" + (rtl ? "to left" : "to right") + ", rgba(201,166,107,0.45), rgba(201,166,107,0))" } })),
    h("nav", { style: { display: "grid", gridTemplateColumns: large ? "repeat(6, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))" /* (859) ordinateur : une seule rangee */, columnGap: 10, rowGap: 14 } },   /* 10/10 (849) un peu plus d air pour les ombres plus profondes */
      ONGLETS.map(function (o) {
        return h("button", { key: o[0], type: "button", className: "ev2-tuile", onClick: function () { d.ouvrirOnglet(o[0]); }, style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, minWidth: 0, height: large ? 126 : 96 /* (864) ordinateur 126 px */ /* 10/10 (850) Blandine : « un peu plus grandes » (78 avant) */, padding: "10px 6px", borderRadius: 15, border: "1px solid rgba(201,166,107,0.3)", borderTop: "1px solid rgba(222,196,146,0.55)", background: "linear-gradient(172deg, rgba(62,104,118,0.42) 0%, rgba(30,54,64,0.5) 38%, rgba(12,21,25,0.66) 78%, rgba(6,10,12,0.78) 100%)", WebkitBackdropFilter: "blur(7px) saturate(1.1)", backdropFilter: "blur(7px) saturate(1.1)" /* (1100) 14/10 Blandine : tuiles semi-transparentes, degrade et ombre gardes ; le fond de page fixe se devine a travers (avant : meme degrade opaque) */, boxShadow: "0 20px 34px rgba(0,0,0,0.78), 0 8px 12px rgba(0,0,0,0.55), 0 2px 0 rgba(0,0,0,0.85), inset 0 1.5px 0 rgba(243,238,228,0.18), inset 0 -3px 0 rgba(0,0,0,0.5), inset 0 -24px 30px rgba(0,0,0,0.4)",   /* 10/10 (849) Blandine : « encore plus profonds » (848 : premiere passe) — lumiere plus forte en haut, socle sombre, ombre portee plus longue */ cursor: "pointer", color: IV } },
          h("span", { "aria-hidden": "true", style: { width: 34, height: 34, borderRadius: "50%", border: "0.8px solid rgba(201,166,107,0.7)" /* (663) cercle transparent, comme avant le 662 : « c etait sympa » */, background: "radial-gradient(circle at 50% 30%, rgba(243,238,228,0.07), rgba(0,0,0,0.28) 75%)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.55), 0 1px 0 rgba(243,238,228,0.1)" /* (849) le cercle creuse */, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, svg(IC_ONG[o[0]], 16, CH, 1.3)),
          h("span", { style: { maxWidth: "100%", fontFamily: SERIF, fontSize: (String(o[1]).length > 10 || (large && String(o[1]).length > 8 && (function () { try { return (window.innerWidth || 1280) < 1100; } catch (eW) { return false; } })())) ? 11 : 13 /* (1029) tablette : les mots longs (ACTUALITES) tiennent dans la tuile */, fontWeight: 600, letterSpacing: (String(o[1]).length > 10 || (large && String(o[1]).length > 8 && (function () { try { return (window.innerWidth || 1280) < 1100; } catch (eW) { return false; } })())) ? 0.5 : 1.1, textTransform: "uppercase", color: IV, lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, o[1]),
          h("span", { "aria-hidden": "true", style: { width: 14, height: 1, background: "rgba(201,166,107,0.4)" } }));
      })));

  /* ── 3. CITATION (texte « philosophie » de l'écurie, crayon discret pour la propriétaire) ── */
  var citation = h("div", { style: { padding: "24px 18px 0" } }, d.citationProps ? h(TableauxSpectralHype, Object.assign({}, d.citationProps, { rendu: "citation-v2" })) : null);

  /* ── 4. PROCHAINS ÉVÉNEMENTS (données de l'agenda du club, monté invisible plus bas) ── */
  function ouvrirAgenda() { try { window.__agendaClub = d.monClub || ""; } catch (e) { } setEcran("agenda-club"); }
  /* (541) carrousel : cartes a 84 %, la suivante depasse ; affiche ENTIERE (contain) sur la meme image floutee et
     assombrie ; sans image, le cartouche date occupe la zone (pas de grand vide). Toute la carte ouvre le rendez-vous. */
  function carteEv(ev, mode) {
    /* (545) mode : "seul" (1 evenement, toute la ligne), "duo" (2), "car" (carrousel a partir de 3)
       (559) Blandine : l affiche prend toute la carte, fondue / assombrie en bas, le texte pose dessus. */
    var gros = mode === "seul";
    var img = (typeof ev.image_url === "string" && ev.image_url.trim()) ? ev.image_url.trim() : "";
    var jour = String(Number((String(ev.date_jour || "").match(/-(\d{2})$/) || [])[1] || "") || "");
    var mois = fmt(ev.date_jour, { month: "short" }).replace(".", "");
    return h("button", { key: "ev" + ev.id, type: "button", onClick: function () { try { if (pont.current) pont.current.ouvrir(ev); } catch (e) { } }, style: { position: "relative", display: "block", minWidth: 0, width: "100%", aspectRatio: (mode === "seul" ? "16 / 9" : (mode === "duo" ? "1 / 1" : "4 / 5")), padding: 0, textAlign: "start", background: "linear-gradient(160deg,#13242A 0%,#101D22 55%,#0A1013 100%)", border: "1px solid " + BORD, borderRadius: 12, overflow: "hidden", cursor: "pointer", color: IV, boxShadow: OMBRE } },
      img ? h(React.Fragment, null, h("img", { src: img, alt: "", loading: "lazy", decoding: "async", className: "hps-f", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" } }), hypeVoileSoleil("evc"))
        : h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, top: 0, height: "62%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 } },
            svg([h("rect", { key: 1, x: 3.5, y: 5, width: 17, height: 15, rx: 2.5 }), h("path", { key: 2, d: "M3.5 10h17M8 3.5v3m8-3v3" })], 16, CH, 1.3),
            h("div", { style: { fontFamily: SERIF, fontSize: gros ? 40 : 32, lineHeight: 0.95, color: CH } }, jour),
            h("div", { style: { fontFamily: SERIF, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: CH } }, mois)),
      h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, bottom: 0, height: gros ? "62%" : "68%", background: "linear-gradient(180deg, rgba(3,7,8,0) 0%, rgba(3,7,8,0.55) 38%, rgba(3,7,8,0.92) 78%, rgba(3,7,8,0.97) 100%)" } }),
      h("div", { style: { position: "absolute", insetInline: 0, bottom: 0, padding: gros ? "0 14px 12px" : "0 9px 9px", minWidth: 0 } },
        h("div", { style: { fontFamily: M, fontSize: gros ? 10 : 9, letterSpacing: 0.8, textTransform: "uppercase", color: CH } }, jour + " " + mois),
        h("div", { dir: "auto", style: { marginTop: 3, fontFamily: SERIF, fontSize: gros ? 17 : 13, fontWeight: 600, lineHeight: 1.18, color: IV, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere", textAlign: "start", textShadow: "0 1px 6px rgba(0,0,0,0.5)" } }, ev.titre || ""),
        ev.lieu ? h("div", { dir: "auto", style: { marginTop: 2, fontFamily: M, fontSize: gros ? 11 : 9.5, color: GR2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" } }, ev.lieu) : null));
  }
  /* (576) brief « GRANDE IMAGE + DETAILS » : les 2 prochains evenements en 2 cartes horizontales empilees
     (colonne date | affiche recadree | titre + type + lieu | chevron). Ancien rendu (carteEv) garde, plus appele. */
  var listeEv = (evs || []).slice().sort(function (x, y) { return String(x.date_jour || "").localeCompare(String(y.date_jour || "")); }).slice(0, 3);   /* 26/10 (Blandine) : 3 prochains événements au lieu de 2 */
  var peutCreerEv = !!(pont.current && pont.current.peutCreer);
  var TYPE_EV = {
    stage: T("Stage", "Clinic", "Cursillo", "Stage", "\u8B1B\u7FD2", "Lehrgang", "\u062a\u062f\u0631\u064a\u0628", "训练营", "Clinic", "Clínica", "Clinic", "Сбор", "Warsztaty", "스테이지"),
    concours: T("Concours", "Show", "Concurso", "Concorso", "\u7AF6\u6280\u4F1A", "Turnier", "\u0645\u0633\u0627\u0628\u0642\u0629", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회"),
    sortie: T("Sortie", "Outing", "Salida", "Uscita", "\u5916\u51FA", "Ausritt", "\u062e\u0631\u062c\u0629", "外出活动", "Uitje", "Passeio", "Utflykt", "Выезд", "Wyjazd", "나들이")
  };
  var NOIR_EV = "#080A0B";   /* (592) noir des cartes evenements : un cran au-dessus du fond de page NOIR (050809 depuis le 662) pour que la carte reste lisible */
  function carteEvH(ev, passe) {
    var img = (typeof ev.image_url === "string" && ev.image_url.trim()) ? ev.image_url.trim() : "";
    var jour = String(Number((String(ev.date_jour || "").match(/-(\d{2})$/) || [])[1] || "") || "");
    var mois = fmt(ev.date_jour, { month: "short" }).replace(".", "");
    var an = String(ev.date_jour || "").slice(0, 4);
    var typ = TYPE_EV[ev.type] || "";
    return h("button", { key: (passe ? "evp" : "evh") + ev.id, type: "button", onClick: function () {
        if (passe) { try { window.__evPasse = null; window.__evPasseId = ev.id; } catch (eP) { } setEcran("evenement-passe"); return; }   /* 26/10 : un événement passé ouvre son souvenir */
        try { if (pont.current) pont.current.ouvrir(ev); } catch (e) { } }, style: { display: "flex", alignItems: "stretch", width: "100%", height: 108 /* (589) Blandine : « moins hauts » — 132 avant */, padding: 0, textAlign: "start", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(201,166,107,0.24)", background: "linear-gradient(135deg, #0C0F11 0%, " + NOIR_EV + " 60%, #050708 100%)" /* (592) Blandine : cartes evenements sur fond NOIR (maquette B) — avant : degrade vert #10201D / SURF / #0A1513 */, cursor: "pointer", color: IV } },
      /* date */
      h("div", { style: { flex: "0 0 52px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgba(0,0,0,0.28)", borderInlineEnd: "1px solid " + BORD2 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 28, lineHeight: 1, color: IV } }, jour),
        h("div", { style: { fontFamily: M, fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: CH } }, mois),
        an ? h("div", { style: { fontFamily: M, fontSize: 9, letterSpacing: 0.6, color: GR3 } }, an) : null),
      /* affiche */
      img ? h("div", { style: { flex: "0 0 33%", position: "relative", overflow: "hidden" } },
        h("img", { src: img, alt: "", loading: "lazy", decoding: "async", className: "hps-f", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" } }),
        hypeVoileSoleil("ev"),   /* 23/10 effet photos du challenge */
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(8,10,11,0) 55%, rgba(8,10,11,0.85) 92%, " + NOIR_EV + " 100%)" /* (592) le fondu de l affiche se termine dans le noir de la carte (avant : vert SURF) */ } })) : null,
      /* infos */
      h("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px 2px 10px 10px" } },
        h("div", { dir: "auto", style: { fontFamily: SERIF, fontSize: 14.5, fontWeight: 600, lineHeight: 1.18, color: IV, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere", textAlign: "start" } }, ev.titre || ""),
        typ ? h("span", { style: { alignSelf: "flex-start", marginTop: 7, padding: "2px 8px", borderRadius: 4, background: CH, color: "#15110A", fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.9, textTransform: "uppercase" } }, typ) : null,
        ev.lieu ? h("div", { style: { marginTop: 7, display: "flex", alignItems: "center", gap: 5, minWidth: 0 } }, icPin(GR3),
          h("span", { dir: "auto", style: { fontFamily: M, fontSize: 11, color: GR2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ev.lieu)) : null),
      /* chevron */
      h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", padding: "0 10px 0 4px" } }, rondChevron(30)));
  }
  /* 10/10 (861) Blandine : « ajouter les coordonnees de chaque ecurie, que les gens puissent les contacter s ils souhaitent
     s inscrire, que ca fasse office de site internet ». ETAPE 1 : les coordonnees DEJA connues (base des clubs, issue
     d OpenStreetMap) : telephone, site, adresse + itineraire. Les courriels de la base ne sont PAS affiches. La saisie
     par la responsable (et les autres champs) viendra avec l etape 2. Rien ne s affiche si la base n a rien. */
  /* 10/10 (868) ETAPE 4 « mini-site » : les coordonnees MODIFIABLES par la responsable de l ecurie (ou une moderatrice).
     Rangees dans tableaux_clubs sous « club-contact:<cle> » (SQL du 10/10). Tant que rien n est enregistre : les
     coordonnees de la base des clubs (build 861). Une fois enregistrees, elles REMPLACENT celles de la base (un champ
     laisse vide n est pas affiche). Lecture possible sans compte (elles sont faites pour etre publiques). */
  var clefContact = (typeof clefClubG === "function") ? clefClubG(d.monClub || "") : String(d.monClub || "").toLowerCase().trim();
  var _cte = React.useState(null), contactEc = _cte[0], setContactEc = _cte[1];
  var _cto = React.useState(false), contactEdit = _cto[0], setContactEdit = _cto[1];
  var _ctf = React.useState({}), contactF = _ctf[0], setContactF = _ctf[1];
  var _cts = React.useState(""), contactEtat = _cts[0], setContactEtat = _cts[1];
  React.useEffect(function () {
    var vifCt = true; setContactEc(null);
    (async function () { try { if (!clefContact || typeof supa === "undefined" || !supa) return; var r = await supa.from("tableaux_clubs").select("contenu").eq("cle", "club-contact:" + clefContact).maybeSingle(); var o = null; try { o = (r && r.data && r.data.contenu) ? JSON.parse(r.data.contenu) : null; } catch (eJ) { o = null; } if (vifCt) setContactEc(o && typeof o === "object" ? o : false); } catch (eCt) { if (vifCt) setContactEc(false); } })();
    return function () { vifCt = false; };
  }, [clefContact]);
  var peutEditerContact = !!(d.peutEditerBanniere || ((typeof estModerateurHype === "function") && estModerateurHype(d.moiG)));
  function ouvrirEditionContact() {
    var ic0 = d.infosClub || {}; var c0 = contactEc || null;
    setContactF(c0 ? Object.assign({ tel: "", email: "", site: "", instagram: "", facebook: "", adresse: "", horaires: "", phrase: "" }, c0)
      : { tel: String(ic0.tel || ""), email: "", site: String(ic0.site || ""), instagram: "", facebook: "", adresse: [String(ic0.adresse || "").trim(), [String(ic0.code_postal || "").trim(), String(ic0.ville || "").trim()].filter(Boolean).join(" ")].filter(Boolean).join(", "), horaires: "", phrase: "" });
    setContactEtat(""); setContactEdit(true);
  }
  async function enregistrerContact() {
    setContactEtat("envoi");
    try {
      var propre = {}; ["tel", "email", "site", "instagram", "facebook", "adresse", "horaires", "phrase"].forEach(function (k) { propre[k] = String(contactF[k] || "").trim().slice(0, k === "horaires" ? 400 : (k === "phrase" ? 220 : 200)); });
      if (propre.site && !/^https?:\/\//i.test(propre.site)) propre.site = "https://" + propre.site;
      var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
      var r = await supa.from("tableaux_clubs").upsert({ cle: "club-contact:" + clefContact, clef_club: clefContact, contenu: JSON.stringify(propre), maj_par: u ? u.id : null, maj_le: new Date().toISOString() }, { onConflict: "cle" });
      if (r && r.error) { setContactEtat("erreur:" + String(r.error.message || r.error)); return; }
      var rl = await supa.from("tableaux_clubs").select("contenu").eq("cle", "club-contact:" + clefContact).maybeSingle();   /* on relit : seule la relecture prouve que c est enregistre */
      if (!(rl && rl.data && rl.data.contenu)) { setContactEtat("erreur:" + T("la base n’a rien gardé", "the database kept nothing", "la base no guardó nada", "il database non ha salvato nulla", "保存されませんでした", "nichts gespeichert", "لم يتم الحفظ", "数据库什么都没有保存", "de database heeft niets bewaard", "o banco de dados não guardou nada", "databasen sparade ingenting", "в базе ничего не сохранилось", "baza niczego nie zapisała", "데이터베이스에 저장된 내용이 없어요")); return; }
      setContactEc(propre); setContactEtat(""); setContactEdit(false);
    } catch (eEn) { setContactEtat("erreur:" + String(eEn)); }
  }
  var blocContact = (function () {
    var ic = d.infosClub || {};
    var c = contactEc || null;   /* coordonnees enregistrees par l ecurie, sinon la base */
    var tel = String(c ? (c.tel || "") : (ic.tel || "")).trim();
    var site = String(c ? (c.site || "") : (ic.site || "")).trim(); if (site && !/^https?:\/\//i.test(site)) site = "";
    var email = c ? String(c.email || "").trim() : "";
    var insta = c ? String(c.instagram || "").trim() : "", fb = c ? String(c.facebook || "").trim() : "";
    if (insta && !/^https?:\/\//i.test(insta)) insta = "https://instagram.com/" + insta.replace(/^@/, "").replace(/^(www\.)?instagram\.com\//i, "");
    if (fb && !/^https?:\/\//i.test(fb)) fb = "https://facebook.com/" + fb.replace(/^@/, "").replace(/^(www\.)?facebook\.com\//i, "");
    var adr = c ? String(c.adresse || "").trim() : [String(ic.adresse || "").trim(), [String(ic.code_postal || "").trim(), String(ic.ville || "").trim()].filter(Boolean).join(" ")].filter(Boolean).join(", ");
    var horaires = c ? String(c.horaires || "").trim() : "", phrase = c ? String(c.phrase || "").trim() : "";
    var la = (typeof ic.lat === "number") ? ic.lat : null, lo = (typeof ic.lon === "number") ? ic.lon : ((typeof ic.lng === "number") ? ic.lng : null);
    var itin = (c && adr) ? ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(String(d.monClub || "") + " " + adr))
      : ((la != null && lo != null) ? ("https://www.google.com/maps/dir/?api=1&destination=" + la + "," + lo) : (adr ? ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(String(ic.nom || d.monClub || "") + " " + adr)) : ""));
    var rien = !tel && !site && !itin && !email && !insta && !fb && !horaires && !phrase;
    if (rien && !peutEditerContact) return null;
    function bouton(href, libelle, svgPath, cle) {
      return h("a", { key: cle, href: href, target: /^https?:/.test(href) ? "_blank" : undefined, rel: "noopener", style: { minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, padding: "14px 6px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.3)", borderTop: "1px solid rgba(222,196,146,0.5)", background: "linear-gradient(172deg, rgba(62,104,118,1) 0%, rgba(30,54,64,1) 38%, rgba(12,21,25,1) 78%, rgba(6,10,12,1) 100%)", boxShadow: "0 12px 22px rgba(0,0,0,0.6), inset 0 1px 0 rgba(243,238,228,0.14)", color: IV, textDecoration: "none" } },
        h("span", { "aria-hidden": "true", style: { width: 32, height: 32, borderRadius: "50%", border: "0.8px solid rgba(201,166,107,0.7)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: CH, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }, svgPath)),
        h("span", { style: { fontFamily: SERIF, fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", textAlign: "center", lineHeight: 1.15 } }, libelle));
    }
    var btns = [];
    if (tel) btns.push(bouton("tel:" + tel.replace(/[^+\d]/g, ""), T("Appeler", "Call", "Llamar", "Chiama", "電話", "Anrufen", "اتصال", "拨打电话", "Bellen", "Ligar", "Ring", "Позвонить", "Zadzwoń", "전화하기"), h("path", { d: "M5 4h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" }), "tel"));
    if (email) btns.push(bouton("mailto:" + email, T("E-mail", "E-mail", "E-mail", "E-mail", "メール", "E-Mail", "البريد", "电子邮箱", "E-mail", "E-mail", "E-post", "E-mail", "E-mail", "이메일"), [h("rect", { key: 1, x: 3, y: 5, width: 18, height: 14, rx: 2 }), h("path", { key: 2, d: "M3.5 6.5l8.5 6.5 8.5-6.5" })], "mail"));
    if (site) btns.push(bouton(site, T("Site internet", "Website", "Sitio web", "Sito web", "ウェブサイト", "Website", "الموقع", "网站", "Website", "Site", "Webbplats", "Сайт", "Strona internetowa", "웹사이트"), [h("circle", { key: 1, cx: 12, cy: 12, r: 9 }), h("path", { key: 2, d: "M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" })], "site"));
    if (insta) btns.push(bouton(insta, "Instagram", [h("rect", { key: 1, x: 4, y: 4, width: 16, height: 16, rx: 4.5 }), h("circle", { key: 2, cx: 12, cy: 12, r: 3.6 }), h("circle", { key: 3, cx: 16.8, cy: 7.2, r: 0.6 })], "insta"));
    if (fb) btns.push(bouton(fb, "Facebook", h("path", { d: "M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.4h2.5V20h3.4v-6.6h2.5L17 10h-3V8.6c0-.4.3-.6.6-.6Z" }), "fb"));
    if (itin) btns.push(bouton(itin, T("Itinéraire", "Directions", "Cómo llegar", "Indicazioni", "ルート", "Route", "الاتجاهات", "路线", "Route", "Rota", "Vägbeskrivning", "Маршрут", "Dojazd", "길찾기"), [h("path", { key: 1, d: "M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Z" }), h("circle", { key: 2, cx: 12, cy: 10, r: 2.2 })], "itin"));
    var crayon = peutEditerContact ? h("button", { type: "button", onClick: ouvrirEditionContact, style: { minHeight: 34, padding: "0 14px", borderRadius: 999, border: "1px solid " + BORD, background: "transparent", color: CH, fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, "✎ " + T("Modifier", "Edit", "Editar", "Modifica", "編集", "Bearbeiten", "تعديل", "修改", "Bewerken", "Editar", "Ändra", "Изменить", "Edytuj", "수정")) : null;
    return section([
      titreSection(T("Contacter l’écurie", "Contact the stable", "Contactar con la cuadra", "Contatta la scuderia", "厩舎に連絡", "Stall kontaktieren", "تواصل مع الإسطبل", "联系马厩", "Contact opnemen met de stal", "Entrar em contato com a cocheira", "Kontakta stallet", "Связаться с конюшней", "Skontaktuj się ze stajnią", "마구간에 연락하기"), null, null, crayon),
      phrase ? h("div", { key: "ctp", style: { marginBottom: 14, fontFamily: SERIF, fontStyle: "italic", fontSize: 18, lineHeight: 1.4, color: CH, textAlign: "center" } }, phrase) : null,
      btns.length ? h("div", { key: "ctc", style: { display: "grid", gridTemplateColumns: "repeat(" + Math.min(btns.length, 3) /* 19/10 etape A : 3 par rangee au plus */ + ", minmax(0, 1fr))", gap: 10, maxWidth: 640, marginInline: "auto" /* 19/10 etape A, variante B choisie par Blandine : boutons centres partout (640 px au plus) */ } }, btns)
        : (peutEditerContact ? h("button", { key: "ctv", type: "button", onClick: ouvrirEditionContact, style: { width: "100%", minHeight: 56, borderRadius: 14, border: "1px dashed rgba(201,166,107,0.45)", background: "transparent", color: CH, fontFamily: M, fontSize: 13.5, cursor: "pointer" } }, "+ " + T("Ajouter les coordonnées de l’écurie", "Add the stable's contact details", "Añadir los datos de contacto", "Aggiungi i contatti della scuderia", "連絡先を追加", "Kontaktdaten hinzufügen", "إضافة بيانات الاتصال", "添加马厩的联系方式", "Contactgegevens van de stal toevoegen", "Adicionar os dados de contato da cocheira", "Lägg till stallets kontaktuppgifter", "Добавить контакты конюшни", "Dodaj dane kontaktowe stajni", "마구간 연락처 추가하기")) : null),
      (tel || adr || horaires) ? h("div", { key: "ctx", style: { marginTop: 12, fontFamily: M, fontSize: 12.5, lineHeight: 1.6, color: GR2, textAlign: "center" } },
        tel ? h("div", { dir: "ltr" }, tel) : null,
        adr ? h("div", null, adr) : null,
        horaires ? h("div", { style: { marginTop: 6, whiteSpace: "pre-line" } }, h("span", { style: { color: GR3 } }, T("Horaires", "Opening hours", "Horario", "Orari", "営業時間", "Öffnungszeiten", "المواعيد", "时间表", "Openingstijden", "Horários", "Öppettider", "Часы работы", "Godziny", "운영 시간") + " : "), horaires) : null) : null
    ], large ? -1 : undefined);   /* 19/10 etape A : 40 px avant le contact sur grand ecran */
  })();
  var feuilleContact = !contactEdit ? null : h("div", { onClick: function () { setContactEdit(false); }, style: { position: "fixed", inset: 0, zIndex: 9100, background: "rgba(3,7,8,0.75)", display: "flex", alignItems: large ? "center" : "flex-end", justifyContent: "center" } },
    h("div", { onClick: function (e) { e.stopPropagation(); }, role: "dialog", dir: rtl ? "rtl" : undefined, style: { width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto", boxSizing: "border-box", background: SURF, borderRadius: large ? 20 : "20px 20px 0 0", border: "1px solid " + BORD2, padding: large ? "22px 20px" : "20px 18px calc(env(safe-area-inset-bottom) + 104px)", color: IV } },
      h("div", { style: { fontFamily: SERIF, fontSize: 22 } }, T("Coordonnées de l’écurie", "Stable contact details", "Datos de contacto de la cuadra", "Contatti della scuderia", "厩舎の連絡先", "Kontaktdaten des Stalls", "بيانات اتصال الإسطبل", "马厩联系方式", "Contactgegevens van de stal", "Dados de contato da cocheira", "Stallets kontaktuppgifter", "Контакты конюшни", "Dane kontaktowe stajni", "마구간 연락처")),
      h("div", { style: { marginTop: 6, fontFamily: M, fontSize: 12.5, lineHeight: 1.55, color: GR2 } }, T("Visibles par tout le monde, même sans compte, et par Google. Laisse vide ce que tu ne veux pas publier.", "Visible to everyone, even without an account, and to Google. Leave empty what you don't want to publish.", "Visibles para todos, incluso sin cuenta, y para Google. Deja vacío lo que no quieras publicar.", "Visibili a tutti, anche senza account, e a Google. Lascia vuoto ciò che non vuoi pubblicare.", "アカウントがなくても誰でも、Googleからも見られます。公開したくない項目は空欄に。", "Für alle sichtbar, auch ohne Konto, und für Google. Lass leer, was du nicht veröffentlichen willst.", "مرئية للجميع حتى بدون حساب ولجوجل. اترك فارغا ما لا تريد نشره.", "所有人都能看到，即使没有账户，谷歌也能搜到。不想公开的内容请留空。", "Zichtbaar voor iedereen, ook zonder account, en voor Google. Laat leeg wat je niet wilt publiceren.", "Visível para todo mundo, mesmo sem conta, e para o Google. Deixe em branco o que você não quiser publicar.", "Syns för alla, även utan konto, och för Google. Lämna tomt det du inte vill publicera.", "Видны всем, даже без аккаунта, и Google. Оставь пустым то, что не хочешь публиковать.", "Widoczne dla wszystkich, także bez konta, oraz dla Google. Zostaw puste to, czego nie chcesz publikować.", "누구나, 계정이 없어도, 그리고 Google에서도 볼 수 있어요. 공개하고 싶지 않은 항목은 비워 두세요.")),
      [["phrase", T("Phrase d’accueil (ex. « Inscriptions ouvertes, cours dès 4 ans »)", "Welcome line (e.g. “Registrations open, lessons from age 4”)", "Frase de bienvenida (p. ej. «Inscripciones abiertas»)", "Frase di benvenuto (es. «Iscrizioni aperte»)", "ひとこと（例：「入会受付中」）", "Begrüßungssatz (z. B. „Anmeldung offen“)", "جملة ترحيب (مثلا: «التسجيل مفتوح»)", "欢迎语（例如“报名进行中，4岁起可上课”）", "Welkomstzin (bijv. “Inschrijvingen geopend, lessen vanaf 4 jaar”)", "Frase de boas-vindas (ex.: “Matrículas abertas, aulas a partir de 4 anos”)", "Välkomstmening (t.ex. ”Anmälan öppen, lektioner från 4 år”)", "Приветствие (например: «Идёт набор, занятия с 4 лет»)", "Zdanie powitalne (np. „Trwają zapisy, lekcje od 4 lat”)", "환영 문구 (예: “등록 접수 중, 4세부터 레슨 가능”)")],
       ["tel", T("Téléphone", "Phone", "Teléfono", "Telefono", "電話", "Telefon", "الهاتف", "电话", "Telefoon", "Telefone", "Telefon", "Телефон", "Telefon", "전화번호"), "tel"], ["email", "E-mail", "email"], ["site", T("Site internet", "Website", "Sitio web", "Sito web", "ウェブサイト", "Website", "الموقع", "网站", "Website", "Site", "Webbplats", "Сайт", "Strona internetowa", "웹사이트"), "url"],
       ["instagram", "Instagram (@…)"], ["facebook", "Facebook"], ["adresse", T("Adresse", "Address", "Dirección", "Indirizzo", "住所", "Adresse", "العنوان", "地址", "Adres", "Endereço", "Adress", "Адрес", "Adres", "주소")],
       ["horaires", T("Horaires d’ouverture", "Opening hours", "Horario de apertura", "Orari di apertura", "営業時間", "Öffnungszeiten", "ساعات العمل", "营业时间", "Openingstijden", "Horário de funcionamento", "Öppettider", "Часы работы", "Godziny otwarcia", "영업 시간"), "zone"]].map(function (fd) {
        var k = fd[0], st = { width: "100%", boxSizing: "border-box", minHeight: 44, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(201,166,107,0.28)", background: "rgba(0,0,0,0.25)", color: IV, fontFamily: M, fontSize: 14, outline: "none" };
        var maj = function (e) { var v = e.target.value; setContactF(function (o) { var n2 = Object.assign({}, o); n2[k] = v; return n2; }); };
        return h("label", { key: k, style: { display: "block", marginTop: 12 } }, h("span", { style: { display: "block", fontFamily: M, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: GR3, marginBottom: 5 } }, fd[1]),
          fd[2] === "zone" ? h("textarea", { value: contactF[k] || "", rows: 3, onChange: maj, style: Object.assign({}, st, { resize: "vertical" }) }) : h("input", { value: contactF[k] || "", type: fd[2] || "text", onChange: maj, style: st }));
      }),
      /^erreur/.test(contactEtat) ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12.5, color: "#E0A3A3" } }, T("Pas enregistré", "Not saved", "No guardado", "Non salvato", "保存できませんでした", "Nicht gespeichert", "لم يتم الحفظ", "未保存", "Niet opgeslagen", "Não salvo", "Inte sparat", "Не сохранено", "Nie zapisano", "저장되지 않았어요") + " (" + contactEtat.slice(7, 140) + ")") : null,
      h("button", { type: "button", disabled: contactEtat === "envoi", onClick: enregistrerContact, style: { marginTop: 16, width: "100%", minHeight: 48, borderRadius: 999, border: "none", background: CH, color: NOIR, fontFamily: M, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: contactEtat === "envoi" ? 0.6 : 1 } }, contactEtat === "envoi" ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")),
      h("button", { type: "button", onClick: function () { setContactEdit(false); }, style: { marginTop: 8, width: "100%", minHeight: 42, borderRadius: 999, border: "none", background: "transparent", color: GR2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"))));
  /* 10/10 (866) Blandine : « RECLAMER LA PAGE » d une ecurie qui n a pas encore de responsable. Lien discret sous
     « Contacter l ecurie » ; visiteur sans compte -> « Creer un compte » ; connecte -> petit formulaire, envoye par la
     fonction hype_demander_ecurie (SQL du 10/10). Blandine valide ensuite (moderatrices). Aucune autre ecriture. */
  var _rcl = React.useState(false), reclamOuvert = _rcl[0], setReclamOuvert = _rcl[1];
  var _rcf = React.useState({ nom: "", role: "", tel: "", email: "", ffe: "", message: "" }), reclamF = _rcf[0], setReclamF = _rcf[1];
  var _rce = React.useState(""), reclamEtat = _rce[0], setReclamEtat = _rce[1];
  var clefRec = (typeof clefClubG === "function") ? clefClubG(d.monClub || "") : String(d.monClub || "").toLowerCase().trim();
  var dejaResp = false; try { dejaResp = !!(typeof HYPE_CLUBS_REVENDIQUES !== "undefined" && HYPE_CLUBS_REVENDIQUES && HYPE_CLUBS_REVENDIQUES[clefRec]); } catch (eDr) { dejaResp = false; }
  var lienReclamer = (!d.monClub || dejaResp || d.peutEditerBanniere || d.visiteurG === null) ? null : h("div", { key: "rcl", style: { textAlign: "center", padding: "22px 16px 0" } },
    h("button", { type: "button", onClick: function () { if (d.visiteurG === true) { d.allerAuthG("inscription"); return; } setReclamEtat(""); setReclamOuvert(true); }, style: { background: "transparent", border: "none", padding: "6px 4px", cursor: "pointer", fontFamily: M, fontSize: 12.5, color: GR2, textDecoration: "underline", textDecorationColor: "rgba(201,166,107,0.5)", textUnderlineOffset: 3 } },
      T("Vous gérez cette écurie ? Réclamer la page", "Do you run this stable? Claim this page", "¿Gestionas esta cuadra? Reclamar la página", "Gestisci questa scuderia? Rivendica la pagina", "この厩舎の運営者ですか？ページを申請", "Führst du diesen Stall? Seite beanspruchen", "هل تدير هذا الإسطبل؟ طالب بالصفحة", "你管理这个马厩吗？认领此页面", "Beheer jij deze stal? Claim de pagina", "Você gerencia esta cocheira? Reivindique a página", "Driver du det här stallet? Gör anspråk på sidan", "Ты управляешь этой конюшней? Заявить права на страницу", "Prowadzisz tę stajnię? Przejmij stronę", "이 마구간을 운영하시나요? 페이지 인수 요청하기")));
  async function envoyerReclamation() {
    var f = reclamF;
    if (!String(f.nom || "").trim() || !String(f.tel || "").trim() && !String(f.email || "").trim()) { setReclamEtat("incomplet"); return; }
    setReclamEtat("envoi");
    try {
      var r = await supa.rpc("hype_demander_ecurie", { p_clef: clefRec, p_nom_club: String(d.monClub || "").trim(), p_nom: f.nom.trim(), p_role: f.role || null, p_tel: f.tel.trim() || null, p_email: f.email.trim() || null, p_ffe: f.ffe.trim() || null, p_message: f.message.trim() || null });
      if (r && r.error) { setReclamEtat("erreur:" + String(r.error.message || r.error)); return; }
      setReclamEtat(String((r && r.data) || "erreur"));
    } catch (eRq) { setReclamEtat("erreur:" + String(eRq)); }
  }
  var champStyle = { width: "100%", boxSizing: "border-box", minHeight: 44, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(201,166,107,0.28)", background: "rgba(0,0,0,0.25)", color: IV, fontFamily: M, fontSize: 14, outline: "none" };
  function champ(cle, label, type) { return h("label", { key: cle, style: { display: "block", marginTop: 10 } }, h("span", { style: { display: "block", fontFamily: M, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: GR3, marginBottom: 5 } }, label),
    type === "zone" ? h("textarea", { value: reclamF[cle], rows: 3, onChange: function (e) { var v = e.target.value; setReclamF(function (o) { var n2 = Object.assign({}, o); n2[cle] = v; return n2; }); }, style: Object.assign({}, champStyle, { resize: "vertical" }) })
      : h("input", { value: reclamF[cle], type: type || "text", onChange: function (e) { var v = e.target.value; setReclamF(function (o) { var n2 = Object.assign({}, o); n2[cle] = v; return n2; }); }, style: champStyle })); }
  var ROLES_REC = [["gerant", T("Gérant(e)", "Manager", "Gerente", "Gestore", "管理者", "Leitung", "مدير", "负责人", "Beheerder", "Gerente", "Föreståndare", "Управляющий(ая)", "Zarządca", "운영자")], ["proprietaire", T("Propriétaire", "Owner", "Propietario/a", "Proprietario/a", "オーナー", "Inhaber/in", "مالك", "所有者", "Eigenaar", "Proprietário(a)", "Ägare", "Владелец", "Właściciel", "소유자")], ["moniteur", T("Moniteur / monitrice", "Instructor", "Instructor/a", "Istruttore/trice", "インストラクター", "Reitlehrer/in", "مدرب", "教练", "Instructeur", "Instrutor(a)", "Ridlärare", "Инструктор", "Instruktor / instruktorka", "강사")], ["autre", T("Autre", "Other", "Otro", "Altro", "その他", "Andere", "أخرى", "其他", "Anders", "Outro", "Övrigt", "Другое", "Inne", "기타")]];
  var msgRec = { ok: T("Demande envoyée ! Elle sera vérifiée rapidement ; tu recevras une notification.", "Request sent! It will be checked shortly; you will get a notification.", "¡Solicitud enviada! Se revisará pronto; recibirás una notificación.", "Richiesta inviata! Sarà verificata a breve; riceverai una notifica.", "申請を送信しました。確認後に通知が届きます。", "Anfrage gesendet! Sie wird bald geprüft; du bekommst eine Benachrichtigung.", "تم إرسال الطلب! سيتم التحقق منه قريبا وستصلك إشعار.", "申请已发送！我们会尽快审核，你会收到通知。", "Aanvraag verstuurd! Die wordt snel gecontroleerd; je krijgt een melding.", "Pedido enviado! Ele será verificado em breve; você vai receber uma notificação.", "Förfrågan skickad! Den granskas snart och du får en notis.", "Заявка отправлена! Её скоро проверят, ты получишь уведомление.", "Zgłoszenie wysłane! Zostanie szybko sprawdzone, dostaniesz powiadomienie.", "요청을 보냈어요! 빠르게 확인한 뒤 알림으로 알려 드릴게요."),
    deja_envoyee: T("Tu as déjà une demande en attente pour cette écurie.", "You already have a pending request for this stable.", "Ya tienes una solicitud pendiente para esta cuadra.", "Hai già una richiesta in attesa per questa scuderia.", "この厩舎への申請はすでに審査中です。", "Du hast schon eine offene Anfrage für diesen Stall.", "لديك طلب قيد الانتظار لهذا الإسطبل.", "你已经有一个针对这个马厩的申请正在等待处理。", "Je hebt al een aanvraag in behandeling voor deze stal.", "Você já tem um pedido pendente para esta cocheira.", "Du har redan en väntande förfrågan för det här stallet.", "У тебя уже есть заявка на эту конюшню, она ожидает рассмотрения.", "Masz już oczekujące zgłoszenie dla tej stajni.", "이 마구간에 대한 요청이 이미 대기 중이에요."),
    deja_revendiquee: T("Cette écurie a déjà une responsable sur Hype.", "This stable already has a manager on Hype.", "Esta cuadra ya tiene responsable en Hype.", "Questa scuderia ha già un responsabile su Hype.", "この厩舎にはすでに管理者がいます。", "Dieser Stall hat bereits eine Verwaltung auf Hype.", "هذا الإسطبل لديه مسؤول بالفعل على Hype.", "这个马厩在 Hype 上已经有负责人了。", "Deze stal heeft al een beheerder op Hype.", "Esta cocheira já tem uma responsável no Hype.", "Det här stallet har redan en ansvarig på Hype.", "У этой конюшни уже есть ответственная в Hype.", "Ta stajnia ma już administratorkę w Hype.", "이 마구간에는 이미 Hype 담당자가 있어요."),
    incomplet: T("Indique au moins ton nom et un téléphone ou un e-mail.", "Please give at least your name and a phone or e-mail.", "Indica al menos tu nombre y un teléfono o e-mail.", "Indica almeno il tuo nome e un telefono o un'e-mail.", "お名前と電話またはメールを入力してください。", "Gib mindestens deinen Namen und Telefon oder E-Mail an.", "أدخل اسمك وهاتفا أو بريدا إلكترونيا على الأقل.", "请至少填写你的姓名，以及电话或电子邮箱。", "Geef minstens je naam en een telefoonnummer of e-mailadres op.", "Informe pelo menos seu nome e um telefone ou e-mail.", "Ange minst ditt namn och ett telefonnummer eller en e-postadress.", "Укажи как минимум своё имя и телефон или e-mail.", "Podaj przynajmniej swoje imię i nazwisko oraz telefon lub e-mail.", "이름과 전화번호 또는 이메일을 최소한 하나는 입력해 주세요.") };
  var feuilleReclam = !reclamOuvert ? null : h("div", { onClick: function () { setReclamOuvert(false); }, style: { position: "fixed", inset: 0, zIndex: 9100, background: "rgba(3,7,8,0.75)", display: "flex", alignItems: large ? "center" : "flex-end", justifyContent: "center" } },
    h("div", { onClick: function (e) { e.stopPropagation(); }, role: "dialog", dir: rtl ? "rtl" : undefined, style: { width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto", boxSizing: "border-box", background: SURF, borderRadius: large ? 20 : "20px 20px 0 0", border: "1px solid " + BORD2, padding: large ? "22px 20px 22px" : "20px 18px calc(env(safe-area-inset-bottom) + 104px)" /* la barre du bas passe par-dessus : place pour la voir en entier */, color: IV } },
      h("div", { style: { fontFamily: SERIF, fontSize: 22, lineHeight: 1.2 } }, T("Réclamer la page", "Claim this page", "Reclamar la página", "Rivendica la pagina", "ページを申請", "Seite beanspruchen", "المطالبة بالصفحة", "认领此页面", "Pagina claimen", "Reivindicar a página", "Gör anspråk på sidan", "Заявить права на страницу", "Przejmij stronę", "페이지 인수 요청")),
      h("div", { style: { marginTop: 4, fontFamily: M, fontSize: 12.5, color: CH } }, String(d.monClub || "")),
      h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 12.5, lineHeight: 1.55, color: GR2 } }, T("Ta demande est vérifiée avant validation (par exemple en appelant l’écurie). Une fois acceptée, tu pourras gérer la photo, la citation, l’agenda et les coordonnées de la page.", "Your request is checked before approval (for example by calling the stable). Once accepted, you can manage the page's photo, quote, calendar and contact details.", "Tu solicitud se verifica antes de aprobarla (por ejemplo, llamando a la cuadra). Una vez aceptada, podrás gestionar la foto, la cita, la agenda y los datos de contacto.", "La tua richiesta viene verificata prima dell'approvazione (ad esempio chiamando la scuderia). Una volta accettata, potrai gestire foto, citazione, calendario e contatti della pagina.", "承認前に確認を行います（厩舎への電話など）。承認後、写真・言葉・予定・連絡先を管理できます。", "Deine Anfrage wird vor der Freigabe geprüft (z. B. durch einen Anruf beim Stall). Danach kannst du Foto, Zitat, Termine und Kontaktdaten verwalten.", "يتم التحقق من طلبك قبل الموافقة (مثلا بالاتصال بالإسطبل). بعد القبول يمكنك إدارة الصورة والاقتباس والمواعيد وبيانات الاتصال.", "你的申请会在通过前经过核实（例如给马厩打电话确认）。申请通过后，你就可以管理页面的照片、引言、日程和联系方式。", "Je aanvraag wordt gecontroleerd voordat die wordt goedgekeurd (bijvoorbeeld door de stal te bellen). Zodra je aanvraag is geaccepteerd, kun je de foto, het citaat, de agenda en de contactgegevens van de pagina beheren.", "Seu pedido é verificado antes da aprovação (por exemplo, ligando para a cocheira). Depois de aceito, você poderá gerenciar a foto, a citação, a agenda e os dados de contato da página.", "Din förfrågan granskas innan den godkänns (till exempel genom att stallet rings upp). När den är godkänd kan du hantera sidans foto, citat, kalender och kontaktuppgifter.", "Твоя заявка проверяется перед одобрением (например, звонком в конюшню). После подтверждения ты сможешь управлять фото, цитатой, расписанием и контактами страницы.", "Twoje zgłoszenie jest sprawdzane przed zatwierdzeniem (np. przez telefon do stajni). Po zaakceptowaniu będziesz mogć zarządzać zdjęciem, cytatem, kalendarzem i danymi kontaktowymi strony.", "요청은 승인 전에 확인해요 (예: 마구간에 전화로 문의). 승인되면 페이지의 사진, 인용문, 일정, 연락처를 관리할 수 있어요.")),
      (reclamEtat === "ok" || reclamEtat === "deja_envoyee" || reclamEtat === "deja_revendiquee")
        ? h("div", { style: { marginTop: 18 } },
            h("div", { style: { padding: "14px", borderRadius: 12, background: "rgba(201,166,107,0.1)", border: "1px solid rgba(201,166,107,0.3)", fontFamily: M, fontSize: 13.5, lineHeight: 1.5 } }, msgRec[reclamEtat]),
            h("button", { type: "button", onClick: function () { setReclamOuvert(false); }, style: { marginTop: 14, width: "100%", minHeight: 46, borderRadius: 999, border: "1px solid " + BORD, background: "transparent", color: IV, fontFamily: M, fontSize: 14, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))
        : h("div", null,
            champ("nom", T("Prénom et nom", "First and last name", "Nombre y apellidos", "Nome e cognome", "氏名", "Vor- und Nachname", "الاسم الكامل", "姓名", "Voor- en achternaam", "Nome e sobrenome", "För- och efternamn", "Имя и фамилия", "Imię i nazwisko", "이름")),
            h("div", { style: { marginTop: 10 } }, h("span", { style: { display: "block", fontFamily: M, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: GR3, marginBottom: 6 } }, T("Ton rôle", "Your role", "Tu función", "Il tuo ruolo", "役割", "Deine Rolle", "دورك", "你的身份", "Jouw rol", "Seu papel", "Din roll", "Твоя роль", "Twoja rola", "내 역할")),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, ROLES_REC.map(function (rr) { var act = reclamF.role === rr[0]; return h("button", { key: rr[0], type: "button", onClick: function () { setReclamF(function (o) { return Object.assign({}, o, { role: rr[0] }); }); }, style: { minHeight: 34, padding: "0 12px", borderRadius: 999, border: "1px solid " + (act ? CH : "rgba(201,166,107,0.28)"), background: act ? "rgba(201,166,107,0.16)" : "transparent", color: act ? CH : IV, fontFamily: M, fontSize: 12.5, cursor: "pointer" } }, rr[1]); }))),
            champ("tel", T("Téléphone", "Phone", "Teléfono", "Telefono", "電話", "Telefon", "الهاتف", "电话", "Telefoon", "Telefone", "Telefon", "Телефон", "Telefon", "전화번호"), "tel"),
            champ("email", T("E-mail", "E-mail", "E-mail", "E-mail", "メール", "E-Mail", "البريد الإلكتروني", "电子邮箱", "E-mail", "E-mail", "E-post", "E-mail", "E-mail", "이메일"), "email"),
            champ("ffe", T("N° d’affiliation FFE du club (facultatif)", "Club's FFE number (optional)", "N.º de afiliación FFE del club (opcional)", "N. di affiliazione FFE del club (facoltativo)", "クラブのFFE番号（任意）", "FFE-Nummer des Vereins (optional)", "رقم انتساب النادي (اختياري)", "俱乐部的 FFE 编号（选填）", "FFE-aansluitnummer van de manege (optioneel)", "N° de filiação FFE do clube (opcional)", "Klubbens FFE-nummer (valfritt)", "Номер аффилиации клуба в FFE (необязательно)", "Numer afiliacji FFE klubu (opcjonalnie)", "클럽의 FFE 가입 번호 (선택)")),
            champ("message", T("Message (facultatif)", "Message (optional)", "Mensaje (opcional)", "Messaggio (facoltativo)", "メッセージ（任意）", "Nachricht (optional)", "رسالة (اختياري)", "留言（选填）", "Bericht (optioneel)", "Mensagem (opcional)", "Meddelande (valfritt)", "Сообщение (необязательно)", "Wiadomość (opcjonalnie)", "메시지 (선택)"), "zone"),
            (reclamEtat === "incomplet") ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12.5, color: "#E0A3A3" } }, msgRec.incomplet) : null,
            /^erreur/.test(reclamEtat) ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 12.5, color: "#E0A3A3" } }, T("L’envoi n’a pas marché", "Sending failed", "El envío falló", "Invio non riuscito", "送信できませんでした", "Senden fehlgeschlagen", "تعذر الإرسال", "发送没有成功", "Verzenden is niet gelukt", "O envio não funcionou", "Det gick inte att skicka", "Отправить не получилось", "Nie udało się wysłać", "전송에 실패했어요") + " (" + reclamEtat.slice(7, 120) + ")") : null,
            h("button", { type: "button", disabled: reclamEtat === "envoi", onClick: envoyerReclamation, style: { marginTop: 16, width: "100%", minHeight: 48, borderRadius: 999, border: "none", background: CH, color: NOIR, fontFamily: M, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: reclamEtat === "envoi" ? 0.6 : 1 } }, reclamEtat === "envoi" ? "…" : T("Envoyer ma demande", "Send my request", "Enviar mi solicitud", "Invia la mia richiesta", "申請を送る", "Anfrage senden", "إرسال طلبي", "发送我的申请", "Mijn aanvraag versturen", "Enviar meu pedido", "Skicka min förfrågan", "Отправить заявку", "Wyślij zgłoszenie", "요청 보내기")),
            h("button", { type: "button", onClick: function () { setReclamOuvert(false); }, style: { marginTop: 8, width: "100%", minHeight: 42, borderRadius: 999, border: "none", background: "transparent", color: GR2, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")))));
  /* 10/10 (867) Etape 3 « Reclamer la page » : la liste « Demandes d ecuries » des MODERATRICES. Bouton en haut de la page
     Ecurie quand des demandes attendent ; s ouvre toute seule depuis la notification. Accepter / Refuser passent par
     hype_traiter_demande_ecurie (la base verifie que c est une moderatrice). */
  var estModoG = (typeof estModerateurHype === "function") && estModerateurHype(d.moiG);
  var _dme = React.useState(null), demandesEc = _dme[0], setDemandesEc = _dme[1];
  var _dmo = React.useState(function () { try { var v = !!window.__hypeDemandesEcurie; window.__hypeDemandesEcurie = false; return v; } catch (e) { return false; } }), demandesOuvert = _dmo[0], setDemandesOuvert = _dmo[1];
  var _dmt = React.useState({}), demandesTraite = _dmt[0], setDemandesTraite = _dmt[1];
  function chargerDemandesEc() { (async function () { try { var r = await supa.from("demandes_ecurie").select("*").eq("statut", "en_attente").order("cree_le", { ascending: true }).limit(100); setDemandesEc((r && r.data) || []); } catch (eLd) { setDemandesEc([]); } })(); }
  React.useEffect(function () { if (estModoG) chargerDemandesEc(); }, [estModoG]);
  async function traiterDemandeEc(dm, accepter) {
    setDemandesTraite(function (o) { var n2 = Object.assign({}, o); n2[dm.id] = "…"; return n2; });
    try {
      var r = await supa.rpc("hype_traiter_demande_ecurie", { p_id: dm.id, p_accepter: !!accepter });
      var res = (r && r.error) ? ("erreur : " + String(r.error.message || r.error)) : String((r && r.data) || "");
      setDemandesTraite(function (o) { var n2 = Object.assign({}, o); n2[dm.id] = res; return n2; });
      if (res === "acceptee") { try { if (typeof hypeChargerClubsRevendiques === "function") hypeChargerClubsRevendiques(); } catch (eCr) { } }
    } catch (eTr) { setDemandesTraite(function (o) { var n2 = Object.assign({}, o); n2[dm.id] = "erreur : " + String(eTr); return n2; }); }
  }
  function telClubBase(clef) { try { var bd = window.HYPE_CLUBS || []; for (var i = 0; i < bd.length; i++) { if (clefClubG(bd[i].nom) === clef) return String(bd[i].tel || ""); } } catch (eTc) { } return ""; }
  var nbDemandesEc = (demandesEc || []).filter(function (dm) { return !demandesTraite[dm.id]; }).length;
  var lienDemandes = (estModoG && nbDemandesEc > 0) ? h("div", { key: "ldm", style: { padding: "16px 16px 0", textAlign: "center" } },
    h("button", { type: "button", onClick: function () { setDemandesOuvert(true); }, style: { minHeight: 40, padding: "0 18px", borderRadius: 999, border: "1px solid " + CH, background: "rgba(201,166,107,0.12)", color: CH, fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } },
      T("Demandes d’écuries en attente", "Pending stable requests", "Solicitudes de cuadras pendientes", "Richieste di scuderie in attesa", "厩舎の申請（審査待ち）", "Offene Stall-Anfragen", "طلبات الإسطبلات المعلقة", "待处理的马厩申请", "Aanvragen van stallen in behandeling", "Pedidos de cocheiras pendentes", "Väntande stallförfrågningar", "Заявки конюшен в ожидании", "Oczekujące zgłoszenia stajni", "대기 중인 마구간 요청") + " (" + nbDemandesEc + ")")) : null;
  var ROLE_TXT = { gerant: T("Gérant(e)", "Manager", "Gerente", "Gestore", "管理者", "Leitung", "مدير", "负责人", "Beheerder", "Gerente", "Föreståndare", "Управляющий(ая)", "Zarządca", "운영자"), proprietaire: T("Propriétaire", "Owner", "Propietario/a", "Proprietario/a", "オーナー", "Inhaber/in", "مالك", "所有者", "Eigenaar", "Proprietário(a)", "Ägare", "Владелец", "Właściciel", "소유자"), moniteur: T("Moniteur / monitrice", "Instructor", "Instructor/a", "Istruttore/trice", "インストラクター", "Reitlehrer/in", "مدرب", "教练", "Instructeur", "Instrutor(a)", "Ridlärare", "Инструктор", "Instruktor / instruktorka", "강사"), autre: T("Autre", "Other", "Otro", "Altro", "その他", "Andere", "أخرى", "其他", "Anders", "Outro", "Övrigt", "Другое", "Inne", "기타") };
  var feuilleDemandes = !(estModoG && demandesOuvert) ? null : h("div", { onClick: function () { setDemandesOuvert(false); }, style: { position: "fixed", inset: 0, zIndex: 9100, background: "rgba(3,7,8,0.75)", display: "flex", alignItems: large ? "center" : "flex-end", justifyContent: "center" } },
    h("div", { onClick: function (e) { e.stopPropagation(); }, role: "dialog", dir: rtl ? "rtl" : undefined, style: { width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", boxSizing: "border-box", background: SURF, borderRadius: large ? 20 : "20px 20px 0 0", border: "1px solid " + BORD2, padding: large ? "22px 20px" : "20px 16px calc(env(safe-area-inset-bottom) + 104px)", color: IV } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } },
        h("div", { style: { fontFamily: SERIF, fontSize: 22 } }, T("Demandes d’écuries", "Stable requests", "Solicitudes de cuadras", "Richieste di scuderie", "厩舎の申請", "Stall-Anfragen", "طلبات الإسطبلات", "马厩申请", "Stalaanvragen", "Solicitações de cocheiras", "Stallförfrågningar", "Заявки конюшен", "Zgłoszenia stajni", "마구간 요청")),
        h("button", { type: "button", onClick: function () { setDemandesOuvert(false); }, "aria-label": "×", style: { width: 34, height: 34, borderRadius: "50%", border: "1px solid " + BORD, background: "transparent", color: IV, cursor: "pointer" } }, "×")),
      h("div", { style: { marginTop: 6, fontFamily: M, fontSize: 12, lineHeight: 1.5, color: GR3 } }, T("Avant d’accepter, vérifie (par exemple en appelant l’écurie au numéro de la base). Accepter = cette personne devient responsable de l’écurie.", "Before accepting, check (for example by calling the stable's listed number). Accepting = this person becomes the stable's manager.", "Antes de aceptar, verifica (por ejemplo llamando al número de la cuadra). Aceptar = esta persona pasa a ser responsable de la cuadra.", "Prima di accettare, verifica (ad esempio chiamando il numero della scuderia). Accettare = questa persona diventa responsabile della scuderia.", "承認前に確認してください（厩舎の番号に電話するなど）。承認すると、この人が厩舎の管理者になります。", "Vor dem Annehmen prüfen (z. B. die hinterlegte Nummer des Stalls anrufen). Annehmen = diese Person verwaltet den Stall.", "قبل القبول، تحقق (مثلا بالاتصال برقم الإسطبل). القبول = يصبح هذا الشخص مسؤول الإسطبل.", "接受之前请先核实（例如拨打数据库里登记的马厩电话）。接受 = 这个人将成为马厩的负责人。", "Controleer eerst even (bijvoorbeeld door de stal te bellen op het nummer in de database). Accepteren = deze persoon wordt beheerder van de stal.", "Antes de aceitar, confira (por exemplo, ligando para a cocheira no número cadastrado). Aceitar = essa pessoa passa a ser responsável pela cocheira.", "Innan du godkänner, kontrollera (till exempel genom att ringa stallet på numret i databasen). Godkänna = den här personen blir ansvarig för stallet.", "Прежде чем принять, проверь (например, позвонив в конюшню по номеру из базы). Принять = этот человек становится ответственным за конюшню.", "Zanim zaakceptujesz, sprawdź (np. dzwoniąc do stajni pod numer z bazy). Akceptacja = ta osoba zostaje administratorką stajni.", "수락하기 전에 확인하세요 (예: 데이터베이스에 있는 번호로 마구간에 전화). 수락하면 이 사람이 마구간 담당자가 돼요.")),
      (demandesEc === null) ? h("div", { style: { marginTop: 16, color: GR3 } }, "…")
        : !(demandesEc.length) ? h("div", { style: { marginTop: 16, fontFamily: M, fontSize: 13, color: GR2 } }, T("Aucune demande en attente.", "No pending request.", "Ninguna solicitud pendiente.", "Nessuna richiesta in attesa.", "審査待ちの申請はありません。", "Keine offenen Anfragen.", "لا توجد طلبات معلقة.", "没有待处理的申请。", "Geen openstaande aanvragen.", "Nenhuma solicitação pendente.", "Inga väntande förfrågningar.", "Нет заявок в ожидании.", "Brak oczekujących zgłoszeń.", "대기 중인 요청이 없어요."))
        : demandesEc.map(function (dm) {
            var etat = demandesTraite[dm.id] || ""; var telBase = telClubBase(dm.club_clef);
            var ligne = function (lab, val, href) { return val ? h("div", { style: { marginTop: 4, fontFamily: M, fontSize: 13, color: GR2 } }, h("span", { style: { color: GR3 } }, lab + " : "), href ? h("a", { href: href, style: { color: IV } }, val) : val) : null; };
            return h("div", { key: dm.id, style: { marginTop: 14, padding: "14px", borderRadius: 14, border: "1px solid rgba(201,166,107,0.24)", background: "rgba(0,0,0,0.22)" } },
              h("div", { style: { fontFamily: SERIF, fontSize: 18, color: IV } }, dm.nom_club),
              h("div", { style: { marginTop: 2, fontFamily: M, fontSize: 11.5, color: GR3 } }, String(dm.cree_le || "").slice(0, 10).split("-").reverse().join("/")),
              ligne(T("Demandeur", "Requester", "Solicitante", "Richiedente", "申請者", "Antragsteller/in", "مقدم الطلب", "申请人", "Aanvrager", "Solicitante", "Sökande", "Заявитель", "Zgłaszający", "요청자"), (dm.nom || "") + (dm.role ? " · " + (ROLE_TXT[dm.role] || dm.role) : "")),
              ligne(T("Téléphone", "Phone", "Teléfono", "Telefono", "電話", "Telefon", "الهاتف", "电话", "Telefoon", "Telefone", "Telefon", "Телефон", "Telefon", "전화번호"), dm.telephone, dm.telephone ? "tel:" + String(dm.telephone).replace(/[^+\d]/g, "") : null),
              ligne("E-mail", dm.email_contact, dm.email_contact ? "mailto:" + dm.email_contact : null),
              ligne("FFE", dm.affiliation_ffe),
              ligne(T("Tél. de l’écurie (base)", "Stable's phone (listed)", "Tel. de la cuadra (base)", "Tel. della scuderia (base)", "厩舎の電話（登録）", "Telefon des Stalls (hinterlegt)", "هاتف الإسطبل", "马厩电话（数据库登记）", "Telefoonnummer van de stal (database)", "Telefone da cocheira (cadastrado)", "Stallets tel. (databasen)", "Тел. конюшни (в базе)", "Tel. stajni (baza)", "마구간 전화번호 (데이터베이스)"), telBase, telBase ? "tel:" + telBase.replace(/[^+\d]/g, "") : null),
              dm.message ? h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 13, lineHeight: 1.5, color: IV, fontStyle: "italic" } }, "« " + dm.message + " »") : null,
              etat ? h("div", { style: { marginTop: 12, fontFamily: M, fontSize: 13, color: etat === "acceptee" ? "#9FD3A8" : (etat === "refusee" ? GR2 : "#E0A3A3") } },
                  etat === "acceptee" ? T("Acceptée : cette personne est maintenant responsable de l’écurie.", "Accepted: this person now manages the stable.", "Aceptada: ahora gestiona la cuadra.", "Accettata: ora gestisce la scuderia.", "承認済み：厩舎の管理者になりました。", "Angenommen: diese Person verwaltet jetzt den Stall.", "مقبول: أصبح مسؤول الإسطبل.", "已接受：这个人现在是马厩的负责人。", "Geaccepteerd: deze persoon is nu beheerder van de stal.", "Aceita: essa pessoa agora é responsável pela cocheira.", "Godkänd: den här personen är nu ansvarig för stallet.", "Принято: теперь этот человек отвечает за конюшню.", "Zaakceptowano: ta osoba jest teraz administratorką stajni.", "수락했어요: 이제 이 사람이 마구간 담당자예요.")
                  : etat === "refusee" ? T("Refusée.", "Declined.", "Rechazada.", "Rifiutata.", "却下しました。", "Abgelehnt.", "مرفوض.", "已拒绝。", "Geweigerd.", "Recusada.", "Avslagen.", "Отклонено.", "Odrzucono.", "거절했어요.")
                  : etat === "deja_revendiquee" ? T("Impossible : l’écurie a déjà une responsable.", "Not possible: the stable already has a manager.", "Imposible: la cuadra ya tiene responsable.", "Impossibile: la scuderia ha già un responsabile.", "不可：すでに管理者がいます。", "Nicht möglich: Der Stall hat schon eine Verwaltung.", "غير ممكن: للإسطبل مسؤول بالفعل.", "无法操作：这个马厩已经有负责人了。", "Niet mogelijk: de stal heeft al een beheerder.", "Não é possível: a cocheira já tem uma responsável.", "Inte möjligt: stallet har redan en ansvarig.", "Невозможно: у конюшни уже есть ответственная.", "Niemożliwe: stajnia ma już administratorkę.", "불가능해요: 이 마구간에는 이미 담당자가 있어요.")
                  : etat)
                : h("div", { style: { display: "flex", gap: 10, marginTop: 12 } },
                    h("button", { type: "button", onClick: function () { traiterDemandeEc(dm, false); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid " + BORD, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Refuser", "Decline", "Rechazar", "Rifiuta", "却下", "Ablehnen", "رفض", "拒绝", "Weigeren", "Recusar", "Avslå", "Отклонить", "Odrzuć", "거절")),
                    h("button", { type: "button", onClick: function () { traiterDemandeEc(dm, true); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "none", background: CH, color: NOIR, fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } }, T("Accepter", "Accept", "Aceptar", "Accetta", "承認", "Annehmen", "قبول", "接受", "Accepteren", "Aceitar", "Godkänn", "Принять", "Zaakceptuj", "수락"))));
          })));
  /* 20/10 (06 h 31) Blandine : la carte du challenge quitte les acces rapides et passe sous « Prochains evenements »,
     dans sa propre section « Evenements en cours » (titre et carte n apparaissent que si le club a un challenge visible). */
  var blocChal = h(CarteChallengesEcurie, { key: "chal", club: d.monClub, T: T, rtl: rtl, setEcran: setEcran,
    enveloppe: function (grille) { return section([h("div", { key: "chT" }, titreSection(T("\u00c9v\u00e9nements en cours", "Ongoing events", "Eventos en curso", "Eventi in corso", "\u958b\u50ac\u4e2d\u306e\u30a4\u30d9\u30f3\u30c8", "Laufende Veranstaltungen", "\u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0627\u0644\u062c\u0627\u0631\u064a\u0629", "正在进行的活动", "Lopende evenementen", "Eventos em andamento", "Pågående aktiviteter", "Текущие события", "Trwające wydarzenia", "진행 중인 이벤트"), null, null, null)), grille], 34); } });
  var blocEv = (evs === null || !listeEv.length) ? null : section([   /* (545) sans evenement, la section n apparait pas */
    titreSection(T("Prochains \u00e9v\u00e9nements", "Upcoming events", "Pr\u00f3ximos eventos", "Prossimi eventi", "\u4eca\u5f8c\u306e\u30a4\u30d9\u30f3\u30c8", "N\u00e4chste Termine", "\u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0627\u0644\u0642\u0627\u062f\u0645\u0629", "即将举行的活动", "Komende evenementen", "Próximos eventos", "Kommande aktiviteter", "Ближайшие события", "Nadchodzące wydarzenia", "다가오는 이벤트"), ouvrirAgenda, null, null),
    h("div", { key: "evh", style: { display: "flex", flexDirection: "column", gap: 14 } }, listeEv.map(carteEvH))
  ], 34);

  /* 26/10 (Blandine) : « affiche trois événements passés aussi » — les 3 plus récents ; « Voir tout » ouvre la page Événements passés */
  function ouvrirPasses() { try { window.__agendaClub = d.monClub || ""; } catch (e) { } setEcran("evenements-passes"); }
  var blocPasse = (!evsPasses || !evsPasses.length) ? null : section([
    titreSection(T("\u00c9v\u00e9nements pass\u00e9s", "Past events", "Eventos pasados", "Eventi passati", "\u904e\u53bb\u306e\u30a4\u30d9\u30f3\u30c8", "Vergangene Termine", "\u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0627\u0644\u0633\u0627\u0628\u0642\u0629", "往期活动", "Afgelopen evenementen", "Eventos passados", "Tidigare aktiviteter", "Прошедшие события", "Minione wydarzenia", "지난 이벤트"), ouvrirPasses, null, null),
    h("div", { key: "evp", style: { display: "flex", flexDirection: "column", gap: 14 } }, evsPasses.slice(0, 3).map(function (ev) { return carteEvH(ev, true); }))
  ], 34);

  /* ── 5. NOS CHEVAUX DE L'ÉCURIE (mosaïque validée ; s'adapte au nombre réel, aucune case factice) ── */
  var chx = d.chevauxClub || [];
  function ouvrirChevaux() { try { window.__ecurieHypeClub = String(d.monClub || "").trim() || null; } catch (e) { } setEcran("ecurie-hype"); }
  function carteCh(cv, i) {
    var nb = (d.liensClub && d.liensClub[cv.id] > 1) ? d.liensClub[cv.id] : 0;
    return h("button", { key: cv.id || ("c" + i), type: "button", onClick: function () { try { if (cv && cv.id) { window.__chevalOuvert = cv.id; setEcran("cheval"); } } catch (e) { } }, style: { position: "relative", display: "block", width: "100%", minWidth: 0, aspectRatio: "10 / 11", padding: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + BORD2, background: SURF, boxShadow: "0 12px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.09), inset 0 -14px 22px rgba(0,0,0,0.28)", cursor: "pointer" } },   /* (848) profondeur */   /* (562) un peu plus petits (4/5 avant) */
      cv.photo_url ? h("img", { src: cv.photo_url, alt: cv.nom || "", loading: "lazy", decoding: "async", className: "hps-f", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : h("img", { src: CHEVAL_DEFAUT, alt: cv.nom || "", loading: "lazy", decoding: "async", className: "hps-f", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "65% 28%", display: "block", opacity: 0.85 } }),   /* (1063) photo par defaut au lieu de l initiale */
      hypeVoileSoleil("ch"),   /* 23/10 effet photos du challenge */
      h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, bottom: 0, height: "58%", background: "linear-gradient(180deg, rgba(3,7,8,0) 0%, rgba(3,7,8,0.55) 45%, rgba(3,7,8,0.92) 100%)" } }),
      /* (541) nom : plus petit, casse d origine (plus de capitales forcees), 2 lignes max, marge interieure */
      h("div", { style: { position: "absolute", insetInlineStart: 9, insetInlineEnd: nb ? 36 : 9, bottom: 9, fontFamily: SERIF, fontSize: 13, fontWeight: 600, letterSpacing: 0.2, color: IV, lineHeight: 1.15, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "start" } }, cv.nom || ""),
      nb ? h("div", { "aria-label": nb + " " + T("cavaliers", "riders", "jinetes", "cavalieri", "ライダー", "Reiter", "فرسان", "名骑手", "ruiters", "cavaleiros", "ryttare", "всадников", "jeźdźców", "기수"), style: { position: "absolute", insetInlineEnd: 6, bottom: 6, width: 26, height: 29, clipPath: "polygon(50% 0%,93% 20%,100% 58%,74% 97%,50% 100%,26% 97%,0% 58%,7% 20%)", background: "rgba(3,7,8,0.88)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 } },
        svg([h("circle", { key: 1, cx: 12, cy: 8.5, r: 3.4 }), h("path", { key: 2, d: "M5.5 20c.7-3.6 3.3-5.6 6.5-5.6s5.8 2 6.5 5.6" })], 9, CH, 2),
        h("span", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 700, color: CH, lineHeight: 1 } }, String(nb))) : null);
  }
  var carteCentre = h("button", { key: "__centre", type: "button", onClick: ouvrirChevaux, style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", minWidth: 0, aspectRatio: "10 / 11", padding: 6, overflow: "hidden", borderRadius: 10, border: "1px solid " + BORD, background: SURF, cursor: "pointer", boxShadow: OMBRE } },
    h("span", { "aria-hidden": "true", style: { width: 26, height: 1, background: BORD } }),
    h("span", { style: { fontFamily: SERIF, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: IV, textAlign: "center", lineHeight: 1.2 } }, T("Les chevaux de l’écurie", "The stable’s horses", "Los caballos de la cuadra", "I cavalli della scuderia", "厩舎の馬", "Die Pferde des Stalls", "خيول الإسطبل", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말")),
    h("span", { style: { fontFamily: M, fontSize: 11.5, color: CH } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Показать все", "Zobacz wszystko", "전체 보기") + " " + FLECHE),
    h("span", { "aria-hidden": "true", style: { width: 34, height: 1, background: BORD } }));
  /* (565) ETATS VIDES (brief de Blandine) : responsable = invitation discrete avec action ; visiteur = une phrase. */
  var RESP = !!d.peutEditerBanniere;
  /* (566) maquette de Blandine : grand dessin de tete de cheval au trait (chevaux), icone dans un cadre teinte (souvenirs) */
  var TETE_CHEVAL = h("svg", { "aria-hidden": "true", viewBox: "0 0 64 64", width: 66, height: 66, fill: "none", stroke: CH, strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "0 0 auto", display: "block", opacity: 0.9, transform: rtl ? "scaleX(-1)" : "none" } },
    h("path", { d: "M12 60C13 40 15 26 22 12L24 4L28 11C36 14 44 24 50 34C53 38 55 41 53 44C51 46.5 47 46 44 44C40 42 37 41 34 43C31 45 29 50 28 60" }),
    h("path", { d: "M22 12C18 22 17 34 18 46" }), h("path", { d: "M49.5 40.5q1.5-.6 2.2.8" }), h("path", { d: "M47 45.3q-2-.9-4-.4" }), h("circle", { cx: 33, cy: 20, r: 1.1 }));
  function etatVide(ic, titre, sous, cta, onCta, txtVisiteur, variante) {
    /* 10/10 (852) Blandine : sur une ecurie sans cheval, l invitation (avec son bouton) s affiche pour TOUS
       (visiteurs des pages publiques /ecurie/... compris) ; les autres etats vides ne changent pas. */
    if (!RESP && variante !== "dessin") return h("div", { style: { padding: "2px 2px 0", fontFamily: M, fontSize: 12.5, fontStyle: "italic", lineHeight: 1.5, color: GR3, textAlign: "start" } }, txtVisiteur);
    return h("button", { type: "button", onClick: onCta, style: { display: "flex", alignItems: "center", gap: 14, width: "100%", minHeight: 86, padding: "14px 16px", boxSizing: "border-box", borderRadius: 12, border: "1px solid rgba(201,166,107,0.18)", background: SURF, textAlign: "start", cursor: "pointer", color: IV } },
      variante === "dessin" ? TETE_CHEVAL
        : variante === "cadre" ? h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 52, height: 52, borderRadius: 12, background: "rgba(201,166,107,0.08)", border: "1px solid rgba(201,166,107,0.16)", display: "flex", alignItems: "center", justifyContent: "center" } }, svg(ic, 24, CH, 1.1))
        : h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", width: 36, height: 36, borderRadius: "50%", border: "0.8px solid rgba(201,166,107,0.6)", display: "flex", alignItems: "center", justifyContent: "center" } }, svg(ic, 16, CH, 1.2)),
      h("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 } },
        h("span", { style: { fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.2, color: IV } }, titre),
        sous ? h("span", { style: variante === "dessin" ? { fontFamily: M, fontSize: 12.5, lineHeight: 1.55, color: GR2 } /* (852) texte plus long : plus lisible sur iPhone */ : { fontFamily: M, fontSize: 11.5, lineHeight: 1.4, color: GR3 } }, sous) : null,
        h("span", { style: { marginTop: variante === "dessin" ? 6 : 3, fontFamily: M, fontSize: 12, color: CH } }, cta + " \u203a")));
  }
  /* 10/10 (854) Blandine (choix 1A + 2A) : l invitation « Installer mon cheval » installe le cheval DANS l ecurie
     de la page (et y rattache le cavalier) ; un visiteur sans compte passe d abord par « Creer un compte »,
     puis la fenetre du cheval s ouvre toute seule (memo hype_installer_cheval, relu a la connexion). */
  function ajouterCheval() {
    var ecX = String(d.monClub || "").trim();
    if (d.visiteurG === true) {
      try { if (ecX) localStorage.setItem("hype_installer_cheval", JSON.stringify({ ecurie: ecX, t: Date.now() })); } catch (eMi) { }
      d.allerAuthG("inscription"); return;
    }
    try { if (ecX) { window.__creationChevalClub = ecX; window.__installerDansEcurie = ecX; } } catch (eCx) { }
    try { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); } catch (e) { }
  }
  var grille = (function () {
    if (d.chevauxClub === null) return vide("…");
    if (!chx.length) return etatVide(IC_ONG.chevaux,   /* 10/10 (852) textes de Blandine ; (853) ses traductions dans les 7 langues */
      T("Un box virtuel chez Hype\u00a0?", "A virtual stable on Hype?", "\u00bfUn box virtual en Hype?", "Un box virtuale su Hype?", "Hype\u306b\u611b\u99ac\u306e\u30d0\u30fc\u30c1\u30e3\u30eb\u99ac\u623f\u3092\uff1f", "Eine virtuelle Box bei Hype?", "\u0625\u0633\u0637\u0628\u0644 \u0627\u0641\u062a\u0631\u0627\u0636\u064a \u0639\u0644\u0649 Hype\u061f", "在 Hype 上有一个虚拟马房？", "Een virtuele box bij Hype?", "Uma baia virtual no Hype?", "En virtuell box hos Hype?", "Виртуальный денник в Hype?", "Wirtualny boks w Hype?", "Hype에 나만의 가상 마방이 있다면?"),
      T("Pas de paille \u00e0 faire ici\u00a0: juste la fiche de ton cheval, ses photos, ses concours, ses souvenirs et son suivi\u2026 et d\u2019autres cavaliers avec qui les partager. Th\u00e9orie, conseils et coach virtuel t\u2019accompagnent aussi dans ta progression.", "No mucking out here: just your horse\u2019s profile, photos, competitions, memories and care history\u2026 plus other riders to share them with. Theory, advice and our virtual coach also support your progress.", "Aqu\u00ed no hay que limpiar paja: solo la ficha de tu caballo, sus fotos, concursos, recuerdos y seguimiento\u2026 y otros jinetes con quienes compartirlo. La teor\u00eda, los consejos y nuestro coach virtual tambi\u00e9n te acompa\u00f1an en tu progreso.", "Qui niente paglia da rifare: solo la scheda del tuo cavallo, foto, gare, ricordi e cure\u2026 e altri cavalieri con cui condividerli. Teoria, consigli e il nostro coach virtuale ti accompagnano anche nei tuoi progressi.", "\u3053\u3053\u3067\u306f\u99ac\u623f\u6383\u9664\u306f\u4e0d\u8981\u3002\u611b\u99ac\u306e\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3001\u5199\u771f\u3001\u7af6\u6280\u3001\u601d\u3044\u51fa\u3001\u30b1\u30a2\u8a18\u9332\u3092\u307e\u3068\u3081\u3001\u307b\u304b\u306e\u30e9\u30a4\u30c0\u30fc\u3068\u3082\u5171\u6709\u3067\u304d\u307e\u3059\u3002\u7406\u8ad6\u3001\u30a2\u30c9\u30d0\u30a4\u30b9\u3001\u30d0\u30fc\u30c1\u30e3\u30eb\u30b3\u30fc\u30c1\u3082\u4e0a\u9054\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u307e\u3059\u3002", "Hier musst du keine Box ausmisten: nur das Profil deines Pferdes, Fotos, Turniere, Erinnerungen und Betreuung\u2026 und andere Reiter, mit denen du all das teilen kannst. Theorie, Tipps und unser virtueller Coach begleiten au\u00dferdem deinen Fortschritt.", "\u0644\u0627 \u062a\u0646\u0638\u064a\u0641 \u0644\u0644\u0642\u0634 \u0647\u0646\u0627: \u0641\u0642\u0637 \u0645\u0644\u0641 \u062d\u0635\u0627\u0646\u0643 \u0648\u0635\u0648\u0631\u0647 \u0648\u0645\u0633\u0627\u0628\u0642\u0627\u062a\u0647 \u0648\u0630\u0643\u0631\u064a\u0627\u062a\u0647 \u0648\u0645\u062a\u0627\u0628\u0639\u0629 \u0631\u0639\u0627\u064a\u062a\u0647\u2026 \u0648\u0645\u0639\u0643 \u0641\u0631\u0633\u0627\u0646 \u0622\u062e\u0631\u0648\u0646 \u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0643\u0644 \u0630\u0644\u0643. \u0643\u0645\u0627 \u062a\u0633\u0627\u0639\u062f\u0643 \u0627\u0644\u0646\u0638\u0631\u064a\u0629 \u0648\u0627\u0644\u0646\u0635\u0627\u0626\u062d \u0648\u0645\u062f\u0631\u0628\u0646\u0627 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a \u0639\u0644\u0649 \u062a\u0637\u0648\u064a\u0631 \u0645\u0633\u062a\u0648\u0627\u0643.", "这里不用铲马粪：只有你的马的档案、照片、比赛、回忆和护理记录……还有其他可以一起分享的骑手。理论、建议和虚拟教练也会陪你一起进步。", "Hier hoef je geen stro te scheppen: alleen het profiel van je paard, zijn foto’s, wedstrijden, herinneringen en verzorging… en andere ruiters om die mee te delen. Theorie, tips en een virtuele coach helpen je ook bij je vooruitgang.", "Aqui não tem baia para limpar: só a ficha do seu cavalo, as fotos, as competições, as lembranças e os cuidados… e outros cavaleiros para compartilhar tudo isso. Teoria, dicas e um coach virtual também ajudam você a evoluir.", "Ingen mockning här: bara din hästs profil, foton, tävlingar, minnen och hälsouppföljning… och andra ryttare att dela dem med. Teori, tips och en virtuell coach hjälper dig också att utvecklas.", "Навоз убирать не придётся: только карточка твоей лошади, её фото, соревнования, воспоминания и уход… и другие всадники, с которыми можно всем этим поделиться. Теория, советы и виртуальный тренер тоже помогут тебе прогрессировать.", "Żadnej słomy do wyrzucania: tylko karta Twojego konia, jego zdjęcia, zawody, wspomnienia i opieka… oraz inni jeźdźcy, z którymi możesz się tym dzielić. Teoria, porady i wirtualny trener też towarzyszą Ci w nauce.", "짚을 갈 필요는 없어요. 말의 프로필, 사진, 대회, 추억, 관리 기록만 있으면 돼요. 함께 나눌 다른 기수들도 만날 수 있어요. 이론, 조언, 가상 코치도 성장을 도와줘요."),
      T("Installer mon cheval", "Set up my horse", "Instalar mi caballo", "Inserisci il cavallo", "\u611b\u99ac\u3092\u8ffd\u52a0", "Pferd einrichten", "\u0623\u0636\u0641 \u062d\u0635\u0627\u0646\u064a", "安顿我的马", "Mijn paard toevoegen", "Instalar meu cavalo", "Flytta in min häst", "Добавить мою лошадь", "Zadomowię swojego konia", "내 말 등록하기"), ajouterCheval,
      null, "dessin");   /* (565) (566) */
    var cells;
    if (large) { cells = chx.slice(0, 7).map(carteCh).concat([carteCentre]); }   /* 10/10 (864) ordinateur : grande mosaique de 4 colonnes, 7 chevaux + « Voir tout » en 8e */
    else if (chx.length >= 8) { cells = chx.slice(0, 8).map(carteCh); cells.splice(4, 0, carteCentre); }
    else { cells = chx.map(carteCh).concat([carteCentre]); }
    var cols = large ? 4 : (chx.length <= 2 ? 2 : 3);
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + cols + ", minmax(0, 1fr))", gap: large ? 14 : 8 } }, cells);
  })();
  var nbCh = chx.length;
  /* 10/10 (835) Blandine (capture) : « j avais un bouton la pour changer d ecurie » — la bascule Feinn / SEP revient, juste
     au-dessus de « Nos chevaux de l ecurie », en plus du titre deroulant. Meme effet que lui (d.setClubForce). */
  var basculeEc = deuxEcuries ? h("div", { style: { display: "flex", justifyContent: "center", gap: 8, margin: "0 0 18px" } },
    [d.ecuriePrincipale, d.ecurieSecondaire].map(function (nE, iE) {
      var actE = d.clefClub(d.monClub) === d.clefClub(nE);
      return h("button", { key: "bec" + iE, type: "button", onClick: function () { d.setClubForce(iE === 0 ? null : nE); }, style: { maxWidth: "48%", minHeight: 40, padding: "8px 16px", borderRadius: 999, border: "1px solid " + (actE ? "rgba(201,166,107,0.55)" : "rgba(243,238,228,0.14)"), background: actE ? "linear-gradient(165deg,rgba(55,107,125,0.42) 0%,rgba(16,26,29,0.78) 55%,rgba(6,7,9,0.85) 100%)" : "rgba(255,255,255,0.03)", boxShadow: actE ? "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)" : "none", color: actE ? "#F3EEE4" : "rgba(243,238,228,0.6)", fontFamily: M, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer", WebkitAppearance: "none" } }, nE);
    })) : null;
  /* 10/10 (837) Blandine : plutot qu les deux pastilles du 835, « juste un petit bouton pour changer de Feinn a SEP », a cote du
     nombre de chevaux. Il montre l AUTRE ecurie (nom court : sigle entre parentheses, sinon sans « Ecurie »). */
  var autreEc = deuxEcuries ? ((d.clefClub(d.monClub) === d.clefClub(d.ecurieSecondaire)) ? d.ecuriePrincipale : d.ecurieSecondaire) : null;
  function courtEc(n) { var s = String(n || "").trim(); var mS = /\(([^)]+)\)\s*$/.exec(s); return mS ? mS[1] : s.replace(/^(\u00c9|E)curie\s+/i, ""); }
  var petitBascule = autreEc ? h("button", { type: "button", onClick: function () { d.setClubForce(autreEc === d.ecuriePrincipale ? null : autreEc); }, "aria-label": autreEc, style: { marginInlineStart: 10, padding: "3px 11px", minHeight: 28, borderRadius: 999, border: "1px solid rgba(201,166,107,0.5)", background: "linear-gradient(165deg,rgba(55,107,125,0.42) 0%,rgba(16,26,29,0.78) 55%,rgba(6,7,9,0.85) 100%)", color: "#F3EEE4", fontFamily: M, fontSize: 11.5, fontWeight: 600, cursor: "pointer", verticalAlign: "middle", WebkitAppearance: "none" } }, "\u21c4 " + courtEc(autreEc)) : null;
  var blocCh = section([
    titreSection(T("Nos chevaux de l’écurie", "Our stable’s horses", "Nuestros caballos", "I nostri cavalli", "厩舎の馬たち", "Unsere Pferde", "خيول إسطبلنا", "我们马厩的马", "De paarden van onze stal", "Os cavalos da nossa cocheira", "Våra stallhästar", "Наши лошади в конюшне", "Konie z naszej stajni", "우리 마구간의 말"), null,
      (nbCh || petitBascule) ? h(React.Fragment, null, nbCh ? (nbCh + " " + (nbCh > 1 ? T("chevaux", "horses", "caballos", "cavalli", "頭", "Pferde", "خيول", "匹马", "paarden", "cavalos", "hästar", "лошадей", "koni", "마리") : T("cheval", "horse", "caballo", "cavallo", "頭", "Pferd", "حصان", "马", "paard", "cavalo", "häst", "лошадь", "koń", "마리"))) : null, petitBascule) : null,   /* (837) + petit bouton de bascule */
      d.moiG ? h("button", { type: "button", onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 7, minHeight: 40, padding: "0 16px", borderRadius: 999, border: "1px solid " + BORD, background: "transparent", color: CH, fontFamily: M, fontSize: 13, cursor: "pointer" } }, h("span", { style: { fontSize: 17, lineHeight: 1 } }, "+"), T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가")) : null),
    grille
  ]);

  /* ── 6. DERNIERS RÉSULTATS (mêmes données que l'ancienne page, 3 au plus, carrousel) ── */
  function voirResultats() { try { window.__perfClub = d.monClub; } catch (e) { } setEcran("perf-concours"); }
  function carteRes(gr, iR, mode) {   /* (546) mode : "seul" (toute la ligne), "duo" (deux carres), "car" (carrousel) */
    var meilleur = (gr.places || []).slice().sort(function (a5, b5) { return (a5.rang || 99) - (b5.rang || 99); })[0] || {};
    var qui = meilleur.saisi ? (meilleur.cavalier || meilleur.cheval || "") : (meilleur.cavalier || (((d.membres || []).filter(function (p6) { return p6.id === meilleur.user_id; })[0] || {}).pseudo) || "");
    var infoCh = (meilleur.cheval_id && d.chevauxRail && d.chevauxRail[meilleur.cheval_id]) ? d.chevauxRail[meilleur.cheval_id] : null;
    var nomCh = (infoCh && infoCh.nom) || meilleur.cheval || "";
    var photo = (infoCh && infoCh.photo) || "";
    var rang = meilleur.rang ? (d.lg === "fr" ? (meilleur.rang === 1 ? "1er" : meilleur.rang + "e") : String(meilleur.rang) + ".") : "";
    var pt = mode === "car";   /* (563) Blandine : 3 resultats visibles sur la ligne -> cartes plus petites */
    var dateTxt = gr.d ? fmt(gr.d, { day: "numeric", month: "short", year: "numeric" }) : (gr.an || "");
    return h("button", { key: "rs" + iR, type: "button", onClick: voirResultats, style: { flex: pt ? "0 0 calc((100% - 20px) / 3)" : "1 1 auto", maxWidth: "none", width: mode === "car" ? undefined : "100%", height: pt ? 192 : undefined, /* (904) 164 -> 192, Blandine : « rallonge un peu les cartes » */   /* (558) un peu moins haute (240 avant) */ justifyContent: mode === "car" ? "flex-start" : "center", scrollSnapAlign: "start", minWidth: 0, overflow: "hidden",   /* (546) duo : hauteur selon le contenu (un vrai carre coupait le texte) */ boxSizing: "border-box", padding: pt ? "8px 7px 9px" : "10px 12px 11px", borderRadius: pt ? 14 : 20, background: "linear-gradient(165deg, rgba(40,74,86,0.55) 0%, " + SURF + " 45%, rgba(8,13,16,0.98) 100%)" /* (592) SURF ; (848) eclaire par le haut */, border: "1px solid " + BORD, boxShadow: "0 12px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.09), inset 0 -14px 22px rgba(0,0,0,0.28)" /* (848) profondeur */, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: IV } },   /* (540) largeur de l ancienne page ; (541) hauteur ajustee au contenu, carte entiere cliquable */
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" } },
        svg([h("path", { key: 1, d: "M8 4h8v5a4 4 0 0 1-8 0V4Zm0 1.5H5c0 2.6 1.3 3.9 3.3 4.2M16 5.5h3c0 2.6-1.3 3.9-3.3 4.2M12 13v3.5M9 20h6M10 16.5h4" })], pt ? 14 : 18, CH, 1.4),
        dateTxt ? h("span", { style: { fontFamily: M, fontSize: pt ? 7.5 : 9, letterSpacing: pt ? 0 : 0.3, textTransform: "uppercase", color: GR2, whiteSpace: "nowrap" } }, dateTxt) : null),
      photo ? h("img", { src: photo, alt: "", loading: "lazy", style: { width: pt ? 40 : 56, height: pt ? 40 : 56, flex: "0 0 auto", borderRadius: "50%", objectFit: "cover", margin: "6px auto 0", display: "block", border: "1px solid " + BORD } })
        : h("div", { "aria-hidden": "true", style: { width: pt ? 40 : 56, height: pt ? 40 : 56, flex: "0 0 auto", borderRadius: "50%", margin: "6px auto 0", border: "1px solid " + BORD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: pt ? 17 : 22, color: CH } }, String(nomCh || qui || "?").charAt(0).toUpperCase()),
      h("div", { dir: "auto", style: { marginTop: pt ? 6 : 8, width: "100%", fontFamily: M, fontSize: pt ? 9.5 : 11.5, lineHeight: 1.3, color: IV, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } },
        rang ? h("b", { style: { color: CH, fontWeight: 700 } }, rang + " ") : null, qui,
        nomCh ? h("span", { style: { color: GR2 } }, " " + T("sur", "on", "con", "su", "と", "auf", "على", "/", "van", "de", "av", "из", "z", "중") + " ") : null,
        nomCh ? h("span", { style: { color: CH } }, nomCh) : null),
      h("div", { dir: "auto", style: { marginTop: pt ? 5 : 7, width: "100%", fontFamily: SERIF, fontSize: pt ? 11.5 : 14, fontWeight: 600, lineHeight: 1.25, color: IV, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" } }, gr.concours || "—"),
      (gr.epreuve || gr.partants) ? h("div", { dir: "auto", style: { marginTop: 2, width: "100%", fontFamily: M, fontSize: pt ? 8.5 : 9.5, lineHeight: 1.3, color: GR2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" /* (904) l epreuve sur 2 lignes au lieu d etre coupee */ } }, [gr.epreuve || "", gr.partants ? ("/ " + gr.partants) : ""].filter(Boolean).join(" ")) : null,
      /* (545) comme l ancienne page : « + N autres classees » sur une ligne */
      (function () { var nA = Math.max(0, (gr.places || []).length - 1); if (!nA) return null;
        return h("div", { style: { marginTop: pt ? 5 : 7, paddingTop: pt ? 4 : 6, borderTop: "1px solid " + BORD2, width: "100%", fontFamily: M, fontSize: pt ? 8 : 9.5, color: GR3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
          "+ " + nA + " " + (nA === 1 ? T("autre class\u00e9e", "other placed", "otra clasificada", "altra classificata", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierung", "\u0645\u0635\u0646\u0641\u0629 \u0623\u062e\u0631\u0649", "位其他获得名次者", "andere geplaatste", "outra classificada", "annan placerad", "ещё одна призёрша", "inna sklasyfikowana", "명 더 순위권") : T("autres class\u00e9es", "others placed", "otras clasificadas", "altre classificate", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierungen", "\u0645\u0635\u0646\u0641\u0627\u062a \u0623\u062e\u0631\u064a\u0627\u062a", "位其他获得名次者", "andere geplaatsten", "outras classificadas", "andra placerade", "ещё призёрши", "inne sklasyfikowane", "명 더 순위권"))); })());
  }
  var res = (d.railClub || []).slice(0, 12);   /* (545) carrousel comme l ancienne page ; (546) 1 = toute la ligne, 2 = deux carres */
  var blocRes = (d.railClub == null || !res.length) ? null : section([   /* (546) Blandine : sans resultat, la section disparait */
    titreSection(T("Derniers r\u00e9sultats", "Latest results", "\u00daltimos resultados", "Ultimi risultati", "\u6700\u65b0\u306e\u7d50\u679c", "Neueste Ergebnisse", "\u0623\u062d\u062f\u062b \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "最近成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Ostatnie wyniki", "최근 결과"), voirResultats),
    res.length === 1 ? h("div", { key: "s", style: { display: "flex" } }, carteRes(res[0], 0, "seul"))
      : res.length === 2 ? h("div", { key: "d", style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 } }, res.map(function (gr, k) { return carteRes(gr, k, "duo"); }))
      : h("div", { key: "car", style: { display: "flex", alignItems: "stretch", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginInline: -16, paddingInline: 16, scrollPaddingInline: 16, paddingBottom: 6, scrollbarWidth: "none" }, "data-hscroll": "1" }, res.map(function (gr, k) { return carteRes(gr, k, "car"); }))   /* (545) cartes de l ancienne page : 46 %, 240 px de haut */
  ]);

  /* ── 7. ACTUALITÉS DE L'ÉCURIE (la publication la plus récente ; le fil complet par « Voir tout ») ── */
  function ouvrirFil() { d.ouvrirOnglet("actus"); }
  var blocActu = (function () {
    if (!post) return null;   /* (547) Blandine : s il n y a rien, la section n apparait pas */
    var corps;
    if (post === null) corps = vide("…");
    else if (!post) corps = vide(T("Aucune publication pour l’instant.", "No posts yet.", "Aún no hay publicaciones.", "Nessuna pubblicazione per ora.", "まだ投稿はありません。", "Noch keine Beiträge.", "لا توجد منشورات حاليا.", "暂时还没有发布。", "Nog geen berichten.", "Nenhuma publicação por enquanto.", "Inga inlägg ännu.", "Пока нет публикаций.", "Na razie brak publikacji.", "아직 게시물이 없어요."));
    var duo = post.length === 2;   /* (551) Blandine : les deux actualites sur la meme ligne, comme sa maquette */
    corps = h("div", { style: duo ? { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 } : { display: "flex", flexDirection: "column", gap: 10 } }, post.map(function (post, iPo) {
      var txt = String(post.texte || "").trim();
      var mP = txt.match(/^[^\n]*?[.!?\u2026](?=\s|$)/);
      var premiere = ((mP ? mP[0] : txt.split("\n")[0]) || "").trim();
      var titre = premiere.length > 60 ? (premiere.slice(0, 58).replace(/\s+\S*$/, "") + "…") : premiere;
      var reste = txt.slice(premiere.length).trim();
      var medias = [post.photo_url].concat(Array.isArray(post.medias) ? post.medias : []).filter(Boolean);
      var image = "";
      for (var iM = 0; iM < medias.length && !image; iM++) {
        var u = String(medias[iM]);
        if ((typeof hypeEstVideoMux === "function" && hypeEstVideoMux(u))) { image = (typeof hypeMuxVignette === "function") ? hypeMuxVignette(u) : ""; }
        else if (!(typeof estUrlVideo === "function" && estUrlVideo(u))) image = u;
      }
      var dateP = fmt(post.created_at, { day: "numeric", month: "short", year: "numeric" });
      var texte = h("div", { style: { flex: 1, minWidth: 0, position: "relative", padding: duo ? "9px 4px 9px 6px" : "18px 12px 18px 14px", minHeight: duo ? 0 : 150, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" } },
        dateP ? h("div", { style: { fontFamily: M, fontSize: duo ? 8.5 : 10.5, letterSpacing: duo ? 0.3 : 0.6, textTransform: "uppercase", color: GR2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, dateP) : null,
        titre ? h("div", { dir: "auto", style: { marginTop: duo ? 3 : 4, fontFamily: SERIF, fontSize: duo ? 13.5 : 17, lineHeight: 1.18, color: CH, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" } }, titre) : null,
        reste ? h("div", { dir: "auto", style: { marginTop: duo ? 3 : 4, fontFamily: M, fontSize: duo ? 10 : 12, lineHeight: 1.4, color: GR2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" } }, reste) : null);
      return h("button", { key: "po" + (post.id || iPo), type: "button", onClick: ouvrirFil, style: { display: "flex", alignItems: "stretch", width: "100%", padding: 0, textAlign: "start", background: SURF, border: "1px solid " + BORD, boxShadow: OMBRE, borderRadius: 14, overflow: "hidden", cursor: "pointer", color: IV, borderInlineStart: image ? ("1px solid " + BORD) : ("2px solid " + CH) } },
        image ? h("div", { style: { flex: duo ? "0 0 36%" : "0 0 40%", position: "relative", minHeight: duo ? 108 : 150 } },   /* (556) un peu plus haute */
          h("img", { src: image, alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
          /* (551) Blandine : « un fondu noir entre la photo et la partie avec le texte » */
          h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(16,29,34,0) 40%, rgba(16,29,34,0.75) 78%, " + SURF + " 100%)" } })) : null,
        texte,
        h("div", { style: { display: "flex", alignItems: "center", paddingInlineEnd: duo ? 6 : 12 } }, rondChevron(duo ? 20 : 28)));
    }));
    return section([titreSection(T("Actualités de l’écurie", "Stable news", "Novedades de la cuadra", "Novità della scuderia", "厩舎の活動", "Stall-Neuigkeiten", "أخبار الإسطبل", "马厩动态", "Nieuws van de stal", "Novidades da cocheira", "Stallnyheter", "Новости конюшни", "Aktualności ze stajni", "마구간 소식"), ouvrirFil), corps]);
  })();

  /* ── 8. SOUVENIRS (542, Blandine : « il manque en bas les souvenirs ») : photos du fil de l ecurie, 3 par ligne ;
     toucher = photo en grand ; « Voir tout » = la page Souvenirs existante. ── */
  /* (565) « FAITES VIVRE VOTRE ECURIE » : responsable seulement, une fois tout charge, tant que l ecurie n a pas
     au moins 1 cheval ET au moins 1 element parmi evenement / actualite / souvenir. Aucune donnee ecrite. */
  var blocVivre = (function () {
    if (!RESP) return null;
    if (d.chevauxClub == null || evs === null || post === null || souvFil === null) return null;
    var aCh = (d.chevauxClub || []).length > 0;
    var aAutre = ((evs || []).length > 0) || !!post || ((souv || []).length > 0);
    if (aCh && aAutre) return null;
    function ligne(k, ic, txt, fn) {
      return h("button", { key: k, type: "button", onClick: fn, style: { display: "flex", alignItems: "center", gap: 14, width: "100%", height: 46, padding: 0, border: "none", borderTop: "1px solid " + BORD2, background: "transparent", color: IV, textAlign: "start", cursor: "pointer" } },
        svg(ic, 21, CH, 1.15),   /* (566) icones plus grandes, comme la maquette */
        h("span", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 13, color: IV } }, txt),
        h("span", { "aria-hidden": "true", style: { color: CH, fontSize: 16 } }, rtl ? "\u2039" : "\u203a"));
    }
    return h("div", { style: { padding: "26px 16px 0" } },
      h("div", { style: { padding: "14px 16px 2px", borderRadius: 12, border: "1px solid rgba(201,166,107,0.18)", background: SURF } },
        h("div", { style: { fontFamily: SERIF, fontSize: 18, lineHeight: 1.2, color: IV } }, T("Faites vivre votre \u00e9curie", "Bring your stable to life", "Dale vida a tu cuadra", "Fate vivere la vostra scuderia", "\u53a9\u820e\u306b\u547d\u3092\u5439\u304d\u8fbc\u307f\u307e\u3057\u3087\u3046", "Erwecken Sie Ihren Stall zum Leben", "\u0623\u0636\u0641 \u0627\u0644\u062d\u064a\u0627\u0629 \u0625\u0644\u0649 \u0625\u0633\u0637\u0628\u0644\u0643", "让你的马厩热闹起来", "Breng jullie stal tot leven", "Deem vida à sua cocheira", "Väck ert stall till liv", "Оживи свою конюшню", "Ożyw swoją stajnię", "마구간을 활기차게 만들어 보세요")),
        h("div", { style: { marginTop: 3, marginBottom: 10, fontFamily: M, fontSize: 11.5, color: GR3 } }, T("Quelques \u00e9l\u00e9ments suffisent pour commencer.", "A few things are enough to get started.", "Unos pocos elementos bastan para empezar.", "Bastano pochi elementi per iniziare.", "\u59cb\u3081\u308b\u306b\u306f\u3044\u304f\u3064\u304b\u3067\u5341\u5206\u3067\u3059\u3002", "Ein paar Dinge reichen f\u00fcr den Anfang.", "\u0628\u0636\u0639\u0629 \u0639\u0646\u0627\u0635\u0631 \u062a\u0643\u0641\u064a \u0644\u0644\u0628\u062f\u0621.", "只需要几项内容就可以开始了。", "Een paar dingen zijn genoeg om te beginnen.", "Poucos itens já bastam para começar.", "Några få saker räcker för att komma igång.", "Достаточно нескольких вещей, чтобы начать.", "Wystarczy kilka rzeczy, żeby zacząć.", "몇 가지만 있으면 시작할 수 있어요.")),
        ligne("c", IC_ONG.chevaux, T("Ajouter un cheval", "Add a horse", "A\u00f1adir un caballo", "Aggiungi un cavallo", "\u99ac\u3092\u8ffd\u52a0", "Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646", "添加一匹马", "Een paard toevoegen", "Adicionar um cavalo", "Lägg till en häst", "Добавить лошадь", "Dodaj konia", "말 추가하기"), ajouterCheval),
        ligne("e", IC_ONG.agenda, T("Cr\u00e9er un \u00e9v\u00e9nement", "Create an event", "Crear un evento", "Crea un evento", "\u30a4\u30d9\u30f3\u30c8\u3092\u4f5c\u6210", "Termin erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0641\u0639\u0627\u0644\u064a\u0629", "创建活动", "Een evenement maken", "Criar um evento", "Skapa en aktivitet", "Создать событие", "Utwórz wydarzenie", "이벤트 만들기"), function () { try { if (pont.current && pont.current.peutCreer) { pont.current.ajouter(); return; } } catch (e) { } ouvrirAgenda(); }),
        ligne("a", IC_ONG.actus, T("Publier une actualit\u00e9", "Post some news", "Publicar una novedad", "Pubblica una novit\u00e0", "\u304a\u77e5\u3089\u305b\u3092\u6295\u7a3f", "Neuigkeit ver\u00f6ffentlichen", "\u0646\u0634\u0631 \u062e\u0628\u0631", "发布动态", "Nieuws plaatsen", "Publicar uma novidade", "Publicera en nyhet", "Опубликовать новость", "Opublikuj aktualność", "소식 올리기"), ouvrirFil)));
  })();

  var blocSouv = (function () {
    var corps;
    if (souv === null) corps = vide("\u2026");
    else if (!souv.length) corps = etatVide(IC_ONG.souvenirs,   /* (565) */
      T("Commencez l\u2019album de l\u2019\u00e9curie", "Start the stable\u2019s album", "Empiece el \u00e1lbum de la cuadra", "Iniziate l\u2019album della scuderia", "\u53a9\u820e\u306e\u30a2\u30eb\u30d0\u30e0\u3092\u59cb\u3081\u307e\u3057\u3087\u3046", "Beginnen Sie das Album des Stalls", "\u0627\u0628\u062f\u0623 \u0623\u0644\u0628\u0648\u0645 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "开始建立马厩相册", "Begin het album van de stal", "Comece o álbum da cocheira", "Starta stallets album", "Начни альбом конюшни", "Zacznijcie album stajni", "마구간 앨범을 시작해 보세요"),
      T("Les photos partag\u00e9es appara\u00eetront ici.", "Shared photos will appear here.", "Las fotos compartidas aparecer\u00e1n aqu\u00ed.", "Le foto condivise appariranno qui.", "\u5171\u6709\u3055\u308c\u305f\u5199\u771f\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Geteilte Fotos erscheinen hier.", "\u0633\u062a\u0638\u0647\u0631 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0634\u062a\u0631\u0643\u0629 \u0647\u0646\u0627.", "分享的照片会显示在这里。", "Gedeelde foto’s verschijnen hier.", "As fotos compartilhadas vão aparecer aqui.", "Delade foton visas här.", "Здесь появятся общие фото.", "Udostępnione zdjęcia pojawią się tutaj.", "공유한 사진이 여기에 나타나요."),
      T("Ajouter une photo", "Add a photo", "A\u00f1adir una foto", "Aggiungi una foto", "\u5199\u771f\u3092\u8ffd\u52a0", "Foto hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0635\u0648\u0631\u0629", "添加照片", "Een foto toevoegen", "Adicionar uma foto", "Lägg till ett foto", "Добавить фото", "Dodaj zdjęcie", "사진 추가하기"), function () { d.ouvrirOnglet("actus"); },
      T("Les souvenirs de l\u2019\u00e9curie appara\u00eetront ici.", "The stable\u2019s memories will appear here.", "Los recuerdos de la cuadra aparecer\u00e1n aqu\u00ed.", "I ricordi della scuderia appariranno qui.", "\u53a9\u820e\u306e\u601d\u3044\u51fa\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Die Erinnerungen des Stalls erscheinen hier.", "\u0633\u062a\u0638\u0647\u0631 \u0630\u0643\u0631\u064a\u0627\u062a \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0647\u0646\u0627.", "马厩的回忆会显示在这里。", "De herinneringen van de stal verschijnen hier.", "As lembranças da cocheira vão aparecer aqui.", "Stallets minnen visas här.", "Здесь появятся воспоминания конюшни.", "Wspomnienia ze stajni pojawią się tutaj.", "마구간의 추억이 여기에 나타나요."), "cadre");
    else {
      /* (557) CARROUSEL (brief de Blandine) : une grande carte paysage centree, les voisines depassent de chaque
         cote, glisser au doigt avec accroche, deux petites fleches rondes champagne, des points dessous.
         Pas de faux titre : seule la date reelle (publication / album) est posee en bas, discrete. */
      var estMux = function (u) { return (typeof hypeEstVideoMux === "function") && hypeEstVideoMux(u); };
      var estVid = function (u) { return estMux(u) || ((typeof estUrlVideo === "function") && estUrlVideo(u)); };
      var n = souv.length;
      var actif = Math.min(souvActif, n - 1);
      var pas = function () { var el = souvRail.current; if (!el) return 0; return el.clientWidth - 96 + 10; };   /* (561) marge de 48 de chaque cote */
      var aller = function (k) { var el = souvRail.current; if (!el) return; var k2 = Math.max(0, Math.min(n - 1, k)); try { el.scrollTo({ left: (rtl ? -1 : 1) * k2 * pas(), behavior: "smooth" }); } catch (e) { el.scrollLeft = (rtl ? -1 : 1) * k2 * pas(); } };
      var carteS = function (x, iS) {
        var u = x.u, vid = estVid(u);
        var src = estMux(u) ? ((typeof hypeMuxVignette === "function") ? hypeMuxVignette(u) : "") : (vid ? "" : ((typeof vignetteHype === "function") ? vignetteHype(u, 900, 600) : u));
        var dt = x.t ? fmt(new Date(x.t).toISOString().slice(0, 10), { day: "numeric", month: "short", year: "numeric" }) : "";
        return h("button", { key: "sv" + iS, type: "button", onClick: function () { setVisu((estMux(u) && typeof hypeMuxLecture === "function") ? hypeMuxLecture(u) : u); }, style: { position: "relative", flex: "0 0 100%", width: "100%", aspectRatio: "16 / 9", scrollSnapAlign: "center", padding: 0, borderRadius: 16, overflow: "hidden", border: "1px solid " + BORD2, background: SURF, cursor: "pointer", display: "block", opacity: (n > 1 && iS !== actif) ? 0.55 : 1, transition: "opacity .35s ease" } },
          src ? h("img", { src: src, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null,
          dt ? h("div", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, bottom: 0, height: "38%", background: "linear-gradient(180deg, rgba(3,7,8,0) 0%, rgba(3,7,8,0.72) 100%)" } }) : null,
          dt ? h("div", { style: { position: "absolute", insetInlineStart: 14, bottom: 11, fontFamily: M, fontSize: 10.5, letterSpacing: 0.8, textTransform: "uppercase", color: "rgba(243,238,228,0.88)" } }, dt) : null,
          vid ? h("span", { "aria-hidden": "true", style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(3,7,8,0.45)", border: "1px solid " + CH, color: CH, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, paddingInlineStart: 2, boxSizing: "border-box" } }, "\u25B6") : null);
      };
      var fleche = function (cote) {
        /* gauche / droite a l ecran (en arabe aussi) ; « suivant » = sens de lecture */
        var versFin = rtl ? (cote === "g") : (cote === "d");
        var off = versFin ? actif >= n - 1 : actif <= 0;
        return h("button", { key: "fl" + cote, type: "button", "aria-label": versFin ? T("Suivant", "Next", "Siguiente", "Successivo", "\u6b21\u3078", "Weiter", "\u0627\u0644\u062a\u0627\u0644\u064a", "下一步", "Volgende", "Próximo", "Nästa", "Далее", "Dalej", "다음") : T("Pr\u00e9c\u00e9dent", "Previous", "Anterior", "Precedente", "\u524d\u3078", "Zur\u00fcck", "\u0627\u0644\u0633\u0627\u0628\u0642", "上一个", "Vorige", "Anterior", "Föregående", "Назад", "Wstecz", "이전"), onClick: function () { aller(actif + (versFin ? 1 : -1)); }, style: { position: "absolute", top: "50%", transform: "translateY(-50%)", left: cote === "g" ? 6 : "auto", right: cote === "d" ? 6 : "auto", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.55)", background: "rgba(3,7,8,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", color: CH, display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: off ? "default" : "pointer", opacity: off ? 0.3 : 1, transition: "opacity .25s ease", zIndex: 2 } },
          svg([h("path", { key: 1, d: cote === "g" ? "M14.5 6l-6 6 6 6" : "M9.5 6l6 6-6 6" })], 15, CH, 1.4));
      };
      if (n === 1) corps = carteS(souv[0], 0);
      else corps = h("div", null,
        h("div", { style: { position: "relative", marginInline: -16 } },
          h("div", { ref: souvRail, "data-hscroll": "1", onScroll: function (e) { var p = pas(); if (!p) return; var k = Math.round(Math.abs(e.currentTarget.scrollLeft) / p); if (k !== souvActif) setSouvActif(k); }, style: { display: "flex", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingInline: 48, scrollPaddingInline: 48, scrollbarWidth: "none" } },   /* (561) photos un peu plus petites */
            souv.map(carteS)),
          fleche("g"), fleche("d")),
        h("div", { "aria-hidden": "true", style: { display: "flex", justifyContent: "center", gap: 6, marginTop: 14 } },
          souv.map(function (x, k) { return h("span", { key: "pt" + k, style: { width: k === actif ? 18 : 6, height: 4, borderRadius: 2, background: k === actif ? CH : "rgba(243,238,228,0.18)", transition: "width .3s ease, background .3s ease" } }); })));
    }
    return section([titreSection(T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "\u601d\u3044\u51fa", "Erinnerungen", "\u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억"), function () { d.ouvrirOnglet("souvenirs"); }), corps], 40);
  })();

  /* visiteur non connecté (même bandeau d'invitation que l'ancienne page) */
  var invite = d.visiteurG === true ? h("div", { style: { margin: "34px 16px 0" /* (1065) Blandine : « decolle un peu l encart du bas de la photo » (18 -> 34) */, padding: "16px", borderRadius: 14, border: "1px solid " + BORD, background: SURF } },
    h("div", { style: { fontFamily: SERIF, fontSize: 19, color: IV } }, T("Bienvenue sur Hype", "Welcome to Hype", "Te damos la bienvenida a Hype", "Benvenuto su Hype", "Hypeへようこそ", "Willkommen bei Hype", "مرحبا بك في Hype", "欢迎来到 Hype", "Welkom bij Hype", "Bem-vindo ao Hype", "Välkommen till Hype", "Добро пожаловать в Hype", "Witaj w Hype", "Hype에 오신 걸 환영해요")),
    /* 10/10 (861) VITRINE (Blandine : les pages d ecurie restent visibles sur Google mais « inaccessibles sans compte ») :
       quelques chiffres, sans le detail, et l invitation a creer un compte. */
    (function () {
      var nC = (d.chevauxClub || []).length, nR = (evs || []).length, bouts = [];
      if (nC) bouts.push(nC + " " + (nC > 1 ? T("chevaux", "horses", "caballos", "cavalli", "頭の馬", "Pferde", "خيول", "匹马", "paarden", "cavalos", "hästar", "лошадей", "koni", "마리") : T("cheval", "horse", "caballo", "cavallo", "頭の馬", "Pferd", "حصان", "马", "paard", "cavalo", "häst", "лошадь", "koń", "마리")));
      if (nR) bouts.push(nR + " " + (nR > 1 ? T("rendez-vous à venir", "upcoming events", "próximos eventos", "eventi in arrivo", "件の予定", "anstehende Termine", "مواعيد قادمة", "即将到来的活动", "komende afspraken", "próximos compromissos", "kommande aktiviteter", "предстоящих встреч", "nadchodzące wydarzenia", "다가오는 일정") : T("rendez-vous à venir", "upcoming event", "próximo evento", "evento in arrivo", "件の予定", "anstehender Termin", "موعد قادم", "即将到来的活动", "komende afspraak", "próximo compromisso", "kommande aktiviteter", "предстоящих встреч", "nadchodzące wydarzenia", "다가오는 일정")));
      return h("div", { style: { marginTop: 6, fontFamily: M, fontSize: 12.5, lineHeight: 1.55, color: GR2 } },
        bouts.length ? h("div", { style: { color: CH, marginBottom: 3 } }, bouts.join(" · ")) : null,
        T("Crée ton compte pour découvrir ses chevaux, ses résultats et son agenda.", "Create your account to discover its horses, results and calendar.", "Crea tu cuenta para descubrir sus caballos, sus resultados y su agenda.", "Crea il tuo account per scoprire i suoi cavalli, i risultati e il calendario.", "アカウントを作成して、馬・成績・予定をチェックしよう。", "Erstelle dein Konto, um seine Pferde, Ergebnisse und Termine zu entdecken.", "أنشئ حسابك لاكتشاف خيوله ونتائجه ومواعيده.", "创建你的账户，来发现它的马匹、成绩和日程。", "Maak je account aan om de paarden, resultaten en agenda te ontdekken.", "Crie sua conta para conhecer os cavalos, os resultados e a agenda.", "Skapa ditt konto för att upptäcka dess hästar, resultat och kalender.", "Создай аккаунт, чтобы узнать о её лошадях, результатах и расписании.", "Załóż konto, żeby odkryć jej konie, wyniki i kalendarz.", "계정을 만들면 이곳의 말, 결과, 일정을 만나볼 수 있어요."));
    })(),
    h("div", { style: { display: "flex", gap: 10, marginTop: 12 } },
      h("button", { type: "button", onClick: function () { d.allerAuthG("connexion"); }, style: { flex: 1, minHeight: 44, borderRadius: 999, border: "1px solid " + BORD, background: "transparent", color: IV, fontFamily: M, fontSize: 13, cursor: "pointer" } }, T("Se connecter", "Sign in", "Iniciar sesión", "Accedi", "ログイン", "Anmelden", "تسجيل الدخول", "登录", "Inloggen", "Entrar", "Logga in", "Войти", "Zaloguj się", "로그인")),
      h("button", { type: "button", onClick: function () { d.allerAuthG("inscription"); }, style: { flex: 1, minHeight: 44, borderRadius: 999, border: "1px solid " + CH, background: "rgba(201,166,107,0.10)", color: CH, fontFamily: M, fontSize: 13, fontWeight: 700, cursor: "pointer" } /* (1065) plus de fond dore plein : contour champagne */ }, T("Créer un compte", "Create an account", "Crear una cuenta", "Crea un account", "アカウントを作成", "Konto erstellen", "إنشاء حساب", "创建账户", "Account aanmaken", "Criar uma conta", "Skapa konto", "Создать аккаунт", "Załóż konto", "계정 만들기")))) : null;

  /* (541) bas de page : la barre du bas a deja sa place reservee par l appli ; on ne garde que 32 px apres le dernier bloc */
  /* 12/10 (1059) - Blandine (21 h 44) : « je voulais qu il ne soit plus fixe, qu il redevienne normal, car on lisait mal sinon ».
     Le fond n est plus FIXE : il est pose en haut de la page (hauteur d un ecran) et defile avec elle, comme un bandeau normal.
     Meme image, meme placement (portrait sur le cote, paysage en largeur), meme degrade vers le noir. Le texte ne passe plus
     par-dessus la photo en defilant. */
  var fondFixeEc = couv ? h("div", { key: "fond:" + couv, className: "ev2-fond", "aria-hidden": "true", style: { position: "absolute", top: 0, height: "100vh", left: 0, right: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden", transform: "translateZ(0)", WebkitTransform: "translateZ(0)" } },
    h("img", { src: couv, alt: "", decoding: "async",
      onLoad: function (eB) { try {
        var im = eB.currentTarget, lay = im.parentElement; if (!im || !lay || !im.naturalWidth || !im.naturalHeight) { if (im) im.style.opacity = "1"; return; }
        var rI = im.naturalWidth / im.naturalHeight, W = lay.clientWidth || window.innerWidth || 390, Hv = window.innerHeight || 800;
        var Hh = large ? Hv : Math.round(Hv * 0.6);   /* hauteur reservee a la photo : tout l ecran sur tablette/ordinateur, 60 % sur iPhone */
        var ban = document.querySelector(".ecurie-v2 .ecurie-v2-bandeau");
        if (rI < W / Hh) {   /* verticale : entiere, calee sur le cote, bord interieur fondu */
          var cote = "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", transparent 0%, #000 34%)";
          Object.assign(im.style, { top: "0", height: Hh + "px", width: "auto", left: rtl ? "0" : "auto", right: rtl ? "auto" : "0", WebkitMaskImage: cote, maskImage: cote });
          if (!large && ban) { var hB = Math.max(ban.clientHeight, Hh - 10); ban.style.height = hB + "px"; }
          if (large && ban) { var hBl = Math.max(ban.clientHeight, Math.round(Hv * 0.64)); ban.style.height = hBl + "px"; }   /* (1049) tablette / ordinateur : le nom de l ecurie passe sous la tete du cheval, la citation ne la recouvre plus */
        } else {
          /* (1050) Blandine (capture 18 h 48) : « elle ne se met toujours pas en fond de page » -> une photo horizontale doit
             aussi remplir le haut de page comme un vrai fond : elle couvre la zone reservee (60 % de l ecran sur iPhone, 64 % sur
             tablette/ordinateur), centree ; seuls les bords gauche et droit peuvent etre rognes, jamais le haut ni le bas. */
          var Hz = large ? Math.round(Hv * 0.64) : Hh;
          var hNat = Math.round(W / rI);
          if (hNat >= Hz) Object.assign(im.style, { top: "0", left: "0", right: "0", width: "100%", height: "auto" });
          else Object.assign(im.style, { top: "0", left: "0", right: "0", width: "100%", height: Hz + "px", objectFit: "cover", objectPosition: "center center" });
          if (ban) { var hBz = Math.max(ban.clientHeight, Math.min(Math.max(hNat, Hz), Math.round(Hv * 0.75)) - 10); ban.style.height = hBz + "px"; }
        }
        im.style.opacity = "1";
      } catch (eL) { try { eB.currentTarget.style.opacity = "1"; } catch (e2) { } } },
      onError: function (eE) { try { eE.currentTarget.style.opacity = "1"; } catch (e3) { } },
      style: { position: "absolute", top: 0, left: 0, width: "100%", height: "60vh", objectFit: "cover", display: "block", maxWidth: "none", opacity: 0, transition: "opacity .25s ease", transform: "none" } }),
    h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,9,0.25) 0%, rgba(5,8,9,0.02) 16%, rgba(5,8,9,0.12) " + (large ? "55%" : "42%") + ", rgba(5,8,9,0.85) " + (large ? "84%" : "60%") + ", " + NOIR + " " + (large ? "96%" : "70%") + ")" } }),
    h("div", { ref: refNuitEc, style: { position: "absolute", inset: 0, opacity: 0, background: "rgba(5,8,9,0.72)", willChange: "opacity" } })) : null;
  return h("div", { className: "ecurie-v2", dir: rtl ? "rtl" : undefined, style: { position: "relative" /* (1059) le fond defile avec la page */, isolation: "isolate" /* (1046) le fond fixe passe sous le contenu */, background: "radial-gradient(circle at 85% 8%, rgba(56,100,116,0.13), transparent 32%), linear-gradient(180deg, #06090B 0%, #050708 100%)" /* (662) halo froid tres discret, noir bleute */, color: IV, paddingBottom: 0, overflowX: "hidden" } },   /* (573) la place de la barre du bas est reservee par une vraie cale en fin de page */   /* (547) Blandine : « decolle du bas de page les souvenirs » */
    h("style", null, HYPE_PH_SOLEIL_CSS + ".ecurie-v2 .ev2-resev{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);column-gap:12px;align-items:start}@media (max-width:1279px){.ecurie-v2 .ev2-resev{grid-template-columns:minmax(0,1fr)}}" /* (865) */ + "@media (hover: hover) and (min-width: 1024px){.ecurie-v2 .ev2-tuile{transition:transform .18s ease, filter .18s ease}.ecurie-v2 .ev2-tuile:hover{transform:translateY(-3px);filter:brightness(1.12)}}" /* (864) survol sur ordinateur */ + ".ecurie-v2 .ecurie-v2-onglets::-webkit-scrollbar,.ecurie-v2 .ecurie-v2-car::-webkit-scrollbar{display:none}.ecurie-v2 .ecurie-v2-onglets,.ecurie-v2 .ecurie-v2-car{scrollbar-width:none}.ecurie-v2 button:disabled{opacity:1}"),
    (typeof HypeDrapeauLangue === "function") ? h(HypeDrapeauLangue, { right: 64 }) : null,
    (typeof HypeBoutonPartagerPage === "function") ? h(HypeBoutonPartagerPage, { right: 110, obtenir: function () { return nom ? { fam: "eg", val: nom, titre: nom } : null; } }) : null,
    fondFixeEc,
    bandeau,
    lienDemandes,   /* (867) moderatrices : demandes d ecuries en attente */
    /* (859) ORDINATEUR : deux colonnes sous la photo — a gauche acces rapides, chevaux, resultats ; a droite (qui reste
       visible en defilant) l invitation, la citation et les prochains evenements. TELEPHONE : l ordre d avant, inchange. */
    /* 10/10 (861) VITRINE pour un visiteur SANS COMPTE : photo, nom, ville, invitation (chiffres + creer un compte), citation,
       « Contacter l ecurie », et l invitation « Un box virtuel » seulement si l ecurie n a aucun cheval. Pas d acces rapides,
       ni chevaux, ni resultats, ni agenda (reserves aux personnes connectees). Connecte : la page complete, inchangee. */
    (d.visiteurG === true) ? (large
      ? h("div", { key: "ev2-vitrine-large", style: { padding: "0 24px", boxSizing: "content-box", maxWidth: menuFondEc ? 1120 : undefined, margin: "0 auto" } /* 19/10 etape A */ },   /* (863) une seule colonne (maquette validee) */
          h("div", { style: { maxWidth: 820, margin: "0 auto" } }, invite), citation, (d.chevauxClub && !d.chevauxClub.length) ? blocCh : null, blocContact, lienReclamer)
      : h(React.Fragment, { key: "ev2-vitrine" }, invite, citation, (d.chevauxClub && !d.chevauxClub.length) ? blocCh : null, blocContact, lienReclamer))
    :     /* (863) ORDINATEUR, etape 2 (maquette validee) : UNE colonne qui se deroule (plus de colonne collante a droite) */
    large ? h("div", { key: "ev2-large", style: { padding: "0 24px", boxSizing: "content-box", maxWidth: menuFondEc ? 1120 : undefined, margin: "0 auto" } /* 19/10 etape A */ },
      invite ? h("div", { style: { maxWidth: 820, margin: "0 auto" } }, invite) : null, blocGroupes, citation, onglets, blocVivre, blocCh,
      /* (865) etape 5 : derniers resultats (a gauche) et prochains evenements (a droite) cote a cote, comme sur la maquette ;
         en dessous de 1 280 px de large, l un sous l autre (classe ev2-resev) */
      (blocRes && blocEv) ? h("div", { className: "ev2-resev" }, h("div", { style: { minWidth: 0 } }, blocRes), h("div", { style: { minWidth: 0 } }, blocEv)) : h(React.Fragment, null, blocRes, blocEv),
      blocPasse,   /* 26/10 : 3 evenements passes */
      blocChal,   /* 20/10 « Evenements en cours » (challenge) sous les prochains evenements */
      blocContact, lienReclamer)
    : h(React.Fragment, { key: "ev2-tel" },
    invite,
    blocGroupes,   /* 22/10 : groupes de l ecurie, sous l en-tete */
    citation,
    onglets,   /* (554) Blandine : la citation au-dessus des acces rapides */
    blocVivre,   /* (565) */
    blocCh,
    blocRes,
    blocEv,   /* (548) sous les chevaux ; (550) Blandine : puis sous les resultats */
    blocPasse,   /* 26/10 : 3 evenements passes */
    blocChal,   /* 20/10 « Evenements en cours » (challenge) sous les prochains evenements */
    blocContact,   /* (861) */
    lienReclamer),   /* (866) */
    /* (589) Blandine : « retire la partie actualites de l ecurie ». Le code de blocActu est garde (remettre
       `blocActu,` ici pour le faire revenir) ; l acces rapide « Actualites » en haut de page ouvre toujours le fil. */
    /* (571) Blandine (proposition 3 « signature minimaliste ») : la page s eteint dans un paysage fondu + signature HYPE.
       Pas de carte, pas de bouton, pas d ombre. Image = fichier images/ecurie-fin-de-page.webp (jamais de base64). */
    h("div", { key: "fin", "aria-hidden": "true", style: { paddingTop: 64 } },   /* (574) plus d air au-dessus (34 avant) */
      h("div", { style: { position: "relative", height: large ? (menuFondEc ? 180 : 150) : 118 /* 19/10 etape A */, overflow: "hidden" } },
        h("img", { src: "images/ecurie-fin-de-page-2.webp" /* (572) vraie photo de Blandine */, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, " + NOIR + " 0%, rgba(3,7,8,0) 12%, rgba(3,7,8,0) 88%, " + NOIR + " 100%)" } })),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "6px 24px 0" } },
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + (rtl ? "270deg" : "90deg") + ", rgba(201,166,107,0), rgba(201,166,107,0.55))" } }),
        h("span", { dir: "ltr", style: { fontFamily: SERIF, fontSize: 13, letterSpacing: 4, paddingInlineStart: 4, color: CH } }, "HYPE"),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + (rtl ? "90deg" : "270deg") + ", rgba(201,166,107,0), rgba(201,166,107,0.55))" } }))),
    /* (573) sa capture : « HYPE » passait SOUS la barre du bas -> cale reelle = barre (84 px + encoche) + 26 px d air */
    h("div", { key: "cale", "aria-hidden": "true", style: { flex: "0 0 auto", height: "calc(env(safe-area-inset-bottom) + 64px)" } }),   /* (575) sa capture 574 : ~146 px vides sous HYPE, trop -> environ 64 px visibles, comme au-dessus de la photo */
    /* (569) Blandine : bloc Souvenirs retire de la page (il a son acces rapide en haut). Code garde : remettre blocSouv ici. */
    feuille,
    feuilleReclam,   /* (866) */
    feuilleDemandes,   /* (867) */
    feuilleContact,   /* (868) */
    (visu && typeof hypeCalquePhoto === "function") ? hypeCalquePhoto(visu, function () { setVisu(null); }) : null,
    /* l'agenda du club, INVISIBLE : données des 2 événements + fiche d'un rendez-vous / formulaire d'ajout (calques fixes) */
    h("div", { style: { height: 0, overflow: "hidden" } },
      (typeof AgendaClubHype === "function") ? h(AgendaClubHype, { nomClub: d.monClub, moiG: d.moiG, pont: pont, onEvs: function (l) { setEvs(l); } }) : null));
}
window.HypeEcurieV2 = { EcurieV2: EcranEcurieV2 };
})();
