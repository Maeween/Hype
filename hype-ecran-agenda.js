/* HYPE ▸ 30/10/2026 — Écran AGENDA DU CLUB (EcranAgendaClub), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~181 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranAgendaClub(props) {
  var h = React.createElement;
  /* 12/10 (1055) : la page « Evenements passes » est une VUE de ce meme ecran (route
     "evenements-passes") : elle reprend le chargement du passe deja ecrit ici (medias,
     publications, resultats, couverture) au lieu d en faire une deuxieme copie. */
  var vuePasses = !!(props && props.vuePasses);
  var app = (typeof useApp === "function") ? useApp() : {};
  var setEcran = app.setEcran || function () { };
  var lg = app.langue || "fr";
  /* 12/09 (47) — CET ECRAN PLANTAIT A COUP SUR (« Un caillou dans le sabot », capture de Blandine :
     « ReferenceError : Can't find variable: T », ecran agenda-club). Il appelle T(...) DIX fois sans
     jamais definir T ni tr : le composant levait donc une erreur des le premier rendu, l'agenda du
     club etait totalement inaccessible. Defaut ANTERIEUR a cette session (present a l'identique
     dans son index du 12/09 et dans les precedents). Repli sur le francais si tr manque. */
  var tr = app.tr || function (o) { return (o && (o[lg] || ((lg === "zh" || lg === "nl" || lg === "pt" || lg === "sv" || lg === "ru" || lg === "pl" || lg === "ko") && o.en) || o.fr)) || ""; };
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (414) : arabe */
  var profil = (app.profil || {});
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var OR = "#D9C7A3";

  var club = "";
  try { club = String(window.__agendaClub || "").trim(); } catch (eC) { }
  if (!club) club = String((profil.club || profil.ecurie || "")).trim();

  var _ev = React.useState(null); var evs = _ev[0], setEvs = _ev[1];
  var _er = React.useState(""); var err = _er[0], setErr = _er[1];
  /* 14/09 (126) : le passe. Il n est demande a la base QUE si elle clique - sinon on
     ferait une requete de plus a chaque visite pour rien. */
  var _pv = React.useState(false); var voirPasse = _pv[0], setVoirPasse = _pv[1];
  /* 14/09 (139) - UN RENDEZ-VOUS PASSE S OUVRE SUR PLACE, comme une publication.
     Blandine : « pour rdv passes une page ou un petit post s il y a pas grand chose a dire
     dedans ; faudrait que ca fasse comme pour les publi peut etre ? ». Donc le meme geste
     que les vignettes du fil : on touche, ca s ouvre en dessous, on retouche, ca se ferme.
     Pas de page dediee pour trois photos. */
  var _oe = React.useState(null); var ouvertEv = _oe[0], setOuvertEv = _oe[1];
  var _pe = React.useState(null); var passe = _pe[0], setPasse = _pe[1];
  var _pr = React.useState(""); var errPasse = _pr[0], setErrPasse = _pr[1];

  /* 14/09 (147) : le passe est desormais charge AU DEMARRAGE de la page - Blandine ne veut
     plus avoir a ouvrir une section pour le voir. Le bouton ne sert plus qu a montrer les
     rendez-vous au-dela des 5 plus recents. */
  React.useEffect(function () { chargerPasse(); }, [club]);
  /* Les medias de TOUS les rendez-vous passes, en UNE requete : leurs murs portent la cible
     « agenda:<identifiant> ». Un par un aurait fait une requete par carte. */
  var _me = React.useState({}); var mediasEv = _me[0], setMediasEv = _me[1];
  var _pe2 = React.useState({}); var postsEv = _pe2[0], setPostsEv = _pe2[1];
  var _vp = React.useState(null); var visuPasse = _vp[0], setVisuPasse = _vp[1];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !passe || !passe.length) return;
        var cibles = passe.map(function (ev) { return "agenda:" + String(ev.id); });
        var moi = null; try { moi = await utilisateurActuel(); } catch (eU) { moi = null; }
        var r = await supa.from("commentaires").select("*").in("cible", cibles.slice(0, 200)).order("created_at", { ascending: true }).limit(400);
        if (!vif || !r || r.error) return;
        var parEv = {}, parPost2 = {};
        ((r && r.data) || []).forEach(function (po) {
          if (po.prive && !(moi && po.user_id === moi.id)) return;
          var idEv = String(po.cible || "").replace("agenda:", "");
          if (!parEv[idEv]) parEv[idEv] = [];
          if (po.photo_url) parEv[idEv].push(po.photo_url);
          var sup = (Array.isArray(po.medias) && po.medias.length) ? po.medias : [];
          sup.forEach(function (u) { if (u && parEv[idEv].indexOf(u) === -1) parEv[idEv].push(u); });
          /* 14/09 (153) : on garde aussi LES PUBLICATIONS, la premiere servant de contenu a la
             carte (photo, texte) - pas seulement la liste de leurs medias. */
          if (!parPost2[idEv]) parPost2[idEv] = [];
          parPost2[idEv].push(po);
        });
        /* 14/09 (151) - LES PHOTOS RATTACHEES APRES COUP ENTRENT AUSSI DANS LE BANDEAU.
           Au build 150, une photo rattachee par le lien « Rattacher » apparaissait dans le FIL
           du rendez-vous mais PAS dans son bandeau du haut : ce chargement ne lisait que la
           cible « agenda:<id> ». Il lit desormais les DEUX chemins, comme la carte.
           DEUX REQUETES DE PLUS AU TOTAL, pas deux par rendez-vous : les identifications de
           tous les rendez-vous affiches d un coup, puis les publications correspondantes. */
        try {
          var idsEv = passe.map(function (ev) { return String(ev.id); });
          var rId = await supa.from("identifications").select("cible_id, photo_url").eq("type", "agenda").eq("statut", "accepte").in("cible_id", idsEv.slice(0, 200));
          var liens = ((rId && rId.data) || []).filter(function (l) { return String(l.photo_url || "").indexOf("post:") === 0; });
          if (vif && liens.length) {
            var idsPost = liens.map(function (l) { return String(l.photo_url).slice(5); })
              .filter(function (v, i, a) { return !!v && a.indexOf(v) === i; });
            var rPo = await supa.from("commentaires").select("*").in("id", idsPost.slice(0, 300));
            var parPost = {};
            ((rPo && rPo.data) || []).forEach(function (po) { parPost[String(po.id)] = po; });
            liens.forEach(function (l) {
              var po = parPost[String(l.photo_url).slice(5)];
              if (!po) return;
              if (po.prive && !(moi && po.user_id === moi.id)) return;
              var idEv2 = String(l.cible_id || "");
              if (!parEv[idEv2]) parEv[idEv2] = [];
              if (po.photo_url && parEv[idEv2].indexOf(po.photo_url) === -1) parEv[idEv2].push(po.photo_url);
              var sup2 = (Array.isArray(po.medias) && po.medias.length) ? po.medias : [];
              sup2.forEach(function (u) { if (u && parEv[idEv2].indexOf(u) === -1) parEv[idEv2].push(u); });
            });
          }
        } catch (eRat) { }
        if (!vif) return;
        setMediasEv(parEv);
        setPostsEv(parPost2);
      } catch (eMe) { }
    })();
    return function () { vif = false; };
  }, [passe]);

  /* 14/09 (148) - LES RESULTATS FFE DES JOURNEES D UN RENDEZ-VOUS. Demande de Blandine :
     « je voudrais qu on implemente le rapport entre les concours par exemple et les photos et
     resultats, on voulait remplir dans l agenda passe avec les photos videos et resultats ».
     ⚠️ LE LIEN EST LA DATE, PAS UNE CERTITUDE. Rien en base ne relie un resultat FFE a un
     rendez-vous : les resultats portent `date_epreuve`, les rendez-vous `date_jour` et
     `date_fin`. On remonte donc les resultats des cavalieres du club dont la date tombe dans
     les journees du rendez-vous, et on l ECRIT en clair : « resultats de ces journees », pas
     « les resultats de ce concours ». Une cavaliere qui a couru ailleurs le meme jour
     apparaitra - c est un faux positif ASSUME et VISIBLE, pas un mensonge cache.
     COLONNES RELEVEES DANS LE CODE (import FFE) : user_id, cheval_id, concours, epreuve,
     date_epreuve, place, partants, quart, cavalier, origine. Rien n est devine.
     Les cavalieres du club viennent de hypeCavaliersDuClub, le helper deja utilise ailleurs.
     UNE SEULE REQUETE POUR TOUT LE PASSE, pas une par carte. AUCUN SQL. */
  var _rp = React.useState({}); var resEv = _rp[0], setResEv = _rp[1];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !passe || !passe.length || !club) return;
        /* 16/09 (188) - CORRECTIF : `ecurie` et `ecurie2` MANQUAIENT dans les colonnes
           demandees. hypeCavaliersDuClub filtre PRECISEMENT sur ces deux champs
           (`if (!e1 && !e2) return;`) : sans elles ils arrivaient toujours vides, donc
           CHAQUE profil etait rejete et la liste revenait TOUJOURS vide.
           Meme famille que le `photo` / `photo_url` du build 183 : redefinir la liste
           de colonnes d un helper sans regarder ce dont IL a besoin pour travailler.
           La liste par defaut du helper les contient, justement pour ca. */
        var cavs = (typeof hypeCavaliersDuClub === "function") ? await hypeCavaliersDuClub(club, "id, pseudo, ecurie, ecurie2") : [];
        var ids = (cavs || []).map(function (cv) { return cv && cv.id; }).filter(Boolean);
        if (!ids.length) { if (vif) setResEv({}); return; }
        var bornes = passe.map(function (ev) { return String(ev.date_jour || ""); })
          .concat(passe.map(function (ev) { return String(ev.date_fin || ev.date_jour || ""); }))
          .filter(Boolean).sort();
        var r = await supa.from("resultats").select("user_id, cheval_id, concours, epreuve, date_epreuve, place, partants, cavalier, visible")
          .in("user_id", ids.slice(0, 200))
          .gte("date_epreuve", bornes[0])
          .lte("date_epreuve", bornes[bornes.length - 1])
          .limit(600);
        if (!vif || !r || r.error) return;
        /* 22/09 (344) - LA COCHE DE L IMPORT GOUVERNE AUSSI LES RENDEZ-VOUS. Blandine, capture de 11 h 09 :
           « il a pris tous les resultats au lieu de prendre que les sans-faute et les classements ». Les
           lignes DECOCHEES a la relecture (visible = false : eliminees, hors du premier quart sans
           sans-faute) sont en base, comme toujours, mais ne s affichent ni ne se comptent ici - regle de
           toujours : la coche gouverne TOUT a l affichage (listes et compteurs). */
        var lignes = ((r && r.data) || []).filter(function (li) { return li && li.visible !== false; });
        /* 18/09 (238) - LA RECOMPENSE D UN RESULTAT, EN UN SEUL ENDROIT. Ses regles, dans l ordre
   ou elle les a donnees :
   · 1er = trophee, 2e = argent, 3e = bronze, TOUJOURS ;
   · au-dela du 3e, une medaille SEULEMENT si le classement est dans le TOP 8 *ET* dans le
     PREMIER QUART des partants (« 4e sur 32 » oui, « 6e sur 12 » non) ;
   · un 1er sur 1 partant garde son trophee : « oui trophee », decide explicitement.
   ⚠️ Sans nombre de partants, on ne peut pas juger le quart : on ne montre alors une medaille
   que pour les trois premieres places. Aucune deduction, aucune invention.
   ⚠️ LES EMOJI SONT ECRITS EN ECHAPPEMENT JS DANS LE FICHIER, jamais en caracteres depuis un
   script d edition : c est ce qui a vide ce fichier quatre fois (builds 125, 142, 153, 189). */
function hypeRecompense(place, partants) {
  try {
    var p = Number(place || 0);
    if (!p || p < 1) return "";
    if (p === 1) return "\uD83C\uDFC6";
    if (p === 2) return "\uD83E\uDD48";
    if (p === 3) return "\uD83E\uDD49";
    var n = Number(partants || 0);
    if (!n) return "";
    if (p <= 8 && p <= Math.ceil(n / 4)) return "\uD83C\uDFC5";
    return "";
  } catch (e) { return ""; }
}

/* 18/09 (229) : LE NOM DU CHEVAL, resolu ICI et pas dans la page du rendez-vous. La
           table `resultats` ne porte que `cheval_id` ; sa maquette en fait l information la
           plus visible. Son instruction : « le nom du cheval sera ajoute dans le paquet en
           amont par l agenda ». UNE SEULE requete pour TOUS les rendez-vous d un coup - la
           page de detail, elle, ne requete toujours RIEN. Si la resolution echoue,
           `cheval_nom` reste vide et la ligne s affiche sans : jamais de nom invente. */
        try {
          var idsChv = [], vusChv = {};
          lignes.forEach(function (li) {
            var ic = (li && li.cheval_id) ? String(li.cheval_id) : "";
            if (ic && !vusChv[ic]) { vusChv[ic] = true; idsChv.push(li.cheval_id); }
          });
          if (idsChv.length) {
            var rChv = await supa.from("chevaux").select("id, nom").in("id", idsChv.slice(0, 300));
            if (vif && rChv && !rChv.error) {
              var nomParId = {};
              ((rChv && rChv.data) || []).forEach(function (cv) { if (cv && cv.id) nomParId[String(cv.id)] = cv.nom || ""; });
              lignes.forEach(function (li) { if (li && li.cheval_id) li.cheval_nom = nomParId[String(li.cheval_id)] || ""; });
            }
          }
        } catch (eNc) { }
        var parEv = {};
        (passe || []).forEach(function (ev) {
          var d1 = String(ev.date_jour || ""), d2 = String(ev.date_fin || ev.date_jour || "");
          var dedans = lignes.filter(function (li) {
            var d = String(li.date_epreuve || "");
            return d && d >= d1 && d <= d2;
          });
          if (dedans.length) parEv[String(ev.id)] = dedans;
        });
        setResEv(parEv);
      } catch (eRp) { }
    })();
    return function () { vif = false; };
  }, [passe, club]);

  function chargerPasse() {
    (async function () {
      try {
        var clef = (typeof clefClubG === "function") ? clefClubG(club) : String(club || "").toLowerCase().trim();
        if (!clef) { setPasse([]); return; }
        var r = await chargerAgendaClubPasse(clef);
        /* meme regle que pour le futur : l echec se DIT */
        if (r && r.error) { setErrPasse(String(r.error.message || r.error)); setPasse([]); return; }
        setErrPasse(""); setPasse((r && r.data) || []);
      } catch (eP2) { setErrPasse(String(eP2)); setPasse([]); }
    })();
  }

  function recharger() {
    (async function () {
      try {
        var clef = (typeof clefClubG === "function") ? clefClubG(club) : String(club || "").toLowerCase().trim();
        if (!clef) { setEvs([]); return; }
        var r = await chargerAgendaClub(clef);
        /* ⚠️ l echec se DIT, il ne s avale pas (lecon du .catch() vide du 01/09) */
        if (r && r.error) { setErr(String(r.error.message || r.error)); setEvs([]); return; }
        setErr("");
        setEvs((r && r.data) || []);
      } catch (eR) { setErr(String(eR)); setEvs([]); }
    })();
  }
  React.useEffect(function () { recharger(); }, [club]);

  var estProprio = false;
  /* 14/09 (142) - DEFAUT TROUVE : clubRevendiquePar etait appele SANS l utilisatrice.
     Sa signature est (nomEcurie, user) et elle compare l e-mail de `user` a celui de la
     proprietaire declaree du club ; sans second argument, l e-mail lu vaut "" et la
     fonction repond TOUJOURS non. Le bouton d ajout de cette page ne pouvait donc JAMAIS
     s afficher - constate sur sa capture du 14/09 a 14 h 20. L utilisatrice est desormais
     chargee ici, ce qui repare le droit ET permet de le passer au carrousel. */
  var _mA = React.useState(null); var moiA = _mA[0], setMoiA = _mA[1];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try { var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null; if (vif) setMoiA(u || null); } catch (eMa) { if (vif) setMoiA(null); }
    })();
    return function () { vif = false; };
  }, []);
  try { estProprio = (typeof clubRevendiquePar === "function") && clubRevendiquePar(club, moiA); } catch (eP) { }
  /* 12/10 (1054) : la poignee vers le bloc d ajout (AgendaClubHype) - ses cartes ouvrent la
     fiche du rendez-vous SUR PLACE, comme le faisait le carrousel. */
  var refPontAg = React.useRef(null);
  /* (1055) largeur de l ecran et filtre de la page Evenements passes (toujours appeles : meme ordre des hooks) */
  var l768P = useHypeLargeur(768), l1100P = useHypeLargeur(1100);
  var _fP = React.useState("tous"); var filtreP = _fP[0], setFiltreP = _fP[1];
  /* (1056) annee choisie et nombre de cartes montrees (12 par 12) */
  var _aP = React.useState("toutes"); var anneeP = _aP[0], setAnneeP = _aP[1];
  var _nP = React.useState(12); var nbVusP = _nP[0], setNbVusP = _nP[1];

  /* 04/10 (636) — FORFAITS : L AGENDA PRIVE DU GESTIONNAIRE. Demande de Blandine : « un agenda
     prive au gestionnaire de l ecurie qui permet de noter les cours par forfait pour les cartes
     de 10 h en les decomptant pour les cavaliers concernes » (Dominique Wirtschaffer et Yumiko :
     10 seances de 1 h 30 chacune). PREMIERE TRANCHE, volontairement simple et fonctionnelle :
     - visible SEULEMENT par la proprietaire du club (clubRevendiquePar) ou une gestionnaire
       designee (club_gestionnaires), comme la creation d un rendez-vous ; la base l impose
       aussi (RLS = hype_peut_gerer_club). Pour toute autre personne, RIEN ne change sur cette
       page : aucune requete, aucun bloc ;
     - tables forfaits (une carte : nom, 10 seances, 90 min, couleur) et forfait_seances (une
       seance = un jour, heure facultative). SQL livre a cote (SQL-636-forfaits.sql), a passer
       AVANT de pousser cet index ; sans lui, le bloc dit clairement que la table manque ;
     - le compteur n est PAS stocke : restantes = total - nombre de seances enregistrees. Une
       seance ajoutee decompte, une seance supprimee recredite, rien ne peut se desynchroniser ;
     - dans la grille du mois, chaque jour de seance porte un coin colore (couleur de la
       cavaliere, deux couleurs partagees en diagonale pour deux cavalieres, comme sa maquette) ;
       la pastille ronde des rendez-vous du club reste au centre, les deux cohabitent ;
     - pour la gestion, TOUS les jours se touchent : sous la grille, le jour touche montre ses
       seances (nom, horaire, duree, restantes, croix) et « Ajouter une seance » ;
     - les cartes des forfaits (couleur, nom, 9 / 10 seances, jauge) sous le calendrier, avec
       « Nouveau forfait » et une croix de suppression (confirmation, refus de la base affiche).
     Reste pour les tranches suivantes : lier une cavaliere a son profil (portrait), renouveler
     un forfait termine, modifier une seance, fiche du jour en volet, cases carrees. */
  var FORF_COULEURS = ["#3FA39A", "#AEBFD0", "#4E86B8", "#2F6F7E", "#7FA7C9", "#5BB5C9"];
  var rtlF = (lg === "ar");
  var clefF = (typeof clefClubG === "function") ? clefClubG(club) : String(club || "").toLowerCase().trim();
  var _gf = React.useState(false); var suisGestF = _gf[0], setSuisGestF = _gf[1];
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (estProprio || !clefF || !moiA || !moiA.id || typeof supa === "undefined" || !supa) { if (vif) setSuisGestF(false); return; }
        var r = await supa.from("club_gestionnaires").select("user_id").eq("club_clef", clefF).eq("user_id", moiA.id).limit(1);
        if (vif) setSuisGestF(!!(r && r.data && r.data.length));
      } catch (eGf) { if (vif) setSuisGestF(false); }
    })();
    return function () { vif = false; };
  }, [clefF, estProprio, moiA]);
  var peutForfaits = !!(estProprio || suisGestF);
  var _ff = React.useState(null); var forfaits = _ff[0], setForfaits = _ff[1];
  var _fs = React.useState([]); var seancesF = _fs[0], setSeancesF = _fs[1];
  var _fe = React.useState(""); var errF = _fe[0], setErrF = _fe[1];
  var _fb = React.useState(false); var busyF = _fb[0], setBusyF = _fb[1];
  var _fo = React.useState(false); var formF = _fo[0], setFormF = _fo[1];
  var _fn = React.useState({ nom: "", total: "10", duree: "90", cavalier_id: "" });   /* (645) cavalier_id : lien au profil choisi dans la liste */ var nouvF = _fn[0], setNouvF = _fn[1];
  var _fa = React.useState(null); var ajoutF = _fa[0], setAjoutF = _fa[1];   /* { forfait_id, heure } quand la ligne d ajout est ouverte */
  var refMontF = React.useRef(true);
  /* 04/10 (651) — ANTI-DOUBLON A L AJOUT D UNE SEANCE (brief de consolidation, priorite 1). Un double tap ou une
     requete lente pouvait creer deux fois la meme seance. Deux protections, sans SQL : (1) refVerrouF, verrou
     SYNCHRONE pose au tout debut de ajouterSeance et relache dans le finally — busyF grise le bouton mais un etat
     React n est pas applique assez vite pour un double tap ; (2) doublon = meme forfait + meme jour + meme heure
     (« HH:MM » normalisee, vide = vide), verifie d abord dans les seances deja chargees, puis par une relecture
     ciblee en base juste avant l insert (seance ajoutee depuis un autre appareil). Deux seances le meme jour a des
     heures differentes restent permises. Message « Cette seance est deja enregistree. » dans le volet. */
  var refVerrouF = React.useRef(false);
  function heureNormF(h) { var m = /^(\d{1,2}):(\d{2})/.exec(String(h || "").trim()); return m ? (String(m[1]).padStart(2, "0") + ":" + m[2]) : ""; }
  function seanceIdentique(idF, iso, heure, saufId) {
    var hN = heureNormF(heure);
    return (seancesF || []).filter(function (sx) { return sx && sx.forfait_id === idF && String(sx.date_jour || "").slice(0, 10) === iso && heureNormF(sx.heure) === hN && (!saufId || sx.id !== saufId); })[0] || null;
  }
  /* 04/10 (652) — REFUS EXPLICITE SUR FORFAIT CLOS (brief, priorite 2) : les fonctions metier refusent d elles-memes
     un forfait clos === true, sans se reposer sur « restantes = 0 ». Teste juste apres avoir retrouve le forfait,
     avant le compteur, le doublon et toute requete. Message dans le volet. */
  var TXT_CLOS_F = T("Ce forfait est cl\u00f4tur\u00e9. Renouvelez-le pour ajouter une nouvelle s\u00e9ance.", "This package is closed. Renew it to add a new session.", "Este bono est\u00e1 cerrado. Renu\u00e9valo para a\u00f1adir una nueva sesi\u00f3n.", "Questo pacchetto \u00e8 chiuso. Rinnovalo per aggiungere una nuova lezione.", "\u3053\u306e\u56de\u6570\u5238\u306f\u7d42\u4e86\u3057\u3066\u3044\u307e\u3059\u3002\u65b0\u3057\u3044\u30ec\u30c3\u30b9\u30f3\u3092\u8ffd\u52a0\u3059\u308b\u306b\u306f\u66f4\u65b0\u3057\u3066\u304f\u3060\u3055\u3044\u3002", "Diese Karte ist abgeschlossen. Erneuere sie, um eine neue Einheit hinzuzuf\u00fcgen.", "\u0647\u0630\u0647 \u0627\u0644\u0628\u0627\u0642\u0629 \u0645\u063a\u0644\u0642\u0629. \u062c\u062f\u0651\u062f\u064a\u0647\u0627 \u0644\u0625\u0636\u0627\u0641\u0629 \u062d\u0635\u0629 \u062c\u062f\u064a\u062f\u0629.", "这张课时卡已结束。请续订后再添加新的课程。", "Deze lessenkaart is afgesloten. Vernieuw hem om een nieuwe les toe te voegen.", "Este pacote está encerrado. Renove-o para adicionar uma nova sessão.", "Det här klippkortet är avslutat. Förnya det för att lägga till ett nytt pass.", "Этот абонемент закрыт. Продли его, чтобы добавить новое занятие.", "Ten karnet jest zamknięty. Odnów go, aby dodać nową jazdę.", "이 회차권은 종료되었어요. 새 레슨을 추가하려면 갱신해 주세요.");
  var TXT_DOUBLON_F = T("Cette s\u00e9ance est d\u00e9j\u00e0 enregistr\u00e9e.", "This session is already recorded.", "Esta sesi\u00f3n ya est\u00e1 registrada.", "Questa lezione \u00e8 gi\u00e0 registrata.", "\u3053\u306e\u30ec\u30c3\u30b9\u30f3\u306f\u3059\u3067\u306b\u767b\u9332\u3055\u308c\u3066\u3044\u307e\u3059\u3002", "Diese Einheit ist bereits eingetragen.", "\u0647\u0630\u0647 \u0627\u0644\u062d\u0635\u0629 \u0645\u0633\u062c\u0644\u0629 \u0628\u0627\u0644\u0641\u0639\u0644.", "这节课已经记录过了。", "Deze les is al geregistreerd.", "Esta sessão já está registrada.", "Det här passet är redan registrerat.", "Это занятие уже записано.", "Ta jazda jest już zapisana.", "이 레슨은 이미 등록되어 있어요.");
  React.useEffect(function () { refMontF.current = true; return function () { refMontF.current = false; }; }, []);
  /* 04/10 (639) — PORTRAITS (forfaits, tranche 2, sa maquette) : le portrait de la cavaliere a cote de son
     nom, sur les cartes et dans les lignes du jour. SANS lien a renseigner ni SQL : les cavalieres de
     l ecurie (hypeCavaliersDuClub, deja utilise partout) sont lues UNE fois, et un forfait prend le
     portrait du profil dont le pseudo correspond a son nom (meme nom, accents et majuscules ignores ;
     sinon meme prenom, si une seule cavaliere le porte). Pas de correspondance, ou pas de photo : un
     rond a son initiale. Le rond porte toujours la couleur du forfait en anneau. Deux requetes de plus,
     pour la gestion seulement. */
  var _fp = React.useState(null); var profilsF = _fp[0], setProfilsF = _fp[1];
  React.useEffect(function () {
    var vif = true;
    if (!peutForfaits || !club) return;
    (async function () {
      try {
        var l = (typeof hypeCavaliersDuClub === "function") ? await hypeCavaliersDuClub(club, "id, pseudo, avatar_url") : [];
        if (vif) setProfilsF(Array.isArray(l) ? l : []);
      } catch (ePf) { if (vif) setProfilsF([]); }
    })();
    return function () { vif = false; };
  }, [peutForfaits, club]);
  function normNomF(s) { try { return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); } catch (eN) { return String(s || "").toLowerCase().trim(); } }
  function profilDeForfait(f) {
    if (!profilsF || !profilsF.length) return null;
    if (f && f.cavalier_id) { var lie = profilsF.filter(function (p) { return String(p.id) === String(f.cavalier_id); })[0]; if (lie) return lie; }   /* (645) */
    var nom = normNomF(f && f.cavalier_nom); if (!nom) return null;
    var exact = profilsF.filter(function (p) { return normNomF(p.pseudo) === nom; });
    if (exact.length === 1) return exact[0];
    var prenom = nom.split(" ")[0];
    if (prenom.length >= 3) { var parPrenom = profilsF.filter(function (p) { var ps = normNomF(p.pseudo); return ps === prenom || ps.split(" ")[0] === prenom; }); if (parPrenom.length === 1) return parPrenom[0]; }
    return null;
  }
  function portraitF(f, taille) {
    var pr = profilDeForfait(f), coul = (f && f.couleur) || FORF_COULEURS[0];
    var base = { width: taille, height: taille, borderRadius: "50%", flex: "0 0 auto", boxSizing: "border-box", border: "2px solid " + coul };
    if (pr && pr.avatar_url) return h("img", { className: "forf-portrait", src: (typeof vignetteHype === "function") ? vignetteHype(pr.avatar_url, 96, 96) : pr.avatar_url, alt: "", loading: "lazy", decoding: "async", style: Object.assign({}, base, { objectFit: "cover", display: "block", background: "rgba(255,255,255,0.04)" }) });
    var ini = String((f && f.cavalier_nom) || "?").trim().charAt(0).toUpperCase() || "?";
    return h("div", { className: "forf-initiale", style: Object.assign({}, base, { display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", color: coul, fontFamily: C, fontSize: Math.round(taille * 0.42), fontWeight: 700, lineHeight: 1 }) }, ini);
  }

  function msgErrF(e) {
    var m = String((e && e.message) || e || "");
    if (/does not exist|schema cache|PGRST205|42P01/i.test(m)) return T("La table des forfaits n’existe pas encore (SQL du build 636 à passer).", "The packages table does not exist yet (run the build 636 SQL).", "La tabla de bonos aún no existe (ejecutar el SQL del build 636).", "La tabella dei pacchetti non esiste ancora (eseguire l’SQL del build 636).", "回数券のテーブルがまだありません（ビルド636のSQLを実行）。", "Die Karten-Tabelle existiert noch nicht (SQL von Build 636 ausführen).", "جدول الباقات غير موجود بعد (يجب تنفيذ SQL الإصدار 636).", "课时卡数据表还不存在（需要执行第 636 版的 SQL）。", "De tabel met lessenkaarten bestaat nog niet (de SQL van build 636 moet nog worden uitgevoerd).", "A tabela de pacotes ainda não existe (é preciso rodar o SQL da build 636).", "Tabellen för klippkort finns inte ännu (SQL:en för build 636 måste köras).", "Таблицы абонементов ещё нет (нужно выполнить SQL сборки 636).", "Tabela karnetów jeszcze nie istnieje (trzeba uruchomić SQL z buildu 636).", "회차권 테이블이 아직 없어요(빌드 636의 SQL을 실행해야 해요).");
    return T("Impossible : ", "Not possible: ", "Imposible: ", "Impossibile: ", "できません：", "Nicht möglich: ", "غير ممكن: ", "无法操作：", "Niet mogelijk: ", "Não é possível: ", "Det går inte: ", "Невозможно: ", "Niemożliwe: ", "할 수 없어요: ") + m;
  }
  async function lireForfaits() {
    try {
      if (typeof supa === "undefined" || !supa || !clefF) return;
      /* (640) les forfaits RANGES (clos) sont lus aussi : leurs seances restent dans le calendrier et les lignes du jour ; seules les cartes sont limitees aux forfaits actifs (forfaitsActifs). */
      var r1 = await supa.from("forfaits").select("*").eq("club_clef", clefF).order("cree_le", { ascending: true }).limit(100);
      if (!refMontF.current) return;
      if (r1 && r1.error) { setErrF(msgErrF(r1.error)); setForfaits([]); setSeancesF([]); return; }
      var lf = (r1 && r1.data) || [];
      var ids = lf.map(function (f) { return f.id; });
      var ls = [];
      if (ids.length) {
        var r2 = await supa.from("forfait_seances").select("*").in("forfait_id", ids).order("date_jour", { ascending: true }).limit(2000);
        if (!refMontF.current) return;
        if (r2 && r2.error) { setErrF(msgErrF(r2.error)); setForfaits(lf); setSeancesF([]); return; }
        ls = (r2 && r2.data) || [];
      }
      setErrF(""); setForfaits(lf); setSeancesF(ls);
    } catch (eLf) { if (refMontF.current) { setErrF(msgErrF(eLf)); setForfaits([]); setSeancesF([]); } }
  }
  React.useEffect(function () { if (peutForfaits) lireForfaits(); }, [peutForfaits, clefF]);

  var forfaitsActifs = (forfaits || []).filter(function (f) { return !f.clos; });   /* (640) */
  function nbSeancesDe(idF) { var n = 0; (seancesF || []).forEach(function (s) { if (s.forfait_id === idF) n++; }); return n; }
  function restantesDe(f) { return Math.max(0, (Number(f.seances_total) || 0) - nbSeancesDe(f.id)); }
  function forfaitDe(idF) { for (var i = 0; i < (forfaits || []).length; i++) if (forfaits[i].id === idF) return forfaits[i]; return null; }
  function seancesDuJour(iso) {
    var l = (seancesF || []).filter(function (s) { return String(s.date_jour || "").slice(0, 10) === iso; });
    l.sort(function (a, b) { return String(a.heure || "99").localeCompare(String(b.heure || "99")) || String(a.cree_le || "").localeCompare(String(b.cree_le || "")); });
    return l.map(function (s) { return { s: s, f: forfaitDe(s.forfait_id) }; }).filter(function (x) { return !!x.f; });
  }
  function couleursDuJour(iso) { var c = []; seancesDuJour(iso).forEach(function (x) { var k = x.f.couleur || FORF_COULEURS[0]; if (c.indexOf(k) === -1) c.push(k); }); return c; }
  function dureeTxtF(min) {
    var m = Number(min) || 0, hh = Math.floor(m / 60), mm = m % 60;
    if (lg === "ja") return (hh ? hh + "時間" : "") + (mm ? mm + "分" : "");
    if (lg === "zh") return (hh ? hh + "小时" : "") + (mm ? mm + "分钟" : "");
    if (lg === "nl") return !hh ? mm + " min" : hh + " u" + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
    if (lg === "pt") return !hh ? mm + " min" : hh + " h" + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
    if (lg === "sv") return !hh ? mm + " min" : hh + " h" + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
    if (lg === "ru") return !hh ? mm + " \u043c\u0438\u043d" : hh + " \u0447" + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
    if (lg === "pl") return !hh ? mm + " min" : hh + " godz." + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
    if (lg === "ko") return !hh ? mm + "\ubd84" : hh + "\uc2dc\uac04" + (mm ? " " + mm + "\ubd84" : "");
    if (lg === "ar") return (hh ? hh + " س" : "") + (hh && mm ? " " : "") + (mm ? mm + " د" : "");
    if (!hh) return mm + " min";
    return hh + " h" + (mm ? " " + (mm < 10 ? "0" + mm : mm) : "");
  }
  function plageTxtF(heure, min) {
    var m = /^(\d{1,2}):(\d{2})/.exec(String(heure || ""));
    if (!m) return "";
    var deb = Number(m[1]) * 60 + Number(m[2]), fin = deb + (Number(min) || 0);
    var f2 = function (t) { t = ((t % 1440) + 1440) % 1440; return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0"); };
    return f2(deb) + " – " + f2(fin);
  }
  var LOCF = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" };
  var txtRefusF = T("Rien n’a été supprimé (refus de la base).", "Nothing was deleted (refused by the database).", "No se eliminó nada (rechazado por la base).", "Niente è stato eliminato (rifiuto del database).", "何も削除されませんでした（データベースが拒否）。", "Nichts gelöscht (von der Datenbank abgelehnt).", "لم يُحذف شيء (رفضت قاعدة البيانات).", "没有删除任何内容（被数据库拒绝）。", "Er is niets verwijderd (geweigerd door de database).", "Nada foi excluído (recusado pelo banco de dados).", "Inget raderades (nekades av databasen).", "Ничего не было удалено (база данных отказала).", "Nic nie zostało usunięte (odmowa bazy).", "삭제된 것이 없어요(데이터베이스가 거부했어요).");
  var txtRienF = T("La base n’a rien renvoyé.", "The database returned nothing.", "La base no devolvió nada.", "Il database non ha restituito nulla.", "データベースから応答がありません。", "Die Datenbank hat nichts zurückgegeben.", "لم تُرجع قاعدة البيانات شيئًا.", "数据库没有返回任何内容。", "De database heeft niets teruggegeven.", "O banco de dados não retornou nada.", "Databasen returnerade ingenting.", "База данных ничего не вернула.", "Baza nic nie zwróciła.", "데이터베이스에서 아무것도 돌아오지 않았어요.");
  async function creerForfait() {
    var nom = String(nouvF.nom || "").trim();
    var total = parseInt(nouvF.total, 10), duree = parseInt(nouvF.duree, 10);
    if (!nom) { setErrF(T("Il manque le nom.", "The name is missing.", "Falta el nombre.", "Manca il nome.", "名前がありません。", "Der Name fehlt.", "الاسم ناقص.", "请填写名字。", "De naam ontbreekt.", "Falta o nome.", "Namnet saknas.", "Не хватает имени.", "Brakuje nazwy.", "이름이 필요해요.")); return; }
    if (!(total >= 1 && total <= 100)) total = 10;
    if (!(duree >= 15 && duree <= 600)) duree = 90;
    var prises = forfaitsActifs.map(function (f) { return f.couleur; });
    var couleur = null;
    for (var i = 0; i < FORF_COULEURS.length; i++) if (prises.indexOf(FORF_COULEURS[i]) === -1) { couleur = FORF_COULEURS[i]; break; }
    if (!couleur) couleur = FORF_COULEURS[forfaitsActifs.length % FORF_COULEURS.length];
    setBusyF(true);
    try {
      var ligneF = { club_clef: clefF, cavalier_nom: nom.slice(0, 60), seances_total: total, duree_min: duree, couleur: couleur };
      if (nouvF.cavalier_id) ligneF.cavalier_id = nouvF.cavalier_id;   /* (645) */
      var r = await supa.from("forfaits").insert(ligneF).select("*");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      var ligne = (r && r.data && r.data[0]) || null;
      if (!ligne) { setErrF(txtRienF); return; }
      setErrF(""); setForfaits(function (l) { return (l || []).concat([ligne]); }); setNouvF({ nom: "", total: "10", duree: "90", cavalier_id: "" }); setFormF(false);
    } catch (eCf) { setErrF(msgErrF(eCf)); } finally { setBusyF(false); }
  }
  async function supprimerForfait(f) {
    var ok = true;
    try { if (window.confirm) ok = window.confirm(T("Supprimer le forfait de « " + f.cavalier_nom + " » et toutes ses séances ?", "Delete " + f.cavalier_nom + "’s package and all its sessions?", "¿Eliminar el bono de " + f.cavalier_nom + " y todas sus sesiones?", "Eliminare il pacchetto di " + f.cavalier_nom + " e tutte le sue lezioni?", f.cavalier_nom + "の回数券とすべてのレッスンを削除しますか？", "Die Karte von " + f.cavalier_nom + " und alle ihre Einheiten löschen?", "حذف باقة " + f.cavalier_nom + " وكل حصصها؟", "确定要删除“" + f.cavalier_nom + "”的课时卡及其所有课程吗？", "Het pakket van “" + f.cavalier_nom + "” en alle bijbehorende lessen verwijderen?", "Excluir o pacote de “" + f.cavalier_nom + "” e todas as suas aulas?", ("Ta bort klippkortet för ”" + f.cavalier_nom + "” och alla dess pass?"), ("Удалить абонемент «" + f.cavalier_nom + "» и все его занятия?"), ("Usunąć karnet: \u201e" + f.cavalier_nom + "\u201d i wszystkie jego jazdy?"), ("“" + f.cavalier_nom + "”의 회차권과 모든 레슨을 삭제할까요?"))); } catch (eC5) { }
    if (!ok) return;
    setBusyF(true);
    try {
      var r = await supa.from("forfaits").delete().eq("id", f.id).select("id");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      if (!(r && r.data && r.data.length)) { setErrF(txtRefusF); return; }
      setErrF(""); setForfaits(function (l) { return (l || []).filter(function (x) { return x.id !== f.id; }); }); setSeancesF(function (l) { return (l || []).filter(function (s) { return s.forfait_id !== f.id; }); });
    } catch (eSf) { setErrF(msgErrF(eSf)); } finally { setBusyF(false); }
  }
  /* 04/10 (640) — RENOUVELER UN FORFAIT TERMINE (forfaits, tranche 2) : une nouvelle carte identique (nom,
     nombre de seances, duree, couleur) est creee, et l ancienne est RANGEE (clos = true) — pas effacee :
     ses seances restent dans le calendrier et dans les lignes du jour (« 0 / 10 »). Si la nouvelle carte
     est creee mais que l ancienne ne peut pas etre rangee, on le dit, et les deux restent visibles. */
  async function renouvelerForfait(f) {
    var ok = true;
    try { if (window.confirm) ok = window.confirm(T("Renouveler le forfait de \u00ab " + f.cavalier_nom + " \u00bb ? Une nouvelle carte de " + f.seances_total + " s\u00e9ances est cr\u00e9\u00e9e, l\u2019ancienne est rang\u00e9e.", "Renew " + f.cavalier_nom + "\u2019s package? A new card of " + f.seances_total + " sessions is created and the old one is archived.", "\u00bfRenovar el bono de " + f.cavalier_nom + "? Se crea una nueva tarjeta de " + f.seances_total + " sesiones y la anterior se archiva.", "Rinnovare il pacchetto di " + f.cavalier_nom + "? Viene creato un nuovo pacchetto di " + f.seances_total + " lezioni e il vecchio viene archiviato.", f.cavalier_nom + "\u306e\u56de\u6570\u5238\u3092\u66f4\u65b0\u3057\u307e\u3059\u304b\uff1f" + f.seances_total + "\u56de\u306e\u65b0\u3057\u3044\u56de\u6570\u5238\u3092\u4f5c\u6210\u3057\u3001\u53e4\u3044\u3082\u306e\u306f\u4fdd\u7ba1\u3055\u308c\u307e\u3059\u3002", "Die Karte von " + f.cavalier_nom + " erneuern? Eine neue Karte mit " + f.seances_total + " Einheiten wird angelegt, die alte wird abgelegt.", "\u062a\u062c\u062f\u064a\u062f \u0628\u0627\u0642\u0629 " + f.cavalier_nom + "\u061f \u0633\u062a\u064f\u0646\u0634\u0623 \u0628\u0627\u0642\u0629 \u062c\u062f\u064a\u062f\u0629 \u0645\u0646 " + f.seances_total + " \u062d\u0635\u0635 \u0648\u062a\u064f\u062d\u0641\u0638 \u0627\u0644\u0642\u062f\u064a\u0645\u0629.", "要续订“" + f.cavalier_nom + "”的课时卡吗？将新建一张" + f.seances_total + "节课的卡，旧卡会被归档。", "Het pakket van “" + f.cavalier_nom + "” verlengen? Er wordt een nieuwe kaart van " + f.seances_total + " lessen aangemaakt, de oude wordt gearchiveerd.", "Renovar o pacote de “" + f.cavalier_nom + "”? Um novo cartão de " + f.seances_total + " aulas é criado e o antigo é arquivado.", ("Förnya klippkortet för ”" + f.cavalier_nom + "”? Ett nytt kort med " + f.seances_total + " pass skapas och det gamla läggs i arkivet."), ("Продлить абонемент «" + f.cavalier_nom + "»? Будет создана новая карта на " + f.seances_total + " занятий, старая уйдёт в архив."), ("Odnowić karnet: \u201e" + f.cavalier_nom + "\u201d? Powstanie nowa karta na " + f.seances_total + " jazd, a stara trafi do archiwum."), ("“" + f.cavalier_nom + "”의 회차권을 갱신할까요? " + f.seances_total + "회 새 카드가 만들어지고, 이전 카드는 보관돼요."))); } catch (eC7) { }
    if (!ok) return;
    setBusyF(true);
    try {
      var ligneR = { club_clef: clefF, cavalier_nom: f.cavalier_nom, seances_total: Number(f.seances_total) || 10, duree_min: Number(f.duree_min) || 90, couleur: f.couleur || FORF_COULEURS[0] };
      if (f.cavalier_id) ligneR.cavalier_id = f.cavalier_id;   /* (645) le renouvellement garde le lien au profil */
      var r = await supa.from("forfaits").insert(ligneR).select("*");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      var ligne = (r && r.data && r.data[0]) || null;
      if (!ligne) { setErrF(txtRienF); return; }
      var r2 = await supa.from("forfaits").update({ clos: true }).eq("id", f.id).select("id");
      var rangee = !!(r2 && !r2.error && r2.data && r2.data.length);
      setForfaits(function (l) { return (l || []).map(function (x) { return (rangee && x.id === f.id) ? Object.assign({}, x, { clos: true }) : x; }).concat([ligne]); });
      if (!rangee) setErrF(T("Nouvelle carte cr\u00e9\u00e9e, mais l\u2019ancienne n\u2019a pas pu \u00eatre rang\u00e9e : ", "New card created, but the old one could not be archived: ", "Tarjeta nueva creada, pero la anterior no se pudo archivar: ", "Nuovo pacchetto creato, ma il vecchio non \u00e8 stato archiviato: ", "\u65b0\u3057\u3044\u56de\u6570\u5238\u3092\u4f5c\u6210\u3057\u307e\u3057\u305f\u304c\u3001\u53e4\u3044\u3082\u306e\u3092\u4fdd\u7ba1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\uff1a", "Neue Karte angelegt, aber die alte konnte nicht abgelegt werden: ", "\u0623\u064f\u0646\u0634\u0626\u062a \u0628\u0627\u0642\u0629 \u062c\u062f\u064a\u062f\u0629\u060c \u0644\u0643\u0646 \u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0642\u062f\u064a\u0645\u0629: ", "新卡已创建，但旧卡无法归档：", "Nieuwe kaart gemaakt, maar de oude kon niet worden gearchiveerd: ", "Novo cartão criado, mas não foi possível arquivar o antigo: ", "Det nya kortet skapades, men det gamla kunde inte arkiveras: ", "Новая карта создана, но старую не удалось убрать в архив: ", "Nowa karta została utworzona, ale starej nie udało się zarchiwizować: ", "새 카드는 만들어졌지만 이전 카드를 보관하지 못했어요: ") + String((r2 && r2.error && r2.error.message) || txtRefusF));
      else setErrF("");
    } catch (eRf) { setErrF(msgErrF(eRf)); } finally { setBusyF(false); }
  }
  /* 04/10 (641) — MODIFIER UNE SEANCE (forfaits, tranche 2) : toucher une ligne du jour ouvre, a sa place,
     le choix de la cavaliere (forfaits actifs avec des seances restantes, plus celui de la seance) et l heure ;
     Enregistrer = update forfait_seances (forfait_id, heure) avec .select("id") — refus ou zero ligne = dit.
     Le jour ne change pas (supprimer puis recreer pour ca). Changer de cavaliere deplace le decompte : l une
     recredite, l autre decompte, automatiquement puisque rien n est stocke. */
  /* 04/10 (653) — CORRIGER LA CAVALIERE LIEE (cavalier_id) ET LE NOM D UN FORFAIT EXISTANT (brief, priorite 3).
     Toucher une carte ouvre, dans la carte, « Modifier le forfait » : la liste des cavalieres de l ecurie (ou
     « aucun lien, nom libre ») et le nom. Enregistrer = update forfaits (cavalier_id, cavalier_nom) avec
     .select("id") — refus ou zero ligne = dit. Les seances ne portent que forfait_id : l historique et les
     compteurs ne bougent pas. Couleur, nombre de seances et duree ne changent pas ici. */
  var _ef = React.useState(null); var editF = _ef[0], setEditF = _ef[1];   /* { id, cavalier_id, nom } */
  async function modifierForfait() {
    if (!editF) return;
    var f0 = forfaitDe(editF.id); if (!f0) { setEditF(null); return; }
    var nomM = String(editF.nom || "").trim();
    if (!nomM) { setErrF(T("Il manque le nom.", "The name is missing.", "Falta el nombre.", "Manca il nome.", "\u540d\u524d\u304c\u3042\u308a\u307e\u305b\u3093\u3002", "Der Name fehlt.", "\u0627\u0644\u0627\u0633\u0645 \u0646\u0627\u0642\u0635.", "请填写名字。", "De naam ontbreekt.", "Falta o nome.", "Namnet saknas.", "Не хватает имени.", "Brakuje nazwy.", "이름이 필요해요.")); return; }
    var champsM = { cavalier_id: editF.cavalier_id ? editF.cavalier_id : null, cavalier_nom: nomM.slice(0, 60) };
    setBusyF(true);
    try {
      var r = await supa.from("forfaits").update(champsM).eq("id", f0.id).select("id");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      if (!(r && r.data && r.data.length)) { setErrF(T("Rien n\u2019a \u00e9t\u00e9 modifi\u00e9 (refus de la base).", "Nothing was changed (refused by the database).", "No se modific\u00f3 nada (rechazado por la base).", "Niente \u00e8 stato modificato (rifiuto del database).", "\u4f55\u3082\u5909\u66f4\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f\uff08\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u304c\u62d2\u5426\uff09\u3002", "Nichts ge\u00e4ndert (von der Datenbank abgelehnt).", "\u0644\u0645 \u064a\u064f\u0639\u062f\u0651\u064e\u0644 \u0634\u064a\u0621 (\u0631\u0641\u0636\u062a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a).", "没有做任何修改（被数据库拒绝）。", "Er is niets gewijzigd (geweigerd door de database).", "Nada foi alterado (recusado pelo banco de dados).", "Inget ändrades (nekades av databasen).", "Ничего не было изменено (база данных отказала).", "Nic nie zostało zmienione (odmowa bazy).", "변경된 것이 없어요(데이터베이스가 거부했어요).")); return; }
      setErrF(""); setForfaits(function (l) { return (l || []).map(function (x) { return x.id === f0.id ? Object.assign({}, x, champsM) : x; }); }); setEditF(null);
    } catch (eMf) { setErrF(msgErrF(eMf)); } finally { setBusyF(false); }
  }
  var _es = React.useState(null); var editS = _es[0], setEditS = _es[1];   /* { id, forfait_id, heure } */
  async function modifierSeance() {
    if (!editS) return;
    var s0 = (seancesF || []).filter(function (sx) { return sx.id === editS.id; })[0];
    if (!s0) { setEditS(null); return; }
    var f = forfaitDe(editS.forfait_id);
    if (!f) { setErrF(T("Choisis la cavali\u00e8re ou le cavalier.", "Choose the rider.", "Elige el jinete.", "Scegli il cavaliere.", "\u9a0e\u624b\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002", "Bitte Reiterin / Reiter w\u00e4hlen.", "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u0641\u0627\u0631\u0633.", "请选择骑手。", "Kies de ruiter.", "Escolha a amazona ou o cavaleiro.", "Välj ryttare.", "Выбери всадницу или всадника.", "Wybierz amazonkę lub jeźdźca.", "기수를 선택해 주세요.")); return; }
    var fOrig = forfaitDe(s0.forfait_id);   /* (652) */
    if (f.clos === true || (fOrig && fOrig.clos === true)) { setErrF(TXT_CLOS_F); return; }   /* (652) cible ou origine close : refus, aucune requete */
    if (f.id !== s0.forfait_id && restantesDe(f) <= 0) { setErrF(T("Plus de s\u00e9ance disponible sur ce forfait.", "No sessions left on this package.", "No quedan sesiones en este bono.", "Nessuna lezione rimasta su questo pacchetto.", "\u3053\u306e\u56de\u6570\u5238\u306f\u6b8b\u308a\u304c\u3042\u308a\u307e\u305b\u3093\u3002", "Keine Einheiten mehr auf dieser Karte.", "\u0644\u0645 \u062a\u0628\u0642\u064e \u062d\u0635\u0635 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0628\u0627\u0642\u0629.", "这张课时卡已没有可用课程。", "Geen les meer beschikbaar op deze lessenkaart.", "Não há mais sessões disponíveis neste pacote.", "Inga pass kvar på det här klippkortet.", "На этом абонементе больше нет занятий.", "Brak wolnych jazd w tym karnecie.", "이 회차권에는 남은 레슨이 없어요.")); return; }
    var heure = String(editS.heure || "").trim(); if (!/^\d{1,2}:\d{2}/.test(heure)) heure = "";
    var champs = { forfait_id: f.id, heure: heure ? heureNormF(heure) : null };
    /* 04/10 (649) — CHANGER LE JOUR D UNE SEANCE (dernier point des forfaits) : le jour fait partie de la modification.
       Un jour invalide = on garde l ancien. La seance deplacee quitte le volet du jour ouvert et apparait sur
       sa nouvelle case ; le decompte ne bouge pas (meme forfait). */
    var jourE = String(editS.date_jour || "").slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(jourE) && jourE !== String(s0.date_jour || "").slice(0, 10)) champs.date_jour = jourE;
    if (seanceIdentique(f.id, champs.date_jour || String(s0.date_jour || "").slice(0, 10), champs.heure || "", s0.id)) { setErrF(TXT_DOUBLON_F); return; }   /* (651) */
    setBusyF(true);
    try {
      var r = await supa.from("forfait_seances").update(champs).eq("id", s0.id).select("id");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      if (!(r && r.data && r.data.length)) { setErrF(T("Rien n\u2019a \u00e9t\u00e9 modifi\u00e9 (refus de la base).", "Nothing was changed (refused by the database).", "No se modific\u00f3 nada (rechazado por la base).", "Niente \u00e8 stato modificato (rifiuto del database).", "\u4f55\u3082\u5909\u66f4\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f\uff08\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u304c\u62d2\u5426\uff09\u3002", "Nichts ge\u00e4ndert (von der Datenbank abgelehnt).", "\u0644\u0645 \u064a\u064f\u0639\u062f\u0651\u064e\u0644 \u0634\u064a\u0621 (\u0631\u0641\u0636\u062a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a).", "没有做任何修改（被数据库拒绝）。", "Er is niets gewijzigd (geweigerd door de database).", "Nada foi alterado (recusado pelo banco de dados).", "Inget ändrades (nekades av databasen).", "Ничего не было изменено (база данных отказала).", "Nic nie zostało zmienione (odmowa bazy).", "변경된 것이 없어요(데이터베이스가 거부했어요).")); return; }
      setErrF(""); setSeancesF(function (l) { return (l || []).map(function (sx) { return sx.id === s0.id ? Object.assign({}, sx, champs) : sx; }); }); setEditS(null);
    } catch (eMs) { setErrF(msgErrF(eMs)); } finally { setBusyF(false); }
  }
  async function ajouterSeance(iso) {
    if (refVerrouF.current) return;   /* (651) double tap : le second passage s arrete ici */
    refVerrouF.current = true;
    try {
    var f = (ajoutF && ajoutF.forfait_id) ? forfaitDe(ajoutF.forfait_id) : null;
    if (!f) { setErrF(T("Choisis la cavalière ou le cavalier.", "Choose the rider.", "Elige el jinete.", "Scegli il cavaliere.", "騎手を選んでください。", "Bitte Reiterin / Reiter wählen.", "اختاري الفارس.", "请选择骑手。", "Kies de ruiter.", "Escolha a amazona ou o cavaleiro.", "Välj ryttare.", "Выбери всадницу или всадника.", "Wybierz amazonkę lub jeźdźca.", "기수를 선택해 주세요.")); return; }
    if (f.clos === true) { setErrF(TXT_CLOS_F); return; }   /* (652) forfait clos : refus, aucune requete */
    if (restantesDe(f) <= 0) { setErrF(T("Plus de séance disponible sur ce forfait.", "No sessions left on this package.", "No quedan sesiones en este bono.", "Nessuna lezione rimasta su questo pacchetto.", "この回数券は残りがありません。", "Keine Einheiten mehr auf dieser Karte.", "لم تبقَ حصص في هذه الباقة.", "这张课时卡已没有可用课程。", "Geen les meer beschikbaar op deze lessenkaart.", "Não há mais sessões disponíveis neste pacote.", "Inga pass kvar på det här klippkortet.", "На этом абонементе больше нет занятий.", "Brak wolnych jazd w tym karnecie.", "이 회차권에는 남은 레슨이 없어요.")); return; }
    var heure = String((ajoutF && ajoutF.heure) || "").trim(); if (!/^\d{1,2}:\d{2}/.test(heure)) heure = "";
    var heureN = heure ? heureNormF(heure) : "";
    if (seanceIdentique(f.id, iso, heureN, null)) { setErrF(TXT_DOUBLON_F); return; }   /* (651) deja dans les seances chargees */
    setBusyF(true);
    try {
      /* (651) relecture ciblee juste avant d ecrire : une seance identique posee depuis un autre appareil */
      var qD = supa.from("forfait_seances").select("*").eq("forfait_id", f.id).eq("date_jour", iso);
      qD = heureN ? qD.eq("heure", heureN) : qD.is("heure", null);
      var rD = await qD.limit(1);
      if (rD && !rD.error && rD.data && rD.data.length) {
        var dejaLa = rD.data[0];
        setSeancesF(function (l) { return (l || []).some(function (sx) { return sx.id === dejaLa.id; }) ? l : (l || []).concat([dejaLa]); });
        setErrF(TXT_DOUBLON_F); return;
      }
      var r = await supa.from("forfait_seances").insert({ forfait_id: f.id, date_jour: iso, heure: heureN || null }).select("*");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      var ligne = (r && r.data && r.data[0]) || null;
      if (!ligne) { setErrF(txtRienF); return; }
      setErrF(""); setSeancesF(function (l) { return (l || []).concat([ligne]); }); setAjoutF(null);
    } catch (eAs) { setErrF(msgErrF(eAs)); } finally { setBusyF(false); }
    } finally { refVerrouF.current = false; }
  }
  async function supprimerSeance(s) {
    var ok = true;
    try { if (window.confirm) ok = window.confirm(T("Supprimer cette séance ?", "Delete this session?", "¿Eliminar esta sesión?", "Eliminare questa lezione?", "このレッスンを削除しますか？", "Diese Einheit löschen?", "حذف هذه الحصة؟", "删除这节课？", "Deze les verwijderen?", "Excluir esta sessão?", "Ta bort det här passet?", "Удалить это занятие?", "Usunąć tę jazdę?", "이 레슨을 삭제할까요?")); } catch (eC6) { }
    if (!ok) return;
    setBusyF(true);
    try {
      var r = await supa.from("forfait_seances").delete().eq("id", s.id).select("id");
      if (r && r.error) { setErrF(msgErrF(r.error)); return; }
      if (!(r && r.data && r.data.length)) { setErrF(txtRefusF); return; }
      setErrF(""); setSeancesF(function (l) { return (l || []).filter(function (x) { return x.id !== s.id; }); });
    } catch (eSs) { setErrF(msgErrF(eSs)); } finally { setBusyF(false); }
  }
  var STYLE_CHAMP_F = { width: "100%", boxSizing: "border-box", padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#F0F4F6", fontSize: 16, fontFamily: M, WebkitAppearance: "none", appearance: "none" };
  var BTN_OR_F = { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(217,199,163,0.5)", background: "rgba(217,199,163,0.14)", color: OR, fontSize: 14, fontWeight: 600, fontFamily: M, cursor: "pointer", minHeight: 44 };
  var BTN_GRIS_F = { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "#C9CFD4", fontSize: 14, fontFamily: M, cursor: "pointer", minHeight: 44 };
  var TXT_SEANCES_F = T("séances", "sessions", "sesiones", "lezioni", "回", "Einheiten", "حصص", "节课", "lessen", "sessões", "pass", "занятий", "jazd", "회");
  var TXT_SUPPR_F = T("Supprimer", "Delete", "Eliminar", "Elimina", "削除", "Löschen", "حذف", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제");
  var TXT_ANNULER_F = T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소");
  var META2 = {
    stage: { emoji: "\uD83C\uDF93", label: T("Stage", "Clinic", "Cursillo", "Stage", "\u8B1B\u7FD2", "Lehrgang", "\u062a\u062f\u0631\u064a\u0628", "训练营", "Clinic", "Estágio", "Kurs", "Сбор", "Warsztaty", "클리닉") },
    concours: { emoji: "\uD83C\uDFC6", label: T("Concours", "Show", "Concurso", "Concorso", "\u7AF6\u6280\u4F1A", "Turnier", "\u0645\u0633\u0627\u0628\u0642\u0629", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회") },
    sortie: { emoji: "\uD83C\uDF3F", label: T("Sortie", "Outing", "Salida", "Uscita", "\u5916\u51FA", "Ausflug", "\u062e\u0631\u062c\u0629", "外出活动", "Uitje", "Passeio", "Utflykt", "Выезд", "Wyjazd", "나들이") }
  };
  var MOIS2 = ({
    fr: ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"], ar: ["\u064a\u0646\u0627\u064a\u0631", "\u0641\u0628\u0631\u0627\u064a\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064a\u0644", "\u0645\u0627\u064a\u0648", "\u064a\u0648\u0646\u064a\u0648", "\u064a\u0648\u0644\u064a\u0648", "\u0623\u063a\u0633\u0637\u0633", "\u0633\u0628\u062a\u0645\u0628\u0631", "\u0623\u0643\u062a\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062f\u064a\u0633\u0645\u0628\u0631"], zh: ["一月", "二月", "3月", "四月", "5月", "6月", "七月", "8月", "九月", "十月", "十一月", "十二月"], nl: ["januari", "februari", "mrt", "april", "mei", "jun", "juli", "aug", "september", "oktober", "november", "december"], pt: ["janeiro", "fevereiro", "mar", "abril", "mai", "jun", "julho", "ago", "setembro", "outubro", "novembro", "dezembro"], sv: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "aug", "september", "oktober", "november", "december"], ru: ["январь", "февраль", "мар", "апрель", "мая", "июн", "июль", "авг", "сентябрь", "октябрь", "ноябрь", "декабрь"], pl: ["styczeń", "luty", "mar", "kwiecień", "maj", "cze", "lipiec", "sie", "wrzesień", "październik", "listopad", "grudzień"], ko: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
  })[lg] || ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var JOURS2 = ({
    fr: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    es: ["domingo", "lunes", "martes", "mi\u00e9rcoles", "jueves", "viernes", "s\u00e1bado"],
    it: ["domenica", "luned\u00ec", "marted\u00ec", "mercoled\u00ec", "gioved\u00ec", "venerd\u00ec", "sabato"], ar: ["\u0627\u0644\u0623\u062d\u062f", "\u0627\u0644\u0625\u062b\u0646\u064a\u0646", "\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062e\u0645\u064a\u0633", "\u0627\u0644\u062c\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062a"], zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], nl: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], pt: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], sv: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], ru: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"], pl: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"], ko: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
  })[lg] || null;

  function dateDe(iso) { try { return new Date(String(iso) + "T00:00:00"); } catch (eD) { return null; } }

  /* 14/09 (146) - LE CALENDRIER DU MOIS, PASSE COMPRIS. Demande de Blandine : « en dessous on
     pourrait avoir un calendrier avec les dates ou un evenement est prevu dans une couleur
     differente et quand on clique dessus ca ouvre evenement de la journee concernee », puis
     « calendrier montre passe aussi oui » et « pastille coloree ».
     COULEURS PAR TYPE, celles deja en place dans l app : concours en or, stage en turquoise,
     sortie en vert. Deux types le meme jour = pastille partagee en deux couleurs.
     LECTURE PAR MOIS VISITE : le calendrier ne peut marquer que ce qui est charge, et les deux
     lecteurs existants ne prennent que « a venir » et « passe » (50 chacun). Ce calendrier lit
     donc le mois affiche, et relit a chaque changement de mois. Une requete par mois visite,
     assumee : c est le prix pour que mars dernier soit marque.
     ⚠️ UN RENDEZ-VOUS DE PLUSIEURS JOURS MARQUE TOUS SES JOURS : la lecture prend les
     rendez-vous qui CHEVAUCHENT le mois (date_jour <= fin du mois ET date de fin >= debut du
     mois), et chaque jour entre le debut et la fin porte la pastille. Un stage du 30 septembre
     au 2 octobre est donc marque dans les deux mois.
     L echec de lecture se DIT. */
  /* 04/10 (648) — DEUX ONGLETS POUR LA GESTION : « Rendez-vous » (le club : carrousel, points, passe) et
     « Forfaits » (l agenda prive : coins colores, volet du jour, cartes). Blandine : « un onglet forfait et un
     onglet pour les autres evenements ». Les cavalieres n ont pas d onglet : l agenda du club, comme avant. */
  var _og = React.useState("rdv"); var ongletAg = _og[0], setOngletAg = _og[1];
  var modeForf = !!(peutForfaits && ongletAg === "forfaits");
  var _cm = React.useState(function () { var d = new Date(); return { an: d.getFullYear(), mois: d.getMonth() }; });
  var moisVu = _cm[0], setMoisVu = _cm[1];
  var _ce = React.useState(null); var evsMois = _ce[0], setEvsMois = _ce[1];
  var _cj = React.useState(""); var jourVu = _cj[0], setJourVu = _cj[1];
  var _cr = React.useState(""); var errMois = _cr[0], setErrMois = _cr[1];

  function isoDe(an, mois, jour) {
    return an + "-" + String(mois + 1).padStart(2, "0") + "-" + String(jour).padStart(2, "0");
  }

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) { if (vif) setEvsMois([]); return; }
        var clef = (typeof clefClubG === "function") ? clefClubG(club) : String(club || "").toLowerCase().trim();
        if (!clef) { if (vif) setEvsMois([]); return; }
        var deb = isoDe(moisVu.an, moisVu.mois, 1);
        var nb = new Date(moisVu.an, moisVu.mois + 1, 0).getDate();
        var fin = isoDe(moisVu.an, moisVu.mois, nb);
        var r = await supa.from("club_agenda").select("*").eq("club_clef", clef)
          .lte("date_jour", fin)
          .or("date_fin.gte." + deb + ",and(date_fin.is.null,date_jour.gte." + deb + ")")
          .order("date_jour", { ascending: true }).limit(120);
        if (!vif) return;
        if (r && r.error) { setErrMois(String((r.error && r.error.message) || r.error)); setEvsMois([]); return; }
        setErrMois(""); setEvsMois((r && r.data) || []);
      } catch (eCm) { if (vif) { setErrMois(String(eCm)); setEvsMois([]); } }
    })();
    return function () { vif = false; };
  }, [club, moisVu.an, moisVu.mois]);

  /* 04/10 (647) — Blandine : « fais les evenements d une autre couleur que celle des forfaits cavalier sinon on
     s y perd ! », puis « stage et CSO dans des couleurs differentes ». Les forfaits sont dans les bleus / petrole /
     bleu-gris ; le turquoise du stage et le vert de la sortie s y confondaient. Les rendez-vous du club passent
     dans des teintes CHAUDES et bien separees entre elles : concours or (inchange), stage corail rouge, sortie
     lilas. Points de la grille, legende, listes du jour et volet suivent (tous lisent COULT). Le carrousel du haut
     et le reste de l appli ne changent pas. */
  var COULT = { concours: "#C9A66B", stage: "#B9735E", sortie: "#9483BD" };   /* 12/10 (1057) teintes adoucies (brief Agenda : pas de couleurs fortes) - memes que les cartes du 1054 ; les forfaits gardent leurs couleurs */

  function typesDuJour(iso) {
    var t = [];
    (evsMois || []).forEach(function (ev) {
      var d1 = String(ev.date_jour || "");
      var d2 = String(ev.date_fin || ev.date_jour || "");
      if (iso >= d1 && iso <= d2) { var k = ev.type || "stage"; if (t.indexOf(k) === -1) t.push(k); }
    });
    return t;
  }

  var calendrier = (function () {
    var nb = new Date(moisVu.an, moisVu.mois + 1, 0).getDate();
    var premier = new Date(moisVu.an, moisVu.mois, 1).getDay();
    var decal = (premier + 6) % 7;               /* la semaine commence le lundi */
    var auj = new Date(); auj.setHours(0, 0, 0, 0);
    var isoAuj = isoDe(auj.getFullYear(), auj.getMonth(), auj.getDate());
    /* 12/10 (1057) - CALENDRIER RESTYLE (maquette de Blandine) : jours de la semaine en abrege
       (« Lun », « Mar »...), ecrits par le telephone dans la langue choisie ; numero centre ;
       jour choisi = contour champagne et fond un peu plus clair (pas de gros rond dore) ; petits
       points sobres sous le numero ; jours du mois d avant / d apres estompes (decor seulement,
       on ne les touche pas). FONCTIONNEMENT INCHANGE : memes gestes, memes donnees. */
    var locCal = ({ fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" })[lg] || "fr-FR";
    var initiales = [0, 1, 2, 3, 4, 5, 6].map(function (i) {
      var j = (i + 1) % 7;
      try {
        var t = new Date(2024, 0, 7 + j).toLocaleDateString(locCal, { weekday: "short" });   /* 07/01/2024 = un dimanche */
        t = String(t || "").replace(/\.$/, "");
        if (t) return t.charAt(0).toUpperCase() + t.slice(1);
      } catch (eWd) { }
      return JOURS2 ? JOURS2[j].slice(0, 3) : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i];
    });
    var cases = [];
    var nbAvant = new Date(moisVu.an, moisVu.mois, 0).getDate();
    for (var v = 0; v < decal; v++) cases.push(h("div", { key: "v" + v, "aria-hidden": "true", style: { height: 46, borderRadius: 9, border: "1px solid rgba(255,255,255,0.035)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: M, fontSize: 12.5, color: "rgba(237,242,245,0.18)" } }, String(nbAvant - decal + 1 + v)));
    for (var j = 1; j <= nb; j++) {
      (function (jour) {
        var iso = isoDe(moisVu.an, moisVu.mois, jour);
        var ts = modeForf ? [] : typesDuJour(iso);   /* (648) */
        var choisi = (jourVu === iso);
        var fond = "transparent";
        if (ts.length === 1) fond = COULT[ts[0]] || OR;
        else if (ts.length > 1) fond = "linear-gradient(135deg, " + (COULT[ts[0]] || OR) + " 50%, " + (COULT[ts[1]] || OR) + " 50%)";
        /* (636) les couleurs des forfaits ce jour-la (gestion seulement) : coin colore de la case,
           deux couleurs partagees en diagonale pour deux cavalieres. Tous les jours se touchent
           pour la gestion, pour pouvoir y ajouter une seance. */
        var fj = modeForf ? couleursDuJour(iso) : [];   /* (648) */
        var tap = !!(ts.length || fj.length || modeForf);
        /* 04/10 (646) — CASES CARREES (sa maquette du 19 h 17) : chaque jour est une case arrondie, le numero en
           haut a gauche (a droite en arabe), les rendez-vous du club en petits points de couleur en bas (un par
           type, memes couleurs qu avant : or / turquoise / vert), le coin colore des forfaits en bas a droite.
           Aujourd hui : cadre et numero or ; jour touche : cadre ivoire. Memes gestes qu avant. Le degrade
           « deux types » de la pastille ronde n a plus lieu d etre : deux points. */
        cases.push(h("div", {
          key: "j" + jour, role: tap ? "button" : null, "data-jour": iso,
          onClick: tap ? function () { setJourVu(choisi ? "" : iso); setAjoutF(null); setEditS(null); } : null,
          style: { position: "relative", height: 46, borderRadius: 9, boxSizing: "border-box", cursor: tap ? "pointer" : "default",
            background: choisi ? "rgba(243,238,228,0.07)" : "rgba(255,255,255,0.022)",
            border: choisi ? "1.5px solid #C9A66B" : (iso === isoAuj ? "1px solid rgba(201,166,107,0.45)" : "1px solid rgba(255,255,255,0.075)") }
        },
          h("span", { style: { position: "absolute", top: ts.length ? 12 : 16, insetInline: 0, textAlign: "center", fontFamily: M, fontSize: 13, lineHeight: 1,
            fontWeight: (ts.length || fj.length || choisi) ? 600 : 400,
            color: (iso === isoAuj && !choisi) ? "#D8BC86" : ((ts.length || fj.length || choisi) ? "#F3EEE4" : "rgba(237,242,245,0.72)") } }, String(jour)),
          ts.length ? h("span", { style: { position: "absolute", bottom: 8, insetInline: 0, display: "flex", justifyContent: "center", gap: 3, pointerEvents: "none" } },
            ts.slice(0, 3).map(function (k) { return h("span", { key: "pt" + k, style: { width: 5, height: 5, borderRadius: "50%", background: COULT[k] || OR } }); })) : null,
          fj.length ? h("span", { "data-forfait-jour": iso, style: { position: "absolute", bottom: 0, insetInlineEnd: 0, width: 16, height: 16, pointerEvents: "none",
            borderEndEndRadius: 8,
            clipPath: rtlF ? "polygon(0 0, 0 100%, 100% 100%)" : "polygon(100% 0, 100% 100%, 0 100%)",
            background: fj.length > 1 ? ("linear-gradient(" + (rtlF ? "135deg" : "45deg") + ", " + fj[0] + " 50%, " + fj[1] + " 50%)") : fj[0] } }) : null));
      })(j);
    }
    /* (1057) fin de la derniere semaine : jours du mois suivant, estompes */
    var apres = (7 - ((decal + nb) % 7)) % 7;
    for (var w = 1; w <= apres; w++) cases.push(h("div", { key: "w" + w, "aria-hidden": "true", style: { height: 46, borderRadius: 9, border: "1px solid rgba(255,255,255,0.035)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: M, fontSize: 12.5, color: "rgba(237,242,245,0.18)" } }, String(w)));
    function glisser(pas) {
      var m = moisVu.mois + pas, a = moisVu.an;
      if (m < 0) { m = 11; a -= 1; } else if (m > 11) { m = 0; a += 1; }
      setJourVu(""); setMoisVu({ an: a, mois: m });
    }
    var evsJour = jourVu ? (evsMois || []).filter(function (ev) {
      var d1 = String(ev.date_jour || ""), d2 = String(ev.date_fin || ev.date_jour || "");
      return jourVu >= d1 && jourVu <= d2;
    }) : [];
    var boutonMois = { width: 38, height: 38, borderRadius: "50%", background: "transparent", border: "1px solid rgba(243,238,228,0.28)", color: "#F3EEE4", fontSize: 17, lineHeight: 1, cursor: "pointer", flex: "none", padding: 0 };
    return h("div", { style: { padding: "18px 22px 0" } }, h("div", { "data-agenda-calendrier": "1", style: { padding: "16px 12px 14px", borderRadius: 16, border: "1px solid rgba(201,166,107,0.22)", background: "rgba(8,11,14,0.6)" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
        h("button", { onClick: function () { glisser(-1); }, "aria-label": T("Mois pr\u00e9c\u00e9dent", "Previous month", "Mes anterior", "Mese precedente", "\u524d\u306e\u6708", "Vormonat", "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0633\u0627\u0628\u0642", "上个月", "Vorige maand", "Mês anterior", "Föregående månad", "Предыдущий месяц", "Poprzedni miesiąc", "이전 달"),
          style: boutonMois }, "\u2039"),
        h("div", { style: { flex: 1, textAlign: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 600, color: "#F3EEE4", textTransform: "uppercase", letterSpacing: 2.4 } },
          MOIS2[moisVu.mois] + " " + moisVu.an),
        h("button", { onClick: function () { glisser(1); }, "aria-label": T("Mois suivant", "Next month", "Mes siguiente", "Mese successivo", "\u6b21\u306e\u6708", "N\u00e4chster Monat", "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062a\u0627\u0644\u064a", "下个月", "Volgende maand", "Próximo mês", "Nästa månad", "Следующий месяц", "Następny miesiąc", "다음 달"),
          style: boutonMois }, "\u203a")),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4, marginBottom: 6 } },
        initiales.map(function (ini, i) {
          return h("div", { key: "e" + i, style: { textAlign: "center", fontFamily: M, fontSize: 11, color: "rgba(237,242,245,0.55)", whiteSpace: "nowrap", overflow: "hidden" } }, ini);
        })),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4 } }, cases),   /* (646) */
      modeForf ? null : h("div", { style: { display: "flex", gap: 18, justifyContent: "center", marginTop: 14, flexWrap: "wrap" } },
        ["concours", "stage", "sortie"].map(function (k) {
          return h("div", { key: "lg" + k, style: { display: "flex", alignItems: "center", gap: 6 } },
            h("span", { style: { width: 7, height: 7, borderRadius: "50%", background: COULT[k] } }),
            h("span", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(237,242,245,0.62)" } }, (META2[k] || META2.stage).label));
        }))),
      errMois ? h("div", { style: { margin: "12px 0 0", padding: "10px 12px", borderRadius: 11, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12 } },
        T("Le mois n\u2019a pas pu \u00eatre lu : ", "This month could not load: ", "No se pudo cargar el mes: ", "Impossibile caricare il mese: ", "\u3053\u306e\u6708\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\uff1a", "Monat nicht geladen: ", "\u062a\u0639\u0630\u0631\u062a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0634\u0647\u0631: ", "无法读取这个月：", "Deze maand kon niet worden geladen: ", "Não foi possível carregar o mês: ", "Månaden kunde inte läsas in: ", "Не удалось загрузить месяц: ", "Nie udało się wczytać miesiąca: ", "이번 달을 불러오지 못했어요: ") + errMois) : null,
      /* Le ou les rendez-vous du jour touche, JUSTE SOUS le calendrier. */
      (evsJour.length && !modeForf) ? h("div", { style: { marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" } },
        evsJour.map(function (ev) {
          var meta = META2[ev.type] || META2.stage;
          return h("div", { key: "cj" + ev.id, role: "button",
            onClick: function () { try { window.__agendaFiche = ev.id; } catch (eF) { } setEcran("guilde"); },
            style: { display: "flex", gap: 11, alignItems: "flex-start", padding: "10px 2px", cursor: "pointer" } },
            h("span", { style: { width: 9, height: 9, borderRadius: "50%", background: COULT[ev.type] || OR, marginTop: 5, flex: "0 0 auto" } }),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontSize: 9.5, letterSpacing: 2, fontWeight: 700, color: OR, textTransform: "uppercase" } }, meta.label),
              h("div", { style: { fontFamily: C, fontSize: 15.5, color: "#F4F7FA", marginTop: 2, lineHeight: 1.25 } }, ev.titre || ""),
              (ev.lieu || ev.description) ? h("div", { style: { fontSize: 11.5, color: "#8A929C", marginTop: 3, fontFamily: M } }, (ev.lieu && String(ev.lieu).trim()) || (ev.description && String(ev.description).trim())) : null),
            ev.heure ? h("div", { style: { flex: "0 0 auto", fontSize: 11.5, color: "rgba(244,247,250,0.45)", fontFamily: M, paddingTop: 2 } }, ev.heure) : null);
        })) : null,
      /* (636) LES SEANCES DU JOUR TOUCHE (gestion seulement) : nom, horaire, duree, restantes,
         croix ; puis « Ajouter une seance » (cavaliere + heure facultative). */
      (modeForf && jourVu) ? (function () {
        var lj = seancesDuJour(jourVu);
        var titreJ = jourVu;
        try { var dJ = dateDe(jourVu); if (dJ && !isNaN(dJ.getTime())) titreJ = dJ.toLocaleDateString(LOCF[lg] || "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); } catch (eTj) { }
        var dispo = forfaitsActifs.filter(function (f) { return restantesDe(f) > 0; });
        /* 04/10 (642) — LA FICHE DU JOUR EN VOLET (forfaits, tranche 2, sa maquette) : au lieu d un bloc sous le
           calendrier, un volet qui monte du bas (poignee, croix, date, lignes, ajout), par-dessus la page et la barre
           du bas (zIndex 8600 comme les autres fenetres de l appli), fermable par la croix ou en touchant le voile.
           Les rendez-vous du club de ce jour y figurent aussi, en tete, en version compacte (tap = fiche du
           rendez-vous). Fermer le volet = deselectionner le jour. data-noswipe : le glissement horizontal ne
           change pas d onglet (regle du suivi). Pour les cavalieres rien ne change (pas de volet). */
        var fermerJour = function () { setJourVu(""); setAjoutF(null); setEditS(null); setErrF(""); };
        /* Rendu dans document.body (portail), comme la barre du bas elle-meme et les autres fenetres : un
           « fixed » pose dans l arbre de la page reste SOUS la barre du bas, quel que soit son zIndex. */
        var voletJ = h("div", { "data-forfaits-volet": "1", "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8600, display: "flex", alignItems: "flex-end", justifyContent: "center" } },
          h("div", { onClick: fermerJour, style: { position: "absolute", inset: 0, background: "rgba(4,6,9,0.6)" } }),
          h("div", { "data-forfaits-jour": jourVu, "data-noswipe": "1", onClick: function (eV) { try { eV.stopPropagation(); } catch (eV2) { } }, style: { position: "relative", width: "100%", maxWidth: 560, maxHeight: "min(76vh, 680px)", overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(255,255,255,0.09)", borderBottom: "none", padding: "10px 16px calc(env(safe-area-inset-bottom) + 24px)", boxShadow: "0 -14px 44px rgba(0,0,0,0.55)" } },
          h("div", { style: { width: 44, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)", margin: "0 auto 12px" } }),
          h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } },
            h("button", { "data-forfaits-fermer": "1", onClick: fermerJour, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"), style: { width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#EDF2F5", fontSize: 15, cursor: "pointer", flex: "0 0 auto", padding: 0 } }, "\u2715"),
            h("div", { style: { flex: 1, textAlign: "center", fontFamily: C, fontSize: 16, color: "#F3EEE4", lineHeight: 1.25 } }, titreJ.charAt(0).toUpperCase() + titreJ.slice(1)),
            h("div", { style: { width: 38, flex: "0 0 auto" } })),
          false ? h("div", { style: { margin: "4px 0 6px", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" } }, evsJour.map(function (ev) {   /* (648) les rendez-vous du club restent dans leur onglet */
            var metaV = META2[ev.type] || META2.stage;
            return h("div", { key: "vj" + ev.id, role: "button", onClick: function () { try { window.__agendaFiche = ev.id; } catch (eF2) { } setEcran("guilde"); },
              style: { display: "flex", alignItems: "center", gap: 9, padding: "7px 2px", cursor: "pointer" } },
              h("span", { style: { width: 9, height: 9, borderRadius: "50%", background: COULT[ev.type] || OR, flex: "0 0 auto" } }),
              h("span", { style: { fontSize: 9, letterSpacing: 1.6, fontWeight: 700, color: OR, textTransform: "uppercase", fontFamily: M, flex: "0 0 auto" } }, metaV.label),
              h("span", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 13.5, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ev.titre || ""),
              ev.heure ? h("span", { style: { fontSize: 11, color: "rgba(244,247,250,0.45)", fontFamily: M, flex: "0 0 auto" } }, ev.heure) : null);
          })) : null,
          h("div", { style: { fontSize: 9.5, letterSpacing: 2, fontWeight: 700, color: OR, textTransform: "uppercase", fontFamily: M, margin: "8px 0 2px" } },
            T("Forfaits", "Packages", "Bonos", "Pacchetti", "回数券", "Karten", "الباقات", "课时卡", "Lessenkaarten", "Pacotes", "Klippkort", "Абонементы", "Karnety", "회차권")),
          lj.length ? lj.map(function (x) {
            var rest = restantesDe(x.f), plage = plageTxtF(x.s.heure, x.f.duree_min);
            if (editS && editS.id === x.s.id) {   /* (641) la ligne en modification */
              var choixE = forfaitsActifs.filter(function (f2) { return restantesDe(f2) > 0 || f2.id === x.f.id; });
              if (!choixE.some(function (f2) { return f2.id === x.f.id; })) choixE = choixE.concat([x.f]);
              return h("div", { key: "fs" + x.s.id, className: "forf-seance forf-seance-edit", "data-seance-edit": x.s.id, style: { display: "flex", flexDirection: "column", gap: 8, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" } },
                h("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, portraitF(x.f, 36), h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C" } }, T("Modifier la s\u00e9ance", "Edit the session", "Modificar la sesi\u00f3n", "Modifica la lezione", "\u30ec\u30c3\u30b9\u30f3\u3092\u7de8\u96c6", "Einheit bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u062d\u0635\u0629", "修改课程", "Les wijzigen", "Editar a sessão", "Redigera passet", "Изменить занятие", "Edytuj jazdę", "레슨 수정"))),
                h("select", { value: editS.forfait_id || "", onChange: function (e) { var v = e.target.value; setEditS(function (a) { return Object.assign({}, a || {}, { forfait_id: v }); }); }, style: STYLE_CHAMP_F },
                  choixE.map(function (f2) { return h("option", { key: "oe" + f2.id, value: f2.id }, f2.cavalier_nom + " \u00b7 " + restantesDe(f2) + " / " + f2.seances_total); })),
                h("div", { style: { display: "flex", gap: 8, alignItems: "center" } },   /* (649) le jour */
                  h("span", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C", flex: "0 0 auto" } }, T("Jour", "Day", "D\u00eda", "Giorno", "\u65e5\u4ed8", "Tag", "\u0627\u0644\u064a\u0648\u0645", "日期", "Dag", "Dia", "Dag", "День", "Dzień", "날짜")),
                  h("input", { type: "date", "data-seance-jour": "1", value: editS.date_jour || "", onChange: function (e) { var v = e.target.value; setEditS(function (a) { return Object.assign({}, a || {}, { date_jour: v }); }); }, style: Object.assign({}, STYLE_CHAMP_F, { flex: 1, width: "auto", minWidth: 0 }) })),
                h("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                  h("span", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C", flex: "0 0 auto" } }, T("Heure (facultatif)", "Time (optional)", "Hora (opcional)", "Ora (facoltativa)", "\u6642\u523b\uff08\u4efb\u610f\uff09", "Uhrzeit (optional)", "\u0627\u0644\u0648\u0642\u062a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)", "时间（可选）", "Tijd (optioneel)", "Hora (opcional)", "Tid (valfritt)", "Время (необязательно)", "Godzina (opcjonalnie)", "시간(선택)")),
                  h("input", { type: "time", value: editS.heure || "", onChange: function (e) { var v = e.target.value; setEditS(function (a) { return Object.assign({}, a || {}, { heure: v }); }); }, style: Object.assign({}, STYLE_CHAMP_F, { flex: 1, width: "auto", minWidth: 0 }) })),
                h("div", { style: { display: "flex", gap: 8 } },
                  h("button", { onClick: function () { setEditS(null); setErrF(""); }, style: BTN_GRIS_F }, TXT_ANNULER_F),
                  h("button", { onClick: modifierSeance, disabled: busyF, style: BTN_OR_F }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))));
            }
            return h("div", { key: "fs" + x.s.id, className: "forf-seance", role: "button", "data-seance": x.s.id,
              onClick: function () { setAjoutF(null); setErrF(""); setEditS({ id: x.s.id, forfait_id: x.f.id, heure: x.s.heure || "", date_jour: String(x.s.date_jour || jourVu).slice(0, 10) }); },   /* (641) toucher = modifier */
              style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" } },
              portraitF(x.f, 36),   /* (639) */
              h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { style: { fontFamily: C, fontSize: 14, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, x.f.cavalier_nom),
                h("div", { style: { fontFamily: M, fontSize: 11.5, color: "#8A929C", marginTop: 2 } }, (plage ? plage + "  " : "") + "(" + dureeTxtF(x.f.duree_min) + ")")),
              h("div", { style: { textAlign: "end", flex: "0 0 auto" } },
                h("div", { style: { fontFamily: M, fontSize: 13, color: "#F3EEE4", fontWeight: 600 } }, h("span", { dir: "ltr", style: { unicodeBidi: "isolate" } }, h("span", { style: { color: OR } }, String(rest)), " / " + x.f.seances_total)),
                h("div", { style: { fontFamily: M, fontSize: 9.5, color: "#8A929C" } }, T("séances restantes", "sessions left", "sesiones restantes", "lezioni rimaste", "残り", "Einheiten übrig", "حصص متبقية", "剩余课时", "lessen over", "sessões restantes", "pass kvar", "занятий осталось", "pozostałych jazd", "남은 레슨"))),
              h("button", { onClick: function (eSup) { try { eSup.stopPropagation(); } catch (eS3) { } supprimerSeance(x.s); }, "aria-label": TXT_SUPPR_F, disabled: busyF, style: { width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#C9CFD4", fontSize: 13, cursor: "pointer", flex: "0 0 auto", padding: 0 } }, "✕"));
          }) : h("div", { style: { fontFamily: M, fontSize: 11.5, color: "#6B7580", fontStyle: "italic", padding: "8px 0" } },
            T("Aucune séance ce jour-là.", "No session that day.", "Ninguna sesión ese día.", "Nessuna lezione quel giorno.", "この日のレッスンはありません。", "Keine Einheit an diesem Tag.", "لا حصص في هذا اليوم.", "那天没有课程。", "Geen les op die dag.", "Nenhuma sessão neste dia.", "Inga pass den dagen.", "В этот день занятий нет.", "Tego dnia nie ma żadnej jazdy.", "그날은 레슨이 없어요.")),
          errF ? h("div", { "data-forfaits-err-volet": "1", style: { margin: "8px 0 0", padding: "9px 12px", borderRadius: 11, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12, lineHeight: 1.45 } }, errF) : null,   /* (651) visible volet ouvert */
          ajoutF ? h("div", { "data-forfait-ajout": "1", style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 } },
            h("select", { value: ajoutF.forfait_id || "", onChange: function (e) { var v = e.target.value; setAjoutF(function (a) { return Object.assign({}, a || {}, { forfait_id: v }); }); }, style: STYLE_CHAMP_F },
              h("option", { value: "" }, T("Choisir la cavalière ou le cavalier…", "Choose the rider…", "Elegir jinete…", "Scegli il cavaliere…", "騎手を選ぶ…", "Reiterin / Reiter wählen…", "اختيار الفارس…", "选择骑手…", "Kies de ruiter…", "Escolher a amazona ou o cavaleiro…", "Välj ryttare…", "Выбрать всадницу или всадника…", "Wybierz amazonkę lub jeźdźca…", "기수 선택…")),
              dispo.map(function (f) { return h("option", { key: "o" + f.id, value: f.id }, f.cavalier_nom + " · " + restantesDe(f) + " / " + f.seances_total); })),
            h("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
              h("span", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C", flex: "0 0 auto" } }, T("Heure (facultatif)", "Time (optional)", "Hora (opcional)", "Ora (facoltativa)", "時刻（任意）", "Uhrzeit (optional)", "الوقت (اختياري)", "时间（可选）", "Tijd (optioneel)", "Hora (opcional)", "Tid (valfritt)", "Время (необязательно)", "Godzina (opcjonalnie)", "시간(선택)")),
              h("input", { type: "time", value: ajoutF.heure || "", onChange: function (e) { var v = e.target.value; setAjoutF(function (a) { return Object.assign({}, a || {}, { heure: v }); }); }, style: Object.assign({}, STYLE_CHAMP_F, { flex: 1, width: "auto", minWidth: 0 }) })),
            h("div", { style: { display: "flex", gap: 8 } },
              h("button", { onClick: function () { setAjoutF(null); setErrF(""); }, style: BTN_GRIS_F }, TXT_ANNULER_F),
              h("button", { onClick: function () { ajouterSeance(jourVu); }, disabled: busyF, style: BTN_OR_F }, T("Ajouter", "Add", "Añadir", "Aggiungi", "追加", "Hinzufügen", "إضافة", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가"))))
            : (dispo.length ? h("div", { role: "button", "data-forfait-plus": "1", onClick: function () { setErrF(""); setEditS(null); setAjoutF({ forfait_id: dispo.length === 1 ? dispo[0].id : "", heure: "" }); },
              style: { marginTop: 10, textAlign: "center", padding: "11px 8px", borderRadius: 13, border: "1px dashed rgba(217,199,163,0.4)", color: OR, fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", cursor: "pointer", fontFamily: M } },
              "＋ " + T("Ajouter une séance", "Add a session", "Añadir una sesión", "Aggiungi una lezione", "レッスンを追加", "Einheit hinzufügen", "إضافة حصة", "添加课程", "Les toevoegen", "Adicionar uma sessão", "Lägg till ett pass", "Добавить занятие", "Dodaj jazdę", "레슨 추가"))
              : h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 11, color: "#6B7580", fontStyle: "italic" } },
                forfaitsActifs.length
                  ? T("Tous les forfaits sont terminés.", "All packages are used up.", "Todos los bonos están agotados.", "Tutti i pacchetti sono esauriti.", "すべての回数券を使い切りました。", "Alle Karten sind aufgebraucht.", "كل الباقات منتهية.", "所有课时卡都已用完。", "Alle lessenkaarten zijn op.", "Todos os pacotes foram concluídos.", "Alla klippkort är förbrukade.", "Все абонементы закончились.", "Wszystkie karnety są wykorzystane.", "모든 회차권이 끝났어요.")
                  : T("Crée d’abord un forfait ci-dessous.", "Create a package below first.", "Crea primero un bono abajo.", "Crea prima un pacchetto qui sotto.", "まず下で回数券を作成してください。", "Lege zuerst unten eine Karte an.", "أنشئي أولًا باقة أدناه.", "请先在下方创建一张课时卡。", "Maak hieronder eerst een lessenkaart aan.", "Crie primeiro um pacote abaixo.", "Skapa först ett klippkort nedan.", "Сначала создай абонемент ниже.", "Najpierw utwórz karnet poniżej.", "먼저 아래에서 회차권을 만들어 주세요.")))));
        return (typeof ReactDOM !== "undefined" && ReactDOM.createPortal && document.body) ? ReactDOM.createPortal(voletJ, document.body) : voletJ;
      })() : null,
      /* (636) LES FORFAITS DU CLUB (gestion seulement) : une carte par forfait (couleur, nom,
         restantes / total, jauge, duree), « Nouveau forfait », croix de suppression. */
      modeForf ? h("div", { "data-forfaits": "1", style: { marginTop: 22 } },
        h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 10 } },
          h("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: 2.4, textTransform: "uppercase", color: OR, fontFamily: M } },
            T("Forfaits", "Packages", "Bonos", "Pacchetti", "回数券", "Karten", "الباقات", "课时卡", "Lessenkaarten", "Pacotes", "Klippkort", "Абонементы", "Karnety", "회차권")),
          h("div", { style: { fontSize: 10, color: "#6B7580", fontFamily: M, textAlign: "end" } },
            "🔒 " + T("Visible uniquement par la gestion", "Only visible to management", "Solo visible para la gestión", "Visibile solo alla gestione", "管理者のみ表示", "Nur für die Leitung sichtbar", "مرئي للإدارة فقط", "仅管理人员可见", "Alleen zichtbaar voor het beheer", "Visível apenas para a gestão", "Syns bara för ledningen", "Видно только администрации", "Widoczne tylko dla zarządzających", "관리자만 볼 수 있어요"))),
        errF ? h("div", { "data-forfaits-err": "1", style: { margin: "0 0 10px", padding: "10px 12px", borderRadius: 11, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12, lineHeight: 1.45 } }, errF) : null,
        (forfaits === null)
          ? h("div", { style: { fontFamily: M, fontSize: 11.5, color: "#6B7580", fontStyle: "italic", padding: "4px 0 8px" } }, T("Chargement…", "Loading…", "Cargando…", "Caricamento…", "読み込み中…", "Wird geladen…", "جارٰ التحميل…", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
          : (forfaitsActifs.length ? h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, forfaitsActifs.map(function (f) {
            var rest = restantesDe(f), tot = Number(f.seances_total) || 0, fini = rest <= 0;
            if (editF && editF.id === f.id) {   /* (653) la carte en modification */
              return h("div", { key: "fc" + f.id, className: "forf-carte forf-carte-edit", "data-forfait-edit": f.id, style: { gridColumn: "1 / -1", padding: 12, borderRadius: 14, border: "1px solid rgba(217,199,163,0.35)", background: "rgba(217,199,163,0.05)", display: "flex", flexDirection: "column", gap: 8 } },
                h("div", { style: { display: "flex", alignItems: "center", gap: 9 } }, portraitF(Object.assign({}, f, { cavalier_id: editF.cavalier_id, cavalier_nom: editF.nom }), 36),
                  h("div", { style: { fontFamily: M, fontSize: 10.5, color: "#8A929C" } }, T("Modifier le forfait", "Edit the package", "Modificar el bono", "Modifica il pacchetto", "\u56de\u6570\u5238\u3092\u7de8\u96c6", "Karte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0628\u0627\u0642\u0629", "修改课时卡", "Lessenkaart wijzigen", "Editar o pacote", "Redigera klippkortet", "Изменить абонемент", "Edytuj karnet", "회차권 수정"))),
                h("select", { "data-forfait-edit-cavaliere": "1", value: editF.cavalier_id || "", onChange: function (e) { var v = e.target.value; var pr = (profilsF || []).filter(function (p) { return String(p.id) === v; })[0]; setEditF(function (a) { return Object.assign({}, a || {}, { cavalier_id: v, nom: pr ? String(pr.pseudo || "") : a.nom }); }); }, style: STYLE_CHAMP_F },
                  h("option", { value: "" }, T("\u2014 Aucun lien (nom libre) \u2014", "\u2014 No link (free name) \u2014", "\u2014 Sin v\u00ednculo (nombre libre) \u2014", "\u2014 Nessun collegamento (nome libero) \u2014", "\u2014 \u30ea\u30f3\u30af\u306a\u3057\uff08\u81ea\u7531\u306a\u540d\u524d\uff09\u2014", "\u2014 Keine Verkn\u00fcpfung (freier Name) \u2014", "\u2014 \u0628\u062f\u0648\u0646 \u0631\u0628\u0637 (\u0627\u0633\u0645 \u062d\u0631) \u2014", "— 不关联（自由填写姓名）—", "— Geen koppeling (vrije naam) —", "— Sem vínculo (nome livre) —", "— Ingen koppling (fritt namn) —", "— Без привязки (своё имя) —", "— Bez powiązania (dowolna nazwa) —", "— 연결 없음(이름 직접 입력) —")),
                  (profilsF || []).slice().sort(function (a, b) { return String(a.pseudo || "").localeCompare(String(b.pseudo || "")); }).map(function (pr) { return h("option", { key: "pe" + pr.id, value: pr.id }, String(pr.pseudo || "")); })),
                h("input", { "data-forfait-edit-nom": "1", value: editF.nom || "", maxLength: 60, placeholder: T("Nom de la cavali\u00e8re ou du cavalier", "Rider\u2019s name", "Nombre del jinete", "Nome del cavaliere", "\u9a0e\u624b\u306e\u540d\u524d", "Name der Reiterin / des Reiters", "\u0627\u0633\u0645 \u0627\u0644\u0641\u0627\u0631\u0633\u0629 \u0623\u0648 \u0627\u0644\u0641\u0627\u0631\u0633", "骑手姓名", "Naam van de ruiter", "Nome da amazona ou do cavaleiro", "Ryttarens namn", "Имя всадницы или всадника", "Imię i nazwisko amazonki lub jeźdźca", "기수 이름"), onChange: function (e) { var v = e.target.value; setEditF(function (a) { return Object.assign({}, a || {}, { nom: v }); }); }, style: STYLE_CHAMP_F }),
                h("div", { style: { display: "flex", gap: 8 } },
                  h("button", { onClick: function () { setEditF(null); setErrF(""); }, style: BTN_GRIS_F }, TXT_ANNULER_F),
                  h("button", { onClick: modifierForfait, disabled: busyF, style: BTN_OR_F }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))));
            }
            return h("div", { key: "fc" + f.id, className: "forf-carte", "data-forfait": f.id, role: "button", onClick: function () { setErrF(""); setFormF(false); setEditF({ id: f.id, cavalier_id: f.cavalier_id || "", nom: f.cavalier_nom || "" }); },   /* (653) toucher = modifier */ style: { position: "relative", padding: "12px 12px 12px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "#0D1518", opacity: fini ? 0.82 : 1, cursor: "pointer" } },   /* (640) moins estompee : le bouton Renouveler doit rester lisible */
              h("div", { style: { display: "flex", alignItems: "center", gap: 9, paddingInlineEnd: 22 } },
                portraitF(f, 40),   /* (639) */
                h("div", { style: { fontFamily: C, fontSize: 13, color: "#F3EEE4", lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", minWidth: 0 } }, f.cavalier_nom)),
              h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 12, color: "#8A929C" } },
                h("span", { dir: "ltr", style: { unicodeBidi: "isolate" } }, h("span", { className: "forf-rest", style: { color: OR, fontSize: 15, fontWeight: 700 } }, String(rest)), " / " + tot), " " + TXT_SEANCES_F),
              h("div", { style: { marginTop: 8, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" } },
                h("div", { style: { width: (tot ? Math.round(rest / tot * 100) : 0) + "%", height: "100%", borderRadius: 2, background: f.couleur || FORF_COULEURS[0] } })),
              h("div", { style: { marginTop: 6, fontFamily: M, fontSize: 10, color: "#6B7580" } }, dureeTxtF(f.duree_min) + (fini ? " · " + T("Terminé", "Used up", "Agotado", "Esaurito", "終了", "Aufgebraucht", "منتهية", "已完成", "Beëindigd", "Encerrado", "Avslutad", "Завершено", "Zakończono", "완료") : "")),
              fini ? h("button", { "data-forfait-renouveler": f.id, onClick: function (eRn) { try { eRn.stopPropagation(); } catch (eR4) { } renouvelerForfait(f); }, disabled: busyF, style: { marginTop: 9, width: "100%", minHeight: 36, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(217,199,163,0.45)", background: "rgba(217,199,163,0.10)", color: OR, fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" } },
                "\u21bb " + T("Renouveler", "Renew", "Renovar", "Rinnova", "\u66f4\u65b0", "Erneuern", "\u062a\u062c\u062f\u064a\u062f", "续订", "Vernieuwen", "Renovar", "Förnya", "Продлить", "Odnów", "갱신")) : null,   /* (640) */
              h("button", { onClick: function (eSf) { try { eSf.stopPropagation(); } catch (eS4) { } supprimerForfait(f); }, "aria-label": TXT_SUPPR_F, disabled: busyF, style: { position: "absolute", top: 8, insetInlineEnd: 8, width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "#8A929C", fontSize: 10, cursor: "pointer", padding: 0 } }, "✕"));
          })) : h("div", { style: { fontFamily: M, fontSize: 11.5, color: "#6B7580", fontStyle: "italic", padding: "4px 0 8px" } },
            T("Aucun forfait pour l’instant.", "No package yet.", "Todavía no hay bonos.", "Nessun pacchetto per ora.", "回数券はまだありません。", "Noch keine Karte.", "لا توجد باقات بعد.", "目前还没有课时卡。", "Nog geen lessenkaart.", "Nenhum pacote por enquanto.", "Inga klippkort ännu.", "Пока нет ни одного абонемента.", "Na razie brak karnetów.", "아직 회차권이 없어요."))),
        formF ? h("div", { "data-forfait-form": "1", style: { marginTop: 12, padding: 12, borderRadius: 14, border: "1px solid rgba(217,199,163,0.25)", background: "rgba(217,199,163,0.04)", display: "flex", flexDirection: "column", gap: 8 } },
            /* (645) choisir la cavaliere dans la liste de l ecurie : remplit le nom et garde le lien au profil (portrait
               garanti) ; le nom reste modifiable, et une personne sans compte Hype se saisit toujours a la main. */
            (profilsF && profilsF.length) ? h("select", { "data-forfait-cavaliere": "1", value: nouvF.cavalier_id || "", onChange: function (e) { var v = e.target.value; var pr = (profilsF || []).filter(function (p) { return String(p.id) === v; })[0]; setNouvF(function (n) { return Object.assign({}, n, { cavalier_id: v, nom: pr ? String(pr.pseudo || "") : n.nom }); }); }, style: STYLE_CHAMP_F },
              h("option", { value: "" }, T("\u2014 Choisir dans les cavali\u00e8res de l\u2019\u00e9curie (facultatif) \u2014", "\u2014 Pick from the stable\u2019s riders (optional) \u2014", "\u2014 Elegir entre los jinetes de la cuadra (opcional) \u2014", "\u2014 Scegli tra i cavalieri della scuderia (facoltativo) \u2014", "\u2014 \u5398\u820e\u306e\u9a0e\u624b\u304b\u3089\u9078\u3076\uff08\u4efb\u610f\uff09\u2014", "\u2014 Aus den Reiterinnen des Stalls w\u00e4hlen (optional) \u2014", "\u2014 \u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0646 \u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0625\u0633\u0637\u0628\u0644 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a) \u2014", "— 从马厩的骑手中选择（可选）—", "— Kies uit de ruiters van de stal (optioneel) —", "— Escolher entre as amazonas da cocheira (opcional) —", "— Välj bland stallets ryttare (valfritt) —", "— Выбрать из всадниц конюшни (необязательно) —", "— Wybierz spośród jeźdźców stajni (opcjonalnie) —", "— 마구간 기수 중에서 선택(선택) —")),
              (profilsF || []).slice().sort(function (a, b) { return String(a.pseudo || "").localeCompare(String(b.pseudo || "")); }).map(function (pr) { return h("option", { key: "pc" + pr.id, value: pr.id }, String(pr.pseudo || "")); })) : null,
            h("input", { value: nouvF.nom, placeholder: T("Nom de la cavalière ou du cavalier", "Rider’s name", "Nombre del jinete", "Nome del cavaliere", "騎手の名前", "Name der Reiterin / des Reiters", "اسم الفارسة أو الفارس", "骑手姓名", "Naam van de ruiter", "Nome da amazona ou do cavaleiro", "Ryttarens namn", "Имя всадницы или всадника", "Imię i nazwisko amazonki lub jeźdźca", "기수 이름"), maxLength: 60,
              onChange: function (e) { var v = e.target.value; setNouvF(function (n) { return Object.assign({}, n, { nom: v }); }); }, style: STYLE_CHAMP_F }),
            h("div", { style: { display: "flex", gap: 8 } },
              h("label", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 10.5, color: "#8A929C" } },
                T("Nombre de séances", "Number of sessions", "Número de sesiones", "Numero di lezioni", "回数", "Anzahl Einheiten", "عدد الحصص", "课时数", "Aantal lessen", "Número de sessões", "Antal pass", "Количество занятий", "Liczba jazd", "레슨 횟수"),
                h("input", { type: "number", inputMode: "numeric", min: 1, max: 100, value: nouvF.total, onChange: function (e) { var v = e.target.value; setNouvF(function (n) { return Object.assign({}, n, { total: v }); }); }, style: Object.assign({}, STYLE_CHAMP_F, { marginTop: 4 }) })),
              h("label", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 10.5, color: "#8A929C" } },
                T("Durée d’une séance (min)", "Session length (min)", "Duración de una sesión (min)", "Durata di una lezione (min)", "1回の時間（分）", "Dauer einer Einheit (Min.)", "مدة الحصة (دقيقة)", "每节课时长（分钟）", "Duur van een les (min)", "Duração de uma sessão (min)", "Passets längd (min)", "Длительность занятия (мин)", "Czas trwania jazdy (min)", "레슨 시간(분)"),
                h("input", { type: "number", inputMode: "numeric", min: 15, max: 600, step: 15, value: nouvF.duree, onChange: function (e) { var v = e.target.value; setNouvF(function (n) { return Object.assign({}, n, { duree: v }); }); }, style: Object.assign({}, STYLE_CHAMP_F, { marginTop: 4 }) }))),
            h("div", { style: { display: "flex", gap: 8 } },
              h("button", { onClick: function () { setFormF(false); setErrF(""); }, style: BTN_GRIS_F }, TXT_ANNULER_F),
              h("button", { onClick: creerForfait, disabled: busyF, style: BTN_OR_F }, T("Créer", "Create", "Crear", "Crea", "作成", "Anlegen", "إنشاء", "创建", "Aanmaken", "Criar", "Skapa", "Создать", "Utwórz", "만들기"))))
          : h("div", { role: "button", "data-forfait-nouveau": "1", onClick: function () { setErrF(""); setFormF(true); },
            style: { marginTop: 12, textAlign: "center", padding: "12px 8px", borderRadius: 13, border: "1px solid rgba(217,199,163,0.30)", color: OR, fontSize: 11, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", cursor: "pointer", fontFamily: M } },
            "＋ " + T("Nouveau forfait", "New package", "Nuevo bono", "Nuovo pacchetto", "新しい回数券", "Neue Karte", "باقة جديدة", "新建课时卡", "Nieuwe lessenkaart", "Novo pacote", "Nytt klippkort", "Новый абонемент", "Nowy karnet", "새 회차권"))) : null);
  })();


  /* 12/10 (1053) - REFONTE AGENDA, ETAPE 1 : EN-TETE COMPACT (maquette de Blandine).
     Titre aligne a gauche (a droite en arabe), surtitre entre deux filets champagne, nom de
     l ecurie en Cormorant, et le cheval au couchant (image validee : \u00ab Ok pour l image de
     l entete \u00bb) en fond sur le cote, fondu vers le noir a gauche et en bas. En arabe l image
     passe a gauche et se retourne pour regarder le texte. Les textes et le bouton retour sont
     les memes qu avant ; seule la presentation change. */
  var CGA = "'Cormorant Garamond',Georgia,serif";
  var rtlA = (lg === "ar");
  /* (1060) Blandine (capture 21 h 45) : « descends les titres qu on voie bien le hero » -> les titres descendent sous la
     tete du cheval (iPhone + 70 px, tablette/ordinateur + 90 px). */
  var tete = h("div", { "data-agenda-tete": "1", style: { position: "relative", overflow: "hidden", padding: (l768P ? "calc(env(safe-area-inset-top) + 156px)" : "calc(env(safe-area-inset-top) + 136px)") + " 22px 16px" } },
    h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "82%", pointerEvents: "none", WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0) 100%)" } },
      h("img", { src: "images/mes-chevaux-fond-couchant.webp", alt: "", decoding: "async",
        onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } },
        style: { position: "absolute", top: l768P ? -70 : -46, insetInlineEnd: 0, height: l768P ? 640 : 500, width: "auto", maxWidth: "none", opacity: 0.6, transform: rtlA ? "scaleX(-1)" : "none",
          WebkitMaskImage: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 38%, #000 70%)",
          maskImage: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 38%, #000 70%)" } })),
    h("button", {
      onClick: function () { setEcran("guilde"); },
      "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
      style: { position: "absolute", zIndex: 2, top: "calc(env(safe-area-inset-top) + 14px)", left: 14 /* (1053) a gauche meme en arabe : le drapeau de langue occupe la droite */, width: 38, height: 38, borderRadius: "50%", background: "rgba(6,7,9,0.45)", border: "1px solid rgba(255,255,255,0.14)", color: "#EDF2F5", fontSize: 17, cursor: "pointer" }
    }, "\u2039"),
    h("div", { style: { position: "relative", zIndex: 1 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        h("span", { "aria-hidden": "true", style: { width: 30, height: 1, background: "rgba(201,166,107,0.55)", flex: "none" } }),
        h("span", { style: { fontSize: 10.5, fontWeight: 600, letterSpacing: 2.6, textTransform: "uppercase", color: "#C9A66B", fontFamily: M, whiteSpace: "nowrap" } },
          T("L'agenda du club", "The club's calendar", "La agenda del club", "L'agenda del club", "\u30af\u30e9\u30d6\u306e\u4e88\u5b9a", "Der Vereinskalender", "\u0645\u0648\u0627\u0639\u064a\u062f \u0627\u0644\u0646\u0627\u062f\u064a", "俱乐部日程", "De agenda van de manege", "A agenda do clube", "Klubbens kalender", "Календарь клуба", "Kalendarz klubu", "클럽 일정")),
        h("span", { "aria-hidden": "true", style: { flex: 1, maxWidth: 120, height: 1, background: "rgba(201,166,107,0.30)" } })),
      h("h1", { style: { margin: "12px 0 0", fontFamily: CGA, fontSize: l768P ? 46 : "clamp(25px, 7.2vw, 34px)" /* (1058) */, fontWeight: 600, lineHeight: 1.04, letterSpacing: 0.4, textTransform: "uppercase", color: "#F3EEE4", textWrap: "balance", textShadow: "0 2px 18px rgba(0,0,0,0.55)" } },
        modeForf ? T("Forfaits", "Packages", "Bonos", "Pacchetti", "\u56de\u6570\u5238", "Karten", "\u0627\u0644\u0628\u0627\u0642\u0627\u062a", "课时卡", "Lessenkaarten", "Pacotes", "Klippkort", "Абонементы", "Karnety", "회차권")   /* (648) */
          : T("Tous les rendez-vous", "All events", "Todas las citas", "Tutti gli eventi", "\u3059\u3079\u3066\u306e\u4e88\u5b9a", "Alle Termine", "\u0643\u0644 \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f", "所有日程", "Alle afspraken", "Todos os compromissos", "Alla händelser", "Все события", "Wszystkie wydarzenia", "모든 일정")),
      club ? h("div", { style: { fontFamily: CGA, fontSize: 24, fontWeight: 500, color: "rgba(243,238,228,0.92)", marginTop: 4, lineHeight: 1.15, textShadow: "0 2px 14px rgba(0,0,0,0.55)" } }, club) : null));

  function mot2(txt) {
    return h("div", { style: { padding: "60px 30px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#6B7580", fontStyle: "italic" } }, txt);
  }

  /* 14/09 (147) - DEFAUT CORRIGE AU PASSAGE : le bloc du passe etait enferme dans la branche
     « il y a des rendez-vous A VENIR ». Un club sans rendez-vous a venir ne voyait donc PAS
     son passe - et c etait deja vrai avant ce build. Il est desormais construit au niveau du
     composant, et affiche dans les deux cas. */
  /* 14/09 (147) - LES RENDEZ-VOUS PASSES DEVIENNENT DES CARTES, AFFICHEES DIRECTEMENT.
     Blandine : « en bas on garde les evenements passes sans avoir forcement besoin de les
     derouler ou alors on propose de derouler au bout d un nombre d evenements donnes, par
     exemple au dela de 4 ou 5, et tu les presentes comme sur les publications du mur, meme
     systeme mais en laissant plus de place et de hauteur, ou pourront s inserer quelques
     photos videos resultats, et les gens peuvent commenter en dessous aussi en rajoutant des
     medias s ils le souhaitent ». Et : « photos et resultats visibles tout de suite ».
     DONC : plus de section a ouvrir (le passe est charge au demarrage), les 5 plus recents
     affiches, un « Voir les precedents (N) » au-dela. Carte plus haute que les vignettes du
     mur : photo a gauche sur 124 px, a droite le type, le nom du concours, le lieu et la
     date, et le bandeau de ses medias EN DESSOUS, visible sans rien toucher.
     LE DEPLIAGE NE SERT PLUS QU AUX COMMENTAIRES, ce qui supprime d un coup les trois
     defauts de sa capture de 14 h 11 : le « Replier » qui apparaissait trois fois (il n en
     reste qu un, dans la carte), le titre dore « PUBLICATIONS » a l interieur d un
     rendez-vous (prop `sansTitre`), et la suppression d un post inaccessible (les vignettes
     du fil portent leur croix, et depuis le 135 elles ne declenchent plus l ouverture de la
     carte par ricochet).
     ⚠️ UNE SEULE REQUETE POUR TOUS LES MEDIAS : les murs des rendez-vous passes sont lus
     d un coup (cible IN (« agenda:<id> »...)), pas un par rendez-vous. Les photos
     supplementaires des posts a plusieurs medias (colonne `medias`) sont prises aussi, et
     les publications privees ecartees comme partout ailleurs.
     Les RESULTATS FFE ne sont pas encore la : c est la tranche suivante, par la date. */
  /* 17/09 (227) : une seule fonction pour supprimer un rendez-vous, AVEC CONFIRMATION (sa
     demande : « demande confirmation pour chaque suppression »), et qui DIT quand la base
     refuse au lieu de ne rien faire. Utilisee par le passe et par la page du rendez-vous. */
  function supprimerRdvClub(ev) {
    if (!ev || !ev.id) return;
    var ok = true;
    try {
      if (window.confirm) ok = window.confirm(T("Supprimer « " + (ev.titre || "") + " » ? Ses photos et commentaires seront effac\u00e9s aussi.", "Delete \u201c" + (ev.titre || "") + "\u201d? Its photos and comments will be deleted too.", "\u00bfEliminar \u00ab" + (ev.titre || "") + "\u00bb? Tambi\u00e9n se borrar\u00e1n sus fotos y comentarios.", "Eliminare \u00ab" + (ev.titre || "") + "\u00bb? Anche foto e commenti saranno eliminati.", "\u300c" + (ev.titre || "") + "\u300d\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f", "\u201e" + (ev.titre || "") + "\u201c l\u00f6schen? Fotos und Kommentare werden ebenfalls gel\u00f6scht.", "\u062d\u0630\u0641 \u00ab " + (ev.titre || "") + " \u00bb\u061f \u0633\u062a\u062d\u0630\u0641 \u0635\u0648\u0631\u0647 \u0648\u062a\u0639\u0644\u064a\u0642\u0627\u062a\u0647 \u0623\u064a\u0636\u0627.", "删除“" + (ev.titre || "") + "”？它的照片和评论也会一并删除。", "“" + (ev.titre || "") + "” verwijderen? De bijbehorende foto's en reacties worden ook gewist.", "Excluir “" + (ev.titre || "") + "”? As fotos e os comentários dela também serão apagados.", ("Ta bort ”" + (ev.titre || "") + "”? Dess foton och kommentarer raderas också."), ("Удалить «" + (ev.titre || "") + "»? Его фото и комментарии тоже будут удалены."), ("Usunąć \u201e" + (ev.titre || "") + "\u201d? Jego zdjęcia i komentarze też zostaną usunięte."), ("“" + (ev.titre || "") + "”을(를) 삭제할까요? 사진과 댓글도 함께 지워져요.")));
    } catch (eC4) { }
    if (!ok) return;
    try {
      Promise.resolve(supprimerAgendaClub(ev.id)).then(function (r) {
        if (r && r.error) { setErrPasse(T("La suppression a \u00e9t\u00e9 refus\u00e9e : ", "Deletion was refused: ", "Eliminaci\u00f3n rechazada: ", "Eliminazione rifiutata: ", "\u524a\u9664\u304c\u62d2\u5426\u3055\u308c\u307e\u3057\u305f\uff1a", "L\u00f6schen abgelehnt: ", "\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u062d\u0630\u0641: ", "删除被拒绝：", "Het verwijderen is geweigerd: ", "A exclusão foi recusada: ", "Borttagningen nekades: ", "Удаление было отклонено: ", "Usunięcie zostało odrzucone: ", "삭제가 거부되었어요: ") + String((r.error && r.error.message) || r.error)); return; }
        setErrPasse(""); setOuvertEv(null); chargerPasse(); recharger();
      }).catch(function (eD) { setErrPasse(String(eD)); });
    } catch (eD2) { setErrPasse(String(eD2)); }
  }
  /* ════════ 21/09 (307) — « DEJA PASSE » : LA CARTE DEVIENT UN SOUVENIR ════════
     Etape 1 du redesign, brief valide par Blandine. SEUL LE DESSIN DE CETTE CARTE CHANGE :
     aucune requete, aucune table, rien d autre dans la page. Les donnees sont celles deja
     chargees pour tous les rendez-vous passes : mediasEv, postsEv, resEv.
     ⚠️ LA FICHE RECOIT EXACTEMENT LE MEME PAQUET QU AVANT : window.__evPasse = { ev, medias,
     resultats }, avec les medias BRUTS et TOUS les resultats. La carte n affiche plus la liste
     des resultats (elle n est plus creee du tout), mais la fiche les a tous.
     ⚠️ PAS DE PODIUMS dans ce build : un resultat est rattache au rendez-vous par la DATE
     seulement, une cavaliere ayant couru ailleurs le meme jour ferait un faux podium.
     ⚠️ « N PUBLICATIONS », JAMAIS « N COMMENTAIRES » : les reponses (cible post:<id>) ne sont
     pas chargees ici, et aucun auteur n est affiche (le profil n est pas joint).
     ⚠️ image_url EST A LA FOIS L AFFICHE ET LA COUVERTURE CHOISIE (build 231). Regle
     d affichage seulement : si elle correspond a un media, c est la couverture choisie et elle
     passe en premier ; sinon c est une affiche, utilisee seulement s il n y a aucun media.
     Rien n est modifie en base.
     Le 2e argument est l index fourni par .map : le CSS n est pose que par la premiere carte. */
  var HYPE_AGENDA_PASSE_CSS = ".hype-agenda-passe-card{position:relative;width:100%;box-sizing:border-box;min-width:0;border:1px solid rgba(255,255,255,0.08);border-radius:16px;background:rgba(255,255,255,0.022);margin:0 0 14px;padding:12px;overflow:hidden;}.hype-agenda-passe-card.ouvert{border-color:rgba(217,199,163,0.42);}.hype-agenda-passe-main{display:block;width:100%;min-width:0;cursor:pointer;-webkit-tap-highlight-color:transparent;}.hype-agenda-passe-header{display:flex;gap:12px;align-items:flex-start;min-width:0;}.hype-agenda-passe-header.avec-croix{padding-right:36px;}.hype-agenda-passe-date{flex:0 0 50px;width:50px;box-sizing:border-box;border:1px solid rgba(217,199,163,0.35);border-radius:12px;padding:7px 0 6px;text-align:center;}.hype-agenda-passe-jour{font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:#F4F7FA;line-height:1;}.hype-agenda-passe-mois{font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;letter-spacing:1.4px;color:#F4F7FA;text-transform:uppercase;margin-top:4px;white-space:nowrap;overflow:hidden;}.hype-agenda-passe-fin{font-family:'Montserrat',sans-serif;font-size:8.5px;color:#7A838D;margin-top:2px;}.hype-agenda-passe-txt{flex:1;min-width:0;}.hype-agenda-passe-type{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;color:#D9C7A3;text-transform:uppercase;}.hype-agenda-passe-titre{font-family:'Cinzel',serif;font-size:15.5px;font-weight:600;color:#F4F7FA;line-height:1.22;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;}.hype-agenda-passe-lieu{font-family:'Montserrat',sans-serif;font-size:11.5px;color:#8A929C;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.hype-agenda-passe-mosaic{display:grid;gap:4px;width:100%;box-sizing:border-box;margin-top:11px;height:min(158px,calc((100vw - 58px) / 2));border-radius:12px;overflow:hidden;background:#0B1116;}.hype-agenda-passe-mosaic.n1{grid-template-columns:1fr;}.hype-agenda-passe-mosaic.n2{grid-template-columns:1fr 1fr;}.hype-agenda-passe-mosaic.n3{grid-template-columns:1.9fr 1fr;grid-template-rows:1fr 1fr;}.hype-agenda-passe-mosaic.n3 .hype-agenda-passe-tuile:first-child{grid-row:1 / span 2;}.hype-agenda-passe-tuile{position:relative;min-width:0;min-height:0;overflow:hidden;background:#0B1116;}.hype-agenda-passe-tuile img{width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block;}.hype-agenda-passe-plus{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(6,7,9,0.55);color:#F4F7FA;font-family:'Montserrat',sans-serif;font-size:15px;font-weight:700;letter-spacing:.5px;pointer-events:none;}.hype-agenda-passe-vide{display:flex;align-items:center;justify-content:center;font-size:30px;background:radial-gradient(120% 90% at 50% 30%,rgba(217,199,163,0.08),rgba(11,17,22,1) 70%);}.hype-agenda-passe-vide span{opacity:.55;}.hype-agenda-passe-summary{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;margin-top:9px;font-family:'Montserrat',sans-serif;font-size:11px;color:rgba(234,242,244,0.62);min-width:0;}.hype-agenda-passe-point{color:rgba(217,199,163,0.55);}.hype-agenda-passe-apercu{margin-top:9px;min-width:0;}.hype-agenda-passe-label{font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;letter-spacing:1.8px;color:#CFE3E8;text-transform:uppercase;margin-bottom:3px;}.hype-agenda-passe-texte{font-family:'Montserrat',sans-serif;font-size:12px;line-height:1.45;color:rgba(220,227,232,0.78);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;}.hype-agenda-passe-action{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;box-sizing:border-box;min-height:44px;margin-top:11px;padding:0 12px;border:1px solid rgba(217,199,163,0.5);border-radius:12px;color:#F4F7FA;font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;text-align:center;cursor:pointer;-webkit-tap-highlight-color:transparent;}.hype-agenda-passe-croix{position:absolute;top:6px;right:6px;z-index:4;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent;}.hype-agenda-passe-croix span{width:30px;height:30px;box-sizing:border-box;border-radius:50%;background:rgba(7,8,10,0.72);border:1px solid rgba(255,255,255,0.28);color:#E6ECEF;display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;}";
  var carteEvPasse = function (ev, iCarte) {
    if (!ev) return null;
    var meta = META2[ev.type] || META2.stage;
    var ouvert = (ouvertEv === ev.id);
    var idK = String(ev.id);
    var meds = (mediasEv && mediasEv[idK]) || [];
    var listeRes = (resEv && resEv[idK]) || [];
    var postsIci = (postsEv && postsEv[idK]) || [];
    var premier = postsIci.length ? postsIci[0] : null;
    var typeK = String(ev.type || "").toLowerCase();
    var estConcours = (typeK === "concours");
    var estStage = (typeK === "stage");

    /* --- la date, lue a la main : jamais new Date("AAAA-MM-JJ"), qui passe par UTC --- */
    function partiesDate(iso) {
      var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
      if (!m) return null;
      var an = Number(m[1]), mo = Number(m[2]), jo = Number(m[3]);
      if (!an || mo < 1 || mo > 12 || jo < 1 || jo > 31) return null;
      return { an: an, mois: mo, jour: jo };
    }
    function moisCourt(pd) {
      try {
        var loc = ({ fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" })[lg] || "fr-FR";
        var t = new Date(pd.an, pd.mois - 1, pd.jour).toLocaleDateString(loc, { month: "short" });
        return String(t || "").replace(/\.$/, "");
      } catch (eMc) {
        try { return String(MOIS2[pd.mois - 1] || "").slice(0, 4); } catch (eMc2) { return ""; }
      }
    }
    var pd1 = partiesDate(ev.date_jour);
    var pd2 = partiesDate(ev.date_fin);
    var plusieursJours = !!(pd1 && pd2 && String(ev.date_fin) !== String(ev.date_jour));

    /* --- les medias : nettoyes, dedoublonnes, dans un ordre stable --- */
    function cleUrl(u) {
      /* Sert UNIQUEMENT a comparer : l URL affichee n est jamais modifiee. */
      var x = String(u || "").trim();
      if (!x) return "";
      x = x.split("#")[0].split("?")[0];
      try { x = decodeURIComponent(x); } catch (eDc) { }
      x = x.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
      return x;
    }
    function estVideo(u) { try { return (typeof estUrlVideo === "function") && !!estUrlVideo(u); } catch (eEv) { return false; } }
    var uniques = [], vus = {};
    (Array.isArray(meds) ? meds : []).forEach(function (u) {
      if (typeof u !== "string") return;
      var k = cleUrl(u);
      if (!k || vus[k]) return;
      vus[k] = true; uniques.push(u.trim());
    });
    /* 21/09 (310) - LE DOCUMENT « LE JOUR J » N EST PAS UN SOUVENIR. Blandine : « il faut
       interdire le document des horaires de passage dans le mur des souvenirs ». Le fichier ne
       porte aucun nom reconnaissable (envoyerPhoto le renomme « <compte>/<horodatage> ») ; ce
       qui le signe, c est sa PUBLICATION, dont le texte est exactement le titre ecrit par le
       generateur (« Le jour J », dans la langue de celle qui l a fabrique). Une image publiee
       avec ce seul texte est donc ecartee de la carte et du compte des medias. Elle reste dans
       les publications. La liste est transmise a la fiche (champ `documents`, en PLUS du
       paquet habituel) pour qu elle l ecarte aussi de son mur. */
    var TITRES_JOURJ = ["le jour j", "race day", "el d\u00eda j", "il giorno", "\u5f53\u65e5", "der tag"];
    var docsJourJ = [];
    postsIci.forEach(function (po) {
      var tx = (po && typeof po.texte === "string") ? po.texte.replace(/\s+/g, " ").trim().toLowerCase() : "";
      if (tx && TITRES_JOURJ.indexOf(tx) !== -1 && po.photo_url) docsJourJ.push(po.photo_url);
    });
    if (docsJourJ.length) {
      var clesDocs = {};
      docsJourJ.forEach(function (u) { var kD = cleUrl(u); if (kD) clesDocs[kD] = true; });
      uniques = uniques.filter(function (u) { return !clesDocs[cleUrl(u)]; });
      vus = {}; uniques.forEach(function (u) { vus[cleUrl(u)] = true; });
    }
    var cleCouv = cleUrl(ev.image_url);
    if (cleCouv && vus[cleCouv]) {
      /* la couverture choisie parmi les medias passe en premier */
      var iC = -1;
      uniques.forEach(function (u, iU) { if (iC === -1 && cleUrl(u) === cleCouv) iC = iU; });
      if (iC > 0) { var cv = uniques.splice(iC, 1)[0]; uniques.unshift(cv); }
    }
    /* le GRAND visuel est une photo s il en existe une ; les videos vont dans les petites cases */
    var visuels = uniques.slice();
    var iPhoto = -1;
    visuels.forEach(function (u, iV) { if (iPhoto === -1 && !estVideo(u)) iPhoto = iV; });
    if (iPhoto > 0) { var ph = visuels.splice(iPhoto, 1)[0]; visuels.unshift(ph); }
    var nbMedias = uniques.length;
    var montres = visuels.slice(0, 3);
    var reste = nbMedias > 3 ? (nbMedias - 3) : 0;
    /* aucun media : l affiche en secours, sinon le fond avec l icone du type */
    var secours = (!nbMedias && typeof ev.image_url === "string" && ev.image_url.trim()) ? ev.image_url.trim() : "";
    if (!montres.length && secours) montres = [secours];

    function tuile(u, iT, grand) {
      var larg = grand ? 640 : 320, haut = grand ? 400 : 240;
      var plus = (iT === 2 && reste > 0) ? h("div", { className: "hype-agenda-passe-plus" }, "+" + reste) : null;
      if (estVideo(u)) {
        /* jamais de lecture automatique, jamais de video dans vignetteHype */
        return h("div", { key: "t" + iT, className: "hype-agenda-passe-tuile" },
          (typeof hypeMiniatureVideo === "function") ? hypeMiniatureVideo(u, { largeur: larg, picto: grand ? 18 : 14 }) : null,
          plus);
      }
      var src = u;
      try { if (typeof vignetteHype === "function") src = vignetteHype(u, larg, haut) || u; } catch (eVh) { src = u; }
      return h("div", { key: "t" + iT, className: "hype-agenda-passe-tuile" },
        h("img", { src: src, alt: "", loading: "lazy", decoding: "async", draggable: false,
          onError: function (eIm) { try { eIm.target.style.visibility = "hidden"; } catch (eIm2) { } } }),
        plus);
    }
    var nCls = montres.length >= 3 ? "n3" : (montres.length === 2 ? "n2" : "n1");
    var mosaique = montres.length
      ? h("div", { className: "hype-agenda-passe-mosaic " + nCls }, montres.map(function (u, iT) { return tuile(u, iT, iT === 0); }))
      : h("div", { className: "hype-agenda-passe-mosaic n1" },
          h("div", { className: "hype-agenda-passe-tuile hype-agenda-passe-vide" }, h("span", null, meta.emoji)));

    /* --- la ligne de resume : seulement ce qui existe --- */
    var morceaux = [];
    if (nbMedias) morceaux.push(nbMedias + " " + (nbMedias === 1
      ? T("m\u00e9dia", "media", "archivo", "media", "\u4ef6\u306e\u30e1\u30c7\u30a3\u30a2", "Medium", "\u0648\u0633\u064a\u0637", "媒体", "mediabestand", "mídia", "media", "медиафайл", "plik multimedialny", "미디어")
      : T("m\u00e9dias", "media", "archivos", "media", "\u4ef6\u306e\u30e1\u30c7\u30a3\u30a2", "Medien", "\u0648\u0633\u0627\u0626\u0637", "媒体", "mediabestanden", "mídias", "media", "медиафайлов", "pliki multimedialne", "미디어")));
    if (estConcours && listeRes.length) morceaux.push(listeRes.length + " " + (listeRes.length === 1
      ? T("r\u00e9sultat", "result", "resultado", "risultato", "\u4ef6\u306e\u7d50\u679c", "Ergebnis", "\u0646\u062a\u064a\u062c\u0629", "成绩", "resultaat", "resultado", "resultat", "результат", "wynik", "결과")
      : T("r\u00e9sultats", "results", "resultados", "risultati", "\u4ef6\u306e\u7d50\u679c", "Ergebnisse", "\u0646\u062a\u0627\u0626\u062c", "成绩", "resultaten", "resultados", "resultat", "результатов", "wyniki", "결과")));
    if (!estConcours && postsIci.length) morceaux.push(postsIci.length + " " + (postsIci.length === 1
      ? T("publication", "post", "publicaci\u00f3n", "post", "\u4ef6\u306e\u6295\u7a3f", "Beitrag", "\u0645\u0646\u0634\u0648\u0631", "条发布", "bericht", "publicação", "inlägg", "публикация", "publikacja", "게시물")
      : T("publications", "posts", "publicaciones", "post", "\u4ef6\u306e\u6295\u7a3f", "Beitr\u00e4ge", "\u0645\u0646\u0634\u0648\u0631\u0627\u062a", "条发布", "berichten", "publicações", "inlägg", "публикаций", "publikacje", "게시물")));
    var resume = morceaux.length
      ? h("div", { className: "hype-agenda-passe-summary" },
          morceaux.map(function (mc, iM) {
            return h(React.Fragment, { key: "s" + iM },
              iM ? h("span", { className: "hype-agenda-passe-point" }, "\u00b7") : null,
              h("span", null, mc));
          }))
      : null;

    /* --- stage et sortie : un apercu de deux lignes, jamais invente --- */
    function texteNet(v) {
      if (typeof v !== "string") return "";
      return v.replace(/\s+/g, " ").trim();
    }
    var apercu = null;
    if (!estConcours) {
      var txt = texteNet(ev.description), duFil = false;
      if (!txt) {
        for (var iP = 0; iP < postsIci.length; iP++) {
          var tP = texteNet(postsIci[iP] && postsIci[iP].texte);
          if (tP) { txt = tP; duFil = true; break; }
        }
      }
      if (txt) apercu = h("div", { className: "hype-agenda-passe-apercu" },
        duFil ? h("div", { className: "hype-agenda-passe-label" },
          T("Souvenir partag\u00e9", "Shared memory", "Recuerdo compartido", "Ricordo condiviso", "\u5171\u6709\u3055\u308c\u305f\u601d\u3044\u51fa", "Geteilte Erinnerung", "\u0630\u0643\u0631\u0649 \u0645\u0634\u062a\u0631\u0643\u0629", "已分享的回忆", "Gedeelde herinnering", "Lembrança compartilhada", "Delat minne", "Общее воспоминание", "Wspólna pamiątka", "공유된 추억")) : null,
        h("div", { className: "hype-agenda-passe-texte" }, txt));
    }

    var libBouton = estConcours
      ? (listeRes.length
          ? T("Voir le bilan", "See the recap", "Ver el balance", "Vedi il bilancio", "\u7d50\u679c\u3092\u898b\u308b", "Bilanz ansehen", "\u0639\u0631\u0636 \u0627\u0644\u062d\u0635\u064a\u0644\u0629", "查看总结", "Overzicht bekijken", "Ver o balanço", "Se sammanfattningen", "Смотреть итоги", "Zobacz podsumowanie", "결산 보기")
          : T("Voir le souvenir", "See the memory", "Ver el recuerdo", "Vedi il ricordo", "\u601d\u3044\u51fa\u3092\u898b\u308b", "Erinnerung ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0630\u0643\u0631\u0649", "查看回忆", "Herinnering bekijken", "Ver a lembrança", "Se minnet", "Смотреть воспоминание", "Zobacz pamiątkę", "추억 보기"))
      : (estStage
          ? T("Voir les photos", "See the photos", "Ver las fotos", "Vedi le foto", "\u5199\u771f\u3092\u898b\u308b", "Fotos ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631", "查看照片", "Foto’s bekijken", "Ver as fotos", "Se fotona", "Смотреть фото", "Zobacz zdjęcia", "사진 보기")
          : T("Voir le souvenir", "See the memory", "Ver el recuerdo", "Vedi il ricordo", "\u601d\u3044\u51fa\u3092\u898b\u308b", "Erinnerung ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0630\u0643\u0631\u0649", "查看回忆", "Herinnering bekijken", "Ver a lembrança", "Se minnet", "Смотреть воспоминание", "Zobacz pamiątkę", "추억 보기"));

    /* --- UNE SEULE navigation, la meme qu avant, pour la carte ET le bouton --- */
    function ouvrirFiche() {
      try { window.__evPasse = { ev: ev, medias: meds, resultats: listeRes, documents: docsJourJ }; } catch (eEp) { }
      setEcran("evenement-passe");
    }

    /* 12/10 (1055) - LA CARTE « SOUVENIR » DE LA PAGE EVENEMENTS PASSES. Memes donnees, meme
       calcul et meme navigation que la carte ci-dessous (couverture, medias sans le document
       « Le jour J », resultats, bouton « Voir le bilan / les photos / le souvenir », croix pour
       la proprietaire) : seule la presentation change. Une seule photo (la couverture), jamais
       inventee ; sans media ni affiche, pas de zone photo du tout. Point de categorie champagne
       pour toutes (Blandine : pas une couleur par categorie). */
    if (vuePasses) {
      var couvS = montres.length ? montres[0] : "";
      var visuelS = null;
      if (couvS) {
        if (estVideo(couvS)) visuelS = (typeof hypeMiniatureVideo === "function") ? h("div", { style: { position: "absolute", inset: 0, overflow: "hidden" } }, hypeMiniatureVideo(couvS, { largeur: 640, picto: 16 })) : null;
        else {
          var srcS = couvS; try { if (typeof vignetteHype === "function") srcS = vignetteHype(couvS, 640, 400) || couvS; } catch (eVs) { srcS = couvS; }
          visuelS = h("img", { src: srcS, alt: "", loading: "lazy", decoding: "async", draggable: false, onError: function (eIm) { try { eIm.target.style.visibility = "hidden"; } catch (eIm2) { } },
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(0.9)" } });
        }
      }
      var grilleS = false;   /* (1061) Blandine : « le style des cartes me va, pas leur disposition » -> cartes en largeur partout (photo a droite), 2 colonnes sur tablette/ordinateur ; l ancienne carte photo-en-haut reste dans le code, inutilisee */
      var chevronS = function (surPhoto) {
        return h("span", { "aria-hidden": "true", style: { flex: "none", width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(243,238,228," + (surPhoto ? "0.55" : "0.30") + ")", background: surPhoto ? "rgba(5,8,11,0.45)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: "#F3EEE4", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: rtlA ? "scaleX(-1)" : "none" } }, h("path", { d: "M9 6l6 6-6 6" })));
      };
      var dateS = h("div", { style: { flex: "0 0 48px", textAlign: "center", paddingTop: 2 } },
        h("div", { style: { fontFamily: CGA, fontSize: 28, fontWeight: 600, color: "#F3EEE4", lineHeight: 1 } }, pd1 ? String(pd1.jour) : "—"),
        pd1 ? h("div", { style: { fontFamily: M, fontSize: 10.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "rgba(243,238,228,0.85)", marginTop: 5 } }, plusieursJours ? ("→ " + pd2.jour + " " + moisCourt(pd2)) : moisCourt(pd1)) : null,
        pd1 ? h("div", { style: { fontFamily: M, fontSize: 10.5, color: "rgba(220,224,228,0.55)", marginTop: 3 } }, String(pd1.an)) : null);
      var texteS = h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
          h("span", { "aria-hidden": "true", style: { width: 6, height: 6, borderRadius: "50%", background: "#C9A66B", flex: "none" } }),
          h("span", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: "rgba(216,188,134,0.9)" } }, meta.label)),
        texteNet(ev.titre) ? h("div", { style: { fontFamily: CGA, fontSize: 20, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.15, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } }, texteNet(ev.titre)) : null,
        texteNet(ev.lieu) ? h("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 5, fontFamily: M, fontSize: 12, color: "rgba(220,224,228,0.62)", minWidth: 0 } },
          h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": "true", style: { flex: "none" } },
            h("path", { d: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" }), h("circle", { cx: 12, cy: 10, r: 2.3 })),
          h("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, texteNet(ev.lieu))) : null);
      var basS = h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px 12px", marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)" } },
        h("div", { style: { flex: 1, minWidth: 0, fontFamily: M, fontSize: 11.5, color: "rgba(220,224,228,0.58)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, morceaux.join("  ·  ")),
        h("span", { style: { flex: "none", fontFamily: M, fontSize: 12, fontWeight: 600, color: "#D8BC86" } }, libBouton + (rtlA ? " ←" : " →")));
      var croixS = estProprio ? h("div", { role: "button", "aria-label": T("Supprimer ce rendez-vous", "Delete this event", "Eliminar esta cita", "Elimina questo evento", "この予定を削除", "Diesen Termin löschen", "حذف هذا الموعد", "删除这个日程", "Deze afspraak verwijderen", "Excluir este compromisso", "Ta bort den här händelsen", "Удалить это событие", "Usuń to wydarzenie", "이 일정 삭제"),
          onClick: function (eSp) { try { if (eSp) { eSp.stopPropagation(); eSp.preventDefault(); } } catch (eS3) { } supprimerRdvClub(ev); },
          style: { position: "absolute", zIndex: 2, top: 0, insetInlineEnd: 0, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
        h("span", { style: { width: 22, height: 22, borderRadius: "50%", background: "rgba(5,8,11,0.6)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(237,242,245,0.75)", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" } }, "✕")) : null;
      var cadreS = { position: "relative", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", borderRadius: 14, border: "1px solid rgba(201,166,107,0.24)", background: "#0A0E12", overflow: "hidden", cursor: "pointer" };
      if (grilleS) {
        /* tablette et ordinateur : photo en haut, cartes de meme hauteur dans la grille */
        /* sans photo : la carte garde sa hauteur naturelle (pas de grand vide), et le chevron
           descend en bas pour laisser le coin a la croix */
        /* (1056) meme hauteur que ses voisines (Blandine : « cartes de meme hauteur autant que
           possible ») sans fausse zone photo : sans photo, le texte se centre dans la hauteur */
        return h("div", { key: ev.id, role: "button", "data-souvenir": "1", onClick: ouvrirFiche, style: cadreS },
          croixS,
          visuelS ? h("div", { style: { position: "relative", aspectRatio: "2 / 1", maxWidth: "100%", overflow: "hidden", background: "#0D1216" } }, visuelS) : null,
          h("div", { style: { display: "flex", alignItems: visuelS ? "flex-start" : "center", gap: 12, padding: visuelS ? "14px 14px 12px" : "22px 14px 18px", flex: visuelS ? "none" : 1 } }, dateS, texteS, h("div", { style: { alignSelf: "center" } }, chevronS(false))),
          basS);
      }
      /* iPhone : carte en largeur, photo a droite (a gauche en arabe) */
      return h("div", { key: ev.id, role: "button", "data-souvenir": "1", onClick: ouvrirFiche, style: cadreS },
        croixS,
        h("div", { style: { display: "flex", alignItems: "stretch", minHeight: l768P ? 124 : 108, flex: 1 } },
          h("div", { style: { flex: 1, minWidth: 0, display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 10px 10px 12px", paddingInlineStart: 12 } }, dateS, texteS),
          visuelS
            ? h("div", { style: { position: "relative", flex: "0 0 36%", overflow: "hidden", background: "#0D1216" } }, visuelS,
                h("div", { style: { position: "absolute", top: "50%", insetInlineEnd: 8, transform: "translateY(-50%)" } }, chevronS(true)))
            : h("div", { style: { flex: "none", display: "flex", alignItems: "center", paddingInlineEnd: 12 } }, chevronS(false))),
        basS);
    }

    return h("div", { key: ev.id, className: "hype-agenda-passe-card" + (ouvert ? " ouvert" : "") },
      (iCarte === 0) ? h("style", { dangerouslySetInnerHTML: { __html: HYPE_AGENDA_PASSE_CSS } }) : null,
      /* 17/09 (227) : la croix de suppression, INCHANGEE dans son geste (estProprio,
         supprimerRdvClub et sa confirmation). Zone tactile portee a 44 px ; le toucher est
         arrete ici et n ouvre jamais la fiche derriere. Elle est SOEUR de la zone principale,
         pas a l interieur : aucun bouton imbrique. */
      estProprio ? h("div", { role: "button", className: "hype-agenda-passe-croix", "aria-label": T("Supprimer ce rendez-vous", "Delete this event", "Eliminar esta cita", "Elimina questo evento", "\u3053\u306e\u4e88\u5b9a\u3092\u524a\u9664", "Diesen Termin l\u00f6schen", "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0639\u062f", "删除这个日程", "Deze afspraak verwijderen", "Excluir este compromisso", "Ta bort den här händelsen", "Удалить это событие", "Usuń to wydarzenie", "이 일정 삭제"),
        onClick: function (eSp) { try { if (eSp) { eSp.stopPropagation(); eSp.preventDefault(); } } catch (eS3) { } supprimerRdvClub(ev); } },
        h("span", null, "\u2715")) : null,
      h("div", { role: "button", className: "hype-agenda-passe-main", onClick: ouvrirFiche },
        h("div", { className: "hype-agenda-passe-header" + (estProprio ? " avec-croix" : "") },
          h("div", { className: "hype-agenda-passe-date" },
            h("div", { className: "hype-agenda-passe-jour" }, pd1 ? String(pd1.jour) : "\u2014"),
            pd1 ? h("div", { className: "hype-agenda-passe-mois" }, moisCourt(pd1)) : null,
            plusieursJours ? h("div", { className: "hype-agenda-passe-fin" }, "\u2192 " + pd2.jour) : null),
          h("div", { className: "hype-agenda-passe-txt" },
            h("div", { className: "hype-agenda-passe-type" }, meta.label),
            texteNet(ev.titre) ? h("div", { className: "hype-agenda-passe-titre" }, texteNet(ev.titre)) : null,
            texteNet(ev.lieu) ? h("div", { className: "hype-agenda-passe-lieu" }, "\ud83d\udccd " + texteNet(ev.lieu)) : null)),
        mosaique,
        resume,
        apercu),
      h("div", { role: "button", className: "hype-agenda-passe-action", onClick: ouvrirFiche },
        h("span", null, libBouton),
        h("span", { "aria-hidden": "true" }, "\u2192")),
      /* Le depliage sur place (ouvertEv), inutilise depuis le 171, est conserve tel quel. */
      ouvert ? h("div", { style: { padding: "0 10px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" } },
        ev.description ? h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(220,227,232,0.62)", lineHeight: 1.55, whiteSpace: "pre-wrap", padding: "11px 4px 4px" } }, ev.description) : null,
        /* 14/09 (150) : les deux chemins de rattachement sont lus - la cible pour ce qui a ete
           publie DEPUIS le rendez-vous, les identifications pour ce qui a ete rattache apres
           coup. MurHype fusionne et dedoublonne (prop `chargerEnPlus`, posee au 127). */
        /* La premiere publication etant DANS la carte, on l ECARTE du fil : sinon elle s y
           affichait une seconde fois, en grand, avec SON « Replier » sous celui de la carte -
           les deux boutons identiques empiles de sa capture de 16 h 27. */
        h(MurHype, { cible: "agenda:" + String(ev.id), vignette: true, sansTitre: true, teinte: OR,
          exclure: premier ? [premier.id] : [],
          chargerEnPlus: function () { return hypePostsAgenda(ev.id); } }),
        h("div", { role: "button", onClick: function () { setOuvertEv(null); },
          style: { margin: "6px auto 4px", display: "block", width: "fit-content", padding: "9px 18px", borderRadius: 999, border: "1px solid rgba(217,199,163,0.35)", background: "rgba(217,199,163,0.06)", color: OR, fontFamily: M, fontSize: 12, fontWeight: 700, cursor: "pointer", minHeight: 40 } },
          T("Replier", "Collapse", "Reducir", "Riduci", "\u9589\u3058\u308b", "Einklappen", "\u0637\u064a", "收起", "Inklappen", "Recolher", "Fäll ihop", "Свернуть", "Zwiń", "접기"))) : null);
  };
  /* 12/10 (1055) - « DEJA PASSE » QUITTE LA PAGE AGENDA (decision de Blandine). A sa place, un
     lien discret « Voir les evenements passes -> » qui ouvre la page dediee. Rien n est efface :
     c est seulement l endroit ou on les regarde qui change. */
  var listePasse = (passe || []);
  var blocPasse = h("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 26 } },
    h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(201,166,107,0.22)" } }),
    h("button", { "data-agenda-passes": "1", onClick: function () { setEcran("evenements-passes"); },
      style: { flex: "none", minHeight: 44, padding: "0 6px", background: "transparent", border: "none", color: "#D8BC86", fontFamily: M, fontSize: 13, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4, textDecorationColor: "rgba(201,166,107,0.5)", cursor: "pointer" } },
      T("Voir les événements passés", "See past events", "Ver los eventos pasados", "Vedi gli eventi passati", "過去のイベントを見る", "Vergangene Termine ansehen", "عرض الفعاليات السابقة", "查看往期活动", "Afgelopen evenementen bekijken", "Ver os eventos passados", "Se tidigare händelser", "Смотреть прошедшие события", "Zobacz minione wydarzenia", "지난 이벤트 보기") + (rtlA ? "  ←" : "  →")),
    h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(201,166,107,0.22)" } }));

  /* 12/10 (1055) - LA PAGE « EVENEMENTS PASSES » (brief et maquettes de Blandine). En-tete
     avec ses deux images (verticale sur iPhone, horizontale sur tablette et ordinateur), filtres
     Tous / Concours / Stages / Sorties sur les donnees deja chargees, cartes « souvenir » du plus
     recent au plus ancien : 1 colonne sur iPhone, 2 sur tablette, 3 sur grand ecran. Le
     chargement reste celui du passe (les 50 derniers, chargerAgendaClubPasse).
     ⚠️ ALERTE DES 40 (Blandine, 20 h 12 : « mets-moi une alerte avant qu on arrive a 50 ») :
     la proprietaire voit un petit encart quand le club a 40 evenements passes ou plus.
     Au-dela de 50 les plus anciens ne s afficheraient plus ici, mais RIEN n est jamais efface
     (« n efface jamais un evenement passe sauf si on decide nous de le supprimer ») : seule
     la croix, avec confirmation, supprime. */
  function pagePasses() {
    var grand = l768P;
    var FILTRES_P = [
      ["tous", T("Tous", "All", "Todos", "Tutti", "すべて", "Alle", "الكل", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체")],
      ["concours", T("Concours", "Shows", "Concursos", "Concorsi", "競技会", "Turniere", "المسابقات", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회")],
      ["stage", T("Stages", "Clinics", "Cursillos", "Stage", "講習", "Lehrgänge", "التدريبات", "集训", "Stages", "Clínicas", "Kurser", "Сборы", "Warsztaty", "스테이지")],
      ["sortie", T("Sorties", "Outings", "Salidas", "Uscite", "外出", "Ausflüge", "الخرجات", "外出活动", "Uitstapjes", "Passeios", "Utflykter", "Выезды", "Wyjazdy", "외승")]];
    /* 12/10 (1056) - ANNEES ET « VOIR PLUS ». Le choix de l annee n apparait que si les
       evenements couvrent plusieurs annees ; titres par annee dans la liste quand « Toutes
       les annees » couvre plusieurs annees ; 12 cartes, puis « Voir plus » 12 par 12.
       Changer de filtre ou d annee repart a 12. Tout se fait sur la liste deja chargee. */
    var anneeDe = function (ev) { var m = /^(\d{4})/.exec(String(ev.date_jour || "")); return m ? m[1] : ""; };
    var annees = [];
    listePasse.forEach(function (ev) { var a = anneeDe(ev); if (a && annees.indexOf(a) === -1) annees.push(a); });
    annees.sort(function (a, b) { return Number(b) - Number(a); });
    var anneeEff = (anneeP !== "toutes" && annees.indexOf(anneeP) === -1) ? "toutes" : anneeP;
    var liste = listePasse.filter(function (ev) { return (filtreP === "tous" || String(ev.type || "").toLowerCase() === filtreP) && (anneeEff === "toutes" || anneeDe(ev) === anneeEff); });
    var montresP = liste.slice(0, nbVusP);
    var resteP = liste.length - montresP.length;
    var colonnes = l768P ? 2 : 1;   /* (1061) 2 colonnes sur tablette et ordinateur (avant : 3 sur grand ecran) */
    var gouttiere = grand ? 32 : 18;
    var bouton = function (txt, surClic, cle) {
      return h("button", { key: cle, onClick: surClic, style: { minHeight: 44, padding: "0 20px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.55)", background: "transparent", color: "#D8BC86", fontFamily: M, fontSize: 13, fontWeight: 500, cursor: "pointer" } }, txt);
    };
    var fondP = h("div", { "aria-hidden": "true", style: { position: "absolute", zIndex: 0, top: 0, insetInline: 0, height: grand ? 500 : 470, overflow: "hidden", pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 55%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 55%, rgba(0,0,0,0) 100%)" } },
        h("img", { src: grand ? "images/evenements-passes-large.webp" : "images/evenements-passes-portrait.webp", alt: "", decoding: "async",
          onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } },
          style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: grand ? "70% 35%" : "60% 40%", display: "block", opacity: 0.8, transform: rtlA ? "scaleX(-1)" : "none" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(5,8,11,0.85) 0%, rgba(5,8,11,0.55) " + (grand ? "38%" : "48%") + ", rgba(5,8,11,0.05) " + (grand ? "70%" : "85%") + ")" } }));
    var hero = h("div", { "data-passes-tete": "1", style: { position: "relative", zIndex: 1 } },
      h("button", { onClick: function () { setEcran("agenda-club"); },
        "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"),
        style: { position: "absolute", zIndex: 2, top: "calc(env(safe-area-inset-top) + 14px)", left: 14, width: 38, height: 38, borderRadius: "50%", background: "rgba(5,8,11,0.45)", border: "1px solid rgba(255,255,255,0.14)", color: "#EDF2F5", fontSize: 17, cursor: "pointer" } }, "‹"),
      h("div", { style: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: (grand ? "calc(env(safe-area-inset-top) + 74px) " : "calc(env(safe-area-inset-top) + 70px) ") + gouttiere + "px " + (grand ? "26px" : "20px") } },
        grand ? h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18, fontFamily: M, fontSize: 12.5 } },
          h("button", { onClick: function () { setEcran("agenda-club"); }, style: { background: "transparent", border: "none", padding: 0, color: "#D8BC86", fontFamily: M, fontSize: 12.5, cursor: "pointer" } },
            T("Agenda", "Calendar", "Agenda", "Agenda", "予定", "Kalender", "المواعيد", "日程", "Agenda", "Agenda", "Kalender", "Календарь", "Kalendarz", "일정")),
          h("span", { "aria-hidden": "true", style: { color: "rgba(243,238,228,0.45)" } }, rtlA ? "‹" : "›"),
          h("span", { style: { color: "rgba(243,238,228,0.8)" } }, T("Événements passés", "Past events", "Eventos pasados", "Eventi passati", "過去のイベント", "Vergangene Termine", "الفعاليات السابقة", "往期活动", "Afgelopen evenementen", "Eventos passados", "Tidigare händelser", "Прошедшие события", "Minione wydarzenia", "지난 이벤트"))) : null,
        h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          h("span", { "aria-hidden": "true", style: { width: 30, height: 1, background: "rgba(201,166,107,0.55)", flex: "none" } }),
          h("span", { style: { fontSize: 10.5, fontWeight: 600, letterSpacing: 2.6, textTransform: "uppercase", color: "#C9A66B", fontFamily: M, whiteSpace: "nowrap" } },
            T("Les souvenirs du club", "The club's memories", "Los recuerdos del club", "I ricordi del club", "クラブの思い出", "Erinnerungen des Vereins", "ذكريات النادي", "俱乐部的回忆", "De herinneringen van de manege", "As lembranças do clube", "Klubbens minnen", "Воспоминания клуба", "Wspomnienia klubu", "클럽의 추억"))),
        h("h1", { style: { margin: "12px 0 0", fontFamily: CGA, fontSize: grand ? 52 : 38, fontWeight: 600, lineHeight: 1.02, color: "#F3EEE4", textWrap: "balance", textShadow: "0 2px 18px rgba(0,0,0,0.55)" } },
          T("Événements passés", "Past events", "Eventos pasados", "Eventi passati", "過去のイベント", "Vergangene Termine", "الفعاليات السابقة", "往期活动", "Afgelopen evenementen", "Eventos passados", "Tidigare händelser", "Прошедшие события", "Minione wydarzenia", "지난 이벤트")),
        h("div", { style: { marginTop: 8, fontFamily: M, fontSize: grand ? 14.5 : 13, color: "rgba(243,238,228,0.78)", maxWidth: 420, lineHeight: 1.5, textShadow: "0 1px 10px rgba(0,0,0,0.6)" } },
          T("Concours, stages et moments partagés.", "Shows, clinics and shared moments.", "Concursos, cursillos y momentos compartidos.", "Concorsi, stage e momenti condivisi.", "競技会、講習、そして共に過ごした時間。", "Turniere, Lehrgänge und gemeinsame Momente.", "مسابقات وتدريبات ولحظات مشتركة.", "比赛、集训和共同的时刻。", "Wedstrijden, stages en gedeelde momenten.", "Competições, clínicas e momentos compartilhados.", "Tävlingar, kurser och delade stunder.", "Соревнования, сборы и общие моменты.", "Zawody, warsztaty i wspólne chwile.", "대회, 스테이지, 함께한 순간들.")),
        club ? h("div", { style: { marginTop: 6, fontFamily: CGA, fontSize: grand ? 24 : 21, fontWeight: 500, color: "rgba(243,238,228,0.92)", textShadow: "0 2px 14px rgba(0,0,0,0.55)" } }, club) : null));
    var filtres = listePasse.length ? h("div", { role: "tablist", "data-passes-filtres": "1", style: { position: "relative", zIndex: 1, display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", padding: "2px " + gouttiere + "px 4px", margin: "0 auto", maxWidth: 1200 + 2 * gouttiere, boxSizing: "border-box" } },
      FILTRES_P.map(function (f) {
        var actif = filtreP === f[0];
        return h("button", { key: "f" + f[0], role: "tab", "aria-selected": actif ? "true" : "false", onClick: function () { setFiltreP(f[0]); setNbVusP(12); },
          style: { flex: "none", minHeight: 40, padding: "0 18px", borderRadius: 999, border: actif ? "1px solid #C9A66B" : "1px solid rgba(255,255,255,0.12)", background: actif ? "rgba(201,166,107,0.10)" : "rgba(255,255,255,0.025)", color: actif ? "#D8BC86" : "rgba(237,242,245,0.66)", fontFamily: M, fontSize: 13, fontWeight: actif ? 600 : 500, cursor: "pointer", whiteSpace: "nowrap" } }, f[1]);
      })) : null;
    var selAnnee = (annees.length > 1) ? h("label", { "data-passes-annee": "1", style: { position: "relative", display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: "0 16px", borderRadius: grand ? 999 : 14, border: "1px solid rgba(201,166,107,0.35)", background: "rgba(255,255,255,0.025)", color: "#F3EEE4", fontFamily: M, fontSize: 13.5, cursor: "pointer", boxSizing: "border-box", width: grand ? "auto" : "100%", flex: "none" } },
      h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "#C9A66B", strokeWidth: 1.5, strokeLinecap: "round", "aria-hidden": "true", style: { flex: "none" } },
        h("rect", { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2.5 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" })),
      h("span", { style: { flex: 1, minWidth: grand ? 92 : 0 } }, anneeEff === "toutes" ? T("Toutes les ann\u00e9es", "All years", "Todos los a\u00f1os", "Tutti gli anni", "\u3059\u3079\u3066\u306e\u5e74", "Alle Jahre", "\u0643\u0644 \u0627\u0644\u0633\u0646\u0648\u0627\u062a", "所有年份", "Alle jaren", "Todos os anos", "Alla år", "Все годы", "Wszystkie lata", "전체 연도") : anneeEff),
      h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: "rgba(243,238,228,0.7)", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "none" } }, h("path", { d: "M6 9l6 6 6-6" })),
      /* le vrai menu du telephone, invisible par-dessus : la roue de choix native sur iPhone */
      h("select", { value: anneeEff, "aria-label": T("Ann\u00e9e", "Year", "A\u00f1o", "Anno", "\u5e74", "Jahr", "\u0627\u0644\u0633\u0646\u0629", "年份", "Jaar", "Ano", "År", "Год", "Rok", "연도"),
        onChange: function (e) { setAnneeP(e.target.value); setNbVusP(12); },
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: 16 } },
        h("option", { value: "toutes" }, T("Toutes les ann\u00e9es", "All years", "Todos los a\u00f1os", "Tutti gli anni", "\u3059\u3079\u3066\u306e\u5e74", "Alle Jahre", "\u0643\u0644 \u0627\u0644\u0633\u0646\u0648\u0627\u062a", "所有年份", "Alle jaren", "Todos os anos", "Alla år", "Все годы", "Wszystkie lata", "전체 연도")),
        annees.map(function (a) { return h("option", { key: "a" + a, value: a }, a); }))) : null;
    var barreFiltres = (filtres || selAnnee) ? (grand
      ? h("div", { style: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 16, maxWidth: 1200 + 2 * gouttiere, margin: "0 auto", paddingInlineEnd: gouttiere, boxSizing: "border-box" } },
          h("div", { style: { flex: 1, minWidth: 0 } }, filtres), selAnnee)
      : h("div", { style: { position: "relative", zIndex: 1 } }, filtres,
          selAnnee ? h("div", { style: { padding: "10px " + gouttiere + "px 0" } }, selAnnee) : null)) : null;
    var alerte = (estProprio && listePasse.length >= 40) ? h("div", { "data-passes-alerte": "1", style: { margin: "0 0 14px", padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(201,166,107,0.40)", background: "rgba(201,166,107,0.06)", color: "rgba(243,238,228,0.85)", fontFamily: M, fontSize: 12.5, lineHeight: 1.5 } },
      T("Bientôt la limite d'affichage : {n} / 50. Au-delà, les plus anciens ne s'afficheront plus ici, mais rien n'est effacé.",
        "Display limit coming up: {n} / 50. Beyond that, the oldest won't show here any more, but nothing is deleted.",
        "Pronto el límite de visualización: {n} / 50. Después, los más antiguos ya no se mostrarán aquí, pero no se borra nada.",
        "Limite di visualizzazione vicino: {n} / 50. Oltre, i più vecchi non verranno più mostrati qui, ma nulla viene cancellato.",
        "表示上限が近づいています：{n} / 50。それ以降、古いものはここに表示されなくなりますが、削除はされません。",
        "Anzeigegrenze bald erreicht: {n} / 50. Danach werden die ältesten hier nicht mehr angezeigt, aber nichts wird gelöscht.",
        "اقتراب حد العرض: {n} / 50. بعد ذلك لن تظهر الأقدم هنا، لكن لن يُحذف شيء.", "快到显示上限了：{n} / 50。超出后，最早的内容将不再显示在这里，但不会被删除。", "De weergavelimiet komt in zicht: {n} / 50. Daarboven worden de oudste hier niet meer getoond, maar er wordt niets gewist.", "O limite de exibição está chegando: {n} / 50. Depois disso, os mais antigos deixarão de aparecer aqui, mas nada é apagado.", "Visningsgränsen närmar sig: {n} / 50. Utöver det visas de äldsta inte längre här, men inget raderas.", "Скоро предел отображения: {n} / 50. Дальше самые старые здесь показываться не будут, но ничего не удаляется.", "Zbliża się limit wyświetlania: {n} / 50. Po jego przekroczeniu najstarsze wydarzenia nie będą się tu już pokazywać, ale nic nie zostaje usunięte.", "곧 표시 한도에 도달해요: {n} / 50. 한도를 넘으면 오래된 것부터 여기에 표시되지 않지만, 삭제되지는 않아요.").replace("{n}", String(listePasse.length))) : null;
    var erreurP = errPasse ? h("div", { style: { margin: "0 0 14px", padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5 } }, errPasse) : null;
    var contenu;
    if (passe === null) contenu = mot2("…");
    else if (!listePasse.length) {
      contenu = h("div", { "data-passes-vide": "1", style: { textAlign: "center", padding: grand ? "50px 20px 30px" : "34px 10px 20px" } },
        h("div", { "aria-hidden": "true", style: { width: 58, height: 58, margin: "0 auto", borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "#C9A66B", strokeWidth: 1.4, strokeLinecap: "round" },
            h("rect", { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2.5 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" }))),
        h("div", { style: { marginTop: 16, fontFamily: CGA, fontSize: grand ? 28 : 24, fontWeight: 600, color: "#F3EEE4" } },
          T("Les souvenirs restent à écrire…", "Memories are still to be written…", "Los recuerdos están por escribir…", "I ricordi sono ancora da scrivere…", "思い出はこれから。", "Die Erinnerungen werden noch geschrieben…", "الذكريات لم تُكتب بعد…", "回忆等待着被写下…", "De herinneringen moeten nog geschreven worden…", "As lembranças ainda estão por escrever…", "Minnena är ännu oskrivna…", "Воспоминания ещё предстоит написать…", "Wspomnienia czekają na napisanie…", "추억은 앞으로 채워질 거예요…")),
        h("div", { style: { marginTop: 8, marginBottom: 20, fontFamily: M, fontSize: 13, color: "rgba(220,224,228,0.62)", lineHeight: 1.6 } },
          T("Les événements passés de l'écurie apparaîtront ici.", "The stable's past events will appear here.", "Los eventos pasados de la cuadra aparecerán aquí.", "Gli eventi passati della scuderia appariranno qui.", "厩舎の過去のイベントがここに表示されます。", "Die vergangenen Termine des Stalls erscheinen hier.", "ستظهر هنا الفعاليات السابقة للإسطبل.", "马厩的往期活动会显示在这里。", "De afgelopen evenementen van de stal verschijnen hier.", "Os eventos passados da cocheira vão aparecer aqui.", "Stallets tidigare händelser visas här.", "Здесь появятся прошедшие события конюшни.", "Minione wydarzenia stajni pojawią się tutaj.", "마구간의 지난 이벤트가 여기에 나타나요.")),
        bouton(T("Voir les prochains rendez-vous", "See upcoming events", "Ver las próximas citas", "Vedi i prossimi eventi", "今後の予定を見る", "Nächste Termine ansehen", "عرض المواعيد القادمة", "查看即将到来的日程", "Komende afspraken bekijken", "Ver os próximos compromissos", "Se kommande händelser", "Смотреть ближайшие события", "Zobacz najbliższe wydarzenia", "다가오는 일정 보기") + (rtlA ? "  ←" : "  →"), function () { setEcran("agenda-club"); }, "bv"));
    } else if (!liste.length) {
      contenu = h("div", { style: { textAlign: "center", padding: "36px 10px 20px" } },
        h("div", { style: { marginBottom: 16, fontFamily: M, fontSize: 13.5, color: "rgba(220,224,228,0.7)" } },
          T("Aucun événement dans cette catégorie", "No events in this category", "Ningún evento en esta categoría", "Nessun evento in questa categoria", "このカテゴリーのイベントはありません", "Keine Termine in dieser Kategorie", "لا توجد فعاليات في هذه الفئة", "这个类别里没有活动", "Geen evenementen in deze categorie", "Nenhum evento nesta categoria", "Inga händelser i den här kategorin", "В этой категории нет событий", "Brak wydarzeń w tej kategorii", "이 카테고리에는 이벤트가 없어요")),
        bouton(T("Voir tous", "Show all", "Ver todos", "Vedi tutti", "\u3059\u3079\u3066\u8868\u793a", "Alle anzeigen", "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644", "查看全部", "Alles tonen", "Ver todos", "Visa alla", "Показать все", "Zobacz wszystkie", "전체 보기"), function () { setFiltreP("tous"); setAnneeP("toutes"); setNbVusP(12); }, "bt"));
    } else {
      var titresAnnee = (anneeEff === "toutes" && annees.length > 1);
      var elems = [], anPrec = "";
      montresP.forEach(function (ev, iC) {
        var a = anneeDe(ev);
        if (titresAnnee && a && a !== anPrec) {
          elems.push(h("div", { key: "an" + a, style: { gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 14, margin: (elems.length ? (grand ? "14px" : "10px") : "0") + " 0 0" } },
            h("div", { style: { fontFamily: CGA, fontSize: grand ? 26 : 23, fontWeight: 600, color: "#D8BC86", letterSpacing: 0.5 } }, a),
            h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(201,166,107,0.28)" } })));
          anPrec = a;
        }
        elems.push(carteEvPasse(ev, iC));
      });
      contenu = h("div", null,
        h("div", { "data-passes-grille": "1", style: { display: "grid", gridTemplateColumns: "repeat(" + colonnes + ", minmax(0, 1fr))", gap: grand ? 18 : 12, alignItems: "stretch" } }, elems),
        resteP > 0 ? h("div", { style: { textAlign: "center", marginTop: grand ? 26 : 20 } },
          bouton(T("Voir plus d'\u00e9v\u00e9nements", "See more events", "Ver m\u00e1s eventos", "Vedi altri eventi", "\u3055\u3089\u306b\u8868\u793a", "Weitere Termine ansehen", "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a", "查看更多活动", "Meer evenementen bekijken", "Ver mais eventos", "Se fler händelser", "Показать больше событий", "Zobacz więcej wydarzeń", "이벤트 더 보기") + "  " +
            T("(encore {n})", "({n} more)", "({n} m\u00e1s)", "(altri {n})", "\uff08\u6b8b\u308a{n}\u4ef6\uff09", "(noch {n})", "({n} \u0623\u062e\u0631\u0649)", "（还有 {n} 个）", "(nog {n})", "(mais {n})", "({n} till)", "(ещё {n})", "(jeszcze {n})", "({n}개 더)").replace("{n}", String(resteP)),
            function () { setNbVusP(nbVusP + 12); }, "vp")) : null);
    }
    return h("div", { "data-ecran-passes": "1", style: { position: "relative", isolation: "isolate", minHeight: "100vh", background: "#05080B", color: "#EDF2F5", paddingBottom: 8 /* (1060) bandeau de fin Hype */ } },
      h(HypeDrapeauLangue, null),
      fondP,
      hero,
      barreFiltres,
      h("div", { style: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: (grand ? "22px " : "16px ") + gouttiere + "px 30px" } },
        alerte, erreurP, contenu),
      hypeCalquePhoto(visuPasse, function () { setVisuPasse(null); }));
  }

  /* 12/10 (1054) - REFONTE AGENDA, ETAPE 2 : « PROCHAINS RENDEZ-VOUS » EN CARTES HORIZONTALES
     (maquette de Blandine). Bloc date a gauche, petit point de categorie, titre, lieu, photo a
     droite fondue dans le noir, chevron. Couleurs sobres : la categorie n est plus qu un point.
     Memes donnees qu avant (evs, la liste deja chargee) ; toucher une carte ouvre la fiche sur
     place, comme le carrousel qu elle remplace. La croix de suppression du carrousel est
     gardee, discrete, pour les memes personnes (proprietaire ou auteur) avec la meme
     confirmation. Pas d affiche : pas de photo pour l instant (Blandine enverra une image par
     sorte de rendez-vous). */
  var COUL_SOBRE = { concours: "#C9A66B", stage: "#B9735E", sortie: "#9483BD" };
  var LOC_AG = ({ fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", ja: "ja-JP", de: "de-DE", ar: "ar-u-nu-latn", zh: "zh-CN", nl: "nl-NL", pt: "pt-BR", sv: "sv-SE", ru: "ru-RU", pl: "pl-PL", ko: "ko-KR" })[lg] || "fr-FR";
  function moisCourt(d) { try { return new Intl.DateTimeFormat(LOC_AG, { month: "short" }).format(d); } catch (eMc) { return String(d.getMonth() + 1); } }
  function titreSectionAg(txt) {
    return h("div", { style: { display: "flex", alignItems: "center", gap: 14, margin: "6px 0 14px" } },
      h("h2", { style: { margin: 0, fontFamily: CGA, fontSize: 21, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: "#D8BC86", whiteSpace: "nowrap" } }, txt),
      h("span", { "aria-hidden": "true", style: { flex: 1, height: 1, background: "rgba(201,166,107,0.30)" } }));
  }
  function carteProchain(ev) {
    var meta = META2[ev.type] || META2.stage;
    var d = dateDe(ev.date_jour);
    var okD = d && !isNaN(d.getTime());
    var dF = (ev.date_fin && ev.date_fin !== ev.date_jour) ? dateDe(ev.date_fin) : null;
    var lieu = (ev.lieu && String(ev.lieu).trim()) || "";
    var peutSuppr = !!(estProprio || (moiA && ev.auteur === moiA.id));
    var ouvrir = function () {
      try { if (refPontAg.current && refPontAg.current.ouvrir) { refPontAg.current.ouvrir(ev); return; } } catch (eO) { }
      try { window.__agendaFiche = ev.id; } catch (eF) { } setEcran("guilde");
    };
    return h("div", { key: "pr" + ev.id, "data-agenda-carte": "1", style: { position: "relative", borderRadius: 14, border: "1px solid rgba(201,166,107,0.26)", background: "#0B0E11", overflow: "hidden" } },
      ev.image_url ? h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "48%", pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 40%, #000 100%)",
          maskImage: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 40%, #000 100%)" } },
        h("img", { src: ev.image_url, alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } },
          style: { width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.78, filter: "saturate(0.8) brightness(0.85)" } })) : null,
      h("div", { role: "button", onClick: ouvrir, style: { position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "12px 12px", paddingInlineStart: 12, minHeight: 92, boxSizing: "border-box", cursor: "pointer" } },
        h("div", { style: { flex: "0 0 58px", height: 66, borderRadius: 10, border: "1px solid rgba(201,166,107,0.50)", background: "rgba(6,7,9,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } },
          h("div", { style: { fontFamily: CGA, fontSize: 27, fontWeight: 600, color: "#F3EEE4", lineHeight: 1 } }, okD ? d.getDate() : "\u2014"),
          h("div", { style: { fontFamily: M, fontSize: (dF ? 8.5 : 10) /* (1055) plusieurs jours : tient dans le cadre */, fontWeight: 600, letterSpacing: dF ? 0.4 : 1.1, color: "rgba(243,238,228,0.85)", textTransform: "uppercase", marginTop: 4, textAlign: "center", lineHeight: 1.25 } },
            okD ? (dF && !isNaN(dF.getTime()) ? "\u2192 " + dF.getDate() + " " + moisCourt(dF) : moisCourt(d)) : "")),
        h("div", { style: { flex: 1, minWidth: 0 } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
            h("span", { "aria-hidden": "true", style: { width: 7, height: 7, borderRadius: "50%", background: COUL_SOBRE[ev.type] || COUL_SOBRE.stage, flex: "none" } }),
            h("span", { style: { fontFamily: M, fontSize: 9.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: "rgba(216,188,134,0.9)" } }, meta.label)),
          h("div", { style: { fontFamily: CGA, fontSize: 21, fontWeight: 600, color: "#F3EEE4", lineHeight: 1.15, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 10px rgba(0,0,0,0.6)" } }, ev.titre || ""),
          lieu ? h("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontFamily: M, fontSize: 12, color: "rgba(220,224,228,0.68)", minWidth: 0 } },
            h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": "true", style: { flex: "none" } },
              h("path", { d: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" }), h("circle", { cx: 12, cy: 10, r: 2.3 })),
            h("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 8px rgba(0,0,0,0.6)" } }, lieu)) : null),
        h("div", { "aria-hidden": "true", style: { flex: "0 0 36px", height: 36, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.40)", background: "rgba(6,7,9,0.45)", display: "flex", alignItems: "center", justifyContent: "center" } },
          h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: "#F3EEE4", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: rtlA ? "scaleX(-1)" : "none" } }, h("path", { d: "M9 6l6 6-6 6" })))),
      peutSuppr ? h("div", { role: "button", "aria-label": T("Supprimer ce rendez-vous", "Delete this event", "Eliminar esta cita", "Elimina questo evento", "\u3053\u306e\u4e88\u5b9a\u3092\u524a\u9664", "Diesen Termin l\u00f6schen", "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0639\u062f", "删除这个日程", "Deze afspraak verwijderen", "Excluir este compromisso", "Ta bort den här händelsen", "Удалить это событие", "Usuń to wydarzenie", "이 일정 삭제"),
          onClick: function (eSp) { try { if (eSp) { eSp.stopPropagation(); eSp.preventDefault(); } } catch (eS3) { } supprimerRdvClub(ev); },
          style: { position: "absolute", top: 0, insetInlineEnd: 50, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
        h("span", { style: { width: 22, height: 22, borderRadius: "50%", background: "rgba(6,7,9,0.6)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(237,242,245,0.7)", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" } }, "\u2715")) : null);
  }
  var titreProchains = titreSectionAg(T("Prochains rendez-vous", "Upcoming events", "Pr\u00f3ximas citas", "Prossimi eventi", "\u4eca\u5f8c\u306e\u4e88\u5b9a", "N\u00e4chste Termine", "\u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f \u0627\u0644\u0642\u0627\u062f\u0645\u0629", "即将到来的日程", "Komende afspraken", "Próximos compromissos", "Kommande händelser", "Ближайшие события", "Najbliższe wydarzenia", "다가오는 일정"));
  var erreurSuppr = errPasse ? h("div", { style: { margin: "0 0 12px", padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5 } }, errPasse) : null;

  var corps;
  if (err) {
    corps = h("div", { style: { margin: "20px 16px", padding: "13px 15px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12.5 } },
      T("L'agenda n'a pas pu \u00eatre charg\u00e9 : ", "The calendar could not load: ", "No se pudo cargar: ", "Impossibile caricare: ", "\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\uff1a", "Nicht geladen: ", "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f: ", "无法加载日程：", "De agenda kon niet worden geladen: ", "Não foi possível carregar a agenda: ", "Kalendern kunde inte läsas in: ", "Не удалось загрузить календарь: ", "Nie udało się wczytać kalendarza: ", "일정을 불러오지 못했어요: ") + err);
  } else if (evs === null) {
    corps = mot2("\u2026");
  } else if (!evs.length) {
    /* 14/09 (147) : meme sans rendez-vous a venir, le passe s affiche. */
    /* (1054) titre de section + « Rien de prevu pour le moment » avec un pictogramme discret */
    corps = h("div", { style: { padding: "14px 22px 30px" } }, titreProchains,
      h("div", { style: { padding: "26px 16px", textAlign: "center", borderRadius: 14, border: "1px solid rgba(201,166,107,0.18)", background: "rgba(255,255,255,0.015)" } },
        h("svg", { viewBox: "0 0 24 24", width: 26, height: 26, fill: "none", stroke: "rgba(201,166,107,0.6)", strokeWidth: 1.4, strokeLinecap: "round", "aria-hidden": "true" },
          h("rect", { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2.5 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" })),
        h("div", { style: { marginTop: 8, fontFamily: M, fontSize: 13, color: "rgba(220,224,228,0.62)" } },
          T("Rien de pr\u00e9vu pour le moment", "Nothing planned yet", "Nada previsto por ahora", "Niente in programma per ora", "\u4eca\u306e\u3068\u3053\u308d\u4e88\u5b9a\u306f\u3042\u308a\u307e\u305b\u3093", "Im Moment nichts geplant", "\u0644\u0627 \u0634\u064a\u0621 \u0645\u0628\u0631\u0645\u062c \u062d\u0627\u0644\u064a\u0627", "暂时没有安排", "Nu nog niets gepland", "Nada previsto por enquanto", "Inget planerat just nu", "Пока ничего не запланировано", "Na razie nic nie jest zaplanowane", "지금은 예정된 일정이 없어요"))),
      blocPasse);
  } else {
    /* 14/09 (126) - LE GROUPEMENT PAR MOIS ET LA LIGNE D UN RENDEZ-VOUS SONT SORTIS EN
       DEUX FONCTIONS, pour que le passe s affiche exactement comme ce qui vient : meme
       dessin, meme clic vers la fiche, sans une deuxieme copie du code a maintenir.
       Le dessin lui-meme n a pas change d un pixel, seule l estompe (opacity) est nouvelle
       et ne s applique qu au passe. */
    var groupesDe = function (liste) {
      var gr = [], vus = {};
      (liste || []).forEach(function (ev) {
        var d = dateDe(ev.date_jour); if (!d || isNaN(d.getTime())) return;
        var cle = d.getFullYear() + "-" + d.getMonth();
        if (!vus[cle]) { vus[cle] = { cle: cle, an: d.getFullYear(), mois: d.getMonth(), lignes: [] }; gr.push(vus[cle]); }
        vus[cle].lignes.push(ev);
      });
      return gr;
    };
    var ligneEv = function (ev, pale) {
          var meta = META2[ev.type] || META2.stage;
          var d = dateDe(ev.date_jour);
          var jourTxt = (d && JOURS2) ? JOURS2[d.getDay()] : "";
          var secondaire = (ev.lieu && String(ev.lieu).trim()) || (ev.description && String(ev.description).trim()) || "";
          return h("div", {
            key: ev.id, role: "button",
            /* 14/09 (139) : au PASSE, on ouvre sur place ; a venir, on garde le trajet vers
               la fiche du rendez-vous sur la page du club (correctif du 128). */
            onClick: pale
              ? function () { setOuvertEv(ouvertEv === ev.id ? null : ev.id); }
              : function () { try { window.__agendaFiche = ev.id; } catch (eF) { } setEcran("guilde"); },
            style: { display: "flex", gap: 13, padding: "12px 2px", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", alignItems: "flex-start", opacity: pale ? 0.62 : 1 }
          },
            h("div", { style: { flex: "0 0 46px", textAlign: "center" } },
              h("div", { style: { fontFamily: C, fontSize: 21, fontWeight: 700, color: "#F4F7FA", lineHeight: 1 } }, d ? d.getDate() : "\u2014"),
              /* 14/09 (130) : sur plusieurs jours, le jour de fin remplace le jour de la semaine. */
              (function () {
                if (ev.date_fin && ev.date_fin !== ev.date_jour) {
                  var dF2 = dateDe(ev.date_fin);
                  if (dF2) return h("div", { style: { fontSize: 9, letterSpacing: 0.6, color: "#7A838D", marginTop: 3 } }, "\u2192 " + dF2.getDate());
                }
                return jourTxt ? h("div", { style: { fontSize: 8.5, letterSpacing: 1.1, color: "#7A838D", textTransform: "uppercase", marginTop: 3 } }, jourTxt.slice(0, 3)) : null;
              })()),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontSize: 9.5, letterSpacing: 2, fontWeight: 700, color: OR, textTransform: "uppercase" } }, meta.label),
              h("div", { style: { fontFamily: C, fontSize: 16, color: "#F4F7FA", marginTop: 2, lineHeight: 1.25 } }, ev.titre || ""),
              secondaire ? h("div", { style: { fontSize: 11.5, color: "#8A929C", marginTop: 3, fontFamily: M } }, secondaire) : null),
            ev.heure ? h("div", { style: { flex: "0 0 auto", fontSize: 11.5, color: "rgba(244,247,250,0.45)", fontFamily: M, paddingTop: 2 } }, ev.heure) : null);
    };
    var blocMois = function (g, pale) {
      return h("div", { key: g.cle, style: { marginBottom: 26 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "0 0 10px" } },
          h("div", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: OR, textTransform: "capitalize", opacity: pale ? 0.72 : 1 } },
            MOIS2[g.mois] + " " + g.an),
          h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(217,199,163,0.35), transparent)" } })),
        g.lignes.map(function (ev) {
          var ligne = ligneEv(ev, pale);
          if (!pale || ouvertEv !== ev.id) return ligne;
          /* 14/09 (139) - CE QU IL Y A EU CE JOUR-LA. Le mur du rendez-vous passe par la
             cible « agenda:<identifiant> » : c est le MEME format d adresse que les autres
             murs de l appli, et il etait DEJA utilise par la notification d agenda depuis le
             02/09 (hypeNotifier, cible: "agenda:" + id). Rien de nouveau en base, aucun SQL.
             Publier depuis ici rattache donc la photo au rendez-vous tout seul.
             Le dessin est celui des vignettes du fil (prop `vignette`), pour que le geste soit
             le meme partout. */
          return h("div", { key: String(ev.id) + "-bloc" },
            ligne,
            h("div", { style: { padding: "2px 0 14px 59px" } },
              (ev.lieu || ev.description) ? h("div", { style: { marginBottom: 10, fontFamily: M, fontSize: 12, color: "rgba(220,227,232,0.62)", lineHeight: 1.55, whiteSpace: "pre-wrap" } },
                [ev.lieu ? ("\ud83d\udccd " + ev.lieu) : null, ev.description || null].filter(function (x) { return !!x; }).join("\n")) : null,
              h(MurHype, { cible: "agenda:" + String(ev.id), vignette: true, teinte: OR }),
              h("div", { role: "button", onClick: function () { setOuvertEv(null); },
                style: { margin: "8px auto 0", display: "block", width: "fit-content", padding: "9px 18px", borderRadius: 999, border: "1px solid rgba(217,199,163,0.35)", background: "rgba(217,199,163,0.06)", color: OR, fontFamily: M, fontSize: 12, fontWeight: 700, cursor: "pointer", minHeight: 40 } },
                T("Replier", "Collapse", "Reducir", "Riduci", "\u9589\u3058\u308b", "Einklappen", "\u0637\u064a", "收起", "Inklappen", "Recolher", "Fäll ihop", "Свернуть", "Zwiń", "접기"))));
        }));
    };
    /* Le passe : replie, et demande a la base seulement au premier clic. */
    /* (1054) le simple compte « N rendez-vous a venir » laisse la place aux cartes. */
    corps = h("div", { style: { padding: "14px 22px 30px" } },
      titreProchains, erreurSuppr,
      h("div", { "data-agenda-prochains": "1", style: { display: "flex", flexDirection: "column", gap: 12 } }, evs.map(carteProchain)),
      blocPasse);
  }

  if (vuePasses) return pagePasses();   /* (1055) apres tous les hooks */
  return h("div", { style: { minHeight: "100vh", background: "#060709", color: "#EDF2F5", paddingBottom: 8 /* (1060) le bandeau de fin Hype suit et reserve la place de la barre du bas */, maxWidth: l768P ? 1240 : undefined /* (1058) */, margin: l768P ? "0 auto" : undefined } },
    h(HypeDrapeauLangue, null),   /* (491) */
    tete,
    /* 14/09 (142) - LE CARROUSEL DES RENDEZ-VOUS A VENIR, EN HAUT DE LA PAGE.
       Blandine : « deja en haut sur l agenda je prefere qu on garde le carrousel qu on avait
       deja avec les cartes et les affiches, il etait nickel et avait toutes les infos ».
       C est le MEME composant que sur la page du club (AgendaClubHype), reutilise tel quel :
       les affiches, le gros jour, le type, le titre, le lieu, la croix de suppression et son
       bouton d ajout. Aucun second carrousel a maintenir.
       Deux props l ajustent a cette page : `sansTitre` (le bandeau de la page dit deja
       tout) et `sansVoirTout` (jamais un bouton qui ramene la ou on est).
       LA LISTE PAR MOIS RESTE EN DESSOUS pour l instant : elle ne partira qu une fois le
       calendrier en place, pour qu aucune information ne disparaisse entre deux livraisons. */
    /* 12/10 (1053) : onglets soulignes (maquette) au lieu de la pilule ; memes onglets, meme effet. */
    peutForfaits ? h("div", { "data-agenda-onglets": "1", role: "tablist", style: { display: "flex", gap: 8, margin: "0 22px 14px", borderBottom: "1px solid rgba(255,255,255,0.10)" } },
      [["rdv", T("Rendez-vous", "Events", "Citas", "Eventi", "\u4e88\u5b9a", "Termine", "\u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f", "约会", "Afspraak", "Compromisso", "Händelse", "Событие", "Wydarzenie", "일정")], ["forfaits", T("Forfaits", "Packages", "Bonos", "Pacchetti", "\u56de\u6570\u5238", "Karten", "\u0627\u0644\u0628\u0627\u0642\u0627\u062a", "课时卡", "Lessenkaarten", "Pacotes", "Klippkort", "Абонементы", "Karnety", "회차권")]].map(function (o) {
        var actifO = ongletAg === o[0];
        return h("button", { key: "og" + o[0], role: "tab", "aria-selected": actifO ? "true" : "false", "data-onglet-agenda": o[0],
          onClick: function () { setOngletAg(o[0]); setJourVu(""); setAjoutF(null); setEditS(null); setErrF(""); },
          style: { flex: "none", minHeight: 44, padding: "0 16px", marginBottom: -1, border: "none", borderBottom: actifO ? "2px solid #C9A66B" : "2px solid transparent", borderRadius: 0, background: "transparent", color: actifO ? "#D8BC86" : "rgba(237,242,245,0.55)", fontFamily: M, fontSize: 14, fontWeight: actifO ? 600 : 500, letterSpacing: 0.2, cursor: "pointer" } }, o[1]);
      })) : null,
    modeForf ? null : h("div", { style: { padding: "2px 0 6px" } },
      h(AgendaClubHype, { nomClub: club, moiG: moiA, sansTitre: true, sansVoirTout: true, sansCarrousel: true /* (1054) */, pont: refPontAg, boutonEtroit: l768P /* (1058) */ })),
    /* 12/10 (1058) - TABLETTE ET ORDINATEUR : calendrier a gauche (42 %), prochains rendez-vous
       a droite (58 %) ; en arabe les colonnes s inversent d elles-memes. Sur iPhone rien ne
       change (l un sous l autre). Onglet Forfaits : le calendrier seul, centre, a largeur
       raisonnable. */
    (l768P && !modeForf)
      ? h("div", { "data-agenda-colonnes": "1", style: { display: "grid", gridTemplateColumns: "minmax(0, 42fr) minmax(0, 58fr)", gap: 4, alignItems: "start", padding: "4px 10px 0" } }, calendrier, corps)
      : (l768P ? h("div", { style: { maxWidth: 760, margin: "0 auto" } }, calendrier) : calendrier),
    (l768P || modeForf) ? null : corps,
    /* 14/09 (153) : la visionneuse passe par le calque, sinon l image se posait dans le flux
       de la page et bloquait tout (correctif du jour). */
    hypeCalquePhoto(visuPasse, function () { setVisuPasse(null); }),
    /* 14/09 (142) : l ancien bouton d ajout du bas est RETIRE. Il faisait quitter la page
       pour ouvrir la fenetre de creation sur la page du club, faute de fenetre ici. Le
       carrousel pose au-dessus apporte la sienne : son bouton d ajout ouvre la fenetre SUR
       PLACE. Garder les deux aurait fait un doublon, dont un qui fait sortir de la page.
       Et jusqu a ce build il ne s affichait de toute facon jamais : voir le defaut de
       clubRevendiquePar plus haut. */
    false ? h("div", { style: { padding: "0 16px" } },
      h("div", {
        role: "button",
        onClick: function () { try { window.__agendaOuvrirAjout = true; } catch (eA) { } setEcran("guilde"); },
        style: { textAlign: "center", padding: "12px 8px", borderRadius: 13, border: "1px solid rgba(217,199,163,0.30)", color: OR, fontSize: 11, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", cursor: "pointer", fontFamily: M }
      }, "\uFF0B " + T("Ajouter un rendez-vous", "Add an event", "A\u00f1adir una cita", "Aggiungi un evento", "\u4e88\u5b9a\u3092\u8ffd\u52a0", "Termin hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0639\u062f", "添加日程", "Afspraak toevoegen", "Adicionar um compromisso", "Lägg till en händelse", "Добавить событие", "Dodaj wydarzenie", "일정 추가"))) : null);
}
window.HypeAgenda = { Agenda: EcranAgendaClub };
})();
