/* HYPE ▸ 30/10/2026 — Page CAVALIER (EcranMonCavalier), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~233 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranMonCavalier() {
  /* 15/10 (1130) CAVALIER V2 SUR IPAD ET ORDINATEUR, BUILD 1 : les seuils de Hype (768 tablette, 1024 ordinateur), suivis en direct
     (rotation de l iPad, fenetre agrandie). En dessous de 768 px : rien ne change. */
  var cavTab = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;
  var cavOrdi = (typeof useHypeLarge === "function") ? useHypeLarge() : false;
  /* 22/10 (brief Blandine « Refonte responsive de la page Cavalier », proposition 3) : des 1200 px, mise en page ordinateur
     avec panneau lateral a gauche (profil + 6 acces), bandeau photo, chevaux en grille de 6, amis et resultats cote a cote.
     En dessous de 1200 px (iPad, petit ordinateur) : rien ne change. */
  var cavPanneau = (typeof useHypeLargeur === "function") ? useHypeLargeur(1200) : false;
  /* 22/10 23 h (corrections ordinateur de Blandine, point 7 : cartes chevaux « sensiblement » plus grandes) : 4 colonnes
     sur ordinateur comme sur grand ecran ; avant : 6. iPad : 4, inchange. */
  var cavTresLarge = (typeof useHypeLargeur === "function") ? useHypeLargeur(1800) : false;
  var cavColCh = 4;
  var cavGalerie = false;   /* calcule plus bas (une fois les chevaux connus) */   /* (la zone de contenu de l appli plafonne vers 1280 px, meme sur 1920 : 4 colonnes partout, cartes larges) */   /* colonnes de la grille des chevaux (tablette / ordinateur) */
  /* 05/10 (671) — PALETTE ALIGNEE sur Accueil / Ecurie / Communaute : turquoise -> champagne (#C5AA78, clair #C5AA78, bronze #AD8B57),
     blancs bleutes -> ivoire #F3EEE4, gris -> gris ivoire (#BDB6AA / #878D8E), fond #05080B. Couleurs seulement, dans cette page
     et ses blocs (EncartPhotoInvisible, BlocResultatsCavaliere, HypeAmisVitrine, PortraitChevalSpectral, EncreLumineuse). */
  var _efMC = React.useState(false), estFeinnMC = _efMC[0], setEstFeinnMC = _efMC[1];   /* 28/09 (494) */
  React.useEffect(function () { var okF = true; try { utilisateurActuel().then(function (uF) { if (okF) setEstFeinnMC(typeof estCompteFeinnHype === "function" && estCompteFeinnHype(uF)); }); } catch (eF) { } return function () { okF = false; }; }, []);
  /* 01/10 (524) — ACCES PROVISOIRE A LA PAGE TEAM COMPETITION. Blandine : « a cote de mon nom sur la page
     Cavalier, me permettant d acceder a la page competition ; on modifiera apres, mais au moins que je puisse
     aller sur la page sans avoir a demander l adresse ». Pastille visible SUR SA PROPRE PAGE seulement, et
     seulement pour la proprietaire / une gestionnaire de la SEP ou une membre du groupe « Team Competition »
     (la page reste cachee aux autres). Le vrai badge (Team / Coach) reste a decider. */
  var _tmA = React.useState(false), accesTeamMC = _tmA[0], setAccesTeamMC = _tmA[1];
  React.useEffect(function () { var okT = true; (async function () {
    try {
      var uT = await utilisateurActuel(); if (!uT || typeof supa === "undefined" || !supa) return;
      var clubT = (typeof TEAM_CLUB !== "undefined") ? TEAM_CLUB : "Societe d'Equitation de Paris (SEP)";
      var cleT = (typeof TEAM_CLE !== "undefined") ? TEAM_CLE : "societe d'equitation de paris (sep)";
      var nomGT = (typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : "Team Compétition";
      if (typeof clubRevendiquePar === "function" && clubRevendiquePar(clubT, uT)) { if (okT) setAccesTeamMC(true); return; }
      var rgT = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", cleT).eq("user_id", uT.id).limit(1);
      if (rgT && rgT.data && rgT.data.length) { if (okT) setAccesTeamMC(true); return; }
      var rgr = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id", cleT) : await supa.from("groupes").select("id").eq("club_clef", cleT).eq("nom", nomGT).maybeSingle();   /* (783) par la fiche */
      if (rgr && rgr.data && rgr.data.id) {
        var rmT = await supa.from("groupes_membres").select("user_id").eq("groupe_id", rgr.data.id).eq("user_id", uT.id).limit(1);
        if (okT && rmT && rmT.data && rmT.data.length) setAccesTeamMC(true);
      }
    } catch (eT) { }
  })(); return function () { okT = false; }; }, []);
  /* (684) Blandine : « a cote de leur pseudo une petite info, comme moi avec Coach, qui dise CSO Club et qui les emmene
     sur la page competition ». Role Team de la personne AFFICHEE (soi ou une visitee) : « coach » (proprietaire / gestionnaire
     de la SEP) ou « membre » (groupe « Team Competition »). Le badge n ouvre la page que pour qui y a deja acces (accesTeamMC). */
  var _rtA = React.useState(null), roleTeamAff = _rtA[0], setRoleTeamAff = _rtA[1];
  React.useEffect(function () { var okR = true; (async function () {
    try {
      if (typeof supa === "undefined" || !supa) return;
      var vpR = (typeof window !== "undefined" && window.__cavalierOuvert === "__public" && window.__cavalierPublic) ? window.__cavalierPublic : null;
      var uR = null, idR = null;
      if (vpR && vpR.id) { idR = vpR.id; } else { uR = await utilisateurActuel(); idR = uR && uR.id; }
      if (!idR) return;
      var clubR = (typeof TEAM_CLUB !== "undefined") ? TEAM_CLUB : "Societe d'Equitation de Paris (SEP)";
      var cleR = (typeof TEAM_CLE !== "undefined") ? TEAM_CLE : "societe d'equitation de paris (sep)";
      var nomGR = (typeof TEAM_NOM_GROUPE !== "undefined") ? TEAM_NOM_GROUPE : "Team Compétition";
      if (uR && typeof clubRevendiquePar === "function" && clubRevendiquePar(clubR, uR)) { if (okR) setRoleTeamAff("coach"); return; }
      var rgR = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", cleR).eq("user_id", idR).limit(1);
      if (rgR && rgR.data && rgR.data.length) { if (okR) setRoleTeamAff("coach"); return; }
      var rgrR = (typeof hypeRequeteTeam === "function") ? await hypeRequeteTeam("id", cleR) : await supa.from("groupes").select("id").eq("club_clef", cleR).eq("nom", nomGR).maybeSingle();   /* (783) par la fiche */
      if (rgrR && rgrR.data && rgrR.data.id) {
        var rmR = await supa.from("groupes_membres").select("user_id").eq("groupe_id", rgrR.data.id).eq("user_id", idR).limit(1);
        if (okR && rmR && rmR.data && rmR.data.length) setRoleTeamAff("membre");
      }
    } catch (eR) { }
  })(); return function () { okR = false; }; }, []);
  var _am = React.useState(null), amis = _am[0], setAmis = _am[1];
  var _al = React.useState(null), amisListe = _al[0], setAmisListe = _al[1];
  React.useEffect(function () { (async function () {
    try {
      var __vp = (typeof window !== "undefined" && window.__cavalierOuvert === "__public" && window.__cavalierPublic) ? window.__cavalierPublic : null;
      if (__vp && __vp.id) {
        if (typeof amisDe === "function") { var rv = await amisDe(__vp.id); if (rv) { setAmisListe(rv.data || []); setAmis((rv.data || []).length); } }
        return;
      }
      if (typeof mesAmis === "function") { var ra = await mesAmis(); if (ra) { setAmisListe(ra.data || []); setAmis((ra.data || []).length); } }
    } catch (e) { setAmisListe([]); }
  })(); }, []);
  var _pr = React.useState(null), profRecit = _pr[0], setProfRecit = _pr[1];
  var _ev = React.useState(false), editVoix = _ev[0], setEditVoix = _ev[1];
  var _vl = React.useState(""), voixLocal = _vl[0], setVoixLocal = _vl[1];
  /* 16/08 (feu vert de Blandine) : les etats du menu de l'en-tete. Poses EN
     DERNIER de ce trio, comme la regle du module stories l'impose pour le
     composeur -- meme discipline partout, un nouvel etat ne s'intercale
     jamais au milieu d'une liste existante.
     `menuOuvertProfil` : le panneau des actions.
     `demandeMusique` : un compteur, incremente a chaque demande du selecteur
     de chanson. Un compteur plutot qu'un booleen, pour pouvoir rouvrir le
     selecteur apres l'avoir ferme sans remise a zero. */
  var _mo = React.useState(false), menuOuvertProfil = _mo[0], setMenuOuvertProfil = _mo[1];
  /* 15/09 (197) : sa demande - NEUF chevaux au plus dans « Mes chevaux », le reste derriere
     un deroulant. L etat vit ICI, au niveau du composant : un hook ne peut pas vivre dans la
     fonction de rendu de la grille. */
  var _tcv = React.useState(false), tousChevauxVus = _tcv[0], setTousChevauxVus = _tcv[1];
  var _dm = React.useState(0), demandeMusique = _dm[0], setDemandeMusique = _dm[1];
  React.useEffect(function () { (async function () { try { var u = await utilisateurActuel(); if (!u) return; var r = await supa.from("profiles").select("*").eq("id", u.id).single(); if (r && r.data) setProfRecit(r.data); } catch (ePV) { } })(); }, []);
  var h = React.createElement;
  var ctx = useApp();
  var setEcran = ctx.setEcran, tr = ctx.tr, premium = ctx.premium, setPremium = ctx.setPremium;
  var _emAdm = React.useState(false), estModAdm = _emAdm[0], setEstModAdm = _emAdm[1];
  React.useEffect(function () { (async function () { try { var uAdm = await utilisateurActuel(); if (uAdm && typeof estModerateurHype === "function" && estModerateurHype(uAdm)) setEstModAdm(true); } catch (eAdm) { } })(); }, []);
  // --- Mode visite : profil d'un autre cavalier ---
  var __visitePub = (typeof window !== "undefined" && window.__cavalierOuvert === "__public" && window.__cavalierPublic) ? window.__cavalierPublic : null;
  var __estVisite = !!__visitePub;
  var _msgEnCours = React.useState(false), messageEnCours = _msgEnCours[0], setMessageEnCours = _msgEnCours[1];
  function ouvrirMessageAvecVisite() {
    if (!__visitePub || !__visitePub.id || messageEnCours) return;
    setMessageEnCours(true);
    demarrerConversationDM(__visitePub.id).then(function (r) {
      setMessageEnCours(false);
      if (r && r.error) { alert(r.error); return; }
      if (r && r.data) { try { window.__conversationOuverte = { id: r.data, type: "dm", autreId: __visitePub.id, autrePseudo: __visitePub.pseudo, autreAvatar: __visitePub.photo }; } catch (e) { } setEcran("messagerie"); }
    });
  }
  var _vP = React.useState(null), visiteChevaux = _vP[0], setVisiteChevaux = _vP[1];
  var _vR = React.useState(null), visiteResultats = _vR[0], setVisiteResultats = _vR[1];
  var _vF = React.useState(null), visiteProfilFull = _vF[0], setVisiteProfilFull = _vF[1];
  React.useEffect(function () {
    if (!__estVisite) return;
    (async function () {
      var uid = __visitePub && __visitePub.id;
      try {
        if (uid && typeof chevauxDe === "function") {
          var rc = await chevauxDe(uid);
          var tousChV = (rc && rc.data) ? rc.data.slice() : [];
          /* 01/09 : garde par identifiant en plus du filtre de la source — un
             cheval rattache par deux voies differentes resterait sinon possible. */
          try { if (uid && typeof chevauxLiesDe === "function") { var rln = await chevauxLiesDe(uid); if (rln && rln.data && rln.data.length) tousChV = tousChV.concat(rln.data); } } catch (eLnV) { }
          var vusChV = {}; tousChV = tousChV.filter(function (cV) { if (!cV || !cV.id || vusChV[cV.id]) return false; vusChV[cV.id] = true; return true; });
          setVisiteChevaux(tousChV);
        } else { setVisiteChevaux([]); }
      } catch (eCh) { setVisiteChevaux([]); }
      try {
        if (uid && typeof resultatsDe === "function") { var rr = await resultatsDe(uid); setVisiteResultats((rr && rr.data) || []); } else { setVisiteResultats([]); }
      } catch (eRe) { setVisiteResultats([]); }
      try {
        if (uid) { var rp = await supa.from("profiles").select("*").eq("id", uid).single(); if (rp && rp.data) setVisiteProfilFull(rp.data); }
      } catch (eVP) { }
    })();
  }, [__estVisite, (__visitePub && __visitePub.id) || ""]);
  // profil affiche : le visite (fiche complete recuperee en base, avec repli sur les infos minimales le temps du chargement) si en visite, sinon le mien
  var profil = __estVisite ? Object.assign({
    pseudo: __visitePub.pseudo || "Cavalier",
    prenom: __visitePub.pseudo || "Cavalier",
    nom: __visitePub.pseudo || "Cavalier",
    avatar: __visitePub.photo || null,
    avatar_url: __visitePub.photo || null,
    photo: __visitePub.photo || null,
    club: __visitePub.club || __visitePub.ecurie || "",
    ecurie: __visitePub.ecurie || "",
    ville: __visitePub.ville || ""
  }, visiteProfilFull || {}, { avatar: (visiteProfilFull && visiteProfilFull.avatar_url && typeof avSrc === "function") ? avSrc(visiteProfilFull.avatar_url) : (__visitePub.photo || null) }) : ctx.profil;
  var setProfil = __estVisite ? function () {} : ctx.setProfil;
  var _sug = React.useState([]), suggestions = _sug[0], setSuggestions = _sug[1];
  var _svV2 = React.useState({}), suivisV2 = _svV2[0], setSuivisV2 = _svV2[1];   /* 14/10 (1109) Cavalier V2 : « Suivre » pose depuis « Ses amis » */
  /* 14/10 (1110) Blandine : « pour les amis on a dit ceux avec le plus gros niveau en premier, pour favoriser d avoir des images
     et des gens actifs ». Meme source que la page Ecurie : rpc hype_ordre_cavaliers_xp (rang XP par cavalier). Sans reponse : ordre actuel. */
  var _oxV2 = React.useState(null), ordreXpV2 = _oxV2[0], setOrdreXpV2 = _oxV2[1];
  React.useEffect(function () {
    var vifX = true;
    (async function () {
      try {
        var idsX = [], vusX = {};
        (amisListe || []).concat(suggestions || []).forEach(function (pX) { var iX = pX && pX.id ? String(pX.id) : ""; if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(iX) || vusX[iX]) return; vusX[iX] = true; idsX.push(iX); });
        if (idsX.length < 2 || typeof supa === "undefined" || !supa) return;
        var rX = await supa.rpc("hype_ordre_cavaliers_xp", { ids: idsX });
        if (!vifX || !rX || rX.error) return;
        var cX = {}; (rX.data || []).forEach(function (l) { if (l && l.user_id != null && l.rang != null) cX[String(l.user_id)] = Number(l.rang); });
        setOrdreXpV2(Object.keys(cX).length ? cX : null);
      } catch (eX) { }
    })();
    return function () { vifX = false; };
  }, [amisListe, suggestions]);
  React.useEffect(function () { (async function () {
    try {
      if (__estVisite || typeof listerCavaliers !== "function") { setSuggestions([]); return; }
      var rs = await listerCavaliers({ limite: 24 });
      var liste = (rs && rs.data) || [];
      var monClubS = (((ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || "").trim().toLowerCase());
      if (monClubS) {
        liste.sort(function (a, b) {
          var ca = String((a.ecurie || "")).trim().toLowerCase() === monClubS ? 0 : 1;
          var cb = String((b.ecurie || "")).trim().toLowerCase() === monClubS ? 0 : 1;
          return ca - cb;
        });
      }
      setSuggestions(liste.slice(0, 12));
    } catch (eS) { setSuggestions([]); }
  })(); }, [__estVisite, (ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || ""]);
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (411) : arabe */
  // Voile "priv\u00e9" : grise + floute + cadenas, non cliquable (mode visite uniquement)
  function __verrou(contenu, label) {
    if (!__estVisite) return contenu;
    return h("div", { style: { position: "relative" } },
      h("div", { style: { pointerEvents: "none" }, "aria-hidden": "true" }, contenu),
      h("div", { style: { position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, background: "rgba(5,8,11,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(197,170,120,0.27)", zIndex: 4 } },
        h("span", { style: { fontSize: 12 } }, "\ud83d\udd12"),
        h("span", { style: { fontSize: 11, fontWeight: 700, color: "#F3EEE4", fontFamily: M, letterSpacing: 0.5 } }, label || T("Priv\u00e9", "Private", "Privado", "Privato", "\u975e\u516c\u958b", "Privat", "\u062e\u0627\u0635", "私密", "Privé", "Privado", "Privat", "Приватно", "Prywatne", "비공개"))));
  }
  var _chEcP = React.useState([]); var chevauxEcurieP = _chEcP[0], setChevauxEcurieP = _chEcP[1];
  React.useEffect(function () { (async function () {
    try {
      var clubP = (((ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || "").trim());
      if (!clubP) { setChevauxEcurieP([]); return; }
      var uMoiP = null; try { uMoiP = await utilisateurActuel(); } catch (eU) { }
      var rP = await chevauxDeLEcurie(clubP, uMoiP ? uMoiP.id : null);
      setChevauxEcurieP((rP && rP.data) || []);
    } catch (eP) { setChevauxEcurieP([]); }
  })(); }, [(ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || ""]);
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var __thh = (typeof teinteHypeActive === "function") ? teinteHypeActive() : null;
  var TURQ = (__thh && __thh.principal) || "#C5AA78", TURQL = TURQ;   /* (674) un seul champagne mat sur cette page */
  function __ta(a) { try { var hx = TURQ.replace("#", ""); return "rgba(" + parseInt(hx.slice(0,2),16) + "," + parseInt(hx.slice(2,4),16) + "," + parseInt(hx.slice(4,6),16) + "," + a + ")"; } catch (e) { return "rgba(197,170,120," + a + ")"; } }
  var fileRef = React.useRef(null);
  var _moiAlb = React.useState(null); var moiIdAlb = _moiAlb[0], setMoiIdAlb = _moiAlb[1];
  React.useEffect(function () { (async function () { try { var uA = await utilisateurActuel(); setMoiIdAlb(uA ? uA.id : null); } catch (eA) { } })(); }, []);
  /* 21/10 (Blandine, brief « groupes cavaliers ») : LES GROUPES D ECURIE DU CAVALIER. Rien n est recopié dans le
     profil : on lit groupes_membres (son identifiant) joint à groupes, puis on garde seulement les groupes de SES
     écuries (même clé de club que la page Écurie : hypeClefClubPiquets), écurie principale d abord, puis l ordre
     de la gestion des groupes. Retirer le cavalier d un groupe, ou supprimer le groupe (cascade), fait disparaître
     la ligne d elle-même. Lecture soumise à la RLS existante, rien n est contourné. */
  var uidGrp = __estVisite ? (__visitePub && __visitePub.id) : moiIdAlb;
  var nomGrp1 = String((profil && (profil.club || profil.ecurie)) || "").trim();
  var nomGrp2 = String((profil && (profil.club2 || profil.ecurie2)) || "").trim();
  var _grpCav = React.useState([]); var groupesCav = _grpCav[0], setGroupesCav = _grpCav[1];
  React.useEffect(function () {
    var vivant = true;
    if (!uidGrp || (!nomGrp1 && !nomGrp2) || typeof supa === "undefined" || !supa || typeof hypeClefClubPiquets !== "function") { setGroupesCav([]); return; }
    (async function () {
      try {
        var r = await supa.from("groupes_membres").select("groupe_id, groupes(id, nom, nature, club_clef, discipline, niveau, saison, photo_url, ordre, cree_le)").eq("user_id", uidGrp);
        if (!vivant || !r || r.error || !Array.isArray(r.data)) { if (vivant) setGroupesCav([]); return; }
        /* 22/10 15 h 41 (Blandine : « le créateur d un groupe en fait toujours partie », option A) : les groupes CRÉÉS par
           ce cavalier s affichent aussi ici, sans qu il soit inscrit dans groupes_membres (il n apparaît donc ni dans la
           liste des cavalières ni dans les effectifs). Même filtre d écurie que les groupes dont il est membre. */
        try {
          var rc = await supa.from("groupes").select("id, nom, nature, club_clef, discipline, niveau, saison, photo_url, ordre, cree_le").eq("cree_par", uidGrp);
          if (vivant && rc && !rc.error && Array.isArray(rc.data)) rc.data.forEach(function (g) { r.data.push({ groupe_id: g.id, groupes: g }); });
        } catch (eCr) { }
        if (!vivant) return;
        var k1 = nomGrp1 ? hypeClefClubPiquets(nomGrp1) : null, k2 = nomGrp2 ? hypeClefClubPiquets(nomGrp2) : null;
        var vus = {}, l = [];
        r.data.forEach(function (x) {
          var g = x && x.groupes; if (!g || !g.id || vus[g.id]) return;
          var rang = (k1 && g.club_clef === k1) ? 0 : ((k2 && g.club_clef === k2 && k2 !== k1) ? 1 : -1);
          if (rang < 0) return;   /* groupe d une écurie qui n est plus la sienne : on ne l affiche pas */
          vus[g.id] = true;
          l.push(Object.assign({}, g, { __rang: rang, __club: rang === 0 ? nomGrp1 : nomGrp2 }));
        });
        l.sort(function (a, b) { return (a.__rang - b.__rang) || ((a.ordre == null ? 9999 : a.ordre) - (b.ordre == null ? 9999 : b.ordre)) || String(a.cree_le || "").localeCompare(String(b.cree_le || "")) || String(a.nom || "").localeCompare(String(b.nom || "")); });
        if (vivant) setGroupesCav(l);
      } catch (eG) { if (vivant) setGroupesCav([]); }
    })();
    return function () { vivant = false; };
  }, [uidGrp, nomGrp1, nomGrp2]);
  var _albO = React.useState(false); var albumOuvert = _albO[0], setAlbumOuvert = _albO[1];
  function appliquerNouvelAvatar(res) {
    if (!res) return;
    /* 28/07 : on lisait seulement avatar_url — or il n etait jamais restaure depuis la base (colonne
       lue sous le mauvais nom, corrige le meme jour), donc « ancien » valait null et l ancienne photo
       n arrivait JAMAIS dans l album. On prend desormais la meilleure valeur disponible. */
    var ancien = (ctx.profil && (ctx.profil.avatar_url || ctx.profil.avatar)) || null;
    setProfil(function (pp) { return Object.assign({}, pp, { avatar: res.dataUrl }); });
    try { if (res.original) localStorage.setItem("hype_avatar_original", res.original); if (res.dataUrl) localStorage.setItem("hype_avatar_original_pour", String(res.dataUrl).slice(0, 100)); } catch (eO) { }
    hypeEnregistrerPhoto("avatar", null, res, ancien).then(function (urlFinale) {
      setProfil(function (pp) { return Object.assign({}, pp, { avatar_url: urlFinale }); });
    }).catch(function (err) {
      console.error("Echec enregistrement photo de profil", err);
      try { window.alert(tr({ fr: "La photo n'a pas pu être enregistrée. Vérifie ta connexion et réessaie.", en: "The photo could not be saved. Check your connection and try again.", es: "No se pudo guardar la foto. Comprueba tu conexión e inténtalo de nuevo.", it: "Impossibile salvare la foto. Controlla la connessione e riprova.", ja: "写真を保存できませんでした。接続を確認して再試行してください。", de: "Das Foto konnte nicht gespeichert werden. Prüfe deine Verbindung und versuche es erneut.", ar: "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629. \u062a\u062d\u0642\u0642\u064a \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648\u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", zh: "照片保存失败。请检查网络连接后再试。", nl: "De foto kon niet worden opgeslagen. Controleer je verbinding en probeer het opnieuw.", pt: "Não foi possível salvar a foto. Verifique sua conexão e tente de novo.", sv: "Fotot kunde inte sparas. Kontrollera din anslutning och försök igen.", ru: "Не удалось сохранить фото. Проверь соединение и попробуй ещё раз.", pl: "Nie udało się zapisać zdjęcia. Sprawdź połączenie i spróbuj ponownie.", ko: "사진을 저장하지 못했어요. 연결을 확인하고 다시 시도해 주세요." })); } catch (eAl) { }
    });
  }
  /* 28/07 : l ancien repli FileReader posait la photo EN LOCAL seulement (jamais envoyee en base).
     Il etait de fait inatteignable — hypeRecadrer est une fonction globale, la condition etait
     toujours vraie — mais il ressemblait a un chemin valide : supprime.
     hypeRecadrer resout null si le recadreur n est pas pret (ou si l utilisateur annule) : dans le
     premier cas la photo etait perdue SANS AUCUN MESSAGE. On le dit maintenant. */
  function choisirPhoto(e) {
    var f = e.target.files && e.target.files[0];
    try { e.target.value = ""; } catch (eV) { }
    if (!f) return;
    if (typeof hypeRecadrer !== "function" || typeof __recadrageOuvrir === "undefined" || !__recadrageOuvrir) {
      try { window.alert(tr(HYPE_TXT_RECADREUR)); } catch (eA) { }
      return;
    }
    /* ⚠️ 17/08 (session 138) — LA TEINTE MANQUAIT ICI. Constat de Blandine :
       « les images de profil ne sont pas toutes codees pareil ». Verifie : sur les
       SIX appels au recadreur, l ecurie (28250) et le cheval (31097) passent une
       teinte, l avatar et la banniere de club n en passaient AUCUNE. Sans elle,
       `HB` retombe sur la valeur en dur "#C5AA78" (ligne 29089) et le cadre de ces
       deux ecrans reste turquoise QUEL QUE SOIT le theme du cavalier. TURQ est la
       teinte de la page, deja calculee plus haut dans ce meme composant. */
    hypeRecadrer(f, 1, { teinte: TURQ }).then(function (res) {
      if (!res) return;                 /* annulation volontaire : rien a dire */
      appliquerNouvelAvatar(res);
    });
  }
  function modifierPhoto() {
    var origSauve = null; try { origSauve = localStorage.getItem("hype_avatar_original"); var avAct = (ctx.profil && (ctx.profil.avatar_url || ctx.profil.avatar)) || ""; var pourAv = localStorage.getItem("hype_avatar_original_pour"); if (origSauve && pourAv && String(avAct).slice(0, 100) !== pourAv) { localStorage.removeItem("hype_avatar_original"); localStorage.removeItem("hype_avatar_original_pour"); origSauve = null; } } catch (eO2) { } /* 30/07 : plus de photo fantome */
    var src = origSauve || (ctx.profil && ctx.profil.avatar_url) || (ctx.profil && ctx.profil.avatar);
    if (!src || typeof hypeRecadrerDepuisSource !== "function") return;
    /* 17/08 : meme correctif que choisirPhoto — la teinte manquait aussi a la reprise. */
    hypeRecadrerDepuisSource(src, 1, { teinte: TURQ }).then(function (res) { if (res) appliquerNouvelAvatar(res); });
  }
  var _mr = React.useState([]), resReels = _mr[0], setResReels = _mr[1];
  React.useEffect(function () { (async function () { try { if (typeof mesResultats === "function" && typeof supa !== "undefined") { var r = await mesResultats(); if (r && r.data && r.data.length) setResReels(r.data); } } catch (e) {} })(); }, []);
  var resActifs = __estVisite ? (visiteResultats || []) : resReels;
  var _pn = String((profil.prenom || profil.pseudo || "")).trim().toLowerCase();
  var pal = [];
  for (var hid in CHEVAUX_FICHE) { var ch = CHEVAUX_FICHE[hid]; if (ch && ch.palmares) { for (var kk = 0; kk < ch.palmares.length; kk++) { var r = ch.palmares[kk]; var _rc = String(r.cav || "").toLowerCase(); var _nomCav = (typeof CAVALIERS !== "undefined" && CAVALIERS[r.cav] && CAVALIERS[r.cav].nom) ? String(CAVALIERS[r.cav].nom).toLowerCase() : ""; if (_pn && (_rc === _pn || (_nomCav && _nomCav.indexOf(_pn) === 0))) { pal.push({ annee: r.annee, event: r.event, rang: r.rang, disc: (r.ds || "").split(" \u00b7 ")[0], chevalNom: ch.nom, chevalId: hid }); } } } }
  pal.sort(function (a, b) { return (parseInt(b.annee) || 0) - (parseInt(a.annee) || 0); });
  if (resActifs.length) {
    var reels = resActifs.filter(function (r) { return String(r.classement || "").trim() !== "" && String(r.concours || "").trim() !== ""; }).map(function (r) { var d = new Date(r.created_at); return { annee: String(d.getFullYear()), event: r.concours || "", rang: r.classement || "", auth: true, disc: "", chevalNom: "", chevalId: null, reel: true }; });
    pal = reels.concat(pal.filter(function (p) { return !p.reel; }));
  }
  var podiums = pal.filter(function (r) { return /^(1|2|3)/.test(r.rang); }).length;
  var _mc = React.useState(null), chevauxReels = _mc[0], setChevauxReels = _mc[1];
  var _mcU = React.useState(null), moiCav = _mcU[0], setMoiCav = _mcU[1];
  /* 03/09 (Blandine : « tous les chevaux des deux ecuries se melangent sur ma
     page perso au lieu d etre separes par ecurie selectionnee ») — cette grille
     concatenait mesChevaux() + mesChevauxLies() SANS jamais regarder le club du
     cheval, contrairement a la page club qui passe par hypeChevauxDuClub depuis
     le 03/09. Un choix d ecurie est donc pose au-dessus de la grille, avec la
     MEME fonction unique — jamais une regle de club reecrite ici.
     ⚠️ Ce hook reste au-dessus de tout return anticipe. */
  var _ecS = React.useState(""); var ecurieSel = _ecS[0], setEcurieSel = _ecS[1];
  /* 14/10 (1108) Cavalier V2 : les deux fiches a decouvrir quand le cavalier n a encore aucun cheval (Hey Baby Please et Rizotto
     d Emery, leurs VRAIES fiches publiques, cherchees par leur nom). Rien n est cree ni modifie ; si la lecture echoue, la grille
     garde seulement la carte de l ecurie et l ajout. */
  var _dcV2 = React.useState(null), decouverteV2 = _dcV2[0], setDecouverteV2 = _dcV2[1];
  React.useEffect(function () {
    if (decouverteV2 !== null) return;
    if (!(chevauxReels && chevauxReels.length === 0)) return;
    var vifD = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (vifD) setDecouverteV2([]); return; }
        var rD = await supa.from("chevaux").select("id, nom, photo_url, race, age, discipline").or("nom.ilike.hey baby please,nom.ilike.rizotto d_emery,nom.ilike.rizotto d\u2019emery").limit(6);
        var vusD = {}, listeD = [];
        ((rD && rD.data) || []).forEach(function (cD) { var kD = String(cD.nom || "").toLowerCase().slice(0, 6); if (!vusD[kD]) { vusD[kD] = true; listeD.push(cD); } });
        listeD.sort(function (a, b) { return /hey/i.test(a.nom) ? -1 : (/hey/i.test(b.nom) ? 1 : 0); });
        if (vifD) setDecouverteV2(listeD.slice(0, 2));
      } catch (eD) { if (vifD) setDecouverteV2([]); }
    })();
    return function () { vifD = false; };
  }, [chevauxReels]);  React.useEffect(function () { (async function () {
    try {
      var u = await utilisateurActuel(); setMoiCav(u || null);
      if (typeof mesChevaux === "function" && typeof supa !== "undefined") { var rc = await mesChevaux(); var tousCh = (rc && rc.data) ? rc.data.slice() : []; try { if (typeof mesChevauxLies === "function") { var rln = await mesChevauxLies(); if (rln && rln.data && rln.data.length) tousCh = tousCh.concat(rln.data); } } catch (eLn) { } /* 01/09 (Blandine : « les chevaux avaient disparu et ils sont revenus d'un coup ») — AFFICHER D'ABORD, CLASSER ENSUITE. Le classement XP lance cinq requetes : tant qu'elles tournaient, la liste restait vide — grille du club sans rien, et sur la page Cavalier le vide faisait remonter les fiches de DEMONSTRATION. La liste est donc posee immediatement dans l'ordre de la base, puis reposee classee quand le classement revient. Ne jamais remettre le tri AVANT le premier affichage. */ /* 03/09 : on affiche dans l ORDRE MEMORISE (plus de sautillement), puis le
         classement frais est memorise — et applique tout de suite SEULEMENT si
         un seul cheval a bouge. Voir hypeOrdreMemoAppliquer. */
      var afficheCh = (typeof hypeOrdreMemoAppliquer === "function") ? hypeOrdreMemoAppliquer(tousCh, "mes-chevaux") : tousCh;
      setChevauxReels(afficheCh);
      try {
        var triCh = await classerChevauxParXp(tousCh);
        if (triCh && triCh.length) {
          try { hypeOrdreMemoPoser("mes-chevaux", triCh); } catch (eOp) { }
          var bouges = (typeof hypeOrdreDeplacements === "function") ? hypeOrdreDeplacements(afficheCh, triCh) : 99;
          if (bouges > 0 && bouges <= 2) setChevauxReels(triCh);
        }
      } catch (eXc) { } }
    } catch (e) {}
  })(); }, []);
  var estCompteFeinn = estCompteFeinnHype(moiCav);
  /* 02/08 : chevaux fantomes (bug signale par Blandine). Les 7 fiches de demonstration de
     CHEVAUX_FICHE sont ajoutees a la liste pour le compte Feinn, MAIS ces memes chevaux ont ete
     migres en base : chacun apparaissait donc deux fois, une carte demo et une carte reelle.
     On ecarte desormais une fiche demo des lors qu un cheval du meme nom existe en base. Une
     fiche demo sans equivalent reel reste affichee : rien n est perdu.
     Au passage, mesChevaux() et mesChevauxLies() sont concatenes sans dedoublonnage en amont —
     un cheval a la fois possede et rattache apparaissait aussi deux fois. Dedoublonne par id. */
  var nomsReels = {};
  (chevauxReels || []).forEach(function (rN) { try { if (rN && rN.nom) nomsReels[String(rN.nom).trim().toLowerCase()] = true; } catch (eNr) { } });
  var chevauxDemo = estCompteFeinn ? Object.keys(CHEVAUX_FICHE).map(function (id) { return { id: id, ch: CHEVAUX_FICHE[id] }; }).filter(function (x) { return x.ch && !nomsReels[String((x.ch.nom || "")).trim().toLowerCase()]; }) : [];
  var vusPerso = {};
  /* les ecuries du cavalier, dans l ordre : son club, puis sa deuxieme ecurie */
  var mesEcuries = [];
  try {
    var _e1 = String((profil.club || profil.ecurie || "")).trim();
    var _e2 = String((profil.club2 || profil.ecurie2 || "")).trim();
    if (_e1) mesEcuries.push(_e1);
    if (_e2 && _e2.toLowerCase() !== _e1.toLowerCase()) mesEcuries.push(_e2);
  } catch (eMe) { }
  /* par defaut : la premiere ecurie. « Toutes » reste a un doigt.
     ⚠️ Regle de Blandine inchangee (hypeMemeClub) : un cheval SANS club
     apparait dans les deux ecuries ; seul un cheval rattache a l AUTRE club
     sort de la grille. */
  var ecChoisie = ecurieSel || (mesEcuries.length > 1 ? mesEcuries[0] : "__toutes__");
  /* 27/09 (450) : quand la carte du milieu « Les chevaux de l ecurie » est affichee (sa page, avec
     une ecurie), la grille montre UN CHEVAL DE MOINS (8 au lieu de 9) pour rester en 3 x 3 ; le 9e
     passe dans « Voir les autres ». Blandine : « il faut qu il passe un cheval supplementaire a
     deplier ». En visite (pas de carte) : 9, inchange. */
  var clubCarteMil = (!__estVisite) ? ((ecChoisie && ecChoisie !== "__toutes__") ? ecChoisie : String((ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || "").trim()) : "";
  var PLAFOND_CHV = cavTab ? (clubCarteMil ? 7 : 8) /* 15/10 (1133) iPad / ordinateur : 4 colonnes, 8 cases au plus */ : (clubCarteMil ? 8 : 9);
  var filtreEc = (!__estVisite && mesEcuries.length > 1 && ecChoisie !== "__toutes__");
  var chevauxSource = filtreEc && typeof hypeChevauxDuClub === "function"
    ? hypeChevauxDuClub(chevauxReels || [], ecChoisie)
    : (chevauxReels || []);
  var chevauxPerso = (chevauxSource || []).filter(function (rP) { if (!rP || !rP.id || vusPerso[rP.id]) return false; vusPerso[rP.id] = true; return true; }).map(function (r) { return { id: r.id, lien: !!r.__lien, ch: { nom: r.nom, photo: r.photo_url, info: [r.race, r.age, r.discipline].filter(Boolean).join(" \u00b7 "), flots: [] } }; });
  var chevaux = chevauxDemo.concat(chevauxPerso); var chevauxVisite = (visiteChevaux || []).map(function (r) { return { id: r.id, lien: false, ch: { nom: r.nom, photo: r.photo_url, info: [r.race, r.age, r.discipline].filter(Boolean).join(" · "), flots: [] } }; });
  cavGalerie = !!cavPanneau && ((__estVisite ? chevauxVisite : chevaux).length > 0);   /* 22/10 : galerie horizontale sur ordinateur (>= 1200 px) */
  var serie = (ctx.serie != null) ? ctx.serie : 0;
  function ouvrirCheval(id) { return function () { if (typeof window !== "undefined") { window.__chevalOuvert = id; } setEcran("cheval"); }; }
  var coeurIco = h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: TURQ }, h("path", { d: "M12 21 C12 21 4 14.5 4 9 C4 6 6.2 4 9 4 C10.6 4 12 5 12 6.2 C12 5 13.4 4 15 4 C17.8 4 20 6 20 9 C20 14.5 12 21 12 21 Z" }));
  function statCell(valeur, label, sub, petit, col) {
    return h("div", { style: { textAlign: "center", padding: "14px 6px", borderRadius: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", minWidth: 0 } },
      h("div", { style: { fontFamily: C, fontSize: petit ? 13 : 20, fontWeight: 700, color: col || "#F3EEE4", lineHeight: 1.15, whiteSpace: petit ? "normal" : "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, valeur),
      h("div", { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: TURQL, marginTop: 5, fontFamily: M } }, label),
      sub ? h("div", { style: { fontSize: 10, color: "#878D8E", marginTop: 2, fontFamily: M, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sub) : null);
  }
  function eyebrow(label, actLabel, onAct) {
    return h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
      h("div", { style: { fontFamily: C, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" } }, label),
      actLabel ? h("button", { onClick: onAct || function () {}, style: { background: "none", border: "none", color: TURQL, fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer", padding: 0 } }, actLabel + " \u203a") : null);
  }
  /* ===== 02/08 : SECTIONS « PROCHAINEMENT » MASQUEES (demande Blandine) =====
     « Vire tous les trucs de quêtes, de hauts faits, de badges — passe-les en invisible et
     garde-les juste en suivi. Je ne veux plus que ça pourrisse les pages. »
     Elles n etaient deja visibles que par les moderateurs (estModAdm), c est pourquoi Blandine
     les voyait et pas les cavaliers. Elles sont maintenant masquees POUR TOUT LE MONDE.
     Rien n est supprime : le constructeur sectionBientot et les quatre appels restent en place,
     seul cet interrupteur les eteint. Pour les rallumer, passer la constante a true.
     IMPORTANT : la montee de niveau et l XP ne sont PAS touches — ils continuent de se calculer
     en arriere-plan, comme demande. Seul l affichage de ces quatre blocs disparait.
     À CONSTRUIRE ENSUITE (voir SUIVI) : « Dernieres performances » avec le choix du cavalier de
     la remplir ou de la masquer (tous n aiment pas la competition), et « Passeport equestre »
     qui devient une page « Mon parcours » — globe + parcours date, avec resume en drapeaux sous
     le titre de la page Cavalier. */
  var AFFICHER_SECTIONS_BIENTOT = false;
  function sectionBientot(titre) {
    return h("div", { style: { padding: "26px 16px 0" } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 11 } },
        h("div", { style: { fontFamily: C, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", color: "#6E6A62" } }, titre),
        h("span", { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "#6E6A62", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "3px 9px", fontFamily: M } }, T("Prochainement", "Coming soon", "Pr\u00f3ximamente", "Prossimamente", "\u8fd1\u65e5\u516c\u958b", "Demnächst", "\u0642\u0631\u064a\u0628\u0627", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개"))),
      h("div", { style: { height: 74, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("div", { style: { fontSize: 11.5, color: "#6E6A62", fontFamily: M } }, T("\u2727 En pr\u00e9paration dans l'\u00e9curie Hype", "\u2727 In preparation at the Hype stable", "\u2727 En preparaci\u00f3n", "\u2727 In preparazione", "\u2727 \u6e96\u5099\u4e2d", "\u2727 In Vorbereitung im Hype-Stall", "\u2727 \u0642\u064a\u062f \u0627\u0644\u062a\u062d\u0636\u064a\u0631 \u0641\u064a \u0625\u0633\u0637\u0628\u0644 Hype", "✧ Hype 马厩筹备中", "✧ In voorbereiding in de Hype-stal", "✧ Em preparação na cocheira do Hype", "✧ Under förberedelse i Hype-stallet", "✧ Готовится в конюшне Hype", "✧ W przygotowaniu w stajni Hype", "✧ Hype 마구간에서 준비 중"))));
  }
  var prenom = ((profil.prenom || profil.pseudo || "").trim()) || T("Cavalier", "Rider", "Jinete", "Cavaliere", "\u9a0e\u624b", "Reiter", "\u0641\u0627\u0631\u0633\u0629", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수");
  var ecSt = React.useState(false); var editClub = ecSt[0], setEditClub = ecSt[1];
  var psSt = React.useState(false); var editPseudo = psSt[0], setEditPseudo = psSt[1];
  var plSt = React.useState(""); var pseudoLocal = plSt[0], setPseudoLocal = plSt[1];
  var pmSt = React.useState(null); var msgPseudo = pmSt[0], setMsgPseudo = pmSt[1];
  var pbSt = React.useState(false); var occupePseudo = pbSt[0], setOccupePseudo = pbSt[1];
  /* 18/08 : le renommage passe DESORMAIS par hype_changer_pseudo.
     Blandine : « il peut se renommer et aller poster partout, c'est pas
     acceptable ». Premier changement gratuit, puis 7 jours. La regle vit en
     base ; ici on affiche seulement ce qu'elle repond. L ecran ne se ferme
     plus tout seul : en cas de refus le cavalier doit lire pourquoi. */
  function sauverPseudo() {
    var nom = (pseudoLocal || "").trim();
    if (!nom) { setEditPseudo(false); return; }
    if (occupePseudo) return;
    setOccupePseudo(true); setMsgPseudo(null);
    (async function () {
      var r = { ok: false, code: "reseau" };
      try { if (typeof hypeAppelChangement === "function") r = await hypeAppelChangement("hype_changer_pseudo", nom); } catch (eA) { }
      setOccupePseudo(false);
      if (r && r.ok) {
        var v = r.pseudo || nom;
        setProfil(function (pp) { return Object.assign({}, pp, { prenom: v, pseudo: v }); });
        setMsgPseudo(null); setEditPseudo(false);
        return;
      }
      if (r && r.code === "identique") { setEditPseudo(false); return; }
      var lgP = "fr"; try { lgP = (ctx && ctx.langue) ? ctx.langue : "fr"; } catch (eL) { }
      setMsgPseudo((typeof hypeMessageChangement === "function")
        ? hypeMessageChangement(r && r.code, lgP, r && r.prochain_le) : "");
    })();
  }
  var elSt = React.useState({ club: profil.club || "" }); var clubLocal = elSt[0], setClubLocal = elSt[1];
  /* 13/10 (1095) « Renseigner mon ecurie » depuis Mes chevaux : ouvre directement le choix du club (une seule fois) */
  React.useEffect(function () { try { if (window.__hypeOuvrirChoixClub) { window.__hypeOuvrirChoixClub = false; if (!(profil.club || profil.ecurie)) { setClubLocal({ club: "" }); setEditClub(true); } } } catch (eOC) { } }, []);
  function sauverClub(nomForce) {
    var nom = (nomForce !== undefined ? nomForce : (clubLocal.club || "")).trim();
    setProfil(function (pp) { return Object.assign({}, pp, { club: nom, ecurie: nom }); });
    /* 06/09 : si la base a aligne le nom sur l'orthographe majoritaire (« Sep » ->
       « Societe d'Equitation de Paris (SEP) »), l'ecran reprend CE nom-la, sinon la
       cavaliere verrait sa coquille jusqu'a la prochaine ouverture de l'app. */
    try { if (typeof majProfil === "function" && typeof supa !== "undefined") majProfil({ ecurie: nom || null }).then(function (rC) { try { var poseC = (rC && rC.data && rC.data.ecurie != null) ? String(rC.data.ecurie).trim() : ""; if (poseC && poseC !== nom) { setProfil(function (pp) { return Object.assign({}, pp, { club: poseC, ecurie: poseC }); }); setClubLocal({ club: poseC }); } } catch (ePc) { } }).catch(function () { }); } catch (eC) { }
    setEditClub(false);
  }
  var ec2St = React.useState(false); var editClub2 = ec2St[0], setEditClub2 = ec2St[1];
  var el2St = React.useState({ club: profil.club2 || profil.ecurie2 || "" }); var club2Local = el2St[0], setClub2Local = el2St[1];
  function sauverClub2(nomForce) {
    var nom = (nomForce !== undefined ? nomForce : (club2Local.club || "")).trim();
    setProfil(function (pp) { return Object.assign({}, pp, { club2: nom, ecurie2: nom }); });
    /* 01/09 (Blandine) — LE SILENCE EST SUPPRIME. Ce `.catch()` etait VIDE : si
       l'enregistrement echouait, le nom restait dans le profil LOCAL et la
       colonne `ecurie2` restait vide en base. C'est exactement ce qui lui est
       arrive — sa deuxieme ecurie s'affichait sur son telephone alors que la
       base ne la connaissait pas, donc la page de ce club ne la comptait pas
       parmi ses membres et le choix d'ecurie ne lui etait jamais propose.
       ⚠️ ON RELIT LA BASE APRES L'ECRITURE. Une reponse sans erreur ne prouve
       pas que la valeur est posee ; seule la relecture le prouve.
       ⚠️ ON DIT CE QUI A ECHOUE, avec la raison — meme regle que la banniere de
       club le 14/08 : un message passe-partout envoie chercher une panne de
       connexion qui n'existe pas.
       ⚠️ L'AFFICHAGE LOCAL N'EST PAS ANNULE : le nom reste a l'ecran, elle
       decide quoi faire. On l'avertit, on ne lui reprend rien. */
    (async function () {
      try {
        if (typeof majProfil !== "function" || typeof supa === "undefined") return;
        var rMaj = await majProfil({ ecurie2: nom || null });
        var raison = (rMaj && rMaj.error) ? String((rMaj.error && (rMaj.error.message || rMaj.error)) || "") : "";
        if (!raison) {
          try {
            var u2 = await utilisateurActuel();
            if (u2) {
              var rRelu = await supa.from("profiles").select("ecurie2").eq("id", u2.id).maybeSingle();
              var pose = (rRelu && rRelu.data) ? String(rRelu.data.ecurie2 || "").trim() : "";
              /* 06/09 : la base peut avoir ALIGNE le nom sur l'orthographe majoritaire
                 (hypeNomClubCanonique) — ce n'est pas un echec : on attend ce que
                 majProfil a reellement ecrit, et l'ecran reprend ce nom-la. */
              var attendu = (rMaj && rMaj.data && rMaj.data.ecurie2 != null) ? String(rMaj.data.ecurie2).trim() : nom;
              if (pose !== attendu) raison = "la base a rendu \u00ab " + (pose || "rien") + " \u00bb au lieu de \u00ab " + (attendu || "rien") + " \u00bb";
              else if (pose && pose !== nom) { try { setProfil(function (pp) { return Object.assign({}, pp, { club2: pose, ecurie2: pose }); }); setClub2Local({ club: pose }); } catch (ePc2) { } }
            }
          } catch (eRelu) { }
        }
        if (raison) {
          try {
            window.alert(hypeT7("Ta deuxi\u00e8me \u00e9curie s'affiche bien ici, mais elle n'a PAS \u00e9t\u00e9 enregistr\u00e9e.", "Your second stable shows here, but it was NOT saved.", "Tu segunda cuadra aparece aqu\u00ed, pero NO se ha guardado.", "La tua seconda scuderia appare qui, ma NON \u00e8 stata salvata.", "2\u3064\u76ee\u306e\u53a9\u820e\u306f\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u3066\u3044\u307e\u3059\u304c\u3001\u4fdd\u5b58\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002", "Dein zweiter Stall wird hier angezeigt, wurde aber NICHT gespeichert.", "\u064a\u0638\u0647\u0631 \u0625\u0633\u0637\u0628\u0644\u0643 \u0627\u0644\u062b\u0627\u0646\u064a \u0647\u0646\u0627\u060c \u0644\u0643\u0646\u0647 \u0644\u0645 \u064a\u062d\u0641\u0638.", "你的第二个马厩在这里显示正常，但并没有被保存。", "Je tweede stal wordt hier wel getoond, maar is NIET opgeslagen.", "Sua segunda cocheira aparece aqui, mas NÃO foi salva.", "Ditt andra stall visas här, men det har INTE sparats.", "Твоя вторая конюшня отображается здесь, но она НЕ сохранена.", "Twoja druga stajnia wyświetla się tutaj, ale NIE została zapisana.", "두 번째 마구간이 여기에는 표시되지만 저장되지는 않았어요.")
              + "\n\nRaison : " + raison
              + hypeT7("\n\nTant qu'elle n'est pas enregistr\u00e9e, ce club ne te compte pas parmi ses membres.", "\n\nUntil it is saved, this club does not count you among its members.", "\n\nMientras no se guarde, este club no te cuenta entre sus miembros.", "\n\nFinch\u00e9 non \u00e8 salvata, questo club non ti conta tra i suoi membri.", "\n\n\u4fdd\u5b58\u3055\u308c\u308b\u307e\u3067\u3001\u3053\u306e\u30af\u30e9\u30d6\u306e\u30e1\u30f3\u30d0\u30fc\u306b\u306f\u542b\u307e\u308c\u307e\u305b\u3093\u3002", "\n\nSolange er nicht gespeichert ist, z\u00e4hlt dich dieser Verein nicht zu seinen Mitgliedern.", "\n\n\u0645\u0627 \u0644\u0645 \u064a\u062a\u0645 \u062d\u0641\u0638\u0647\u060c \u0644\u0627 \u064a\u0639\u062f\u0643 \u0647\u0630\u0627 \u0627\u0644\u0646\u0627\u062f\u064a \u0645\u0646 \u0623\u0639\u0636\u0627\u0626\u0647.", "\n\n在保存之前，这个俱乐部不会把你算作成员。", "\n\nZolang hij niet is opgeslagen, telt deze manege je niet mee als lid.", "\n\nEnquanto ela não for salva, esse clube não conta você entre os membros dele.", "\n\nTills det är sparat räknar den här ridklubben dig inte som medlem.", "\n\nПока она не сохранена, этот клуб не считает тебя своим участником.", "\n\nDopóki nie zostanie zapisana, ten klub nie liczy cię wśród swoich członków.", "\n\n저장되기 전까지 이 클럽은 나를 회원으로 집계하지 않아요."));
          } catch (eAl) { }
        }
      } catch (eC2) {
        try { window.alert(hypeT7("Ta deuxi\u00e8me \u00e9curie s'affiche bien ici, mais elle n'a PAS \u00e9t\u00e9 enregistr\u00e9e.\n\nRaison : ", "Your second stable shows here, but it was NOT saved.\n\nReason: ", "Tu segunda cuadra aparece aqu\u00ed, pero NO se ha guardado.\n\nMotivo: ", "La tua seconda scuderia appare qui, ma NON \u00e8 stata salvata.\n\nMotivo: ", "2\u3064\u76ee\u306e\u53a9\u820e\u306f\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u3066\u3044\u307e\u3059\u304c\u3001\u4fdd\u5b58\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002\n\n\u7406\u7531\uff1a", "Dein zweiter Stall wird hier angezeigt, wurde aber NICHT gespeichert.\n\nGrund: ", "\u064a\u0638\u0647\u0631 \u0625\u0633\u0637\u0628\u0644\u0643 \u0627\u0644\u062b\u0627\u0646\u064a \u0647\u0646\u0627\u060c \u0644\u0643\u0646\u0647 \u0644\u0645 \u064a\u062d\u0641\u0638.\n\n\u0627\u0644\u0633\u0628\u0628: ", "你的第二个马厩在这里显示正常，但并没有被保存。\n\n原因：", "Je tweede stal wordt hier wel getoond, maar is NIET opgeslagen.\n\nReden: ", "Sua segunda cocheira aparece aqui, mas NÃO foi salva.\n\nMotivo: ", "Ditt andra stall visas här, men det har INTE sparats.\n\nOrsak: ", "Твоя вторая конюшня отображается здесь, но она НЕ сохранена.\n\nПричина: ", "Twoja druga stajnia wyświetla się tutaj, ale NIE została zapisana.\n\nPowód: ", "두 번째 마구간이 여기에는 표시되지만 저장되지는 않았어요.\n\n이유: ") + String((eC2 && eC2.message) || eC2)); } catch (eAl2) { }
      }
    })();
    setEditClub2(false);
  }
  /* 15/08 (demande de Blandine) : « la phrase qui a popé en dur sur la photo
     je sais pas d'où elle sort on peut la virer ». C'était une citation de
     REMPLISSAGE affichée quand le champ `citation` du profil est vide — donc
     un faux texte en haut de page, pendant que son vrai texte (le Mur des
     Songes) vit plus bas. Le repli est supprimé : si le champ est vide, la
     ligne ne s'affiche pas. Celles qui ont écrit une citation la gardent.
     ⚠️ Le Mur des Songes n'est PAS touché — mot de Blandine. */
  var citation = profil.citation || "";
  var heroImg = profil.avatar || IMG_CAVALIER_HERO_DEFAUT;   /* (1134) avant : silhouette bleue (ou sa version Crimson), affichee comme un logo */
  var estLogo = false;
  /* 29/09 (513) : position « relative » sur la page. Sans elle, la fleche retour, le badge Premium, le partage et le
     drapeau se calaient sur un conteneur plus haut de l appli et tombaient ~110 px trop bas, DANS la photo (capture
     de Blandine : « ils ne doivent pas etre a l interieur de la photo mais en HAUT de la photo »). Desormais ils se
     calent sur la page : haut + 14 px, la photo commence a haut + 62 px -> ils sont au-dessus. */
  /* 29/09 (515) : LA VRAIE CAUSE (le 513 ne suffisait pas) : la marge du haut de la photo (haut + 62 px)
     « traversait » la page (fusion des marges) : la page entiere commencait 62 px plus bas, et les boutons
     calés sur elle aussi -> dans la photo. « display: flow-root » empeche cette fusion : la page commence
     tout en haut, les boutons a + 14 px, la photo a + 62 px. Verifie en navigateur : boutons 76 -> 14 px. */
  /* 14/10 (1104) — CAVALIER V2, ETAPE 1 : LE HAUT DE PAGE (maquette validee par Blandine le 14/10, apercu « Cavalier V2 Hype »).
     Meme principe que le hero de « Mes chevaux » : la photo du cavalier calee a droite (a gauche en arabe), fondue dans le noir
     par MASQUE (aucune couleur posee sur la photo), et descendue sous la rangee de boutons ; « CAVALIER » en petit champagne,
     le prenom en grand, le crayon du pseudo, le badge Team, l identifiant + l ecurie, la citation si elle existe.
     Le menu « Mes actions » monte en haut a droite (en visite : la bulle pour ecrire). Les entrees du menu et leurs actions
     sont EXACTEMENT celles de l ancien menu (rien de nouveau).
     ⚠️ BASCULE : CAV_V2 n est vrai que sur le compte de Blandine (test sur iPhone) ou si window.HYPE_CAVALIER_V2 === true.
     Tant qu elle n a pas valide, tous les autres cavaliers gardent l ancienne page, inchangee. */
  /* 14/10 (1125) Blandine : « Active-la oui » -> la page Cavalier V2 est ouverte a TOUS les cavaliers.
     RETOUR ARRIERE en une ligne : remplacer « true » par « (typeof window !== "undefined" && window.HYPE_CAVALIER_V2 === true) || !!estFeinnMC »
     (V2 pour Blandine seule) ou par « false » (ancienne page pour tout le monde). */
  var CAV_V2 = true;
  /* 14/10 (1106) : l encart et le titre communs des parties de la page V2 (degrade petrole transparent, bord champagne fin,
     ombre douce ; titre Cormorant ivoire + filet champagne qui s efface). Reutilises par les etapes suivantes. */
  function cavV2Bloc(cle, styleEnPlus) {
    var enfants = Array.prototype.slice.call(arguments, 2);
    return h.apply(null, ["section", { key: cle, style: Object.assign({ position: "relative", margin: cavTab ? (cavPanneau ? "52px 16px 0" : (cavOrdi ? "44px 16px 0" : "40px 16px 0")) : "32px 12px 0" /* (1135) ; 22/10 ordinateur : plus d air */, padding: cavTab ? (cavPanneau ? "28px 32px 30px" : "20px 22px 22px") : "14px 14px 16px", borderRadius: cavPanneau ? 18 : 16, border: "1px solid rgba(201,166,107,0.24)", background: "linear-gradient(160deg, rgba(40,86,104,0.34) 0%, rgba(18,40,48,0.20) 42%, rgba(5,8,11,0.06) 100%)", WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)", boxShadow: "0 16px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.05)", overflow: "hidden" }, styleEnPlus || {}) }].concat(enfants));
  }
  /* (1108) la cellule « Les chevaux de l ecurie » (meme carte, meme destination ecurie-hype) avec « + Ajouter mon cheval » dessous,
     de sorte que l ensemble ait la hauteur d une carte cheval. Sans ecurie : seulement la carte d ajout. */
  function cavV2Milieu(clubM) {
    var ajoutM = h("button", { key: "ajM", onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 5, width: "100%", minHeight: 44, border: "1.5px dashed rgba(197,170,120,0.5)", borderRadius: 12, background: "rgba(197,170,120,0.04)", color: "#C5AA78", fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.2, padding: "4px 6px", textAlign: "center", cursor: "pointer" } },
      h("span", { "aria-hidden": "true", style: { fontSize: 15, fontWeight: 400 } }, "+"),
      T("Ajouter mon cheval", "Add my horse", "A\u00f1adir mi caballo", "Aggiungi il mio cavallo", "\u79c1\u306e\u99ac\u3092\u8ffd\u52a0", "Mein Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646\u064a", "添加我的马", "Mijn paard toevoegen", "Adicionar meu cavalo", "Lägg till min häst", "Добавить мою лошадь", "Dodaj mojego konia", "내 말 추가하기"));
    /* 21/10 (Blandine) : même carte du milieu que la page Écurie (cadre champagne fin, surface pétrole, filets, « Voir tout → ») */
    var rtlM = false; try { rtlM = document.documentElement.dir === "rtl"; } catch (eRm) { }
    var carteM = clubM ? h("button", { key: "ecM", onClick: function () { try { window.__ecurieHypeClub = clubM; } catch (eCc) { } setEcran("ecurie-hype"); }, style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", minWidth: 0, aspectRatio: cavGalerie ? "4 / 3" : (cavOrdi ? "3 / 2" : "10 / 11"), padding: 6, overflow: "hidden", borderRadius: 10, border: "1px solid rgba(201,166,107,0.28)", background: "#101D22", cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.28)", boxSizing: "border-box" } },
      h("span", { "aria-hidden": "true", style: { width: 26, height: 1, background: "rgba(201,166,107,0.28)" } }),
      h("span", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: cavPanneau ? 17 : (cavTab ? 14 : 12), fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: "#F3EEE4", textAlign: "center", lineHeight: 1.2 } }, T("Les chevaux de l\u2019\u00e9curie", "The stable\u2019s horses", "Los caballos de la cuadra", "I cavalli della scuderia", "\u53a9\u820e\u306e\u99ac", "Die Pferde des Stalls", "\u062e\u064a\u0648\u0644 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말들")),
      h("span", { style: { fontFamily: M, fontSize: cavPanneau ? 14 : (cavTab ? 12.5 : 11.5), color: "#C9A66B" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "\u3059\u3079\u3066", "Alle ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + " " + (rtlM ? "\u2190" : "\u2192")),
      h("span", { "aria-hidden": "true", style: { width: 34, height: 1, background: "rgba(201,166,107,0.28)" } })) : null;
    if (!carteM) return cavV2CarteAjout("__milV2");
    return h("div", { key: "__milV2", style: { display: "flex", flexDirection: "column", gap: 7, minWidth: 0, alignSelf: "start" } }, carteM);
  }
  /* 15/10 (1133) iPad / ordinateur : grille des chevaux en 4 colonnes. Une derniere ligne incomplete est CENTREE (meme regle que
     la visite depuis le 14/10), pour qu aucune case ne reste vide. Les elements pleine largeur (lien, bouton) restent en fin. */
  function cavV2Justifier(cellsJ, colJ, gapJ) {
    var normJ = [], largesJ = [];
    cellsJ.forEach(function (cJ) { if (cJ && cJ.props && cJ.props.style && cJ.props.style.gridColumn === "1 / -1") largesJ.push(cJ); else if (cJ) normJ.push(cJ); });
    var resteJ = normJ.length % colJ;
    if (resteJ && normJ.length) {
      var derJ = normJ.splice(normJ.length - resteJ);
      normJ.push(h("div", { key: "__resteJ", style: { gridColumn: "1 / -1", display: "flex", justifyContent: "center", gap: gapJ } },
        derJ.map(function (cJ, iJ) { return h("div", { key: "rj" + iJ, style: { width: "calc((100% - " + ((colJ - 1) * gapJ) + "px) / " + colJ + ")", minWidth: 0 } }, React.cloneElement(cJ, { style: Object.assign({}, cJ.props.style, { width: "100%" }) })); })));
    }
    return normJ.concat(largesJ);
  }
  /* (1117) la carte « + Ajouter mon cheval » de la taille d une carte cheval (bouche-trou de la grille, sa page seulement) */
  function cavV2CarteAjout(cleA) {
    return h("div", { key: cleA, style: { minWidth: 0, alignSelf: "start" } }, h("button", { onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { width: "100%", aspectRatio: cavGalerie ? "4 / 3" : ((CAV_V2 && cavOrdi) ? "3 / 2" : "10 / 11") /* 15/10 (1140) ordinateur : cartes en largeur */, borderRadius: 14, border: "1.5px dashed rgba(197,170,120,0.5)", background: "rgba(197,170,120,0.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", color: "#C5AA78", padding: 0 } },
      h("span", { style: { width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #C5AA78", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, "+"),
      h("span", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 600, letterSpacing: 0.4, padding: "0 6px", lineHeight: 1.3 } }, T("Ajouter mon cheval", "Add my horse", "A\u00f1adir mi caballo", "Aggiungi il mio cavallo", "\u79c1\u306e\u99ac\u3092\u8ffd\u52a0", "Mein Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646\u064a", "添加我的马", "Mijn paard toevoegen", "Adicionar meu cavalo", "Lägg till min häst", "Добавить мою лошадь", "Dodaj mojego konia", "내 말 추가하기"))));
    /* 14/10 (1111) Blandine : « retire le bouton Ajouter mon cheval sous l encart du milieu et mets-le a la place de Voir tout,
       a droite du titre, comme c etait avant » -> la carte du milieu reste seule ; l ajout est dans le titre. */
  }
  /* 14/10 (1109) Cavalier V2, etape 6 : « Ses amis ». Une rangee qui defile : d abord le rond « + Ajouter un ami » (sa page ;
     meme action qu avant : Communaute, onglet « A decouvrir »), puis les portraits ronds des amis (touchés = leur page).
     Sans ami encore : les cavaliers DE SON ECURIE a decouvrir (memes suggestions qu avant, filtrees sur son ecurie),
     avec « Suivre » (fonction suivre existante). En visite sans ami : « Pas encore d amis sur Hype. ». Pas de « Voir tous » :
     aucune page « tous les amis » n existe. */
  function cavV2Amis() {
    var avV = function (u) { return (typeof avSrc === "function" ? avSrc(u) : u) || ""; };
    var ouvrirV = function (p) { try { window.__cavalierPublic = { id: (p.id || p.user_id || null), pseudo: p.pseudo, photo: avV(p.avatar_url) || null, ecurie: p.ecurie || "", club: (p.club || p.ecurie || ""), ville: p.ville || "" }; window.__cavalierOuvert = "__public"; } catch (ePv) { } setEcran("cavalier"); };
    var rangV = function (pR) { var r = ordreXpV2 && pR && pR.id != null ? ordreXpV2[String(pR.id)] : null; return (r == null) ? 99999 : r; };
    var triV = function (a, b) { return (rangV(a) - rangV(b)) || ((b && b.avatar_url ? 1 : 0) - (a && a.avatar_url ? 1 : 0)); };   /* (1110) plus haut niveau d abord, puis ceux qui ont une photo */
    var listeV = (amisListe || []).slice().sort(triV);
    var idsV = {}; listeV.forEach(function (pA) { if (pA && pA.id) idsV[pA.id] = true; });
    var monClubV = String((ctx.profil && (ctx.profil.club || ctx.profil.ecurie)) || "").trim().toLowerCase();
    var sugV = (!__estVisite && !listeV.length && monClubV) ? (suggestions || []).filter(function (pS) { return pS && pS.id && !idsV[pS.id] && (String(pS.ecurie || "").trim().toLowerCase() === monClubV || String(pS.club || "").trim().toLowerCase() === monClubV); }).sort(triV).slice(0, 12) : [];
    var dA = cavPanneau ? 84 : 58, lA = cavPanneau ? 96 : 68;   /* 22/10 ordinateur (correction 8) : portraits plus grands */
    var rond = function (p, enfant, cle) {
      var ph = avV(p.avatar_url);
      return h("div", { key: cle, style: { flex: "0 0 auto", width: lA, textAlign: "center" } },
        h("button", { onClick: function () { ouvrirV(p); }, "aria-label": p.pseudo || "", style: { display: "block", width: dA, height: dA, margin: "0 auto", borderRadius: "50%", padding: 0, cursor: "pointer", overflow: "hidden", border: "1px solid rgba(201,166,107,0.4)", background: ph ? ("#101D22 url(" + ph + ") center/cover") : "#101D22", color: "#C9A66B", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: cavPanneau ? 30 : 22 } }, ph ? null : String(p.pseudo || "?").trim().charAt(0).toUpperCase()),
        h("div", { style: { marginTop: cavPanneau ? 9 : 6, fontFamily: M, fontSize: cavPanneau ? 13 : 11, color: "rgba(243,238,228,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.pseudo || ""),
        enfant || null);
    };
    var cellules = [];
    if (!__estVisite) cellules.push(h("div", { key: "plus", style: { flex: "0 0 auto", width: lA, textAlign: "center" } },
      h("button", { onClick: function () { try { window.__communauteCible = "decouvrir"; } catch (eCd) { } setEcran("communaute"); }, "aria-label": T("Ajouter un ami", "Add a friend", "A\u00f1adir un amigo", "Aggiungi un amico", "\u53cb\u9054\u3092\u8ffd\u52a0", "Freund hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0635\u062f\u064a\u0642", "添加好友", "Een vriend toevoegen", "Adicionar um amigo", "Lägg till en vän", "Добавить друга", "Dodaj znajomego", "친구 추가"), style: { display: "flex", alignItems: "center", justifyContent: "center", width: dA, height: dA, margin: "0 auto", borderRadius: "50%", border: "1.5px dashed rgba(243,238,228,0.35)", background: "transparent", color: "rgba(243,238,228,0.75)", fontSize: cavPanneau ? 30 : 24, fontWeight: 300, cursor: "pointer", padding: 0 } }, "+"),
      h("div", { style: { marginTop: cavPanneau ? 9 : 6, fontFamily: M, fontSize: cavPanneau ? 13 : 11, lineHeight: 1.25, color: "rgba(243,238,228,0.75)" } }, T("Ajouter un ami", "Add a friend", "A\u00f1adir un amigo", "Aggiungi un amico", "\u53cb\u9054\u3092\u8ffd\u52a0", "Freund hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0635\u062f\u064a\u0642", "添加好友", "Een vriend toevoegen", "Adicionar um amigo", "Lägg till en vän", "Добавить друга", "Dodaj znajomego", "친구 추가"))));
    listeV.forEach(function (p, i) { cellules.push(rond(p, null, "a" + (p.id || i))); });
    sugV.forEach(function (p, i) {
      var fait = !!suivisV2[p.id];
      cellules.push(rond(p, h("button", { onClick: function () { if (fait || typeof suivre !== "function") return; setSuivisV2(function (m) { var n2 = Object.assign({}, m); n2[p.id] = true; return n2; }); try { suivre(p.id).then(function (r) { if (r && r.error) setSuivisV2(function (m) { var n3 = Object.assign({}, m); delete n3[p.id]; return n3; }); }); } catch (eSv) { } },
        style: { display: "block", margin: "6px auto 0", padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: fait ? "rgba(201,166,107,0.16)" : "transparent", color: "#F3EEE4", fontFamily: M, fontSize: 10, cursor: fait ? "default" : "pointer" } },
        fait ? T("Suivi", "Following", "Siguiendo", "Segui gi\u00e0", "\u30d5\u30a9\u30ed\u30fc\u4e2d", "Gefolgt", "\u062a\u062a\u0627\u0628\u0639", "已关注", "Volgend", "Seguindo", "Följer", "В подписках", "Obserwujesz", "팔로잉") : T("Suivre", "Follow", "Seguir", "Segui", "\u30d5\u30a9\u30ed\u30fc", "Folgen", "\u0645\u062a\u0627\u0628\u0639\u0629", "关注", "Volgen", "Seguir", "Följ", "Подписаться", "Obserwuj", "팔로우")), "s" + p.id));
    });
    return cavV2Bloc("cavV2Amis", null,
      cavV2Titre(__estVisite ? T("Ses amis", "Their friends", "Sus amigos", "I suoi amici", "\u53cb\u9054", "Freunde", "\u0623\u0635\u062f\u0642\u0627\u0624\u0647\u0627", "TA的好友", "Hun vrienden", "Os amigos dele(a)", "Deras vänner", "Друзья", "Jej znajomi", "그의 친구들") : T("Mes amis", "My friends", "Mis amigos", "I miei amici", "\u53cb\u9054", "Meine Freunde", "\u0623\u0635\u062f\u0642\u0627\u0626\u064a", "我的好友", "Mijn vrienden", "Meus amigos", "Mina vänner", "Мои друзья", "Moi znajomi", "내 친구들")),
      (__estVisite && !listeV.length)
        ? h("div", { style: { marginTop: 10, fontFamily: M, fontSize: 13, color: "rgba(243,238,228,0.6)" } }, T("Pas encore d\u2019amis sur Hype.", "No friends on Hype yet.", "A\u00fan no tiene amigos en Hype.", "Ancora nessun amico su Hype.", "\u307e\u3060Hype\u306b\u53cb\u9054\u304c\u3044\u307e\u305b\u3093\u3002", "Noch keine Freunde auf Hype.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u0635\u062f\u0642\u0627\u0621 \u0639\u0644\u0649 Hype \u0628\u0639\u062f.", "在 Hype 上还没有好友。", "Nog geen vrienden op Hype.", "Ainda sem amigos no Hype.", "Inga vänner på Hype än.", "Пока нет друзей в Hype.", "Na Hype nie ma jeszcze znajomych.", "아직 Hype에 친구가 없어요."))
        : h("div", { "data-hscroll": cavPanneau ? undefined : "1", style: cavPanneau ? { display: "flex", flexWrap: "wrap", gap: "20px 18px", marginTop: 22 } /* 22/10 ordinateur : sur plusieurs lignes, moins de vide */ : { display: "flex", gap: 10, overflowX: "auto", marginTop: 12, paddingBottom: 2, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } }, cellules));
  }
  function cavV2Titre(txt, voirTxt, onVoir, sansFleche) {
    var rtlT = false; try { rtlT = document.documentElement.dir === "rtl"; } catch (eR) { }
    return h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
      h("h2", { style: { margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontSize: cavTab ? (cavPanneau ? 34 : (cavOrdi ? 28 : 26)) : 23, color: "#F3EEE4", whiteSpace: "nowrap" } }, txt),
      h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "linear-gradient(" + (rtlT ? "270deg" : "90deg") + ", rgba(201,166,107,0.5), transparent)" } }),
      (voirTxt && onVoir) ? h("button", { onClick: onVoir, style: { background: "none", border: "none", padding: 0, cursor: "pointer", color: "#C9A66B", fontFamily: M, fontSize: 12, whiteSpace: "nowrap" } }, sansFleche ? voirTxt : (voirTxt + " " + (rtlT ? "\u2190" : "\u2192"))) : null);
  }
  function cavV2Hero() {
    var tabV2 = cavTab, grandV2 = cavOrdi;   /* (1130) avant : largeur lue une fois, seuils 700 / 1100 */
    var rtlV2 = false; try { rtlV2 = document.documentElement.dir === "rtl"; } catch (eR) { }
    var hV2 = cavPanneau ? 460 : (grandV2 ? 400 : (tabV2 ? 340 : 380));   /* 22/10 ordinateur (correction 1) : bandeau plus haut */   /* (1130) iPad moins haut, ordinateur panoramique (350-410) */
    var srcV2 = __estVisite ? (__visitePub || profil) : (profRecit || profil);
    var handleV2 = (typeof hypeHandleTexte === "function") ? hypeHandleTexte(srcV2) : "";
    var ecV2 = String((profil && (profil.club || profil.ecurie)) || "").trim();
    var masqueV2 = cavPanneau
      ? "linear-gradient(" + (rtlV2 ? "270deg" : "90deg") + ", rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.7) 22%, #000 42%), linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)"   /* 22/10 maquette : photo sur tout le bandeau, assombrie a gauche sous le nom */   /* 22/10 ordinateur : la photo occupe plus de place, toujours fondue dans l ombre */
      : "linear-gradient(" + (rtlV2 ? "270deg" : "90deg") + ", transparent 0%, #000 40%), linear-gradient(180deg, transparent 0%, #000 14%, #000 66%, transparent 100%)";
    var photoV2 = { position: "absolute", top: cavPanneau ? 0 : "calc(env(safe-area-inset-top) + 58px)", bottom: 0, insetInlineEnd: 0, borderRadius: cavPanneau ? 4 : undefined, width: cavPanneau ? "100%" : (tabV2 && !profil.avatar) ? (grandV2 ? "42%" : "50%") /* (1134) photo par defaut (portrait) : cadre plus etroit, le cheval reste entier */ : (cavPanneau ? "82%" : (grandV2 ? "64%" : (tabV2 ? "60%" : "84%"))), WebkitMaskImage: masqueV2, maskImage: masqueV2, WebkitMaskComposite: "source-in", maskComposite: "intersect", pointerEvents: "none" };
    var ombreTxt = "0 2px 16px rgba(0,0,0,0.75)";
    var entreesV2 = [];
    if (!__estVisite) {
      entreesV2.push({ cle: "photo", txt: T("Changer ma photo", "Change my photo", "Cambiar mi foto", "Cambiare la mia foto", "写真を変更", "Mein Foto ändern", "تغيير صورتي", "更换我的照片", "Mijn foto wijzigen", "Trocar minha foto", "Byt mitt foto", "Сменить моё фото", "Zmień moje zdjęcie", "사진 바꾸기"), act: function () { fileRef.current && fileRef.current.click(); } });
      if (profil.avatar || profil.avatar_url) entreesV2.push({ cle: "modif", txt: T("Modifier ma photo", "Edit my photo", "Editar mi foto", "Modifica la mia foto", "写真を編集", "Mein Foto bearbeiten", "تعديل صورتي", "修改我的照片", "Mijn foto bewerken", "Editar minha foto", "Redigera mitt foto", "Изменить моё фото", "Edytuj moje zdjęcie", "사진 수정하기"), act: function () { modifierPhoto(); } });
      entreesV2.push({ cle: "album", txt: T("Mon album", "My album", "Mi álbum", "Il mio album", "アルバム", "Mein Album", "ألبومي", "我的相册", "Mijn album", "Meu álbum", "Mitt album", "Мой альбом", "Mój album", "내 앨범"), act: function () { setAlbumOuvert(true); } });
      entreesV2.push({ cle: "msg", txt: T("Mes messages", "My messages", "Mis mensajes", "I miei messaggi", "メッセージ", "Meine Nachrichten", "رسائلي", "我的消息", "Mijn berichten", "Minhas mensagens", "Mina meddelanden", "Мои сообщения", "Moje wiadomości", "내 메시지"), act: function () { setEcran("messagerie"); } });
      entreesV2.push({ cle: "zik", txt: T("Ma musique", "My music", "Mi música", "La mia musica", "音楽", "Meine Musik", "موسيقاي", "我的音乐", "Mijn muziek", "Minha música", "Min musik", "Моя музыка", "Moja muzyka", "내 음악"), act: function () { setDemandeMusique(function (n) { return n + 1; }); } });
    }
    var rondV2 = { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", right: 26 /* 15/10 (1137) a droite dans toutes les langues, comme le partage et le drapeau ; en arabe il passait sous la fleche retour */, zIndex: 6, width: 36, height: 36, borderRadius: "50%", background: CAV_ICONE, border: "1px solid rgba(197,170,120,0.36)", color: "#F3EEE4", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", padding: 0 };
    return h("div", { key: "cavV2Hero", style: { position: "relative", zIndex: 1, height: "calc(env(safe-area-inset-top) + " + hV2 + "px)", overflow: "visible" } },
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, overflow: "hidden" } },
        estLogo
          ? h("div", { style: Object.assign({}, photoV2, { backgroundImage: "url(" + heroImg + ")", backgroundSize: "auto 86%", backgroundRepeat: "no-repeat", backgroundPosition: "center 30%", opacity: 0.9 }) })
          : h("img", { src: heroImg, alt: "", decoding: "async", style: Object.assign({}, photoV2, { objectFit: "cover", objectPosition: (profil.avatar ? (cavPanneau ? "60% 28%" : "center 22%") : (cavPanneau ? "center 30%" : (tabV2 ? "center 10%" : "center 22%"))), display: "block", height: cavPanneau ? "100%" : "calc(100% - env(safe-area-inset-top) - 58px)" }) })),
      /* le menu « Mes actions » (sa page) ou la bulle « ecrire » (visite), en haut a droite */
      !__estVisite
        ? h("button", { onClick: function (eM) { if (eM && eM.stopPropagation) eM.stopPropagation(); setMenuOuvertProfil(!menuOuvertProfil); }, "aria-label": T("Mes actions", "My actions", "Mis acciones", "Le mie azioni", "メニュー", "Meine Aktionen", "إجراءاتي", "我的操作", "Mijn acties", "Minhas ações", "Mina åtgärder", "Мои действия", "Moje działania", "내 활동"), style: Object.assign({}, rondV2, { fontSize: 17, lineHeight: 1, paddingBottom: 4, color: menuOuvertProfil ? "#C5AA78" : "#F3EEE4" }) }, "⋯")
        : h("button", { onClick: ouvrirMessageAvecVisite, disabled: messageEnCours, "aria-label": T("Écrire", "Write", "Escribir", "Scrivere", "書く", "Schreiben", "كتابة", "写点什么", "Schrijven", "Escrever", "Skriv", "Написать", "Napisz", "쓰기"), style: Object.assign({}, rondV2, { opacity: messageEnCours ? 0.6 : 1 }) }, h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: "#C5AA78", strokeWidth: 1.8 }, h("path", { d: "M4 5.5 h16 a1 1 0 0 1 1 1 v9 a1 1 0 0 1-1 1 H9 l-4 3.5 v-3.5 H4 a1 1 0 0 1-1-1 v-9 a1 1 0 0 1 1-1 z" }))),
      (!__estVisite && menuOuvertProfil) ? h("div", { onClick: function (eF) { if (eF && eF.stopPropagation) eF.stopPropagation(); setMenuOuvertProfil(false); }, style: { position: "fixed", inset: 0, zIndex: 8800 } }) : null,
      (!__estVisite && menuOuvertProfil) ? h("div", { style: { position: "fixed", top: "calc(env(safe-area-inset-top) + 58px)", right: (rtlV2 && grandV2) ? 226 : 16 /* (1137) ; ordinateur en arabe : a gauche de la barre de menu */, zIndex: 8801, minWidth: 208, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(197,170,120,0.28)", background: "linear-gradient(160deg, rgba(24,52,62,0.97), rgba(5,8,11,0.98))", boxShadow: "0 18px 40px rgba(0,0,0,0.6)" } },
        entreesV2.map(function (e, ix) {
          return h("button", { key: e.cle, onClick: function (eC) { if (eC && eC.stopPropagation) eC.stopPropagation(); setMenuOuvertProfil(false); try { e.act(); } catch (eX) { } },
            style: { display: "block", width: "100%", textAlign: "start", padding: "12px 15px", background: "none", border: "none", borderTop: ix ? "1px solid rgba(255,255,255,0.07)" : "none", color: "#F3EEE4", fontSize: 12.5, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, e.txt);
        })) : null,
      /* 14/10 (1124) Blandine : « vendu pour le cote », « droite » : les stories DE CE CAVALIER en petite colonne a droite de
         la photo (3 au plus, « +N »), le petit « + » en dessous sur sa page. Rien si le cavalier visite n a pas de story. */
      (typeof window !== "undefined" && window.BandeauStories)
        ? h("div", { style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 70px)", insetInlineEnd: 14, zIndex: 4 } },
            h(window.BandeauStories, { colonne: true, seulMoi: !__estVisite, seulUserId: __estVisite ? ((__visitePub && __visitePub.id) || null) : null, ajout: !__estVisite, padding: "0", accent: "#C9A66B" }))
        : null,
      /* le texte, en bas a gauche (a droite en arabe) */
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: cavPanneau ? 48 : (tabV2 ? 26 : 20), zIndex: 2 } },
        h("div", { style: { maxWidth: "none", margin: "0 auto", padding: cavPanneau ? "0 48px" : (grandV2 ? "0 34px" : "0 26px") } },   /* (1130) texte aligne a gauche, sous la fleche retour */
          h("div", { style: { fontFamily: M, fontSize: cavPanneau ? 12.5 : 11, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9A66B", fontWeight: 600, textShadow: ombreTxt } }, T("Cavalier", "Rider", "Jinete", "Cavaliere", "騎手", "Reiter", "فارس", "骑手", "Ruiter", "Cavaleiro", "Ryttare", "Всадник", "Jeździec", "기수")),
          h("div", { style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: "6px 12px", marginTop: 8 } },
            h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontSize: cavPanneau ? 64 : (grandV2 ? 52 : (tabV2 ? 48 : 40)), lineHeight: 1, color: "#F3EEE4", textShadow: ombreTxt, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" } }, prenom),
            (!__estVisite) ? h("button", { onClick: function (ePs) { if (ePs && ePs.stopPropagation) ePs.stopPropagation(); setPseudoLocal((profil.prenom || profil.pseudo || "").trim()); setEditPseudo(true); }, "aria-label": hypeT7("Modifier mon pseudo", "Edit my username", "Modificar mi seudónimo", "Modifica il mio nickname", "ユーザー名を変更", "Meinen Benutzernamen ändern", "تعديل اسم المستخدم", "修改我的昵称", "Mijn gebruikersnaam wijzigen", "Editar meu apelido", "Redigera mitt användarnamn", "Изменить мой ник", "Edytuj mój pseudonim", "닉네임 수정하기"), style: { flexShrink: 0, marginBottom: 6, width: 24, height: 24, borderRadius: "50%", background: "rgba(5,8,11,0.55)", border: "1px solid rgba(243,238,228,0.22)", color: "#F3EEE4", fontSize: 11, cursor: "pointer", padding: 0 } }, "✎") : null,
            roleTeamAff ? h("button", { onClick: function (eTm) { if (eTm && eTm.stopPropagation) eTm.stopPropagation(); setEcran("team-competition"); }, style: { flexShrink: 0, marginBottom: 6, display: "inline-flex", alignItems: "center", gap: 4, minHeight: 24, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(197,170,120,0.55)", background: "rgba(5,8,11,0.5)", color: "#C9A66B", fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" } }, "✦ " + (roleTeamAff === "coach" ? T("Coach", "Coach", "Coach", "Coach", "コーチ", "Coach", "مدرب", "教练", "Coach", "Coach", "Coach", "Тренер", "Trener", "코치") : "Team CSO Club")) : null),
          (handleV2 || ecV2) ? h("div", { style: { fontFamily: M, fontSize: cavPanneau ? 15.5 : 13, color: "rgba(243,238,228,0.78)", marginTop: cavPanneau ? 14 : 10, textShadow: ombreTxt } },
            handleV2 ? h("span", { dir: "ltr" }, handleV2) : null,
            (handleV2 && ecV2) ? " · " : null,
            ecV2 ? h("span", { style: { color: "#F3EEE4" } }, ecV2) : null) : null,
          citation ? h("div", { style: { marginTop: 8, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: cavPanneau ? 19 : 16, lineHeight: 1.35, color: "rgba(243,238,228,0.78)", textShadow: ombreTxt } }, "« " + citation + " »") : null)));
  }
  /* 22/10 (brief « Refonte responsive de la page Cavalier », proposition 3) — MISE EN PAGE ORDINATEUR (>= 1200 px).
     Les parties de la page sont les MEMES (aucune nouvelle fonction, aucun texte remplace) ; cavZ les etiquette, et
     cavMiseEnPage les range : panneau a gauche (photo ronde, prenom, identifiant, badge Coach, les 6 acces en liste),
     a droite le bandeau photo, les ecuries, le groupe et le recit ; puis les chevaux sur toute la largeur ; puis
     « Mes amis » et « Mes resultats » cote a cote. Sous 1200 px, cavZ rend la partie telle quelle : page inchangee. */
  function cavZ(zone, el) { return (CAV_V2 && cavPanneau) ? { __cavZone: zone, el: el } : el; }
  function cavPanneauProfil() {
    var srcP = __estVisite ? (__visitePub || profil) : (profRecit || profil);
    var handleP = (typeof hypeHandleTexte === "function") ? hypeHandleTexte(srcP) : "";
    var avP = profil.avatar || "";
    return h("div", { style: { display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", columnGap: 14, alignItems: "center" } },
      h("div", { "aria-hidden": "true", style: { gridRow: "1 / span 3", width: 72, height: 72, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.5)", background: avP ? ("#101D22 url(" + avP + ") center 22%/cover") : "#101D22", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A66B", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, boxShadow: "0 10px 26px rgba(0,0,0,0.5)" } }, avP ? null : String(prenom || "?").trim().charAt(0).toUpperCase()),
      h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 25, fontWeight: 500, color: "#F3EEE4", lineHeight: 1.1, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, prenom),
      handleP ? h("div", { dir: "ltr", style: { marginTop: 3, fontFamily: M, fontSize: 12.5, color: "rgba(243,238,228,0.62)" } }, handleP) : null,
      roleTeamAff ? h("button", { onClick: function () { setEcran("team-competition"); }, style: { justifySelf: "start", marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, minHeight: 26, padding: "0 12px", borderRadius: 999, border: "1px solid rgba(197,170,120,0.55)", background: "transparent", color: "#C9A66B", fontFamily: M, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" } }, "✦ " + (roleTeamAff === "coach" ? T("Coach", "Coach", "Coach", "Coach", "コーチ", "Coach", "مدرب", "教练", "Coach", "Coach", "Coach", "Тренер", "Trener", "코치") : "Team CSO Club")) : null);
  }
  function cavMiseEnPage(tag, props) {
    var kids = Array.prototype.slice.call(arguments, 2);
    if (!(CAV_V2 && cavPanneau)) return h.apply(null, [tag, props].concat(kids));
    var Z = {}, avant = [], milieu = [], apres = [], vuZone = false, finHaut = false;
    kids.forEach(function (k) {
      if (k && typeof k === "object" && k.__cavZone) { Z[k.__cavZone] = k.el; vuZone = true; if (k.__cavZone === "chevaux") finHaut = true; return; }
      if (!vuZone) avant.push(k); else if (!finHaut) milieu.push(k); else apres.push(k);
    });
    var cle = function (el, c) { return el ? h("div", { key: c, style: { minWidth: 0 } }, el) : null; };
    var panneau = h("aside", { key: "cavPanneau", "data-cav-panneau": "1", style: { position: "sticky", top: 80, alignSelf: "start", paddingTop: 64, paddingInlineEnd: 22, paddingBottom: 24, borderInlineEnd: "1px solid rgba(201,166,107,0.16)", boxSizing: "border-box" } },
      cavPanneauProfil(), Z.acces || null);
    var colonne = h.apply(null, ["div", { key: "cavCol", style: { minWidth: 0 } }].concat([cle(Z.hero, "zh"), cle(Z.ecuries, "ze"), cle(Z.recit, "zr")]).concat(milieu.map(function (m, iM) { return cle(m, "zm" + iM); })));
    /* 22/10 23 h (« retour strict a la maquette ») : colonne profil 250 px | grand contenu ; puis chevaux, amis et resultats
       sur toute la largeur (Blandine : « laisse les resultats sur toute la largeur »). */
    var haut = h("div", { key: "cavHaut", style: { display: "grid", gridTemplateColumns: "250px minmax(0, 1fr)", columnGap: 12, paddingInlineStart: 16 } }, panneau, colonne);
    return h.apply(null, [tag, props].concat(avant, [haut, cle(Z.chevaux, "zc"), cle(Z.amis, "za"), cle(Z.res, "zs")], apres));
  }
  return cavMiseEnPage("div", { style: { position: "relative", display: "flow-root", minHeight: "100vh", background: CAV_V2 ? "radial-gradient(45% 10% at 100% 30%, rgba(22,64,72,0.18), transparent 100%), radial-gradient(40% 8% at 0% 62%, rgba(22,64,72,0.13), transparent 100%), radial-gradient(45% 9% at 100% 90%, rgba(22,64,72,0.15), transparent 100%), #05080B" /* 14/10 (1114) V2 : noir profond, quelques touches de bleu petrole, pas partout */ : "#060709" /* 11/10 (959) meme fond que l accueil (--bg de ACC2_CSS) ; avant : lueur radiale petrole + #05080B */, color: "#F3EEE4", paddingBottom: 96, maxWidth: (CAV_V2 && cavOrdi) ? (cavPanneau ? 1600 : 1180) : undefined, margin: (CAV_V2 && cavOrdi) ? "0 auto" : undefined /* (1130) ordinateur : colonne centree, comme les autres pages */ } },
    /* 11/10 (955) — LE HALO QUI RESPIRE DE L ACCUEIL, A L IDENTIQUE (Blandine : « identique », « tu peux laisser la couleur de fond de page de ma page cavalier et juste mettre le halo qui respire »).
       Memes reglages que .acc2 .hero-pulse + @keyframes acc2breathe (ACC2_CSS) : rond de 360 px, pétrole rgba(127,163,173,0.407) -> transparent a 62 %, 7 s en boucle (opacite 0,45 -> 0,8, taille x1,1).
       Comme sur l accueil il passe DERRIERE la photo (la carte photo recoit position relative + zIndex 1). Fond de la page inchange. */
    h("style", null, "@keyframes hypeHaloCav{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.8;transform:scale(1.1)}}" + HYPE_PH_SOLEIL_CSS),
    h("div", { "aria-hidden": "true", style: { position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 360, height: 360, background: "radial-gradient(circle,rgba(127,163,173,0.407),transparent 62%)", animation: "hypeHaloCav 7s ease-in-out infinite", pointerEvents: "none" } }),
    h(HypeDrapeauLangue, { right: CAV_V2 ? 72 : 26 /* (957) suit le bord de la photo ; (1104) V2 : le menu prend la place a droite */ }),   /* (491) ; (506) aligne sur le bord de la photo, comme la fleche retour (left 16) */
    h(HypeBoutonPartagerPage, { right: CAV_V2 ? 118 : 72 /* (957) 62 -> 72 ; (1104) V2 : 118 */, obtenir: async function () { var id = (__visitePub && __visitePub.id) || null; if (!id) { try { var uP = await utilisateurActuel(); id = (uP && uP.id) || null; } catch (e) { } } return id ? { fam: "p", val: id, titre: (__visitePub && __visitePub.pseudo) || ((ctx.profil && ctx.profil.pseudo) || "") } : null; } }),   /* (492) */
    /* 16/09 (181) - L ANCIENNE ENTREE « MON CARNET » EST RETIREE D ICI. Elle datait du build
       173 et posait DEUX problemes, tous deux de moi : elle SE SUPERPOSAIT au badge Premium, a
       la fleche retour et au pseudo - marge calculee a l aveugle sur un ecran que je n avais
       jamais vu - et surtout elle mettait le carnet au PREMIER niveau, alors que Blandine a
       tranche l inverse : « le resultat actuel reduit l apprentissage du cavalier a Mon carnet,
       ce n est pas ce que je veux ».
       Le carnet se rejoint desormais par APPRENTISSAGE, comme les deux autres rubriques. */
    h("input", { ref: fileRef, type: "file", accept: "image/*", onChange: choisirPhoto, style: { display: "none" } }),
    h("button", { onClick: function () { /* 01/10 (533) : la fleche revient a la page precedente (comme le geste retour) ; sans page precedente, Accueil comme avant */ if (ctx && ctx.peutReculer && typeof ctx.retourEcran === "function") ctx.retourEcran(); else setEcran("dashboard"); }, style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", left: 26 /* (957) */, zIndex: 6, width: 36, height: 36, borderRadius: "50%", background: CAV_ICONE, border: "1px solid rgba(197,170,120,0.36)", color: "#F3EEE4", fontSize: 19, cursor: "pointer", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" } }, "\u2039"),
    cavZ("hero", CAV_V2 ? cavV2Hero() : null),   /* (1104) */
    CAV_V2 ? null : h("div", { style: { position: "relative", zIndex: 1 /* (955) au-dessus du halo, comme la video de l accueil */, margin: "calc(env(safe-area-inset-top) + 62px) 26px 0" /* 11/10 (957) 16 -> 26 px (Blandine : « un peu plus d espace entre la bordure du telephone et celles de la photo hero ») */, borderRadius: 24, overflow: "hidden", background: "#05080B", border: "1px solid " + CAV_BORD, WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 66%, rgba(0,0,0,0.55) 84%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 66%, rgba(0,0,0,0.55) 84%, rgba(0,0,0,0) 100%)" } },   /* (679) Blandine : « faire fondre le bas de la photo hero avec le fond de la page » : MASQUE (transparence), aucune couleur posee sur la photo */
      /* 17/08 (137, demande de Blandine : « la laisser en entier, ca m'enerve
         de la voir coupee ainsi que son cadre »). LA PHOTO N'EST PLUS ROGNEE.
         Avant : un bloc au format impose 16/11 avec la photo en `cover` —
         quel que soit le format du fichier, il etait taille pour remplir le
         rectangle, et le bas du cadre grave dans l'image disparaissait.
         Desormais c'est une vraie <img> a sa taille naturelle : le bloc prend
         la forme de la photo, rien n'est coupe. La hauteur du bandeau varie
         donc d'un cavalier a l'autre — c'est le prix, et il est assume.
         L'image par defaut (logo) garde son ancien traitement : elle n'est pas
         une photo, elle doit rester centree dans un cadre stable.
         LE DEGRADE DE LISIBILITE EST RETIRE : plus aucun texte n'est pose sur
         la photo (le prenom est descendu sous la carte), il n'avait donc plus
         d'objet — et la regle Hype interdit tout degrade superpose a une photo
         de cheval. La photo est nue, pour de bon. */
      estLogo
        ? h("div", { style: { position: "relative", width: "100%", aspectRatio: "16 / 11", backgroundColor: "#05080B", backgroundImage: "url(" + heroImg + ")", backgroundSize: "auto 96%", backgroundRepeat: "no-repeat", backgroundPosition: "center 30%" } })
        : h("img", { src: heroImg, alt: "", style: { display: "block", width: "100%", height: "auto", backgroundColor: "#05080B" } })),
    /* 17/08 (137, mots de Blandine : « le prenom j'aimerais que ca sorte de
       la »). LA LIGNE DU PRENOM QUITTE LA CARTE et se pose sur le fond de la
       page. La carte ne contient plus que la photo, et se referme donc juste
       au-dessus.
       DEDUCTION DE CLAUDE — A VALIDER : le crayon et le ⋯ SUIVENT le prenom.
       Blandine n'a pas tranche leur sort ; les laisser seuls dans la carte
       aurait pose deux boutons sans libelle sous une photo, et le crayon
       modifie le pseudo — il appartient au prenom. Un mot d'elle suffit a les
       remettre ailleurs. */
    CAV_V2 ? null : h("div", { style: { padding: "12px 18px 14px", margin: "0 16px" } },   /* (1104) en V2 : remplace par cavV2Hero */
        h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
          h("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0, flex: 1 } },
            /* 17/08 (etape 2a) — LE GROUPE DU NOM EST UNE COLONNE.
               C etait une RANGEE (nom + crayon cote a cote). L identifiant doit
               aller DESSOUS : pose en troisieme enfant de la rangee exterieure,
               qui est en `space-between`, il s affichait A COTE du nom, entre lui
               et les ronds. Faute commise puis attrapee avant livraison.
               Le nom et son crayon gardent donc leur propre rangee, et la colonne
               les empile avec l identifiant. `flex: 1` + `minWidth: 0` conservent
               la coupe du nom trop long par des points de suspension. */
            h("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, maxWidth: "100%" } },
            /* 17/08 (demande de Blandine, capture de 19 h 17 : « reduis encore
               tout ca, la taille de mon nom ainsi que l ecriture et de l encart
               du mur des songes »). Nom 26 -> 21, interlettrage 1 -> 0.8,
               crayon 26 -> 22 px pour qu il reste proportionne au nom, et l air
               de la carte resserre (16/18 -> 12/14). */
            h("div", { style: { fontFamily: C, fontSize: 21, fontWeight: 700, letterSpacing: 0.8, color: "#F3EEE4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, prenom),
            (!__estVisite) ? h("button", { onClick: function (ePs) { if (ePs && ePs.stopPropagation) ePs.stopPropagation(); setPseudoLocal((profil.prenom || profil.pseudo || "").trim()); setEditPseudo(true); }, "aria-label": hypeT7("Modifier mon pseudo", "Edit my username", "Modificar mi seud\u00f3nimo", "Modifica il mio nickname", "\u30e6\u30fc\u30b6\u30fc\u540d\u3092\u5909\u66f4", "Meinen Benutzernamen \u00e4ndern", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "修改我的昵称", "Mijn gebruikersnaam wijzigen", "Editar meu apelido", "Redigera mitt användarnamn", "Изменить мой ник", "Edytuj mój pseudonim", "닉네임 수정하기"), style: { flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#F3EEE4", fontSize: 10, cursor: "pointer" } }, "\u270E") : null,
            /* 01/10 (524) puis (684) : badge Team a cote du pseudo, pour la personne affichee (soi ou visitee) :
               « Coach » ou « CSO Club » ; ouvre la page Team seulement si le visiteur y a deja acces. */
            roleTeamAff ? h("button", { onClick: function (eTm) { if (eTm && eTm.stopPropagation) eTm.stopPropagation(); setEcran("team-competition"); /* (756) 08/10 Blandine : pages compétition visibles par tous pour l instant (avant : seulement si accesTeamMC) */ }, style: { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4, minHeight: 26, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(197,170,120,0.7)", background: "rgba(197,170,120,0.12)", color: "#C5AA78", fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", cursor: accesTeamMC ? "pointer" : "default", whiteSpace: "nowrap" } }, "\u2726 " + (roleTeamAff === "coach" ? T("Coach", "Coach", "Coach", "Coach", "\u30b3\u30fc\u30c1", "Coach", "\u0645\u062f\u0631\u0628", "教练", "Coach", "Coach", "Coach", "Тренер", "Trener", "코치") : "Team CSO Club")) : null),   /* (784) sans « SEP » */
            /* 17/08 (etape 2a) — L IDENTIFIANT, SOUS LE NOM.
               Petit et peu contraste, jamais a la taille du nom : la decision de
               Blandine est de l afficher partout, la Design Bible impose que le
               nom reste le sujet et l identifiant une simple adresse.
               ⚠️ NE S AFFICHE QUE S IL EXISTE : tant que le SQL n est pas passe,
               ou sur un profil visite charge sans la colonne, la ligne n existe
               pas. Aucun trou, aucun « @undefined ». */
            (function () {
              var srcH = __estVisite ? (__visitePub || profil) : (profRecit || profil);
              var txtH = (typeof hypeHandleTexte === "function") ? hypeHandleTexte(srcH) : "";
              if (!txtH) return null;
              return h("div", { style: { fontFamily: M, fontSize: 11.5, fontWeight: 500, color: "rgba(243,238,228,0.42)", letterSpacing: "0.02em", marginTop: 3 } }, txtH);
            })()),
          h("div", { style: { display: "flex", gap: 6, flexShrink: 0 } },
            /* ══════════════════════════════════════════════════════════════
               16/08 (feu vert de Blandine) — LES QUATRE RONDS RENTRENT SOUS UN
               SEUL. Ses mots : « le menu de ma photo de profil était supposé
               être rassemblé sous un seul bouton ».
               Photo, Modifier la photo, Album et Messages étaient quatre icônes
               muettes alignées à côté du prénom. Elles vivent désormais dans un
               panneau où chaque entrée porte son LIBELLÉ ÉCRIT : une icône
               seule se devine, un libellé se lit.
               NE SONT PAS ENTRÉS DANS LE MENU, volontairement :
                 - le crayon du pseudo, collé au nom : il modifie le nom, le
                   cacher rendrait l'action introuvable ;
                 - en visite, le bouton turquoise « écrire à ce cavalier » :
                   une action principale ne se cache pas.
               « Modifier ma photo » n'apparaît que s'il y a une photo, comme
               avant. La musique est la cinquième entrée.
               Le fond ferme le panneau et ne recouvre rien d'interactif.
               ⚠️ Préparation Flutter : le panneau ne fait qu'appeler des
               actions déjà existantes. Aucune logique nouvelle à porter. */
            (!__estVisite) ? h("div", { style: { position: "relative" } },
              h("button", {
                onClick: function (eM) { if (eM && eM.stopPropagation) eM.stopPropagation(); setMenuOuvertProfil(!menuOuvertProfil); },
                "aria-label": T("Mes actions", "My actions", "Mis acciones", "Le mie azioni", "\u30e1\u30cb\u30e5\u30fc", "Meine Aktionen", "\u0625\u062c\u0631\u0627\u0621\u0627\u062a\u064a", "我的操作", "Mijn acties", "Minhas ações", "Mina åtgärder", "Мои действия", "Moje działania", "내 활동"),
                style: { width: 28, height: 28, borderRadius: "50%", background: menuOuvertProfil ? "rgba(197,170,120,0.16)" : "rgba(255,255,255,0.06)", border: "1px solid " + (menuOuvertProfil ? "rgba(197,170,120,0.42)" : "rgba(255,255,255,0.14)"), display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: menuOuvertProfil ? "#C5AA78" : "#BDB6AA", fontSize: 15, lineHeight: 1, paddingBottom: 3 }
              }, "\u22EF"),
              menuOuvertProfil ? h("div", { onClick: function (eF) { if (eF && eF.stopPropagation) eF.stopPropagation(); setMenuOuvertProfil(false); }, style: { position: "fixed", inset: 0, zIndex: 8800 } }) : null,
              /* 16/08 — LE PANNEAU PASSAIT SOUS LE MUR DES SONGES (signalé par
                 Blandine : « on dirait qu'il pop sous le mur des songes »).
                 Il était en `position: absolute` avec z-index 41 À L'INTÉRIEUR de
                 l'en-tête. Un z-index ne vaut que dans son propre plan : la carte
                 du Mur des Songes, posée plus bas dans la page, recouvrait tout.
                 ⚠️ RÈGLE : un panneau qui doit flotter au-dessus de la page ne se
                 place pas en `absolute` dans son parent. Il se met en `fixed`, aux
                 étages déjà utilisés par les feuilles du module stories (8700+).
                 Le panneau est donc calé sous le bouton, mais hors du flux : il
                 recouvre désormais tout ce qui vient après. */
              menuOuvertProfil ? h("div", { style: { position: "fixed", top: "calc(env(safe-area-inset-top) + 96px)", right: 16, zIndex: 8801, minWidth: 208, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "linear-gradient(180deg, rgba(19,24,29,0.99), rgba(10,13,17,0.99))", boxShadow: "0 18px 40px rgba(0,0,0,0.55)" } },
                (function () {
                  var entrees = [];
                  entrees.push({ cle: "photo", txt: T("Changer ma photo", "Change my photo", "Cambiar mi foto", "Cambiare la mia foto", "\u5199\u771f\u3092\u5909\u66f4", "Mein Foto \u00e4ndern", "\u062a\u063a\u064a\u064a\u0631 \u0635\u0648\u0631\u062a\u064a", "更换我的照片", "Mijn foto wijzigen", "Trocar minha foto", "Byt mitt foto", "Сменить моё фото", "Zmień moje zdjęcie", "사진 바꾸기"), act: function () { fileRef.current && fileRef.current.click(); } });
                  if (profil.avatar || profil.avatar_url) entrees.push({ cle: "modif", txt: T("Modifier ma photo", "Edit my photo", "Editar mi foto", "Modifica la mia foto", "\u5199\u771f\u3092\u7de8\u96c6", "Mein Foto bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0635\u0648\u0631\u062a\u064a", "修改我的照片", "Mijn foto bewerken", "Editar minha foto", "Redigera mitt foto", "Изменить моё фото", "Edytuj moje zdjęcie", "사진 수정하기"), act: function () { modifierPhoto(); } });
                  entrees.push({ cle: "album", txt: T("Mon album", "My album", "Mi \u00e1lbum", "Il mio album", "\u30a2\u30eb\u30d0\u30e0", "Mein Album", "\u0623\u0644\u0628\u0648\u0645\u064a", "我的相册", "Mijn album", "Meu álbum", "Mitt album", "Мой альбом", "Mój album", "내 앨범"), act: function () { setAlbumOuvert(true); } });
                  entrees.push({ cle: "msg", txt: T("Mes messages", "My messages", "Mis mensajes", "I miei messaggi", "\u30e1\u30c3\u30bb\u30fc\u30b8", "Meine Nachrichten", "\u0631\u0633\u0627\u0626\u0644\u064a", "我的消息", "Mijn berichten", "Minhas mensagens", "Mina meddelanden", "Мои сообщения", "Moje wiadomości", "내 메시지"), act: function () { setEcran("messagerie"); } });
                  entrees.push({ cle: "zik", txt: T("Ma musique", "My music", "Mi m\u00fasica", "La mia musica", "\u97f3\u697d", "Meine Musik", "\u0645\u0648\u0633\u064a\u0642\u0627\u064a", "我的音乐", "Mijn muziek", "Minha música", "Min musik", "Моя музыка", "Moja muzyka", "내 음악"), act: function () { setDemandeMusique(function (n) { return n + 1; }); } });
                  return entrees.map(function (e, ix) {
                    return h("button", {
                      key: e.cle,
                      onClick: function (eC) { if (eC && eC.stopPropagation) eC.stopPropagation(); setMenuOuvertProfil(false); try { e.act(); } catch (eX) { } },
                      style: { display: "block", width: "100%", textAlign: "left", padding: "12px 15px", background: "none", border: "none", borderTop: ix ? "1px solid rgba(255,255,255,0.07)" : "none", color: "#F3EEE4", fontSize: 12.5, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" }
                    }, e.txt);
                  });
                })())
              : null) : null,
            __estVisite ? h("button", { onClick: ouvrirMessageAvecVisite, disabled: messageEnCours, style: { width: 28, height: 28, borderRadius: "50%", background: "rgba(197,170,120,0.2)", border: "1px solid rgba(197,170,120,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: messageEnCours ? 0.6 : 1 } }, h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "#C5AA78", strokeWidth: 1.9 }, h("path", { d: "M4 5.5 h16 a1 1 0 0 1 1 1 v9 a1 1 0 0 1-1 1 H9 l-4 3.5 v-3.5 H4 a1 1 0 0 1-1-1 v-9 a1 1 0 0 1 1-1 z" }))) : null)),
        (citation ? h("div", { style: { marginTop: 7, fontSize: 13, color: "#BDB6AA", fontStyle: "italic", fontFamily: "Georgia, serif", lineHeight: 1.4 } }, "\u201c" + citation + "\u201d") : null)),
    /* 16/08 (décision de Blandine) : LA PASTILLE « Voir mes quêtes » EST RETIRÉE.
       Elle faisait doublon avec la carte « Tes quêtes » — même action
       (setEcran("quetes")), mais elle ne montrait rien, là où la carte porte le
       badge de niveau, la barre d'XP et le compte de points. Ses mots :
       « pourquoi on a deux trucs au lieu d'un ».
       NEUTRALISÉE SUR PLACE, pas coupée (règle du 15/08 : dans du React sans
       JSX, une ligne entière emporte souvent des fermetures du bloc parent).
       Repasser la condition à !__estVisite la fait revenir. */
    false && !__estVisite ? h("button", { onClick: function () { setEcran("quetes"); }, style: { display: "inline-flex", alignItems: "center", gap: 6, margin: "12px 16px 0", padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(197,170,120,0.35)", background: "rgba(197,170,120,0.08)", color: "#C5AA78", fontSize: 11, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\ud83c\udfc6 " + T("Voir mes qu\u00eates", "See my quests", "Ver mis misiones", "Vedi le mie missioni", "\u30ad\u30fc\u30af\u30b9\u3092\u898b\u308b", "Meine Quests ansehen", "\u0639\u0631\u0636 \u0645\u0647\u0627\u0645\u064a", "查看我的任务", "Mijn quests bekijken", "Ver minhas missões", "Se mina uppdrag", "Смотреть мои квесты", "Zobacz moje zadania", "내 퀘스트 보기") + " \u203a") : null,
    /* ══════════════════════════════════════════════════════════════════════
       16/08 — LE MUR DES SONGES, REECRIT SUR SA PAGE.
       Demande de Blandine, ses mots : « j'avais demandé à ce qu'elle soit
       remontée au-dessus des story sur SA page dans la page cavalier ».
       Le bloc avait été DEPLACE sur Communauté le 15/08 (où il plantait,
       ses variables étant restées ici), puis retiré de Communauté le 16/08
       pour réparer la page. Entre les deux, personne ne l'a remis ici : il
       n'était plus affiché nulle part. Le texte, lui, n'a jamais bougé —
       il vit dans profiles.ma_voix.
       Il est donc RECRIT, pas déplacé, et posé AU-DESSUS du bandeau de
       stories comme demandé.
       Les états editVoix / voixLocal (déclarés en tête de cette fonction)
       redeviennent vivants : ce sont eux d'origine, ils étaient orphelins.
       En visite, on lit ma_voix du profil VISITE et l'édition est fermée —
       exactement la règle de « Mon récit » juste en dessous, aucune fuite
       d'un cavalier à l'autre. Rien ne s'affiche si le visité n'a rien écrit.
       ⚠️ Préparation Flutter : ce bloc ne parle qu'à majProfil (Repository
       profil). Aucune requête directe, aucune connaissance du schéma.
       ══════════════════════════════════════════════════════════════════════ */
    ((function () {
      var thS = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#C5AA78", lumineux: "#C5AA78" };
      if (CAV_V2) return null;   /* 14/10 (1115) Blandine : « retire le mur des songes » (page Cavalier V2 ; code et donnees conserves) */
      function rgbS(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(thS.principal, a) : thS.principal; }
      var voixTxtS = __estVisite ? ((profil && profil.ma_voix) || "") : ((profRecit && profRecit.ma_voix) || (profil && profil.ma_voix) || "");
      var editableS = !__estVisite;
      if (!editableS && !voixTxtS) return null;
      var PortalS = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
      function sauverVoixS() {
        var txt = (voixLocal || "").trim();
        setEditVoix(false);
        /* Garde-fou repris du 06/08 : valider un champ vide n'efface jamais
           silencieusement un texte existant. */
        if (!txt && (((profRecit && profRecit.ma_voix) || (profil && profil.ma_voix) || "").trim())) { return; }
        try {
          majProfil({ ma_voix: txt || null }).then(function (r) {
            if (r && r.error) { try { console.warn("[Hype] echec enregistrement ma_voix", r.error); } catch (eW) { } return; }
            if (r && r.data) {
              setProfRecit(r.data);
              try { if (ctx && typeof ctx.setProfil === "function") { var dd = r.data; ctx.setProfil(function (pp) { var np = Object.assign({}, pp); np.ma_voix = dd.ma_voix; return np; }); } } catch (eS2) { }
            }
          }).catch(function (eC) { try { console.warn("[Hype] echec enregistrement ma_voix", eC); } catch (eW2) { } });
        } catch (e) { }
      }
      /* 17/08 (demande de Blandine) : la citation passe de 18 a 15,5 px,
         interligne 1,5 -> 1,45. Le placeholder suit a 13,5 pour rester
         coherent. `EncreLumineuse` herite de la taille, rien a changer chez lui. */
      var corpsS = voixTxtS
        ? h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 15.5, lineHeight: 1.45, color: "#F3EEE4" } }, h(EncreLumineuse, { text: voixTxtS }))
        : h("div", { style: { fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13.5, lineHeight: 1.5, color: "rgba(243,238,228,.34)" } },
          T("\u00c9cris une citation, une devise, la phrase qui te porte\u2026", "Write a quote, a motto, the line that carries you\u2026", "Escribe una cita, un lema, la frase que te sostiene\u2026", "Scrivi una citazione, un motto, la frase che ti porta\u2026", "\u3042\u306a\u305f\u3092\u652f\u3048\u308b\u8a00\u8449\u3092\u66f8\u3053\u3046\u2026", "Schreib ein Zitat, ein Motto, den Satz, der dich tr\u00e4gt\u2026", "\u0627\u0643\u062a\u0628\u064a \u0627\u0642\u062a\u0628\u0627\u0633\u0627 \u0623\u0648 \u0634\u0639\u0627\u0631\u0627\u060c \u0627\u0644\u062c\u0645\u0644\u0629 \u0627\u0644\u062a\u064a \u062a\u0644\u0647\u0645\u0643\u2026", "写一句名言、座右铭，或者支撑你的那句话…", "Schrijf een citaat, een motto, de zin die jou draagt…", "Escreva uma citação, um lema, a frase que te move…", "Skriv ett citat, ett motto, meningen som bär dig…", "Напиши цитату, девиз, фразу, которая тебя ведёт…", "Napisz cytat, dewizę, zdanie, które cię niesie…", "인용구, 좌우명, 나를 이끄는 한마디를 써 보세요…"));
      return h("div", { style: { margin: "14px 0 0" } },
        /* 17/08 (demande de Blandine) : l encart se resserre. Padding
           20/18/18 -> 15/15/13, rayon 20 -> 17, marge du bloc 18 -> 14,
           gros guillemet 110 -> 84 px (il doit maigrir avec la carte, sinon il
           devient le sujet), libelle 10 -> 9 px et son air sous lui 12 -> 9,
           hauteur minimale du corps 54 -> 40 px. Les gouttieres de 16 px ne
           bougent pas : c est le calage commun a toute la page. */
        h("div", { style: { position: "relative", margin: "0 16px", padding: "15px 15px 13px", borderRadius: 17, background: CAV_GRAND, border: "1px solid " + CAV_BORD, WebkitBackdropFilter: CAV_FLOU, backdropFilter: CAV_FLOU, overflow: "hidden" } },
          h("div", { style: { position: "absolute", right: 12, top: -6, fontFamily: "Georgia, serif", fontSize: 84, color: rgbS(0.08), lineHeight: 1, pointerEvents: "none" } }, "\u201c"),
          h("div", { style: { position: "relative", fontSize: 9, letterSpacing: "0.26em", color: thS.principal, textTransform: "uppercase", fontWeight: 700, fontFamily: M, marginBottom: 9 } },
            "\u2726 " + T("Le mur des songes", "The wall of dreams", "El muro de los sue\u00f1os", "Il muro dei sogni", "\u5922\u306e\u58c1", "Die Wand der Tr\u00e4ume", "\u062c\u062f\u0627\u0631 \u0627\u0644\u0623\u062d\u0644\u0627\u0645", "梦想墙", "Het prikbord van dromen", "O mural dos sonhos", "Drömmarnas vägg", "Стена грёз", "Ściana marzeń", "꿈의 벽")),
          h("div", { style: { position: "relative", minHeight: 40 } }, corpsS),
          /* 16/08 (demande de Blandine) : le bouton passe en GRIS, DISCRET, EN BAS
           A DROITE. Il etait turquoise et cale a gauche, donc il tirait l'oeil
           avant le texte. Ses mots : « qu'il soit plus discret ». Le texte
           redevient le sujet de la carte ; le bouton n'est plus qu'une porte. */
        editableS ? h("div", { style: { position: "relative", display: "flex", justifyContent: "flex-end", marginTop: 9 } },
          h("button", { onClick: function () { setVoixLocal(voixTxtS || ""); setEditVoix(true); }, style: { padding: "6px 11px", borderRadius: 999, fontSize: 10, fontWeight: 600, fontFamily: M, cursor: "pointer", border: "1px solid rgba(197,170,120,0.36)", background: CAV_BTN, color: "#F3EEE4", letterSpacing: "0.04em" } },
            "\u270e " + T("\u00c9crire", "Write", "Escribir", "Scrivere", "\u66f8\u304f", "Schreiben", "\u0643\u062a\u0627\u0628\u0629", "写点什么", "Schrijven", "Escrever", "Skriv", "Написать", "Napisz", "쓰기"))) : null),
        (editableS && editVoix) ? PortalS(h("div", { onClick: function () { setEditVoix(false); }, style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "calc(env(safe-area-inset-top) + 60px) 0 0" } },
          h("div", { onClick: function (eM) { eM.stopPropagation(); }, style: { width: "90%", maxWidth: 420, borderRadius: 20, border: "1px solid " + rgbS(0.4), background: "linear-gradient(180deg, rgba(14,22,28,0.98), rgba(8,11,15,0.98))", padding: 18 } },
            h("div", { style: { fontFamily: C, fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } },
              T("Le mur des songes", "The wall of dreams", "El muro de los sue\u00f1os", "Il muro dei sogni", "\u5922\u306e\u58c1", "Die Wand der Tr\u00e4ume", "\u062c\u062f\u0627\u0631 \u0627\u0644\u0623\u062d\u0644\u0627\u0645", "梦想墙", "Het prikbord van dromen", "O mural dos sonhos", "Drömmarnas vägg", "Стена грёз", "Ściana marzeń", "꿈의 벽")),
            h("div", { style: { fontSize: 11, color: "rgba(243,238,228,.45)", textAlign: "center", marginBottom: 12, fontFamily: M } },
              T("Citation, devise ou philosophie \u2014 6 lignes max", "Quote, motto or philosophy \u2014 6 lines max", "Cita, lema o filosof\u00eda \u2014 6 l\u00edneas m\u00e1x", "Citazione, motto o filosofia \u2014 max 6 righe", "\u5f15\u7528\u30fb\u5ea7\u53f3\u9298\u30fb\u54f2\u5b66 \u2014 \u6700\u59276\u884c", "Zitat, Motto oder Philosophie \u2013 max. 6 Zeilen", "\u0627\u0642\u062a\u0628\u0627\u0633 \u0623\u0648 \u0634\u0639\u0627\u0631 \u0623\u0648 \u0641\u0644\u0633\u0641\u0629 \u2014 6 \u0623\u0633\u0637\u0631 \u0643\u062d\u062f \u0623\u0642\u0635\u0649", "名言、座右铭或人生哲学——最多 6 行", "Citaat, motto of levensvisie — max. 6 regels", "Citação, lema ou filosofia — máx. 6 linhas", "Citat, motto eller livsfilosofi — max 6 rader", "Цитата, девиз или философия — не более 6 строк", "Cytat, dewiza lub filozofia — maks. 6 linijek", "인용구, 좌우명, 철학 — 최대 6줄")),
            h("textarea", { value: voixLocal, onChange: function (eI) { var v = eI.target.value; if ((v.match(/\n/g) || []).length > 5) return; setVoixLocal(v.slice(0, 260)); }, rows: 5, maxLength: 260, placeholder: T("\u00c9cris ici\u2026", "Write here\u2026", "Escribe aqu\u00ed\u2026", "Scrivi qui\u2026", "\u3053\u3053\u306b\u66f8\u304f\u2026", "Schreib hier\u2026", "\u0627\u0643\u062a\u0628\u064a \u0647\u0646\u0627\u2026", "在这里写…", "Schrijf hier…", "Escreva aqui…", "Skriv här…", "Пиши здесь…", "Pisz tutaj…", "여기에 써 보세요…"), style: { width: "100%", boxSizing: "border-box", borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)", color: "#F3EEE4", padding: "12px 13px", fontSize: 16, lineHeight: 1.55, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", resize: "none", outline: "none" } }),
            h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
              h("button", { onClick: function () { setEditVoix(false); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#BDB6AA", fontSize: 12.5, fontWeight: 600, fontFamily: M, cursor: "pointer" } },
                T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
              h("button", { onClick: function () { sauverVoixS(); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "none", background: "linear-gradient(90deg," + thS.principal + "," + thS.lumineux + ")", color: "#1A1408", fontSize: 12.5, fontWeight: 800, fontFamily: M, cursor: "pointer" } },
                T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))))) : null);
    })()),
    /* 12/08 (114) : bandeau des stories. */
    /* ⚠️ 17/08 (session 138) — LES DEUX BANDES SONT REMISES, ET AFFINEES.
       ⚠️ INCIDENT A TRACER : je les avais RETIREES plus tot dans cette meme
       seance, en ecrivant qu elles n avaient « jamais ete validees ». C ETAIT
       FAUX. Le commentaire d origine du 16/08 dit « demande de Blandine » : ce
       sont bien elles qu elle avait demandees. La mention « Deduction de Claude —
       a valider » qui l accompagnait portait UNIQUEMENT sur leur CALAGE (les
       gouttieres de 16 px plutot que les 330 px centres de Linguae), pas sur leur
       existence. J ai lu un « a valider » qui portait sur un detail de largeur et
       je l ai etendu a la fonctionnalite entiere. Ses mots : « c est moi qui les
       ai fait mettre, tu as decide tout seul de les retirer ». Interdit rappele :
       ne JAMAIS trancher a sa place, et ne jamais elargir la portee d un « a
       valider ».
       CHOIX FAIT PAR BLANDINE SUR MAQUETTE (`maquette-bandes.html`, sept
       epaisseurs x trois niveaux d air, capture de 15h37) : bande de 18 px
       (etait 26), calage inchange sur les gouttieres de 16 px, et air
       « intermediaire ».
       LE COMPTE, du haut vers la premiere photo :
           12 px  marge de cette enveloppe
         + 10 px  padding haut du module
         + 22 px  padding haut du rail defilant (hype-stories.js)
         + 18 px  la bande elle-meme
         = 62 px
       ⚠️ LES 22 px SONT INTOUCHABLES : debordement du halo (21,1 px a l etendue
       1,32x). En dessous, `overflowY: hidden` tranche le halo net en haut — piege
       deja paye en 19au. Et reduire l etendue du halo pour gagner ces pixels
       ramenerait l erreur du hublot (passe 2 du halo). */
    /* 14/10 (1124) les stories ne sont plus sous la photo en V2 : elles sont dans la colonne a droite de la photo (cavV2Hero). */
    (!CAV_V2 && typeof window !== "undefined" && window.BandeauStories)   /* (1106) */
      ? h("div", { style: { margin: "12px 0 0" } },
          h("span", { style: { display: "block", height: 18, background: "rgba(37,79,96,0.14)", borderRadius: 6, margin: "0 16px" } }),
          h(window.BandeauStories, { forme: "libre", padding: "10px 0 10px" }),
          h("span", { style: { display: "block", height: 18, background: "rgba(37,79,96,0.14)", borderRadius: 6, margin: "0 16px" } }))
      : null,
    /* 12/08 (116) : rail des A LA UNE du cavalier AFFICHE (visite ou soi-meme).
       Une a la une est un album de cible cavalier:<id> — aucune table nouvelle. */
    /* 17/08 (136) : le MUR IMMERSIF remplace le rail des a la une SUR CETTE PAGE
       UNIQUEMENT (mots de Blandine : « pour l'instant on va faire uniquement en
       bleu sur la page Cavalier, on verra le reste ensuite »). Communaute, Club
       et Ecurie gardent RailALaUne tel quel — leurs trois appels sont intacts.
       Repli sur le rail si le module n'est pas encore charge : aucune page nue. */
    /* 11/10 (958) — LES « À LA UNE » (mur immersif) SONT RETIRÉES DE CETTE PAGE (Blandine : « Retire les story à la une
       et laisse juste les story, on réfléchira plus tard à une autre proposition »). Le bandeau des stories, plus haut,
       reste. Rien n est supprimé : les à la une restent en base et sur les pages Communauté / Club / Écurie (RailALaUne).
       Pour les remettre ici : rétablir l appel à window.MurImmersif (repli window.RailALaUne), userId = visite ou profil. */
    null,
    /* 13/08 (123-124) : la CHANSON DE MA PAGE (decision de Blandine, option A).
       Pastille pour tous si un morceau est choisi ; le proprietaire choisit. */
    (typeof window !== "undefined" && window.PastilleMusiquePage)
      ? h(window.PastilleMusiquePage, { userId: (__visitePub && __visitePub.id) || (profil && profil.id) || null, proprio: !__visitePub, sansBoutonChoix: !__visitePub, ouvrirChoix: demandeMusique })
      : null,
    /* 28/07 : alerte « ta photo n est pas visible par les autres » (page profil, non visite). */
    !__estVisite ? h(EncartPhotoInvisible, { T: T, onRemettre: function () { try { if (typeof modifierPhoto === "function") { modifierPhoto(); return; } } catch (e) { } try { var inp = document.querySelector('input[type=file]'); if (inp) inp.click(); } catch (e2) { } } }) : null,
    /* 22/09 (349) - LES RACCOURCIS DE LA PAGE CAVALIER, DESSIN DES PAGES CHEVAL ET ECURIE.
       Sa demande : « il faudrait les onglets des chevaux et de l écurie sur la page cavalier :
       photos, vidéos, performances, progression qui l emmène vers son carnet de bord, théorie
       vers la page des galops, et actualité » ; « au besoin la page actualité tu mettras comme
       d habitude grisée en écrivant prochainement ». « Ok » (visite : Progression et Théorie
       cachées - le carnet est privé, l apprentissage est le sien).
       Même dessin que carteG de la page du club (hauteur 104, pastille ronde, pictogramme tracé,
       Cinzel 12.5, pied en petites capitales) ; une carte sans page = même dessin à 50 %.
       Destinations RÉELLES : Photos -> « memoirescavalier » (Hype Memories : récit, albums ; sait
       déjà lire la visite) ; Performances -> « resultats-cavalier » (346) ; Progression ->
       « carnet » ; Théorie -> « galops ». Vidéos et Actualité : aucune page n existe -> grisées
       « Prochainement » (jamais un lien qui ne mène nulle part). */
    cavZ("acces", (function () {
      /* 22/09 (367) - LE MEME DESSIN QUE LES TUILES DE LA FICHE CHEVAL (carteR), trait pour trait :
         pastille a bord teinte 0,7 avec halo, fond de pastille plus sombre, voile degrade sur la
         carte, teinte de l appli (teinteHypeActive, comme la fiche) au lieu d un turquoise fige.
         Sans photo (sa decision : « pas dans les tuiles »), comme les tuiles Sante / Videos /
         Actualite de la fiche cheval. Sa remarque : « pas avec le bon design ». */
      var thP = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#C5AA78", lumineux: "#C5AA78" };
      var TQL = "#C5AA78";   /* (674) champagne mat unique */
      function tAP(aP) { try { return (typeof teinteRGBA === "function") ? teinteRGBA(thP.principal, aP) : ("rgba(197,170,120," + aP + ")"); } catch (eT) { return "rgba(197,170,120," + aP + ")"; } }
      /* 14/10 (1105) Cavalier V2, etape 2 : les 6 acces deviennent des petites tuiles illustrees (images fournies par Blandine,
         fichiers images/cavalier-acces-*.webp), une seule ligne de 6 ; memes destinations, memes regles (grisee « Prochainement »,
         cadenas « Prive » en visite). L ancien dessin reste tel quel hors V2. */
      var IMG_ACCES_V2 = { hi: "histoire", pe: "performances", pr: "progression", ph: "photos", vi: "videos", ac: "actualite" };
      var largAcc = 390; try { largAcc = window.innerWidth || 390; } catch (eLa) { }
      /* (1118) Blandine a choisi la proposition N (« le N est pas mal ») : un menu discret en liste sur 2 colonnes (3 sur
         tablette et ordinateur) — mini vignette carree (ses images), le nom, une fleche champagne, filet champagne fin dessous.
         Grisee = « Prochainement » (Actualite) ; cadenas a la place de la fleche quand c est prive (visite). */
      function carteV2(tiP, actP, kP, priveP) {
        var fermeV = !actP;
        var rtlA = false; try { rtlA = document.documentElement.dir === "rtl"; } catch (eRa) { }
        /* 15/10 (1131) CAVALIER V2 IPAD / ORDINATEUR, BUILD 2 : des 768 px, les 6 acces deviennent une rangee de cartes photo
           (memes images, memes destinations, memes regles : grisee « Prochainement », cadenas en visite). iPhone : la liste N, inchangee. */
        if (cavTab && !cavPanneau) return h("div", { key: kP, role: fermeV ? null : "button", "aria-label": tiP, onClick: actP || null,
          style: { minWidth: 0, cursor: fermeV ? "default" : "pointer", opacity: fermeV ? 0.5 : 1, textAlign: "center" } },
          h("div", { "aria-hidden": "true", style: { position: "relative", width: "100%", aspectRatio: "5 / 4", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,166,107,0.34)", backgroundColor: "#0b1316", backgroundImage: "url(images/cavalier-acces-" + (IMG_ACCES_V2[kP] || "histoire") + ".webp)", backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.45)" } },
            priveP ? h("span", { style: { position: "absolute", top: 6, insetInlineEnd: 6, width: 24, height: 24, borderRadius: "50%", background: "rgba(5,8,11,0.7)", border: "1px solid rgba(201,166,107,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 } }, "\uD83D\uDD12") : null),
          h("div", { style: { fontFamily: M, fontSize: cavOrdi ? 12.5 : 11.5, color: "#F3EEE4", marginTop: 8, lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, tiP));
        return h("div", { key: kP, role: fermeV ? null : "button", "aria-label": tiP, onClick: actP || null,
          style: { display: "flex", alignItems: "center", gap: 10, height: cavPanneau ? 60 : 46, minWidth: 0, paddingInlineStart: cavPanneau ? 4 : 0, borderBottom: "1px solid rgba(201,166,107,0.16)", cursor: fermeV ? "default" : "pointer", opacity: fermeV ? 0.5 : 1 } },
          cavPanneau ? null : h("span", { "aria-hidden": "true", style: { flex: "0 0 30px", height: 30, borderRadius: 8, backgroundColor: "#0b1316", backgroundImage: "url(images/cavalier-acces-" + (IMG_ACCES_V2[kP] || "histoire") + ".webp)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.9 } }),
          h("span", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: cavPanneau ? 14.5 : 12.5, color: "#F3EEE4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, tiP),
          h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: "#C9A66B", fontSize: priveP ? (cavPanneau ? 13 : 11) : (cavPanneau ? 20 : 16), lineHeight: 1 } }, priveP ? "\uD83D\uDD12" : (fermeV ? "" : (rtlA ? "\u2039" : "\u203a"))));
      }
      function carteP(icP, tiP, ctaP, actP, kP, priveP) {
        if (CAV_V2) return carteV2(tiP, actP, kP, priveP);
        var fermeP = !actP;
        if (priveP) { ctaP = "\uD83D\uDD12 " + T("Priv\u00e9", "Private", "Privado", "Privato", "\u975e\u516c\u958b", "Privat", "\u062e\u0627\u0635", "私密", "Privé", "Privado", "Privat", "Приватно", "Prywatne", "비공개"); } /* (369) */
        return h("div", { key: kP, role: fermeP ? null : "button", onClick: actP || null,
          style: { position: "relative", borderRadius: 15, overflow: "hidden", border: "1px solid " + (fermeP ? "rgba(92,135,146,0.22)" : CAV_BORD), background: "linear-gradient(165deg,#111B1F 0%,#0B1215 100%)" /* 11/10 (965) fond petrole PLEIN des tuiles de l accueil (avant CAV_PETIT, semi-transparent : « tres delave ») */, cursor: fermeP ? "default" : "pointer", height: 104, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "9px 4px 7px", boxShadow: "0 8px 22px rgba(0,0,0,0.35)", opacity: fermeP ? 0.5 : 1, boxSizing: "border-box" } },
          null /* (965) lueur champagne du haut retiree (elle donnait le ton beige « delave ») */,
          null /* (965) voile sombre du bas retire (il ternissait la tuile) */,
          h("div", { style: { position: "relative", zIndex: 2, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(197,170,120,0.6)", background: CAV_ICONE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 13px rgba(197,170,120,0.2)" } },
            h("svg", { viewBox: "0 0 24 24", style: { width: 20, height: 20, stroke: TQL, fill: "none", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } }, icP)),
          h("div", { style: { position: "relative", zIndex: 2, fontFamily: C, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, color: "#F3EEE4", marginTop: 9, whiteSpace: "nowrap" } }, tiP),
          h("div", { style: { position: "relative", zIndex: 2, marginTop: "auto", paddingTop: 5, borderTop: "1px solid " + tAP(0.22), width: "86%", textAlign: "center", fontSize: 8, letterSpacing: "0.08em", fontWeight: 800, color: priveP ? "#BDB6AA" : TQL, textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ctaP + (fermeP ? "" : " \u2192")));
      }
      var OUVRIR = T("Ouvrir", "Open", "Abrir", "Apri", "\u958b\u304f", "\u00d6ffnen", "\u0641\u062a\u062d", "打开", "Openen", "Abrir", "Öppna", "Открыть", "Otwórz", "열기");
      var BIENTOT = T("Prochainement", "Coming soon", "Pr\u00f3ximamente", "Prossimamente", "\u8fd1\u65e5\u516c\u958b", "Demn\u00e4chst", "\u0642\u0631\u064a\u0628\u0627", "即将到来", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 공개");
      function allerResultats() {
        (async function () {
          var idR = (__visitePub && __visitePub.id) || null;
          if (!idR) { try { var uR = await utilisateurActuel(); idR = (uR && uR.id) || null; } catch (eR) { idR = null; } }
          try { window.__resCavaliereId = idR || ""; } catch (eW) { }
          setEcran("resultats-cavalier");
        })();
      }
      /* 28/09 (482) — ONGLETS ALIGNES SUR CEUX D UN CHEVAL (choix A de Blandine) : Histoire /
         Performances / Progression / Photos / Videos / Actualite. THEORIE RETIREE (« l acces aux galops est
         deja possible depuis la page performance »). Histoire = la page du recit (memoirescavalier, comme
         « Lire la suite ») ; Photos = nouvelle grille EcranPhotosCavaliere. En visite : Progression reste
         grisee avec son cadenas (369) ; toujours 6 tuiles, grille 3 x 2. */
      var pageAMoi = !__estVisite || !!(__visitePub && moiIdAlb && String(__visitePub.id) === String(moiIdAlb));
      function allerActu() {
        (async function () {
          var idA = (__visitePub && __visitePub.id) || null;
          if (!idA) { try { var uA = await utilisateurActuel(); idA = (uA && uA.id) || null; } catch (eA) { idA = null; } }
          try { window.__actuCavaliereId = idA || ""; } catch (eW2) { }
          setEcran("actualite-cavalier");
        })();
      }
      var cartes = [
        carteP(h("g", null, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" })),
          T("Histoire", "Story", "Historia", "Storia", "\u30b9\u30c8\u30fc\u30ea\u30fc", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기"), OUVRIR, function () { setEcran("memoirescavalier"); }, "hi"),
        carteP(h("g", null, h("path", { d: "M8 4h8v3a4 4 0 0 1-8 0z" }), h("path", { d: "M8 5.5H5a3 3 0 0 0 3 3M16 5.5h3a3 3 0 0 1-3 3M12 11v4M9 20h6M10 15h4v5h-4z" })),
          T("Performances", "Performances", "Resultados", "Risultati", "\u6210\u7e3e", "Leistungen", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적"), OUVRIR, allerResultats, "pe"),
        carteP(h("g", null, h("path", { d: "M4 19h16M6 16l4-5 3 3 5-7" }), h("path", { d: "M15 7h3v3" })),
        T("Progression", "Progress", "Progreso", "Progressi", "\u6210\u9577", "Fortschritt", "\u0627\u0644\u062a\u0642\u062f\u0645", "进度", "Voortgang", "Progresso", "Framsteg", "Прогресс", "Postępy", "성장"), OUVRIR, pageAMoi ? function () { setEcran("apprentissage"); } : null, "pr", !pageAMoi),
        carteP(h("g", null, h("rect", { x: 3.5, y: 5.5, width: 17, height: 13, rx: 2 }), h("circle", { cx: 9, cy: 10.5, r: 1.8 }), h("path", { d: "M4 17l5-4.5 3.5 3 3-2.5 4.5 4" })),
          T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"), OUVRIR, function () { /* (482) la grille de ses photos */
            (async function () {
              var idPh = (__visitePub && __visitePub.id) || null;
              if (!idPh) { try { var uPh = await utilisateurActuel(); idPh = (uPh && uPh.id) || null; } catch (ePh) { idPh = null; } }
              try { window.__photosCavaliereId = idPh || ""; } catch (eW4) { }
              setEcran("photos-cavalier");
            })();
          }, "ph"),
        carteP(h("g", null, h("rect", { x: 3.5, y: 6, width: 12.5, height: 12, rx: 2 }), h("path", { d: "M16 10.5l4.5-2.5v8L16 13.5z" })),
          T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"), OUVRIR, function () { /* (352) */
            (async function () {
              var idV = (__visitePub && __visitePub.id) || null;
              if (!idV) { try { var uV = await utilisateurActuel(); idV = (uV && uV.id) || null; } catch (eV) { idV = null; } }
              try { window.__videosCavaliereId = idV || ""; } catch (eW3) { }
              setEcran("videos-cavalier");
            })();
          }, "vi"),
        carteP(h("g", null, h("rect", { x: 4, y: 4.5, width: 16, height: 15, rx: 2 }), h("path", { d: "M7.5 9h9M7.5 12.5h9M7.5 16h5" })),
        T("Actualit\u00e9", "News", "Novedades", "Notizie", "\u30cb\u30e5\u30fc\u30b9", "Neuigkeiten", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"), OUVRIR, allerActu /* 19/10 (nuit) Blandine : « ouvre l acces » (etait grisee « Prochainement » depuis le 28/09, 508) */, "ac")
      ];
      /* 22/09 (365) : en visite il reste 4 tuiles - sur 3 colonnes, la 4e restait seule sur sa ligne
         (sa capture de 13 h 24). 4 tuiles -> grille 2 x 2 ; 6 tuiles -> 3 x 2 comme avant. */
      if (CAV_V2 && cavPanneau) return h("nav", { "data-cav-acces": "panneau", style: { display: "flex", flexDirection: "column", marginTop: 28, borderTop: "1px solid rgba(201,166,107,0.16)" } }, cartes);   /* 22/10 ordinateur : liste du panneau gauche */
      if (CAV_V2 && cavTab) return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: cavOrdi ? 16 : 10, margin: cavOrdi ? "30px 16px 0" : "26px 16px 0", maxWidth: cavOrdi ? 900 : "none" } }, cartes);   /* (1131) une rangee de 6 cartes photo */
      if (CAV_V2) return h("div", { style: { display: "grid", gridTemplateColumns: largAcc >= 700 ? "repeat(3, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))", columnGap: largAcc >= 700 ? 24 : 16, margin: largAcc >= 700 ? "26px 24px 0" : "20px 16px 0" } }, cartes);   /* (1105) ; (1118) liste N */
      return h("div", { style: { display: "grid", gridTemplateColumns: (cartes.length === 4 ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"), gap: 9, margin: "26px 16px 0" } }, cartes);
    })()),
    /* 22/09 (347) - L ENCART ECURIE DE LA PAGE CAVALIER. Blandine : « rares sont ceux qui en ont
       deux ; il vaudrait mieux un petit + quelque part pour ajouter une écurie qu un gros onglet qui
       prend la moitié de la largeur ; tant qu il y a une seule écurie on garde l onglet horizontal
       qui prend la largeur et on affiche l encart de l écurie concernée ainsi que quelques infos
       (ville et département par exemple) ». « Ok ».
       · une carte PLEINE LARGEUR par écurie (la seconde en dessous, plus compacte) ;
       · la ville et le département viennent de la base des clubs déjà chargée par l appli
         (window.HYPE_CLUBS, même source que l en-tête de la page du club) - rien s il n y est pas ;
       · « + Ajouter une écurie » devient un petit lien sous la carte, et N APPARAÎT PLUS EN VISITE
         (avant, une visiteuse voyait la grosse case « Ajouter une écurie » sur la page d une autre).
       Clics, crayons et éditeurs : inchangés. */
    cavZ("ecuries", (function () {
      function lieuDe(nomE) {
        /* (348) : d abord les clubs REVENDIQUES, écrits à la main dans la page du club
           (CLUBS_REVENDIQUES d EcranGuilde : « ecurie feinn » → « Itteville (Essonne) ») - c est
           là que l en-tête du club prend sa ville ; puis la base des clubs. ⚠️ Deux copies de la
           même table : à changer AUX DEUX ENDROITS. */
        try {
          var REV = { "ecurie feinn": "Itteville (Essonne)" };
          var kR = (typeof clefClubG === "function") ? clefClubG(nomE || "") : String(nomE || "").toLowerCase().trim();
          if (REV[kR]) return REV[kR];
          if (typeof noyauEcurie === "function") { for (var kk in REV) { if (noyauEcurie(kk) === noyauEcurie(nomE || "")) return REV[kk]; } }
        } catch (eRv) { }
        try {
          var bd = (typeof window !== "undefined" && window.HYPE_CLUBS && window.HYPE_CLUBS.length) ? window.HYPE_CLUBS : null;
          if (!bd || !nomE || typeof clefClubG !== "function") return "";
          var k = clefClubG(nomE);
          for (var i2 = 0; i2 < bd.length; i2++) {
            if (bd[i2] && clefClubG(bd[i2].nom || "") === k) {
              var ic = bd[i2];
              return ic.ville ? (ic.ville + (ic.departement ? " (" + ic.departement + ")" : "")) : (ic.departement || "");
            }
          }
        } catch (eL) { }
        return "";
      }
      var nom1 = (profil.club || profil.ecurie || "");
      var nom2 = (profil.club2 || profil.ecurie2 || "");
      var lieu1 = lieuDe(nom1), lieu2 = lieuDe(nom2);
      var crayon = function (onClickC, label) {
        return h("button", { onClick: onClickC, "aria-label": label, style: { position: "absolute", top: nom2 ? 8 : 10, right: nom2 ? 8 : 10, width: nom2 ? 26 : 30, height: nom2 ? 26 : 30, borderRadius: "50%", background: CAV_ICONE, border: "1px solid rgba(197,170,120,0.36)", color: "#C5AA78", fontSize: nom2 ? 11 : 12, cursor: "pointer" } }, "\u270E"); /* (517) un peu plus petit sur les deux cartes */
      };
      /* 22/09 (370) : plus d air entre les tuiles et la carte de l ecurie (« aère un peu avec le haut de
         l encart suivant ») : 22 -> 34 px. */
      /* 26/09 (400) - DEUX ECURIES = DEUX CARRES COTE A COTE (« remettre deux carres cote a cote », « espacer un peu au dessus et en dessous ») ; une seule ecurie : carte pleine largeur inchangee. Espace au-dessus 34 -> 46 px, au-dessous (Mon recit) 22 -> 36 px. */
      /* 14/10 (1105) Cavalier V2 : l ecurie en encart degrade petrole, photo du club fondue a droite (photo d ecurie Hype par
         defaut), « MON ECURIE » en champagne et le nom en grand ; deux ecuries = deux encarts cote a cote ; sans deuxieme
         ecurie, un petit carre en pointillés « + Ecurie » a cote (sa page seulement). Clics et crayons : les memes qu avant.
         Plus d air au-dessus (Blandine : « laisse plus d espace entre les 6 onglets et l onglet ecurie »). */
      if (CAV_V2) {
        if (__estVisite && !nom1) return null;
        var autreV2 = (__estVisite && !(__visitePub && moiIdAlb && String(__visitePub.id) === String(moiIdAlb)));
        var labV2 = autreV2 ? T("Son \u00e9curie", "Their stable", "Su cuadra", "La sua scuderia", "\u6240\u5c5e\u53a9\u820e", "Ihr Stall", "\u0625\u0633\u0637\u0628\u0644\u0647\u0627", "TA的马厩", "Hun stal", "A cocheira dele(a)", "Deras stall", "Конюшня", "Jej stajnia", "그의 마구간") : T("Mon \u00e9curie", "My stable", "Mi cuadra", "La mia scuderia", "\u79c1\u306e\u53a9\u820e", "Mein Stall", "\u0625\u0633\u0637\u0628\u0644\u064a", "我的马厩", "Mijn stal", "Minha cocheira", "Mitt stall", "Моя конюшня", "Moja stajnia", "내 마구간");
        var ombreV2 = "0 1px 10px rgba(0,0,0,0.8)";
        var deuxV2 = !!nom2;
        /* 21/10 (brief groupes cavaliers) : deux écuries = côte à côte sur tablette et ordinateur (mêmes largeur et hauteur),
           l une sous l autre sur iPhone ; la première porte « Écurie principale » ; la localisation sur les deux cartes.
           Une seule écurie : inchangé. */
        var coteV2 = deuxV2 && cavTab;
        var labPrinc = T("\u00c9curie principale", "Main stable", "Cuadra principal", "Scuderia principale", "\u30e1\u30a4\u30f3\u53a9\u820e", "Hauptstall", "\u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u0631\u0626\u064a\u0633\u064a", "主马厩", "Hoofdstal", "Cocheira principal", "Huvudstall", "Основная конюшня", "Stajnia główna", "주 마구간");
        var encartV2 = function (cleE, nomX, lieuX, onOpen, onEdit, labelEdit, labX) {
          return h("div", { key: cleE, onClick: onOpen, role: "button", style: { position: "relative", isolation: "isolate", flex: (deuxV2 && !coteV2) ? "0 0 auto" : 1 /* empilées : la hauteur compte, pas la base 0 */, minWidth: 0, height: cavPanneau ? 168 : (cavOrdi ? 112 : (cavTab ? 100 : ((deuxV2 && !coteV2) ? 96 : 84))) /* 22/10 ordinateur : 168 ; 15/10 (1132) iPad / ordinateur : bandeau plus haut ; 21/10 deux écuries empilées sur iPhone : label + nom + lieu */, borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(201,166,107,0.34)", background: "linear-gradient(160deg, rgba(40,86,104,0.34), rgba(5,8,11,0.10))", boxShadow: "0 16px 34px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", padding: cavPanneau ? "0 44px 0 28px" : (cavTab ? (coteV2 ? "0 34px 0 20px" : "0 52px 0 28px") : (coteV2 ? "0 30px 0 13px" : "0 40px 0 16px")), boxSizing: "border-box" } },
            nomX ? h(FondBanniereClub, { nom: nomX, fondu: true, defaut: "images/fond-cavaliers-ecurie.webp", largeur: coteV2 ? "100%" : (deuxV2 ? "78%" : "68%") }) : null,
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { fontFamily: M, fontSize: cavPanneau ? 11 : (cavTab ? (coteV2 ? 9.5 : 11) : (coteV2 ? 8.5 : 10)), fontWeight: 500, letterSpacing: coteV2 ? "0.18em" : "0.24em", textTransform: "uppercase", color: "#C9A66B", textShadow: ombreV2 } }, labX === undefined ? labV2 : labX),
              h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: cavPanneau ? 30 : (cavTab ? (coteV2 ? 24 : (cavOrdi ? 30 : 28)) : (coteV2 ? 19 : (deuxV2 ? 21 : 22))), fontWeight: 500, color: "#F3EEE4", lineHeight: 1.15, marginTop: 3, whiteSpace: cavPanneau ? "normal" : "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: cavPanneau ? "-webkit-box" : undefined, WebkitLineClamp: cavPanneau ? 2 : undefined, WebkitBoxOrient: cavPanneau ? "vertical" : undefined /* 22/10 ordinateur : un nom long passe sur 2 lignes au lieu d etre coupe */, textShadow: ombreV2 } }, nomX || T("Choisir mon club", "Choose my club", "Elegir mi club", "Scegli il mio club", "\u30af\u30e9\u30d6\u3092\u9078\u3076", "Meinen Verein w\u00e4hlen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u0646\u0627\u062f\u064a\u064a", "选择我的俱乐部", "Mijn manege kiezen", "Escolher meu clube", "Välj min ridklubb", "Выбрать мой клуб", "Wybierz mój klub", "내 클럽 선택하기")),
              lieuX ? h("div", { style: { fontFamily: M, fontSize: cavPanneau ? 14 : (cavTab ? 12 : 10.5), color: "rgba(243,238,228,0.78)", marginTop: cavPanneau ? 7 : (cavTab ? 5 : 3), textShadow: ombreV2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, lieuX) : null),
            (!__estVisite && onEdit) ? h("button", { onClick: onEdit, "aria-label": labelEdit, style: { position: "absolute", top: 7, insetInlineEnd: 7, width: 24, height: 24, borderRadius: "50%", background: "rgba(5,8,11,0.6)", border: "1px solid rgba(243,238,228,0.22)", color: "#F3EEE4", fontSize: 11, lineHeight: 1, cursor: "pointer", padding: 0 } }, "\u270E") : null,
            h("span", { "aria-hidden": "true", style: { position: "absolute", bottom: 9, insetInlineEnd: 10, color: "#C9A66B", fontSize: 18, lineHeight: 1, textShadow: ombreV2 } }, (function () { try { return document.documentElement.dir === "rtl" ? "\u2039" : "\u203a"; } catch (eD) { return "\u203a"; } })()));
        };
        var titreEc = deuxV2 ? h("div", { style: { marginBottom: cavPanneau ? 18 : 14 } }, cavV2Titre(autreV2 ? T("Ses \u00e9curies", "Their stables", "Sus cuadras", "Le sue scuderie", "\u6240\u5c5e\u53a9\u820e", "Ihre St\u00e4lle", "\u0625\u0633\u0637\u0628\u0644\u0627\u062a\u0647\u0627", "TA 的马厩", "Hun stallen", "As cocheiras dele(a)", "Deras stall", "Конюшни", "Jej stajnie", "그의 마구간들") : T("Mes \u00e9curies", "My stables", "Mis cuadras", "Le mie scuderie", "\u79c1\u306e\u53a9\u820e", "Meine St\u00e4lle", "\u0625\u0633\u0637\u0628\u0644\u0627\u062a\u064a", "我的马厩", "Mijn stallen", "Minhas cocheiras", "Mina stall", "Мои конюшни", "Moje stajnie", "내 마구간들"))) : null;
        var cartesEc = h("div", { style: { display: "flex", flexDirection: (deuxV2 && !coteV2) ? "column" : "row", gap: cavPanneau ? 14 : 10 } },
          encartV2("e1", nom1, lieu1, function () { if (nom1) { setEcran("guilde"); } else { setClubLocal({ club: "" }); setEditClub(true); } },
            function (eE1) { if (eE1 && eE1.stopPropagation) eE1.stopPropagation(); setClubLocal({ club: nom1 }); setEditClub(true); }, T("Modifier mon club", "Edit my club", "Editar mi club", "Modifica il mio club", "\u30af\u30e9\u30d6\u3092\u7de8\u96c6", "Meinen Verein bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0646\u0627\u062f\u064a\u064a", "修改我的俱乐部", "Mijn manege wijzigen", "Editar meu clube", "Redigera min ridklubb", "Изменить мой клуб", "Edytuj mój klub", "내 클럽 수정하기"), deuxV2 ? labPrinc : undefined),
          deuxV2
            ? encartV2("e2", nom2, lieu2, function () { try { window.__guildeEcurie = nom2.trim(); } catch (eG2) { } setEcran("guilde"); },
                function (eE2) { if (eE2 && eE2.stopPropagation) eE2.stopPropagation(); setClub2Local({ club: nom2 }); setEditClub2(true); }, T("Modifier ma deuxi\u00e8me \u00e9curie", "Edit my second stable", "Editar mi segunda cuadra", "Modifica la mia seconda scuderia", "2\u3064\u76ee\u306e\u53a9\u820e\u3092\u7de8\u96c6", "Meinen zweiten Stall bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0625\u0633\u0637\u0628\u0644\u064a \u0627\u0644\u062b\u0627\u0646\u064a", "修改我的第二个马厩", "Mijn tweede stal wijzigen", "Editar minha segunda cocheira", "Redigera mitt andra stall", "Изменить мою вторую конюшню", "Edytuj moją drugą stajnię", "두 번째 마구간 수정하기"), "")
            : (!__estVisite
                ? h("button", { key: "aj", onClick: function () { setClub2Local({ club: "" }); setEditClub2(true); }, "aria-label": T("Ajouter une \u00e9curie", "Add a stable", "A\u00f1adir una cuadra", "Aggiungi una scuderia", "\u53a9\u820e\u3092\u8ffd\u52a0", "Stall hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0633\u0637\u0628\u0644", "添加马厩", "Een stal toevoegen", "Adicionar uma cocheira", "Lägg till ett stall", "Добавить конюшню", "Dodaj stajnię", "마구간 추가하기"), style: { flex: cavTab ? "0 0 78px" : "0 0 64px", height: cavOrdi ? 112 : (cavTab ? 100 : 84) /* (1132) */, borderRadius: 16, border: "1px dashed rgba(201,166,107,0.42)", background: "rgba(5,8,11,0.35)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", padding: 0, color: "#BDB6AA" } },
                    h("span", { style: { fontSize: 20, lineHeight: 1, color: "#C9A66B" } }, "+"),
                    h("span", { style: { fontFamily: M, fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" } }, T("\u00c9curie", "Stable", "Cuadra", "Scuderia", "\u53a9\u820e", "Stall", "\u0625\u0633\u0637\u0628\u0644", "马厩", "Stal", "Cocheira", "Stall", "Конюшня", "Stajnia", "마구간")))
                : null));
        /* « Mes groupes à l écurie » : section à part, SOUS les écuries, seulement s il y a au moins un groupe. */
        var rtlG = false; try { rtlG = document.documentElement.dir === "rtl"; } catch (eRg) { }
        /* 22/10 (Blandine : « un onglet similaire à celui écurie juste en dessous de celui écurie ») : chaque groupe est un
           ENCART du même dessin que l encart écurie (dégradé pétrole, photo du groupe fondue sur le côté, petit libellé
           champagne, nom en grand), posé juste sous les écuries. Plusieurs groupes : l un sous l autre sur iPhone, deux
           par rangée sur tablette et ordinateur. Même ouverture qu avant (page de l équipe ou piquet de l écurie). */
        var rtlG = false; try { rtlG = document.documentElement.dir === "rtl"; } catch (eRg) { }
        /* 22/10 22 h 35 (Blandine) : seuls les groupes de cavaliers (nature « equipe »), jamais les piquets de chevaux. */
        var groupesCavE = (groupesCav || []).filter(function (gE) { return gE && gE.nature === "equipe"; });
        var plusG = groupesCavE.length > 1;
        /* 22/10 soir (Blandine, maquette téléphone : « ne rajoute que le bloc groupe comme sur la maquette ») : l encart groupe
           suit la maquette — « Mon groupe » en Cormorant ivoire en haut, puis une petite vignette (photo du groupe), le nom
           (+ sigle de l écurie s il existe, ex. « – SEP ») et la ligne saison · niveau ; un cheval sombre fondu à droite
           (même image que l encart récit) et une flèche dans un rond. Même dessin sur tablette et ordinateur.
           Mêmes ouvertures qu avant (page de l équipe ou piquet de l écurie) ; « Prochainement » si pas de page. */
        var lignesG = groupesCavE.map(function (g) {
          var photoG = g.nature === "equipe" ? (g.photo_url || "images/TEAM_COMPETITION.webp") : hypePhotoPiquet(g);
          var sansPageG = g.nature === "equipe" && !(typeof TEAM_CLUB !== "undefined" && g.club_clef === hypeClefClubPiquets(TEAM_CLUB) && g.discipline === TEAM_DISCIPLINE && g.niveau === TEAM_NIVEAU);
          var niv = (typeof hypeBadgePiquet === "function") ? hypeBadgePiquet(g.niveau) : "";
          var sigleG = (String(g.__club || "").match(/\(([^()]{2,12})\)\s*$/) || [])[1] || "";
          var saisonG = g.saison ? (T("Saison", "Season", "Temporada", "Stagione", "\u30b7\u30fc\u30ba\u30f3", "Saison", "\u0627\u0644\u0645\u0648\u0633\u0645", "赛季", "Seizoen", "Temporada", "Säsong", "Сезон", "Sezon", "시즌") + " " + String(g.saison).replace(/\s*[-\u2013]\s*/, " \u2013 ")) : "";
          var meta = [sigleG ? "" : g.__club, saisonG, niv].filter(Boolean);
          var labG = autreV2 ? T("Son groupe", "Their group", "Su grupo", "Il suo gruppo", "\u6240\u5c5e\u30b0\u30eb\u30fc\u30d7", "Ihre Gruppe", "\u0645\u062c\u0645\u0648\u0639\u062a\u0647\u0627", "TA的小组", "Hun groep", "O grupo dele(a)", "Deras grupp", "Группа", "Jej grupa", "그의 그룹") : T("Mon groupe", "My group", "Mi grupo", "Il mio gruppo", "\u79c1\u306e\u30b0\u30eb\u30fc\u30d7", "Meine Gruppe", "\u0645\u062c\u0645\u0648\u0639\u062a\u064a", "我的小组", "Mijn groep", "Meu grupo", "Min grupp", "Моя группа", "Moja grupa", "내 그룹");
          var mG = "linear-gradient(" + (rtlG ? "270deg" : "90deg") + ", transparent 0%, #000 55%)";
          return h("div", { key: "grp" + g.id, role: "button", "data-groupe-cavalier": g.id, "aria-disabled": sansPageG ? "true" : undefined,
              onClick: function () {
                if (sansPageG) return;
                if (g.nature === "equipe") { setEcran("team-competition"); return; }
                try { window.__ecurieHypeClub = g.__club; window.__ecurieHypePiquet = g.id; } catch (eGo) { }
                setEcran("ecurie-hype");
              },
              style: { position: "relative", isolation: "isolate", minWidth: 0, borderRadius: 16, overflow: "hidden", cursor: sansPageG ? "default" : "pointer", border: "1px solid rgba(201,166,107,0.34)", background: "linear-gradient(160deg, rgba(40,86,104,0.34), rgba(5,8,11,0.10))", boxShadow: "0 16px 34px rgba(0,0,0,0.45)", padding: cavTab ? "14px 22px 16px" : "11px 16px 13px", paddingInlineEnd: cavTab ? 70 : 60, boxSizing: "border-box" } },
            h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "52%", zIndex: -1, pointerEvents: "none", backgroundImage: "url(" + HYPE_FOND_RECIT + ")", backgroundSize: "cover", backgroundPosition: "center 40%", WebkitMaskImage: mG, maskImage: mG, opacity: 0.9 } }),
            h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: cavTab ? 24 : 21, fontWeight: 500, color: "#F3EEE4", lineHeight: 1.1, textShadow: ombreV2 } }, labG),
            h("div", { style: { display: "flex", alignItems: "center", gap: cavTab ? 12 : 10, marginTop: cavTab ? 10 : 8, minWidth: 0 } },
              h("img", { src: photoG, alt: "", "aria-hidden": "true", loading: "lazy", onError: function (eI) { try { eI.target.style.visibility = "hidden"; } catch (e) { } }, style: { flex: "0 0 auto", width: cavTab ? 58 : 46, height: cavTab ? 42 : 34, borderRadius: 6, objectFit: "cover", objectPosition: "center 35%", border: "1px solid rgba(243,238,228,0.18)", background: "#101D22" } }),
              h("div", { style: { minWidth: 0 } },
                h("div", { style: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: cavTab ? 21 : 18, fontWeight: 500, color: "#F3EEE4", lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: ombreV2 } }, h("bdi", null, (g.nom || "") + (sigleG ? " \u2013 " + sigleG : ""))),
                meta.length ? h("div", { style: { fontFamily: M, fontSize: cavTab ? 12.5 : 11.5, color: "rgba(243,238,228,0.75)", marginTop: 3, textShadow: ombreV2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                  meta.map(function (m, iM) { return h(React.Fragment, { key: iM }, iM ? " \u00b7 " : null, h("bdi", null, m)); })) : null)),
            sansPageG
              ? h("span", { style: { position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineEnd: 12, fontFamily: M, fontSize: 9, letterSpacing: 1.3, textTransform: "uppercase", color: "#C9A66B", border: "1px solid rgba(201,166,107,0.45)", borderRadius: 999, padding: "3px 8px", background: "rgba(5,8,11,0.6)" } }, T("Prochainement", "Coming soon", "Pr\u00f3ximamente", "Prossimamente", "\u8fd1\u65e5\u516c\u958b", "Demn\u00e4chst", "\u0642\u0631\u064a\u0628\u0627", "即将推出", "Binnenkort", "Em breve", "Kommer snart", "Скоро", "Wkrótce", "곧 출시"))
              : h("span", { "aria-hidden": "true", style: { position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineEnd: cavTab ? 18 : 14, width: cavTab ? 38 : 34, height: cavTab ? 38 : 34, borderRadius: "50%", background: "rgba(5,8,11,0.62)", border: "1px solid rgba(243,238,228,0.28)", color: "#F3EEE4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, lineHeight: 1 } }, rtlG ? "\u2190" : "\u2192"));
        });
        var sectionG = lignesG.length ? h("div", { "data-groupes-cavalier": "1", style: { marginTop: cavPanneau ? 14 : 10, display: "grid", gridTemplateColumns: (plusG && cavTab) ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)", gap: 10 } }, lignesG) : null;
        return h("div", { "data-zone-ecuries": "1", style: { margin: cavPanneau ? "56px 16px 0" : "48px 16px 0" } }, titreEc, cartesEc, sectionG);
      }
      return h("div", { style: nom2 ? { margin: "46px 16px 0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, alignItems: "stretch" } : { margin: "46px 16px 0" } },
        h("div", { onClick: function () { if (nom1) { setEcran("guilde"); } else { setClubLocal({ club: "" }); setEditClub(true); } }, role: "button", style: { position: "relative", isolation: "isolate", minHeight: nom2 ? 0 : 92, aspectRatio: nom2 ? "3 / 2" : "auto", padding: nom2 ? "12px 38px 12px 13px" : "14px 48px 14px 15px", /* 30/09 (517) deux ecuries : carres -> rectangles horizontaux (3/2), texte en haut, crayon a droite */ borderRadius: 18, cursor: "pointer", overflow: "hidden", border: "1px solid " + CAV_BORD, background: CAV_GRAND, WebkitBackdropFilter: CAV_FLOU, backdropFilter: CAV_FLOU, boxSizing: "border-box" } },
          nom1 ? h(FondBanniereClub, { nom: nom1 }) : null, /* (366) la photo de l ecurie */
          h("div", { style: { fontSize: 8.5, fontWeight: 600, letterSpacing: 2, color: TURQL, textTransform: "uppercase", fontFamily: M } }, (__estVisite && !(__visitePub && moiIdAlb && String(__visitePub.id) === String(moiIdAlb))) ? T("Son club", "Their club", "Su club", "Il suo club", "\u6240\u5c5e\u30af\u30e9\u30d6", "Ihr Verein", "\u0646\u0627\u062f\u064a\u0647\u0627", "TA的俱乐部", "Hun manege", "O clube dele(a)", "Deras ridklubb", "Клуб", "Jej klub", "그의 클럽") : T("Mon club", "My club", "Mi club", "Il mio club", "\u30de\u30a4\u30af\u30e9\u30d6", "Mein Verein", "\u0646\u0627\u062f\u064a\u064a", "我的俱乐部", "Mijn manege", "Meu clube", "Min ridklubb", "Мой клуб", "Mój klub", "내 클럽")), /* (369) */
          h("div", { style: { fontFamily: C, fontSize: nom2 ? 14 : 17, fontWeight: 600, marginTop: 6, lineHeight: 1.22, overflowWrap: "anywhere" } }, nom1 || T("Choisir mon club", "Choose my club", "Elegir mi club", "Scegli il mio club", "\u30af\u30e9\u30d6\u3092\u9078\u3076", "Meinen Verein w\u00e4hlen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u0646\u0627\u062f\u064a\u064a", "选择我的俱乐部", "Mijn manege kiezen", "Escolher meu clube", "Välj min ridklubb", "Выбрать мой клуб", "Wybierz mój klub", "내 클럽 선택하기")),
          lieu1 ? h("div", { style: { fontSize: 11, color: "#BDB6AA", marginTop: 5, fontFamily: M } }, "\ud83d\udccd " + lieu1) : null,
          nom1 ? h("div", { style: { fontSize: 10, color: "#878D8E", marginTop: 5, fontFamily: M } }, T("Voir la page du club", "View the club page", "Ver la p\u00e1gina del club", "Vedi la pagina del club", "\u30af\u30e9\u30d6\u30da\u30fc\u30b8\u3092\u898b\u308b", "Vereinsseite ansehen", "\u0639\u0631\u0636 \u0635\u0641\u062d\u0629 \u0627\u0644\u0646\u0627\u062f\u064a", "查看俱乐部页面", "De pagina van de manege bekijken", "Ver a página do clube", "Se klubbens sida", "Открыть страницу клуба", "Zobacz stronę klubu", "클럽 페이지 보기") + " \u203a") : null,
          crayon(function (eE1) { if (eE1 && eE1.stopPropagation) eE1.stopPropagation(); setClubLocal({ club: nom1 }); if (__estVisite) return; setEditClub(true); }, "Modifier mon club")),
        nom2
          ? h("div", { onClick: function () { try { window.__guildeEcurie = nom2.trim(); } catch (eG2) { } setEcran("guilde"); }, role: "button", style: { position: "relative", isolation: "isolate", marginTop: 0, minHeight: 0, aspectRatio: "3 / 2", padding: "12px 38px 12px 13px", /* (517) */ borderRadius: 18, cursor: "pointer", overflow: "hidden", border: "1px solid " + CAV_BORD, background: CAV_GRAND, WebkitBackdropFilter: CAV_FLOU, backdropFilter: CAV_FLOU, boxSizing: "border-box" } },
              h(FondBanniereClub, { nom: nom2 }), /* (366) */
              h("div", { style: { fontSize: 8.5, fontWeight: 600, letterSpacing: 2, color: "#878D8E", textTransform: "uppercase", fontFamily: M } }, T("Deuxi\u00e8me \u00e9curie", "Second stable", "Segunda cuadra", "Seconda scuderia", "2\u3064\u76ee\u306e\u53a9\u820e", "Zweiter Stall", "\u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u062b\u0627\u0646\u064a", "第二个马厩", "Tweede stal", "Segunda cocheira", "Andra stall", "Вторая конюшня", "Druga stajnia", "두 번째 마구간")),
              h("div", { style: { fontFamily: C, fontSize: 14, fontWeight: 600, marginTop: 6, lineHeight: 1.22, overflowWrap: "anywhere" } }, nom2),
              lieu2 ? h("div", { style: { fontSize: 10.5, color: "#BDB6AA", marginTop: 4, fontFamily: M } }, "\ud83d\udccd " + lieu2) : null,
              crayon(function (eE2) { if (eE2 && eE2.stopPropagation) eE2.stopPropagation(); setClub2Local({ club: nom2 }); if (__estVisite) return; setEditClub2(true); }, "Modifier ma deuxi\u00e8me \u00e9curie"))
          : (!__estVisite
              ? h("button", { onClick: function () { setClub2Local({ club: "" }); setEditClub2(true); }, style: { display: "flex", alignItems: "center", gap: 8, marginTop: 6, minHeight: 44, padding: "0 4px", background: "none", border: "none", color: "#C5AA78", fontFamily: M, fontSize: 12, fontWeight: 600, cursor: "pointer" } },
                  h("span", { style: { width: 22, height: 22, borderRadius: "50%", border: "1.3px solid #C5AA78", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, lineHeight: 1 } }, "+"),
                  T("Ajouter une \u00e9curie", "Add a stable", "A\u00f1adir una cuadra", "Aggiungi una scuderia", "\u53a9\u820e\u3092\u8ffd\u52a0", "Stall hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0625\u0633\u0637\u0628\u0644", "添加马厩", "Een stal toevoegen", "Adicionar uma cocheira", "Lägg till ett stall", "Добавить конюшню", "Dodaj stajnię", "마구간 추가하기"))
              : null));
    })()),
    /* 14/10 (1106) Cavalier V2, etape 3 : « Ma story » dans un encart compact (le meme bandeau de stories qu avant, accent
       champagne, marges reduites). Sur sa page : la phrase d invitation en champagne. Pas de « Voir toutes » : aucune page
       « toutes les stories » n existe, on ne met pas de lien qui ne mene nulle part. */
    cavZ("recit", (function () {
      var thC = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#C5AA78", lumineux: "#C5AA78" };
      function rgb(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(thC.principal, a) : thC.principal; }
      var recitTxt = __estVisite ? ((profil && profil.histoire) || "") : ((profRecit && profRecit.histoire) || (profil && profil.histoire) || "");
      var dark = { border: "1px solid rgba(197,170,120,0.36)", background: CAV_BTN, color: "#F3EEE4" };   /* (674) bouton secondaire */
      /* 14/10 (1107) Cavalier V2, etape 4 : « Son recit » dans l encart V2, l oeil du cheval noir a droite (meme image), texte a gauche.
         Vide : la citation « Les plus belles histoires ne se mesurent pas en victoires. » ; sur sa page seulement : « Et si tu
         racontais la tienne ? » en champagne + bouton contour « Ecrire son recit ». Rempli : le vrai recit (7 lignes au plus) ;
         sa page : « Modifier mon recit », visite : « Lire la suite ». Meme destination qu avant (memoirescavalier). */
      if (CAV_V2) {
        var rtlRc = false; try { rtlRc = document.documentElement.dir === "rtl"; } catch (eRr) { }
        var mRc = "linear-gradient(" + (rtlRc ? "270deg" : "90deg") + ", transparent 0%, #000 45%)";
        var btnRc = { display: "inline-flex", alignItems: "center", gap: 9, marginTop: cavPanneau ? 22 : 14, height: cavPanneau ? 46 : 42, padding: cavPanneau ? "0 22px" : "0 18px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.62)", background: "rgba(5,8,11,0.6)", color: "#F3EEE4", fontFamily: M, fontSize: cavPanneau ? 14 : 12.5, fontWeight: 400, cursor: "pointer" };
        var flRc = rtlRc ? "\u2190" : "\u2192";
        return cavV2Bloc("cavV2Recit", { minHeight: cavPanneau ? 300 : 200 /* 22/10 ordinateur : plus haut */, background: "linear-gradient(160deg, rgba(24,52,62,0.55) 0%, rgba(8,16,20,0.82) 45%, rgba(4,6,8,0.92) 100%)" /* (1114) Blandine : « fonce un peu l encart de mon recit » */ },
          h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "58%", backgroundImage: "url(" + HYPE_FOND_RECIT + ")", backgroundSize: "cover", backgroundPosition: "center", WebkitMaskImage: mRc, maskImage: mRc, opacity: 0.95, pointerEvents: "none" } }),
          h("div", { style: { position: "relative", maxWidth: cavPanneau ? "62%" : "68%" } },
            cavV2Titre(__estVisite ? T("Son r\u00e9cit", "Their story", "Su relato", "Il suo racconto", "\u5f7c\u306e\u7269\u8a9e", "Ihre Geschichte", "\u0642\u0635\u062a\u0647\u0627", "TA的故事", "Hun verhaal", "A história dele(a)", "Deras berättelse", "Рассказ", "Jej opowieść", "그의 이야기") : T("Mon r\u00e9cit", "My story", "Mi relato", "Il mio racconto", "\u79c1\u306e\u7269\u8a9e", "Meine Geschichte", "\u0642\u0635\u062a\u064a", "我的故事", "Mijn verhaal", "Minha história", "Min berättelse", "Мой рассказ", "Moja opowieść", "내 이야기")),
            recitTxt
              ? h("div", { style: { marginTop: cavPanneau ? 16 : 10, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: cavPanneau ? 18 : 14 /* (1122) 16 -> 14, Blandine ; 22/10 ordinateur : 18 */, lineHeight: cavPanneau ? 1.5 : 1.42, color: "#F3EEE4", whiteSpace: "pre-line", textShadow: "0 1px 6px rgba(0,0,0,0.9)", display: "-webkit-box", WebkitLineClamp: (CAV_V2 && cavPanneau) ? "unset" : 8 /* 22/10 ordinateur : le recit en entier */, WebkitBoxOrient: "vertical", overflow: "hidden" } }, recitTxt)
              : h("div", { style: { marginTop: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.35, color: "#F3EEE4" } }, T("Les plus belles histoires ne se mesurent pas en victoires.", "The finest stories aren\u2019t measured in wins.", "Las historias m\u00e1s bellas no se miden en victorias.", "Le storie pi\u00f9 belle non si misurano in vittorie.", "\u6700\u3082\u7f8e\u3057\u3044\u7269\u8a9e\u306f\u3001\u52dd\u5229\u306e\u6570\u3067\u306f\u6e2c\u308c\u306a\u3044\u3002", "Die sch\u00f6nsten Geschichten misst man nicht in Siegen.", "\u0623\u062c\u0645\u0644 \u0627\u0644\u0642\u0635\u0635 \u0644\u0627 \u062a\u064f\u0642\u0627\u0633 \u0628\u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a.", "最美的故事，不是用胜利来衡量的。", "De mooiste verhalen worden niet in overwinningen gemeten.", "As histórias mais bonitas não se medem em vitórias.", "De finaste historierna mäts inte i segrar.", "Самые красивые истории не измеряются победами.", "Najpiękniejsze historie nie mierzą się zwycięstwami.", "가장 아름다운 이야기는 승리로만 가늠할 수 없어요.")),
            (!recitTxt && !__estVisite) ? h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 13, color: "#C9A66B" } }, T("Et si tu racontais la tienne ?", "Why not tell yours?", "\u00bfY si contaras la tuya?", "E se raccontassi la tua?", "\u3042\u306a\u305f\u306e\u7269\u8a9e\u3082\u8a71\u3057\u3066\u307f\u306a\u3044\uff1f", "Und wenn du deine erz\u00e4hlst?", "\u0645\u0627 \u0631\u0623\u064a\u0643 \u0623\u0646 \u062a\u0631\u0648\u064a \u0642\u0635\u062a\u0643\u061f", "不如讲讲你的故事？", "En als je nu eens het jouwe vertelde?", "E se você contasse a sua?", "Tänk om du berättade din?", "А что, если ты расскажешь свою?", "A gdyby tak opowiedzieć swoją?", "내 이야기를 들려주지 않을래요?")) : null,
            (__estVisite && !recitTxt) ? null : h("button", { onClick: function () { setEcran("memoirescavalier"); }, style: btnRc },
              __estVisite ? null : h("span", { "aria-hidden": "true", style: { fontSize: 13 } }, "\u270E"),
              __estVisite ? T("Lire la suite", "Read more", "Leer m\u00e1s", "Leggi di pi\u00f9", "\u3082\u3063\u3068\u8aad\u3080", "Weiterlesen", "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0632\u064a\u062f", "阅读更多", "Lees meer", "Ler mais", "Läs mer", "Читать дальше", "Czytaj dalej", "더 보기")
                : (recitTxt ? T("Modifier mon r\u00e9cit", "Edit my story", "Editar mi relato", "Modifica il mio racconto", "\u7269\u8a9e\u3092\u7de8\u96c6", "Meine Geschichte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0642\u0635\u062a\u064a", "修改我的故事", "Mijn verhaal bewerken", "Editar minha história", "Redigera min berättelse", "Изменить мой рассказ", "Edytuj moją opowieść", "내 이야기 수정하기") : T("\u00c9crire son r\u00e9cit", "Write your story", "Escribir tu relato", "Scrivi il tuo racconto", "\u7269\u8a9e\u3092\u66f8\u304f", "Deine Geschichte schreiben", "\u0627\u0643\u062a\u0628\u064a \u0642\u0635\u062a\u0643", "写下TA的故事", "Je verhaal schrijven", "Escrever sua história", "Skriv din berättelse", "Написать свой рассказ", "Napisz jej opowieść", "이야기 쓰기")),
              h("span", { "aria-hidden": "true" }, flRc))));
      }
      return h("div", { className: "hyc-cristal", style: { margin: "36px 16px 0" } }, /* 26/09 (400) : 22 -> 36 px */
          /* 28/09 (499) : SON IMAGE EN FOND (choix B de Blandine : le texte comme avant, « en preservant la tete
             du cheval en entier a droite »). L image est ajustee a la HAUTEUR de l encart et calee a droite : la
             tete reste entiere quelle que soit la longueur du recit ; un fondu sombre part de la gauche et le texte
             ne prend que 62 % de la largeur, pour ne jamais passer sur la tete. Lettrine doree. */
          h("div", { className: "hyc-cristal-cc", style: { position: "relative", padding: "18px 17px 16px", background: "#05080c", minHeight: 180, overflow: "hidden" } },
            /* l image : calee en bas a droite, hauteur plafonnee a 290 px pour que la TETE ENTIERE tienne toujours dans
               la partie droite ; bord du haut fondu (mask) quand l encart est plus haut que l image. */
            /* 28/09 (500) : image VERTICALE, calee en bas a droite ; hauteur = celle de l encart, plafonnee a 360 px
               (au-dela, la tete deborderait sur la colonne de texte) ; bord gauche fondu dans le fond. */
            h("img", { src: HYPE_FOND_RECIT, alt: "", "aria-hidden": "true", style: { position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", height: "min(100%, 180px)", width: "auto", maxWidth: "none", pointerEvents: "none", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 35%), linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 35%), linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)", WebkitMaskComposite: "source-in", maskComposite: "intersect" } }), /* (501) image paysage (oeil) recadree sur la tete, centree en hauteur, 180 px max, bords fondus */
            h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(3,5,8,0.95) 0%, rgba(3,5,8,0.88) 64%, rgba(3,5,8,0.4) 74%, rgba(3,5,8,0) 84%)" } }),
            h("div", { style: { position: "relative", zIndex: 1, maxWidth: "74%" } },   /* (501) 74 % texte / 26 % cheval (moins de retours a la ligne) */
            h("div", { style: { fontSize: 10, letterSpacing: "0.28em", color: thC.principal, textTransform: "uppercase", fontWeight: 700, fontFamily: M } }, "\u2726 " + (__estVisite ? T("Son r\u00e9cit", "Their story", "Su relato", "Il suo racconto", "\u5f7c\u306e\u7269\u8a9e", "Ihre Geschichte", "\u0642\u0635\u062a\u0647\u0627", "TA的故事", "Hun verhaal", "A história dele(a)", "Deras berättelse", "Рассказ", "Jej opowieść", "그의 이야기") : T("Mon r\u00e9cit", "My story", "Mi relato", "Il mio racconto", "\u79c1\u306e\u7269\u8a9e", "Meine Geschichte", "\u0642\u0635\u062a\u064a", "我的故事", "Mijn verhaal", "Minha história", "Min berättelse", "Мой рассказ", "Moja opowieść", "내 이야기"))),
            h("div", { style: { height: 1, width: 64, background: "linear-gradient(90deg, rgba(197,170,120,0.58), rgba(197,170,120,0.08), transparent)", margin: "10px 0 12px" } }),
            /* (500) texte plus petit et plus serre, sans lettrine (elle creait des lignes de deux ou trois mots) */
            recitTxt ? h("div", { style: { fontSize: 13, lineHeight: 1.42, color: "#F3EEE4", whiteSpace: "pre-line", fontFamily: M, fontWeight: 400, textShadow: "0 1px 6px rgba(0,0,0,0.9)" } }, recitTxt) : h("div", { style: { fontSize: 12.5, lineHeight: 1.6, color: "rgba(243,238,228,.4)", fontStyle: "italic", fontFamily: M } }, __estVisite /* (374) en visite, on parle d elle */ ? (((__visitePub && __visitePub.pseudo) || T("Cette personne", "This rider", "Esta persona", "Questa persona", "\u3053\u306e\u65b9", "Diese Person", "\u0647\u0630\u0627 \u0627\u0644\u0634\u062e\u0635", "这个人", "Deze ruiter", "Esta pessoa", "Den här ryttaren", "Этот человек", "Ta osoba", "이 기수는")) + " " + T("n\u2019a pas encore partag\u00e9 son histoire.", "hasn\u2019t shared their story yet.", "a\u00fan no ha compartido su historia.", "non ha ancora condiviso la sua storia.", "\u306f\u307e\u3060\u7269\u8a9e\u3092\u5171\u6709\u3057\u3066\u3044\u307e\u305b\u3093\u3002", "hat die Geschichte noch nicht geteilt.", "\u0644\u0645 \u064a\u0634\u0627\u0631\u0643 \u0642\u0635\u062a\u0647 \u0628\u0639\u062f.", "还没有分享自己的故事。", "heeft nog geen verhaal gedeeld.", "ainda não compartilhou a sua história.", "har inte delat sin historia än.", "ещё не рассказал свою историю.", "nie podzieliła się jeszcze swoją historią.", "아직 자신의 이야기를 공유하지 않았어요.")) : T("Pr\u00e9sente ton parcours de cavalier\u2026", "Introduce your rider journey\u2026", "Presenta tu recorrido\u2026", "Presenta il tuo percorso\u2026", "\u3042\u306a\u305f\u306e\u7d4c\u6b74\u3092\u7d39\u4ecb", "Stell deinen Reiterweg vor\u2026", "\u0642\u062f\u0645\u064a \u0645\u0633\u0627\u0631\u0643 \u0643\u0641\u0627\u0631\u0633\u0629\u2026", "介绍一下你的骑手旅程…", "Stel je ruiterweg voor…", "Apresente a sua trajetória de cavaleiro…", "Presentera din resa som ryttare…", "Расскажи о своём пути всадника…", "Przedstaw swoją drogę jeźdźca…", "기수로서의 내 여정을 소개해 보세요…")),
            (__estVisite && !recitTxt) ? null /* (374) recit vide en visite : pas de « Lire la suite » */ : h("button", { onClick: function () { setEcran("memoirescavalier"); }, style: Object.assign({ marginTop: 13, padding: "9px 16px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: M }, dark) }, __estVisite ? T("Lire la suite", "Read more", "Leer m\u00e1s", "Leggi di pi\u00f9", "\u3082\u3063\u3068\u8aad\u3080", "Weiterlesen", "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0632\u064a\u062f", "阅读更多", "Lees meer", "Ler mais", "Läs mer", "Читать дальше", "Czytaj dalej", "더 보기") : "\u270E " + (recitTxt ? T("Modifier mon r\u00e9cit", "Edit my story", "Editar", "Modifica", "\u7de8\u96c6", "Meine Geschichte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0642\u0635\u062a\u064a", "修改我的故事", "Mijn verhaal bewerken", "Editar minha história", "Redigera min berättelse", "Изменить мой рассказ", "Edytuj moją opowieść", "내 이야기 수정하기") : T("\u00c9crire mon r\u00e9cit", "Write my story", "Escribir", "Scrivi", "\u66f8\u304f", "Meine Geschichte schreiben", "\u0643\u062a\u0627\u0628\u0629 \u0642\u0635\u062a\u064a", "写我的故事", "Mijn verhaal schrijven", "Escrever minha história", "Skriv min berättelse", "Написать мой рассказ", "Napisz moją opowieść", "내 이야기 쓰기"))))));
    })()),
    /* 27/09 (418) : LA BANNIERE « MON ECURIE » (cheval noir, ouvrait `guilde`) EST RETIREE de la page
       Cavalier. Blandine : « retire-la » — doublon de la carte « Mon club » en haut de page. « Mes chevaux »
       et « Gerer mon ecurie › » juste en dessous restent. */
    cavZ("chevaux", h("div", { style: { padding: CAV_V2 ? (cavPanneau ? "60px 0 0" : "36px 0 0") : "26px 0 0" } },
      /* 13/09 (119) : ses resultats de concours, juste avant ses chevaux. Composant
         AUTONOME (ses propres etats) : les hooks React ne peuvent pas vivre dans une
         fonction de rendu interieure, et un bloc ne part jamais sans ses variables. */
      CAV_V2 ? h("div", { style: { padding: "0 16px", marginBottom: cavPanneau ? 20 : 14 } },   /* (1108) titre V2 ; « Voir tous » quand la grille ne montre pas tout */
          cavV2Titre(__estVisite ? T("Ses chevaux", "Their horses", "Sus caballos", "I suoi cavalli", "\u5f7c\u306e\u99ac", "Ihre Pferde", "\u062e\u064a\u0648\u0644\u0647\u0627", "它的马匹", "Zijn/haar paarden", "Seus cavalos", "Hans/hennes hästar", "Её лошади", "Jego konie", "기수의 말") : T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "\u79c1\u306e\u99ac", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들"),   /* (1112) « Mes » sur sa page, « Ses » en visite */
            __estVisite ? null : ("+ " + T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가")),
            function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, true))   /* (1111) « + Ajouter » a droite du titre, comme avant */
      : h("div", { style: { padding: "0 16px" } }, (__estVisite ? eyebrow(T("Ses chevaux", "Their horses", "Sus caballos", "I suoi cavalli", "彼の馬", "Ihre Pferde", "\u062e\u064a\u0648\u0644\u0647\u0627", "它的马匹", "Zijn/haar paarden", "Seus cavalos", "Hans/hennes hästar", "Её лошади", "Jego konie", "기수의 말")) : (clubCarteMil
          /* 28/09 (476) : choix B de Blandine - les deux gros boutons sous la grille disparaissent quand la
             carte du milieu existe ; l ajout d un cheval monte ici, en petit, a cote de « Gerer mon ecurie ». */
          ? h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 } },
              h("div", { style: { fontFamily: C, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", minWidth: 0 } }, T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "\u79c1\u306e\u99ac", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들")),
              h("div", { style: { display: "flex", alignItems: "center", gap: 14, flex: "0 0 auto" } },
                h("button", { onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { background: "none", border: "none", color: TURQL, fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer", padding: 0, whiteSpace: "nowrap" } }, "+ " + T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가")))) /* 28/09 (505) : « Gerer mon ecurie › » retire (doublon de l onglet Ecurie de la barre du bas) */
          : eyebrow(T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "\u79c1\u306e\u99ac", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들"))))), /* (505) sans « Gerer mon ecurie » */
      /* 03/09 — LE CHOIX D ECURIE. N apparait que si le cavalier a DEUX ecuries
         (meme condition que la question posee a la creation d un cheval le 02/09) :
         avec une seule, la rangee n aurait rien a trancher. */
      /* 28/09 (509) : les trois choix sur UNE ligne (Blandine) : « Toutes » en premier ; un nom qui porte un
         sigle entre parentheses s affiche par ce sigle (« Societe d Equitation de Paris (SEP) » -> « SEP ») ;
         sinon il se coupe avec « … ». Meme style pour les trois. */
      (!__estVisite && mesEcuries.length > 1) ? h("div", { style: { display: "flex", flexWrap: "nowrap", gap: cavPanneau ? 14 : 10, padding: cavPanneau ? "0 16px 24px" : "0 16px 18px", minWidth: 0, maxWidth: cavPanneau ? 720 : undefined } }, /* (511) repartis sur la ligne, plus d espace avant les photos */
        ["__toutes__"].concat(mesEcuries).map(function (ecP) {
          var onEc = (String(ecChoisie) === ecP);
          var sigleEc = (ecP !== "__toutes__") ? (String(ecP).match(/\(([^()]{2,12})\)\s*$/) || [])[1] : null;
          var libEc = (ecP === "__toutes__") ? T("Toutes", "All", "Todas", "Tutte", "\u3059\u3079\u3066", "Alle", "\u0627\u0644\u0643\u0644", "全部", "Alle", "Todas", "Alla", "Все", "Wszystkie", "전체") : (sigleEc ? sigleEc.trim() : ecP);
          return h("div", { key: "ecp" + ecP, role: "button", title: (ecP === "__toutes__") ? undefined : ecP, "aria-label": (ecP === "__toutes__") ? undefined : ecP, onClick: function () { setEcurieSel(ecP); },
            style: { flex: "1 1 0", minWidth: 0, textAlign: "center", padding: cavPanneau ? "10px 12px" : "7px 10px", borderRadius: 999, cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              border: "1px solid " + (onEc ? "rgba(197,170,120,0.58)" : "rgba(92,135,146,0.22)"),
              background: onEc ? "linear-gradient(135deg, rgba(55,107,125,0.40), rgba(37,79,96,0.24))" : "rgba(5,8,11,0.72)",   /* (674) onglets : actif bleu petrole transparent, inactif presque noir */
              color: onEc ? "#F3EEE4" : "#BDB6AA",
              fontSize: cavPanneau ? 13 : 11.5, fontWeight: 700, fontFamily: M } }, libEc);
        })) : null,
      h("div", { "data-hscroll": cavGalerie ? "1" : undefined, "data-cav-galerie": cavGalerie ? "1" : undefined, style: cavGalerie
          /* 22/10 23 h (maquette) : sur ordinateur, galerie HORIZONTALE homogene — cartes de memes dimensions sur une ligne,
             defilement de cote s il y en a trop ; plus de deuxieme ligne centree. */
          ? { display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(200px, calc((100% - 5 * 20px) / 6))", gap: 20, overflowX: "auto", padding: "2px 16px 10px", scrollbarWidth: "thin", scrollbarColor: "rgba(201,166,107,0.35) transparent" }
          : { display: "grid", gridTemplateColumns: (CAV_V2 && cavTab) ? ("repeat(" + cavColCh + ", minmax(0, 1fr))") : "repeat(3, 1fr)" /* (1133) */, gap: (CAV_V2 && cavTab) ? 16 : 10, padding: "2px 16px 4px" } }, (function () {
        var source = __estVisite ? chevauxVisite : chevaux; var PLAFOND_VUS = PLAFOND_CHV; var slots = (__estVisite || premium) ? (tousChevauxVus ? source.slice() : source.slice(0, PLAFOND_VUS)) : source.slice(0, 6);
        /* 04/10 (656) — PAS ENCORE DE CHEVAL : UN ENCART PLEINE LARGEUR AVEC IMAGE DE FOND (sa maquette, version C : texte a
           gauche, image a droite). Sur SA page : « Ajoute ton cheval » + bouton « Creer sa fiche » (meme action que la carte
           d ajout, window.__ouvrirCreationCheval). Sur la page d une autre cavaliere : « Emma n a pas encore de cheval sur
           Hype », sans bouton. Remplace le petit texte gris « Aucun cheval pour le moment. » et, sur sa page, la carte d ajout
           seule dans la grille vide. Image : images/cavalier_ajouter_cheval_v1.webp (fichier separe, jamais en base64). */
        if (!source.length && CAV_V2) {   /* (1108) */
          if (__estVisite) return [h("div", { key: "videV", style: { gridColumn: "1 / -1", fontFamily: M, fontSize: 13, color: "rgba(243,238,228,0.6)" } }, T("Pas encore de cheval sur Hype.", "No horse on Hype yet.", "A\u00fan no hay caballo en Hype.", "Ancora nessun cavallo su Hype.", "\u307e\u3060Hype\u306b\u99ac\u304c\u3044\u307e\u305b\u3093\u3002", "Noch kein Pferd auf Hype.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u062d\u0635\u0627\u0646 \u0639\u0644\u0649 Hype \u0628\u0639\u062f.", "在 Hype 上还没有马。", "Nog geen paard op Hype.", "Ainda sem cavalo no Hype.", "Ingen häst på Hype än.", "Пока нет лошади в Hype.", "Na Hype nie ma jeszcze żadnego konia.", "아직 Hype에 등록된 말이 없어요."))];
          var decV = (decouverteV2 || []).map(function (cD) {
            return h("button", { key: "dec" + cD.id, onClick: ouvrirCheval(cD.id), style: { background: "none", border: "none", padding: 0, textAlign: "start", cursor: "pointer", minWidth: 0, alignSelf: "start" } },
              h("div", { className: cD.photo_url ? "hps-f" : undefined, style: { position: "relative", width: "100%", aspectRatio: (CAV_V2 && cavOrdi) ? "3 / 2" : "10 / 11" /* 15/10 (1140) ordinateur : cartes en largeur */, borderRadius: 14, overflow: "hidden", backgroundImage: cD.photo_url ? ("url(" + cD.photo_url + ")") : "none", backgroundColor: "#101D22", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid " + CAV_BORD, boxShadow: "0 14px 26px -20px rgba(0,0,0,0.9)" } },
                cD.photo_url ? hypeVoileSoleil("dc") : h(PortraitChevalSpectral, { mien: false })),
              h("div", { style: { fontFamily: C, fontSize: 13.5, fontWeight: 600, marginTop: 7, lineHeight: 1.25, color: "#F3EEE4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } }, cD.nom),
              h("div", { style: { fontSize: 10, color: "#878D8E", fontFamily: M, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "\u25C7 " + T("\u00c0 d\u00e9couvrir sur Hype", "To discover on Hype", "Para descubrir en Hype", "Da scoprire su Hype", "Hype\u3067\u898b\u3064\u3051\u3088\u3046", "Auf Hype entdecken", "\u0644\u0644\u0627\u0643\u062a\u0634\u0627\u0641 \u0639\u0644\u0649 Hype", "来 Hype 上发现", "Te ontdekken op Hype", "Para descobrir no Hype", "Att upptäcka på Hype", "Открой для себя в Hype", "Do odkrycia na Hype", "Hype에서 만나 보세요")));
          });
          var milV = cavV2Milieu(clubCarteMil);
          var cellsV = [h("div", { key: "phr", style: { gridColumn: "1 / -1", marginTop: -4, marginBottom: 4, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 17, color: "rgba(243,238,228,0.8)" } }, T("Chaque cheval a une histoire \u00e0 d\u00e9couvrir\u2026", "Every horse has a story to discover\u2026", "Cada caballo tiene una historia por descubrir\u2026", "Ogni cavallo ha una storia da scoprire\u2026", "\u3069\u306e\u99ac\u306b\u3082\u3001\u77e5\u308b\u3079\u304d\u7269\u8a9e\u304c\u3042\u308b\u2026", "Jedes Pferd hat eine Geschichte zu entdecken\u2026", "\u0644\u0643\u0644 \u062d\u0635\u0627\u0646 \u0642\u0635\u0629 \u062a\u0646\u062a\u0638\u0631 \u0623\u0646 \u062a\u064f\u0643\u062a\u0634\u0641\u2026", "每匹马都有一段值得发现的故事…", "Elk paard heeft een verhaal dat ontdekt wil worden…", "Cada cavalo tem uma história para descobrir…", "Varje häst har en historia att upptäcka…", "У каждой лошади есть история, которую стоит узнать…", "Każdy koń ma historię do odkrycia…", "모든 말에는 알아 갈 이야기가 있어요…"))];
          if (decV[0]) cellsV.push(decV[0]);
          cellsV.push(milV);
          if (decV[1]) cellsV.push(decV[1]);
          if (cavTab) return [cellsV[0]].concat(cavV2Justifier(cellsV.slice(1), cavColCh, cavPanneau ? 22 : 16));   /* (1133) */
          return cellsV;
        }
        if (!source.length) {
          var nomVis = (__visitePub && __visitePub.pseudo) || T("Cette personne", "This rider", "Esta persona", "Questa persona", "\u3053\u306e\u65b9", "Diese Person", "\u0647\u0630\u0627 \u0627\u0644\u0634\u062e\u0635", "这个人", "Deze ruiter", "Esta pessoa", "Den här ryttaren", "Этот человек", "Ta osoba", "이 기수는");
          return h("div", { "data-encart-cheval": __estVisite ? "visite" : "moi", style: { gridColumn: "1 / -1", position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 150, border: "1px solid " + (__estVisite ? "rgba(255,255,255,0.08)" : CAV_BORD), backgroundImage: "url(images/cavalier_ajouter_cheval_v1.webp)", backgroundSize: "cover", backgroundPosition: "center" } },
            h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,8,11,0.93) 0%, rgba(5,8,11,0.72) 55%, rgba(5,8,11,0.28) 100%)" } }),
            h("div", { style: { position: "relative", padding: "20px 18px 18px", maxWidth: 230 } },
              h("div", { style: { fontFamily: C, fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: "#F3EEE4" } },
                __estVisite ? (nomVis + " " + T("n\u2019a pas encore de cheval sur Hype", "has no horse on Hype yet", "a\u00fan no tiene caballo en Hype", "non ha ancora un cavallo su Hype", "\u306f\u307e\u3060Hype\u306b\u99ac\u304c\u3044\u307e\u305b\u3093", "hat noch kein Pferd auf Hype", "\u0644\u064a\u0633 \u0644\u062f\u064a\u0647\u0627 \u062d\u0635\u0627\u0646 \u0639\u0644\u0649 Hype \u0628\u0639\u062f", "在 Hype 上还没有马", "heeft nog geen paard op Hype", "ainda não tem cavalo no Hype", "har ingen häst på Hype än", "пока нет лошади в Hype", "nie ma jeszcze konia na Hype", "아직 Hype에 등록된 말이 없어요"))
                  : T("Ajoute ton cheval", "Add your horse", "A\u00f1ade tu caballo", "Aggiungi il tuo cavallo", "\u99ac\u3092\u8ffd\u52a0\u3057\u3088\u3046", "F\u00fcge dein Pferd hinzu", "\u0623\u0636\u064a\u0641\u064a \u062d\u0635\u0627\u0646\u0643", "添加你的马", "Voeg je paard toe", "Adicione seu cavalo", "Lägg till din häst", "Добавь свою лошадь", "Dodaj swojego konia", "내 말 추가하기")),
              h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,0.75)", marginTop: 6, lineHeight: 1.5 } },
                __estVisite ? T("Ses chevaux appara\u00eetront ici d\u00e8s qu\u2019ils seront ajout\u00e9s.", "Their horses will appear here once added.", "Sus caballos aparecer\u00e1n aqu\u00ed cuando los a\u00f1ada.", "I suoi cavalli appariranno qui una volta aggiunti.", "\u99ac\u304c\u8ffd\u52a0\u3055\u308c\u308b\u3068\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Die Pferde erscheinen hier, sobald sie hinzugef\u00fcgt sind.", "\u0633\u062a\u0638\u0647\u0631 \u062e\u064a\u0648\u0644\u0647\u0627 \u0647\u0646\u0627 \u0628\u0645\u062c\u0631\u062f \u0625\u0636\u0627\u0641\u062a\u0647\u0627.", "添加后，TA的马就会出现在这里。", "Hun paarden verschijnen hier zodra ze zijn toegevoegd.", "Os cavalos dele(a) vão aparecer aqui assim que forem adicionados.", "Deras hästar dyker upp här så fort de har lagts till.", "Здесь появятся лошади, как только их добавят.", "Jej konie pojawią się tutaj, gdy tylko zostaną dodane.", "말을 추가하면 바로 여기에 나타나요.")
                  : T("Fiche, origines, palmar\u00e8s, photos.", "Profile, bloodline, record, photos.", "Ficha, or\u00edgenes, palmar\u00e9s, fotos.", "Scheda, origini, palmar\u00e8s, foto.", "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3001\u8840\u7d71\u3001\u6210\u7e3e\u3001\u5199\u771f\u3002", "Steckbrief, Herkunft, Erfolge, Fotos.", "\u0628\u0637\u0627\u0642\u0629\u060c \u0646\u0633\u0628\u060c \u0633\u062c\u0644\u060c \u0635\u0648\u0631.", "档案、血统、战绩、照片。", "Profiel, afstamming, palmares, foto’s.", "Ficha, origens, histórico de resultados, fotos.", "Profil, härstamning, meritlista, foton.", "Карточка, происхождение, достижения, фото.", "Karta, rodowód, osiągnięcia, zdjęcia.", "프로필, 혈통, 성적, 사진.")),
              __estVisite ? null : h("button", { "data-encart-cheval-creer": "1", onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", minHeight: 38, borderRadius: 999, border: "1px solid rgba(197,170,120,0.36)", background: CAV_BTN, color: "#F3EEE4", fontWeight: 700, fontSize: 12, fontFamily: M, cursor: "pointer" } },
                "\uFF0B " + T("Cr\u00e9er sa fiche", "Create its profile", "Crear su ficha", "Crea la sua scheda", "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u4f5c\u6210", "Steckbrief anlegen", "\u0625\u0646\u0634\u0627\u0621 \u0628\u0637\u0627\u0642\u062a\u0647", "创建档案", "Zijn profiel aanmaken", "Criar a ficha", "Skapa dess profil", "Создать карточку", "Utwórz jego kartę", "프로필 만들기"))));
        }
        var cartes = slots.map(function (x, i) {
          var verrouille = !__estVisite && !x.lien && !premium && i >= ((typeof quotaGratuit === "function") ? quotaGratuit(moiCav && moiCav.id) : 2);   /* (1040) meme quota qu a la creation (2, illimite pour Evan et Liam) */
          var coeur = (x.ch.flots || []).some(function (fl) { return fl.coeur; });
          return h("button", { key: "cg" + i, onClick: verrouille ? function () { setEcran("premium"); } : ouvrirCheval(x.id), style: { background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", minWidth: 0, alignSelf: "start" /* 01/10 (518) : collee en haut de sa case comme la carte du milieu - un bouton centre son contenu en hauteur, et la ligne « \u25C7 Cheval de l ecurie » un peu plus haute faisait descendre les voisines de 2-3 px */ } },
            /* 21/10 (Blandine : « pourquoi il est écrit des choses sous certaines photos ? aligne le design des cartes sur la page Écurie ») :
               en V2, même cadre que la mosaïque de la page Écurie ; puis (22 h 29) le NOM SEUL reste écrit sous la carte, rien d'autre. */
            h("div", { className: (CAV_V2 && x.ch.photo) ? "hps-f" : undefined /* 23/10 effet photos du challenge */, style: CAV_V2 ? { position: "relative", width: "100%", aspectRatio: cavGalerie ? "4 / 3" : (cavOrdi ? "3 / 2" : "10 / 11"), borderRadius: cavPanneau ? 12 : 10, overflow: "hidden", backgroundImage: x.ch.photo ? ("url(" + x.ch.photo + ")") : "none", backgroundColor: "#101D22", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(201,166,107,0.18)", boxShadow: "0 12px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.09), inset 0 -14px 22px rgba(0,0,0,0.28)" }
              : { position: "relative", width: "100%", aspectRatio: "10 / 11", borderRadius: 14, overflow: "hidden", backgroundImage: x.ch.photo ? ("url(" + x.ch.photo + ")") : "none", backgroundColor: "#101D22", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid " + CAV_BORD, boxShadow: "0 14px 26px -20px rgba(0,0,0,0.9)" } },
              (CAV_V2 && x.ch.photo) ? hypeVoileSoleil("cg") : null,
              !x.ch.photo ? h(PortraitChevalSpectral, { mien: !verrouille }) : null,
              coeur && !verrouille ? h("div", { style: { position: "absolute", top: 7, right: 7, width: 24, height: 24, borderRadius: "50%", background: "rgba(7,8,10,0.55)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 } }, "\u2764\ufe0f") : null,
              verrouille ? h("div", { style: { position: "absolute", inset: 0, background: "rgba(7,8,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: cavPanneau ? 26 : 20 } }, "\ud83d\udd12") : null,
              null),
            /* 21/10 (Blandine, 22 h 29) : « j'aimais bien les noms écrits en dessous des cases, mais juste le nom et rien d'autre » */
            h("div", { style: CAV_V2 ? { fontFamily: C, fontSize: cavPanneau ? 17 : 13.5, fontWeight: 600, marginTop: cavPanneau ? 10 : 7, lineHeight: 1.25, color: "#F3EEE4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } /* (1108) V2 : nom sur deux lignes au plus */ : { fontFamily: C, fontSize: 13.5, fontWeight: 600, marginTop: 7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#F3EEE4" /* (671) ivoire pour tous (la teinte propre du cheval reste sur SA page) */ } }, x.ch.nom),
            CAV_V2 ? null : h("div", { style: { fontSize: 10, color: "#878D8E", fontFamily: M, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, verrouille ? "Premium \u2726" : (x.lien ? ("\u25C7 " + T("Cheval de l\u2019\u00e9curie", "Stable horse", "Caballo de la cuadra", "Cavallo della scuderia", "\u53a9\u820e\u306e\u99ac", "Pferd des Stalls", "\u062d\u0635\u0627\u0646 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的马", "Stalpaard", "Cavalo da cocheira", "Stallhäst", "Лошадь конюшни", "Koń ze stajni", "마구간의 말")) : (x.ch.info || ""))));
        });
        /* 15/09 (198) : sa demande - avec neuf chevaux la grille est pleine (3 x 3) et la
           carte d ajout se retrouvait SEULE sur une quatrieme ligne. Quand la barre du
           deroulant existe, l ajout y monte ; la carte n est donc plus poussee ici. */
        var __barreChv = (__estVisite || premium) && source.length > PLAFOND_CHV;
        /* 15/10 (1136) la carte « Ajouter un cheval » n apparait plus chez un autre cavalier (visite) : elle ouvrait la creation d un cheval pour le visiteur. */
        if (!__barreChv && !clubCarteMil && !__estVisite) cartes.push(h("button", { key: "ajout", onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); }, style: { background: "none", border: "none", padding: 0, cursor: "pointer", minWidth: 0, textAlign: "center" } },
          h("div", { style: { width: "100%", aspectRatio: cavGalerie ? "4 / 3" : ((CAV_V2 && cavOrdi) ? "3 / 2" : "10 / 11") /* 15/10 (1140) ordinateur : cartes en largeur */, borderRadius: 14, border: "1.5px dashed " + __ta(0.5) + "", background: __ta(0.04), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 } },
            h("span", { style: { width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #C5AA78", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#C5AA78" } }, "+"),
            h("span", { style: { fontSize: 9.5, color: "#C5AA78", fontFamily: M, fontWeight: 600, letterSpacing: 0.4, padding: "0 6px", lineHeight: 1.3 } }, T("Ajouter un cheval", "Add a horse", "A\u00f1adir un caballo", "Aggiungi un cavallo", "\u99ac\u3092\u8ffd\u52a0", "Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646", "添加一匹马", "Een paard toevoegen", "Adicionar um cavalo", "Lägg till en häst", "Добавить лошадь", "Dodaj konia", "말 추가")))));
        /* 27/09 (449) : LA CARTE DU MILIEU, comme sur la page Ecurie. Blandine : « on peut appliquer la
           meme chose sur la page cavalier ? avec la carte du milieu qui emmene vers les autres chevaux »,
           « elle continue de faire ce qu elle faisait » (= comme sur la page Ecurie : la page des chevaux
           de l ecurie, ecran ecurie-hype), « oui ok pour le milieu ». Sur SA page seulement, et
           seulement si elle a une ecurie (celle choisie en haut si elle en a deux). En visite : rien. */
        var clubCarteC = clubCarteMil;   /* (450) calcule une seule fois plus haut */
        if (clubCarteC) {
          var carteCentreC = h("button", { key: "__carteCentreChevauxC", onClick: function () { try { window.__ecurieHypeClub = clubCarteC; } catch (eCc) { } setEcran("ecurie-hype"); }, style: { background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", minWidth: 0, alignSelf: "start" /* (450) : sinon la carte descend au milieu de la case (bouton centre verticalement) */ } },
            h("div", { style: { width: "100%", aspectRatio: (CAV_V2 && cavOrdi) ? "3 / 2" : "10 / 11" /* 15/10 (1140) ordinateur : cartes en largeur */, borderRadius: 14, overflow: "hidden", border: "1px solid " + CAV_BORD, background: CAV_PETIT, boxShadow: "0 10px 26px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 7px", boxSizing: "border-box" } },
              h("div", { style: { fontFamily: C, fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#F3EEE4", textAlign: "center", lineHeight: 1.35 } },
                T("Les chevaux de l'\u00e9curie", "The stable's horses", "Los caballos de la cuadra", "I cavalli della scuderia", "\u53a9\u820e\u306e\u99ac", "Die Pferde des Stalls", "\u062e\u064a\u0648\u0644 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말들")),
              h("div", { style: { fontFamily: M, fontSize: 10, fontWeight: 700, color: TURQL, textAlign: "center" } }, T("Voir tout", "See all", "Ver todo", "Vedi tutto", "\u3059\u3079\u3066", "Alle ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + " \u2192")));
          if (CAV_V2) {   /* (1108) la carte de l ecurie avec « Ajouter mon cheval » juste dessous ; au milieu si la grille est pleine (8), sinon a la fin */
            var milC = cavV2Milieu(clubCarteC);
            /* (1113) Blandine : la carte de l ecurie ne doit jamais se retrouver SEULE sur sa ligne (3 ou 6 chevaux). Dans ce
               cas elle devient un lien discret pleine largeur sous la grille (meme destination). */
            /* (1117) Blandine : « ca non plus c est pas suppose arriver » (7 chevaux : une case vide). Regle : la grille est TOUJOURS
               pleine. n+1 multiple de 3 (2, 5 chevaux) : chevaux + carte de l ecurie ; n+2 multiple de 3 (1, 4, 7) : + la carte
               « Ajouter mon cheval » ; n multiple de 3 (3, 6) : l ecurie en lien pleine largeur ; 8 et plus : ecurie au milieu. */
            /* (1133) meme regle, ecrite pour 3 colonnes (iPhone, a l identique) ou 4 (iPad / ordinateur) :
               4 col. : 7 chevaux (plafond) -> + ecurie ; reste 3 -> + ecurie ; reste 2 ou 1 -> + ecurie + ajout ; reste 0 -> lien pleine largeur. */
            if (cavGalerie) { cartes.push(milC); return cartes; }   /* 22/10 galerie : la carte de l ecurie en bout de ligne */
            var colJ = cavTab ? cavColCh : 3, nJ = cartes.length;
            if (!cavTab && nJ >= 8) cartes.splice(4, 0, milC);
            else if (cavTab && nJ >= 7 && colJ === 4) cartes.push(milC);
            else if (nJ % colJ === colJ - 2 || (cavTab && colJ === 4 && nJ % colJ === 1)) { cartes.push(milC); cartes.push(cavV2CarteAjout("__ajV2")); }
            else if (nJ % colJ === 0) cartes.push(h("button", { key: "__milLien", onClick: function () { try { window.__ecurieHypeClub = clubCarteC; } catch (eCc) { } setEcran("ecurie-hype"); }, style: { gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 42, marginTop: 4, borderRadius: 999, border: "1px solid rgba(201,166,107,0.62)", background: "rgba(5,8,11,0.6)", color: "#F3EEE4", fontFamily: M, fontSize: 12.5, cursor: "pointer" } },
              T("Les chevaux de l'\u00e9curie", "The stable's horses", "Los caballos de la cuadra", "I cavalli della scuderia", "\u53a9\u820e\u306e\u99ac", "Die Pferde des Stalls", "\u062e\u064a\u0648\u0644 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "马厩里的马", "De paarden van de stal", "Os cavalos da cocheira", "Stallets hästar", "Лошади конюшни", "Konie ze stajni", "마구간의 말들"),
              h("span", { "aria-hidden": "true", style: { color: "#C9A66B" } }, (function () { try { return document.documentElement.dir === "rtl" ? "\u2190" : "\u2192"; } catch (eD) { return "\u2192"; } })())));
            else cartes.push(milC);
            if (cavTab) return cavV2Justifier(cartes, cavColCh, cavPanneau ? 22 : 16);   /* (1133) */
            return cartes;
          }
          return hypePlacerAuMilieu(cartes, carteCentreC, "__videCentreChevauxC");
        }
        /* 14/10 (1121) Blandine : « fais les grilles justes quoi qu il arrive » — EN VISITE (V2) : on montre un nombre de chevaux
           multiple de 3 (9 au plus) ; s il en reste, un bouton pleine largeur « Voir tous ses chevaux (n) » les deplie (et
           « Reduire » les replie). Avec 1 ou 2 chevaux, ou une fois deplie, la derniere ligne incomplete est CENTREE. */
        if (cavGalerie && __estVisite) {   /* 22/10 galerie en visite : tous les chevaux montres, puis « Voir tous » s il en reste */
          if (!tousChevauxVus && source.length > cartes.length) cartes.push(h("button", { key: "__voirG", onClick: function () { setTousChevauxVus(true); }, style: { alignSelf: "start", width: "100%", aspectRatio: "4 / 3", borderRadius: 12, border: "1px solid rgba(201,166,107,0.4)", background: "#101D22", color: "#F3EEE4", fontFamily: M, fontSize: 13, cursor: "pointer", padding: 10 } },
            T("Voir tous ses chevaux", "See all their horses", "Ver todos sus caballos", "Vedi tutti i suoi cavalli", "\u3059\u3079\u3066\u306e\u99ac\u3092\u898b\u308b", "Alle Pferde ansehen", "\u0639\u0631\u0636 \u0643\u0644 \u062e\u064a\u0648\u0644\u0647\u0627", "查看TA所有的马", "Al hun paarden bekijken", "Ver todos os cavalos dele(a)", "Se alla deras hästar", "Посмотреть всех лошадей", "Zobacz wszystkie jej konie", "말 모두 보기") + " (" + source.length + ")"));
          return cartes;
        }
        if (CAV_V2 && __estVisite && cartes.length) {
          var totV = source.length, nV = cartes.length;
          var cV3 = cavTab ? cavColCh : 3, gV = cavTab ? (cavPanneau ? 22 : 16) : 10;   /* (1133) 4 colonnes sur iPad / ordinateur ; iPhone : 3, a l identique */
          var visV = (!tousChevauxVus && nV > cV3 && nV % cV3) ? cartes.slice(0, nV - (nV % cV3)) : cartes.slice();
          var defautV = (function () { var m = Math.min(totV, PLAFOND_CHV); return m > cV3 ? m - (m % cV3) : m; })();
          var rV = visV.length % cV3;
          if (rV) {
            var derV = visV.splice(visV.length - rV);
            visV.push(h("div", { key: "__resteV", style: { gridColumn: "1 / -1", display: "flex", justifyContent: "center", gap: gV } },
              derV.map(function (cV, iV) { return h("div", { key: "rv" + iV, style: { width: "calc((100% - " + ((cV3 - 1) * gV) + "px) / " + cV3 + ")", minWidth: 0 } }, React.cloneElement(cV, { style: Object.assign({}, cV.props.style, { width: "100%" }) })); })));
          }
          var plusV = !tousChevauxVus && totV > visV.length + (rV ? rV - 1 : 0) && totV > defautV;
          if (plusV || (tousChevauxVus && totV > defautV)) {
            visV.push(h("button", { key: "__voirV", onClick: function () { setTousChevauxVus(!tousChevauxVus); }, style: { gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 42, marginTop: 4, borderRadius: 999, border: "1px solid rgba(201,166,107,0.62)", background: "rgba(5,8,11,0.6)", color: "#F3EEE4", fontFamily: M, fontSize: 12.5, cursor: "pointer" } },
              tousChevauxVus ? T("R\u00e9duire", "Show less", "Reducir", "Riduci", "\u9589\u3058\u308b", "Weniger", "\u062a\u0635\u063a\u064a\u0631", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기")
                : (T("Voir tous ses chevaux", "See all their horses", "Ver todos sus caballos", "Vedi tutti i suoi cavalli", "\u3059\u3079\u3066\u306e\u99ac\u3092\u898b\u308b", "Alle Pferde ansehen", "\u0639\u0631\u0636 \u0643\u0644 \u062e\u064a\u0648\u0644\u0647\u0627", "查看TA所有的马", "Al hun paarden bekijken", "Ver todos os cavalos dele(a)", "Se alla deras hästar", "Посмотреть всех лошадей", "Zobacz wszystkie jej konie", "말 모두 보기") + " (" + totV + ")"),
              h("span", { "aria-hidden": "true", style: { color: "#C9A66B", fontSize: 11 } }, tousChevauxVus ? "\u25b4" : "\u25be")));
          }
          return visV;
        }
        if (cavGalerie) return cartes;
        if (CAV_V2 && cavTab) return cavV2Justifier(cartes, cavColCh, cavPanneau ? 22 : 16);   /* (1133) sa page sans ecurie : derniere ligne centree */
        return cartes;
      })()))),
    /* 11/10 (963) Blandine : « Sur la page cavalier passe mes amis sous mes chevaux » — bloc « Mes amis » deplace ici, tel quel. */
    CAV_V2 ? null : h("div", { style: { padding: "26px 16px 0" } },   /* (1109) en V2 : cavV2Amis, apres les chevaux */
      (function () {
        var mapP = function (p) { return Object.assign({}, p, { avatar_url: ((typeof avSrc === "function" ? avSrc(p.avatar_url) : p.avatar_url) || "") }); };
        var listeAmis = (amisListe || []).map(mapP);
        var idsA = {}; listeAmis.forEach(function (pA) { if (pA.id) idsA[pA.id] = true; });
        var listeSug = (!__estVisite && suggestions ? suggestions : []).filter(function (pS) { return pS && pS.id && !idsA[pS.id]; }).slice(0, 12).map(mapP);
        var ouvrirCavAmi = function (p) { try { if (typeof window !== "undefined") { window.__cavalierPublic = { id: (p.id || p.user_id || null), pseudo: p.pseudo, photo: ((typeof avSrc === "function") ? avSrc(p.avatar_url) : p.avatar_url) || null, ecurie: p.ecurie || "", club: (p.club || p.ecurie || ""), ville: p.ville || "" }; window.__cavalierOuvert = "__public"; } } catch (ePv) {} setEcran("cavalier"); };
        var nomTeamAmis = (__estVisite ? ((__visitePub && __visitePub.pseudo) || "") : ((ctx.profil && ctx.profil.pseudo) || "")).trim();
        /* 28/09 (502) : nouveau bloc « Mes amis » (HypeAmisVitrine). Retires de la page Cavalier : la rangee
           « A decouvrir », le grand bouton « Ajouter » et la carte « N cavaliers dans ta team » (le nombre passe
           dans l en-tete). « Voir tout » et « + Ajouter » ouvrent la Communaute (choix A). */
        return h("div", { style: { margin: "6px 0 14px" } }, h(HypeAmisVitrine, {
          amis: listeAmis,
          nombre: (amis != null ? amis : listeAmis.length),
          nomTeam: nomTeamAmis,
          visite: !!__estVisite,
          cle: (__estVisite && __visitePub && __visitePub.id) ? String(__visitePub.id) : "moi",   /* (506) */
          onOuvrir: ouvrirCavAmi,
          onAjouter: __estVisite ? null : function () { try { window.__communauteCible = "decouvrir"; } catch (eCd) { } setEcran("communaute"); },   /* (507) ouvre directement « A decouvrir » */
          videTxt: __estVisite ? T("Pas encore d\u2019amis sur Hype.", "No friends on Hype yet.", "A\u00fan no tiene amigos en Hype.", "Ancora nessun amico su Hype.", "\u307e\u3060Hype\u306b\u53cb\u9054\u304c\u3044\u307e\u305b\u3093\u3002", "Noch keine Freunde auf Hype.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u0635\u062f\u0642\u0627\u0621 \u0639\u0644\u0649 Hype \u0628\u0639\u062f.", "在 Hype 上还没有好友。", "Nog geen vrienden op Hype.", "Ainda sem amigos no Hype.", "Inga vänner på Hype än.", "Пока нет друзей в Hype.", "Na Hype nie ma jeszcze znajomych.", "아직 Hype에 친구가 없어요.") : T("Tes amis appara\u00eetront ici \u2014 suis des cavaliers dans la Communaut\u00e9.", "Your friends will appear here \u2014 follow riders in the Community.", "Tus amigos aparecer\u00e1n aqu\u00ed \u2014 sigue a jinetes en la Comunidad.", "I tuoi amici appariranno qui \u2014 segui i cavalieri nella Community.", "\u53cb\u9054\u306f\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002", "Deine Freunde erscheinen hier \u2013 folge Reitern in der Community.", "\u0633\u064a\u0638\u0647\u0631 \u0623\u0635\u062f\u0642\u0627\u0624\u0643 \u0647\u0646\u0627 \u2014 \u062a\u0627\u0628\u0639\u064a \u0641\u0631\u0633\u0627\u0646\u0627 \u0641\u064a \u0627\u0644\u0645\u062c\u062a\u0645\u0639.", "你的好友会出现在这里——去社区关注一些骑手吧。", "Je vrienden verschijnen hier — volg ruiters in de Community.", "Seus amigos vão aparecer aqui — siga cavaleiros na Comunidade.", "Dina vänner dyker upp här — följ ryttare i Community.", "Здесь появятся твои друзья — подписывайся на всадников в Сообществе.", "Twoi znajomi pojawią się tutaj — obserwuj jeźdźców w Społeczności.", "친구들이 여기에 나타나요. 커뮤니티에서 기수들을 팔로우해 보세요.")
        }));
      })()),
      /* 15/09 (197) : LE DEROULANT. Il n apparait QUE s il y a plus de neuf chevaux ET qu on
         voit la liste entiere (premium, ou profil visite) : sur un compte non premium la
         coupe a 6 est un plafond d abonnement, pas un replis, et un bouton « voir les autres »
         y serait un faux espoir. */
      (function () {
        var tousChv = __estVisite ? (chevauxVisite || []) : (chevaux || []);
        if (CAV_V2 && __estVisite) return null;   /* (1121) en V2, le depliage de la visite est dans la grille */
        if (!(__estVisite || premium) || tousChv.length <= PLAFOND_CHV) return null;
        if (!__estVisite && clubCarteMil) return null;   /* 28/09 (476) : choix B - la carte du milieu remplace les deux boutons */
        var stPil = { flex: 1, minWidth: 0, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, borderRadius: 999, fontFamily: M, fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: "0 10px", textAlign: "center" };
        return h("div", { style: { margin: "6px 16px 0", display: "flex", gap: 8 } },
          /* L AJOUT, monte ici depuis la grille. Pas sur un profil visite : on n ajoute
             pas un cheval chez quelqu un d autre. */
          __estVisite ? null : h("div", { role: "button", onClick: function () { if (window.__ouvrirCreationCheval) window.__ouvrirCreationCheval(); },
            style: Object.assign({}, stPil, { border: "1.5px dashed rgba(197,170,120,0.5)", background: "rgba(197,170,120,0.04)", color: "#C5AA78" }) },
            h("span", { style: { fontSize: 15, lineHeight: 1, fontWeight: 400 } }, "+"),
            h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, T("Ajouter un cheval", "Add a horse", "A\u00f1adir un caballo", "Aggiungi un cavallo", "\u99ac\u3092\u8ffd\u52a0", "Pferd hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0627\u0646", "添加一匹马", "Een paard toevoegen", "Adicionar um cavalo", "Lägg till en häst", "Добавить лошадь", "Dodaj konia", "말 추가"))),
          h("div", { role: "button", onClick: function () { setTousChevauxVus(!tousChevauxVus); },
            style: Object.assign({}, stPil, { border: "1px solid rgba(197,170,120,0.32)", background: "rgba(197,170,120,0.06)", color: "#C5AA78" }) },
            h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
              tousChevauxVus
                ? T("R\u00e9duire", "Show less", "Reducir", "Riduci", "\u9589\u3058\u308b", "Weniger", "\u062a\u0635\u063a\u064a\u0631", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기")
                : (T("Voir les autres", "See the others", "Ver los dem\u00e1s", "Vedi gli altri", "\u4ed6\u3092\u898b\u308b", "Weitere anzeigen", "\u0639\u0631\u0636 \u0627\u0644\u0628\u0642\u064a\u0629", "查看其他", "De anderen bekijken", "Ver os outros", "Se de andra", "Посмотреть остальных", "Zobacz pozostałe", "다른 말 보기") + " (" + (tousChv.length - PLAFOND_CHV) + ")")),
            h("span", { style: { fontSize: 11, lineHeight: 1 } }, tousChevauxVus ? "\u25b4" : "\u25be")));
      })(),
    cavZ("amis", CAV_V2 ? cavV2Amis() : null),   /* (1109) */
    /* 19/09 (246) : LE RAIL DES RESULTATS PASSE SOUS LES CHEVAUX. Sa demande : « dans l idee
       il devrait plutot poper en dessous de mes chevaux non », puis « sous ses chevaux avec un
       titre et un bon espace de separation ». C est aussi l ordre de la page Ecurie : les
       chevaux, PUIS « Derniers resultats ». Il etait AU-DESSUS et chevauchait « Mes chevaux ».
       Le composant est AUTONOME (ses propres etats) : le deplacer ne casse pas l ordre des
       hooks — c est la raison pour laquelle il avait ete sorti en composant a part le 13/09. */
    cavZ("res", h(BlocResultatsCavaliere, { userId: (__estVisite ? ((__visitePub && __visitePub.id) || null) : ((profil && profil.id) || null)), sien: !__estVisite, v2: CAV_V2 /* (1110) */ })),
    /* 27/09 (444) : L ENCART « HYPE MEMORIES » EST RETIRE de la page Cavalier. Blandine : « on
       peut juste virer l onglet hype memories du coup ? » (option A). La PAGE memoirescavalier
       RESTE : la tuile « Photos » et le bouton du recit y menent encore, ainsi que les albums
       (fiche cheval, invitations, mur des souvenirs, liens #c=memento). Page a refaire plus tard. */
    /* 26/07 : « L'Album de l'ecurie » RETIRE de la page profil du cavalier (demande de Blandine). L encart reste sur Mon Club et sur Ma page Ecurie. */
    /* 16/09 (181) - CETTE CARTE DEVIENT L ACCES A L APPRENTISSAGE DU CAVALIER, et n ouvre plus
       Hey Baby. Blandine : « en fait on a deja l onglet apprentissage, c est juste qu il
       renvoie vers Hey Baby au lieu de renvoyer vers une page apprentissage ; il faudrait
       retirer Hey Baby du texte de cet onglet et le coder pour qu il emmene vers ta page
       apprentissage du cavalier ». Le sur-titre perd son « HEY BABY \u00b7 », et l accès a Hey Baby
       est rendu par la TROISIEME carte, juste en dessous. */
    /* 27/09 (406) : LA GRANDE CARTE « MON APPRENTISSAGE » (-> Theorie & Culture) EST RETIREE de la
       page Cavalier. Blandine : « vas-y » (proposition du 26/09 : Theorie & Culture est desormais
       une ligne de la page Mon apprentissage, ouverte par la tuile Progression, et reste sur
       l Accueil). Il reste deux grandes cartes : Mes messages et Hey Baby. */
    /* 16/09 (181) - LA TROISIEME CARTE : HEY BABY. Blandine : « ajouter l onglet similaire a
       celui de l accueil que tu peux copier pour aller sur Hey Baby. Tu fais trois onglets de
       meme taille avec les deux autres deja existants ».
       Reprise de la carte de l ACCUEIL : son image (IMG_HEYBABY_BANNIERE) et ses mots
       (« Hey Baby » / « Mon coach » / « virtuel », le second mot en turquoise, comme la-bas).
       ⚠️ MAIS PAS SES CLASSES CSS : la carte de l accueil est en classes `banner heyb glass`,
       qui portent leur propre hauteur. Les reprendre ici aurait donne une carte d une taille
       DIFFERENTE des deux autres, alors qu elle demande trois onglets de MEME taille. On reprend
       donc le style en ligne des deux cartes voisines - 188 px, largeur calc(100% - 32px),
       rayon 24 - et seuls l image et les textes viennent de l accueil.
       Le geste \u00ab Prive \u00bb des visites est conserve : desactivee quand on regarde le profil de
       quelqu un d autre, comme les deux autres cartes. */
    /* 22/09 (374) : la carte Hey Baby (son coach A ELLE) est CACHEE sur la page de quelqu un d autre. */
    /* 28/09 (494) : carte RETIREE (Blandine : Hey Baby passe dans la page Progression). */
    true ? null : h("button", { onClick: function () { if (!__estVisite) setEcran("assistant"); }, disabled: __estVisite,
      /* 16/09 (184) : hauteur 188 -> 132. Blandine : « diminue la taille des trois onglets, c est bcp trop gros ». ⚠ LES DEUX AUTRES hauteurs de 188 de cet ecran appartiennent au bloc « Mon Ecurie » et ne sont PAS touchees - verifie avant de changer quoi que ce soit. */
      style: { position: "relative", display: "block", width: "calc(100% - 32px)", height: 132, margin: "18px 16px 0", padding: 0, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(197,170,120,0.24)", background: "#0A0F14", cursor: __estVisite ? "default" : "pointer", textAlign: "left", opacity: __estVisite ? 0.55 : 1 } },
      (typeof IMG_HEYBABY_BANNIERE !== "undefined" && IMG_HEYBABY_BANNIERE)
        ? h("div", { style: { position: "absolute", inset: 0, backgroundImage: "url(" + IMG_HEYBABY_BANNIERE + ")", backgroundSize: "cover", backgroundPosition: "center" } })
        : null,
      h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,11,0.15) 0%, rgba(5,8,11,0.30) 45%, rgba(5,8,11,0.90) 100%)" } }),
      h("div", { style: { position: "absolute", left: 18, bottom: 16, right: 78 } },
        h("div", { style: { fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#C5AA78", fontWeight: 700, fontFamily: "'Montserrat',sans-serif", textShadow: "0 1px 10px rgba(0,0,0,0.9)" } }, "Hey Baby"),
        /* 16/09 (184) : titre sur UNE ligne au lieu de deux (le <br> est retire) - dans une
           carte de 132 px, deux lignes de Cinzel debordaient sur la phrase du dessous. */
        h("div", { style: { marginTop: 3, fontFamily: "'Cinzel',serif", fontSize: 17, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.12, letterSpacing: "0.04em", textTransform: "uppercase", textShadow: "0 2px 14px rgba(0,0,0,0.95)" } },
          T("Mon coach", "My coach", "Mi coach", "Il mio coach", "\u30b3\u30fc\u30c1", "Mein Coach", "\u0645\u062f\u0631\u0628\u064a", "我的教练", "Mijn coach", "Meu coach", "Min coach", "Мой тренер", "Mój trener", "내 코치"),
          " ",
          h("span", { style: { color: "#C5AA78" } }, T("virtuel", "virtual", "virtual", "virtuale", "\u30d0\u30fc\u30c1\u30e3\u30eb", "virtuell", "\u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a", "虚拟", "virtueel", "virtual", "virtuell", "виртуальный", "wirtualny", "가상"))),
        h("div", { style: { marginTop: 5, fontSize: 11.5, fontWeight: 500, color: "rgba(243,238,228,0.88)", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.4, textShadow: "0 1px 10px rgba(0,0,0,0.95)" } },
          T("Partage tes photos et vid\u00e9os pour avoir ses conseils", "Share your photos and videos to get his advice", "Comparte tus fotos y v\u00eddeos para sus consejos", "Condividi foto e video per i suoi consigli", "\u5199\u771f\u3084\u52d5\u753b\u3092\u5171\u6709\u3057\u3066\u30a2\u30c9\u30d0\u30a4\u30b9\u3092", "Teile Fotos und Videos f\u00fcr seinen Rat", "\u0634\u0627\u0631\u0643\u064a \u0635\u0648\u0631\u0643 \u0648\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a\u0643 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u0635\u0627\u0626\u062d\u0647", "分享你的照片和视频，获得 TA 的建议", "Deel je foto’s en video’s om zijn tips te krijgen", "Compartilhe suas fotos e vídeos para receber os conselhos dele", "Dela dina foton och videor för att få hans råd", "Делись фото и видео, чтобы получать его советы", "Udostępnij swoje zdjęcia i filmy, aby dostać jego wskazówki", "사진과 영상을 공유하고 조언을 받아 보세요"))),
      h("div", { style: { position: "absolute", right: 16, bottom: 16, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(197,170,120,0.6)", background: "rgba(7,8,10,0.45)", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("span", { style: { color: "#C5AA78", fontSize: 17, fontWeight: 700 } }, "\u203a"))),

    ((estModAdm && AFFICHER_SECTIONS_BIENTOT) ? sectionBientot(T("Derni\u00e8res performances", "Latest results", "\u00daltimos resultados", "Ultimi risultati", "\u6700\u65b0\u306e\u6210\u7e3e", "Letzte Ergebnisse", "\u0622\u062e\u0631 \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "最近的表现", "Laatste prestaties", "Últimas performances", "Senaste prestationer", "Последние выступления", "Ostatnie występy", "최근 성적")) : null),

    ((estModAdm && AFFICHER_SECTIONS_BIENTOT) ? sectionBientot(T("Passeport \u00e9questre", "Equestrian passport", "Pasaporte ecuestre", "Passaporto equestre", "\u99ac\u8853\u30d1\u30b9\u30dd\u30fc\u30c8", "Reiterpass", "\u062c\u0648\u0627\u0632 \u0627\u0644\u0641\u0631\u0648\u0633\u064a\u0629", "马术护照", "Paardenpaspoort", "Passaporte equestre", "Hästpass", "Конный паспорт", "Paszport konia", "승마 여권")) : null),
    ((estModAdm && AFFICHER_SECTIONS_BIENTOT) ? sectionBientot(T("Troph\u00e9es", "Trophies", "Trofeos", "Trofei", "\u30c8\u30ed\u30d5\u30a3\u30fc", "Troph\u00e4en", "\u0627\u0644\u062c\u0648\u0627\u0626\u0632", "奖杯", "Trofeeën", "Troféus", "Troféer", "Трофеи", "Trofea", "트로피")) : null),
    ((estModAdm && AFFICHER_SECTIONS_BIENTOT) ? sectionBientot(T("Badges", "Badges", "Insignias", "Distintivi", "\u30d0\u30c3\u30b8", "Abzeichen", "\u0627\u0644\u0634\u0627\u0631\u0627\u062a", "徽章", "Badges", "Badges", "Märken", "Значки", "Odznaki", "배지")) : null),
    /* 27/09 (451) : EN VISITE, LE MUR EST CELUI DE LA PERSONNE VISITEE. Avant, cibleMoi prenait
       l identifiant de la personne CONNECTEE : en visite, on voyait son propre mur. Desormais :
       - sa page : cibleMoi, strictement comme avant ;
       - en visite : cible explicite « cavalier:<__visitePub.id> » (MurHype accepte deja `cible`),
         SANS champ de publication (choix « B » de Blandine : on regarde, on n ecrit pas chez
         quelqu un d autre) ; la cle force un nouveau mur quand on passe d une cavaliere a une autre.
       Aucune requete de plus, aucun SQL. */
    /* 28/09 (508) : LE MUR « PUBLICATIONS » EST RETIRE DE LA PAGE CAVALIER (Blandine, choix A : il ira sur
       la page Actualite, retravaillee plus tard). Les publications « cavalier:<id> » restent en base,
       rien n est efface. Pour le remettre : les deux appels ci-dessous.
       (__estVisite && __visitePub && __visitePub.id)
         ? h(MurHype, { key: "murcav-" + String(__visitePub.id), cible: "cavalier:" + String(__visitePub.id), sansComposer: true })
         : h(MurHype, { cibleMoi: true }), */
    /* 16/08 (demande de Blandine) : la carte « Tes quêtes » (niveau + barre
       d'XP) DESCEND EN BAS DE LA PAGE. Elle occupait le haut, entre les clubs
       et le récit. Rien d'autre ne change : même carte, même action, même
       calcul d'XP. Le petit bouton « Voir mes quêtes » de l'en-tête n'a PAS
       été touché — il n'était pas dans la demande. */
    /* 28/09 (494) : la carte des quetes n est plus montree QU A BLANDINE (compte Feinn), temporairement :
       « on peut basculer l encart les quetes temporairement sur mon compte ». */
    (false /* 28/09 (495) : carte des quetes DEPLACEE sur la page Mon compte (compte Feinn seulement) */ ? null : null),
    /* (677) Blandine : « on peut cloturer la page en bas aussi comme les autres avec une photo et le trait horizontal HYPE » :
       meme fin de page que l Accueil / l Ecurie / la Communaute (paysage fondu images/accueil_v2_fin_de_page_v1.webp, deja dans le depot,
       puis filets champagne mat et « HYPE »). Aucune carte, aucun bouton ; une cale garde la signature au-dessus de la barre du bas. */
    h("div", { "aria-hidden": "true", style: { paddingTop: CAV_V2 ? 24 : 56 /* (1114) V2 : fin de page remontee (Blandine) */ } },
      h("div", { style: { position: "relative", height: 118, overflow: "hidden" } },
        h("img", { src: "images/accueil_v2_fin_de_page_v1.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, #05080B 0%, rgba(5,8,11,0) 12%, rgba(5,8,11,0) 88%, #05080B 100%)" } })),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "6px 24px 0" } },
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "270deg" : "90deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } }),
        h("span", { dir: "ltr", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 13, letterSpacing: 4, paddingInlineStart: 4, color: "#C5AA78" } }, "HYPE"),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "90deg" : "270deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } }))),
    h("div", { style: { textAlign: "center", color: "rgba(189,182,170,0.4)", fontSize: 9, letterSpacing: "0.12em", margin: "20px 0 6px", fontFamily: "'Montserrat',sans-serif" } }, "HYPE \u00b7 version 14.07 \u00b7 16h40"),
    editPseudo ? h("div", { onClick: function () { setEditPseudo(false); }, style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "calc(env(safe-area-inset-top) + 80px) 0 0" } },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "88%", maxWidth: 360, borderRadius: 20, border: "1px solid " + __ta(0.4) + "", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "20px 18px" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Mon pseudo", "My username", "Mi seud\u00f3nimo", "Il mio pseudonimo", "\u30e6\u30fc\u30b6\u30fc\u30cd\u30fc\u30e0", "Mein Benutzername", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "我的昵称", "Mijn gebruikersnaam", "Meu apelido", "Mitt användarnamn", "Мой ник", "Mój pseudonim", "내 닉네임")),
        h("p", { style: { color: "#878D8E", fontSize: 12, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 } }, T("C'est le nom que verront les autres cavaliers.", "This is the name other riders will see.", "Es el nombre que ver\u00e1n los dem\u00e1s jinetes.", "\u00c8 il nome che vedranno gli altri cavalieri.", "\u4ed6\u306e\u9a0e\u624b\u306b\u8868\u793a\u3055\u308c\u308b\u540d\u524d\u3067\u3059\u3002", "Diesen Namen sehen die anderen Reiter.", "\u0647\u0630\u0627 \u0647\u0648 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0630\u064a \u0633\u064a\u0631\u0627\u0647 \u0627\u0644\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0622\u062e\u0631\u0648\u0646.", "这是其他骑手会看到的名字。", "Dit is de naam die andere ruiters zien.", "É o nome que os outros cavaleiros vão ver.", "Det är namnet som andra ryttare ser.", "Это имя увидят другие всадники.", "To nazwa, którą zobaczą inni jeźdźcy.", "다른 기수들에게 보이는 이름이에요.")),
        /* 18/08 (demande de Blandine) : « quand les gens cliquent, il faut
           qu'il y ait une petite phrase pour expliquer qu'il y a qu'un
           changement gratuit ». Elle est posee AVANT la saisie, pas apres :
           un avertissement lu apres coup ne sert a rien. */
        h("p", { style: { color: "#C5AA78", fontSize: 11.5, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5, fontFamily: "'Montserrat',sans-serif" } }, T("Un seul changement est offert. Ensuite, il faudra attendre 7 jours entre deux changements.", "One change is free. After that, you'll need to wait 7 days between changes.", "Un cambio es gratuito. Despu\u00e9s habr\u00e1 que esperar 7 d\u00edas entre cambios.", "Un cambio \u00e8 offerto. Poi bisogner\u00e0 attendere 7 giorni tra due cambi.", "\u5909\u66f4\u306f1\u56de\u7121\u6599\u3067\u3059\u3002\u305d\u306e\u5f8c\u306f7\u65e5\u9593\u306e\u9593\u9694\u304c\u5fc5\u8981\u3067\u3059\u3002", "Eine \u00c4nderung ist gratis. Danach sind 7 Tage Wartezeit n\u00f6tig.", "\u064a\u0633\u0645\u062d \u0628\u062a\u063a\u064a\u064a\u0631 \u0648\u0627\u062d\u062f \u0645\u062c\u0627\u0646\u0627. \u0628\u0639\u062f \u0630\u0644\u0643 \u064a\u062c\u0628 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 7 \u0623\u064a\u0627\u0645 \u0628\u064a\u0646 \u0643\u0644 \u062a\u063a\u064a\u064a\u0631.", "可以免费修改一次。之后，两次修改之间需间隔 7 天。", "Eén wijziging is gratis. Daarna moet je 7 dagen wachten tussen twee wijzigingen.", "Uma troca é grátis. Depois, será preciso esperar 7 dias entre cada troca.", "En ändring är gratis. Därefter måste du vänta 7 dagar mellan ändringarna.", "Одно изменение бесплатно. Потом между изменениями нужно ждать 7 дней.", "Jedna zmiana jest gratis. Potem między zmianami trzeba odczekać 7 dni.", "한 번은 무료로 바꿀 수 있어요. 그 뒤로는 변경 사이에 7일을 두어야 해요.")),
        msgPseudo ? h("p", { style: { color: "#F0A0A0", fontSize: 12, textAlign: "center", margin: "0 0 12px", lineHeight: 1.45, fontFamily: "'Montserrat',sans-serif" } }, msgPseudo) : null,
        h("input", { value: pseudoLocal, onChange: function (eI) { setPseudoLocal(eI.target.value); }, maxLength: 24, placeholder: T("Ton pseudo\u2026", "Your username\u2026", "Tu seud\u00f3nimo\u2026", "Il tuo pseudonimo\u2026", "\u30e6\u30fc\u30b6\u30fc\u30cd\u30fc\u30e0\u2026", "Dein Benutzername\u2026", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u2026", "你的昵称…", "Je gebruikersnaam…", "Seu apelido…", "Ditt användarnamn…", "Твой ник…", "Twój pseudonim…", "내 닉네임…"), style: { width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 16, fontFamily: "'Montserrat',sans-serif", outline: "none" } }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
          h("button", { onClick: function () { setEditPseudo(false); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#BDB6AA", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { onClick: sauverPseudo, disabled: occupePseudo, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "none", background: "linear-gradient(90deg,#AD8B57,#C5AA78)", color: "#1A1408", fontSize: 13, fontWeight: 800, cursor: occupePseudo ? "default" : "pointer", opacity: occupePseudo ? 0.55 : 1, fontFamily: "'Montserrat',sans-serif" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))) : null,
    editClub ? h("div", { onClick: function(){ setEditClub(false); }, style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "16vh" } },
      h("div", { onClick: function(e){ e.stopPropagation(); }, style: { width: "88%", maxWidth: 360, borderRadius: 20, border: "1px solid " + __ta(0.4) + "", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "20px 18px" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Mon club", "My club", "Mi club", "Il mio club", "\u30de\u30a4\u30af\u30e9\u30d6", "Mein Verein", "\u0646\u0627\u062f\u064a\u064a", "我的俱乐部", "Mijn manege", "Meu clube", "Min ridklubb", "Мой клуб", "Mój klub", "내 클럽")),
        h("p", { style: { color: "#878D8E", fontSize: 12, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 } }, T("Cherche ton club, ou \u00e9cris son nom s'il n'est pas dans la liste.", "Search your club, or type its name if it's not listed.", "Busca tu club o escribe su nombre.", "Cerca il tuo club o scrivi il suo nome.", "\u30af\u30e9\u30d6\u3092\u691c\u7d22\u3001\u306a\u3051\u308c\u3070\u5165\u529b\u3002", "Suche deinen Verein oder schreib seinen Namen, falls er nicht in der Liste ist.", "\u0627\u0628\u062d\u062b\u064a \u0639\u0646 \u0646\u0627\u062f\u064a\u0643\u060c \u0623\u0648 \u0627\u0643\u062a\u0628\u064a \u0627\u0633\u0645\u0647 \u0625\u0646 \u0644\u0645 \u064a\u0643\u0646 \u0641\u064a \u0627\u0644\u0642\u0627\u0626\u0645\u0629.", "搜索你的俱乐部，如果列表里没有，就直接写下它的名字。", "Zoek je manege, of typ de naam als hij niet in de lijst staat.", "Procure seu clube ou digite o nome dele se não estiver na lista.", "Sök efter din ridklubb, eller skriv dess namn om den inte finns i listan.", "Найди свой клуб или напиши его название, если его нет в списке.", "Wyszukaj swój klub albo wpisz jego nazwę, jeśli nie ma go na liście.", "클럽을 검색하거나, 목록에 없다면 이름을 직접 입력하세요.")),
        React.createElement(SelecteurClub, { local: clubLocal, setLocal: setClubLocal }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
          h("button", { onClick: function(){ setEditClub(false); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#BDB6AA", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { onClick: function () { sauverClub(); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "none", background: "linear-gradient(90deg,#AD8B57,#C5AA78)", color: "#1A1408", fontSize: 13, fontWeight: 800, cursor: "pointer" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))),
        (profil.club || profil.ecurie) ? h("button", { onClick: function () { sauverClub(""); }, style: { marginTop: 12, width: "100%", padding: "10px 0", borderRadius: 999, border: "none", background: "transparent", color: "rgba(226,138,146,0.85)", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, T("Retirer cette \u00e9curie", "Remove this stable", "Quitar esta cuadra", "Rimuovi questa scuderia", "\u3053\u306e\u53a9\u820e\u3092\u524a\u9664", "Diesen Stall entfernen", "\u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "移除这个马厩", "Deze stal verwijderen", "Remover esta cocheira", "Ta bort det här stallet", "Убрать эту конюшню", "Usuń tę stajnię", "이 마구간 삭제하기")) : null)) : null,
    editClub2 ? h("div", { onClick: function () { setEditClub2(false); }, style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "16vh" } },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "88%", maxWidth: 360, borderRadius: 20, border: "1px solid " + __ta(0.4) + "", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "20px 18px" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Ma deuxi\u00e8me \u00e9curie", "My second stable", "Mi segunda cuadra", "La mia seconda scuderia", "\u30bb\u30ab\u30f3\u30c9\u53a9\u820e", "Mein zweiter Stall", "\u0625\u0633\u0637\u0628\u0644\u064a \u0627\u0644\u062b\u0627\u0646\u064a", "我的第二个马厩", "Mijn tweede stal", "Minha segunda cocheira", "Mitt andra stall", "Моя вторая конюшня", "Moja druga stajnia", "내 두 번째 마구간")),
        h("p", { style: { color: "#878D8E", fontSize: 12, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 } }, T("Pour les cavaliers qui montent dans plusieurs \u00e9curies.", "For riders who ride at several stables.", "Para jinetes que montan en varias cuadras.", "Per i cavalieri che montano in pi\u00f9 scuderie.", "\u8907\u6570\u306e\u53a9\u820e\u3067\u4e57\u308b\u30e9\u30a4\u30c0\u30fc\u5411\u3051", "F\u00fcr Reiter, die in mehreren St\u00e4llen reiten.", "\u0644\u0644\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0630\u064a\u0646 \u064a\u0631\u0643\u0628\u0648\u0646 \u0641\u064a \u0639\u062f\u0629 \u0625\u0633\u0637\u0628\u0644\u0627\u062a.", "适合在多个马厩骑马的骑手。", "Voor ruiters die op meerdere stallen rijden.", "Para cavaleiros que montam em várias cocheiras.", "För ryttare som rider i flera stall.", "Для всадников, которые ездят в нескольких конюшнях.", "Dla jeźdźców, którzy jeżdżą w kilku stajniach.", "여러 마구간에서 말을 타는 기수를 위한 설정이에요.")),
        React.createElement(SelecteurClub, { local: club2Local, setLocal: setClub2Local }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
          h("button", { onClick: function () { setEditClub2(false); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#BDB6AA", fontSize: 13, fontWeight: 700, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { onClick: function () { sauverClub2(); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "none", background: "linear-gradient(90deg,#AD8B57,#C5AA78)", color: "#1A1408", fontSize: 13, fontWeight: 800, cursor: "pointer" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))),
        (profil.club2 || profil.ecurie2) ? h("button", { onClick: function () { sauverClub2(""); }, style: { marginTop: 12, width: "100%", padding: "10px 0", borderRadius: 999, border: "none", background: "transparent", color: "rgba(226,138,146,0.85)", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, T("Retirer cette \u00e9curie", "Remove this stable", "Quitar esta cuadra", "Rimuovi questa scuderia", "\u3053\u306e\u53a9\u820e\u3092\u524a\u9664", "Diesen Stall entfernen", "\u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "移除这个马厩", "Deze stal verwijderen", "Remover esta cocheira", "Ta bort det här stallet", "Убрать эту конюшню", "Usuń tę stajnię", "이 마구간 삭제하기")) : null)) : null,
    estModAdm ? h("button", { onClick: function () { setPremium(!premium); }, title: premium ? "Mode Premium (admin)" : "Mode Gratuit (admin)", style: { position: "absolute" /* (500) etait fixed : flottait sur « Mon recit » en defilant */, left: 60, top: "calc(env(safe-area-inset-top) + 18px)" /* (506) meme ligne que la fleche retour, a sa droite */, zIndex: 7000, display: "flex", alignItems: "center", gap: 6, padding: "6px 12px 6px 10px", borderRadius: 999, border: "1px solid rgba(197,170,120,0.35)", background: "rgba(8,12,16,0.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: premium ? "#C5AA78" : "#878D8E", fontSize: 10.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.4)" } },
      h("span", { style: { width: 6, height: 6, borderRadius: "50%", background: premium ? "#C5AA78" : "#6E6A62", flexShrink: 0, boxShadow: premium ? "0 0 6px rgba(197,170,120,0.8)" : "none" } }),
      premium ? "Premium" : "Gratuit") : null,
    albumOuvert ? h(EcranAlbumPhotos, { userId: __estVisite ? (__visitePub && __visitePub.id) : moiIdAlb, cible: "avatar", cibleId: null, tr: tr, onClose: function () { setAlbumOuvert(false); }, onRepublier: function (url) { appliquerNouvelAvatar({ dataUrl: url, fichier: null, original: null }); } }) : null);
}
window.HypeCavalier = { Cavalier: EcranMonCavalier };
})();
