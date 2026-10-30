/* HYPE ▸ 30/10/2026 — Fiche CHEVAL (EcranCheval), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~802 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranCheval() {
  function rareteIndice(v) {
    if (!(v >= 120)) return null;
    if (v >= 165) return T("1 sur 500 000", "1 in 500,000", "1 de 500 000", "1 su 500 000", "50\u4e07\u982d\u306b1\u982d", "1 von 500.000", "1 \u0645\u0646 500 000", "500 000 分之 1", "1 op 500.000", "1 em 500 000", "1 av 500 000", "1 из 500 000", "1 na 500 000", "500,000분의 1");
    if (v >= 160) return T("1 sur 100 000", "1 in 100,000", "1 de 100 000", "1 su 100 000", "10\u4e07\u982d\u306b1\u982d", "1 von 100.000", "1 \u0645\u0646 100 000", "100 000 分之 1", "1 op 100.000", "1 em 100 000", "1 av 100 000", "1 из 100 000", "1 na 100 000", "100,000분의 1");
    if (v >= 155) return T("1 sur 25 000", "1 in 25,000", "1 de 25 000", "1 su 25 000", "2.5\u4e07\u982d\u306b1\u982d", "1 von 25.000", "1 \u0645\u0646 25 000", "25 000 分之 1", "1 op 25.000", "1 em 25 000", "1 av 25 000", "1 из 25 000", "1 na 25 000", "25,000분의 1");
    if (v >= 150) return T("1 sur 5 000", "1 in 5,000", "1 de 5 000", "1 su 5 000", "5000\u982d\u306b1\u982d", "1 von 5.000", "1 \u0645\u0646 5 000", "5 000 分之 1", "1 op 5.000", "1 em 5 000", "1 av 5 000", "1 из 5 000", "1 na 5 000", "5,000분의 1");
    if (v >= 145) return T("1 sur 1 500", "1 in 1,500", "1 de 1 500", "1 su 1 500", "1500\u982d\u306b1\u982d", "1 von 1.500", "1 \u0645\u0646 1 500", "1 500 分之 1", "1 op 1.500", "1 em 1 500", "1 av 1 500", "1 из 1 500", "1 na 1 500", "1,500분의 1");
    if (v >= 140) return T("1 sur 500", "1 in 500", "1 de 500", "1 su 500", "500\u982d\u306b1\u982d", "1 von 500", "1 \u0645\u0646 500", "500 分之 1", "1 op 500", "1 em 500", "1 av 500", "1 из 500", "1 na 500", "500분의 1");
    if (v >= 135) return "Top 1 %";
    if (v >= 130) return "Top 2 %";
    if (v >= 125) return "Top 4 %";
    return "Top 8 %";
  }

  var h = React.createElement;
  var ctx = useApp();
  var setEcran = ctx.setEcran, tr = ctx.tr;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (412) : arabe */
  var id = (typeof window !== "undefined" && window.__chevalOuvert) ? window.__chevalOuvert : ((typeof location !== "undefined" && (location.hash.match(/cheval-([\w-]+)/) || [])[1]) || (typeof DEV_OUVRIR_PAGE !== "undefined" && (String(DEV_OUVRIR_PAGE).match(/^cheval-([\w-]+)$/) || [])[1]) || "rizotto");   /* 22/08 : repli de la fiche cheval, My Dream retirée */
  var chDynSt = React.useState(null); var chevalDyn = chDynSt[0], setChevalDyn = chDynSt[1]; var ptSt = React.useState(false); var palmTech = ptSt[0], setPalmTech = ptSt[1]; var vpSt = React.useState(false); var montrerVideoPalm = vpSt[0], setMontrerVideoPalm = vpSt[1];
  React.useEffect(function () {
    var actif = true;
    /* 30/07 bascule migration : les 7 fiches demo vivent desormais en base ; le code n'est plus qu'un secours. */
    /* 🟥 06/09 : NOMS_MIGRES vit desormais au niveau global, a cote de CHEVAUX_FICHE
       (voir sa declaration la-bas) — cette ligne locale, qui masquait la globale et cassait
       tout ce qui la lisait hors de cet effet, est retiree. Rien d'autre ne change ici. */
    if (CHEVAUX_FICHE[id] && !NOMS_MIGRES[id]) { setChevalDyn(null); return; }
    (async function () {
      try {
        if (typeof supa !== "undefined" && supa) {
          var r = NOMS_MIGRES[id]
            ? await supa.from("chevaux").select("*").eq("nom", NOMS_MIGRES[id]).order("created_at", { ascending: true }).limit(1).maybeSingle()
            : await supa.from("chevaux").select("*").eq("id", id).single();
          if (actif && r && r.data) {
            var secours = (NOMS_MIGRES[id] && CHEVAUX_FICHE[id]) ? CHEVAUX_FICHE[id] : {};
            if (!secours.nom) { try { for (var kSec in NOMS_MIGRES) { if (NOMS_MIGRES[kSec] === r.data.nom && CHEVAUX_FICHE[kSec]) { secours = CHEVAUX_FICHE[kSec]; break; } } } catch (eSec) { } } /* 31/07 : secours retrouve par NOM aussi (coupes disparues via ouverture par identifiant base — bug signale par Blandine) */ var palmDb = null; try { palmDb = (typeof r.data.palmares === "string") ? JSON.parse(r.data.palmares) : r.data.palmares; } catch (ePj) { } var origDb = null; try { origDb = (typeof r.data.origines === "string") ? JSON.parse(r.data.origines) : r.data.origines; } catch (eOj) { } setChevalDyn({ teinte: r.data.teinte || null, nom: r.data.nom || "Cheval", photo: r.data.photo_url || secours.photo || UV3_H1, photo_palmares: r.data.photo_palmares || null, /* 25/08 : photo d'en-tete du palmares (surcharge admin) */ tag: secours.tag || null, info: [r.data.race, r.data.age ? (String(r.data.age) + " ans") : null, r.data.discipline].filter(Boolean).join(" · "), flots: (secours.flots || []), palmares: (palmDb && palmDb.length ? palmDb : (secours.palmares || [])), origines: (origDb || secours.origines || null), histoire: r.data.histoire || (secours.histoire || null), dbId: r.data.id, ownerId: r.data.user_id, club: r.data.club || null, ecurieCh: r.data.ecurie || null, /* 10/10 (860) l ecurie de la proprietaire, pour « un cheval de mon ecurie » */ /* 02/09 (Blandine : « a chaque deco elle est de nouveau sans ecurie ») — la colonne etait CHARGEE par le select("*") puis JETEE a la reconstruction de l objet : l ecriture reussissait, l affichage tenait pendant la session, et le rechargement suivant repartait sans club. Rien n avait jamais ete perdu en base. */ galerie_vedette_url: r.data.galerie_vedette_url || null, /* 11/09 : EXACTEMENT le meme oubli que `club` ci-dessus, sur la colonne ajoutee le 09/09 — d ou « la vedette ne s affiche pas sur les photos qui y sont » et « il ne se passe rien » : l ecriture reussissait, mais rien n etait jamais relu. */ moments_forts_medias: r.data.moments_forts_medias || null, /* 11/09 : meme oubli, colonne du 06/09 (media choisi a la main sur une carte de moment fort) — recopiee par la meme occasion, colonnes verifiees une par une. */ partage_ecurie_hype: !!r.data.partage_ecurie_hype, slug: r.data.slug || null, /* 09/10 (763) : adresse publique /cheval/<slug>, lue telle quelle en base */ supprime_le: r.data.supprime_le || null, restaure_le: r.data.restaure_le || null, race: r.data.race || "", age: (r.data.age != null ? String(r.data.age) : ""), discipline: r.data.discipline || "" });
            try {
              if (r.data.user_id && typeof supa !== "undefined" && supa) {
                var rPro = await supa.from("profiles").select("pseudo, ecurie").eq("id", r.data.user_id).maybeSingle();
                if (actif && rPro && rPro.data) {
                  setChevalDyn(function (prevCD) { return Object.assign({}, prevCD || {}, { proprioNom: (rPro.data.pseudo || "").trim(), proprioEcurie: (rPro.data.ecurie || "").trim() }); });
                }
              }
            } catch (ePro) { }
          }
        }
      } catch (eD) { }
    })();
    return function () { actif = false; };
  }, [id]);
  var c = chevalDyn || CHEVAUX_FICHE[id] || { nom: "\u2026", photo: UV3_H1, info: "", flots: [], palmares: [] }; /* 30/07 bascule : la base prime, le code en dur n'est qu'un secours */
  var cibleCh = "cheval:" + ((c && c.dbId) || id); /* 30/07 : les souvenirs suivent l identifiant base apres migration */
  /* ===== RESULTATS : FIN DU SCHISME (02/08) =====
     Les resultats vivaient a DEUX endroits qui ne se parlaient pas : la table `resultats`
     (le fil, la communaute, la page club) indexee par CAVALIER, et la colonne JSON
     `chevaux.palmares` indexee par CHEVAL. Un resultat saisi depuis le fil n apparaissait
     jamais dans le palmares du cheval, et l inverse etait vrai aussi (bug signale par
     Blandine : « Resultats ne s affichent pas sur la page cheval »).
     La colonne `resultats.cheval_id` ajoutee le 02/08 rend le rattachement possible.
     Desormais : la fiche LIT les deux sources (les anciennes entrees JSON restent visibles,
     rien n est perdu) mais N ECRIT QUE dans la table. On arrete d alimenter l ancien
     emplacement, sinon on recree le probleme qu on repare. */
  var rdSt = React.useState(null); var resDb = rdSt[0], setResDb = rdSt[1];
  var avSt = React.useState({}); var avatarsCav = avSt[0], setAvatarsCav = avSt[1]; /* (596) portraits des cavaliers relies a un compte, par cavalier_id */
  /* 15/09 (178) : l identifiant a interroger, connu SANS attendre la fiche pour un cheval
     normal. Pour les sept fiches de demonstration migrees, `id` est un slug : on attend alors
     le vrai identifiant. La dependance de l effet est cette valeur, donc un cheval normal ne
     declenche QU UNE requete - elle ne change pas quand la fiche finit d arriver. */
  var idRes = (typeof NOMS_MIGRES !== "undefined" && NOMS_MIGRES[id]) ? (chevalDyn && chevalDyn.dbId) : id;
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        /* 15/09 (178) - LES DERNIERS RESULTATS ARRIVAIENT PLUSIEURS SECONDES APRES LA PAGE.
           Blandine : « derniers resultats met tjs trop de temps a charger, ils arrivent
           plusieurs secondes apres le chargement de la page, tu peux regler ca ? ».
           CAUSE : cette requete attendait `chevalDyn.dbId`, c est-a-dire la FIN de la requete
           qui charge la fiche du cheval. Deux allers-retours EN FILE, alors qu ils pouvaient
           partir ensemble : l identifiant etait deja connu.
           En effet `id` (window.__chevalOuvert) EST l identifiant en base - la requete de la
           fiche fait `.eq("id", id)`. La seule exception est les SEPT fiches de demonstration
           migrees (NOMS_MIGRES) : la, `id` est un slug et il faut vraiment attendre `dbId`.
           On garde donc les deux chemins : depart immediat pour un cheval normal, attente pour
           une fiche migree.
           ⚠️ LE `select("*")` EST CONSERVE : la page lit une quinzaine de colonnes de
           `resultats` (place, partants, concours, epreuve, date_epreuve, cavalier, classement,
           visible, masque_cavaliere, photo_url, media_url, origine...) et en enumerer une
           partie casserait quelque chose en silence, ailleurs dans la page. Ce build supprime
           une ATTENTE, il ne touche pas au volume. */
        if (!idRes || typeof supa === "undefined" || !supa) { if (vif) setResDb([]); return; }
        /* 🟥 23/08 session 159 — LE PLAFOND ÉTAIT À 60.
           La fiche ne lisait que 60 lignes sur les 154 de Rizotto d Emery,
           les 60 dernieres ECRITES. D ou « 47 sorties, 2 victoires,
           5 podiums » alors que la base contient 49 premieres et 81 podiums
           (verifie en SQL le 23/08 a 23h10). Les vraies victoires tombaient
           hors du plafond, et seules les lignes ecrites en dur restaient.
           500 couvre tres largement une carriere : sept saisons = 154 lignes.
           On garde un plafond : sans lui, 800 resultats se chargeraient d un coup.
           🟥 Et on trie par DATE D EPREUVE, pas par date d ecriture : l ordre
           dependait de l ordre ou Blandine avait importe ses saisons. */
        var rQ = await supa.from("resultats").select("*").eq("cheval_id", idRes)
          .order("date_epreuve", { ascending: false, nullsFirst: false }).limit(500);
        if (vif) setResDb(hypeReparerLignes((rQ && rQ.data) || [])); /* 02/09 : accents FFE repares a la lecture */
        /* (596) les portraits des cavaliers relies a un compte Hype (colonne cavalier_id), UNE lecture, pour les encarts. */
        try {
          var idsCv = []; ((rQ && rQ.data) || []).forEach(function (lC) { if (lC && lC.cavalier_id && idsCv.indexOf(lC.cavalier_id) === -1) idsCv.push(lC.cavalier_id); });
          if (idsCv.length) {
            var rAv = await supa.from("profiles").select("id, avatar_url").in("id", idsCv.slice(0, 100));
            var mapAv = {}; ((rAv && !rAv.error && rAv.data) || []).forEach(function (pA) { if (pA && pA.id && pA.avatar_url && String(pA.avatar_url).charAt(0) !== "@") mapAv[String(pA.id)] = pA.avatar_url; });
            if (vif) setAvatarsCav(mapAv);
          }
        } catch (eAv) { }
      } catch (eRd) { if (vif) setResDb([]); }
    })();
    return function () { vif = false; };
  }, [idRes]);
  /* Liste unique presentee a l affichage : la table d abord (la plus recente), puis les
     anciennes entrees JSON. Meme forme d objet qu avant, donc prow() est inchange. */
  /* 22/08 session 152 : ce qu on donne au module des resultats.
     DEUX sources : la table `resultats` (resDb) ET le palmares ecrit en
     dur dans CHEVAUX_FICHE. Sans la seconde, les chevaux de Blandine
     s affichaient vides alors que leurs resultats existent.
     Les lignes en dur n ont ni partants ni quart : elles restent
     visibles mais ne comptent pas dans les Classements.               */
  var lignesPourModule = (function () {
    var out = ((resDb) || []).filter(function (rV) { return rV && (voirMasques || rV.visible !== false); }); /* 26/08 : coche respectee — sauf si la proprietaire demande a tout voir */
    ((c && c.palmares) || []).forEach(function (pp, iP) {
      if (!pp || !pp.event) return;
      out.push({
        id: "dur-" + iP,
        concours: pp.event,
        epreuve: pp.ds || pp.event,
        classement: pp.rang || "",
        date_epreuve: pp.annee ? (String(pp.annee) + "-01-01") : null,
        cavalier: pp.cav || "",
        origine: "main"
      });
    });
    return out;
  })();
  var palmTous = (function () {
    var out = [];
    ((resDb) || []).forEach(function (rr) {
      if (rr && rr.visible === false && !voirMasques) return; /* 26/08 : coche respectee — sauf si la proprietaire demande a tout voir */
      var anR = "";
      if (rr.annee) anR = String(rr.annee);
      else { try { anR = String(new Date(rr.created_at).getFullYear()); } catch (eAn) { } }
      out.push({ annee: anR, event: rr.concours || "", ds: "", rang: rr.classement || "", auth: "perso", __id: rr.id });
    });
    ((c && c.palmares) || []).forEach(function (pp) { if (pp && pp.event) out.push(pp); });
    return out;
  })();
  var toastSt = React.useState(null); var toast = toastSt[0], setToast = toastSt[1];
  /* 29/08 (demande Blandine) : la fiche proposait « Ajouter à mon écurie » même pour
     un cheval DÉJÀ rattaché — le bandeau ne se cachait que pour la propriétaire, il
     ignorait complètement la table chevaux_liens. On charge l'état de rattachement
     pour proposer plus bas le RETRAIT au lieu de l'ajout. */
  var lienSt = React.useState(false); var estLieFiche = lienSt[0], setEstLieFiche = lienSt[1];
  /* \ud83d\udfe5 05/09 \u2014 MEME FAMILLE QUE LE FILET DE COMPTAGE MUX DU 03/09.
     `supabase-js` NE LEVE PAS d exception sur une requete refusee : il renvoie
     { data: null, error }. La lecture de `chevaux_liens` lisait `rL.data` et
     ignorait `rL.error` \u2014 une requete ratee rendait donc « pas rattache », et le
     bandeau reproposait « Ajouter a mes chevaux » pour un cheval deja dans
     l ecurie, sans jamais offrir de le retirer.
     Quand on ne SAIT pas, on ne propose rien : le bandeau disparait plutot que
     de proposer le mauvais geste. */
  var lienIndSt = React.useState(false); var lienIndetermine = lienIndSt[0], setLienIndetermine = lienIndSt[1];
  /* 02/09 : histoire par cavaliere. Sur MA page, si le cheval n est pas le mien, c est MON
     texte que je vois et que j ecris — jamais celui de la proprietaire, et le mien ne
     remonte jamais cote ecurie. */
  var hpSt = React.useState(null); var histPerso = hpSt[0], setHistPerso = hpSt[1];
  /* 03/09 : mon surnom a moi pour ce cheval. Perso, jamais visible chez les autres. */
  var snSt = React.useState(""); var surnomPerso = snSt[0], setSurnomPerso = snSt[1];
  var moiSt = React.useState(null); var moi = moiSt[0], setMoi = moiSt[1];
  /* 10/10 (860) Blandine : « je veux que n importe qui puisse ajouter les resultats de n importe quel cheval de son ecurie ».
     Mes ecuries (principale + deuxieme), comparees a l ecurie du cheval (son club, sinon l ecurie de sa proprietaire). */
  var mcfSt = React.useState([]); var mesClubsFiche = mcfSt[0], setMesClubsFiche = mcfSt[1];
  React.useEffect(function () { var vifMc = true; (async function () { try { if (moi && moi.id && typeof mesClubs === "function") { var lMc = await mesClubs(); if (vifMc) setMesClubsFiche(lMc || []); } } catch (eMc) { } })(); return function () { vifMc = false; }; }, [moi && moi.id]);
  var medSt = React.useState({}); var mediasInfo = medSt[0], setMediasInfo = medSt[1];
  /* 🟥 05/09 (Blandine : retirer Galerie de l'onglet Photos) — `mediasInfo` (id + proprietaire
     par photo, utilise par les boutons Supprimer/Vedette de la visionneuse) etait charge par
     `GrilleSouvenirs` (l'ancienne Galerie). En le retirant, ce chargement disparaissait avec
     lui, et Supprimer/Vedette auraient cesse de fonctionner sur les photos postees en
     commentaire pour tout le monde sauf les moderatrices. Le meme chargement (listerCommentaires)
     est repris ICI, independant de l'affichage de la galerie. */
  React.useEffect(function () {
    var actifMed = true;
    /* 11/09 — meme correctif que AlbumsPromus, cote EcranCheval : chVidsCom/mediasInfo
       (alimentes ICI, independamment de AlbumsPromus) gardaient eux aussi les videos du cheval
       precedent le temps du rechargement. Purge synchrone au changement de cheval (ou de
       compte), avant le premier appel a chargerMediasInfo() juste en dessous. window.__visListe
       (utilise par la visionneuse pour Precedent/Suivant) est une variable globale : purgee ici
       par precaution, pour qu'elle ne puisse jamais pointer vers la liste d'un autre cheval. */
    setChVidsCom([]); setMediasInfo({}); try { window.__visListe = []; } catch (eVl0) { }
    function chargerMediasInfo() {
      try {
        if (typeof listerCommentaires !== "function" || typeof supa === "undefined") return;
        listerCommentaires(cibleCh).then(function (r) {
          if (!actifMed) return;
          var monIdMed = moi && moi.id;
          var postsMed = ((r && r.data) || []).filter(function (p) { return p.photo_url && (!p.prive || (monIdMed && p.user_id === monIdMed)); });
          var infosMed = {}; postsMed.forEach(function (p) { infosMed[p.photo_url] = { id: p.id, user_id: p.user_id }; });
          setMediasInfo(infosMed);
          /* 10/09 — CORRECTIF DOUBLON : chVids (rail Médias, via chargerPhotosSouvenirs) lit
             déjà cette même table `commentaires` pour les vidéos PRÊTES (photo_url non nul) —
             confirmé en traçant les deux chemins. chVidsCom ne garde donc plus QUE les vidéos
             PAS ENCORE prêtes (en préparation/échouées) : c'était sa vraie raison d'être, les
             prêtes étant déjà couvertes ailleurs. Avant ce correctif, une vidéo prête apparaissait
             deux fois dans la grille (une fois par source), et la supprimer une fois suffisait à
             la faire disparaître des deux — une seule ligne existait réellement en base. */
          var videosComMed = ((r && r.data) || [])
            .filter(function (p) { return monIdMed && p.user_id === monIdMed && p.statut && p.statut !== "ready"; })   /* 07/10 (709) : une video pas prete / echouee n est visible que de SON auteur */
            .map(function (p) { return { url: p.photo_url, statut: p.statut || "ready", id: p.id }; });
          setChVidsCom(videosComMed);
        }).catch(function () { });
      } catch (eCm) { }
    }
    chargerMediasInfo();
    if (cibleCh && typeof hypeMuxReconcilier === "function") { hypeMuxReconcilier(cibleCh).then(function (b) { if (actifMed && b && b.ajoutes) chargerMediasInfo(); }).catch(function () { }); } /* 09/09 : reprise des videos-commentaires en preparation pour ce cheval */
    window.addEventListener("hype-souvenirs-maj", chargerMediasInfo);
    return function () { actifMed = false; window.removeEventListener("hype-souvenirs-maj", chargerMediasInfo); };
  }, [cibleCh, moi]);
  /* 02/09 : on ne charge l histoire perso que si le cheval n est pas le mien. Sur mon
     propre cheval, chevaux.histoire reste la seule source (rien ne change pour moi). */
  var estMonChevalFiche = !!(moi && chevalDyn && chevalDyn.ownerId === moi.id);
  React.useEffect(function () {
    var actifHp = true;
    if (!moi || !chevalDyn || !chevalDyn.dbId || estMonChevalFiche) { setHistPerso(null); return; }
    try { histoirePersoCheval(chevalDyn.dbId).then(function (rHp) {
      if (!actifHp) return;
      setHistPerso((rHp && rHp.data && rHp.data.texte) ? String(rHp.data.texte) : "");
      var uPh = (rHp && rHp.data && rHp.data.photo_url) ? String(rHp.data.photo_url) : "";
      if (uPh) setPhotoPerso(uPh);
      setSurnomPerso((rHp && rHp.data && rHp.data.surnom) ? String(rHp.data.surnom) : "");
    }).catch(function () { if (actifHp) setHistPerso(""); }); } catch (eHp) { setHistPerso(""); }
    return function () { actifHp = false; };
  }, [moi && moi.id, chevalDyn && chevalDyn.dbId, estMonChevalFiche]);

  /* ═══ 23/08 session 153 — LES ÉPINGLES DU PALMARÈS ════════════════════
     Un résultat épinglé quitte sa saison et ouvre la page ; c est lui, et
     lui seul, qui remonte sur la fiche du cheval (décision de Blandine).
     La valeur vit dans resultats.epingle_rang : null = pas épinglé, sinon
     le rang de pose (1, 2, 3…). Le rang sert a garder l ordre de pose.
     🟥 Seules les lignes venues de la TABLE peuvent etre epinglees. Le
     palmares ecrit en dur dans CHEVAUX_FICHE n a pas de ligne en base,
     donc pas d epingle possible — sa punaise n est pas affichee.
     epLocal : reponse immediate au tap, avant le retour de Supabase.
     PLAFOND_EPINGLES : 7, comme le plafond de la fiche (choix de Claude,
     pas de Blandine — a revoir si elle en veut plus ou moins).        */
  var PLAFOND_EPINGLES = 7;

  /* ═══ 23/08 session 155 — LE FORMAT DE LA TUILE ═══════════════════════
     Blandine choisit elle-meme quelles tuiles passent en pleine largeur.
     resultats.format_large : null = jamais choisi -> regle automatique
     (une victoire sur 40 partants ou plus passe en large), true / false =
     son choix, qui gagne toujours.                                       */
  var fmSt = React.useState({}); var fmLocal = fmSt[0], setFmLocal = fmSt[1];
  var fcSt = React.useState({}); var fortsLocal = fcSt[0], setFortsLocal = fcSt[1]; /* (600) choix a la main des moments forts : reponse immediate au tap, par id de resultat */
  var fcOuv = React.useState(false); var choixFortOuvert = fcOuv[0], setChoixFortOuvert = fcOuv[1];
  /* ═══ (601) NIVEAU ENREGISTRÉ COMME VISIBLE — Blandine : « j avais choisi de mettre uniquement les premiers quarts
     mais je me suis ratee sur Rizotto, comment faire machine arriere ? » → « on peut le mettre dans l appli ».
     Le choix fait a l import (podiums / top 8 / classements / tous) ne pilotait que la colonne `visible` des lignes
     importees, et aucun ecran ne permettait de le refaire ; reimporter ignore les lignes deja en base. Cette feuille
     reapplique un niveau sur TOUTES les lignes importees de ce cheval (origine = import) : visible = true / false,
     rien n est supprime, « voir les masques » les montre toujours. Les sans-faute restent visibles a tout niveau
     (sa regle du 06/09). Proprietaire ou moderatrice. Les lignes saisies a la main ne sont pas touchees. */
  var nvSt = React.useState(false); var niveauOuvert = nvSt[0], setNiveauOuvert = nvSt[1];
  var nvBz = React.useState(false); var niveauBusy = nvBz[0], setNiveauBusy = nvBz[1];
  function nvPlace(r) { if (!r) return null; if (r.place != null && r.place !== "") return Number(r.place); var mP = String(r.classement || "").match(/^\s*(\d+)/); return mP ? Number(mP[1]) : null; }
  function nvSansFaute(r) { var tM = String((r && r.mention) || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); return /(^|[^a-z])sf([^a-z]|$)/.test(tM) || /sans\s*-?\s*faute/.test(tM); }
  var NIVEAUX_VIS = [
    { c: "podiums", t: T("Ses podiums", "Podiums", "Sus podios", "I suoi podi", "\u8868\u5f70\u53f0", "Podien", "\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u062a\u062a\u0648\u064a\u062c", "它的领奖台", "Zijn podiumplekken", "Os pódios dele", "Prispallsplaceringar", "Пьедесталы", "Jego podia", "입상 기록"), s: T("1er, 2e, 3e", "1st, 2nd, 3rd", "1\u00ba, 2\u00ba, 3\u00ba", "1\u00ba, 2\u00ba, 3\u00ba", "1\u4f4d\u30fb2\u4f4d\u30fb3\u4f4d", "1., 2., 3.", "\u0627\u0644\u0623\u0648\u0644 \u0648\u0627\u0644\u062b\u0627\u0646\u064a \u0648\u0627\u0644\u062b\u0627\u0644\u062b", "第 1、2、3 名", "1e, 2e, 3e", "1º, 2º, 3º", "1:a, 2:a, 3:a", "1-е, 2-е, 3-е", "1., 2., 3. miejsce", "1위, 2위, 3위"), f: function (r) { var pV = nvPlace(r); return pV != null && pV <= 3; } },
    { c: "top8", t: T("Son top 8", "Top 8", "Su top 8", "La sua top 8", "\u30c8\u30c3\u30d78", "Top 8", "\u0623\u0641\u0636\u0644 8", "它的前 8 名", "Zijn top 8", "O top 8 dele", "Topp 8", "Топ-8", "Jego top 8", "톱 8"), s: T("les huit premi\u00e8res places", "the first eight places", "los ocho primeros puestos", "le prime otto posizioni", "\u4e0a\u4f4d8\u4f4d", "die ersten acht Pl\u00e4tze", "\u0627\u0644\u0645\u0631\u0627\u0643\u0632 \u0627\u0644\u062b\u0645\u0627\u0646\u064a\u0629 \u0627\u0644\u0623\u0648\u0644\u0649", "前八个名次", "de eerste acht plaatsen", "as oito primeiras colocações", "de åtta första placeringarna", "первые восемь мест", "osiem pierwszych miejsc", "상위 8위까지"), f: function (r) { var pV = nvPlace(r); return pV != null && pV <= 8; } },
    { c: "classe", t: T("Ses classements", "Placings", "Sus clasificaciones", "I suoi piazzamenti", "\u5165\u8cde", "Platzierungen", "\u062a\u0635\u0646\u064a\u0641\u0627\u062a\u0647", "它的排名", "Zijn klasseringen", "As classificações dele", "Placeringar", "Места в зачёте", "Jego klasyfikacje", "순위 기록"), s: T("le premier quart", "the first quarter", "el primer cuarto", "il primo quarto", "\u4e0a\u4f4d4\u5206\u306e1", "das erste Viertel", "\u0627\u0644\u0631\u0628\u0639 \u0627\u0644\u0623\u0648\u0644", "前四分之一", "het eerste kwart", "o primeiro quarto", "första kvartilen", "первая четверть", "pierwsza ćwiartka stawki", "상위 4분의 1"), f: function (r) { return Number(r && r.quart) === 1; } },
    { c: "tous", t: T("Tous ses r\u00e9sultats", "All results", "Todos sus resultados", "Tutti i risultati", "\u3059\u3079\u3066\u306e\u7d50\u679c", "Alle Ergebnisse", "\u0643\u0644 \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "它的所有成绩", "Al zijn resultaten", "Todos os resultados", "Alla hans resultat", "Все её результаты", "Wszystkie jego wyniki", "모든 결과"), s: T("\u00e9limin\u00e9s et abandons compris", "eliminations and retirements included", "eliminados y abandonos incluidos", "eliminati e ritiri compresi", "\u5931\u6a29\u30fb\u68c4\u6a29\u3092\u542b\u3080", "inkl. Ausschl\u00fcsse und Aufgaben", "\u0628\u0645\u0627 \u0641\u064a \u0630\u0644\u0643 \u0627\u0644\u0625\u0642\u0635\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0633\u062d\u0627\u0628", "包括淘汰和弃赛", "inclusief uitgeschakelden en opgaves", "eliminados e desistências incluídos", "inklusive utslagna och uppgivna", "включая снятых и выбывших", "w tym wyeliminowani i wycofani", "탈락과 기권 포함"), f: function () { return true; } }
  ];
  function nvPlan(cle) {
    var niv = NIVEAUX_VIS.filter(function (nV) { return nV.c === cle; })[0] || NIVEAUX_VIS[2];
    var vis = [], masq = [];
    (resDb || []).forEach(function (r) { if (!r || !r.id || String(r.origine || "") !== "import") return; if (niv.f(r) || nvSansFaute(r)) vis.push(r.id); else masq.push(r.id); });
    return { vis: vis, masq: masq, total: vis.length + masq.length };
  }
  function nvAppliquer(cle) {
    var plan = nvPlan(cle);
    if (!plan.total) return;
    setNiveauBusy(true);
    (async function () {
      var nOk = 0;
      try {
        async function lotNv(ids, val) { for (var iL = 0; iL < ids.length; iL += 150) { var trL = ids.slice(iL, iL + 150); var rL = await supa.from("resultats").update({ visible: val }).in("id", trL).select("id"); if (rL && rL.error) throw new Error(rL.error.message || String(rL.error)); nOk += ((rL && rL.data) || []).length; } }
        await lotNv(plan.vis, true); await lotNv(plan.masq, false);
        var etatV = {}; plan.vis.forEach(function (idV) { etatV[idV] = true; }); plan.masq.forEach(function (idM) { etatV[idM] = false; });
        setResDb(function (av) { return (av || []).map(function (r) { return (r && r.id && etatV[r.id] !== undefined) ? Object.assign({}, r, { visible: etatV[r.id] }) : r; }); });
        setToast((nOk === plan.total)
          ? T("Mis \u00e0 jour : ", "Updated: ", "Actualizado: ", "Aggiornato: ", "\u66f4\u65b0\uff1a", "Aktualisiert: ", "\u062a\u0645 \u0627\u0644\u062a\u062d\u062f\u064a\u062b: ", "更新于：", "Bijgewerkt: ", "Atualizado: ", "Uppdaterad: ", "Обновлено: ", "Zaktualizowano: ", "업데이트: ") + plan.vis.length + " " + T("visibles", "visible", "visibles", "visibili", "\u8868\u793a", "sichtbar", "\u0638\u0627\u0647\u0631\u0629", "可见", "zichtbaar", "visíveis", "synliga", "видимые", "widoczne", "표시됨") + ", " + plan.masq.length + " " + T("masqu\u00e9s", "hidden", "ocultos", "nascosti", "\u975e\u8868\u793a", "ausgeblendet", "\u0645\u062e\u0641\u064a\u0629", "已隐藏", "verborgen", "ocultos", "dolda", "скрытые", "ukryte", "숨김") + "."
          : T("Appliqu\u00e9 en partie seulement : ", "Only partly applied: ", "Aplicado solo en parte: ", "Applicato solo in parte: ", "\u4e00\u90e8\u306e\u307f\u9069\u7528\uff1a", "Nur teilweise angewendet: ", "\u0637\u0628\u0642 \u062c\u0632\u0626\u064a\u0627 \u0641\u0642\u0637: ", "仅部分生效：", "Slechts gedeeltelijk toegepast: ", "Aplicado apenas em parte: ", "Bara delvis tillämpat: ", "Применено только частично: ", "Zastosowano tylko częściowo: ", "일부만 적용됐어요: ") + nOk + " / " + plan.total + " " + T("lignes (droits sur certaines lignes ?)", "rows (rights on some rows?)", "l\u00edneas (\u00bfpermisos?)", "righe (permessi?)", "\u884c\uff08\u6a29\u9650\uff1f\uff09", "Zeilen (Rechte?)", "\u0633\u0637\u0631 (\u0635\u0644\u0627\u062d\u064a\u0627\u062a\u061f)", "行（可能对某些行没有权限？）", "regels (rechten op sommige regels?)", "linhas (permissões em algumas linhas?)", "rader (rättigheter på vissa rader?)", "строк (нет прав на некоторые строки?)", "wierszy (uprawnienia do niektórych wierszy?)", "행 (일부 행에 대한 권한 문제일까요?)"));
      } catch (eNv) { setToast(T("Le niveau n'a pas pu \u00eatre appliqu\u00e9 : ", "The level could not be applied: ", "No se pudo aplicar: ", "Impossibile applicare: ", "\u9069\u7528\u3067\u304d\u307e\u305b\u3093\uff1a", "Konnte nicht angewendet werden: ", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062a\u0637\u0628\u064a\u0642: ", "级别未能应用：", "Het niveau kon niet worden toegepast: ", "Não foi possível aplicar o nível: ", "Nivån kunde inte tillämpas: ", "Не удалось применить уровень: ", "Nie udało się zastosować poziomu: ", "레벨을 적용하지 못했어요: ") + String(eNv && eNv.message ? eNv.message : eNv)); }
      setNiveauBusy(false); setNiveauOuvert(false);
      setTimeout(function () { setToast(null); }, 6500);
    })();
  }
  function formatLarge(r, gagne, part) {
    var idr = idEpinglable(r);
    var v = null;
    if (idr && Object.prototype.hasOwnProperty.call(fmLocal, idr)) v = fmLocal[idr];
    else if (r && r.format_large != null) v = !!r.format_large;
    if (v != null) return v;
    return !!(gagne && (part || 0) >= 40);   /* la regle par defaut */
  }
  function basculerFormat(r, gagne, part) {
    var idr = idEpinglable(r);
    if (!idr) return;
    var neuf = !formatLarge(r, gagne, part);
    var maj = {}; maj[idr] = neuf;
    setFmLocal(function (p) { return Object.assign({}, p, maj); });
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) return;
        var rep = await supa.from("resultats").update({ format_large: neuf }).eq("id", idr);
        if (rep && rep.error) throw new Error(rep.error.message || rep.error);
      } catch (eF) {
        var retour = {}; retour[idr] = (r.format_large == null) ? null : !!r.format_large;
        setFmLocal(function (p) { return Object.assign({}, p, retour); });
        setToast(T("Le format n'a pas pu être enregistré : ", "Could not save the layout: ",
          "No se pudo guardar el formato: ", "Impossibile salvare il formato: ",
          "レイアウトを保存できませんでした：", "Format konnte nicht gespeichert werden: ", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u062d\u062c\u0645: ", "格式未能保存：", "Het formaat kon niet worden opgeslagen: ", "Não foi possível salvar o formato: ", "Formatet kunde inte sparas: ", "Не удалось сохранить формат: ", "Nie udało się zapisać formatu: ", "형식을 저장하지 못했어요: ")
          + String(eF && eF.message ? eF.message : eF));
        setTimeout(function () { setToast(null); }, 5200);
      }
    })();
  }

  /* ═══ 23/08 session 155 — LE NOM D ÉPREUVE RACCOURCI ══════════════════
     🟥 « CSO Poney 1 D Grand Prix Chp Reg Circuit Dpt » ne rentre pas dans
     un carre. Blandine : « tu ne peux pas raconter ta vie sur l encart ».
     On ote la discipline en tete (elle est deja donnee par le contexte) et
     on abrege les formules longues. Le nom COMPLET reste en base, intact :
     ce raccourci ne sert QU A l affichage.                                */
  /* 🟥 table directe, et non decodeURIComponent(escape(...)) : sur
     « PrÃÂ©paratoire » ce dernier leve « URI malformed » et ne repare rien.
     Verifie le 23/08 sur les telemat 2021 et 2024 de Rizotto d Émery.    */
  var ACCENTS_CASSES = [
    ["\u00C3\u0082\u00C2\u00A9", "\u00E9"], ["\u00C3\u0082\u00C2\u00A8", "\u00E8"],
    ["\u00C3\u0082\u00C2\u00AA", "\u00EA"], ["\u00C3\u0082\u00C2\u00A0", "\u00E0"],
    ["\u00C3\u0082\u00C2\u00A7", "\u00E7"], ["\u00C3\u0082\u00C2\u00B4", "\u00F4"],
    ["\u00C3\u0082\u00C2\u00B9", "\u00F9"], ["\u00C3\u0082\u00C2\u00AE", "\u00EE"],
    ["\u00C3\u0082\u00C2\u00AF", "\u00EF"], ["\u00C3\u0082\u00C2\u00BB", "\u00FB"],
    ["\u00C3\u0082\u00C2\u00AB", "\u00EB"], ["\u00C3\u0082\u00C2\u00A2", "\u00E2"],
    ["\u00C3\u00A9", "\u00E9"], ["\u00C3\u00A8", "\u00E8"], ["\u00C3\u00AA", "\u00EA"],
    ["\u00C3\u00A0", "\u00E0"], ["\u00C3\u00A7", "\u00E7"], ["\u00C3\u00B4", "\u00F4"],
    ["\u00C3\u00B9", "\u00F9"], ["\u00C3\u00AE", "\u00EE"], ["\u00C3\u00AF", "\u00EF"],
    ["\u00C3\u00BB", "\u00FB"], ["\u00C3\u00AB", "\u00EB"], ["\u00C3\u00A2", "\u00E2"]
  ];
  function reparerAccents(x) {
    ACCENTS_CASSES.forEach(function (p) { x = x.split(p[0]).join(p[1]); });
    return x;
  }
  function courtEpreuve(t) {
    var x = String(t || "").trim();
    if (!x) return "";
    /* 🟥 la FFE renvoie du texte doublement encode : « PrÃÂ©paratoire ».
       On repare avant tout le reste, sinon ca s affiche tel quel a l ecran. */
    if (x.indexOf("\u00C3") >= 0) x = reparerAccents(x);
    x = x.replace(/^(CSO|CCE|CSA|Dressage|Hunter|Endurance|TREC|Attelage|Western|Pony ?Games)\s+/i, "");
    x = x.replace(/Grand\s+Prix/gi, "GP");
    x = x.replace(/Championnat/gi, "Chp");
    x = x.replace(/\bChp\s+de\s+France\b/gi, "Chp France");
    x = x.replace(/\bChp\s+des\s+Territoires\b/gi, "Territoires");
    x = x.replace(/\bChp\s+R[ée]g\b/gi, "Chp Rég");
    x = x.replace(/\bChp\s+Dpt\b/gi, "Chp Dpt");
    x = x.replace(/\bCircuit\s+Dpt\b/gi, "Dpt");
    x = x.replace(/\bCircuit\s+R[ée]g\b/gi, "Rég");
    x = x.replace(/\bOpen\s+R[ée]g\b/gi, "Open Rég");
    x = x.replace(/Pr[ée]paratoire/gi, "Prépa");
    x = x.replace(/\bSp[ée]ciale\s+au\s+chrono\b/gi, "Spéciale");
    x = x.replace(/\bCriterium\s+de\s+France\b/gi, "Critérium France");
    x = x.replace(/\bet\s+-\s*/gi, "et − ");        /* « Minime 1 et - » = et moins */
    x = x.replace(/\bExcellence\b/gi, "Exc.");
    x = x.replace(/\bTour\s+de\s+France\b/gi, "TDA");
    x = x.replace(/\s{2,}/g, " ").trim();
    return x;
  }
  var epSt = React.useState({}); var epLocal = epSt[0], setEpLocal = epSt[1];
  function idEpinglable(r) {
    /* seules les lignes venues de la table ont un identifiant en base ;
       celles ecrites en dur dans CHEVAUX_FICHE portent un id "dur-N". */
    if (!r || !r.id) return null;
    return (String(r.id).indexOf("dur-") === 0) ? null : r.id;
  }
  function rangEpingle(r) {
    var idr = idEpinglable(r);
    if (!idr) return null;
    if (Object.prototype.hasOwnProperty.call(epLocal, idr)) return epLocal[idr];
    return (r.epingle_rang == null) ? null : Number(r.epingle_rang);
  }
  function basculerEpingle(r, dejaPoses) {
    var idr = idEpinglable(r);
    if (!idr) return;
    var actuel = rangEpingle(r);
    var neuf;
    if (actuel != null) neuf = null;
    else {
      if (dejaPoses >= PLAFOND_EPINGLES) {
        setToast(T("Sept épinglés au maximum — retires-en un d'abord.",
          "Seven pinned at most — remove one first.",
          "Siete fijados como máximo — quita uno antes.",
          "Massimo sette fissati — rimuovine uno prima.",
          "ピン留めは最大7件です。まず1件外してください。",
          "Höchstens sieben angeheftet — entferne zuerst eines.", "\u0633\u0628\u0639\u0629 \u0645\u062b\u0628\u062a\u0629 \u0643\u062d\u062f \u0623\u0642\u0635\u0649 \u2014 \u0623\u0632\u064a\u0644\u064a \u0648\u0627\u062d\u062f\u0627 \u0623\u0648\u0644\u0627.", "最多置顶七个——请先取消一个。", "Maximaal zeven vastgepind — haal er eerst een weg.", "No máximo sete fixados — remova um primeiro.", "Högst sju fästa — ta bort ett först.", "Закрепить можно не больше семи — сначала убери одно.", "Maksymalnie siedem przypiętych — najpierw usuń jedno.", "고정은 최대 7개예요 — 먼저 하나를 빼세요."));
        setTimeout(function () { setToast(null); }, 3000);
        return;
      }
      neuf = dejaPoses + 1;
    }
    var maj = {}; maj[idr] = neuf;
    setEpLocal(function (p) { return Object.assign({}, p, maj); });
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa) return;
        var rep = await supa.from("resultats").update({ epingle_rang: neuf }).eq("id", idr);
        if (rep && rep.error) throw new Error(rep.error.message || rep.error);
      } catch (eEp) {
        /* 🟥 aucune reparation silencieuse : on remet l affichage comme avant
           ET on le dit a l ecran. */
        var retour = {}; retour[idr] = actuel;
        setEpLocal(function (p) { return Object.assign({}, p, retour); });
        setToast(T("L'épingle n'a pas pu être enregistrée : ", "Could not save the pin: ",
          "No se pudo guardar: ", "Impossibile salvare: ", "保存できませんでした：",
          "Konnte nicht gespeichert werden: ", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u062a\u062b\u0628\u064a\u062a: ", "置顶未能保存：", "De pin kon niet worden opgeslagen: ", "Não foi possível salvar o item fixado: ", "Nålen kunde inte sparas: ", "Не удалось сохранить закрепление: ", "Nie udało się zapisać przypięcia: ", "핀을 저장하지 못했어요: ") + String(eEp && eEp.message ? eEp.message : eEp));
        setTimeout(function () { setToast(null); }, 5200);
      }
    })();
  }

  /* ═══ 23/08 session 153 — LES FAITS DU PALMARÈS ═══════════════════════
     Une seule normalisation, lue par la page ET par le résumé de la fiche.
     Elle sort : place (nombre), partants, concours, épreuve, cavalier,
     année, et le rang d épingle. Le quart vient de la FFE, jamais recalculé. */
  function faitsPalmares() {
    var out = [];
    ((lignesPourModule) || []).forEach(function (r) {
      if (!r) return;
      var pl = null;
      if (r.place != null) pl = Number(r.place);
      else { var mm = String(r.classement || "").match(/^\s*(\d+)/); if (mm) pl = Number(mm[1]); }
      out.push({
        ref: r,
        id: r.id || null,
        pl: pl,
        part: r.partants ? Number(r.partants) : null,
        nom: r.concours || "",
        ep: r.epreuve || "",
        cav: r.cavalier || "",
        an: String(r.date_epreuve || "").slice(0, 4) || String(r.annee || ""),
        quart: (r.quart == null) ? null : Number(r.quart),
        hors: (pl == null),
        epingle: rangEpingle(r),
        epinglable: !!idEpinglable(r)
      });
    });
    return out;
  }
  /* les épinglés, dans l ordre où Blandine les a posés */
  function epinglesPalmares(fts) {
    return (fts || []).filter(function (f) { return f.epingle != null; })
                      .sort(function (a, b) { return a.epingle - b.epingle; });
  }
  /* les meilleurs, comme avant : victoires, puis podiums, puis le reste,
     et à rang égal le plus gros champ d abord. */
  /* 🟥 23/08 session 159 — LE TRI RÉÉCRIT.
     L ancien rangeait par palier (1er / podium / le reste) puis par taille du
     champ. Resultat : une « 3e sur 4 » passait DEVANT une « 2e sur 30 », ce
     que Blandine a vu tout de suite. Defaut de conception de ma part.
     Desormais on classe sur un MERITE : le rang compte d abord, mais le
     champ battu le pondere. 1er sur 57 vaut mieux que 1er sur 4, et
     2e sur 30 vaut mieux que 3e sur 4.                                     */
  function meriteResultat(f) {
    if (!f || f.pl == null) return -1;
    var part = f.part || 1;
    if (part < 1) part = 1;
    /* part des concurrents battus : 1er sur 30 -> 1, dernier -> 0 */
    var battus = (part > 1) ? (part - f.pl) / (part - 1) : 0;
    /* le rang seul : 1er = 1, 2e = 0.5, 3e = 0.33… */
    var rang = 1 / f.pl;
    /* 🟥 et la TAILLE du champ departage a rang egal : sans elle, 1er sur 57
       et 1er sur 2 valaient exactement pareil (constate au banc le 23/08).
       Logarithme, pour qu un champ deux fois plus gros compte, mais pas
       deux fois plus : gagner sur 60 n est pas dix fois gagner sur 6.     */
    var ampleur = Math.log(part + 1) / Math.log(200);
    /* le rang pese le double du champ : gagner reste ce qui compte le plus */
    return rang * 2 + battus + ampleur;
  }
  function meilleursPalmares(fts) {
    return (fts || []).filter(function (f) { return f.pl != null; })
      .sort(function (a, b) {
        var d = meriteResultat(b) - meriteResultat(a);
        if (d !== 0) return d;
        return (b.part || 0) - (a.part || 0);
      });
  }
  var csSt = React.useState(false); var confSuppr = csSt[0], setConfSuppr = csSt[1];
  var menuFicheSt = React.useState(false); var menuFiche = menuFicheSt[0], setMenuFiche = menuFicheSt[1];
  var editFicheSt = React.useState(false); var editFiche = editFicheSt[0], setEditFiche = editFicheSt[1];
  var efoSt = React.useState(false); var ecurieFicheOuverte = efoSt[0], setEcurieFicheOuverte = efoSt[1]; /* 11/09 (15) : feuille FeuilleEcurieCheval (Zeus) */
  var confSupprFicheSt = React.useState(false); var confSupprFiche = confSupprFicheSt[0], setConfSupprFiche = confSupprFicheSt[1];
  var busyFicheSt = React.useState(false); var busyFiche = busyFicheSt[0], setBusyFiche = busyFicheSt[1];
  var champsFicheSt = React.useState(null); var champsFiche = champsFicheSt[0], setChampsFiche = champsFicheSt[1];
  /* 02/09 : le choix de l ecurie du cheval, dans le formulaire de la fiche.
     Il existait deja dans « Gerer mon ecurie » — Blandine ne l y avait pas
     trouve. Meme porte en base (changerClubCheval). */
  var _mcl = React.useState([]); var mesClubsFiche = _mcl[0], setMesClubsFiche = _mcl[1];
  /* 11/09 (23) — « MODIFIER LA FICHE » : le choix « Écurie du cheval » proposait les écuries de la
     personne CONNECTÉE (mesClubs) — une modératrice qui corrigeait le cheval d'une autre voyait les
     siennes. Il propose désormais celles de la PROPRIÉTAIRE (clubsDuProfil, même source que la ligne
     du menu ⋮), plus l'écurie actuelle du cheval si elle n'y figure pas. Propriétaire = personne
     connectée : liste inchangée. Rechargé à chaque changement de cheval, réponse tardive ignorée. */
  var _mcp = React.useState([]); var clubsProprioFiche = _mcp[0], setClubsProprioFiche = _mcp[1];
  React.useEffect(function () {
    var vivantCp = true;
    var idProprioCp = chevalDyn && chevalDyn.ownerId;
    setClubsProprioFiche([]);
    if (idProprioCp && typeof clubsDuProfil === "function") {
      clubsDuProfil(idProprioCp).then(function (lCp) { if (vivantCp) setClubsProprioFiche(lCp || []); }).catch(function () { });
    }
    return function () { vivantCp = false; };
  }, [chevalDyn && chevalDyn.ownerId]);
  var choixClubsFiche = (function () {
    var autreProprioCf = !!(chevalDyn && moi && chevalDyn.ownerId && chevalDyn.ownerId !== moi.id);
    var baseCf = (autreProprioCf && clubsProprioFiche.length) ? clubsProprioFiche : mesClubsFiche;
    var listeCf = (baseCf || []).slice();
    var actuelCf = String((chevalDyn && chevalDyn.club) || "").trim();
    if (actuelCf && listeCf.indexOf(actuelCf) < 0) listeCf.push(actuelCf);
    return listeCf;
  })();
  var _errCl = React.useState(""); var erreurClub = _errCl[0], setErreurClub = _errCl[1];
  var _oue = React.useState(false); var ouvrirEcu = _oue[0], setOuvrirEcu = _oue[1];
  /* 02/09 (Blandine) : « n'afficher que les classements ». Interrupteur
     D'AFFICHAGE — il ne touche RIEN en base, contrairement a la coche de
     relecture. Reversible d un tap.
     ⚠️ « Classe » = `quart === 1`, la valeur donnee par la FFE. Jamais recalcule.
     ⚠️ Les preparatoires n ont pas de quart : elles disparaissent avec le filtre.
     ⚠️ Reglage LOCAL (localStorage) : il ne suit pas sur un autre telephone et
     les visiteurs voient toujours tout. Le passer en base demanderait une
     colonne — non tranche. */
  var _rcl = React.useState(function () {
    try { var v = localStorage.getItem("hype_res_vue"); return (v === "classes" || v === "podiums" || v === "sf") ? v : "tous"; }
    catch (eRc) { return "tous"; }
  });
  var vueRes = _rcl[0], setVueRes = _rcl[1];
  function poserVueRes(v) {
    try { localStorage.setItem("hype_res_vue", v); } catch (eSc2) { }
    setVueRes(v);
  }
  React.useEffect(function () {
    var vivant = true;
    (async function () {
      try { if (typeof mesClubs === "function") { var l = await mesClubs(); if (vivant) setMesClubsFiche(l || []); } } catch (eMc) { }
    })();
    return function () { vivant = false; };
  }, []);
  function ouvrirEditFiche() { setChampsFiche({ nom: c.nom || "", race: c.race || "", age: c.age || "", discipline: c.discipline || "", teinte: (chevalDyn && chevalDyn.teinte) || "", club: (chevalDyn && chevalDyn.club) || "", gabarit: (function () { try { var oG = c.origines || {}; if (typeof oG === "string") oG = JSON.parse(oG); return (oG && (oG.gabarit === "poney" || oG.gabarit === "cheval")) ? oG.gabarit : ""; } catch (eGb) { return ""; } })() }); setEditFiche(true); setMenuFiche(false); }
  async function changerPhotoPalm() { /* 25/08 : ADMINS SEULEMENT (estModerateurHype) — changer en ligne la photo d'en-tete du palmares editorial ; stockee dans chevaux.photo_palmares (SQL a passer). Droit a elargir plus tard sur decision de Blandine. */
    try {
      var uA = await utilisateurActuel();
      if (!uA || typeof estModerateurHype !== "function" || !estModerateurHype(uA)) return;
      if (!chevalDyn || !chevalDyn.dbId) return;
      var inp = document.createElement("input");
      inp.type = "file"; inp.accept = "image/*";
      inp.onchange = function () {
        var f = inp.files && inp.files[0]; if (!f) return;
        (async function () {
          try {
            setToast(T("Envoi de la photo\u2026", "Uploading photo\u2026", "Subiendo foto\u2026", "Caricamento foto\u2026", "\u5199\u771f\u3092\u9001\u4fe1\u4e2d\u2026", "Foto wird hochgeladen\u2026", "\u062c\u0627\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0635\u0648\u0631\u0629\u2026", "正在发送照片…", "Foto uploaden…", "Enviando a foto…", "Laddar upp fotot…", "Отправка фото…", "Wysyłanie zdjęcia…", "사진 전송 중…"));
            var rU = await envoyerPhoto(f);
            if (!rU || !rU.url) { setToast(T("Envoi impossible", "Upload failed", "No se pudo subir", "Caricamento non riuscito", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093", "Upload fehlgeschlagen", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644", "无法发送", "Uploaden mislukt", "Envio impossível", "Uppladdningen misslyckades", "Отправка невозможна", "Nie udało się wysłać", "전송할 수 없어요")); setTimeout(function () { setToast(null); }, 2800); return; }
            var rS = await supa.from("chevaux").update({ photo_palmares: rU.url }).eq("id", chevalDyn.dbId);
            if (rS && rS.error) { setToast(T("Enregistrement indisponible \u2014 colonne photo_palmares \u00e0 ajouter c\u00f4t\u00e9 base", "Could not save \u2014 photo_palmares column missing in database", "No se pudo guardar \u2014 falta la columna", "Salvataggio non riuscito \u2014 colonna mancante", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht verf\u00fcgbar \u2014 Spalte photo_palmares fehlt", "\u0627\u0644\u062d\u0641\u0638 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u2014 \u064a\u062c\u0628 \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0648\u062f photo_palmares \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a", "无法保存——需要在数据库里添加 photo_palmares 列", "Opslaan niet mogelijk — kolom photo_palmares moet nog aan de database worden toegevoegd", "Gravação indisponível — coluna photo_palmares a adicionar no banco de dados", "Det går inte att spara — kolumnen photo_palmares saknas i databasen", "Сохранение недоступно — нужно добавить столбец photo_palmares в базу", "Nie można zapisać — w bazie brakuje kolumny photo_palmares", "저장할 수 없어요 — 데이터베이스에 photo_palmares 열을 추가해야 해요")); setTimeout(function () { setToast(null); }, 3400); return; }
            setChevalDyn(Object.assign({}, chevalDyn, { photo_palmares: rU.url }));
            setToast(T("Photo du palmar\u00e8s mise \u00e0 jour \u2728", "Results photo updated \u2728", "Foto actualizada \u2728", "Foto aggiornata \u2728", "\u5199\u771f\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f \u2728", "Foto aktualisiert \u2728", "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0635\u0648\u0631\u0629 \u0633\u062c\u0644 \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a \u2728", "战绩照片已更新 ✨", "Foto van het palmares bijgewerkt ✨", "Foto do histórico de resultados atualizada ✨", "Meritlistans foto uppdaterat ✨", "Фото достижений обновлено ✨", "Zdjęcie osiągnięć zaktualizowane ✨", "성적 사진이 업데이트됐어요 ✨"));
            setTimeout(function () { setToast(null); }, 2400);
          } catch (eCP) { setToast(T("Envoi impossible", "Upload failed", "No se pudo subir", "Caricamento non riuscito", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093", "Upload fehlgeschlagen", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644", "无法发送", "Uploaden mislukt", "Envio impossível", "Uppladdningen misslyckades", "Отправка невозможна", "Nie udało się wysłać", "전송할 수 없어요")); setTimeout(function () { setToast(null); }, 2800); }
        })();
      };
      inp.click();
    } catch (eA) { }
  }
  async function soumettreEditFiche() {
    if (!champsFiche || !c.dbId || busyFiche) return;
    setBusyFiche(true);
    try {
      var rEd = await modifierCheval(c.dbId, { nom: champsFiche.nom, race: champsFiche.race, age: champsFiche.age, discipline: champsFiche.discipline, teinte: champsFiche.teinte || null });
      /* 02/09 : l ecurie passe par set_cheval_club — proprietaire OU administratrice.
         ⚠️ On RELIT le resultat et on DIT l echec, on ne l avale pas. */
      var clubAvant = (chevalDyn && chevalDyn.club) || "";
      var clubVoulu = (champsFiche.club || "");
      if (clubVoulu !== clubAvant) {
        var rCl = await changerClubCheval(c.dbId, clubVoulu || null);
        if (rCl && rCl.error) {
          setErreurClub(T("L'\u00e9curie n'a pas pu \u00eatre chang\u00e9e : ", "The stable could not be changed: ", "No se pudo cambiar: ", "Impossibile cambiare: ", "\u5909\u66f4\u3067\u304d\u307e\u305b\u3093\uff1a", "Stall nicht ge\u00e4ndert: ", "\u062a\u0639\u0630\u0631 \u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0625\u0633\u0637\u0628\u0644: ", "马厩未能更改：", "De stal kon niet worden gewijzigd: ", "Não foi possível alterar a cocheira: ", "Stallet kunde inte ändras: ", "Не удалось сменить конюшню: ", "Nie udało się zmienić stajni: ", "마구간을 바꾸지 못했어요: ") + (rCl.error.message || rCl.error));
          setBusyFiche(false);
          return;
        }
        try { setChevalDyn(function (av) { return Object.assign({}, av || {}, { club: clubVoulu || null }); }); } catch (eSc) { }
      }
      if (rEd && rEd.error) {   /* (834) l echec se dit, il n est plus avale */
        setErreurClub(T("La fiche n'a pas pu \u00eatre enregistr\u00e9e (droits insuffisants ?).", "The profile could not be saved (insufficient rights?).", "No se pudo guardar la ficha (\u00bfpermisos insuficientes?).", "Impossibile salvare la scheda (permessi insufficienti?).", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\uff08\u6a29\u9650\u4e0d\u8db3\uff1f\uff09\u3002", "Die Karte konnte nicht gespeichert werden (fehlende Rechte?).", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 (\u0635\u0644\u0627\u062d\u064a\u0627\u062a \u063a\u064a\u0631 \u0643\u0627\u0641\u064a\u0629\u061f).", "资料未能保存（权限不足？）。", "De pagina kon niet worden opgeslagen (onvoldoende rechten?).", "Não foi possível salvar a ficha (permissões insuficientes?).", "Sidan kunde inte sparas (otillräckliga rättigheter?).", "Не удалось сохранить карточку (недостаточно прав?).", "Nie udało się zapisać karty (brak uprawnień?).", "프로필을 저장하지 못했어요 (권한이 부족한가요?)."));
      }
      if ((!rEd || !rEd.error) && c.dbId) {   /* (843) le gabarit choisi est range dans les origines */
        try {
          var ogG = c.origines || {}; if (typeof ogG === "string") ogG = JSON.parse(ogG);
          var gbAvant = (ogG && (ogG.gabarit === "poney" || ogG.gabarit === "cheval")) ? ogG.gabarit : "";
          if ((champsFiche.gabarit || "") !== gbAvant) {
            var ogN2 = Object.assign({}, ogG || {}); if (champsFiche.gabarit) ogN2.gabarit = champsFiche.gabarit; else delete ogN2.gabarit;
            var rGb = await hypeMajOriginesCheval(c.dbId, { origines: ogN2, race: champsFiche.race || null, age: champsFiche.age || null });
            if (rGb && !rGb.error && rGb.data && rGb.data.length) { setChevalDyn(function (pG) { return Object.assign({}, pG || {}, { origines: ogN2 }); }); }
          }
        } catch (eGb2) { }
      }
      if (!rEd || !rEd.error) {
        setChevalDyn(Object.assign({}, chevalDyn, { teinte: champsFiche.teinte || null, nom: champsFiche.nom, race: champsFiche.race, age: champsFiche.age, discipline: champsFiche.discipline, info: [champsFiche.race, champsFiche.age, champsFiche.discipline].filter(Boolean).join(" · ") }));
        setEditFiche(false);
      }
    } catch (eEd) { }
    setBusyFiche(false);
  }
  /* 22/08 session 152 : on retient le cheval visé avant d ouvrir l import,
     l ecran d import ne sait pas de quelle fiche il vient.            */
  function ouvrirImportFFE() {
/* 🟩 06/09 (Blandine : "je veux bien les droits pour ajouter les resultats sur
     tous les chevaux en tant qu'admin, pour l'instant on finalisera les details plus
     tard") — `estModerateurHype(moi)` en plus de la propriete, meme principe que
     partout ailleurs dans le fichier ou un statut de moderatrice ouvre un passage. */
    if (!(chevalDyn && moi && (chevalDyn.ownerId === moi.id || estLieFiche || estModerateurHype(moi) || memeEcurieCh))) { bientot(); return; }   /* 30/10 : + meme ecurie (le lien etait affiche mais repondait « Bientot ») */
    try {
      window.HYPE_IMPORT_VERROU_AFFICHAGE = !(chevalDyn.ownerId === moi.id || estModerateurHype(moi));   /* 30/10 : seule la proprietaire (ou une moderatrice) regle l affichage */
      window.HYPE_IMPORT_CAVALIERE = false; window.HYPE_IMPORT_MULTI = false;   /* 07/10 (694) : import depuis une fiche cheval = mode cheval */
      window.HYPE_CHEVAL_IMPORT = c.dbId || null;
      window.HYPE_CHEVAL_IMPORT_NOM = (c && c.nom) || null;
      window.localStorage.removeItem("hype_cheval_import"); /* 26/08 : la memoire collante est PURGEE — ce repli rattachait les telemat au DERNIER cheval ouvert d une session passee (72 lignes de Rizotto retrouvees sur la fiche de Vallieres). Une cible d import ne se devine JAMAIS. */
    } catch (eCI) { }
    setPanneau(null);
    setEcran("import-resultats");
  }

  async function confirmerSupprFiche() {
    if (!c.dbId || busyFiche) return;
    if (!confSupprFiche) { setConfSupprFiche(true); return; }
    setBusyFiche(true);
    try { await supprimerCheval(c.dbId); setEcran("moncavalier"); } catch (eSf) { }
    setBusyFiche(false);
  }
  var pehSt = React.useState(false); var partageEH = pehSt[0], setPartageEH = pehSt[1];
  var portSt = React.useState(false); var portOccupe = portSt[0], setPortOccupe = portSt[1];  /* 22/08 : clic en cours sur le bandeau « a la porte » */
  var portPlSt = React.useState(false); var portPlein = portPlSt[0], setPortPlein = portPlSt[1];  /* 22/08 : la place du plan gratuit est prise */
  var tagSt = React.useState(null); var tagOuvert = tagSt[0], setTagOuvert = tagSt[1];
  var _tcm = React.useState(null), tagCmOuvert = _tcm[0], setTagCmOuvert = _tcm[1];   /* 13/09 (63) : le commentaire dont la liste d'identification est ouverte */
  var _tcl = React.useState({}), tagsCm = _tcl[0], setTagsCm = _tcl[1];               /* 13/09 (63) : id du commentaire -> personnes et chevaux identifies */
  var tagCiblesSt = React.useState(null); var tagCibles = tagCiblesSt[0], setTagCibles = tagCiblesSt[1];
  async function chargerTagCibles() {
    var out = { chevaux: [], amis: [], ecuries: [] };
    try { var u = await utilisateurActuel();
      try { for (var hid in CHEVAUX_FICHE) { var cf = CHEVAUX_FICHE[hid]; if (cf) out.chevaux.push({ id: hid, nom: cf.nom }); } } catch (eC) { }
      try { var rc = await supa.from("chevaux").select("id, nom").is("supprime_le", null).limit(50); ((rc && rc.data) || []).forEach(function (c) { out.chevaux.push({ id: "db:" + c.id, nom: c.nom }); }); } catch (eD) { }
      try { if (typeof mesAmis === "function") { var ra = await mesAmis(); ((ra && ra.data) || []).forEach(function (a) { out.amis.push({ id: a.id, nom: a.pseudo, photo: a.avatar_url }); }); } } catch (eA) { }
      try { if (profil && profil.ecurie) out.ecuries.push({ id: profil.ecurie, nom: profil.ecurie }); if (profil && profil.ecurie2) out.ecuries.push({ id: profil.ecurie2, nom: profil.ecurie2 }); } catch (eE) { }
    } catch (e) { }
    setTagCibles(out);
  }
  function ouvrirTag(u) { setTagOuvert(u); if (!tagCibles) chargerTagCibles(); }
  async function poserTag(type, cid, cnom) {
    try { var r = await identifierSouvenir(tagOuvert, type, cid, cnom);
      if (r && r.error) { setToast(T("Identification impossible", "Tag failed", "Error", "Errore", "\u5931\u6557", "Identifizierung nicht möglich", "\u062a\u0639\u0630\u0631\u062a \u0627\u0644\u0625\u0634\u0627\u0631\u0629", "无法标记", "Taggen mislukt", "Marcação impossível", "Det gick inte att tagga", "Не удалось отметить", "Nie można oznaczyć", "태그할 수 없어요")); }
      else { setToast((type === "ecurie") ? T("Ajout\u00e9 \u00e0 l'\u00e9curie", "Added to stable", "A\u00f1adido", "Aggiunto", "\u8ffd\u52a0", "Zum Stall hinzugefügt", "\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", "已添加到马厩", "Toegevoegd aan de stal", "Adicionado à cocheira", "Tillagt i stallet", "Добавлено в конюшню", "Dodano do stajni", "마구간에 추가됐어요") : T("Proposition envoy\u00e9e", "Request sent", "Enviado", "Inviato", "\u9001\u4fe1\u3057\u307e\u3057\u305f", "Vorschlag gesendet", "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0642\u062a\u0631\u0627\u062d", "提议已发送", "Voorstel verstuurd", "Sugestão enviada", "Förslag skickat", "Предложение отправлено", "Propozycja wysłana", "제안을 보냈어요")); setTimeout(function () { setToast(null); }, 2200); }
    } catch (e) { }
    setTagOuvert(null);
  }
  React.useEffect(function () { if (chevalDyn) setPartageEH(!!chevalDyn.partage_ecurie_hype); }, [chevalDyn]);
  async function basculerPartageEH() {
    try {
      if (!chevalDyn || !chevalDyn.dbId || typeof supa === "undefined" || !supa) return;
      var nv = !partageEH; setPartageEH(nv);
      var r = await supa.from("chevaux").update({ partage_ecurie_hype: nv }).eq("id", chevalDyn.dbId);
      if (r && r.error) { setPartageEH(!nv); setToast(T("Partage indisponible pour le moment", "Sharing unavailable right now", "Compartir no disponible", "Condivisione non disponibile", "現在共有できません", "Teilen derzeit nicht verfügbar", "\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u062d\u0627\u0644\u064a\u0627", "暂时无法分享", "Delen is nu niet beschikbaar", "Compartilhamento indisponível no momento", "Delning är inte tillgänglig just nu", "Делиться пока нельзя", "Udostępnianie jest chwilowo niedostępne", "지금은 공유할 수 없어요")); setTimeout(function(){ setToast(null); }, 2400); }
      else { setToast(nv ? T("Visible sur l'Écurie Hype ✨", "Visible on the Écurie Hype ✨", "Visible en la Écurie Hype ✨", "Visibile sull'Écurie Hype ✨", "Écurie Hype に公開 ✨", "Sichtbar im Hype-Stall ✨", "\u0638\u0627\u0647\u0631 \u0641\u064a \u0625\u0633\u0637\u0628\u0644 Hype \u2728", "已在 Hype 马厩中显示 ✨", "Zichtbaar in de Écurie Hype ✨", "Visível na Cocheira Hype ✨", "Synlig på Écurie Hype ✨", "Видно в Écurie Hype ✨", "Widoczne w Écurie Hype ✨", "Écurie Hype에 표시돼요 ✨") : T("Retiré de l'Écurie Hype", "Removed from the Écurie Hype", "Retirado de la Écurie Hype", "Rimosso dall'Écurie Hype", "Écurie Hype から削除", "Aus dem Hype-Stall entfernt", "\u062a\u0645\u062a \u0627\u0644\u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u0625\u0633\u0637\u0628\u0644 Hype", "已从 Hype 马厩中移除", "Verwijderd uit de Écurie Hype", "Removido da Cocheira Hype", "Borttagen från Écurie Hype", "Убрано из Écurie Hype", "Usunięto z Écurie Hype", "Écurie Hype에서 제외됐어요")); setTimeout(function(){ setToast(null); }, 2000); }
    } catch (eP) { }
  }
  /* ===== HISTOIRE DU CHEVAL — VRAI EDITEUR (02/08) =====
     Avant : collerHistoire() lisait le presse-papiers et, en cas d echec, ouvrait un
     window.prompt — un champ NATIF d une seule ligne, sans retour a la ligne, qui tronque
     visuellement tout texte long. Impossible d y ecrire une histoire (bug signale par
     Blandine : « une pop up avec une seule ligne ou deux, on voit rien »). Safari a par
     ailleurs durci l acces au presse-papiers, donc le chemin automatique echouait souvent,
     et la fonction sortait en silence sur trois conditions differentes.
     Desormais : le meme panneau que le recit du cavalier et l histoire de l ecurie —
     textarea de 9 lignes redimensionnable, 4000 caracteres, compteur, bouton Enregistrer.
     Le presse-papiers devient un simple raccourci « Coller », plus le seul chemin.
     La fiche Cheval est le SEUL editeur de cette donnee (decision Blandine du 02/08) :
     les autres pages l affichent, jamais ne l ecrivent. */
  /* 02/08 : edition de l indice (IPO / ISO...) depuis la carte Origines. L ancienne version
     passait par window.prompt — meme piege que l histoire : champ natif, aucun message en cas
     d echec. Petit panneau coherent avec les autres, un seul champ. */
  var eiSt = React.useState(false); var editIx = eiSt[0], setEditIx = eiSt[1];
  var ixTSt = React.useState(""); var ixTxt = ixTSt[0], setIxTxt = ixTSt[1];
  var ixNSt = React.useState("IPO"); var ixNom = ixNSt[0], setIxNom = ixNSt[1];
  function ouvrirEditIndice() {
    try {
      var og0 = (chevalDyn && chevalDyn.origines) || (c && c.origines) || {};
      var i0 = (og0.indices || [])[0];
      setIxNom((i0 && i0[0]) ? String(i0[0]) : "IPO");
      setIxTxt((i0 && i0[1]) ? String(i0[1]) : "");
      setEditIx(true);
    } catch (eOi) { setEditIx(true); }
  }
  async function sauverIndice() {
    var v = String(ixTxt || "").trim().slice(0, 12);
    var n = String(ixNom || "IPO").trim().slice(0, 8).toUpperCase() || "IPO";
    if (!(chevalDyn && chevalDyn.dbId) || typeof supa === "undefined" || !supa) {
      setToast(T("Fiche non enregistrée en base — impossible de sauvegarder.", "Profile not saved in the database — cannot save.", "Ficha no guardada en la base.", "Scheda non salvata nel database.", "データベースに未保存のため保存できません。", "Profil nicht in der Datenbank.", "\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u062d\u0641\u0648\u0638\u0629 \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u2014 \u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638.", "资料没有保存在数据库里——无法保存。", "Pagina niet opgeslagen in de database — opslaan niet mogelijk.", "Ficha não registrada no banco de dados — impossível salvar.", "Sidan är inte sparad i databasen — det går inte att spara.", "Карточка не сохранена в базе — сохранить невозможно.", "Karta nie jest zapisana w bazie — nie można zapisać.", "프로필이 데이터베이스에 저장되어 있지 않아서 저장할 수 없어요."));
      setTimeout(function () { setToast(null); }, 2800); return;
    }
    try {
      var ogN = Object.assign({}, (chevalDyn && chevalDyn.origines) || {}, { indices: v ? [[n, v, ""]] : [] });
      var rIx = await supa.from("chevaux").update({ origines: ogN }).eq("id", chevalDyn.dbId);
      if (rIx && rIx.error) { setToast(T("Enregistrement impossible", "Could not save", "No se pudo guardar", "Impossibile salvare", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht m\u00f6glich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638", "无法保存", "Opslaan niet mogelijk", "Não foi possível salvar", "Det gick inte att spara", "Не удалось сохранить", "Nie udało się zapisać", "저장할 수 없어요")); }
      else { setChevalDyn(Object.assign({}, chevalDyn, { origines: ogN })); setEditIx(false); setToast(T("Indice enregistr\u00e9 \u2728", "Index saved \u2728", "\u00cdndice guardado \u2728", "Indice salvato \u2728", "\u4fdd\u5b58\u3057\u307e\u3057\u305f \u2728", "Index gespeichert \u2728", "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0645\u0624\u0634\u0631 \u2728", "提示已保存 ✨", "Hint opgeslagen ✨", "Dica salva ✨", "Ledtråd sparad ✨", "Подсказка сохранена ✨", "Wskazówka zapisana ✨", "힌트가 저장됐어요 ✨")); }
    } catch (eSi) { setToast(T("Enregistrement impossible", "Could not save", "No se pudo guardar", "Impossibile salvare", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht m\u00f6glich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638", "无法保存", "Opslaan niet mogelijk", "Não foi possível salvar", "Det gick inte att spara", "Не удалось сохранить", "Nie udało się zapisać", "저장할 수 없어요")); }
    setTimeout(function () { setToast(null); }, 2400);
  }
  var ehSt = React.useState(false); var editHist = ehSt[0], setEditHist = ehSt[1];
  var htSt = React.useState(""); var histTxt = htSt[0], setHistTxt = htSt[1];
  var hbSt = React.useState(false); var histBusy = hbSt[0], setHistBusy = hbSt[1];
  /* 28/08 (Blandine, trois heures d'ecriture qui ont failli disparaitre) :
     BROUILLON AUTOMATIQUE. Chaque frappe est enregistree en local, par cheval.
     A la reouverture, si un brouillon est plus long que ce qui est en base, il
     est propose a la place — on ne perd plus jamais un texte, quelle que soit
     la cause (bouton inatteignable, app rechargee par iOS, fermeture par
     erreur...). Le brouillon est efface une fois l'enregistrement reussi. */
  function cleBrouillonHist() { return "hype_brouillon_histoire:" + ((chevalDyn && chevalDyn.dbId) || (c && c.id) || "x"); }
  function ecrireBrouillonHist(txt) { try { localStorage.setItem(cleBrouillonHist(), String(txt || "")); } catch (eB) { } }
  function effacerBrouillonHist() { try { localStorage.removeItem(cleBrouillonHist()); } catch (eB2) { } }
  function ouvrirEditHistoire() {
    var enBase = String((chevalDyn && chevalDyn.dbId && !estMonChevalFiche) ? (histPerso || "") : ((chevalDyn && chevalDyn.histoire) || (c && c.histoire) || ""));
    var brouillon = "";
    try { brouillon = String(localStorage.getItem(cleBrouillonHist()) || ""); } catch (eB3) { }
    /* On ne reprend le brouillon que s'il apporte vraiment quelque chose de plus :
       jamais de texte plus court que celui deja enregistre. */
    setHistTxt((brouillon && brouillon.trim().length > enBase.trim().length) ? brouillon : enBase);
    setEditHist(true);
  }
  async function collerDansHistoire() {
    try {
      var txtC = "";
      try { if (navigator.clipboard && navigator.clipboard.readText) txtC = await navigator.clipboard.readText(); } catch (eC) { txtC = ""; }
      txtC = String(txtC || "").trim();
      if (!txtC) { setToast(T("Presse-papiers vide ou refusé — écris directement ci-dessous.", "Clipboard empty or blocked — write below instead.", "Portapapeles vacío o bloqueado — escribe abajo.", "Appunti vuoti o bloccati — scrivi qui sotto.", "クリップボードが空か拒否されました。下に直接入力してください。", "Zwischenablage leer oder blockiert — schreibe unten.", "\u0627\u0644\u062d\u0627\u0641\u0638\u0629 \u0641\u0627\u0631\u063a\u0629 \u0623\u0648 \u0645\u0631\u0641\u0648\u0636\u0629 \u2014 \u0627\u0643\u062a\u0628\u064a \u0645\u0628\u0627\u0634\u0631\u0629 \u0623\u062f\u0646\u0627\u0647.", "剪贴板为空或被拒绝——请直接在下方输入。", "Klembord leeg of geweigerd — schrijf hieronder direct.", "Área de transferência vazia ou recusada — escreva diretamente abaixo.", "Urklipp tomt eller blockerat — skriv direkt nedan i stället.", "Буфер обмена пуст или доступ отклонён — пиши прямо ниже.", "Schowek pusty lub zablokowany — napisz bezpośrednio poniżej.", "클립보드가 비어 있거나 차단됐어요 — 아래에 직접 쓰세요.")); setTimeout(function () { setToast(null); }, 2600); return; }
      setHistTxt(function (av) { return String((av ? av + "\n\n" : "") + txtC).slice(0, 4000); });
    } catch (eH0) { }
  }
  async function sauverHistoireCheval() {
    var txtH = String(histTxt || "").trim().slice(0, 4000);
    if (!chevalDyn || !chevalDyn.dbId || typeof supa === "undefined" || !supa) {
      setToast(T("Fiche non enregistrée en base — impossible de sauvegarder. Ton texte est conservé, ne ferme pas.", "Profile not saved in the database — cannot save. Your text is kept, don't close.", "Ficha no guardada en la base — imposible guardar. Tu texto se conserva.", "Scheda non salvata nel database — impossibile salvare. Il testo è conservato.", "データベースに未保存のため保存できません。入力内容は保持されています。", "Profil nicht in der Datenbank — Speichern nicht möglich. Dein Text bleibt erhalten.", "\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u062d\u0641\u0648\u0638\u0629 \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u2014 \u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638. \u0646\u0635\u0643 \u0645\u062d\u0641\u0648\u0638\u060c \u0644\u0627 \u062a\u063a\u0644\u0642\u064a.", "资料没有保存在数据库里——无法保存。你的文字还在，请不要关闭。", "Pagina niet opgeslagen in de database — opslaan niet mogelijk. Je tekst blijft bewaard, sluit niet af.", "Ficha não registrada no banco de dados — impossível salvar. Seu texto foi mantido, não feche.", "Sidan är inte sparad i databasen — det går inte att spara. Din text finns kvar, stäng inte.", "Карточка не сохранена в базе — сохранить невозможно. Твой текст сохранён, не закрывай.", "Karta nie jest zapisana w bazie — nie można zapisać. Twój tekst jest zachowany, nie zamykaj.", "프로필이 데이터베이스에 저장되어 있지 않아서 저장할 수 없어요. 작성한 글은 그대로 있으니 닫지 마세요."));
      /* 28/08 : PLUS DE DISPARITION AUTOMATIQUE sur les echecs — un message de
         3 s n'est jamais lu au bon moment (meme regle que les envois de medias).
         Il reste jusqu'a ce que Blandine le ferme. */
      return;
    }
    setHistBusy(true);
    var okHist = false;
    try {
      /* 02/09 : aiguillage. Mon cheval -> chevaux.histoire (l officielle, visible partout).
         Cheval d une autre -> chevaux_histoires, ma ligne a moi, jamais remontee cote ecurie. */
      var rH = estMonChevalFiche
        ? await avecGarde(supa.from("chevaux").update({ histoire: txtH || null }).eq("id", chevalDyn.dbId), 10000)
        : await avecGarde(enregistrerHistoirePerso(chevalDyn.dbId, txtH), 10000);
      if (rH && rH.__garde) { setToast(T("R\u00e9seau injoignable \u2014 rien n'a \u00e9t\u00e9 enregistr\u00e9. R\u00e9essaie.", "Network unreachable \u2014 nothing was saved. Try again.", "Red inaccesible \u2014 no se guard\u00f3 nada.", "Rete irraggiungibile \u2014 nulla \u00e8 stato salvato.", "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u63a5\u7d9a\u3067\u304d\u307e\u305b\u3093\u3002", "Netz nicht erreichbar \u2014 nichts gespeichert.", "\u0627\u0644\u0634\u0628\u0643\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u2014 \u0644\u0645 \u064a\u062d\u0641\u0638 \u0634\u064a\u0621. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "网络无法连接——没有保存任何内容。请重试。", "Netwerk onbereikbaar — er is niets opgeslagen. Probeer het opnieuw.", "Rede inacessível — nada foi salvo. Tente de novo.", "Nätverket nås inte — ingenting sparades. Försök igen.", "Нет связи с сетью — ничего не сохранено. Попробуй ещё раз.", "Brak połączenia z siecią — nic nie zostało zapisane. Spróbuj jeszcze raz.", "네트워크에 연결할 수 없어요 — 아무것도 저장되지 않았어요. 다시 시도해 주세요.")); setHistBusy(false); return; } /* 28/08 : message d'echec persistant, plus d'effacement automatique */
      if (rH && rH.error) { setToast(T("Enregistrement impossible pour le moment", "Could not save right now", "No se pudo guardar", "Salvataggio non riuscito", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern derzeit nicht möglich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638 \u062d\u0627\u0644\u064a\u0627", "暂时无法保存", "Opslaan lukt nu niet", "Não foi possível salvar no momento", "Det går inte att spara just nu", "Сейчас сохранить невозможно", "Teraz nie można zapisać", "지금은 저장할 수 없어요")); }
      else {
        okHist = true;
        effacerBrouillonHist(); /* 28/08 : enregistre pour de vrai, le brouillon n'a plus lieu d'etre */
        if (estMonChevalFiche) setChevalDyn(Object.assign({}, chevalDyn, { histoire: txtH || null }));
        else setHistPerso(txtH || "");
        setEditHist(false);
        setToast(T("Histoire mise \u00e0 jour \u2728", "Story updated \u2728", "Historia actualizada \u2728", "Storia aggiornata \u2728", "\u7269\u8a9e\u3092\u66f4\u65b0 \u2728", "Geschichte aktualisiert \u2728", "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0642\u0635\u0629 \u2728", "故事已更新 ✨", "Verhaal bijgewerkt ✨", "História atualizada ✨", "Berättelsen uppdaterad ✨", "История обновлена ✨", "Historia zaktualizowana ✨", "이야기가 업데이트됐어요 ✨"));
      }
    } catch (eH) { setToast(T("Enregistrement impossible pour le moment", "Could not save right now", "No se pudo guardar", "Salvataggio non riuscito", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern derzeit nicht möglich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638 \u062d\u0627\u0644\u064a\u0627", "暂时无法保存", "Opslaan lukt nu niet", "Não foi possível salvar no momento", "Det går inte att spara just nu", "Сейчас сохранить невозможно", "Teraz nie można zapisać", "지금은 저장할 수 없어요")); }
    setHistBusy(false);
    /* 28/08 : seul le message de SUCCES s'efface tout seul. Les echecs restent
       affiches jusqu'a fermeture — sinon on croit que c'est enregistre. */
    if (okHist) setTimeout(function () { setToast(null); }, 2400);
  }
  var arSt = React.useState(false); var ajoutRes = arSt[0], setAjoutRes = arSt[1]; /* 30/07 : ajout de resultat fonctionnel (demande Blandine) */
  var rlSt = React.useState({ annee: "", event: "", ds: "", rang: "1" }); var resLocal = rlSt[0], setResLocal = rlSt[1];
  /* 🟩 05/09 (Blandine : « et les performances des descendants et ascendants », puis
     « oui vas-y ») — meme principe que l'import d'origines : une capture peut montrer PLUSIEURS
     resultats (un historique), donc ce deuxieme outil ramene une LISTE a cocher plutot qu'un
     formulaire unique. Rien n'est enregistre avant que Blandine ait coche puis valide. */
  var irSt = React.useState(false); var importResEnCours = irSt[0], setImportResEnCours = irSt[1];
  var itSt = React.useState(null); var importResTrouves = itSt[0], setImportResTrouves = itSt[1];
  var imrSt = React.useState(null); var importResMsg = imrSt[0], setImportResMsg = imrSt[1];
  var refImportRes = React.useRef(null);
  function libelleRang(r) {
    return r === "1" ? T("1\u1d49\u02b3", "1st", "1\u00ba", "1\u00b0", "1\u4f4d", "1.", "\u0627\u0644\u0623\u0648\u0644", "1st", "1st", "1st", "1st", "1st", "1st", "1st")
      : r === "2" ? T("2\u1d49", "2nd", "2\u00ba", "2\u00b0", "2\u4f4d", "2.", "\u0627\u0644\u062b\u0627\u0646\u064a", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd")
      : r === "3" ? T("3\u1d49", "3rd", "3\u00ba", "3\u00b0", "3\u4f4d", "3.", "\u0627\u0644\u062b\u0627\u0644\u062b", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd")
      : r === "classe" ? T("Class\u00e9", "Placed", "Clasificado", "Classificato", "\u5165\u8ce3", "Platziert", "\u0645\u0635\u0646\u0641", "获得名次", "Geplaatst", "Classificado", "Placerad", "Призёр", "Sklasyfikowany", "입상")
      : (r || "\u2014");
  }
  /* 18/10 (perf g6) : le code vit desormais dans hypeLireCapturePalmares / hypeEnregistrerCapturePalmares (memes lignes, partagees). */
  async function importerResultatsDepuisCapture(fichier) {
    return hypeLireCapturePalmares(fichier, { T: T, setImportResEnCours: setImportResEnCours, setImportResMsg: setImportResMsg, setImportResTrouves: setImportResTrouves, chevalDyn: chevalDyn, c: c, resDb: resDb, moi: moi });
  }
  async function validerImportResultats() {
    return hypeEnregistrerCapturePalmares({ T: T, importResTrouves: importResTrouves, setImportResTrouves: setImportResTrouves, setAjoutRes: setAjoutRes, setToast: setToast, setResDb: setResDb, chevalDyn: chevalDyn, moi: moi });
  }
  /* 03/09 (Blandine) : « elle doit egalement pouvoir ajouter ses resultats ».
     La saisie etait reservee a la PROPRIETAIRE du cheval, a CINQ endroits de la
     fiche ; ailleurs le bouton repondait « Bientot ». Elle s'ouvre desormais aux
     cavalieres RATTACHEES — meme droit que les albums, l'histoire et la photo.
     ⚠️ Un resultat appartient au COUPLE cavalier + cheval : le parcours de
     Blandine sur Dakota et celui de son eleve ne sont PAS le meme resultat, les
     deux doivent coexister. La ligne porte user_id, donc chacune ecrit la sienne.
     ⚠️ NE PLUS reecrire cette condition ailleurs : utiliser peutSaisirResultat. */
/* 🟩 06/09 (Blandine : "je veux bien les droits pour ajouter les resultats sur
     tous les chevaux en tant qu'admin, pour l'instant on finalisera les details plus
     tard") — `estModerateurHype(moi)` en plus de la propriete, meme principe que
     partout ailleurs dans le fichier ou un statut de moderatrice ouvre un passage. */
  var memeEcurieCh = (function () {   /* 10/10 (860) cheval de MON ecurie */
    try {
      if (!moi || !chevalDyn || !(mesClubsFiche && mesClubsFiche.length)) return false;
      var cCh = String(chevalDyn.club || "").trim(); if (!cCh || cCh === "__perso__") cCh = String(chevalDyn.ecurieCh || "").trim();
      if (!cCh || cCh === "__perso__") return false;
      var nCh = String((typeof noyauEcurie === "function" ? (noyauEcurie(cCh) || cCh) : cCh)).toLowerCase();
      return mesClubsFiche.some(function (mC) { var nM = String((typeof noyauEcurie === "function" ? (noyauEcurie(mC) || mC) : mC)).toLowerCase(); return !!nM && nM === nCh; });
    } catch (eMe) { return false; }
  })();
  var peutSaisirResultat = !!(chevalDyn && chevalDyn.dbId && moi && (chevalDyn.ownerId === moi.id || estLieFiche || estModerateurHype(moi) || memeEcurieCh /* (860) */));
  function ouvrirAjoutResultat() { setResLocal({ annee: String(new Date().getFullYear()), event: "", ds: "", rang: "1" }); setAjoutRes(true); }
  async function sauverResultat() {
    function echec() { setToast(T("Enregistrement impossible pour le moment", "Could not save right now", "No se pudo guardar", "Salvataggio non riuscito", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern derzeit nicht m\u00f6glich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638 \u062d\u0627\u0644\u064a\u0627", "暂时无法保存", "Opslaan lukt nu niet", "Não foi possível salvar no momento", "Det går inte att spara just nu", "Сейчас сохранить невозможно", "Teraz nie można zapisać", "지금은 저장할 수 없어요")); setTimeout(function () { setToast(null); }, 2400); }
    try {
      var evV = (resLocal.event || "").trim(); if (!evV) { setAjoutRes(false); return; }
      var rgV = resLocal.rang === "1" ? "1\u1d49\u02b3" : resLocal.rang === "2" ? "2\u1d49" : resLocal.rang === "3" ? "3\u1d49" : resLocal.rang === "classe" ? T("Class\u00e9", "Placed", "Clasificado", "Classificato", "\u5165\u8cde", "Platziert", "\u0645\u0635\u0646\u0641", "获得名次", "Geplaatst", "Classificado", "Placerad", "Призёр", "Sklasyfikowany", "입상") : ((resLocal.rang || "").trim() ? (resLocal.rang || "").trim() + "\u1d49" : "");
      if (!(chevalDyn && chevalDyn.dbId) || typeof supa === "undefined" || !supa) {
        setToast(T("Fiche non enregistrée en base — impossible d'ajouter un résultat.", "Profile not saved in the database — cannot add a result.", "Ficha no guardada en la base — imposible añadir un resultado.", "Scheda non salvata nel database — impossibile aggiungere un risultato.", "データベースに未保存のため結果を追加できません。", "Profil nicht in der Datenbank — Ergebnis kann nicht hinzugefügt werden.", "\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u062d\u0641\u0648\u0638\u0629 \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u2014 \u062a\u0639\u0630\u0631\u062a \u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629.", "资料没有保存在数据库里——无法添加成绩。", "Pagina niet opgeslagen in de database — een uitslag toevoegen is niet mogelijk.", "Ficha não registrada no banco de dados — impossível adicionar um resultado.", "Sidan är inte sparad i databasen — det går inte att lägga till ett resultat.", "Карточка не сохранена в базе — добавить результат невозможно.", "Karta nie jest zapisana w bazie — nie można dodać wyniku.", "프로필이 데이터베이스에 저장되어 있지 않아서 결과를 추가할 수 없어요."));
        setTimeout(function () { setToast(null); }, 2800); return;
      }
      var uR = moi; if (!uR) { try { uR = await utilisateurActuel(); } catch (eU) { } }
      if (!uR) { setToast(T("Connecte-toi pour ajouter un résultat.", "Sign in to add a result.", "Conéctate para añadir un resultado.", "Accedi per aggiungere un risultato.", "結果を追加するにはログインしてください。", "Melde dich an, um ein Ergebnis hinzuzufügen.", "\u0633\u062c\u0644\u064a \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629.", "请登录后添加成绩。", "Log in om een resultaat toe te voegen.", "Entre na sua conta para adicionar um resultado.", "Logga in för att lägga till ett resultat.", "Войди, чтобы добавить результат.", "Zaloguj się, aby dodać wynik.", "결과를 추가하려면 로그인하세요.")); setTimeout(function () { setToast(null); }, 2600); return; }
      var anV = (resLocal.annee || "").trim();
      /* 03/09 : ANTI-DOUBLON A LA SAISIE MANUELLE.
         Le garde-fou existait deja cote import FFE, pas ici. Le cas courant : on
         saisit un concours a la main, puis on importe le PDF du meme concours —
         et la ligne apparait deux fois. On compare sur le COUPLE cavaliere +
         cheval + concours (+ annee si elle est connue) : le meme concours saisi
         par une AUTRE cavaliere sur le meme cheval reste un resultat distinct et
         n'est jamais bloque. */
      try {
        var normC = function (t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); };
        var dejaLa = (resDb || []).filter(function (rD) {
          if (!rD || rD.user_id !== uR.id) return false;
          if (normC(rD.concours) !== normC(evV)) return false;
          if (anV && rD.annee && String(rD.annee).trim() !== anV) return false;
          return true;
        })[0];
        if (dejaLa) {
          var quoi = (dejaLa.epreuve ? (" \u00b7 " + dejaLa.epreuve) : "");
          var ok = window.confirm("Tu as d\u00e9j\u00e0 un r\u00e9sultat sur \u00ab " + evV + " \u00bb" + (anV ? (" en " + anV) : "") + quoi + ".\n\nL'ajouter quand m\u00eame ?");
          if (!ok) { setAjoutRes(false); return; }
        }
      } catch (eDb) { }
      var base = { user_id: uR.id, cheval_id: chevalDyn.dbId, concours: evV, classement: rgV || null };
      /* La colonne `annee` n existe peut-etre pas encore : on tente AVEC, et on repli sans
         elle si Postgres la refuse. Le resultat est alors date par created_at. Aucun echec
         visible pour Blandine dans un cas comme dans l autre. */
      var rR = await supa.from("resultats").insert(Object.assign({}, base, anV ? { annee: anV } : {})).select().single();
      if (rR && rR.error && anV) { rR = await supa.from("resultats").insert(base).select().single(); }
      if (rR && rR.error) { echec(); return; }
      var ligne = (rR && rR.data) || Object.assign({}, base, { created_at: new Date().toISOString() });
      setAjoutRes(false);
      setResDb(function (av) { return [ligne].concat(av || []); });
      setToast(T("R\u00e9sultat ajout\u00e9 \ud83c\udfc6", "Result added \ud83c\udfc6", "Resultado a\u00f1adido \ud83c\udfc6", "Risultato aggiunto \ud83c\udfc6", "\u7d50\u679c\u3092\u8ffd\u52a0 \ud83c\udfc6", "Ergebnis hinzugef\u00fcgt \ud83c\udfc6", "\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \ud83c\udfc6", "成绩已添加 🏆", "Resultaat toegevoegd 🏆", "Resultado adicionado 🏆", "Resultat tillagt 🏆", "Результат добавлен 🏆", "Wynik dodany 🏆", "결과를 추가했어요 🏆"));
      setTimeout(function () { setToast(null); }, 2400);
    } catch (eR) { try { echec(); } catch (e2R) { } }
  }
  var eoSt = React.useState(false); var editOrig = eoSt[0], setEditOrig = eoSt[1];
  /* 20/08 : l histoire se DEPLIE SUR PLACE (demande Blandine : « laisser l onglet se derouler
     plus grand ») — le bouton Decouvrir son histoire ne route plus vers le panneau Souvenirs. */
  var vhSt = React.useState(false); var histoireDepliee = vhSt[0], setHistoireDepliee = vhSt[1];
  var olSt = React.useState({ pere: "", mere: "", naisseur: "" }); var origLocal = olSt[0], setOrigLocal = olSt[1];
  /* 🟩 05/09 (Blandine : « un outil qui lit un screen de l'ifce ou de horsetelex pour
     remplir les origines ») — importées depuis une capture, jamais enregistrees toutes seules :
     ca remplit `origLocal` (les memes champs que la saisie a la main), Blandine relit et tape
     Enregistrer elle-meme, comme pour toute autre modification de ce formulaire. */
  var ioSt = React.useState(false); var importOrigEnCours = ioSt[0], setImportOrigEnCours = ioSt[1];
  var imSt = React.useState(null); var importOrigMsg = imSt[0], setImportOrigMsg = imSt[1];
  var refImportOrig = React.useRef(null);
  async function importerOriginesDepuisCapture(fichier) {
    if (!fichier) return;
    setImportOrigEnCours(true); setImportOrigMsg(null);
    try {
      var b64 = await new Promise(function (resoudre, rejeter) {
        var lecteur = new FileReader();
        lecteur.onload = function () { resoudre(String(lecteur.result || "")); };
        lecteur.onerror = function () { rejeter(new Error("lecture")); };
        lecteur.readAsDataURL(fichier);
      });
      b64 = await hypeAllegerImageB64(b64);   /* (838) */
      var virg = b64.indexOf(",");
      var typeImg = b64.slice(5, b64.indexOf(";")) || "image/jpeg";
      var donnees = b64.slice(virg + 1);
      var CHAMPS_PED = ["pere", "mere", "pp", "pm", "mp", "mm", "ppp", "ppm", "pmp", "pmm", "mpp", "mpm", "mmp", "mmm"];
      /* 14/10 (livraison A) : la consigne de lecture est désormais écrite par le serveur (assistant.js) ; on envoie seulement l'opération et l'image. */
      var rep = await hypeAppelIA({ operation: "lecture_pedigree", langue: hypeLangueIA(), image: { type: "image", source: { type: "base64", media_type: typeImg, data: donnees } } });
      var data = null; try { data = await rep.json(); } catch (eJ) { data = null; } if (data && data.ok === false && hypeMessageIA(data.code)) { setImportOrigMsg({ ok: false, texte: hypeMessageIA(data.code) }); setImportOrigEnCours(false); return; }
      var texte = ""; try { texte = (data && data.content) ? data.content.map(function (b) { return (b && b.type === "text") ? b.text : ""; }).filter(Boolean).join("") : ((data && data.text) || ""); } catch (eT) { texte = ""; }
      texte = String(texte || "").replace(/```json|```/g, "").trim();
      var trouve = null; try { trouve = JSON.parse(texte); } catch (eP) { trouve = null; }
      var TOUS_CHAMPS = CHAMPS_PED.concat(["race", "naissance", "naisseur", "sexe"]);   /* (831) une capture sans parents mais avec sexe / naissance n est plus refusee */
      var auMoinsUn = !!(trouve && TOUS_CHAMPS.some(function (cle) { return trouve[cle] && String(trouve[cle]).trim(); }));
      if (!auMoinsUn) {
        setImportOrigMsg({ ok: false, texte: T("Aucune origine reconnue dans cette capture.", "No bloodline recognised in this screenshot.", "No se han reconocido or\u00edgenes en esta captura.", "Nessuna origine riconosciuta in questa schermata.", "\u3053\u306e\u30ad\u30e3\u30d7\u30c1\u30e3\u304b\u3089\u8840\u7d71\u60c5\u5831\u3092\u8aad\u307f\u53d6\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "In diesem Screenshot wurde keine Abstammung erkannt.", "\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0623\u064a \u0646\u0633\u0628 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0644\u0642\u0637\u0629.", "这张截图里没有识别到任何血统信息。", "Geen afstamming herkend in deze screenshot.", "Nenhuma origem reconhecida nesta captura.", "Inget stamträd hittades i den här skärmdumpen.", "На этом скриншоте не найдено родословной.", "Nie rozpoznano żadnego rodowodu na tym zrzucie ekranu.", "이 캡처에서 인식된 혈통이 없어요.") });
        setImportOrigEnCours(false);
        return;
      }
      var nomCible = (chevalDyn && chevalDyn.nom) || (c && c.nom) || "";
      var nomVu = (trouve && trouve.nomCheval) ? String(trouve.nomCheval).trim() : "";
      /* 🟩 06/09 (Blandine : "je veux que tu te mettes sur le decalage de l'ascendant" —
         "il voit bien que c'est le meme nom non ?") — avant de refuser, on regarde si `nomVu`
         correspond a un ASCENDANT DEJA TAPE dans le formulaire (pere, mere, ou un grand-parent).
         Si oui : ce n'est pas le mauvais cheval, c'est SA PROPRE fiche, un ou deux crans plus haut
         dans l'arbre — ce que la capture montre pour "pere"/"mere" devient alors les GRANDS-parents
         (ou arriere-grands-parents) a la bonne place, au lieu d'ecraser le sommet de l'arbre. */
      var NIVEAUX_ASCENDANTS = [
        { prefixe: "p", champ: "pere" }, { prefixe: "m", champ: "mere" },
        { prefixe: "pp", champ: "pp" }, { prefixe: "pm", champ: "pm" },
        { prefixe: "mp", champ: "mp" }, { prefixe: "mm", champ: "mm" }
        /* les champs de niveau 3 (ppp..mmm) ne sont pas testes : meme reconnus, il n'y aurait
           nulle part ou caser un niveau 4, qui n'existe pas dans ce formulaire. */
      ];
      var decalage = null; /* null = pas de decalage (fiche du cheval lui-meme, ou rien a verifier) */
      var correspondPourCible = !nomVu || !nomCible || nomsHippiquesProches(nomVu, nomCible);
      if (!correspondPourCible) {
        for (var iNa = 0; iNa < NIVEAUX_ASCENDANTS.length && !decalage; iNa++) {
          var niv = NIVEAUX_ASCENDANTS[iNa];
          var dejaTape = origLocal[niv.champ];
          if (dejaTape && nomsHippiquesProches(nomVu, dejaTape)) decalage = niv.prefixe;
        }
        if (!decalage) {
          setImportOrigMsg({ ok: false, texte: T("Cette capture semble \u00eatre celle de \u00ab " + nomVu + " \u00bb, mais la fiche ouverte est \u00ab " + nomCible + " \u00bb, et ce nom ne correspond \u00e0 aucun ascendant d\u00e9j\u00e0 tap\u00e9. Import refus\u00e9 pour ne pas m\u00e9langer les deux.", "This screenshot looks like it's about \u00ab " + nomVu + " \u00bb, but the profile open is \u00ab " + nomCible + " \u00bb, and this name doesn't match any ancestor already entered. Import refused so the two don't get mixed up.", "Esta captura parece ser de \u00ab " + nomVu + " \u00bb, pero la ficha abierta es \u00ab " + nomCible + " \u00bb, y este nombre no coincide con ning\u00fan ascendiente ya introducido. Importaci\u00f3n rechazada para no mezclarlos.", "Questa schermata sembra riguardare \u00ab " + nomVu + " \u00bb, ma la scheda aperta \u00e8 \u00ab " + nomCible + " \u00bb, e questo nome non corrisponde a nessun ascendente gi\u00e0 inserito. Importazione rifiutata per non mescolarli.", "\u3053\u306e\u30ad\u30e3\u30d7\u30c1\u30e3\u306f\u300c" + nomVu + "\u300d\u306e\u3082\u306e\u306e\u3088\u3046\u3067\u3059\u304c\u3001\u958b\u3044\u3066\u3044\u308b\u30da\u30fc\u30b8\u306f\u300c" + nomCible + "\u300d\u3067\u3001\u3053\u306e\u540d\u524d\u306f\u65e2\u5165\u529b\u306e\u7956\u5148\u306e\u3069\u308c\u306b\u3082\u4e00\u81f4\u3057\u307e\u305b\u3093\u3002\u6df7\u540c\u3092\u9632\u3050\u305f\u3081\u30a4\u30f3\u30dd\u30fc\u30c8\u3092\u62d2\u5426\u3057\u307e\u3057\u305f\u3002", "Dieser Screenshot scheint \u00ab " + nomVu + " \u00bb zu zeigen, aber das ge\u00f6ffnete Profil ist \u00ab " + nomCible + " \u00bb, und dieser Name stimmt mit keinem bereits eingegebenen Vorfahren \u00fcberein. Import abgelehnt, um beide nicht zu vermischen.", "\u064a\u0628\u062f\u0648 \u0623\u0646 \u0647\u0630\u0647 \u0627\u0644\u0644\u0642\u0637\u0629 \u062a\u062e\u0635 \u00ab " + nomVu + " \u00bb\u060c \u0644\u0643\u0646 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629 \u0647\u064a \u00ab " + nomCible + " \u00bb\u060c \u0648\u0647\u0630\u0627 \u0627\u0644\u0627\u0633\u0645 \u0644\u0627 \u064a\u0637\u0627\u0628\u0642 \u0623\u064a \u0633\u0644\u0641 \u0645\u062f\u062e\u0644. \u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0644\u0639\u062f\u0645 \u0627\u0644\u062e\u0644\u0637 \u0628\u064a\u0646\u0647\u0645\u0627.", "这张截图似乎是“" + nomVu + "”的，但当前打开的资料是“" + nomCible + "”，而且这个名字与已填写的任何祖先都对不上。为避免把两者混在一起，导入被拒绝。", "Deze screenshot lijkt van ‘ " + nomVu + " ’ te zijn, maar het geopende profiel is ‘ " + nomCible + " ’, en deze naam komt met geen enkele al ingevoerde voorouder overeen. Import geweigerd zodat de twee niet door elkaar raken.", "Esta captura parece ser de ‘ " + nomVu + " ’, mas a ficha aberta é ‘ " + nomCible + " ’, e esse nome não corresponde a nenhum ancestral já digitado. Importação recusada para não misturar as duas.", ("Den här skärmdumpen verkar handla om \u201d" + nomVu + "\u201d, men sidan som är öppen är \u201d" + nomCible + "\u201d, och det namnet matchar ingen förfader som redan är ifylld. Importen nekades för att inte blanda ihop de två."), ("Похоже, это скриншот «" + nomVu + "», но открытая карточка — «" + nomCible + "», и это имя не совпадает ни с одним из уже введённых предков. Импорт отклонён, чтобы не смешивать двух лошадей."), ("Ten zrzut ekranu wygląda na dotyczący „" + nomVu + "”, ale otwarta karta to „" + nomCible + "”, a ta nazwa nie pasuje do żadnego już wpisanego przodka. Import odrzucony, żeby ich nie pomylić."), ("이 캡처는 “" + nomVu + "”의 것 같은데, 열려 있는 프로필은 “" + nomCible + "”이고, 이 이름은 이미 입력된 어떤 조상과도 맞지 않아요. 둘이 섞이지 않도록 가져오기를 거부했어요.")) });
          setImportOrigEnCours(false);
          return;
        }
      }
      /* Construit le jeu de champs a appliquer, decale du bon nombre de crans si besoin. */
      var aAppliquer = trouve;
      if (decalage) {
        aAppliquer = {};
        var profondeurDispo = 3 - decalage.length; /* 3 generations max dans ce formulaire */
        if (profondeurDispo >= 1) {
          if (trouve.pere) { aAppliquer[decalage + "p"] = trouve.pere; if (trouve.d_pere) aAppliquer["d_" + decalage + "p"] = trouve.d_pere; }
          if (trouve.mere) { aAppliquer[decalage + "m"] = trouve.mere; if (trouve.d_mere) aAppliquer["d_" + decalage + "m"] = trouve.d_mere; }
        }
        if (profondeurDispo >= 2) {
          if (trouve.pp) { aAppliquer[decalage + "pp"] = trouve.pp; if (trouve.d_pp) aAppliquer["d_" + decalage + "pp"] = trouve.d_pp; }
          if (trouve.pm) { aAppliquer[decalage + "pm"] = trouve.pm; if (trouve.d_pm) aAppliquer["d_" + decalage + "pm"] = trouve.d_pm; }
          if (trouve.mp) { aAppliquer[decalage + "mp"] = trouve.mp; if (trouve.d_mp) aAppliquer["d_" + decalage + "mp"] = trouve.d_mp; }
          if (trouve.mm) { aAppliquer[decalage + "mm"] = trouve.mm; if (trouve.d_mm) aAppliquer["d_" + decalage + "mm"] = trouve.d_mm; }
        }
        /* rien pour un profondeurDispo <= 0 : ca reconnait le cheval, mais il n'y a nulle
           part ou ranger un niveau 4 ; on le dit clairement dans le message plus bas. */
      }
      var auMoinsUnDecale = !decalage || Object.keys(aAppliquer).length > 0;
      if (!auMoinsUnDecale) {
        setImportOrigMsg({ ok: false, texte: T("Reconnu comme \u00ab " + nomVu + " \u00bb, mais trop loin dans l'arbre pour trouver une place (ce formulaire s'arr\u00eate aux arri\u00e8re-grands-parents).", "Recognised as \u00ab " + nomVu + " \u00bb, but too deep in the tree to find a slot (this form stops at great-grandparents).", "Reconocido como \u00ab " + nomVu + " \u00bb, pero demasiado lejos en el \u00e1rbol para encontrar un lugar (este formulario llega hasta los bisabuelos).", "Riconosciuto come \u00ab " + nomVu + " \u00bb, ma troppo lontano nell'albero per trovare un posto (questo modulo arriva fino ai bisnonni).", "\u300c" + nomVu + "\u300d\u3068\u3057\u3066\u8a8d\u8b58\u3055\u308c\u307e\u3057\u305f\u304c\u3001\u7cfb\u56f3\u306e\u5965\u304c\u6df1\u3059\u304e\u307e\u3059\uff08\u3053\u306e\u30d5\u30a9\u30fc\u30e0\u306f\u66fe\u7956\u7236\u6bcd\u307e\u3067\u3067\u3059\uff09\u3002", "Als \u00ab " + nomVu + " \u00bb erkannt, aber zu tief im Stammbaum f\u00fcr einen freien Platz (dieses Formular reicht bis zu den Urgro\u00dfeltern).", "\u062a\u0645 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u064a\u0647 \u0643\u0640\u00ab " + nomVu + " \u00bb\u060c \u0644\u0643\u0646\u0647 \u0628\u0639\u064a\u062f \u062c\u062f\u0627 \u0641\u064a \u0627\u0644\u0634\u062c\u0631\u0629 \u0648\u0644\u0627 \u0645\u0643\u0627\u0646 \u0644\u0647 (\u064a\u062a\u0648\u0642\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0639\u0646\u062f \u0623\u062c\u062f\u0627\u062f \u0627\u0644\u0623\u062c\u062f\u0627\u062f).", "识别为“" + nomVu + "”，但在谱系中太靠后，找不到位置（这个表单只填到曾祖辈）。", "Herkend als ‘ " + nomVu + " ’, maar te ver in de stamboom om een plek te vinden (dit formulier houdt op bij de overgrootouders).", "Reconhecido como ‘ " + nomVu + " ’, mas distante demais na árvore para encontrar um lugar (este formulário vai só até os bisavós).", ("Igenkänd som \u201d" + nomVu + "\u201d, men för långt ut i stamträdet för att få en plats (formuläret slutar vid farfars farföräldrar)."), ("Распознано как «" + nomVu + "», но это слишком далеко в родословной, чтобы найти место (эта форма доходит только до прапрадедов)."), ("Rozpoznano jako „" + nomVu + "”, ale to za głęboko w drzewie, by znaleźć miejsce (ten formularz kończy się na pradziadkach)."), ("“" + nomVu + "”(으)로 인식했지만 계통도에서 너무 멀어 들어갈 자리가 없어요 (이 양식은 증조부모까지만 입력할 수 있어요).")) });
        setImportOrigEnCours(false);
        return;
      }
      setOrigLocal(function (oo) {
        var nn = Object.assign({}, oo);
        Object.keys(aAppliquer).forEach(function (cle) { if (CHAMPS_PED.indexOf(cle) >= 0 && aAppliquer[cle] && String(aAppliquer[cle]).trim()) nn[cle] = String(aAppliquer[cle]).trim(); });
        /* (626) les details lus a cote des noms (d_<champ>), seulement s il y en a un : un detail deja tape n est pas efface par une capture muette */
        Object.keys(aAppliquer).forEach(function (cle) { if (cle.indexOf("d_") === 0 && CHAMPS_PED.indexOf(cle.slice(2)) >= 0 && aAppliquer[cle] && String(aAppliquer[cle]).trim()) nn[cle] = String(aAppliquer[cle]).trim().slice(0, 60); });
        if (!decalage) {
          if (trouve.race && String(trouve.race).trim()) nn.race = String(trouve.race).trim();
          if (trouve.naisseur && String(trouve.naisseur).trim()) nn.naisseur = String(trouve.naisseur).trim();
          /* (631) date de naissance EXACTE quand la capture la montre (JJ/MM/AAAA), sinon l annee ; l age en decoule */
          var nsN = hypeNaissanceNormaliser(trouve.naissance);
          if (nsN) { nn.naissance = nsN.affiche; nn.age = String(nsN.age); }
          var sxO = String(trouve.sexe || "").toLowerCase().trim(); if (sxO === "femelle") sxO = "jument"; if (["hongre", "jument", "entier"].indexOf(sxO) >= 0) nn.sexe = sxO;   /* (831) le sexe lu est garde (enregistre avec les origines) */
        }
        return nn;
      });
      setImportOrigMsg({
        ok: true,
        texte: decalage
          ? T("Reconnu comme \u00ab " + nomVu + " \u00bb, d\u00e9j\u00e0 dans l'arbre \u2014 origines d\u00e9cal\u00e9es au bon niveau. V\u00e9rifie avant d'enregistrer.", "Recognised as \u00ab " + nomVu + " \u00bb, already in the tree \u2014 bloodline shifted to the right level. Check it before saving.", "Reconocido como \u00ab " + nomVu + " \u00bb, ya en el \u00e1rbol \u2014 or\u00edgenes desplazados al nivel correcto. Rev\u00edsalos antes de guardar.", "Riconosciuto come \u00ab " + nomVu + " \u00bb, gi\u00e0 nell'albero \u2014 origini spostate al livello giusto. Controlla prima di salvare.", "\u300c" + nomVu + "\u300d\u3068\u3057\u3066\u8a8d\u8b58\u3055\u308c\u3001\u65e2\u306b\u7cfb\u56f3\u5185\u306b\u5b58\u5728 \u2014 \u6b63\u3057\u3044\u4e16\u4ee3\u306b\u8840\u7d71\u3092\u79fb\u52d5\u3057\u307e\u3057\u305f\u3002\u4fdd\u5b58\u524d\u306b\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002", "Als \u00ab " + nomVu + " \u00bb erkannt, bereits im Stammbaum \u2014 Abstammung auf die richtige Ebene verschoben. Bitte vor dem Speichern pr\u00fcfen.", "\u062a\u0645 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u064a\u0647 \u0643\u0640\u00ab " + nomVu + " \u00bb\u060c \u0648\u0647\u0648 \u0645\u0648\u062c\u0648\u062f \u0641\u064a \u0627\u0644\u0634\u062c\u0631\u0629 \u2014 \u062a\u0645 \u0646\u0642\u0644 \u0627\u0644\u0646\u0633\u0628 \u0625\u0644\u0649 \u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0635\u062d\u064a\u062d. \u062a\u062d\u0642\u0642\u064a \u0642\u0628\u0644 \u0627\u0644\u062d\u0641\u0638.", "识别为“" + nomVu + "”，已在谱系中——血统已调整到正确的层级。保存前请检查一下。", "Herkend als ‘ " + nomVu + " ’, staat al in de stamboom — afstamming naar het juiste niveau verschoven. Controleer het voordat je opslaat.", "Reconhecido como ‘ " + nomVu + " ’, já está na árvore — origens deslocadas para o nível certo. Confira antes de salvar.", ("Igenkänd som \u201d" + nomVu + "\u201d, finns redan i stamträdet \u2014 anorna flyttades till rätt nivå. Kontrollera innan du sparar."), ("Распознано как «" + nomVu + "», уже есть в родословной — предки сдвинуты на нужный уровень. Проверь перед сохранением."), ("Rozpoznano jako „" + nomVu + "”, już jest w drzewie — rodowód przesunięty na właściwy poziom. Sprawdź, zanim zapiszesz."), ("“" + nomVu + "”(으)로 인식했어요. 이미 계통도에 있어서 혈통을 알맞은 단계로 옮겼어요. 저장하기 전에 확인하세요."))
          : T("Origines compl\u00e9t\u00e9es depuis la capture \u2014 v\u00e9rifie avant d'enregistrer.", "Bloodline filled in from the screenshot \u2014 check it before saving.", "Or\u00edgenes completados desde la captura \u2014 rev\u00edsalos antes de guardar.", "Origini completate dalla schermata \u2014 controlla prima di salvare.", "\u30ad\u30e3\u30d7\u30c1\u30e3\u304b\u3089\u8840\u7d71\u3092\u5165\u529b\u3057\u307e\u3057\u305f\u3002\u4fdd\u5b58\u524d\u306b\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002", "Abstammung aus dem Screenshot \u00fcbernommen \u2014 bitte vor dem Speichern pr\u00fcfen.", "\u062a\u0645 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0646\u0633\u0628 \u0645\u0646 \u0627\u0644\u0644\u0642\u0637\u0629 \u2014 \u062a\u062d\u0642\u0642\u064a \u0642\u0628\u0644 \u0627\u0644\u062d\u0641\u0638.", "已根据截图补全血统——保存前请检查。", "Afstamming aangevuld vanuit de screenshot — controleer het voordat je opslaat.", "Origens completadas a partir da captura — confira antes de salvar.", "Stamträdet kompletterat från skärmdumpen — kontrollera innan du sparar.", "Родословная дополнена по скриншоту — проверь перед сохранением.", "Rodowód uzupełniony ze zrzutu ekranu — sprawdź, zanim zapiszesz.", "캡처에서 혈통을 채웠어요 — 저장하기 전에 확인하세요.")
      });
    } catch (eG) {
      setImportOrigMsg({ ok: false, texte: T("Lecture impossible \u2014 r\u00e9essaie.", "Could not read it \u2014 try again.", "No se pudo leer \u2014 int\u00e9ntalo de nuevo.", "Lettura impossibile \u2014 riprova.", "\u8aad\u307f\u53d6\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Konnte nicht gelesen werden \u2014 versuch es nochmal.", "\u062a\u0639\u0630\u0631\u062a \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "无法读取——请重试。", "Lezen niet gelukt — probeer het opnieuw.", "Leitura impossível — tente de novo.", "Det gick inte att läsa — försök igen.", "Не удалось прочитать — попробуй ещё раз.", "Nie można odczytać — spróbuj jeszcze raz.", "읽을 수 없어요 — 다시 시도해 주세요.") });
    }
    setImportOrigEnCours(false);
  }
  function ouvrirEditOrigines() {
    var ogE = (c && c.origines) || {};
    var dN = function (n) { return (n && typeof n === "object" && n.detail) ? String(n.detail) : ""; };
    setOrigLocal({
      race: (chevalDyn && chevalDyn.race) || "",
      age: (chevalDyn && chevalDyn.age) || "",
      naissance: (function () { var nI = hypeNaissanceNormaliser(ogE.naissance || ""); return nI ? nI.affiche : ""; })(),   /* (631) */
      sire: ogE.sire || "",
      pere: (ogE.pere && (ogE.pere.nom || ogE.pere)) || "",
      mere: (ogE.mere && (ogE.mere.nom || ogE.mere)) || "",
      /* 20/08 : GRANDS-PARENTS (regression signalee par Blandine — « avant on pouvait ») :
         l editeur perdait les 2e/3e generations que le dos de la carte sait pourtant afficher. */
      pp: (ogE.pere && ogE.pere.pere && (ogE.pere.pere.nom || ogE.pere.pere)) || "",
      pm: (ogE.pere && ogE.pere.mere && (ogE.pere.mere.nom || ogE.pere.mere)) || "",
      mp: (ogE.mere && ogE.mere.pere && (ogE.mere.pere.nom || ogE.mere.pere)) || "",
      mm: (ogE.mere && ogE.mere.mere && (ogE.mere.mere.nom || ogE.mere.mere)) || "",
      /* 🟩 05/09 (Blandine : « plus développé que le père et le père de mère », puis « oui les 3 ») —
         ARRIERE-GRANDS-PARENTS. La carte au dos de la fiche sait deja les afficher (aG3,
         8 cases) ; seul ce formulaire s'arretait aux grands-parents. Meme principe de nommage :
         ppp = pere du pere du pere, ppm = mere du pere du pere, etc. */
      ppp: (ogE.pere && ogE.pere.pere && ogE.pere.pere.pere && (ogE.pere.pere.pere.nom || ogE.pere.pere.pere)) || "",
      ppm: (ogE.pere && ogE.pere.pere && ogE.pere.pere.mere && (ogE.pere.pere.mere.nom || ogE.pere.pere.mere)) || "",
      pmp: (ogE.pere && ogE.pere.mere && ogE.pere.mere.pere && (ogE.pere.mere.pere.nom || ogE.pere.mere.pere)) || "",
      pmm: (ogE.pere && ogE.pere.mere && ogE.pere.mere.mere && (ogE.pere.mere.mere.nom || ogE.pere.mere.mere)) || "",
      mpp: (ogE.mere && ogE.mere.pere && ogE.mere.pere.pere && (ogE.mere.pere.pere.nom || ogE.mere.pere.pere)) || "",
      mpm: (ogE.mere && ogE.mere.pere && ogE.mere.pere.mere && (ogE.mere.pere.mere.nom || ogE.mere.pere.mere)) || "",
      mmp: (ogE.mere && ogE.mere.mere && ogE.mere.mere.pere && (ogE.mere.mere.pere.nom || ogE.mere.mere.pere)) || "",
      mmm: (ogE.mere && ogE.mere.mere && ogE.mere.mere.mere && (ogE.mere.mere.mere.nom || ogE.mere.mere.mere)) || "",
      naisseur: ogE.naisseur || "",
      /* (626) la ligne de detail de chaque ancetre (annee, race, indice, niveau), preremplie pour etre relue ou corrigee */
      d_pere: dN(ogE.pere),
      d_mere: dN(ogE.mere),
      d_pp: dN(ogE.pere && ogE.pere.pere),
      d_pm: dN(ogE.pere && ogE.pere.mere),
      d_mp: dN(ogE.mere && ogE.mere.pere),
      d_mm: dN(ogE.mere && ogE.mere.mere),
      d_ppp: dN(ogE.pere && ogE.pere.pere && ogE.pere.pere.pere),
      d_ppm: dN(ogE.pere && ogE.pere.pere && ogE.pere.pere.mere),
      d_pmp: dN(ogE.pere && ogE.pere.mere && ogE.pere.mere.pere),
      d_pmm: dN(ogE.pere && ogE.pere.mere && ogE.pere.mere.mere),
      d_mpp: dN(ogE.mere && ogE.mere.pere && ogE.mere.pere.pere),
      d_mpm: dN(ogE.mere && ogE.mere.pere && ogE.mere.pere.mere),
      d_mmp: dN(ogE.mere && ogE.mere.mere && ogE.mere.mere.pere),
      d_mmm: dN(ogE.mere && ogE.mere.mere && ogE.mere.mere.mere)
    });
    setEditOrig(true);
  }
  async function sauverOrigines() {
    try {
      var pe = (origLocal.pere || "").trim(), me = (origLocal.mere || "").trim(), na = (origLocal.naisseur || "").trim();
      var ogA = (c && c.origines) || {};
      var ogN = Object.assign({}, ogA);
      /* 20/08 : sauvegarde IMBRIQUEE et NON DESTRUCTRICE. L ancienne version ecrivait
         pere/mere « a plat » : chaque enregistrement EFFACAIT les grands-parents existants.
         Regle : un nom inchange conserve son detail ET ses propres ascendants (arriere-GP) ;
         un champ vide (les champs sont preremplis) est un choix de suppression. */
      function noeud(nomTxt, ancien, detailTxt) {
        nomTxt = String(nomTxt || "").trim();
        if (!nomTxt) return null;
        var n = { nom: nomTxt };
        /* (626) la ligne de detail (annee, race, indice, niveau) vient du formulaire (preremplie, donc vide = effacee) ;
           sans champ transmis, l ancien detail d un nom inchange est garde comme avant */
        var dTxt = (detailTxt === undefined) ? null : String(detailTxt == null ? "" : detailTxt).trim().slice(0, 60);
        if (dTxt) n.detail = dTxt;
        if (ancien && typeof ancien === "object" && String(ancien.nom || "").trim().toLowerCase() === nomTxt.toLowerCase()) {
          if (dTxt === null && ancien.detail) n.detail = ancien.detail;
          if (ancien.pere) n.pere = ancien.pere;
          if (ancien.mere) n.mere = ancien.mere;
        }
        return n;
      }
      var ancP = (ogA.pere && typeof ogA.pere === "object") ? ogA.pere : null;
      var ancM = (ogA.mere && typeof ogA.mere === "object") ? ogA.mere : null;
      /* 🟩 05/09 : meme principe étendu un cran plus loin — un arrière-grand-parent inchangé
         garde son propre detail (rien a garder de plus profond, on s'arrete a 3 generations). */
      ogN.pere = noeud(pe, ancP, origLocal.d_pere);
      if (ogN.pere) {
        var ancPP = ancP && ancP.pere, ancPM = ancP && ancP.mere;
        var vPP = noeud(origLocal.pp, ancPP, origLocal.d_pp), vPM = noeud(origLocal.pm, ancPM, origLocal.d_pm);
        if (vPP) {
          var vPPP = noeud(origLocal.ppp, ancPP && ancPP.pere, origLocal.d_ppp), vPPM = noeud(origLocal.ppm, ancPP && ancPP.mere, origLocal.d_ppm);
          if (vPPP) vPP.pere = vPPP; else delete vPP.pere;
          if (vPPM) vPP.mere = vPPM; else delete vPP.mere;
        }
        if (vPM) {
          var vPMP = noeud(origLocal.pmp, ancPM && ancPM.pere, origLocal.d_pmp), vPMM = noeud(origLocal.pmm, ancPM && ancPM.mere, origLocal.d_pmm);
          if (vPMP) vPM.pere = vPMP; else delete vPM.pere;
          if (vPMM) vPM.mere = vPMM; else delete vPM.mere;
        }
        if (vPP) ogN.pere.pere = vPP; else delete ogN.pere.pere;
        if (vPM) ogN.pere.mere = vPM; else delete ogN.pere.mere;
      }
      ogN.mere = noeud(me, ancM, origLocal.d_mere);
      if (ogN.mere) {
        var ancMP = ancM && ancM.pere, ancMM = ancM && ancM.mere;
        var vMP = noeud(origLocal.mp, ancMP, origLocal.d_mp), vMM = noeud(origLocal.mm, ancMM, origLocal.d_mm);
        if (vMP) {
          var vMPP = noeud(origLocal.mpp, ancMP && ancMP.pere, origLocal.d_mpp), vMPM = noeud(origLocal.mpm, ancMP && ancMP.mere, origLocal.d_mpm);
          if (vMPP) vMP.pere = vMPP; else delete vMP.pere;
          if (vMPM) vMP.mere = vMPM; else delete vMP.mere;
        }
        if (vMM) {
          var vMMP = noeud(origLocal.mmp, ancMM && ancMM.pere, origLocal.d_mmp), vMMM = noeud(origLocal.mmm, ancMM && ancMM.mere, origLocal.d_mmm);
          if (vMMP) vMM.pere = vMMP; else delete vMM.pere;
          if (vMMM) vMM.mere = vMMM; else delete vMM.mere;
        }
        if (vMP) ogN.mere.pere = vMP; else delete ogN.mere.pere;
        if (vMM) ogN.mere.mere = vMM; else delete ogN.mere.mere;
      }
      if (ogN.pedigree) ogN.pedigree = { pere: ogN.pere, mere: ogN.mere }; /* recto+verso : meme source */
      if (na) ogN.naisseur = na; else delete ogN.naisseur;
      var siV = (origLocal.sire || "").trim(); if (siV) ogN.sire = siV; else delete ogN.sire; /* 30/07 : champ SIRE (decision Blandine, remplace la fausse ligne FFE) */
      if (["hongre", "jument", "entier"].indexOf(String(origLocal.sexe || "")) >= 0) ogN.sexe = origLocal.sexe;   /* (831) sexe lu sur une capture : garde ; sinon le sexe deja enregistre reste */
      setEditOrig(false);
      if (chevalDyn && chevalDyn.dbId && typeof supa !== "undefined" && supa) {
        var raceV = (origLocal.race || "").trim();
        var ageV = (String(origLocal.age || "").match(/\d+/) || [null])[0];
        /* (631) date de naissance exacte : gardee dans origines.naissance (ISO) ; quand elle est la, l age en decoule (annees revolues) */
        var nsV = hypeNaissanceNormaliser(origLocal.naissance || "");
        if (nsV) { ogN.naissance = nsV.iso; ageV = String(nsV.age); } else delete ogN.naissance;
        var payl = { origines: ogN, race: raceV || null, age: ageV ? Number(ageV) : null };
        var rO = await hypeMajOriginesCheval(chevalDyn.dbId, payl);   /* (820) */
        if (rO && !rO.error && !(rO.data && rO.data.length)) { setToast(T("Enregistrement refus\u00e9 \u2014 tu n\u2019as pas les droits sur ce cheval", "Not saved \u2014 you don\u2019t have rights on this horse", "No guardado \u2014 no tienes derechos sobre este caballo", "Non salvato \u2014 non hai i diritti su questo cavallo", "\u4fdd\u5b58\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f \u2014 \u3053\u306e\u99ac\u306e\u6a29\u9650\u304c\u3042\u308a\u307e\u305b\u3093", "Nicht gespeichert \u2014 keine Rechte f\u00fcr dieses Pferd", "\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u062d\u0641\u0638 \u2014 \u0644\u064a\u0633 \u0644\u062f\u064a\u0643 \u0635\u0644\u0627\u062d\u064a\u0627\u062a \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646", "保存被拒绝——你对这匹马没有权限", "Opslaan geweigerd — je hebt geen rechten op dit paard", "Gravação recusada — você não tem permissões sobre este cavalo", "Inte sparat — du har inga rättigheter för den här hästen", "Сохранение отклонено — у тебя нет прав на эту лошадь", "Nie zapisano — nie masz uprawnień do tego konia", "저장이 거부됐어요 — 이 말에 대한 권한이 없어요")); setTimeout(function () { setToast(null); }, 3200); return; }
        if (rO && rO.error) { setToast(T("Enregistrement indisponible \u2014 colonne \u00e0 ajouter c\u00f4t\u00e9 base", "Could not save \u2014 column missing in database", "No se pudo guardar", "Salvataggio non riuscito", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht verfügbar — Spalte muss in der Datenbank ergänzt werden", "\u0627\u0644\u062d\u0641\u0638 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u2014 \u0639\u0645\u0648\u062f \u064a\u062c\u0628 \u0625\u0636\u0627\u0641\u062a\u0647 \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a", "无法保存——需要在数据库里添加列", "Opslaan niet mogelijk — kolom moet nog aan de database worden toegevoegd", "Gravação indisponível — coluna a adicionar no banco de dados", "Det går inte att spara — en kolumn saknas i databasen", "Сохранение недоступно — нужно добавить столбец в базу", "Nie można zapisać — w bazie brakuje kolumny", "저장할 수 없어요 — 데이터베이스에 열을 추가해야 해요")); setTimeout(function () { setToast(null); }, 2600); return; }
        setChevalDyn(Object.assign({}, chevalDyn, { origines: ogN, race: raceV, age: ageV || "", info: [raceV, ageV ? ageV + " ans" : null, chevalDyn.discipline].filter(Boolean).join(" \u00b7 ") }));
        setToast(T("Origines mises \u00e0 jour \u2728", "Bloodline updated \u2728", "Or\u00edgenes actualizados \u2728", "Origini aggiornate \u2728", "\u8840\u7d71\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f \u2728", "Herkunft aktualisiert ✨", "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0646\u0633\u0628 \u2728", "血统已更新 ✨", "Afstamming bijgewerkt ✨", "Origens atualizadas ✨", "Stamträdet uppdaterat ✨", "Родословная обновлена ✨", "Rodowód zaktualizowany ✨", "혈통이 업데이트됐어요 ✨"));
        setTimeout(function () { setToast(null); }, 2400);
      }
    } catch (eO) { }
  }
  React.useEffect(function () { var aU = true; (async function () { try { var u = await utilisateurActuel(); if (aU) setMoi(u || null); } catch (eU) { if (aU) setMoi(null); } })(); return function () { aU = false; }; }, []);
  var gcSt = React.useState(false); var gereClubCh = gcSt[0], setGereClubCh = gcSt[1];   /* (820) responsable du club du cheval */
  React.useEffect(function () { var aG = true; setGereClubCh(false); var dG = chevalDyn && chevalDyn.dbId; if (dG && moi) hypePeutGererClubCheval(dG).then(function (ok) { if (aG) setGereClubCh(!!ok); }); return function () { aG = false; }; }, [chevalDyn && chevalDyn.dbId, moi && moi.id]);
  /* 29/08 : le cheval affiché est-il rattaché à mon écurie ? (table chevaux_liens) */
  React.useEffect(function () {
    var aL = true;
    (async function () {
      try {
        var dbIdL = chevalDyn && chevalDyn.dbId;
        if (!dbIdL || !moi || typeof supa === "undefined" || !supa) { if (aL) setEstLieFiche(false); return; }
        var rL = await supa.from("chevaux_liens").select("cheval_id").eq("cheval_id", dbIdL).eq("user_id", moi.id).limit(1);
        if (rL && rL.error) { if (aL) { setLienIndetermine(true); setEstLieFiche(false); } return; }
        if (aL) { setLienIndetermine(false); setEstLieFiche(!!(rL && rL.data && rL.data.length)); }
      } catch (eL) { if (aL) { setLienIndetermine(true); setEstLieFiche(false); } }
    })();
    return function () { aL = false; };
  }, [moi, chevalDyn && chevalDyn.dbId]);
  var stVs = React.useState(function () { try { return JSON.parse(localStorage.getItem("hype_cheval_stats_" + id) || "{}"); } catch (e) { return {}; } });
  var statsCh = stVs[0], setStatsCh = stVs[1];
  var stEdSt = React.useState(null); var editStat = stEdSt[0], setEditStat = stEdSt[1];
  function fixerStat(n) {
    var o = Object.assign({}, statsCh);
    if (n) { o[editStat.cle] = n; } else { delete o[editStat.cle]; }
    setStatsCh(o);
    try { localStorage.setItem("hype_cheval_stats_" + id, JSON.stringify(o)); } catch (e) { }
    setEditStat(null);
  }
  function statEdit(cle, l) {
    var v = statsCh[cle];
    return h("div", { className: "st", key: cle, onClick: function () { setEditStat({ cle: cle, l: l }); }, style: { cursor: "pointer" } },
      h("div", { className: "v", style: v ? { color: teinteCl } : null }, v ? (v + "/10") : "\u2014"),
      h("div", { className: "l" }, l));
  }
  function bientot() { setToast(T("Bientôt disponible", "Coming soon", "Próximamente", "Presto disponibile", "近日公開", "Bald verfügbar", "\u0645\u062a\u0627\u062d \u0642\u0631\u064a\u0628\u0627", "即将上线", "Binnenkort beschikbaar", "Em breve", "Kommer snart", "Скоро будет доступно", "Wkrótce dostępne", "곧 만나요")); setTimeout(function () { setToast(null); }, 2000); }

  var checkSvg = h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "m5 13 4 4L19 7" }));
  var etoile = h("path", { d: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 18.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" });

  function flot(f) {
    var medInner = f.coeur
      ? h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 20s-6.5-4.3-9-8C1.5 9.5 3 6 6.2 6c1.9 0 3.1 1.1 3.8 2.1C10.7 7.1 11.9 6 13.8 6 17 6 18.5 9.5 17 12c-2.5 3.7-9 8-9 8z" }))
      : f.med;
    var auth = (f.auth === "officiel" || f.auth === "confirme") ? h("div", { className: "auth" }, checkSvg) : null;
    return h("div", { className: "flot", key: f.lab },
      h("div", { className: "emblem" },
        h("div", { className: "pleat" }),
        h("div", { className: "tails" }, h("span", { className: "tail l" }), h("span", { className: "tail r" })),
        h("div", { className: "med" }, medInner, auth)),
      h("div", { className: "lab" }, h("b", null, f.lab)));
  }
  function prow(r) {
    return h("div", { className: "prow", key: r.annee + r.event },
      h("div", { className: "yr" }, r.annee),
      h("div", { className: "info" }, h("div", { className: "t" }, r.event), h("div", { className: "s", onClick: (r.cav && typeof CAVALIERS !== "undefined" && CAVALIERS[r.cav]) ? function(e){ if(e && e.stopPropagation) e.stopPropagation(); if(typeof window!=="undefined"){ window.__cavalierOuvert = r.cav; } setEcran("cavalier"); } : null, style: (r.cav && typeof CAVALIERS !== "undefined" && CAVALIERS[r.cav]) ? { color:teinteCl, cursor:"pointer" } : null }, r.ds + ((r.cav && typeof CAVALIERS !== "undefined" && CAVALIERS[r.cav]) ? "  ›" : ""))),
      h("div", { className: "rk" }, r.rang),
      h("div", { className: "au" + (r.auth === "declare" ? " declared" : "") }, checkSvg));
  }

  var aPalmares = c.flots.length > 0;
  var sp = (typeof CHEVAUX_SPECTRAL !== "undefined" && CHEVAUX_SPECTRAL[id]) ? CHEVAUX_SPECTRAL[id] : {};
  /* 10/10 (888) Blandine : « passe les chevaux a la couleur de l accueil » et « retire le choix de couleur, tout le monde sur la
     meme ». Toutes les fiches en champagne (couleur de l accueil). La teinte choisie reste en base (chevaux.teinte) mais n est plus
     lue ni proposee ; a reajuster plus tard. Ancienne regle (30/07) : bleu #7FA3AD par defaut, teinte choisie prioritaire. */
  var teinte = "#D6C4A1";
  var teinteCl = teinteClaire(teinte);
  var tA = function (aT) { return teinteRGBA(teinte, aT); };
  var tACl = function (aT) { return teinteRGBA(teinteCl, aT); };
  var selSt = React.useState(null); var selRuban = selSt[0], setSelRuban = selSt[1];
  var palmSt = React.useState(false); var voirTout = palmSt[0], setVoirTout = palmSt[1];
  var sOuvSt = React.useState(null); var saisonOuv = sOuvSt[0], setSaisonOuv = sOuvSt[1]; /* 26/08 : saison depliee du palmares editorial */
  var pfSt = React.useState(null); var photosForts = pfSt[0], setPhotosForts = pfSt[1]; /* 26/08 : des photos VARIEES pour les moments forts (reproche Blandine : « trois fois la meme photo ») */
  var afSt = React.useState(null); var albumsForts = afSt[0], setAlbumsForts = afSt[1]; /* 02/09 : les albums AVEC leur nom, pour relier une photo au concours */
  React.useEffect(function () {
    if (panneau !== "palmares" || photosForts !== null) return;   /* 13/10 (1075) BUG « page cheval bloquee en boucle » : un cheval SANS photo renvoyait une liste vide, la liste vide relancait le chargement, qui renvoyait une liste vide… a l infini. On ne charge plus qu UNE fois (null = pas encore charge). */
    var actifPF = true;
    try {
      /* 02/09 (Blandine, capture) : « on avait dit pas trois fois la meme photo — prends-en
         au hasard dans ses albums si tu ne trouves aucune photo en lien avec le concours ».
         On charge donc AUSSI les albums AVEC LEUR NOM : un album qui porte le nom du
         concours donne une photo VRAIMENT liee au moment. A defaut, tirage au hasard dans
         le reste. */
      Promise.all([
        Promise.resolve(typeof chargerPhotosSouvenirs === "function" ? chargerPhotosSouvenirs(cibleCh) : []),
        Promise.resolve(typeof listerAlbumsCheval === "function" ? listerAlbumsCheval(cibleCh) : { data: [] })
      ]).then(function (res) {
        if (!actifPF) return;
        var estVid = function (uF) { return uF && typeof estUrlVideo === "function" && estUrlVideo(uF); };
        setPhotosForts((res[0] || []).filter(function (uF) { return uF && !estVid(uF); }).slice(0, 24));
        try {
          setAlbumsForts(((res[1] && res[1].data) || []).map(function (aF) {
            return { nom: String((aF && aF.nom) || ""), photos: ((aF && aF.photos) || []).filter(function (uF) { return uF && !estVid(uF); }) };
          }).filter(function (aF) { return aF.photos.length; }));
        } catch (eAF) { setAlbumsForts([]); }
      }).catch(function () { if (actifPF) { setPhotosForts([]); setAlbumsForts([]); } });
    } catch (ePF) { setPhotosForts([]); }
    return function () { actifPF = false; };
  }, [panneau, photosForts]);
  /* \U0001f7e9 06/09 (Blandine : "vrai bouton pour choisir photo/video sur un moment fort")
     Etat + fonctions du picker. `mediaTousMF` reprend le MEME chargement que photosForts/
     albumsForts mais SANS filtrer les videos (chargerPhotosSouvenirs les renvoie deja) —
     charge une seule fois, seulement quand le picker s'ouvre pour la premiere fois. */
  var mtSt = React.useState(null); var mediaTousMF = mtSt[0], setMediaTousMF = mtSt[1];
  var pkSt = React.useState(null); var pickerMomentF = pkSt[0], setPickerMomentF = pkSt[1]; /* jeton du moment fort en cours d'edition, ou null */
  function ouvrirPickerMomentF(jeton) {
    setPickerMomentF(jeton);
    if (mediaTousMF) return;
    try { chargerPhotosSouvenirs(cibleCh).then(function (r) { setMediaTousMF((r || []).slice(0, 40)); }).catch(function () { setMediaTousMF([]); }); } catch (eMT) { setMediaTousMF([]); }
  }
  async function definirMediaMomentFort(jeton, url) {
    /* url = null retire la surcharge et revient au choix automatique */
    try {
      if (!chevalDyn || !chevalDyn.dbId) return;
      var actuel = Object.assign({}, (chevalDyn.moments_forts_medias || {}));
      if (url) { actuel[jeton] = { url: url, type: (typeof estUrlVideo === "function" && estUrlVideo(url)) ? "video" : "photo" }; }
      else { delete actuel[jeton]; }
      var rMF = await supa.from("chevaux").update({ moments_forts_medias: actuel }).eq("id", chevalDyn.dbId);
      if (rMF && rMF.error) { setToast(T("Enregistrement indisponible \u2014 colonne moments_forts_medias \u00e0 ajouter c\u00f4t\u00e9 base", "Could not save \u2014 column missing in database", "No se pudo guardar \u2014 falta la columna", "Salvataggio non riuscito \u2014 colonna mancante", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht m\u00f6glich \u2014 Spalte fehlt", "\u0627\u0644\u062d\u0641\u0638 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u2014 \u064a\u062c\u0628 \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0648\u062f moments_forts_medias \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a", "无法保存——需要在数据库里添加 moments_forts_medias 列", "Opslaan niet mogelijk — kolom moments_forts_medias moet nog aan de database worden toegevoegd", "Gravação indisponível — coluna moments_forts_medias a adicionar no banco de dados", "Det går inte att spara — kolumnen moments_forts_medias saknas i databasen", "Сохранение недоступно — нужно добавить столбец moments_forts_medias в базу", "Nie można zapisać — w bazie brakuje kolumny moments_forts_medias", "저장할 수 없어요 — 데이터베이스에 moments_forts_medias 열을 추가해야 해요")); setTimeout(function () { setToast(null); }, 3400); return; }
      setChevalDyn(Object.assign({}, chevalDyn, { moments_forts_medias: actuel }));
      setPickerMomentF(null);
      setToast(url ? T("Moment fort mis \u00e0 jour \u2728", "Highlight updated \u2728", "Momento actualizado \u2728", "Momento aggiornato \u2728", "\u66f4\u65b0\u3057\u307e\u3057\u305f \u2728", "Aktualisiert \u2728", "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0644\u062d\u0638\u0629 \u0627\u0644\u0645\u0645\u064a\u0632\u0629 \u2728", "精彩时刻已更新 ✨", "Hoogtepunt bijgewerkt ✨", "Momento marcante atualizado ✨", "Höjdpunkt uppdaterad ✨", "Яркий момент обновлён ✨", "Najważniejszy moment zaktualizowany ✨", "하이라이트를 업데이트했어요 ✨") : T("Photo automatique r\u00e9tablie", "Automatic photo restored", "Foto autom\u00e1tica restaurada", "Foto automatica ripristinata", "\u81ea\u52d5\u9078\u629e\u306b\u623b\u3057\u307e\u3057\u305f", "Automatisches Foto wiederhergestellt", "\u062a\u0645\u062a \u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a\u0629", "已恢复自动照片", "Automatische foto hersteld", "Foto automática restaurada", "Automatiskt foto återställt", "Автоматическое фото восстановлено", "Przywrócono automatyczne zdjęcie", "자동 사진으로 되돌렸어요"));
      setTimeout(function () { setToast(null); }, 2400);
    } catch (eDM) { setToast(T("Enregistrement impossible", "Could not save", "No se pudo guardar", "Salvataggio non riuscito", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093", "Speichern nicht m\u00f6glich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0641\u0638", "无法保存", "Opslaan niet mogelijk", "Não foi possível salvar", "Det gick inte att spara", "Не удалось сохранить", "Nie udało się zapisać", "저장할 수 없어요")); setTimeout(function () { setToast(null); }, 2800); }
  }
  var cavFSt = React.useState("tous"); var cavFiltre = cavFSt[0], setCavFiltre = cavFSt[1]; /* 26/08 : onglet cavalier du palmares editorial */
  var spSt = React.useState(null); var saisonPts = spSt[0], setSaisonPts = spSt[1]; var fpSt = React.useState(null); var famPtsOuv = fpSt[0], setFamPtsOuv = fpSt[1]; /* 18/10 : famille de points depliee (detail au toucher) */ /* 06/09 : saison choisie pour les points de qualification */
  var vmSt = React.useState(false); var voirMasques = vmSt[0], setVoirMasques = vmSt[1]; /* 26/08 : « qu on puisse tout voir si on le souhaite » (Blandine) — proprietaire seulement, page technique */
  var galSt = React.useState(0); var galTab = galSt[0], setGalTab = galSt[1];
  var panSt = React.useState(function () { try { if (window.__hypePanneauReprise) { var pR = window.__hypePanneauReprise; window.__hypePanneauReprise = null; return pR; } } catch (ePR) { } try { var cD = (typeof DEV_OUVRIR_PAGE !== "undefined" && DEV_OUVRIR_PAGE === "souvenirs"); var cH = (typeof location !== "undefined" && (location.hash || "").indexOf("souvenirs") >= 0); return (cD || cH) ? "souvenirs" : ((typeof window !== "undefined" && window.__ouvrirPalmares) ? (function () { try { window.__ouvrirPalmares = false; } catch (eF) { } return "palmares"; })() : null); } catch (eP0) { return null; } }); var panneau = panSt[0], setPanneau = panSt[1]; React.useEffect(function () { try { window.__hypePanneauCheval = panneau; } catch (ePC) { } return function () { try { window.__hypePanneauCheval = null; } catch (ePC2) { } }; }, [panneau]);   /* (929) onglet retenu pour la reprise */ React.useEffect(function () { try { if (typeof window !== "undefined" && window.__ouvrirPalmares) { window.__ouvrirPalmares = false; setPanneau("palmares"); } if (typeof window !== "undefined" && window.__ouvrirActualite) { window.__ouvrirActualite = false; setPanneau("actualite"); } /* (629) depuis une notification de commentaire */ } catch (eOPf) { } }); /* 25/08 : lu a CHAQUE rendu — la fiche peut etre deja montee quand on arrive de la page commune */
  React.useEffect(function () { /* 26/08 : LE SWIPE NE QUITTE PLUS LA PAGE — un panneau ouvert pose un cran dans l'historique ; le geste retour iOS (popstate) referme le panneau au lieu de renvoyer a l'accueil. Residu assume : fermer par le bouton laisse un cran silencieux (le swipe suivant sort). */
    if (!panneau) return;
    try { history.pushState({ hypePanneau: true }, ""); } catch (eHp) { }
    function surPopPan() { try { setPanneau(null); } catch (eSp) { } }
    window.addEventListener("popstate", surPopPan);
    return function () { window.removeEventListener("popstate", surPopPan); };
  }, [panneau ? 1 : 0]);
  React.useEffect(function () { /* 26/08 : TOUTE entree dans Performances arrive sur la NOUVELLE page (ordre de Blandine) — l'ancienne page technique ne se memorise plus entre deux visites ; on n'y accede que par les CTA internes */
    if (panneau === "palmares") setPalmTech(false);
  }, [panneau]);
  /* 13/09 (65) — ARRIVER DIRECTEMENT SUR LA PHOTO. Quand on touche la notification
     « t'a identifiee dans un commentaire », l'ecran des notifications resout le commentaire en
     base (photo + cheval), pose l'adresse de la photo dans `window.__chevalPhotoOuvrir` et ouvre
     cette fiche. Ce signal est lu ICI, une seule fois, puis effac  meme motif que
     `window.__ouvrirPalmares`, deja en place depuis le 26/08 (portail inter-composants proscrit,
     lecon du 23e). Si la photo n'est plus la, rien ne s'ouvre et la fiche reste affichee :
     jamais d'ecran vide. */
  React.useEffect(function () {
    var uPh = null;
    try { uPh = (typeof window !== "undefined") ? window.__chevalPhotoOuvrir : null; } catch (eP0) { }
    if (!uPh) return;
    try { window.__chevalPhotoOuvrir = null; } catch (eP1) { }
    try {
      setVisFerme(false);
      setVisionneuseAlbumId(null);
      setVisionneuse(uPh);
      if (typeof chargerLkCm === "function") chargerLkCm(uPh);
      setCmPanneau(true);            /* la notification parle d'un commentaire : on l'ouvre dessus */
    } catch (eP2) { }
  }, []);
  var vedSt = React.useState(null); var vedettes = vedSt[0], setVedettes = vedSt[1];
  var lkSt = React.useState({ count: 0, jaiLike: false }); var lkV = lkSt[0], setLkV = lkSt[1]; /* 31/07 : likes + commentaires dans la visionneuse de la fiche (bug signale par Blandine) */
  var cmSt = React.useState(null); var cmV = cmSt[0], setCmV = cmSt[1];
  var _cs = React.useState(null), cmSuppr = _cs[0], setCmSuppr = _cs[1];
  var _ce = React.useState(null), cmEdit = _ce[0], setCmEdit = _ce[1];          /* 13/09 (61) : le commentaire en cours de modification */
  var _ct = React.useState(""), cmEditTexte = _ct[0], setCmEditTexte = _ct[1];
  var _cw = React.useState(false), cmEditEnCours = _cw[0], setCmEditEnCours = _cw[1]; /* 13/09 (60) : le commentaire en cours de suppression */
  var ctSt = React.useState(""); var cmTexte = ctSt[0], setCmTexte = ctSt[1];
  var cePSt = React.useState(false); var cmPanneau = cePSt[0], setCmPanneau = cePSt[1];
  var cmPourRef = React.useRef(null);   /* (467) la photo pour laquelle cmV / lkV ont ete charges */
  function chargerLkCm(uV) {
    /* 28/08 (demande Blandine) : les likes/commentaires etaient desactives sur
       les videos ("si !uV || estUrlVideo(uV) -> tout a zero, on arrete"). La
       table photo_likes fonctionne par URL, une video a une URL comme une
       photo -- aucune raison technique de l exclure. Seule la condition sur
       uV manquant est gardee. */
    /* 28/09 (467) : GARDE-FOU. Blandine : un commentaire pose sous UNE photo (verifie en base : une seule
       ligne, bonne adresse) s affichait sous les AUTRES photos, avec le meme J aime. La visionneuse
       retient desormais POUR QUELLE PHOTO elle a charge commentaires et J aime (cmPourRef) : une
       reponse arrivee pour une autre photo est ignoree, et un effet recharge si la photo affichee ne
       correspond plus a ce qui est en memoire. */
    cmPourRef.current = uV || null;
    if (!uV) { setLkV({ count: 0, jaiLike: false }); setCmV([]); return; }
    setCmV(null); setLkV({ count: 0, jaiLike: false });
    try { chargerLikesPhoto(uV).then(function (r) { if (cmPourRef.current !== uV) return; setLkV({ count: (r && r.count) || 0, jaiLike: !!(r && r.jaiLike) }); }).catch(function () { if (cmPourRef.current === uV) setLkV({ count: 0, jaiLike: false }); }); } catch (e1) { }
    try { listerCommentairesPhoto(uV).then(function (r) {
      if (cmPourRef.current !== uV) return;
      var lC = (r && r.data) || [];
      setCmV(lC);
      /* 13/09 (63) : les identifications des commentaires affiches, en une requete */
      try { hypeIdentificationsCommentaires(lC.map(function (x) { return x.id; })).then(function (m) { setTagsCm(m || {}); }); } catch (eI) { setTagsCm({}); }
    }).catch(function () { setCmV([]); setTagsCm({}); }); } catch (e2) { setCmV([]); setTagsCm({}); }
  }
  React.useEffect(function () { if (visionneuse && cmPourRef.current !== visionneuse) chargerLkCm(visionneuse); });   /* (467) filet : photo affichee != photo chargee -> on recharge */
  React.useEffect(function () { if (visionneuse) chargerLkCm(visionneuse); else { setCmPanneau(false); setCmTexte(""); } }, [visionneuse]);
  React.useEffect(function () {
    /* 05/08 : a la FERMETURE de la visionneuse, on remet le defilement horizontal de la page
       a zero. Uniquement au niveau du document : les rails horizontaux gardent leur position,
       puisqu ils defilent dans leur propre conteneur. */
    if (visionneuse) return;
    try {
      var remettre = function () {
        try {
          var y = window.pageYOffset || document.documentElement.scrollTop || 0;
          if (document.documentElement) document.documentElement.scrollLeft = 0;
          if (document.body) document.body.scrollLeft = 0;
          if (window.scrollTo) window.scrollTo(0, y);
        } catch (e1) { }
      };
      remettre();
      /* iOS applique parfois son inertie apres le rendu : on repasse une fois au frame suivant */
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(remettre);
    } catch (e2) { }
  }, [visionneuse]);
  React.useEffect(function () { /* 31/07 : iOS tue la page quand trop de videos tournent — on met tout en pause a l ouverture d un media (bug signale par Blandine) */
    try {
      var vids = document.querySelectorAll("video");
      if (visionneuse) { for (var iv = 0; iv < vids.length; iv++) { try { if (!vids[iv].closest(".souvVoile")) vids[iv].pause(); } catch (e1) { } } }
      else { for (var jv = 0; jv < vids.length; jv++) { try { if (vids[jv].autoplay) vids[jv].play().catch(function () { }); } catch (e2) { } } }
    } catch (e3) { }
  }, [visionneuse]);
  async function basculerLk() {
    if (!visionneuse) return;
    var av = lkV.jaiLike;
    setLkV({ count: Math.max(0, lkV.count + (av ? -1 : 1)), jaiLike: !av });
    try { var r = await toggleLikePhoto(visionneuse, av); if (r && r.error) chargerLkCm(visionneuse); } catch (eT) { chargerLkCm(visionneuse); }
  }
  var mentionsCh = useMentionsHype();   /* 19/10 (soir) LOT 3 : @ dans le commentaire d une photo ouverte */
  var refChampCmCh = React.useRef(null);
  var refEditCmCh = React.useRef(null);   /* 20/10 : @ aussi en modifiant un commentaire */
  async function envoyerCm() {
    var t = (cmTexte || "").trim(); if (!visionneuse || !t) return;
    setCmTexte("");
    try { var r = await ajouterCommentairePhoto(visionneuse, cibleCh, t); try { if (r && !r.error && r.data && r.data.id) await mentionsCh.apresEnvoi(r.data.id, t); } catch (eMc) { }   /* 19/10 (soir) LOT 3 */ if (r && r.error) { setToast(T("Envoi impossible", "Could not send", "Env\u00edo imposible", "Invio impossibile", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093", "Senden nicht m\u00f6glich", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644", "无法发送", "Uploaden mislukt", "Envio impossível", "Uppladdningen misslyckades", "Отправка невозможна", "Nie udało się wysłać", "전송할 수 없어요")); setTimeout(function () { setToast(null); }, 2200); } } catch (eE) { }
    chargerLkCm(visionneuse);
  }
  /* 02/08 : les resultats etaient replies au chargement — il fallait toucher la pilule
     « Resultats » pour les voir (demande Blandine : « je voudrais que les principaux s affichent
     automatiquement »). L onglet par defaut etait fige sur « coupes », y compris pour un cheval
     qui n a aucune coupe : la pilule Coupes n etait alors meme pas affichee, et la bande restait
     vide jusqu au premier tap. L onglet s ouvre desormais sur ce que le cheval possede
     reellement : ses coupes s il en a, sinon ses resultats. Un cheval qui a les deux garde les
     coupes en premier, comme avant. */
  var opSt = React.useState(function () {
    try {
      var nbCoupes = (((c && c.flots) || []).filter(function (fI) { return fI && fI.img; })).length;
      return nbCoupes ? "coupes" : "resultats";
    } catch (eOp) { return "coupes"; }
  });
  var ongletPerf = opSt[0], setOngletPerf = opSt[1]; /* 31/07 : declaration retablie DANS EcranCheval (son absence faisait planter la fiche) */
  /* Le cheval peut arriver de la base APRES le premier rendu : si l onglet est encore sur son
     defaut et que des coupes apparaissent, on bascule une seule fois. */
  var opBasc = React.useRef(false);
  React.useEffect(function () {
    try {
      if (opBasc.current) return;
      var nbC2 = (((c && c.flots) || []).filter(function (fJ) { return fJ && fJ.img; })).length;
      if (nbC2 && ongletPerf === "resultats") { opBasc.current = true; setOngletPerf("coupes"); }
    } catch (eOp2) { }
  }, [c && c.flots]);
  var ooSt = React.useState(false); var origOuv = ooSt[0], setOrigOuv = ooSt[1]; /* 31/07 : volet Origines */
  /* 🟩 05/09 22h50 (Blandine : "oui ajoute les descendants, on pourra les afficher
     quand on retourne la fiche des origines") — charge UNE fois, au premier retournement
     de la carte (pas au chargement de la page, elle l'a demande ainsi). Cherche, parmi un
     lot raisonnable de chevaux, ceux dont le pere OU la mere se rapproche du nom de CE
     cheval (nomsHippiquesProches — meme algorithme que l'identite des imports). */
  var pdSt = React.useState(null); var parenteInfo = pdSt[0], setParenteInfo = pdSt[1];
  async function chargerDescendantsCheval() {
    if (parenteInfo) return;
    setParenteInfo({ enCours: true, descendants: [], tousChevaux: [] });
    var nomActuel = (chevalDyn && chevalDyn.nom) || (c && c.nom) || "";
    if (!nomActuel || typeof supa === "undefined" || !supa) { setParenteInfo({ enCours: false, descendants: [], tousChevaux: [] }); return; }
    try {
      var rD = await supa.from("chevaux").select("id, nom, origines").is("supprime_le", null).limit(400);
      var nomDe2 = function (x) { if (!x) return ""; if (typeof x === "string") return x; return String(x.nom || ""); };
      var idActuel = (chevalDyn && chevalDyn.dbId) || (c && c.dbId) || null;
      var tousCh = ((rD && rD.data) || []).filter(function (h2) { return h2 && h2.nom && h2.id !== idActuel; }).map(function (h2) { return { id: h2.id, nom: h2.nom }; });
      var trouves = ((rD && rD.data) || []).filter(function (h2) {
        if (!h2 || !h2.nom || h2.id === idActuel) return false;
        var og2 = h2.origines || {};
        var pg2 = og2.pedigree || { pere: og2.pere || null, mere: og2.mere || null };
        var nomP = nomDe2(pg2.pere), nomM = nomDe2(pg2.mere);
        return (nomP && nomsHippiquesProches(nomP, nomActuel)) || (nomM && nomsHippiquesProches(nomM, nomActuel));
      }).map(function (h2) { return { id: h2.id, nom: h2.nom }; });
      setParenteInfo({ enCours: false, descendants: trouves, tousChevaux: tousCh });
    } catch (eDsc) { setParenteInfo({ enCours: false, descendants: [], tousChevaux: [] }); }
  }
  /* \U0001f7e9 06/09 (Blandine : "acceder a un cheval d'une fiche a l'autre quand ils sont de
     la meme famille et apparaissent... en tant qu'ascendants") \u2014 meme lot de chevaux deja
     charge pour les poulains (aucun appel base en plus) : on y cherche si un pere/mere/grand-
     parent affiche dans le pedigree correspond a une fiche Hype existante. */
  function ascendantVersFiche(nom) {
    if (!nom || !parenteInfo || !parenteInfo.tousChevaux) return null;
    for (var iAs = 0; iAs < parenteInfo.tousChevaux.length; iAs++) {
      if (nomsHippiquesProches(parenteInfo.tousChevaux[iAs].nom, nom)) return parenteInfo.tousChevaux[iAs].id;
    }
    return null;
  }
  React.useEffect(function () { if (origOuv) chargerDescendantsCheval(); }, [origOuv]);
  var cvSt = React.useState([]); var chVids = cvSt[0], setChVids = cvSt[1]; /* 31/07 : videos pour l onglet Videos */
  /* 09/09 (soir, correctif 2) : chVids (albums+souvenirs, via AlbumsPromus) ne voit jamais les
     vidéos postées en commentaire (onglet Vidéos lui-même, ou le fil) — dette confirmée par le
     diagnostic du jour. chVidsCom les porte séparément, en préparation/échouées comprises,
     calculé à côté de mediasInfo (même lecture déjà en place, aucun appel réseau de plus). */
  var cvcSt = React.useState([]); var chVidsCom = cvcSt[0], setChVidsCom = cvcSt[1];
  /* (905) collections de videos du cheval + collections depliees (« Voir toutes… ») */
  var colVSt = React.useState([]); var collVid = colVSt[0], setCollVid = colVSt[1];
  var colOSt = React.useState({}); var collOuv = colOSt[0], setCollOuv = colOSt[1];
  var colESt = React.useState(null); var colEdit = colESt[0], setColEdit = colESt[1];   /* (906) {id?, nom, vids[]} : fenetre de creation / modification */
  var colErSt = React.useState(""); var colErr = colErSt[0], setColErr = colErSt[1];
  var colBSt = React.useState(false); var colBusy = colBSt[0], setColBusy = colBSt[1];
  var colCSt = React.useState(false); var colConfSup = colCSt[0], setColConfSup = colCSt[1];
  var cvCSt = React.useState(null); var couvCible = cvCSt[0], setCouvCible = cvCSt[1];   /* (912) video dont on change la couverture */
  var cvBSt = React.useState(false); var couvBusy = cvBSt[0], setCouvBusy = cvBSt[1];
  var cvESt = React.useState(""); var couvErr = cvESt[0], setCouvErr = cvESt[1];
  var cvPSt = React.useState([]); var mesPlaybacks = cvPSt[0], setMesPlaybacks = cvPSt[1];
  var couvIn = React.useRef(null);
  React.useEffect(function () {
    var vifPb = true;
    try { if (moi && moi.id && typeof supa !== "undefined" && supa) supa.from("videos_mux").select("playback_id").eq("user_id", moi.id).then(function (rPb) { if (vifPb) setMesPlaybacks((((rPb && rPb.data) || []).map(function (x) { return x && x.playback_id; })).filter(Boolean)); }); } catch (ePb) { }
    return function () { vifPb = false; };
  }, [moi && moi.id]);
  var vlSt = React.useState(0); var setVigLegTick = vlSt[1];   /* (911) re-affiche quand une vignette d ancienne video est prete */
  React.useEffect(function () { function fVl() { setVigLegTick(function (n) { return n + 1; }); } document.addEventListener("hype-vignettes-legacy", fVl); document.addEventListener("hype-couvertures", fVl); return function () { document.removeEventListener("hype-vignettes-legacy", fVl); document.removeEventListener("hype-couvertures", fVl); }; }, []);
  React.useEffect(function () {
    var vifCv = true;
    try { if (typeof listerCollectionsVideos === "function") listerCollectionsVideos(cibleCh).then(function (rCv) { if (vifCv) setCollVid((rCv && rCv.data) || []); }); } catch (eCv) { }
    return function () { vifCv = false; };
  }, [cibleCh]);
  var visSt = React.useState(null); var visionneuse = visSt[0], setVisionneuse = visSt[1];
  /* \U0001f7e9 06/09 (Blandine, capture) : compteur qui dit a AlbumsCheval de refermer SA
     propre photo ouverte des que celle-ci (la visionneuse de la fiche) s'ouvre \u2014 evite les
     deux superposees. Voir le commentaire jumeau dans AlbumsCheval. */
  var acfSt = React.useState(0); var albumsChFermerCle = acfSt[0], setAlbumsChFermerCle = acfSt[1];
  /* 12/10 (1027) page « Tous les souvenirs » ouverte depuis la page Photos : null = vitrine ; { an } = page complete (an : annee de depart) */
  var tsSt = React.useState(null); var tousSouvCh = tsSt[0], setTousSouvCh = tsSt[1];
  React.useEffect(function () { setTousSouvCh(null); }, [panneau]);
  /* 11/09 (14) — meme motif que albumsChFermerCle : un compteur passe a AlbumsCheval (prop
     ajoutCle). A chaque +1, AlbumsCheval ouvre sa feuille « Dans quel album ? ». Utilise par
     « Ajouter un souvenir » (voir ouvrirAjoutSouvenir). */
  var acaSt = React.useState(0); var albumsChAjoutCle = acaSt[0], setAlbumsChAjoutCle = acaSt[1];
  /* 🟥 05/09 (Blandine : « j'efface les photos où ? ») — Supprimer et ★ Vedette dans cette
     visionneuse ne marchaient que pour les photos postées en commentaire (`mediasInfo`).
     Une photo de la chronologie ou d'un album n'avait jamais eu ni l'un ni l'autre ici —
     ce n'est pas une regression du 05/09, ca n'a jamais marche. `visionneuseAlbumId` retient
     l'album d'une photo ouverte depuis la chronologie (seule source qui le connait) ; null
     partout ailleurs, remis a null a la fermeture. */
  var visAlbSt = React.useState(null); var visionneuseAlbumId = visAlbSt[0], setVisionneuseAlbumId = visAlbSt[1];
  var visFmSt = React.useState(false); var visFerme = visFmSt[0], setVisFerme = visFmSt[1];
  function fermerVisionneuse() { if (visFerme) return; setVisFerme(true); setConfSuppr(false); setTimeout(function () { setVisionneuse(null); setVisionneuseAlbumId(null); setVisFerme(false); }, 620); }
  var refPhotoCh = React.useRef(null);
  var phSt = React.useState(function () { try { return localStorage.getItem("hype_cheval_photo_" + id) || ""; } catch (e) { return ""; } });
  var photoPerso = phSt[0], setPhotoPerso = phSt[1];
  var photoCh = photoPerso || c.photo;
  var albChSt = React.useState(false); var albumChOuvert = albChSt[0], setAlbumChOuvert = albChSt[1];
  function choisirPhotoCheval(ev) {
    var f = ev.target.files && ev.target.files[0]; ev.target.value = "";
    if (!f) return;
    hypeRecadrer(f, 4 / 5).then(appliquerPhotoCheval);
  }
  function appliquerPhotoCheval(res) {
      if (!res || !res.dataUrl) return;
      var ancienUrl = (chevalDyn && chevalDyn.dbId) ? (c.photo || null) : null;
      var im2 = new Image();
      im2.onload = function () {
        var cv = document.createElement("canvas");
        var w2 = Math.min(1400, im2.width); var h2 = Math.round(w2 * im2.height / im2.width);
        cv.width = w2; cv.height = h2;
        cv.getContext("2d").drawImage(im2, 0, 0, w2, h2);
        var d2 = cv.toDataURL("image/jpeg", 0.9);
        setPhotoPerso(d2);
        try { localStorage.setItem("hype_cheval_photo_" + id, d2); } catch (eq) { }
        try { if (res.original) localStorage.setItem("hype_cheval_photo_orig_" + id, res.original); if (res.dataUrl) localStorage.setItem("hype_cheval_photo_orig_pour_" + id, String(res.dataUrl).slice(0, 100)); } catch (eqO) { }
        try {
          if (chevalDyn && chevalDyn.dbId && moi && chevalDyn.ownerId !== moi.id) {
            /* 02/09 : cheval d'une autre — la photo est MIENNE, elle reste sur ma page et
               ne touche jamais la fiche commune. Sans ce chemin elle ne vivait que dans
               le telephone : perdue au changement d'appareil, invisible partout ailleurs. */
            envoyerDataUrlCommePhoto(d2, "cheval-" + chevalDyn.dbId).then(function (rEnv) {
              var urlP = rEnv && rEnv.url;
              if (!urlP) { try { window.alert(hypeT7("La photo n'a pas pu être envoyée. Vérifie ta connexion et réessaie.", "The photo could not be sent. Check your connection and try again.", "No se pudo enviar la foto. Revisa tu conexi\u00f3n y vuelve a intentarlo.", "Impossibile inviare la foto. Controlla la connessione e riprova.", "\u5199\u771f\u3092\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Das Foto konnte nicht gesendet werden. Pr\u00fcfe deine Verbindung und versuche es erneut.", "\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0635\u0648\u0631\u0629. \u062a\u062d\u0642\u0642\u064a \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648\u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "照片未能发送。请检查网络后重试。", "De foto kon niet worden verstuurd. Controleer je verbinding en probeer het opnieuw.", "Não foi possível enviar a foto. Verifique sua conexão e tente de novo.", "Fotot kunde inte skickas. Kontrollera din uppkoppling och försök igen.", "Не удалось отправить фото. Проверь соединение и попробуй ещё раз.", "Nie udało się wysłać zdjęcia. Sprawdź połączenie i spróbuj jeszcze raz.", "사진을 보내지 못했어요. 연결을 확인하고 다시 시도해 주세요.")); } catch (eA1) { } return; }
              setPhotoPerso(urlP);
              /* 10/10 (846) Blandine : « ca devient chiant ces problemes de photo » (Edgard : sa photo sur la fiche, l image par defaut
                 sur la carte). En moderatrice ou responsable du club du cheval, la photo choisie devient AUSSI la photo principale
                 (cartes, clinique, communaute) ; pour les autres, elle reste une photo perso comme avant. */
              try { if (estModerateurHype(moi) || gereClubCh) { hypeMajChevalDroits(chevalDyn.dbId, { photo_url: urlP }).then(function (rMp) { try { if (rMp && !rMp.error && rMp.data && rMp.data.length) setChevalDyn(function (pC) { return Object.assign({}, pC || {}, { photo_url: urlP }); }); } catch (eMp2) { } }); } } catch (eMp) { }
              enregistrerPhotoPersoCheval(chevalDyn.dbId, urlP).then(function (rP) {
                if (rP && rP.error) { try { window.alert(hypeT7("La photo n'a pas pu être enregistrée. Réessaie.", "The photo could not be saved. Try again.", "No se pudo guardar la foto. Vuelve a intentarlo.", "Impossibile salvare la foto. Riprova.", "\u5199\u771f\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Das Foto konnte nicht gespeichert werden. Versuche es erneut.", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "照片未能保存。请重试。", "De foto kon niet worden opgeslagen. Probeer het opnieuw.", "Não foi possível salvar a foto. Tente de novo.", "Fotot kunde inte sparas. Försök igen.", "Не удалось сохранить фото. Попробуй ещё раз.", "Nie udało się zapisać zdjęcia. Spróbuj jeszcze raz.", "사진을 저장하지 못했어요. 다시 시도해 주세요.")); } catch (eA2) { } }
              });
            });
          } else if (chevalDyn && chevalDyn.dbId && moi && chevalDyn.ownerId === moi.id) {
            /* 07/08 : la quete « photo-cheval » lit l'etat GLOBAL ctx.chevaux, qui n'etait
               jamais mis a jour ici — seuls l'etat local du composant, le localStorage et
               la base l'etaient. La quete ne pouvait donc se valider qu'apres un
               rechargement complet, et pas toujours, puisque hypeEtatSansImages remet
               c.photo a null au-dela de 4000 caracteres. On repercute le photo_url dans
               ctx.chevaux des que la base a confirme : la quete se valide aussitot.
               On y met l'URL courte, jamais le base64, pour ne pas regonfler le
               localStorage — c'est precisement ce que hypeEtatSansImages evite. */
            hypeEnregistrerPhoto("cheval", chevalDyn.dbId, res, ancienUrl).then(function (urlFinale) {
              try {
                if (urlFinale && typeof ctx.setChevaux === "function") {
                  var cibleId = String(chevalDyn.dbId);
                  ctx.setChevaux(function (liste) {
                    if (!Array.isArray(liste)) return liste;
                    var touche = false;
                    var neuve = liste.map(function (c) {
                      if (!c || String(c.id) !== cibleId) return c;
                      touche = true;
                      return Object.assign({}, c, { photo_url: urlFinale });
                    });
                    return touche ? neuve : liste;
                  });
                }
              } catch (eQ) { }
            }).catch(function (err) {
              console.error("Echec enregistrement photo de cheval", err);
              try { window.alert(hypeT7("La photo n'a pas pu être enregistrée en base. Vérifie ta connexion et réessaie.", "The photo could not be saved. Check your connection and try again.", "No se pudo guardar la foto. Revisa tu conexi\u00f3n y vuelve a intentarlo.", "Impossibile salvare la foto. Controlla la connessione e riprova.", "\u5199\u771f\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Das Foto konnte nicht gespeichert werden. Pr\u00fcfe deine Verbindung und versuche es erneut.", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629. \u062a\u062d\u0642\u0642\u064a \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648\u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "照片未能保存到数据库。请检查网络后重试。", "De foto kon niet in de database worden opgeslagen. Controleer je verbinding en probeer het opnieuw.", "Não foi possível salvar a foto no banco de dados. Verifique sua conexão e tente de novo.", "Fotot kunde inte sparas i databasen. Kontrollera din uppkoppling och försök igen.", "Не удалось сохранить фото в базе. Проверь соединение и попробуй ещё раз.", "Nie udało się zapisać zdjęcia w bazie. Sprawdź połączenie i spróbuj jeszcze raz.", "사진을 데이터베이스에 저장하지 못했어요. 연결을 확인하고 다시 시도해 주세요.")); } catch (eAl) { }
            });
          }
        } catch (eU) { }
        setToast(T("Photo du cheval mise à jour ✓", "Horse photo updated ✓", "Foto del caballo actualizada ✓", "Foto del cavallo aggiornata ✓", "馬の写真を更新しました ✓", "Pferdefoto aktualisiert ✓", "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0635\u0648\u0631\u0629 \u0627\u0644\u062d\u0635\u0627\u0646 \u2713", "马的照片已更新 ✓", "Foto van het paard bijgewerkt ✓", "Foto do cavalo atualizada ✓", "Hästens foto uppdaterat ✓", "Фото лошади обновлено ✓", "Zdjęcie konia zaktualizowane ✓", "말 사진이 업데이트됐어요 ✓"));
        setTimeout(function () { setToast(null); }, 2000);
      };
      im2.src = res.dataUrl;
  }
  function ajusterPhotoCheval() {
    if (!photoCh) return;
    var origSauveCh = null; try { origSauveCh = localStorage.getItem("hype_cheval_photo_orig_" + id); var pourCh = localStorage.getItem("hype_cheval_photo_orig_pour_" + id); if (origSauveCh && pourCh && String(photoCh || "").slice(0, 100) !== pourCh) { localStorage.removeItem("hype_cheval_photo_orig_" + id); localStorage.removeItem("hype_cheval_photo_orig_pour_" + id); origSauveCh = null; } } catch (eOc) { } /* 30/07 : plus de photo fantome */
    hypeRecadrerDepuisSource(origSauveCh || photoCh, 4 / 5, { teinte: teinte }).then(appliquerPhotoCheval);
  }
  React.useEffect(function () {
    var aV = true;
    try { chargerVedettesSouvenirs(cibleCh).then(function (r) { if (aV) setVedettes((r && r.data && r.data.urls) || []); }).catch(function () { if (aV) setVedettes([]); }); } catch (eV) { setVedettes([]); }
    return function () { aV = false; };
  }, [id]);
  /* 30/08 02h25 (demande Blandine : « reproduis exactement l'encart de la page
     performance pour les autres ») — l'encart d'identite du palmares devient une
     fonction reutilisable. Le libelle du bas n'est plus « Legende Hype » mais le
     TITRE DE LA PAGE, meme couleur et meme graisse. Pas de chiffres ajoutes sur
     les autres onglets : « les autres ont pas forcement besoin de chiffre ». */
  /* (910) Blandine : les 4 pages du cheval en petits mots, sans ronds ni grand titre, posees SOUS la carte du cheval
     (sous la 2e barre grise sur Photos et Videos), juste avant le contenu. Page ouverte : champagne soulignee. */
  function ongletsPanCh(marge) {
    var lst = [["souvenirs", T("Histoire", "Story", "Historia", "Storia", "\u7269\u8a9e", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기")],
      ["photos", T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진")],
      ["palmares", T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")],   /* (939) « Performances » -> « Resultats » (place pour Sante, accord de Blandine) */
      ["videos", T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상")],
      ["actualite", T("Actualit\u00e9", "News", "Actualidad", "Attualit\u00e0", "\u30cb\u30e5\u30fc\u30b9", "Aktuelles", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식")],   /* 15/10 (1145) 6e onglet : la page Actualite */
      ["sante", T("Sant\u00e9", "Health", "Salud", "Salute", "\u5065\u5eb7", "Gesundheit", "\u0627\u0644\u0635\u062d\u0629", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")]];   /* (939) 5e onglet : ouvre la page Sante & soins de ce cheval */
    /* (1145) 6 onglets : sur iPhone ils defilent au doigt (defilement horizontal, le geste ne change pas de page) ; des 768 px, une seule ligne. */
    var largeOn = false; try { largeOn = window.innerWidth >= 768; } catch (eLo) { }
    return h("div", { className: largeOn ? undefined : "hype-onglets-defil", ref: largeOn ? undefined : function (elO) {   /* 21/10 (Blandine : « Actualit » coupe) : l onglet ouvert glisse en entier dans la vue, une fois par page */
        try { if (!elO || elO.__ongletVu === panneau) return; elO.__ongletVu = panneau; var aO = elO.querySelector('[data-onglet-actif="1"]'); if (aO && aO.scrollIntoView) aO.scrollIntoView({ block: "nearest", inline: "center" }); } catch (eOv) { }
      }, style: Object.assign({ display: "flex", justifyContent: "space-between", gap: largeOn ? 8 : 22, margin: marge || "0 16px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", boxSizing: "border-box", maxWidth: "100%", minWidth: 0 }, largeOn ? {} : { overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none" }) },
      largeOn ? null : h("style", { key: "stDef" }, ".hype-onglets-defil::-webkit-scrollbar{display:none}"),
      lst.map(function (tb) {
        var onTb = panneau === tb[0];
        return h("button", { key: "tb" + tb[0], type: "button", "data-onglet-actif": onTb ? "1" : undefined, onClick: function () { if (tb[0] === "sante") { try { window.__santeCheval = { id: (c && c.dbId) || id, nom: (c && c.nom) || "" }; } catch (eSc) { } setEcran("sante-cheval"); return; } setPanneau(tb[0]); }, style: { flex: "0 0 auto", padding: "6px 2px 7px", border: "none", borderBottom: "1.5px solid " + (onTb ? "rgba(214,196,161,0.85)" : "transparent"), marginBottom: -1, background: "none", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: onTb ? 600 : 500, letterSpacing: "0.02em", color: onTb ? "rgba(217,190,140,0.95)" : "rgba(243,238,228,0.42)", textShadow: "0 1px 8px rgba(0,0,0,0.6)"   /* (978) plus transparents (Blandine) */, whiteSpace: "nowrap" } }, tb[1]);
      }));
  }
  /* (914) le bandeau « photo a gauche, nom a cote » s applique des 700 px de large (tablette), suivi en direct */
  var elSt = React.useState(function () { try { return window.innerWidth >= 700; } catch (eW) { return false; } }); var encartLarge = elSt[0], setEncartLarge = elSt[1];
  React.useEffect(function () {
    function fEl() { try { var v = window.innerWidth >= 700; setEncartLarge(function (o) { return o === v ? o : v; }); } catch (eW2) { } }
    window.addEventListener("resize", fEl); return function () { window.removeEventListener("resize", fEl); };
  }, []);
  /* (918) Blandine : « cloture la page en bas comme sur les autres » : meme fin de page que le Cavalier (677) — petit paysage fondu
     images/accueil_v2_fin_de_page_v1.webp (deja dans le depot), filets champagne et « HYPE ». Pages Photos et Videos du cheval. */
  function finPageCh() {
    return h("div", { "aria-hidden": "true", style: { paddingTop: 56 } },
      h("div", { style: { position: "relative", height: 118, overflow: "hidden" } },
        h("img", { src: "images/accueil_v2_fin_de_page_v1.webp", alt: "", loading: "lazy", decoding: "async", onError: function (eI) { try { eI.target.style.display = "none"; } catch (e) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 62%, transparent 100%)" } }),
        h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, #05080B 0%, rgba(5,8,11,0) 12%, rgba(5,8,11,0) 88%, #05080B 100%)" } })),
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "6px 24px 0" } },
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "270deg" : "90deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } }),
        h("span", { dir: "ltr", style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 13, letterSpacing: 4, paddingInlineStart: 4, color: "#C5AA78" } }, "HYPE"),
        h("span", { style: { flex: 1, height: 1, background: "linear-gradient(" + ((function(){ try { return document.documentElement.dir === "rtl"; } catch (eR) { return false; } })() ? "90deg" : "270deg") + ", rgba(197,170,120,0), rgba(197,170,120,0.55))" } })));
  }
  /* 11/10 (978) Blandine : « re-applique exactement le design de la page Sante aux pages Photos, Videos, Histoire et Performances ».
     L ENCART (carte encadree, photo a gauche, nom a droite) DEVIENT LE HERO DE LA PAGE SANTE : photo du cheval pleine largeur
     fondue dans le noir (masque, pas de voile plein), petit titre champagne espace (« PHOTOS »...), nom en Cormorant en grand,
     bouton retour rond champagne pose SUR la photo (la ligne du haut du panneau devient flottante, voir panneauHeroCh).
     Meme hauteur que Sante (330 px + encoche ; 300 px ordinateur). Arabe : tout en miroir. Ancienne version : build 977. */
  /* 12/10 (1011) ENCART D INTRODUCTION des pages Photos (puis Videos) — maquettes de Blandine : photo de fond (cheval a droite),
     degrade sombre a gauche, fine bordure champagne, surtitre, titre Cormorant en italique, phrase, petite icone decorative
     dans un cercle fin en haut a droite. Aucun bouton. En arabe : image et degrade en miroir. */
  function encartIntroCh(img, surtitre, titre, phrase, icone) {
    return h("div", { className: "chvIntro", style: { position: "relative", zIndex: 2, margin: "0 16px 20px", minHeight: 150, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(214,196,161,0.45)", background: "#05080B" } },
      h("img", { src: img, alt: "", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "100% 50%", display: "block", transform: rtlCh ? "scaleX(-1)" : "none" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(5,8,11,0.95) 0%, rgba(7,16,21,0.84) 46%, rgba(5,8,11,0.18) 86%)" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", top: 14, insetInlineEnd: 14, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.6)", background: "rgba(5,8,11,0.35)", display: "flex", alignItems: "center", justifyContent: "center" } }, icone),
      h("div", { style: { position: "relative", padding: "20px 18px 20px", paddingInlineEnd: 62, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 150, boxSizing: "border-box" } },
        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3.2, textTransform: "uppercase", color: "#D6C4A1" } }, surtitre),
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 27, fontWeight: 500, lineHeight: 1.15, color: "#F3EEE4", marginTop: 6, textShadow: "0 2px 14px rgba(0,0,0,0.6)" } }, titre),
        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.55, color: "rgba(243,238,228,0.88)", marginTop: 8, maxWidth: 330, textShadow: "0 1px 10px rgba(0,0,0,0.7)" } }, phrase)));
  }
  /* 15/10 (1144) PAGE ACTUALITE : LA COMPOSITION D AMBIANCE (maquette de Blandine). Toujours visible sous le champ de publication :
     le cheval vu de dos au couchant (images/actualite-ambiance*.webp, decorative, la meme pour tous les chevaux), fondue dans le noir,
     « Son histoire s ecrit ici… », filet champagne et petit fer a cheval, phrase avec le nom du cheval. Le bouton « Creer une
     publication » n apparait que s il n y a aucune publication ET que le visiteur peut publier : il remonte au champ du haut et
     y place le curseur (aucun deuxieme formulaire). Tutoiement comme le reste de l appli (accord de Blandine). */
  function ambianceActuCh(etatA) {
    var nomA = String((c && c.nom) || "");
    var rtlA = rtlCh;
    var ordiA = menuCh, largeA = largeCh;
    var hA = ordiA ? 440 : (largeA ? 420 : 430);
    var masqueCote = largeA ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 22%, #000 78%, rgba(0,0,0,0) 100%)" : "none";
    var CHA = "#C9A66B";
    var boutonA = (etatA && etatA.vide && etatA.peutPublier) ? h("button", { type: "button", onClick: function (eA) {
        try { var racA = eA.currentTarget.closest("[data-mur]"); var taA = racA && racA.querySelector("textarea"); if (taA) { taA.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(function () { try { taA.focus(); } catch (eF) { } }, 350); } } catch (eB) { }
      }, style: { marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, minHeight: 46, padding: "0 26px", borderRadius: 999, border: "1px solid " + CHA, background: "rgba(5,8,11,0.55)", color: CHA, fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" } },
      h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: "M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" })),
      T("Cr\u00e9er une publication", "Create a post", "Crear una publicaci\u00f3n", "Crea un post", "\u6295\u7a3f\u3092\u4f5c\u6210", "Beitrag erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0645\u0646\u0634\u0648\u0631", "创建帖子", "Een bericht maken", "Criar uma publicação", "Skapa ett inlägg", "Создать публикацию", "Utwórz publikację", "게시물 만들기")) : null;
    var fer = h("svg", { viewBox: "0 0 24 24", width: 22, height: 22, fill: "none", stroke: CHA, strokeWidth: 1.6, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M6 4.5c-1.5 2-2.2 4.4-2.2 7 0 4.6 3.7 8 8.2 8s8.2-3.4 8.2-8c0-2.6-.7-5-2.2-7M9 4.6c-1 1.6-1.5 3.6-1.5 5.8 0 2.7 2 4.6 4.5 4.6s4.5-1.9 4.5-4.6c0-2.2-.5-4.2-1.5-5.8" }));
    var filet = function (sens) { return h("span", { style: { flex: "0 1 130px", height: 1, background: "linear-gradient(" + sens + ", rgba(201,166,107,0) 0%, rgba(201,166,107,0.85) 100%)" } }); };
    /* 19/10 soir (maquette ordinateur validee par Blandine) — TABLETTE / ORDINATEUR : le bandeau devient une bande horizontale
       d environ 250 px, la photo du cheval au couchant a gauche, un degrade sombre vers la droite et le texte a droite.
       iPhone : la composition d avant, inchangee (branche ci-dessous). */
    var contenuA = [
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: ordiA ? 40 : (largeA ? 38 : 32), fontWeight: 500, lineHeight: 1.12, color: "#F3EEE4", textShadow: "0 2px 18px rgba(0,0,0,0.75)" } },
          T("Son histoire s\u2019\u00e9crit ici\u2026", "Their story is written here\u2026", "Su historia se escribe aqu\u00ed\u2026", "La sua storia si scrive qui\u2026", "\u305d\u306e\u7269\u8a9e\u306f\u3001\u3053\u3053\u3067\u7db4\u3089\u308c\u308b\u2026", "Seine Geschichte wird hier geschrieben\u2026", "\u0642\u0635\u062a\u0647 \u062a\u064f\u0643\u062a\u0628 \u0647\u0646\u0627\u2026", "她的故事将写在这里…", "Haar verhaal wordt hier geschreven…", "A história dela é escrita aqui…", "Hennes historia skrivs här…", "Её история пишется здесь…", "Tu pisze się jej historia…", "이 기수의 이야기가 여기에 쓰여요…")),
        h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", maxWidth: 420, margin: "14px 0 12px" } }, filet("90deg"), fer, filet("270deg")),
        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: largeA ? 15 : 14, lineHeight: 1.6, color: "rgba(243,238,228,0.82)", maxWidth: 440, textShadow: "0 1px 10px rgba(0,0,0,0.8)" } },
          T("Partage les moments importants, les belles victoires, les petites victoires et le quotidien de {nom}.", "Share the important moments, the big wins, the small victories and the everyday life of {nom}.", "Comparte los momentos importantes, las grandes victorias, las peque\u00f1as victorias y el d\u00eda a d\u00eda de {nom}.", "Condividi i momenti importanti, le belle vittorie, le piccole vittorie e la quotidianit\u00e0 di {nom}.", "{nom}\u306e\u5927\u5207\u306a\u77ac\u9593\u3001\u8f1d\u304b\u3057\u3044\u52dd\u5229\u3001\u5c0f\u3055\u306a\u52dd\u5229\u3001\u305d\u3057\u3066\u65e5\u3005\u306e\u66ae\u3089\u3057\u3092\u30b7\u30a7\u30a2\u3057\u3088\u3046\u3002", "Teile die wichtigen Momente, die gro\u00dfen Siege, die kleinen Erfolge und den Alltag von {nom}.", "\u0634\u0627\u0631\u0643\u064a \u0627\u0644\u0644\u062d\u0638\u0627\u062a \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a \u0627\u0644\u0643\u0628\u064a\u0631\u0629 \u0648\u0627\u0644\u0635\u063a\u064a\u0631\u0629 \u0648\u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629 \u0644\u0640{nom}.", "分享 {nom} 的重要时刻、精彩胜利、小小的胜利和日常点滴。", "Deel de belangrijke momenten, de grote overwinningen, de kleine overwinningen en het dagelijks leven van {nom}.", "Compartilhe os momentos importantes, as lindas vitórias, as pequenas vitórias e o dia a dia de {nom}.", "Dela de viktiga ögonblicken, de stora segrarna, de små segrarna och vardagen med {nom}.", "Делись важными моментами, красивыми победами, маленькими победами и повседневной жизнью {nom}.", "Dziel się ważnymi chwilami, wielkimi zwycięstwami, małymi sukcesami i codziennością {nom}.", "{nom}의 소중한 순간, 멋진 승리, 작은 성취, 그리고 일상을 공유하세요.").split("{nom}").join(nomA)),
        boutonA];
    if (largeA) {
      return h("div", { style: { position: "relative", margin: "34px 0 0", height: ordiA ? 260 : 240, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(201,166,107,0.22)", background: "#05080B" } },
        h("img", { src: "images/actualite-ambiance.webp", srcSet: "images/actualite-ambiance-mobile.webp 720w, images/actualite-ambiance.webp 1086w", sizes: "700px", alt: "", loading: "lazy", decoding: "async",
          style: { position: "absolute", top: 0, bottom: 0, insetInlineStart: 0, width: "62%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block", transform: rtlA ? "scaleX(-1)" : "none" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlA ? "270deg" : "90deg") + ", rgba(5,8,11,0) 18%, rgba(5,8,11,0.78) 50%, #05080B 66%)" } }),
        h("div", { style: { position: "relative", zIndex: 1, height: "100%", width: "54%", marginInlineStart: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 36px", boxSizing: "border-box" } }, contenuA[0], contenuA[1], contenuA[2], contenuA[3]));
    }
    return h("div", { style: { position: "relative", margin: largeA ? "26px 0 18px" : "22px -16px 14px", minHeight: hA, overflow: "hidden" } },
      h("div", { "aria-hidden": "true", style: largeA ? { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, margin: "0 auto", width: "100%", maxWidth: 680, WebkitMaskImage: masqueCote, maskImage: masqueCote } /* (1144) grand ecran : cadre centre, la tete du cheval reste entiere */ : { position: "absolute", inset: 0 } },
        h("img", { src: "images/actualite-ambiance.webp", srcSet: "images/actualite-ambiance-mobile.webp 720w, images/actualite-ambiance.webp 1086w", sizes: largeA ? "900px" : "100vw", alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: largeA ? "40% 26%" : "40% 32%", display: "block", transform: rtlA ? "scaleX(-1)" : "none" } })),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, #05080B 0%, rgba(5,8,11,0.15) 18%, rgba(5,8,11,0.10) 42%, rgba(5,8,11,0.72) 70%, #05080B 100%)" } }),
      h("div", { style: { position: "relative", zIndex: 1, minHeight: hA, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", textAlign: "center", padding: largeA ? "0 32px 30px" : "0 22px 26px", boxSizing: "border-box" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: ordiA ? 40 : (largeA ? 38 : 32), fontWeight: 500, lineHeight: 1.12, color: "#F3EEE4", textShadow: "0 2px 18px rgba(0,0,0,0.75)" } },
          T("Son histoire s\u2019\u00e9crit ici\u2026", "Their story is written here\u2026", "Su historia se escribe aqu\u00ed\u2026", "La sua storia si scrive qui\u2026", "\u305d\u306e\u7269\u8a9e\u306f\u3001\u3053\u3053\u3067\u7db4\u3089\u308c\u308b\u2026", "Seine Geschichte wird hier geschrieben\u2026", "\u0642\u0635\u062a\u0647 \u062a\u064f\u0643\u062a\u0628 \u0647\u0646\u0627\u2026", "她的故事将写在这里…", "Haar verhaal wordt hier geschreven…", "A história dela é escrita aqui…", "Hennes historia skrivs här…", "Её история пишется здесь…", "Tu pisze się jej historia…", "이 기수의 이야기가 여기에 쓰여요…")),
        h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", maxWidth: 420, margin: "14px 0 12px" } }, filet("90deg"), fer, filet("270deg")),
        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: largeA ? 15 : 14, lineHeight: 1.6, color: "rgba(243,238,228,0.82)", maxWidth: 440, textShadow: "0 1px 10px rgba(0,0,0,0.8)" } },
          T("Partage les moments importants, les belles victoires, les petites victoires et le quotidien de {nom}.", "Share the important moments, the big wins, the small victories and the everyday life of {nom}.", "Comparte los momentos importantes, las grandes victorias, las peque\u00f1as victorias y el d\u00eda a d\u00eda de {nom}.", "Condividi i momenti importanti, le belle vittorie, le piccole vittorie e la quotidianit\u00e0 di {nom}.", "{nom}\u306e\u5927\u5207\u306a\u77ac\u9593\u3001\u8f1d\u304b\u3057\u3044\u52dd\u5229\u3001\u5c0f\u3055\u306a\u52dd\u5229\u3001\u305d\u3057\u3066\u65e5\u3005\u306e\u66ae\u3089\u3057\u3092\u30b7\u30a7\u30a2\u3057\u3088\u3046\u3002", "Teile die wichtigen Momente, die gro\u00dfen Siege, die kleinen Erfolge und den Alltag von {nom}.", "\u0634\u0627\u0631\u0643\u064a \u0627\u0644\u0644\u062d\u0638\u0627\u062a \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a \u0627\u0644\u0643\u0628\u064a\u0631\u0629 \u0648\u0627\u0644\u0635\u063a\u064a\u0631\u0629 \u0648\u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629 \u0644\u0640{nom}.", "分享 {nom} 的重要时刻、精彩胜利、小小的胜利和日常点滴。", "Deel de belangrijke momenten, de grote overwinningen, de kleine overwinningen en het dagelijks leven van {nom}.", "Compartilhe os momentos importantes, as lindas vitórias, as pequenas vitórias e o dia a dia de {nom}.", "Dela de viktiga ögonblicken, de stora segrarna, de små segrarna och vardagen med {nom}.", "Делись важными моментами, красивыми победами, маленькими победами и повседневной жизнью {nom}.", "Dziel się ważnymi chwilami, wielkimi zwycięstwami, małymi sukcesami i codziennością {nom}.", "{nom}의 소중한 순간, 멋진 승리, 작은 성취, 그리고 일상을 공유하세요.").split("{nom}").join(nomA)),
        boutonA));
  }
  /* 19/10 (soir) Blandine : « Oui sur les autres aussi » - le hero des sous-pages d un cavalier sur TOUS les onglets du cheval
     (Photos, Videos, Resultats, Histoire, Actualite), avec la photo du cheval ; la fiche garde sa fleche, Partager et le drapeau. */
  function heroSousPageCh(titrePage, secoursPhoto) {
    return hypeHeroSousPageCavalier({ large: largeCh, ordi: menuCh, sansRetour: true, libelle: titrePage, nom: String(c.nom || ""), photo: (chevalDyn && chevalDyn.photo_palmares) || photoCh || secoursPhoto || "" });
  }
  function encartIdentiteCh(titrePage, secoursPhoto) {   /* (1142) secoursPhoto : photo si le cheval n en a pas (page Actualite) */
    var photoPalmId = (chevalDyn && chevalDyn.photo_palmares) || photoCh || secoursPhoto || "";
    var rtlE = false; try { rtlE = document.documentElement.dir === "rtl"; } catch (eR) { }
    var nomE = String(c.nom || "");
    var lgN = nomE.length;
    var tailleNom = (lgN <= 10 ? 40 : (lgN <= 16 ? 34 : (lgN <= 24 ? 29 : 25))) * (largeCh ? 1.4 : 1);
    var blocNom = h("div", { style: { minWidth: 0, maxWidth: photoPalmId ? "50%" : "100%" } },
      h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3.6, textTransform: "uppercase", color: "#D6C4A1", textShadow: "0 1px 10px rgba(0,0,0,0.7)" } }, titrePage),
      h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: tailleNom, fontWeight: 600, lineHeight: 1.04, marginTop: 6, color: "#F6F1E7", overflowWrap: "normal", wordBreak: "keep-all", textShadow: "0 2px 18px rgba(0,0,0,0.6)" } }, nomE));
    var admin = (moi && typeof estModerateurHype === "function" && estModerateurHype(moi) && chevalDyn && chevalDyn.dbId) ? h("button", { onClick: changerPhotoPalm, title: "Changer la photo (admin)", "aria-label": "…", style: { position: "absolute", bottom: 6, insetInlineEnd: 8, zIndex: 3, minWidth: 30, height: 24, padding: "0 4px", border: "none", background: "transparent", color: "rgba(243,238,228,0.55)", fontSize: 18, cursor: "pointer" } }, "…") : null;
    if (!photoPalmId) {
      return h("div", { style: { position: "relative", padding: "calc(env(safe-area-inset-top) + 66px) 20px 4px", marginBottom: 4 } }, blocNom, admin);
    }
    /* 16/10 (1167) Blandine : « tu l as deplacee [...] elle est en plein sur le titre » (1166 mettait la photo en pleine largeur : cadrage
       change). Sur iPhone, la photo reprend EXACTEMENT sa place et son cadrage d avant (80 % a droite, meme position) ; seuls les effets
       changent : bord gauche qui ne s efface plus totalement (fondu court : 0 -> 60 % a 5 % -> 92 % a 11 % -> plein a 16 %, au lieu de 0 -> 75 % a 12 % -> plein a 26 %), fond noir derriere la
       photo qui se fond vers le fond de la page en bas, ombre du bas a gauche adoucie. Toutes les sous-pages. Tablette / ordinateur inchanges. */
    if (!largeCh) {
      return h("div", { style: { position: "relative", width: "100%", height: "calc(env(safe-area-inset-top) + 330px)", overflow: "hidden", marginBottom: 4, background: "linear-gradient(180deg, #05080B 0%, #05080B 62%, rgba(5,8,11,0.55) 84%, rgba(5,8,11,0) 100%)" } },
        h("div", { style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "80%", WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 82%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 82%, rgba(0,0,0,0) 100%)" } },
          h("img", { src: photoPalmId, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtlE ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.68) 22%, rgba(0,0,0,0.92) 32%, #000 40%)", maskImage: "linear-gradient(" + (rtlE ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.68) 22%, rgba(0,0,0,0.92) 32%, #000 40%)" } })),
        h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, left: 0, right: 0, height: 90, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,7,9,0.5) 0%, rgba(6,7,9,0) 100%)" } }),
        h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 75% 45% at " + (rtlE ? "100%" : "0%") + " 100%, rgba(6,7,9,0.6) 0%, rgba(6,7,9,0.32) 45%, rgba(6,7,9,0) 100%)" } }),
        admin,
        h("div", { style: { position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, bottom: 0, zIndex: 2, padding: "0 20px 18px" } }, blocNom));
    }
    return h("div", { style: { position: "relative", width: "100%", height: 300, overflow: "hidden", marginBottom: 4 } },
      h("div", { style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "68%", WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)" } },
        h("img", { src: photoPalmId, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtlE ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 12%, #000 26%)", maskImage: "linear-gradient(" + (rtlE ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 12%, #000 26%)" } })),
      h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, left: 0, right: 0, height: 90, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,7,9,0.5) 0%, rgba(6,7,9,0) 100%)" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 75% 45% at " + (rtlE ? "100%" : "0%") + " 100%, rgba(6,7,9,0.88) 0%, rgba(6,7,9,0.55) 45%, rgba(6,7,9,0) 100%)" } }),
      admin,
      h("div", { style: { position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, bottom: 0, zIndex: 2, padding: largeCh ? "0 32px 26px" : "0 20px 18px" } }, blocNom));
  }
  /* (978) pages qui ouvrent sur ce hero : fond de la page Sante + ligne du haut (retour, langue) flottante par-dessus la photo */
  /* 12/10 (1028) fonds photographiques des pages Photos et « Tous les souvenirs » (images validees par Blandine) : UNE seule
     image chargee, choisie selon l ecran (9:16 iPhone, 3:4 tablette, 16:9 ordinateur), jamais etiree (cover). Autres pages : Sante. */
  function fondPanCh() {
    if (panneau !== "photos") return "images/FOND_SANTE.webp";
    var forme = menuCh ? "ordinateur" : (largeCh ? "tablette" : "mobile");
    return "images/" + (tousSouvCh ? "souvenirs" : "photos") + "-fond-" + forme + ".webp";
  }
  function panHeroCh() { return !!panneau && (["souvenirs", "photos", "videos", "actualite" /* 15/10 (1142) */].indexOf(panneau) >= 0 || (panneau === "palmares" && !palmTech)); }
  /* 30/08 02h20 : la galerie previent quand elle est vide, pour que la mascotte
     s'affiche EN HAUT de l'onglet Photos (demande Blandine). 🟥 05/09 : Galerie retiree ;
     galVideCh n'a plus de source (personne ne l'active plus) et disparait avec elle. */
  var mmSt = React.useState(false); var revoirMascotte = mmSt[0], setRevoirMascotte = mmSt[1];
  /* 10/10 (882) ORDINATEUR (>= 1024 px), PAGE PHOTOS DU CHEVAL SEULEMENT : la page laisse le menu de gauche visible,
     son contenu s elargit (1240 px max, centre) et l en-tete grandit. Fiche principale et autres onglets : inchanges. */
  /* 12/10 (1014) Blandine : « adapte aussi en version tablette ». La mise en page large de la fiche (heros, onglets, grilles) vaut
     des 768 px ; le menu de gauche (et son decalage de 210 px) reste reserve aux ecrans >= 1024 px (menuCh). */
  var menuCh = (typeof useHypeLarge === "function") ? useHypeLarge() : false;
  var largeCh = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : menuCh;
  /* 15/10 (1153) NOUVELLE FICHE (ficheV4) : tablette / ordinateur, ou apercu cache #chevalv4-<id> sur telephone */
  var nouvV4 = !!largeCh || (function () { try { var tv = window.__ficheV4TelId; return !!(tv && (String(tv) === String(id) || String(tv) === String((c && c.dbId) || ""))); } catch (eV4) { return false; } })();   /* 15/10 (1164) RETOUR EN ARRIERE : Blandine n avait PAS donne son accord pour le telephone (« je t avais dit de pas brancher sur tel ») ; iPhone = ancienne fiche ; nouvelle fiche seulement tablette / ordinateur + apercu cache #chevalv4-<id> */
  var v4mSt = React.useState(null); var v4Med = v4mSt[0], setV4Med = v4mSt[1];
  var v4tSt = React.useState(false); var v4Team = v4tSt[0], setV4Team = v4tSt[1];
  var v4pSt = React.useState(false); var v4Ped = v4pSt[0], setV4Ped = v4pSt[1];
  React.useEffect(function () {
    if (!nouvV4) return;
    var vifM = true;
    function chargerV4() { try { if (typeof chargerPhotosSouvenirs !== "function") { setV4Med([]); return; } chargerPhotosSouvenirs(cibleCh).then(function (r) { if (vifM) setV4Med(r || []); }).catch(function () { if (vifM) setV4Med([]); }); } catch (eCh) { setV4Med([]); } }
    setV4Med(null); chargerV4();
    window.addEventListener("hype-souvenirs-maj", chargerV4);
    return function () { vifM = false; window.removeEventListener("hype-souvenirs-maj", chargerV4); };
  }, [nouvV4, cibleCh]);
  React.useEffect(function () {
    if (!nouvV4) return;
    var vifT = true; setV4Team(false);
    var dbT = (c && c.dbId) || (chevalDyn && chevalDyn.dbId);
    if (!dbT || typeof hypeRequeteTeam !== "function" || typeof supa === "undefined" || !supa) return;
    (async function () {
      try {
        var rgT = await hypeRequeteTeam("id"); var GT = rgT && rgT.data; if (!GT || !GT.id) return;
        var r2T = await supa.from("groupes_chevaux").select("cheval_id").eq("groupe_id", GT.id).eq("cheval_id", dbT);
        if (vifT && r2T && !r2T.error && r2T.data && r2T.data.length) setV4Team(true);
      } catch (eTm) { }
    })();
    return function () { vifT = false; };
  }, [nouvV4, (c && c.dbId) || "", (chevalDyn && chevalDyn.dbId) || ""]);
  var rtlCh = (function () { try { return document.documentElement.dir === "rtl" || ctx.langue === "ar"; } catch (eR) { return false; } })();
  /* 10/10 (887) onglet Videos du cheval : case de la grille selon le rang et le nombre, et vignette (fonction partagee
     hypeMiniatureVideo NON modifiee : utilisee seulement en secours pour les anciennes videos sans image Mux). */
  var rvSt = React.useState({}); var ratiosVid = rvSt[0], setRatiosVid = rvSt[1];   /* (887) proportion de chaque video, lue sur son image Mux */
  function caseVidCh(i, n, url) {
    var rV = (url && ratiosVid[url]) || 0;
    var st = { position: "relative", width: "100%", minWidth: 0, boxSizing: "border-box", height: 196 /* piste A : 168 -> 196 */, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(214,196,161,0.22)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", cursor: "pointer" };
    /* carte elargie : une video horizontale prend sa vraie proportion (plus de bandes), les autres gardent une hauteur bornee */
    if (n === 1) return Object.assign(st, { gridColumn: "1 / -1", width: "80%", justifySelf: "center" }, rV >= 1.2 ? { height: "auto", aspectRatio: String(Math.min(rV, 3.2)), maxHeight: 220 } : { height: 220 });
    if (n % 2 === 1 && i === n - 1) return Object.assign(st, { gridColumn: "1 / -1", width: "78%", justifySelf: "center" }, rV >= 1.2 ? { height: "auto", aspectRatio: String(Math.min(rV, 3.2)), maxHeight: 200 } : { height: 186 });
    return st;
  }
  /* (905) VUE EN COLLECTIONS de l onglet Videos. Ne s affiche que si au moins une collection contient une video
     que la personne peut deja voir (intersection avec chVids / chVidsCom prets : rien de prive ne fuit).
     Sinon : null, et la galerie d avant s affiche telle quelle. Une video n apparait qu une fois. */
  /* (906) COLLECTIONS — CREATION ET GESTION. Droits : proprietaire du cheval, proprietaire de son ecurie, admins
     (meme regle que la base, qui a le dernier mot : un refus s affiche, jamais silencieux). */
  function peutGererCol() {
    try {
      if (!moi) return false;
      if (typeof estModerateurHype === "function" && estModerateurHype(moi)) return true;
      if (chevalDyn && chevalDyn.ownerId === moi.id) return true;
      if (chevalDyn && chevalDyn.club && typeof clubRevendiquePar === "function" && clubRevendiquePar(chevalDyn.club, moi)) return true;
    } catch (ePg) { }
    return false;
  }
  function videosPretesCh() {
    var l = (chVids || []).slice();
    (chVidsCom || []).forEach(function (x) { if (x && x.url && (!x.statut || x.statut === "ready") && l.indexOf(x.url) < 0) l.push(x.url); });
    return l;
  }
  function rechargerCollVid() {
    try { if (typeof listerCollectionsVideos === "function") return listerCollectionsVideos(cibleCh).then(function (rCv) { setCollVid((rCv && rCv.data) || []); }); } catch (eRc) { }
    return Promise.resolve();
  }
  function ouvrirCol(col) { setColErr(""); setColConfSup(false); setColEdit(col ? { id: col.id, nom: String(col.nom || ""), vids: (Array.isArray(col.videos) ? col.videos : []).slice() } : { id: null, nom: "", vids: [] }); }
  var msgRefusCol = T("Action refusée : tu n’as pas les droits sur les collections de ce cheval.", "Action refused: you don’t have rights on this horse’s collections.", "Acción rechazada: no tienes derechos sobre las colecciones de este caballo.", "Azione rifiutata: non hai i diritti sulle raccolte di questo cavallo.", "この馬のコレクションを編集する権限がありません。", "Aktion abgelehnt: Du hast keine Rechte an den Sammlungen dieses Pferdes.", "تم رفض الإجراء: ليس لديك صلاحيات على مجموعات هذا الحصان.", "操作被拒绝：你对这匹马的合集没有权限。", "Actie geweigerd: je hebt geen rechten op de collecties van dit paard.", "Ação recusada: você não tem permissões sobre as coleções deste cavalo.", "Åtgärden nekades: du har inga rättigheter för den här hästens samlingar.", "Действие отклонено: у тебя нет прав на коллекции этой лошади.", "Akcja odrzucona: nie masz uprawnień do kolekcji tego konia.", "허용되지 않은 동작이에요. 이 말의 컬렉션에 대한 권한이 없어요.");
  async function enregistrerCol() {
    var e = colEdit; if (!e || colBusy) return;
    var nom = String(e.nom || "").trim();
    if (!nom) { setColErr(T("Le nom est obligatoire.", "The name is required.", "El nombre es obligatorio.", "Il nome è obbligatorio.", "名前は必須です。", "Der Name ist erforderlich.", "الاسم مطلوب.", "名称必填。", "De naam is verplicht.", "O nome é obrigatório.", "Namn måste anges.", "Название обязательно.", "Nazwa jest wymagana.", "이름은 필수예요.")); return; }
    setColBusy(true); setColErr("");
    try {
      var r;
      if (e.id) r = await supa.from("collections_videos").update({ nom: nom, videos: e.vids }).eq("id", e.id).select("id");
      else {
        var maxO = (collVid || []).reduce(function (m, cO) { return Math.max(m, cO.ordre || 0); }, -1);
        r = await supa.from("collections_videos").insert({ cible: cibleCh, nom: nom, videos: e.vids, ordre: maxO + 1 }).select("id");
      }
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(msgRefusCol);
      /* une video n appartient qu a UNE collection : on la retire des autres */
      var aRetirer = (collVid || []).filter(function (cA) { return cA.id !== e.id && (Array.isArray(cA.videos) ? cA.videos : []).some(function (u) { return e.vids.indexOf(u) >= 0; }); });
      for (var iA = 0; iA < aRetirer.length; iA++) {
        var rA = await supa.from("collections_videos").update({ videos: aRetirer[iA].videos.filter(function (u) { return e.vids.indexOf(u) < 0; }) }).eq("id", aRetirer[iA].id).select("id");
        if (rA && rA.error) throw rA.error;
      }
      await rechargerCollVid();
      setColEdit(null);
    } catch (eEc) { setColErr(String((eEc && eEc.message) || eEc)); }
    setColBusy(false);
  }
  async function supprimerCol() {
    var e = colEdit; if (!e || !e.id || colBusy) return;
    setColBusy(true); setColErr("");
    try {
      var r = await supa.from("collections_videos").delete().eq("id", e.id).select("id");
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(msgRefusCol);
      await rechargerCollVid();
      setColEdit(null);
    } catch (eSc) { setColErr(String((eSc && eSc.message) || eSc)); }
    setColBusy(false);
  }
  async function deplacerCol(sens) {
    var e = colEdit; if (!e || !e.id || colBusy) return;
    var l = (collVid || []).slice();
    var i = -1; l.forEach(function (cX, k) { if (cX.id === e.id) i = k; });
    var j = i + sens; if (i < 0 || j < 0 || j >= l.length) return;
    var tmp = l[i]; l[i] = l[j]; l[j] = tmp;
    setColBusy(true); setColErr("");
    try {
      for (var k = 0; k < l.length; k++) {
        if ((l[k].ordre || 0) === k) continue;
        var rD = await supa.from("collections_videos").update({ ordre: k }).eq("id", l[k].id).select("id");
        if (rD && rD.error) throw rD.error;
        if (!rD || !rD.data || !rD.data.length) throw new Error(msgRefusCol);
      }
      await rechargerCollVid();
    } catch (eDp) { setColErr(String((eDp && eDp.message) || eDp)); }
    setColBusy(false);
  }
  function carteCreerCol() {
    var nbP = videosPretesCh().length;
    /* 20/10 Blandine (« choix a », proposition U) : le cheval noir a la porte de l ecurie au coucher du soleil, a droite (a gauche en arabe), fondu dans le noir cote texte ;
       texte aligne au debut de la ligne. Meme geste qu avant. */
    var carte = (peutGererCol() && nbP > 0) ? h("button", { key: "colNew", type: "button", onClick: function () { ouvrirCol(null); }, style: { position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 10, width: "100%", minHeight: largeCh ? 170 : 150, marginTop: 48 /* 20/10 Blandine : « descends l onglet creer une collection » (22 -> 48) */, padding: largeCh ? "24px 28px" : "22px 18px", boxSizing: "border-box", borderRadius: 16, border: "1px dashed rgba(214,196,161,0.55)", background: "#0A0C0C", cursor: "pointer", textAlign: "start" } },
      h("img", { src: "images/albumLegendeFond.jpg", alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async", draggable: false, onError: function (eT) { try { eT.currentTarget.style.display = "none"; } catch (e0) { } }, style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: largeCh ? "46%" : "56%", height: "100%", objectFit: "cover", objectPosition: "20% 40%", pointerEvents: "none", WebkitMaskImage: "linear-gradient(" + (rtlCh ? "90deg" : "270deg") + ", #000 45%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(" + (rtlCh ? "90deg" : "270deg") + ", #000 45%, rgba(0,0,0,0) 100%)" } }),
      h("span", { style: { position: "relative", display: "flex", alignItems: "center", gap: 12, maxWidth: largeCh ? "56%" : "62%" } },
        h("span", { "aria-hidden": "true", style: { width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D6C4A1", fontSize: 20, lineHeight: 1 } }, "+"),
        h("span", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 21, fontWeight: 600, lineHeight: 1.15, color: "#D6C4A1" } }, T("Créer une collection", "Create a collection", "Crear una colección", "Crea una raccolta", "コレクションを作成", "Sammlung erstellen", "إنشاء مجموعة", "创建合集", "Een collectie maken", "Criar uma coleção", "Skapa en samling", "Создать коллекцию", "Utwórz kolekcję", "컬렉션 만들기"))),
      h("span", { style: { position: "relative", maxWidth: largeCh ? "48%" : "50%", fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.5, color: "rgba(243,238,228,0.78)" } }, T("Organise tes vidéos comme tu le souhaites", "Organise your videos the way you like", "Organiza tus vídeos como quieras", "Organizza i tuoi video come preferisci", "動画を自由に整理できます", "Ordne deine Videos so, wie du möchtest", "نظّم فيديوهاتك كما تشاء", "按你喜欢的方式整理你的视频", "Orden je video's zoals jij wilt", "Organize seus vídeos como quiser", "Ordna dina videor som du vill", "Организуй свои видео так, как тебе удобно", "Uporządkuj swoje wideo tak, jak lubisz", "동영상을 원하는 대로 정리하세요"))) : null;
    var fen = fenetreCol();
    if (fen && typeof ReactDOM !== "undefined" && ReactDOM.createPortal) fen = ReactDOM.createPortal(fen, document.body);   /* (906) au-dessus de la barre du bas */
    return h(React.Fragment, null, carte, fen, fenetreCouv() /* (912) */);
  }
  function fenetreCol() {
    var e = colEdit; if (!e) return null;
    var prets = videosPretesCh();
    var nomDe = {}; (collVid || []).forEach(function (cN) { if (cN.id !== e.id) (Array.isArray(cN.videos) ? cN.videos : []).forEach(function (u) { nomDe[u] = String(cN.nom || ""); }); });
    var idx = -1, nbC = (collVid || []).length; (collVid || []).forEach(function (cX, k) { if (cX.id === e.id) idx = k; });
    var btnS = { minHeight: 40, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.45)", background: "rgba(16,29,34,0.55)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, cursor: "pointer" };
    return h("div", { key: "colWin", "data-noswipe": "true", onClick: function () { if (!colBusy) setColEdit(null); }, style: { position: "fixed", inset: 0, zIndex: 10050, background: "rgba(3,7,6,0.78)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { dir: rtlCh ? "rtl" : "ltr", onClick: function (eS) { eS.stopPropagation(); }, style: { WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" /* (909) plus de selection de texte par appui long */, width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", WebkitOverflowScrolling: "touch", boxSizing: "border-box", padding: "20px 16px calc(env(safe-area-inset-bottom) + 20px)", borderRadius: "22px 22px 0 0", border: "1px solid rgba(214,196,161,0.25)", borderBottom: 0, background: "linear-gradient(165deg,#0E1A18 0%,#070D0C 100%)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 23, fontWeight: 600, color: "#F3EEE4", marginBottom: 14 } },
          e.id ? T("Modifier la collection", "Edit the collection", "Editar la colección", "Modifica la raccolta", "コレクションを編集", "Sammlung bearbeiten", "تعديل المجموعة", "编辑合集", "De collectie bewerken", "Editar a coleção", "Redigera samlingen", "Изменить коллекцию", "Edytuj kolekcję", "컬렉션 수정") : T("Nouvelle collection", "New collection", "Nueva colección", "Nuova raccolta", "新しいコレクション", "Neue Sammlung", "مجموعة جديدة", "新合集", "Nieuwe collectie", "Nova coleção", "Ny samling", "Новая коллекция", "Nowa kolekcja", "새 컬렉션")),
        h("input", { type: "text", value: e.nom, maxLength: 60, dir: "auto", placeholder: T("Nom de la collection", "Collection name", "Nombre de la colección", "Nome della raccolta", "コレクション名", "Name der Sammlung", "اسم المجموعة", "合集名称", "Naam van de collectie", "Nome da coleção", "Samlingens namn", "Название коллекции", "Nazwa kolekcji", "컬렉션 이름"), onChange: function (eI) { var v = eI.target.value; setColEdit(function (o) { return Object.assign({}, o, { nom: v }); }); }, style: { width: "100%", boxSizing: "border-box", minHeight: 46, padding: "0 14px", borderRadius: 12, border: "1px solid rgba(214,196,161,0.35)", background: "rgba(3,7,6,0.6)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 16, outline: "none" } }),
        h("div", { style: { margin: "18px 0 10px", fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#D6C4A1" } }, T("Ses vidéos", "Its videos", "Sus vídeos", "I suoi video", "動画", "Seine Videos", "فيديوهاته", "它的视频", "Zijn video's", "Os vídeos dele", "Videor", "Его видео", "Jego wideo", "동영상") + " · " + e.vids.length),
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 } },
          prets.map(function (u, iP) {
            var coche = e.vids.indexOf(u) >= 0;
            var vg = hypeImageVideo(u, 240);   /* (911) couverture enregistree > Mux > fabriquee */
            return h("div", { key: "cp" + iP, role: "button", onClick: function () { setColEdit(function (o) { var l = o.vids.slice(); var k = l.indexOf(u); if (k >= 0) l.splice(k, 1); else l.push(u); return Object.assign({}, o, { vids: l }); }); }, style: { cursor: "pointer" } },
              h("div", { style: { position: "relative", width: "100%", aspectRatio: "1 / 1", borderRadius: 10, overflow: "hidden", border: coche ? "2px solid #D6C4A1" : "1px solid rgba(255,255,255,0.12)", background: "#0A1215" } },
                vg ? h("img", { src: vg, alt: "", loading: "lazy", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: coche ? 1 : 0.75 } })
                  /* (909) GEL DE L IPHONE : les anciennes videos (fichiers .mov/.mp4, sans image Mux) creaient chacune un lecteur
                     video pour leur vignette — toutes d un coup dans cette fenetre, en plus de la galerie derriere. Ici : une simple
                     case sombre avec ▶, aucun lecteur. */
                  : (colEdit && hypeVignetteLegacy(u)) ? h("img", { src: hypeVignetteLegacy(u), alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: coche ? 1 : 0.75 } })   /* (911) image fabriquee une par une */
                  : h("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(165deg,#111B1F 0%,#0B1215 100%)" } },
                      h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", style: { width: 22, height: 22, fill: "rgba(243,238,228,0.75)" } }, h("path", { d: "M7 4.5v15l12-7.5z" }))),
                h("span", { "aria-hidden": "true", style: { position: "absolute", top: 6, insetInlineEnd: 6, width: 22, height: 22, borderRadius: "50%", border: "1px solid " + (coche ? "#D6C4A1" : "rgba(255,255,255,0.6)"), background: coche ? "#D6C4A1" : "rgba(3,7,6,0.45)", color: "#070D0C", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" } }, coche ? "✓" : "")),
              (!coche && nomDe[u]) ? h("div", { dir: "auto", style: { marginTop: 4, fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, color: "rgba(243,238,228,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, nomDe[u]) : null);
          })),
        e.id ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 } },
          h("button", { type: "button", disabled: colBusy || idx <= 0, onClick: function () { deplacerCol(-1); }, style: Object.assign({}, btnS, { opacity: idx <= 0 ? 0.4 : 1 }) }, "↑ " + T("Monter", "Move up", "Subir", "Sposta su", "上へ", "Nach oben", "للأعلى", "上移", "Omhoog", "Subir", "Flytta upp", "Вверх", "Przesuń w górę", "위로")),
          h("button", { type: "button", disabled: colBusy || idx < 0 || idx >= nbC - 1, onClick: function () { deplacerCol(1); }, style: Object.assign({}, btnS, { opacity: (idx < 0 || idx >= nbC - 1) ? 0.4 : 1 }) }, "↓ " + T("Descendre", "Move down", "Bajar", "Sposta giù", "下へ", "Nach unten", "للأسفل", "下移", "Omlaag", "Descer", "Flytta ner", "Вниз", "Przesuń w dół", "아래로")),
          colConfSup ? null : h("button", { type: "button", disabled: colBusy, onClick: function () { setColConfSup(true); }, style: Object.assign({}, btnS, { marginInlineStart: "auto", border: "1px solid rgba(255,107,129,0.5)", color: "#FF9AA8", background: "transparent" }) }, T("Supprimer", "Delete", "Eliminar", "Elimina", "削除", "Löschen", "حذف", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제"))) : null,
        (e.id && colConfSup) ? h("div", { style: { marginTop: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.35)" } },
          h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, color: "#FFD3D9", lineHeight: 1.5 } }, T("Supprimer cette collection ? Ses vidéos ne sont pas supprimées : elles retournent dans « Autres vidéos ».", "Delete this collection? Its videos are not deleted: they go back to “Other videos”.", "¿Eliminar esta colección? Sus vídeos no se eliminan: vuelven a «Otros vídeos».", "Eliminare questa raccolta? I suoi video non vengono eliminati: tornano in «Altri video».", "このコレクションを削除しますか？動画は削除されず、「その他の動画」に戻ります。", "Diese Sammlung löschen? Ihre Videos werden nicht gelöscht: Sie kommen zurück zu „Weitere Videos“.", "حذف هذه المجموعة؟ لن تُحذف فيديوهاتها: تعود إلى «فيديوهات أخرى».", "删除这个合集？其中的视频不会被删除：它们会回到“其他视频”。", "Deze collectie verwijderen? Haar video's worden niet verwijderd: ze gaan terug naar ‘Andere video's’.", "Excluir esta coleção? Os vídeos dela não são excluídos: eles voltam para \"Outros vídeos\".", "Ta bort den här samlingen? Videorna tas inte bort: de hamnar i \"Andra videor\".", "Удалить эту коллекцию? Её видео не удаляются: они вернутся в «Другие видео».", "Usunąć tę kolekcję? Jej wideo nie zostaną usunięte: wrócą do „Inne wideo”.", "이 컬렉션을 삭제할까요? 동영상은 삭제되지 않고 “기타 동영상”으로 돌아가요.")),
          h("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
            h("button", { type: "button", disabled: colBusy, onClick: function () { setColConfSup(false); }, style: btnS }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
            h("button", { type: "button", disabled: colBusy, onClick: supprimerCol, style: Object.assign({}, btnS, { border: "1px solid rgba(255,107,129,0.7)", color: "#FF9AA8" }) }, T("Oui, supprimer", "Yes, delete", "Sí, eliminar", "Sì, elimina", "削除する", "Ja, löschen", "نعم، احذف", "是的，删除", "Ja, verwijderen", "Sim, excluir", "Ja, ta bort", "Да, удалить", "Tak, usuń", "네, 삭제할게요")))) : null,
        colErr ? h("div", { style: { marginTop: 12, padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.55)", fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "#FFD3D9", lineHeight: 1.5, wordBreak: "break-word" } }, colErr) : null,
        h("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          h("button", { type: "button", disabled: colBusy, onClick: function () { setColEdit(null); }, style: Object.assign({}, btnS, { flex: 1, minHeight: 46 }) }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "إلغاء", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { type: "button", disabled: colBusy, onClick: enregistrerCol, style: Object.assign({}, btnS, { flex: 1.4, minHeight: 46, border: "1px solid #D6C4A1", background: "rgba(214,196,161,0.16)", color: "#D6C4A1", fontWeight: 700 }) }, colBusy ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "حفظ", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))));
  }
  /* (916) carte « en preparation / non envoyee » d une video (meme contenu qu avant, mis en commun) */
  function phVid(cV) {
    var estErrC = cV.statut === "errored";
    return h(React.Fragment, null,
              hypeCartePlaceholderMedia(cV.statut, estErrC ? T("Vidéo non envoyée", "Video not sent", "Vídeo no enviado", "Video non inviato", "ファイルの送信に失敗しました", "Video nicht gesendet", "لم يرسل الفيديو", "视频未发送", "Video niet verstuurd", "Vídeo não enviado", "Videon skickades inte", "Видео не отправлено", "Wideo nie zostało wysłane", "동영상이 전송되지 않았어요") : T("Vidéo en préparation…", "Video preparing…", "Vídeo en preparación…", "Video in preparazione…", "動画を準備中…", "Video wird vorbereitet…", "الفيديو قيد التحضير…", "视频准备中…", "Video wordt voorbereid…", "Vídeo em preparação…", "Videon förbereds…", "Видео готовится…", "Wideo w przygotowaniu…", "동영상 준비 중…"), true),
              estErrC ? h("button", { onClick: function (eDc) { if (eDc && eDc.stopPropagation) eDc.stopPropagation(); if (!cV.id) return; supprimerCommentaire(cV.id).then(function () { setChVidsCom(function (l) { return (l || []).filter(function (x) { return x.id !== cV.id; }); }); }); }, style: { position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontSize: 10.5, color: "#FF9AA8", background: "rgba(60,10,20,0.55)", border: "1px solid rgba(255,107,129,0.5)", borderRadius: 999, padding: "5px 14px", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Supprimer", "Delete", "Eliminar", "Elimina", "削除", "Löschen", "حذف", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제")) : null);
  }
  /* (916) TABLETTE ET ORDINATEUR (>= 700 px) : rangees « justifiees ». Toutes les vignettes d une rangee ont la MEME
     hauteur ; chacune prend la largeur de SA vraie proportion (verticale = carte etroite, horizontale = carte large).
     Donc ni recadrage, ni grandes zones floutees, ni derniere carte geante (la derniere rangee ne s etire pas).
     3 a 4 vignettes par rangee sur ordinateur, 2 a 3 sur tablette selon les formats. iPhone : grille d avant. */
  function rangeeJustifiee(cle, vids, extra, liste) {
    var H = largeCh ? 200 : 210, G = 10;
    /* largeur reelle de la zone (menu de 210 px et marges deduits sur ordinateur) */
    var W = 360;
    try { var lw = window.innerWidth || 390; var mG = menuCh ? 210 : 0; W = largeCh ? Math.min(1240, lw - mG - 2 * Math.max(24, (lw - mG - 1240) / 2)) - 32 : lw - 32; } catch (eW) { }
    var rt = function (u) { var r = (u && ratiosVid[u]) || (16 / 9); return Math.max(0.5, Math.min(r, 2.4)); };
    var elems = vids.map(function (vU, iV) { return { r: rt(vU), u: vU, k: cle + "j" + iV }; })
      .concat((extra || []).map(function (cV, iC) { return { r: 16 / 9, ph: cV, k: cle + "jp" + iC }; }));
    /* rangees calculees ici : on ajoute des vignettes tant que la rangee n est pas pleine, puis on regle sa hauteur
       pour qu elle remplisse exactement la largeur (entre 80 % et 125 % de la hauteur normale). Derniere rangee : hauteur normale. */
    var rangees = [], cour = [], somme = 0;
    elems.forEach(function (e) {
      cour.push(e); somme += e.r;
      var larg = somme * H + G * (cour.length - 1);
      if (larg >= W) { rangees.push({ items: cour, somme: somme }); cour = []; somme = 0; }
    });
    if (cour.length) rangees.push({ items: cour, somme: somme, fin: true });
    return h("div", { style: { display: "flex", flexDirection: "column", gap: G } },
      rangees.map(function (rg, iR) {
        var hR = rg.fin ? H : Math.max(H * 0.8, Math.min(H * 1.25, (W - G * (rg.items.length - 1)) / rg.somme));
        return h("div", { key: cle + "r" + iR, style: { display: "flex", gap: G, justifyContent: rg.fin ? "flex-start" : "space-between" } },
          rg.items.map(function (e) {
            var clic = e.u ? function () { try { window.__visListe = (liste || vids).slice(); } catch (eVl) { } setVisFerme(false); setVisionneuseAlbumId(null); setVisionneuse(e.u); } : null;
            return h("div", { key: e.k, role: clic ? "button" : null, onClick: clic, style: { position: "relative", flex: "0 1 " + Math.round(e.r * hR) + "px", height: Math.round(hR), minWidth: 0, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(214,196,161,0.22)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", cursor: clic ? "pointer" : "default" } },
              e.u ? vignetteVidCh(e.u) : phVid(e.ph));
          }));
      }));
  }
  /* (916) TABLETTE ET ORDINATEUR, cheval SANS collection : presentation « Cinema » — une grande video principale
     (la premiere de la liste) a sa vraie proportion, puis toutes les autres en rangees justifiees. */
  function vueCinemaVid() {
    var prets = videosPretesCh();
    var enPrep = (chVidsCom || []).filter(function (x) { return x && x.statut && x.statut !== "ready"; });
    if (!prets.length && !enPrep.length) return null;
    var prem = prets[0] || null;
    var rP = prem ? Math.max(0.5, Math.min((ratiosVid[prem] || 16 / 9), 2.4)) : 16 / 9;
    var hP = largeCh ? 460 : 380;
    return h("div", null,
      prem ? h("div", { role: "button", onClick: function () { try { window.__visListe = prets.slice(); } catch (eVl) { } setVisFerme(false); setVisionneuseAlbumId(null); setVisionneuse(prem); }, style: { position: "relative", width: "min(100%, " + Math.round(rP * hP) + "px)", aspectRatio: String(rP), margin: "0 auto 14px", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(214,196,161,0.28)", background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", cursor: "pointer" } }, vignetteVidCh(prem)) : null,
      (prets.length > 1 || enPrep.length) ? rangeeJustifiee("cine", prets.slice(1), enPrep, prets) : null);
  }
  function vueCollectionsVid() {
    var cols = collVid || [];
    if (!cols.length) return null;
    var prets = (chVids || []).slice();
    (chVidsCom || []).forEach(function (x) { if (x && x.url && (!x.statut || x.statut === "ready") && prets.indexOf(x.url) < 0) prets.push(x.url); });
    var vus = {}, secs = [];
    cols.forEach(function (col) {
      var lst = (Array.isArray(col.videos) ? col.videos : []).filter(function (u) { return typeof u === "string" && prets.indexOf(u) >= 0 && !vus[u]; });
      lst.forEach(function (u) { vus[u] = 1; });
      if (lst.length) secs.push({ cle: "c" + col.id, nom: String(col.nom || "").trim(), vids: lst, col: col });
    });
    if (!secs.length) return null;
    var autres = prets.filter(function (u) { return !vus[u]; });
    var enPrep = (chVidsCom || []).filter(function (x) { return x && x.statut && x.statut !== "ready"; });
    function nbTxt(n) { return n + " " + (n > 1 ? T("vidéos", "videos", "vídeos", "video", "本", "Videos", "فيديوهات", "个视频", "video's", "vídeos", "videor", "видео", "wideo", "동영상") : T("vidéo", "video", "vídeo", "video", "本", "Video", "فيديو", "个视频", "video", "vídeo", "video", "видео", "wideo", "동영상")); }
    function section(cle, titre, vids, extra, txtTout, colObj) {
      var ouvert = !!collOuv[cle];
      var nbDepart = encartLarge ? 6 : 4;   /* (916) tablette/ordinateur : 6 au depart */
      var montre = ouvert ? vids : vids.slice(0, nbDepart);
      var n = vids.length + extra.length;
      return h("div", { key: "cs" + cle, style: { marginBottom: 52 /* 20/10 Blandine « tout fait entasse », piste A : 28 -> 52 */ } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "0 0 18px" } },
          h("span", { dir: "auto", style: { minWidth: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 600, lineHeight: 1.15, color: "#F3EEE4", overflowWrap: "anywhere" } }, titre),
          h("span", { style: { flex: 1, minWidth: 12, height: 1, background: "linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(214,196,161,0.45), transparent)" } }),
          h("span", { style: { flex: "0 0 auto", fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(243,238,228,0.6)" } }, nbTxt(n)),
          (colObj && peutGererCol()) ? h("button", { type: "button", "aria-label": T("G\u00e9rer la collection", "Manage the collection", "Gestionar la colecci\u00f3n", "Gestisci la raccolta", "\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u3092\u7ba1\u7406", "Sammlung verwalten", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629", "管理合集", "De collectie beheren", "Gerenciar a coleção", "Hantera samlingen", "Управлять коллекцией", "Zarządzaj kolekcją", "컬렉션 관리"), onClick: function () { ouvrirCol(colObj); }, style: { flex: "0 0 auto", width: 38, height: 32, padding: 0, borderRadius: 999, border: "1px solid rgba(214,196,161,0.6)", background: "rgba(214,196,161,0.12)", color: "#D6C4A1", fontSize: 20, fontWeight: 700, lineHeight: 1, cursor: "pointer" } /* (909) plus visible */ }, "\u22ef") : null),
        encartLarge ? rangeeJustifiee(cle, montre, extra, vids) :
        h("div", { style: { display: "grid", gridTemplateColumns: largeCh ? "repeat(3, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))", gap: 16 /* piste A : 10 -> 16 */ } },
          montre.map(function (vU, iV) {
            return h("div", { key: cle + "v" + iV, role: "button", onClick: function () { try { window.__visListe = vids.slice(); } catch (eVl) { } setVisFerme(false); setVisionneuseAlbumId(null); setVisionneuse(vU); }, style: caseVidCh(iV, montre.length + extra.length, vU) /* (909) memes regles que la galerie : 1 seule video = carte large ; nombre impair = la derniere elargie */ },
              vignetteVidCh(vU));
          }),
          extra.map(function (cV, iC) {
            var estErrC = cV.statut === "errored";
            return h("div", { key: cle + "p" + iC, style: Object.assign(caseVidCh(montre.length + iC, montre.length + extra.length), { cursor: "default" }) },
              phVid(cV));
          })),
        vids.length > nbDepart ? h("button", { type: "button", onClick: function () { setCollOuv(function (o) { var n2 = Object.assign({}, o); n2[cle] = !o[cle]; return n2; }); }, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", minHeight: 44, marginTop: 12, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.45)", background: "rgba(16,29,34,0.55)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, cursor: "pointer" } },
          ouvert ? T("Réduire", "Show less", "Ver menos", "Mostra meno", "閉じる", "Weniger anzeigen", "عرض أقل", "收起", "Minder tonen", "Mostrar menos", "Visa mindre", "Свернуть", "Zwiń", "접기") : txtTout,
          h("span", { "aria-hidden": "true", style: { color: "#D6C4A1", display: "inline-block", transform: ouvert ? "rotate(-90deg)" : (rtlCh ? "scaleX(-1)" : "none") } }, "›")) : null);
    }
    var txtCol = T("Voir toutes les vidéos de cette collection", "See all videos in this collection", "Ver todos los vídeos de esta colección", "Vedi tutti i video di questa raccolta", "このコレクションの動画をすべて見る", "Alle Videos dieser Sammlung ansehen", "عرض كل فيديوهات هذه المجموعة", "查看这个合集的所有视频", "Alle video's van deze collectie bekijken", "Ver todos os vídeos desta coleção", "Se alla videor i den här samlingen", "Смотреть все видео этой коллекции", "Zobacz wszystkie wideo z tej kolekcji", "이 컬렉션의 동영상 모두 보기");
    return h("div", null,
      secs.map(function (sc) { return section(sc.cle, sc.nom, sc.vids, [], txtCol, sc.col); }),
      (autres.length || enPrep.length) ? section("autres", T("Autres vidéos", "Other videos", "Otros vídeos", "Altri video", "その他の動画", "Weitere Videos", "فيديوهات أخرى", "其他视频", "Andere video's", "Outros vídeos", "Andra videor", "Другие видео", "Inne wideo", "기타 동영상"), autres, enPrep, T("Voir toutes les autres vidéos", "See all other videos", "Ver todos los demás vídeos", "Vedi tutti gli altri video", "その他の動画をすべて見る", "Alle weiteren Videos ansehen", "عرض كل الفيديوهات الأخرى", "查看所有其他视频", "Alle andere video's bekijken", "Ver todos os outros vídeos", "Se alla andra videor", "Смотреть все другие видео", "Zobacz wszystkie inne wideo", "기타 동영상 모두 보기")) : null);
  }
  /* (912) CHANGER LA COUVERTURE D UNE VIDEO : seulement la personne qui l a mise en ligne, ou une admin (la base verifie aussi). */
  function estAuteurVid(u) {
    try {
      if (!moi || !u) return false;
      if (typeof estModerateurHype === "function" && estModerateurHype(moi)) return true;
      var su = String(u);
      if (su.indexOf("/storage/v1/object/public/photos/" + moi.id + "/") >= 0) return true;
      return (mesPlaybacks || []).some(function (pid) { return pid && su.indexOf(pid) >= 0; });
    } catch (eAv) { return false; }
  }
  function boutonCouv(url) {
    if (!estAuteurVid(url)) return null;
    return h("button", { type: "button", "aria-label": T("Changer la couverture", "Change the cover", "Cambiar la portada", "Cambia la copertina", "カバーを変更", "Titelbild ändern", "تغيير الغلاف", "更换封面", "Het omslag wijzigen", "Trocar a capa", "Byt omslag", "Сменить обложку", "Zmień okładkę", "커버 바꾸기"), onClick: function (eB) { if (eB && eB.stopPropagation) eB.stopPropagation(); setCouvErr(""); setCouvCible(url); }, style: { position: "absolute", zIndex: 4, top: 8, insetInlineEnd: 8, width: 30, height: 30, padding: 0, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.7)", background: "rgba(5,8,9,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
      h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", style: { width: 15, height: 15, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } }, h("rect", { x: 3, y: 5, width: 18, height: 14, rx: 2.5 }), h("circle", { cx: 8.5, cy: 10, r: 1.6 }), h("path", { d: "M21 16l-5-5-4 4-2-2-4 4" })));
  }
  async function enregistrerCouvChoisie(fichier) {
    var url = couvCible; if (!url || !fichier || couvBusy) return;
    setCouvBusy(true); setCouvErr("");
    try {
      var k = hypeCleCouv(url);
      /* l image est reduite (960 px max) avant l envoi */
      var blob = await new Promise(function (res, rej) {
        var im = new Image(); var ob = URL.createObjectURL(fichier);
        im.onload = function () { try { var sc = Math.min(1, 960 / Math.max(im.naturalWidth || 1, im.naturalHeight || 1)); var cv = document.createElement("canvas"); cv.width = Math.round(im.naturalWidth * sc); cv.height = Math.round(im.naturalHeight * sc); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(ob); cv.toBlob(function (b) { b ? res(b) : rej(new Error("image illisible")); }, "image/jpeg", 0.82); } catch (eI) { rej(eI); } };
        im.onerror = function () { URL.revokeObjectURL(ob); rej(new Error(T("Cette image ne peut pas être lue.", "This image can’t be read.", "Esta imagen no se puede leer.", "Questa immagine non può essere letta.", "この画像は読み込めません。", "Dieses Bild kann nicht gelesen werden.", "لا يمكن قراءة هذه الصورة.", "无法读取这张图片。", "Deze afbeelding kan niet worden gelezen.", "Não foi possível ler esta imagem.", "Den här bilden kan inte läsas.", "Это изображение не удаётся прочитать.", "Nie można odczytać tego obrazu.", "이 이미지를 읽을 수 없어요."))); };
        im.src = ob;
      });
      var chemin = moi.id + "/couv-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ".jpg";
      var up = await supa.storage.from("photos").upload(chemin, blob, { contentType: "image/jpeg", upsert: false, cacheControl: "31536000" });
      if (up && up.error) throw up.error;
      var adr = supa.storage.from("photos").getPublicUrl(chemin).data.publicUrl;
      var r = await supa.from("video_couvertures").upsert({ video_url: k, image_url: adr, auto: false, user_id: moi.id, updated_at: new Date().toISOString() }, { onConflict: "video_url" }).select("video_url");
      if (r && r.error) throw r.error;
      if (!r || !r.data || !r.data.length) throw new Error(msgRefusCouv);
      HYPE_COUV[k] = adr; try { document.dispatchEvent(new CustomEvent("hype-couvertures")); } catch (eD) { }
      setCouvCible(null);
    } catch (eCc) { setCouvErr(String((eCc && eCc.message) || eCc)); }
    setCouvBusy(false);
  }
  async function retirerCouv() {
    var url = couvCible; if (!url || couvBusy) return;
    setCouvBusy(true); setCouvErr("");
    try {
      var k = hypeCleCouv(url);
      var r = await supa.from("video_couvertures").delete().eq("video_url", k).select("video_url");
      if (r && r.error) throw r.error;
      HYPE_COUV[k] = null; try { delete HYPE_VIG_LEGACY[url]; } catch (eDl) { }
      try { document.dispatchEvent(new CustomEvent("hype-couvertures")); } catch (eD2) { }
      setCouvCible(null);
    } catch (eRc) { setCouvErr(String((eRc && eRc.message) || eRc)); }
    setCouvBusy(false);
  }
  var msgRefusCouv = T("Action refusée : seule la personne qui a mis cette vidéo en ligne peut changer sa couverture.", "Action refused: only the person who posted this video can change its cover.", "Acción rechazada: solo quien publicó este vídeo puede cambiar su portada.", "Azione rifiutata: solo chi ha pubblicato questo video può cambiarne la copertina.", "この動画を投稿した人だけがカバーを変更できます。", "Abgelehnt: Nur wer dieses Video hochgeladen hat, kann das Titelbild ändern.", "تم الرفض: فقط من نشر هذا الفيديو يمكنه تغيير غلافه.", "操作被拒绝：只有上传这个视频的人才能更换它的封面。", "Actie geweigerd: alleen de persoon die deze video heeft geplaatst, kan het omslag wijzigen.", "Ação recusada: somente quem publicou este vídeo pode trocar a capa dele.", "Åtgärden nekades: bara den som lade upp videon kan ändra dess omslag.", "Действие отклонено: сменить обложку видео может только тот, кто его загрузил.", "Akcja odrzucona: tylko osoba, która dodała to wideo, może zmienić jego okładkę.", "허용되지 않은 동작이에요. 이 동영상을 올린 사람만 커버를 바꿀 수 있어요.");
  function fenetreCouv() {
    var url = couvCible; if (!url) return null;
    var img = hypeImageVideo(url, 520);
    var aCouv = !!hypeCouvertureVideo(url);
    var btnS = { minHeight: 46, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.45)", background: "rgba(16,29,34,0.55)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 13, cursor: "pointer" };
    var fen = h("div", { key: "couvWin", "data-noswipe": "true", onClick: function () { if (!couvBusy) setCouvCible(null); }, style: { position: "fixed", inset: 0, zIndex: 10050, background: "rgba(3,7,6,0.78)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { dir: rtlCh ? "rtl" : "ltr", onClick: function (eS) { eS.stopPropagation(); }, style: { WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none", width: "100%", maxWidth: 560, boxSizing: "border-box", padding: "20px 16px calc(env(safe-area-inset-bottom) + 20px)", borderRadius: "22px 22px 0 0", border: "1px solid rgba(214,196,161,0.25)", borderBottom: 0, background: "linear-gradient(165deg,#0E1A18 0%,#070D0C 100%)" } },
        h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 23, fontWeight: 600, color: "#F3EEE4", marginBottom: 14 } }, T("Couverture de la vidéo", "Video cover", "Portada del vídeo", "Copertina del video", "動画のカバー", "Titelbild des Videos", "غلاف الفيديو", "视频封面", "Omslag van de video", "Capa do vídeo", "Videons omslag", "Обложка видео", "Okładka wideo", "동영상 커버")),
        h("div", { style: { position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(214,196,161,0.25)", background: "linear-gradient(165deg,#111B1F 0%,#0B1215 100%)" } },
          img ? h("img", { src: img, alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" } }) : null),
        h("input", { ref: couvIn, type: "file", accept: "image/*", style: { display: "none" }, onChange: function (eF) { var f = eF.target && eF.target.files && eF.target.files[0]; try { eF.target.value = ""; } catch (eV) { } if (f) enregistrerCouvChoisie(f); } }),
        h("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginTop: 16 } },
          h("button", { type: "button", disabled: couvBusy, onClick: function () { if (couvIn.current) couvIn.current.click(); }, style: Object.assign({}, btnS, { border: "1px solid #D6C4A1", background: "rgba(214,196,161,0.16)", color: "#D6C4A1", fontWeight: 700 }) }, couvBusy ? "…" : T("Choisir une photo", "Choose a photo", "Elegir una foto", "Scegli una foto", "写真を選ぶ", "Foto auswählen", "اختيار صورة", "选择一张照片", "Een foto kiezen", "Escolher uma foto", "Välj ett foto", "Выбрать фото", "Wybierz zdjęcie", "사진 선택")),
          aCouv ? h("button", { type: "button", disabled: couvBusy, onClick: retirerCouv, style: btnS }, T("Revenir à l’image automatique", "Back to the automatic image", "Volver a la imagen automática", "Torna all’immagine automatica", "自動の画像に戻す", "Zurück zum automatischen Bild", "العودة إلى الصورة التلقائية", "恢复为自动图片", "Terug naar de automatische afbeelding", "Voltar à imagem automática", "Tillbaka till den automatiska bilden", "Вернуться к автоматическому изображению", "Wróć do obrazu automatycznego", "자동 이미지로 되돌리기")) : null,
          h("button", { type: "button", disabled: couvBusy, onClick: function () { setCouvCible(null); }, style: btnS }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))),
        couvErr ? h("div", { style: { marginTop: 12, padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.55)", fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "#FFD3D9", lineHeight: 1.5, wordBreak: "break-word" } }, couvErr) : null));
    return (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal(fen, document.body) : fen;
  }
  /* 19/10 (soir) : coeur et commentaires sur chaque video de l onglet Videos, sans l ouvrir. Cle = l adresse de la video
     (les memes j aime et commentaires que la visionneuse). La proprietaire du cheval est prevenue des commentaires. */
  var socVidCh = useHypeSocial((chVids || []).concat((chVidsCom || []).filter(function (x) { return x && x.url && (!x.statut || x.statut === "ready"); }).map(function (x) { return x.url; })), function (q) { try { setToast(hypeMsgSocial(ctx.langue || "fr", q)); setTimeout(function () { setToast(null); }, 4500); } catch (eTs) { } });
  var feVidChSt = React.useState(null); var vidComFeuille = feVidChSt[0], setVidComFeuille = feVidChSt[1];
  React.useEffect(function () {
    try {
      var uN = (typeof window !== "undefined") ? window.__videoComOuvrir : null;
      if (!uN || panneau !== "videos") return;
      window.__videoComOuvrir = null;
      setVidComFeuille(uN);
    } catch (eVo) { }
  }, [panneau]);
  function feuilleComVidCh() {
    if (!vidComFeuille || panneau !== "videos") return null;
    return h(FeuilleCommentairesHype, { key: vidComFeuille, cle: vidComFeuille, titre: T("Vid\u00e9o", "Video", "V\u00eddeo", "Video", "\u52d5\u753b", "Video", "\u0641\u064a\u062f\u064a\u0648", "视频", "Video", "Vídeo", "Video", "Видео", "Wideo", "동영상") + " \u00b7 " + (c.nom || ""), cible: "cheval:" + ((chevalDyn && chevalDyn.dbId) || id), proprio: (chevalDyn && chevalDyn.ownerId) || null, prefixe: "videocom", lk: socVidCh.lk[vidComFeuille], onJaime: function () { socVidCh.basculer(vidComFeuille); }, onFermer: function () { setVidComFeuille(null); }, onNombre: function (n) { socVidCh.nombre(vidComFeuille, n); }, large: largeCh });
  }
  function vignetteVidCh(url) {
    var horizV = (ratiosVid[url] || 0) >= 1.2;   /* (898) Blandine : une video horizontale REMPLIT sa case (plus de bandes grises) ; verticale/carree : entiere sur fond flou */
    var vigV = hypeImageVideo(url, 520);   /* (911) couverture enregistree > Mux > vignette fabriquee une par une (plus de lecteur par case) */
    var lecture = h("div", { style: { position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" } },
      h("div", { style: { width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.7)", background: "rgba(5,8,9,0.45)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.35)" } },
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", style: { width: 18, height: 18, marginLeft: 3, fill: "#F3EEE4" } }, h("path", { d: "M7 4.5v15l12-7.5z" }))));
    var fondu = hypeVoileVideo("vvCh", 2);   /* 20/10 Blandine (piste T) : ombre douce en bas + bords assombris, au lieu de l ancien fondu bas */
    var socV = h(HypeActionsSociales, { cle: url, variante: "pastille", lk: socVidCh.lk[url], nc: socVidCh.nc[url] || 0, onJaime: function () { socVidCh.basculer(url); }, onCommenter: function () { setVidComFeuille(url); } });   /* 19/10 (soir) */
    if (!vigV) return h(React.Fragment, null, boutonCouv(url) /* (912) */, h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(165deg,#111B1F 0%,#0B1215 100%)" } }), fondu, lecture, socV);   /* (911) en attendant son image : case sombre, aucun lecteur */
    return h(React.Fragment, null, boutonCouv(url) /* (912) */,
      h("img", { src: vigV, alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async", draggable: false, onError: function (eB) { try { eB.currentTarget.style.display = "none"; } catch (e0) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.2)", filter: "blur(16px) brightness(0.45)", pointerEvents: "none" } }),
      h("img", { src: vigV, alt: "", loading: "lazy", decoding: "async", draggable: false, onLoad: function (eL) { try { var im = eL.currentTarget; if (im.naturalWidth && im.naturalHeight) { var rr = Math.round(im.naturalWidth / im.naturalHeight * 100) / 100; setRatiosVid(function (o) { if (o[url] === rr) return o; var n2 = Object.assign({}, o); n2[url] = rr; return n2; }); } } catch (eRl) { } }, onError: function (eI) { try { eI.currentTarget.style.display = "none"; } catch (e1) { } }, style: { position: "absolute", inset: 0, zIndex: 1, width: "100%", height: "100%", objectFit: horizV ? "cover" : "contain", pointerEvents: "none" } }),
      fondu, lecture, socV);
  }
  /* 30/08 19h30 — CHEMIN DIRECT D'ENVOI DEPUIS L'ONGLET VIDEOS (demande Blandine :
     « le chemin est pas intuitif, on se retrouve sur une autre page qui propose de
     re-cliquer »). Diagnostic de l'enregistrement d'ecran : l'ancien bouton
     basculait sur l'onglet Photos et deposait le fichier dans le COMPOSEUR, qui vit
     sur l'onglet Souvenirs — l'apercu et « Publier » s'affichaient sur un onglet
     non regarde. Rien n'echouait : rien n'etait tente. Ici on envoie sur place. */
  var vdIn = React.useRef(null);
  var vdSt = React.useState(false); var vidEnvoi = vdSt[0], setVidEnvoi = vdSt[1];
  var veSt = React.useState(null); var vidErr = veSt[0], setVidErr = veSt[1];
  /* 30/08 20h10 — LE GARDE-FOU DESCEND JUSQU'A LA SELECTION. Enregistrement d'ecran
     de Blandine : elle choisit une video de 1:09, valide, et le bouton n'affiche
     JAMAIS « Envoi en cours ». L'envoi n'a pas echoue : il n'a pas demarre — le
     selecteur iOS s'est referme sans transmettre de fichier (cas connu quand la
     video doit etre convertie avant d'etre remise au navigateur). On journalise
     donc ce que l'app RECOIT, y compris quand elle ne recoit rien. */
  var vjSt = React.useState(null); var vidJourn = vjSt[0], setVidJourn = vjSt[1];
  /* 09/09 (soir, correctif 1) : confirmation VISIBLE ET DURABLE apres un envoi reussi --
     avant, le bouton revenait juste a son etat normal, sans aucune trace de succes. */
  var vsSt = React.useState(false); var vidSucces = vsSt[0], setVidSucces = vsSt[1];
  /* 10/09 (nuit) — TITI PENDANT TOUT L'ENVOI (passation du 10/09, point 1). vidEnvoi ne couvre que la
     reservation (quelques secondes) et continue de gouverner le bouton ; la mascotte, elle, doit
     rester jusqu'a la fin REELLE (video prete ou en echec). Compteur = nombre d'envois lances
     depuis cet ecran dont l'arriere-plan n'a pas encore rendu son verdict (surFin de
     hypePosterVideoCommentaire) : une 2e video lancee pendant la 1re garde Titi jusqu'a la fin
     des deux. Limites connues : s'arrete au plus tard apres PUT + 2 min de preparation Mux (duree
     maximale surveillee) ; perdu si on quitte la fiche (l'envoi, lui, continue). */
  var vmSt = React.useState(0); var vidMascotteNb = vmSt[0], setVidMascotteNb = vmSt[1];
  /* (927) RANGER LA VIDEO DANS UNE COLLECTION PENDANT SON ENVOI : choixColEnv = { colId } de l envoi en cours (petits boutons
     sous Titi) ; quand la video est prete (fin reelle de l envoi), elle est ajoutee a la collection choisie. colRangeMsg = { ok, txt }. */
  var ccSt = React.useState(null); var choixColEnv = ccSt[0], setChoixColEnv = ccSt[1];
  var crSt = React.useState(null); var colRangeMsg = crSt[0], setColRangeMsg = crSt[1];
  var fcSt = React.useState(0); var forcerChoixCol = fcSt[1];
  /* 10/09 — TEST A/B TEMPORAIRE QUALITÉ PHOTO (Blandine, audit qualité image).
     Réservé STRICTEMENT à son compte via estCompteFeinnHype(moi) — la même fonction déjà
     utilisée ailleurs dans Hype pour la reconnaître, pas un réglage visuel type
     display:none qui resterait présent et contournable dans le code téléchargé par
     n'importe qui. Remis à false automatiquement à chaque nouvelle photo ouverte, pour ne
     jamais laisser trainer "brut" affiché par erreur sur la photo suivante. À retirer une
     fois le diagnostic terminé. */
  var vodSt = React.useState(false); var voirOriginalDebug = vodSt[0], setVoirOriginalDebug = vodSt[1];
  React.useEffect(function () { setVoirOriginalDebug(false); }, [visionneuse]);
  /* 11/09 (12) — SECOURS AUTONOME POUR « AJOUTER UN SOUVENIR ». Le bouton deleguait a un
     registre global rempli par le composer du fil ; registre vide = tap totalement muet. Ce
     champ-ci appartient a EcranCheval, donc toujours disponible tant que la fiche est ouverte. */
  var refPhotoSouvenir = React.useRef(null);
  async function envoyerPhotoSouvenirDirecte(f) {
    if (!f) return;
    try {
      var rPs = await posterCommentaire({ cible: cibleCh, texte: null, fichierPhoto: f });
      if (rPs && rPs.error) {
        setToast(T("Envoi impossible — réessaie.", "Upload failed — try again.", "Envío imposible — inténtalo de nuevo.", "Invio impossibile — riprova.", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Senden fehlgeschlagen — versuch's noch mal.", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "无法发送——请重试。", "Uploaden mislukt — probeer het opnieuw.", "Envio impossível — tente de novo.", "Uppladdningen misslyckades — försök igen.", "Отправка невозможна — попробуй ещё раз.", "Nie udało się wysłać — spróbuj jeszcze raz.", "전송하지 못했어요. 다시 시도해 주세요."));
      } else {
        setToast(T("Souvenir ajouté ✓", "Memory added ✓", "Recuerdo añadido ✓", "Ricordo aggiunto ✓", "\u601d\u3044\u51fa\u3092\u8ffd\u52a0 \u2713", "Erinnerung hinzugefügt ✓", "\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0630\u0643\u0631\u0649 \u2713", "回忆已添加 ✓", "Herinnering toegevoegd ✓", "Lembrança adicionada ✓", "Minne tillagt ✓", "Воспоминание добавлено ✓", "Wspomnienie dodane ✓", "추억을 추가했어요 ✓"));
        try { document.dispatchEvent(new CustomEvent("hype-albums-modifies", { detail: { cible: String(cibleCh) } })); } catch (ePsE) { }
        try { window.dispatchEvent(new Event("hype-souvenirs-maj")); } catch (ePsS) { }
      }
    } catch (ePs) {
      setToast(T("Envoi impossible — réessaie.", "Upload failed — try again.", "Envío imposible — inténtalo de nuevo.", "Invio impossibile — riprova.", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Senden fehlgeschlagen — versuch's noch mal.", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "无法发送——请重试。", "Uploaden mislukt — probeer het opnieuw.", "Envio impossível — tente de novo.", "Uppladdningen misslyckades — försök igen.", "Отправка невозможна — попробуй ещё раз.", "Nie udało się wysłać — spróbuj jeszcze raz.", "전송하지 못했어요. 다시 시도해 주세요."));
    }
    setTimeout(function () { setToast(null); }, 2600);
  }
  function ouvrirAjoutSouvenir() {
    /* 11/09 (14) — « AJOUTER UN SOUVENIR » PASSE PAR LES ALBUMS. Decision de Blandine : la photo
       doit aller dans un album, en proposant un album deja existant ou d'en creer un autre.
       AVANT (11/09 (12)) : le secours publiait la photo dans le FIL du cheval (posterCommentaire).
       L'onglet Photos ne lit que les albums : la photo n'y apparaissait jamais, seulement dans le
       carrousel de la page du cheval (AlbumsPromus, qui lit fil + albums). Et le petit message de
       confirmation etait cache sous la barre d'onglets.
       MAINTENANT : on demande a AlbumsCheval -- monte sur la MEME page Photos, juste au-dessus de
       la chronologie -- d'ouvrir sa feuille « Dans quel album ? », par un compteur passe en prop
       (meme motif que fermerCle), plus par le registre global du fil. Choisir un album l'ouvre ;
       l'envoi se fait par son bouton eprouve « + Ma photothèque ». Le champ refPhotoSouvenir et
       envoyerPhotoSouvenirDirecte restent dans le fichier mais ne sont plus appeles. */
    if (doitLierPourAjouter()) { montrerCarteLier(); return; }   /* 18/10 (nuit) */
    setAlbumsChAjoutCle(function (nAj) { return nAj + 1; });
  }
  /* (927) ajoute une video tout juste prete a une collection (lue fraiche en base : on n ecrase rien) */
  async function rangerVideoEnvoyee(destId, colId) {
    try {
      var rC = await supa.from("commentaires").select("photo_url").eq("id", destId).single();
      var url = rC && rC.data && rC.data.photo_url; if (!url) throw new Error("?");
      var rK = await supa.from("collections_videos").select("id, nom, videos").eq("id", colId).single();
      if (!rK || rK.error || !rK.data) throw (rK && rK.error) || new Error(msgRefusCol);
      var vids = Array.isArray(rK.data.videos) ? rK.data.videos.slice() : [];
      if (vids.indexOf(url) < 0) {
        vids.push(url);
        var rU = await supa.from("collections_videos").update({ videos: vids }).eq("id", colId).select("id");
        if (rU && rU.error) throw rU.error;
        if (!rU || !rU.data || !rU.data.length) throw new Error(msgRefusCol);
      }
      setColRangeMsg({ ok: true, txt: T("Vidéo rangée dans « ", "Video filed in “", "Vídeo guardado en «", "Video inserito in «", "動画をコレクションに追加しました：「", "Video einsortiert in „", "تمت إضافة الفيديو إلى «", "视频已放入“", "Video geplaatst in ‘", "Vídeo guardado em \"", "Videon lagd i \"", "Видео добавлено в « ", "Wideo przeniesione do „", "영상을 보관한 컬렉션: “") + String(rK.data.nom || "") + T(" ».", "”.", "».", "».", "」", "“.", "».", "”.", "”.", "”.", "”.", "”.", "”.", "”.") });
      await rechargerCollVid();
    } catch (eRg) { setColRangeMsg({ ok: false, txt: T("La vidéo est en ligne mais n’a pas pu être rangée dans la collection : ", "The video is online but could not be filed in the collection: ", "El vídeo está en línea pero no se pudo guardar en la colección: ", "Il video è online ma non è stato possibile inserirlo nella raccolta: ", "動画は公開されましたが、コレクションに追加できませんでした：", "Das Video ist online, konnte aber nicht einsortiert werden: ", "الفيديو منشور لكن تعذّرت إضافته إلى المجموعة: ", "视频已上传，但未能放入合集：", "De video staat online maar kon niet in de collectie worden geplaatst: ", "O vídeo está no ar, mas não pôde ser guardado na coleção: ", "Videon är uppe men kunde inte läggas i samlingen: ", "Видео опубликовано, но его не удалось добавить в коллекцию: ", "Wideo jest online, ale nie udało się go przenieść do kolekcji: ", "영상은 올라갔지만 컬렉션에 넣지 못했어요: ") + String((eRg && eRg.message) || eRg) }); }
  }
  /* 11/10 (948) — RANGEMENT GARDE EN MEMOIRE. Avant : si la video n etait pas prete a la fin du suivi (> 2 min de preparation),
     ou si on quittait la fiche pendant l envoi, le choix de collection etait perdu. Maintenant le choix (video + collection)
     est note sur le telephone (cle hype_rangements_v1, 7 jours max) ; a chaque ouverture de cette fiche (et au retour dans
     l appli), les videos devenues pretes sont rangees, celles en echec ou supprimees sont oubliees. Rien n est ecrase :
     rangerVideoEnvoyee relit la collection en base et n ajoute la video qu une fois. */
  var HYPE_RANGEMENTS_CLE = "hype_rangements_v1";
  function lireRangements() { try { var l = JSON.parse(localStorage.getItem(HYPE_RANGEMENTS_CLE) || "[]"); return Array.isArray(l) ? l : []; } catch (eLr) { return []; } }
  function ecrireRangements(l) { try { if (l && l.length) localStorage.setItem(HYPE_RANGEMENTS_CLE, JSON.stringify(l)); else localStorage.removeItem(HYPE_RANGEMENTS_CLE); } catch (eEr) { } }
  function oublierRangement(destId) { ecrireRangements(lireRangements().filter(function (x) { return x && x.d !== destId; })); }
  function memoRangement(ch) {
    if (!ch || !ch.destId) return;
    var l = lireRangements().filter(function (x) { return x && x.d !== ch.destId; });
    if (ch.colId) l.push({ d: ch.destId, c: ch.colId, cible: cibleCh, t: Date.now() });
    ecrireRangements(l);
  }
  var verifRangEnCours = React.useRef(false);
  async function verifierRangements() {
    if (verifRangEnCours.current) return;
    var l = lireRangements(); if (!l.length) return;
    verifRangEnCours.current = true;
    try {
      for (var iR = 0; iR < l.length; iR++) {
        var x = l[iR]; if (!x || !x.d) continue;
        if (Date.now() - (x.t || 0) > 7 * 86400000) { oublierRangement(x.d); continue; }
        if (x.cible !== cibleCh) continue;   /* rangee quand on ouvrira la fiche de son cheval */
        var rS = await supa.from("commentaires").select("statut, photo_url").eq("id", x.d).maybeSingle();
        if (!rS || rS.error) continue;   /* reseau : on reessaiera */
        if (!rS.data || rS.data.statut === "errored") { oublierRangement(x.d); continue; }
        if ((!rS.data.statut || rS.data.statut === "ready") && rS.data.photo_url) { oublierRangement(x.d); await rangerVideoEnvoyee(x.d, x.c); }
      }
    } catch (eVr) { }
    verifRangEnCours.current = false;
  }
  React.useEffect(function () {
    verifierRangements();
    function auRetour() { if (document.visibilityState === "visible") verifierRangements(); }
    document.addEventListener("visibilitychange", auRetour);
    return function () { document.removeEventListener("visibilitychange", auRetour); };
  }, [cibleCh]);
  async function envoyerVideoDirecte(f) {
    if (!f) return;
    setVidErr(null); setVidSucces(false); setVidEnvoi(true);
    setVidMascotteNb(function (nM) { return nM + 1; }); /* 10/09 (nuit) : Titi entre en scene tout de suite */
    var choixEnv = { colId: null, destId: null };   /* (927) */
    setChoixColEnv(choixEnv); setColRangeMsg(null);
    var finMascotte = function (bilanF) {
      setVidMascotteNb(function (nM) { return nM > 0 ? nM - 1 : 0; });
      if (choixEnv.colId) {
        if (bilanF && bilanF.etat === "ready" && choixEnv.destId) { oublierRangement(choixEnv.destId); rangerVideoEnvoyee(choixEnv.destId, choixEnv.colId); }
        else if (bilanF && (bilanF.etat === "errored" || bilanF.etat === "erreur")) { if (choixEnv.destId) oublierRangement(choixEnv.destId); }   /* (948) envoi en echec : rien a ranger (l erreur d envoi est deja affichee) */
        else if (bilanF) { memoRangement(choixEnv); setColRangeMsg({ ok: false, txt: T("La vidéo n’est pas encore prête : elle sera rangée toute seule dans la collection dès qu’elle le sera (en revenant sur cette page).", "The video is not ready yet: it will be filed in the collection automatically as soon as it is (when you come back to this page).", "El vídeo aún no está listo: se guardará solo en la colección en cuanto lo esté (al volver a esta página).", "Il video non è ancora pronto: verrà inserito da solo nella raccolta appena lo sarà (tornando su questa pagina).", "動画の準備がまだです。準備ができ次第、自動でコレクションに追加されます（このページに戻ったとき）。", "Das Video ist noch nicht fertig: Es wird automatisch in die Sammlung einsortiert, sobald es fertig ist (wenn du auf diese Seite zurückkommst).", "الفيديو ليس جاهزًا بعد: سيُضاف تلقائيًا إلى المجموعة فور جهوزه (عند عودتك إلى هذه الصفحة).", "视频还没有准备好：准备好后，它会自动放进合集（回到这个页面时）。", "De video is nog niet klaar: hij wordt vanzelf in de collectie geplaatst zodra hij klaar is (als je terugkomt op deze pagina).", "O vídeo ainda não está pronto: ele será guardado sozinho na coleção assim que estiver (ao voltar a esta página).", "Videon är inte klar än: den läggs i samlingen automatiskt så fort den är det (när du kommer tillbaka till den här sidan).", "Видео ещё не готово: оно само попадёт в коллекцию, как только будет готово (когда ты вернёшься на эту страницу).", "Wideo nie jest jeszcze gotowe: zostanie samo przeniesione do kolekcji, gdy tylko będzie (po powrocie na tę stronę).", "영상이 아직 준비되지 않았어요. 준비되면 이 페이지로 돌아왔을 때 컬렉션에 자동으로 들어가요.") }); }
      }
      setChoixColEnv(function (o) { return o === choixEnv ? null : o; });
    };
    var poids = f.size ? (Math.round(f.size / 104857.6) / 10) + " Mo" : "";
    try {
      var r = await posterCommentaire({ cible: cibleCh, texte: null, fichierPhoto: f, surFin: finMascotte });
      try { if (r && r.data && r.data.id) { choixEnv.destId = r.data.id; memoRangement(choixEnv); } } catch (eDi) { }   /* (948) note le choix s il est deja fait */ /* 10/09 (nuit) : surFin = fin reelle de l'arriere-plan */
      if (r && r.error) {
        var m = String((r.error && (r.error.message || r.error.error_description)) || r.error || "");
        setVidErr({ nom: f.name || "", poids: poids, msg: m || "raison inconnue" });
      } else {
        setVidSucces(true);
        try { window.dispatchEvent(new Event("hype-souvenirs-maj")); } catch (eEv) { }
      }
      if (!(r && r.enArrierePlan)) finMascotte(); /* 10/09 (nuit) : aucun arriere-plan lance (refus avant l'envoi, ou fichier non video) -> surFin ne viendra jamais, Titi s'arrete ici */
    } catch (eV) {
      setVidErr({ nom: f.name || "", poids: poids, msg: String((eV && eV.message) || eV || "raison inconnue") });
      finMascotte(); /* 10/09 (nuit) : idem, rien n'est parti */
    }
    setVidEnvoi(false);
  } /* 30/08 02h55 : meme regle que la video d'import du palmares — l'invitation part quand sa mission est accomplie, une phrase discrete permet de la revoir */
  function basculerVedette(url) {
    var lV = (vedettes || []).slice();
    var iV = lV.indexOf(url);
    if (iV >= 0) lV.splice(iV, 1);
    else {
      if (lV.length >= 6) { setToast(T("6 souvenirs maximum en vedette", "6 featured memories max", "M\u00e1ximo 6 recuerdos destacados", "Massimo 6 ricordi in evidenza", "\u304a\u6c17\u306b\u5165\u308a\u306f6\u4ef6\u307e\u3067", "Maximal 6 hervorgehobene Erinnerungen", "6 \u0630\u0643\u0631\u064a\u0627\u062a \u0645\u0645\u064a\u0632\u0629 \u0643\u062d\u062f \u0623\u0642\u0635\u0649", "最多 6 个精选回忆", "Maximaal 6 uitgelichte herinneringen", "No máximo 6 lembranças em destaque", "Högst 6 favoritminnen", "Не больше 6 воспоминаний на видном месте", "Maksymalnie 6 wyróżnionych wspomnień", "대표 추억은 최대 6개예요")); setTimeout(function () { setToast(null); }, 2000); return; }
      lV.push(url);
    }
    setVedettes(lV);
    try { definirVedettesSouvenirs(cibleCh, lV); } catch (eV2) { }
  }
  /* 🟥 05/09 (Blandine, suite de « j'efface les photos où ? ») — permission UNIQUE pour
   Supprimer ET ★ Vedette dans cette visionneuse, quelle que soit la source de la photo :
   proprietaire du commentaire (comme avant), OU proprietaire du CHEVAL si la photo vient
   de la chronologie/d'un album (elle porte alors un `visionneuseAlbumId`), OU moderatrice
   dans les deux cas. Une seule regle a lire, au lieu de deux copies qui auraient pu diverger. */
function peutGererPhotoOuverte() {
  var mod = !!(typeof estModerateurHype === "function" && estModerateurHype(moi));
  if (!moi) return false;
  if (mediasInfo[visionneuse]) return !!(mediasInfo[visionneuse].user_id === moi.id || mod);
  if (visionneuseAlbumId) return !!((chevalDyn && chevalDyn.dbId && chevalDyn.ownerId === moi.id) || mod);
  return false;
}
/* Retire la photo ouverte de SON album (chronologie ou albums nommes — meme donnee, la
   chronologie l'affiche juste par annee). Meme squelette que `retirerPhoto` dans AlbumsCheval,
   mais rejouable ici : cette visionneuse ne connait pas la liste d'albums deja chargee la-bas. */
async function supprimerPhotoAlbumOuverte() {
  var url = visionneuse, albId = visionneuseAlbumId;
  if (!url || !albId || !moi) return;
  try {
    /* 12/09 (36) — SUPPRIMER UNE PHOTO DEPUIS LA GALERIE (Photos > une photo > Supprimer).
       Blandine, plusieurs fois : « on peut toujours pas effacer une photo, elle continue
       d'apparaitre dans l'album ». TROIS DEFAUTS DANS CE SEUL CHEMIN, qui n'avait jamais ete
       touche (mes correctifs des builds 61 et 65 portaient sur « Retirer de l'album », dans le
       panneau d'album : un autre code pour le meme geste) :
       (a) il renvoyait TOUTE la liste des photos recopiee depuis l'ecran -> une photo ajoutee
           entre-temps par quelqu'un d'autre etait effacee. On passe par album_retirer_media, qui
           retire UNE adresse dans la version actuelle en base (repli sur l'ancien chemin si la
           fonction n'est pas encore en base) ;
       (b) il n'emettait pas `hype-albums-modifies` -> ni la chronologie ni le rail ne se
           relisaient. On l'emet, comme le fait deja la suppression d'un souvenir juste a cote ;
       (c) AlbumsCheval n'ecoutait pas ce signal (voir l'ecoute ajoutee dans ce composant) -> la
           photo restait visible dans la section Albums jusqu'a quitter la page. */
    var r = null;
    var rRmG = (typeof hypeAlbumRetirerMedia === "function") ? await hypeAlbumRetirerMedia(albId, url) : { manquante: true };
    if (rRmG && rRmG.manquante) {
      var ra = await listerAlbumsCheval(cibleCh);
      var alb = ((ra && ra.data) || []).filter(function (aU) { return aU && aU.id === albId; })[0];
      if (!alb) { setConfSuppr(false); return; }
      var nouv = (alb.photos || []).filter(function (uF) { return uF !== url; });
      r = await majAlbumCheval(albId, { photos: nouv });
    } else if (rRmG && rRmG.error) { r = { error: rRmG.error }; }
    else if (rRmG && rRmG.resultat === "refuse") { r = { error: "refuse" }; }
    if (r && r.error) {
      setConfSuppr(false);
      setToast(T("Suppression impossible \u2014 r\u00e9essaie.", "Could not delete \u2014 try again.", "No se pudo eliminar \u2014 int\u00e9ntalo de nuevo.", "Eliminazione impossibile \u2014 riprova.", "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "L\u00f6schen nicht m\u00f6glich \u2014 versuch es nochmal.", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0630\u0641 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "无法删除——请重试。", "Verwijderen niet mogelijk — probeer het opnieuw.", "Não foi possível excluir — tente de novo.", "Det gick inte att ta bort — försök igen.", "Не удалось удалить — попробуй ещё раз.", "Nie można usunąć — spróbuj jeszcze raz.", "삭제하지 못했어요. 다시 시도해 주세요."));
      setTimeout(function () { setToast(null); }, 2600);
      return;
    }
    setConfSuppr(false); fermerVisionneuse();
    /* 12/09 (36) : le signal que la chronologie, le rail ET la section Albums ecoutent. */
    try { document.dispatchEvent(new CustomEvent("hype-albums-modifies", { detail: { cible: String(cibleCh) } })); } catch (eEvG) { }
    try { window.dispatchEvent(new Event("hype-souvenirs-maj")); } catch (eM) { }
    setToast(T("Photo supprim\u00e9e", "Photo deleted", "Foto eliminada", "Foto eliminata", "\u5199\u771f\u3092\u524a\u9664\u3057\u307e\u3057\u305f", "Foto gel\u00f6scht", "\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629", "照片已删除", "Foto verwijderd", "Foto excluída", "Foto borttaget", "Фото удалено", "Zdjęcie usunięte", "사진을 삭제했어요"));
    setTimeout(function () { setToast(null); }, 2000);
  } catch (eS) { setConfSuppr(false); }
}
/* Aiguillage : quelle suppression appeler selon d'ou vient la photo ouverte. */
function supprimerPhotoOuverte() {
  if (mediasInfo[visionneuse]) { supprimerSouvenirOuvert(); return; }
  if (visionneuseAlbumId) { supprimerPhotoAlbumOuverte(); return; }
}
async function supprimerSouvenirOuvert() {
    var url = visionneuse; if (!url) return;
    var info = mediasInfo[url]; if (!info || !moi) return;
    try {
      /* 11/09 — Blandine : « la vidéo de Dakota refuse de se supprimer ». Cause confirmée : ce
         bloc n'a jamais vérifié le résultat de la suppression — il affichait « Supprimé » et
         fermait la visionneuse même quand la ligne n'avait pas bougé (ex. une policy RLS qui
         refuse la suppression d'un souvenir d'une autre cavalière, meme pour une moderatrice —
         a verifier cote base si le message ci-dessous apparait). Desormais on regarde vraiment
         ce que la suppression a fait avant d'annoncer quoi que ce soit. */
      var rSup;
      if (info.user_id === moi.id) { rSup = await supprimerCommentaire(info.id); }
      else if (typeof estModerateurHype === "function" && estModerateurHype(moi)) { rSup = await supprimerPostModeration("commentaires", info.id); }
      else { return; }
      if (rSup && (rSup.error || rSup.aucuneLigne)) {
        setConfSuppr(false);
        setToast(T("Suppression impossible \u2014 r\u00e9essaie.", "Could not delete \u2014 try again.", "No se pudo eliminar \u2014 int\u00e9ntalo de nuevo.", "Eliminazione impossibile \u2014 riprova.", "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "L\u00f6schen fehlgeschlagen \u2014 versuch's noch mal.", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0630\u0641 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "无法删除——请重试。", "Verwijderen niet mogelijk — probeer het opnieuw.", "Não foi possível excluir — tente de novo.", "Det gick inte att ta bort — försök igen.", "Не удалось удалить — попробуй ещё раз.", "Nie można usunąć — spróbuj jeszcze raz.", "삭제하지 못했어요. 다시 시도해 주세요."));
        setTimeout(function () { setToast(null); }, 2600);
        return;
      }
      /* 11/09 (Blandine : « effacer une photo ne la fait pas disparaitre tant qu'on n'a pas quitte
         la page, ca porte a confusion ») — la ligne etait bien supprimee en base et la visionneuse
         se fermait, mais la chronologie ne se relisait jamais. On emet l'evenement de
         rafraichissement deja utilise ailleurs ; ChronologieSouvenirs l'ecoute desormais. */
      try { document.dispatchEvent(new CustomEvent("hype-albums-modifies", { detail: { cible: String(cibleCh) } })); } catch (eEvS) { }
      var lV = (vedettes || []).slice(); var iV = lV.indexOf(url);
      if (iV >= 0) { lV.splice(iV, 1); setVedettes(lV); try { definirVedettesSouvenirs(cibleCh, lV); } catch (eV3) { } }
      setConfSuppr(false); fermerVisionneuse();
      try { window.dispatchEvent(new Event("hype-souvenirs-maj")); } catch (eM) { }
      setToast(T("Souvenir supprim\u00e9", "Memory deleted", "Recuerdo eliminado", "Ricordo eliminato", "\u601d\u3044\u51fa\u3092\u524a\u9664\u3057\u307e\u3057\u305f", "Erinnerung gelöscht", "\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0630\u0643\u0631\u0649", "回忆已删除", "Herinnering verwijderd", "Lembrança excluída", "Minne borttaget", "Воспоминание удалено", "Wspomnienie usunięte", "추억을 삭제했어요"));
      setTimeout(function () { setToast(null); }, 2000);
    } catch (eS) { }
  }

  var parts = (c.info || "").split("\u00b7").map(function (x) { return x.trim(); });
  var race = parts[0] || "\u2014";
  var disc = parts[2] || parts[1] || "";
  var etoile = h("path", { d: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 18.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" });
  var arrow = h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M5 12h14M13 6l6 6-6 6" }));
  var diamond = h("path", { d: "M12 2 22 12 12 22 2 12z" });

  function statCell(l) { return h("div", { className: "st", key: l }, h("div", { className: "v" }, "\u2014"), h("div", { className: "l" }, l)); }
  /* 09/10 (763) - REFERENCEMENT, BUILD 11 : le lien partage d UNE FICHE CHEVAL. Adresse publique
     https://2hype.fr/cheval/<slug> si la base en donne une (forme verifiee : jamais /cheval/null ou vide),
     sinon le lien historique /#cheval-<id>. Le slug n est JAMAIS fabrique ici. */
  function lienPartageFiche() {
    var sl = (chevalDyn && typeof chevalDyn.slug === "string") ? chevalDyn.slug : "";
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sl) ? (location.origin + "/cheval/" + sl) : (location.origin + "/#cheval-" + id);
  }
  async function partagerFiche(histoireSeule) {
    var u = lienPartageFiche();   /* 09/10 (763) : adresse publique si slug, sinon /#cheval-<id> (760) */
    /* 12/10 (1007) : meme partage (photo comprise), mais vers la page Histoire : /cheval/<adresse>#histoire ou /#chevalhist-<id> */
    if (histoireSeule === true) u = (u.indexOf("/#cheval-") >= 0) ? (location.origin + "/#chevalhist-" + id) : (u + "#histoire");
    var tx = ((c && c.nom) ? c.nom : "Mon cheval") + (histoireSeule === true ? " \u2014 " + T("Son histoire", "Their story", "Su historia", "La sua storia", "\u7269\u8a9e", "Seine Geschichte", "\u0642\u0635\u062a\u0647", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기") : "") + " \u2014 Hype \uD83D\uDC0E";
    /* 31/07 : la fiche se partage avec sa photo quand le systeme le permet (demande Blandine) */
    try {
      if (navigator.share && navigator.canShare && photoCh) {
        var rIm = await fetch(photoCh); var bIm = await rIm.blob();
        if (bIm && bIm.size > 0 && bIm.size < 8000000) {
          var fIm = new File([bIm], ((c && c.nom) || "cheval").replace(/[^\w-]+/g, "-") + (bIm.type.indexOf("png") >= 0 ? ".png" : ".jpg"), { type: bIm.type || "image/jpeg" });
          if (navigator.canShare({ files: [fIm] })) { await navigator.share({ files: [fIm], title: tx, text: tx + "\n" + u }); return; }
        }
      }
    } catch (eShI) { }
    try { if (navigator.share) { navigator.share({ title: tx, text: tx, url: u }); return; } } catch (e) { }
    try { navigator.clipboard.writeText(u).then(function () { setToast(T("Lien copi\u00e9 !", "Link copied!", "\u00a1Enlace copiado!", "Link copiato!", "\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc\uff01", "Link kopiert!", "\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637!", "链接已复制！", "Link gekopieerd!", "Link copiado!", "Länken kopierades!", "Ссылка скопирована!", "Link skopiowany!", "링크를 복사했어요!")); setTimeout(function () { setToast(null); }, 2200); }); } catch (e) { setToast(u); setTimeout(function () { setToast(null); }, 3500); }
  }
  function abrEpreuve(txt) { /* 31/07 : libelles d epreuve compactes (demande Blandine) — "Finale jeunes chevaux poney . obstacle 4 ans" -> "Finale JC 4 ans" */
    var t = String(txt || "");
    if (!t) return t;
    var age = (t.match(/(\d+)\s*ans/i) || [])[1];
    var estF = /finale/i.test(t);
    var estJC = /jeunes?\s+chevaux/i.test(t);
    if (estJC) return (estF ? "Finale " : "") + "JC" + (age ? " " + age + " ans" : "");
    return t.replace(/jeunes?\s+chevaux/gi, "JC").replace(/\s*\u00b7\s*obstacle/i, " \u00b7 obst.");
  }
  function cristal(kC) { /* 31/07 : separateur cristal entre chapitres (maquette 5 validee) */
    return h("div", { key: "cr" + kC, style: { display: "flex", alignItems: "center", gap: 10, margin: kC === "medias" ? "40px 16px 40px" /* 13/10 (1093) ecart unique de 40 px entre les chapitres (mesure) */ : kC === "partage" ? "40px 16px 40px" /* (1093) 40 au-dessus et au-dessous */ /* 13/10 (1074) Blandine : « laisse plus d espace entre les cartes et la video » */ : "28px 16px 28px" /* 20/08 : resserre (48->26) — « trop espace, ca devient vide » */ /* (1071) 26 -> 28, meme ecart partout */ } }, /* 31/07 soir : ecart PLUS GRAND et SYMETRIQUE de part et d autre du cristal (demande Blandine) */
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, transparent, " + tA(0.4) + ")" } }),
      h("span", { style: { color: teinteCl, fontSize: 10 } }, "\u25c6"),
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, " + tA(0.4) + ", transparent)" } }));
  }
  function qn(ic, l, oc) { return h("div", { className: "qn", key: l, onClick: oc || null, style: oc ? { cursor: "pointer" } : null }, h("svg", { viewBox: "0 0 24 24" }, ic), h("span", null, l)); }
  function infoCell(k, v) {
    var empty = !v || v === "\u2014";
    return h("div", { className: "inf", key: k }, h("div", { className: "k" }, k), h("div", { className: "val" + (empty ? " empty" : "") }, v || "\u2014"));
  }
  function rubanCard(f, i) {
    return h("div", { className: "rband", key: i, onClick: function () { setPanneau(null); setSelRuban(f); } },
      f.img ? h("img", { className: "rimg", src: f.img, alt: f.lab }) : h("div", { className: "ros" }, f.coeur ? h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 20s-6.5-4.3-9-8C1.5 9.5 3 6 6.2 6c1.9 0 3.1 1.1 3.8 2.1C10.7 7.1 11.9 6 13.8 6 17 6 18.5 9.5 17 12c-2.5 3.7-9 8-9 8z" })) : f.med),
      h("div", { className: "rl" }, f.lab),
      (f.cav && typeof CAVALIERS !== "undefined" && CAVALIERS[f.cav]) ? h("div", { onClick: function(e){ if(e&&e.stopPropagation) e.stopPropagation(); if(typeof window!=="undefined"){ window.__cavalierOuvert = f.cav; } setEcran("cavalier"); }, style: { fontSize:10.5, color:teinteCl, fontWeight:600, marginBottom:9, cursor:"pointer", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" } }, CAVALIERS[f.cav].nom + "  \u203A") : null,
      h("div", { className: "rc" }, T("Ouvrir", "Open", "Abrir", "Apri", "\u958b\u304f", "Öffnen", "\u0641\u062a\u062d", "打开", "Openen", "Abrir", "Öppna", "Открыть", "Otwórz", "열기"), arrow));
  }

  /* 11/10 (975) Blandine : « Tu peux la mettre en fond de page sur la page cheval ? » — son image (courbes petrole, poussiere
     d etoiles : images/fond-cheval.webp) devient le FOND de la fiche cheval, portee par le cadre de la page (.chv) : pleine
     largeur en haut, puis le noir de l appli ; lueur du haut de l accueil et voile leger par-dessus pour la lisibilite.
     (Un calque « fixe » a ete essaye : il passait SOUS les fonds noirs des cadres de l appli, donc invisible.) */
  /* 12/10 (989) Blandine : « remplace la page que je t ai envoyee par celle de la page Sante, avec les memes reglages » :
     le fond de la fiche devient EXACTEMENT celui de Sante (images/FOND_SANTE.webp, memes deux voiles, cadre a droite) et il est
     FIXE comme sur Sante : la fiche defile par-dessus. Pour qu il ne passe plus sous les fonds noirs des cadres de l appli (echec
     du 975), la fiche cree son propre empilement (position relative + z-index 0) et le calque fixe est a z-index -1 DEDANS.
     images/fond-cheval.webp reste dans le depot (plus utilisee). */
  /* 12/10 (1004) « Ajouter a mes chevaux » : le geste du bouton flottant (inchange) est sorti en fonction pour servir aussi
     l encart de fin de la page Histoire. Meme condition d affichage qu avant. */
  /* 18/10 (nuit) : connecte, ni proprietaire, ni lie, ni moderateur -> pour ajouter des souvenirs, d abord « Ajouter a mes chevaux ». */
  function doitLierPourAjouter() {
    try { return !!(moi && !lienIndetermine && !estLieFiche && chevalDyn && chevalDyn.dbId && chevalDyn.ownerId && chevalDyn.ownerId !== moi.id && !(typeof estModerateurHype === "function" && estModerateurHype(moi))); } catch (eDl) { return false; }
  }
  function montrerCarteLier() {
    try {
      var elC = document.getElementById("hype-carte-lier-souv");
      if (!elC) { setPanneau("photos"); return; }
      elC.scrollIntoView({ behavior: "smooth", block: "center" });
      if (elC.animate) elC.animate([{ boxShadow: "0 0 0 0 rgba(214,196,161,0.55)" }, { boxShadow: "0 0 0 12px rgba(214,196,161,0)" }], { duration: 900 });
    } catch (eMc) { }
  }
  function peutLierFiche() { return !(!moi || lienIndetermine || (chevalDyn && chevalDyn.dbId && chevalDyn.ownerId === moi.id) || (CHEVAUX_FICHE[id] && typeof estModerateurHype === "function" && estModerateurHype(moi))); }
  async function basculerLienFiche() {
      var dbIdL = chevalDyn && chevalDyn.dbId;
      /* 29/08 : cheval DÉJÀ rattaché -> on le DÉTACHE (delierCheval existait mais
         n'était appelée nulle part). Avant, le bandeau reproposait l'ajout et
         répondait « Déjà dans ton écurie ✓ », sans aucun moyen de faire l'inverse. */
      if (estLieFiche) {
        if (!dbIdL || typeof delierCheval !== "function") { setToast(T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "\u063a\u064a\u0631 \u0645\u0645\u0643\u0646 \u062d\u0627\u0644\u064a\u0627 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요")); setTimeout(function () { setToast(null); }, 2400); return; }
        try {
          var rDf = await delierCheval(dbIdL);
          if (rDf && rDf.error) { setToast(T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "\u063a\u064a\u0631 \u0645\u0645\u0643\u0646 \u062d\u0627\u0644\u064a\u0627 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요")); }
          else { setEstLieFiche(false); setToast(T("Retiré de tes chevaux ✓", "Removed from your horses ✓", "Retirado de tus caballos ✓", "Rimosso dai tuoi cavalli ✓", "私の馬から削除しました ✓", "Aus deinen Pferden entfernt ✓", "\u062a\u0645\u062a \u0627\u0644\u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u062e\u064a\u0648\u0644\u0643 \u2713", "已从你的马中移除 ✓", "Verwijderd uit je paarden ✓", "Removido dos seus cavalos ✓", "Borttagen från dina hästar ✓", "Убрано из твоих лошадей ✓", "Usunięto z twoich koni ✓", "내 말에서 뺐어요 ✓")); }
        } catch (eDf) { setToast(T("Impossible pour l’instant — réessaie", "Not possible right now — try again", "No es posible ahora — reinténtalo", "Impossibile per ora — riprova", "今はできません — もう一度", "Derzeit nicht möglich — versuche es erneut", "\u063a\u064a\u0631 \u0645\u0645\u0643\u0646 \u062d\u0627\u0644\u064a\u0627 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629", "暂时无法操作，请重试", "Nu niet mogelijk — probeer het opnieuw", "Não é possível agora — tente de novo", "Det går inte just nu – försök igen", "Сейчас не получается — попробуй ещё раз", "Teraz się nie da — spróbuj ponownie", "지금은 할 수 없어요. 다시 시도해 주세요")); }
        setTimeout(function () { setToast(null); }, 2600);
        return;
      }
      if (!dbIdL || !moi || typeof lierCheval !== "function") { setToast(T("Bientôt — ajoute ce cheval à ton écurie 💎", "Soon — add this horse to your stable 💎", "Pronto — añade este caballo a tu cuadra 💎", "Presto — aggiungi questo cavallo alla tua scuderia 💎", "近日公開 — この馬を厩舎に追加 💎", "Bald — füge dieses Pferd zu deinem Stall hinzu 💎", "\u0642\u0631\u064a\u0628\u0627 \u2014 \u0623\u0636\u064a\u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646 \u0625\u0644\u0649 \u0625\u0633\u0637\u0628\u0644\u0643 \ud83d\udc8e", "敬请期待——把这匹马添加到你的马厩 💎", "Binnenkort — voeg dit paard toe aan je stal 💎", "Em breve — adicione este cavalo à sua cocheira 💎", "Snart — lägg till den här hästen i ditt stall 💎", "Скоро — добавь эту лошадь в свою конюшню 💎", "Wkrótce — dodaj tego konia do swojej stajni 💎", "곧 만나요 — 이 말을 내 마구간에 추가해 보세요 💎")); setTimeout(function () { setToast(null); }, 2400); return; }
      try {
        var rLf = await lierCheval(dbIdL);
        var msgLf = rLf && rLf.error ? String((rLf.error && rLf.error.message) || rLf.error) : "";
        var dejaLf = rLf && rLf.error && /duplicate|23505|unique/i.test(msgLf);
        if (rLf && rLf.error && !dejaLf) { setToast(T("Impossible pour l’instant — réessaie 💎", "Not possible right now — try again 💎", "No es posible ahora — reinténtalo 💎", "Impossibile per ora — riprova 💎", "今はできません — もう一度 💎", "Derzeit nicht möglich — versuche es erneut 💎", "\u063a\u064a\u0631 \u0645\u0645\u0643\u0646 \u062d\u0627\u0644\u064a\u0627 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \ud83d\udc8e", "暂时无法操作——请重试 💎", "Nu niet mogelijk — probeer het opnieuw 💎", "Impossível por enquanto — tente de novo 💎", "Det går inte just nu — försök igen 💎", "Сейчас не получается — попробуй ещё раз 💎", "Teraz się nie da — spróbuj jeszcze raz 💎", "지금은 할 수 없어요. 다시 시도해 주세요 💎")); }
        else { setEstLieFiche(true); setToast(dejaLf ? T("Déjà dans tes chevaux ✓", "Already in your horses ✓", "Ya en tus caballos ✓", "Già nei tuoi cavalli ✓", "すでに私の馬にいます ✓", "Bereits bei deinen Pferden ✓", "\u0645\u0648\u062c\u0648\u062f \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064a \u062e\u064a\u0648\u0644\u0643 \u2713", "已在你的马里 ✓", "Al bij jouw paarden ✓", "Já está nos seus cavalos ✓", "Redan bland dina hästar ✓", "Уже среди твоих лошадей ✓", "Już wśród twoich koni ✓", "이미 내 말에 있어요 ✓") : T("Dans tes chevaux ✓ — retrouve-le dans « Mes chevaux »", "In your horses ✓ — see “My horses”", "En tus caballos ✓ — míralo en « Mis caballos »", "Nei tuoi cavalli ✓ — vedi « I miei cavalli »", "私の馬に追加 ✓ —「私の馬」でチェック", "Bei deinen Pferden ✓ — zu finden unter „Meine Pferde“", "\u0636\u0645\u0646 \u062e\u064a\u0648\u0644\u0643 \u2713 \u2014 \u062a\u062c\u062f\u064a\u0646\u0647 \u0641\u064a \u00ab\u062e\u064a\u0648\u0644\u064a\u00bb", "已在你的马里 ✓——在“我的马”中找到它", "Bij jouw paarden ✓ — vind het terug in ‘Mijn paarden’", "Nos seus cavalos ✓ — encontre-o em \"Meus cavalos\"", "Bland dina hästar ✓ — hitta den under \"Mina hästar\"", "Среди твоих лошадей ✓ — найди её в «Мои лошади»", "Wśród twoich koni ✓ — znajdziesz go w „Moje konie”", "내 말에 추가했어요 ✓ — “내 말”에서 확인해 보세요")); }
      } catch (eLf) { setToast(T("Impossible pour l’instant — réessaie 💎", "Not possible right now — try again 💎", "No es posible ahora — reinténtalo 💎", "Impossibile per ora — riprova 💎", "今はできません — もう一度 💎", "Derzeit nicht möglich — versuche es erneut 💎", "\u063a\u064a\u0631 \u0645\u0645\u0643\u0646 \u062d\u0627\u0644\u064a\u0627 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \ud83d\udc8e", "暂时无法操作——请重试 💎", "Nu niet mogelijk — probeer het opnieuw 💎", "Impossível por enquanto — tente de novo 💎", "Det går inte just nu — försök igen 💎", "Сейчас не получается — попробуй ещё раз 💎", "Teraz się nie da — spróbuj jeszcze raz 💎", "지금은 할 수 없어요. 다시 시도해 주세요 💎")); }
      setTimeout(function () { setToast(null); }, 2600);
  }
  /* 13/10 (1079) titre de section facon V2 (Cormorant ivoire + « Voir tout › » champagne) */
  function enteteResV1(titre, onVoir, marge) {
    return h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, margin: marge || "0 0 16px" } },
      h("h2", { style: { margin: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 22, lineHeight: 1.2, color: "#F3EEE4" } }, titre),
      onVoir ? h("button", { type: "button", onClick: onVoir, style: { flexShrink: 0, background: "none", border: "none", padding: "4px 0", color: "#D6C4A1", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" } },
        T("Voir tout", "See all", "Ver todo", "Vedi tutto", "すべて見る", "Alle ansehen", "عرض الكل", "查看全部", "Alles bekijken", "Ver tudo", "Visa alla", "Смотреть все", "Zobacz wszystko", "전체 보기") + " \u203a") : null);
  }
  /* ═══ 15/10/2026 (1153) NOUVELLE FICHE CHEVAL (maquette « Hey Baby Please » de Blandine) ═══
     Branchee sur tablette et ordinateur (largeCh) ; sur iPhone, apercu CACHE seulement par l adresse #chevalv4-<id>
     (window.__ficheV4TelId), la fiche iPhone actuelle reste celle de tout le monde. Ancienne mise en page (.app et
     #chapPerf) masquee quand celle-ci s affiche ; les sous-pages (calque panneau), le menu ⋯, les fenetres d ajout de
     resultat, la visionneuse et les champs photo sont inchanges. Memes donnees, memes droits, memes actions qu avant.
     Ordre : photo du haut -> 7 raccourcis -> A propos + Identite -> Origines -> bandeau IPO -> Principaux resultats
     (+ coupes) -> Dernieres photos / Dernieres videos -> Partager sa fiche -> fin de page. */
  function ficheV4() {
    var L = !!largeCh, D = !!menuCh;
    var IV = "#F3EEE4", CH = "#C9A66B", CHL = "#D6C4A1", DX = "rgba(243,238,228,0.64)";
    var SERIF = "'Cormorant Garamond',Georgia,serif", CIN = "'Cinzel',serif", MO = "'Montserrat',sans-serif";
    var pad = D ? 32 : (L ? 24 : 16);
    var rtlV = false; try { rtlV = document.documentElement.dir === "rtl"; } catch (eR) { }
    var lgV = (ctx && ctx.langue) || "fr";
    var og = c.origines || {};
    var carteSt = { borderRadius: 18, border: "1px solid rgba(201,166,107,0.20)", background: "linear-gradient(165deg, rgba(16,26,29,0.92), rgba(9,15,18,0.95))", boxSizing: "border-box", minWidth: 0 };
    var fleche = rtlV ? " ←" : " →";
    function lienBtn(txt, onC) { return h("button", { type: "button", onClick: onC, style: { background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: MO, fontSize: D ? 13 : (L ? 12.5 : 13.5), fontWeight: 500, color: CH, whiteSpace: "nowrap", WebkitTapHighlightColor: "transparent" } }, txt + fleche); }
    function titre(txt, lien, onLien) {
      return h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" } },
        h("h2", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: D ? 30 : (L ? 27 : 24), color: IV, lineHeight: 1.1 } }, txt),
        lien ? lienBtn(lien, onLien) : null);
    }
    function ico(contenu, sz) { return h("svg", { viewBox: "0 0 24 24", width: sz || 22, height: sz || 22, fill: "none", stroke: CHL, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0, display: "block" } }, contenu); }
    function capsule(txt, onC, plein) { return h("button", { type: "button", onClick: onC, style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 40, padding: "0 18px", borderRadius: 999, border: "1px solid " + (plein ? "rgba(201,166,107,0.75)" : "rgba(201,166,107,0.40)"), background: "rgba(5,8,11,0.45)", color: plein ? "#E4D2AE" : IV, fontFamily: MO, fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" } }, txt); }

    /* ── 1. PHOTO DU HAUT ── */
    var nomOffi = String(c.nom || "");
    var surn = ""; try { surn = String((surnomPerso || (chevalDyn && chevalDyn.alias) || "")).trim(); } catch (eSn) { surn = ""; }
    var nmV = surn || nomOffi;
    var montrerOffi = !!(surn && surn.toLowerCase() !== nomOffi.toLowerCase());
    var sxK = String(og.sexe || "").toLowerCase().trim();
    var sxL = { hongre: T("Hongre", "Gelding", "Castrado", "Castrone", "せん馬", "Wallach", "مخصي", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마"), jument: T("Jument", "Mare", "Yegua", "Giumenta", "牽馬", "Stute", "فرس", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말"), entier: T("Entier", "Stallion", "Entero", "Stallone", "牡馬", "Hengst", "فحل", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마") }[sxK] || "";
    var raceV = String((chevalDyn && chevalDyn.race) || c.race || (String(c.info || "").split("·").map(function (x) { return x.trim(); }).filter(function (x) { return x && !/^\d+\s*ans?\b/i.test(x); })[0]) || "").trim();
    var sigleV = ""; try { sigleV = (raceV && typeof hypeSigleOrigine === "function") ? (hypeSigleOrigine(raceV) || "") : ""; } catch (eSg) { }
    var anV = (String(og.naissance || "").match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/) || [])[1] || "";
    var ligneId = [sxL, sigleV || raceV, anV].filter(Boolean).join("  •  ");
    var ixLeg = (og.indices || []).filter(function (ix) { var v = parseFloat(String(ix[1]).replace("−", "-").replace("+", "")); return isFinite(v) && v >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120) /* 15/10 (1154) Blandine : IPO seulement a partir de 120 */; })[0];
    var lblLeg = ixLeg ? rareteIndice(parseFloat(String(ixLeg[1]).replace("−", "-").replace("+", ""))) : null;
    var badgeSt = { display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.55)", background: "rgba(5,8,11,0.45)", color: "#E4D2AE", fontFamily: MO, fontSize: D ? 11 : 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap" };
    var ecurieV = (function () {
      var proprioE = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
      var actuel = String((chevalDyn && chevalDyn.club) || "").trim();
      var stE = { display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MO, fontSize: D ? 13 : 12, color: "#E4D2AE", textShadow: "0 1px 8px rgba(0,0,0,0.7)" };
      if (!proprioE || mesClubsFiche.length < 2) { if (!actuel) return null; return h("div", { style: stE }, h("span", { style: { fontSize: 11 } }, "📍"), actuel); }
      return h("div", { style: { minWidth: 0 } },
        h("div", { role: "button", onClick: function () { setOuvrirEcu(!ouvrirEcu); setErreurClub(""); }, style: Object.assign({}, stE, { cursor: "pointer" }) },
          h("span", { style: { fontSize: 11 } }, "📍"), actuel || T("Aucune écurie", "No stable", "Sin cuadra", "Nessuna scuderia", "所属なし", "Kein Stall", "بدون إسطبل", "没有马厩", "Geen stal", "Nenhuma cocheira", "Inget stall", "Нет конюшни", "Brak stajni", "마구간 없음"),
          h("span", { style: { fontSize: 9, opacity: .7 } }, ouvrirEcu ? "▲" : "▼")),
        ouvrirEcu ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } },
          mesClubsFiche.concat([""]).map(function (cl) {
            var actC = (actuel === cl);
            return h("div", { key: "v4ec" + (cl || "__aucune__"), role: "button", onClick: function () {
                setErreurClub("");
                changerClubCheval(c.dbId, cl || null).then(function (rE) {
                  if (rE && rE.error) { setErreurClub(String(rE.error.message || rE.error)); return; }
                  try { setChevalDyn(function (av) { return Object.assign({}, av || {}, { club: cl || null }); }); } catch (eSd) { }
                  setOuvrirEcu(false);
                });
              }, style: { padding: "7px 13px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (actC ? "rgba(217,199,163,0.7)" : "rgba(255,255,255,0.14)"), background: actC ? "rgba(217,199,163,0.14)" : "rgba(5,8,11,0.55)", color: actC ? "#D9C7A3" : "rgba(243,238,228,0.75)", fontSize: 11.5, fontWeight: 700, fontFamily: MO } },
              cl || T("Aucune", "None", "Ninguna", "Nessuna", "なし", "Keine", "لا شيء", "无", "Geen", "Nenhuma", "Inget", "Нет", "Żadna", "없음"));
          })) : null,
        erreurClub ? h("div", { style: { marginTop: 6, fontSize: 11.5, color: "#FF6B6B", fontFamily: MO } }, erreurClub) : null);
    })();
    var rondSt = { width: 44, height: 44, borderRadius: "50%", border: "1px solid " + CHL, background: "rgba(5,8,11,0.42)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", boxSizing: "border-box", padding: 0, color: CHL };
    var lie = !!estLieFiche;
    var hero = h("header", { style: { position: "relative", height: D ? 420 : (L ? 330 : "calc(env(safe-area-inset-top) + 400px)"), overflow: "hidden" } },
      h("img", { src: photoCh || "images/cheval-defaut-alezan.webp" /* (1157) cheval sans photo : le cheval de la page Actualite (Blandine) */, alt: "", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: (D || L) ? "62% 26%" : "60% 22%", display: "block" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlV ? "270deg" : "90deg") + ", rgba(5,8,11,0.94) 0%, rgba(5,8,11,0.72) " + ((D || L) ? "28%" : "20%") + ", rgba(5,8,11,0.18) " + ((D || L) ? "58%" : "62%") + ", rgba(5,8,11,0) 80%)" } }),
      h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,11,0.55) 0%, rgba(5,8,11,0) 22%, rgba(5,8,11,0) 52%, rgba(5,8,11,0.72) 84%, #05080B 100%)" } }),
      h("div", { style: { position: "absolute", top: (D || L) ? 18 : "calc(env(safe-area-inset-top) + 14px)", insetInlineStart: pad, insetInlineEnd: pad, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
        h("button", { type: "button", "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), onClick: function () { if (ctx && ctx.peutReculer && typeof ctx.retourEcran === "function") ctx.retourEcran(); else setEcran("moncavalier"); }, style: rondSt },
          ico(h("path", { d: rtlV ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7" }), 20)),
        h("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          h(SelecteurLangue, { compact: true }),
          peutLierFiche() ? h("button", { type: "button", "aria-pressed": lie ? "true" : "false", "aria-label": lie ? T("Retirer de mes chevaux", "Remove from my horses", "Quitar de mis caballos", "Rimuovi dai miei cavalli", "マイ馬から外す", "Aus meinen Pferden entfernen", "إزالة من خيولي", "从我的马中移除", "Verwijderen uit mijn paarden", "Remover dos meus cavalos", "Ta bort från mina hästar", "Убрать из моих лошадей", "Usuń z moich koni", "내 말에서 빼기") : T("Ajouter à mes chevaux", "Add to my horses", "Añadir a mis caballos", "Aggiungi ai miei cavalli", "マイ馬に追加", "Zu meinen Pferden hinzufügen", "إضافة إلى خيولي", "添加到我的马", "Toevoegen aan mijn paarden", "Adicionar aos meus cavalos", "Lägg till bland mina hästar", "Добавить к моим лошадям", "Dodaj do moich koni", "내 말에 추가"), onClick: function () { basculerLienFiche(); }, style: rondSt },
            h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: lie ? CHL : "none", stroke: CHL, strokeWidth: 1.5, strokeLinejoin: "round" }, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" }))) : null,
          h("button", { type: "button", "aria-label": T("Menu de la fiche", "Card menu", "Menú", "Menu", "メニュー", "Menü", "قائمة الصفحة", "资料菜单", "Menu van de pagina", "Menu da ficha", "Sidans meny", "Меню карточки", "Menu karty", "프로필 메뉴"), onClick: function () { setMenuFiche(true); }, style: rondSt },
            h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: CHL }, h("circle", { cx: 6, cy: 12, r: 1.6 }), h("circle", { cx: 12, cy: 12, r: 1.6 }), h("circle", { cx: 18, cy: 12, r: 1.6 }))))),
      h("div", { style: { position: "absolute", zIndex: 2, insetInlineStart: pad, insetInlineEnd: pad, bottom: D ? 44 : (L ? 32 : 26), maxWidth: D ? 640 : (L ? 520 : "none") } },
        h("h1", { style: { margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: D ? (nmV.length > 22 ? 54 : 68) : (L ? (nmV.length > 22 ? 44 : 54) : (nmV.length > 20 ? 32 : 42)) /* (1157) nom plus present */, lineHeight: 1.04, color: IV, overflowWrap: "anywhere", textShadow: "0 2px 18px rgba(0,0,0,0.65)" } }, nmV),
        montrerOffi ? h("div", { style: { marginTop: 6, fontFamily: MO, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(243,238,228,0.62)" } }, nomOffi) : null,
        ligneId ? h("div", { style: { marginTop: D ? 14 : 12, fontFamily: MO, fontSize: D ? 15 : (L ? 13.5 : 12), fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(243,238,228,0.88)" } }, ligneId) : null,
        (ecurieV || v4Team || lblLeg) ? h("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", columnGap: 12, rowGap: 8, marginTop: D ? 20 : 16 } },
          v4Team ? h("span", { style: badgeSt }, ico(h("path", { d: "M4 17h16l-1.5-9-4.5 4-2-6-2 6-4.5-4z" }), 14), T("Équipe compétition", "Competition team", "Equipo de competición", "Squadra agonistica", "競技チーム", "Turnierteam", "فريق المنافسات", "比赛队", "Wedstrijdteam", "Equipe de competição", "Tävlingsteam", "Команда соревнований", "Drużyna zawodnicza", "대회 팀")) : null,
          lblLeg ? h("span", { style: badgeSt }, "✦ " + T("LÉGENDE HYPE", "HYPE LEGEND", "LEYENDA HYPE", "LEGGENDA HYPE", "伝説", "HYPE-LEGENDE", "أسطورة HYPE", "HYPE 传奇", "HYPE-LEGENDE", "LENDA HYPE", "HYPE-LEGEND", "ЛЕГЕНДА HYPE", "LEGENDA HYPE", "HYPE 레전드")) : null,
          ecurieV) : null));

    /* ── 2. SEPT RACCOURCIS (memes pages qu avant ; Origines descend au bloc Origines) ── */
    var racs = [
      ["hist", T("Son histoire", "Story", "Su historia", "La sua storia", "物語", "Geschichte", "قصته", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기"), h("path", { d: "M4 5.5c2.6-1.1 5.4-1.1 8 .6 2.6-1.7 5.4-1.7 8-.6v13c-2.6-1.1-5.4-1.1-8 .6-2.6-1.7-5.4-1.7-8-.6zM12 6.1v13" }), function () { setPanneau("souvenirs"); }],
      ["perf", T("Performances", "Performances", "Rendimiento", "Prestazioni", "実績", "Leistungen", "النتائج", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적"), h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }), function () { setPanneau("palmares"); }],
      /* 15/10 (1163) Blandine : « on n a pas de page Origines » -> raccourci Origines retire (6 raccourcis) */
      ["ph", T("Photos", "Photos", "Fotos", "Foto", "写真", "Fotos", "الصور", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"), h("g", null, h("path", { d: "M4 8h3l2-2.5h6L17 8h3v11H4z" }), h("circle", { cx: 12, cy: 13, r: 3.4 })), function () { setPanneau("photos"); }],
      ["vi", T("Vidéos", "Videos", "Vídeos", "Video", "動画", "Videos", "الفيديوهات", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"), h("path", { d: "M8.5 6v12l9.5-6z" }), function () { setPanneau("videos"); }],
      ["ac", T("Actualité", "News", "Actualidad", "Attualità", "ニュース", "Aktuelles", "الأخبار", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"), h("path", { d: "M6 3.5h9l3 3v14H6zM9 10h6M9 13.5h6M9 17h4" }), function () { setPanneau("actualite"); }],
      ["sa", T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "الصحة", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강"), h("path", { d: "M12 20s-7-4.5-9-9c-1.2-2.8.6-6 3.7-6 2 0 3.4 1.2 4.3 2.6C12 6.2 13.4 5 15.4 5c3.1 0 4.9 3.2 3.7 6-2 4.5-9 9-9 9zM6 11.5h3l1.5-2.5 2 4.5 1.5-2h4" }), function () { try { window.__santeCheval = { id: (c && c.dbId) || id, nom: (c && c.nom) || "" }; } catch (eSc) { } setEcran("sante-cheval"); }]
    ];
    var raccourcis = h("div", { style: { display: "grid", gridTemplateColumns: (D || L) ? "repeat(6, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))" /* (1163) 6 sur une ligne ; telephone 3 + 3 */, gap: D ? 14 : 10, rowGap: 14, margin: (D ? "8px " : (L ? "10px " : "16px ")) + pad + "px 0" /* (1157) air sous la photo */ } },
      racs.map(function (r) {
        var cote = D ? 66 : (L ? 56 : 58);
        return h("button", { key: "v4r" + r[0], type: "button", onClick: r[3], style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, cursor: "pointer", minWidth: 0, WebkitTapHighlightColor: "transparent" } },
          h("span", { style: { width: cote, height: cote, borderRadius: 16, border: "1px solid rgba(201,166,107,0.30)", background: "linear-gradient(165deg, #111B1F, #0B1215)", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" } }, ico(r[2], D ? 27 : 24)),
          h("span", { style: { fontFamily: MO, fontSize: D ? 13 : (L ? 12 : 12.5), fontWeight: 500, color: IV, textAlign: "center", lineHeight: 1.2, maxWidth: "100%", overflowWrap: "anywhere" } }, r[1]));
      }));

    /* ── 3. A PROPOS + IDENTITE ── */
    var histV = String((chevalDyn && chevalDyn.histoire) || c.histoire || "").trim();
    var padCarte = D ? "28px 30px" : (L ? "24px 24px" : "22px 20px");   /* (1158) cartes plus aerees */
    var aPropos = histV ? h("div", { style: Object.assign({}, carteSt, { padding: padCarte, display: "flex", flexDirection: "column" }) },
        titre(T("À propos", "About", "Acerca de", "Informazioni", "紹介", "Über", "نبذة", "关于", "Over", "Sobre", "Om", "О нас", "O nas", "소개")),
        h("div", { style: { fontFamily: MO, fontSize: D ? 14.5 : 14, lineHeight: 1.7, color: "rgba(243,238,228,0.86)", whiteSpace: "pre-line", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: D ? 7 : 6, WebkitBoxOrient: "vertical", WebkitMaskImage: histV.length > 320 ? "linear-gradient(180deg, #000 68%, rgba(0,0,0,0.22) 100%)" : "none", maskImage: histV.length > 320 ? "linear-gradient(180deg, #000 68%, rgba(0,0,0,0.22) 100%)" : "none" /* (1158) fondu : le recit continue dans Lire son histoire */ } }, histV),
        h("div", { style: { marginTop: "auto", paddingTop: 20 } }, lienBtn(T("Lire son histoire", "Read its story", "Leer su historia", "Leggi la sua storia", "物語を読む", "Seine Geschichte lesen", "اقرأ قصته", "阅读它的故事", "Lees zijn verhaal", "Ler a história dele", "Läs berättelsen", "Прочитать её историю", "Przeczytaj jego historię", "이야기 읽기"), function () { setPanneau("souvenirs"); })))
      : (estMonChevalFiche ? h("div", { style: Object.assign({}, carteSt, { padding: padCarte }) },
          titre(T("À propos", "About", "Acerca de", "Informazioni", "紹介", "Über", "نبذة", "关于", "Over", "Sobre", "Om", "О нас", "O nas", "소개")),
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: DX, marginBottom: 14 } }, T("Son histoire n’est pas encore écrite.", "Its story hasn’t been written yet.", "Su historia aún no está escrita.", "La sua storia non è ancora stata scritta.", "物語はまだ書かれていません。", "Seine Geschichte ist noch nicht geschrieben.", "لم تُكتب قصته بعد.", "它的故事还没有写下来。", "Zijn verhaal is nog niet geschreven.", "A história dele ainda não foi escrita.", "Berättelsen är inte skriven än.", "Её история ещё не написана.", "Jego historia nie została jeszcze napisana.", "아직 이야기가 쓰여 있지 않아요.")),
          lienBtn(T("Écris son histoire", "Write its story", "Escribe su historia", "Scrivi la sua storia", "物語を書く", "Schreib seine Geschichte", "اكتب قصته", "写下它的故事", "Schrijf zijn verhaal", "Escreva a história dele", "Skriv berättelsen", "Напиши её историю", "Napisz jego historię", "이야기 쓰기"), function () { setPanneau("souvenirs"); }))
        : null);
    var lignesId = (function () {
      var out = [];
      function li(icoC, texte, sous) {
        return h("div", { key: "li" + out.length, style: { display: "flex", alignItems: "center", gap: 14, padding: "8px 0" } }, h("span", { style: { width: 22, display: "flex", justifyContent: "center", flexShrink: 0 } }, ico(icoC, 20)),
          h("div", { style: { minWidth: 0 } },
            h("div", { style: { fontFamily: SERIF, fontSize: D ? 18 : 16.5, lineHeight: 1.2, color: IV, overflowWrap: "anywhere" } }, texte),
            sous ? h("div", { style: { marginTop: 3, fontFamily: MO, fontSize: 12.5, lineHeight: 1.3, color: DX, overflowWrap: "break-word" } }, sous) : null));
      }
      try {
        var partsI = String(c.info || "").split("·").map(function (x) { return x.trim(); }).filter(Boolean);
        var aTxt = partsI.filter(function (x) { return /^\d+\s*ans?\b/i.test(x); })[0] || "";
        var rTxt = partsI.filter(function (x) { return !/^\d+\s*ans?\b/i.test(x); })[0] || "";
        var autresI = partsI.filter(function (x) { return x !== aTxt && x !== rTxt; });
        var nsA = og.naissance ? hypeNaissanceAffichee(og.naissance, lgV) : "";
        if (!aTxt && og.naissance) {
          var mN1 = String(og.naissance).match(/^(\d{4})-(\d{2})-(\d{2})/), mN2 = String(og.naissance).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/), mN3 = String(og.naissance).match(/^(\d{4})$/);
          var yN = mN1 ? +mN1[1] : (mN2 ? +mN2[3] : (mN3 ? +mN3[1] : 0)), moN = mN1 ? +mN1[2] : (mN2 ? +mN2[2] : 0), jN = mN1 ? +mN1[3] : (mN2 ? +mN2[1] : 0);
          if (yN) { var dN = new Date(), agN = dN.getFullYear() - yN; if (moN && ((dN.getMonth() + 1) < moN || ((dN.getMonth() + 1) === moN && dN.getDate() < jN))) agN--; if (agN >= 0 && agN < 60) aTxt = agN + " " + (agN <= 1 ? T("an", "year", "año", "anno", "歳", "Jahr", "سنة", "年", "jr", "ano", "år", "г.", "r.", "년") : T("ans", "years", "años", "anni", "歳", "Jahre", "سنوات", "岁", "jaar", "anos", "år", "лет", "lat", "세")); }
        }
        if (aTxt || nsA) out.push(li(h("g", null, h("rect", { x: 3.5, y: 5, width: 17, height: 15, rx: 2 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" })), aTxt || nsA, (aTxt && nsA) ? (T("né le ", "born ", "nacido el ", "nato il ", "", "geboren am ", "وُلد في ", "出生于 ", "geboren op ", "nascido em ", "född ", "родилась ", "ur. ", "출생: ") + nsA) : null));
        if (sxL) out.push(li(h("g", null, h("circle", { cx: 12, cy: 9, r: 5 }), h("path", { d: "M12 14v7M9 18h6" })), sxL));
        var rAff = rTxt ? (hypeSigleOrigine(rTxt) ? (rTxt + " (" + hypeSigleOrigine(rTxt) + ")") : rTxt) : "";
        if (rAff) out.push(li(h("path", { d: "M5 20l2-9 4-5 2 3 5-4-1 6 3 2-4 2-1 5" }), rAff));
        if (og.robe) out.push(li(h("path", { d: "M12 3c4 4.5 6 7.6 6 10.2A6 6 0 0 1 6 13.2C6 10.6 8 7.5 12 3z" }), String(og.robe)));
        if (autresI.length) out.push(li(h("path", { d: "M4 18c3-6 6-9 8-9s5 3 8 9M8 18h8" }), autresI.join(" · ")));
        var ixL = (og.indices || [])[0];
        if (ixL && ixL[1] && parseFloat(String(ixL[1]).replace("\u2212", "-").replace("+", "")) >= 100 /* 15/10 (1155) Blandine : la ligne IPO s affiche des 100 (le bandeau, lui, des 120) */) out.push(li(h("path", { d: "m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9z" }), String(ixL[0]) + " " + String(ixL[1])));
      } catch (eLi) { }
      return out;
    })();
    var identite = h("div", { style: Object.assign({}, carteSt, { padding: padCarte }) },
      titre(T("Identité", "Identity", "Identidad", "Identità", "プロフィール", "Identität", "الهوية", "身份", "Identiteit", "Identidade", "Identitet", "Личные данные", "Tożsamość", "기본 정보")),
      h("div", { style: { display: "flex", gap: D ? 22 : 16, alignItems: "stretch" } },
        photoCh ? h("div", { style: { flex: "0 0 " + (D ? "38%" : (L ? "36%" : "38%")), maxWidth: D ? 230 : 190, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(201,166,107,0.25)", minHeight: 150 } },
          h("img", { src: photoCh, alt: "", loading: "lazy", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 25%", display: "block" } })) : null,
        h("div", { style: { flex: 1, minWidth: 0 } }, lignesId.length ? lignesId : h("div", { style: { fontFamily: MO, fontSize: 12.5, color: DX } }, "—"))));
    var blocAI = h("div", { style: { display: "grid", gridTemplateColumns: (aPropos && (D || L)) ? (D ? "minmax(0, 1fr) minmax(0, 1.08fr)" : "minmax(0, 1fr) minmax(0, 1fr)") : "minmax(0, 1fr)", gap: D ? 22 : 16, margin: "0 " + pad + "px" } }, aPropos, identite);

    /* ── 4. ORIGINES (apercu du pedigree ; le detail s ouvre dans le meme bloc) ── */
    var pg = og.pedigree || { pere: og.pere || null, mere: og.mere || null };
    function nomDe(x) { if (!x) return ""; if (typeof x === "string") return x; return String(x.nom || ""); }
    function enf(x, cle) { return (x && typeof x === "object") ? (x[cle] || null) : null; }
    var aOrig = !!(nomDe(pg.pere) || nomDe(pg.mere));
    var peutOrigV = !!((!CHEVAUX_FICHE[id] || NOMS_MIGRES[id]) && chevalDyn && chevalDyn.dbId && c.dbId && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi) || gereClubCh));
    var aG2 = !!(enf(pg.pere, "pere") || enf(pg.pere, "mere") || enf(pg.mere, "pere") || enf(pg.mere, "mere"));
    var aG3 = false; [enf(pg.pere, "pere"), enf(pg.pere, "mere"), enf(pg.mere, "pere"), enf(pg.mere, "mere")].forEach(function (gN) { if (gN && (enf(gN, "pere") || enf(gN, "mere"))) aG3 = true; });
    var lp = T("Père", "Sire", "Padre", "Padre", "父", "Vater", "الأب", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지"), lm = T("Mère", "Dam", "Madre", "Madre", "母", "Mutter", "الأم", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니");
    function celV(n, opts) {
      opts = opts || {};
      var nomN = nomDe(n);
      var idAsc = nomN ? ascendantVersFiche(nomN) : null;
      var detail = (n && typeof n === "object" && n.detail) ? String(n.detail) : "";
      return h("div", { key: opts.k, role: idAsc ? "button" : null, onClick: idAsc ? function () { try { window.__chevalOuvert = idAsc; } catch (eAs) { } setEcran("cheval"); } : null,
        style: { position: "relative", gridColumn: opts.col, gridRow: opts.row, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0, padding: opts.grand ? "10px 14px" : "7px 12px", borderInlineStart: "2px solid " + (opts.grand ? "rgba(201,166,107,0.55)" : "rgba(201,166,107,0.25)"), cursor: idAsc ? "pointer" : "default" } },
        (opts.col && opts.col > 1 && (D || L) && nomN) ? h("span", { "aria-hidden": "true", style: { position: "absolute", insetInlineStart: -20, top: "50%", width: 18, height: 1, background: "rgba(201,166,107,0.42)" } }) : null,   /* (1159) trait de liaison entre generations */
        opts.label ? h("div", { style: { fontFamily: MO, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: CH, fontWeight: 700, marginBottom: 4 } }, opts.label) : null,
        h("div", { style: { fontFamily: opts.grand ? SERIF : CIN, fontSize: opts.grand ? (D ? 22 : 19) : (opts.moyen ? 14.5 : 12.5), fontWeight: opts.grand ? 600 : 600, color: idAsc ? "#E4D2AE" : (nomN ? IV : DX), lineHeight: 1.25, overflowWrap: "anywhere" } }, nomN || "—"),
        (detail && (opts.grand || opts.moyen)) ? h("div", { style: { marginTop: 3, fontFamily: MO, fontSize: 10, color: "#A39D92", lineHeight: 1.3 } }, detail) : null);
    }
    var gen3 = v4Ped && aG3;
    var arbre = aOrig ? ((D || L) ? h("div", { style: { display: "grid", gridTemplateColumns: gen3 ? "1.15fr 1fr 1fr" : (aG2 ? "1fr 1fr" : "1fr"), gridAutoRows: "minmax(28px, auto)", rowGap: 8, columnGap: 22, flex: 1, minWidth: 0, maxWidth: gen3 ? (D ? 900 : "100%") : (D ? 720 : 600) /* (1159) arbre compact */ } },
        celV(pg.pere, { k: "p", col: 1, row: aG2 ? (gen3 ? "1 / span 4" : "1 / span 2") : "1", label: lp, grand: true }),
        celV(pg.mere, { k: "m", col: 1, row: aG2 ? (gen3 ? "5 / span 4" : "3 / span 2") : "2", label: lm, grand: true }),
        aG2 ? celV(enf(pg.pere, "pere"), { k: "pp", col: 2, row: gen3 ? "1 / span 2" : "1", moyen: true }) : null,
        aG2 ? celV(enf(pg.pere, "mere"), { k: "pm", col: 2, row: gen3 ? "3 / span 2" : "2", moyen: true }) : null,
        aG2 ? celV(enf(pg.mere, "pere"), { k: "mp", col: 2, row: gen3 ? "5 / span 2" : "3", moyen: true }) : null,
        aG2 ? celV(enf(pg.mere, "mere"), { k: "mm", col: 2, row: gen3 ? "7 / span 2" : "4", moyen: true }) : null,
        gen3 ? [["ppp", enf(enf(pg.pere, "pere"), "pere"), "1"], ["ppm", enf(enf(pg.pere, "pere"), "mere"), "2"], ["pmp", enf(enf(pg.pere, "mere"), "pere"), "3"], ["pmm", enf(enf(pg.pere, "mere"), "mere"), "4"], ["mpp", enf(enf(pg.mere, "pere"), "pere"), "5"], ["mpm", enf(enf(pg.mere, "pere"), "mere"), "6"], ["mmp", enf(enf(pg.mere, "mere"), "pere"), "7"], ["mmm", enf(enf(pg.mere, "mere"), "mere"), "8"]].map(function (g3) { return celV(g3[1], { k: g3[0], col: 3, row: g3[2] }); }) : null)
      : h("div", { style: { display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 0 } },
        [[pg.pere, lp, "p"], [pg.mere, lm, "m"]].map(function (pr) {
          var gp = enf(pr[0], "pere"), gm = enf(pr[0], "mere");
          return h("div", { key: "ph" + pr[2], style: { minWidth: 0 } },
            celV(pr[0], { k: "c" + pr[2], label: pr[1], grand: true }),
            (gp || gm) ? h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6, paddingInlineStart: 12 } },
              celV(gp, { k: "cp" + pr[2], moyen: true }), celV(gm, { k: "cm" + pr[2], moyen: true })) : null,
            (v4Ped && (gp || gm)) ? h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6, paddingInlineStart: 24 } },
              [enf(gp, "pere"), enf(gp, "mere"), enf(gm, "pere"), enf(gm, "mere")].map(function (g3, i3) { return celV(g3, { k: "g3" + pr[2] + i3 }); })) : null);
        })))
      : h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: DX, padding: "6px 0" } }, T("Origines non renseignées", "Bloodline not provided", "Orígenes no indicados", "Origini non indicate", "血統は未登録", "Herkunft nicht angegeben", "النسب غير مُدخل", "血统未填写", "Afstamming niet ingevuld", "Origens não informadas", "Ursprung ej angivet", "Происхождение не указано", "Brak informacji o pochodzeniu", "혈통 정보 없음"));
    var detailPed = v4Ped ? h("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 12 } },
        (og.arbre || []).map(function (gn, gi) {
          return h("div", { key: "v4gen" + gi },
            h("div", { style: { fontFamily: MO, fontSize: 9, letterSpacing: "0.2em", color: "#A39D92", textTransform: "uppercase", fontWeight: 700, marginBottom: 7 } }, tr(gn.gen)),
            h("div", { style: { display: "grid", gridTemplateColumns: (gn.lignes || []).length > 1 ? "1fr 1fr" : "1fr", columnGap: 14, rowGap: 7 } },
              (gn.lignes || []).map(function (ln, li2) { return h("div", { key: "v4ln" + li2, style: { minWidth: 0, paddingInlineStart: 9, borderInlineStart: "2px solid rgba(201,166,107,0.3)" } }, h("div", { style: { fontFamily: CIN, fontSize: 12.5, fontWeight: 600, color: "#E6ECEF" } }, ln[0]), h("div", { style: { fontSize: 9.5, color: "#7D776D", marginTop: 1, fontFamily: MO } }, ln[1])); })));
        }),
        og.naisseur ? h("div", { style: { fontFamily: MO, fontSize: 11, color: "#A39D92" } }, h("span", { style: { letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, fontSize: 9, color: CH } }, T("Naisseur", "Breeder", "Criador", "Allevatore", "生産者", "Züchter", "\u0627\u0644\u0645\u0631\u0628\u064a", "育马人", "Fokker", "Criador", "Uppfödare", "Заводчик", "Hodowca", "생산자")), "  " + og.naisseur) : null,
        og.note ? h("div", { style: { fontFamily: MO, fontSize: 10.5, color: "#7D776D", fontStyle: "italic" } }, og.note) : null,
        og.sire ? h("div", { role: "button", onClick: function () { try { window.open("https://infochevaux.ifce.fr/fr/info-chevaux", "_blank"); } catch (eSi) { } }, style: { display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", padding: "8px 12px", borderRadius: 12, border: "1px solid rgba(201,166,107,0.3)", cursor: "pointer", fontFamily: MO } },
          h("span", { style: { letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, fontSize: 9, color: "#A39D92" } }, "SIRE"), h("span", { style: { fontSize: 12, color: IV, fontWeight: 600 } }, og.sire), h("span", { style: { fontSize: 10, color: CH } }, "Info Chevaux ↗")) : null,
        (parenteInfo && parenteInfo.descendants && parenteInfo.descendants.length) ? h("div", null,
          h("div", { style: { fontFamily: MO, fontSize: 9, letterSpacing: "0.2em", color: "#A39D92", textTransform: "uppercase", fontWeight: 700, marginBottom: 7 } }, T("Poulains", "Foals", "Potros", "Puledri", "\u5b50\u99ac", "F\u00f6hlen", "\u0627\u0644\u0645\u0647\u0648\u0631", "小马驹", "Veulens", "Potros", "Föl", "Жеребята", "Źrebaki", "망아지")),
          h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, parenteInfo.descendants.map(function (dsc) {
            return h("span", { key: "v4d" + dsc.id, role: "button", onClick: function () { try { window.__chevalOuvert = dsc.id; } catch (eDs) { } setEcran("cheval"); }, style: { display: "inline-block", padding: "5px 11px", borderRadius: 999, border: "1px solid rgba(201,166,107,0.4)", background: "rgba(201,166,107,0.08)", color: "#E4D2AE", fontSize: 11, fontWeight: 600, fontFamily: CIN, cursor: "pointer" } }, dsc.nom);
          }))) : null) : null;
    var origines = h("div", { id: "v4Origines", style: Object.assign({}, carteSt, { margin: "0 " + pad + "px", padding: padCarte, scrollMarginTop: 20 }) },
      titre(T("Origines", "Bloodline", "Orígenes", "Origini", "血統", "Herkunft", "النسب", "血统", "Afstamming", "Origens", "Ursprung", "Происхождение", "Pochodzenie", "혈통"),
        aOrig ? (v4Ped ? T("Réduire le pedigree", "Show less", "Reducir el pedigrí", "Riduci il pedigree", "血統を閉じる", "Stammbaum einklappen", "تصغير النسب", "收起谱系", "Stamboom inklappen", "Recolher o pedigree", "Dölj stamtavlan", "Свернуть родословную", "Zwiń rodowód", "혈통 접기") : T("Voir le pedigree complet", "See full pedigree", "Ver el pedigrí completo", "Vedi il pedigree completo", "血統をすべて見る", "Vollständigen Stammbaum ansehen", "عرض النسب الكامل", "查看完整谱系", "Bekijk de volledige stamboom", "Ver o pedigree completo", "Visa hela stamtavlan", "Смотреть полную родословную", "Zobacz pełny rodowód", "전체 혈통 보기")) : null,
        function () { var ouv = !v4Ped; setV4Ped(ouv); if (ouv) { try { chargerDescendantsCheval(); } catch (eDc) { } } }),
      h("div", { style: { display: "flex", gap: D ? 24 : 16, alignItems: "stretch" } },
        null /* (1159) photo retiree : elle doublait celle de la carte Identite */,
        arbre),
      detailPed,
      peutOrigV ? h("div", { style: { marginTop: 18, display: "flex", flexDirection: "column", alignItems: (D || L) ? "flex-start" : "center", gap: 8 } },
        capsule("⤓ " + T("Importer les origines depuis une capture", "Import bloodline from a screenshot", "Importar los orígenes desde una captura", "Importa le origini da una schermata", "キャプチャから血統を取り込む", "Herkunft aus Screenshot importieren", "استيراد النسب من لقطة شاشة", "从截图导入血统", "Afstamming importeren vanuit een screenshot", "Importar as origens a partir de uma captura", "Importera ursprung från en skärmdump", "Загрузить происхождение со скриншота", "Zaimportuj pochodzenie ze zrzutu ekranu", "캡처 화면으로 혈통 가져오기"), function () { ouvrirEditOrigines(); }),
        (v4Ped || !aOrig) ? h("div", { style: { maxWidth: 420, fontFamily: SERIF, fontStyle: "italic", fontSize: 14, lineHeight: 1.35, color: DX, textAlign: (D || L) ? "start" : "center" } }, T("Pour faire valider l’IPO (ou un autre indice), importe la capture d’un site qui le mentionne : IFCE, Info Chevaux, Horsetelex…",
                "To get the IPO (or another index) validated, import a screenshot of a website showing it: IFCE, Info Chevaux, Horsetelex…",
                "Para validar el IPO (u otro índice), importa la captura de una web que lo indique: IFCE, Info Chevaux, Horsetelex…",
                "Per far convalidare l’IPO (o un altro indice), importa lo screenshot di un sito che lo riporta: IFCE, Info Chevaux, Horsetelex…",
                "IPO（または他の指数）を確認するには、それが載っているサイト（IFCE、Info Chevaux、Horsetelex…）のキャプチャを取り込んでね。",
                "Um den IPO (oder einen anderen Index) bestätigen zu lassen, importiere einen Screenshot einer Seite, die ihn zeigt: IFCE, Info Chevaux, Horsetelex…",
                "لاعتماد مؤشر IPO (أو مؤشر آخر)، استوردي لقطة شاشة لموقع يذكره: IFCE وInfo Chevaux وHorsetelex…", "想让 IPO（或其他指标）通过验证，请导入提到它的网站截图：IFCE、Info Chevaux、Horsetelex…", "Om de IPO (of een andere index) te laten valideren, importeer je een screenshot van een website waarop die staat: IFCE, Info Chevaux, Horsetelex…", "Para validar o IPO (ou outro índice), importe a captura de um site que o mencione: IFCE, Info Chevaux, Horsetelex…", "För att få IPO (eller ett annat index) verifierat, importera en skärmdump från en webbplats som nämner det: IFCE, Info Chevaux, Horsetelex…", "Чтобы подтвердить IPO (или другой индекс), загрузи скриншот сайта, где он указан: IFCE, Info Chevaux, Horsetelex…", "Aby zatwierdzić IPO (lub inny indeks), zaimportuj zrzut ekranu ze strony, która go podaje: IFCE, Info Chevaux, Horsetelex…", "IPO(또는 다른 지수)를 확인받으려면 해당 정보가 나온 사이트의 캡처를 가져오세요: IFCE, Info Chevaux, Horsetelex…")) : null) : null);

    /* ── 5. BANDEAU IPO (inchange sur le fond : meme calcul que l ancien bandeau) ── */
    var bandeauIpo = (function () {
      var ixI = (og.indices || []).filter(function (ix) { var v = parseFloat(String(ix[1]).replace("−", "-").replace("+", "")); return isFinite(v) && v >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120) /* 15/10 (1154) Blandine : IPO seulement a partir de 120 */; });
      if (!ixI.length) return null;
      var vI = parseFloat(String(ixI[0][1]).replace("−", "-").replace("+", ""));
      var lblI = rareteIndice(vI);
      return h("div", { style: Object.assign({}, carteSt, { margin: "0 " + pad + "px", padding: D ? "18px 26px" : "16px 18px", display: "flex", alignItems: "center", gap: 16, border: "1px solid rgba(201,166,107,0.40)" }) },
        h("div", { style: { minWidth: 0 } },
          h("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" } },
            h("div", { style: { fontFamily: CIN, fontSize: D ? 26 : 22, fontWeight: 700, lineHeight: 1, color: "#E4D2AE" } }, ixI[0][1]),
            h("div", { style: { fontFamily: MO, fontSize: 12, letterSpacing: "0.2em", fontWeight: 800, color: CH } }, ixI[0][0])),
          ixI[0][2] ? h("div", { style: { fontFamily: MO, fontSize: 11, color: "#A39D92", marginTop: 5 } }, abrEpreuve(ixI[0][2])) : null,
          og.apt ? h("div", { style: { fontFamily: MO, fontSize: 11, color: "#9AA5AD", fontStyle: "italic", marginTop: 3 } }, abrEpreuve(og.apt)) : null),
        lblI ? h("div", { style: { flexShrink: 0, marginInlineStart: "auto", textAlign: "center", paddingInlineStart: 16, borderInlineStart: "1px solid rgba(201,166,107,0.3)" } },
          h("div", { style: { fontFamily: CIN, fontSize: D ? 18 : 15, fontWeight: 700, color: "#E4D2AE", lineHeight: 1.25 } }, lblI),
          h("div", { style: { fontFamily: MO, fontSize: 9, letterSpacing: "0.12em", color: "#A39D92", fontWeight: 700, textTransform: "uppercase", marginTop: 4 } }, T("chevaux de sport", "sport horses", "caballos de deporte", "cavalli sportivi", "\u30b9\u30dd\u30fc\u30c4\u99ac", "Sportpferde", "\u062e\u064a\u0648\u0644 \u0631\u064a\u0627\u0636\u064a\u0629", "运动马", "sportpaarden", "cavalos de esporte", "sporthästar", "спортивные лошади", "konie sportowe", "스포츠 말"))) : null);
    })();

    /* ── 6. PRINCIPAUX RESULTATS (memes regles que les « moments forts » de la page Performances) + coupes ── */
    /* (1153) COPIE des regles de tri des moments forts (page Performances, 596/597/598) : si elles changent, les changer aux deux endroits */
    function poidsTitre(f) { var tT = ((f.nom || "") + " " + (f.ep || "")).toLowerCase(); /* (596) ECHELLE DES TITRES, reglee avec Blandine : 3 = titre NATIONAL (Open de France, championnat / chpt de France, coupe de France, criterium, finale, grand tournoi) ; 2 = INTERNATIONAL ou SALON (« le salon int de Bordeaux devrait etre plus important ») ; 1 = autre championnat (regional, des territoires, « Chp Reg »... — « on gardait les Reg ») ; 0 = epreuve ordinaire, et aussi un championnat ou circuit DEPARTEMENTAL sans mention regionale (« sans les dpt », 594). */ if (/open de france|championnat de france|chpt? de france|coupe de france|crit\u00e9rium|criterium|finale|grand tournoi/.test(tT)) return 3; if (/internation|\bint\b|salon du cheval|salon internat|\bsalon\b|\bequita\b|\beurexpo\b/.test(tT)) return 2; /* Equita Lyon = salon, sans le mot ; (598) la FFE l ecrit « EUREXPO » (le lieu) : enregistre tel quel, demande de Blandine */ if ((/\bd[e\u00e9]?pt\b|d[e\u00e9]partemental/.test(tT)) && !(/\breg\b|r[e\u00e9]gional/.test(tT))) return 0; if (/championnat|\bchpt?\b|des territoires/.test(tT)) return 1; return 0; }
    function poidsNiveau(f) { var eN = (f.ep || "").toLowerCase(); if (/\u00e9lite|elite/.test(eN)) return 5; var mN = eN.match(/\b([1-4])\b/); return mN ? (5 - Number(mN[1])) : 0; }
    function jetonFort(f) { var ts = String(f.nom || "").toLowerCase().replace(/[^a-z\u00e0-\u00ff ]/g, "").split(/\s+/).filter(function (w) { return w.length > 5; }).sort(function (a, b) { return b.length - a.length; }); return (f.an || "") + "|" + (ts[0] || String(f.nom || "").toLowerCase()); }
    function estPrepaF(f) { return /pr[ée]pa/i.test(String(f && f.ep || "")); }
    function triFort(a, b) { return ((estPrepaF(a) ? 1 : 0) - (estPrepaF(b) ? 1 : 0)) || (poidsTitre(b) - poidsTitre(a)) || ((a.pl === 1 ? 0 : 1) - (b.pl === 1 ? 0 : 1)) || ((b.part || 0) - (a.part || 0)) || (poidsNiveau(b) - poidsNiveau(a)) || ((a.pl || 99) - (b.pl || 99)); } /* (596) a titre egal, une VICTOIRE passe avant un placement, puis les partants */ /* (594) Blandine, option B : les PARTANTS passent avant le niveau d epreuve (avant : niveau puis partants) — un 1er sur 60 en Poney 2 remonte devant un 1er sur 12 en Poney 1 */
    var tousR = (resDb || []).filter(function (r) { return r && (voirMasques || r.visible !== false) && (r.place != null || r.classement); }).map(function (r) {
      var mP = String(r.classement || "").match(/^\s*(\d+)/);
      return { id: r.id, pl: (r.place != null && r.place !== "") ? Number(r.place) : (mP ? Number(mP[1]) : null), part: r.partants ? Number(r.partants) : null, nom: r.concours || "", ep: r.epreuve || "", cav: r.cavalier || "", d: String(r.date_epreuve || ""), an: String(r.date_epreuve || r.annee || "").slice(0, 4), ff: (r.fort_force === true), fx: (r.fort_exclu === true) };
    }).filter(function (f) { return f.pl != null; });
    try { ((c && c.palmares) || []).forEach(function (rJ) { if (!rJ || !rJ.event) return; var mR = String(rJ.rang || "").match(/^\s*(\d+)/); var plJ = mR ? Number(mR[1]) : null; if (plJ == null) return; var dsJ = String(rJ.ds || ""); var mC = dsJ.match(/avec\s+(.+)$/i); tousR.push({ pl: plJ, part: null, nom: String(rJ.event || ""), ep: dsJ.split("·")[0].trim(), cav: (mC ? mC[1].trim() : ""), d: "", an: String(rJ.annee || "").slice(0, 4) }); }); } catch (eFp) { }
    function etatF(fE) { var loc = (fE && fE.id && fortsLocal[fE.id]) || null; return { ff: loc ? !!loc.ff : !!(fE && fE.ff), fx: loc ? !!loc.fx : !!(fE && fE.fx) }; }
    var forcesR = tousR.filter(function (f) { return f.id && etatF(f).ff; }).slice().sort(triFort);
    function libreR(f) { var eL = etatF(f); return !eL.fx && !eL.ff; }
    var vicsR = tousR.filter(function (f) { return f.pl === 1 && libreR(f); }).slice().sort(triFort);
    if (forcesR.length + vicsR.length < 3) vicsR = vicsR.concat(tousR.filter(function (f) { return f.pl > 1 && f.pl <= 3 && libreR(f); }).slice().sort(triFort));
    vicsR = forcesR.concat(vicsR);
    var fortsR = [], vusR = {};
    vicsR.forEach(function (fV) { if (fortsR.length >= 3) return; var jV = jetonFort(fV) + "|" + String(fV.cav || "").toLowerCase(); if (vusR[jV]) return; vusR[jV] = 1; fortsR.push(fV); });
    if (!fortsR.length) fortsR = tousR.slice().sort(function (a, b) { return String(b.d || b.an).localeCompare(String(a.d || a.an)); }).slice(0, 3);
    function placeTxt(p) {
      if (lgV === "en") { var s = (p % 100 >= 11 && p % 100 <= 13) ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[p % 10] || "th"); return p + s; }
      if (lgV === "es" || lgV === "it") return p + "º";
      if (lgV === "de") return p + ".";
      if (lgV === "ja") return p + "位";
      if (lgV === "zh") return "第" + p + "名";
      if (lgV === "nl") return p + "e";
      if (lgV === "pt") return p + "º";
      if (lgV === "sv") return (p + ((p % 10 === 1 || p % 10 === 2) && p % 100 !== 11 && p % 100 !== 12 ? ":a" : ":e"));
      if (lgV === "ru") return (p + "-\u0439");
      if (lgV === "pl") return (p + ".");
      if (lgV === "ko") return (p + "\uc704");
      if (lgV === "ar") return "المركز " + p;
      return p === 1 ? "1er" : (p + "e");
    }
    function dateR(f) { var m = String(f.d || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (m) { try { return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(lgV === "ar" ? "ar" : lgV, { day: "numeric", month: "long", year: "numeric" }); } catch (eD) { } } return f.an || ""; }
    var peutImpR = !!(chevalDyn && moi && (chevalDyn.ownerId === moi.id || estLieFiche || estModerateurHype(moi) || memeEcurieCh));
    var peutAjR = !!peutSaisirResultat;
    var actionsR = (peutImpR || peutAjR) ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: (D || L) ? "flex-start" : "center", marginTop: 16 } },
      peutImpR ? capsule(T("Importer r\u00e9sultats FFE", "Import FFE results", "Importar resultados FFE", "Importa risultati FFE", "FFE\u6210\u7e3e\u3092\u53d6\u308a\u8fbc\u3080", "FFE-Ergebnisse importieren", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0646\u062a\u0627\u0626\u062c FFE", "导入 FFE 成绩", "FFE-resultaten importeren", "Importar resultados da FFE", "Importera FFE-resultat", "Импортировать результаты FFE", "Importuj wyniki FFE", "FFE 결과 가져오기"), function () { ouvrirImportFFE(); }, true) : null,
      peutAjR ? capsule(T("Ajouter un résultat", "Add a result", "Añadir un resultado", "Aggiungi un risultato", "結果を追加", "Ein Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가") + "  +", function () { ouvrirAjoutResultat(); }) : null) : null;
    function carteR(f, i) {
      var sur = (chevalDyn && chevalDyn.moments_forts_medias && chevalDyn.moments_forts_medias[jetonFort(f)]) || null;
      var phR = (sur && sur.type !== "video" && sur.url) ? sur.url : ((chevalDyn && chevalDyn.photo_palmares) || (typeof IMG_LABAULE !== "undefined" ? IMG_LABAULE : "") || photoCh || "");   /* (1160) plus la photo du cheval repetee : photo choisie, sinon photo de palmares, sinon l image « concours » de l appli */
      return h("div", { key: "v4f" + i, role: "button", onClick: function () { setPanneau("palmares"); }, style: Object.assign({}, carteSt, { overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: (D || L) ? "row" : "column", flex: (D || L) ? "initial" : "0 0 82%", scrollSnapAlign: "start", minHeight: D ? 220 : (L ? 190 : 0) }) },
        phR ? h("div", { style: { flex: (D || L) ? "0 0 50%" : "0 0 auto", height: (D || L) ? "auto" : 160, position: "relative" } }, h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(phR, 420, 320) : phR, alt: "", loading: "lazy", decoding: "async", style: { position: (D || L) ? "absolute" : "static", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } })) : null,
        h("div", { style: { padding: "14px 16px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" } },
          h("div", { style: { fontFamily: SERIF, fontSize: D ? 46 : (L ? 40 : 36), fontWeight: 500, color: "#E4D2AE", lineHeight: 1 } }, placeTxt(f.pl)),
          f.ep ? h("div", { style: { marginTop: 8, fontFamily: MO, fontSize: 13.5, fontWeight: 500, color: IV, lineHeight: 1.3, overflowWrap: "anywhere" } }, abrEpreuve(f.ep)) : null,
          f.nom ? h("div", { style: { marginTop: 4, fontFamily: MO, fontSize: 13, color: DX, lineHeight: 1.3, overflowWrap: "anywhere" } }, f.nom) : null,
          (dateR(f)) ? h("div", { style: { marginTop: 4, fontFamily: MO, fontSize: 11.5, color: "rgba(243,238,228,0.5)" } }, dateR(f)) : null));
    }
    var coupes = (c.flots && c.flots.length) ? h("div", { style: { display: "flex", gap: D ? 16 : 12, overflowX: "auto", padding: "4px 0 6px", marginTop: 24, borderTop: "1px solid rgba(201,166,107,0.12)", paddingTop: 18 } },
      c.flots.map(function (fl, iF) {
        return h("div", { key: "v4fl" + iF, role: "button", onClick: function () { try { if (fl.img && typeof setVisionneuse === "function") { setVisionneuseAlbumId(null); setVisionneuse(fl.img); } else setPanneau("palmares"); } catch (eFz) { setPanneau("palmares"); } },
          style: { flex: "0 0 auto", width: D ? 110 : (L ? 100 : 84) /* (1160) galerie secondaire */, cursor: "pointer", textAlign: "center", marginInlineStart: iF === 0 ? "auto" : 0, marginInlineEnd: iF === c.flots.length - 1 ? "auto" : 0 } },
          fl.img ? h("img", { src: fl.img, alt: fl.lab || "", loading: "lazy", style: { width: "100%", aspectRatio: "108 / 132", objectFit: "cover", borderRadius: 14, border: "1px solid rgba(217,181,108,0.45)", display: "block" } })
            : h("div", { style: { width: "100%", aspectRatio: "108 / 132", borderRadius: 14, border: "1px solid rgba(217,181,108,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, background: "radial-gradient(80% 60% at 50% 30%, rgba(217,181,108,0.2), rgba(6,7,9,0.9))" } }, fl.med === "1" ? "🏆" : "🏅"),
          fl.lab ? h("div", { style: { marginTop: 6, fontFamily: MO, fontSize: 10.5, lineHeight: 1.3, color: "rgba(243,238,228,0.75)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, fl.lab) : null);
      })) : null;
    var resultats = h("div", { style: Object.assign({}, carteSt, { margin: "0 " + pad + "px", padding: D ? "24px 26px" : "20px 18px" }) },
      titre(T("Principaux résultats", "Main results", "Resultados principales", "Risultati principali", "主な成績", "Wichtigste Ergebnisse", "أبرز النتائج", "主要成绩", "Belangrijkste resultaten", "Principais resultados", "Viktigaste resultat", "Главные результаты", "Najważniejsze wyniki", "주요 결과"),
        tousR.length ? T("Voir tous les résultats", "See all results", "Ver todos los resultados", "Vedi tutti i risultati", "すべての成績を見る", "Alle Ergebnisse ansehen", "عرض كل النتائج", "查看所有成绩", "Alle uitslagen bekijken", "Ver todos os resultados", "Visa alla resultat", "Смотреть все результаты", "Zobacz wszystkie wyniki", "모든 결과 보기") : null,
        function () { setPanneau("palmares"); }),
      fortsR.length ? ((D || L) ? h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + (D ? fortsR.length : Math.min(2, fortsR.length)) + ", minmax(0, 1fr))", gap: D ? 18 : 14 } }, fortsR.map(carteR))   /* (1160) cartes sur toute la largeur */
        : h("div", { style: { display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 4 } }, fortsR.map(carteR)))
        : h("div", { style: { display: "flex", alignItems: "center", gap: 18, flexDirection: (D || L) ? "row" : "column", textAlign: (D || L) ? "start" : "center", padding: "6px 0" } },
          h("svg", { viewBox: "0 0 64 64", width: 64, height: 64, fill: "none", stroke: CH, strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, h("path", { d: "M22 50c-6-8-6-20 2-30 4-5 10-7 14-6l-3 6c5 1 9 5 9 10 0 7-6 9-6 14M30 50h20" }), h("circle", { cx: 46, cy: 50, r: 6 })),
          h("div", { style: { minWidth: 0 } },
            h("div", { style: { fontFamily: SERIF, fontSize: D ? 24 : 21, color: IV } }, T("Aucun résultat pour le moment", "No results yet", "Aún no hay resultados", "Ancora nessun risultato", "まだ成績はありません", "Noch keine Ergebnisse", "لا توجد نتائج حاليًا", "暂时没有成绩", "Nog geen resultaten", "Nenhum resultado por enquanto", "Inga resultat ännu", "Пока нет результатов", "Na razie brak wyników", "아직 결과가 없어요")),
            h("div", { style: { marginTop: 6, fontFamily: MO, fontSize: 12.5, lineHeight: 1.5, color: DX } }, T("Les résultats de ce cheval n’ont pas encore été ajoutés.", "This horse’s results haven’t been added yet.", "Los resultados de este caballo aún no se han añadido.", "I risultati di questo cavallo non sono ancora stati aggiunti.", "この馬の成績はまだ追加されていません。", "Die Ergebnisse dieses Pferdes wurden noch nicht hinzugefügt.", "لم تُضف نتائج هذا الحصان بعد.", "这匹马的成绩还没有添加。", "De uitslagen van dit paard zijn nog niet toegevoegd.", "Os resultados deste cavalo ainda não foram adicionados.", "Den här hästens resultat har inte lagts till än.", "Результаты этой лошади пока не добавлены.", "Wyniki tego konia nie zostały jeszcze dodane.", "이 말의 결과는 아직 추가되지 않았어요.")))),
      actionsR,
      coupes);

    /* ── 7. DERNIERES PHOTOS / DERNIERES VIDEOS (aperçus ; les pages completes restent Photos et Videos) ── */
    var medV = v4Med || [];
    var estV = function (u) { try { return typeof estUrlVideo === "function" && estUrlVideo(u); } catch (eV) { return false; } };
    var phList = medV.filter(function (u) { return u && !estV(u); }).slice(0, 8);
    var viList = medV.filter(function (u) { return u && estV(u); }).slice(0, 8);
    function rangee(items, rendu) { return h("div", { style: { display: "grid", gridAutoFlow: "column", gridAutoColumns: D ? "calc((100% - 30px) / 4)" : (L ? "calc((100% - 30px) / 4)" : "42%"), gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 4 } }, items.map(rendu)); }
    var blocPhotos = h("div", { style: Object.assign({}, carteSt, { padding: D ? "22px 24px" : "18px 16px" }) },
      titre(T("Dernières photos", "Latest photos", "Últimas fotos", "Ultime foto", "最新の写真", "Neueste Fotos", "أحدث الصور", "最新照片", "Laatste foto's", "Últimas fotos", "Senaste bilderna", "Последние фото", "Najnowsze zdjęcia", "최근 사진"),
        phList.length ? T("Voir toutes les photos", "See all photos", "Ver todas las fotos", "Vedi tutte le foto", "すべての写真を見る", "Alle Fotos ansehen", "عرض كل الصور", "查看所有照片", "Alle foto's bekijken", "Ver todas as fotos", "Visa alla bilder", "Смотреть все фото", "Zobacz wszystkie zdjęcia", "사진 모두 보기") : null, function () { setPanneau("photos"); }),
      v4Med === null ? h("div", { style: { height: 110 } })
        : phList.length ? rangee(phList, function (u, i) { return h("div", { key: "v4p" + i, role: "button", onClick: function () { try { if (typeof setVisionneuse === "function") { setVisionneuseAlbumId(null); setVisionneuse(u); } else setPanneau("photos"); } catch (eVi) { setPanneau("photos"); } }, style: { scrollSnapAlign: "start", aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,166,107,0.22)", cursor: "pointer", background: "#0B1116" } }, h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(u, 420, 320) : u, alt: "", loading: "lazy", decoding: "async", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })); })
        : h("div", { role: "button", onClick: function () { setPanneau("photos"); }, style: { position: "relative", borderRadius: 14, overflow: "hidden", minHeight: 150 /* (1161) meme hauteur que l etat vide des videos */, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: 16, boxSizing: "border-box", background: "linear-gradient(180deg, rgba(5,8,11,0.1), rgba(5,8,11,0.85)), url('images/photos-vide-cheval.jpg') center / cover no-repeat" } },
          h("div", { style: { fontFamily: SERIF, fontSize: D ? 22 : 20, fontWeight: 600, color: IV, textAlign: "center", textShadow: "0 2px 12px rgba(0,0,0,0.8)" } }, T("Conserve tes moments les plus pr\u00e9cieux\u2026", "Keep your most precious moments\u2026", "Guarda tus momentos m\u00e1s preciados\u2026", "Conserva i tuoi momenti pi\u00f9 preziosi\u2026", "\u5927\u5207\u306a\u77ac\u9593\u3092\u6b8b\u305d\u3046\u2026", "Bewahre deine kostbarsten Momente\u2026", "\u0627\u062d\u062a\u0641\u0638\u064a \u0628\u0623\u062b\u0645\u0646 \u0644\u062d\u0638\u0627\u062a\u0643\u2026", "珍藏你最宝贵的瞬间…", "Bewaar je mooiste momenten…", "Guarde seus momentos mais preciosos…", "Spara dina käraste ögonblick…", "Сохрани свои самые дорогие моменты…", "Zachowaj swoje najcenniejsze chwile…", "가장 소중한 순간들을 간직하세요…")),
          h("div", { style: { marginTop: 10 } }, capsule(T("Partage ses grands moments ici", "Share its great moments here", "Comparte aqu\u00ed sus grandes momentos", "Condividi qui i suoi grandi momenti", "\u5927\u5207\u306a\u77ac\u9593\u3092\u3053\u3053\u3067\u30b7\u30a7\u30a2", "Teile hier seine gro\u00dfen Momente", "\u0634\u0627\u0631\u0643 \u0644\u062d\u0638\u0627\u062a\u0647 \u0627\u0644\u0643\u0628\u0631\u0649 \u0647\u0646\u0627", "在这里分享它的高光时刻", "Deel hier zijn grote momenten", "Compartilhe aqui os grandes momentos dele", "Dela de stora ögonblicken här", "Делись здесь своими лучшими моментами", "Dziel się tu jego wielkimi chwilami", "멋진 순간들을 여기서 공유해요"), function () { setPanneau("photos"); }))));
    var blocVideos = h("div", { style: Object.assign({}, carteSt, { padding: D ? "22px 24px" : "18px 16px" }) },
      titre(T("Dernières vidéos", "Latest videos", "Últimos vídeos", "Ultimi video", "最新の動画", "Neueste Videos", "أحدث الفيديوهات", "最新视频", "Laatste video's", "Últimos vídeos", "Senaste videorna", "Последние видео", "Najnowsze filmy", "최근 영상"),
        viList.length ? T("Voir toutes les vidéos", "See all videos", "Ver todos los vídeos", "Vedi tutti i video", "すべての動画を見る", "Alle Videos ansehen", "عرض كل الفيديوهات", "查看所有视频", "Alle video's bekijken", "Ver todos os vídeos", "Visa alla videor", "Смотреть все видео", "Zobacz wszystkie filmy", "영상 모두 보기") : null, function () { setPanneau("videos"); }),
      v4Med === null ? h("div", { style: { height: 110 } })
        : viList.length ? rangee(viList, function (u, i) { return h("div", { key: "v4v" + i, role: "button", onClick: function () { setPanneau("videos"); }, style: { position: "relative", scrollSnapAlign: "start", aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,166,107,0.22)", cursor: "pointer", background: "#0B1116" } },
            (typeof hypeMiniatureVideo === "function") ? hypeMiniatureVideo(u, { largeur: 420 }) : null,
            h("span", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(243,238,228,0.75)", background: "rgba(5,8,11,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 } }, h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: IV }, h("path", { d: "M8 5.5v13l11-6.5z" })))); })
        : h("div", { style: { minHeight: 150, boxSizing: "border-box", borderRadius: 14, border: "1px dashed rgba(201,166,107,0.28)", background: "radial-gradient(90% 80% at 50% 30%, rgba(201,166,107,0.06), rgba(5,8,11,0) 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 16, textAlign: "center" } },   /* (1161) etat vide compact, meme hauteur que celui des photos */
          h("div", { style: { fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: DX } }, T("Aucune vidéo pour le moment", "No videos yet", "Aún no hay vídeos", "Ancora nessun video", "まだ動画はありません", "Noch keine Videos", "لا توجد فيديوهات حاليًا", "暂时没有视频", "Nog geen video's", "Nenhum vídeo por enquanto", "Inga videor än", "Пока нет видео", "Na razie brak filmów", "아직 영상이 없어요")),
          capsule(T("Ajouter une vidéo", "Add a video", "Añadir un vídeo", "Aggiungi un video", "動画を追加", "Ein Video hinzufügen", "إضافة فيديو", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "영상 추가") + "  +", function () { setPanneau("videos"); })));
    var medias = h("div", { style: { display: "grid", gridTemplateColumns: D ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)", gap: D ? 22 : 16, margin: "0 " + pad + "px" } }, blocPhotos, blocVideos);

    /* ── 8. PARTAGER SA FICHE ── */
    var partage = h("div", { style: Object.assign({}, carteSt, { margin: "0 " + pad + "px", padding: D ? "22px 26px" : "18px 18px", display: "flex", flexDirection: (D || L) ? "row" : "column", alignItems: (D || L) ? "center" : "stretch", gap: 16 }) },
      h("div", { style: { flex: 1, minWidth: 0 } },
        h("div", { style: { fontFamily: SERIF, fontSize: D ? 26 : 22, fontWeight: 500, color: IV } }, T("Partager sa fiche", "Share this profile", "Compartir ficha", "Condividi la scheda", "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u5171\u6709", "Profil teilen", "\u0645\u0634\u0627\u0631\u0643\u0629 \u0635\u0641\u062d\u062a\u0647", "分享它的资料", "Deel je profiel", "Compartilhar sua ficha", "Dela profilen", "Поделиться карточкой", "Udostępnij jego profil", "프로필 공유하기")),
        h("div", { style: { marginTop: 4, fontFamily: MO, fontSize: 12.5, color: DX } }, T("Avec ton entra\u00eeneur, ton \u00e9curie ou tes proches.", "With your coach, stable or family.", "Con tu entrenador, cuadra o familia.", "Con il tuo istruttore, la scuderia o i tuoi cari.", "\u30b3\u30fc\u30c1\u3084\u5bb6\u65cf\u3068\u5171\u6709\u3002", "Mit deinem Trainer, deinem Stall oder deinen Nahestehenden.", "\u0645\u0639 \u0645\u062f\u0631\u0628\u0643 \u0623\u0648 \u0625\u0633\u0637\u0628\u0644\u0643 \u0623\u0648 \u0623\u062d\u0628\u0627\u0626\u0643.", "分享给你的教练、马厩或亲友。", "Met je trainer, je stal of je naasten.", "Com seu treinador, sua cocheira ou seus familiares.", "Med din tränare, ditt stall eller dina nära.", "С тренером, конюшней или близкими.", "Twojemu trenerowi, stajni lub bliskim.", "코치, 마구간, 가족과 함께 나눠 보세요."))),
      capsule(T("G\u00e9n\u00e9rer un lien", "Generate a link", "Generar enlace", "Genera un link", "\u30ea\u30f3\u30af\u3092\u751f\u6210", "Link erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0631\u0627\u0628\u0637", "生成链接", "Link maken", "Gerar um link", "Skapa en länk", "Создать ссылку", "Wygeneruj link", "링크 만들기"), partagerFiche, true));

    var esp = D ? 34 : (L ? 28 : 24);
    function sp(k) { return h("div", { key: k, style: { height: esp } }); }
    return h("div", { className: "chv4", style: { position: "relative", background: "#05080B", paddingBottom: D ? 30 : 0 /* (1156) plus de marges cumulees sous la fin de page : seul le cadre de l appli garde la place de la barre du bas */, color: IV } },
      hero, raccourcis, sp("s1"), blocAI, sp("s2"), origines, bandeauIpo ? sp("s3") : null, bandeauIpo, sp("s4"), resultats, sp("s5"), medias, sp("s6"), partage,
      finPageCh());
  }

  return h("div", { className: "chv chvr" + (largeCh ? " chvL" : "") + (menuCh ? " chvD" : "") + (nouvV4 ? " chvN" : "") /* 15/10 (1149) fiche sur tablette (chvL, des 768 px) et ordinateur (chvD, des 1024 px) */, style: { "--teinte": teinte, position: "relative", zIndex: 0, background: "#060709" } },
    null /* 13/10 (1077) Blandine : « si on doit passer en fond de page normal, utilise la presentation de fond de page de la v3 » : plus d image de fond (images/FOND_SANTE.webp) sous la fiche, le noir uni de l accueil / de la V3 (#060709), porte par .chv. La photo du cheval du haut se fond dedans. */,
    h("style", { dangerouslySetInnerHTML: { __html: ECHV_CSS } }),
    h("style", { dangerouslySetInnerHTML: { __html: ECHV_R_CSS } }),
    largeCh ? h("style", { dangerouslySetInnerHTML: { __html: ECHV_L_CSS } }) : null,   /* 15/10 (1149) mise en page grand ecran (iPhone inchange) */
    nouvV4 ? h("style", { dangerouslySetInnerHTML: { __html: ".chvN>.app,.chvN>#chapPerf{display:none!important}.chvN{padding-bottom:0!important}" } }) : null,   /* 15/10 (1153) ancienne mise en page masquee sous la nouvelle */
    nouvV4 ? ficheV4() : null,
    h("div", { className: "app", style: { background: "transparent" } /* (975) le fond est porte par .chv (voir plus haut) */ },

      /* ═══════════════════════════════════════════════════════════════════
         22/08 — LE BANDEAU « A LA PORTE ».
         Un cheval en attente disparait de tous les ecrans, mais sa fiche
         reste ouvrable par un lien deja partage. Plutot que de la fermer,
         decision de Blandine : elle s ouvre, et dit ou en est le cheval.
         Le bandeau n apparait QUE pour la proprietaire — personne d autre
         n a a savoir qu un cheval a ete retire.
         ═══════════════════════════════════════════════════════════════════ */
      (function () {
        if (!c || !c.supprime_le || !c.dbId) return null;
        if (!(moi && chevalDyn && chevalDyn.ownerId === moi.id)) return null;
        var petitP = String(c.nom || "").trim().split(/\s+/)[0] || (c.nom || "");
        return h("div", { style: { margin: "0 0 2px", padding: "16px 18px 15px", background: "linear-gradient(168deg, rgba(20,24,28,0.97), rgba(9,11,14,0.99))", borderBottom: "1px solid rgba(232,200,135,0.24)" } },
          h("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: "0.34em", textTransform: "uppercase", color: "#E8C887", textAlign: "center", opacity: 0.9, fontFamily: "'Montserrat', sans-serif" } },
            tr({ fr: "\u00c0 la porte de l'\u00e9curie", en: "At the stable gate", es: "A la puerta de la cuadra", it: "Alla porta della scuderia", ja: "\u53a9\u820e\u306e\u9580\u306e\u305d\u3070\u3067", de: "Am Stalltor", ar: "\u0639\u0646\u062f \u0628\u0627\u0628 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", zh: "在马厩门口", nl: "Bij de staldeur", pt: "No portão da cocheira", sv: "Vid stallporten", ru: "У ворот конюшни", pl: "Przed drzwiami stajni", ko: "마구간 문 앞에서" })),
          h("div", { style: { fontSize: 12.5, lineHeight: 1.65, color: "#828C96", textAlign: "center", margin: "10px 6px 0", fontFamily: "'Montserrat', sans-serif" } },
            tr({ fr: petitP + " t'attendra 30 jours \u00e0 la porte de l'\u00e9curie, si tu changes d'avis.", en: petitP + " will wait 30 days at the stable gate, if you change your mind.", es: petitP + " te esperar\u00e1 30 d\u00edas a la puerta de la cuadra, por si cambias de opini\u00f3n.", it: petitP + " ti aspetter\u00e0 30 giorni alla porta della scuderia, se cambi idea.", ja: petitP + " \u306f\u53a9\u820e\u306e\u9580\u306e\u305d\u3070\u3067 30 \u65e5\u9593\u5f85\u3063\u3066\u3044\u307e\u3059\u3002", de: petitP + " wartet 30 Tage am Stalltor, falls du es dir anders \u00fcberlegst.", ar: petitP + " \u0633\u064a\u0646\u062a\u0638\u0631\u0643 30 \u064a\u0648\u0645\u0627 \u0639\u0646\u062f \u0628\u0627\u0628 \u0627\u0644\u0625\u0633\u0637\u0628\u0644\u060c \u0625\u0646 \u063a\u064a\u0631\u062a \u0631\u0623\u064a\u0643.", zh: (petitP + " 会在马厩门口等你 30 天，万一你改变主意。"), nl: (petitP + " wacht 30 dagen bij de staldeur, voor het geval je bedenkt."), pt: (petitP + " esperará 30 dias no portão da cocheira, caso você mude de ideia."), sv: (petitP + " väntar på dig i 30 dagar vid stallporten, om du ändrar dig."), ru: (petitP + " будет ждать тебя 30 дней у дверей конюшни, если ты передумаешь."), pl: (petitP + " będzie na ciebie czekać 30 dni przy bramie stajni, jeśli zmienisz zdanie."), ko: (petitP + "은(는) 마음이 바뀔 때를 위해 30일 동안 마구간 문 앞에서 기다려 줄 거예요.") })),
          h("button", { disabled: !!portOccupe, onClick: function () {
              if (portOccupe) return;
              setPortOccupe(true); setPortPlein(false);
              (async function () {
                /* la place du plan gratuit : meme regle que dans Mon compte */
                /* 18/10 (soir) — BUILD C : gratuit 2, Premium 9, exceptions comprises (comme le serveur). */
                if (typeof mesChevaux === "function") {
                  var rPl2 = null;
                  try { rPl2 = await mesChevaux(); } catch (ePl2) { rPl2 = null; }
                  var uPl2 = null; try { uPl2 = await utilisateurActuel(); } catch (eUp2) { }
                  var nPl2 = (rPl2 && rPl2.data) ? rPl2.data.length : 0;
                  if (!ctx.premium && rPl2 && rPl2.data && nPl2 >= quotaGratuit(uPl2 && uPl2.id)) { setPortOccupe(false); setPortPlein(true); return; }
                  if (ctx.premium && rPl2 && rPl2.data && nPl2 >= quotaPremiumChevaux(uPl2)) { setPortOccupe(false); alerteQuotaPremiumChevaux(); return; }
                }
                var rP = null;
                try { rP = await retrouverCheval(c.dbId); } catch (ePb) { rP = { error: String(ePb) }; }
                setPortOccupe(false);
                if (rP && rP.error) return;
                setChevalDyn(function (pv) { return Object.assign({}, pv || {}, { supprime_le: null }); });
              })();
            }, style: { display: "block", width: "100%", maxWidth: 300, margin: "14px auto 0", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", padding: "12px 16px", borderRadius: 999, cursor: portOccupe ? "default" : "pointer", background: "rgba(127,163,173,0.07)", border: "1px solid rgba(127,163,173,0.5)", color: "#CFE3E8", opacity: portOccupe ? 0.55 : 1 } },
            portOccupe ? "\u2026" : tr({ fr: "Retrouver " + petitP, en: "Bring " + petitP + " back", es: "Recuperar a " + petitP, it: "Ritrovare " + petitP, ja: petitP + " \u3092\u8fce\u3048\u306b\u884c\u304f", de: petitP + " zur\u00fcckholen", ar: "\u0627\u0633\u062a\u0639\u0627\u062f\u0629 " + petitP, zh: ("找回 " + petitP), nl: ("Terugvinden: " + petitP), pt: ("Reencontrar " + petitP), sv: ("Hämta tillbaka " + petitP), ru: ("Вернуть " + petitP), pl: ("Odzyskaj " + petitP), ko: (petitP + " 다시 찾기") })),
          portPlein ? h("div", { style: { marginTop: 14, padding: "16px 15px 14px", borderRadius: 16, border: "1px solid rgba(232,200,135,0.34)", background: "rgba(232,200,135,0.05)", maxWidth: 320, margin: "14px auto 0" } },
            h("img", { src: "mascotte-abo.webp", alt: "", onError: function (eIm2) { try { eIm2.target.style.display = "none"; } catch (eI3) { } }, style: { display: "block", width: 84, height: "auto", margin: "0 auto 10px", filter: "drop-shadow(0 6px 20px rgba(232,200,135,0.22))" } }),
            h("div", { style: { fontSize: 12.5, lineHeight: 1.65, color: "#D8CFBB", textAlign: "center", fontWeight: 600, fontFamily: "'Montserrat', sans-serif", marginBottom: 6 } },
              tr({ fr: "Attention, la place dans l'\u00e9curie semble avoir \u00e9t\u00e9 prise !", en: "Careful \u2014 the stall seems to have been taken!", es: "\u00a1Cuidado, la plaza en la cuadra parece ocupada!", it: "Attenzione, il posto in scuderia sembra essere stato preso!", ja: "\u6ce8\u610f\uff01\u53a9\u820e\u306e\u5834\u6240\u304c\u57cb\u307e\u3063\u3066\u3044\u308b\u3088\u3046\u3067\u3059\u3002", de: "Achtung \u2014 der Platz im Stall scheint belegt zu sein!", ar: "\u0627\u0646\u062a\u0628\u0647\u064a\u060c \u064a\u0628\u062f\u0648 \u0623\u0646 \u0627\u0644\u0645\u0643\u0627\u0646 \u0641\u064a \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0642\u062f \u0623\u062e\u0630!", zh: "注意，马厩里的位置好像已经被占了！", nl: "Let op, de plek in de stal lijkt bezet te zijn!", pt: "Atenção, a baia na cocheira parece ter sido ocupada!", sv: "Se upp, platsen i stallet verkar ha tagits!", ru: "Осторожно, место в конюшне, похоже, занято!", pl: "Uwaga, miejsce w stajni wygląda na zajęte!", ko: "주의, 마구간 자리가 이미 찬 것 같아요!" })),
            h("div", { style: { fontSize: 12, lineHeight: 1.65, color: "#C6BEA9", textAlign: "center", fontFamily: "'Montserrat', sans-serif" } },
              tr({ fr: "Retire le cheval qui s'y trouve, ou agrandis ton \u00e9curie pour pouvoir en accueillir plusieurs.", en: "Take out the horse inside, or make your stable bigger to welcome several at once.", es: "Retira el caballo que est\u00e1 dentro, o agranda tu cuadra para poder acoger a varios.", it: "Togli il cavallo che c'\u00e8, oppure ingrandisci la scuderia per accoglierne pi\u00f9 di uno.", ja: "\u4eca\u3044\u308b\u99ac\u3092\u5916\u3059\u304b\u3001\u53a9\u820e\u3092\u5e83\u3052\u3066\u4f55\u982d\u3067\u3082\u8fce\u3048\u3089\u308c\u308b\u3088\u3046\u306b\u3057\u307e\u3057\u3087\u3046\u3002", de: "Nimm das Pferd heraus, das drin steht, oder vergr\u00f6\u00dfere deinen Stall, um mehrere aufzunehmen.", ar: "\u0623\u0632\u064a\u0644\u064a \u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f \u0641\u064a\u0647\u060c \u0623\u0648 \u0648\u0633\u0639\u064a \u0625\u0633\u0637\u0628\u0644\u0643 \u0644\u0627\u0633\u062a\u0642\u0628\u0627\u0644 \u0639\u062f\u0629 \u062e\u064a\u0648\u0644.", zh: "请把占着位置的马移走，或者扩大你的马厩，这样就能容纳更多马。", nl: "Haal het paard weg dat er nu staat, of maak je stal groter zodat er meerdere paarden in kunnen.", pt: "Tire o cavalo que está lá ou aumente sua cocheira para poder receber vários.", sv: "Ta bort hästen som står där, eller gör ditt stall större så att flera får plats.", ru: "Убери из него лошадь или расширь свою конюшню, чтобы в ней помещалось несколько.", pl: "Usuń konia, który tam stoi, lub powiększ swoją stajnię, aby pomieścić ich więcej.", ko: "그 자리에 있는 말을 빼거나, 마구간을 넓혀서 여러 마리를 들이세요." })),
            h("button", { onClick: function () { setEcran("premium"); }, style: { display: "block", width: "100%", maxWidth: 260, margin: "13px auto 0", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(232,200,135,0.6)", background: "none", color: "#F0D48A", fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } },
              tr({ fr: "Agrandir mon \u00e9curie", en: "Make my stable bigger", es: "Agrandar mi cuadra", it: "Ingrandire la mia scuderia", ja: "\u53a9\u820e\u3092\u5e83\u3052\u308b", de: "Meinen Stall vergr\u00f6\u00dfern", ar: "\u062a\u0648\u0633\u064a\u0639 \u0625\u0633\u0637\u0628\u0644\u064a", zh: "扩大我的马厩", nl: "Mijn stal vergroten", pt: "Aumentar minha cocheira", sv: "Gör mitt stall större", ru: "Расширить мою конюшню", pl: "Powiększ moją stajnię", ko: "내 마구간 넓히기" }))) : null);
      })(),

      /* 10/10 (901) Blandine : le haut de la fiche reprend la DIMENSION, le design et le PLACEMENT de la video de l accueil :
         photo centree, entiere, hauteur max 66 % de l ecran, sur le fond de la page (plus de boite noire « studio »), fondu en bas ;
         le cadre colore (double filet) et le halo de couleur sont retires. */
      /* 12/10 (1002) Blandine : « le hero et le nom des chevaux, reproduis ce qu on a sur toutes ses pages video, photo etc » :
         le haut de la fiche prend EXACTEMENT le hero des pages Histoire / Photos / Videos / Resultats (et Sante) : photo pleine
         largeur fondue dans le noir a gauche, petit titre champagne espace (race · age · discipline), nom en Cormorant en grand
         (le surnom d abord, comme avant ; l affixe « de ... » dessous ; le nom officiel en petit si un surnom s affiche).
         Le nom ne se repete plus sous la photo ; la ligne de l ecurie et le reste ne changent pas. Halo du 960 retire avec
         l ancienne photo centree (les pages Photos/Videos n en ont pas). */
      (function () {
        var rtlH = false; try { rtlH = document.documentElement.dir === "rtl"; } catch (eR) { }
        var nomOffiH = String(c.nom || "");
        var surnomH = ""; try { surnomH = String((surnomPerso || (chevalDyn && chevalDyn.alias) || "")).trim(); } catch (eSn) { surnomH = ""; }
        var nmH = surnomH || nomOffiH;
        var montrerOffiH = !!(surnomH && surnomH.toLowerCase() !== nomOffiH.toLowerCase());
        var mSpH = nmH.match(/^(.*?)\s+(de\s.+|d\'.+|du\s.+|des\s.+)$/i);
        var courtH = mSpH ? mSpH[1] : nmH, affixeH = mSpH ? mSpH[2] : "";
        var lgN = courtH.length;
        var tailleNom = (lgN <= 10 ? 40 : (lgN <= 16 ? 34 : (lgN <= 24 ? 29 : 25))) * (largeCh ? 1.4 : 1);
        var eb = (function () {   /* 13/10 (1080) Blandine : « sous le nom il n y a plus rien… adapte ce qui est ecrit dessous a la v3 » : race · sexe · annee de naissance, comme la V3 (plus l age : il reste dans la carte Origines) */
          try {
            var ogE = c.origines || {};
            var raceE = String((chevalDyn && chevalDyn.race) || c.race || (String(c.info || "").split("\u00b7").map(function (x) { return x.trim(); }).filter(function (x) { return x && !/^\d+\s*ans?\b/i.test(x); })[0]) || "").trim();
            var sxE = { hongre: T("Hongre", "Gelding", "Castrado", "Castrone", "せん馬", "Wallach", "مخصي", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마"), jument: T("Jument", "Mare", "Yegua", "Giumenta", "牝馬", "Stute", "فرس", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말"), entier: T("Entier", "Stallion", "Entero", "Stallone", "牡馬", "Hengst", "فحل", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마") }[String(ogE.sexe || "").toLowerCase().trim()] || "";
            var anE = (String(ogE.naissance || "").match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/) || [])[1] || "";   /* (1081) « 19/04/2002 » comme « 2002-04-19 » */
            return [raceE, sxE, anE].filter(Boolean).join("  \u00b7  ");
          } catch (eEb) { return ""; }
        })();
        var hPhotoH = largeCh ? (menuCh ? "438px" : "358px") /* 29/10 : +58 px (photo descendue sous la ligne des boutons, comme Histoire / Photos) */ : "calc(env(safe-area-inset-top) + 360px)";   /* 13/10 (1072) hauteur de la photo seule */
        return h("header", { className: "hero", style: { position: "relative", background: "transparent", padding: 0, height: largeCh ? ("calc(" + hPhotoH + " + 92px)") : "calc(env(safe-area-inset-top) + 360px + 84px)" /* (1072) photo + bande du titre dessous */, minHeight: 0, overflow: "hidden", marginBottom: 4 } },
          /* 12/10 (1066) Blandine : « applique le meme systeme de hero que la V2 » et « descends les titres plus bas qu ils
             n empietent pas trop sur la photo ». Comme la V2 (736/742/751/757) : photo sur TOUTE la largeur, cadree sur la tete,
             haut legerement assombri (lisibilite des boutons), bas qui rejoint le fond, fondu lateral cote texte ; nom en bas,
             plus petit, avec la ligne « race · age » dessous ; titres descendus au ras du bas de la photo. */
          /* le tout se fond vers le bas dans le fond de la page (qui n est pas uni) : un seul masque sur photo + voiles */
          h("div", { "aria-hidden": "true", style: { position: "absolute", top: 0, left: 0, right: 0, height: hPhotoH /* (1072) la photo garde sa hauteur, le titre passe dessous */, pointerEvents: "none", WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 68%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(180deg, #000 0%, #000 68%, rgba(0,0,0,0) 100%)" } },
            /* 29/10 Blandine : « descends un peu les photos des chevaux » : meme cadre que les pages Histoire / Photos / Videos du cheval (photo a droite sous la ligne des boutons, fondue a gauche, en haut et en bas ; 84 % iPhone, 60 % tablette, 64 % ordinateur) */
            photoCh ? h("img", { src: photoCh, alt: "", style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 58px)", bottom: 0, insetInlineEnd: 0, width: menuCh ? "64%" : (largeCh ? "60%" : "84%"), height: "calc(100% - env(safe-area-inset-top) - 58px)", objectFit: "cover", objectPosition: "center 22%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtlH ? "270deg" : "90deg") + ", transparent 0%, #000 40%), linear-gradient(180deg, transparent 0%, #000 14%, #000 66%, transparent 100%)", maskImage: "linear-gradient(" + (rtlH ? "270deg" : "90deg") + ", transparent 0%, #000 40%), linear-gradient(180deg, transparent 0%, #000 14%, #000 66%, transparent 100%)", WebkitMaskComposite: "source-in", maskComposite: "intersect" } }) : null,
            h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0.4) 0%, rgba(6,7,9,0) 22%, rgba(6,7,9,0.08) 50%, rgba(6,7,9,0.45) 80%, rgba(6,7,9,0.6) 100%)" } }),
            null /* 29/10 : voile lateral retire, la photo ne touche plus le bord du titre */),
          /* 13/10 (1072) Blandine : « applique le titre de la v3 a la v1 » : le nom passe SOUS la photo, en capitales espacees
             (Cormorant), centre sur telephone ; race · age dessous en petites capitales, comme la V3. */
          h("div", { style: { position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, bottom: 0, zIndex: 2, padding: largeCh ? "0 32px 12px" : "0 18px 8px", textAlign: largeCh ? "start" : "center" } },
            h("div", { style: { minWidth: 0 } },
              h("style", null, "@keyframes chvTitreV3{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}"),   /* (1080) meme apparition que la V3 / l accueil */
              h("h1", { style: { margin: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: largeCh ? (nmH.length > 18 ? 34 : 42) : (nmH.length > 16 ? 25 : 32), fontWeight: 500, lineHeight: 1.08, letterSpacing: largeCh ? "0.14em" : "0.1em", textTransform: "uppercase", color: "#F3EEE4", overflowWrap: "anywhere", opacity: 0, animation: "chvTitreV3 1s ease 0.3s forwards" } }, nmH),
              eb ? h("div", { style: { marginTop: 10, fontFamily: "'Montserrat',sans-serif", fontSize: eb.length > 30 ? 10 : 11, fontWeight: 600, letterSpacing: rtlH ? "0.04em" : (eb.length > 30 ? "0.16em" : "0.29em") /* (1080) longue race : tient sur une ligne */, textTransform: "uppercase", color: "rgba(248,251,253,0.72)", opacity: 0, animation: "chvTitreV3 1s ease 0.6s forwards" } }, eb) : null,
              montrerOffiH ? h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A39D92", marginTop: 4 } }, nomOffiH) : null)),
        /* (1066) le menu ••• monte en haut a droite, en rond (voir la ligne du haut) */
        h("div", { className: "htop" },
          h("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, h("div", { className: "ic", role: "button", "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), onClick: function () { /* 01/10 (533) : retour a la page precedente ; sans page precedente, Mon cavalier comme avant */ if (ctx && ctx.peutReculer && typeof ctx.retourEcran === "function") ctx.retourEcran(); else setEcran("moncavalier"); }, style: { width: 44, height: 44, borderRadius: "50%", border: "1px solid #D6C4A1", background: "rgba(7,10,8,0.38)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", boxSizing: "border-box" /* (1066) rond champagne, comme la V2 */ } }, h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: rtlH ? "scaleX(-1)" : "none" } }, h("path", { d: "M15 5l-7 7 7 7" })))),
          h("div", { className: "r", style: { display: "flex", alignItems: "center", gap: 8 } },
            h(SelecteurLangue, { compact: true }),
            h("div", { role: "button", "aria-label": T("Menu de la fiche", "Card menu", "Men\u00fa", "Menu", "\u30e1\u30cb\u30e5\u30fc", "Men\u00fc", "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0635\u0641\u062d\u0629", "资料菜单", "Menu van de pagina", "Menu da ficha", "Sidans meny", "Меню карточки", "Menu karty", "프로필 메뉴"), onClick: function () { setMenuFiche(true); }, style: { width: 44, height: 44, borderRadius: "50%", border: "1px solid #D6C4A1", background: "rgba(7,10,8,0.38)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", boxSizing: "border-box" } },   /* (1066) menu de la fiche, en haut a droite (V2) */
              h("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "#D6C4A1" }, h("circle", { cx: 6, cy: 12, r: 1.6 }), h("circle", { cx: 12, cy: 12, r: 1.6 }), h("circle", { cx: 18, cy: 12, r: 1.6 }))))),
        null,
        null /* 31/07 : titres sortis de la photo (decision Blandine) */,
        null);
      })(),

      h("div", { className: "scroll" },
        /* 13/10 (1081) bouton sous le nom : meme geste et memes droits qu avant (peutLierFiche / basculerLienFiche), habille comme la V2
           (capsule a contour champagne, coeur) ; masque sur la page Histoire comme avant. */
        (!peutLierFiche() || panneau === "souvenirs") ? null : h("div", { style: { display: "flex", justifyContent: "center", margin: "6px 16px 2px" } },
          h("button", { type: "button", onClick: function () { basculerLienFiche(); }, "aria-pressed": estLieFiche ? "true" : "false", style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 36, padding: "6px 16px 6px 13px", borderRadius: 999, border: "1px solid #D6C4A1", background: estLieFiche ? "rgba(214,196,161,0.12)" : "rgba(6,7,9,0.35)", color: "#DCCBAA", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, lineHeight: 1.1, cursor: "pointer" } },
            h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: estLieFiche ? "#D6C4A1" : "none", stroke: "#D6C4A1", strokeWidth: 1.5, strokeLinejoin: "round", style: { flexShrink: 0 } }, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" })),
            estLieFiche ? T("Retirer de mes chevaux", "Remove from my horses", "Quitar de mis caballos", "Rimuovi dai miei cavalli", "マイ馬から外す", "Aus meinen Pferden entfernen", "إزالة من خيولي", "从我的马中移除", "Verwijderen uit mijn paarden", "Remover dos meus cavalos", "Ta bort från mina hästar", "Убрать из моих лошадей", "Usuń z moich koni", "내 말에서 빼기")
                        : T("Ajouter à mes chevaux", "Add to my horses", "Añadir a mis caballos", "Aggiungi ai miei cavalli", "マイ馬に追加", "Zu meinen Pferden hinzufügen", "إضافة إلى خيولي", "添加到我的马", "Toevoegen aan mijn paarden", "Adicionar aos meus cavalos", "Lägg till bland mina hästar", "Добавить к моим лошадям", "Dodaj do moich koni", "내 말에 추가"))),

        h("div", { style: { padding: "18px 16px 2px", display: "flex", alignItems: "flex-start", gap: 12 } }, /* 31/07 : bloc titre dedie sous la photo */
          (function () {
            var ogT2 = c.origines || {};
            var ixT2 = (ogT2.indices || []).filter(function (ix) { var v = parseFloat(String(ix[1]).replace("\u2212", "-").replace("+", "")); return isFinite(v) && v >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120) /* 15/10 (1154) Blandine : IPO seulement a partir de 120 */; })[0];
            var vT2 = ixT2 ? parseFloat(String(ixT2[1]).replace("\u2212", "-").replace("+", "")) : 0;
            var lblT2 = rareteIndice(vT2);
            /* 03/09 (Blandine) — LE SURNOM PASSE DEVANT.
               « Un alias est souvent le surnom sous lequel les cavaliers connaissent
               le cheval » : personne ne dit « Umea Borderie », tout le monde dit
               « Yum ». C'est donc le surnom qui s'affiche EN GRAND, et le nom
               officiel qui passe en dessous, en petit.
               Ordre de priorite : mon surnom perso (chevaux_histoires.surnom) >
               l'alias FFE commun (chevaux.alias) > le nom officiel.
               ⚠️ Le nom officiel n'est JAMAIS modifie : il sert de cle au verrou
               d'identite de l'import FFE, qui compare le telemat a la fiche avec
               une tolerance au bruit d'extraction (« CRUIBHI N » pour CRUIBHIN).
               On ne change que ce qui est AFFICHE. */
            var nomOffi2 = String(c.nom || "");
            var surnom2 = "";
            try { surnom2 = String((surnomPerso || (chevalDyn && chevalDyn.alias) || "")).trim(); } catch (eSn) { surnom2 = ""; }
            var nmC2 = surnom2 || nomOffi2;
            var montrerOffi2 = !!(surnom2 && surnom2.toLowerCase() !== nomOffi2.toLowerCase());
            var mSp2 = nmC2.match(/^(.*?)\s+(de\s.+|d\'.+|du\s.+|des\s.+)$/i);
            return h("div", { style: { minWidth: 0 } },
              null /* (1002) le nom (et l affixe, le nom officiel) est desormais dans le hero */,
              null /* (903) badge deplace a droite de l ecurie */,
          /* 02/09 (Blandine) — L ECURIE DU CHEVAL, SOUS SON NOM.
             ⚠️ Le selecteur vivait dans « Modifier la fiche », derriere le menu de
             la photo : « ce n est pas du tout intuitif ». Il remonte ici, visible
             sans rien ouvrir — on lit l ecurie d un coup d oeil, et on la change au
             meme endroit.
             ⚠️ Ne s affiche QUE pour la proprietaire du cheval, et seulement si le
             cavalier a PLUSIEURS ecuries : avec une seule, la question n a pas de
             sens et la ligne encombrerait la fiche.
             ⚠️ L echec d ecriture se DIT (lecon du .catch() vide du 01/09). */
          h("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", columnGap: 14, rowGap: 8, marginTop: 10 } }, /* (903) ecurie et Legende Hype sur la meme ligne */
          (function () {
            var proprioE = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
            var actuel = String((chevalDyn && chevalDyn.club) || "").trim();
            /* (903) Blandine : « la ligne de l ecurie devrait s afficher dans une fiche cheval, qu on sache d ou il vient ».
               Pour tout le monde : simple lecture (sans fleche). Le selecteur reste reserve a la proprietaire qui a plusieurs ecuries. */
            if (!proprioE || mesClubsFiche.length < 2) {
              if (!actuel) return null;
              return h("div", { style: { minWidth: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "#D9C7A3" } },
                h("span", { style: { fontSize: 11 } }, "\uD83D\uDCCD"), actuel);
            }
            return h("div", { style: { minWidth: 0 } },
              h("div", { role: "button", onClick: function () { setOuvrirEcu(!ouvrirEcu); setErreurClub(""); },
                style: { display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: actuel ? "#D9C7A3" : "#A39D92" } },
                h("span", { style: { fontSize: 11 } }, "\uD83D\uDCCD"),
                actuel || T("Aucune \u00e9curie", "No stable", "Sin cuadra", "Nessuna scuderia", "\u6240\u5c5e\u306a\u3057", "Kein Stall", "\u0628\u062f\u0648\u0646 \u0625\u0633\u0637\u0628\u0644", "没有马厩", "Geen stal", "Nenhuma cocheira", "Inget stall", "Нет конюшни", "Brak stajni", "마구간 없음"),
                h("span", { style: { fontSize: 9, opacity: .7 } }, ouvrirEcu ? "\u25b2" : "\u25bc")),
              ouvrirEcu ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } },
                mesClubsFiche.concat([""]).map(function (cl) {
                  var actC = (actuel === cl);
                  return h("div", { key: "ec" + (cl || "__aucune__"), role: "button",
                    onClick: function () {
                      setErreurClub("");
                      changerClubCheval(c.dbId, cl || null).then(function (rE) {
                        if (rE && rE.error) { setErreurClub(String(rE.error.message || rE.error)); return; }
                        try { setChevalDyn(function (av) { return Object.assign({}, av || {}, { club: cl || null }); }); } catch (eSd) { }
                        setOuvrirEcu(false);
                      });
                    },
                    style: { padding: "7px 13px", borderRadius: 999, cursor: "pointer",
                      border: "1px solid " + (actC ? "rgba(217,199,163,0.7)" : "rgba(255,255,255,0.14)"),
                      background: actC ? "rgba(217,199,163,0.14)" : "rgba(255,255,255,0.03)",
                      color: actC ? "#D9C7A3" : "rgba(243,238,228,0.7)",
                      fontSize: 11.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif" } },
                    cl || T("Aucune", "None", "Ninguna", "Nessuna", "\u306a\u3057", "Keine", "\u0644\u0627 \u0634\u064a\u0621", "无", "Geen", "Nenhuma", "Inget", "Нет", "Żadna", "없음"));
                })) : null,
              erreurClub ? h("div", { style: { marginTop: 6, fontSize: 11.5, color: "#FF6B6B", fontFamily: "'Montserrat',sans-serif" } }, erreurClub) : null);
          })(),
          lblT2 ? h("div", { style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 13px", borderRadius: 999, border: "1px solid " + tA(0.45), whiteSpace: "nowrap" } },
                h("b", { style: { color: teinteCl, fontWeight: 700, fontSize: 10.5, letterSpacing: "0.14em" } }, "\u2726 " + T("L\u00c9GENDE HYPE", "HYPE LEGEND", "LEYENDA HYPE", "LEGGENDA HYPE", "\u4f1d\u8aac", "HYPE-LEGENDE", "\u0623\u0633\u0637\u0648\u0631\u0629 HYPE", "HYPE 传奇", "HYPE-LEGENDE", "LENDA HYPE", "HYPE-LEGEND", "ЛЕГЕНДА HYPE", "LEGENDA HYPE", "HYPE 레전드")),
                null /* (903) « 1 sur 100 000 » retire du badge : deja dans le bandeau IPO */) : null));
          })(),

          /* 22/08 session 152 : trois points de 1,4 px sans etiquette — personne ne
   trouvait le menu, donc ni « Modifier » ni « Supprimer ». Blandine
   elle-meme cherchait ou effacer un cheval. On lui donne un cadre. */
          null /* (908) menu de la fiche deplace dans la photo, en bas a droite */),

        /* 31/07 : ligne de cles retiree — elle doublonnait l encart IPO/PFS juste dessous (constat Blandine) */

        null, /* 31/07 soir : barre de chapitres RETIREE (remplacee par les 3 cartes du haut, demande Blandine) */
        /* 13/10 (1076) Blandine : « mets la petite phrase de la v3 au dessus des cartes » (meme police manuscrite champagne que l accueil) */
        h("div", { key: "phraseV3", style: { margin: "26px 16px 0", textAlign: "center", color: "#DCCBAA", fontFamily: "'Parisienne','Cormorant Garamond',Georgia,cursive", fontSize: 22, lineHeight: 1.4, letterSpacing: ".2px" } },
          h("style", null, "@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');"),
          T("Chaque cheval a son histoire,", "Every horse has its story,", "Cada caballo tiene su historia,", "Ogni cavallo ha la sua storia,", "どの馬にも物語があり、", "Jedes Pferd hat seine Geschichte,", "لكل حصان قصته،", "每匹马都有自己的故事，", "Elk paard heeft zijn verhaal,", "Todo cavalo tem sua história,", "Varje häst har sin historia,", "У каждой лошади есть своя история,", "Każdy koń ma swoją historię,", "모든 말에게는 저마다의 이야기가 있어요,"),
          h("br", null),
          T("la sienne s’écrit ici.", "this one is written here.", "la suya se escribe aquí.", "la sua si scrive qui.", "その物語はここに綴られる。", "seine wird hier geschrieben.", "وقصته تُكتب هنا.", "它的故事就写在这里。", "het hare wordt hier geschreven.", "a dele é escrita aqui.", "den här skrivs här.", "её история пишется здесь.", "jego historia pisze się tutaj.", "그 이야기는 여기에서 쓰여요.")),
        /* (1076) « passe les 6 cartes au dessus » : la grille des 6 tuiles remonte AVANT la carte Origines */
        (function () { /* 31/07 soir : les 3 raccourcis remontent sous le badge, en grille compacte de 3 (demande Blandine) */
          var nbR = ((palmTous && palmTous.length) || 0) + ((c.flots && c.flots.length) || 0);
          function carteR(img3, ic3, ti3, cta3, act3, kR) {
            /* 10/10 (901) Blandine : « applique exactement le design des tuiles de l accueil, et leurs couleurs » (.acc2-tuile) :
               fond petrole #111B1F -> #0B1215, filet champagne 20 %, icone champagne sans rond, nom en Cormorant ivoire 14 px,
               plus de photo de fond ni de ligne « Voir → ». Memes actions qu avant (img3 / cta3 ne sont plus affiches). */
            var ferme3 = !act3;
            return h("div", { key: kR, role: ferme3 ? null : "button", onClick: act3 || null, style: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 68, padding: "9px 5px 8px", borderRadius: 16, border: "1px solid rgba(214,196,161,0.24)", background: "linear-gradient(165deg, rgba(17,27,31,0.55) 0%, rgba(11,18,21,0.42) 100%)" /* 13/10 (1088) Blandine : « passe les onglets en semi-transparents ombres » */, WebkitBackdropFilter: "none", color: "#F3EEE4", cursor: ferme3 ? "default" : "pointer", boxShadow: "0 8px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)" /* (1088) ombre portee */, opacity: ferme3 ? 0.5 : 1 } },
              h("span", { "aria-hidden": "true", style: { width: 27, height: 27, color: "#D6C4A1", display: "flex", alignItems: "center", justifyContent: "center" } },
                h("svg", { viewBox: "0 0 24 24", style: { width: 27, height: 27, display: "block", stroke: "#D6C4A1", fill: "none", strokeWidth: 1.51, strokeLinecap: "round", strokeLinejoin: "round" } }, ic3)),
              h("span", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 14, fontWeight: 600, lineHeight: 1.12, textAlign: "center", color: "#F3EEE4", maxWidth: "100%", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } }, ti3));
          }
          return h("div", { className: "rise chvRac" /* (1149) */, style: { animationDelay: ".05s", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "24px 16px 2px" } },   /* (1071) 32 -> 28 */   /* (901) espacement des tuiles de l accueil */ /* 13/09 (115) : marge du haut 18 -> 32 px, demande de Blandine (« laisse plus d espace entre le trait du bas de la carte Origines et les boutons ») */ /* 29/08 : passe de 3 a 6 cartes (demande Blandine) — Photos / Videos / Actualite ajoutees sur une 2e rangee, « Carriere » renommee « Performances » pour coller au libelle de l'onglet correspondant */
            carteR(photoCh, h("path", { d: "M12 20s-7-4.5-9-9c-1.2-2.8.6-6 3.7-6 2 0 3.4 1.2 4.3 2.6C12 6.2 13.4 5 15.4 5c3.1 0 4.9 3.2 3.7 6-2 4.5-9 9-9 9z", strokeLinejoin: "round" }),
              T("Histoire", "Story", "Historia", "Storia", "\u7269\u8a9e", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기"),
              T("Souvenirs", "Memories", "Recuerdos", "Ricordi", "\u601d\u3044\u51fa", "Erinnerungen", "\u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a", "回忆", "Herinneringen", "Lembranças", "Minnen", "Воспоминания", "Wspomnienia", "추억"),
              function () { setPanneau("souvenirs"); }, "rh"),
            carteR(IMG_LABAULE, h("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M12 13v4m-3 3h6" }),
              T("Performances", "Performances", "Rendimiento", "Prestazioni", "\u5b9f\u7e3e", "Leistungen", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적"),
              nbR ? (nbR + " " + T("r\u00e9s.", "res.", "res.", "ris.", "\u4ef6", "Erg.", "\u0646\u062a\u0627\u0626\u062c", "成绩", "res.", "res.", "res.", "рез.", "wyn.", "결과")) : T("Ouvrir", "Open", "Abrir", "Apri", "\u958b\u304f", "\u00d6ffnen", "\u0641\u062a\u062d", "打开", "Openen", "Abrir", "Öppna", "Открыть", "Otwórz", "열기"),
              function () { setPanneau("palmares"); }, "rc"),
            carteR(null, h("g", null, h("path", { d: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3.5a4.5 4.5 0 0 0 9 0V14" }), h("circle", { cx: 19, cy: 11.5, r: 2.2 })),
              T("Sant\u00e9", "Health", "Salud", "Salute", "\u5065\u5eb7", "Gesundheit", "\u0627\u0644\u0635\u062d\u0629", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강"),
              T("Soins", "Care", "Cuidados", "Cure", "\u30b1\u30a2", "Pflege", "\u0627\u0644\u0639\u0646\u0627\u064a\u0629", "护理", "Verzorging", "Cuidados", "Vård", "Уход", "Opieka", "케어"),
              /* 14/09 (129) : ouvre la vraie page Sante & soins DE CE CHEVAL. Le cheval vise
                 passe par window.__santeCheval, sur le modele de window.__agendaClub.
                 L ancien ecran « clinique » (image d apercu) n est plus atteint d ici ; il
                 reste en place, toujours ouvert par l encart Veto, et n a pas ete nettoye. */
              function () {
                try { window.__santeCheval = { id: (c && c.dbId) || id, nom: (c && c.nom) || "" }; } catch (eSc) { }
                setEcran("sante-cheval");
              }, "rs"),
            /* 29/08 : 2e rangee. Photos et Actualite ouvrent des panneaux qui n'existent
               pas encore (pages a construire) : elles pointent pour l'instant sur le
               panneau Souvenirs, le temps que les vraies pages soient faites. */
            carteR(photoCh, h("g", null, h("rect", { x: 3, y: 5, width: 18, height: 14, rx: 2.5 }), h("circle", { cx: 8.5, cy: 10, r: 1.6 }), h("path", { d: "M21 16l-5-5-4 4-2-2-4 4" })),
              T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"),
              T("Voir", "View", "Ver", "Vedi", "\u898b\u308b", "Ansehen", "\u0639\u0631\u0636", "查看", "Bekijken", "Ver", "Se", "Смотреть", "Zobacz", "보기"),
              function () { setPanneau("photos"); }, "rp"), /* 29/08 : pointe enfin sur sa vraie page */
            carteR(null, h("g", null, h("rect", { x: 3, y: 6, width: 12, height: 12, rx: 2.5 }), h("path", { d: "M15 10.5l6-3.5v10l-6-3.5z", strokeLinejoin: "round" })),
              T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"),
              (chVids && chVids.length) ? String(chVids.length) : T("Voir", "View", "Ver", "Vedi", "\u898b\u308b", "Ansehen", "\u0639\u0631\u0636", "查看", "Bekijken", "Ver", "Se", "Смотреть", "Zobacz", "보기"),
              function () { setPanneau("videos"); }, "rv"),
            carteR(null, h("g", null, h("path", { d: "M4 5h13a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5z", strokeLinejoin: "round" }), h("path", { d: "M7 9h7M7 12.5h7M7 16h4" })),
              T("Actualit\u00e9", "News", "Actualidad", "Attualit\u00e0", "\u30cb\u30e5\u30fc\u30b9", "Aktuelles", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"),
              T("Ouvrir", "Open", "Abrir", "Apri", "\u958b\u304f", "\u00d6ffnen", "\u0641\u062a\u062d", "打开", "Openen", "Abrir", "Öppna", "Открыть", "Otwórz", "열기"),
              function () { setPanneau("actualite"); }, "rn")); /* 14/09 (127) : la carte n est plus grisee, la page est ouverte */ /* 29/08 : carte grisee et non cliquable (demande Blandine) — la page existe deja (panneau "actualite") mais reste fermee le temps de decider qui publie et ce qu'est un post */
        })(),
        /* (1081) titre de section au-dessus de la carte, comme la V2 */
        h("h2", { key: "titreOrigV1", style: { margin: "40px 20px 14px" /* 13/10 (1093) ecart unique de 40 px entre les chapitres (mesure) */, fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 22, lineHeight: 1.2, color: "#F3EEE4" } }, T("Identité & origines", "Identity & bloodline", "Identidad y orígenes", "Identità e origini", "プロフィールと血統", "Identität & Herkunft", "الهوية والنسب", "身份与血统", "Identiteit & afstamming", "Identidade e origens", "Identitet & ursprung", "Данные и происхождение", "Tożsamość i pochodzenie", "기본 정보 & 혈통")),
        h("div", { id: "chvInfos", style: { perspective: 1200, margin: "0 16px 0" /* (1081) le titre porte l ecart */ } },   /* 13/10 (1071) bas 26 -> 0 : un seul ecart de 28 px entre les blocs */ /* (832) 22 -> 34 px au-dessus (Blandine : « un peu d espace au-dessus de l onglet des origines aussi ») */ /* 10/10 (823) Blandine : « un peu plus d espace en dessous de l encart des origines » (0 -> 26 px) */ /* 31/07 : espace sous le badge */ /* 31/07 : carte Origines qui se retourne (maquette validee) */
          h("div", { role: "button", onClick: function () { setOrigOuv(!origOuv); }, style: { position: "relative", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", transition: "transform .62s cubic-bezier(.2,.75,.25,1)", transform: origOuv ? "rotateY(180deg)" : "none", cursor: "pointer", height: origOuv ? "min(58svh, 520px)" : "auto" } }, /* 31/07 soir : overflow:hidden RETIRE — il aplatissait le preserve-3d (dos jamais affiche, face avant vue en miroir) */
            h("div", { style: { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", border: "1px solid rgba(214,196,161,0.42)", borderRadius: 18, background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)" /* (897) */, padding: "12px" /* (1081) comme la V2 */ } },
              (function () {
                /* 13/10 (1081) Blandine : « reduis la taille du bouton import et passe-le a droite de la photo, l onglet ne ressemble pas
                   a la V2 ». Recto au dessin de la V2 (photo a gauche, lignes a fine icone champagne, Cormorant ivoire) avec TOUTES les
                   infos de la V1 : age + naissance, sexe, race + robe + discipline, origines (pere x pere de mere, puis la mere), indice
                   (+ crayon de l indice), et l outil d import en petite capsule sous les lignes. Toucher la carte la retourne (inchange). */
                var ogB = c.origines || {};
                var pdB = ogB.pedigree || { pere: ogB.pere || null, mere: ogB.mere || null };
                var nomDe = function (x) { if (!x) return ""; if (typeof x === "string") return x; return String(x.nom || ""); };
                var pN = nomDe(pdB.pere), mN = nomDe(pdB.mere);
                var pmN = nomDe(pdB.mere && pdB.mere.pere) || nomDe(ogB.mere && ogB.mere.pere);
                var CHp = "#D6C4A1", IVp = "#F3EEE4", DXp = "rgba(243,238,228,0.62)";
                function icoR(type) {
                  var pI = { viewBox: "0 0 24 24", width: 21, height: 21, fill: "none", stroke: CHp, strokeWidth: 1.35, strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } };   /* 13/10 (1090) mesures exactes de la V2 */
                  if (type === "age") return h("svg", pI, h("rect", { x: 3.5, y: 5, width: 17, height: 15, rx: 2 }), h("path", { d: "M3.5 9.5h17M8 3v4M16 3v4" }));
                  if (type === "jument") return h("svg", pI, h("circle", { cx: 12, cy: 9, r: 5 }), h("path", { d: "M12 14v7M9 18h6" }));
                  if (type === "sexe") return h("svg", pI, h("circle", { cx: 10, cy: 14, r: 5 }), h("path", { d: "M13.6 10.4L20 4M15 4h5v5" }));
                  if (type === "race") return h("svg", pI, h("path", { d: "M14.2 7.3 16.1 3.3 17.7 7.4C18.2 8 18.6 9.2 19.1 10.3 19.9 13.4 20.3 17.5 20.5 21.5H13C12.8 20.2 12.3 19.1 11.3 18.3 10.2 17.5 8.8 17.7 6.9 17.7 5.6 17.7 4.7 17 4.6 15.9 4.5 14.4 5.6 13.2 7.2 12.4L14.2 7.3Z" }));
                  if (type === "ipo") return h("svg", pI, h("path", { d: "M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" }));
                  return h("svg", pI, h("circle", { cx: 9, cy: 12, r: 4.5 }), h("circle", { cx: 15, cy: 12, r: 4.5 }));
                }
                function ligneR(type, texte, details, extra) {
                  return h("div", { key: type, style: { display: "flex", alignItems: "flex-start", gap: 12, padding: "6px 0" /* (1090) = V2 */ } }, icoR(type),
                    h("div", { style: { minWidth: 0 } },
                      h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15.5, lineHeight: 1.25, color: IVp, overflowWrap: "anywhere" } }, texte, extra || null),   /* (1090) = V2 */
                      (details || []).filter(Boolean).map(function (dT, iD) { return h("div", { key: iD, style: { marginTop: 3, fontFamily: "'Montserrat',sans-serif", fontSize: 11, lineHeight: 1.28, color: DXp, overflowWrap: "break-word" } }, dT);   /* (1091) 11 px */ /* (1090) V2 : marge 3, interligne 1.28 */ })));
                }
                var lignes = [];
                try {
                  var partsI = String(c.info || "").split("·").map(function (x) { return x.trim(); }).filter(Boolean);
                  var aTxt = partsI.filter(function (x) { return /^\d+\s*ans?\b/i.test(x); })[0] || "";
                  var rTxt = partsI.filter(function (x) { return !/^\d+\s*ans?\b/i.test(x); })[0] || "";
                  var autresI = partsI.filter(function (x) { return x !== aTxt && x !== rTxt; });
                  var nsA = ogB.naissance ? hypeNaissanceAffichee(ogB.naissance, (ctx && ctx.langue) || "fr") : "";
                  if (!aTxt && ogB.naissance) {   /* (1081) age calcule depuis la naissance quand il n est pas saisi (ex. Webster : « 19/04/2002 ») */
                    var mN1 = String(ogB.naissance).match(/^(\d{4})-(\d{2})-(\d{2})/), mN2 = String(ogB.naissance).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/), mN3 = String(ogB.naissance).match(/^(\d{4})$/);
                    var yN = mN1 ? +mN1[1] : (mN2 ? +mN2[3] : (mN3 ? +mN3[1] : 0)), moN = mN1 ? +mN1[2] : (mN2 ? +mN2[2] : 0), jN = mN1 ? +mN1[3] : (mN2 ? +mN2[1] : 0);
                    if (yN) { var dN = new Date(), agN = dN.getFullYear() - yN; if (moN && ((dN.getMonth() + 1) < moN || ((dN.getMonth() + 1) === moN && dN.getDate() < jN))) agN--; if (agN >= 0 && agN < 60) aTxt = agN + " " + (agN <= 1 ? T("an", "year", "año", "anno", "歳", "Jahr", "سنة", "年", "jr", "ano", "år", "г.", "r.", "년") : T("ans", "years", "años", "anni", "歳", "Jahre", "سنوات", "岁", "jaar", "anos", "år", "лет", "lat", "세")); }
                  }
                  if (aTxt || nsA) lignes.push(ligneR("age", aTxt || nsA, [aTxt && nsA ? (T("né le ", "born ", "nacido el ", "nato il ", "", "geboren am ", "وُلد في ", "出生于 ", "geboren op ", "nascido em ", "född ", "родилась ", "ur. ", "출생: ") + nsA) : null]));
                  var sxK = String(ogB.sexe || "").toLowerCase().trim();
                  var sxL = { hongre: T("Hongre", "Gelding", "Castrado", "Castrone", "せん馬", "Wallach", "مخصي", "骟马", "Ruin", "Castrado", "Valack", "Мерин", "Wałach", "거세마"), jument: T("Jument", "Mare", "Yegua", "Giumenta", "牝馬", "Stute", "فرس", "母马", "Merrie", "Égua", "Sto", "Кобыла", "Klacz", "암말"), entier: T("Entier", "Stallion", "Entero", "Stallone", "牡馬", "Hengst", "فحل", "种公马", "Hengst", "Garanhão", "Hingst", "Жеребец", "Ogier", "종마") }[sxK];
                  if (sxL) lignes.push(ligneR(sxK === "jument" ? "jument" : "sexe", sxL));
                  var rAff = rTxt ? (hypeSigleOrigine(rTxt) ? ("(" + hypeSigleOrigine(rTxt) + ")") : rTxt) : "";
                  var detR = [ogB.robe ? String(ogB.robe) : "", autresI.join(" · ")].filter(Boolean).join(" · ");
                  if (rAff || detR) lignes.push(ligneR("race", rAff || detR, [rAff ? detR : null]));
                  lignes.push((pN || mN || pmN)
                    ? ligneR("orig", T("Origines", "Bloodline", "Orígenes", "Origini", "血統", "Herkunft", "النسب", "血统", "Afstamming", "Origens", "Ursprung", "Происхождение", "Pochodzenie", "혈통"),
                        [(pN || pmN) ? ((pN || "—") + (pmN ? " × " + pmN : "")) : null, mN ? (T("Mère : ", "Dam: ", "Madre: ", "Madre: ", "母：", "Mutter: ", "الأم: ", "母亲：", "Moeder: ", "Mãe: ", "Mor: ", "Мать: ", "Matka: ", "어머니: ") + mN) : null])
                    : ligneR("orig", T("Origines non renseignées", "Bloodline not provided", "Orígenes no indicados", "Origini non indicate", "血統は未登録", "Herkunft nicht angegeben", "النسب غير مُدخل", "血统未填写", "Afstamming niet ingevuld", "Origens não informadas", "Ursprung ej angivet", "Происхождение не указано", "Brak informacji o pochodzeniu", "혈통 정보 없음")));
                  var ixL = (ogB.indices || [])[0];
                  var monCh = !!(c.dbId && moi && chevalDyn && chevalDyn.ownerId === moi.id);
                  if (ixL && ixL[1] && parseFloat(String(ixL[1]).replace("\u2212", "-").replace("+", "")) >= 100 /* 15/10 (1155) Blandine : la ligne IPO s affiche des 100 (le bandeau, lui, des 120) */) lignes.push(ligneR("ipo", String(ixL[0]) + " " + String(ixL[1])));
                  /* 13/10 (1091) Blandine : « indice a renseigner avec un bouton a cote, on s attend a pouvoir le renseigner » : ligne retiree du recto ; explication au verso, sous le bouton d import */
                } catch (eLg) { }
                var peutOrigR = !!((!CHEVAUX_FICHE[id] || NOMS_MIGRES[id]) && chevalDyn && chevalDyn.dbId && c.dbId && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi) || gereClubCh));   /* (820) + moderatrice + responsable du club */
                var outilImport = peutOrigR ? h("div", { role: "button", "data-orig-import": "1", onClick: function (eIo) { try { if (eIo && eIo.stopPropagation) eIo.stopPropagation(); } catch (eIo2) { } ouvrirEditOrigines(); },
                    style: { marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, minHeight: 32, padding: "0 12px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.62)", background: "rgba(6,7,9,0.35)", color: "#DCCBAA", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.02em", fontFamily: "'Montserrat',sans-serif", cursor: "pointer", whiteSpace: "nowrap" } },
                    "⤓ " + T("Importer depuis une capture", "Import from a screenshot", "Importar desde una captura", "Importa da una schermata", "キャプチャから取り込む", "Aus Screenshot importieren", "استيراد من لقطة", "从截图导入", "Importeren vanaf een screenshot", "Importar de uma captura de tela", "Importera från en skärmdump", "Загрузить со скриншота", "Zaimportuj ze zrzutu ekranu", "캡처 화면으로 가져오기")) : null;
                return h("div", { style: { display: "flex", alignItems: "stretch", gap: 14, minHeight: 204, boxSizing: "border-box" } },   /* (1090) = V2 */
                  /* bouton rond de retournement, comme la V2 */
                  h("div", { "aria-hidden": "true", style: { position: "absolute", top: 10, insetInlineEnd: 10, width: 37, height: 37, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.7)", background: "rgba(7,10,8,0.7)", display: "flex", alignItems: "center", justifyContent: "center" } },
                    h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: CHp, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "M20 11a8 8 0 0 0-14.3-4.9L4 8" }), h("path", { d: "M4 4v4h4" }), h("path", { d: "M4 13a8 8 0 0 0 14.3 4.9L20 16" }), h("path", { d: "M20 20v-4h-4" }))),
                  photoCh ? h("div", { style: { position: "relative", flex: "0 0 43%", margin: "8px 0", borderRadius: 11, overflow: "hidden", background: "#0B0E0C" } },   /* 13/10 (1090) = V2 (43 %, 8 px haut et bas) */
                    h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(photoCh, 360, 440) : photoCh, alt: "", loading: "lazy", decoding: "async", onError: function (eIv) { try { if (eIv.target.dataset.r !== "1") { eIv.target.dataset.r = "1"; eIv.target.src = photoCh; } } catch (e0) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" } })) : null,
                  h("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4px 12px 4px 0" /* (1091) comme la V2 (centree) mais 12 px a droite au lieu de 34 : la 1re ligne (age) est courte et ne touche pas le bouton rond ; les origines tiennent sur une ligne */ } }, lignes, null /* 13/10 (1085) l import passe au verso, sous les origines (Blandine) */));
              })()),
            h("div", { style: { position: "absolute", inset: 0, transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", border: "1px solid " + tA(0.42), borderRadius: 18, background: "linear-gradient(165deg, rgba(18,22,27,0.97), rgba(7,9,12,0.99))", padding: "12px 12px", overflowY: "auto" } },

        (function () { var og = c.origines || {};
        var filtreIx = function (li) { return (li || []).filter(function (ix) { var vI = parseFloat(String(ix[1]).replace("\u2212", "-").replace("+", "")); return isFinite(vI) && vI >= 80; }); };
        var ixOK = filtreIx(og.indices), ixMereOK = og.mere ? filtreIx(og.mere.indices) : [];
        var vApt = ixOK.length ? parseFloat(String(ixOK[0][1]).replace("\u2212", "-").replace("+", "")) : 0;
        var lblApt = rareteIndice(vApt);
        return h("div", { className: "rise", style: { position: "relative", animationDelay: ".08s", margin: "0 16px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" } },


          /* 🟩 05/09 (Blandine : « je trouve pas l'outil, il serait où ? ») — BUG TROUVE : ce bouton
           ne s'affichait JAMAIS pour les 6 chevaux migres de fiches codees en dur vers la vraie
           base (dont Tully, NOMS_MIGRES) — la condition regardait CHEVAUX_FICHE[id] SANS jamais
           verifier NOMS_MIGRES, contrairement a la ligne 37365 qui, elle, le fait deja pour ne
           pas casser l'affichage de ces memes chevaux. Le bouton d'edition des origines suit
           maintenant la meme exception. */
          ((!CHEVAUX_FICHE[id] || NOMS_MIGRES[id]) && chevalDyn && chevalDyn.dbId) ? h("button", { onClick: ouvrirEditOrigines, "aria-label": hypeT7("Modifier les origines", "Edit pedigree", "Modificar los or\u00edgenes", "Modifica le origini", "\u8840\u7d71\u3092\u7de8\u96c6", "Abstammung bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0646\u0633\u0628", "修改血统", "Afstamming aanpassen", "Editar as origens", "Redigera ursprung", "Изменить происхождение", "Edytuj rodowód", "혈통 수정"), style: { position: "absolute", top: 8, right: 8, zIndex: 3, width: 26, height: 26, borderRadius: "50%", background: "rgba(7,8,10,0.55)", border: "1px solid rgba(255,255,255,0.22)", color: "#D8D2C6", fontSize: 11, cursor: "pointer" } }, "\u270E") : null,
          (function (pg) {
            function celPed(n, opts) {
              opts = opts || {};
              var idAsc = (n && n.nom) ? ascendantVersFiche(n.nom) : null; /* \U0001f7e9 06/09 : fiche Hype existante pour ce nom ? */
              return h("div", { role: idAsc ? "button" : null, onClick: idAsc ? function (eAs) { try { if (eAs && eAs.stopPropagation) eAs.stopPropagation(); } catch (eAs2) { } try { window.__chevalOuvert = idAsc; } catch (eAs3) { } setEcran("cheval"); } : null, style: { gridColumn: opts.col, gridRow: opts.row, padding: "9px 8px 9px 10px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0, borderLeft: opts.col > 1 ? "1px solid rgba(127,163,173,0.2)" : "none", borderBottom: opts.bb === "fort" ? "1px solid rgba(127,163,173,0.25)" : (opts.bb ? "1px solid rgba(255,255,255,0.05)" : "none"), cursor: idAsc ? "pointer" : "default" } },
                opts.label ? h("div", { style: { fontSize: 7.5, letterSpacing: "0.22em", color: teinteCl, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 } }, opts.label) : null,
                (function () {   /* (650) bon IPO : nom en or avec une etoile, indice en gras */
                  var ipoN = (n && n.detail && typeof hypeIpoDe === "function") ? hypeIpoDe(n.detail) : null;
                  var bonIpo = !!(ipoN !== null && ipoN >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120));
                  var detailEl = null;
                  if (n && n.detail) {
                    if (bonIpo) {
                      var mD = /(\bIPO\s*[:=]?\s*\d{2,3}\b)/i.exec(String(n.detail)); var av = String(n.detail).slice(0, mD.index), ap = String(n.detail).slice(mD.index + mD[0].length);
                      detailEl = h("div", { "data-bon-ipo": String(ipoN), style: { fontSize: 10, color: "#A39D92", marginTop: 3, lineHeight: 1.3 } }, av, h("b", { style: { color: "#E9D3A2", fontWeight: 800 } }, mD[0]), ap);
                    } else detailEl = h("div", { style: { fontSize: 10, color: "#A39D92", marginTop: 3, lineHeight: 1.3 } }, n.detail);
                  }
                  return h(React.Fragment, null,
                    h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: opts.grand ? 14 : (opts.moyen ? 11.5 : 10), fontWeight: 700, color: bonIpo ? "#E9D3A2" : (idAsc ? teinteCl : "#F3EEE4"), lineHeight: 1.28, overflowWrap: "break-word", textDecoration: idAsc ? "underline" : "none", textDecorationColor: idAsc ? "rgba(127,163,173,0.35)" : "transparent", textUnderlineOffset: 2 } }, (bonIpo ? "\u2605 " : "") + (n ? n.nom : "\u2014")),
                    detailEl);
                })());   /* (631) « agrandis » : 7,8 -> 10 px, plus clair */
            }
            var lp = T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지"), lm = T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니");
            var aG2 = !!((pg.pere && (pg.pere.pere || pg.pere.mere)) || (pg.mere && (pg.mere.pere || pg.mere.mere)));
            var aG3 = false;
            [pg.pere, pg.mere].forEach(function (pN) { if (pN) [pN.pere, pN.mere].forEach(function (gN) { if (gN && (gN.pere || gN.mere)) aG3 = true; }); });
            return h("div", { style: { display: "grid", gridTemplateColumns: aG3 ? "1.18fr 1fr 1fr" : (aG2 ? "1.25fr 1fr" : "1fr"), gridAutoRows: "minmax(21px, auto)", borderBottom: (og.naisseur || og.note) ? "1px solid rgba(255,255,255,0.06)" : "none" } },
              celPed(pg.pere, { col: 1, row: aG2 ? "1 / span 4" : "1 / span 2", label: lp, grand: true, bb: "fort" }),
              celPed(pg.mere, { col: 1, row: aG2 ? "5 / span 4" : "3 / span 2", label: lm, grand: true }),
              aG2 ? celPed(pg.pere && pg.pere.pere, { col: 2, row: "1 / span 2", moyen: true, bb: true }) : null,
              aG2 ? celPed(pg.pere && pg.pere.mere, { col: 2, row: "3 / span 2", moyen: true, bb: "fort" }) : null,
              aG2 ? celPed(pg.mere && pg.mere.pere, { col: 2, row: "5 / span 2", moyen: true, bb: true }) : null,
              aG2 ? celPed(pg.mere && pg.mere.mere, { col: 2, row: "7 / span 2", moyen: true }) : null,
              aG3 ? celPed(pg.pere && pg.pere.pere && pg.pere.pere.pere, { col: 3, row: "1", bb: true }) : null,
              aG3 ? celPed(pg.pere && pg.pere.pere && pg.pere.pere.mere, { col: 3, row: "2", bb: true }) : null,
              aG3 ? celPed(pg.pere && pg.pere.mere && pg.pere.mere.pere, { col: 3, row: "3", bb: true }) : null,
              aG3 ? celPed(pg.pere && pg.pere.mere && pg.pere.mere.mere, { col: 3, row: "4", bb: "fort" }) : null,
              aG3 ? celPed(pg.mere && pg.mere.pere && pg.mere.pere.pere, { col: 3, row: "5", bb: true }) : null,
              aG3 ? celPed(pg.mere && pg.mere.pere && pg.mere.pere.mere, { col: 3, row: "6", bb: true }) : null,
              aG3 ? celPed(pg.mere && pg.mere.mere && pg.mere.mere.pere, { col: 3, row: "7", bb: true }) : null,
              aG3 ? celPed(pg.mere && pg.mere.mere && pg.mere.mere.mere, { col: 3, row: "8" }) : null);
          })(og.pedigree || { pere: og.pere || null, mere: og.mere || null }),

          (og.arbre || []).map(function (gn, gi) {
            return h("div", { key: "gen" + gi, style: { padding: "10px 14px", borderBottom: (gi === og.arbre.length - 1 && !og.naisseur && !og.note) ? "none" : "1px solid rgba(255,255,255,0.05)" } },
              h("div", { style: { fontSize: 8, letterSpacing: "0.2em", color: "#A39D92", textTransform: "uppercase", fontWeight: 700, marginBottom: 7 } }, tr(gn.gen)),
              h("div", { style: { display: "grid", gridTemplateColumns: gn.lignes.length > 1 ? "1fr 1fr" : "1fr", columnGap: 14, rowGap: 7 } },
                gn.lignes.map(function (ln, li) {
                  return h("div", { key: "ln" + li, style: { minWidth: 0, paddingLeft: 9, borderLeft: "2px solid " + tA(0.35) } },
                    h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 12.5, fontWeight: 600, color: "#E6ECEF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ln[0]),
                    h("div", { style: { fontSize: 9, color: "#7D776D", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ln[1]));
                })));
          }),
          /* 30/07 : doublon SIRE retire — la pilule SIRE existante (thematisee) suffit */
          (og.naisseur || og.note) ? h("div", { style: { padding: "9px 14px 11px" } },
            og.naisseur ? h("div", { style: { fontSize: 9, color: "#7D776D" } }, h("span", { style: { letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, fontSize: 7.5, color: "#A39D92" } }, T("Naisseur", "Breeder", "Criador", "Allevatore", "生産者", "Züchter", "\u0627\u0644\u0645\u0631\u0628\u064a", "育马人", "Fokker", "Criador", "Uppfödare", "Заводчик", "Hodowca", "생산자") + "  "), og.naisseur) : null,
            og.note ? h("div", { style: { fontSize: 8.5, color: "#7D776D", fontStyle: "italic", marginTop: og.naisseur ? 4 : 0 } }, og.note) : null) : null,
          og.sire ? h("div", { role: "button", onClick: function () { try { window.open("https://infochevaux.ifce.fr/fr/info-chevaux", "_blank"); } catch (eSi) { } }, style: { margin: "0 14px 12px", padding: "9px 12px", borderRadius: 12, border: "1px solid " + tA(0.35), display: "flex", alignItems: "center", gap: 8, cursor: "pointer" } }, /* 30/07 : lien SIRE -> Info Chevaux IFCE (remplace la fausse ligne FFE — decision Blandine) */
            h("span", { style: { letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, fontSize: 8, color: "#A39D92" } }, "SIRE"),
            h("span", { style: { fontSize: 11.5, color: "#F3EEE4", fontWeight: 600, letterSpacing: "0.06em" } }, og.sire),
            h("span", { style: { marginLeft: "auto", fontSize: 9, color: teinteCl || "#CFE3E8" } }, T("Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux \u2197", "Info Chevaux ↗", "Info Paarden ↗", "Info Chevaux ↗", "Info Chevaux ↗", "Info Chevaux ↗", "Info Chevaux ↗", "Info Chevaux ↗"))) : null); })(),

        /* 🟩 05/09 22h50 (Blandine : "ajoute les descendants, on pourra les afficher
           quand on retourne la fiche des origines" + "faire le lien direct dessus quand leur
           nom est bien confirme et similaire") — les poulains trouves, chacun cliquable vers
           sa propre fiche (meme geste que partout ailleurs dans l'app : window.__chevalOuvert
           + setEcran("cheval")). Rien si la recherche n'a encore rien trouve : comme le bloc
           Naisseur juste au-dessus, ce bloc reste discret quand il n'y a rien a dire. */
        (parenteInfo && parenteInfo.descendants && parenteInfo.descendants.length) ? h("div", { style: { padding: "9px 14px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" } },
          h("div", { style: { fontSize: 8, letterSpacing: "0.2em", color: "#A39D92", textTransform: "uppercase", fontWeight: 700, marginBottom: 7 } },
            T("Poulains", "Foals", "Potros", "Puledri", "\u5b50\u99ac", "F\u00f6hlen", "\u0627\u0644\u0645\u0647\u0648\u0631", "小马驹", "Veulens", "Potros", "Föl", "Жеребята", "Źrebaki", "망아지")),
          h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } },
            parenteInfo.descendants.map(function (dsc) {
              return h("span", { key: dsc.id, role: "button", onClick: function (eDs) {
                try { if (eDs && eDs.stopPropagation) eDs.stopPropagation(); } catch (eDs2) { }
                try { window.__chevalOuvert = dsc.id; } catch (eDs3) { }
                setEcran("cheval");
              }, style: { display: "inline-block", padding: "5px 11px", borderRadius: 999, border: "1px solid " + tA(0.4), background: tA(0.08), color: teinteCl, fontSize: 10.5, fontWeight: 600, fontFamily: "'Cinzel',serif", cursor: "pointer" } }, dsc.nom);
            }))) : null,

        /* 13/10 (1085) Blandine : « quand la carte origine se retourne, mets plutot le bouton d import la, en dessous des origines » */
        (function () {
          var peutOrigV = !!((!CHEVAUX_FICHE[id] || NOMS_MIGRES[id]) && chevalDyn && chevalDyn.dbId && c.dbId && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi) || gereClubCh));   /* memes droits qu au recto (820) */
          if (!peutOrigV) return null;
          return h("div", { style: { padding: "10px 14px 14px", display: "flex", flexDirection: "column", alignItems: "center" } },
            h("div", { role: "button", "data-orig-import": "1", onClick: function (eIo) { try { if (eIo && eIo.stopPropagation) eIo.stopPropagation(); } catch (eIo2) { } ouvrirEditOrigines(); },
              style: { display: "inline-flex", alignItems: "center", gap: 6, minHeight: 32, padding: "0 14px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.62)", background: "rgba(6,7,9,0.35)", color: "#DCCBAA", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.02em", fontFamily: "'Montserrat',sans-serif", cursor: "pointer", whiteSpace: "nowrap" } },
              "\u2913 " + T("Importer les origines depuis une capture", "Import bloodline from a screenshot", "Importar los orígenes desde una captura", "Importa le origini da una schermata", "キャプチャから血統を取り込む", "Herkunft aus Screenshot importieren", "استيراد النسب من لقطة شاشة", "从截图导入血统", "Afstamming importeren vanuit een screenshot", "Importar as origens a partir de uma captura", "Importera ursprung från en skärmdump", "Загрузить происхождение со скриншота", "Zaimportuj pochodzenie ze zrzutu ekranu", "캡처 화면으로 혈통 가져오기")),
            /* 13/10 (1091) l indice : comment le faire valider */
            h("div", { style: { marginTop: 9, maxWidth: 280, textAlign: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 13.5, lineHeight: 1.35, color: "rgba(243,238,228,0.62)" } },
              T("Pour faire valider l’IPO (ou un autre indice), importe la capture d’un site qui le mentionne : IFCE, Info Chevaux, Horsetelex…",
                "To get the IPO (or another index) validated, import a screenshot of a website showing it: IFCE, Info Chevaux, Horsetelex…",
                "Para validar el IPO (u otro índice), importa la captura de una web que lo indique: IFCE, Info Chevaux, Horsetelex…",
                "Per far convalidare l’IPO (o un altro indice), importa lo screenshot di un sito che lo riporta: IFCE, Info Chevaux, Horsetelex…",
                "IPO（または他の指数）を確認するには、それが載っているサイト（IFCE、Info Chevaux、Horsetelex…）のキャプチャを取り込んでね。",
                "Um den IPO (oder einen anderen Index) bestätigen zu lassen, importiere einen Screenshot einer Seite, die ihn zeigt: IFCE, Info Chevaux, Horsetelex…",
                "لاعتماد مؤشر IPO (أو مؤشر آخر)، استوردي لقطة شاشة لموقع يذكره: IFCE وInfo Chevaux وHorsetelex…", "想让 IPO（或其他指标）通过验证，请导入提到它的网站截图：IFCE、Info Chevaux、Horsetelex…", "Om de IPO (of een andere index) te laten valideren, importeer je een screenshot van een website waarop die staat: IFCE, Info Chevaux, Horsetelex…", "Para validar o IPO (ou outro índice), importe a captura de um site que o mencione: IFCE, Info Chevaux, Horsetelex…", "För att få IPO (eller ett annat index) verifierat, importera en skärmdump från en webbplats som nämner det: IFCE, Info Chevaux, Horsetelex…", "Чтобы подтвердить IPO (или другой индекс), загрузи скриншот сайта, где он указан: IFCE, Info Chevaux, Horsetelex…", "Aby zatwierdzić IPO (lub inny indeks), zaimportuj zrzut ekranu ze strony, która go podaje: IFCE, Info Chevaux, Horsetelex…", "IPO(또는 다른 지수)를 확인받으려면 해당 정보가 나온 사이트의 캡처를 가져오세요: IFCE, Info Chevaux, Horsetelex…")));
        })(),
        null, null))))),
        null /* (1076) les 6 tuiles sont remontees au-dessus de la carte Origines */,
        
        

        /* ===== 13/09 (116) — LE RAIL « DERNIERS RESULTATS » SUR LA FICHE DU CHEVAL =====
           Demande de Blandine : « ca serait bien de copier le meme rail avec les
           derniers resultats sur la page cheval ». Le rail existait UNIQUEMENT dans le
           panneau Performances (et un cousin sur la page du club) : il fallait ouvrir
           Performances pour voir quoi que ce soit.
           ⚠️ LE BLOC N EST PAS DEPLACE, IL EST RECONSTRUIT ICI avec ses propres
              variables (lecon du 16/08 : un bloc de rendu ne part jamais sans ses
              variables). Celui du panneau Performances s appuie sur `recents`, calcule
              dans une fonction locale a ce panneau, et sur `cavFiltre` / `setSaisonOuv`
              qui n existent pas ici. On repart donc de `resDb`, la source reelle au
              niveau du composant (les lignes de la table `resultats`), avec les MEMES
              noms de champs que `tousF` : concours, epreuve, cavalier, place,
              classement, partants, date_epreuve.
           ⚠️ LA COCHE DE L IMPORT EST RESPECTEE (`visible !== false`), comme partout
              ailleurs depuis le 26/08 — et `voirMasques` la leve pour la proprietaire.
           Le dessin de la carte est copie a l identique du panneau Performances
           (medaille, annee, portrait rond, rang + cavaliere « sur » le cheval,
           concours, epreuve, partants, autres classes). Au toucher : le panneau
           Performances s ouvre — pas de saut vers une saison precise, `setSaisonOuv`
           n existe pas a cette portee. */
        /* 15/09 (157) - LE RAIL DU HAUT EST RETIRE (et non celui du bas, comme au 156 qui n a
             jamais ete pousse). Blandine, croix sur sa capture de 16 h 49 puis : « je suis bien
             sur la page cheval, sinon vire plutot le rail du haut ». Elle veut UN seul rail, et a
             la place du bas : « en dessous de la video et au dessus des principaux resultats ».
             Le rail du bas (— 5 · DERNIERS RESULTATS —) est donc celui qui reste, a sa place.
             Ce bloc-ci est neutralise, non supprime : remplacer false par (function () { ... })
             le rallumerait. */
          false ? null : null,
        null /* (895) Blandine : losange retire avec la rangee des valeurs */, /* cristal("apercu") 31/07 soir : separation cristal avant l IPO et son histoire (demande Blandine) */
        (function () {
          /* 10/10 (832) Blandine : « l onglet histoire du cheval, on peut le retirer car il apparait sur son histoire dans la page
             specifique ». Le bloc « son histoire » de la fiche n est plus affiche : le recit vit dans Histoire → Souvenirs, qui montre
             desormais LE MEME texte (mon histoire perso sur un cheval qui n est pas le mien) et le meme crayon. Code garde, eteint ici. */
          if (true) return null;
          var ogH = c.origines || {};
          var infoP = (c.info || "").split("\u00b7").map(function (x) { return x.trim(); }).filter(Boolean);
          var ixH = (ogH.indices || []).filter(function (ix) { var v = parseFloat(String(ix[1]).replace("\u2212", "-").replace("+", "")); return isFinite(v) && v >= 80; })[0];
          var vH = ixH ? parseFloat(String(ixH[1]).replace("\u2212", "-").replace("+", "")) : 0;
          var lblH = rareteIndice(vH);
          var nmC = String(c.nom || "");
          var mSp = nmC.match(/^(.*?)\s+(de\s.+|d'.+|du\s.+|des\s.+)$/i);
          var raceTxt = infoP[0] || race || "";
          var abrv = raceTxt.split(/[\s-]+/).filter(function (w) { return w.length > 2; }).map(function (w) { return w[0]; }).join("").toUpperCase() || raceTxt.slice(0, 3).toUpperCase();
          var ageTxt = infoP.filter(function (x) { return /^\d+\s*ans?\b/i.test(x); })[0] || "";
          /* 02/09 : sur MA page, si le cheval n est pas le mien, c est MON histoire.
             Celle de la proprietaire reste seule cote ecurie / fiche commune. */
          var recit = ((chevalDyn && chevalDyn.dbId && !estMonChevalFiche) ? (histPerso || "") : (c.histoire || "")) || (function () {
            var estMien = !!(c.dbId && moi && chevalDyn && chevalDyn.ownerId === moi.id);
            /* 02/09 (Blandine) : « quand je regarde son histoire ça dit que c'est
               une jument de l'Ecurie Feinn » — alors que le cheval avait ete cree
               depuis la SEP. La phrase lisait `profil.ecurie`, l ecurie PRINCIPALE
               du compte, sans jamais regarder le club du cheval.
               ⚠️ Regle posee par Blandine : « si on n est pas capable de reconnaitre
               l ecurie, ne rien mettre ». On ne devine plus. */
            /* 02/09 (2e passe) : le repli sur `proprioEcurie` — l ecurie du
               PROPRIETAIRE, lue sur son profil — ramenait « Ecurie Feinn » des que
               le cheval n avait pas de club. C est ce repli qui faisait mentir la
               phrase, pas la lecture du club. Blandine : « si on n est pas capable
               de reconnaitre l ecurie, ne rien mettre ». Plus de repli du tout. */
            var ecu = (chevalDyn && String(chevalDyn.club || "").trim()) || "";
            var cav = ""; /* 27/08 : repli sur profil.prenom/pseudo retire — affichait "monte par Blandine" sur tout cheval sans proprioNom renseigne, meme quand elle ne le monte pas. 28/08 : la mention du cavalier est RETIREE TOUT COURT du texte par defaut (demande Blandine : « dis juste l'ecurie, sinon ca peut porter a confusion »). Le proprietaire enregistre en base n'est pas forcement celui qui monte le cheval — sur un cheval cree par Blandine pour une cavaliere, on lisait « monte par Blandine », ce qui est faux et trompeur pour qui le lit. Le texte par defaut ne dit donc plus que la race et l'ecurie ; le nom du cavalier ne peut venir que de l'histoire ecrite a la main. */
            /* 28/08 (demande Blandine) : la mention du cavalier est RETIREE du texte
               par defaut. Elle venait de proprioNom (le proprietaire reellement
               enregistre sur le cheval) : tout cheval qu'elle cree affichait donc
               « monte par Blandine », meme quand elle ne le monte pas. Le correctif
               du 27/08 avait deja retire le repli sur profil.prenom, mais pas cette
               source-ci. Le texte par defaut ne cite plus que l'ECURIE ; le cavalier
               n'apparait que si quelqu'un ecrit l'histoire a la main. */
            /* 11/09 (Blandine : « Zeus est un cheval… on peut mieux faire lol ») — quand on ne sait
               NI la race NI l'ecurie, l'ancienne phrase ne disait litteralement rien ("X est un
               cheval."). Dans ce seul cas, une phrase d'attente qui invite a ecrire l'histoire
               plutot qu'un constat vide. Des qu'une race OU une ecurie est connue, la phrase
               informative d'origine est conservee telle quelle. */
            var sigleH = hypeSigleOrigine(raceTxt);   /* (825) « Jaiko de Popey (OC) est un cheval de l ecurie … » */
            var raceConnue = (raceTxt && raceTxt !== "\u2014" && !sigleH) ? raceTxt : "";
            if (!raceConnue && !ecu) {
              var rcV = String(c.nom || "") + T(" n'a pas encore racont\u00e9 son histoire", " hasn't told its story yet", " a\u00fan no ha contado su historia", " non ha ancora raccontato la sua storia", "\u306e\u7269\u8a9e\u306f\u307e\u3060\u8a9e\u3089\u308c\u3066\u3044\u306a\u3044", " hat seine Geschichte noch nicht erzählt", " \u0644\u0645 \u064a\u0631\u0648 \u0642\u0635\u062a\u0647 \u0628\u0639\u062f", " 还没有讲述自己的故事", " heeft nog geen verhaal verteld", " ainda não contou sua história", " har inte berättat sin historia än", " ещё не рассказала свою историю", " nie opowiedział jeszcze swojej historii", " 아직 이야기를 들려주지 않았어요");
              if (estMien) { rcV += T(". Touche le crayon pour la commencer.", ". Tap the pencil to begin it.", ". Toca el l\u00e1piz para empezarla.", ". Tocca la matita per iniziarla.", "\u3002\u925b\u7b46\u3067\u66f8\u304d\u59cb\u3081\u3088\u3046\u3002", ". Tippe auf den Stift, um sie zu beginnen.", ". \u0627\u0644\u0645\u0633\u064a \u0627\u0644\u0642\u0644\u0645 \u0644\u0628\u062f\u0626\u0647\u0627.", "。点一下铅笔就可以开始写。", ". Tik op het potlood om te beginnen.", ". Toque no lápis para começar.", ". Tryck på pennan för att börja.", ". Нажми на карандаш, чтобы начать её.", ". Dotknij ołówka, aby ją zacząć.", ". 연필을 눌러 시작해 보세요."); } else { rcV += "."; }
              return rcV;
            }
            var rc = String(c.nom || "") + (sigleH ? " (" + sigleH + ")" : "") + T(" est un ", " is a ", " es un ", " \u00e8 un ", "\u306f", " ist ein ", " \u0647\u0648 ", " 是一匹 ", " is een ", " é um ", " är en ", " — ", " to ", "은(는) ") + (raceConnue || T("cheval", "horse", "caballo", "cavallo", "\u99ac", "Pferd", "\u062d\u0635\u0627\u0646", "马", "paard", "cavalo", "häst", "лошадь", "koń", "마리"));
            if (ecu) rc += T(" de l'\u00e9curie ", " from the ", " de la cuadra ", " della scuderia ", "\u3001\u6240\u5c5e\uff1a", " aus dem Stall ", " \u0645\u0646 \u0625\u0633\u0637\u0628\u0644 ", "，来自马厩 ", " van stal ", " da cocheira ", " från stallet ", " из конюшни ", " ze stajni ", "(마구간: ") + ecu + (T("", " stable", "", "", "", "", "", " stable", " stable", " stable", " stable", " stable", " stable", " stable") || "");
            if (estMien) { rc += T(". Touche le crayon pour \u00e9crire son histoire.", ". Tap the pencil to write its story.", ". Toca el l\u00e1piz para escribir su historia.", ". Tocca la matita per scrivere la sua storia.", "\u3002\u925b\u7b46\u3067\u7269\u8a9e\u3092\u66f8\u3053\u3046\u3002", ". Tippe auf den Stift, um seine Geschichte zu schreiben.", ". \u0627\u0644\u0645\u0633\u064a \u0627\u0644\u0642\u0644\u0645 \u0644\u0643\u062a\u0627\u0628\u0629 \u0642\u0635\u062a\u0647.", "。点一下铅笔来写它的故事。", ". Tik op het potlood om zijn verhaal te schrijven.", ". Toque no lápis para escrever a história dele.", ". Tryck på pennan för att skriva dess historia.", ". Нажми на карандаш, чтобы написать её историю.", ". Dotknij ołówka, aby napisać jego historię.", "). 연필을 눌러 이야기를 써 보세요."); } else { rc += "."; }
            return rc;
          })();
          return h("div", { className: "hginfo rise" },
            h("div", { className: "hdiv" }, h("i", null), h("s", null)),
            null, /* 02/08 : bloc IPO / race / age retire — ses informations vivent desormais dans la carte Origines, en une ligne discrete (demande Blandine). L histoire remonte. */
            h("div", { className: "hype-cristal", style: { margin: "18px 0 20px" } },
              h("style", null, "@keyframes hypeSpin{to{transform:rotate(1turn)}}.hype-cristal{position:relative;border-radius:18px;padding:1.6px;overflow:hidden;isolation:isolate}.hype-cristal::before{content:'';position:absolute;inset:-60%;z-index:0;background:conic-gradient(from 0deg,transparent 0 66%," + teinte + " 82%," + teinteCl + " 90%,transparent 100%);animation:hypeSpin 4.5s linear infinite}.hype-cristal>.hype-cristal-cc{position:relative;z-index:1;border-radius:16.5px;background:#070B10}"),
              h("div", { className: "hype-cristal-cc", style: { padding: "12px 14px" } },
            h("p", { className: "hbio", style: histoireDepliee ? { margin: 0, display: "block", overflow: "visible", maxWidth: "none" } : { margin: 0 } }, recit,
              (c.dbId && moi && chevalDyn && (chevalDyn.ownerId === moi.id || (chevalDyn.dbId && estLieFiche))) ? h("span", { role: "button", onClick: ouvrirEditHistoire, title: hypeT7("Modifier l'histoire", "Edit the story", "Modificar la historia", "Modifica la storia", "\u30b9\u30c8\u30fc\u30ea\u30fc\u3092\u7de8\u96c6", "Geschichte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0642\u0635\u0629", "修改故事", "Verhaal aanpassen", "Editar a história", "Redigera historien", "Изменить историю", "Edytuj historię", "이야기 수정"), style: { marginLeft: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", border: "1px solid " + tA(0.5), fontSize: 11, color: teinteCl, cursor: "pointer", verticalAlign: "middle" } }, "\u270e") : null))),
            h("div", { className: "hcta", onClick: function () { setHistoireDepliee(!histoireDepliee); } }, histoireDepliee ? ("\u25B4 " + T("Replier son histoire", "Collapse the story", "Plegar su historia", "Richiudi la sua storia", "\u7269\u8a9e\u3092\u305f\u305f\u3080", "Geschichte einklappen", "\u0637\u064a \u0642\u0635\u062a\u0647", "收起故事", "Verhaal inklappen", "Recolher a história", "Fäll ihop historien", "Свернуть историю", "Zwiń historię", "이야기 접기")) : ("\u2728 " + T("D\u00e9couvrir son histoire", "Discover its story", "Descubrir su historia", "Scopri la sua storia", "\u7269\u8a9e\u3092\u898b\u308b", "Seine Geschichte entdecken", "\u0627\u0643\u062a\u0634\u0627\u0641 \u0642\u0635\u062a\u0647", "探索它的故事", "Ontdek zijn verhaal", "Descobrir a história dele", "Upptäck berättelsen", "Узнать его историю", "Odkryj jego historię", "이야기 보러 가기"))));
        })(),



        false /* (895) Blandine : rangee Confiance / Complicite / Respect... retiree de la fiche (« tu peux la virer completement ») */ && h("div", { className: "rise", style: { animationDelay: ".05s", display: "flex", gap: 7, overflowX: "auto", padding: "18px 0 8px" /* 20/08 : air au-dessus des pastilles (collaient sous la description) */, WebkitOverflowScrolling: "touch" } },
          [["confiance", T("Confiance", "Trust", "Confianza", "Fiducia", "信頼", "Vertrauen", "\u0627\u0644\u062b\u0642\u0629", "信任", "Vertrouwen", "Confiança", "Förtroende", "Доверие", "Zaufanie", "신뢰")], ["complicite", T("Complicité", "Bond", "Complicidad", "Intesa", "絆", "Verbundenheit", "\u0627\u0644\u062a\u0641\u0627\u0647\u0645", "默契", "Verbondenheid", "Cumplicidade", "Samspel", "Взаимопонимание", "Więź", "교감")], ["respect", T("Respect", "Respect", "Respeto", "Rispetto", "尊重", "Respekt", "\u0627\u0644\u0627\u062d\u062a\u0631\u0627\u0645", "尊重", "Respect", "Respeito", "Respekt", "Уважение", "Szacunek", "존중")], ["franchise", T("Franchise", "Boldness", "Franqueza", "Franchezza", "率直さ", "Mut", "\u0627\u0644\u0625\u0642\u062f\u0627\u0645", "坦率", "Openheid", "Franqueza", "Ärlighet", "Открытость", "Odwaga", "솔직함")], ["sante", T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "\u0627\u0644\u0635\u062d\u0629", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")], ["moyens", T("Moyens", "Ability", "Medios", "Mezzi", "能力", "Durchschnittlich", "\u0627\u0644\u0642\u062f\u0631\u0627\u062a", "能力", "Capaciteiten", "Capacidade", "Förmåga", "Способности", "Możliwości", "능력")]].map(function (pr) {
            var vv = statsCh[pr[0]];
            return h("div", { key: pr[0], onClick: function () { setEditStat({ cle: pr[0], l: pr[1] }); }, style: { flex: "0 0 auto", display: "flex", alignItems: "baseline", gap: 5, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: "6px 12px", cursor: "pointer" } },
              h("b", { style: { fontFamily: "'Cinzel',serif", fontSize: 13.5, fontWeight: 700, color: vv ? teinteCl : "rgba(243,238,228,0.3)" } }, vv ? String(vv) : "—"),
              h("span", { style: { fontSize: 8.5, letterSpacing: "0.14em", color: "#A39D92", textTransform: "uppercase", fontWeight: 600 } }, pr[1]));
          }),
          [T("Niveau", "Level", "Nivel", "Livello", "レベル", "Level", "\u0627\u0644\u0645\u0633\u062a\u0648\u0649", "等级", "Niveau", "Nível", "Nivå", "Уровень", "Poziom", "레벨"), T("Classement", "Ranking", "Ranking", "Classifica", "ランク", "Rangliste", "\u0627\u0644\u062a\u0635\u0646\u064a\u0641", "排名", "Klassement", "Classificação", "Rankning", "Рейтинг", "Klasyfikacja", "순위")].map(function (lb) {
            return h("div", { key: lb, style: { flex: "0 0 auto", display: "flex", alignItems: "baseline", gap: 5, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 999, padding: "6px 12px" } },
              h("b", { style: { fontFamily: "'Cinzel',serif", fontSize: 13.5, fontWeight: 700, color: "rgba(243,238,228,0.22)" } }, "—"),
              h("span", { style: { fontSize: 8.5, letterSpacing: "0.14em", color: "#7D776D", textTransform: "uppercase", fontWeight: 600 } }, lb));
          })),

        editStat ? h("div", { style: { position: "fixed", inset: 0, zIndex: 8000, background: "rgba(4,6,9,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center" }, onClick: function(){ setEditStat(null); } },
          h("div", { onClick: function(e){ e.stopPropagation(); }, style: { width: "100%", maxWidth: 480, background: "#0C1016", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.3) + "", borderBottom: "none", padding: "20px 20px calc(24px + env(safe-area-inset-bottom))" } },
            h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.5, color: "#F3EEE4", textAlign: "center", marginBottom: 16, textTransform: "uppercase" } }, editStat.l),
            h("div", { style: { display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" } },
              [1,2,3,4,5,6,7,8,9,10].map(function(n){ var actifN = statsCh[editStat.cle] === n; return h("button", { key: n, onClick: function(){ fixerStat(n); }, style: { width: 40, height: 40, borderRadius: "50%", border: actifN ? "1.5px solid " + teinte + "" : "1px solid rgba(255,255,255,0.15)", background: actifN ? "" + tA(0.2) + "" : "transparent", color: actifN ? teinteCl : "#D8D2C6", fontSize: 14.5, fontWeight: 700, cursor: "pointer" } }, n); })),
            statsCh[editStat.cle] ? h("button", { onClick: function(){ fixerStat(null); }, style: { display: "block", margin: "14px auto 0", background: "none", border: "none", color: "#7D776D", fontSize: 12.5, cursor: "pointer", textDecoration: "underline" } }, T("Effacer", "Clear", "Borrar", "Cancella", "クリア", "Löschen", "\u0645\u0633\u062d", "清除", "Wissen", "Apagar", "Rensa", "Стереть", "Wyczyść", "지우기")) : null)) : null,

        /* 02/08 : panneau d edition de l histoire du cheval — meme facture que le recit du
           cavalier et l histoire de l ecurie (feuille en verre fume, textarea 9 lignes
           redimensionnable, compteur, Enregistrer). Remplace le window.prompt d une ligne. */
        editIx ? h("div", { style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center" }, onClick: function () { setEditIx(false); } },
          h("div", { onClick: function (eMi) { eMi.stopPropagation(); }, style: { width: "100%", maxWidth: 560, background: "#0C1016", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.3), borderBottom: "none", padding: "18px 18px calc(20px + env(safe-area-inset-bottom))" } },
            h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.5, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 5 } }, T("Son indice", "Its index", "Su \u00edndice", "Il suo indice", "\u6307\u6570", "Sein Index", "\u0645\u0624\u0634\u0631\u0647", "它的指数", "Zijn index", "Seu índice", "Dess index", "Её индекс", "Jego indeks", "지수")),
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 300, color: "#A39D92", textAlign: "center", lineHeight: 1.55, marginBottom: 14 } }, T("IPO, ISO, BSO\u2026 le sigle puis la valeur.", "IPO, ISO, BSO\u2026 the code then the value.", "IPO, ISO, BSO\u2026 la sigla y el valor.", "IPO, ISO, BSO\u2026 la sigla e il valore.", "IPO\u3001ISO\u3001BSO\u2026 \u7565\u53f7\u3068\u5024\u3002", "IPO, ISO, BSO\u2026 K\u00fcrzel und Wert.", "IPO\u060c ISO\u060c BSO\u2026 \u0627\u0644\u0631\u0645\u0632 \u062b\u0645 \u0627\u0644\u0642\u064a\u0645\u0629.", "IPO、ISO、BSO……先填代码，再填数值。", "IPO, ISO, BSO… eerst de afkorting, dan de waarde.", "IPO, ISO, BSO… a sigla e depois o valor.", "IPO, ISO, BSO… först förkortningen, sedan värdet.", "IPO, ISO, BSO… сначала аббревиатура, потом значение.", "IPO, ISO, BSO… skrót, a potem wartość.", "IPO, ISO, BSO… 약자와 값을 적어 주세요.")),
            h("div", { style: { display: "flex", gap: 9 } },
              h("input", { value: ixNom, onChange: function (eI1) { setIxNom(String(eI1.target.value).slice(0, 8)); }, placeholder: "IPO", style: { width: 86, flexShrink: 0, boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 13, color: "#F3EEE4", fontSize: 16, fontFamily: "'Montserrat',sans-serif", padding: "12px 13px", textAlign: "center", letterSpacing: "0.1em", outline: "none" } }),
              h("input", { value: ixTxt, onChange: function (eI2) { setIxTxt(String(eI2.target.value).slice(0, 12)); }, placeholder: T("Valeur", "Value", "Valor", "Valore", "\u5024", "Wert", "\u0627\u0644\u0642\u064a\u0645\u0629", "数值", "Waarde", "Valor", "Värde", "Значение", "Wartość", "값"), style: { flex: 1, minWidth: 0, boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 13, color: "#F3EEE4", fontSize: 16, fontFamily: "'Montserrat',sans-serif", padding: "12px 13px", outline: "none" } })),
            h("div", { style: { display: "flex", gap: 9, marginTop: 16 } },
              h("button", { onClick: function () { setEditIx(false); }, style: { flex: 1, padding: "13px 0", borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
              h("button", { onClick: sauverIndice, style: { flex: 1.4, padding: "13px 0", borderRadius: 14, border: "1px solid " + tA(0.7), background: tA(0.16), color: teinteCl, fontSize: 13, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))) : null,

        editHist ? h("div", { style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center" }, onClick: function () { setEditHist(false); /* 26/08 : la sortie n est JAMAIS verrouillee — l enregistrement continue en arriere-plan et son toast dira la verite */ } },
          /* 28/08 (Blandine : trois heures d'ecriture perdues, « on arrive meme pas
             a atteindre un bouton pour valider quoi que ce soit »). CAUSE : la barre
             de navigation du bas (Accueil/Galops/Cavalier..., 84 px + zone sure) est
             posee PAR-DESSUS ce panneau, qui ne lui reservait aucune place : les
             boutons Annuler/Enregistrer passaient dessous, inatteignables. On ajoute
             84 px a la marge basse (en plus de la zone sure deja presente) et on
             reduit maxHeight d'autant, pour que le bas du panneau reste toujours
             au-dessus de la barre.
             FAUSSE PISTE ECARTEE : j'avais d'abord soupconne la limite de 4000
             caracteres — la capture montrait 847/4000, rien a voir. */
          h("div", { onClick: function (eM) { eM.stopPropagation(); }, style: { width: "100%", maxWidth: 560, background: "#0C1016", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.3), borderBottom: "none", padding: "18px 18px calc(20px + 84px + env(safe-area-inset-bottom))", maxHeight: "calc(92svh - 84px)", overflowY: "auto" } },
            h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.5, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 5 } }, T("Son histoire", "Their story", "Su historia", "La sua storia", "\u305d\u306e\u7269\u8a9e", "Seine Geschichte", "\u0642\u0635\u062a\u0647", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기")),
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 300, color: "#A39D92", textAlign: "center", lineHeight: 1.55, marginBottom: 14 } }, T("Ses d\u00e9buts, ses concours, son caract\u00e8re \u2014 prends la place qu\u2019il te faut.", "Their beginnings, their shows, their character \u2014 take all the room you need.", "Sus inicios, sus concursos, su car\u00e1cter \u2014 usa todo el espacio que necesites.", "I suoi inizi, i suoi concorsi, il suo carattere \u2014 prenditi tutto lo spazio.", "\u59cb\u307e\u308a\u3001\u5927\u4f1a\u3001\u6027\u683c \u2014 \u5fc5\u8981\u306a\u3060\u3051\u66f8\u3044\u3066\u304f\u3060\u3055\u3044\u3002", "Seine Anf\u00e4nge, Turniere, sein Charakter \u2014 nimm dir so viel Platz wie n\u00f6tig.", "\u0628\u062f\u0627\u064a\u0627\u062a\u0647\u060c \u0645\u0633\u0627\u0628\u0642\u0627\u062a\u0647\u060c \u0637\u0628\u0627\u0639\u0647 \u2014 \u062e\u0630\u064a \u0627\u0644\u0645\u0633\u0627\u062d\u0629 \u0627\u0644\u062a\u064a \u062a\u062d\u062a\u0627\u062c\u064a\u0646\u0647\u0627.", "它的起步、它的比赛、它的性格——想写多少就写多少。", "Zijn beginjaren, zijn wedstrijden, zijn karakter — neem de ruimte die je nodig hebt.", "Seus primeiros passos, suas competições, seu temperamento — use o espaço que precisar.", "Dess början, dess tävlingar, dess personlighet — ta det utrymme du behöver.", "Её начало пути, соревнования, характер — бери столько места, сколько нужно.", "Jego początki, zawody, charakter — weź tyle miejsca, ile potrzebujesz.", "첫 시작, 대회, 성격까지 — 필요한 만큼 편하게 써 보세요.")),
            h("textarea", { value: histTxt, onChange: function (eI) { var v = String(eI.target.value).slice(0, 4000); setHistTxt(v); ecrireBrouillonHist(v); /* 28/08 : brouillon local a chaque frappe */ }, rows: 9, maxLength: 4000, placeholder: T("\u00c9cris ici\u2026", "Write here\u2026", "Escribe aqu\u00ed\u2026", "Scrivi qui\u2026", "\u3053\u3053\u306b\u66f8\u304f\u2026", "Schreibe hier\u2026", "\u0627\u0643\u062a\u0628\u064a \u0647\u0646\u0627\u2026", "在这里写…", "Schrijf hier…", "Escreva aqui…", "Skriv här…", "Пиши здесь…", "Pisz tutaj…", "여기에 써 보세요…"), style: { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14, color: "#F3EEE4", fontSize: 16, fontFamily: "'Montserrat',sans-serif", lineHeight: 1.6, padding: "12px 13px", resize: "vertical", minHeight: 180, outline: "none" } }), /* 27/08 : fontSize 13.5 -> 16 — sous 16px, iOS Safari zoome la page au focus du clavier, ce qui poussait le bouton Enregistrer hors ecran */
            h("div", { style: { display: "flex", alignItems: "center", marginTop: 8 } },
              h("button", { onClick: collerDansHistoire, style: { display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "7px 13px", color: "#D8D2C6", fontSize: 11.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\u2398 " + T("Coller", "Paste", "Pegar", "Incolla", "\u8cbc\u308a\u4ed8\u3051", "Einf\u00fcgen", "\u0644\u0635\u0642", "粘贴", "Plakken", "Colar", "Klistra in", "Вставить", "Wklej", "붙여넣기")),
              h("div", { style: { marginLeft: "auto", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: (String(histTxt || "").length > 3800 ? "#E8A87C" : "#6B7580") } }, String(histTxt || "").length + " / 4000")),
            h("div", { style: { display: "flex", gap: 9, marginTop: 16 } },
              h("button", { onClick: function () { setEditHist(false); /* 26/08 : la sortie n est JAMAIS verrouillee — l enregistrement continue en arriere-plan et son toast dira la verite */ }, style: { flex: 1, padding: "13px 0", borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
              h("button", { onClick: function () { if (!histBusy) sauverHistoireCheval(); }, style: { flex: 1.4, padding: "13px 0", borderRadius: 14, border: "1px solid " + tA(0.7), background: tA(0.16), color: teinteCl, fontSize: 13, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em", cursor: "pointer", opacity: histBusy ? 0.6 : 1 } }, histBusy ? "\u2026" : T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))) : null,


        h("div", { key: "esp895", style: { height: 0 } }),   /* 13/10 (1071) 56 -> 0 : la carte En concours porte deja ses 28 px, comme les autres blocs */ /* (901) meme ecart sous les tuiles qu au-dessus (58 px) */   /* (895) losange retire ; simple espace avant Performances */
        h("div", { id: "chapPerf", style: { position: "relative" } }, /* 31/07 : titre en surimpression, plus de decalage */
          null /* (901) mot vertical Performances retire */,
          h("div", { style: { minWidth: 0 } }, h("div", { className: "rise", role: "button", onClick: function () { setPanneau("palmares"); }, style: { animationDelay: ".075s", position: "relative", borderRadius: 18, overflow: "hidden", margin: "40px 16px 6px" /* 13/10 (1093) ecart unique de 40 px entre les chapitres (mesure) */ /* (1087) haut 28 -> 44 : « augmente un peu l espace entre le bas de l onglet origines et la video » */ /* 13/10 (1087) bas 52 -> 6 : « remonte importer mes resultats officiels », juste sous la video */ /* 13/10 (1081) Blandine : « laisse de l espace, ils se chevauchent » (0 -> 28 au-dessus) */, aspectRatio: "966/720", maxHeight: "40svh", background: "#04070A", cursor: "pointer" } }, /* 30/07 : la ceremonie remonte sur la fiche (demande Blandine — dommage de passer a cote) */
          h("video", { src: "https://ldpjebgtskzdokrublfg.supabase.co/storage/v1/object/public/photos/Untitled%20folder/Ui/" + (((teinte || "").toUpperCase() === "#D6C4A1" || (teinte || "").toUpperCase() === "#D6C4A1" || (teinte || "").toUpperCase() === "#C9A66B") ? "palmares-dore.mp4" : (teinte || "").toUpperCase() === "#5C7A5E" ? "palmares-vert.mp4" : (teinte || "").toUpperCase() === "#C64B5C" ? "palmares-bordeaux.mp4" : "palmares-crystal.mp4"), muted: true, loop: true, autoPlay: true, playsInline: true, onError: function (eV) { try { eV.currentTarget.parentNode.style.display = "none"; } catch (e9) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" } }),
          h("div", { style: { pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0.12) 0%, rgba(6,7,9,0) 40%, rgba(6,7,9,0.5) 80%, rgba(6,7,9,0.85) 100%)" } })),

        /* ═══ 25/08 session 163 — L IPO REMONTE AU-DESSUS DU RAIL ═══════
           Decision de Blandine, 24/08 au soir : « intervertir le bandeau de
           l IPO avec le rail des coupes, car si les autres resultats doivent
           s aligner la-dessus, ca va pas etre normal d avoir le bandeau IPO
           au milieu. » Le rail descend contre les resultats, puisque c est
           d eux qu il parle ; l IPO ne coupe plus la lecture en deux.
           🟥 LE BLOC IPO EST DEPLACE TEL QUEL, pas une virgule changee. Le
           rail de flots non plus n a pas bouge d un pixel — seulement sa
           place, avec l accord explicite de Blandine (la passation du 24/08
           le disait INTOUCHABLE : cela vaut pour son contenu et son style). */
        (ongletPerf === "coupes") ? (function () { /* 31/07 soir : carte IPO REMISE sous les coupes — elle etait piegee dans l etat vide, donc jamais affichee pour un cheval ayant coupes ou resultats */
          var ogI = c.origines || {};
          var ixI = (ogI.indices || []).filter(function (ix) { var v = parseFloat(String(ix[1]).replace("\u2212", "-").replace("+", "")); return isFinite(v) && v >= (typeof HYPE_IPO_BON === "number" ? HYPE_IPO_BON : 120) /* 15/10 (1154) Blandine : IPO seulement a partir de 120 */; });
          if (!ixI.length) return null;
          var vI = parseFloat(String(ixI[0][1]).replace("\u2212", "-").replace("+", ""));
          var pI = vI >= 120 ? Math.min(5, Math.floor((vI - 110) / 10)) : 0;
          var lblI = (typeof rareteIndice === "function") ? rareteIndice(vI) : null;
          var discI = String(disc || "").toUpperCase();
          var imgI = (discI.indexOf("CSO") >= 0 || discI.indexOf("SAUT") >= 0 || discI.indexOf("JUMP") >= 0) ? IMG_LABAULE : null;
          var tI = 40 + pI * 3;
          return h("div", { className: "rise", style: { animationDelay: ".075s", margin: "30px 16px 40px" /* (901) plus d air sous le bandeau IPO (18 -> 40) */, borderRadius: 16, border: "1px solid " + tA(0.3 + pI * 0.09), background: "linear-gradient(135deg, " + tA(0.06 + pI * 0.018) + ", rgba(11,18,21,0) 60%), linear-gradient(165deg, #111B1F 0%, #0B1215 100%)" /* (897) */, boxShadow: pI >= 3 ? "0 0 " + (12 + pI * 6) + "px " + tA(0.16) + ", inset 0 0 0 1px rgba(255,255,255,0.05)" : "inset 0 0 0 1px rgba(255,255,255,0.04)", padding: (10 + pI * 1.5) + "px 14px", display: "flex", alignItems: "center", gap: 13 } },
            imgI ? h("div", { style: { width: tI, height: tI, borderRadius: 14, overflow: "hidden", flexShrink: 0, border: "1px solid " + tA(0.42), boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" } },
              h("img", { src: imgI, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" } })) : null,
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 17 + pI, fontWeight: 700, lineHeight: 1, color: pI >= 2 ? teinteCl : "#F2F6F8", textShadow: pI >= 3 ? "0 0 14px " + tA(0.55) : "none" } }, ixI[0][1]),
                h("div", { style: { fontSize: 10 + pI, letterSpacing: "0.2em", fontWeight: 800, color: pI >= 2 ? teinteCl : "#9AA5AD" } }, ixI[0][0])),
              ixI[0][2] ? h("div", { style: { fontSize: 9.5, color: "#A39D92", marginTop: 4 } }, abrEpreuve(ixI[0][2])) : null,
              ogI.apt ? h("div", { style: { fontSize: 9.5, color: "#9AA5AD", fontStyle: "italic", marginTop: 3 } }, abrEpreuve(ogI.apt)) : null),
            lblI ? h("div", { style: { flexShrink: 0, marginLeft: "auto", textAlign: "center", paddingLeft: 13, borderLeft: "1px solid " + tA(0.3), maxWidth: 120 } },
              h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 13 + pI, fontWeight: 700, color: teinteCl, lineHeight: 1.25 } }, lblI),
              h("div", { style: { fontSize: 7.5, letterSpacing: "0.12em", color: "#A39D92", fontWeight: 700, textTransform: "uppercase", marginTop: 3 } }, T("chevaux de sport", "sport horses", "caballos de deporte", "cavalli sportivi", "\u30b9\u30dd\u30fc\u30c4\u99ac", "Sportpferde", "\u062e\u064a\u0648\u0644 \u0631\u064a\u0627\u0636\u064a\u0629", "运动马", "sportpaarden", "cavalos de esporte", "sporthästar", "спортивные лошади", "konie sportowe", "스포츠 말"))) : null);
        })() : null,

        null, /* 25/08 : pilule Coupes retiree (Blandine) — le rail reste ; l'onglet Resultats etait deja retire (s152) */
        (ongletPerf === "coupes") && (c.flots && c.flots.length) ? h("div", { className: "rise chvCoupes" /* (1149) */, style: { display: "flex", gap: 12, overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "0 16px 6px", marginBottom: 34 /* (901) plus d air sous les coupes (10 -> 34) */ } },
          c.flots.filter(function (fFl) { return fFl && fFl.img; }).map(function (fl, iF) {
            return h("div", { key: "flf" + iF, role: "button", onClick: function () { try { if (fl.img && typeof setVisionneuse === "function") { setVisionneuseAlbumId(null); setVisionneuse(fl.img); } else setPanneau("palmares"); } catch (eFz) { setPanneau("palmares"); } }, style: { flex: "0 0 auto", width: 108, cursor: "pointer", textAlign: "center" } },
              fl.img ? h("img", { src: fl.img, alt: fl.lab || "", style: { width: 108, height: 132, objectFit: "cover", borderRadius: 14, border: "1px solid rgba(217,181,108,0.45)", display: "block" } })
                : h("div", { style: { width: 108, height: 132, borderRadius: 14, border: "1px solid rgba(217,181,108,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, background: "radial-gradient(80% 60% at 50% 30%, rgba(217,181,108,0.2), rgba(6,7,9,0.9))" } }, fl.med === "1" ? "\ud83c\udfc6" : "\ud83c\udfc5"),
              fl.lab ? h("div", { style: { marginTop: 6, fontSize: 8.5, lineHeight: 1.3, color: "rgba(243,238,228,0.75)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, fl.lab) : null);
          }).concat(peutSaisirResultat ? [h("div", { key: "addres2", role: "button", onClick: ouvrirAjoutResultat, style: { flex: "0 0 auto", width: 56, height: 132, border: "1.5px dashed " + tA(0.45), borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: teinteCl, cursor: "pointer" } }, "+")] : [])) : null, /* 30/07 : les coupes/flots de Blandine en vitrine sur la fiche (tap = zoom), avant les medailles */


        /* ═══ 22/08 session 152 — LE RÉSUMÉ DES RÉSULTATS ═══════════════
           Maquette validée par Blandine : structure B (liseré à gauche dans
           la teinte du cheval), fond « Souffle » (la lueur ne touche que le
           coin bas-droit), UN ENCART PAR SACRE avec son année et sa
           catégorie, hauteurs FIXES à 62 px, noms jamais coupés,
           plafond à SEPT puis « et N autres ».
           🟥 Se pose SOUS la carte IPO. Le rail de coupes reste intact.  */
        (function () {
          var lignes = (lignesPourModule || []).filter(function (r) {
            return r && (r.place != null || r.classement);
          });
          /* ═══ 24/08 session 161 — LES LIGNES ÉCRITES EN DUR NE COMPTENT PLUS ═══
             Mesuré ce soir sur Rizotto d Émery : la fiche affichait 51 victoires,
             84 podiums, 147 classés, là où les sept PDF donnent 49 · 81 · 143.
             L écart venait d ici. `lignesPourModule` empile DEUX sources : la
             table `resultats` ET le palmarès écrit en dur dans CHEVAUX_FICHE
             (trois lignes chez Rizotto : deux 1ᵉʳ et une 3ᵉ). Ces trois-là sont
             les MÊMES résultats que ceux des PDF — Bordeaux 2024 Grand Prix et
             Vitesse, l Open de France 2021 que la FFE nomme autrement. Comptés
             deux fois : +2 victoires, +3 podiums.
             🟥 Le commentaire de la fusion prétendait déjà qu elles « ne comptent
             pas dans les Classements ». C était faux : n ayant pas de colonne
             `place`, elles passent par la relecture du TEXTE (`1ᵉʳ`), et nbDe()
             les compte comme n importe quelle autre. Un commentaire n est pas
             un contrat — troisième fois cette semaine.
             DÉCISION DE BLANDINE, 24/08 au soir : elles RESTENT sur la page, dans
             la liste, dans les épinglés, dans « Voir tout son palmarès ». Elles
             sortent des QUATRE NOMBRES uniquement.
             🟥 ON NE FILTRE PAS SUR `origine === "main"`. Le résultat d Equitalyon,
             saisi à la main par Blandine (9ᵉ, sans partants), porte lui aussi
             `main` en base : ce filtre l aurait effacé des compteurs alors que
             c est un VRAI résultat, absent des PDF. On filtre sur l identifiant
             « dur- » que la fusion pose elle-même, et qui n existe que là.
             Attendu après ce correctif : 49 · 81 · 144 (les PDF + Equitalyon). */
          var lignesComptees = lignes.filter(function (r) {
            return !(r && typeof r.id === "string" && r.id.indexOf("dur-") === 0);
          });
          var proprio = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
          if (!lignes.length && !proprio) return null;
          if (!(lignesPourModule || []).length && !(c.flots && c.flots.length)) return null;   /* 10/10 (860) Blandine : « retire la partie avec 0 victoire etc. tant qu il n y a pas de resultats » (proprietaire comprise) */

          function nbDe(r) {
            if (r.place != null) return Number(r.place);
            var m = String(r.classement || "").match(/^\s*(\d+)/);
            return m ? Number(m[1]) : null;
          }
          var faits = lignes.map(function (r) {
            /* 🟥 23/08 : __id ajouté — sans lui, un résultat épinglé ressortait
               DEUX FOIS sur la fiche (une fois en tête, une fois dans la suite). */
            return { pl: nbDe(r), part: r.partants ? Number(r.partants) : null,
                     nom: r.concours || "", ep: r.epreuve || "", cav: r.cavalier || "",
                     an: (r.date_epreuve || "").slice(0, 4), __id: r.id || null };
          }).filter(function (f) { return f.pl != null; });

          /* 🟥 23/08 session 154 — LES QUATRE CHIFFRES, RÉÉCRITS.
             Ce qui n allait pas, mesuré sur les 7 PDF de Rizotto d Émery :
               · « SORTIES » comptait les LIGNES, donc les parcours (178),
                 pas les sorties. Décision de Blandine : une sortie = un
                 déplacement, donc MÊME CONCOURS sur des JOURS CONSÉCUTIFS
                 = UNE sortie. Un week-end ne compte qu une fois. -> 93.
               · « CLASSEMENTS » comptait les quart 1, c est-à-dire le
                 premier quart du peloton, pas les classements. -> devient
                 PODIUMS / CLASSÉS, et le quart n est plus affiché ici.
             Victoires et podiums se comptent sur les parcours, pas sur les
             sorties : gagner deux épreuves dans le week-end, c est deux
             victoires.                                                    */
          /* 🟥 24/08 : `faits` est ce qui S AFFICHE — il garde TOUT, lignes en
             dur comprises. `faitsComptes` est ce qui SE COMPTE. Deux listes,
             deux rôles : c est la seule façon de tenir la décision de Blandine
             (« les laisser sur la page, les retirer du compteur »). */
          var faitsComptes = faits.filter(function (f) {
            return !(f && typeof f.__id === "string" && f.__id.indexOf("dur-") === 0);
          });
          var nV = faitsComptes.filter(function (f) { return f.pl === 1; }).length;
          var nP = faitsComptes.filter(function (f) { return f.pl <= 3; }).length;
          var nC = faitsComptes.length; /* parcours classés */
          var nS = (function () {
            /* regroupe par concours, puis fusionne les jours qui se suivent */
            var parLieu = {};
            lignesComptees.forEach(function (r) {
              var d = String(r.date_epreuve || "");
              if (!d) return;
              var k = String(r.concours || "").toLowerCase().trim();
              (parLieu[k] = parLieu[k] || {})[d] = true;
            });
            var total = 0;
            Object.keys(parLieu).forEach(function (k) {
              var jours = Object.keys(parLieu[k]).sort();
              var prec = null;
              jours.forEach(function (j) {
                var t = Date.parse(j + "T00:00:00Z");
                /* nouveau déplacement si plus d un jour d écart */
                if (prec == null || isNaN(t) || (t - prec) > 86400000) total++;
                if (!isNaN(t)) prec = t;
              });
            });
            return total;
          })();

          faits.sort(function (a, b) {
            var d = (a.pl === 1 ? 0 : a.pl <= 3 ? 1 : 2) - (b.pl === 1 ? 0 : b.pl <= 3 ? 1 : 2);
            if (d !== 0) return d;
            return (b.part || 0) - (a.part || 0);
          });
          /* 🟥 23/08 — LES ÉPINGLÉS D ABORD (décision de Blandine).
             Rien d épinglé  -> les 7 meilleurs calculés, exactement comme avant.
             Des épinglés     -> ils passent devant, les meilleurs remplissent
             derrière jusqu à sept. Le plafond de SEPT ne bouge pas.        */
          var ftsE = faitsPalmares();
          var epgE = epinglesPalmares(ftsE);
          var vus, reste;
          if (epgE.length) {
            var prisE = {};
            var tete = epgE.map(function (f) {
              if (f.id) prisE[f.id] = 1;
              return { pl: f.pl, part: f.part, nom: f.nom, ep: f.ep, cav: f.cav, an: f.an, __ep: true };
            }).filter(function (f) { return f.pl != null; });
            var suite = faits.filter(function (f) {
              return !(f.__id && prisE[f.__id]);
            });
            var fusion = tete.concat(suite);
            vus = fusion.slice(0, 3);
            reste = faits.length - vus.filter(function (f) { return !f.__ep; }).length - tete.length;
            if (reste < 0) reste = 0;
          } else {
            vus = faits.slice(0, 3); reste = faits.length - vus.length;
          }

          function ch(n, lb, or) {
            return h("div", { style: { flex: 1, textAlign: "center" } },
              h("div", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: 23, lineHeight: 1,
                color: or ? "#D6C4A1" : "#F3EEE4" } }, String(n)),
              h("div", { style: { fontSize: 7.5, letterSpacing: "0.13em", textTransform: "uppercase",
                color: "#A39D92", marginTop: 5, fontWeight: 700 } }, lb));
          }

          /* 22/08 : le bloc est le CHEMIN vers l'import. Sans lui, le bouton
             n'était plus atteignable depuis le retrait de la pilule
             « Résultats » — Blandine l'a trouvé par hasard.            */
          if (true) return null;   /* 13/10 (1079) Blandine : « la partie entouree tu peux la faire sauter » : la carte « En concours » (compteurs + Voir tout son palmares) n est plus affichee ; « Voir tout » est porte par le titre « Derniers resultats ». Code garde. */
          return h("div", {
            /* 🟥 23/08 : ce bloc disait « bientôt » des qu il y avait un resultat.
               Il ouvre desormais la page des resultats (panneau palmares).
               Sans resultat et si c est son cheval, il ouvre toujours l import. */
            onClick: function () {
              if (!faits.length && proprio) { ouvrirImportFFE(); return; }
              setPanneau("palmares");
            },
            style: {
              margin: "28px 16px 0", borderRadius: 16, overflow: "hidden", cursor: "pointer",   /* (1071) 14 -> 28 */
              border: "1px solid rgba(214,196,161,0.28)",   /* (1071) filet champagne, comme les tuiles */
              /* (902) trait dore a gauche retire */
              /* le « Souffle » : la lueur ne prend qu'au coin bas-droit */
              background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)",   /* (1071) fond des tuiles de l accueil */
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 6px 22px rgba(0,0,0,0.38)"
            }
          },
            h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "13px 15px 0" } },
              h("span", { style: { fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 800, color: "#A39D92" } },
                T("En concours", "In competition", "En concurso", "In gara", "\u7af6\u6280", "Im Turnier", "\u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062a", "比赛中", "In wedstrijden", "Em competição", "På tävling", "На соревнованиях", "W zawodach", "대회 출전")),
              h("span", { style: { marginLeft: "auto", fontSize: 15, color: "rgba(243,238,228,0.3)" } }, "\u203a")),

            h("div", { style: { display: "flex", gap: 8, padding: "12px 15px 0" } },
              ch(nS, T("Sorties", "Outings", "Salidas", "Uscite", "\u51fa\u5834", "Turniertage", "\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0627\u062a", "外出活动", "Uitstapjes", "Passeios", "Utflykter", "Выезды", "Wyjazdy", "외승")),
              ch(nV, T("Victoires", "Wins", "Victorias", "Vittorie", "\u512a\u52dd", "Siege", "\u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", "冠军", "Overwinningen", "Vitórias", "Segrar", "Победы", "Zwycięstwa", "우승"), true),
              ch(nP, T("Podiums", "Podiums", "Podios", "Podi", "\u5165\u8cde", "Podien", "\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u062a\u062a\u0648\u064a\u062c", "领奖台", "Podiums", "Pódios", "Prispallsplaceringar", "Пьедесталы", "Podia", "시상대")),
              ch(nC, T("Class\u00e9s", "Placed", "Clasificados", "Piazzamenti", "\u5165\u8cde\u570f", "Platziert", "\u0627\u0644\u0645\u0635\u0646\u0641", "获得名次", "Geplaatst", "Classificados", "Placerade", "Призёры", "Sklasyfikowane", "입상"))),

            /* 13/10 (1071) la liste des 3 derniers resultats est retiree d ici : les memes resultats sont juste dessous en cartes (doublon) */
            (false && faits.length) ? h("div", { style: { marginTop: 13, borderTop: "1px solid rgba(255,255,255,0.07)" } },
              vus.map(function (f, iF) {
                return h("div", { key: "hf" + iF, style: {
                  display: "flex", alignItems: "center", gap: 10, padding: "0 14px", height: 62,
                  borderBottom: iF < vus.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none" } },
                  h("span", { style: { flex: "0 0 40px", textAlign: "center",
                    fontFamily: "'Cinzel',Georgia,serif", fontSize: 15, lineHeight: 1,
                    color: f.pl === 1 ? "#D6C4A1" : "rgba(243,238,228,0.5)" } },
                    String(f.pl) + (f.pl === 1 ? "er" : "e")),
                  h("span", { style: { flex: 1, minWidth: 0, overflow: "hidden" } },
                    h("span", { style: { fontSize: 12.5, fontWeight: 600, color: "#F3EEE4",
                      lineHeight: 1.28, display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden" } }, f.nom),
                    h("span", { style: { display: "block", fontSize: 10, color: "#A39D92",
                      marginTop: 3, whiteSpace: "nowrap", overflow: "hidden",
                      textOverflow: "ellipsis" } },
                      [f.ep, f.part ? (String(f.pl) + (f.pl === 1 ? "er" : "e") + " sur " + f.part) : null].filter(Boolean).join(" \u00b7 "),
                      f.cav ? " \u00b7 " : null,
                      f.cav ? h("span", { style: { color: "#F3EEE4", fontWeight: 700 } }, f.cav) : null)), /* 26/08 : le cavalier en BLANC GRAS (demande Blandine) */
                  f.an ? h("span", { style: { flex: "0 0 38px", textAlign: "right", fontSize: 10.5,
                    color: "#7D776D", fontFamily: "'Cinzel',Georgia,serif" } }, f.an) : null);
              }),
              false /* (902) « et N autres » retire, doublon du lien Voir tout */ && reste > 0 ? h("div", { style: { padding: "9px 15px", textAlign: "center",
                fontSize: 10.5, color: "#A39D92" } },
                T("et " + reste + " autre" + (reste > 1 ? "s" : ""),
                  "and " + reste + " more", "y " + reste + " m\u00e1s",
                  "e altri " + reste, "\u4ed6 " + reste + " \u4ef6",
                  "und " + reste + " weitere", "\u0648" + reste + " \u0623\u062e\u0631\u0649", "还有 " + reste + " 个" + (reste > 1 ? "" : ""), "en " + reste + " andere", "e mais " + reste + " outro" + (reste > 1 ? "s" : ""), ("och " + reste + " till"), ("и ещё " + reste), ("i " + reste + " " + (reste === 1 ? "inny" : (reste % 10 >= 2 && reste % 10 <= 4 && (reste % 100 < 10 || reste % 100 >= 20)) ? "inne" : "innych")), ("외 " + reste + "개"))) : null) : null,

            h("div", { style: { marginTop: 13, padding: "11px 16px 13px", textAlign: faits.length ? "end" : "center" /* (902) lien en bas a droite */, fontSize: 11,
              fontWeight: 700, letterSpacing: "0.04em", color: teinteCl,
              borderTop: "1px solid rgba(255,255,255,0.07)" } },
              faits.length
                ? T("Voir tout son palmar\u00e8s \u2192", "See the full record \u2192",
                    "Ver todo su palmar\u00e9s \u2192", "Vedi tutto il palmar\u00e8s \u2192",
                    "\u5168\u3066\u306e\u6210\u7e3e \u2192", "Alle Erfolge ansehen \u2192", "\u0639\u0631\u0636 \u0633\u062c\u0644\u0647 \u0627\u0644\u0643\u0627\u0645\u0644 \u2192", "查看完整战绩 →", "Bekijk het hele palmares →", "Ver todo o seu histórico de resultados →", "Se hela meritlistan →", "Смотреть все её достижения →", "Zobacz cały jego dorobek →", "수상 기록 모두 보기 →")
                : T("Aucun r\u00e9sultat pour l'instant", "No results yet", "A\u00fan sin resultados",
                    "Nessun risultato", "\u307e\u3060\u6210\u7e3e\u306f\u3042\u308a\u307e\u305b\u3093",
                    "Noch keine Ergebnisse", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u062d\u0627\u0644\u064a\u0627", "暂时还没有成绩", "Nog geen resultaten", "Nenhum resultado por enquanto", "Inga resultat ännu", "Пока нет результатов", "Na razie brak wyników", "아직 결과가 없어요")));
        })(),

        /* ═══ 25/08 session 163 — LE BLOC DÉCOUVERTE, À SA VRAIE PLACE ═══
           🟥 IL EST ICI, SOUS LE RÉSUMÉ, ET SURTOUT **HORS DE L ENCART**.
           Premier jet du 24/08 : posé a la fin du panneau `palmares`, donc
           tout en bas des 144 resultats — invisible sans derouler la page
           entiere. Blandine : « je vois les videos nulle part ».
           🟥 ET IL NE DOIT JAMAIS ENTRER DANS L ENCART DU RESUME : cet
           encart porte lui-meme un onClick qui ouvre la page du palmares.
           Un bouton pose dedans declenche LES DEUX — c est exactement ce que
           Blandine a vu : « quand j appuie sur telecharger resultats ca
           m emmene direct sur les resultats ».
           Remplace le bouton en pointilles dore qui vivait ici.
           Maquettes validees le 24/08 au soir :
           · video centree 280 px, image de couverture, muette, en boucle ;
           · phrase entre DEUX FILETS COURTS, Cormorant italique, AUCUNE
             couleur — elle ne bouge pas sur une fiche doree ou crimson ;
           · bouton a LISERE, aucun fond, libelle « officiels ».
           🟥 La video et la phrase sont une VITRINE : tout le monde les voit.
              Seul le bouton est reserve a la proprietaire, et une visiteuse
              n a RIEN a sa place. */
        h("div", { style: { margin: "0 16px 0" /* (1087) 34 -> 0 : le bloc est vide */ } },
          /* 10/10 (819) Blandine : « la video pour mettre ses resultats en ligne, on ne devrait pas la voir sur la page des chevaux qu on visite ».
             La vitrine (video + phrase) n est plus montree qu a la proprietaire du cheval et a ses cavalieres liees ; le bouton garde sa regle. */
          true /* 13/10 (1087) Blandine : « retire l acces a la petite video masquee » : plus de « Voir la petite video » sur la fiche ; la video est sur la page Performances (sous la video de ceremonie) */ ? null : (!(chevalDyn && moi && chevalDyn.ownerId === moi.id)) ? null :   /* (826) proprietaire SEULE : un cheval ajoute a « mes chevaux persos » (lien) reste un cheval visite (capture Hey Baby Please) */
          ((!montrerVideoPalm) ? h("div", { style: { textAlign: "center", padding: "2px 0" } }, h("span", { onClick: function () { setMontrerVideoPalm(true); }, style: { fontSize: 12.5, color: "rgba(243,238,228,.45)", fontStyle: "italic", fontFamily: "'Cormorant Garamond',Georgia,serif", cursor: "pointer", letterSpacing: ".02em" } }, hypeT7("Voir la petite vid\u00e9o \u25b8", "Watch the short video \u25b8", "Ver el v\u00eddeo \u25b8", "Guarda il video \u25b8", "\u77ed\u3044\u52d5\u753b\u3092\u898b\u308b \u25b8", "Kurzes Video ansehen \u25b8", "\u0645\u0634\u0627\u0647\u062f\u0629 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0627\u0644\u0642\u0635\u064a\u0631 \u25b8", "观看小视频 ▸", "Bekijk de korte video ▸", "Ver o vídeo rápido ▸", "Se den lilla videon ▸", "Смотреть короткое видео ▸", "Zobacz krótki film ▸", "짧은 동영상 보기 ▸")   /* 10/10 (839) Blandine : « laisse-la masquee par defaut, juste la petite phrase pour l afficher » */)) : h(React.Fragment, null, 
          h("div", { style: { position: "relative", width: "100%", maxWidth: 280, margin: "0 auto",
                              borderRadius: 16, overflow: "hidden", background: "#000",
                              border: "1px solid rgba(255,255,255,.07)" } },
            h("video", { src: "palmares-video-2.mp4?v=1", poster: "palmares-video-2.jpg?v=1",
                         autoPlay: true, muted: true, loop: true, playsInline: true,
                         "webkit-playsinline": "true", preload: "metadata",
                         onClick: function (eV) { try { eV.stopPropagation(); var v = eV.currentTarget;
                           if (v.requestFullscreen) v.requestFullscreen();
                           else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); } catch (eF) { } },
                         style: { width: "100%", display: "block" } }),
            h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: "32%",
                                pointerEvents: "none",
                                background: "linear-gradient(180deg,rgba(6,7,9,0),rgba(6,7,9,.9))" } })),
          h("div", { style: { position: "relative", margin: "26px auto 0", maxWidth: "17em",
                              padding: "19px 0", textAlign: "center" } },
            h("div", { style: { position: "absolute", top: 0, left: "32%", right: "32%",
                                height: 1, background: "#2A323D" } }),
            h("div", { style: { fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
                                fontSize: 24, lineHeight: 1.3, fontWeight: 400, color: "#F3EEE4" } },
              T("Tes résultats officiels, à redécouvrir sur Hype.",
                "Your official results, to rediscover on Hype.",
                "Tus resultados oficiales, para redescubrir en Hype.",
                "I tuoi risultati ufficiali, da riscoprire su Hype.",
                "公式成績を Hype で見つけ直そう。",
                "Deine offiziellen Ergebnisse, neu entdeckt auf Hype.", "\u0646\u062a\u0627\u0626\u062c\u0643 \u0627\u0644\u0631\u0633\u0645\u064a\u0629\u060c \u0644\u062a\u0639\u064a\u062f\u064a \u0627\u0643\u062a\u0634\u0627\u0641\u0647\u0627 \u0639\u0644\u0649 Hype.", "你的官方成绩，在 Hype 上重新发现。", "Je officiële resultaten, om opnieuw te ontdekken op Hype.", "Seus resultados oficiais, para redescobrir no Hype.", "Dina officiella resultat, att återupptäcka på Hype.", "Твои официальные результаты — теперь в Hype.", "Twoje oficjalne wyniki, do ponownego odkrycia w Hype.", "내 공식 결과를 Hype에서 다시 만나 보세요.")),
            h("div", { style: { position: "absolute", bottom: 0, left: "32%", right: "32%",
                                height: 1, background: "#2A323D" } })))),
          /* 10/10 (860) Blandine : sans resultat, « laisser juste la phrase sous la video, et le bouton importer » */
          (!((palmTous && palmTous.length) || (c.flots && c.flots.length))) ? h("div", { className: "rise", role: "button", onClick: function () { if (peutSaisirResultat) ouvrirAjoutResultat(); else setPanneau("palmares"); }, style: { border: "1.5px dashed " + tA(0.4), borderRadius: 16, padding: "20px 16px", textAlign: "center", cursor: "pointer", animationDelay: ".17s", marginTop: 18, marginBottom: 4 } },
            h("div", { style: { fontStyle: "italic", fontSize: 12.5, color: "#C9CFD4", lineHeight: 1.55 } }, T("Ses premiers r\u00e9sultats l'attendent. Ajoute son premier concours, sa premi\u00e8re sortie\u2026 ou ses exploits.", "Their first results are waiting. Add a first show, a first outing\u2026 or their feats.", "Sus primeros resultados le esperan. A\u00f1ade su primer concurso, su primera salida\u2026 o sus haza\u00f1as.", "I suoi primi risultati lo aspettano. Aggiungi il primo concorso, la prima uscita\u2026 o le sue imprese.", "\u521d\u3081\u3066\u306e\u7d50\u679c\u304c\u5f85\u3063\u3066\u3044\u307e\u3059\u3002\u521d\u3081\u3066\u306e\u5927\u4f1a\u3084\u304a\u51fa\u304b\u3051\u3092\u8ffd\u52a0\u3057\u3088\u3046\u3002", "Seine ersten Ergebnisse warten. F\u00fcge den ersten Wettkampf, den ersten Ausritt\u2026 oder seine Heldentaten hinzu.", "\u0646\u062a\u0627\u0626\u062c\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 \u0641\u064a \u0627\u0646\u062a\u0638\u0627\u0631\u0647. \u0623\u0636\u064a\u0641\u064a \u0623\u0648\u0644 \u0645\u0633\u0627\u0628\u0642\u0629 \u0644\u0647\u060c \u0623\u0648\u0644 \u0645\u0634\u0627\u0631\u0643\u0629\u2026 \u0623\u0648 \u0625\u0646\u062c\u0627\u0632\u0627\u062a\u0647.", "它的第一批成绩正等着你。添加它的第一场比赛、第一次出场……或者它的精彩表现吧。", "Zijn eerste resultaten wachten op hem. Voeg zijn eerste wedstrijd, zijn eerste uitstapje… of zijn prestaties toe.", "Os primeiros resultados dele estão esperando. Adicione a primeira competição, a primeira saída… ou as façanhas dele.", "Dess första resultat väntar. Lägg till första tävlingen, första utflykten… eller dess bedrifter.", "Её первые результаты ещё впереди. Добавь её первые соревнования, первый выезд… или её победы.", "Czekają na niego pierwsze wyniki. Dodaj jego pierwsze zawody, pierwszy start… albo jego osiągnięcia.", "첫 결과가 기다리고 있어요. 첫 대회나 첫 출전, 또는 멋진 성과를 추가해 보세요.")),
            h("div", { style: { marginTop: 10, fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", color: teinteCl, fontWeight: 700 } }, "+ " + T("Ajouter un r\u00e9sultat", "Add a result", "A\u00f1adir resultado", "Aggiungi risultato", "\u7d50\u679c\u3092\u8ffd\u52a0", "Ein Ergebnis hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가"))) : null,
          /* 13/10 (1092) Blandine : « est-ce qu on a vraiment besoin de la fleche ? on pourrait plutot mettre « ajouter un resultat ou importer
             mes resultats officiels » et retirer le « ajouter un resultat » sous les resultats recents ». Une seule ligne, chaque partie ouvre
             son outil, chacune avec ses droits d avant (ajout : peutSaisirResultat ; import : proprietaire, lie, moderatrice, meme ecurie). */
          (function () {
            var peutImp = !!(chevalDyn && moi && (chevalDyn.ownerId === moi.id || estLieFiche || estModerateurHype(moi) || memeEcurieCh));
            var peutAj = !!peutSaisirResultat;
            if (!peutImp && !peutAj) return null;
            var stLien = { color: "#DCCBAA", cursor: "pointer", WebkitTapHighlightColor: "transparent" };
            var aj = T("Ajouter un résultat", "Add a result", "Añadir un resultado", "Aggiungi un risultato", "結果を追加", "Ein Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가");
            var imp = T("importer mes résultats officiels", "import my official results", "importar mis resultados oficiales", "importare i miei risultati ufficiali", "公式成績を取り込む", "meine offiziellen Ergebnisse importieren", "استيراد نتائجي الرسمية", "导入我的官方成绩", "mijn officiële resultaten importeren", "importar meus resultados oficiais", "importera mina officiella resultat", "загрузить мои официальные результаты", "zaimportować moje oficjalne wyniki", "내 공식 결과 가져오기");
            var impSeul = T("Importer mes résultats officiels", "Import my official results", "Importar mis resultados oficiales", "Importa i miei risultati ufficiali", "公式成績を取り込む", "Meine offiziellen Ergebnisse importieren", "استيراد نتائجي الرسمية", "导入我的官方成绩", "Mijn officiële resultaten importeren", "Importar meus resultados oficiais", "Importera mina officiella resultat", "Импортировать мои официальные результаты", "Importuj moje oficjalne wyniki", "공식 결과 가져오기");
            return h("div", { style: { margin: "6px 0 18px", padding: "10px 8px", textAlign: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 15.5 /* (1092) tient sur une ligne */, lineHeight: 1.35, color: "rgba(243,238,228,0.55)" } },
              peutAj ? h("span", { role: "button", onClick: function (eA) { try { eA.stopPropagation(); } catch (eS) { } ouvrirAjoutResultat(); }, style: stLien }, aj) : null,
              (peutAj && peutImp) ? (" " + T("ou", "or", "o", "o", "または", "oder", "أو", "或", "of", "ou", "eller", "или", "lub", "또는") + " ") : null,
              peutImp ? h("span", { role: "button", onClick: function (eI) { try { eI.stopPropagation(); } catch (eS) { } ouvrirImportFFE(); }, style: stLien }, peutAj ? imp : impSeul) : null);
          })()),

        /* 13/10 (1079) Blandine : « mets le visuel de la v2 pour les derniers resultats et les principaux resultats, en adaptant la couleur
           au reste de la page » : titre de section + « Voir tout › », cartes, « + Ajouter un resultat » en texte, puis « Principaux resultats ». */
        (ongletPerf === "resultats" && palmTous && palmTous.length) ? enteteResV1(T("Derniers résultats", "Latest results", "Últimos resultados", "Ultimi risultati", "最新の成績", "Letzte Ergebnisse", "آخر النتائج", "最近成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Ostatnie wyniki", "최근 결과"), function () { setPanneau("palmares"); }, "22px 16px 16px" /* 13/10 (1093) ecart unique de 40 px entre les chapitres (mesure) */) : null,
        (ongletPerf === "resultats" && palmTous && palmTous.length) ? h("div", { className: "rise", style: { display: "flex", gap: 10, overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "0 16px 4px" /* (1079) marges de la V2 */, alignItems: "stretch" /* 13/10 (1093) Blandine : « aligne les cartes de resultat sur la meme hauteur » (textes deja limites a 2 lignes) */, scrollbarWidth: "none", animationDelay: ".17s", marginBottom: 16 } },
          /* 02/09 (Blandine : « je veux la meme chose que sur l ecurie ») — LA CARTE DU
             RAIL REPREND CELLE DE LA PAGE ECURIE, maquette qu elle a validee le 01/09 :
             medaille + annee, PUIS le portrait rond, PUIS « 1er CAVALIER sur CHEVAL »,
             PUIS le concours, l epreuve et le nombre de partants, PUIS les autres
             classes de la meme epreuve, en petit.
             ⚠️ L ancienne carte affichait « concours · annee » avec une epreuve
             TOUJOURS VIDE : `ds` etait ecrit en dur a "" dans palmTous alors que la
             colonne `epreuve` existe en base. On repart donc de resDb, pas de palmTous.
             ⚠️ LE CHEVAL N EST NOMME QU UNE FOIS (« t as ecrit Rizotto deux fois »).
             ⚠️ SANS PHOTO, PAS DE TROU : le medaillon n est pas dessine du tout. */
          (function () {
            var grpF = {}, ordreF = [];
            ((resDb) || []).forEach(function (rr) {
              if (!rr) return;
              if (rr.visible === false && !voirMasques) return;
              var cle = String(rr.concours || "") + "|" + String(rr.epreuve || "") + "|" + String(rr.date_epreuve || rr.annee || "");
              if (!grpF[cle]) {
                var anF = rr.annee ? String(rr.annee) : (function () { try { var yF = new Date(rr.date_epreuve || rr.created_at).getFullYear(); return isFinite(yF) ? String(yF) : ""; } catch (eA) { return ""; } })();   /* (1071) jamais « NaN » sans date */
                grpF[cle] = { concours: rr.concours || "", epreuve: rr.epreuve || "", an: anF, partants: rr.partants || null, places: [] };
                ordreF.push(cle);
              }
              grpF[cle].places.push({ rang: parseInt(rr.classement, 10) || null, cavalier: rr.cavalier || "" });
              if (!grpF[cle].partants && rr.partants) grpF[cle].partants = rr.partants;
            });
            /* 03/09 (Blandine) : 15 cartes, chiffre choisi PAR ELLE. J'avais coupe a 8
               sans demander — « ah, coupe pas sans demander » — apres avoir justement
               retire le « 1 album par cheval » et les « 10 photos » que j'avais poses
               moi-meme. Aucun plafond en base : la requete charge tous les resultats du
               cheval ; les cartes sont groupees par concours + epreuve, donc 15 cartes
               valent souvent bien plus de 15 lignes. Le reste par « Voir tout son
               palmares ». NE PAS CHANGER CE CHIFFRE SANS LE LUI DEMANDER. */
            return ordreF.slice(0, 15).map(function (cle, iR) {
              var gr = grpF[cle];
              var tries = (gr.places || []).slice().sort(function (a5, b5) { return (a5.rang || 99) - (b5.rang || 99); });
              var meilleur = tries[0] || {};
              var coup = meilleur.rang === 1 ? "\ud83c\udfc6" : meilleur.rang === 2 ? "\ud83e\udd48" : meilleur.rang === 3 ? "\ud83e\udd49" : "\ud83c\udf96\ufe0f";
              var rangTxt = meilleur.rang ? (String(meilleur.rang) + (meilleur.rang === 1 ? "er" : "e")) : "";
              var nomChF = (chevalDyn && chevalDyn.nom) || c.nom || "";
              return h("div", { key: "rf" + iR, role: "button", onClick: function () { setPanneau("palmares"); },
                style: { flex: "0 0 calc((100% - 20px) / 3)" /* (913) 3 cartes visibles au lieu de 2 et demie */, minWidth: 0, boxSizing: "border-box", padding: "8px 7px 9px" /* (1071) plus compactes */, borderRadius: 14, background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)" /* (1077) */, border: "1px solid " + tA(0.32), boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer" } },
                h("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" } },
                  h("span", { style: { fontSize: 14, lineHeight: 1 } }, coup),   /* (1071) 18 -> 14 */
                  gr.an ? h("span", { style: { marginLeft: "auto", fontSize: 9, color: teinteCl, letterSpacing: ".12em", fontFamily: "'Montserrat',sans-serif" } }, gr.an) : null),
                photoCh ? h("img", { src: photoCh, alt: "", loading: "lazy", onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (e9) { } }, style: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", marginTop: 6 /* (1071) 50 -> 34 */, border: "1px solid rgba(255,255,255,0.16)" } }) : null,
                h("div", { style: { fontSize: 9.5, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#F3EEE4", marginTop: 6, lineHeight: 1.28, overflowWrap: "anywhere" } },   /* (1071) */
                  h("bdi", null, (rangTxt ? (rangTxt + " ") : "") + (meilleur.cavalier || "")) /* 19/10 (soir) : ordre des mots en arabe */,
                  nomChF ? h("span", { style: { color: teinteCl, fontWeight: 600 } }, " sur " + nomChF) : null),
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 9.5, fontWeight: 700, color: "#F3EEE4", marginTop: 6, lineHeight: 1.22, overflowWrap: "anywhere", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } }, gr.concours || "\u2014"),   /* (1089) 2 lignes maximum */   /* (1071) */
                gr.epreuve ? h("div", { style: { fontSize: 9, color: "#A39D92", fontFamily: "'Montserrat',sans-serif", marginTop: 3, lineHeight: 1.3, overflowWrap: "anywhere", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } }, gr.epreuve) : null,   /* (1089) */
                gr.partants ? h("div", { style: { fontSize: 9, color: "#7D776D", fontFamily: "'Montserrat',sans-serif", marginTop: 4 } }, "/ " + gr.partants) : null,
                (function () {
                  /* 13/10 (1084) Blandine : « les cartes derniers resultats sont trop longues » : la liste des autres classes (jusqu a 3 lignes,
                     qui allongeait TOUTES les cartes de la rangee) devient une seule ligne « + N autres classés » */
                  var nAutres = tries.slice(1).filter(function (pp) { return pp && (pp.rang || pp.cavalier); }).length;
                  if (!nAutres) return null;
                  return h("div", { style: { marginTop: 6, fontSize: 9.5, color: "rgba(243,238,228,0.55)", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.3 } },
                    "+ " + nAutres + " " + (nAutres > 1 ? T("autres classés", "others placed", "otros clasificados", "altri classificati", "人が入賞", "weitere platziert", "\u0622\u062e\u0631\u0648\u0646 \u0645\u0635\u0646\u0641\u0648\u0646", "其他获得名次者", "andere geplaatste", "outros classificados", "andra placerade", "других призёров", "pozostałych sklasyfikowanych", "명 더 입상") : T("autre classé", "other placed", "otro clasificado", "altro classificato", "人が入賞", "weiterer platziert", "\u0622\u062e\u0631 \u0645\u0635\u0646\u0641", "另一位获得名次者", "andere geplaatste", "outro classificado", "annan placerad", "другой призёр", "inny sklasyfikowany", "명 더 입상")));
                })());
            });
          })()
          .concat((false && peutSaisirResultat) /* (1079) remplace par « + Ajouter un resultat » sous les cartes */ ? [h("div", { key: "addresF", role: "button", onClick: function (eAj) { try { eAj.stopPropagation(); } catch (eS2) { } ouvrirAjoutResultat(); }, style: { flex: "0 0 auto", width: 64, border: "1.5px dashed " + tA(0.45), borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: teinteCl, cursor: "pointer" } }, "+")] : []))
        : null /* 10/10 (860) l encadre « Ses premiers resultats l attendent » est monte sous la video, au-dessus du bouton d import */,
        (false /* 13/10 (1092) retire : l ajout est dans la ligne « Ajouter un resultat ou importer… » */ && ongletPerf === "resultats" && palmTous && palmTous.length && peutSaisirResultat) ? h("div", { style: { margin: "12px 16px 0", textAlign: "end" } },
          h("button", { type: "button", onClick: function () { ouvrirAjoutResultat(); }, style: { background: "none", border: "none", padding: "6px 2px", color: "#D6C4A1", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15.5, cursor: "pointer" } },
            "+ " + T("Ajouter un résultat", "Add a result", "Añadir resultado", "Aggiungi risultato", "結果を追加", "Ergebnis hinzufügen", "إضافة نتيجة", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가"))) : null,
        (function () {   /* (1079) PRINCIPAUX RESULTATS — meilleurs classements (a classement egal, le plus recent), une ligne par epreuve */
          if (ongletPerf !== "resultats" || !(resDb && resDb.length)) return null;
          var grpP = {}, ordreP = [];
          resDb.forEach(function (rP) {
            if (!rP || (rP.visible === false && !voirMasques)) return;
            var cleP = String(rP.concours || "") + "|" + String(rP.epreuve || "") + "|" + String(rP.date_epreuve || rP.annee || "");
            var plP = parseInt(rP.classement, 10); if (!isFinite(plP) || plP <= 0) plP = null;
            if (!grpP[cleP]) { var yP = rP.annee ? String(rP.annee) : (function () { try { var y = new Date(rP.date_epreuve || "").getFullYear(); return isFinite(y) ? String(y) : ""; } catch (eY) { return ""; } })(); grpP[cleP] = { nom: String(rP.concours || "").trim(), ep: String(rP.epreuve || "").trim(), d: String(rP.date_epreuve || ""), an: yP, part: rP.partants || null, pl: null, cav: "" }; ordreP.push(cleP); }
            if (plP != null && (grpP[cleP].pl == null || plP < grpP[cleP].pl)) { grpP[cleP].pl = plP; grpP[cleP].cav = String(rP.cavalier || "").trim(); }
            if (!grpP[cleP].part && rP.partants) grpP[cleP].part = rP.partants;
          });
          var lP = ordreP.map(function (k) { return grpP[k]; }).filter(function (g) { return g.pl != null; })
            .sort(function (a1, b1) { return (a1.pl - b1.pl) || String(b1.d || b1.an).localeCompare(String(a1.d || a1.an)); }).slice(0, 3);
          if (!lP.length) return null;
          return h("section", { style: { margin: "36px 16px 0" /* 13/10 (1093) ecart unique de 40 px entre les chapitres (mesure) */ } },
            enteteResV1(T("Principaux résultats", "Major results", "Resultados destacados", "Risultati principali", "主な成績", "Wichtigste Ergebnisse", "أبرز النتائج", "主要成绩", "Belangrijkste resultaten", "Principais resultados", "Viktigaste resultat", "Главные результаты", "Najważniejsze wyniki", "주요 결과"), function () { setPanneau("palmares"); }, "0 0 16px"),
            h("div", { style: { border: "1px solid rgba(214,196,161,0.30)", borderRadius: 16, background: "linear-gradient(165deg, #111B1F 0%, #0B1215 100%)", overflow: "hidden" } },
              lP.map(function (g, iP) {
                var podium = g.pl <= 3;
                return h("div", { key: "pr" + iP, role: "button", onClick: function () { setPanneau("palmares"); }, style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderTop: iP ? "1px solid rgba(214,196,161,0.14)" : "none", cursor: "pointer" } },
                  h("div", { style: { flex: 1, minWidth: 0 } },
                    h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, lineHeight: 1.2, color: "#F3EEE4", overflowWrap: "anywhere" } }, g.nom || "\u2014"),
                    g.ep ? h("div", { style: { marginTop: 2, fontFamily: "'Montserrat',sans-serif", fontSize: 11.5, color: "rgba(243,238,228,0.62)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, g.ep + (g.an ? " \u00b7 " + g.an : "")) : null,
                    g.cav ? h("div", { style: { marginTop: 2, fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(243,238,228,0.78)" } }, g.cav) : null),
                  h("span", { style: { flexShrink: 0, minWidth: 46, textAlign: "center", padding: "5px 9px", borderRadius: 999, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, lineHeight: 1, whiteSpace: "nowrap", color: podium ? "#DCCBAA" : "rgba(243,238,228,0.8)", fontWeight: g.pl === 1 ? 700 : 500, background: podium ? "rgba(214,196,161,0.12)" : "rgba(243,238,228,0.05)", border: "1px solid " + (podium ? "rgba(214,196,161,0.6)" : "rgba(243,238,228,0.14)") } },
                    String(g.pl) + (g.pl === 1 ? "er" : "e"), g.part ? h("span", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10, opacity: 0.75 } }, " / " + g.part) : null),
                  h("span", { "aria-hidden": "true", style: { color: "rgba(214,196,161,0.8)", fontSize: 15 } }, "\u203a"));
              })));
        })(),

        /* 31/07 : l IPO vit dans le chapitre Performances (decision Blandine) */
        cristal("medias"),
        h("div", { id: "chapMedias", style: { position: "relative" } },
          null /* (902) titre vertical Medias retire */,
          h("div", { style: { minWidth: 0 } },  h("div", { id: "chapMedias" }, h(AlbumsPromus, { cible: cibleCh, sansTitre: true, sansDefile: true, sansAlbums: true /* (1036) Blandine : des photos au lieu des albums */, teinte: teinte, photoDefaut: photoCh, onOuvrirMedia: function (uM) { try { setVisionneuseAlbumId(null); setVisionneuse(uM); } catch (eOm) { } }, onVideosTrouvees: setChVids, onVoirVideos: function () { setPanneau("videos"); }, onTout: function () { setPanneau("photos"); }, onOuvrir: function (idAlb) { try { if (typeof window !== "undefined") window.__albumOuvert = idAlb; } catch (eAO) { } setPanneau("photos"); } }),
            /* 12/10 (1036) Blandine : « mets des photos au lieu des albums sur la page cheval » -> l encart « Les moments recents »
               de la page Photos (memes photos, meme photo etoilee en grand), lecture seule ; le bouton ouvre la page Photos. */
            h(ChronologieSouvenirs, { key: "souv-fiche-" + ((chevalDyn && chevalDyn.dbId) || ""), mode: "fiche", chevalId: (chevalDyn && chevalDyn.dbId) || null, nomCheval: String((c && c.nom) || ""),
              vedetteUrl: (chevalDyn && chevalDyn.galerie_vedette_url && typeof urlNue === "function") ? urlNue(chevalDyn.galerie_vedette_url) : null,
              teinte: teinte, teinteCl: teinteCl,
              onVoirTout: function () { setPanneau("photos"); },
              onOuvrir: function (uV, albIdV) { setVisionneuseAlbumId(albIdV || null); setVisionneuse(uV); },
              onAjouter: function () { setPanneau("photos"); } })) /* 29/08 : les medias renvoyaient sur Souvenirs, qui n'a plus de photos depuis le decoupage — ils ouvrent desormais la page Photos */,
        /* 30/07: banniere Hype Memories retiree — redondante avec la carte Toutes ses photos */

        /* 30/07: encart Clinique retire de la fiche (doublon avec la carte Sante du carrousel) — emplacement reserve au futur encart Videos */)),
        /* 🟥 05/09 (Blandine : "retire le fil pour l'instant, il y en a un deuxieme sur la
           page cheval elle-meme") — cet apercu compact du Fil (rail, sur la page d accueil du
           cheval, AVANT tout onglet) est retire : il faisait doublon avec la page Actualite
           (le 5e onglet, deja construit le 29/08, volontairement grise "Prochainement" tant que
           Blandine n a pas decide qui peut publier). Signe qu il n avait plus sa place ici : son
           lien "Tout le fil" rouvrait l onglet Souvenirs, qui ne montre plus le Fil depuis le
           29/08 non plus. Rien d autre ne bouge : Souvenirs, Photos, Performances, Videos et la
           carte Partager sa fiche restent identiques. Le Fil complet (MurHype) et l onglet
           Actualite existent toujours dans le code, prets pour quand Blandine voudra les ouvrir. */
        /* 25/08 : chapitre Sante & sellerie RETIRE de la fiche (cartes Clinique veterinaire + Sellerie) — decision Blandine ; les ecrans clinique/sellerie restent atteignables depuis leurs autres portes */
        cristal("partage"), h("div", { style: { position: "relative" } }, /* 02/08 : conteneur positionne ajoute — le titre vertical s ancrait a un ancetre lointain et se posait par-dessus le titre d un autre chapitre (bug signale par Blandine) */
          null /* (902) titre vertical Liens & partage retire */,
        h("div", { className: "share rise", style: { position: "relative", animationDelay: ".18s" } },
          h("div", { className: "row" },
            h("div", { className: "txt" },
              h("div", { className: "t" }, T("Partager sa fiche", "Share this profile", "Compartir ficha", "Condividi la scheda", "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u5171\u6709", "Profil teilen", "\u0645\u0634\u0627\u0631\u0643\u0629 \u0635\u0641\u062d\u062a\u0647", "分享它的资料", "Deel je profiel", "Compartilhar sua ficha", "Dela profilen", "Поделиться карточкой", "Udostępnij jego profil", "프로필 공유하기")),
              h("div", { className: "s" }, T("Avec ton entra\u00eeneur, ton \u00e9curie ou tes proches.", "With your coach, stable or family.", "Con tu entrenador, cuadra o familia.", "Con il tuo istruttore, la scuderia o i tuoi cari.", "\u30b3\u30fc\u30c1\u3084\u5bb6\u65cf\u3068\u5171\u6709\u3002", "Mit deinem Trainer, deinem Stall oder deinen Nahestehenden.", "\u0645\u0639 \u0645\u062f\u0631\u0628\u0643 \u0623\u0648 \u0625\u0633\u0637\u0628\u0644\u0643 \u0623\u0648 \u0623\u062d\u0628\u0627\u0626\u0643.", "分享给你的教练、马厩或亲友。", "Met je trainer, je stal of je naasten.", "Com seu treinador, sua cocheira ou seus familiares.", "Med din tränare, ditt stall eller dina nära.", "С тренером, конюшней или близкими.", "Twojemu trenerowi, stajni lub bliskim.", "코치, 마구간, 가족과 함께 나눠 보세요."))),
            h("div", { className: "qr" }, h("svg", { viewBox: "0 0 24 24" }, h("circle", { cx: 18, cy: 5, r: 2.5 }), h("circle", { cx: 6, cy: 12, r: 2.5 }), h("circle", { cx: 18, cy: 19, r: 2.5 }), h("path", { d: "M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" })))),   /* (1071) icone de partage (le faux QR hachure faisait « pas fini ») */
          h("button", { className: "btnGhost", onClick: partagerFiche }, T("G\u00e9n\u00e9rer un lien", "Generate a link", "Generar enlace", "Genera un link", "\u30ea\u30f3\u30af\u3092\u751f\u6210", "Link erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0631\u0627\u0628\u0637", "生成链接", "Link maken", "Gerar um link", "Skapa en länk", "Создать ссылку", "Wygeneruj link", "링크 만들기")),
          null, /* 25/08 : encart « Partager sur l'Ecurie Hype » RETIRE — projet Ecurie Hype en suspens (decision Blandine) ; donnees inchangees, aucun cheval departage */
          null /* 30/07 : ligne FFE retiree (promesse sans backend — decision Blandine ; lien SIRE dans Origines a la place) */)),

        

        finPageCh() /* (1030) Blandine : la page cheval n avait pas le bandeau de fin HYPE */,
        h("div", { style: { height: "40px" } }))),

    (panneau && !(c && c.nom)) ? null : /* 27/08 : garde preventive — le panneau ne s'ouvre jamais sur une fiche sans nom (piste explorée après un crash rapporté par Blandine sur ce panneau, cause exacte non confirmée) */
      panneau ? h("div", { id: "panneauCheval", "data-noswipe": "true",
      /* 29/08 (demande Blandine : « mets le swipe retour et avant, sur la page
         Souvenirs il n'y a rien ») — le geste existait mais ne servait qu'a FERMER,
         et uniquement depuis le bord gauche. Desormais :
           · glisser depuis le BORD GAUCHE  -> ferme la page (comportement d'origine) ;
           · glisser n'importe ou ailleurs  -> page precedente / suivante dans l'ordre
             des onglets (Souvenirs · Photos · Performances · Videos).
         Les bandes qui defilent horizontalement (data-hscroll) sont ignorees, sinon
         faire defiler un rail changerait de page. */
      onTouchStart: function (eTs) {
        /* 12/10 (1000) BUG « la page refuse de defiler sur Son histoire / Ses resultats » (Blandine, deux blocages, il fallait
           sortir et revenir). Defaut connu de Safari iPhone : quand une page fixe qui defile est tout en haut (ou tout en bas)
           et qu on tire dans ce sens, le geste part a la page de DERRIERE ; les gestes suivants restent accroches a elle et la
           page du dessus semble gelee. Parade classique : au premier contact, on decale la page d un pixel du bord, et
           overscroll-behavior: contain (style ci-dessous) empeche le geste de passer derriere. */
        try { var elS = eTs.currentTarget; if (elS && elS.scrollHeight > elS.clientHeight) { if (elS.scrollTop <= 0) elS.scrollTop = 1; else if (elS.scrollTop + elS.clientHeight >= elS.scrollHeight) elS.scrollTop = elS.scrollHeight - elS.clientHeight - 1; } } catch (eSc) { }
        try {
          var t0 = eTs.touches && eTs.touches[0];
          var dansRail = false;
          try { dansRail = !!(eTs.target && eTs.target.closest && eTs.target.closest("[data-hscroll]")); } catch (eR) { }
          var plusieurs = !!(eTs.touches && eTs.touches.length > 1);   /* (1034) deux doigts = zoom, jamais un balayage */
          window.__panSwipe = (t0 && !plusieurs) ? { x: t0.clientX, y: t0.clientY, bord: t0.clientX <= 28, rail: dansRail } : (plusieurs ? { multi: true } : null);
        } catch (eS1) { window.__panSwipe = null; }
      },
      onTouchEnd: function (eTe) {
        try {
          var d0 = window.__panSwipe; window.__panSwipe = null;
          if (!d0 || d0.rail || d0.multi) { if (d0 && d0.multi && eTe.touches && eTe.touches.length) window.__panSwipe = d0; return; }   /* (1034) */
          if (hypeEcranZoome()) return;   /* (1034) ecran zoome : on se deplace dans la photo, on ne change pas d onglet */
          var t1 = eTe.changedTouches && eTe.changedTouches[0]; if (!t1) return;
          var dx = t1.clientX - d0.x, dy = Math.abs(t1.clientY - d0.y);
          if (dy > 60 || Math.abs(dx) < 70) return;   /* geste vertical ou trop court */
          if (d0.bord && dx > 70) { setPanneau(null); return; }
          var ordre = ["souvenirs", "photos", "palmares", "videos"];
          var iP = ordre.indexOf(panneau);
          if (iP < 0) { if (dx > 0) setPanneau(null); return; }
          var suiv = dx < 0 ? iP + 1 : iP - 1;
          if (suiv < 0) { setPanneau(null); return; }   /* avant le premier : on ferme */
          if (suiv >= ordre.length) return;
          setPanneau(ordre[suiv]);
        } catch (eS2) { }
      },
      style: Object.assign({ position: "fixed", inset: 0, zIndex: 6500, overscrollBehavior: "contain" /* (1000) */, overflowX: "hidden" /* (1146) plus de glissement lateral de la page du cheval (Safari decalait tout le contenu vers la droite) */, background: (panneau === "actualite") ? "#05080B" /* 21/10 (Blandine : « la couleur bleu petrole insistante partout [...] c est pas du tout le design habituel ») : retour au noir des autres pages du cheval ; du 15/10 (1147) au 21/10 : bleu petrole sombre avec lueurs */ : panHeroCh() ? ((panneau === "photos" && !tousSouvCh) ? "linear-gradient(rgba(6,7,9,0.30), rgba(6,7,9,0.30)) center / cover no-repeat, " : "") /* (1035) Blandine : fond de la page Photos un peu moins lumineux et moins contraste (voile sombre uniforme) ; « Tous les souvenirs » et autres pages : inchanges */ + "linear-gradient(180deg, rgba(6,7,9,0.80) 0%, rgba(6,7,9,0.14) 28%, rgba(6,7,9,0.22) 60%, rgba(6,7,9,0.92) 100%) center / cover no-repeat, linear-gradient(90deg, rgba(6,7,9,0.90) 0%, rgba(6,7,9,0.52) 48%, rgba(6,7,9,0.24) 100%) center / cover no-repeat, url('" + fondPanCh() + "') " + (panneau === "photos" ? "center top" : "center right") + " / cover no-repeat, #060709" /* (1028) pages Photos et « Tous les souvenirs » : leurs propres fonds (mobile / tablette / ordinateur) ; (978) MEME FOND QUE LA PAGE SANTE (meme image, memes voiles) ; le panneau est la zone qui defile, son fond reste donc immobile */ : "radial-gradient(ellipse 130% 420px at 50% 0%, rgba(127,163,173,0.22), rgba(127,163,173,0.07) 55%, transparent 80%) local, #060709" /* (899) meme lueur que le haut de l accueil, sur TOUTES les pages du cheval (.hero-pulse : cercle de 360 px, rgba(127,163,173,.407) -> transparent 62 %) */, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 130 },
        (largeCh && panneau) ? { left: (rtlCh || !menuCh) ? 0 : 210, right: (rtlCh && menuCh) ? 210 : 0, paddingLeft: "max(24px, calc((100% - 1240px) / 2))", paddingRight: "max(24px, calc((100% - 1240px) / 2))", paddingBottom: 80 } : {}) },   /* (882) Photos ; (884) Blandine : tous les onglets (Histoire, Performances, Videos...) laissent aussi le menu visible */
      h("div", { style: Object.assign({ display: "flex", alignItems: "center", gap: 12, padding: "calc(14px + env(safe-area-inset-top)) 16px 8px" }, panHeroCh() ? { position: "absolute", top: 0, left: 0, right: 0, zIndex: 5, padding: "calc(10px + env(safe-area-inset-top)) 16px 8px", pointerEvents: "none" } : {}) },   /* (978) flottante sur le hero, comme Sante */
        h("button", { onClick: function () { setPanneau(null); }, style: panHeroCh() ? { width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.75)", background: "rgba(6,7,9,0.35)", color: "#D6C4A1", fontSize: 18, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer", pointerEvents: "auto" } : { width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#F3EEE4", fontSize: 17, flexShrink: 0 } }, "‹"),
        (["souvenirs", "photos", "palmares", "videos", "actualite" /* (1142) le titre est dans la photo */].indexOf(panneau) >= 0) ? null /* (910) titre retire : la carte du cheval le dit deja */ : h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 19, fontWeight: 700, color: "#F4F6F7" } },
          panneau === "flots" ? T("Flots", "Rosettes", "Escarapelas", "Coccarde", "ロゼット", "Flots", "\u0627\u0644\u0634\u0627\u0631\u0627\u062a", "彩带", "Rozetten", "Fitas", "Rosetter", "Розетки", "Rozety", "로제트")
          : panneau === "palmares" ? T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")
          : panneau === "photos" ? (T("Photos", "Photos", "Fotos", "Foto", "写真", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진") ): panneau === "videos" ? (T("Vidéos", "Videos", "Vídeos", "Video", "動画", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상")) : panneau === "souvenirs" ? (T("Histoire", "Story", "Historia", "Storia", "物語", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기"))
          : panneau === "actualite" ? (T("Actualit\u00e9", "News", "Actualidad", "Attualit\u00e0", "\u30cb\u30e5\u30fc\u30b9", "Aktuelles", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식") + " \u00b7 " + c.nom)   /* 04/10 (638) : le panneau Actualite n avait pas de titre et retombait sur « Passeport Sante » */
          : T("Passeport Santé", "Health Passport", "Pasaporte de salud", "Passaporto salute", "健康パスポート", "Gesundheitspass", "\u062c\u0648\u0627\u0632 \u0627\u0644\u0635\u062d\u0629", "健康护照", "Gezondheidspaspoort", "Passaporte de Saúde", "Hälsopass", "Паспорт здоровья", "Paszport zdrowia", "건강 패스포트")),
        h("div", { style: { marginLeft: "auto", pointerEvents: "auto", display: "flex", alignItems: "center", gap: 8 } },
          /* 19/10 (soir) : Partager cette page (Photos, Videos, Actualite, Resultats du cheval), meme bouton que les pages d un cavalier */
          ({ photos: "hp", videos: "hv", actualite: "ha", palmares: "hr" }[panneau] && chevalDyn && chevalDyn.dbId && typeof HypeBoutonPartagerPage === "function")
            ? h(HypeBoutonPartagerPage, { inline: true, taille: 38, obtenir: function () { var famP = { photos: "hp", videos: "hv", actualite: "ha", palmares: "hr" }[panneau]; var idP = chevalDyn && chevalDyn.dbId; return (famP && idP) ? { fam: famP, val: String(idP), titre: c.nom || "Hype" } : null; } })
            : null,
          h(SelecteurLangue, { compact: true }))),
      null /* (910) onglets deplaces sous la carte du cheval (ongletsPanCh) */,
      /* 🟩 05/09 (Blandine : « c'est trop écrasé et compact, reproduis l'espace entre l'onglet
   du haut et la suite comme sur la page Écurie ») — même bloc gris que les deux bandes de la
   page Écurie/Guilde (`#15181C`, 18 px, arrondi 6, marge latérale 16), un seul trait ici pour
   créer la respiration sous les 4 onglets, partagé par Histoire/Photos/Performances/Vidéos. */
/* 🟥 06/09 (Blandine : « aère beaucoup beaucoup plus, laisse des espaces entre les
           différentes parties ») — trait plus épais (18 -> 30 px), marges doublées. */
null /* (920) Blandine : 1re barre grise retiree (4 pages) ; l encart remonte et grandit */,
panneau === "flots" ? h("div", { style: { padding: "8px 16px 0" } },
        (c.flots && c.flots.length) ? h("div", { className: "rbstrip" }, c.flots.map(rubanCard)) : h("div", { className: "empty" }, T("Aucun flot pour l'instant.", "No rosettes yet.", "Aún sin escarapelas.", "Ancora nessuna coccarda.", "まだロゼットはありません。", "Noch kein Flot vorhanden.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0634\u0627\u0631\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", "暂时还没有彩带。", "Nog geen rozetten.", "Nenhuma fita por enquanto.", "Inga rosetter ännu.", "Пока нет розеток.", "Na razie brak rozet.", "아직 로제트가 없어요.")),
        h("button", { className: "addbtn", onClick: bientot }, "+ " + T("Ajouter un flot", "Add a rosette", "Añadir escarapela", "Aggiungi coccarda", "ロゼットを追加", "Einen Flot hinzufügen", "\u0625\u0636\u0627\u0641\u0629 \u0634\u0627\u0631\u0629", "添加彩带", "Rozet toevoegen", "Adicionar uma fita", "Lägg till en rosett", "Добавить розетку", "Dodaj rozetę", "로제트 추가"))) : null,
      panneau === "videos" ? h("div", null,
        feuilleComVidCh() /* 19/10 (soir) : feuille des commentaires d une video */,
        heroSousPageCh(T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상")),
        /* (894) Blandine : la deuxieme barre grise, comme sur la page Photos, entre la carte du cheval et « Videos » */
        null /* (978) barre grise retiree : design de la page Sante */,
        ongletsPanCh(),
        /* 12/10 (1012) encart d introduction Videos (maquette de Blandine), meme composition que Photos (1011) */
        encartIntroCh("images/videos-intro.webp", T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상"),
          T("Des souvenirs en mouvement\u2026", "Memories in motion\u2026", "Recuerdos en movimiento\u2026", "Ricordi in movimento\u2026", "\u52d5\u304d\u51fa\u3059\u601d\u3044\u51fa\u2026", "Erinnerungen in Bewegung\u2026", "\u0630\u0643\u0631\u064a\u0627\u062a \u0641\u064a \u062d\u0631\u0643\u0629\u2026", "流动的回忆……", "Herinneringen in beweging…", "Lembranças em movimento…", "Minnen i rörelse…", "Воспоминания в движении…", "Wspomnienia w ruchu…", "움직이는 추억…"),
          T("Des premiers pas aux grands moments, retrouvez son histoire en vid\u00e9os.", "From first steps to big moments, relive their story in videos.", "De los primeros pasos a los grandes momentos, revive su historia en v\u00eddeos.", "Dai primi passi ai grandi momenti, ritrova la sua storia in video.", "\u306f\u3058\u3081\u306e\u4e00\u6b69\u304b\u3089\u5927\u304d\u306a\u77ac\u9593\u307e\u3067\u3001\u305d\u306e\u7269\u8a9e\u3092\u52d5\u753b\u3067\u3002", "Von den ersten Schritten bis zu den gro\u00dfen Momenten: seine Geschichte in Videos.", "\u0645\u0646 \u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0627\u0644\u0623\u0648\u0644\u0649 \u0625\u0644\u0649 \u0627\u0644\u0644\u062d\u0638\u0627\u062a \u0627\u0644\u0643\u0628\u0631\u0649\u060c \u0627\u0643\u062a\u0634\u0641 \u0642\u0635\u062a\u0647 \u0628\u0627\u0644\u0641\u064a\u062f\u064a\u0648.", "从第一步到高光时刻，用视频重温它的故事。", "Van de eerste stapjes tot de grote momenten: ontdek zijn verhaal in video’s.", "Dos primeiros passos aos grandes momentos, reviva a história dele em vídeos.", "Från första stegen till de stora ögonblicken, återupplev dess historia i videor.", "От первых шагов до самых ярких моментов — смотрите её историю в видео.", "Od pierwszych kroków po wielkie chwile — przeżyj jego historię na nowo na filmach.", "첫걸음부터 빛나는 순간까지, 영상으로 이야기를 만나 보세요."),
          h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.7, strokeLinejoin: "round" }, h("path", { d: "M9 7.2v9.6L16.5 12z" }))),
        h("div", { style: { padding: "0 16px 24px" } },
        h("input", { ref: vdIn, type: "file", accept: "video/*", multiple: true, /* \ud83d\udfe5 05/09 (Blandine, capture 15h12) : troisieme champ video du fichier, oublie ce matin. Sans `multiple`, le selecteur iOS n a PAS de bouton de validation. Le traitement ne prend toujours que le premier fichier. */ style: { display: "none" }, onChange: function (eVi) {
          setVidSucces(false);
          var lst = (eVi.target && eVi.target.files) || null;
          var fV2 = (lst && lst[0]) || null;
          try { eVi.target.value = ""; } catch (eR2) { }
          if (!fV2) {
            setVidJourn(null);
            setVidErr({ nom: "", poids: "", msg: T("Le s\u00e9lecteur s'est referm\u00e9 sans transmettre de fichier. Rien n'a \u00e9t\u00e9 envoy\u00e9. Cela arrive quand iOS n'arrive pas \u00e0 convertir la vid\u00e9o : r\u00e9essaie, ou envoie une version plus courte.", "The picker closed without handing over a file. Nothing was uploaded.", "El selector se cerr\u00f3 sin entregar el archivo. No se envi\u00f3 nada.", "Il selettore si \u00e8 chiuso senza consegnare il file. Nulla \u00e8 stato inviato.", "\u30d5\u30a1\u30a4\u30eb\u304c\u6e21\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Die Auswahl wurde ohne Datei geschlossen.", "\u0623\u063a\u0644\u0642 \u0627\u0644\u0645\u0646\u062a\u0642\u064a \u062f\u0648\u0646 \u0625\u0631\u0633\u0627\u0644 \u0623\u064a \u0645\u0644\u0641. \u0644\u0645 \u064a\u0631\u0633\u0644 \u0634\u064a\u0621. \u064a\u062d\u062f\u062b \u0647\u0630\u0627 \u0639\u0646\u062f\u0645\u0627 \u064a\u0639\u062c\u0632 iOS \u0639\u0646 \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0641\u064a\u062f\u064a\u0648: \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629\u060c \u0623\u0648 \u0623\u0631\u0633\u0644\u064a \u0646\u0633\u062e\u0629 \u0623\u0642\u0635\u0631.", "选择器已关闭，没有选择任何文件，也没有上传任何内容。这种情况通常是 iOS 无法转换视频：请重试，或上传一个更短的版本。", "De bestandskiezer is gesloten zonder een bestand door te geven. Er is niets verstuurd. Dat gebeurt als iOS de video niet kan omzetten: probeer het opnieuw, of stuur een kortere versie.", "O seletor fechou sem enviar nenhum arquivo. Nada foi enviado. Isso acontece quando o iOS não consegue converter o vídeo: tente de novo ou envie uma versão mais curta.", "Filväljaren stängdes utan att skicka någon fil. Ingenting har skickats. Det händer när iOS inte lyckas konvertera videon: försök igen, eller skicka en kortare version.", "Окно выбора закрылось, не передав файл. Ничего не отправлено. Так бывает, когда iOS не может преобразовать видео: попробуй ещё раз или отправь версию покороче.", "Selektor zamknął się bez przekazania pliku. Nic nie zostało wysłane. Zdarza się to, gdy iOS nie może przekonwertować filmu: spróbuj ponownie albo wyślij krótszą wersję.", "선택 창이 파일 없이 닫혔어요. 아무것도 전송되지 않았어요. iOS가 영상을 변환하지 못할 때 이런 일이 생겨요. 다시 시도하거나 더 짧은 영상을 보내 주세요.") });
            return;
          }
          setVidJourn({ nom: fV2.name || "?", poids: fV2.size ? ((Math.round(fV2.size / 104857.6) / 10) + " Mo") : "?", type: fV2.type || "?" });
          envoyerVideoDirecte(fV2);
        } }),
        /* 10/10 (887) consigne validee : titre « Videos » + petit bouton a droite (meme geste qu avant, meme regle : visible pour tous,
           droits verifies a l envoi). Remplace la grande barre pleine largeur. */
        h("div", { style: { display: "flex", alignItems: "center", gap: 9, margin: "0 0 26px" /* (905) plus d air sous le titre Videos (14 -> 26) */ } },
          h("span", { style: { width: 7, height: 7, background: teinte, transform: "rotate(45deg)", flexShrink: 0 } }),
          h("span", { style: { fontFamily: "'Cinzel',serif", fontSize: 16, color: "#F3EEE4", fontWeight: 700, letterSpacing: 1 } }, T("Vid\u00e9os", "Videos", "V\u00eddeos", "Video", "\u52d5\u753b", "Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "Video's", "Vídeos", "Videor", "Видео", "Filmy", "영상")),
          h("span", { style: { flex: 1, minWidth: 10, height: 1, background: "linear-gradient(90deg, " + tA(0.5) + ", transparent)" } }),
          ((chVids && chVids.length) || (chVidsCom && chVidsCom.length) || vidEnvoi) && h("button", { type: "button", onClick: function () { if (!vidEnvoi && vdIn.current) vdIn.current.click(); }, disabled: !!vidEnvoi, style: { flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 5, minHeight: 34, padding: "0 13px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.45)", background: "rgba(16,29,34,0.6)", color: "#E9D9B8", fontFamily: "'Montserrat',sans-serif", fontSize: 11.5, fontWeight: 600, letterSpacing: 0.3, cursor: vidEnvoi ? "default" : "pointer", opacity: vidEnvoi ? 0.65 : 1, whiteSpace: "nowrap" } },
            vidEnvoi ? T("Envoi en cours\u2026", "Uploading\u2026", "Enviando\u2026", "Invio in corso\u2026", "\u9001\u4fe1\u4e2d\u2026", "Wird gesendet\u2026", "\u062c\u0627\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u2026", "发送中…", "Bezig met uploaden…", "Enviando…", "Laddar upp…", "Идёт отправка…", "Wysyłanie w toku…", "전송 중…")
                     : ("+ " + T("Ajouter une vid\u00e9o", "Add a video", "A\u00f1adir un v\u00eddeo", "Aggiungi un video", "\u52d5\u753b\u3092\u8ffd\u52a0", "Video hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0641\u064a\u062f\u064a\u0648", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "영상 추가")))),
        /* 10/09 — TITI, la mascotte poney de Hype, pendant l'envoi d'une vidéo. Même principe que
           la mascotte album (remontée en premier, juste après le bouton) mais SANS boucle cette
           fois : Titi joue avec des photos puis s'endort dessus — une vraie petite histoire, pas
           une boucle courte. Une fois terminée (12 s), la vidéo reste simplement sur la dernière
           image (Titi endormi) si l'envoi dure plus longtemps — comportement par défaut d'une
           balise <video> sans loop, rien à coder de plus pour ça.
           FICHIER À AJOUTER PAR BLANDINE dans son dépôt, au même endroit que l'image existante du
           poney d'attente : images/titi-envoi-video.mp4 — sans ce fichier au bon endroit, rien ne
           s'affichera (le texte, lui, s'affichera quand même).
           10/09 (nuit) : relie a vidMascotteNb (fin REELLE de l'envoi) et plus a vidEnvoi (quelques secondes). */
        (vidMascotteNb > 0) ? h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", margin: "0 0 14px", padding: "16px 14px", borderRadius: 20, border: "1px solid rgba(127,163,173,0.28)", background: "linear-gradient(165deg,rgba(16,21,24,0.9) 0%,rgba(10,34,38,0.85) 100%)" } },
          h("video", {
            src: "images/titi-envoi-video.mp4", autoPlay: true, muted: true, playsInline: true, preload: "auto",
            onError: function (eVdT) { try { eVdT.target.style.display = "none"; } catch (e0) { } },
            style: { width: 168, height: 224, objectFit: "cover", borderRadius: 16, display: "block", boxShadow: "0 10px 26px rgba(0,0,0,0.45)" }
          }),
          h("div", { style: { textAlign: "center", marginTop: 12 } },
            h("div", { style: { fontSize: 14, fontWeight: 700, color: "#FFFFFF", fontFamily: "'Montserrat',sans-serif" /* 10/09 CORRECTIF : etait M9, variable JAMAIS definie dans EcranCheval (elle l'est dans AlbumsCheval) -> ReferenceError, meme bug exact que celui deja corrige juste en dessous (vidJourn) le 05/09 -- pas revu cette fois avant de pousser. Capture de Blandine 22h21. */ } }, T("Les plus belles histoires méritent quelques secondes.", "The best stories deserve a few seconds.", "Las mejores historias merecen unos segundos.", "Le storie più belle meritano qualche secondo.", "\u7d20\u6575\u306a\u601d\u3044\u51fa\u306b\u306f\u5c11\u3057\u6642\u9593\u304c\u304b\u304b\u308a\u307e\u3059\u3002", "Die schönsten Geschichten verdienen ein paar Sekunden.", "\u0623\u062c\u0645\u0644 \u0627\u0644\u0642\u0635\u0635 \u062a\u0633\u062a\u062d\u0642 \u0628\u0636\u0639 \u062b\u0648\u0627\u0646.", "最美的故事，值得花几秒钟。", "De mooiste verhalen zijn een paar seconden waard.", "As histórias mais bonitas merecem alguns segundos.", "De finaste historierna är värda några sekunder.", "Самые красивые истории стоят нескольких секунд.", "Najpiękniejsze historie zasługują na kilka sekund.", "가장 멋진 이야기는 잠깐의 시간을 들일 만해요.")),
            h("div", { style: { fontSize: 11, color: "#B9C4C9", lineHeight: 1.5, marginTop: 6, fontFamily: "'Montserrat',sans-serif" } }, T("Reste sur l'app, écran allumé, jusqu'à la fin — sur iPhone, verrouiller l'écran interrompt l'envoi sans prévenir.", "Stay on the app with the screen on until it finishes — on iPhone, locking the screen interrupts it without warning.", "Permanece en la app con la pantalla encendida — en iPhone, bloquear la pantalla lo interrumpe.", "Resta sull'app con lo schermo acceso — su iPhone, bloccare lo schermo lo interrompe.", "終わるまでアプリを開いたままにしてください。画面ロックで中断されます。", "Bleib in der App, Bildschirm an, bis zum Ende \u2013 auf dem iPhone unterbricht das Sperren des Bildschirms den Upload ohne Warnung.", "\u0627\u0628\u0642\u064a \u0641\u064a \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0648\u0627\u0644\u0634\u0627\u0634\u0629 \u0645\u0636\u0627\u0621\u0629 \u062d\u062a\u0649 \u0627\u0644\u0646\u0647\u0627\u064a\u0629 \u2014 \u0639\u0644\u0649 iPhone \u064a\u0648\u0642\u0641 \u0642\u0641\u0644 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u062f\u0648\u0646 \u062a\u0646\u0628\u064a\u0647.", "请停留在应用里并保持屏幕常亮，直到完成——在 iPhone 上，锁屏会在没有任何提示的情况下中断发送。", "Blijf in de app, met het scherm aan, tot het klaar is — op een iPhone onderbreekt het vergrendelen van het scherm het uploaden zonder waarschuwing.", "Fique no app, com a tela ligada, até o fim — no iPhone, bloquear a tela interrompe o envio sem avisar.", "Stanna i appen med skärmen på tills det är klart — på iPhone avbryter skärmlåset uppladdningen utan förvarning.", "Оставайся в приложении с включённым экраном до конца — на iPhone блокировка экрана молча прерывает отправку.", "Zostań w aplikacji z włączonym ekranem aż do końca — na iPhonie zablokowanie ekranu przerywa wysyłanie bez ostrzeżenia.", "끝날 때까지 앱을 켜 둔 채 화면을 켜 두세요 — iPhone에서는 화면을 잠그면 알림 없이 전송이 중단돼요.")))) : null,
        /* (927) pendant l envoi : choisir la collection ou ranger la video (seulement si des collections existent et qu on peut les gerer) */
        (vidMascotteNb > 0 && choixColEnv && (collVid || []).length && peutGererCol()) ? h("div", { style: { margin: "0 0 14px", padding: "12px 14px", borderRadius: 16, border: "1px solid rgba(214,196,161,0.28)", background: "rgba(16,29,34,0.45)" } },
          h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11.5, color: "rgba(243,238,228,0.8)", marginBottom: 9 } }, T("Ranger cette vidéo dans une collection :", "File this video in a collection:", "Guardar este vídeo en una colección:", "Inserisci questo video in una raccolta:", "この動画をコレクションに入れる：", "Dieses Video in eine Sammlung einsortieren:", "ضعي هذا الفيديو في مجموعة:", "把这个视频放进一个合集：", "Zet deze video in een verzameling:", "Guardar este vídeo em uma coleção:", "Lägg den här videon i en samling:", "Положить это видео в коллекцию:", "Dodaj ten film do kolekcji:", "이 영상을 컬렉션에 넣기:")),
          h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } },
            [{ id: null, nom: T("Aucune", "None", "Ninguna", "Nessuna", "なし", "Keine", "لا شيء", "无", "Geen", "Nenhuma", "Inget", "Нет", "Żadna", "없음") }].concat(collVid || []).map(function (cC) {
              var actif = (choixColEnv.colId || null) === (cC.id || null);
              return h("button", { key: "cc" + (cC.id || "0"), type: "button", onClick: function () { choixColEnv.colId = cC.id || null; memoRangement(choixColEnv); setColRangeMsg(null); forcerChoixCol(function (n) { return n + 1; }); }, style: { minHeight: 34, padding: "0 13px", borderRadius: 999, border: "1px solid " + (actif ? "#D6C4A1" : "rgba(214,196,161,0.35)"), background: actif ? "rgba(214,196,161,0.16)" : "transparent", color: actif ? "#D6C4A1" : "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: actif ? 700 : 500, cursor: "pointer" } }, (actif ? "\u2713 " : "") + String(cC.nom || ""));
            })),
          h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.55)", marginTop: 8 } }, T("Elle y sera ajoutée dès qu’elle sera prête.", "It will be added as soon as it is ready.", "Se añadirá en cuanto esté listo.", "Sarà aggiunto appena pronto.", "準備ができしだい追加されます。", "Es wird hinzugefügt, sobald es fertig ist.", "ستُضاف بمجرد أن يصبح جاهزًا.", "准备好后会自动添加进去。", "Hij wordt toegevoegd zodra hij klaar is.", "Ele será adicionado assim que estiver pronto.", "Den läggs till så fort den är klar.", "Оно появится там, как только будет готово.", "Zostanie tam dodany, gdy tylko będzie gotowy.", "준비되면 바로 추가될 거예요."))) : null,
        colRangeMsg ? h("div", { style: { margin: "0 0 12px", padding: "10px 13px", borderRadius: 12, border: "1px solid " + (colRangeMsg.ok ? "rgba(94,222,133,0.35)" : "rgba(240,160,95,0.4)"), background: colRangeMsg.ok ? "rgba(94,222,133,0.07)" : "rgba(240,160,95,0.07)", fontSize: 11.5, color: colRangeMsg.ok ? "#8FE3A8" : "#F0A05F", fontFamily: "'Montserrat',sans-serif" } }, colRangeMsg.txt) : null,
        vidJourn ? h("div", { style: { margin: "0 0 12px", padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(127,163,173,0.22)", background: "rgba(127,163,173,0.05)", fontSize: 11, color: "#9FD8E2", fontFamily: "'Montserrat',sans-serif" /* 05/09 : etait `M`, variable JAMAIS definie dans EcranCheval (elle l est dans d autres composants) -> ReferenceError « Can t find variable: M » et ecran « Un caillou dans le sabot » des que ce bloc se rendait. Capture de Blandine 11h17. */, lineHeight: 1.5 } },
          T("Fichier re\u00e7u", "File received", "Archivo recibido", "File ricevuto", "\u30d5\u30a1\u30a4\u30eb\u53d7\u9818", "Datei erhalten", "\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0645\u0644\u0641", "已收到文件", "Bestand ontvangen", "Arquivo recebido", "Fil mottagen", "Файл получен", "Plik otrzymany", "파일을 받았어요") + " : " + vidJourn.nom + " \u00b7 " + vidJourn.poids + " \u00b7 " + vidJourn.type) : null,
        /* 09/09 (soir, correctif 1) : reste affiché tant qu'un nouvel envoi n'est pas lancé. */
        vidSucces ? h("div", { style: { margin: "0 0 12px", padding: "10px 13px", borderRadius: 12, border: "1px solid rgba(94,222,133,0.35)", background: "rgba(94,222,133,0.07)", fontSize: 11.5, color: "#8FE3A8", fontFamily: "'Montserrat',sans-serif" } },
          T("Vidéo envoyée \u2728 Elle appara\u00eetra juste en dessous, \u00aben préparation\u00bb, puis prête d'elle-m\u00eame.", "Video sent \u2728 It will appear just below, \u00abpreparing\u00bb, then ready on its own.", "Video enviado \u2728 Aparecer\u00e1 justo abajo, \u00aben preparaci\u00f3n\u00bb, y listo por s\u00ed solo.", "Video inviato \u2728 Apparir\u00e0 qui sotto, \u00abin preparazione\u00bb, poi pronto da solo.", "\u52d5\u753b\u3092\u9001\u4fe1\u3057\u307e\u3057\u305f\u2728 \u3059\u3050\u4e0b\u306b\u300c\u6e96\u5099\u4e2d\u300d\u3068\u3057\u3066\u8868\u793a\u3055\u308c\u3001\u81ea\u52d5\u3067\u6e96\u5099\u304c\u5b8c\u4e86\u3057\u307e\u3059\u3002", "Video gesendet \u2728 Es erscheint gleich unten, \u00abwird vorbereitet\u00bb, dann von selbst fertig.", "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u2728 \u0633\u064a\u0638\u0647\u0631 \u0623\u062f\u0646\u0627\u0647 \u00ab\u0642\u064a\u062f \u0627\u0644\u062a\u062d\u0636\u064a\u0631\u00bb\u060c \u062b\u0645 \u064a\u0635\u0628\u062d \u062c\u0627\u0647\u0632\u0627 \u0648\u062d\u062f\u0647.", "视频已发送 ✨ 它会出现在下方，先显示“准备中”，然后自动变为可播放。", "Video verstuurd ✨ Hij verschijnt hieronder, eerst \"in voorbereiding\" en daarna vanzelf klaar.", "Vídeo enviado ✨ Ele vai aparecer logo abaixo, “em preparação”, e depois ficará pronto sozinho.", "Videon är skickad ✨ Den dyker upp precis nedanför, ”förbereds”, och blir sedan klar av sig själv.", "Видео отправлено ✨ Оно появится чуть ниже со статусом «готовится», а потом само станет готовым.", "Film wysłany ✨ Pojawi się tuż poniżej jako „w przygotowaniu”, a potem sam zmieni się na gotowy.", "영상을 보냈어요 ✨ 바로 아래에 “준비 중”으로 나타났다가 곧 저절로 준비 완료가 돼요.")) : null,
        vidErr ? h("div", { style: { margin: "0 0 12px", padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,107,129,0.45)", background: "rgba(60,10,20,0.55)" } },
          h("div", { style: { fontSize: 12.5, fontWeight: 800, color: "#FF9AA8", marginBottom: 5 } },
            T("L'envoi a \u00e9chou\u00e9 :", "Upload failed:", "El env\u00edo ha fallado:", "Invio non riuscito:", "\u9001\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\uff1a", "Senden fehlgeschlagen:", "\u0641\u0634\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644:", "发送失败：", "Het uploaden is mislukt:", "O envio falhou:", "Uppladdningen misslyckades:", "Отправка не удалась:", "Wysyłanie nie powiodło się:", "전송에 실패했어요:")),
          h("div", { style: { fontSize: 12, color: "#FFD3D9", lineHeight: 1.55, wordBreak: "break-word" } },
            (vidErr.nom ? (vidErr.nom + (vidErr.poids ? (" \u00b7 " + vidErr.poids) : "") + " \u2014 ") : "") + vidErr.msg),
          h("div", { role: "button", onClick: function () { setVidErr(null); }, style: { marginTop: 9, display: "inline-block", padding: "7px 15px", borderRadius: 999, border: "1px solid rgba(255,154,168,0.5)", color: "#FF9AA8", fontSize: 11.5, fontWeight: 700, cursor: "pointer" } },
            T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))) : null,
        /* 10/10 (887) GALERIE ADAPTATIVE (iPhone) : 2 colonnes ; 1 seule video = carte centree de 80 % ; nombre impair = la DERNIERE
           carte (quelle qu elle soit) prend la ligne, elargie et centree (78 %), juste pour equilibrer. Chaque vignette montre la video
           ENTIERE (contain) sur sa propre image floutee : horizontale, verticale ou carree, rien n est coupe. Aucun texte. */
        vueCollectionsVid() ? h(React.Fragment, null, vueCollectionsVid() /* (905) collections */, carteCreerCol() /* (906) */) :
        (encartLarge && vueCinemaVid()) ? h(React.Fragment, null, vueCinemaVid() /* (916) Cinema, tablette et ordinateur */, carteCreerCol()) :
        ((chVids && chVids.length) || (chVidsCom && chVidsCom.length)) ? h(React.Fragment, null, h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" /* 20/10 : jamais plus large que l ecran */, gap: 16 /* piste A */ } },
          chVids.map(function (vU, iV) {
            var nTotV = (chVids || []).length + (chVidsCom || []).length;
            /* 02/08 : la vignette ouvre la visionneuse au lieu de lire la video dans sa case de
               grille. Objectif fixe par Blandine : toute video chargee par un utilisateur doit
               pouvoir s afficher en grand. */
            return h("div", { key: "vtab" + iV, role: "button", onClick: function () { try { window.__visListe = (chVids || []).slice(); } catch (eVl) { } setVisFerme(false); setVisionneuseAlbumId(null); setVisionneuse(vU); }, style: caseVidCh(iV, nTotV, vU) },
              vignetteVidCh(vU));
          }),
          /* 09/09 (soir, correctif 2) : vidéos postées en commentaire — jamais vues par chVids. */
          (chVidsCom || []).map(function (cV, iC) {
            var nTotC = (chVids || []).length + (chVidsCom || []).length, iGlob = (chVids || []).length + iC;
            var enPrepC = cV.statut && cV.statut !== "ready";
            if (enPrepC) {
              var estErrC = cV.statut === "errored";
              return h("div", { key: "vtabc" + iC, style: Object.assign(caseVidCh(iGlob, nTotC), { cursor: "default" }) },
                hypeCartePlaceholderMedia(cV.statut, estErrC ? T("Vidéo non envoyée", "Video not sent", "Vídeo no enviado", "Video non inviato", "\u30d5\u30a1\u30a4\u30eb\u306e\u9001\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f", "Video nicht gesendet", "\u0644\u0645 \u064a\u0631\u0633\u0644 \u0627\u0644\u0641\u064a\u062f\u064a\u0648", "视频未发送", "Video niet verstuurd", "Vídeo não enviado", "Videon skickades inte", "Видео не отправлено", "Wideo nie zostało wysłane", "동영상이 전송되지 않았어요") : T("Vidéo en préparation…", "Video preparing…", "Vídeo en preparación…", "Video in preparazione…", "\u52d5\u753b\u3092\u6e96\u5099\u4e2d\u2026", "Video wird vorbereitet…", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0642\u064a\u062f \u0627\u0644\u062a\u062d\u0636\u064a\u0631\u2026", "视频准备中…", "Video wordt voorbereid…", "Vídeo em preparação…", "Videon förbereds…", "Видео готовится…", "Wideo w przygotowaniu…", "동영상 준비 중…"), true),
                /* 09/09 (soir) : bouton Supprimer -- seulement sur un échec, pas sur un envoi encore en cours. */
                estErrC ? h("button", { onClick: function (eDc) { if (eDc && eDc.stopPropagation) eDc.stopPropagation(); if (!cV.id) return; supprimerCommentaire(cV.id).then(function () { setChVidsCom(function (l) { return (l || []).filter(function (x) { return x.id !== cV.id; }); }); }); }, style: { position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontSize: 10.5, color: "#FF9AA8", background: "rgba(60,10,20,0.55)", border: "1px solid rgba(255,107,129,0.5)", borderRadius: 999, padding: "5px 14px", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Supprimer", "Delete", "Eliminar", "Elimina", "\u524a\u9664", "Löschen", "\u062d\u0630\u0641", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제")) : null);
            }
            return h("div", { key: "vtabc" + iC, role: "button", onClick: function () { try { window.__visListe = (chVids || []).concat((chVidsCom || []).filter(function (x) { return !x.statut || x.statut === "ready"; }).map(function (x) { return x.url; })); } catch (eVlc) { } setVisFerme(false); setVisionneuseAlbumId(null); setVisionneuse(cV.url); }, style: caseVidCh(iGlob, nTotC, cV.url) },
              vignetteVidCh(cV.url));
          })
        ), carteCreerCol() /* (906) */)
        /* 10/10 (896) maquette validee : Titi (sa video) en fond de toute la carte, tons chauds ; titre, sous-texte et UN bouton
           « + Ajouter une video » dans la carte (le bouton du titre est cache tant qu il n y a aucune video). Telephone : texte en bas,
           centre ; ordinateur : texte a droite. Meme geste d ajout qu avant. */
        : h("div", { className: "empty", style: { position: "relative", height: largeCh ? 240 : 390 /* (904) telephone 300 -> 390 : le texte descend sous la tete de Titi */, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(214,196,161,0.35)", background: "#0A0806" } },
          h("video", { src: "images/titi-onglet-vide.mp4", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", onError: function (evTv) { try { evTv.target.style.display = "none"; } catch (eTv) { } }, style: { position: "absolute", top: 0, left: 0, width: "100%", height: largeCh ? "100%" : "74%", objectFit: "cover", objectPosition: largeCh ? "30% center" : "center 40%", filter: "sepia(0.35) saturate(1.05) brightness(0.85)" } }),
          h("div", { style: { position: "absolute", inset: 0, background: largeCh ? ("linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(6,5,4,0) 30%, rgba(6,5,4,0.7) 55%, rgba(6,5,4,0.92) 100%)") : "linear-gradient(0deg, #0A0806 0%, #0A0806 26%, rgba(10,8,6,0.6) 36%, rgba(10,8,6,0) 52%)" } }),
          h("div", { style: Object.assign({ position: "absolute", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 }, largeCh ? (rtlCh ? { left: 28, width: "44%", top: "50%", transform: "translateY(-50%)" } : { right: 28, width: "44%", top: "50%", transform: "translateY(-50%)" }) : { left: 16, right: 16, bottom: 18 }) },
            h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: largeCh ? 28 : 24, fontWeight: 500, color: "#F3EEE4", lineHeight: 1.2, textShadow: "0 2px 12px rgba(0,0,0,0.6)" } },
              T("Aucune vid\u00e9o pour le moment", "No video yet", "A\u00fan no hay v\u00eddeos", "Ancora nessun video", "\u307e\u3060\u52d5\u753b\u306f\u3042\u308a\u307e\u305b\u3093", "Noch kein Video", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0641\u064a\u062f\u064a\u0648 \u062d\u0627\u0644\u064a\u0627", "暂时没有视频", "Nog geen video's", "Nenhum vídeo por enquanto", "Inga videor än", "Пока нет видео", "Na razie brak filmów", "아직 영상이 없어요")),
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "rgba(243,238,228,0.78)", lineHeight: 1.45 } },
              T("Ses premiers souvenirs en vid\u00e9o restent \u00e0 partager\u2026", "Its first video memories are yet to be shared\u2026", "Sus primeros recuerdos en v\u00eddeo est\u00e1n por compartir\u2026", "I suoi primi ricordi in video sono ancora da condividere\u2026", "\u521d\u3081\u3066\u306e\u52d5\u753b\u306e\u601d\u3044\u51fa\u306f\u3001\u3053\u308c\u304b\u3089\u5171\u6709\u3055\u308c\u307e\u3059\u2026", "Seine ersten Video-Erinnerungen warten darauf, geteilt zu werden\u2026", "\u0630\u0643\u0631\u064a\u0627\u062a\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 \u0628\u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0644\u0645 \u062a\u064f\u0634\u0627\u0631\u0643 \u0628\u0639\u062f\u2026", "它的第一批视频回忆还等着你来分享……", "Zijn eerste videoherinneringen moeten nog gedeeld worden…", "As primeiras lembranças dele em vídeo ainda estão por compartilhar…", "Dess första videominnen väntar på att delas…", "Её первые воспоминания в видео ещё ждут своего часа…", "Jego pierwsze wspomnienia na filmie czekają jeszcze na udostępnienie…", "영상으로 남길 첫 추억을 기다리고 있어요…")),
            h("button", { type: "button", onClick: function () { if (!vidEnvoi && vdIn.current) vdIn.current.click(); }, style: { marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44, padding: "0 24px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.8)", background: "rgba(10,8,6,0.55)", color: "#E9D9B8", fontFamily: "'Montserrat',sans-serif", fontSize: 13.5, fontWeight: 600, cursor: "pointer" } },
              "+ " + T("Ajouter une vid\u00e9o", "Add a video", "A\u00f1adir un v\u00eddeo", "Aggiungi un video", "\u52d5\u753b\u3092\u8ffd\u52a0", "Video hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0641\u064a\u062f\u064a\u0648", "添加视频", "Video toevoegen", "Adicionar um vídeo", "Lägg till en video", "Добавить видео", "Dodaj film", "영상 추가"))))), finPageCh() /* (918) */) : null,
      panneau === "palmares" ? (palmTech ? h(React.Fragment, null, h("div", { role: "button", onClick: function () { setPalmTech(false); }, style: { margin: "6px 16px 2px", fontSize: 11.5, color: teinteCl, cursor: "pointer" } }, "\u2039 " + T("Revenir au palmar\u00e8s", "Back to the record", "Volver al palmar\u00e9s", "Torna al palmar\u00e8s", "\u623b\u308b", "Zur\u00fcck", "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0633\u062c\u0644 \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a", "返回战绩", "Terug naar het palmares", "Voltar ao histórico de resultados", "Tillbaka till meritlistan", "Вернуться к достижениям", "Wróć do osiągnięć", "수상 기록으로 돌아가기")),
        (function () { /* 26/08 : rien n est jamais efface — bouton pour TOUT revoir, proprietaire seulement */
          var nMq = ((resDb) || []).filter(function (rM) { return rM && rM.visible === false; }).length;
          if (!proprio || !nMq) return null;
          return h("div", { role: "button", onClick: function () { setVoirMasques(!voirMasques); }, style: { margin: "6px 16px 2px", fontSize: 11.5, color: voirMasques ? teinteCl : "#A39D92", cursor: "pointer" } },
            (voirMasques ? "\u2611 " : "\u2610 ") + (voirMasques ? T("Les lignes masqu\u00e9es sont affich\u00e9es", "Hidden lines are shown", "L\u00edneas ocultas visibles", "Righe nascoste visibili", "\u975e\u8868\u793a\u306e\u884c\u3092\u8868\u793a\u4e2d", "Ausgeblendete Zeilen sichtbar", "\u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0645\u0639\u0631\u0648\u0636\u0629", "已显示隐藏的行", "De verborgen regels worden getoond", "As linhas ocultas estão visíveis", "De dolda raderna visas", "Скрытые строки показаны", "Ukryte wiersze są wyświetlone", "숨긴 줄이 표시되고 있어요") : T("Afficher aussi les " + nMq + " lignes masqu\u00e9es", "Also show the " + nMq + " hidden lines", "Mostrar tambi\u00e9n las " + nMq + " l\u00edneas ocultas", "Mostra anche le " + nMq + " righe nascoste", "\u975e\u8868\u793a\u306e\u884c\u3082\u8868\u793a", "Auch die " + nMq + " ausgeblendeten Zeilen zeigen", "\u0639\u0631\u0636 \u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0623\u064a\u0636\u0627 (" + nMq + ")", "同时显示" + nMq + "条已隐藏的行", "Toon ook de " + nMq + " verborgen regels", "Mostrar também as " + nMq + " linhas ocultas", ("Visa även de " + nMq + " dolda raderna"), ("Показать также скрытые строки: " + nMq), ("Pokaż też ukryte wiersze (" + nMq + ")"), ("숨긴 " + nMq + "줄도 함께 보기"))));
        })(), h("div", { style: { padding: "8px 16px 0" } },
        h("div", { style: { position: "relative", borderRadius: 18, overflow: "hidden", marginBottom: 16, aspectRatio: "966/720", maxHeight: "44svh", background: "#04070A" } }, /* 30/07 : coin competition — la video suit la teinte de la fiche (maquette validee) */
          h("video", { src: "https://ldpjebgtskzdokrublfg.supabase.co/storage/v1/object/public/photos/Untitled%20folder/Ui/" + (((teinte || "").toUpperCase() === "#D6C4A1" || (teinte || "").toUpperCase() === "#D6C4A1" || (teinte || "").toUpperCase() === "#C9A66B") ? "palmares-dore.mp4" : (teinte || "").toUpperCase() === "#5C7A5E" ? "palmares-vert.mp4" : (teinte || "").toUpperCase() === "#C64B5C" ? "palmares-bordeaux.mp4" : "palmares-crystal.mp4"), muted: true, loop: true, autoPlay: true, playsInline: true, preload: "auto", ref: function (elV) { try { if (!elV) return; elV.muted = true; elV.setAttribute("playsinline", ""); var pV = elV.play(); if (pV && pV.catch) pV.catch(function () { setTimeout(function () { try { var p2 = elV.play(); if (p2 && p2.catch) p2.catch(function () { }); } catch (e7) { } }, 120); }); } catch (e8) { } }, onError: function (eV) { try { eV.currentTarget.parentNode.style.display = "none"; } catch (e9) { } }, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" } }),
          h("div", { style: { pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0.15) 0%, rgba(6,7,9,0) 35%, rgba(6,7,9,0.55) 78%, #060709 100%)" } })),
        (c.flots && c.flots.length) ? h("div", { className: "rbstrip" }, c.flots.map(rubanCard)) : null,
        ((chevalDyn && moi && chevalDyn.ownerId === moi.id) && resDb !== null) ? h(VideoResultatsOfficiels, { marge: "4px 0 14px", ouverte: !(resDb || []).some(function (rV) { return rV && rV.origine === "import"; }) /* 18/10 Blandine : repliee s il y a deja des resultats importes, se rouvre au toucher */, masquable: true , cle: "hype_perf_video_masquee_" + ((moi && moi.id) || "") }) : null,   /* (839) ; 13/10 (1087) Blandine : « mets-la plutot sur la page resultats apres celle qui est en ligne » : visible directement (plus repliee), pour la proprietaire, avec ou sans resultat */
        /* ═══ 23/08 session 153 — LA PAGE DES RÉSULTATS ══════════════════
           Maquette validée par Blandine : tuiles « Fraction » (place en
           grand + le mot PLACE + « sur N partants »), pondérée (les gros
           champs prennent la largeur), rangée par saison, épinglés en tête.
           🟥 Un épinglé QUITTE sa saison — il n apparaît jamais deux fois.
           🟥 Le rail de flots reste intact, il est dessiné juste au-dessus.
           Écrit en React : le module hype-resultats.js reste neutralisé.   */
        (function () {
          var fts = faitsPalmares();
          if (!fts.length) return h("div", { className: "empty" },
            T("Le palmarès commence ici.", "The record starts here.", "El palmarés empieza aquí.",
              "Il palmarès inizia qui.", "戦績はここから始まります。", "Die Erfolge beginnen hier.", "\u064a\u0628\u062f\u0623 \u0633\u062c\u0644 \u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a \u0647\u0646\u0627.", "战绩从这里开始。", "Het palmares begint hier.", "O histórico de resultados começa aqui.", "Meritlistan börjar här.", "Достижения начинаются здесь.", "Osiągnięcia zaczynają się tutaj.", "수상 기록이 여기서 시작돼요."));
          var epg = epinglesPalmares(fts);
          var poses = epg.length;
          var idsEp = {}; epg.forEach(function (f) { if (f.id) idsEp[f.id] = 1; });
          var proprio = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);

          /* ── les deux gestes, aux deux extrêmes de la tuile ──────────
             🟥 23/08 session 155 : la punaise et le format étaient au même
             coin, Blandine ne voyait plus la punaise. Punaise EN HAUT À
             GAUCHE, format EN BAS À DROITE. Et le trait passe de 22 % à
             48 % de blanc : à 22 % sur du presque noir, elle est invisible
             sur un téléphone.                                            */
          function bouton(coin, actif, dessin, action, titre) {
            var pos = { position: "absolute", zIndex: 4, width: 30, height: 30,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
            if (coin === "hg") { pos.top = 6; pos.left = 6; } else { pos.bottom = 6; pos.right = 6; }
            return h("div", { role: "button", "aria-label": titre, onClick: function (ev) {
              try { ev.stopPropagation(); ev.preventDefault(); } catch (e) { } action();
            }, style: pos },
              h("svg", { viewBox: "0 0 24 24", width: 15, height: 15,
                fill: "none", stroke: actif ? teinteCl : "rgba(255,255,255,0.48)",
                strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }, dessin));
          }
          var DESSIN_PUNAISE = [
            h("path", { key: "a", d: "M12 17v5" }),
            h("path", { key: "b", d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" })
          ];
          /* format : un rectangle large quand la tuile est carrée (« passe en
             large »), un carré quand elle est large (« reviens en carré ») */
          function dessinFormat(estLarge) {
            return estLarge
              ? [h("rect", { key: "c", x: 6, y: 6, width: 12, height: 12, rx: 2 })]
              : [h("rect", { key: "l", x: 3, y: 8, width: 18, height: 8, rx: 2 })];
          }

          /* 🟥 23/08 session 157 — `grille` REMISE. Elle avait disparu en
             session 155 : le remplacement du bloc de dessin découpait de
             `punaise` jusqu à `var blocs`, et elle était dedans. L appel
             ligne 33815 tombait alors sur la fonction `grille` DES RÉGLAGES
             (ligne ~47196), qui attend tout autre chose -> l app plantait
             sur la fiche cheval avec « Un caillou dans le sabot ».
             🟥 `node --check` n avait rien vu : la syntaxe etait parfaite.
             Le nom `grille` existe DEUX FOIS dans le fichier : ne jamais
             se fier a la portee, toujours verifier que la definition locale
             est encore la. */
          function grille(liste, cle) {
            return h("div", { key: cle, style: { display: "grid",
              gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 14,
              alignItems: "stretch" } },
              liste.map(function (f, i) { return tuile(f, cle + "-" + i); }));
          }

          function tuile(f, cle) {
            var gagne = (f.pl === 1);
            var large = formatLarge(f.ref, gagne, f.part);
            var reserve = large ? 118 : 40;   /* place gardée pour la coupe */
            return h("div", {
              key: cle,
              style: {
                gridColumn: large ? "span 2" : "auto",
                /* 🟥 un carré est un CARRÉ. aspectRatio, jamais minHeight :
                   avec minHeight le texte poussait la tuile vers le bas et
                   on obtenait des rectangles. Le texte est borné à la place. */
                aspectRatio: large ? "2.1 / 1" : "1 / 1",
                borderRadius: 14, padding: "13px 13px 12px", position: "relative", overflow: "hidden",
                display: "flex", flexDirection: "column",
                border: "1px solid " + (gagne ? tA(0.22) : "rgba(255,255,255,0.09)"),
                opacity: f.hors ? 0.62 : 1,
                background: gagne
                  ? ("radial-gradient(120% 90% at 108% 108%, " + tA(0.13) + ", transparent 60%),"
                     + " linear-gradient(155deg, rgba(20,24,28,0.92), rgba(9,12,15,0.95))")
                  : "linear-gradient(155deg, rgba(18,21,25,0.9), rgba(9,12,15,0.95))"
              }
            },
              (proprio && f.epinglable) ? bouton("hg", f.epingle != null, DESSIN_PUNAISE,
                function () { basculerEpingle(f.ref, poses); },
                f.epingle != null ? "Retirer l'épingle" : "Épingler") : null,
              (proprio && f.epinglable) ? bouton("bd", false, dessinFormat(large),
                function () { basculerFormat(f.ref, gagne, f.part); },
                large ? "Repasser en carré" : "Passer en pleine largeur") : null,

              h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',Georgia,serif", fontSize: 9.5,
                letterSpacing: "0.16em", color: gagne ? teinteCl : "#7D776D",
                paddingLeft: proprio ? 26 : 0 } }, f.an),
              h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',Georgia,serif",
                fontSize: large ? 16 : 12, fontWeight: 600, lineHeight: 1.26, marginTop: 8,
                color: "#F3EEE4", fontStyle: f.hors ? "italic" : "normal", paddingRight: reserve,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden" } }, f.nom),
              f.ep ? h("div", { style: { flex: "0 0 auto", fontSize: 9, color: "#A39D92", marginTop: 5,
                lineHeight: 1.35, paddingRight: reserve, display: "-webkit-box", WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical", overflow: "hidden" } }, courtEpreuve(f.ep)) : null,
              f.cav ? h("div", { style: { flex: "0 0 auto", fontSize: 9.5, color: "#A39D92",
                marginTop: 4, fontWeight: 500, paddingRight: reserve, whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
                fontStyle: f.hors ? "italic" : "normal" } }, f.cav) : null,
              h("div", { style: { flex: "0 0 auto", marginTop: "auto", paddingRight: reserve,
                paddingBottom: proprio ? 16 : 0 } },
                (f.pl == null)
                  ? h("span", { style: { fontSize: 13, fontStyle: "italic", color: "#A39D92" } },
                      T("Non classé", "Not placed", "Sin clasificar", "Non classificato", "不入賞", "Nicht platziert", "\u063a\u064a\u0631 \u0645\u0635\u0646\u0641", "未获得名次", "Niet geplaatst", "Não classificado", "Oplacerad", "Вне призёров", "Bez lokaty", "순위 없음"))
                  : h("span", null,
                      h("span", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: large ? 38 : 27,
                        lineHeight: 1, color: gagne ? teinteCl : "#F3EEE4" } }, String(f.pl)),
                      h("sup", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: large ? 15 : 11,
                        color: gagne ? teinteCl : "#F3EEE4" } }, f.pl === 1 ? "\u02b3\u1d49" : "\u1d49"),
                      h("span", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: large ? 13 : 10,
                        letterSpacing: "0.13em", textTransform: "uppercase", marginLeft: 4,
                        color: gagne ? teinteCl : "#A39D92" } },
                        T("place", "place", "puesto", "posto", "位", "Platz", "\u0627\u0644\u0645\u0631\u0643\u0632", "名", "plaats", "lugar", "plats", "место", "miejsce", "위"))),
                f.part ? h("span", { style: { display: "block", fontSize: 9.5, color: "#7D776D", marginTop: 5 } },
                  T("sur " + f.part, "of " + f.part, "de " + f.part, "su " + f.part,
                    f.part + "\u982d\u4e2d", "von " + f.part, "\u0645\u0646 " + f.part, "共 " + f.part, "van " + f.part, "de " + f.part, ("av " + f.part), ("из " + f.part), ("z " + f.part), ("총 " + f.part))) : null));
          }

          var blocs = [];
          if (epg.length) {
            blocs.push(h("div", { key: "et", style: { display: "flex", alignItems: "center", gap: 9, paddingTop: 6 } },
              h("svg", { viewBox: "0 0 24 24", width: 13, height: 13, fill: teinteCl, stroke: teinteCl,
                strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: { opacity: 0.78 } },
                h("path", { d: "M12 17v5" }),
                h("path", { d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" })),
              h("span", { style: { fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase",
                color: teinteCl, fontWeight: 700 } }, T("Épinglés", "Pinned", "Fijados", "Fissati", "ピン留め", "Angeheftet", "\u0627\u0644\u0645\u062b\u0628\u062a\u0629", "已置顶", "Vastgepind", "Fixados", "Fästa", "Закреплённые", "Przypięte", "고정됨")),
              h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg," + tA(0.45) + ", transparent)" } }),
              h("span", { style: { fontSize: 9.5, color: "#7D776D" } }, epg.length + " / " + PLAFOND_EPINGLES)));
            blocs.push(h("div", { key: "ets", style: { paddingTop: 7, fontSize: 11, color: "#A39D92", lineHeight: 1.6 } },
              T("Ce sont eux qui ouvrent la fiche du cheval.", "These open the horse's profile.",
                "Son los que abren la ficha del caballo.", "Sono loro ad aprire la scheda del cavallo.",
                "馬のページの先頭に表示されます。", "Sie eröffnen das Pferdeprofil.", "\u0647\u064a \u0627\u0644\u062a\u064a \u062a\u0641\u062a\u062a\u062d \u0635\u0641\u062d\u0629 \u0627\u0644\u062d\u0635\u0627\u0646.", "它们会打开这匹马的档案页。", "Zij openen de paardenpagina.", "São eles que abrem a ficha do cavalo.", "Det är dessa som öppnar hästens profil.", "Именно они открывают карточку лошади.", "To one otwierają profil konia.", "말 프로필을 열면 가장 먼저 보이는 결과예요.")));
            blocs.push(grille(epg, "epg"));
          }

          /* le reste, par saison décroissante — sans les épinglés */
          /* 🟥 les saisons sont listées à partir de TOUS les faits, épinglés
             compris : sinon une saison dont tout est épinglé disparaissait
             de la page sans un mot (constaté au banc d essai le 23/08). */
          var parAn = {};
          fts.forEach(function (f) {
            var a = f.an || "\u2014";
            parAn[a] = parAn[a] || [];
            if (!(f.id && idsEp[f.id])) parAn[a].push(f);
          });
          Object.keys(parAn).sort(function (a, b) { return String(b).localeCompare(String(a)); })
            .forEach(function (a) {
              var jeu = meilleursPalmares(parAn[a]).concat(parAn[a].filter(function (f) { return f.pl == null; }));
              var tot = fts.filter(function (f) { return (f.an || "\u2014") === a; });
              var nv = tot.filter(function (f) { return f.pl === 1; }).length;
              blocs.push(h("div", { key: "cap" + a, style: { display: "flex", alignItems: "baseline",
                gap: 10, paddingTop: 26 } },
                h("span", { style: { fontFamily: "'Cinzel',Georgia,serif", fontSize: 18, color: teinteCl } }, a),
                h("span", { style: { fontSize: 10, color: "#A39D92" } },
                  tot.length + " " + T("sorties", "starts", "salidas", "uscite", "出走", "Starts", "\u0645\u0634\u0627\u0631\u0643\u0627\u062a", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전")
                  + (nv ? (" \u00b7 " + nv + " " + T("victoires", "wins", "victorias", "vittorie", "勝", "Siege", "\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", "冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstwa", "우승")) : "")),
                h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg," + tA(0.4) + ", transparent)" } })));
              if (jeu.length) blocs.push(grille(jeu, "s" + a));
              var montes = tot.length - jeu.length;
              if (montes > 0) blocs.push(h("div", { key: "m" + a, style: { marginTop: 12, padding: "11px 13px",
                borderRadius: 11, border: "1px dashed " + tA(0.28), fontSize: 10.5, color: "#A39D92" } },
                montes + " " + (montes > 1
                  ? T("résultats épinglés, remontés en haut", "pinned results, moved to the top",
                      "resultados fijados, arriba", "risultati fissati, in alto", "件をピン留め（上部に表示）",
                      "angeheftete Ergebnisse, oben", "\u0646\u062a\u0627\u0626\u062c \u0645\u062b\u0628\u062a\u0629\u060c \u0645\u0631\u0641\u0648\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0639\u0644\u0649", "个置顶成绩，已移到最前面", "vastgepinde resultaten, bovenaan gezet", "resultados fixados, levados para o topo", "fästa resultat, flyttade högst upp", "закреплённых результатов, подняты наверх", "przypiętych wyników, przeniesionych na górę", "개의 결과가 고정되어 맨 위로 올라갔어요")
                  : T("résultat épinglé, remonté en haut", "pinned result, moved to the top",
                      "resultado fijado, arriba", "risultato fissato, in alto", "件をピン留め（上部に表示）",
                      "angeheftetes Ergebnis, oben", "\u0646\u062a\u064a\u062c\u0629 \u0645\u062b\u0628\u062a\u0629\u060c \u0645\u0631\u0641\u0648\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0639\u0644\u0649", "个置顶成绩，已移到最前面", "vastgepind resultaat, bovenaan gezet", "resultado fixado, levado para o topo", "fäst resultat, flyttat högst upp", "закреплённый результат, поднят наверх", "przypięty wynik, przeniesiony na górę", "개의 결과가 고정되어 맨 위로 올라갔어요"))));
            });
          return h("div", null, blocs);
        })(),
        /* 22/08 session 152 : la page des resultats vit dans hype-resultats.js. Si le fichier manque ou plante, on retombe sur l ancienne liste ci-dessus et le bouton d ajout — la fiche ne casse jamais. */
        /* 22/08 session 152 — MODULE NEUTRALISE. Il dessine du HTML brut dans un
   conteneur React : les deux mondes se marchent dessus, les blocs se
   superposent et le zoom plante (constate par Blandine le 22/08 midi).
   Les CALCULS de hype-resultats.js restent bons et eprouves ; c est
   l affichage qui sera refait dans le style de l app, sous le bloc IPO.
   Remettre `true` ci-dessous pour le reactiver.                      */
        false && h(HypeResultatsHote, { chevalId: id, lignes: lignesPourModule, proprietaire: peutSaisirResultat, onAjout: function () { setPanneau(null); ouvrirAjoutResultat(); }, onImport: function () { ouvrirImportFFE(); } }),
        /* ═══ 24/08 session 162 — LE BLOC DÉCOUVERTE DE L IMPORT ═══════════
           Décisions de Blandine, prises une par une ce soir :
           · la vidéo est CENTRÉE, 280 px — pas une carte horizontale ;
           · la phrase est encadrée de DEUX FILETS COURTS (écriture n° 8).
             Elle ne porte AUCUNE couleur : sur une fiche dorée ou crimson
             elle ne bouge pas d un cheveu. La teinte reste au seul bouton ;
           · le bouton porte un LISERÉ à gauche, comme le bloc résultats
             juste au-dessus, et AUCUN FOND. « Les boutons remplis, c est
             horrible » — vu en crimson, sans appel ;
           · libellé « Importer mes résultats OFFICIELS » : « importer »
             seul pouvait se lire comme « saisir à la main » ;
           🟥 « + Ajouter un résultat » EST RETIRÉ D ICI. Vérifié dans le
              code : deux boutons « + » existent déjà au bout du rail
              (clés `addres` et `addres2`) et ouvrent la même chose. Le
              troisième faisait doublon.
           🟥 « Comment préparer mon fichier ? » n est PAS ici : il se
              jouera sur l écran d import, avec la seconde vidéo.
           ⚠️ La vidéo porte une IMAGE DE COUVERTURE : si iOS refuse la
              lecture automatique, on voit la mascotte, pas un carré noir. */
        (chevalDyn && moi && (chevalDyn.ownerId === moi.id || estLieFiche || estModerateurHype(moi))) ? h("button", { className: "addbtn", onClick: function () { ouvrirImportFFE(); }, style: { marginBottom: 8 } }, "\u2913 " + T("Importer mes résultats", "Import my results", "Importar mis resultados", "Importa i miei risultati", "結果を取り込む", "Meine Ergebnisse importieren", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0646\u062a\u0627\u0626\u062c\u064a", "导入我的成绩", "Mijn uitslagen importeren", "Importar meus resultados", "Importera mina resultat", "Импортировать мои результаты", "Zaimportuj moje wyniki", "내 결과 가져오기")) : null,
        h("button", { className: "addbtn", onClick: function () { if (peutSaisirResultat) { setPanneau(null); ouvrirAjoutResultat(); } else bientot(); } }, "+ " + T("Ajouter un résultat", "Add a result", "Añadir resultado", "Aggiungi risultato", "結果を追加", "Ein Ergebnis hinzufügen", "\u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가")))) : h("div", { style: { padding: "0 0 28px" } },
        /* ═══ 25/08 s165 — PALMARÈS ÉDITORIAL (Proposition B, référence IMG_8514) ═══
           Le corps historique (vidéo + cartes par année) devient la « page technique »
           derrière le CTA VOIR TOUS SES RÉSULTATS (état palmTech). Les 4 chiffres
           reprennent l ALGO EXACT du résumé (s154) : toute évolution doit se faire
           AUX DEUX ENDROITS. */
        (function () {
          var lignesBrutes = (resDb || []).filter(function (r) { return r && (voirMasques || r.visible !== false) && (r.place != null || r.classement); }); /* 26/08 : LA COCHE DE L IMPORT EST RESPECTEE — decochee = gardee en base, PAS affichee (reproche Blandine 08h45) ; compteurs, saisons et listes suivent */
          function pl9(r) { if (r.place != null) return Number(r.place); var m9 = String(r.classement || "").match(/^\s*(\d+)/); return m9 ? Number(m9[1]) : null; }
          /* 06/09 : la ligne porte desormais son IDENTIFIANT, son ORIGINE (import ou
             saisie a la main) et la MENTION du telemat — necessaires pour la corbeille
             des saisies manuelles et pour la pastille « Sans faute ».
             ⚠️ Meme lecture du sans-faute que le lecteur d'import et hype-resultats.js :
             trois endroits, faute de module partage. Si la regle change, la changer aux trois. */
          /* 06/09 (Blandine) — LES POINTS DE QUALIFICATION, ADDITIONNES.
             ⚠️ ON NE RECALCULE RIEN. Le barème FFE dépend de l'indice, du quart,
             du coefficient d'épreuve, du circuit, de la division — et il a changé
             au 1er janvier 2026 (10 pts pour un sans-faute + points de quart, le
             tout coefficienté). Recalculer, ce serait produire des chiffres faux
             à chaque évolution du règlement. On additionne donc la colonne
             « Pts qualif. Chpt » que la FFE a elle-même calculée, telle qu'elle
             arrive du télémat. Une ligne sans points ne compte pas — elle n'est
             pas comptée comme zéro, elle est signalée à l'écran.
             ⚠️ La saison n'est PAS gravée : SAISON_DEBUT_MOIS/JOUR se changent en
             une ligne le jour où la FFE bouge ses dates (période de qualification
             fixée chaque année, et par championnat). */
          var SAISON_DEBUT_MOIS = 7, SAISON_DEBUT_JOUR = 1;   /* 1er juillet, choix de Blandine */
          function saisonDe(d) {
            try {
              var p = String(d || "").split("-"); if (p.length < 3) return null;
              var an = Number(p[0]), mo = Number(p[1]), jo = Number(p[2]);
              var apres = (mo > SAISON_DEBUT_MOIS) || (mo === SAISON_DEBUT_MOIS && jo >= SAISON_DEBUT_JOUR);
              return apres ? an : (an - 1);
            } catch (eSa) { return null; }
          }
          /* Le type d'épreuve est lu dans son nom, tel que la FFE l'écrit. */
          function familleEp(ep) {
            var t = String(ep || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (!t) return "Autres";
            if (/pr[e]?para/.test(t)) return "Preparatoire";
            if (/hunter/.test(t)) return "Hunter";
            if (/dressage/.test(t)) return "Dressage";
            /* 06/09 (Blandine : « As poney 2 c'est pas poney 2 ») — les As sont une
               CATÉGORIE À PART, pas un Poney 2 : le circuit des As ne se mélange pas
               avec les épreuves poney classiques. On les reconnaît AVANT, sinon
               « As Poney 2D » tombait dans Poney 2. Le suffixe de taille (A/B/C/D)
               n'entre pas dans le nom : c'est l'indice qui compte. */
            /* 06/09, 2e correction de Blandine (« As1 pareil ») : le télémat écrit
               aussi bien « As Poney 2D » que « As 1 » — c'est le même circuit des As.
               Les deux formes tombent donc dans le même groupe, indice compris. */
            /* 06/09, 3e correction (« en Amat tu comptes aussi W ? ») : le W est un
               niveau comme Élite ou 1-4, il a donc sa propre ligne. Avant, « Amateur W »
               tombait dans le fourre-tout « Amateur » et se mélangeait aux épreuves
               dont on n'a pas su lire l'indice. */
            /* ⚠️ Le W se teste AVANT le chiffre et avec une fin de mot, sinon il
               s'attrape au milieu d'un mot. Le chiffre, lui, ne PEUT PAS exiger une
               fin de mot : « As Poney 2D » colle l'indice à la taille du poney (D),
               et « 2D » ne serait plus reconnu (piège vu au banc d'essai). */
            if (/\bas\s*(?:poney\s*)?w\b/.test(t)) return "As Poney W";
            var mAs = /\bas\s*(?:poney\s*)?(elite|[1-4])/.exec(t);
            if (mAs) return "As Poney " + (mAs[1] === "elite" ? "Elite" : mAs[1]);
            if (/\bas\s*poney/.test(t)) return "As Poney";
            var mW = /(poney|club|amateur|pro)\s*w\b/.exec(t);
            if (mW) return mW[1].charAt(0).toUpperCase() + mW[1].slice(1) + " W";
            var mEl = /(poney|club|amateur|pro)\s*(elite|[1-4])/.exec(t);
            if (mEl) {
              var fam = mEl[1].charAt(0).toUpperCase() + mEl[1].slice(1);
              return fam + " " + (mEl[2] === "elite" ? "Elite" : mEl[2]);
            }
            if (/poney/.test(t)) return "Poney";
            if (/club/.test(t)) return "Club";
            if (/amateur/.test(t)) return "Amateur";
            return "Autres";
          }
          function estSFf(f) { var t = String(f && f.mn || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); if (!t) return false; return /(^|[^a-z])sf([^a-z]|$)/.test(t) || /sans\s*-?\s*faute/.test(t); }
          var tousF = lignesBrutes.map(function (r) { return { id: r.id, og: (r.origine || "main"), mn: String(r.mention || ""), pts: ((r.points == null || r.points === "") ? null : Number(r.points)), pl: pl9(r), part: r.partants ? Number(r.partants) : null, nom: r.concours || "", ep: r.epreuve || "", cav: r.cavalier || "", q: (r.quart == null ? null : Number(r.quart)), d: String(r.date_epreuve || ""), an: String(r.date_epreuve || "").slice(0, 4), cavId: r.cavalier_id || null /* (596) */, ff: (r.fort_force === true), fx: (r.fort_exclu === true) /* (600) */ }; }).filter(function (f) { return f.pl != null; });
          /* 30/08 — BARRE EMPILEE PAR SAISON. Liste PARALLELE a tousF qui GARDE les
             parcours SANS place (eliminations, abandons : place vide, classement
             "El." / "Ab."), volontairement ecartes de tousF par le .filter ci-dessus.
             Ces lignes SONT en base (decision 24/08 : « elimines et abandons comptent
             dans le palmares »), elles n etaient simplement jamais affichees.
             ⚠️ tousR ne sert QU A la barre. Ne jamais la brancher sur les 4 chiffres
             du bandeau, les moments forts, les onglets cavaliers ni sortiesDe : ces
             compteurs bougeraient tous d un coup. */
          var tousR = lignesBrutes.map(function (r) { return { pl: pl9(r), cav: r.cavalier || "", an: String(r.date_epreuve || "").slice(0, 4) }; });
          var ansR = {}; tousR.forEach(function (f) { if (f.an) (ansR[f.an] = ansR[f.an] || []).push(f); });
          var nV = tousF.filter(function (f) { return f.pl === 1; }).length;
          var nP = tousF.filter(function (f) { return f.pl <= 3; }).length;
          var nC = tousF.length;
          function sortiesDe(fs) { var parLieu = {}; fs.forEach(function (f) { if (!f.d) return; var k = f.nom.toLowerCase().trim(); (parLieu[k] = parLieu[k] || {})[f.d] = true; }); var tot = 0; Object.keys(parLieu).forEach(function (k) { var js = Object.keys(parLieu[k]).sort(); var prec = null; js.forEach(function (j) { var t = Date.parse(j + "T00:00:00Z"); if (prec == null || isNaN(t) || (t - prec) > 86400000) tot++; if (!isNaN(t)) prec = t; }); }); return tot; }
          var nS = sortiesDe(tousF);
          /* 26/08 — CLASSEMENT DES MOMENTS FORTS, regle dictee par Blandine (« pourquoi
             Villers alors que t'as l'Open de France gagne en P1, le Salon de Bordeaux,
             la P Elite de Barbizon ») : 1) les concours a TITRES d'abord (Open de
             France, championnats… puis les grands internationaux/salons), 2) puis le
             NIVEAU d'epreuve (Elite > 1 > 2 > 3), 3) puis les PARTANTS. Victoires en
             tete de pool, podiums en complement s'il manque des cartes. Le palmares
             ecrit en dur (decision 24/08 : s'affiche, ne compte pas) entre dans CE
             pool d'affichage, avec dedoublonnage (les deux Bordeaux ne font qu'un). */
          /* ⚠️ LE FILTRE NE TOUCHE PAS LES 4 CHIFFRES. nS/nV/nP/nC restent calcules
             sur TOUTES les lignes : un bandeau qui dirait « 18 sorties » alors que
             le cheval en a 12 serait faux, et Blandine lirait ses propres chiffres
             comme incoherents. Le filtre ne concerne que les LISTES. */
          /* ⚠️ REGLE DES PREPARATOIRES (Blandine, 02/09) : en preparatoire le
             classement n est pas un rang face aux autres, c est un verdict sur le
             parcours. 1er = sans faute ; toute autre place = il y a eu des fautes.
             On ne garde donc QUE la victoire, jamais une 2e ou 3e place — ni en
             « classes », ni en « podiums ».
             ⚠️ Une preparatoire n a pas de quart : sans cette regle explicite, un
             filtre sur `q === 1` la ferait disparaitre entierement. */
          function gardePrepa(fP) { return (fP.pl === 1) && /pr[ée]pa/i.test(String(fP.ep || "")); }
          function estPrepaLigne(fP) { return /pr[ée]pa/i.test(String(fP.ep || "")); }
          var vueF = tousF;
          if (vueRes === "classes") {
            vueF = tousF.filter(function (fQ) { return estPrepaLigne(fQ) ? gardePrepa(fQ) : (fQ.q === 1); });
          } else if (vueRes === "podiums") {
            vueF = tousF.filter(function (fQ) { return estPrepaLigne(fQ) ? gardePrepa(fQ) : ((fQ.pl || 99) <= 3); });
          } else if (vueRes === "sf") {
            vueF = tousF.filter(estSFf);
          }
          var fortsPool = vueF.slice();
          try {
            (((typeof c !== "undefined" && c) && c.palmares) || []).forEach(function (rJ) {
              if (!rJ || !rJ.event) return;
              var mR = String(rJ.rang || "").match(/^\s*(\d+)/); var plJ = mR ? Number(mR[1]) : null;
              if (plJ == null) return;
              var dsJ = String(rJ.ds || ""); var mC = dsJ.match(/avec\s+(.+)$/i);
              fortsPool.push({ pl: plJ, part: null, nom: String(rJ.event || ""), ep: dsJ.split("\u00b7")[0].trim(), cav: (mC ? mC[1].trim() : ""), d: "", an: String(rJ.annee || "").slice(0, 4) });
            });
          } catch (eFp) { }
          function poidsTitre(f) { var tT = ((f.nom || "") + " " + (f.ep || "")).toLowerCase(); /* (596) ECHELLE DES TITRES, reglee avec Blandine : 3 = titre NATIONAL (Open de France, championnat / chpt de France, coupe de France, criterium, finale, grand tournoi) ; 2 = INTERNATIONAL ou SALON (« le salon int de Bordeaux devrait etre plus important ») ; 1 = autre championnat (regional, des territoires, « Chp Reg »... — « on gardait les Reg ») ; 0 = epreuve ordinaire, et aussi un championnat ou circuit DEPARTEMENTAL sans mention regionale (« sans les dpt », 594). */ if (/open de france|championnat de france|chpt? de france|coupe de france|crit\u00e9rium|criterium|finale|grand tournoi/.test(tT)) return 3; if (/internation|\bint\b|salon du cheval|salon internat|\bsalon\b|\bequita\b|\beurexpo\b/.test(tT)) return 2; /* Equita Lyon = salon, sans le mot ; (598) la FFE l ecrit « EUREXPO » (le lieu) : enregistre tel quel, demande de Blandine */ if ((/\bd[e\u00e9]?pt\b|d[e\u00e9]partemental/.test(tT)) && !(/\breg\b|r[e\u00e9]gional/.test(tT))) return 0; if (/championnat|\bchpt?\b|des territoires/.test(tT)) return 1; return 0; }
          function poidsNiveau(f) { var eN = (f.ep || "").toLowerCase(); if (/\u00e9lite|elite/.test(eN)) return 5; var mN = eN.match(/\b([1-4])\b/); return mN ? (5 - Number(mN[1])) : 0; }
          function jetonFort(f) { var ts = String(f.nom || "").toLowerCase().replace(/[^a-z\u00e0-\u00ff ]/g, "").split(/\s+/).filter(function (w) { return w.length > 5; }).sort(function (a, b) { return b.length - a.length; }); return (f.an || "") + "|" + (ts[0] || String(f.nom || "").toLowerCase()); }
          /* 02/09 (Blandine) : « pas prioritaire en tant que moment fort ». Une
             victoire en preparatoire reste affichable, mais elle passe APRES les
             epreuves classantes — c est le premier critere du tri, avant meme le
             titre. Elle ne remonte donc en vitrine que faute de mieux. */
          function estPrepaF(f) { return /pr[ée]pa/i.test(String(f && f.ep || "")); }
          function triFort(a, b) { return ((estPrepaF(a) ? 1 : 0) - (estPrepaF(b) ? 1 : 0)) || (poidsTitre(b) - poidsTitre(a)) || ((a.pl === 1 ? 0 : 1) - (b.pl === 1 ? 0 : 1)) || ((b.part || 0) - (a.part || 0)) || (poidsNiveau(b) - poidsNiveau(a)) || ((a.pl || 99) - (b.pl || 99)); } /* (596) a titre egal, une VICTOIRE passe avant un placement, puis les partants */ /* (594) Blandine, option B : les PARTANTS passent avant le niveau d epreuve (avant : niveau puis partants) — un 1er sur 60 en Poney 2 remonte devant un 1er sur 12 en Poney 1 */
          /* (597) Blandine : « un passage ne suffit pas, mais en l occurrence ils gagnent ! » — le pool reste celui des
             VICTOIRES (podiums en complement s il manque des cartes), comme avant le 596. Equita Lyon et l Open a
             Fontainebleau remontent parce que ce sont des victoires a un grand rendez-vous (echelle des titres du 596)
             et que deux Open la meme annee avec deux chevaux ne sont plus confondus (dedoublonnage par cheval).
             (598) « par defaut je dirais victoire » : le pool automatique = les VICTOIRES, point. (Le choix a la main
             d un moment fort — en retirer un, en ajouter un autre — est un chantier a part, demande le 03/10.) */
          /* (600) les moments forts CHOISIS A LA MAIN passent devant ; les RETIRES a la main ne reviennent pas tout seuls. */
          var forces = fortsPool.filter(function (f) { return f.id && etatFort(f).ff; }).slice().sort(triFort);
          function libreFort(f) { var eL = etatFort(f); return !eL.fx && !eL.ff; }
          var vics = fortsPool.filter(function (f) { return f.pl === 1 && libreFort(f); }).slice().sort(triFort);
          /* 🟩 06/09 (Blandine : "5 sur la page resultat, rajoute une ligne avec deux encarts") */ if (forces.length + vics.length < 5) vics = vics.concat(fortsPool.filter(function (f) { return f.pl > 1 && f.pl <= 3 && libreFort(f); }).slice().sort(triFort));
          vics = forces.concat(vics);
          var forts = []; var jetonsVus = {};
          /* 🟩 06/09 (Blandine : "5 sur la page resultat, rajoute une ligne avec deux encarts") */ vics.forEach(function (fV) { if (forts.length >= 5) return; var jV = jetonFort(fV) + "|" + String(fV.cav || "").toLowerCase(); /* (596) dedoublonnage par rendez-vous ET par cheval/cavalier : deux Open de France la meme annee avec deux chevaux font deux cartes ; les deux jours de Bordeaux avec le meme cheval n en font qu une. La cle des medias choisis (jetonFort seul) ne change pas. */ if (jetonsVus[jV]) return; jetonsVus[jV] = 1; forts.push(fV); });
          var ans = {}; vueF.forEach(function (f) { if (f.an) (ans[f.an] = ans[f.an] || []).push(f); });
          var listeAns = Object.keys(ans).sort().reverse();
          var cavStats = {}; tousF.forEach(function (fC) { if (!fC.cav) return; if (!cavStats[fC.cav]) cavStats[fC.cav] = { n: 0, d: "" }; cavStats[fC.cav].n++; if ((fC.d || "") > cavStats[fC.cav].d) cavStats[fC.cav].d = fC.d || ""; });
          var cavsPalm = Object.keys(cavStats).sort(function (cA, cB) { return (cavStats[cB].n - cavStats[cA].n) || cavStats[cB].d.localeCompare(cavStats[cA].d); }); /* 27/08 : onglets cavaliers TRIES — celui qui a le plus monte d abord, puis les plus recents (demande Blandine) */
          function filtreCav(lF) { return (cavFiltre && cavFiltre !== "tous") ? lF.filter(function (fF) { return fF.cav === cavFiltre; }) : lF; }
          /* 🟩 06/09 (Blandine) — "Derniers resultats" en cartes comme sur la page ecurie,
   MEME rendu que le rail plus haut (medaille, annee, portrait rond, 1er CAVALIER sur
   CHEVAL, concours, epreuve, partants, autres classes). Source : filtreCav(vueF), donc
   suit desormais l'onglet cavalier choisi juste au-dessus — avant, cette section restait
   toujours sur les resultats les plus recents TOUS cavaliers confondus, meme quand un
   onglet (Elena C., Manon H....) etait choisi : "pas normal que ce soit les resultats de
   Liam qui apparaissent a leur nom". Plafond a 6 cartes, choisi par elle. */
var recents = filtreCav(vueF).slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); });
          var MOIS9 = ["JANV.", "F\u00c9VR.", "MARS", "AVR.", "MAI", "JUIN", "JUIL.", "AO\u00dbT", "SEPT.", "OCT.", "NOV.", "D\u00c9C."];
          function dateFr(d) { try { return hypeDateLoc(d).toUpperCase(); } catch (e9) { return d; } }   /* 19/10 : dans la langue de l appli (en francais : meme ecriture qu avant) */
          var OR9 = "#C9A66B";   /* 18/10 : champagne de la nouvelle page */
          var aImpF = (resDb || []).some(function (rI) { return rI && rI.origine === "import"; });   /* 18/10 : des resultats deja importes ? */
          /* 18/10 : couleurs et legende des saisons = celles de la nouvelle page Performances (1re, 2e, 3e, autres places, elim. / abandon) */
          var COUL_SAIS = [["p1", "#C9A66B", T("1re", "1st", "1.º", "1º", "1位", "1.", "الأول", "第1名", "1e", "1º", "1:a", "1-е", "1.", "1위")], ["p2", "rgba(243,238,228,0.75)", T("2e", "2nd", "2.º", "2º", "2位", "2.", "الثاني", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd", "2nd")], ["p3", "#A9713C", T("3e", "3rd", "3.º", "3º", "3位", "3.", "الثالث", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd", "3rd")], ["aut", "rgba(243,238,228,0.22)", T("autres places", "other places", "otros puestos", "altri posti", "その他", "andere Plätze", "مراكز أخرى", "其他名次", "andere plaatsen", "outras colocações", "andra placeringar", "другие места", "inne miejsca", "기타 순위")], ["elab", "#7A3B34", T("élim. / abandon", "elim. / retired", "elim. / abandono", "elim. / ritiro", "失権/棄権", "ausgesch. / aufgeg.", "استبعاد / انسحاب", "淘汰 / 弃权", "uitgesch. / opgave", "elim. / desistência", "utsl. / bröt", "выбывание / снятие", "wyc. / rezygnacja", "탈락 / 기권")]];
          /* 18/10 (Blandine : proposition 4 « dans le bandeau du graphique ») : le choix Tous / Classes / Podiums / Sans faute en petits mots
             en haut du cadre du graphique, le reglage « enregistre comme visible » en icone dans le coin, la mention des masques dessous.
             Proprietaire seulement ; ne touche RIEN en base ni aux compteurs (seulement les listes). */
          function bandeauAff() {
            var proprioB = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
            if (!proprioB) return null;
            var choixB = [["tous", T("Tous", "All", "Todos", "Tutti", "\u3059\u3079\u3066", "Alle", "\u0627\u0644\u0643\u0644", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체")], ["classes", T("Class\u00e9s", "Placed", "Clasificados", "Piazzati", "\u5165\u8cde", "Platziert", "\u0627\u0644\u0645\u0635\u0646\u0641", "获得名次", "Geplaatst", "Classificados", "Placerade", "Призёры", "Sklasyfikowane", "입상")], ["podiums", T("Podiums", "Podiums", "Podios", "Podi", "\u8868\u5f70\u53f0", "Podien", "\u0645\u0646\u0635\u0627\u062a", "领奖台", "Podiums", "Pódios", "Prispallsplaceringar", "Пьедесталы", "Podia", "시상대")], ["sf", T("Sans faute", "Clear round", "Sin faltas", "Netto", "\u30af\u30ea\u30a2", "Fehlerfrei", "\u0628\u0644\u0627 \u0623\u062e\u0637\u0627\u0621", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bez błędu", "무실수")]];
            var nMasqB = tousF.length - vueF.length;
            return h("div", { "data-saisons-affichage": "1", style: { margin: "0 4px 12px" } },
              h("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontFamily: "'Montserrat',sans-serif", fontSize: 11.5 } },
                choixB.map(function (cB) { var onB = (vueRes === cB[0]); return h("span", { key: "vb" + cB[0], role: "button", onClick: function () { poserVueRes(cB[0]); }, style: { cursor: "pointer", color: onB ? "#E6CF9C" : "rgba(243,238,228,0.6)", fontWeight: onB ? 600 : 500, textDecoration: onB ? "underline" : "none", textUnderlineOffset: 4, whiteSpace: "nowrap" } }, cB[1]); }),
                h("button", { type: "button", "aria-label": T("R\u00e9gler ce qui est enregistr\u00e9 comme visible", "Set what is saved as visible", "Ajustar lo visible", "Regolare cosa resta visibile", "\u8868\u793a\u7bc4\u56f2\u3092\u8a2d\u5b9a", "Sichtbarkeit festlegen", "\u0636\u0628\u0637 \u0645\u0627 \u064a\u0638\u0647\u0631", "设置哪些已记录内容可见", "Instellen wat als zichtbaar is opgeslagen", "Ajustar o que é salvo como visível", "Ställ in vad som sparas som synligt", "Настроить, что сохраняется как видимое", "Ustaw, co zapisane jest jako widoczne", "표시 중으로 저장된 항목 조정"), onClick: function () { setNiveauOuvert(true); }, style: { marginInlineStart: "auto", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(201,166,107,0.45)", background: "rgba(7,10,8,0.4)", color: "#C9A66B", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } },
                  h("svg", { viewBox: "0 0 24 24", width: 15, height: 15, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("circle", { cx: 12, cy: 12, r: 3 }), h("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })))),
              (vueRes !== "tous" && nMasqB > 0) ? h("div", { style: { marginTop: 6, fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.5)" } }, nMasqB + " " + T("masqu\u00e9s \u00b7 compteurs complets", "hidden \u00b7 counters complete", "ocultos \u00b7 contadores completos", "nascosti \u00b7 contatori completi", "\u4ef6\u975e\u8868\u793a\uff08\u96c6\u8a08\u306f\u5168\u4ef6\uff09", "ausgeblendet \u00b7 Z\u00e4hler vollst\u00e4ndig", "\u0645\u062e\u0641\u064a\u0629 \u00b7 \u0627\u0644\u0639\u062f\u0627\u062f\u0627\u062a \u0643\u0627\u0645\u0644\u0629", "已隐藏 · 计数完整", "verborgen · tellers compleet", "ocultos · contadores completos", "dolda · räknarna är kompletta", "скрыто · счётчики полные", "ukryte · pełne liczniki", "숨김 · 전체 카운트 포함")) : null);
          }
          var photoPalmId = (chevalDyn && chevalDyn.photo_palmares) || photoCh; /* 25/08 : en-tete = surcharge admin si posee, sinon la tete du cheval */
          function filetOr() { return h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,166,107,.5))" } }); }
          /* 02/09 (Blandine) — UNE PHOTO PAR MOMENT FORT, JAMAIS LA MEME TROIS FOIS.
             Ordre de recherche :
               1. un album dont le NOM evoque le concours -> photo vraiment liee au moment ;
               2. sinon, tirage au hasard dans toutes ses photos, SANS REPETITION entre
                  les trois cartes (melange sement sur l identifiant du cheval + le jour,
                  donc stable dans la journee et renouvele le lendemain) ;
               3. s il n y a AUCUNE photo d album, seule la premiere carte reprend le
                  portrait du cheval — les deux autres restent sur leur degrade plutot
                  que de repeter la meme image, ce qui etait precisement le reproche. */
          var motsClesF = function (t) {
            return String(t || "").toLowerCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9 ]+/g, " ").split(" ")
              .filter(function (m) { return m.length >= 4; });
          };
          var photoDAlbumPourF = function (f) {
            if (!f || !albumsForts || !albumsForts.length) return null;
            var mots = motsClesF(f.nom).concat(motsClesF(f.ep));
            if (!mots.length) return null;
            var trouve = null;
            albumsForts.forEach(function (aF) {
              if (trouve) return;
              var nomA = String(aF.nom || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              for (var iM = 0; iM < mots.length; iM++) {
                if (nomA.indexOf(mots[iM]) >= 0) { trouve = aF.photos[0]; return; }
              }
            });
            return trouve;
          };
          var grainePhF = (function () {
            var t = String(id || "") + "|" + Math.floor(Date.now() / 86400000), n = 0;
            for (var iG = 0; iG < t.length; iG++) { n = (n * 31 + t.charCodeAt(iG)) >>> 0; }
            return n;
          })();
          var pioche = (photosForts || []).slice();
          (function melanger() { /* mulberry32, meme graine toute la journee */
            var a = grainePhF;
            function rnd() { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
            for (var iP = pioche.length - 1; iP > 0; iP--) { var jP = Math.floor(rnd() * (iP + 1)); var tmp = pioche[iP]; pioche[iP] = pioche[jP]; pioche[jP] = tmp; }
          })();
          var dejaPrises = {};
          /* \U0001f7e9 06/09 (Blandine) : qui peut choisir la photo/video d'un moment fort ?
             la proprietaire du cheval, ou une moderatrice Hype — meme logique que le
             changement de photo_palmares plus haut. */
          var peutChoisirMediaF = !!((chevalDyn && moi && chevalDyn.ownerId === moi.id) || (typeof estModerateurHype === "function" && estModerateurHype(moi)));
          /* (600) CHOIX A LA MAIN DES MOMENTS FORTS (Blandine : « un bouton pour que le cavalier puisse choisir par lui-meme de
             retirer un moment fort et d en ajouter un autre »). Deux colonnes sur `resultats` : fort_force (ajoute a la main,
             passe devant le tri automatique) et fort_exclu (retire a la main, ne revient plus tout seul). Un meme choix vaut
             pour la page du cheval et celle du cavalier (c est la meme ligne). Qui peut : la proprietaire du cheval ou une
             moderatrice (page cheval), la cavaliere elle-meme (sa page). fortsLocal repond tout de suite, Supabase confirme ;
             un refus (colonnes absentes, pas le droit) est DIT et le choix revient en arriere. */
          var peutChoisirForts = peutChoisirMediaF || !!((typeof riderId !== "undefined") && riderId && moi && moi.id === riderId);
          function etatFort(fE) { var loc = (fE && fE.id && fortsLocal[fE.id]) || null; return { ff: loc ? !!loc.ff : !!(fE && fE.ff), fx: loc ? !!loc.fx : !!(fE && fE.fx) }; }
          function poserFort(fE, champs) {
            if (!fE || !fE.id) return;
            var idR = fE.id, avant = fortsLocal[idR] || null, base = etatFort(fE);
            var apres = { ff: (champs.fort_force != null) ? !!champs.fort_force : base.ff, fx: (champs.fort_exclu != null) ? !!champs.fort_exclu : base.fx };
            setFortsLocal(function (pL) { var nL = Object.assign({}, pL); nL[idR] = apres; return nL; });
            function revenir() { setFortsLocal(function (pL) { var nL = Object.assign({}, pL); if (avant) nL[idR] = avant; else delete nL[idR]; return nL; }); }
            (async function () {
              try {
                var rF = await supa.from("resultats").update(champs).eq("id", idR).select("id");
                if (rF && rF.error) {
                  var msgF = String(rF.error.message || rF.error);
                  alert(/fort_force|fort_exclu|column|colonne/i.test(msgF)
                    ? T("La base n'est pas encore pr\u00eate pour ce choix (colonnes fort_force / fort_exclu manquantes). Passe le SQL donn\u00e9 au suivi, puis r\u00e9essaie.", "The database is not ready for this choice yet (fort_force / fort_exclu columns missing). Run the SQL from the log, then try again.", "La base de datos a\u00fan no est\u00e1 lista (faltan las columnas fort_force / fort_exclu).", "Il database non \u00e8 ancora pronto (colonne fort_force / fort_exclu mancanti).", "\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306e\u6e96\u5099\u304c\u3067\u304d\u3066\u3044\u307e\u305b\u3093\uff08fort_force / fort_exclu\uff09\u3002", "Die Datenbank ist daf\u00fcr noch nicht bereit (Spalten fort_force / fort_exclu fehlen).", "\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u063a\u064a\u0631 \u062c\u0627\u0647\u0632\u0629 \u0628\u0639\u062f (\u0627\u0644\u0623\u0639\u0645\u062f\u0629 fort_force / fort_exclu \u0645\u0641\u0642\u0648\u062f\u0629).", "数据库还没有为这个选择做好准备（缺少 fort_force / fort_exclu 列）。请执行跟进记录中给出的 SQL，然后重试。", "De database is nog niet klaar voor deze keuze (kolommen fort_force / fort_exclu ontbreken). Voer de SQL uit het logboek uit en probeer het dan opnieuw.", "O banco de dados ainda não está pronto para esta escolha (colunas fort_force / fort_exclu ausentes). Rode o SQL indicado no acompanhamento e tente de novo.", "Databasen är inte redo för det här valet ännu (kolumnerna fort_force / fort_exclu saknas). Kör SQL:en som står i loggen och försök igen.", "База данных пока не готова к этому выбору (нет столбцов fort_force / fort_exclu). Выполни SQL из журнала изменений и попробуй снова.", "Baza nie jest jeszcze gotowa na ten wybór (brakuje kolumn fort_force / fort_exclu). Uruchom SQL podany w suivi, a potem spróbuj ponownie.", "이 선택을 위한 데이터베이스가 아직 준비되지 않았어요(fort_force / fort_exclu 열이 없어요). 업데이트 기록에 있는 SQL을 실행한 뒤 다시 시도해 주세요.")
                    : T("Le choix n'a pas pu \u00eatre enregistr\u00e9 : ", "The choice could not be saved: ", "No se pudo guardar: ", "Impossibile salvare: ", "\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\uff1a", "Auswahl nicht gespeichert: ", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631: ", "无法保存这个选择：", "De keuze kon niet worden opgeslagen: ", "Não foi possível salvar a escolha: ", "Valet kunde inte sparas: ", "Не удалось сохранить выбор: ", "Nie udało się zapisać wyboru: ", "선택을 저장하지 못했어요: ") + msgF);
                  revenir(); return;
                }
                if (!rF || !rF.data || !rF.data.length) { alert(T("Ce r\u00e9sultat n'a pas pu \u00eatre modifi\u00e9 (pas autoris\u00e9 sur cette ligne).", "This result could not be changed (not allowed on this row).", "No se pudo modificar este resultado (sin permiso).", "Impossibile modificare questo risultato (non autorizzato).", "\u3053\u306e\u7d50\u679c\u306f\u5909\u66f4\u3067\u304d\u307e\u305b\u3093\uff08\u6a29\u9650\u306a\u3057\uff09\u3002", "Dieses Ergebnis konnte nicht ge\u00e4ndert werden (keine Berechtigung).", "\u062a\u0639\u0630\u0631 \u062a\u0639\u062f\u064a\u0644 \u0647\u0630\u0647 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 (\u063a\u064a\u0631 \u0645\u0633\u0645\u0648\u062d).", "无法修改这条成绩（你没有权限修改这一行）。", "Dit resultaat kon niet worden gewijzigd (niet toegestaan op deze regel).", "Não foi possível alterar este resultado (sem permissão nesta linha).", "Det här resultatet kunde inte ändras (inte tillåtet på den här raden).", "Этот результат не удалось изменить (нет доступа к этой строке).", "Nie udało się zmienić tego wyniku (brak uprawnień do tego wiersza).", "이 결과를 수정할 수 없었어요(이 줄에 대한 권한이 없어요).")); revenir(); return; }
              } catch (eF) { alert(String(eF)); revenir(); }
            })();
          }
          function carteFort(f, grande, idx) {
            if (!f) return null;
            var jetonF = jetonFort(f);
            var surchargeF = (chevalDyn && chevalDyn.moments_forts_medias && chevalDyn.moments_forts_medias[jetonF]) || null;
            /* (596) Blandine : sur la page CHEVAL, l encart montre le CAVALIER du resultat (portrait de son compte
               Hype, quand le resultat est relie a un compte) ; sinon l ancienne regle (album du concours, photo
               d album au hasard, portrait du cheval sur le premier encart). Un meme cavalier peut revenir. */
            var phSujetF = (f.cavId && avatarsCav && avatarsCav[String(f.cavId)]) || null;
            var phF = surchargeF ? surchargeF.url : (phSujetF || photoDAlbumPourF(f));
            if (!surchargeF && !phSujetF) {
              if (phF && dejaPrises[phF]) phF = null;
              if (!phF) {
                for (var iF2 = 0; iF2 < pioche.length; iF2++) {
                  if (!dejaPrises[pioche[iF2]]) { phF = pioche[iF2]; break; }
                }
              }
              if (!phF && idx === 0) phF = photoCh; /* le portrait, mais UNE seule fois */
              if (phF) dejaPrises[phF] = 1;
            }
            var estVidF = surchargeF && surchargeF.type === "video";
            return h("div", { key: "mf" + idx, role: "button", onClick: function () { if (!f.an) return; try { setSaisonOuv(String(f.an)); setTimeout(function () { var eSc = document.getElementById("hype-saison-" + f.an); if (eSc) eSc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 90); } catch (eMF) { } }, /* 26/08 : un moment fort OUVRE sa saison (fini les cartes qui n'emmenent nulle part) */ style: { cursor: "pointer", position: "relative", borderRadius: 15, overflow: "hidden", border: "1px solid rgba(214,196,161,0.45)" /* (962) lisere champagne des pages Photos / Videos */, background: "#0A0D11", /* 🟩 06/09 (Blandine : "rallonge un peu la partie ou y a la photo, a chaque fois tu la coupes en deux, ca gache l'effet visuel") */ /* 🟩 06/09 (Blandine : "on garde le format large mais large ne veut pas dire tres court en hauteur, rallonge un peu sa hauteur") */ height: grande ? 280 : 178, flex: grande ? null : 1, minWidth: 0 } },
              phF ? (estVidF
                ? hypeMiniatureVideo(phF, { largeur: 900, objectPosition: "center 28%", picto: false, style: { position: "absolute", inset: 0, opacity: .82 } })
                : h("img", { src: phF, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%", opacity: .82 } })) : null,
              h("div", { style: { pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(4,6,9,0) 30%, rgba(4,6,9,.55) 58%, rgba(4,6,9,.93) 86%)" } }),
              h("div", { style: { position: "absolute", top: 9, left: 9, width: grande ? 36 : 27, height: grande ? 36 : 27, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontWeight: 800, fontSize: grande ? 16 : 12.5, background: grande ? "radial-gradient(circle at 35% 30%, #F0CE8C, #B9873C)" : "rgba(4,10,12,.74)", color: grande ? "#241503" : "#E6CF9C", border: grande ? "1px solid rgba(255,255,255,.3)" : "1.5px solid rgba(201,166,107,.8)" } },
                /* (601) Blandine : « plutot qu un 1 bleu fluo, un petit dessin de coupe sur les victoires » : une coupe au trait pour une victoire, le rang en champagne sinon (plus de turquoise). (596) le vrai rang dans la pastille. */
                (!f.pl || f.pl === 1) ? h("span", { "aria-label": "1er", style: { fontSize: grande ? 18 : 13, lineHeight: 1, display: "block" } }, "\uD83C\uDFC6") : String(f.pl)), /* (603) Blandine : « mets celle-la tout simplement » — la coupe emoji, pas le dessin au trait */
              /* \U0001f7e9 06/09 : petit crayon discret, reserve a peutChoisirMediaF — n'empeche pas
                 le clic sur la carte (stopPropagation) qui ouvrirait la saison a la place. */
              peutChoisirMediaF ? h("button", { onClick: function (eEd) { eEd.stopPropagation(); ouvrirPickerMomentF(jetonF); }, "aria-label": T("Choisir la photo ou la vid\u00e9o", "Choose the photo or video", "Elegir foto o v\u00eddeo", "Scegli foto o video", "\u5199\u771f\u307e\u305f\u306f\u52d5\u753b\u3092\u9078\u3076", "Foto oder Video w\u00e4hlen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0635\u0648\u0631\u0629 \u0623\u0648 \u0627\u0644\u0641\u064a\u062f\u064a\u0648", "选择照片或视频", "De foto of video kiezen", "Escolher a foto ou o vídeo", "Välj fotot eller videon", "Выбрать фото или видео", "Wybierz zdjęcie lub film", "사진 또는 영상 고르기"), style: { position: "absolute", top: 7, right: 7, width: grande ? 30 : 24, height: grande ? 30 : 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,.35)", background: "rgba(4,6,9,.6)", color: "#F2EDE2", fontSize: grande ? 13 : 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } }, "\u270e") : null,
              /* (600) « − » : retire ce moment fort (un choisi a la main redevient automatique ; un automatique est exclu). */
              (peutChoisirForts && f.id) ? h("button", { onClick: function (eRm) { eRm.stopPropagation(); var eF = etatFort(f); poserFort(f, eF.ff ? { fort_force: false } : { fort_exclu: true }); }, "aria-label": T("Retirer ce moment fort", "Remove this highlight", "Quitar este momento", "Rimuovi questo momento", "\u3053\u306e\u30cf\u30a4\u30e9\u30a4\u30c8\u3092\u5916\u3059", "Diesen Moment entfernen", "\u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0647 \u0627\u0644\u0644\u062d\u0638\u0629", "移除这个精彩时刻", "Dit hoogtepunt verwijderen", "Remover este momento marcante", "Ta bort den här höjdpunkten", "Убрать этот яркий момент", "Usuń ten najważniejszy moment", "이 하이라이트 삭제"), style: { position: "absolute", top: 7, right: peutChoisirMediaF ? (grande ? 43 : 37) : 7, width: grande ? 30 : 24, height: grande ? 30 : 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,.35)", background: "rgba(4,6,9,.6)", color: "#F2EDE2", fontSize: grande ? 17 : 14, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 } }, "\u2212") : null,
              h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: grande ? "0 12px 12px" : "0 9px 9px", textAlign: "center" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: grande ? 14.5 : 10.8, color: "#F2EDE2", letterSpacing: ".03em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.nom + (f.an ? " " + f.an : "")),
                f.ep ? h("div", { style: { marginTop: 2, fontSize: grande ? 11 : 9.3, color: "#D8D2C6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.ep) : null,
                h("div", { style: { marginTop: 2, fontSize: grande ? 11 : 9.3, color: "#D8D2C6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                  h("span", { style: { color: OR9, fontWeight: 700 } }, (f.pl && f.pl !== 1) ? (f.pl + "e") : "1er"), " sur " + (f.part || "?") /* 22/09 (350) : le vrai rang - un podium ajoute aux moments forts affichait « 1er » */, f.cav ? " \u00b7 " : null, f.cav ? h("span", { style: { color: "#F3EEE4", fontWeight: 700 } }, f.cav) : null)));
          }
          /* 18/10 : cheval sans aucun resultat -> la page vide de la maquette (plus de chiffres a zero ni de video seule) */
          if (!tousF.length) return h(React.Fragment, null,
            heroSousPageCh(T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")),
            ongletsPanCh("20px 16px 4px"),
            h(PageVideResultatsHype, { nom: (chevalDyn && chevalDyn.nom) || c.nom || "", peutAjouter: !!peutSaisirResultat, onAjouter: function () { ouvrirAjoutResultat(); }, peutImporter: !!(chevalDyn && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi))), onImporter: ouvrirImportFFE, cleVideo: "hype_perf_video_masquee_" + ((moi && moi.id) || "") }));
          return h(React.Fragment, null,
            /* — 1 · IDENTITÉ — (encart commun, voir encartIdentiteCh) */
            heroSousPageCh(T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과") /* (962) comme l onglet */),
            ongletsPanCh("20px 16px 4px"),
            /* — 2 · LE BANDEAU DES QUATRE CHIFFRES — */
            /* 🟩 06/09 (Blandine : espace un peu plus tout ca) */ h("div", { style: { display: "flex", margin: "18px 16px 0", padding: "15px 6px 14px", borderRadius: 14, background: "rgba(255,255,255,0.028)", border: "1px solid rgba(214,196,161,0.45)" /* (962) */ } },
              [[nS, T("sorties", "outings", "salidas", "uscite", "\u51fa\u5834", "Starts", "\u0645\u0634\u0627\u0631\u0643\u0627\u062a", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전")], [nV, T("victoires", "wins", "victorias", "vittorie", "\u512a\u52dd", "Siege", "\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", "冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstwa", "우승")], [nP, T("podiums", "podiums", "podios", "podi", "\u8868\u5f70\u53f0", "Podien", "\u0645\u0646\u0635\u0627\u062a \u062a\u062a\u0648\u064a\u062c", "领奖台", "podiumplaatsen", "pódios", "prispallsplaceringar", "пьедесталов", "podia", "시상대")], [nC, T("class\u00e9s", "placings", "clasificados", "piazzamenti", "\u5165\u8cde", "Platzierungen", "\u0645\u0635\u0646\u0641", "获得名次", "geplaatst", "classificados", "placerade", "призовых мест", "w czołówce", "입상")]].map(function (cq, iq) {
                return h("div", { key: "q" + iq, style: { flex: 1, textAlign: "center", minWidth: 0 } },
                  h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: "#F3EEE4" } }, String(cq[0])),
                  h("div", { style: { marginTop: 2, fontSize: 8.2, letterSpacing: ".13em", color: "rgba(243,238,228,0.62)", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, cq[1])); })),
            /* 13/10 (1087) la petite video « resultats officiels » (retiree de la fiche) : ici, ouverte, pour la proprietaire, avec « Masquer la video » */
            (!aImpF && chevalDyn && moi && chevalDyn.ownerId === moi.id) ? h(VideoResultatsOfficiels, { marge: "26px 16px 0", ouverte: !(resDb || []).some(function (rV) { return rV && rV.origine === "import"; }) /* 18/10 Blandine : repliee s il y a deja des resultats importes, se rouvre au toucher */, masquable: true , cle: "hype_perf_video_masquee_" + ((moi && moi.id) || "") }) : null,
            /* — 5 · DERNIERS RÉSULTATS — 18/10 (Blandine) cartes de la maquette (112 x 176, trois par ecran) ; : remontes en haut, a la place de la video quand des resultats sont deja importes */
            recents.length ? h(React.Fragment, null,
              h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "44px 16px 14px" } }, /* 18/10 : espaces homogenes : 44 px au-dessus de chaque titre, 14 px dessous ; 27/08 : 24 -> 40px, davantage de respiration entre les deux blocs (demande Blandine) */
                h("div", { style: { fontSize: 11.5, letterSpacing: ".14em", fontWeight: 700, color: OR9 } }, T("Derniers résultats", "Latest results", "Últimos resultados", "Ultimi risultati", "最新の成績", "Letzte Ergebnisse", "\u0622\u062e\u0631 \u0627\u0644\u0646\u062a\u0627\u0626\u062c", "最近成绩", "Laatste resultaten", "Últimos resultados", "Senaste resultat", "Последние результаты", "Ostatnie wyniki", "최근 결과").toUpperCase()), filetOr()),
                              (function () {
                  var grpR = {}, ordreR = [];
                  recents.forEach(function (rr) {
                    if (!rr) return;
                    var cle = String(rr.nom || "") + "|" + String(rr.ep || "") + "|" + String(rr.d || rr.an || "");
                    /* 14/09 (155) : le SECOND rail garde aussi la date complete, sinon il
                       serait reste a l annee (son groupe s appelle grpR, pas grp). */
                    if (!grpR[cle]) { grpR[cle] = { concours: rr.nom || "", epreuve: rr.ep || "", an: rr.an || "", date: rr.d || "", partants: rr.part || null, places: [] }; ordreR.push(cle); }
                    grpR[cle].places.push({ rang: rr.pl || null, cavalier: rr.cav || "" });
                    if (!grpR[cle].partants && rr.part) grpR[cle].partants = rr.part;
                  });
                  var nomChR = (chevalDyn && chevalDyn.nom) || c.nom || "";
                  return h(RailDerniersHype, { n: Math.min(6, ordreR.length), rendu: function (geo) { function kz(v) { return geo ? Math.round(v * geo.k * 10) / 10 : v; } return ordreR.slice(0, 6).map(function (cle, iR) {
                    var gr = grpR[cle];
                    var tries = (gr.places || []).slice().sort(function (a5, b5) { return (a5.rang || 99) - (b5.rang || 99); });
                    var meilleur = tries[0] || {};
                    var coup = meilleur.rang === 1 ? "🏆" : meilleur.rang === 2 ? "🥈" : meilleur.rang === 3 ? "🥉" : "🎖️";
                    var rangTxt = meilleur.rang ? hypeRangCourt(meilleur.rang) : "";
                    return hypeDRCarte(geo, { key: "dr" + iR, role: "button", onClick: function () { if (gr.an) { try { setSaisonOuv(String(gr.an)); setTimeout(function () { var eSc = document.getElementById("hype-saison-" + gr.an); if (eSc) eSc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 90); } catch (eDR) { } } },
                      style: { flex: geo ? "1 1 0" : "0 0 112px", minWidth: 0, minHeight: geo ? geo.hauteur : 176 /* 19/10 (soir) : minHeight - le texte ne se chevauche plus, les cartes d une ligne restent egales */, boxSizing: "border-box", overflow: "hidden", padding: (geo && geo.horiz) ? (kz(12) + "px " + kz(16) + "px") : (kz(9) + "px " + kz(9) + "px " + kz(10) + "px"), gap: (geo && geo.horiz) ? kz(16) : undefined, justifyContent: (geo && !geo.horiz && !(geo.cols === 3 && geo.hauteur === 176)) ? "center" : undefined, borderRadius: 16, background: "linear-gradient(165deg, #101D22 0%, #070A08 100%)", border: "1px solid rgba(214,196,161,0.35)", boxShadow: "none", display: "flex", flexDirection: (geo && geo.horiz) ? "row" : "column", alignItems: "center", textAlign: (geo && geo.horiz) ? "start" : "center", cursor: "pointer" } }, [   /* 18/10 : carte de la maquette (texte centre, couleurs de la nouvelle page) */
                      h("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" } },
                        h("span", { style: { fontSize: kz(13), lineHeight: 1 } }, coup),
                        /* 14/09 (155) : la date entiere, ecrite en clair (« 12 sept. 2026 »), avec
                       repli sur la seule annee si la date est absente ou illisible. Les DEUX
                       rails identiques du fichier sont corriges : c est le meme element. */
                    (function () {
                      var txtD = gr.an || "";
                      try {
                        var mD = String(gr.date || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
                        if (mD) {
                          var MO = ["janv.", "f\u00e9vr.", "mars", "avril", "mai", "juin", "juil.", "ao\u00fbt", "sept.", "oct.", "nov.", "d\u00e9c."];
                          txtD = hypeDateLoc(mD[1] + "-" + mD[2] + "-" + mD[3]);   /* 19/10 : date dans la langue de l appli */
                        }
                      } catch (eD) { }
                      return txtD ? h("span", { style: { marginLeft: "auto", fontSize: kz(8.5), color: "rgba(243,238,228,0.62)", letterSpacing: ".04em", fontFamily: "'Montserrat',sans-serif", whiteSpace: "nowrap" } }, txtD) : null;
                    })()),
                      photoCh ? h("img", { src: photoCh, alt: "", loading: "lazy", onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (e9) { } }, style: { width: (geo && geo.horiz) ? geo.img : kz(46), height: (geo && geo.horiz) ? geo.img : kz(46), flexShrink: 0, borderRadius: "50%", objectFit: "cover", marginTop: (geo && geo.horiz) ? 0 : kz(7), border: "1px solid rgba(214,196,161,0.45)" /* (962) */ } }) : null,
                      h("div", { style: { fontSize: kz(10), fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#F3EEE4", marginTop: kz(6), lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } },
                        h("bdi", null, (rangTxt ? (rangTxt + " ") : "") + (meilleur.cavalier || "")) /* 19/10 (soir) : ordre des mots en arabe */,
                        nomChR ? h("span", { style: { color: "#F3EEE4", fontWeight: 700 } }, hypeT7(" sur ", " on ", " con ", " su ", " \u00b7 ", " auf ", " \u0639\u0644\u0649 ", " / ", " van ", " em ", " av ", " из ", " na ", " 중 "), h("bdi", null, nomChR)) : null),
                      h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: kz(10), fontWeight: 700, color: "#F3EEE4", marginTop: kz(5), lineHeight: 1.25, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } }, gr.concours || "—"),
                      /* 21/09 (316) : epreuve et partants sur UNE ligne, coupee proprement - la carte a une hauteur FIXE. */
                      (gr.epreuve || gr.partants) ? h("div", { style: { fontSize: kz(8.5), color: "rgba(243,238,228,0.62)", fontFamily: "'Montserrat',sans-serif", marginTop: 3, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" } }, [gr.epreuve || "", gr.partants ? ("/ " + gr.partants) : ""].filter(Boolean).join("  \u00b7  ")) : null,
                      null,
                      (function () {
                        /* 21/09 (316) : une seule ligne « + N autres classees » (carte a hauteur fixe) ;
                           les noms restent dans le panneau Performances, ouvert au toucher de la carte. */
                        var nAutresF = Math.max(0, tries.length - 1);
                        if (!nAutresF) return null;
                        return h("div", { style: { marginTop: 5, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: kz(8.5), color: "rgba(243,238,228,0.62)", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.35, width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                          "+ " + nAutresF + " " + (nAutresF === 1 ? hypeT7("autre class\u00e9e", "other placed", "otra clasificada", "altra classificata", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierung", "\u0645\u0635\u0646\u0641\u0629 \u0623\u062e\u0631\u0649", "位其他获得名次者", "andere geplaatst", "outra classificada", "annan placerad", "другой призёр", "inne miejsce w klasyfikacji", "기타 입상 1건") : hypeT7("autres class\u00e9es", "others placed", "otras clasificadas", "altre classificate", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierungen", "\u0645\u0635\u0646\u0641\u0627\u062a \u0623\u062e\u0631\u064a\u0627\u062a", "位其他获得名次者", "andere geplaatsten", "outras classificadas", "andra placerade", "других призёров", "inne miejsca w klasyfikacji", "기타 입상")));
                      })()]);
                  }); } });
                })()) : null,
            /* — 3 · SES MOMENTS FORTS — 18/10 : rendu de la nouvelle page Performances (MosaiqueFortsHype) ; meme choix des moments
               forts (forts, fort_force / fort_exclu), memes droits, meme feuille photo (picker), une carte ouvre toujours sa saison.
               Photo : seulement celle choisie a la main (moments_forts_medias) — plus de portrait ni de photo d album au hasard. */
            (forts.length || (peutChoisirForts && fortsPool.length)) ? h(MosaiqueFortsHype, {   /* cheval sans resultat : pas de case vide */
              forts: forts,
              photoDe: function (f) { var sF = (chevalDyn && chevalDyn.moments_forts_medias && chevalDyn.moments_forts_medias[jetonFort(f)]) || null; if (sF && sF.url) return { url: sF.url, video: sF.type === "video" }; var avF = f && f.cavId && avatarsCav && avatarsCav[String(f.cavId)]; if (!avF && f && f.cav && avatarsCav) { var nmF = String(f.cav).trim().toLowerCase(); for (var iAv = 0; iAv < tousF.length && !avF; iAv++) { var gAv = tousF[iAv]; if (gAv && gAv.cavId && String(gAv.cav || "").trim().toLowerCase() === nmF) avF = avatarsCav[String(gAv.cavId)] || null; } } return avF ? { url: avF, video: false } : null; },   /* 18/10 : resultat non relie au compte -> portrait trouve par le meme nom de cavalier sur un autre resultat relie */   /* 18/10 Blandine : sinon le portrait du cavalier du resultat */
              peutPhoto: function () { return peutChoisirMediaF; },
              peutRetirer: function (f) { return !!(peutChoisirForts && f && f.id); },
              onPhoto: function (f) { ouvrirPickerMomentF(jetonFort(f)); },
              onRetirer: function (f) { var eF = etatFort(f); poserFort(f, eF.ff ? { fort_force: false } : { fort_exclu: true }); },
              onAjouter: peutChoisirForts ? function () { setChoixFortOuvert(true); } : null,
              onCarte: function (f) { if (!f || !f.an) return; try { setSaisonOuv(String(f.an)); setTimeout(function () { var eSc = document.getElementById("hype-saison-" + f.an); if (eSc) eSc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 90); } catch (eMF) { } }
            }) : null,
            /* \U0001f7e9 06/09 (Blandine : "vrai bouton pour choisir photo/video sur un moment
               fort") \u2014 le picker s'ouvre en tapant le crayon d'une carte moment fort. Choix
               fait DANS les photos/videos deja envoyees sur ce cheval (chargerPhotosSouvenirs) :
               pas de nouvel envoi ici, la photo/video existe deja quelque part sur la fiche. */
            /* (600) la feuille « Ajouter un moment fort » : tous ses resultats visibles qui ne sont pas deja en vitrine, du plus recent au plus ancien. */
            /* (601) la feuille « niveau enregistre comme visible » */
            niveauOuvert ? hypePortailBody(h("div", { onClick: function () { if (!niveauBusy) setNiveauOuvert(false); }, "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
              h("div", { onClick: function (eNf) { eNf.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "80vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Enregistr\u00e9 comme visible", "Saved as visible", "Guardado como visible", "Salvato come visibile", "\u8868\u793a\u3059\u308b\u7d50\u679c", "Als sichtbar gespeichert", "\u0645\u062d\u0641\u0648\u0638 \u0643\u0638\u0627\u0647\u0631", "已保存为可见", "Opgeslagen als zichtbaar", "Salvo como visível", "Sparad som synlig", "Сохранено как видимое", "Zapisano jako widoczne", "표시하도록 저장했어요")),
                h("div", { style: { fontSize: 11, lineHeight: 1.5, color: "rgba(243,238,228,.5)", textAlign: "center", marginBottom: 14, fontFamily: "'Montserrat',sans-serif" } }, T("Choisis le niveau \u00e0 garder visible pour les r\u00e9sultats import\u00e9s de ce cheval. Les sans-faute restent toujours visibles. Rien n'est supprim\u00e9 : \u00ab voir les masqu\u00e9s \u00bb les montre, et tu peux changer d'avis.", "Choose the level kept visible for this horse's imported results. Clear rounds always stay visible. Nothing is deleted: \u201cshow hidden\u201d still lists them, and you can change your mind.", "Elige el nivel visible para los resultados importados. Los sin faltas siempre quedan visibles. Nada se borra.", "Scegli il livello visibile per i risultati importati. I netti restano sempre visibili. Nulla viene cancellato.", "\u53d6\u308a\u8fbc\u3093\u3060\u7d50\u679c\u306e\u8868\u793a\u30ec\u30d9\u30eb\u3092\u9078\u3073\u307e\u3059\u3002\u30af\u30ea\u30a2\u306f\u5e38\u306b\u8868\u793a\u3002\u524a\u9664\u306f\u3055\u308c\u307e\u305b\u3093\u3002", "W\u00e4hle, welche importierten Ergebnisse sichtbar bleiben. Fehlerfreie Runden bleiben immer sichtbar. Nichts wird gel\u00f6scht.", "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0630\u064a \u064a\u0628\u0642\u0649 \u0638\u0627\u0647\u0631\u0627 \u0644\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0645\u0633\u062a\u0648\u0631\u062f\u0629. \u0627\u0644\u062c\u0648\u0644\u0627\u062a \u0628\u0644\u0627 \u0623\u062e\u0637\u0627\u0621 \u062a\u0628\u0642\u0649 \u0638\u0627\u0647\u0631\u0629 \u062f\u0627\u0626\u0645\u0627. \u0644\u0627 \u064a\u064f\u062d\u0630\u0641 \u0634\u064a\u0621.", "选择要保持可见的级别，用于这匹马导入的成绩。零罚分成绩始终可见。什么都不会被删除：点“查看已隐藏”就能看到，你也可以随时改主意。", "Kies welk niveau zichtbaar blijft voor de geïmporteerde resultaten van dit paard. Foutloze rondes blijven altijd zichtbaar. Er wordt niets verwijderd: met \"verborgen resultaten tonen\" zie je ze weer, en je kunt altijd van gedachten veranderen.", "Escolha o nível a manter visível para os resultados importados deste cavalo. Os resultados sem faltas permanecem sempre visíveis. Nada é apagado: “ver ocultos” os mostra, e você pode mudar de ideia.", "Välj vilken nivå som ska vara synlig för den här hästens importerade resultat. Felfria ritter förblir alltid synliga. Inget tas bort: ”visa dolda” visar dem, och du kan ändra dig.", "Выбери уровень, который остаётся видимым для импортированных результатов этой лошади. Маршруты без штрафных очков всегда остаются видимыми. Ничего не удаляется: «показать скрытые» покажет их, и ты можешь передумать.", "Wybierz poziom, który ma pozostać widoczny dla zaimportowanych wyników tego konia. Przejazdy bezbłędne zawsze pozostają widoczne. Nic nie jest usuwane: „pokaż ukryte” je wyświetla, a ty możesz zmienić zdanie.", "이 말에서 가져온 결과 중 계속 보여 줄 수준을 선택하세요. 무결점 라운드는 항상 보여요. 삭제되는 것은 없어요. “숨긴 결과 보기”로 다시 볼 수 있고 언제든 바꿀 수 있어요.")),
                h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1 } },
                  NIVEAUX_VIS.map(function (nV) {
                    var plV = nvPlan(nV.c);
                    return h("div", { key: "nv" + nV.c, role: "button", onClick: function () { if (niveauBusy) return; if (!plV.total) return; if (confirm(nV.t + " \u2014 " + plV.vis.length + " " + T("visibles", "visible", "visibles", "visibili", "\u8868\u793a", "sichtbar", "\u0638\u0627\u0647\u0631\u0629", "可见", "zichtbaar", "visíveis", "synliga", "видимые", "widoczne", "표시됨") + ", " + plV.masq.length + " " + T("masqu\u00e9s", "hidden", "ocultos", "nascosti", "\u975e\u8868\u793a", "ausgeblendet", "\u0645\u062e\u0641\u064a\u0629", "已隐藏", "verborgen", "ocultos", "dolda", "скрытые", "ukryte", "숨김") + ". " + T("Appliquer ?", "Apply?", "\u00bfAplicar?", "Applicare?", "\u9069\u7528\u3057\u307e\u3059\u304b\uff1f", "Anwenden?", "\u062a\u0637\u0628\u064a\u0642\u061f", "确定应用吗？", "Toepassen?", "Aplicar?", "Tillämpa?", "Применить?", "Zastosować?", "적용할까요?"))) nvAppliquer(nV.c); }, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 6px", minHeight: 56, borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: niveauBusy ? "default" : "pointer", opacity: niveauBusy ? .5 : 1 } },
                      h("div", { style: { flex: 1, minWidth: 0 } },
                        h("div", { style: { fontSize: 13.5, fontWeight: 700, color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif" } }, nV.t),
                        h("div", { style: { fontSize: 11, color: "rgba(243,238,228,0.62)", fontFamily: "'Montserrat',sans-serif", marginTop: 1 } }, nV.s)),
                      h("div", { style: { flex: "0 0 auto", textAlign: "right", fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#E6CF9C", lineHeight: 1.35 } }, plV.vis.length + " " + T("visibles", "visible", "visibles", "visibili", "\u8868\u793a", "sichtbar", "\u0638\u0627\u0647\u0631\u0629", "可见", "zichtbaar", "visíveis", "synliga", "видимые", "widoczne", "표시됨"), h("br"), h("span", { style: { color: "rgba(243,238,228,0.5)" } }, plV.masq.length + " " + T("masqu\u00e9s", "hidden", "ocultos", "nascosti", "\u975e\u8868\u793a", "ausgeblendet", "\u0645\u062e\u0641\u064a\u0629", "已隐藏", "verborgen", "ocultos", "dolda", "скрытые", "ukryte", "숨김"))));
                  })),
                h("button", { onClick: function () { if (!niveauBusy) setNiveauOuvert(false); }, style: { marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, niveauBusy ? "\u2026" : T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))))) : null,
            choixFortOuvert ? hypePortailBody(h("div", { onClick: function () { setChoixFortOuvert(false); }, "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
              h("div", { onClick: function (eCf) { eCf.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "78vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Ajouter un moment fort", "Add a highlight", "A\u00f1adir un momento", "Aggiungi un momento", "\u30cf\u30a4\u30e9\u30a4\u30c8\u3092\u8ffd\u52a0", "Moment hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0644\u062d\u0638\u0629 \u0628\u0627\u0631\u0632\u0629", "添加精彩时刻", "Hoogtepunt toevoegen", "Adicionar um momento marcante", "Lägg till en höjdpunkt", "Добавить яркий момент", "Dodaj najważniejszy moment", "하이라이트 추가")),
                h("div", { style: { fontSize: 11, color: "rgba(243,238,228,.45)", textAlign: "center", marginBottom: 14, fontFamily: "'Montserrat',sans-serif" } }, T("Touche un r\u00e9sultat pour le mettre en vitrine. Un moment fort choisi \u00e0 la main passe devant le classement automatique.", "Tap a result to showcase it. A hand-picked highlight comes before the automatic ranking.", "Toca un resultado para destacarlo. Un momento elegido a mano pasa delante del orden autom\u00e1tico.", "Tocca un risultato per metterlo in vetrina. Un momento scelto a mano precede l\u2019ordine automatico.", "\u7d50\u679c\u3092\u30bf\u30c3\u30d7\u3057\u3066\u30cf\u30a4\u30e9\u30a4\u30c8\u306b\u3057\u307e\u3059\u3002\u624b\u52d5\u3067\u9078\u3093\u3060\u3082\u306e\u304c\u512a\u5148\u3055\u308c\u307e\u3059\u3002", "Tippe ein Ergebnis an, um es hervorzuheben. Ein von Hand gew\u00e4hlter Moment steht vor der automatischen Reihenfolge.", "\u0627\u0644\u0645\u0633\u064a \u0646\u062a\u064a\u062c\u0629 \u0644\u0625\u0628\u0631\u0627\u0632\u0647\u0627. \u0627\u0644\u0644\u062d\u0638\u0629 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u064a\u062f\u0648\u064a\u0627 \u062a\u0633\u0628\u0642 \u0627\u0644\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a.", "点一条成绩把它放进展示柜。手动选择的精彩时刻优先于自动排名。", "Tik op een resultaat om het in de spotlight te zetten. Een handmatig gekozen hoogtepunt gaat voor op het automatische klassement.", "Toque em um resultado para colocá-lo em destaque. Um momento marcante escolhido à mão tem prioridade sobre a classificação automática.", "Tryck på ett resultat för att lyfta fram det. En handplockad höjdpunkt går före den automatiska rankningen.", "Нажми на результат, чтобы выставить его на витрину. Яркий момент, выбранный вручную, идёт раньше автоматического рейтинга.", "Dotknij wyniku, aby wystawić go na widok. Najważniejszy moment wybrany ręcznie ma pierwszeństwo przed klasyfikacją automatyczną.", "결과를 눌러 쇼케이스에 올려 보세요. 직접 고른 하이라이트가 자동 순위보다 먼저 표시돼요.")),
                h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
                  (function () {
                    var dejaIds = {}; forts.forEach(function (fD) { if (fD && fD.id) dejaIds[fD.id] = 1; });
                    var cands = tousF.filter(function (fC) { return fC.id && !dejaIds[fC.id]; }).slice().sort(function (a1, b1) { return (b1.d || "").localeCompare(a1.d || ""); }).slice(0, 80);
                    if (!cands.length) return h("div", { style: { color: "rgba(243,238,228,0.62)", fontSize: 12.5, textAlign: "center", padding: "18px 0", fontFamily: "'Montserrat',sans-serif" } }, T("Aucun autre r\u00e9sultat \u00e0 proposer.", "No other result to offer.", "Ning\u00fan otro resultado.", "Nessun altro risultato.", "\u4ed6\u306b\u7d50\u679c\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Kein weiteres Ergebnis.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u064a\u062c\u0629 \u0623\u062e\u0631\u0649.", "没有其他可推荐的成绩了。", "Geen ander resultaat om voor te stellen.", "Nenhum outro resultado a sugerir.", "Inga fler resultat att föreslå.", "Других результатов для предложения нет.", "Brak innych wyników do zaproponowania.", "제안할 다른 결과가 없어요."));
                    return cands.map(function (fC) {
                      var eC = etatFort(fC);
                      return h("div", { key: "cf" + fC.id, role: "button", onClick: function () { poserFort(fC, { fort_force: true, fort_exclu: false }); setChoixFortOuvert(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", minHeight: 48, borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" } },
                        h("div", { style: { flex: "0 0 74px", fontSize: 10.5, letterSpacing: ".04em", color: "rgba(243,238,228,0.62)", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.25 } }, fC.d ? dateFr(fC.d) : (fC.an || "")),
                        h("div", { style: { flex: 1, minWidth: 0 } },
                          h("div", { style: { fontSize: 13, fontWeight: 700, color: "#F3EEE4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Montserrat',sans-serif" } }, fC.nom || ""),
                          h("div", { style: { fontSize: 11, color: "#D8D2C6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Montserrat',sans-serif" } }, (fC.ep || "") + (fC.cav ? " \u00b7 " + fC.cav : "") + (eC.fx ? " \u00b7 " + T("retir\u00e9", "removed", "quitado", "rimosso", "\u5916\u3057\u305f", "entfernt", "\u0645\u064f\u0632\u0627\u0644", "已移除", "verwijderd", "removido", "borttaget", "убрано", "usunięto", "삭제됨") : ""))),
                        h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: OR9 } }, (fC.pl || "?") + "/" + (fC.part || "?")));
                    });
                  })()),
                h("button", { onClick: function () { setChoixFortOuvert(false); }, style: { marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))))) : null,
            pickerMomentF ? hypePortailBody(h("div", { onClick: function () { setPickerMomentF(null); }, style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
              h("div", { onClick: function (ePk) { ePk.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "78vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Photo ou vid\u00e9o de ce moment", "Photo or video for this highlight", "Foto o v\u00eddeo de este momento", "Foto o video di questo momento", "\u3053\u306e\u77ac\u9593\u306e\u5199\u771f\u30fb\u52d5\u753b", "Foto oder Video f\u00fcr diesen Moment", "\u0635\u0648\u0631\u0629 \u0623\u0648 \u0641\u064a\u062f\u064a\u0648 \u0644\u0647\u0630\u0647 \u0627\u0644\u0644\u062d\u0638\u0629", "这个时刻的照片或视频", "Foto of video van dit moment", "Foto ou vídeo deste momento", "Foto eller video från den här stunden", "Фото или видео для этого момента", "Zdjęcie lub film z tego momentu", "이 순간의 사진 또는 영상")),
                h("div", { style: { fontSize: 11, color: "rgba(243,238,228,.45)", textAlign: "center", marginBottom: 14, fontFamily: "'Montserrat',sans-serif" } }, T("Choisis parmi les photos et vid\u00e9os d\u00e9j\u00e0 envoy\u00e9es sur ce cheval.", "Pick from the photos and videos already sent for this horse.", "Elige entre las fotos y v\u00eddeos ya enviados de este caballo.", "Scegli tra le foto e i video gi\u00e0 inviati per questo cavallo.", "\u3053\u306e\u99ac\u306b\u3059\u3067\u306b\u9001\u3089\u308c\u305f\u5199\u771f\u30fb\u52d5\u753b\u304b\u3089\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002", "W\u00e4hle aus den bereits gesendeten Fotos und Videos dieses Pferdes.", "\u0627\u062e\u062a\u0627\u0631\u064a \u0645\u0646 \u0628\u064a\u0646 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u0627\u0644\u062a\u064a \u0623\u0631\u0633\u0644\u062a \u0644\u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646.", "从已上传到这匹马的照片和视频中选择。", "Kies uit de foto’s en video’s die al zijn verstuurd voor dit paard.", "Escolha entre as fotos e vídeos já enviados para este cavalo.", "Välj bland de foton och videor som redan skickats för den här hästen.", "Выбери из фото и видео, уже загруженных для этой лошади.", "Wybierz spośród zdjęć i filmów już wysłanych dla tego konia.", "이 말에 이미 올린 사진과 영상 중에서 고르세요.")),
                /* 18/10 (Blandine : « choisir ou importer une photo sur chacun des moments forts ») : importer une photo depuis le telephone */
                h("label", { "data-fort-importer-photo": "1", style: { display: "block", textAlign: "center", marginBottom: 12, padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(16,26,29,0.85)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" } },
                  "+ " + T("Importer une photo", "Upload a photo", "Subir una foto", "Carica una foto", "\u5199\u771f\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9", "Foto hochladen", "\u0631\u0641\u0639 \u0635\u0648\u0631\u0629", "上传照片", "Foto importeren", "Importar uma foto", "Ladda upp ett foto", "Загрузить фото", "Prześlij zdjęcie", "사진 가져오기"),
                  h("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: async function (eFi) {
                    var fic = eFi && eFi.target && eFi.target.files && eFi.target.files[0]; if (!fic) return;
                    var jtF = pickerMomentF;
                    setToast(T("Envoi de la photo\u2026", "Uploading the photo\u2026", "Subiendo la foto\u2026", "Caricamento della foto\u2026", "\u5199\u771f\u3092\u9001\u4fe1\u4e2d\u2026", "Foto wird hochgeladen\u2026", "\u062c\u0627\u0631\u064d \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0635\u0648\u0631\u0629\u2026", "正在发送照片…", "Foto uploaden…", "Enviando a foto…", "Laddar upp fotot…", "Отправка фото…", "Wysyłanie zdjęcia…", "사진 전송 중…"));
                    try { var rFi = await envoyerPhoto(fic); if (rFi && rFi.url) { await definirMediaMomentFort(jtF, rFi.url); return; } } catch (eUp) { }
                    setToast(T("Envoi impossible", "Upload failed", "No se pudo subir", "Caricamento non riuscito", "\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093", "Hochladen fehlgeschlagen", "\u062a\u0639\u0630\u0631 \u0627\u0644\u0631\u0641\u0639", "无法发送", "Uploaden mislukt", "Envio impossível", "Uppladdningen misslyckades", "Отправка невозможна", "Nie udało się wysłać", "전송할 수 없어요")); setTimeout(function () { setToast(null); }, 2400);
                  } })),
                h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
                  (mediaTousMF === null) ? h("div", { style: { color: "rgba(243,238,228,0.45)", fontSize: 12.5, fontFamily: "'Montserrat',sans-serif", textAlign: "center", padding: "22px 0" } }, "\u2026")
                    : (!mediaTousMF.length ? h("div", { style: { color: "rgba(243,238,228,0.45)", fontSize: 12.5, fontFamily: "'Montserrat',sans-serif", fontStyle: "italic", textAlign: "center", padding: "22px 0" } }, T("Aucune photo ni vid\u00e9o pour l'instant.", "No photo or video yet.", "A\u00fan ninguna foto ni v\u00eddeo.", "Ancora nessuna foto o video.", "\u307e\u3060\u5199\u771f\u3082\u52d5\u753b\u3082\u3042\u308a\u307e\u305b\u3093\u3002", "Noch kein Foto oder Video.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0635\u0648\u0631 \u0648\u0644\u0627 \u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", "暂时没有照片或视频。", "Nog geen foto of video.", "Nenhuma foto nem vídeo por enquanto.", "Inga foton eller videor ännu.", "Пока нет ни фото, ни видео.", "Na razie brak zdjęć i filmów.", "아직 사진이나 영상이 없어요."))
                      : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 } },
                        mediaTousMF.map(function (uM, iM) {
                          var vidM = typeof estUrlVideo === "function" && estUrlVideo(uM);
                          return h("div", { key: "pmf" + iM, role: "button", onClick: function () { definirMediaMomentFort(pickerMomentF, uM); }, style: { position: "relative", paddingBottom: "100%", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: "#12242b" } },
                            vidM
                              ? hypeMiniatureVideo(uM, { largeur: 400, style: { position: "absolute", inset: 0 } })
                              : h("img", { src: uM, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
                            vidM ? h("div", { style: { position: "absolute", right: 4, bottom: 4, fontSize: 13 } }, "\u25b6\ufe0f") : null);
                        }))),
                (chevalDyn && chevalDyn.moments_forts_medias && chevalDyn.moments_forts_medias[pickerMomentF]) ? h("button", { onClick: function () { definirMediaMomentFort(pickerMomentF, null); }, style: { marginTop: 12, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "rgba(243,238,228,0.65)", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Revenir au choix automatique", "Go back to automatic choice", "Volver a la elecci\u00f3n autom\u00e1tica", "Torna alla scelta automatica", "\u81ea\u52d5\u9078\u629e\u306b\u623b\u3059", "Zur automatischen Auswahl zur\u00fcckkehren", "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a", "恢复自动选择", "Terug naar de automatische keuze", "Voltar à escolha automática", "Tillbaka till det automatiska valet", "Вернуться к автоматическому выбору", "Wróć do wyboru automatycznego", "자동 선택으로 되돌리기")) : null,
                h("button", { onClick: function () { setPickerMomentF(null); }, style: { marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))))) : null,
            /* — 4 · PAR SAISON (fermées ; chevrons prêts pour le dépliage) — */
            listeAns.length ? h(largeCh ? "div" : React.Fragment, largeCh ? { "data-res-lecture": "saisons", style: { maxWidth: 880, marginLeft: "auto", marginRight: "auto" } } : null, /* 19/10 (soir) audit ordinateur : colonne de lecture centree (880 px) sur grand ecran, telephone inchange */
              h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "44px 16px 14px" } },
                h("div", { style: { fontSize: 11.5, letterSpacing: ".14em", fontWeight: 700, color: OR9 } }, T("Par saison", "By season", "Por temporada", "Per stagione", "\u30b7\u30fc\u30ba\u30f3\u5225", "Nach Saison", "\u062d\u0633\u0628 \u0627\u0644\u0645\u0648\u0633\u0645", "按赛季", "Per seizoen", "Por temporada", "Per säsong", "По сезонам", "Według sezonu", "시즌별").toUpperCase()), filetOr()),
              (cavsPalm.length >= 2) ? h("div", { style: Object.assign({ display: "flex", gap: 7, margin: "0 16px 11px", overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }, largeCh ? { flexWrap: "wrap", overflowX: "visible", rowGap: 8 } : {}) /* 19/10 (soir) : a la ligne sur grand ecran */ }, /* 26/08 : les resultats propres a chaque cavalier (demande Blandine) */
                [["tous", T("Tous", "All", "Todos", "Tutti", "\u5168\u54e1", "Alle", "\u0627\u0644\u0643\u0644", "全部", "Alles", "Todos", "Alla", "Все", "Wszystkie", "전체")]].concat(cavsPalm.map(function (cV) { return [cV, cV]; })).map(function (oC) {
                  var onC = (cavFiltre === oC[0]);
                  return h("button", { key: "cav" + oC[0], /* 🟩 06/09 (Blandine : "ca ouvre l'annee sans la derouler, du coup on regarde les
   derniers resultats a la place ; faudrait quand ca ouvre l'annee que ca deroule les
   resultats") — choisir un onglet cavalier deplie desormais directement la saison la
   plus recente ou ce cavalier a couru, sans taper une deuxieme fois dessus. `cible` est
   utilise en dur (pas `cavFiltre`, qui n'aurait pas encore la nouvelle valeur au moment
   de ce calcul — setCavFiltre est asynchrone). */
                  onClick: function () {
                    var cible = oC[0];
                    setCavFiltre(cible);
                    var candidats = listeAns.filter(function (anX) {
                      var ligs = ans[anX] || [];
                      return (cible === "tous") ? ligs.length > 0 : ligs.some(function (lg) { return lg.cav === cible; });
                    });
                    setSaisonOuv(candidats.length ? candidats[0] : null);
                  }, style: { flex: "0 0 auto", padding: "6px 13px", borderRadius: 999, border: "1px solid " + (onC ? "rgba(201,166,107,0.75)" : "rgba(243,238,228,0.14)"), background: onC ? "rgba(201,166,107,0.12)" : "rgba(16,26,29,0.7)", color: onC ? "#E6CF9C" : "rgba(243,238,228,0.82)", fontSize: 11.3, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", whiteSpace: "nowrap" } }, (oC[0] === "tous" ? oC[1] : h("bdi", null, hypeNomCourt(oC[1]))) /* 19/10 (soir) : ordre en arabe */);
                })) : null,
              /* 18/10 (maquette 1 + graphique validee par Blandine) : legende des couleurs (celles de la nouvelle page) puis un graphique,
                 une colonne par annee (hauteur = parcours de l annee, sorties au-dessus) ; toucher une colonne deplie cette annee juste dessous.
                 Suit l onglet cavalier choisi. */
              h("div", { "data-saisons-legende": "1", style: { display: "flex", flexWrap: "wrap", gap: "4px 12px", margin: "0 18px 12px", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.62)" } },
                COUL_SAIS.map(function (cL) { return h("span", { key: "lg" + cL[0], style: { display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" } }, h("i", { style: { display: "inline-block", width: 10, height: 6, borderRadius: 2, background: cL[1] } }), cL[2]); })),
              (function () {
                var colsG = listeAns.slice().reverse().map(function (anG) {
                  var fsG = filtreCav(ans[anG] || []); if (!fsG.length) return null;
                  var rG = filtreCav(ansR[anG] || []);
                  var nG = [rG.filter(function (f) { return f.pl === 1; }).length, rG.filter(function (f) { return f.pl === 2; }).length, rG.filter(function (f) { return f.pl === 3; }).length, rG.filter(function (f) { return f.pl != null && f.pl > 3; }).length];
                  nG.push(Math.max(0, rG.length - nG[0] - nG[1] - nG[2] - nG[3]));
                  return { an: anG, sorties: sortiesDe(fsG), n: nG, tot: rG.length };
                }).filter(Boolean);
                if (colsG.length < 2) { var bSeul = bandeauAff(); return bSeul ? h("div", { style: { margin: "22px 16px 30px", padding: "14px 10px 4px", borderRadius: 16, background: "linear-gradient(165deg, #101D22 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid rgba(243,238,228,0.08)" } }, bSeul) : null; }
                var maxG = Math.max.apply(null, colsG.map(function (cG) { return cG.tot || 1; }));
                return h("div", { "data-saisons-graphique": "1", style: { margin: "22px 16px 30px", padding: "16px 10px 10px", borderRadius: 16, background: "linear-gradient(165deg, #101D22 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid rgba(243,238,228,0.08)" } },
                  bandeauAff(),
                  h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "center", gap: colsG.length > 10 ? 4 : 8, height: 170, direction: "ltr" } },
                    colsG.map(function (cG) {
                      var onG = (saisonOuv === cG.an);
                      return h("div", { key: "gc" + cG.an, role: "button", "data-saisons-colonne": cG.an, onClick: function () { setSaisonOuv(cG.an); setTimeout(function () { try { var eG = document.getElementById("hype-saison-" + cG.an); if (eG) eG.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (eSg) { } }, 90); },
                        style: { flex: 1, minWidth: 0, maxWidth: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" } },
                        h("span", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.62)" } }, String(cG.sorties)),
                        h("div", { style: { width: "100%", boxSizing: "border-box", padding: 3, borderRadius: 7, border: "1px solid " + (onG ? "#E6CF9C" : "rgba(201,166,107,0.6)"), boxShadow: onG ? "0 0 0 1px rgba(230,207,156,0.35)" : "none" } },   /* 18/10 (proposition 3) : colonne dans un ecrin dore */
                          h("div", { style: { width: "100%", height: Math.max(6, Math.round(125 * (cG.tot || 0) / maxG)), display: "flex", flexDirection: "column-reverse", borderRadius: 4, overflow: "hidden", opacity: 0.92 } },
                          cG.n.map(function (vG, iG) { return vG ? h("span", { key: "gs" + iG, style: { flex: vG, background: COUL_SAIS[iG][1] } }) : null; }))),
                        h("span", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, fontWeight: 600, color: onG ? "#E6CF9C" : "#F3EEE4" } }, String(cG.an).slice(2)));
                    })),
                  h("div", { style: { marginTop: 6, textAlign: "center", fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, color: "rgba(243,238,228,0.5)" } }, T("sorties au-dessus de chaque colonne", "outings above each column", "salidas encima de cada columna", "uscite sopra ogni colonna", "各列の上は出場回数", "Starts über jeder Säule", "عدد المشاركات فوق كل عمود", "每列上方为出赛次数", "starts boven elke kolom", "saídas acima de cada coluna", "starter ovanför varje kolumn", "стартов над каждым столбцом", "startów nad każdą kolumną", "각 열 위의 출전 횟수")));
              })(),
              listeAns.map(function (anK) {
                var fsA = filtreCav(ans[anK]); if (!fsA.length) return null; var sA = sortiesDe(fsA);
                var vA = fsA.filter(function (f) { return f.pl === 1; }).length;
                var pA = fsA.filter(function (f) { return f.pl > 1 && f.pl <= 3; }).length;
                var cA = fsA.length;
                var fsR = filtreCav(ansR[anK] || []); var totR = fsR.length;
                function nPlR(tR) { return fsR.filter(tR).length; }
                var s1 = nPlR(function (f) { return f.pl === 1; });
                var s2 = nPlR(function (f) { return f.pl === 2; });
                var s3 = nPlR(function (f) { return f.pl === 3; });
                var s4 = nPlR(function (f) { return f.pl != null && f.pl > 3; });
                var sVide = Math.max(0, totR - s1 - s2 - s3 - s4);
                                var ouvA = (saisonOuv === anK);
                return h("div", { key: "an" + anK, id: "hype-saison-" + anK, role: "button", onClick: function () { setSaisonOuv(ouvA ? null : anK); }, style: { cursor: "pointer", scrollMarginTop: 16, margin: "0 16px 10px", padding: "16px 14px 15px", borderRadius: 14, background: "linear-gradient(165deg, #101D22 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid " + (ouvA ? "rgba(201,166,107,0.55)" : "rgba(243,238,228,0.08)") } }, /* 18/10 : plus de hauteur, fond et couleurs de la nouvelle page (maquette 1) */ /* 27/08 : fond ramene au NEUTRE exact de la page d accueil (#14161a) — demande Blandine, « trop de couleur » (26/08 : la saison se DEPLIE au tap et montre ses classements) */
                  h("div", { style: { display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 } },
                    h("span", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 26, fontWeight: 600, lineHeight: 1, color: "#F3EEE4" } }, anK),
                    h("span", { style: { fontSize: 11.5, color: "rgba(243,238,228,0.62)", whiteSpace: "nowrap" } }, sA + " " + (sA > 1 ? T("sorties", "outings", "salidas", "uscite", "\u51fa\u5834", "Starts", "\u0645\u0634\u0627\u0631\u0643\u0627\u062a", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전") : T("sortie", "outing", "salida", "uscita", "\u51fa\u5834", "Start", "\u0645\u0634\u0627\u0631\u0643\u0629", "次出赛", "start", "saída", "start", "старт", "start", "출전"))),
                    h("span", { style: { marginLeft: "auto", fontSize: 12, color: "rgba(243,238,228,0.8)", whiteSpace: "nowrap" } },
                      h("span", { style: { color: OR9 } }, "\uD83C\uDFC6 " + vA), "\u2003",
                      h("span", { style: { color: "#D8D2C6" } }, "\uD83E\uDD48 " + pA), "\u2003",
                      h("span", { style: { color: "rgba(243,238,228,0.62)" } }, "\uD83C\uDFC5 " + cA)),
                    h("span", { style: { marginLeft: 7, color: ouvA ? OR9 : "rgba(243,238,228,0.45)", fontSize: 12, display: "inline-block", transition: "transform .25s ease", transform: ouvA ? "rotate(180deg)" : "none" } }, "\u02c5")),
                  h("div", { "data-barre-ecrin": "1", style: { marginTop: 13, height: 6, padding: 3, borderRadius: 7, border: "1px solid rgba(201,166,107,0.6)", boxSizing: "content-box", overflow: "hidden", display: "flex", opacity: 0.92 } },   /* 18/10 (Blandine, proposition 3) : barre plus fine dans un ecrin dore */ /* 30/08 : l ancienne barre etait un TAUX DE PODIUM non libelle (victoires+podiums / total) — illisible, prise pour un separateur, et fausse : denominateur deja purge des non-classes, donc 100 % sur une saison a 1 sortie et 0 victoire. Remplacee par une barre EMPILEE dont le tout = les parcours de la saison, El./Ab. compris. Le fond qui reste nu EST l information : ce qui n a pas ete classe. */
                    [s1, s2, s3, s4, sVide].map(function (vS, ig) {   /* 18/10 : couleurs de la nouvelle page ; le reste (sans place : elimine / abandon) en bordeaux, comme sa legende */
                      return vS ? h("div", { key: "sg" + ig, style: { flex: vS, minWidth: 4, background: COUL_SAIS[ig][1] } }) : null;
                    })),
                  ouvA ? h("div", { onClick: function (eDp) { try { eDp.stopPropagation(); } catch (eS9) { } }, style: { marginTop: 9, borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "default" } },
                    fsA.slice().sort(function (a, b) { return (b.d || "").localeCompare(a.d || ""); }).map(function (rS, iS) {
                      return h("div", { key: "sr" + iS, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 2px", borderTop: iS ? "1px solid rgba(255,255,255,0.045)" : "none", minWidth: 0 } },
                        h("div", { style: { width: 66, flex: "0 0 auto", fontSize: 8.8, letterSpacing: ".04em", color: "rgba(243,238,228,0.62)", textTransform: "uppercase" } }, rS.d ? dateFr(rS.d) : anK),
                        h("div", { style: { flex: 1, minWidth: 0 } },
                          h("div", { style: { fontSize: 12.3, fontWeight: 600, color: "#F3EEE4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, rS.nom),
                          h("div", { style: { marginTop: 1, fontSize: 10.2, color: "rgba(243,238,228,0.62)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, rS.ep || "", (rS.ep && rS.cav) ? " \u00b7 " : null, rS.cav ? h("span", { style: { color: "#F3EEE4", fontWeight: 700 } }, rS.cav) : null)),
                        estSFf(rS) ? h("span", { style: { flex: "0 0 auto", fontSize: 9.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", color: "#E6CF9C", border: "1px solid rgba(201,166,107,0.45)", borderRadius: 999, padding: "2px 7px" } }, T("Sans faute", "Clear round", "Sin faltas", "Netto", "\u30af\u30ea\u30a2", "Fehlerfrei", "\u0628\u0644\u0627 \u0623\u062e\u0637\u0627\u0621", "零罚分", "Foutloos", "Sem faltas", "Felfri", "Без ошибок", "Bez błędu", "무실수")) : null,
                        h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',serif", fontSize: 14.5, fontWeight: 700, color: OR9 } }, rS.pl + "/" + (rS.part || "?")),
                        /* 06/09 (Blandine : « je voudrais retirer a la main des resultats
                           ajoutes a la main qui chevauchent avec ceux telecharges ») — la
                           corbeille n'apparait QUE sur une ligne saisie a la main, et
                           seulement pour la proprietaire du cheval ou une moderatrice.
                           ⚠️ Une ligne officielle importee n'est jamais supprimable ici :
                           elle se decoche a la relecture de l'import, elle ne se detruit pas. */
                        (rS.og !== "import" && rS.id && chevalDyn && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi)))
                          ? h("button", { "aria-label": T("Retirer ce r\u00e9sultat", "Remove this result", "Quitar este resultado", "Rimuovi questo risultato", "\u3053\u306e\u7d50\u679c\u3092\u524a\u9664", "Dieses Ergebnis entfernen", "\u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0647 \u0627\u0644\u0646\u062a\u064a\u062c\u0629", "移除这条成绩", "Dit resultaat verwijderen", "Remover este resultado", "Ta bort det här resultatet", "Убрать этот результат", "Usuń ten wynik", "이 결과 삭제"),
                              onClick: function (eSup) {
                                try { eSup.stopPropagation(); } catch (eS8) { }
                                var quoi = (rS.nom || "") + (rS.ep ? (" \u00b7 " + rS.ep) : "");
                                if (!window.confirm(T("Retirer d\u00e9finitivement cette ligne saisie \u00e0 la main ?", "Permanently remove this hand-entered line?", "\u00bfQuitar definitivamente esta l\u00ednea escrita a mano?", "Rimuovere definitivamente questa riga inserita a mano?", "\u624b\u5165\u529b\u306e\u3053\u306e\u884c\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f", "Diese von Hand erfasste Zeile endg\u00fcltig entfernen?", "\u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0633\u0637\u0631 \u0627\u0644\u0645\u062f\u062e\u0644 \u064a\u062f\u0648\u064a\u0627 \u0646\u0647\u0627\u0626\u064a\u0627\u061f", "确定要永久删除这条手动录入的行吗？", "Deze handmatig ingevoerde regel definitief verwijderen?", "Remover definitivamente esta linha digitada à mão?", "Ta bort den här handskrivna raden för gott?", "Удалить эту строку, введённую вручную, насовсем?", "Usunąć na stałe ten wiersz wpisany ręcznie?", "직접 입력한 이 줄을 완전히 삭제할까요?") + "\n\n" + quoi)) return;
                                (async function () {
                                  try {
                                    var rSup = await supprimerResultat(rS.id);
                                    if (rSup && rSup.error) { setToast(T("Suppression impossible : ", "Could not delete: ", "No se pudo eliminar: ", "Eliminazione impossibile: ", "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\uff1a", "L\u00f6schen nicht m\u00f6glich: ", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0630\u0641: ", "无法删除：", "Verwijderen niet gelukt: ", "Não foi possível excluir: ", "Det gick inte att ta bort: ", "Не удалось удалить: ", "Nie można usunąć: ", "삭제할 수 없어요: ") + String(rSup.error.message || rSup.error)); return; }
                                    if (rSup && rSup.aucuneLigne) { setToast(T("Suppression refus\u00e9e : aucune ligne supprim\u00e9e.", "Deletion refused: no row deleted.", "Eliminaci\u00f3n rechazada: ninguna fila eliminada.", "Eliminazione rifiutata: nessuna riga eliminata.", "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\uff1a\u524a\u9664\u3055\u308c\u305f\u884c\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "L\u00f6schen abgelehnt: keine Zeile gel\u00f6scht.", "\u0631\u064f\u0641\u0636 \u0627\u0644\u062d\u0630\u0641: \u0644\u0645 \u064a\u064f\u062d\u0630\u0641 \u0623\u064a \u0633\u0637\u0631.", "删除被拒绝：没有删除任何行。", "Verwijderen geweigerd: geen enkele regel verwijderd.", "Exclusão recusada: nenhuma linha excluída.", "Borttagning nekades: ingen rad togs bort.", "Удаление отклонено: ни одна строка не удалена.", "Usunięcie odrzucone: żaden wiersz nie został usunięty.", "삭제가 거부되었어요: 삭제된 줄이 없어요.")); return; }   /* (623) rien supprime : la ligne reste */
                                    setResDb(function (av) { return (av || []).filter(function (x) { return x && x.id !== rS.id; }); });
                                    setToast(T("R\u00e9sultat retir\u00e9.", "Result removed.", "Resultado eliminado.", "Risultato rimosso.", "\u7d50\u679c\u3092\u524a\u9664\u3057\u307e\u3057\u305f\u3002", "Ergebnis entfernt.", "\u062a\u0645\u062a \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u062a\u064a\u062c\u0629.", "成绩已移除。", "Resultaat verwijderd.", "Resultado removido.", "Resultatet har tagits bort.", "Результат удалён.", "Wynik usunięty.", "결과를 삭제했어요."));
                                  } catch (eSp) { setToast(T("Suppression impossible : ", "Could not delete: ", "No se pudo eliminar: ", "Eliminazione impossibile: ", "\u524a\u9664\u3067\u304d\u307e\u305b\u3093\uff1a", "L\u00f6schen nicht m\u00f6glich: ", "\u062a\u0639\u0630\u0631 \u0627\u0644\u062d\u0630\u0641: ", "无法删除：", "Verwijderen niet gelukt: ", "Não foi possível excluir: ", "Det gick inte att ta bort: ", "Не удалось удалить: ", "Nie można usunąć: ", "삭제할 수 없어요: ") + String((eSp && eSp.message) || eSp)); }
                                })();
                              },
                              style: { flex: "0 0 auto", marginLeft: 8, width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", color: "rgba(243,238,228,0.55)", fontSize: 13, lineHeight: 1, cursor: "pointer" } }, "\ud83d\uddd1") : null);
                    })) : null);
              })) : null,
            /* — 5bis · LES POINTS DE QUALIFICATION (06/09, demande de Blandine) — (598) Blandine : « mets les points de qualif en dessous des derniers résultats » : le bloc, inchangé, passe sous « Derniers résultats » (il était entre les moments forts et « Par saison »).
               Le total suit l'onglet cavalier choisi au-dessus, comme les cartes
               « Derniers résultats ». Rien ne s'affiche tant qu'aucune ligne ne
               porte de points : inutile de montrer un tableau de zéros à qui n'a
               pas encore repassé ses télémats. */
            (function () {
              var avecPts = filtreCav(tousF).filter(function (fP) { return fP.pts != null && !isNaN(fP.pts); });
              if (!avecPts.length) return null;
              var saisons = {};
              avecPts.forEach(function (fP) { var sA = hypeSaisonTeam(fP.d, fP.ep); if (sA == null) return;   /* 19/10 : periode de la categorie (regle Team) */ if (!saisons[sA]) saisons[sA] = []; saisons[sA].push(fP); });
              var clesS = Object.keys(saisons).sort().reverse();
              if (!clesS.length) return null;
              var sCour = (saisonPts != null && saisons[saisonPts]) ? saisonPts : clesS[0];
              var lignesS = saisons[sCour] || [];
              var totalS = lignesS.reduce(function (acc, fP) { return acc + (fP.pts || 0); }, 0);
              var parFam = {};
              lignesS.forEach(function (fP) { var k = familleEp(fP.ep); if (!parFam[k]) parFam[k] = { n: 0, p: 0 }; parFam[k].n++; parFam[k].p += (fP.pts || 0); });
              var famTri = Object.keys(parFam).sort(function (a1, b1) { return parFam[b1].p - parFam[a1].p; });
              var sansPts = filtreCav(tousF).length - avecPts.length;
              var arrondi = function (x) { return Math.round(x * 100) / 100; };
              return h(largeCh ? "div" : React.Fragment, largeCh ? { "data-res-lecture": "points", style: { maxWidth: 880, marginLeft: "auto", marginRight: "auto" } } : null, /* 19/10 (soir) audit ordinateur : colonne de lecture centree (880 px) sur grand ecran, telephone inchange */
                h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "44px 16px 14px" } },
                  h("div", { style: { fontSize: 11.5, letterSpacing: ".14em", fontWeight: 700, color: OR9 } },
                    T("Points de qualification", "Qualification points", "Puntos de calificaci\u00f3n", "Punti di qualifica", "\u8cc7\u683c\u30dd\u30a4\u30f3\u30c8", "Qualifikationspunkte", "\u0646\u0642\u0627\u0637 \u0627\u0644\u062a\u0623\u0647\u0644", "资格积分", "Kwalificatiepunten", "Pontos de qualificação", "Kvalificeringspoäng", "Квалификационные очки", "Punkty kwalifikacyjne", "자격 점수").toUpperCase()), filetOr()),
                (clesS.length > 1) ? h("div", { style: Object.assign({ display: "flex", gap: 7, margin: "0 16px 11px", overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }, largeCh ? { flexWrap: "wrap", overflowX: "visible", rowGap: 8 } : {}) /* 19/10 (soir) : a la ligne sur grand ecran */ },
                  clesS.map(function (sK) {
                    var onS = (String(sK) === String(sCour));
                    return h("button", { key: "sp" + sK, onClick: function () { setSaisonPts(sK); },
                      style: { flex: "0 0 auto", padding: "6px 13px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
                        border: "1px solid " + (onS ? "rgba(201,166,107,.75)" : "rgba(255,255,255,0.14)"),
                        background: onS ? "rgba(201,166,107,.12)" : "rgba(255,255,255,0.03)",
                        color: onS ? OR9 : "rgba(243,238,228,0.7)", fontSize: 11.3, fontWeight: 700, fontFamily: "'Montserrat',sans-serif" } },
                      sK + " / " + (Number(sK) + 1));
                  })) : null,
                h("div", { style: { margin: "0 16px", padding: "14px 16px", borderRadius: 14, background: "linear-gradient(165deg, #101D22 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid rgba(214,196,161,0.45)" /* (962) */ } },
                  h("div", { style: { display: "flex", alignItems: "baseline", gap: 9 } },
                    h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 27, fontWeight: 700, color: OR9 } }, arrondi(totalS)),
                    h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,0.8)", fontFamily: "'Montserrat',sans-serif" } },
                      T("points \u00b7 ", "points \u00b7 ", "puntos \u00b7 ", "punti \u00b7 ", "\u30dd\u30a4\u30f3\u30c8 \u00b7 ", "Punkte \u00b7 ", "\u0646\u0642\u0627\u0637 \u00b7 ", "分 · ", "punten · ", "pontos · ", "poäng · ", "очки · ", "punkty · ", "점 · ") + lignesS.length + " " +
                      T("\u00e9preuves", "classes", "pruebas", "prove", "\u7af6\u6280", "Pr\u00fcfungen", "\u0645\u0633\u0627\u0628\u0642\u0627\u062a", "比赛项目", "klassen", "provas", "klasser", "маршрутов", "konkurencje", "경기"))),
                  h("div", { style: { marginTop: 3, fontSize: 10.5, color: "rgba(243,238,228,0.62)", fontFamily: "'Montserrat',sans-serif" } },
                    T("Saison " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 chaque cat\u00e9gorie suit sa p\u00e9riode de qualification", "Season " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 each category follows its qualification period", "Temporada " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 cada categor\u00eda sigue su periodo de calificaci\u00f3n", "Stagione " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 ogni categoria segue il suo periodo di qualifica", sCour + " / " + (Number(sCour) + 1) + "\u30b7\u30fc\u30ba\u30f3 \u00b7 \u5404\u30ab\u30c6\u30b4\u30ea\u30fc\u306f\u305d\u308c\u305e\u308c\u306e\u8cc7\u683c\u671f\u9593\u306b\u5f93\u3044\u307e\u3059", "Saison " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 jede Kategorie folgt ihrem Qualifikationszeitraum", "\u0627\u0644\u0645\u0648\u0633\u0645 " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 \u0644\u0643\u0644 \u0641\u0626\u0629 \u0641\u062a\u0631\u0629 \u062a\u0623\u0647\u0644 \u062e\u0627\u0635\u0629 \u0628\u0647\u0627", "赛季 " + sCour + " / " + (Number(sCour) + 1) + " · 每个类别遵循各自的资格期", "Seizoen " + sCour + " / " + (Number(sCour) + 1) + " · elke categorie volgt haar eigen kwalificatieperiode", "Temporada " + sCour + " / " + (Number(sCour) + 1) + " · cada categoria segue seu próprio período de qualificação", ("Säsong " + sCour + " / " + (Number(sCour) + 1) + " · varje kategori följer sin kvalificeringsperiod"), ("Сезон " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 каждая категория следует своему квалификационному периоду"), ("Sezon " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 każda kategoria ma własny okres kwalifikacyjny"), ("시즌 " + sCour + " / " + (Number(sCour) + 1) + " · 각 카테고리는 자체 자격 기간을 따라요"))),
                  h("div", { style: { marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" } },
                    famTri.map(function (kF, iF) {
                      /* 18/10 (Blandine : « le detail quand on clique dessus ») : toucher une famille deplie ses epreuves (date, concours, epreuve, place, cavalier, points) */
                      var cleFam = String(sCour) + "|" + kF; var ouvF = (famPtsOuv === cleFam);
                      var detF = ouvF ? lignesS.filter(function (fP) { return familleEp(fP.ep) === kF; }).slice().sort(function (a2, b2) { return (b2.d || "").localeCompare(a2.d || ""); }) : [];
                      return h("div", { key: "fam" + kF, style: { borderTop: iF ? "1px solid rgba(255,255,255,0.045)" : "none" } },
                        h("div", { role: "button", "data-points-famille": kF, "aria-expanded": ouvF ? "true" : "false", onClick: function () { setFamPtsOuv(ouvF ? null : cleFam); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer" } },
                          h("div", { style: { flex: 1, minWidth: 0, fontSize: 12.3, fontWeight: 600, color: "#F3EEE4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, kF),
                          h("div", { style: { flex: "0 0 auto", fontSize: 10.5, color: "rgba(243,238,228,0.62)" } }, parFam[kF].n + " \u00d7"),
                          h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: OR9, minWidth: 42, textAlign: "right" } }, arrondi(parFam[kF].p)),
                          h("span", { "aria-hidden": "true", style: { flex: "0 0 auto", color: ouvF ? OR9 : "rgba(243,238,228,0.45)", fontSize: 12, display: "inline-block", transition: "transform .25s ease", transform: ouvF ? "rotate(180deg)" : "none" } }, "\u02c5")),
                        ouvF ? h("div", { "data-points-detail": kF, style: { margin: "0 0 8px", padding: "2px 10px", borderRadius: 10, background: "rgba(7,10,8,0.45)", border: "1px solid rgba(201,166,107,0.18)" } },
                          (function () {   /* 19/10 : la periode de qualification de cette categorie, dite au depliage */
                            var perF = detF.length ? hypePeriodeTeam(sCour, detF[0].ep) : null;
                            if (!perF) return null;
                            var d1 = hypeDateLoc(perF.debut, "long"), d2 = hypeDateLoc(perF.fin, "long");
                            return h("div", { "data-points-periode": kF, style: { padding: "8px 0 7px", fontSize: 10.5, color: "#C9A66B", fontFamily: "'Montserrat',sans-serif", borderBottom: "1px solid rgba(255,255,255,0.05)" } },
                              T("P\u00e9riode de qualification : du " + d1 + " au " + d2, "Qualification period: " + d1 + " \u2013 " + d2, "Periodo de calificaci\u00f3n: del " + d1 + " al " + d2, "Periodo di qualifica: dal " + d1 + " al " + d2, "\u8cc7\u683c\u671f\u9593\uff1a" + d1 + "\u301c" + d2, "Qualifikationszeitraum: " + d1 + " \u2013 " + d2, "\u0641\u062a\u0631\u0629 \u0627\u0644\u062a\u0623\u0647\u0644: \u0645\u0646 " + d1 + " \u0625\u0644\u0649 " + d2, "资格期：从 " + d1 + " 到 " + d2, "Kwalificatieperiode: van " + d1 + " tot " + d2, "Período de qualificação: de " + d1 + " a " + d2, ("Kvalificeringsperiod: från " + d1 + " till " + d2), ("Квалификационный период: с " + d1 + " по " + d2), ("Okres kwalifikacyjny: od " + d1 + " do " + d2), ("자격 기간: " + d1 + " ~ " + d2)));
                          })(),
                          detF.map(function (fD, iD) {
                            return h("div", { key: "pd" + iD, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: iD ? "1px solid rgba(255,255,255,0.05)" : "none", minWidth: 0 } },
                              h("div", { style: { flex: 1, minWidth: 0 } },
                                h("div", { style: { fontSize: 11.8, fontWeight: 600, color: "#F3EEE4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, String(fD.nom || "").replace(/^\s*CSO\s+/i, "") || "\u2014"),
                                h("div", { style: { marginTop: 1, fontSize: 10, color: "rgba(243,238,228,0.62)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [fD.d ? dateFr(fD.d) : "", fD.ep || "", fD.cav || ""].filter(Boolean).join(" \u00b7 "))),
                              fD.pl ? h("div", { style: { flex: "0 0 auto", fontSize: 10.5, color: "rgba(243,238,228,0.75)", whiteSpace: "nowrap" } }, hypeRangCourt(fD.pl) + (fD.part ? " / " + fD.part : "")   /* 19/10 : rang dans la langue de l appli */) : null,
                              h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',serif", fontSize: 13.5, fontWeight: 700, color: "#E6CF9C", minWidth: 34, textAlign: "right" } }, arrondi(fD.pts || 0)));
                          })) : null);
                    })),
                  /* ⚠️ ON DIT CE QU'ON NE SAIT PAS : une ligne sans points n'est pas
                     comptée pour zéro, elle est annoncée. */
                  sansPts > 0 ? h("div", { style: { marginTop: 11, fontSize: 10.5, lineHeight: 1.5, color: "rgba(243,238,228,0.62)", fontFamily: "'Montserrat',sans-serif" } },
                    sansPts + " " + T("r\u00e9sultat" + (sansPts > 1 ? "s" : "") + " sans points connus \u2014 repasse son t\u00e9l\u00e9mat pour les r\u00e9cup\u00e9rer. Les points sont ceux calcul\u00e9s par la FFE, jamais recalcul\u00e9s ici.",
                                       "result" + (sansPts > 1 ? "s" : "") + " with no known points \u2014 re-import its telemat. Points come from the FFE, never recomputed here.",
                                       "resultado" + (sansPts > 1 ? "s" : "") + " sin puntos conocidos \u2014 vuelve a importar su telemat.",
                                       "risultat" + (sansPts > 1 ? "i" : "o") + " senza punti noti \u2014 reimporta il suo telemat.",
                                       "\u30dd\u30a4\u30f3\u30c8\u4e0d\u660e\u306e\u7d50\u679c\u304c\u3042\u308a\u307e\u3059\u3002",
                                       "Ergebnis(se) ohne bekannte Punkte \u2014 Telemat erneut importieren.", "\u0646\u062a\u064a\u062c\u0629 \u0628\u0644\u0627 \u0646\u0642\u0627\u0637 \u0645\u0639\u0631\u0648\u0641\u0629 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0645\u0644\u0641 t\u00e9l\u00e9mat \u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639\u0647\u0627. \u0627\u0644\u0646\u0642\u0627\u0637 \u0647\u064a \u0627\u0644\u062a\u064a \u062a\u062d\u0633\u0628\u0647\u0627 FFE\u060c \u0648\u0644\u0627 \u064a\u0639\u0627\u062f \u062d\u0633\u0627\u0628\u0647\u0627 \u0647\u0646\u0627.", "条成绩" + (sansPts > 1 ? "" : "") + "暂无已知积分——重新获取 TA 的 télémat 即可找回。积分由 FFE 计算，这里不会重新计算。", "resultaat" + (sansPts > 1 ? "en" : "") + " zonder bekende punten — importeer de télémat opnieuw om ze op te halen. De punten zijn die van de FFE en worden hier nooit herberekend.", "resultado" + (sansPts > 1 ? "s" : "") + " sem pontos conhecidos — importe a télémat novamente para recuperá-los. Os pontos são os calculados pela FFE e nunca são recalculados aqui.", ("resultat" + (sansPts > 1 ? "" : "") + " utan kända poäng – importera dess télémat igen för att hämta dem. Poängen är de som FFE har räknat fram, de räknas aldrig om här."), ((sansPts % 10 === 1 && sansPts % 100 !== 11 ? "результат" : (sansPts % 10 >= 2 && sansPts % 10 <= 4 && (sansPts % 100 < 10 || sansPts % 100 >= 20)) ? "результата" : "результатов") + " без известных очков \u2014 повтори импорт его télémat, чтобы вернуть их. Очки рассчитывает FFE, здесь они никогда не пересчитываются."), ((sansPts === 1 ? "wynik" : (sansPts % 10 >= 2 && sansPts % 10 <= 4 && (sansPts % 100 < 10 || sansPts % 100 >= 20)) ? "wyniki" : "wyników") + " bez znanych punktów \u2014 przejdź ponownie przez télémat, aby je odzyskać. Punkty są wyliczone przez FFE i nigdy nie są tu przeliczane."), ("점수를 알 수 없는 결과 " + sansPts + "건 — télémat을 다시 불러와서 가져오세요. 점수는 FFE가 계산한 값이며 여기서 다시 계산하지 않아요."))) : null));
            })(),
            /* — 6 · CTA — */
            /* 02/09 : le CTA vers la page technique est RETIRE. A sa place, la seule
               chose qui vivait derriere : l acces de la proprietaire aux lignes
               qu elle a decochees a la relecture de l import. */
            (function () {
              var proprioP = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
              var nMq = ((resDb) || []).filter(function (rM) { return rM && rM.visible === false; }).length;
              if (!proprioP || !nMq) return null;
              return h("div", { role: "button", onClick: function () { setVoirMasques(!voirMasques); }, style: { textAlign: "center", margin: "22px 16px 0", fontSize: 11.5, color: voirMasques ? "#E6CF9C" : "rgba(243,238,228,0.62)", cursor: "pointer" } },
                (voirMasques ? "\u2611 " : "\u2610 ") + (voirMasques
                  ? T("Les lignes masqu\u00e9es sont affich\u00e9es", "Hidden lines are shown", "L\u00edneas ocultas visibles", "Righe nascoste visibili", "\u975e\u8868\u793a\u306e\u884c\u3092\u8868\u793a\u4e2d", "Ausgeblendete Zeilen sichtbar", "\u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0645\u0639\u0631\u0648\u0636\u0629", "已显示隐藏的行", "De verborgen regels worden getoond", "As linhas ocultas estão visíveis", "De dolda raderna visas", "Скрытые строки показаны", "Ukryte wiersze są wyświetlone", "숨긴 줄이 표시되고 있어요")
                  : T("Afficher aussi les " + nMq + " lignes masqu\u00e9es", "Also show the " + nMq + " hidden lines", "Mostrar tambi\u00e9n las " + nMq + " l\u00edneas ocultas", "Mostra anche le " + nMq + " righe nascoste", nMq + " \u4ef6\u306e\u975e\u8868\u793a\u884c\u3082\u8868\u793a", "Auch die " + nMq + " ausgeblendeten Zeilen zeigen", "\u0639\u0631\u0636 \u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0623\u064a\u0636\u0627 (" + nMq + ")", "同时显示" + nMq + "条已隐藏的行", "Toon ook de " + nMq + " verborgen regels", "Mostrar também as " + nMq + " linhas ocultas", ("Visa även de " + nMq + " dolda raderna"), ("Показать также скрытые строки: " + nMq), ("Pokaż też ukryte wiersze (" + nMq + ")"), ("숨긴 " + nMq + "줄도 함께 보기"))));
            })(),
            h("div", { style: { textAlign: "center", marginTop: 7, fontSize: 10.5, color: "rgba(243,238,228,0.5)" } }, nC + " " + T("r\u00e9sultats enregistr\u00e9s", "recorded results", "resultados registrados", "risultati registrati", "\u4ef6\u306e\u6210\u7e3e", "erfasste Ergebnisse", "\u0646\u062a\u0627\u0626\u062c \u0645\u062d\u0641\u0648\u0638\u0629", "条已记录的成绩", "geregistreerde resultaten", "resultados registrados", "sparade resultat", "сохранённых результатов", "zapisanych wyników", "저장된 결과")),
            /* 18/10 (Blandine : « plutot en bas ») : la carte « Importer tes resultats FFE », en bas de page, quand des resultats sont deja importes (proprietaire ou moderatrice) */
            (aImpF && chevalDyn && moi && (chevalDyn.ownerId === moi.id || estModerateurHype(moi))) ? h(CarteImportHype, { onClick: ouvrirImportFFE, marge: "44px 16px 36px", largeurMax: largeCh ? 848 : null }) : null);   /* 18/10 : plus d air avant le bas de page */
        })(), finPageCh() /* (962) meme fin de page que Photos / Videos */))  : null,
      /* 03/09 — 🟥 CE BLOC DE STYLE EST REMONTE HORS DE L ONGLET SOUVENIRS.
         Il y vivait depuis toujours ; le 29/08 la Galerie a demenage sur
         l onglet PHOTOS, et le style est reste derriere. Resultat sur Photos :
         `.souvImg` sans width/height/object-fit et `.souvCell` sans
         overflow:hidden — chaque photo s affichait a sa TAILLE NATURELLE,
         debordait de sa case, elargissait la colonne et poussait toute la page
         hors de l ecran (signale par Blandine, enregistrement du 03/09 : titre
         « GALERIE » coupe a gauche, onglets du bas coupes a droite). Rendu ici,
         il sert LES QUATRE onglets. ⚠️ Ne jamais le redescendre dans une branche.
         Il porte aussi souvin / souvHaloCell / souvFloat / souvPose, absents de
         la page Photos pour la meme raison. */
      h("style", null, "@keyframes souvIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}} @keyframes souvPop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}} @keyframes souvKen{from{transform:scale(1)}to{transform:scale(1.09)}} @keyframes souvSweep{from{background-position:-180% 0}to{background-position:280% 0}} .souvin{opacity:0;animation:souvIn .55s cubic-bezier(.2,.7,.3,1) forwards} .souvshim{background:linear-gradient(100deg," + teinte + " 30%," + teinteCl + " 50%," + teinte + " 70%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:souvSweep 5s linear infinite} @keyframes souvPose{from{opacity:0;transform:translateY(-14px);filter:blur(5px)}to{opacity:1;transform:translateY(0);filter:blur(0)}} @keyframes souvFloat{from{transform:translate3d(0,0,0)}to{transform:translate3d(var(--fx,2px),var(--fy,-3px),0)}} @keyframes souvHaloVie{0%,100%{opacity:.25}50%{opacity:.6}} @keyframes souvLuciole{0%,40%{opacity:0;transform:translate3d(0,0,0)}52%{opacity:.5}68%{opacity:.3}80%,100%{opacity:0;transform:translate3d(-16px,-54px,0)}} @keyframes souvVoileIn{from{opacity:0}to{opacity:1}} @keyframes souvVoileOut{to{opacity:0}} @keyframes souvOuvre{from{opacity:0;transform:scale(.94) translateY(8px);filter:brightness(.8) blur(5px)}to{opacity:1;transform:scale(1) translateY(0);filter:brightness(1.05) blur(0)}} @keyframes souvFerme{to{opacity:0;transform:scale(.955) translateY(6px);filter:brightness(.72) blur(3px)}} @keyframes souvHaloIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}} @keyframes souvHaloResp{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}} .souvCell{position:relative;overflow:hidden;border-radius:16px;min-height:0;background:#0A0D11} .souvFlot{position:relative;width:100%;height:100%;border-radius:16px;overflow:hidden;animation:souvFloat 12s ease-in-out infinite alternate;will-change:transform} .souvImg{width:100%;height:100%;object-fit:cover;display:block;transition:filter .6s var(--cm-ease)} .souvCell.souvNet .souvImg{filter:contrast(1.05) saturate(1.05) brightness(1.02)} .souvCell.souvDoux .souvImg{filter:brightness(.9) saturate(.92)} .souvHaloCell{position:absolute;inset:0;pointer-events:none;background:radial-gradient(85% 85% at 50% 28%," + tA(.10) + ",transparent 70%);mix-blend-mode:screen;animation:souvHaloVie 8s ease-in-out infinite} .souvLuciole{position:fixed;width:3px;height:3px;border-radius:50%;background:" + tACl(.85) + ";box-shadow:0 0 8px " + tA(.8) + ";pointer-events:none;opacity:0;animation:souvLuciole 26s ease-in-out infinite;z-index:5} .souvVoile{animation:souvVoileIn .4s var(--cm-ease) both} .souvVoile.souvQuitte{animation:souvVoileOut .6s var(--cm-ease-in) both} .souvVue{animation:souvOuvre .6s var(--cm-ease-out) both;position:relative;z-index:2} .souvVue.souvQuitte{animation:souvFerme .6s var(--cm-ease-in) both} .souvGrandHalo{position:absolute;inset:0;margin:auto;width:82vw;max-width:420px;aspect-ratio:1 / 1;border-radius:50%;background:radial-gradient(circle," + tA(.22) + ",transparent 65%);filter:blur(24px);pointer-events:none;animation:souvHaloIn 1.2s var(--cm-ease-out) both,souvHaloResp 7s ease-in-out 1.2s infinite} @media(prefers-reduced-motion:reduce){.souvFlot,.souvHaloCell,.souvLuciole,.souvVue,.souvGrandHalo{animation:none!important}}"),
      panneau === "souvenirs" ? h("div", null,
        heroSousPageCh(T("Histoire", "Story", "Historia", "Storia", "\u7269\u8a9e", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Historia", "История", "Historia", "이야기") /* (978) comme l onglet */),
        ongletsPanCh("20px 16px 18px"),
        h("i", { className: "souvLuciole", style: { left: "24%", top: "32%" } }),        h("i", { className: "souvLuciole", style: { left: "24%", top: "32%" } }),
        h("i", { className: "souvLuciole", style: { left: "66%", top: "50%", animationDelay: "9s" } }),
        h("i", { className: "souvLuciole", style: { left: "40%", top: "72%", animationDelay: "17s" } }),
        /* 30/08 (Blandine : « sur la page souvenir faut pas mettre deux fois la photo
           en haut, choisis-en un et garde-le ») — le GRAND visuel de tete est retire.
           L'encart d'identite, commun aux quatre onglets, le remplace : garder les deux
           faisait apparaitre la meme photo deux fois de suite.
           Ce qu'il portait et ou ca se trouve encore : « Ajuster la photo » et
           « Changer la photo » restent accessibles par le MENU de la fiche. */
        (function () {
          var proprioH = !!(chevalDyn && chevalDyn.dbId && moi && chevalDyn.ownerId === moi.id);   /* (1006) Blandine : « tout le monde voit l histoire ecrite par le proprietaire » -> seule la proprietaire l ecrit (avant, 832 : + cavaliere liee) */
          var texteH = (chevalDyn && chevalDyn.dbId) ? String(chevalDyn.histoire || c.histoire || "") : (c.histoire || "");   /* (1006) tout le monde (connecte ou non) voit l histoire de la proprietaire ; les autres raconteront la leur dessous (temoignages, etape 4). Avant (832) : sur un cheval qui n est pas le mien, MON histoire perso (chevaux_histoires : 0 texte en base le 12/10, rien de perdu). */
          if (!texteH && !proprioH) return null;
          /* 12/10 (1015) ORDINATEUR ET TABLETTE (>= 768 px), maquette de Blandine : l encart « Son histoire » devient un grand encart
             photographique — photo du cheval a droite fondue dans le noir, surtitre « SON HISTOIRE », « Un parcours unique… »,
             phrase d introduction, puis le recit avec un filet champagne. Memes boutons (partage, ecrire/modifier). iPhone : inchange. */
          if (largeCh) {
            var nomHL = String(c.nom || "");
            return h("div", { style: { position: "relative", zIndex: 2, margin: "0 16px 20px", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(214,196,161,0.45)", background: "#05080B", minHeight: 260 } },
              photoCh ? h("img", { src: photoCh, alt: "", decoding: "async", style: { position: "absolute", top: 0, bottom: 0, insetInlineEnd: 0, width: "62%", height: "100%", objectFit: "cover", objectPosition: "50% 25%", display: "block", WebkitMaskImage: "linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 35%, #000 60%)", maskImage: "linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 35%, #000 60%)" } }) : null,
              h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(" + (rtlCh ? "270deg" : "90deg") + ", rgba(5,8,11,0.96) 0%, rgba(7,16,21,0.86) 45%, rgba(5,8,11,0.25) 85%)" } }),
              h("button", { type: "button", onClick: function (eSh) { try { eSh.stopPropagation(); } catch (e0) { } partagerFiche(true); }, "aria-label": T("Partager son histoire", "Share their story", "Compartir su historia", "Condividi la sua storia", "\u7269\u8a9e\u3092\u5171\u6709", "Seine Geschichte teilen", "\u0645\u0634\u0627\u0631\u0643\u0629 \u0642\u0635\u062a\u0647", "分享它的故事", "Zijn verhaal delen", "Compartilhar a história dele", "Dela dess historia", "Поделиться её историей", "Udostępnij jego historię", "이야기 공유하기"), style: { position: "absolute", zIndex: 3, top: 16, insetInlineEnd: 16, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.6)", background: "rgba(5,8,11,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer" } },
                h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("circle", { cx: 18, cy: 5, r: 2.6 }), h("circle", { cx: 6, cy: 12, r: 2.6 }), h("circle", { cx: 18, cy: 19, r: 2.6 }), h("path", { d: "M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" }))),
              h("div", { style: { position: "relative", zIndex: 2, padding: "26px 28px 24px", maxWidth: 680 } },
                h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11.5, fontWeight: 600, letterSpacing: 3.4, textTransform: "uppercase", color: "#D6C4A1" } }, T("Son histoire", "Their story", "Su historia", "La sua storia", "\u7269\u8a9e", "Seine Geschichte", "\u0642\u0635\u062a\u0647", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기")),
                h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 38, fontWeight: 500, lineHeight: 1.1, color: "#F3EEE4", marginTop: 6, textShadow: "0 2px 14px rgba(0,0,0,0.6)" } }, T("Un parcours unique\u2026", "A unique journey\u2026", "Un recorrido \u00fanico\u2026", "Un percorso unico\u2026", "\u304b\u3051\u304c\u3048\u306e\u306a\u3044\u6b69\u307f\u2026", "Ein einzigartiger Weg\u2026", "\u0645\u0633\u064a\u0631\u0629 \u0641\u0631\u064a\u062f\u0629\u2026", "独一无二的旅程……", "Een uniek parcours…", "Uma trajetória única…", "En unik resa…", "Уникальный путь…", "Wyjątkowa droga…", "세상에 하나뿐인 여정…")),
                h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 14, lineHeight: 1.6, color: "rgba(243,238,228,0.9)", marginTop: 10, maxWidth: 560 } }, T("De ses premiers pas \u00e0 aujourd\u2019hui, d\u00e9couvrez l\u2019histoire de " + nomHL + ".", "From their first steps to today, discover the story of " + nomHL + ".", "De sus primeros pasos a hoy, descubre la historia de " + nomHL + ".", "Dai primi passi a oggi, scopri la storia di " + nomHL + ".", "\u306f\u3058\u3081\u306e\u4e00\u6b69\u304b\u3089\u4eca\u65e5\u307e\u3067\u3001" + nomHL + "\u306e\u7269\u8a9e\u3092\u3002", "Von den ersten Schritten bis heute: entdecke die Geschichte von " + nomHL + ".", "\u0645\u0646 \u062e\u0637\u0648\u0627\u062a\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 \u062d\u062a\u0649 \u0627\u0644\u064a\u0648\u0645\u060c \u0627\u0643\u062a\u0634\u0641 \u0642\u0635\u0629 " + nomHL + ".", "从最初的几步到今天，来看看 " + nomHL + " 的故事。", "Van haar eerste stappen tot vandaag: ontdek het verhaal van " + nomHL + ".", "Dos primeiros passos até hoje, descubra a história de " + nomHL + ".", ("Från de första stegen till idag, upptäck historien om " + nomHL + "."), ("От первых шагов до сегодняшнего дня — узнай историю " + nomHL + "."), ("Od jego pierwszych kroków do dziś — poznaj historię " + nomHL + "."), ("첫걸음부터 오늘까지, " + nomHL + "의 이야기를 만나 보세요."))),
                texteH ? h("div", { className: "recitTxt", style: { marginTop: 18, paddingInlineStart: 18, borderInlineStart: "1px solid rgba(214,196,161,0.7)", fontSize: 14, lineHeight: 1.8, color: "#DCE3E8", whiteSpace: "pre-line", maxWidth: 600 } }, texteH)
                  : h("div", { style: { marginTop: 16, fontSize: 13, lineHeight: 1.6, color: "rgba(243,238,228,.5)", fontStyle: "italic" } }, T("Aucune histoire pour le moment. Raconte ses d\u00e9buts, ses concours, son caract\u00e8re\u2026", "No story yet. Tell us about their beginnings, their shows, their character\u2026", "A\u00fan sin historia. Cuenta sus inicios, sus concursos, su car\u00e1cter\u2026", "Nessuna storia. Racconta i suoi inizi, i suoi concorsi, il suo carattere\u2026", "\u307e\u3060\u7269\u8a9e\u304c\u3042\u308a\u307e\u305b\u3093", "Noch keine Geschichte. Erz\u00e4hle von seinen Anf\u00e4ngen, Turnieren, seinem Charakter\u2026", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0642\u0635\u0629 \u062d\u0627\u0644\u064a\u0627.", "暂时还没有故事。讲讲它的起步、它的比赛、它的性格吧……", "Nog geen verhaal. Vertel over zijn beginjaren, zijn wedstrijden, zijn karakter…", "Nenhuma história por enquanto. Conte os primeiros passos dele, suas competições, seu temperamento…", "Ingen historia ännu. Berätta om dess början, dess tävlingar, dess personlighet…", "Пока нет истории. Расскажи о её начале пути, соревнованиях, характере…", "Na razie brak historii. Opowiedz o jego początkach, zawodach, charakterze…", "아직 이야기가 없어요. 첫 시작, 대회, 성격을 들려주세요…")),
                proprioH ? h("button", { type: "button", onClick: ouvrirEditHistoire, style: { marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, minHeight: 40, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.65)", background: "rgba(5,8,11,0.55)", color: "#D6C4A1", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: 600, cursor: "pointer" } },
                  texteH ? T("Modifier son histoire", "Edit their story", "Modificar su historia", "Modifica la sua storia", "\u7269\u8a9e\u3092\u7de8\u96c6", "Seine Geschichte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0642\u0635\u062a\u0647", "修改它的故事", "Zijn verhaal aanpassen", "Editar a história dele", "Redigera dess historia", "Изменить её историю", "Edytuj jego historię", "이야기 수정하기") : T("\u00c9crire son histoire", "Write their story", "Escribir su historia", "Scrivi la sua storia", "\u7269\u8a9e\u3092\u66f8\u304f", "Seine Geschichte schreiben", "\u0643\u062a\u0627\u0628\u0629 \u0642\u0635\u062a\u0647", "写下它的故事", "Zijn verhaal schrijven", "Escrever a história dele", "Skriv dess historia", "Написать её историю", "Napisz jego historię", "이야기 쓰기")) : null));
          }
          return h("div", { style: { position: "relative", zIndex: 2, margin: "0 16px 18px", padding: "18px 17px 16px", borderRadius: 18, border: "1px solid " + tA(0.32) + "", background: "linear-gradient(160deg, " + tA(0.07) + ", rgba(255,255,255,0.02))" } },
            /* 12/10 (1007) icone de partage discrete, en haut a droite (a gauche en arabe) : ouvre directement la page Histoire */
            h("button", { type: "button", onClick: function (eSh) { try { eSh.stopPropagation(); } catch (e0) { } partagerFiche(true); }, "aria-label": T("Partager son histoire", "Share their story", "Compartir su historia", "Condividi la sua storia", "\u7269\u8a9e\u3092\u5171\u6709", "Seine Geschichte teilen", "\u0645\u0634\u0627\u0631\u0643\u0629 \u0642\u0635\u062a\u0647", "分享它的故事", "Zijn verhaal delen", "Compartilhar a história dele", "Dela dess historia", "Поделиться её историей", "Udostępnij jego historię", "이야기 공유하기"), style: { position: "absolute", top: 14, insetInlineEnd: 14, width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(214,196,161,0.55)", background: "rgba(5,8,11,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer" } },
              h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
                h("circle", { cx: 18, cy: 5, r: 2.6 }), h("circle", { cx: 6, cy: 12, r: 2.6 }), h("circle", { cx: 18, cy: 19, r: 2.6 }), h("path", { d: "M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" }))),
            h("div", { style: { fontSize: 9, letterSpacing: "0.3em", color: teinteCl, textTransform: "uppercase", fontWeight: 800 } }, "\u2726 " + T("R\u00e9cit", "Story", "Relato", "Racconto", "\u7269\u8a9e", "Geschichte", "\u0627\u0644\u0642\u0635\u0629", "故事", "Verhaal", "História", "Berättelse", "Рассказ", "Opowieść", "이야기")),
            h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 700, color: "#FFFFFF", letterSpacing: 0.8, lineHeight: 1.15, margin: "8px 0 6px", textShadow: "0 0 22px " + tA(0.5) } }, T("Son histoire", "The story", "Su historia", "La sua storia", "\u7269\u8a9e", "Seine Geschichte", "\u0642\u0635\u062a\u0647", "它的故事", "Zijn verhaal", "A história dele", "Berättelsen", "Его история", "Jego historia", "이야기")),
            h("div", { style: { height: 1, width: 64, background: "linear-gradient(90deg, " + tA(0.7) + ", transparent)", margin: "0 0 12px" } }),
            texteH ? h("div", { className: "recitTxt", style: { fontSize: 14, lineHeight: 1.85, color: "#DCE3E8", whiteSpace: "pre-line" } }, texteH)
              : h("div", { style: { fontSize: 12.5, lineHeight: 1.6, color: "rgba(243,238,228,.45)", fontStyle: "italic" } }, T("Aucune histoire pour le moment. Raconte ses d\u00e9buts, ses concours, son caract\u00e8re\u2026", "No story yet. Tell us about their beginnings, their shows, their character\u2026", "A\u00fan sin historia. Cuenta sus inicios, sus concursos, su car\u00e1cter\u2026", "Nessuna storia. Racconta i suoi inizi, i suoi concorsi, il suo carattere\u2026", "\u307e\u3060\u7269\u8a9e\u304c\u3042\u308a\u307e\u305b\u3093", "Noch keine Geschichte. Erzähle von seinen Anfängen, Turnieren, seinem Charakter…", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0642\u0635\u0629 \u062d\u0627\u0644\u064a\u0627. \u0627\u062d\u0643\u064a \u0628\u062f\u0627\u064a\u0627\u062a\u0647 \u0648\u0645\u0633\u0627\u0628\u0642\u0627\u062a\u0647 \u0648\u0637\u0628\u0627\u0639\u0647\u2026", "暂时还没有故事。讲讲它的起步、它的比赛、它的性格吧……", "Nog geen verhaal. Vertel over zijn beginjaren, zijn wedstrijden, zijn karakter…", "Nenhuma história por enquanto. Conte os primeiros passos dele, suas competições, seu temperamento…", "Ingen historia ännu. Berätta om dess början, dess tävlingar, dess personlighet…", "Пока нет истории. Расскажи о её начале пути, соревнованиях, характере…", "Na razie brak historii. Opowiedz o jego początkach, zawodach, charakterze…", "아직 이야기가 없어요. 첫 시작, 대회, 성격을 들려주세요…")),
            proprioH ? h("div", { onClick: ouvrirEditHistoire, style: { marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 13, border: "1px solid " + tA(0.55), background: "color-mix(in srgb, " + teinteCl + " 12%, transparent)", color: teinteCl, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", cursor: "pointer" } },
              h("svg", { viewBox: "0 0 24 24", style: { width: 15, height: 15, stroke: teinteCl, fill: "none", strokeWidth: 2 } }, h("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }), h("rect", { x: 8, y: 2, width: 8, height: 4, rx: 1 })),
              texteH ? T("Modifier son histoire", "Edit their story", "Modificar su historia", "Modifica la sua storia", "\u7269\u8a9e\u3092\u7de8\u96c6", "Seine Geschichte bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0642\u0635\u062a\u0647", "修改它的故事", "Zijn verhaal aanpassen", "Editar a história dele", "Redigera dess historia", "Изменить её историю", "Edytuj jego historię", "이야기 수정하기") : T("\u00c9crire son histoire", "Write their story", "Escribir su historia", "Scrivi la sua storia", "\u7269\u8a9e\u3092\u66f8\u304f", "Seine Geschichte schreiben", "\u0643\u062a\u0627\u0628\u0629 \u0642\u0635\u062a\u0647", "写下它的故事", "Zijn verhaal schrijven", "Escrever a história dele", "Skriv dess historia", "Написать её историю", "Napisz jego historię", "이야기 쓰기")) : null);
        })(),
        /* 29/08 (decision Blandine) : la page Souvenirs s'arrete SOUS L'HISTOIRE.
           Les albums et la Galerie (avec la mise en vedette) partent sur la page
           PHOTOS ; le fil etait deja vide ici depuis le 31/07. Ne restent que la
           photo d'arrivee, le recit, puis les conseils Hey Baby epingles pour CE
           cheval — le composant existait deja et sait filtrer par cheval, rien de
           nouveau n'a ete construit. (Une video remplacera le recit vide plus tard,
           quand Blandine l'aura fournie.) */
        /* 12/10 (1009) etape 4a : temoignages « Ils ont croise sa route », juste apres « Son histoire », avant l encart de fin */
        (chevalDyn && chevalDyn.dbId) ? h(TemoignagesCheval, { chevalId: chevalDyn.dbId, moi: moi, proprioId: chevalDyn.ownerId || null, nomCheval: String(c.nom || chevalDyn.nom || "") }) : null,
        null /* (1004) « Conseils de Hey Baby » retire de la page Histoire (ira sur Actualites) ; le composant EncartConseilsHB et ses donnees ne changent pas */,
        /* 12/10 (1004) ENCART DE FIN « SON HISTOIRE CONTINUE — Avec vous… » (brief valide) : photo panoramique de Blandine
           (images/histoire-continue.webp, l oeil a droite), degrade noir/petrole a gauche, fine bordure champagne. Deux actions
           discretes : la fiche communautaire (le MEME composant PontChevalCommun, deplace de la fiche principale, meme condition :
           au moins un membre a ajoute ce cheval) et « Ajouter ce cheval a mes chevaux » (meme geste que le bouton flottant).
           Une action absente ne laisse aucun vide. */
        /* 20/10 PISTE D (Blandine) : la photo passe en pleine largeur, sans cadre, fondue en haut et en bas dans la page ;
           « Son histoire continue », « Avec vous… » et les boutons centres en bas. Memes boutons, memes conditions. */
        h("div", { className: "chvFin", "data-histoire-fin": "d", style: { position: "relative", zIndex: 2, margin: "14px 0 24px", minHeight: largeCh ? 460 : 400, overflow: "hidden" } },
          h("img", { src: "images/histoire-continue.webp", alt: "", loading: "lazy", decoding: "async", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: largeCh ? "80% 40%" : "78% 40%", display: "block", transform: rtlCh ? "scaleX(-1)" : "none", WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 28%, #000 62%, rgba(0,0,0,0) 100%)" + (largeCh ? ", linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 14%, #000 86%, rgba(0,0,0,0) 100%)" : ""), maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 28%, #000 62%, rgba(0,0,0,0) 100%)" + (largeCh ? ", linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 14%, #000 86%, rgba(0,0,0,0) 100%)" : ""), WebkitMaskComposite: largeCh ? "source-in" : undefined, maskComposite: largeCh ? "intersect" : undefined /* grand ecran : fondue aussi sur les cotes */ } }),
          h("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,11,0) 40%, rgba(5,8,11,0.55) 72%, rgba(5,8,11,0) 100%)" } }),
          h("div", { style: { position: "relative", padding: "0 20px 30px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", minHeight: largeCh ? 460 : 400, boxSizing: "border-box" } },
            h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3.2, textTransform: "uppercase", color: "#D6C4A1" } }, T("Son histoire continue", "Their story goes on", "Su historia contin\u00faa", "La sua storia continua", "\u7269\u8a9e\u306f\u7d9a\u304f", "Seine Geschichte geht weiter", "\u0642\u0635\u062a\u0647 \u0645\u0633\u062a\u0645\u0631\u0629", "它的故事还在继续", "Zijn verhaal gaat verder", "A história dele continua", "Dess historia fortsätter", "Её история продолжается", "Jego historia trwa dalej", "이야기는 계속돼요")),
            h("div", { style: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: largeCh ? 44 : 38, lineHeight: 1.1, fontWeight: 500, color: "#F3EEE4", marginTop: 6, textShadow: "0 2px 14px rgba(0,0,0,0.6)" } }, T("Avec vous\u2026", "With you\u2026", "Contigo\u2026", "Con te\u2026", "\u3042\u306a\u305f\u3068\u5171\u306b\u2026", "Mit dir\u2026", "\u0645\u0639\u0643\u2026", "与你一起……", "Met jullie…", "Com você…", "Med dig…", "С тобой…", "Z tobą…", "함께해요…")),
            /* 20/10 piste D : les deux lignes « Une histoire, mille souvenirs… / Decouvrez les siens… » retirees (le milieu de page invite deja a raconter) */
            h("div", { style: { height: 18 } }),
            /* 12/10 (1008) maquette 3 : les deux boutons COTE A COTE sur une ligne, meme hauteur, presque toute la largeur ;
               libelles courts quand la place manque (iPhone). Memes actions qu avant. Une action absente : l autre prend la ligne. */
            (function () {
              var courtB = false; try { courtB = (window.innerWidth || 390) < 640; } catch (eW) { }
              var styleB = { flex: "1 1 auto", minWidth: 0, padding: courtB ? "0 8px" : "0 14px" };
              return h("div", { style: { display: "flex", justifyContent: "center", gap: 8, width: "100%", maxWidth: 460 } },   /* 20/10 piste D : centree */
                h(PontChevalCommun, { chevalId: (chevalDyn && chevalDyn.dbId) || (typeof window !== "undefined" ? window.__chevalOuvert : null) || null, nom: (chevalDyn && chevalDyn.nom) || "", teinte: teinte, capsule: true, court: courtB, style: styleB }),
                peutLierFiche() ? h("button", { type: "button", onClick: function () { basculerLienFiche(); }, "aria-pressed": estLieFiche ? "true" : "false", style: Object.assign({ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.65)", background: "rgba(5,8,11,0.6)", color: estLieFiche ? "#D6C4A1" : "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: courtB ? 12 : 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }, styleB) },
                  estLieFiche
                    ? h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "#D6C4A1", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { flex: "0 0 auto" } }, h("path", { d: "M5 12.5l4.5 4.5L19 7.5" }))
                    : h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.8, strokeLinecap: "round", "aria-hidden": "true", style: { flex: "0 0 auto" } }, h("path", { d: "M12 5v14M5 12h14" })),
                  h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, estLieFiche
                    ? (courtB ? T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "\u30de\u30a4\u99ac", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들") : T("Dans tes chevaux", "In your horses", "En tus caballos", "Nei tuoi cavalli", "\u30de\u30a4\u99ac\u306b\u767b\u9332\u6e08\u307f", "Bei deinen Pferden", "\u0636\u0645\u0646 \u062e\u064a\u0648\u0644\u0643", "在你的马匹中", "In jouw paarden", "Nos seus cavalos", "Bland dina hästar", "Среди твоих лошадей", "W twoich koniach", "내 말에 있음"))
                    : (courtB ? T("Mes chevaux", "My horses", "Mis caballos", "I miei cavalli", "\u30de\u30a4\u99ac", "Meine Pferde", "\u062e\u064a\u0648\u0644\u064a", "我的马", "Mijn paarden", "Meus cavalos", "Mina hästar", "Мои лошади", "Moje konie", "내 말들") : T("Ajouter \u00e0 mes chevaux", "Add to my horses", "A\u00f1adir a mis caballos", "Aggiungi ai miei cavalli", "\u30de\u30a4\u99ac\u306b\u8ffd\u52a0", "Zu meinen Pferden", "\u0623\u0636\u0641 \u0625\u0644\u0649 \u062e\u064a\u0648\u0644\u064a", "添加到我的马", "Toevoegen aan mijn paarden", "Adicionar aos meus cavalos", "Lägg till bland mina hästar", "Добавить к моим лошадям", "Dodaj do moich koni", "내 말에 추가")))) : null);
            })())), largeCh ? finPageCh() : null /* (1017) ordinateur et tablette : la fin de page Hype (paysage), comme Photos et Videos */) : null,
      /* 29/08 (decision Blandine) : PAGE PHOTOS. Recoit la chronologie par annee
         (brief maquette) puis les albums et la Galerie — mise en vedette comprise —
         qui vivaient jusqu'ici sur la page Souvenirs. Rien n'est perdu : le bloc
         deplace est repris tel quel, memes composants, memes reglages. */
      panneau === "photos" ? h("div", null,
        /* 19/10 (soir) Blandine : « applique aux hero des pages photo le design du hero des pages cavalier » - meme hero que les sous-pages
           d un cavalier (photo a droite fondue a gauche et en haut / bas, petit titre champagne, nom en Cormorant), photo du cheval */
        hypeHeroSousPageCavalier({ large: largeCh, ordi: menuCh, sansRetour: true, libelle: T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"), nom: String(c.nom || ""), photo: (chevalDyn && chevalDyn.photo_palmares) || photoCh || "" }),
        /* 🟥 05/09 (Blandine : « on commence par les albums et ajouter en haut de la page,
           et apres ca part sur la chronologie ») — Albums avant Chronologie, ordre inversé par
           rapport a avant. */
        /* 🟩 05/09 (Blandine : ajouter deux traits gris, identiques a ceux de la page Ecurie,
   au-dessus et en dessous des Albums pour les separer du reste de la page) */
        null /* (978) barre grise retiree : design de la page Sante */,
        ongletsPanCh(),
        /* 12/10 (1011) encart d introduction Photos (maquette de Blandine), avant les albums */
        tousSouvCh ? h("button", { type: "button", onClick: function () { setTousSouvCh(null); try { var pnS = document.querySelector(".chvPanFix"); } catch (eS) { } }, style: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 40, margin: "0 16px 10px", padding: "0 14px", borderRadius: 999, border: "1px solid rgba(214,196,161,0.5)", background: "rgba(5,8,11,0.55)", color: "#D6C4A1", fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, (rtlCh ? "\u203a " : "\u2039 ") + T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진")) : null,
        tousSouvCh ? null : h(React.Fragment, null,
        encartIntroCh("images/photos-intro.webp", T("Photos", "Photos", "Fotos", "Foto", "\u5199\u771f", "Fotos", "\u0627\u0644\u0635\u0648\u0631", "照片", "Foto's", "Fotos", "Foton", "Фото", "Zdjęcia", "사진"),
          T("Des instants \u00e0 garder\u2026", "Moments to keep\u2026", "Instantes para guardar\u2026", "Istanti da custodire\u2026", "\u6b8b\u3057\u3066\u304a\u304d\u305f\u3044\u77ac\u9593\u2026", "Augenblicke zum Bewahren\u2026", "\u0644\u062d\u0638\u0627\u062a \u062a\u0633\u062a\u062d\u0642 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0647\u0627\u2026", "值得珍藏的瞬间……", "Momenten om te bewaren…", "Momentos para guardar…", "Ögonblick att spara…", "Мгновения, которые стоит сохранить…", "Chwile warte zachowania…", "간직하고 싶은 순간들…"),
          T("Ses plus beaux moments, ses petits bonheurs et tous les souvenirs partag\u00e9s.", "Their finest moments, little joys and all the memories shared.", "Sus mejores momentos, sus peque\u00f1as alegr\u00edas y todos los recuerdos compartidos.", "I suoi momenti pi\u00f9 belli, le piccole gioie e tutti i ricordi condivisi.", "\u6700\u9ad8\u306e\u77ac\u9593\u3001\u5c0f\u3055\u306a\u5e78\u305b\u3001\u305d\u3057\u3066\u5206\u304b\u3061\u5408\u3063\u305f\u3059\u3079\u3066\u306e\u601d\u3044\u51fa\u3002", "Seine sch\u00f6nsten Momente, kleinen Freuden und alle geteilten Erinnerungen.", "\u0623\u062c\u0645\u0644 \u0644\u062d\u0638\u0627\u062a\u0647\u060c \u0648\u0623\u0641\u0631\u0627\u062d\u0647 \u0627\u0644\u0635\u063a\u064a\u0631\u0629\u060c \u0648\u0643\u0644 \u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a \u0627\u0644\u0645\u0634\u062a\u0631\u0643\u0629.", "它最美的时刻、小小的快乐，以及所有共同的回忆。", "Zijn mooiste momenten, zijn kleine geluksmomentjes en alle gedeelde herinneringen.", "Seus momentos mais bonitos, suas pequenas alegrias e todas as lembranças compartilhadas.", "Dess finaste ögonblick, små glädjeämnen och alla delade minnen.", "Её лучшие моменты, маленькие радости и все общие воспоминания.", "Jego najpiękniejsze chwile, małe radości i wszystkie wspólne wspomnienia.", "가장 아름다운 순간, 작은 행복, 함께 나눈 모든 추억."),
          h("svg", { viewBox: "0 0 24 24", width: 17, height: 17, fill: "none", stroke: "#D6C4A1", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }, h("rect", { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2.5 }), h("circle", { cx: 9, cy: 10, r: 1.8 }), h("path", { d: "M4 17l5-4.5 4 3.5 3-2.5 4 3.5" }))),
        doitLierPourAjouter() ? h(CarteAjouteAuxChevaux, { nom: String((c && c.nom) || (chevalDyn && chevalDyn.nom) || ""), onLier: function () { return basculerLienFiche(); } }) : null,   /* 18/10 (nuit) */
        h("div", null, h(AlbumsCheval, { cible: cibleCh, teinte: teinte, presentationPhotos: true /* (881) */, mesAlbumsSeulement: true, verrouAjout: doitLierPourAjouter() ? montrerCarteLier : null /* 18/10 (nuit) */, fermerCle: albumsChFermerCle, ajoutCle: albumsChAjoutCle /* 11/09 (14) : « Ajouter un souvenir » -> feuille « Dans quel album ? » */, onOuvertureLocale: function () { setVisionneuse(null); } })),
        h("div", { "aria-hidden": "true", style: { display: "flex", alignItems: "center", gap: 12, margin: "30px 16px 26px" } }, h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(214,196,161,0), rgba(214,196,161,0.5), rgba(214,196,161,0))" } }), h("i", { style: { width: 7, height: 7, background: "#D6C4A1", transform: "rotate(45deg)", flexShrink: 0 } }), h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(214,196,161,0), rgba(214,196,161,0.5), rgba(214,196,161,0))" } })), /* (918) Blandine : la barre grise sous les albums devient le losange champagne */),
        h(ChronologieSouvenirs, {
          key: tousSouvCh ? "souv-complet" : "souv-vitrine",
          mode: tousSouvCh ? "complet" : "vitrine",   /* 12/10 (1027) vitrine sur la page Photos, page complete « Tous les souvenirs » */
          debutAn: (tousSouvCh && tousSouvCh.an) || null,
          nomCheval: String((c && c.nom) || ""),
          onVoirTout: function (oV) { setTousSouvCh({ an: (oV && oV.an) || null }); try { setTimeout(function () { var pans = document.querySelectorAll("div"); for (var iP = 0; iP < pans.length; iP++) { var csP = getComputedStyle(pans[iP]); if (csP.position === "fixed" && csP.zIndex === "6500") { pans[iP].scrollTop = 0; break; } } }, 30); } catch (eT) { } },
          chevalId: (chevalDyn && chevalDyn.dbId) || null,
          peutVedette: !!((chevalDyn && moi && chevalDyn.ownerId === moi.id) || (typeof estModerateurHype === "function" && estModerateurHype(moi))), /* 09/09 CORRECTIF : peutChoisirMediaF n'existe que dans la portee de sectionMomentsForts, pas ici -- meme expression recalculee directement, moi/chevalDyn deja verifies disponibles a cet endroit (cf. la prop proprio juste au-dessus, qui les utilise deja) */
          vedetteUrl: (chevalDyn && chevalDyn.galerie_vedette_url && typeof urlNue === "function") ? urlNue(chevalDyn.galerie_vedette_url) : null,
          onDefinirVedette: function (urlBrut) {
            if (!chevalDyn || !chevalDyn.dbId) return;
            var urlN = (typeof urlNue === "function") ? urlNue(urlBrut) : urlBrut;
            var actuelle = (chevalDyn.galerie_vedette_url && typeof urlNue === "function") ? urlNue(chevalDyn.galerie_vedette_url) : (chevalDyn.galerie_vedette_url || null);
            var nouvelle = (actuelle === urlN) ? null : urlN; /* retap sur la vedette actuelle = la retirer */
            hypeDefinirVedetteGalerie(chevalDyn.dbId, nouvelle).then(function (rVg) {
              if (rVg && rVg.ok) { setChevalDyn(function (avVg) { return Object.assign({}, avVg || {}, { galerie_vedette_url: nouvelle }); }); }
              else { setToast(T("Action non autorisée", "Not allowed", "Acción no permitida", "Azione non consentita", "\u3053\u306e\u64cd\u4f5c\u306f\u8a8d\u3081\u3089\u308c\u3066\u3044\u307e\u305b\u3093", "Aktion nicht erlaubt", "\u0625\u062c\u0631\u0627\u0621 \u063a\u064a\u0631 \u0645\u0633\u0645\u0648\u062d", "无权执行此操作", "Actie niet toegestaan", "Ação não permitida", "Åtgärden är inte tillåten", "Действие не разрешено", "Czynność niedozwolona", "허용되지 않는 동작이에요")); }
            });
          },
          teinte: teinte, teinteCl: teinteCl,
          /* 11/09 (10) — proprietaire OU moderatrice, meme expression que peutVedette juste
             au-dessus (les droits en base autorisent deja les deux : photo_dates UPDATE elargi le
             11/09 au matin, photo_formats des sa creation). Gouverne les liens « Changer l'annee
             d'une photo » et « Choisir le format d'une photo ». */
          proprio: !!(chevalDyn && chevalDyn.dbId && ((moi && chevalDyn.ownerId === moi.id) || (typeof estModerateurHype === "function" && estModerateurHype(moi)))),
          onOuvrir: function (uV, albIdV) { setAlbumsChFermerCle(function (nCl) { return nCl + 1; }); setVisionneuseAlbumId(albIdV || null); setVisionneuse(uV); },
          onAjouter: function () { ouvrirAjoutSouvenir(); } /* 11/09 (12) : plus jamais un tap muet -- voir ouvrirAjoutSouvenir */
        }),
                /* 🟥 05/09 (Blandine : « ca fait trop sur cette page ») — la Galerie (en-tete + grille
           GrilleSouvenirs) est RETIREE d'ici. Ce qu'elle montrait vraiment : les photos
           POSTEES EN COMMENTAIRE (listerCommentaires), PAS les photos d'album — explication
           inexacte donnee plus tot dans la journee, corrigee ici. Rien n'est perdu en base :
           ces photos restent visibles la ou le commentaire a ete poste. Le chargement
           `mediasInfo` que GrilleSouvenirs faisait vivre (pour Supprimer/Vedette dans la
           visionneuse) est repris plus haut, juste apres la declaration de `mediasInfo`,
           independant de cet affichage. GrilleSouvenirs elle-meme reste dans le fichier,
           inutilisee — utile si Blandine construit un jour un fil photo + commentaire
           (« type post Facebook »), evoque le meme jour. */
        /* 30/08 02h55 — L'INVITATION PART QUAND SA MISSION EST ACCOMPLIE.
           Meme regle produit que la video d'import du palmares : la condition est
           sur LA DONNEE (la galerie a des photos), jamais sur « deja vu ». Une
           phrase discrete permet de la revoir. */
        /* 05/09 : galVideCh retire avec Galerie, sa seule source. */ revoirMascotte ? h(BlocSouvenirsVide, { teinteCl: teinteCl, onAjouter: function () { ouvrirAjoutSouvenir(); } /* 11/09 (12) : meme secours que le bouton de la chronologie */ })
          : h("div", { style: { textAlign: "center", padding: "18px 16px 8px" } },
              h("span", { onClick: function () { setRevoirMascotte(true); }, style: { fontSize: 12.5, color: "rgba(243,238,228,.45)", fontStyle: "italic", fontFamily: "'Cormorant Garamond',Georgia,serif", cursor: "pointer", letterSpacing: ".02em" } },
                T("Revoir la petite vid\u00e9o", "Watch the little video again", "Volver a ver el v\u00eddeo", "Rivedi il piccolo video", "\u3082\u3046\u4e00\u5ea6\u52d5\u753b\u3092\u898b\u308b", "Das kleine Video nochmal ansehen", "\u0625\u0639\u0627\u062f\u0629 \u0645\u0634\u0627\u0647\u062f\u0629 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0627\u0644\u0642\u0635\u064a\u0631", "再看一遍小视频", "Het filmpje opnieuw bekijken", "Rever o vídeozinho", "Se den lilla videon igen", "Пересмотреть короткое видео", "Obejrzyj ponownie krótki film", "짧은 영상 다시 보기") + " \u21bb")), finPageCh() /* (918) tout en bas, apres « Revoir la petite video » */) : null,
      /* 29/08 (demande Blandine) : PAGE ACTUALITE. Le fil du cheval (MurHype) y est
         desormais rendu, en pleine page et non plus en rail compact. La carte de la
         grille est volontairement GRISEE « Prochainement » pour l'instant : la page
         est prete, mais Blandine veut d'abord decider qui peut publier et ce qu'est
         un post. Retirer la condition sur la carte pour l'ouvrir. */
      /* 14/09 (127) - LA PAGE ACTUALITE DU CHEVAL S OUVRE. Elle existait depuis le 29/08,
         prete mais grisee « Prochainement » le temps que Blandine decide CE QU EST un post
         ici. Sa reponse : « 4 » = le fil de sa fiche ET les publications ou il est
         identifie, melanges et tries par date. Le melange est fait par MurHype lui-meme
         (prop `chargerEnPlus`), donc les cartes, les « j aime », les reponses et les
         videos marchent ici comme partout ailleurs, sans une deuxieme copie du code.
         QUI PEUT PUBLIER n a PAS change : ce sont les regles deja en place sur le mur du
         cheval, cette question-la n a pas ete tranchee. */
      panneau === "actualite" ? h("div", { style: { padding: "0 0 24px" } },
        /* 15/10 (1142) PAGE ACTUALITE DU CHEVAL, maquette de Blandine (iPhone / iPad / ordinateur) : la photo du cheval en haut
           avec « ACTUALITE » et son nom (meme encart que Videos / Photos) ; sans photo : l alezan au couchant fourni par Blandine
           (images/cheval-defaut-alezan.webp). Des 768 px, les publications sur deux colonnes (prop deuxColonnes du fil). */
        heroSousPageCh(T("Actualit\u00e9", "News", "Actualidad", "Attualit\u00e0", "\u30cb\u30e5\u30fc\u30b9", "Aktuelles", "\u0627\u0644\u0623\u062e\u0628\u0627\u0631", "动态", "Nieuws", "Novidades", "Nyheter", "Новости", "Aktualności", "소식"), "images/cheval-defaut-alezan.webp"),
        /* 15/10 (1145) navigation entre les pages du cheval (Histoire, Photos, Resultats, Videos, Actualite, Sante), sous la photo */
        ongletsPanCh("16px 16px 18px"),
        h("div", { style: { height: 10 } }),
        h(MurHype, {
          cible: cibleCh, teinte: teinte, vignette: false /* (1142) maquette : grandes cartes avec la photo (avant : vignettes) */, deuxColonnes: true,
          cartesEncadrees: true /* 19/10 (nuit) */,
          /* 19/10 MOSAIQUE : les jours de concours des 12 derniers mois (12 au plus), en cases dorees ; toucher -> onglet Resultats */
          mosaique: { concours: (function () { try { var limM = new Date(Date.now() - 365 * 86400000).toISOString().slice(0, 10); return hypeConcoursParJourActu((resDb || []).filter(function (rM) { return rM && rM.visible !== false && String(rM.date_epreuve || "").slice(0, 10) >= limM; })).slice(0, 12); } catch (eMq) { return []; } })(),
            ouvrirConcours: function () { setPanneau("palmares"); try { window.scrollTo(0, 0); } catch (eSc) { } },
            maquetteOrdi: true /* 19/10 soir : maquette ordinateur / tablette (iPhone inchange) */ },
          carteVerrou: doitLierPourAjouter() ? h(CarteAjouteAuxChevaux, { nom: String((c && c.nom) || (chevalDyn && chevalDyn.nom) || ""), onLier: function () { return basculerLienFiche(); } }) : null,   /* 18/10 (nuit) */
          apresComposer: function (etatA) { return ambianceActuCh(etatA); },   /* (1144) */
          chargerEnPlus: function () { return hypePostsIdentifiesCheval((c && c.dbId) || id); }
        }),
        finPageCh() /* 19/10 02:16 Blandine « il y a bien la fin de page habituelle ? » : la page Actualite du cheval n avait pas le bandeau HYPE (le cavalier l a) */) : null,
      panneau === "passeport" ? h("div", { style: { padding: "18px 22px 0", textAlign: "center" } },
        h("div", { style: { fontSize: 42, marginTop: 26 } }, "🩺"),
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: "#F4F6F7", marginTop: 14 } }, T("Le passeport arrive", "The passport is coming", "El pasaporte llega pronto", "Il passaporto sta arrivando", "パスポートは準備中", "Der Pass kommt bald", "\u0627\u0644\u062c\u0648\u0627\u0632 \u0642\u0627\u062f\u0645", "护照即将上线", "Het paspoort komt eraan", "O passaporte está chegando", "Passet kommer", "Паспорт скоро появится", "Paszport już wkrótce", "패스포트가 곧 나와요")),
        h("p", { style: { fontSize: 13, lineHeight: 1.65, color: "rgba(243,238,228,0.6)", margin: "12px auto 0", maxWidth: 300 } }, T("Bientôt, chaque cheval aura ici sa carte d'identité vivante : vaccins, soins, consignes permanentes, habitudes — et Hey Baby s'en souviendra à chaque analyse.", "Soon, every horse will have its living identity card here: vaccines, care, standing instructions, habits — and Hey Baby will remember it in every analysis.", "Pronto, cada caballo tendrá aquí su carné de identidad vivo: vacunas, cuidados, consignas, hábitos — y Hey Baby lo recordará en cada análisis.", "Presto ogni cavallo avrà qui la sua carta d'identità viva: vaccini, cure, consegne, abitudini — e Hey Baby se ne ricorderà a ogni analisi.", "まもなく、それぞれの馬の「生きたカルテ」がここに。ワクチン・ケア・注意事項・習慣をHey Babyが記憶し、すべての分析に活かします。", "Bald erhält jedes Pferd hier seinen lebendigen Ausweis: Impfungen, Pflege, feste Anweisungen, Gewohnheiten — und Hey Baby wird sich bei jeder Analyse daran erinnern.", "\u0642\u0631\u064a\u0628\u0627 \u0633\u064a\u0643\u0648\u0646 \u0644\u0643\u0644 \u062d\u0635\u0627\u0646 \u0647\u0646\u0627 \u0628\u0637\u0627\u0642\u0629 \u0647\u0648\u064a\u0629 \u062d\u064a\u0629: \u0627\u0644\u0644\u0642\u0627\u062d\u0627\u062a \u0648\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0648\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0627\u0644\u062f\u0627\u0626\u0645\u0629 \u0648\u0627\u0644\u0639\u0627\u062f\u0627\u062a \u2014 \u0648\u0633\u064a\u062a\u0630\u0643\u0631\u0647\u0627 Hey Baby \u0641\u064a \u0643\u0644 \u062a\u062d\u0644\u064a\u0644.", "很快，每匹马在这里都会有一张鲜活的身份证：疫苗、护理、长期注意事项、习惯——Hey Baby 在每次分析时都会记得。", "Binnenkort krijgt elk paard hier zijn levende identiteitskaart: vaccinaties, verzorging, vaste instructies, gewoontes — en Hey Baby onthoudt het bij elke analyse.", "Em breve, cada cavalo terá aqui sua carteira de identidade viva: vacinas, cuidados, instruções permanentes, hábitos — e a Hey Baby vai se lembrar de tudo a cada análise.", "Snart får varje häst sitt levande ID-kort här: vaccinationer, vård, permanenta instruktioner, vanor — och Hey Baby kommer ihåg det vid varje analys.", "Скоро у каждой лошади здесь будет своё живое удостоверение: прививки, уход, постоянные указания, привычки — и Hey Baby будет помнить это при каждом анализе.", "Wkrótce każdy koń będzie miał tutaj swój żywy dowód tożsamości: szczepienia, opiekę, stałe zalecenia, nawyki — a Hey Baby będzie o nich pamiętać przy każdej analizie.", "곧 모든 말마다 이곳에 살아 있는 신분증이 생겨요: 백신, 케어, 항상 지켜야 할 사항, 습관까지 — 그리고 Hey Baby가 분석할 때마다 기억해 줘요."))) : null) : null,

    h("style", { dangerouslySetInnerHTML: { __html: "@keyframes haloPlusFiche{0%{box-shadow:0 0 0 0 rgba(234,199,122,0.35);}55%{box-shadow:0 0 0 9px rgba(234,199,122,0);}100%{box-shadow:0 0 0 0 rgba(234,199,122,0);}}" } }),
    null /* 13/10 (1081) Blandine : « c est quoi le bouton rouge qui nous suit sur toute la page comme un bug » : la pastille flottante est retiree ; le meme bouton est pose sous le nom du cheval. */,

    h("input", { ref: refPhotoCh, type: "file", accept: "image/*", onChange: choisirPhotoCheval, style: { display: "none" } }),
    /* 11/09 (12) — selecteur de secours pour « Ajouter un souvenir » : appartient a EcranCheval,
       donc toujours disponible tant que la fiche est ouverte, contrairement au registre global
       rempli par le composer du fil. */
    h("input", { ref: refPhotoSouvenir, type: "file", accept: "image/*", onChange: function (eSv) { var fSv = eSv.target.files && eSv.target.files[0]; eSv.target.value = ""; if (fSv) envoyerPhotoSouvenirDirecte(fSv); }, style: { display: "none" } }),
    /* 11/09 (15) — feuille « Écurie du cheval » (Zeus), ouverte depuis le menu ⋮. */
    (ecurieFicheOuverte && c.dbId && chevalDyn) ? h(FeuilleEcurieCheval, {
      chevalId: c.dbId, ownerId: chevalDyn.ownerId, nomCheval: (chevalDyn && chevalDyn.nom) || c.nom || "",
      clubActuel: (chevalDyn && chevalDyn.club) || "", clubsSecours: mesClubsFiche, teinte: teinte,
      onFermer: function () { setEcurieFicheOuverte(false); },
      onChange: function (vEc) {
        setChevalDyn(function (avEc) { return Object.assign({}, avEc || {}, { club: vEc || null }); });
        setToast(T("Écurie enregistrée ✓", "Stable saved ✓", "Cuadra guardada ✓", "Scuderia salvata ✓", "\u53a9\u820e\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f \u2713", "Stall gespeichert ✓", "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u2713", "马厩已保存 ✓", "Stal opgeslagen ✓", "Cocheira salva ✓", "Stall sparat ✓", "Конюшня сохранена ✓", "Stajnia zapisana ✓", "마구간을 저장했어요 ✓") + (vEc ? (" \u00b7 " + vEc) : ""));
        setTimeout(function () { setToast(null); }, 2800);
      }
    }) : null,
    menuFiche ? h("div", { onClick: function () { setMenuFiche(false); setConfSupprFiche(false); }, style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(4,6,9,0.72)", display: "flex", alignItems: "flex-end" } },
      h("div", { onClick: function (eM) { eM.stopPropagation(); }, style: { width: "100%", background: "linear-gradient(180deg, rgba(16,20,26,0.98), rgba(9,11,15,0.99))", borderTop: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px 20px 0 0", padding: "10px 16px calc(104px + env(safe-area-inset-bottom))", maxHeight: "94vh", overflowY: "auto", WebkitOverflowScrolling: "touch" /* 11/09 (16) : le bas du menu (« Supprimer », « Annuler ») passait SOUS la barre d onglets -- cale de la hauteur de la barre (84 px) + la marge d avant. Pas de portail ici : « Changer la photo » y declenche un champ fichier (lecon iOS du 05/09). */ } },
        h("div", { style: { width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "6px auto 16px" } }),
        /* 03/09 (Blandine) : « donner son surnom » — le nom d'usage sous lequel
           ELLE connait ce cheval. Personnel : il ne touche ni le nom officiel (cle
           du verrou d'identite FFE) ni l'alias commun, et n'apparait jamais chez
           les autres. Ouvert a tous ceux qui ont le cheval chez eux. */
        (chevalDyn && chevalDyn.dbId && moi) ? h("button", { onClick: function () {
            setMenuFiche(false);
            try {
              var actuel = surnomPerso || "";
              var saisi = window.prompt(T("Son surnom, celui que TU utilises. Vide pour l'enlever.", "Your own nickname for this horse. Empty to remove.", "Tu apodo para este caballo. Vacío para quitarlo.", "Il tuo soprannome per questo cavallo. Vuoto per toglierlo.", "この馬のあなたの愛称。空で削除。", "Dein eigener Spitzname. Leer zum Entfernen.", "\u0644\u0642\u0628\u0647\u060c \u0627\u0644\u0630\u064a \u062a\u0633\u062a\u0639\u0645\u0644\u064a\u0646\u0647 \u0623\u0646\u062a. \u0627\u062a\u0631\u0643\u064a\u0647 \u0641\u0627\u0631\u063a\u0627 \u0644\u0625\u0632\u0627\u0644\u062a\u0647.", "它的昵称，只属于你。留空即可删除。", "Zijn bijnaam, degene die JIJ gebruikt. Laat leeg om te verwijderen.", "O apelido dele, aquele que VOCÊ usa. Deixe vazio para remover.", "Dess smeknamn, det som DU använder. Lämna tomt för att ta bort det.", "Её прозвище — то, которым пользуешься ТЫ. Оставь пустым, чтобы убрать.", "Jego przydomek, ten, którego TY używasz. Zostaw puste, aby usunąć.", "내가 부르는 애칭이에요. 비우면 삭제돼요."), actuel);
              if (saisi === null) return;
              var net = String(saisi).trim();
              setSurnomPerso(net);
              enregistrerSurnomPerso(chevalDyn.dbId, net).then(function (rS) {
                if (rS && rS.error) { setSurnomPerso(actuel); try { window.alert(hypeT7("Le surnom n'a pas pu être enregistré. Réessaie.", "The nickname could not be saved. Try again.", "No se pudo guardar el apodo. Vuelve a intentarlo.", "Impossibile salvare il soprannome. Riprova.", "\u611b\u79f0\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", "Der Spitzname konnte nicht gespeichert werden. Versuche es erneut.", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u0644\u0642\u0628. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "昵称保存失败，请重试。", "De bijnaam kon niet worden opgeslagen. Probeer het opnieuw.", "Não foi possível salvar o apelido. Tente de novo.", "Smeknamnet kunde inte sparas. Försök igen.", "Не удалось сохранить прозвище. Попробуй ещё раз.", "Nie udało się zapisać przydomka. Spróbuj ponownie.", "애칭을 저장하지 못했어요. 다시 시도해 주세요.")); } catch (eA) { } return; }
                /* le surnom rejoint la recherche publique — sans son auteur */
                if (net) hypeDeposerTermeRecherche(chevalDyn.dbId, net);
              });
            } catch (eSp) { }
          }, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 13.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } },
          (surnomPerso ? T("Changer son surnom", "Change nickname", "Cambiar el apodo", "Cambia soprannome", "愛称を変更", "Spitzname ändern", "\u062a\u063a\u064a\u064a\u0631 \u0644\u0642\u0628\u0647", "修改它的昵称", "Zijn bijnaam wijzigen", "Mudar o apelido", "Ändra smeknamn", "Изменить прозвище", "Zmień jego przydomek", "애칭 바꾸기") : T("Lui donner un surnom", "Give a nickname", "Ponerle un apodo", "Dagli un soprannome", "愛称をつける", "Spitznamen geben", "\u0625\u0639\u0637\u0627\u0624\u0647 \u0644\u0642\u0628\u0627", "给它起个昵称", "Hem een bijnaam geven", "Dar um apelido", "Ge ett smeknamn", "Дать прозвище", "Nadaj mu przydomek", "애칭 지어 주기"))
            + (surnomPerso ? (" \u00b7 " + surnomPerso) : "")) : null,
        /* 11/09 (15) — ZEUS : l'ecurie du cheval, en UN tap depuis ce menu (avant : cachee dans
           « Modifier la fiche », et seulement si la personne connectee avait deux ecuries).
           Proprietaire OU moderatrice, comme set_cheval_club en base. Ouvre FeuilleEcurieCheval. */
        (c.dbId && moi && chevalDyn && (chevalDyn.ownerId === moi.id || (typeof estModerateurHype === "function" && estModerateurHype(moi)))) ? h("button", { onClick: function () { setMenuFiche(false); setConfSupprFiche(false); setEcurieFicheOuverte(true); }, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 13.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } },
          "\ud83c\udfe0 " + T("\u00c9curie du cheval", "Horse's stable", "Cuadra del caballo", "Scuderia del cavallo", "\u6240\u5c5e\u53a9\u820e", "Stall des Pferds", "\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u062d\u0635\u0627\u0646", "马的马厩", "Stal van het paard", "Cocheira do cavalo", "Hästens stall", "Конюшня лошади", "Stajnia konia", "말의 마구간") + " \u00b7 " + ((chevalDyn && chevalDyn.club) ? String(chevalDyn.club) : T("Aucune", "None", "Ninguna", "Nessuna", "\u306a\u3057", "Keine", "\u0644\u0627 \u0634\u064a\u0621", "无", "Geen", "Nenhuma", "Inget", "Нет", "Żadna", "없음"))) : null,
        h("button", { onClick: function () { setMenuFiche(false); if (refPhotoCh.current) refPhotoCh.current.click(); }, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\ud83d\udcf7 " + T("Changer la photo", "Change photo", "Cambiar foto", "Cambia foto", "\u5199\u771f\u3092\u5909\u66f4", "Foto \u00e4ndern", "\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0635\u0648\u0631\u0629", "更换照片", "Foto wijzigen", "Trocar a foto", "Byt foto", "Сменить фото", "Zmień zdjęcie", "사진 변경")),
          h("button", { onClick: function () { setMenuFiche(false); ajusterPhotoCheval(); }, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\u2702\ufe0f " + T("Ajuster / recadrer la photo", "Adjust / crop photo", "Ajustar / recortar la foto", "Regola / ritaglia la foto", "\u5199\u771f\u3092\u8abf\u6574", "Foto anpassen / zuschneiden", "\u0636\u0628\u0637 / \u0642\u0635 \u0627\u0644\u0635\u0648\u0631\u0629", "调整 / 裁剪照片", "Foto bijstellen / bijsnijden", "Ajustar / recortar a foto", "Justera / beskär fotot", "Настроить / обрезать фото", "Dopasuj / przytnij zdjęcie", "사진 조정 / 자르기")),
          h("button", { onClick: function () { setMenuFiche(false); ouvrirTag(photoCh); }, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\ud83c\udff7\ufe0f " + T("Identifier dans la photo", "Tag in the photo", "Etiquetar en la foto", "Tagga nella foto", "\u5199\u771f\u306b\u30bf\u30b0", "Im Foto identifizieren", "\u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0641\u064a \u0627\u0644\u0635\u0648\u0631\u0629", "在照片中标记", "Taggen in de foto", "Marcar na foto", "Tagga i fotot", "Отметить на фото", "Oznacz na zdjęciu", "사진에 태그하기")),
          (false /* (888) choix de teinte retire */ && c.dbId && moi && chevalDyn && (chevalDyn.ownerId === moi.id || estModerateurHype(moi) || gereClubCh)) ? h("div", { style: { padding: "13px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 } },   /* (834) + moderatrice + responsable du club */
            h("span", { style: { color: "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif" } }, "\ud83c\udfa8 " + T("Teinte", "Tint", "Tinte", "Tinta", "\u8272\u5408\u3044", "Farbton", "\u0627\u0644\u0644\u0648\u0646", "色调", "Tint", "Tonalidade", "Nyans", "Оттенок", "Odcień", "색조")),
            h("div", { style: { display: "flex", gap: 10, marginLeft: "auto" } }, [["", "#7FA3AD"], ["#D6C4A1", "#D6C4A1"], ["#C64B5C", "#C64B5C"], ["#5C7A5E", "#5C7A5E"]].map(function (tD) {
              var actT = (chevalDyn.teinte || "") === tD[0];
              return h("button", { key: "td" + tD[1], onClick: async function () { try { await hypeMajChevalDroits(c.dbId, { teinte: tD[0] || null }); setChevalDyn(function (pC) { return Object.assign({}, pC || {}, { teinte: tD[0] || null }); }); } catch (eTd) { } }, style: { width: 26, height: 26, borderRadius: "50%", border: actT ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.25)", background: tD[1], cursor: "pointer", padding: 0 } });
            }))) : null /* 30/07 : teinte accessible en un tap depuis le menu (demande Blandine) */, /* 30/07: recadreur accessible depuis le menu de la fiche (demande Blandine) */
        c.dbId ? h(React.Fragment, null,
          h("button", { onClick: ouvrirEditFiche, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 } }, "✏️", T("Modifier la fiche", "Edit horse", "Editar ficha", "Modifica scheda", "編集", "Profil bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0635\u0641\u062d\u0629", "修改档案", "Profiel aanpassen", "Editar a ficha", "Redigera hästen", "Изменить карточку", "Edytuj profil konia", "프로필 수정")),
          h("button", { onClick: confirmerSupprFiche, disabled: busyFiche, style: { width: "100%", textAlign: "left", padding: "14px 8px", background: "none", border: "none", color: confSupprFiche ? "#FF8A93" : "#F3EEE4", fontSize: 15, fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 } }, "🗑", busyFiche ? "…" : (confSupprFiche ? (T("Confirmer la suppression de", "Confirm deletion of", "Confirmar la eliminación de", "Conferma l'eliminazione di", "削除を確認", "Löschen bestätigen von", "\u062a\u0623\u0643\u064a\u062f \u062d\u0630\u0641", "确认删除", "Verwijdering bevestigen van", "Confirmar a exclusão de", "Bekräfta borttagning av", "Подтвердить удаление:", "Potwierdź usunięcie: ", "삭제 확인:") + " " + (c.nom || "")) : T("Supprimer la fiche", "Delete horse", "Eliminar ficha", "Elimina scheda", "削除", "Profil löschen", "\u062d\u0630\u0641 \u0627\u0644\u0635\u0641\u062d\u0629", "删除档案", "Profiel verwijderen", "Excluir a ficha", "Ta bort hästen", "Удалить карточку", "Usuń profil", "프로필 삭제")))
        ) : h("div", { style: { padding: "8px", fontSize: 13, color: "#A39D92", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.5 } }, T("Cette fiche est une fiche spéciale Hype. Écris-nous pour la modifier.", "This is a special Hype profile. Contact us to edit it.", "Ficha especial Hype. Escríbenos para modificarla.", "Scheda speciale Hype. Scrivici per modificarla.", "特別なHypeプロフィールです。編集をご希望の場合はご連絡ください。", "Dies ist ein spezielles Hype-Profil. Schreib uns, um es zu ändern.", "\u0647\u0630\u0647 \u0635\u0641\u062d\u0629 \u062e\u0627\u0635\u0629 \u0645\u0646 Hype. \u0631\u0627\u0633\u0644\u064a\u0646\u0627 \u0644\u062a\u0639\u062f\u064a\u0644\u0647\u0627.", "这是 Hype 的特别档案。请联系我们来修改。", "Dit is een speciaal Hype-profiel. Stuur ons een bericht om het aan te passen.", "Esta ficha é uma ficha especial do Hype. Escreva para nós para modificá-la.", "Det här är en särskild Hype-profil. Skriv till oss för att ändra den.", "Эта карточка — особая карточка Hype. Напиши нам, чтобы её изменить.", "Ten profil jest specjalnym profilem Hype. Napisz do nas, aby go zmienić.", "이 프로필은 Hype 특별 프로필이에요. 수정하려면 문의해 주세요.")),
        h("button", { onClick: function () { setMenuFiche(false); setConfSupprFiche(false); }, style: { width: "100%", textAlign: "center", marginTop: 10, padding: "12px 8px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 12, color: "#B9C6CC", fontSize: 13.5, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")))) : null,
    editFiche ? h("div", { onClick: function () { setEditFiche(false); }, style: { position: "fixed", inset: 0, zIndex: 9100, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
      h("div", { onClick: function (eE) { eE.stopPropagation(); }, style: { width: "100%", maxWidth: 360, borderRadius: 18, background: "linear-gradient(180deg, rgba(16,20,26,0.98), rgba(9,11,15,0.99))", border: "1px solid rgba(255,255,255,0.1)", padding: 20 } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.4, color: "#F3EEE4", textTransform: "uppercase", marginBottom: 16, textAlign: "center" } }, T("Modifier la fiche", "Edit horse", "Editar ficha", "Modifica scheda", "編集", "Profil bearbeiten", "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0635\u0641\u062d\u0629", "修改档案", "Profiel aanpassen", "Editar a ficha", "Redigera hästen", "Изменить карточку", "Edytuj profil konia", "프로필 수정")),
        champsFiche ? h(React.Fragment, null,
          h("input", { value: champsFiche.nom, onChange: function (eN) { setChampsFiche(Object.assign({}, champsFiche, { nom: eN.target.value })); }, placeholder: T("Nom du cheval", "Horse name", "Nombre", "Nome", "馬の名前", "Name des Pferdes", "\u0627\u0633\u0645 \u0627\u0644\u062d\u0635\u0627\u0646", "马的名字", "Naam van het paard", "Nome do cavalo", "Hästens namn", "Кличка лошади", "Imię konia", "말 이름"), style: { width: "100%", padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F3EEE4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", marginBottom: 9, boxSizing: "border-box" } }),
          false /* (888) choix de teinte retire */ ? null : null, h("div", { style: { display: "none" } },
            h("div", { style: { fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9AA2AC", fontWeight: 700 } }, T("Teinte de la fiche", "Profile tint", "Tinte de la ficha", "Tinta della scheda", "\u30c6\u30fc\u30de\u30ab\u30e9\u30fc", "Farbton des Profils", "\u0644\u0648\u0646 \u0627\u0644\u0635\u0641\u062d\u0629", "档案色调", "Tint van het profiel", "Tonalidade da ficha", "Profilens nyans", "Оттенок карточки", "Odcień profilu", "프로필 색조")),
            h("div", { style: { marginLeft: "auto", display: "flex", gap: 8 } },
              [["", "#7FA3AD"], ["#D6C4A1", "#D6C4A1"], ["#C64B5C", "#C64B5C"], ["#5C7A5E", "#5C7A5E"]].map(function (tC) {
                var actifT = (champsFiche.teinte || "") === tC[0];
                return h("div", { key: "tt" + tC[1], role: "button", onClick: function () { setChampsFiche(Object.assign({}, champsFiche, { teinte: tC[0] })); }, style: { width: 22, height: 22, borderRadius: "50%", background: tC[1], cursor: "pointer", border: actifT ? "2px solid rgba(255,255,255,0.85)" : "2px solid rgba(255,255,255,0.15)", boxSizing: "border-box" } });
              }))),
          h("div", { style: { display: "flex", gap: 9 } },
            h("input", { value: champsFiche.race, onChange: function (eR) { setChampsFiche(Object.assign({}, champsFiche, { race: eR.target.value })); }, placeholder: T("Race", "Breed", "Raza", "Razza", "品種", "Rasse", "\u0627\u0644\u0633\u0644\u0627\u0644\u0629", "品种", "Ras", "Raça", "Ras", "Порода", "Rasa", "품종"), style: { flex: 1, padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F3EEE4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", marginBottom: 9, boxSizing: "border-box" } }),
            h("input", { value: champsFiche.age, onChange: function (eA) { setChampsFiche(Object.assign({}, champsFiche, { age: eA.target.value })); }, placeholder: T("Âge", "Age", "Edad", "Età", "年齢", "Alter", "\u0627\u0644\u0639\u0645\u0631", "年龄", "Leeftijd", "Idade", "Ålder", "Возраст", "Wiek", "나이"), style: { flex: 1, padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F3EEE4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", marginBottom: 9, boxSizing: "border-box" } })),
          h("input", { value: champsFiche.discipline, onChange: function (eDi) { setChampsFiche(Object.assign({}, champsFiche, { discipline: eDi.target.value })); }, placeholder: T("Discipline", "Discipline", "Disciplina", "Disciplina", "種目", "Disziplin", "\u0627\u0644\u0627\u062e\u062a\u0635\u0627\u0635", "项目", "Discipline", "Modalidade", "Gren", "Дисциплина", "Dyscyplina", "종목"), style: { width: "100%", padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F3EEE4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", marginBottom: 16, boxSizing: "border-box" } }),
          /* (843) GABARIT : laisser la race decider (« Auto »), ou forcer Cheval / Poney (onglet « Tous les poneys », compteurs) */
          h("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", margin: "2px 0 4px" } },
            h("span", { style: { fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A39D92", fontFamily: "'Montserrat',sans-serif", marginInlineEnd: 4 } }, T("Gabarit", "Size", "Tama\u00f1o", "Taglia", "\u4f53\u683c", "Gr\u00f6\u00dfe", "\u0627\u0644\u062d\u062c\u0645", "体型", "Sjabloon", "Porte", "Storlek", "Размер", "Rozmiar", "템플릿")),
            [["", T("Auto (race)", "Auto (breed)", "Auto (raza)", "Auto (razza)", "\u81ea\u52d5\uff08\u54c1\u7a2e\uff09", "Auto (Rasse)", "\u062a\u0644\u0642\u0627\u0626\u064a (\u0627\u0644\u0633\u0644\u0627\u0644\u0629)", "自动（品种）", "Auto (ras)", "Auto (raça)", "Auto (ras)", "Авто (порода)", "Auto (rasa)", "자동 (품종)")], ["cheval", T("Cheval", "Horse", "Caballo", "Cavallo", "\u99ac", "Pferd", "\u062d\u0635\u0627\u0646", "马", "Paard", "Cavalo", "Häst", "Лошадь", "Koń", "말")], ["poney", T("Poney", "Pony", "Poni", "Pony", "\u30dd\u30cb\u30fc", "Pony", "\u0645\u0647\u0631", "小马", "Pony", "Pônei", "Ponny", "Пони", "Kucyk", "포니")]].map(function (gO) {
              var actG = (champsFiche.gabarit || "") === gO[0];
              return h("button", { key: "gb" + (gO[0] || "auto"), type: "button", onClick: function () { setChampsFiche(Object.assign({}, champsFiche, { gabarit: gO[0] })); }, style: { padding: "7px 12px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontFamily: "'Montserrat',sans-serif", fontWeight: actG ? 600 : 500, border: "1px solid " + (actG ? "rgba(214,196,161,0.55)" : "rgba(255,255,255,0.14)"), background: actG ? "linear-gradient(165deg,rgba(55,107,125,0.42),rgba(16,26,29,0.8))" : "transparent", color: actG ? "#F3EEE4" : "#A9B4BA", WebkitAppearance: "none" } }, gO[1]);
            })),
          /* 02/09 — L ECURIE DU CHEVAL. ⚠️ N apparait que si le cavalier a
             PLUSIEURS ecuries : avec une seule, la question n a pas de sens.
             ⚠️ « Aucune » est un CHOIX VALIDE — il remet `club` a vide, donc le
             cheval reparait partout, comme les chevaux d avant la colonne.
             ⚠️ L echec se DIT a l ecran (lecon du .catch() vide du 01/09). */
          (choixClubsFiche.length > 1) ? h("div", { style: { marginBottom: 10 } }, /* 11/09 (23) : écuries de la propriétaire, voir choixClubsFiche */
            h("div", { style: { fontSize: 10.5, letterSpacing: 1.8, color: "#A39D92", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Montserrat',sans-serif" } },
              T("\u00c9curie du cheval", "Horse's stable", "Cuadra del caballo", "Scuderia del cavallo", "\u6240\u5c5e", "Stall des Pferds", "\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u062d\u0635\u0627\u0646", "马的马厩", "Stal van het paard", "Cocheira do cavalo", "Hästens stall", "Конюшня лошади", "Stajnia konia", "말의 마구간")),
            h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } },
              choixClubsFiche.concat([""]).map(function (cl) {
                var actC = String(champsFiche.club || "") === cl;
                return h("div", { key: "cl" + (cl || "__aucune__"), role: "button",
                  onClick: function () { setErreurClub(""); setChampsFiche(Object.assign({}, champsFiche, { club: cl })); },
                  style: { padding: "7px 13px", borderRadius: 999, cursor: "pointer",
                    border: "1px solid " + (actC ? "rgba(217,199,163,0.7)" : "rgba(255,255,255,0.14)"),
                    background: actC ? "rgba(217,199,163,0.14)" : "rgba(255,255,255,0.03)",
                    color: actC ? "#D9C7A3" : "rgba(243,238,228,0.7)",
                    fontSize: 11.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif" } },
                  cl || T("Aucune", "None", "Ninguna", "Nessuna", "\u306a\u3057", "Keine", "\u0644\u0627 \u0634\u064a\u0621", "无", "Geen", "Nenhuma", "Inget", "Нет", "Żadna", "없음"));
              })),
            erreurClub ? h("div", { style: { marginTop: 6, fontSize: 11.5, color: "#FF6B6B", fontFamily: "'Montserrat',sans-serif" } }, erreurClub) : null) : null,
          h("div", { style: { display: "flex", gap: 10 } },
            h("button", { onClick: function () { setEditFiche(false); }, style: { flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "none", color: "#B9C6CC", fontSize: 13.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
            h("button", { onClick: soumettreEditFiche, disabled: busyFiche, style: { flex: 1, padding: "12px", borderRadius: 12, background: "rgba(214,196,161,0.08)", border: "1px solid #D6C4A1", color: "#DCCBAA" /* (1077) plus de bouton plein */, fontSize: 13.5, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, busyFiche ? "…" : T("Enregistrer", "Save", "Guardar", "Salva", "保存", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))
        ) : null)) : null,
    /* 🟥 05/09 (Blandine, capture 00h14) : LA BARRE COEURS / COMMENTAIRES
       ETAIT RECOUVERTE PAR LA BARRE D ONGLETS. Ce calque a beau porter
       zIndex 8800 et la barre d onglets seulement 50, il n etait pas
       detache : son plan restait enferme dans le contexte d empilement de
       la fiche, donc les onglets se dessinaient PAR-DESSUS. La barre du bas
       (coeur, commentaires) tombait exactement dessous — invisible et
       intouchable depuis Photos et depuis Medias. D ou les notifications
       « a commente » sans aucun moyen d ouvrir les commentaires.
       Detache vers document.body, comme la visionneuse des albums qui,
       elle, l etait deja et n a jamais eu le probleme. Verifie avant :
       .souvVoile / .souvVue sont des selecteurs SIMPLES (sans parent) et
       les variables --cm-ease vivent sur :root — les deux survivent au
       deplacement. */
    visionneuse ? ((typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; })(h("div", { onClick: function (eF) { /* 05/09 : sur une VIDEO, seule la croix ferme (cf. visionneuse d album). */ if (visionneuse && typeof estUrlVideo === "function" && estUrlVideo(visionneuse)) return; fermerVisionneuse(eF); }, "data-noswipe": "true", className: "souvVoile" + (visFerme ? " souvQuitte" : ""), /* \ud83d\udfe5 05/09 (Blandine : « on dirait qu on ne peut pas balayer d une photo a l autre sur la page Photos »). Le balayage vivait UNIQUEMENT sur l image (PhotoZoomHype pose ses onTouch sur le <img>). Une photo en portrait laisse de larges bandes noires a gauche et a droite : un balayage qui part de la, ne fait rien. La visionneuse des albums, elle, ecoute sur tout l ecran. Meme chose ici : le voile ecoute aussi, et NE reagit PAS si le toucher est parti de l image (PhotoZoomHype s en charge deja, sinon on avancerait de deux). */ onTouchStart: function (eT) { try { var t0 = eT.touches && eT.touches[0]; if (!t0) return; var cibleT = eT.target; if (cibleT && cibleT.tagName === "IMG") { window.__visSwipe = null; return; } window.__visSwipe = { x: t0.clientX, y: t0.clientY }; } catch (eT0) { } }, onTouchEnd: function (eT) { try { var d0 = window.__visSwipe; window.__visSwipe = null; if (!d0) return; var t1 = eT.changedTouches && eT.changedTouches[0]; if (!t1) return; var dxS = t1.clientX - d0.x, dyS = Math.abs(t1.clientY - d0.y); if (Math.abs(dxS) > 50 && dyS < 70) { var lS = (window.__visListe || []).slice(); if (lS.length < 2) return; var iS = lS.indexOf(visionneuse); if (iS < 0) return; var pS = dxS < 0 ? 1 : -1; var nS = ((iS + pS) % lS.length + lS.length) % lS.length; setVisFerme(false); setVisionneuse(lS[nS]); } } catch (eT1) { } }, ref: hypeRefBloquerPincement, style: { touchAction: "manipulation", position: "fixed", inset: 0, zIndex: 8800, background: (visionneuse && typeof estUrlVideo === "function" && estUrlVideo(visionneuse)) ? "#000" : "rgba(4,6,9,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: (visionneuse && typeof estUrlVideo === "function" && estUrlVideo(visionneuse)) ? 0 : 10 } },
      h("div", { className: "souvGrandHalo" }),
      estUrlVideo(visionneuse)
        ? h(PhotoZoomHype, { tag: "video", src: visionneuse, mp4: (typeof hypeMuxMp4 === "function") ? hypeMuxMp4(visionneuse) : null, className: "souvVue" + (visFerme ? " souvQuitte" : ""), onFermer: fermerVisionneuse, onAller: function (pasV) { try { var lZ = (window.__visListe || []).slice(); if (lZ.length < 2) return; var iZ = lZ.indexOf(visionneuse); if (iZ < 0) return; var nZ = ((iZ + pasV) % lZ.length + lZ.length) % lZ.length; setVisFerme(false); setVisionneuse(lZ[nZ]); } catch (eZ) { } } })
        : h(PhotoZoomHype, { src: (voirOriginalDebug && estCompteFeinnHype(moi)) ? visionneuse : ((typeof grandeImageHype === "function") ? grandeImageHype(visionneuse, 2048) : visionneuse), original: visionneuse, className: "souvVue" + (visFerme ? " souvQuitte" : ""), onFermer: fermerVisionneuse, onAller: function (pasV) { try { var lZ = (window.__visListe || []).slice(); if (lZ.length < 2) return; var iZ = lZ.indexOf(visionneuse); if (iZ < 0) return; var nZ = ((iZ + pasV) % lZ.length + lZ.length) % lZ.length; setVisFerme(false); setVisionneuse(lZ[nZ]); } catch (eZ) { } } }),
      /* 28/08 : la barre like/commentaires s'affiche desormais aussi sur les videos (photo_likes/photo_comments fonctionnent par URL, video ou photo). */
      h("div", { onClick: function (eB) { eB.stopPropagation(); }, style: { position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 5, padding: "12px 16px calc(16px + env(safe-area-inset-bottom))", background: "linear-gradient(180deg, rgba(4,6,9,0), rgba(4,6,9,0.92) 55%)" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } }, /* 09/09 (soir) : repli en cas de 3 boutons trop larges pour un ecran etroit -- plus jamais de debordement hors ecran, quel que soit le texte */
          h("button", { onClick: basculerLk, style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 999, border: "1px solid " + (lkV.jaiLike ? "rgba(255,120,150,0.7)" : "rgba(255,255,255,0.2)"), background: lkV.jaiLike ? "rgba(255,120,150,0.16)" : "rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 13.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, (lkV.jaiLike ? "\u2764\ufe0f" : "\u2661"), String(lkV.count || 0)),
          h("button", { onClick: function () { setCmPanneau(!cmPanneau); }, style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 13.5, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, "\ud83d\udcac", String((cmV || []).length))),
          h("button", { onClick: function (eY) {
        eY.stopPropagation();
        /* 27/07 : ce bouton n'avait AUCUNE verification — n'importe quel cavalier connecte pouvait
           mettre en vedette la photo de n'importe quel autre cavalier, sur n'importe quelle ecurie.
           Meme regle desormais que le bouton supprimer juste au-dessus : proprietaire de la photo,
           ou moderateur. */
        var okVedette = peutGererPhotoOuverte();
        if (!okVedette) { setToast(T("Seul le propriétaire peut mettre cette photo en vedette", "Only the owner can feature this photo", "Solo el propietario puede destacar esta foto", "Solo il proprietario può mettere in evidenza questa foto", "所有者のみがこの写真をお気に入りに追加できます", "Nur der Eigentümer kann dieses Foto hervorheben", "\u0648\u062d\u062f\u0647 \u0627\u0644\u0645\u0627\u0644\u0643 \u064a\u0645\u0643\u0646\u0647 \u062a\u0645\u064a\u064a\u0632 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629", "只有主人才能把这张照片设为精选", "Alleen de eigenaar kan deze foto uitlichten", "Somente o proprietário pode colocar esta foto em destaque", "Bara ägaren kan lyfta fram det här fotot", "Только владелец может сделать это фото избранным", "Tylko właściciel może wyróżnić to zdjęcie", "소유자만 이 사진을 대표로 설정할 수 있어요")); setTimeout(function () { setToast(null); }, 2000); return; }
        basculerVedette(visionneuse);
      }, style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 999, border: "1px solid " + tA(0.6) + "", background: (vedettes || []).indexOf(visionneuse) >= 0 ? "" + tA(0.9) + "" : "rgba(255,255,255,0.06)", color: (vedettes || []).indexOf(visionneuse) >= 0 ? "#04252a" : "#F3EEE4", fontSize: 13.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", whiteSpace: "nowrap" } }, "★ " + ((vedettes || []).indexOf(visionneuse) >= 0 ? T("En vedette", "Featured", "Destacada", "In evidenza", "お気に入り", "Hervorgehoben", "\u0645\u0645\u064a\u0632\u0629", "精选", "Uitgelicht", "Em destaque", "Framhävd", "Избранное", "Wyróżnione", "대표") : T("Mettre en vedette", "Feature this photo", "Destacar", "Metti in evidenza", "お気に入りに追加", "Hervorheben", "\u062a\u0645\u064a\u064a\u0632", "设为精选", "Uitgelicht maken", "Destacar", "Gör till favorit", "Выделить", "Ustaw jako wyróżnione", "대표로 설정"))),
        cmPanneau ? h("div", { style: { marginTop: 10, maxHeight: "34svh", overflowY: "auto" } },
          (cmV === null) ? h("div", { style: { fontSize: 12, color: "rgba(243,238,228,0.5)" } }, "\u2026")
            : ((cmV.length === 0) ? h("div", { style: { fontSize: 12, color: "rgba(243,238,228,0.5)" } }, T("Aucun commentaire", "No comments", "Sin comentarios", "Nessun commento", "\u30b3\u30e1\u30f3\u30c8\u306a\u3057", "Keine Kommentare", "\u0644\u0627 \u062a\u0648\u062c\u062f \u062a\u0639\u0644\u064a\u0642\u0627\u062a", "暂无评论", "Geen reacties", "Nenhum comentário", "Inga kommentarer", "Нет комментариев", "Brak komentarzy", "댓글이 없어요"))
              : cmV.map(function (cmm, iC) {
                  return h("div", { key: "cm" + iC, style: { padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" } },
                    h("div", { style: { fontSize: 10.5, color: "#8ADFEF", letterSpacing: "0.06em" } }, (function () {
                      /* 13/09 (59) — « CAVALIER » A LA PLACE DU PRENOM. Cette liste lisait `cmm.auteur`,
                         un nom qui n'existe nulle part : `listerCommentairesPhoto` range le profil de
                         l'autrice sous `profil` (elle fait la jointure elle-meme, par lots). Le repli
                         « Cavalier » s'affichait donc TOUJOURS, pour tout le monde. La visionneuse d'album,
                         qui lit bien `c.profil`, affichait le bon prenom au meme moment — c'est ce qui a
                         mis la puce a l'oreille. Rien a changer en base. `cmm.auteur` est conserve en
                         premier repli au cas ou un autre appelant fournirait cette forme. */
                      var pA = cmm.profil || cmm.auteur || null;
                      var nomA = (pA && (pA.pseudo || pA.prenom)) || cmm.pseudo || T("Cavaliere", "Rider", "Jinete", "Cavaliera", "\u30e9\u30a4\u30c0\u30fc", "Reiterin", "\u0641\u0627\u0631\u0633\u0629", "骑手", "Ruiter", "Amazona", "Ryttare", "Всадница", "Jeździec", "기수");
                      /* 13/09 (61) : meme mention que sur les messages du fil (build 74) */
                      return cmm.modifie_le ? (nomA + " \u00b7 " + T("modifie", "edited", "editado", "modificato", "\u7de8\u96c6\u6e08", "bearbeitet", "\u0645\u0639\u062f\u0644", "编辑", "bewerkt", "editado", "redigerad", "изменено", "edytowano", "수정됨")) : nomA;
                    })()),
                    (cmEdit === cmm.id)
                      ? h("div", { style: { marginTop: 4 } },
                          h("textarea", { value: cmEditTexte, ref: refEditCmCh, onKeyUp: function (eK) { try { mentionsCh.surSaisie(eK.target.value, eK.target.selectionStart); } catch (eKm) { } }, onChange: function (eT) { setCmEditTexte(eT.target.value); try { mentionsCh.surSaisie(eT.target.value, eT.target.selectionStart); } catch (eSm) { } /* 20/10 : @ en modifiant */ }, onBlur: function () { if (typeof hypeRecalerApresClavier === "function") hypeRecalerApresClavier(); }, rows: 3, maxLength: 500, style: { width: "100%", boxSizing: "border-box", padding: "9px 11px", borderRadius: 11, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 16 /* 13/09 (61) : 16 px, sinon iOS zoome toute la page */, fontFamily: "'Montserrat',sans-serif", lineHeight: 1.45, resize: "vertical" } }),
                          (cmEdit === cmm.id) ? mentionsCh.liste(cmEditTexte, setCmEditTexte, refEditCmCh) : null,
                          h("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 5 } },
                            h("button", { disabled: cmEditEnCours, onClick: async function (eEn) {
                                eEn.stopPropagation();
                                var tEn = (cmEditTexte || "").trim();
                                if (!tEn) return;
                                setCmEditEnCours(true);
                                var rEn = await modifierCommentairePhoto(cmm.id, tEn);
                                try { if (rEn && rEn.ok) await mentionsCh.apresEnvoi(cmm.id, tEn); } catch (eMe) { }   /* 20/10 : identifiees et prevenues */
                                setCmEditEnCours(false);
                                if (rEn && rEn.refuse) { setToast(T("Tu ne peux modifier que tes propres commentaires.", "You can only edit your own comments.", "Solo puedes editar tus propios comentarios.", "Puoi modificare solo i tuoi commenti.", "\u81ea\u5206\u306e\u30b3\u30e1\u30f3\u30c8\u306e\u307f\u7de8\u96c6\u3067\u304d\u307e\u3059\u3002", "Du kannst nur eigene Kommentare bearbeiten.", "\u0644\u0627 \u064a\u0645\u0643\u0646\u0643 \u062a\u0639\u062f\u064a\u0644 \u0625\u0644\u0627 \u062a\u0639\u0644\u064a\u0642\u0627\u062a\u0643.", "你只能编辑自己的评论。", "Je kunt alleen je eigen reacties bewerken.", "Você só pode editar seus próprios comentários.", "Du kan bara redigera dina egna kommentarer.", "Ты можешь изменять только свои комментарии.", "Możesz edytować tylko własne komentarze.", "내 댓글만 수정할 수 있어요.")); return; }
                                if (rEn && rEn.error) { setToast(T("La modification n'a pas pu etre enregistree.", "The change could not be saved.", "No se pudo guardar el cambio.", "Impossibile salvare la modifica.", "\u5909\u66f4\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Die Aenderung konnte nicht gespeichert werden.", "\u062a\u0639\u0630\u0631 \u062d\u0641\u0638 \u0627\u0644\u062a\u0639\u062f\u064a\u0644.", "修改未能保存。", "De wijziging kon niet worden opgeslagen.", "Não foi possível salvar a alteração.", "Ändringen kunde inte sparas.", "Не удалось сохранить изменение.", "Nie udało się zapisać zmiany.", "수정 내용을 저장하지 못했어요.")); return; }
                                setCmV(function (lM) { return (lM || []).map(function (xM) { return (xM.id === cmm.id) ? Object.assign({}, xM, { texte: rEn.texte, modifie_le: new Date().toISOString() }) : xM; }); });
                                setCmEdit(null); setCmEditTexte("");
                              }, style: { padding: "8px 14px", borderRadius: 11, border: "1px solid " + tA(0.5), background: tA(0.14), color: "#CFF6FA", fontSize: 12, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", minHeight: 40, opacity: cmEditEnCours ? 0.5 : 1 } },
                              cmEditEnCours ? "\u2026" : T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")),
                            h("button", { onClick: function (eAn) { eAn.stopPropagation(); setCmEdit(null); setCmEditTexte(""); }, style: { background: "none", border: "none", color: "#A39D92", fontSize: 11.5, cursor: "pointer", minHeight: 40, fontFamily: "'Montserrat',sans-serif" } },
                              T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"))))
                      : h("div", { style: { fontSize: 13, color: "rgba(243,238,228,0.9)", marginTop: 2, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, cmm.texte || cmm.contenu || ""),
                    /* 13/09 (60) — SUPPRIMER SON PROPRE COMMENTAIRE DEPUIS CETTE VISIONNEUSE (point b
                       des trois points du matin). Le bouton n'existait QUE dans la visionneuse d'album :
                       un commentaire ecrit depuis la fiche ne pouvait plus etre retire du tout. Meme
                       regle que partout ailleurs : son autrice, ou une moderatrice (« je dois pouvoir
                       tout retirer partout », 02/09). La fonction supprimerCommentairePhoto existe
                       depuis l'origine, rien a ajouter en base ; un echec est DIT, jamais silencieux. */
                    /* 13/09 (63) — LES PERSONNES ET CHEVAUX IDENTIFIES, sous le commentaire. */
                    ((tagsCm[String(cmm.id)] || []).length)
                      ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 } },
                          (tagsCm[String(cmm.id)] || []).map(function (tg, iTg) {
                            return h("span", { key: "tg" + iTg, style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10.5, fontWeight: 700, color: "#CFF6FA", background: tA(0.14), border: "1px solid " + tA(0.4), borderRadius: 999, padding: "3px 9px" } },
                              (tg.type === "cheval" ? "\ud83d\udc0e " : "\ud83c\udff7\ufe0f ") + (tg.nom || "\u2014"));
                          }))
                      : null,
                    /* 13/09 (63) — IDENTIFIER : sous SON commentaire seulement. La liste s'ouvre EN
                       LIGNE (jamais un panneau flottant) : rien a caler contre la barre du bas,
                       rien qui puisse pousser un bouton sous le doigt (defauts payes les 06 et 12/09). */
                    (function () {
                      var estMienId = !!(moi && cmm.user_id && cmm.user_id === moi.id);
                      if (!estMienId || cmEdit === cmm.id) return null;
                      if (tagCmOuvert !== cmm.id) {
                        return h("button", { onClick: function (eTo) { eTo.stopPropagation(); setTagCmOuvert(cmm.id); if (!tagCibles) chargerTagCibles(); }, style: { marginTop: 4, background: "none", border: "none", color: "#A39D92", fontSize: 11, cursor: "pointer", padding: "4px 0", minHeight: 32, fontFamily: "'Montserrat',sans-serif" } },
                          "\ud83c\udff7\ufe0f " + T("Identifier", "Tag", "Etiquetar", "Tagga", "\u30bf\u30b0", "Identifizieren", "\u0625\u0634\u0627\u0631\u0629", "标记人物", "Taggen", "Marcar", "Tagga", "Отметить", "Oznacz", "태그하기"));
                      }
                      var dejaId = {};
                      (tagsCm[String(cmm.id)] || []).forEach(function (tg) { dejaId[tg.type + ":" + String(tg.cibleId)] = true; });
                      var candId = [];
                      try {
                        ((tagCibles && tagCibles.amis) || []).forEach(function (aI) { candId.push({ type: "cavalier", id: aI.id, nom: aI.nom }); });
                        ((tagCibles && tagCibles.chevaux) || []).forEach(function (cI) { candId.push({ type: "cheval", id: cI.id, nom: cI.nom }); });
                      } catch (eCd) { }
                      candId = candId.filter(function (xC) { return xC.nom && !dejaId[xC.type + ":" + String(xC.id)]; }).slice(0, 40);
                      return h("div", { style: { marginTop: 6, padding: "8px 9px", borderRadius: 11, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" } },
                        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#A39D92", marginBottom: 6, lineHeight: 1.5 } },
                          T("Touche qui tu veux identifier. La personne recoit une notification.", "Tap who you want to tag. They get a notification.", "Toca a quien quieres etiquetar. Recibira una notificacion.", "Tocca chi vuoi taggare. Ricevera una notifica.", "\u30bf\u30b0\u3059\u308b\u76f8\u624b\u3092\u30bf\u30c3\u30d7\u3002", "Tippe an, wen du markieren willst. Die Person wird benachrichtigt.", "\u0627\u0644\u0645\u0633\u064a \u0645\u0646 \u062a\u0631\u064a\u062f\u064a\u0646 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0625\u0644\u064a\u0647. \u0633\u064a\u062a\u0644\u0642\u0649 \u0627\u0644\u0634\u062e\u0635 \u0625\u0634\u0639\u0627\u0631\u0627.", "点选你想标记的对象。对方会收到通知。", "Tik op wie je wilt taggen. Die persoon krijgt een melding.", "Toque em quem você quer marcar. A pessoa recebe uma notificação.", "Tryck på den du vill tagga. Personen får en notis.", "Нажми на того, кого хочешь отметить. Человек получит уведомление.", "Dotknij osoby, którą chcesz oznaczyć. Dostanie powiadomienie.", "태그할 사람을 터치하세요. 그 사람에게 알림이 가요.")),
                        (tagCibles === null)
                          ? h("div", { style: { fontSize: 11, color: "#7B848C" } }, "\u2026")
                          : (candId.length === 0
                              ? h("div", { style: { fontSize: 11, color: "#7B848C", lineHeight: 1.5 } }, T("Personne de plus a identifier ici.", "Nobody else to tag here.", "Nadie mas para etiquetar.", "Nessun altro da taggare.", "\u4ed6\u306b\u3044\u307e\u305b\u3093\u3002", "Niemand sonst zum Markieren.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u062d\u062f \u0622\u062e\u0631 \u0644\u0644\u0625\u0634\u0627\u0631\u0629 \u0625\u0644\u064a\u0647 \u0647\u0646\u0627.", "这里没有更多可以标记的人了。", "Niemand meer om hier te taggen.", "Ninguém mais para marcar aqui.", "Ingen mer att tagga här.", "Здесь больше некого отмечать.", "Nie ma tu nikogo więcej do oznaczenia.", "여기에 더 태그할 사람이 없어요."))
                              : h("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
                                  candId.map(function (xI, iI) {
                                    return h("button", { key: "ci" + iI, onClick: async function (eCi) {
                                        eCi.stopPropagation();
                                        var rI = await hypeIdentifierCommentaire(cmm.id, xI);
                                        if (rI && rI.error) { setToast(T("Identification impossible.", "Tagging failed.", "No se pudo etiquetar.", "Impossibile taggare.", "\u30bf\u30b0\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Markieren nicht moeglich.", "\u062a\u0639\u0630\u0631\u062a \u0627\u0644\u0625\u0634\u0627\u0631\u0629.", "无法标记。", "Taggen mislukt.", "Marcação impossível.", "Det gick inte att tagga.", "Не удалось отметить.", "Nie można oznaczyć.", "태그할 수 없어요.")); return; }
                                        setTagsCm(function (mI) {
                                          var nI = Object.assign({}, mI);
                                          nI[String(cmm.id)] = (nI[String(cmm.id)] || []).concat([{ id: null, type: xI.type, cibleId: xI.id, nom: xI.nom }]);
                                          return nI;
                                        });
                                      }, style: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, color: "#DCE6EC", fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, padding: "7px 11px", minHeight: 36, cursor: "pointer" } },
                                      (xI.type === "cheval" ? "\ud83d\udc0e " : "") + xI.nom);
                                  }))),
                        h("button", { onClick: function (eFi) { eFi.stopPropagation(); setTagCmOuvert(null); }, style: { marginTop: 7, background: "none", border: "none", color: "#A39D92", fontSize: 11, cursor: "pointer", minHeight: 36, fontFamily: "'Montserrat',sans-serif" } },
                          T("Termine", "Done", "Hecho", "Fatto", "\u5b8c\u4e86", "Fertig", "\u062a\u0645", "完成", "Klaar", "Concluído", "Klart", "Готово", "Gotowe", "완료")));
                    })(),
                    (function () {
                      var estMienCm = !!(moi && cmm.user_id && cmm.user_id === moi.id);
                      var estModoCm = (typeof estModerateurHype === "function") && estModerateurHype(moi);
                      if (!estMienCm && !estModoCm) return null;
                      if (cmEdit === cmm.id) return null;                      /* 13/09 (61) : pendant la modification, Enregistrer/Annuler suffisent */
                      return h("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                        /* 13/09 (61) — MODIFIER : seulement SON commentaire. Une moderatrice peut
                           tout supprimer (regle du 02/09) mais reecrire les mots d'une autre est
                           un geste different : la base l'autorise, l'ecran ne le propose pas. */
                        estMienCm ? h("button", { onClick: function (eMo) { eMo.stopPropagation(); setCmEdit(cmm.id); setCmEditTexte(cmm.texte || cmm.contenu || ""); }, style: { marginTop: 4, background: "none", border: "none", color: "#8ADFEF", fontSize: 11, cursor: "pointer", padding: "4px 0", minHeight: 32, fontFamily: "'Montserrat',sans-serif" } },
                            T("Modifier", "Edit", "Editar", "Modifica", "\u7de8\u96c6", "Bearbeiten", "\u062a\u0639\u062f\u064a\u0644", "修改", "Bewerken", "Editar", "Redigera", "Изменить", "Edytuj", "수정")) : null,
                        h("button", { onClick: async function (eSc) {
                          eSc.stopPropagation();
                          if (!cmm.id) return;
                          if (cmSuppr === cmm.id) return;
                          setCmSuppr(cmm.id);
                          var rSc = await supprimerCommentairePhoto(cmm.id);
                          setCmSuppr(null);
                          if (rSc && rSc.error) {
                            setToast(T("Ce commentaire n'a pas pu etre supprime.", "This comment could not be deleted.", "No se pudo eliminar este comentario.", "Impossibile eliminare questo commento.", "\u3053\u306e\u30b3\u30e1\u30f3\u30c8\u3092\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Dieser Kommentar konnte nicht geloescht werden.", "\u062a\u0639\u0630\u0631 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062a\u0639\u0644\u064a\u0642.", "这条评论无法删除。", "Deze reactie kon niet worden verwijderd.", "Não foi possível excluir este comentário.", "Kommentaren kunde inte tas bort.", "Не удалось удалить этот комментарий.", "Nie udało się usunąć tego komentarza.", "이 댓글을 삭제하지 못했어요."));
                            return;
                          }
                          setCmV(function (lC) { return (lC || []).filter(function (xC) { return xC.id !== cmm.id; }); });
                        }, disabled: cmSuppr === cmm.id, style: { marginTop: 4, background: "none", border: "none", color: "rgba(226,138,146,0.85)", fontSize: 11, cursor: "pointer", padding: "4px 0", minHeight: 32, fontFamily: "'Montserrat',sans-serif", opacity: (cmSuppr === cmm.id) ? 0.5 : 1 } },
                        (cmSuppr === cmm.id) ? "\u2026" : T("Supprimer", "Delete", "Eliminar", "Elimina", "\u524a\u9664", "Loeschen", "\u062d\u0630\u0641", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제")));
                    })());
                }))) : null,
        cmPanneau ? h("div", { style: { marginTop: 10 } }, (cmEdit == null ? mentionsCh.liste(cmTexte, setCmTexte, refChampCmCh) : null)) : null /* 19/10 (soir) LOT 3 : la liste du @ au-dessus du champ */,
        cmPanneau ? h("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
          h("input", { value: cmTexte, ref: refChampCmCh, onBlur: function () { if (typeof hypeRecalerApresClavier === "function") hypeRecalerApresClavier(); }, onKeyUp: function (eK) { try { mentionsCh.surSaisie(eK.target.value, eK.target.selectionStart); } catch (eKm) { } }, onChange: function (eI) { setCmTexte(eI.target.value); try { mentionsCh.surSaisie(eI.target.value, eI.target.selectionStart); } catch (eSm) { } }, placeholder: T("Ton commentaire\u2026", "Your comment\u2026", "Tu comentario\u2026", "Il tuo commento\u2026", "\u30b3\u30e1\u30f3\u30c8\u2026", "Dein Kommentar\u2026", "\u062a\u0639\u0644\u064a\u0642\u0643\u2026", "你的评论……", "Jouw reactie…", "Seu comentário…", "Din kommentar…", "Твой комментарий…", "Twój komentarz…", "댓글을 남겨 보세요…"), maxLength: 300, style: { flex: 1, minWidth: 0, padding: "11px 13px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: "#F3EEE4", fontSize: 16 /* 08/09 : idem */ } }),
          h("button", { onClick: envoyerCm, style: { padding: "11px 16px", borderRadius: 13, border: "1px solid " + tA(0.5), background: tA(0.14), color: "#CFF6FA", fontSize: 13.5, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Envoyer", "Send", "Enviar", "Invia", "\u9001\u4fe1", "Senden", "\u0625\u0631\u0633\u0627\u0644", "发送", "Versturen", "Enviar", "Skicka", "Отправить", "Wyślij", "보내기"))) : null),
      h("button", { onClick: function (eX) { eX.stopPropagation(); fermerVisionneuse(); }, style: { position: "absolute", top: "calc(16px + env(safe-area-inset-top))", right: 16, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", color: "#F3EEE4", fontSize: 16, zIndex: 3 } }, "✕"),
          h("button", { onClick: function (eI) { eI.stopPropagation(); ouvrirTag(visionneuse); }, style: { position: "absolute", top: "calc(16px + env(safe-area-inset-top))", left: 16, zIndex: 3, display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px 8px 11px", borderRadius: 999, border: "1px solid rgba(45,212,222,0.55)", background: "rgba(10,40,46,0.55)", color: "#CFF6FA", fontSize: 12.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", backdropFilter: "blur(6px)" } }, "\ud83c\udff7\ufe0f ", T("Identifier", "Tag", "Etiquetar", "Tagga", "\u30bf\u30b0", "Identifizieren", "\u0625\u0634\u0627\u0631\u0629", "标记人物", "Taggen", "Marcar", "Tagga", "Отметить", "Oznacz", "태그하기")) /* 30/07 : Identifier revient dans la visionneuse (demande Blandine) */,
      (estCompteFeinnHype(moi) && !estUrlVideo(visionneuse)) ? h("button", { onClick: function (eAB) { eAB.stopPropagation(); setVoirOriginalDebug(function (v) { return !v; }); }, style: { position: "absolute", top: "calc(64px + env(safe-area-inset-top))", left: 16, zIndex: 3, display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px 8px 11px", borderRadius: 999, border: "1px solid " + (voirOriginalDebug ? "rgba(255,209,102,0.75)" : "rgba(255,255,255,0.3)"), background: voirOriginalDebug ? "rgba(60,45,10,0.7)" : "rgba(10,10,10,0.5)", color: voirOriginalDebug ? "#FFD166" : "#CFCFCF", fontSize: 11.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: "pointer", backdropFilter: "blur(6px)" } }, voirOriginalDebug ? "\ud83d\udd0d Brut" : hypeT7("\ud83d\udd0d Transform\u00e9", "\ud83d\udd0d Enhanced", "\ud83d\udd0d Transformada", "\ud83d\udd0d Trasformata", "\ud83d\udd0d \u52a0\u5de5\u6e08\u307f", "\ud83d\udd0d Bearbeitet", "\ud83d\udd0d \u0645\u0639\u062f\u0644\u0629", "🔍 已转换", "🔍 Bewerkt", "🔍 Transformado", "🔍 Förbättrad", "🔍 Преобразовано", "🔍 Przetworzone", "🔍 변환됨")) : null /* 10/09 test A/B temporaire, Blandine uniquement */,
      (function () {
        var lV = []; try { lV = (window.__visListe || []).slice(); } catch (eN0) { }
        if (lV.length < 2) return null;
        var ixV = lV.indexOf(visionneuse);
        if (ixV < 0) return null;
        function allerV(pas) { var nx = ((ixV + pas) % lV.length + lV.length) % lV.length; setVisFerme(false); setVisionneuse(lV[nx]); }
        var stF = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(7,8,10,0.55)", border: "1px solid rgba(255,255,255,0.3)", color: "#F3EEE4", fontSize: 20, cursor: "pointer", zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 };
        return h(React.Fragment, null,
          h("button", { onClick: function (eN1) { eN1.stopPropagation(); allerV(-1); }, "aria-label": hypeT7("Pr\u00e9c\u00e9dent", "Previous", "Anterior", "Precedente", "\u524d\u3078", "Zur\u00fcck", "\u0627\u0644\u0633\u0627\u0628\u0642", "上一个", "Vorige", "Anterior", "Föregående", "Предыдущий", "Poprzedni", "이전"), style: Object.assign({}, stF, { left: 10 }) }, "\u2039"),
          h("button", { onClick: function (eN2) { eN2.stopPropagation(); allerV(1); }, "aria-label": hypeT7("Suivant", "Next", "Siguiente", "Successivo", "\u6b21\u3078", "Weiter", "\u0627\u0644\u062a\u0627\u0644\u064a", "下一步", "Volgende", "Próximo", "Nästa", "Далее", "Dalej", "다음"), style: Object.assign({}, stF, { right: 10 }) }, "\u203a"),
          null, /* 02/08 : calque de balayage retire — repris par PhotoZoomHype, qui compte les doigts */
          h("div", { style: { position: "absolute", top: "calc(22px + env(safe-area-inset-top))", left: "50%", transform: "translateX(-50%)", fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: "0.12em", color: "rgba(243,238,228,0.75)", background: "rgba(7,8,10,0.45)", padding: "5px 12px", borderRadius: 999, zIndex: 4 } }, (ixV + 1) + " / " + lV.length));
      })(),
      peutGererPhotoOuverte()
        ? h("button", { onClick: function (eS) { eS.stopPropagation(); if (!confSuppr) { setConfSuppr(true); return; } supprimerPhotoOuverte(); }, "aria-label": T("Supprimer", "Delete", "Eliminar", "Elimina", "\u524a\u9664", "L\u00f6schen", "\u062d\u0630\u0641", "删除", "Verwijderen", "Excluir", "Ta bort", "Удалить", "Usuń", "삭제"), style: { /* 🟥 05/09 : LA POUBELLE ETAIT EXACTEMENT SUR « IDENTIFIER » — meme top, meme left, meme plan. Dessinee apres, elle le recouvrait : sur ses propres photos, Blandine ne pouvait pas identifier, le bouton etait dessous. Deplacee a DROITE, a cote de la croix de fermeture (croix : right 16, largeur 40 ; la poubelle se pose a right 66). En confirmation elle s allonge vers la gauche, sans jamais repasser sur Identifier. */ position: "absolute", top: "calc(16px + env(safe-area-inset-top))", right: 66, height: 40, minWidth: 40, padding: confSuppr ? "0 16px" : 0, borderRadius: confSuppr ? 999 : "50%", background: confSuppr ? "rgba(178,44,54,0.92)" : "rgba(7,8,10,0.6)", border: "1px solid " + (confSuppr ? "rgba(255,120,128,0.9)" : "rgba(255,255,255,0.25)"), color: "#F6E9EA", fontSize: confSuppr ? 12.5 : 15, fontWeight: 700, zIndex: 3, whiteSpace: "nowrap", transition: "all .25s ease" } }, confSuppr ? T("Confirmer la suppression", "Confirm deletion", "Confirmar eliminación", "Conferma eliminazione", "削除を確認", "Löschen bestätigen", "\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u0630\u0641", "确认删除", "Verwijderen bevestigen", "Confirmar a exclusão", "Bekräfta borttagningen", "Подтвердить удаление", "Potwierdź usunięcie", "삭제 확인") : "🗑")
        : null,
      ), document.body) : null,
    tagOuvert ? ((typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; })(h("div", { onClick: function () { setTagOuvert(null); }, style: { position: "fixed", inset: 0, zIndex: 9200, background: "rgba(4,6,9,0.82)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "100%", maxWidth: 560, maxHeight: "80vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.4) + "", borderBottom: "none", background: "linear-gradient(180deg, rgba(12,18,24,0.99), rgba(7,10,13,1))", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.4, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Identifier dans la photo", "Tag in photo", "Etiquetar", "Tagga nella foto", "\u5199\u771f\u306b\u30bf\u30b0", "Im Foto identifizieren", "\u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0641\u064a \u0627\u0644\u0635\u0648\u0631\u0629", "在照片中标记", "Taggen in de foto", "Marcar na foto", "Tagga i fotot", "Отметить на фото", "Oznacz na zdjęciu", "사진에 태그하기")),
        h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#A39D92", textAlign: "center", marginBottom: 14, lineHeight: 1.5 } }, T("L'\u00e9curie l'ajoute directement. Un cheval ou un cavalier re\u00e7oit une proposition \u00e0 accepter.", "Stable added directly; horses and riders get a request.", "", "", "", "Der Stall fügt es direkt hinzu. Ein Pferd oder ein Reiter erhält einen Vorschlag zur Annahme.", "\u064a\u0636\u064a\u0641\u0647\u0627 \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0645\u0628\u0627\u0634\u0631\u0629. \u064a\u062a\u0644\u0642\u0649 \u0627\u0644\u062d\u0635\u0627\u0646 \u0623\u0648 \u0627\u0644\u0641\u0627\u0631\u0633 \u0627\u0642\u062a\u0631\u0627\u062d\u0627 \u0644\u0644\u0642\u0628\u0648\u0644.", "马厩会直接添加。马或骑手会收到需要接受的提议。", "De stal wordt direct toegevoegd. Een paard of een ruiter krijgt een verzoek dat moet worden geaccepteerd.", "A cocheira é adicionada diretamente. Um cavalo ou um cavaleiro recebe uma sugestão para aceitar.", "Stallet läggs till direkt. En häst eller en ryttare får ett förslag att godkänna.", "Конюшня добавляет сразу. Лошадь или всадник получает предложение, которое нужно принять.", "Stajnia dodaje od razu. Koń lub jeździec dostaje propozycję do zaakceptowania.", "마구간은 바로 추가돼요. 말이나 기수는 수락해야 하는 제안을 받아요.")),
        (tagCibles === null) ? h("div", { style: { textAlign: "center", color: "#A39D92", fontSize: 12, padding: "16px 0" } }, "\u2026")
          : h("div", null,
            (tagCibles.ecuries && tagCibles.ecuries.length) ? h("div", { style: { marginBottom: 14 } },
              h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: tA(0.9), fontWeight: 700, marginBottom: 8 } }, T("\u00c9curies", "Stables", "Establos", "Scuderie", "\u99ac\u5c4b", "Ställe", "\u0627\u0644\u0625\u0633\u0637\u0628\u0644\u0627\u062a", "马厩", "Stallen", "Cocheiras", "Stall", "Конюшни", "Stajnie", "마구간")),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, tagCibles.ecuries.map(function (e, iE) {
                return h("button", { key: "e" + iE, onClick: function () { poserTag("ecurie", e.id, e.nom); }, style: { padding: "9px 14px", borderRadius: 999, border: "1px solid " + tA(0.5) + "", background: tA(0.08), color: "#F3EEE4", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, "\ud83c\udfe0 " + e.nom);
              }))) : null,
            (tagCibles.chevaux && tagCibles.chevaux.length) ? h("div", { style: { marginBottom: 14 } },
              h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: tA(0.9), fontWeight: 700, marginBottom: 8 } }, T("Chevaux", "Horses", "Caballos", "Cavalli", "\u99ac", "Pferde", "\u0627\u0644\u062e\u064a\u0648\u0644", "马匹", "Paarden", "Cavalos", "Hästar", "Лошади", "Konie", "말")),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, tagCibles.chevaux.slice(0, 30).map(function (c, iC) {
                return h("button", { key: "c" + iC, onClick: function () { poserTag("cheval", c.id, c.nom); }, style: { padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)", color: "#F3EEE4", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, "\ud83d\udc0e " + c.nom);
              }))) : null,
            (tagCibles.amis && tagCibles.amis.length) ? h("div", { style: { marginBottom: 6 } },
              h("div", { style: { fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: tA(0.9), fontWeight: 700, marginBottom: 8 } }, T("Cavaliers", "Riders", "Jinetes", "Cavalieri", "\u30e9\u30a4\u30c0\u30fc", "Reiter", "\u0627\u0644\u0641\u0631\u0633\u0627\u0646", "骑手", "Ruiters", "Cavaleiros", "Ryttare", "Всадники", "Jeźdźcy", "기수")),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, tagCibles.amis.map(function (a, iA) {
                return h("button", { key: "a" + iA, onClick: function () { poserTag("cavalier", a.id, a.nom); }, style: { padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)", color: "#F3EEE4", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, "\ud83d\udc64 " + a.nom);
              }))) : null,
            (!(tagCibles.ecuries || []).length && !(tagCibles.chevaux || []).length && !(tagCibles.amis || []).length) ? h("div", { style: { textAlign: "center", color: "#A39D92", fontSize: 11.5, padding: "10px 0", lineHeight: 1.5 } }, T("Aucune cible disponible pour l'instant.", "Nothing to tag yet.", "", "", "", "Noch kein Ziel verfügbar.", "\u0644\u0627 \u064a\u0648\u062c\u062f \u0647\u062f\u0641 \u0645\u062a\u0627\u062d \u062d\u0627\u0644\u064a\u0627.", "暂时没有可标记的对象。", "Nog geen doel beschikbaar.", "Nada para marcar por enquanto.", "Inget att tagga ännu.", "Пока нет доступных вариантов.", "Na razie nie ma kogo oznaczyć.", "지금은 선택할 수 있는 대상이 없어요.")) : null),
        h("button", { onClick: function () { setTagOuvert(null); }, style: { marginTop: 16, width: "100%", padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schließen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))), document.body) : null,
    selRuban ? h("div", { className: "rubanFS", onClick: function () { setSelRuban(null); } },
      h("div", { className: "close", onClick: function (e) { e.stopPropagation(); setSelRuban(null); } }, h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M18 6 6 18M6 6l12 12" }))),
      (selRuban.img ? h("img", { className: "rfsimg", src: selRuban.img, alt: selRuban.lab }) : h("div", { className: "bigros" }, selRuban.coeur ? h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M12 20s-6.5-4.3-9-8C1.5 9.5 3 6 6.2 6c1.9 0 3.1 1.1 3.8 2.1C10.7 7.1 11.9 6 13.8 6 17 6 18.5 9.5 17 12c-2.5 3.7-9 8-9 8z" })) : selRuban.med)),
      h("h2", null, selRuban.lab),
      h("div", { className: "sub" }, c.nom),
      selRuban.liens ? h("div", { className: "rflinks" }, selRuban.liens.map(function (L, li) {
        var lab = L.label || ({ instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", video: "Vid\u00e9o" }[L.type] || "Lien");
        return h("a", { key: li, className: "rflink " + (L.type || "lien"), href: L.url, target: "_blank", rel: "noopener noreferrer", onClick: function (e) { e.stopPropagation(); } }, h("span", { className: "rfico" }), lab);
      })) : null,
      h("div", { className: "story empty" }, T("Ajoute ici l'histoire de cette victoire \u2014 le lieu, la date, ce que tu as ressenti.", "Add the story of this win here \u2014 place, date, how it felt.", "A\u00f1ade aqu\u00ed la historia de esta victoria.", "Aggiungi qui la storia di questa vittoria.", "\u3053\u3053\u306b\u3053\u306e\u52dd\u5229\u306e\u7269\u8a9e\u3092\u8ffd\u52a0\u3002", "Füge hier die Geschichte dieses Erfolgs hinzu — Ort, Datum, wie du dich gefühlt hast.", "\u0623\u0636\u064a\u0641\u064a \u0647\u0646\u0627 \u0642\u0635\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0646\u062a\u0635\u0627\u0631 \u2014 \u0627\u0644\u0645\u0643\u0627\u0646 \u0648\u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0648\u0645\u0627 \u0634\u0639\u0631\u062a \u0628\u0647.", "在这里写下这场胜利的故事——地点、日期、你当时的感受。", "Voeg hier het verhaal van deze overwinning toe — de plek, de datum, wat je voelde.", "Adicione aqui a história desta vitória — o local, a data, o que você sentiu.", "Lägg till historien om den här segern här — plats, datum, hur det kändes.", "Добавь сюда историю этой победы — место, дату, что ты почувствовала.", "Dodaj tutaj historię tego zwycięstwa — miejsce, datę i to, jak ci z tym było.", "이 승리의 이야기를 여기에 적어 보세요 — 장소, 날짜, 그때의 기분."))) : null,

    ajoutRes ? h("div", { onClick: function () { setAjoutRes(false); }, style: { position: "fixed", inset: 0, zIndex: 9000, background: "rgba(4,6,9,0.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 22 } },
      /* 🟩 05/09 22h50 : par precaution, meme correctif que la fenetre Origines juste a
           cote (bug du 28/08, meme cause) — cette fenetre a aussi grandi aujourd'hui
           (import + liste a cocher) et pouvait deborder sous la barre du bas dans les
           memes conditions, avec plusieurs resultats trouves. */
      h("div", { onClick: function (eM) { eM.stopPropagation(); }, style: { width: "100%", maxWidth: 420, maxHeight: "calc(100dvh - env(safe-area-inset-top) - 44px)", overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", borderRadius: 20, border: "1px solid " + tA(0.4), background: "linear-gradient(170deg, rgba(16,21,26,0.98), rgba(6,7,9,0.99))", padding: "20px 18px calc(20px + 84px + env(safe-area-inset-bottom))" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 16, letterSpacing: 1, marginBottom: 14, color: "#F3EEE4" } }, "\ud83c\udfc6 " + T("Ajouter un r\u00e9sultat", "Add a result", "A\u00f1adir resultado", "Aggiungi risultato", "\u7d50\u679c\u3092\u8ffd\u52a0", "Ergebnis hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가")),
        h("input", { ref: refImportRes, type: "file", accept: "image/*", style: { display: "none" }, onChange: function (eIm) {
          var fIm = (eIm.target && eIm.target.files && eIm.target.files[0]) || null;
          try { eIm.target.value = ""; } catch (eRi) { }
          if (fIm) importerResultatsDepuisCapture(fIm);
        } }),
        h("button", { onClick: function () { if (!importResEnCours && refImportRes.current) refImportRes.current.click(); }, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", minHeight: 44, padding: "0 14px", marginBottom: 14, borderRadius: 12, border: "1px solid rgba(127,163,173,0.4)", background: "rgba(127,163,173,0.08)", color: "#F3EEE4", fontSize: 12, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: importResEnCours ? "default" : "pointer", opacity: importResEnCours ? 0.6 : 1 } },
          importResEnCours
            ? T("Lecture de la capture\u2026", "Reading the screenshot\u2026", "Leyendo la captura\u2026", "Lettura della schermata\u2026", "\u30ad\u30e3\u30d7\u30c1\u30e3\u3092\u8aad\u307f\u53d6\u308a\u4e2d\u2026", "Screenshot wird gelesen\u2026", "\u062c\u0627\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0644\u0642\u0637\u0629\u2026", "正在识别截图…", "Screenshot lezen…", "Lendo a captura…", "Läser skärmdumpen…", "Чтение скриншота…", "Odczytywanie zrzutu ekranu…", "캡처를 읽는 중…")
            : ("\u2913 " + T("Importer depuis une capture (IFCE, Horsetelex\u2026)", "Import from a screenshot (IFCE, Horsetelex\u2026)", "Importar desde una captura (IFCE, Horsetelex\u2026)", "Importa da una schermata (IFCE, Horsetelex\u2026)", "\u30ad\u30e3\u30d7\u30c1\u30e3\u304b\u3089\u30a4\u30f3\u30dd\u30fc\u30c8\uff08IFCE\u3001Horsetelex\u2026\uff09", "Aus Screenshot importieren (IFCE, Horsetelex\u2026)", "\u0627\u0644\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0645\u0646 \u0644\u0642\u0637\u0629 \u0634\u0627\u0634\u0629 (IFCE\u060c Horsetelex\u2026)", "从截图导入（IFCE、Horsetelex……）", "Importeren vanaf een screenshot (IFCE, Horsetelex…)", "Importar de uma captura de tela (IFCE, Horsetelex…)", "Importera från en skärmdump (IFCE, Horsetelex…)", "Загрузить со скриншота (IFCE, Horsetelex…)", "Zaimportuj ze zrzutu ekranu (IFCE, Horsetelex…)", "캡처 화면으로 가져오기 (IFCE, Horsetelex…)"))),
        importResMsg ? h("div", { style: { fontSize: 11, textAlign: "center", marginBottom: 12, padding: "8px 10px", borderRadius: 10, color: "#FF9AA8", background: "rgba(178,44,54,0.12)", lineHeight: 1.5 } }, importResMsg.texte) : null,
        importResTrouves ? h(React.Fragment, null,
          h("div", { style: { fontSize: 11.5, color: "#9BE8F2", textAlign: "center", marginBottom: 10, lineHeight: 1.5 } },
            importResTrouves.length + " " + T("r\u00e9sultat(s) trouv\u00e9(s) \u2014 v\u00e9rifie puis coche ceux \u00e0 ajouter.", "result(s) found \u2014 check them, then tick the ones to add.", "resultado(s) encontrado(s) \u2014 rev\u00edsalos y marca los que quieras a\u00f1adir.", "risultato/i trovato/i \u2014 controlla e spunta quelli da aggiungere.", "\u4ef6\u898b\u3064\u304b\u308a\u307e\u3057\u305f\u3002\u78ba\u8a8d\u3057\u3066\u8ffd\u52a0\u3059\u308b\u3082\u306e\u306b\u30c1\u30a7\u30c3\u30af\u3092\u5165\u308c\u3066\u304f\u3060\u3055\u3044\u3002", "Ergebnis(se) gefunden \u2014 bitte pr\u00fcfen und die gew\u00fcnschten ankreuzen.", "\u0646\u062a\u064a\u062c\u0629 (\u0646\u062a\u0627\u0626\u062c) \u0648\u062c\u062f\u062a \u2014 \u062a\u062d\u0642\u0642\u064a \u062b\u0645 \u0627\u062e\u062a\u0627\u0631\u064a \u0645\u0627 \u062a\u0631\u064a\u062f\u064a\u0646 \u0625\u0636\u0627\u0641\u062a\u0647.", "条成绩已找到——请检查后勾选要添加的。", "resultaat/resultaten gevonden — controleer ze en vink de resultaten aan die je wilt toevoegen.", "resultado(s) encontrado(s) — confira e marque os que quer adicionar.", "resultat hittades – kontrollera och markera de som ska läggas till.", "результат(ов) найдено — проверь и отметь те, что нужно добавить.", "znalezionych wyników — sprawdź je, a potem zaznacz te, które chcesz dodać.", "개의 결과를 찾았어요. 확인한 뒤 추가할 것을 체크하세요.")),
          h("div", { style: { maxHeight: "38vh", overflowY: "auto", marginBottom: 14 } },
            importResTrouves.map(function (rIt, iIt) {
              return h("label", { key: rIt.cle, style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 4px", borderBottom: iIt < importResTrouves.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", opacity: rIt.dejaLa ? 0.55 : 1 } },
                h("input", { type: "checkbox", checked: !!rIt.coche, onChange: function () { setImportResTrouves(function (li) { return (li || []).map(function (x, iX) { return iX === iIt ? Object.assign({}, x, { coche: !x.coche }) : x; }); }); }, style: { width: 18, height: 18, marginTop: 2, flexShrink: 0 } }),
                h("div", { style: { flex: 1, minWidth: 0 } },
                  h("div", { style: { color: "#F3EEE4", fontSize: 13, fontWeight: 600, wordBreak: "break-word" } }, (rIt.annee ? (rIt.annee + " \u00b7 ") : "") + rIt.event),
                  h("div", { style: { color: "#9AA4AC", fontSize: 11.5, marginTop: 2 } }, [rIt.ds, libelleRang(rIt.rang)].filter(Boolean).join(" \u00b7 ") || "\u2014"),
                  rIt.dejaLa ? h("div", { style: { color: "#F2D48A", fontSize: 10.5, marginTop: 2, fontStyle: "italic" } }, T("D\u00e9j\u00e0 dans tes r\u00e9sultats", "Already in your results", "Ya en tus resultados", "Gi\u00e0 nei tuoi risultati", "\u65e2\u306b\u767b\u9332\u6e08\u307f", "Bereits in deinen Ergebnissen", "\u0645\u0648\u062c\u0648\u062f\u0629 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064a \u0646\u062a\u0627\u0626\u062c\u0643", "已在你的成绩中", "Al in je resultaten", "Já está nos seus resultados", "Finns redan bland dina resultat", "Уже в твоих результатах", "Już w twoich wynikach", "이미 내 결과에 있어요")) : null));
            })),
          h("div", { style: { display: "flex", gap: 10 } },
            h("button", { onClick: function () { setImportResTrouves(null); }, style: { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "#C9CFD4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Annuler l'import", "Cancel import", "Cancelar importaci\u00f3n", "Annulla importazione", "\u30a4\u30f3\u30dd\u30fc\u30c8\u3092\u30ad\u30e3\u30f3\u30bb\u30eb", "Import abbrechen", "\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0627\u0633\u062a\u064a\u0631\u0627\u062f", "取消导入", "Import annuleren", "Cancelar a importação", "Avbryt importen", "Отменить импорт", "Anuluj import", "가져오기 취소")),
            h("button", { onClick: validerImportResultats, style: { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(127,163,173,0.5)", background: "rgba(127,163,173,0.14)", color: "#F3EEE4", fontSize: 14, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Ajouter", "Add", "A\u00f1adir", "Aggiungi", "\u8ffd\u52a0", "Hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629", "添加", "Toevoegen", "Adicionar", "Lägg till", "Добавить", "Dodaj", "추가") + " (" + importResTrouves.filter(function (x) { return x.coche; }).length + ")")))
        : h(React.Fragment, null,
        h("div", { style: { display: "flex", gap: 8, marginBottom: 10 } },
          h("input", { value: resLocal.annee, onChange: function (eA) { var v = eA.target.value; setResLocal(function (rr) { return Object.assign({}, rr, { annee: v }); }); }, placeholder: T("Ann\u00e9e", "Year", "A\u00f1o", "Anno", "\u5e74", "Jahr", "\u0627\u0644\u0633\u0646\u0629", "年份", "Jaar", "Ano", "År", "Год", "Rok", "연도"), maxLength: 4, inputMode: "numeric", style: { width: 86, padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 14 } }),
          h("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } }, ["1", "2", "3"].map(function (rgO) {
            var onR = resLocal.rang === rgO;
            return h("button", { key: "rg" + rgO, onClick: function () { setResLocal(function (rr) { return Object.assign({}, rr, { rang: rgO }); }); }, style: { width: 40, height: 40, borderRadius: "50%", border: onR ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.2)", background: rgO === "1" ? "linear-gradient(140deg,#F0CE8E,#B8975A)" : rgO === "2" ? "linear-gradient(140deg,#E8ECEF,#9AA4AC)" : "linear-gradient(140deg,#E2B48E,#9E6B44)", color: "#141005", fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, cursor: "pointer" } }, rgO);
          }).concat([
            h("input", { key: "rgN", value: (["1", "2", "3", "classe"].indexOf(resLocal.rang) < 0 ? resLocal.rang : ""), onChange: function (eN) { var v = eN.target.value.replace(/[^0-9]/g, "").slice(0, 2); setResLocal(function (rr) { return Object.assign({}, rr, { rang: v }); }); }, placeholder: "4-8", inputMode: "numeric", style: { width: 52, height: 40, textAlign: "center", borderRadius: 12, border: (["1", "2", "3", "classe", ""].indexOf(resLocal.rang) < 0) ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 14 } }),
            h("button", { key: "rgC", onClick: function () { setResLocal(function (rr) { return Object.assign({}, rr, { rang: "classe" }); }); }, style: { height: 40, padding: "0 13px", borderRadius: 999, border: resLocal.rang === "classe" ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.2)", background: resLocal.rang === "classe" ? "rgba(127,163,173,0.16)" : "rgba(255,255,255,0.05)", color: "#DDE7EA", fontSize: 12.5, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Class\u00e9", "Placed", "Clasificado", "Classificato", "\u5165\u8cde", "Platziert", "\u0645\u0635\u0646\u0641", "获得名次", "Geplaatst", "Classificado", "Placerad", "Призёр", "Sklasyfikowany", "입상"))
          ]))),
        h("input", { value: resLocal.event, onChange: function (eE) { var v = eE.target.value; setResLocal(function (rr) { return Object.assign({}, rr, { event: v }); }); }, placeholder: T("\u00c9preuve ou concours (ex. Open de France)", "Event or show", "Prueba o concurso", "Gara o concorso", "\u5927\u4f1a\u540d", "Pr\u00fcfung oder Turnier", "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629 \u0623\u0648 \u0627\u0644\u062d\u062f\u062b (\u0645\u062b\u0644\u0627: Open de France)", "比赛项目或比赛（例如 Open de France）", "Proef of wedstrijd (bijv. Open de France)", "Prova ou competição (ex.: Open de France)", "Klass eller tävling (t.ex. Open de France)", "Маршрут или соревнования (напр. Open de France)", "Konkurencja lub zawody (np. Open de France)", "경기 또는 대회 (예: Open de France)"), maxLength: 60, style: { width: "100%", padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 14, marginBottom: 10 } }),
        h("input", { value: resLocal.ds, onChange: function (eD) { var v = eD.target.value; setResLocal(function (rr) { return Object.assign({}, rr, { ds: v }); }); }, placeholder: T("Discipline \u00b7 cavalier (ex. CSO \u00b7 avec Liam)", "Discipline \u00b7 rider", "Disciplina \u00b7 jinete", "Disciplina \u00b7 cavaliere", "\u7a2e\u76ee\u30fb\u9a0e\u624b", "Disziplin \u00b7 Reiter", "\u0627\u0644\u0627\u062e\u062a\u0635\u0627\u0635 \u00b7 \u0627\u0644\u0641\u0627\u0631\u0633 (\u0645\u062b\u0644\u0627: \u0642\u0641\u0632 \u0627\u0644\u062d\u0648\u0627\u062c\u0632 \u00b7 \u0645\u0639 Liam)", "项目 · 骑手（例如 场地障碍赛 · 与 Liam）", "Discipline · ruiter (bijv. springen · met Liam)", "Modalidade · cavaleiro (ex.: Salto · com Liam)", "Disciplin · ryttare (t.ex. hoppning · med Liam)", "Дисциплина · всадник (напр. конкур · с Liam)", "Dyscyplina · jeździec (np. skoki · z Liam)", "종목 · 기수 (예: 장애물 경기 · Liam과 함께)"), maxLength: 60, style: { width: "100%", padding: "11px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 14, marginBottom: 16 } }),
        h("div", { style: { display: "flex", gap: 10 } },
          h("button", { onClick: function () { setAjoutRes(false); }, style: { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "#C9CFD4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { onClick: sauverResultat, style: { flex: 1, padding: "12px", borderRadius: 13, border: "1px solid rgba(127,163,173,0.5)", background: "rgba(127,163,173,0.14)", color: "#F3EEE4", fontSize: 14, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", cursor: "pointer" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장")))))) : null,
    /* 🟩 05/09 22h50 (Blandine : "le bouton Enregistrer est coince en bas, on n'arrive pas a
   y acceder a cause du menu") — MEME BUG que celui repare le 28/08 sur la fenetre Son
   histoire : la barre de navigation du bas (84 px + zone sure) est posee PAR-DESSUS ce
   panneau, qui ne lui reservait aucune place. La fenetre a grandi aujourd'hui (bouton
   d'import + 8 champs arriere-grands-parents) : elle deborde desormais assez pour
   toucher la barre, ce qui n'arrivait pas avant. Meme correctif exact : 84 px + zone
   sure ajoutes dans le padding bas, a l'INTERIEUR de la zone qui defile. */
editOrig ? h("div", { onClick: function () { setEditOrig(false); }, style: { position: "fixed", inset: 0, zIndex: 8600, background: "rgba(4,6,9,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "calc(env(safe-area-inset-top) + 70px) 0 0" } },
      /* 20/08 (session 147) : le panneau n'avait NI maxHeight NI overflowY. Avec seulement pere et mere il tenait a l'ecran ; les quatre champs grands-parents ajoutes en 146 l'ont fait deborder, et le contenu du bas (Mere de la mere, boutons Annuler/Enregistrer) devenait INATTEIGNABLE — le doigt traversait le panneau et faisait defiler la fiche derriere. Verifie sur l'enregistrement de Blandine : le panneau ne bouge pas d'un pixel, seule la photo du cheval defile. Le panneau des tags (meme fichier) avait deja maxHeight+overflowY : c'est le meme reglage. */
/* 🟥 06/09 (Blandine : "j'arrive tjs pas a acceder au bouton enregistrer, il est
   masque sous la barre en bas") — CETTE REPARATION AVAIT DEJA ETE ECRITE UNE FOIS (05/09
   22h50) ET A DISPARU ENTRE-TEMPS, sans que je sache encore expliquer comment. Remise ici,
   verifiee CETTE FOIS par une relecture directe du resultat (pas seulement le message de
   succes du script) : meme correctif exact que la fenetre "Ajouter un resultat" juste a
   cote et que "Ecrire son histoire" le 28/08 — 84 px + zone sure ajoutes dans le padding
   bas, a l'INTERIEUR de la zone qui defile, pour que le bouton Enregistrer reste toujours
   au-dessus de la barre de navigation quand on defile jusqu'en bas. */
h("div", { onClick: function (e) { e.stopPropagation(); }, ref: function (el) { if (el) { try { el.scrollTop = 0; } catch (eS) { } } }, style: { width: "92%", maxWidth: 420, maxHeight: "calc(100dvh - env(safe-area-inset-top) - 110px)", overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", borderRadius: 20, border: "1px solid rgba(127,163,173,0.4)", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "20px 18px calc(20px + 84px + env(safe-area-inset-bottom))" } },
        h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#F3EEE4", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Mon cheval", "My horse", "Mi caballo", "Il mio cavallo", "\u79c1\u306e\u99ac", "Mein Pferd", "\u062d\u0635\u0627\u0646\u064a", "我的马", "Mijn paard", "Meu cavalo", "Min häst", "Моя лошадь", "Mój koń", "내 말")),
        h("p", { style: { color: "#A39D92", fontSize: 12, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 } }, T("Renseigne sa race, son \u00e2ge et ses origines.", "Fill in your horse's bloodline.", "Completa los or\u00edgenes de tu caballo.", "Inserisci le origini del tuo cavallo.", "\u99ac\u306e\u8840\u7d71\u3092\u5165\u529b\u3057\u3088\u3046\u3002", "Gib seine Rasse, sein Alter und seine Herkunft an.", "\u0623\u062f\u062e\u0644\u064a \u0633\u0644\u0627\u0644\u062a\u0647 \u0648\u0639\u0645\u0631\u0647 \u0648\u0646\u0633\u0628\u0647.", "填写它的品种、年龄和血统。", "Vul zijn ras, leeftijd en afstamming in.", "Informe a raça, a idade e as origens dele.", "Fyll i ras, ålder och ursprung.", "Укажи её породу, возраст и происхождение.", "Podaj jego rasę, wiek i pochodzenie.", "품종, 나이, 혈통을 입력해 주세요.")),
        h("input", { ref: refImportOrig, type: "file", accept: "image/*", style: { display: "none" }, onChange: function (eIm) {
          var fIm = (eIm.target && eIm.target.files && eIm.target.files[0]) || null;
          try { eIm.target.value = ""; } catch (eRi) { }
          if (fIm) importerOriginesDepuisCapture(fIm);
        } }),
        h("button", { onClick: function () { if (!importOrigEnCours && refImportOrig.current) refImportOrig.current.click(); }, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", minHeight: 44, padding: "0 14px", marginBottom: 14, borderRadius: 12, border: "1px solid " + tA(0.4), background: tA(0.08), color: teinteCl, fontSize: 12, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", cursor: importOrigEnCours ? "default" : "pointer", opacity: importOrigEnCours ? 0.6 : 1 } },
          importOrigEnCours
            ? T("Lecture de la capture\u2026", "Reading the screenshot\u2026", "Leyendo la captura\u2026", "Lettura della schermata\u2026", "\u30ad\u30e3\u30d7\u30c1\u30e3\u3092\u8aad\u307f\u53d6\u308a\u4e2d\u2026", "Screenshot wird gelesen\u2026", "\u062c\u0627\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0644\u0642\u0637\u0629\u2026", "正在识别截图…", "Screenshot lezen…", "Lendo a captura…", "Läser skärmdumpen…", "Чтение скриншота…", "Odczytywanie zrzutu ekranu…", "캡처를 읽는 중…")
            : ("\u2913 " + T("Importer depuis une capture (IFCE, Horsetelex\u2026)", "Import from a screenshot (IFCE, Horsetelex\u2026)", "Importar desde una captura (IFCE, Horsetelex\u2026)", "Importa da una schermata (IFCE, Horsetelex\u2026)", "\u30ad\u30e3\u30d7\u30c1\u30e3\u304b\u3089\u30a4\u30f3\u30dd\u30fc\u30c8\uff08IFCE\u3001Horsetelex\u2026\uff09", "Aus Screenshot importieren (IFCE, Horsetelex\u2026)", "\u0627\u0644\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0645\u0646 \u0644\u0642\u0637\u0629 \u0634\u0627\u0634\u0629 (IFCE\u060c Horsetelex\u2026)", "从截图导入（IFCE、Horsetelex……）", "Importeren vanaf een screenshot (IFCE, Horsetelex…)", "Importar de uma captura de tela (IFCE, Horsetelex…)", "Importera från en skärmdump (IFCE, Horsetelex…)", "Загрузить со скриншота (IFCE, Horsetelex…)", "Zaimportuj ze zrzutu ekranu (IFCE, Horsetelex…)", "캡처 화면으로 가져오기 (IFCE, Horsetelex…)"))),
        importOrigMsg ? h("div", { style: { fontSize: 11, textAlign: "center", marginBottom: 12, padding: "8px 10px", borderRadius: 10, color: importOrigMsg.ok ? teinteCl : "#FF9AA8", background: importOrigMsg.ok ? tA(0.08) : "rgba(178,44,54,0.12)", lineHeight: 1.5 } }, importOrigMsg.texte) : null,
        [["sire", "N\u00b0 SIRE"], ["race", T("Race", "Breed", "Raza", "Razza", "\u54c1\u7a2e", "Rasse", "\u0627\u0644\u0633\u0644\u0627\u0644\u0629", "品种", "Ras", "Raça", "Ras", "Порода", "Rasa", "품종")], ["age", T("\u00c2ge (ans)", "Age (years)", "Edad (a\u00f1os)", "Et\u00e0 (anni)", "\u5e74\u9f62", "Alter (Jahre)", "\u0627\u0644\u0639\u0645\u0631 (\u0628\u0627\u0644\u0633\u0646\u0648\u0627\u062a)", "年龄（岁）", "Leeftijd (jaren)", "Idade (anos)", "Ålder (år)", "Возраст (лет)", "Wiek (lata)", "나이 (세)")], ["naissance", T("Date de naissance (JJ/MM/AAAA)", "Date of birth (DD/MM/YYYY)", "Fecha de nacimiento (DD/MM/AAAA)", "Data di nascita (GG/MM/AAAA)", "\u751f\u5e74\u6708\u65e5\uff08DD/MM/YYYY\uff09", "Geburtsdatum (TT/MM/JJJJ)", "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0645\u064a\u0644\u0627\u062f (\u064a\u0648\u0645/\u0634\u0647\u0631/\u0633\u0646\u0629)", "出生日期（日/月/年）", "Geboortedatum (DD/MM/JJJJ)", "Data de nascimento (DD/MM/AAAA)", "Födelsedatum (DD/MM/ÅÅÅÅ)", "Дата рождения (ДД/ММ/ГГГГ)", "Data urodzenia (DD/MM/RRRR)", "생년월일 (일/월/년)")], ["pere", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")], ["mere", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")], [null, T("Grands-parents", "Grandparents", "Abuelos", "Nonni", "\u7956\u7236\u6bcd", "Gro\u00dfeltern", "\u0627\u0644\u0623\u062c\u062f\u0627\u062f", "祖辈", "Grootouders", "Avós", "Far- och morföräldrar", "Дедушки и бабушки", "Dziadkowie", "조부모")],
          ["--cote-pere", ""],
            ["pp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["pm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            ["--cote-mere", ""],
            ["mp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["mm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            [null, T("Arrière-grands-parents", "Great-grandparents", "Bisabuelos", "Bisnonni", "\u66fe\u7956\u7236\u6bcd", "Urgroßeltern", "\u0623\u062c\u062f\u0627\u062f \u0627\u0644\u0623\u062c\u062f\u0627\u062f", "曾祖辈", "Overgrootouders", "Bisavós", "Gammelföräldrar", "Прадедушки и прабабушки", "Pradziadkowie", "증조부모")],
            ["--cote-pp", ""],
            ["ppp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["ppm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            ["--cote-pm", ""],
            ["pmp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["pmm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            ["--cote-mp", ""],
            ["mpp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["mpm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            ["--cote-mm", ""],
            ["mmp", T("P\u00e8re", "Sire", "Padre", "Padre", "\u7236", "Vater", "\u0627\u0644\u0623\u0628", "父亲", "Vader", "Pai", "Far", "Отец", "Ojciec", "아버지")],
            ["mmm", T("M\u00e8re", "Dam", "Madre", "Madre", "\u6bcd", "Mutter", "\u0627\u0644\u0623\u0645", "母亲", "Moeder", "Mãe", "Mor", "Мать", "Matka", "어머니")],
            ["naisseur", T("Naisseur / \u00e9leveur", "Breeder", "Criador", "Allevatore", "\u751f\u7523\u8005", "Züchter / Aufzüchter", "\u0627\u0644\u0645\u0631\u0628\u064a", "育马人", "Fokker", "Criador", "Uppfödare", "Заводчик", "Hodowca", "생산자 / 사육자")]].map(function (chp, iC) {
          if (!chp[0]) { /* 20/08 : intertitre Grands-parents */
            return h("div", { key: "gt" + iC, style: { fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.22em", color: "#9BE8F2", textTransform: "uppercase", textAlign: "center", margin: "16px 0 10px", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" } }, chp[1]);
          }
          /* 20/08 (session 147) : les quatre grands-parents passent sur DEUX COLONNES, groupes
             par cote, avec le nom du parent en intertitre (« Du cote de Quarnac du mesnil »).
             Avant : quatre lignes pleine largeur aux libelles quasi identiques (« Pere du pere »,
             « Mere du pere », « Pere de la mere »...) — illisible, et ca doublait la hauteur du
             panneau, qui debordait alors de l ecran. */
          /* 🟩 05/09 : le meme intertitre « Du cote de X », generalise de 2 a 6 groupes pour
             couvrir les 4 nouveaux arriere-grands-parents (pp/pm/mp/mm), meme mecanique. */
          var COTES_GP = {
            "--cote-pere": { champ: "pere", estP: true, fr: "Côté père", en: "Sire side", es: "Lado paterno", it: "Lato paterno", ja: "父系", de: "Vaterseite", ar: "\u062c\u0647\u0629 \u0627\u0644\u0623\u0628", zh: "父系", nl: "Vaderskant", pt: "Lado do pai", sv: "Faderssidan", ru: "Линия отца", pl: "Strona ojca", ko: "아버지 쪽" },
            "--cote-mere": { champ: "mere", estP: false, fr: "Côté mère", en: "Dam side", es: "Lado materno", it: "Lato materno", ja: "母系", de: "Mutterseite", ar: "\u062c\u0647\u0629 \u0627\u0644\u0623\u0645", zh: "母系", nl: "Moederskant", pt: "Lado da mãe", sv: "Modersidan", ru: "Линия матери", pl: "Strona matki", ko: "어머니 쪽" },
            "--cote-pp": { champ: "pp", estP: true, fr: "Père du père", en: "Sire's sire", es: "Padre del padre", it: "Padre del padre", ja: "父の父", de: "Vater des Vaters", ar: "\u0623\u0628 \u0627\u0644\u0623\u0628", zh: "父亲的父亲", nl: "Vader van de vader", pt: "Pai do pai", sv: "Fars far", ru: "Отец отца", pl: "Ojciec ojca", ko: "아버지의 아버지" },
            "--cote-pm": { champ: "pm", estP: false, fr: "Mère du père", en: "Sire's dam", es: "Madre del padre", it: "Madre del padre", ja: "父の母", de: "Mutter des Vaters", ar: "\u0623\u0645 \u0627\u0644\u0623\u0628", zh: "父亲的母亲", nl: "Moeder van de vader", pt: "Mãe do pai", sv: "Fars mor", ru: "Мать отца", pl: "Matka ojca", ko: "아버지의 어머니" },
            "--cote-mp": { champ: "mp", estP: true, fr: "Père de la mère", en: "Dam's sire", es: "Padre de la madre", it: "Padre della madre", ja: "母の父", de: "Vater der Mutter", ar: "\u0623\u0628 \u0627\u0644\u0623\u0645", zh: "母亲的父亲", nl: "Vader van de moeder", pt: "Pai da mãe", sv: "Mors far", ru: "Отец матери", pl: "Ojciec matki", ko: "어머니의 아버지" },
            "--cote-mm": { champ: "mm", estP: false, fr: "Mère de la mère", en: "Dam's dam", es: "Madre de la madre", it: "Madre della madre", ja: "母の母", de: "Mutter der Mutter", ar: "\u0623\u0645 \u0627\u0644\u0623\u0645", zh: "母亲的母亲", nl: "Moeder van de moeder", pt: "Mãe da mãe", sv: "Mors mor", ru: "Мать матери", pl: "Matka matki", ko: "어머니의 어머니" }
          };
          if (COTES_GP[chp[0]]) {
            var __cg = COTES_GP[chp[0]];
            var __par = String((origLocal[__cg.champ] || "")).trim();
            var __lib = __par
              ? T("Du côté de ", "On ", "Por parte de ", "Lato ", "の系統 ", "Seite von ", "\u0645\u0646 \u062c\u0647\u0629 ", "在…一侧：", "Aan de kant van ", "Do lado de ", "På ", "По линии ", "Ze strony ", "쪽: ") + __par
              : T(__cg.fr, __cg.en, __cg.es, __cg.it, __cg.ja, __cg.de, __cg.ar, __cg.zh || __cg.en, (__cg.nl || __cg.en), (__cg.pt || __cg.en), (__cg.sv || __cg.en), (__cg.ru || __cg.en), (__cg.pl || __cg.en), (__cg.ko || __cg.en));
            return h("div", { key: chp[0], style: { fontSize: 10, letterSpacing: "0.14em", color: "#9BE8F2", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Montserrat',sans-serif", margin: __cg.estP ? "4px 0 8px" : "16px 0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, __lib);
          }
          var __demi = (["pp", "pm", "mp", "mm", "ppp", "ppm", "pmp", "pmm", "mpp", "mpm", "mmp", "mmm"].indexOf(chp[0]) >= 0);
          var __gauche = (["pp", "mp", "ppp", "pmp", "mpp", "mmp"].indexOf(chp[0]) >= 0);
          return h("div", { key: chp[0], style: __demi ? { marginBottom: 10, width: "calc(50% - 5px)", display: "inline-block", verticalAlign: "top", marginRight: __gauche ? 10 : 0 } : { marginBottom: 10 } },
            h("div", { style: { fontSize: 8.5, letterSpacing: "0.2em", color: "#7DDDE8", textTransform: "uppercase", fontWeight: 700, marginBottom: 5, fontFamily: "'Montserrat',sans-serif" } }, chp[1]),
            h("input", { value: origLocal[chp[0]] || "", onChange: function (eI) { var v = eI.target.value; setOrigLocal(function (oo) { var nn = Object.assign({}, oo); nn[chp[0]] = v; return nn; }); }, maxLength: 60, placeholder: "\u2014", style: { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "#F3EEE4", fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none" } }),
            /* (626) la ligne de detail de l ancetre (annee, race, indice, niveau), visible des qu un nom est tape ; remplie par la capture ou a la main */
            (["pere", "mere", "pp", "pm", "mp", "mm", "ppp", "ppm", "pmp", "pmm", "mpp", "mpm", "mmp", "mmm"].indexOf(chp[0]) >= 0 && String(origLocal[chp[0]] || "").trim())
              ? h("input", { value: origLocal["d_" + chp[0]] || "", onChange: function (eD) { var vD = eD.target.value; setOrigLocal(function (oo) { var nn = Object.assign({}, oo); nn["d_" + chp[0]] = vD; return nn; }); }, maxLength: 60, placeholder: T("D\u00e9tail : ann\u00e9e, race, indice\u2026", "Detail: year, breed, index\u2026", "Detalle: a\u00f1o, raza, \u00edndice\u2026", "Dettaglio: anno, razza, indice\u2026", "\u8a73\u7d30\uff1a\u751f\u5e74\u3001\u54c1\u7a2e\u3001\u6307\u6570\u2026", "Detail: Jahr, Rasse, Index\u2026", "\u062a\u0641\u0627\u0635\u064a\u0644: \u0627\u0644\u0633\u0646\u0629\u060c \u0627\u0644\u0633\u0644\u0627\u0644\u0629\u060c \u0627\u0644\u0645\u0624\u0634\u0631\u2026", "详情：出生年份、品种、指数……", "Details: jaar, ras, index…", "Detalhe: ano, raça, índice…", "Detaljer: år, ras, index…", "Подробности: год, порода, индекс…", "Szczegóły: rok, rasa, indeks…", "상세: 연도, 품종, 지수…"), style: { width: "100%", boxSizing: "border-box", marginTop: 5, padding: "7px 11px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#B9C6CC", fontSize: 12, fontFamily: "'Montserrat',sans-serif", outline: "none" } })
              : null);
        }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
          h("button", { onClick: function () { setEditOrig(false); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#D8D2C6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Annuler", "Cancel", "Cancelar", "Annulla", "\u30ad\u30e3\u30f3\u30bb\u30eb", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소")),
          h("button", { onClick: function () { sauverOrigines(); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid #D6C4A1", background: "rgba(214,196,161,0.08)" /* (1077) */, color: "#04252A", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Enregistrer", "Save", "Guardar", "Salva", "\u4fdd\u5b58", "Speichern", "\u062d\u0641\u0638", "保存", "Opslaan", "Salvar", "Spara", "Сохранить", "Zapisz", "저장"))))) : null,
    /* 11/09 (16) — LE PETIT MESSAGE DE LA FICHE ETAIT CACHE SOUS LA BARRE D ONGLETS (fait prouve : pose a
       40 px du bas DANS l enveloppe de l appli, zIndex 1, alors que la barre -- portail vers body, zIndex 50 --
       occupe ~80 px + l encoche). Remonte au-dessus de la barre. Vaut pour TOUS les messages de ce toast. */
    toast ? h("div", { style: { position: "fixed", left: "50%", bottom: "calc(96px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", zIndex: 90, background: "rgba(20,26,33,0.96)", color: "#F3EEE4", border: "1px solid " + tA(0.74) + "", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", boxShadow: "0 10px 30px rgba(10,26,36,0.11)" } }, toast) : null,
    albumChOuvert ? h(EcranAlbumPhotos, { userId: chevalDyn && chevalDyn.ownerId, cible: "cheval", cibleId: chevalDyn && chevalDyn.dbId, tr: tr, onClose: function () { setAlbumChOuvert(false); }, onRepublier: function (url) { appliquerPhotoCheval({ dataUrl: url, fichier: null, original: null }); } }) : null,
    null /* (1004) PontChevalCommun deplace dans l encart de fin de la page Histoire (brief de Blandine) */);
}
window.HypeCheval = { Cheval: EcranCheval };
})();
