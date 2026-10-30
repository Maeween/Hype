/* HYPE ▸ 30/10/2026 — Page ÉCURIE HYPE (EcranEcurieHype), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~65 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranEcurieHype() {
  var h = React.createElement;
  var ctx = useApp();
  var setEcran = ctx.setEcran, tr = ctx.tr;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var _sel = React.useState(null), legSel = _sel[0], setLegSel = _sel[1];
  var _tab = React.useState("infos"), fTab = _tab[0], setFTab = _tab[1];
  var _com = React.useState(null), commList = _com[0], setCommList = _com[1];
  var _pro = React.useState({}), proprios = _pro[0], setProprios = _pro[1];
  var _moi = React.useState(null), moiEH = _moi[0], setMoiEH = _moi[1];
  var _sui = React.useState({}), suivis = _sui[0], setSuivis = _sui[1];
  var _tst = React.useState(null), toastEH = _tst[0], setToastEH = _tst[1];
  var _cpt = React.useState([0, 0]), cptEH = _cpt[0], setCptEH = _cpt[1];
  /* 29/08 : « Les albums de l'ecurie » (demande Blandine) — albums PUBLICS des
     chevaux affiches sur cette page, en bas de l'ecran. Charges dans le meme
     useEffect que les chevaux, une fois qu'on connait leurs identifiants. */
  var _alb = React.useState([]), albumsEH = _alb[0], setAlbumsEH = _alb[1];
  var _pss = React.useState(function () { var l = []; for (var iP = 0; iP < 14; iP++) { l.push({ g: 8 + Math.random() * 84, h: 18 + Math.random() * 66, t: 1.6 + Math.random() * 2.2, o: (0.25 + Math.random() * 0.5).toFixed(2), dx: Math.round(Math.random() * 46 - 23), dy: -Math.round(26 + Math.random() * 48), du: (7 + Math.random() * 9).toFixed(1), de: (Math.random() * 8).toFixed(1) }); } return l; }), poussEH = _pss[0];
  var refHeroEH = React.useRef(null);
  React.useEffect(function () {
    var t0 = null, brut = null;
    /* 29/08 : les compteurs animaient vers 7 et 1 CODES EN DUR, en accord avec
       l'ancienne vitrine figee. Ils comptent desormais les vrais chevaux charges.
       Un poney est identifie par sa race (contient « poney » / « pony »), a defaut
       de champ dedie en base. */
    var listeCpt = commList || [];
    var nbPoneyEH = listeCpt.filter(function (c) { return hypeEstPoney(c && c.race, c && c.origines); }).length;   /* (841) meme regle que l onglet « Tous les poneys » */
    var nbChevalEH = listeCpt.length - nbPoneyEH;
    function tick(t) { if (t0 === null) t0 = t; var p = Math.min(1, (t - t0 - 900) / 1100); if (p >= 0) { var e2 = 1 - Math.pow(1 - p, 3); setCptEH([Math.round(nbChevalEH * e2), Math.round(nbPoneyEH * e2)]); } if (p < 1) brut = requestAnimationFrame(tick); }
    brut = requestAnimationFrame(tick);
    function surScrollEH() { try { var y = window.scrollY || 0; if (refHeroEH.current) refHeroEH.current.style.transform = "scale(1.12) translateY(" + Math.min(60, y * 0.28) + "px)"; } catch (eS) { } }
    window.addEventListener("scroll", surScrollEH, { passive: true });
    return function () { if (brut) cancelAnimationFrame(brut); window.removeEventListener("scroll", surScrollEH); };
  }, [commList]);
  function hexAEH(hx, a) { var n = parseInt(hx.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
  function flashEH(msg) { setToastEH(msg); setTimeout(function () { setToastEH(null); }, 2200); }

  /* 28/08 (demande Blandine : « assure-toi que tous les chevaux de l'ecurie
     apparaissent sur Ecurie Hype ») -- cet ecran montrait par defaut la
     galerie GLOBALE (chevaux avec partage_ecurie_hype = true, opt-in par
     cheval, tous clubs confondus), pas le roster d'un club precis. Quand on y
     arrive via le bouton "Voir les X chevaux" de la page Club, celle-ci pose
     window.__ecurieHypeClub AVANT de naviguer ici : on l'utilise pour
     remplacer la requete par TOUS les chevaux de ce club (meme logique
     d'appartenance que la page Club : profiles.ecurie/ecurie2 ILIKE),
     independamment du partage individuel. Sans ce contexte (autres points
     d'entree), le comportement d'origine -- galerie globale -- est inchange. */
  var clubCtxEH = React.useState(function () { try { var v = window.__ecurieHypeClub || null; window.__ecurieHypeClub = null; if (v) { window.__ecurieHypeCourante = v; hypeMemEc("chevaux", v); return v; } return window.__ecurieHypeCourante || hypeMemEc("chevaux") || window.__hypeEcurieCourante || hypeMemEc("courante") || null;   /* (836) + memoire du telephone */   /* 10/10 (808) mémoire PROPRE à cette page : ouvrir les chevaux d'une autre écurie ne change plus l'écurie de la page Écurie */ } catch (eCtx) { return null; } })[0];   /* (792) sans écurie transmise : la dernière choisie */
  /* 10/10 (787) PIQUETS : écurie de la page (clé exacte + droit de gestion), piquets et leurs chevaux, onglet actif, feuille de création. */
  var _pqC = React.useState(null), piqClub = _pqC[0], setPiqClub = _pqC[1];
  var _pqL = React.useState([]), piquets = _pqL[0], setPiquets = _pqL[1];
  var _pqE = React.useState([]), equipesEc = _pqE[0], setEquipesEc = _pqE[1];   /* (796) Teams de l'écurie + leurs chevaux, pour la passerelle « Découvrir la Team » */
  var _pqA = React.useState(function () { try { var pI = window.__ecurieHypePiquet || null; window.__ecurieHypePiquet = null; if (pI) return pI; var mP = hypeMemEc("piquet"); return (mP && mP.club && clubCtxEH && String(mP.club).toLowerCase().trim() === String(clubCtxEH).toLowerCase().trim()) ? (mP.id || null) : null; } catch (ePi) { return null; } }), piqActif = _pqA[0], setPiqActif = _pqA[1];
  React.useEffect(function () { hypeMemEc("piquet", piqActif ? { club: clubCtxEH || "", id: piqActif } : null); }, [piqActif]);   /* (836) le piquet ouvert est garde (meme ecurie seulement) */   /* (795) piquet ouvert depuis une fiche cheval */
  var _pqF = React.useState(false), piqFeuille = _pqF[0], setPiqFeuille = _pqF[1];
  var _pqV = React.useState(0), piqVersion = _pqV[0], setPiqVersion = _pqV[1];
  var _pqG = React.useState(false), piqGestion = _pqG[0], setPiqGestion = _pqG[1];   /* (789) feuille « Gérer les chevaux » */
  React.useEffect(function () { var okP = true; (async function () {
    try {
      if (typeof supa === "undefined" || !supa) return;
      var uP = await utilisateurActuel();
      var nomP = clubCtxEH;
      if (!nomP && uP) { var rpP = await supa.from("profiles").select("ecurie, ecurie2").eq("id", uP.id).maybeSingle(); if (rpP && rpP.data) nomP = rpP.data.ecurie || rpP.data.ecurie2 || null; }
      if (!nomP) return;
      var clefP = hypeClefClubPiquets(nomP);
      var gereP = false;
      try { gereP = !!(uP && typeof clubRevendiquePar === "function" && clubRevendiquePar(nomP, uP)); } catch (eRv) { }
      if (!gereP && uP) { var rgP = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", clefP).eq("user_id", uP.id).limit(1); gereP = !!(rgP && rgP.data && rgP.data.length); }
      if (okP) setPiqClub({ nom: nomP, clef: clefP, gere: gereP });
      var rG = await supa.from("groupes").select("id, nom, discipline, niveau, type, ordre, cree_le, saison, photo_url").eq("club_clef", clefP).eq("nature", "piquet").order("cree_le", { ascending: true });
      if (rG && rG.error) rG = await supa.from("groupes").select("id, nom, discipline, niveau, type, ordre, cree_le").eq("club_clef", clefP).eq("nature", "piquet").order("cree_le", { ascending: true });
      var gs = (rG && !rG.error && rG.data) || [];
      var parG = {}, parM = {};
      if (gs.length) {
        var rGC = await supa.from("groupes_chevaux").select("groupe_id, cheval_id").in("groupe_id", gs.map(function (g) { return g.id; }));
        ((rGC && !rGC.error && rGC.data) || []).forEach(function (x) { (parG[x.groupe_id] = parG[x.groupe_id] || []).push(x.cheval_id); });
        /* 21/10 : les cavaliers du groupe (même table que la Team) */
        try { var rGM = await supa.from("groupes_membres").select("groupe_id, user_id").in("groupe_id", gs.map(function (g) { return g.id; })); ((rGM && !rGM.error && rGM.data) || []).forEach(function (x) { (parM[x.groupe_id] = parM[x.groupe_id] || []).push(x.user_id); }); } catch (eGM) { }
      }
      if (okP) setPiquets(gs.map(function (g) { return Object.assign({}, g, { ids: parG[g.id] || [], membres: parM[g.id] || [] }); }));
      try {   /* (796) les Teams de la même écurie (jamais montrées comme piquets) */
        var rEq = await supa.from("groupes").select("id, nom").eq("club_clef", clefP).eq("nature", "equipe");
        var eqs = (rEq && !rEq.error && rEq.data) || [];
        var parE = {};
        if (eqs.length) {
          var rEqC = await supa.from("groupes_chevaux").select("groupe_id, cheval_id").in("groupe_id", eqs.map(function (e) { return e.id; }));
          ((rEqC && !rEqC.error && rEqC.data) || []).forEach(function (x) { (parE[x.groupe_id] = parE[x.groupe_id] || []).push(x.cheval_id); });
        }
        if (okP) setEquipesEc(eqs.map(function (e) { return Object.assign({}, e, { ids: parE[e.id] || [] }); }));
      } catch (eEq) { }
    } catch (ePq) { }
  })(); return function () { okP = false; }; }, [piqVersion]);
  React.useEffect(function () { var ok = true; (async function () {
    try {
      var u = await utilisateurActuel(); if (ok) setMoiEH(u || null);
      if (typeof supa !== "undefined" && supa) {
        try {
          var rc;
          if (clubCtxEH) {
            var idsMembresEH = [];
            var motifEH = (typeof motifEcurie === "function") ? motifEcurie(clubCtxEH) : ("%" + (((typeof noyauEcurie === "function") && noyauEcurie(clubCtxEH)) || clubCtxEH) + "%");
            var mmEH = [];
            try { var rmEH1 = await supa.from("profiles").select("id").ilike("ecurie", motifEH).limit(200); if (rmEH1 && rmEH1.data) mmEH = mmEH.concat(rmEH1.data); } catch (eMEH1) { }
            try { var rmEH2 = await supa.from("profiles").select("id").ilike("ecurie2", motifEH).limit(200); if (rmEH2 && rmEH2.data) mmEH = mmEH.concat(rmEH2.data); } catch (eMEH2) { }
            var vuEH = {}; idsMembresEH = mmEH.filter(function (p) { if (!p || !p.id || vuEH[p.id]) return false; vuEH[p.id] = true; return true; }).map(function (p) { return p.id; });
            rc = idsMembresEH.length ? await supa.from("chevaux").select("id, nom, race, photo_url, user_id, origines, club").in("user_id", idsMembresEH).is("supprime_le", null).limit(500) : { data: [] };
            /* 02/09 (Blandine : « je vais sur les chevaux de la SEP et TOUS les chevaux
               y sont, y compris ceux de Feinn ») — CINQUIEME ecran a poser la meme
               question par un chemin different. Comme les quatre autres, il partait des
               MEMBRES du club et prenait tous leurs chevaux, sans jamais regarder le club
               DU CHEVAL. Meme regle que partout : sans club -> partout ; club d'un autre
               club -> ecarte. Comparaison par noyau, comme la recherche des membres.
               ⚠️ A UNIFIER : cette regle est desormais ecrite en CINQ endroits. Une seule
               fonction « chevaux de ce club » doit les remplacer (chantier au SUIVI). */
            try { if (rc && rc.data) rc = { data: hypeChevauxDuClub(rc.data, clubCtxEH), error: rc.error }; } catch (eFEH) { } /* 03/09 : fonction unique */
          } else {
            /* 29/08 (demande Blandine : « il en manque plein ») -- sans contexte club,
               cet ecran chargeait la galerie GLOBALE : uniquement les chevaux ayant
               coche partage_ecurie_hype, tous clubs confondus, plafonnee a 60. Or c'est
               par ce chemin qu'on arrive presque toujours (encart Accueil, onglet,
               raccourci) : d'ou l'impression que la plupart des chevaux du club
               manquaient. Desormais on resout le club du cavalier connecte et on charge
               TOUS ses chevaux, meme logique d'appartenance que le bouton de la page
               Club juste au-dessus. Repli sur l'ancienne galerie globale si le cavalier
               n'a aucun club renseigne. Le champ partage_ecurie_hype reste en base,
               simplement plus utilise ici. */
            var clubMoiEH = null;
            try { if (u) { var rpMoi = await supa.from("profiles").select("ecurie, ecurie2").eq("id", u.id).maybeSingle(); if (rpMoi && rpMoi.data) clubMoiEH = rpMoi.data.ecurie || rpMoi.data.ecurie2 || null; } } catch (eCM) { }
            if (clubMoiEH) {
              var motifMoi = (typeof motifEcurie === "function") ? motifEcurie(clubMoiEH) : ("%" + (((typeof noyauEcurie === "function") && noyauEcurie(clubMoiEH)) || clubMoiEH) + "%");
              var mmMoi = [];
              try { var rm1 = await supa.from("profiles").select("id").ilike("ecurie", motifMoi).limit(200); if (rm1 && rm1.data) mmMoi = mmMoi.concat(rm1.data); } catch (eM1) { }
              try { var rm2 = await supa.from("profiles").select("id").ilike("ecurie2", motifMoi).limit(200); if (rm2 && rm2.data) mmMoi = mmMoi.concat(rm2.data); } catch (eM2) { }
              var vuMoi = {}; var idsMoi = mmMoi.filter(function (p) { if (!p || !p.id || vuMoi[p.id]) return false; vuMoi[p.id] = true; return true; }).map(function (p) { return p.id; });
              rc = idsMoi.length ? await supa.from("chevaux").select("id, nom, race, photo_url, user_id, origines").in("user_id", idsMoi).is("supprime_le", null).limit(500) : { data: [] };
            } else {
              rc = { data: [] };
            }
          }
          /* 29/08 (2e passe — page ENCORE trouvee vide par Blandine) : la cascade
             etait enfermee dans le cas « sans contexte club ». Arriver par le BOUTON
             de la page Club transmet bien un club : si sa recherche ne ramenait aucun
             cheval, aucun repli ne se declenchait et la page restait vide. Elle est
             desormais AU MEME NIVEAU que les deux branches, donc appliquee dans tous
             les cas. Ordre : club transmis -> club du profil -> MES chevaux -> galerie
             d'origine. */
          if (!rc || !rc.data || !rc.data.length) {
            try {
              if (u) {
                var rMiens2 = await supa.from("chevaux").select("id, nom, race, photo_url, user_id, origines").eq("user_id", u.id).is("supprime_le", null).limit(500);
                if (rMiens2 && rMiens2.data && rMiens2.data.length) rc = rMiens2;
              }
            } catch (eMi2) { }
          }
          if (!rc || !rc.data || !rc.data.length) {
            try { rc = await supa.from("chevaux").select("id, nom, race, photo_url, user_id, origines").eq("partage_ecurie_hype", true).is("supprime_le", null).limit(60); } catch (ePg) { }
          }
          /* 01/09 (Blandine : « pareil sur cette page-la, trie les chevaux en
             mettant ceux avec le plus d'XP en premier ») — meme classement que
             les quatre autres grilles, par `classerChevauxParXp`.
             ⚠️ AFFICHER D'ABORD, CLASSER ENSUITE (lecon de 15 h 45) : la liste
             est posee tout de suite, puis reposee classee. Sans ca, la page
             reste vide pendant les cinq requetes du classement.
             ⚠️ On ne repose QUE si le classement rend quelque chose : un echec
             ne doit pas vider une page deja remplie. */
          /* \ud83d\udfe5 05/09 (Blandine : « c est quand je vais sur les chevaux de l ecurie,
             sur la page speciale qui leur est dediee, que toutes les cartes s echangent
             a la connexion ») \u2014 LA REGLE DU 03/09 N ETAIT PAS POSEE ICI.
             L ordre memorise (un seul cheval glisse, une reorganisation profonde est
             reportee au chargement suivant, seuil 2 ecarts) ne couvrait que les grilles
             Cavalier et Ecurie, sous la cle « mes-chevaux ». Cette page-ci affichait
             l ordre de la base puis reposait l ordre XP : toute la grille se
             reorganisait sous les yeux. Meme regle, meme fonction, cle PROPRE a la
             page (« chevaux-ecurie ») pour ne pas melanger avec la liste perso. */
          var brutEH = (rc && rc.data) || [];
          var afficheEH = (typeof hypeOrdreMemoAppliquer === "function") ? hypeOrdreMemoAppliquer(brutEH, "chevaux-ecurie") : brutEH;
          if (ok) setCommList(afficheEH);
          try {
            if (brutEH.length > 1 && typeof classerChevauxParXp === "function") {
              var triEH = await classerChevauxParXp(brutEH);
              if (triEH && triEH.length) {
                try { hypeOrdreMemoPoser("chevaux-ecurie", triEH); } catch (eOpEH) { }
                /* Meme seuil que les deux autres grilles : 1 ou 2 ecarts = un seul
                   cheval a bouge, il glisse ; au-dela, on ne touche pas a l ecran et
                   le nouvel ordre servira au prochain chargement. */
                var bougesEH = (typeof hypeOrdreDeplacements === "function") ? hypeOrdreDeplacements(afficheEH, triEH) : 99;
                if (ok && bougesEH > 0 && bougesEH <= 2) setCommList(triEH);
              }
            }
          } catch (eXeh) { }
          /* 29/08 : albums PUBLICS des chevaux qu'on vient de charger. La cible d'un
             album de cheval est "cheval:<id>" (table albums_cheval). On ne remonte que
             visibilite = public et on plafonne a 16 pour ne pas alourdir la page. */
          try {
            var idsChEH = ((rc && rc.data) || []).map(function (c) { return "cheval:" + c.id; });
            if (idsChEH.length) {
              var raEH = await supa.from("albums_cheval").select("id, cible, nom, photos, visibilite, created_at").in("cible", idsChEH.slice(0, 300)).eq("visibilite", "public").order("created_at", { ascending: false }).limit(16);
              if (ok && raEH && raEH.data) setAlbumsEH(raEH.data.filter(function (a) { return a && a.photos && a.photos.length; }));
            } else if (ok) { setAlbumsEH([]); }
          } catch (eAl) { if (ok) setAlbumsEH([]); }
          var ids = ((rc && rc.data) || []).map(function (c) { return c.user_id; }).filter(Boolean);
          ids = ids.filter(function (v, i) { return ids.indexOf(v) === i; });
          if (ids.length) {
            var rp = await supa.from("profiles").select("id, pseudo, avatar_url, handle").in("id", ids);
            if (ok && rp && rp.data) { var m = {}; rp.data.forEach(function (p) { m[p.id] = p; }); setProprios(m); }
          }
        } catch (eC) { if (ok) setCommList([]); }
        try {
          if (u) { var rs = await supa.from("suivis_chevaux").select("cheval_slug").eq("user_id", u.id);
            if (ok && rs && rs.data) { var s = {}; rs.data.forEach(function (r) { s[r.cheval_slug] = true; }); setSuivis(s); } }
        } catch (eS) { }
      }
    } catch (e) { if (ok) setCommList([]); }
  })(); return function () { ok = false; }; }, []);

  async function basculerSuivi(slug) {
    try {
      var u = moiEH || await utilisateurActuel();
      if (!u) { flashEH(T("Connecte-toi pour suivre ce cheval", "Sign in to follow this horse", "Inicia sesión para seguir a este caballo", "Accedi per seguire questo cavallo", "フォローするにはログインしてください", "Melde dich an, um diesem Pferd zu folgen", "\u0633\u062c\u0644\u064a \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646", "登录后即可关注这匹马", "Log in om dit paard te volgen", "Entre na sua conta para seguir este cavalo", "Logga in för att följa hästen", "Войди, чтобы следить за этой лошадью", "Zaloguj się, aby śledzić tego konia", "이 말을 팔로우하려면 로그인하세요")); return; }
      var actif = !!suivis[slug];
      var nv = Object.assign({}, suivis);
      if (actif) { delete nv[slug]; setSuivis(nv);
        var rd = await supa.from("suivis_chevaux").delete().eq("user_id", u.id).eq("cheval_slug", slug);
        if (rd && rd.error) { nv[slug] = true; setSuivis(Object.assign({}, nv)); }
      } else { nv[slug] = true; setSuivis(nv);
        var ri = await supa.from("suivis_chevaux").insert({ user_id: u.id, cheval_slug: slug });
        if (ri && ri.error) { delete nv[slug]; setSuivis(Object.assign({}, nv)); flashEH(T("Suivi indisponible pour le moment", "Follow unavailable right now", "Seguimiento no disponible", "Follow non disponibile", "現在フォローできません", "Folgen derzeit nicht verf\u00fcgbar", "\u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u062d\u0627\u0644\u064a\u0627", "暂时无法关注", "Volgen momenteel niet beschikbaar", "Seguir indisponível no momento", "Följa är inte tillgängligt just nu", "Подписка на лошадь сейчас недоступна", "Śledzenie chwilowo niedostępne", "지금은 팔로우할 수 없어요")); }
        else flashEH(T("Tu suis " + slugNomEH(slug) + " ❤️", "You follow " + slugNomEH(slug) + " ❤️", "Sigues a " + slugNomEH(slug) + " ❤️", "Segui " + slugNomEH(slug) + " ❤️", slugNomEH(slug) + " をフォロー中 ❤️", "Du folgst " + slugNomEH(slug) + " \u2764\ufe0f", "\u0623\u0646\u062a \u062a\u062a\u0627\u0628\u0639\u064a\u0646 " + slugNomEH(slug) + " \u2764\ufe0f", "你关注了 " + slugNomEH(slug) + " ❤️", "Je volgt " + slugNomEH(slug) + " ❤️", "Você segue " + slugNomEH(slug) + " ❤️", ("Du följer " + slugNomEH(slug) + " ❤️"), ("Ты следишь за " + slugNomEH(slug) + " ❤️"), ("Śledzisz " + slugNomEH(slug) + " ❤️"), (slugNomEH(slug) + " 팔로우 중 ❤️")));
      }
    } catch (e) { }
  }
  function slugNomEH(slug) { var f = LEGENDES_HYPE.filter(function (l) { return l.slug === slug; })[0]; return f ? f.nom : slug; }

  function badge(rarete) {
    var lib = rarete === "legendaire" ? T("Légendaire", "Legendary", "Legendario", "Leggendario", "レジェンド", "Legend\u00e4r", "\u0623\u0633\u0637\u0648\u0631\u064a", "传奇", "Legendarisch", "Lendário", "Legendarisk", "Легендарная", "Legendarny", "레전드")
      : rarete === "exceptionnel" ? T("Exceptionnel", "Exceptional", "Excepcional", "Eccezionale", "エクセプショナル", "Au\u00dfergew\u00f6hnlich", "\u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a", "杰出", "Uitzonderlijk", "Excepcional", "Exceptionell", "Исключительная", "Wyjątkowy", "특별한")
      : T("Sport", "Sport", "Sport", "Sport", "スポーツ", "Sport", "\u0631\u064a\u0627\u0636\u0629", "运动", "Sport", "Esporte", "Sport", "Спорт", "Sport", "스포츠");
    return h("span", { className: "ehyBadge " + rarete }, "✦ " + lib);
  }

  function carteLegende(lg, i) {
    var variante = i % 3 === 1 ? " vC" : (i % 3 === 2 ? " vH" : "");
    return h("div", { key: lg.slug, className: "ehyLegCard" + variante, onClick: function () { setFTab("infos"); setLegSel(lg); } },
      h("div", { className: "ph" }, ehyPortraitLegende(h, lg, false)),
      h("div", { className: "ombre" }),
      h("div", { className: "txt" },
        badge(lg.rarete),
        h("div", { className: "ehyLegNom" }, lg.nom),
        h("div", { className: "ehyLegSous" }, tr(lg.disc) + " · " + tr(lg.pays))));
  }

  function carteCommunaute(cv) {
    var p = proprios[cv.user_id] || null;
    return h("div", { key: cv.id, className: "ehyComCard", onClick: function () { try { window.__chevalOuvert = cv.id; } catch (e) { } setEcran("cheval"); } },
      cv.photo_url ? h("img", { className: "ph", src: cv.photo_url, alt: cv.nom, onError: function (eI) { try { if (eI.target.getAttribute("data-repli") !== "1" && typeof CHEVAL_DEFAUT !== "undefined") { eI.target.setAttribute("data-repli", "1"); eI.target.src = CHEVAL_DEFAUT; } } catch (eR) { } } })   /* (818) meme repli */
        : h("div", { className: "ehyPortrait", style: { position: "absolute", inset: 0 } }, ehyReseauSVG(h, "c" + cv.id), h("div", { className: "ini", style: { fontSize: 74 } }, (cv.nom || "?").charAt(0))),
      h("div", { className: "ombre" }),
      h("div", { className: "txt" },
        h("div", { className: "ehyComNom" }, cv.nom || T("Cheval", "Horse", "Caballo", "Cavallo", "馬", "Pferd", "\u062d\u0635\u0627\u0646", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말")),
        cv.race ? h("div", { className: "ehyComSous" }, String(cv.race)) : null,
        p ? h("div", { className: "ehyProprio" },
          h("div", { className: "av" }, p.avatar_url ? h("img", { src: p.avatar_url, alt: "" }) : null),
          h("span", null, p.pseudo || "")) : null));
  }

  function ficheLegende(lg) {
    var suivi = !!suivis[lg.slug];
    return h("div", { className: "ehyFiche", "data-noswipe": "true" },
      h("div", { className: "fhaut" },
        ehyPortraitLegende(h, lg, true),
        h("div", { className: "ombre" }),
        h("div", { className: "ehyBack", style: { pointerEvents: "auto" }, onClick: function () { setLegSel(null); } },
          h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M15 18l-6-6 6-6" })))),
      h("div", { className: "fcorps" },
        badge(lg.rarete),
        h("h1", { className: "fnom" }, lg.nom),
        h("div", { className: "fresume" }, tr(lg.resume)),
        h("div", { className: "fongles" },
          [["infos", T("Infos", "Info", "Info", "Info", "情報", "Infos", "\u0645\u0639\u0644\u0648\u0645\u0627\u062a", "信息", "Info", "Infos", "Info", "Инфо", "Info", "정보")],
           ["palmares", T("Palmarès", "Record", "Palmarés", "Palmarès", "実績", "Erfolge", "\u0633\u062c\u0644 \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a", "战绩", "Palmares", "Histórico de resultados", "Meritlista", "Достижения", "Dorobek sportowy", "수상 기록")],
           ["album", T("Album", "Album", "Álbum", "Album", "アルバム", "Album", "\u0623\u0644\u0628\u0648\u0645", "相册", "Album", "Álbum", "Album", "Альбом", "Album", "앨범")],
           ["communaute", T("Communauté", "Community", "Comunidad", "Comunità", "コミュニティ", "Community", "\u0627\u0644\u0645\u062c\u062a\u0645\u0639", "社区", "Community", "Comunidade", "Community", "Сообщество", "Społeczność", "커뮤니티")]].map(function (o) {
            return h("div", { key: o[0], className: "fongle" + (fTab === o[0] ? " on" : ""), onClick: function () { setFTab(o[0]); } }, o[1]);
          })),
        fTab === "infos" ? h("div", { className: "fgrid" },
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Taille", "Height", "Alzada", "Altezza", "体高", "Gr\u00f6\u00dfe", "\u0627\u0644\u0637\u0648\u0644", "体高", "Stokmaat", "Altura", "Mankhöjd", "Рост", "Wzrost", "체고")), h("div", { className: "v" }, lg.taille)),
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Race", "Breed", "Raza", "Razza", "品種", "Rasse", "\u0627\u0644\u0633\u0644\u0627\u0644\u0629", "品种", "Ras", "Raça", "Ras", "Порода", "Rasa", "품종")), h("div", { className: "v" }, lg.race)),
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Origines", "Bloodlines", "Orígenes", "Origini", "血統", "Abstammung", "\u0627\u0644\u0646\u0633\u0628", "血统", "Afstamming", "Origens", "Ursprung", "Происхождение", "Pochodzenie", "혈통")), h("div", { className: "v" }, lg.origines)),
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Pays", "Country", "País", "Paese", "国", "Land", "\u0627\u0644\u0628\u0644\u062f", "国家", "Land", "País", "Land", "Страна", "Kraj", "국가")), h("div", { className: "v" }, tr(lg.pays))),
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Discipline", "Discipline", "Disciplina", "Disciplina", "競技", "Disziplin", "\u0627\u0644\u0627\u062e\u062a\u0635\u0627\u0635", "项目", "Discipline", "Modalidade", "Gren", "Дисциплина", "Dyscyplina", "종목")), h("div", { className: "v" }, tr(lg.disc))),
          h("div", { className: "fcell" }, h("div", { className: "l" }, T("Niveau max", "Top level", "Nivel máx.", "Livello max", "最高レベル", "Max. Niveau", "\u0623\u0639\u0644\u0649 \u0645\u0633\u062a\u0648\u0649", "最高级别", "Hoogste niveau", "Nível máximo", "Högsta nivå", "Максимальный уровень", "Najwyższy poziom", "최고 레벨")), h("div", { className: "v" }, tr(lg.niveau)))) : null,
        fTab === "palmares" ? h("div", { style: { marginTop: 6 } }, lg.palmares.map(function (r, i) {
          return h("div", { key: i, className: "fprow" },
            h("div", { className: "an" }, r.annee),
            h("div", { className: "ev" }, tr(r.event)),
            h("div", { className: "rg" }, tr(r.rang)));
        })) : null,
        fTab === "album" ? h("div", { className: "fbientot" }, T("L'album de " + lg.nom + " arrive bientôt — photos d'archives et grands moments.", lg.nom + "'s album is coming soon — archive photos and great moments.", "El álbum de " + lg.nom + " llega pronto.", "L'album di " + lg.nom + " arriva presto.", lg.nom + " のアルバムは近日公開。", "Das Album von " + lg.nom + " kommt bald \u2013 Archivfotos und gro\u00dfe Momente.", "\u0623\u0644\u0628\u0648\u0645 " + lg.nom + " \u0642\u0627\u062f\u0645 \u0642\u0631\u064a\u0628\u0627 \u2014 \u0635\u0648\u0631 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0648\u0644\u062d\u0638\u0627\u062a \u0643\u0628\u0631\u0649.", lg.nom + " 的相册即将上线——珍贵的档案照片和高光时刻。", "Het album van " + lg.nom + " komt binnenkort — archieffoto's en mooiste momenten.", "O álbum de " + lg.nom + " chega em breve — fotos de arquivo e grandes momentos.", ("Albumet med " + lg.nom + " kommer snart — arkivbilder och stora ögonblick."), ("Альбом " + lg.nom + " скоро появится — архивные фото и великие моменты."), ("Album konia " + lg.nom + " pojawi się już wkrótce — zdjęcia z archiwum i wielkie chwile."), (lg.nom + "의 앨범이 곧 공개돼요 — 아카이브 사진과 빛나는 순간들."))) : null,
        fTab === "communaute" ? h("div", { className: "fbientot" }, T("Bientôt : les cavaliers de la communauté qui suivent " + lg.nom + ".", "Soon: community riders following " + lg.nom + ".", "Pronto: los jinetes que siguen a " + lg.nom + ".", "Presto: i cavalieri che seguono " + lg.nom + ".", "近日公開：" + lg.nom + " をフォローする騎手たち。", "Bald: die Reiter der Community, die " + lg.nom + " folgen.", "\u0642\u0631\u064a\u0628\u0627: \u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0627\u0644\u0630\u064a\u0646 \u064a\u062a\u0627\u0628\u0639\u0648\u0646 " + lg.nom + ".", "即将上线：关注 " + lg.nom + " 的社区骑手。", "Binnenkort: de ruiters van de community die " + lg.nom + " volgen.", "Em breve: os cavaleiros da comunidade que seguem " + lg.nom + ".", ("Snart: community-ryttare som följer " + lg.nom + "."), ("Скоро: всадники сообщества, которые следят за " + lg.nom + "."), ("Wkrótce: jeźdźcy ze społeczności, którzy śledzą konia " + lg.nom + "."), ("곧 공개: " + lg.nom + "을(를) 팔로우하는 커뮤니티 기수들."))) : null),
      h("div", { className: "fbtns" },
        h("button", { className: "fsuivre" + (suivi ? " on" : ""), onClick: function () { basculerSuivi(lg.slug); } },
          suivi ? T("Suivi ❤️", "Following ❤️", "Siguiendo ❤️", "Segui già ❤️", "フォロー中 ❤️", "Folgst du \u2764\ufe0f", "\u0645\u062a\u0627\u0628\u0639\u0629 \u2764\ufe0f", "已关注 ❤️", "Gevolgd ❤️", "Seguindo ❤️", "Följer ❤️", "Слежу ❤️", "Śledzisz ❤️", "팔로우 중 ❤️") : T("Suivre ce cheval ❤️", "Follow this horse ❤️", "Seguir este caballo ❤️", "Segui questo cavallo ❤️", "この馬をフォロー ❤️", "Diesem Pferd folgen \u2764\ufe0f", "\u0645\u062a\u0627\u0628\u0639\u0629 \u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646 \u2764\ufe0f", "关注这匹马 ❤️", "Dit paard volgen ❤️", "Seguir este cavalo ❤️", "Följ den här hästen ❤️", "Следить за этой лошадью ❤️", "Śledź tego konia ❤️", "이 말 팔로우하기 ❤️")),
        h("button", { className: "fgemme", onClick: function () { flashEH(T("Bientôt — packs de gemmes ✨", "Soon — gem packs ✨", "Pronto — packs de gemas ✨", "Presto — pacchetti gemme ✨", "近日公開 — ジェムパック ✨", "Bald \u2013 Edelstein-Pakete \u2728", "\u0642\u0631\u064a\u0628\u0627 \u2014 \u062d\u0632\u0645 \u0627\u0644\u062c\u0648\u0627\u0647\u0631 \u2728", "即将推出——宝石包 ✨", "Binnenkort — edelsteenpakketten ✨", "Em breve — pacotes de gemas ✨", "Snart — gempaket ✨", "Скоро — наборы гемов ✨", "Wkrótce — pakiety klejnotów ✨", "곧 만나요 — 젬 팩 ✨")); } },
          T("Ajouter à mon écurie", "Add to my stable", "Añadir a mi cuadra", "Aggiungi alla scuderia", "厩舎に追加", "Zu meinem Stall hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0625\u0633\u0637\u0628\u0644\u064a", "加入我的马厩", "Aan mijn stal toevoegen", "Adicionar à minha cocheira", "Lägg till i mitt stall", "Добавить в мою конюшню", "Dodaj do mojej stajni", "내 마구간에 추가") + " 💎 100")));
  }

  var ansEH = T("ans", "yo", "años", "anni", "歳", "Jahre", "\u0633\u0646\u0648\u0627\u062a", "岁", "jaar", "anos", "år", "лет", "lat", "세");
  /* 29/08 : VITRINE CODEE EN DUR SUPPRIMEE (demande Blandine). Cette grille affichait
     six entrees ecrites a la main (Rizotto, Elfe, Cooltax, Borealis, Tully, Hey Baby)
     avec des images fixes et des identifiants factices — jamais les vrais chevaux.
     C'est pourquoi la page montrait toujours les six memes quoi qu'on change dans la
     requete : `commList` etait bien chargee depuis la base mais n'etait affichee nulle
     part. On construit desormais les cartes a partir de `commList` (chevaux du club,
     cf. le chargement plus haut). Repli portrait spectral par defaut pour un cheval
     sans photo. Les identifiants sont les vrais : le tap ouvre la bonne fiche. */
  /* 30/08 (demande Blandine) : « quand un cheval est cree on devrait voir le nom du
     cavalier proprietaire de la fiche, par exemple Crumble by Evan ». On resout les
     pseudos a partir des user_id deja presents dans commList — une seule requete,
     rejouee uniquement quand la liste change. */
  /* 01/09 — « BY [OBJECT OBJECT] » SUR LES CARTES DE L'ECURIE HYPE.
     Ce composant declarait DEUX FOIS `var proprios` et `var setProprios` (ligne
     ~37329 et ici). En JavaScript, deux `var` du meme nom dans une meme fonction
     ne font QU'UNE variable : les deux etats se marchaient dessus.
     Le premier remplit la table avec des PROFILS ENTIERS (pour l'avatar et le
     pseudo de la carte communautaire), le second avec des PSEUDOS (des chaines).
     Comme les effets s'executent apres le rendu, c'est le second setter qui
     recevait les profils entiers du premier effet — d'ou `"by " + objet`, qui
     s'ecrit « by [object Object] » a l'ecran. Les deux effets se volaient aussi
     l'etat l'un a l'autre, au hasard de leur ordre d'arrivee.
     ⚠️ RENOMMER, PAS FUSIONNER : les deux tables n'ont pas le meme contenu.
     `proprios` garde les profils, `propriosNoms` porte les pseudos. */
  var _pr = React.useState({}), propriosNoms = _pr[0], setPropriosNoms = _pr[1];
  React.useEffect(function () {
    var vivant = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) return;
        var ids = [];
        (commList || []).forEach(function (x) { if (x && x.user_id && ids.indexOf(x.user_id) < 0) ids.push(x.user_id); });
        if (!ids.length) return;
        var r = await supa.from("profiles").select("id, pseudo").in("id", ids);
        if (!vivant || !r || !r.data) return;
        var m = {};
        r.data.forEach(function (p) { if (p && p.id && p.pseudo) m[p.id] = p.pseudo; });
        setPropriosNoms(m);
      } catch (eProp) { }
    })();
    return function () { vivant = false; };
  }, [commList]);
  var piqActifObj = (piqActif && piqActif !== "__poneys") ? (piquets.filter(function (pA) { return pA.id === piqActif; })[0] || null) : null;
  var piqIdsActifs = null; if (piqActifObj) { piqIdsActifs = {}; piqActifObj.ids.forEach(function (iA) { piqIdsActifs[iA] = true; }); }
  /* 10/10 (841) Blandine : « ajoute tous les poneys en onglet sur la page chevaux d une ecurie, qui apparaisse automatiquement
     comme celui de tous les chevaux ». Onglet automatique « Tous les poneys » (d apres la race), seulement s il y en a. */
  var poneysEH = (commList || []).filter(function (cP) { return hypeEstPoney(cP && cP.race, cP && cP.origines); });
  if (piqActif === "__poneys") { piqIdsActifs = {}; poneysEH.forEach(function (cP) { piqIdsActifs[cP.id] = true; }); }
  var piquetsVisibles = piquets.filter(function (pV) { return pV.ids.length > 0 || (piqClub && piqClub.gere); });   /* public : piquets non vides seulement */
  /* 10/10 (858) Blandine : « les poneys se retrouvent en double sur les pages chevaux aussi, ca surcharge » : l onglet
     « Tous les chevaux » ne montre plus les poneys (ils ont leur onglet « Tous les poneys ») ; les autres onglets ne changent pas. */
  var idsPoneysEH = {}; poneysEH.forEach(function (cP) { idsPoneysEH[cP.id] = true; });
  var chevauxFeinnEH = ((commList || [])).filter(function (cF) { return piqIdsActifs ? !!piqIdsActifs[cF.id] : (!piqActif && poneysEH.length ? !idsPoneysEH[cF.id] : true); }).map(function (cEH) {
    var detEH = [];
    if (cEH.race) detEH.push(String(cEH.race));   /* (833) retour d avant le 825 : (OC)/(OI) seulement dans les origines */
    return {
      img: cEH.photo_url || CHEVAL_DEFAUT,
      nom: cEH.nom || T("Sans nom", "Unnamed", "Sin nombre", "Senza nome", "名前なし", "Ohne Namen", "\u0628\u0644\u0627 \u0627\u0633\u0645", "未命名", "Naamloos", "Sem nome", "Namnlös", "Без имени", "Bez nazwy", "이름 없음"),
      l2: detEH.join(" · "),
      l3: (cEH.user_id && propriosNoms[cEH.user_id]) ? ("by " + propriosNoms[cEH.user_id]) : "",
      id: cEH.id
    };
  });
  function bientotEH() { flashEH(T("Bientôt disponible ✨", "Coming soon ✨", "Próximamente ✨", "Presto disponibile ✨", "近日公開 ✨", "Bald verf\u00fcgbar \u2728", "\u0645\u062a\u0627\u062d \u0642\u0631\u064a\u0628\u0627 \u2728", "即将推出 ✨", "Binnenkort beschikbaar ✨", "Em breve ✨", "Kommer snart ✨", "Скоро будет доступно ✨", "Wkrótce dostępne ✨", "곧 만나요 ✨")); }
  return h("div", { className: "ecv", style: { minHeight: "100vh", background: "#07080A" } },
    h("style", { dangerouslySetInnerHTML: { __html: EC2_CSS } }),
    h("style", { dangerouslySetInnerHTML: { __html: ECURIE_HYPE_CSS } }),
    h("div", { className: "ec2anim", style: { maxWidth: 520, margin: "0 auto", paddingBottom: 8, overflowX: "hidden" } },
      h("header", { className: "ec2hero" },
        /* 28/09 (469) : la fleche RETOUR en haut a gauche (Blandine : « mets la petite fleche en haut a gauche
           pour revenir en arriere sur la page chevaux de l ecurie »). Meme pastille que + et ... a droite ;
           revient a l ecran precedent, sinon a la page Ecurie. */
        h("div", { className: "ec2btn", role: "button", "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
          onClick: function () { try { if (ctx.peutReculer && typeof ctx.retourEcran === "function") { ctx.retourEcran(); return; } } catch (eRt) { } setEcran("guilde"); },
          style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 16px)", left: 14, zIndex: 4 } },
          h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M15 5l-7 7 7 7" }))),
        h("div", { className: "ec2btns" },
          clubCtxEH ? h(HypeBoutonPartagerPage, { inline: true, taille: 40, obtenir: function () { return { fam: "ec", val: String(clubCtxEH), titre: String(clubCtxEH) }; } }) : null,   /* (492) */
          h(HypeDrapeauLangue, { inline: true, taille: 40 }),   /* (491) */
          h("div", { className: "ec2btn", onClick: bientotEH, role: "button", "aria-label": T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가") },
            h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 5v14M5 12h14" }))),
          h("div", { className: "ec2btn", onClick: bientotEH, role: "button", "aria-label": "Menu" },
            h("svg", { viewBox: "0 0 24 24", className: "pts" }, h("circle", { cx: 12, cy: 5, r: 1.7 }), h("circle", { cx: 12, cy: 12, r: 1.7 }), h("circle", { cx: 12, cy: 19, r: 1.7 })))),
        /* 09/10 (780) : le titre passait SOUS les boutons du haut (retour a gauche ; partager, drapeau, + et menu a droite,
           ~200 px) -> il descend sous la rangee de boutons (marginTop 52) et reprend presque toute la largeur.
           « de Ecurie » devient « de l'Écurie » (elision francaise devant une voyelle, accent sur Écurie en tete
           du nom) ; en japonais « の馬 » passe APRES le nom (il etait devant). */
        h("h1", { className: "ec2titre", style: { fontSize: 19, letterSpacing: "0.06em", padding: "0 24px", marginTop: 52, lineHeight: 1.25 } }, clubCtxEH ? (function () {
          var nomC = String(clubCtxEH).replace(/^Ecurie(?=\s)/i, "Écurie");
          var fr = /^[aeiouyhàâéèêîôû]/i.test(nomC) ? "Les chevaux de l’" + nomC : "Les chevaux de " + nomC;
          return T(fr, "The horses of " + nomC, "Los caballos de " + nomC, "I cavalli di " + nomC, nomC + " の馬", "Die Pferde von " + nomC, "خيول " + nomC, nomC + " 的马", "De paarden van " + nomC, "Os cavalos de " + nomC, "Hästarna på " + nomC, "Лошади клуба " + nomC, "Konie klubu " + nomC, nomC + " 클럽의 말");
        })() : hypeT7("L'Écurie Hype", "The Hype Stable", "La Cuadra Hype", "La Scuderia Hype", "Hype\u53a9\u820e", "Der Hype-Stall", "\u0625\u0633\u0637\u0628\u0644 Hype", "Hype 马厩", "De Hype-stal", "A Cocheira Hype", "Hype-stallet", "Конюшня Hype", "Stajnia Hype", "Hype 마구간")),
        h("div", { className: "ec2sous", style: { fontStyle: "italic", textTransform: "none", letterSpacing: "0.05em", fontSize: 11.5, fontWeight: 300, padding: "0 84px", lineHeight: 1.55 } }, T("Agrandis ton écurie et découvre les chevaux des autres", "Grow your stable and discover other riders' horses", "Amplía tu cuadra y descubre los caballos de los demás", "Amplia la tua scuderia e scopri i cavalli degli altri", "厩舎を大きくして、みんなの馬を見つけよう", "Vergr\u00f6\u00dfere deinen Stall und entdecke die Pferde der anderen", "\u0648\u0633\u0639\u064a \u0625\u0633\u0637\u0628\u0644\u0643 \u0648\u0627\u0643\u062a\u0634\u0641\u064a \u062e\u064a\u0648\u0644 \u0627\u0644\u0622\u062e\u0631\u064a\u0646", "扩大你的马厩，发现其他骑手的马", "Breid je stal uit en ontdek de paarden van anderen", "Aumente sua cocheira e descubra os cavalos dos outros", "Utöka ditt stall och upptäck andra ryttares hästar", "Расширяй свою конюшню и открывай лошадей других всадников", "Powiększ swoją stajnię i poznaj konie innych jeźdźców", "마구간을 넓히고 다른 기수들의 말을 만나 보세요")),
        h("div", { className: "ec2orn" }, h("span", { className: "li" }), h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z" })), h("span", { className: "li r" })),
        h("div", { className: "ec2imgw" },
          h("img", { ref: refHeroEH, src: ECURIE_HERO2, alt: hypeT7("Écurie", "Stable", "Cuadra", "Scuderia", "\u53a9\u820e", "Stall", "\u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩", "Stal", "Cocheira", "Stall", "Конюшня", "Stajnia", "마구간"), style: { transform: "scale(1.12)", willChange: "transform" } }),
          h("div", { className: "ec2souffle" }),
          h("div", { className: "ec2lant", style: { left: "2%", top: "34%", width: 70, height: 70 } }),
          h("div", { className: "ec2lant", style: { left: "16%", top: "44%", width: 44, height: 44, animationDelay: "3s" } }),
          h("div", { className: "ec2lant", style: { right: "1%", top: "26%", width: 88, height: 88, animationDelay: "1.8s", animationDuration: "6.4s" } }),
          poussEH.map(function (pP, iD) {
            return h("div", { key: "ps" + iD, className: "ec2pouss", style: { left: pP.g + "%", top: pP.h + "%", width: pP.t, height: pP.t, animationDuration: pP.du + "s", animationDelay: pP.de + "s", "--o": pP.o, "--dx": pP.dx + "px", "--dy": pP.dy + "px" } });
          }))),
      h("div", { className: "ec2stats" },
        h("div", { className: "ec2stat" }, h("div", { className: "v" }, String(cptEH[0])), h("div", { className: "l" }, T("Chevaux", "Horses", "Caballos", "Cavalli", "馬", "Pferde", "\u0627\u0644\u062e\u064a\u0648\u0644", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말"))),
        h("div", { className: "ec2stat" }, h("div", { className: "v" }, String(cptEH[1])), h("div", { className: "l" }, T("Poneys", "Ponies", "Ponis", "Pony", "ポニー", "Ponys", "\u0627\u0644\u0645\u0647\u0648\u0631", "小马", "Pony’s", "Pôneis", "Ponnyer", "Пони", "Kucyki", "포니"))),
        h("div", { className: "ec2stat" }, h("div", { className: "v" }, "0"), h("div", { className: "l" }, T("À venir", "Upcoming", "Próximos", "In arrivo", "予定", "Demn\u00e4chst", "\u0642\u0627\u062f\u0645", "即将推出", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "공개 예정"))),
        h("div", { className: "ec2stat" }, h("div", { className: "v" }, h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.5 6.8 19.2l1-5.8-4.3-4.2 5.9-.9L12 3Z" }))), h("div", { className: "l" }, T("Favori", "Favorite", "Favorito", "Preferito", "お気に入り", "Favorit", "\u0645\u0641\u0636\u0644", "最爱", "Favoriet", "Favorito", "Favorit", "Любимая", "Ulubiony", "즐겨찾기")))),
      /* (787) BARRE DES PIQUETS : « Tous les chevaux », les piquets, puis « + » (gestion de l'écurie seulement). Défile à l'horizontale. */
      ((piqClub && (piquetsVisibles.length || piqClub.gere)) || poneysEH.length) ? h("div", { "data-noswipe": "1", "data-hscroll": "1", "data-piquets": "1", style: { display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "22px 18px 6px", scrollbarWidth: "none" } },
        [{ id: null, nom: T("Tous les chevaux", "All horses", "Todos los caballos", "Tutti i cavalli", "すべての馬", "Alle Pferde", "كل الخيول", "所有马", "Alle paarden", "Todos os cavalos", "Alla hästar", "Все лошади", "Wszystkie konie", "모든 말") }].concat(poneysEH.length ? [{ id: "__poneys", nom: T("Tous les poneys", "All ponies", "Todos los ponis", "Tutti i pony", "\u3059\u3079\u3066\u306e\u30dd\u30cb\u30fc", "Alle Ponys", "\u0643\u0644 \u0627\u0644\u0645\u0647\u0648\u0631", "所有小马", "Alle pony’s", "Todos os pôneis", "Alla ponnyer", "Все пони", "Wszystkie kucyki", "모든 포니") }] : []).concat(piquetsVisibles.map(function (pT) { return { id: pT.id, nom: hypeLibPiquet(pT.nom) }; })).map(function (oT) {
          var actT = (piqActif || null) === oT.id;
          return h("button", { key: "pq" + (oT.id || "tous"), type: "button", onClick: function () { setPiqActif(oT.id); }, style: { flex: "0 0 auto", minHeight: 38, padding: "0 16px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: actT ? 600 : 500, letterSpacing: "0.02em",
            /* 10/10 (798) Blandine : plus de pastille pleine dorée ; fond dégradé transparent pétrole / noir, ombré */
            border: "1px solid " + (actT ? "rgba(201,166,107,0.5)" : "rgba(201,166,107,0.16)"),
            background: actT ? "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)" : "linear-gradient(165deg, rgba(17,27,31,0.55) 0%, rgba(6,7,9,0.3) 100%)",
            boxShadow: actT ? "0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(243,238,228,0.08)" : "0 4px 12px rgba(0,0,0,0.35)",
            color: actT ? "#F3EEE4" : "rgba(243,238,228,0.72)" } }, oT.nom);
        }),
        (piqClub && piqClub.gere) ? h("button", { key: "pq+", type: "button", "data-ajout-piquet": "1", onClick: function () { setPiqFeuille(true); }, "aria-label": T("Nouveau piquet", "New group", "Nuevo grupo", "Nuovo gruppo", "新しいグループ", "Neue Gruppe", "مجموعة جديدة", "新分组", "Nieuwe groep", "Novo piquete", "Ny grupp", "Новая группа", "Nowa grupa", "새 그룹"),
          style: { flex: "0 0 38px", width: 38, height: 38, borderRadius: "50%", cursor: "pointer", border: "1px solid rgba(201,166,107,0.3)", background: "linear-gradient(165deg, rgba(17,27,31,0.55) 0%, rgba(6,7,9,0.3) 100%)", boxShadow: "0 4px 12px rgba(0,0,0,0.35)", color: "#C9A66B", fontSize: 20, lineHeight: "36px", padding: 0 } }, "+") : null) : null,   /* (798) même fond dégradé ombré */
      (piqGestion && piqActifObj && piqClub) ? h(GestionPiquetEH, { groupeId: piqActifObj.id, nom: piqActifObj.nom, ids: piqActifObj.ids, chevaux: commList || [], club: piqClub.nom, membres: piqActifObj.membres || [], saison: piqActifObj.saison || "", photo: piqActifObj.photo_url || "", photoAuto: hypePhotoPiquet(Object.assign({}, piqActifObj, { photo_url: null })),
        onFermer: function () { setPiqGestion(false); },
        onFini: function () { setPiqGestion(false); setPiqVersion(piqVersion + 1); flashEH(T("Piquet mis à jour ✓", "Group updated ✓", "Grupo actualizado ✓", "Gruppo aggiornato ✓", "グループを更新しました ✓", "Gruppe aktualisiert ✓", "تم تحديث المجموعة ✓", "分组已更新 ✓", "Groep bijgewerkt ✓", "Piquete atualizado ✓", "Gruppen uppdaterad ✓", "Группа обновлена ✓", "Grupa zaktualizowana ✓", "그룹을 업데이트했어요 ✓")); } }) : null,
      piqFeuille && piqClub ? h(CreationPiquetEH, { clef: piqClub.clef, chevaux: commList || [], existants: piquets.map(function (pE) { return pE.nom; }),
        onFermer: function () { setPiqFeuille(false); },
        onFini: function (idN) { setPiqFeuille(false); setPiqActif(idN); setPiqVersion(piqVersion + 1); flashEH(T("Piquet créé ✓", "Group created ✓", "Grupo creado ✓", "Gruppo creato ✓", "グループを作成しました ✓", "Gruppe erstellt ✓", "تم إنشاء المجموعة ✓", "分组已创建 ✓", "Groep gemaakt ✓", "Piquete criado ✓", "Gruppen skapad ✓", "Группа создана ✓", "Grupa utworzona ✓", "그룹을 만들었어요 ✓")); } }) : null,
      /* (788) ÉTAPE C : présentation du piquet choisi (photo de sa discipline, nom, badge Club / Amateur / Poney discret,
         petite phrase, nombre de chevaux), puis « Nos chevaux ». Piquet vide : texte élégant, aucune fausse carte. */
      piqActifObj ? (function () {
        var nbP = piqActifObj.ids.length, badgeP = hypeBadgePiquet(piqActifObj.niveau), loisirP = piqActifObj.type === "loisir";
        var nomP = hypeLibPiquet(piqActifObj.nom);
        var phraseP = loisirP
          ? T("Les chevaux de l’écurie pour le plaisir, la balade et la complicité.", "The stable’s horses for pleasure, hacking and partnership.", "Los caballos de la cuadra para el placer, el paseo y la complicidad.", "I cavalli della scuderia per il piacere, le passeggiate e l’intesa.", "楽しみと外乗、絆のための厩舎の馬たち。", "Die Pferde des Stalls für Freude, Ausritte und Vertrauen.", "خيول الإسطبل للمتعة والنزهة والانسجام.", "马厩里用于休闲、外出骑行和默契相伴的马。", "De paarden van de stal voor plezier, buitenritten en verbondenheid.", "Os cavalos da cocheira para o prazer, o passeio e a cumplicidade.", "Stallets hästar för nöjes skull, utritt och samspel.", "Лошади конюшни для удовольствия, прогулок и взаимопонимания.", "Konie ze stajni do przyjemności, spacerów i współpracy.", "즐거움과 산책, 교감을 위한 마구간의 말들.")
          : T("Les chevaux de l’écurie engagés en " + nomP + ".", "The stable’s horses competing in " + nomP + ".", "Los caballos de la cuadra que compiten en " + nomP + ".", "I cavalli della scuderia in gara in " + nomP + ".", nomP + "に出場する厩舎の馬たち。", "Die Pferde des Stalls, die in " + nomP + " starten.", "خيول الإسطبل المشاركة في " + nomP + ".", "马厩里参加 " + nomP + " 的马。", "De paarden van de stal die meedoen aan " + nomP + ".", "Os cavalos da cocheira inscritos em " + nomP + ".", ("Stallets hästar som tävlar i " + nomP + "."), ("Лошади конюшни, заявленные: " + nomP + "."), ("Konie ze stajni startujące w dyscyplinie: " + nomP + "."), (nomP + "에 출전하는 마구간의 말들이에요."));
        var nbTxt = nbP + " " + (nbP > 1 ? T("chevaux", "horses", "caballos", "cavalli", "頭", "Pferde", "خيول", "匹马", "paarden", "cavalos", "hästar", "лошадей", "konie", "말") : T("cheval", "horse", "caballo", "cavallo", "頭", "Pferd", "حصان", "马", "paard", "cavalo", "häst", "лошадь", "koń", "마리"));
        return h("section", { "data-piquet-bloc": piqActifObj.id, style: { margin: "16px 18px 0", borderRadius: 22, overflow: "hidden", background: "linear-gradient(165deg, rgba(55,107,125,0.22) 0%, rgba(16,26,29,0.55) 50%, rgba(6,7,9,0.35) 100%)", border: "1px solid rgba(201,166,107,0.18)", boxShadow: "0 14px 34px rgba(0,0,0,0.5), inset 0 1px 0 rgba(243,238,228,0.05)" } },   /* 10/10 (806) Blandine : encart transparent, dégradé pétrole, ombré */
          h("div", { style: { position: "relative", height: 210, overflow: "hidden" } },
            h("img", { src: hypePhotoPiquet(piqActifObj), alt: "", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 40%", display: "block" } }),
            h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0) 30%, rgba(11,18,21,0.55) 65%, #0B1215 100%)" } }),
            h("div", { style: { position: "absolute", insetInline: 18, bottom: 14 } },
              h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                h("span", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, fontWeight: 600, letterSpacing: 2.6, textTransform: "uppercase", color: "#C9A66B" } }, T("Piquet", "Group", "Grupo", "Gruppo", "グループ", "Gruppe", "مجموعة", "分组", "Groep", "Piquete", "Grupp", "Группа", "Grupa", "그룹")),
                badgeP ? h("span", { style: { padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.55)", fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#D2B07A" } }, badgeP) : null,
                piqActifObj.saison ? h("span", { dir: "ltr", style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, letterSpacing: 1, color: "rgba(243,238,228,0.78)" } }, piqActifObj.saison) : null),
              h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 32, fontWeight: 500, lineHeight: 1.05, color: "#F3EEE4", marginTop: 6 } }, nomP))),
          h("div", { style: { padding: "12px 18px 16px" } },
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, lineHeight: 1.55, color: "rgba(243,238,228,0.84)" } }, phraseP),
            nbP ? h("div", { style: { marginTop: 8, fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "#5C8792" } }, nbTxt) : null,
            nbP ? null : h("div", { style: { marginTop: 12, fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 17, color: "rgba(243,238,228,0.7)" } }, T("Aucun cheval attribué pour l’instant.", "No horse assigned yet.", "Aún no hay caballos asignados.", "Nessun cavallo assegnato per ora.", "まだ馬が割り当てられていません。", "Noch kein Pferd zugeordnet.", "لم يُخصَّص أي حصان بعد.", "暂时还没有分配任何马。", "Nog geen paard toegewezen.", "Nenhum cavalo atribuído por enquanto.", "Ingen häst tilldelad ännu.", "Пока не назначено ни одной лошади.", "Na razie nie przypisano żadnego konia.", "아직 배정된 말이 없어요.")),
            /* (806) les deux boutons sur une même ligne, même style que les onglets (dégradé pétrole transparent, ombré) */
            h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
            (!loisirP && nbP) ? h("button", { type: "button", "data-resultats-piquet": "1", onClick: function () { try { window.__perfGroupe = { id: piqActifObj.id, nom: piqActifObj.nom }; } catch (eRp) { } setEcran("performances-chevaux"); },   /* (794) étape F */
              style: { display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "1 1 0", minWidth: 0, minHeight: 42, padding: "0 12px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", whiteSpace: "nowrap", cursor: "pointer" } },
              T("Voir les résultats", "See the results", "Ver los resultados", "Vedi i risultati", "成績を見る", "Ergebnisse ansehen", "عرض النتائج", "查看成绩", "Resultaten bekijken", "Ver os resultados", "Se resultaten", "Смотреть результаты", "Zobacz wyniki", "결과 보기")) : null,
            (piqClub && piqClub.gere) ? h("button", { type: "button", "data-gerer-piquet": "1", onClick: function () { setPiqGestion(true); }, style: { display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "1 1 0", minWidth: 0, minHeight: 42, padding: "0 12px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#D2B07A", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", whiteSpace: "nowrap", cursor: "pointer" } },
              nbP ? T("Gérer le piquet", "Manage the group", "Gestionar el grupo", "Gestisci il gruppo", "グループを管理", "Gruppe verwalten", "إدارة المجموعة", "管理小组", "Groep beheren", "Gerenciar o piquete", "Hantera gruppen", "Управлять группой", "Zarządzaj grupą", "그룹 관리") : T("Ajouter un cheval", "Add a horse", "Añadir un caballo", "Aggiungi un cavallo", "馬を追加", "Pferd hinzufügen", "إضافة حصان", "添加一匹马", "Een paard toevoegen", "Adicionar um cavalo", "Lägg till en häst", "Добавить лошадь", "Dodaj konia", "말 추가")) : null)));
      })() : null,
      /* (796) ÉTAPE I : PASSERELLE PIQUET → TEAM. Un bloc discret par Team de la même écurie qui partage au moins un cheval
         avec le piquet (intersection calculée ici). Aucune Team, ou aucun cheval commun : rien. Ce n'est pas un piquet. */
      piqActifObj ? equipesEc.filter(function (eT) { var dansP = {}; piqActifObj.ids.forEach(function (iP) { dansP[iP] = true; }); return eT.ids.some(function (iE) { return dansP[iE]; }); }).map(function (eT) {
        return h("section", { key: "eq" + eT.id, "data-passerelle-team": eT.id, style: { margin: "14px 18px 0", padding: "16px 18px", borderRadius: 18, border: "1px solid rgba(201,166,107,0.18)", background: "linear-gradient(165deg, rgba(55,107,125,0.22) 0%, rgba(16,26,29,0.55) 50%, rgba(6,7,9,0.35) 100%)", boxShadow: "0 14px 34px rgba(0,0,0,0.5), inset 0 1px 0 rgba(243,238,228,0.05)", display: "flex", alignItems: "center", gap: 14 } },   /* (806) même encart pétrole ombré */
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: "#C9A66B" } }, eT.nom),
            h("div", { style: { marginTop: 6, fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.35, color: "rgba(243,238,228,0.84)" } },
              T("Découvrez les cavaliers qui montent ces chevaux, leurs rendez-vous et leurs résultats.", "Meet the riders of these horses, their events and their results.", "Descubre a los jinetes de estos caballos, sus citas y sus resultados.", "Scopri i cavalieri di questi cavalli, i loro appuntamenti e i loro risultati.", "この馬たちに乗るライダー、予定、成績をご覧ください。", "Entdecke die Reiter dieser Pferde, ihre Termine und Ergebnisse.", "اكتشف فرسان هذه الخيول ومواعيدهم ونتائجهم.", "认识骑这些马的骑手，看看他们的日程和成绩。", "Ontdek de ruiters die deze paarden rijden, hun afspraken en hun resultaten.", "Conheça os cavaleiros que montam estes cavalos, seus compromissos e seus resultados.", "Träffa ryttarna som rider de här hästarna, deras aktiviteter och deras resultat.", "Познакомься со всадниками, которые ездят на этих лошадях, их событиями и результатами.", "Poznaj jeźdźców tych koni, ich wydarzenia i wyniki.", "이 말들을 타는 기수들과 그들의 일정, 결과를 만나 보세요."))),
          h("button", { type: "button", onClick: function () { setEcran("team-competition"); }, style: { flex: "0 0 auto", minHeight: 40, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#D2B07A", fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, cursor: "pointer", whiteSpace: "nowrap" } },
            T("Découvrir la Team", "Discover the Team", "Descubrir el equipo", "Scopri la squadra", "チームを見る", "Team entdecken", "اكتشف الفريق", "发现战队", "De Team ontdekken", "Descobrir a Team", "Upptäck Teamet", "Познакомиться с командой", "Poznaj Team", "Team 둘러보기") + " ›"));
      }) : null,
      piqActifObj && piqActifObj.ids.length ? h("div", { style: { margin: "22px 18px 2px", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, fontWeight: 500, color: "#F3EEE4" } }, T("Nos chevaux", "Our horses", "Nuestros caballos", "I nostri cavalli", "私たちの馬", "Unsere Pferde", "خيولنا", "我们的马", "Onze paarden", "Nossos cavalos", "Våra hästar", "Наши лошади", "Nasze konie", "우리 말")) : null,
      h("div", { className: "ec2grid" },
        chevauxFeinnEH.map(function (s, iEH) {
          return h("article", { key: "eh2" + s.id, className: "ec2card", style: { animationDelay: (0.75 + iEH * 0.11).toFixed(2) + "s", borderColor: s.halo ? hexAEH(s.halo, 0.65) : undefined, boxShadow: s.halo ? ("0 0 22px " + hexAEH(s.halo, 0.4) + ", inset 0 0 14px " + hexAEH(s.halo, 0.12)) : undefined }, onClick: function () { try { window.__chevalOuvert = s.id; } catch (e) { } setEcran("cheval"); } },
            h("div", { className: "ph" }, h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(s.img, 220, 260) : s.img, alt: s.nom, loading: "lazy", decoding: "async", onError: function (eI) { try { var etR = eI.target.getAttribute("data-repli") || ""; if (!etR && s.img && eI.target.src !== s.img) { eI.target.setAttribute("data-repli", "o"); eI.target.src = s.img; } else if (etR !== "1" && typeof CHEVAL_DEFAUT !== "undefined") { eI.target.setAttribute("data-repli", "1"); eI.target.src = CHEVAL_DEFAUT; } } catch (eR) { } } }),   /* (836) vignette (et non la photo originale) : la grille ne sature plus la memoire de l iPhone ; repli original puis image par defaut */   /* 10/10 (818) photo introuvable (fichier efface du stockage, cas de Tully Blue Moon) : l image par defaut au lieu du « ? » */
              /* 30/08 (Blandine : « les + en bleu sur les photos, on peut les retirer ? ») —
                 RETIRE. C'etait un appel a une fonctionnalite non ouverte : il n'affichait
                 qu'un message « Bientot — ajoute-le a ton ecurie ». Un bouton qui ne fait
                 rien n'a rien a faire sur toutes les photos. La regle CSS .ec2plus est
                 laissee en place, inutilisee. */
              null),
            h("div", { className: "ic" + (s.fav ? " fav" : "") },
              s.fav ? h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.5 6.8 19.2l1-5.8-4.3-4.2 5.9-.9L12 3Z" }))
                    : h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 20s-6.5-4.3-9-8C1.5 9.5 3 6 6.2 6c1.9 0 3.1 1.1 3.8 2.1C10.7 7.1 11.9 6 13.8 6 17 6 18.5 9.5 17 12c-2.5 3.7-9 8-9 8z" }))),
            h("div", { className: "tx" },
              h("div", { className: "nm" }, s.nom),
              h("div", { className: "l2" }, s.l2),
              s.l3 ? h("div", { className: "l3" }, s.l3) : null));
        }).concat([
          piqActifObj ? null : h("article", { className: "ec2card add", key: "add", style: { animationDelay: "1.52s" }, onClick: function () { try { window.__creationChevalClub = (piqClub && piqClub.nom) || clubCtxEH || null; } catch (eCc2) { } if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }   /* (791) */ },
            h("div", { className: "art", style: { backgroundImage: "url(" + ECURIE_ADD_ART + ")" } }),
            h("div", { className: "pl" }, "+"),
            h("div", { className: "lb" }, T("Ajouter un cheval", "Add a horse", "Añadir un caballo", "Aggiungi un cavallo", "馬を追加", "Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646", "添加一匹马", "Een paard toevoegen", "Adicionar um cavalo", "Lägg till en häst", "Добавить лошадь", "Dodaj konia", "말 추가")))
        ]))),
    /* 14/09 (143) : la section « Les albums de l ecurie » est PARTIE dans la page Souvenirs
       du club (demande de Blandine). Son chargement (albumsEH) reste en place juste
       au-dessus, non nettoye : aucune suppression opportuniste, et il redeviendra utile si
       elle veut la section ici aussi. Remplacer ce false par (albumsEH && albumsEH.length)
       la rallume. */
    false ? h("div", { style: { margin: "34px 16px 0" } },
      h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 17, fontWeight: 700, color: "#F3EEE4", marginBottom: 4 } }, T("Les albums de l'écurie", "The stable's albums", "Los álbumes de la cuadra", "Gli album della scuderia", "厩舎のアルバム", "Die Alben des Stalls", "\u0623\u0644\u0628\u0648\u0645\u0627\u062a \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩的相册", "De albums van de stal", "Os álbuns da cocheira", "Stallets album", "Альбомы конюшни", "Albumy stajni", "마구간 앨범")),
      h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11.5, color: "rgba(243,238,228,0.84)", marginBottom: 14 } }, T("Les souvenirs partagés par les chevaux du club", "Memories shared by the club's horses", "Los recuerdos compartidos por los caballos del club", "I ricordi condivisi dai cavalli del club", "クラブの馬たちの思い出", "Erinnerungen der Pferde des Clubs", "\u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a \u0627\u0644\u062a\u064a \u0634\u0627\u0631\u0643\u062a\u0647\u0627 \u062e\u064a\u0648\u0644 \u0627\u0644\u0646\u0627\u062f\u064a", "俱乐部里的马分享的回忆", "Herinneringen gedeeld door de paarden van de manege", "As lembranças compartilhadas pelos cavalos do clube", "Minnen som klubbens hästar delat", "Воспоминания, которыми поделились лошади клуба", "Wspomnienia udostępnione przez konie klubu", "클럽의 말들이 공유한 추억")),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 } },
        albumsEH.map(function (aEH, iA) {
          var couvEH = (aEH.photos && aEH.photos[0]) || "";
          var idChEH = String(aEH.cible || "").replace("cheval:", "");
          return h("div", { key: "albEH" + (aEH.id || iA), role: "button", onClick: function () { try { window.__chevalOuvert = idChEH; } catch (eOc) { } setEcran("cheval"); }, style: { borderRadius: 16, overflow: "hidden", border: "1px solid rgba(201,166,107,0.22)", background: "rgba(255,255,255,0.03)", cursor: "pointer" } },
            h("div", { style: { width: "100%", aspectRatio: "1 / 1", background: "#0D1518" } },
              couvEH ? h("img", { src: (typeof vignetteHype === "function" ? vignetteHype(couvEH, 420, 420) : couvEH), alt: "", loading: "lazy", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null),
            h("div", { style: { padding: "9px 10px 11px" } },
              h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, color: "#F3EEE4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, aEH.nom || T("Album", "Album", "Álbum", "Album", "アルバム", "Album", "\u0623\u0644\u0628\u0648\u0645", "相册", "Album", "Álbum", "Album", "Альбом", "Album", "앨범")),
              h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.84)", marginTop: 2 } }, (aEH.photos ? aEH.photos.length : 0) + " " + T("souvenirs", "memories", "recuerdos", "ricordi", "思い出", "Erinnerungen", "\u0630\u0643\u0631\u064a\u0627\u062a", "个回忆", "herinneringen", "lembranças", "minnen", "воспоминания", "wspomnienia", "추억"))));
        }))) : null,
    toastEH ? h("div", { className: "ehyToast" }, toastEH) : null);
}
window.HypeEcurieHype = { EcurieHype: EcranEcurieHype };
})();
