/* HYPE ▸ 30/10/2026 — Page RÉSULTATS DE LA CAVALIÈRE (EcranResultatsCavaliere), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~116 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranResultatsCavaliere() {
  var h = React.createElement;
  var app = useApp();
  var tr = app.tr, setEcran = app.setEcran;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var stId = React.useState(function () { try { return String(window.__resCavaliereId || ""); } catch (e) { return ""; } });
  var riderId = stId[0];
  var stP = React.useState(null); var prof = stP[0], setProf = stP[1];
  var stR = React.useState(null); var resDb = stR[0], setResDb = stR[1];
  var stM = React.useState(null); var moi = stM[0], setMoi = stM[1];
  var stV = React.useState(function () { try { return localStorage.getItem("hype_res_vue") || "tous"; } catch (e) { return "tous"; } });
  var vueRes = stV[0], setVueRes = stV[1];
  function poserVueRes(v) { try { if (typeof hypeVueResPoser === "function") hypeVueResPoser(v); else localStorage.setItem("hype_res_vue", v); } catch (e) { } setVueRes(v); }   /* 30/10 : enregistree sur son compte */
  React.useEffect(function () { var vVr = true; try { if (typeof hypeVueResCharger === "function") hypeVueResCharger().then(function (v) { if (vVr && v) setVueRes(v); }); } catch (eVr) { } return function () { vVr = false; }; }, []);
  var stSo = React.useState(null); var saisonOuv = stSo[0], setSaisonOuv = stSo[1];
  var stSp = React.useState(null); var saisonPts = stSp[0], setSaisonPts = stSp[1]; var fpSt = React.useState(null); var famPtsOuv = fpSt[0], setFamPtsOuv = fpSt[1]; /* 18/10 : famille de points depliee (detail au toucher) */
  var stCf = React.useState("tous"); var cavFiltre = stCf[0], setCavFiltre = stCf[1];
  var stVm = React.useState(false); var voirMasques = stVm[0], setVoirMasques = stVm[1];
  var stTo = React.useState(""); var toast = stTo[0], setToast = stTo[1];
  var stAjP = React.useState(false); var ajoutPerf = stAjP[0], setAjoutPerf = stAjP[1];   /* (697) ajouter un resultat a son nom */
  var stRv = React.useState(0); var rechargeRes = stRv[0], setRechargeRes = stRv[1];
  var fcSt = React.useState({}); var fortsLocal = fcSt[0], setFortsLocal = fcSt[1]; /* (600) choix a la main des moments forts : reponse immediate au tap, par id de resultat */
  var fcOuv = React.useState(false); var choixFortOuvert = fcOuv[0], setChoixFortOuvert = fcOuv[1];
  var stE = React.useState(""); var erreur = stE[0], setErreur = stE[1];
  var largeRC = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;   /* 19/10 tablette */
  var ordiRC = (typeof useHypeLarge === "function") ? useHypeLarge() : false;   /* 19/10 ordinateur (menu de gauche) */
  /* 19/10 (Blandine, variante A validee) PERFORMANCES DU CAVALIER EN GRAND : la page sort de la colonne de 480 px (Router), hero avec les reglages tablette / ordinateur des autres sous-pages du cavalier, contenu aligne sur le texte du hero, sections empilees comme sur iPhone. Telephone strictement inchange (aucun conteneur ajoute sous 768 px). */
  function corpsRC() { var enf = Array.prototype.slice.call(arguments); return largeRC ? h.apply(null, ["div", { "data-perfcav-corps": "1", style: { padding: ordiRC ? "0 18px" : "0 10px" } }   /* bords alignes sur le texte du hero (34 px ordinateur, 26 px tablette) ; le Router plafonne deja la page a 1280 px */].concat(enf)) : h.apply(null, [React.Fragment, null].concat(enf)); }
  React.useEffect(function () { try { window.scrollTo(0, 0); } catch (e) { } }, []);
  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        var u = null; try { u = await utilisateurActuel(); } catch (eU) { u = null; }
        if (vif) setMoi(u);
        if (!riderId || typeof supa === "undefined" || !supa) { if (vif) setResDb([]); return; }
        var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").eq("id", riderId).maybeSingle();
        if (vif) setProf((rp && rp.data) || { id: riderId, pseudo: "" });
        var rr = await supa.from("resultats").select("*").eq("cavalier_id", riderId).limit(2000);
        if (rr && rr.error) { if (vif) { setErreur(String(rr.error.message || rr.error)); setResDb([]); } return; }
        var lignes = ((rr && rr.data) || []).filter(function (x) { return x && x.masque_cavaliere !== true; });
        var ids = [];
        lignes.forEach(function (x) { if (x.cheval_id && ids.indexOf(x.cheval_id) === -1) ids.push(x.cheval_id); });
        var noms = {}, photosCh = {}; /* (596) la photo du cheval voyage avec son nom, pour les encarts « moments forts » */
        if (ids.length) {
          var rc = await supa.from("chevaux").select("id, nom, photo_url").in("id", ids.slice(0, 300));
          ((rc && !rc.error && rc.data) || []).forEach(function (cv) { if (cv && cv.id) { noms[String(cv.id)] = cv.nom || ""; photosCh[String(cv.id)] = cv.photo_url || ""; } });
        }
        lignes = lignes.map(function (x) {
          var nomCh = (x.cheval_id && noms[String(x.cheval_id)]) || x.cheval_nom || "";
          return Object.assign({}, x, { cav_reel: x.cavalier || "", ch_reel: nomCh, cavalier: nomCh || x.cavalier || "", ch_photo: (x.cheval_id && photosCh[String(x.cheval_id)]) || "" });
        });
        if (vif) setResDb(lignes);
      } catch (eL) { if (vif) { setErreur(String(eL)); setResDb([]); } }
    })();
    return function () { vif = false; };
  }, [riderId, rechargeRes]);
  /* ── les variables que le corps copié de la fiche cheval attend ── */
  var nomCav = (prof && prof.pseudo) || "";
  var c = { nom: nomCav, palmares: [] };
  var chevalDyn = { ownerId: null, nom: "", photo_palmares: null, moments_forts_medias: null, dbId: null };
  var id = riderId;
  var photoCh = prof ? (((typeof avSrc === "function") ? avSrc(prof.avatar_url) : prof.avatar_url) || IMG_CAVALIER_HERO_DEFAUT /* (1134) avant : un avatar Hype tire au hasard */) : "";
  var photosForts = [], albumsForts = [], mediaTousMF = [];
  var pickerMomentF = null; function setPickerMomentF() { } function ouvrirPickerMomentF() { } function definirMediaMomentFort() { }
  function estModerateurHype() { return false; }   /* page de lecture : aucun outil ici */
  async function supprimerResultat() { return { error: "indisponible ici" }; }
  var teinteCl = "#CFE3E8";
  function tA(a) { return "rgba(127,163,173," + a + ")"; }
  function encartIdentiteCh(titrePage) {
    var OR9 = "#D9A85C";
    return h("div", { style: { position: "relative", margin: "4px 16px 18px", borderRadius: 18, overflow: "hidden", background: "#04070A", border: "1px solid rgba(255,255,255,.06)", minHeight: 150 } },
      photoCh ? h("img", { src: photoCh, alt: "", style: { width: "46%", height: 170, objectFit: "cover", objectPosition: "center 25%", display: "block", opacity: .94 } }) : h("div", { style: { height: 150 } }),
      h("div", { style: { pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(4,7,10,0) 22%, rgba(4,7,10,.78) 48%, rgba(4,7,10,.96) 72%)" } }),
      h("div", { style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", textAlign: "center", width: "54%" } },
        h("div", { style: { color: OR9, fontSize: 13, lineHeight: 1, marginBottom: 5 } }, "\u265B"),
        h("div", { style: { fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 18, lineHeight: 1.22, color: "#F4F6F7", letterSpacing: ".04em", textTransform: "uppercase", overflowWrap: "anywhere" } }, nomCav || "\u2014"),
        (prof && prof.ecurie && prof.ecurie !== "__perso__") ? h("div", { style: { marginTop: 5, fontSize: 10.5, color: "#8A929C", fontFamily: "'Montserrat',sans-serif" } }, prof.ecurie) : null,
        h("div", { style: { marginTop: 6, fontSize: 8.6, letterSpacing: ".16em", color: teinteCl, textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, titrePage)));
  }
  /* 07/10 (694) — IMPORTER MES RESULTATS depuis la page Performances de la cavaliere (SA page seulement) : meme video
     que la fiche cheval, meme phrase, meme bouton. L import range chaque ligne sur son cheval et verifie son nom FFE. */
  var sienPerf = !!(moi && riderId && String(moi.id) === String(riderId));
  var blocAjoutCav = (sienPerf && resDb !== null && resDb.length > 0) ? h("div", { style: largeRC ? { margin: "10px auto 0", maxWidth: 880, padding: "0 16px", boxSizing: "border-box" } : { margin: "10px 16px 0" } /* 19/10 (soir) : pas de bouton etire sur grand ecran */ },   /* 18/10 : page vide -> le bouton est dans PageVideResultatsHype */
    h("button", { "data-ajout-resultat": "performances", onClick: function () { setAjoutPerf(true); },
      style: { display: "block", width: "100%", minHeight: 48, borderRadius: 999, border: "1px solid rgba(201,166,107,0.7)", background: "rgba(16,26,29,0.85)", color: "#F3EEE4", fontFamily: "'Montserrat',sans-serif", fontSize: 13.5, fontWeight: 700, cursor: "pointer" } },
      "+ " + T("Ajouter un r\u00e9sultat", "Add a result", "A\u00f1adir un resultado", "Aggiungi un risultato", "\u7d50\u679c\u3092\u8ffd\u52a0", "Ergebnis hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0646\u062a\u064a\u062c\u0629", "添加成绩", "Een resultaat toevoegen", "Adicionar um resultado", "Lägg till ett resultat", "Добавить результат", "Dodaj wynik", "결과 추가"))) : null;
  var blocImportCav = (moi && riderId && String(moi.id) === String(riderId) && resDb !== null) ? h("div", { "data-import-cavaliere": "1", style: { margin: "30px 16px 0" } },
    h("div", { style: { position: "relative", width: "100%", maxWidth: 280, margin: "0 auto", borderRadius: 16, overflow: "hidden", background: "#000", border: "1px solid rgba(255,255,255,.07)" } },
      h("video", { src: "palmares-video-2.mp4?v=1", poster: "palmares-video-2.jpg?v=1", autoPlay: true, muted: true, loop: true, playsInline: true, "webkit-playsinline": "true", preload: "metadata",
        onClick: function (eV) { try { eV.stopPropagation(); var v = eV.currentTarget; if (v.requestFullscreen) v.requestFullscreen(); else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); } catch (eF) { } },
        style: { width: "100%", display: "block" } }),
      h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: "32%", pointerEvents: "none", background: "linear-gradient(180deg,rgba(6,7,9,0),rgba(6,7,9,.9))" } })),
    h("div", { style: { position: "relative", margin: "26px auto 0", maxWidth: "17em", padding: "19px 0", textAlign: "center" } },
      h("div", { style: { position: "absolute", top: 0, left: "32%", right: "32%", height: 1, background: "rgba(201,166,107,0.35)" } }),
      h("div", { style: { fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 24, lineHeight: 1.3, fontWeight: 400, color: "#F3EEE4" } }, T("Tes résultats officiels, à redécouvrir sur Hype.", "Your official results, to rediscover on Hype.", "Tus resultados oficiales, para redescubrir en Hype.", "I tuoi risultati ufficiali, da riscoprire su Hype.", "公式成績を Hype で見つけ直そう。", "Deine offiziellen Ergebnisse, neu entdeckt auf Hype.", "\u0646\u062a\u0627\u0626\u062c\u0643 \u0627\u0644\u0631\u0633\u0645\u064a\u0629\u060c \u0644\u062a\u0639\u064a\u062f\u064a \u0627\u0643\u062a\u0634\u0627\u0641\u0647\u0627 \u0639\u0644\u0649 Hype.", "你的官方成绩，在 Hype 上重新发现。", "Je officiële resultaten, om opnieuw te ontdekken op Hype.", "Seus resultados oficiais, para redescobrir no Hype.", "Dina officiella resultat, att återupptäcka på Hype.", "Твои официальные результаты — теперь в Hype.", "Twoje oficjalne wyniki, do ponownego odkrycia w Hype.", "내 공식 결과를 Hype에서 다시 만나 보세요.")),
      h("div", { style: { position: "absolute", bottom: 0, left: "32%", right: "32%", height: 1, background: "rgba(201,166,107,0.35)" } })),
    h("button", { onClick: function () { try { window.HYPE_IMPORT_MULTI = false; window.HYPE_IMPORT_CAVALIERE = true; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.localStorage.removeItem("hype_cheval_import"); } catch (eIc) { } setEcran("import-resultats"); },
      style: { position: "relative", width: "100%", marginTop: 16, padding: "14px 34px", border: 0, borderLeft: "2px solid #C9A66B", borderRadius: "0 12px 12px 0", background: "linear-gradient(90deg,rgba(255,255,255,.045),transparent 60%)", color: "#F3EEE4", fontSize: 12.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif", textAlign: "center", cursor: "pointer" } },
      T("Importer mes résultats officiels", "Import my official results", "Importar mis resultados oficiales", "Importa i miei risultati ufficiali", "公式成績を取り込む", "Meine offiziellen Ergebnisse importieren", "\u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0646\u062a\u0627\u0626\u062c\u064a \u0627\u0644\u0631\u0633\u0645\u064a\u0629", "导入我的官方成绩", "Mijn officiële resultaten importeren", "Importar meus resultados oficiais", "Importera mina officiella resultat", "Импортировать мои официальные результаты", "Importuj moje oficjalne wyniki", "공식 결과 가져오기"), h("span", { style: { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#C9A66B", fontWeight: 400 } }, "\u2192"))) : null;
  var retour = function () { try { if (app.peutReculer && app.retourEcran) { app.retourEcran(); return; } } catch (eR) { } setEcran("cavalier"); };   /* 18/10 : sans page precedente, retour a la page Cavalier (avant : rien) */
  return h("div", { style: { minHeight: "100vh", background: "#060709", color: "#EDF2F5", paddingBottom: 110 } },
    h(HypeDrapeauLangue, null),   /* (491) */
    /* 18/10 (Blandine) : meme hero que la page Cavalier (hypeHeroSousPageCavalier), a la place de la ligne « Resultats en concours » et de l encart */
    hypeHeroSousPageCavalier({ large: largeRC, ordi: ordiRC, retour: retour, labelRetour: T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), libelle: T("Performances", "Performances", "Rendimiento", "Prestazioni", "\u6210\u7e3e", "Leistungen", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "表现", "Prestaties", "Performances", "Prestationer", "Выступления", "Wyniki sportowe", "성적"), nom: nomCav, photo: (prof && prof.avatar_url) ? photoCh : "", ecurie: (prof && prof.ecurie && prof.ecurie !== "__perso__") ? prof.ecurie : "" }),
    corpsRC((resDb === null)
      ? h("div", { style: { padding: "40px 20px", textAlign: "center", color: "#8A929C", fontFamily: "'Montserrat',sans-serif", fontSize: 13 } }, T("Chargement\u2026", "Loading\u2026", "Cargando\u2026", "Caricamento\u2026", "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026", "L\u00e4dt\u2026", "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026", "加载中…", "Laden…", "Carregando…", "Laddar…", "Загрузка…", "Ładowanie…", "불러오는 중…"))
      : (!resDb.length
          ? h("div", null, null /* 18/10 : encart remplace par le hero commun en haut de page */,
              /* 18/10 : page vide de la maquette (trophee, phrase, boutons selon les droits, carte video) */
              h(PageVideResultatsHype, { cavalier: true, cleVideo: "hype_perf_video_masquee_" + ((moi && moi.id) || ""), nom: nomCav, message: erreur || null, peutAjouter: !!sienPerf, onAjouter: function () { setAjoutPerf(true); }, peutImporter: !!sienPerf, onImporter: function () { try { window.HYPE_IMPORT_MULTI = false; window.HYPE_IMPORT_CAVALIERE = true; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.localStorage.removeItem("hype_cheval_import"); } catch (eIc) { } setEcran("import-resultats"); } }))
          : h("div", { style: { padding: "0 0 28px" } },
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
          var tousF = lignesBrutes.map(function (r) { return { id: r.id, og: (r.origine || "main"), mn: String(r.mention || ""), pts: ((r.points == null || r.points === "") ? null : Number(r.points)), pl: pl9(r), part: r.partants ? Number(r.partants) : null, nom: r.concours || "", ep: r.epreuve || "", cav: r.cavalier || "", q: (r.quart == null ? null : Number(r.quart)), d: String(r.date_epreuve || ""), an: String(r.date_epreuve || "").slice(0, 4), chPh: r.ch_photo || "" /* (596) */, ff: (r.fort_force === true), fx: (r.fort_exclu === true) /* (600) */ }; }).filter(function (f) { return f.pl != null; });
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
            /* (596) Blandine : sur la page CAVALIER, l encart montre le CHEVAL du resultat (sa photo de fiche) ;
               a defaut, l ancienne regle (portrait sur le premier encart seulement). Le meme cheval peut revenir
               sur plusieurs encarts : c est voulu, c est bien lui. */
            var phSujetF = (f.chPh && String(f.chPh)) || null;
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
            return h("div", { key: "mf" + idx, role: "button", onClick: function () { if (!f.an) return; try { setSaisonOuv(String(f.an)); setTimeout(function () { var eSc = document.getElementById("hype-saison-" + f.an); if (eSc) eSc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 90); } catch (eMF) { } }, /* 26/08 : un moment fort OUVRE sa saison (fini les cartes qui n'emmenent nulle part) */ style: { cursor: "pointer", position: "relative", borderRadius: 15, overflow: "hidden", border: "1px solid rgba(201,166,107," + (grande ? ".3" : ".2") + ")", background: "#0A0D11", /* 🟩 06/09 (Blandine : "rallonge un peu la partie ou y a la photo, a chaque fois tu la coupes en deux, ca gache l'effet visuel") */ /* 🟩 06/09 (Blandine : "on garde le format large mais large ne veut pas dire tres court en hauteur, rallonge un peu sa hauteur") */ height: grande ? 280 : 178, flex: grande ? null : 1, minWidth: 0 } },
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
                f.ep ? h("div", { style: { marginTop: 2, fontSize: grande ? 11 : 9.3, color: "#B9BEC4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.ep) : null,
                h("div", { style: { marginTop: 2, fontSize: grande ? 11 : 9.3, color: "#B9BEC4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                  h("span", { style: { color: OR9, fontWeight: 700 } }, (f.pl && f.pl !== 1) ? (f.pl + "e") : "1er"), " sur " + (f.part || "?") /* (348) le vrai rang : un podium en complement disait « 1er » */, f.cav ? " \u00b7 " : null, f.cav ? h("span", { style: { color: "#F4F7FA", fontWeight: 700 } }, f.cav) : null)));
          }
          return h(React.Fragment, null,
            /* — 1 · IDENTITÉ — (encart commun, voir encartIdentiteCh) */
            null /* 18/10 : encart remplace par le hero commun en haut de page */,
            /* — 2 · LE BANDEAU DES QUATRE CHIFFRES — */
            /* 🟩 06/09 (Blandine : espace un peu plus tout ca) */ h("div", { style: { display: "flex", margin: "18px 16px 0", padding: "15px 6px 14px", borderRadius: 14, background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.06)" } },
              [[nS, T("sorties", "outings", "salidas", "uscite", "\u51fa\u5834", "Starts", "\u0645\u0634\u0627\u0631\u0643\u0627\u062a", "次出赛", "starts", "saídas", "starter", "стартов", "starty", "출전")], [nV, T("victoires", "wins", "victorias", "vittorie", "\u512a\u52dd", "Siege", "\u0627\u0646\u062a\u0635\u0627\u0631\u0627\u062a", "冠军", "overwinningen", "vitórias", "segrar", "побед", "zwycięstwa", "우승")], [nP, T("podiums", "podiums", "podios", "podi", "\u8868\u5f70\u53f0", "Podien", "\u0645\u0646\u0635\u0627\u062a \u062a\u062a\u0648\u064a\u062c", "领奖台", "podiumplaatsen", "pódios", "prispallsplaceringar", "пьедесталов", "podia", "시상대")], [nC, T("class\u00e9s", "placings", "clasificados", "piazzamenti", "\u5165\u8cde", "Platzierungen", "\u0645\u0635\u0646\u0641", "获得名次", "geplaatst", "classificados", "placerade", "призовых мест", "w czołówce", "입상")]].map(function (cq, iq) {
                return h("div", { key: "q" + iq, style: { flex: 1, textAlign: "center", minWidth: 0 } },
                  h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: "#F3EEE4" } }, String(cq[0])),
                  h("div", { style: { marginTop: 2, fontSize: 8.2, letterSpacing: ".13em", color: "#8A929C", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, cq[1])); })),
            /* 18/10 : sans resultat importe, la video et le bouton d import (blocImportCav, avant en bas) ; sinon les derniers resultats puis la carte « Importer tes resultats FFE » */
            aImpF ? null : blocImportCav,
            /* — 5 · DERNIERS RÉSULTATS — 18/10 (Blandine) cartes de la maquette (112 x 176, trois par ecran) ; : remontes en haut, comme sur la page Resultats du cheval */
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
                    grpR[cle].places.push({ rang: rr.pl || null, cavalier: c.nom || "", cheval: rr.cav || "" }); /* (348) page cavaliere : la cavaliere, SUR le cheval */
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
                      photoCh ? h("img", { src: photoCh, alt: "", loading: "lazy", onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (e9) { } }, style: { width: (geo && geo.horiz) ? geo.img : kz(46), height: (geo && geo.horiz) ? geo.img : kz(46), flexShrink: 0, borderRadius: "50%", objectFit: "cover", marginTop: (geo && geo.horiz) ? 0 : kz(7), border: "1px solid " + tA(0.35) } }) : null,
                      h("div", { style: { fontSize: kz(10), fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#F3EEE4", marginTop: kz(6), lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } },
                        h("bdi", null, (rangTxt ? (rangTxt + " ") : "") + (meilleur.cav_reel || meilleur.cavalier || "")) /* 19/10 (soir) : ordre des mots en arabe */,
                        (meilleur.cheval || nomChR) ? h("span", { style: { color: "#F3EEE4", fontWeight: 700 } }, hypeT7(" sur ", " on ", " con ", " su ", " \u00b7 ", " auf ", " \u0639\u0644\u0649 ", " / ", " van ", " em ", " av ", " из ", " na ", " 중 "), h("bdi", null, meilleur.cheval || nomChR)) : null),
                      h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: kz(10), fontWeight: 700, color: "#F3EEE4", marginTop: kz(5), lineHeight: 1.25, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" } }, gr.concours || "—"),
                      /* 21/09 (316) : epreuve et partants sur UNE ligne, coupee proprement - la carte a une hauteur FIXE. */
                      (gr.epreuve || gr.partants) ? h("div", { style: { fontSize: kz(8.5), color: "#A9B2BA", fontFamily: "'Montserrat',sans-serif", marginTop: 3, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" } }, [gr.epreuve || "", gr.partants ? ("/ " + gr.partants) : ""].filter(Boolean).join("  \u00b7  ")) : null,
                      null,
                      (function () {
                        /* 21/09 (316) : une seule ligne « + N autres classees » (carte a hauteur fixe) ;
                           les noms restent dans le panneau Performances, ouvert au toucher de la carte. */
                        var nAutresF = Math.max(0, tries.length - 1);
                        if (!nAutresF) return null;
                        return h("div", { style: { marginTop: 5, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: kz(8.5), color: "#98A2AA", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.35, width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                          "+ " + nAutresF + " " + (nAutresF === 1 ? hypeT7("autre class\u00e9e", "other placed", "otra clasificada", "altra classificata", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierung", "\u0645\u0635\u0646\u0641\u0629 \u0623\u062e\u0631\u0649", "位其他获得名次者", "andere geplaatst", "outra classificada", "annan placerad", "другой призёр", "inne miejsce w klasyfikacji", "기타 입상 1건") : hypeT7("autres class\u00e9es", "others placed", "otras clasificadas", "altre classificate", "\u4ef6\u306e\u5165\u8cde", "weitere Platzierungen", "\u0645\u0635\u0646\u0641\u0627\u062a \u0623\u062e\u0631\u064a\u0627\u062a", "位其他获得名次者", "andere geplaatsten", "outras classificadas", "andra placerade", "других призёров", "inne miejsca w klasyfikacji", "기타 입상")));
                      })()]);
                  }); } });
                })()) : null,
            /* — 3 · SES MOMENTS FORTS — 18/10 : mosaique de la nouvelle page (MosaiqueFortsHype) ; memes moments forts et memes droits ;
               photo = celle du cheval du resultat (page cavalier : c est bien lui), sinon la petite coupe. */
            (forts.length || (peutChoisirForts && fortsPool.length)) ? h(MosaiqueFortsHype, {
              forts: forts,
              photoDe: function (f) { return (f && f.chPh) ? { url: String(f.chPh), video: false } : null; },
              peutPhoto: function () { return false; },
              peutRetirer: function (f) { return !!(peutChoisirForts && f && f.id); },
              onRetirer: function (f) { var eF = etatFort(f); poserFort(f, eF.ff ? { fort_force: false } : { fort_exclu: true }); },
              onAjouter: peutChoisirForts ? function () { setChoixFortOuvert(true); } : null,
              onCarte: function (f) { if (!f || !f.an) return; try { setSaisonOuv(String(f.an)); setTimeout(function () { var eSc = document.getElementById("hype-saison-" + f.an); if (eSc) eSc.scrollIntoView({ behavior: "smooth", block: "center" }); }, 90); } catch (eMF) { } }
            }) : null,
            /* \U0001f7e9 06/09 (Blandine : "vrai bouton pour choisir photo/video sur un moment
               fort") \u2014 le picker s'ouvre en tapant le crayon d'une carte moment fort. Choix
               fait DANS les photos/videos deja envoyees sur ce cheval (chargerPhotosSouvenirs) :
               pas de nouvel envoi ici, la photo/video existe deja quelque part sur la fiche. */
            /* (600) la feuille « Ajouter un moment fort » : tous ses resultats visibles qui ne sont pas deja en vitrine, du plus recent au plus ancien. */
            choixFortOuvert ? hypePortailBody(h("div", { onClick: function () { setChoixFortOuvert(false); }, "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
              h("div", { onClick: function (eCf) { eCf.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "78vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#EDF2F5", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Ajouter un moment fort", "Add a highlight", "A\u00f1adir un momento", "Aggiungi un momento", "\u30cf\u30a4\u30e9\u30a4\u30c8\u3092\u8ffd\u52a0", "Moment hinzuf\u00fcgen", "\u0625\u0636\u0627\u0641\u0629 \u0644\u062d\u0638\u0629 \u0628\u0627\u0631\u0632\u0629", "添加精彩时刻", "Hoogtepunt toevoegen", "Adicionar um momento marcante", "Lägg till en höjdpunkt", "Добавить яркий момент", "Dodaj najważniejszy moment", "하이라이트 추가")),
                h("div", { style: { fontSize: 11, color: "rgba(234,242,244,.45)", textAlign: "center", marginBottom: 14, fontFamily: "'Montserrat',sans-serif" } }, T("Touche un r\u00e9sultat pour le mettre en vitrine. Un moment fort choisi \u00e0 la main passe devant le classement automatique.", "Tap a result to showcase it. A hand-picked highlight comes before the automatic ranking.", "Toca un resultado para destacarlo. Un momento elegido a mano pasa delante del orden autom\u00e1tico.", "Tocca un risultato per metterlo in vetrina. Un momento scelto a mano precede l\u2019ordine automatico.", "\u7d50\u679c\u3092\u30bf\u30c3\u30d7\u3057\u3066\u30cf\u30a4\u30e9\u30a4\u30c8\u306b\u3057\u307e\u3059\u3002\u624b\u52d5\u3067\u9078\u3093\u3060\u3082\u306e\u304c\u512a\u5148\u3055\u308c\u307e\u3059\u3002", "Tippe ein Ergebnis an, um es hervorzuheben. Ein von Hand gew\u00e4hlter Moment steht vor der automatischen Reihenfolge.", "\u0627\u0644\u0645\u0633\u064a \u0646\u062a\u064a\u062c\u0629 \u0644\u0625\u0628\u0631\u0627\u0632\u0647\u0627. \u0627\u0644\u0644\u062d\u0638\u0629 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u064a\u062f\u0648\u064a\u0627 \u062a\u0633\u0628\u0642 \u0627\u0644\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a.", "点一条成绩把它放进展示柜。手动选择的精彩时刻优先于自动排名。", "Tik op een resultaat om het in de spotlight te zetten. Een handmatig gekozen hoogtepunt gaat voor op het automatische klassement.", "Toque em um resultado para colocá-lo em destaque. Um momento marcante escolhido à mão tem prioridade sobre a classificação automática.", "Tryck på ett resultat för att lyfta fram det. En handplockad höjdpunkt går före den automatiska rankningen.", "Нажми на результат, чтобы выставить его на витрину. Яркий момент, выбранный вручную, идёт раньше автоматического рейтинга.", "Dotknij wyniku, aby wystawić go na widok. Najważniejszy moment wybrany ręcznie ma pierwszeństwo przed klasyfikacją automatyczną.", "결과를 눌러 쇼케이스에 올려 보세요. 직접 고른 하이라이트가 자동 순위보다 먼저 표시돼요.")),
                h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
                  (function () {
                    var dejaIds = {}; forts.forEach(function (fD) { if (fD && fD.id) dejaIds[fD.id] = 1; });
                    var cands = tousF.filter(function (fC) { return fC.id && !dejaIds[fC.id]; }).slice().sort(function (a1, b1) { return (b1.d || "").localeCompare(a1.d || ""); }).slice(0, 80);
                    if (!cands.length) return h("div", { style: { color: "#8A929C", fontSize: 12.5, textAlign: "center", padding: "18px 0", fontFamily: "'Montserrat',sans-serif" } }, T("Aucun autre r\u00e9sultat \u00e0 proposer.", "No other result to offer.", "Ning\u00fan otro resultado.", "Nessun altro risultato.", "\u4ed6\u306b\u7d50\u679c\u306f\u3042\u308a\u307e\u305b\u3093\u3002", "Kein weiteres Ergebnis.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u064a\u062c\u0629 \u0623\u062e\u0631\u0649.", "没有其他可推荐的成绩了。", "Geen ander resultaat om voor te stellen.", "Nenhum outro resultado a sugerir.", "Inga fler resultat att föreslå.", "Других результатов для предложения нет.", "Brak innych wyników do zaproponowania.", "제안할 다른 결과가 없어요."));
                    return cands.map(function (fC) {
                      var eC = etatFort(fC);
                      return h("div", { key: "cf" + fC.id, role: "button", onClick: function () { poserFort(fC, { fort_force: true, fort_exclu: false }); setChoixFortOuvert(false); }, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", minHeight: 48, borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" } },
                        h("div", { style: { flex: "0 0 74px", fontSize: 10.5, letterSpacing: ".04em", color: "#8A929C", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.25 } }, fC.d ? dateFr(fC.d) : (fC.an || "")),
                        h("div", { style: { flex: 1, minWidth: 0 } },
                          h("div", { style: { fontSize: 13, fontWeight: 700, color: "#EDF2F5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Montserrat',sans-serif" } }, fC.nom || ""),
                          h("div", { style: { fontSize: 11, color: "#B9BEC4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Montserrat',sans-serif" } }, (fC.ep || "") + (fC.cav ? " \u00b7 " + fC.cav : "") + (eC.fx ? " \u00b7 " + T("retir\u00e9", "removed", "quitado", "rimosso", "\u5916\u3057\u305f", "entfernt", "\u0645\u064f\u0632\u0627\u0644", "已移除", "verwijderd", "removido", "borttaget", "убрано", "usunięto", "삭제됨") : ""))),
                        h("div", { style: { flex: "0 0 auto", fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: OR9 } }, (fC.pl || "?") + "/" + (fC.part || "?")));
                    });
                  })()),
                h("button", { onClick: function () { setChoixFortOuvert(false); }, style: { marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))))) : null,
            pickerMomentF ? h("div", { onClick: function () { setPickerMomentF(null); }, style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
              h("div", { onClick: function (ePk) { ePk.stopPropagation(); }, style: { width: "100%", maxWidth: 480, maxHeight: "78vh", display: "flex", flexDirection: "column", background: "#0C1316", borderRadius: "22px 22px 0 0", border: "1px solid rgba(201,166,107,0.35)", borderBottom: "none", padding: "20px 18px calc(18px + env(safe-area-inset-bottom))" } },
                h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: 1.6, color: "#EDF2F5", textAlign: "center", textTransform: "uppercase", marginBottom: 6 } }, T("Photo ou vid\u00e9o de ce moment", "Photo or video for this highlight", "Foto o v\u00eddeo de este momento", "Foto o video di questo momento", "\u3053\u306e\u77ac\u9593\u306e\u5199\u771f\u30fb\u52d5\u753b", "Foto oder Video f\u00fcr diesen Moment", "\u0635\u0648\u0631\u0629 \u0623\u0648 \u0641\u064a\u062f\u064a\u0648 \u0644\u0647\u0630\u0647 \u0627\u0644\u0644\u062d\u0638\u0629", "这个时刻的照片或视频", "Foto of video van dit moment", "Foto ou vídeo deste momento", "Foto eller video från den här stunden", "Фото или видео для этого момента", "Zdjęcie lub film z tego momentu", "이 순간의 사진 또는 영상")),
                h("div", { style: { fontSize: 11, color: "rgba(234,242,244,.45)", textAlign: "center", marginBottom: 14, fontFamily: "'Montserrat',sans-serif" } }, T("Choisis parmi les photos et vid\u00e9os d\u00e9j\u00e0 envoy\u00e9es sur ce cheval.", "Pick from the photos and videos already sent for this horse.", "Elige entre las fotos y v\u00eddeos ya enviados de este caballo.", "Scegli tra le foto e i video gi\u00e0 inviati per questo cavallo.", "\u3053\u306e\u99ac\u306b\u3059\u3067\u306b\u9001\u3089\u308c\u305f\u5199\u771f\u30fb\u52d5\u753b\u304b\u3089\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002", "W\u00e4hle aus den bereits gesendeten Fotos und Videos dieses Pferdes.", "\u0627\u062e\u062a\u0627\u0631\u064a \u0645\u0646 \u0628\u064a\u0646 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u0627\u0644\u062a\u064a \u0623\u0631\u0633\u0644\u062a \u0644\u0647\u0630\u0627 \u0627\u0644\u062d\u0635\u0627\u0646.", "从已上传到这匹马的照片和视频中选择。", "Kies uit de foto’s en video’s die al zijn verstuurd voor dit paard.", "Escolha entre as fotos e vídeos já enviados para este cavalo.", "Välj bland de foton och videor som redan skickats för den här hästen.", "Выбери из фото и видео, уже загруженных для этой лошади.", "Wybierz spośród zdjęć i filmów już wysłanych dla tego konia.", "이 말에 이미 올린 사진과 영상 중에서 고르세요.")),
                h("div", { style: { overflowY: "auto", WebkitOverflowScrolling: "touch", flex: 1, minHeight: 120 } },
                  (mediaTousMF === null) ? h("div", { style: { color: "#5B646E", fontSize: 12.5, fontFamily: "'Montserrat',sans-serif", textAlign: "center", padding: "22px 0" } }, "\u2026")
                    : (!mediaTousMF.length ? h("div", { style: { color: "#5B646E", fontSize: 12.5, fontFamily: "'Montserrat',sans-serif", fontStyle: "italic", textAlign: "center", padding: "22px 0" } }, T("Aucune photo ni vid\u00e9o pour l'instant.", "No photo or video yet.", "A\u00fan ninguna foto ni v\u00eddeo.", "Ancora nessuna foto o video.", "\u307e\u3060\u5199\u771f\u3082\u52d5\u753b\u3082\u3042\u308a\u307e\u305b\u3093\u3002", "Noch kein Foto oder Video.", "\u0644\u0627 \u062a\u0648\u062c\u062f \u0635\u0648\u0631 \u0648\u0644\u0627 \u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a \u062d\u0627\u0644\u064a\u0627.", "暂时没有照片或视频。", "Nog geen foto of video.", "Nenhuma foto nem vídeo por enquanto.", "Inga foton eller videor ännu.", "Пока нет ни фото, ни видео.", "Na razie brak zdjęć i filmów.", "아직 사진이나 영상이 없어요."))
                      : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 } },
                        mediaTousMF.map(function (uM, iM) {
                          var vidM = typeof estUrlVideo === "function" && estUrlVideo(uM);
                          return h("div", { key: "pmf" + iM, role: "button", onClick: function () { definirMediaMomentFort(pickerMomentF, uM); }, style: { position: "relative", paddingBottom: "100%", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: "#12242b" } },
                            vidM
                              ? hypeMiniatureVideo(uM, { largeur: 400, style: { position: "absolute", inset: 0 } })
                              : h("img", { src: uM, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
                            vidM ? h("div", { style: { position: "absolute", right: 4, bottom: 4, fontSize: 13 } }, "\u25b6\ufe0f") : null);
                        }))),
                (chevalDyn && chevalDyn.moments_forts_medias && chevalDyn.moments_forts_medias[pickerMomentF]) ? h("button", { onClick: function () { definirMediaMomentFort(pickerMomentF, null); }, style: { marginTop: 12, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "rgba(237,242,245,0.65)", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Revenir au choix automatique", "Go back to automatic choice", "Volver a la elecci\u00f3n autom\u00e1tica", "Torna alla scelta automatica", "\u81ea\u52d5\u9078\u629e\u306b\u623b\u3059", "Zur automatischen Auswahl zur\u00fcckkehren", "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a", "恢复自动选择", "Terug naar de automatische keuze", "Voltar à escolha automática", "Tillbaka till det automatiska valet", "Вернуться к автоматическому выбору", "Wróć do wyboru automatycznego", "자동 선택으로 되돌리기")) : null,
                h("button", { onClick: function () { setPickerMomentF(null); }, style: { marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "\u9589\u3058\u308b", "Schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기"))))) : null,
            /* — 4 · PAR SAISON (fermées ; chevrons prêts pour le dépliage) — */
            listeAns.length ? h(largeRC ? "div" : React.Fragment, largeRC ? { "data-res-lecture": "saisons", style: { maxWidth: 880, marginLeft: "auto", marginRight: "auto" } } : null, /* 19/10 (soir) audit ordinateur : colonne de lecture centree (880 px) sur grand ecran, telephone inchange */
              h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "44px 16px 14px" } },
                h("div", { style: { fontSize: 11.5, letterSpacing: ".14em", fontWeight: 700, color: OR9 } }, T("Par saison", "By season", "Por temporada", "Per stagione", "\u30b7\u30fc\u30ba\u30f3\u5225", "Nach Saison", "\u062d\u0633\u0628 \u0627\u0644\u0645\u0648\u0633\u0645", "按赛季", "Per seizoen", "Por temporada", "Per säsong", "По сезонам", "Według sezonu", "시즌별").toUpperCase()), filetOr()),
              (cavsPalm.length >= 2) ? h("div", { style: Object.assign({ display: "flex", gap: 7, margin: "0 16px 11px", overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }, largeRC ? { flexWrap: "wrap", overflowX: "visible", rowGap: 8 } : {}) /* 19/10 (soir) : a la ligne sur grand ecran */ }, /* 26/08 : les resultats propres a chaque cavalier (demande Blandine) */
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
              return h(largeRC ? "div" : React.Fragment, largeRC ? { "data-res-lecture": "points", style: { maxWidth: 880, marginLeft: "auto", marginRight: "auto" } } : null, /* 19/10 (soir) audit ordinateur : colonne de lecture centree (880 px) sur grand ecran, telephone inchange */
                h("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "44px 16px 14px" } },
                  h("div", { style: { fontSize: 11.5, letterSpacing: ".14em", fontWeight: 700, color: OR9 } },
                    T("Points de qualification", "Qualification points", "Puntos de calificaci\u00f3n", "Punti di qualifica", "\u8cc7\u683c\u30dd\u30a4\u30f3\u30c8", "Qualifikationspunkte", "\u0646\u0642\u0627\u0637 \u0627\u0644\u062a\u0623\u0647\u0644", "资格积分", "Kwalificatiepunten", "Pontos de qualificação", "Kvalificeringspoäng", "Квалификационные очки", "Punkty kwalifikacyjne", "자격 점수").toUpperCase()), filetOr()),
                (clesS.length > 1) ? h("div", { style: Object.assign({ display: "flex", gap: 7, margin: "0 16px 11px", overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }, largeRC ? { flexWrap: "wrap", overflowX: "visible", rowGap: 8 } : {}) /* 19/10 (soir) : a la ligne sur grand ecran */ },
                  clesS.map(function (sK) {
                    var onS = (String(sK) === String(sCour));
                    return h("button", { key: "sp" + sK, onClick: function () { setSaisonPts(sK); },
                      style: { flex: "0 0 auto", padding: "6px 13px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
                        border: "1px solid " + (onS ? "rgba(201,166,107,.75)" : "rgba(255,255,255,0.14)"),
                        background: onS ? "rgba(201,166,107,.12)" : "rgba(255,255,255,0.03)",
                        color: onS ? OR9 : "rgba(237,242,245,0.7)", fontSize: 11.3, fontWeight: 700, fontFamily: "'Montserrat',sans-serif" } },
                      sK + " / " + (Number(sK) + 1));
                  })) : null,
                h("div", { style: { margin: "0 16px", padding: "14px 16px", borderRadius: 14, background: "linear-gradient(165deg, #101D22 0%, rgba(7,10,8,0.9) 100%)", border: "1px solid rgba(201,166,107,.28)" } },
                  h("div", { style: { display: "flex", alignItems: "baseline", gap: 9 } },
                    h("div", { style: { fontFamily: "'Cinzel',serif", fontSize: 27, fontWeight: 700, color: OR9 } }, arrondi(totalS)),
                    h("div", { style: { fontSize: 11.5, color: "rgba(243,238,228,0.8)", fontFamily: "'Montserrat',sans-serif" } },
                      T("points \u00b7 ", "points \u00b7 ", "puntos \u00b7 ", "punti \u00b7 ", "\u30dd\u30a4\u30f3\u30c8 \u00b7 ", "Punkte \u00b7 ", "\u0646\u0642\u0627\u0637 \u00b7 ", "分 · ", "punten · ", "pontos · ", "poäng · ", "очки · ", "punkty · ", "점 · ") + lignesS.length + " " +
                      T("\u00e9preuves", "classes", "pruebas", "prove", "\u7af6\u6280", "Pr\u00fcfungen", "\u0645\u0633\u0627\u0628\u0642\u0627\u062a", "比赛项目", "klassen", "provas", "klasser", "маршрутов", "konkurencje", "경기"))),
                  h("div", { style: { marginTop: 3, fontSize: 10.5, color: "#8A929C", fontFamily: "'Montserrat',sans-serif" } },
                    T("Saison " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 chaque cat\u00e9gorie suit sa p\u00e9riode de qualification", "Season " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 each category follows its qualification period", "Temporada " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 cada categor\u00eda sigue su periodo de calificaci\u00f3n", "Stagione " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 ogni categoria segue il suo periodo di qualifica", sCour + " / " + (Number(sCour) + 1) + "\u30b7\u30fc\u30ba\u30f3 \u00b7 \u5404\u30ab\u30c6\u30b4\u30ea\u30fc\u306f\u305d\u308c\u305e\u308c\u306e\u8cc7\u683c\u671f\u9593\u306b\u5f93\u3044\u307e\u3059", "Saison " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 jede Kategorie folgt ihrem Qualifikationszeitraum", "\u0627\u0644\u0645\u0648\u0633\u0645 " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 \u0644\u0643\u0644 \u0641\u0626\u0629 \u0641\u062a\u0631\u0629 \u062a\u0623\u0647\u0644 \u062e\u0627\u0635\u0629 \u0628\u0647\u0627", "赛季 " + sCour + " / " + (Number(sCour) + 1) + " · 每个类别遵循各自的资格期", "Seizoen " + sCour + " / " + (Number(sCour) + 1) + " · elke categorie volgt haar eigen kwalificatieperiode", "Temporada " + sCour + " / " + (Number(sCour) + 1) + " · cada categoria segue seu período de qualificação", ("Säsong " + sCour + " / " + (Number(sCour) + 1) + " · varje kategori följer sin kvalificeringsperiod"), ("Сезон " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 каждая категория следует своему квалификационному периоду"), ("Sezon " + sCour + " / " + (Number(sCour) + 1) + " \u00b7 każda kategoria ma własny okres kwalifikacyjny"), ("시즌 " + sCour + " / " + (Number(sCour) + 1) + " · 각 카테고리는 자체 자격 기간을 따라요"))),
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
                  sansPts > 0 ? h("div", { style: { marginTop: 11, fontSize: 10.5, lineHeight: 1.5, color: "#8A929C", fontFamily: "'Montserrat',sans-serif" } },
                    sansPts + " " + T("r\u00e9sultat" + (sansPts > 1 ? "s" : "") + " sans points connus \u2014 repasse son t\u00e9l\u00e9mat pour les r\u00e9cup\u00e9rer. Les points sont ceux calcul\u00e9s par la FFE, jamais recalcul\u00e9s ici.",
                                       "result" + (sansPts > 1 ? "s" : "") + " with no known points \u2014 re-import its telemat. Points come from the FFE, never recomputed here.",
                                       "resultado" + (sansPts > 1 ? "s" : "") + " sin puntos conocidos \u2014 vuelve a importar su telemat.",
                                       "risultat" + (sansPts > 1 ? "i" : "o") + " senza punti noti \u2014 reimporta il suo telemat.",
                                       "\u30dd\u30a4\u30f3\u30c8\u4e0d\u660e\u306e\u7d50\u679c\u304c\u3042\u308a\u307e\u3059\u3002",
                                       "Ergebnis(se) ohne bekannte Punkte \u2014 Telemat erneut importieren.", "\u0646\u062a\u064a\u062c\u0629 \u0628\u0644\u0627 \u0646\u0642\u0627\u0637 \u0645\u0639\u0631\u0648\u0641\u0629 \u2014 \u0623\u0639\u064a\u062f\u064a \u0627\u0633\u062a\u064a\u0631\u0627\u062f \u0645\u0644\u0641 t\u00e9l\u00e9mat \u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639\u0647\u0627. \u0627\u0644\u0646\u0642\u0627\u0637 \u0647\u064a \u0627\u0644\u062a\u064a \u062a\u062d\u0633\u0628\u0647\u0627 FFE\u060c \u0648\u0644\u0627 \u064a\u0639\u0627\u062f \u062d\u0633\u0627\u0628\u0647\u0627 \u0647\u0646\u0627.", "条成绩" + (sansPts > 1 ? "" : "") + "暂无已知积分——重新获取 TA 的 télémat 即可找回。积分由 FFE 计算，这里不会重新计算。", "resultaat" + (sansPts > 1 ? "en" : "") + " zonder bekende punten — importeer de télémat opnieuw om ze op te halen. De punten zijn die berekend door de FFE en worden hier nooit opnieuw berekend.", "resultado" + (sansPts > 1 ? "s" : "") + " sem pontos conhecidos — importe o télémat novamente para recuperá-los. Os pontos são os calculados pela FFE, nunca recalculados aqui.", ("resultat" + (sansPts > 1 ? "" : "") + " utan kända poäng – importera dess télémat igen för att hämta dem. Poängen är de som FFE har räknat fram, de räknas aldrig om här."), ((sansPts % 10 === 1 && sansPts % 100 !== 11 ? "результат" : (sansPts % 10 >= 2 && sansPts % 10 <= 4 && (sansPts % 100 < 10 || sansPts % 100 >= 20)) ? "результата" : "результатов") + " без известных очков \u2014 повтори импорт его télémat, чтобы вернуть их. Очки рассчитывает FFE, здесь они никогда не пересчитываются."), ((sansPts === 1 ? "wynik" : (sansPts % 10 >= 2 && sansPts % 10 <= 4 && (sansPts % 100 < 10 || sansPts % 100 >= 20)) ? "wyniki" : "wyników") + " bez znanych punktów \u2014 przejdź ponownie przez télémat, aby je odzyskać. Punkty są wyliczone przez FFE i nigdy nie są tu przeliczane."), ("점수를 알 수 없는 결과 " + sansPts + "건 — télémat을 다시 불러와서 가져오세요. 점수는 FFE가 계산한 값이며 여기서 다시 계산하지 않아요."))) : null));
            })(),
            /* — 6 · CTA — */
            /* 02/09 : le CTA vers la page technique est RETIRE. A sa place, la seule
               chose qui vivait derriere : l acces de la proprietaire aux lignes
               qu elle a decochees a la relecture de l import. */
            (function () {
              var proprioP = !!(chevalDyn && moi && chevalDyn.ownerId === moi.id);
              var nMq = ((resDb) || []).filter(function (rM) { return rM && rM.visible === false; }).length;
              if (!proprioP || !nMq) return null;
              return h("div", { role: "button", onClick: function () { setVoirMasques(!voirMasques); }, style: { textAlign: "center", margin: "22px 16px 0", fontSize: 11.5, color: voirMasques ? "#E6CF9C" : "#8A929C", cursor: "pointer" } },
                (voirMasques ? "\u2611 " : "\u2610 ") + (voirMasques
                  ? T("Les lignes masqu\u00e9es sont affich\u00e9es", "Hidden lines are shown", "L\u00edneas ocultas visibles", "Righe nascoste visibili", "\u975e\u8868\u793a\u306e\u884c\u3092\u8868\u793a\u4e2d", "Ausgeblendete Zeilen sichtbar", "\u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0645\u0639\u0631\u0648\u0636\u0629", "已显示隐藏的行", "De verborgen regels worden getoond", "As linhas ocultas estão visíveis", "De dolda raderna visas", "Скрытые строки показаны", "Ukryte wiersze są wyświetlone", "숨긴 줄이 표시되고 있어요")
                  : T("Afficher aussi les " + nMq + " lignes masqu\u00e9es", "Also show the " + nMq + " hidden lines", "Mostrar tambi\u00e9n las " + nMq + " l\u00edneas ocultas", "Mostra anche le " + nMq + " righe nascoste", nMq + " \u4ef6\u306e\u975e\u8868\u793a\u884c\u3082\u8868\u793a", "Auch die " + nMq + " ausgeblendeten Zeilen zeigen", "\u0639\u0631\u0636 \u0627\u0644\u0623\u0633\u0637\u0631 \u0627\u0644\u0645\u062e\u0641\u064a\u0629 \u0623\u064a\u0636\u0627 (" + nMq + ")", "同时显示" + nMq + "条已隐藏的行", "Toon ook de " + nMq + " verborgen regels", "Mostrar também as " + nMq + " linhas ocultas", ("Visa även de " + nMq + " dolda raderna"), ("Показать также скрытые строки: " + nMq), ("Pokaż też ukryte wiersze (" + nMq + ")"), ("숨긴 " + nMq + "줄도 함께 보기"))));
            })(),
            h("div", { style: { textAlign: "center", marginTop: 7, fontSize: 10.5, color: "rgba(243,238,228,0.5)" } }, nC + " " + T("r\u00e9sultats enregistr\u00e9s", "recorded results", "resultados registrados", "risultati registrati", "\u4ef6\u306e\u6210\u7e3e", "erfasste Ergebnisse", "\u0646\u062a\u0627\u0626\u062c \u0645\u062d\u0641\u0648\u0638\u0629", "条已记录的成绩", "geregistreerde resultaten", "resultados registrados", "sparade resultat", "сохранённых результатов", "zapisanych wyników", "저장된 결과")));
        })() /* (348) : le bloc copie est une fonction A APPELER - sans ces () la page restait vide */)),
    /* 18/10 (Blandine : « relier les deux boutons ») : en bas, « Importer tes resultats FFE » puis « + Ajouter un resultat » */
    (sienPerf && resDb !== null && (resDb || []).some(function (rI) { return rI && rI.origine === "import"; })) ? h(CarteImportHype, { largeurMax: largeRC ? 848 : null, onClick: function () { try { window.HYPE_IMPORT_MULTI = false; window.HYPE_IMPORT_CAVALIERE = true; window.HYPE_CHEVAL_IMPORT = null; window.HYPE_CHEVAL_IMPORT_NOM = null; window.localStorage.removeItem("hype_cheval_import"); } catch (eIc) { } setEcran("import-resultats"); }, marge: "44px 16px 0" }) : null,
    blocAjoutCav),   /* (697) */
    h("div", { "aria-hidden": "true", style: { height: 36 } }),   /* 18/10 : plus d air avant le bas de page */
    typeof FinPageHype === "function" ? h(FinPageHype, { key: "finResCav" }) : null,   /* 18/10 (Blandine) : le bas de page habituel */
    /* 18/10 : blocImportCav remonte en haut de la page (voir « derniers resultats ») */
    ajoutPerf ? h(HypeAjoutResultatCavaliere, { onFermer: function () { setAjoutPerf(false); }, onAjoute: function (av) { setRechargeRes(function (n) { return n + 1; }); if (av) { try { window.alert(av === "nom" ? "R\u00e9sultat enregistr\u00e9. Il n'appara\u00eetra ici qu'une fois ton nom FFE reli\u00e9 (Mon compte \u2192 \u00ab Mes r\u00e9sultats de concours \u00bb)." : "R\u00e9sultat enregistr\u00e9, mais pas encore rattach\u00e9 \u00e0 ton compte : " + av); } catch (eAl) { } } } }) : null,
    toast ? h("div", { style: { position: "fixed", left: "50%", bottom: "calc(96px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", background: "#12161C", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 14px", fontSize: 12.5, color: "#EDF2F5", zIndex: 60 } }, toast) : null);
}
window.HypeResultatsCav = { ResultatsCav: EcranResultatsCavaliere };
})();
